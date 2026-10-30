interface Env {
  ASSETS: Fetcher;
  BUTTONDOWN_API_KEY: string;
  TURNSTILE_SECRET: string;
  EMAIL: SendEmail;
}

const MAX_DISTRICT = 15;
const EMAIL_RE = /^[^@ ]+@[^@ ]+[.][^@ ]{2,}$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

// Remove control characters (including line breaks) so input can't inject email headers.
const clean = (s: unknown, max: number) =>
  Array.from(String(s ?? ''))
    .filter((c) => c >= ' ')
    .join('')
    .trim()
    .slice(0, max);

async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const data = (await r.json()) as { success: boolean };
  return data.success === true;
}

   async function subscribe(body: Record<string, unknown>, env: Env) {
     const email = clean(body.email, 254).toLowerCase();
     const district = Number(body.district);
     const affiliated = body.affiliated === 'yes' ? 'yes' : body.affiliated === 'no' ? 'no' : 'unspecified';
     const organization = affiliated === 'yes' ? clean(body.organization, 150) : '';

     if (!EMAIL_RE.test(email)) {
       return json({ error: 'Please enter a valid email address.' }, 400);
     }
     if (!Number.isInteger(district) || district < 1 || district > MAX_DISTRICT) {
       return json({ error: `District must be a number from 1 to ${MAX_DISTRICT}.` }, 400);
     }

     const res = await fetch('https://api.buttondown.com/v1/subscribers', {
       method: 'POST',
       headers: {
         Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         email_address: email,
         metadata: { district: String(district), affiliated, ...(organization ? { organization } : {}) },
       }),
     });

     if (res.ok || res.status === 409) return json({ ok: true });
     console.error('Buttondown error status:', res.status);
     return json({ error: 'Something went wrong. Please try again later.' }, 502);
   }

async function contact(body: Record<string, unknown>, env: Env) {
  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const org = clean(body.organization, 150);
  const message = String(body.message ?? '').trim().slice(0, 5000);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return json({ error: 'Please fill in your name, a valid email, and a message.' }, 400);
  }

  await env.EMAIL.send({
    to: 'simcivics@gmail.com',
    from: 'simcivicssite@gmail.com',
    replyTo: email,
    subject: `Partnership inquiry from ${name}`,
    text: `Name: ${name}
Email: ${email}
Organization: ${org}

${message}`,
  });
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    // Only accept requests that come from this same site.
    if (request.headers.get('Origin') !== url.origin) return json({ error: 'Forbidden' }, 403);
    if (Number(request.headers.get('Content-Length') ?? 0) > 20000) {
      return json({ error: 'Request too large' }, 413);
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: 'Invalid request' }, 400);
    }

    const human = await verifyTurnstile(
      String(body.token ?? ''),
      env.TURNSTILE_SECRET,
      request.headers.get('CF-Connecting-IP')
    );
    if (!human) return json({ error: 'Bot check failed. Please try again.' }, 400);

    try {
      if (url.pathname === '/api/subscribe') return await subscribe(body, env);
      if (url.pathname === '/api/contact') return await contact(body, env);
    } catch (err) {
      console.error('Handler error', err instanceof Error ? err.message : 'unknown');
      return json({ error: 'Something went wrong. Please try again later.' }, 500);
    }
    return json({ error: 'Not found' }, 404);
  },
};
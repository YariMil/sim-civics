import { TAGS, SUBTAGS, MAX_TITLE, MAX_BODY } from '../src/data/ideaTags';

interface Env {
  ASSETS: Fetcher;
  BUTTONDOWN_API_KEY: string;
  TURNSTILE_SECRET: string;
  EMAIL: SendEmail;
  DB: D1Database;
}

const MAX_DISTRICT = 15;
const EMAIL_RE = /^[^@ ]+@[^@ ]+[.][^@ ]{2,}$/;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
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

type Profile = {
  email: string;
  district: number;
  affiliated: 'yes' | 'no' | 'unspecified';
  organization: string;
};

// Shared by the newsletter form and account sign-up.
function readProfile(body: Record<string, unknown>): Profile | string {
  const email = clean(body.email, 254).toLowerCase();
  const district = Number(body.district);
  const affiliated = body.affiliated === 'yes' ? 'yes' : body.affiliated === 'no' ? 'no' : 'unspecified';
  const organization = affiliated === 'yes' ? clean(body.organization, 150) : '';

  if (!EMAIL_RE.test(email)) return 'Please enter a valid email address.';
  if (!Number.isInteger(district) || district < 1 || district > MAX_DISTRICT) {
    return `District must be a number from 1 to ${MAX_DISTRICT}.`;
  }
  return { email, district, affiliated, organization };
}

async function addToNewsletter(p: Profile, env: Env) {
  const res = await fetch('https://api.buttondown.com/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: p.email,
      metadata: {
        district: String(p.district),
        affiliated: p.affiliated,
        ...(p.organization ? { organization: p.organization } : {}),
      },
    }),
  });
  if (res.ok || res.status === 409) return true;
  console.error('Buttondown error status:', res.status);
  return false;
}

async function subscribe(body: Record<string, unknown>, env: Env) {
  const p = readProfile(body);
  if (typeof p === 'string') return json({ error: p }, 400);
  if (await addToNewsletter(p, env)) return json({ ok: true });
  return json({ error: 'Something went wrong. Please try again later.' }, 502);
}

const PARTNER_TYPES = ['school', 'community', 'city-agency', 'media', 'individual', 'other'];

async function contact(body: Record<string, unknown>, env: Env) {
  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const org = clean(body.org, 150);
  const partnerType = PARTNER_TYPES.includes(String(body.partnerType))
    ? String(body.partnerType)
    : 'not specified';
  const message = String(body.message ?? '').trim().slice(0, 5000);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return json({ error: 'Please fill in your name, a valid email, and a message.' }, 400);
  }

  await env.EMAIL.send({
    to: 'admin@simcivicsla.com',
    from: 'website@simcivicsla.com',
    replyTo: email,
    subject: `Partnership inquiry from ${name}`,
    text: `Name: ${name}
Email: ${email}
Organization: ${org || 'not provided'}
Type of partnership: ${partnerType}

${message}`,
  });
  return json({ ok: true });
}

/* ── Accounts ─────────────────────────────────────────────── */

// Workers cap PBKDF2 at 100,000 iterations.
const PBKDF2_ITERATIONS = 100_000;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 200;
const SESSION_COOKIE = '__Host-sc_session';
const SESSION_DAYS = 30;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

const enc = new TextEncoder();
const toB64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const randomBytes = (n: number) => crypto.getRandomValues(new Uint8Array(n));

async function pbkdf2(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    key,
    256
  );
  return new Uint8Array(bits);
}

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toB64(salt)}$${toB64(hash)}`;
}

// Compares in constant time so response timing doesn't leak how much of the hash matched.
async function verifyPassword(password: string, stored: string) {
  const [scheme, iter, salt, expected] = stored.split('$');
  if (scheme !== 'pbkdf2') return false;
  const actual = await pbkdf2(password, fromB64(salt), Number(iter));
  const want = fromB64(expected);
  if (actual.length !== want.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ want[i];
  return diff === 0;
}

// Used when the email doesn't exist, so a failed login takes the same time either way.
const DUMMY_HASH = `pbkdf2$${PBKDF2_ITERATIONS}$${toB64(new Uint8Array(16))}$${toB64(new Uint8Array(32))}`;

async function sha256(s: string) {
  return toB64(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s))));
}

const sessionCookie = (token: string, maxAge: number) =>
  `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

function readSessionToken(request: Request) {
  const cookies = request.headers.get('Cookie') ?? '';
  for (const part of cookies.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === SESSION_COOKIE) return rest.join('=');
  }
  return null;
}

async function startSession(userId: number, env: Env) {
  const token = toB64(randomBytes(32)).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c]!);
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(now),
    env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(
      await sha256(token),
      userId,
      now + SESSION_MS
    ),
  ]);
  return sessionCookie(token, SESSION_DAYS * 24 * 60 * 60);
}

type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  district: number;
  affiliated: string;
  organization: string;
  discoverable: number;
};

// What the browser is allowed to see about the signed-in user.
const publicUser = (u: UserRow) => ({
  email: u.email,
  district: u.district,
  affiliated: u.affiliated,
  organization: u.organization,
  discoverable: u.discoverable === 1,
});

async function signup(body: Record<string, unknown>, env: Env) {
  const p = readProfile(body);
  if (typeof p === 'string') return json({ error: p }, 400);
  const password = String(body.password ?? '');
  if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
    return json({ error: `Password must be ${MIN_PASSWORD} to ${MAX_PASSWORD} characters.` }, 400);
  }
  const discoverable = body.discoverable === true ? 1 : 0;

  const user = await env.DB.prepare(
    `INSERT INTO users (email, password_hash, district, affiliated, organization, discoverable, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (email) DO NOTHING
     RETURNING *`
  )
    .bind(p.email, await hashPassword(password), p.district, p.affiliated, p.organization, discoverable, Date.now())
    .first<UserRow>();
  if (!user) {
    return json({ error: 'An account with this email already exists. Try logging in.' }, 409);
  }

  // Sign-up also joins the newsletter (Buttondown sends its own confirmation email).
  // The account is already created, so a newsletter failure doesn't fail sign-up.
  await addToNewsletter(p, env).catch(() => false);

  return json({ user: publicUser(user) }, 201, { 'Set-Cookie': await startSession(user.id, env) });
}

async function login(body: Record<string, unknown>, env: Env) {
  const email = clean(body.email, 254).toLowerCase();
  const password = String(body.password ?? '').slice(0, MAX_PASSWORD);
  const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<UserRow>();
  const ok = await verifyPassword(password, user?.password_hash ?? DUMMY_HASH);
  if (!user || !ok) return json({ error: 'Incorrect email or password.' }, 401);
  return json({ user: publicUser(user) }, 200, { 'Set-Cookie': await startSession(user.id, env) });
}

async function logout(request: Request, env: Env) {
  const token = readSessionToken(request);
  if (token) await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie('', 0) });
}

async function currentUser(request: Request, env: Env) {
  const token = readSessionToken(request);
  if (!token) return null;
  return env.DB.prepare(
    `SELECT users.* FROM sessions JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = ? AND sessions.expires_at > ?`
  )
    .bind(await sha256(token), Date.now())
    .first<UserRow>();
}

async function me(request: Request, env: Env) {
  const user = await currentUser(request, env);
  return json({ user: user ? publicUser(user) : null });
}

/* ── Account settings (signed-in only) ────────────────────── */

async function updateDiscoverable(user: UserRow, body: Record<string, unknown>, env: Env) {
  if (typeof body.discoverable !== 'boolean') return json({ error: 'Invalid request' }, 400);
  const updated = await env.DB.prepare('UPDATE users SET discoverable = ? WHERE id = ? RETURNING *')
    .bind(body.discoverable ? 1 : 0, user.id)
    .first<UserRow>();
  return json({ user: publicUser(updated!) });
}

// Changing the email or password needs the current password, so a borrowed session isn't enough.
async function changeEmail(user: UserRow, body: Record<string, unknown>, env: Env) {
  const email = clean(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (!(await verifyPassword(String(body.password ?? '').slice(0, MAX_PASSWORD), user.password_hash))) {
    return json({ error: 'Your current password is incorrect.' }, 401);
  }
  if (email === user.email) return json({ user: publicUser(user) });

  const updated = await env.DB.prepare(
    `UPDATE users SET email = ? WHERE id = ?
     AND NOT EXISTS (SELECT 1 FROM users WHERE email = ?)
     RETURNING *`
  )
    .bind(email, user.id, email)
    .first<UserRow>();
  if (!updated) return json({ error: 'An account with this email already exists.' }, 409);
  return json({ user: publicUser(updated) });
}

async function changePassword(user: UserRow, body: Record<string, unknown>, env: Env) {
  const current = String(body.currentPassword ?? '').slice(0, MAX_PASSWORD);
  const next = String(body.newPassword ?? '');
  if (next.length < MIN_PASSWORD || next.length > MAX_PASSWORD) {
    return json({ error: `Password must be ${MIN_PASSWORD} to ${MAX_PASSWORD} characters.` }, 400);
  }
  if (!(await verifyPassword(current, user.password_hash))) {
    return json({ error: 'Your current password is incorrect.' }, 401);
  }

  // Sign out every other device, then give this browser a fresh session.
  await env.DB.batch([
    env.DB.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(await hashPassword(next), user.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(user.id),
  ]);
  return json({ user: publicUser(user) }, 200, { 'Set-Cookie': await startSession(user.id, env) });
}

/* ── Ideas Workspace (signed-in only, each member sees only their own) ── */

const MAX_IDEAS_PER_USER = 200;

type IdeaRow = {
  id: number;
  title: string;
  body: string;
  tags: string;
  subtags: string;
  created_at: number;
  updated_at: number;
};

const publicIdea = (i: IdeaRow) => ({
  id: i.id,
  title: i.title,
  body: i.body,
  tags: JSON.parse(i.tags) as string[],
  subtags: JSON.parse(i.subtags) as string[],
  createdAt: i.created_at,
  updatedAt: i.updated_at,
});

// Keep only known names, without duplicates, in the canonical order.
const pick = (value: unknown, allowed: readonly string[]) =>
  Array.isArray(value) ? allowed.filter((name) => value.includes(name)) : [];

function readIdea(body: Record<string, unknown>) {
  const title = clean(body.title, MAX_TITLE);
  // Unlike clean(), keep line breaks and tabs so paragraphs survive.
  const text = Array.from(String(body.body ?? ''))
    .filter((c) => c >= ' ' || c === '\n' || c === '\t')
    .join('')
    .trim()
    .slice(0, MAX_BODY);
  if (!title) return 'Please give your idea a name.';
  if (!text) return 'Please describe your idea.';
  return {
    title,
    body: text,
    tags: JSON.stringify(pick(body.tags, TAGS)),
    subtags: JSON.stringify(pick(body.subtags, SUBTAGS)),
  };
}

async function listIdeas(user: UserRow, env: Env) {
  const { results } = await env.DB.prepare(
    'SELECT * FROM ideas WHERE user_id = ? ORDER BY updated_at DESC'
  )
    .bind(user.id)
    .all<IdeaRow>();
  return json({ ideas: results.map(publicIdea) });
}

async function getIdea(user: UserRow, id: number, env: Env) {
  const idea = await env.DB.prepare('SELECT * FROM ideas WHERE id = ? AND user_id = ?')
    .bind(id, user.id)
    .first<IdeaRow>();
  return idea ? json({ idea: publicIdea(idea) }) : json({ error: 'Idea not found.' }, 404);
}

async function createIdea(user: UserRow, body: Record<string, unknown>, env: Env) {
  const idea = readIdea(body);
  if (typeof idea === 'string') return json({ error: idea }, 400);
  const now = Date.now();
  const created = await env.DB.prepare(
    `INSERT INTO ideas (user_id, title, body, tags, subtags, created_at, updated_at)
     SELECT ?, ?, ?, ?, ?, ?, ?
     WHERE (SELECT COUNT(*) FROM ideas WHERE user_id = ?) < ?
     RETURNING *`
  )
    .bind(user.id, idea.title, idea.body, idea.tags, idea.subtags, now, now, user.id, MAX_IDEAS_PER_USER)
    .first<IdeaRow>();
  if (!created) {
    return json({ error: `You can save up to ${MAX_IDEAS_PER_USER} ideas. Delete one to add another.` }, 409);
  }
  return json({ idea: publicIdea(created) }, 201);
}

async function updateIdea(user: UserRow, id: number, body: Record<string, unknown>, env: Env) {
  const idea = readIdea(body);
  if (typeof idea === 'string') return json({ error: idea }, 400);
  const updated = await env.DB.prepare(
    `UPDATE ideas SET title = ?, body = ?, tags = ?, subtags = ?, updated_at = ?
     WHERE id = ? AND user_id = ?
     RETURNING *`
  )
    .bind(idea.title, idea.body, idea.tags, idea.subtags, Date.now(), id, user.id)
    .first<IdeaRow>();
  return updated ? json({ idea: publicIdea(updated) }) : json({ error: 'Idea not found.' }, 404);
}

async function deleteIdea(user: UserRow, id: number, env: Env) {
  const { meta } = await env.DB.prepare('DELETE FROM ideas WHERE id = ? AND user_id = ?')
    .bind(id, user.id)
    .run();
  return meta.changes ? json({ ok: true }) : json({ error: 'Idea not found.' }, 404);
}

// Routes /api/ideas and /api/ideas/:id. Returns null for paths it doesn't own.
async function ideas(request: Request, url: URL, env: Env) {
  const match = url.pathname.match(/^\/api\/ideas(?:\/(\d+))?$/);
  if (!match) return null;
  const user = await currentUser(request, env);
  if (!user) return json({ error: 'Please log in again.' }, 401);
  const id = match[1] ? Number(match[1]) : null;

  if (request.method === 'GET') return id === null ? listIdeas(user, env) : getIdea(user, id, env);
  if (request.method === 'DELETE' && id !== null) return deleteIdea(user, id, env);
  if (request.method !== 'POST' && request.method !== 'PUT') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
  if (request.method === 'POST' && id === null) return createIdea(user, body, env);
  if (request.method === 'PUT' && id !== null) return updateIdea(user, id, body, env);
  return json({ error: 'Method not allowed' }, 405);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

    if (request.method === 'GET') {
      try {
        if (url.pathname === '/api/me') return await me(request, env);
        return (await ideas(request, url, env)) ?? json({ error: 'Not found' }, 404);
      } catch (err) {
        console.error('Handler error', err instanceof Error ? err.message : 'unknown');
        return json({ error: 'Something went wrong. Please try again later.' }, 500);
      }
    }
    if (!['POST', 'PUT', 'DELETE'].includes(request.method)) {
      return json({ error: 'Method not allowed' }, 405);
    }

    // Only accept requests that come from this same site.
    if (request.headers.get('Origin') !== url.origin) return json({ error: 'Forbidden' }, 403);
    // Ideas can be up to 10,000 characters, which is more bytes than that in non-Latin scripts.
    if (Number(request.headers.get('Content-Length') ?? 0) > 64000) {
      return json({ error: 'Request too large' }, 413);
    }

    // Ideas rely on the session instead of a bot check, like account settings.
    try {
      const res = await ideas(request, url, env);
      if (res) return res;
    } catch (err) {
      console.error('Handler error', err instanceof Error ? err.message : 'unknown');
      return json({ error: 'Something went wrong. Please try again later.' }, 500);
    }
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    // Logging out needs no body or bot check.
    if (url.pathname === '/api/logout') return await logout(request, env);

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: 'Invalid request' }, 400);
    }

    // Account settings rely on the session (and password, where it matters) instead of a bot check.
    if (url.pathname.startsWith('/api/account/')) {
      try {
        const user = await currentUser(request, env);
        if (!user) return json({ error: 'Please log in again.' }, 401);
        if (url.pathname === '/api/account/discoverable') return await updateDiscoverable(user, body, env);
        if (url.pathname === '/api/account/email') return await changeEmail(user, body, env);
        if (url.pathname === '/api/account/password') return await changePassword(user, body, env);
      } catch (err) {
        console.error('Handler error', err instanceof Error ? err.message : 'unknown');
        return json({ error: 'Something went wrong. Please try again later.' }, 500);
      }
      return json({ error: 'Not found' }, 404);
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
      if (url.pathname === '/api/signup') return await signup(body, env);
      if (url.pathname === '/api/login') return await login(body, env);
    } catch (err) {
      console.error('Handler error', err instanceof Error ? err.message : 'unknown');
      return json({ error: 'Something went wrong. Please try again later.' }, 500);
    }
    return json({ error: 'Not found' }, 404);
  },
};

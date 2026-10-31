/**
 * Turnstile (bot check) site key for every form on the site.
 *
 * Branch previews (<branch>-sim-civics.<subdomain>.workers.dev) and localhost use Cloudflare's
 * published always-pass test key, so they don't need to be on the real widget's hostname list.
 * For that to work, a preview's TURNSTILE_SECRET must be the matching test secret
 * (1x0000000000000000000000000000000AA). Production keeps the real widget.
 */
const REAL_SITE_KEY = '0x4AAAAAAFr_0iYfpD7W-5oP';
const TEST_SITE_KEY = '1x00000000000000000000AA';

const host = typeof window === 'undefined' ? '' : window.location.hostname;
const isPreview = host.endsWith('.workers.dev') && !host.startsWith('sim-civics.');
const isLocal = host === 'localhost' || host === '127.0.0.1';

export const TURNSTILE_SITE_KEY = isPreview || isLocal ? TEST_SITE_KEY : REAL_SITE_KEY;

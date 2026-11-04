// Study Deck service worker: makes repeat visits instant and lets studied courses open with no connection.
// - The page (index.html) is fetched from the network first, so a new version always shows up; the saved copy is used only
//   when the network fails or takes longer than 4 s (a weak mobile signal).
// - Every other file of the site has a content hash in its URL (?v=…) or is a fixed vendor file, so it never changes:
//   it is served from the saved copy, and fetched only the first time. When a newer version of a file is saved,
//   the older versions of that file are deleted, so the storage holds one copy of each file you have opened.
// To switch it off, replace this file with one that calls self.registration.unregister() and deletes the caches.
const CACHE = 'sd-files-v1', PAGE = 'sd-page-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE && k !== PAGE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  if (r.mode === 'navigate') e.respondWith(page(r, e));
  else if (/^\?v=[0-9a-f]+$/.test(u.search) || u.pathname.startsWith('/vendor/')) e.respondWith(file(r, u));
});

async function page(r, e) {
  const c = await caches.open(PAGE);
  const net = fetch(r).then(res => { if (res.ok) c.put('/', res.clone()); return res; });
  e.waitUntil(net.catch(() => {}));
  const slow = new Promise(res => setTimeout(res, 4000));
  try {
    const res = await Promise.race([net, slow.then(() => c.match('/').then(m => m || net))]);
    return res;
  } catch (err) {
    const m = await c.match('/');
    if (m) return m;
    throw err;
  }
}

async function file(r, u) {
  const c = await caches.open(CACHE);
  const hit = await c.match(r);
  if (hit) return hit;
  const res = await fetch(r);
  if (res.ok && res.type === 'basic') {
    await c.put(r, res.clone());
    for (const k of await c.keys()) { const ku = new URL(k.url); if (ku.pathname === u.pathname && ku.search !== u.search) await c.delete(k); }
  }
  return res;
}

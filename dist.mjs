// Builds dist/, the standalone site for static hosting (Vercel).
// index.html is written for claude.ai, which wraps it in a document skeleton; here we add that skeleton ourselves.
// Run after build.mjs: node build.mjs && node dist.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const SITE = 'https://study-deck-five.vercel.app';
const TITLE = 'Study Deck · Level 3 CS';
const DESC = 'Notes, flashcards, quizzes and 31 solved past papers for six Level 3 Computer Science courses, with Egyptian Arabic explanations.';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
const hash = buf => createHash('sha256').update(buf).digest('hex').slice(0, 8);
// every script URL carries a hash of its content, so vercel.json can let browsers keep them for a year:
// a returning visitor downloads only index.html, and a changed file gets a new URL
const ver = f => f + '?v=' + hash(readFileSync(f));
const dataV = Object.fromEntries(readdirSync('data').filter(f => f.endsWith('.js')).map(f => [f.slice(0, -3), hash(readFileSync('data/' + f))]));
// React and htm are served from this site (vendor/, the same versions as the CDN): no extra DNS and TLS handshakes before the first render.
// app.js still falls back to the CDN mirrors if these ever fail.
const VENDOR = {
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js': 'vendor/react-18.3.1.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js': 'vendor/react-dom-18.3.1.production.min.js',
  'https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.umd.js': 'vendor/htm-3.1.1.umd.js'
};
let page = readFileSync('index.html', 'utf8');
for (const [cdn, local] of Object.entries(VENDOR)) {
  if (!page.includes(`src="${cdn}"`)) throw new Error('index.html no longer loads ' + cdn + '; update VENDOR in dist.mjs');
  page = page.replace(`src="${cdn}"`, `src="${local}"`);
}
page = page
  .replace(/<link rel="preconnect" href="https:\/\/(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)" crossorigin>\n/g, '')
  .replace('<script defer src="manifest.js"></script>', `<script>window.DATA_V=${JSON.stringify(dataV)}</script>\n<script defer src="${ver('manifest.js')}"></script>`)
  .replace('<script defer src="app.js"></script>', `<script defer src="${ver('app.js')}"></script>`);
// chat apps cache a preview image by its URL, so the file name carries a hash of its content: a new image gets a new URL
const og = readFileSync('public/og.jpg');
const OG = `og-${hash(og)}.jpg`;
// the card shown when the link is shared (Open Graph for WhatsApp, Discord, LinkedIn, Facebook; Twitter card for X)
const share = `<meta name="description" content="${DESC}">
<meta name="theme-color" content="#7444D6">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Study Deck">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${SITE}/">
<meta property="og:image" content="${SITE}/${OG}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Study Deck: Level 3 CS, all in one place">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${SITE}/${OG}">`;
writeFileSync('dist/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${page.replace(/(<meta name="viewport"[^>]*>)/, '$1\n' + share).replace('</style>', '</style>\n</head>\n<body>')}
</body>
</html>
`);
for (const f of ['app.js', 'manifest.js', 'data']) cpSync(f, 'dist/' + f, { recursive: true });
mkdirSync('dist/vendor');
for (const [local, file] of [['react-18.3.1.production.min.js', 'react.production.min.js'], ['react-dom-18.3.1.production.min.js', 'react-dom.production.min.js'], ['htm-3.1.1.umd.js', 'htm.umd.js']]) cpSync('vendor/' + file, 'dist/vendor/' + local);
cpSync('public', 'dist', { recursive: true });
writeFileSync('dist/' + OG, og);
console.log('dist/ ready');

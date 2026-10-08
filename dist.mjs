// Builds dist/, the standalone site for static hosting (Vercel).
// index.html is written for claude.ai, which wraps it in a document skeleton; here we add that skeleton ourselves.
// Run after build.mjs: node build.mjs && node dist.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';

const SITE = 'https://study-deck-five.vercel.app';
const TITLE = 'Study Deck · Level 3 CS';
const DESC = 'Notes, flashcards, quizzes and 31 solved past papers for six Level 3 Computer Science courses, with Egyptian Arabic explanations.';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
const page = readFileSync('index.html', 'utf8');
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
<meta property="og:image" content="${SITE}/og.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Study Deck: Level 3 CS, all in one place">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${SITE}/og.jpg">`;
writeFileSync('dist/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${page.replace(/(<meta name="viewport"[^>]*>)/, '$1\n' + share).replace('</style>', '</style>\n</head>\n<body>')}
</body>
</html>
`);
for (const f of ['app.js', 'manifest.js', 'data']) cpSync(f, 'dist/' + f, { recursive: true });
cpSync('public', 'dist', { recursive: true });
console.log('dist/ ready');

// Builds dist/, the standalone site for static hosting (Vercel).
// index.html is written for claude.ai, which wraps it in a document skeleton; here we add that skeleton ourselves.
// Run after build.mjs: node build.mjs && node dist.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
const page = readFileSync('index.html', 'utf8');
writeFileSync('dist/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${page.replace('</style>', '</style>\n</head>\n<body>')}
</body>
</html>
`);
for (const f of ['app.js', 'manifest.js', 'data']) cpSync(f, 'dist/' + f, { recursive: true });
console.log('dist/ ready');

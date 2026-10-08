// Builds the files the page loads from the editable course sources (compiler.js, os.js, ...).
//   data/<id>.js   one course, minified, wrapped in JSON.parse (faster to parse than an object literal)
//   manifest.js    names and counts for the shelf, so the home page loads without any course data
// Run: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const SOURCES = ['compiler', 'os', 'multimedia', 'qa', 'hci', 'fp'];
const ctx = {};
ctx.window = ctx; // the sources use window as the global object, like a browser
vm.createContext(ctx);
for (const f of SOURCES) vm.runInContext(readFileSync(`${f}.js`, 'utf8'), ctx, { filename: `${f}.js` });
const COURSES = ctx.window.COURSES;
// extra/<id>.js: practice questions written for the site (not the professor's), merged into each lecture as lecture.extra
for (const id of Object.keys(COURSES)) {
  const f = `extra/${id}.js`;
  if (existsSync(f)) vm.runInContext(readFileSync(f, 'utf8'), ctx, { filename: f });
}
const EXTRA = ctx.window.EXTRA || {};
// papers/<id>.js: more solved past papers, plus their questions filed under the matching lectures (professor's questions)
for (const id of Object.keys(COURSES)) {
  const f = `papers/${id}.js`;
  if (existsSync(f)) vm.runInContext(readFileSync(f, 'utf8'), ctx, { filename: f });
}
const PAPERS = ctx.window.PAPERS || {};
for (const [id, c] of Object.entries(COURSES)) {
  const P = PAPERS[id]; if (!P) continue;
  if (P.exams) c.exams = c.exams.concat(P.exams);
  for (const l of c.lectures) if (P.quiz && P.quiz[l.n]) l.quiz = l.quiz.concat(P.quiz[l.n]);
}
for (const [id, c] of Object.entries(COURSES)) for (const l of c.lectures) l.extra = (EXTRA[id] && EXTRA[id][l.n]) || [];
// where a quiz question came from: the professor (exam, sheet, lecture example), a student summary, or the site itself
const originOf = q => !q.src ? 'extra' : /^(exam|midterm)\b/i.test(q.src) ? 'exam' : /sheet|revision/i.test(q.src) ? 'sheet' : /^lecture\b/i.test(q.src) ? 'lecture' : /summary/i.test(q.src) ? 'summary' : 'extra';

mkdirSync('data', { recursive: true });
const manifest = {};
for (const [id, c] of Object.entries(COURSES)) {
  const json = JSON.stringify(c);
  writeFileSync(`data/${id}.js`, `(window.COURSES=window.COURSES||{})[${JSON.stringify(id)}]=JSON.parse(${JSON.stringify(json)});\n`);
  manifest[id] = {
    name: c.name, short: c.short, code: c.code, by: c.by,
    lectures: c.lectures.map(l => ({ n: l.n, title: l.title })),
    cards: c.lectures.reduce((a, l) => a + l.cards.length, 0),
    quiz: c.lectures.reduce((a, l) => a + l.quiz.length + l.extra.length, 0),
    prof: c.lectures.reduce((a, l) => a + l.quiz.filter(q => ['exam', 'sheet', 'lecture'].includes(originOf(q))).length, 0),
    extra: c.lectures.reduce((a, l) => a + l.quiz.filter(q => originOf(q) === 'extra').length + l.extra.length, 0),
    exams: c.exams.length,
    qa: c.lectures.reduce((a, l) => a + l.qa.length, 0),
    examQs: c.lectures.reduce((a, l) => a + l.quiz.filter(q => q.src && /^(exam|midterm)\b/i.test(q.src)).length, 0)
  };
  console.log(`data/${id}.js`.padEnd(20), (json.length / 1024).toFixed(0).padStart(5), 'KB');
}
for (const id of Object.keys(COURSES)) {
  const f = `ar/${id}.js`;
  if (!existsSync(f)) continue;
  const actx = {}; actx.window = actx; vm.createContext(actx);
  vm.runInContext(readFileSync(f, 'utf8'), actx, { filename: f });
  const json = JSON.stringify(actx.window.AR[id]);
  writeFileSync(`data/ar-${id}.js`, `(window.AR=window.AR||{})[${JSON.stringify(id)}]=JSON.parse(${JSON.stringify(json)});\n`);
  manifest[id].ar = true;
  console.log(`data/ar-${id}.js`.padEnd(20), (json.length / 1024).toFixed(0).padStart(5), 'KB');
}
writeFileSync('manifest.js', `window.MANIFEST=${JSON.stringify(manifest)};\n`);
console.log('manifest.js'.padEnd(20), (JSON.stringify(manifest).length / 1024).toFixed(1).padStart(5), 'KB');

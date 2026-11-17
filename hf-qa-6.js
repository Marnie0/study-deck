// Head First chapter for Software Quality Assurance Lecture 6 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Software Quality Assurance: what quality is (conformance to requirements; directly and indirectly measurable factors), the 8
// quality factors, SQA vs SQC (prevention vs detection), testing vs QA with the tasks of testing, the tester's role, QA's
// responsibilities and task examples, ITSM and its two categories, "SQA is not just testing", the three test organization
// structures, metrics vs indicators, product vs process metrics, the 9 common metrics and the 9 software quality indicators.
// Every fact comes from the lecture's notes; analogies and the defect log below are ours and are marked as ours. The defect
// log's counts were done by hand twice and checked with node: 10 defects, 6 resolved, 4 not resolved, 3 detected in coding
// (D2 D3 D4), Payment has 5 of 10, and 10 bugs / 5,000 lines = 0.002 bugs per line.
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T6 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-qa6')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa6';
    s.textContent = `
.hfb .hf-qa6-tb{ display:grid; grid-template-columns:auto 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-qa6-tb > span{ padding:3px 7px; font-size:13.5px; line-height:1.26; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa6-tb > span:nth-child(-n+2){ border-top:0; }
.hf-ar .hf-qa6-tb > span{ line-height:1.45; }
.hfb .hf-qa6-tb.w{ grid-template-columns:minmax(0,1fr) minmax(0,1.35fr); } .hfb .hf-qa6-tb.w > span.k{ white-space:normal; }
.hfb .hf-qa6-tb > span.k{ font:800 13.5px/1.26 var(--body); color:var(--hf-k); background:var(--hf-grey); white-space:nowrap; }
.hfb .hf-qa6-vs{ display:grid; grid-template-columns:auto 1fr 1fr; border:2px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-qa6-vs > span{ padding:5px 7px; font-size:14px; line-height:1.28; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa6-vs > span.h{ font:800 14.5px/1.2 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; }
.hfb .hf-qa6-vs > span.r{ font:700 13.5px/1.28 var(--body); color:var(--graphite); background:var(--hf-grey); }
.hfb .hf-qa6-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-qa6-two > div{ border:1.6px solid var(--hf-line); border-radius:8px; padding:7px 8px; background:var(--paper); }
.hfb .hf-qa6-two > div.k{ border-color:var(--hf-k); box-shadow:3px 3px 0 color-mix(in srgb, var(--hf-k) 30%, transparent); }
.hfb .hf-qa6-two b.t{ display:block; font:800 15px/1.15 var(--body); margin-bottom:4px; color:var(--ink); }
.hfb .hf-qa6-two p{ margin:0; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-qa6-dl{ display:grid; gap:3px; margin:0; padding:0; list-style:none; }
.hfb .hf-qa6-dl li{ position:relative; padding-left:13px; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-qa6-dl li::before{ content:""; position:absolute; left:1px; top:.5em; width:6px; height:6px; border-radius:50%; background:var(--hf-k); }
.hf-ar .hf-qa6-dl li{ padding-left:0; padding-right:13px; } .hf-ar .hf-qa6-dl li::before{ left:auto; right:1px; top:.68em; }
.hfb .hf-qa6-ol{ display:grid; gap:3px; margin:0; padding:0; list-style:none; counter-reset:q6; }
.hfb .hf-qa6-ol li{ position:relative; padding-left:24px; font-size:14px; line-height:1.3; color:var(--ink); counter-increment:q6; }
.hfb .hf-qa6-ol li::before{ content:counter(q6); position:absolute; left:0; top:1px; width:18px; height:18px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 12px/18px var(--body); text-align:center; }
.hf-ar .hf-qa6-ol li{ padding-left:0; padding-right:24px; } .hf-ar .hf-qa6-ol li::before{ left:auto; right:0; top:3px; }
/* name that factor */
.hfb .hf-qa6-game{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; background:var(--paper); }
.hfb .hf-qa6-tabs{ display:flex; gap:4px; }
.hfb .hf-qa6-tabs button{ flex:1 1 0; min-width:0; font:800 13.5px/1 var(--body); min-height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa6-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qa6-tabs button.ok{ border-color:var(--ok); color:var(--ok); } .hfb .hf-qa6-tabs button.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-qa6-tabs button[aria-pressed="true"].ok, .hfb .hf-qa6-tabs button[aria-pressed="true"].no{ color:var(--paper); }
.hfb .hf-qa6-scn{ margin:0; min-height:62px; font:600 15px/1.35 var(--body); color:var(--ink); padding:6px 9px; background:var(--hf-grey); border-left:4px solid var(--hf-k); }
.hf-ar .hf-qa6-scn{ border-left:0; border-right:4px solid var(--hf-k); font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.55; }
.hfb .hf-qa6-pick{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.hfb .hf-qa6-pick button{ font:600 13.5px/1.1 var(--body); min-height:32px; padding:3px 8px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; text-align:left; }
.hfb .hf-qa6-pick button.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-qa6-pick button.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qa6-fb{ margin:0; font-size:13.5px; line-height:1.32; color:var(--ink); min-height:36px; }
.hf-ar .hf-qa6-fb{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
/* defect log */
.hfb .hf-qa6-log{ display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); gap:4px; direction:ltr; }
.hfb .hf-qa6-log > div{ border:1.5px solid var(--hf-line); border-radius:6px; padding:3px 4px; background:var(--paper); font:600 12.5px/1.25 var(--body); color:var(--ink); text-align:center; }
.hfb .hf-qa6-log > div b{ display:block; font:800 13px/1.2 var(--mono); }
.hfb .hf-qa6-log > div.open{ border-color:var(--hf-red); }
.hfb .hf-qa6-log > div .st{ font-weight:800; }
.hfb .hf-qa6-log > div.open .st{ color:var(--hf-red); } .hfb .hf-qa6-log > div.fixed .st{ color:var(--ok); }
.hfb .hf-qa6-qs{ display:grid; gap:4px; }
.hfb .hf-qa6-qs > div{ display:grid; grid-template-columns:1fr 92px; gap:6px; align-items:center; font-size:13.5px; line-height:1.25; color:var(--ink); }
.hf-ar .hf-qa6-qs > div{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.4; }
.hfb .hf-qa6-in{ width:100%; box-sizing:border-box; height:31px; font:700 15px/1 var(--mono); text-align:center; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-qa6-in.ok, .hfb .hf-qa6-mods button.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); } .hfb .hf-qa6-in.no, .hfb .hf-qa6-mods button.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qa6-mods{ display:flex; gap:4px; direction:ltr; }
.hfb .hf-qa6-mods button{ flex:1 1 0; min-width:0; font:600 13px/1 var(--body); min-height:31px; padding:0 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qa6-mods button[aria-pressed="true"]{ border-color:var(--hf-hand); box-shadow:0 0 0 1.5px var(--hf-hand); }
.hfb .hf-qa6-qs > div.wide{ grid-template-columns:1fr; gap:3px; }
.hfb .hf-qa6-sol{ font:600 13px/1.4 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 8px; margin:0; direction:ltr; text-align:left; }
.hfb .hf-qa6-sol b{ color:var(--hf-k); }
/* org charts */
.hfb .hf-qa6-org{ display:grid; gap:5px; direction:ltr; }
.hfb .hf-qa6-org > div{ position:relative; border:1.5px solid var(--hf-line); border-radius:8px; padding:5px 6px 6px 30px; display:flex; flex-direction:column; align-items:center; background:var(--paper); }
.hfb .hf-qa6-org .n{ position:absolute; left:8px; top:6px; font:800 17px/1 var(--body); color:var(--hf-k); }
.hfb .hf-qa6-org span.b{ font:700 13px/1.15 var(--body); border:1.3px solid var(--graphite); border-radius:5px; padding:3px 7px; text-align:center; color:var(--ink); background:var(--paper); }
.hfb .hf-qa6-org span.t{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 16%, var(--paper)); }
.hfb .hf-qa6-org i{ display:block; width:1.5px; height:8px; background:var(--graphite); }
.hfb .hf-qa6-org .kids{ display:flex; gap:8px; justify-content:center; border-top:1.5px solid var(--graphite); padding-top:6px; }
.hfb .hf-qa6-org .kids > div{ display:flex; flex-direction:column; align-items:center; }
`;
    document.head.appendChild(s);
  }

  // Name that factor: our own scenarios, one for each of the 8 quality factors (meanings from the notes)
  const FACTORS = ['Reliability', 'Efficiency', 'Integrity', 'Usability', 'Maintainability', 'Flexibility', 'Portability', 'Reusability'];
  const MEAN = {
    en: ['performs its intended function accurately', 'optimal use of computing resources', 'control over access and security', 'effort required to learn and operate the program', 'effort required to locate and fix errors', 'effort required to change the program', 'effort required to transfer the program to another system', 'which parts can be used in other applications'],
    ar: ['البرنامج بيعمل الوظيفة المطلوبة منه بدقة', 'استخدام أمثل للـ computing resources', 'التحكم في الـ access والـ security', 'المجهود اللي محتاجه عشان تتعلم البرنامج وتشغّله', 'المجهود اللي محتاجه عشان تلاقي الـ errors وتصلحها', 'المجهود اللي محتاجه عشان تغيّر البرنامج', 'المجهود اللي محتاجه عشان تنقل البرنامج لـ system تاني', 'أنهي أجزاء ينفع تتستخدم في applications تانية']
  };
  const SCN = [
    { a: 0, en: 'The payroll program computes every salary exactly right, every month.', ar: 'برنامج المرتبات بيحسب كل مرتب صح بالظبط، كل شهر.' },
    { a: 6, en: 'Moving the shop system from Windows servers to Linux servers took the team one day.', ar: 'نقل الـ system بتاع المحل من Windows servers لـ Linux servers أخد من الـ team يوم واحد.' },
    { a: 2, en: 'Only the doctors and nurses on duty can open a patient\'s record.', ar: 'مفيش غير الدكاترة والممرضين اللي في الشيفت يقدروا يفتحوا ملف المريض.' },
    { a: 4, en: 'A crash is reported; a developer finds the faulty line and fixes it in ten minutes.', ar: 'اتبلّغ عن crash، والـ developer لقى السطر الغلط وصلّحه في عشر دقايق.' },
    { a: 7, en: 'The team takes the login module from last year\'s project and uses it in a new app.', ar: 'الـ team خد الـ login module من مشروع السنة اللي فاتت واستخدمه في app جديد.' },
    { a: 1, en: 'The same report now runs on half the memory and a quarter of the CPU time.', ar: 'نفس الـ report بقى بيشتغل بنص الـ memory وربع وقت الـ CPU.' },
    { a: 3, en: 'A new cashier learns to operate the system in one hour, with no manual.', ar: 'كاشير جديد اتعلّم يشغّل الـ system في ساعة، من غير manual.' },
    { a: 5, en: 'A new tax rule arrives, and changing the program to apply it takes one afternoon.', ar: 'نزلت قاعدة ضرايب جديدة، وتغيير البرنامج عشان يطبّقها أخد بعد الضهر بس.' }
  ];
  function FactorGame() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('fac:k', 0);
    const [pick, setPick] = H.K.useSlot('fac', {});
    const s = SCN[k], p = pick[k];
    const right = SCN.filter((x, j) => pick[j] === x.a).length, done = Object.keys(pick).length;
    const choose = j => { if (p != null) return; setPick(Object.assign({}, pick, { [k]: j })); };
    const M = ar ? MEAN.ar : MEAN.en;
    return html`<div className="hf-qa6-game hf-in">
      <div className="hf-qa6-tabs" dir="ltr" role="group" aria-label="Scenarios">${SCN.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${pick[j] == null ? '' : pick[j] === x.a ? 'ok' : 'no'} onClick=${() => setK(j)} aria-label=${'Scenario ' + (j + 1)}>${j + 1}</button>`)}</div>
      <p className="hf-qa6-scn">${ar ? s.ar : s.en}</p>
      <div className="hf-qa6-pick" dir="ltr">${FACTORS.map((f, j) => html`<button key=${j} className=${p == null ? '' : j === s.a ? 'ok' : j === p ? 'no' : ''} onClick=${() => choose(j)} aria-pressed=${String(p === j)}>${f}</button>`)}</div>
      <p className="hf-qa6-fb">${p == null ? (ar ? 'اختار الـ factor اللي بيوصف الموقف ده.' : 'Pick the factor this scenario shows.')
        : ar ? T6((p === s.a ? 'صح! ' : 'لأ، دي ') + 'الـ <b>' + FACTORS[s.a] + '</b>: ' + M[s.a] + '.')
        : T6((p === s.a ? 'Right! ' : 'No, it\'s ') + '<b>' + FACTORS[s.a] + '</b>: ' + M[s.a] + '.')}</p>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => setK((k + 1) % SCN.length)}>${ar ? 'الموقف الجاي' : 'Next scenario'}</button>
        <button className="hf-btn" onClick=${() => { const n = {}; SCN.forEach((x, j) => { n[j] = x.a; }); setPick(n); }}>${ar ? 'ورّيني الإجابات' : 'Show all answers'}</button>
        ${done > 0 && html`<span className="hf-score">${ar ? html`<bdi>${right} / 8</bdi> صح` : right + ' / 8 right'}</span>`}
      </div></div>`;
  }

  // Be the QA analyst: our own defect log for one month (module, phase it was detected in, resolved or not)
  const LOG = [
    ['D1', 'Login', 'Design', 1], ['D2', 'Payment', 'Coding', 1], ['D3', 'Payment', 'Coding', 0], ['D4', 'Cart', 'Coding', 1], ['D5', 'Payment', 'Testing', 0],
    ['D6', 'Login', 'Testing', 1], ['D7', 'Payment', 'Testing', 1], ['D8', 'Cart', 'Testing', 0], ['D9', 'Payment', 'Design', 1], ['D10', 'Login', 'Testing', 0]
  ];
  const MODS = ['Login', 'Cart', 'Payment'];
  const ANS = { rem: LOG.filter(d => d[3]).length, age: LOG.filter(d => !d[3]).length, cod: LOG.filter(d => d[2] === 'Coding').length, mod: 'Payment', bpl: LOG.length / 5000 };
  function DefectLog() {
    const ar = useAr();
    const [a, setA] = H.K.useSlot('log', {});
    const [c, setC] = H.K.useSlot('log:c', false);
    const n = v => { const s = String(v == null ? '' : v).trim().replace(',', '.'); return /^\d*\.?\d+$/.test(s) ? +s : NaN; };
    const ok = { rem: n(a.rem) === ANS.rem, age: n(a.age) === ANS.age, cod: n(a.cod) === ANS.cod, mod: a.mod === ANS.mod, bpl: Math.abs(n(a.bpl) - ANS.bpl) < 1e-9 };
    const right = Object.values(ok).filter(Boolean).length;
    const set = (key, v) => { setA(Object.assign({}, a, { [key]: v })); if (c) setC(false); };
    const st = key => c ? (ok[key] ? ' ok' : ' no') : '';
    const inp = (key, label) => html`<div><span>${T6(label)}</span><input className=${'hf-qa6-in' + st(key)} type="text" inputMode="decimal" autoComplete="off" spellCheck="false" maxLength="6" aria-label=${label.replace(/<[^>]+>/g, '')} value=${a[key] == null ? '' : a[key]} onChange=${e => set(key, e.target.value)} /></div>`;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-qa6-log">${LOG.map(d => html`<div key=${d[0]} className=${d[3] ? 'fixed' : 'open'}><b>${d[0]}</b>${d[1]}<br/>${d[2]}<br/><span className="st">${d[3] ? '✓ fixed' : '✕ open'}</span></div>`)}</div>
      <div className="hf-qa6-qs">
        ${inp('rem', ar ? '<b>1.</b> الـ Defect removal rate: كام defect اتكشف واتحل؟' : '<b>1.</b> Defect removal rate: how many detected <b>and</b> resolved?')}
        ${inp('age', ar ? '<b>2.</b> الـ Defect age profile: كام defect ماتحلش؟' : '<b>2.</b> Defect age profile: how many <b>not</b> resolved?')}
        ${inp('cod', ar ? '<b>3.</b> الـ Defect detection efficiency في الـ Coding phase: كام اتكشف فيها؟' : '<b>3.</b> Defect detection efficiency of the Coding phase: how many detected in it?')}
        <div className="wide"><span>${T6(ar ? '<b>4.</b> الـ Defect density: أنهي جزء هو الـ defect-prone؟' : '<b>4.</b> Defect density: which part is defect-prone?')}</span>
          <div className="hf-qa6-mods">${MODS.map(m => html`<button key=${m} aria-pressed=${String(a.mod === m)} className=${c && a.mod === m ? (m === ANS.mod ? 'ok' : 'no') : ''} onClick=${() => set('mod', m)}>${m}</button>`)}</div></div>
        ${inp('bpl', ar ? '<b>5.</b> الـ system كله <bdi dir="ltr">5,000</bdi> سطر. الـ bugs per line of code كام؟' : '<b>5.</b> The whole system is 5,000 lines. Bugs per line of code?')}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setC(true)} disabled=${!Object.keys(a).length}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setA({ rem: String(ANS.rem), age: String(ANS.age), cod: String(ANS.cod), mod: ANS.mod, bpl: '0.002' }); setC(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 5</bdi> صح` : right + ' / 5 right'}</span>`}
      </div>
    </div>`;
  }

  // the three org charts of the test organization structures (notes: slides 10, 11, 12)
  function OrgCharts() {
    const B = (x, test) => html`<span className=${'b' + (test ? ' t' : '')}>${x}</span>`;
    return html`<div className="hf-qa6-org hf-in" dir="ltr">
      <div><span className="n">1</span>${B('Development Manager')}<i></i><div className="kids">${B('Testers', 1)}${B('Programmers')}</div></div>
      <div><span className="n">2</span>${B('Project Manager')}<i></i><div className="kids"><div>${B('Test Manager / Test Lead', 1)}<i></i>${B('Testers', 1)}</div><div>${B('Development Manager')}<i></i>${B('Programmers')}</div></div></div>
      <div><span className="n">3</span>${B('Executive Manager')}<i></i><div className="kids">${B('QA / Test Managers', 1)}${B('Development Managers')}${B('Project Managers')}</div></div>
    </div>`;
  }

  H.chapters.qa[6] = {
    title: 'Software Quality Assurance (SQA)', kicker: 'Chapter 6', run: 'software quality assurance',
    ar: { title: 'الـ Software Quality Assurance (SQA)', kicker: 'الفصل 6', run: 'الـ software quality assurance' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 6);
      const arL = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[6]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' questions (quiz items with src), with the site's Arabic why for each choice
      const q = re => { const i = lec.quiz.findIndex(x => re.test(strip(x.q)) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      // the site's own practice questions (no src), from quiz or extra
      const find = re => {
        let i = (lec.quiz || []).findIndex(x => !x.src && re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: arQuiz[i] };
        i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: arExtra[i] };
      };
      const pq = (id, re) => { const r = find(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const DL = ({ items }) => html`<ul className="hf-qa6-dl hf-in">${items.map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ul>`;
      const OL = ({ items }) => html`<ol className="hf-qa6-ol hf-in">${items.map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ol>`;
      return [
        // 0 · warm-up (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Five chapters of <b>testing</b>: black box, white box, cyclomatic complexity, web sites. Every one of them hunts bugs that are <b>already there</b>. This chapter asks a bigger question.',
            'خمس فصول <b>testing</b>: black box وwhite box والـ cyclomatic complexity والـ web sites. كلهم بيدوّروا على bugs <b>موجودة أصلًا</b>. الفصل ده بيسأل سؤال أكبر.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('A bakery throws away every burnt loaf before it reaches the shelf. Another bakery fixes the oven\'s thermostat and writes down the baking times. Both care about quality. What is the <b>difference</b> between what they do?',
            'فرن عيش بيرمي كل رغيف محروق قبل ما يوصل للرف. وفرن تاني بيظبط الـ thermostat بتاع الفرن وبيكتب أوقات الخَبز. الاتنين مهتمين بالـ quality. إيه <b>الفرق</b> بين اللي كل واحد فيهم بيعمله؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will name factors, sort tasks and read a real-looking defect log.', '<b>حل التمارين.</b> هتسمّي factors، وترتّب مهام، وتقرا defect log شبه الحقيقي.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are the traps from the doctors' papers.", '<b>خلّي بالك!</b> دي الفخاخ اللي في امتحانات الدكاترة.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">6</span><span className="t">${A ? html`الفصل السادس<br/>Software Quality` : html`Chapter six<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("Don't Just Catch Bugs. Stop Them.", 'متصطادش الـ bugs وبس. امنعها.')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('software quality assurance (SQA)', 'الـ software quality assurance (SQA)')}</p></div>
          <${Talk} who="bug">${X('Ha! Your testers find me <b>after</b> I\'m born. By then I\'m already in the code.', 'هاه! الـ testers بتوعك بيلاقوني <b>بعد</b> ما اتولدت. ساعتها أكون في الـ code خلاص.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Finding you is my job. Making sure fewer of you are born is the job of <b>SQA</b>.', 'إني ألاقيك دي شغلتي. إنما إن عددكم يقل من الأول، دي شغلانة الـ <b>SQA</b>.')}</${Talk}>
          <${P}>${X('In this chapter: what <b>quality</b> really means, its <b>8 factors</b>, why <b>SQA is not SQC</b>, who tests and who assures, how test teams are <b>organized</b>, and the <b>metrics</b> and <b>indicators</b> that put numbers on quality.',
            'في الفصل ده: الـ <b>quality</b> معناها إيه بجد، والـ <b>8 factors</b> بتوعها، وليه الـ <b>SQA مش هي الـ SQC</b>، ومين بيعمل test ومين بيعمل assurance، والـ test teams <b>بتتنظّم</b> إزاي، والـ <b>metrics</b> والـ <b>indicators</b> اللي بتحط أرقام على الـ quality.')}</${P}>
        `, { sec: t('What is quality?', 'يعني إيه quality؟') }),

        // 2 · what is quality
        page(html`
          <${H1}>${t('So what is quality?', 'يعني إيه quality أصلًا؟')}</${H1}>
          <${Def}>${X('<b>Quality</b> means <b>conformance to requirements</b>. It is the set of attributes <b>valued by end-users</b>.',
            'الـ <b>quality</b> معناها <b>conformance to requirements</b> (المطابقة للـ requirements). وهي مجموعة الـ attributes <b>اللي الـ end-users بيقدّروها</b>.')}</${Def}>
          <${Hand} arrow="up" red=${true}>${t('valued by END-USERS, not by developers, testers or managers', 'اللي الـ END-USERS بيقدّروها، مش الـ developers ولا الـ testers ولا المديرين')}</${Hand}>
          <${P} small=${true}>${X('Quality is affected by two kinds of factors:', 'والـ quality بتتأثر بنوعين من الـ factors:')}</${P}>
          <div className="hf-qa6-two hf-in">
            <div className="k"><b className="t">${t('Directly measurable', 'بتتقاس مباشرة')}</b><p>${X('You can count them. Example: <b>defects</b>.', 'تقدر تعدّها. مثال: الـ <b>defects</b>.')}</p></div>
            <div><b className="t">${t('Indirectly measurable', 'بتتقاس بشكل غير مباشر')}</b><p>${X('Examples: <b>maintainability</b>, <b>usability</b>.', 'أمثلة: الـ <b>maintainability</b> والـ <b>usability</b>.')}</p></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The number of defects is an <b>indirectly</b> measurable factor": <b>False</b>. Defects are the lecture\'s <b>direct</b> example.',
            'لو اتقالك إن الـ defects بتتقاس <b>بشكل غير مباشر</b>: غلط. الـ defects هي مثال المحاضرة على الـ <b>direct</b>.')}</p></${Box}>
        `),

        // 3 · figure: measurable
        page(html`
          <${Fig} name="qa-measurable" />
        `),

        // 4 · the 8 factors
        page(html`
          <${H2}>${t('The 8 software quality factors', 'الـ 8 software quality factors')}</${H2}>
          <div className="hf-qa6-tb hf-in">${FACTORS.map((f, i) => html`<${React.Fragment} key=${i}><span className="k">${f}</span><span>${A ? MEAN.ar[i] : MEAN.en[i].charAt(0).toUpperCase() + MEAN.en[i].slice(1)}</span></${React.Fragment}>`)}</div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Don\'t mix the "effort" factors: <b>maintainability</b> = <b>fix errors</b>, <b>flexibility</b> = <b>change</b> it, <b>portability</b> = <b>move</b> it.',
            'متلخبطش بين الـ factors بتوع المجهود. الـ maintainability يعني <b>تصلّح errors</b>، والـ flexibility يعني <b>تغيّره</b>، والـ portability يعني <b>تنقله</b>.')}</p></${Box}>
        `, { sec: t('The 8 quality factors', 'الـ 8 quality factors') }),

        // 5 · figure: eight factors
        page(html`
          <${Fig} name="qa-eight-factors" />
        `),

        // 6 · name that factor
        page(html`
          <${Box} kind="pencil" title=${t('Name that factor', 'سمّي الـ factor')}><p className="hf-p small">${t('Eight everyday scenarios (ours), one per factor. Read each and pick its factor.', 'تمن مواقف (من عندنا)، واحد لكل factor. اقرا كل موقف واختار الـ factor بتاعه.')}</p></${Box}>
          <${FactorGame} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 7 · SQA vs SQC
        page(html`
          <${H1}>${t('Assurance or control?', 'الـ Assurance ولا الـ Control؟')}</${H1}>
          <div className="hf-qa6-vs hf-in">
            <span className="h"></span><span className="h">SQA</span><span className="h">SQC</span>
            <span className="r">${t('Stands for', 'يعني')}</span><span>Assurance</span><span>Control</span>
            <span className="r">${t('Idea', 'الفكرة')}</span><span><b>${t('Prevention', 'المنع')}</b></span><span><b>${t('Detection', 'الاكتشاف')}</b></span>
            <span className="r">${t('Focus', 'التركيز')}</span><span>${X('<b>Process</b> (proactive)', 'الـ <b>Process</b> (proactive)')}</span><span>${X('<b>Product</b> (reactive)', 'الـ <b>Product</b> (reactive)')}</span>
            <span className="r">${t('Goal', 'الهدف')}</span><span>${t('Ensure standards and procedures are applied correctly', 'تضمن إن الـ standards والـ procedures بتتطبق صح')}</span><span>${t('Evaluate product quality and screen out non-compliant items', 'تقيّم الـ quality بتاعة الـ product وتشيل الـ items اللي مش مطابقة')}</span>
          </div>
          <${Hand} tilt=${true}>${t('Our trick: Assurance works on HOW it is made; Control checks WHAT was made.', 'حيلة من عندنا: الـ Assurance شغلها على الـ product بيتعمل «إزاي»، والـ Control بيفحص «إيه» اللي اتعمل.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Quality Assurance is the same as Quality Control": <b>False</b>. Process-focused and preventive is always SQA.',
            'لو اتقالك إن الـ QA هو نفسه الـ QC يبقى <b>غلط</b>. وأي اختيار بيقول إنه بيركّز على الـ process وبيمنع يبقى SQA.')}</p></${Box}>
        `, { sec: t('SQA vs SQC', 'الـ SQA والـ SQC') }),

        // 8 · figure: SQA vs SQC
        page(html`
          <${Fig} name="qa-sqa-sqc" />
        `),

        // 9 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: QA and QC, forever mistaken for each other.', 'قعدة الليلة: الـ QA والـ QC، اللي الناس بتلخبط بينهم.')} />
          <${Chat} names=${[t('SQA', 'الـ SQA'), t('SQC', 'الـ SQC')]} lines=${A ? [
            [0, 'الناس فاكرين إننا واحد. أنا بشتغل على الـ <b>process</b>، قبل ما الـ product يتعمل أصلًا.'],
            [1, 'وأنا بشتغل على الـ <b>product</b> بعد ما يخلص. بقيّمه وبشيل أي حاجة <b>مش مطابقة</b>.'],
            [0, 'أنا <b>proactive</b>: بمنع الـ defects. بحط standards وguidelines وchecklists.'],
            [1, 'وأنا <b>reactive</b>: بكتشف الـ defects اللي عدّت.'],
            [0, 'هدفي إن الـ standards والـ procedures <b>تتطبق صح</b>.'],
            [1, 'وهدفي إن الـ product اللي خارج يبقى quality كويسة.'],
            [0, 'يعني أنا المنع وإنت الاكتشاف.'],
            [1, 'بالظبط.']
          ] : [
            [0, 'People think we\'re the same. I work on the <b>process</b>, before the product even exists.'],
            [1, 'And I work on the <b>product</b> once it\'s made. I evaluate it and screen out anything <b>non-compliant</b>.'],
            [0, 'I\'m <b>proactive</b>: I prevent defects. Standards, guidelines, checklists.'],
            [1, 'I\'m <b>reactive</b>: I detect the defects that slipped through.'],
            [0, 'My goal: standards and procedures are <b>applied correctly</b>.'],
            [1, 'Mine: what leaves the door is of good quality.'],
            [0, 'So I\'m prevention and you\'re detection.'],
            [1, 'Exactly.']
          ]} />
          <${Grow} />
          <${Hand}>${t("Our analogy, not the slides': SQA fixes the oven; SQC throws out the burnt loaves.", 'تشبيه من عندنا: الـ SQA بتظبط الفرن، والـ SQC بترمي العيش المحروق.')}</${Hand}>
        `),

        // 10 · testing vs QA
        page(html`
          <${H2}>${t('Testing vs QA', 'الـ Testing والـ QA')}</${H2}>
          <div className="hf-qa6-two hf-in">
            <div><b className="t">${t('Software testing', 'الـ Software testing')}</b><${DL} items=${A ? ['جزء من الـ SQA', 'هدفه الاكتشاف (detection-oriented)', 'بيقيّم الـ spec والـ design والـ coding', 'تحت conditions متحددة: normal و<b>abnormal</b>', 'هدفه الأساسي: يلاقي الـ bugs <b>ويبلّغ</b> عنها', 'بيعمله الـ testers']
              : ['Part of SQA', 'Detection-oriented', 'Evaluates spec, design and coding', 'Under specified conditions: normal <b>and abnormal</b>', 'Main goal: find and <b>report</b> bugs', 'Done by testers']} /></div>
            <div className="k"><b className="t">QA</b><${DL} items=${A ? ['أوسع من الـ testing', 'بيمنع الـ defects', 'بيضمن إن الـ processes والـ standards والـ methodologies صح', 'بيستخدم موديلات <bdi dir="ltr"><b>ISO / CMM</b></bdi>']
              : ['Broader than testing', 'Prevents defects', 'Ensures correct processes, standards and methodologies', 'Uses <b>ISO / CMM</b> models']} /></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Software testing is performed only under normal conditions": <b>False</b>. Normal <b>and abnormal</b>.<br/>Testing is <b>part of</b> SQA, not the other way round.',
            'الجملة دي:<span class="ltr">"Software testing is performed only under normal conditions."</span>غلط. الـ testing بيتعمل تحت normal <b>وabnormal</b>.<br/>والـ testing <b>جزء من</b> الـ SQA، مش العكس.')}</p></${Box}>
        `, { sec: t('Testing vs QA', 'الـ Testing والـ QA') }),

        // 11 · figure: testing inside QA
        page(html`
          <${Fig} name="qa-test-in-qa" />
        `),

        // 12 · tasks of testing, role of the tester
        page(html`
          <${H2}>${t('What testing does, and who the tester is', 'الـ testing بيعمل إيه، والـ tester مين')}</${H2}>
          <${P} small=${true}><b>${t('The 4 tasks of testing', 'الـ 4 مهام بتوع الـ testing')}</b></${P}>
          <${OL} items=${A ? ['نختار الـ <b>test implementation approach</b>', 'ننفذ الـ tests عشان نلاقي bugs', 'نجهز الـ <b>verification والـ validation reports</b>', 'نحضر اجتماعات الـ project والـ design review']
            : ['Choose the <b>test implementation approach</b>', 'Execute tests to find bugs', 'Prepare <b>verification and validation reports</b>', 'Attend project and design review meetings']} />
          <${P} small=${true}><b>${t('The role of the tester', 'دور الـ tester')}</b></${P}>
          <${DL} items=${A ? ['يشيل <b>مسؤولية</b> الـ bugs اللي لقاها', 'يتابع الـ bugs طول الـ <b>life cycle</b> بتاعتها', '<b>يقنع</b> الـ development team إنهم يصلحوها']
            : ['Takes <b>responsibility</b> for the bugs found', 'Tracks bugs through their <b>life cycle</b>', '<b>Convinces</b> the development team to fix them']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The goal of a software tester is to find…" Not just <i>Bugs</i>, and never <i>Fix bugs</i>: the doctors\' key is <b>Bugs and make sure they get fixed</b>.',
            'سؤال:<span class="ltr">"The goal of a software tester is to find…"</span>مش <i>Bugs</i> بس، وأكيد مش <i>Fix bugs</i>: الإجابة في الامتحان<span class="ltr"><b>Bugs and make sure they get fixed</b></span>')}</p></${Box}>
        `, { sec: t('Roles and tasks', 'الأدوار والمهام') }),

        // 13 · QA responsibilities and tasks
        page(html`
          <${H2}>${t('And what QA does', 'والـ QA بيعمل إيه')}</${H2}>
          <${P} small=${true}><b>${t('QA responsibilities', 'مسؤوليات الـ QA')}</b></${P}>
          <${DL} items=${A ? ['يفحص الـ <b>development process</b>', 'يلاقي تحسينات <b>بتمنع</b> الـ bugs', 'الـ scope بتاعه <b>أكبر</b> من الـ testing team', 'يراقب ويقيّم الـ processes وأنشطة الـ testing']
            : ['Inspect the <b>development process</b>', 'Find improvements that <b>prevent</b> bugs', 'Scope is <b>larger</b> than the testing team', 'Monitor and evaluate processes and testing activities']} />
          <${P} small=${true}><b>${t('QA task examples', 'أمثلة لمهام الـ QA')}</b></${P}>
          <${DL} items=${A ? ['يعمل <b>standard processes</b>', 'يعمل <b>guidelines</b> (للـ requirements والـ design والـ coding)', 'يستخدم <b>checklists</b> لكل stage', 'يحدد الـ <b>quality metrics والـ criteria</b>']
            : ['Develop <b>standard processes</b>', 'Create <b>guidelines</b> (requirements, design, coding)', 'Use <b>checklists</b> for each stage', 'Define <b>quality metrics and criteria</b>']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which task is NOT performed under SQA?" Standard processes, guidelines and checklists are QA. <b>Choosing the implementation approach for a given test</b> is testing task 1: that\'s the odd one out.',
            'لو اتسألت أنهي task مش تبع الـ SQA: الـ standard processes والـ guidelines والـ checklists كلهم QA. إنما <b>اختيار الـ implementation approach لـ test معيّن</b> ده أول task في الـ testing، وده الإجابة.')}</p></${Box}>
        `),

        // 14 · figure: who does it
        page(html`
          <${Fig} name="qa-who-does-it" />
        `),

        // 15 · prevention or detection sort
        page(html`
          <${Box} kind="pencil" title=${t('Prevention or detection?', 'منع ولا اكتشاف؟')}><p className="hf-p small">${X('Tap <b>P</b> if it prevents defects (SQA, the process) or <b>D</b> if it detects them (SQC and testing, the product).',
            'دوس <b>P</b> لو بيمنع الـ defects (الـ SQA، الـ process)، أو <b>D</b> لو بيكتشفها (الـ SQC والـ testing، الـ product).')}</p></${Box}>
          <${Sort} id="pd" bins=${[['P', t('Prevention', 'منع')], ['D', t('Detection', 'اكتشاف')]]} items=${A ? [
            ['نكتب coding guidelines قبل ما الـ coding يبدأ', 0],
            ['نشيل الـ items اللي مش مطابقة من build خلص', 1],
            ['نشغّل tests تحت abnormal conditions', 1],
            ['نتأكد إن الـ procedures بتتطبق صح', 0],
            ['نستخدم checklist لكل stage', 0],
            ['نلاقي الـ bugs ونبلّغ عنها', 1],
            ['نلاقي تحسينات في الـ process بتمنع الـ bugs', 0],
            ['نقيّم الـ quality بتاعة الـ product', 1]
          ] : [
            ['Write coding guidelines before coding starts', 0],
            ['Screen out non-compliant items from a finished build', 1],
            ['Run tests under abnormal conditions', 1],
            ['Ensure the procedures are applied correctly', 0],
            ['Use a checklist for each stage', 0],
            ['Find and report bugs', 1],
            ['Find process improvements that prevent bugs', 0],
            ['Evaluate the quality of the product', 1]
          ]} />
        `),

        // 16 · interview: the tester
        page(html`
          <${Interview} title=${t('The Tester, exposed', 'الـ Tester على المكشوف')} sub=${t("This week's interview: the one who finds the bugs.", 'حوار الأسبوع: اللي بيلاقي الـ bugs.')} lines=${A ? [
            ['المذيع', 'إنت بتصلّح الـ bugs؟'],
            ['الـ Tester', 'لأ. الـ developers هما اللي بيصلحوا. أنا بلاقيها، <b>وبتابعها طول الـ life cycle</b>، <b>وبقنعهم</b> يصلحوها.'],
            ['المذيع', 'وده كل شغلك؟'],
            ['الـ Tester', 'باختار الـ test approach، وبنفذ الـ tests، وبجهز الـ V&amp;V reports، وبحضر الـ review meetings.'],
            ['المذيع', 'يعني إنت الـ QA؟'],
            ['الـ Tester', 'أنا <b>جزء</b> منه. الـ QA أوسع: بيبص على الـ process كلها، مش على الـ bugs بس.']
          ] : [
            ['Head First', 'Do you fix the bugs?'],
            ['Tester', 'No. Developers fix. I find them, <b>track them through their life cycle</b> and <b>convince</b> the team to fix them.'],
            ['Head First', 'Is that all you do?'],
            ['Tester', 'I choose the test approach, execute tests, prepare V&amp;V reports and attend review meetings.'],
            ['Head First', 'So you are QA?'],
            ['Tester', 'I\'m <b>part</b> of it. QA is broader: it looks at the whole process, not just the bugs.']
          ]} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('A bug I found and nobody fixed is still <b>my</b> responsibility.', 'الـ bug اللي لقيتها ومحدش صلّحها لسه <b>مسؤوليتي</b>.')}</${Talk}>
        `),

        // 17 · ITSM
        page(html`
          <${H1}>${t('Quality management in IT', 'الـ Quality management في الـ IT')}</${H1}>
          <${Def}>${X('Quality management in IT is often called <b>ITSM (IT Service Management)</b>. Its goal: deliver IT services at an <b>agreed-upon level of quality</b>.',
            'الـ quality management في الـ IT غالبًا اسمه <b>ITSM</b> (IT Service Management). هدفه: نقدم IT services بـ <b>مستوى quality متفق عليه</b> (agreed-upon).')}</${Def}>
          <div className="hf-qa6-two hf-in">
            <div><b className="t">IT Service Support</b><p>${X('Processes for the <b>efficient delivery</b> of IT <b>operational</b> services.', 'الـ processes الخاصة بـ <b>التقديم الكفء</b> للـ IT <b>operational</b> services.')}</p></div>
            <div className="k"><b className="t">IT Service Delivery</b><p>${X('Processes for the <b>long-term planning, control and management</b> of IT services.', 'الـ processes الخاصة بالـ <b>planning والـ control والـ management على المدى الطويل</b>.')}</p></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The names swap on you. The one with "delivery" in its <b>meaning</b> is <b>Support</b>; the category called <b>Delivery</b> is the <b>long-term</b> one.',
            'الأسماء بتعكّك. اللي <b>معناه</b> فيه كلمة "delivery" هو الـ <b>Support</b>؛ إنما الـ category اللي اسمها <b>Delivery</b> هي بتاعة <b>المدى الطويل</b>.')}</p></${Box}>
        `, { sec: t('ITSM', 'الـ ITSM') }),

        // 18 · figure: ITSM
        page(html`
          <${Fig} name="qa-itsm" />
        `),

        // 19 · SQA is not just testing
        page(html`
          <${H2}>${t('SQA is not just testing', 'الـ SQA مش testing وبس')}</${H2}>
          <${P} small=${true}>${t('It also includes:', 'هو كمان بيشمل:')}</${P}>
          <${OL} items=${A ? ['إننا نحط <b>standards</b> وsoftware development <b>methodologies</b>', 'نراقب ونقيّم الـ <b>development process</b>', 'نصلّح الـ errors أثناء الـ development <b>ونمنع إنها تتكرر</b>']
            : ['Establishing <b>standards</b> and software development <b>methodologies</b>', '<b>Monitoring and evaluating</b> the development process', 'Correcting errors during development <b>and preventing their recurrence</b>']} />
          <${P} small=${true}>${X('And <b>software quality metrics</b> assess the extent to which the quality requirements are met.', 'والـ <b>software quality metrics</b> بتقيس إحنا حققنا الـ quality requirements لحد فين.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Item 3 has two halves. Which half could a tester do alone, and which half needs someone who can change the <b>process</b>?',
            'البند التالت فيه نصّين. أنهي نص ممكن الـ tester يعمله لوحده، وأنهي نص محتاج حد يقدر يغيّر الـ <b>process</b>؟')}</p></${Box}>
          <${Talk} who="bug" flip=${true}>${X('Fix me once and I\'m gone. Fix the <b>process</b> that made me and my cousins never show up.', 'صلّحني مرة وأنا أختفي. صلّح الـ <b>process</b> اللي عملتني، وولاد عمي مش هييجوا أصلًا.')}</${Talk}>
        `),

        // 19b · figure: not just testing
        page(html`
          <${Fig} name="qa-not-just-testing" />
        `),

        // 20 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني لو عندي testers كويسين، كده عندي SQA؟', 'لأ. الـ testing <b>جزء</b> من الـ SQA بس. الـ SQA كمان بيحط standards، ويراقب الـ process، ويمنع الـ errors إنها تتكرر.'],
            ['الـ QA بيستخدم موديلات إيه؟', 'الـ <bdi dir="ltr"><b>ISO / CMM</b></bdi>. هتقابلهم بالتفصيل في الفصل الجاي.'],
            ['الـ Maintainability والـ Flexibility مش نفس الحاجة؟', 'لأ. الـ maintainability هي المجهود عشان <b>تلاقي الـ errors وتصلحها</b>؛ والـ flexibility هي المجهود عشان <b>تغيّر</b> البرنامج.'],
            ['الـ ITSM ده جزء من الـ testing؟', 'لأ. ده اسم الـ quality management في الـ IT، وهدفه إن الـ IT services تتقدم بمستوى quality متفق عليه.']
          ] : [
            ['If I have good testers, do I have SQA?', 'No. Testing is only <b>part</b> of SQA. SQA also sets standards, monitors the process and prevents errors from recurring.'],
            ['Which models does QA use?', '<b>ISO / CMM</b>. You meet them properly in the next chapter.'],
            ['Aren\'t maintainability and flexibility the same?', 'No. Maintainability is the effort to <b>locate and fix errors</b>; flexibility is the effort to <b>change</b> the program.'],
            ['Is ITSM a kind of testing?', 'No. It is what quality management in IT is called; its goal is IT services at an agreed-upon level of quality.']
          ]} />
          <${Grow} />
          <${Talk} who="dev">${X('So QA builds the fence, testing checks for holes.', 'يعني الـ QA بيبني السور، والـ testing بيدوّر على الخروم.')}</${Talk}>
        `),

        // 21 · test organization structures
        page(html`
          <${H2}>${t('Who gets the bug report?', 'الـ bug report بيروح لمين؟')}</${H2}>
          <${P} small=${true}>${X('Test management can be organized in <b>three structures</b>. The <b>test</b> boxes are coloured:', 'الـ test management ممكن يتنظّم بـ <b>3 structures</b>. الـ boxes بتاعة الـ <b>test</b> متلوّنة:')}</${P}>
          <${OrgCharts} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Follow a bug report up each chart. Where can <b>one person</b> who also runs the programmers ignore it?',
            'امشي ورا الـ bug report لفوق. فين ممكن <b>شخص واحد</b> بيدير الـ programmers كمان يطنّشه؟')}</p></${Box}>
        `, { sec: t('Test organization structures', 'الـ Test organization structures') }),

        // 21b · pros and cons
        page(html`
          <${H2}>${t('Pros and cons', 'المميزات والعيوب')}</${H2}>
          <div className="hf-qa6-tb hf-in">
            <span className="k">1</span><span>${X('<b>Small team</b>. Pro: <b>fast communication</b> between developers and testers. Con: an inexperienced dev manager <b>may ignore bug reports</b> to push delivery.', 'الـ <b>Small team</b>. الميزة: <b>تواصل سريع</b> بين الـ developers والـ testers. والعيب: لو الـ dev manager مش خبرة <b>ممكن يطنّش الـ bug reports</b> عشان يخلّص التسليم.')}</span>
            <span className="k">2</span><span>${X('<b>Independent test team</b>. Pro: the testing team\'s <b>feedback is considered</b>. Con: the <b>final decision lies with the project manager</b>; may hurt quality in critical projects.', 'الـ <b>Independent test team</b>. الميزة: الـ <b>feedback</b> بتاع الـ testing team بيتاخد في الاعتبار. والعيب: <b>القرار الأخير في إيد الـ project manager</b>، وده ممكن يأثر على الـ quality في المشاريع الحساسة.')}</span>
            <span className="k">3</span><span>${X('<b>Test group reporting to executive management</b>. Pro: an <b>independent</b> quality team; quality reports reach <b>senior management directly</b>.', 'الـ <b>Test group reporting to executive management</b>. الميزة: quality team <b>مستقل</b>، والـ quality reports بتوصل <b>للإدارة العليا على طول</b>.')}</span>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"An inexperienced development manager may ignore bug reports" is the <b>small team</b>. "The final decision lies with the project manager" is the <b>independent</b> team. Don\'t swap the two managers.',
            'لو السؤال عن dev manager مش خبرة ممكن يطنّش الـ bug reports يبقى <b>small team</b>. ولو عن إن القرار الأخير في إيد الـ project manager يبقى <b>independent</b> team. متبدّلش المديرين.')}</p></${Box}>
        `),

        // 22 · figure: test orgs
        page(html`
          <${Fig} name="qa-test-orgs" />
        `),

        // 23 · figure: bug path
        page(html`
          <${Fig} name="qa-bug-path" />
        `),

        // 24 · sort structures
        page(html`
          <${Box} kind="pencil" title=${t('Which structure?', 'أنهي structure؟')}><p className="hf-p small">${X('<b>S</b> small team, <b>I</b> independent test team, <b>E</b> test group reporting to executive management.', 'الـ <b>S</b> يعني small team، والـ <b>I</b> يعني independent، والـ <b>E</b> يعني reporting to executive management.')}</p></${Box}>
          <${Sort} id="org" bins=${[['S', 'Small team'], ['I', 'Independent test team'], ['E', 'Executive management']]} items=${A ? [
            ['الـ testers بيرفعوا للـ development manager', 0],
            ['تواصل سريع بين الـ developers والـ testers', 0],
            ['الـ test lead والـ dev manager الاتنين تحت الـ project manager', 1],
            ['الـ feedback بتاع الـ testing team بيتاخد في القرار', 1],
            ['الـ QA/Test managers تحت الـ executive manager', 2],
            ['ممكن الـ bug reports تتطنّش عشان التسليم', 0],
            ['الـ quality reports بتوصل للإدارة العليا على طول', 2],
            ['القرار الأخير في إيد الـ project manager', 1]
          ] : [
            ['Testers report to the development manager', 0],
            ['Fast communication between developers and testers', 0],
            ['The test lead and the dev manager both report to the project manager', 1],
            ["The testing team's feedback is considered in decisions", 1],
            ['QA/Test managers report to an executive manager', 2],
            ['Bug reports may be ignored to push delivery', 0],
            ['Quality reports reach senior management directly', 2],
            ['The final decision lies with the project manager', 1]
          ]} />
        `),

        // 25 · metrics vs indicators
        page(html`
          <${H1}>${t('Putting numbers on quality', 'نحط أرقام على الـ quality')}</${H1}>
          <div className="hf-qa6-two hf-in">
            <div className="k"><b className="t">${t('Metrics', 'الـ Metrics')}</b><p>${X('<b>Rules</b> for measuring software attributes. E.g. code size, complexity.', 'هي <b>rules</b> لقياس الـ software attributes. زي حجم الـ code والـ complexity.')}</p></div>
            <div><b className="t">${t('Indicators', 'الـ Indicators')}</b><p>${X('<b>Variables</b> reflecting process outcomes. E.g. number of detected bugs.', 'هي <b>variables</b> بتعكس نتايج الـ process. زي عدد الـ bugs اللي اتكشفت.')}</p></div>
          </div>
          <${P} small=${true}>${t('And metrics come in two kinds:', 'والـ metrics نوعين:')}</${P}>
          <div className="hf-qa6-two hf-in">
            <div><b className="t">${t('Product metrics', 'الـ Product metrics')}</b><p>${X('Measure the <b>quality of the final product</b>: code size, number of documented pages.', 'بتقيس <b>الـ quality بتاعة الـ final product</b>: حجم الـ code، وعدد الصفحات الموثقة.')}</p></div>
            <div><b className="t">${t('Process metrics', 'الـ Process metrics')}</b><p>${X('Measure the <b>development process</b>: time taken, development methodology.', 'بتقيس الـ <b>development process</b>: الوقت اللي اتاخد، والـ development methodology.')}</p></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Number of detected bugs" is an <b>indicator</b>, not a metric. Rules = metrics; variables = indicators.',
            'الـ "number of detected bugs" ده <b>indicator</b>، مش metric. الـ rules تبقى metrics، والـ variables تبقى indicators.')}</p></${Box}>
        `, { sec: t('Metrics and indicators', 'الـ Metrics والـ indicators') }),

        // 26 · figure: metric tree
        page(html`
          <${Fig} name="qa-metric-tree" />
        `),

        // 27 · the 9 common metrics
        page(html`
          <${H2}>${t('The 9 common metrics', 'الـ 9 metrics المشهورين')}</${H2}>
          <${OL} items=${A ? ['الـ Code coverage', 'الـ Bugs per line of code', 'الـ Cyclomatic complexity', 'الـ Function point analysis', 'عدد الـ classes والـ interfaces', 'الـ Cohesion', 'الـ Coupling', 'الـ Order of growth', 'الـ Source lines of code']
            : ['Code coverage', 'Bugs per line of code', 'Cyclomatic complexity', 'Function point analysis', 'Number of classes and interfaces', 'Cohesion', 'Coupling', 'Order of growth', 'Source lines of code']} />
          <${Hand} tilt=${true}>${t('Our trick: 2 about bugs and tests (coverage, bugs/line), 2 about design (cohesion, coupling), 5 about size and complexity.', 'حيلة من عندنا: 2 عن الـ bugs والـ tests (الـ coverage والـ bugs/line)، و2 عن الـ design (الـ cohesion والـ coupling)، و5 عن الحجم والـ complexity.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Cyclomatic complexity</b> is a metric. Plain <b>Complexity</b> is one of the 9 quality <b>indicators</b>. And "number of team meetings held" is in neither list.',
            'الـ <b>Cyclomatic complexity</b> دي metric. إنما الـ <b>Complexity</b> لوحدها فهي واحدة من الـ 9 quality <b>indicators</b>. والـ "number of team meetings held" مش في أي لستة فيهم.')}</p></${Box}>
        `),

        // 28 · figure: pick metrics
        page(html`
          <${Fig} name="qa-pick-metrics" />
        `),

        // 29 · indicators table, part 1: the work and the process
        page(html`
          <${H2}>${t('The 9 software quality indicators', 'الـ 9 software quality indicators')}</${H2}>
          <${P} small=${true}>${X('Four of them watch <b>the work and the process</b>:', 'أربعة منهم بيبصّوا على <b>الشغل والـ process</b>:')}</${P}>
          <div className="hf-qa6-tb w hf-in">${(A ? [
            ['Progress', 'الشغل اللي الـ developer عمله في كل phase'],
            ['Stability', 'هل الـ products بتاعة كل phase ثابتة كفاية عشان نكمّل للـ phase اللي بعدها'],
            ['Process compliance', 'التزام الـ developer بالـ procedures اللي اتوافق عليها في أول المشروع'],
            ['Quality evaluation effort', 'المجهود اللي اتصرف على الـ internal quality evaluation']
          ] : [
            ['Progress', 'Work done by the developer in each phase'],
            ['Stability', 'Whether each phase\'s products are stable enough to proceed to the next phase'],
            ['Process compliance', 'The developer\'s obedience to the procedures approved at the start of the project'],
            ['Quality evaluation effort', 'Effort spent on internal quality evaluation']
          ]).map(([k, v], i) => html`<${React.Fragment} key=${i}><span className="k">${k}</span><span>${T(v)}</span></${React.Fragment}>`)}</div>
          <${Grow} />
          <${Talk} who="dev">${X('Stability sounds like "does it crash?"', 'الـ Stability شكلها يعني "هو بيقع ولا لأ؟"')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Not here. It asks if a phase\'s products are <b>stable enough to move on</b>.', 'مش هنا. هنا معناها هل الـ products بتاعة الـ phase <b>ثابتة كفاية إننا نكمّل</b>.')}</${Talk}>
        `, { sec: t('Quality indicators', 'الـ Quality indicators') }),

        // 29b · indicators table, part 2: the defects and the code
        page(html`
          <${P} small=${true}>${X('…and five watch <b>the defects and the code</b>:', '…وخمسة بيبصّوا على <b>الـ defects والـ code</b>:')}</${P}>
          <div className="hf-qa6-tb w hf-in">${(A ? [
            ['Defect detection efficiency', 'كام defect اتكشف في phase'],
            ['Defect removal rate', 'الـ defects اللي اتكشفت <b>واتحلت</b> في فترة'],
            ['Defect age profile', 'الـ defects اللي <b>ماتحلتش</b> في فترة'],
            ['Defect density', 'بيحدد الأجزاء اللي فيها defects كتير في الـ system (الـ defect-prone)'],
            ['Complexity', 'الـ complexity بتاعة الـ code في البرنامج']
          ] : [
            ['Defect detection efficiency', 'How many defects were detected in a phase'],
            ['Defect removal rate', 'Defects detected <b>and resolved</b> over a period of time'],
            ['Defect age profile', 'Defects <b>not resolved</b> over a period of time'],
            ['Defect density', 'Identifies the defect-prone parts of the system'],
            ['Complexity', 'The complexity of the code in a program']
          ]).map(([k, v], i) => html`<${React.Fragment} key=${i}><span className="k">${k}</span><span>${T(v)}</span></${React.Fragment}>`)}</div>
          <${Hand} red=${true}>${t('removal rate = resolved · age profile = NOT resolved', 'الـ removal rate يعني اتحلت · والـ age profile يعني ماتحلتش')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('If the removal rate and the age profile cover the same period, what do they add up to?', 'لو الـ removal rate والـ age profile على نفس الفترة، مجموعهم يطلع إيه؟')}</p>
            <${K.Reveal} id="sum"><p className="hf-p small">${X('All the defects detected in that period: each one is either resolved or not.', 'كل الـ defects اللي اتكشفت في الفترة دي: كل واحد يا إمّا اتحل يا إمّا لأ.')}</p></${K.Reveal}></${Box}>
        `),

        // 30 · figure: indicator map
        page(html`
          <${Fig} name="qa-indicator-map" />
        `),

        // 31 · match indicators
        page(html`
          <${H2}>${t('Which indicator answers the boss?', 'أنهي indicator بيجاوب المدير؟')}</${H2}>
          <${Match} id="ind" left=${['Progress', 'Stability', 'Process compliance', 'Quality evaluation effort', 'Defect removal rate', 'Defect age profile', 'Defect density']}
            right=${A ? ['أنهي module فيه defects كتير؟', 'كام defect لسه ماتحلّش الشهر ده؟', 'هل الـ procedures المتفق عليها ماشية؟', 'الـ design ثابت كفاية نبدأ coding؟', 'كام defect اتكشف واتحل الشهر ده؟', 'اتعمل قد إيه في الـ phase دي؟', 'صرفنا قد إيه على الـ quality evaluation؟']
              : ['Which module is defect-prone?', 'How many are still unresolved this month?', 'Are the approved procedures being followed?', 'Is the design stable enough to start coding?', 'How many were found and fixed this month?', 'How much work was done in this phase?', 'How much effort went into quality evaluation?']}
            answer=${[5, 3, 2, 6, 4, 1, 0]} />
        `),

        // 32 · figure: defect board
        page(html`
          <${Fig} name="qa-defect-board" />
        `),

        // 33 · be the QA analyst
        page(html`
          <${H2}>${t('Be the QA analyst', 'خليك إنت الـ QA analyst')}</${H2}>
          <${P} small=${true}>${X('One month of defects (our example). The working is on the next page.', 'دي defects شهر كامل (مثال من عندنا). والحل في الصفحة الجاية.')}</${P}>
          <${DefectLog} />
        `),

        // 34 · the working, and the 40/30 trap
        page(html`
          <${K.Reveal} id="logsol" label=${t('Show the working for the defect log', 'ورّيني حل الـ defect log')}><div className="hf-qa6-sol hf-in">
            <div>1. D1 D2 D4 D6 D7 D9 = <b>6</b></div><div>2. D3 D5 D8 D10 = <b>4</b> (6 + 4 = 10)</div>
            <div>3. Coding: D2 D3 D4 = <b>3</b></div><div>4. Payment 5, Login 3, Cart 2 → <b>Payment</b></div><div>5. 10 / 5,000 = <b>0.002</b> bugs per line</div></div></${K.Reveal}>
          <${Box} kind="watch"><p className="hf-p small">${X('Defects <b>NOT</b> resolved over a period: <b>defect age profile</b>. The ones that <b>were</b> resolved: removal rate.',
            'اللي <b>ماتحلتش</b> في فترة يعدّها الـ <b>defect age profile</b>. واللي <b>اتحلت</b> يعدّها الـ removal rate.')}</p></${Box}>
          <${Box} kind="pencil"><p className="hf-p small">${X('A team detects <b>40</b> defects in a month and resolves <b>30</b>. What does each indicator count?',
            'الـ team كشف <b>40</b> defect في شهر وحل منهم <b>30</b>. كل indicator بيعد كام؟')}</p>
            <${K.Reveal} id="d40"><p className="hf-p small">${X('Removal rate: <b>30</b> (detected and resolved). Age profile: 40 − 30 = <b>10</b> (not resolved).',
              'الـ removal rate بيعد <b>30</b> (اتكشفت واتحلت). والـ age profile بيعد اللي ماتحلتش:<span class="ltr">40 − 30 = 10</span>')}</p></${K.Reveal}></${Box}>
        `),

        // 35 · exam corner
        page(html`
          <${Box} kind="exam" title=${t("From the doctors' papers", 'من امتحانات الدكاترة')}><p className="hf-p small">${t("All seven of this lecture's exam questions. Two came twice: in the 2025/26 final and again in the 2026/27 midterm, with the same answer.", 'كل أسئلة الامتحانات السبعة بتاعة المحاضرة دي. اتنين منهم جم مرتين: في فاينل 2025/26 وتاني في ميدترم 2026/27، وبنفس الإجابة.')}</p></${Box}>
          ${mq('e1', /best product to the customer/)}
          <${Grow} />
          <${Hand} red=${true}>${t('the midterm asked it again: next page', 'والميدترم سأله تاني: الصفحة الجاية')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e2', /best product or services/)}
          <${Gap} h=${4} />
          ${mq('e7', /same as Quality Control/)}
        `),
        page(html`
          ${mq('e4', /tester is to find:/)}
          <${Gap} h=${4} />
          ${mq('e5', /tester is to find$/)}
        `),
        page(html`
          ${mq('e3', /principles, methods and procedures/)}
          <${Grow} />
          <${Talk} who="lens">${X('"Guarantees the procedures are suitable and <b>applied properly</b>": that is the process, so it is <b>assurance</b>.', 'أي حاجة "بتضمن إن الـ procedures مناسبة <b>وبتتطبق صح</b>" دي process، يعني <b>assurance</b>.')}</${Talk}>
        `),
        page(html`
          ${mq('e6', /NOT performed under Software Quality Assurance/)}
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${X('Processes, guidelines, checklists: QA. Choosing how to run a test: testing.', 'الـ processes والـ guidelines والـ checklists تبع الـ QA. إنما تختار تنفّذ الـ test إزاي ده testing.')}</${Talk}>
        `),

        // practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions, not the doctors'.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة.')}</p></${Box}>
          ${pq('p1', /long-term planning, control and management/)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /inexperienced development manager/)}
          <${Gap} h=${4} />
          ${pq('p3', /detected bugs" is an example of/)}
        `),

        // bullet points (two pages)
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Quality</b> معناها المطابقة للـ requirements، وهي الـ attributes اللي الـ end-users بيقدّروها. والـ defects بتتقاس مباشرة؛ والـ maintainability والـ usability بشكل غير مباشر.',
            'فيه 8 factors: الـ reliability والـ efficiency والـ integrity والـ usability والـ maintainability والـ flexibility والـ portability والـ reusability.',
            'الـ <b>SQA</b> يعني process ومنع (proactive)؛ والـ <b>SQC</b> يعني product واكتشاف (reactive). ومش نفس الحاجة.',
            'الـ testing جزء من الـ SQA. والـ tester بيلاقي الـ bugs <b>ويتأكد إنها اتصلحت</b>. والـ QA بيعمل processes وguidelines وchecklists وmetrics.'
          ] : [
            '<b>Quality</b> = conformance to requirements; attributes valued by end-users. Defects are directly measurable; maintainability and usability indirectly.',
            '8 factors: reliability, efficiency, integrity, usability, maintainability, flexibility, portability, reusability.',
            '<b>SQA</b> = process, prevention, proactive. <b>SQC</b> = product, detection, reactive. Not the same.',
            'Testing is part of SQA. The tester finds bugs <b>and makes sure they get fixed</b>. QA develops processes, guidelines, checklists and metrics.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'في الـ ITSM: الـ Support للتقديم الكفء للـ operational services؛ والـ Delivery للـ planning على المدى الطويل.',
            'فيه 3 structures: الـ small team (تحت الـ dev manager)، والـ independent (تحت الـ PM)، والـ executive (التقارير بتوصل للإدارة العليا على طول).',
            'الـ metrics هي rules، والـ indicators هي variables. والـ product metrics زي الحجم والصفحات؛ والـ process metrics زي الوقت والـ methodology.',
            'الـ removal rate يعني اتحلت، والـ age profile يعني ماتحلتش، والـ density يعني الأجزاء الـ defect-prone.'
          ] : [
            'ITSM: Support = efficient delivery of operational services; Delivery = long-term planning, control and management.',
            'Structures: small team (under the dev manager), independent (under the PM), executive (reports go straight to senior management).',
            'Metrics are rules; indicators are variables. Product metrics: size, pages. Process metrics: time, methodology.',
            'Removal rate = resolved; age profile = not resolved; density = defect-prone parts.'
          ]} />
        `),

        // 41 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 6!', 'خلّصت الفصل السادس!')}</${H1}>
            <${Talk} who="lens">${t('Next time: how mature is your process? CMM, ISO 9000 and SPICE.', 'المرة الجاية: الـ process بتاعتك ناضجة قد إيه؟ الـ CMM والـ ISO 9000 والـ SPICE.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [6], t: Date.now() } }}>${t('Quiz me on Lecture 6', 'امتحنّي في محاضرة 6')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 6, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 6, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

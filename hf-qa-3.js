// Head First chapter for Software Quality Assurance Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// White box testing: what it helps a tester do and its other names; static white-box (formal review and its 4 essential elements,
// peer review / walkthrough / inspection, coding standards vs guidelines and the 3 reasons, the generic code review checklist and its
// six error classes, the slide's "zero is true" sentence ‡); dynamic white-box (validation check, vs debugging, testing the pieces and
// the integration strategies, data coverage, code coverage: statement, path, condition, with the lecture's own examples) and the
// triangle exercise (solved in Lecture 4). Every coverage answer was worked by hand and checked with a small script.
// Our own analogies and examples are marked as ours.
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const AF = '"IBM Plex Sans Arabic", var(--body)';

  if (!document.getElementById('hf-css-qa3')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa3';
    s.textContent = `
.hfb .hf-qa3-pair{ display:block; width:100%; height:auto; }
.hfb .hf-qa3-pair text{ font-family:var(--body); }
.hfb .hf-qa3-scan{ animation:hf-qa3-scan 4s steps(1, end) infinite; }
@keyframes hf-qa3-scan{ 0%{ transform:translateY(0); } 25%{ transform:translateY(13px); } 50%{ transform:translateY(26px); } 75%{ transform:translateY(39px); } }
.hfb .hf-qa3-map{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-qa3-col{ border:2px solid var(--hf-line); border-radius:8px; padding:8px 9px 5px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-qa3-col h4{ margin:0; font:800 15px/1.15 var(--body); color:var(--ink); }
.hfb .hf-qa3-col .hf-qa3-sub{ margin:3px 0 5px; font:italic 13.5px/1.25 var(--display); color:var(--graphite); }
.hfb .hf-qa3-col .hf-qa3-it{ display:block; font:600 13.5px/1.25 var(--body); padding:5px 0; border-top:1px dotted var(--faint); color:var(--ink); }
.hfb .hf-qa3-col .hf-qa3-it i{ font-style:normal; color:var(--hf-k); font-weight:800; margin-inline-end:4px; }
.hfb .hf-qa3-steps{ display:grid; gap:6px; }
.hfb .hf-qa3-steps > div{ display:grid; grid-template-columns:28px 1fr; gap:8px; align-items:start; font-size:14.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-qa3-steps > div > b:first-child{ display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 14px/1 var(--body); }
.hfb .hf-qa3-steps > div b{ font-weight:700; }
.hfb .hf-qa3-rv{ display:grid; gap:6px; }
.hfb .hf-qa3-rv > div{ border:1.6px solid var(--hf-line); border-inline-start:6px solid var(--hf-k); border-radius:8px; padding:6px 9px; background:var(--paper); }
.hfb .hf-qa3-rv h4{ margin:0 0 2px; font:800 15.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qa3-rv p{ margin:0; font-size:13.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-qa3-rv p b{ font-weight:700; }
.hfb .hf-qa3-vs{ display:grid; grid-template-columns:1fr 1fr; border:2px solid var(--hf-line); }
.hfb .hf-qa3-vs > div{ padding:6px 8px; font-size:14px; line-height:1.32; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa3-vs > div:nth-child(odd){ border-inline-end:2px solid var(--hf-line); }
.hfb .hf-qa3-vs > .hf-qa3-hd{ font:800 15px/1.1 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; text-align:center; }
.hfb .hf-qa3-vs b{ font-weight:700; }
.hfb .hf-qa3-ck{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; background:var(--paper); }
.hfb .hf-qa3-tabs{ display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; padding:6px; background:var(--hf-grey); }
.hfb .hf-qa3-tabs button{ font:700 13px/1.15 var(--body); min-height:40px; padding:3px 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa3-tabs button.hf-qa3-seen{ color:var(--ink); border-color:var(--hf-line); }
.hfb .hf-qa3-tabs button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-qa3-pane{ padding:8px 10px 6px; min-height:236px; }
.hfb .hf-qa3-mean{ font:600 14px/1.35 var(--body); margin:0 0 6px; color:var(--ink); }
.hfb .hf-qa3-chk{ display:grid; grid-template-columns:24px 1fr; gap:4px; font-size:13.5px; line-height:1.32; margin:0 0 4px; color:var(--ink); }
.hfb .hf-qa3-chk > span:first-child{ font:800 13px/1.35 var(--body); color:var(--hf-k); }
.hfb .hf-qa3-tt{ width:100%; border-collapse:collapse; direction:ltr; }
.hfb .hf-qa3-tt th{ font:800 13px/1.1 var(--mono); background:var(--hf-line); color:var(--paper); padding:6px 4px; }
.hfb .hf-qa3-tt td{ border:1px solid var(--hf-grey2); padding:2px 4px; text-align:center; font:600 13px/1.25 var(--mono); color:var(--ink); }
.hfb .hf-qa3-tt td button{ width:100%; min-height:28px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:700 13px/1 var(--body); cursor:pointer; }
.hfb .hf-qa3-tt td button.hf-qa3-run{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-qa3-tt td button.hf-qa3-skip{ border-style:dashed; border-color:var(--hf-line); color:var(--ink); }
.hfb .hf-qa3-tt td button.hf-qa3-ok{ box-shadow:0 0 0 2.5px var(--ok); }
.hfb .hf-qa3-tt td button.hf-qa3-no{ box-shadow:0 0 0 2.5px var(--hf-red); }
.hfb .hf-qa3-tt td.hf-qa3-tr{ font:600 13px/1.3 var(--mono); color:var(--hf-k); text-align:left; border-top:0; padding:1px 6px 4px; }
.hfb .hf-qa3-tt tr.hf-qa3-all td:first-child{ background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.hfb .hf-qa3-goal{ display:flex; gap:4px; }
.hfb .hf-qa3-goal button{ flex:1 1 0; font:700 13px/1.1 var(--body); min-height:34px; padding:2px 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa3-goal button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-qa3-suite{ display:grid; gap:4px; direction:ltr; }
.hfb .hf-qa3-suite button{ display:grid; grid-template-columns:18px 1fr 1fr 1.2fr; align-items:center; gap:6px; font:600 13px/1 var(--mono); min-height:32px; padding:0 8px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; text-align:left; }
.hfb .hf-qa3-suite button[aria-pressed="true"]{ border-color:var(--hf-line); background:color-mix(in srgb, var(--hf-k) 16%, var(--paper)); }
.hfb .hf-qa3-suite .hf-qa3-bx{ width:16px; height:16px; border:1.6px solid var(--hf-line); border-radius:3px; display:grid; place-items:center; font:800 12px/1 var(--body); }
.hfb .hf-qa3-suite .hf-qa3-ln{ color:var(--graphite); }
.hfb .hf-qa3-mt{ display:grid; grid-template-columns:auto 1fr auto; gap:5px 8px; align-items:center; }
.hfb .hf-qa3-mt .hf-qa3-nm{ font:700 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qa3-mt .hf-qa3-bar{ height:12px; border:1.5px solid var(--hf-line); border-radius:99px; overflow:hidden; background:var(--paper); direction:ltr; }
.hfb .hf-qa3-mt .hf-qa3-bar i{ display:block; height:100%; background:var(--hf-k); transition:width .4s ease; }
.hfb .hf-qa3-mt .hf-qa3-v{ font:700 13px/1 var(--mono); color:var(--ink); direction:ltr; }
.hfb .hf-qa3-msg{ font:600 14px/1.35 var(--body); margin:0; padding:5px 9px; border-inline-start:3px solid var(--hf-k); color:var(--ink); }
.hfb .hf-qa3-msg.hf-qa3-bad{ border-color:var(--hf-red); }
.hfb .hf-qa3-cnt{ display:grid; grid-template-columns:1.1fr .5fr 1.6fr; border:2px solid var(--hf-line); }
.hfb .hf-qa3-cnt > span{ padding:6px 7px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); display:flex; align-items:center; }
.hfb .hf-qa3-cnt > span.hf-qa3-hd{ font:800 13px/1.1 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; }
.hfb .hf-qa3-cnt > span.hf-qa3-n{ font:800 22px/1 var(--body); color:var(--hf-k); justify-content:center; }
.hfb .hf-qa3-cnt b{ font-weight:700; }
.hfb .hf-qa3-chips{ display:flex; flex-wrap:wrap; gap:6px; }
.hfb .hf-qa3-chips span{ font:700 14px/1.2 var(--body); border:1.6px solid var(--hf-line); border-radius:99px; padding:4px 11px; background:var(--paper); color:var(--ink); }
.hfb .hf-qa3-runs{ display:grid; grid-template-columns:auto 1fr; gap:4px 8px; direction:ltr; font:600 13.5px/1.3 var(--mono); color:var(--ink); }
.hfb .hf-qa3-runs b{ color:var(--hf-k); }
.hf-ar .hf-qa3-col h4, .hf-ar .hf-qa3-col .hf-qa3-sub, .hf-ar .hf-qa3-col .hf-qa3-it, .hf-ar .hf-qa3-steps > div, .hf-ar .hf-qa3-rv h4, .hf-ar .hf-qa3-rv p,
.hf-ar .hf-qa3-vs > div, .hf-ar .hf-qa3-tabs button, .hf-ar .hf-qa3-mean, .hf-ar .hf-qa3-chk, .hf-ar .hf-qa3-tt td button, .hf-ar .hf-qa3-goal button,
.hf-ar .hf-qa3-mt .hf-qa3-nm, .hf-ar .hf-qa3-msg, .hf-ar .hf-qa3-cnt > span, .hf-ar .hf-qa3-chips span{ font-family:${AF}; font-style:normal; letter-spacing:0; }
.hf-ar .hf-qa3-steps > div, .hf-ar .hf-qa3-rv p, .hf-ar .hf-qa3-vs > div, .hf-ar .hf-qa3-chk, .hf-ar .hf-qa3-mean, .hf-ar .hf-qa3-msg{ line-height:1.5; font-size:13.5px; }
.hf-ar .hf-qa3-cnt > span.hf-qa3-n{ font-family:var(--body); }
`;
    document.head.appendChild(s);
  }

  // black box vs glass box: one you can only poke from outside, one you can read line by line (a scanning bar walks the code)
  function BoxPair() {
    const ar = useAr();
    const lines = [[0, 64], [10, 52], [10, 70], [0, 40], [10, 58]];
    return html`<div className="hf-in" dir="ltr"><svg className="hf-qa3-pair" viewBox="0 0 320 132" role="img" aria-label=${ar ? 'صندوق أسود مقفول وصندوق إزاز شايف الكود اللي جواه' : 'A closed black box next to a glass box with its code visible inside'}>
      <rect x="14" y="10" width="128" height="86" rx="6" fill="var(--hf-line)" />
      <text x="78" y="64" textAnchor="middle" fontSize="38" fontWeight="800" fill="var(--paper)">?</text>
      <text x="78" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">${ar ? 'من برّه' : 'black box'}</text>
      <rect x="178" y="10" width="128" height="86" rx="6" fill="var(--hf-grey)" stroke="var(--hf-k)" strokeWidth="2.5" />
      <rect x="184" y="17" width="116" height="12" rx="2" fill="color-mix(in srgb, var(--hf-k) 30%, transparent)" className=${calm() ? '' : 'hf-qa3-scan'} />
      ${lines.map(([dx, w], j) => html`<rect key=${j} x=${190 + dx} y=${20 + j * 13} width=${w} height="6" rx="2" fill="var(--graphite)" />`)}
      <circle cx="276" cy="49" r="5" fill="var(--hf-red)" /><path d="M271 45l-4-3M281 45l4-3M271 53l-4 3M281 53l4 3" stroke="var(--hf-red)" strokeWidth="1.6" strokeLinecap="round" />
      <text x="242" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">${ar ? 'من جوّه' : 'white (glass) box'}</text>
    </svg></div>`;
  }

  // the unit outline: static and dynamic white-box side by side
  function Map() {
    const ar = useAr();
    const cols = ar ? [
      ['الـ Static white-box', 'فحص الـ design والـ code', ['الـ Formal review', 'الـ Coding standards and guidelines', 'الـ Code review checklist']],
      ['الـ Dynamic white-box', 'تشغيل test cases بقيم input', ['مقارنته بالـ debugging', 'الـ Testing the pieces', 'الـ Data coverage', 'الـ Code coverage']]
    ] : [
      ['Static white-box', 'examining the design and code', ['Formal review', 'Coding standards and guidelines', 'Code review checklist']],
      ['Dynamic white-box', 'running test cases with input values', ['vs debugging', 'Testing the pieces', 'Data coverage', 'Code coverage']]
    ];
    let n = 0;
    return html`<div className="hf-qa3-map">${cols.map(([h, sub, its], c) => html`<div key=${c} className="hf-qa3-col hf-in" style=${{ animationDelay: calm() ? '0s' : c * 0.25 + 's' }}>
      <h4>${h}</h4><p className="hf-qa3-sub">${sub}</p>
      ${its.map((x, j) => html`<span key=${j} className="hf-qa3-it hf-in" style=${{ animationDelay: calm() ? '0s' : (0.4 + (n++) * 0.12) + 's' }}><i>${j + 1}</i>${x}</span>`)}</div>`)}</div>`;
  }

  const Steps = ({ items }) => html`<div className="hf-qa3-steps">${items.map((x, j) => html`<div key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.12 + 's' }}><b>${j + 1}</b><span>${H.K.T(x)}</span></div>`)}</div>`;

  // the generic code review checklist: tap a class to see what to check (the slide's own checks)
  const CK = [
    ['Data reference', 'الـ Data reference',
      'Variables, constants, arrays, strings or records used and referred to without being properly declared or initialized.',
      'بتحصل من استخدام variables أو constants أو arrays أو strings أو records مش متعرّفة (declared) أو متعملهاش initialize صح.',
      ['Are any un-initialized variables referenced?', 'Are array and string subscripts within the array\'s bounds or string dimension?', 'Any "off-by-one" errors in indexing or references to arrays?', 'Is a variable used where a constant would work better (e.g. checking the boundary of an array)?'],
      ['فيه un-initialized variables بيتعملها reference؟', 'الـ subscripts بتاعة الـ arrays والـ strings جوه الحدود؟', 'فيه أخطاء <bdi dir="ltr">"off-by-one"</bdi> في الـ indexing؟', 'فيه variable مستخدم في مكان الـ constant كان هيبقى أحسن فيه؟ (زي حد الـ array)']],
    ['Data declaration', 'الـ Data declaration',
      'Improper declaration of variables and constants.',
      'بتحصل من declaration غلط للـ variables والـ constants.',
      ['Correct length, type and storage class?', 'Initialized at declaration, properly and consistent with its type?', 'Any variables with similar names?', 'Declared but never referenced, or referenced just once (should be a constant)?'],
      ['واخدين الـ length والـ type والـ storage class الصح؟', 'اتعملهم initialize وقت الـ declaration، صح ومتوافق مع الـ type؟', 'فيه variables أساميها شبه بعض؟', 'متعرّف ومحدش استخدمه، أو اتستخدم مرة واحدة؟ (المفروض يبقى constant)']],
    ['Computation', 'الـ Computation',
      'Wrong calculations: the expected results are not obtained due to false calculations.',
      'حسابات غلط، فالنتيجة المتوقعة مبتطلعش.',
      ['Different data types mixed (adding integers and floating point numbers)?', 'Same type but different size (adding long integers to short integers)?', 'Overflow possible in the middle of a calculation?', 'Can a divisor ever be zero?'],
      ['فيه data types مختلفة في نفس الحسبة؟ (integer مع floating point)', 'نفس الـ type بس حجم مختلف؟ (long integers مع short integers)', 'ممكن يحصل overflow في نص الحسبة؟', 'ممكن الـ divisor يبقى صفر؟']],
    ['Comparison', 'الـ Comparison',
      'Boundary conditions: less than, greater than, equal, not equal, true or false.',
      'بتحصل عند الـ boundary conditions، يعني أصغر وأكبر ويساوي وميساويش وtrue وfalse.',
      ['Is the comparison correct (using < instead of <=)?', 'Are the operands of a Boolean operator correct (an integer variable used in a Boolean calculation)?'],
      ['الـ comparison صح؟ (استخدام <bdi dir="ltr">&lt;</bdi> بدل <bdi dir="ltr">&lt;=</bdi>)', 'الـ operands بتوع الـ Boolean operator صح؟ (integer variable جوه Boolean calculation)']],
    ['Control flow', 'الـ Control flow',
      'Improper behaviour of loops and control structures in a language.',
      'سلوك غلط للـ loops والـ control structures في اللغة.',
      ['‡ The slide lists no checks here. The notes suggest the obvious ones: do the loops terminate, does the code branch correctly?'],
      ['‡ السلايد مش كاتبة checks هنا. النوتس بتقترح الواضح: الـ loops بتخلص؟ والـ branching صح؟']],
    ['Input/Output', 'الـ Input/Output',
      'Reading from a file, accepting input from the keyboard or mouse, writing to an output device such as a file or screen.',
      'القراية من file، أو استقبال input من الكيبورد أو الماوس، أو الكتابة على file أو الشاشة.',
      ['File and device handling.'],
      ['التعامل مع الـ files والـ devices.']]
  ];
  function Checklist() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('ck', 0);
    const [seen, setSeen] = H.K.useSlot('ck:s', [0]);
    const c = CK[i], abc = ar ? ['أ', 'ب', 'ج', 'د'] : ['a', 'b', 'c', 'd'];
    return html`<div className="hf-qa3-ck hf-in">
      <div className="hf-qa3-tabs" role="group" aria-label="Error classes">${CK.map((k, j) => html`<button key=${j} aria-pressed=${String(i === j)} className=${seen.includes(j) ? 'hf-qa3-seen' : ''} onClick=${() => { setI(j); if (!seen.includes(j)) setSeen(seen.concat(j)); }}><bdi>${ar ? k[1] : k[0]}</bdi></button>`)}</div>
      <div className="hf-qa3-pane" key=${i}>
        <p className="hf-qa3-mean hf-in"><b style=${{ display: 'block' }}>${ar ? c[1] : c[0]} errors</b>${H.K.T(ar ? c[3] : c[2])}</p>
        ${(ar ? c[5] : c[4]).map((x, j) => html`<div key=${j} className="hf-qa3-chk hf-in" style=${{ animationDelay: calm() ? '0s' : (0.1 + j * 0.1) + 's' }}><span>${c[4].length > 1 ? '(' + abc[j] + ')' : '•'}</span><span>${H.K.T(x)}</span></div>`)}
      </div></div>`;
  }

  // be the CPU: the doctors' two-IF statement-coverage question; for each test case, does each THEN statement run?
  // [X, Y, A, first runs, second runs, trace]; checked by hand and by script:
  // X=2,Y=0,A=4: 2>1 and 0=0 → A=2; X=2 → A=3.   X=3,Y=0,A=1: A=1/3; 3≠2, 0.33≯1 → skip.
  // X=0,Y=0,A=4: 0≯1 → skip; A=4>1 → A=5.        X=3,Y=1,A=1: Y≠0 → skip; 3≠2, 1≯1 → skip.
  const TRACE = [
    [2, 0, 4, 1, 1, 'A = 4/2 = 2 → X=2 → A = 3'],
    [3, 0, 1, 1, 0, 'A = 1/3 ≈ 0.33 → X≠2, A≯1'],
    [0, 0, 4, 0, 1, 'X≯1 → A=4 > 1 → A = 5'],
    [3, 1, 1, 0, 0, 'Y≠0 → X≠2, A=1 ≯ 1']
  ];
  function Trace() {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('trace', {});
    const [ck, setCk] = H.K.useSlot('trace:c', false);
    const ans = (r, j) => TRACE[r][3 + j] ? 'run' : 'skip';
    const flip = k => { setV(Object.assign({}, v, { [k]: v[k] === 'run' ? 'skip' : 'run' })); setCk(false); };
    let right = 0; TRACE.forEach((_, r) => [0, 1].forEach(j => { if (v[r + '-' + j] === ans(r, j)) right++; }));
    const all = right === 8;
    const lab = s => s == null ? '?' : s === 'run' ? (ar ? 'بيتنفذ' : 'runs') : (ar ? 'بيتخطّى' : 'skipped');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <table className="hf-qa3-tt" dir="ltr"><thead><tr><th>${ar ? 'test' : 'test case'}</th><th>A=A/X</th><th>A=A+1</th></tr></thead><tbody>
        ${TRACE.map((t, r) => html`<${React.Fragment} key=${r}><tr className=${ck && all && t[3] && t[4] ? 'hf-qa3-all' : ''}><td>X=${t[0]} Y=${t[1]} A=${t[2]}</td>
          ${[0, 1].map(j => { const k = r + '-' + j, s = v[k]; return html`<td key=${j}><button aria-label=${'test ' + (r + 1) + ', statement ' + (j + 1) + ': ' + lab(s)} className=${(s ? 'hf-qa3-' + s : '') + (ck && s ? (s === ans(r, j) ? ' hf-qa3-ok' : ' hf-qa3-no') : '')} onClick=${() => flip(k)}>${lab(s)}</button></td>`; })}</tr>
          ${ck && all && html`<tr><td colSpan="3" className="hf-qa3-tr hf-in">${t[5]}</td></tr>`}</${React.Fragment}>`)}
      </tbody></table>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; TRACE.forEach((_, r) => [0, 1].forEach(j => { o[r + '-' + j] = ans(r, j); })); setV(o); setCk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / 8</bdi> صح` : right + ' / 8 right'}</span>`}
      </div>
      ${ck && all ? html`<p className="hf-hand hf-in" style=${{ textAlign: 'center' }}>${ar ? html`بس <bdi dir="ltr">X=2, Y=0, A=4</bdi> بينفذ الاتنين، ودي إجابة الامتحان.` : 'Only X=2, Y=0, A=4 runs both: the exam\'s answer.'}</p>`
        : ck ? html`<p className="hf-hand red" style=${{ textAlign: 'center' }}>${ar ? 'لسه فيه خانات غلط. امشي على الكود سطر سطر.' : 'Some cells are still wrong. Walk the code line by line.'}</p>` : null}
    </div>`;
  }

  // coverage meter on the lecture's condition-coverage code: build a test suite and watch the three coverages fill up
  const CC = [['25-12-2007', '11:11:11', [1, 2, 5, 6, 7]], ['25-12-2007', '00:00:00', [1, 2, 5, 6, 7]], ['25-12-2008', '11:11:11', [1, 2, 5, 6, 7]], ['25-12-2008', '00:00:00', [1, 2, 3, 4, 5, 6, 7]]];
  const MIN = [1, 2, 4], SHOW = [[3], [0, 3], [0, 1, 2, 3]];
  function Meter() {
    const ar = useAr();
    const [g, setG] = H.K.useSlot('meter:g', 0);
    const [pick, setPick] = H.K.useSlot('meter', []);
    const [ck, setCk] = H.K.useSlot('meter:c', false);
    const lines = new Set(); pick.forEach(k => CC[k][2].forEach(n => lines.add(n)));
    const isT = pick.includes(3), isF = pick.some(k => k < 3);
    const vals = [[lines.size, 7], [(isT ? 1 : 0) + (isF ? 1 : 0), 2], [pick.length, 4]];
    const reached = vals[g][0] === vals[g][1];
    const names = ar ? ['الـ Statement', 'الـ Path', 'الـ Full condition'] : ['Statement', 'Path', 'Full condition'];
    const toggle = k => { setPick(pick.includes(k) ? pick.filter(x => x !== k) : pick.concat(k).sort()); setCk(false); };
    let msg = null, bad = false;
    if (ck) {
      if (!reached) {
        bad = true;
        msg = g === 0 ? (ar ? 'لسه فيه سطور متنفذتش. أنهي test بيدخل جوه الـ IF؟' : 'Some lines never ran. Which test gets inside the IF?')
          : g === 1 ? (ar ? 'الـ IF لازم يبقى true مرة وfalse مرة.' : 'The IF must be true once and false once.')
          : (ar ? 'الـ full condition coverage هنا معناها كل combination من الجزئين: 4 tests.' : 'Full condition coverage here means every combination of the two parts: 4 tests.');
      } else if (pick.length > MIN[g]) {
        msg = ar ? html`وصلت! بس أقل عدد ممكن هو <bdi>${MIN[g]}</bdi>. شيل test وجرّب تاني.` : `Reached! But it can be done with ${MIN[g]}. Drop a test and try again.`;
      } else {
        msg = ar ? html`ممتاز، وصلت بأقل عدد ممكن، وهو <bdi>${MIN[g]}</bdi>.` : `Reached, with the fewest tests possible: ${MIN[g]}.`;
      }
    }
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-qa3-goal" role="group" aria-label="Goal">${names.map((n, j) => html`<button key=${j} aria-pressed=${String(g === j)} onClick=${() => { setG(j); setCk(false); }}>${n}</button>`)}</div>
      <div className="hf-qa3-suite" role="group" aria-label="Test cases">${CC.map((r, k) => html`<button key=${k} aria-pressed=${String(pick.includes(k))} onClick=${() => toggle(k)}>
        <span className="hf-qa3-bx">${pick.includes(k) ? '✓' : ''}</span><span>${r[0]}</span><span>${r[1]}</span><span className="hf-qa3-ln">${r[2].join(',')}</span></button>`)}</div>
      <div className="hf-qa3-mt">${names.map((n, j) => html`<${React.Fragment} key=${j}><span className="hf-qa3-nm">${n}</span><span className="hf-qa3-bar"><i style=${{ width: (vals[j][0] / vals[j][1] * 100) + '%' }}></i></span><span className="hf-qa3-v">${vals[j][0]}/${vals[j][1]}</span></${React.Fragment}>`)}</div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!pick.length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setPick(SHOW[g].slice()); setCk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${pick.length > 0 && html`<button className="hf-btn" onClick=${() => { setPick([]); setCk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div>
      ${msg && html`<p className=${'hf-qa3-msg hf-in' + (bad ? ' hf-qa3-bad' : '')}>${msg}</p>`}
    </div>`;
  }

  H.chapters.qa[3] = {
    title: 'White Box Testing',
    kicker: 'Chapter 3',
    run: 'white box testing',
    ar: { title: 'الـ White Box Testing', kicker: 'الفصل 3', run: 'الـ white box testing' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (items with src), with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arL = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[3]) || {};
      const arQuiz = arL.quiz || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
            const page = (el, o) => Object.assign({ el }, o || {});
      const watch = (en, ar) => html`<${Box} kind="watch"><p className="hf-p small">${X(en, ar)}</p></${Box}>`;
      return [
        // 0 · before we start (faces the opener)
        page(html`
          <${H2}>${t('Before we open the box', 'قبل ما نفتح الصندوق')}</${H2}>
          <${P} small=${true}>${X('Last chapter you tested from the <b>outside</b>: black box testing works from the spec, without seeing the code. This chapter takes the lid off. Same rules as before:',
            'في الفصل اللي فات اختبرت من <b>برّه</b>: الـ black box testing بيشتغل من الـ spec من غير ما يشوف الـ code. الفصل ده بيشيل الغطا. ونفس القواعد:')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You answer right on the page, and your answers stay when you turn it.', '<b>حل التمارين.</b> بتجاوب على الصفحة نفسها، وإجاباتك بتفضل لما تقلّب.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر قبل ما تقلّب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the doctors' papers and this year's midterm.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة وميدترم السنة دي.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake on the slides, and what was meant.', 'معناها فيه غلطة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes marked "ours" are our own analogies and examples, not the slides\'.', 'الملاحظات اللي عليها "من عندنا" دي تشبيهات وأمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t("If you could read every line of the program, what could you test that a black-box tester can't?", 'لو تقدر تقرا كل سطر في البرنامج، تقدر تختبر إيه مايقدرش عليه الـ black-box tester؟')}</p></${Box}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>Software Quality` : html`Chapter three<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Open the Box', 'افتح الصندوق')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('white box testing', 'الـ white box testing')}</p></div>
          <${BoxPair} />
          <${Talk} who="lens">${t('Last time I could only poke it from outside. Today I get to read the code.', 'المرة اللي فاتت كنت بزق فيه من برّه بس. النهارده هقرا الـ code نفسه.')}</${Talk}>
          <${Talk} who="bug" flip=${true}>${t('Uh oh. Nowhere left to hide.', 'يا نهار أبيض. مفيش مكان أستخبى فيه.')}</${Talk}>
          <${P} small=${true}>${X('Because it examines the <b>internal workings</b>, white-box testing goes by many names: <b>glass box</b>, <b>structural</b>, <b>open box</b> or <b>clear box</b> testing.',
            'وعشان بيفحص <b>الشغل الداخلي</b> ليه أسامي كتير: <b>glass box</b> و<b>structural</b> و<b>open box</b> و<b>clear box</b> testing.')}</${P}>
        `, { sec: t('Open the box', 'افتح الصندوق') }),

        // 2 · what it helps a tester do
        page(html`
          <${H1}>${t('What can you test with the lid off?', 'تقدر تختبر إيه والغطا مفتوح؟')}</${H1}>
          <${P}>${t('White-box testing helps a tester:', 'الـ white-box testing بيساعد الـ tester إنه:')}</${P}>
          <${Steps} items=${A ? [
            'يختبر الـ <b>independent paths</b> جوه الـ unit أو الـ module.',
            'يختبر الـ <b>logical correctness</b>، يعني الـ conditions لما تبقى true ولما تبقى false.',
            'يختبر الـ <b>loops</b>، وبالذات عند الـ boundaries بتاعتها، ويتأكد من الـ <b>operational boundary correctness</b>.',
            'يختبر الـ <b>internal data structures</b> ويتأكد إنها valid.'
          ] : [
            'Test <b>independent paths</b> within a unit or module.',
            'Test <b>logical correctness</b>: both the true and the false conditions.',
            'Test <b>loops</b>, specifically at their boundaries, and check the <b>operational boundary correctness</b>.',
            'Test <b>internal data structures</b> to ensure their validity.'
          ]} />
          <${Hand} tilt=${true}>${t('Our shorthand: paths, logic, loops, data.', 'اختصار من عندنا: paths، logic، loops، data.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('"Both the true and the false conditions": keep that phrase in mind. By the end of the chapter it turns into three kinds of code coverage.', 'خلّي جملة "الـ true والـ false" في دماغك. في آخر الفصل هتبقى تلات أنواع من الـ code coverage.')}</p></${Box}>
        `),

        // 3 · the map
        page(html`
          <${H2}>${t('Two ways to look inside', 'طريقتين تبص بيهم جوّه')}</${H2}>
          <${P} small=${true}>${X('The unit splits white-box testing in two. <b>Static</b>: people examine the design and code. <b>Dynamic</b>: you run test cases, knowing the code.',
            'الـ unit بتقسم الـ white-box testing نصّين. الـ <b>Static</b>: ناس بتفحص الـ design والـ code. الـ <b>Dynamic</b>: بتشغّل test cases وإنت عارف الـ code.')}</${P}>
          <${Map} />
          <${Hand} arrow="up">${t('the rest of the chapter walks down both columns', 'باقي الفصل هيمشي في العمودين دول بالترتيب')}</${Hand}>
          <${Grow} />
          <${Talk} who="dev">${t('Wait, so testing can happen without running anything?', 'استنى، يعني فيه testing من غير ما نشغّل حاجة؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('Yes: the static half is meetings, rules and a checklist.', 'أيوه: النص الـ static عبارة عن اجتماعات وقواعد و checklist.')}</${Talk}>
        `),

        // 4 · static tree figure
        page(html`
          <${Fig} name="qa-static-wb" />
        `, { sec: t('Static white-box', 'الـ Static white-box') }),

        // 5 · formal review
        page(html`
          <${H1}>${t('Formal review: a meeting about code', 'الـ Formal review يعني اجتماع على الـ code')}</${H1}>
          <${Def}>${X('<b>Formal review</b>: formal meetings between <b>programmers and testers</b> to inspect the software\'s <b>design and code</b>.',
            'الـ <b>Formal review</b> هو اجتماعات رسمية بين الـ <b>programmers والـ testers</b> عشان يفحصوا الـ <b>design والـ code</b> بتوع الـ software.')}</${Def}>
          <${H3}>${t('For a successful formal review: 4 essential elements', 'عشان ينجح، لازم 4 essential elements')}</${H3}>
          <${Steps} items=${A ? [
            'الـ <b>Identify problems</b>: نطلّع المشاكل في الـ design والـ code.',
            'الـ <b>Follow rules</b>: مجموعة rules ثابتة، زي عدد سطور الـ code اللي بتتراجع في اليوم والوقت المستهلك.',
            'الـ <b>Prepare</b>: كل مشارك بيحضّر وبيساهم.',
            'الـ <b>Write a report</b>: report بيلخص النتايج، ويبقى متاح للـ development team.'
          ] : [
            '<b>Identify problems</b> in the design and code.',
            '<b>Follow rules</b>: a fixed set of rules, e.g. lines of code reviewed per day and time spent.',
            '<b>Prepare</b>: every participant prepares and contributes.',
            '<b>Write a report</b> summarizing the results, made available to the development team.'
          ]} />
          <${Grow} />
          ${watch('The report goes <b>to the development team</b>. And "rewrite the faulty code during the meeting" is not one of the four.',
            'الـ report بيبقى <b>متاح للـ development team</b>. و"نعيد كتابة الـ code الغلط في الاجتماع" مش من الأربعة.')}
        `, { sec: t('Formal review', 'الـ Formal review') }),

        // 6 · the three reviews
        page(html`
          <${H2}>${t('Three kinds of formal review', 'تلات أنواع من الـ formal review')}</${H2}>
          <div className="hf-qa3-rv">
            ${(A ? [
              ['الـ Peer review', 'فيه <b>programmer ساعد في تصميم</b> الـ architecture أو الـ code، ومعاه <b>programmers أو testers تانيين</b> بيعملوا review.'],
              ['الـ Walkthrough', 'الـ programmer <b>اللي كتب</b> الـ code بيعرضه على <b>5 أو 6</b> programmers و testers. بيقراه سطر سطر أو function function و<b>بيشرح معنى كل سطر</b>، والأسئلة بيترد عليها في الـ session.'],
              ['الـ Inspection', 'اللي بيعرض <b>مش هو الـ programmer الحقيقي</b>. والـ inspectors بيراجعوا الـ code من <b>وجهة نظر الـ user والـ tester</b>.']
            ] : [
              ['Peer review', 'A <b>programmer who helped design</b> the architecture/code, with <b>other programmers or testers</b> acting as reviewers.'],
              ['Walkthrough', 'The programmer <b>who wrote</b> the code presents it to a group of <b>5 or 6</b> programmers and testers, reading it line by line or function by function and <b>explaining what each line means</b>. Queries are addressed in the session.'],
              ['Inspection', 'The presenter is <b>not the real programmer</b>. Inspectors review the code from the <b>user\'s and tester\'s perspective</b>.']
            ]).map(([h, p], j) => html`<div key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.18 + 's' }}><h4>${h}</h4><p>${T(p)}</p></div>`)}
          </div>
          <${Hand} red=${true}>${t('who presents? the author, or NOT the author', 'مين بيعرض؟ صاحب الـ code، ولا حد غيره؟')}</${Hand}>
        `),

        // 7–8 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: a Walkthrough and an Inspection argue about who runs the better meeting.", 'قعدة الليلة: Walkthrough وInspection بيتخانقوا مين بيدير اجتماع أحسن.')} />
          <${Chat} names=${[t('Walkthrough', 'الـ Walkthrough'), t('Inspection', 'الـ Inspection')]} lines=${A ? [
            [0, 'في اجتماعاتي <b>صاحب الـ code نفسه</b> هو اللي بيعرض. مين أحسن منه يشرحه؟'],
            [1, 'وعشان كده بالظبط عندي اللي بيعرض <b>مش هو الـ programmer الحقيقي</b>.'],
            [0, 'بيقرا الـ code <b>سطر سطر أو function function</b> وبيشرح كل سطر معناه إيه، قدام <b>5 أو 6</b> programmers و testers.'],
            [1, 'والـ inspectors بتوعي بيبصوا على الـ code من <b>وجهة نظر الـ user والـ tester</b>.'],
            [0, 'وأي <b>comments أو queries</b> بنرد عليها في الـ session نفسها.']
          ] : [
            [0, 'In my meetings the <b>author</b> presents. Who knows the code better?'],
            [1, "That's exactly why my presenter is <b>not the real programmer</b>."],
            [0, 'The author reads it <b>line by line, or function by function</b>, and explains what each line means, to <b>5 or 6</b> programmers and testers.'],
            [1, "And my inspectors review the code from the <b>user's and tester's perspective</b>."],
            [0, 'Any <b>comments and queries</b> get addressed right there in the session.']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Walkthrough', 'الـ Walkthrough'), t('Inspection', 'الـ Inspection')]} start=${1} lines=${A ? [
            [1, 'ماشي. ومتنساش إننا إخوات: إحنا الاتنين و<b>الـ Peer review</b> تحت الـ <b>Formal review</b>.'],
            [0, 'وكلنا محتاجين نفس الـ 4: <b>identify problems</b>، و<b>follow rules</b>، و<b>prepare</b>، و<b>write a report</b>.']
          ] : [
            [1, "Fine. And don't forget we're siblings: you, me and <b>Peer review</b> all sit under <b>Formal review</b>."],
            [0, 'And we all need the same four: <b>identify problems</b>, <b>follow rules</b>, <b>prepare</b>, <b>write a report</b>.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><ul className="hf-ul">${(A ? [
            'الـ inspections تبع الـ <b>Formal review</b>. الـ Peer review أخوها، مش الأب بتاعها.',
            'الاجتماع اللي بيفحص الـ design والـ code اسمه <b>Formal review</b>. والـ "code review" اللي في الشجرة هو الـ <b>checklist</b> (لستة أخطاء)، مش اجتماع.',
            'والـ code coverage والـ data coverage دول dynamic، مالهمش دعوة بالـ inspection.'
          ] : [
            'Inspections come under <b>Formal review</b>. Peer review is a sibling, not the parent.',
            'The meeting to inspect the design and code is called <b>Formal review</b>. The tree\'s "code review" is the <b>checklist</b>, a list of error classes, not a meeting.',
            'Code coverage and data coverage are dynamic; they have nothing to do with inspection.'
          ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
        `),

        // 9 · sort the reviews
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which review is it? Tap <b>P</b> for Peer review, <b>W</b> for Walkthrough or <b>I</b> for Inspection, then check.', 'ده أنهي review؟ دوس <b>P</b> للـ Peer review، أو <b>W</b> للـ Walkthrough، أو <b>I</b> للـ Inspection، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="rv" bins=${[['P', 'Peer review'], ['W', 'Walkthrough'], ['I', 'Inspection']]} items=${A ? [
            ['اللي بيعرض مش هو الـ programmer الحقيقي', 2],
            ['صاحب الـ code بيعرضه بنفسه', 1],
            ['بيتراجع من وجهة نظر الـ user والـ tester', 2],
            ['programmer ساعد في التصميم، والـ reviewers programmers أو testers', 0],
            ['جروب من 5 أو 6 programmers و testers', 1],
            ['بيشرح كل function وكل سطر معناه إيه', 1]
          ] : [
            ['The presenter is not the real programmer', 2],
            ['The author presents the code himself', 1],
            ["Reviewed from the user's and tester's perspective", 2],
            ['A programmer who helped design it, with programmers or testers as reviewers', 0],
            ['A group of 5 or 6 programmers and testers', 1],
            ['Explains what each function and line of code means', 1]
          ]} />
          <${Grow} />
          <${Talk} who="bug" flip=${true}>${t('Three meetings about me, and I wasn\'t even invited.', 'تلات اجتماعات عليّا، ومحدش عزمني.')}</${Talk}>
        `),

        // 10 · standards vs guidelines
        page(html`
          <${H1}>${t('Must vs should', 'لازم ولا يُستحسن')}</${H1}>
          <div className="hf-qa3-vs hf-in">
            <div className="hf-qa3-hd">${t('Standards', 'الـ Standards')}</div><div className="hf-qa3-hd">${t('Guidelines', 'الـ Guidelines')}</div>
            <div>${X('<b>Rules</b> that <b>must be adhered to</b>.', 'هي <b>rules</b> لازم <b>نلتزم بيها</b>.')}</div>
            <div>${X('<b>Instructions</b> which enable a person to <b>follow a set of standards</b>.', 'هي <b>تعليمات</b> بتساعد الشخص <b>يمشي على الـ standards</b>.')}</div>
            <div>${X('<b>Mandatory.</b>', 'إجبارية (<b>mandatory</b>).')}</div>
            <div>${X('<b>Not really mandatory.</b>', 'مش إجبارية أوي (<b>not really mandatory</b>).')}</div>
          </div>
          <${Talk} who="dev">${t('So guidelines are optional extras?', 'يعني الـ guidelines دي حاجة زيادة على الماشي؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('They help you follow the standards. The standards are the part you must obey.', 'هي بتساعدك تمشي على الـ standards. الـ standards هي اللي لازم تلتزم بيها.')}</${Talk}>
          <${Grow} />
          ${watch('"Not really mandatory" → <b>Guidelines</b>. "Mandatory" → <b>Standards</b>. The option "Standards and guidelines" is wrong for both questions.',
            'لو قال "not really mandatory" يبقى <b>Guidelines</b>، ولو قال "mandatory" يبقى <b>Standards</b>. واختيار "Standards and guidelines" غلط في السؤالين.')}
        `, { sec: t('Standards & guidelines', 'الـ Standards والـ guidelines') }),

        // 11 · three reasons
        page(html`
          <${H2}>${t('Why follow them? Three reasons', 'ليه نمشي عليهم؟ تلات أسباب')}</${H2}>
          <${Steps} items=${A ? [
            'الـ <b>Reliability</b>: الـ code المكتوب على الـ standards والـ guidelines بيبقى reliable و secure أكتر.',
            'الـ <b>Readability / Maintainability</b>: أسهل في الفهم والـ maintenance.',
            'الـ <b>Portability</b>: يبقى portable كفاية إنه يشتغل على hardware مختلف و compilers مختلفة.'
          ] : [
            '<b>Reliability</b>: code written to standards and guidelines is more reliable and secure than code that is not.',
            '<b>Readability / Maintainability</b>: easier to understand and maintain.',
            '<b>Portability</b>: portable enough to run on different hardware and different compilers.'
          ]} />
          <${P} small=${true}>${X('And when standards and guidelines are followed, it becomes <b>easier for people to access the code</b>.', 'ولما الـ standards والـ guidelines تتطبق، بيبقى <b>أسهل على الناس يوصلوا للـ code</b>.')}</${P}>
          <${Hand} tilt=${true}>${A ? html`حيلة من عندنا: <bdi dir="ltr"><b>R</b>eliable, <b>R</b>eadable, <b>P</b>ortable</bdi>` : html`Our trick: <b>R</b>eliable, <b>R</b>eadable, <b>P</b>ortable: "RRP"`}</${Hand}>
          <${Grow} />
          ${watch('Not on the list: <b>scalability</b>, <b>usability</b>, <b>compatibility</b> (portability is, compatibility is not). When all three real reasons are offered, the answer is <b>All answers</b>.',
            'مش من الأسباب: الـ <b>scalability</b> والـ <b>usability</b> والـ <b>compatibility</b> (الـ portability أيوه، الـ compatibility لأ). ولو الاختيارات فيها التلات أسباب الحقيقية، الإجابة <b>All answers</b>.')}
        `),

        // 12 · checklist
        page(html`
          <${H1}>${t('The code review checklist', 'الـ code review checklist')}</${H1}>
          <${P} small=${true}>${X('The third part: a <b>generic checklist</b> of the error classes to hunt for while reading code. Tap each class to see what to check.',
            'الجزء التالت: <b>checklist عامة</b> بأنواع الـ errors اللي بتدوّر عليها وإنت بتقرا الـ code. دوس على كل نوع عشان تشوف بتشيّك على إيه.')}</${P}>
          <${Checklist} />
        `, { sec: t('Code review checklist', 'الـ Code review checklist') }),

        // 13 · zero is true ‡ + dumb questions
        page(html`
          <${Box} kind="watch" title=${t('Watch it: the "zero is true" slide ‡', 'خلّي بالك: سلايد الـ zero ‡')}>
            <p className="hf-p small">${X('The Comparison Errors slide says: <i>"In the C language, zero is considered as true and non-zero is considered as false."</i> The summary MCQ repeats it, with the answer <b>C</b>.',
              'سلايد الـ Comparison Errors بتقول:<span class="ltr"><i>"In the C language, zero is considered as true and non-zero is considered as false."</i></span>والـ summary MCQ بيكررها، والإجابة <b>C</b>.')}</p>
            <p className="hf-p small" style=${{ marginTop: '5px' }}>${X('‡ In real C it is the <b>opposite</b>: 0 is false and any non-zero value is true. If the exam repeats the slide\'s sentence, choose <b>C</b>. The slide\'s point: mixing integers and Booleans causes comparison errors.',
              '‡ في C الحقيقية الموضوع <b>بالعكس</b>: الـ 0 هو false وأي قيمة non-zero هي true. لو الامتحان كرر جملة السلايد، اختار <b>C</b>. المقصود إن خلط الـ integers بالـ Booleans بيعمل comparison errors.')}</p></${Box}>
          <${Dumb} qa=${A ? [
            ['ليه variable اتستخدم مرة واحدة بس يبقى مشكلة؟', 'ده check (د) بتاع الـ data declaration. المقصود variable متعرّف ومحدش استخدمه أو اتستخدم مرة واحدة، فـ<b>المفروض يبقى constant</b>.'],
            ['الـ off-by-one تبع أنهي نوع؟', 'تبع الـ <b>data reference</b>، مع الـ subscripts اللي برّه حدود الـ array والـ variables اللي من غير initialize.']
          ] : [
            ['Why is a variable used only once a problem?', 'It\'s data declaration check (d): declared but never referenced, or referenced just once, <b>should be a constant</b>.'],
            ['Which class does "off-by-one" belong to?', '<b>Data reference</b>, along with subscripts out of bounds and un-initialized variables.']
          ]} />
        `),

        // 14 · match the bug to its class
        page(html`
          <${H2}>${t('Which class is it?', 'ده تبع أنهي نوع؟')}</${H2}>
          <${P} small=${true}>${t('Tap an error class, then the bug that belongs to it.', 'دوس على نوع الـ error، وبعدين على الـ bug اللي تبعه.')}</${P}>
          <${Match} id="ckm" left=${A ? ['الـ Data reference', 'الـ Data declaration', 'الـ Computation', 'الـ Comparison', 'الـ Control flow', 'الـ Input/Output'] : ['Data reference', 'Data declaration', 'Computation', 'Comparison', 'Control flow', 'Input/Output']}
            right=${A ? ['كتبت <bdi dir="ltr">&lt;</bdi> وإنت قصدك <bdi dir="ltr">&lt;=</bdi>', 'الـ divisor ممكن يبقى صفر', 'غلط وإنت بتقرا من file', 'قريت variable عمره ما اتعمله initialize', 'فيه loop عمرها ما بتخلص', 'variable متعرّف ومحدش استخدمه خالص']
              : ['Writing < where <= was meant', 'A divisor that can become zero', 'An error reading from a file', 'Reading a variable that was never initialized', 'A loop that never terminates', 'A variable declared but never used']}
            answer=${[3, 5, 1, 0, 4, 2]} />
          <${Grow} />
          <${Talk} who="bug" flip=${true}>${t('Six hiding places, and they wrote a list of all of them.', 'ست أماكن أستخبى فيهم، وكاتبينهم في لستة.')}</${Talk}>
        `, { sec: t('Exercise: error classes', 'تمرين: أنواع الـ errors') }),

        // 15 · dynamic white-box
        page(html`
          <${H1}>${t('Now run it: dynamic white-box', 'دلوقتي شغّله، وده الـ dynamic white-box')}</${H1}>
          <${Def}>${X('<b>Dynamic white-box testing</b> is a <b>validation check</b>: running test cases with input values to ensure the application works according to the spec throughout execution.',
            'الـ <b>Dynamic white-box testing</b> هو <b>validation check</b>: بنشغّل test cases بقيم input عشان نتأكد إن الـ application شغال حسب الـ spec طول التشغيل.')}</${Def}>
          <${P} small=${true}>${t('It covers:', 'وبيغطي:')}</${P}>
          <${UL} items=${A ? [
            'نعمل testing للـ low-level functions أو procedures أو subroutines أو libraries <b>مباشرةً</b>.',
            'نعمل testing للبرنامج كله من الـ <b>top level</b>، ونعدّل الـ test cases على حسب اللي نعرفه عن طريقة شغله.',
            'نقرا الـ <b>variables والـ state information</b> عشان نتأكد إن الـ tests بتعمل اللي اتصممت عشانه، و<b>نجبر الـ software</b> يعمل حاجات صعب تتختبر عادي.'
          ] : [
            'Testing low-level functions, procedures, subroutines or libraries <b>directly</b>.',
            'Testing the whole program at the <b>top level</b>, adjusting test cases based on what we know of its operation.',
            'Reading <b>variables and state information</b> to check the tests do what they were designed to do, and <b>forcing the software</b> to do things that are hard to test normally.'
          ]} />
          <${Grow} />
          <${Hand} arrow="up">${t('"validation check" + "knowledge of the code" = dynamic white-box', 'لو قال "validation check" ومعاه معرفة بالـ code، يبقى dynamic white-box')}</${Hand}>
        `, { sec: t('Dynamic white-box', 'الـ Dynamic white-box') }),

        // 16 · testing vs debugging
        page(html`
          <${H2}>${t('Finding is not fixing', 'إنك تلاقيه غير إنك تصلّحه')}</${H2}>
          <${Talk} who="lens">${t('Found you! Line 12.', 'مسكتك! سطر 12.')}</${Talk}>
          <${Talk} who="bug" flip=${true}>${t("Fine. But you can't fix me. You're only the tester.", 'ماشي. بس إنت مش هتصلّحني. إنت الـ tester وبس.')}</${Talk}>
          <${Talk} who="dev">${t("That part's mine. It's called debugging.", 'الحتة دي بتاعتي أنا. اسمها debugging.')}</${Talk}>
          <${Def}>${X('Dynamic white-box testing <b>finds</b> bugs. <b>Debugging fixes</b> the bugs found during testing.', 'الـ Dynamic white-box testing <b>بيلاقي</b> الـ bugs. والـ <b>debugging بيصلّح</b> الـ bugs اللي اتلاقت في الـ testing.')}</${Def}>
          <${Grow} />
          ${watch('"The process of fixing the bugs found during the testing phase is called": <b>Debugging</b>. Not dynamic white box, not dynamic black box: those find bugs.',
            'الإجابة هنا <b>Debugging</b>، مش dynamic white ولا black box:<span class="ltr">"The process of fixing the bugs found during the testing phase is called"</span>')}
        `),

        // 17 · interview
        page(html`
          <${Interview} title=${t('Dynamic White-Box Testing, exposed', 'الـ Dynamic White-Box Testing على المكشوف')} sub=${t("This week's interview: the tester who reads the code and runs it too.", 'حوار الأسبوع: الـ tester اللي بيقرا الـ code وبيشغّله كمان.')} lines=${A ? [
            ['المذيع', 'إنت بقى اللي بتشغّل الـ code بجد؟'],
            ['الـ Dynamic', 'أيوه. أنا <b>validation check</b>: بشغّل test cases بقيم input وبشوف الـ application ماشي حسب الـ spec ولا لأ.'],
            ['المذيع', 'وبتشغّل إيه بالظبط؟'],
            ['الـ Dynamic', 'حتت صغيرة <b>مباشرةً</b> زي الـ functions والـ libraries، والبرنامج كله من الـ top level، وبقرا الـ variables والـ state عشان أتأكد إن الـ tests بتعمل اللي المفروض.'],
            ['المذيع', 'الناس بتخلط بينك وبين الـ Debugging.'],
            ['الـ Dynamic', 'أنا <b>بلاقي</b> الـ bugs. الـ Debugging <b>بيصلّح</b> اللي أنا لاقيته.'],
            ['المذيع', 'وإيه اللي في شنطتك؟'],
            ['الـ Dynamic', 'الـ <b>testing the pieces</b>، والـ <b>data coverage</b>، والـ <b>code coverage</b>. الصفحات الجاية.']
          ] : [
            ['Head First', "So you're the one who actually runs the code?"],
            ['Dynamic WB', "Yes. I'm a <b>validation check</b>: I run test cases with input values and see whether the application works according to the spec."],
            ['Head First', 'Run what, exactly?'],
            ['Dynamic WB', 'Small pieces <b>directly</b>, like functions and libraries; the whole program from the top level; and I read variables and state to check my tests do what they should.'],
            ['Head First', 'People mix you up with Debugging.'],
            ['Dynamic WB', 'I <b>find</b> bugs. Debugging <b>fixes</b> the ones I find.'],
            ['Head First', "What's in your toolbox?"],
            ['Dynamic WB', '<b>Testing the pieces</b>, <b>data coverage</b> and <b>code coverage</b>. Next pages.']
          ]} />
        `),

        // 18 · testing the pieces
        page(html`
          <${H2}>${t('Testing the pieces', 'الـ Testing the pieces')}</${H2}>
          <${P} small=${true}>${X('<b>Testing the pieces</b> means <b>unit</b> and <b>integration</b> testing. Integration testing has three strategies:', 'الـ <b>Testing the pieces</b> معناه الـ <b>unit</b> والـ <b>integration</b> testing. والـ integration testing ليه تلات strategies:')}</${P}>
          <${Fig} name="qa-integration" />
          ${watch('<b>Umbrella</b> is a type of <b>integration testing</b>, a sibling of top-down and bottom-up, not a kind of either. And "Big Bang" is not on the slides\' list.',
            'الـ <b>Umbrella</b> نوع من الـ <b>integration testing</b>، أخو الـ top-down والـ bottom-up، مش نوع منهم. والـ <bdi dir="ltr">Big Bang</bdi> مش في لستة السلايدز.')}
        `, { sec: t('Testing the pieces', 'الـ Testing the pieces') }),

        // 19 · data coverage
        page(html`
          <${H1}>${t('Follow the data', 'امشي ورا الـ data')}</${H1}>
          <${Def}>${X('<b>Data coverage</b>: the data is tracked completely through the software: values in variables, constants, arrays and data structures; keyboard and mouse input, files, screen input and output, data sent to modems, networks and so on.',
            'الـ <b>Data coverage</b> معناه إن الـ data بتتتبع بالكامل جوه الـ software: الـ variables والـ constants والـ arrays والـ data structures، والكيبورد والماوس، والـ files، والشاشة، والـ modems والـ networks.')}</${Def}>
          <${P} small=${true}>${X('The code is divided into <b>data and states</b>, relating to program flow. That is similar to black-box testing, so it is <b>easy to map</b> white-box and black-box test cases.',
            'الـ code بيتقسم لـ <b>data و states</b> مربوطة بالـ program flow. وده شبه الـ black-box testing، فـ<b>سهل نربط</b> الـ white-box cases بالـ black-box cases.')}</${P}>
          <${H3}>${t('Its three types', 'أنواعه التلاتة')}</${H3}>
          <div className="hf-qa3-chips hf-in" dir="ltr"><span>Data flow</span><span>Sub-boundaries</span><span>Error forcing</span></div>
          <${Grow} />
          ${watch('"Data coverage have the next type" with these three as options: <b>All answers</b>. And <b>statement coverage</b> is code coverage, not data coverage.',
            'لو السؤال "Data coverage have the next type" والاختيارات التلاتة دول، الإجابة <b>All answers</b>. والـ <b>statement coverage</b> تبع الـ code coverage، مش الـ data coverage.')}
        `, { sec: t('Data coverage', 'الـ Data coverage') }),

        // 20 · code coverage tree
        page(html`
          <${H2}>${t('Follow the code: code coverage', 'امشي ورا الـ code بالـ code coverage')}</${H2}>
          <${Fig} name="qa-code-coverage" />
          <${Hand} red=${true}>${t('the midterm says line, branch and condition coverage: line = statement, branch = path. Answer: All answers.', 'الميدترم قال line وbranch وcondition: الـ line هي الـ statement والـ branch هي الـ path. والإجابة All answers.')}</${Hand}>
        `, { sec: t('Code coverage', 'الـ Code coverage') }),

        // 21 · static or dynamic sort
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Static or dynamic? Tap <b>S</b> or <b>D</b> for each piece of white-box testing, then check.', 'الـ static ولا الـ dynamic؟ دوس <b>S</b> أو <b>D</b> لكل جزء من الـ white-box testing، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="sd" bins=${[['S', 'Static white-box'], ['D', 'Dynamic white-box']]} items=${A ? [
            ['الـ Inspection', 0],
            ['الـ Statement coverage', 1],
            ['الـ Coding standards and guidelines', 0],
            ['الـ Umbrella approach', 1],
            ['الـ Code review checklist', 0],
            ['الـ Error forcing', 1],
            ['الـ Walkthrough', 0],
            ['الـ Validation check بقيم input', 1]
          ] : [
            ['Inspection', 0],
            ['Statement coverage', 1],
            ['Coding standards and guidelines', 0],
            ['Umbrella approach', 1],
            ['Code review checklist', 0],
            ['Error forcing', 1],
            ['Walkthrough', 0],
            ['A validation check with input values', 1]
          ]} />
        `),

        // 22 · statement coverage
        page(html`
          <${H1}>${t('Statement coverage: every line, at least once', 'الـ Statement coverage بتشغّل كل سطر مرة على الأقل')}</${H1}>
          <${P} small=${true}>${X('<b>Statement coverage</b>: every statement runs at least once. The lecture\'s first example has no IF at all:', 'الـ <b>Statement coverage</b> معناها إن كل statement تتنفذ مرة واحدة على الأقل. أول مثال في المحاضرة مفيهوش IF خالص:')}</${P}>
          <${Code} lines=${['1: PRINT "Good Morning"', '2: PRINT "Be Positive"', '3: PRINT "Today is a Great Day"', '4: END']} />
          <${P}>${X('No choices to make, so <b>one test</b> runs all four lines. Done.', 'مفيش اختيارات، فـ<b>test واحد</b> بيشغّل الأربع سطور. خلاص.')}</${P}>
          <${Talk} who="bug" flip=${true}>${t('A straight line of code? Not a single corner to hide in.', 'كود ماشي على خط واحد؟ ولا ركن أستخبى فيه.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t('Now put an IF in front of a statement. What must the test case do for that statement to run?', 'دلوقتي حط IF قبل statement. الـ test case لازم يعمل إيه عشان الـ statement دي تتنفذ؟')}</p></${Box}>
        `, { sec: t('Statement coverage', 'الـ Statement coverage') }),

        // 23 · the exam favourite
        page(html`
          <${H2}>${t("The exam's favourite: AND vs OR", 'المفضّل في الامتحان: AND ولا OR')}</${H2}>
          <${P} small=${true}>${X('With an IF guarding the statement, statement coverage needs a test where the condition is <b>true</b>.', 'لو فيه IF قبل الـ statement، الـ statement coverage محتاجة test الـ condition فيه <b>true</b>.')}</${P}>
          <div className="hf-qa3-vs hf-in">
            <div className="hf-qa3-hd">AND</div><div className="hf-qa3-hd">OR</div>
            <div>${X('<b>Both</b> parts must be true. Usually only one option works.', 'لازم <b>الجزئين</b> يبقوا true. غالبًا اختيار واحد بس اللي ينفع.')}</div>
            <div>${X('<b>Either</b> part is enough. Often every option works: <b>All answers</b>.', '<b>أي جزء</b> فيهم كفاية. غالبًا كل الاختيارات تنفع، يعني <b>All answers</b>.')}</div>
          </div>
          ${mq('m-or', /^if \(X=2\) or \(y&gt;1\)/)}
        `),

        // 24 · be the CPU
        page(html`
          <${H2}>${t('Be the CPU', 'خليك إنت الـ CPU')}</${H2}>
          <${P} small=${true}>${t("The exam's two-IF question. Does each THEN statement run? Careful: the second IF reads the new A.", 'سؤال الامتحان اللي فيه اتنين IF. كل statement بعد الـ THEN بتتنفذ ولا لأ؟ خلي بالك إن الـ IF التاني بيقرا A الجديدة.')}</${P}>
          <${Code} lines=${['if (X>1) and (Y=0) then A=A/X;', 'if (X=2) or (A>1) then A=A+1;']} />
          <${Trace} />
        `, { sec: t('Exercise: be the CPU', 'تمرين: خليك الـ CPU') }),

        // 25 · path coverage
        page(html`
          <${H1}>${t('Path coverage: both ways through every IF', 'الـ Path coverage بتمشي الطريقين في كل IF')}</${H1}>
          <${P} small=${true}>${X('<b>Path coverage</b> (the slides also call it <b>branch</b>): every path, so <b>both branches of every IF</b>.', 'الـ <b>Path coverage</b> (السلايدز بتسميها كمان <b>branch</b>) معناها كل path، يعني <b>الفرعين بتوع كل IF</b>.')}</${P}>
          <${Code} lines=${['1: PRINT "Good Morning"', '2: IF Date$ = "25-12-2008" then', '3: PRINT "MERRY CHRISTMAS"', '4: END IF', ['5: PRINT "The date id:"; Date$', '‡'], '6: PRINT "The time:"; Time$', '7: END']} />
          <${H3}>${t('Two tests:', 'اتنين tests:')}</${H3}>
          <div className="hf-qa3-runs hf-in"><b>Date$ = 25-12-2008</b><span>→ 1, 2, 3, 4, 5, 6, 7</span><b style=${{ fontFamily: A ? AF : null }}>${t('any other date', 'أي تاريخ تاني')}</b><span>→ 1, 2, 5, 6, 7</span></div>
          <${Grow} />
          <${P} small=${true}>${X('‡ The slide prints <code>"The date id:"</code>; it means "is".', '‡ السلايد كاتبة <code>"The date id:"</code>، والمقصود "is".')}</${P}>
          <${Hand} red=${true}>${t('the first test alone already gives statement coverage; path coverage needs the second', 'الـ test الأول لوحده بيدّي statement coverage، والـ path coverage محتاجة التاني')}</${Hand}>
        `, { sec: t('Path coverage', 'الـ Path coverage') }),

        // 26 · condition coverage
        page(html`
          <${H1}>${t('Condition coverage: split the IF', 'الـ Condition coverage بتفكّك الـ IF')}</${H1}>
          <${P} small=${true}>${X('Same program, but now the IF has <b>two sub-conditions</b> joined by AND:', 'نفس البرنامج، بس دلوقتي الـ IF فيه <b>2 sub-conditions</b> بينهم AND:')}</${P}>
          <${Code} lines=${['1: PRINT "Good Morning"', '2: IF Date$ = "25-12-2008"', '     AND Time$ = "00:00:00" THEN', '3:    PRINT "MERRY CHRISTMAS"', '4: END IF', '5: PRINT "The date is: "; Date$', '6: PRINT "The time is: "; Time$', '7: END']} />
          <${P} small=${true}>${X('For <b>full condition coverage</b>, the lecture tests <b>every combination</b> of the two parts: the Date part true or false, with the Time part true or false. That gives <b>4 test cases</b>.',
            'عشان الـ <b>full condition coverage</b>، المحاضرة بتختبر <b>كل combination</b> للجزئين: جزء الـ Date يبقى true أو false، مع جزء الـ Time true أو false. يطلع <b>4 test cases</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Of the four, how many print MERRY CHRISTMAS? Decide, then run them on the next page.', 'من الأربعة، كام واحد بيطبع MERRY CHRISTMAS؟ قرّر، وبعدين شغّلهم في الصفحة الجاية.')}</p></${Box}>
        `, { sec: t('Condition coverage', 'الـ Condition coverage') }),

        // 27 · condition coverage figure
        page(html`
          <${H2}>${t('Run the four test cases', 'شغّل الـ 4 test cases')}</${H2}>
          <${Fig} name="qa-condition-coverage" />
        `),

        // 28 · three counts
        page(html`
          <${H2}>${t('One program, three coverage counts', 'برنامج واحد، تلات أعداد للـ coverage')}</${H2}>
          <${P} small=${true}>${t('For the Date AND Time program, the fewest test cases each coverage needs:', 'لبرنامج الـ Date AND Time، أقل عدد test cases محتاجه كل نوع:')}</${P}>
          <div className="hf-qa3-cnt hf-in">
            <span className="hf-qa3-hd">${t('Coverage', 'الـ Coverage')}</span><span className="hf-qa3-hd">${t('Tests', 'العدد')}</span><span className="hf-qa3-hd">${t('Why', 'ليه')}</span>
            <span><b>${t('Statement', 'الـ Statement')}</b></span><span className="hf-qa3-n">1</span><span>${X('<code>25-12-2008, 00:00:00</code> runs all 7 lines', 'ده لوحده بيشغّل الـ 7 سطور:<span class="ltr">25-12-2008, 00:00:00</span>')}</span>
            <span><b>${t('Path (branch)', 'الـ Path (branch)')}</b></span><span className="hf-qa3-n">2</span><span>${t('the whole IF true once and false once', 'الـ IF كله true مرة و false مرة')}</span>
            <span><b>${t('Full condition', 'الـ Full condition')}</b></span><span className="hf-qa3-n">4</span><span>${t('every combination of the two parts', 'كل combination للجزئين')}</span>
          </div>
          <${Grow} />
          ${watch('Only <code>25-12-2008, 00:00:00</code> runs line 3. <code>25-12-2008, 11:11:11</code> does not: with AND, the Time part being false makes the whole IF false.',
            'سطر 3 بيتنفذ في test واحد بس، وهو:<span class="ltr">25-12-2008, 00:00:00</span>لكن ده مبيتنفذش فيه، عشان جزء الـ Time فيه false، ومع الـ AND الـ IF كله بيقع:<span class="ltr">25-12-2008, 11:11:11</span>')}
        `),

        // 29 · coverage meter
        page(html`
          <${Box} kind="pencil" title=${t('Build the smallest test suite', 'اعمل أصغر test suite')}><p className="hf-p small">${t('Pick a goal, then tick test cases from the slide\'s table until the goal\'s meter is full. Use as few tests as you can.', 'اختار هدف، وبعدين علّم على test cases من جدول السلايد لحد ما عداد الهدف يتملي. استخدم أقل عدد ممكن.')}</p></${Box}>
          <${Meter} />
        `, { sec: t('Exercise: coverage', 'تمرين: الـ coverage') }),

        // 30 · dumb questions on coverage
        page(html`
          <${Dumb} qa=${A ? [
            ['هي الـ path coverage هي نفسها الـ branch coverage؟', 'في السلايدز أيوه: <bdi dir="ltr">"Path coverage (branch)"</bdi>، يعني الفرعين بتوع كل IF. والميدترم سمّى الـ statement coverage كمان <b>line coverage</b>.'],
            ['لو test واحد عمل statement coverage، ليه أتعب نفسي بأكتر؟', 'لأنه عمره ما شاف الـ IF وهو false. الـ path coverage بتضيف الحالة دي، والـ condition coverage بتجرب كل combination للأجزاء.'],
            ['ليه تلات sub-conditions بـ AND بيطلعوا 8؟', 'لو مشيت بطريقة المحاضرة (كل combination)، كل جزء ليه حالتين: <bdi dir="ltr">2 × 2 × 2 = 8</bdi>. ده تمرين من الموقع، مش من السلايدز.']
          ] : [
            ['Is path coverage the same as branch coverage?', 'On these slides, yes: "Path coverage (branch)", both branches of every IF. The midterm also calls statement coverage <b>line coverage</b>.'],
            ['If one test gives statement coverage, why bother with more?', 'Because it never sees the IF being false. Path coverage adds that case; condition coverage tries every combination of the parts.'],
            ['Why would three sub-conditions joined by AND need 8?', 'Following the lecture\'s method (every combination), each part has two values: 2 × 2 × 2 = 8. That one is a site exercise, not a slide.']
          ]} />
          <${Grow} />
          <${Talk} who="bug" flip=${true}>${t('I liked the black box better.', 'أنا كنت مرتاح أكتر في الـ black box.')}</${Talk}>
        `),

        // 31 · triangle problem
        page(html`
          <${H2}>${t('Coming up: the triangle problem', 'الجاي: الـ triangle problem')}</${H2}>
          <${P} small=${true}>${X('The lecture ends with an exercise: apply black box and white box to the triangle problem, showing <b>function testing</b>, <b>statement</b>, <b>branch or condition</b> and <b>path</b> coverage.',
            'المحاضرة بتخلص بتمرين: طبّق الـ black box والـ white box على الـ triangle problem، ووضّح الـ <b>function testing</b> والـ <b>statement</b> والـ <b>branch or condition</b> والـ <b>path</b> coverage.')}</${P}>
          <${Code} lines=${['read a,b,c;', 'type = "scalene";', 'if (a == b or a == c or b == c)', '  type = "isosceles";', 'if (a == b and a == c)', '  type = "equilateral";', 'if (a >= b+c or b >= a+c', '    or c >= a+b)', '  type = "not a triangle";', 'if (a <= 0 or b <= 0 or c <= 0)', '  type = "bad inputs";', 'print type']} />
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('You don\'t have to solve it now: it is solved in <b>Lecture 4</b>. For a head start, count the IFs and spot which ones use AND and which use OR.', 'مش لازم تحلّه دلوقتي: اتحل في <b>Lecture 4</b>. ولو عايز تسبق، عدّ الـ IFs وشوف مين فيهم AND ومين OR.')}</p></${Box}>
        `, { sec: t('Triangle problem', 'الـ Triangle problem') }),

        // 32–34 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the exam papers (the 2025/26 final, the summary MCQs and the 2026/27 midterm). Tap an answer to see why.", 'أسئلة حقيقية من الامتحانات (امتحان 2025/26 والـ summary MCQs وميدترم 2026/27). دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m1', /inspections come under/i)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Hint: think of the tree, not the siblings.', 'تلميح: فكّر في الشجرة، مش في الإخوات.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /which are <?b?>?not really mandatory/i)}
          ${mq('m3', /^Formal review, coding standards and guidelines, and code review are phases of/)}
        `),
        page(html`
          ${mq('m4', /^Adding long integers to short integers will cause:/)}
          <${Gap} h=${6} />
          ${mq('m5', /^if \(X&gt;1\) and \(Y=0\) then A=A\/X; if/)}
        `),

        // 35 · the last exam question
        page(html`
          ${mq('m6', /^The umbrella approach is a type of/)}
          <${Grow} />
          <${Hand} red=${true} tilt=${true}>${t('Six for six? Then the quiz at the end of the chapter is yours.', 'ست من ست؟ يبقى الـ quiz اللي في آخر الفصل بتاعك.')}</${Hand}>
          <${Talk} who="bug" flip=${true}>${t("I'll be hiding in Lecture 4's triangle.", 'أنا هستخبى في مثلث Lecture 4.')}</${Talk}>
        `),

        // 36 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>White-box</b> (أو glass أو structural أو clear box) بيختبر الـ paths والـ logic والـ loops والـ data structures.',
            'الـ <b>Static</b> فيه الـ formal review والـ standards and guidelines والـ code review checklist.',
            'الـ <b>Formal review</b> فيه الـ peer review والـ walkthrough (صاحب الـ code بيعرض) والـ inspection (حد غيره).',
            'الـ <b>Standards</b> إجبارية والـ guidelines لأ. أسبابهم الـ reliability والـ readability والـ portability.',
            'الـ <b>Checklist</b> فيها ست أنواع errors، منهم الـ computation زي long مع short.',
            'الـ <b>Dynamic</b> بيلاقي الـ bugs، والـ debugging بيصلّحها.',
            'الـ <b>Integration</b> فيه الـ bottom-up والـ top-down والـ umbrella.',
            'الـ <b>Code coverage</b> هي الـ statement والـ path والـ condition، وفي مثال الـ Date AND Time العدد <bdi dir="ltr">1 / 2 / 4</bdi>.'
          ] : [
            '<b>White-box</b> (glass, structural, open, clear box) tests paths, logic (true and false), loops at their boundaries and internal data structures.',
            '<b>Static</b>: formal review, coding standards and guidelines, code review checklist.',
            '<b>Formal review</b>: peer review, walkthrough (the author presents), inspection (someone else presents).',
            '<b>Standards</b> are mandatory; guidelines are not really mandatory. Reasons: reliability, readability/maintainability, portability.',
            '<b>Checklist</b>: data reference, data declaration, computation, comparison, control flow, input/output.',
            '<b>Dynamic</b>: a validation check that finds bugs; debugging fixes them.',
            '<b>Integration</b>: bottom-up, top-down, umbrella. Data coverage: data flow, sub-boundaries, error forcing.',
            '<b>Code coverage</b>: statement, path (branch), condition: 1 / 2 / 4 tests for Date AND Time.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 37 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="lens">${t('Next time: counting paths properly with cyclomatic complexity, and that triangle.', 'المرة الجاية: نعدّ الـ paths صح بالـ cyclomatic complexity، والمثلث ده.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [3], t: Date.now() } }}>${t('Quiz me on Lecture 3', 'امتحنّي في محاضرة 3')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 3, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 3, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

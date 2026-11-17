// Head First chapter for Software Quality Assurance Lecture 1 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Introduction to software testing: what testing is, Miller's goal and the six objectives, Gelperin and Hetzel's five eras,
// what a bug is and the five conditions (the calculator), the six bug types, the seven reasons, the cost of a bug by stage and the
// Patriot missile, the development models (Waterfall, Spiral, V, RAD, Agile with XP and TDD) and where testing sits in each,
// and the four maintenance types the 2026/27 midterm asked about (named on the page as the midterm's, not the slides').
// Every fact comes from the lecture's notes; analogies and tricks are marked as ours; ‡ marks the key the notes flag.
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-qa1')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa1';
    s.textContent = `
.hfb .hf-qa1-era{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; }
.hfb .hf-qa1-ery{ display:flex; gap:4px; padding:6px; background:var(--hf-grey); }
.hfb .hf-qa1-ery button{ flex:1 1 0; min-width:0; display:flex; flex-direction:column; align-items:center; gap:3px; padding:6px 0; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; font:600 13px/1 var(--body); }
.hfb .hf-qa1-ery button b{ font:800 14px/1 var(--mono); }
.hfb .hf-qa1-ery button.on{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qa1-ery button.past{ border-color:var(--hf-line); color:var(--ink); }
.hfb .hf-qa1-erp{ padding:9px 11px 4px; height:100px; display:flex; flex-direction:column; gap:5px; }
.hfb .hf-qa1-ero{ font:800 19px/1.15 var(--body); color:var(--hf-k); margin:0; }
.hfb .hf-qa1-bar{ display:flex; gap:8px; align-items:center; padding:0 10px 10px; }
.hfb .hf-qa1-bar .grow{ flex:1; }
.hfb .hf-qa1-dots{ display:flex; gap:5px; } .hfb .hf-qa1-dots i{ width:8px; height:8px; border-radius:50%; background:var(--hf-grey2); } .hfb .hf-qa1-dots i.on{ background:var(--hf-k); }
.hfb .hf-qa1-tabs{ display:flex; gap:5px; }
.hfb .hf-qa1-tabs button{ flex:1 1 0; min-width:0; min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:800 14px/1 var(--body); cursor:pointer; }
.hfb .hf-qa1-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qa1-cw{ display:flex; gap:12px; align-items:flex-start; }
.hfb .hf-qa1-ct{ flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:6px; height:232px; }
.hfb .hf-qa1-ct .hf-qa1-cn{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.07em; color:var(--hf-k); margin:0; }
.hfb .hf-qa1-calc{ flex:none; width:128px; border:2.5px solid var(--hf-line); border-radius:12px; padding:8px; background:var(--hf-grey); }
.hfb .hf-qa1-calc.shake{ animation:hf-qa1-shake .45s ease-in-out 3; }
@keyframes hf-qa1-shake{ 25%{ transform:translateX(-3px) rotate(-1deg); } 75%{ transform:translateX(3px) rotate(1deg); } }
.hfb .hf-qa1-disp{ height:36px; border:1.5px solid var(--hf-line); border-radius:5px; background:var(--paper); font:700 15px/34px var(--mono); text-align:right; padding:0 6px; color:var(--ink); white-space:nowrap; overflow:hidden; position:relative; }
.hfb .hf-qa1-disp.bad{ color:var(--hf-red); }
.hfb .hf-qa1-disp.flash{ animation:hf-qa1-flash .5s steps(2) infinite; }
@keyframes hf-qa1-flash{ 50%{ background:var(--hf-k); color:var(--paper); } }
.hfb .hf-qa1-disp .bat{ position:absolute; left:5px; top:11px; width:20px; height:11px; border:1.5px solid var(--hf-red); border-radius:2px; }
.hfb .hf-qa1-disp .bat::before{ content:""; position:absolute; left:1px; top:1px; bottom:1px; width:4px; background:var(--hf-red); }
.hfb .hf-qa1-disp .bat::after{ content:""; position:absolute; right:-4px; top:2.5px; width:2px; height:4px; background:var(--hf-red); }
.hfb .hf-qa1-keys{ display:grid; grid-template-columns:repeat(4,1fr); gap:4px; margin-top:6px; transition:gap .3s; }
.hfb .hf-qa1-keys span{ height:25px; border-radius:4px; border:1.5px solid var(--hf-line); background:var(--paper); display:grid; place-items:center; font:700 13px/1 var(--mono); color:var(--ink); position:relative; transition:height .3s; }
.hfb .hf-qa1-keys.dim span{ opacity:.35; }
.hfb .hf-qa1-keys span.dead{ color:var(--graphite); border-color:var(--hf-red); }
.hfb .hf-qa1-keys span.dead::after{ content:""; position:absolute; left:2px; right:2px; top:50%; height:2px; background:var(--hf-red); transform:rotate(-35deg); }
.hfb .hf-qa1-keys span.extra{ grid-column:span 4; border-color:var(--hf-hand); color:var(--hf-hand); box-shadow:0 0 0 2px var(--hf-hand); }
.hfb .hf-qa1-keys span.ghost{ visibility:hidden; grid-column:span 4; }
.hfb .hf-qa1-keys.tiny{ gap:10px 12px; padding:2px 3px; }
.hfb .hf-qa1-keys.tiny span{ height:16px; }
.hfb .hf-qa1-chips{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-qa1-chips span{ font:600 13.5px/1.2 var(--mono); border:1.5px solid var(--hf-line); border-radius:99px; padding:3px 9px; background:var(--paper); color:var(--ink); }
.hfb .hf-qa1-chips span:nth-child(3n+1){ border-color:var(--hf-k); }
.hfb .hf-qa1-chips span:nth-child(3n+2){ border-color:var(--hf-red); }
.hfb .hf-qa1-tb{ display:grid; grid-template-columns:auto 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-qa1-tb > span{ padding:5px 9px; font-size:14px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa1-tb > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-qa1-tb > span.h{ font:800 13px/1.3 var(--body); text-transform:uppercase; letter-spacing:.05em; background:var(--hf-line); color:var(--paper); }
.hfb .hf-qa1-tb > span.k{ font-weight:700; color:var(--hf-k); background:var(--hf-grey); white-space:nowrap; }
.hfb .hf-qa1-cost{ border:2px solid var(--hf-line); border-radius:8px; padding:9px 10px; }
.hfb .hf-qa1-bars{ display:flex; gap:6px; align-items:flex-end; height:122px; border-bottom:2px solid var(--hf-line); }
.hfb .hf-qa1-bars button{ flex:1 1 0; min-width:0; border:1.5px solid var(--hf-line); border-bottom:0; border-radius:5px 5px 0 0; background:var(--paper); cursor:pointer; padding:0; transition:background .3s, height .4s; }
.hfb .hf-qa1-bars button.f{ background:color-mix(in srgb, var(--hf-k) 30%, var(--paper)); }
.hfb .hf-qa1-bars button.on{ background:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-qa1-names{ display:flex; gap:6px; margin-top:5px; }
.hfb .hf-qa1-names span{ flex:1 1 0; min-width:0; text-align:center; font:700 13px/1.1 var(--body); color:var(--ink); }
.hfb .hf-qa1-names span.on{ color:var(--hf-red); }
.hfb .hf-qa1-cp{ height:96px; margin-top:8px; display:flex; flex-direction:column; gap:4px; }
.hfb .hf-qa1-cp .lv{ font:800 18px/1.15 var(--body); margin:0; color:var(--hf-k); }
.hfb .hf-qa1-cp .lv.hot{ color:var(--hf-red); }
.hfb .hf-qa1-tdd{ display:grid; gap:5px; }
.hfb .hf-qa1-tdd button{ display:flex; align-items:center; gap:9px; text-align:start; font:600 14px/1.25 var(--body); padding:6px 9px; min-height:40px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qa1-tdd button i{ flex:none; width:24px; height:24px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); font-style:normal; background:var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa1-tdd button.n i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-qa1-tdd button.ok{ border-color:var(--ok); } .hfb .hf-qa1-tdd button.no{ border-color:var(--hf-red); }
.hfb .hf-qa1-tdd button.ok i{ background:var(--ok); }
.hfb .hf-qa1-tdd button.no i{ background:var(--hf-red); color:var(--paper); }
.hfb .hf-qa1-s5 .hf-sort .ch{ gap:3px; }
.hfb .hf-qa1-s5 .hf-sort .ch button{ min-width:30px; }
.hfb .hf-qa1-quote{ border-left:5px solid var(--hf-k); padding:4px 0 4px 11px; font:italic 16px/1.4 var(--display); color:var(--ink); margin:0; }
.hfb .hf-qa1-ph{ display:grid; gap:4px; }
.hfb .hf-qa1-ph p{ margin:0; font-size:14px; line-height:1.32; color:var(--ink); padding:4px 9px; border-radius:6px; background:var(--hf-grey); }
.hfb .hf-qa1-ph p b{ color:var(--hf-k); font-weight:800; }
.hf-ar .hf-qa1-ery button, .hf-ar .hf-qa1-ero, .hf-ar .hf-qa1-tb > span, .hf-ar .hf-qa1-cp .lv, .hf-ar .hf-qa1-tdd button, .hf-ar .hf-qa1-ct .hf-qa1-cn, .hf-ar .hf-qa1-ph p, .hf-ar .hf-qa1-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-qa1-tb > span, .hf-ar .hf-qa1-ph p{ line-height:1.5; font-size:13.5px; }
.hf-ar .hf-qa1-tb > span{ line-height:1.42; padding:4px 8px; }
.hf-ar .hf-qa1-ero{ font-weight:700; font-size:18px; }
.hf-ar .hf-qa1-quote{ border-left:0; border-right:5px solid var(--hf-k); padding:4px 11px 4px 0; font-family:"IBM Plex Sans Arabic", var(--body); font-style:normal; font-size:15px; line-height:1.6; }
.hf-ar .hf-qa1-tdd button{ line-height:1.45; }
.hf-ar .hf-qa1-tb > span.k{ font-family:var(--body); }
@media (prefers-reduced-motion: reduce){ .hfb .hf-qa1-calc.shake, .hfb .hf-qa1-disp.flash{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // Gelperin and Hetzel's five eras of testing, as a timeline you can step through
  const ERAS = [
    { y: ['until', '1956'], ya: ['لحد', '1956'], o: 'Debugging-oriented', m: 'Testing meant <b>debugging</b>.', ma: 'الـ testing كان معناه <b>debugging</b> وبس.' },
    { y: ['1957', '1978'], ya: ['1957', '1978'], o: 'Demonstration-oriented', m: 'Testing set out to <b>ensure the software meets its specifications</b>.', ma: 'الـ testing هدفه <b>نتأكد إن الـ software ماشي على الـ specifications</b> بتاعته.' },
    { y: ['1979', '1982'], ya: ['1979', '1982'], o: 'Destruction-oriented', m: "Tests were designed <b>to find errors</b>. This is <b>Myers'</b> era.", ma: 'الـ tests بتتعمل <b>عشان تلاقي errors</b>. ده عصر <b>Myers</b>.' },
    { y: ['1983', '1987'], ya: ['1983', '1987'], o: 'Evaluation-oriented', m: 'Introduced <b>verification and validation</b>.', ma: 'دخّل الـ <b>verification والـ validation</b>.' },
    { y: ['1988', '2000'], ya: ['1988', '2000'], o: 'Prevention-oriented', m: '<b>Prevent defects</b> through early test design and planning.', ma: 'إننا <b>نمنع الـ defects</b> بالـ test design والـ planning بدري.' }
  ];
  function Eras() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('era', 0);
    const [play, setPlay] = useState(false);
    useEffect(() => { if (!play) return; if (i >= ERAS.length - 1) { setPlay(false); return; } const t = setTimeout(() => setI(i + 1), 2200); return () => clearTimeout(t); }, [play, i]);
    const e = ERAS[i], last = ERAS.length - 1;
    return html`<div className="hf-qa1-era hf-in">
      <div className="hf-qa1-ery" role="group" aria-label="Eras">${ERAS.map((x, j) => html`<button key=${j} className=${j === i ? 'on' : j < i ? 'past' : ''} aria-pressed=${String(j === i)} aria-label=${x.o} onClick=${() => { setPlay(false); setI(j); }}><span>${ar ? x.ya[0] : x.y[0]}</span><b>${x.y[1]}</b></button>`)}</div>
      <div className="hf-qa1-erp" key=${i}>
        <p className="hf-qa1-ero hf-in">${ar ? html`الـ <bdi>${e.o}</bdi>` : e.o}</p>
        <p className="hf-p small hf-in">${T(ar ? e.ma : e.m)}</p>
      </div>
      <div className="hf-qa1-bar">
        <button className="hf-btn solid" onClick=${() => { if (i >= last) setI(0); setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= last ? (ar ? 'شغّلها تاني' : 'Run it again') : (ar ? 'شغّل' : 'Play')}</button>
        <span className="grow"></span>
        <span className="hf-qa1-dots">${ERAS.map((_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  // the five bug conditions, shown on the lecture's own calculator
  const CONDS = [
    { en: 'The software does <b>not do</b> what the specification says it should.', ar: 'الـ software <b>مش بيعمل</b> اللي الـ specification بتقول إنه لازم يعمله.', ex: 'The <b>+</b> key does not work.', exa: 'زرار الـ <b>+</b> مش شغال.' },
    { en: 'The software does what the specification says it should <b>not</b> do (the opposite behaviour).', ar: 'الـ software بيعمل حاجة الـ specification بتقول إنه <b>مايعملهاش</b> (عكس المطلوب).', ex: 'The calculator crashes or freezes.', exa: 'الـ calculator بيعمل crash أو freeze.' },
    { en: 'The software does something the specification <b>does not mention</b>.', ar: 'الـ software بيعمل حاجة الـ specification <b>ماذكرتهاش أصلًا</b>.', ex: 'An extra "square" function that is not in the spec.', exa: 'فيه function زيادة اسمها <bdi dir="ltr">"square"</bdi> مش في الـ spec.' },
    { en: 'The software does not do something it <b>should (mandatory) do</b>, although the spec may not mention it.', ar: 'الـ software مش بيعمل حاجة <b>المفروض (لازم) يعملها</b>، حتى لو الـ spec ماذكرتهاش.', ex: 'Weak battery → wrong answers.', exa: 'البطارية ضعيفة، فالإجابات بتطلع غلط.' },
    { en: 'The software is <b>difficult to understand</b>, has cumbersome steps, or is <b>slow</b> (the customer\'s view).', ar: 'الـ software <b>صعب يتفهم</b>، أو خطواته معقدة، أو <b>بطيء</b> (من وجهة نظر العميل).', ex: 'Buttons too small, lights too flashy to read the answer.', exa: 'الزراير صغيرة قوي، والإضاءة مزغللة لدرجة إنك مش عارف تقرا الإجابة.' }
  ];
  function Calc() {
    const ar = useAr();
    const [c, setC] = H.K.useSlot('calc', 0);
    const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', 'C', '0', '=', '+'];
    const disp = ['2 ? 3 =', '2 + 3 =', '5²= 25', '2 + 2 = 5', '2 + 3 = 5'][c];
    const k = CONDS[c];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '9px' }}>
      <div className="hf-qa1-tabs" role="group" aria-label="Conditions">${CONDS.map((_, j) => html`<button key=${j} aria-pressed=${String(j === c)} onClick=${() => setC(j)}>${(ar ? 'رقم ' : '#') + (j + 1)}</button>`)}</div>
      <div className="hf-qa1-cw">
        <div key=${'c' + c} className=${'hf-qa1-calc' + (c === 1 && !calm() ? ' shake' : '')} dir="ltr" aria-label="The calculator">
          <div className=${'hf-qa1-disp' + (c === 1 || c === 3 ? ' bad' : '') + (c === 4 && !calm() ? ' flash' : '')}>${c === 3 && html`<i className="bat"></i>`}${c === 1 ? 'frozen' : disp}</div>
          <div className=${'hf-qa1-keys' + (c === 1 ? ' dim' : '') + (c === 4 ? ' tiny' : '')}>
            ${c === 2 ? html`<span className="extra">x²</span>` : html`<span className="ghost">x²</span>`}
            ${keys.map(x => html`<span key=${x} className=${c === 0 && x === '+' ? 'dead' : ''}>${x}</span>`)}</div>
        </div>
        <div className="hf-qa1-ct" key=${'t' + c}>
          <p className="hf-qa1-cn hf-in">${ar ? 'الـ condition رقم ' + (c + 1) : 'Condition ' + (c + 1)}</p>
          <p className="hf-p small hf-in">${T(ar ? k.ar : k.en)}</p>
          <p className="hf-hand hf-in">${T(ar ? k.exa : k.ex)}</p>
          ${c === 2 && html`<p className="hf-p small hf-in" style=${{ color: 'var(--hf-hand)' }}>${ar ? 'الزرار ده مش في الـ spec' : 'this key is not in the spec'}</p>`}
        </div>
      </div>
    </div>`;
  }

  // the cost of fixing a bug, by the stage where it is found
  const COST = [
    { s: 'Req.', n: 'Requirement', na: 'الـ Requirement stage', lv: 'low cost', lva: 'تكلفة قليلة', w: 'Easy to correct early errors.', wa: 'سهل نصلّح الـ errors بدري.', h: 14 },
    { s: 'Coding', n: 'Coding', na: 'الـ Coding stage', lv: 'moderate cost', lva: 'تكلفة متوسطة', w: 'The developer can fix it easily if it is caught early.', wa: 'الـ developer يقدر يصلّحها بسهولة لو اتمسكت بدري.', h: 28 },
    { s: 'Integ.', n: 'Integration', na: 'الـ Integration', lv: 'higher cost', lva: 'تكلفة أعلى', w: 'Now it needs the developer <b>and</b> engineers.', wa: 'دلوقتي محتاجة الـ developer <b>والـ</b> engineers.', h: 46 },
    { s: 'Testing', n: 'Testing', na: 'الـ Testing', lv: 'very costly', lva: 'مكلفة جدًا', w: 'Developers, engineers and managers, and the project is delayed.', wa: 'فيها developers وengineers وmanagers، والمشروع بيتأخر.', h: 70 },
    { s: 'Prod.', n: 'Production', na: 'الـ Production', lv: 'extremely costly', lva: 'مكلفة جدًا جدًا (extremely costly)', w: 'Reputation, and financial or legal penalties.', wa: 'السمعة، وغرامات مالية أو قانونية.', h: 100 }
  ];
  function Cost() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('cost', 0);
    const c = COST[i];
    return html`<div className="hf-qa1-cost hf-in">
      <div className="hf-qa1-bars" role="group" aria-label="Where the bug is found">${COST.map((x, j) => html`<button key=${j} className=${j === i ? 'on' : j < i ? 'f' : ''} style=${{ height: x.h + '%' }} aria-pressed=${String(j === i)} aria-label=${x.n} onClick=${() => setI(j)}></button>`)}</div>
      <div className="hf-qa1-names" aria-hidden="true">${COST.map((x, j) => html`<span key=${j} dir="ltr" className=${j === i ? 'on' : ''}>${x.s}</span>`)}</div>
      <div className="hf-qa1-cp" key=${i}>
        <p className="hf-p small hf-in">${ar ? html`لو لقيناها في ${T('<b>' + c.na + '</b>')}:` : html`Found at the <b>${c.n}</b> stage:`}</p>
        <p className=${'lv hf-in' + (i >= 3 ? ' hot' : '')}>${ar ? c.lva : c.lv}</p>
        <p className="hf-p small hf-in">${T(ar ? c.wa : c.w)}</p>
      </div>
    </div>`;
  }

  // TDD: tap the five steps in their order
  const TDD = [
    ['Create the test code', 'نكتب الـ test code الأول'],
    ['Write or modify the functional code', 'نكتب أو نعدّل الـ functional code'],
    ['Create additional tests', 'نعمل tests زيادة بـ inputs مختلفة'],
    ['Test the functional code', 'نختبر الـ functional code لحد ما كل الـ tests تعدّي'],
    ['Refactor the code', 'نعمل refactor للـ code']
  ];
  const SHUF = [3, 0, 4, 2, 1];
  function TddOrder() {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot('tdd', []);
    const [chk, setChk] = H.K.useSlot('tdd:c', false);
    const tap = k => { setChk(false); setSeq(seq.includes(k) ? seq.filter(x => x !== k) : seq.concat(k)); };
    const right = seq.filter((k, j) => k === j).length;
    return html`<div className="hf-in">
      <div className="hf-qa1-tdd">${SHUF.map(k => { const r = seq.indexOf(k), st = chk && r >= 0 ? (r === k ? ' ok' : ' no') : '';
        return html`<button key=${k} className=${(r >= 0 ? 'n' : '') + st} aria-pressed=${String(r >= 0)} onClick=${() => tap(k)}><i>${r >= 0 ? r + 1 : ''}</i><span>${ar ? TDD[k][1] : TDD[k][0]}</span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${seq.length < TDD.length} onClick=${() => setChk(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq([0, 1, 2, 3, 4]); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${chk && html`<span className="hf-score">${ar ? html`<bdi>${right} / 5</bdi> صح` : right + ' / 5 right'}</span>`}
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setChk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div></div>`;
  }

  H.chapters.qa[1] = {
    title: 'Introduction to Software Testing', kicker: 'Chapter 1', run: 'introduction to software testing',
    ar: { title: 'مقدمة عن الـ Software Testing', kicker: 'الفصل 1', run: 'مقدمة عن الـ software testing' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (the summary sheet and the 2026/27 midterm), with the site's Arabic whys
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[1] && window.AR.qa.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X(`We know what you're thinking: <i>"A whole chapter about finding mistakes?"</i> Your brain keeps what's surprising, visual and a bit emotional, so that's how this chapter is written. The facts are all from the doctors' slides.`,
            `عارفين إنت بتفكر في إيه: <i>"فصل كامل عن الغلطات؟"</i> مخك بيفتكر الحاجة اللي بتفاجئه واللي فيها صور ومشاعر، فالفصل مكتوب كده. بس كل المعلومات من سلايدز الدكاترة.`)}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" and the matching games are not optional. You answer right on the page.', '<b>حل التمارين.</b> "امسك القلم" وألعاب التوصيل مش اختياري. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, many taken from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، وكتير منها من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks an answer key that disagrees with the slides, and which one to trust.', 'معناها إن فيه key مختلف عن السلايدز، وبنقولك تصدّق مين.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات المكتوبة بخط الإيد واللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>Software Quality` : html`Chapter one<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Hide and Seek with Bugs', 'استغماية مع الـ Bugs')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('introduction to software testing', 'مقدمة عن الـ software testing')}</p></div>
          <${P}>${X('Somewhere in every program, a <b>bug</b> is hiding. Testing is the game of finding it <b>before the customer does</b>.', 'في كل برنامج فيه <b>bug</b> مستخبي في حتة. والـ testing هو لعبة إنك تلاقيه <b>قبل ما العميل يلاقيه</b>.')}</${P}>
          <${Talk} who="bug">${X('Find me early and I\'m cheap. Find me in <b>production</b> and I\'ll cost you a fortune.', 'لو لقيتني بدري هبقى رخيص. لو لقيتني في الـ <b>production</b> هكلّفك كتير أوي.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("That's why I don't wait for the last day. I'm part of the <b>whole life cycle</b>.", 'عشان كده أنا مش بستنى لآخر يوم. أنا جزء من <b>الـ life cycle كلها</b>.')}</${Talk}>
          <${P} small=${true}>${X('In this chapter: what testing is and how it grew up, the five ways to tell you have a bug, why bugs happen and what they cost, and the development models teams use, with where testing sits in each.',
            'في الفصل ده: يعني إيه testing واتطور إزاي، والـ 5 علامات اللي تقولك إن فيه bug، والـ bugs بتحصل ليه وبتكلّف قد إيه، والـ development models اللي الـ teams بتشتغل بيها، والـ testing مكانه فين في كل واحد.')}</${P}>
        `, { sec: t('Meet software testing', 'اتعرّف على الـ testing') }),

        // 2 · what is software testing
        page(html`
          <${H1}>${A ? 'يعني إيه software testing؟' : html`So what <i>is</i> software testing?`}</${H1}>
          <${Def}>${X('<b>Software testing</b> is an <b>incremental and iterative</b> process for detecting defects and verifying that a software system meets its specified requirements.',
            'الـ <b>software testing</b> هو process <b>incremental و iterative</b> بنكتشف بيها الـ defects ونتأكد إن الـ software system ماشي على الـ requirements المحددة.')}</${Def}>
          <${P} small=${true}>${X('It is an <b>integral part of the SDLC</b> (the software development life cycle) and identifies defects, flaws or errors in the application. It ensures <b>quality, reliability and user satisfaction</b>.',
            'هو <b>جزء أساسي من الـ SDLC</b>، وبيطلّع الـ defects والـ flaws والـ errors اللي في الـ application. بيضمن <b>الـ quality والـ reliability ورضا الـ user</b>.')}</${P}>
          <${Talk} who="lens" flip=${true}>${X('Not a one-time job at the very end: <b>incremental and iterative</b>. A bit more each time, round after round.', 'مش شغلانة مرة واحدة في الآخر: ده <b>incremental و iterative</b>. حتة زيادة كل مرة، ولفّة ورا لفّة.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Fill in the blank: <i>"Software testing is a(n) ……… process for detecting defects…"</i> The word is <b>incremental and iterative</b>.', 'كمّل الفراغ:<span class="ltr"><i>"Software testing is a(n) ……… process for detecting defects…"</i></span>الكلمة هي <b>incremental and iterative</b>.')}</p></${Box}>
        `),

        // 3 · Miller and the six objectives
        page(html`
          <${H2}>${t("Miller's goal, and six objectives", 'هدف Miller، والـ 6 objectives')}</${H2}>
          <p className="hf-qa1-quote hf-in">${X('"The general aim of testing is to <b>affirm the quality</b> of software systems by <b>systematically exercising</b> the software in <b>carefully controlled circumstances</b>."', '«الهدف العام من الـ testing هو إننا <b>نأكد الـ quality</b> بتاعة الـ software systems عن طريق إننا <b>نشغّل الـ software بشكل منظم (systematically)</b> في <b>ظروف متحكم فيها بعناية</b>».')}</p>
          <${P} small=${true}>${t('The six objectives of testing:', 'الـ 6 objectives بتوع الـ testing:')}</${P}>
          <${UL} items=${A ? [
            'نتأكد إن الـ solution بيحقق الـ <b>business requirements</b> (ثقة العميل)',
            'نمسك الـ bugs والـ errors والـ defects',
            'نتأكد إن الـ system <b>stable وجاهز</b> للاستخدام',
            'نحدد <b>نقط الضعف</b> (areas of weakness)',
            'نحدد <b>درجة الـ quality</b>',
            'نحدد الـ <b>user acceptability</b>'
          ] : [
            'Ensure the solution meets the <b>business requirements</b> (this enhances customer confidence)',
            'Catch bugs, errors and defects',
            'Ensure the system is <b>stable and ready</b> for use',
            'Identify <b>areas of weakness</b>',
            'Establish the <b>degree of quality</b>',
            'Determine <b>user acceptability</b>'
          ]} />
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('What the organization gets: it <b>saves time and money</b> (defects found early), a <b>stable product</b> with less downtime, and <b>satisfied customers</b>.', 'المكسب للـ organization: <b>وقت وفلوس</b> (الـ defects بتتلاقى بدري)، ومنتج <b>stable</b> بـ downtime أقل، و<b>عميل راضي</b>.')}</p></${Box}>
        `),

        // 4 · the five eras
        page(html`
          <${H1}>${t('Five eras of testing', 'الـ testing كبر على 5 مراحل')}</${H1}>
          <${P} small=${true}>${X('<b>Deve Gelperin and William C. Hetzel</b> classified software testing based on the <b>goals and phases of testing</b>.',
            'قسّموا <b>Deve Gelperin و William C. Hetzel</b> الـ software testing على حسب <b>الـ goals والـ phases بتاعة الـ testing</b>.')}</${P}>
          <${Eras} />
          <${Grow} />
          <${Hand}>${A ? html`حيلة من عندنا: الأسامي مترتبة أبجديًا!<span class="ltr"><b>Deb</b>ugging → <b>Dem</b>onstration → <b>Des</b>truction → <b>E</b>valuation → <b>P</b>revention</span>` : html`Trick (ours): the five names are in alphabetical order! <b>Deb</b>ugging, <b>Dem</b>onstration, <b>Des</b>truction, <b>E</b>valuation, <b>P</b>revention.`}</${Hand}>
        `, { sec: t('Five eras of testing', 'الـ 5 مراحل بتوع الـ testing') }),

        // 5 · eras: two of the doctors' questions, one with a ‡
        page(html`
          ${mq('m-prev', /1988–2000 followed a prevention/i)}
          <${Hand} red=${true}>${t("‡ the summary's key says False; the slide's table says True", '‡ الـ key قال False، وجدول السلايد بيقول True')}</${Hand}>
          ${mq('m-demo', /Demonstration-oriented testing was followed/i)}
        `),

        // 6 · what is a bug
        page(html`
          <${H1}>${t('Meet the bug', 'اتعرّف على الـ bug')}</${H1}>
          <${Def}>${X('A <b>bug</b> is an error in a program that may produce an incorrect or undesired result, or stop it from working correctly. In testing, a bug means <b>anything that affects quality</b>.',
            'الـ <b>bug</b> هو error في البرنامج ممكن يطلّع نتيجة غلط أو مش مطلوبة، أو يوقّفه إنه يشتغل صح. وفي الـ testing، الـ bug معناه <b>أي حاجة بتأثر على الـ quality</b>.')}</${Def}>
          <${P} small=${true}>${t('It answers to many other names:', 'وليه أسامي تانية كتير:')}</${P}>
          <div className="hf-qa1-chips hf-in" dir="ltr">${['defect', 'fault', 'problem', 'error', 'incident', 'anomaly', 'failure', 'variance', 'inconsistency'].map((w, i) => html`<span key=${w} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.2 + i * 0.1) + 's' }}>${w}</span>`)}</div>
          <${Grow} />
          <${Talk} who="bug">${t('Call me whatever you like. I answer to all nine.', 'سمّيني زي ما تحب. أنا برد على التسعة.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('And I need a rule for spotting you. The lecture gives me <b>five</b>.', 'وأنا محتاج قاعدة أعرفك بيها. المحاضرة إدّتني <b>خمسة</b>.')}</${Talk}>
        `, { sec: t('What is a bug?', 'يعني إيه bug؟') }),

        // 7 · five conditions on the calculator
        page(html`
          <${H2}>${t('Five ways to tell you have a bug', '5 علامات إن فيه bug')}</${H2}>
          <${P} small=${true}>${X("The lecture's test object: a <b>calculator</b> that should add, subtract, multiply and divide. Tap each condition and watch the calculator misbehave.",
            'الـ test object بتاع المحاضرة: <b>calculator</b> المفروض يعمل جمع وطرح وضرب وقسمة. دوس على كل condition واتفرج على الـ calculator وهو بيغلط.')}</${P}>
          <${Calc} />
          <${Grow} />
          <${Hand} red=${true}>${t('if any one of the five is true, a bug exists', 'لو أي واحدة من الخمسة دول حصلت، يبقى فيه bug')}</${Hand}>
        `),

        // 8 · condition 5 and dumb questions
        page(html`
          <${Box} kind="brain"><p className="hf-p small">${X("Condition 5 is the odd one out. The calculator gives the right answers. So why is it still a bug?", 'الـ condition 5 غريبة شوية. الـ calculator بيطلّع الإجابات صح. أمال ليه برضه bug؟')}</p></${Box}>
          <${P} small=${true}>${X("Because condition 5 brings the <b>customer perspective</b>: it occurs whenever the performance of the software is <b>not acceptable to the user</b>. That's where the <b>tester's feedback</b> matters: it brings out the negatives even before the product reaches the customer.",
            'لأن الـ condition 5 بتجيب <b>وجهة نظر العميل (customer perspective)</b>: بتحصل لما أداء الـ software <b>مايبقاش مقبول بالنسبة للـ user</b>. هنا <b>الـ feedback بتاع الـ tester</b> بيبقى مهم، لأنه بيطلّع العيوب حتى قبل ما المنتج يوصل للعميل.')}</${P}>
          <${Dumb} qa=${A ? [
            ['إزاي function زيادة تبقى bug؟ مش ده bonus؟', 'الـ condition 3 بتقول: أي حاجة الـ software بيعملها و<b>الـ spec ماذكرتهاش</b> تبقى bug. الـ <bdi dir="ltr">"square"</bdi> مش في الـ spec.'],
            ['والـ battery؟ الـ spec مقالتش حاجة عنها.', 'دي الـ condition 4: حاجة <b>لازم</b> الـ software يعملها حتى لو الـ spec ماذكرتهاش. الإجابات الصح دي حاجة mandatory.']
          ] : [
            ['How can an extra feature be a bug? Isn\'t it a bonus?', 'Condition 3: anything the software does that <b>the spec does not mention</b> is a bug. "Square" isn\'t in the spec.'],
            ['And the battery? The spec never mentions it.', 'That\'s condition 4: something the software <b>should (mandatory) do</b> even if the spec doesn\'t say so. Correct answers are mandatory.']
          ]} />
        `),

        // 9 · sort the conditions
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which condition is it? Tap <b>1</b> to <b>5</b> for each bug, then check.', 'أنهي condition دي؟ دوس من <b>1</b> لـ <b>5</b> لكل bug، وبعدين صحّح.')}</p></${Box}>
          <div className="hf-qa1-s5"><${Sort} id="conds" bins=${[1, 2, 3, 4, 5].map(n => [String(n), A ? 'الـ condition ' + n : 'condition ' + n])} items=${A ? [
            ['زرار الـ Save مش بيعمل حاجة، والـ spec بتقول إنه بيحفظ', 0],
            ['الـ spec بتقول متمسحش ملف من غير ما تسأل، وهو بيمسح على طول', 1],
            ['الـ calculator فيه function <bdi dir="ltr">"square"</bdi> مش في الـ spec', 2],
            ['البطارية ضعفت فالإجابات طلعت غلط، والـ spec مقالتش حاجة', 3],
            ['كل نتيجة بتاخد دقيقة عشان تظهر', 4],
            ['الـ calculator بيعمل freeze لما تدوس =', 1]
          ] : [
            ['The Save button does nothing, though the spec says it saves', 0],
            ['The spec says never delete without asking; it deletes at once', 1],
            ['The calculator has a "square" function not in the spec', 2],
            ['Wrong answers on a weak battery; the spec never mentions it', 3],
            ['Every result takes a minute to appear', 4],
            ['The calculator freezes when you press =', 1]
          ]} /></div>
        `),

        // 10 · six kinds of bugs
        page(html`
          <${H2}>${t('Six kinds of bugs', '6 أنواع من الـ bugs')}</${H2}>
          <${P} small=${true}>${X('Bugs are classified by the <b>kind of error</b> or the <b>reason for the error</b>:', 'بتتقسم على حسب <b>نوع الـ error</b> أو <b>سببه</b>:')}</${P}>
          <div className="hf-qa1-tb hf-in">
            <span className="h">${t('Bug type', 'النوع')}</span><span className="h">${t('Examples', 'أمثلة')}</span>
            ${(A ? [
              ['Conceptual', 'كتابة syntax غلط، وkeywords مكتوبة غلط، وdesign logic فيه عيب'],
              ['Math', 'القسمة على صفر، والـ overflow، وأخطاء التقريب'],
              ['Logical', 'الـ infinite loops، وlogic غلط، وconditions غلط'],
              ['Resource', 'الـ buffer overflow، والـ access violations، وvariables من غير initialize'],
              ['Co-programming', 'الـ deadlocks والـ race conditions ومشاكل الـ concurrency'],
              ['Team working', 'الـ documentation قديمة، وملفات مش متطابقة، وlinking غلط']
            ] : [
              ['Conceptual', 'Wrong syntax, misspelled keywords, flawed design logic'],
              ['Math', 'Divide-by-zero, overflow, rounding errors'],
              ['Logical', 'Infinite loops, wrong logic, incorrect conditions'],
              ['Resource', 'Buffer overflow, access violations, uninitialized variables'],
              ['Co-programming', 'Deadlocks, race conditions, concurrency issues'],
              ['Team working', 'Outdated documentation, mismatched files, incorrect linking']
            ]).map(([k, v]) => html`<${React.Fragment} key=${k}><span className="k">${k}</span><span>${T(v)}</span></${React.Fragment}>`)}
          </div>
          <${Hand} red=${true} arrow="up">${t('careful: wrong syntax and misspelled keywords are conceptual here, not logical', 'خلّي بالك: الـ syntax والـ keywords الغلط هنا conceptual، مش logical')}</${Hand}>
        `, { sec: t('Types of bugs', 'أنواع الـ bugs') }),

        // 11 · match the bug types
        page(html`
          <${H2}>${t('Name that bug', 'سمّي الـ bug ده')}</${H2}>
          <${P} small=${true}>${t('Tap a bug type, then the example that belongs to it.', 'دوس على نوع الـ bug، وبعدين على المثال اللي تبعه.')}</${P}>
          <${Match} id="types" left=${['Conceptual', 'Math', 'Logical', 'Resource', 'Co-programming', 'Team working']}
            right=${A ? ['اتنين threads واقفين مستنيين بعض للأبد (deadlock)', 'البرنامج مش بيعمل compile عشان keyword مكتوبة غلط', 'كل developer شغال على نسخة مختلفة من نفس الملف', 'المتوسط بيضرب لما العدد يبقى صفر', 'بيقرا بعد آخر الـ buffer وبيستخدم variable مش متعملها initialize', 'شرط الخروج من الـ loop غلط فمبتخلصش']
              : ['Two threads wait for each other forever (a deadlock)', 'It won\'t compile: a keyword is misspelled', 'Two developers use different versions of one file', 'An average crashes when the count is 0', 'Reads past a buffer\'s end and uses an uninitialized variable', 'A loop\'s exit condition is wrong, so it never ends']}
            answer=${[1, 3, 5, 4, 0, 2]} />
        `),

        // 12 · seven reasons
        page(html`
          <${H1}>${t('Why do bugs happen?', 'الـ bugs بتحصل ليه؟')}</${H1}>
          <${P} small=${true}>${t('The lecture lists seven reasons:', 'المحاضرة بتقول 7 أسباب:')}</${P}>
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>Human factor</b>: غلطات في الـ logic أو الـ syntax',
            'الـ <b>Communication failure</b> بين الـ teams',
            'الـ <b>Unrealistic development timeframe</b>: وقت مش واقعي',
            'الـ <b>Poor design logic</b>: research مش كفاية، أو فهم غلط للـ feasibility',
            'الـ <b>Poor coding practices</b>: طرق مش كفء و<b>tools فيها مشاكل</b>',
            'الـ <b>Lack of skilled testing</b>: testers مش ماهرين',
            'الـ <b>Change requests</b> في آخر لحظة'
          ] : [
            '<b>Human factor</b>: mistakes in logic or syntax',
            '<b>Communication failure</b> between teams',
            '<b>Unrealistic development timeframe</b>',
            '<b>Poor design logic</b>: inadequate research, misunderstood feasibility',
            '<b>Poor coding practices</b>: inefficient methods and <b>faulty tools</b>',
            '<b>Lack of skilled testing</b>',
            '<b>Change requests</b> at the last minute'
          ]).map((x, i) => html`<p key=${i} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.1 + i * 0.1) + 's' }}>${T(x)}</p>`)}</div>
          <${Grow} />
          <${Talk} who="bug">${t('Seven doors in, and I only need one of them open.', '7 أبواب أدخل منهم، وأنا محتاج باب واحد بس مفتوح.')}</${Talk}>
        `, { sec: t('Reasons and cost', 'الأسباب والتكلفة') }),

        // 13 · four explained, and a question
        page(html`
          <${H2}>${t('Four of them, explained', '4 منهم بالشرح')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Communication failure</b>: سوء التواصل بين الـ teams بيأدي لـ errors في الـ design أو الـ development.',
            'الـ <b>Unrealistic timeframe</b>: الـ deadlines الضيقة بتسبب design ضعيف وتنازلات في الـ testing.',
            'الـ <b>Lack of skilled testing</b>: الـ testers اللي مش ماهرين مش بيكتشفوا المشاكل المستخبية.',
            'الـ <b>Change requests</b>: تغيير الـ requirements أو الـ tools في آخر لحظة بيدخّل defects جديدة.'
          ] : [
            '<b>Communication failure</b>: miscommunication between teams leads to errors in design or development.',
            '<b>Unrealistic timeframe</b>: tight deadlines cause poor design and testing compromises.',
            '<b>Lack of skilled testing</b>: unskilled testers fail to detect hidden issues.',
            '<b>Change requests</b>: last-minute requirement or tool changes introduce new defects.'
          ]} />
          ${mq('m-human', /incorrect usage of logic or syntax/i)}
        `),

        // 14 · cost by stage
        page(html`
          <${H1}>${t('The later you find it, the more it costs', 'كل ما تلاقيه متأخر، كل ما يكلّف أكتر')}</${H1}>
          <${P} small=${true}>${t('The cost of fixing a bug depends on when it is found. Tap a bar to find the bug at that stage.', 'تكلفة تصليح الـ bug بتعتمد على إمتى لقيناه. دوس على أي عمود عشان تلاقي الـ bug في المرحلة دي.')}</${P}>
          <${Cost} />
          <${Hand}>${t('our drawing: the slide gives words, not numbers, so the bar heights only show the order', 'الرسمة من عندنا: السلايد بتقول كلام مش أرقام، فطول العواميد بيوضح الترتيب بس')}</${Hand}>
        `),

        // 15 · Patriot missile
        page(html`
          <${Box} kind="exam" title=${t('A real example', 'مثال حقيقي')}><p className="hf-p">${X('The <b>Patriot missile failure</b> in the <b>Gulf War, 1991</b>, was caused by a <b>timing bug</b> and led to the death of <b>28 soldiers</b>.', 'فشل الـ <b>Patriot missile</b> في <b>حرب الخليج سنة 1991</b> كان سببه <b>timing bug</b>، وأدى لموت <b>28 عسكري</b>.')}</p>
            <p className="hf-p small">${t('It is a real-world example of how a single software bug can have a catastrophic result.', 'ده مثال حقيقي على إن bug واحد بس في الـ software ممكن تكون نتيجته كارثية.')}</p></${Box}>
          <${P} small=${true}>${X('And the money: bugs hit the project\'s <b>timelines and cost</b>; the company may have to <b>compensate the customer</b> (money or a replacement), and its <b>reputation</b> can suffer.',
            'وكمان الفلوس: الـ bugs بتأثر على الـ <b>timelines والتكلفة</b>، والشركة ممكن <b>تعوّض العميل</b> (فلوس أو منتج بديل)، و<b>سمعتها</b> ممكن تتضر.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Why does the same bug cost more at testing than at coding? Count the people who have to get involved at each stage.', 'ليه نفس الـ bug بيكلّف في الـ testing أكتر من الـ coding؟ عِدّ الناس اللي لازم تدخل في كل مرحلة.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('"Fixing a bug found during integration is cheaper than during coding": <b>False</b>. Integration is <b>higher</b>; coding is <b>moderate</b>.', 'دي <b>غلط</b>، لأن الـ integration <b>أغلى</b> والـ coding <b>متوسط</b>:<span class="ltr">"Fixing a bug found during integration is cheaper than during coding"</span>')}</p></${Box}>
        `),

        // 16 · interview with the bug
        page(html`
          <${Interview} title=${t('The Bug, exposed', 'الـ Bug على المكشوف')} sub=${t("This week's interview: the guest every tester is looking for.", 'حوار الأسبوع: الضيف اللي كل tester بيدوّر عليه.')} lines=${A ? [
            ['المذيع', 'إنت ليك أسامي كتير.'],
            ['الـ Bug', 'أيوه: defect وfault وerror وfailure وanomaly وغيرهم. في الـ testing أنا <b>أي حاجة بتأثر على الـ quality</b>.'],
            ['المذيع', 'بتيجي منين؟'],
            ['الـ Bug', 'من غلطة <b>بشرية</b> في الـ logic أو الـ syntax، ومن <b>teams مش بتتكلم مع بعض</b>، ومن <b>deadlines ضيقة</b>، ومن <b>change requests في آخر لحظة</b>. دي المفضلة عندي.'],
            ['المذيع', 'إمتى بتخاف من الـ testers؟'],
            ['الـ Bug', 'في الـ <b>requirement stage</b>. لو اتمسكت هناك أبقى <b>رخيص</b> وسهل أتصلّح.'],
            ['المذيع', 'وإمتى بتبقى أخطر حاجة؟'],
            ['الـ Bug', 'في الـ <b>production</b>. ساعتها أبقى <b>extremely costly</b>: السمعة، وغرامات مالية أو قانونية.']
          ] : [
            ['Head First', 'You go by a lot of names.'],
            ['Bug', 'Defect, fault, error, failure, anomaly, and more. In testing I\'m <b>anything that affects quality</b>.'],
            ['Head First', 'Where do you come from?'],
            ['Bug', 'A <b>human</b> slip in logic or syntax, <b>teams that don\'t talk</b>, <b>tight deadlines</b>, and my favourite: <b>last-minute change requests</b>.'],
            ['Head First', 'When do you fear testers most?'],
            ['Bug', 'At the <b>requirement stage</b>. Caught there, I\'m <b>cheap</b> and easy to correct.'],
            ['Head First', 'And when are you most dangerous?'],
            ['Bug', 'In <b>production</b>. Then I\'m <b>extremely costly</b>: reputation, financial or legal penalties.']
          ]} />
          <${Grow} />
          <${Talk} who="bug" flip=${true}>${t('So, testers: start early. I mean it. Please don\'t.', 'فيا testers: ابدأوا بدري. بجد. لأ، بلاش.')}</${Talk}>
        `),

        // 17 · development models intro
        page(html`
          <${H1}>${t('How teams build software', 'الـ teams بتبني الـ software إزاي')}</${H1}>
          <${P} small=${true}>${X('The <b>software development life cycle</b> consists of several phases, from the project\'s conception to its completion. Different models are used depending on the project\'s requirements, and <b>the testing approach varies</b> with the nature of each model.',
            'الـ <b>software development life cycle</b> بيتكوّن من كذا phase، من أول فكرة المشروع لحد ما يخلص. فيه models مختلفة بنستخدمها على حسب الـ requirements بتاعة المشروع، و<b>طريقة الـ testing بتختلف</b> على حسب طبيعة كل model.')}</${P}>
          <div className="hf-qa1-chips hf-in" dir="ltr">${['Waterfall', 'V', 'Spiral', 'RAD', 'Prototyping', 'Agile'].map(w => html`<span key=${w}>${w}</span>`)}</div>
          <${Hand} arrow="up">${t('the models the lecture names; it walks through all but Prototyping', 'الـ models اللي المحاضرة ذكرتها؛ وبتشرحهم كلهم ما عدا الـ Prototyping')}</${Hand}>
          <${Grow} />
          <${Talk} who="lens">${t('Each model tests differently. Watch where I show up in each one.', 'كل model بيعمل testing بطريقته. خلّي بالك أنا بظهر فين في كل واحد.')}</${Talk}>
        `, { sec: t('Waterfall', 'الـ Waterfall') }),

        // 18 · waterfall
        page(html`
          <${H2}>${t('Waterfall: one step after another', 'الـ Waterfall: خطوة ورا خطوة')}</${H2}>
          <${P} small=${true}>${X('One of the <b>oldest</b> models, and <b>sequential</b>. It starts at the <b>system level</b> and flows down:', 'من <b>أقدم</b> الـ models، وهو <b>sequential</b>. بيبدأ من الـ <b>system level</b> وبينزل كده:')}</${P}>
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>System Engineering</b>: بيحدد الـ <b>software requirements والـ hardware requirements الاتنين</b>.',
            'الـ <b>Analysis</b>: الـ feasibility study والـ goals والـ performance والـ interface requirements.',
            'الـ <b>Design</b>: بيحوّل الـ requirements لـ software structure (زي الـ database design) عشان يوجّه الـ coding ويضمن الـ quality.',
            'الـ <b>Coding</b>: الـ developers بيكتبوا الـ code على أساس الـ design specifications.',
            'الـ <b>Testing</b>: بنكتشف الـ bugs ونتأكد إنه ماشي على الـ requirements.',
            'الـ <b>Maintenance</b>: بيصلّح المشاكل ويعمل update لما تظهر احتياجات جديدة.'
          ] : [
            '<b>System Engineering</b>: defines both <b>software and hardware requirements</b>.',
            '<b>Analysis</b>: feasibility study, goals, performance and interface requirements.',
            '<b>Design</b>: turns requirements into software structure (such as database design) to guide coding and ensure quality.',
            '<b>Coding</b>: developers write the code from the design specifications.',
            '<b>Testing</b>: detect bugs and verify the stated requirements are met.',
            '<b>Maintenance</b>: fixes issues and updates the software as new needs arise.'
          ]).map((x, i) => html`<p key=${i} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.1 + i * 0.12) + 's' }}>${T(x)}</p>`)}</div>
        `),

        // 19 · figure 1.1
        page(html`
          <${Fig} name="qa-waterfall" head=${t('Figure 1.1: the staircase', 'شكل 1.1: السلّم')} />
        `),

        // 20 · waterfall pros and cons
        page(html`
          <${H2}>${t('Simple… until something goes wrong early', 'بسيط… لحد ما حاجة تغلط بدري')}</${H2}>
          <${Box} kind="relax"><p className="hf-p small">${X('<b>Advantages</b>: simple, structured, clear documentation, early requirements, easy management.', '<b>المميزات</b>: بسيط، ومنظم (structured)، والـ documentation واضحة، والـ requirements بتتحدد بدري، وسهل في الإدارة.')}</p></${Box}>
          <${P} small=${true}>${X('<b>Drawback</b>: errors made in early phases can <b>carry over</b> to later stages, causing delays and increased costs, since problems must be <b>fixed at multiple points</b>.', '<b>العيب</b>: الـ errors اللي بتحصل في الـ phases الأولى ممكن <b>تنتقل</b> للمراحل اللي بعدها، فتسبب تأخير وتكلفة أعلى، لأن المشاكل لازم <b>تتصلح في أكتر من مكان</b>.')}</${P}>
          <${Talk} who="bug">${t('An error in Analysis? I ride it all the way down to Testing.', 'error في الـ Analysis؟ أنا بركب عليه لحد الـ Testing.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which Waterfall phase defines <b>both</b> software and hardware requirements?" <b>System Engineering</b>, the very first one. Not Analysis.', 'سؤال: أنهي phase بتحدد الـ software والـ hardware requirements <b>الاتنين</b>؟ الإجابة <b>System Engineering</b>، أول واحدة خالص، مش الـ Analysis.')}</p></${Box}>
        `),

        // 21 · waterfall in action
        page(html`
          <${Fig} name="qa-waterfall-flow" head=${t('Watch an early error flow downhill', 'اتفرج على error بدري وهو نازل')} />
        `),

        // 22 · spiral
        page(html`
          <${H1}>${t('Spiral: round and round, wider each time', 'الـ Spiral: لفّة ورا لفّة، وكل مرة أوسع')}</${H1}>
          <${P} small=${true}>${X('<b>Iterative</b>, and it overcomes Waterfall\'s limits. Four phases repeat in cycles <b>until all issues are resolved</b>, usually with <b>2 or 3 prototypes</b> before the final product. Each prototype goes through the <b>full cycle</b>.',
            'الـ Spiral <b>iterative</b>، وبيحل مشاكل الـ Waterfall. فيه 4 phases بتتكرر في cycles <b>لحد ما كل المشاكل تتحل</b>، وعادةً بيتعمل <b>2 أو 3 prototypes</b> قبل الـ final product. وكل prototype بيعدّي على <b>الـ cycle كلها</b>.')}</${P}>
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>Planning</b>: الـ specifications والـ objectives والـ constraints والـ strategies؛ وبنحلل البدائل ونحدد كل الـ risks المحتملة.',
            'الـ <b>Risk analysis</b>: بيحدد الـ risks ويقيّم حلول cost-effective.',
            'الـ <b>Design engineering</b>: الـ software الحقيقي بيتعمل بشكل iterative.',
            'الـ <b>Testing & evaluation</b>: العملاء بيختبروا ويدّوا feedback، وكل الـ phases بتركز عليه عشان تحل عيوب كل prototype.'
          ] : [
            '<b>Planning</b>: specifications, objectives, constraints and strategies; alternatives are analyzed and all possible risks identified.',
            '<b>Risk analysis</b>: identifies possible risks and evaluates cost-effective solutions.',
            '<b>Design engineering</b>: the actual software is developed iteratively.',
            '<b>Testing & evaluation</b> (customer evaluation): customers test and give feedback, which all phases use to fix each prototype\'s bugs.'
          ]).map((x, i) => html`<p key=${i}>${T(x)}</p>`)}</div>
        `, { sec: t('Spiral', 'الـ Spiral') }),

        // 23 · figure 1.2
        page(html`
          <${Fig} name="qa-spiral" head=${t('Figure 1.2: the Spiral Model, quadrant by quadrant', 'شكل 1.2: الـ Spiral Model، ربع ربع')} />
        `),

        // 24 · spiral pros and cons
        page(html`
          <${Box} kind="relax"><p className="hf-p small">${X('<b>Advantages</b>: manages risks early, flexible, customer feedback, prototyping, suits complex projects.', '<b>المميزات</b>: بيتعامل مع الـ risks بدري، ومرن (flexible)، وفيه customer feedback وprototyping، ومناسب للمشاريع المعقدة.')}</p></${Box}>
          <${P} small=${true}>${X('<b>Drawback</b>: the main drawback is the <b>amount of time taken to complete the iterations</b>, which can increase costs. Multiple iterations and <b>continuous testing</b> make it time-consuming and costly.', '<b>العيب</b>: العيب الأساسي هو <b>الوقت اللي بتاخده الـ iterations عشان تخلص</b>، وده ممكن يزوّد التكلفة. كتر الـ iterations والـ <b>continuous testing</b> بيخلّوه ياخد وقت ويبقى مكلف.')}</${P}>
          <${Dumb} qa=${A ? [
            ['أنهي phase بتيجي بعد الـ Planning على طول؟', 'الـ <b>Risk analysis</b>. الترتيب في كل cycle:<span class="ltr">Planning → Risk analysis → Design engineering → Testing & evaluation</span>'],
            ['مين اللي بيعمل الـ testing في الـ Spiral؟', 'في الـ Testing & evaluation <b>العملاء</b> بيختبروا المنتج، والـ phases بتركز على الـ feedback بتاعهم وبتاع الـ testing team.']
          ] : [
            ['Which phase comes right after Planning?', '<b>Risk analysis</b>. Each cycle: Planning → Risk analysis → Design engineering → Testing & evaluation.'],
            ['Who does the testing in Spiral?', 'In Testing & evaluation, <b>customers</b> test the product; the phases focus on feedback from the customer and the testing team.']
          ]} />
        `),

        // 25 · V-model
        page(html`
          <${H1}>${t('The V-Model: a test for every stage', 'الـ V-Model: test لكل stage')}</${H1}>
          <${P} small=${true}>${X('The V-Model integrates testing into <b>every stage</b> of the SDLC, with <b>early testing</b> starting from the requirements phase. Its <b>salient aspect</b>: it shows distinct testing levels and how each one addresses a different stage of the lifecycle.',
            'الـ V-Model بيدمج الـ testing في <b>كل stage</b> من الـ SDLC، والـ testing بيبدأ <b>بدري</b> من الـ requirements phase. <b>أهم ميزة (salient aspect)</b> فيه إنه بيوضح test levels منفصلة، وإزاي كل level بيغطي stage مختلفة.')}</${P}>
          <${UL} items=${A ? [
            '<b>الجنب الشمال</b> (نازل): الـ development، من الـ <b>high level</b> للـ <b>low level</b>.',
            '<b>الجنب اليمين</b> (طالع): الـ testing، من الـ <b>low level</b> للـ <b>high level</b>.'
          ] : [
            '<b>Left side</b> (down): development, <b>high level → low level</b>.',
            '<b>Right side</b> (up): testing, <b>low level → high level</b>.'
          ]} />
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>Unit</b>: كل module لوحده.',
            'الـ <b>Integration</b>: التفاعل بين الـ modules.',
            'الـ <b>System</b>: الـ system كله ماشي على الـ design والـ performance.',
            'الـ <b>Acceptance</b>: بيعمله <b>العميل</b> عشان يتأكد من الـ business requirements.'
          ] : [
            '<b>Unit</b>: individual modules.',
            '<b>Integration</b>: interactions between modules.',
            '<b>System</b>: the whole system meets design and performance.',
            '<b>Acceptance</b>: done by the <b>customer</b> to confirm the business requirements.'
          ]).map((x, i) => html`<p key=${i}>${T(x)}</p>`)}</div>
        `, { sec: t('V-Model', 'الـ V-Model') }),

        // 26 · figure 1.3
        page(html`
          <${Fig} name="qa-vmodel" head=${t('Figure 1.3: the V', 'شكل 1.3: حرف الـ V')} />
        `),

        // 27 · V details
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Don\'t flip the arrows! "Development goes from low level to high level, and testing from high level to low level": <b>False</b>. It\'s the other way round.', 'متقلبش الأسهم! دي <b>غلط</b>، والصح العكس:<span class="ltr">"Development goes from low level to high level, and testing from high level to low level"</span>')}</p></${Box}>
          <${P} small=${true}>${X('During the <b>unit design stage</b>, the individual programs or modules are specified, and the <b>test cases for unit testing</b> are developed from them. They check the actual program structure, or whether the software functions as the specification says.',
            'في الـ <b>unit design stage</b> بنحدد الـ programs أو الـ modules الفردية، وعلى أساسها بنعمل الـ <b>test cases بتاعة الـ unit testing</b>. بتشيّك على الـ program structure الحقيقي، أو إن الـ software شغال زي الـ specification.')}</${P}>
          <${Hand}>${X('the calculator again: test the code logic of the calculations, the memory per module, how modules are linked, and the overall efficiency', 'الـ calculator تاني: نختبر الـ code logic بتاع الحسابات، والـ memory لكل module، والـ modules مربوطة ببعض إزاي، والـ efficiency العامة')}</${Hand}>
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('<b>Advantage</b>: early verification and validation reduce defects and improve quality.<br/><b>Drawback</b>: less effective when requirements are incomplete or badly documented; not suitable for every project.', '<b>الميزة</b>: الـ verification والـ validation بدري بيقللوا الـ defects وبيحسّنوا الـ quality.<br/><b>العيب</b>: أقل فعالية لما الـ requirements تبقى ناقصة أو متوثقة وحش، ومش مناسب لكل المشاريع.')}</p></${Box}>
        `),

        // 28 · match the V
        page(html`
          <${P} small=${true}>${X('<b>Build the V.</b> Each stage on the left produces one plan. Tap a stage, then its plan.', '<b>ابني الـ V.</b> كل stage بتطلّع plan. دوس على الـ stage وبعدين الـ plan بتاعتها.')}</${P}>
          <${Match} id="vplan" left=${['Requirements specs', 'Functional specs', 'System design', 'Unit design']}
            right=${['Integration test plan', 'Test cases', 'Acceptance test plan', 'System test plan']} answer=${[2, 3, 0, 1]} />
          ${mq('m-vacc', /acceptance test plan developed/i)}
        `),

        // 29 · RAD
        page(html`
          <${H1}>${t('RAD: prototypes, fast', 'الـ RAD: prototypes بسرعة')}</${H1}>
          <${P} small=${true}>${X('<b>RAD</b> (Rapid Application Development) is built from <b>business</b>, <b>project-management</b> and <b>SRS</b> requirements. A prototype is matched against the requirements; if there is a <b>gap</b>, another prototype is built. It is <b>linear sequential</b>, with an <b>extremely short cycle</b> and <b>reusable components</b>.',
            'الـ <b>RAD</b> (Rapid Application Development) بيتبني من الـ <b>business</b> والـ <b>project-management</b> والـ <b>SRS</b> requirements. بنقارن الـ prototype بالـ requirements، ولو فيه <b>gap</b> بنعمل prototype تاني. هو <b>linear sequential</b> بـ <b>cycle قصيرة جدًا</b> و<b>reusable components</b>.')}</${P}>
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>Requirements planning</b>: نجمع الـ requirements ونعمل outline.',
            'الـ <b>Design</b>: نبني prototype فيه كل الـ requirements والتغييرات اللازمة.',
            'الـ <b>Construction</b>: نطوّر ونحسّن الـ prototypes بالـ RAD tools لحد ما العميل يرضى.',
            'الـ <b>Testing & handover</b>: الـ reusable components بتقلل وقت الـ testing قبل التسليم.'
          ] : [
            '<b>Requirements planning</b>: collect the requirements, create an outline.',
            '<b>Design</b>: build a prototype with all requirements and necessary changes.',
            '<b>Construction</b>: develop and improve prototypes with RAD tools until the customer is satisfied.',
            '<b>Testing & handover</b>: reusable components reduce testing time before delivery.'
          ]).map((x, i) => html`<p key=${i}>${T(x)}</p>`)}</div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Disadvantages</b>: a <b>missing reusable component</b> can make the project fail; only for <b>small, simple</b> projects.', '<b>العيوب</b>: لو <b>reusable component ناقص</b> ممكن المشروع يفشل، ومناسب بس للمشاريع <b>الصغيرة والبسيطة</b>.')}</p></${Box}>
        `, { sec: t('RAD', 'الـ RAD') }),

        // 30 · RAD in action
        page(html`
          <${Fig} name="qa-rad" head=${t('RAD in action: try removing a reusable component', 'الـ RAD وهو شغال: جرّب تشيل reusable component')} />
        `),

        // 31 · Agile
        page(html`
          <${H1}>${t('Agile: small, tested, often', 'الـ Agile: صغير، ومتختبر، وكتير')}</${H1}>
          <${P} small=${true}>${X('The <b>most widely used</b> model today. It is <b>incremental</b>: short cycles, small releases, <b>constant feedback</b>, and <b>continuous collaboration</b> of customers, developers and testers.',
            'الـ Agile هو <b>أكتر model مستخدم</b> النهارده. هو <b>incremental</b>: cycles قصيرة، وreleases صغيرة، و<b>feedback مستمر</b>، و<b>تعاون مستمر (continuous collaboration)</b> بين العملاء والـ developers والـ testers.')}</${P}>
          <${P} small=${true}>${X('Unlike sequential Waterfall or Spiral, it is designed for <b>complex projects with continuous changes</b>. Work is divided into small, testable parts; each release builds on the previous one and is <b>thoroughly tested</b> to fix bugs early.',
            'على عكس الـ Waterfall أو الـ Spiral، هو معمول لـ <b>المشاريع المعقدة اللي فيها تغييرات مستمرة</b>. الشغل بيتقسم لأجزاء صغيرة ينفع تتختبر، وكل release بيتبني على اللي قبله و<b>بيتختبر كويس</b> عشان الـ bugs تتصلح بدري.')}</${P}>
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>DSDM</b> اختصار لـ <bdi dir="ltr">Dynamic Systems Development Method</bdi>',
            'الـ <b>SCRUM</b>',
            'الـ <b>XP</b> اختصار لـ <bdi dir="ltr">Extreme Programming</bdi>، وهو الأشهر'
          ] : [
            '<b>DSDM</b>: Dynamic Systems Development Method',
            '<b>SCRUM</b>',
            '<b>XP</b>: Extreme Programming, the most popular'
          ]).map((x, i) => html`<p key=${i}>${T(x)}</p>`)}</div>
          <${Hand} arrow="up">${t("Agile's three approaches", 'الـ 3 approaches بتوع الـ Agile')}</${Hand}>
        `, { sec: t('Agile, XP and TDD', 'الـ Agile والـ XP والـ TDD') }),

        // 32 · Agile in action
        page(html`
          <${Fig} name="qa-agile" head=${t('Agile in action: short cycles, small releases', 'الـ Agile وهو شغال: cycles قصيرة وreleases صغيرة')} />
        `),

        // 33 · XP and TDD
        page(html`
          <${H2}>${t('XP: tests come first', 'الـ XP: الـ tests الأول')}</${H2}>
          <${P} small=${true}>${X('In <b>XP</b>, programmers work in <b>pairs</b>: one writes the code, the other reviews and tests it. Its main practice, <b>TDD</b> (test-driven development), writes the test cases <b>before</b> the code, to ensure quality and reduce errors.',
            'في الـ <b>XP</b> الـ programmers بيشتغلوا <b>pairs</b>: واحد بيكتب الـ code والتاني بيعمله review وtest. والـ practice الأساسي فيه هو الـ <b>TDD</b> (test-driven development)، وبيكتب الـ test cases <b>قبل</b> الـ code عشان يضمن الـ quality ويقلل الـ errors.')}</${P}>
          <${Box} kind="pencil" title=${t('Put TDD in order', 'رتّب الـ TDD')}><p className="hf-p small">${t('Tap the five steps in the order they happen.', 'دوس على الـ 5 steps بالترتيب اللي بيحصلوا بيه.')}</p></${Box}>
          <${TddOrder} />
        `),

        // 34 · figure 1.4
        page(html`
          <${Fig} name="qa-tdd" head=${t('Figure 1.4: the five TDD steps', 'شكل 1.4: الـ 5 steps بتوع الـ TDD')} />
        `),

        // 35 · agile pros and cons
        page(html`
          <${UL} items=${A ? [
            'خطوة <b>Create the test code</b>: الـ developer بيكتب automated test scripts بتحدد الـ software المفروض يعمل إيه.',
            'خطوة <b>Write or modify</b>: الـ code بيتكتب ويتعدل لحد ما يعدّي الـ tests.',
            'خطوة <b>Create additional tests</b>: الـ <b>tester</b> بيزوّد tests بـ inputs مختلفة على حسب تعقيد الـ module.',
            'خطوة <b>Test</b>: بنختبر تاني وتالت لحد ما كل الـ tests تعدّي (ده الـ loop).',
            'خطوة <b>Refactor</b>: بنشيل الـ code المتكرر أو اللي مش مستخدم، وبنقلل التعقيد.'
          ] : [
            '<b>Create the test code</b>: the developer writes automated test scripts that define what the software should do.',
            '<b>Write or modify</b>: the code is written and adjusted until it passes the tests.',
            '<b>Create additional tests</b>: the <b>tester</b> adds tests with different inputs, based on the module\'s complexity.',
            '<b>Test</b>: run them repeatedly until all pass (that\'s the loop).',
            '<b>Refactor</b>: remove duplicate or unused code and reduce complexity.'
          ]} />
          <${Box} kind="relax"><p className="hf-p small">${X('<b>Advantages</b>: flexible, feedback, fast delivery, better quality.<br/><b>Disadvantages</b>: needs <b>active customer involvement</b>, hard for <b>large teams</b>, <b>scope creep</b>.', '<b>المميزات</b>: مرن (flexible)، وفيه feedback، وتسليم سريع، والـ quality أحسن.<br/><b>العيوب</b>: محتاج <b>العميل يشارك بشكل فعّال</b>، وصعب مع الـ <b>teams الكبيرة</b>، والـ <b>scope creep</b>.')}</p></${Box}>
          <${Talk} who="lens" flip=${true}>${X('In Agile, <b>testers play a key role</b>: continuous testing and feedback.', 'في الـ Agile، <b>الـ testers ليهم دور أساسي</b>: testing وfeedback مستمرين.')}</${Talk}>
        `),

        // 36–37 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Waterfall and Agile argue about the right way to build software.", 'قعدة الليلة: الـ Waterfall والـ Agile بيتخانقوا مين طريقته أصح في بناء الـ software.')} />
          <${Chat} names=${[t('Waterfall', 'الـ Waterfall'), t('Agile', 'الـ Agile')]} lines=${A ? [
            [0, 'أنا من <b>أقدم</b> الـ models. ببدأ من الـ <b>system level</b> وبمشي phase ورا phase بالترتيب.'],
            [1, 'وأنا <b>أكتر model مستخدم</b> النهارده. بشتغل في <b>cycles قصيرة</b> وreleases صغيرة.'],
            [0, 'الناس بتحبني: أنا <b>بسيط ومنظم</b>، والـ <b>documentation واضحة</b>، والـ requirements بدري، وإدارتي سهلة.'],
            [1, 'لحد ما حاجة تغلط بدري. ساعتها الـ error <b>بينتقل</b> للمراحل اللي بعده ولازم يتصلح <b>في أكتر من مكان</b>.'],
            [0, 'تأخير وتكلفة، عارف. وإنت؟ أي تغيير بيلخبطك؟'],
            [1, 'خالص. أنا معمول لـ <b>المشاريع المعقدة اللي فيها تغييرات مستمرة</b>، وكل release <b>بيتختبر كويس</b>.']
          ] : [
            [0, "I'm one of the <b>oldest</b> models. I start at the <b>system level</b> and go phase after phase, in order."],
            [1, "And I'm the <b>most widely used</b> model today. I work in <b>short cycles</b> with small releases."],
            [0, "People like me: I'm <b>simple and structured</b>, with <b>clear documentation</b>, early requirements and easy management."],
            [1, 'Until something goes wrong early. Then the error <b>carries over</b> to later stages and must be <b>fixed at multiple points</b>.'],
            [0, 'Delays and costs, I know. And you? Doesn\'t every change throw you off?'],
            [1, "Not at all. I was designed for <b>complex projects with continuous changes</b>, and every release is <b>thoroughly tested</b>."]
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('Waterfall', 'الـ Waterfall'), t('Agile', 'الـ Agile')]} lines=${A ? [
            [0, 'شكلك بتعمل meetings كتير.'],
            [1, 'ده <b>continuous collaboration</b> بين العملاء والـ developers والـ testers. كده الـ requirements بتتحقق بدقة.'],
            [0, 'يعني محتاج العميل جنبك على طول.'],
            [1, 'صح. محتاج <b>العميل يشارك بشكل فعّال</b>، وصعب عليّا الـ <b>teams الكبيرة</b>، ولازم آخد بالي من الـ <b>scope creep</b>.'],
            [1, 'برضه الخلاصة بتقول إني <b>أكتر model متطور وكفء</b>.'],
            [0, '…وأنا لسه <b>sequential</b>. لازم حد يبقى كده.']
          ] : [
            [0, 'Sounds like a lot of meetings.'],
            [1, "It's <b>continuous collaboration</b> of customers, developers and testers, so requirements are met accurately."],
            [0, 'So you need the customer around all the time.'],
            [1, 'True. I need <b>active customer involvement</b>, I\'m hard for <b>large teams</b>, and I must watch out for <b>scope creep</b>.'],
            [1, 'Still, the summary calls me the <b>most advanced and efficient</b> model.'],
            [0, '…I\'m still <b>sequential</b>. Somebody has to be.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Waterfall is the most advanced and efficient model": <b>False</b>. That\'s <b>Agile</b>.', 'دي <b>غلط</b>، لأن اللقب ده بتاع الـ <b>Agile</b>:<span class="ltr">"Waterfall is the most advanced and efficient model"</span>')}</p></${Box}>
        `),

        // 38 · comparing the models
        page(html`
          <${Fig} name="qa-models-compare" head=${t('Where testing happens in each model', 'الـ testing بيحصل فين في كل model')} />
        `, { sec: t('Comparing the models', 'مقارنة الـ models') }),

        // 39 · the summary
        page(html`
          <${H2}>${t("The lecture's summary of the models", 'خلاصة المحاضرة عن الـ models')}</${H2}>
          <${UL} items=${A ? [
            'الـ Waterfall <b>sequential</b>.',
            'الـ <b>V والـ Spiral</b> بيستخدموا الـ testing كجزء أساسي، فهما <b>أكفأ من الـ waterfall</b>.',
            'الـ Agile بيتعتبر <b>أكتر نوع متطور وكفء</b> (most advanced and efficient).',
            'الـ <b>XP</b> طريقة مبنية على الـ agile model، وبتستخدم الـ <b>TDD</b> عشان تطلّع software كفء جدًا.'
          ] : [
            'Waterfall is <b>sequential</b>.',
            '<b>V and Spiral</b> use testing as an integral part, so they are <b>more efficient than waterfall</b>.',
            'Agile is considered the <b>most advanced and efficient</b> model.',
            '<b>XP</b> was developed based on the agile model and uses <b>TDD</b> to develop highly efficient software.'
          ]} />
          <${P} small=${true}>${X('And of testing as a whole: it demonstrates that a program performs its intended functions correctly; its goal is to ensure the product is <b>error free</b>, and <b>detecting bugs</b> is its most important part.',
            'وعن الـ testing كله: هو بيوضح إن البرنامج بيعمل الـ functions المطلوبة صح، وهدفه إننا نضمن إن المنتج <b>error free</b>، و<b>اكتشاف الـ bugs</b> هو أهم جزء فيه.')}</${P}>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Rank them by how much I\'m involved: Waterfall last, <b>V and Spiral</b> next, <b>Agile</b> on top.', 'رتّبهم على حسب أنا داخل فيهم قد إيه: الـ Waterfall الأخير، وبعده <b>الـ V والـ Spiral</b>، والـ <b>Agile</b> فوق.')}</${Talk}>
        `),

        // 40 · sort the models
        page(html`
          <${Box} kind="pencil" title=${t('Which model?', 'أنهي model؟')}><p className="hf-p small">${X('<b>W</b>aterfall, <b>S</b>piral, <b>V</b>-Model, <b>R</b>AD or <b>A</b>gile? Tap one for each.', 'الـ Waterfall ولا الـ Spiral ولا الـ V ولا الـ RAD ولا الـ Agile؟ دوس على حرف لكل جملة.')}</p></${Box}>
          <div className="hf-qa1-s5"><${Sort} id="models" bins=${[['W', 'Waterfall'], ['S', 'Spiral'], ['V', 'V-Model'], ['R', 'RAD'], ['A', 'Agile']]} items=${A ? [
            ['بيبدأ من الـ system level', 0],
            ['فيه Risk analysis في كل cycle', 1],
            ['عادةً 2 أو 3 prototypes', 1],
            ['الـ acceptance test plan بيتكتب مع الـ requirements', 2],
            ['بيفشل لو reusable component ناقص', 3],
            ['أكتر model مستخدم النهارده', 4],
            ['الـ approaches بتاعته DSDM وSCRUM وXP', 4]
          ] : [
            'Starts at the system level',
            'Has a Risk analysis in every cycle',
            'Usually 2 or 3 prototypes',
            'Acceptance test plan written with the requirements',
            'Fails if a reusable component is missing',
            'The most widely used model today',
            'Its approaches: DSDM, SCRUM, XP'
          ].map((x, i) => [x, [0, 1, 1, 2, 3, 4, 4][i]])} /></div>
        `),

        // 41 · maintenance, as the midterm asks it
        page(html`
          <${H2}>${t('Maintenance, the way the midterm asks it', 'الـ Maintenance زي ما الميدترم بيسأل فيها')}</${H2}>
          <${P} small=${true}>${X("The slides give maintenance one line: the last Waterfall phase, which <b>fixes issues and updates the software as new needs arise</b>. The 2026/27 midterm asked six questions on it, so here are its four types as those answers give them (the standard definitions, ISO/IEC 14764, not the slides'):",
            'السلايدز قالت سطر واحد عن الـ maintenance: آخر phase في الـ Waterfall، و<b>بيصلّح المشاكل ويعمل update لما تظهر احتياجات جديدة</b>. بس ميدترم <bdi dir="ltr">2026/27</bdi> سأل فيها 6 أسئلة، فدي أنواعها الأربعة زي ما الإجابات بتقول (التعريفات المعروفة، مش من السلايدز):')}</${P}>
          <div className="hf-qa1-ph hf-in">${(A ? [
            'الـ <b>Corrective</b>: بيصلّح الـ bugs والـ errors اللي ظهرت بعد الـ release.',
            'الـ <b>Adaptive</b>: بيخلّي الـ software يفضل شغال في بيئة اتغيرت، زي version جديدة من الـ OS أو hardware جديد.',
            'الـ <b>Perfective</b>: بيحسّن software شغال أصلًا، يعني performance وسرعة أو features جديدة.',
            'الـ <b>Preventive</b>: بيكتشف ويصلّح الـ latent faults قبل ما تبقى errors حقيقية.'
          ] : [
            '<b>Corrective</b>: fixes bugs and errors discovered after release.',
            '<b>Adaptive</b>: keeps it working in a changed environment, such as a new OS version or new hardware.',
            '<b>Perfective</b>: improves software that already works: performance, speed, new features.',
            '<b>Preventive</b>: detects and corrects latent faults before they become actual errors.'
          ]).map((x, i) => html`<p key=${i}>${T(x)}</p>`)}</div>
        `, { sec: t('Maintenance (midterm)', 'الـ Maintenance (الميدترم)') }),

        // 42 · match maintenance
        page(html`
          <${H2}>${t('Which maintenance?', 'أنهي maintenance؟')}</${H2}>
          <${P} small=${true}>${t('Tap a type, then the job it does.', 'دوس على النوع، وبعدين على الشغلانة بتاعته.')}</${P}>
          <${Match} id="maint" left=${['Corrective', 'Adaptive', 'Perfective', 'Preventive']}
            right=${A ? ['نخلّي الـ app يشتغل على version جديدة من الـ OS', 'نصلّح crash بلّغ عنه الـ users بعد الـ release', 'نصلّح latent fault قبل ما يعمل أي مشكلة', 'نسرّع الـ app ونزوّد feature الـ users طلبوها']
              : ['Make the app work on a new OS version', 'Fix a crash users reported after release', 'Fix a latent fault before it ever fails', 'Make it faster, add a feature users asked for']}
            answer=${[1, 0, 3, 2]} />
        `),

        // 43–46 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' 2026/27 midterm, all on maintenance. Tap an answer to see why.", 'أسئلة حقيقية من ميدترم الدكاترة 2026/27، وكلها عن الـ maintenance. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m-corr', /fix bugs and errors discovered after/i)}
          <${Grow} />
          <${Talk} who="bug">${t('Found after release? That\'s me, and corrective maintenance is coming for me.', 'اتلقيت بعد الـ release؟ يبقى أنا، والـ corrective maintenance جاية ورايا.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-adapt', /compatible with a new version of an operating system/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('a changed environment (a new OS, new hardware) means adaptive', 'بيئة اتغيرت (OS جديد أو hardware جديد) يبقى adaptive')}</${Hand}>
        `),
        page(html`
          ${mq('m-perf', /Perfective maintenance is mainly concerned/i)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Perfective improves software that already works. Nothing is broken.', 'الـ perfective بيحسّن software شغال أصلًا. مفيش حاجة بايظة.')}</${Talk}>
        `),
        page(html`
          <${Box} kind="watch" title=${t('Watch it: two answers ‡', 'خلّي بالك: إجابتين ‡')}><p className="hf-p small">${X("The options below are maintenance types. ‡ The midterm's key says <b>Preventive</b>; the standard sources (Lientz and Swanson) and this site say <b>Perfective</b>, about 50–60% of maintenance effort (preventive is about 4%).",
            'الاختيارات تحت دي أنواع maintenance. ‡ الـ key بتاع الميدترم بيقول <b>Preventive</b>، بس المصادر المعروفة (Lientz وSwanson) والموقع بيقولوا <b>Perfective</b>، حوالي <bdi dir="ltr">50–60%</bdi> من مجهود الـ maintenance (والـ preventive حوالي <bdi dir="ltr">4%</bdi>).')}</p></${Box}>
          ${mq('m-cost', /maximum cost and effort/i)}
        `),

        // 46 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ testing هو process <b>incremental و iterative</b>، وجزء أساسي من الـ SDLC. هدف Miller: <b>نأكد الـ quality</b>.',
            'الـ 5 مراحل بالترتيب:<span class="ltr">Debugging → Demonstration → Destruction → Evaluation → Prevention</span>',
            'الـ bug هو أي حاجة بتأثر على الـ quality، وليه <b>5 conditions</b> (الـ calculator).',
            'الـ 6 أنواع: conceptual وmath وlogical وresource وco-programming وteam working.',
            'الـ 7 أسباب، وأولهم الـ <b>human factor</b> (logic أو syntax).',
            'التكلفة بتزيد:<span class="ltr">requirement → coding → integration → testing → production</span>',
            'الـ Waterfall sequential؛ والـ <b>V والـ Spiral</b> أكفأ؛ والـ <b>Agile</b> الأكفأ، والـ XP بيستخدم الـ TDD (الـ tests قبل الـ code).'

          ] : [
            'Testing is <b>incremental and iterative</b> and an integral part of the SDLC. Miller: <b>affirm the quality</b>.',
            'Five eras: Debugging → Demonstration → Destruction → Evaluation → Prevention.',
            'A bug is anything that affects quality; <b>five conditions</b> say one exists (the calculator).',
            'Six types: conceptual, math, logical, resource, co-programming, team working.',
            'Seven reasons, starting with the <b>human factor</b> (logic or syntax).',
            'Cost rises: requirement → coding → integration → testing → production.',
            'Waterfall is sequential; <b>V and Spiral</b> are more efficient; <b>Agile</b> is the most efficient, and XP uses TDD (tests before code).'

          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 47 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="lens">${t('Next time: black box testing. I\'ll find you without even looking inside.', 'المرة الجاية: الـ black box testing. هلاقيك من غير ما أبص جوّه أصلًا.')}</${Talk}>
            <${Talk} who="bug" flip=${true}>${t("I'll be hiding.", 'وأنا هستخبى.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1], t: Date.now() } }}>${t('Quiz me on Lecture 1', 'امتحنّي في محاضرة 1')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 1, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 1, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

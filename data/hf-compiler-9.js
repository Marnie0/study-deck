// Head First chapter for Compiler Design Lecture 9 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Runtime environment, parameter passing and code optimization: the course's last lecture. Every fact comes from the lecture's
// notes; analogies and jokes are marked as ours. Every traced output was traced by hand twice and matches the notes' table.
// lectures: [9]
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-cc9')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc9';
    s.textContent = `
.hfb .hf-c9-code .hf-code{ font-size:13px; padding:6px 7px; }
.hfb .hf-c9-tr{ border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; background:var(--paper); }
.hfb .hf-c9-tr .hf-c9-hd, .hfb .hf-c9-tr .hf-c9-rw{ display:grid; grid-template-columns:1.5fr .75fr 1fr .95fr .5fr; }
.hfb .hf-c9-tr .hf-c9-hd > span{ font:800 13px/1.1 var(--body); padding:5px 6px; background:var(--hf-grey); border-bottom:1.5px solid var(--hf-line); color:var(--ink); }
.hfb .hf-c9-tr .hf-c9-rw > *{ font:600 13.5px/1.2 var(--mono); padding:4px 6px; border-bottom:1px dotted var(--line); color:var(--ink); white-space:nowrap; }
.hfb .hf-c9-tr .hf-c9-rw:last-child > *{ border-bottom:0; }
.hfb .hf-c9-tr .hf-c9-rw > code{ color:var(--hf-k); background:none; }
.hfb .hf-c9-tr .hf-c9-rw{ animation:hf-up .45s both; }
.hfb .hf-c9-tr .hf-c9-rw.hf-c9-hot > *{ background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-c9-tr .hf-c9-rw.hf-c9-hot > span{ font-weight:800; }
.hfb .hf-c9-out{ display:grid; gap:3px; }
.hfb .hf-c9-out > div{ display:flex; align-items:baseline; gap:8px; font:600 13.5px/1.3 var(--body); color:var(--graphite); }
.hfb .hf-c9-out > div > span{ min-width:96px; }
.hfb .hf-c9-out code{ font:700 14.5px/1.3 var(--mono); color:var(--ink); background:var(--hf-grey); padding:1px 6px; border-radius:4px; direction:ltr; unicode-bidi:isolate; }
.hfb .hf-c9-out > div.hf-c9-key code{ background:color-mix(in srgb, var(--hf-k) 18%, var(--paper)); }
.hfb .hf-c9-mt{ display:grid; grid-template-columns:1.2fr 1fr 1.2fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-c9-mt > span{ font:500 13.5px/1.28 var(--body); padding:5px 6px; border-bottom:1px dotted var(--line); color:var(--ink); }
.hfb .hf-c9-mt > span.hf-c9-h{ font-weight:800; background:var(--hf-grey); border-bottom:1.5px solid var(--hf-line); }
.hfb .hf-c9-mt > span.hf-c9-m{ font-weight:800; color:var(--hf-k); }
.hfb .hf-c9-mt bdi{ white-space:nowrap; }
.hfb .hf-c9-mt > span.hf-c9-w{ grid-column:span 2; font-style:italic; }
.hfb .hf-c9-mt > span.hf-c9-last{ border-bottom:0; }
.hfb .hf-c9-pi{ display:grid; gap:8px; }
.hfb .hf-c9-pi .hf-c9-tabs{ display:grid; grid-template-columns:repeat(4, 1fr); gap:4px; }
.hfb .hf-c9-pi .hf-c9-tabs button{ font:700 12.5px/1.1 var(--body); min-height:36px; padding:3px 2px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-c9-pi .hf-c9-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-c9-pi .hf-c9-tabs button.hf-c9-ok::after{ content:" ✓"; color:var(--ok); }
.hfb .hf-c9-pi .hf-c9-tabs button[aria-pressed="true"].hf-c9-ok::after{ color:var(--paper); }
.hfb .hf-c9-pi .hf-c9-cells{ display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; }
.hfb .hf-c9-pi .hf-c9-cell{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 3px 6px; display:grid; justify-items:center; gap:3px; background:var(--paper); }
.hfb .hf-c9-pi .hf-c9-cell.hf-c9-ok{ border-color:var(--ok); box-shadow:0 0 0 2px color-mix(in srgb, var(--ok) 35%, transparent); }
.hfb .hf-c9-pi .hf-c9-cell.hf-c9-no{ border-color:var(--hf-red); box-shadow:0 0 0 2px color-mix(in srgb, var(--hf-red) 30%, transparent); }
.hfb .hf-c9-pi .hf-c9-cell .hf-c9-nm{ font:700 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-c9-pi .hf-c9-cell .hf-c9-val{ font:800 24px/1 var(--mono); color:var(--ink); }
.hfb .hf-c9-pi .hf-c9-cell .hf-c9-bt{ display:flex; gap:4px; }
.hfb .hf-c9-pi .hf-c9-cell .hf-c9-bt button{ width:32px; height:30px; padding:0; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); font:700 17px/1 var(--body); cursor:pointer; }
.hfb .hf-c9-pi .hf-c9-lbl{ font:600 13.5px/1.2 var(--body); color:var(--graphite); margin:0; }
.hfb .hf-c9-pi .hf-c9-bar{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.hfb code.hf-c9-nw{ white-space:nowrap; }
.hfb .hf-c9-x code, .hfb .hf-c9-x2 code{ font-family:var(--mono); font-size:.88em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb.hf-ar .hf-c9-mt > span, .hfb.hf-ar .hf-c9-out > div, .hfb.hf-ar .hf-c9-tr .hf-c9-hd > span, .hfb.hf-ar .hf-c9-pi .hf-c9-lbl{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb.hf-ar .hf-c9-mt > span{ font-size:13px; line-height:1.45; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-c9-tr .hf-c9-rw{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // a step-by-step trace of concentrate(i, a[i]) under one passing mode: one row per statement
  function Trace({ rows }) {
    const ar = useAr();
    return html`<div className="hf-c9-tr hf-in" dir="ltr" role="table" aria-label="Trace">
      <div className="hf-c9-hd" role="row"><span>${ar ? 'الخطوة' : 'step'}</span><span>j</span><span>x</span><span>a</span><span>i</span></div>
      ${rows.map((r, k) => html`<div key=${k} role="row" className=${'hf-c9-rw' + (r[5] ? ' hf-c9-hot' : '')} style=${{ animationDelay: calm() ? '0s' : (0.15 + k * 0.18) + 's' }}><code>${r[0]}</code><span>${r[1]}</span><span>${r[2]}</span><span>${r[3]}</span><span>${r[4]}</span></div>`)}
    </div>`;
  }
  // what the program prints: before the call, inside the procedure, after the call
  function Out({ lines }) {
    const ar = useAr();
    const lab = ar ? ['الـ main قبل', 'جوّه الـ procedure', 'الـ main بعد'] : ['main, before', 'inside', 'main, after'];
    return html`<div className="hf-c9-out hf-in">${lines.map((v, k) => html`<div key=${k} className=${k === 2 ? 'hf-c9-key' : ''}><span>${lab[k]}</span><code>${v}</code></div>`)}</div>`;
  }

  // the four modes side by side: what happens at the call and at return
  function ModeTable() {
    const ar = useAr();
    const R = ar ? [
      ['الطريقة', 'وقت الـ call', 'وقت الـ return'],
      ['الـ by value', 'نسخة ✓', 'ولا حاجة ✗'],
      ['الـ by result', 'ولا حاجة، والـ formals بتبدأ بـ 0', 'نسخة ✓'],
      ['الـ <bdi>by value-result</bdi>', 'نسخة ✓', 'نسخة ✓ على العناوين اللي اتثبتت وقت الـ call'],
      ['الـ <bdi>by reference</bdi>', 'مفيش نسخ خالص: الـ formals هي alias للـ actuals', null]
    ] : [
      ['mode', 'at the call', 'at return'],
      ['by value', 'copy in ✓', 'nothing ✗'],
      ['by result', 'nothing (formals start as 0)', 'copy back ✓'],
      ['<bdi>by value-result</bdi>', 'copy in ✓', 'copy back ✓ (to the addresses fixed at the call)'],
      ['by reference', 'no copies at all: the formals are aliases of the actuals', null]
    ];
    const cells = [];
    R.forEach((r, k) => {
      const last = k === R.length - 1 ? ' hf-c9-last' : '';
      if (k === 0) { r.forEach((c, j) => cells.push(html`<span key=${'h' + j} className="hf-c9-h">${c}</span>`)); return; }
      cells.push(html`<span key=${k + 'm'} className=${'hf-c9-m' + last}>${H.K.T(r[0])}</span>`);
      if (r[2] == null) cells.push(html`<span key=${k + 'w'} className=${'hf-c9-w' + last}>${r[1]}</span>`);
      else { cells.push(html`<span key=${k + 'a'} className=${last.trim()}>${r[1]}</span>`); cells.push(html`<span key=${k + 'b'} className=${last.trim()}>${r[2]}</span>`); }
    });
    return html`<div className="hf-c9-mt hf-in">${cells}</div>`;
  }

  // Sharpen your pencil: new data, predict what main prints after the call under each mode
  // a = (5,6,7), i = 3, concentrate(i, a[3]); traced by hand twice:
  //   value: j=3,x=7 → j=4,x=10, a=(5,0,7), nothing back → i=3, a=5 0 7
  //   result: j=0,x=0 → j=1,x=3, a=(5,0,7), back i=1, a[3]=3 → 1 5 0 3
  //   value-result: j=3,x=7 → 4,10, a=(5,0,7), back i=4, a[3]=10 → 4 5 0 10
  //   reference: i=4, a[3]=10, a[2]=0 (x is a[3], untouched) → 4 5 0 10
  const PI_MODES = [['value', 'by value'], ['result', 'by result'], ['vr', 'value-result'], ['ref', 'by reference']];
  const PI_ANS = { value: [3, 5, 0, 7], result: [1, 5, 0, 3], vr: [4, 5, 0, 10], ref: [4, 5, 0, 10] };
  const PI_START = [3, 5, 6, 7];
  const PI_NAMES = ['i', 'a[1]', 'a[2]', 'a[3]'];
  function PrintIt() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('pi:m', 'value');
    const [v, setV] = H.K.useSlot('pi:v', {});
    const [ck, setCk] = H.K.useSlot('pi:c', {});
    const cur = v[m] || PI_START, ans = PI_ANS[m], checked = !!ck[m];
    const allOk = k => !!ck[k] && (v[k] || PI_START).every((x, j) => x === PI_ANS[k][j]);
    const bump = (j, d) => { const n = cur.slice(); n[j] = Math.max(0, Math.min(12, n[j] + d)); setV(Object.assign({}, v, { [m]: n })); setCk(Object.assign({}, ck, { [m]: false })); };
    const right = cur.filter((x, j) => x === ans[j]).length;
    return html`<div className="hf-c9-pi hf-in">
      <div className="hf-c9-tabs" dir="ltr" role="group" aria-label="Passing mode">${PI_MODES.map(([k, t]) => html`<button key=${k} aria-pressed=${String(k === m)} className=${allOk(k) ? 'hf-c9-ok' : ''} onClick=${() => setM(k)}>${t}</button>`)}</div>
      <p className="hf-c9-lbl">${ar ? html`الـ main بيطبع بعد الـ call (<bdi dir="ltr">${PI_MODES.find(x => x[0] === m)[1]}</bdi>)` : html`After the call, main prints (${PI_MODES.find(x => x[0] === m)[1]})`}</p>
      <div className="hf-c9-cells" dir="ltr">${cur.map((x, j) => html`<div key=${j} className=${'hf-c9-cell' + (checked ? (x === ans[j] ? ' hf-c9-ok' : ' hf-c9-no') : '')}>
        <span className="hf-c9-nm">${PI_NAMES[j]}</span><span className="hf-c9-val">${x}</span>
        <span className="hf-c9-bt"><button aria-label=${'decrease ' + PI_NAMES[j]} onClick=${() => bump(j, -1)}>−</button><button aria-label=${'increase ' + PI_NAMES[j]} onClick=${() => bump(j, 1)}>+</button></span></div>`)}</div>
      <div className="hf-c9-bar">
        <button className="hf-btn solid" onClick=${() => setCk(Object.assign({}, ck, { [m]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setV(Object.assign({}, v, { [m]: ans.slice() })); setCk(Object.assign({}, ck, { [m]: true })); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${checked && html`<span className="hf-score">${ar ? html`<bdi>${right} / 4</bdi> صح${right === 4 ? '!' : ''}` : right + ' / 4 right' + (right === 4 ? '!' : '')}</span>`}
      </div>
    </div>`;
  }

  H.chapters.compiler[9] = {
    title: 'Runtime Environment, Parameter Passing and Code Optimization',
    kicker: 'Chapter 9',
    run: 'runtime, parameters and optimization',
    ar: { title: 'الـ Runtime Environment والـ Parameter Passing والـ Code Optimization', kicker: 'الفصل 9', run: 'الـ runtime والـ parameters والـ optimization' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 9);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[9] && window.AR.compiler.lectures[9].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const PROG = ['var a: array[1..3] of integer', '         := (1,2,3);', 'var i: integer := 2;', 'proc concentrate(mode j, x: integer) is', '   var i: integer := 0;', 'begin', '   j := j+1;  x := x+3;  a[2] := 0;', '   print(j); print(x); print(a);', 'end concentrate;', 'begin', '   print(i); print(a);', '   concentrate(i, a[i]);', '   print(i); print(a);', 'end'];
      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('Last stop: the program runs', 'آخر محطة: البرنامج بيشتغل')}</${H2}>
          <${P} small=${true}>${X("This is the course's <b>last lecture</b>. Until now everything happened <b>before</b> the program ran. Now it is running: where does it keep its things, how do procedures hand values to each other, and how does the compiler make the code faster?",
            'دي <b>آخر محاضرة</b> في الكورس. لحد دلوقتي كل حاجة كانت بتحصل <b>قبل</b> ما البرنامج يشتغل. دلوقتي هو شغّال: بيحط حاجاته فين، والـ procedures بتسلّم القيم لبعض إزاي، والـ compiler بيخلّي الكود أسرع إزاي؟')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Three exercises</b> on the page: where does it live, what does it print, and match the optimization.', '<b>تلات تمارين</b> على الصفحة: الحاجة دي بتتحط فين، البرنامج بيطبع إيه، ووصّل الـ optimization بمثالها.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسهم.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the slides.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('A procedure calls itself five times. Each call has its own local variables. Where could five copies of them possibly live at the same time?',
            'فيه procedure بتنادي نفسها خمس مرات، وكل call ليه الـ local variables بتاعته. تفتكر خمس نسخ منهم ممكن يعيشوا فين في نفس الوقت؟')}</p></${Box}>
        `, { sec: t('How this chapter works', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">9</span><span className="t">${A ? html`الفصل التاسع<br/>Compiler Design` : html`Chapter nine<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Life After Compile Time', 'الحياة بعد الـ compile time')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('runtime, parameter passing, code optimization', 'الـ runtime والـ parameter passing والـ code optimization')}</p></div>
          <${Talk} who="dev">${t("It compiled with zero errors! So we're done, right?", 'اتعمله compile من غير ولا error! كده خلصنا، صح؟')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('Done? Now I need memory for your <b>code</b>, your <b>procedure calls</b> and your <b>variables</b>. Who hands it out?', 'خلصنا؟ أنا لسه محتاج ميموري للـ <b>code</b> بتاعك، وللـ <b>procedure calls</b>، وللـ <b>variables</b>. مين هيوزّعها؟')}</${Talk}>
          <${P} small=${true}>${X('In this chapter: the <b>runtime environment</b> and its three kinds of storage, how <b>parameters</b> travel into a procedure (four ways, four different outputs!), and how the compiler polishes code with <b>peephole</b> and <b>loop optimization</b>.',
            'في الفصل ده: الـ <b>runtime environment</b> وأنواع الـ storage التلاتة بتاعته، والـ <b>parameters</b> بتدخل الـ procedure إزاي (أربع طرق، وأربع outputs مختلفة!)، والـ compiler بيلمّع الكود إزاي بالـ <b>peephole</b> والـ <b>loop optimization</b>.')}</${P}>
        `, { sec: t('Life after compile time', 'الحياة بعد الـ compile time') }),

        // 2 · runtime environment
        page(html`
          <${H1}>${t('Runtime: your program, alive', 'الـ runtime يعني برنامجك شغّال')}</${H1}>
          <${P} small=${true}>${X('<b>Runtime</b> means a program in execution: a running <b>process</b>.', 'الـ <b>Runtime</b> معناه برنامج في التنفيذ، يعني <b>process</b> شغّالة.')}</${P}>
          <${Def}>${X('The <b>runtime environment</b> is a state of the target machine (software libraries, environment variables…) that provides services to the running processes.',
            'الـ <b>runtime environment</b> هو حالة الـ target machine اللي بتقدّم خدمات للـ processes الشغّالة، زي الـ software libraries والـ environment variables…')}</${Def}>
          <${Def}>${X('The <b>runtime support system</b> is a package, mostly generated with the executable itself, that handles communication between the process and the runtime environment. It takes care of <b>memory allocation and de-allocation</b> while the program runs.',
            'الـ <b>runtime support system</b> ده package، غالبًا بيتعمل مع الـ executable نفسه، وبيظبط التواصل بين الـ process والـ runtime environment. وهو اللي بياخد باله من الـ <b>memory allocation والـ de-allocation</b> والبرنامج شغّال.')}</${Def}>
          <${Grow} />
          <${Hand}>${t("Our analogy, not the slides': the environment is the hotel, the support system its front desk.", 'تشبيه من عندنا: الفندق هو الـ environment، والريسبشن بتاعه هو الـ support system.')}</${Hand}>
        `, { sec: t('Runtime environment', 'الـ Runtime environment') }),

        // 3 · figure
        page(html`
          <${H2}>${t('Who talks to whom', 'مين بيكلّم مين')}</${H2}>
          <${Fig} name="cc-runtime-env" />
        `),

        // 4 · what needs memory
        page(html`
          <${H1}>${t('Three things need memory', 'تلات حاجات محتاجة ميموري')}</${H1}>
          <${P} small=${true}>${t('The runtime environment manages the runtime memory needs of three things:', 'الـ runtime environment بيدير احتياجات الميموري وقت الـ runtime لتلات حاجات:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Code</b>: الـ text part، ومش بيتغير وقت الـ runtime. احتياجه من الميموري <b>معروف في الـ compile time</b>.',
            'الـ <b>Procedures</b>: الـ text بتاعها static، بس بتتنادى <b>بترتيب عشوائي</b>، فالـ <b>stack</b> هو اللي بيدير الـ procedure calls والـ activations.',
            'الـ <b>Variables</b>: بتتعرف بس وقت الـ runtime (إلا لو global أو constant)، والـ <b>heap</b> allocation هو اللي بيديرها.'
          ] : [
            '<b>Code</b>: the text part. It does not change at runtime, so its memory needs are <b>known at compile time</b>.',
            '<b>Procedures</b>: their text is static, but they are called in a <b>random order</b>, so <b>stack</b> storage manages procedure calls and activations.',
            '<b>Variables</b>: known only at runtime (unless global or constant). <b>Heap</b> allocation manages them.'
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X("The code's needs are known at compile time. A variable's needs may be known only at runtime. Which of the two is harder for a compiler to plan memory for, and why?",
            'احتياجات الـ code معروفة في الـ compile time. احتياجات المتغير ممكن ماتتعرفش غير وقت الـ runtime. أنهي واحد فيهم أصعب على الـ compiler إنه يخطّطله الميموري، وليه؟')}</p></${Box}>
        `, { sec: t('Storage allocation', 'الـ Storage allocation') }),

        // 5 · figure
        page(html`
          <${H2}>${t('Each one gets its own storage', 'كل واحد وليه الـ storage بتاعه')}</${H2}>
          <${Fig} name="cc-mem-needs" />
        `),

        // 6 · three kinds
        page(html`
          <${H1}>${t('Three kinds of storage allocation', 'تلات أنواع storage allocation')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>Static allocation</b>: الداتا بتترتبط بـ <b>location ثابت</b> مش بيتغير طول التنفيذ. الأحجام والأماكن معروفة من الأول، فـ<b>مش محتاجين runtime support package</b> للـ allocation والـ de-allocation.',
            'الـ <b>Stack allocation</b>: الـ procedure calls والـ activations بتتدار بـ stack، يعني <b>LIFO</b>. مفيد جدًا للـ <b>recursive</b> calls.',
            'الـ <b>Heap allocation</b>: الميموري بتتحجز وتتفك <b>dynamically</b> وقت الـ runtime وبترجع لما مانحتاجهاش. لازمة للغات اللي بتسمح بـ <b>dynamic data structures</b>.'
          ] : [
            '<b>Static allocation</b>: data is bound to a <b>fixed location</b> that does not change during execution. Sizes and locations are known in advance, so <b>no runtime support package</b> is needed for allocation and de-allocation.',
            '<b>Stack allocation</b>: procedure calls and activations are managed with a stack, <b>LIFO</b>. Very useful for <b>recursive</b> calls.',
            '<b>Heap allocation</b>: memory is allocated and de-allocated <b>dynamically</b> at runtime and reclaimed when no longer needed. Needed by languages that allow <b>dynamic data structures</b>.'
          ]} />
          <${P} small=${true}>${X('Except for the static area, <b>stack and heap grow and shrink dynamically</b>, so they cannot be given a fixed amount of memory. The compiler uses fixed-size (static) and dynamic-size (stack and heap) storage.',
            'ماعدا الـ static area، الـ <b>stack والـ heap بيكبروا ويصغروا dynamically</b>، فماينفعش ندّيهم كمية ميموري ثابتة. الـ compiler بيستخدم storage حجمه ثابت (static) وstorage حجمه متغير (الـ stack والـ heap).')}</${P}>
        `),

        // 7 · figure
        page(html`
          <${H2}>${t('Watch all three during a run', 'اتفرج على التلاتة وقت التشغيل')}</${H2}>
          <${Fig} name="cc-alloc-kinds" />
        `),

        // 8–9 · fireside chat: the stack and the heap
        page(html`
          <${Fireside} sub=${t("Tonight's talk: the Stack and the Heap argue about who runs memory better.", 'قعدة الليلة: الـ Stack والـ Heap بيتخانقوا مين فيهم بيدير الميموري أحسن.')} />
          <${Chat} names=${[t('Stack', 'الـ Stack'), t('Heap', 'الـ Heap')]} lines=${A ? [
            [0, 'أنا المنظّم فيهم. كل <b>procedure call</b> بياخد activation، وأنا بحطهم بالترتيب: <b>LIFO</b>، اللي يدخل الآخر يطلع الأول.'],
            [1, 'منظّم؟ قول ناشف. أنا بدّي ميموري <b>dynamically وقت الـ runtime</b>، لمتغيرات محدش كان يعرفها في الـ compile time.'],
            [0, 'لو فيه procedure بتنادي نفسها؟ الـ <b>recursion</b> دي لعبتي. كل call بيتحط فوق اللي قبله.'],
            [1, 'ولما متغير مبقاش له لازمة، <b>برجّع</b> الميموري بتاعته، وبأي ترتيب يعجبني.'],
            [0, 'وفي C أنا اللي شايل الـ <b>automatic variables</b> والـ <b>stack frames</b> باللي فيها من return addresses.']
          ] : [
            [0, "I'm the organized one. Every <b>procedure call</b> gets an activation, and I keep them in order: <b>LIFO</b>, last in, first out."],
            [1, "Organized? Rigid. I hand out memory <b>dynamically, at runtime</b>, for variables nobody knew about at compile time."],
            [0, 'A procedure that calls itself? <b>Recursion</b> is my favourite. Each call just goes on top.'],
            [1, 'And when a variable is no longer needed, I <b>reclaim</b> its memory, in whatever order I like.'],
            [0, 'In C I hold the <b>automatic variables</b> and the <b>stack frames</b>, with their return addresses.']
          ]} />
        `, { sec: t('Stack vs heap', 'الـ Stack والـ Heap') }),
        page(html`
          <${Chat} names=${[t('Stack', 'الـ Stack'), t('Heap', 'الـ Heap')]} start=${1} lines=${A ? [
            [1, 'وأنا الـ <b>malloc</b> والـ <b>realloc</b> والـ <b>free</b>. وأي لغة فيها <b>dynamic data structures</b> محتاجاني.'],
            [0, 'بس فيه حاجة مشتركة بينّا: محدش يقدر يدّينا <b>كمية ميموري ثابتة</b>.'],
            [1, 'صح. إحنا قاعدين في <b>الطرفين</b>، وبنكبر ونصغر <b>ناحية بعض</b>.'],
            [0, 'مش زي الـ Static اللي هناك ده. مكانه ثابت ومعروف من الأول.'],
            [1, 'ومش محتاج runtime support package كمان. فاكر نفسه مين.']
          ] : [
            [1, "And I'm <b>malloc</b>, <b>realloc</b> and <b>free</b>. Any language with <b>dynamic data structures</b> needs me."],
            [0, 'We do have one thing in common: nobody can give us a <b>fixed amount</b> of memory.'],
            [1, 'True. We sit at the <b>two extremes</b> and grow and shrink <b>against each other</b>.'],
            [0, 'Unlike Static over there. Fixed location, known in advance.'],
            [1, "Doesn't even need a runtime support package. Show-off."]
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Storage used by a compiler: <b>static, stack and heap</b>. The trap is "dynamic, stack and heap": stack and heap <i>are</i> the dynamic ones.<br/>Languages that <b>need the heap</b>: those that allow <b>dynamic data structures</b>. Recursion is the <b>stack</b>\'s job.',
            'الـ storage بتاع الـ compiler تلات أنواع: <b>static وstack وheap</b>. الفخ هو<span class="ltr">"dynamic, stack and heap"</span>لأن الـ stack والـ heap هما نفسهم الـ dynamic.<br/>واللغات اللي <b>محتاجة heap</b> هي اللي بتسمح بـ <b>dynamic data structures</b>. أما الـ recursion فده شغل الـ <b>stack</b>.')}</p></${Box}>
        `),

        // 10 · memory layout figure
        page(html`
          <${Fig} name="cc-mem-layout" head=${t('The memory layout: draw this figure', 'الـ memory layout: ارسم الشكل ده')} />
        `, { sec: t('Memory layout', 'الـ Memory layout') }),

        // 11 · segments
        page(html`
          <${H2}>${t('The layout, piece by piece', 'الـ layout حتة حتة')}</${H2}>
          <${P} small=${true}>${X('The text part gets a <b>fixed</b> amount of memory. Stack and heap sit at the <b>two extremes</b> of the program\'s memory and <b>grow and shrink against each other</b>. The lecture notes give C\'s layout:',
            'الـ text part بياخد كمية ميموري <b>ثابتة</b>. والـ stack والـ heap قاعدين في <b>الطرفين</b> بتوع ميموري البرنامج و<b>بيكبروا ويصغروا ناحية بعض</b>. والـ lecture notes بتدّي الـ layout بتاع C:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>text segment</b>: الكود نفسه.',
            'الـ <b>initialized data segment</b>: الـ globals والـ statics اللي ليها قيمة.',
            'الـ <b>uninitialized data segment</b>، واسمه <b>BSS</b>: الـ globals والـ statics اللي من غير قيمة.',
            'الـ <b>stack</b>: الـ automatic variables، والـ stack frames اللي فيها الـ return addresses.',
            'الـ <b>heap</b>: الـ malloc والـ realloc والـ free.'
          ] : [
            '<b>Text segment</b>: the code.',
            '<b>Initialized data segment</b>: globals and statics with a value.',
            '<b>Uninitialized data segment (BSS)</b>: globals and statics without one.',
            '<b>Stack</b>: automatic variables, stack frames with return addresses.',
            '<b>Heap</b>: malloc, realloc and free.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The compiler can give the stack and the heap a fixed amount of memory, just like the text part": <b>False</b>. Only text and static data are fixed.',
            'دي <b>غلط</b>، الثابت هو الـ text والـ static data بس:<span class="ltr">"The compiler can give the stack and the heap a fixed amount of memory, just like the text part"</span>')}</p></${Box}>
        `),

        // 12 · sort: where does it live?
        page(html`
          <${Box} kind="pencil" title=${t('Where does it live?', 'بتتحط فين؟')}><p className="hf-p small">${X('Tap <b>static</b>, <b>stack</b> or <b>heap</b> for each one, then check.', 'دوس <b>static</b> أو <b>stack</b> أو <b>heap</b> لكل واحدة، وبعدين صحّح.')}</p></${Box}>
          <div className="hf-c9-x2"><${Sort} id="live" bins=${[['static', 'Static (fixed)'], ['stack', 'Stack'], ['heap', 'Heap']]} items=${A ? [
            ['كود البرنامج نفسه (الـ text part)', 0],
            ['متغير global ليه قيمة: <code class="hf-c9-nw">int max = 10;</code>', 0],
            ['متغير global من غير قيمة: <code class="hf-c9-nw">int count;</code>', 0],
            ['كل activation جديدة لما P تنادي نفسها', 1],
            ['الـ automatic variables والـ return addresses', 1],
            ['ميموري من <code>malloc</code> وبترجع بـ <code>free</code>', 2],
            ['بيتدار بنظام <b>LIFO</b>', 1],
            ['لازم للـ dynamic data structures', 2]
          ] : [
            ["The program's code (the text part)", 0],
            ['A global with a value: <code class="hf-c9-nw">int max = 10;</code>', 0],
            ['A global without one: <code class="hf-c9-nw">int count;</code>', 0],
            ['A new activation each time P calls itself', 1],
            ['Automatic variables and return addresses', 1],
            ['Memory from <code>malloc</code>, given back with <code>free</code>', 2],
            ['Managed last in, first out', 1],
            ['Needed for dynamic data structures', 2]
          ]} /></div>
        `, { sec: t('Exercise: where does it live?', 'تمرين: بتتحط فين؟') }),

        // 13 · dumb questions on memory
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه الـ static allocation مش محتاج runtime support package؟', 'لأن <b>الأحجام والأماكن معروفة من الأول</b> ومش بتتغير طول التنفيذ. مفيش حاجة تتحجز أو تتفك وهو شغّال.'],
            ['طب ليه مانديش الـ stack والـ heap حجم ثابت ونرتاح؟', 'لأنهم <b>بيكبروا ويصغروا dynamically</b>، ناحية بعض، في المساحة الفاضية اللي بينهم. حجم ثابت يا إما هيضيّع ميموري يا إما هيخلص.'],
            ['إيه الفرق بين الـ initialized data والـ BSS؟', 'الاتنين globals وstatics. اللي ليه قيمة زي <code class="hf-c9-nw">int max = 10;</code> بيروح الـ <b>initialized data segment</b>، واللي من غير قيمة زي <code class="hf-c9-nw">int count;</code> بيروح الـ <b>BSS</b>.'],
            ['مين اللي بيحجز ويفك الميموري وقت التشغيل؟', 'الـ <b>runtime support system</b>، الـ package اللي بيتعمل مع الـ executable.']
          ] : [
            ['Why does static allocation need no runtime support package?', 'Because <b>sizes and locations are known in advance</b> and never change during execution. Nothing has to be allocated or freed while it runs.'],
            ["Why not just give the stack and heap a fixed size?", 'They <b>grow and shrink dynamically</b>, toward each other, in the free space between them. Any fixed size would either waste memory or run out.'],
            ['Initialized data vs BSS?', 'Both hold globals and statics. With a value (<code class="hf-c9-nw">int max = 10;</code>) goes to the <b>initialized data segment</b>; without one (<code class="hf-c9-nw">int count;</code>) goes to <b>BSS</b>.'],
            ['Who actually allocates and frees memory at runtime?', 'The <b>runtime support system</b>, the package generated with the executable.']
          ]} />
        `),

        // 14 · formal vs actual
        page(html`
          <${H1}>${t('Formal vs actual parameters', 'الـ formal والـ actual parameters')}</${H1}>
          <div className="hf-c9-code"><${Code} lines=${['fun_one() {', '   int actual_parameter = 10;', '   call fun_two(int actual_parameter);', '}', 'fun_two(int formal_parameter) {', '   print formal_parameter;', '}']} /></div>
          <${UL} items=${A ? [
            'الـ <b>formal parameters</b>: متغيرات في <b>تعريف</b> الـ function اللي اتنادت، وبتستقبل المعلومات اللي الـ caller بعتها.',
            'الـ <b>actual parameters</b>: المتغيرات اللي قيمها أو عناوينها بتتبعت، وبتظهر في الـ <b>function call</b> كـ arguments.',
            'الـ formal بيشيل معلومات الـ actual: <b>قيمة أو عنوان</b>، حسب طريقة الـ passing.'
          ] : [
            '<b>Formal parameters</b>: variables in the <b>definition</b> of the called function; they receive the information passed by the caller.',
            '<b>Actual parameters</b>: the variables whose values or addresses are passed; they appear in the <b>function call</b> as arguments.',
            'The formal holds the actual\'s information: <b>a value or an address</b>, depending on the passing technique.'
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Memory trick (ours): the Formal sits in the function definition; the Actual is what you actually pass in the call.', 'حيلة للحفظ (من عندنا): الـ formal قاعد في التعريف، والـ actual هو اللي إنت فعلًا بتبعته في الـ call.')}</${Hand}>
        `, { sec: t('Formal and actual parameters', 'الـ Formal والـ actual parameters') }),

        // 15 · figure
        page(html`
          <${H2}>${t('A value or an address?', 'قيمة ولا عنوان؟')}</${H2}>
          <${Fig} name="cc-formal-actual" />
        `),

        // 16 · the lecture's program
        page(html`
          <${H1}>${t('One program, four answers', 'برنامج واحد، وأربع إجابات')}</${H1}>
          <${P} small=${true}>${X("The lecture runs this program under each passing mode. The exams ask for its outputs, so get to know it.", 'المحاضرة بتشغّل البرنامج ده بكل طريقة passing. والامتحانات بتسأل على الـ outputs بتاعته، فاتعرّف عليه كويس.')}</${P}>
          <div className="hf-c9-code"><${Code} lines=${PROG} /></div>
          <${Hand} red=${true}>${X('Two traps: the local <code class="hf-c9-nw">i := 0</code> hides the global i <b>inside</b> the procedure, but the call is made in main, where i = 2, so <code>a[i]</code> is <code>a[2]</code>.',
            'فخّين: الـ <code class="hf-c9-nw">i := 0</code> الـ local بيخبّي الـ i الـ global <b>جوّه</b> الـ procedure بس. لكن الـ call بيحصل في الـ main، والـ i هناك قيمته 2، فـ<code>a[i]</code> هي <code>a[2]</code>.')}</${Hand}>
        `, { sec: t('Parameter passing', 'الـ Parameter passing') }),

        // 17 · the four modes
        page(html`
          <${H2}>${t('Four ways to pass a parameter', 'أربع طرق تبعت بيها parameter')}</${H2}>
          <${ModeTable} />
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': by value is a photocopy; by result is a blank form you fill in and hand back; value-result is a photocopy that's copied over the original at the end; by reference is the original itself.",
            'تشبيه من عندنا: الـ value ورقة متصوّرة، والـ result استمارة فاضية بترجع مليانة، والـ value-result صورة بتتكتب فوق الأصل في الآخر، والـ reference هو الأصل نفسه.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('In all four modes, main\'s first line is <code class="hf-c9-nw">2 1 2 3</code>. Why is that one line the same every time?', 'في الأربع طرق، أول سطر الـ main بيطبعه هو <code class="hf-c9-nw">2 1 2 3</code>. ليه السطر ده بالذات ثابت في كل مرة؟')}</p></${Box}>
        `),

        // 18 · by value
        page(html`
          <${H2}>${t('By value: copies, and nothing comes back', 'الـ by value: نسخ، ومفيش حاجة بترجع')}</${H2}>
          <${P} small=${true}>${X('j gets a copy of i (<b>2</b>) and x a copy of a[2] (<b>2</b>). They change only the copies. But <code class="hf-c9-nw">a[2] := 0</code> writes the <b>global</b> array directly.',
            'الـ j بياخد نسخة من i (<b>2</b>) والـ x نسخة من <bdi dir="ltr">a[2]</bdi> (<b>2</b>). التغيير بيحصل في النسخ بس. لكن <code class="hf-c9-nw">a[2] := 0</code> بيكتب في الـ array الـ <b>global</b> على طول.')}</${P}>
          <${Trace} rows=${[['call', '2', '2', '1 2 3', '2'], ['j := j+1', '3', '2', '1 2 3', '2'], ['x := x+3', '3', '5', '1 2 3', '2'], ['a[2] := 0', '3', '5', '1 0 3', '2', 1], ['return', '–', '–', '1 0 3', '2']]} />
          <${Out} lines=${['2 1 2 3', '3 5 1 0 3', '2 1 0 3']} />
          <${Grow} />
          <${Talk} who="dev">${X('So i is still 2 at the end. The procedure only scribbled on its photocopy!', 'يعني الـ i فضل 2 في الآخر. الـ procedure كانت بتشخبط على النسخة بس!')}</${Talk}>
        `),

        // 19 · by reference
        page(html`
          <${H2}>${t('By reference: x IS a[2]', 'الـ by reference: الـ x هو نفسه a[2]')}</${H2}>
          <${P} small=${true}>${X('No copies: j is another name for the global i, and x is another name for a[2]. Every change lands on the original.', 'مفيش نسخ: الـ j اسم تاني للـ i الـ global، والـ x اسم تاني لـ <bdi dir="ltr">a[2]</bdi>. أي تغيير بيقع على الأصل.')}</${P}>
          <${Trace} rows=${[['call', '→ i', '→ a[2]', '1 2 3', '2'], ['j := j+1', '3', '2', '1 2 3', '3', 1], ['x := x+3', '3', '5', '1 5 3', '3', 1], ['a[2] := 0', '3', '0', '1 0 3', '3', 1], ['return', '–', '–', '1 0 3', '3']]} />
          <${Out} lines=${['2 1 2 3', '3 0 1 0 3', '3 1 0 3']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<code class="hf-c9-nw">a[2] := 0</code> comes <b>after</b> <code class="hf-c9-nw">x := x+3</code>, and x is a[2], so x becomes <b>0</b> too. The procedure prints <code class="hf-c9-nw">3 0 1 0 3</code>, not <code class="hf-c9-nw">3 5 …</code>',
            'الـ <code class="hf-c9-nw">a[2] := 0</code> بيحصل <b>بعد</b> <code class="hf-c9-nw">x := x+3</code>، والـ x هو نفسه <bdi dir="ltr">a[2]</bdi>، فالـ x بيبقى <b>0</b> هو كمان. يعني الـ procedure بتطبع <code class="hf-c9-nw">3 0 1 0 3</code> مش <code class="hf-c9-nw">3 5 …</code>')}</p></${Box}>
        `),

        // 20 · by result
        page(html`
          <${H2}>${t('By result: start from zero, copy back', 'الـ by result: ابدأ من الصفر، ورجّع في الآخر')}</${H2}>
          <${P} small=${true}>${X('No value goes in, so j and x start as <b>0</b>. At return, j is copied back to i and x to a[2] (the address picked at the call).',
            'مفيش قيمة بتدخل، فالـ j والـ x بيبدأوا بـ <b>0</b>. ووقت الـ return الـ j بيترجع في i، والـ x في <bdi dir="ltr">a[2]</bdi> (العنوان اللي اتحدد وقت الـ call).')}</${P}>
          <${Trace} rows=${[['call', '0', '0', '1 2 3', '2'], ['j := j+1', '1', '0', '1 2 3', '2'], ['x := x+3', '1', '3', '1 2 3', '2'], ['a[2] := 0', '1', '3', '1 0 3', '2'], ['return', '–', '–', '1 3 3', '1', 1]]} />
          <${Out} lines=${['2 1 2 3', '1 3 1 0 3', '1 1 3 3']} />
          <${Grow} />
          <${Hand} arrow="up">${X('the copy back puts 1 in i and 3 in a[2], over the 0', 'الـ copy back بيحط 1 في i و3 في <bdi dir="ltr">a[2]</bdi> فوق الـ 0')}</${Hand}>
        `),

        // 21 · by value-result
        page(html`
          <${H2}>${t('By value-result: copy in, copy back', 'الـ by value-result: نسخة جوّه، ونسخة راجعة')}</${H2}>
          <${P} small=${true}>${X('Copied in at the call <b>and</b> copied back at return, to the addresses fixed at call time: i and a[2].',
            'بيتنسخ جوّه وقت الـ call، <b>وكمان</b> بيترجع وقت الـ return، على العناوين اللي اتثبتت وقت الـ call: الـ i و<bdi dir="ltr">a[2]</bdi>.')}</${P}>
          <${Trace} rows=${[['call', '2', '2', '1 2 3', '2'], ['j := j+1', '3', '2', '1 2 3', '2'], ['x := x+3', '3', '5', '1 2 3', '2'], ['a[2] := 0', '3', '5', '1 0 3', '2'], ['return', '–', '–', '1 5 3', '3', 1]]} />
          <${Out} lines=${['2 1 2 3', '3 5 1 0 3', '3 1 5 3']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The copy back <b>overwrites</b> the 0 that <code class="hf-c9-nw">a[2] := 0</code> wrote: a[2] ends as <b>5</b>. By reference it stayed 0. Same start, different ends.',
            'الـ copy back <b>بيمسح</b> الـ 0 اللي <code class="hf-c9-nw">a[2] := 0</code> كتبه، فالـ <bdi dir="ltr">a[2]</bdi> بيخلص بـ <b>5</b>. في الـ by reference فضل 0. نفس البداية، ونهايات مختلفة.')}</p></${Box}>
        `),

        // 22 · figure
        page(html`
          <${H2}>${t('Run all four yourself', 'شغّل الأربعة بنفسك')}</${H2}>
          <${Fig} name="cc-param-modes" />
        `),

        // 23 · your turn: what does it print?
        page(html`
          <${Box} kind="pencil" title=${t('What does it print?', 'بيطبع إيه؟')}><p className="hf-p small">${X('Same procedure, new data: <code class="hf-c9-nw">a = (5,6,7)</code>, <code class="hf-c9-nw">i = 3</code>, and the call <code class="hf-c9-nw">concentrate(i, a[i])</code>. For each mode, set what main prints <b>after</b> the call, then check.',
            'نفس الـ procedure بداتا جديدة: <code class="hf-c9-nw">a = (5,6,7)</code> و<code class="hf-c9-nw">i = 3</code>، والـ call هو <code class="hf-c9-nw">concentrate(i, a[i])</code>. لكل طريقة ظبّط الـ main هيطبع إيه <b>بعد</b> الـ call، وبعدين صحّح.')}</p></${Box}>
          <${PrintIt} />
          <${Grow} />
          <${Hand} red=${true}>${X('Hint: this time x is a[3], not a[2]. Does <code class="hf-c9-nw">a[2] := 0</code> still touch x?', 'تلميح: المرة دي الـ x هو <bdi dir="ltr">a[3]</bdi> مش <bdi dir="ltr">a[2]</bdi>. يا ترى <code class="hf-c9-nw">a[2] := 0</code> لسه بيلمس الـ x؟')}</${Hand}>
          <${Hand}>${t("Check any mode with the figure's \"Try your own\" (i = 3, a = 5 6 7).", 'وتقدر تتأكد من أي طريقة بزرار "Try your own" في الشكل اللي فات.')}</${Hand}>
        `, { sec: t('Your turn: what does it print?', 'دورك: بيطبع إيه؟') }),

        // 24 · dumb questions on parameters
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ procedure فيها <code class="hf-c9-nw">i := 0</code>، ليه الـ <code>a[i]</code> مش <code>a[0]</code>؟', 'لأن الـ call بيتحسب في الـ main، والـ i هناك هو الـ global وقيمته 2. الـ i الـ local بيخبّي الـ global <b>جوّه</b> الـ procedure بس.'],
            ['في الـ by result، الـ 0 ده جه منين؟', 'مفيش قيمة بتدخل خالص، وفي المحاضرة الـ formals <b>بتبدأ بـ 0</b>.'],
            ['هو الـ value-result والـ reference مش نفس الحاجة؟', 'لأ. في مثال المحاضرة الـ x هو <bdi dir="ltr">a[2]</bdi>، فالـ reference بيخلّيه 0، والـ value-result بيرجّع 5 فوق الـ 0. في التمرين اللي فات طلعوا زي بعض بس لأن الـ x كان <bdi dir="ltr">a[3]</bdi>.'],
            ['عنوان الـ copy back بيتحدد إمتى؟', '<b>وقت الـ call</b>. يعني <bdi dir="ltr">a[2]</bdi> في مثال المحاضرة، حتى لو i اتغير بعد كده.']
          ] : [
            ['The procedure sets <code class="hf-c9-nw">i := 0</code>. Why is <code>a[i]</code> not <code>a[0]</code>?', 'The call is evaluated in main, where i is the global i, 2. The local i only hides the global one <b>inside</b> the procedure.'],
            ['By result: where does the 0 come from?', 'No value goes in at all; in the lecture the formals <b>start as 0</b>.'],
            ['Aren\'t value-result and reference the same thing?', 'No. In the lecture x is a[2], so by reference it ends as 0, while value-result copies 5 back over the 0. In the exercise they agreed only because x was a[3].'],
            ['When is the copy-back address decided?', '<b>At call time</b>: a[2] in the lecture\'s example, even if i changes later.']
          ]} />
        `),

        // 25 · symbol table
        page(html`
          <${H2}>${t('An old friend: the symbol table', 'صاحب قديم: الـ symbol table')}</${H2}>
          <${Talk} who="table" flip=${true}>${X("Remember me from Chapter 1? Still <b>not</b> a phase. Here's my job description again, the runtime view.", 'فاكرني من الفصل الأول؟ لسه <b>مش</b> phase. ودي الشغلانة بتاعتي تاني، من ناحية الـ runtime.')}</${Talk}>
          <${P} small=${true}>${X('It stores information about variable names, function names, objects, classes, interfaces… Its purposes:', 'بيخزّن معلومات عن أسماء المتغيرات، وأسماء الـ functions، والـ objects، والـ classes، والـ interfaces… وأغراضه:')}</${P}>
          <${UL} items=${A ? [
            'يخزّن أسماء كل الـ entities في <b>مكان واحد منظّم</b>.',
            'يتأكد إن المتغير <b>اتعمله declare</b>.',
            'ينفّذ الـ <b>type checking</b>: إن الـ assignments والـ expressions صح semantically.',
            'يحدد الـ <b>scope</b> بتاع الاسم (الـ scope resolution).',
            'وممكن كمان يستخدم في الـ <b>storage allocation</b>.'
          ] : [
            'Store the names of all entities in <b>one structured place</b>.',
            'Verify that a variable has been <b>declared</b>.',
            'Implement <b>type checking</b>: assignments and expressions are semantically correct.',
            'Determine the <b>scope</b> of a name (scope resolution).',
            'It can also be used for <b>storage allocation</b>.'
          ]} />
        `, { sec: t('Symbol table', 'الـ Symbol table') }),

        // 26 · peephole optimization
        page(html`
          <${H1}>${t('Peephole optimization', 'الـ Peephole optimization')}</${H1}>
          <${Def}>${X('Code optimization performed on a <b>small part of the code</b>. That small set of instructions is called the <b>peephole</b> or <b>window</b>.',
            'الـ code optimization اللي بيتعمل على <b>جزء صغير من الكود</b>. المجموعة الصغيرة دي من الـ instructions اسمها <b>peephole</b> أو <b>window</b>.')}</${Def}>
          <${UL} items=${A ? [
            'بيشتغل بالـ <b>replacement</b>: جزء من الكود بيتبدّل بكود <b>أقصر وأسرع</b> بيدّي <b>نفس الـ output</b>.',
            'وهو <b>machine dependent</b>.',
            'أهدافه: <b>تحسين الـ performance</b>، و<b>تقليل حجم الكود</b> وتحسين استخدام الميموري.',
            'تكنيكاته التلاتة: الـ <b>redundant load and store elimination</b>، والـ <b>constant folding</b>، والـ <b>combine operations</b>.'
          ] : [
            'It works by <b>replacement</b>: part of the code is replaced by <b>shorter, faster</b> code with <b>the same output</b>.',
            'It is <b>machine dependent</b>.',
            'Objectives: <b>improve performance</b>; <b>reduce code size</b> and improve memory usage.',
            'Its three techniques: <b>redundant load and store elimination</b>, <b>constant folding</b>, <b>combine operations</b>.'
          ]} />
          <${Grow} />
          <${Hand}>${t("Our analogy, not the slides': proofreading through a keyhole, two lines at a time.", 'تشبيه من عندنا: كإنك بتراجع الكلام من خرم الباب، سطرين سطرين.')}</${Hand}>
        `, { sec: t('Peephole optimization', 'الـ Peephole optimization') }),

        // 27 · figure
        page(html`
          <${H2}>${t('Slide the window: redundant load and store', 'حرّك الـ window: الـ redundant load and store')}</${H2}>
          <${Fig} name="cc-peep-redundant" />
        `),

        // 28 · constant folding and combine operations
        page(html`
          <${H2}>${t('Do the maths once, at compile time', 'احسبها مرة واحدة، في الـ compile time')}</${H2}>
          <${P} small=${true}>${X('<b>Constant folding</b> simplifies what can be computed at compile time:', 'الـ <b>Constant folding</b> بيبسّط اللي ينفع يتحسب في الـ compile time، زي كده:')}</${P}>
          <${Code} lines=${[['x = 2 * 3;', t('before', 'قبل')], ['x = 6;', t('after', 'بعد')]]} />
          <${P} small=${true}>${X('<b>Combine operations</b> replaces several operations by one equivalent. The slide\'s example:', 'الـ <b>Combine operations</b> بيبدّل كذا operation بواحدة مكافئة. مثال السلايد:')}</${P}>
          <${Code} lines=${['X = (2*3)+5;', 'y = X – Sqrt(3*8);']} />
          <${Reveal} id="fold" label=${t('Show what it can become', 'ورّيني يبقى إيه')}>
            <${Code} lines=${['X = 11;', 'y = 11 – Sqrt(24);']} />
          </${Reveal}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"NOT a method of optimization": the <b>annotated syntax tree</b>. It\'s a data structure. Constant folding and combine operations both are, so "a and b" is right when it asks which <i>is</i> one.',
            'لو السؤال "مش method of optimization" فالإجابة الـ <b>annotated syntax tree</b>، لأنه data structure. أما الـ constant folding والـ combine operations فالاتنين optimization، فـ"a and b" صح لما يسأل أنهي واحد <i>هو</i> optimization.')}</p></${Box}>
        `),

        // 29 · figure
        page(html`
          <${H2}>${t('Folding and combining, step by step', 'الـ folding والـ combining خطوة بخطوة')}</${H2}>
          <${Fig} name="cc-peep-fold" />
        `),

        // 30 · loop optimization
        page(html`
          <${H1}>${t("Loop optimization: don't ask the same question every lap", 'ماتسألش نفس السؤال كل لفّة: الـ loop optimization')}</${H1}>
          <div className="hf-c9-code"><${Code} lines=${['int arr[]={1,2,3,4,5,6,7,8,9,10};', ['for(int i=0;i<arr.length;i++)', t('every lap', 'كل لفّة')], '   System.out.println(arr[i]);']} /></div>
          <${Hand} arrow="down" red=${true}>${t('optimized: arr.length evaluated once (code hoisting)', 'بعد الـ optimization: الـ arr.length بيتحسب مرة واحدة (code hoisting)')}</${Hand}>
          <div className="hf-c9-code"><${Code} lines=${['int arr[]={1,2,3,4,5,6,7,8,9,10};', ['int size = arr.length;', t('once', 'مرة')], 'for(int i=0;i<size;i++)', '   System.out.println(arr[i]);']} /></div>
          <${P} small=${true}>${X('Loop optimization improves <b>cache performance</b> and reduces the <b>overheads</b> of executing loops.', 'الـ loop optimization بيحسّن الـ <b>cache performance</b> وبيقلّل الـ <b>overheads</b> بتاعة تنفيذ الـ loops.')}</${P}>
        `, { sec: t('Loop optimization', 'الـ Loop optimization') }),

        // 31 · figure
        page(html`
          <${Fig} name="cc-loop-hoist" head=${t('Count the evaluations', 'عِدّ مرات الحساب')} />
        `),

        // 32 · the exam version + dumb questions
        page(html`
          <${Box} kind="exam"><p className="hf-p small">${t('"Propose an optimized version of":', 'المطلوب optimized version للكود ده:')}</p></${Box}>
          <${Code} lines=${['for (i=0; i < a->length-1; i++)', '   swap_elements(a[i], a[i+1]);']} />
          <${Reveal} id="swap">
            <${Code} lines=${['int x = a->length-1;', 'for (i=0; i < x; i++)', '   swap_elements(a[i], a[i+1]);']} />
            <p className="hf-p small" style=${{ marginTop: '5px' }}>${X('length-1 is computed <b>once</b> instead of on every iteration, saving processing and time.', 'الـ <bdi dir="ltr">length-1</bdi> بيتحسب <b>مرة واحدة</b> بدل كل iteration، وده بيوفّر processing ووقت.')}</p>
          </${Reveal}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['الـ optimization ممكن يغيّر الـ output؟', 'لأ. لازم يدّي <b>نفس الـ output</b>، بس أقصر وأسرع.'],
            ['هو الـ peephole machine independent؟', 'لأ، هو <b>machine dependent</b>.']
          ] : [
            ['Can optimization change the output?', 'No. Same output, only shorter and faster code.'],
            ['Is peephole optimization machine independent?', 'No, it is <b>machine dependent</b>.']
          ]} />
        `),

        // 33 · match
        page(html`
          <${H2}>${t('Name that optimization', 'سمّي الـ optimization')}</${H2}>
          <${P} small=${true}>${t('Tap a technique, then tap its example.', 'دوس على التكنيك، وبعدين دوس على المثال بتاعه.')}</${P}>
          <div className="hf-c9-x"><${Match} id="opt" left=${['Redundant load and store elimination', 'Constant folding', 'Combine operations', 'Loop optimization', 'Peephole (window)']}
            right=${A ? [
              'السطر <code class="hf-c9-nw">x = 2 * 3;</code> بقى <code class="hf-c9-nw">x = 6;</code>',
              'الـ <code>arr.length</code> بيتحسب مرة واحدة في <code>size</code> قبل الـ loop',
              'المجموعة الصغيرة من الـ instructions اللي الـ optimizer بيبص عليها',
              'شيل <code class="hf-c9-nw">z = i;</code> واكتب <code class="hf-c9-nw">w = y * 3;</code> على طول',
              'كذا operation بقوا قيمة واحدة: <code class="hf-c9-nw">X = (2*3)+5;</code> بقى <code class="hf-c9-nw">X = 11;</code>'
            ] : [
              '<code class="hf-c9-nw">x = 2 * 3;</code> becomes <code class="hf-c9-nw">x = 6;</code>',
              '<code>arr.length</code> computed once into <code>size</code>, before the loop',
              'The small set of instructions the optimizer looks at',
              'Drop <code class="hf-c9-nw">z = i;</code> and write <code class="hf-c9-nw">w = y * 3;</code>',
              'Several operations become one value: <code class="hf-c9-nw">X = (2*3)+5;</code> → <code class="hf-c9-nw">X = 11;</code>'
            ]}
            answer=${[3, 0, 4, 1, 2]} /></div>
        `, { sec: t('Match the optimization', 'وصّل الـ optimization') }),

        // 34–37 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers and revision sheet. Tap an answer to see why.", 'أسئلة حقيقية من امتحانات الدكاترة والـ revision sheet. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m1', /compiler needs .* types of storage/i)}
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${t('Hint: static, stack and…', 'تلميح: static وstack و…')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /dynamically allocated/i)}
          <${Gap} h=${8} />
          ${mq('m3', /uses stack memory allocation for/i)}
        `),
        page(html`
          ${mq('m4', /^The following is a method of optimization/i)}
          <${Gap} h=${8} />
          ${mq('m6', /remove code redundancy/i)}
        `),
        page(html`
          ${mq('m5', /By RESULT, what does main print/i)}
          <${Grow} />
          <${Hand} red=${true}>${X('C-style array this time: a[0], a[1], a[2]. i is 1 at the call, so x is a[1].', 'المرة دي array بتاعة C بتبدأ من <bdi dir="ltr">a[0]</bdi>. والـ i قيمته 1 وقت الـ call، فالـ x هو <bdi dir="ltr">a[1]</bdi>.')}</${Hand}>
        `),

        // 37 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>runtime support system</b> بيعمل الـ allocation والـ de-allocation والبرنامج شغّال.',
            'تلات أنواع storage: الـ <b>static</b> ثابت ومن غير runtime support، والـ <b>stack</b> للـ procedure calls بنظام LIFO وللـ recursion، والـ <b>heap</b> للـ dynamic data structures.',
            'الـ stack والـ heap في الطرفين وبيكبروا ويصغروا ناحية بعض، فمالهمش حجم ثابت.',
            'الـ <b>formal</b> في تعريف الـ function، والـ <b>actual</b> في الـ call.',
            'مثال المحاضرة بعد الـ call:<span class="ltr">value 2 1 0 3 · result 1 1 3 3<br/>value-result 3 1 5 3 · reference 3 1 0 3</span>',
            'الـ <b>peephole</b> machine dependent على window صغيرة: الـ redundant load/store والـ constant folding والـ combine operations.',
            'الـ <b>loop optimization</b> بيحسب حد الـ loop مرة واحدة قبلها.'
          ] : [
            'The <b>runtime support system</b> allocates and de-allocates memory while the program runs.',
            'Three kinds of storage: <b>static</b> (fixed, no runtime support), <b>stack</b> (procedure calls, LIFO, recursion), <b>heap</b> (dynamic data structures).',
            'Stack and heap sit at the two extremes and grow and shrink against each other: no fixed size.',
            '<b>Formal</b> parameters are in the definition; <b>actual</b> ones are in the call.',
            'Lecture example after the call: value 2 1 0 3 · result 1 1 3 3 · value-result 3 1 5 3 · reference 3 1 0 3.',
            '<b>Peephole</b>: machine dependent, a small window: redundant load/store elimination, constant folding, combine operations.',
            '<b>Loop optimization</b> computes the loop bound once, before the loop.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end of the chapter and of the course
        page(html`
          <div className="hf-end">
            <${H1}>${t('You finished Chapter 9, and the whole course!', 'خلّصت الفصل التاسع، والكورس كله!')}</${H1}>
            <${Talk} who="compiler">${t('From characters to tokens, trees and target code, and now a running, faster program: that was the whole trip. Good luck in the final!', 'من characters لـ tokens وtrees وtarget code، ودلوقتي برنامج شغّال وأسرع: دي كانت الرحلة كلها. بالتوفيق في الفاينل!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [9], t: Date.now() } }}>${t('Quiz me on Lecture 9', 'امتحنّي في محاضرة 9')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 9, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 9, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

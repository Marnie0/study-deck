// Head First chapter for Modeling & Simulation Lecture 5 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Random-variate generation: the uniform R assumption, the inverse transform technique (exponential, uniform on [a, b],
// triangular, discrete: empirical table lookup, discrete uniform, Example 5.4, geometric), acceptance-rejection (uniform on
// [1/4, 1]) and Poisson generation by the product method. Every fact comes from the lecture's notes; analogies are marked as
// ours; ‡ marks the slide issues the notes flag (contents numbering, the geometric inequality, 0.166 for 0.160).
// Every number was recomputed with node: −(1/2) ln 0.6 = 0.255, −(1/2) ln 0.4 = 0.458; 3 + 5(0.36) = 4.8; triangular
// R = 0.32 → 0.8, R = 0.82 → 1.4, R = 0.92 → 1.6; shipments 0.73 → 1, 0.80 → 1, 0.50 → 0; ⌈7.8⌉ = 8, ⌈6 × 0.42⌉ = 3,
// ⌈8 × 0.51⌉ = 5; Example 5.4 k = 10, R = 0.73: x = 9.475, X = 9 (F(8) = 0.655 < 0.73 ≤ F(9) = 0.818); geometric
// 3.878 → 4, 0.160 → 1, 1.676 → 2, and p = 1/2, R = 0.8: 2.322 → 3; e^(−0.2) = 0.8187, P = 0.8353, 0.8312(9), 0.6654 → 0, 0, 2;
// our drill: λ = 0.5, R = 0.3: −2 ln 0.7 = 0.713; 2 + 8(0.25) = 4; α = 0.5, e^(−0.5) = 0.6065, P = 0.8, 0.72, 0.504 → N = 2, then 0.35 → N = 0.
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T5 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-ms5')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms5';
    s.textContent = `
.hfb .hf-ms5-sh{ display:block; width:100%; height:auto; }
.hfb .hf-ms5-sh text{ font:600 13px var(--body); fill:var(--ink); }
.hfb .hf-ms5-sh .k{ fill:var(--hf-k); font-weight:800; }
.hfb .hf-ms5-tb{ display:grid; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; direction:ltr; }
.hfb .hf-ms5-tb > span{ padding:4px 7px; font:600 13.5px/1.3 var(--mono); border-top:1px solid var(--hf-grey2); color:var(--ink); text-align:center; white-space:nowrap; }
.hfb .hf-ms5-tb > span.h{ border-top:0; background:var(--hf-grey); font:800 13px/1.3 var(--body); }
.hfb .hf-ms5-tb > span.k{ color:var(--hf-k); font-weight:800; }
.hfb .hf-ms5-gen{ display:grid; gap:7px; }
.hfb .hf-ms5-gen .rw{ border-bottom:1px dotted var(--faint); padding-bottom:6px; }
.hfb .hf-ms5-gen .ask{ font-size:14px; line-height:1.32; margin:0 0 4px; color:var(--ink); }
.hfb .hf-ms5-gen .op{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-ms5-gen .op button{ font:700 13.5px/1 var(--mono); min-height:32px; min-width:52px; padding:0 9px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-ms5-gen .op button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-ms5-gen .rw.ok .op button[aria-pressed="true"]{ border-color:var(--ok); background:var(--ok); }
.hfb .hf-ms5-gen .rw.no .op button[aria-pressed="true"]{ border-color:var(--hf-red); background:var(--hf-red); }
.hfb .hf-ms5-gen .op button.rt{ box-shadow:0 0 0 2px var(--ok); }
.hfb .hf-ms5-gen .wk{ font:600 13px/1.35 var(--mono); margin:4px 0 0; color:var(--hf-hand); text-align:left; }
.hfb .hf-ms5-pd{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-ms5-pd .ask{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); }
.hfb .hf-ms5-pd .now{ font:700 14px/1.4 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; color:var(--ink); direction:ltr; text-align:left; }
.hfb .hf-ms5-pd .bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-ms5-pd .fin{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-ms5-pd .ok{ color:var(--ok); } .hfb .hf-ms5-pd .no{ color:var(--hf-red); }
.hf-ar .hf-ms5-gen .ask, .hf-ar .hf-ms5-pd .ask, .hf-ar .hf-ms5-pd .bad, .hf-ar .hf-ms5-pd .fin{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; font-size:13.5px; }
.hf-ar .hf-ms5-tb > span.h{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ms5-pd .fin{ border-left:0; border-right:3px solid var(--ok); }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: twelve evenly spread R's go in on top, X = −ln(1 − R) (exponential, λ = 1) comes out below
  function Shift() {
    const Rs = Array.from({ length: 12 }, (_, k) => (k + 0.5) / 12);
    const xr = r => 14 + r * 300, xx = x => 14 + x / 3.2 * 300;
    return html`<svg className="hf-ms5-sh hf-in" viewBox="0 0 328 132" role="img" aria-label="Evenly spread random numbers R between 0 and 1 map to exponential values X that bunch up near 0" dir="ltr" style=${{ direction: 'ltr' }}>
      <text x="14" y="14">R: uniform on (0, 1)</text>
      <line x1="14" y1="26" x2="314" y2="26" stroke="var(--graphite)" strokeWidth="1.4" />
      <text x="14" y="41" fill="var(--graphite)">0</text><text x="314" y="41" textAnchor="end">1</text>
      <line x1="14" y1="100" x2="314" y2="100" stroke="var(--graphite)" strokeWidth="1.4" />
      ${[0, 1, 2, 3].map(v => html`<text key=${v} x=${xx(v)} y="116" textAnchor=${v ? 'middle' : 'start'}>${v}</text>`)}
      <text x="314" y="130" textAnchor="end" className="k">X = −ln(1 − R): exponential, λ = 1</text>
      ${Rs.map((r, k) => { const x = -Math.log(1 - r); return html`<g key=${k} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.2 + k * 0.1) + 's' }}>
        <line x1=${xr(r)} y1="26" x2=${xx(x)} y2="100" stroke="var(--hf-k)" strokeWidth="1.3" opacity=".55" />
        <circle cx=${xr(r)} cy="26" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.8" />
        <circle cx=${xx(x)} cy="100" r="4" fill="var(--hf-k)" /></g>`; })}
    </svg>`;
  }

  // a small table of numbers (always left to right)
  const Tb = ({ head, rows, hi }) => html`<div className="hf-ms5-tb hf-in" style=${{ gridTemplateColumns: 'repeat(' + head.length + ', auto)' }}>
    ${head.map((h, j) => html`<span key=${'h' + j} className="h">${h}</span>`)}
    ${rows.map((r, i) => r.map((c, j) => html`<span key=${i + '-' + j} className=${hi != null && j === hi ? 'k' : ''}>${c}</span>`))}</div>`;

  // Be the generator: each row is a distribution and an R; tap the X it generates. Every option is a real slip.
  function Gen({ id, rows }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => pick[i] === r.a).length;
    return html`<div className="hf-ms5-gen hf-in">
      ${rows.map((r, i) => { const p = pick[i], st = checked && p != null ? (p === r.a ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'rw' + st}>
          <p className="ask">${T5(ar ? r.ar : r.en)}</p>
          <div className="op" dir="ltr">${r.o.map((o, j) => html`<button key=${j} aria-pressed=${String(p === j)} className=${checked && j === r.a ? 'rt' : ''} onClick=${() => { setPick(Object.assign({}, pick, { [i]: j })); setChecked(false); }}>${o}</button>`)}</div>
          ${checked && p != null && html`<p className="wk" dir="ltr">${r.w}</p>`}
        </div>`; })}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; rows.forEach((r, i) => { p[i] = r.a; }); setPick(p); setChecked(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi>${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }
  const GEN1 = [
    { en: 'Exponential, <b>λ = 0.5</b>, R = 0.3, using (5.1): X = −(1/λ) ln(1 − R)', ar: 'الـ exponential بـ <bdi dir="ltr">λ = 0.5</bdi> و<bdi dir="ltr">R = 0.3</bdi>، بمعادلة (5.1)',
      o: ['0.178', '0.713', '2.408'], a: 1, w: 'X = −2 ln(0.7) = 2 × 0.357 = 0.713' },
    { en: 'Uniform on <b>[2, 10]</b>, R = 0.25: X = a + (b − a)R', ar: 'الـ uniform على <bdi dir="ltr">[2, 10]</bdi> و<bdi dir="ltr">R = 0.25</bdi>',
      o: ['2', '2.5', '4'], a: 2, w: 'X = 2 + 8 × 0.25 = 2 + 2 = 4' },
    { en: 'Triangular on (0, 2), mode 1, <b>R = 0.92</b>', ar: 'الـ triangular على <bdi dir="ltr">(0, 2)</bdi> والـ mode عند 1، و<bdi dir="ltr">R = 0.92</bdi>',
      o: ['0.4', '1.356', '1.6'], a: 2, w: 'R > 1/2: X = 2 − √(2 × 0.08) = 2 − 0.4 = 1.6' }
  ];
  const GEN2 = [
    { en: 'Shipments (Example 5.2: F = 0.5, 0.8, 1.0 at x = 0, 1, 2), <b>R = 0.50</b>', ar: 'الشحنات بتاعة مثال 5.2 و<bdi dir="ltr">R = 0.50</bdi>',
      o: ['0', '1', '2'], a: 0, w: 'R = 0.50 ≤ r1 = 0.5, so X = x1 = 0' },
    { en: 'Discrete uniform on {1, …, 8}, <b>R = 0.51</b>: X = ⌈Rk⌉', ar: 'الـ discrete uniform على <bdi dir="ltr">{1, …, 8}</bdi> و<bdi dir="ltr">R = 0.51</bdi>',
      o: ['4', '4.08', '5'], a: 2, w: 'Rk = 0.51 × 8 = 4.08, X = ⌈4.08⌉ = 5' },
    { en: 'Geometric on {1, 2, …} with <b>p = 1/2</b> (q = 1), <b>R = 0.8</b>', ar: 'الـ geometric على <bdi dir="ltr">{1, 2, …}</bdi> بـ <bdi dir="ltr">p = 1/2</bdi> و<bdi dir="ltr">q = 1</bdi>، و<bdi dir="ltr">R = 0.8</bdi>',
      o: ['2', '3', '4'], a: 1, w: 'ln 0.2 / ln 0.5 = 2.322; X = 1 + ⌈1.322⌉ = 3' }
  ];

  // Be the Poisson generator: α = 0.5 (e^(−0.5) = 0.6065), random numbers 0.8, 0.9, 0.7, then 0.35. Our own numbers.
  const PD = [{ v: 1, n: 0, r: '0.8', P: '0.8', acc: 0 }, { v: 1, n: 1, r: '0.9', P: '0.72', acc: 0 }, { v: 1, n: 2, r: '0.7', P: '0.504', acc: 1 }, { v: 2, n: 0, r: '0.35', P: '0.35', acc: 1 }];
  function PoisDrill({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, 0);
    const [bad, setBad] = useState(null);
    const done = k >= PD.length, c = PD[k];
    const prev = c ? (c.n === 0 ? '1' : PD[k - 1].P) : '';
    const choose = acc => { if (acc === c.acc) { setK(k + 1); setBad(null); } else setBad(c.acc ? 'acc' : 'rej'); };
    return html`<div className="hf-ms5-pd hf-in">
      <${Tb} head=${['N#', 'n', 'R(n+1)', 'P', ar ? 'النتيجة' : 'result']} rows=${PD.slice(0, k).map(d => [d.v, d.n, d.r, d.P, d.acc ? 'N = ' + d.n : (ar ? 'رفض' : 'reject')])} hi=${3} />
      ${!done && html`<p className="ask">${ar ? T5('الـ variate رقم ' + c.v + (c.n === 0 ? '، والخطوة 1 خلّت <bdi dir="ltr">n = 0, P = 1</bdi>. ' : '. ') + 'الخطوة 2 ولّدت R جديدة:') : T5('Variate ' + c.v + (c.n === 0 ? ', Step 1 set n = 0, P = 1. ' : '. ') + 'Step 2 draws a new R:')}</p>
        <div className="now">n = ${c.n}, R = ${c.r}, P = ${prev} × ${c.r} = ${c.P}</div>
        <div className="hf-row">
          <button className="hf-btn" onClick=${() => choose(1)}>${ar ? html`اقبل <bdi dir="ltr">N = ${c.n}</bdi>` : 'Accept N = ' + c.n}</button>
          <button className="hf-btn" onClick=${() => choose(0)}>${ar ? html`ارفض، و<bdi dir="ltr">n = ${c.n + 1}</bdi>` : 'Reject, n = ' + (c.n + 1)}</button>
          <button className="hf-btn" onClick=${() => { setK(PD.length); setBad(null); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        </div>
        ${bad && html`<p className="bad">${bad === 'acc' ? (ar ? T5('الـ P بقت أصغر من <bdi dir="ltr">0.6065</bdi> خلاص، يبقى نقبل.') : 'P is already below e^(−0.5) = 0.6065, so accept.') : (ar ? T5('الـ P لسه أكبر من أو تساوي <bdi dir="ltr">0.6065</bdi>، يبقى نرفض ونكمّل.') : 'P is still ≥ e^(−0.5) = 0.6065, so reject and go on.')}</p>`}`}
      ${done && html`<p className="fin">${ar ? T5('طلعوا <b>N = 2</b> و<b>N = 0</b> بـ <b>4 random numbers</b>:<span class="ltr">(2 + 1) + (0 + 1) = 4</span>') : T5('<b>N = 2</b> and <b>N = 0</b>, using <b>4 random numbers</b>:<span style="display:block;white-space:nowrap">(2 + 1) + (0 + 1) = 4</span>')}</p>
        <div className="hf-row"><button className="hf-btn" onClick=${() => { setK(0); setBad(null); }}>${ar ? 'من الأول' : 'Start again'}</button></div>`}
    </div>`;
  }

  H.chapters.ms[5] = {
    title: 'Random-Variate Generation',
    kicker: 'Chapter 5',
    run: 'random-variate generation',
    ar: { title: 'توليد الـ Random Variates', kicker: 'الفصل 5', run: 'توليد الـ random variates' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 5);
      const arL = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[5]) || {};
      const arQuiz = arL.quiz || [];
      const find = (re, doc) => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && (doc ? !!x.src : !x.src)); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = find(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const L = s => `<span class="ltr">${s}</span>`;
      const M = s => html`<bdi dir="ltr">${s}</bdi>`;   // a math note beside a code line
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("Last chapter you built a machine that spits out random numbers <b>R</b>, uniform on (0, 1), and you tested them. Nice. But a bank's interarrival times aren't uniform, and neither is the number of shipments on a dock. This chapter turns plain R's into <b>any</b> distribution you need. The facts are all from the lecture notes.",
            'الفصل اللي فات عملت مكنة بتطلّع random numbers اسمها <b>R</b>، uniform على <bdi dir="ltr">(0, 1)</bdi>، وعملتلها tests. حلو. بس الـ interarrival times في بنك مش uniform، ولا عدد الشحنات على الرصيف. الفصل ده بيحوّل الـ R العادية لـ <b>أي</b> distribution إنت عايزه. وكل المعلومات من نوتس المحاضرة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You generate the variates yourself, right on the page.', '<b>حل التمارين.</b> إنت اللي هتولّد الـ variates بنفسك على الصفحة.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف وفكّر.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are the traps: wrong branch, wrong rounding, wrong sign.', '<b>خلّي بالك!</b> دي الفخاخ: الفرع الغلط، التقريب الغلط، الإشارة الغلط.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers what you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slip in the notes, and what was meant.', 'معناها فيه غلطة في النوتس، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات مننا، مش من النوتس.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">5</span><span className="t">${A ? html`الفصل الخامس<br/>Modeling & Simulation` : html`Chapter five<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Random Numbers in Disguise', 'أرقام عشوائية متنكّرة')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('random-variate generation', 'توليد الـ random variates')}</p></div>
          <${Talk} who="dice">${X("I only know one trick: a number between 0 and 1, every value equally likely.", 'أنا عندي حركة واحدة بس: رقم بين 0 و1، وكل القيم ليها نفس الفرصة.')}</${Talk}>
          <${Talk} who="cust" flip=${true}>${X("But I arrive <b>exponentially</b>! Most gaps are short, a few are long.", 'بس أنا بوصل <b>exponential</b>! معظم الفترات قصيرة، وشوية طوال.')}</${Talk}>
          <${Shift} />
        `, { sec: t('Meet the variates', 'اتعرّف على الـ variates') }),

        // 2 · the assumption and the plan
        page(html`
          <${Def}>${X('<b>Random-variate generation</b>: turning uniform random numbers R into values X that follow a desired distribution.', 'الـ <b>random variate generation</b> يعني ناخد الـ uniform random numbers <bdi dir="ltr">R</bdi> ونحوّلها لقيم <bdi dir="ltr">X</bdi> ماشية على الـ distribution اللي إحنا عايزينه.')}</${Def}>
          <${P} small=${true}>${X('Every technique in the chapter <b>assumes that uniform (0, 1) random numbers R1, R2, … are readily available</b>. That is Chapter 4’s product:', 'كل الطرق في الفصل <b>بتفترض إن الـ uniform random numbers على <bdi dir="ltr">(0, 1)</bdi> موجودة وجاهزة</b>، ودي اللي عملناها في الفصل الرابع:')}</${P}>
          <${Code} lines=${[['f_R(x) = 1,  0 ≤ x ≤ 1', t('pdf: flat', 'الـ pdf: مسطّح')], ['F_R(x) = x,  0 ≤ x ≤ 1', t('cdf: a straight line', 'الـ cdf: خط مستقيم')]]} />
          <${P} small=${true}>${t('Two techniques, and what each one makes:', 'طريقتين، وكل واحدة بتولّد إيه:')}</${P}>
          <${UL} items=${A ? ['الـ <b>inverse transform</b>: الـ exponential والـ uniform والـ triangular والـ discrete (الـ empirical والـ discrete uniform والـ geometric).', 'الـ <b>acceptance-rejection</b>: الـ Poisson distribution.']
            : ['<b>Inverse transform</b>: exponential, uniform, triangular, discrete (empirical, discrete uniform, geometric).', '<b>Acceptance-rejection</b>: the Poisson distribution.']} />
          <${Grow} />
          <${P} small=${true}>${X('‡ The contents page numbers the two techniques "5.3" and "5.4" (and Poisson "5.2 1"); the text numbers them <b>5.1</b>, <b>5.2</b> and <b>5.2.1</b>. We follow the text.', '‡ صفحة المحتويات بترقّم الطريقتين <bdi dir="ltr">"5.3"</bdi> و<bdi dir="ltr">"5.4"</bdi> (والـ Poisson <bdi dir="ltr">"5.2 1"</bdi>)، بس الكلام نفسه بيرقّمهم <b>5.1</b> و<b>5.2</b> و<b>5.2.1</b>. وإحنا ماشيين بترقيم الكلام.')}</${P}>
        `),

        // 3 · the inverse transform idea
        page(html`
          <${H1}>${t('The inverse transform: run the cdf backwards', 'الـ inverse transform: امشي على الـ cdf بالعكس')}</${H1}>
          <${P}>${X('A cdf takes an x and gives you a number between 0 and 1. A random number R <i>is</i> a number between 0 and 1. So turn the cdf around:', 'الـ cdf بياخد x ويديك رقم بين 0 و1. والـ random number <bdi dir="ltr">R</bdi> هو أصلًا رقم بين 0 و1. يبقى نلف الـ cdf بالعكس:')}</${P}>
          <${UL} items=${A ? ['من الـ pdf أو الـ pmf، <b>هات الـ cdf</b> <bdi dir="ltr">F(X)</bdi>.', '<b>ساويه بالـ R</b>:' + L('F(X) = R'), '<b>حل لـ X</b>:' + L('X = F⁻¹(R)')]
            : ['From the pdf/pmf, <b>find the cdf F(X)</b>.', '<b>Set F(X) = R</b>, where R is a random number.', '<b>Solve for X</b>: X = F⁻¹(R).']} />
          <${Box} kind="watch"><p className="hf-p small">${X('F⁻¹ is <b>the solution of the equation R = F(X) in terms of R</b>. It is <b>not 1/f</b>, and not 1/F either. "Inverse" here means undoing F, not flipping a fraction.',
            'الـ <bdi dir="ltr">F⁻¹</bdi> هي <b>حل المعادلة <bdi dir="ltr">R = F(X)</bdi> بدلالة R</b>، و<b>مش <bdi dir="ltr">1/f</bdi></b> ولا <bdi dir="ltr">1/F</bdi>. يعني نفك الـ F، مش نقلب كسر.')}</p></${Box}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why would a <b>uniform</b> R be the right thing to feed into F⁻¹? Hint: what kind of random variable is F(X) itself?', 'ليه بندخّل R <b>uniform</b> على الـ <bdi dir="ltr">F⁻¹</bdi>؟ تلميح: الـ <bdi dir="ltr">F(X)</bdi> نفسها نوعها إيه؟')}</p></${Box}>
        `, { sec: t('Inverse transform', 'الـ Inverse transform') }),

        // 4 · exponential: the distribution
        page(html`
          <${H1}>${t('Exponential: the one the notes do in detail', 'الـ exponential: اللي النوتس شرحته بالتفصيل')}</${H1}>
          <${Code} lines=${[['f(x) = λ e^(−λx),  x ≥ 0', t('pdf', 'الـ pdf')], ['F(x) = 1 − e^(−λx),  x ≥ 0', t('cdf', 'الـ cdf')], ['E(Xi) = 1/λ', t('mean', 'الـ mean')]]} />
          <${P} small=${true}>${X('<b>λ</b> is the <b>mean number of occurrences per unit time</b>. Example 5.1: if interarrival times X1, X2, X3, … are exponential with rate λ, then λ is the mean number of <b>arrivals</b> per unit time, and <b>E(Xi) = 1/λ</b> is the <b>mean interarrival time</b>.',
            'الـ <bdi dir="ltr">λ</bdi> هي <b>متوسط عدد مرات الحدوث في وحدة الزمن</b>. مثال 5.1: لو الـ interarrival times ماشيين exponential بـ rate <bdi dir="ltr">λ</bdi>، يبقى <bdi dir="ltr">λ</bdi> متوسط عدد الـ <b>arrivals</b> في وحدة الزمن، والـ <b>mean interarrival time</b> هو:' + L('E(Xi) = 1/λ'))}</${P}>
          <${Talk} who="clock">${X('λ = 2 arrivals per minute? Then on average I tick <b>1/2 a minute</b> between them.', 'لو <bdi dir="ltr">λ = 2</bdi> arrivals في الدقيقة، يبقى في المتوسط بعدّ <b>نص دقيقة</b> بين كل واحد والتاني.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('λ is a rate (per unit time); 1/λ is a time. Don’t swap them.', 'الـ λ ده rate (في وحدة الزمن)، والـ 1/λ ده وقت. متبدّلهمش.')}</${Hand}>
        `, { sec: t('Exponential', 'الـ Exponential') }),

        // 5 · exponential: the four steps
        page(html`
          <${H2}>${t('The four-step procedure', 'الخطوات الأربعة')}</${H2}>
          <${UL} items=${A ? ['<b>الخطوة 1</b>: احسب الـ cdf:' + L('F(x) = 1 − e^(−λx),  x ≥ 0'), '<b>الخطوة 2</b>: خلّي الـ cdf يساوي R. وبما إن X عشوائي، يبقى الـ cdf ده نفسه random variable <b>uniform على <bdi dir="ltr">(0, 1)</bdi></b>.', '<b>الخطوة 3</b>: حل لـ X:']
            : ['<b>Step 1</b>: compute the cdf: F(x) = 1 − e^(−λx), x ≥ 0.', '<b>Step 2</b>: set F(X) = R: 1 − e^(−λX) = R. Since X is random, 1 − e^(−λX) is a random variable too, <b>uniformly distributed on (0, 1)</b>.', '<b>Step 3</b>: solve for X:']} />
          <${Code} lines=${['1 − e^(−λX) = R', 'e^(−λX) = 1 − R', ['−λX = ln(1 − R)', t('take ln of both sides', 'ناخد ln للطرفين')], ['X = −(1/λ) ln(1 − R)', M('(5.1)')]]} />
          <${P} small=${true}>${X('Equation (5.1) is called a <b>random variate generator</b> for the exponential, written X = F⁻¹(R).', 'المعادلة (5.1) اسمها <b>random variate generator</b> للـ exponential، وبتتكتب <bdi dir="ltr">X = F⁻¹(R)</bdi>.')}</${P}>
          <${UL} items=${A ? ['<b>الخطوة 4</b>: ولّد <bdi dir="ltr">R1, R2, R3, …</bdi> واحسب:' + L('Xi = F⁻¹(Ri) = −(1/λ) ln(1 − Ri)')] : ['<b>Step 4</b>: generate R1, R2, R3, … and compute Xi = F⁻¹(Ri) = −(1/λ) ln(1 − Ri).']} />
          <${Grow} />
          <${Hand} red=${true}>${t('the minus sign is not decoration: ln(1 − R) < 0, so −(1/λ) ln(1 − R) ≥ 0', 'علامة السالب مش زينة: ln(1 − R) سالب، فالـ X بتطلع موجبة')}</${Hand}>
        `),

        // 6 · figure
        page(html`
          <${H2}>${t('Read R across, drop down to X', 'اقرا الـ R بالعرض، وانزل للـ X')}</${H2}>
          <${Fig} name="ms-exp-inv" />
        `),

        // 7 · (5.2)
        page(html`
          <${H2}>${t('A shortcut: (5.2)', 'اختصار: المعادلة (5.2)')}</${H2}>
          <${Code} lines=${[['Xi = −(1/λ) ln(1 − Ri)', M('(5.1)')], ['Xi = −(1/λ) ln Ri', M('(5.2)')]]} />
          <${P} small=${true}>${X('(5.2) replaces 1 − Ri by Ri. <b>Justified because both 1 − Ri and Ri are uniformly distributed on (0, 1).</b>', 'المعادلة (5.2) بتحط <bdi dir="ltr">Ri</bdi> مكان <bdi dir="ltr">1 − Ri</bdi>. <b>وده مسموح لأن الاتنين uniform على <bdi dir="ltr">(0, 1)</bdi>.</b>')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Same R, <b>different X</b>. With λ = 2 and R = 0.4: (5.1) gives −0.5 ln 0.6 = <b>0.255</b>, (5.2) gives −0.5 ln 0.4 = <b>0.458</b>. Both streams still have the <b>same exponential distribution</b>. If the exam names (5.1), use 1 − R.',
            'نفس الـ R بتدّي <b>X مختلفة</b>. مع <bdi dir="ltr">λ = 2</bdi> و<bdi dir="ltr">R = 0.4</bdi>:' + L('(5.1):  −0.5 ln 0.6 = 0.255') + L('(5.2):  −0.5 ln 0.4 = 0.458') + 'بس السلسلتين ليهم <b>نفس الـ exponential distribution</b>. ولو الامتحان قال (5.1)، استخدم <bdi dir="ltr">1 − R</bdi>.')}</p></${Box}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['أقسم على λ ولا أضرب فيها؟', '<b>أقسم</b>. المعامل هو <bdi dir="ltr">1/λ</bdi>. مع <bdi dir="ltr">λ = 0.5</bdi> بتضرب في 2.']
          ] : [
            ['Divide by λ or multiply by it?', '<b>Divide</b>. The factor is 1/λ. With λ = 0.5 you multiply by 2.']
          ]} />
        `),

        // 8 · uniform on [a, b]
        page(html`
          <${H1}>${t('Uniform on [a, b]: the formula you could guess', 'الـ uniform على [a, b]: المعادلة اللي ممكن تخمّنها')}</${H1}>
          <${P} small=${true}>${X('pdf f(x) = 1/(b − a) for a ≤ x ≤ b. A valid guess is X = a + (b − a)R. The same three steps prove it:', 'الـ pdf هو <bdi dir="ltr">1/(b − a)</bdi> على الفترة. التخمين الصح هو <bdi dir="ltr">X = a + (b − a)R</bdi>، ونفس الخطوات بتثبته:')}</${P}>
          <${Code} lines=${[['F(x) = 0,  x < a', t('step 1', 'الخطوة 1')], 'F(x) = (x − a)/(b − a),  a ≤ x ≤ b', 'F(x) = 1,  x > b', ['(X − a)/(b − a) = R', t('step 2', 'الخطوة 2')], ['X − a = R(b − a)', t('step 3', 'الخطوة 3')], ['X = a + (b − a)R', M('(5.3)')]]} />
          <${Talk} who="dev">${X('So for [3, 8] and R = 0.36 it’s 3 + 5 × 0.36 = <b>4.8</b>?', 'يعني على <bdi dir="ltr">[3, 8]</bdi> و<bdi dir="ltr">R = 0.36</bdi> تبقى <bdi dir="ltr">3 + 5 × 0.36</bdi> يعني <b>4.8</b>؟')}</${Talk}>
          <${Talk} who="dice" flip=${true}>${X('Exactly. Stretch me by (b − a), then slide me to start at a.', 'بالظبط. مطّني بـ <bdi dir="ltr">(b − a)</bdi>، وبعدين زقّني أبدأ من a.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('forgetting “a +” gives 1.8, a classic slip', 'لو نسيت "a +" هتطلع 1.8، غلطة مشهورة')}</${Hand}>
        `, { sec: t('Uniform', 'الـ Uniform') }),
        page(html`
          <${H2}>${t('Try your own a, b and R', 'جرّب a وb وR بتوعك')}</${H2}>
          <${Fig} name="ms-unif-inv" />
        `),

        // 10 · triangular pdf
        page(html`
          <${H1}>${t('Triangular: one formula isn’t enough', 'الـ triangular: معادلة واحدة مش كفاية')}</${H1}>
          <${Code} lines=${[['f(x) = x,      0 ≤ x ≤ 1', ''], ['f(x) = 2 − x,  1 < x ≤ 2', ''], ['f(x) = 0,      otherwise', '']]} />
          <${P} small=${true}>${X('Figure 5.1: a triangle rising from (0, 0) to a peak of height 1 at x = 1 and back to 0 at x = 2: <b>endpoints (0, 2), mode at 1</b>.', 'الشكل 5.1: مثلث طالع من <bdi dir="ltr">(0, 0)</bdi> لقمة ارتفاعها 1 عند <bdi dir="ltr">x = 1</bdi> ونازل لـ 0 عند <bdi dir="ltr">x = 2</bdi>: يعني <b>الأطراف <bdi dir="ltr">(0, 2)</bdi> والـ mode عند 1</b>.')}</${P}>
          <${Talk} who="dev">${X('A cdf made of two pieces? Then R has to pick a piece first.', 'الـ cdf طالع حتتين؟ يبقى الـ R لازم تختار الحتة الأول.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('area under the triangle: ½ × 2 × 1 = 1, as a pdf must be (ours)', 'مساحة المثلث ½ × 2 × 1 = 1، زي أي pdf (من عندنا)')}</${Hand}>
        `, { sec: t('Triangular', 'الـ Triangular') }),
        page(html`
          <${H2}>${t('Figure 5.1: the triangular density', 'الشكل 5.1: كثافة الـ triangular')}</${H2}>
          <${Fig} name="ms-tri-pdf" />
        `),

        // 11 · triangular cdf and inverse
        page(html`
          <${H2}>${t('Two pieces of cdf, two generators', 'الـ cdf حتتين، يبقى generator اتنين')}</${H2}>
          <${Code} lines=${[['F(x) = x²/2,           0 < x ≤ 1', ''], ['F(x) = 1 − (2 − x)²/2,  1 < x ≤ 2', '']]} />
          <${UL} items=${A ? ['لو <bdi dir="ltr">0 ≤ X ≤ 1</bdi>: <bdi dir="ltr">R = X²/2</bdi> (5.4)، يعني <b><bdi dir="ltr">0 ≤ R ≤ 1/2</bdi></b>، يبقى:' + L('X = √(2R)'), 'لو <bdi dir="ltr">1 ≤ X ≤ 2</bdi>: معادلة (5.5)، يعني <b><bdi dir="ltr">1/2 ≤ R ≤ 1</bdi></b>، يبقى:' + L('R = 1 − (2 − X)²/2   ⇒   X = 2 − √(2(1 − R))')]
            : ['For 0 ≤ X ≤ 1: R = X²/2 (5.4), so <b>0 ≤ R ≤ 1/2</b> and X = √(2R).', 'For 1 ≤ X ≤ 2: R = 1 − (2 − X)²/2 (5.5), so <b>1/2 ≤ R ≤ 1</b> and X = 2 − √(2(1 − R)).']} />
          <${Code} lines=${[['X = √(2R),            0 ≤ R ≤ 1/2', ''], ['X = 2 − √(2(1 − R)),  1/2 < R ≤ 1', '']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Look at R first</b> to choose the branch. R = 0.82 > 1/2: X = 2 − √0.36 = <b>1.4</b> (not √1.64 = 1.28). R = 0.32 ≤ 1/2: X = √0.64 = <b>0.8</b>. Check: R = 1/2 gives X = 1 from both, the mode.',
            '<b>بص على الـ R الأول</b> عشان تختار الفرع.' + L('R = 0.82 > 1/2:  X = 2 − √0.36 = 1.4') + 'مش <bdi dir="ltr">√1.64 = 1.28</bdi>.' + L('R = 0.32 ≤ 1/2:  X = √0.64 = 0.8') + 'وللتأكد: <bdi dir="ltr">R = 1/2</bdi> بتدّي <bdi dir="ltr">X = 1</bdi> من الفرعين، وده الـ mode.')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Slide R across the half-way line', 'حرّك الـ R وعدّي خط النص')}</${H2}>
          <${Fig} name="ms-tri-inv" />
        `),

        // 13 · exercise: continuous
        page(html`
          <${Box} kind="pencil" title=${t('Be the generator', 'خليك إنت الـ generator')}><p className="hf-p small">${t('A distribution and an R in each row. Tap the X it generates.', 'في كل سطر distribution وR. دوس على الـ X اللي بتطلع.')}</p></${Box}>
          <${Gen} id="g1" rows=${GEN1} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 14 · discrete: empirical
        page(html`
          <${H1}>${t('Discrete: the shipments on the dock', 'الـ discrete: الشحنات على الرصيف')}</${H1}>
          <${P} small=${true}>${X('Discrete distributions can be generated by the inverse transform <b>numerically (table lookup)</b> or <b>algebraically (formula)</b>. First, an empirical one, Example 5.2:', 'الـ discrete distributions ممكن نولّدها بالـ inverse transform يا إما <b>numerically (بالـ table lookup)</b> يا إما <b>algebraically (بمعادلة)</b>. نبدأ بـ empirical، مثال 5.2:')}</${P}>
          <${P} small=${true}>${X('At the end of the day, the loading dock of ABC Company has <b>0, 1 or 2 shipments</b>, with relative frequencies <b>0.50, 0.30 and 0.20</b>. Consultants must generate X, the number of shipments each day.', 'في آخر اليوم، رصيف التحميل في شركة ABC بيبقى عليه <b>0 أو 1 أو 2 شحنة</b>، بـ relative frequencies <b>0.50 و0.30 و0.20</b>. والاستشاريين عايزين يولّدوا X، عدد الشحنات كل يوم.')}</${P}>
          <${Tb} head=${['x', 'p(x)', 'F(x)']} rows=${[['0', '0.50', '0.50'], ['1', '0.30', '0.80'], ['2', '0.20', '1.00']]} hi=${2} />
          <${Talk} who="disk">${X('A discrete cdf is <b>horizontal line segments</b> with <b>jumps of size p(x)</b>: 0.5 at x = 0, 0.3 at x = 1, 0.2 at x = 2.', 'الـ cdf بتاع الـ discrete عبارة عن <b>خطوط أفقية</b> فيها <b>jumps حجمها <bdi dir="ltr">p(x)</bdi></b>: 0.5 عند 0، و0.3 عند 1، و0.2 عند 2.')}</${Talk}>
        `, { sec: t('Discrete: table lookup', 'الـ Discrete: الـ table lookup') }),
        page(html`
          <${H2}>${t('Way 1: graphically (Figure 5.2)', 'الطريقة 1: بالرسم (الشكل 5.2)')}</${H2}>
          <${P} small=${true}>${X('Find R1 = 0.73 on the vertical axis, go across until you hit a <b>jump</b>, drop down: X1 = 1.', 'حدّد <bdi dir="ltr">R1 = 0.73</bdi> على المحور الرأسي، وامشي أفقي لحد ما تخبط في <b>jump</b>، وانزل: <bdi dir="ltr">X1 = 1</bdi>.')}</${P}>
          <${Fig} name="ms-ship-cdf" />
        `),

        // 16 · table lookup
        page(html`
          <${H2}>${t('Way 2: the table-lookup procedure', 'الطريقة 2: الـ table lookup')}</${H2}>
          <${P} small=${true}>${X('Find the interval that holds R:', 'دوّر على الفترة اللي فيها الـ R:')}</${P}>
          <${Code} lines=${[['r(i−1) < R ≤ ri  ⇒  X = xi', ''], ['ri = F(xi)', ''], ['rk = p(x1) + … + p(xk)', t('cumulative', 'تراكمي')], ['r0 = 0,  x0 = −∞', '']]} />
          <${P} small=${true}>${X('Here n = 3, x1 = 0, x2 = 1, x3 = 2, so r1 = 0.5, r2 = 0.8, r3 = 1.0:', 'هنا <bdi dir="ltr">n = 3</bdi> والقيم 0 و1 و2، يبقى <bdi dir="ltr">r1 = 0.5, r2 = 0.8, r3 = 1.0</bdi>:')}</${P}>
          <${Code} lines=${['X = 0   if  R ≤ 0.5', 'X = 1   if  0.5 < R ≤ 0.8', 'X = 2   if  0.8 < R ≤ 1.0']} />
          <${P} small=${true}>${X('R1 = 0.73: r1 = 0.5 < 0.73 ≤ r2 = 0.8, so <b>X1 = x2 = 1</b>.', 'الـ R1 بتساوي 0.73 وواقعة بين r1 وr2، يبقى:' + L('0.5 < 0.73 ≤ 0.8   ⇒   X1 = x2 = 1'))}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('The intervals are <b>open on the left, closed on the right</b>. R = 0.80 gives <b>X = 1</b> (0.80 ≤ 0.8), not 2. R = 0.50 gives <b>X = 0</b>.', 'الفترات <b>مفتوحة من الشمال ومقفولة من اليمين</b>. يعني <bdi dir="ltr">R = 0.80</bdi> بتدّي <b><bdi dir="ltr">X = 1</bdi></b> مش 2، و<bdi dir="ltr">R = 0.50</bdi> بتدّي <b><bdi dir="ltr">X = 0</bdi></b>.')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Table 5.2 and the interval bar', 'جدول 5.2 وشريط الفترات')}</${H2}>
          <${Fig} name="ms-ship-lookup" />
        `),

        // 18 · discrete uniform
        page(html`
          <${H1}>${t('Discrete uniform: round up', 'الـ discrete uniform: قرّب لفوق')}</${H1}>
          <${P} small=${true}>${X('Example 5.3: p(x) = 1/k on {1, 2, …, k}. With xi = i, the cumulative sums are ri = F(xi) = i/k and F(x(i−1)) = (i − 1)/k. The lookup rule becomes:', 'مثال 5.3: الـ pmf هو <bdi dir="ltr">1/k</bdi> على <bdi dir="ltr">{1, 2, …, k}</bdi>. ولو <bdi dir="ltr">xi = i</bdi>، يبقى <bdi dir="ltr">ri = i/k</bdi>. وقاعدة الـ lookup بتبقى:')}</${P}>
          <${Code} lines=${[['(i − 1)/k < R ≤ i/k', M('(5.6)')], ['i − 1 < Rk ≤ i', t('× k', 'اضرب في k')], ['Rk ≤ i < Rk + 1', ''], ['X = ⌈Rk⌉', t('round Rk up', 'قرّب Rk لفوق')]]} />
          <${P} small=${true}>${X('The notes’ example: Rk = 7.8 gives X = ⌈7.8⌉ = <b>8</b>. A die (k = 6) with R = 0.42: Rk = 2.52, X = <b>3</b>.', 'مثال النوتس: <bdi dir="ltr">Rk = 7.8</bdi> بتدّي <bdi dir="ltr">⌈7.8⌉ = 8</bdi>. وزهر (<bdi dir="ltr">k = 6</bdi>) مع <bdi dir="ltr">R = 0.42</bdi>:' + L('Rk = 2.52,   X = ⌈2.52⌉ = 3'))}</${P}>
          <${Grow} />
          <${Talk} who="dice" flip=${true}>${X('Never round me <b>down</b>: ⌈ ⌉ is the ceiling, and X is never 0.', 'أوعى تقرّبني <b>لتحت</b>: الـ <bdi dir="ltr">⌈ ⌉</bdi> دي ceiling، والـ X عمرها ما تبقى 0.')}</${Talk}>
        `, { sec: t('Discrete uniform', 'الـ Discrete uniform') }),
        page(html`
          <${H2}>${t('Each value gets a slice of width 1/k', 'كل قيمة ليها حتة عرضها 1/k')}</${H2}>
          <${Fig} name="ms-dunif" />
        `),

        // 20 · Example 5.4
        page(html`
          <${H1}>${t('Example 5.4: a formula from the quadratic', 'مثال 5.4: معادلة من الـ quadratic')}</${H1}>
          <${P} small=${true}>${X('pmf p(x) = 2x/(k(k + 1)) for x = 1, 2, …, k. Bigger x, bigger chance.', 'الـ pmf هو <bdi dir="ltr">2x/(k(k + 1))</bdi> لـ <bdi dir="ltr">x = 1, 2, …, k</bdi>. كل ما الـ x تكبر، الفرصة تكبر.')}</${P}>
          <${Code} lines=${['F(x) = x(x+1) / (k(k+1))', '(x−1)x < k(k+1)R ≤ x(x+1)', ['x² − x − k(k+1)R = 0', M('(1)')], 'x = (1 + √(1 + 4(k²+k)R)) / 2', ['X = ⌈x − 1⌉', t('round up', 'لفوق')]]} />
          <${P} small=${true}>${X('The cdf sums 2i/(k(k + 1)) from 1 to x. Line (1) takes the left inequality as an equation; the quadratic formula (a = 1, b = −1, c = −k(k + 1)R) keeps only the positive root.', 'الـ cdf هو مجموع <bdi dir="ltr">2i/(k(k + 1))</bdi> من 1 لـ x. السطر (1) بياخد المتباينة الشمال كمعادلة، والـ quadratic formula بـ <bdi dir="ltr">a = 1, b = −1, c = −k(k + 1)R</bdi> وبناخد الجذر الموجب بس.')}</${P}>
          <${Box} kind="relax"><p className="hf-p small">${X('Worked check (ours, k = 10, R = 0.73): k(k + 1)R = 80.3, x = (1 + √322.2)/2 = 9.475, X = ⌈8.475⌉ = <b>9</b>. Table lookup agrees: F(8) = 72/110 = 0.655 < 0.73 ≤ F(9) = 90/110 = 0.818.',
            'مثال محلول (من عندنا، <bdi dir="ltr">k = 10</bdi> و<bdi dir="ltr">R = 0.73</bdi>):' + L('k(k + 1)R = 80.3,  x = (1 + √322.2)/2 = 9.475') + L('X = ⌈8.475⌉ = 9') + 'والـ table lookup بيقول نفس الكلام:' + L('F(8) = 0.655 < 0.73 ≤ F(9) = 0.818'))}</p></${Box}>
        `, { sec: t('Example 5.4', 'مثال 5.4') }),
        page(html`
          <${H2}>${t('The formula against the table lookup', 'المعادلة قصاد الـ table lookup')}</${H2}>
          <${Fig} name="ms-ex54" />
        `),

        // 22 · geometric derivation
        page(html`
          <${H1}>${t('Geometric: logs to the rescue', 'الـ geometric: الـ ln بيلحقنا')}</${H1}>
          <${P} small=${true}>${X('Example 5.5: p(x) = p(1 − p)^x, x = 0, 1, 2, …, with 0 < p < 1. Summing the geometric series:', 'مثال 5.5: الـ pmf هو <bdi dir="ltr">p(1 − p)^x</bdi> لـ <bdi dir="ltr">x = 0, 1, 2, …</bdi>، و<bdi dir="ltr">0 < p < 1</bdi>. نجمع الـ geometric series:')}</${P}>
          <${Code} lines=${['F(x) = p[1 + (1−p) + … + (1−p)^x]', '     = 1 − (1−p)^(x+1)', '1−(1−p)^x < R ≤ 1−(1−p)^(x+1)', '(1−p)^(x+1) ≤ 1−R < (1−p)^x', '(x+1)ln(1−p) ≤ ln(1−R) < x ln(1−p)']} />
          <${P} small=${true}>${X('Now divide by ln(1 − p). Since 1 − p < 1, <b>ln(1 − p) < 0</b>, so the signs flip (writing y for the ratio):', 'دلوقتي نقسم على <bdi dir="ltr">ln(1 − p)</bdi>. وبما إن <bdi dir="ltr">1 − p < 1</bdi>، يبقى <b>الـ ln ده سالب</b>، والعلامات بتتقلب (y هي النسبة):')}</${P}>
          <${Code} lines=${[['y = ln(1−R) / ln(1−p)', ''], ['y − 1 ≤ x < y', '']]} />
          <${P} small=${true}>${X('‡ One line in the notes divides <i>without</i> flipping: "(x + 1) ≤ ln(1 − R)/ln(1 − p) < x". That can’t be right; it should read x < ln(1 − R)/ln(1 − p) ≤ x + 1. The next line of the notes (above) is correct.',
            '‡ فيه سطر في النوتس بيقسم <i>من غير</i> ما يقلب العلامات:' + L('(x + 1) ≤ ln(1 − R)/ln(1 − p) < x') + 'وده مستحيل، والصح:' + L('x < ln(1 − R)/ln(1 − p) ≤ x + 1') + 'والسطر اللي بعده في النوتس (اللي فوق) صح.')}</${P}>
        `, { sec: t('Geometric', 'الـ Geometric') }),

        // 23 · geometric generator + Example 5.6
        page(html`
          <${H2}>${t('The geometric generator', 'الـ generator بتاع الـ geometric')}</${H2}>
          <${Code} lines=${[['X = ⌈ln(1−R)/ln(1−p) − 1⌉', t('from 0', 'من 0')], ['X = q + ⌈ln(1−R)/ln(1−p) − 1⌉', t('from q', 'من q')]]} />
          <${P} small=${true}>${X('The second line is for a geometric on {q, q + 1, …} with p(x) = p(1 − p)^(x − q). <b>Commonly q = 1.</b>', 'السطر التاني للـ geometric اللي بيبدأ من q، والـ pmf بتاعه:<span class="ltr">p(x) = p(1 − p)^(x − q)</span><b>وغالبًا <bdi dir="ltr">q = 1</bdi>.</b>')}</${P}>
          <${P} small=${true}>${X('<b>Example 5.6</b>: three values from a geometric on {X ≥ 1} with <b>mean 2</b>. Mean 1/p = 2, so <b>p = 1/2</b>, and <b>q = 1</b>. R = 0.932, 0.105, 0.687:', '<b>مثال 5.6</b>: تلات قيم من geometric على <bdi dir="ltr">{X ≥ 1}</bdi> والـ <b>mean بيساوي 2</b>. يعني <bdi dir="ltr">1/p = 2</bdi>، فـ <b><bdi dir="ltr">p = 1/2</bdi></b> و<b><bdi dir="ltr">q = 1</bdi></b>. والـ R هي 0.932 و0.105 و0.687:')}</${P}>
          <${Tb} head=${['i', 'Ri', 'ln(1−Ri)/ln 0.5', 'Xi = 1 + ⌈… − 1⌉']} rows=${[['1', '0.932', '3.878', '4'], ['2', '0.105', '0.160 ‡', '1'], ['3', '0.687', '1.676', '2']]} hi=${3} />
          <${P} small=${true}>${X('‡ The notes print 0.166 for R2; the exact value is ln 0.895/ln 0.5 = 0.160. X2 = 1 either way: 1 + ⌈−0.840⌉ = 1 + 0 = 1.', '‡ النوتس كاتبة 0.166 للـ R2، والقيمة بالظبط 0.160. والـ X2 بتطلع 1 في الحالتين:' + L('1 + ⌈−0.840⌉ = 1 + 0 = 1'))}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${t('ln(1 − R), not ln R: ln 0.105 would give 4, not 1', 'ln(1 − R) مش ln R: لو استخدمت ln 0.105 هتطلع 4 مش 1')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Example 5.6, step by step', 'مثال 5.6 خطوة بخطوة')}</${H2}>
          <${Fig} name="ms-geom" />
        `),

        // 25 · exercise: discrete
        page(html`
          <${Box} kind="pencil" title=${t('Be the generator, discrete edition', 'خليك إنت الـ generator: نسخة الـ discrete')}><p className="hf-p small">${t('Same game, discrete distributions.', 'نفس اللعبة، بس discrete.')}</p></${Box}>
          <${Gen} id="g2" rows=${GEN2} />
        `),

        // 26 · acceptance-rejection
        page(html`
          <${H1}>${t('Acceptance-rejection: just say no', 'الـ acceptance-rejection: قول لأ وخلاص')}</${H1}>
          <${P} small=${true}>${X('The notes’ illustration: generate X <b>uniform between 1/4 and 1</b>.', 'مثال النوتس: عايزين X <b>uniform بين <bdi dir="ltr">1/4</bdi> و1</b>.')}</${P}>
          <${UL} items=${A ? ['<b>الخطوة 1</b>: ولّد random number اسمه R.', '<b>الخطوة 2</b>: (a) لو <bdi dir="ltr">R ≥ 1/4</bdi> <b>اقبل</b> <bdi dir="ltr">X = R</bdi> وروح للخطوة 3. (b) لو <bdi dir="ltr">R < 1/4</bdi> <b>ارفض</b> الـ R وارجع للخطوة 1.', '<b>الخطوة 3</b>: لو محتاج X تاني كرّر من الخطوة 1، غير كده وقّف.']
            : ['<b>Step 1</b>: generate a random number R.', '<b>Step 2</b>: (a) if R ≥ 1/4, <b>accept</b> X = R and go to Step 3; (b) if R < 1/4, <b>reject</b> R and return to Step 1.', '<b>Step 3</b>: if another variate is needed, repeat from Step 1; otherwise stop.']} />
          <${P} small=${true}>${X('Why it works: the accepted values are R <b>conditioned on the event {R ≥ 1/4}</b>. For 1/4 ≤ a < b ≤ 1:', 'ليه بتشتغل: القيم المقبولة هي الـ R <b>بشرط إن <bdi dir="ltr">R ≥ 1/4</bdi></b>. ولأي <bdi dir="ltr">1/4 ≤ a < b ≤ 1</bdi>:')}</${P}>
          <${Code} lines=${['P(a < R ≤ b | 1/4 ≤ R ≤ 1)', '  = P(a < R ≤ b) / P(1/4 ≤ R ≤ 1)', ['  = (b − a) / (3/4)', t('uniform on [1/4, 1]', 'يعني uniform')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Efficiency</b> depends on the rejections: <b>the fewer the rejections, the higher the efficiency</b>. "Efficiency increases as rejections increase" is False.', 'الـ <b>efficiency</b> معتمدة على الـ rejections: <b>كل ما الرفض يقل، الـ efficiency تزيد</b>. ولو لقيت إن الـ efficiency بتزيد مع زيادة الرفض، يبقى ده <b>غلط</b>.')}</p></${Box}>
        `, { sec: t('Acceptance-rejection', 'الـ Acceptance-rejection') }),
        page(html`
          <${H2}>${t('Generate R’s and watch the rejects pile up', 'ولّد R واتفرج على المرفوضين')}</${H2}>
          <${Fig} name="ms-acc-rej" />
        `),

        // 28 · sort: accept or reject
        page(html`
          <${Box} kind="pencil" title=${t('Bouncer at the door', 'خليك إنت البودي جارد')}><p className="hf-p small">${X('You run Step 2 for X uniform on [1/4, 1]. Tap <b>A</b> to accept or <b>R</b> to reject each random number.', 'إنت اللي بتنفّذ الخطوة 2 عشان X تبقى uniform على <bdi dir="ltr">[1/4, 1]</bdi>. دوس <b>A</b> للقبول أو <b>R</b> للرفض.')}</p></${Box}>
          <${Sort} id="ar" bins=${[['A', t('accept', 'اقبل')], ['R', t('reject', 'ارفض')]]} items=${A ? [
            ['الرقم <bdi dir="ltr">R = 0.18</bdi>', 1], ['الرقم <bdi dir="ltr">R = 0.62</bdi>', 0], ['الرقم <bdi dir="ltr">R = 0.25</bdi>', 0], ['الرقم <bdi dir="ltr">R = 0.07</bdi>', 1], ['الرقم <bdi dir="ltr">R = 0.249</bdi>', 1], ['الرقم <bdi dir="ltr">R = 0.99</bdi>', 0]
          ] : [
            ['R = 0.18', 1], ['R = 0.62', 0], ['R = 0.25', 0], ['R = 0.07', 1], ['R = 0.249', 1], ['R = 0.99', 0]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('accepted: X = R as is. Rejected: thrown away, never rounded up to 1/4. On average 3/4 get in.', 'المقبولة X = R زي ما هي، والمرفوضة بتترمي ومش بتتقرّب لـ 1/4. وفي المتوسط 3/4 بيعدّوا.')}</${Hand}>
        `),

        // 29 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: the Inverse Transform and Acceptance-Rejection argue about who makes better variates.', 'قعدة الليلة: الـ Inverse Transform والـ Acceptance-Rejection بيتخانقوا مين بيولّد variates أحسن.')} />
          <${Chat} names=${[t('Inverse Transform', 'الـ Inverse Transform'), t('Acceptance-Rejection', 'الـ Acceptance-Rejection')]} lines=${A ? [
            [0, 'أنا مبضيّعش ولا R. كل R بتدخل بتطلع X واحدة على طول:<span class="ltr">X = F⁻¹(R)</span>'],
            [1, 'وأنا بستنى. بولّد R، ولو مش عاجباني <b>بارفضها</b> وأولّد غيرها.'],
            [0, 'ده إهدار! أنا محتاج بس الـ cdf، وأحلّ <bdi dir="ltr">F(X) = R</bdi>.'],
            [1, 'ولما الحل ده يبقى صعب؟ الـ Poisson مثلًا. أنا بقارن حاصل ضرب الـ R بـ <bdi dir="ltr">e^(−α)</bdi> وخلاص.'],
            [0, 'بس كل رفض بيكلّفك random number زيادة.'],
            [1, 'عندك حق: <b>كل ما الرفض يقل، الـ efficiency بتزيد</b>. ومع ذلك، اللي بقبله ليه بالظبط الـ distribution المطلوب.']
          ] : [
            [0, 'I never waste an R. Every R that comes in leaves as exactly one X: X = F⁻¹(R).'],
            [1, 'I’m pickier. I generate an R, and if I don’t like it, I <b>reject</b> it and draw another.'],
            [0, 'Wasteful! All I need is the cdf, and I solve F(X) = R.'],
            [1, 'And when that’s hard to solve? Take the Poisson. I just compare a product of R’s with e^(−α).'],
            [0, 'Every rejection costs you another random number.'],
            [1, 'True: <b>the fewer the rejections, the higher my efficiency</b>. But what I accept has exactly the desired distribution.']
          ]} />
        `),

        // 30 · Poisson interview
        page(html`
          <${Interview} title=${t('The Poisson Variate, exposed', 'الـ Poisson Variate على المكشوف')} sub=${t('This week’s interview: a discrete distribution with a continuous secret.', 'حوار الأسبوع: distribution من نوع discrete وعنده سر continuous.')} lines=${A ? [
            ['المذيع', 'عرّف نفسك.'],
            ['الـ Poisson', 'أنا <bdi dir="ltr">N</bdi>، والـ pmf بتاعي <bdi dir="ltr">p(n) = e^(−α) αⁿ / n!</bdi> لـ <bdi dir="ltr">n = 0, 1, 2, …</bdi>، والـ mean بتاعي <bdi dir="ltr">α > 0</bdi>.'],
            ['المذيع', 'وبتعدّ إيه؟'],
            ['الـ Poisson', '<b>عدد الـ arrivals في وحدة زمن واحدة</b> من Poisson arrival process.'],
            ['المذيع', 'والسر؟'],
            ['الـ Poisson', 'الـ interarrival times بتاعتي <b>exponential بـ rate α</b>. وأنا بساوي n بالظبط لما:<span class="ltr">A1 + … + An ≤ 1 < A1 + … + An + A(n+1)</span>'],
            ['المذيع', 'يعني إيه بالبلدي؟'],
            ['الـ Poisson', 'الـ arrival رقم n جه <b>قبل</b> الزمن 1، واللي بعده جه <b>بعد</b> الزمن 1. ودي معادلة (5.7).']
          ] : [
            ['Head First', 'Introduce yourself.'],
            ['Poisson', 'I’m N, with pmf p(n) = e^(−α) αⁿ / n!, n = 0, 1, 2, …, and my mean is α > 0.'],
            ['Head First', 'What do you count?'],
            ['Poisson', 'The <b>number of arrivals in one unit of time</b> from a Poisson arrival process.'],
            ['Head First', 'And the secret?'],
            ['Poisson', 'My interarrival times are <b>exponential with rate α</b>. N = n exactly when A1 + … + An ≤ 1 < A1 + … + An + A(n+1).'],
            ['Head First', 'In plain words?'],
            ['Poisson', 'The nth arrival came <b>before</b> time 1, and the (n + 1)st came <b>after</b> it. That’s (5.7).']
          ]} />
          <${Grow} />
          <${Talk} who="clock" flip=${true}>${X('Count the exponential gaps that fit before my hand reaches 1.', 'عدّ الفترات الـ exponential اللي تلحق قبل ما عقربي يوصل 1.')}</${Talk}>
        `, { sec: t('Poisson', 'الـ Poisson') }),
        page(html`
          <${H2}>${t('Arrivals before time 1 (Example 5.7’s R’s)', 'الـ arrivals قبل الزمن 1 (أرقام مثال 5.7)')}</${H2}>
          <${Fig} name="ms-pois-time" />
        `),

        // 32 · from sums to products
        page(html`
          <${H2}>${t('From sums of logs to a product', 'من مجموع ln لحاصل ضرب')}</${H2}>
          <${P} small=${true}>${X('Generate each Ai with (5.2), using rate α, and substitute into (5.7):', 'نولّد كل <bdi dir="ltr">Ai</bdi> بالمعادلة (5.2) بالـ rate <bdi dir="ltr">α</bdi>، ونعوّض في (5.7):')}</${P}>
          <${Code} lines=${[['Ai = −(1/α) ln Ri', M('(5.8)')], 'Σ(1..n) −(1/α) ln Ri ≤ 1', '      1 < Σ(1..n+1) −(1/α) ln Ri', ['ln Π(1..n) Ri ≥ −α', M('× (−α)')], '      −α > ln Π(1..n+1) Ri', ['Π(1..n) Ri ≥ e^(−α)', M('e^(ln x) = x')], '      e^(−α) > Π(1..n+1) Ri']} />
          <${P} small=${true}>${X('Multiplying by −α <b>reverses the inequality signs</b>, and the <b>sum of logarithms becomes the logarithm of a product</b>. The last line is equivalent to (5.7), with no logs left.', 'الضرب في <bdi dir="ltr">−α</bdi> <b>بيقلب العلامات</b>، و<b>مجموع الـ ln بيبقى ln لحاصل الضرب</b>. والسطر الأخير مكافئ لـ (5.7) ومن غير ولا ln.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Each new R is between 0 and 1, so the product P can only shrink. Why does that guarantee the procedure on the next page always stops?', 'كل R جديدة بين 0 و1، فحاصل الضرب P بيصغر بس. ليه ده بيضمن إن الخطوات اللي في الصفحة الجاية لازم تقف؟')}</p></${Box}>
        `),

        // 33 · the procedure
        page(html`
          <${H2}>${t('The Poisson procedure', 'خطوات توليد الـ Poisson')}</${H2}>
          <${UL} items=${A ? ['<b>الخطوة 1</b>: خلّي <bdi dir="ltr">n = 0</bdi> و<bdi dir="ltr">P = 1</bdi>.', '<b>الخطوة 2</b>: ولّد random number جديد واضربه في الـ P:' + L('P = P · R(n+1)'), '<b>الخطوة 3</b>: لو <bdi dir="ltr">P < e^(−α)</bdi> <b>اقبل</b> <bdi dir="ltr">N = n</bdi>. غير كده <b>ارفض</b> الـ n دي، وزوّدها واحد، وارجع للخطوة 2.']
            : ['<b>Step 1</b>: set n = 0, P = 1.', '<b>Step 2</b>: generate a random number R(n+1) and replace P by P · R(n+1).', '<b>Step 3</b>: if P < e^(−α), <b>accept</b> N = n. Otherwise <b>reject</b> the current n, increase n by one and return to Step 2.']} />
          <${Talk} who="cpu">${X('If P ≥ e^(−α), I’m not done: at least <b>one more trial</b>.', 'لو <bdi dir="ltr">P ≥ e^(−α)</bdi> يبقى لسه مخلّصتش: فيه <b>محاولة كمان</b> على الأقل.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('N = n uses <b>n + 1 random numbers</b>, so the average is <b>E(N + 1) = α + 1</b>. For 1000 variates with α = 0.2: about 1000 × 1.2 = <b>1200</b> random numbers (not 1000, not 200).',
            'لو <bdi dir="ltr">N = n</bdi> بنستخدم <b><bdi dir="ltr">n + 1</bdi> random numbers</b>، فالمتوسط:' + L('E(N + 1) = α + 1') + 'ولـ 1000 variate بـ <bdi dir="ltr">α = 0.2</bdi>:' + L('1000 × 1.2 = 1200') + 'مش 1000 ولا 200.')}</p></${Box}>
          <${Grow} />
          <${Hand} red=${true}>${t('compare P with e^(−α), never with α, and never a single R', 'قارن الـ P بـ e^(−α)، مش بـ α، ومش بـ R لوحدها')}</${Hand}>
        `),

        // 34 · Example 5.7
        page(html`
          <${Fig} name="ms-pois-gen" />
        `),
        page(html`
          <${P} small=${true}>${X('The notes’ three variates, from table A.2 (they restart the labels at R1 for each variate):', 'التلات variates بتوع النوتس، من جدول A.2 (والنوتس بتبدأ الترقيم من R1 مع كل variate):')}</${P}>
          <${Tb} head=${['n', 'R(n+1)', 'P', A ? 'النتيجة' : 'result']} rows=${[['0', '0.4357', '0.4357', 'N = 0'], ['0', '0.4146', '0.4146', 'N = 0'], ['0', '0.8353', '0.8353', A ? 'رفض' : 'reject'], ['1', '0.9952', '0.8312', A ? 'رفض' : 'reject'], ['2', '0.8004', '0.6654', 'N = 2']]} hi=${2} />
          <${P} small=${true}>${X('Three variates, <b>N = 0, 0, 2</b>, took <b>5 random numbers</b>: (0 + 1) + (0 + 1) + (2 + 1). The product 0.8353 × 0.9952 is 0.83129…, which the notes keep as 0.8312.', 'تلات variates، <b><bdi dir="ltr">N = 0, 0, 2</bdi></b>، خدوا <b>5 random numbers</b>:' + L('(0 + 1) + (0 + 1) + (2 + 1) = 5') + 'وحاصل ضرب <bdi dir="ltr">0.8353 × 0.9952</bdi> بالظبط 0.83129، والنوتس كتباه 0.8312.')}</${P}>
          <${Grow} />
          <${Box} kind="pencil" title=${t('Be the Poisson generator', 'خليك إنت الـ Poisson generator')}><p className="hf-p small">${X('Our own numbers: α = 0.5, so e^(−0.5) = <b>0.6065</b>. Random numbers 0.8, 0.9, 0.7, 0.35. Decide each step on the next page.', 'أرقام من عندنا: <bdi dir="ltr">α = 0.5</bdi> يعني <bdi dir="ltr">e^(−0.5) = 0.6065</bdi>. والـ random numbers هي 0.8 و0.9 و0.7 و0.35. قرّر كل خطوة في الصفحة الجاية.')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Accept or reject?', 'تقبل ولا ترفض؟')}</${H2}>
          <${PoisDrill} id="pd" />
          <${Grow} />
          <${Hand}>${t('accept only when P drops below 0.6065', 'اقبل بس لما الـ P تنزل تحت 0.6065')}</${Hand}>
        `, { sec: t('Exercises', 'التمارين') }),

        // 37 · match
        page(html`
          <${H2}>${t('Which generator is whose?', 'أنهي generator بتاع مين؟')}</${H2}>
          <${P} small=${true}>${t('Tap a distribution, then the rule that generates it.', 'دوس على الـ distribution، وبعدين على القاعدة اللي بتولّده.')}</${P}>
          <${Match} id="mt" left=${A ? ['الـ Exponential', 'الـ Uniform على <bdi dir="ltr">[a, b]</bdi>', 'الـ Triangular لو <bdi dir="ltr">R ≤ 1/2</bdi>', 'الـ Discrete uniform', 'الـ Geometric من 0', 'الـ Poisson']
            : ['Exponential', 'Uniform on [a, b]', 'Triangular, R ≤ 1/2', 'Discrete uniform', 'Geometric from 0', 'Poisson']}
            right=${['<bdi dir="ltr">X = ⌈Rk⌉</bdi>', '<bdi dir="ltr">P = P·R until P &lt; e^(−α)</bdi>', '<bdi dir="ltr">X = −(1/λ) ln(1 − R)</bdi>', '<bdi dir="ltr">X = ⌈ln(1−R)/ln(1−p) − 1⌉</bdi>', '<bdi dir="ltr">X = a + (b − a)R</bdi>', '<bdi dir="ltr">X = √(2R)</bdi>']}
            answer=${[2, 4, 5, 0, 3, 1]} />
        `),

        // 38 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("The doctors' two questions on this lecture: the same idea, asked twice. Tap an answer to see why.", 'السؤالين اللي جم من الدكاترة على المحاضرة دي، نفس الفكرة اتسألت مرتين. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /Y=F\(X\) having distribution/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('the same question came back on the revision sheet, next page', 'نفس السؤال رجع تاني في الـ revision sheet، الصفحة الجاية')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /Y = F\(X\) has the distribution/i)}
          <${Grow} />
          <${Talk} who="dice" flip=${true}>${X('Remember Step 2: F(X) is me in disguise.', 'افتكر الخطوة 2: الـ <bdi dir="ltr">F(X)</bdi> دي أنا بس متنكّر.')}</${Talk}>
        `),

        // 39–41 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions, not the doctors'. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /X = F⁻¹\(R\) where F⁻¹ is/)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /mode 1, R = 0\.82 gives/)}
          <${Gap} h=${4} />
          ${pq('p3', /R = 0\.80 generates/)}
        `),
        page(html`
          ${pq('p4', /\{1, 2, …, 6\}, R = 0\.42/)}
          <${Gap} h=${4} />
          ${pq('p5', /efficiency of an acceptance-rejection technique increases/i)}
        `),
        page(html`
          ${pq('p6', /current n is accepted/)}
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${X('P against e^(−α). Not α, not one R.', 'الـ P قصاد <bdi dir="ltr">e^(−α)</bdi>. مش α، ومش R لوحدها.')}</${Talk}>
        `),

        // 42 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'كل الطرق بتفترض إن الـ uniform random numbers على <bdi dir="ltr">(0, 1)</bdi> جاهزة.',
            'الـ <b>inverse transform</b>: هات الـ cdf، ساويه بالـ R، حل لـ X. والـ <bdi dir="ltr">F⁻¹</bdi> مش <bdi dir="ltr">1/f</bdi>.',
            'الـ exponential:' + L('X = −(1/λ) ln(1 − R)   أو   −(1/λ) ln R'),
            'الـ uniform:' + L('X = a + (b − a)R'),
            'الـ triangular:' + L('√(2R) if R ≤ 1/2;   2 − √(2(1 − R)) if R > 1/2'),
            'في الـ discrete لو <bdi dir="ltr">r(i−1) < R ≤ ri</bdi> يبقى <bdi dir="ltr">X = xi</bdi>، وفي الـ discrete uniform بنقرّب <bdi dir="ltr">Rk</bdi> لفوق.',
            'الـ geometric:' + L('X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉'),
            'الـ acceptance-rejection: ارفض اللي مش عاجبك، وكل ما الرفض يقل الـ efficiency تزيد.',
            'الـ Poisson: اضرب الـ R لحد ما <bdi dir="ltr">P < e^(−α)</bdi>، وفي المتوسط <bdi dir="ltr">α + 1</bdi> random numbers.'
          ] : [
            'All techniques assume uniform (0, 1) random numbers are readily available.',
            '<b>Inverse transform</b>: find the cdf, set F(X) = R, solve X = F⁻¹(R). F⁻¹ is not 1/f.',
            'Exponential: X = −(1/λ) ln(1 − R), or −(1/λ) ln R (5.2).',
            'Uniform on [a, b]: X = a + (b − a)R.',
            'Triangular: √(2R) for R ≤ 1/2; 2 − √(2(1 − R)) for R > 1/2.',
            'Discrete: if r(i−1) < R ≤ ri, X = xi. Discrete uniform: X = ⌈Rk⌉.',
            'Geometric: X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉ (q = 0 or, commonly, 1).',
            'Acceptance-rejection: reject what you don’t want; fewer rejections, higher efficiency.',
            'Poisson: multiply R’s until P < e^(−α); on average α + 1 random numbers per variate.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 43 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 5!', 'خلّصت الفصل الخامس!')}</${H1}>
            <${Talk} who="table">${t('Next time: where do λ and p come from? Input modeling, from real data.', 'المرة الجاية: الـ λ والـ p دول جايين منين؟ الـ input modeling من داتا حقيقية.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [5], t: Date.now() } }}>${t('Quiz me on Lecture 5', 'امتحنّي في محاضرة 5')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 5, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 5, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

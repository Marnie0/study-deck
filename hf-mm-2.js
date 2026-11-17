// Head First chapter for Multimedia Lecture 2 (built on hf.js), English + Egyptian Arabic, same pages in both.
// DSP, filters and the Fourier transform: sine waves (amplitude, frequency, phase; the sampled sine), decibels, 6 dB per bit, SNR,
// signal flow graphs (delay, multiply, add), IIR and FIR filters, MATLAB filter(B, A, X) and IIRdemo.m, the Fourier transform
// (frequency domain, sinusoidal decomposition, 1D/2D FT, the top hat and sinc, DFT, magnitude/phase, bins, spectrogram),
// filtering in the frequency domain (G = H·F, ideal and Butterworth low-pass, other filters), convolution, the convolution
// theorem and deconvolution. Every fact comes from the lecture's notes; analogies are marked as ours. Every worked number is
// computed here from the notes' formulas (the filter exercise computes its answers from the difference equations) and was
// checked by hand against the notes' own worked answers.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T2 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;
  const fmt = v => { const r = Math.round(v * 1000) / 1000; return String(r).replace('-', '−'); };

  if (!document.getElementById('hf-css-mm2')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm2';
    s.textContent = `
.hfb .hf-mm2-fx{ font:600 14px/1.5 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 9px; margin:0; text-align:center; }
.hfb .hf-mm2-fx.l{ text-align:left; }
.hfb .hf-mm2-fx sub, .hfb .hf-mm2-fx sup, .hfb .hf-mm2-tb sub{ font-size:.72em; line-height:0; }
.hfb .hf-mm2-fx .n{ display:block; font:500 13px/1.3 var(--body); color:var(--graphite); }
.hfb .hf-mm2-tb{ border-collapse:collapse; width:100%; table-layout:fixed; font:600 13.5px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-mm2-tb th, .hfb .hf-mm2-tb td{ border:1px solid var(--hf-line); padding:3px 2px; text-align:center; height:21px; }
.hfb .hf-mm2-tb th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-mm2-tb .lb{ background:var(--hf-grey); font:800 13px/1.1 var(--body); }
.hfb .hf-mm2-tb td.k{ color:var(--hf-k); font-weight:800; background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-mm2-tb .cur{ background:color-mix(in srgb, var(--hf-hand) 13%, var(--paper)); }
.hfb .hf-mm2-tb th.cur{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-mm2-sfg{ display:block; width:100%; height:auto; color:var(--hf-line); }
.hfb .hf-mm2-sfg text{ font:600 14px var(--mono); fill:var(--ink); }
.hfb .hf-mm2-sfg text.k{ fill:var(--hf-k); font-weight:800; }
.hfb .hf-mm2-cards{ display:grid; gap:7px; }
.hfb .hf-mm2-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); display:grid; gap:4px; }
.hfb .hf-mm2-card > b{ font:800 15px/1.15 var(--body); color:var(--ink); }
.hfb .hf-mm2-card > span{ font-size:14px; line-height:1.32; color:var(--ink); }
.hfb .hf-mm2-card .hf-mm2-fx{ font-size:13.5px; padding:3px 6px; }
/* drills */
.hfb .hf-mm2-dr{ display:grid; gap:6px; }
.hfb .hf-mm2-dr .it{ padding-bottom:5px; border-bottom:1px dotted var(--faint); }
.hfb .hf-mm2-dr .q{ font-size:14px; line-height:1.3; margin:0 0 4px; color:var(--ink); }
.hfb .hf-mm2-dr .q code, .hfb .hf-mm2-ask code{ font-family:var(--mono); font-size:.88em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-mm2-ops{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-mm2-ops button{ font:700 13.5px/1 var(--body); min-height:30px; min-width:40px; padding:0 9px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mm2-ops button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-mm2-ops button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-mm2-ops button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); color:var(--ink); }
.hfb .hf-mm2-fix{ font-size:13px; line-height:1.3; margin:4px 0 0; color:var(--hf-red); }
/* be the filter */
.hfb .hf-mm2-bf{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-mm2-tabs{ display:flex; gap:5px; }
.hfb .hf-mm2-tabs button{ flex:1 1 0; font:800 13.5px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mm2-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm2-ask{ font-size:14px; line-height:1.32; margin:0; color:var(--ink); }
.hfb .hf-mm2-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-mm2-ok{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-mm2-last{ font:600 13px/1.35 var(--mono); margin:0; color:var(--hf-k); text-align:left; }
.hfb .hf-mm2-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-mm2-row .hf-btn{ padding:7px 9px; }
.hf-ar .hf-mm2-dr .q, .hf-ar .hf-mm2-fix, .hf-ar .hf-mm2-ask, .hf-ar .hf-mm2-bad, .hf-ar .hf-mm2-ok, .hf-ar .hf-mm2-card > span, .hf-ar .hf-mm2-fx .n{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-mm2-dr .q, .hf-ar .hf-mm2-card > span{ font-size:13.5px; }
.hf-ar .hf-mm2-card > b, .hf-ar .hf-mm2-tb .lb, .hf-ar .hf-mm2-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm2-fx .n{ direction:rtl; text-align:center; }
.hf-ar .hf-mm2-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-mm2-sfg, .hf-ar .hf-mm2-ops, .hf-ar .hf-mm2-fx, .hf-ar .hf-mm2-tb, .hf-ar .hf-mm2-last{ direction:ltr; }
`;
    document.head.appendChild(s);
  }

  // a formula on its own line (always left to right), with an optional note under it
  const Fx = ({ f, n, left }) => html`<div className=${'hf-mm2-fx hf-in' + (left ? ' l' : '')} dir="ltr">${T2(f)}${n ? html`<span className="n" dir=${useAr() ? 'rtl' : 'ltr'}>${T2(n)}</span>` : null}</div>`;

  // the sampled sine of the worked example, Fw/Fs = 1/8: fill in y for n = 0 … 8
  const ANG = ['0', 'π/4', 'π/2', '3π/4', 'π', '5π/4', '3π/2', '7π/4', '2π'];
  function SineTable({ id }) {
    const ar = useAr();
    const [open, setOpen] = H.K.useSlot(id, false);
    const ys = ANG.map((_, n) => Math.sin(2 * Math.PI * n / 8));
    const yS = v => Math.abs(v) < 1e-9 ? '0' : Math.abs(Math.abs(v) - 1) < 1e-9 ? (v < 0 ? '−A' : 'A') : (v < 0 ? '−' : '') + Math.abs(v).toFixed(4) + 'A';
    return html`<div className="hf-in"><table className="hf-mm2-tb" dir="ltr"><thead><tr><th>n</th><th>2π·n/8</th><th>y = A·sin(…)</th></tr></thead><tbody>
      ${ANG.map((a, n) => html`<tr key=${n}><td className="lb">${n}</td><td>${a}</td><td className=${open || [1, 2, 4].includes(n) ? 'k' : ''}>${open || [1, 2, 4].includes(n) ? yS(ys[n]) : '?'}</td></tr>`)}
      </tbody></table>
      <div className="hf-mm2-row" style=${{ marginTop: '6px' }}>${open ? html`<span className="hf-score">${ar ? 'دورة كاملة في 8 samples' : 'one full cycle in 8 samples'}</span>` : html`<button className="hf-btn" onClick=${() => setOpen(true)}>${ar ? 'ورّيني باقي الـ y' : 'Show the other y values'}</button>`}</div></div>`;
  }

  // the three building blocks as signal flow graphs (static drawing)
  function Blocks() {
    const arrow = 'url(#hf-mm2-ar)';
    const L = (x1, y1, x2, y2, a) => html`<path d=${`M${x1} ${y1} L${x2} ${y2}`} stroke="currentColor" strokeWidth="1.7" fill="none" markerEnd=${a ? arrow : null} />`;
    const Bx = (x, y) => html`<g><rect x=${x} y=${y - 13} width="26" height="26" rx="3" fill="var(--paper)" stroke="currentColor" strokeWidth="1.8" /><text x=${x + 13} y=${y + 5} textAnchor="middle">T</text></g>`;
    const Op = (x, y, t) => html`<g><circle cx=${x} cy=${y} r="12" fill="var(--paper)" stroke="currentColor" strokeWidth="1.8" /><text x=${x} y=${y + 5} textAnchor="middle">${t}</text></g>`;
    return html`<svg className="hf-mm2-sfg hf-in" dir="ltr" viewBox="0 0 328 214" role="img" aria-label="Signal flow graphs: one delay, two delays, multiplication by a, addition of two inputs">
      <defs><marker id="hf-mm2-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" /></marker></defs>
      <text x="0" y="25">x(n)</text>${L(38, 20, 72, 20, 1)}${Bx(74, 20)}${L(100, 20, 132, 20, 1)}<text x="138" y="25" className="k">y(n) = x(n − 1)</text>
      <text x="0" y="75">x(n)</text>${L(38, 70, 56, 70, 1)}${Bx(58, 70)}${L(84, 70, 98, 70, 1)}${Bx(100, 70)}${L(126, 70, 140, 70, 1)}<text x="146" y="75" className="k">y(n) = x(n − 2)</text>
      <text x="0" y="125">x(n)</text>${L(38, 120, 72, 120, 1)}${Op(85, 120, '×')}<text x="85" y="102" textAnchor="middle">a</text>${L(97, 120, 132, 120, 1)}<text x="138" y="125" className="k">y(n) = a·x(n)</text>
      <text x="0" y="168">x1(n)</text><text x="0" y="208">x2(n)</text>${L(46, 164, 66, 164)}${L(66, 164, 77, 177, 1)}${L(46, 204, 66, 204)}${L(66, 204, 77, 191, 1)}${Op(86, 184, '+')}${L(98, 184, 132, 184, 1)}<text x="138" y="189" className="k">y(n) = x1(n) + x2(n)</text>
    </svg>`;
  }

  // a drill: one row per question, tap an answer, then check
  function Drill({ id, items }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = items.filter((it, i) => pick[i] === it.a).length;
    return html`<div className="hf-mm2-dr hf-in">
      ${items.map((it, i) => { const p = pick[i];
        return html`<div key=${i} className="it"><p className="q">${T2(it.q)}</p>
          <div className="hf-mm2-ops" dir="ltr">${it.o.map((o, j) => html`<button key=${j} aria-pressed=${String(p === j && !chk)} className=${chk && p != null ? (j === it.a ? 'ok' : j === p ? 'no' : '') : ''} onClick=${() => { setChk(false); setPick(Object.assign({}, pick, { [i]: j })); }}>${T2(o)}</button>`)}</div>
          ${chk && p != null && p !== it.a && html`<p className="hf-mm2-fix">${T2(it.why)}</p>`}</div>`; })}
      <div className="hf-mm2-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChk(true)}>${ar ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; items.forEach((it, i) => { p[i] = it.a; }); setPick(p); setChk(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${chk && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${items.length}</bdi> صح` : right + ' / ' + items.length + ' right'}</span>`}
      </div></div>`;
  }

  // Be the filter: compute y(n) sample by sample for the FIR example filter and the IIR example filter
  const BF = {
    fir: { x: [6, 0, 12, 0, 0, 0], y: n => (BF.fir.x[n] || 0) / 2 + (n >= 1 ? BF.fir.x[n - 1] / 3 : 0) + (n >= 2 ? BF.fir.x[n - 2] / 4 : 0),
      opts: [[3, 6, 2, 0], [3, 2, 0, 5], [6, 7.5, 9, 10.5], [0, 6, 4, 3], [3, 0, 4, 1.5], [1.5, 0, 3, 0.75]] },
    iir: { x: [4, 2, 0, 0, 0, 0], y: n => { let y = 0; for (let k = 0; k <= n; k++) y = BF.iir.x[k] + 0.5 * y; return y; },
      opts: [[2, 4, 0, 6], [2, 4, 6, 3], [0, 4, 2, 1], [1, 0, 2, 0.5], [0, 0.25, 0.5, 1], [0.125, 0.25, 0, 0.5]] }
  };
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  function BeFilter({ id }) {
    const ar = useAr();
    const [kind, setKind] = H.K.useSlot(id + ':k', 'fir');
    const [k, setK] = H.K.useSlot(id + ':' + kind, 0);
    const [bad, setBad] = useState(null);
    const F = BF[kind], n = F.x.length, done = k >= n, ys = F.x.map((_, j) => F.y(j));
    const X = j => j >= 0 ? F.x[j] : 0;
    const sum = j => kind === 'fir'
      ? `y(${j}) = ½·${fmt(X(j))}${j >= 1 ? ' + ⅓·' + fmt(X(j - 1)) : ''}${j >= 2 ? ' + ¼·' + fmt(X(j - 2)) : ''} = ${fmt(ys[j])}`
      : `y(${j}) = ${fmt(X(j))}${j >= 1 ? ' + 0.5·' + fmt(ys[j - 1]) : ''} = ${fmt(ys[j])}`;
    const form = j => kind === 'fir' ? `y(${j}) = ½·x(${j})${j >= 1 ? ` + ⅓·x(${j - 1})` : ''}${j >= 2 ? ` + ¼·x(${j - 2})` : ''}` : `y(${j}) = x(${j})${j >= 1 ? ` + 0.5·y(${j - 1})` : ''}`;
    const pick = v => {
      if (near(v, ys[k])) { setBad(null); setK(k + 1); return; }
      let m = ar ? `مش كده. استخدم <bdi dir="ltr">${form(k)}</bdi> واقرا القيم من الجدول.` : `Not that one. Use ${form(k)} and read the values off the table.`;
      if (v === 0 && X(k) === 0) m += ar ? ' الـ input بقى 0، بس ' + (kind === 'fir' ? 'الـ delays لسه شايلة samples قديمة.' : 'الـ y اللي فاتت لسه راجعة بالـ feedback.') : ' The input is 0 now, but ' + (kind === 'fir' ? 'the delays still hold earlier samples.' : 'the last output is still fed back.');
      setBad(m);
    };
    const eq = kind === 'fir' ? 'y(n) = ½x(n) + ⅓x(n−1) + ¼x(n−2)' : 'y(n) = x(n) − a<sub>1</sub>y(n−1), a<sub>1</sub> = −0.5';
    return html`<div className="hf-mm2-bf hf-in">
      <div className="hf-mm2-tabs" dir="ltr" role="group" aria-label="Filter">${[['fir', 'FIR'], ['iir', 'IIR']].map(([v, l]) => html`<button key=${v} aria-pressed=${String(kind === v)} onClick=${() => { setBad(null); setKind(v); }}>${l}</button>`)}</div>
      <${Fx} f=${eq} />
      <table className="hf-mm2-tb" dir="ltr"><tbody>
        <tr><th className="lb">n</th>${F.x.map((_, j) => html`<th key=${j} className=${j === k ? 'cur' : ''}>${j}</th>`)}</tr>
        <tr><td className="lb">x(n)</td>${F.x.map((v, j) => html`<td key=${j} className=${j === k ? 'cur' : ''}>${v}</td>`)}</tr>
        <tr><td className="lb">y(n)</td>${ys.map((v, j) => html`<td key=${j} className=${j < k ? 'k' : j === k ? 'cur' : ''}>${j < k ? fmt(v) : j === k ? '?' : ''}</td>`)}</tr>
      </tbody></table>
      ${done ? html`<p className="hf-mm2-ok">${T2(kind === 'fir'
          ? (ar ? '<b>خلصت!</b> بعد ما الـ input خلص بـ 2 samples، الـ output بقى 0 وفضل 0: مفيش feedback ومفيش حاجة فاضلة في الـ delays.' : '<b>Done!</b> Two samples after the input ends the output is 0 and stays 0: no feedback, nothing left in the delays.')
          : (ar ? '<b>خلصت!</b> وهيفضل يتقسم على 2: <bdi dir="ltr">0.125,&nbsp;0.0625,&nbsp;…</bdi> وعمره ما يوصل صفر بالظبط. ده الـ "infinite".' : '<b>Done!</b> It keeps halving: 0.125, 0.0625, … and never becomes exactly zero. That is the "infinite".'))}</p>`
        : html`<p className="hf-mm2-ask">${T2(ar ? `احسب <bdi dir="ltr">y(${k})</bdi>. اختار القيمة:` : `Work out <b>y(${k})</b>. Pick the value:`)}</p>
        <div className="hf-mm2-ops" dir="ltr">${F.opts[k].map((v, j) => html`<button key=${j} onClick=${() => pick(v)}>${fmt(v)}</button>`)}</div>`}
      ${bad && html`<p className="hf-mm2-bad">${T2(bad)}</p>`}
      ${k > 0 && html`<p className="hf-mm2-last" dir="ltr">${sum(k - 1)}</p>`}
      <div className="hf-mm2-row">
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(k + 1); }}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(n); }}>${ar ? 'ورّيني الكل' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(0); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  H.chapters.mm[2] = {
    title: 'DSP, Filters and the Fourier Transform', kicker: 'Chapter 2', run: 'dsp, filters and fourier',
    ar: { title: 'الـ DSP والـ Filters والـ Fourier Transform', kicker: 'الفصل 2', run: 'الـ DSP والـ filters والـ Fourier' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arQuiz = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[2] && window.AR.mm.lectures[2].quiz) || [];
      // the doctors' questions only (quiz items with src)
      const find = re => { const i = lec.quiz.findIndex(x => x.src && re.test(String(x.q).replace(/<[^>]+>/g, ''))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = find(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const L = s => `<span class="ltr">${s}</span>`;
      const B = s => `<bdi dir="ltr">${s.replace(/<[^>]+>/g, '').length <= 24 ? s.replace(/ (?![^<]*>)/g, '&nbsp;') : s}</bdi>`;   // short pieces never break across lines
      return [
        // 0 · warm-up (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter ended with a promise: multimedia data is huge, and <b>lossy</b> compression (MP3, JPEG, MPEG) shrinks it by throwing away the perceptually less relevant parts. It has to <b>filter</b> the data somehow. This chapter is the "somehow".',
            'الفصل اللي فات خلص بوعد: الـ multimedia data حجمها ضخم، والـ <b>lossy</b> compression (زي الـ MP3 والـ JPEG والـ MPEG) بيصغّرها لما يرمي الأجزاء اللي إحساسنا بيها أقل. يعني لازم <b>يعمل filter للـ data</b> بطريقة ما، والفصل ده هو "الطريقة ما" دي.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('You record a guitar note with a steady <b>hiss</b> behind it. In the file both are just one list of numbers (samples). How could you remove the hiss without touching the note? Hint: they differ in something other than loudness.',
            'سجّلت نغمة جيتار ووراها <b>hiss</b> ثابت. في الملف الاتنين مجرد list أرقام واحدة (samples). إزاي تشيل الـ hiss من غير ما تلمس النغمة؟ تلميح: هما مختلفين في حاجة غير العلو.')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will be the filter, sample by sample.', '<b>حل التمارين.</b> هتبقى إنت الـ filter وتحسب sample بـ sample.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>Multimedia` : html`Chapter two<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Every Sound Is a Stack of Sines', 'كل صوت عبارة عن sines فوق بعض')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('DSP, filters and the Fourier transform', 'الـ DSP والـ filters والـ Fourier transform')}</p></div>
          <${P}>${X('The warm-up answer: hiss is made of <b>high frequencies</b>. See the signal as a sum of sine waves and you can throw away just the ones you do not want.',
            'إجابة سؤال البداية: الـ hiss معمول من <b>high frequencies</b>. لو شفت الـ signal كمجموع sine waves، تقدر ترمي اللي مش عايزه بس.')}</${P}>
          <${Talk} who="mic">${X('I just hand over numbers: the amplitude, many times a second.', 'أنا بسلّم أرقام وبس: الـ amplitude، مرات كتير في الثانية.')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${X('And I play back whatever is in those numbers. Hiss included.', 'وأنا بشغّل أي حاجة في الأرقام دي، والـ hiss معاها.')}</${Talk}>
          <${P} small=${true}>${X('The road: <b>sine waves</b> → <b>decibels</b> → three DSP building blocks → <b>IIR and FIR</b> filters → the <b>Fourier transform</b> → filtering by <b>multiplying</b> → <b>convolution</b>.',
            'الطريق: الـ <b>sine waves</b>، والـ <b>decibels</b>، وتلات building blocks للـ DSP، والـ <b>IIR والـ FIR</b>، والـ <b>Fourier transform</b>، والـ filtering <b>بالضرب</b>، والـ <b>convolution</b>.')}</${P}>
        `, { sec: t('Sine waves', 'الـ Sine waves') }),

        // 2 · sine wave basics
        page(html`
          <${H1}>${t('Three knobs on every sine', 'تلات زراير في كل sine')}</${H1}>
          <${Def}>${X('<b>Frequency</b> = number of cycles per second, measured in <b>Hertz (Hz)</b>. <b>Period</b> T = 1/f, e.g. 8 Hz → T = 1/8 = 0.125 s.',
            'الـ <b>Frequency</b> هي عدد الـ cycles في الثانية، وبتتقاس بالـ <b>Hertz (Hz)</b>. والـ <b>Period</b> هو ' + B('T = 1/f') + '، مثلًا:' + L('8 Hz → T = 1/8 = 0.125 s'))}</${Def}>
          <${UL} items=${A ? ['الـ <b>wavelength</b> بيتناسب <b>عكسيًا</b> مع الـ frequency: كل ما الـ frequency تعلى، الـ wavelength يقصر.', 'الـ sine wave بتتوصف بتلات حاجات: الـ <b>amplitude</b> والـ <b>frequency</b> والـ <b>phase</b>.']
            : ['<b>Wavelength</b> is <b>inversely proportional</b> to frequency: higher frequency → shorter wavelength.', 'A sine wave is described by three quantities: <b>amplitude</b>, <b>frequency</b> and <b>phase</b>.']} />
          <${Fx} f="z(t) = a·sin(ω·t + φ)" n=${t('a = amplitude, ω = frequency, φ = phase', 'الـ a الـ amplitude، والـ ω الـ frequency، والـ φ الـ phase')} />
          <${UL} items=${A ? ['لما تغيّر الـ <b>phase</b>، الموجة <b>بتتزحلق على محور الوقت</b>.', 'الـ <b>cosine هو sine wave مزاحة 90°</b> في الـ phase.', 'الـ <code>sin()</code> في MATLAB بتشتغل بالـ <b>radians</b>، والـ ' + B('2π rad = 360°') + ' يعني cycle كاملة.']
            : ['Changing the <b>phase</b> <b>shifts the wave along the time axis</b>.', 'A <b>cosine is a sine wave 90° out of phase</b>.', 'MATLAB <code>sin()</code> works in <b>radians</b>: 2π rad = 360° = one complete cycle.']} />
          <${Grow} />
          <${Hand}>${t('Our shorthand: amplitude = how big, frequency = how fast, phase = where it starts.', 'اختصار من عندنا: الـ amplitude قد إيه كبيرة، والـ frequency قد إيه سريعة، والـ phase بتبدأ منين.')}</${Hand}>
        `),

        // 3 · figure: amplitude, frequency, phase
        page(html`
          <${H2}>${t('Turn the three knobs', 'لِف التلات زراير')}</${H2}>
          <${Fig} name="mm-sine-abc" />
        `),

        // 4 · the sampled sine
        page(html`
          <${H2}>${t('A sine, one sample at a time', 'الـ sine، sample ورا sample')}</${H2}>
          <${P} small=${true}>${X('Inside the computer a sine is a list of samples. The general sampled sine used in the course:', 'جوه الكمبيوتر الـ sine هي list من الـ samples، وبنكتبها كده:')}</${P}>
          <${Fx} f="y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>)" n=${t('A amplitude · F<sub>w</sub> wave frequency · F<sub>s</sub> sample frequency · n sample index', 'الـ A الـ amplitude، والـ F<sub>w</sub> frequency الموجة، والـ F<sub>s</sub> الـ sample frequency، والـ n رقم الـ sample')} />
          <${P} small=${true}>${X('Worked example: F<sub>w</sub> = 1000 Hz, F<sub>s</sub> = 8000 Hz → F<sub>w</sub>/F<sub>s</sub> = 1/8, so one cycle takes <b>8 samples</b>. The notes give n = 1, 2, 4; finish the cycle:',
            'مثال محلول:' + L('F<sub>w</sub> = 1000 Hz, F<sub>s</sub> = 8000 Hz → F<sub>w</sub>/F<sub>s</sub> = 1/8') + 'يعني الـ cycle بتاخد <b>8 samples</b>. النوتس بتدّي ' + B('n = 1, 2, 4') + '، كمّل إنت:')}</${P}>
          <${SineTable} id="sine" />
        `),

        // 5 · figure: sampled sine
        page(html`
          <${H2}>${t('Sample by sample: try your own Fw and Fs', 'جرّب Fw وFs بتوعك، sample ورا sample')}</${H2}>
          <${Fig} name="mm-sampled-sine" />
        `),

        // 6 · the doctors' phase questions
        page(html`
          <${H2}>${t('From the exam papers: phase', 'من الامتحانات اللي فاتت: الـ phase')}</${H2}>
          ${mq('m-ph1', /offset from the origin/)}
          ${mq('m-ph2', /initial angle/)}
        `),

        // 7 · decibels
        page(html`
          <${H1}>${t('Decibels: squash a huge range', 'الـ Decibels: اضغط مدى ضخم')}</${H1}>
          <${Fx} f="X<sub>dB</sub> = 10·log<sub>10</sub>(X / X<sub>0</sub>)" n=${t('X = measured value, X<sub>0</sub> = reference level (same dimensions and units)', 'الـ X القيمة المقاسة، والـ X<sub>0</sub> الـ reference level (بنفس الأبعاد والوحدات)')} />
          <${UL} items=${A ? ['الـ reference level <b>دايمًا 0 dB</b>، لأن لو ' + B('X = X<sub>0</sub>') + ' يبقى ' + B('log<sub>10</sub>(1) = 0') + '.', 'لو ' + B('X > X<sub>0</sub>') + ' تبقى الـ dB <b>موجبة</b> (الـ power زادت)، ولو ' + B('X < X<sub>0</sub>') + ' تبقى <b>سالبة</b> (الـ power قلّت).', 'ليه dB؟ الوحدات الـ logarithmic بتتستخدم لما يكون فيه <b>range كبير</b> في الـ frequency أو الـ magnitude (زي مقياس حرارة الشطّة في السلايدز).']
            : ['The reference level is <b>always 0 dB</b>: X = X<sub>0</sub> → log<sub>10</sub>(1) = 0.', 'X > X<sub>0</sub> → <b>positive</b> dB (power increase); X &lt; X<sub>0</sub> → <b>negative</b> dB (power decrease).', 'Why dB? Logarithmic units are used when there is a <b>large range</b> in frequency or magnitude (the slides even show the chilli heat scale).']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Power magnitude = |X(i)|<sup>2</sup>, so 10·log<sub>10</sub>(|X(i)|<sup>2</sup>) = <b>20·log<sub>10</sub>(|X(i)|)</b>. Use <b>10·log for power</b>, <b>20·log for amplitude</b>. Amplitude ratio 10 → 20 dB, not 10 dB.',
            'الـ power magnitude بتساوي ' + B('|X(i)|<sup>2</sup>') + '، فـ:' + L('10·log<sub>10</sub>(|X(i)|<sup>2</sup>) = 20·log<sub>10</sub>(|X(i)|)') + 'استخدم <b>الـ <bdi dir="ltr">10·log</bdi> للـ power</b> و<b>الـ <bdi dir="ltr">20·log</bdi> للـ amplitude</b>.')}</p></${Box}>
        `, { sec: t('Decibels', 'الـ Decibels') }),

        // 8 · the ear, SNR
        page(html`
          <${H2}>${t('Your ear, in decibels', 'ودنك بالـ decibels')}</${H2}>
          <${UL} items=${A ? ['في الـ acoustics الـ 0 dB reference عادةً هو الـ <b>threshold of human perception</b>.', 'نسبة أعلى لأقل power الودن بتستحمله أكتر من ' + B('10<sup>12</sup>') + '، والـ log بتاعها 12، يعني <b>120 dB هو الـ threshold of pain</b>.', 'الودن أكتر حساسية بين <b>2 و4 kHz (الكلام)</b>، والـ <b>frequency weighting</b> بيدّيهم وزن أكبر. والـ filtering لـ bands هنا بيتستخدم في تحليل الكلام والـ model بتاع السمع والـ audio compression (MPEG audio).']
            : ['In acoustics the 0 dB reference is typically the <b>threshold of human perception</b>.', 'Max to min power the ear handles: above a trillion (10<sup>12</sup>) → log = 12 → <b>120 dB = threshold of pain</b>.', 'The ear is most sensitive between <b>2 and 4 kHz (speech)</b>; <b>frequency weighting</b> factors these more heavily. Filtering into bands here is used for speech analysis, modelling human hearing and audio compression (MPEG audio).']} />
          <${Def}>${X('<b>Signal-to-noise ratio</b>: SNR = P<sub>signal</sub>/P<sub>noise</sub> = (A<sub>signal</sub>/A<sub>noise</sub>)<sup>2</sup>. P = average power, A = RMS amplitude, measured at equivalent points and in the same bandwidth.',
            'الـ <b>Signal-to-noise ratio</b>:' + L('SNR = P<sub>signal</sub>/P<sub>noise</sub> = (A<sub>signal</sub>/A<sub>noise</sub>)<sup>2</sup>') + 'الـ P هي الـ average power، والـ A هي الـ RMS amplitude، وبيتقاسوا عند نقط متكافئة وفي نفس الـ bandwidth.')}</${Def}>
          <${Fx} f="SNR<sub>dB</sub> = 10·log<sub>10</sub>(P<sub>s</sub>/P<sub>n</sub>) = 20·log<sub>10</sub>(A<sub>s</sub>/A<sub>n</sub>)" />
        `),

        // 9 · figure: dB calculator
        page(html`
          <${H2}>${t('The dB calculator: tap a row of the notes\' table', 'حاسبة الـ dB: دوس على صف من جدول النوتس')}</${H2}>
          <${Fig} name="mm-db-calc" />
        `),

        // 10 · 6 dB per bit
        page(html`
          <${H2}>${t('Digital noise: 6 dB per bit', 'الـ Digital noise: ‏6 dB لكل bit')}</${H2}>
          <${P} small=${true}>${X('In linear PCM the first bit (the LSB) only gives residual quantisation noise. Each extra bit doubles the resolution: 10·log<sub>10</sub>(4) ≈ <b>6 dB</b>.',
            'في الـ linear PCM أول bit (الـ LSB) بيدّي residual quantisation noise بس. وكل bit زيادة بيضاعف الـ resolution، وده:' + L('10·log<sub>10</sub>(4) ≈ 6 dB'))}</${P}>
          <table className="hf-mm2-tb hf-in" dir="ltr"><thead><tr><th>PCM</th><th>${t('bits after the LSB', 'bits after LSB')}</th><th>dynamic range</th></tr></thead><tbody>
            <tr><td className="lb">16-bit</td><td>15 × 6</td><td className="k">90 dB</td></tr>
            <tr><td className="lb">8-bit</td><td>7 × 6</td><td className="k">42 dB</td></tr>
            <tr><td className="lb">${t('difference', 'difference')}</td><td>90 − 42</td><td className="k">48 dB</td></tr></tbody></table>
          <${P} small=${true}>${X('48 dB / 6 = 8, so 8-bit is "<b>8 times as noisy</b>", as the slide words it.', 'و' + B('48 / 6 = 8') + '، فالـ ' + B('8-bit') + ' بيبقى كده زي ما السلايد بتقولها:' + L('"8 times as noisy"'))}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>16 × 6 = 96 is not the slide\'s answer.</b> The slide does not count the first bit: 16-bit → <b>90 dB</b>, 8-bit → <b>42 dB</b>.',
            '<b>الـ ' + B('16 × 6 = 96') + ' مش إجابة السلايد.</b> السلايد مش بتعدّ أول bit: الـ 16-bit بيدّي <b><bdi dir="ltr">90&nbsp;dB</bdi></b>، والـ 8-bit بيدّي <b><bdi dir="ltr">42&nbsp;dB</bdi></b>.')}</p></${Box}>
          <${Grow} />
          <${Hand}>${X('Our note: as an amplitude ratio, 8 extra bits are 2<sup>8</sup> = 256 times (20·log<sub>10</sub>256 ≈ 48 dB). In the exam, use the slide\'s numbers.', 'ملاحظة من عندنا: كـ amplitude ratio الـ 8 bits الزيادة يعني ' + B('2<sup>8</sup> = 256') + ' مرة. في الامتحان استخدم أرقام السلايد.')}</${Hand}>
        `),

        // 11 · dB drill
        page(html`
          <${Box} kind="pencil" title=${t('Decibel drill', 'تمرين الـ dB')}><p className="hf-p small">${t('Power or amplitude? Pick the dB for each, then check.', 'power ولا amplitude؟ اختار الـ dB لكل واحدة، وبعدين صحّح.')}</p></${Box}>
          <${Drill} id="dr-db" items=${A ? [
            { q: 'نسبة <b>power</b> قدرها 10&nbsp;000', o: ['20 dB', '40 dB', '80 dB', '4 dB'], a: 1, why: 'الـ power بتاخد ' + B('10·log<sub>10</sub>(10<sup>4</sup>) = 40 dB') },
            { q: 'نسبة <b>amplitude</b> قدرها 10&nbsp;000', o: ['40 dB', '80 dB', '4 dB', '160 dB'], a: 1, why: 'الـ amplitude بتاخد ' + B('20·log<sub>10</sub>(10<sup>4</sup>) = 80 dB') },
            { q: 'نسبة <b>power</b> قدرها 0.01', o: ['20 dB', '−20 dB', '−2 dB', '0.01 dB'], a: 1, why: 'الـ X أقل من الـ X<sub>0</sub>، فالـ dB سالبة: ' + B('10·log<sub>10</sub>(0.01) = −20 dB') },
            { q: 'الـ dynamic range لـ <bdi dir="ltr">12-bit</bdi> linear PCM بقاعدة السلايد', o: ['72 dB', '66 dB', '60 dB', '12 dB'], a: 1, why: 'أول bit مش بيتعدّ: ' + B('(12 − 1) × 6 = 66 dB') },
            { q: 'الفرق بين الـ 16-bit والـ 8-bit', o: ['8 dB', '48 dB', '54 dB', '96 dB'], a: 1, why: 'الفرق ' + B('90 − 42 = 48 dB') + '، يعني 8 bits' }
          ] : [
            { q: 'A <b>power</b> ratio of 10&nbsp;000', o: ['20 dB', '40 dB', '80 dB', '4 dB'], a: 1, why: 'Power uses 10·log<sub>10</sub>(10<sup>4</sup>) = 40 dB.' },
            { q: 'An <b>amplitude</b> ratio of 10&nbsp;000', o: ['40 dB', '80 dB', '4 dB', '160 dB'], a: 1, why: 'Amplitude uses 20·log<sub>10</sub>(10<sup>4</sup>) = 80 dB.' },
            { q: 'A <b>power</b> ratio of 0.01', o: ['20 dB', '−20 dB', '−2 dB', '0.01 dB'], a: 1, why: 'X &lt; X<sub>0</sub>, so negative: 10·log<sub>10</sub>(0.01) = −20 dB.' },
            { q: 'Dynamic range of 12-bit linear PCM, by the slide\'s rule', o: ['72 dB', '66 dB', '60 dB', '12 dB'], a: 1, why: 'The first bit does not count: (12 − 1) × 6 = 66 dB.' },
            { q: '16-bit vs 8-bit: the difference', o: ['8 dB', '48 dB', '54 dB', '96 dB'], a: 1, why: '90 − 42 = 48 dB, i.e. 8 bits\' worth.' }
          ]} />
        `, { sec: t('Exercise: decibels', 'تمرين: الـ decibels') }),

        // 12 · signal flow graph building blocks
        page(html`
          <${H1}>${t('Delay, multiply, add', 'أخّر، اضرب، اجمع')}</${H1}>
          <${P} small=${true}>${X('DSP algorithms are drawn as <b>signal flow graphs</b> and described by an equation. Three building blocks: <b>Delay</b> (a block labelled T, one sampling interval), <b>Multiplication</b> (weighting) and <b>Summation</b>.',
            'الـ DSP algorithms بتترسم كـ <b>signal flow graphs</b> وبتتوصف بمعادلة. فيه تلات building blocks: الـ <b>Delay</b> (block مكتوب عليه T بمقدار sampling interval واحد)، والـ <b>Multiplication</b> (الـ weighting)، والـ <b>Summation</b>.')}</${P}>
          <${Blocks} />
          <${UL} items=${A ? ['اتنين T ورا بعض بيأخّروا اتنين sampling intervals.', 'الـ ' + B('a = 0.5') + ' بتقسم الـ signal على اتنين.', 'العام للـ addition هو ' + B('y(n) = a<sub>1</sub>·x<sub>1</sub>(n) + a<sub>2</sub>·x<sub>2</sub>(n)') + '، والرسمة فوق لما ' + B('a<sub>1</sub> = a<sub>2</sub> = 1') + '.']
            : ['Two T blocks in series delay by two sampling intervals.', 'a = 0.5 halves the signal.', 'Addition in general: y(n) = a<sub>1</sub>·x<sub>1</sub>(n) + a<sub>2</sub>·x<sub>2</sub>(n); drawn here with a<sub>1</sub> = a<sub>2</sub> = 1.']} />
        `, { sec: t('Signal flow graphs', 'الـ Signal flow graphs') }),

        // 13 · the complete example and its worked run
        page(html`
          <${H2}>${t('Put the bricks together', 'ركّب القطع مع بعض')}</${H2}>
          <${Fx} f="y(n) = ½x(n) + ⅓x(n−1) + ¼x(n−2)" n=${t('two delays, three multipliers, one adder', 'فيه 2 delays و3 multipliers وadder واحد')} />
          <${P} small=${true}>${X('Its <b>impulse response</b> (input 1, 0, 0, …) is ½, ⅓, ¼, 0, 0, …: <b>finite</b>. The notes\' worked example feeds in x = 2, 4, 6, then zeros:',
            'الـ <b>impulse response</b> بتاعه (لما الـ input يبقى ' + B('1, 0, 0, …') + ') هو ' + B('½, ⅓, ¼, 0, 0, …') + '، يعني <b>finite</b>. ومثال النوتس المحلول بيدخّل ' + B('x = 2, 4, 6') + ' وبعدين أصفار:')}</${P}>
          <table className="hf-mm2-tb hf-in" dir="ltr"><thead><tr><th style=${{ width: '28px' }}>n</th><th style=${{ width: '44px' }}>x(n)</th><th style=${{ width: '52px' }}>x(n−1)</th><th style=${{ width: '52px' }}>x(n−2)</th><th>y(n)</th></tr></thead><tbody>
            ${[[0, 2, 0, 0, 1], [1, 4, 2, 0, 2.667], [2, 6, 4, 2, 4.833], [3, 0, 6, 4, 3], [4, 0, 0, 6, 1.5], [5, 0, 0, 0, 0]].map(r => html`<tr key=${r[0]}><td className="lb">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td className="k">${r[4]}</td></tr>`)}
          </tbody></table>
          <${Fx} left=${true} f="y(2) = ½·6 + ⅓·4 + ¼·2<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 3 + 1.333 + 0.5 = 4.833" />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('y(3) is <b>not 0</b> just because the input stopped: the delays still hold 6 and 4, so y(3) = ⅓·6 + ¼·4 = 3.',
            'الـ ' + B('y(3)') + ' <b>مش صفر</b> لمجرد إن الـ input خلص: الـ delays لسه شايلة 6 و4، يعني ' + B('y(3) = ⅓·6 + ¼·4 = 3') + '.')}</p></${Box}>
        `),

        // 14 · figure: run the example
        page(html`
          <${H2}>${t('Watch the samples flow through', 'اتفرج على الـ samples وهي ماشية')}</${H2}>
          <${Fig} name="mm-sfg-run" />
        `),

        // 15 · filtering
        page(html`
          <${H1}>${t('Filtering: pick the part you want', 'الـ Filtering: اختار الجزء اللي عايزه')}</${H1}>
          <${Def}>${X('<b>Filtering</b> (broad sense) = selecting portion(s) of data for some processing: <b>remove</b> it (low-pass, high-pass …), <b>attenuate</b> it (enhance or diminish, e.g. equalisation, effects/synthesis), or <b>process it in other ways</b>.',
            'الـ <b>Filtering</b> (بالمعنى الواسع) إنك تختار جزء من الـ data وتعمل عليه processing: <b>تشيله</b> (الـ low-pass والـ high-pass …)، أو <b>تعمله attenuate</b> (تقويه أو تضعّفه، زي الـ equalisation والـ effects والـ synthesis)، أو <b>تعالجه بطرق تانية</b>.')}</${Def}>
          <${UL} items=${A ? ['شيل الـ data أساسي في كل الـ representations الـ <b>lossy</b> تقريبًا: الـ JPEG والـ MPEG video والـ MPEG audio.', 'وفي الـ audio بنعمل filter للـ tone (الـ treble والـ bass)، والـ EQ، والـ subtractive synthesis.', 'فيه طريقتين: الـ <b>temporal domain</b> (زي الـ sampled PCM audio، بالـ impulse responses)، أو الـ <b>frequency domain</b> (بنحلل الـ frequency components).']
            : ['Removal of data is essential in almost all <b>lossy</b> representations: JPEG, MPEG video, MPEG audio.', 'In audio we also filter for tone (treble/bass), equalisation (EQ) and subtractive synthesis.', 'Two ways to filter: in the <b>temporal domain</b> (e.g. sampled PCM audio, via impulse responses) or in the <b>frequency domain</b> (analyse the frequency components).']} />
          <${Grow} />
          <${Hand}>${t('Temporal first: IIR and FIR. The frequency way waits for Fourier.', 'نبدأ بالـ temporal: الـ IIR والـ FIR. والـ frequency تستنى الـ Fourier.')}</${Hand}>
        `, { sec: t('IIR and FIR', 'الـ IIR والـ FIR') }),

        // 16 · IIR and FIR
        page(html`
          <${H2}>${t('Two families: IIR and FIR', 'عيلتين: الـ IIR والـ FIR')}</${H2}>
          <div className="hf-mm2-cards hf-in">
            <div className="hf-mm2-card"><b>${t('IIR: Infinite Impulse Response', 'الـ IIR: ‏Infinite Impulse Response')}</b>
              <span>${X('The output is <b>fed back</b> through weighted delays and summed into the new output: a <b>recursive</b> (feedback) system.', 'الـ output <b>بيرجع تاني (fed back)</b> عن طريق weighted delays وبيتجمع على الـ output الجديد، فده <b>recursive</b> (feedback) system.')}</span>
              <${Fx} f="y(n) = x(n) − a<sub>1</sub>y(n−1) − a<sub>2</sub>y(n−2)" />
              <${Fx} f="y(n) = x(n) − Σ<sub>k=1..M</sub> a<sub>k</sub>·y(n − k)" /></div>
            <div className="hf-mm2-card"><b>${t('FIR: Finite Impulse Response', 'الـ FIR: ‏Finite Impulse Response')}</b>
              <span>${X('Simpler, <b>no feedback loop</b>: the input goes through delay elements and a weighted sum gives the output. In general, with <b>N − 1 feed-forward delays</b>:', 'أبسط، و<b>مفيهوش feedback loop</b>: الـ input بيعدّي على delay elements والـ weighted sum بيدّي الـ output. والعام بـ <b><bdi dir="ltr">N&nbsp;−&nbsp;1</bdi> feed-forward delays</b>:')}</span>
              <${Fx} f="y(n) = b<sub>0</sub>x(n) + b<sub>1</sub>x(n−1) + b<sub>2</sub>x(n−2)" />
              <${Fx} f="y(n) = Σ<sub>k=0..N−1</sub> b<sub>k</sub>·x(n − k)" /></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Trick (ours): IIR has a y on the right-hand side, FIR only x.', 'حيلة من عندنا: الـ IIR فيه y على اليمين في المعادلة، والـ FIR فيه x بس.')}</${Hand}>
        `),

        // 17 · figure: impulse responses
        page(html`
          <${H2}>${t('One response stops, one never does', 'response بيقف، وresponse عمره ما بيقف')}</${H2}>
          <${P} small=${true}>${X('The notes\' IIR example: y(n) = x(n) − a<sub>1</sub>y(n − 1) with a<sub>1</sub> = −0.5, so y(n) = x(n) + 0.5y(n − 1). Impulse in → 1, 0.5, 0.25, 0.125, …: never exactly zero, hence "infinite".',
            'مثال الـ IIR في النوتس هو ' + B('y(n) = x(n) − a<sub>1</sub>y(n − 1)') + ' مع ' + B('a<sub>1</sub> = −0.5') + '، يعني ' + B('y(n) = x(n) + 0.5y(n − 1)') + '. الـ impulse بيطلّع ' + B('1, 0.5, 0.25, 0.125, …') + ' وعمره ما يوصل صفر بالظبط، وعشان كده "infinite".')}</${P}>
          <${Fig} name="mm-impulse" />
        `),

        // 18 · be the filter
        page(html`
          <${Box} kind="pencil" title=${t('Be the filter', 'خليك إنت الـ filter')}><p className="hf-p small">${X('New inputs, the notes\' two filters. Work out each y(n) and pick it. Do both FIR and IIR.',
            'فيه inputs جديدة على الـ filters اللي في النوتس. احسب كل ' + B('y(n)') + ' واختارها. اعمل الـ FIR والـ IIR.')}</p></${Box}>
          <${BeFilter} id="bf" />
        `, { sec: t('Be the filter', 'خليك إنت الـ filter') }),

        // 19 · fireside chat: FIR vs IIR
        page(html`
          <${Fireside} sub=${t('Tonight: two filters argue over who is the better listener.', 'قعدة الليلة: اتنين filters بيتخانقوا مين فيهم بيسمع أحسن.')} />
          <${Chat} names=${[t('FIR', 'الـ FIR'), t('IIR', 'الـ IIR')]} lines=${A ? [
            [0, 'أنا بسيط. مفيش <b>feedback loop</b>: الـ input بيعدّي على delays، و<b>weighted sum</b> بيطلّع الـ output.'],
            [1, 'وأنا برجّع الـ output بتاعي على weighted delays وأجمعه على الـ output الجديد. أنا <b>recursive</b>.'],
            [0, 'ادّيني impulse والـ response بتاعي يخلص: ' + B('½, ⅓, ¼') + ' وبعدين 0.'],
            [1, 'وبتاعي ' + B('1, 0.5, 0.25, 0.125, …') + ' وعمره ما يوصل صفر بالظبط. عشان كده اسمي <b>Infinite</b>.'],
            [0, 'معادلتي:' + L('y(n) = Σ b<sub>k</sub>·x(n−k)') + 'بـ <bdi dir="ltr">N&nbsp;−&nbsp;1</bdi> feed-forward delays.'],
            [1, 'ومعادلتي:' + L('y(n) = x(n) − Σ a<sub>k</sub>·y(n−k)') + 'وفي MATLAB الـ coefficients بتوعي هي <b>A</b>، وبتوعك <b>B</b>.'],
            [0, 'يعني <code>filter(B, A, X)</code> لما <bdi dir="ltr">A&nbsp;=&nbsp;1</bdi> يبقى أنا.'],
            [1, 'وأي <bdi dir="ltr">a(k)</bdi> زيادة بتضيف feedback، يعني أنا.']
          ] : [
            [0, 'I keep it simple. <b>No feedback loop</b>: the input goes through delays and a <b>weighted sum</b> gives the output.'],
            [1, 'I feed my output back through weighted delays and sum it into the new output. I am <b>recursive</b>.'],
            [0, 'Give me an impulse and my response ends: ½, ⅓, ¼, then 0.'],
            [1, 'Mine goes 1, 0.5, 0.25, 0.125, … and never becomes exactly zero. That is why I am <b>Infinite</b>.'],
            [0, 'My equation: y(n) = Σ b<sub>k</sub>·x(n − k), with N − 1 feed-forward delays.'],
            [1, 'Mine: y(n) = x(n) − Σ a<sub>k</sub>·y(n − k). In MATLAB my coefficients are <b>A</b>, yours are <b>B</b>.'],
            [0, 'So <code>filter(B, A, X)</code> with A = 1 is me.'],
            [1, 'And any further a(k) adds feedback: that is me.']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),

        // 20 · sort: IIR or FIR
        page(html`
          <${Box} kind="pencil" title=${t('IIR or FIR?', 'الـ IIR ولا الـ FIR؟')}><p className="hf-p small">${t('Tap IIR or FIR for each statement, then check.', 'دوس IIR أو FIR لكل جملة، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="srt" bins=${[['IIR', 'IIR'], ['FIR', 'FIR']]} items=${A ? [
            ['الـ output بيرجع تاني عن طريق weighted delays', 0],
            ['مفيهوش feedback loop', 1],
            ['نظام recursive', 0],
            ['المعادلة <code>y(n)=Σ b<sub>k</sub>x(n−k)</code>', 1],
            ['الـ impulse response ' + B('1, 0.5, 0.25, …') + ' وعمره ما يخلص', 0],
            ['فيه ' + B('N − 1') + ' feed-forward delays', 1],
            ['الـ <code>filter(B, A, X)</code> لما ' + B('A = 1'), 1],
            ['المعادلة <code>y(n)=x(n)−Σ a<sub>k</sub>y(n−k)</code>', 0]
          ] : [
            ['The output is fed back through weighted delays', 0],
            ['No feedback loop', 1],
            ['A recursive system', 0],
            ['<code>y(n)=Σ b<sub>k</sub>x(n−k)</code>', 1],
            ['Impulse response 1, 0.5, 0.25, … never ends', 0],
            ['N − 1 feed-forward delays', 1],
            ['<code>filter(B, A, X)</code> with A = 1', 1],
            ['<code>y(n)=x(n)−Σ a<sub>k</sub>y(n−k)</code>', 0]
          ]} />
        `),

        // 21 · MATLAB filter() and IIRdemo
        page(html`
          <${H2}>${t('Filters in MATLAB', 'الـ Filters في MATLAB')}</${H2}>
          <${P} small=${true}>${X('A filter is two coefficient vectors: <b>A = {a<sub>k</sub>}</b> (feedback) and <b>B = {b<sub>k</sub>}</b> (feed-forward). <code>filter(B,A,X)</code> implements a "Direct Form II Transposed" IIR/FIR hybrid:',
            'الـ filter عبارة عن 2 coefficient vectors: الـ <b><bdi dir="ltr">A&nbsp;=&nbsp;{a<sub>k</sub>}</bdi></b> للـ feedback، والـ <b><bdi dir="ltr">B&nbsp;=&nbsp;{b<sub>k</sub>}</bdi></b> للـ feed-forward. والـ <code>filter(B,A,X)</code> بتنفّذ hybrid بين الـ IIR والـ FIR اسمه "Direct Form II Transposed":')}</${P}>
          <${Fx} left=${true} f="a(1)y(n) = b(1)x(n) + …<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ b(nb+1)x(n − nb)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;− a(2)y(n − 1) − …<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;− a(na+1)y(n − na)" />
          <${UL} items=${A ? ['لو ' + B('a(1) ≠ 1') + ' الـ coefficients <b>بتتقسم على a(1)</b> (normalised).', 'ولو ' + B('a(1) = 0') + ' بيطلع <b>error</b>.', 'لما ' + B('A = 1') + ' مفيش feedback، يعني FIR. وأي ' + B('a(k)') + ' زيادة بتضيف feedback، يعني IIR.']
            : ['If a(1) ≠ 1 the coefficients are <b>normalised by a(1)</b>.', 'a(1) = 0 gives an <b>error</b>.', 'With A = 1 there is no feedback: FIR. Any further a(k) adds feedback: IIR.']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('In <code>filter(B,A,X)</code> the <b>B</b> (feed-forward) comes <b>first</b>, then A (feedback).', 'في <code>filter(B,A,X)</code> الـ <b>B</b> (الـ feed-forward) بتيجي <b>الأول</b>، وبعدين الـ A (الـ feedback).')}</p></${Box}>
        `),

        // 22 · IIRdemo.m by hand
        page(html`
          <${H2}>${t('A filter by hand: IIRdemo.m', 'الـ filter بالإيد: IIRdemo.m')}</${H2}>
          <${P} small=${true}>${X('Filter banks can be <b>hand-created</b>. IIRdemo.m uses cut-off fg = 4000 Hz and sampling fa = 48000 Hz, computes k = tan(π·fg/fa) and the 2nd-order coefficients b(1..3), a(1..3) with a(1) = 1, then applies them in a loop with state variables xh1, xh2, yh1, yh2:',
            'الـ filter banks ممكن <b>تتعمل بالإيد</b>. الـ IIRdemo.m بيستخدم:' + L('fg = 4000 Hz (cut-off), fa = 48000 Hz<br/>k = tan(π·fg/fa)') + 'وبيحسب الـ 2nd-order coefficients ' + B('b(1..3), a(1..3)') + ' مع ' + B('a(1) = 1') + '، وبعدين يطبّقهم في loop بالـ state variables:')}</${P}>
          <${K.Code} lines=${['for n=1:N', '  y(n)=b(1)*x(n) + b(2)*xh1 ...', '    + b(3)*xh2 - a(2)*yh1 ...', '    - a(3)*yh2;', '  xh2=xh1; xh1=x(n);', '  yh2=yh1; yh1=y(n);', 'end;']} />
          <${P} small=${true}>${X('Or let MATLAB make the filter: <code>butter, buttord, besself, cheby1, cheby2, ellip</code>.', 'أو خلّي MATLAB يعمل الـ filter بـ <code>butter, buttord, besself</code> و<code>cheby1, cheby2, ellip</code>.')}</${P}>
          <${Grow} />
          <${Talk} who="cpu">${X('Still, <code>filter()</code> is preferable: it is general, any filter length. The loop above is fixed at 2nd order.', 'برضه الـ <code>filter()</code> أحسن لأنها عامة وتنفع لأي طول. الـ loop اللي فوق ثابت على الـ 2nd order.')}</${Talk}>
        `),

        // 22 · Fourier transform: the idea
        page(html`
          <${H1}>${t('Same sound, another language', 'نفس الصوت، بلغة تانية')}</${H1}>
          <${Def}>${X('The <b>Fourier Transform (FT)</b> converts a temporal (time) or spatial description into the <b>frequency domain</b>: we think in underlying sinusoids of varying <b>frequency, amplitude and phase</b>, not sample/pixel intensities.',
            'الـ <b>Fourier Transform (FT)</b> بيحوّل الوصف الزمني (time) أو المكاني (spatial) لـ <b>frequency domain</b>: بنفكر في sinusoids بـ <b>frequency وamplitude وphase</b> مختلفين، مش في intensities الـ samples أو الـ pixels.')}</${Def}>
          <${P} small=${true}>${X('Used for filtering, noise removal, signal/image analysis, a simple implementation of <b>convolution</b>, audio/image effects, restoration (deblurring) and compression (MPEG and JPEG use related techniques).',
            'بيتستخدم في الـ filtering والـ noise removal وتحليل الـ signals والصور، وتنفيذ بسيط للـ <b>convolution</b>، والـ effects، والـ deblurring، والـ compression (الـ MPEG والـ JPEG).')}</${P}>
          <${UL} items=${A ? ['الـ <b>chord</b> بتاع البيانو: في الـ temporal domain هو amplitude متاخد منه samples كتير في الثانية، وفي الـ frequency domain هو pitches النوتات والـ amplitudes بتاعتها:' + L('D♭ 554.40 Hz, F 698.48 Hz,<br/>A♭ 830.64 Hz, C 1046.56 Hz') + 'زائد الـ harmonics.', 'الـ <b>sine بـ <bdi dir="ltr">8&nbsp;Hz</bdi></b> بتعمل 8 cycles في الثانية، والـ spectrum بتاعها فيه <b>peak واحدة عند <bdi dir="ltr">8&nbsp;Hz</bdi></b> بـ magnitude 1.0 (الـ signal كلها).']
            : ['A piano <b>chord</b>: temporal domain = amplitude sampled many times a second; frequency domain = the pitches of the notes and their amplitudes: D♭ 554.40 Hz, F 698.48 Hz, A♭ 830.64 Hz, C 1046.56 Hz, plus harmonics.', 'An <b>8 Hz sine</b> completes 8 cycles per second; its spectrum has <b>one peak at 8 Hz</b> with magnitude 1.0 (the whole signal).']} />
        `, { sec: t('The Fourier transform', 'الـ Fourier transform') }),

        // 23 · spatial frequencies, decomposition, equaliser
        page(html`
          <${H2}>${t('Pictures have frequencies too', 'الصور ليها frequencies برضه')}</${H2}>
          <${UL} items=${A ? ['الـ brightness على خط بتتسجل عند مسافات متساوية أو كـ <b>spatial frequencies</b>، والصورة بتدّي grid 2D.', 'الـ <b>high-frequency components الكبيرة</b> يعني data بتتغير بسرعة على مسافات قصيرة (زي صفحة text، والـ noise بيدّي frequencies عالية جدًا).', 'الـ <b>low-frequency components الكبيرة</b> يعني الـ features الكبيرة مسيطرة (زي object واحد مالي الصورة).']
            : ['Brightness along an image line can be recorded at equally spaced distances or as a set of <b>spatial frequencies</b>; an image gives a 2D grid of them.', '<b>Large high-frequency components</b> → data changing rapidly over short distances (a page of text; noise gives very high frequencies).', '<b>Large low-frequency components</b> → large-scale features dominate (one simple object filling the image).']} />
          <${Def}>${X('<b>Sinusoidal decomposition</b>: any digital signal can be decomposed into sine waves of different amplitude, frequency and phase that add back to the original. Additive synthesis example: a 200 Hz square(ish) wave = sinusoids at <b>200, 600, 1000 Hz …</b> (odd multiples).',
            'الـ <b>Sinusoidal decomposition</b>: أي digital signal يتفكك لـ sine waves بـ amplitude وfrequency وphase مختلفين، ومجموعهم يرجّع الأصل. مثال الـ additive synthesis: الـ square wave (تقريبًا) بـ <bdi dir="ltr">200&nbsp;Hz</bdi> هي sinusoids عند <b><bdi dir="ltr">200,&nbsp;600,&nbsp;1000&nbsp;Hz&nbsp;…</bdi></b> (المضاعفات الفردية).')}</${Def}>
          <${P} small=${true}>${X('So filtering in frequency space = attenuating or removing frequencies: <b>low-pass</b> (ignore high-frequency noise, keep low), <b>high-pass</b> (the opposite), <b>band-pass</b> (only a range). Think of a <b>graphic equaliser</b>.',
            'فالـ filtering هنا يعني attenuate أو شيل frequencies: الـ <b>low-pass</b> (ترمي الـ high-frequency noise)، والـ <b>high-pass</b> (العكس)، والـ <b>band-pass</b> (range بس). زي الـ <b>graphic equaliser</b>.')}</${P}>
        `),

        // 24 · figure: additive synthesis
        page(html`
          <${H2}>${t('Build a square wave out of sines', 'ابني square wave من sines')}</${H2}>
          <${Fig} name="mm-additive" />
        `),

        // 25 · FT formulas
        page(html`
          <${H2}>${t('The transform, in symbols', 'الـ transform بالرموز')}</${H2}>
          <${Fx} f="F(u) = ∫ f(x)·e<sup>−2πixu</sup> dx" n=${t('1D FT, the integral from −∞ to ∞', 'الـ 1D FT، والـ integral من ‎−∞‎ لـ ∞')} />
          <${P} small=${true}>${X('F(u) is generally <b>complex</b>, even for real data: both magnitude and <b>phase</b> matter; e<sup>−2πixu</sup> is a phasor.', 'الـ ' + B('F(u)') + ' غالبًا بيطلع <b>complex</b> حتى لو الـ data real: الـ magnitude والـ <b>phase</b> الاتنين مهمين، والـ ' + B('e<sup>−2πixu</sup>') + ' ده phasor.')}</${P}>
          <${Fx} f="f(x) = ∫ F(u)·e<sup>+2πixu</sup> du" n=${t('inverse FT: same form, the exponent\'s sign is opposite (positive)', 'الـ inverse FT: نفس الشكل، بس إشارة الأُس عكس (موجبة)')} />
          <${Fx} f="F(u,v) = ∬ f(x,y)·e<sup>−2πi(xu+yv)</sup> dx dy" n=${t('2D FT for images; the inverse uses +', 'الـ 2D FT للصور، والـ inverse بيستخدم +')} />
          <${Grow} />
          <${Box} kind="relax" title=${t('Maths tools you will need', 'أدوات رياضة هتحتاجها')}>
            <${Fx} left=${true} f="sin(−x) = −sin(x)  (odd)<br/>cos(−x) = cos(x)  (even)<br/>r·e<sup>iφ</sup> = r(cos φ + i sin φ)<br/>∫e<sup>kx</sup>dx = e<sup>kx</sup>/k" /></${Box}>
        `, { sec: t('FT formulas and the DFT', 'قوانين الـ FT والـ DFT') }),

        // 26 · top hat → sinc, figure
        page(html`
          <${H2}>${t('A top hat turns into a sinc', 'الـ top hat بيبقى sinc')}</${H2}>
          <${P} small=${true}>${X('f(x) = 1 for |x| ≤ 1, 0 otherwise → F(u) = (−1/2πiu)(e<sup>−2πiu</sup> − e<sup>2πiu</sup>) = <b>sin(2πu)/(πu)</b>, the <b>sinc function</b>. Purely real because f is <b>even</b>. Peak 2 at u → 0 (the area of the top hat); zeros at u = ±0.5, ±1, ±1.5 …',
            'الـ ' + B('f(x) = 1') + ' لما ' + B('|x| ≤ 1') + ' و0 غير كده، فبيطلع:' + L('F(u) = (−1/2πiu)(e<sup>−2πiu</sup> − e<sup>2πiu</sup>) = sin(2πu)/(πu)') + 'ودي الـ <b>sinc function</b>، real بالكامل لأن f <b>even</b>. أعلى قيمة 2 لما ' + B('u → 0') + ' (مساحة الـ top hat)، والأصفار عند ' + B('u = ±0.5, ±1, ±1.5 …') + '.')}</${P}>
          <${Fig} name="mm-sinc" />
        `),

        // 27 · the DFT
        page(html`
          <${H2}>${t('Digital data: the DFT', 'الـ data الـ digital: الـ DFT')}</${H2}>
          <${P} small=${true}>${X('For digitised data, replace the integral by a sum over N equally spaced samples:', 'للـ data الـ digitised بنبدّل الـ integral بـ sum على N sample متساويين المسافات:')}</${P}>
          <${Fx} f="F(u) = (1/N) Σ<sub>x=0..N−1</sub> f(x)·e<sup>−2πixu/N</sup>" n=${t('inverse: f(x) = Σ F(u)·e<sup>2πixu/N</sup>', 'والـ inverse هو <bdi dir="ltr">f(x)&nbsp;=&nbsp;Σ&nbsp;F(u)·e<sup>2πixu/N</sup></bdi>')} />
          <${UL} items=${A ? ['الفرق عن الـ continuous: factor ' + B('1/N') + ' <b>جوه الأُس</b>، و' + B('1/N') + ' <b>قدام الـ forward transform بس</b>.', 'الـ 2D DFT على grid ' + B('N × M') + ' بيبقى:' + L('F(u,v) = (1/NM) ΣΣ f(x,y)e<sup>−2πi(xu/N+yv/M)</sup>') + 'وللصور المربعة ' + B('(N = M)') + ' بيتعمله rebalance بـ ' + B('1/N') + ' قدام الـ forward والـ inverse الاتنين.']
            : ['Differences from continuous: a factor 1/N <b>inside the exponent</b>, and 1/N <b>in front of the forward transform only</b>.', '2D DFT on an N × M grid: F(u,v) = (1/NM) ΣΣ f(x,y)e<sup>−2πi(xu/N+yv/M)</sup>. For square images (N = M) it is rebalanced with 1/N in front of both forward and inverse.']} />
          <${K.Code} lines=${[['fft(X)   ifft', '1D'], ['fft2(X)  ifft2', '2D'], ['fftn(X)  ifftn', 'N-D']]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<code>fft(X)</code> on a matrix works <b>per column, NOT 2D</b>. For an image use <code>fft2</code>.', 'الـ <code>fft(X)</code> على matrix بتشتغل <b>لكل column، مش 2D</b>. للصورة استخدم <code>fft2</code>.')}</p></${Box}>
        `),

        // 28 · magnitude, phase, bins
        page(html`
          <${H2}>${t('Reading a spectrum', 'إزاي تقرا spectrum')}</${H2}>
          <${Fx} f="|F(k)| = √(F<sub>R</sub>(k)<sup>2</sup> + F<sub>I</sub>(k)<sup>2</sup>)" n=${t('magnitude spectrum, MATLAB <code>abs(fft(X,N))/N</code>', 'الـ magnitude spectrum، وفي MATLAB <code>abs(fft(X,N))/N</code>')} />
          <${Fx} f="φ = arctan(F<sub>I</sub>(k) / F<sub>R</sub>(k))" n=${t('phase spectrum, MATLAB <code>angle</code>', 'الـ phase spectrum، وفي MATLAB <code>angle</code>')} />
          <${Hand}>${X('F = 3 + 4i → |F| = √(9 + 16) = 5, φ = arctan(4/3) ≈ 53.13°', 'مثال النوتس:' + L('F = 3 + 4i<br/>|F| = √(9 + 16) = 5<br/>φ = arctan(4/3) ≈ 53.13°'))}</${Hand}>
          <${Fx} f="f<sub>k</sub> = k·f<sub>s</sub> / N" n=${t('sample point k → frequency: equidistant steps of f<sub>s</sub>/N from 0 to (N−1)f<sub>s</sub>/N Hz', 'من الـ sample point k للـ frequency: خطوات متساوية قدها <bdi dir="ltr">f<sub>s</sub>/N</bdi> من 0 لـ <bdi dir="ltr">(N−1)f<sub>s</sub>/N</bdi>')} />
          <${Grow} />
          <${Talk} who="table">${X('f<sub>s</sub> = 8000 Hz, N = 256: each step is 8000/256 = <b>31.25 Hz</b>, so k = 32 is 32 × 31.25 = <b>1000 Hz</b>.', 'لو ' + B('f<sub>s</sub> = 8000 Hz') + ' و' + B('N = 256') + '، الخطوة ' + B('8000/256 = 31.25 Hz') + '، يعني الـ ' + B('k = 32') + ' هو ' + B('32 × 31.25 = 1000 Hz') + '.')}</${Talk}>
        `),

        // 29 · spectrogram
        page(html`
          <${H2}>${t('Frequencies over time: the spectrogram', 'الـ frequencies مع الوقت: الـ spectrogram')}</${H2}>
          <${P} small=${true}>${X('A <b>spectrogram</b> (time-frequency): split the signal into segments and do a windowed <b>Short-Time Fourier Transform (STFT)</b> on each. A <b>Blackman, Hamming or Hanning</b> window reduces the <b>leakage</b> effect.',
            'الـ <b>spectrogram</b> (time-frequency): بتقسم الـ signal لـ segments وتعمل لكل واحد <b>Short-Time Fourier Transform (STFT)</b> بـ window، والـ window من نوع <b>Blackman أو Hamming أو Hanning</b> بيقلل الـ <b>leakage</b>.')}</${P}>
          <${K.Code} lines=${['spectrogram(y,512,20,1024,Fs)']} />
          <${P} small=${true}>${X('Aphex Twin famously hid images (his face) in the spectrogram of tracks on the Windowlicker EP.', 'والـ Aphex Twin خبّى صور (وشّه) في الـ spectrogram بتاع tracks في الـ Windowlicker EP.')}</${P}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['ليه الـ forward بس اللي قدامه 1/N؟', 'ده تعريف الـ DFT في النوتس. للصور المربعة بس بيبقى ' + B('1/N') + ' قدام الاتنين.'],
            ['الـ Butterworth window من الـ windows بتاعة الـ STFT؟', 'لأ. الـ windows هي Blackman وHamming وHanning. الـ Butterworth ده <b>low-pass filter</b> جاي بعد شوية.']
          ] : [
            ['Why does only the forward DFT have the 1/N?', 'That is the DFT as the notes define it. Only for square images is it rebalanced with 1/N in front of both.'],
            ['Is Butterworth one of the STFT windows?', 'No. The windows are Blackman, Hamming and Hanning. Butterworth is a <b>low-pass filter</b>, coming up soon.']
          ]} />
        `),

        // 30 · figure: spectrogram
        page(html`
          <${H2}>${t('Build a spectrogram, see the leakage', 'ابني spectrogram وشوف الـ leakage')}</${H2}>
          <${Fig} name="mm-spectrogram" />
        `),

        // 31 · filtering in the frequency domain
        page(html`
          <${H1}>${t('Filtering by multiplying', 'الـ Filtering بالضرب')}</${H1}>
          <${P} small=${true}>${X('Noise (audio hiss, "salt and pepper" in images, transmission noise e.g. from a low-power space probe) = spurious <b>high frequencies</b> (rapid local transitions). So a properly tuned <b>low-pass filter</b> reduces noise. Not all high-frequency data is noise, though.',
            'الـ noise (الـ hiss في الصوت، والـ "salt and pepper" في الصور، وnoise الإرسال زي من space probe ضعيف) عبارة عن <b>high frequencies</b> مش حقيقية (تغيّرات محلية سريعة). فالـ <b>low-pass filter</b> لو متظبط صح بيقلل الـ noise. بس مش كل الـ high-frequency data تبقى noise.')}</${P}>
          <${Fx} f="G(u,v) = H(u,v)·F(u,v)" n=${t('F = FT of the image, H = filter, G = FT of the improved image; inverse FT G → g(x,y). MATLAB: <code>G = H.*F</code>', 'الـ F هي الـ FT بتاع الصورة، والـ H الـ filter، والـ G الـ FT بتاع الصورة بعد التحسين، وبعدين inverse FT لـ G يطلّع <bdi dir="ltr">g(x,y)</bdi>. وفي MATLAB: <code>G = H.*F</code>')} />
          <${Def}>${X('<b>Ideal low-pass</b>, 1D: H(u) = 1 for 0 ≤ u ≤ u<sub>0</sub> (the cut-off), 0 elsewhere: a top hat. 2D: H(u,v) = 1 if √(u<sup>2</sup> + v<sup>2</sup>) ≤ w<sub>0</sub>, else 0: keep a <b>circle</b> of radius w<sub>0</sub>.',
            'الـ <b>Ideal low-pass</b> في الـ 1D: الـ ' + B('H(u) = 1') + ' لما ' + B('0 ≤ u ≤ u<sub>0</sub>') + ' (الـ cut-off)، و0 في أي مكان تاني، يعني top hat. وفي الـ 2D الـ ' + B('H(u,v) = 1') + ' لو ' + B('√(u<sup>2</sup> + v<sup>2</sup>) ≤ w<sub>0</sub>') + '، غير كده 0: بنحتفظ بـ <b>دايرة</b> نص قطرها w<sub>0</sub>.')}</${Def}>
          <${Grow} />
          <${Hand}>${X('w<sub>0</sub> = 20: (12, 16) → √400 = 20 → kept; (15, 16) → √481 ≈ 21.9 → discarded.', 'لو ' + B('w<sub>0</sub> = 20') + '، النقطة ' + B('(12, 16)') + ' بتتساب لأن ' + B('√400 = 20') + '، و' + B('(15, 16)') + ' بتترمي لأن ' + B('√481 ≈ 21.9') + '.')}</${Hand}>
        `, { sec: t('Frequency-domain filtering', 'الـ Filtering في الـ frequency domain') }),

        // 32 · the trouble, and Butterworth
        page(html`
          <${H2}>${t('The trouble with a sharp cut', 'مشكلة القطع الحاد')}</${H2}>
          <${P} small=${true}>${X('Useful high frequencies exist too (audio: high pitches, cymbals, rustles; images: <b>edges</b>). Choosing the cut-off is hard, like choosing a threshold. A wrong or low cut-off <b>blurs</b>: audio sounds <b>muffled</b>, image edges blur; the lower the cut-off, the worse.',
            'فيه high frequencies مفيدة برضه (في الصوت: الـ pitches العالية والـ cymbals والخشخشة، وفي الصور: الـ <b>edges</b>). واختيار الـ cut-off صعب زي اختيار threshold. لو الـ cut-off غلط أو واطي بيحصل <b>blur</b>: الصوت يبقى <b>مكتوم (muffled)</b> وحواف الصورة تبوظ، وكل ما يوطى كل ما يبقى أوحش.')}</${P}>
          <${Fx} f="H(u,v) = 1 / (1 + [(u<sup>2</sup> + v<sup>2</sup>) / w<sub>0</sub><sup>2</sup>]<sup>n</sup>)" n=${t('Butterworth low-pass, n = order', 'الـ Butterworth low-pass، والـ n هو الـ order')} />
          <${UL} items=${A ? ['هو <b>top hat ناعم (smoothed)</b>، دايرة blurred في الـ 2D: بيحتفظ بشوية high-frequency information فـ<b>بيقلل الـ blurring</b> والـ ringing مقارنةً بالـ ideal.', 'عند الـ cut-off بالظبط ' + B('H = 1/2') + '. والـ 2nd order عند ضعف الـ cut-off:' + L('1/(1 + 4<sup>2</sup>) = 1/17 ≈ 0.059'), 'الـ noise بيتضاف في MATLAB بـ <code>imnoise()</code>. والـ cut-off الأوطى بيشيل noise أكتر بس بيعمل blur أكتر.']
            : ['A <b>smoothed top hat</b> (a blurred circle in 2D): it keeps some high-frequency information and so <b>reduces blurring</b>/ringing compared with the ideal filter.', 'At the cut-off H = 1/2. 2nd order at twice the cut-off: 1/(1 + 4<sup>2</sup>) = 1/17 ≈ 0.059.', 'Noise is added in MATLAB with <code>imnoise()</code>; a lower cut-off removes more noise but blurs more.']} />
        `, { sec: t('Butterworth', 'الـ Butterworth') }),

        // 33 · figure: ideal vs Butterworth on images
        page(html`
          <${H2}>${t('Filter the slides\' images yourself', 'اعمل filter لصور السلايدز بنفسك')}</${H2}>
          <${Fig} name="mm-image-lpf" />
        `),

        // 34 · interview with the Butterworth filter
        page(html`
          <${Interview} title=${t('Butterworth, exposed', 'الـ Butterworth على المكشوف')} sub=${t("This week's interview: the low-pass filter that refuses to cut sharply.", 'حوار الأسبوع: الـ low-pass filter اللي رافض يقطع بحدّة.')} lines=${A ? [
            ['المذيع', 'إيه مشكلتك مع الـ ideal low-pass؟'],
            ['الـ Butterworth', 'هو top hat: 1 جوه الـ cut-off و0 برّه. بيرمي الـ edges مع الـ noise، فالصورة <b>تتعمل blur</b> والصوت يبقى <b>muffled</b>.'],
            ['المذيع', 'وإنت؟'],
            ['الـ Butterworth', 'أنا <b>top hat ناعم</b>. بسيب شوية high-frequency information، فبـ<b>قلل الـ blurring والـ ringing</b>.'],
            ['المذيع', 'وعند الـ cut-off نفسه؟'],
            ['الـ Butterworth', 'أنا بالظبط <b>1/2</b>. ولو الـ order بتاعي 2، عند ضعف الـ cut-off بقى ' + B('1/17 ≈ 0.059') + '.'],
            ['المذيع', 'وتقدر تبقى حاد؟'],
            ['الـ Butterworth', 'كل ما الـ order n يعلى، بقرّب من الـ ideal top hat.']
          ] : [
            ['Head First', 'What is your problem with the ideal low-pass?'],
            ['Butterworth', 'It is a top hat: 1 inside the cut-off, 0 outside. It throws away edges with the noise, so images <b>blur</b> and audio goes <b>muffled</b>.'],
            ['Head First', 'And you?'],
            ['Butterworth', 'I am a <b>smoothed top hat</b>. I keep some high-frequency information, so I <b>reduce the blurring and ringing</b>.'],
            ['Head First', 'What happens right at the cut-off?'],
            ['Butterworth', 'I am exactly <b>1/2</b> there. At order 2, twice the cut-off gives 1/17 ≈ 0.059.'],
            ['Head First', 'Can you be sharp if you want?'],
            ['Butterworth', 'Raise my order n and I get closer to the ideal top hat.']
          ]} />
        `),

        // 35 · Fourier and filter drill
        page(html`
          <${Box} kind="pencil" title=${t('Spectrum and filter drill', 'تمرين الـ spectrum والـ filters')}><p className="hf-p small">${t('Numbers from this half of the chapter. Pick, then check.', 'أرقام من النص ده من الفصل. اختار، وبعدين صحّح.')}</p></${Box}>
          <${Drill} id="dr-ft" items=${A ? [
            { q: 'الـ <bdi dir="ltr">|F|</bdi> لـ <bdi dir="ltr">F&nbsp;=&nbsp;6&nbsp;+&nbsp;8i</bdi>', o: ['14', '10', '100', '2'], a: 1, why: 'لأن ' + B('√(36 + 64) = √100 = 10') },
            { q: 'الخطوة <bdi dir="ltr">f<sub>s</sub>/N</bdi> لما <bdi dir="ltr">f<sub>s</sub>&nbsp;=&nbsp;16000&nbsp;Hz</bdi> و<bdi dir="ltr">N&nbsp;=&nbsp;512</bdi>', o: ['32 Hz', '31.25 Hz', '62.5 Hz', '8000 Hz'], a: 1, why: 'الخطوة ' + B('16000 / 512 = 31.25 Hz') },
            { q: 'بنفس الأرقام، الـ <bdi dir="ltr">k&nbsp;=&nbsp;64</bdi> يبقى كام؟', o: ['64 Hz', '1000 Hz', '2000 Hz', '4000 Hz'], a: 2, why: 'لأن ' + B('64 × 31.25 = 2000 Hz') },
            { q: 'الـ ideal 2D low-pass بـ <bdi dir="ltr">w<sub>0</sub>&nbsp;=&nbsp;10</bdi>: النقطة <bdi dir="ltr">(6,&nbsp;8)</bdi>', o: ['kept', 'discarded'], a: 0, why: 'لأن ' + B('√(36 + 64) = 10 ≤ 10') + '، يعني kept' },
            { q: 'الـ Butterworth من الـ order 1 عند <bdi dir="ltr">u&nbsp;=&nbsp;2w<sub>0</sub>,&nbsp;v&nbsp;=&nbsp;0</bdi>', o: ['0.5', '0.2', '1/17', '0.25'], a: 1, why: 'لأن ' + B('1/(1 + 4<sup>1</sup>) = 1/5 = 0.2') }
          ] : [
            { q: '|F| for F = 6 + 8i', o: ['14', '10', '100', '2'], a: 1, why: '√(36 + 64) = √100 = 10.' },
            { q: 'Step f<sub>s</sub>/N for f<sub>s</sub> = 16000 Hz, N = 512', o: ['32 Hz', '31.25 Hz', '62.5 Hz', '8000 Hz'], a: 1, why: '16000 / 512 = 31.25 Hz.' },
            { q: 'Same numbers: which frequency is k = 64?', o: ['64 Hz', '1000 Hz', '2000 Hz', '4000 Hz'], a: 2, why: '64 × 31.25 = 2000 Hz.' },
            { q: 'Ideal 2D low-pass, w<sub>0</sub> = 10: the point (6, 8) is', o: ['kept', 'discarded'], a: 0, why: '√(36 + 64) = 10 ≤ 10, so it is kept.' },
            { q: '1st-order Butterworth at u = 2w<sub>0</sub>, v = 0', o: ['0.5', '0.2', '1/17', '0.25'], a: 1, why: '1/(1 + 4<sup>1</sup>) = 1/5 = 0.2.' }
          ]} />
        `, { sec: t('Exercise: spectra and filters', 'تمرين: الـ spectra والـ filters') }),

        // 36 · other filters + match
        page(html`
          <${H2}>${t('The rest of the filter family', 'باقي عيلة الـ filters')}</${H2}>
          <${P} small=${true}>${X('A high-pass filter is usually defined as <b>1 − low-pass = 1 − H</b>. Match each filter to what it does: tap a filter, then its job.',
            'الـ high-pass filter عادةً بيتعرّف إنه ' + B('1 − low-pass = 1 − H') + '. وصّل كل filter بشغلانته: دوس على الـ filter وبعدين على شغلانته.')}</${P}>
          <${Match} id="flt" left=${A ? ['الـ Low-pass', 'الـ High-pass', 'الـ Band-pass', 'الـ Band-reject', 'الـ Notch', 'الـ Resonator'] : ['Low-pass', 'High-pass', 'Band-pass', 'Band-reject', 'Notch', 'Resonator']}
            right=${A ? ['تكبّر band ضيق حوالين <bdi>u<sub>0</sub></bdi>', 'تسيب ' + B('u<sub>0</sub> … u<sub>1</sub>') + ' بس', 'تسيب من 0 لـ <bdi>u<sub>0</sub></bdi> وترمي الباقي', 'تختار اللي فوق <bdi>u<sub>0</sub></bdi>، وعادةً ' + B('1 − H'), 'تضعّف band ضيق حوالين <bdi>u<sub>0</sub></bdi>', 'تضعّف ' + B('u<sub>0</sub> … u<sub>1</sub>')]
              : ['Amplify a narrow band around u<sub>0</sub>', 'Keep only u<sub>0</sub> … u<sub>1</sub>', 'Keep 0 … u<sub>0</sub>, drop the rest', 'Select above u<sub>0</sub>; usually 1 − H', 'Attenuate a narrow band around u<sub>0</sub>', 'Attenuate u<sub>0</sub> … u<sub>1</sub>']}
            answer=${[2, 3, 1, 5, 4, 0]} />
        `, { sec: t('Other filters', 'الـ Filters التانية') }),

        // 37 · convolution
        page(html`
          <${H1}>${t('Convolution: reflect, slide, overlap', 'الـ Convolution: اعكس، زُق، قيس التداخل')}</${H1}>
          <${P} small=${true}>${X('Effects described by convolution: <b>filtering</b> (Fourier filtering is convolution with a low-pass filter), <b>deblurring</b> (high-pass filtering), <b>reverb</b> (impulse response convolution); edge detection was a discrete example.',
            'الـ convolution بيوصف الـ <b>filtering</b> (الـ Fourier filtering هو convolution مع low-pass filter)، والـ <b>deblurring</b> (high-pass)، والـ <b>reverb</b> (مع impulse response)، والـ edge detection كان مثال discrete.')}</${P}>
          <${Fx} f="f(x) * g(x) = ∫ f(α)·g(x − α) dα" n=${t('g(−α) = g reflected in the y-axis; g(x − α) = that shifted right by x; the integral = the <b>area of overlap</b>', 'الـ <bdi dir="ltr">g(−α)</bdi> انعكاس g حوالين محور y، والـ <bdi dir="ltr">g(x&nbsp;−&nbsp;α)</bdi> نفس الانعكاس متزحلق يمين بـ x، والـ integral هو <b>مساحة التداخل</b>')} />
          <${P} small=${true}>${X('Example: f = top hat (1 for |α| ≤ 1), g = ½ for 0 ≤ α ≤ 1:', 'مثال: الـ f هي top hat (بتساوي 1 لما ' + B('|α| ≤ 1') + ')، والـ g بتساوي ½ لما ' + B('0 ≤ α ≤ 1') + ':')}</${P}>
          <table className="hf-mm2-tb hf-in" dir="ltr"><thead><tr><th>x</th><th>f * g</th></tr></thead><tbody>
            <tr><td>−1 ≤ x ≤ 0</td><td className="k">(x + 1)/2</td></tr><tr><td>0 ≤ x ≤ 1</td><td className="k">½</td></tr><tr><td>1 ≤ x ≤ 2</td><td className="k">1 − x/2</td></tr><tr><td>${t('otherwise (no overlap)', 'otherwise')}</td><td className="k">0</td></tr></tbody></table>
          <${Grow} />
          <${Hand}>${X('Check: x = −0.5 → (−0.5 + 1)/2 = 0.25; x = 1.5 → 1 − 1.5/2 = 0.25.', 'اتأكد: ' + B('(−0.5 + 1)/2 = 0.25') + ' و' + B('1 − 1.5/2 = 0.25'))}</${Hand}>
        `, { sec: t('Convolution', 'الـ Convolution') }),

        // 38 · figure: convolve
        page(html`
          <${H2}>${t('Slide g across f and watch the overlap', 'زُق الـ g على الـ f وشوف التداخل')}</${H2}>
          <${Fig} name="mm-convolve" />
        `),

        // 39 · convolution theorem, deconvolution
        page(html`
          <${H2}>${t('The convolution theorem', 'الـ Convolution theorem')}</${H2}>
          <${Def}>${X('The FT of f(x) * g(x) is simply the <b>product F(u)·G(u)</b>. Convolution in frequency space is easy (multiply), which is why <code>G = H.*F</code> works.',
            'الـ FT بتاع ' + B('f(x) * g(x)') + ' هو ببساطة <b>حاصل الضرب ' + B('F(u)·G(u)') + '</b>. الـ convolution في الـ frequency space سهل (مجرد ضرب)، وعشان كده <code>G = H.*F</code> بتشتغل.')}</${Def}>
          <${P} small=${true}>${X('Fast convolution and <b>deconvolution</b>: FT the audio/image, FT the system\'s effect, <b>multiply</b> to apply an effect (e.g. reverb) or <b>divide</b> to remove/compensate for it, then inverse FT.',
            'الـ fast convolution والـ <b>deconvolution</b>: اعمل FT للصوت أو الصورة، وFT لتأثير الـ system، و<b>اضرب</b> عشان تطبّق effect (زي الـ reverb) أو <b>اقسم</b> عشان تشيله أو تعوّضه، وبعدين inverse FT.')}</${P}>
          <${P} small=${true}>${X('Dividing a Butterworth-blurred image by H (<code>Ghigh = G./H</code>) acts like a <b>high-pass filter</b> and recovers F in the ideal case.', 'لما تقسم صورة اتعملها blur بـ Butterworth على H (<code>Ghigh = G./H</code>)، ده بيشتغل زي <b>high-pass filter</b> وبيرجّع F في الحالة المثالية.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('In the real world the exact blurring function H is <b>unknown</b>, and <b>noise</b> makes deconvolution fail (the noise gets amplified). Deconvolution is <b>not always that simple</b>.',
            'في الواقع الـ blurring function H بالظبط بتبقى <b>مش معروفة</b>، والـ <b>noise</b> بيبوّظ الـ deconvolution (بيتضخّم). الـ deconvolution <b>مش دايمًا بالبساطة دي</b>.')}</p></${Box}>
        `),

        // 40 · figure: deconvolution
        page(html`
          <${H2}>${t('Divide by H, then add a little noise', 'اقسم على H، وبعدين ضيف noise صغير')}</${H2}>
          <${Fig} name="mm-deconv" />
        `),

        // 41 · exam corner 1: dB reference and SNR
        page(html`
          <${H2}>${t('Exam corner: decibels', 'ركن الامتحان: الـ decibels')}</${H2}>
          ${mq('m-db1', /some -+ dB reference/)}
          ${mq('m-db2', /some 10 dB reference/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),

        // 42 · exam corner 2: FIR / IIR
        page(html`
          <${H2}>${t('Exam corner: IIR and FIR', 'ركن الامتحان: الـ IIR والـ FIR')}</${H2}>
          ${mq('m-f1', /In FIR systems/)}
          ${mq('m-f2', /In IIR systems/)}
          <${Grow} />
          <${Hand} red=${true}>${t('Same sentence, one word swapped: FIR → True, IIR → False.', 'نفس الجملة وكلمة واحدة اتغيرت: الـ FIR صح، والـ IIR غلط.')}</${Hand}>
        `),

        // 43 · exam corner 3: SNR
        page(html`
          <${H2}>${t('Exam corner: FIR delays and SNR', 'ركن الامتحان: الـ FIR delays والـ SNR')}</${H2}>
          ${mq('m-f3', /more complete FIR/)}
          ${mq('m-snr', /Signal-to-noise ratio is a term/)}
        `),

        // 44 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ sine ليها <b>amplitude</b> و<b>frequency</b> و<b>phase</b>، والـ ' + B('T = 1/f') + '.',
            'الـ dB هو ' + B('10·log') + ' للـ power و' + B('20·log') + ' للـ amplitude، والـ reference هو <b>0 dB</b>، والـ <b>120 dB</b> هو الـ threshold of pain.',
            'قاعدة <b>6 dB لكل bit</b>: الـ 16-bit بـ 90 والـ 8-bit بـ 42.',
            'الـ signal flow graphs فيها delay (T) وmultiply وadd.',
            'الـ <b>IIR</b> فيه feedback والـ impulse response بتاعه مبيخلصش. والـ <b>FIR</b> مفيهوش feedback.',
            'الـ <b>FT</b> بيودّي للـ frequency domain، والـ top hat بيبقى <b>sinc</b>. والـ DFT فيه ' + B('1/N') + ' قدام الـ forward بس، والـ ' + B('f<sub>k</sub> = k·f<sub>s</sub>/N') + '.',
            'الـ ' + B('G = H·F') + ': الـ ideal low-pass بيعمل blur، والـ <b>Butterworth</b> ناعم (1/2 عند الـ cut-off)، والـ high-pass هو ' + B('1 − H') + '.',
            'الـ FT بتاع الـ convolution هو <b>' + B('F·G') + '</b>، والقسمة بتعمل deconvolution لو مفيش noise.'
          ] : [
            'A sine has <b>amplitude</b>, <b>frequency</b> and <b>phase</b>; T = 1/f; a cosine is a sine 90° out of phase. Sampled: y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>).',
            'X<sub>dB</sub> = 10·log<sub>10</sub>(X/X<sub>0</sub>) for power, 20·log for amplitude; the reference is <b>0 dB</b>; <b>120 dB</b> = threshold of pain.',
            '<b>6 dB per bit</b>: 16-bit 90 dB, 8-bit 42 dB. SNR = P<sub>s</sub>/P<sub>n</sub> = (A<sub>s</sub>/A<sub>n</sub>)<sup>2</sup>.',
            'Signal flow graphs: delay (T), multiply, add. ½, ⅓, ¼ on 2, 4, 6 → 1, 2.667, 4.833, 3, 1.5.',
            '<b>IIR</b>: feedback (recursive), impulse response never ends. <b>FIR</b>: no feedback, N − 1 feed-forward delays.',
            '<b>FT</b> → frequency domain; the inverse has +. Top hat → <b>sinc</b>. DFT: 1/N in front of the forward only; f<sub>k</sub> = k·f<sub>s</sub>/N.',
            'G = H·F: the ideal low-pass (a circle) blurs; <b>Butterworth</b> is a smoothed top hat (1/2 at the cut-off). High-pass = 1 − H.',
            'FT of a convolution = <b>F·G</b>: multiply to apply, divide to deconvolve; noise breaks it.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 45 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="mic">${t('Next time: what multimedia data looks like underneath, the basics.', 'المرة الجاية: الـ multimedia data شكلها إيه من جوه، الأساسيات.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [2], t: Date.now() } }}>${t('Quiz me on Lecture 2', 'امتحنّي في محاضرة 2')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 2, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 2, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

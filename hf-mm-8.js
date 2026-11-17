// Head First chapter for Multimedia Lecture 8 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Images and their sizes, the colour LUT, dithering, file formats, light and the eye, RGB / CIE / Lab, YIQ / YUV / YCrCb,
// CMY / CMYK, the course summary's worked conversions, size, compression ratio, MSE and MAE, video signals, NTSC and PAL,
// chroma subsampling and aliasing. Every fact comes from the lecture's notes; analogies are marked as ours. Every number below
// was worked by hand and checked with a script against the notes' own answers (Y(110,110,255) = 126.53, CMYK of the 2×2 image,
// CR 40.96 %, MSE 8.667 / 14521, MAE 2 / 65.5, 921.6 KB, 1318.36 MB). ‡ marks a slide error the notes also flag.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T8 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mm8')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm8';
    s.textContent = `
.hfb .hf-mm8-tab{ width:100%; border-collapse:collapse; font:500 13.5px/1.25 var(--body); color:var(--ink); }
.hfb .hf-mm8-tab th, .hfb .hf-mm8-tab td{ border:1px solid var(--hf-line); padding:3px 5px; text-align:left; vertical-align:top; }
.hfb .hf-mm8-tab th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-mm8-tab td.n{ font-family:var(--mono); font-size:13px; white-space:nowrap; }
.hfb .hf-mm8-tab td.hi{ color:var(--hf-k); font-weight:700; }
.hfb .hf-mm8-box{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-mm8-chips{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-mm8-chips button{ flex:1 1 0; font:800 13.5px/1 var(--mono); min-height:32px; padding:0 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; white-space:nowrap; }
.hfb .hf-mm8-chips button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm8-calc{ font:600 13.5px/1.45 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; margin:0; }
.hfb .hf-mm8-calc b{ color:var(--hf-k); }
.hfb .hf-mm8-msg{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); }
.hfb .hf-mm8-msg.bad{ color:var(--hf-red); }
.hfb .hf-mm8-msg.good{ padding:4px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
/* be the ditherer */
.hfb .hf-mm8-dg{ display:grid; grid-template-columns:repeat(4, 50px); gap:4px; justify-content:center; }
.hfb .hf-mm8-dg button{ position:relative; height:40px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; font:800 20px/1 var(--mono); padding:0; }
.hfb .hf-mm8-dg button i{ position:absolute; left:4px; top:3px; font:600 13px/1 var(--mono); font-style:normal; color:var(--graphite); }
.hfb .hf-mm8-dg button.on{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-mm8-dg button.on i{ color:var(--paper); opacity:.75; }
.hfb .hf-mm8-dg button.ok{ box-shadow:0 0 0 2px var(--ok); } .hfb .hf-mm8-dg button.no{ box-shadow:0 0 0 2.5px var(--hf-red); }
/* be the printer */
.hfb .hf-mm8-ins{ display:grid; grid-template-columns:repeat(4, 1fr); gap:5px; }
.hfb .hf-mm8-ins label{ display:grid; gap:2px; font:800 13.5px/1 var(--mono); color:var(--ink); text-align:center; }
.hfb .hf-mm8-ins input{ width:100%; box-sizing:border-box; min-width:0; font:600 14px/1 var(--mono); padding:6px 3px; text-align:center; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-mm8-ins input.ok{ border-color:var(--ok); } .hfb .hf-mm8-ins input.no{ border-color:var(--hf-red); }
.hfb .hf-mm8-sw{ display:inline-block; width:15px; height:15px; border-radius:3px; border:1px solid var(--hf-line); vertical-align:-2px; margin-right:5px; }
/* the error meter */
.hfb .hf-mm8-mxs{ display:flex; gap:10px; justify-content:center; align-items:flex-start; flex-wrap:wrap; }
.hfb .hf-mm8-mx{ display:grid; gap:2px; justify-items:center; }
.hfb .hf-mm8-mx > span{ font:800 13.5px/1 var(--mono); color:var(--graphite); }
.hfb .hf-mm8-mx table{ border-collapse:collapse; font:700 14px/1 var(--mono); color:var(--ink); }
.hfb .hf-mm8-mx td{ border:1px solid var(--hf-line); min-width:36px; height:24px; text-align:center; padding:0 3px; }
.hfb .hf-mm8-mx.d td{ color:var(--hf-k); }
.hfb .hf-mm8-lines{ font:600 13.5px/1.5 var(--mono); color:var(--ink); margin:0; }
.hfb .hf-mm8-lines div{ animation:hf-up .4s both; }
.hfb .hf-mm8-lines b{ color:var(--hf-k); }
.hfb .hf-mm8-bar{ display:flex; gap:6px; align-items:center; }
.hfb .hf-mm8-bar .grow{ flex:1; }
.hf-ar .hf-mm8-tab{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm8-tab th, .hf-ar .hf-mm8-tab td{ text-align:right; }
.hf-ar .hf-mm8-tab td.n{ text-align:left; direction:ltr; }
.hf-ar .hf-mm8-msg{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-mm8-msg.good{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-mm8-calc{ direction:ltr; text-align:left; }
.hf-ar .hf-mm8-sw{ margin-right:0; margin-left:5px; }
.hfb .hf-mm8-std{ table-layout:fixed; }
.hfb .hf-mm8-std td.n{ white-space:normal; }
.hfb .hf-mm8-std th:first-child, .hfb .hf-mm8-std td:first-child{ width:31%; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-mm8-lines div{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  const neg = s => String(s).replace(/-/g, '−');
  const n3 = x => neg(String(+(+x).toFixed(3)));   // 8.667, 7.25, 14521
  const n4 = x => neg((+x).toFixed(4));

  // the image types and their 640 × 480 sizes, from the notes' table
  function SizeTable() {
    const ar = useAr();
    const rows = ar ? [
      ['الـ Bit-map (أبيض وأسود)', '1', '37.5 KB'], ['الـ Grey-scale', '8', '307.2 KB'], ['الـ 8-bit colour (LUT)', '8', '307.2 KB'],
      ['الـ 24-bit colour', '24', '921.6 KB'], ['الـ 32-bit colour', '32', '1,228,800 B']
    ] : [
      ['Bit-map (B/W)', '1', '37.5 KB'], ['Grey-scale', '8', '307.2 KB'], ['8-bit colour (LUT)', '8', '307.2 KB'],
      ['24-bit colour', '24', '921.6 KB'], ['32-bit (RGB + alpha)', '32', '1,228,800 B']
    ];
    return html`<table className="hf-mm8-tab hf-in"><thead><tr><th>${ar ? 'نوع الصورة' : 'Image type'}</th><th>${ar ? 'عدد الـ bits' : 'Bits / pixel'}</th><th>${ar ? 'حجم 640×480' : '640 × 480 size'}</th></tr></thead>
      <tbody>${rows.map((r, i) => html`<tr key=${i}><td><bdi>${r[0]}</bdi></td><td className="n">${r[1]}</td><td className="n hi">${r[2]}</td></tr>`)}</tbody></table>`;
  }

  // Be the ditherer: remap a grey value to 0–16 and set the 4 × 4 dots where the remapped value > the matrix entry
  const DM = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const DV = [200, 100, 50];
  function Ditherer({ id }) {
    const ar = useAr();
    const [vi, setVi] = H.K.useSlot(id + ':v', 0);
    const [cells, setCells] = H.K.useSlot(id + ':' + vi, {});
    const [chk, setChk] = H.K.useSlot(id + ':c' + vi, false);
    const v = DV[vi], r = Math.floor(v * 17 / 256);
    const want = DM.map(d => (r > d ? 1 : 0));
    const mine = DM.map((_, k) => (cells[k] ? 1 : 0));
    const wrong = mine.filter((m, k) => m !== want[k]).length, dots = mine.filter(Boolean).length;
    return html`<div className="hf-mm8-box hf-in">
      <div className="hf-mm8-chips" dir="ltr">${DV.map((x, j) => html`<button key=${x} aria-pressed=${String(j === vi)} onClick=${() => setVi(j)}>${ar ? '' : 'pixel '}${x}</button>`)}</div>
      <p className="hf-mm8-calc" dir="ltr">${v} × 17 / 256 = ${(v * 17 / 256).toFixed(2)} → <b>${r}</b></p>
      <div className="hf-mm8-dg" dir="ltr" role="group" aria-label="The 4 by 4 dither matrix: tap a cell to put a dot">
        ${DM.map((d, k) => html`<button key=${k} className=${(mine[k] ? 'on' : '') + (chk ? (mine[k] === want[k] ? ' ok' : ' no') : '')} aria-pressed=${String(!!mine[k])} aria-label=${'entry ' + d}
          onClick=${() => { setChk(false); setCells(Object.assign({}, cells, { [k]: !cells[k] })); }}><i>${d}</i>${mine[k] ? '1' : '0'}</button>`)}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setChk(true)}>${ar ? 'صحّح النقط' : 'Check my dots'}</button>
        <button className="hf-btn" onClick=${() => { const c = {}; want.forEach((w, k) => { if (w) c[k] = true; }); setCells(c); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        <span className="hf-score">${ar ? html`<bdi>${dots} / 16</bdi> نقطة` : dots + ' / 16 dots'}</span>
      </div>
      ${chk && (wrong ? html`<p className="hf-mm8-msg bad">${ar ? T8(`فيه <bdi>${wrong}</bdi> خانة غلط. النقطة (1) بتتحط بس لو <bdi dir="ltr">${r} &gt;</bdi> الرقم الصغير اللي في الخانة.`) : T8(`${wrong} cell${wrong > 1 ? 's are' : ' is'} wrong. A dot (1) goes only where ${r} &gt; the small entry.`)}</p>`
        : html`<p className="hf-mm8-msg good">${ar ? T8(`صح! الخانات الأصغر من ${r} هي <bdi dir="ltr">0…${r - 1}</bdi>، يعني <b>${r} من 16</b> نقطة.`) : T8(`Right! The entries below ${r} are 0…${r - 1}: <b>${r} of the 16</b> dots.`)}</p>`)}
    </div>`;
  }

  // Be the printer: RGB (0–255) → normalise → CMY → K = min → subtract K
  const PX = [[20, 120, 90], [70, 220, 140], [200, 100, 50]];
  const cmykOf = p => { const n = p.map(x => x / 255), c = n.map(x => 1 - x), K = Math.min(...c); return { n, c, K, out: c.map(x => x - K).concat(K) }; };
  function Printer({ id }) {
    const ar = useAr();
    const [pi, setPi] = H.K.useSlot(id + ':p', 0);
    const [vals, setVals] = H.K.useSlot(id + ':' + pi, ['', '', '', '']);
    const [chk, setChk] = H.K.useSlot(id + ':c' + pi, false);
    const [shown, setShown] = H.K.useSlot(id + ':s' + pi, false);
    const p = PX[pi], R = cmykOf(p);
    const okAt = k => { const x = parseFloat(String(vals[k]).replace('−', '-').replace(',', '.')); return isFinite(x) && Math.abs(x - R.out[k]) < 0.0006; };
    const allOk = [0, 1, 2, 3].every(okAt);
    const sw = 'rgb(' + p.join(',') + ')';
    return html`<div className="hf-mm8-box hf-in">
      <div className="hf-mm8-chips" dir="ltr">${PX.map((x, j) => html`<button key=${j} aria-pressed=${String(j === pi)} onClick=${() => setPi(j)}>${x.join(',')}</button>`)}</div>
      <p className="hf-mm8-msg"><span className="hf-mm8-sw" style=${{ background: sw }}></span>${ar ? T8('حوّل الـ pixel المختار لـ CMYK، وخلّي 4 أرقام عشرية على الأقل:') : T8(`Convert RGB = (${p.join(', ')}) to CMYK, keeping at least 4 decimals:`)}</p>
      <div className="hf-mm8-ins" dir="ltr">${['C', 'M', 'Y', 'K'].map((l, k) => html`<label key=${l}>${l}<input type="text" inputMode="decimal" value=${vals[k]} className=${chk ? (okAt(k) ? 'ok' : 'no') : ''} aria-label=${l}
        onChange=${e => { const nv = vals.slice(); nv[k] = e.target.value; setVals(nv); setChk(false); }} /></label>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setVals(R.out.map(x => x.toFixed(4))); setChk(true); setShown(true); }}>${ar ? 'ورّيني الخطوات' : 'Show the steps'}</button>
        ${chk && html`<span className="hf-score">${allOk ? (ar ? 'تمام!' : 'All right!') : (ar ? 'لسه' : 'Not yet')}</span>`}
      </div>
      ${(shown || (chk && allOk)) ? html`<table className="hf-mm8-tab" dir="ltr"><tbody>
        <tr><th>÷ 255</th>${R.n.map((x, k) => html`<td key=${k} className="n">${n4(x)}</td>`)}<td></td></tr>
        <tr><th>1 − x</th>${R.c.map((x, k) => html`<td key=${k} className="n">${n4(x)}</td>`)}<td className="n">K=min</td></tr>
        <tr><th>CMYK</th>${R.out.map((x, k) => html`<td key=${k} className="n hi">${n4(x)}</td>`)}</tr></tbody></table>`
        : chk && !allOk ? html`<p className="hf-mm8-msg bad">${ar ? T8('الترتيب: اقسم على 255، وبعدين <bdi dir="ltr">1 − x</bdi>، وبعدين الـ K هو أصغر واحد فيهم، واطرحه من التلاتة.') : T8('The order: divide by 255, then 1 − x, then K is the smallest of the three, and subtract it from all three.')}</p>` : null}
    </div>`;
  }

  // the error meter: MSE and MAE step by step on the notes' examples
  const EX = [
    { n: '1×3', I: [[10, 15, 23]], R: [[11, 15, 18]] },
    { n: '2×2 a', I: [[255, 78], [255, 15]], R: [[15, 100], [255, 15]] },
    { n: '2×2 b', I: [[20, 40], [60, 80]], R: [[22, 37], [60, 84]] }
  ];
  const Mx = ({ name, m, d }) => html`<div className=${'hf-mm8-mx' + (d ? ' d' : '')}><span>${name}</span><table><tbody>${m.map((r, i) => html`<tr key=${i}>${r.map((x, j) => html`<td key=${j}>${neg(x)}</td>`)}</tr>`)}</tbody></table></div>`;
  function Meter({ id }) {
    const ar = useAr();
    const [ei, setEi] = H.K.useSlot(id + ':e', 0);
    const [st, setSt] = H.K.useSlot(id + ':' + ei, 0);
    const e = EX[ei], d = e.I.map((r, i) => r.map((x, j) => x - e.R[i][j])), f = d.flat(), N = f.length;
    const sq = f.map(x => x * x), ab = f.map(x => Math.abs(x)), S2 = sq.reduce((a, b) => a + b, 0), S1 = ab.reduce((a, b) => a + b, 0);
    const lines = [
      'd = I − I\'\'\'',
      'd² : ' + sq.join(' + ') + ' = ' + S2,
      '|d|: ' + ab.join(' + ') + ' = ' + S1,
      html`MSE = ${S2} / ${N} = <b>${n3(S2 / N)}</b>`,
      html`MAE = ${S1} / ${N} = <b>${n3(S1 / N)}</b>`
    ];
    const upto = [0, 1, 3, 5][st];
    return html`<div className="hf-mm8-box hf-in">
      <div className="hf-mm8-chips" dir="ltr">${EX.map((x, j) => html`<button key=${j} aria-pressed=${String(j === ei)} onClick=${() => setEi(j)}>${x.n}</button>`)}</div>
      <div className="hf-mm8-mxs" dir="ltr"><${Mx} name="I" m=${e.I} /><${Mx} name="I'''" m=${e.R} />${st >= 1 && html`<${Mx} name="d" m=${d} d=${true} />`}</div>
      <div className="hf-mm8-lines" dir="ltr">${lines.slice(0, upto).map((l, k) => html`<div key=${ei + ':' + k}>${l}</div>`)}</div>
      ${st === 3 && html`<p className="hf-mm8-msg good">${ar ? T8(`القسمة على عدد الـ pixels، <bdi dir="ltr">MN = ${N}</bdi>. ولو الاتنين متساويين بالظبط (lossless) كان الاتنين بقوا 0.`) : T8(`Divide by the number of pixels, MN = ${N}. Had the images been identical (lossless), both would be 0.`)}</p>`}
      <div className="hf-mm8-bar">
        <button className="hf-btn" onClick=${() => setSt(Math.max(0, st - 1))} disabled=${st === 0} aria-label=${ar ? 'الخطوة اللي فاتت' : 'Back one step'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" onClick=${() => setSt(Math.min(3, st + 1))} disabled=${st === 3}>${ar ? 'الخطوة الجاية' : 'Next step'}</button>
        <span className="grow"></span>
        <button className="hf-btn" onClick=${() => setSt(3)}>${ar ? 'ورّيني الكل' : 'Show all'}</button>
      </div>
    </div>`;
  }

  // NTSC and PAL side by side, from the notes
  function StdTable() {
    const ar = useAr();
    const rows = [
      [ar ? 'سطور كل frame' : 'Lines / frame', '525', '625'],
      [ar ? 'كام frame في الثانية' : 'Frames / s', '29.97 (30)', '25'],
      [ar ? 'وقت الـ frame' : 'Per frame', '33.37 ms', '40 ms'],
      [ar ? 'سطور كل field' : 'Lines / field', '262.5', '312.5'],
      [ar ? 'الـ Aspect ratio' : 'Aspect ratio', '4:3', '4:3'],
      [ar ? 'الـ colour model' : 'Colour model', 'YIQ', 'YUV (YCrCb)'],
      [ar ? 'الـ Bandwidth (MHz)' : 'Bandwidth (MHz)', 'Y 4, I 1.5, Q 0.6', 'Y 5.5, U 1.8, V 1.8']
    ];
    return html`<table className="hf-mm8-tab hf-mm8-std hf-in"><thead><tr><th></th><th>NTSC</th><th>PAL</th></tr></thead>
      <tbody>${rows.map((r, i) => html`<tr key=${i}><td><bdi>${r[0]}</bdi></td><td className="n">${r[1]}</td><td className="n">${r[2]}</td></tr>`)}</tbody></table>`;
  }

  H.chapters.mm[8] = {
    title: 'Graphics, Images and Video', kicker: 'Chapter 8', run: 'images, colour and video',
    ar: { title: 'الـ Graphics والصور والـ Video', kicker: 'الفصل 8', run: 'الصور والألوان والـ video' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => (A ? ar : en);
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 8);
      const arQuiz = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[8] && window.AR.mm.lectures[8].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(String(x.q).replace(/<[^>]+>/g, ''))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const small = (en, ar) => html`<p className="hf-p small">${X(en, ar)}</p>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("This is the course's biggest chapter: image sizes, dithering, file formats, colour models and their conversions, size and error sums, video and chroma subsampling. Every fact is from the lecture's slides as the site's notes give them. The sums that come from the <b>course summary</b> say so.",
            'ده أكبر فصل في الكورس: أحجام الصور، والـ dithering، والـ file formats، والـ colour models والتحويل بينهم، وحسابات الحجم والـ error، والـ video والـ chroma subsampling. كل معلومة من سلايدز المحاضرة زي ما النوتس بتاعة الموقع كاتباها. والحسابات اللي جاية من <b>ملخص الكورس</b> مكتوب عليها كده.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You dither, convert and measure errors right on the page.', '<b>حل التمارين.</b> هتعمل dithering وتحوّل ألوان وتحسب errors على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر شوية قبل ما تقلب.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسهم.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake on the slides, and what was meant.', 'معناها فيه غلطة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">8</span><span className="t">${A ? html`الفصل التامن<br/>Multimedia` : html`Chapter eight<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Three Thousand Times the Memory', 'تلات آلاف مرة قد الـ memory')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('graphics, images and video', 'الـ graphics والصور والـ video')}</p></div>
          <${P}>${X('The slides open with a joke that is also the whole chapter: <i>"A picture is worth a thousand words, but it uses up three thousand times the memory."</i>',
            'السلايدز بتبدأ بنكتة هي نفسها الفصل كله:<span class="ltr"><i>"A picture is worth a thousand words, but it uses up three thousand times the memory."</i></span>')}</${P}>
          <${Talk} who="cam">${t('Chapters 4 to 7 were all sound. Now it is my turn: pictures, colour and video.', 'الفصول من 4 لـ 7 كانت كلها صوت. دلوقتي دوري أنا: الصور والألوان والـ video.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('A 640 × 480 photo with 3 bytes per pixel. Guess its size in KB before you turn the page.', 'صورة <bdi dir="ltr">640 × 480</bdi> وكل pixel فيها 3 bytes. خمّن حجمها بالـ KB قبل ما تقلب.')}</p></${Box}>
        `, { sec: t('Meet the chapter', 'اتعرّف على الفصل') }),

        // 2 · pixels and the bit-map
        page(html`
          <${H1}>${t('Pixels, bit by bit', 'الـ pixels، bit ورا bit')}</${H1}>
          <${P}>${X('A digital image is made of <b>pixels</b> (picture elements). The number of pixels is the <b>resolution</b>: higher resolution, better quality. A <b>bit-map</b> stores the image the same way the monitor contents are stored in video memory.',
            'الـ digital image متكوّنة من <b>pixels</b> (picture elements). عدد الـ pixels هو الـ <b>resolution</b>: كل ما يعلى، الجودة تبقى أحسن. والـ <b>bit-map</b> بيخزن الصورة بنفس الطريقة اللي محتوى الشاشة بيتخزن بيها في الـ video memory.')}</${P}>
          <${Def}>${X('<b>Bit-map (black and white)</b>: 1 bit per pixel, 0 or 1. Dithering is often used to display monochrome images.', 'الـ <b>Bit-map (أبيض وأسود)</b>: فيه 1 bit لكل pixel، يا 0 يا 1. والـ dithering بيُستخدم كتير عشان نعرض الصور الـ monochrome.')}</${Def}>
          <${Code} lines=${['640 × 480 = 307,200 pixels', '× 1 bit  = 307,200 bits', '÷ 8      = 38,400 B', '÷ 1024   = 37.5 KB']} />
          <${P}>${X('<b>Grey-scale</b>: 1 byte per pixel, 0 to 255. A dark pixel may be 10, a bright one 240. At 640 × 480 that is 307,200 B = <b>307.2 KB</b>: "over 300 KB", the same as an 8-bit colour image.',
            'الـ <b>Grey-scale</b>: فيه 1 byte لكل pixel من 0 لـ 255. الـ pixel الغامق ممكن يبقى 10 والفاتح 240. صورة <bdi dir="ltr">640 × 480</bdi> يبقى حجمها <bdi dir="ltr">307,200 B = 307.2 KB</bdi>، يعني "أكتر من 300 KB"، نفس حجم الـ <bdi dir="ltr">8-bit</bdi> colour image.')}</${P}>
        `, { sec: t('Images and their sizes', 'الصور وأحجامها') }),

        // 3 · figure: image sizes
        page(html`
          <${H2}>${t('Try it: every image type, every size', 'جرّب: كل نوع صورة وحجمه')}</${H2}>
          <${Fig} name="mm-8a-sizes" />
        `),

        // 4 · colour depths and the table
        page(html`
          <${H2}>${t('Colour costs more', 'الألوان تكلفتها أعلى')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b><bdi dir="ltr">24-bit</bdi> colour</b>: فيه 3 bytes لكل pixel (R وG وB)، فيه <bdi dir="ltr">16,777,216</bdi> لون، والحجم <bdi dir="ltr">921,600 B</bdi> يعني <b>921.6 KB</b>.',
            'الـ <b><bdi dir="ltr">32-bit</bdi></b> بيزوّد byte لقيمة الـ <b>alpha</b> (special effects زي الـ transparency).',
            'الـ <b><bdi dir="ltr">8-bit</bdi> colour</b>: فيه 1 byte لكل pixel، يعني 256 لون من ملايين، جودة مقبولة، ومحتاج <b>Colour Look-Up Table (LUT)</b>. حجمه 307.2 KB زي الـ greyscale.'
          ] : [
            '<b>24-bit colour</b>: 3 bytes per pixel (R, G, B): 256³ = <b>16,777,216</b> colours; 640 × 480 × 3 = 921,600 B = <b>921.6 KB</b>.',
            '<b>32-bit</b> adds an extra byte for an <b>alpha</b> value (special effects such as transparency).',
            '<b>8-bit colour</b>: 1 byte per pixel, 256 colours out of millions, acceptable quality, and it needs a <b>Colour Look-Up Table (LUT)</b>. 307.2 KB, like greyscale.'
          ]} />
          <${SizeTable} />
          <${Box} kind="watch"><p className="hf-p small">${X("The slide's sizes switch units: <b>37.5 KB</b> is 38,400 ÷ <b>1024</b>, but <b>307.2</b> and <b>921.6 KB</b> divide by <b>1000</b>. The course summary uses KB = 1024 B. Say which one you use.",
            'أحجام السلايد بتغيّر الوحدة: الـ <b>37.5 KB</b> هي <bdi dir="ltr">38,400 ÷ 1024</bdi>، بس الـ <b>307.2</b> والـ <b>921.6 KB</b> متقسومين على <b>1000</b>. وملخص الكورس بيستخدم <bdi dir="ltr">KB = 1024 B</bdi>. قول إنت شغال بأنهي واحدة.')}</p></${Box}>
        `),

        // 5 · the LUT
        page(html`
          <${H2}>${t('The colour look-up table', 'الـ Colour look-up table')}</${H2}>
          <${P}>${X('An 8-bit colour image does not store colours. Each pixel stores only an <b>index</b> into the <b>LUT</b>, and the table gives the RGB colour.',
            'الصورة الـ <bdi dir="ltr">8-bit</bdi> colour مش بتخزن ألوان. كل pixel بيخزن <b>index</b> بس في الـ <b>LUT</b>، والـ table هو اللي بيدي لون الـ RGB.')}</${P}>
          <${Talk} who="mem">${X('I hold <b>25</b> for that pixel. Row 25 of the LUT says R = 30, G = 190, B = 60.', 'أنا شايلة <b>25</b> للـ pixel ده. والـ row رقم 25 في الـ LUT بيقول <bdi dir="ltr">R = 30, G = 190, B = 60</bdi>.')}</${Talk}>
          <${UL} items=${A ? [
            'الـ LUT بيتبني وإحنا بنحوّل من <bdi dir="ltr">24-bit</bdi> لـ <bdi dir="ltr">8-bit</bdi>: بنجمّع الألوان المتشابهة، و<b>entry واحد لكل مجموعة</b>.',
            'لو غيّرت الـ map، كل الـ pixels اللي بتشاور على الـ entry ده بتتغير مرة واحدة: ده الـ <b>palette animation</b>.'
          ] : [
            'The LUT is built when converting 24-bit to 8-bit, by grouping similar colours: <b>one entry per group</b>.',
            'Change the map and every pixel pointing at that entry changes at once: <b>palette animation</b>.'
          ]} />
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['ليه منخزنش اللون نفسه وخلاص؟', 'لأن الـ index بـ byte واحد، واللون بـ 3. الفرق بين <b>307.2 KB</b> و<b>921.6 KB</b>.'],
            ['يعني الـ <bdi dir="ltr">8-bit</bdi> colour قد الـ greyscale؟', 'أيوه، الاتنين 1 byte لكل pixel، يعني <b>307.2 KB</b> لصورة <bdi dir="ltr">640 × 480</bdi>.']
          ] : [
            ['Why not just store the colour?', 'The index is 1 byte, the colour is 3. That is <b>307.2 KB</b> against <b>921.6 KB</b>.'],
            ['So 8-bit colour is the same size as greyscale?', 'Yes: both are 1 byte per pixel, <b>307.2 KB</b> at 640 × 480.']
          ]} />
        `),

        // 6 · figure: the LUT
        page(html`
          <${H2}>${t('From a pixel index to an RGB colour', 'من الـ index بتاع الـ pixel للون الـ RGB')}</${H2}>
          <${Fig} name="mm-8a-lut" />
        `),

        // 7 · dithering
        page(html`
          <${H1}>${t('Dithering: grey out of dots', 'الـ Dithering: رمادي من نقط')}</${H1}>
          <${P} small=${true}>${X('Used to turn a greyscale image into a bit-mapped (black/white) one, e.g. for printing: replace each pixel (0–255) by a pattern of <b>4 × 4</b> dots whose count approximates the grey level. 0 to 16 dots: <b>17 levels</b>.',
            'بيحوّل صورة greyscale لصورة bit-mapped (أبيض/أسود)، زي عشان الطباعة: كل pixel (من 0 لـ 255) بيبقى pattern من <b><bdi dir="ltr">4 × 4</bdi></b> نقط، وعددهم يقرّب درجة الرمادي. من 0 لـ 16 نقطة، يعني <b>17 level</b>.')}</${P}>
          <${Code} lines=${['remap: v ÷ (256/17), round down', 'dither matrix:', '   0   8   2  10', '  12   4  14   6', '   3  11   1   9', '  15   7  13   5']} />
          <${Def}>${X('<b>Simple dithering</b>: put a dot (1) where the remapped intensity is <b>&gt;</b> the matrix entry, else 0. Each pixel becomes 4 × 4 dots, so the image is <b>16 times larger</b>.<br/><b>Ordered dither</b> keeps the size: an output pixel is 1 iff the remapped intensity at that pixel is greater than the matrix entry at the corresponding position.',
            'الـ <b>Simple dithering</b>: بنحط نقطة (1) لو الـ intensity بعد الـ remap <b>أكبر من</b> الـ entry اللي في الـ matrix، غير كده 0. كل pixel بيبقى <bdi dir="ltr">4 × 4</bdi> نقط، فالصورة بتكبر <b>16 مرة</b>.<br/>والـ <b>Ordered dither</b> بيحافظ على الحجم: الـ output pixel بيبقى 1 لو وبس لو الـ intensity بعد الـ remap عند الـ pixel ده أكبر من الـ entry اللي في نفس المكان في الـ matrix.')}</${Def}>
        `, { sec: t('Dithering', 'الـ Dithering') }),

        // 8 · be the ditherer
        page(html`
          <${Box} kind="pencil" title=${t('Be the ditherer', 'خليك إنت الـ ditherer')}><p className="hf-p small">${t('Pick a pixel value (its remapped level is worked out), then tap every cell that gets a dot (1). The small number is the matrix entry.',
            'اختار قيمة pixel (الـ level بعد الـ remap محسوب لك)، ودوس على كل خانة تاخد نقطة (1). الرقم الصغير هو الـ entry.')}</p></${Box}>
          <${Ditherer} id="dith" />
        `),

        // 9 · formats 1
        page(html`
          <${H1}>${t('File formats: GIF and JPEG', 'الـ GIF والـ JPEG')}</${H1}>
          <${Hand}>${t('most formats include compression, lossless or lossy', 'أغلب الـ formats فيها compression، يا lossless يا lossy')}</${Hand}>
          <${Def}>${X('<b>GIF</b> (GIF87a, GIF89a), a system independent format by UNISYS and CompuServe, first for images over phone-line modems. <b>LZW</b> (Lempel-Ziv Welch), modified for scan line packets, so <b>lossless</b>. Only <b>8-bit (256 colours)</b>: suits images with few distinctive colours (drawings). <b>Interlacing</b>; GIF89a adds simple <b>animation</b> and a transparency index.',
            'الـ <b>GIF</b> (الـ GIF87a والـ GIF89a)، system independent format من UNISYS وCompuServe، في الأول للصور على modems التليفون. بيستخدم <b>LZW</b> متعدّل للـ scan line packets، فهو <b>lossless</b>. أقصاه <b><bdi dir="ltr">8-bit</bdi> (256 لون)</b>: للصور اللي ألوانها المميزة قليلة (الرسومات). فيه <b>interlacing</b>، والـ GIF89a زوّد <b>animation</b> بسيطة وtransparency index.')}</${Def}>
          <${P} small=${true}>${X('‡ The slide calls LZW "a form of Huffman Coding". LZW is really a <b>dictionary-based</b> method, not Huffman coding (both are lossless).', '‡ السلايد بتسمّي الـ LZW "<bdi dir="ltr">a form of Huffman Coding</bdi>"، بس هو طريقة <b>dictionary-based</b> (والاتنين lossless).')}</${P}>
          <${Def}>${X('<b>JPEG</b>: by the Joint Photographic Experts Group, for <b>photographs</b>. Exploits the limits of human vision for high compression. <b>Lossy</b> (the exam\'s answer too); the user chooses the quality level.',
            'الـ <b>JPEG</b>: من الـ Joint Photographic Experts Group للصور الـ <b>photographic</b>، وبيستغل حدود الرؤية عشان compression عالي. <b>Lossy</b> (ودي إجابة الامتحان)، والـ user بيختار الـ quality.')}</${Def}>
        `, { sec: t('File formats', 'الـ File formats') }),

        // 10 · formats 2
        page(html`
          <${H2}>${t('TIFF, PNG, PostScript and BMP', 'الـ TIFF والـ PNG والـ PostScript والـ BMP')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>TIFF</b> (Tagged Image File Format): بيخزن أنواع صور كتير (bit-map وgreyscale و<bdi dir="ltr">8-bit</bdi> و<bdi dir="ltr">24-bit</bdi> RGB) ونوعها بيتعرف بالـ <b>tags</b>. من Aldus Corp. في التمانينات، وبعدين Microsoft. غالبًا <b>lossless</b> (وفيه JPEG tag). <b>مش user-controllable زي الـ JPEG</b>، فشعبيته بتقل.',
            'الـ <b>PNG</b> (Portable Network Graphics): معمول عشان <b>يحل محل الـ GIF</b>. لحد <b>48 bits لكل pixel</b> (ألوان أدق)، وفيه gamma-correction و<b>alpha channel</b> (زي الـ transparency)، وprogressive display بـ blocks <bdi dir="ltr">8 × 8</bdi>.',
            'الـ <b>PostScript / EPS</b>: لغة typesetting فيها text وvector graphics وbitmaps (الـ output بتاع Illustrator وFreeHand). <b>مفيهاش compression</b>، فالملفات كبيرة.',
            'الـ <b>BMP</b> (bitmap image file أو <b>device independent bitmap (DIB)</b>)، تحت عنوان "system dependent format": الـ standard بتاع Microsoft Windows، raster، بيُستخدم في برامج PC كتير، cross-platform، وبيخزن صور <bdi dir="ltr">24-bit</bdi>.'
          ] : [
            '<b>TIFF</b> (Tagged Image File Format): stores many image types (bit-map, greyscale, 8-bit, 24-bit RGB) identified by <b>tags</b>. By Aldus Corp. (1980s), later Microsoft. Typically <b>lossless</b> (a JPEG tag allows JPEG). <b>Not as user-controllable</b> as JPEG, so it is declining.',
            '<b>PNG</b> (Portable Network Graphics): meant to <b>replace GIF</b>. Up to <b>48 bits per pixel</b> (more accurate colours), gamma-correction, an <b>alpha channel</b> (e.g. transparency), progressive display through 8 × 8 blocks.',
            '<b>PostScript / EPS</b>: a typesetting language with text, vector graphics and bitmaps (Illustrator, FreeHand). <b>No compression</b>, so files are large.',
            '<b>BMP</b> (bitmap image file, or <b>device independent bitmap, DIB</b>), a "system dependent format": the Microsoft Windows standard; raster; used in many PC programs, cross-platform; stores 24-bit images.'
          ]} />
        `),

        // 11 · match the formats
        page(html`
          <${H2}>${t('Which format is it?', 'ده أنهي format؟')}</${H2}>
          <p className="hf-hand">${t('tap a format, then its description', 'دوس على الـ format، وبعدين على الوصف بتاعه')}</p>
          <${Match} id="fmt" left=${['GIF', 'JPEG', 'TIFF', 'PNG', 'PostScript / EPS', 'BMP']}
            right=${A ? ['لغة typesetting، مفيهاش compression، فالملفات كبيرة', 'بيستخدم LZW، و lossless، وأقصاه 256 لون', 'الـ format بتاع Windows، أو الـ device independent bitmap', 'بيعمل lossy للصور، والـ user بيختار الـ quality', 'معمول عشان يحل محل الـ GIF: لحد 48 bits وalpha', 'أنواع صور كتير بتتعرف بالـ tags (من Aldus)']
              : ['A typesetting language, no compression, so big files', 'LZW, lossless, at most 256 colours, interlacing', 'The Windows system format: device independent bitmap', 'Lossy, for photos, the user picks the quality', 'Meant to replace GIF: up to 48 bits per pixel, alpha', 'Many image types identified by tags (Aldus)']}
            answer=${[1, 3, 5, 4, 0, 2]} />
        `, { sec: t('Exercise: formats', 'تمرين: الـ formats') }),

        // 12 · light and the eye
        page(html`
          <${H1}>${t('Light, the eye and three cones', 'الضوء والعين وتلات cones')}</${H1}>
          <${P}>${X('Visible light is an electromagnetic wave in the <b>400–700 nm</b> range. Most light is not one wavelength but a mix of many (think of a rainbow); that profile is a <b>spectrum</b> (spectra).',
            'الضوء المرئي هو electromagnetic wave في المدى <b><bdi dir="ltr">400–700 nm</bdi></b>. أغلب الضوء مش wavelength واحدة، ده خليط من wavelengths كتير (زي قوس قزح)، والـ profile ده اسمه <b>spectrum</b> (أو spectra).')}</${P}>
          <${P}>${X('The eye is basically like a camera: a <b>lens</b> focuses light onto the <b>retina</b>, which is full of neurons. Each neuron is either a <b>rod</b> (not sensitive to colour: brightness) or a <b>cone</b>, which comes in <b>3 types</b>, red, green and blue (colour).',
            'العين في الأساس شبه الكاميرا: فيه <b>lens</b> بتركّز الضوء على الـ <b>retina</b>، اللي مليانة neurons. كل neuron يا إما <b>rod</b> (مش حساس للون، حساس للإضاءة) يا إما <b>cone</b>، وده ليه <b>3 أنواع</b>: أحمر وأخضر وأزرق (للون).')}</${P}>
          <${Talk} who="cam">${t("Same as me: a lens, and a sensor behind it that turns light into signals.", 'زيي بالظبط: lens، ووراها sensor بيحوّل الضوء لـ signals.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t('Three cone types, three numbers per pixel. Which colour model do you think the hardware uses?', 'تلات أنواع cones، وتلات أرقام لكل pixel. تفتكر الـ hardware بيستخدم أنهي colour model؟')}</p></${Box}>
        `, { sec: t('Light and the eye', 'الضوء والعين') }),

        // 13 · figure: cones
        page(html`
          <${H2}>${t('Each cone answers differently', 'كل cone بيستجيب بشكل مختلف')}</${H2}>
          <${Fig} name="mm-8a-cones" />
        `),

        // 14 · RGB, displays and gamut
        page(html`
          <${H2}>${t('RGB: adding light', 'الـ RGB: بنجمع ضوء')}</${H2}>
          <${P} small=${true}>${X('<b>RGB</b> is a colour space of red, green and blue intensities, and it is <b>additive</b>. Old <b>CRT</b> displays have three phosphors (R, G, B) that produce a mix of colours when excited with electrons; newer <b>TFT LCD</b> panels have a transistor switch for each R, G or B pixel.',
            'الـ <b>RGB</b> هو colour space من intensities الأحمر والأخضر والأزرق، وهو <b>additive</b>. شاشات الـ <b>CRT</b> القديمة فيها تلات phosphors (R وG وB) بيطلّعوا خليط ألوان لما الـ electrons تثيرهم، والـ <b>TFT LCD</b> الأحدث فيها transistor switch لكل pixel من R أو G أو B.')}</${P}>
          <${Def}>${X("<b>Gamut</b>: all the colours reproducible with the three primaries. A monitor's gamut is smaller than models such as CIE Lab.", 'الـ <b>Gamut</b>: كل الألوان اللي ممكن تتعمل بالتلات primaries. والـ gamut بتاع الشاشة أصغر من models زي CIE Lab.')}</${Def}>
          <${P} small=${true}>${X('A grey-scale image is a 2-D array of integers; a <b>true colour image</b> is a 2-D array of (R, G, B) <b>triplets</b>, telling the device how much each colour pixel should be excited.',
            'الصورة الـ grey-scale هي <bdi dir="ltr">2-D</bdi> array من integers، والـ <b>true colour image</b> هي <bdi dir="ltr">2-D</bdi> array من <b>triplets</b> (R، G، B)، بتقول للجهاز كل colour pixel يتثار قد إيه.')}</${P}>
          ${mq('m-mono', /Monochrome images are encoded as a triplet/i)}
        `, { sec: t('Colour models', 'الـ Colour models') }),

        // 15 · figure: channels
        page(html`
          <${H2}>${t('One image, three channels', 'صورة واحدة، تلات channels')}</${H2}>
          <${Fig} name="mm-8a-channels" />
        `),

        // 16 · CIE and Lab
        page(html`
          <${H1}>${t('CIE: colour the way eyes see it', 'الـ CIE: اللون زي ما العين شايفاه')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>CIE (1931)</b> عرّفت تلات primaries standard هما <b>X وY وZ</b>.',
            'الـ <b>Y</b> اختاروه يساوي الـ <b>luminous-efficiency function</b> بتاعة العين (perceptual model).',
            'كل الألوان المرئية في cone شكله زي <b>حدوة الحصان</b>. لو قطعناه بالـ plane <bdi dir="ltr">X+Y+Z=1</bdi> وعملنا projection على الـ X-Y plane يطلع الـ <b>chromaticity diagram</b>.',
            'أطرافه هي الألوان الـ <b>pure</b>، والأبيض (blackbody بيشع عند 6447 K) هو النقطة.',
            'وهو <b>vector-based</b>: لو جمعت لونين (نقطتين) يطلع لون على <b>الخط اللي بينهم</b>.'
          ] : [
            '<b>CIE (1931)</b> defined three standard primaries: <b>X, Y, Z</b>.',
            "<b>Y</b> was chosen to equal the eye's <b>luminous-efficiency function</b> (a perceptual model).",
            'All visible colours sit in a <b>horseshoe-shaped cone</b>. Cut it with the plane X+Y+Z=1, project onto the X-Y plane: the <b>chromaticity diagram</b>.',
            'Its edges are the <b>pure</b> colours; white (a blackbody radiating at 6447 K) is the dot.',
            'It is <b>vector-based</b>: add two colours (points) and you get a point <b>on the line between them</b>.'
          ]} />
          <${Def}>${X('<b>CIE L*a*b* (1976)</b>, a refined CIE model used by <b>Photoshop</b>: <b>L</b> = luminance, from L = 0 (black) to L = 100 (white); <b>a</b> runs from <b>green to red</b>; <b>b</b> runs from <b>blue to yellow</b>.',
            'الـ <b><bdi dir="ltr">CIE L*a*b* (1976)</bdi></b> نسخة متحسنة من الـ CIE، وبيستخدمها <b>Photoshop</b>: الـ <b>L</b> هي الـ luminance من <bdi dir="ltr">L = 0</bdi> (أسود) لـ <bdi dir="ltr">L = 100</bdi> (أبيض)، والـ <b>a</b> من <b>الأخضر للأحمر</b>، والـ <b>b</b> من <b>الأزرق للأصفر</b>.')}</${Def}>
        `),

        // 17 · figure: CIE mix
        page(html`
          <${H2}>${t('Try it: mix two colours on the CIE diagram', 'جرّب: اخلط لونين على الـ CIE diagram')}</${H2}>
          <${Fig} name="mm-8a-cie-mix" />
        `),

        // 18 · luminance vs chrominance
        page(html`
          <${H2}>${t('Brightness or colour?', 'إضاءة ولا لون؟')}</${H2}>
          <${Def}>${X('<b>Luminance</b> = brightness (the grey value, Y). <b>Chrominance</b> = colour information (hue + saturation).', 'الـ <b>Luminance</b> هي الإضاءة (قيمة الرمادي، الـ Y). والـ <b>Chrominance</b> هي معلومات اللون (<bdi dir="ltr">hue + saturation</bdi>).')}</${Def}>
          <${P} small=${true}>${X('Other models: <b>HSB</b> (Hue, Saturation, Brightness, in Photoshop) and <b>HLS</b> (Hue, Lightness, Saturation). The <b>hardware-oriented</b> ones are RGB, CMY, YIQ and YUV.',
            'فيه models تانية: الـ <b>HSB</b> (Hue وSaturation وBrightness، في Photoshop) والـ <b>HLS</b> (Hue وLightness وSaturation). والـ models الـ <b>hardware-oriented</b> هي الـ RGB والـ CMY والـ YIQ والـ YUV.')}</${P}>
          <p className="hf-hand">${t('Sharpen your pencil: luminance (L) or chrominance (C)?', 'امسك القلم: luminance (L) ولا chrominance (C)؟')}</p>
          <${Sort} id="lc" bins=${[['L', 'Luminance'], ['C', 'Chrominance']]} items=${A ? [
            ['الـ Y في الـ YIQ والـ YUV', 0], ['الـ I والـ Q', 1], ['الـ L في الـ Lab', 0], ['الـ a والـ b في الـ Lab', 1], ['الـ Cb والـ Cr', 1]
          ] : [
            ['Y in YIQ and YUV', 0], ['I and Q', 1], ['L in Lab', 0], ['a and b in Lab', 1], ['Cb and Cr', 1]
          ]} />
        `),

        // 19 · YIQ
        page(html`
          <${H1}>${t('YIQ: one Y for everybody', 'الـ YIQ: Y واحد للكل')}</${H1}>
          <${P} small=${true}>${X('Luminance and chrominance encode how humans "see" colour better than RGB. <b>YIQ and YUV</b> are the two commonly used in video, and all three of YIQ, YUV and YCrCb share the same Y (the CIE Y primary):',
            'الـ luminance والـ chrominance بيعبّروا عن طريقة شوفنا للون أحسن من الـ RGB. الـ <b>YIQ والـ YUV</b> هما الاتنين المستخدمين كتير في الـ video، والتلاتة YIQ وYUV وYCrCb بيشتركوا في نفس الـ Y (الـ CIE Y primary):')}</${P}>
          <${Code} lines=${['Y = 0.299R + 0.587G + 0.114B', 'I = 0.596R − 0.275G − 0.321B', 'Q = 0.212R − 0.528G + 0.311B']} />
          <${UL} items=${A ? [
            'بيُستخدم في الـ <b>colour TV broadcasting (NTSC)</b>، و<b>downward compatible</b> مع التلفزيون الأبيض والأسود.',
            'الـ I هو محور الـ red-orange، والـ Q تقريبًا orthogonal عليه.',
            'العين أحسّ حاجة للـ <b>Y</b>، بعده <b>I</b>، بعده <b>Q</b>. ومن هنا الـ <b>NTSC (analog) video compression</b>:<span class="ltr"><b>Y 4 MHz, I 1.5 MHz, Q 0.6 MHz</b></span>'
          ] : [
            'Used in <b>colour TV broadcasting (NTSC)</b>; <b>downward compatible</b> with black-and-white TV.',
            'I is the red-orange axis; Q is roughly orthogonal to it.',
            'The eye is most sensitive to <b>Y</b>, then <b>I</b>, then <b>Q</b>. Hence the <b>NTSC (analog) video compression</b>: <b>Y 4 MHz, I 1.5 MHz, Q 0.6 MHz</b>.'
          ]} />
          <${Hand} tilt=${true}>${t('G gets the biggest weight in Y (0.587), B the smallest (0.114)', 'الـ G ليها أكبر وزن في الـ Y (0.587)، والـ B أصغر وزن (0.114)')}</${Hand}>
        `, { sec: t('YIQ, YUV, YCrCb', 'الـ YIQ والـ YUV والـ YCrCb') }),

        // 20 · figure: YIQ / YUV
        page(html`
          <${H2}>${t('Try it: the YIQ and YUV transforms', 'جرّب: الـ YIQ والـ YUV transforms')}</${H2}>
          <${Fig} name="mm-8a-yiq-yuv" />
        `),

        // 21 · YUV and YCrCb
        page(html`
          <${H2}>${t('YUV and its scaled cousin YCrCb', 'الـ YUV وقريبه الـ YCrCb')}</${H2}>
          <${P} small=${true}>${X('<b>YUV</b> is a digital video standard (1982). Video is a sequence of <b>fields</b> (odd and even lines); <b>two fields make a frame</b>. It works in PAL (50 fields/s) or NTSC (60 fields/s).',
            'الـ <b>YUV</b> هو digital video standard (1982). الـ video سلسلة <b>fields</b> (سطور فردي وزوجي)، و<b>كل fieldين بيعملوا frame</b>. بيشتغل في PAL (<bdi dir="ltr">50 fields/s</bdi>) أو NTSC (<bdi dir="ltr">60 fields/s</bdi>).')}</${P}>
          <${Code} lines=${['U = B − Y        V = R − Y', 'Cb = (B − Y) / 1.772', 'Cr = (R − Y) / 1.402']} />
          <${P} small=${true}>${X('<b>YCrCb</b> (CCIR 601) is YUV <b>scaled</b>. It is the model used in <b>JPEG</b> (and MPEG). YUV/YCrCb is a standard for digital video that specifies image size and decimates the chrominance images (for 4:2:2 video).',
            'الـ <b>YCrCb</b> (CCIR 601) هو الـ YUV بعد الـ <b>scaling</b>، وبيستخدمه <b>JPEG</b> (وMPEG). والـ YUV/YCrCb هو standard للـ digital video بيحدد حجم الصورة وبيعمل decimate لصور الـ chrominance (في الـ <bdi dir="ltr">4:2:2</bdi> video).')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The slide (and the rules sheet) labels the matrix rows the wrong way round. From the formulas:', '‡ السلايد (وكمان الـ rules sheet) كاتبين أسامي صفوف الـ matrix بالعكس. من المعادلات:')}</p>
            <${Code} lines=${['Cb = −0.169R − 0.331G + 0.500B', 'Cr =  0.500R − 0.419G − 0.081B']} />
            <p className="hf-p small">${t('Use the formulas, and label the rows correctly if asked.', 'اعتمد على المعادلات وسمّي الصفوف صح.')}</p></${Box}>
        `),

        // 22 · figure: YCrCb lab
        page(html`
          <${H2}>${t('Try it: a pixel in YCrCb', 'جرّب: pixel في الـ YCrCb')}</${H2}>
          <${Fig} name="mm-ycrcb-lab" />
        `),

        // 23 · CMY
        page(html`
          <${H1}>${t('Printing: taking light away', 'الطباعة: بنشيل ضوء')}</${H1}>
          <${P} small=${true}>${X('<b>CMY</b> (cyan, magenta, yellow) are the complements of RGB: the <b>subtractive primaries</b>. Printing uses them because pigments on paper <b>absorb</b> certain colours.',
            'الـ <b>CMY</b> (cyan وmagenta وyellow) هما الـ complements بتوع الـ RGB، يعني الـ <b>subtractive primaries</b>. الطباعة بتستخدمهم لأن الأحبار على الورق <b>بتمتص</b> ألوان معينة.')}</${P}>
          <table className="hf-mm8-tab hf-in"><thead><tr><th>${t('Additive (RGB, light)', 'الـ Additive (RGB، ضوء)')}</th><th>${t('Subtractive (CMY, ink)', 'الـ Subtractive (CMY، حبر)')}</th></tr></thead><tbody>
            <tr><td className="n">R + G = Yellow</td><td className="n">C + M = Blue</td></tr>
            <tr><td className="n">G + B = Cyan</td><td className="n">C + Y = Green</td></tr>
            <tr><td className="n">B + R = Magenta</td><td className="n">M + Y = Red</td></tr>
            <tr><td className="n hi">R + G + B = White</td><td className="n hi">C + M + Y = Black*</td></tr></tbody></table>
          <${P} small=${true}>${X('* in theory. The RGB cube has black (0,0,0) and white (1,1,1) at opposite corners; the CMY cube is the other way: white (0,0,0), black (1,1,1). With values in 0…1:',
            '* نظريًا. الـ RGB cube فيه الأسود <bdi dir="ltr">(0,0,0)</bdi> والأبيض <bdi dir="ltr">(1,1,1)</bdi> في ركنين قصاد بعض، والـ CMY cube بالعكس: الأبيض <bdi dir="ltr">(0,0,0)</bdi> والأسود <bdi dir="ltr">(1,1,1)</bdi>. والقيم من <bdi dir="ltr">0…1</bdi>:')}</${P}>
          <${Code} lines=${['C = 1 − R   M = 1 − G   Y = 1 − B', 'R = 1 − C   (and so on)', 'white (1,1,1) RGB → (0,0,0) CMY']} />
        `, { sec: t('CMY and CMYK', 'الـ CMY والـ CMYK') }),

        // 24 · figure: add / sub
        page(html`
          <${H2}>${t('Try it: additive and subtractive mixing', 'جرّب: الخلط الـ additive والـ subtractive')}</${H2}>
          <${Fig} name="mm-add-sub" />
        `),

        // 25 · CMYK
        page(html`
          <${H2}>${t('CMYK: a real black', 'الـ CMYK: أسود بجد')}</${H2}>
          <${P} small=${true}>${X('Mixing C, M and Y is <b>never really black</b>. So the improved printing model adds a separate black ink, <b>K</b>: a darker, true black, better dark colours, and it saves coloured ink.',
            'خلط الـ C والـ M والـ Y <b>عمره ما بيدي أسود بجد</b>. فموديل الطباعة المتحسن بيزوّد حبر أسود لوحده، الـ <b>K</b>: أسود أغمق وحقيقي، وألوان غامقة أحسن، وبيوفّر الحبر الملون.')}</${P}>
          <div className="hf-in" style=${{ display: 'grid', gap: '2px' }}>${(A ? [
            '<b>أولًا:</b> لو القيم من 0 لـ 255، اعمل <b>normalize</b> (اقسم على 255).',
            '<b>تانيًا:</b> احسب <bdi dir="ltr">CMY = 1 − RGB</bdi>.',
            '<b>تالتًا:</b> الـ <bdi dir="ltr">K = min(C, M, Y)</bdi>.',
            '<b>رابعًا:</b> اطرح الـ K: <bdi dir="ltr">C − K, M − K, Y − K</bdi>.'
          ] : [
            '<b>1.</b> If values are 0–255, <b>normalize</b> (÷ 255).',
            '<b>2.</b> CMY = 1 − RGB.',
            '<b>3.</b> K = min(C, M, Y).',
            '<b>4.</b> Subtract K: C − K, M − K, Y − K.'
          ]).map((x, i) => html`<p key=${i} className="hf-p small">${T(x)}</p>`)}</div>
          <${Hand}>${t('the Final Rules sheet: keep about 4–6 decimals', 'الـ Final Rules sheet: خلّي حوالي 4 لـ 6 أرقام عشرية')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X('K is the min of <b>CMY</b>, not of RGB. The 2020/21 exam: RGB (0.25, 0.25, 0.5) → CMY (0.75, 0.75, 0.5), so C = 0.75, M = 0.75, Y = 0.5 and <b>K = 0.5</b>. And RGB (0.5, 0.25, 0.25) → CMY (0.5, 0.75, 0.75), <b>K = 0.5</b> again.',
            'الـ K هو أصغر قيمة في الـ <b>CMY</b>، مش في الـ RGB. امتحان 2020/21:<span class="ltr">RGB (0.25, 0.25, 0.5) → CMY (0.75, 0.75, 0.5)</span>يعني الـ C والـ M بـ 0.75 والـ Y بـ 0.5، والـ <b><bdi dir="ltr">K = 0.5</bdi></b>. وكمان:<span class="ltr">RGB (0.5, 0.25, 0.25) → CMY (0.5, 0.75, 0.75)</span>والـ <b><bdi dir="ltr">K = 0.5</bdi></b> برضه.')}</p></${Box}>
        `),

        // 26 · be the printer
        page(html`
          <${Box} kind="pencil" title=${t('Be the printer', 'خليك إنت الـ printer')}><p className="hf-p small">${t('Pick a pixel and type its four CMYK values (0 to 1). Two of the pixels are from the course summary\'s 2×2 image.', 'اختار pixel واكتب قيم الـ CMYK الأربعة بتاعته (من 0 لـ 1). اتنين من الـ pixels دول من الصورة الـ 2×2 اللي في ملخص الكورس.')}</p></${Box}>
          <${Printer} id="cmyk" />
          <${Grow} />
          <${Hand}>${t('after subtracting K, the smallest of C, M, Y is always 0', 'بعد ما تطرح الـ K، أصغر واحد في الـ C والـ M والـ Y بيبقى 0 دايمًا')}</${Hand}>
        `, { sec: t('Exercise: CMYK', 'تمرين: الـ CMYK') }),

        // 27 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: RGB and CMYK argue about who should colour the world.", 'قعدة الليلة: الـ RGB والـ CMYK بيتخانقوا مين فيهم يلوّن الدنيا.')} />
          <${Chat} names=${['RGB', 'CMYK']} lines=${A ? [
            [0, 'أنا <b>additive</b>. بشتغل بالضوء: اجمع أحمر وأخضر وأزرق يطلع <b>أبيض</b>.'],
            [1, 'وأنا <b>subtractive</b>. أحباري على الورق <b>بتمتص</b> wavelengths من الضوء المنعكس.'],
            [0, 'كل شاشة بتستخدمني: الـ CRT والـ TFT LCD.'],
            [1, 'وكل طابعة بتستخدمني. الطباعة طرح، وده الـ CMY.'],
            [0, 'اخلط الـ C والـ M والـ Y يطلع أسود، صح؟'],
            [1, 'نظريًا بس. عمره ما بيبقى <b>أسود بجد</b>، فبشيل حبر <b>K</b>.']
          ] : [
            [0, "I'm <b>additive</b>. I work with light: add red, green and blue and you get <b>white</b>."],
            [1, "I'm <b>subtractive</b>. My inks on paper <b>absorb</b> wavelengths from the reflected light."],
            [0, 'Every screen uses me: CRT phosphors, TFT LCD switches.'],
            [1, 'And every printer uses me. Printing <b>is</b> subtracting: that is exactly CMY.'],
            [0, 'Mix your C, M and Y and you get black, right?'],
            [1, "In theory. In practice it's <b>never really black</b>, so I carry a separate <b>K</b> ink."]
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Exam 2024/25: <i>"Why is CMYK commonly used in colour printing?"</i> Because inks <b>absorb (subtract)</b> light, and K gives a true black that mixing CMY cannot..',
            'امتحان 2024/25:<span class="ltr"><i>"Why is CMYK commonly used in colour printing?"</i></span>لأن الأحبار <b>بتمتص (بتطرح)</b> الضوء، والـ K بيدي أسود حقيقي الـ CMY مش بيعرف يعمله.')}</p></${Box}>
        `),

        // 28 · the worked 2×2 example (course summary)
        page(html`
          <${H2}>${t('A 2×2 image, start to finish', 'صورة 2×2 من الأول للآخر')}</${H2}>
          <${Hand} red=${true}>${t('from the course summary, not on the CM3106 slides', 'من ملخص الكورس، مش في سلايدات CM3106')}</${Hand}>
          <${Code} lines=${['R = [110 60; 20 70]', 'G = [110 210; 120 220]', 'B = [255 130; 90 140]']} />
          <table className="hf-mm8-tab hf-in" dir="ltr"><thead><tr><th>pixel</th><th>C</th><th>M</th><th>Y</th><th>K</th></tr></thead><tbody>
            ${[[[110, 110, 255]], [[60, 210, 130]], [[20, 120, 90]], [[70, 220, 140]]].map(([p], i) => { const r = cmykOf(p); return html`<tr key=${i}><td className="n">${p.join(',')}</td>${r.out.map((x, k) => html`<td key=${k} className=${'n' + (k === 3 ? ' hi' : '')}>${n4(x)}</td>`)}</tr>`; })}
          </tbody></table>
          <${P} small=${true}>${X('The summary keeps 6 decimals, e.g. (60,210,130): CMY = (0.764706, 0.176471, 0.490196), K = 0.176471, CMYK = (0.588235, 0, 0.313725, 0.176471).',
            'الملخص بيسيب 6 أرقام عشرية، مثلًا الـ pixel ده <bdi dir="ltr">(60,210,130)</bdi>:<span class="ltr">CMY = (0.764706, 0.176471, 0.490196)</span><span class="ltr">K = 0.176471</span><span class="ltr">CMYK = (0.588235, 0, 0.313725, 0.176471)</span>')}</${P}>
          <${P} small=${true}>${X('<b>YIQ</b> needs no normalising: Y = [126.53 156.03; 86.68 166.03], I = [−46.545 −63.72; −49.97 −63.72], Q = [44.545 −57.73; −31.13 −57.78].',
            'الـ <b>YIQ</b> مش محتاج normalising:<span class="ltr">Y = [126.53 156.03; 86.68 166.03]</span><span class="ltr">I = [−46.545 −63.72; −49.97 −63.72]</span><span class="ltr">Q = [44.545 −57.73; −31.13 −57.78]</span>')}</${P}>
        `, { sec: t('Worked example (summary)', 'مثال محلول (الملخص)') }),

        // 29 · YUV of one pixel (course summary)
        page(html`
          <${H2}>${t('One pixel through Y, U, V, Cb, Cr', 'pixel واحد في الـ Y والـ U والـ V والـ Cb والـ Cr')}</${H2}>
          <${P} small=${true}>${X('The same summary takes pixel (110, 110, 255) through every luminance model:', 'نفس الملخص بياخد الـ pixel ده <bdi dir="ltr">(110, 110, 255)</bdi> في كل الـ luminance models:')}</${P}>
          <${Code} lines=${['Y = 0.299×110 + 0.587×110', '    + 0.114×255', '  = 32.89 + 64.57 + 29.07', '  = 126.53', 'U = B − Y = 255 − 126.53 = 128.47', 'V = R − Y = 110 − 126.53 = −16.53', 'Cb = 128.47 / 1.772 = 72.50', 'Cr = −16.53 / 1.402 = −11.79']} />
          <${Box} kind="watch"><p className="hf-p small">${X("The summary's note: stored as pixel values, results are <b>floored</b> and negatives <b>clipped to 0</b> (so it shows I and Q as 0). In the exam, write the real computed values, then state any rounding you apply.",
            'ملاحظة الملخص: لما بنخزنها كـ pixel values، النتايج بيتعملها <b>floor</b> والسالب بيتعمله <b>clip لـ 0</b> (عشان كده بيظهر I وQ بـ 0). في الامتحان اكتب القيم الحقيقية اللي حسبتها، وبعدين قول أي rounding بتعمله.')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t('U and V can be negative: they are colour differences', 'الـ U والـ V ممكن يطلعوا بالسالب: دول فروق ألوان')}</${Hand}>
        `),

        // 30 · image and video size (course summary)
        page(html`
          <${H1}>${t('How big?', 'حجمه قد إيه؟')}</${H1}>
          <${Hand} red=${true}>${t('from the course summary / Final Rules, not on the CM3106 slides', 'من ملخص الكورس / الـ Final Rules، مش في سلايدات CM3106')}</${Hand}>
          <${P} small=${true}>${X('<b>Colour depth</b>: B/W 1 bit, greyscale 8 bits (1 byte), RGB true colour 24 bits (3 bytes). Units: 1 byte = 8 bits, KB = 1024 B, MB = 1024 KB, GB = 1024 MB.',
            'الـ <b>Colour depth</b>: الأبيض والأسود 1 bit، والـ grey <bdi dir="ltr">8 bits</bdi>، والـ RGB <bdi dir="ltr">24 bits</bdi>. والوحدات:<span class="ltr">1 byte = 8 bits, KB = 1024 B, MB = 1024 KB, GB = 1024 MB</span>')}</${P}>
          <${Code} lines=${['image = W × H × colour depth', '5×5 grey     = 25 B', '1920×1080×3  = 6,220,800 B', '             ≈ 5.93 MB', 'video = W × H × depth × fps × s']} />
          <${P} small=${true}>${X('One minute of 640×480 RGB at 25 fps, plus mono speech audio (time × sampling rate × bits per sample × channels):', 'دقيقة <bdi dir="ltr">640×480</bdi> RGB على <bdi dir="ltr">25 fps</bdi>، ومعاها audio كلام mono (الوقت × الـ rate × الـ bits × الـ channels):')}</${P}>
          <${Code} lines=${['921,600 × 25 × 60', '  = 1,382,400,000 B ≈ 1318.36 MB', '60 × 8000 × 16 × 1', '  = 7,680,000 bits = 960,000 B']} />
        `, { sec: t('Size, CR, MSE, MAE (summary)', 'الحجم والـ CR والـ MSE (الملخص)') }),

        // 31 · compression ratio
        page(html`
          <${H2}>${t('How squeezed? The compression ratio', 'اتضغط قد إيه؟ الـ compression ratio')}</${H2}>
          <${Def}>${X("<b>Course convention</b> (Multimedia Summary 2026 p. 15, handwritten), with I' the compressed and I the original image: CR = size(I') ÷ size(I) × 100 %. The same formula for <b>lossy and lossless</b>.",
            'الـ <b>convention بتاع الكورس</b> (الملخص ص. 15، بخط الإيد)، والـ <bdi dir="ltr">I\'</bdi> المضغوطة والـ I الأصلية:<span class="ltr">CR = size(I\') ÷ size(I) × 100 %</span>ونفس المعادلة في الـ <b>lossy والـ lossless</b>.')}</${Def}>
          <${Code} lines=${['5×5 grey: 25 B → 0.01 KB = 10.24 B', '  CR = 10.24 / 25 × 100 = 40.96 %', '25 B → 0.001 KB = 1.024 B', '  CR = 4.096 %']} />
          <${Box} kind="watch"><p className="hf-p small">${X('The textbook convention is the <b>inverse</b>, original ÷ compressed: 25 B → 10.24 B is 2.44 : 1.',
            'الـ convention بتاع الكتاب هو <b>العكس</b>، الأصلي ÷ المضغوط:<span class="ltr">25 B → 10.24 B = 2.44 : 1</span>')}</p></${Box}>
          <${UL} items=${A ? [
            'الـ <b>Lossless</b>: الصورة الراجعة <bdi dir="ltr">I\'\'\'</bdi> هي هي الأصلية I، فـ <b><bdi dir="ltr">MSE = MAE = 0</bdi></b>.',
            'الـ <b>Lossy</b>: الصورة الراجعة مش زي الأصلية، يعني compression أعلى وجودة أقل.'
          ] : [
            "<b>Lossless</b>: the reconstructed I''' equals the original I exactly, so <b>MSE = MAE = 0</b>.",
            "<b>Lossy</b>: I''' ≠ I: higher compression, lower quality."
          ]} />
        `),

        // 32 · MSE and MAE
        page(html`
          <${H2}>${t('How wrong? MSE and MAE', 'غلط قد إيه؟ الـ MSE والـ MAE')}</${H2}>
          <${Code} lines=${["MSE = 1/(MN) ΣΣ [I − I''']²", "MAE = 1/(MN) ΣΣ |I − I'''|"]} />
          <${P} small=${true}>${X('Subtract pixel by pixel, square (MSE) or take the absolute value (MAE), add up, divide by the number of pixels MN. The notes\' examples:', 'اطرح pixel pixel، وربّع (MSE) أو خد المطلق (MAE)، واجمع، واقسم على MN. أمثلة النوتس:')}</${P}>
          <${Code} lines=${["I = [10 15 23], I''' = [11 15 18]", 'd = −1, 0, 5', 'MSE = (1+0+25)/3 = 8.667', 'MAE = (1+0+5)/3  = 2', "I = [255 78; 255 15]", "I''' = [15 100; 255 15]", 'd = 240, −22, 0, 0', 'MSE = (57600+484)/4 = 14521', 'MAE = (240+22)/4    = 65.5']} />
          <${Box} kind="watch"><p className="hf-p small">${X('For an <b>RGB</b> image divide by <b>3MN</b>: sum over all three channels. If MSE/MAE is asked in another colour space (e.g. CMY), convert <b>both</b> images to that space first.',
            'في الصورة الـ <b>RGB</b> اقسم على <b>3MN</b>: اجمع على التلات channels. ولو الـ MSE أو الـ MAE مطلوب في colour space تاني (زي CMY)، حوّل <b>الصورتين</b> للـ space ده الأول.')}</p></${Box}>
        `),

        // 33 · the error meter
        page(html`
          <${Box} kind="pencil" title=${t('Be the error meter', 'خليك إنت الـ error meter')}><p className="hf-p small">${t('Pick a pair, work it out on paper, then step through to check.', 'اختار صورتين واحسبها على الورق، وبعدين امشي خطوة خطوة واتأكد.')}</p></${Box}>
          <${Meter} id="err" />
        `, { sec: t('Exercise: MSE and MAE', 'تمرين: الـ MSE والـ MAE') }),

        // 34 · video signals
        page(html`
          <${H1}>${t('Getting video down a wire', 'إزاي الـ video بيمشي في سلك')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>Component video</b>: كل primary (RGB، أو YIQ/YUV) في signal لوحده. أحسن ألوان، بس محتاج bandwidth أكتر وsynchronisation كويس بين التلاتة.',
            'الـ <b>Composite video</b>: الـ chrominance والـ luminance متخلطين على <b>carrier واحد</b>، وشوية interference مفيش منه مفر.',
            'الـ <b>S-Video</b> (Separated video، زي S-VHS): حل وسط بـ <b>2 lines</b>، واحد للـ luminance وواحد للـ composite chrominance.'
          ] : [
            '<b>Component video</b>: each primary (RGB, or YIQ/YUV) is a separate signal. Best colour, but more bandwidth and good synchronisation of the three.',
            '<b>Composite video</b>: chrominance and luminance mixed into <b>one carrier</b>; some interference is inevitable.',
            '<b>S-Video</b> (separated video, S-VHS): the compromise, <b>2 lines</b>: one luminance, one composite chrominance.'
          ]} />
          <${Sort} id="sig" bins=${[['3', 'Component'], ['1', 'Composite'], ['2', 'S-Video']]} items=${A ? [
            ['أحسن ألوان، بس bandwidth أكتر', 0], ['فيه interference بين اللون والإضاءة', 1], ['الحل الوسط', 2], ['كله على carrier واحد', 1]
          ] : [
            ['Best colour, more bandwidth', 0], ['Colour and brightness interfere', 1], ['The compromise', 2], ['Everything on one carrier', 1]
          ]} />
          <${Hand}>${t('the buttons are the number of lines: 3, 1 or 2', 'الأزرار هي عدد الـ lines: 3 أو 1 أو 2')}</${Hand}>
        `, { sec: t('Video signals', 'الـ Video signals') }),

        // 35 · NTSC and PAL
        page(html`
          <${H2}>${t('NTSC vs PAL', 'الـ NTSC قصاد الـ PAL')}</${H2}>
          <${StdTable} />
          <${P} small=${true}>${X('Both are <b>interlaced</b>: two fields per frame. NTSC reserves 20 lines per field for control, so at most <b>485 visible lines</b> (laser disc / S-VHS ≈ 420, ordinary TV ≈ 320).',
            'الاتنين <b>interlaced</b>، يعني كل frame فيه fieldين. والـ NTSC بيحجز 20 line في كل field للـ control، فأقصى حاجة <b>485 visible lines</b> (الـ laser disc والـ S-VHS حوالي 420، والتلفزيون العادي حوالي 320).')}</${P}>
          <${Hand} red=${true}>${t('the bandwidth split is still analog compression', 'تقسيم الـ bandwidth ده لسه analog compression')}</${Hand}>
        `),

        // 36 · the composite signal formulas
        page(html`
          <${H2}>${t('One wire, all the colour', 'سلك واحد شايل كل الألوان')}</${H2}>
          <${P}>${X('A composite signal adds the chrominance to the luminance on a <b>colour subcarrier</b> (Fsc):', 'الـ composite signal بتضيف الـ chrominance على الـ luminance فوق <b>colour subcarrier</b> (اسمه <bdi dir="ltr">Fsc</bdi>) زي كده:')}</${P}>
          <${Code} lines=${['NTSC: Y + I cos(Fsc t)', '        + Q sin(Fsc t)', 'PAL:  Y + 0.492 U sin(Fsc t)', '        + 0.877 V cos(Fsc t)', 'Fsc: colour subcarrier frequency']} />
          <${Hand}>${t('NTSC carries I and Q; PAL carries U and V', 'الـ NTSC بيشيل I وQ، والـ PAL بيشيل U وV')}</${Hand}>
        `),

        // 36b · figure: NTSC / PAL
        page(html`
          <${Fig} name="mm-ntsc-pal" />
        `),

        // 37 · chroma subsampling
        page(html`
          <${H1}>${t('Chroma subsampling: colour on a diet', 'الـ Chroma subsampling: اللون عامل رجيم')}</${H1}>
          <${P} small=${true}>${X('Store colour (<b>chroma</b>) at a <b>lower resolution</b> than intensity (<b>luma</b>). The eye is more sensitive to brightness than colour, and less to the position and motion of colour, so almost nothing visible is lost. Its main use: <b>compression</b> in JPEG and MPEG, one of the two main <b>lossy</b> sources.',
            'بنخزن اللون (الـ <b>chroma</b>) بـ <b>resolution أقل</b> من الـ intensity (الـ <b>luma</b>). العين حساسة للإضاءة أكتر من اللون، وأقل حساسية لمكان وحركة اللون، فتقريبًا مفيش فرق باين. استخدامه الأساسي الـ <b>compression</b> في JPEG وMPEG، وهو واحد من أهم مصدرين للـ <b>lossy</b>.')}</${P}>
          <${Def}>${X('The ratio <b>J:a:b</b>. 1st: the Luma (Y) or R horizontal reference (originally a multiple of 3.579 MHz in NTSC, rounded to 4). 2nd: the Cr/I/G horizontal factor. 3rd: the Cb/Q/B factor, <b>except 0</b>: Cb equals the 2nd digit and both are subsampled <b>2:1 vertically</b>.',
            'النسبة <b><bdi dir="ltr">J:a:b</bdi></b>. الأول هو الـ horizontal sampling reference بتاع الـ Luma (Y) أو الـ R (في الأصل مضاعف لـ <bdi dir="ltr">3.579 MHz</bdi> في الـ NTSC، اتقرّب لـ 4). التاني هو الـ horizontal factor بتاع <bdi dir="ltr">Cr/I/G</bdi>. والتالت بتاع <bdi dir="ltr">Cb/Q/B</bdi>، <b>إلا لو صفر</b>: الـ Cb زي التاني، والاتنين subsample <b><bdi dir="ltr">2:1</bdi> رأسي</b>.')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b><bdi dir="ltr">4:4:4</bdi></b>: مفيش subsampling خالص.',
            'الـ <b><bdi dir="ltr">4:2:2</bdi></b>: الـ chroma بنص الـ sample rate، فالـ resolution الأفقي للون بيتنصّ.',
            'الـ <b><bdi dir="ltr">4:1:1</bdi></b>: أفقي بـ factor 4.',
            'الـ <b><bdi dir="ltr">4:2:0</bdi></b>: بـ factor 2 أفقي ورأسي.'
          ] : [
            '<b>4:4:4</b>: no subsampling in any band.',
            '<b>4:2:2</b>: chroma at half the luma sample rate: horizontal colour resolution halved.',
            '<b>4:1:1</b>: horizontally by a factor of 4.',
            '<b>4:2:0</b>: by a factor of 2 both horizontally and vertically.'
          ]} />
        `, { sec: t('Chroma subsampling', 'الـ Chroma subsampling') }),

        // 38 · figure: chroma layout
        page(html`
          <${H2}>${t('Which samples each scheme keeps', 'كل scheme بيحتفظ بأنهي samples')}</${H2}>
          <${Fig} name="mm-chroma-layout" />
        `),

        // 39 · count the samples
        page(html`
          <${H2}>${t('Count the samples', 'عِدّ الـ samples')}</${H2}>
          <p className="hf-hand">${t('how many Y + Cb + Cr samples are stored?', 'كام sample من الـ Y والـ Cb والـ Cr بيتخزنوا؟')}</p>
          <${Sort} id="cnt" bins=${[['12', '12'], ['8', '8'], ['6', '6'], ['4', '4']]} items=${A ? [
            ['الـ <bdi dir="ltr">4:4:4</bdi>، لـ 4 pixels', 0], ['الـ <bdi dir="ltr">4:2:2</bdi>، لـ 4 pixels', 1], ['الـ <bdi dir="ltr">4:1:1</bdi>، لـ 4 pixels', 2], ['الـ <bdi dir="ltr">4:2:0</bdi>، لـ block <bdi dir="ltr">2×2</bdi>', 2], ['الـ <bdi dir="ltr">4:1:1</bdi>، لـ 8 pixels (صفين)', 0], ['الـ Y لوحده، لـ 4 pixels في <bdi dir="ltr">4:2:2</bdi>', 3]
          ] : [
            ['4:4:4, 4 pixels', 0], ['4:2:2, 4 pixels', 1], ['4:1:1, 4 pixels', 2], ['4:2:0, one 2×2 block', 2], ['4:1:1, 8 pixels (two rows of 4)', 0], ['Y alone, 4 pixels in 4:2:2', 3]
          ]} />
          <${P} small=${true}>${X('4:2:2 keeps <b>2/3</b> of the data, 4:1:1 and 4:2:0 <b>1/2</b>. Our sums from those counts, 640×480, 1 byte per sample:', 'الـ <bdi dir="ltr">4:2:2</bdi> بيحتفظ بـ <b><bdi dir="ltr">2/3</bdi></b> من الـ data، والباقيين بـ <b>النص</b>. حساب من عندنا لـ <bdi dir="ltr">640×480</bdi> وكل sample بـ byte:')}</${P}>
          <${Code} lines=${['4:4:4  307,200 × 3   = 921,600 B', '4:2:2  307,200 × 2   = 614,400 B', '4:1:1  307,200 × 1.5 = 460,800 B', '4:2:0  307,200 × 1.5 = 460,800 B']} />
        `, { sec: t('Exercise: chroma', 'تمرين: الـ chroma') }),

        // 40 · computing it
        page(html`
          <${H2}>${t('How the sampling is done', 'الـ sampling بيتعمل إزاي')}</${H2}>
          <${UL} items=${A ? [
            'الـ subsampling ببساطة <b>frequency sampling مختلف</b> للـ signal.',
            'في <bdi dir="ltr">4:2:2</bdi> و<bdi dir="ltr">4:1:1</bdi>: خد <b>كل تاني أو كل رابع</b> pixel value في الصف.',
            'في <bdi dir="ltr">4:2:0</bdi>: الـ Cr والـ Cb في النص بين الصفوف، فبنقسم الصورة لـ blocks <bdi dir="ltr">2×2</bdi> ونخزن <b>متوسط (average)</b> اللون لكل block.'
          ] : [
            'Subsampling is simply <b>different frequency sampling</b> of the signal.',
            'For 4:2:2 and 4:1:1: choose <b>every second or fourth</b> pixel value along each row (1×2 or 1×4 subsampling).',
            'For 4:2:0: Cr and Cb sit halfway between rows, so break the image into 2×2 blocks and store the <b>average</b> colour of each block.'
          ]} />
          <${Def}>${X("<b>MATLAB</b>: <code>imresize()</code> on the U/I and V/Q channels. <code>'nearest'</code> (default) for 4:2:2 and 4:1:1, MCOLS to half or a quarter; <code>'bilinear'</code> (to average) for 4:2:0, scale one half.",
            "في الـ <b>MATLAB</b>: بنستخدم <code>imresize()</code> على channels الـ U/I والـ V/Q. استخدم <code>'nearest'</code> (الـ default) لـ <bdi dir=\"ltr\">4:2:2</bdi> و<bdi dir=\"ltr\">4:1:1</bdi> وخلّي الـ MCOLS نص أو ربع، واستخدم <code>'bilinear'</code> (عشان يعمل average) لـ <bdi dir=\"ltr\">4:2:0</bdi> بـ scale نص.")}</${Def}>
          <${Code} lines=${['B = imresize(A, M, METHOD)', 'B = imresize(A, [MROWS MCOLS],', '             METHOD)']} />
          <${P} small=${true}>${X('‡ The slide prints "4:2:1"; 4:1:1 is meant (quarter-size MCOLS).', '‡ السلايد كاتبة "<bdi dir="ltr">4:2:1</bdi>"، والمقصود <bdi dir="ltr">4:1:1</bdi> (الـ MCOLS بربع الحجم).')}</${P}>
        `),

        // 41 · figure: chroma grid
        page(html`
          <${H2}>${t('Try it: where the chroma is sampled', 'جرّب: الـ chroma بتتاخد منين')}</${H2}>
          <${Fig} name="mm-chroma-grid" />
        `),

        // 42 · errors and dumb questions
        page(html`
          <${H2}>${t('The two errors it brings', 'الـ errors اللي بيجيبها')}</${H2}>
          <${UL} items=${A ? [
            'الأول <b>صغير</b>: اللون بيتخزن بنص الـ resolution الأفقي والرأسي. مش مشكلة حقيقية: العين قدرتها على تفاصيل اللون أقل، وتقريبًا كل الـ digital cameras الـ resolution بتاعها للون أقل أصلًا.',
            'التاني الـ <b>integer rounding</b>: تحويلين، من RGB لـ YIQ/YUV ورجوع لما الصورة تتعرض، بـ integer arithmetic. <b>تأثير أصغر بكتير</b>، بيغيّر شوية لون واحد أو اتنين في المية من الـ pixels.'
          ] : [
            'First, <b>minor</b>: colour kept at half the horizontal and vertical resolution. Not a real problem: the eye resolves colour less finely, and nearly all digital cameras have lower colour resolution anyway.',
            'Second, <b>integer rounding</b>: two conversions, RGB → YIQ/YUV and back when displayed, in integer arithmetic. A <b>much smaller effect</b>, slightly changing the colour of one or two percent of the pixels.'
          ]} />
          <${Hand} red=${true}>${t("so don't compress and recompress videos too often: edit the original", 'فمتعملش compress وrecompress للـ videos كتير: عدّل على الأصل')}</${Hand}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['يعني <bdi dir="ltr">4:2:0</bdi> معناها مفيش Cb خالص؟', 'لأ. الـ 0 معناها إن الـ Cb زي الرقم التاني، والاتنين بيتعملهم subsample <bdi dir="ltr">2:1</bdi> رأسي: Cb واحد وCr واحد لكل block <bdi dir="ltr">2×2</bdi>.']
          ] : [
            ['So 4:2:0 means no Cb at all?', 'No. The 0 means Cb takes the 2nd digit and both are subsampled 2:1 vertically: one Cb and one Cr per 2×2 block.']
          ]} />
        `),

        // 43 · aliasing
        page(html`
          <${H1}>${t('Aliasing: when sampling lies', 'الـ Aliasing: لما الـ sampling يكدب')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>Stair-stepping</b>: حواف مسننة على الخطوط المايلة (زي الحروف المايلة).',
            'الـ <b>Image zooming</b>: لما تغيّر الـ resolution أو تعمل scan بـ resolution مش كفاية. الـ zoom in بـ n بيقسم الـ sample resolution على n.',
            'الـ <b>Temporal aliasing</b>: عجلة الـ wagon اللي باينة بتلف لورا (الـ strobing effect)، والقطر اللي باين ماشي في الاتجاهين. الـ sampling rate الغلط <b>بيفريز</b> الـ frames في اللحظة الغلط.',
            'الـ <b>Raster scan aliasing</b>: لمعان ورعشة على الخطوط الأفقية الحادة.',
            'الـ <b>Interlacing aliasing</b>: الـ interlacing عمليًا <b>بيقسم الـ sampling frequency على اتنين</b>.'
          ] : [
            '<b>Stair-stepping</b>: jagged edges on angled lines (e.g. slanted letters).',
            '<b>Image zooming</b>: changing resolution or scanning at inadequate resolution. Zooming in by n divides the sample resolution by n.',
            "<b>Temporal aliasing</b>: wagon-wheel spokes seeming to reverse (the 'strobing effect'); the train that seems to move both ways. The wrong sampling rate <b>freezes</b> frames at the wrong moment.",
            '<b>Raster scan aliasing</b>: twinkling/strobing on sharp horizontal lines.',
            '<b>Interlacing aliasing</b>: interlacing effectively <b>halves</b> the sampling frequency.'
          ]} />
          <${P} small=${true}>${X("The explanation every time: <b>Nyquist's sampling theorem</b>. ‡ Sampled above the Nyquist rate the wheel shows its true motion; below it, it moves wrongly (e.g. backwards); at exactly the Nyquist rate the direction is ambiguous.",
            'التفسير في كل مرة: <b>Nyquist\'s sampling theorem</b>. ‡ لو الـ sampling فوق الـ Nyquist rate العجلة بتبيّن حركتها الحقيقية، ولو تحته بتتحرك غلط (زي إنها بتلف لورا)، وعند الـ Nyquist rate بالظبط الاتجاه مش واضح.')}</${P}>
        `, { sec: t('Aliasing', 'الـ Aliasing') }),

        // 44 · figure: wagon wheel
        page(html`
          <${H2}>${t('Try it: the wagon-wheel effect', 'جرّب: الـ wagon-wheel effect')}</${H2}>
          <${Fig} name="mm-wagon-wheel" />
        `),

        // exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers. Tap an answer to see why it is right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-jpeg', /Which colour model is used by JPEG/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('JPEG works on luminance and chrominance, so it can subsample the chroma', 'الـ JPEG بيشتغل على الـ luminance والـ chrominance، فيقدر يعمل subsample للـ chroma')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-conv', /Convert RGB = \(0\.1, 0\.5, 0\.4\)/i)}
          <${Grow} />
          <${Hand} red=${true}>${X('already normalised: just 1 − x, then K = min, then subtract', 'القيم متقسومة جاهزة: <bdi dir="ltr">1 − x</bdi> بس، وبعدين <bdi dir="ltr">K = min</bdi>، وبعدين اطرح')}</${Hand}>
        `),
        page(html`
          ${mq('m-mse', /squared-error sum/i)}
          <${Grow} />
          <${Hand}>${X('a 4 × 4 image: MN = 16 pixels', 'صورة <bdi dir="ltr">4 × 4</bdi>: يعني <bdi dir="ltr">MN = 16</bdi> pixel')}</${Hand}>
        `),
        page(html`
          ${mq('m-mae', /The MAE is/i)}
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('16 values: add the 16 absolute differences, then divide by 16. Which wrong option forgot to divide?', '16 قيمة: اجمع الـ 16 فرق مطلق، وبعدين اقسم على 16. أنهي اختيار غلط نسي يقسم؟')}</p></${Box}>
        `),

        // 49 · bullet points 1
        page(html`
          <${Bullets} items=${A ? [
            'الحجم هو العرض × الطول × الـ bits لكل pixel. في صورة <bdi dir="ltr">640×480</bdi>: الأبيض والأسود 37.5 KB، والـ grey والـ <bdi dir="ltr">8-bit</bdi> colour كل واحد 307.2 KB، والـ <bdi dir="ltr">24-bit</bdi> بـ 921.6 KB.',
            'الصورة الـ <bdi dir="ltr">8-bit</bdi> colour بتخزن <b>index</b> في الـ LUT، ولو غيّرت الـ map يحصل palette animation.',
            'في الـ dithering بنقسم على <bdi dir="ltr">256/17</bdi> ونقرّب لتحت، والنقطة بتتحط لو القيمة <b>أكبر من</b> الـ entry. الـ simple بيكبّر الصورة 16 مرة، والـ ordered بيحافظ على حجمها.',
            'الـ GIF بيستخدم LZW وهو lossless و256 لون بس، والـ JPEG بيعمل lossy للصور، والـ PNG بيحل محل الـ GIF (48 bits وalpha)، والـ TIFF بالـ tags، والـ EPS من غير compression، والـ BMP بتاع Windows.',
            'الضوء المرئي من 400 لـ 700 nm. الـ rods للإضاءة، والـ cones (أحمر وأخضر وأزرق) للون.',
            'الـ CIE 1931 فيه X وY وZ، والـ Y هي الـ luminous efficiency، وهو vector-based. والـ Lab فيه L، والـ a من الأخضر للأحمر، والـ b من الأزرق للأصفر.'
          ] : [
            'Size = W × H × bits per pixel. At 640×480: B/W 37.5 KB, grey and 8-bit colour 307.2 KB, 24-bit 921.6 KB.',
            '8-bit colour stores an <b>index</b> into a LUT; changing the map gives palette animation.',
            'Dithering: ÷ (256/17), round down; a dot where the value is <b>&gt;</b> the entry. Simple: 16× larger; ordered: same size.',
            'GIF: LZW, lossless, 256 colours. JPEG: lossy, photos. PNG replaces GIF (48 bits, alpha). TIFF: tags. EPS: no compression. BMP: Windows.',
            'Visible light: 400–700 nm. Rods: brightness; cones (R, G, B): colour.',
            'CIE 1931: XYZ, Y = luminous efficiency; vector-based. Lab: L, a (green–red), b (blue–yellow).'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 50 · bullet points 2
        page(html`
          <${Bullets} items=${A ? [
            'الـ Y هو هو في التلاتة:<span class="ltr">Y = 0.299R + 0.587G + 0.114B</span>',
            'الـ YIQ بتاع الـ NTSC، والـ bandwidth <bdi dir="ltr">Y 4, I 1.5, Q 0.6 MHz</bdi>. والـ YUV فيه <bdi dir="ltr">U = B − Y</bdi> و<bdi dir="ltr">V = R − Y</bdi>. والـ YCrCb (بتاع <b>JPEG</b>) هو الـ YUV بعد الـ scaling.',
            'الـ CMY هي <bdi dir="ltr">1 − RGB</bdi> (من 0 لـ 1)، والـ K هي <bdi dir="ltr">min(C, M, Y)</bdi>، وبعدين نطرحها. الطباعة subtractive.',
            'الـ CR بتاع الكورس هو المضغوط ÷ الأصلي × 100%. والـ MSE والـ MAE بنقسمهم على MN (أو <bdi dir="ltr">3MN</bdi> للـ RGB)، والـ lossless بيدي 0.',
            'الـ NTSC فيه 525 سطر و<bdi dir="ltr">29.97 fps</bdi> وبيستخدم YIQ، والـ PAL فيه 625 سطر و<bdi dir="ltr">25 fps</bdi> وبيستخدم YUV. الاتنين <bdi dir="ltr">4:3</bdi> وinterlaced.',
            'في الـ chroma، كل 4 pixels: الـ <bdi dir="ltr">4:4:4</bdi> فيها 12 sample، والـ <bdi dir="ltr">4:2:2</bdi> فيها 8، والـ <bdi dir="ltr">4:1:1</bdi> والـ <bdi dir="ltr">4:2:0</bdi> فيهم 6. والـ <bdi dir="ltr">4:2:0</bdi> بياخد average كل block <bdi dir="ltr">2×2</bdi>.',
            'الـ aliasing بكل أنواعه (stair-stepping وzoom وwagon wheel وraster وinterlacing) تفسيره Nyquist.'
          ] : [
            'One Y for all three: Y = 0.299R + 0.587G + 0.114B.',
            'YIQ for NTSC: Y 4, I 1.5, Q 0.6 MHz. YUV: U = B − Y, V = R − Y. YCrCb = YUV ÷ 1.772 and 1.402, used by <b>JPEG</b>.',
            'CMY = 1 − RGB (0…1), K = min(C, M, Y), subtract K. Printing is subtractive.',
            'CR (course) = compressed ÷ original × 100 %. MSE and MAE divide by MN (3MN for RGB); lossless gives 0.',
            'NTSC: 525 lines, 29.97 fps, YIQ. PAL: 625 lines, 25 fps, YUV. Both 4:3, interlaced.',
            'Chroma per 4 pixels: 4:4:4 → 12 samples, 4:2:2 → 8, 4:1:1 and 4:2:0 → 6. 4:2:0 averages each 2×2 block.',
            'Aliasing (stair-stepping, zoom, wagon wheel, raster, interlacing): Nyquist explains it.'
          ]} />
        `),

        // 51 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 8!', 'خلّصت الفصل التامن!')}</${H1}>
            <${Talk} who="cam">${t('From pixels to PAL: that was the whole picture. Now lock it in!', 'من الـ pixels لحد الـ PAL: دي كانت الصورة كلها. ثبّتها بقى!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [8], t: Date.now() } }}>${t('Quiz me on Lecture 8', 'امتحنّي في محاضرة 8')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 8, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 8, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

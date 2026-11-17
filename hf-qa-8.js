// Head First chapter for Software Quality Assurance Lecture 8 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Six Sigma: definitions, σ and the normal curve (±1σ … ±6σ, ppm out of spec), 3.4 vs 0.002 ppm (1.5σ drift, background),
// DPMO (background formula), DMAIC phase by phase, DMADV (‡ new vs existing, not on the slides), principles, implementation
// phases, the preparatory-certificate case (Six sigma = 6 × SD), the belts, and the tools and techniques.
// Every fact comes from the lecture's notes; analogies are marked as ours. Numbers checked by hand twice and with node:
// table 68.27 / 95.45 / 99.73 / 99.9937 / 99.999943 / 99.9999998 % inside ↔ 317,300 / 45,500 / 2,700 / 63 / 0.57 / 0.002 ppm;
// 3.4 / 10⁶ = 0.00034 % → 99.99966 %; DPMO 25/(500×10)×10⁶ = 5,000, 18/(300×5)×10⁶ = 12,000, 9/(1,500×2)×10⁶ = 3,000,
// 17/(1,000,000×5)×10⁶ = 3.4; case 6 × SD for every row (X1 7.32 … X10 6.18, overall 6.42), 6 × 1.15 = 6.90,
// √0.25 × 6 = 3, √0.81 × 6 = 5.4, 6.24 ÷ 6 = 1.04, largest X7 = 7.62.
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T8 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-qa8')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa8';
    s.textContent = `
.hfb .hf-qa8-sq{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 8px; background:var(--paper); display:grid; gap:6px; }
.hfb .hf-qa8-sq svg{ display:block; width:100%; height:auto; }
.hfb .hf-qa8-read{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:5px; }
.hfb .hf-qa8-read > div{ border:1.5px solid var(--hf-line); border-radius:6px; padding:4px 3px; text-align:center; font:600 13px/1.15 var(--body); color:var(--graphite); }
.hfb .hf-qa8-read b{ display:block; font:800 15px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-qa8-read .bad b{ color:var(--hf-red); }
.hfb .hf-qa8-ctl{ display:flex; gap:6px; align-items:center; }
.hfb .hf-qa8-ctl .grow{ flex:1; }
.hfb .hf-qa8-tiles{ display:flex; gap:4px; }
.hfb .hf-qa8-tiles > span{ flex:1 1 0; min-width:0; border:2px solid var(--hf-line); border-radius:7px; text-align:center; padding:5px 0 4px; background:var(--paper); font:800 22px/1 var(--body); color:var(--ink); }
.hfb .hf-qa8-tiles > span small{ display:block; font:600 13px/1.1 var(--body); color:var(--graphite); margin-top:3px; }
.hfb .hf-qa8-tiles > span.on{ background:var(--hf-k); border-color:var(--hf-k); color:var(--paper); }
.hfb .hf-qa8-tiles > span.on small{ color:var(--paper); }
.hfb .hf-qa8-tiles > span.dim{ opacity:.45; }
.hfb .hf-qa8-eq{ font:800 17px/1.3 var(--body); text-align:center; margin:0; padding:7px 8px; border:2px solid var(--hf-k); border-radius:8px; color:var(--ink); background:var(--paper); }
.hfb .hf-qa8-tbl{ border-collapse:collapse; width:100%; font:500 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qa8-tbl th, .hfb .hf-qa8-tbl td{ border:1px solid var(--hf-line); padding:4px 6px; text-align:start; vertical-align:middle; }
.hfb .hf-qa8-tbl th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-qa8-tbl td.m{ font:700 13.5px/1.2 var(--mono); }
.hfb .hf-qa8-tbl tr.hi td{ background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); font-weight:700; }
.hfb .hf-qa8-calc{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; background:var(--paper); }
.hfb .hf-qa8-tabs{ display:flex; gap:4px; }
.hfb .hf-qa8-tabs button{ flex:1 1 0; min-width:0; font:800 13.5px/1 var(--body); min-height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa8-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qa8-pr{ font:500 14.5px/1.36 var(--body); margin:0; color:var(--ink); min-height:3.9em; }
.hfb .hf-qa8-pr b{ font-weight:700; }
.hfb .hf-qa8-in{ width:110px; box-sizing:border-box; height:34px; font:700 16px/1 var(--mono); text-align:center; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-qa8-in.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); } .hfb .hf-qa8-in.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qa8-sol{ font:600 13px/1.45 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; margin:0; direction:ltr; text-align:left; }
.hfb .hf-qa8-sol b{ color:var(--hf-k); }
.hfb .hf-qa8-ord{ display:grid; gap:5px; }
.hfb .hf-qa8-ord button{ display:flex; align-items:center; gap:8px; text-align:start; font:500 14px/1.25 var(--body); padding:6px 8px; min-height:38px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qa8-ord button i{ flex:none; display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; font:800 13px/1 var(--body); font-style:normal; background:var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa8-ord button.on i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-qa8-ord button.ok{ border-color:var(--ok); } .hfb .hf-qa8-ord button.no{ border-color:var(--hf-red); }
.hfb .hf-qa8-chips{ display:flex; flex-wrap:wrap; gap:6px; }
.hfb .hf-qa8-chips span{ font:700 14px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:999px; padding:5px 10px; background:var(--paper); color:var(--ink); }
.hfb .hf-qa8-chips span:nth-child(odd){ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-qa8-s5 .hf-sort .ch button{ min-width:30px; }
.hfb .hf-qa8-s5 .hf-sort .ch{ gap:3px; }
.hf-ar .hf-qa8-read > div, .hf-ar .hf-qa8-pr, .hf-ar .hf-qa8-ord button, .hf-ar .hf-qa8-tbl, .hf-ar .hf-qa8-tiles > span small{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-qa8-eq{ font-family:"IBM Plex Sans Arabic", var(--body); font-weight:600; }
.hf-ar .hf-qa8-pr{ line-height:1.55; font-size:14px; }
`;
    document.head.appendChild(s);
  }

  // the slide's normal-distribution table: share inside ±kσ and parts per million out of spec
  const SIG = [['68.27%', '317,300'], ['95.45%', '45,500'], ['99.73%', '2,700'], ['99.9937%', '63'], ['99.999943%', '0.57'], ['99.9999998%', '0.002']];

  // Squeeze the curve: the customer's limits stay put; shrink σ and more sigmas fit between them (our picture, the slide's numbers)
  function Squeeze() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('sq', 1);
    const [v, setV] = useState(k);
    useEffect(() => {
      if (calm()) { setV(k); return; }
      let raf; const from = v, t0 = performance.now();
      const tick = now => { const p = Math.min(1, (now - t0) / 450); setV(from + (k - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
    }, [k]);
    const cx = 160, W = 110, base = 112, s = W / v, h = 30 + 12.5 * v;
    const Y = x => base - h * Math.exp(-Math.pow((x - cx) / s, 2) / 2);
    const area = (a, b) => { let d = `M${a},${base}`; for (let x = a; x <= b; x += 2) d += ` L${x},${Y(x).toFixed(1)}`; return d + ` L${b},${base} Z`; };
    let curve = ''; for (let x = 2; x <= 318; x += 2) curve += (x === 2 ? 'M' : ' L') + x + ',' + Y(x).toFixed(1);
    const [pct, ppm] = SIG[k - 1];
    const ys = Y(cx + s);
    return html`<div className="hf-qa8-sq hf-in">
      <div dir="ltr"><svg viewBox="0 0 320 124" role="img" aria-label=${'Normal curve with the customer limits at plus and minus ' + k + ' sigma'}>
        <path d=${area(2, cx - W)} style=${{ fill: 'color-mix(in srgb, var(--hf-red) 55%, var(--paper))' }} />
        <path d=${area(cx + W, 318)} style=${{ fill: 'color-mix(in srgb, var(--hf-red) 55%, var(--paper))' }} />
        <path d=${area(cx - W, cx + W)} style=${{ fill: 'color-mix(in srgb, var(--hf-k) 30%, var(--paper))' }} />
        <path d=${curve} fill="none" style=${{ stroke: 'var(--ink)' }} strokeWidth="2.5" />
        <line x1="2" y1=${base} x2="318" y2=${base} style=${{ stroke: 'var(--ink)' }} strokeWidth="2" />
        ${[cx - W, cx + W].map(x => html`<line key=${x} x1=${x} y1="10" x2=${x} y2=${base + 8} style=${{ stroke: 'var(--hf-red)' }} strokeWidth="2.5" strokeDasharray="5 3" />`)}
        <line x1=${cx} y1=${ys} x2=${cx + s} y2=${ys} style=${{ stroke: 'var(--hf-hand)' }} strokeWidth="2.5" />
        <text x=${cx + s / 2} y=${ys - 5} textAnchor="middle" fontSize="15" fontWeight="700" style=${{ fill: 'var(--hf-hand)' }}>σ</text>
      </svg></div>
      <div className="hf-qa8-read">
        <div>${ar ? 'الحدود عند' : 'limits at'}<b dir="ltr">±${k}σ</b></div>
        <div>${ar ? 'جوّه' : 'inside'}<b dir="ltr">${pct}</b></div>
        <div className=${k < 4 ? 'bad' : ''}>${ar ? 'برّه (ppm)' : 'out (ppm)'}<b dir="ltr">${ppm}</b></div>
      </div>
      <div className="hf-qa8-ctl">
        <button className="hf-btn" onClick=${() => setK(Math.max(1, k - 1))} disabled=${k === 1}>${ar ? 'σ أكبر' : 'σ bigger'}</button>
        <span className="grow"></span>
        <span className="hf-dots" dir="ltr">${[1, 2, 3, 4, 5, 6].map(j => html`<i key=${j} className=${j <= k ? 'on' : ''}></i>`)}</span>
        <span className="grow"></span>
        <button className="hf-btn solid" onClick=${() => setK(Math.min(6, k + 1))} disabled=${k === 6}>${ar ? 'σ أصغر' : 'σ smaller'}</button>
      </div>
    </div>`;
  }

  // the five letters, with one of them lit (DMAIC or DMADV)
  function Tiles({ names, on }) {
    return html`<div className="hf-qa8-tiles hf-in" dir="ltr">${names.map((n, j) => html`<span key=${j} className=${on == null ? '' : j === on ? 'on' : 'dim'}>${n[0]}<small>${n}</small></span>`)}</div>`;
  }
  const DMAIC = ['Define', 'Measure', 'Analyze', 'Improve', 'Control'];
  const DMADV = ['Define', 'Measure', 'Analyze', 'Design', 'Verify'];

  // Be the calculator: type a number, check it, or see the worked solution
  function Calc({ id, probs, unit }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, 0);
    const p = probs[k];
    const [val, setVal] = H.K.useSlot(id + ':v' + k, '');
    const [c, setC] = H.K.useSlot(id + ':c' + k, false);
    const clean = String(val).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٫]/g, '.').replace(/[,\s٬]/g, '');
    const num = clean === '' ? NaN : Number(clean);
    const ok = Math.abs(num - p.ans) < 1e-6 + Math.abs(p.ans) * 1e-6;
    return html`<div className="hf-qa8-calc hf-in">
      <div className="hf-qa8-tabs" dir="ltr" role="group" aria-label="Problems">${probs.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)} aria-label=${'Problem ' + (j + 1)}>${j + 1}</button>`)}</div>
      <p className="hf-qa8-pr">${T8(ar ? p.ar : p.en)}</p>
      <div className="hf-row">
        <input className=${'hf-qa8-in' + (c ? (ok ? ' ok' : ' no') : '')} type="text" inputMode="decimal" autoComplete="off" spellCheck="false" aria-label=${ar ? 'إجابتك' : 'Your answer'} value=${val} onChange=${e => { setVal(e.target.value); if (c) setC(false); }} />
        ${unit && html`<span className="hf-p small">${unit}</span>`}
        <button className="hf-btn solid" onClick=${() => setC(true)} disabled=${clean === ''}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setVal(p.show); setC(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
      </div>
      ${c && html`<p className="hf-score">${ok ? (ar ? 'صح!' : 'Right!') : (ar ? 'لأ، بص على الحل:' : 'Not quite. The working:')}</p>`}
      ${c && html`<div className="hf-qa8-sol hf-in">${p.sol.map((l, j) => html`<div key=${j}>${T8(l)}</div>`)}</div>`}
    </div>`;
  }

  // Put the six implementation phases in order: tap them first to last
  const ORD = [
    ['Select the important projects to apply Six Sigma to', 'نختار المشاريع المهمة اللي هنطبق عليها الـ Six Sigma'],
    ['Assign experienced employees to improvement tasks', 'نخصص موظفين عندهم خبرة كويسة لمهام التحسين'],
    ['Write the project document: reasons, objectives, scope', 'نكتب document للمشروع: أسبابه وأهدافه والـ scope'],
    ['Train on the requirements of Six Sigma', 'الـ training على متطلبات الـ Six Sigma'],
    ['Implement the process: practical solutions, applied', 'ننفذ الـ process: حلول عملية ونطبقها'],
    ['Submit the solutions', 'نقدّم الحلول']
  ];
  const SH = [3, 5, 0, 2, 4, 1];
  function Order() {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot('ord', []);
    const [c, setC] = H.K.useSlot('ord:c', false);
    const tap = j => { setC(false); const at = seq.indexOf(j); setSeq(at >= 0 ? seq.slice(0, at) : seq.concat(j)); };
    const right = seq.filter((j, pos) => SH[j] === pos).length;
    return html`<div className="hf-in">
      <div className="hf-qa8-ord">${SH.map((st, j) => { const pos = seq.indexOf(j); const cls = (pos >= 0 ? 'on' : '') + (c && pos >= 0 ? (st === pos ? ' ok' : ' no') : '');
        return html`<button key=${j} className=${cls} onClick=${() => tap(j)} aria-pressed=${String(pos >= 0)}><i>${pos >= 0 ? pos + 1 : '?'}</i><span>${ar ? ORD[st][1] : ORD[st][0]}</span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${seq.length < 6} onClick=${() => setC(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq([0, 1, 2, 3, 4, 5].map(n => SH.indexOf(n))); setC(true); }}>${ar ? 'ورّيني الترتيب' : 'Show the order'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 6</bdi> صح` : right + ' / 6 right'}</span>`}
      </div></div>`;
  }

  H.chapters.qa[8] = {
    title: 'Six Sigma', kicker: 'Chapter 8', run: 'six sigma',
    ar: { title: 'الـ Six Sigma', kicker: 'الفصل 8', run: 'الـ six sigma' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 8);
      const arL = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[8]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src), with the site's Arabic why for each choice
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      // the site's practice questions (no src), from quiz or extra
      const pfind = re => {
        let i = (lec.quiz || []).findIndex(x => !x.src && re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: arQuiz[i] };
        i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: arExtra[i] };
      };
      const pq = (id, re) => { const r = pfind(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const exam = t('Exam corner', 'ركن الامتحان');
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;

      return [
        // 0 · how this chapter works, and where we left off (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter you met the big frameworks: <b>CMM</b> with its five maturity levels, <b>ISO 9000</b> with its 20 documented quality elements, and <b>SPICE</b> (ISO/IEC 15504) for assessing the software process. This chapter is different. <b>Six Sigma counts defects</b>, per million.',
            'في الفصل اللي فات قابلت الـ frameworks الكبيرة: الـ <b>CMM</b> بالـ five maturity levels، والـ <b>ISO 9000</b> بالـ 20 quality element المتوثقين، والـ <b>SPICE</b> <bdi dir="ltr">(ISO/IEC 15504)</bdi> لتقييم الـ software process. الفصل ده مختلف: الـ <b>Six Sigma بيعدّ الـ defects</b>، بالمليون.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will match, sort, order and calculate right on the page.', '<b>حل التمارين.</b> هتوصّل وتصنّف وترتّب وتحسب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, many from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، وكتير منها من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a point that is not on the slides; the notes add it as background.', 'معناها نقطة مش موجودة في السلايدز، والنوتس زوّدتها كمعلومة عامة.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">8</span><span className="t">${A ? html`الفصل التامن<br/>Software Quality` : html`Chapter eight<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('3.4 in a Million', '3.4 في المليون')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('six sigma', 'الـ six sigma')}</p></div>
          <${P}>${X('Here is the deal: give a process <b>a million chances</b> to go wrong, and Six Sigma allows it <b>3.4 defects</b>, or less.',
            'الاتفاق كده: ادّي أي process <b>مليون فرصة</b> إنها تغلط، والـ Six Sigma يسمحلها بـ <b>3.4 defects</b> بس، أو أقل.')}</${P}>
          <${Talk} who="bug">${t('A million chances and I only get 3.4 of them? That is not fair!', 'مليون فرصة وأنا آخد منهم 3.4 بس؟ ده ظلم!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Fair would be <b>zero</b>. That is what Six Sigma is really aiming at.', 'العدل إنك تاخد <b>صفر</b>. وده اللي الـ Six Sigma عايز يوصله فعلًا.')}</${Talk}>
          <${P} small=${true}>${X('In this chapter: what <b>σ</b> is and why 3.4, the five letters <b>DMAIC</b> (and their cousin DMADV), a real case with exam results, and the <b>belts</b>.',
            'في الفصل ده: يعني إيه <b>σ</b> وليه 3.4، والخمس حروف بتوع الـ <b>DMAIC</b> (وقريبهم الـ DMADV)، وحالة حقيقية من نتايج امتحانات، والـ <b>belts</b>.')}</${P}>
        `, { sec: t('Meet Six Sigma', 'اتعرّف على الـ Six Sigma') }),

        // 2 · what is Six Sigma
        page(html`
          <${H1}>${t('So what is Six Sigma?', 'يعني إيه Six Sigma أصلًا؟')}</${H1}>
          <${Def}>${X('<b>Six Sigma</b> is one of the most famous management concepts in <b>total quality management</b>. It emerged in the <b>late 1970s and early 1980s</b> and became popular as major global companies adopted it.',
            'الـ <b>Six Sigma</b> من أشهر مفاهيم الإدارة في الـ <b>total quality management</b>. ظهر في <b>أواخر السبعينات وأوائل التمانينات</b>، واشتهر لما شركات عالمية كبيرة اعتمدته.')}</${Def}>
          <${P} small=${true}>${X('It leads companies to avoid the highest possible percentage of errors <b>in all their activities</b>, and to reduce quality defects as much as possible. Its quality control programs focus on correcting three kinds of defects:',
            'بيخلّي الشركات تتجنب أعلى نسبة ممكنة من الـ errors <b>في كل أنشطتها</b>، وتقلل الـ quality defects على قد ما تقدر. وبرامج الـ quality control بتاعته بتركز على تصليح تلات أنواع defects:')}</${P}>
          <div className="hf-qa8-chips hf-in" dir="ltr"><span>design</span><span>industrial</span><span>commercial</span></div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('"In <b>all</b> their activities." So could a hospital, a supply chain or an accounts office use Six Sigma, or only a factory? And is there anything it could <i>not</i> work on? (Keep your answer: the midterm asks.)',
            'بيقول "في <b>كل</b> أنشطتها". يبقى ينفع مستشفى أو supply chain أو مكتب حسابات يستخدم الـ Six Sigma، ولا المصانع بس؟ وهل فيه حاجة <i>مينفعش</i> يشتغل عليها؟ (احفظ إجابتك: الميدترم سأل.)')}</p></${Box}>
        `),

        // 3 · two definitions, and the goal
        page(html`
          <${H2}>${t('Two definitions, one target', 'تعريفين، وهدف واحد')}</${H2}>
          <${Def}>${X('<b>6 Sigma</b> is a <b>systematic method</b> for using the collection of critically important information and statistical analysis to identify <b>sources of errors</b> and ways to eliminate them.',
            'الـ <b>6 Sigma</b> هو <b>systematic method</b> بيستخدم تجميع معلومات مهمة جدًا وتحليل إحصائي عشان يحدد <b>مصادر الـ errors</b> وطرق التخلص منها.')}</${Def}>
          <${Def}>${X('It is a <b>statistical management system</b> focusing on <b>customer satisfaction</b>, reducing waste, improving quality, and improving financial and time performance.',
            'وهو <b>statistical management system</b> بيركز على <b>رضا العميل</b>، وتقليل الهدر (waste)، وتحسين الـ quality، وتحسين الأداء المالي والزمني.')}</${Def}>
          <${P} small=${true}>${X('It <b>reduces process variation</b> until the result is <b>3.4 defects per million</b> samples (opportunities) or less. The aim is <b>zero defects</b>: a zero-defect product for the customer.',
            'بيقلل الـ <b>process variation</b> لحد ما النتيجة تبقى <b>3.4 defects في المليون</b> sample (opportunity) أو أقل. والهدف <b>zero defects</b>، يعني product من غير أي defects للعميل.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('The slide writes <b>"zero default"</b>; it means zero <i>defects</i>. The exam copied the slide word for word: <i>"…… reduce process variation to reach zero default"</i>. The answer is <b>6 Sigma</b>, not CMM, SPICE or ISO 9000.',
            'السلايد كاتبة <bdi dir="ltr"><b>"zero default"</b></bdi> والمقصود zero <i>defects</i>. والامتحان نقل جملة السلايد زي ما هي:<span class="ltr"><i>"…… reduce process variation to reach zero default"</i></span>والإجابة <b>6 Sigma</b>، مش الـ CMM ولا الـ SPICE ولا الـ ISO 9000.')}</p></${Box}>
        `),

        // 4 · meet sigma
        page(html`
          <${H1}>${t('Meet σ', 'اتعرّف على σ')}</${H1}>
          <${Def}>${X('<b>Standard deviation (σ)</b> is a statistical method and an indicator used to describe <b>deviation, variance, dispersion or asymmetry</b> in a certain process with respect to the desired objectives.',
            'الـ <b>Standard deviation (σ)</b> هو statistical method ومؤشر بيوصف <b>الانحراف أو الـ variance أو التشتت أو عدم التماثل</b> في process معينة بالنسبة للأهداف المطلوبة.')}</${Def}>
          <p className="hf-qa8-eq hf-in" dir="ltr">σ = √variance</p>
          <${Hand} red=${true} arrow="up">${t('square ROOT of the variance, not its square', 'الجذر التربيعي للـ variance، مش مربّعها')}</${Hand}>
          <${Talk} who="dev">${t('So what does the "six" in Six Sigma count?', 'طب الـ "six" اللي في Six Sigma بتعدّ إيه؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("Sigmas. The slide's curve is marked from <b>−6σ to +6σ</b>, and at ±6σ almost nothing is left outside.", 'بتعد sigmas. المنحنى في السلايد متعلّم من <bdi dir="ltr"><b>−6σ</b></bdi> لحد <bdi dir="ltr"><b>+6σ</b></bdi>، وعند <bdi dir="ltr">±6σ</bdi> تقريبًا مفيش حاجة بتفضل برّه.')}</${Talk}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': σ is how far an archer's arrows usually land from the bullseye. Small σ, tight group.", 'تشبيه من عندنا: الـ σ هي الأسهم بتاعة الرامي بتبعد عن نص الهدف قد إيه عادةً. σ صغيرة يعني الأسهم لازقة في بعض.')}</${Hand}>
        `, { sec: t('What is σ?', 'يعني إيه σ؟') }),

        // 5 · interview with sigma
        page(html`
          <${Interview} title=${t('Standard Deviation, exposed', 'الـ Standard Deviation على المكشوف')} sub=${t("This week's interview: the Greek letter the whole method is named after.", 'حوار الأسبوع: الحرف اليوناني اللي الـ method كلها على اسمه.')} lines=${A ? [
            ['المذيع', 'إنت مين بالظبط؟'],
            ['الـ σ', 'أنا statistical method ومؤشر. بوصف الـ process بتبعد عن المطلوب قد إيه: انحراف، variance، تشتت، عدم تماثل.'],
            ['المذيع', 'وإيه علاقتك بالـ variance؟'],
            ['الـ σ', 'أنا <b>الجذر التربيعي</b> بتاعه. يعني هو مربّعي.'],
            ['المذيع', 'والـ Six Sigma مهتم بيك ليه؟'],
            ['الـ σ', 'لأنه بيقلل الـ <b>process variation</b>. كل ما أصغر، كل ما نتايج أقل تطلع برّه الـ spec.'],
            ['المذيع', 'وتصغر لحد إمتى؟'],
            ['الـ σ', 'لحد ما يبقى فيه <b>3.4 defects في المليون</b> بالكتير. والحلم صفر.'],
            ['المذيع', 'وفي سلايد الحالة العملية؟'],
            ['الـ σ', 'هناك بيضربوني في 6 وخلاص:<span class="ltr">Six sigma = 6 × standard deviation</span>']
          ] : [
            ['Head First', 'Who are you, really?'],
            ['σ', 'A statistical method and an indicator. I describe how far a process strays from what it should be: deviation, variance, dispersion, asymmetry.'],
            ['Head First', 'And your relation to the variance?'],
            ['σ', "I'm its <b>square root</b>. The variance is my square."],
            ['Head First', 'Why does Six Sigma care about you?'],
            ['σ', 'Because it <b>reduces process variation</b>. The smaller I get, the fewer results land out of spec.'],
            ['Head First', 'How small is small enough?'],
            ['σ', 'Small enough that there are <b>3.4 defects per million</b> opportunities, or less. The dream is zero.'],
            ['Head First', 'And on the case-study slide?'],
            ['σ', 'There they just multiply me by 6: <b>Six sigma = 6 × standard deviation</b>.']
          ]} />
        `),

        // 6 · the slide's figure
        page(html`
          <${Fig} name="qa-sigma-curve" />
        `, { sec: t('The normal curve', 'الـ normal curve') }),

        // 7 · the table
        page(html`
          <${H2}>${t('The table to know cold', 'الجدول اللي لازم تحفظه')}</${H2}>
          <${P} small=${true}>${X('Under the curve, the slide gives the share inside each band and the <b>parts per million (ppm)</b> out of spec:', 'تحت المنحنى، السلايد بتدي النسبة اللي جوّه كل band، وعدد الـ <b>parts per million (ppm)</b> اللي برّه الـ spec:')}</${P}>
          <table className="hf-qa8-tbl hf-in"><thead><tr><th>${t('Range', 'المدى')}</th><th>${t('Inside the limits', 'جوّه الحدود')}</th><th>${t('Out of spec (ppm)', 'برّه الـ spec بالـ ppm')}</th></tr></thead>
            <tbody>${SIG.map(([p, o], j) => html`<tr key=${j} className=${j === 2 || j === 5 ? 'hi' : ''}><td className="m"><bdi dir="ltr">±${j + 1}σ</bdi></td><td className="m"><bdi dir="ltr">${p}</bdi></td><td className="m"><bdi dir="ltr">${o}</bdi></td></tr>`)}</tbody></table>
          <${Box} kind="watch"><p className="hf-p small">${X('The quiz favourite: <b>±3σ = 99.73%</b> inside, <b>2,700 ppm</b> out. Don\'t mix it with ±1σ (68.27%) or ±2σ (95.45%). And ±6σ leaves <b>0.002 ppm</b>, not 3.4 (two pages on).',
            'السؤال المفضّل: الـ <bdi dir="ltr"><b>±3σ = 99.73%</b></bdi> جوّه، و<b>2,700 ppm</b> برّه. متلخبطهاش مع الـ <bdi dir="ltr">±1σ</bdi> (68.27%) ولا الـ <bdi dir="ltr">±2σ</bdi> (95.45%). والـ <bdi dir="ltr">±6σ</bdi> بتسيب <b>0.002 ppm</b>، مش 3.4 (بعد صفحتين).')}</p></${Box}>
          <${Hand} tilt=${true}>${t('Trick (ours): 68, 95, 99.7 for the first three. Each extra σ cuts what is outside by a lot.', 'حيلة من عندنا: احفظ 68 و95 و99.7 للتلاتة الأولانيين. وكل σ زيادة بتقلل اللي برّه جامد.')}</${Hand}>
        `),

        // 8 · match the bands to the ppm
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${t('Cover the table. Tap a band, then tap how many parts per million fall outside it.', 'غطّي الجدول. دوس على الـ band، وبعدين دوس على عدد الـ ppm اللي برّاه.')}</p></${Box}>
          <${Match} id="ppm" left=${['±1σ', '±2σ', '±3σ', '±4σ', '±5σ', '±6σ']}
            right=${['63 ppm', '317,300 ppm', '0.002 ppm', '2,700 ppm', '0.57 ppm', '45,500 ppm']}
            answer=${[1, 5, 3, 0, 4, 2]} />
          <${Grow} />
          <${Hand} arrow="up" red=${true}>${t('the wider the band in sigmas, the fewer ppm outside', 'كل ما الـ band يوسع بعدد sigmas أكتر، الـ ppm اللي برّه تقل')}</${Hand}>
        `, { sec: t('Exercises', 'التمارين') }),

        // 9 · squeeze the curve
        page(html`
          <${H2}>${t('Squeeze the curve', 'اعصر المنحنى')}</${H2}>
          <${P} small=${true}>${X('Why does <b>reducing variation</b> cut defects? (Our picture, the slide\'s numbers.) The customer\'s limits (red) stay put; shrink σ and more sigmas fit inside.',
            'ليه <b>تقليل الـ variation</b> بيقلل الـ defects؟ (الرسمة من عندنا والأرقام من السلايد.) حدود العميل (الأحمر) ثابتة؛ صغّر الـ σ فتدخل sigmas أكتر جوّاها.')}</${P}>
          <${Squeeze} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: variation <b>increases the likelihood of failing to meet customer requirements</b> (more spread, more output outside the limits). It doesn\'t shorten cycle time, isn\'t one of the 8 wastes, and isn\'t only in manufacturing.',
            'في الميدترم: الـ <b>variation</b> <b>بتزوّد احتمال إننا منلبّيش متطلبات العميل</b> (انتشار أكتر يعني نتايج أكتر برّه الحدود). مش بتقصّر الـ cycle time، ومش من الـ 8 wastes، ومش في التصنيع بس.')}</p></${Box}>
        `),

        // 10 · 0.002 or 3.4?
        page(html`
          <${Box} kind="brain"><p className="hf-p small">${X('The table says ±6σ leaves <b>0.002 ppm</b> outside. So why does everyone, the lecture included, say Six Sigma means <b>3.4 per million</b>?',
            'الجدول بيقول إن الـ <bdi dir="ltr">±6σ</bdi> بتسيب <b>0.002 ppm</b> برّه. أمال ليه الكل، والمحاضرة نفسها، بيقولوا إن الـ Six Sigma يعني <b>3.4 في المليون</b>؟')}</p></${Box}>
          <${H2}>${t('0.002 or 3.4?', 'يا ترى 0.002 ولا 3.4؟')}</${H2}>
          <${P} small=${true}>${X('The figure shows a perfectly <b>centred</b> curve. ‡ The famous 3.4 comes from allowing the process mean to <b>drift by 1.5σ</b> in the long term, which leaves 6 − 1.5 = <b>4.5σ</b> on one side. (General Six Sigma background, not on the slide.)',
            'الشكل بيوضح منحنى <b>في النص بالظبط</b> (centred). ‡ أما الـ 3.4 المشهورة فجاية من إننا بنسمح للـ process mean <b>يزحف 1.5σ</b> على المدى الطويل، فيفضل من ناحية واحدة:<span class="ltr">6 − 1.5 = 4.5σ</span>(معلومة عامة عن الـ Six Sigma، مش في السلايد.)')}</${P}>
          <${Box} kind="exam" title=${t('From the midterm', 'من الميدترم')}><p className="hf-p small">${X('"What is the percentage accuracy in the six sigma process?" Start from 3.4 defects per million:', 'سؤال الميدترم عن الـ percentage accuracy في الـ six sigma. ابدأ من 3.4 defects في المليون:')}</p>
            <${Code} lines=${['3.4 ÷ 1,000,000 = 0.00034%', '100% − 0.00034% = 99.99966%']} />
            <p className="hf-p small" style=${{ marginTop: '5px' }}>${X('Answer: <b>99.99966%</b>. Not the table\'s 99.9999998%: that one is the centred ±6σ.', 'الإجابة <b><bdi dir="ltr">99.99966%</bdi></b>. مش الـ <bdi dir="ltr">99.9999998%</bdi> اللي في الجدول؛ دي بتاعة الـ <bdi dir="ltr">±6σ</bdi> المتمركزة.')}</p></${Box}>
        `, { sec: t('3.4 per million', '3.4 في المليون') }),

        // 11 · DPMO
        page(html`
          <${H2}>${t('Counting defects: DPMO', 'نعدّ الـ defects بالـ DPMO')}</${H2}>
          <${P} small=${true}>${X('‡ Not on the slides: the notes add this formula as background, in case you are asked to calculate.', '‡ مش في السلايدز: النوتس زوّدتها لو اتسألت تحسب.')}</${P}>
          <p className="hf-qa8-eq hf-in" dir="ltr">DPMO = defects ÷ (units × opportunities per unit) × 1,000,000</p>
          <${P} small=${true}>${X('<b>Worked example</b>: 25 defects in 500 units, each with 10 defect opportunities.', '<b>مثال محلول</b>: 25 defects في 500 unit، وكل unit فيها 10 opportunities.')}</${P}>
          <${Code} lines=${[['500 × 10 = 5,000', t('opportunities', 'الـ opportunities')], ['25 ÷ 5,000 = 0.005', t('defects per opportunity', 'لكل opportunity')], ['0.005 × 1,000,000 = 5,000', 'DPMO']]} />
          <${Hand} arrow="up">${t('yield 99.5%, about 4.1σ with the 1.5σ shift. At 6σ, DPMO = 3.4.', 'الـ yield كده <bdi dir="ltr">99.5%</bdi>، يعني حوالي <bdi dir="ltr">4.1σ</bdi> مع الـ shift. وعند <bdi dir="ltr">6σ</bdi> الـ DPMO بيبقى 3.4.')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X('The classic slip: forgetting the opportunities. 25 ÷ 500 × 10⁶ = 50,000 is <b>wrong</b>; divide by units <b>×</b> opportunities.', 'الغلطة المشهورة: تنسى الـ opportunities وتقسم على 500 بس، فيطلع 50,000 وده <b>غلط</b>.')}</p></${Box}>
        `),

        // 12 · DPMO calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the calculator', 'خليك إنت الآلة الحاسبة')}><p className="hf-p small">${t('Work out the DPMO for each process. Type it (commas are fine), then check.', 'احسب الـ DPMO لكل process. اكتب الرقم (عادي تحط فواصل)، وبعدين صحّح.')}</p></${Box}>
          <${Calc} id="dpmo" unit="DPMO" probs=${[
            { en: '<b>18 defects</b> are found in <b>300 units</b>, each with <b>5</b> defect opportunities.', ar: 'لقينا <b>18 defect</b> في <b>300 unit</b>، وكل unit فيها <b>5</b> opportunities.', ans: 12000, show: '12,000',
              sol: ['300 × 5 = 1,500 opportunities', '18 ÷ 1,500 = 0.012', '0.012 × 1,000,000 = <b>12,000 DPMO</b>'] },
            { en: '<b>9 defects</b> in <b>1,500 units</b>, each with <b>2</b> opportunities.', ar: 'فيه <b>9 defects</b> في <b>1,500 unit</b>، وكل unit فيها <b>2</b> opportunities.', ans: 3000, show: '3,000',
              sol: ['1,500 × 2 = 3,000 opportunities', '9 ÷ 3,000 = 0.003', '0.003 × 1,000,000 = <b>3,000 DPMO</b>'] },
            { en: '<b>17 defects</b> in <b>1,000,000 units</b>, each with <b>5</b> opportunities. Is this process at Six Sigma?', ar: 'فيه <b>17 defect</b> في <b>مليون unit</b>، وكل unit فيها <b>5</b> opportunities. هل الـ process دي وصلت Six Sigma؟', ans: 3.4, show: '3.4',
              sol: ['1,000,000 × 5 = 5,000,000 opportunities', '17 ÷ 5,000,000 = 0.0000034', '× 1,000,000 = <b>3.4 DPMO</b> = Six Sigma ✓'] }
          ]} />
        `),

        // 13 · DMAIC overview
        page(html`
          <${H1}>${t('Five letters: DMAIC', 'خمس حروف: DMAIC')}</${H1}>
          <${Def}>${X('<b>6 Sigma Objective</b>: the 6 Sigma methodology is <b>DMAIC</b>: Define, Measure, Analyze, Improve, Control.', 'الـ <b>6 Sigma Objective</b>: الـ methodology بتاعة الـ 6 Sigma هي <b>DMAIC</b>، يعني Define و Measure و Analyze و Improve و Control.')}</${Def}>
          <${Tiles} names=${DMAIC} />
          <${UL} items=${A ? [
            'الـ <b>Define</b>: إيه المشكلة؟ وكوّن team.',
            'الـ <b>Measure</b>: قيس الأداء قصاد اللي العميل عايزه.',
            'الـ <b>Analyze</b>: لاقي الـ root causes.',
            'الـ <b>Improve</b>: غيّر الـ process وجرّب الحلول.',
            'الـ <b>Control</b>: راقب، ومتبطّلش أبدًا.'
          ] : [
            '<b>Define</b>: what is the problem? Form a team.',
            '<b>Measure</b>: measure performance against what customers want.',
            '<b>Analyze</b>: find the root causes.',
            '<b>Improve</b>: change the process, test the solutions.',
            '<b>Control</b>: monitor, and never stop.'
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Four of these phases finish. One of them, by the slide\'s own words, never does. Guess which before you turn the page.', 'أربعة من دول بيخلصوا. وواحدة منهم، بكلام السلايد نفسها، عمرها ما بتخلص. خمّن مين قبل ما تقلب.')}</p></${Box}>
        `, { sec: 'DMAIC' }),

        // 14 · the DMAIC figure
        page(html`
          <${H2}>${t('DMAIC, step by step', 'الـ DMAIC خطوة خطوة')}</${H2}>
          <${Fig} name="qa-dmaic" />
        `),

        // 15 · Define
        page(html`
          <${Tiles} names=${DMAIC} on=${0} />
          <${H2}>${t('D – Define', 'حرف الـ D: الـ Define')}</${H2}>
          <${P} small=${true}>${X("Identify what needs to be <b>improved and developed</b> in the organization's work and activities, through the <b>precise identification of the problems</b> that obstacle this improvement.",
            'نحدد إيه اللي محتاج <b>يتحسن ويتطور</b> في شغل الـ organization وأنشطتها، عن طريق إننا <b>نحدد بدقة المشاكل</b> اللي معطّلة التحسين ده.')}</${P}>
          <${P} small=${true}>${X('The <b>problem statement</b> should generally include:', 'الـ <b>problem statement</b> المفروض يشمل:')}</${P}>
          <div className="hf-qa8-chips hf-in"><span>${t('its level', 'مستوى المشكلة (level)')}</span><span>${t('its location', 'مكانها (location)')}</span><span>${t('its financial impact', 'تأثيرها المالي (financial impact)')}</span></div>
          <${P} small=${true}>${X('And: <b>form a team</b> to solve the problem.', 'وكمان: <b>نكوّن team</b> يحل المشكلة.')}</${P}>
          <${Grow} />
          <${Talk} who="bug">${t("You can't fix me without knowing how bad I am, where, and what I cost.", 'مش هتصلّحني من غير ما تعرف أنا وحش قد إيه، وفين، وبكلّفك كام.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('Level, location, financial impact. Noted. The team is on its way.', 'الـ level والـ location والـ financial impact. اتسجلوا. والـ team جاي في السكة.')}</${Talk}>
        `),

        // 16 · Measure
        page(html`
          <${Tiles} names=${DMAIC} on=${1} />
          <${H2}>${t('M – Measure', 'حرف الـ M: الـ Measure')}</${H2}>
          <${P} small=${true}>${X('It mainly focuses on <b>planning and implementing performance measurement</b> against the requirements and expectations of customers, based on a set of criteria for measuring defects through statistical control with <b>various scientific and statistical tools (6σ)</b>.',
            'بتركز أساسًا على إننا <b>نخطط وننفذ قياس الأداء</b> قصاد متطلبات العملاء وتوقعاتهم، على أساس مجموعة criteria لقياس الـ defects بالـ statistical control، بـ <b>أدوات علمية وإحصائية مختلفة (6σ)</b>.')}</${P}>
          <${Hand} tilt=${true}>${t('Ours: before you change anything, find out how bad it is today, in numbers.', 'من عندنا: قبل ما تغيّر أي حاجة، اعرف الوضع النهارده وحش قد إيه، بالأرقام.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: "During which phase of DMAIC is the <b>baseline</b> of the problem determined?" <b>Measure</b>. Measuring current performance before anything changes is the baseline that every later improvement is compared with. Define <i>describes</i> the problem; Measure puts numbers on it.',
            'سؤال ميدترم: الـ <b>baseline</b> بتاع المشكلة بيتحدد في أنهي phase؟ الإجابة <b>Measure</b>. قياس الأداء الحالي قبل أي تغيير هو الـ baseline اللي أي تحسين بعد كده بيتقارن بيه. الـ Define <i>بيوصف</i> المشكلة، والـ Measure بيحط لها أرقام.')}</p></${Box}>
        `),

        // 17 · Analyze
        page(html`
          <${Tiles} names=${DMAIC} on=${2} />
          <${H2}>${t('A – Analyze', 'حرف الـ A: الـ Analyze')}</${H2}>
          <${P} small=${true}>${X('Analyze the collected data to identify the <b>root causes</b> of all problems and obstacles to improvement:', 'نحلل الـ data اللي اتجمعت عشان نحدد الـ <b>root causes</b> لكل المشاكل والعوائق اللي قدام التحسين:')}</${P}>
          <div className="hf-chain hf-in">
            ${(A ? ['نحلل سلسلة أسباب الفشل', 'نرتّبها حسب تأثيرها', 'نصنّفها', 'نتحكم فيها وندير'] : ['analyze the chain of failure causes', 'rank them by their impact', 'categorize them', 'control and manage them']).map((x, j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<span className="ph">${t('then', 'وبعدين')}</span>`}<span className="pr">${x}</span></${React.Fragment}>`)}
          </div>
          <${Grow} />
          <${Hand} tilt=${true}>${t('Ours: Measure says "how bad". Analyze asks "why?", again and again, until it hits the root.', 'من عندنا: الـ Analyze بيسأل "ليه؟" تاني وتالت لحد ما يوصل للجذر.')}</${Hand}>
          <${Talk} who="lens" flip=${true}>${t('No solutions yet. Analyze only finds and ranks the causes.', 'لسه مفيش حلول. الـ Analyze بيلاقي الأسباب ويرتّبها بس.')}</${Talk}>
        `),

        // 18 · Improve
        page(html`
          <${Tiles} names=${DMAIC} on=${3} />
          <${H2}>${t('I – Improve', 'حرف الـ I: الـ Improve')}</${H2}>
          <${P} small=${true}>${X('<b>Changes in processes</b> occur to eliminate product defects, excessive costs, waste, etc., confirming the precise identification of customer needs and expectations. The steps:',
            'هنا <b>بيحصل تغيير في الـ processes</b> عشان نشيل الـ product defects والتكاليف الزيادة والهدر (waste)، وده بيأكد إن احتياجات العميل وتوقعاته متحددة بدقة. الخطوات:')}</${P}>
          <${UL} items=${A ? ['ندرس أسباب الفشل', 'نلاقي لها حلول', '<b>نجرّب الحلول على sample</b> من المنتجات', 'نحدد النتايج', 'نعمل التصحيحات اللازمة'] : ['study the causes of failure', 'find solutions for them', '<b>test these solutions on a sample</b> of products', 'determine the results', 'make the necessary corrections']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Solutions are tested on a sample of products": that is <b>Improve</b>. Not Measure, not Analyze: no solution exists before Improve.', 'لو السؤال عن "تجربة الحلول على sample من المنتجات" فده <b>Improve</b>. مش Measure ولا Analyze، لأن مفيش حلول أصلًا قبل الـ Improve.')}</p></${Box}>
        `),

        // 19 · Control
        page(html`
          <${Tiles} names=${DMAIC} on=${4} />
          <${H2}>${t('C – Control', 'حرف الـ C: الـ Control')}</${H2}>
          <${P} small=${true}>${X('Focus on <b>monitoring all of these processes</b>, and <b>do not stop</b>, as there are always areas in need of improvement. Take into consideration:',
            'نركز على <b>مراقبة كل الـ processes دي</b>، <b>ومنبطّلش</b>، لأن دايمًا فيه حاجات محتاجة تتحسن. وناخد في اعتبارنا:')}</${P}>
          <${UL} items=${A ? ['نقيس معايير الأداء <b>باستمرار</b>', 'نعمل عمليات القياس', 'نصحّح أي انحرافات، لو لقيناها، <b>في الوقت المحدد</b>'] : ['<b>continuously</b> measuring performance standards', 'conducting measurement processes', 'correcting any deviations, if found, <b>at the specified time</b>']} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: "During which phase of DMAIC is the solution monitored for <b>long-term stability</b>?" <b>Control</b>. Improve puts the solution in; Control keeps it there.',
            'سؤال ميدترم: الحل بيتراقب عشان يفضل <b>ثابت على المدى الطويل</b> في أنهي phase؟ الإجابة <b>Control</b>. الـ Improve بيحط الحل، والـ Control بيحافظ عليه.')}</p></${Box}>
          <${Hand} red=${true}>${t('the answer to the Brain Power: Control never ends', 'إجابة "شغّل مخك": الـ Control عمره ما بيخلص')}</${Hand}>
        `),

        // 20 · sort: which phase?
        page(html`
          <${Box} kind="pencil" title=${t('Be the phase', 'خليك إنت الـ phase')}><p className="hf-p small">${X('Which DMAIC phase does it? Tap <b>D M A I C</b>, then check.', 'مين بيعمل كده في الـ DMAIC؟ دوس على <bdi dir="ltr"><b>D M A I C</b></bdi>، وبعدين صحّح.')}</p></${Box}>
          <div className="hf-qa8-s5"><${Sort} id="dmaic" bins=${DMAIC.map(n => [n[0], n])} items=${A ? [
            ['بيكوّن team يحل المشكلة', 0],
            ['بيحدد مستوى المشكلة ومكانها وتأثيرها المالي', 0],
            ['بيقيس الأداء قصاد متطلبات العملاء', 1],
            ['بيحدد الـ baseline قبل أي تغيير', 1],
            ['بيرتّب أسباب الفشل حسب تأثيرها', 2],
            ['بيجرّب الحلول على sample من المنتجات', 3],
            ['بيغيّر الـ processes عشان يشيل الـ waste', 3],
            ['بيصحّح الانحرافات في وقتها ومبيبطّلش', 4]
          ] : [
            ['Forms a team to solve the problem', 0],
            ["States the problem's level, location, financial impact", 0],
            ["Measures performance against customers' requirements", 1],
            ['Sets the baseline before anything changes', 1],
            ['Ranks the failure causes by their impact', 2],
            ['Tests the solutions on a sample of products', 3],
            ['Changes processes to remove waste', 3],
            ['Corrects deviations on time, and never stops', 4]
          ]} /></div>
        `),

        // 21 · dumb questions on DMAIC
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ Define والـ Measure مش نفس الحاجة؟', 'لأ. الـ <b>Define</b> بيوصف المشكلة (مستواها ومكانها وتأثيرها المالي) ويكوّن الـ team. والـ <b>Measure</b> بيقيس الأداء بالأرقام قصاد متطلبات العميل، وده الـ baseline.'],
            ['الحلول بتظهر إمتى أول مرة؟', 'في الـ <b>Improve</b>: بنلاقيها، ونجربها على sample، ونحدد النتايج، ونصحّح. الـ Analyze بيلاقي الأسباب بس.'],
            ['الـ Six Sigma بيخلص إمتى؟', 'مبيخلصش. الـ <b>Control</b> بيفضل يراقب "لأن دايمًا فيه حاجات محتاجة تتحسن".'],
            ['ليه الـ "6σ" مكتوبة جوّه الـ Measure؟', 'لأن الـ Measure بيستخدم <b>أدوات علمية وإحصائية مختلفة (6σ)</b> عشان يقيس الـ defects.']
          ] : [
            ['Aren\'t Define and Measure the same thing?', 'No. <b>Define</b> describes the problem (level, location, financial impact) and forms the team. <b>Measure</b> puts numbers on performance against customer requirements: the baseline.'],
            ['When do solutions first appear?', 'In <b>Improve</b>: found, tested on a sample, results determined, corrected. Analyze only finds the causes.'],
            ['When is Six Sigma finished?', 'Never. <b>Control</b> keeps monitoring "as there are always areas in need of improvement".'],
            ['Why is "6σ" written inside Measure?', 'Measure uses <b>various scientific and statistical tools (6σ)</b> to measure defects.']
          ]} />
        `),

        // 22 · DMADV
        page(html`
          <${H1}>${t('Meet the cousin: DMADV', 'اتعرّف على القريب: الـ DMADV')}</${H1}>
          <${P} small=${true}>${X('The slide also shows <b>DMADV</b>: five curved arrows forming a cycle around a circle labelled "DMADV".', 'الـ slide كمان بتعرض الـ <b>DMADV</b>: خمس أسهم مقوّسة عاملين دايرة حوالين دايرة مكتوب فيها DMADV.')}</${P}>
          <${Tiles} names=${DMADV} />
          <${P} small=${true}>${X('<b>Define → Measure → Analyze → Design → Verify</b>, and back to Define.', 'الدورة كده، وبعدها بترجع للـ Define تاني:<span class="ltr"><b>Define → Measure → Analyze → Design → Verify</b></span>')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Same first three letters as DMAIC. The difference is the last two: <b>Design, Verify</b> instead of <b>Improve, Control</b>. And V is <b>Verify</b>, not Validate.',
            'أول تلات حروف زي الـ DMAIC بالظبط. الفرق في آخر اتنين: <b>Design و Verify</b> بدل <b>Improve و Control</b>. والـ V معناها <b>Verify</b>، مش Validate.')}</p></${Box}>
          <${P} small=${true}>${X('‡ Not on the slides: DMADV is used for designing <b>new</b> processes or products; DMAIC improves <b>existing</b> ones.', '‡ مش في السلايدز: الـ DMADV بيتستخدم لتصميم processes أو products <b>جديدة</b>؛ أما الـ DMAIC فبيحسّن الحاجات <b>الموجودة</b>.')}</${P}>
          <${Hand} tilt=${true}>${t('On the slide it covers part of a DMAIC figure behind it ("Improve: Implement … the solution").', 'في السلايد الشكل ده مغطّي جزء من شكل DMAIC وراه (مكتوب فيه "Improve: Implement … the solution").')}</${Hand}>
        `, { sec: 'DMADV' }),

        // 23 · the DMADV figure
        page(html`
          <${H2}>${t('The DMADV cycle', 'دورة الـ DMADV')}</${H2}>
          <${Fig} name="qa-dmadv" />
        `),

        // 24 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: DMAIC and DMADV argue about who owns the first three letters.', 'قعدة الليلة: الـ DMAIC والـ DMADV بيتخانقوا مين صاحب أول تلات حروف.')} />
          <${Chat} names=${['DMAIC', 'DMADV']} lines=${A ? [
            [0, 'أنا اللي على سلايد الـ <b>6 Sigma Objective</b>: أنا <b>الـ</b> methodology بتاعة الـ Six Sigma.'],
            [1, 'وأنا على الشكل اللي بعدك. ونفس البداية: Define وMeasure وAnalyze.'],
            [0, 'إنت ناقل أول تلات حروف مني.'],
            [1, 'بس بعدهم أنا بعمل <b>Design</b> وبعدين <b>Verify</b>، وأسهمي بترجع للـ Define.'],
            [0, 'وأنا بعمل <b>Improve</b> للـ process، وبعدين <b>Control</b> للأبد. عمري ما ببطّل.'],
            [1, 'النوتس بتقول (‡ مش في السلايدز) إني للـ processes والـ products <b>الجديدة</b>.'],
            [0, 'وأنا للحاجات <b>الموجودة</b> اللي فيها defects.'],
            [1, 'يعني لو مفيش حاجة لسه تتحسن، بيجولي أنا.']
          ] : [
            [0, "I'm on the <b>6 Sigma Objective</b> slide. I am <i>the</i> Six Sigma methodology."],
            [1, "And I'm on the very next figure. Same start: Define, Measure, Analyze."],
            [0, 'You copied my first three letters.'],
            [1, 'Then I <b>Design</b> and <b>Verify</b>, and my arrows lead back to Define.'],
            [0, 'And I <b>Improve</b> the process, then <b>Control</b> it forever. I never stop.'],
            [1, 'The notes say (‡ not on the slides) I am for designing <b>new</b> processes and products.'],
            [0, 'And I am for <b>existing</b> ones that have defects.'],
            [1, "So when there's nothing yet to improve, they call me."]
          ]} />
        `),

        // 25 · sort: DMAIC, DMADV or both
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Tap <b>C</b> for DMAIC, <b>V</b> for DMADV, <b>B</b> for both.', 'دوس <b>C</b> للـ DMAIC، و<b>V</b> للـ DMADV، و<b>B</b> لو الاتنين.')}</p></${Box}>
          <${Sort} id="dmadv" bins=${[['C', 'DMAIC'], ['V', 'DMADV'], ['B', t('Both', 'الاتنين')]]} items=${A ? [
            ['بيبدأ بالـ Define', 2],
            ['فيه phase اسمها Improve', 0],
            ['آخره Verify', 1],
            ['الـ Design جاية بعد الـ Analyze على طول', 1],
            ['السلايد بتسميه الـ methodology بتاعة الـ 6 Sigma', 0],
            ['المراقبة فيه مبتبطّلش', 0],
            ['‡ لتصميم processes أو products جديدة', 1],
            ['‡ لتحسين processes موجودة', 0]
          ] : [
            ['Starts with Define', 2],
            ['Has an Improve phase', 0],
            ['Ends with Verify', 1],
            ['Design comes right after Analyze', 1],
            ['The slide calls it "the 6 Sigma methodology"', 0],
            ['Its monitoring never stops', 0],
            ['‡ For designing new processes or products', 1],
            ['‡ For improving existing processes', 0]
          ]} />
        `),

        // 26 · principles
        page(html`
          <${H1}>${t('The five principles', 'الـ principles الخمسة')}</${H1}>
          <${UL} items=${A ? [
            'التركيز على <b>العملاء</b>',
            'قرارات مبنية على <b>حقايق و data دقيقة</b>',
            'التركيز على <b>العمليات والأنشطة الداخلية</b>',
            'إدارة فعالة مبنية على <b>التخطيط المسبق</b>',
            'الـ <b>teamwork التعاوني</b> ونتجنب المنافسة، عشان نحقق الـ goals المطلوبة'
          ] : [
            'focus on <b>customers</b>',
            'making decisions based on <b>facts and accurate data</b>',
            'focusing on <b>internal operations and activities</b>',
            'effective management based on <b>advance planning</b>',
            '<b>collaborative teamwork</b> and avoiding competition, in order to achieve the desired goals'
          ]} />
          <${Talk} who="dev">${X('A little competition between teams? <b>No</b>: collaborative teamwork, avoiding competition.', 'شوية منافسة بين الـ teams؟ <b>لأ</b>: الـ teamwork تعاوني ونتجنب المنافسة.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Trap options: "competition between teams", "decisions based on intuition", "ignoring customers". All three are the <b>opposite</b> of a principle.', 'اختيارات فخ: "منافسة بين الـ teams"، و"قرارات بالإحساس"، و"تجاهل العملاء". التلاتة <b>عكس</b> الـ principles.')}</p></${Box}>
        `, { sec: t('Principles and phases', 'الـ Principles والمراحل') }),

        // 27 · implementation phases
        page(html`
          <${H2}>${t('Putting Six Sigma to work: six phases', 'تطبيق الـ Six Sigma: ست مراحل')}</${H2}>
          <ol className="hf-in" style=${{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '5px' }}>${(A ? [
            'نحدد ونختار <b>المشاريع المهمة</b> اللي هنطبق عليها الـ Six Sigma methodology',
            'نخصص موظفين الـ organization <b>اللي عندهم خبرة كويسة</b> لمهام التحسين',
            'نجهز <b>document مكتوب</b> عن المشكلة أو المشروع: كل حاجة تخصه، وأسباب اختياره، وأهدافه، والـ scope',
            'الـ <b>training</b> على متطلبات الـ Six Sigma: القياس، والتحليل، وإعادة تصميم الـ process، والتخطيط، وحل المشاكل',
            '<b>ننفذ الـ process</b>، ونقدم حلول عملية ونطبقها',
            '<b>نقدّم الحلول</b>'
          ] : [
            'identify and select the <b>important projects</b> in which the Six Sigma methodology will be applied',
            "assign the organization's employees <b>who have good experience</b> to improvement tasks",
            'prepare a <b>written document</b> for the problem or project: everything related to it, its reasons for being chosen, its objectives and its scope',
            '<b>training</b> on requirements related to Six Sigma: measurement, analysis, process redesign, planning, problem-solving',
            '<b>implement the process</b>, providing practical solutions and applying them',
            '<b>submission of solutions</b>'
          ]).map((x, j) => html`<li key=${j} className="hf-li" style=${{ display: 'grid', gridTemplateColumns: '26px 1fr', gap: '6px', margin: 0 }}><span className="hf-score" style=${{ fontSize: '24px', lineHeight: 1 }}>${j + 1}</span><span>${T(x)}</span></li>`)}</ol>
          <${Grow} />
          <${Hand} red=${true}>${t('first: select the projects. last: submit the solutions.', 'الأول: نختار المشاريع. والآخر: نقدّم الحلول.')}</${Hand}>
        `),

        // 28 · order exercise
        page(html`
          <${Box} kind="pencil" title=${t('Put them in order', 'رتّبهم')}><p className="hf-p small">${t('No peeking back. Tap the six phases from first to last; tap one again to undo from there.', 'من غير ما تبص ورا. دوس على الست مراحل من الأول للآخر؛ ولو دوست على واحدة تاني بتلغي من عندها.')}</p></${Box}>
          <${Order} />
        `),

        // 29 · the case study
        page(html`
          <${H1}>${t('A real case: failing the preparatory certificate', 'حالة حقيقية: الرسوب في الشهادة الإعدادية')}</${H1}>
          <${P} small=${true}>${X('The slide\'s table, <b>"Six Sigma for failure cases in the preparatory certificate"</b>, lists 10 subjects (X1 to X10) with each subject\'s mean, standard deviation and a "Six sigma" value. Its column headings are in Arabic: المواد، المتوسط الحسابي، الإنحراف المعياري.',
            'جدول السلايد اسمه:<span class="ltr"><b>"Six Sigma for failure cases in the preparatory certificate"</b></span>وفيه 10 مواد (<bdi dir="ltr">X1–X10</bdi>)، ولكل مادة المتوسط الحسابي والانحراف المعياري وقيمة "Six sigma". وعناوين الأعمدة على السلايد بالعربي.')}</${P}>
          <p className="hf-qa8-eq hf-in" dir="ltr">Six sigma = 6 × standard deviation</p>
          <${Code} lines=${[['X1:  6 × 1.22 = 7.32'], ['X2:  6 × 0.98 = 5.88'], ['Overall: 6 × 1.07 = 6.42', t('mean 2.99', 'الـ mean 2.99')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Multiply, don\'t add: 6 × 0.98 = 5.88, not 6.98. And it is <b>six</b> times σ, not three (2.94).', 'اضرب، متجمعش: <bdi dir="ltr">6 × 0.98 = 5.88</bdi> مش 6.98. وهي <b>ست</b> مرات الـ σ، مش تلاتة (2.94).')}</p></${Box}>
        `, { sec: t('The case study', 'الحالة العملية') }),

        // 30 · the case figure
        page(html`
          <${Fig} name="qa-sigma-case" />
        `),

        // 31 · DMAIC on the case + dumb questions
        page(html`
          <${H2}>${t('DMAIC on the failure cases', 'الـ DMAIC على حالات الرسوب')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Define</b>: نحدد الأسباب دي.',
            'الـ <b>Measure</b>: نقيس حجم تأثير الأسباب دي.',
            'الـ <b>Analyze</b>: المصادر والعناصر وغيرها.',
            'الـ <b>Improve</b>: نطلّع حلول مناسبة من الخطوات اللي قبلها، فتقل حالات الرسوب ويزيد مستوى النجاح.',
            'الـ <b>Control</b>: نراقب عمليات التحسين باستمرار.'
          ] : [
            '<b>Define</b>: identify these causes.',
            '<b>Measure</b>: measure the impact of the magnitude of these causes.',
            '<b>Analyze</b>: the sources and elements, etc.',
            '<b>Improve</b>: derive appropriate solutions through the previous steps, reducing failure cases and increasing the level of success.',
            '<b>Control</b>: continuously monitor the improvement processes.'
          ]} />
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['لو جمعت الـ 10 means وقسمت على 10 هيطلع 2.99؟', 'لأ، هيطلع 2.93. السلايد كاتبة إن الـ mean الإجمالي <b>2.99</b>، فاكتب 2.99 زي السلايد ومتحاولش تحسبه.'],
            ['أنهي مادة عندها أكبر Six sigma؟', 'هي الـ <b>X7</b>، لأن <bdi dir="ltr">6 × 1.27 = 7.62</bdi>. وأصغرها الـ <bdi dir="ltr">X9 (5.46)</bdi>.']
          ] : [
            ['Is 2.99 the average of the ten means?', 'No: their plain average is 2.93. The slide gives the overall mean as <b>2.99</b>, so quote 2.99 and don\'t try to recompute it.'],
            ['Which subject has the largest Six sigma value?', '<b>X7</b>: 6 × 1.27 = 7.62. The smallest is X9 (5.46).']
          ]} />
        `),

        // 32 · six sigma calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the case-study calculator', 'خليك إنت آلة الحالة العملية')}><p className="hf-p small">${X('Use the slide\'s rule, <b>Six sigma = 6 × SD</b>, and σ = √variance.', 'استخدم قاعدة السلايد، والـ σ من الـ variance:<span class="ltr"><b>Six sigma = 6 × SD</b>  ·  σ = √variance</span>')}</p></${Box}>
          <${Calc} id="six" probs=${[
            { en: 'A new subject <b>X11</b> is added with standard deviation <b>1.15</b>. Its Six sigma value?', ar: 'اتضافت مادة جديدة <b>X11</b> والانحراف المعياري بتاعها <b>1.15</b>. قيمة الـ Six sigma كام؟', ans: 6.9, show: '6.90', sol: ['6 × 1.15 = <b>6.90</b>'] },
            { en: 'A process has a <b>variance of 0.25</b>. Its Six sigma value?', ar: 'فيه process الـ <b>variance</b> بتاعها <b>0.25</b>. قيمة الـ Six sigma كام؟', ans: 3, show: '3', sol: ['σ = √0.25 = 0.5', '6 × 0.5 = <b>3</b>', '6 × 0.25 = 1.5 ✗'] },
            { en: 'A process has a <b>variance of 0.81</b>. Its Six sigma value?', ar: 'فيه process الـ <b>variance</b> بتاعها <b>0.81</b>. قيمة الـ Six sigma كام؟', ans: 5.4, show: '5.4', sol: ['σ = √0.81 = 0.9', '6 × 0.9 = <b>5.4</b>'] },
            { en: 'Backwards: a subject\'s Six sigma value is <b>6.24</b>. What is its standard deviation?', ar: 'بالعكس: مادة قيمة الـ Six sigma بتاعتها <b>6.24</b>. الانحراف المعياري بتاعها كام؟', ans: 1.04, show: '1.04', sol: ['SD = 6.24 ÷ 6 = <b>1.04</b>', 'X3 ✓'] }
          ]} />
        `),

        // 33 · belts
        page(html`
          <${H1}>${t('Earn your belt', 'خد الـ belt بتاعك')}</${H1}>
          <${P} small=${true}>${X('Six Sigma has <b>levels of certification</b>, named like karate belts. The slide\'s table says who each one is applied to:', 'الـ Six Sigma ليه <b>مستويات certification</b> متسمّية زي أحزمة الكاراتيه. وجدول السلايد بيقول كل واحد بيتطبق على مين:')}</${P}>
          <table className="hf-qa8-tbl hf-in"><thead><tr><th>${t('Belt', 'الـ Belt')}</th><th>${t('Applied to', 'بيتطبق على')}</th></tr></thead><tbody>
            ${(A ? [['White Belt', 'الدرجة الأولى في الشكل (أول مستوى)'], ['Yellow Belt', 'كل الموظفين'], ['Green Belt', 'الـ executive employees'], ['Black Belt', 'الـ middle والـ senior management'], ['Master Black Belt', 'الـ senior management']]
              : [['White Belt', 'step 1 in the figure (entry level)'], ['Yellow Belt', 'all employees'], ['Green Belt', 'executive employees'], ['Black Belt', 'middle and senior management'], ['Master Black Belt', 'senior management']]).map((r, j) => html`<tr key=${j}><td style=${{ fontWeight: 700 }}><bdi dir="ltr">${r[0]}</bdi></td><td>${r[1]}</td></tr>`)}
          </tbody></table>
          <${P} small=${true}>${X('The figure, <b>Levels of Six Sigma Certification</b>, is a man with a briefcase climbing five steps toward a target: White, Yellow, Green, Black, and Master Black at the top, next to the target.',
            'الشكل اسمه <b>Levels of Six Sigma Certification</b>: راجل شايل شنطة طالع على سلم من خمس درجات ناحية الـ target، والدرجات هي الـ White وبعدها الـ Yellow والـ Green والـ Black، والـ Master Black فوق خالص جنب الـ target.')}</${P}>
          <${Hand} tilt=${true}>${t('Ours: the higher the belt, the higher up the company it goes.', 'من عندنا: كل ما الـ belt يعلى، كل ما يطلع لناس أعلى في الشركة.')}</${Hand}>
        `, { sec: t('The belts', 'الـ Belts') }),

        // 34 · the belts figure
        page(html`
          <${H2}>${t('Climb the staircase', 'اطلع السلم')}</${H2}>
          <${Fig} name="qa-belts" />
        `),

        // 35 · match the belts
        page(html`
          <${H2}>${t('Who wears which belt?', 'مين لابس أنهي belt؟')}</${H2}>
          <${P} small=${true}>${t('Tap a belt, then who it is for.', 'دوس على الـ belt، وبعدين دوس على اللي بيتطبق عليه.')}</${P}>
          <${Match} id="belts" left=${['White Belt', 'Yellow Belt', 'Green Belt', 'Black Belt', 'Master Black Belt']}
            right=${A ? ['الـ executive employees', 'الـ senior management', 'الدرجة الأولى (أول مستوى)', 'الـ middle والـ senior management', 'كل الموظفين']
              : ['Executive employees', 'Senior management', 'Step 1: the entry level', 'Middle and senior management', 'All employees']}
            answer=${[2, 4, 0, 3, 1]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Green</b>: executive employees. <b>Black</b>, one step up: middle <i>and</i> senior management. <b>Master Black</b>: senior management. Yellow: <b>all</b> employees.',
            'الـ <b>Green</b> للـ executive employees. والـ <b>Black</b> (درجة فوقه) للـ middle <i>و</i> senior management. والـ <b>Master Black</b> للـ senior management. والـ Yellow لـ <b>كل</b> الموظفين.')}</p></${Box}>
        `),

        // 36 · tools and techniques
        page(html`
          <${H1}>${t('The toolbox', 'شنطة العِدّة')}</${H1}>
          <${P} small=${true}>${X('The lecture lists the <b>Six Sigma tools and techniques</b> by name. Know the list:', 'المحاضرة بتعدّ <b>الـ Six Sigma tools and techniques</b> بالاسم بس. احفظ اللستة:')}</${P}>
          <div className="hf-qa8-chips hf-in" dir="ltr">${['5S', 'Seven Wastes', 'Value stream mapping', 'Visual workspace', 'Voice of Customer (VOC)', 'Kaizen', 'Kanban', 'Regression analysis'].map(x => html`<span key=${x}>${x}</span>`)}</div>
          <${Box} kind="watch"><p className="hf-p small">${X('"Which is NOT a Six Sigma tool?" The odd one out comes from another lecture, e.g. <b>cyclomatic complexity</b> (a software metric) or contract review.',
            'في سؤال "أنهي واحدة مش Six Sigma tool؟" الغريب بييجي من محاضرة تانية، زي <b>cyclomatic complexity</b> (ده software metric) أو contract review.')}</p></${Box}>
          <${Box} kind="relax"><p className="hf-p small">${X('The midterm says <b>Lean Six Sigma</b>. The lecture doesn\'t define it; the notes treat it as Six Sigma plus Lean\'s waste-cutting, for <b>repeatable processes</b>.',
            'الميدترم بيقول <b>Lean Six Sigma</b>. المحاضرة مبتعرّفوش؛ والنوتس بتعامله على إنه Six Sigma زائد تقليل الهدر بتاع الـ Lean، للـ <b>processes اللي بتتكرر</b>.')}</p></${Box}>
        `, { sec: t('Tools and techniques', 'الـ Tools والـ techniques') }),

        // 37–42 · exam corner: the doctors' questions
        page(html`
          <${Box} kind="exam" title=${exam}><p className="hf-p small">${t("Real questions from the doctors' exam and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحان الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-zero', /reduce process variation to reach zero default/i)}
          <${Grow} />
          <${Talk} who="bug">${t('CMM, SPICE, ISO 9000… none promised to squeeze me to zero.', 'الـ CMM والـ SPICE والـ ISO 9000… ولا واحد فيهم وعد إنه يعصرني لحد الصفر.')}</${Talk}>
        `, { sec: exam }),
        page(html`
          ${mq('m-acc', /percentage accuracy in the six sigma/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('3.4 per million → 0.00034% defective → 99.99966% right', '3.4 في المليون يعني 0.00034% معيب، يعني 99.99966% سليم')}</${Hand}>
        `),
        page(html`
          ${mq('m-ctl', /monitored for long-term stability/i)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Improve puts the fix in. Control keeps it in.', 'الـ Improve بيركّب الحل. والـ Control بيحافظ عليه.')}</${Talk}>
        `),
        page(html`
          ${mq('m-base', /baseline of the problem/i)}
          <${Grow} />
          <${Hand}>${t('baseline = today\'s numbers, before any change = Measure', 'الـ baseline يعني أرقام النهارده قبل أي تغيير، وده الـ Measure')}</${Hand}>
        `),
        page(html`
          ${mq('m-lean', /Lean Six Sigma process not applicable/i)}
        `),
        page(html`
          ${mq('m-adv', /not an advantage of using Lean Six Sigma/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Customer satisfaction is the first thing it focuses on. A decrease can\'t be an advantage.', 'رضا العميل أول حاجة بيركز عليها. يبقى النقص فيه مستحيل يبقى ميزة.')}</${Talk}>
        `),

        // 43 · practice questions (the site's, not the doctors')
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own, not the doctors'.", 'من الموقع، مش من الدكاترة.')}</p></${Box}>
          ${pq('p-new', /design a completely NEW product process/i)}
          ${pq('p-sq', /standard deviation \(σ\) is the square of the variance/i)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),

        // 44 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Six Sigma</b>: مفهوم إدارة في الـ TQM من أواخر السبعينات، مركّز على رضا العميل.',
            'بيقلل الـ process variation لحد <b>3.4 defects في المليون</b> أو أقل؛ والهدف zero defects.',
            'الـ <bdi dir="ltr">σ = √variance</bdi>. والـ <bdi dir="ltr">±3σ</bdi> فيها 99.73% (2,700 ppm برّه)؛ والـ <bdi dir="ltr">±6σ</bdi> بتسيب 0.002 ppm.',
            'خطوات الـ <b>DMAIC</b> هي الـ Define (المشكلة والـ team)، والـ Measure (الـ baseline)، والـ Analyze (الـ root causes)، والـ Improve (تجربة على sample)، والـ Control (مبيبطّلش).',
            'خطوات الـ <b>DMADV</b> هي الـ Define والـ Measure والـ Analyze والـ Design والـ Verify (‡ للحاجات الجديدة).',
            'الحالة العملية:<span class="ltr">Six sigma = 6 × SD (X1 = 7.32, overall = 6.42)</span>',
            'ترتيب الـ belts هو الـ White، والـ Yellow (للكل)، والـ Green (للـ executive)، والـ Black (للـ middle والـ senior)، والـ Master Black (للـ senior).'
          ] : [
            '<b>Six Sigma</b>: a TQM management concept from the late 1970s–early 1980s; a statistical management system focused on customer satisfaction.',
            'It reduces process variation to <b>3.4 defects per million</b> or less; the aim is zero defects.',
            'σ = √variance. ±3σ holds 99.73% (2,700 ppm out); ±6σ leaves 0.002 ppm.',
            '<b>DMAIC</b>: Define (level, location, financial impact; team), Measure (baseline), Analyze (root causes), Improve (test on a sample), Control (never stops).',
            '<b>DMADV</b>: Define, Measure, Analyze, Design, Verify (‡ for new designs).',
            'Case study: Six sigma = 6 × SD (X1 = 7.32, overall = 6.42).',
            'Belts: White → Yellow (all) → Green (executive) → Black (middle and senior) → Master Black (senior).'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 45 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 8!', 'خلّصت الفصل التامن!')}</${H1}>
            <${Talk} who="bug">${t('3.4 per million. I will be back, but only 3.4 of me.', '3.4 في المليون. هرجع، بس 3.4 مني بس.')}</${Talk}>
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

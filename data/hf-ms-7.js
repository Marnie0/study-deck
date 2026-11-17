// Head First chapter for Modeling & Simulation Lecture 7 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Verification and validation of simulation models: why they matter and the two goals of validation, verification (building the
// model right) vs validation (building the right model), the 3 steps of model building and Fig 7.1, the 8 verification
// considerations and the IRC, current contents and total count, the three verification techniques (common sense,
// documentation, trace), Example 7.1 (the trace, its error and L̂Q), calibration (Fig 7.2, subjective and objective tests, its
// criticism and cost), Naylor and Finger's three steps, face validity, structural and data assumptions (the bank), validating
// input-output transformations (existing and proposed systems), historical input data, the Turing test, and the link to L1.
// Every fact comes from the lecture's notes; analogies, jokes and memory tricks are marked as ours. L7 has none of the doctors'
// questions, so the quiz pages use the site's practice questions, titled as such.
// Numbers checked by hand twice and with node: interval lengths 3, 2, 6, 1, 4 (sum 16); printed queue lengths 0, 1, 0, 1, 1 →
// Σ = 7 → L̂Q = 7/16 = 0.4375; ‡ with STATUS corrected 0, 0, 0, 0, 1 → 4/16 = 0.25; number in system Σ = 11 → 11/16 = 0.6875;
// Turing test 5 + 5 = 10 reports.
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T7 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-ms7')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms7';
    s.textContent = `
.hfb .hf-ms7-pair{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:0; align-items:center; text-align:center; }
.hfb .hf-ms7-pair .hf-ms7-nd{ border:2px solid var(--hf-line); border-radius:9px; padding:7px 4px; font:800 13.5px/1.15 var(--body); color:var(--ink); background:var(--paper); margin:0 5px; }
.hfb .hf-ms7-pair .hf-ms7-nd.rs{ border-radius:50%/40%; background:color-mix(in srgb, var(--hf-k) 18%, var(--paper)); }
.hfb .hf-ms7-pair .hf-ms7-nd.pg{ font-family:var(--mono); font-size:13px; background:var(--hf-grey); }
.hfb .hf-ms7-br{ grid-row:2; position:relative; height:44px; margin-top:4px; }
.hfb .hf-ms7-br::before{ content:""; position:absolute; left:18%; right:18%; top:0; height:10px; border:2px solid var(--hf-line); border-top:0; border-radius:0 0 8px 8px; }
.hfb .hf-ms7-br span{ position:absolute; left:0; right:0; top:14px; font:700 13px/1.15 var(--body); color:var(--ink); }
.hfb .hf-ms7-br.va::before{ border-color:var(--hf-k); } .hfb .hf-ms7-br.va span{ color:var(--hf-k); }
.hfb .hf-ms7-br.ve::before{ border-color:var(--hf-red); } .hfb .hf-ms7-br.ve span{ color:var(--hf-red); }
.hfb .hf-ms7-br.go::before{ animation:hf-ms7-pulse 3.2s ease-in-out infinite; }
.hfb .hf-ms7-br.ve.go::before{ animation-delay:1.6s; }
@keyframes hf-ms7-pulse{ 0%,60%,100%{ opacity:1; } 30%{ opacity:.25; } }
.hfb .hf-ms7-tr{ display:grid; gap:3px; }
.hfb .hf-ms7-tr .hf-ms7-h, .hfb .hf-ms7-tr button{ display:grid; grid-template-columns:50px minmax(0,1fr) 54px 60px 22px; align-items:center; text-align:center; font:600 13.5px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-ms7-tr .hf-ms7-h{ font:800 13px/1.1 var(--body); color:var(--graphite); padding:0 2px 2px; border-bottom:2px solid var(--hf-line); }
.hfb .hf-ms7-tr button{ min-height:33px; padding:0 2px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); cursor:pointer; }
.hfb .hf-ms7-tr button[aria-pressed="true"]{ border-color:var(--hf-hand); box-shadow:0 0 0 2px var(--hf-hand); }
.hfb .hf-ms7-tr button.ok{ border-color:var(--ok); box-shadow:0 0 0 2px var(--ok); background:color-mix(in srgb, var(--ok) 10%, var(--paper)); }
.hfb .hf-ms7-tr button.no{ border-color:var(--hf-red); box-shadow:0 0 0 2px var(--hf-red); }
.hfb .hf-ms7-tr button.miss{ border-color:var(--hf-red); border-style:dashed; }
.hfb .hf-ms7-tr .hf-ms7-mk{ font:800 15px/1 var(--body); }
.hfb .hf-ms7-tr button.ok .hf-ms7-mk{ color:var(--ok); } .hfb .hf-ms7-tr button.no .hf-ms7-mk, .hfb .hf-ms7-tr button.miss .hf-ms7-mk{ color:var(--hf-red); }
.hfb .hf-ms7-fb{ font-size:13.5px; line-height:1.34; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--hf-k); background:var(--hf-grey); }
.hfb .hf-ms7-fb.bad{ border-left-color:var(--hf-red); }
.hfb .hf-ms7-modes{ display:flex; gap:5px; }
.hfb .hf-ms7-modes button{ flex:1 1 0; min-width:0; min-height:32px; padding:0 4px; font:700 13px/1.1 var(--body); border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms7-modes button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-ms7-cols{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:5px; }
.hfb .hf-ms7-col{ display:grid; gap:3px; text-align:center; }
.hfb .hf-ms7-col .hf-ms7-iv{ font:700 13px/1.15 var(--mono); color:var(--ink); }
.hfb .hf-ms7-col .hf-ms7-ln{ font:600 13px/1.1 var(--body); color:var(--graphite); }
.hfb .hf-ms7-col button{ min-height:28px; padding:0; font:800 13.5px/1 var(--mono); border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms7-col button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-ms7-col.ok button[aria-pressed="true"]{ background:var(--ok); border-color:var(--ok); }
.hfb .hf-ms7-col.no button[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-ms7-lane{ margin:0 8px; position:relative; display:flex; height:46px; border-left:2px solid var(--hf-line); border-bottom:2px solid var(--hf-line); }
.hfb .hf-ms7-lane > div{ position:relative; height:100%; border-right:1px dashed var(--faint); }
.hfb .hf-ms7-lane i{ position:absolute; left:0; right:0; bottom:0; background:color-mix(in srgb, var(--hf-k) 55%, var(--paper)); transition:height .4s; }
.hfb .hf-ms7-ax{ margin:0 8px; position:relative; height:16px; font:600 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-ms7-ax span{ position:absolute; top:2px; transform:translateX(-50%); }
.hfb .hf-ms7-sum{ font:600 13.5px/1.45 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 8px; }
.hfb .hf-ms7-sum b{ color:var(--hf-k); }
.hfb .hf-ms7-key{ display:flex; flex-wrap:wrap; gap:2px 10px; font:600 13px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-ms7-key b{ color:var(--ink); font-weight:800; }
.hfb .hf-ms7-nl{ display:grid; gap:5px; }
.hfb .hf-ms7-nl .hf-ms7-r{ display:grid; grid-template-columns:24px minmax(0,1fr); gap:8px; align-items:start; }
.hfb .hf-ms7-nl .hf-ms7-n{ width:24px; height:24px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); background:var(--hf-line); color:var(--paper); }
.hfb .hf-ms7-nl .hf-ms7-d{ font-size:14px; line-height:1.33; color:var(--ink); }
.hfb .hf-ms7-nl .hf-ms7-d b{ font-weight:700; }
.hfb .hf-ms7-two{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; }
.hfb .hf-ms7-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); font-size:13.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-ms7-card > b:first-child{ display:block; font:800 14px/1.2 var(--body); color:var(--hf-k); margin-bottom:3px; }
.hfb .hf-ms7-card.red > b:first-child{ color:var(--hf-red); }
.hf-ar .hf-ms7-fb, .hf-ar .hf-ms7-nl .hf-ms7-d, .hf-ar .hf-ms7-card, .hf-ar .hf-ms7-modes button, .hf-ar .hf-ms7-key, .hf-ar .hf-ms7-br span, .hf-ar .hf-ms7-tr .hf-ms7-h, .hf-ar .hf-ms7-col .hf-ms7-ln{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ms7-fb, .hf-ar .hf-ms7-nl .hf-ms7-d, .hf-ar .hf-ms7-card{ line-height:1.5; font-size:13.5px; }
.hf-ar .hf-ms7-fb{ border-left:0; border-right:3px solid var(--hf-k); }
.hf-ar .hf-ms7-fb.bad{ border-right-color:var(--hf-red); }
.hf-ar .hf-ms7-sum{ direction:ltr; text-align:left; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-ms7-br.go::before{ animation:none; } .hfb .hf-ms7-lane i{ transition:none; } }
`;
    document.head.appendChild(s);
  }

  // Example 7.1's trace (Table 7.1, p. 124), the same rows as the site's figure: [CLOCK, EVTYP, NCUST, STATUS]
  const TR = [[0, 'Start', 0, 0], [3, 'Arrival', 1, 0], [5, 'Departure', 0, 0], [11, 'Arrival', 1, 0], [12, 'Arrival', 2, 1], [16, 'Departure', 1, 1]];
  const SEGS = TR.slice(0, -1).map((r, k) => ({ a: r[0], b: TR[k + 1][0], len: TR[k + 1][0] - r[0], qp: r[2] - r[3], qc: r[2] - (r[2] >= 1 ? 1 : 0) }));
  const fmt = x => String(+x.toFixed(4));

  // verification and validation side by side: what each one compares (the notes' definitions)
  function VVPair() {
    const ar = useAr(), go = !calm();
    return html`<div className="hf-ms7-pair hf-in" dir="ltr" role="img" aria-label="Validation compares the real system and the model; verification compares the conceptual model and the program">
      <div className="hf-ms7-nd rs">Real system</div><div className="hf-ms7-nd">Conceptual model</div><div className="hf-ms7-nd pg">Program</div>
      <div className=${'hf-ms7-br va' + (go ? ' go' : '')} style=${{ gridColumn: '1 / span 2' }}><span dir=${ar ? 'rtl' : 'ltr'}>${ar ? html`الـ validation<br/>الموديل الصح؟` : html`validation<br/>the right model?`}</span></div>
      <div className=${'hf-ms7-br ve' + (go ? ' go' : '')} style=${{ gridColumn: '2 / span 2', gridRow: 3 }}><span dir=${ar ? 'rtl' : 'ltr'}>${ar ? html`الـ verification<br/>الموديل متبني صح؟` : html`verification<br/>the model built right?`}</span></div>
    </div>`;
  }

  // a numbered list drawn by hand (no ::marker, so it also reads right in the mirrored Arabic book)
  function NumList({ items }) {
    return html`<div className="hf-ms7-nl hf-in">${items.map((s, i) => html`<div key=${i} className="hf-ms7-r">
      <span className="hf-ms7-n">${i + 1}</span><span className="hf-ms7-d">${T7(s)}</span></div>`)}</div>`;
  }

  // Be the verifier: tap every trace row whose logic is wrong (a customer in the system while the server is idle)
  function TraceHunt({ id }) {
    const ar = useAr();
    const [fl, setFl] = H.K.useSlot(id, []);
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const bad = TR.map((r, k) => r[2] >= 1 && r[3] === 0 ? k : -1).filter(k => k >= 0);
    const on = new Set(fl);
    const wrong = fl.filter(k => !bad.includes(k)), missed = bad.filter(k => !on.has(k));
    const all = chk && !wrong.length && !missed.length;
    const toggle = k => { setChk(false); setFl(on.has(k) ? fl.filter(x => x !== k) : fl.concat(k)); };
    let msg = null;
    if (chk) {
      if (all) msg = ar ? 'تمام! فيه customer والـ server فاضي في الصفين:<span class="ltr">CLOCK = 3, CLOCK = 11</span>‡ النوتس بتشاور على الأول بس، والتاني فيه نفس الغلطة.'
        : 'Right! At CLOCK = 3 and CLOCK = 11 a customer is in the system while the server is idle. ‡ The notes only point out CLOCK = 3, but CLOCK = 11 has the same error.';
      else if (wrong.length) msg = ar ? 'فيه صف علّمت عليه وهو سليم: لو مفيش customer، الـ server الفاضي طبيعي؛ ولو فيه customer والـ server بـ 1، ده طبيعي برضه.'
        : 'A row you flagged is fine: an idle server with nobody in the system is normal, and so is a busy server with customers.';
      else msg = ar ? 'لسه فيه صف غلطان ماعلمتش عليه. دوّر على الشرط ده:<span class="ltr">NCUST ≥ 1, STATUS = 0</span>' : 'There is still a bad row you missed. Look for NCUST ≥ 1 with STATUS = 0.';
    }
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-ms7-tr" dir="ltr">
        <div className="hf-ms7-h"><span>CLOCK</span><span>EVTYP</span><span>NCUST</span><span>STATUS</span><span></span></div>
        ${TR.map((r, k) => { const st = chk ? (on.has(k) ? (bad.includes(k) ? ' ok' : ' no') : bad.includes(k) ? ' miss' : '') : '';
          return html`<button key=${k} className=${st.trim()} aria-pressed=${String(on.has(k))} aria-label=${'CLOCK ' + r[0] + ', ' + r[1] + ', NCUST ' + r[2] + ', STATUS ' + r[3]} onClick=${() => toggle(k)}>
            <span>${r[0]}</span><span>${r[1]}</span><span>${r[2]}</span><span>${r[3]}</span><span className="hf-ms7-mk">${st === ' ok' ? '✓' : st === ' no' ? '✗' : st === ' miss' ? '!' : on.has(k) ? '⚑' : ''}</span></button>`; })}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!fl.length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setFl(bad.slice()); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${chk && html`<button className="hf-btn" onClick=${() => { setFl([]); setChk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div>
      ${msg && html`<p dir=${ar ? 'rtl' : 'ltr'} className=${'hf-ms7-fb' + (all ? '' : ' bad')}>${T7(msg)}</p>`}
    </div>`;
  }

  // Be the program: pick the queue length (NCUST − STATUS) on each interval, watch the area build up, and get L̂Q
  function LqBuild({ id }) {
    const ar = useAr();
    const [m, setM] = H.K.useSlot(id + ':m', 0);
    const [pk, setPk] = H.K.useSlot(id + ':' + m, {});
    const [chk, setChk] = H.K.useSlot(id + ':c' + m, false);
    const ans = SEGS.map(g => m ? g.qc : g.qp);
    const full = SEGS.every((_, k) => pk[k] != null);
    const sum = SEGS.reduce((s, g, k) => s + (pk[k] != null ? pk[k] * g.len : 0), 0);
    const right = SEGS.filter((_, k) => pk[k] === ans[k]).length;
    const terms = SEGS.map((g, k) => pk[k] != null ? pk[k] + '×' + g.len : '?×' + g.len).join(' + ');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-ms7-modes">
        <button aria-pressed=${String(m === 0)} onClick=${() => setM(0)}>${ar ? 'الـ trace زي ما اتطبع' : 'Trace as printed'}</button>
        <button aria-pressed=${String(m === 1)} onClick=${() => setM(1)}>${ar ? '‡ الـ STATUS متصلّح' : '‡ STATUS corrected'}</button>
      </div>
      <div className="hf-ms7-cols" dir="ltr">${SEGS.map((g, k) => html`<div key=${k} className=${'hf-ms7-col' + (chk && pk[k] != null ? (pk[k] === ans[k] ? ' ok' : ' no') : '')}>
        <span className="hf-ms7-iv">${g.a}–${g.b}</span><span className="hf-ms7-ln">${ar ? html`<bdi dir="ltr">Δt = ${g.len}</bdi>` : 'Δt = ' + g.len}</span>
        ${[2, 1, 0].map(v => html`<button key=${v} aria-pressed=${String(pk[k] === v)} aria-label=${'Interval ' + g.a + ' to ' + g.b + ': queue ' + v} onClick=${() => { setPk(Object.assign({}, pk, { [k]: v })); setChk(false); }}>${v}</button>`)}
      </div>`)}</div>
      <div dir="ltr">
        <div className="hf-ms7-lane" role="img" aria-label="Queue length against time, from your answers">${SEGS.map((g, k) => html`<div key=${k} style=${{ width: (g.len / 16 * 100) + '%' }}><i style=${{ height: ((pk[k] || 0) * 50) + '%' }}></i></div>`)}</div>
        <div className="hf-ms7-ax">${TR.map((r, k) => html`<span key=${k} style=${{ left: (r[0] / 16 * 100) + '%' }}>${r[0]}</span>`)}</div>
      </div>
      <div className="hf-ms7-sum" dir="ltr">Σ i·TᵢQ = ${terms} = <b>${sum}</b>${full ? html`<br/>L̂Q = ${sum}/16 = <b>${fmt(sum / 16)}</b>` : ''}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pk).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; ans.forEach((v, k) => { p[k] = v; }); setPk(p); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${chk && html`<span className="hf-score">${ar ? html`<bdi>${right} / 5</bdi> صح${right === 5 ? '!' : ''}` : right + ' / 5 right' + (right === 5 ? '!' : '')}</span>`}
      </div>
    </div>`;
  }

  H.chapters.ms[7] = {
    title: 'Verification and Validation of Simulation Models', kicker: 'Chapter 7', run: 'verification and validation',
    ar: { title: 'الـ Verification والـ Validation للـ Simulation Models', kicker: 'الفصل 7', run: 'الـ verification والـ validation' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 7);
      const arL = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[7]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // L7 has none of the doctors' questions: these are the site's practice questions (quiz and extra items without src),
      // with the site's Arabic "why" for each choice, always shown under a "Practice questions" title
      const pfind = re => {
        let i = lec.quiz.findIndex(x => !x.src && re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: (arL.quiz || [])[i] };
        i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: (arL.extra || [])[i] };
      };
      const pq = (id, re) => { const r = pfind(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const PQ = () => html`<${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions (not from the doctors' papers). Tap an answer to see why.", 'أسئلة تدريب من الموقع (مش من امتحانات الدكاترة). دوس على إجابة عشان تعرف ليه.')}</p></${Box}>`;
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · how to use this chapter, and a warm-up (faces the opener)
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You flag a buggy trace, compute L̂Q and sort the checks, right on the page.', '<b>حل التمارين.</b> هتمسك غلطة في trace، وتحسب الـ L̂Q، وتفرز الـ checks، على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف وفكّر.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are the easy-to-mix-up points of this lecture.', '<b>خلّي بالك!</b> دي الحاجات اللي سهل تتلخبط فيها في المحاضرة دي.')}</span></div>
            <div className="row"><span>${K.ICON.exam}</span><span>${X("<b>Practice questions</b> are the site's own: this lecture has none from the doctors' papers.", '<b>أسئلة التدريب</b> من الموقع نفسه، لأن المحاضرة دي مفيهاش أسئلة من امتحانات الدكاترة.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks something the notes missed, and what we found.', 'معناها حاجة النوتس فوّتتها، وبنقولك لقينا إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('In Lecture 6 you fitted distributions to data and tested the fit. Now the whole model is built and runs without crashing. Does that mean it is <b>right</b>? Right about <b>what</b>?',
            'في المحاضرة 6 عملت fit للـ distributions على الـ data واختبرت الـ fit. دلوقتي الموديل كله اتبنى وبيشتغل من غير ما يقع. هل ده معناه إنه <b>صح</b>؟ صح بالنسبة لـ <b>إيه</b>؟')}</p></${Box}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">7</span><span className="t">${A ? html`الفصل السابع<br/>Modeling & Simulation` : html`Chapter seven<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Is Your Model Telling the Truth?', 'الموديل بتاعك بيقول الحقيقة؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('verification and validation of simulation models', 'الـ verification والـ validation للـ simulation models')}</p></div>
          <${Talk} who="dev">${X('My bank model runs, prints a nice average waiting time, and never crashes. Done!', 'موديل البنك بتاعي شغال، وبيطبع average waiting time حلو، وعمره ما وقع. خلصنا!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Not so fast. Does the program do what <b>your model</b> says? And does your model behave like the <b>real bank</b>?', 'استنى بس. البرنامج بيعمل اللي <b>الموديل بتاعك</b> بيقوله؟ والموديل نفسه بيتصرف زي <b>البنك الحقيقي</b>؟')}</${Talk}>
          <${P} small=${true}>${X("Those are two different questions, with two different names: <b>verification</b> and <b>validation</b>. The notes call this <b>one of the most important and difficult tasks</b> of the model developer. This chapter shows you how it's done.",
            'دول سؤالين مختلفين، وليهم اسمين مختلفين: الـ <b>verification</b> والـ <b>validation</b>. والنوتس بتقول إن دي <b>من أهم وأصعب المهام</b> اللي على الـ model developer. الفصل ده هيوريك بتتعمل إزاي.')}</${P}>
        `, { sec: t('Meet V&V', 'اتعرّف على الـ V&V') }),

        // 2 · why it matters, two goals of validation
        page(html`
          <${H1}>${t('Why bother?', 'ليه نتعب نفسنا؟')}</${H1}>
          <${P} small=${true}>${X('Verification and validation are <b>one of the most important and difficult tasks</b> of the developer, who should work closely with the <b>end users</b> throughout development to increase the model\'s <b>credibility</b> (p. 121).',
            'الـ verification والـ validation <b>من أهم وأصعب المهام</b> اللي على الـ developer، ولازم يشتغل قريب من الـ <b>end users</b> طول التطوير علشان يزوّد الـ <b>credibility</b> بتاعة الموديل (صفحة 121).')}</${P}>
          <${Def}>${X('<b>Validation is an integral part of model development.</b> Its goal is a <b>two-fold</b> process:', '<b>الـ validation جزء أساسي (integral part) من تطوير الموديل.</b> وهدفها عملية من <b>شقين (two-fold)</b>:')}</${Def}>
          <${NumList} items=${A ? [
            'نطلع موديل بيمثل <b>السلوك الحقيقي للسيستم (true system behavior)</b>، علشان نستخدمه <b>بديل للسيستم الحقيقي</b> ونعمل عليه تجارب.',
            'نزوّد الـ <b>acceptance والـ credibility</b> بتوع الموديل، علشان <b>المديرين وصناع القرار</b> يستخدموه فعلًا.'
          ] : [
            'Produce a model that represents <b>true system behavior</b>, so it can be used as a <b>substitute for the actual system</b> for experimenting.',
            'Increase the model\'s <b>acceptance and credibility</b>, so that <b>managers and other decision makers</b> will use it.'
          ]} />
          <${Grow} />
          <${Hand}>${t("Ours: goal 1 is about truth, goal 2 about trust.", 'من عندنا: الهدف الأول عن الحقيقة، والتاني عن الثقة.')}</${Hand}>
        `, { sec: t('Why V&V matter', 'ليه الـ V&V مهمين') }),

        // 3 · verification vs validation
        page(html`
          <${H1}>${t('Two questions, two names', 'سؤالين، واسمين')}</${H1}>
          <${VVPair} />
          <div className="hf-ms7-two hf-in">
            <div className="hf-ms7-card red"><b>Verification</b>${X('<b>Building the model right</b>: compares the <b>conceptual model</b> to the <b>computer representation</b>.', 'يعني <b>building the model right</b> (بنبني الموديل صح): بتقارن الـ <b>conceptual model</b> بالـ <b>computer representation</b>.')}</div>
            <div className="hf-ms7-card"><b>Validation</b>${X('<b>Building the right model</b>: determines that the model is an <b>accurate representation of the real system</b>.', 'يعني <b>building the right model</b> (بنبني الموديل الصح): بتتأكد إن الموديل <b>تمثيل دقيق للسيستم الحقيقي</b>.')}</div>
          </div>
          <${P} small=${true}>${X('Validation is achieved through <b>calibration</b>: an <b>iterative</b> process of comparing the model to actual system behavior, repeated until model accuracy is judged acceptable.',
            'والـ validation بتتحقق عن طريق الـ <b>calibration</b>: عملية <b>iterative</b> بنقارن فيها الموديل بسلوك السيستم الحقيقي، ونعيدها لحد ما الدقة تبقى مقبولة.')}</${P}>
          <${Hand} red=${true}>${A ? html`حيلة من عندنا: الـ v<b>A</b>lidation فيها <bdi dir="ltr">A</bdi> زي <bdi dir="ltr">Actual system</bdi>` : html`Trick (ours): v<b>A</b>lidation has the <b>A</b> of the <b>A</b>ctual system`}</${Hand}>
        `, { sec: t('Verification vs validation', 'الـ verification والـ validation') }),

        // 4–5 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Verification and Validation argue about who matters more.", 'قعدة الليلة: الـ Verification والـ Validation بيتخانقوا مين فيهم أهم.')} />
          <${Chat} names=${[t('Verification', 'الـ Verification'), t('Validation', 'الـ Validation')]} lines=${A ? [
            [0, 'أنا اللي بتأكد إن الـ <b>conceptual model</b> متمثل بدقة في البرنامج. أنا <b><bdi dir="ltr">building the model right</bdi></b>.'],
            [1, 'وأنا بقارن الموديل بالـ <b>real system</b> نفسه. أنا <b><bdi dir="ltr">building the right model</bdi></b>.'],
            [0, 'عندي أدوات: حد غير اللي كتب الكود يراجعه، و<b>flow diagram</b>، وطباعة الـ input parameters في الآخر، والـ <b>trace</b>.'],
            [1, 'وأنا عندي الـ <b>calibration</b>: أقارن، أعدّل، أقارن تاني. وعندي الـ <b>face validity</b> والـ <b><bdi dir="ltr">Turing test</bdi></b>.'],
            [0, 'وعلى فكرة إحنا الاتنين بنتعمل <b>في نفس الوقت</b> عادةً.']
          ] : [
            [0, "I make sure the <b>conceptual model</b> is accurately reflected in the program. I'm <b>building the model right</b>."],
            [1, "I compare the model with the <b>real system</b> itself. I'm <b>building the right model</b>."],
            [0, 'I have tools: someone other than the developer checks the code, a <b>flow diagram</b>, printing the input parameters at the end, a <b>trace</b>.'],
            [1, 'I have <b>calibration</b>: compare, adjust, compare again. And <b>face validity</b>, and the <b>Turing test</b>.'],
            [0, 'We are usually done <b>at the same time</b>, you know.']
          ]} />
        `, { sec: t('Fireside Chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('Verification', 'الـ Verification'), t('Validation', 'الـ Validation')]} start=${1} lines=${A ? [
            [1, 'صح، بس أنا العملية <b>الشاملة</b> اللي بتقارن الموديل وسلوكه بالسيستم الحقيقي.'],
            [0, 'في الـ 12 خطوة بتوع المحاضرة 1، أنا الخطوة 6: <b><bdi dir="ltr">Verified?</bdi></b>'],
            [1, 'وأنا الخطوة 7: <b><bdi dir="ltr">Validated?</bdi></b> و<b>أهم خطوة</b>: الموديل الـ invalid بيوصّل لقرارات <b>خطيرة وغالية</b>.'],
            [0, 'ولو مننفعش إحنا الاتنين، الـ simulation نفسها <b>مش مناسبة</b>.'],
            [1, 'المرة دي متفقين.']
          ] : [
            [1, "True, but I'm the <b>overall</b> process of comparing the model and its behavior to the real system."],
            [0, "In Lecture 1's 12 steps, I'm step 6: <b>Verified?</b>"],
            [1, "And I'm step 7: <b>Validated?</b> The <b>most crucial step</b>: an invalid model leads to <b>dangerous and expensive</b> decisions."],
            [0, "And if neither of us can be done, simulation is <b>not appropriate</b> at all."],
            [1, 'For once, we agree.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Don\'t swap the two phrases. <b>Verification</b> = building the model <b>right</b> (program vs conceptual model). <b>Validation</b> = building the <b>right model</b> (model vs real system). A comparison with the <b>real system</b> is always validation.',
            'ماتبدّلش الجملتين. الـ <b>verification</b> هي <bdi dir="ltr">building the model <b>right</b></bdi> (البرنامج قصاد الـ conceptual model). والـ <b>validation</b> هي <bdi dir="ltr">building the <b>right model</b></bdi> (الموديل قصاد السيستم الحقيقي). أي مقارنة بالـ <b>real system</b> تبقى validation.')}</p></${Box}>
        `),

        // 6 · 7.1 three steps of model building
        page(html`
          <${H1}>${t('Building a model: 3 steps', 'بناء الموديل: 3 خطوات')}</${H1}>
          <${NumList} items=${A ? [
            'نراقب <b>السيستم الحقيقي</b> والـ interactions بين مكوناته، ونجمع data عن سلوكه. ونسأل الناس اللي عارفين السيستم علشان نستفيد من خبرتهم. ومع التطوير بتظهر أسئلة جديدة فنرجع للخطوة دي.',
            'نبني <b>conceptual model</b>: مجموعة <b>assumptions</b> عن مكونات السيستم وتركيبه، و<b>hypotheses</b> عن قيم الـ input parameters.',
            'نترجم الـ operational model لـ <b>شكل الكمبيوتر يفهمه</b>، وده الـ <b>computerized model</b>.'
          ] : [
            'Observe the <b>real system</b> and the interactions among its components, and collect data on its behavior. Question people familiar with the system to use their special knowledge. New questions arise as development proceeds, and you come back here.',
            'Construct a <b>conceptual model</b>: a collection of <b>assumptions</b> on the components and structure of the system, and <b>hypotheses</b> on the values of the input parameters.',
            'Translate the operational model into a <b>computer-recognizable form</b>: the <b>computerized model</b>.'
          ]} />
          <${Grow} />
          <${Talk} who="dev" think=${true}>${X('So I do 1, then 2, then 3, and I\'m finished?', 'يعني أعمل 1 وبعدين 2 وبعدين 3 وخلاص؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('No: model building is <b>not a linear process</b>. You go back to these steps <b>many times</b> while building, verifying and validating.', 'لأ: بناء الموديل <b>مش linear</b>. هترجع للخطوات دي <b>كذا مرة</b> وإنت بتبني وبتعمل verification وvalidation.')}</${Talk}>
        `, { sec: t('7.1 Model building', 'بناء الموديل (7.1)') }),

        // 7 · Fig 7.1
        page(html`
          <${H2}>${t('Fig 7.1: which arrow is which?', 'الشكل 7.1: أنهي سهم إيه؟')}</${H2}>
          <${Fig} name="ms-vv-build" />
        `),

        // 8 · fig 7.1 dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['السهم اللي بين الـ real system والـ conceptual model اسمه إيه؟', 'اسمه <b>Conceptual validation</b>. والسهم اللي بين الـ conceptual model والـ operational model اسمه <b>Model verification</b>.'],
            ['واللفة اللي على الشمال؟', 'دي الـ <b>Calibration and validation</b>: بترجّع الـ operational model للـ conceptual model وللـ real system.'],
            ['الـ conceptual model جواه إيه بالظبط في الشكل؟', 'تلات حاجات: assumptions عن مكونات السيستم، والـ <b>structural assumptions</b> اللي بتحدد الـ interactions بين المكونات، وassumptions عن الـ input parameters والـ data.'],
            ['هو الـ operational model والـ computerized model حاجة واحدة؟', 'أيوه، الشكل كاتب <bdi dir="ltr">Operational model (computerized representation)</bdi>.']
          ] : [
            ['What is the arrow between the real system and the conceptual model called?', '<b>Conceptual validation</b>. The arrow between the conceptual model and the operational model is <b>model verification</b>.'],
            ['And the loop on the left?', '<b>Calibration and validation</b>: it joins the operational model back to the conceptual model and the real system.'],
            ['What exactly is inside the conceptual model box?', 'Three things: assumptions on system components; <b>structural assumptions</b>, which define the interactions between system components; and input parameters and data assumptions.'],
            ['Are "operational model" and "computerized model" the same thing?', 'Yes. The figure says <b>Operational model (computerized representation)</b>.']
          ]} />
        `),

        // 9 · 7.2 verification considerations 1–4
        page(html`
          <${H1}>${t('Verification: checking the program', 'الـ Verification: بنراجع البرنامج')}</${H1}>
          <${Def}>${X('The main purpose of <b>verification</b> is to assure that the <b>conceptual model is accurately reflected in the operational model</b>. The conceptual model involves some degree of <b>abstraction</b> about the system\'s operations.',
            'الهدف الأساسي من الـ <b>verification</b> إننا نتأكد إن <b>الـ conceptual model متمثل بدقة في الـ operational model</b>. والـ conceptual model فيه درجة من الـ <b>abstraction</b> لطريقة شغل السيستم.')}</${Def}>
          <${P} small=${true}>${X('The notes list <b>8 considerations</b>. The first four:', 'النوتس فيها <b>8 حاجات</b> نراعيها. أول أربعة:')}</${P}>
          <${NumList} items=${A ? [
            'الـ computerized model <b>يراجعه حد غير اللي عمله</b>.',
            'اعمل <b>flow diagram</b> (الـ logic flow) علشان تعرف إيه العمليات اللي بتحصل لما الـ events تحصل.',
            '<b>بُص كويس على الـ output وشوف هل هو منطقي</b> مع إعدادات مختلفة للـ input parameters.',
            'في آخر الـ simulation <b>اطبع الـ input parameters</b>، علشان تتأكد إنها ماتغيرتش ولا اتعدلت.'
          ] : [
            'Have the computerized model <b>checked by someone other than its developer</b>.',
            'Make a <b>flow diagram</b> (logic flow), so we know what operations take place when events occur.',
            '<b>Closely examine the model output for reasonableness</b> under a variety of settings of the input parameters.',
            'At the end of the run, <b>print the input parameters</b>, to confirm they were not changed or modified.'
          ]} />
        `, { sec: t('7.2 Verification', 'الـ Verification (7.2)') }),

        // 10 · considerations 5–8
        page(html`
          <${H2}>${t('...and the other four', '...والأربعة التانيين')}</${H2}>
          <div className="hf-ms7-nl hf-in">${(A ? [
            'خلّي الـ computerized model <b><bdi dir="ltr">self-documenting</bdi></b> على قد ما تقدر.',
            'لو فيه <b>animation</b>، اتأكد إنها بتعكس السيستم الحقيقي.',
            'استخدم الـ <b>interactive run controller (IRC)</b> أو الـ debugger علشان تلاقي الأخطاء وتصلحها.',
            'استخدم <b>graphical interfaces</b> تمثل الموديل بالرسم، وده بيسهّل فهمه.'
          ] : [
            'Make the computerized model as <b>self-documenting</b> as possible.',
            'If it is <b>animated</b>, check that the animation reflects the real system.',
            'Use the <b>interactive run controller (IRC)</b> or debugger to find and correct errors.',
            'Use <b>graphical interfaces</b> to represent the model graphically, which simplifies understanding it.'
          ]).map((s, i) => html`<div key=${i} className="hf-ms7-r"><span className="hf-ms7-n">${i + 5}</span><span className="hf-ms7-d">${T7(s)}</span></div>`)}</div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('You typed an arrival rate of 5.0 per hour. At the end of the run the program prints 4.0. Which of the eight considerations just saved you, and what does it tell you about the program?',
            'إنت كتبت الـ arrival rate بـ 5.0 في الساعة. في آخر الـ run البرنامج طبعها 4.0. أنهي واحدة من التمانية دي لحقتك، وده بيقولك إيه عن البرنامج؟')}</p></${Box}>
          <${Hand} red=${true}>${t('hint: number 4 on the last page', 'تلميح: رقم 4 في الصفحة اللي فاتت')}</${Hand}>
        `),

        // 11 · IRC interview
        page(html`
          <${Interview} title=${t('The IRC, exposed', 'الـ IRC على المكشوف')} sub=${t("This week: the interactive run controller, the verifier's favourite tool.", 'حوار الأسبوع: الـ interactive run controller، الأداة المفضلة للـ verification.')} lines=${A ? [
            ['المذيع', 'إنت مجرد debugger؟'],
            ['الـ IRC', 'debugger للـ simulation. أقدر <b>أراقب (monitor)</b> الـ run وهو ماشي: أقدّمه لوقت معين وأعرض معلومات الموديل.'],
            ['المذيع', 'ولو عايز أتابع حاجة واحدة بس؟'],
            ['الـ IRC', 'أركز على <b>سطر أو كذا سطر من الـ logic</b>، أو على <b>entity معينة</b>: أوقف كل مرة الـ entity دي تبقى active.'],
            ['المذيع', 'وإيه كمان؟'],
            ['الـ IRC', 'أوريك <b>قيم مكونات معينة</b> في الموديل، وأقدر <b>أوقف الـ run مؤقتًا (pause)</b> علشان تشوف معلومات، أو تغيّر قيم، أو توجّه الـ entities لمكان تاني.'],
            ['المذيع', 'والإحصائيات؟'],
            ['الـ IRC', 'الإحصائيات القياسية زي الـ average waiting time والـ average queue length <b>بتتجمع أوتوماتيك</b> في لغات الـ simulation، فعرضها مش بياخد وقت.']
          ] : [
            ['Head First', 'Are you just a debugger?'],
            ['IRC', 'A debugger for simulations. I can <b>monitor</b> the run as it progresses: advance it to a desired time, then display model information.'],
            ['Head First', 'And if I only care about one thing?'],
            ['IRC', 'I <b>focus on one or several lines of logic</b>, or on a <b>particular entity</b>: I pause every time that entity becomes active.'],
            ['Head First', 'What else?'],
            ['IRC', 'I show the <b>values of selected model components</b>, and I can <b>temporarily suspend (pause)</b> the run so you can view information, reassign values or redirect entities.'],
            ['Head First', 'And the statistics?'],
            ['IRC', 'Standard statistics like average waiting time and average queue length are <b>collected automatically</b> by simulation languages, so displaying them takes little time.']
          ]} />
        `, { sec: t('The IRC', 'الـ IRC') }),

        // 12 · current contents and total count
        page(html`
          <${H1}>${t('Two numbers that smell trouble', 'رقمين بيشمّوا المشاكل')}</${H1}>
          <div className="hf-ms7-two hf-in">
            <div className="hf-ms7-card"><b>Current contents</b>${X('the number of items in each component <b>at a given time</b>', 'عدد الـ items الموجودة في كل مكون <b>في لحظة معينة</b>')}</div>
            <div className="hf-ms7-card"><b>Total count</b>${X('the total number of items that have <b>entered</b> each component <b>by a given time</b>', 'إجمالي عدد الـ items اللي <b>دخلت</b> كل مكون <b>لحد وقت معين</b>')}</div>
          </div>
          <${UL} items=${A ? [
            'لو الـ <b>current contents عالية</b> في جزء من السيستم: entities كتير متأخرة والـ <b>queue مش مستقرة (unstable)</b>.',
            'لو الـ <b>total count بصفر</b> لـ subsystem: <b>مفيش ولا item دخل</b> الـ subsystem ده.',
            'لو الـ <b>current count والـ total count الاتنين بواحد</b>: فيه entity <b>مسكت resource وعمرها ما سابته</b>.'
          ] : [
            '<b>Current contents high</b> in some part of the system: many entities are delayed and the <b>queue is unstable</b>.',
            '<b>Total count = 0</b> for a subsystem: <b>no items entered</b> that subsystem.',
            '<b>Current count and total count both equal to one</b>: an entity has <b>captured a resource but never freed it</b>.'
          ]} />
          <${Grow} />
          <${Talk} who="cust">${X('I grabbed the teller at 9:00. It\'s 5:00 now. Nobody told me to let go.', 'أنا مسكت الـ teller الساعة 9. الساعة بقت 5. محدش قالي أسيبه.')}</${Talk}>
          <${Hand} arrow="up">${A ? html`ده بالظبط اللي بيبان لما الاتنين بـ 1 (المثال من عندنا)` : 'exactly what "both equal to one" shows (our example)'}</${Hand}>
        `, { sec: t('Reasonableness statistics', 'إحصائيات المنطقية') }),

        // 13 · exercise: read the statistics
        page(html`
          <${Box} kind="pencil" title=${t('Read the statistics', 'اقرا الإحصائيات')}><p className="hf-p small">${t('Each line is a report from a verification run (our examples). What does it reveal? Tap a letter, then check.', 'كل سطر ده تقرير من run للـ verification (أمثلة من عندنا). بيكشف إيه؟ دوس على حرف وبعدين صحّح.')}</p></${Box}>
          <div className="hf-ms7-key hf-in">${A ? html`<span>الحرف <b>U</b>: الـ queue مش مستقرة</span><span>الحرف <b>N</b>: مفيش حاجة دخلت</span><span>الحرف <b>H</b>: الـ resource ماتسابش</span>` : html`<span><b>U</b> unstable queue</span><span><b>N</b> nothing entered</span><span><b>H</b> resource never freed</span>`}</div>
          <${Sort} id="ms7-stat" bins=${A ? [['U', 'queue مش مستقرة'], ['N', 'مفيش حاجة دخلت'], ['H', 'resource ماتسابش']] : [['U', 'unstable queue'], ['N', 'nothing entered'], ['H', 'resource never freed']]} items=${A ? [
            ['الـ queue قدام مكنة الدهان: current contents بـ 47 وبتزيد', 0],
            ['محطة الـ inspection: الـ total count بصفر في آخر الـ run', 1],
            ['الـ server رقم 2: الـ current count بـ 1 والـ total count بـ 1 طول اليوم', 2],
            ['مئات الـ entities مستنية قدام الـ drill', 0],
            ['الـ rework loop ماوصلهاش ولا part خالص', 1],
            ['الـ forklift اتمسك مرة واحدة ولسه ممسوك', 2]
          ] : [
            ['Queue at the paint machine: current contents 47 and climbing', 0],
            ['Inspection station: total count 0 at the end of the run', 1],
            ['Server 2: current count 1 and total count 1, all day', 2],
            ['Hundreds of entities waiting in front of the drill', 0],
            ['The rework loop never received a single part', 1],
            ['The forklift was seized once (total 1) and is still held (current 1)', 2]
          ]} />
        `),

        // 14 · three techniques
        page(html`
          <${H1}>${t('Three ways to catch a logic bug', 'تلات طرق تمسك بيهم غلطة في الـ logic')}</${H1}>
          <${NumList} items=${A ? [
            'الـ <b>Common sense technique</b>: بنتوقع <b>range معقول</b> لقيم إحصائيات output معينة <b>قبل</b> ما نشغّل الموديل. وده بيقلل الـ discrepancies والـ output الغريب.',
            'الـ <b>Documentation</b>: comments قصيرة، و<b>تعريف لكل الـ variables والـ parameters</b>، ووصف لكل جزء رئيسي. وده بيوضح الـ logic.',
            'الـ <b>Trace</b> (أكثر تطورًا): printout مفصل بيدي <b>قيمة كل variable كل مرة أي واحد فيهم يتغير</b>، علشان نعمل verification بـ <b>حسابات يدوية</b>. وبسبب وقته بيبقى <b>قصير (restricted)</b>، وممكن <b>selective trace</b> لأماكن معينة.'
          ] : [
            '<b>Common sense technique</b>: forecast a <b>reasonable range of values</b> of selected output statistics <b>before</b> running the model. It reduces discrepancies and unusual output.',
            '<b>Documentation</b>: brief comments, <b>definitions of all variables and parameters</b>, and a description of each major section. It clarifies the logic.',
            '<b>Trace</b> (more sophisticated): a detailed printout giving the <b>value of each variable every time one of them changes</b>, to verify the program by <b>manual calculations</b>. It takes time, so a trace run is usually <b>restricted</b> (short); a <b>selective trace</b> can target specific locations.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Which should <b>always</b> be carried out? <b>The first two</b>: common sense and documentation. Not the trace. And the close examination of output for reasonableness is especially valuable.',
            'أنهي لازم يتعملوا <b>دايمًا</b>؟ <b>أول اتنين</b>: الـ common sense والـ documentation. مش الـ trace. والفحص الدقيق للـ output علشان نشوف هل هو منطقي مفيد جدًا.')}</p></${Box}>
        `, { sec: t('Three techniques', 'التلات تقنيات') }),

        // 15 · example 7.1 setup
        page(html`
          <${H1}>${t('Example 7.1: the trace that caught a bug', 'المثال 7.1: الـ trace اللي مسك غلطة')}</${H1}>
          <${P} small=${true}>${X('A <b>single-server queue</b> runs for <b>16 time units</b> and reports a time-average waiting-line length of <b>L̂Q = 0.4375 customer</b>. The run is short, so the analyst checks it in detail with a trace (Table 7.1, p. 124).',
            'عندنا <b><bdi dir="ltr">single-server queue</bdi></b> اشتغل <b><bdi dir="ltr">16 time units</bdi></b>، وطلّع متوسط طول الطابور بالنسبة للوقت:<span class="ltr"><b>L̂Q = 0.4375 customer</b></span>والـ run قصير، فالـ analyst بيراجعه بالتفصيل بـ trace (الجدول 7.1، صفحة 124).')}</${P}>
          <div className="hf-ms7-key hf-in" dir=${A ? 'rtl' : 'ltr'} style=${{ display: 'grid', gap: '3px' }}>${(A ? [
            'الـ <b>CLOCK</b> ساعة الـ simulation', 'الـ <b>EVTYP</b> نوع الـ event:<bdi dir="ltr"> start, arrival, departure, stop</bdi>', 'الـ <b>NCUST</b> عدد الزباين في السيستم عند الوقت CLOCK', 'الـ <b>STATUS</b> حالة الـ server (القيمة 1 مشغول، والقيمة 0 فاضي)'
          ] : [
            '<b>CLOCK</b> simulation clock', '<b>EVTYP</b> event type: start, arrival, departure or stop', '<b>NCUST</b> customers in the system at time CLOCK', '<b>STATUS</b> server status: 1 = busy, 0 = idle'
          ]).map((x, i) => html`<span key=${i}>${T(x)}</span>`)}</div>
          <${P} small=${true}>${X('Each row is the state <b>just after</b> the named event. The queue length is <code>NCUST − STATUS</code>, and', 'كل صف هو الحالة <b>بعد</b> الـ event على طول. وطول الطابور هو <code>NCUST − STATUS</code>، و')}</${P}>
          <div className="hf-ms7-sum hf-in" dir="ltr">L̂Q = (1/T) Σ i·TᵢQ</div>
          <${Grow} />
          <${Talk} who="clock" flip=${true}>${X('I jump from event to event: 0, 3, 5, 11, 12, 16. Between jumps nothing changes.', 'أنا بنط من event للتاني: 0 و3 و5 و11 و12 و16. وبين كل نطة والتانية مفيش حاجة بتتغير.')}</${Talk}>
        `, { sec: t('Example 7.1', 'المثال 7.1') }),

        // 16 · trace figure
        page(html`
          <${Fig} name="ms-vv-trace" />
        `),

        // 17 · be the verifier
        page(html`
          <${Box} kind="pencil" title=${t('Be the verifier', 'خليك إنت الـ verifier')}><p className="hf-p small">${t("Here is Table 7.1. Tap every row whose logic is wrong, then check. Think: with one server, what must STATUS be whenever someone is in the system?", 'ده الجدول 7.1. دوس على كل صف الـ logic بتاعه غلط وصحّح. مع server واحد، الـ STATUS يبقى كام لو فيه حد في السيستم؟')}</p></${Box}>
          <${TraceHunt} id="ms7-hunt" />
        `, { sec: t('Be the verifier', 'خليك إنت الـ verifier') }),

        // 18 · be the program: L̂Q
        page(html`
          <${Box} kind="pencil" title=${t('Be the program: compute L̂Q', 'خليك إنت البرنامج: احسب الـ L̂Q')}><p className="hf-p small">${X('Pick the queue length on each interval (NCUST − STATUS from the trace). Then switch to the corrected STATUS and do it again.', 'اختار طول الطابور في كل فترة (<bdi dir="ltr">NCUST − STATUS</bdi> من الـ trace). وبعدين حوّل للـ STATUS المتصلّح واعملها تاني.')}</p></${Box}>
          <${LqBuild} id="ms7-lq" />
        `),

        // 19 · watch it on L̂Q
        page(html`
          <${Box} kind="watch" title=${t('Watch it: right arithmetic, wrong answer', 'خلّي بالك: الحساب صح والنتيجة غلط')}>
            <p className="hf-p small">${X('The program\'s arithmetic is <b>correct</b> for the STATUS values it printed: (0·3 + 1·2 + 0·6 + 1·1 + 1·4)/16 = 7/16 = 0.4375. The result is still <b>wrong</b>, because the attribute STATUS did not have the correct value.',
              'الحساب اللي البرنامج عمله <b>صح</b> بالـ STATUS اللي طبعه:<span class="ltr">(0·3 + 1·2 + 0·6 + 1·1 + 1·4)/16 = 7/16 = 0.4375</span>بس النتيجة <b>غلط</b>، لأن الـ attribute اللي اسمه STATUS ماكانش واخد القيمة الصح.')}</p></${Box}>
          <${Dumb} qa=${A ? [
            ['الـ 7 دي هي الـ L̂Q؟', 'لأ، دي البسط (المساحة تحت منحنى طول الطابور). لازم نقسم على <bdi dir="ltr">T = 16</bdi>.'],
            ['وليه مش نجمع الـ NCUST على طول؟', 'ده يدّي متوسط العدد <b>في السيستم</b> مش في الطابور:<span class="ltr">(0·3 + 1·2 + 0·6 + 1·1 + 2·4)/16 = 11/16 = 0.6875</span>'],
            ['ولو الـ STATUS كان صح؟', '‡ ده حسابنا مش في النوتس: الفترة <bdi dir="ltr">12–16</bdi> بس فيها حد مستني:<span class="ltr">L̂Q = 4/16 = 0.25</span>']
          ] : [
            ['Is 7 the value of L̂Q?', 'No, 7 is the numerator (the area under the queue-length curve). Divide by T = 16.'],
            ['Why not just average NCUST?', 'That gives the time-average number <b>in the system</b>, not in the queue: (0·3 + 1·2 + 0·6 + 1·1 + 2·4)/16 = 11/16 = 0.6875.'],
            ['And if STATUS had been right?', '‡ Our calculation, not in the notes: only 12–16 has someone waiting, so L̂Q = 4/16 = 0.25.']
          ]} />
        `),

        // 20 · 7.3 calibration and validation
        page(html`
          <${H1}>${t('Calibration: compare, adjust, repeat', 'الـ Calibration: قارن، عدّل، وعيد')}</${H1}>
          <${P} small=${true}>${X('Verification and validation are usually done <b>at the same time</b>, but <b>validation</b> is the overall process of <b>comparing the model and its behavior to the real system</b>.',
            'الـ verification والـ validation عادةً بيتعملوا <b>في نفس الوقت</b>، بس الـ <b>validation</b> هي العملية الشاملة اللي <b>بنقارن فيها الموديل وسلوكه بالسيستم الحقيقي</b>.')}</${P}>
          <${Def}>${X('<b>Calibration</b> is the <b>iterative</b> process of comparing the model to the real system, making adjustments, comparing the revised model to reality, making more adjustments, and comparing again.',
            'الـ <b>Calibration</b> هي العملية الـ <b>iterative</b> اللي بنقارن فيها الموديل بالسيستم الحقيقي، ونعدّل، ونقارن الموديل المعدّل بالواقع، ونعدّل تاني، ونقارن تاني.')}</${Def}>
          <${P} small=${true}>${t('Comparing the model to reality uses two kinds of test:', 'ومقارنة الموديل بالواقع بتستخدم نوعين من الـ tests:')}</${P}>
          <div className="hf-ms7-two hf-in">
            <div className="hf-ms7-card"><b>Subjective tests</b>${X('people knowledgeable about one or more aspects of the system <b>judge</b> the model and its output', 'ناس فاهمين جانب أو أكتر من السيستم <b>بيحكموا</b> على الموديل والـ output بتاعه')}</div>
            <div className="hf-ms7-card"><b>Objective tests</b>${X('need <b>data on system behavior</b> and the <b>corresponding data produced by the model</b>', 'محتاجة <b>data عن سلوك السيستم</b> و<b>الـ data المقابلة اللي الموديل طلّعها</b>')}</div>
          </div>
        `, { sec: t('7.3 Calibration', 'الـ Calibration (7.3)') }),

        // 21 · Fig 7.2
        page(html`
          <${H2}>${t('Fig 7.2: the calibration loop', 'الشكل 7.2: لفة الـ calibration')}</${H2}>
          <${Fig} name="ms-vv-calib" />
        `),

        // 22 · criticism of calibration, cost
        page(html`
          <${H2}>${t('The catch with calibration', 'المشكلة في الـ calibration')}</${H2}>
          <${Talk} who="table">${X('You tuned the model until it matched <b>me</b>, one data set. Of course it fits me.', 'إنت فضلت تظبط الموديل لحد ما طابقني <b>أنا</b>، data set واحدة. أكيد هيبقى fit عليّا.')}</${Talk}>
          <${P} small=${true}>${X('That is the <b>criticism</b>: calibration may stop once the model has been <b>"fit" to one data set</b>. <b>Fix</b>: collect a <b>new (second) set</b> of system data and use it for the <b>final validation</b>, after calibrating with the original data. If there is a discrepancy, go back to calibration and modify the model until it is acceptable.',
            'وده <b>النقد</b>: ممكن نوقف بمجرد ما الموديل يبقى <b><bdi dir="ltr">"fit"</bdi> على data set واحدة</b>. <b>الحل</b>: نجمع <b>data set جديدة (تانية)</b> ونستخدمها في الـ <b>final validation</b> بعد الـ calibration بالـ data الأصلية. ولو فيه discrepancy، نرجع للـ calibration ونعدّل لحد ما الموديل يبقى مقبول.')}</${P}>
          <${Grow} />
          <${Box} kind="relax" title=${t('And when do you stop?', 'وإمتى نبطّل؟')}><p className="hf-p small">${X('Each revision costs <b>time, cost and effort</b>. The modeler weighs the increase in accuracy against the cost of more validation. If the accuracy isn\'t reached within budget: <b>lower the accuracy level</b> or <b>reject the model</b>.',
            'كل revision بتكلف <b>وقت وفلوس ومجهود</b>. فالـ modeler بيوازن بين الزيادة في الدقة وتكلفة validation زيادة. ولو الدقة ماتحققتش في حدود الـ budget: يا إما <b>نقلل مستوى الدقة</b> يا إما <b>نرفض الموديل</b>.')}</p></${Box}>
        `),

        // 23 · Naylor and Finger
        page(html`
          <${H2}>${t('Naylor and Finger [1967]: three steps', 'الـ Naylor and Finger [1967]: تلات خطوات')}</${H2}>
          <${Fig} name="ms-vv-naylor" />
        `, { sec: t('Naylor and Finger', 'الـ Naylor and Finger') }),

        // 24 · 7.3.1 face validity
        page(html`
          <${H1}>${t('Step 1: face validity', 'الخطوة 1: الـ face validity')}</${H1}>
          <${P} small=${true}>${X('<b>Potential users</b> must be involved in building the model <b>from conceptualization to implementation</b>, so that reality is built into the model through assumptions about system structure and reliable data. Two advantages:',
            'لازم الـ <b>potential users</b> يشاركوا في بناء الموديل <b>من أول الـ conceptualization لحد الـ implementation</b>، علشان الواقع يتبني جوه الموديل من خلال assumptions عن تركيب السيستم وdata موثوقة. وليها ميزتين:')}</${P}>
          <${NumList} items=${A ? [
            'يقدروا <b>يقيّموا الـ output ويشوفوا هل هو منطقي</b> ويساعدوا في اكتشاف العيوب، فيبقوا جزء من الـ calibration.',
            'الـ <b>perceived validity (credibility)</b> بتزيد، فالمدير يثق في نتايج الـ simulation ويعتمد عليها في القرار.'
          ] : [
            'They can <b>evaluate the output for reasonableness</b> and help identify deficiencies, so they take part in calibration.',
            'The model\'s <b>perceived validity (credibility)</b> increases, so the manager trusts the results as a basis for decisions.'
          ]} />
          <${Def}>${X('<b>Sensitivity analysis</b> also checks face validity: the user is asked whether the model <b>behaves in the expected way when one or more input variables are changed</b>. User and builder judge from experience and observation of the real system.',
            'الـ <b>Sensitivity analysis</b> كمان بتختبر الـ face validity: بنسأل الـ user هل الموديل <b>بيتصرف بالشكل المتوقع لما نغير input variable واحد أو أكتر</b>. والـ user والـ builder بيحكموا من خبرتهم وملاحظتهم للسيستم.')}</${Def}>
          <${Hand} red=${true}>${t('large-scale model, too many tests? test the most critical input variables', 'موديل كبير وtests كتير؟ اختبر أهم الـ input variables (most critical)')}</${Hand}>
        `, { sec: t('7.3.1 Face validity', 'الـ Face validity (7.3.1)') }),

        // 25 · 7.3.2 structural assumptions
        page(html`
          <${H1}>${t('Step 2: check your assumptions', 'الخطوة 2: راجع الـ assumptions بتاعتك')}</${H1}>
          <${P} small=${true}>${X('Model assumptions fall into <b>two general classes</b>.', 'الـ model assumptions بتتقسم <b>نوعين عامين</b>.')}</${P}>
          <${Def}>${X('<b>Structural assumptions</b>: questions of <b>how the system operates</b>, with its simplifications and abstractions of reality.', 'الـ <b>Structural assumptions</b>: أسئلة عن <b>السيستم بيشتغل إزاي</b>، مع التبسيطات والـ abstractions اللي بنعملها للواقع.')}</${Def}>
          <${P} small=${true}>${t('The bank example:', 'مثال البنك:')}</${P}>
          <${UL} items=${A ? [
            'الزباين بيعملوا <b>queue لكل teller</b> ويتخدموا <bdi dir="ltr">first-come, first-served</bdi>.',
            'لو فيه queues كتير، ممكن الزبون <b>ينقل للطابور اللي ماشي أسرع</b>.',
            'عدد الـ tellers <b>ثابت أو متغير</b>.'
          ] : [
            'Customers form a <b>queue for each teller</b> and are served first-come, first-served.',
            'With many queues, customers may <b>shift to a line that moves faster</b>.',
            'The number of tellers is <b>fixed or variable</b>.'
          ]} />
          <${P} small=${true}>${X('Verified by <b>observation at regular intervals</b> and <b>discussions with managers and tellers</b> about bank policies and how they are implemented.', 'بنتأكد منها بـ <b>الملاحظة على فترات منتظمة</b> و<b>النقاش مع المديرين والـ tellers</b> عن سياسات البنك وإزاي بتتطبق.')}</${P}>
          <${Grow} />
          <${Talk} who="cust" flip=${true}>${X("I'm the one who switches to the faster line. Put me in the model!", 'أنا اللي بنقل للطابور الأسرع. حطّني في الموديل!')}</${Talk}>
        `, { sec: t('7.3.2 Model assumptions', 'الـ Model assumptions (7.3.2)') }),

        // 26 · data assumptions
        page(html`
          <${Def}>${X('<b>Data assumptions</b>: collecting <b>reliable data</b> and doing <b>correct statistical analysis</b> of it.', 'الـ <b>Data assumptions</b>: إننا نجمع <b>data موثوقة</b> ونعمل عليها <b>تحليل إحصائي صح</b>.')}</${Def}>
          <${P} small=${true}>${t('The bank collects:', 'البنك بيجمع:')}</${P}>
          <${UL} items=${A ? [
            'الـ interarrival times في كذا فترة مدتها <b>ساعتين وقت الزحمة</b> (peak loading)',
            'الـ interarrival times في <b>فترة الهدوء</b> (slack period)',
            'الـ service times للحسابات <b>التجارية</b> (commercial)',
            'الـ service times للحسابات <b>الشخصية</b> (personal)'
          ] : [
            'Interarrival times during several <b>2-hour peak periods</b>',
            'Interarrival times during a <b>slack period</b>',
            'Service times for <b>commercial accounts</b>',
            'Service times for <b>personal accounts</b>'
          ]} />
          <${P} small=${true}>${X('Reliability is checked with the bank managers, who identify typical slack and rush times. <b>Combined</b> data sets get a test for <b>homogeneity</b>; extra tests may check for <b>correlation</b>. Analysis starts once the data is a <b>random sample</b>, in three steps:',
            'الموثوقية بنتأكد منها مع مديرين البنك، وهم بيحددوا أوقات الهدوء والزحمة. ولو <b>دمجنا</b> data sets بنعمل test للـ <b>homogeneity</b>، وممكن tests للـ <b>correlation</b>. والتحليل بيبدأ لما نتأكد إن الـ data <b>random sample</b>، وليه 3 خطوات:')}</${P}>
          <${NumList} items=${A ? ['<b>نحدد</b> الـ probability distribution المناسب.', '<b>نقدّر الـ parameters</b> بتاعته.', 'نعمل <b>validation</b> بـ <bdi dir="ltr">goodness-of-fit</bdi> tests (<bdi dir="ltr">chi-square</bdi> أو <bdi dir="ltr">K-S</bdi>) وبالرسم.']
            : ['<b>Identify</b> the probability distribution.', '<b>Estimate</b> its parameters.', '<b>Validate</b> with goodness-of-fit tests (chi-square or Kolmogorov-Smirnov) and graphs.']} />
          <${Hand} red=${true}>${t('that is Lecture 6, Input Modeling, coming back', 'دي المحاضرة 6، الـ Input Modeling، راجعة تاني')}</${Hand}>
        `),

        // 27 · exercise: structural or data
        page(html`
          <${Box} kind="pencil" title=${t('Structural or data?', 'structural ولا data؟')}><p className="hf-p small">${t('Each line is one of the bank\'s assumptions from the notes. Tap S for structural (how the system operates) or D for data, then check.', 'كل سطر assumption من مثال البنك في النوتس. دوس S لو structural (السيستم بيشتغل إزاي) أو D لو data، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="ms7-sd" bins=${A ? [['S', 'structural'], ['D', 'data']] : [['S', 'structural'], ['D', 'data']]} items=${A ? [
            ['فيه queue لكل teller', 0],
            ['الـ interarrival times في فترة الهدوء', 1],
            ['الزبون بيتخدم <bdi dir="ltr">first-come, first-served</bdi>', 0],
            ['الـ service times للحسابات التجارية', 1],
            ['الزبون ممكن ينقل لطابور أسرع', 0],
            ['الـ interarrival times في فترات الزحمة (ساعتين)', 1],
            ['عدد الـ tellers ثابت أو متغير', 0],
            ['الـ service times للحسابات الشخصية', 1]
          ] : [
            ['There is a queue for each teller', 0],
            ['Interarrival times during a slack period', 1],
            ['Customers are served first-come, first-served', 0],
            ['Service times for commercial accounts', 1],
            ['A customer may shift to a faster line', 0],
            ['Interarrival times in 2-hour peak periods', 1],
            ['The number of tellers is fixed or variable', 0],
            ['Service times for personal accounts', 1]
          ]} />
        `),

        // 28 · 7.3.3 input-output transformations
        page(html`
          <${H1}>${t('Step 3: inputs in, outputs out', 'الخطوة 3: inputs داخلة وoutputs طالعة')}</${H1}>
          <${P} small=${true}>${X('View the model as an <b>input-output transformation</b>: it accepts values of the input parameters and transforms them into <b>output measures of performance</b>.',
            'بنبص للموديل على إنه <b><bdi dir="ltr">input-output</bdi> transformation</b>: بياخد قيم الـ input parameters ويحولها لـ <b>output measures of performance</b>.')}</${P}>
          <${UL} items=${A ? [
            'الـ modeler بيجمع <b>اتنين data sets</b>: واحدة للتطوير والـ calibration، والتانية (لو محتاجينها) للـ <b>final validation test</b>.',
            'الـ <b>main responses of interest</b> هي المعايير اللي نعمل بيها validation.'
          ] : [
            'The modeler collects <b>two data sets</b>: one for developing and calibrating, the other (if required) for the <b>final validation test</b>.',
            'The <b>main responses of interest</b> should be the criteria for validating the model.'
          ]} />
          <${Box} kind="watch" title=${t('Watch it: the necessary condition', 'خلّي بالك: الشرط الضروري')}><p className="hf-p small">${X('Some version of the system must <b>exist</b>, so data can be collected (at least one set of input conditions) and compared with the model\'s predictions. A system still in the <b>planning stage</b> has no operating data: <b>complete input-output validation is not possible</b>.',
            'لازم يكون فيه نسخة من السيستم <b>موجودة فعلًا</b>، علشان نجمع data (على الأقل set واحدة من الـ input conditions) ونقارنها بتوقعات الموديل. والسيستم اللي لسه في <b>مرحلة التخطيط</b> مفيهوش operating data، فالـ <b><bdi dir="ltr">input-output</bdi> validation الكاملة مش ممكنة</b>.')}</p></${Box}>
          
        `, { sec: t('7.3.3 Input-output', 'الـ Input-output (7.3.3)') }),

        // 29 · non-existent systems
        page(html`
          <${H2}>${t("What if the system doesn't exist yet?", 'طب لو السيستم لسه مش موجود؟')}</${H2}>
          <${P} small=${true}>${X('A <b>proposed</b> system, or an existing one under new input conditions:', 'سيستم <b>مقترح</b>، أو سيستم موجود تحت input conditions جديدة:')}</${P}>
          <${UL} items=${A ? [
            'نستخدم الـ responses بتاعة الموديلين (الموجود والمقترح) تحت <b>input conditions متشابهة</b> كمعايير للمقارنة.',
            'غالبًا المقترح <b>تعديل</b> على الموجود، فنتمنى إن الثقة في القديم <b>تتنقل</b> للجديد: وده مبرر بس لو التعديل <b>بسيط (minor)</b>.',
            'تغييرات <b>minor</b>: نعملها verification بعناية ونقبل الـ output بثقة.',
            'تغييرات <b>major</b>: لو فيه subsystem شبهه في مكان تاني، نعمل validation للـ <bdi dir="ltr">sub-model</bdi> بتاعه وندمجه مع <bdi dir="ltr">sub-models</bdi> متعمللها validation: <b>partial validation</b>.'
          ] : [
            'The responses of the two models (existing and proposed) under <b>similar input conditions</b> are the criteria for comparison.',
            'Usually the proposed system <b>modifies</b> the existing one, so we hope confidence in the old model <b>transfers</b>: justified only for a <b>minor modification</b>.',
            '<b>Minor</b> changes: carefully verify them and accept the new output with confidence.',
            '<b>Major</b> changes: validate the sub-model of a similar subsystem that exists elsewhere, and integrate it with other validated sub-models: <b>partial validation</b>.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('There is <b>no way to completely validate</b> a model of a <b>non-existing</b> system. Within time and budget, use as many techniques as possible.',
            '<b>مفيش أي طريقة نعمل بيها validation كاملة</b> لموديل سيستم <b>مش موجود</b>. وفي حدود الوقت والـ budget استخدم أكبر عدد ممكن من التقنيات.')}</p></${Box}>
        `),

        // 30 · 7.3.4 historical input data
        page(html`
          <${H1}>${t('Replay history', 'رجّع التاريخ')}</${H1}>
          <p className="hf-hand">${t('7.3.4 input-output validation using historical input data', 'الجزء 7.3.4: الـ validation باستخدام historical input data')}</p>
          <${P} small=${true}>${X('Feed the model the real inputs and compare its responses with the system\'s. All input data (Aₙ, Sₙ, ...) and all system response data (e.g. the average delay Z₂) must be collected <b>during the same time period</b>.',
            'بندّي الموديل الـ inputs الحقيقية ونقارن الـ responses بتاعته بتاعة السيستم. وكل الـ input data <bdi dir="ltr">(Aₙ, Sₙ, ...)</bdi> وكل الـ response data (زي متوسط الـ delay <bdi dir="ltr">Z₂</bdi>) لازم تتجمع <b>في نفس الفترة الزمنية</b>.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Inputs from March, delays from June? The comparison could be <b>misleading</b>, because the responses depend on both the <b>inputs</b> and the <b>structure</b> of the system or model.',
            'الـ inputs من مارس والـ delays من يونيو؟ المقارنة ممكن تبقى <b>مضللة (misleading)</b>، لأن الـ responses بتعتمد على الـ <b>inputs</b> وعلى <b>تركيب</b> السيستم أو الموديل الاتنين.')}</p></${Box}>
          <${UL} items=${A ? [
            'ده <b>صعب في السيستمات الكبيرة</b> علشان محتاج <b>جمع data في نفس الوقت</b>؛ والعدادات والأجهزة الإلكترونية بتسهّله.',
            'الـ modeler بيتمنى إن الـ simulation تبقى <b>replica</b> من السيستم، ومستوى الدقة بيحدده حكم <b>الـ model builder والـ model user</b>.'
          ] : [
            'It is <b>difficult for large systems</b> because of the need for <b>simultaneous data collection</b>; electronic counters and devices make it easier.',
            'The modeler hopes the simulation is a <b>replica</b> of the real system; the level of accuracy is judged by <b>both the model builder and the model user</b>.'
          ]} />
        `, { sec: t('7.3.4 Historical data', 'الـ Historical data (7.3.4)') }),

        // 31 · 7.3.5 Turing test text
        page(html`
          <${H1}>${t('Spot the fake report', 'اطلع التقرير المزيف')}</${H1}>
          <p className="hf-hand">${t('7.3.5 input-output validation using a Turing test', 'الجزء 7.3.5: الـ validation باستخدام Turing test')}</p>
          <${P} small=${true}>${X('When <b>no statistical test is readily applicable</b>, people <b>knowledgeable about system behavior</b> compare the model\'s output with the system\'s.',
            'لما <b>مايكونش فيه statistical test ينفع بسهولة</b>، ناس <b>فاهمين سلوك السيستم</b> بيقارنوا الـ output بتاع الموديل بتاع السيستم.')}</${P}>
          <${NumList} items=${A ? [
            'نجهز <b>5 تقارير حقيقية</b> عن أداء السيستم في 5 أيام مختلفة.',
            'نطلع <b>5 تقارير مزيفة</b> من output الـ simulation، بنفس الشكل بالظبط: <b>10 تقارير</b>.',
            'نخلطهم <b>عشوائيًا</b> ونديهم لـ engineer يحدد مين المزيف ومين الحقيقي.'
          ] : [
            'Prepare <b>5 real reports</b> of system performance over 5 different days.',
            'Use simulation output to produce <b>5 fake reports</b>, in exactly the same format: <b>10 reports</b>.',
            '<b>Shuffle</b> them randomly and give them to an engineer to say which are fake and which are real.'
          ]} />
          <div className="hf-ms7-two hf-in">
            <div className="hf-ms7-card red"><b>${t('Fakes spotted', 'عرف المزيف')}</b>${X('the builder questions the engineer and uses the information to <b>improve the model</b>', 'الـ builder بيسأله ويستخدم المعلومات علشان <b>يحسّن الموديل</b>')}</div>
            <div className="hf-ms7-card"><b>${t("Can't tell", 'ماقدرش يفرّق')}</b>${X('the modeler concludes the model is <b>adequate</b>', 'الـ modeler بيستنتج إن الموديل <b>adequate</b>')}</div>
          </div>
          <${Hand} red=${true}>${t('a valuable tool for detecting model inadequacies and increasing credibility', 'أداة قيمة لاكتشاف عيوب الموديل وزيادة الـ credibility')}</${Hand}>
        `, { sec: t('7.3.5 Turing test', 'الـ Turing test (7.3.5)') }),

        // 32 · Turing figure
        page(html`
          <${H2}>${t('Shuffle, then ask the engineer', 'اخلط، وبعدين اسأل الـ engineer')}</${H2}>
          <${Fig} name="ms-vv-turing" />
        `),

        // 33 · link to L1
        page(html`
          <${H1}>${t('Back to Lecture 1', 'رجوع للمحاضرة 1')}</${H1}>
          <${P} small=${true}>${t("Remember the 12 steps of a simulation study? Two of them are this chapter:", 'فاكر الـ 12 خطوة بتوع الـ simulation study؟ اتنين منهم هما الفصل ده:')}</${P}>
          <div className="hf-ms7-two hf-in">
            <div className="hf-ms7-card red"><b>${t('Step 6: Verified?', 'الخطوة 6: Verified?')}</b>${X('Does the program do what the model describes? <b>No</b> → back to step 5, model translation.', 'البرنامج بيعمل اللي الموديل بيوصفه؟ لو <b>لأ</b> نرجع للخطوة 5 (الـ model translation).')}</div>
            <div className="hf-ms7-card"><b>${t('Step 7: Validated?', 'الخطوة 7: Validated?')}</b>${X('Do the results match the reality? Calibration? <b>No</b> → back to steps 3 and 4; <b>Yes</b> → step 8, experimental design.', 'النتايج مطابقة للواقع؟ محتاجين calibration؟ لو <b>لأ</b> نرجع للخطوتين 3 و4، ولو <b>أيوه</b> نكمل للخطوة 8 (الـ experimental design).')}</div>
          </div>
          <${UL} items=${A ? [
            'الخطوات من 3 لـ 7 هي <bdi dir="ltr">Phase 2: Model building and data collection</bdi>.',
            '<b>أهم خطوة هي الـ validation</b>: الموديل الـ invalid ممكن يوصّل لقرارات <b>خطيرة وغالية</b>. ولو مفيش سيستم حقيقي، الـ validation بتبقى صعبة.',
            'الـ simulation <b>مش مناسبة</b> لما مانقدرش نعملها verification أو validation (الـ slide 18).',
            'الـ <b>Verified</b> والـ <b>Credibility</b> من معايير الموديل الكويس (الـ slide 47).'
          ] : [
            'Steps 3 to 7 form <b>Phase 2: Model building and data collection</b>.',
            '<b>The most crucial step is validation</b>: an invalid model can lead to <b>dangerous and expensive</b> decisions. With no real-world system, it is hard to validate.',
            'Simulation is <b>not appropriate</b> when it cannot be verified or validated (slide 18).',
            '<b>Verified</b> and <b>Credibility</b> are among the criteria of a good model (slide 47).'
          ]} />
        `, { sec: t('Link to Lecture 1', 'الربط بالمحاضرة 1') }),

        // 34 · study figure
        page(html`
          <${H2}>${t('Drive the two checks yourself', 'سوق الـ checks الاتنين بنفسك')}</${H2}>
          <${Fig} name="ms-vv-study" />
        `),

        // 35 · exercise: verification or validation
        page(html`
          <${Box} kind="pencil" title=${t('Verification or validation?', 'verification ولا validation؟')}><p className="hf-p small">${t('Is each activity checking the program against the model (Ver) or the model against the real system (Val)?', 'كل نشاط ده بيراجع البرنامج على الموديل (Ver) ولا الموديل على السيستم الحقيقي (Val)؟')}</p></${Box}>
          <${Sort} id="ms7-vv" bins=${A ? [['Ver', 'الـ verification'], ['Val', 'الـ validation']] : [['Ver', 'verification'], ['Val', 'validation']]} items=${A ? [
            ['حد غير اللي كتب البرنامج يراجعه', 0],
            ['نخلط 10 تقارير وندّيهم لـ engineer', 1],
            ['نطبع الـ input parameters في آخر الـ run', 0],
            ['نقارن الـ output بالسيستم الحقيقي من نفس الفترة', 1],
            ['نشغّل trace ونراجعه بحسابات يدوية', 0],
            ['نشرك الـ potential users من الأول للآخر', 1],
            ['نوقف الـ run بالـ IRC ونبص على entity', 0],
            ['نقارن، نعدّل، ونقارن تاني بالواقع', 1]
          ] : [
            'Have someone other than the developer check the program',
            'Shuffle 10 reports and give them to an engineer',
            'Print the input parameters at the end of the run',
            'Compare output with the real system from the same period',
            'Run a trace and check it by hand',
            'Involve potential users from start to finish',
            'Pause the run with the IRC and inspect an entity',
            'Compare with reality, adjust, compare again'
          ].map((s, i) => [s, [0, 1, 0, 1, 0, 1, 0, 1][i]])} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 36 · exercise: which Naylor step
        page(html`
          <${Box} kind="pencil" title=${t('Which Naylor and Finger step?', 'أنهي خطوة من الـ Naylor and Finger؟')}><p className="hf-p small">${X('<b>1</b> face validity, <b>2</b> validate model assumptions, <b>3</b> compare input-output transformations.', 'الخطوة <b>1</b> هي الـ face validity، والخطوة <b>2</b> الـ validation للـ model assumptions، والخطوة <b>3</b> مقارنة الـ <bdi dir="ltr">input-output</bdi> transformations.')}</p></${Box}>
          <${Sort} id="ms7-nf" bins=${A ? [['1', 'الخطوة 1'], ['2', 'الخطوة 2'], ['3', 'الخطوة 3']] : [['1', 'step 1'], ['2', 'step 2'], ['3', 'step 3']]} items=${A ? [
            ['نسأل الـ user: لو زوّدنا الـ arrival rate، الـ waiting time هيزيد زي ما متوقع؟', 0],
            ['نراقب طوابير البنك علشان نتأكد من الـ FCFS', 1],
            ['الـ Turing test', 2],
            ['نشرك الـ potential users في بناء الموديل', 0],
            ['نعمل <bdi dir="ltr">K-S</bdi> test على الـ service times', 1],
            ['ندّي الموديل الـ inputs الحقيقية ونقارن متوسط الـ delay', 2],
            ['نعمل homogeneity test قبل ما ندمج data sets', 1]
          ] : [
            ['Ask the user: if the arrival rate goes up, does waiting time rise as expected?', 0],
            ["Watch the bank's queues to confirm FCFS", 1],
            ['The Turing test', 2],
            ['Involve potential users in building the model', 0],
            ['Run a K-S test on the service times', 1],
            ['Feed in the real historical inputs and compare the average delay', 2],
            ['Test homogeneity before combining data sets', 1]
          ]} />
        `),

        // 37–40 · practice questions
        page(html`
          <${PQ} />
          ${pq('p1', /NOT one of Naylor and Finger/i)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /current count and the total count of a resource are both equal to one/i)}
          ${pq('p3', /recommended to always be carried out/i)}
        `),
        page(html`
          ${pq('p4', /what L̂Q does the program report/i)}
          ${pq('p7', /still in the planning stage/i)}
        `),
        page(html`
          ${pq('p5', /inputs are recorded in March/i)}
        `),

        // 41 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>verification</b> يعني نبني الموديل صح (البرنامج قصاد الـ conceptual model)، والـ <b>validation</b> يعني نبني الموديل الصح (الموديل قصاد السيستم).',
            'الـ model building تلات خطوات ومش linear؛ والشكل 7.1 فيه الـ conceptual validation والـ model verification ولفة الـ calibration.',
            'الـ verification ليها 8 حاجات منها الـ IRC؛ ولو الـ current count والـ total count بـ 1 يبقى resource ماتسابش.',
            'الـ common sense والـ documentation دايمًا، والـ trace قصير.',
            'المثال 7.1: الحساب صح <bdi dir="ltr">(7/16 = 0.4375)</bdi> بس النتيجة غلط لأن الـ STATUS غلط.',
            'الـ calibration بتتكرر، ونقدها الـ fit على data set واحدة.',
            'تلات خطوات للـ Naylor and Finger، وهي الـ face validity ثم الـ assumptions ثم الـ <bdi dir="ltr">input-output</bdi>. والـ Turing test لما مفيش statistical test.'
          ] : [
            '<b>Verification</b> = building the model right (program vs conceptual model); <b>validation</b> = building the right model (model vs real system).',
            'Model building: 3 steps, not linear. Fig 7.1: conceptual validation, model verification, calibration and validation loop.',
            '8 verification considerations, including the IRC. Current count = total count = 1: a resource never freed.',
            'Common sense and documentation always; the trace short or selective.',
            'Example 7.1: right arithmetic (7/16 = 0.4375), wrong result, because STATUS was wrong.',
            'Calibration is iterative; against fitting one data set, use a second set for the final validation.',
            'Naylor and Finger: face validity, assumptions, input-output. Historical data from the same period; Turing test when no statistical test applies.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 42 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 7!', 'خلّصت الفصل السابع!')}</${H1}>
            <${Talk} who="lens">${t('Built right, and the right model. Now you know how to check both.', 'متبني صح، وهو الموديل الصح. دلوقتي عارف تشيّك على الاتنين.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [7], t: Date.now() } }}>${t('Quiz me on Lecture 7', 'امتحنّي في محاضرة 7')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 7, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 7, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

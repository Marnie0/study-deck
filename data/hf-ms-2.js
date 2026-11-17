// Head First chapter for Modeling & Simulation Lecture 2 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Simulation by table, queueing systems (calling population, capacity, arrivals, queue behaviour and discipline, service
// mechanism, A/B/c/N/K), the single-server queue (state, events, flow diagrams), the 6-customer hand simulation, the grocery
// (100 and 20 customers, statistics, random digits), Able-Baker, the (M, N) inventory model, the newspaper seller,
// Example 2.5, the (r, x) inventory deck and the random-digit appendix.
// Every fact and number comes from the lecture's notes; every table total and statistic was re-computed with a script.
// Our own analogies, scenarios and practice numbers are marked as ours. ‡ marks a slide/notes error the notes also flag.
// Arabic follows the site's rules (see hf-compiler.js).
// lectures: [2]
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-ms2')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms2';
    s.textContent = `
.hfb .hf-ms2-t{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.15 var(--mono); color:var(--ink); }
.hfb .hf-ms2-t th, .hfb .hf-ms2-t td{ border:1px solid var(--hf-line); text-align:center; padding:3px 1px; }
.hfb .hf-ms2-t thead th{ background:var(--hf-grey); font:800 13px/1.1 var(--body); }
.hfb .hf-ms2-t thead th.pm{ background:color-mix(in srgb, var(--hf-k) 22%, var(--paper)); }
.hfb .hf-ms2-t tbody th{ background:var(--hf-grey); color:var(--hf-k); font-weight:800; }
.hfb .hf-ms2-t tr.tot td, .hfb .hf-ms2-t tr.tot th{ font-weight:800; background:var(--hf-grey2); }
.hfb .hf-ms2-t td.hot{ color:var(--hf-red); font-weight:800; }
.hfb .hf-ms2-t td.giv{ color:var(--graphite); }
.hfb .hf-ms2-t td.inp{ padding:0; }
.hfb .hf-ms2-t input{ width:100%; box-sizing:border-box; height:32px; border:0; margin:0; padding:0 2px; text-align:center; background:var(--paper); color:var(--hf-hand); font:800 15px/1 var(--mono); }
.hfb .hf-ms2-t input:focus{ outline:2px solid var(--hf-hand); outline-offset:-2px; }
.hfb .hf-ms2-t td.ok input, .hfb .hf-ms2-l .ok input{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); color:var(--ink); }
.hfb .hf-ms2-t td.no input, .hfb .hf-ms2-l .no input{ background:color-mix(in srgb, var(--hf-red) 20%, var(--paper)); color:var(--ink); }
.hfb .hf-ms2-key{ font:500 13px/1.35 var(--body); color:var(--graphite); margin:0; }
.hfb .hf-ms2-key b{ color:var(--ink); font-family:var(--mono); }
.hfb.hf-ar .hf-ms2-key{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.55; }
.hfb .hf-ms2-l{ display:grid; gap:4px; }
.hfb .hf-ms2-r{ display:grid; grid-template-columns:minmax(0,1fr) 62px 16px; gap:6px; align-items:center; padding:2px 4px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-ms2-r.ok{ border-color:var(--ok); } .hfb .hf-ms2-r.no{ border-color:var(--hf-red); }
.hfb .hf-ms2-r .lb{ font:600 14px/1.25 var(--body); color:var(--ink); }
.hfb.hf-ar .hf-ms2-r .lb{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.45; }
.hfb .hf-ms2-r .lb code{ font:700 13.5px var(--mono); background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-ms2-r input{ width:100%; box-sizing:border-box; height:30px; font:800 14.5px/1 var(--mono); text-align:center; padding:0 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--hf-hand); }
.hfb .hf-ms2-r input:focus{ outline:2px solid var(--hf-hand); outline-offset:0; }
.hfb .hf-ms2-mk{ font:800 14px/1 var(--body); }
.hfb .hf-ms2-r.ok .hf-ms2-mk{ color:var(--ok); } .hfb .hf-ms2-r.no .hf-ms2-mk{ color:var(--hf-red); }
.hfb .hf-ms2-lb .hf-ms2-why{ display:inline-block; unicode-bidi:isolate; margin-inline-start:6px; }
.hfb .hf-ms2-why{ grid-column:1 / -1; font:600 13px/1.2 var(--mono); color:var(--hf-hand); }
.hfb .hf-ms2-r.no .hf-ms2-why{ color:var(--hf-red); }
.hfb .hf-ms2-tabs{ display:flex; gap:4px; align-items:center; }
.hfb .hf-ms2-tabs > span{ flex:none; width:58px; font:800 13px/1.1 var(--body); color:var(--graphite); }
.hfb.hf-ar .hf-ms2-tabs > span{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-ms2-tabs button{ flex:1 1 0; min-width:0; font:700 13.5px/1 var(--mono); min-height:32px; padding:0; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms2-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-ms2-bill{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 10px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:3px 10px; font:500 14px/1.3 var(--body); color:var(--ink); }
.hfb .hf-ms2-bill > span:nth-child(even){ font:700 14px/1.3 var(--mono); text-align:right; }
.hfb.hf-ar .hf-ms2-bill > span:nth-child(even){ text-align:left; }
.hfb.hf-ar .hf-ms2-bill{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-ms2-bill > .tot{ font-weight:800; border-top:1.5px solid var(--hf-line); padding-top:3px; }
.hfb .hf-ms2-bill > .neg{ color:var(--hf-red); }
.hfb .hf-ms2-bill > .pos{ color:var(--ok); }
.hfb .hf-ms2-run{ font:700 15px/1.3 var(--body); color:var(--ink); text-align:center; margin:0; }
.hfb .hf-ms2-run b{ font-family:var(--mono); color:var(--hf-k); font-size:17px; }
.hfb.hf-ar .hf-ms2-run{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-ms2-bars{ display:grid; gap:3px; }
.hfb .hf-ms2-bars > div{ display:grid; grid-template-columns:30px minmax(0,1fr) 62px; gap:6px; align-items:center; font:700 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-ms2-bars i{ display:block; height:12px; border-radius:3px; background:color-mix(in srgb, var(--hf-k) 40%, var(--paper)); transition:width .5s ease; }
.hfb .hf-ms2-bars > div.on i{ background:var(--hf-k); }
.hfb .hf-ms2-bars > div.on{ color:var(--hf-k); }
.hfb .hf-ms2-bars > div > span:last-child{ text-align:right; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-ms2-bars i{ transition:none; } }
`;
    document.head.appendChild(s);
  }

  const num = s => { const m = String(s == null ? '' : s).trim().replace(',', '.'); if (!m) return NaN; const f = m.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/); return f ? +f[1] / +f[2] : (/^-?\d*\.?\d+$/.test(m) ? +m : NaN); };
  const Btns = ({ ar, onCheck, onShow, dis, score }) => html`<div className="hf-row">
    <button className="hf-btn solid" disabled=${dis} onClick=${onCheck}>${ar ? 'صحّح' : 'Check'}</button>
    <button className="hf-btn" onClick=${onShow}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
    ${score != null && html`<span className="hf-score"><bdi dir="ltr">${score}</bdi></span>`}</div>`;

  // be the clock: slide 11's six customers. Row 1 is worked; fill arrival, service begins, service ends and the wait for 2–6.
  // (checked by script: arrivals 0 2 6 7 9 15, begins 0 2 6 9 11 15, ends 2 3 9 11 12 19, waits 0 0 0 2 2 0)
  const Q6 = { ia: [null, 2, 4, 1, 2, 6], s: [2, 1, 3, 2, 1, 4], arr: [0, 2, 6, 7, 9, 15], beg: [0, 2, 6, 9, 11, 15], end: [2, 3, 9, 11, 12, 19], wait: [0, 0, 0, 2, 2, 0] };
  const QC = ['arr', 'beg', 'end', 'wait'];
  function QueueFill({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const key = (i, c) => i + c;
    const good = (i, c) => num(v[key(i, c)]) === Q6[c][i];
    let right = 0; for (let i = 1; i < 6; i++) QC.forEach(c => { if (good(i, c)) right++; });
    const set = (k, x) => { setV(Object.assign({}, v, { [k]: x })); setChk(false); };
    const show = () => { const o = {}; for (let i = 1; i < 6; i++) QC.forEach(c => { o[key(i, c)] = String(Q6[c][i]); }); setV(o); setChk(true); };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div dir="ltr"><table className="hf-ms2-t"><colgroup><col style=${{ width: '30px' }} /><col style=${{ width: '34px' }} /><col style=${{ width: '34px' }} /><col /><col /><col /><col /></colgroup>
        <thead><tr><th>#</th><th>IA</th><th>S</th><th>Arr</th><th>Beg</th><th>End</th><th className="pm">Wait</th></tr></thead>
        <tbody>${Q6.s.map((s, i) => html`<tr key=${i}><th>${i + 1}</th><td className="giv">${i ? Q6.ia[i] : '–'}</td><td className="giv">${s}</td>
          ${QC.map(c => i === 0 ? html`<td key=${c} className="giv">${Q6[c][0]}</td>` : html`<td key=${c} className=${'inp' + (chk && v[key(i, c)] != null && v[key(i, c)] !== '' ? (good(i, c) ? ' ok' : ' no') : '')}>
            <input inputMode="numeric" value=${v[key(i, c)] || ''} aria-label=${'customer ' + (i + 1) + ' ' + c} onChange=${e => set(key(i, c), e.target.value)} /></td>`)}</tr>`)}</tbody></table></div>
      <${Btns} ar=${ar} dis=${!Object.keys(v).length} onCheck=${() => setChk(true)} onShow=${show} score=${chk ? right + ' / 20' : null} />
      ${chk && right === 20 && html`<p className="hf-hand" style=${{ fontSize: '18px' }}>${ar ? 'مظبوط! الزبون 4 و5 بس اللي استنوا، دقيقتين كل واحد.' : 'Spot on! Only customers 4 and 5 wait, 2 minutes each.'}</p>`}
    </div>`;
  }

  // a list of number questions with one input each: rows [label (html), answer, working shown after checking]
  function Fill({ id, rows, tol = 0.006, inline, ltr }) {
    const A_LEFT = 'left';
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const good = i => Math.abs(num(v[i]) - rows[i][1]) <= tol;
    const right = rows.filter((_, i) => good(i)).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-ms2-l">${rows.map((r, i) => { const has = v[i] != null && v[i] !== '', st = chk && has ? (good(i) ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'hf-ms2-r' + st}><span className="lb hf-ms2-lb" dir=${ltr ? 'ltr' : null} style=${ltr ? { textAlign: A_LEFT } : null}>${T(r[0])}${inline && chk && has ? html` <span className="hf-ms2-why" dir="ltr">${T(r[2])}</span>` : null}</span>
          <input inputMode="decimal" dir="ltr" value=${v[i] || ''} aria-label=${String(r[0]).replace(/<[^>]+>/g, '')} onChange=${e => { setV(Object.assign({}, v, { [i]: e.target.value })); setChk(false); }} />
          <span className="hf-ms2-mk">${chk && has ? (good(i) ? '✓' : '✗') : ''}</span>
          ${!inline && chk && has && html`<span className="hf-ms2-why" dir="ltr">${T(r[2])}</span>`}</div>`; })}</div>
      <${Btns} ar=${ar} dis=${!Object.keys(v).length} onCheck=${() => setChk(true)} onShow=${() => { const o = {}; rows.forEach((r, i) => { o[i] = String(Math.round(r[1] * 100) / 100); }); setV(o); setChk(true); }} score=${chk ? right + ' / ' + rows.length : null} />
    </div>`;
  }

  // the newspaper seller's day: pick how many papers to buy and the day's demand, see the bill (prices from Example 2.4, in cents)
  // and the 20-day total for that policy with the notes' own random digits (only 70 is worked in the notes; the others are our re-run, checked by script)
  const NEWS20 = { 50: 10710, 60: 15030, 70: 17490, 80: 16230, 90: 11250 };
  const usd = c => (c < 0 ? '−' : '') + '$' + (Math.abs(c) / 100).toFixed(2);
  function NewsCalc() {
    const ar = useAr();
    const [Q, setQ] = H.K.useSlot('newsQ', 70);
    const [D, setD] = H.K.useSlot('newsD', 60);
    const sold = Math.min(D, Q), rev = 50 * sold, cost = 33 * Q, lost = 17 * Math.max(0, D - Q), salv = 5 * Math.max(0, Q - D), p = rev - cost - lost + salv;
    const best = Math.max(...Object.values(NEWS20));
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-ms2-tabs" dir=${ar ? 'rtl' : 'ltr'}><span>${ar ? 'اشتري' : 'Buy'}</span><div className="hf-ms2-tabs" dir="ltr" style=${{ flex: '1 1 auto' }}>${[50, 60, 70, 80, 90].map(q => html`<button key=${q} aria-pressed=${String(Q === q)} onClick=${() => setQ(q)}>${q}</button>`)}</div></div>
      <div className="hf-ms2-tabs" dir=${ar ? 'rtl' : 'ltr'}><span>${ar ? 'الطلب' : 'Demand'}</span><div className="hf-ms2-tabs" dir="ltr" style=${{ flex: '1 1 auto' }}>${[40, 50, 60, 70, 80, 90, 100].map(d => html`<button key=${d} aria-pressed=${String(D === d)} onClick=${() => setD(d)}>${d}</button>`)}</div></div>
      <div className="hf-ms2-bill">
        <span>${ar ? html`الـ revenue <bdi dir="ltr">(${sold} × 50¢)</bdi>` : html`Revenue (${sold} × 50¢)`}</span><span dir="ltr">${usd(rev)}</span>
        <span>${ar ? html`تمن الجرايد <bdi dir="ltr">(${Q} × 33¢)</bdi>` : html`Cost of papers (${Q} × 33¢)`}</span><span className="neg" dir="ltr">−${usd(cost)}</span>
        <span>${ar ? html`الـ lost profit <bdi dir="ltr">(${Math.max(0, D - Q)} × 17¢)</bdi>` : html`Lost profit (${Math.max(0, D - Q)} × 17¢)`}</span><span className="neg" dir="ltr">−${usd(lost)}</span>
        <span>${ar ? html`الـ salvage <bdi dir="ltr">(${Math.max(0, Q - D)} × 5¢)</bdi>` : html`Salvage (${Math.max(0, Q - D)} × 5¢)`}</span><span dir="ltr">+${usd(salv)}</span>
        <span className="tot">${ar ? 'ربح اليوم' : 'Daily profit'}</span><span dir="ltr" className=${'tot ' + (p < 0 ? 'neg' : 'pos')}>${usd(p)}</span>
      </div>
      <p className="hf-ms2-run">${ar ? html`نفس الـ 20 يوم بتوع الـ notes لو اشتريت ${Q}: <b><bdi dir="ltr">${usd(NEWS20[Q])}</bdi></b>` : html`The notes' 20 days, buying ${Q}: <b>${usd(NEWS20[Q])}</b>`}</p>
      <div className="hf-ms2-bars" dir="ltr">${[50, 60, 70, 80, 90].map(q => html`<div key=${q} className=${q === Q ? 'on' : ''}><span>${q}</span><i style=${{ width: (NEWS20[q] / best * 100) + '%' }}></i><span>${usd(NEWS20[q])}</span></div>`)}</div>
    </div>`;
  }

  H.chapters.ms[2] = {
    title: 'Simulation Examples: Queueing and Inventory Systems',
    kicker: 'Chapter 2',
    run: 'queueing and inventory systems',
    ar: { title: 'أمثلة Simulation: الـ Queueing والـ Inventory Systems', kicker: 'الفصل 2', run: 'الـ queueing والـ inventory systems' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap, Reveal } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arL = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[2]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src)
      const mq = (id, re) => { const i = lec.quiz.findIndex(x => re.test(strip(x.q)) && x.src); return i < 0 ? null : html`<${MCQ} id=${id} q=${lec.quiz[i]} why=${(arL.quiz || [])[i]} />`; };
      // the site's practice questions (no src), from the lecture's quiz or its extra questions
      const pq = (id, re, from = 'quiz') => { const list = lec[from] || []; const i = list.findIndex(x => re.test(strip(x.q)) && !x.src); return i < 0 ? null : html`<${MCQ} id=${id} q=${list[i]} why=${(arL[from] || [])[i]} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const figPage = (name, en, ar, extra) => page(html`<${H2}>${t(en, ar)}</${H2}><${Fig} name=${name} />${extra || null}`);
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;

      return [
        // 0 · where we left off + how this chapter works
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter met systems, models and simulation in general. This one gets its hands dirty: we <b>simulate by hand, on a table</b>, a checkout, two carhops, a newspaper seller and a warehouse.',
            'الفصل اللي فات اتعرّفنا فيه على الـ systems والـ models والـ simulation بشكل عام. الفصل ده هنوسّخ إيدينا: هنعمل <b>simulation بإيدينا على table</b> لكاشير، واتنين carhops، وبياع جرايد، ومخزن.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X("You're third in line at the supermarket. How long will you wait? What would you need to know to <i>work it out</i> instead of guessing?",
            'إنت التالت في طابور السوبرماركت. هتستنى قد إيه؟ محتاج تعرف إيه عشان <i>تحسبها</i> بدل ما تخمّن؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will fill simulation rows, read random digits and price a newspaper day yourself.', '<b>حل التمارين.</b> هتملا صفوف simulation، وتقرا random digits، وتحسب ربح يوم بياع الجرايد بإيدك.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake in the slides or notes, and what was meant.', 'معناها فيه غلطة في السلايدز أو النوتس، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and practice numbers.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات وأرقام تدريب مننا.')}</span></div>
          </div>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>Modeling & Simulation` : html`Chapter two<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Please Take a Number', 'خد رقم واستنى دورك')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('simulation examples: queueing and inventory systems', 'أمثلة simulation: الـ queueing والـ inventory systems')}</p></div>
          <${Talk} who="cust">${t("I've been standing here forever. Is anyone even measuring this?", 'أنا واقف هنا من سنة. هو حد بيقيس ده أصلًا؟')}</${Talk}>
          <${Talk} who="table" flip=${true}>${X('I am. Give me the <b>interarrival times</b> and the <b>service times</b>, and I will tell you your wait to the minute.', 'أنا. اديني الـ <b>interarrival times</b> والـ <b>service times</b>، وأنا أقولك هتستنى قد إيه بالدقيقة.')}</${Talk}>
          <${P}>${X('No calculus, no computer yet: a <b>table</b>, a <b>clock</b> and a handful of <b>random digits</b>. Then we swap the shoppers for newspapers and warehouse stock.',
            'لا calculus ولا كمبيوتر لسه: <b>table</b> و<b>clock</b> وشوية <b>random digits</b>. وبعدين هنبدّل الزباين بجرايد وبضاعة في مخزن.')}</${P}>
        `, { sec: t('Meet the queue', 'اتعرّف على الطابور') }),

        // 2 · simulation by table
        page(html`
          <${H1}>${t('Simulation on a table', 'الـ Simulation على table')}</${H1}>
          <${P}>${X('Simulation is introduced by <b>manually simulating on a table</b>, with <b>pen-and-paper</b> or a <b>spreadsheet</b>. Three steps (slide 5):',
            'الـ simulation بنبدأ نشرحها إننا <b>نعملها بإيدينا على table</b>، <b>بالورقة والقلم</b> أو على <b>spreadsheet</b>. تلات خطوات (slide 5):')}</${P}>
          <${UL} items=${A ? [
            'نحدد <b>الـ characteristics بتاعة كل input</b>.',
            'نبني table فيه <b>p inputs</b> و<b>response واحد</b>:<span class="ltr">x<sub>ij</sub>, j = 1, …, p &nbsp;&nbsp; y<sub>i</sub>, i = 1, …, n</span>',
            'لكل repetition i، <b>نولّد قيمة لكل input</b> ونحسب الـ <b>response</b>.'
          ] : [
            'Determine the <b>characteristics of each input</b>.',
            'Construct a table with <b>p inputs</b> x<sub>ij</sub>, j = 1, …, p, and <b>one response</b> y<sub>i</sub>, i = 1, …, n.',
            'For each repetition i, <b>generate a value for each input</b> and <b>calculate the response</b>.'
          ]} />
          <${Def}>${X('The header row is <b>static meta data</b>; rows 1 … n are <b>dynamic data during the simulation run</b>.', 'صف الـ header هو <b>static meta data</b>؛ والـ rows من 1 لـ n هي <b>dynamic data during simulation run</b>.')}</${Def}>
          <${Hand} tilt=${true}>${t("Our analogy: the header is the recipe, every row is one dish you cooked from it.", 'تشبيه من عندنا: الـ header هو الوصفة، وكل row طبق طبخته منها.')}</${Hand}>
        `, { sec: t('Simulation by table', 'الـ Simulation بالـ table') }),
        figPage('ms-simtable', 'The simulation table, step by step', 'الـ simulation table خطوة بخطوة'),

        // 4 · queueing systems
        page(html`
          <${H1}>${t('Why simulate queues?', 'ليه نعمل simulation للطوابير؟')}</${H1}>
          <${P} small=${true}>${X('Customers arrive from time to time, join a <b>queue (waiting line)</b>, are eventually served and leave. Queues are everyday systems worth analysing.',
            'الزباين بيوصلوا من وقت للتاني، ويدخلوا <b>queue (طابور انتظار)</b>، وفي الآخر بيتخدموا ويمشوا. الطوابير أنظمة بنشوفها كل يوم وتستاهل نحللها.')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>customer</b>: أي حاجة بتطلب خدمة: ناس، machines، عربيات نقل، عيانين، طيارات، e-mail، orders.',
            'الـ <b>server</b>: اللي بيقدّم الخدمة: موظف استقبال، ميكانيكي، طاقم طبي، أوناش، ممرات المطار، مكن تغليف.',
            'مقاييس الأداء: الـ <b>server utilization</b> (نسبة الوقت اللي مشغول فيه)، و<b>طول الطابور</b>، و<b>تأخير الزباين</b>.'
          ] : [
            '<b>Customer</b>: any entity that requests service: people, machines, trucks, patients, airplanes, e-mail, orders.',
            '<b>Server</b>: whatever provides it: receptionists, mechanics, medical staff, cranes, runways, automatic packers.',
            'Measures: <b>server utilization</b> (% of time busy), <b>length of waiting lines</b>, <b>delays of customers</b>.'
          ]} />
          <${Box} kind="watch" title=${t('Five things describe a queue (slide 8)', 'خمس حاجات بتوصف أي queue (slide 8)')}>
            <p className="hf-p small">${X('<b>Calling population</b> · <b>arrival rate</b> · <b>service mechanism</b> · <b>system capacity</b> · <b>queueing discipline</b>. A "review period" is <b>not</b> one: that belongs to inventory.',
              'الـ <b>calling population</b> والـ <b>arrival rate</b> والـ <b>service mechanism</b> والـ <b>system capacity</b> والـ <b>queueing discipline</b>. الـ "review period" <b>مش</b> منهم، دي بتاعة الـ inventory.')}</p></${Box}>
        `, { sec: t('Queueing systems', 'الـ Queueing systems') }),
        figPage('ms-queue-sys', 'Population, line, server', 'الـ population والطابور والـ server'),

        // 6 · calling population and capacity
        page(html`
          <${H2}>${t('Who could show up, and is there room?', 'مين ممكن ييجي، وفيه مكان؟')}</${H2}>
          <${Def}>${X('<b>Calling population</b>: the population of potential customers. It may be <b>finite</b> or <b>infinite</b>.', 'الـ <b>Calling population</b>: مجموعة الزباين المحتملين، وممكن تكون <b>finite</b> أو <b>infinite</b>.')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b>finite</b>: الـ arrival rate <b>بيعتمد</b> على عدد اللي بيتخدموا واللي مستنيين. خمس مكن tire-curing وعامل واحد: لو الخمسة عطلانين، الـ arrival rate <b>صفر</b>.',
            'الـ <b>infinite</b>: الـ arrival rate <b>مش بيتأثر</b> باللي دخلوا الـ system، ومن غير rush hours بنعتبره ثابت (مطعم، بنك، مكن كتير جدًا وفني واحد).'
          ] : [
            '<b>Finite</b>: the arrival rate <b>depends</b> on how many are being served and waiting. Five tire-curing machines, one worker: when all five are down, the arrival rate is <b>zero</b>.',
            '<b>Infinite</b>: the arrival rate is <b>not affected</b> by those who joined the system; with no rush hours it is assumed constant (restaurant, bank, a very large group of machines).'
          ]} />
          <${Def}>${X('<b>System capacity</b>: many systems limit how many can wait. Then the <b>arrival rate</b> (arrivals per time unit) differs from the <b>effective rate</b> (those who arrive <b>and enter</b>).',
            'الـ <b>System capacity</b>: أنظمة كتير ليها حد للي يستنوا. ساعتها الـ <b>arrival rate</b> (اللي وصلوا في وحدة الزمن) بيختلف عن الـ <b>effective rate</b> (اللي وصلوا <b>ودخلوا</b>).')}</${Def}>
          <${P} small=${true}>${X('Limited: a <b>car wash</b> with room for 10 cars; a car that finds it full goes straight back to the calling population. Unlimited: <b>concert ticket sales</b> for students.',
            'محدودة: <b>مغسلة عربيات</b> فيها مكان لـ 10 عربيات بس؛ العربية اللي تلاقيها مليانة ترجع على طول للـ calling population. مش محدودة: <b>بيع تذاكر حفلة</b> للطلبة.')}</${P}>
        `),
        figPage('ms-finite-pop', 'Five machines, one worker', 'خمس مكن وعامل واحد', html`<${P} small=${true}>${X('A machine outside the system is <b>pending</b>; a <b>run time</b> A is the time from leaving until the next arrival, S is its time in the system.', 'الـ machine اللي برّه الـ system بتبقى <b>pending</b>؛ والـ <b>run time</b> (A) هو الوقت من ما تخرج لحد ما توصل تاني، والـ S وقتها جوه الـ system.')}</${P}>`),

        // 8 · arrivals
        page(html`
          <${H2}>${t('How do customers arrive?', 'الزباين بيوصلوا إزاي؟')}</${H2}>
          <${P} small=${true}>${X('For infinite populations, arrivals are described by the <b>interarrival times</b> of successive customers. Three cases:', 'في الـ infinite populations، الوصول بيتوصف بالـ <b>interarrival times</b> بين كل زبون واللي بعده. تلات حالات:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Random arrivals</b>: أهم model هو الـ <b>Poisson arrival process</b> (مطاعم، بنوك drive-in، مكالمات السنترال).',
            'الـ <b>Scheduled arrivals</b>: الـ interarrival ثابت، أو ثابت زائد/ناقص حاجة صغيرة random (عيانين عند دكتور، رحلات طيران).',
            'فيه <b>زبون واحد على الأقل دايمًا</b> في الطابور، فالـ server عمره ما بيقعد idle لقلة الزباين (زي خامات موجودة دايمًا).'
          ] : [
            '<b>Random arrivals</b>: the key model is the <b>Poisson arrival process</b> (restaurants, drive-in banks, calls to an exchange).',
            '<b>Scheduled arrivals</b>: constant interarrival times, or constant ± a small random amount (patients at a physician, airline flights).',
            '<b>At least one customer always present</b>, so the server is never idle for lack of customers (raw material always available).'
          ]} />
          <${Talk} who="dice">${X("In the hand simulations, I'm the one choosing the interarrival times. Slide 10: <b>events occur randomly</b>.", 'في الـ hand simulations أنا اللي بختار الـ interarrival times. الـ slide 10: <b>الـ events بتحصل random</b>.')}</${Talk}>
          <${Box} kind="relax"><p className="hf-p small">${X("You don't need Poisson's formula here: that is Lecture 3. Today the distributions are small tables.", 'مش محتاج معادلة الـ Poisson هنا، دي في محاضرة 3. النهارده الـ distributions مجرد tables صغيرة.')}</p></${Box}>
        `),

        // 9 · behaviour + discipline
        page(html`
          <${H2}>${t('Life in the line', 'الحياة جوه الطابور')}</${H2}>
          <${P} small=${true}>${t('Queue behaviour: what customers do while they wait.', 'الـ Queue behavior: الزباين بيعملوا إيه وهم مستنيين.')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Balk</b>: يمشي أول ما يشوف الطابور طويل.',
            'الـ <b>Renege</b>: يقف شوية، ويمشي لما يلاقي الطابور ماشي ببطء.',
            'الـ <b>Jockey</b>: ينقل من طابور لطابور لو حس إنه اختار الطابور البطيء.'
          ] : [
            '<b>Balk</b>: leave on seeing the line is too long.',
            '<b>Renege</b>: leave after being in line, seeing it moves too slowly.',
            '<b>Jockey</b>: move from one line to another, thinking they chose a slow line.'
          ]} />
          <${Def}>${X('<b>Queue discipline</b>: the logical ordering of customers; it decides who is served when the server becomes free: <b>FIFO</b>, <b>LIFO</b>, <b>SIRO</b> (service in random order), <b>SPT</b> (shortest processing time first), <b>PR</b> (priority). In a job shop: due dates and expected processing times.',
            'الـ <b>Queue discipline</b>: الترتيب المنطقي للزباين؛ بيحدد مين يتخدم لما الـ server يفضى: الـ <b>FIFO</b> والـ <b>LIFO</b> والـ <b>SIRO</b> (service in random order) والـ <b>SPT</b> (shortest processing time first) والـ <b>PR</b> (priority). وفي الـ job shop: بالـ due dates والـ processing times المتوقعة.')}</${Def}>
          <${Hand} tilt=${true}>${A ? html`حيلة من عندنا: الـ <b>B</b>alk قبل الطابور، والـ <b>R</b>enege جوّاه، والـ <b>J</b>ockey بين طابورين.` : html`Our trick: <b>B</b>alk before the line, <b>R</b>enege inside it, <b>J</b>ockey between lines.`}</${Hand}>
        `),

        // 10 · sort: balk / renege / jockey
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Name that behaviour. Tap <b>B</b> (balk), <b>R</b> (renege) or <b>J</b> (jockey). Scenarios are ours.', 'سمّي السلوك. دوس <b>B</b> للـ balk أو <b>R</b> للـ renege أو <b>J</b> للـ jockey. المواقف من عندنا.')}</p></${Box}>
          <${Sort} id="bhv" bins=${[['B', 'Balk'], ['R', 'Renege'], ['J', 'Jockey']]} items=${A ? [
            ['شاف 15 واحد عند الكاشير الوحيد ورجع من الباب', 0],
            ['استنى 10 دقايق والطابور ما اتحركش، فساب السلة ومشي', 1],
            ['الكاشير اللي جنبه شكله أسرع، فنقل عليه', 2],
            ['سواق شاف طابور عربيات طويل عند الـ drive-through وكمّل طريقه', 0],
            ['مسافر نقل من طابور تفتيش لطابور تاني في المطار', 2],
            ['زبونة في البنك قعدت 20 دقيقة وزهقت ومشيت', 1]
          ] : [
            ['Sees 15 people at the only checkout and turns back at the door', 0],
            ['Waits 10 minutes, the line has not moved, drops the basket and leaves', 1],
            ['The next checkout looks faster, so he switches to it', 2],
            ['A driver sees a long line of cars at the drive-through and drives on', 0],
            ['A passenger moves from one security line to another', 2],
            ['A bank customer gives up after 20 minutes and walks out', 1]
          ]} />
          <${Grow} />
          <${Talk} who="cust" flip=${true}>${t("For the record: I'm a reneger. I always give it ten minutes.", 'للعلم: أنا من بتوع الـ renege. دايمًا بدّي الطابور عشر دقايق.')}</${Talk}>
        `),

        // 11 · service mechanism
        page(html`
          <${H2}>${t('The service mechanism', 'الـ Service mechanism')}</${H2}>
          <${P} small=${true}>${X('Service times S<sub>1</sub>, S<sub>2</sub>, … may be <b>constant</b> or <b>random</b>. If random, they are usually <b>IID</b> (independent and identically distributed): exponential, Weibull, gamma… They may differ by customer type, class or priority, time of day or line length.',
            'الـ service times بتاعة الزباين ممكن تكون <b>constant</b> أو <b>random</b>. ولو random، غالبًا بتبقى <b>IID</b> (independent and identically distributed): الـ exponential والـ Weibull والـ gamma… وممكن تختلف حسب نوع الزبون أو الـ class أو الـ priority أو الوقت أو طول الطابور.')}</${P}>
          <${Def}>${X('A system has <b>service centers</b> joined by queues. Each center has <b>c parallel servers</b>: <b>single</b> (c = 1), <b>multiple</b> (1 &lt; c &lt; ∞) or <b>unlimited</b> (c = ∞). <b>Self-service</b> is usually treated as unlimited servers.',
            'الـ system فيه <b>service centers</b> بينهم queues. كل center فيه <b>c parallel servers</b>: الـ <b>single</b> لما <bdi dir="ltr">c = 1</bdi>، والـ <b>multiple</b> لما <bdi dir="ltr">1 &lt; c &lt; ∞</bdi>، والـ <b>unlimited</b> لما <bdi dir="ltr">c = ∞</bdi>. والـ <b>self-service</b> بنعتبره unlimited servers.')}</${Def}>
          <${P} small=${true}>${X('Example 2.1, a discount warehouse: customers <b>serve themselves</b> or wait for one of <b>3 clerks</b>, then pay a <b>single cashier</b>.', 'المثال 2.1، مخزن تخفيضات: الزباين <b>بيخدموا نفسهم</b> أو يستنوا واحد من <b>3 clerks</b>، وبعدين يدفعوا عند <b>كاشير واحد</b>.')}</${P}>
        `, { sec: t('Service and notation', 'الخدمة والـ notation') }),
        figPage('ms-warehouse', 'The discount warehouse: c = ∞, 3, 1', 'مخزن التخفيضات: c = ∞ و3 و1'),

        // 13 · notation
        page(html`
          <${H1}>${t('A queue in five letters', 'الطابور في خمس حروف')}</${H1}>
          <${Code} lines=${['A / B / c / N / K']} />
          <${UL} items=${A ? [
            'الـ <b>A</b>: الـ interarrival-time distribution، والـ <b>B</b>: الـ service-time distribution.',
            'الـ <b>c</b>: عدد الـ parallel servers، والـ <b>N</b>: الـ system capacity، والـ <b>K</b>: حجم الـ calling population.',
            'رموز A وB: الـ <b>M</b> (exponential أو Markov)، والـ <b>D</b> (constant أو deterministic)، والـ <bdi dir="ltr"><b>E<sub>k</sub></b></bdi> (Erlang of order k)، والـ <b>GI</b> (general independent).'
          ] : [
            '<b>A</b>: interarrival-time distribution; <b>B</b>: service-time distribution.',
            '<b>c</b>: number of parallel servers; <b>N</b>: system capacity; <b>K</b>: size of the calling population.',
            'Symbols for A and B: <b>M</b> (exponential or Markov), <b>D</b> (constant or deterministic), <b>E<sub>k</sub></b> (Erlang of order k), <b>GI</b> (general independent).'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>M/M/1/∞/∞</b> is shortened to <b>M/M/1</b>. The tire-curing shop (one worker, five machines) is <b>G/G/1/5/5</b>: capacity 5 <i>and</i> population 5.',
            'الـ <bdi dir="ltr"><b>M/M/1/∞/∞</b></bdi> بنختصرها لـ <bdi dir="ltr"><b>M/M/1</b></bdi>. ومحل الـ tire-curing (عامل واحد وخمس مكن) هو <bdi dir="ltr"><b>G/G/1/5/5</b></bdi>: الـ capacity بـ 5 <i>والـ</i> population بـ 5.')}</p></${Box}>
          <${Hand} red=${true}>${t('N is capacity, K is population. Not the other way round.', 'الـ N هي الـ capacity، والـ K هي الـ population. مش العكس.')}</${Hand}>
        `),

        // 14 · match notation
        page(html`
          <${H2}>${t('Who means what?', 'مين معناه إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a letter, then its meaning.', 'دوس على الحرف، وبعدين على معناه.')}</${P}>
          <${Match} id="abc" left=${['A', 'B', 'c', 'N', 'K', 'M', 'D']}
            right=${A ? ['الـ system capacity', 'الـ interarrival-time distribution', 'حجم الـ calling population', 'الـ service-time distribution', 'عدد الـ parallel servers', 'الـ constant (deterministic)', 'الـ exponential (Markov)']
              : ['System capacity', 'Interarrival-time distribution', 'Size of the calling population', 'Service-time distribution', 'Number of parallel servers', 'Constant (deterministic)', 'Exponential (Markov)']}
            answer=${[1, 3, 4, 0, 2, 6, 5]} />
        `),
        figPage('ms-notation', 'Read the notation', 'اقرا الـ notation'),

        // 16 · single-server queue
        page(html`
          <${H1}>${t('One server, one line', 'server واحد وطابور واحد')}</${H1}>
          <${UL} items=${A ? [
            'الـ calling population <b>infinite</b>، فالـ arrival rate مش بيتغير. والوصول واحد واحد random، والـ capacity ملهاش حد.',
            'الخدمة بنظام <b>FIFO</b>. والوصول بيتحدد بالـ <b>inter-arrival time</b>، والـ service times من distribution.',
            'الـ <b>arrival rate أقل من الـ service rate</b> يبقى <b>stable system</b>، غير كده الطابور بيكبر من غير حد ويبقى <b>unstable</b>.'
          ] : [
            'Calling population <b>infinite</b>: arrival rate does not change. Arrivals one at a time, at random; no capacity limit.',
            'Served <b>FIFO</b>. Arrivals defined by the <b>inter-arrival time</b> distribution; service times by a distribution.',
            '<b>Arrival rate &lt; service rate</b> ⇒ <b>stable system</b>. Otherwise the line grows unbounded ⇒ <b>unstable</b>.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('The final exam flipped it: <i>"the arrival rate must be less than the service rate to say the system is <b>unstable</b>"</i> is <b>False</b>. Less than ⇒ <b>stable</b>.',
            'الامتحان قلبها:<span class="ltr"><i>"…arrival rate must be less than the service rate to say the system is <b>unstable</b>"</i></span>دي <b>غلط</b>. أقل يبقى <b>stable</b>.')}</p></${Box}>
        `, { sec: t('Single-server queue', 'الـ Single-server queue') }),
        page(html`
          <${H2}>${t('State and events', 'الـ State والـ events')}</${H2}>
          <${P} small=${true}>${X('The system: a <b>server</b>, <b>units</b> (in the queue or being served) and a <b>clock</b>.', 'الـ system فيه <b>server</b> و<b>units</b> (في الـ queue أو بتتخدم) و<b>clock</b>.')}</${P}>
          <${Def}>${X('<b>State</b>: the <b>number of units in the system</b> and the <b>status of the server</b> (idle, busy). An <b>event</b> is a set of circumstances that causes an <b>instantaneous change</b> in the state: only <b>arrival</b> and <b>departure</b>.',
            'الـ <b>State</b>: <b>عدد الـ units في الـ system</b> و<b>حالة الـ server</b> (idle أو busy). والـ <b>event</b> مجموعة ظروف بتعمل <b>تغيير لحظي</b> في الـ state: وهما اتنين بس، الـ <b>arrival</b> والـ <b>departure</b>.')}</${Def}>
          <${Talk} who="clock">${X('And I am the <b>simulation clock</b>: I track simulated time.', 'وأنا الـ <b>simulation clock</b>: بتابع الوقت المتمثّل.')}</${Talk}>
          <${Talk} who="cust" flip=${true}>${X('So when I walk in, the count goes up by one, and when I leave, down by one. Nothing in between changes it?', 'يعني لما أدخل العدد يزيد واحد، ولما أمشي يقل واحد، ومفيش حاجة في النص بتغيّره؟')}</${Talk}>
          <${Talk} who="clock">${t('Exactly. So I can jump straight from one event to the next.', 'بالظبط. فأقدر أنط من event للي بعده على طول.')}</${Talk}>
        `),
        figPage('ms-ssq-state', 'State and the two events', 'الـ state والـ two events'),
        figPage('ms-event-flows', 'Arrival and departure, flow by flow', 'الـ arrival والـ departure، flow flow'),
        page(html`
          <${Box} kind="brain"><p className="hf-p small">${X('A unit arrives: the server is <b>idle</b> but the queue is <b>not empty</b>. Why can that never happen?', 'وصلت unit: الـ server <b>idle</b> بس الـ queue <b>مش فاضية</b>. ليه ده عمره ما يحصل؟')}</p></${Box}>
          <${Fig} name="ms-event-grids" />
        `),

        // 20 · six customers by hand
        page(html`
          <${H1}>${t('Six customers, by hand', 'ست زباين بالإيد')}</${H1}>
          <${P} small=${true}>${X('Slide 11: interarrival and service times come <b>from distributions</b>; the run is built by <b>meshing clock, arrival and service times</b>. Three rules:',
            'الـ slide 11: الـ interarrival والـ service times جايين <b>من distributions</b>؛ والـ run بيتبني <b>بدمج الـ clock والـ arrival والـ service times</b>. تلات قواعد:')}</${P}>
          <${Code} lines=${['arr(i)  = arr(i−1) + IA(i)', 'beg(i)  = max(arr(i), end(i−1))', 'end(i)  = beg(i) + S(i)', 'wait(i) = beg(i) − arr(i)', 'sys(i)  = end(i) − arr(i)', 'idle(i) = arr(i) − end(i−1), if > 0']} />
          <${Talk} who="dev">${X('So the <code>max</code> is the whole trick?', 'يعني الـ <code>max</code> هي الحكاية كلها؟')}</${Talk}>
          <${Talk} who="clock" flip=${true}>${X('Yes: you start at your arrival or when the last customer leaves, whichever is <b>later</b>.', 'أيوه: بتبدأ عند وصولك أو لما اللي قبلك يخلص، أيهما <b>أبعد</b>.')}</${Talk}>
        `, { sec: t('Six customers by hand', 'ست زباين بالإيد') }),

        // 21 · be the clock
        page(html`
          <${Box} kind="pencil" title=${t('Be the clock', 'خليك إنت الـ clock')}><p className="hf-p small">${X("Slide 11's customers. IA = interarrival, S = service. Row 1 is done; fill the rest.", 'زباين الـ slide 11. الـ IA هو الـ interarrival والـ S هو الـ service. الصف 1 محلول، كمّل الباقي.')}</p></${Box}>
          <${QueueFill} id="q6" />
          <${Grow} />
          <${Hand} arrow="up">${X('customer 4 arrives at 7, but 3 is served until 9', 'الزبون 4 بيوصل عند 7، بس الـ 3 بيتخدم لحد 9')}</${Hand}>
        `),
        figPage('ms-mesh6', 'Meshing the six customers', 'دمج الست زباين'),
        figPage('ms-chrono', 'The events in clock order', 'الـ events بترتيب الـ clock', html`<${Hand} red=${true}>${t('time 2 and time 9: a departure and an arrival at the same moment', 'عند 2 وعند 9: departure وarrival في نفس اللحظة')}</${Hand}>`),

        // 24 · no dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['لو departure وarrival حصلوا في نفس اللحظة، مين الأول؟', 'في الـ slide 12 الـ departure مكتوب الأول: عند 2 الزبون 1 بيمشي والـ 2 بيوصل، فالعدد بيفضل 1 ومحدش بيستنى.'],
            ['ليه الزبون 1 ملوش interarrival time؟', 'لأنه موجود عند الزمن 0. فلو عندك n زبون، عندك <bdi dir="ltr">n − 1</bdi> interarrival times بس، وده هيفرق في المتوسط بعد شوية.'],
            ['الـ idle time بيتحسب للزبون؟', 'لأ، ده وقت الـ <b>server</b> اللي قعده فاضي <b>قبل</b> ما الزبون ده يوصل. في الست زباين: من 3 لـ 6 ومن 12 لـ 15، يعني 6 دقايق.'],
            ['هو الـ table ده منين أصلًا؟', 'الأوقات جاية من distributions. في المثال الجاي هنولّدها بنفسنا من الـ random digits.']
          ] : [
            ['If a departure and an arrival happen at the same moment, which goes first?', 'Slide 12 lists the departure first: at time 2 customer 1 leaves and 2 arrives, so the count stays at 1 and nobody waits.'],
            ['Why does customer 1 have no interarrival time?', 'It is there at time 0. So n customers give only <b>n − 1</b> interarrival times, which matters for the average later.'],
            ['Is idle time a customer\'s?', 'No: it is the <b>server\'s</b> empty time <b>before</b> that customer arrives. For the six: 3 to 6 and 12 to 15, 6 minutes.'],
            ['Where does the table come from?', 'The times come from distributions. In the next example we generate them ourselves from random digits.']
          ]} />
        `),

        // 25 · the grocery
        page(html`
          <${H1}>${t('Example 1: a small grocery', 'المثال 1: بقالة صغيرة')}</${H1}>
          <${UL} items=${A ? [
            'فيه <b>checkout counter واحد</b> بس.',
            'الزباين بيوصلوا كل <bdi dir="ltr">{1, …, 8}</bdi> دقايق، كل قيمة باحتمال <b>0.125</b> (uniform).',
            'الـ service times من <bdi dir="ltr">{1, …, 6}</bdi> دقايق باحتمالات مش متساوية: <bdi dir="ltr">0.10, 0.20, 0.30, 0.25, 0.10, 0.05</bdi>.',
            'بنعمل simulation لـ <b>100 زبون</b>.'
          ] : [
            '<b>One checkout counter</b>.',
            'Customers arrive every {1, …, 8} minutes, each with probability <b>0.125</b> (uniform).',
            'Service times from {1, …, 6} minutes with unequal probabilities: 0.10, 0.20, 0.30, 0.25, 0.10, 0.05.',
            'Consider the system for <b>100 customers</b>.'
          ]} />
          <${Box} kind="watch" title=${t('The slide admits two simplifications', 'السلايد بتعترف بتبسيطين')}><p className="hf-p small">${X('The <b>sample size is too small</b> to draw reliable conclusions, and the <b>initial condition is not considered</b>.', 'الـ <b>sample size صغير أوي</b> عشان نطلع باستنتاجات نعتمد عليها، والـ <b>initial condition مش واخدينها في الاعتبار</b>.')}</p></${Box}>
          <${P} small=${true}>${X('<b>Cumulative probability</b> = the running sum of the probabilities. It is what turns random digits into times.', 'الـ <b>Cumulative probability</b> هو المجموع التراكمي للاحتمالات، وهو اللي بيحوّل الـ random digits لأوقات.')}</${P}>
        `, { sec: t('Example 1: the grocery', 'المثال 1: البقالة') }),
        figPage('ms-grocery-dist', 'The two input distributions', 'الـ two input distributions'),

        // 27 · the 100-customer table
        page(html`
          <${H2}>${t('100 customers (slide 15)', 'الـ 100 زبون (slide 15)')}</${H2}>
          <div dir="ltr" className="hf-in"><table className="hf-ms2-t"><colgroup><col style=${{ width: '34px' }} /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup>
            <thead><tr><th>#</th><th>IA</th><th>Arr</th><th>S</th><th>Beg</th><th>End</th><th className="pm">Wait</th><th className="pm">Sys</th><th className="pm">Idle</th></tr></thead>
            <tbody>${[[1, '–', 0, 4, 0, 4, 0, 4, 0], [2, 1, 1, 2, 4, 6, 3, 5, 0], [3, 1, 2, 5, 6, 11, 4, 9, 0], [4, 6, 8, 4, 11, 15, 3, 7, 0], [5, 3, 11, 1, 15, 16, 4, 5, 0], [6, 7, 18, 5, 18, 23, 0, 5, 2], ['⋮', '', '', '', '', '', '', '', ''], [100, 5, 415, 2, 416, 418, 1, 3, 0]].map((r, k) => html`<tr key=${k}><th>${r[0]}</th>${r.slice(1).map((x, j) => html`<td key=${j} className=${k === 5 && j === 7 ? 'hot' : ''}>${x}</td>`)}</tr>`)}
              <tr className="tot"><th>Σ</th><td>415</td><td></td><td>317</td><td></td><td></td><td>174</td><td>491</td><td>101</td></tr></tbody></table></div>
          <p className="hf-ms2-key">${A ? html`الـ columns من <b>#</b> لـ <b>End</b> هي الـ <b>Simulation System</b>، والملوّنين (<b>Wait</b> و<b>Sys</b> و<b>Idle</b>) هما الـ <b>Performance Measure</b>.` : html`Columns <b>#</b> to <b>End</b> are the <b>Simulation System</b>; the shaded ones (<b>Wait</b>, <b>Sys</b>, <b>Idle</b>) are the <b>Performance Measure</b>.`}</p>
          <${P} small=${true}>${X('Row 2: arrives at 1, server busy until 4: waits 4 − 1 = 3, in system 6 − 1 = 5. Row 6: arrives at 18, server free since 16: <b>idle 2</b>, waits 0.',
            'الصف 2: وصل عند 1 والـ server مشغول لحد 4، فاستنى 3 دقايق وقعد في الـ system خمسة. الصف 6: وصل عند 18 والـ server فاضي من 16، فالـ <b>idle بـ 2</b> والانتظار صفر.')}</${P}>
          <${Hand}>${X('check: Wait + S = Sys, 174 + 317 = 491; and Idle + S = 101 + 317 = 418, the run time', 'اتأكد: الانتظار + الخدمة = الـ Sys، والـ idle + الخدمة = الـ run time:<span class="ltr">174 + 317 = 491 · 101 + 317 = 418</span>')}</${Hand}>
        `),
        figPage('ms-grocery-eq', 'The model equations at work', 'معادلات الـ model وهي شغالة', html`<${P} small=${true}>${X('‡ The doctors\' sheet calls the service time a "uniform" random number, but its probabilities are unequal: only the interarrival times are uniform.', '‡ ورقة الدكاترة بتقول إن الـ service time "uniform"، بس احتمالاته مش متساوية: الـ interarrival times بس هي اللي uniform.')}</${P}>`),

        // 29 · statistics
        page(html`
          <${H2}>${t('Seven numbers for the manager', 'سبع أرقام للمدير')}</${H2}>
          <div className="hf-in" dir="ltr"><div className="hf-code">${[
            ['w̄       = 174/100 = 1.74 min'],
            ['P(wait) = 46/100  = 0.46'],
            ['P(idle) = 101/418 = 0.24'],
            ['s̄       = 317/100 = 3.17 min'],
            ['E(s)    = Σ s·p(s) = 3.2 min'],
            ['IA avg  = 415/99  = 4.19 min'],
            ['E(τ)    = (1+8)/2 = 4.5 min'],
            ['w̄ wait. = 174/54  = 3.22 min ‡'],
            ['sys avg = 491/100 = 4.91 min']
          ].map((l, i) => html`<div key=${i}>${l[0]}</div>`)}</div></div>
          <p className="hf-ms2-key">${A ? html`الـ <b>w̄</b> متوسط الانتظار، والـ <b>s̄</b> متوسط الخدمة، والـ <b>sys avg</b> متوسط الوقت في الـ system، والـ <b>w̄ wait.</b> لِلّي استنوا بس.` : html`<b>w̄</b> average wait, <b>s̄</b> average service, <b>sys avg</b> average time in system, <b>w̄ wait.</b> over those who waited.`}</p>
          <${Box} kind="watch"><p className="hf-p small">${X('Divide <b>idle time by the run time</b> (418, when the last service ends), not by the customers. Divide interarrival time by <b>99 = arrivals − 1</b>: customer 1 arrives at 0. And t̄ = w̄ + s̄ = 1.74 + 3.17 = 4.91.',
            'اقسم الـ <b>idle time على الـ run time</b> (418، لما آخر خدمة تخلص)، مش على عدد الزباين. واقسم الـ interarrival على <b>99 يعني arrivals − 1</b>، لأن الزبون 1 بيوصل عند 0. و<bdi dir="ltr">t̄ = w̄ + s̄ = 1.74 + 3.17 = 4.91</bdi>.')}</p></${Box}>
          <${P} small=${true}>${X('‡ The slide divides by <b>54</b> waiters here but uses <b>46</b> in P(wait); with 46 it is 174 / 46 = <b>3.78</b>. If asked about the slide, the doctors\' figure is 3.22; the method: total wait ÷ number who actually waited.',
            '‡ السلايد بتقسم هنا على <b>54</b> بس في الـ P(wait) بتستخدم <b>46</b>؛ ولو 46 تبقى <bdi dir="ltr">174 / 46 = 3.78</bdi>. لو اتسألت على السلايد، رقم الدكاترة 3.22؛ والطريقة: إجمالي الانتظار ÷ عدد اللي استنوا فعلًا.')}</${P}>
        `),
        figPage('ms-grocery-stats', 'The statistics, one by one', 'الإحصائيات واحدة واحدة'),

        // 31 · stat fill
        page(html`
          <${Box} kind="pencil" title=${t('Your turn: the six customers', 'دورك: الست زباين')}><p className="hf-p small">${X("Our exercise on slide 11's run (waits 0 0 0 2 2 0, services 2 1 3 2 1 4, ends at 19). Two decimals or a fraction like <code>4/6</code>.",
            'تمرين من عندنا على run الـ slide 11 (بيخلص عند 19). اكتب رقمين عشريين أو كسر زي <code>4/6</code>.')}</p></${Box}>
          <${Fill} id="st6" inline=${true} rows=${A ? [
            ['متوسط الانتظار', 4 / 6, '4/6 = 0.67'],
            ['احتمال إن الزبون يستنى', 2 / 6, '2/6 = 0.33'],
            ['نسبة الـ idle بتاعة الـ server', 6 / 19, '6/19 = 0.32'],
            ['متوسط الـ service time', 13 / 6, '13/6 = 2.17'],
            ['متوسط الوقت بين الوصول', 3, '15/5 = 3.00'],
            ['متوسط الوقت في الـ system', 17 / 6, '17/6 = 2.83']
          ] : [
            ['Average waiting time', 4 / 6, '4/6 = 0.67'],
            ['Probability a customer waits', 2 / 6, '2/6 = 0.33'],
            ['Proportion of server idle time', 6 / 19, '6/19 = 0.32'],
            ['Average service time', 13 / 6, '13/6 = 2.17'],
            ['Average time between arrivals', 3, '15/5 = 3.00'],
            ['Average time in system', 17 / 6, '17/6 = 2.83']
          ]} />
        `),
        figPage('ms-wait-hist', '50 trials of the average wait', '50 trial لمتوسط الانتظار', html`<${P} small=${true}>${X('Slide 17: the average wait is <b>not high</b>, the server has <b>no undue idle time</b>, <b>nearly half</b> the customers wait (46%). A <b>longer run would increase accuracy</b>.', 'الـ slide 17: متوسط الانتظار <b>مش عالي</b>، والـ server <b>مش قاعد idle زيادة</b>، و<b>تقريبًا نص</b> الزباين بيستنوا (46%). و<b>الـ run الأطول بيزوّد الدقة</b>.')}</${P}>`),

        // 33 · random digits
        page(html`
          <${H1}>${t('Where do the times come from?', 'الأوقات دي جاية منين؟')}</${H1}>
          <${Def}>${X('<b>Random numbers</b> are uniformly and independently distributed on (0, 1). <b>Random digits</b> are uniform on {0, 1, …, 9}: take the digits you need and put a decimal point on their left.',
            'الـ <b>Random numbers</b> موزعة uniform وindependent على <bdi dir="ltr">(0, 1)</bdi>. والـ <b>random digits</b> موزعة uniform على <bdi dir="ltr">{0, 1, …, 9}</bdi>: خد عدد الـ digits اللي محتاجه وحط العلامة العشرية على شمالهم.')}</${Def}>
          <${UL} items=${A ? [
            'المثال 2.2 بيعيد البقالة لـ <b>20 زبون</b>. احتمالات Table 2.1 فيها 3 digits، فبنستخدم <b>تلات digits</b> (1000 قيمة من 001 لـ 000)، والدقيقة الواحدة <bdi dir="ltr">(p = 0.125)</bdi> بتاخد <bdi dir="ltr">001–125</bdi>.',
            'الـ Table 2.2 بتاع الخدمة محتاج <b>رقمين</b> بس.',
            'محتاجين <b>19</b> رقم بس للـ interarrival، لأن أول وصول عند الزمن 0.',
            'الطريقة (الـ appendix): ابدأ من مكان random في الـ table، وامشي في <b>اتجاه ثابت</b>: لتحت وبعدين يمين، أو لفوق وبعدين شمال.'
          ] : [
            'Example 2.2 redoes the grocery for <b>20 customers</b>. Table 2.1 has 3-digit probabilities, so <b>three-digit</b> numbers are used (1000 values, 001 to 000); 1 minute (p = 0.125) gets <b>001–125</b>.',
            'Table 2.2 (service) needs only <b>two digits</b>.',
            'Only <b>19</b> numbers are needed for the interarrival times: the first arrival is at time 0.',
            'The method (appendix): start somewhere at random in the table, then go in a <b>systematic direction</b>: down then right, or up then left.'
          ]} />
          <${Hand} red=${true}>${X('000 is the top of the range (1000), and 00 is 100', 'الـ 000 هي آخر الـ range (يعني 1000)، والـ 00 يعني 100')}</${Hand}>
        `, { sec: t('Example 2.2: random digits', 'المثال 2.2: الـ random digits') }),
        figPage('ms-digit-lookup', 'From digits to minutes', 'من الـ digits للدقايق'),
        figPage('ms-rand-digits', 'The appendix: a table of random digits', 'الـ appendix: table للـ random digits'),

        // 36 · digit drill
        page(html`
          <${Box} kind="pencil" title=${t('Be the lookup table', 'خليك إنت الـ lookup table')}><p className="hf-p small">${X('How many minutes? Three digits: Table 2.1 (between arrivals); two digits: Table 2.2 (service). ‡ The notes read 79 as 5 for customer 15.', 'كام دقيقة؟ التلات digits من Table 2.1 (بين الوصول)، والرقمين من Table 2.2 (الخدمة). ‡ الـ notes قرت 79 على إنها 5 للزبون 15.')}</p></${Box}>
          <${Fill} id="dig" tol=${0} inline=${true} ltr=${true} rows=${[
            ['<code>913</code> · 2.1', 8, '876–000 → 8'],
            ['<code>015</code> · 2.1', 1, '001–125 → 1'],
            ['<code>359</code> · 2.1', 3, '251–375 → 3'],
            ['<code>000</code> · 2.1', 8, '000 = 1000 → 8'],
            ['<code>84</code> · 2.2', 4, '61–85 → 4'],
            ['<code>05</code> · 2.2', 1, '01–10 → 1'],
            ['<code>79</code> · 2.2', 4, '61–85 → 4 ‡'],
            ['<code>00</code> · 2.2', 6, '00 = 100 → 6']
          ]} />
        `),
        figPage('ms-grocery20', 'Twenty customers, one at a time', 'عشرين زبون، واحد واحد'),

        // 38 · example 2.2 statistics
        page(html`
          <${H2}>${t('Twenty customers: the verdict', 'العشرين زبون: النتيجة')}</${H2}>
          <div className="hf-in" dir="ltr"><div className="hf-code">${[
            'w̄       = 56/20  = 2.8 min',
            'P(wait) = 13/20  = 0.65',
            'P(idle) = 18/86  = 0.21 (busy 0.79)',
            's̄       = 68/20  = 3.4 (E = 3.2)',
            'IA avg  = 82/19  = 4.3 (E = 4.5)',
            'w̄ wait. = 56/13  = 4.3 min',
            'sys avg = 124/20 = 6.2 = 2.8 + 3.4'
          ].map((l, i) => html`<div key=${i}>${l}</div>`)}</div></div>
          <${P} small=${true}>${X('The <b>longer the simulation</b>, the closer the average service time gets to E(S). Customer 2 arrives at 8 to a server idle for 4 minutes; customer 4 arrives at 15 and waits 3 (customer 3 ends at 18).',
            'كل ما <b>الـ simulation تطوّل</b>، متوسط الـ service time بيقرّب من الـ E(S). الزبون 2 بيوصل عند 8 والـ server قاعد idle بقاله 4 دقايق؛ والزبون 4 بيوصل عند 15 ويستنى 3 (الزبون 3 بيخلص عند 18).')}</${P}>
          <${Box} kind="watch" title=${t('‡ Customer 15', '‡ الزبون 15')}><p className="hf-p small">${X('The notes give service digits <b>79 → 5</b> min, but 79 is in 61–85, which is <b>4</b> (customer 13 has 79 → 4). The notes\' table and totals use 5. By our recount with 4, the total wait would be 51, not 56. In the exam, follow the notes\' table.',
            'الـ notes بتدي الـ service digits <b>79 → 5</b> دقايق، بس الـ 79 في <bdi dir="ltr">61–85</bdi> يعني <b>4</b> (الزبون 13 عنده 79 وخد 4). والـ table والـ totals بتوع الـ notes ماشيين بـ 5. ولو حسبناها بـ 4 (من عندنا)، إجمالي الانتظار يبقى 51 مش 56. في الامتحان امشي على table الـ notes.')}</p></${Box}>
        `),

        // 39 · able-baker
        page(html`
          <${H1}>${t('Example 2.3: Able and Baker', 'المثال 2.3: Able وBaker')}</${H1}>
          <${P} small=${true}>${X('A drive-in restaurant: <b>carhops</b> take orders and bring the food to the car. Two of them, <b>Able</b> (faster) and <b>Baker</b>: <b>more than one service channel</b>. Simulate <b>60 minutes</b>.',
            'مطعم drive-in: الـ <b>carhops</b> بياخدوا الأوردر ويجيبوا الأكل للعربية. اتنين: <b>Able</b> (الأسرع) و<b>Baker</b>، يعني <b>أكتر من service channel</b>. بنعمل simulation لـ <b>60 دقيقة</b>.')}</${P}>
          <${Def}>${X('<b>Able gets the car if both are idle</b> (seniority). If only one is idle, that one serves. If both are busy, the car waits for the <b>first one to become free</b>.',
            '<b>لو الاتنين فاضيين، Able ياخد العربية</b> (أقدمية). لو واحد بس فاضي، هو اللي يخدم. لو الاتنين مشغولين، العربية تستنى <b>أول واحد يفضى</b>.')}</${Def}>
          <div dir="ltr" className="hf-in"><table className="hf-ms2-t"><thead><tr><th>min</th><th>IA</th><th>Able</th><th>Baker</th></tr></thead><tbody>
            ${[[1, '0.25', '', ''], [2, '0.40', '0.30', ''], [3, '0.20', '0.28', '0.35'], [4, '0.15', '0.25', '0.25'], [5, '', '0.17', '0.20'], [6, '', '', '0.20']].map((r, k) => html`<tr key=${k}><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`)}</tbody></table></div>
          <${P} small=${true}>${X('More events now: a car arrives; begins or completes service from Able; begins or completes service from Baker. The service digits are read in the table of <b>whoever serves</b>.',
            'الـ events بقت أكتر: عربية بتوصل، تبدأ أو تخلص خدمة عند Able، تبدأ أو تخلص خدمة عند Baker. والـ service digits بنقراها من table <b>اللي هيخدم</b>.')}</${P}>
        `, { sec: t('Example 2.3: Able and Baker', 'المثال 2.3: Able وBaker') }),

        // 40 · who serves
        page(html`
          <${Box} kind="pencil" title=${t('Who takes this car?', 'مين ياخد العربية دي؟')}><p className="hf-p small">${X('Real rows from Table 2.9. Tap <b>A</b> (Able) or <b>B</b> (Baker).', 'صفوف حقيقية من Table 2.9. دوس <b>A</b> لـ Able أو <b>B</b> لـ Baker.')}</p></${Box}>
          <${Sort} id="ab" bins=${[['A', 'Able'], ['B', 'Baker']]} items=${A ? [
            ['العربية 1 عند 0: الاتنين فاضيين', 0],
            ['العربية 2 عند 2: Able لحد 5، وBaker فاضي', 1],
            ['العربية 6 عند 14: Able يفضى 15، وBaker يفضى 18', 0],
            ['العربية 14 عند 31: Able يفضى 35، وBaker يفضى 32', 1],
            ['العربية 15 عند 33: الاتنين مشغولين لحد 35', 0],
            ['العربية 16 عند 35: Able لسه واخد الـ 15، وBaker فاضي', 1],
            ['العربية 25 عند 55: Able يفضى 57، وBaker يفضى 56', 1]
          ] : [
            ['Car 1 at 0: both idle', 0],
            ['Car 2 at 2: Able busy until 5, Baker idle', 1],
            ['Car 6 at 14: Able free at 15, Baker at 18', 0],
            ['Car 14 at 31: Able free at 35, Baker at 32', 1],
            ['Car 15 at 33: both busy until 35', 0],
            ['Car 16 at 35: Able just took car 15, Baker free', 1],
            ['Car 25 at 55: Able free at 57, Baker at 56', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('a tie (car 15) goes to Able: seniority. It waits 2 minutes.', 'التعادل بيروح لـ Able: أقدمية.')}</${Hand}>
        `),
        figPage('ms-able-baker', 'Twenty-six cars, two carhops', '26 عربية واتنين carhops'),

        // 42 · fireside
        page(html`
          <${Fireside} sub=${t("Tonight: Able and Baker, after a 62-minute shift.", 'الليلة: Able وBaker بعد شيفت 62 دقيقة.')} />
          <${Chat} names=${['Able', 'Baker']} lines=${A ? [
            [0, 'أنا الأسرع: الخدمة عندي من 2 لـ 5 دقايق. وعندي <b>أقدمية</b>، فلو الاتنين فاضيين العربية بتاعتي.'],
            [1, 'وأنا من 3 لـ 6. بس متنساش إن العربيات كانت بتستناك إنت.'],
            [0, 'كنت مشغول <b><bdi dir="ltr">56 / 62 = 90%</bdi></b> من الوقت!'],
            [1, 'وأنا <b><bdi dir="ltr">43 / 62 = 69%</bdi></b>. ومع ذلك متوسط الانتظار لكل الـ 26 عربية <b><bdi dir="ltr">11 / 26 = 0.42</bdi></b> دقيقة، يعني حوالي 25 ثانية.'],
            [0, 'بس <b>9</b> عربيات اللي استنوا، ومتوسطهم <b><bdi dir="ltr">11 / 9 = 1.22</bdi></b> دقيقة.'],
            [1, 'يعني الـ system <b>متوازن</b>: واحد مننا مش هيقدر لوحده، وتلاتة غالبًا كتير.'],
            [0, 'لو جبنا carhop تالت، الانتظار هيبقى تقريبًا صفر، بس <b>التكلفة عالية</b>.']
          ] : [
            [0, "I'm the fast one: 2 to 5 minutes a car. And I have <b>seniority</b>: if we're both idle, the car is mine."],
            [1, 'I take 3 to 6. But the cars kept waiting for <i>you</i>.'],
            [0, 'I was busy <b>56 / 62 = 90%</b> of the time!'],
            [1, "I was <b>43 / 62 = 69%</b>. Still, the average wait over all 26 cars was <b>11 / 26 = 0.42</b> min, about 25 seconds."],
            [0, 'Only <b>9</b> cars waited, on average <b>11 / 9 = 1.22</b> min.'],
            [1, 'So the system is <b>well balanced</b>: one of us could not handle it all, three would probably be too many.'],
            [0, 'A third carhop would cut waiting nearly to zero, but the <b>cost would be quite high</b>.']
          ]} />
        `),

        // 43 · inventory (M, N)
        page(html`
          <${H1}>${t('Inventory: fill it up to M', 'الـ Inventory: املاه لحد M')}</${H1}>
          <${P} small=${true}>${X('An <b>important class of simulation problems</b>. Performance measure: <b>total cost (or total profit)</b>.', '<b>نوع مهم من مشاكل الـ simulation</b>. ومقياس الأداء: الـ <b>total cost (أو الـ total profit)</b>.')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>N</b>: طول الـ review period، والـ <b>M</b>: الـ standard inventory level، والـ <bdi dir="ltr"><b>Q<sub>i</sub></b></bdi>: كمية الـ order رقم i عشان نوصل لـ M.',
            'الـ events في الـ <bdi dir="ltr">(M, N)</bdi>: الـ <b>demand</b>، والـ <b>review</b>، و<b>استلام الـ order</b> آخر كل review. لو الـ <b>lead time صفر</b>، الاتنين الأخرانيين بيحصلوا <b>في نفس الوقت</b>.',
            'الناقص بيبقى <b>backordered</b>: لما الـ order يوصل، الـ backorders بتتخدم الأول.',
            'عشان نتجنب الـ shortage محتاجين <b>buffer stock</b>، وتكلفة المخزون: <b>مساحة التخزين</b> و<b>الحراسة</b>، وفوايد الفلوس، والـ <b>ordering cost</b>، وخسارة <b>goodwill</b> الزباين.'
          ] : [
            '<b>N</b>: review period length; <b>M</b>: standard inventory level; <b>Q<sub>i</sub></b>: quantity of order i to fill up to M.',
            'Events in an <b>(M, N)</b> system: <b>demand</b>, <b>review</b>, <b>receipt of an order</b> at the end of each review. With <b>zero lead time</b> the last two occur <b>simultaneously</b>.',
            'Units short are <b>backordered</b>: when the order arrives, backorders are satisfied first.',
            'To avoid shortages you need a <b>buffer stock</b>. Costs: <b>storage space</b>, <b>guards</b>, interest, <b>ordering cost</b>, loss of customer <b>goodwill</b>.'
          ]} />
          <${Talk} who="disk">${X('Bigger stock, fewer shortages. But I cost money to keep. Change <b>M</b> and <b>N</b> and trade them off.', 'مخزون أكبر يعني shortage أقل، بس أنا بتكلّف فلوس. غيّر <b>M</b> و<b>N</b> ووازن بينهم.')}</${Talk}>
          <${P} small=${true}>${X('‡ The same example is called Example 2 on slide 18 and Example 3 on slides 19–20.', '‡ نفس المثال اسمه Example 2 في الـ slide 18 وExample 3 في الـ slides 19–20.')}</${P}>
        `, { sec: t('Inventory systems', 'الـ Inventory systems') }),
        figPage('ms-mn-chart', 'The (M, N) chart', 'رسمة الـ (M, N)'),

        // 45 · newspaper seller
        page(html`
          <${H1}>${t('Example 2.4: the newspaper seller', 'المثال 2.4: بياع الجرايد')}</${H1}>
          <${UL} items=${A ? [
            'بيشتري الجرنان بـ <b>33 cents</b> ويبيعه بـ <b>50 cents</b>، واللي ما يتباعش يتباع <b>scrap بـ 5 cents</b>. والشرا <b>bundles of 10</b>.',
            'تلات أنواع أيام: <b>good</b> و<b>fair</b> و<b>poor</b> باحتمالات <bdi dir="ltr">0.35, 0.45, 0.20</bdi>، وكل نوع ليه demand distribution.',
            'الـ <b>lost profit</b> لكل جرنان اتطلب ومش موجود: <bdi dir="ltr">50 − 33 = 17</bdi> cents.'
          ] : [
            'Buys papers for <b>33 cents</b>, sells for <b>50 cents</b>; unsold papers go as <b>scrap for 5 cents</b>. Bought in <b>bundles of 10</b>.',
            'Three newsdays: <b>good</b>, <b>fair</b>, <b>poor</b> with probabilities 0.35, 0.45, 0.20, each with its own demand distribution.',
            '<b>Lost profit</b> per paper demanded but not available: 50 − 33 = 17 cents.'
          ]} />
          <${Def}>${A ? T('الـ Profit:<span class="ltr">revenue − cost of papers − lost profit from excess demand + salvage</span>') : T('<b>Profit</b> = revenue from sales − cost of newspapers − lost profit from excess demand + salvage from scrap.')}</${Def}>
          <${P} small=${true}>${X('Two lookups a day: digits for the <b>type</b> (Good 01–35, Fair 36–80, Poor 81–00), then digits for the <b>demand</b> in that type\'s column. Policy: buy <b>70</b> a day, cost 70 × $0.33 = <b>$23.10</b>.',
            'كل يوم lookup مرتين: digits لـ <b>نوع اليوم</b> (Good من 01 لـ 35، Fair من 36 لـ 80، Poor من 81 لـ 00)، وبعدين digits لـ <b>الـ demand</b> في column النوع ده. والـ policy: نشتري <b>70</b> في اليوم بتكلفة <bdi dir="ltr">70 × $0.33 = $23.10</bdi>.')}</${P}>
          <${Hand}>${X('day 1: 30.00 − 23.10 − 0 + 0.50 = $7.40 · day 5: 35.00 − 23.10 − 3.40 + 0 = $8.50', 'اليوم 1: <bdi dir="ltr">30.00 − 23.10 − 0 + 0.50 = $7.40</bdi><br/>اليوم 5: <bdi dir="ltr">35.00 − 23.10 − 3.40 + 0 = $8.50</bdi>')}</${Hand}>
        `, { sec: t('Example 2.4: newspaper seller', 'المثال 2.4: بياع الجرايد') }),

        // 46 · news calculator
        page(html`
          <${Box} kind="pencil" title=${t('Run the newsstand', 'شغّل الكشك')}><p className="hf-p small">${X('Pick a policy and a demand, read the bill. The bars: the notes\' same 20 days of digits under each policy (only 70 is in the notes; the rest is our re-run).',
            'اختار policy وdemand، واقرا الحساب. والـ bars: نفس الـ 20 يوم بتوع الـ notes بكل policy (الـ notes حسبت الـ 70 بس، والباقي إعادة حساب من عندنا).')}</p></${Box}>
          <${NewsCalc} />
        `),
        figPage('ms-newspaper', 'Twenty days at 70 papers', '20 يوم بـ 70 جرنان', html`<${Hand} red=${true}>${X('totals: 645.00 − 462.00 − 13.60 + 5.50 = $174.90', 'الإجمالي: <bdi dir="ltr">645.00 − 462.00 − 13.60 + 5.50 = $174.90</bdi>')}</${Hand}>`),

        // 48 · example 2.5
        page(html`
          <${H1}>${t('Example 2.5: M = 11, N = 5', 'المثال 2.5: M = 11 وN = 5')}</${H1}>
          <${UL} items=${A ? [
            'الهدف: <b>متوسط الـ ending inventory</b> و<b>عدد الأيام اللي فيها shortage</b>.',
            'الـ orders بتتعمل <b>آخر اليوم</b> وبتوصل <b>أول اليوم</b> حسب الـ lead time:<span class="ltr">order = M − ending inventory (+ backorders)</span>',
            'البداية: <b>3 وحدات</b> و<b>order بـ 8</b> جاي بعد يومين. والـ demand من 0 لـ 4، والـ lead time من 1 لـ 3 أيام (الـ digit صفر يعني 3).'
          ] : [
            'Goal: the <b>average ending inventory</b> and the <b>number of days with a shortage</b>.',
            'Orders are placed at <b>close of business</b>, received at <b>beginning of business</b> after the lead time. Order = M − ending inventory (+ any backorder).',
            'Start: <b>3 units</b> on hand and an <b>order of 8</b> due in 2 days. Demand 0–4 a day; lead time 1–3 days (digit 0 means 3).'
          ]} />
          <${Box} kind="brain"><p className="hf-p small">${X('Cycle 2 ends with 2 units and orders 9; its lead-time digit is 0 (3 days). What happens to cycle 3 while the truck is on the road?', 'الـ cycle 2 بتخلص بـ 2 وحدة وبتطلب 9، والـ lead-time digit بـ 0 (3 أيام). يحصل إيه للـ cycle 3 والعربية لسه في الطريق؟')}</p></${Box}>
          <${Reveal} id="mnr" label=${t('Show what happens', 'ورّيني إيه اللي حصل')}><${P} small=${true}>${X('It runs out: shortage <b>2</b> on day 2 and <b>4</b> (cumulative, backordered) on day 3. On day 4 the 9 units arrive, the 4 backorders go first, demand 1 leaves 9 − 4 − 1 = <b>4</b>.',
            'المخزون بيخلص: shortage بـ <b>2</b> يوم 2، وبـ <b>4</b> (تراكمي، backordered) يوم 3. يوم 4 الـ 9 وحدات بيوصلوا، والـ 4 backorders بيتخدموا الأول، والـ demand بـ 1، فيفضل <bdi dir="ltr">9 − 4 − 1 = <b>4</b></bdi>.')}</${P}></${Reveal}>
        `, { sec: t('Example 2.5: (M, N) inventory', 'المثال 2.5: الـ (M, N) inventory') }),
        figPage('ms-mn-sim', 'Five cycles, day by day', 'خمس cycles يوم بيوم', html`<${P} small=${true}>${X('Average ending inventory 88 / 25 ≈ <b>3.5</b>; a shortage on <b>2 of 25</b> days. To estimate the mean well, simulate <b>many cycles</b>, and change M and N.', 'متوسط الـ ending inventory <bdi dir="ltr">88 / 25 ≈ 3.5</bdi>، والـ shortage في <b>يومين من 25</b>. وعشان نقدّر المتوسط كويس لازم <b>cycles كتير</b>، ونغيّر M وN.')}</${P}>`),

        // 50 · the (r, x) deck
        page(html`
          <${H1}>${t('Reorder point and order size', 'الـ Reorder point وحجم الـ order')}</${H1}>
          <${Def}>${X('<b>Objective</b>: minimize the <b>total cost Tc</b> over the <b>reorder point r</b> and the <b>order quantity x</b>. Tc = Hc + Oc + Sc.',
            'الـ <b>Objective</b>: نقلل الـ <b>total cost Tc</b> بالنسبة للـ <b>reorder point r</b> والـ <b>order quantity x</b>:<span class="ltr">Tc = Hc + Oc + Sc</span>')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b>Holding cost</b>: <bdi dir="ltr">$0.10</bdi> للوحدة في اليوم، والـ <b>Order cost</b>: <bdi dir="ltr">$20</bdi> للـ order، والـ <b>Shortage cost</b>: <bdi dir="ltr">$50</bdi> للوحدة.',
            'الافتراض: <b>عمرنا ما هنحتاج two orders outstanding في نفس الوقت</b>.',
            'الـ <b>lead time L</b> من 30 observation، والـ <b>daily demand d</b> من 300 يوم، والـ R بيتقري من الـ cumulative.',
            'المكونات: <bdi dir="ltr">I₀ = 5</bdi> و<bdi dir="ltr">x = 5</bdi> و<bdi dir="ltr">r = 3</bdi>.'
          ] : [
            '<b>Holding cost</b> $0.10 per unit per day; <b>order cost</b> $20 per order; <b>shortage cost</b> $50 per unit.',
            'Assumption: it is <b>never necessary to have two orders outstanding simultaneously</b>.',
            '<b>Lead time L</b> from 30 observations; <b>daily demand d</b> from 300 days. R falls in an interval of the cumulative column (lower end included).',
            'Components: I₀ = 5 units, x = 5 units, r = 3 units.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('An order is placed only if <b>I ≤ r</b> <i>and</i> <b>no order is outstanding</b>. Days 5 and 6 of the 10-day run are at or below r, but nothing is ordered.',
            'الـ order بيتعمل بس لو <bdi dir="ltr"><b>I ≤ r</b></bdi> <i>و</i><b>مفيش order outstanding</b>. اليوم 5 و6 في الـ 10 أيام تحت r، ومع ذلك مفيش order.')}</p></${Box}>
        `, { sec: t('The (r, x) inventory model', 'الـ (r, x) inventory model') }),
        figPage('ms-r-lookup', 'From R to demand and lead time', 'من R للـ demand والـ lead time', html`<${P} small=${true}>${X('‡ The notes print the demand-3 interval as "0.90 to 0.49999": 0.90 to 0.94999 is meant.', '‡ الـ notes كاتبة interval الـ demand 3 غلط (0.49999)، والمقصود <bdi dir="ltr">0.90 to 0.94999</bdi>.')}</${P}>`),
        figPage('ms-inv-flow', 'One simulated day', 'يوم واحد في الـ simulation'),
        figPage('ms-inv10', 'Ten days with r = 3, x = 5', '10 أيام بـ r = 3 وx = 5', html`<${Hand} red=${true}>${X('averages: holding 0.27 + order 4.00 + shortage 15.00 = $19.27 a day (‡ the slide prints day 5\'s order cost "000": 0.00)', 'المتوسطات: <bdi dir="ltr">0.27 + 4.00 + 15.00 = $19.27</bdi> في اليوم (‡ السلايد كاتبة order cost يوم 5 "000" يعني 0.00)')}</${Hand}>`),

        // 54 · the computer takes over
        page(html`
          <${H2}>${t('1000 days, 100 policies', '1000 يوم و100 policy')}</${H2}>
          <${P} small=${true}>${X('A simulator tries 5 ≤ x ≤ 50 and 1 ≤ r ≤ 10 over 1000 days. The best cell: <b>r = 6, x = 20</b>, average cost <b>2.10</b>.', 'الـ simulator بيجرب <bdi dir="ltr">5 ≤ x ≤ 50</bdi> و<bdi dir="ltr">1 ≤ r ≤ 10</bdi> على 1000 يوم. وأحسن خانة: <bdi dir="ltr"><b>r = 6, x = 20</b></bdi> بمتوسط تكلفة <b>2.10</b>.')}</${P}>
          <${Fig} name="ms-cost-grid" />
          <${P} small=${true}>${X('‡ The notes print two cells differently and name x = 25, r = 6 at $2.39, a value not in the table (it shows 3.39). Follow the slide.', '‡ الـ notes كاتبة خانتين بشكل مختلف، وبتقول x = 25 وr = 6 بـ $2.39، والرقم ده مش في الـ table (اللي فيه 3.39). امشي على السلايد.')}</${P}>
        `),
        page(html`
          <${H2}>${t('Zooming in: 21 ≤ x ≤ 30', 'تقريب أكتر: 21 ≤ x ≤ 30')}</${H2}>
          <${Fig} name="ms-cost-fine" />
          <${P} small=${true}>${X('The slide marks <b>r = 6, x = 22</b> (2.33) as best. ‡ But the same table shows <b>2.32</b> at r = 7, x = 29, a hair lower: within simulation noise.', 'السلايد معلّمة على <bdi dir="ltr"><b>r = 6, x = 22</b></bdi> (2.33) إنها الأحسن. ‡ بس نفس الـ table فيه <b>2.32</b> عند <bdi dir="ltr">r = 7, x = 29</bdi>، أقل بشعرة، وده جوه الـ simulation noise.')}</${P}>
        `),

        // 56 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("This lecture has one question from the doctors' papers so far. Tap an answer to see why.", 'المحاضرة دي ليها سؤال واحد بس لحد دلوقتي من امتحانات الدكاترة. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /to say the system is unstable/i)}
          <${Grow} />
          <${Talk} who="cust" flip=${true}>${t('If customers arrive faster than I am served, the line never stops growing.', 'لو الزباين بيوصلوا أسرع من ما بيتخدموا، الطابور عمره ما هيبطّل يكبر.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions, not the doctors'.", 'أسئلة تدريب من الموقع، مش من امتحانات الدكاترة.')}</p></${Box}>
          ${pq('p1', /not one of the items that describe/i)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /leaves the line after waiting/i)}
          <${Gap} h=${4} />
          ${pq('p3', /how many customers are in the system at time 8/i)}
        `),
        page(html`
          ${pq('p4', /proportion of idle time/i)}
          <${Gap} h=${4} />
          ${pq('p5', /poor day with demand 40/i, 'extra')}
        `),
        page(html`
          ${pq('p6', /total cost for that day/i, 'extra')}
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('Shortage, then an order on the same day: that one hurts.', 'الـ shortage والـ order في نفس اليوم: دي بتوجع.')}</${Talk}>
        `),

        // 60 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ simulation بالإيد على <b>table</b>، وللتجارب الكبيرة <b>spreadsheet</b>.',
            'الـ queue بتتوصف بالـ calling population والـ arrival rate والـ service mechanism والـ capacity والـ discipline، وبتتكتب <bdi dir="ltr">A/B/c/N/K</bdi>.',
            'الـ arrival rate <b>أقل</b> من الـ service rate يبقى <b>stable</b>.',
            'الـ state هو عدد الـ units وحالة الـ server، والـ events هما الـ arrival والـ departure.',
            'الخدمة بتبدأ عند <bdi dir="ltr">max(arrival, previous end)</bdi>، والـ idle بنقسمه على الـ run time، والـ interarrival على <bdi dir="ltr">n − 1</bdi>.',
            'الـ random digits بتتحوّل لقيم بالـ cumulative ranges، والـ 00 أو 000 هي آخر الـ range.',
            'الـ Inventory: املا لحد M كل N، أو اطلب x لما <bdi dir="ltr">I ≤ r</bdi>.',
            'الـ <b>Input data مهمة</b>، والـ <b>output analysis</b> مهم وصعب، والـ tables دي <b>ad hoc</b>: محتاجين طريقة منهجية أكتر.'
          ] : [
            'Hand simulation on a <b>table</b>: inputs per repetition, a computed response. Use a <b>spreadsheet</b> for large experiments.',
            'A queue: calling population, arrival rate, service mechanism, capacity, discipline; written <b>A/B/c/N/K</b>.',
            'Arrival rate <b>less than</b> service rate ⇒ <b>stable</b>.',
            'State = units in system + server status; events = arrival and departure.',
            'Service begins at <b>max(arrival, previous end)</b>; idle ÷ run time; interarrival total ÷ (n − 1).',
            'Random digits become values through cumulative ranges; 00 or 000 is the top of the range.',
            'Inventory: fill up to M every N, or order x when I ≤ r; compare policies by profit or cost.',
            '<b>Input data is important</b>, <b>output analysis</b> is important and difficult, and these tables were <b>ad hoc</b>: a more methodic approach is needed.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 61 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="dice">${t("Next time: where my numbers really come from. Statistical models!", 'المرة الجاية: أرقامي جاية منين بجد. الـ Statistical models!')}</${Talk}>
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

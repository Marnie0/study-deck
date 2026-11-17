// Head First chapter for Modeling & Simulation Lecture 8 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Case studies from the labs and the lecture notes: simulation as a problem-solving tool, the lab definitions, the standard
// random-number algorithm (RandInt / RandReal), the unbiased coin, the Gift Shop single-channel queue, Monte Carlo area under
// a curve, the pure pursuit problem, the staggering drunk, the flipping coin game, the newspaper seller (Quiz 5), the cake shop
// (with the end-of-chapter goodwill question) and the Auto Supplies inventory day (Figure 8-8); the chapter summary.
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks a slide/book error the notes also flag.
// This lecture has no questions from the doctors' papers, so the exam corner uses the site's practice questions, titled so.
// Numbers recomputed with node: RandInt(1,10) at R1 = 0.5 → 5, at 0.99 → 9; Gift Shop example ΣWT 19, ΣIdle 6, t 21 → 3.8 min,
// 28.57%; exercise ΣWT 19, ΣIdle 15, t 34 → 3.8 min, 44.12%; program run ΣWT 48, ΣIdle 57, t 104 → 2.4 min, 54.81%;
// area K = 384, 769, 1154, 1562, 1964, 2352 and |0.78399998 − π/4| = 0.0014; pursuit DIST 94.340 … 11.447, 2.969 (t = 9),
// lab hand steps XF(1) 17, YF(1) 39.4, Dist(1) 83.922, XF(2) 34.4, YF(2) 29.6; drunk trials end (−1,−1) (0,−4) (4,−2) (2,0)
// (−1,1); Quiz 2 nets −1 5 5 5 3 3 3 −17 5 −5 3 5 −19 (sum −5, mean −0.3846, var 64.2367, sd 8.0148, 9 wins, +37 / −42);
// Lab 5 mean (255 − 247)/100 = 0.08, √58.034 = 7.618; newspaper demands 50 70 70 50 60 50 50 60 50 70 and totals Q = 50…100:
// 71.40, 74.40, 65.00, 37.00, 9.00, −19.00; cake x = 3 daily 7.5 1.5 7.5 7.5 7.5 7.5 7.5 −1.5 7.5 7.5 (total 60); ten-day
// totals x = 1…8: 22 41 60 76 86 90 88 86; with goodwill x = 6, 7, 8 → 86 each; cumulative 0.05 0.15 0.20 0.30 0.45 0.75 0.90 0.95 1.
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T8 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-ms8')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms8';
    s.textContent = `
.hfb .hf-ms8-chain{ display:flex; flex-wrap:wrap; gap:4px 3px; align-items:center; }
.hfb .hf-ms8-chain span{ font:700 13px/1 var(--body); padding:5px 7px; border-radius:999px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); }
.hfb .hf-ms8-chain i{ font-style:normal; font:700 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-ms8-tb{ border-collapse:collapse; width:100%; font:500 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-ms8-tb th, .hfb .hf-ms8-tb td{ border:1px solid var(--hf-line); padding:4px 4px; text-align:center; }
.hfb .hf-ms8-tb th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-ms8-tb td.m{ font-family:var(--mono); font-weight:600; }
.hfb .hf-ms8-tb tr.hi td{ background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); font-weight:700; }
/* number drills */
.hfb .hf-ms8-dr{ display:grid; gap:7px; }
.hfb .hf-ms8-dr .dq{ font-size:14px; line-height:1.3; margin:0 0 3px; color:var(--ink); }
.hfb .hf-ms8-dr .dops{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-ms8-dr .dops button{ font:700 13.5px/1 var(--mono); min-height:30px; min-width:48px; padding:0 8px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-ms8-dr .dops button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-ms8-dr .dops button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-ms8-dr .dops button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); color:var(--ink); }
.hfb .hf-ms8-dr .dw{ font-size:13px; line-height:1.3; margin:3px 0 0; color:var(--hf-red); }
/* be the clerk: fill the gift shop table */
.hfb .hf-ms8-gf{ border:2px solid var(--hf-line); border-radius:8px; padding:7px; display:grid; gap:7px; }
.hfb .hf-ms8-gf table{ border-collapse:collapse; width:100%; table-layout:fixed; }
.hfb .hf-ms8-gf th, .hfb .hf-ms8-gf td{ border:1px solid var(--hf-line); padding:0; text-align:center; height:28px; font:600 13.5px/1 var(--mono); color:var(--ink); }
.hfb .hf-ms8-gf th{ background:var(--hf-grey); font:800 13px/1.05 var(--body); padding:2px 0; }
.hfb .hf-ms8-gf td.giv{ background:var(--hf-grey); }
.hfb .hf-ms8-gf input{ width:100%; height:100%; box-sizing:border-box; border:0; background:var(--paper); text-align:center; font:700 14px/1 var(--mono); color:var(--ink); padding:0; }
.hfb .hf-ms8-gf input:focus{ outline:2.5px solid var(--hf-hand); outline-offset:-2.5px; }
.hfb .hf-ms8-gf input.ok{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.hfb .hf-ms8-gf input.no{ background:color-mix(in srgb, var(--hf-red) 14%, var(--paper)); color:var(--hf-red); }
.hfb .hf-ms8-res{ font:600 13.5px/1.4 var(--mono); color:var(--ink); background:var(--hf-grey); padding:5px 8px; border-radius:6px; margin:0; }
.hfb .hf-ms8-hint{ font-size:13.5px; line-height:1.3; margin:0; color:var(--graphite); }
/* bake the table: fill the cake profits */
.hfb .hf-ms8-cf{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-ms8-cf .days{ display:grid; grid-template-columns:1fr 1fr; gap:4px 10px; }
.hfb .hf-ms8-cf .day{ display:grid; grid-template-columns:auto 1fr auto; gap:6px; align-items:center; font:600 13.5px/1 var(--mono); color:var(--ink); }
.hfb .hf-ms8-cf .day .n{ color:var(--graphite); }
.hfb .hf-ms8-cf .day button{ min-width:62px; height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); font:700 13.5px/1 var(--mono); color:var(--ink); cursor:pointer; padding:0 4px; }
.hfb .hf-ms8-cf .day button.sel{ border-color:var(--hf-hand); box-shadow:0 0 0 2px var(--hf-hand); }
.hfb .hf-ms8-cf .day button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.hfb .hf-ms8-cf .day button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); color:var(--hf-red); }
.hfb .hf-ms8-pal{ display:flex; gap:5px; flex-wrap:wrap; justify-content:center; }
.hfb .hf-ms8-pal button{ font:700 13.5px/1 var(--mono); min-height:32px; min-width:54px; padding:0 7px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-ms8-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-ms8-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); display:grid; gap:3px; align-content:start; }
.hfb .hf-ms8-card > b{ font:800 14px/1.15 var(--body); color:var(--hf-k); }
.hfb .hf-ms8-card > span{ font-size:13.5px; line-height:1.3; color:var(--ink); }
.hf-ar .hf-ms8-dr .dq, .hf-ar .hf-ms8-dr .dw, .hf-ar .hf-ms8-hint, .hf-ar .hf-ms8-card > span{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-ms8-card > span{ font-size:13px; }
.hf-ar .hf-ms8-card > b, .hf-ar .hf-ms8-tb, .hf-ar .hf-ms8-gf th{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ms8-chain{ direction:ltr; }
`;
    document.head.appendChild(s);
  }

  // Sharpen your pencil with numbers: each row is a question with a few answers to tap; check marks right and wrong
  function Drill({ id, rows }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => pick[i] === r.a).length;
    return html`<div className="hf-ms8-dr hf-in">
      ${rows.map((r, i) => { const p = pick[i]; return html`<div key=${i}>
        <p className="dq">${T8(r.q)}</p>
        <div className="dops" dir="ltr">${r.o.map((o, j) => html`<button key=${j} aria-pressed=${String(p === j && !chk)} className=${chk && p != null ? (j === r.a ? 'ok' : j === p ? 'no' : '') : ''} onClick=${() => { setChk(false); setPick(Object.assign({}, pick, { [i]: j })); }}>${T8(o)}</button>`)}</div>
        ${chk && p != null && p !== r.a && r.w ? html`<p className="dw">${T8(r.w)}</p>` : null}</div>`; })}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChk(true)}>${ar ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; rows.forEach((r, i) => { p[i] = r.a; }); setPick(p); setChk(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  // Be the clerk: the lab's Gift Shop exercise (delays 0, 10, 7, 7, 8; service 1, 4, 6, 6, 2). Customer 1 is given by the rule.
  const GF_D = [0, 10, 7, 7, 8], GF_S = [1, 4, 6, 6, 2], GF_C = ['ar', 'beg', 'end', 'wt', 'idle'];
  const GF_R = (() => { const R = []; GF_D.forEach((_, i) => { const p = R[i - 1]; const ar = i ? p.ar + GF_D[i] : 0, beg = i ? Math.max(ar, p.end) : 0, end = beg + GF_S[i];
    R.push({ ar, beg, end, wt: end - ar, idle: i && ar > p.end ? ar - p.end : 0 }); }); return R; })();
  function GiftFill({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const cells = []; for (let i = 1; i < 5; i++) GF_C.forEach(c => cells.push(i + ':' + c));
    const ans = k => { const [i, c] = k.split(':'); return GF_R[+i][c]; };
    const good = k => v[k] != null && v[k] !== '' && Number(v[k]) === ans(k);
    const right = cells.filter(good).length, all = right === cells.length;
    return html`<div className="hf-ms8-gf hf-in">
      <table dir="ltr"><thead><tr><th>#</th><th>Dly</th><th>ST</th><th>Arr</th><th>Beg</th><th>End</th><th>WT</th><th>Idle</th></tr></thead>
        <tbody>${GF_R.map((r, i) => html`<tr key=${i}><td className="giv">${i + 1}</td><td className="giv">${GF_D[i]}</td><td className="giv">${GF_S[i]}</td>
          ${GF_C.map(c => { const k = i + ':' + c; if (!i) return html`<td key=${c} className="giv">${r[c]}</td>`;
            return html`<td key=${c}><input type="text" inputMode="numeric" maxLength="3" aria-label=${'Customer ' + (i + 1) + ' ' + c} value=${v[k] == null ? '' : v[k]}
              className=${chk && v[k] != null && v[k] !== '' ? (good(k) ? 'ok' : 'no') : ''} onChange=${e => { setChk(false); setV(Object.assign({}, v, { [k]: e.target.value.replace(/[^0-9]/g, '') })); }} /></td>`; })}</tr>`)}</tbody></table>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح الجدول' : 'Check the table'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; cells.forEach(k => { p[k] = String(ans(k)); }); setV(p); setChk(true); }}>${ar ? 'ورّيني الحل' : 'Show the table'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / ${cells.length}</bdi></span>`}
      </div>
      ${chk && all ? html`<p className="hf-ms8-res" dir="ltr">Ar = (1 + 4 + 6 + 6 + 2)/5 = 19/5 = 3.8 min<br/>P = (9 + 3 + 1 + 2)/34 × 100 = 15/34 × 100 = 44.12%<br/>(‡ the lab writes 44.11%)</p>` : null}
    </div>`;
  }

  // Bake the table: daily profit z for x = 3 cakes on the ten demands of Table 8-3. Tap a day, then its profit.
  const CK_D = [5, 1, 6, 3, 4, 4, 8, 0, 5, 6];
  const ckz = (x, d) => x <= d ? 2.5 * x : 3 * d - 0.5 * x;
  const CK_PAL = [7.5, 4.5, 3, 1.5, -1.5];
  const m2 = x => (x < 0 ? '−' : '') + Math.abs(x).toFixed(2);
  function CakeFill({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const [sel, setSel] = useState(0);
    const put = x => { setChk(false); setV(Object.assign({}, v, { [sel]: x })); if (sel < 9) setSel(sel + 1); };
    const right = CK_D.filter((d, k) => v[k] === ckz(3, d)).length;
    const day = k => { const d = CK_D[k], x = v[k];
      return html`<div key=${k} className="day"><span className="n">D${k + 1}</span><span>d = ${d}</span>
        <button className=${(sel === k && !chk ? 'sel' : '') + (chk && x != null ? (x === ckz(3, d) ? ' ok' : ' no') : '')} onClick=${() => setSel(k)} aria-label=${'Profit on day ' + (k + 1)}>${x == null ? '?' : m2(x)}</button></div>`; };
    return html`<div className="hf-ms8-cf hf-in">
      <div className="days" dir="ltr">${[0, 5, 1, 6, 2, 7, 3, 8, 4, 9].map(day)}</div>
      <p className="hf-ms8-hint">${ar ? 'اختار يوم، وبعدين الربح بتاعه:' : 'Pick a day, then its profit z ($):'}</p>
      <div className="hf-ms8-pal" dir="ltr">${CK_PAL.map(x => html`<button key=${x} onClick=${() => put(x)}>${m2(x)}</button>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; CK_D.forEach((d, k) => { p[k] = ckz(3, d); }); setV(p); setChk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / 10</bdi></span>`}
      </div>
      ${chk && right === 10 ? html`<p className="hf-ms8-res" dir="ltr">Total = 8 × 7.50 + 1.50 − 1.50 = 60.00</p>` : null}
    </div>`;
  }

  H.chapters.ms[8] = {
    title: 'Case Studies',
    kicker: 'Chapter 8',
    run: 'case studies',
    ar: { title: 'الـ Case Studies', kicker: 'الفصل 8', run: 'الـ case studies' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const B = s => '<bdi dir="ltr">' + s.replace(/ /g, '&nbsp;') + '</bdi>';   // short LTR pieces never wrap
      const L = s => '<span class="ltr">' + s + '</span>';
      const lec = kit.course.lectures.find(l => l.n === 8);
      const arL = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[8]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the site's practice questions (this lecture has none from the doctors): from the lecture's quiz or its extra questions
      const pq = (id, re, from) => { const list = lec[from] || []; const i = list.findIndex(x => re.test(strip(x.q)) && !x.src); return i < 0 ? null : html`<${MCQ} id=${id} q=${list[i]} why=${(arL[from] || [])[i]} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const card = (h, b) => html`<div className="hf-ms8-card"><b>${h}</b><span>${T(b)}</span></div>`;
      const tb = (head, rows, hi) => html`<table className="hf-ms8-tb hf-in" dir="ltr"><thead><tr>${head.map((h, i) => html`<th key=${i}>${h}</th>`)}</tr></thead>
        <tbody>${rows.map((r, i) => html`<tr key=${i} className=${hi === i ? 'hi' : ''}>${r.map((c, j) => html`<td key=${j} className=${j ? 'm' : ''}>${c}</td>`)}</tr>`)}</tbody></table>`;
      return [
        // 0 · where we left off, and how this chapter works
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter you learned to <b>verify</b> a model (build it right) and <b>validate</b> it (build the right one). This chapter stops talking and <b>runs</b> models: eight case studies from the labs and the lecture notes, each solved by simulation.',
            'الفصل اللي فات اتعلمت تعمل <b>verification</b> للـ model (تبنيه صح) و<b>validation</b> (تبني الـ model الصح). الفصل ده بيبطّل كلام و<b>يشغّل</b> models: تمن case studies من الـ labs والـ lecture notes، وكل واحدة بتتحل بالـ simulation.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You fill simulation tables by hand: a queue, a random walk, a coin game, a cake shop.', '<b>حل التمارين.</b> هتملا جداول simulation بإيدك: queue، وrandom walk، ولعبة عملة، ومحل تورت.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are the traps in these tables and programs.', '<b>خلّي بالك!</b> دي الفخاخ اللي في الجداول والبرامج دي.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake in the labs or the book, and what was meant.', 'معناها فيه غلطة في الـ lab أو الكتاب، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات اللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من المحاضرة.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t("There are no questions from the doctors' papers on this lecture yet, so the exam corner uses the site's practice questions.", 'لسه مفيش أسئلة من امتحانات الدكاترة على المحاضرة دي، فركن الامتحان فيه أسئلة تدريب من الموقع.')}</${Hand}>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">8</span><span className="t">${A ? html`الفصل التامن<br/>Modeling & Simulation` : html`Chapter eight<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Try It in the Computer First', 'جرّبها في الكمبيوتر الأول')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('case studies (labs and lecture notes)', 'الـ case studies من الـ labs والـ lecture notes')}</p></div>
          <${Talk} who="dev">${X('How many cakes should the shop bake? How many papers should the seller buy? Is this coin game a trap?', 'المحل يخبز كام تورتة؟ بياع الجرايد يشتري كام جرنال؟ ولعبة العملة دي فخ ولا لأ؟')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X("Don't bake a hundred cakes to find out. Give me a <b>model</b> and some <b>random numbers</b> and I'll live those days for you.", 'متخبزش مية تورتة عشان تعرف. إدّيني <b>model</b> وشوية <b>random numbers</b> وأنا أعيش الأيام دي بدالك.')}</${Talk}>
          <${P}>${X("That's this whole chapter: <b>simulation as a problem-solving tool</b>. Every case study is a small world in the computer, run day by day or step by step until it answers a question.",
            'ده الفصل كله: <b>الـ simulation كأداة لحل المشاكل</b>. كل case study هي دنيا صغيرة جوه الكمبيوتر، بنشغّلها يوم بيوم أو خطوة بخطوة لحد ما تجاوب على سؤال.')}</${P}>
        `, { sec: t('Simulation solves problems', 'الـ simulation بتحل مشاكل') }),

        // 2 · problem solving, parameters, the lab report outline
        page(html`
          <${H2}>${t('A simulation that solves a problem', 'simulation بتحل مشكلة')}</${H2}>
          <${Def}>${X('In a problem-solving scenario, a simulation is considered <b>valid for the context in which it is applied</b> (book p.131).', 'في سيناريو حل المشاكل، الـ simulation بتتعتبر <b>valid في الـ context اللي بتتطبق فيه</b> (الكتاب صفحة 131).')}</${Def}>
          <${P} small=${true}>${X('Such simulations have <b>parameters</b> that let the user:', 'الـ simulations دي ليها <b>parameters</b> بتخلّي الـ user:')}</${P}>
          <${UL} items=${A ? ['يحدد أجزاء معينة من الـ <b>context</b> بتاع الـ simulation', 'يختار الـ <b>controls</b> المهمة فيها', 'يدخّل <b>data</b> بتحدد الـ simulation المفروض تشتغل إزاي']
            : ['define selected portions of the <b>context</b> of the simulation', 'choose important <b>controls</b> in it', 'include <b>data</b> that define how it should operate']} />
          <${P} small=${true}>${X('The labs (tools: C++, Excel, AnyLogic) use the <b>same report outline</b> for every case:', 'الـ labs (بالـ ' + B('C++') + ' والـ Excel والـ AnyLogic) بتستخدم <b>نفس شكل التقرير</b> لكل case:')}</${P}>
          <div className="hf-ms8-chain hf-in">${['Problem definition', 'Assumptions', 'Model', 'Flowchart / Algorithm', 'Code', 'Output', 'Statistical analysis'].map((x, i) => html`<${React.Fragment} key=${i}>${i ? html`<i>→</i>` : null}<span>${x}</span><//>`)}</div>
        `),

        // 3 · lab definitions, as a matching exercise
        page(html`
          <${H2}>${t('Who does what? The lab\'s definitions', 'مين بيعمل إيه؟ تعريفات الـ lab')}</${H2}>
          <${P} small=${true}>${t('Tap a word, then the definition Lab 1 gives it.', 'دوس على الكلمة، وبعدين على التعريف اللي Lab 1 بيدّيهولها.')}</${P}>
          <${Match} id="defs" left=${['System', 'Model', 'Modeling', 'Simulation']}
            right=${A ? ['تمثيل system بأداة عشان ندرس سلوكه', 'entities بتتفاعل مع بعض عشان هدف', 'تبسيط للـ system فيه المهم بس', 'تجارب على model من غير ما نلمس الـ system']
              : ['Representing a system with a tool to study its behavior', 'Entities that act and interact toward some end', 'A simplification of the real system: the essentials', 'Experimenting with a model without affecting the real system']}
            answer=${[1, 2, 0, 3]} />
          <${Grow} />
          <${P} small=${true}>${X('Advantages (Lab 1): no disruption of the real system, test proposals first, big complex systems, <b>"what-if"</b> questions, interactions among variables, <b>time compression</b>.',
            'المميزات (Lab 1): مش بنعطّل الـ system الحقيقي، ونجرّب المقترح الأول، وsystems كبيرة، وأسئلة <b>"what-if"</b>، والتفاعل بين الـ variables، والـ <b>time compression</b>.')}</${P}>
        `),

        // 4 · random numbers: the standard algorithm
        page(html`
          <${H1}>${t('Case 0: where randomness comes from', 'البداية: العشوائية بتيجي منين')}</${H1}>
          <${P} small=${true}>${X('Every case study needs random numbers in some range [Low, High]. The labs build them from C++\'s <code>rand()</code> (in <code>stdlib.h</code>) with the <b>standard algorithm</b>:',
            'كل case study محتاجة random numbers في range معين ' + B('[Low, High]') + '. الـ labs بتعملها من <code>rand()</code> بتاعة الـ ' + B('C++') + ' (في <code>stdlib.h</code>) بالـ <b>standard algorithm</b>:')}</${P}>
          <${Code} lines=${[['R0 = rand()', t('0 … RAND_MAX', 'من 0 لـ RAND_MAX')], ['R1 = R0 / (RAND_MAX + 1)', t('normalization', 'الـ normalization')], ['R2 = R1 × (High − Low)', t('scaling', 'الـ scaling')], ['int(R2)', t('truncation (integers only)', 'الـ truncation (للـ integers بس)')], ['R = R2 + Low', t('translation', 'الـ translation')]]} />
          <${Def}>${X('The lab\'s example, a random integer in [1, 10] with R1 = 0.5: R2 = 0.5 × (10 − 1) = 4.5 → truncate to 4 → R = 4 + 1 = <b>5</b>.',
            'مثال الـ lab، رقم integer عشوائي في ' + B('[1, 10]') + ' والـ R1 بنص:' + L('R2 = 0.5 × (10 − 1) = 4.5 → 4 → R = 4 + 1 = 5'))}</${Def}>
          <${P} small=${true}>${X('<code>RAND_MAX</code> is a macro: the largest value <code>rand()</code> returns. In Excel: <code>RAND()</code> gives a real in [0, 1), <code>RANDBETWEEN()</code> an integer in a range.',
            'الـ <code>RAND_MAX</code> ده macro بيدّي أكبر قيمة <code>rand()</code> ممكن ترجعها. وفي الـ Excel الـ <code>RAND()</code> بتدّي real في ' + B('[0, 1)') + ' والـ <code>RANDBETWEEN()</code> بتدّي integer في range.')}</${P}>
        `, { sec: t('Random numbers', 'الـ Random numbers') }),

        // 5 · the figure
        page(html`
          <${Fig} name="ms-rand-alg" head=${t('The five steps, live (try your own Low and High)', 'الخمس خطوات قدامك (جرّب Low وHigh بتوعك)')} />
        `),

        // 6 · the code, and the trap
        page(html`
          <${H2}>${t('RandInt and RandReal (Lab 1)', 'الـ RandInt والـ RandReal (Lab 1)')}</${H2}>
          <${Code} lines=${['int RandInt(int Low, int High) {', '  double d = (double) rand()', '        / (double)(RAND_MAX + 1);', '  return Low + int(d*(High-Low));', '}', 'double RandReal(double Low,', '                double High) {', '  double d = (double) rand()', '        / (double)(RAND_MAX + 1);', '  return Low + d*(High-Low);', '}']} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The lab says R1 is in [0, 1]. Strictly it is <b>[0, 1)</b>: R0 ≤ RAND_MAX &lt; RAND_MAX + 1. So int(R1 × (High − Low)) ≤ High − Low − 1 and <b>RandInt never returns High</b>: RandInt(1, 10) gives 1…9 and RandInt(1, 6) gives 1…5. To include High, scale by (High − Low + 1).',
            '‡ الـ lab كاتب إن الـ R1 في ' + B('[0, 1]') + '، بس هي فعلًا في ' + B('[0, 1)') + ' لأن الـ R0 عمره ما يوصل للـ ' + B('RAND_MAX + 1') + '. يبقى <b>الـ RandInt عمرها ما ترجّع High</b>:' + L('RandInt(1, 10) → 1…9 ,  RandInt(1, 6) → 1…5') + 'ولو عايز الـ High يطلع، اضرب في ' + B('(High − Low + 1)') + '.')}</p></${Box}>
          <${Hand} red=${true}>${t('the Gift Shop output proves it: delays only up to 9, service times only up to 5', 'والـ Gift Shop بيثبتها: الـ delays لحد 9 والـ service لحد 5')}</${Hand}>
        `),

        // 7 · drill
        page(html`
          <${Box} kind="pencil" title=${t('Be RandInt', 'خليك إنت الـ RandInt')}><p className="hf-p small">${t('Run the lab\'s function in your head. Tap an answer for each, then check.', 'شغّل الـ function بتاعة الـ lab في دماغك. اختار إجابة لكل سؤال، وبعدين صحّح.')}</p></${Box}>
          <${Drill} id="rand" rows=${[
            { q: t('RandInt(1, 10) with R1 = 0.5', 'الـ ' + B('RandInt(1, 10)') + ' والـ R1 بنص'), o: ['4', '5', '6'], a: 1, w: t('R2 = 4.5, int → 4, then + Low = 5.', 'الـ R2 بـ 4.5 والـ int بيخليها 4، وبعدين نزوّد الـ Low فتبقى 5.') },
            { q: t('RandInt(1, 10) with R1 = 0.99', 'الـ ' + B('RandInt(1, 10)') + ' والـ R1 بـ 0.99'), o: ['9', '10', '8'], a: 0, w: t('0.99 × 9 = 8.91 → 8, + 1 = 9.', 'حاصل الضرب 8.91 والـ int بيخليه 8، وزوّد واحد يبقى 9.') },
            { q: t('The largest value RandInt(1, 6) can return', 'أكبر قيمة الـ ' + B('RandInt(1, 6)') + ' ممكن ترجّعها'), o: ['6', '5', '7'], a: 1, w: t('R1 &lt; 1, so int(R1 × 5) ≤ 4: at most 5.', 'الـ R1 أقل من 1، فالـ ' + B('int(R1 × 5)') + ' أكبر حاجة 4، والنتيجة أكبر حاجة 5.') },
            { q: t('integerRand(0, 1) built on this RandInt', 'الـ ' + B('integerRand(0, 1)') + ' لو مبنية على الـ RandInt دي'), o: [t('0 or 1', '0 أو 1'), t('always 0', 'دايمًا 0'), t('always 1', 'دايمًا 1')], a: 1, w: t('0 + int(d × 1) = 0 every time.', 'النتيجة ' + B('0 + int(d × 1)') + ' يعني صفر كل مرة.') }
          ]} />
        `),

        // 8 · the unbiased coin
        page(html`
          <${H1}>${t('Case 1: the unbiased coin', 'الـ case الأولى: العملة الـ unbiased')}</${H1}>
          <${P} small=${true}>${X('<b>Goal</b> (Lab 2, Activity 2): use simulation to show that <b>P(H) = P(T) = 1/2</b> for a fair coin. It is an application of the standard algorithm.',
            '<b>الهدف</b> (Lab 2، Activity 2): نثبت بالـ simulation إن' + L('P(H) = P(T) = 1/2') + 'للعملة الـ fair. وده تطبيق على الـ standard algorithm.')}</${P}>
          <${UL} items=${A ? ['ارمي العملة <b>100 مرة</b>: كل رمية ' + B('R = RealRand(0, 1)'), 'لو الـ R أقل من 0.5 عدّها Head، غير كده Tail', 'وفي الآخر:' + L('P(H) = Head_count / 100 ,  P(T) = Tail_count / 100')]
            : ['Toss the coin <b>100 times</b>: each toss R = RealRand(0, 1)', 'R &lt; 0.5 counts a Head, otherwise a Tail', 'P(H) = Head_count / 100, P(T) = Tail_count / 100']} />
          <${Talk} who="dice">${X('The lab\'s Excel run: <code>=RAND()</code>, then <code>=IF(A2&lt;0.5,"H","T")</code> and <code>COUNTIF</code>. I gave <b>48 Heads and 52 Tails</b>. Close to 0.5!',
            'في الـ Excel بتاع الـ lab بـ <code>=RAND()</code> و<code>IF</code> و<code>COUNTIF</code> طلّعت <b>48 Head و52 Tail</b>. قريب من النص!')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('The flowchart counts a Head when <b>R &lt; 0.5</b>, the C++ code when <code>res &lt;= 0.5</code>: both give probability 0.5. ‡ The IntRand flowchart, integerRand(0, 1), returns 0 every time with the Lab 1 RandInt, so every toss would be a Head: an integer coin needs RandInt(0, 2).',
            'الـ flowchart بيعد Head لما ' + B('R < 0.5') + ' والكود لما <code>res &lt;= 0.5</code>، والاتنين نص. ‡ الـ IntRand مع RandInt بتاعة Lab 1 بترجّع صفر دايمًا، فكله Head، والصح ' + B('RandInt(0, 2)') + '.')}</p></${Box}>
        `, { sec: t('Case 1 · Unbiased coin', 'الـ case 1 · العملة') }),
        page(html`
          <${Fig} name="ms-coin-flow" head=${t('The two lab flowcharts, walked', 'الـ flowcharts بتوع الـ lab خطوة بخطوة')} />
        `),
        page(html`
          <${Fig} name="ms-coin-sim" head=${t('Toss 100, 1000, 10000 times', 'ارمي 100 و1000 و10000 مرة')} />
          <${Hand}>${t('more tosses, closer to 1/2', 'كل ما الرميات تزيد، النسبة تقرّب من النص')}</${Hand}>
        `),

        // 11 · gift shop: the problem
        page(html`
          <${H1}>${t('Case 2: the Gift Shop', 'الـ case التانية: الـ Gift Shop')}</${H1}>
          <${P} small=${true}>${X('A <b>single-channel queuing system</b>: the check-out stand of a small gift shop. Main target: <b>decrease the waiting time</b> of customers (and the time the clerk is idle).',
            'دي <b>single-channel queuing system</b>: الكاشير بتاع محل هدايا صغير. الهدف: <b>نقلّل الـ waiting time</b> بتاع الـ customers (والوقت اللي الـ clerk قاعد فيه فاضي).')}</${P}>
          <div className="hf-ms8-two hf-in">
            ${card(t('Assumptions', 'الـ assumptions'), t('Inter-arrival time uniform <b>1 to 10</b> min; service time uniform <b>1 to 6</b> min (rounded to the minute).', 'الوقت بين الـ arrivals uniform من <b>1 لـ 10</b> دقايق، والـ service time uniform من <b>1 لـ 6</b>.'))}
            ${card(t('Outputs', 'الـ outputs'), t('Average time a customer spends <b>in the system</b> (waiting + service); <b>% of time the clerk is idle</b>.', 'متوسط وقت الـ customer <b>في الـ system</b> (انتظار وخدمة)، و<b>نسبة وقت الـ clerk الفاضي</b>.'))}
            ${card(t('System', 'الـ system'), t('<b>Server</b> (clerk), <b>units</b> (customers), <b>clock</b>.', 'فيه <b>server</b> هو الـ clerk، و<b>units</b> هم الـ customers، و<b>clock</b>.'))}
            ${card(t('State and events', 'الـ state والـ events'), t('State: number of units in the system, server idle or busy. Events: <b>arrival</b> and <b>departure</b>.', 'الـ state هي عدد الـ units وحالة الـ server (فاضي ولا مشغول). والـ events هي الـ <b>arrival</b> والـ <b>departure</b>.'))}
          </div>
          <${Talk} who="cust" flip=${true}>${t("I'm customer #7. I just want to pay and leave.", 'أنا الـ customer رقم 7. عايز أدفع وأمشي وبس.')}</${Talk}>
        `, { sec: t('Case 2 · Gift Shop', 'الـ case 2 · الـ Gift Shop') }),
        page(html`
          <${Fig} name="ms-gift-events" head=${t('Fire an arrival or a departure', 'اعمل arrival أو departure')} />
        `),

        // 13 · the model
        page(html`
          <${H2}>${t('Five equations fill one row', 'خمس معادلات بيملوا صف واحد')}</${H2}>
          <${P} small=${true}>${X('For each customer i, generate a <b>delay</b> (inter-arrival time) and a <b>service time</b>, then:', 'لكل customer رقم i، طلّع <b>delay</b> (الوقت من اللي قبله) و<b>service time</b>، وبعدين:')}</${P}>
          <${Code} lines=${['1 Ar_Clk[i] = Ar_Clk[i−1] + delay[i]', '2 Serv_begin[i] =', '    Max(Ar_Clk[i], Serv_end[i−1])', '3 Serv_end[i] =', '    Serv_begin[i] + Serv_time[i]', '4 WT[i] = Serv_end[i] − Ar_Clk[i]', '5 Idle[i] = Ar_Clk[i] − Serv_end[i−1]', '    if positive, else 0']} />
          <${Code} lines=${['Ar = Σ WT(i) / n', 'P  = Σ Idle(i) / t × 100']} />
          <${P} small=${true}>${X('Customer 1: everything 0, WT = its service time. <b>t</b> = last service end.',
            'أول customer: كله صفر والـ WT هو الـ service time. والـ <b>t</b> هو خلاص آخر customer.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Max</b>, not Min: service starts at arrival or when the clerk is free, whichever is <b>later</b>. WT is time <b>in the system</b>.',
            'الـ <b>Max</b> مش الـ Min: الخدمة بتبدأ عند الوصول أو فضيان الـ clerk، أيهما <b>أبعد</b>. والـ WT هو الوقت <b>في الـ system</b>.')}</p></${Box}>
        `),
        page(html`
          <${Fig} name="ms-gift-ex" head=${t('The worked example, customer by customer', 'المثال المحلول، customer ورا customer')} />
        `),
        page(html`
          <${H2}>${t('In the worked example', 'في المثال المحلول')}</${H2}>
          ${tb(['#', 'Dly', 'ST', 'Arr', 'Beg', 'End', 'WT', 'Idle'], [['1', 0, 2, 0, 0, 2, 2, 0], ['2', 4, 5, 4, 4, 9, 5, 2], ['3', 2, 1, 6, 9, 10, 4, 0], ['4', 8, 4, 14, 14, 18, 4, 4], ['5', 3, 3, 17, 18, 21, 4, 0]], 2)}
          <${UL} items=${A ? ['الـ customer رقم 3 وصل عند 6 والـ clerk مشغول لحد 9، فـ' + L('WT = 10 − 6 = 4   (1 service + 3 waiting)'), 'الـ customer رقم 2 لقى الـ clerk فاضي من عند 2، فالـ idle بـ 2. ورقم 4 الـ idle بتاعه ' + B('14 − 10 = 4') + '.', 'النتيجة:' + L('Ar = 19/5 = 3.8 min ,  P = 6/21 × 100 = 28.57%')]
            : ['Customer 3 arrives at 6 but the clerk is busy until 9: WT = 10 − 6 = 4 (1 min service + 3 min waiting).', 'Customer 2 finds the clerk free since 2: idle = 2. Customer 4: idle = 14 − 10 = 4.', 'Ar = 19/5 = <b>3.8 min</b>; P = 6/21 × 100 = <b>28.57%</b>.']} />
          <${Hand} red=${true}>${t('‡ the lab writes 28.5%: it truncates 28.57', '‡ الـ lab كاتبها 28.5% لأنه قطع الكسر من 28.57')}</${Hand}>
          <${Grow} />
          <${Hand}>${t('standard clerk idle, according to H.R.W.: 12.5%', 'الـ clerk idle القياسي حسب H.R.W. هو 12.5%')}</${Hand}>
        `),

        // 16 · exercise: be the clerk
        page(html`
          <${Box} kind="pencil" title=${t('Be the clerk', 'خليك إنت الـ clerk')}><p className="hf-p small">${X('The lab\'s exercise: type customers 2 to 5\'s numbers, then check.', 'تمرين الـ lab: اكتب أرقام الـ customers من 2 لـ 5، وبعدين صحّح.')}</p></${Box}>
          <${GiftFill} id="gift" />
        `, { sec: t('Exercises', 'التمارين') }),
        page(html`
          <${Fig} name="ms-gift-exr" head=${t('Check it: every arrival finds the clerk free', 'راجع: كل واحد بيوصل بيلاقي الـ clerk فاضي')} />
        `),

        // 18 · the code
        page(html`
          <${H2}>${t('The lab\'s program: 20 customers', 'برنامج الـ lab: 20 customer')}</${H2}>
          <${P} small=${true}>${X('A <code>struct customer</code> holds delay, st, ar_clk, s_begin, s_end, wt, idle; an array of n + 1 customers is made with <code>new</code>. The loop is the five equations:',
            'فيه <code>struct customer</code> شايل الـ delay والـ st والـ ar_clk والـ s_begin والـ s_end والـ wt والـ idle، وarray فيه ' + B('n + 1') + ' customers معمول بـ <code>new</code>. والـ loop هو الخمس معادلات:')}</${P}>
          <${Code} lines=${['for (i = 2; i <= n; i++) {', '  c[i].delay = RandInt(1,10);', '  c[i].st = RandInt(1,6);', '  c[i].ar_clk = c[i-1].ar_clk', '               + c[i].delay;', '  c[i].s_begin = max(c[i].ar_clk,', '                     c[i-1].s_end);', '  c[i].s_end = c[i].s_begin', '               + c[i].st;', '  c[i].wt = c[i].s_end', '            - c[i].ar_clk;', '  // idle if c[i-1].s_end < ar_clk', '}', 'Av_wait = (double) T_time / n;', 'P = (double) T_idle', '    / c[n].s_end;']} />
        `),
        page(html`
          <${Fig} name="ms-gift-run" head=${t('The program\'s 20 customers', 'الـ 20 customer بتوع البرنامج')} />
        `),
        page(html`
          <${H2}>${t('Statistical analysis of the run', 'الـ statistical analysis بتاع التجربة')}</${H2}>
          <${P} small=${true}>${X('Only customer 9 waits (arrives at 49, clerk busy until 50). Σ WT = 48 → Ar = 48/20 = <b>2.4 min</b>, good for the customer. Σ Idle = 57 over t = 104 → P = <b>54.8%</b> (prints 54.8077%): far above the <b>12.5% standard</b>, so the clerk is idle for a long time.',
            'الـ customer رقم 9 بس اللي استنى. ' + B('Σ WT = 48') + ' يعني ' + B('Ar = 2.4 min') + ' وده كويس للـ customer. و' + B('Σ Idle = 57') + ' على ' + B('t = 104') + ' يعني <b>' + B('54.8%') + '</b>، أعلى بكتير من الـ <b>12.5%</b>، فالـ clerk فاضي كتير.')}</${P}>
          <${Dumb} qa=${A ? [['ليه الـ t هو وقت خلاص آخر customer؟', 'لأن ده طول الوقت اللي عملناله simulation، والكود بيقسم على <code>c[n].s_end</code>.'], ['هو 2.4 دقيقة ده waiting بس؟', 'لأ، ده الوقت <b>في الـ system</b>: انتظار وخدمة. الـ customer رقم 9 بس اللي استنى فعلًا دقيقة.']]
            : [['Why is t the last customer\'s service end?', 'It is the length of the simulated time: the code divides by <code>c[n].s_end</code>.'], ['Is 2.4 min pure waiting?', 'No: it is time <b>in the system</b>, waiting plus service. Only customer 9 actually queued, for 1 minute.']]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('The clerk idles 54.8% of the time and customers barely wait. If you owned the shop, what would you change, and how would you test it before changing anything real?', 'الـ clerk فاضي 54.8% من الوقت والـ customers تقريبًا مبيستنوش. لو المحل بتاعك، هتغيّر إيه، وهتجرّبه إزاي قبل ما تغيّر حاجة في الحقيقة؟')}</p></${Box}>
        `),

        // 20 · area under a curve
        page(html`
          <${H1}>${t('Case 3: darts under a curve', 'الـ case التالتة: سهام تحت منحنى')}</${H1}>
          <${P} small=${true}>${X('The area A under a non-negative curve y = f(x), from x = b to x = c, with 0 ≤ f(x) ≤ h, is the integral of f. Put it in the rectangle R of base (b, c) and height h, and <b>drop random points</b> on R like darts.',
            'المساحة A تحت منحنى موجب ' + B('y = f(x)') + ' من b لـ c، والـ f ما بين صفر والـ h، هي التكامل. حطها جوه مستطيل R قاعدته من b لـ c وارتفاعه h، و<b>ارمي نقط عشوائية</b> عليه زي السهام.')}</${P}>
          <${Fig} name="ms-area-fig" />
          <${Code} lines=${[['p = A / (h (c − b))', t('chance to land in A', 'احتمال الوقوع في A')], ['A = K h (c − b) / N', t('K of N points accepted', 'K نقطة من N اتقبلت')]]} />
        `, { sec: t('Case 3 · Area (Monte Carlo)', 'الـ case 3 · المساحة') }),
        page(html`
          <${Fig} name="ms-area-flow" head=${t('Figure 8-2 with the book\'s f(x) = √(1 − x²)', 'الشكل 8-2 بالدالة بتاعة الكتاب')} />
          <${Hand}>${t('this is the acceptance-rejection case study (Case study 5, Activity 10)', 'دي الـ case study بتاعة الـ acceptance-rejection (الـ case 5، Activity 10)')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('The book\'s run, and the exact answer', 'تجربة الكتاب، والإجابة المظبوطة')}</${H2}>
          <${P} small=${true}>${X('A Pascal program with b = 0, c = 1, h = 1 and f(x) = √(1 − x²), so A = K/N. It prints every 500 trials:',
            'برنامج Pascal فيه ' + B('b = 0, c = 1, h = 1') + ' والدالة ' + B('f(x) = √(1 − x²)') + '، فالـ A بتبقى ' + B('K/N') + '. وبيطبع كل 500 محاولة:')}</${P}>
          ${tb(['N', 'A (printed)', 'K = A × N'], [['500', '0.7680001', 384], ['1000', '0.76899999', 769], ['1500', '0.76933336', 1154], ['2000', '0.78100002', 1562], ['2500', '0.78560001', 1964], ['3000', '0.78399998', 2352]], 5)}
          <${Code} lines=${['x = sin θ,  dx = cos θ dθ', 'A = ∫ cos²θ dθ  (θ: 0 → π/2)', '  = ½ [θ + ½ sin 2θ]', '  = π/4 = 0.7853981']} />
          <${P} small=${true}>${X('After 3000 trials the simulation is off by about <b>0.0014</b>. ‡ The book writes ½∫(1 + cos²θ); it should be (1 + cos 2θ), since cos²θ = ½(1 + cos 2θ).',
            'بعد 3000 محاولة الفرق حوالي <b>0.0014</b>. ‡ الكتاب كاتب ' + B('½∫(1 + cos²θ)') + ' والصح ' + B('(1 + cos 2θ)') + ' لأن ' + B('cos²θ = ½(1 + cos 2θ)') + '.')}</${P}>
        `),
        page(html`
          <${Fig} name="ms-area-sim" head=${t('Drop your own 3000 points', 'ارمي الـ 3000 نقطة بتوعك')} />
        `),
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${t('Area by darts. Tap an answer for each.', 'المساحة بالسهام. اختار إجابة لكل سؤال.')}</p></${Box}>
          <${Drill} id="area" rows=${[
            { q: t('The book prints A = 0.7680001 after 500 trials. How many points were accepted?', 'الكتاب طبع ' + B('A = 0.7680001') + ' بعد 500 محاولة. كام نقطة اتقبلت؟'), o: ['384', '393', '768'], a: 0, w: t('K = A × N = 0.768 × 500 = 384.', 'الـ K هي ' + B('0.768 × 500 = 384') + '.') },
            { q: t('Our example: h = 2, c − b = 3, N = 1000, K = 400. A = ?', 'مثال من عندنا: ' + B('h = 2, c − b = 3, N = 1000, K = 400') + '. الـ A كام؟'), o: ['0.4', '2.4', '1.2'], a: 1, w: t('A = 400 × 2 × 3 / 1000 = 2.4.', 'الـ A هي ' + B('400 × 2 × 3 / 1000 = 2.4') + '.') },
            { q: t('A point (x, y) with y &gt; f(x) is…', 'نقطة الـ y بتاعتها أكبر من ' + B('f(x)') + ' بتبقى…'), o: [t('accepted', 'مقبولة'), t('rejected', 'مرفوضة')], a: 1, w: t('Above the curve: rejected; only y ≤ f(x) adds to K.', 'فوق المنحنى يعني rejected، والـ K بتزيد بس لما ' + B('y ≤ f(x)') + '.') }
          ]} />
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('Simulation is attractive only when a problem is <b>difficult, time consuming, expensive, hazardous or impossible</b> to solve analytically, numerically or by physical experiment. Its results are likely <b>less accurate than analytic solutions</b>.',
            'الـ simulation بتبقى مغرية بس لما المشكلة <b>صعبة أو بتاخد وقت أو غالية أو خطيرة أو مستحيلة</b> بالطرق التانية. ونتايجها غالبًا <b>أقل دقة من الحل التحليلي</b>.')}</p></${Box}>
        `),

        // 25 · pursuit
        page(html`
          <${H1}>${t('Case 4: the pure pursuit', 'الـ case الرابعة: الـ pure pursuit')}</${H1}>
          <${P} small=${true}>${X('A fighter sights an enemy bomber and flies <b>directly toward it</b>. The bomber keeps flying along a specified curve, so the fighter keeps turning. Target: <b>when does the fighter catch the bomber?</b>',
            'طيارة fighter شافت bomber عدو وبتطير <b>ناحيته على طول</b>. الـ bomber ماشي على منحنى محدد، فالـ fighter لازم يفضل يلف. السؤال: <b>الـ fighter هيمسك الـ bomber إمتى؟</b>')}</${P}>
          <${UL} items=${A ? ['الطيارتين في <b>نفس المستوى الأفقي</b>، فالـ model <b>two-dimensional</b>', 'سرعة الـ fighter <b>ثابتة</b>:' + L('VF = 20 km/min'), 'مسار الـ bomber <b>معروف</b> (مكانه كـ function في الوقت)', 'كل <b>دقيقة</b> الـ fighter بيوجّه نفسه ناحية الـ bomber، لمدة 12 دقيقة', 'بيضربه بـ missile لما يبقى <b>على بعد 10 km أو أقل</b>، ولو عدّت 12 دقيقة الـ bomber بيهرب']
            : ['Both fly in the <b>same horizontal plane</b>: a <b>two-dimensional</b> model', 'Fighter speed <b>constant, VF = 20 km/minute</b>', 'The bomber\'s path (position vs time) is <b>specified</b>', 'Every <b>Δt = 1 minute</b> the fighter re-points at the bomber (for 12 min)', 'Missile once <b>within 10 km</b>; not caught in <b>12 minutes</b> → the bomber escapes']} />
          <${Box} kind="brain"><p className="hf-p small">${X('If the bomber flew in a straight line, this could be solved analytically. Why does a curved path push us to simulation?',
            'لو الـ bomber طاير في خط مستقيم، المشكلة تتحل analytically. ليه المسار المنحني بيخلّينا نلجأ للـ simulation؟')}</p></${Box}>
        `, { sec: t('Case 4 · Pursuit', 'الـ case 4 · الـ Pursuit') }),
        page(html`
          <${Fig} name="ms-pursuit-pos" head=${t('Figure 8-3: positions at time zero', 'الشكل 8-3: الأماكن عند الصفر')} />
          <${P} small=${true}>${X('Origin due south of the fighter and due west of the bomber; km and minutes. Fighter at <b>(0, 50)</b>, bomber at <b>(80, 0)</b>.',
            'نقطة الأصل جنوب الـ fighter وغرب الـ bomber، والمسافات بالـ km والوقت بالدقايق. الـ fighter عند <b>' + B('(0, 50)') + '</b> والـ bomber عند <b>' + B('(80, 0)') + '</b>.')}</${P}>
          ${tb(['t', '0', '1', '2', '3', '4', '5', '6'], [['XB', 80, 90, 99, 108, 116, 125, 133], ['YB', 0, -2, -5, -9, -15, -18, -23]])}
          ${tb(['t', '7', '8', '9', '10', '11', '12'], [['XB', 141, 151, 160, 169, 179, 180], ['YB', -29, -28, -25, -21, -20, -17]])}
        `),
        page(html`
          <${H2}>${t('Look, align, fly one minute, repeat', 'بص، اتوجّه، طير دقيقة، وكرّر')}</${H2}>
          <${P} small=${true}>${X('At instant t the fighter <b>aligns its velocity vector with the line of sight</b> and flies that way until t + 1:', 'عند اللحظة t الـ fighter <b>بيوجّه الـ velocity vector بتاعه على خط النظر</b> وبيطير كده لحد ' + B('t + 1') + ':')}</${P}>
          <${Code} lines=${[['DIST = √[(YB − YF)² + (XB − XF)²]', '(2-1)'], ['sin θ = (YB(t) − YF(t)) / DIST', '(2-2)'], ['cos θ = (XB(t) − XF(t)) / DIST', '(2-3)'], ['XF(t+1) = XF(t) + VF cos θ', '(2-4)'], ['YF(t+1) = YF(t) + VF sin θ', '(2-5)']]} />
          <${P} small=${true}>${X('If DIST ≤ 10 the pursuit is over; otherwise recompute θ and go on.', 'لو الـ DIST بقت 10 أو أقل خلصت المطاردة، غير كده نحسب الـ θ تاني ونكمّل.')}</${P}>
          <${Talk} who="cpu" flip=${true}>${X('Nobody can write the whole path in one formula. But I can go from instant to instant, as many instants as you like, because you told me the <b>basic process</b>: how the fighter behaves at any instant.',
            'محدش يقدر يكتب المسار كله في معادلة واحدة. بس أنا أقدر أمشي من لحظة للحظة، قد ما تحب، لأنك قولتلي الـ <b>basic process</b>: الـ fighter بيتصرف إزاي في أي لحظة.')}</${Talk}>
          <${Hand} red=${true}>${t('such knowledge is essential for all simulation experiments', 'المعرفة دي أساسية في كل تجارب الـ simulation')}</${Hand}>
        `),
        page(html`
          <${Fig} name="ms-pursuit-flow" head=${t('Figure 8-4: the distance test every minute', 'الشكل 8-4: اختبار المسافة كل دقيقة')} />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Be the fighter', 'خليك إنت الـ fighter')}><p className="hf-p small">${t('The lab\'s hand steps, sin and cos rounded to 2 decimals.', 'خطوات الـ lab بالإيد، والـ sin والـ cos متقرّبين لرقمين عشريين.')}</p></${Box}>
          <${Drill} id="purs" rows=${[
            { q: t('DIST(0), fighter (0, 50), bomber (80, 0)', 'الـ ' + B('DIST(0)') + ' والـ fighter عند ' + B('(0, 50)') + ' والـ bomber عند ' + B('(80, 0)')), o: ['130', '94.34', '83.92'], a: 1, w: t('√(50² + 80²) = √8900 = 94.34, not 80 + 50.', 'الجذر ' + B('√(50² + 80²) = 94.34') + '، مش مجموعهم.') },
            { q: t('sin θ at t = 0', 'الـ ' + B('sin θ') + ' عند الصفر'), o: ['0.53', '−0.53', '0.85'], a: 1, w: t('(0 − 50)/94.34 = −0.53: the bomber is below.', 'القيمة ' + B('(0 − 50)/94.34 = −0.53') + ' لأن الـ bomber تحت.') },
            { q: t('XF(1) = 0 + 20 × 0.85', 'الـ ' + B('XF(1) = 0 + 20 × 0.85')), o: ['17', '10.6', '20'], a: 0 },
            { q: t('YF(1) = 50 + 20 × (−0.53)', 'الـ ' + B('YF(1) = 50 + 20 × (−0.53)')), o: ['60.6', '39.4', '29.6'], a: 1 },
            { q: t('DIST(8) = 11.447 km. The bomber is…', 'الـ ' + B('DIST(8) = 11.447') + '. الـ bomber…'), o: [t('shot down', 'اتضرب'), t('not yet caught', 'لسه متمسكش')], a: 1, w: t('11.447 &gt; 10: one more minute.', 'لسه أكبر من 10، فاضل دقيقة كمان.') }
          ]} />
        `),
        page(html`
          <${Fig} name="ms-pursuit-sim" head=${t('The pursuit minute by minute', 'المطاردة دقيقة بدقيقة')} />
          <${Hand} red=${true}>${t('caught at t = 9 minutes, 2.969 km away', 'اتمسك عند الدقيقة 9، على بعد 2.969 km')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('The program\'s numbers vs the lab\'s hand', 'أرقام البرنامج وأرقام الـ lab بالإيد')}</${H2}>
          ${tb(['t', 'XF', 'YF', 'DIST'], [['0', '0.000', '50.000', '94.340'], ['1', '16.960', '39.400', '83.957'], ['2', '34.359', '29.538', '73.289'], ['…', '…', '…', '…'], ['8', '139.554', '-28.087', '11.447'], ['9', '159.553', '-27.935', '2.969']], 5)}
          <${P} small=${true}>${X('The lab rounds sin and cos to 2 decimals and gets XF(1) = 17, Dist(1) = <b>83.922</b>, XF(2) = 34.4, YF(2) = 29.6. The program keeps full precision: XF(1) = 16.96, Dist(1) = <b>83.957</b>. Small differences, same catch at t = 9.',
            'الـ lab بيقرّب الـ sin والـ cos فبيطلع ' + B('XF(1) = 17') + ' و' + B('Dist(1) = 83.922') + '، والبرنامج بيحتفظ بالدقة كلها فبيطلع ' + B('XF(1) = 16.96') + ' و' + B('Dist(1) = 83.957') + '. فروق صغيرة، ونفس المسكة عند الدقيقة 9.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('The C++ code updates xf and yf <b>before</b> it tests dist ≤ 10, but it prints the distance and time t that were tested, so the answer is the same: "The Fighter Catch &amp; Destroy The Bomber at Distance = 2.969 &amp; Time = 9".',
            'الكود بيحدّث الـ xf والـ yf <b>قبل</b> ما يختبر ' + B('dist ≤ 10') + '، بس بيطبع المسافة والـ t اللي اختبرهم، فالنتيجة واحدة:' + L('"The Fighter Catch &amp; Destroy The Bomber at Distance = 2.969 &amp; Time = 9"'))}</p></${Box}>
        `),

        // 32 · fireside: the fighter and the drunk
        page(html`
          <${Fireside} sub=${t("Tonight's talk: the Fighter from the pursuit problem meets the Staggering Drunk.", 'قعدة الليلة: الـ Fighter بتاع مشكلة المطاردة قاعد مع الـ Drunk اللي بيترنّح.')} />
          <${Chat} names=${[t('Fighter', 'الـ Fighter'), t('Drunk', 'الـ Drunk')]} lines=${A ? [
            [0, 'أنا عارف رايح فين بالظبط: على الـ bomber. كل دقيقة ببص، وبتوجّه على خط النظر، وبطير 20 km.'],
            [1, 'رايح فين؟ اسأل الـ random numbers. من 00 لـ 24 شرق، ومن 25 لـ 49 غرب، ومن 50 لـ 74 شمال، ومن 75 لـ 99 جنوب. كل اتجاه احتماله ربع.'],
            [0, 'مساري كله من خمس معادلات. إدّيني مسار الـ bomber وهقولك نفس الإجابة كل مرة: اتمسك عند الدقيقة 9.'],
            [1, 'أنا مفيش فيا random numbers غير كده. شغّلني خمس مرات تاخد خمس مشاوير مختلفين. في الكتاب 3 من 5 خلصوا على بعد بلوكين أو أقل.'],
            [0, 'يعني الإجابة بتاعتك 0.6؟'],
            [1, 'دي تقدير بس. خمس محاولات <b>مش كفاية</b> عشان نعرف الاحتمال الحقيقي. محتاج مشاوير أكتر بكتير.']
          ] : [
            [0, "I know exactly where I'm going: straight at the bomber. Every minute I look, align with the line of sight, and fly 20 km."],
            [1, "Where am I going? Ask the random numbers. 00–24 east, 25–49 west, 50–74 north, 75–99 south. Each with probability 1/4."],
            [0, "My whole course comes from five equations. Give me the bomber's path and I give you the same answer every time: caught at t = 9."],
            [1, "I'm made of random numbers. Run me five times, you get five different walks. In the book, 3 of 5 ended within 2 blocks."],
            [0, 'So your answer is 0.6?'],
            [1, "That's only an estimate. Five trials are <b>insufficient</b> for the true probability. I need many more walks."]
          ]} />
        `, { sec: t('Case 5 · Staggering drunk', 'الـ case 5 · الـ Drunk') }),

        // 33 · the drunk
        page(html`
          <${H1}>${t('Case 5: the staggering drunk', 'الـ case الخامسة: الـ staggering drunk')}</${H1}>
          <${P} small=${true}>${X('A drunk at a street corner goes for a walk. At each corner he goes <b>north, south, east or west with equal probability</b>. If he walks <b>10 blocks</b>, what is the probability he ends <b>within 2 blocks</b> of where he started?',
            'واحد سكران واقف على ناصية وقرر يتمشى. عند كل ناصية بيروح <b>شمال أو جنوب أو شرق أو غرب بنفس الاحتمال</b>. لو مشي <b>10 بلوكات</b>، إيه احتمال إنه يخلص <b>على بعد بلوكين أو أقل</b> من مكانه؟')}</${P}>
          <${P} small=${true}>${X('His location is a vector (X, Y), starting at (0, 0). Each corner uses one <b>two-digit random number</b>:', 'مكانه vector ' + B('(X, Y)') + ' بيبدأ من ' + B('(0, 0)') + '. وكل ناصية بتستخدم <b>random number من رقمين</b>:')}</${P}>
          ${tb(['RN', '00-24', '25-49', '50-74', '75-99'], [[t('Move', 'الحركة'), 'E: X+1', 'W: X−1', 'N: Y+1', 'S: Y−1']])}
          <${Def}>${X('After 10 blocks: <b>|X| + |Y| ≤ 2</b> is a success; |X| + |Y| &gt; 2 is a failure.', 'بعد 10 بلوكات: لو' + L('|X| + |Y| ≤ 2') + 'تبقى success، ولو أكبر من 2 تبقى failure.')}</${Def}>
          <${Hand} red=${true}>${t('‡ the text calls them "Figure (4-3)" and "Table (4-1)": they are Figure 8-5 and Table 8-1', '‡ الكتاب سماهم "Figure (4-3)" و"Table (4-1)"، والصح Figure 8-5 وTable 8-1')}</${Hand}>
        `),
        page(html`
          <${Fig} name="ms-drunk-flow" head=${t('Figure 8-5 with trial 1\'s random numbers', 'الشكل 8-5 بالـ random numbers بتاعة المحاولة 1')} />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Be the drunk: trial 2', 'خليك إنت السكران: المحاولة 2')}></${Box}>
          <${Sort} id="drunk" bins=${[['E', t('east', 'شرق')], ['W', t('west', 'غرب')], ['N', t('north', 'شمال')], ['S', t('south', 'جنوب')]]}
            items=${[10, 89, 14, 81, 30, 91, 6, 38, 79, 43].map((rn, k) => [(A ? 'البلوك ' + (k + 1) + ': ' : 'Block ' + (k + 1) + ': ') + '<code>' + String(rn).padStart(2, '0') + '</code>', rn < 25 ? 0 : rn < 50 ? 1 : rn < 75 ? 2 : 3])} />
        `),
        page(html`
          <${Fig} name="ms-drunk-sim" head=${t('Table 8-1 on the street grid, and 1000 trials', 'الـ Table 8-1 على خريطة الشوارع، و1000 محاولة')} />
          <${P} small=${true}>${X('Your trial 2: E S E S W S E W S W → (0, −4), |0| + |−4| = 4 &gt; 2, a failure. Trials 1, 4 and 5 end at (−1, −1), (2, 0), (−1, 1): successes. Trials 2 and 3 end at (0, −4), (4, −2): failures. Estimate <b>3/5 = 0.6</b>, from too few trials.',
            'المحاولة 2 بتاعتك خلصت عند ' + B('(0, −4)') + ' والمجموع 4 أكبر من 2، يعني failure. والمحاولات 1 و4 و5 خلصوا عند ' + B('(−1, −1)') + ' و' + B('(2, 0)') + ' و' + B('(−1, 1)') + ' يعني success، و2 و3 خلصوا عند ' + B('(0, −4)') + ' و' + B('(4, −2)') + '. التقدير <b>' + B('3/5 = 0.6') + '</b> من محاولات قليلة.')}</${P}>
        `),

        // 37 · flipping coin game
        page(html`
          <${H1}>${t('Case 6: the flipping coin game', 'الـ case السادسة: لعبة رمي العملة')}</${H1}>
          <${P} small=${true}>${X('Main target: decide whether the game is <b>safe to play</b>. The assumptions (Lab 5):', 'الهدف: نقرر اللعبة <b>آمنة نلعبها</b> ولا لأ. الـ assumptions (Lab 5):')}</${P}>
          <${UL} items=${A ? ['عملة unbiased، والـ Head والـ Tail كل واحد احتماله نص', 'اللعبة بتقف لما الفرق بين الـ heads والـ tails يبقى 3:' + L('|H − T| = 3'), 'بتدفع <b>$1 للرمية</b> وتاخد <b>$8 في الآخر</b>، ومفيش انسحاب', 'بتكسب لو الرميات أقل من 8 وتخسر لو أكتر', 'بتتكرر <b>100 مرة</b> عشان نسبة المكسب']
            : ['Unbiased coin, P(H) = P(T) = 0.5', 'A game stops when <b>|H − T| = 3</b>', 'Pay <b>$1 per flip</b>, receive <b>$8 at the end</b>; no quitting mid-game', 'Win if fewer than 8 flips, lose if more than 8', 'Repeat <b>100 games</b> to get the percentage of wins']} />
          <${Def}>${X('<b>Net gain = 8 − flips.</b> 5 flips → +$3; 13 flips → −$5.', '<b>صافي المكسب</b> هو' + L('Net gain = 8 − flips') + 'يعني 5 رميات بـ +$3، و13 رمية بـ −$5.')}</${Def}>
          <${Box} kind="brain"><p className="hf-p small">${X('Can a game ever end at exactly 8 flips, with a net gain of $0? (Hint: what happens to H − T after each flip?)', 'ينفع لعبة تخلص عند 8 رميات بالظبط وصافيها صفر؟ (تلميح: الـ ' + B('H − T') + ' بيحصله إيه بعد كل رمية؟)')}</p></${Box}>
        `, { sec: t('Case 6 · Coin game', 'الـ case 6 · لعبة العملة') }),
        page(html`
          <${Fig} name="ms-flip-flow" head=${t('The lab\'s flowchart with Quiz 2\'s games', 'الـ flowchart بتاع الـ lab بألعاب Quiz 2')} />
          <${Hand}>${X('answer to the Brain Power: the difference changes by 1 each flip, so it reaches 3 only after an <b>odd</b> number (3, 5, 7, 9…)', 'إجابة شغّل مخك: الفرق بيتغير 1 كل رمية، فبيوصل 3 بعد عدد <b>فردي</b> بس (3، 5، 7، 9…)')}</${Hand}>
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Be the scorekeeper (Quiz 2)', 'خليك إنت اللي بيحسب (Quiz 2)')}><p className="hf-p small">${X('Quiz 2 uses a fixed list of 100 random numbers: <b>rn &lt; 0.5 is a tail</b>, otherwise a head.', 'الـ Quiz 2 بيستخدم لستة ثابتة فيها 100 random number: <b>لو أقل من 0.5 تبقى tail</b>، غير كده head.')}</p></${Box}>
          <${Drill} id="flip" rows=${[
            { q: t('Game 2: 0.67, 0.83, 0.76. Net gain?', 'اللعبة 2: ' + B('0.67, 0.83, 0.76') + '. الصافي كام؟'), o: ['+5', '+3', '−1'], a: 0, w: t('H, H, H: |H − T| = 3 after 3 flips: 8 − 3 = 5.', 'تلات heads ورا بعض، يعني 3 رميات والصافي ' + B('8 − 3 = 5') + '.') },
            { q: t('Game 5: 0.22, 0.74, 0.96, 0.99, 0.77. Flips?', 'اللعبة 5: ' + B('0.22, 0.74, 0.96, 0.99, 0.77') + '. كام رمية؟'), o: ['3', '5', '7'], a: 1, w: t('T, then four H: −1, 0, 1, 2, 3: five flips, +3.', 'الأولى T وبعدها أربع H، فالفرق ' + B('−1, 0, 1, 2, 3') + ' يعني 5 رميات و+3.') },
            { q: t('Game 8 takes 25 flips. Net gain?', 'اللعبة 8 خدت 25 رمية. الصافي؟'), o: ['−17', '+17', '−25'], a: 0 },
            { q: t('The 13 net gains sum to −5. Mean?', 'مجموع الـ 13 صافي ' + B('−5') + '. الـ mean كام؟'), o: ['−5', '−0.3846', '0.08'], a: 1, w: t('−5/13 = −0.3846; 0.08 is the Lab 5 run.', 'القسمة ' + B('−5/13 = −0.3846') + '، والـ 0.08 دي بتاعة Lab 5.') },
            { q: t('So, is the game safe?', 'يبقى اللعبة آمنة؟'), o: [t('safe', 'آمنة'), t('not safe', 'مش آمنة')], a: 1, w: t('A negative mean means an expected loss over time.', 'الـ mean السالب معناه خسارة متوقعة على المدى الطويل.') }
          ]} />
        `),
        page(html`
          <${Fig} name="ms-flip-quiz" head=${t('Quiz 2\'s 13 games, flip by flip', 'الـ 13 لعبة بتوع Quiz 2، رمية رمية')} />
        `),
        page(html`
          <${H2}>${t('Same game, two verdicts', 'نفس اللعبة، وحكمين مختلفين')}</${H2}>
          <div className="hf-ms8-two hf-in">
            ${card(t('Lab 5: 100 random games', 'الـ Lab 5: مية لعبة'), t('P(success) = <b>0.71</b>, total gain 255, total loss 247 → "safe to play". Mean = (255 − 247)/100 = <b>0.08</b>, variance 58.034, SD √58.034 = 7.618.', 'نسبة المكسب <b>0.71</b>، والمكسب 255 والخسارة 247، يعني "آمنة". والـ mean هو ' + B('(255 − 247)/100 = 0.08') + '، والـ variance 58.034، والـ SD هو 7.618.'))}
            ${card(t('Quiz 2: 13 games', 'الـ Quiz 2: 13 لعبة'), t('Sum −5, mean <b>−0.3846</b>, variance 64.237, SD 8.015. 9 wins (+$37), 4 losses (−$42) → <b>not safe</b>.', 'المجموع ' + B('−5') + ' والـ mean <b>' + B('−0.3846') + '</b>، والـ variance 64.237 والـ SD هو 8.015. كسبنا 9 مرات (+$37) وخسرنا 4 (−$42)، يعني <b>مش آمنة</b>.'))}
          </div>
          <${Box} kind="watch"><p className="hf-p small">${X('A different set of random numbers and few games can <b>change the decision</b>: more runs are needed before deciding. ‡ The 13th game needs 27 flips but only 18 numbers remain (83–100); the code takes <code>rns[idx % total]</code> and reuses numbers 1–9.',
            'random numbers تانية وألعاب قليلة ممكن <b>يقلبوا القرار</b>، فمحتاجين runs أكتر قبل ما نقرر. ‡ اللعبة رقم 13 محتاجة 27 رمية وفاضل 18 رقم بس (من 83 لـ 100)، فالكود بياخد <code>rns[idx % total]</code> ويرجع يستخدم الأرقام من 1 لـ 9.')}</p></${Box}>
          <${Hand}>${X('variance divides by n (here 13): Σ(netᵢ − mean)² / n', 'الـ variance بتتقسم على عدد الألعاب' + L('Σ(netᵢ − mean)² / n ,  n = 13'))}</${Hand}>
        `),

        // 42 · newspaper seller
        page(html`
          <${H1}>${t('Case 7: the newspaper seller', 'الـ case السابعة: بياع الجرايد')}</${H1}>
          <${P} small=${true}>${X('Met in Lecture 2. Quiz 5 tests <b>six policies</b>, Q = 50, 60, …, 100 papers a day, over the same 10 days. Buy at <b>$0.33</b>, sell at <b>$0.50</b>, scrap at <b>$0.05</b>, lost profit <b>$0.17</b> per unmet demand.',
            'اتقابلنا معاه في Lecture 2. الـ Quiz 5 بيجرّب <b>ست policies</b> من 50 لـ 100 جرنال في اليوم على نفس الـ 10 أيام. الشرا بـ <b>$0.33</b> والبيع بـ <b>$0.50</b> والـ scrap بـ <b>$0.05</b>، والـ lost profit <b>$0.17</b> لكل طلب متلبّاش.')}</${P}>
          <${P} small=${true}>${X('Newsday type: <b>Good</b> RN 01–35, <b>Fair</b> 36–80, <b>Poor</b> 81–100. Then the demand:', 'نوع اليوم: <b>Good</b> من 01 لـ 35، و<b>Fair</b> من 36 لـ 80، و<b>Poor</b> من 81 لـ 100. وبعدين الـ demand:')}</${P}>
          ${tb([t('Demand', 'الطلب'), 'Good', 'Fair', 'Poor'], [['50', '01-08', '01-28', '01-44'], ['60', '09-23', '29-68', '45-66'], ['70', '24-43', '69-88', '67-82'], ['80', '44-78', '89-96', '83-94'], ['90', '79-93', '97-100', '95-100'], ['100', '94-100', '–', '–']])}
          <${Code} lines=${['profit = 0.50 × min(d, Q) − 0.33 × Q', '       − 0.17 × max(0, d − Q)', '       + 0.05 × (Q − sold)']} />
        `, { sec: t('Case 7 · Newspaper seller', 'الـ case 7 · بياع الجرايد') }),
        page(html`
          <${Fig} name="ms-news-days" head=${t('Quiz 5\'s ten days, for any policy', 'الـ 10 أيام بتوع Quiz 5، لأي policy')} />
        `),
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${t('Read the tables like the seller. Tap an answer for each.', 'اقرا الجداول كإنك البياع. اختار إجابة لكل سؤال.')}</p></${Box}>
          <${Drill} id="news" rows=${[
            { q: t('Day 1: RN(type) = 0.41. The day is…', 'اليوم 1: الـ RN بتاع النوع 0.41. اليوم ده…'), o: ['Good', 'Fair', 'Poor'], a: 1, w: t('41 is in 36–80.', 'الـ 41 جوه 36–80.') },
            { q: t('…and RN(demand) = 0.19 on that day. Demand?', '…والـ RN بتاع الطلب 0.19. الطلب كام؟'), o: ['50', '60', '70'], a: 0, w: t('Fair 01–28 → 50.', 'في الـ Fair من 01 لـ 28 يعني 50.') },
            { q: t('Q = 60, demand 70. Profit?', 'الـ Q بـ 60 والطلب 70. الربح؟'), o: ['10.20', '8.50', '5.70'], a: 1, w: t('30.00 − 19.80 − 10 × 0.17 = 8.50.', 'الحساب ' + B('30.00 − 19.80 − 1.70 = 8.50') + '.') },
            { q: t('Q = 70, demand 50. Profit?', 'الـ Q بـ 70 والطلب 50. الربح؟'), o: ['1.90', '2.90', '11.90'], a: 1, w: t('25.00 − 23.10 + 20 × 0.05 = 2.90.', 'الحساب ' + B('25.00 − 23.10 + 1.00 = 2.90') + '.') }
          ]} />
        `),
        page(html`
          <${Fig} name="ms-news-best" head=${t('Total profit of the six policies', 'الربح الكلي للست policies')} />
          ${tb(['Q', '50', '60', '70', '80', '90', '100'], [['$', '71.40', '74.40', '65.00', '37.00', '9.00', '−19.00']])}
          <${P} small=${true}>${X('From Q = 70 up every demand is met: revenue stays $290 and each extra 10 papers adds $33 cost but only $5 salvage, so profit drops <b>$28 per step</b>. Best: <b>Q = 60, $74.40</b>.',
            'من 70 وطالع كل الطلبات بتتلبّى، فالإيراد ثابت $290، وكل 10 جرايد زيادة بيزوّدوا $33 تكلفة و$5 scrap بس، فالربح بيقل <b>$28 كل خطوة</b>. الأحسن: <b>' + B('Q = 60') + ' بربح $74.40</b>.')}</${P}>
        `),

        // 46 · cake shop
        page(html`
          <${H1}>${t('Case 8: how many cakes?', 'الـ case التامنة: نخبز كام تورتة؟')}</${H1}>
          <${P} small=${true}>${X('The owner wants to know <b>how many 10-inch white birthday cakes to bake each day to maximize profit</b>. Today he guesses the demand and bakes that many, all in <b>one batch early in the morning</b>.',
            'صاحب المحل عايز يعرف <b>يخبز كام تورتة بيضا 10 بوصة كل يوم عشان يكسب أكتر</b>. دلوقتي بيخمّن الطلب ويخبز قده، كله في <b>دفعة واحدة الصبح بدري</b>.')}</${P}>
          <div className="hf-ms8-two hf-in">
            ${card(t('The money', 'الفلوس'), t('Cost <b>$2.00</b>, price <b>$4.50</b>. A leftover goes to a day-old store for <b>$1.50</b>: a loss of $0.50.', 'التكلفة <b>$2.00</b> والسعر <b>$4.50</b>. والفاضل بيتباع لمحل الـ day-old بـ <b>$1.50</b>، يعني خسارة $0.50.'))}
            ${card(t('The demand', 'الطلب'), t('Uncertain: some days none, one day last week 8 cakes.', 'مش مضمون: أيام مفيش، ويوم الأسبوع اللي فات 8 تورتات.'))}
          </div>
          <${Talk} who="dev">${X('So he could just try every quantity for a few months?', 'يعني يجرّب كل كمية كام شهر وخلاص؟')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('He wants his trial-and-error <b>without actually performing the experiments</b>. That is exactly what I do. My "best" is not a guaranteed optimum, but it should be <b>close to the optimal solution</b>.',
            'هو عايز الـ trial and error بتاعه <b>من غير ما يعمل التجارب فعلًا</b>. وده بالظبط شغلي. الـ "أحسن" بتاعي مش optimum مضمون، بس المفروض يبقى <b>قريب من الحل الأمثل</b>.')}</${Talk}>
        `, { sec: t('Case 8 · Cake shop', 'الـ case 8 · محل التورت') }),
        page(html`
          <${H2}>${t('The model: two cases', 'الـ model: حالتين')}</${H2}>
          <${P} small=${true}>${X('<b>x</b> = cakes produced, <b>d</b> = daily demand, <b>z</b> = daily profit.', 'الـ <b>x</b> عدد التورتات اللي اتخبزت، والـ <b>d</b> الطلب اليومي، والـ <b>z</b> الربح اليومي.')}</${P}>
          <${Code} lines=${[['x ≤ d:  z = 2.50 x', t('all x sold', 'كله اتباع')], ['x > d:  z = 2.50 d − 0.50(x − d)'], ['        = 3.00 d − 0.50 x']]} />
          <${P} small=${true}>${X('In general, with <b>P</b> = price, <b>C</b> = cost, <b>S</b> = day-old (salvage) price:', 'وبشكل عام، لو الـ <b>P</b> السعر والـ <b>C</b> التكلفة والـ <b>S</b> سعر الـ day-old:')}</${P}>
          <${Code} lines=${['x ≤ d:  z = (P − C) x', 'x > d:  z = (P − S) d + (S − C) x']} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The book heads Case 1 "production quantity is <i>greater</i> than the daily demand", but its condition is <b>x ≤ d</b>. And Case 2 is 3d − 0.5x, <b>not</b> 2.5d − 0.5x: the d sold cakes earn 2.50 and the x − d extras lose 0.50 each.',
            '‡ الكتاب كاتب عنوان الحالة 1 إن الإنتاج <i>أكبر</i> من الطلب، بس الشرط ' + B('x ≤ d') + '. والحالة 2 هي ' + B('3d − 0.5x') + ' <b>مش</b> ' + B('2.5d − 0.5x') + ': الـ d اللي اتباعوا بيكسبوا 2.50 والزيادة بتخسر 0.50.')}</p></${Box}>
        `),
        page(html`
          <${Fig} name="ms-cake-model" head=${t('Figure 8-6: set x and d', 'الشكل 8-6: غيّر الـ x والـ d')} />
          <${Hand} red=${true}>${t('x is controllable, d is not: so this is a stochastic model', 'الـ x في إيدنا والـ d لأ، فده stochastic model')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Where do the demands come from?', 'الطلبات دي بتيجي منين؟')}</${H2}>
          <${P} small=${true}>${X('The last 20 days (Table 8-2). Relative frequency = frequency / total observations.', 'من آخر 20 يوم (Table 8-2). والـ relative frequency هي التكرار على عدد المشاهدات.')}</${P}>
          ${tb(['d', '0', '1', '2', '3', '4', '5', '6', '7', '8'], [[t('days', 'أيام'), 1, 2, 1, 2, 3, 6, 3, 1, 1], [t('freq', 'نسبة'), '.05', '.10', '.05', '.10', '.15', '.30', '.15', '.05', '.05']])}
          <${P} small=${true}>${X('By hand: <b>20 paper slips</b> (0 on one, 1 on two, …), one drawn per day <b>with replacement</b>. By computer: intervals that <b>include their lower end</b>:',
            'بالإيد: <b>20 ورقة</b>، الـ 0 على واحدة والـ 1 على اتنين… والـ 5 على ست…، وتسحب ورقة كل يوم <b>وترجّعها</b>. وبالكمبيوتر: كل قيمة ليها interval من الـ random numbers <b>شامل أوله</b>:')}</${P}>
          ${tb(['d', '0', '1', '2', '3', '4'], [['R', '.00-.0499', '.05-.1499', '.15-.1999', '.20-.2999', '.30-.4499']])}
          ${tb(['d', '5', '6', '7', '8'], [['R', '.45-.7499', '.75-.8999', '.90-.9499', '.95-.9999']])}
          <${Box} kind="watch"><p className="hf-p small">${X('Here R = 0.15 → <b>2</b>, R = 0.75 → <b>6</b>. Lecture 2\'s digits and Lecture 5\'s F(xᵢ₋₁) &lt; R ≤ F(xᵢ) give 1 and 5. State your convention.',
            'بالـ intervals دي الـ ' + B('R = 0.15') + ' بتدّي <b>2</b> والـ ' + B('R = 0.75') + ' بتدّي <b>6</b>. أما Lecture 2 وقاعدة Lecture 5 بيدّوا القيمة الأقل (1 و5). قول إنت ماشي بأنهي طريقة.')}</p></${Box}>
        `),
        page(html`
          <${Fig} name="ms-cake-flow" head=${t('Figure 8-7 with x = 3', 'الشكل 8-7 بـ 3 تورتات')} />
        `),
        page(html`
          <${Fig} name="ms-cake-slips" head=${t('Draw slips, or generate random numbers', 'اسحب ورق، أو طلّع random numbers')} />
          <${Hand}>${t('if the demand distribution is inaccurate, the results are of little value', 'لو توزيع الطلب مش دقيق، النتايج ملهاش قيمة')}</${Hand}>
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Bake Table 8-3', 'اخبز الـ Table 8-3')}><p className="hf-p small">${X('The owner bakes <b>x = 3</b> every day. Give each day\'s profit z for the book\'s ten demands.', 'بنخبز <b>3 تورتات</b> كل يوم. حط ربح كل يوم.')}</p></${Box}>
          <${CakeFill} id="cake" />
          <${Grow} />
          <${Hand} red=${true}>${X('x ≤ d: z = 2.5x; x &gt; d: z = 3d − 0.5x', 'لو الإنتاج مش أكبر من الطلب ' + B('z = 2.5x') + '، غير كده ' + B('z = 3d − 0.5x'))}</${Hand}>
        `),
        page(html`
          <${Fig} name="ms-cake-sim" head=${t('Ten days for any x (and the goodwill cost)', '10 أيام لأي x (ومعاها الـ goodwill)')} />
        `),
        page(html`
          <${Fig} name="ms-cake-compare" head=${t('Tables 8-4 and 8-5', 'الـ Tables 8-4 و8-5')} />
          <${P} small=${true}>${X('Same ten demands for every x: 22, 41, 60, 76, 86, <b>90</b>, 88, 86 → <b>x = 6</b>. Ten days is too short: demands 2 and 7 never appeared (‡ the book says "10% of the time"; that is the two together, 5% each). <b>500 days</b> also picks x = 6 ($4467): bake <b>6 cakes a day</b>.',
            'نفس الطلبات لكل x، والأحسن <b>' + B('x = 6') + '</b> بـ $90. بس 10 أيام قليلة: الطلب 2 و7 مظهروش خالص (‡ الكتاب قال 10%، ودي للاتنين مع بعض، كل واحد 5%). و<b>500 يوم</b> برضه اختار 6 ($4467): اخبز <b>6 تورتات في اليوم</b>.')}</${P}>
        `),
        page(html`
          <${H2}>${t('End-of-chapter Q2: add goodwill', 'سؤال آخر الشابتر 2: زوّد الـ goodwill')}</${H2}>
          <${P} small=${true}>${X('Each unsatisfied order now costs <b>$2 of goodwill</b>. Only under-production changes:', 'كل طلب متلبّاش بقى بيكلّف <b>$2 goodwill</b>. اللي بيتغير بس هو لما ننتج أقل من الطلب:')}</${P}>
          <${Code} lines=${['x ≤ d:  z = 2.5x − 2(d − x)', '          = 4.5x − 2d', 'x > d:  z = 3d − 0.5x  (same)']} />
          ${tb(['x', '6', '7', '8'], [[t('no goodwill', 'من غير'), 90, 88, 86], [t('goodwill $2', 'بالـ goodwill'), 86, 86, 86]], 1)}
          <${P} small=${true}>${X('With demands 5, 1, 6, 3, 4, 4, 8, 0, 5, 6, x = 6 gives 12, 0, 15, 6, 9, 9, 11, −3, 12, 15 = <b>$86</b>; x = 7 and 8 also give $86: a three-way tie.',
            'بالطلبات دي الـ 6 بتدّي <b>86 دولار</b>، والـ 7 والـ 8 برضه 86، يعني تعادل تلاتي.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('Without goodwill, 7 and 8 were below 6. Why does a goodwill cost push the best production quantity <b>up</b> (or at least not down)?', 'من غير الـ goodwill الـ 7 والـ 8 كانوا أقل من الـ 6. ليه الـ goodwill بيزق أحسن كمية إنتاج <b>لفوق</b> (أو على الأقل مبينزّلهاش)؟')}</p></${Box}>
          <${Hand} red=${true}>${X('‡ the book says "table (8-1)": the 10 demands are in Table 8-3', 'الكتاب ‡ قال ' + B('table (8-1)') + ' والطلبات العشرة في ' + B('Table 8-3'))}</${Hand}>
        `),

        // 56 · sort the variables
        page(html`
          <${Box} kind="pencil" title=${t('Controllable, random, or output?', 'في إيدك، عشوائي، ولا output؟')}><p className="hf-p small">${X('<b>C</b> controllable (you choose), <b>U</b> uncontrollable (random), <b>O</b> output.', 'الـ <b>C</b> في إيدك، والـ <b>U</b> عشوائي، والـ <b>O</b> هو الـ output.')}</p></${Box}>
          <${Sort} id="vars" bins=${[['C', t('controllable', 'في إيدك')], ['U', t('uncontrollable', 'عشوائي')], ['O', 'output']]} items=${A ? [
            ['كمية الإنتاج x (التورت)', 0], ['الطلب اليومي d (التورت)', 1], ['الربح اليومي z (التورت)', 2], ['الجرايد اللي بنشتريها Q', 0], ['نوع اليوم (الجرايد)', 1],
            ['الـ reorder point', 0], ['الـ lead time', 1], ['نسبة الـ clerk idle', 2]
          ] : [
            ['Production quantity x (cakes)', 0], ['Daily demand d (cakes)', 1], ['Daily profit z (cakes)', 2], ['Papers bought each day, Q', 0], ['Type of newsday', 1],
            ['Reorder point (inventory)', 0], ['Lead time (inventory)', 1], ['Clerk idle percentage', 2]
          ]} />
        `),

        // 57 · inventory
        page(html`
          <${H1}>${t('Case 9: the Auto Supplies inventory', 'الـ case التاسعة: مخزن الـ Auto Supplies')}</${H1}>
          <${P} small=${true}>${X('The same example as Lecture 2. A tool cabinet whose demand varies and whose lead time is 1 to 5 days. <b>Two decision variables</b>: order quantity <b>x</b> and reorder point <b>r</b>. <b>Two probabilistic components</b>: daily demand and lead time.',
            'نفس مثال Lecture 2. دولاب عِدد طلبه بيتغير والـ lead time بتاعه من 1 لـ 5 أيام. فيه <b>اتنين decision variables</b>: الـ order quantity <b>x</b> والـ reorder point <b>r</b>. واتنين <b>probabilistic</b>: الطلب اليومي والـ lead time.')}</${P}>
          ${tb([t('Demand', 'الطلب'), 'freq', 'R', 'L', 'freq', 'R'], [['0', '.50', '.00-.4999', '1', '.20', '.00-.1999'], ['1', '.25', '.50-.7499', '2', '.10', '.20-.2999'], ['2', '.15', '.75-.8999', '3', '.40', '.30-.6999'], ['3', '.05', '.90-.9499 ‡', '4', '.20', '.70-.8999'], ['4', '.05', '.95-.9999', '5', '.10 ‡', '.90-.9999']])}
          <${P} small=${true}>${X('Costs: ordering <b>$20 per order</b>, holding <b>$0.10 per unit per day</b>, shortage <b>$50 per unit</b>. Goal: minimum total cost.', 'التكاليف: الطلبية بـ <b>$20</b>، والتخزين بـ <b>$0.10 للوحدة في اليوم</b>، والـ shortage بـ <b>$50 للوحدة</b>. الهدف: أقل تكلفة كلية.')}</${P}>
          <${Hand} red=${true}>${t('‡ Table 8-8 prints "0.90 to 0.49999" (it is 0.94999); Table 8-7 prints 1.10 for a 5-day lead time (it is 0.10 = 3/30)', '‡ الـ Table 8-8 كاتب "0.90 to 0.49999" والصح 0.94999، والـ Table 8-7 كاتب 1.10 للـ lead time بتاع 5 أيام والصح 0.10')}</${Hand}>
        `, { sec: t('Case 9 · Inventory', 'الـ case 9 · الـ Inventory') }),
        page(html`
          <${Fig} name="ms-inv-day" head=${t('Figure 8-8: one simulated day', 'الشكل 8-8: يوم واحد في الـ simulation')} />
        `),
        page(html`
          <${H2}>${t('What the inventory runs found', 'الـ inventory طلع بإيه')}</${H2}>
          <${UL} items=${A ? ['الطلبيات بتوصل <b>أول اليوم</b>، ومينفعش يبقى فيه <b>طلبيتين متعلّقين</b> في نفس الوقت.', 'لو الطلب أكبر من المخزون، الـ customer بياخد الموجود ويشتري الباقي من برّه: shortage بـ ' + B('$50(d − I)') + ' والمخزون يبقى صفر.', 'الحلول الكويسة حوالين <b>order quantity من 20 لـ 25</b> و<b>reorder point بـ 6 أو 7</b>.', 'الـ simulation مش بتضمن الـ optimum، بس بتلاقي قرارات <b>near-optimal</b> رخيصة، والقرار الأخير للـ analyst.']
            : ['Orders arrive at the <b>start of the day</b>; never <b>two orders outstanding</b>.', 'If I &lt; d, the customer takes what is there and buys the rest elsewhere: shortage $50(d − I), I = 0.', 'Good solutions lie around <b>order quantities 20 to 25</b> and <b>reorder points 6 or 7</b>.', 'Simulation does not guarantee the optimum, but finds <b>near-optimal</b> low-cost decisions; the final choice is the analyst\'s.']} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The text says Table 8-11\'s lowest cost is $2.39 at x = 25, r = 6, but the table shows 3.39 there; and Table 8-12\'s "smallest" $2.33 at x = 22, r = 6 is beaten by 2.32 at x = 29, r = 7. The 10-day table (x = 5, r = 3, <b>$19.27/day</b>) is the one from Lecture 2.',
            '‡ الكتاب قال أقل تكلفة في Table 8-11 هي $2.39 عند ' + B('x = 25, r = 6') + '، والجدول كاتب 3.39. وفي Table 8-12 الـ $2.33 عند ' + B('x = 22, r = 6') + ' فيه أقل منها: 2.32 عند ' + B('x = 29, r = 7') + '. وجدول الـ 10 أيام (<b>$19.27 في اليوم</b>) هو بتاع Lecture 2.')}</p></${Box}>
        `),

        // 60 · interview + summary
        page(html`
          <${Interview} title=${t('Simulation, exposed', 'الـ Simulation على المكشوف')} sub=${t("This week: the tool behind all nine cases, used from problem solving to insight gathering.", 'حوار الأسبوع: الأداة اللي ورا التسع cases، من حل المشاكل لحد الـ insight gathering.')} lines=${A ? [
            ['المذيع', 'إمتى الناس تستعين بيكي؟'],
            ['الـ Simulation', 'لما المشكلة تبقى <b>صعبة أو بتاخد وقت أو غالية أو خطيرة أو مستحيلة</b> بالطرق التانية.'],
            ['المذيع', 'وبتلاقي الحل الأمثل؟'],
            ['الـ Simulation', 'مش مضمون. بلاقي حلول <b>قريبة من الأمثل</b>، والقرار للـ analyst.'],
            ['المذيع', 'محتاجة إيه من الناس؟'],
            ['الـ Simulation', 'محتاجة <b>inputs بتمثّل الواقع</b>. توزيع طلب غلط يبقى نتايج ملهاش قيمة.'],
            ['المذيع', 'وإزاي أعرف إن حد بيستخدمك في حل مشكلة؟'],
            ['الـ Simulation', 'لما يسأل أسئلة زي:' + L('What would happen if …? How will a …? Why would a …? Can a …? Does the …? Should we …?')]
          ] : [
            ['Head First', 'When should people call you?'],
            ['Simulation', 'When a problem is <b>difficult, time consuming, expensive, hazardous or impossible</b> by the usual methods.'],
            ['Head First', 'Do you find the optimum?'],
            ['Simulation', 'Not guaranteed. I find <b>near-optimal</b> answers; the final choice is the analyst\'s.'],
            ['Head First', 'What do you need from people?'],
            ['Simulation', '<b>Inputs that represent reality.</b> A wrong demand distribution gives results of little value.'],
            ['Head First', 'How can I tell someone is problem solving with you?'],
            ['Simulation', 'They ask: What would happen if …? How will a …? Why would a …? Can a …? Does the …? Should we …?']
          ]} />
        `, { sec: t('Summary', 'الملخص') }),

        // 61–64 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("This lecture has no questions from the doctors' papers yet, so these are the site's own practice questions. Tap an answer to see why.", 'لسه مفيش أسئلة من امتحانات الدكاترة على المحاضرة دي، فدي أسئلة تدريب من الموقع. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /Serv_begin\[i\] equals/, 'quiz')}
          <${Grow} />
          <${Hand} red=${true}>${t('the later of the two: arrival or the clerk free', 'الأبعد فيهم: الوصول أو فضيان الـ clerk')}</${Hand}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /Σ Idle = 57/, 'quiz')}
          <${Gap} h=${4} />
          ${pq('p3', /\(0,3\), \(2,4\)/, 'extra')}
        `),
        page(html`
          ${pq('p4', /random number of 62/, 'quiz')}
          <${Gap} h=${4} />
          ${pq('p5', /13 coin games/, 'quiz')}
        `),
        page(html`
          ${pq('p6', /Q = 70 papers and a demand of 50/, 'quiz')}
          <${Gap} h=${4} />
          ${pq('p7', /goodwill cost of \$2 per unsatisfied cake/, 'extra')}
        `),

        // 65 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ random number في ' + B('[Low, High]') + ': normalization وscaling وtruncation وtranslation، والـ RandInt عمرها ما ترجّع High ‡.',
            'الـ Gift Shop: الخدمة بتبدأ عند الـ Max، والـ Ar هو ' + B('ΣWT/n') + ' والـ P هو ' + B('ΣIdle/t') + '.',
            'الـ Monte Carlo area هي ' + B('A = K h (c − b) / N') + '.',
            'الـ pursuit: ' + B('VF = 20') + ' والمسكة عند 10 km أو أقل، واتمسك عند الدقيقة 9.',
            'لعبة العملة: الصافي ' + B('8 − flips') + '، والـ Lab 5 قال آمنة (0.08) والـ Quiz 2 قال لأ (−0.3846).',
            'الجرايد: أحسن policy هي 60 جرنال بـ $74.40.',
            'التورت: ' + B('z = 2.5x') + ' أو ' + B('3d − 0.5x') + '، وأحسن كمية 6، ومع الـ goodwill التلاتة 6 و7 و8 بـ $86.',
            'الـ inventory: الـ order quantity من 20 لـ 25 والـ reorder point بـ 6 أو 7، يعني near-optimal.'
          ] : [
            'Random number in [Low, High]: normalize, scale, truncate, translate. RandInt never returns High ‡.',
            'Gift Shop: Serv_begin = Max(Ar_Clk, previous Serv_end); Ar = ΣWT/n; P = ΣIdle/t × 100 (standard 12.5%).',
            'Monte Carlo area: <b>A = K h (c − b) / N</b>; 0.78399998 vs π/4.',
            'Pursuit: VF = 20 km/min, catch within 10 km, caught at <b>t = 9</b>.',
            'Coin game: net gain = 8 − flips; Lab 5 said safe (0.08), Quiz 2 not safe (−0.3846).',
            'Newspaper: best policy <b>Q = 60</b>, $74.40.',
            'Cake: z = 2.5x or 3d − 0.5x; best <b>x = 6</b>; with goodwill 6, 7, 8 tie at $86.',
            'Inventory: order quantity 20–25, reorder point 6–7: near-optimal, not guaranteed optimal.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 66 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 8!', 'خلّصت الفصل التامن!')}</${H1}>
            <${Talk} who="cpu">${t('Nine small worlds, all lived in the computer. Not one cake was wasted.', 'تسع دنيات صغيرة، عشناهم كلهم في الكمبيوتر. ولا تورتة راحت هدر.')}</${Talk}>
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

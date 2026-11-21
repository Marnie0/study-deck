// Head First chapter for Operating Systems Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// CPU scheduling: the CPU–I/O burst cycle, the four scheduling moments, preemptive vs non-preemptive, the dispatcher,
// the five criteria and the formulas, FCFS, SJF, SRTF, RR, priority (and priority with RR), multilevel queues and the
// multilevel feedback queue, and the review problem. Every Gantt chart and average is the notes' own worked answer
// (checked by hand and with a unit-step simulator). Our own analogies are marked as ours.
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-os3')) {
    const s = document.createElement('style'); s.id = 'hf-css-os3';
    s.textContent = `
.hfb .hf-os3-gt{ direction:ltr; text-align:left; }
.hfb .hf-os3-gt .hf-os3-bars{ display:flex; height:32px; border:1.6px solid var(--hf-line); border-radius:4px; overflow:hidden; background:var(--paper); }
.hfb .hf-os3-gt .hf-os3-bars > span{ display:grid; place-items:center; font:700 13px/1 var(--mono); color:var(--ink); border-right:1.4px solid var(--hf-line); min-width:0; overflow:hidden; white-space:nowrap; background:color-mix(in srgb, var(--c) 30%, var(--paper)); transform-origin:0 50%; }
.hfb .hf-os3-gt .hf-os3-bars > span:last-child{ border-right:0; }
.hfb .hf-os3-gt .hf-os3-bars > span.hf-os3-gr{ animation:hf-os3-grow .45s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-os3-grow{ from{ transform:scaleX(0); opacity:.3; } }
.hfb .hf-os3-gt .hf-os3-bars > i{ flex:1 1 auto; display:grid; place-items:center; font:600 13px/1.2 var(--body); color:var(--graphite); font-style:normal; background:repeating-linear-gradient(45deg, transparent 0 6px, var(--hf-grey) 6px 12px); }
.hfb .hf-os3-tk{ position:relative; height:17px; font:600 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-os3-tk.two{ height:31px; }
.hfb .hf-os3-tk span{ position:absolute; top:3px; transform:translateX(-50%); }
.hfb .hf-os3-tk span.lo{ top:17px; }
.hfb .hf-os3-tk span.first{ transform:none; } .hfb .hf-os3-tk span.last{ transform:translateX(-100%); }
.hfb .hf-os3-pt{ border-collapse:collapse; direction:ltr; font:600 13.5px/1.2 var(--mono); color:var(--ink); margin:0 auto; }
.hfb .hf-os3-pt th{ font:800 13px/1.1 var(--body); background:var(--hf-line); color:var(--paper); padding:4px 9px; }
.hfb .hf-os3-pt td{ border:1px solid var(--hf-grey2); padding:2px 9px; text-align:center; }
.hfb .hf-os3-pt td:first-child{ font-weight:800; }
.hfb .hf-os3-pt input{ width:42px; height:25px; font:700 14px/1 var(--mono); border:1.5px solid var(--faint); border-radius:5px; text-align:center; background:var(--hf-grey); color:var(--ink); padding:0; margin:0; }
.hfb .hf-os3-pt input.ok{ border-color:var(--ok); color:var(--ok); } .hfb .hf-os3-pt input.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-os3-picks{ display:flex; flex-wrap:wrap; gap:5px; direction:ltr; justify-content:center; }
.hfb .hf-os3-picks button{ font:700 13.5px/1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.6px solid var(--hf-line); background:color-mix(in srgb, var(--c) 30%, var(--paper)); color:var(--ink); cursor:pointer; }
.hfb .hf-os3-picks button:disabled{ opacity:.3; cursor:default; }
.hfb .hf-os3-picks button small{ font:600 12.5px var(--body); color:var(--graphite); margin-left:3px; }
.hfb .hf-os3-ordno{ outline:2px solid var(--hf-red); outline-offset:2px; border-radius:4px; }
.hfb .hf-os3-ordok{ outline:2px solid var(--ok); outline-offset:2px; border-radius:4px; }
.hfb .hf-os3-avg{ font:700 13px/1.35 var(--mono); color:var(--hf-k); text-align:center; margin:0; direction:ltr; }
.hfb .hf-os3-vs{ display:grid; grid-template-columns:1fr 1fr; border:2px solid var(--hf-line); }
.hfb .hf-os3-vs > div{ padding:5px 8px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-os3-vs > div:nth-child(odd){ border-inline-end:2px solid var(--hf-line); }
.hfb .hf-os3-vs > .hd{ font:800 14.5px/1.1 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; text-align:center; }
.hfb .hf-os3-vs b{ font-weight:700; }
.hfb .hf-os3-cr{ display:grid; grid-template-columns:auto 1fr auto; gap:0; border:2px solid var(--hf-line); }
.hfb .hf-os3-cr > span{ padding:6px 7px; font-size:13.5px; line-height:1.28; border-top:1px solid var(--hf-grey2); color:var(--ink); display:flex; align-items:center; }
.hfb .hf-os3-cr > span.n{ font:800 13.5px/1.15 var(--body); }
.hfb .hf-os3-cr > span.m{ font:800 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.04em; justify-content:center; }
.hfb .hf-os3-cr > span.m.up{ color:var(--ok); } .hfb .hf-os3-cr > span.m.dn{ color:var(--hf-red); }
.hfb .hf-os3-cr > span:nth-child(-n+3){ border-top:0; }
.hfb .hf-os3-sit{ display:grid; grid-template-columns:auto 1fr auto; gap:4px 8px; align-items:center; }
.hfb .hf-os3-sit > b{ display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 13px/1 var(--body); }
.hfb .hf-os3-sit > span{ font:600 14px/1.25 var(--mono); color:var(--ink); }
.hfb .hf-os3-sit > i{ font:800 12.5px/1 var(--body); font-style:normal; padding:4px 7px; border-radius:999px; border:1.5px solid var(--hf-line); white-space:nowrap; }
.hfb .hf-os3-sit > i.ch{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-os3-tabs{ display:flex; gap:4px; direction:ltr; }
.hfb .hf-os3-tabs button{ flex:1 1 0; font:700 13.5px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os3-tabs button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-os3-q{ display:flex; flex-direction:column; gap:2px; }
.hfb .hf-os3-q > div{ display:grid; grid-template-columns:96px 1fr; gap:8px; align-items:center; }
.hfb .hf-os3-q .lv{ font:800 13px/1.15 var(--body); color:var(--ink); text-align:center; border:1.6px solid var(--hf-line); border-radius:6px; padding:5px 3px; background:var(--hf-grey); }
.hfb .hf-os3-q .lane{ position:relative; height:28px; border-bottom:2px solid var(--hf-line); overflow:hidden; direction:ltr; }
.hfb .hf-os3-q .lane span{ position:absolute; bottom:3px; width:22px; height:20px; border-radius:4px; border:1.5px solid var(--hf-line); background:color-mix(in srgb, var(--c) 35%, var(--paper)); }
.hfb .hf-os3-q .lane span.mv{ animation:hf-os3-run 4s linear infinite; }
@keyframes hf-os3-run{ 0%{ left:0; opacity:0; } 10%{ opacity:1; } 85%{ opacity:1; } 100%{ left:calc(100% - 24px); opacity:0; } }
.hfb .hf-os3-q .dn{ font:600 13px/1.1 var(--body); color:var(--graphite); padding-inline-start:104px; }
`;
    document.head.appendChild(s);
  }

  // one colour per process, mixed with the page colour so it works in both themes
  const PC = { P1: '#2563EB', P2: '#D97706', P3: '#059669', P4: '#DB2777', P5: '#7C3AED' };
  const W = 320; // approximate drawing width of a chart, used only to avoid tick labels running into each other

  // a Gantt chart: blocks [name, start, end]; total fixes the scale (so a chart being built does not rescale)
  function Gantt({ blocks, total, empty, anim = true }) {
    const end = total || (blocks.length ? blocks[blocks.length - 1][2] : 1), ppu = W / end;
    const ticks = []; blocks.forEach((b, j) => { if (j === 0) ticks.push(b[1]); ticks.push(b[2]); });
    // each label's span in px (left-aligned at 0, right-aligned at the end, centred elsewhere); a label that would touch the one before it drops to a second row
    let prevUp = -99, prevLo = -99;
    const tk = ticks.map((x, j) => {
      const w = String(x).length * 8.5 + 4, px = x * ppu, first = j === 0 && x === 0, lastT = x === end;
      const l = first ? px : lastT ? px - w : px - w / 2, r = l + w;
      let lo = false;
      if (l < prevUp) { lo = true; prevLo = r; } else prevUp = r;
      return { x, lo, first, last: lastT };
    });
    const used = blocks.length ? blocks[blocks.length - 1][2] : 0;
    return html`<div className="hf-os3-gt" dir="ltr" role="img" aria-label=${'Gantt chart: ' + blocks.map(b => b[0] + ' ' + b[1] + ' to ' + b[2]).join(', ')}>
      <div className="hf-os3-bars">${blocks.map((b, j) => { const w = (b[2] - b[1]) * ppu; return html`<span key=${j + b[0] + b[1]} className=${anim && !calm() ? 'hf-os3-gr' : ''} style=${{ flex: (b[2] - b[1]) + ' 0 0', '--c': PC[b[0]] || '#64748B', animationDelay: calm() ? '0s' : (anim === 'last' ? 0 : j * 0.12) + 's' }}>${w >= 21 ? b[0] : w >= 9 ? b[0].slice(1) : ''}</span>`; })}
        ${used < end && html`<i style=${{ flex: (end - used) + ' 0 0' }}>${empty || ''}</i>`}</div>
      ${blocks.length ? html`<div className=${'hf-os3-tk' + (tk.some(x => x.lo) ? ' two' : '')}>${tk.map((x, j) => html`<span key=${j} className=${(x.lo ? 'lo ' : '') + (x.first ? 'first ' : '') + (x.last ? 'last' : '')} style=${{ left: (x.x / end * 100) + '%' }}>${x.x}</span>`)}</div>` : html`<div className="hf-os3-tk"></div>`}
    </div>`;
  }

  // a small table of processes (always left to right: it is data)
  const PT = ({ head, rows }) => html`<table className="hf-os3-pt hf-in" dir="ltr"><thead><tr>${head.map((h, j) => html`<th key=${j}>${h}</th>`)}</tr></thead>
    <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => html`<td key=${j}>${c}</td>`)}</tr>`)}</tbody></table>`;

  const num = s => String(s == null ? '' : s).replace(/[^0-9]/g, '').slice(0, 3);
  const avgLine = (vals, n, a) => `avg WT = (${vals.join(' + ')})/${n} = ${a}`;

  // Be the scheduler (non-preemptive, all arrive at 0): tap the processes in the order they run, then type each waiting time
  function Build({ id, procs, ans, wt, avg, pr }) {
    const ar = useAr();
    const [ord, setOrd] = H.K.useSlot(id + ':o', []);
    const [v, setV] = H.K.useSlot(id + ':v', {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const total = procs.reduce((x, p) => x + p[1], 0);
    let t = 0; const blocks = ord.map(n => { const p = procs.find(x => x[0] === n); const b = [n, t, t + p[1]]; t += p[1]; return b; });
    const ordOk = ord.join() === ans.join();
    const okW = n => num(v[n]) === String(wt[n]);
    const right = (ordOk ? 1 : 0) + procs.filter(p => okW(p[0])).length, all = right === procs.length + 1;
    const head = ['Process', 'Burst'].concat(pr ? ['Priority'] : []).concat(['WT']);
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-os3-picks">${procs.map(p => html`<button key=${p[0]} style=${{ '--c': PC[p[0]] }} disabled=${ord.includes(p[0])} onClick=${() => { setOrd(ord.concat(p[0])); setCk(false); }}>${p[0]}<small>${p[1]}${pr ? ' · ' + p[2] : ''}</small></button>`)}</div>
      <div className=${ck ? (ordOk ? 'hf-os3-ordok' : 'hf-os3-ordno') : ''}><${Gantt} blocks=${blocks} total=${total} anim="last" empty=${ord.length ? '' : (ar ? 'دوس على الـ processes بالترتيب' : 'tap the processes in run order')} /></div>
      <table className="hf-os3-pt" dir="ltr"><thead><tr>${head.map(h => html`<th key=${h}>${h}</th>`)}</tr></thead><tbody>
        ${procs.map(p => html`<tr key=${p[0]}><td>${p[0]}</td><td>${p[1]}</td>${pr ? html`<td>${p[2]}</td>` : null}<td><input inputMode="numeric" maxLength="3" aria-label=${'waiting time of ' + p[0]} className=${ck ? (okW(p[0]) ? 'ok' : 'no') : ''} value=${v[p[0]] || ''}
          onChange=${e => { setV(Object.assign({}, v, { [p[0]]: num(e.target.value) })); setCk(false); }} /></td></tr>`)}</tbody></table>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!ord.length && !Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" disabled=${!ord.length} onClick=${() => { setOrd(ord.slice(0, -1)); setCk(false); }}>${ar ? 'رجّع خطوة' : 'Undo'}</button>
        <button className="hf-btn" onClick=${() => { setOrd(ans.slice()); const o = {}; procs.forEach(p => { o[p[0]] = String(wt[p[0]]); }); setV(o); setCk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${procs.length + 1}</bdi> صح` : right + ' / ' + (procs.length + 1) + ' right'}</span>`}
      </div>
      ${ck && all ? html`<p className="hf-os3-avg hf-in">${avgLine(procs.map(p => wt[p[0]]), procs.length, avg)}</p>`
        : ck && !ordOk ? html`<p className="hf-hand red" style=${{ textAlign: 'center' }}>${ar ? 'ترتيب الـ chart لسه مش مظبوط.' : 'The order of the chart is not right yet.'}</p>` : null}
    </div>`;
  }

  // the review problem with RR (q = 1): work the chart out on paper, type completion and waiting times; the chart appears when all are right
  function Fill({ id, procs, gantt, ct, wt, avg }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id + ':v', {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const ok = (n, k) => num(v[n + k]) === String((k === 'c' ? ct : wt)[n]);
    const right = procs.reduce((x, p) => x + (ok(p[0], 'c') ? 1 : 0) + (ok(p[0], 'w') ? 1 : 0), 0), tot = procs.length * 2, all = right === tot;
    const inp = (n, k) => html`<input inputMode="numeric" maxLength="3" aria-label=${(k === 'c' ? 'completion time of ' : 'waiting time of ') + n} className=${ck ? (ok(n, k) ? 'ok' : 'no') : ''} value=${v[n + k] || ''} onChange=${e => { setV(Object.assign({}, v, { [n + k]: num(e.target.value) })); setCk(false); }} />`;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <table className="hf-os3-pt" dir="ltr"><thead><tr><th>Process</th><th>Burst</th><th>CT</th><th>WT</th></tr></thead><tbody>
        ${procs.map(p => html`<tr key=${p[0]}><td>${p[0]}</td><td>${p[1]}</td><td>${inp(p[0], 'c')}</td><td>${inp(p[0], 'w')}</td></tr>`)}</tbody></table>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; procs.forEach(p => { o[p[0] + 'c'] = String(ct[p[0]]); o[p[0] + 'w'] = String(wt[p[0]]); }); setV(o); setCk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${tot}</bdi> صح` : right + ' / ' + tot + ' right'}</span>`}
      </div>
      ${ck && all ? html`<${Gantt} blocks=${gantt} /><p className="hf-os3-avg hf-in">${avgLine(procs.map(p => wt[p[0]]), procs.length, avg)}</p>`
        : html`<p className="hf-hand" style=${{ textAlign: 'center' }}>${ar ? 'الـ Gantt chart هيظهر لما كل الخانات تبقى صح' : 'the Gantt chart appears when every box is right'}</p>`}
    </div>`;
  }

  // the review problem: one set of processes, three non-preemptive algorithms, a tab each
  const RV = [['P1', 10, 3], ['P2', 3, 1], ['P3', 2, 2], ['P4', 1, 4]];
  const RVA = {
    FCFS: { ans: ['P1', 'P2', 'P3', 'P4'], wt: { P1: 0, P2: 10, P3: 13, P4: 15 }, avg: '9.5' },
    SJF: { ans: ['P4', 'P3', 'P2', 'P1'], wt: { P1: 6, P2: 3, P3: 1, P4: 0 }, avg: '2.5' },
    Priority: { ans: ['P2', 'P3', 'P1', 'P4'], wt: { P1: 5, P2: 0, P3: 3, P4: 15 }, avg: '5.75' }
  };
  function Review() {
    const [tab, setTab] = H.K.useSlot('rv:t', 'FCFS');
    const a = RVA[tab];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-os3-tabs" role="group" aria-label="Algorithm">${Object.keys(RVA).map(k => html`<button key=${k} aria-pressed=${String(k === tab)} onClick=${() => setTab(k)}>${k}</button>`)}</div>
      <${Build} key=${tab} id=${'rv-' + tab} procs=${RV} ans=${a.ans} wt=${a.wt} avg=${a.avg} pr=${true} />
    </div>`;
  }

  // the multilevel feedback queue as three lanes: a process drops a lane each time it uses up its quantum (our drawing of slide 29)
  function Lanes() {
    const ar = useAr();
    const L = [['quantum = 8', 'P1', 0], ['quantum = 16', 'P2', 1.3], ['FCFS', 'P3', 2.6]];
    return html`<div className="hf-os3-q hf-in" aria-label="Three queues: quantum 8, quantum 16, FCFS">
      ${L.map(([n, p, d], j) => html`<${React.Fragment} key=${n}><div><span className="lv" dir="ltr">${n}</span><div className="lane"><span className=${calm() ? '' : 'mv'} style=${{ '--c': PC[p], animationDelay: '-' + d + 's', left: calm() ? (20 + j * 25) + '%' : undefined }}></span></div></div>
        ${j < 2 && html`<p className="dn">${ar ? '↓ لو ماخلصتش في الـ quantum بتنزل تحت' : '↓ not finished in its quantum? demoted'}</p>`}</${React.Fragment}>`)}
    </div>`;
  }

  const G = {
    fcfs1: [['P1', 0, 24], ['P2', 24, 27], ['P3', 27, 30]],
    fcfs2: [['P2', 0, 3], ['P3', 3, 6], ['P1', 6, 30]],
    sjf: [['P4', 0, 3], ['P1', 3, 9], ['P3', 9, 16], ['P2', 16, 24]],
    sjfA: [['P1', 0, 6], ['P4', 6, 9], ['P3', 9, 16], ['P2', 16, 24]],
    srtf: [['P1', 0, 1], ['P2', 1, 5], ['P4', 5, 10], ['P1', 10, 17], ['P3', 17, 26]],
    rr4: [['P1', 0, 4], ['P2', 4, 7], ['P3', 7, 10], ['P1', 10, 14], ['P1', 14, 18], ['P1', 18, 22], ['P1', 22, 26], ['P1', 26, 30]],
    priorr: [['P4', 0, 7], ['P2', 7, 9], ['P3', 9, 11], ['P2', 11, 13], ['P3', 13, 15], ['P2', 15, 16], ['P3', 16, 20], ['P1', 20, 22], ['P5', 22, 24], ['P1', 24, 26], ['P5', 26, 27]],
    rr1: [['P1', 0, 1], ['P2', 1, 2], ['P3', 2, 3], ['P4', 3, 4], ['P1', 4, 5], ['P2', 5, 6], ['P3', 6, 7], ['P1', 7, 8], ['P2', 8, 9], ['P1', 9, 16]]
  };

  H.chapters.os[3] = {
    title: 'CPU Scheduling', kicker: 'Chapter 3', run: 'cpu scheduling',
    ar: { title: 'الـ CPU Scheduling', kicker: 'الفصل 3', run: 'الـ CPU scheduling' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arQuiz = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[3] && window.AR.os.lectures[3].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · where we left off (faces the opener)
        page(html`
          <${H2}>${t('Where we left off', 'إحنا وقفنا فين')}</${H2}>
          <${P} small=${true}>${X('In Chapter 2 you met the <b>process</b>: its five states (new, ready, running, waiting, terminated), its PCB, the <b>ready queue</b> where processes wait for the CPU, and the <b>context switch</b>.',
            'في الفصل التاني اتعرّفت على الـ <b>process</b>: الـ five states بتوعها (new وready وrunning وwaiting وterminated)، والـ PCB، والـ <b>ready queue</b> اللي الـ processes بتستنى فيها الـ CPU، والـ <b>context switch</b>.')}</${P}>
          <${P} small=${true}>${X('One question was left open: when several processes sit in the ready queue, <b>which one gets the CPU next?</b> This whole chapter answers it, with numbers. Bring a pencil.',
            'فيه سؤال فضل مفتوح: لما يبقى فيه كذا process قاعدين في الـ ready queue، <b>مين فيهم ياخد الـ CPU الأول؟</b> الفصل ده كله بيجاوب على السؤال ده، بالأرقام. هات قلم.')}</${P}>
          <${Box} kind="brain"><p className="hf-p">${X('A warm-up. One photocopier, three people in line: the first has <b>24</b> pages, the other two have <b>3</b> pages each. In what order should they go so that, on average, people wait the least? Does the answer change if the 24-page person got there first?',
            'تسخين. مكنة تصوير واحدة، وتلاتة واقفين في الطابور: الأول معاه <b>24</b> ورقة، والاتنين التانيين كل واحد معاه <b>3</b> ورقات بس. يدخلوا بأنهي ترتيب عشان متوسط الانتظار يبقى أقل حاجة؟ وهل الإجابة بتتغير لو صاحب الـ 24 ورقة هو اللي وصل الأول؟')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t("the photocopier is ours, not the slides', but keep the numbers 24, 3, 3 in mind", 'مكنة التصوير دي من عندنا، مش من السلايدز، بس افتكر الأرقام 24 و3 و3')}</${Hand}>
        `, { sec: t('Where we left off', 'إحنا وقفنا فين') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>Operating Systems` : html`Chapter three<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Who Gets the CPU Next?', 'مين ياخد الـ CPU الدور الجاي؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('cpu scheduling', 'الـ cpu scheduling')}</p></div>
          <${Talk} who="proc">${t("I've been in the ready queue forever. When is it my turn?", 'أنا قاعدة في الـ ready queue من زمان. دوري إمتى؟')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X("That's my <b>CPU scheduler</b>'s call. It picks a process from the ready queue and gives it a CPU core.", 'ده قرار الـ <b>CPU scheduler</b> بتاعي. هو اللي بيختار process من الـ ready queue ويدّيها CPU core.')}</${Talk}>
          <${P}>${X('In this chapter you will <b>be</b> the scheduler: draw Gantt charts, compute waiting and turnaround times, and watch <b>FCFS, SJF, SRTF, Round Robin</b> and <b>priority</b> scheduling compete on the lecture\'s own examples.',
            'في الفصل ده إنت اللي هتبقى الـ scheduler: هترسم Gantt charts، وتحسب الـ waiting time والـ turnaround time، وتتفرج على <b>FCFS وSJF وSRTF وRound Robin</b> والـ <b>priority</b> scheduling وهم بيتنافسوا على أمثلة المحاضرة نفسها.')}</${P}>
        `, { sec: t('Meet the scheduler', 'اتعرّف على الـ scheduler') }),

        // 2 · burst cycle
        page(html`
          <${H1}>${t('Run, wait, run, wait…', 'شغل، استنى، شغل، استنى…')}</${H1}>
          <${P}>${X('A process does not use the CPU in one long go. Its execution is a <b>CPU–I/O burst cycle</b>: a <b>CPU burst</b>, then an <b>I/O burst</b> (waiting for I/O), then a CPU burst again, and so on.',
            'الـ process مش بتستخدم الـ CPU حتة واحدة طويلة. التنفيذ بتاعها عبارة عن <b><bdi dir="ltr">CPU–I/O burst cycle</bdi></b>: <b>CPU burst</b>، وبعده <b><bdi dir="ltr">I/O burst</bdi></b> (مستنية I/O)، وبعده CPU burst تاني، وهكذا.')}</${P}>
          <${Talk} who="cpu">${X("While a process waits for I/O, I'd sit idle… unless there's another process to run.", 'وأنا الـ process مستنية I/O، هقعد فاضي… إلا لو فيه process تانية أشغّلها.')}</${Talk}>
          <${Def}>${X('<b>Maximum CPU utilization</b> is obtained with <b>multiprogramming</b>. The <b>CPU-burst distribution</b> is the main concern.',
            'أعلى <b>CPU utilization</b> بتيجي من الـ <b>multiprogramming</b>. والاهتمام الأساسي بتوزيع الـ <b>CPU bursts</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"CPU scheduling is the basis of ___"</i>: <b>multiprogramming operating systems</b>. Scheduling only matters when several processes compete for the CPU.',
            'سؤال الميدترم:<span class="ltr"><i>"CPU scheduling is the basis of ___"</i></span>الإجابة <b><bdi dir="ltr">multiprogramming operating systems</bdi></b>، لأن الـ scheduling ليه لازمة بس لما يبقى فيه كذا process بيتنافسوا على الـ CPU.')}</p></${Box}>
        `, { sec: t('Bursts', 'الـ Bursts') }),
        page(html`
          <${H2}>${t('The burst cycle (slide 2)', 'الـ burst cycle (سلايد 2)')}</${H2}>
          <${Fig} name="os-burst-cycle" />
        `),

        // 4 · scheduler and the four situations
        page(html`
          <${H2}>${t('When does the scheduler decide?', 'الـ scheduler بياخد القرار إمتى؟')}</${H2}>
          <${P} small=${true}>${X('The <b>CPU scheduler</b> selects a process from the <b>ready queue</b> (which may be ordered in various ways) and allocates a CPU core to it. It decides when a process:',
            'الـ <b>CPU scheduler</b> بيختار process من الـ <b>ready queue</b> (اللي ممكن تبقى مترتبة بطرق مختلفة) ويدّيها CPU core. وبياخد القرار لما الـ process:')}</${P}>
          <div className="hf-os3-sit hf-in" dir="ltr">
            ${[['1', 'running → waiting', 0], ['2', 'running → ready', 1], ['3', 'waiting → ready', 1], ['4', 'terminates', 0]].map(([n, s, c]) => html`<${React.Fragment} key=${n}><b>${n}</b><span>${s}</span><i className=${c ? 'ch' : ''}>${c ? (A ? 'فيه اختيار' : 'choice') : (A ? 'مفيش اختيار' : 'no choice')}</i></${React.Fragment}>`)}
          </div>
          <${P} small=${true}>${X('In <b>1 and 4</b> there is <b>no choice</b>: the CPU is free, so a new process (if one exists in the ready queue) must be selected. In <b>2 and 3</b> there <b>is</b> a choice: keep the running process, or switch.',
            'في <b>1 و4</b> <b>مفيش اختيار</b>: الـ CPU فضي، فلازم process جديدة تتختار (لو فيه واحدة في الـ ready queue). في <b>2 و3</b> <b>فيه</b> اختيار: نكمّل مع اللي شغالة، أو نبدّل.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('In situation 3 a process comes back from I/O and lands in the ready queue. Nobody left the CPU. Why would the scheduler ever take the CPU away from the running process right then?',
            'في الحالة 3 فيه process راجعة من الـ I/O ودخلت الـ ready queue، ومحدش ساب الـ CPU. ليه الـ scheduler ممكن ياخد الـ CPU من الـ process الشغالة في اللحظة دي بالذات؟')}</p></${Box}>
        `, { sec: t('The four moments', 'الـ 4 حالات') }),
        page(html`
          <${H2}>${t('Drive a process through its states', 'مشّي process على الـ states بتاعتها')}</${H2}>
          <${Fig} name="os-sched-states" />
        `),

        // 6 · preemptive vs non-preemptive
        page(html`
          <${H2}>${t('Preemptive or non-preemptive?', 'نعمل preempt ولا لأ؟')}</${H2}>
          <div className="hf-os3-vs hf-in">
            <div className="hd">Non-preemptive</div><div className="hd">Preemptive</div>
            ${(A ? [
              ['الـ scheduling في الحالتين <b>1 و4</b> بس', 'الـ scheduling كمان في الحالتين 2 و3'],
              ['اللي معاها الـ CPU بتمسكه لحد ما <b>تخلص أو تروح waiting</b>', 'الـ CPU ممكن يتاخد من الشغالة (timer interrupt، أو وصلت واحدة أعلى أو أقصر)'],
              ['بسيط، ومفيش race conditions من الـ preemption', 'الـ response أحسن، بس ممكن يعمل race conditions على الداتا المشتركة'],
              ['زي FCFS، والـ SJF والـ priority النسخة الـ non-preemptive', 'زي RR وSRTF والـ priority الـ preemptive. وده اللي في Windows وmacOS وLinux وUNIX']
            ] : [
              ['Scheduling only under circumstances <b>1 and 4</b>', 'Scheduling also under circumstances 2 and 3'],
              ['Once a process has the CPU it keeps it until it <b>terminates or switches to waiting</b>', 'The CPU can be taken away from a running process (timer interrupt, a higher-priority or shorter job arrives)'],
              ['Simple, no race conditions from preemption', 'Better response time; can cause race conditions on shared data'],
              ['e.g. FCFS, non-preemptive SJF, non-preemptive priority', 'e.g. RR, SRTF, preemptive priority. Windows, macOS, Linux and UNIX all use it']
            ]).map(([a, b], j) => html`<${React.Fragment} key=${j}><div>${T(a)}</div><div>${T(b)}</div></${React.Fragment}>`)}
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Preemptive scheduling can cause race conditions</b> when data is shared: one process is preempted while updating the data, and the second process reads <b>inconsistent</b> data.',
            '<b>الـ preemptive ممكن يعمل race conditions</b> على الداتا المشتركة: process تتعملها preempt في نص تحديث الداتا، والتانية تقرا داتا <b>inconsistent</b>.')}</p></${Box}>
        `, { sec: t('Preemption', 'الـ Preemption') }),

        // 7 · sort
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Tap <b>N</b> for non-preemptive or <b>P</b> for preemptive, then check.', 'دوس <b>N</b> للـ non-preemptive أو <b>P</b> للـ preemptive، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="pre" bins=${[['N', 'Non-preemptive'], ['P', 'Preemptive']]} items=${A ? [
            ['الـ FCFS', 0],
            ['الـ Round Robin (سؤال ميدترم)', 1],
            ['الـ SRTF', 1],
            ['الـ scheduling في الحالتين 1 و4 بس', 0],
            ['فيه timer بيعمل interrupt كل quantum', 1],
            ['ممكن يعمل race conditions على الداتا المشتركة', 1],
            ['إن process ممكن تكمّل تتوقف مؤقتًا (سؤال ميدترم)', 1],
            ['الـ process بتمسك الـ CPU لحد ما تخلص أو تروح waiting', 0]
          ] : [
            ['FCFS', 0],
            ['Round Robin (a midterm question)', 1],
            ['SRTF', 1],
            ['Scheduling only in situations 1 and 4', 0],
            ['A timer interrupts every quantum', 1],
            ['Can cause race conditions on shared data', 1],
            ['Logically runnable processes temporarily suspended (midterm)', 1],
            ['A process keeps the CPU until it ends or waits', 0]
          ]} />
        `),

        // 8 · dispatcher
        page(html`
          <${H1}>${t('The dispatcher does the handover', 'الـ dispatcher هو اللي بيسلّم')}</${H1}>
          <${P}>${X('The scheduler only <b>chooses</b>. The <b>dispatcher</b> gives control of the CPU to the chosen process. Three jobs:',
            'الـ scheduler بس <b>بيختار</b>. الـ <b>dispatcher</b> هو اللي بيدّي التحكم في الـ CPU للـ process اللي اتختارت. وعنده تلات شغلانات:')}</${P}>
          <${UL} items=${A ? ['الـ <b>switching context</b>', 'الـ <b>switching to user mode</b>', 'إنه <b>ينط للمكان الصح</b> في برنامج الـ user عشان يكمّله'] : ['<b>switching context</b>', '<b>switching to user mode</b>', '<b>jumping to the proper location</b> in the user program to restart it']} />
          <${Def}>${X('<b>Dispatch latency</b>: the time it takes the dispatcher to <b>stop one process and start another</b> running.', 'الـ <b>Dispatch latency</b>: الوقت اللي بياخده الـ dispatcher عشان <b>يوقف process ويشغّل واحدة تانية</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A classic trap: <i>"Which is NOT one of the dispatcher\'s functions?"</i> Answer: <b>selecting which process runs next</b>. That is the <b>scheduler</b>\'s job.',
            'فخ مشهور: إيه اللي <b>مش</b> من شغل الـ dispatcher؟ الإجابة إنه <b>يختار مين يشتغل بعد كده</b>، ده شغل الـ <b>scheduler</b>.')}</p></${Box}>
        `, { sec: t('Dispatcher', 'الـ Dispatcher') }),
        page(html`
          <${H2}>${t('Where the latency goes (slide 6)', 'الـ latency بتروح فين (سلايد 6)')}</${H2}>
          <${Fig} name="os-dispatch" />
        `),

        // 10 · criteria
        page(html`
          <${H1}>${t('How do we judge a scheduler?', 'نحكم على الـ scheduler إزاي؟')}</${H1}>
          <${P} small=${true}>${t('Five criteria. Two go up, three go down:', 'خمس معايير: اتنين نعلّيهم، وتلاتة نقلّلهم:')}</${P}>
          <div className="hf-os3-cr hf-in">
            ${[['CPU utilization', 'keep the CPU as busy as possible', 'خلّي الـ CPU مشغول على قد ما تقدر', 1],
               ['Throughput', 'processes that complete per time unit', 'عدد الـ processes اللي بتخلص في وحدة الزمن', 1],
               ['Turnaround time', 'time to execute a particular process: submission to completion', 'الوقت عشان process معينة تتنفذ، من التقديم لحد ما تخلص', 0],
               ['Waiting time', 'time spent waiting <b>in the ready queue</b>', 'الوقت اللي قعدته مستنية <b>في الـ ready queue</b>', 0],
               ['Response time', 'submission of a request until the <b>first response</b>', 'من تقديم الـ request لحد <b>أول response</b>', 0]].map(([n, e, a, up]) => html`<${React.Fragment} key=${n}>
              <span className="n"><bdi>${n}</bdi></span><span>${T(A ? a : e)}</span><span className=${'m ' + (up ? 'up' : 'dn')}>${up ? (A ? '↑ أعلى' : '↑ max') : (A ? '↓ أقل' : '↓ min')}</span></${React.Fragment}>`)}
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"The amount of time to execute a particular process"</i> = <b>turnaround time</b>. Waiting time = time in the <b>ready queue</b> (True/False on the midterm: True).',
            'في الميدترم الجملة دي معناها <b>turnaround time</b>:<span class="ltr"><i>"The amount of time to execute a particular process"</i></span>والـ waiting time هو الوقت في الـ <b>ready queue</b> بس.')}</p></${Box}>
        `, { sec: t('Criteria and formulas', 'المعايير والقوانين') }),

        // 11 · formulas
        page(html`
          <${H2}>${t('The only formulas you need', 'القوانين اللي محتاجها بس')}</${H2}>
          <${Code} lines=${[['TAT = CT − AT', t('turnaround', 'الـ turnaround')], ['WT  = TAT − BT', t('waiting', 'الـ waiting')], 'Avg WT = (WT1 + … + WTn) / n', ['RT  = first on CPU − AT', t('response', 'الـ response')]]} />
          <${P} small=${true}>${X('CT = completion time, AT = arrival time, BT = burst time. Waiting time is also the <b>sum of all the gaps</b> a process spends in the ready queue.',
            'الـ CT هو الـ completion time، والـ AT هو الـ arrival time، والـ BT هو الـ burst time. والـ waiting time هو كمان <b>مجموع كل الفترات</b> اللي الـ process قعدتها في الـ ready queue.')}</${P}>
          <${Box} kind="relax" title=${t('The exam method', 'طريقة الامتحان')}><p className="hf-p small">${X('<b>1.</b> Draw the Gantt chart. <b>2.</b> Read each process\'s CT. <b>3.</b> TAT and WT for every process. <b>4.</b> Average them.',
            '<b>١.</b> ارسم الـ Gantt chart. <b>٢.</b> اقرا الـ CT لكل process. <b>٣.</b> احسب الـ TAT والـ WT لكل واحدة. <b>٤.</b> طلّع المتوسط.')}</p></${Box}>
          <${Hand} red=${true}>${t('shortcut: everyone arrives at 0 and nobody is preempted? Then WT = the time it starts.', 'اختصار: لو الكل واصل عند 0 ومفيش preemption، يبقى الـ WT هو وقت البداية بتاعها.')}</${Hand}>
        `),

        // 12 · match
        page(html`
          <${H2}>${t('Which criterion is which?', 'أنهي معيار ده؟')}</${H2}>
          <${P} small=${true}>${t('Tap a criterion, then the description that fits it.', 'دوس على المعيار، وبعدين على الوصف بتاعه.')}</${P}>
          <${Match} id="crit" left=${['CPU utilization', 'Throughput', 'Turnaround time', 'Waiting time', 'Response time']}
            right=${A ? ['من الـ request لحد أول response، والهدف أقل', 'عدد اللي بيخلصوا في وحدة الزمن، والهدف أعلى', 'الوقت في الـ ready queue، والهدف أقل', 'إن الـ CPU يفضل مشغول، والهدف أعلى', 'من التقديم لحد ما تخلص، والهدف أقل']
              : ['Request until the first response (minimize)', 'Processes completed per time unit (maximize)', 'Time in the ready queue (minimize)', 'Keep the CPU busy (maximize)', 'Submission to completion (minimize)']}
            answer=${[3, 1, 4, 2, 0]} />
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${t('Now let\'s put numbers on them. First algorithm coming up.', 'يلا نحط عليهم أرقام. أول algorithm جاي.')}</${Talk}>
        `),

        // 13 · FCFS
        page(html`
          <${H1}>${t('FCFS: first come, first served', 'الـ FCFS: اللي ييجي الأول يتخدم الأول')}</${H1}>
          <${P} small=${true}>${X('<b>Non-preemptive</b>: processes run in arrival order. The lecture\'s processes all arrive at 0, in the order P1, P2, P3:', 'الـ FCFS <b>non-preemptive</b>: بيشغّل بترتيب الوصول. مثال المحاضرة، والكل واصل عند 0 بالترتيب P1 ثم P2 ثم P3:')}</${P}>
          <${PT} head=${['Process', 'Burst']} rows=${[['P1', 24], ['P2', 3], ['P3', 3]]} />
          <${Gantt} blocks=${G.fcfs1} />
          <p className="hf-os3-avg hf-in">WT 0, 24, 27 → (0 + 24 + 27)/3 = 17</p>
          <${P} small=${true}>${X('Now suppose they arrive in the order <b>P2, P3, P1</b>:', 'طب افرض وصلوا بالترتيب <b>P2 ثم P3 ثم P1</b>:')}</${P}>
          <${Gantt} blocks=${G.fcfs2} />
          <p className="hf-os3-avg hf-in">WT P1 6, P2 0, P3 3 → (6 + 0 + 3)/3 = 3</p>
          <${Hand} red=${true}>${t('same work, 17 vs 3: much better than the previous case', 'نفس الشغل، 17 قصاد 3: أحسن بكتير من الحالة اللي قبلها')}</${Hand}>
        `, { sec: 'FCFS' }),
        page(html`
          <${Box} kind="watch" title=${t('Watch it: the convoy effect', 'خلّي بالك: الـ convoy effect')}><p className="hf-p small">${X('<b>Convoy effect</b>: short processes stuck behind a long one make FCFS\'s average waiting time large. And the midterm\'s key: FCFS is particularly troublesome for <b>time-sharing systems</b>.',
            'الـ <b>Convoy effect</b>: الـ processes القصيرة اللي بتتزنق ورا واحدة طويلة بتخلّي متوسط الـ waiting time في الـ FCFS كبير. وإجابة الميدترم: الـ FCFS بيعمل مشاكل خصوصًا مع الـ <b>time-sharing systems</b>.')}</p></${Box}>
          <${Fig} name="os-fcfs-sim" />
        `),

        // 15 · SJF
        page(html`
          <${H1}>${t('SJF: shortest job first', 'الـ SJF: الأقصر الأول')}</${H1}>
          <${P} small=${true}>${X('Associate each process with the length of its <b>next CPU burst</b> and run the shortest first (ties → FCFS). The lecture\'s example, all available at 0:',
            'بنربط كل process بطول الـ <b>CPU burst الجاي</b> بتاعها ونشغّل الأقصر الأول (لو فيه تعادل نمشي FCFS). مثال المحاضرة، والكل موجود عند 0:')}</${P}>
          <${PT} head=${['Process', 'Burst']} rows=${[['P1', 6], ['P2', 8], ['P3', 7], ['P4', 3]]} />
          <${Gantt} blocks=${G.sjf} />
          <p className="hf-os3-avg hf-in">(3 + 16 + 9 + 0)/4 = 7</p>
          <${Def}>${X('<b>SJF is optimal</b>: it gives the <b>minimum average waiting time</b> for a given set of processes.', 'الـ <b>SJF هو الـ optimal</b>: بيدّي <b>أقل متوسط waiting time</b> لأي مجموعة processes.')}</${Def}>
          <${Grow} />
          <${Talk} who="os" flip=${true}>${X('The catch: I have to <b>know the next burst length</b>. I can ask the user, or estimate.', 'المشكلة: لازم <b>أعرف طول الـ burst الجاي</b>. يا أسأل الـ user، يا أقدّر.')}</${Talk}>
        `, { sec: 'SJF' }),
        page(html`
          <${Box} kind="watch" title=${t('‡ Watch it: arrival times', '‡ خلّي بالك: أوقات الوصول')}><p className="hf-p small">${X('‡ The slide\'s SJF table shows only Process and Burst Time, so its chart treats everyone as there at 0. If a question also gives arrival times <b>0, 2, 4, 5</b>, non-preemptive SJF can only pick from processes that have arrived:',
            '‡ جدول الـ SJF في السلايد فيه Process وBurst Time بس، فالـ chart بتاعه بيعامل الكل كأنهم موجودين عند 0. لو السؤال إدّاك كمان arrival times هي <b>0 و2 و4 و5</b>، الـ non-preemptive SJF بيختار بس من اللي وصلوا:')}</p>
            <${Gap} h=${4} /><${Gantt} blocks=${G.sjfA} />
            <p className="hf-os3-avg">WT 0, 14, 5, 1 → 20/4 = 5</p>
            <p className="hf-p small">${t('Follow what the question says about arrival times.', 'امشي على اللي السؤال بيقوله عن الـ arrival times.')}</p></${Box}>
          <${Dumb} qa=${A ? [
            ['لو الـ SJF هو الأحسن، ليه مش الكل بيستخدمه؟', 'لأن الصعوبة إنك <b>تعرف طول الـ CPU burst الجاي</b>. يا تسأل الـ user يا تقدّر.'],
            ['والـ SRTF ده algorithm تاني خالص؟', 'لأ، هو <b>النسخة الـ preemptive من الـ SJF</b>. الصفحة الجاية.']
          ] : [
            ['If SJF is the best, why doesn\'t everyone just use it?', 'Because you have to <b>know the length of the next CPU burst</b>. You can only ask the user or estimate it.'],
            ['Is SRTF a whole different algorithm?', 'No, it is the <b>preemptive version of SJF</b>. Next page.']
          ]} />
        `),
        page(html`
          <${H2}>${t('Run SJF yourself', 'شغّل الـ SJF بنفسك')}</${H2}>
          <${Fig} name="os-sjf-sim" />
        `),

        // 18 · SRTF
        page(html`
          <${H1}>${t('SRTF: SJF that interrupts', 'الـ SRTF: SJF بيقاطع')}</${H1}>
          <${P} small=${true}>${X('<b>Shortest-Remaining-Time-First</b>: when a process arrives with a burst <b>shorter than what remains</b> of the running one, preempt. Now arrival times vary:',
            'الـ <b>Shortest-Remaining-Time-First</b>: لما process توصل بـ burst <b>أقصر من اللي فاضل</b> من الشغالة، اعمل preempt. ودلوقتي أوقات الوصول مختلفة:')}</${P}>
          <${PT} head=${['Process', 'Arrival', 'Burst']} rows=${[['P1', 0, 8], ['P2', 1, 4], ['P3', 2, 9], ['P4', 3, 5]]} />
          <${UL} items=${A ? [
            'عند <bdi dir="ltr">t = 1</bdi>: الـ P2 (4) أقل من الفاضل من P1 (7)، فـ <b>P1 بتتعملها preempt</b>.',
            'عند <bdi dir="ltr">t = 2</bdi> و<bdi dir="ltr">3</bdi>: الـ P3 (9) والـ P4 (5) مش أقصر من الفاضل من P2.',
            'عند <bdi dir="ltr">t = 5</bdi>: الـ P2 خلصت. والفاضل <bdi dir="ltr">P1 7, P3 9, P4 5</bdi>، فـ <b>P4</b>.',
            'عند <bdi dir="ltr">t = 10</bdi>: الـ P1 (7) قبل P3 (9). وعند 17 الـ P3 لحد 26.'
          ] : [
            't = 1: P2 (4) &lt; P1\'s remaining 7, so <b>P1 is preempted</b>.',
            't = 2 and 3: P3 (9) and P4 (5) are not shorter than what P2 has left.',
            't = 5: P2 done. Remaining: P1 7, P3 9, P4 5 → <b>P4</b>.',
            't = 10: P1 (7) before P3 (9). At 17, P3 runs to 26.'
          ]} />
        `, { sec: 'SRTF' }),
        page(html`
          <${H2}>${t('The SRTF chart and its waiting times', 'الـ chart بتاع الـ SRTF والـ waiting times')}</${H2}>
          <${Gantt} blocks=${G.srtf} />
          <p className="hf-os3-avg hf-in">[(10−1) + (1−1) + (17−2) + (5−3)]/4<br/>= 26/4 = 6.5</p>
          <${UL} items=${A ? [
            'الـ P1 اشتغلت من 0 لـ 1 ورجعت عند 10، يعني استنت <bdi dir="ltr">10 − 1 = 9</bdi>.',
            'الـ P2 وصلت عند 1 واشتغلت على طول، يعني <bdi dir="ltr">1 − 1 = 0</bdi>.',
            'الـ P3 وصلت عند 2 وبدأت عند 17، يعني <bdi dir="ltr">17 − 2 = 15</bdi>.',
            'الـ P4 وصلت عند 3 وبدأت عند 5، يعني <bdi dir="ltr">5 − 3 = 2</bdi>.'
          ] : [
            'P1 ran 0–1 and came back at 10: it waited 10 − 1 = 9.',
            'P2 arrived at 1 and ran at once: 1 − 1 = 0.',
            'P3 arrived at 2, started at 17: 17 − 2 = 15.',
            'P4 arrived at 3, started at 5: 5 − 3 = 2.'
          ]} />
          <${Hand} red=${true}>${X('check: WT = TAT − BT gives the same. P1: (17 − 0) − 8 = 9.', 'اتأكد: القانون <bdi dir="ltr">WT = TAT − BT</bdi> بيدّي نفس الرقم. في الـ P1: <bdi dir="ltr">(17 − 0) − 8 = 9</bdi>')}</${Hand}>
          <${Grow} />
          <${Talk} who="proc">${t('I was there first, got kicked off at t = 1, and waited until 10. Preemption hurts.', 'أنا اللي جيت الأول، واتشالت عند 1، واستنيت لحد 10. الـ preemption بيوجع.')}</${Talk}>
        `),
        page(html`
          <${H2}>${t('Step through SRTF', 'امشي في الـ SRTF خطوة خطوة')}</${H2}>
          <${Fig} name="os-srtf-sim" />
        `),

        // 20 · Round Robin
        page(html`
          <${H1}>${t('Round Robin: everybody gets a turn', 'الـ Round Robin: بالدور')}</${H1}>
          <${P} small=${true}>${X('Each process gets a small unit of CPU time, the <b>time quantum q</b> (usually 10–100 ms). When it expires the process is <b>preempted and added to the end of the ready queue</b>; a timer interrupts every quantum.',
            'كل process بتاخد حتة صغيرة من الـ CPU اسمها <b>time quantum q</b> (غالبًا <bdi dir="ltr">10–100 ms</bdi>). لما تخلص <b>بتتعملها preempt وتروح آخر الـ ready queue</b>، والـ timer بيقاطع كل quantum.')}</${P}>
          <${Def}>${X('With <b>n</b> processes and quantum <b>q</b>, each gets 1/n of the CPU in chunks of at most q, and <b>no process waits more than (n − 1)q</b> time units.',
            'مع <b>n</b> processes والـ quantum <b>q</b>، كل واحدة بتاخد <bdi dir="ltr">1/n</bdi> من الـ CPU في حتت بالكتير q، و<b>مفيش process تستنى أكتر من <bdi dir="ltr">(n − 1)q</bdi></b>.')}</${Def}>
          <${UL} items=${A ? ['لو <b>الـ q كبير</b>، الـ RR بيتصرف <b>زي الـ FCFS</b>.', 'لو <b>الـ q صغير</b>، context switches كتير. فالـ q لازم يبقى كبير جنب وقت الـ switch (أقل من <bdi dir="ltr">10 µs</bdi>).', 'عادة <b>turnaround أعلى من الـ SJF</b>، بس <b>response أحسن</b>.']
            : ['<b>q large</b> → behaves like <b>FIFO/FCFS</b>.', '<b>q small</b> → too many context switches, so q must be large compared to the context-switch time (&lt; 10 µs).', 'Typically <b>higher average turnaround than SJF</b>, but <b>better response</b>.']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Three processes, q = 4. What is the longest any of them can wait before its next turn?', 'تلات processes والـ <bdi dir="ltr">q = 4</bdi>. أطول انتظار ممكن قبل الدور الجاي قد إيه؟')}</p></${Box}>
        `, { sec: 'Round Robin' }),
        page(html`
          <${H2}>${X('RR with q = 4 (slides 20–21)', 'الـ RR بـ <bdi dir="ltr">q = 4</bdi> (سلايد <bdi dir="ltr">20–21</bdi>)')}</${H2}>
          <${P} small=${true}>${X('Back to <b>P1 = 24, P2 = 3, P3 = 3</b>, all at 0. P1 gets 4 units and goes to the back; P2 and P3 finish inside their first quantum; then P1 is alone and runs one quantum at a time:',
            'نرجع للـ processes دي، والكل عند 0:<span class="ltr"><b>P1 = 24, P2 = 3, P3 = 3</b></span>الـ P1 بتاخد 4 وتروح آخر الطابور، والـ P2 والـ P3 بيخلصوا جوّه أول quantum، وبعدين الـ P1 بتفضل لوحدها وتشتغل quantum ورا quantum:')}</${P}>
          <${Gantt} blocks=${G.rr4} />
          <p className="hf-os3-avg hf-in">[(30 − 24) + (7 − 3) + (10 − 3)]/3<br/>= 17/3 = 5.67</p>
          <${Hand} arrow="up">${t('everyone arrives at 0, so WT = completion − burst', 'الكل واصل عند 0، فالـ WT بيساوي الـ completion ناقص الـ burst')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch" title=${t('Watch it: a tie at the queue', 'خلّي بالك: تعادل على الطابور')}><p className="hf-p small">${X('If a quantum expires at the same instant a new process arrives, the convention in all the worked answers: the <b>new arrival is queued first</b>, and the preempted process goes behind it.',
            'لو الـ quantum خلص في نفس اللحظة اللي process جديدة وصلت فيها، الاصطلاح في كل الإجابات المحلولة: <b>الجديدة تدخل الطابور الأول</b>، واللي اتعملها preempt تقف وراها.')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Try different quanta', 'جرّب quantum مختلف')}</${H2}>
          <${Fig} name="os-rr-sim" />
        `),

        // 23–24 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: FCFS and Round Robin argue about fairness.", 'قعدة الليلة: الـ FCFS والـ Round Robin بيتخانقوا على العدل.')} />
          <${Chat} names=${['FCFS', 'Round Robin']} lines=${A ? [
            [0, 'أنا بسيط: اللي ييجي الأول ياخد الـ CPU <b>ويمسكه</b> لحد ما يخلص أو يروح waiting. مفيش preemption خالص.'],
            [1, 'ولو أول واحد طوله 24؟ الـ P2 والـ P3 هيستنوا 24 و27، والمتوسط <b>17</b>.'],
            [0, 'ماشي، ده الـ <b>convoy effect</b>. بس لو رتبتهم P2 ثم P3 ثم P1 المتوسط ينزل <b>3</b>.'],
            [1, 'مش إنت اللي بتختار الترتيب. أنا بدّي كل واحد <b>quantum</b>، 4 مثلًا، ولما يخلص يروح آخر الطابور. نفس التلاتة: <b>5.67</b>.'],
            [0, 'وإنت محتاج timer يقاطع كل quantum، وكل تبديلة context switch.']
          ] : [
            [0, "I'm simple: whoever arrives first gets the CPU and <b>keeps it</b> until it terminates or waits. No preemption, ever."],
            [1, 'And if the first one is 24 units long? P2 and P3 wait 24 and 27. Average: <b>17</b>.'],
            [0, "Fine, that's the <b>convoy effect</b>. Order them P2, P3, P1 and I get <b>3</b>."],
            [1, "You don't get to pick the order. I give everyone a <b>quantum</b>, say 4, then back of the queue. Same three: <b>5.67</b>."],
            [0, 'And you need a timer interrupting every quantum. Every switch is a context switch.']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${['FCFS', 'Round Robin']} lines=${A ? [
            [1, 'عشان كده الـ q لازم يبقى كبير مقارنة بالـ context switch. الـ switch أقل من <bdi dir="ltr">10 µs</bdi>.'],
            [0, 'كبّر الـ q قوي وتعرف هتبقى مين؟ <b>أنا</b>.'],
            [1, 'صح… بس معايا <b>مفيش process تستنى أكتر من <bdi dir="ltr">(n − 1)q</bdi></b>.'],
            [0, 'والـ turnaround بتاعك عادة أعلى من الـ SJF.'],
            [1, 'بس الـ <b>response</b> بتاعي أحسن. وإحنا الاتنين <b>مبنعملش starvation</b> لحد.']
          ] : [
            [1, "That's why q must be large compared to the context-switch time. A switch takes under 10 µs."],
            [0, 'Make your q very large and guess who you become? <b>Me</b>.'],
            [1, 'True… but with me <b>no process waits more than (n − 1)q</b>.'],
            [0, 'And your average turnaround is typically higher than SJF\'s.'],
            [1, 'But my <b>response</b> is better. And neither of us <b>starves</b> anyone.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm trap: <i>"using very <b>small</b> time slices converts it into FCFS"</i> is wrong. It is very <b>large</b> slices that turn RR into FCFS.',
            'فخ الميدترم: لو قالك إن الـ time slices <b>الصغيرة</b> جدًا بتحوّل الـ RR لـ FCFS يبقى غلط. الـ slices <b>الكبيرة</b> جدًا هي اللي بتحوّله FCFS.')}</p></${Box}>
        `),

        // 25 · priority
        page(html`
          <${H1}>${t('Priority: the VIPs go first', 'الـ Priority: الـ VIP الأول')}</${H1}>
          <${P} small=${true}>${X('Each process has a priority number (an integer); the CPU goes to the highest priority. It can be <b>preemptive or non-preemptive</b>.', 'كل process ليها priority number (integer)، والـ CPU بيروح للأعلى. وممكن يبقى <b>preemptive</b> أو <b>non-preemptive</b>.')}</${P}>
          <${Hand} red=${true} big=${true}>${t('smallest integer = highest priority', 'أصغر رقم = أعلى priority')}</${Hand}>
          <${P} small=${true}>${X('<b>SJF is a priority algorithm</b> too: its priority is the inverse of the predicted next CPU burst.', 'والـ <b>SJF نفسه priority algorithm</b>: الـ priority فيه عكس طول الـ CPU burst الجاي المتوقع.')}</${P}>
          <${Box} kind="watch" title=${t('Watch it: starvation and aging', 'خلّي بالك: الـ starvation والـ aging')}><p className="hf-p small">${X('<b>Problem: starvation</b>: low-priority processes may never execute. <b>Solution: aging</b>: gradually increase the priority of processes that wait a long time. SJF can starve long jobs too; FCFS and RR do not starve.',
            '<b>المشكلة: الـ starvation</b>: الـ processes اللي الـ priority بتاعها واطي ممكن عمرها ما تتنفذ. <b>الحل: الـ aging</b>: نزوّد الـ priority بالتدريج للـ processes اللي بتستنى كتير. والـ SJF كمان ممكن يجوّع الـ jobs الطويلة، أما الـ FCFS والـ RR فمفيهمش starvation.')}</p></${Box}>
          <${Grow} />
        `, { sec: t('Priority', 'الـ Priority') }),

        // 26 · be the scheduler: priority
        page(html`
          <${Box} kind="pencil" title=${t('Be the scheduler', 'خليك إنت الـ scheduler')}><p className="hf-p small">${X('The lecture\'s priority example, all at 0 (burst · priority). Tap the processes in run order, then type each waiting time.',
            'مثال الـ priority من المحاضرة، والكل عند 0. دوس على الـ processes بترتيب التشغيل، وبعدين اكتب الـ waiting time لكل واحدة.')}</p></${Box}>
          <${Build} id="pr" pr=${true} procs=${[['P1', 10, 3], ['P2', 1, 1], ['P3', 2, 4], ['P4', 1, 5], ['P5', 5, 2]]} ans=${['P2', 'P5', 'P1', 'P3', 'P4']} wt=${{ P1: 6, P2: 0, P3: 16, P4: 18, P5: 1 }} avg="8.2" />
        `, { sec: t('Be the scheduler', 'خليك إنت الـ scheduler') }),
        page(html`
          <${H2}>${t('The priority simulator', 'محاكي الـ priority')}</${H2}>
          <${Fig} name="os-prio-sim" />
        `),

        // 28 · priority with RR
        page(html`
          <${H2}>${t('Priority with Round Robin (slide 25)', 'الـ Priority مع الـ Round Robin (سلايد 25)')}</${H2}>
          <${P} small=${true}>${X('Run the highest priority first; processes with the <b>same priority run round-robin</b>. Here q = 2:', 'شغّل الـ priority الأعلى الأول، والـ processes اللي <b>ليها نفس الـ priority بتشتغل round-robin</b>. والـ q هنا بيساوي 2:')}</${P}>
          <${PT} head=${['Process', 'Burst', 'Priority']} rows=${[['P1', 4, 3], ['P2', 5, 2], ['P3', 8, 2], ['P4', 7, 1], ['P5', 3, 3]]} />
          <${Gantt} blocks=${G.priorr} />
          <${UL} items=${A ? ['الـ P4 (priority 1) بتشتغل لوحدها من 0 لـ 7.', 'الـ P2 والـ P3 (priority 2) بيتبادلوا 2 بـ 2 لحد ما P2 تخلص عند 16، والـ P3 تكمّل لـ 20.', 'الـ P1 والـ P5 (priority 3) بيتبادلوا من 20 لـ 27.']
            : ['P4 (priority 1) runs alone, 0–7.', 'P2 and P3 (priority 2) alternate in quanta of 2 until P2 finishes at 16; P3 runs on to 20.', 'P1 and P5 (priority 3) alternate, 20–27.']} />
          <p className="hf-os3-avg hf-in">WT = CT − BT<br/>22 + 11 + 12 + 0 + 24 = 69 → 69/5 = 13.8</p>
        `),
        page(html`
          <${H2}>${t('Step through priority + RR', 'امشي في الـ priority مع الـ RR خطوة خطوة')}</${H2}>
          <${Fig} name="os-prio-rr-sim" />
        `),

        // 30 · multilevel queue
        page(html`
          <${H1}>${t('One queue per priority', 'لكل priority فيه queue')}</${H1}>
          <${P} small=${true}>${X('<b>Multilevel queue</b>: with priority scheduling, keep a <b>separate queue for each priority</b> and schedule from the highest-priority queue. Prioritization can be by process type:',
            'الـ <b>Multilevel queue</b>: مع الـ priority scheduling، بنعمل <b>queue منفصلة لكل priority</b> ونعمل schedule من أعلى queue. والترتيب ممكن يبقى حسب نوع الـ process:')}</${P}>
          <${Fig} name="os-mlq-types" />
          <${Hand} arrow="up">${t('real-time (highest) → system → interactive → batch (lowest)', 'من فوق لتحت: real-time ثم system ثم interactive ثم batch')}</${Hand}>
        `, { sec: t('Multilevel queues', 'الـ Multilevel queues') }),
        page(html`
          <${H2}>${t('Schedule from the top queue (slide 26)', 'اختار من أعلى queue (سلايد 26)')}</${H2}>
          <${Fig} name="os-mlq" />
        `),

        // 32 · MLFQ
        page(html`
          <${H2}>${t('Multilevel feedback queue', 'الـ Multilevel feedback queue')}</${H2}>
          <${P} small=${true}>${X('Now a process <b>can move between queues</b>. The lecture\'s example: <b>Q0</b> = RR, q = 8 ms; <b>Q1</b> = RR, q = 16 ms; <b>Q2</b> = FCFS. A new process enters Q0 and gets 8 ms; not finished → Q1 and 16 more ms; still not done → preempted and moved to Q2.',
            'هنا الـ process <b>تقدر تتنقل بين الـ queues</b>. مثال المحاضرة: الـ <b>Q0</b> شغالة RR بـ <bdi dir="ltr">q = 8 ms</bdi>، والـ <b>Q1</b> شغالة RR بـ <bdi dir="ltr">q = 16 ms</bdi>، والـ <b>Q2</b> شغالة FCFS. الجديدة تدخل Q0 وتاخد 8 ms؛ ماخلصتش؟ تنزل Q1 وتاخد 16؛ لسه؟ preempt وتنزل Q2.')}</${P}>
          <${Lanes} />
          <${UL} items=${A ? ['بيتعرّف بعدد الـ queues والـ algorithm بتاع كل queue', 'وطريقة <b>ترقية (upgrade)</b> الـ process و<b>تنزيلها (demote)</b>', 'والـ process تدخل أنهي queue لما تحتاج خدمة']
            : ['Defined by: the number of queues and each queue\'s algorithm', 'how to <b>upgrade</b> a process and how to <b>demote</b> it', 'which queue a process enters when it needs service']} />
          <${Hand} red=${true}>${t('aging can be implemented with this queue', 'والـ aging ممكن يتعمل بالـ queue دي')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Demoted, queue by queue (slide 29)', 'بتنزل queue ورا queue (سلايد 29)')}</${H2}>
          <${Fig} name="os-mlfq" />
        `),

        // 35 · review problem
        page(html`
          <${H2}>${t('The review problem (also Midterm 2021/22)', 'مسألة المراجعة (وكمان ميدترم 2021/22)')}</${H2}>
          <${P} small=${true}>${X('All at 0, in the order P1…P4 (burst · priority). Pick a tab, build each chart, type the waiting times.', 'الكل عند 0، بالترتيب من P1 لـ P4 (الـ burst ثم الـ priority). اختار tab، ابني الـ chart، واكتب الـ waiting times.')}</${P}>
          <${Review} />
        `, { sec: t('Review problem', 'مسألة المراجعة') }),
        page(html`
          <${Box} kind="pencil" title=${t('Now Round Robin, q = 1', 'دلوقتي الـ RR بـ q = 1')}><p className="hf-p small">${X('Same four processes. Work out the chart on paper, then type each completion time (CT) and waiting time (WT).', 'نفس الأربع processes. اشتغل الـ chart على ورقة، وبعدين اكتب الـ completion time (CT) والـ waiting time (WT) لكل واحدة.')}</p></${Box}>
          <${Fill} id="rr1" procs=${[['P1', 10], ['P2', 3], ['P3', 2], ['P4', 1]]} gantt=${G.rr1} ct=${{ P1: 16, P2: 9, P3: 7, P4: 4 }} wt=${{ P1: 6, P2: 6, P3: 5, P4: 3 }} avg="5" />
          <${Hand} red=${true}>${X('averages: FCFS 9.5, SJF 2.5, RR 5, priority 5.75. Minimum: SJF, as SJF is provably optimal.', 'المتوسطات:<span class="ltr">FCFS 9.5 · SJF 2.5 · RR 5 · priority 5.75</span>والأقل هو الـ SJF، لأنه مثبت إنه optimal.')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('All four on one screen', 'الأربعة على شاشة واحدة')}</${H2}>
          <${Fig} name="os-review-sim" />
        `),

        // exam corner: one question a page, so the explanation has room
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' exam and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحان الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /minimum average waiting time/i)}
          <${Grow} />
          <${Hand} red=${true}>${X('same answer for the midterm\'s <i>"tends to minimize the process flow time"</i>: SJF (flow time = turnaround)', 'ونفس الإجابة SJF لسؤال الميدترم عن الـ <bdi dir="ltr">process flow time</bdi> (يعني الـ turnaround)')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /round robin scheduling algorithm in a time shared/i)}
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${t('Huge slices: nobody is ever interrupted. Sounds like someone we know.', 'لو الـ slices ضخمة محدش بيتقاطع أبدًا. شبه حد إحنا عارفينه.')}</${Talk}>
        `),
        page(html`
          ${mq('m3', /What is .Aging/i)}
          <${Grow} />
          <${Hand} red=${true}>${X('its twin on the exam: <i>"A solution to the problem of indefinite blockage of low-priority processes"</i>: <b>aging</b>, not starvation (starvation is the problem).', 'وتوأمه في الامتحان: حل مشكلة الـ <bdi dir="ltr">indefinite blockage</bdi> للـ processes الواطية هو <b>aging</b>، مش starvation (دي المشكلة نفسها).')}</${Hand}>
        `),

        // 40 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'تنفيذ الـ process عبارة عن <b><bdi dir="ltr">CPU–I/O burst cycle</bdi></b>. والـ scheduler بيختار من الـ ready queue.',
            'القرار في 4 حالات؛ في 1 و4 بس يبقى <b>non-preemptive</b>، وإلا <b>preemptive</b> (وده ممكن يعمل race conditions).',
            'الـ <b>dispatcher</b> بيبدّل الـ context، ويحوّل لـ user mode، وينط للمكان الصح؛ ووقته هو الـ <b>dispatch latency</b>.',
            'نعلّي الـ utilization والـ throughput؛ ونقلّل الـ turnaround والـ waiting والـ response.',
            'القوانين:<span class="ltr">TAT = CT − AT,  WT = TAT − BT</span>',
            'الـ FCFS عنده <b>convoy effect</b>؛ والـ <b>SJF هو الـ optimal</b>؛ والـ SRTF هو الـ SJF الـ preemptive.',
            'الـ RR: لو الـ q كبير يبقى FCFS، ولو صغير switches كتير، ومفيش انتظار أكتر من <bdi dir="ltr">(n − 1)q</bdi>.',
            'في الـ priority أصغر رقم هو الأعلى؛ والـ <b>starvation</b> علاجها الـ <b>aging</b>. والـ multilevel feedback queue بتنقل الـ processes بين الـ queues.'
          ] : [
            'Execution is a <b>CPU–I/O burst cycle</b>; the scheduler picks from the ready queue.',
            'Four decision moments. In 1 and 4 there is no choice; scheduling only then is <b>non-preemptive</b>, otherwise <b>preemptive</b> (which can cause race conditions).',
            'The <b>dispatcher</b>: switch context, switch to user mode, jump to the right place. Its cost: <b>dispatch latency</b>.',
            'Maximize utilization and throughput; minimize turnaround, waiting and response time.',
            'TAT = CT − AT, WT = TAT − BT.',
            'FCFS suffers the <b>convoy effect</b>; <b>SJF is optimal</b>; SRTF is preemptive SJF.',
            'RR uses a quantum q: too large → FCFS, too small → context-switch overhead; no wait beyond (n − 1)q.',
            'Priority: smallest integer = highest; <b>starvation</b> is fixed by <b>aging</b>. A multilevel feedback queue moves processes between queues.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 41 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="cpu">${X('Next time: the processes need a place to live. <b>Memory management</b>!', 'المرة الجاية: الـ processes محتاجة مكان تعيش فيه. الـ <b>Memory management</b>!')}</${Talk}>
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

// Head First chapter for Operating Systems Lecture 6 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Deadlocks: the system model, the four necessary conditions, resource-allocation graphs, prevention, avoidance (safe state,
// banker's algorithm), detection (wait-for graph, detection algorithm) and recovery.
// Every fact, vector, Need matrix, safe sequence and request decision comes from the lecture's notes (and was re-checked
// with a script); our own analogies and examples are marked as ours. This lecture has no doctor's questions, so the
// exam corner uses the site's practice questions and says so.
// lectures: [6]
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K;
  const { useState } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-os6')) {
    const s = document.createElement('style'); s.id = 'hf-css-os6';
    s.textContent = `
.hfb .hf-os6-sw{ display:grid; grid-template-columns:1fr 1fr; gap:7px; }
.hfb .hf-os6-sw button{ font:700 14px/1.2 var(--body); padding:7px 6px; min-height:50px; border-radius:8px; border:2px solid var(--hf-line); background:color-mix(in srgb, var(--hf-red) 13%, var(--paper)); color:var(--ink); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; }
.hfb .hf-os6-sw button i{ font:600 12.5px/1 var(--body); font-style:normal; color:var(--hf-red); }
.hfb .hf-os6-sw button.hf-os6-off{ background:var(--paper); border-style:dashed; border-color:var(--ok); color:var(--graphite); }
.hfb .hf-os6-sw button.hf-os6-off b{ text-decoration:line-through; }
.hfb .hf-os6-sw button.hf-os6-off i{ color:var(--ok); }
.hfb .hf-os6-st{ font:700 14.5px/1.35 var(--body); padding:8px 10px; border-radius:8px; border:2px solid var(--hf-red); color:var(--hf-red); margin:0; transition:color .3s, border-color .3s; }
.hfb .hf-os6-st.hf-os6-good{ border-color:var(--ok); color:var(--ok); }
.hfb.hf-ar .hf-os6-sw button, .hfb.hf-ar .hf-os6-st, .hfb.hf-ar .hf-os6-msg, .hfb.hf-ar .hf-os6-modes button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-os6-tb{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13.5px/1.25 var(--mono); color:var(--ink); }
.hfb .hf-os6-tb th, .hfb .hf-os6-tb td{ border:1px solid var(--hf-line); text-align:center; padding:3px 2px; white-space:nowrap; overflow:hidden; }
.hfb .hf-os6-tb thead th{ background:var(--hf-grey); font:800 12.5px/1.2 var(--body); }
.hfb .hf-os6-tb tbody th{ background:var(--hf-grey); color:var(--ink); font-weight:800; }
.hfb .hf-os6-tb td.hf-os6-k{ color:var(--hf-hand); font-weight:800; }
.hfb .hf-os6-in{ width:23px; height:26px; border:1.5px solid var(--faint); border-radius:4px; text-align:center; font:700 14px/1 var(--mono); background:var(--paper); color:var(--hf-hand); padding:0; margin:0 1px; }
.hfb .hf-os6-in.hf-os6-ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-os6-in.hf-os6-no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 14%, var(--paper)); color:var(--ink); }
.hfb .hf-os6-tb tr.hf-os6-done td, .hfb .hf-os6-tb tr.hf-os6-done th{ background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.hfb .hf-os6-tb tr.hf-os6-bad td, .hfb .hf-os6-tb tr.hf-os6-bad th{ background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); }
.hfb .hf-os6-tb th button{ width:100%; height:30px; font:800 13.5px/1 var(--mono); border:1.5px solid var(--hf-line); border-radius:5px; background:var(--paper); color:var(--ink); cursor:pointer; padding:0; }
.hfb .hf-os6-tb th button:disabled{ cursor:default; border-color:transparent; background:none; }
.hfb .hf-os6-work{ display:flex; justify-content:center; align-items:baseline; gap:8px; font:700 14.5px/1 var(--body); color:var(--ink); margin:0 0 6px; }
.hfb .hf-os6-work b{ font:800 18px/1 var(--mono); color:var(--hf-hand); }
.hfb .hf-os6-work b.hf-os6-pop{ animation:hf-os6-pop .45s ease; }
@keyframes hf-os6-pop{ 40%{ transform:scale(1.18); } }
.hfb .hf-os6-seq{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; min-height:26px; margin-top:6px; font:600 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-os6-seq span{ font:700 13px/1 var(--mono); border:1.5px solid var(--hf-line); border-radius:99px; padding:4px 8px; background:var(--paper); color:var(--ink); animation:hf-up .35s both; }
.hfb .hf-os6-seq span.hf-os6-x{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-os6-msg{ font:600 14px/1.35 var(--body); margin:6px 0 0; }
.hfb .hf-os6-msg.hf-os6-red{ color:var(--hf-red); } .hfb .hf-os6-msg.hf-os6-grn{ color:var(--ok); }
.hfb .hf-os6-modes{ display:flex; gap:5px; margin-bottom:6px; }
.hfb .hf-os6-modes button{ flex:1 1 0; font:700 13px/1.15 var(--body); padding:5px 4px; min-height:34px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os6-modes button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-os6-wf{ border:2px solid var(--hf-line); border-radius:8px; padding:6px; background:var(--paper); }
.hfb .hf-os6-wf svg{ display:block; width:100%; height:auto; }
.hfb .hf-os6-wf .hf-os6-fade{ transition:opacity .6s; }
.hfb .hf-os6-key{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font:600 12.5px/1.2 var(--body); color:var(--graphite); margin-top:3px; }
.hfb .hf-os6-key i{ display:inline-block; width:16px; height:3px; vertical-align:middle; margin-right:4px; border-radius:2px; }
.hfb .hf-os6-mat{ display:grid; grid-template-columns:auto 1fr; gap:4px 9px; align-items:baseline; }
.hfb .hf-os6-mat > b{ font:800 13.5px/1.2 var(--mono); color:var(--hf-k); white-space:nowrap; }
.hfb .hf-os6-mat span{ font-size:14px; line-height:1.32; }
.hfb.hf-ar .hf-os6-mat span{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.5; }
.hfb .hf-os6-ways{ display:grid; gap:6px; }
.hfb .hf-os6-ways > div{ display:grid; grid-template-columns:34px 1fr; gap:8px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); }
.hfb .hf-os6-ways > div > b{ font:800 26px/1 var(--body); color:var(--hf-k); text-align:center; }
.hfb .hf-os6-ways p{ margin:0; font-size:14px; line-height:1.32; }
.hfb .hf-os6-ways p strong{ display:block; font:800 14.5px/1.2 var(--body); }
.hfb.hf-ar .hf-os6-ways p{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.5; }
.hfb.hf-ar .hf-os6-ways p strong{ font-family:"IBM Plex Sans Arabic", var(--body); }
`;
    document.head.appendChild(s);
  }

  /* ── vectors ── */
  const add = (a, b) => a.map((x, k) => x + b[k]);
  const le = (a, b) => a.every((x, k) => x <= b[k]);
  const vs = a => '(' + a.join(',') + ')';
  const PS = ['P0', 'P1', 'P2', 'P3', 'P4'];
  const RES = ['A', 'B', 'C'];

  // the notes' banker's snapshot (A = 10, B = 5, C = 7; Available (3,3,2))
  const ALLOC = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
  const MAX = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];
  const NEED = MAX.map((m, i) => m.map((x, j) => x - ALLOC[i][j]));   // 743 122 600 011 431
  const AVAIL = [3, 3, 2];
  // the notes' detection example (A = 7, B = 2, C = 6; Available (0,0,0))
  const D_ALLOC = [[0, 1, 0], [2, 0, 0], [3, 0, 3], [2, 1, 1], [0, 0, 2]];
  const D_REQ = [[0, 0, 0], [2, 0, 2], [0, 0, 0], [1, 0, 0], [0, 0, 2]];
  const D_REQ2 = [[0, 0, 0], [2, 0, 2], [0, 0, 1], [1, 0, 0], [0, 0, 2]];

  // the four conditions as switches: break any one and deadlock cannot happen
  const CONDS = ['Mutual exclusion', 'Hold and wait', 'No preemption', 'Circular wait'];
  function Switches({ id }) {
    const ar = useAr();
    const [off, setOff] = H.K.useSlot(id, []);
    const tog = k => setOff(off.includes(k) ? off.filter(x => x !== k) : off.concat(k));
    const broken = CONDS.filter((_, k) => off.includes(k));
    return html`<div className="hf-in">
      <div className="hf-os6-sw">${CONDS.map((c, k) => html`<button key=${c} className=${off.includes(k) ? 'hf-os6-off' : ''} aria-pressed=${String(!off.includes(k))} onClick=${() => tog(k)}>
        <b>${ar ? 'الـ ' + c : c}</b><i>${off.includes(k) ? (ar ? 'اتكسر' : 'broken') : (ar ? 'متحقق' : 'holds')}</i></button>`)}</div>
      <p className=${'hf-os6-st' + (broken.length ? ' hf-os6-good' : '')} style=${{ marginTop: '8px' }} aria-live="polite">${broken.length
        ? (ar ? 'الـ deadlock مش ممكن يحصل، عشان كسرت ' + broken.map(c => 'الـ ' + c).join(' والـ ') + '.' : "Deadlock can't happen: " + broken.join(' and ') + (broken.length > 1 ? ' are' : ' is') + ' broken.')
        : (ar ? 'الأربعة متحققين في نفس الوقت: الـ deadlock ممكن يحصل.' : 'All four hold at the same time: deadlock can arise.')}</p></div>`;
  }

  // the notes' snapshot with the Need column to fill in
  function NeedFill({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const keys = []; NEED.forEach((r, i) => r.forEach((_, j) => keys.push([i, j])));
    const right = keys.filter(([i, j]) => v[i + ',' + j] === String(NEED[i][j])).length;
    const put = (k, val) => { setV(Object.assign({}, v, { [k]: val.replace(/[^0-9]/g, '').slice(0, 2) })); setChecked(false); };
    return html`<div className="hf-in">
      <div dir="ltr"><table className="hf-os6-tb"><colgroup><col style=${{ width: '34px' }} /><col /><col /><col style=${{ width: '96px' }} /></colgroup>
        <thead><tr><th></th><th>Allocation<br/>A B C</th><th>Max<br/>A B C</th><th>Need<br/>A B C</th></tr></thead>
        <tbody>${PS.map((p, i) => html`<tr key=${p}><th>${p}</th><td>${ALLOC[i].join(' ')}</td><td>${MAX[i].join(' ')}</td>
          <td>${NEED[i].map((_, j) => { const k = i + ',' + j, val = v[k] || '', st = checked && val !== '' ? (val === String(NEED[i][j]) ? ' hf-os6-ok' : ' hf-os6-no') : '';
            return html`<input key=${j} className=${'hf-os6-in' + st} value=${val} inputMode="numeric" maxLength="2" aria-label=${'Need of ' + p + ' for ' + RES[j]} onChange=${e => put(k, e.target.value)} />`; })}</td></tr>`)}</tbody></table></div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const n = {}; keys.forEach(([i, j]) => { n[i + ',' + j] = String(NEED[i][j]); }); setV(n); setChecked(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${keys.length}${right === keys.length ? '!' : ''}</bdi></span>`}
      </div></div>`;
  }

  // be the banker / be the detector: tap the next process that can finish; "nobody fits" when stuck
  function RunIt({ id, cases }) {
    const ar = useAr();
    const [ci, setCi] = H.K.useSlot(id + ':case', 0);
    const C = cases[Math.min(ci, cases.length - 1)];
    const [st, setSt] = H.K.useSlot(id + ':' + ci, { seq: [], stuck: false });
    const [miss, setMiss] = useState(null);
    const n = C.alloc.length;
    const fin = C.alloc.map(a => !!C.detect && a.every(x => x === 0));
    st.seq.forEach(k => { fin[k] = true; });
    const work = st.seq.reduce((w, k) => add(w, C.alloc[k]), C.avail.slice());
    const fits = k => !fin[k] && le(C.vec[k], work);
    const cands = PS.slice(0, n).map((_, k) => k).filter(fits);
    const allDone = fin.every(Boolean), over = allDone || st.stuck;
    const tap = k => {
      if (over || fin[k]) return;
      if (fits(k)) { setMiss(null); setSt({ seq: st.seq.concat(k), stuck: false }); return; }
      const j = C.vec[k].findIndex((x, r) => x > work[r]);
      setMiss({ k, j, t: Date.now() });
    };
    const stuck = () => { if (cands.length) setMiss({ fit: cands[0], t: Date.now() }); else { setMiss(null); setSt({ seq: st.seq, stuck: true }); } };
    const seqTxt = s => '<' + s.map(k => PS[k]).join(', ') + '>';
    const same = st.seq.join() === C.show.join();
    const left = PS.slice(0, n).filter((_, k) => !fin[k]);
    let msg = null;
    if (allDone) msg = ar
      ? html`<p className="hf-os6-msg hf-os6-grn">${C.detect ? 'مفيش deadlock، كل الـ Finish بقت true بالترتيب ده:' : 'كده الـ state طلعت SAFE بالـ sequence دي:'}<span className="ltr">${seqTxt(st.seq)}</span>${!same ? html`وده صح كمان. ترتيب الـ notes هو:<span className="ltr">${seqTxt(C.show)}</span>` : ''}</p>`
      : html`<p className="hf-os6-msg hf-os6-grn">${C.detect ? 'No deadlock: every Finish is true. Order:' : 'SAFE, with your sequence:'} ${seqTxt(st.seq)}${!same ? html`. That's a valid one too; the notes' order is ${seqTxt(C.show)}.` : ''}</p>`;
    else if (st.stuck) msg = html`<p className="hf-os6-msg hf-os6-red">${C.detect
      ? (ar ? html`فيه deadlock! الـ Finish لسه false عند دول، فكلهم في deadlock:<span className="ltr">${left.join(', ')}</span>` : html`Deadlock! Finish is still false for ${left.join(', ')}: they are all deadlocked.`)
      : (ar ? 'الـ state دي UNSAFE.' : 'UNSAFE.')}</p>`;
    else if (miss && miss.fit != null) msg = html`<p className="hf-hand red" style=${{ marginTop: '5px' }}>${ar ? html`لسه فيه process تنفع: بص على <bdi dir="ltr">${PS[miss.fit]}</bdi>.` : 'Someone still fits: look at ' + PS[miss.fit] + '.'}</p>`;
    else if (miss) msg = html`<p className="hf-hand red" style=${{ marginTop: '5px' }}>${ar
      ? html`مش دلوقتي: الـ <bdi dir="ltr">${PS[miss.k]}</bdi> محتاجة ${C.vec[miss.k][miss.j]} من ${RES[miss.j]}، والـ Work فيه ${work[miss.j]} بس.`
      : `Not ${PS[miss.k]} yet: it needs ${C.vec[miss.k][miss.j]} of ${RES[miss.j]}, and Work has only ${work[miss.j]}.`}</p>`;
    else msg = html`<p className="hf-hand" style=${{ marginTop: '5px' }}>${ar ? html`دوس على أي process الـ ${C.vecName} بتاعها أصغر من أو يساوي الـ Work. ولو مفيش، دوس "مفيش حد ينفع".` : html`Tap a process whose ${C.vecName} ≤ Work. If none fits, tap "Nobody fits".`}</p>`;
    return html`<div className="hf-in">
      ${cases.length > 1 && html`<div className="hf-os6-modes">${cases.map((c, k) => html`<button key=${k} aria-pressed=${String(ci === k)} onClick=${() => { setCi(k); setMiss(null); }}>${ar ? c.ar : c.en}</button>`)}</div>`}
      <div dir="ltr">
        <p className="hf-os6-work">Work = <b key=${st.seq.length} className=${calm() ? '' : 'hf-os6-pop'}>${vs(work)}</b></p>
        <table className="hf-os6-tb"><colgroup><col style=${{ width: '58px' }} /><col /><col /><col style=${{ width: '64px' }} /></colgroup>
          <thead><tr><th></th><th>Allocation</th><th>${C.vecName}</th><th>Finish</th></tr></thead>
          <tbody>${PS.slice(0, n).map((p, k) => html`<tr key=${p} className=${fin[k] ? 'hf-os6-done' : st.stuck ? 'hf-os6-bad' : ''}>
            <th><button disabled=${over || fin[k]} onClick=${() => tap(k)} aria-label=${'Run ' + p}>${p}</button></th>
            <td>${C.alloc[k].join(' ')}</td><td className="hf-os6-k">${C.vec[k].join(' ')}</td><td>${fin[k] ? 'true' : 'false'}</td></tr>`)}</tbody></table>
        <div className="hf-os6-seq">${st.seq.map(k => html`<span key=${k}>${PS[k]}</span>`)}${st.stuck ? left.map(p => html`<span key=${p} className="hf-os6-x">${p} ✗</span>`) : null}</div>
      </div>
      ${msg}
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        ${!over && html`<button className="hf-btn" onClick=${stuck}>${ar ? 'مفيش حد ينفع' : 'Nobody fits'}</button>`}
        <button className="hf-btn" onClick=${() => { setSt({ seq: C.show.slice(), stuck: !!C.stuckEnd }); setMiss(null); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${(st.seq.length > 0 || st.stuck) && html`<button className="hf-btn" onClick=${() => { setSt({ seq: [], stuck: false }); setMiss(null); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  // our own single-instance example (the one in the conditions figure): collapse the resources to get the wait-for graph
  const WP = { P0: [150, 24], P1: [258, 150], P2: [42, 150] }, WR = { R1: [96, 87], R2: [204, 87], R3: [150, 150] };
  const W_RAG = [['R1', 'P0', 'h'], ['P0', 'R2', 'r'], ['R2', 'P1', 'h'], ['P1', 'R3', 'r'], ['R3', 'P2', 'h'], ['P2', 'R1', 'r']];
  const W_WF = [['P0', 'P1'], ['P1', 'P2'], ['P2', 'P0']];
  const at = k => WP[k] || WR[k];
  const cut = (a, b, ra, rb) => { const [x1, y1] = at(a), [x2, y2] = at(b), d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d; return [x1 + ux * ra, y1 + uy * ra, x2 - ux * rb, y2 - uy * rb]; };
  function WaitFor({ id }) {
    const ar = useAr();
    const [wf, setWf] = H.K.useSlot(id, false);
    const col = { h: 'var(--hf-line)', r: 'var(--hf-hand)', w: 'var(--hf-red)' };
    const rad = k => (WP[k] ? 19 : 17);
    return html`<div className="hf-in">
      <div className="hf-os6-modes">
        <button aria-pressed=${String(!wf)} onClick=${() => setWf(false)}>${ar ? 'الـ resource-allocation graph' : 'Resource-allocation graph'}</button>
        <button aria-pressed=${String(wf)} onClick=${() => setWf(true)}>${ar ? 'الـ wait-for graph' : 'Wait-for graph'}</button>
      </div>
      <div className="hf-os6-wf" dir="ltr">
        <svg viewBox="0 0 300 172" role="img" aria-label=${wf ? 'Wait-for graph: P0 waits for P1, P1 for P2, P2 for P0, a cycle' : 'Resource-allocation graph: each process holds one single-instance resource and requests the next'}>
          <defs>${Object.entries(col).map(([k, c]) => html`<marker key=${k} id=${'hf-os6-ah-' + k} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style=${{ fill: c }} /></marker>`)}</defs>
          <g className="hf-os6-fade" style=${{ opacity: wf ? 0 : 1 }}>
            ${W_RAG.map(([a, b, k], i) => { const [x1, y1, x2, y2] = cut(a, b, rad(a), rad(b) + 2); return html`<line key=${i} x1=${x1} y1=${y1} x2=${x2} y2=${y2} strokeWidth="2.4" markerEnd=${'url(#hf-os6-ah-' + k + ')'} style=${{ stroke: col[k] }} />`; })}
            ${Object.entries(WR).map(([k, [x, y]]) => html`<g key=${k}><rect x=${x - 15} y=${y - 15} width="30" height="30" rx="3" style=${{ fill: 'var(--hf-grey)', stroke: 'var(--hf-line)' }} strokeWidth="1.8" /><circle cx=${x} cy=${y + 5} r="3.2" style=${{ fill: 'var(--hf-line)' }} /><text x=${x} y=${y - 2} textAnchor="middle" fontSize="12" fontWeight="800" style=${{ fill: 'var(--ink)', fontFamily: 'var(--mono)' }}>${k}</text></g>`)}
          </g>
          <g className="hf-os6-fade" style=${{ opacity: wf ? 1 : 0 }}>
            ${W_WF.map(([a, b], i) => { const [x1, y1, x2, y2] = cut(a, b, 19, 21); return html`<line key=${i} x1=${x1} y1=${y1} x2=${x2} y2=${y2} strokeWidth="2.8" markerEnd="url(#hf-os6-ah-w)" style=${{ stroke: col.w }} />`; })}
          </g>
          ${Object.entries(WP).map(([k, [x, y]]) => html`<g key=${k}><circle cx=${x} cy=${y} r="19" strokeWidth="2.2" style=${{ fill: 'var(--paper)', stroke: 'var(--hf-line)' }} /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="14" fontWeight="800" style=${{ fill: 'var(--ink)', fontFamily: 'var(--mono)' }}>${k}</text></g>`)}
        </svg>
        <div className="hf-os6-key">${wf ? html`<span><i style=${{ background: col.w }}></i>Pi → Pj: Pi waits for Pj</span>` : html`<span><i style=${{ background: col.r }}></i>request P → R</span><span><i style=${{ background: col.h }}></i>assignment R → P</span>`}</div>
      </div></div>`;
  }

  H.chapters.os[6] = {
    title: 'Deadlocks',
    kicker: 'Chapter 6',
    run: 'deadlocks',
    ar: { title: 'الـ Deadlocks', kicker: 'الفصل 6', run: 'الـ deadlocks' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, Reveal } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const B = s => '<bdi dir="ltr">' + s + '</bdi>';
      const L = s => '<span class="ltr">' + s + '</span>';
      const lec = kit.course.lectures.find(l => l.n === 6);
      const arL = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[6]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the site's practice questions (this lecture has none from the doctor): from the lecture's quiz or its extra questions
      const pq = (id, re, from) => { const list = lec[from] || []; const i = list.findIndex(x => re.test(strip(x.q))); return i < 0 ? null : html`<${MCQ} id=${id} q=${list[i]} why=${(arL[from] || [])[i]} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · where we left off + warm-up
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter the OS juggled <b>memory</b>: pages, frames, page faults and who gets kicked out. This chapter is about something nastier: processes that wait for each other <b>forever</b>.',
            'في الفصل اللي فات الـ OS كان بيلعب بالـ <b>memory</b>: pages وframes وpage faults ومين يتطرد. الفصل ده عن حاجة أوحش: processes بتستنى بعض <b>للأبد</b>.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('<b>P1</b> holds the printer and asks for the scanner. <b>P2</b> holds the scanner and asks for the printer. Neither will let go of what it has. What happens next? Who can fix it?',
            'الـ <b>P1</b> ماسكة الـ printer وطالبة الـ scanner. والـ <b>P2</b> ماسكة الـ scanner وطالبة الـ printer. ومحدش فيهم راضي يسيب اللي في إيده. هيحصل إيه بعد كده؟ ومين يقدر يحلها؟')}</p>
            <p className="hf-p small" style=${{ marginTop: '5px' }}>${X('(Our example, not the slides\'.)', '(مثال من عندنا، مش من الـ slides.)')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t('Same rules as always: do the pencil exercises, stop and think at Brain Power, and the red Watch it! boxes are the traps that trip students up.', 'نفس القواعد: حل تمارين القلم، وفكّر عند شغّل مخك، وصناديق خلّي بالك الحمرا دي الفخاخ اللي بتوقّع الطلبة.')}</${Hand}>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">6</span><span className="t">${A ? html`الفصل السادس<br/>Operating Systems` : html`Chapter six<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Nobody Lets Go', 'محدش راضي يسيب')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('Deadlocks: the four conditions, prevention, avoidance, detection and recovery', 'الـ Deadlocks: الأربع شروط، والـ prevention، والـ avoidance، والـ detection، والـ recovery')}</p></div>
          <${Talk} who="proc">${X('I\'m holding R1 and I need R2. I\'ll just wait until it\'s free.', 'أنا ماسكة الـ R1 ومحتاجة الـ R2. هستنى لحد ما يفضى.')}</${Talk}>
          <${Talk} who="proc" flip=${true}>${X('Funny. I\'m holding R2 and waiting for <b>your</b> R1.', 'طريفة. وأنا ماسكة الـ R2 ومستنية الـ R1 <b>بتاعك</b>.')}</${Talk}>
          <${Talk} who="os">${X('And that is a <b>deadlock</b>: each one waits for the other, forever.', 'وده اسمه <b>deadlock</b>: كل واحدة مستنية التانية، للأبد.')}</${Talk}>
          <${P} small=${true}>${X('By the end you\'ll spot one in a graph, prevent it, run the <b>banker\'s algorithm</b> by hand, and detect and recover.', 'في آخر الفصل هتلاقيه في graph، وتمنعه، وتشغّل الـ <b>banker\'s algorithm</b> بإيدك، وتكتشفه وتعمل recover.')}</${P}>
        `, { sec: t('Meet the deadlock', 'اتعرّف على الـ deadlock') }),

        // 2 · system model
        page(html`
          <${H1}>${t('First, the system model', 'الأول، الـ system model')}</${H1}>
          <${P}>${X('A system has <b>resource types</b> R1, R2, …, Rm: CPU cycles, memory space, I/O devices. Each type Ri has <b>Wi instances</b>.',
            'السيستم فيه <b>resource types</b> هي R1 وR2 لحد Rm: زي الـ CPU cycles والـ memory space والـ I/O devices. وكل نوع Ri ليه <b>Wi instances</b>.')}</${P}>
          <${Hand} arrow="down">${t('Two printers = one resource type with 2 instances (our example)', 'اتنين printer يعني resource type واحد ليه 2 instances (مثال من عندنا)')}</${Hand}>
          <${Def}>${X('Every process uses a resource in three steps: <b>request → use → release</b>.',
            'كل process بتستخدم الـ resource على 3 خطوات:' + L('<b>request → use → release</b>'))}</${Def}>
          <${Talk} who="proc" flip=${true}>${X('I ask, I use it, I give it back. The trouble starts at "ask" when someone else has it.', 'بطلب، وأستخدم، وأرجّع. المشكلة بتبدأ عند "بطلب" لما يكون حد تاني ماسكه.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('If every resource could be used by everybody at once, could a deadlock ever happen? Keep that thought: it is condition number 1.', 'لو كل resource ينفع الكل يستخدمه في نفس الوقت، هل ممكن يحصل deadlock أصلًا؟ احتفظ بالفكرة دي: دي الشرط رقم 1.')}</p></${Box}>
        `),

        // 3 · four conditions
        page(html`
          <${H1}>${t('Four conditions, all at once', 'أربع شروط، كلهم مع بعض')}</${H1}>
          <${P} small=${true}>${X('Deadlock can arise if these <b>four conditions hold simultaneously</b>:', 'الـ deadlock ممكن يحصل لو <b>الأربع شروط دول اتحققوا في نفس الوقت</b>:')}</${P}>
          <div className="hf-os6-ways hf-in">
            <div><b>1</b><p>${X('<strong>Mutual exclusion</strong>Only one process at a time can use a resource.', '<strong>الـ Mutual exclusion</strong>يعني process واحدة بس في المرة تقدر تستخدم الـ resource.')}</p></div>
            <div><b>2</b><p>${X('<strong>Hold and wait</strong>A process holding at least one resource waits to acquire more, held by other processes.', '<strong>الـ Hold and wait</strong>يعني process ماسكة resource واحد على الأقل ومستنية resources زيادة مع processes تانية.')}</p></div>
            <div><b>3</b><p>${X('<strong>No preemption</strong>A resource is released only voluntarily by its holder, after it has completed its task.', '<strong>الـ No preemption</strong>الـ resource مايتسابش غير بمزاج الـ process اللي ماسكاه، بعد ما تخلّص الـ task بتاعتها.')}</p></div>
            <div><b>4</b><p>${X('<strong>Circular wait</strong>A set {P0, …, Pn}: P0 waits for P1, P1 for P2, …, Pn−1 for Pn, and Pn for P0.', '<strong>الـ Circular wait</strong>فيه مجموعة processes:' + L('{P0, …, Pn}') + 'الـ P0 مستنية P1، والـ P1 مستنية P2، وهكذا، والـ Pn مستنية P0.')}</p></div>
          </div>
          <${Grow} />
          <${Hand} red=${true}>${t('"Simultaneously" is the key word: miss one and there is no deadlock.', 'لو شرط واحد ناقص، مفيش deadlock.')}</${Hand}>
        `, { sec: t('The four conditions', 'الأربع شروط') }),

        // 4 · conditions figure
        page(html`
          <${H2}>${t('Watch the four conditions pile up', 'اتفرّج على الشروط وهي بتتجمع')}</${H2}>
          <${Fig} name="os-dl-conditions" />
        `),

        // 5 · switchboard
        page(html`
          <${H2}>${t('Break one, save them all', 'اكسر واحد، تنقذ الكل')}</${H2}>
          <${P} small=${true}>${X('Tap a condition to break it. Deadlock needs <b>all four</b>; take away any one and it cannot happen. That is the whole idea behind <b>prevention</b>, coming soon.',
            'دوس على شرط عشان تكسره. الـ deadlock محتاج <b>الأربعة</b>؛ شيل أي واحد ومش هيحصل. ودي كل فكرة الـ <b>prevention</b> اللي جاية بعد شوية.')}</${P}>
          <${Switches} id="sw" />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The third condition is <b>NO preemption</b>, not "preemption". A quiz that lists "Preemption" as an option is asking which one is <b>not</b> a condition.',
            'الشرط التالت اسمه <b>NO preemption</b>. ولو سؤال حاطط Preemption لوحدها في الاختيارات، يبقى هي دي اللي <b>مش</b> من الشروط.')}</p></${Box}>
        `),

        // 6 · RAG basics
        page(html`
          <${H1}>${t('Draw it: the resource-allocation graph', 'ارسمها: الـ resource-allocation graph')}</${H1}>
          <${P} small=${true}>${X('The vertices V split into two kinds:', 'الـ vertices V بتتقسم لنوعين:')}</${P}>
          <div className="hf-os6-mat hf-in">
            <b>P</b><span>${X('processes {P1…Pn}, drawn as <b>circles</b>', 'الـ processes ' + B('{P1…Pn}') + '، وبتترسم <b>دواير</b>')}</span>
            <b>R</b><span>${X('resource types {R1…Rm}, drawn as <b>boxes</b> with one dot per instance', 'الـ resource types ' + B('{R1…Rm}') + '، وبتترسم <b>مربعات</b> فيها نقطة لكل instance')}</span>
            <b>Pi → Rj</b><span>${X('<b>request edge</b>: Pi asks for Rj', 'الـ <b>request edge</b>: الـ Pi طالبة الـ Rj')}</span>
            <b>Rj → Pi</b><span>${X('<b>assignment edge</b>: from an instance dot to the process that holds it', 'الـ <b>assignment edge</b>: من نقطة الـ instance للـ process اللي ماسكاه')}</span>
          </div>
          <${Talk} who="table">${X('Read the arrows like a sentence: P → R is "I want", R → P is "I belong to".', 'اقرا الأسهم كأنها جملة: السهم ' + B('P → R') + ' يعني "أنا عايز"، والسهم ' + B('R → P') + ' يعني "أنا بتاع".')}</${Talk}>
          <${Hand}>${t('(our memory trick)', '(طريقة حفظ من عندنا)')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('In a graph, which shape would a deadlock make? Look for it in the three graphs on the next page.', 'في الـ graph، الـ deadlock هيعمل شكل إيه؟ دوّر عليه في الـ 3 graphs اللي في الصفحة الجاية.')}</p></${Box}>
        `, { sec: t('Resource-allocation graphs', 'الـ Resource-allocation graphs') }),

        // 7 · RAG figure
        page(html`
          <${H2}>${t('Three graphs from the notes', 'الـ 3 graphs بتوع الـ notes')}</${H2}>
          <${Fig} name="os-dl-rag" />
        `),

        // 8 · basic facts
        page(html`
          <${H1}>${t('Cycles: the basic facts', 'الـ Cycles: الحقائق الأساسية')}</${H1}>
          <div className="hf-os6-ways hf-in">
            <div><b>✓</b><p>${X('<strong>No cycle → no deadlock</strong>Always.', '<strong>مفيش cycle يبقى مفيش deadlock</strong>دايمًا.')}</p></div>
            <div><b>✗</b><p>${X('<strong>Cycle + one instance per type → deadlock</strong>Every process in the cycle waits for the next one\'s only instance.', '<strong>فيه cycle وinstance واحد لكل نوع يبقى فيه deadlock</strong>كل process في الـ cycle مستنية الـ instance الوحيد اللي مع اللي بعدها.')}</p></div>
            <div><b>?</b><p>${X('<strong>Cycle + several instances → possibility</strong>Someone outside the cycle may release an instance and break it.', '<strong>فيه cycle وكذا instance يبقى فيه احتمال</strong>ممكن process برّه الـ cycle تسيب instance وتكسرها.')}</p></div>
          </div>
          <${P} small=${true}>${X('In the third graph, P2 and P4 hold the other instances of R1 and R2 and wait for nothing, so they can release and break the cycle.', 'في الـ graph التالت، الـ P2 والـ P4 ماسكين الـ instances التانية من R1 وR2 ومش مستنيين حاجة، فيقدروا يسيبوا ويكسروا الـ cycle.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"If a resource-allocation graph contains a cycle, the system is definitely deadlocked." <b>False.</b> Only with one instance per resource type.',
            L('"If a resource-allocation graph contains a cycle, the system is definitely deadlocked."') + 'الجملة دي <b>غلط</b>. ده بيحصل بس لو كل resource type ليه instance واحد.')}</p></${Box}>
        `),

        // 9 · sort exercise
        page(html`
          <${Box} kind="pencil" title=${t('Deadlock or not?', 'فيه deadlock ولا لأ؟')}>
            <p className="hf-p small">${X('For each graph, pick <b>D</b> (deadlock for sure), <b>No</b> (no deadlock) or <b>?</b> (only a possibility).', 'لكل graph اختار <b>أكيد</b> (فيه deadlock أكيد)، أو <b>لأ</b> (مفيش deadlock)، أو <b>يمكن</b> (احتمال بس).')}</p></${Box}>
          <${Sort} id="s-rag" bins=${A ? [['أكيد', 'فيه deadlock'], ['لأ', 'مفيش deadlock'], ['يمكن', 'احتمال بس']] : [['D', 'Deadlock'], ['No', 'No deadlock'], ['?', 'Only possible']]} items=${A ? [
            ['الـ graph مفيهوش أي cycle.', 1],
            ['فيه cycle، وكل resource type ليه instance واحد بالظبط.', 0],
            ['فيه cycle، والـ resource types ليها كذا instance، ومش عارف حاجة تانية.', 2],
            ['نفس graph الـ slide اللي مفيهوش deadlock، وزيادة عليه ' + B('P3 → R2') + '.', 0],
            ['فيه cycle:' + L('P1 → R1 → P3 → R2 → P1') + 'والـ instances التانية مع P2 وP4 اللي مش مستنيين حاجة.', 1],
            ['أول graph في الـ slides: الـ P3 مش طالبة حاجة، فتخلص وبعدها P2 وبعدها P1.', 1]
          ] : [
            ['The graph has no cycle at all.', 1],
            ['There is a cycle, and every resource type has exactly one instance.', 0],
            ['There is a cycle, types have several instances, and that is all you know.', 2],
            ["The slide's no-deadlock graph plus the request P3 → R2.", 0],
            ["Cycle P1 → R1 → P3 → R2 → P1; the other instances are held by P2 and P4, who wait for nothing.", 1],
            ["The slide's first graph: P3 requests nothing, so it finishes, then P2, then P1.", 1]
          ]} />
        `),

        // 10 · methods
        page(html`
          <${H1}>${t('Three ways to handle deadlocks', '3 طرق للتعامل مع الـ deadlocks')}</${H1}>
          <div className="hf-os6-ways hf-in">
            <div><b>1</b><p>${X('<strong>Never enter a deadlock state</strong><b>Prevention</b> or <b>avoidance</b>.', '<strong>عمره ما يدخل deadlock state</strong>بالـ <b>prevention</b> أو بالـ <b>avoidance</b>.')}</p></div>
            <div><b>2</b><p>${X('<strong>Let it happen, then recover</strong><b>Detection</b> + <b>recovery</b>.', '<strong>نسيبه يحصل، وبعدين نعمل recover</strong>بالـ <b>detection</b> وبعدها الـ <b>recovery</b>.')}</p></div>
            <div><b>3</b><p>${X('<strong>Ignore the problem</strong>Pretend deadlocks never occur.', '<strong>نتجاهل المشكلة</strong>ونعمل نفسنا إن الـ deadlocks عمرها ما بتحصل.')}</p></div>
          </div>
          <${Talk} who="os" flip=${true}>${X('Want to know a secret? Most operating systems, <b>including UNIX</b>, pick option 3.', 'تحب تعرف سر؟ أغلب الـ operating systems، <b>ومنهم UNIX</b>، بتختار الطريقة رقم 3.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('UNIX and most OSs? Not prevention, not the banker\'s: they <b>ignore the problem</b>.', 'الـ UNIX وأغلب الـ OSs؟ مش prevention ولا banker\'s، دول <b>بيتجاهلوا المشكلة</b>.')}</p></${Box}>
        `, { sec: t('Handling deadlocks', 'التعامل مع الـ deadlocks') }),

        // 11 · prevention 1
        page(html`
          <${H1}>${t('Prevention: make one condition impossible', 'الـ Prevention: خلّي شرط منهم مستحيل')}</${H1}>
          <${Def}>${X('<b>Prevention</b> restrains the ways requests can be made, so that <b>at least one</b> of the four conditions cannot hold.', 'الـ <b>Prevention</b> بيقيّد طرق عمل الـ requests، عشان شرط <b>واحد على الأقل</b> من الأربعة مايتحققش.')}</${Def}>
          <${H2}>${t('1. Mutual exclusion', '1. الـ Mutual exclusion')}</${H2}>
          <${P} small=${true}>${X('Not required for <b>sharable</b> resources (e.g. read-only files), but it must hold for non-sharable ones. So it generally <b>cannot be denied</b>.', 'مش لازم للـ resources الـ <b>sharable</b> (زي الـ read-only files)، بس لازم يفضل للـ resources اللي مش sharable. فعمومًا <b>مانقدرش نكسره</b>.')}</${P}>
          <${H2}>${t('2. Hold and wait', '2. الـ Hold and wait')}</${H2}>
          <${P} small=${true}>${X('Guarantee a process holds <b>nothing</b> when it requests a resource: either request and get <b>all</b> resources before execution begins, or request only when holding none.', 'نضمن إن الـ process <b>مش ماسكة حاجة</b> وهي بتطلب resource: يا إما تطلب وتاخد <b>كل</b> الـ resources قبل ما تبدأ تتنفذ، يا إما تطلب بس وهي مش ماسكة حاجة.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The price of hold-and-wait prevention: <b>low resource utilization</b> and <b>possible starvation</b>. Learn both words; the quiz asks for them.', 'تمن منع الـ hold and wait: <b>low resource utilization</b> و<b>starvation ممكن تحصل</b>. احفظ الاتنين، السؤال بييجي عليهم.')}</p></${Box}>
        `, { sec: t('Prevention', 'الـ Prevention') }),

        // 12 · prevention 2
        page(html`
          <${H2}>${t('3. No preemption', '3. الـ No preemption')}</${H2}>
          <${P} small=${true}>${X('If a process holding resources asks for one that can\'t be allocated right away, <b>all the resources it holds are released</b> (preempted) and added to its wait list. It restarts only when it can regain its old resources plus the new one.',
            'لو process ماسكة resources وطلبت واحد مش متاح على طول، <b>كل الـ resources اللي ماسكاها بتتسحب منها</b> (preempted) وبتتضاف للـ list اللي مستنياها. ومش بتكمّل غير لما تقدر تاخد القديم والجديد مع بعض.')}</${P}>
          <${Hand}>${t('Only for resources whose state is easily saved and restored: CPU registers, memory space.', 'ده بس للـ resources اللي حالتها سهل تتحفظ وترجع: زي الـ CPU registers والـ memory space.')}</${Hand}>
          <${H2}>${t('4. Circular wait', '4. الـ Circular wait')}</${H2}>
          <${P} small=${true}>${X('Impose a <b>total ordering</b> of all resource types and require requests in <b>increasing order</b>:', 'رتّب كل الـ resource types <b>ترتيب كامل (total ordering)</b>، وخلّي الطلبات تيجي <b>بترتيب تصاعدي</b>:')}</${P}>
          <${Code} lines=${['F(tape drive) = 1', 'F(disk drive) = 5', 'F(printer)    = 12']} />
          <${P} small=${true}>${X('Need the tape and the printer? Request the tape first, then the printer. <b>Never</b> the printer then the tape.', 'محتاج الـ tape والـ printer؟ اطلب الـ tape الأول وبعدين الـ printer. و<b>عمرك ما</b> تطلب الـ printer الأول.')}</${P}>
          <${Grow} />
          <${Talk} who="os" flip=${true}>${X('Everybody climbs the same staircase, so nobody waits for someone below them. No circle.', 'الكل بيطلع نفس السلّم، فمحدش بيستنى حد تحت منه. ومفيش دايرة.')}</${Talk}>
        `),

        // 13 · ordering figure
        page(html`
          <${H2}>${t('Try to break the ordering', 'جرّب تكسر الترتيب')}</${H2}>
          <${Fig} name="os-dl-ordering" />
          <${Hand} red=${true}>${t('Holding the disk drive (5)? Only the printer (12) is allowed next.', 'ماسك الـ disk drive (5)؟ يبقى الـ printer (12) بس هو المسموح بعده.')}</${Hand}>
        `),

        // 14 · match
        page(html`
          <${Box} kind="pencil" title=${t('Which trick breaks which?', 'أنهي حيلة بتكسر أنهي شرط؟')}>
            <p className="hf-p small">${X('Tap a condition, then the prevention rule that denies it.', 'دوس على شرط، وبعدين على قاعدة الـ prevention اللي بتكسره.')}</p></${Box}>
          <${Match} id="m-prev" left=${A ? ['الـ Mutual exclusion', 'الـ Hold and wait', 'الـ No preemption', 'الـ Circular wait'] : CONDS}
            right=${A ? ['اطلب الـ resources بترتيب تصاعدي حسب ترقيم ثابت', 'صعب يتكسر: لازم يفضل للـ resources اللي مش sharable', 'سيب كل اللي ماسكه لو طلبك مش متاح على طول', 'اطلب كل حاجة قبل ما تبدأ، أو اطلب وإنت مش ماسك حاجة']
              : ['Request resources in increasing order of a numbering', 'Hard to deny: it must hold for non-sharable resources', 'Release everything you hold if a request can\'t be met now', 'Request everything before starting, or only when holding nothing']}
            answer=${[1, 3, 2, 0]} />
          <${Grow} />
          <${Hand}>${t('Only one of the four is generally left alone. Which one, and why?', 'واحد بس من الأربعة عمومًا بنسيبه في حاله. مين، وليه؟')}</${Hand}>
        `),

        // 15 · dumb questions on prevention
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه مانكسرش الـ mutual exclusion وخلاص؟', 'عشان الـ resources الـ sharable بس (زي الـ read-only files) هي اللي مش محتاجاه. أي resource مش sharable لازم process واحدة بس تستخدمه في المرة.'],
            ['ينفع نعمل preempt لأي resource؟', 'منع الـ no preemption بيتطبق بس على الـ resources اللي حالتها سهل تتحفظ وترجع، زي الـ CPU registers والـ memory space.'],
            ['ماسك الـ disk drive ' + B('(F = 5)') + '. ينفع أطلب الـ tape ' + B('(F = 1)') + '؟', 'لأ. بعد 5 مسموح بس بالأعلى، يعني الـ printer ' + B('(12)') + '. ولو محتاج الـ tape، كان لازم تطلبه الأول.'],
            ['طب الـ prevention ده ببلاش؟', 'لأ. هو بيقيّد الطلبات، ومنع الـ hold and wait مثلًا تمنه low resource utilization وstarvation ممكنة.']
          ] : [
            ['Why not just break mutual exclusion?', 'Only sharable resources (like read-only files) can do without it. A non-sharable resource must be used by one process at a time.'],
            ['Can any resource be preempted?', 'The no-preemption rule applies to resources whose state is easily saved and restored, such as CPU registers and memory space.'],
            ['I hold the disk drive (F = 5). May I ask for the tape (F = 1)?', 'No. After 5 only higher numbers are allowed: the printer (12). If you need the tape, request it first.'],
            ['Is prevention free?', 'No. It restrains requests; hold-and-wait prevention, for one, costs low resource utilization and possible starvation.']
          ]} />
        `),

        // 16 · avoidance
        page(html`
          <${H1}>${t('Avoidance: look before you lend', 'الـ Avoidance: بص قبل ما تدّي')}</${H1}>
          <${P}>${X('Avoidance needs <b>a priori information</b>. In the simplest model, each process declares the <b>maximum number</b> of resources of each type it may need.',
            'الـ Avoidance محتاج <b>معلومات مسبقة (a priori)</b>. في أبسط موديل، كل process بتعلن <b>أقصى عدد</b> resources من كل نوع ممكن تحتاجه.')}</${P}>
          <${P} small=${true}>${X('The algorithm dynamically examines the resource-allocation state (<b>available</b>, <b>allocated</b>, <b>maximum demands</b>) so that there can never be a circular wait.',
            'والـ algorithm بيفحص الـ resource-allocation state ديناميك (الـ <b>available</b> والـ <b>allocated</b> والـ <b>maximum demands</b>) عشان عمره ما يبقى فيه circular wait.')}</${P}>
          <${Talk} who="os">${X('On every request I ask: if I grant this <b>right now</b>, is the system still in a <b>safe state</b>? If not, you wait.', 'مع كل request بسأل: لو اديته الطلب ده <b>دلوقتي</b>، السيستم هيفضل في <b>safe state</b>؟ لو لأ، تستنى.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why would an OS refuse a request it <i>could</i> satisfy right now?', 'ليه الـ OS يرفض طلب هو <i>يقدر</i> يلبّيه دلوقتي؟')}</p></${Box}>
        `, { sec: t('Avoidance', 'الـ Avoidance') }),

        // 17 · safe state
        page(html`
          <${H1}>${t('What makes a state safe?', 'إمتى الـ state تبقى safe؟')}</${H1}>
          <${Def}>${X('A state is <b>safe</b> if there is a sequence &lt;P1, P2, …, Pn&gt; of <b>all</b> processes such that each Pi\'s remaining requests can be satisfied by the <b>currently available</b> resources + the resources held by all <b>Pj with j &lt; i</b>.',
            'الـ state بتبقى <b>safe</b> لو فيه sequence فيها <b>كل</b> الـ processes:' + L('&lt;P1, P2, …, Pn&gt;') + 'بحيث الطلبات الباقية لكل Pi تتلبى من الـ resources <b>المتاحة دلوقتي</b>، زائد اللي ماسكاه كل Pj قبلها ' + B('(j &lt; i)') + '.')}</${Def}>
          <${P} small=${true}>${X('If Pi\'s needs aren\'t available now, Pi waits until all Pj have finished, then gets its resources, runs, returns them and terminates. Then Pi+1 can go.',
            'لو احتياجات Pi مش متاحة دلوقتي، بتستنى لحد ما كل الـ Pj يخلصوا، وبعدين تاخد اللي محتاجاه، تتنفذ، ترجّعه وتخلص. وبعدها Pi+1 تقدر تكمّل.')}</${P}>
          <${Code} lines=${['Safe    -> no deadlocks', 'Unsafe  -> possibility of deadlock', 'Avoid   =  never enter unsafe']} />
          <${Grow} />
          <${Talk} who="os" flip=${true}>${X('Deadlock states are a <b>subset</b> of the unsafe states. Stay safe and you never get there.', 'الـ deadlock states <b>جزء</b> من الـ unsafe states. خليك safe ومش هتوصل لهناك أبدًا.')}</${Talk}>
        `),

        // 18 · safe figure
        page(html`
          <${H2}>${t('Safe, unsafe, deadlock', 'الـ Safe والـ unsafe والـ deadlock')}</${H2}>
          <${Fig} name="os-dl-safe" />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Unsafe ≠ deadlocked.</b> Unsafe only means deadlock is <b>possible</b>. "Deadlock is impossible" describes a safe state.',
            'الـ <b>unsafe مش معناها deadlock</b>. الـ unsafe معناها إن الـ deadlock <b>ممكن</b> يحصل بس. و"مستحيل يحصل deadlock" دي توصف الـ safe state.')}</p></${Box}>
        `),

        // 19 · interview with the banker's algorithm
        page(html`
          <${Interview} title=${t("The Banker's algorithm, exposed", "الـ Banker's algorithm على المكشوف")} sub=${t('This week: the cautious one who says "wait" a lot.', 'حوار الأسبوع: الحذر اللي بيقول "استنى" كتير.')} lines=${A ? [
            ['المذيع', 'إنت بتشتغل فين؟'],
            ['الـ Banker\'s', 'لما يبقى فيه <b>كذا instance</b> من كل resource type. ولو instance واحد، الـ <b>RAG</b> بالـ claim edges بيعمل شغلي.'],
            ['المذيع', 'وبتطلب إيه من الـ processes؟'],
            ['الـ Banker\'s', 'كل process لازم <b>تعلن من الأول</b> أقصى استخدام ليها.'],
            ['المذيع', 'ولو طلبت منك حاجة؟'],
            ['الـ Banker\'s', 'ممكن <b>تضطر تستنى</b>. أنا بدّي بس لو الـ state هتفضل safe.'],
            ['المذيع', 'وفيه وعد من ناحيتهم؟'],
            ['الـ Banker\'s', 'الـ process اللي تاخد كل الـ resources بتاعتها لازم <b>ترجّعها في وقت محدود</b>.'],
            ['المذيع', 'واسمك ده جه منين؟'],
            ['الـ Banker\'s', 'تشبيه من عندنا: بنك مابيسلّفش لو ده هيخليه مش قادر يكمّل مع كل زباينه.']
          ] : [
            ['Head First', 'Where do you work?'],
            ["Banker's", 'Systems with <b>multiple instances</b> of each resource type. With one instance per type, a <b>resource-allocation graph</b> (with claim edges) does my job.'],
            ['Head First', 'What do you ask of processes?'],
            ["Banker's", 'Each one must <b>claim its maximum use a priori</b>.'],
            ['Head First', 'And when one asks you for something?'],
            ["Banker's", 'It <b>may have to wait</b>. I only grant a request if the state stays safe.'],
            ['Head First', 'Do they promise you anything?'],
            ["Banker's", 'A process that gets all its resources must <b>return them in a finite amount of time</b>.'],
            ['Head First', 'Why "banker"?'],
            ["Banker's", 'Our analogy: like a bank that never lends money if that could leave it unable to see every customer through to the end.']
          ]} />
        `),

        // 20 · data structures
        page(html`
          <${H1}>${t("The banker's four tables", "الـ 4 جداول بتوع الـ Banker's")}</${H1}>
          <${P} small=${true}>${X('<b>n</b> = number of processes, <b>m</b> = number of resource types.', 'الـ <b>n</b> هو عدد الـ processes، والـ <b>m</b> هو عدد الـ resource types.')}</${P}>
          <div className="hf-os6-mat hf-in">
            <b>Available [m]</b><span>${X('k instances of Rj are free now', 'فيه k instances من Rj فاضيين دلوقتي')}</span>
            <b>Max [n×m]</b><span>${X('Pi may request <b>at most</b> k of Rj', 'الـ Pi ممكن تطلب <b>بالكتير</b> k من Rj')}</span>
            <b>Allocation [n×m]</b><span>${X('Pi <b>currently holds</b> k of Rj', 'الـ Pi <b>ماسكة دلوقتي</b> k من Rj')}</span>
            <b>Need [n×m]</b><span>${X('Pi may need k <b>more</b> of Rj', 'الـ Pi ممكن تحتاج k <b>زيادة</b> من Rj')}</span>
          </div>
          <${Def}><span style=${{ display: 'block', textAlign: 'center', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '17px' }} dir="ltr">Need = Max − Allocation</span></${Def}>
          <${Hand}>${t('Sanity check for any snapshot: Available = total instances − the sum of each Allocation column.', 'تشيك سريع: الـ Available في أي snapshot بيساوي إجمالي الـ instances ناقص مجموع كل column في الـ Allocation.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('It is Max <b>minus</b> Allocation. Max + Allocation, Allocation − Max and Available − Allocation are all wrong options you will see.', 'هي Max <b>ناقص</b> Allocation. والـ ' + B('Max + Allocation') + ' والـ ' + B('Allocation − Max') + ' والـ ' + B('Available − Allocation') + ' كلها اختيارات غلط هتشوفها.')}</p></${Box}>
        `, { sec: t("The banker's algorithm", "الـ Banker's algorithm") }),

        // 21 · safety algorithm
        page(html`
          <${H2}>${t('The safety algorithm', 'الـ Safety algorithm')}</${H2}>
          <${Code} lines=${['1. Work = Available', '   Finish[i] = false for all i', '2. find i with Finish[i] == false', '   AND Need_i <= Work', '   none found? go to step 4', '3. Work = Work + Allocation_i', '   Finish[i] = true; go to step 2', '4. all Finish[i] true -> SAFE']} />
          <${Talk} who="os">${X('Read step 3 slowly: when Pi finishes, it gives back its <b>Allocation</b>, not its Need. That is what Work grows by.', 'اقرا الخطوة 3 بالراحة: لما Pi تخلص، بترجّع الـ <b>Allocation</b> بتاعها، مش الـ Need. وده اللي الـ Work بيزيد بيه.')}</${Talk}>
          <${P} small=${true}>${X('The notes scan P0…P4 again and again, each time taking the first process whose Need ≤ Work. "≤" means every resource at once: (1,2,2) ≤ (3,3,2) because 1 ≤ 3, 2 ≤ 3 and 2 ≤ 2.',
            'الـ notes بتلف على P0…P4 أكتر من مرة، وكل مرة تاخد أول process الـ Need بتاعها أصغر من أو يساوي الـ Work. والمقارنة دي على كل resource مع بعض، يعني:' + L('(1,2,2) ≤ (3,3,2): 1 ≤ 3, 2 ≤ 3, 2 ≤ 2'))}</${P}>
        `),

        // 22 · resource-request algorithm
        page(html`
          <${H2}>${t('The resource-request algorithm', 'الـ Resource-request algorithm')}</${H2}>
          <${P} small=${true}>${X('Process Pi sends a request vector Request_i:', 'الـ process Pi بتبعت request vector اسمه Request_i:')}</${P}>
          <${Code} lines=${['1. Request_i <= Need_i ?', '     no -> ERROR (over max claim)', '2. Request_i <= Available ?', '     no -> Pi must WAIT', '3. pretend to allocate:', '   Available    -= Request_i', '   Allocation_i += Request_i', '   Need_i       -= Request_i', '   run the safety algorithm:', '     safe   -> GRANT', '     unsafe -> Pi waits,', '               old state restored']} />
          <${P} small=${true}>${X('(<code>x -= r</code> is our shorthand for <code>x = x − r</code>.)', '(العلامة <code>x -= r</code> اختصار من عندنا لـ <code>x = x − r</code>.)')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Over Need = <b>error</b>. Over Available = <b>wait</b>. Unsafe = <b>wait</b>. Only safe = <b>grant</b>.',
            'أكبر من الـ Need يبقى <b>error</b>. أكبر من الـ Available يبقى <b>تستنى</b>. والـ unsafe برضه <b>تستنى</b>. والـ safe بس بتاخد <b>grant</b>.')}</p></${Box}>
        `),

        // 23 · the snapshot: fill Need
        page(html`
          <${Box} kind="pencil" title=${t('Fill in the Need column', 'املا الـ Need column')}>
            <p className="hf-p small">${X('The lecture\'s snapshot: 5 processes, <b>A = 10, B = 5, C = 7</b> instances, <b>Available = (3, 3, 2)</b>. Type each Need = Max − Allocation.',
              'الـ snapshot بتاع المحاضرة: 5 processes، والـ instances هي ' + B('A = 10, B = 5, C = 7') + '، والـ Available هو ' + B('(3, 3, 2)') + '. اكتب كل Need، يعني Max ناقص Allocation.')}</p></${Box}>
          <${NeedFill} id="need" />
          <${Grow} />
          <${Hand}>${t('Check Available too: columns of Allocation sum to (7,2,5), and (10,5,7) − (7,2,5) = (3,3,2).', 'وتشيك على الـ Available كمان: مجموع أعمدة الـ Allocation هو (7,2,5)، والفرق من (10,5,7) هو (3,3,2).')}</${Hand}>
        `),

        // 24 · be the banker
        page(html`
          <${H2}>${t('Be the banker', 'خليك إنت الـ banker')}</${H2}>
          <${P} small=${true}>${X('Same snapshot. Run the safety algorithm: tap a process that can finish with the current Work. Watch Work grow by its Allocation.', 'نفس الـ snapshot. شغّل الـ safety algorithm: دوس على process تقدر تخلص بالـ Work اللي معاك، واتفرج على الـ Work وهو بيزيد بالـ Allocation بتاعها.')}</${P}>
          <${RunIt} id="bank" cases=${[{ alloc: ALLOC, vec: NEED, avail: AVAIL, vecName: 'Need', show: [1, 3, 4, 0, 2] }]} />
        `),

        // 25 · banker's figure
        page(html`
          <${H2}>${t("The notes' scan, step by step", 'لفّة الـ notes خطوة خطوة')}</${H2}>
          <${Fig} name="os-dl-bankers" />
          <${Hand}>${t('Ends at (10,5,7) = the totals: everything came back.', 'بيخلص عند (10,5,7) اللي هي الإجماليات: كل حاجة رجعت.')}</${Hand}>
        `),

        // 26 · the request example
        page(html`
          <${Box} kind="pencil" title=${A ? html`الـ P1 طالبة <bdi dir="ltr">(1, 0, 2)</bdi>` : 'P1 asks for (1, 0, 2)'}>
            <p className="hf-p small">${X('Same snapshot (the notes\' extra practice, from the textbook). Run the three steps of the resource-request algorithm before you peek.', 'نفس الـ snapshot (تمرين زيادة من الكتاب). مشّي خطوات الـ resource-request algorithm قبل ما تبص على الحل.')}</p></${Box}>
          <${P} small=${true}>${X('<b>Step 1.</b> Is (1,0,2) ≤ Need P1?', '<b>الخطوة 1.</b> هل الطلب ' + B('≤ Need P1') + '؟')}</${P}>
          <${Reveal} id="rq1"><p className="hf-hand">${X('Yes: Need P1 = (1,2,2).', 'أيوه: الـ Need بتاع P1 هو (1,2,2).')}</p></${Reveal}>
          <${P} small=${true}>${X('<b>Step 2.</b> Is (1,0,2) ≤ Available (3,3,2)?', '<b>الخطوة 2.</b> هل الطلب ' + B('≤ Available (3,3,2)') + '؟')}</${P}>
          <${Reveal} id="rq2"><p className="hf-hand">${X('Yes, so no waiting yet.', 'أيوه، مفيش انتظار.')}</p></${Reveal}>
          <${P} small=${true}>${X('<b>Step 3.</b> Pretend to allocate. What are the new Available, Allocation P1 and Need P1? Is it safe?', '<b>الخطوة 3.</b> افترض إنك اديتها. الـ Available وAllocation وNeed الـ P1 بقوا كام؟ وهل هي safe؟')}</${P}>
          <${Reveal} id="rq3"><div className="hf-in">
            <${Code} lines=${['Available    = (2,3,0)', 'Allocation_1 = (3,0,2)', 'Need_1       = (0,2,0)']} />
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${X('Safety still finds &lt;P1, P3, P4, P0, P2&gt;, so the request is <b>granted</b>.', 'الـ safety لسه بتلاقي:' + L('&lt;P1, P3, P4, P0, P2&gt;') + 'فالـ request <b>بيتقبل</b> (granted).')}</p></div></${Reveal}>
        `),

        // 27 · request figure
        page(html`
          <${H2}>${t('Now you send the requests', 'دلوقتي إنت اللي تبعت الطلبات')}</${H2}>
          <${Fig} name="os-dl-request" />
          <${Hand} red=${true}>${t('Our example: P4 asks for (3,3,0). It passes steps 1 and 2, yet the pretend state is unsafe, so P4 waits. Try it.', 'مثال من عندنا: الـ P4 تطلب (3,3,0). الطلب بيعدّي الخطوة 1 و2، بس الـ pretend state بتطلع unsafe، فالـ P4 تستنى. جرّبها.')}</${Hand}>
        `),

        // 28 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: Prevention and Avoidance, two ways of never meeting a deadlock.', 'قعدة الليلة: الـ Prevention والـ Avoidance، طريقتين عشان عمرك ما تقابل deadlock.')} />
          <${Chat} names=${[t('Prevention', 'الـ Prevention'), t('Avoidance', 'الـ Avoidance')]} lines=${A ? [
            [0, 'أنا بخلّي الـ deadlock <b>مستحيل من الأساس</b>: بضمن إن شرط من الأربعة عمره ما يتحقق.'],
            [1, 'وأنا بسيب الشروط زي ما هي. بس ببص على كل request، ومابدّيش غير لو الـ state هتفضل <b>safe</b>.'],
            [0, 'أنا مش محتاج أعرف أي حاجة مقدمًا.'],
            [1, 'وأنا محتاج <b>معلومات مسبقة (a priori)</b>، يعني أقصى claim لكل process.'],
            [0, 'تمني إني بقيّد الطلبات: منع الـ hold and wait مثلًا بيجيب low utilization وstarvation.'],
            [1, 'وتمني safety check مع كل request، والـ process ممكن تستنى حتى والـ resources فاضية.'],
            [0, 'بس إحنا الاتنين بنضمن إن السيستم <b>عمره ما يدخل deadlock</b>.'],
            [1, 'مش زي الـ detection، اللي بيسيبه يحصل وبعدين يعمل recover.']
          ] : [
            [0, 'I make deadlock <b>impossible by design</b>: I make sure one of the four conditions can never hold.'],
            [1, 'I leave the conditions alone. I just look at each request and grant it only if the state stays <b>safe</b>.'],
            [0, "I don't need to know anything in advance."],
            [1, 'I need <b>a priori information</b>: every process\'s maximum claim.'],
            [0, 'My price is restraining requests: hold-and-wait prevention costs low utilization and possible starvation.'],
            [1, 'Mine is a safety check on every request, and a process may wait even when resources are free.'],
            [0, 'But we both keep the system from <b>ever entering a deadlock</b>.'],
            [1, 'Unlike detection, which lets it happen and then recovers.']
          ]} />
        `),

        // 29 · detection, single instance
        page(html`
          <${H1}>${t('Detection: let it happen, then catch it', 'الـ Detection: سيبه يحصل، وبعدين امسكه')}</${H1}>
          <${P} small=${true}>${X('With a <b>single instance of each resource type</b>, keep a <b>wait-for graph</b>: nodes are processes, and Pi → Pj if Pi waits for Pj. You get it from the RAG by collapsing the resource nodes.',
            'لو فيه <b>instance واحد لكل resource type</b>، استخدم <b>wait‑for graph</b>. فيه الـ nodes هي الـ processes، وفيه سهم من Pi لـ Pj لو Pi مستنية Pj. وبيتجاب من الـ RAG بشيل الـ resource nodes.')}</${P}>
          <${WaitFor} id="wf" />
          <${P} small=${true}>${X('(Our example.) Search for a cycle every so often: <b>a cycle means a deadlock</b>. Cost: <b>O(n²)</b> for n vertices.',
            '(مثال من عندنا.) دوّر على cycle كل فترة: <b>الـ cycle معناها deadlock</b>. والتكلفة ' + B('O(n²)') + ' لـ n vertices.')}</${P}>
        `, { sec: t('Detection', 'الـ Detection') }),

        // 30 · detection, several instances
        page(html`
          <${H1}>${t('Several instances: a familiar algorithm', 'لو كذا instance، فيه algorithm تعرفه')}</${H1}>
          <${P} small=${true}>${X('Use <b>Available [m]</b>, <b>Allocation [n×m]</b> and <b>Request [n×m]</b>, the current requests. It is the safety algorithm with <b>two differences</b>:',
            'استخدم الـ <b>Available [m]</b> والـ <b>Allocation [n×m]</b> والـ <b>Request [n×m]</b>، يعني الطلبات الحالية. وهو نفس الـ safety algorithm بـ <b>فرقين</b>:')}</${P}>
          <${Code} lines=${['Finish[i] = true  if Allocation_i = 0', '          (else false)', 'test:  Request_i <= Work', '       (not Need_i)']} />
          <${P} small=${true}>${X('At the end, if Finish[i] == false for some i, the system is <b>deadlocked</b>, and every Pi with Finish[i] == false is in the deadlock.',
            'في الآخر، لو فيه i الـ Finish بتاعها false، يبقى السيستم في <b>deadlock</b>، وكل Pi الـ Finish بتاعها false تبقى جوه الـ deadlock.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Finish starts true when <b>Allocation_i = 0</b> (holding nothing, it can\'t be part of a deadlock), not when Request_i = 0.', 'الـ Finish بتبدأ true لما ' + B('<b>Allocation_i = 0</b>') + ' (مش ماسكة حاجة، فمستحيل تبقى جزء من deadlock)، مش لما ' + B('Request_i = 0') + '.')}</p></${Box}>
        `),

        // 31 · be the detector
        page(html`
          <${H2}>${t('Be the detector', 'خليك إنت الـ detector')}</${H2}>
          <${P} small=${true}>${X('The notes\' example: A = 7, B = 2, C = 6, <b>Available = (0,0,0)</b>. Nobody has Allocation = 0, so every Finish starts false. Then switch to the second case.',
            'مثال الـ notes: الـ ' + B('A = 7, B = 2, C = 6') + '، والـ Available هو ' + B('(0,0,0)') + '. ومفيش حد الـ Allocation بتاعه صفر، فكل الـ Finish بتبدأ false. وبعدين جرّب الحالة التانية.')}</${P}>
          <${RunIt} id="det" cases=${[
            { en: "Notes' example", ar: 'مثال الـ notes', detect: true, alloc: D_ALLOC, vec: D_REQ, avail: [0, 0, 0], vecName: 'Request', show: [0, 2, 3, 1, 4] },
            { en: 'P2 asks one more C', ar: 'الـ P2 تطلب C زيادة', detect: true, alloc: D_ALLOC, vec: D_REQ2, avail: [0, 0, 0], vecName: 'Request', show: [0], stuckEnd: true }
          ]} />
        `),

        // 32 · detect figure
        page(html`
          <${H2}>${t('Both cases, animated', 'الحالتين متحركين')}</${H2}>
          <${Fig} name="os-dl-detect" />
        `),

        // 33 · when to detect + termination
        page(html`
          <${H2}>${t('When should detection run?', 'الـ detection يشتغل إمتى؟')}</${H2}>
          <${P} small=${true}>${X('It depends on how often a deadlock is likely, and how many processes will need to be rolled back (one for each disjoint cycle). Run it at arbitrary times and it may find many cycles without telling which process "caused" the deadlock.',
            'بيعتمد على الـ deadlock بيحصل قد إيه، وكام process هتحتاج roll back (واحدة لكل disjoint cycle). ولو شغّلته في أوقات عشوائية ممكن يلاقي cycles كتير ومايقولكش أنهي process هي اللي "سببت" الـ deadlock.')}</${P}>
          <${H2}>${t('Recovery 1: process termination', 'الـ Recovery الأول: الـ process termination')}</${H2}>
          <${P} small=${true}>${X('Abort <b>all</b> deadlocked processes, or abort <b>one at a time</b> until the cycle is gone. Who goes first depends on:', 'اعمل abort لـ <b>كل</b> الـ processes اللي في الـ deadlock، أو abort لـ <b>واحدة في المرة</b> لحد ما الـ cycle تتشال. ومين يتقفل الأول بيعتمد على:')}</${P}>
          <${UL} items=${A ? ['الـ priority بتاعة الـ process', 'حسبت قد إيه، وفاضلها قد إيه عشان تخلص', 'الـ resources اللي استخدمتها', 'الـ resources اللي محتاجاها عشان تخلص', 'كام process هنحتاج نقفلها', 'هل هي interactive ولا batch']
            : ['the priority of the process', 'how long it has computed, and how much longer it needs', 'the resources it has used', 'the resources it needs to complete', 'how many processes will need to be terminated', 'whether it is interactive or batch']} />
        `, { sec: t('Recovery', 'الـ Recovery') }),

        // 34 · resource preemption
        page(html`
          <${H2}>${t('Recovery 2: resource preemption', 'الـ Recovery التاني: الـ resource preemption')}</${H2}>
          <${P} small=${true}>${X('Take resources away from some processes. Three issues:', 'خد resources من processes معينة. وفيه 3 مشاكل لازم نفكر فيها:')}</${P}>
          <div className="hf-os6-ways hf-in">
            <div><b>1</b><p>${X('<strong>Selecting a victim</strong>Pick the one that minimizes cost.', '<strong>اختيار الـ victim</strong>نختار اللي تكلفته أقل.')}</p></div>
            <div><b>2</b><p>${X('<strong>Rollback</strong>Return the process to some safe state and restart it from there.', '<strong>الـ Rollback</strong>نرجّع الـ process لـ safe state ونشغّلها من هناك تاني.')}</p></div>
            <div><b>3</b><p>${X('<strong>Starvation</strong>The same process may always be picked as victim, so include the <b>number of rollbacks</b> in the cost factor.', '<strong>الـ Starvation</strong>نفس الـ process ممكن تتختار victim على طول، فنحط <b>عدد الـ rollbacks</b> في الـ cost factor.')}</p></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which is NOT an issue in recovery by preemption?" <b>Compaction</b>: that one is memory management.', 'لو السؤال أنهي واحدة <b>مش</b> من مشاكل الـ recovery بالـ preemption، فالإجابة الـ <b>Compaction</b>: دي بتاعة الـ memory management.')}</p></${Box}>
        `),

        // 35–37 · exam corner (practice questions: this lecture has none from the doctor)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions for this lecture (there are no doctor's questions on it yet). Tap an answer to see why.", 'أسئلة التدريب بتاعة الموقع للمحاضرة دي (لسه مفيش أسئلة من الدكاترة عليها). دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /contains a cycle and every resource type has exactly one instance/, 'quiz')}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p3', /which process can run first in the safety algorithm/, 'quiz')}
          ${pq('p4', /already holds the\s+disk drive/, 'extra')}
        `),
        page(html`
          ${pq('p6', /Detection algorithm, resources A B/, 'extra')}
          <${Grow} />
          <${Hand}>${t('Remember: a process whose Request is (0, 0) can finish at once, even when Available is (0, 0).', 'افتكر: الـ process اللي الـ Request بتاعها (0, 0) تقدر تخلص على طول، حتى لو الـ Available هو (0, 0).')}</${Hand}>
        `),
        page(html`
          ${pq('p5', /P0 now requests \(1, 1, 0\)/, 'extra')}
          <${Grow} />
          <${P} small=${true}>${X('The question\'s snapshot (totals A = 6, B = 4, C = 5):', 'الـ snapshot بتاع السؤال (الإجماليات ' + B('A = 6, B = 4, C = 5') + '):')}</${P}>
          <${Code} lines=${['     Alloc   Need', 'P0   1 0 1   2 2 1', 'P1   2 1 0   0 1 1', 'P2   0 1 1   4 0 2', 'P3   1 1 0   0 2 2', 'Available = (2,1,3)']} />
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ deadlock محتاج <b>4 شروط مع بعض</b>: الـ mutual exclusion، والـ hold and wait، والـ <b>no</b> preemption، والـ circular wait.',
            'في الـ RAG: مفيش cycle يبقى مفيش deadlock. وcycle مع instance واحد يبقى deadlock. وcycle مع كذا instance يبقى احتمال.',
            'الـ Prevention بيكسر شرط: كل حاجة مرة واحدة، أو سيب اللي ماسكه، أو اطلب بترتيب تصاعدي.',
            'أغلب الـ OSs، ومنهم UNIX، <b>بتتجاهل</b> الـ deadlocks.',
            'الـ Avoidance: الـ safe معناها مفيش deadlock، والـ unsafe معناها احتمال بس.',
            'الـ Banker\'s: الـ <b><bdi dir="ltr">Need = Max − Allocation</bdi></b>، واللي بتخلص بترجّع الـ Allocation للـ Work.',
            'الـ Detection: الـ wait-for graph في حالة الـ instance الواحد <bdi dir="ltr">(O(n²))</bdi>، أو <bdi dir="ltr">Request ≤ Work</bdi> والـ Finish بتبدأ true لو <bdi dir="ltr">Allocation = 0</bdi>.',
            'الـ Recovery: abort للكل أو واحدة واحدة، أو preemption (victim وrollback وstarvation).'
          ] : [
            'Deadlock needs <b>all four</b>: mutual exclusion, hold and wait, <b>no</b> preemption, circular wait.',
            'RAG: no cycle → no deadlock; cycle + one instance per type → deadlock; cycle + several → only possible.',
            'Prevention denies one condition: all at once, release what you hold, or request in increasing order.',
            'Most OSs, including UNIX, <b>ignore</b> deadlocks.',
            'Avoidance: safe → no deadlock; unsafe → only possible; deadlock states ⊂ unsafe.',
            "Banker's: <b>Need = Max − Allocation</b>; a finished process returns its Allocation to Work.",
            'Detection: wait-for graph cycle (single instance, O(n²)), or Request ≤ Work with Finish true if Allocation = 0.',
            'Recovery: abort all or one at a time, or preempt (victim, rollback, starvation).'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 6!', 'خلّصت الفصل السادس!')}</${H1}>
            <${Talk} who="os">${t('Nobody is stuck anymore. Next: where all that data lives when the power goes off. The file system!', 'محدش عالق دلوقتي. الجاي: الداتا كلها بتتحفظ فين لما الكهربا تقطع؟ الـ File system!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [6], t: Date.now() } }}>${t('Quiz me on Lecture 6', 'امتحنّي في محاضرة 6')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 6, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 6, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

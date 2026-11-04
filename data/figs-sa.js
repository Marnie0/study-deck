// Visuals for the Systems Analysis and Design notes (names 'sa-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fsa-accent')) { const s = document.createElement('style'); s.id = 'fsa-accent'; s.textContent = '[data-fig^="sa-"]{ --fig-k: var(--k-fp); --fig-s: var(--s-fp); }'; document.head.appendChild(s); } })();
/* ── part L4 ── */
// Systems Analysis and Design visuals, Lecture 4 (Structuring System Process Requirements: Data Flow Diagrams): SDLC analysis phase, DFD symbols, diagramming rules and a rule checker, Hoosier Burger levels, balancing, flow splitting, the payroll case, other cases and the exam error hunt (CH_04 slides 3 to 45 and the 2023/24 exam). Every label and number comes from the slides and the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.sav4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.sav4 .fig-btn.sav4-on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.sav4-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:440px; }
.sav4 svg text{ font-size:12.5px; fill:var(--ink); font-family:var(--body); }
.sav4 svg text.sav4-num{ font-weight:700; }
.sav4 svg text.sav4-fl{ paint-order:stroke; stroke:var(--paper-2); stroke-width:4px; stroke-linejoin:round; }
.sav4 svg text.sav4-kt{ fill:var(--fig-k); font-weight:700; }
.sav4 svg text.sav4-bt{ fill:var(--pen); font-weight:700; }
.sav4 svg text.sav4-gt{ fill:var(--graphite); }
.sav4 .sav4-pf, .sav4 .sav4-sf{ fill:var(--paper); }
.sav4 .sav4-band{ fill:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.sav4 .sav4-po{ fill:none; stroke:var(--fig-k); stroke-width:1.6; }
.sav4 .sav4-sep{ stroke:var(--fig-k); stroke-width:1.2; }
.sav4 .sav4-ef{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.6; }
.sav4 .sav4-esh{ fill:var(--graphite); opacity:.3; }
.sav4 .sav4-sc{ fill:color-mix(in srgb, var(--graphite) 22%, var(--paper)); }
.sav4 .sav4-so{ fill:none; stroke:var(--graphite); stroke-width:1.6; }
.sav4 .sav4-e{ fill:none; stroke:var(--fig-k); stroke-width:1.6; stroke-linejoin:round; }
.sav4 .sav4-n, .sav4 .sav4-e{ transition:opacity .4s, stroke .4s, stroke-width .4s; }
.sav4 .sav4-hot .sav4-po{ stroke-width:3.2; }
.sav4 .sav4-hot .sav4-pf, .sav4 .sav4-hot .sav4-sf{ fill:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.sav4 .sav4-hot .sav4-ef{ fill:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); stroke:var(--fig-k); stroke-width:2.8; }
.sav4 .sav4-hot .sav4-so{ stroke:var(--fig-k); stroke-width:2.8; }
.sav4 .sav4-e.sav4-hot{ stroke-width:3.2; }
.sav4 .sav4-bad .sav4-po, .sav4 .sav4-bad .sav4-so{ stroke:var(--pen); stroke-width:3.2; }
.sav4 .sav4-bad .sav4-pf, .sav4 .sav4-bad .sav4-sf{ fill:color-mix(in srgb, var(--pen) 14%, var(--paper)); }
.sav4 .sav4-bad .sav4-ef{ fill:color-mix(in srgb, var(--pen) 14%, var(--paper)); stroke:var(--pen); stroke-width:3.2; }
.sav4 .sav4-e.sav4-bad{ stroke:var(--pen); stroke-width:3.2; }
.sav4 .sav4-dim{ opacity:.32; }
.sav4 .sav4-x{ stroke:var(--pen); stroke-width:5; stroke-linecap:round; opacity:.85; }
.sav4 .sav4-mk{ fill:var(--fig-k); } .sav4 .sav4-mkb{ fill:var(--pen); }
.sav4-tabs{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.sav4-tabs .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:30px; }
.sav4-h{ text-align:center; font-size:.86rem; font-weight:700; color:var(--graphite); margin:6px 0; }
.sav4-note{ text-align:center; font-size:.86rem; color:var(--graphite); margin:8px 0 0; line-height:1.4; }
/* decomposition tree */
.sav4-tree{ display:grid; gap:4px; max-width:440px; margin:0 auto 10px; }
.sav4-tree div{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; align-items:center; }
.sav4-tree span{ border:1px solid var(--line); border-radius:6px; padding:1px 7px; font:600 .84rem var(--mono); color:var(--ink); background:var(--paper); opacity:.45; transition:opacity .4s, box-shadow .4s, background .4s; }
.sav4-tree span.on{ opacity:1; }
.sav4-tree span.cur{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.sav4-tree span.prim{ border-style:dashed; }
.sav4-tree i{ font-style:normal; font-size:.8rem; color:var(--graphite); }
/* symbols */
.sav4-sym{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.1fr) minmax(0,1fr); gap:6px 8px; align-items:center; max-width:460px; margin:0 auto; }
.sav4-sym > b{ font-size:.82rem; text-align:center; color:var(--graphite); line-height:1.25; }
.sav4-sym .sav4-cell{ border-radius:8px; padding:4px; text-align:center; transition:background .4s, opacity .4s; opacity:.5; }
.sav4-sym .sav4-cell.on{ opacity:1; background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); }
.sav4-sym .sav4-cell svg{ width:100%; max-width:96px; height:auto; display:block; margin:0 auto; }
.sav4-sym .sav4-nm{ font-size:.88rem; line-height:1.3; color:var(--ink); }
.sav4-sym .sav4-nm b{ display:block; } .sav4-sym .sav4-nm small{ display:block; font-size:.8rem; color:var(--graphite); }
/* rules gallery */
.sav4-pairs{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px 10px; max-width:460px; margin:0 auto; }
.sav4-pairs > b{ text-align:center; font-size:.84rem; }
.sav4-pairs .sav4-no{ color:var(--pen); } .sav4-pairs .sav4-yes{ color:var(--ok); }
.sav4-pairs > div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:2px; }
.sav4-pairs svg{ width:100%; height:auto; display:block; }
/* checker */
.sav4-pick{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px 8px; align-items:center; max-width:460px; margin:10px auto 0; font-size:.86rem; color:var(--ink); }
.sav4-pick > span{ font-weight:700; }
.sav4-pick > div{ display:flex; flex-wrap:wrap; gap:4px; }
.sav4-pick .fig-btn{ font-size:.82rem; padding:3px 8px; min-height:30px; }
.sav4-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:10px 0 0; }
.sav4-list{ list-style:none; margin:10px auto 0; padding:0; max-width:460px; display:grid; gap:5px; }
.sav4-list li{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:6px; align-items:start; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 8px; font-size:.86rem; line-height:1.35; color:var(--ink); }
.sav4-list li.bad{ border-color:var(--pen); }
.sav4-list li small{ display:block; font-size:.82rem; color:var(--graphite); }
.sav4-list li small.sav4-p{ color:var(--pen); font-weight:600; } .sav4-list li small.sav4-o{ color:var(--ok); font-weight:600; }
.sav4-list button{ font:inherit; font-size:.9rem; border:1px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; width:30px; height:30px; cursor:pointer; }
.sav4-probs{ max-width:460px; margin:8px auto 0; font-size:.86rem; line-height:1.4; color:var(--pen); }
.sav4-probs div{ margin:2px 0; } .sav4-ok{ color:var(--ok); font-weight:700; }
/* balance */
.sav4-cnt{ display:grid; grid-template-columns:auto minmax(0,1fr) minmax(0,1fr); gap:4px 8px; max-width:460px; margin:10px auto 0; font-size:.86rem; color:var(--ink); align-items:start; }
.sav4-cnt > b{ font-size:.82rem; color:var(--graphite); }
.sav4-cnt > div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 6px; line-height:1.35; transition:opacity .4s; }
.sav4-cnt > div i{ font-style:normal; display:block; font:700 .95rem var(--mono); color:var(--fig-k); }
.sav4-cnt > div.bad i{ color:var(--pen); }
.sav4-cnt > div.off{ opacity:.25; }
.sav4-verd{ text-align:center; font-weight:700; margin:10px 0 0; font-size:.95rem; }
.sav4-verd.no{ color:var(--pen); } .sav4-verd.yes{ color:var(--ok); }
/* cases */
.sav4-vr{ display:grid; gap:8px; max-width:460px; margin:0 auto; }
.sav4-sys{ justify-self:center; border:2px solid var(--fig-k); border-radius:12px; padding:6px 16px; text-align:center; font-weight:700; background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); color:var(--ink); line-height:1.25; }
.sav4-sys small{ display:block; font:700 .84rem var(--mono); color:var(--fig-k); }
.sav4-ent{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.86rem; line-height:1.4; color:var(--ink); }
.sav4-ent > b{ display:block; margin-bottom:2px; }
.sav4-ent span{ display:block; } .sav4-ent em{ font-style:normal; font-weight:700; color:var(--fig-k); }
.sav4-tbl{ width:100%; max-width:460px; margin:0 auto; border-collapse:collapse; font-size:.86rem; color:var(--ink); }
.sav4-tbl th, .sav4-tbl td{ border-bottom:1px solid var(--line); padding:4px 6px; text-align:left; vertical-align:top; line-height:1.35; }
.sav4-tbl th{ font-size:.82rem; color:var(--graphite); }
.sav4-tbl td.sav4-pr{ font-weight:700; color:var(--fig-k); }
.sav4-tbl td.sav4-mi{ color:var(--graphite); }
/* error hunt */
.sav4-chips{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:0 0 8px; }
.sav4-chips .fig-btn{ font:600 .82rem var(--mono); padding:2px 0; min-width:32px; min-height:30px; }
.sav4-chips .fig-btn.sav4-on{ border-color:var(--pen); box-shadow:0 0 0 1px var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.sav4-lv{ border-top:1px dashed var(--line); padding-top:4px; margin-top:6px; }
.sav4-lv:first-of-type{ border-top:0; margin-top:0; }
@media (prefers-reduced-motion: reduce){ .sav4 .sav4-n, .sav4 .sav4-e, .sav4-tree span, .sav4-sym .sav4-cell{ transition:none; } }
`;
  if (!document.getElementById('sav4-css')) { const s = document.createElement('style'); s.id = 'sav4-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── DFD drawing kit (Gane and Sarson symbols, like the slides) ── */
  const LH = 14.5;
  const hOf = n => n.h || (n.k === 'p' ? 24 + n.t.length * LH : n.k === 'e' ? 12 + n.t.length * LH : 24);
  const prep = g => { const M = {}; g.N.forEach(n => { M[n.id] = Object.assign({}, n, { h: hOf(n) }); }); return M; };
  const idOf = s => typeof s === 'string' ? s.split('.')[0] : null;
  function anc(M, s) {
    if (Array.isArray(s)) return s;
    const m = /^(\w+)\.([lrtb])([+-][\d.]+)?$/.exec(s), n = M[m[1]], o = +(m[3] || 0);
    return m[2] === 'l' ? [n.x, n.y + n.h / 2 + o] : m[2] === 'r' ? [n.x + n.w, n.y + n.h / 2 + o] : m[2] === 't' ? [n.x + n.w / 2 + o, n.y] : [n.x + n.w / 2 + o, n.y + n.h];
  }
  const from = e => e.a || idOf(e.f), to = e => e.b || idOf(e.t);
  const lab = e => [].concat(e.l || []).join(' ');
  function Marks() {
    return html`<defs>
      <marker id="sav4-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,1 L10,5 L0,9 z" className="sav4-mk" /></marker>
      <marker id="sav4-ab" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0,1 L10,5 L0,9 z" className="sav4-mkb" /></marker>
    </defs>`;
  }
  function NodeG({ n, c }) {
    const cx = n.x + n.w / 2;
    if (n.k === 'p') {
      const r = 8, b = 18;
      return html`<g className=${'sav4-n ' + c}>
        <rect x=${n.x} y=${n.y} width=${n.w} height=${n.h} rx=${r} className="sav4-pf" />
        <path d=${`M${n.x} ${n.y + b} V${n.y + r} Q${n.x} ${n.y} ${n.x + r} ${n.y} H${n.x + n.w - r} Q${n.x + n.w} ${n.y} ${n.x + n.w} ${n.y + r} V${n.y + b} Z`} className="sav4-band" />
        <line x1=${n.x} x2=${n.x + n.w} y1=${n.y + b} y2=${n.y + b} className="sav4-sep" />
        <rect x=${n.x} y=${n.y} width=${n.w} height=${n.h} rx=${r} className="sav4-po" />
        ${n.n && html`<text x=${cx} y=${n.y + 13.5} textAnchor="middle" className="sav4-num">${n.n}</text>`}
        ${n.t.map((s, k) => html`<text key=${k} x=${cx} y=${n.y + b + 14 + k * LH} textAnchor="middle">${s}</text>`)}
      </g>`;
    }
    if (n.k === 'e') {
      const y0 = n.y + n.h / 2 - (n.t.length - 1) * LH / 2 + 4.5;
      return html`<g className=${'sav4-n ' + c}>
        <rect x=${n.x + 3} y=${n.y + 3} width=${n.w} height=${n.h} className="sav4-esh" />
        <rect x=${n.x} y=${n.y} width=${n.w} height=${n.h} className="sav4-ef" />
        ${n.t.map((s, k) => html`<text key=${k} x=${cx} y=${y0 + k * LH} textAnchor="middle">${s}</text>`)}
      </g>`;
    }
    const cw = n.cw || 24;
    return html`<g className=${'sav4-n ' + c}>
      <rect x=${n.x} y=${n.y} width=${n.w} height=${n.h} className="sav4-sf" />
      <rect x=${n.x} y=${n.y} width=${cw} height=${n.h} className="sav4-sc" />
      <path d=${`M${n.x + n.w} ${n.y} H${n.x} V${n.y + n.h} H${n.x + n.w} M${n.x + cw} ${n.y} V${n.y + n.h}`} className="sav4-so" />
      <text x=${n.x + cw / 2} y=${n.y + 16.5} textAnchor="middle" className="sav4-num">${n.n}</text>
      ${n.t && html`<text x=${n.x + cw + 6} y=${n.y + 16.5}>${n.t}</text>`}
    </g>`;
  }
  // g = { w, h, N, E }; hot / bad: ids of nodes and edges; dim: fade the rest; st: reveal step for items with `at`
  function Dfd({ g, hot = [], bad = [], dim = false, st = 99, label, max }) {
    const M = prep(g), any = hot.length + bad.length > 0;
    const c = id => bad.includes(id) ? 'sav4-bad' : hot.includes(id) ? 'sav4-hot' : dim && any ? 'sav4-dim' : '';
    const vis = x => pop(st >= (x.at || 0));
    return html`<svg viewBox=${`0 0 ${g.w} ${g.h}`} className="sav4-svg" style=${max ? { maxWidth: max } : null} role="img" aria-label=${label}>
      <${Marks} />
      ${g.E.map(e => { const P = [anc(M, e.f), ...(e.v || []), anc(M, e.t)], b = bad.includes(e.id);
        return html`<g key=${e.id} className=${vis(e)}><path d=${'M' + P.map(p => p.join(' ')).join(' L')} className=${'sav4-e ' + c(e.id)} markerEnd=${b ? 'url(#sav4-ab)' : 'url(#sav4-a)'} markerStart=${e.two ? (b ? 'url(#sav4-ab)' : 'url(#sav4-a)') : null} /></g>`; })}
      ${Object.values(M).map(n => html`<g key=${n.id} className=${vis(n)}><${NodeG} n=${n} c=${c(n.id)} /></g>`)}
      ${g.E.filter(e => e.l).map(e => { const L = [].concat(e.l), k = c(e.id);
        return html`<g key=${'l' + e.id} className=${vis(e) + (k === 'sav4-dim' ? ' sav4-dim' : '')} transform=${e.rot ? `rotate(${e.rot} ${e.lx} ${e.ly})` : null}>${L.map((s, j) => html`<text key=${j} x=${e.lx} y=${e.ly + j * 14} textAnchor=${e.la || 'middle'} className=${'sav4-fl' + (k === 'sav4-bad' ? ' sav4-bt' : k === 'sav4-hot' ? ' sav4-kt' : '')}>${s}</text>`)}</g>`; })}
    </svg>`;
  }
  const Tabs = ({ items, cur, set }) => html`<div className="sav4-tabs">${items.map((t, j) => html`<button key=${j} className=${'fig-btn' + (cur === j ? ' sav4-on' : '')} onClick=${() => set(j)}>${t}</button>`)}</div>`;

  /* ── Hoosier Burger food ordering system (slides 17 to 21, Figures 7-4, 7-5, 7-8, 7-9) ── */
  const HB_CTX = { w: 280, h: 226, N: [
    { id: 'cu', k: 'e', x: 4, y: 4, w: 92, t: ['CUSTOMER'] }, { id: 'ki', k: 'e', x: 184, y: 4, w: 92, t: ['KITCHEN'] },
    { id: 'p0', k: 'p', x: 104, y: 78, w: 72, n: '0', t: ['Food', 'Ordering', 'System'] },
    { id: 'rm', k: 'e', x: 84, y: 180, w: 112, t: ['RESTAURANT', 'MANAGER'] }], E: [
    { id: 'co', f: 'cu.b+12', v: [[62, 96]], t: 'p0.l-15.75', l: ['Customer', 'Order'], lx: 66, ly: 50, la: 'start' },
    { id: 'rc', f: 'p0.l+12.25', v: [[30, 124]], t: 'cu.b-20', l: 'Receipt', lx: 67, ly: 119 },
    { id: 'fo', f: 'p0.r-11.75', v: [[240, 100]], t: 'ki.b+10', l: ['Food', 'Order'], lx: 208, ly: 80 },
    { id: 'mr', f: 'p0.b', t: 'rm.t', l: ['Management', 'Reports'], lx: 146, ly: 158, la: 'start' }] };
  const HB_L0 = { w: 280, h: 486, N: [
    { id: 'cu', k: 'e', x: 4, y: 4, w: 88, t: ['CUSTOMER'] }, { id: 'ki', k: 'e', x: 188, y: 4, w: 88, t: ['KITCHEN'] },
    { id: 'p1', k: 'p', x: 98, y: 60, w: 84, n: '1.0', t: ['Receive and', 'Transform', 'Customer', 'Food Order'] },
    { id: 'p2', k: 'p', x: 4, y: 180, w: 76, n: '2.0', t: ['Update', 'Goods Sold', 'File'] },
    { id: 'p3', k: 'p', x: 200, y: 180, w: 76, n: '3.0', t: ['Update', 'Inventory', 'File'] },
    { id: 'd2', k: 's', x: 4, y: 290, w: 120, n: 'D2', t: 'Goods Sold File' },
    { id: 'd1', k: 's', x: 164, y: 290, w: 112, n: 'D1', t: 'Inventory File' },
    { id: 'p4', k: 'p', x: 98, y: 350, w: 84, n: '4.0', t: ['Produce', 'Management', 'Reports'] },
    { id: 'rm', k: 'e', x: 170, y: 440, w: 106, t: ['RESTAURANT', 'MANAGER'] }], E: [
    { id: 'co', f: 'cu.b+16', v: [[64, 80]], t: 'p1.l-21', l: ['Customer', 'Order'], lx: 68, ly: 42, la: 'start' },
    { id: 'rc', f: 'p1.l+19', v: [[20, 120]], t: 'cu.b-28', l: 'Receipt', lx: 59, ly: 115 },
    { id: 'fo', f: 'p1.r-21', v: [[244, 80]], t: 'ki.b+12', l: ['Food', 'Order'], lx: 213, ly: 60 },
    { id: 'gs', f: 'p1.b-14', v: [[126, 204]], t: 'p2.r-9.75', l: ['Goods', 'Sold'], lx: 122, ly: 166, la: 'end' },
    { id: 'id', f: 'p1.b+14', v: [[154, 204]], t: 'p3.l-9.75', l: ['Inventory', 'Data'], lx: 158, ly: 166, la: 'start' },
    { id: 'fg', f: 'p2.b', t: 'd2.t-22', l: ['Formatted Goods', 'Sold Data'], lx: 48, ly: 262, la: 'start' },
    { id: 'fi', f: 'p3.b', t: 'd1.t+18', l: ['Formatted', 'Inventory Data'], lx: 232, ly: 262, la: 'end' },
    { id: 'dg', f: 'd2.b-34', v: [[30, 372]], t: 'p4.l-11.75', l: ['Daily Goods', 'Sold Amounts'], lx: 34, ly: 332, la: 'start' },
    { id: 'dd', f: 'd1.b+30', v: [[250, 372]], t: 'p4.r-11.75', l: ['Daily Inventory', 'Depletion', 'Amounts'], lx: 246, ly: 330, la: 'end' },
    { id: 'mr', f: 'p4.b', v: [[140, 460.5]], t: 'rm.l', l: ['Management', 'Reports'], lx: 136, ly: 440, la: 'end' }] };
  const HB_L40 = { w: 280, h: 386, N: [
    { id: 'q1', k: 'p', x: 98, y: 56, w: 84, n: '4.1', t: ['Access', 'Goods Sold', 'and Inventory', 'Data'] },
    { id: 'q2', k: 'p', x: 98, y: 186, w: 84, n: '4.2', t: ['Aggregate', 'Goods Sold', 'and Inventory', 'Data'] },
    { id: 'q3', k: 'p', x: 98, y: 312, w: 84, n: '4.3', t: ['Prepare', 'Management', 'Reports'] }], E: [
    { id: 'dd', f: [140, 6], t: 'q1.t', l: ['Daily Inventory', 'Depletion Amounts'], lx: 146, ly: 20, la: 'start' },
    { id: 'dg', f: [4, 97], t: 'q1.l', l: ['Daily Goods', 'Sold Amounts'], lx: 6, ly: 74, la: 'start' },
    { id: 'idt', f: 'q1.b-20', t: 'q2.t-20', l: ['Inventory', 'Data'], lx: 116, ly: 158, la: 'end' },
    { id: 'gsd', f: 'q1.b+20', t: 'q2.t+20', l: ['Goods Sold', 'Data'], lx: 164, ly: 158, la: 'start' },
    { id: 'ag', f: 'q2.b', t: 'q3.t', l: 'Aggregated Data', lx: 146, ly: 294, la: 'start' },
    { id: 'mr', f: 'q3.r', t: [276, 345.75], l: ['Management', 'Reports'], lx: 229, ly: 326 }] };
  const HB_L43 = { w: 280, h: 266, N: [
    { id: 'r1', k: 'p', x: 98, y: 40, w: 84, n: '4.3.1', t: ['Format', 'Management', 'Reports'] },
    { id: 'r2', k: 'p', x: 98, y: 150, w: 84, n: '4.3.2', t: ['Print', 'Management', 'Reports'] }], E: [
    { id: 'ad', f: [140, 4], t: 'r1.t', l: 'Aggregated Data', lx: 146, ly: 26, la: 'start' },
    { id: 'fd', f: 'r1.b', t: 'r2.t', l: 'Formatted Data', lx: 146, ly: 132, la: 'start' },
    { id: 'mr', f: 'r2.b', t: [140, 262], l: 'Management Reports', lx: 146, ly: 245, la: 'start' }] };
  // Figure 7-7: Level-1 diagram of process 1.0
  const kids = [['k2', 104, '1.2', ['Generate', 'Customer Receipt'], 'Receipt'], ['k3', 182, '1.3', ['Transform Order', 'to Kitchen', 'Format'], 'Food Order'], ['k4', 274, '1.4', ['Generate Goods', 'Sold Increments'], ['Goods Sold', 'Data']], ['k5', 352, '1.5', ['Generate', 'Inventory', 'Decrements'], ['Inventory', 'Data']]];
  const HB_L10 = { w: 280, h: 426, N: [{ id: 'k1', k: 'p', x: 96, y: 26, w: 100, n: '1.1', t: ['Receive', 'Customer Order'] }].concat(kids.map(([id, y, n, t]) => ({ id, k: 'p', x: 92, y, w: 112, n, t }))),
    E: [{ id: 'in', f: [146, 4], t: 'k1.t', l: 'Customer Order', lx: 152, ly: 16, la: 'start' }].concat(...kids.map(([id, y, n, t, o]) => { const m = y + (24 + t.length * LH) / 2, two = Array.isArray(o);
      return [{ id: 'c' + id, f: 'k1.l', v: [[70, 52.5], [70, m]], t: id + '.l', l: ['Customer', 'Order'], lx: 66, ly: m - 10, la: 'end' },
        { id: 'o' + id, f: id + '.r', t: [276, m], l: o, lx: 240, ly: two ? m - 20 : m - 6 }]; })) };

  /* ── Employee payroll system (slides 33 to 36) ── */
  const PR_CTX = { w: 280, h: 228, N: [
    { id: 'em', k: 'e', x: 4, y: 30, w: 100, t: ['Employee'] },
    { id: 's0', k: 'p', x: 150, y: 64, w: 100, n: '0', t: ['Employee', 'Payroll', 'System'] },
    { id: 'ac', k: 'e', x: 150, y: 182, w: 100, t: ['Accounting', 'Department'] }], E: [
    { id: 'tf', f: 's0.t', v: [[200, 43.25]], t: 'em.r', l: ['Employee', 'Tax Form'], lx: 152, ly: 15 },
    { id: 'ts', f: 'em.b+16', v: [[70, 86]], t: 's0.l-11.75', l: 'Time Sheet', lx: 110, ly: 80 },
    { id: 'pc', f: 's0.l+18.25', v: [[24, 116]], t: 'em.b-30', l: ['Employee', 'Payroll Check'], lx: 87, ly: 132 },
    { id: 'pr', f: 's0.b', t: 'ac.t', l: ['Payroll', 'Report'], lx: 206, ly: 152, la: 'start' }] };
  const prTop = [
    { id: 'em', k: 'e', x: 4, y: 17.25, w: 92, t: ['Employee'] },
    { id: 'p1', k: 'p', x: 176, y: 4, w: 100, n: '1.0', t: ['Create Weekly', 'Payroll Record'] },
    { id: 's1', k: 's', x: 130, y: 88, w: 146, n: 'S1', t: 'Employee Data File' }];
  const prTopE = [
    { id: 'ts', f: 'em.r', t: 'p1.l', l: 'Time Sheet', lx: 136, ly: 24 },
    { id: 'hw', f: 'p1.b', t: 's1.t+23', l: 'Hours Worked', lx: 222, ly: 77, la: 'end' }];
  const PR_L0 = { w: 280, h: 426, N: prTop.concat([
    { id: 'p2', k: 'p', x: 176, y: 146, w: 100, n: '2.0', t: ['Compute Weekly', 'Paycheck'] },
    { id: 's2', k: 's', x: 136, y: 232, w: 140, n: 'S2', t: 'Payroll Data File' },
    { id: 'p3', k: 'p', x: 176, y: 296, w: 100, n: '3.0', t: ['Prepare Weekly', 'Payroll Summary'] },
    { id: 'p4', k: 'p', x: 4, y: 296, w: 112, n: '4.0', t: ['Prepare Employee', 'Tax Form'] },
    { id: 'ac', k: 'e', x: 176, y: 380, w: 100, t: ['Accounting', 'Department'] }]), E: prTopE.concat([
    { id: 'er', f: 's1.b+23', t: 'p2.t', l: 'Employee Record', lx: 222, ly: 133, la: 'end' },
    { id: 'pd', f: 'p2.b', t: 's2.t+20', l: 'Paycheck Data', lx: 222, ly: 219, la: 'end' },
    { id: 'ep', f: 'p2.l', v: [[50, 172.5]], t: 'em.b+4', l: 'Employee Paycheck', lx: 113, ly: 166 },
    { id: 'prc', f: 's2.b+20', t: 'p3.t', l: 'Payroll Record', lx: 222, ly: 280, la: 'end' },
    { id: 'epr', f: 's2.l', v: [[40, 244]], t: 'p4.t-20', l: ['Employee Payroll', 'Record'], lx: 100, ly: 266 },
    { id: 'etf', f: 'p4.t-44', t: 'em.b-34', l: ['Employee', 'Tax Form'], lx: 22, ly: 200, la: 'start' },
    { id: 'rp', f: 'p3.b', t: 'ac.t', l: 'Payroll Report', lx: 222, ly: 368, la: 'end' }]) };
  const PR_L1 = { w: 280, h: 686, N: prTop.concat([
    { id: 'a1', k: 'p', x: 176, y: 146, w: 100, n: '2.1', t: ['Compute', 'Gross Pay'] },
    { id: 'a2', k: 'p', x: 176, y: 228, w: 100, n: '2.2', t: ['Compute', 'Net Pay'] },
    { id: 'a3', k: 'p', x: 176, y: 310, w: 100, n: '2.3', t: ['Create', 'Payroll Check'] },
    { id: 's2', k: 's', x: 136, y: 392, w: 140, n: 'S2', t: 'Payroll Data File' },
    { id: 'b1', k: 'p', x: 176, y: 450, w: 100, n: '3.1', t: ['Sort Payroll', 'Records by', 'Employee'] },
    { id: 'b2', k: 'p', x: 176, y: 552, w: 100, n: '3.2', t: ['Print Weekly', 'Payroll Summary'] },
    { id: 'ac', k: 'e', x: 176, y: 640, w: 100, t: ['Accounting', 'Department'] },
    { id: 'c1', k: 'p', x: 20, y: 450, w: 100, n: '4.1', t: ['Calculate', 'Payroll', 'Deductions'] },
    { id: 'c2', k: 'p', x: 20, y: 552, w: 100, n: '4.2', t: ['Print Employee', 'Tax Form'] }]), E: prTopE.concat([
    { id: 'er', f: 's1.b+23', t: 'a1.t', l: 'Employee Record', lx: 222, ly: 133, la: 'end' },
    { id: 'gp', f: 'a1.b', t: 'a2.t', l: 'Gross Pay Data', lx: 222, ly: 218, la: 'end' },
    { id: 'np', f: 'a2.b', t: 'a3.t', l: 'Net Pay Data', lx: 222, ly: 300, la: 'end' },
    { id: 'x23', f: 'a3.b', t: 's2.t+20' },
    { id: 'ep', f: 'a3.l', v: [[50, 336.5]], t: 'em.b+4', l: 'Employee Paycheck', lx: 113, ly: 330 },
    { id: 'prc', f: 's2.b+20', t: 'b1.t', l: ['Payroll', 'Record'], lx: 222, ly: 428, la: 'end' },
    { id: 'sr', f: 'b1.b', t: 'b2.t', l: ['Sorted', 'Records'], lx: 222, ly: 530, la: 'end' },
    { id: 'rp', f: 'b2.b', t: 'ac.t', l: 'Payroll Report', lx: 222, ly: 627, la: 'end' },
    { id: 'epr', f: 's2.l', v: [[46, 404]], t: 'c1.t-24', l: ['Employee Payroll', 'Record'], lx: 100, ly: 428 },
    { id: 'pdd', f: 'c1.b', t: 'c2.t', l: ['Payroll', 'Deductions'], lx: 76, ly: 532, la: 'start' },
    { id: 'etf', f: 'c2.l', v: [[8, 578.5]], t: 'em.b-42', l: ['Employee', 'Tax Form'], lx: 14, ly: 360, la: 'start' }]) };
  const z = [['z1', '4.1.1', ['Calculate Payroll', 'Tax Deductions']], ['z2', '4.1.2', ['Calculate', 'Non-tax Deductions']], ['z3', '4.1.3', ['Calculate', 'Retirement Allowance']], ['z4', '4.2.1', ['Calculate Employee', 'Vacation Pay']], ['z5', '4.2.2', ['Print Employee', 'Tax Form']]];
  const PR_L2 = { w: 280, h: 494, N: z.map(([id, n, t], k) => ({ id, k: 'p', x: 70, y: 40 + k * 90, w: 140, n, t })),
    E: [{ id: 'in', f: [140, 4], t: 'z1.t', l: ['Employee Payroll', 'Record'], lx: 146, ly: 14, la: 'start' }]
      .concat(z.slice(1).map(([id], k) => ({ id: 'e' + id, f: z[k][0] + '.b', t: id + '.t', l: 'Employee Data', lx: 146, ly: 40 + k * 90 + 53 + 23, la: 'start' })))
      .concat([{ id: 'out', f: 'z5.b', t: [140, 490], l: 'Employee Tax Form', lx: 146, ly: 478, la: 'start' }]) };

  /* ── L4 slide 3 (Figure 7-1): the SDLC with the analysis phase highlighted ── */
  function Sdlc({ ar }) {
    const steps = [
      { en: 'The <b>systems development life cycle</b>: Planning, Analysis, Design, Implementation, Maintenance, and back to Planning.', ar: 'ده الـ <b>systems development life cycle</b>: الـ Planning وبعده الـ Analysis والـ Design والـ Implementation والـ Maintenance، وبعدين نرجع للـ Planning.' },
      { en: 'This chapter sits in the <b>Analysis</b> phase, which has two parts: <b>requirements determination</b> (collecting the information) and then <b>requirements structuring</b>.', ar: 'الـ chapter ده جوه مرحلة الـ <b>Analysis</b>، واللي ليها جزئين: الـ <b>requirements determination</b> (جمع المعلومات) وبعدها الـ <b>requirements structuring</b>.' },
      { en: '✓ <b>Requirements structuring</b>: data flow diagrams are used to represent the information gathered during requirements determination.', ar: '✓ الـ <b>Requirements structuring</b>: الـ data flow diagrams بتُستخدم عشان تمثّل المعلومات اللي اتجمعت في الـ requirements determination.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const B = [['pl', 100, 6, 80, 'Planning'], ['an', 190, 76, 86, 'Analysis'], ['de', 172, 160, 80, 'Design'], ['im', 18, 160, 110, 'Implementation'], ['ma', 4, 76, 96, 'Maintenance']];
    const A = [[180, 30, 222, 76], [228, 106, 216, 160], [172, 175, 128, 175], [64, 160, 54, 106], [60, 76, 100, 28]];
    return html`<figure className="fig sav4"><div className="fig-stage">
      <svg viewBox="0 0 280 196" className="sav4-svg" role="img" aria-label="SDLC cycle with the analysis phase highlighted"><${Marks} />
        ${A.map(([a, b, c, d], k) => html`<path key=${k} d=${`M${a} ${b} L${c} ${d}`} className="sav4-e" markerEnd="url(#sav4-a)" />`)}
        ${B.map(([id, x, y, w, t]) => html`<g key=${id} className=${'sav4-n' + (id === 'an' && i >= 1 ? ' sav4-hot' : '')}><rect x=${x} y=${y} width=${w} height="30" className="sav4-ef" /><text x=${x + w / 2} y=${y + 19.5} textAnchor="middle" className=${id === 'an' && i >= 1 ? 'sav4-kt' : ''}>${t}</text></g>`)}
      </svg>
      <div className=${'sav4-vr ' + pop(i >= 1)} style=${{ maxWidth: 300, marginTop: 8 }}><div className="sav4-ent" style=${{ textAlign: 'center' }}>
        <span>Requirements Determination</span><span style=${{ fontWeight: i >= 2 ? 700 : 400, color: i >= 2 ? 'var(--fig-k)' : 'inherit' }}>${i >= 2 ? '✓ ' : ''}Requirements Structuring</span></div></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 8 (Figure 7-2): DeMarco and Yourdon vs Gane and Sarson symbols ── */
  function Symbols({ ar }) {
    const steps = [
      { en: 'Figure 7-2 compares the two DFD symbol sets: <b>DeMarco and Yourdon</b> (left) and <b>Gane and Sarson</b> (right, used in the slides). Press Next for each symbol.', ar: 'الـ <bdi dir="ltr">Figure&nbsp;7-2</bdi> بتقارن بين مجموعتين symbols للـ DFD: الـ <b>DeMarco and Yourdon</b> (شمال) والـ <b>Gane and Sarson</b> (يمين، ودي اللي في الـ slides). دوس Next لكل symbol.' },
      { en: '<b>Process</b>: work or actions performed on data (inside the system) so they are transformed, stored or distributed. A circle, or a rounded rectangle. Label: a <b>verb phrase</b> (verb-adjective-noun); the whole system is numbered 0.', ar: 'الـ <b>Process</b>: شغل أو actions بتتعمل على الداتا (جوه السيستم) عشان تتحول أو تتخزن أو تتوزع. شكله دايرة، أو rounded rectangle. الـ label بتاعه <b>verb phrase</b> (يعني verb-adjective-noun)، والـ process بتاع السيستم كله رقمه 0.' },
      { en: '<b>Data store</b>: data at rest (inside the system): a file, database, transaction file or set of tables. An open-ended rectangle, numbered D1, D2... Label: a <b>noun phrase</b>.', ar: 'الـ <b>Data store</b>: داتا ساكنة (جوه السيستم)، زي file أو database أو transaction file أو مجموعة tables. شكله open-ended rectangle وبيترقم <bdi dir="ltr">D1, D2...</bdi> والـ label بتاعه <b>noun phrase</b>.' },
      { en: '<b>Source/sink</b> (external entity): origin and/or destination of data, <b>outside</b> the system: a person, organization, department or another system. A square (rectangle). Label: a <b>noun phrase</b>.', ar: 'الـ <b><bdi dir="ltr">Source/sink</bdi></b> (الـ external entity): مصدر الداتا أو وجهتها أو الاتنين، وبيبقى <b>برّه</b> السيستم، زي شخص أو organization أو department أو سيستم تاني. شكله مربع (rectangle)، والـ label بتاعه <b>noun phrase</b>.' },
      { en: '<b>Data flow</b>: data in motion, moving as a unit from one place to another. An arrow; the arrowhead gives the direction. Label: a <b>noun phrase</b>.', ar: 'الـ <b>Data flow</b>: داتا بتتحرك كـ وحدة واحدة من مكان لمكان. شكله سهم، وراس السهم بتحدد الاتجاه، والـ label بتاعه <b>noun phrase</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const box = s => html`<svg viewBox="0 0 96 56" role="img" aria-label=${s}><${Marks} />${s === 'dmP' ? html`<g className="sav4-n"><ellipse cx="48" cy="28" rx="34" ry="24" className="sav4-pf" /><ellipse cx="48" cy="28" rx="34" ry="24" className="sav4-po" /></g>`
      : s === 'gsP' ? html`<${NodeG} n=${{ k: 'p', x: 24, y: 3, w: 48, h: 50, n: '', t: [] }} c="" />`
      : s === 'dmS' ? html`<g className="sav4-n"><rect x="8" y="17" width="80" height="22" className="sav4-sf" /><path d="M88 17 H8 V39 H88" className="sav4-so" /></g>`
      : s === 'gsS' ? html`<${NodeG} n=${{ k: 's', x: 8, y: 16, w: 80, h: 24, n: '', t: '', cw: 14 }} c="" />`
      : s === 'E' ? html`<${NodeG} n=${{ k: 'e', x: 18, y: 8, w: 58, h: 38, t: [] }} c="" />`
      : html`<path d="M78 28 H16" className="sav4-e" markerEnd="url(#sav4-a)" />`}</svg>`;
    const R = [['dmP', 'Process', 'gsP'], ['dmS', 'Data store', 'gsS'], ['E', 'Source/sink', 'E'], ['F', 'Data flow', 'F']];
    const sub = ['inside the system', 'inside the system', 'outside the system', 'data in motion'];
    return html`<figure className="fig sav4"><div className="fig-stage"><div className="sav4-sym">
      <b>DeMarco and Yourdon</b><b></b><b>Gane and Sarson</b>
      ${R.map(([a, n, b], k) => { const on = i === 0 || i === k + 1 ? ' on' : '';
        return html`<div key=${'a' + k} className=${'sav4-cell' + on} onClick=${() => ctl.go(k + 1)}>${box(a)}</div>
          <div key=${'n' + k} className=${'sav4-cell sav4-nm' + on} onClick=${() => ctl.go(k + 1)}><b>${n}</b><small>${sub[k]}</small></div>
          <div key=${'b' + k} className=${'sav4-cell' + on} onClick=${() => ctl.go(k + 1)}>${box(b)}</div>`; })}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 9 to 13: diagramming rules, wrong vs right ── */
  const mP = (x, y, w = 30, h = 40) => html`<${NodeG} n=${{ k: 'p', x, y, w, h, n: '', t: [] }} c="" />`;
  const mS = (x, y, w = 40) => html`<${NodeG} n=${{ k: 's', x, y, w, h: 18, n: '', t: '', cw: 9 }} c="" />`;
  const mE = (x, y, w = 30, h = 26) => html`<${NodeG} n=${{ k: 'e', x, y, w, h, t: [] }} c="" />`;
  const mA = (d, two) => html`<path d=${d} className="sav4-e" markerEnd="url(#sav4-a)" markerStart=${two ? 'url(#sav4-a)' : null} />`;
  const mT = (x, y, s) => html`<text x=${x} y=${y} textAnchor="middle" style=${{ fontSize: '13px', fontWeight: 700 }}>${s}</text>`;
  const Mini = ({ bad, children }) => html`<svg viewBox="0 0 130 80" role="img" aria-label=${bad ? 'not allowed' : 'allowed'}><${Marks} />${children}${bad && html`<g><path d="M14 8 L116 72" className="sav4-x" /><path d="M116 8 L14 72" className="sav4-x" /></g>`}</svg>`;
  const chain = (a, b) => html`${a}${mA('M44 40 H52')}${mP(54, 20)}${mA('M84 40 H92')}${b}`;
  const RULES = [
    { t: 'Process', rows: [
      [html`${mP(50, 20)}${mA('M80 30 L108 16')}${mA('M80 50 L108 64')}`, html`${mA('M14 40 H48')}${mP(50, 20)}${mA('M80 30 L108 16')}${mA('M80 50 L108 64')}`],
      [html`${mA('M16 16 L48 30')}${mA('M16 64 L48 50')}${mP(50, 20)}`, html`${mA('M16 16 L48 30')}${mA('M16 64 L48 50')}${mP(50, 20)}${mA('M80 40 H114')}`]],
      en: '<b>Process</b>: no process can have <b>only outputs</b> (a "miracle", top) or <b>only inputs</b> (a "black hole", bottom). Every process must have both inputs and outputs. Process labels are <b>verb phrases</b>.',
      ar: 'الـ <b>Process</b>: مفيش process ينفع يبقى ليه <b>outputs بس</b> (اسمها "miracle"، فوق) أو <b>inputs بس</b> (اسمها "black hole"، تحت). كل process لازم يبقى ليه inputs و outputs الاتنين، والـ process labels بتبقى <b>verb phrases</b>.' },
    { t: 'Data store', rows: [
      [html`${mS(8, 14)}${mA('M30 32 L58 50')}${mS(60, 50)}`, chain(mS(4, 31), mS(94, 31, 34))],
      [html`${mE(8, 27)}${mA('M38 40 H64')}${mS(66, 31)}`, chain(mE(10, 27), mS(94, 31, 34))],
      [html`${mS(8, 31)}${mA('M48 40 H80')}${mE(82, 27)}`, chain(mS(4, 31), mE(94, 27))]],
      en: '<b>Data store</b>: all flows to or from a data store must move <b>through a process</b>. Data cannot move directly from one store to another, from an external entity to a store, or from a store to an entity. Data store labels are <b>noun phrases</b>.',
      ar: 'الـ <b>Data store</b>: كل الـ flows الداخلة أو الخارجة من الـ data store لازم <b>تعدّي على process</b>. الداتا ماينفعش تتنقل مباشرة من store لـ store، ولا من external entity لـ store، ولا من store لـ entity. والـ data store labels بتبقى <b>noun phrases</b>.' },
    { t: 'Source/sink', rows: [
      [html`${mE(14, 27)}${mA('M44 40 H82')}${mE(84, 27)}`, chain(mE(10, 27), mE(94, 27))]],
      en: '<b>Source/sink</b>: no data moves directly between external entities without going through a process. Such interactions are <b>outside the system</b> and are not represented in the DFD. Source and sink labels are <b>noun phrases</b>.',
      ar: 'الـ <b><bdi dir="ltr">Source/sink</bdi></b>: مفيش داتا بتتنقل مباشرة بين external entities من غير ما تعدّي على process. التعاملات دي <b>برّه السيستم</b> ومابتترسمش في الـ DFD، والـ labels بتوع الـ <bdi dir="ltr">source/sink</bdi> بتبقى <b>noun phrases</b>.' },
    { t: 'Two-way flow', rows: [
      [html`${mP(14, 20, 34)}${mA('M52 40 H76', true)}${mS(80, 31, 44)}`, html`${mP(14, 20, 34)}${mA('M52 34 H76')}${mA('M76 46 H52')}${mS(80, 31, 44)}`]],
      en: 'A <b>bidirectional</b> flow between a process and a data store is drawn as <b>two separate arrows</b>, not one double-headed arrow.',
      ar: 'الـ flow اللي في <b>الاتجاهين</b> بين process و data store بيترسم <b>سهمين منفصلين</b>، مش سهم واحد براسين.' },
    { t: 'Fork', rows: [
      [html`${mP(10, 20)}${mA('M42 36 L84 18')}${mA('M42 44 L84 62')}${mP(88, 2, 30, 32)}${mP(88, 46, 30, 32)}${mT(62, 18, 'A')}${mT(62, 72, 'B')}`,
        html`${mP(10, 20)}${mA('M42 36 L84 18')}${mA('M42 44 L84 62')}${mP(88, 2, 30, 32)}${mP(88, 46, 30, 32)}${mT(62, 18, 'A')}${mT(62, 72, 'A')}`]],
      en: 'A <b>forked</b> data flow (one common location to multiple destinations) must refer to the <b>exact same data item</b>: A and A, not A and B.',
      ar: 'الـ data flow الـ <b>forked</b> (من مكان واحد لكذا destination) لازم يشير لـ <b>نفس الـ data item بالظبط</b>، يعني A و A مش A و B.' },
    { t: 'Join', rows: [
      [html`${mP(10, 2, 30, 32)}${mP(10, 46, 30, 32)}${mA('M42 18 L84 36')}${mA('M42 62 L84 44')}${mP(88, 20)}${mT(66, 18, 'A')}${mT(66, 72, 'B')}`,
        html`${mP(10, 2, 30, 32)}${mP(10, 46, 30, 32)}${mA('M42 18 L84 36')}${mA('M42 62 L84 44')}${mP(88, 20)}${mT(66, 18, 'A')}${mT(66, 72, 'A')}`]],
      en: 'A <b>joined</b> data flow (multiple sources to one common location) must also refer to the <b>exact same data item</b>.',
      ar: 'الـ data flow الـ <b>joined</b> (من كذا مصدر لمكان واحد) لازم هو كمان يشير لـ <b>نفس الـ data item بالظبط</b>.' },
    { t: 'Self loop', rows: [
      [html`${mP(34, 20, 40, 40)}${mA('M74 40 H96 V72 H54 V62')}${mT(104, 56, 'A')}`,
        html`${mP(4, 4, 30, 32)}${mP(96, 4, 30, 32)}${mP(50, 44, 30, 32)}${mA('M36 20 H94')}${mA('M98 40 L82 54')}${mA('M48 58 L30 40')}${mA('M126 30 L126 60')}${mA('M80 70 L110 76')}${mT(65, 14, 'A')}${mT(100, 58, 'A')}${mT(28, 60, 'A')}${mT(120, 72, 'B')}`]],
      en: 'A data flow cannot go directly from a process <b>back to itself</b>; it must go through <b>intervening processes</b>. Data flow labels are <b>noun phrases</b>.',
      ar: 'الـ data flow ماينفعش يطلع من process و<b>يرجع لنفسه</b> مباشرة، لازم يعدّي على <b>processes في النص</b>. والـ data flow labels بتبقى <b>noun phrases</b>.' }
  ];
  function Rules({ ar }) {
    const [i, ctl] = useSteps(RULES.length, 4200), r = RULES[i];
    return html`<figure className="fig sav4"><div className="fig-stage">
      <${Tabs} items=${RULES.map(x => x.t)} cur=${i} set=${ctl.go} />
      <div className="sav4-pairs"><b className="sav4-no">✗ Not allowed</b><b className="sav4-yes">✓ Allowed</b>
        ${r.rows.map(([w, ok], k) => html`<div key=${'w' + i + k}><${Mini} bad=${true}>${w}<//></div><div key=${'r' + i + k}><${Mini}>${ok}<//></div>`)}</div>
      </div><${Cap} en=${r.en} ar=${r.ar} showAr=${ar} /><${Bar} steps=${RULES} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 rule checker: draw flows, the rules of slides 9 to 14 are checked ── */
  const CK = { w: 280, h: 310, N: [
    { id: 'cu', k: 'e', x: 4, y: 4, w: 92, t: ['CUSTOMER'], s: 'CUSTOMER' }, { id: 'ki', k: 'e', x: 184, y: 4, w: 92, t: ['KITCHEN'], s: 'KITCHEN' },
    { id: 'p1', k: 'p', x: 98, y: 44, w: 84, n: '1.0', t: ['Receive and', 'Transform', 'Customer', 'Food Order'], s: '1.0' },
    { id: 'p4', k: 'p', x: 4, y: 150, w: 84, n: '4.0', t: ['Produce', 'Management', 'Reports'], s: '4.0' },
    { id: 'p3', k: 'p', x: 192, y: 150, w: 84, n: '3.0', t: ['Update', 'Inventory', 'File'], s: '3.0' },
    { id: 'rm', k: 'e', x: 4, y: 262, w: 112, t: ['RESTAURANT', 'MANAGER'], s: 'MANAGER' },
    { id: 'd1', k: 's', x: 150, y: 266, w: 126, n: 'D1', t: 'Inventory File', s: 'D1' }], E: [] };
  const CK_EX = [['cu', 'p1', 'Customer Order'], ['p1', 'cu', 'Receipt'], ['p1', 'ki', 'Food Order'], ['p1', 'p3', 'Inventory Data'], ['p3', 'd1', 'Formatted Inventory Data'], ['d1', 'p4', 'Daily Inventory Depletion Amounts'], ['p4', 'rm', 'Management Reports']];
  const CKM = prep(CK), nm = id => CKM[id].s;
  function flowCheck(F) {
    const k = id => CKM[id].k, out = [], probs = [];
    F.forEach(([a, b]) => {
      const A = k(a), B = k(b);
      if (a === b) out.push({ bad: 'A data flow cannot go directly from a process (or any symbol) back to itself.', bar: 'الـ data flow ماينفعش يرجع لنفس الـ symbol مباشرة.' });
      else if (A === 'e' && B === 'e') out.push({ bad: 'No data moves directly between external entities without going through a process.', bar: 'مفيش داتا بتتنقل مباشرة بين external entities من غير process.' });
      else if ((A === 's' || B === 's') && !(A === 'p' || B === 'p')) out.push({ bad: 'All flows to or from a data store must move through a process.', bar: 'كل الـ flows من وإلى الـ data store لازم تعدّي على process.' });
      else if (A === 'p' && B === 's') out.push({ ok: 'update (insert, delete or change)', okar: 'معناه update (insert أو delete أو change)' });
      else if (A === 's' && B === 'p') out.push({ ok: 'retrieve or use', okar: 'معناه retrieve أو use' });
      else out.push({});
    });
    CK.N.forEach(n => { if (n.k === 'e') return;
      const i = F.filter(f => f[1] === n.id && f[0] !== n.id).length, o = F.filter(f => f[0] === n.id && f[1] !== n.id).length;
      if (n.k === 'p' && o && !i) probs.push({ id: n.id, en: `${n.s} has only outputs (a "miracle").`, ar: `الـ process <bdi dir="ltr">${n.s}</bdi> ليه outputs بس (يعني "miracle").` });
      if (n.k === 'p' && i && !o) probs.push({ id: n.id, en: `${n.s} has only inputs (a "black hole").`, ar: `الـ process <bdi dir="ltr">${n.s}</bdi> ليه inputs بس (يعني "black hole").` });
      if (n.k === 's' && i && !o) probs.push({ id: n.id, en: `${n.s} has only inputs: nothing ever reads it.`, ar: `الـ data store <bdi dir="ltr">${n.s}</bdi> ليه inputs بس، ومحدش بيقرا منه.` });
      if (n.k === 's' && o && !i) probs.push({ id: n.id, en: `${n.s} has only outputs: nothing ever writes it.`, ar: `الـ data store <bdi dir="ltr">${n.s}</bdi> ليه outputs بس، ومحدش بيكتب فيه.` });
    });
    return { out, probs };
  }
  function clip(n, tx, ty) { const cx = n.x + n.w / 2, cy = n.y + n.h / 2, dx = tx - cx, dy = ty - cy; const t = Math.min(dx ? n.w / 2 / Math.abs(dx) : 1e9, dy ? n.h / 2 / Math.abs(dy) : 1e9); return [cx + dx * t, cy + dy * t]; }
  function Checker({ ar }) {
    const [F, setF] = useState(CK_EX), [a, setA] = useState(null), [b, setB] = useState(null);
    const { out, probs } = flowCheck(F), nBad = out.filter(o => o.bad).length + probs.length;
    const add = () => { if (!a || !b) return; setF(F.concat([[a, b, null]])); setA(null); setB(null); };
    const ex = F === CK_EX;
    const cap = ex
      ? { en: '<b>Example from the notes</b>: part of the Level-0 DFD of Hoosier Burger (slide 18, without 2.0 and D2). Every flow passes the rules. 3.0 → D1 is an <b>update</b>; D1 → 4.0 is a <b>retrieve</b>. Now <b>try your own</b>: pick From and To and add a flow.', ar: '<b>مثال من الـ notes</b>: جزء من الـ Level-0 DFD بتاع Hoosier Burger (slide 18، من غير <bdi dir="ltr">2.0</bdi> و <bdi dir="ltr">D2</bdi>). كل الـ flows ماشية على الـ rules. الـ flow من <bdi dir="ltr">3.0</bdi> لـ <bdi dir="ltr">D1</bdi> ده <b>update</b>، والـ flow من <bdi dir="ltr">D1</bdi> لـ <bdi dir="ltr">4.0</bdi> ده <b>retrieve</b>. <b>جرّب بنفسك</b>: اختار From و To وضيف flow.' }
      : nBad ? { en: `<b>${nBad}</b> rule ${nBad === 1 ? 'problem' : 'problems'} in your diagram (red). Each one is explained in the list below.`, ar: `في الرسمة بتاعتك <bdi dir="ltr">${nBad}</bdi> مشكلة في الـ rules (باللون الأحمر)، وكل واحدة متشرحة في الليستة اللي تحت.` }
        : { en: F.length ? 'No rule problems: every process has inputs and outputs, every store is reached through a process and no data moves between entities directly.' : 'Empty diagram: pick From and To and add a flow.', ar: F.length ? 'مفيش مشاكل في الـ rules: كل process ليه inputs و outputs، وكل store بيتوصل له عن طريق process، ومفيش داتا بتتنقل بين entities مباشرة.' : 'الرسمة فاضية: اختار From و To وضيف flow.' };
    // drawing: straight arrows between the symbols, numbered badges
    const pairs = {}; F.forEach(([x, y]) => { const key = [x, y].sort().join('|'); pairs[key] = (pairs[key] || 0) + 1; });
    const seen = {};
    const lines = F.map(([x, y], k) => { const key = [x, y].sort().join('|'), j = (seen[key] = (seen[key] || 0) + 1) - 1, m = pairs[key];
      const A = CKM[x], B = CKM[y], ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
      if (x === y) return { k, self: true, A, bad: true };
      const L = Math.hypot(bx - ax, by - ay), nx = -(by - ay) / L, ny = (bx - ax) / L, sgn = x < y ? 1 : -1, off = (j - (m - 1) / 2) * 12 * sgn;
      const p = clip(A, bx + nx * off, by + ny * off), q = clip(B, ax + nx * off, ay + ny * off);
      return { k, p: [p[0] + nx * off, p[1] + ny * off], q: [q[0] + nx * off, q[1] + ny * off], bad: !!out[k].bad }; });
    const badN = probs.map(p => p.id);
    return html`<figure className="fig sav4"><div className="fig-stage">
      <svg viewBox=${`0 0 ${CK.w} ${CK.h}`} className="sav4-svg" role="img" aria-label="Rule checker canvas"><${Marks} />
        ${lines.map(l => l.self ? html`<path key=${l.k} d=${`M${l.A.x + l.A.w} ${l.A.y + 12} h14 v-16 h-${l.A.w / 2 + 14} v4`} className="sav4-e sav4-bad" markerEnd="url(#sav4-ab)" />`
          : html`<path key=${l.k} d=${`M${l.p.join(' ')} L${l.q.join(' ')}`} className=${'sav4-e' + (l.bad ? ' sav4-bad' : '')} markerEnd=${l.bad ? 'url(#sav4-ab)' : 'url(#sav4-a)'} />`)}
        ${Object.values(CKM).map(n => html`<${NodeG} key=${n.id} n=${n} c=${badN.includes(n.id) ? 'sav4-bad' : (a === n.id || b === n.id) ? 'sav4-hot' : ''} />`)}
        ${lines.map(l => { const [x, y] = l.self ? [l.A.x + l.A.w + 7, l.A.y - 4] : [(l.p[0] + l.q[0]) / 2, (l.p[1] + l.q[1]) / 2];
          return html`<g key=${'b' + l.k}><circle cx=${x} cy=${y} r="9" fill="var(--paper)" stroke=${l.bad ? 'var(--pen)' : 'var(--fig-k)'} strokeWidth="1.5" /><text x=${x} y=${y + 4.5} textAnchor="middle" className=${l.bad ? 'sav4-bt' : 'sav4-num'}>${l.k + 1}</text></g>`; })}
      </svg>
      <div className="sav4-pick">
        <span>From</span><div>${CK.N.map(n => html`<button key=${n.id} className=${'fig-btn' + (a === n.id ? ' sav4-on' : '')} onClick=${() => setA(n.id)}>${n.s}</button>`)}</div>
        <span>To</span><div>${CK.N.map(n => html`<button key=${n.id} className=${'fig-btn' + (b === n.id ? ' sav4-on' : '')} onClick=${() => setB(n.id)}>${n.s}</button>`)}</div>
      </div>
      <div className="sav4-row">
        <button className="fig-btn solid" onClick=${add} disabled=${!a || !b}>+ Add flow${a && b ? ` ${nm(a)} → ${nm(b)}` : ''}</button>
        <button className="fig-btn" onClick=${() => setF(CK_EX)}>Example from the notes</button>
        <button className="fig-btn" onClick=${() => setF([])}>Clear</button>
      </div>
      ${probs.length > 0 && html`<div className="sav4-probs">${probs.map((p, k) => html`<div key=${k}>✗ ${p.en}</div>`)}</div>`}
      <ol className="sav4-list">${F.map(([x, y, l], k) => { const o = out[k];
        return html`<li key=${k} className=${o.bad ? 'bad' : ''}><div><b>${k + 1}.</b> ${nm(x)} → ${nm(y)}${l ? html` · <i>${l}</i>` : ''}
          ${o.bad ? html`<small className="sav4-p">✗ ${o.bad}</small>` : o.ok ? html`<small className="sav4-o">✓ ${o.ok}</small>` : html`<small>✓ allowed</small>`}</div>
          <button aria-label=${'Remove flow ' + (k + 1)} onClick=${() => setF(F.filter((_, j) => j !== k))}>×</button></li>`; })}</ol>
      </div><${Cap} en=${cap.en} ar=${cap.ar + (ar && !ex && (probs.length || out.some(o => o.bad)) ? '<br>' + probs.map(p => '✗ ' + p.ar).concat(out.map((o, k) => o.bad ? `✗ الـ flow رقم <bdi dir="ltr">${k + 1}</bdi>: ${o.bar}` : null).filter(Boolean)).join('<br>') : '')} showAr=${ar} /></figure>`;
  }

  /* ── L4 slides 15 to 21: functional decomposition, context → Level-0 → Level-1 → Level-2 ── */
  function Levels({ ar }) {
    const steps = [
      { en: '<b>Context diagram</b> (Figure 7-4): the system boundary, the external entities (CUSTOMER, KITCHEN, RESTAURANT MANAGER) and the major flows. Only <b>one process</b>, numbered <b>0</b>, and <b>no data stores</b>.', ar: 'الـ <b>Context diagram</b> (الـ <bdi dir="ltr">Figure&nbsp;7-4</bdi>): حدود السيستم، والـ external entities (الـ CUSTOMER والـ KITCHEN والـ RESTAURANT MANAGER)، والـ flows الأساسية. فيه <b>process واحد بس</b> رقمه <b>0</b>، و<b>مفيش data stores</b>.' },
      { en: '<b>Level-0 DFD</b> (Figure 7-5): process 0 exploded into the major processes <b>1.0 to 4.0</b>, with the data stores D1 and D2 and all the external entities. Next, process <b>4.0</b> is decomposed.', ar: 'الـ <b>Level-0 DFD</b> (الـ <bdi dir="ltr">Figure&nbsp;7-5</bdi>): الـ process 0 اتفصّل للـ processes الأساسية من <bdi dir="ltr">1.0</bdi> لحد <bdi dir="ltr">4.0</bdi>، ومعاهم الـ data stores <bdi dir="ltr">D1</bdi> و <bdi dir="ltr">D2</bdi> وكل الـ external entities. الخطوة الجاية هنعمل decompose للـ process <bdi dir="ltr">4.0</bdi>.' },
      { en: '<b>Level-1 DFD for process 4.0</b> (Figure 7-8): its sub-processes are numbered <b>4.1, 4.2, 4.3</b>. No external entities here; the flows coming in and going out match 4.0 on Level 0. Next, <b>4.3</b> is decomposed.', ar: 'الـ <b>Level-1 DFD للـ process <bdi dir="ltr">4.0</bdi></b> (الـ <bdi dir="ltr">Figure&nbsp;7-8</bdi>): الـ sub-processes بتاعته بتترقم <span class="ltr">4.1, 4.2, 4.3</span>مفيش external entities هنا، والـ flows الداخلة والخارجة بتقابل الـ <bdi dir="ltr">4.0</bdi> في الـ Level 0. الخطوة الجاية هنعمل decompose للـ <bdi dir="ltr">4.3</bdi>.' },
      { en: '<b>Level-2 DFD for process 4.3</b> (Figure 7-9): sub-processes <b>4.3.1, 4.3.2</b>. If this is the lowest level of the hierarchy it is a <b>primitive DFD</b>.', ar: 'الـ <b>Level-2 DFD للـ process <bdi dir="ltr">4.3</bdi></b> (الـ <bdi dir="ltr">Figure&nbsp;7-9</bdi>): الـ sub-processes بتاعته <span class="ltr">4.3.1, 4.3.2</span>ولو ده أقل مستوى في الـ hierarchy يبقى اسمه <b>primitive DFD</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 4200);
    const G = [[HB_CTX, [], 'Context diagram'], [HB_L0, ['p4'], 'Level-0 DFD'], [HB_L40, ['q3'], 'Level-1 DFD for 4.0'], [HB_L43, [], 'Level-2 DFD for 4.3']][i];
    const T = [['0'], ['1.0', '2.0', '3.0', '4.0'], ['4.1', '4.2', '4.3'], ['4.3.1', '4.3.2']];
    const cur = (lv, s) => lv === i && (lv === 0 || lv === 3 || (lv === 1 ? true : true));
    const path = ['0', '4.0', '4.3'];
    return html`<figure className="fig sav4"><div className="fig-stage">
      <div className="sav4-tree" aria-label="Decomposition tree">${T.map((row, lv) => html`<div key=${lv}><i>${['Context', 'Level 0', 'Level 1', 'Level 2'][lv]}</i>${row.map(s => html`<span key=${s} className=${(lv < i && path.includes(s) ? 'on ' : '') + (lv === i ? 'cur ' : '') + (lv === 3 ? 'prim' : '')}>${s}</span>`)}</div>`)}</div>
      <div className="sav4-h">${G[2]}</div>
      <${Dfd} g=${G[0]} hot=${G[1]} label=${G[2]} />
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 22 to 25: balancing ── */
  const U_CTX = { w: 280, h: 62, N: [
    { id: 'so', k: 'e', x: 4, y: 17.25, w: 64, t: ['SOURCE'] }, { id: 'x0', k: 'p', x: 108, y: 4, w: 64, n: '0', t: ['', ''] }, { id: 'si', k: 'e', x: 212, y: 17.25, w: 64, t: ['SINK'] }], E: [
    { id: 'A', f: 'so.r', t: 'x0.l', l: 'A', lx: 88, ly: 25 }, { id: 'B', f: 'x0.r', t: 'si.l', l: 'B', lx: 192, ly: 25 }] };
  const U_L0 = { w: 280, h: 160, N: [
    { id: 's1', k: 'e', x: 4, y: 8, w: 64, t: ['SOURCE', 'ONE'] }, { id: 'p1', k: 'p', x: 130, y: 4, w: 64, n: '1.0', t: ['', ''] },
    { id: 's2', k: 'e', x: 4, y: 112, w: 64, t: ['SOURCE', 'TWO'] }, { id: 'p2', k: 'p', x: 130, y: 100, w: 64, n: '2.0', t: ['', ''] },
    { id: 'sk', k: 'e', x: 222, y: 125.25, w: 54, t: ['SINK'] }], E: [
    { id: 'A', f: 's1.r', t: 'p1.l-2', l: 'A', lx: 99, ly: 22 },
    { id: 'C', f: 's2.r', v: [[84, 132.5], [84, 44]], t: 'p1.l+13.5', l: 'C', lx: 76, ly: 126 },
    { id: 'FA', f: 'p1.b', t: 'p2.t', l: ['Formatted', 'A'], lx: 158, ly: 74, la: 'end' },
    { id: 'FC', f: 'p1.r', v: [[212, 30.5], [212, 112]], t: 'p2.r-14.5', l: ['Formatted', 'C'], lx: 216, ly: 62, la: 'start' },
    { id: 'B', f: 'p2.r+12', t: 'sk.l', l: 'B', lx: 208, ly: 133 }] };
  const BAL = [
    { t: 'Unbalanced (7-10)', P: U_CTX, pid: 'x0', C: U_L0, pn: 'Figure 7-10a: context diagram', cn: 'Figure 7-10b: Level-0 diagram' },
    { t: 'Context vs Level 0', P: HB_CTX, pid: 'p0', C: HB_L0, pn: 'Figure 7-4: context diagram', cn: 'Figure 7-5: Level-0 DFD' },
    { t: '1.0 vs Level 1', P: HB_L0, pid: 'p1', C: HB_L10, pn: 'Figure 7-5: process 1.0 on Level 0', cn: 'Figure 7-7: Level-1 diagram of 1.0' }];
  function balance(c) {
    const pi = c.P.E.filter(e => to(e) === c.pid), po = c.P.E.filter(e => from(e) === c.pid);
    const inner = new Set(c.C.N.filter(n => n.k !== 'e').map(n => n.id));
    const ci = c.C.E.filter(e => !inner.has(from(e)) && inner.has(to(e))), co = c.C.E.filter(e => inner.has(from(e)) && !inner.has(to(e)));
    const pl = new Set(pi.concat(po).map(lab));
    const extra = (pi.length !== ci.length || po.length !== co.length) ? ci.concat(co).filter(e => !pl.has(lab(e))).map(e => e.id) : [];
    return { pi, po, ci, co, extra, ok: pi.length === ci.length && po.length === co.length };
  }
  function Balance({ ar }) {
    const steps = [
      { en: '<b>Figure 7-10a</b>: the context process 0 has <b>1 input</b> (A) and <b>1 output</b> (B).', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;7-10a</bdi></b>: الـ context process 0 ليه <b>input واحد</b> (A) و<b>output واحد</b> (B).' },
      { en: '<b>Figure 7-10b</b>: the Level-0 diagram has <b>2 inputs</b> (A from Source One and C from Source Two) and 1 output. The input C is extra, so the set is <b>unbalanced</b>.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;7-10b</bdi></b>: الـ Level-0 diagram فيه <b>2 inputs</b> (الـ A من Source One والـ C من Source Two) و output واحد. الـ input اللي اسمه C زيادة، فالرسمتين <b>unbalanced</b>.' },
      { en: '<b>Hoosier Burger context</b> (Figure 7-4): process 0 has <b>1 input</b> (Customer Order) and <b>3 outputs</b> (Receipt, Food Order, Management Reports).', ar: 'الـ <b>Context بتاع Hoosier Burger</b> (الـ <bdi dir="ltr">Figure&nbsp;7-4</bdi>): الـ process 0 ليه <b>input واحد</b> (الـ Customer Order) و<b>3 outputs</b> (الـ Receipt والـ Food Order والـ Management Reports).' },
      { en: 'The flows between the <b>Level-0</b> diagram and its external entities: also 1 input and 3 outputs. The flows to and from D1 and D2 are inside the system. <b>Balanced</b>.', ar: 'الـ flows اللي بين الـ <b>Level-0</b> diagram والـ external entities: برضه input واحد و 3 outputs. والـ flows من وإلى <bdi dir="ltr">D1</bdi> و <bdi dir="ltr">D2</bdi> جوه السيستم. يبقى <b>Balanced</b>.' },
      { en: '<b>Process 1.0</b> on the Level-0 diagram: <b>1 input</b> (Customer Order) and <b>4 outputs</b> (Receipt, Food Order, Goods Sold, Inventory Data).', ar: 'الـ <b>Process <bdi dir="ltr">1.0</bdi></b> في الـ Level-0 diagram ليه <b>input واحد</b> (الـ Customer Order) و<b>4 outputs</b> (الـ Receipt والـ Food Order والـ Goods Sold والـ Inventory Data).' },
      { en: 'Its <b>Level-1</b> diagram (Figure 7-7): 1 input and 4 outputs leave the diagram. The numbers are equal, so it is <b>balanced</b>. Inside, the Customer Order is forked to 1.2 to 1.5 as the same data item.', ar: 'الـ <b>Level-1</b> diagram بتاعه (الـ <bdi dir="ltr">Figure&nbsp;7-7</bdi>): فيه input واحد و 4 outputs بيخرجوا من الرسمة. الأعداد متساوية فهو <b>balanced</b>. وجوه الرسمة الـ Customer Order بيتعمله fork لـ <bdi dir="ltr">1.2</bdi> لحد <bdi dir="ltr">1.5</bdi> كـ نفس الـ data item.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3800);
    const ci = Math.floor(i / 2), c = BAL[ci], child = i % 2 === 1, r = balance(c);
    const names = L => L.map(lab).join(', ') || '(none)';
    const cell = (n, L, on, bad) => html`<div className=${(on ? '' : 'off') + (bad ? ' bad' : '')}><i>${n}</i>${names(L)}</div>`;
    return html`<figure className="fig sav4"><div className="fig-stage">
      <${Tabs} items=${BAL.map(x => x.t)} cur=${ci} set=${k => ctl.go(k * 2)} />
      <div className="sav4-h">${child ? c.cn : c.pn}</div>
      ${child ? html`<${Dfd} g=${c.C} hot=${r.ci.concat(r.co).map(e => e.id).filter(x => !r.extra.includes(x))} bad=${r.extra} dim=${true} label=${c.cn} />`
        : html`<${Dfd} g=${c.P} hot=${[c.pid].concat(r.pi.concat(r.po).map(e => e.id))} dim=${true} label=${c.pn} />`}
      <div className="sav4-cnt"><b></b><b>Higher level</b><b>Lower level</b>
        <b>Inputs</b>${cell(r.pi.length, r.pi, true)}${cell(r.ci.length, r.ci, child, child && r.ci.length !== r.pi.length)}
        <b>Outputs</b>${cell(r.po.length, r.po, true)}${cell(r.co.length, r.co, child, child && r.co.length !== r.po.length)}</div>
      ${child && html`<div className=${'sav4-verd ' + (r.ok ? 'yes' : 'no')}>${r.ok ? '✓ Balanced' : '✗ Unbalanced'}</div>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 26 (Figure 7-11): data flow splitting ── */
  const SP_A = { w: 280, h: 62, N: [{ id: 'x0', k: 'p', x: 170, y: 4, w: 64, n: 'X.0', t: ['', ''] }], E: [{ id: 'pc', f: [30, 30.5], t: 'x0.l', l: 'Payment and Coupon', lx: 100, ly: 24 }] };
  const SP_B = { w: 280, h: 106, N: [{ id: 'x1', k: 'p', x: 170, y: 4, w: 64, n: 'X.1', t: [''] }, { id: 'x2', k: 'p', x: 170, y: 62, w: 64, n: 'X.2', t: [''] }],
    E: [{ id: 'pa', f: [30, 23.25], t: 'x1.l', l: 'Payment', lx: 100, ly: 17, at: 1 }, { id: 'cp', f: [30, 81.25], t: 'x2.l', l: 'Coupon', lx: 100, ly: 75, at: 2 }] };
  function Split({ ar }) {
    const steps = [
      { en: '<b>Figure 7-11a</b>, higher level: a <b>composite</b> data flow, Payment and Coupon, goes into process X.0.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;7-11a</bdi></b> في المستوى الأعلى: فيه data flow <b>composite</b> اسمه Payment and Coupon داخل على الـ process <bdi dir="ltr">X.0</bdi>.' },
      { en: '<b>Figure 7-11b</b>, lower level: X.0 is decomposed and the parts go to different processes. <b>Payment</b> goes to X.1 ...', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;7-11b</bdi></b> في المستوى الأقل: الـ <bdi dir="ltr">X.0</bdi> اتعمله decompose والأجزاء راحت لـ processes مختلفة. الـ <b>Payment</b> رايح للـ <bdi dir="ltr">X.1</bdi> ...' },
      { en: '... and <b>Coupon</b> goes to X.2. These are <b>disaggregated</b> data flows. The diagrams remain <b>balanced</b> because the same data is involved, just split into two parts.', ar: '... والـ <b>Coupon</b> رايح للـ <bdi dir="ltr">X.2</bdi>. دول اسمهم data flows <b>disaggregated</b>. والرسمتين بيفضلوا <b>balanced</b> لأن نفس الداتا هي اللي موجودة، بس اتقسمت جزئين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    return html`<figure className="fig sav4"><div className="fig-stage">
      <div className="sav4-h">Figure 7-11a: composite data flow</div>
      <${Dfd} g=${SP_A} hot=${i === 2 ? ['pc'] : []} label="Payment and Coupon into X.0" />
      <div className=${'sav4-lv ' + pop(i >= 1)}><div className="sav4-h">Figure 7-11b: disaggregated data flows</div>
      <${Dfd} g=${SP_B} st=${i} hot=${i === 2 ? ['pa', 'cp'] : []} label="Payment into X.1 and Coupon into X.2" /></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 33 to 36: case study 1, employee payroll system ── */
  function Payroll({ ar }) {
    const steps = [
      { en: '<b>Context diagram</b>: the Employee sends the Time Sheet to process 0, Employee Payroll System, and gets the Employee Tax Form and the Employee Payroll Check. The system sends the Payroll Report to the Accounting Department.', ar: 'الـ <b>Context diagram</b>: الـ Employee بيبعت الـ Time Sheet للـ process 0 اللي هو الـ Employee Payroll System، وبياخد الـ Employee Tax Form والـ Employee Payroll Check. والسيستم بيبعت الـ Payroll Report للـ Accounting Department.' },
      { en: '<b>Level-0 DFD</b> (slide 34): 1.0 Create Weekly Payroll Record writes the Hours Worked to S1; 2.0 Compute Weekly Paycheck reads S1, writes Paycheck Data to S2 and pays the Employee; 3.0 reads S2 and sends the Payroll Report; <b>4.0</b> reads S2 and sends the Employee Tax Form.', ar: 'الـ <b>Level-0 DFD</b> (slide 34): الـ <bdi dir="ltr">1.0</bdi> بيكتب الـ Hours Worked في <bdi dir="ltr">S1</bdi>، والـ <bdi dir="ltr">2.0</bdi> بيقرا من <bdi dir="ltr">S1</bdi> وبيكتب الـ Paycheck Data في <bdi dir="ltr">S2</bdi> وبيبعت الـ paycheck للـ Employee، والـ <bdi dir="ltr">3.0</bdi> بيقرا من <bdi dir="ltr">S2</bdi> وبيبعت الـ Payroll Report، والـ <b><bdi dir="ltr">4.0</bdi></b> بيقرا من <bdi dir="ltr">S2</bdi> وبيبعت الـ Employee Tax Form.' },
      { en: '<b>Level-1 DFD</b> (slide 35): 2.0 becomes 2.1 Compute Gross Pay, 2.2 Compute Net Pay, 2.3 Create Payroll Check; 3.0 becomes 3.1 Sort Payroll Records by Employee, 3.2 Print Weekly Payroll Summary; 4.0 becomes <b>4.1</b> Calculate Payroll Deductions, 4.2 Print Employee Tax Form.', ar: 'الـ <b>Level-1 DFD</b> (slide 35): الـ <bdi dir="ltr">2.0</bdi> بيبقى <span class="ltr">2.1 Compute Gross Pay, 2.2 Compute Net Pay, 2.3 Create Payroll Check</span>والـ <bdi dir="ltr">3.0</bdi> بيبقى <span class="ltr">3.1 Sort Payroll Records by Employee, 3.2 Print Weekly Payroll Summary</span>والـ <bdi dir="ltr">4.0</bdi> بيبقى <span class="ltr">4.1 Calculate Payroll Deductions, 4.2 Print Employee Tax Form</span>' },
      { en: '<b>Part of the Level-2 DFD</b>, the "functional primitives" (slide 36): 4.1.1 Calculate Payroll Tax Deductions, 4.1.2 Calculate Non-tax Deductions, 4.1.3 Calculate Retirement Allowance, 4.2.1 Calculate Employee Vacation Pay, 4.2.2 Print Employee Tax Form.', ar: '<b>جزء من الـ Level-2 DFD</b> اللي هو الـ "functional primitives" (slide 36):<span class="ltr">4.1.1 Calculate Payroll Tax Deductions, 4.1.2 Calculate Non-tax Deductions, 4.1.3 Calculate Retirement Allowance, 4.2.1 Calculate Employee Vacation Pay, 4.2.2 Print Employee Tax Form</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 5200);
    const G = [[PR_CTX, [], 'Context diagram'], [PR_L0, ['p4'], 'Level-0 DFD'], [PR_L1, ['c1'], 'Level-1 DFD'], [PR_L2, [], 'Part of Level-2 (n) DFD: "functional primitive"']][i];
    return html`<figure className="fig sav4"><div className="fig-stage">
      <${Tabs} items=${['Context', 'Level 0', 'Level 1', 'Level 2']} cur=${i} set=${ctl.go} />
      <div className="sav4-h">${G[2]}</div>
      <${Dfd} g=${G[0]} hot=${G[1]} label=${'Employee payroll system: ' + G[2]} />
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 27, 37 to 45: other cases ── */
  const INV = { w: 280, h: 304, N: [
    { id: 'su', k: 'e', x: 4, y: 4, w: 100, t: ['SUPPLIER'] }, { id: 'st', k: 'e', x: 172, y: 4, w: 104, t: ['STOCK-ON-HAND'] },
    { id: 'p1', k: 'p', x: 96, y: 60, w: 84, n: '1.0', t: ['Update', 'Inventory', 'Added'] },
    { id: 'p2', k: 'p', x: 192, y: 60, w: 84, n: '2.0', t: ['Update', 'Inventory', 'Used'] },
    { id: 'd1', k: 's', x: 110, y: 170, w: 120, n: 'D1', t: 'INVENTORY' },
    { id: 'p3', k: 'p', x: 150, y: 250, w: 84, n: '3.0', t: ['Generate', 'Orders'] },
    { id: 'p4', k: 'p', x: 4, y: 250, w: 84, n: '4.0', t: ['Generate', 'Payments'] }], E: [
    { id: 'i1', f: 'su.r', v: [[118, 17.25]], t: 'p1.t-20', l: 'Invoices', lx: 122, ly: 44, la: 'start' },
    { id: 'ct', f: 'st.b+10', t: 'p2.t-8', l: 'Counts', lx: 238, ly: 48, la: 'start' },
    { id: 'aa', f: 'p1.b', t: 'd1.t-32', l: ['Amounts', 'Added'], lx: 142, ly: 142, la: 'start' },
    { id: 'au', f: 'p2.b+16', v: [[250, 182]], t: 'd1.r', l: ['Amounts', 'Used'], lx: 246, ly: 142, la: 'end' },
    { id: 'il', f: 'd1.b-10', t: 'p3.t-32', l: ['Inventory', 'Levels'], lx: 156, ly: 216, la: 'end' },
    { id: 'mo', f: 'd1.b+44', t: 'p3.t+22', l: ['Minimum', 'Order', 'Quantities'], lx: 218, ly: 210, la: 'start' },
    { id: 'or', f: 'p3.l', v: [[96, 274.5]], t: 'su.b+42', l: 'Orders', lx: 100, ly: 194, la: 'start' },
    { id: 'i4', f: 'su.b+2', t: 'p4.t+10', l: 'Invoices', lx: 50, ly: 140, rot: -90 },
    { id: 'pa', f: 'p4.t-30', t: 'su.b-38', l: 'Payments', lx: 10, ly: 140, rot: -90 }] };
  const VR = [
    ['Customer (source)', 1, ['New Customer Information', 'Video Rental Item', 'Customer ID', 'Payment', 'Returned Video Information']],
    ['Video Purchase System', 0, ['Video Information']], ['Management', 0, ['Management Reports']],
    ['Customer (sink)', 0, ['Rental Receipt', 'Video Rental Card', 'Monthly Bonus Letter', 'Yearly Bonus Letter']], ['Accounting', 0, ['Total Cash Received']]];
  const WS = [['Main Page', null], ['Product Line (Catalog)', '1.0 Browse Catalog'], ['Desks, Chairs, Tables, File Cabinets', '2.0 Select Item for Purchase'], ['Shopping Cart', '3.0 Display Shopping Cart'], ['Checkout', '4.0 Check Out Process Order'], ['Account Profile', '5.0 Add/Modify Account Profile'], ['Order Status/History', '6.0 Order Status Request'], ['Customer Comments', null], ['Company Info, Feedback, Contact Information', '']];
  function Cases({ ar }) {
    const [t, setT] = useState(0);
    const nIn = VR.filter(r => r[1]).reduce((s, r) => s + r[2].length, 0), nOut = VR.filter(r => !r[1]).reduce((s, r) => s + r[2].length, 0);
    const caps = [
      { en: '<b>Logical DFD for the inventory control system</b> (Figure 8-2, Hoosier Burger): SUPPLIER and STOCK-ON-HAND outside; 1.0 and 2.0 <b>update</b> D1 INVENTORY; 3.0 <b>retrieves</b> the Inventory Levels and Minimum Order Quantities to send Orders; 4.0 turns Invoices into Payments.', ar: 'الـ <b>Logical DFD لـ inventory control system</b> (الـ <bdi dir="ltr">Figure&nbsp;8-2</bdi> بتاع Hoosier Burger): الـ SUPPLIER والـ STOCK-ON-HAND برّه السيستم، والـ <bdi dir="ltr">1.0</bdi> والـ <bdi dir="ltr">2.0</bdi> بيعملوا <b>update</b> للـ <bdi dir="ltr">D1</bdi> INVENTORY، والـ <bdi dir="ltr">3.0</bdi> بيعمل <b>retrieve</b> للـ Inventory Levels والـ Minimum Order Quantities عشان يبعت الـ Orders، والـ <bdi dir="ltr">4.0</bdi> بيحوّل الـ Invoices لـ Payments.' },
      { en: `<b>Video rental system, context diagram</b> (case study 2, slide 38): one process 0 and five external entities. Counted from the diagram: <b>${nIn} inputs</b> and <b>${nOut} outputs</b>; the Customer appears twice, as a source and as a sink.`, ar: `الـ <b>Context diagram بتاع video rental system</b> (الـ case study رقم 2 في slide 38) فيه process واحد رقمه 0 و 5 external entities. لو عدّينا من الرسمة هنلاقي <b><bdi dir="ltr">${nIn}</bdi> inputs</b> و<b><bdi dir="ltr">${nOut}</bdi> outputs</b>، والـ Customer ظاهر مرتين، مرة كـ source ومرة كـ sink.` },
      { en: '<b>PVF WebStore</b> (Table 7-4, slide 44): the Web store structure gives <b>six high-level processes</b> for the Level-0 DFD (Figure 7-19): 1.0 Browse Catalog to 6.0 Order Status Request. Information pages have minor or no processes.', ar: 'الـ <b>PVF WebStore</b> (الـ <bdi dir="ltr">Table&nbsp;7-4</bdi> في slide 44): هيكل الـ Web store بيدّي <b>6 processes high-level</b> للـ Level-0 DFD (الـ <bdi dir="ltr">Figure&nbsp;7-19</bdi>): من <bdi dir="ltr">1.0</bdi> Browse Catalog لحد <bdi dir="ltr">6.0</bdi> Order Status Request. وصفحات المعلومات ليها processes قليلة أو مفيش.' }
    ];
    return html`<figure className="fig sav4"><div className="fig-stage">
      <${Tabs} items=${['Inventory', 'Video rental', 'WebStore']} cur=${t} set=${setT} />
      ${t === 0 && html`<div className="sav4-h">Figure 8-2: current logical DFD</div><${Dfd} g=${INV} label="Logical DFD for Hoosier Burger's inventory control system" />`}
      ${t === 1 && html`<div className="sav4-vr">
        ${VR.filter(r => r[1]).map(([n, , L]) => html`<div key=${n} className="sav4-ent"><b>${n}</b>${L.map(s => html`<span key=${s}><em>→ 0</em> ${s}</span>`)}</div>`)}
        <div className="sav4-sys"><small>0</small>Video Rental System</div>
        ${VR.filter(r => !r[1]).map(([n, , L]) => html`<div key=${n} className="sav4-ent"><b>${n}</b>${L.map(s => html`<span key=${s}><em>0 →</em> ${s}</span>`)}</div>`)}</div>`}
      ${t === 2 && html`<table className="sav4-tbl"><thead><tr><th>WebStore system</th><th>Processes</th></tr></thead><tbody>
        ${WS.map(([a, b]) => html`<tr key=${a}><td>${a}</td><td className=${b ? 'sav4-pr' : 'sav4-mi'}>${b == null ? 'Information display (minor/no processes)' : b}</td></tr>`)}</tbody></table>`}
      </div><${Cap} ...${caps[t]} showAr=${ar} /></figure>`;
  }

  /* ── L4 exam 2023/24, question 4: list at least 10 errors (figure as described in the exam) ── */
  const X_CTX = { w: 280, h: 144, N: [
    { id: 'e1', k: 'e', x: 4, y: 20, w: 36, t: ['E1'] },
    { id: 'es1', k: 'p', x: 64, y: 8, w: 70, n: '', t: ['Education', 'System 1'] },
    { id: 'es2', k: 'p', x: 170, y: 8, w: 70, n: '', t: ['Education', 'System 2'] },
    { id: 'e2', k: 'e', x: 186, y: 112, w: 40, t: ['E2'] },
    { id: 'ds2', k: 's', x: 64, y: 112, w: 70, n: 'DS2', t: '', cw: 32 }], E: [
    { id: 'df1', f: 'e1.r', t: 'es1.l-1.25', l: 'DF1', lx: 52, ly: 22 },
    { id: 'dsf', f: 'ds2.t', t: 'es1.b' },
    { id: 'df2', f: 'es1.r', t: 'es2.l', l: 'DF2', lx: 152, ly: 28 },
    { id: 'df3', f: 'es2.b-12', t: 'e2.t-13', l: 'DF3', lx: 189, ly: 90, la: 'end' },
    { id: 'df4', f: 'es2.b+12', t: 'e2.t+11', l: 'DF4', lx: 221, ly: 90, la: 'start' }] };
  const X_L0 = { w: 280, h: 186, N: [
    { id: 'dsu', k: 's', x: 150, y: 4, w: 70, n: 'DS2', t: '', cw: 32 },
    { id: 'e1', k: 'e', x: 4, y: 64, w: 36, t: ['E1'] }, { id: 'p1', k: 'p', x: 64, y: 58, w: 56, n: '', t: ['P1'] },
    { id: 'p2', k: 'p', x: 160, y: 58, w: 56, n: '', t: ['P2'] }, { id: 'e2', k: 'e', x: 244, y: 64, w: 32, t: ['E2'] },
    { id: 'dsl', k: 's', x: 64, y: 150, w: 70, n: 'DS2', t: '', cw: 32 }, { id: 'p3', k: 'p', x: 160, y: 143, w: 56, n: '', t: ['P3'] }], E: [
    { id: 'df1', f: 'e1.r', t: 'p1.l', l: 'DF1', lx: 52, ly: 71 },
    { id: 'df2', f: 'p1.r', t: 'p2.l', l: 'DF2', lx: 140, ly: 71 },
    { id: 'df4a', f: 'p2.r', t: 'e2.l', l: 'DF4', lx: 230, ly: 71 },
    { id: 'df6', f: 'dsu.b+3', t: 'p2.t', l: 'DF6', lx: 194, ly: 47, la: 'start' },
    { id: 'df3', f: 'p1.b', t: 'dsl.t-7', l: 'DF3', lx: 88, ly: 127, la: 'end' },
    { id: 'df5', f: 'p3.l', t: 'dsl.r', l: 'DF5', lx: 147, ly: 156 },
    { id: 'df4b', f: 'p3.r', v: [[260, 162.25]], t: 'e2.b', l: 'DF4', lx: 238, ly: 156 }] };
  const X_L1 = { w: 280, h: 166, N: [
    { id: 'k11', k: 'p', x: 30, y: 38, w: 56, n: '', t: ['P1.1'] }, { id: 'k12', k: 'p', x: 140, y: 38, w: 56, n: '', t: ['P1.2'] },
    { id: 'k11b', k: 'p', x: 76, y: 120, w: 56, n: '', t: ['P1.1'] }, { id: 'ds1', k: 's', x: 206, y: 4, w: 66, n: 'DS1', t: '', cw: 32 },
    { id: 'k14', k: 'p', x: 200, y: 110, w: 56, n: '', t: ['P1.4'] }], E: [
    { id: 'df1', f: [4, 57.25], t: 'k11.l', l: 'DF1', lx: 17, ly: 51 },
    { id: 'df7', f: 'k11.r', t: 'k12.l', l: 'DF7', lx: 122, ly: 51 },
    { id: 'df2', f: [104, 57.25], a: 'k11', t: 'k11b.t', l: 'DF2', lx: 108, ly: 96, la: 'start' },
    { id: 'df6', f: 'k12.t', v: [[168, 16]], t: 'ds1.l', l: 'DF6', lx: 174, ly: 34, la: 'start' },
    { id: 'df9', f: 'k12.b+8', v: [[176, 120]], t: 'k14.l-9.25', l: 'DF9', lx: 180, ly: 98, la: 'start' },
    { id: 'df8', f: 'k11b.r', t: 'k14.l+10', l: 'DF8', lx: 158, ly: 133 },
    { id: 'df3', f: 'k14.r', t: [278, 129.25], l: 'DF3', lx: 264, ly: 105 }] };
  const X_L2 = { w: 280, h: 140, N: [
    { id: 'm1', k: 'p', x: 40, y: 88, w: 62, n: '', t: ['P1.5.1'] }, { id: 'm2', k: 'p', x: 110, y: 8, w: 62, n: '', t: ['P1.4.2'] },
    { id: 'm3', k: 'p', x: 190, y: 88, w: 62, n: '', t: ['P1.4.3'] }], E: [
    { id: 'df8', f: [4, 98], t: 'm1.l-9.25', l: 'DF8', lx: 20, ly: 92 },
    { id: 'df9', f: [4, 117], t: 'm1.l+9.75', l: 'DF9', lx: 20, ly: 133 },
    { id: 'df10', f: 'm1.t', v: [[71, 27.25]], t: 'm2.l', l: 'DF10', lx: 75, ly: 64, la: 'start' },
    { id: 'df12', f: 'm2.r', v: [[221, 27.25]], t: 'm3.t', l: 'DF12', lx: 225, ly: 64, la: 'start' },
    { id: 'df11', f: 'm1.r', t: 'm3.l', l: 'DF11', lx: 146, ly: 101 },
    { id: 'df2', f: [278, 107.25], t: 'm3.r', l: 'DF2', lx: 265, ly: 101 }] };
  const XL = [[X_CTX, 'Context'], [X_L0, 'Level 0'], [X_L1, 'Level 1 (decomposition of P1)'], [X_L2, 'Level 2 (decomposition of P1.4)']];
  const ERR = [
    { h: { 0: ['es1', 'es2', 'df2'] }, en: '<b>Context</b>: it has <b>two processes</b>. A context diagram has exactly one process (0), so DF2 between two "systems" must not appear.', ar: 'الـ <b>Context</b>: فيه <b>2 processes</b>. الـ context diagram ليه process واحد بس (رقمه 0)، فالـ DF2 اللي بين الـ "systems" الاتنين ماينفعش يظهر.' },
    { h: { 0: ['ds2', 'dsf'] }, en: '<b>Context</b>: it shows the data store DS2 (no data stores are allowed on a context diagram), and its flow has <b>no label</b>.', ar: 'الـ <b>Context</b>: ظاهر فيه الـ data store اللي اسمه DS2 (ومفيش data stores مسموحة في الـ context diagram)، والـ flow بتاعه <b>من غير label</b>.' },
    { h: { 0: ['df3', 'e2'], 1: ['df3', 'e2'] }, en: '<b>Unbalanced</b> with Level 0: the context sends DF3 to E2, but on Level 0 DF3 goes from P1 to DS2 and nothing called DF3 reaches E2.', ar: 'الرسمتين <b>Unbalanced</b>: الـ context بيبعت DF3 لـ E2، إنما في الـ Level 0 الـ DF3 رايح من P1 لـ DS2 ومفيش حاجة اسمها DF3 بتوصل لـ E2.' },
    { h: { 1: ['dsu', 'dsl'] }, en: '<b>Level 0</b>: <b>DS2 is drawn twice</b>. It should be one store, or the second should be named DS1.', ar: 'الـ <b>Level 0</b>: الـ <b>DS2 مترسوم مرتين</b>. المفروض يبقى store واحد، أو التاني يتسمّى DS1.' },
    { h: { 1: ['dsl', 'df3', 'df5'] }, en: '<b>Level 0</b>: the lower DS2 has <b>only inputs</b> (DF3, DF5) and is never read.', ar: 'الـ <b>Level 0</b>: الـ DS2 اللي تحت ليه <b>inputs بس</b> (الـ DF3 والـ DF5) ومحدش بيقرا منه.' },
    { h: { 1: ['dsu', 'df6'] }, en: '<b>Level 0</b>: the upper DS2 has <b>only an output</b> (DF6) and is never written.', ar: 'الـ <b>Level 0</b>: الـ DS2 اللي فوق ليه <b>output بس</b> (الـ DF6) ومحدش بيكتب فيه.' },
    { h: { 1: ['df4a', 'df4b'] }, en: '<b>Level 0</b>: the label <b>DF4</b> is used for two different flows (P2 → E2 and P3 → E2).', ar: 'الـ <b>Level 0</b>: الـ label اللي اسمه <b>DF4</b> مستخدم لـ 2 flows مختلفين:<span class="ltr">P2 → E2, P3 → E2</span>' },
    { h: { 1: ['p3', 'df5', 'df4b'] }, en: '<b>Level 0</b>: <b>P3</b> has outputs (DF5, DF4) but <b>no input</b>: a "miracle".', ar: 'الـ <b>Level 0</b>: الـ <b>P3</b> ليه outputs (الـ DF5 والـ DF4) بس <b>مفيش input</b>، يعني "miracle".' },
    { h: { 2: ['k11', 'k11b'] }, en: '<b>Level 1</b>: two processes are numbered <b>P1.1</b>; the second should be <b>P1.3</b>.', ar: 'الـ <b>Level 1</b>: فيه 2 processes رقمهم <b>P1.1</b>، والتاني المفروض يبقى <b>P1.3</b>.' },
    { h: { 2: ['df7', 'df2'] }, en: '<b>Level 1</b>: the <b>forked</b> flow out of P1.1 has two labels (DF7 and DF2). A fork must carry the exact same data.', ar: 'الـ <b>Level 1</b>: الـ flow الـ <b>forked</b> اللي طالع من P1.1 عليه 2 labels (الـ DF7 والـ DF2). والـ fork لازم يشيل نفس الداتا بالظبط.' },
    { h: { 1: ['p1', 'df3', 'dsl'], 2: ['k12', 'df6', 'ds1'] }, en: '<b>Level 1</b>: P1.2 writes <b>DF6 to DS1</b>, but the parent P1 writes <b>DF3 to DS2</b>. To balance, it should be DF3 → DS2.', ar: 'الـ <b>Level 1</b>: الـ P1.2 بيكتب <b>DF6 في DS1</b>، إنما الـ parent اللي هو P1 بيكتب <b>DF3 في DS2</b>. عشان يبقى balanced لازم يبقى:<span class="ltr">DF3 → DS2</span>' },
    { h: { 1: ['p1', 'df2'], 2: ['k14', 'df3'] }, en: '<b>Level 1</b>: P1.4 outputs <b>DF3</b>, but P1\'s output to P2 is <b>DF2</b>. It should be DF2.', ar: 'الـ <b>Level 1</b>: الـ P1.4 بيطلّع <b>DF3</b>، إنما الـ output بتاع P1 لـ P2 هو <b>DF2</b>. فالمفروض يبقى DF2.' },
    { h: { 3: ['m1'] }, en: '<b>Level 2</b>: <b>P1.5.1</b> should be <b>P1.4.1</b> (this diagram decomposes P1.4; there is no P1.5).', ar: 'الـ <b>Level 2</b>: الـ <b>P1.5.1</b> المفروض يبقى <b>P1.4.1</b> (الرسمة دي decomposition للـ P1.4، ومفيش حاجة اسمها P1.5).' },
    { h: { 3: ['m3', 'df11', 'df12', 'df2'] }, en: '<b>Level 2</b>: <b>P1.4.3</b> has only inputs (DF11, DF12, DF2) and <b>no output</b>: a "black hole".', ar: 'الـ <b>Level 2</b>: الـ <b>P1.4.3</b> ليه inputs بس (الـ DF11 والـ DF12 والـ DF2) و<b>مفيش output</b>، يعني "black hole".' },
    { h: { 3: ['df2'], 2: ['df3'] }, en: '<b>Level 2</b>: <b>DF2</b> points into P1.4.3. It should <b>leave</b> P1.4.3 to balance P1.4\'s output.', ar: 'الـ <b>Level 2</b>: الـ <b>DF2</b> داخل على P1.4.3، والمفروض <b>يطلع</b> منه عشان يبقى balanced مع الـ output بتاع P1.4.' }
  ];
  function Errors({ ar }) {
    const steps = [{ en: 'The 2023/24 exam figure: a context diagram, Level 0, Level 1 for P1 and Level 2 for P1.4. Find the errors yourself first, then tap 1 to 15 (or press Next) to see each error: <b>where</b>, <b>which rule</b> and <b>the fix</b>.', ar: 'دي رسمة امتحان <bdi dir="ltr">2023/24</bdi>: فيها context diagram والـ Level 0 والـ Level 1 للـ P1 والـ Level 2 للـ P1.4. دوّر على الـ errors بنفسك الأول، وبعدين دوس من 1 لـ 15 (أو Next) عشان تشوف كل error: <b>فين</b>، و<b>أنهي rule</b>، و<b>التصليح</b>.' }].concat(ERR.map((e, k) => ({ en: `<b>${k + 1}.</b> ` + e.en, ar: `(${k + 1}) ` + e.ar })));
    const [i, ctl] = useSteps(steps.length, 4800), e = ERR[i - 1];
    const lv = e ? Object.keys(e.h).map(Number).sort() : [0, 1, 2, 3];
    return html`<figure className="fig sav4"><div className="fig-stage">
      <div className="sav4-chips">${ERR.map((_, k) => html`<button key=${k} className=${'fig-btn' + (i === k + 1 ? ' sav4-on' : '')} onClick=${() => ctl.go(k + 1)} aria-label=${'Error ' + (k + 1)}>${k + 1}</button>`)}</div>
      ${lv.map(l => html`<div key=${l} className="sav4-lv"><div className="sav4-h">${XL[l][1]}</div><${Dfd} g=${XL[l][0]} bad=${e ? e.h[l] : []} dim=${!!e} label=${'Exam DFD, ' + XL[l][1]} /></div>`)}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'sa-dfd-sdlc': Sdlc, 'sa-dfd-symbols': Symbols, 'sa-dfd-rules': Rules, 'sa-dfd-check': Checker, 'sa-dfd-levels': Levels,
    'sa-dfd-balance': Balance, 'sa-dfd-split': Split, 'sa-payroll-dfd': Payroll, 'sa-dfd-cases': Cases, 'sa-dfd-errors': Errors });
})();
/* ── part L1 ── */
// Systems Analysis and Design visuals, Lecture 1 (Introduction to Information Systems): the firm's physical system (Fig 1.7), open purposive systems, the warehouse example, subsystems of the organization, IS vs CBIS components, TPS events and the TPS, MIS and DSS models (Figs 1.8 to 1.10), management levels (Figs 1.11 to 1.13) and the lab's UML categories (CH_01 slides 3 to 25 and Lab 1). Every label and number comes from the slides and the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.sav1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.sav1 .fig-btn.sav1-on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.sav1-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:420px; }
.sav1 svg text{ font-size:13px; fill:var(--ink); font-family:var(--body); }
.sav1 svg text.sav1-gt{ fill:var(--graphite); font-weight:700; }
.sav1 svg text.sav1-kt{ fill:var(--fig-k); font-weight:700; }
.sav1 svg text.sav1-big{ font-size:15px; font-weight:700; }
.sav1 svg text.sav1-fl{ paint-order:stroke; stroke:var(--paper-2); stroke-width:4px; stroke-linejoin:round; }
.sav1 .sav1-area{ fill:color-mix(in srgb, var(--fig-k) 9%, var(--paper-2)); stroke:var(--line); stroke-width:1.2; }
.sav1 .sav1-bound{ fill:none; stroke:var(--graphite); stroke-width:1.4; }
.sav1 .sav1-nf{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.5; transition:fill .45s, stroke .45s; }
.sav1 .sav1-n, .sav1 .sav1-e, .sav1 .sav1-fade{ transition:opacity .45s; }
.sav1 .sav1-hot .sav1-nf{ fill:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); stroke:var(--fig-k); stroke-width:2.4; }
.sav1 .sav1-dim{ opacity:.18; }
.sav1 .sav1-e{ fill:none; stroke:var(--graphite); stroke-width:2; transition:opacity .45s, stroke .45s; }
.sav1 .sav1-e.sav1-i{ stroke-dasharray:6 4; }
.sav1 .sav1-e.sav1-hot{ stroke:var(--fig-k); stroke-width:2.8; }
.sav1 .sav1-e.sav1-run{ stroke-dasharray:6 4; animation:sav1-dash 1s linear infinite; }
@keyframes sav1-dash{ to{ stroke-dashoffset:-20; } }
.sav1 .sav1-mk{ fill:var(--graphite); } .sav1 .sav1-mkk{ fill:var(--fig-k); }
.sav1-tabs{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.sav1-tabs .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:30px; }
.sav1-tabs > b{ width:100%; text-align:center; font-size:.8rem; color:var(--graphite); }
.sav1-note{ text-align:center; font-size:.84rem; color:var(--graphite); margin:6px 0 0; line-height:1.4; }
/* warehouse */
.sav1-wh{ display:grid; gap:4px; max-width:420px; margin:0 auto; }
.sav1-wh .sav1-lane{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:2px; }
.sav1 .sav1-box{ fill:color-mix(in srgb, var(--fig-k) 45%, var(--paper)); stroke:var(--fig-k); stroke-width:1; }
.sav1 .sav1-new{ animation:sav1-in .5s ease-out; transform-box:fill-box; transform-origin:center; }
@keyframes sav1-in{ from{ opacity:0; transform:scale(.3); } to{ opacity:1; transform:scale(1); } }
.sav1-map{ width:100%; max-width:420px; margin:8px auto 0; border-collapse:collapse; font-size:.84rem; color:var(--ink); }
.sav1-map th, .sav1-map td{ border-bottom:1px solid var(--line); padding:4px 6px; text-align:left; vertical-align:top; line-height:1.35; transition:background .4s; }
.sav1-map th{ font-size:.8rem; color:var(--graphite); }
.sav1-map tr.on td{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.sav1-btns{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:10px 0 0; }
/* CBIS */
.sav1-cb{ display:grid; grid-template-columns:minmax(0,1fr) 16px minmax(0,1fr) 16px minmax(0,1fr); gap:8px 2px; align-items:center; max-width:420px; margin:0 auto; }
.sav1-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 5px; text-align:center; font-size:.88rem; line-height:1.3; color:var(--ink); transition:opacity .45s, box-shadow .45s, background .45s; }
.sav1-card b{ display:block; } .sav1-card small{ display:block; font-size:.8rem; color:var(--graphite); margin-top:2px; }
.sav1-card.on{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); }
.sav1-card.off{ opacity:.18; }
.sav1-ar{ text-align:center; color:var(--fig-k); font-weight:700; font-size:1rem; transition:opacity .45s; }
.sav1-ar.off{ opacity:.15; }
.sav1-out{ grid-column:1 / -1; justify-self:center; min-width:60%; }
/* chains */
.sav1-ch{ display:grid; gap:4px; max-width:340px; margin:0 auto; }
.sav1-ch .sav1-ar{ line-height:1; }
.sav1-pr{ display:grid; grid-template-columns:minmax(0,1fr) 16px minmax(0,1fr); gap:4px 2px; align-items:center; }
/* UML */
.sav1-uml{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; max-width:420px; margin:0 auto; }
.sav1-uml .sav1-root{ grid-column:1 / -1; justify-self:center; min-width:55%; }
.sav1-uml .sav1-sub{ margin-top:6px; border-style:dashed; }
.sav1-uml .sav1-wide{ grid-column:1 / -1; }
.sav1-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:4px; }
.sav1-chips span{ border:1px solid var(--line); border-radius:99px; padding:2px 10px; font-size:.86rem; background:var(--paper); }
.sav1-sw{ display:inline-block; width:11px; height:11px; border-radius:3px; margin-right:5px; vertical-align:-1px; border:1px solid var(--graphite); }
@media (prefers-reduced-motion: reduce){ .sav1 .sav1-n, .sav1 .sav1-e, .sav1 .sav1-nf, .sav1 .sav1-fade, .sav1-card, .sav1-ar, .sav1-map td{ transition:none; } .sav1 .sav1-e.sav1-run, .sav1 .sav1-new{ animation:none; } }
`;
  if (!document.getElementById('sav1-css')) { const s = document.createElement('style'); s.id = 'sav1-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── drawing kit: boxes, parallelograms, cylinders, solid (data) and dashed (information) arrows ── */
  const Mk = () => html`<defs>
    <marker id="sav1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L10,5 L0,9 z" className="sav1-mk" /></marker>
    <marker id="sav1-ak" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,1 L10,5 L0,9 z" className="sav1-mkk" /></marker></defs>`;
  // st: 0 faded, 1 normal, 2 highlighted
  const E = ({ d, info, st = 1, run, both }) => {
    const hot = st === 2, mv = hot && (info || run) && !calm();
    const m = 'url(#' + (hot ? 'sav1-ak' : 'sav1-a') + ')';
    return html`<path d=${d} className=${'sav1-e' + (info ? ' sav1-i' : '') + (hot ? ' sav1-hot' : '') + (mv ? ' sav1-run' : '') + (st === 0 ? ' sav1-dim' : '')} markerEnd=${m} markerStart=${both ? m : null} />`;
  };
  function Nd({ x, y, w, h, t, st = 1, sh = 'r' }) {
    let shape;
    if (sh === 'p') shape = html`<path d=${`M${x + 9} ${y} H${x + w} L${x + w - 9} ${y + h} H${x} Z`} className="sav1-nf" />`;
    else if (sh === 'db') { const ry = 7; shape = html`<g><path d=${`M${x} ${y + ry} V${y + h - ry} A${w / 2} ${ry} 0 0 0 ${x + w} ${y + h - ry} V${y + ry}`} className="sav1-nf" /><ellipse cx=${x + w / 2} cy=${y + ry} rx=${w / 2} ry=${ry} className="sav1-nf" /></g>`; }
    else if (sh === 'pill') shape = html`<rect x=${x} y=${y} width=${w} height=${h} rx=${h / 2} className="sav1-nf" />`;
    else shape = html`<rect x=${x} y=${y} width=${w} height=${h} rx="6" className="sav1-nf" />`;
    const cy = y + h / 2 + (sh === 'db' ? 4 : 0), y0 = cy - (t.length - 1) * 7.5 + 4.5;
    return html`<g className=${'sav1-n' + (st === 0 ? ' sav1-dim' : st === 2 ? ' sav1-hot' : '')}>${shape}${t.map((s, k) => html`<text key=${k} x=${x + w / 2} y=${y0 + k * 15} textAnchor="middle">${s}</text>`)}</g>`;
  }
  const Lb = ({ x, y, t, a = 'middle', st = 1, c = '' }) => html`<text x=${x} y=${y} textAnchor=${a} className=${'sav1-fl sav1-fade ' + c + (st === 0 ? ' sav1-dim' : '')}>${t}</text>`;
  const Tabs = ({ items, cur, set, title }) => html`<div className="sav1-tabs">${title && html`<b>${title}</b>`}${items.map((t, j) => html`<button key=${j} className=${'fig-btn' + (cur === j ? ' sav1-on' : '')} onClick=${() => set(j)}>${t}</button>`)}</div>`;
  const Legend = () => html`<p className="sav1-note">${'━━ Data'}   ${'╍╍ Information'}</p>`;

  /* ── slide 3, Figure 1.7: the physical system of the firm, and the IS that controls and monitors it ── */
  function L1Firm({ ar }) {
    const steps = [
      { en: '<b>Figure 1.7</b>, the physical system of the firm: <b>input resources</b> come in...', ar: 'الـ <bdi dir="ltr">Figure 1.7</bdi> بتوضّح الـ physical system بتاع الشركة، الأول الـ <b>input resources</b> بتدخل...' },
      { en: '...a <b>transformation process</b> transforms them...', ar: 'وبعدها الـ <b>transformation process</b> بتحوّلهم...' },
      { en: '...into <b>output resources</b>.', ar: 'لحد ما يطلعوا <b>output resources</b>.' },
      { en: 'An <b>information system</b> is a conceptual system that enables managers to <b>control and monitor</b> these physical systems.', ar: 'الـ <b>information system</b> هو conceptual system بيخلّي المديرين <b>يتحكموا ويراقبوا</b> (control and monitor) الـ physical systems دي.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const s = k => i === k ? 2 : 1;
    return html`<figure className="fig sav1"><div className="fig-stage">
      <svg viewBox="0 0 280 232" className="sav1-svg" role="img" aria-label="Input resources, transformation process, output resources, controlled and monitored by the information system"><${Mk} />
        <text x="6" y="16" className="sav1-gt">Physical system of the firm</text>
        <rect x="4" y="24" width="140" height="202" rx="10" className="sav1-area" />
        <${Nd} x=${18} y=${38} w=${112} h=${44} t=${['Input', 'resources']} sh="p" st=${s(0)} />
        <${E} d="M74 82 V102" st=${i === 1 ? 2 : 1} run=${true} />
        <${Nd} x=${18} y=${104} w=${112} h=${44} t=${['Transformation', 'process']} st=${s(1)} />
        <${E} d="M74 148 V168" st=${i === 2 ? 2 : 1} run=${true} />
        <${Nd} x=${18} y=${170} w=${112} h=${44} t=${['Output', 'resources']} sh="p" st=${s(2)} />
        <g className=${'sav1-fade' + (i >= 3 ? '' : ' sav1-dim')}>
          <${Nd} x=${196} y=${100} w=${80} h=${52} t=${['Information', 'system']} st=${i >= 3 ? 2 : 1} />
          <${E} d="M194 116 H148" st=${i >= 3 ? 2 : 1} info=${true} />
          <${E} d="M148 140 H194" st=${i >= 3 ? 2 : 1} info=${true} />
          <${Lb} x=${171} y=${108} t="control" />
          <${Lb} x=${171} y=${162} t="monitor" />
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 4: system, purposive system, open system, and the input / process / output cycle ── */
  function L1OpenSystem({ ar }) {
    const steps = [
      { en: 'A <b>system</b> is a set of interrelated elements.', ar: 'الـ <b>System</b> هو مجموعة عناصر مرتبطة ببعض (interrelated elements).' },
      { en: 'A <b>purposive system</b> is a system that seeks a set of related goals.', ar: 'الـ <b>Purposive system</b> هو system بيسعى لمجموعة goals مرتبطة ببعض.' },
      { en: 'An <b>open system</b> interacts with an environment: a user types a command and the computer responds with a display of data.', ar: 'الـ <b>Open system</b> بيتفاعل مع environment، يعني الـ user يكتب command والكمبيوتر يرد بعرض داتا.' },
      { en: 'So an <b>information system</b> is an open, purposive system that produces information using the <b>input / process / output</b> cycle.', ar: 'يبقى الـ <b>information system</b> هو system من النوع الـ open والـ purposive، وبيطلّع information باستخدام دورة الـ <bdi dir="ltr">input / process / output</bdi>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const ipo = i === 3 ? 2 : 1;
    return html`<figure className="fig sav1"><div className="fig-stage">
      <svg viewBox="0 0 280 226" className="sav1-svg" role="img" aria-label="A system of interrelated elements with goals and an environment"><${Mk} />
        <${Nd} x=${90} y=${4} w=${100} h=${28} t=${['Goals']} sh="pill" st=${i === 1 ? 2 : i > 1 ? 1 : 0} />
        <${E} d="M140 52 V34" st=${i === 1 ? 2 : i > 1 ? 1 : 0} />
        <${Lb} x=${148} y=${47} t="seeks" a="start" st=${i >= 1 ? 1 : 0} />
        <rect x="8" y="54" width="264" height="90" rx="10" className="sav1-area" />
        <text x="16" y="72" className="sav1-gt">System</text>
        <${Nd} x=${16} y=${84} w=${70} h=${34} t=${['Input']} st=${ipo} />
        <${E} d="M86 101 H103" st=${ipo} run=${true} />
        <${Nd} x=${105} y=${84} w=${70} h=${34} t=${['Process']} st=${ipo} />
        <${E} d="M175 101 H192" st=${ipo} run=${true} />
        <${Nd} x=${194} y=${84} w=${70} h=${34} t=${['Output']} st=${ipo} />
        <${Nd} x=${96} y=${172} w=${88} h=${30} t=${['User']} st=${i === 2 ? 2 : i > 2 ? 1 : 0} />
        <${E} d="M96 187 H51 V120" st=${i === 2 ? 2 : i > 2 ? 1 : 0} />
        <${E} d="M229 118 V187 H186" st=${i === 2 ? 2 : i > 2 ? 1 : 0} />
        <${Lb} x=${56} y=${162} t="command" a="start" st=${i >= 2 ? 1 : 0} />
        <${Lb} x=${224} y=${162} t="display" a="end" st=${i >= 2 ? 1 : 0} />
        <text x="140" y="220" textAnchor="middle" className=${'sav1-gt sav1-fade' + (i >= 2 ? '' : ' sav1-dim')}>Environment (outside)</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 5 and 6: the warehouse, (a) physical system and (b) information system ── */
  function L1Warehouse({ ar }) {
    const [n, setN] = useState(3), [last, setLast] = useState(null), [tick, setTick] = useState(0);
    const MAX = 10;
    const go = d => { setN(x => x + d); setLast(d > 0 ? 'in' : 'out'); setTick(t => t + 1); };
    const intro = { en: 'The warehouse example. Tap a button: every movement of goods in the <b>physical system</b> (a) is represented by a document and a record in the <b>information system</b> (b).', ar: 'ده مثال المخزن. دوس على زرار، وكل حركة بضاعة في الـ <b>physical system</b> (الرسمة a) ليها document و record بيمثّلوها في الـ <b>information system</b> (الرسمة b).' };
    const cin = { en: `Goods come in from the supplier. In the information system a <b>purchase order</b> went to the supplier and the <b>bill</b> represents the goods coming in; the <b>inventory</b> record now shows ${n} packets, like the pile in the warehouse.`, ar: `البضاعة دخلت من الـ supplier. في الـ information system الـ <b>purchase order</b> راح للـ supplier والـ <b>bill</b> بيمثّل البضاعة الداخلة، والـ <b>inventory</b> record بقى فيه <bdi dir="ltr">${n}</bdi> كراتين زي الكومة اللي في المخزن.` };
    const cout = { en: `Goods leave to the customer. The customer's <b>sales order</b> came in and the <b>shipping note</b> represents the goods leaving; the <b>inventory</b> record drops to ${n} packets.`, ar: `البضاعة خرجت للـ customer. الـ <b>sales order</b> جه من الـ customer والـ <b>shipping note</b> بيمثّل البضاعة الخارجة، والـ <b>inventory</b> record نزل لـ <bdi dir="ltr">${n}</bdi> كراتين.` };
    const c = last === 'in' ? cin : last === 'out' ? cout : intro;
    const hin = last === 'in' ? 2 : 1, hout = last === 'out' ? 2 : 1;
    const boxes = Array.from({ length: n }, (_, k) => html`<rect key=${k + '-' + (k === n - 1 && last === 'in' ? tick : 0)} x=${104 + (k % 5) * 15} y=${k < 5 ? 62 : 47} width="12" height="12" rx="2" className=${'sav1-box' + (k === n - 1 && last === 'in' ? ' sav1-new' : '')} />`);
    return html`<figure className="fig sav1"><div className="fig-stage"><div className="sav1-wh">
      <div className="sav1-lane"><svg viewBox="0 0 280 92" className="sav1-svg" role="img" aria-label="Physical system: supplier, warehouse, customer"><${Mk} />
        <text x="6" y="15" className="sav1-gt">(a) Physical system</text>
        <text x="29" y="58" textAnchor="middle">Supplier</text>
        <${E} d="M58 54 H94" st=${hin} />
        <${Lb} x=${76} y=${46} t="Goods" />
        <rect x="96" y="22" width="88" height="62" rx="6" className="sav1-nf" />
        <text x="140" y="38" textAnchor="middle">Warehouse</text>
        ${boxes}
        <${E} d="M186 54 H222" st=${hout} />
        <${Lb} x=${204} y=${46} t="Goods" />
        <text x="251" y="58" textAnchor="middle">Customer</text>
      </svg></div>
      <div className="sav1-lane"><svg viewBox="0 0 280 108" className="sav1-svg" role="img" aria-label="Information system: purchase order and bill with the supplier, inventory record, sales order and shipping note with the customer"><${Mk} />
        <text x="6" y="15" className="sav1-gt">(b) Information system</text>
        <${Lb} x=${6} y=${36} t="bill" a="start" c=${last === 'in' ? 'sav1-kt' : ''} />
        <${Lb} x=${276} y=${36} t="Shipping note" a="end" c=${last === 'out' ? 'sav1-kt' : ''} />
        <text x="29" y="66" textAnchor="middle">Supplier</text>
        <${E} d="M58 48 H94" st=${hin} />
        <${E} d="M94 78 H58" st=${hin} />
        <g className=${'sav1-n' + (last ? ' sav1-hot' : '')}><rect x="96" y="30" width="88" height="60" rx="6" className="sav1-nf" /></g>
        <text x="140" y="50" textAnchor="middle">Inventory</text>
        <text x="140" y="76" textAnchor="middle" className="sav1-big">${n} packets</text>
        <${E} d="M186 48 H222" st=${hout} />
        <${E} d="M222 78 H186" st=${hout} />
        <text x="251" y="66" textAnchor="middle">Customer</text>
        <${Lb} x=${4} y=${103} t="Purchase order" a="start" c=${last === 'in' ? 'sav1-kt' : ''} />
        <${Lb} x=${276} y=${103} t="Sales order" a="end" c=${last === 'out' ? 'sav1-kt' : ''} />
      </svg></div></div>
      <div className="sav1-btns">
        <button className="fig-btn solid" onClick=${() => go(1)} disabled=${n >= MAX}>Goods come in</button>
        <button className="fig-btn solid" onClick=${() => go(-1)} disabled=${n <= 0}>Goods go out</button>
        <button className="fig-btn" onClick=${() => { setN(3); setLast(null); }}>↻ Reset</button>
      </div>
      <table className="sav1-map"><thead><tr><th>Information system</th><th>represents (physical system)</th></tr></thead><tbody>
        <tr className=${last ? 'on' : ''}><td>the inventory</td><td>goods in the warehouse</td></tr>
        <tr className=${last === 'in' ? 'on' : ''}><td>the bill</td><td>goods coming in</td></tr>
        <tr className=${last === 'out' ? 'on' : ''}><td>the shipping note</td><td>goods leaving</td></tr>
      </tbody></table></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  /* ── slides 8 and 9: physical and information systems as subsystems of the organization ── */
  function L1Subsystems({ ar }) {
    const steps = [
      { en: 'The physical system and the information system can both be regarded as <b>subsystems</b> of a larger organization system. The information system is a model of the physical system...', ar: 'الـ physical system والـ information system ينفع نعتبرهم الاتنين <b>subsystems</b> من organization system أكبر. والـ information system هو model للـ physical system...' },
      { en: '...but it also <b>interacts</b> with it. Inputs from the physical system are usually <b>observations</b>, e.g. the actual number of packets on the shelf.', ar: 'بس كمان <b>بيتفاعل</b> معاه. الـ Inputs اللي جاية من الـ physical system غالبًا بتبقى <b>observations</b>، زي العدد الفعلي للكراتين اللي على الرف.' },
      { en: 'Outputs back to the physical system are <b>actions needed</b>, e.g. the shipping note implies an instruction to load certain goods onto a truck and drive it to a destination.', ar: 'والـ Outputs اللي راجعة للـ physical system بتبقى <b>actions needed</b>، زي الـ shipping note اللي معناها أمر إن بضاعة معينة تتحمّل على عربية وتروح لمكان معين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    return html`<figure className="fig sav1"><div className="fig-stage">
      <svg viewBox="0 0 280 214" className="sav1-svg" role="img" aria-label="Organization containing the physical system and the information system, with observations and actions needed"><${Mk} />
        <text x="6" y="15" className="sav1-gt">Organization (system)</text>
        <rect x="4" y="22" width="272" height="186" rx="10" className="sav1-area" />
        <${Nd} x=${20} y=${52} w=${100} h=${44} t=${['Physical', 'system']} st=${i === 0 || i === 2 ? 2 : 1} />
        <${Nd} x=${160} y=${134} w=${104} h=${44} t=${['Information', 'system']} st=${i <= 1 ? 2 : 1} />
        <${E} d="M120 66 H212 V132" st=${i === 1 ? 2 : i > 1 ? 1 : 0} run=${true} />
        <${Lb} x=${166} y=${58} t="observations" st=${i >= 1 ? 1 : 0} c=${i === 1 ? 'sav1-kt' : ''} />
        <${E} d="M160 164 H70 V98" st=${i === 2 ? 2 : 0} run=${true} />
        <${Lb} x=${114} y=${188} t="actions needed" st=${i >= 2 ? 1 : 0} c=${i === 2 ? 'sav1-kt' : ''} />
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 7: components of an IS (people, procedures, data) and of a CBIS (+ programs, computers) ── */
  function L1Cbis({ ar }) {
    const [m, setM] = useState(0);
    const caps = [
      { en: 'Components of an <b>information system</b>: people, procedures and data. People follow procedures to manipulate data to produce information.', ar: 'الـ Components بتاعة الـ <b>information system</b> هي الـ people والـ procedures والـ data. الناس بتمشي على الـ procedures عشان تتعامل مع الداتا وتطلّع information.' },
      { en: 'A <b>Computer-Based Information System</b> (CBIS) has five: people, procedures, data, <b>programs</b> and <b>computers</b>. Programs are instructions for the computers just as procedures are instructions for people.', ar: 'الـ <b>Computer-Based Information System</b> (الـ CBIS) فيه خمسة، الـ people والـ procedures والـ data والـ <b>programs</b> والـ <b>computers</b>. الـ programs هي تعليمات للكمبيوتر زي ما الـ procedures تعليمات للناس.' }
    ];
    const cb = m === 1;
    return html`<figure className="fig sav1"><div className="fig-stage">
      <${Tabs} items=${['Information system (3)', 'CBIS (5)']} cur=${m} set=${setM} />
      <div className="sav1-cb">
        <div className="sav1-card" style=${{ gridRow: 1, gridColumn: 1 }}><b>People</b></div>
        <div className="sav1-ar" style=${{ gridRow: 1, gridColumn: 2 }}>→</div>
        <div className="sav1-card" style=${{ gridRow: 1, gridColumn: 3 }}><b>Procedures</b><small>instructions for people</small></div>
        <div className="sav1-ar" style=${{ gridRow: 1, gridColumn: 4 }}>→</div>
        <div className="sav1-card" style=${{ gridRow: '1 / span 2', gridColumn: 5, alignSelf: 'stretch', display: 'grid', placeItems: 'center' }}><b>Data</b></div>
        <div className=${'sav1-card' + (cb ? ' on' : ' off')} style=${{ gridRow: 2, gridColumn: 1 }}><b>Computers</b></div>
        <div className=${'sav1-ar' + (cb ? '' : ' off')} style=${{ gridRow: 2, gridColumn: 2 }}>→</div>
        <div className=${'sav1-card' + (cb ? ' on' : ' off')} style=${{ gridRow: 2, gridColumn: 3 }}><b>Programs</b><small>instructions for computers</small></div>
        <div className=${'sav1-ar' + (cb ? '' : ' off')} style=${{ gridRow: 2, gridColumn: 4 }}>→</div>
        <div className="sav1-ar sav1-out" style=${{ gridRow: 3 }}>↓</div>
        <div className="sav1-card sav1-out on" style=${{ gridRow: 4 }}><b>Information</b></div>
      </div></div>
      <${Cap} ...${caps[m]} showAr=${ar} /></figure>`;
  }

  /* ── slides 16 and 17: an event keyed in as a transaction and processed against TPS data ── */
  const TPS_EX = [
    { tab: 'Ticket reservation', sys: 'ticket reservation system', ev: { en: 'a request for a concert ticket', ar: 'طلب تذكرة حفلة' }, data: { en: 'the location of the available seats', ar: 'أماكن الكراسي الفاضية' } },
    { tab: 'Order entry', sys: 'order entry system', ev: { en: 'an order request', ar: 'طلب order' }, data: { en: 'a list of available products, their prices and related data', ar: 'لستة المنتجات المتاحة وأسعارها والداتا المرتبطة بيها' } },
    { tab: 'Check processing', sys: 'check processing system', ev: { en: 'the presentation of a check for payment', ar: 'تقديم شيك عشان يتصرف' }, data: { en: 'account balances, customer lists and other data', ar: 'أرصدة الحسابات ولستة العملاء وداتا تانية' } }
  ];
  function L1TpsEventRun({ x, ar }) {
    const steps = [
      { en: `The <b>event</b> in a ${x.sys}: ${x.ev.en}.`, ar: `الـ <b>event</b> في الـ ${x.sys} هنا هو ${x.ev.ar}.` },
      { en: 'The event is recorded by <b>keying it in</b> as a <b>transaction</b>: the transaction is a representation of the event.', ar: 'الـ event بيتسجل بإنه <b>يتكتب</b> على الكمبيوتر كـ <b>transaction</b>، يعني الـ transaction هي representation للـ event.' },
      { en: 'One or more <b>TPS programs</b> process the transaction...', ar: 'وبرنامج TPS أو أكتر (الـ <b>TPS programs</b>) بيعالج الـ transaction...' },
      { en: `...against the <b>TPS data</b>: here, ${x.data.en}.`, ar: `على الـ <b>TPS data</b>، واللي هنا هي ${x.data.ar}.` }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const C = (k, t, s) => html`<div className=${'sav1-card' + (i === k ? ' on' : i < k ? ' off' : '')}><b>${t}</b>${s && html`<small>${s}</small>`}</div>`;
    const A = k => html`<div className=${'sav1-ar' + (i < k ? ' off' : '')}>↓</div>`;
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}><div className="sav1-ch">
      ${C(0, 'Event', x.ev.en)}${A(1)}${C(1, 'Transaction', 'keyed in: a representation of the event')}${A(2)}${C(2, 'TPS program(s)', 'process the transaction')}${A(3)}${C(3, 'TPS data', x.data.en)}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function L1TpsEvent({ ar }) {
    const [e, setE] = useState(0);
    return html`<figure className="fig sav1"><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Tabs} items=${TPS_EX.map(x => x.tab)} cur=${e} set=${setE} /></div>
      <${L1TpsEventRun} key=${e} x=${TPS_EX[e]} ar=${ar} /></figure>`;
  }

  /* ── slide 15, Figure 1.8: a model of a transaction processing system ── */
  function L1TpsModel({ ar }) {
    const steps = [
      { en: '<b>Figure 1.8</b>, a model of a TPS. At the bottom is the firm\'s physical system: input physical resources, transform, output physical resources.', ar: 'الـ <bdi dir="ltr">Figure 1.8</bdi> فيها model للـ TPS. تحت خالص الـ physical system بتاع الشركة، يعني الـ input physical resources وبعدها الـ transform وبعدها الـ output physical resources.' },
      { en: 'The TPS <b>gathers data</b> (solid lines) from the firm\'s physical system and from the environment and enters it into its <b>database</b>.', ar: 'الـ TPS <b>بيجمع data</b> (الخطوط المتصلة) من الـ physical system بتاع الشركة ومن الـ environment ويدخّلها في الـ <b>database</b> بتاعته.' },
      { en: 'The <b>data processing software</b> transforms the data into <b>information</b>.', ar: 'الـ <b>data processing software</b> بيحوّل الداتا لـ <b>information</b>.' },
      { en: 'The information (dashed lines) goes to the firm\'s <b>management</b>...', ar: 'الـ information (الخطوط المتقطعة) بتروح للإدارة (الـ <b>management</b>) بتاعة الشركة...' },
      { en: '...and to other individuals in the firm\'s <b>environment</b>.', ar: 'وكمان لناس تانية في الـ <b>environment</b> بتاع الشركة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const at = k => i === k ? 2 : i > k ? 1 : 0;
    return html`<figure className="fig sav1"><div className="fig-stage">
      <svg viewBox="0 0 280 344" className="sav1-svg" role="img" aria-label="Figure 1.8: a model of a transaction processing system"><${Mk} />
        <text x="6" y="14" className="sav1-gt">Environment</text>
        <${Nd} x=${92} y=${20} w=${96} h=${28} t=${['Management']} st=${at(3)} />
        <rect x="24" y="66" width="232" height="170" rx="8" className="sav1-area" />
        ${['Transaction', 'processing', 'system'].map((t, k) => html`<text key=${k} x="30" y=${202 + k * 14} className="sav1-gt">${t}</text>`)}
        <${Nd} x=${85} y=${96} w=${110} h=${38} t=${['Data processing', 'software']} st=${at(2)} />
        <${Nd} x=${108} y=${152} w=${64} h=${44} t=${['Database']} sh="db" st=${at(1) === 2 ? 2 : i > 1 ? 1 : 0} />
        <${E} d="M140 152 V136" st=${at(2)} />
        <${E} d="M85 115 H6" info=${true} st=${at(4)} />
        <${E} d="M195 115 H274" info=${true} st=${at(4)} />
        <${E} d="M140 96 V50" info=${true} st=${at(3)} />
        <${E} d="M4 176 H106" st=${at(1)} />
        <${E} d="M276 176 H174" st=${at(1)} />
        <path d="M46 252 V244 H234 V252" className=${'sav1-e' + (i === 1 ? ' sav1-hot' : '') + (i < 1 ? ' sav1-dim' : '')} />
        <${E} d="M140 244 V198" st=${at(1)} />
        <circle cx="140" cy="244" r="4" className="sav1-mkk" />
        <${Nd} x=${6} y=${252} w=${80} h=${50} t=${['Input', 'physical', 'resources']} sh="p" st=${i === 0 ? 2 : 1} />
        <${E} d="M86 277 H102" st=${i === 0 ? 2 : 1} run=${true} />
        <${Nd} x=${104} y=${258} w=${72} h=${38} t=${['Transform']} st=${i === 0 ? 2 : 1} />
        <${E} d="M176 277 H192" st=${i === 0 ? 2 : 1} run=${true} />
        <${Nd} x=${194} y=${252} w=${80} h=${50} t=${['Output', 'physical', 'resources']} sh="p" st=${i === 0 ? 2 : 1} />
        <text x="6" y="322" className="sav1-gt">Environment</text>
      </svg><${Legend} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 18 and 19, Figure 1.9: an MIS model (and the IOS) ── */
  function L1MisModel({ ar }) {
    const steps = [
      { en: '<b>Figure 1.9</b>, an MIS model: data from the <b>environment</b> enter a <b>database</b>.', ar: 'الـ <bdi dir="ltr">Figure 1.9</bdi> فيها MIS model. الداتا من الـ <b>environment</b> بتدخل <b>database</b>.' },
      { en: 'The typical MIS modules, <b>report-writing software</b> and <b>mathematical models</b> that simulate firm operations, draw on the database: the MIS transforms the data of frontline systems such as the TPS.', ar: 'الـ modules المعتادة في الـ MIS، يعني الـ <b>report-writing software</b> والـ <b>mathematical models</b> اللي بتعمل simulation لشغل الشركة، بتاخد من الـ database. يعني الـ MIS بيحوّل داتا الـ frontline systems زي الـ TPS.' },
      { en: 'They produce <b>information</b> (dashed) for the <b>organizational problem solvers</b>, who use it as an aid in decision making.', ar: 'وبيطلّعوا <b>information</b> (الخطوط المتقطعة) للـ <b>organizational problem solvers</b>، اللي بيستخدموها كمساعدة في اتخاذ القرار.' },
      { en: 'In an <b>inter-organizational information system</b> (IOS) with suppliers or others, the MIS also supplies information to the other members of the IOS.', ar: 'ولو الشركة عاملة <b>inter-organizational information system</b> (الـ IOS) مع الـ suppliers أو غيرهم، الـ MIS بيدّي information كمان لباقي أعضاء الـ IOS.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const at = k => i === k ? 2 : i > k ? 1 : 0;
    return html`<figure className="fig sav1"><div className="fig-stage">
      <svg viewBox="0 0 280 300" className="sav1-svg" role="img" aria-label="Figure 1.9: an MIS model"><${Mk} />
        <text x="6" y="13" className="sav1-gt">Environment</text>
        <${Nd} x=${10} y=${20} w=${134} h=${42} t=${['Organizational', 'problem solvers']} st=${at(2)} />
        <${Nd} x=${166} y=${20} w=${104} h=${42} t=${['Other IOS', 'members']} st=${i === 3 ? 2 : 0} />
        <rect x="8" y="78" width="264" height="184" rx="10" className="sav1-area" />
        ${['Management', 'information', 'system'].map((t, k) => html`<text key=${k} x="14" y=${206 + k * 14} className="sav1-gt">${t}</text>`)}
        <${Nd} x=${22} y=${108} w=${108} h=${40} t=${['Report writing', 'software']} st=${at(1)} />
        <${Nd} x=${150} y=${108} w=${108} h=${40} t=${['Mathematical', 'models']} st=${at(1)} />
        <${Nd} x=${102} y=${184} w=${76} h=${48} t=${['Database']} sh="db" st=${i === 0 ? 2 : 1} />
        <${E} d="M112 188 V150" st=${at(1)} />
        <${E} d="M168 188 V150" st=${at(1)} />
        <${E} d="M76 108 V64" info=${true} st=${at(2)} />
        <${E} d="M188 108 V88 H118 V64" info=${true} st=${at(2)} />
        <${E} d="M236 108 V64" info=${true} st=${i === 3 ? 2 : 0} />
        <${E} d="M128 284 V234" st=${i === 0 ? 2 : 1} />
        <${E} d="M152 284 V234" info=${true} st=${i === 0 ? 2 : 1} />
        <text x="6" y="296" className="sav1-gt">Environment</text>
      </svg><${Legend} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 21 and 22, Figure 1.10: a DSS model, its three information sources and outputs ── */
  const DSS_SRC = [
    { k: 'Relational database', eng: 'Relational database management system', tools: [['Report writing software', 'Periodic and special reports'], ['Mathematical models', 'Outputs from mathematical models'], ['Groupware', 'Outputs from groupware']] },
    { k: 'Knowledge base', eng: 'Inference engine', tools: [[null, 'Solutions and explanations']] },
    { k: 'Multidimensional database', eng: 'Multidimensional database management system', tools: [[null, 'Outputs from OLAP']] }
  ];
  function L1DssModel({ ar }) {
    const steps = [
      { en: '<b>Figure 1.10</b>, a DSS model. Source 1: a <b>relational database</b> and its management system feed report-writing software, mathematical models and groupware, giving periodic and special reports, outputs from mathematical models and outputs from groupware.', ar: 'الـ <bdi dir="ltr">Figure 1.10</bdi> فيها DSS model. المصدر الأول هو الـ <b>relational database</b>، والـ management system بتاعتها بتغذّي الـ report-writing software والـ mathematical models والـ groupware، فيطلع periodic و special reports، و outputs من الـ mathematical models، و outputs من الـ groupware.' },
      { en: 'Source 2: a <b>knowledge base</b>, used by an <b>inference engine</b>, gives <b>solutions and explanations</b>.', ar: 'المصدر التاني هو الـ <b>knowledge base</b>، والـ <b>inference engine</b> بيستخدمها ويطلّع <b>solutions and explanations</b>.' },
      { en: 'Source 3: a <b>multidimensional database</b> and its management system give <b>outputs from OLAP</b>.', ar: 'المصدر التالت هو الـ <b>multidimensional database</b>، والـ management system بتاعتها بتطلّع <b>outputs من الـ OLAP</b>.' },
      { en: 'All these outputs go to the <b>DSS users</b>: managers making decisions to solve a specific problem.', ar: 'كل الـ outputs دي بتروح للـ <b>DSS users</b>، يعني المديرين اللي بياخدوا قرارات عشان يحلّوا مشكلة معينة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const src = DSS_SRC[Math.min(i, 2)];
    const all = DSS_SRC.flatMap(s => s.tools.map(t => t[1]));
    return html`<figure className="fig sav1"><div className="fig-stage">
      <${Tabs} items=${DSS_SRC.map(s => s.k).concat('DSS users')} cur=${i} set=${ctl.go} title="Information sources" />
      ${i < 3 ? html`<div className="sav1-ch" key=${i}>
        <div className="sav1-card on"><b>${src.k}</b></div><div className="sav1-ar">↓</div>
        <div className="sav1-card"><b>${src.eng}</b></div><div className="sav1-ar">↓</div>
        ${src.tools.map(([t, o], k) => t ? html`<div key=${k} className="sav1-pr"><div className="sav1-card">${t}</div><div className="sav1-ar">→</div><div className="sav1-card on">${o}</div></div>` : html`<div key=${k} className="sav1-card on">${o}</div>`)}
        <div className="sav1-ar">↓</div><div className="sav1-card"><b>DSS users</b></div></div>`
      : html`<div className="sav1-ch">${all.map((o, k) => html`<div key=${k} className="sav1-card">${o}</div>`)}<div className="sav1-ar">↓</div><div className="sav1-card on"><b>DSS users</b></div></div>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 23, Figure 1.11: management level influences the source and the form of information ── */
  const LEVELS = ['Strategic planning', 'Management control', 'Operational control'];
  function L1LevelInfo({ ar }) {
    const [l, setL] = useState(-1);
    const caps = [
      { en: 'Strategic planning level: mostly <b>environmental</b> information, in <b>summary</b> form.', ar: 'مستوى الـ Strategic planning بياخد information أغلبها <b>environmental</b> وفي شكل <b>summary</b>.' },
      { en: 'Management control level: in between, a mix of environmental and internal information, of summary and detail.', ar: 'مستوى الـ Management control في النص، خليط من الـ environmental والـ internal ومن الـ summary والـ detail.' },
      { en: 'Operational control level: mostly <b>internal</b> information, in <b>detail</b>.', ar: 'مستوى الـ Operational control بياخد information أغلبها <b>internal</b> وفي شكل <b>detail</b>.' }
    ];
    const intro = { en: '<b>Figure 1.11</b>: the management level influences both the <b>source</b> and the <b>form</b> of information. Pick a level.', ar: 'الـ <bdi dir="ltr">Figure 1.11</bdi> بتوضّح إن المستوى الإداري بيأثر على <b>مصدر</b> الـ information وعلى <b>شكلها</b>. اختار مستوى.' };
    const panel = (y0, title, a, b) => html`<g>
      <text x="4" y=${y0 + 13} className="sav1-gt">${title}</text>
      ${LEVELS.map((t, k) => html`<g key=${k}>${l === k && html`<rect x="2" y=${y0 + 21 + k * 30} width="276" height="28" rx="4" className="sav1-nf" style=${{ fill: 'color-mix(in srgb, var(--fig-k) 14%, transparent)', stroke: 'var(--fig-k)', strokeWidth: 2 }} />`}
        <text x="6" y=${y0 + 40 + k * 30} className=${l === k ? 'sav1-kt' : ''}>${t}</text></g>`)}
      <path d=${`M134 ${y0 + 20} H274 L134 ${y0 + 110} Z`} style=${{ fill: 'color-mix(in srgb, var(--fig-k) 40%, var(--paper))' }} />
      <rect x="134" y=${y0 + 20} width="140" height="90" style=${{ fill: 'none', stroke: 'var(--graphite)', strokeWidth: 1.2 }} />
      <path d=${`M134 ${y0 + 50} H274 M134 ${y0 + 80} H274`} style=${{ stroke: 'var(--graphite)', strokeWidth: 1 }} />
      <text x="140" y=${y0 + 40} className=${l === 0 ? 'sav1-kt' : ''}>${a}</text>
      <text x="268" y=${y0 + 100} textAnchor="end" className=${l === 2 ? 'sav1-kt' : ''}>${b}</text></g>`;
    return html`<figure className="fig sav1"><div className="fig-stage">
      <${Tabs} items=${LEVELS} cur=${l} set=${setL} />
      <svg viewBox="0 0 280 238" className="sav1-svg" role="img" aria-label="Figure 1.11: influence of the management level on information source and form">
        ${panel(0, 'A. Influence on information source', 'Environmental', 'Internal')}
        ${panel(122, 'B. Influence on information form', 'Summary', 'Detail')}
      </svg></div>
      <${Cap} ...${l < 0 ? intro : caps[l]} showAr=${ar} /></figure>`;
  }

  /* ── slide 24, Figure 1.12: managers on all levels in all business areas ── */
  const AREAS = ['Finance', 'Human resources', 'Information services', 'Manufacturing', 'Marketing'];
  const AREA_FILL = ['color-mix(in srgb, var(--graphite) 30%, var(--paper))', 'color-mix(in srgb, var(--fig-k) 25%, var(--paper))', 'var(--paper)', 'color-mix(in srgb, var(--fig-k) 55%, var(--paper))', 'color-mix(in srgb, var(--graphite) 60%, var(--paper))'];
  function L1LevelAreas({ ar }) {
    const [sel, setSel] = useState(null); // ['a', k] or ['l', k]
    const AX = 198, AY = 8, BY = 214, BX0 = 120, BW = 156, hw = y => (y - AY) / (BY - AY) * (BW / 2);
    const Ys = [AY, AY + (BY - AY) / 3, AY + 2 * (BY - AY) / 3, BY];
    const xs = k => BX0 + k * BW / 5;
    const isA = sel && sel[0] === 'a', isL = sel && sel[0] === 'l';
    const band = k => { const y1 = Ys[k], y2 = Ys[k + 1]; return `M${AX - hw(y1)} ${y1} H${AX + hw(y1)} L${AX + hw(y2)} ${y2} H${AX - hw(y2)} Z`; };
    const intro = { en: '<b>Figure 1.12</b>: managers are found on <b>all levels</b> in <b>all business areas</b> of the firm. Tap an area or a level.', ar: 'الـ <bdi dir="ltr">Figure 1.12</bdi> بتوضّح إن فيه مديرين في <b>كل المستويات</b> وفي <b>كل الـ business areas</b> بتاعة الشركة. دوس على area أو مستوى.' };
    const capA = k => ({ en: `<b>${AREAS[k]}</b>: its slice runs through all three levels, so this area has strategic planning, management control and operational control managers.`, ar: `الـ <b>${AREAS[k]}</b> الشريحة بتاعتها معدّية على التلات مستويات، يعني فيها مديرين strategic planning و management control و operational control.` });
    const capL = k => ({ en: `<b>${LEVELS[k]}</b> level: the band crosses all five areas, so finance, human resources, information services, manufacturing and marketing each have managers at this level.`, ar: `مستوى الـ <b>${LEVELS[k]}</b> الشريط بتاعه معدّي على الخمس areas كلهم، يعني الـ finance والـ human resources والـ information services والـ manufacturing والـ marketing كلهم فيهم مديرين في المستوى ده.` });
    const c = !sel ? intro : isA ? capA(sel[1]) : capL(sel[1]);
    const lvLab = [['Strategic', 'planning'], ['Management', 'control'], ['Operational', 'control']];
    return html`<figure className="fig sav1"><div className="fig-stage">
      <svg viewBox="0 0 280 222" className="sav1-svg" role="img" aria-label="Figure 1.12: a pyramid of management levels split into five business areas">
        ${AREAS.map((a, k) => html`<path key=${k} d=${`M${AX} ${AY} L${xs(k)} ${BY} L${xs(k + 1)} ${BY} Z`} className="sav1-fade" style=${{ fill: AREA_FILL[k], stroke: 'var(--graphite)', strokeWidth: 1, opacity: isA && sel[1] !== k ? .2 : 1 }} onClick=${() => setSel(['a', k])} />`)}
        ${[1, 2].map(k => html`<path key=${k} d=${`M4 ${Ys[k]} H${AX + hw(Ys[k])}`} style=${{ stroke: 'var(--ink)', strokeWidth: 1.2, strokeDasharray: '5 4' }} />`)}
        ${lvLab.map((t, k) => html`<g key=${k} onClick=${() => setSel(['l', k])}>${t.map((s, j) => html`<text key=${j} x="4" y=${(Ys[k] + Ys[k + 1]) / 2 - 2 + j * 15} className=${isL && sel[1] === k ? 'sav1-kt' : ''}>${s}</text>`)}</g>`)}
        ${isL && html`<path d=${band(sel[1])} style=${{ fill: 'none', stroke: 'var(--fig-k)', strokeWidth: 3.5, strokeLinejoin: 'round' }} />`}
      </svg>
      <div className="sav1-tabs" style=${{ marginTop: 8 }}><b>Business areas</b>${AREAS.map((a, k) => html`<button key=${k} className=${'fig-btn' + (isA && sel[1] === k ? ' sav1-on' : '')} onClick=${() => setSel(['a', k])}><i className="sav1-sw" style=${{ background: AREA_FILL[k] }}></i>${a}</button>`)}</div>
      <div className="sav1-tabs"><b>Levels</b>${LEVELS.map((a, k) => html`<button key=${k} className=${'fig-btn' + (isL && sel[1] === k ? ' sav1-on' : '')} onClick=${() => setSel(['l', k])}>${a}</button>`)}</div>
      </div><${Cap} ...${c} showAr=${ar} /></figure>`;
  }

  /* ── slide 25, Figure 1.13: management level and the relative emphasis on the five functions ── */
  const FUNCS = ['Plan', 'Organize', 'Staff', 'Direct', 'Control'];
  const FUNC_FILL = ['color-mix(in srgb, var(--fig-k) 30%, var(--paper))', 'color-mix(in srgb, var(--fig-k) 48%, var(--paper))', 'var(--paper)', 'color-mix(in srgb, var(--fig-k) 14%, var(--paper))', 'color-mix(in srgb, var(--graphite) 22%, var(--paper))'];
  // slice sizes traced from the drawing of Figure 1.13 (the slide prints no numbers)
  const SHARES = [[.38, .25, .08, .15, .14], [.20, .32, .10, .26, .12], [.12, .13, .20, .33, .22]];
  function L1Functions({ ar }) {
    const [l, setL] = useState(0), [sh, setSh] = useState(SHARES[0]), cur = useRef(SHARES[0]);
    useEffect(() => {
      const from = cur.current, to = SHARES[l];
      if (calm()) { cur.current = to; setSh(to); return; }
      let raf, t0 = performance.now();
      const f = now => { const t = Math.min(1, (now - t0) / 650), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; const v = from.map((a, k) => a + (to[k] - a) * e); cur.current = v; setSh(v); if (t < 1) raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
    }, [l]);
    const cx = 140, cy = 96, r = 84, P = (a, rr) => [cx + rr * Math.sin(a), cy - rr * Math.cos(a)];
    let a0 = 0;
    const slices = sh.map((s, k) => { const a1 = a0 + s * 2 * Math.PI, [x1, y1] = P(a0, r), [x2, y2] = P(a1, r), mid = (a0 + a1) / 2, big = s > .5 ? 1 : 0; const out = { k, d: `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${big} 1 ${x2} ${y2} Z`, lab: s >= .11 ? P(mid, r * .6) : P(mid, r + 16), inside: s >= .11 }; a0 = a1; return out; });
    const caps = [
      { en: 'Strategic planning level: most effort goes to <b>planning</b>, then <b>organizing</b>.', ar: 'مستوى الـ Strategic planning بيصرف أغلب المجهود في الـ <b>planning</b>، وبعدها الـ <b>organizing</b>.' },
      { en: 'Management control level: the biggest slices are <b>organizing</b> and <b>directing</b>, with planning next.', ar: 'مستوى الـ Management control أكبر شرايحه هي الـ <b>organizing</b> والـ <b>directing</b>، وبعدهم الـ planning.' },
      { en: 'Operational control level: most effort goes to <b>directing</b> and <b>controlling</b>.', ar: 'مستوى الـ Operational control بيصرف أغلب المجهود في الـ <b>directing</b> والـ <b>controlling</b>.' }
    ];
    const note = { en: ' (Slice sizes traced from Figure 1.13: the slide gives no numbers.)', ar: ' (أحجام الشرايح متاخدة من رسمة الـ <bdi dir="ltr">Figure 1.13</bdi>، والـ slide مفيهاش أرقام.)' };
    return html`<figure className="fig sav1"><div className="fig-stage">
      <${Tabs} items=${LEVELS.map(t => t + ' level')} cur=${l} set=${setL} />
      <svg viewBox="0 0 280 196" className="sav1-svg" style=${{ maxWidth: 340 }} role="img" aria-label=${'Figure 1.13: pie of management functions at the ' + LEVELS[l] + ' level'}>
        ${slices.map(s => html`<path key=${s.k} d=${s.d} style=${{ fill: FUNC_FILL[s.k], stroke: 'var(--graphite)', strokeWidth: 1.2 }} />`)}
        ${slices.map(s => html`<text key=${'t' + s.k} x=${s.lab[0]} y=${s.lab[1] + 5} textAnchor=${s.inside ? 'middle' : s.lab[0] < cx ? 'end' : 'start'} className=${'sav1-fl' + (s.inside && sh[s.k] >= .2 ? ' sav1-big' : '')}>${FUNCS[s.k]}</text>`)}
      </svg></div>
      <${Cap} en=${caps[l].en + note.en} ar=${caps[l].ar + note.ar} showAr=${ar} /></figure>`;
  }

  /* ── Lab 1: UML diagram categories ── */
  function L1UmlKinds({ ar }) {
    const steps = [
      { en: 'The lab sorts <b>UML diagrams</b> into categories.', ar: 'الـ lab بيقسّم الـ <b>UML diagrams</b> لأنواع.' },
      { en: '<b>Structural</b>: the building blocks of the system, which do not change with time, e.g. the <b>class diagram</b>.', ar: 'الـ <b>Structural</b> هي الـ building blocks بتاعة السيستم اللي مابتتغيرش مع الوقت، زي الـ <b>class diagram</b>.' },
      { en: '<b>Behavioral</b>: how the system responds over time, e.g. the <b>use case diagram</b>.', ar: 'الـ <b>Behavioral</b> بتوضّح السيستم بيرد إزاي مع الوقت، زي الـ <b>use case diagram</b>.' },
      { en: '<b>Interaction</b>: a type of behavioral diagram that shows the exchange of messages, e.g. <b>sequence</b> and <b>collaboration</b> diagrams.', ar: 'الـ <b>Interaction</b> نوع من الـ behavioral بيوضّح تبادل الـ messages، زي الـ <b>sequence</b> والـ <b>collaboration</b> diagrams.' },
      { en: 'Another way to split them: <b>static</b>, <b>dynamic</b> and <b>functional</b>.', ar: 'وفيه تقسيمة تانية ليهم، الـ <b>static</b> والـ <b>dynamic</b> والـ <b>functional</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const cls = k => 'sav1-card' + (i === k ? ' on' : i < k ? ' off' : '');
    return html`<figure className="fig sav1"><div className="fig-stage"><div className="sav1-uml">
      <div className=${'sav1-card sav1-root' + (i === 0 ? ' on' : '')}><b>UML diagrams</b></div>
      <div className=${cls(1)}><b>Structural</b><small>do not change with time</small><small>e.g. class diagram</small></div>
      <div className=${cls(2)}><b>Behavioral</b><small>responds over time</small><small>e.g. use case diagram</small>
        <div className=${cls(3) + ' sav1-sub'}><b>Interaction</b><small>message exchange</small><small>e.g. sequence, collaboration</small></div></div>
      <div className=${'sav1-wide ' + pop(i >= 4)}><p className="sav1-note">Another split:</p><div className="sav1-chips"><span>Static</span><span>Dynamic</span><span>Functional</span></div></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'sa-l1-firm-system': L1Firm,
    'sa-l1-open-system': L1OpenSystem,
    'sa-l1-warehouse': L1Warehouse,
    'sa-l1-subsystems': L1Subsystems,
    'sa-l1-cbis': L1Cbis,
    'sa-l1-tps-event': L1TpsEvent,
    'sa-l1-tps-model': L1TpsModel,
    'sa-l1-mis-model': L1MisModel,
    'sa-l1-dss-model': L1DssModel,
    'sa-l1-level-info': L1LevelInfo,
    'sa-l1-level-areas': L1LevelAreas,
    'sa-l1-functions': L1Functions,
    'sa-l1-uml-kinds': L1UmlKinds
  });
})();
/* ── part L2 ── */
// Systems Analysis and Design visuals, Lecture 2 (The Systems Development Environment): Figure 1-1, how SA&D changed, one/two/three-tier, the SDLC cycle (Figure 1-3), the heart of development (Figures 1-8, 1-9), the waterfall SDLC (Figure 1-10), prototyping (Figure 1-11), RAD (Figure 1-13), CASE tools and their support per phase, RUP (Figure 1-14), and the lab's time split and methodologies (CH_02 slides 4 to 73 and the labs). Every label and number comes from the slides and the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.sav2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.sav2 .fig-btn.sav2-on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.sav2-tabs{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.sav2-tabs .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:30px; }
.sav2-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:420px; }
.sav2 svg text{ font-size:13.5px; fill:var(--ink); font-family:var(--body); }
.sav2 svg text.sav2-kt{ fill:var(--fig-k); font-weight:700; }
.sav2 svg text.sav2-pt{ fill:var(--pen); font-weight:700; }
.sav2 svg text.sav2-gt{ fill:var(--graphite); }
.sav2 svg text.sav2-bt{ font-weight:700; }
.sav2 .sav2-bx{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.5; transition:fill .4s, stroke .4s, stroke-width .4s, opacity .4s; }
.sav2 .sav2-hot .sav2-bx{ fill:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); stroke:var(--fig-k); stroke-width:2.8; }
.sav2 .sav2-g{ transition:opacity .4s; }
.sav2 .sav2-dim{ opacity:.3; }
.sav2 .sav2-ln{ fill:none; stroke:var(--fig-k); stroke-width:1.7; transition:opacity .4s, stroke-width .4s; }
.sav2 .sav2-ln.sav2-hot{ stroke-width:3.4; }
.sav2 .sav2-lg{ fill:none; stroke:var(--graphite); stroke-width:1.5; }
.sav2 .sav2-lp{ fill:none; stroke:var(--pen); stroke-width:2.2; stroke-dasharray:5 4; }
.sav2 .sav2-mkk{ fill:var(--fig-k); } .sav2 .sav2-mkg{ fill:var(--graphite); } .sav2 .sav2-mkp{ fill:var(--pen); }
.sav2 .sav2-dot{ fill:var(--pen); }
.sav2 .sav2-shade{ fill:color-mix(in srgb, var(--fig-k) 14%, transparent); stroke:var(--fig-k); stroke-width:1.2; transition:opacity .5s; }
.sav2 .sav2-x{ stroke:var(--pen); stroke-width:4; stroke-linecap:round; }
.sav2-note{ text-align:center; font-size:.86rem; color:var(--graphite); margin:8px 0 0; line-height:1.4; }
.sav2-k{ color:var(--fig-k); font-weight:700; }
.sav2-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.88rem; line-height:1.4; max-width:440px; margin:8px auto 0; }
.sav2-card > b{ display:block; color:var(--fig-k); margin-bottom:2px; }
.sav2-card ul{ margin:0; padding-left:18px; } .sav2-card li{ margin:2px 0; }
/* triangle */
.sav2-out{ display:grid; gap:6px; max-width:420px; margin:8px auto 0; }
.sav2-out div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 10px; font-size:.86rem; line-height:1.35; }
.sav2-out div b{ color:var(--ok); }
/* timeline */
.sav2-era{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; max-width:440px; margin:0 auto; }
.sav2-era button{ font:inherit; font-size:.82rem; font-weight:600; border:1px solid var(--line); border-radius:99px; background:var(--paper); color:var(--ink); padding:4px 10px; cursor:pointer; min-height:30px; opacity:.6; transition:opacity .3s, background .3s, box-shadow .3s; }
.sav2-era button.on{ opacity:1; } .sav2-era button.cur{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.sav2-axis{ position:relative; height:6px; border-radius:99px; background:var(--line); max-width:440px; margin:10px auto 2px; overflow:hidden; }
.sav2-axis i{ position:absolute; left:0; top:0; bottom:0; background:var(--fig-k); border-radius:99px; transition:width .5s; }
.sav2-role{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; font-size:.86rem; margin-top:8px; }
.sav2-role span{ border:1px solid var(--line); border-radius:6px; padding:2px 8px; background:var(--paper); transition:opacity .4s, box-shadow .4s; }
.sav2-role span.on{ box-shadow:0 0 0 2px var(--fig-k); } .sav2-role span.off{ opacity:.4; text-decoration:line-through; }
/* tiers */
.sav2-tier{ display:grid; gap:0; max-width:340px; margin:0 auto; }
.sav2-mach{ display:grid; grid-template-columns:96px minmax(0,1fr); gap:8px; align-items:center; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; animation:sav2in .45s ease both; }
.sav2-mach > b{ font-size:.86rem; line-height:1.2; }
.sav2-mach > b small{ display:block; font-weight:400; font-size:.76rem; color:var(--graphite); }
.sav2-mach.sav2-cloud{ border-style:dashed; border-radius:22px; background:var(--paper-2); }
.sav2-lay{ display:flex; flex-direction:column; gap:4px; }
.sav2-lay span{ border-radius:6px; padding:3px 8px; font-size:.84rem; font-weight:600; text-align:center; border:1px solid var(--line); }
.sav2-lay .sav2-L0{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.sav2-lay .sav2-L1{ background:color-mix(in srgb, var(--pen) 18%, var(--paper)); }
.sav2-lay .sav2-L2{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.sav2-lay em{ font-style:normal; font-size:.8rem; color:var(--graphite); text-align:center; }
.sav2-wire{ height:26px; display:block; margin:0 auto; width:30px; }
.sav2-wire line{ stroke:var(--fig-k); stroke-width:2.4; }
@keyframes sav2in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
/* sdlc detail */
.sav2-ld{ display:flex; flex-wrap:wrap; gap:6px; align-items:stretch; justify-content:center; margin-top:6px; }
.sav2-ld div{ flex:1 1 120px; border:1px dashed var(--fig-k); border-radius:8px; padding:4px 8px; font-size:.82rem; line-height:1.3; }
.sav2-ld div b{ display:block; color:var(--fig-k); }
/* problems */
.sav2-prob{ display:grid; gap:5px; max-width:440px; margin:8px auto 0; counter-reset:sav2p; }
.sav2-prob div{ border:1px solid var(--line); border-left:4px solid var(--pen); border-radius:6px; background:var(--paper); padding:4px 8px; font-size:.85rem; line-height:1.35; }
/* case hub */
.sav2-hub{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); grid-template-areas:"a b" "r r" "c d" "e e"; gap:8px; max-width:420px; margin:0 auto; align-items:center; }
.sav2-hub button{ font:inherit; font-size:.82rem; line-height:1.25; border:1px solid var(--line); border-radius:10px; background:var(--paper); color:var(--ink); padding:6px 4px; cursor:pointer; min-height:48px; opacity:.55; transition:opacity .3s, box-shadow .3s, background .3s; }
.sav2-hub button.on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.sav2-hub .sav2-repo{ grid-area:r; border-radius:99px; min-height:56px; font-size:.95rem; font-weight:700; opacity:1; background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); border:2px solid var(--fig-k); display:grid; place-items:center; padding:4px; }
.sav2-hub .sav2-repo.pulse{ animation:sav2pulse 1.4s ease-in-out infinite; }
@keyframes sav2pulse{ 50%{ box-shadow:0 0 0 6px color-mix(in srgb, var(--fig-k) 25%, transparent); } }
.sav2-feat{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-top:8px; }
.sav2-feat span{ font-size:.78rem; border:1px solid var(--line); border-radius:99px; padding:2px 8px; background:var(--paper); }
/* case per phase */
.sav2-ph{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:5px; max-width:440px; margin:0 auto; }
.sav2-ph button{ font:inherit; font-size:.8rem; line-height:1.25; text-align:left; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:5px 8px; cursor:pointer; min-height:40px; }
.sav2-ph button.cur{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); font-weight:700; }
.sav2-tools{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; max-width:440px; margin:10px auto 0; }
.sav2-tools span{ font-size:.8rem; border:1px solid var(--line); border-radius:99px; padding:3px 9px; background:var(--paper); opacity:.35; transition:opacity .35s, background .35s, box-shadow .35s; }
.sav2-tools span.on{ opacity:1; background:color-mix(in srgb, var(--ok) 20%, var(--paper)); box-shadow:0 0 0 1.5px var(--ok); font-weight:600; }
.sav2-tools span.star{ box-shadow:0 0 0 2.5px var(--fig-k); }
/* rup legend */
.sav2-leg{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin-top:6px; }
.sav2-leg button{ font:inherit; font-size:.8rem; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:3px 8px; cursor:pointer; min-height:30px; display:inline-flex; gap:5px; align-items:center; }
.sav2-leg button i{ width:12px; height:12px; border-radius:3px; display:inline-block; }
.sav2-leg button.cur{ box-shadow:0 0 0 2px var(--fig-k); font-weight:700; }
/* time split */
.sav2-in{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; font-size:.88rem; margin-bottom:10px; }
.sav2-in input[type=number]{ font:inherit; width:72px; padding:4px 6px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.sav2-in input[type=range]{ width:150px; accent-color:var(--fig-k); }
.sav2-stack{ display:flex; height:30px; border-radius:8px; overflow:hidden; max-width:440px; margin:0 auto; border:1px solid var(--line); }
.sav2-stack div{ display:grid; place-items:center; font-size:.8rem; font-weight:700; color:var(--ink); transition:flex .4s; }
.sav2-rows{ display:grid; gap:4px; max-width:440px; margin:8px auto 0; }
.sav2-rows div{ display:grid; grid-template-columns:12px minmax(0,1fr) auto; gap:8px; align-items:center; font-size:.85rem; line-height:1.25; border-bottom:1px solid var(--line); padding:3px 0; }
.sav2-rows i{ width:12px; height:12px; border-radius:3px; }
.sav2-rows small{ display:block; color:var(--graphite); font-size:.78rem; }
.sav2-rows b{ font-family:var(--mono); }
/* methodologies */
.sav2-flow{ display:flex; flex-direction:column; align-items:center; gap:2px; max-width:360px; margin:0 auto; }
.sav2-flow .sav2-r{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; }
.sav2-flow .sav2-s{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 9px; font-size:.84rem; font-weight:600; transition:background .35s, box-shadow .35s; text-align:center; }
.sav2-flow .sav2-s.on{ background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.sav2-flow .sav2-s small{ display:block; font-weight:400; font-size:.76rem; color:var(--ok); }
.sav2-flow .sav2-ar{ color:var(--fig-k); font-weight:700; font-size:.95rem; line-height:1.1; }
.sav2-flow .sav2-lab{ font-size:.78rem; color:var(--graphite); font-weight:600; }
.sav2-cols{ display:grid; gap:4px; width:100%; }
.sav2-cols > div{ border:1px dashed var(--line); border-radius:8px; padding:4px 6px; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:4px; }
.sav2-cols .sav2-s{ padding:3px 4px; font-size:.78rem; }
.sav2-ver{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px; align-items:center; width:100%; border:1px dashed var(--line); border-radius:8px; padding:4px 6px; }
.sav2-ver > b{ font-size:.8rem; color:var(--fig-k); }
.sav2-ver .sav2-r{ justify-content:flex-start; gap:3px; }
.sav2-ver .sav2-s{ padding:2px 5px; font-size:.78rem; }
@media (prefers-reduced-motion: reduce){ .sav2-mach{ animation:none; } .sav2-hub .sav2-repo.pulse{ animation:none; } }`;
  if (!document.getElementById('sav2-css')) { const s = document.createElement('style'); s.id = 'sav2-css'; s.textContent = CSS; document.head.appendChild(s); }

  // arrow heads, with ids unique per visual
  const Marks = ({ p }) => html`<defs>
    <marker id=${p + 'k'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" className="sav2-mkk" /></marker>
    <marker id=${p + 'g'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" className="sav2-mkg" /></marker>
    <marker id=${p + 'p'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" className="sav2-mkp" /></marker></defs>`;
  // box with centred lines of text
  const Bx = ({ x, y, w, h, t, hot, dim, bold }) => {
    const L = [].concat(t), y0 = y + h / 2 - (L.length - 1) * 8 + 4.6;
    return html`<g className=${'sav2-g' + (hot ? ' sav2-hot' : '') + (dim ? ' sav2-dim' : '')}><rect x=${x} y=${y} width=${w} height=${h} rx="4" className="sav2-bx" />
      ${L.map((s, j) => html`<text key=${j} x=${x + w / 2} y=${y0 + j * 16} textAnchor="middle" className=${hot ? 'sav2-kt' : bold ? 'sav2-bt' : ''}>${s}</text>`)}</g>`;
  };
  const Tabs = ({ list, cur, set }) => html`<div className="sav2-tabs" role="group">${list.map(([k, t]) => html`<button key=${k} className=${'fig-btn' + (cur === k ? ' sav2-on' : '')} aria-pressed=${String(cur === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── L2 slides 15 and 16 (Figure 1-1): methodologies, techniques and tools ── */
  function L2Triangle({ ar }) {
    const steps = [
      { en: '<b>Figure 1-1</b>: an organizational approach to systems analysis and design is driven by three things.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;1-1</bdi></b>: الـ organizational approach للـ systems analysis and design بيمشي بتلات حاجات.' },
      { en: '(1) Following a systems <b>methodology</b>: a standard process the organization follows for all the steps to analyze, design, implement and maintain the system.', ar: '(1) إنك تمشي على systems <b>methodology</b>: يعني standard process المنظمة بتمشي عليه في كل خطوات الـ analyze والـ design والـ implement والـ maintain.' },
      { en: '(2) Applying <b>techniques</b>.', ar: '(2) إنك تطبّق <b>techniques</b>.' },
      { en: '(3) Using appropriate <b>tools</b>.', ar: '(3) إنك تستخدم <b>tools</b> مناسبة.' },
      { en: 'Why: they <b>ensure the quality and appropriateness</b> of the system being built.', ar: 'ليه؟ عشان <b>تضمن الجودة وإن السيستم مناسب</b> (quality and appropriateness).' },
      { en: 'And they <b>provide structure</b> to the systems development process, since they have been <b>tested and perfected by others</b>.', ar: 'وعشان <b>تدّي structure</b> لعملية الـ systems development، لأنها <b>اتجرّبت واتظبطت قبل كده من ناس تانية</b> (tested and perfected by others).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const V = [[145, 22, 'Methodologies', 1], [64, 198, 'Techniques', 2], [226, 198, 'Tools', 3]];
    return html`<figure className="fig sav2"><div className="fig-stage">
      <svg viewBox="0 0 290 214" className="sav2-svg" role="img" aria-label="Figure 1-1: methodologies, techniques and tools around the organizational approach">
        <path d="M145 40 L40 176 L250 176 Z" fill="color-mix(in srgb, var(--fig-k) 16%, var(--paper))" stroke="var(--fig-k)" strokeWidth="2" />
        <text x="145" y="132" textAnchor="middle" className="sav2-bt">Organizational</text>
        <text x="145" y="150" textAnchor="middle">approach to SA&D</text>
        ${V.map(([x, y, t, s]) => html`<g key=${t} className=${'sav2-g' + (i >= s ? (i === s ? ' sav2-hot' : '') : ' sav2-dim')}>
          <rect x=${x - 58} y=${y - 18} width="116" height="28" rx="14" className="sav2-bx" />
          <text x=${x} y=${y + 1} textAnchor="middle" className=${i === s ? 'sav2-kt' : 'sav2-bt'}>${t}</text></g>`)}
      </svg>
      <div className="sav2-out">
        <div className=${pop(i >= 4)}><b>✓</b> ensures the quality and appropriateness of the system</div>
        <div className=${pop(i >= 5)}><b>✓</b> provides structure: tested and perfected by others</div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 4 to 8: how analysis and design changed (1950 to now) ── */
  const ERAS = [
    { k: 'Early years', w: 8, pts: ['Analysis and design were considered an art', 'It became a disciplined process', 'The developer’s job: from builder to integrator'],
      en: '<b>Early years</b>: analysis and design were considered <b>an art</b>; they became <b>a disciplined process</b>. The developer’s job moved from <b>builder to integrator</b>.',
      ar: 'في <b>الأول</b> الـ analysis والـ design كانوا بيتعتبروا <b>فن (art)</b>، وبقوا <b>disciplined process</b>. وشغلانة الـ developer اتحولت من <b>builder لـ integrator</b>.' },
    { k: '1950s', w: 22, pts: ['Focus on the processes the software performed', 'Automating existing processes', 'All applications in machine or assembly language', 'Developed from scratch'],
      en: '<b>1950s</b>: focus on the <b>processes</b> the software performed, <b>automating existing processes</b>; all applications in <b>machine or assembly language</b>, developed <b>from scratch</b>.',
      ar: 'في <b>الخمسينات</b> التركيز كان على الـ <b>processes</b> اللي الـ software بيعملها، يعني <b>automate للـ processes الموجودة</b>؛ وكل الـ applications كانت بالـ <b>machine language أو الـ assembly language</b> ومعمولة <b>من الصفر (from scratch)</b>.' },
    { k: '1970s', w: 40, pts: ['Development became more disciplined', 'More like engineering'],
      en: '<b>1970s</b>: development became <b>more disciplined</b>, more like <b>engineering</b>.',
      ar: 'في <b>السبعينات</b> الـ development بقى <b>disciplined أكتر</b>، وشبه الـ <b>engineering</b>.' },
    { k: '1980s', w: 58, pts: ['Microcomputers became key tools', 'Software industry expanded', '4GLs used more', 'CASE tools developed'],
      en: '<b>1980s</b>: <b>microcomputers</b> became key tools; the software industry expanded; <b>4GLs</b> used more; <b>CASE tools</b> developed.',
      ar: 'في <b>التمانينات</b> الـ <b>microcomputers</b> بقت key tools، وصناعة الـ software كبرت، والـ <b>4GLs</b> اتستخدمت أكتر، واتعملت الـ <b>CASE tools</b>.' },
    { k: '1990s', w: 78, pts: ['Focus on system integration', 'Visual programming environments for UIs', 'Databases and application logic on servers', 'Enterprise-wide systems', 'The Internet and the Web'],
      en: '<b>1990s</b>: focus on <b>system integration</b>; visual programming environments for UIs; databases and application logic on <b>servers</b>; enterprise-wide systems; the <b>Internet and the Web</b>.',
      ar: 'في <b>التسعينات</b> التركيز بقى على الـ <b>system integration</b>: الـ visual programming environments لتصميم الـ UIs، والـ databases والـ application logic على الـ <b>servers</b>، والـ enterprise-wide systems، والـ <b>Internet والـ Web</b>.' },
    { k: 'Current', w: 100, pts: ['Web-based development and wireless components', 'Three-tier design', 'Assembling systems from off-the-shelf components', 'Or using application service providers'],
      en: '<b>Current</b>: <b>Web-based</b> development and wireless components; <b>three-tier</b> design; systems assembled from <b>off-the-shelf components</b> or by using <b>application service providers</b>.',
      ar: 'في <b>الوقت الحالي</b> الـ development بقى <b>Web-based</b> وفيه wireless components، والـ design بقى <b>three-tier</b>، والشركات بتجمّع السيستم من <b>off-the-shelf components</b> أو بتستخدم <b>application service providers</b>.' }
  ];
  function L2Eras({ ar }) {
    const [i, ctl] = useSteps(ERAS.length, 2600), E = ERAS[i];
    return html`<figure className="fig sav2"><div className="fig-stage">
      <div className="sav2-era" role="group">${ERAS.map((e, j) => html`<button key=${e.k} className=${j === i ? 'cur' : j < i ? 'on' : ''} aria-pressed=${String(j === i)} onClick=${() => ctl.go(j)}>${e.k}</button>`)}</div>
      <div className="sav2-axis" aria-hidden="true"><i style=${{ width: E.w + '%' }}></i></div>
      <div className="sav2-card" key=${i} style=${{ animation: calm() ? 'none' : 'sav2in .4s ease both' }}><b>${E.k}</b><ul>${E.pts.map(p => html`<li key=${p}>${p}</li>`)}</ul></div>
      <div className="sav2-role" aria-label="The developer's job"><span className=${i === 0 ? 'off' : ''}>builder</span><span>→</span><span className=${i === 0 ? 'on' : ''}>integrator</span></div>
      </div><${Cap} en=${E.en} ar=${E.ar} showAr=${ar} /><${Bar} steps=${ERAS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 9 to 13: one-, two- and three-tier, and the Web version ── */
  const TIERS = {
    one: { m: [['User', '', [0, 1, 2]]], en: '<b>One-tier</b>: presentation, processing and database all on <b>one machine</b>.', ar: 'في الـ <b>One-tier</b> الـ presentation والـ processing والـ database كلهم على <b>جهاز واحد</b>.' },
    two: { m: [['User', 'user machine', [0, 1]], ['DB Server', 'database server', [2]]], en: '<b>Two-tier</b>: the user machine holds presentation and processing, and talks to a <b>database server</b>.', ar: 'في الـ <b>Two-tier</b> جهاز الـ user عليه الـ presentation والـ processing، وبيكلّم <b>database server</b> عليه الـ database.' },
    three: { m: [['User', 'presentation', [0]], ['App. S', 'application server', [1]], ['DB S', 'database server', [2]]], en: '<b>Three-tier</b>: user (presentation), then the <b>application server</b> (processing) in the middle, then the database server.', ar: 'في الـ <b>Three-tier</b> كل layer على جهاز لوحده: الـ user عليه الـ presentation، وفي النص الـ <b>application server</b> عليه الـ processing، وبعده الـ database server.' },
    web: { m: [['Browser', 'user', [0]], ['Internet', '', [], 1], ['Web/App server', 'APP S', [1]], ['DB server', 'DB S', [2]]], en: 'The <b>Web version</b> of three-tier: browser, then the Internet, then the web/app server, then the DB server.', ar: 'نسخة <b>الويب</b> من الـ three-tier: الـ browser بيوصل عن طريق الـ Internet للـ <bdi dir="ltr">web/app server</bdi>، واللي بيكلّم الـ DB server.' }
  };
  const LAY = ['Presentation', 'Processing', 'Database'];
  function L2Tiers({ ar }) {
    const [t, setT] = useState('one'), T = TIERS[t], c = calm();
    return html`<figure className="fig sav2"><div className="fig-stage">
      <${Tabs} list=${[['one', 'One-tier'], ['two', 'Two-tier'], ['three', 'Three-tier'], ['web', 'Web']]} cur=${t} set=${setT} />
      <div className="sav2-tier" key=${t}>${T.m.map(([n, sub, ls, cloud], j) => html`<div key=${n}>
        ${j > 0 && html`<svg className="sav2-wire" viewBox="0 0 30 26" aria-hidden="true"><line x1="15" y1="0" x2="15" y2="26" className=${c ? '' : 'flow'} /></svg>`}
        <div className=${'sav2-mach' + (cloud ? ' sav2-cloud' : '')} style=${{ animationDelay: (j * .15) + 's' }}>
          <b>${n}${sub && html`<small>${sub}</small>`}</b>
          <div className="sav2-lay">${ls.length ? ls.map(l => html`<span key=${l} className=${'sav2-L' + l}>${LAY[l]}</span>`) : html`<em>carries the requests</em>`}</div>
        </div></div>`)}</div>
      <p className="sav2-note">${t === 'three' || t === 'web' ? 'The middle tier is the application server (processing).' : t === 'two' ? 'Two machines: the client and the database server.' : 'Everything on the user’s machine.'}</p>
      </div><${Cap} en=${T.en} ar=${T.ar} showAr=${ar} /></figure>`;
  }

  /* ── L2 slides 19 to 29 (Figure 1-3): the SDLC phases ── */
  const SDLC = [['pl', 100, 6, 82, 'Planning'], ['an', 192, 76, 86, 'Analysis'], ['de', 174, 160, 80, 'Design'], ['im', 18, 160, 116, 'Implementation'], ['ma', 4, 76, 98, 'Maintenance']];
  const SDLCA = [[182, 30, 224, 76], [230, 106, 218, 160], [174, 175, 134, 175], [66, 160, 56, 106], [62, 76, 100, 28]];
  function L2Sdlc({ ar }) {
    const steps = [
      { en: '<b>Figure 1-3</b>: the SDLC, the traditional methodology to develop, maintain and replace information systems. Five phases in a cycle.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;1-3</bdi></b>: الـ SDLC هو الـ traditional methodology اللي بنطوّر بيها ونعمل maintain ونستبدل الـ information systems. خمس phases في دايرة.' },
      { en: '<b>Planning</b>: the organization’s total information system needs are identified, analyzed, prioritized and arranged.', ar: 'الـ <b>Planning</b>: احتياجات المنظمة كلها من الـ information systems بتتحدد وتتحلل وتترتب حسب الأولوية (identified, analyzed, prioritized, arranged).' },
      { en: '<b>Analysis</b>: study and structure system requirements; gathered from users, studied, organized, redundancies eliminated. Output: the solution recommended by the analysis team.', ar: 'الـ <b>Analysis</b>: بندرس الـ system requirements ونعملها structure؛ بنجمعها من الـ users وندرسها وننظمها ونشيل التكرار (redundancies). المخرج هو الـ solution اللي الـ analysis team بيرشحه.' },
      { en: '<b>Design</b>: the recommended solution is converted to system specifications, first <b>logical</b> (independent of any platform), then <b>physical</b> (technology-specific details).', ar: 'الـ <b>Design</b>: الـ solution المرشح بيتحول لـ system specifications، الأول <b>logical</b> (من غير ما يعتمد على أي platform)، وبعدين <b>physical</b> (تفاصيل خاصة بالتكنولوجيا).' },
      { en: '<b>Implementation</b>: the information system is coded, tested, installed and supported.', ar: 'الـ <b>Implementation</b>: الـ information system بيتعمله code و test و install و support.' },
      { en: '<b>Maintenance</b>: the information system is systematically repaired and improved, and the cycle goes back to Planning.', ar: 'الـ <b>Maintenance</b>: الـ information system بيتصلح ويتحسن بشكل منظم (systematically)، والدايرة بترجع للـ Planning.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const D = ['', 'Identify, analyze, prioritize and arrange IS needs', 'Study and structure system requirements', 'Convert the recommended solution to system specifications', 'Code, test, install and support the information system', 'Systematically repair and improve the information system'];
    return html`<figure className="fig sav2"><div className="fig-stage">
      <svg viewBox="0 0 284 198" className="sav2-svg" role="img" aria-label="Figure 1-3: the SDLC cycle"><${Marks} p="sav2-s" />
        ${SDLCA.map(([a, b, c, d], k) => html`<path key=${k} d=${`M${a} ${b} L${c} ${d}`} className=${'sav2-ln' + (i === k + 2 || (i === 1 && k === 4) ? ' sav2-hot' : '')} markerEnd="url(#sav2-sk)" />`)}
        ${SDLC.map(([id, x, y, w, t], k) => html`<g key=${id} onClick=${() => ctl.go(k + 1)} style=${{ cursor: 'pointer' }}><${Bx} x=${x} y=${y} w=${w} h=${30} t=${t} hot=${i === k + 1} dim=${i > 0 && i !== k + 1} /></g>`)}
      </svg>
      <div className=${'sav2-card ' + pop(i > 0)}><b>${i > 0 ? SDLC[i - 1][4] : ' '}</b>${D[i]}
        ${i === 3 && html`<div className="sav2-ld"><div><b>Logical design</b>functional features described independently of any computer platform</div><div><b>Physical design</b>logical specifications transformed to technology-specific details</div></div>`}</div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slide 33 (Figures 1-8 and 1-9): the heart of the systems development process ── */
  function L2Heart({ ar }) {
    const steps = [
      { en: '<b>Figure 1-8</b>: the analysis, design, code, test loop. Work goes round and round instead of one pass.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;1-8</bdi></b>: الـ loop بتاع الـ analysis والـ design والـ code والـ test. الشغل بيلف كذا لفة بدل ما يبقى مرة واحدة.' },
      { en: '<b>Figure 1-9</b>: the heart of systems development, drawn on the SDLC. Analysis and design go back and forth.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;1-9</bdi></b>: قلب الـ systems development مترسوم على الـ SDLC. الـ analysis والـ design رايحين جايين بين بعض.' },
      { en: 'Current practice combines <b>analysis, design and implementation</b> into a <b>single iterative and parallel process</b> of activities (the shaded area).', ar: 'الممارسة الحالية بتدمج الـ <b>analysis والـ design والـ implementation</b> في <b>process واحدة iterative و parallel</b> (المنطقة المضللة).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200), c = calm();
    const loop = html`<svg viewBox="0 0 284 200" className="sav2-svg" role="img" aria-label="Figure 1-8: analysis, design, code, test loop"><${Marks} p="sav2-h" />
      <path d="M182 30 L222 84" className="sav2-ln" markerEnd="url(#sav2-hk)" /><path d="M222 116 L182 168" className="sav2-ln" markerEnd="url(#sav2-hk)" />
      <path d="M102 172 L62 116" className="sav2-ln" markerEnd="url(#sav2-hk)" /><path d="M62 84 L102 30" className="sav2-ln" markerEnd="url(#sav2-hk)" />
      <${Bx} x=${102} y=${4} w=${80} h=${30} t="Analysis" bold=${1} /><${Bx} x=${196} y=${85} w=${80} h=${30} t="Design" bold=${1} />
      <${Bx} x=${102} y=${166} w=${80} h=${30} t="Code" bold=${1} /><${Bx} x=${8} y=${85} w=${80} h=${30} t="Test" bold=${1} />
      ${!c && html`<circle r="7" className="sav2-dot"><animateMotion dur="4s" repeatCount="indefinite" path="M142 34 L236 100 L142 166 L48 100 Z" /></circle>`}
      <text x="142" y="105" textAnchor="middle" className="sav2-gt">loop</text></svg>`;
    const heart = html`<svg viewBox="0 0 284 200" className="sav2-svg" role="img" aria-label="Figure 1-9: the heart of systems development"><${Marks} p="sav2-j" />
      <path d="M6 140 L198 50 L284 60 L284 196 L6 196 Z" className="sav2-shade" style=${{ opacity: i >= 2 ? 1 : 0 }} />
      <path d="M184 26 L226 64" className="sav2-ln" markerEnd="url(#sav2-jk)" />
      <path d="M226 94 L208 150" className=${'sav2-ln' + (i >= 2 ? ' sav2-hot' : '')} markerEnd="url(#sav2-jk)" /><path d="M222 150 L240 94" className=${'sav2-ln' + (i >= 2 ? ' sav2-hot' : '')} markerEnd="url(#sav2-jk)" />
      <path d="M176 165 L134 165" className=${'sav2-ln' + (i >= 2 ? ' sav2-hot' : '')} markerEnd="url(#sav2-jk)" />
      <path d="M60 150 L52 96" className="sav2-ln" markerEnd="url(#sav2-jk)" /><path d="M64 64 L100 26" className="sav2-ln" markerEnd="url(#sav2-jk)" />
      <${Bx} x=${100} y=${2} w=${84} h=${30} t="Planning" dim=${i >= 2} /><${Bx} x=${190} y=${64} w=${88} h=${30} t="Analysis" hot=${i >= 2} />
      <${Bx} x=${176} y=${150} w=${78} h=${30} t="Design" hot=${i >= 2} /><${Bx} x=${16} y=${150} w=${118} h=${30} t="Implementation" hot=${i >= 2} />
      <${Bx} x=${4} y=${64} w=${100} h=${30} t="Maintenance" dim=${i >= 2} /></svg>`;
    return html`<figure className="fig sav2"><div className="fig-stage">
      <p className="sav2-note" style=${{ margin: '0 0 6px', fontWeight: 700 }}>${i === 0 ? 'Figure 1-8: the analysis-design-code-test loop' : 'Figure 1-9: the heart of systems development'}</p>
      ${i === 0 ? loop : heart}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 34 and 35 (Figure 1-10): the traditional waterfall SDLC and its problems ── */
  function L2Waterfall({ ar }) {
    const steps = [
      { en: '<b>Figure 1-10</b>: the traditional waterfall SDLC. Planning, Analysis, Logical Design, Physical Design, Implementation, Maintenance, flowing down like a waterfall.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;1-10</bdi></b>: الـ traditional waterfall SDLC. الـ phases بتنزل ورا بعض زي الشلال، من الـ Planning لحد الـ Maintenance.' },
      { en: '<b>One phase begins when another completes</b>.', ar: '<b>كل phase بتبدأ لما اللي قبلها تخلص</b>.' },
      { en: '<b>Little backtracking and looping</b>: going back to an earlier phase once it has ended is difficult.', ar: '<b>رجوع ولف قليل جدًا</b> (little backtracking and looping): صعب ترجع لـ phase خلصت.' },
      { en: 'Problem (1): system requirements are <b>"locked in"</b> after being determined (can’t change).', ar: 'المشكلة (1): الـ system requirements بتبقى <b>"locked in"</b> بعد ما تتحدد (ماينفعش تتغير).' },
      { en: 'Problem (2): <b>limited user involvement</b>, only in the requirements phase.', ar: 'المشكلة (2): <b>مشاركة الـ user محدودة</b>، في مرحلة الـ requirements بس.' },
      { en: 'Problem (3): <b>too much focus on milestone deadlines</b> of the SDLC phases.', ar: 'المشكلة (3): <b>تركيز زيادة على الـ milestone deadlines</b> بتاعة الـ phases.' },
      { en: 'Problem (4): <b>much process and documentation</b>: many organizations keep a large staff whose sole purpose is to create and maintain SDLC documentation.', ar: 'المشكلة (4): <b>كتر الـ process والـ documentation</b>: منظمات كتير عندها staff كبير شغلته الوحيدة إنه يعمل ويحافظ على documentation الـ SDLC.' },
      { en: 'So <b>Figure 1-3</b> (the circular SDLC) is more realistic than Figure 1-10: there you can go back to any phase after completing others.', ar: 'عشان كده الـ <b><bdi dir="ltr">Figure&nbsp;1-3</bdi></b> (الـ SDLC الدايري) أقرب للواقع من الـ waterfall، لأنك فيه تقدر ترجع لأي phase.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const P = ['Planning', 'Analysis', ['Logical', 'Design'], ['Physical', 'Design'], 'Implementation', 'Maintenance'];
    const X = k => k * 34, Y = k => 4 + k * 38, W = 112, H = 32;
    const PR = ['Requirements "locked in"', 'Limited user involvement', 'Too much focus on milestone deadlines', 'Much process and documentation'];
    return html`<figure className="fig sav2"><div className="fig-stage">
      <svg viewBox="0 0 290 236" className="sav2-svg" role="img" aria-label="Figure 1-10: the traditional waterfall SDLC"><${Marks} p="sav2-w" />
        ${P.slice(0, 5).map((_, k) => html`<path key=${k} d=${`M${X(k) + W} ${Y(k) + 16} Q${X(k) + W + 12} ${Y(k) + 16} ${X(k) + W + 12} ${Y(k + 1) - 2}`} className=${'sav2-ln' + (i === 1 ? ' sav2-hot' : '')} markerEnd="url(#sav2-wk)" />`)}
        ${P.map((t, k) => html`<g key=${k}><${Bx} x=${X(k)} y=${Y(k)} w=${W} h=${H} t=${t} hot=${i === 3 && k === 1} /></g>`)}
        <g className=${pop(i >= 2)}><path d="M100 136 Q30 140 46 78" className="sav2-lp" markerEnd="url(#sav2-wp)" />
          <path d="M42 114 L60 132 M60 114 L42 132" className="sav2-x" /></g>
        <text x="288" y="232" textAnchor="end" className=${'sav2-gt ' + pop(i >= 7)}>Fig 1-3: go back to any phase</text>
      </svg>
      <div className="sav2-prob">${PR.map((p, k) => html`<div key=${k} className=${pop(i >= 3 + k)} style=${{ fontWeight: i === 3 + k ? 700 : 400 }}>(${k + 1}) ${p}</div>`)}</div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 37 to 41 (Figure 1-11): the prototyping methodology, with the Visual Basic example ── */
  function L2Proto({ ar }) {
    const steps = [
      { en: '<b>Identify Problem</b>: the analyst and the users start from the problem; the <b>initial requirements</b> come out of it. Example: an analyst developing an inventory-tracking system for a sales representative.', ar: 'الـ <b>Identify Problem</b>: الـ analyst والـ users بيبدأوا من المشكلة، ومنها بتطلع الـ <b>initial requirements</b>. المثال: analyst بيعمل inventory-tracking system لـ sales representative.' },
      { en: '<b>Develop Prototype</b>: the requirements are quickly converted to a working system. In the example the analyst builds sample interface displays in Visual Basic "on the fly".', ar: 'الـ <b>Develop Prototype</b>: الـ requirements بتتحول بسرعة لـ working system. في المثال الـ analyst بيعمل sample interface displays بالـ Visual Basic "on the fly".' },
      { en: 'The <b>working prototype</b> goes to the users: <b>Implement and Use Prototype</b>. The sales representative reviews the displays.', ar: 'الـ <b>working prototype</b> بيروح للـ users في خطوة الـ <b>Implement and Use Prototype</b>. الـ sales representative بيراجع الشاشات.' },
      { en: 'Using it shows <b>problems</b>: they go to <b>Revise and Enhance Prototype</b>. The representative gives the analyst feedback.', ar: 'الاستخدام بيطلّع <b>problems</b>، وبتروح لخطوة الـ <b>Revise and Enhance Prototype</b>. الـ sales representative بيدّي الـ analyst الـ feedback.' },
      { en: '<b>New requirements</b> can join at this point too, and the analyst modifies the displays.', ar: 'ممكن <b>new requirements</b> تدخل هنا كمان، والـ analyst بيعدّل الشاشات.' },
      { en: 'The <b>next version</b> goes back to the users, and again they give feedback. This loop repeats: the prototype is <b>continually revised</b> through close work between analyst and users.', ar: 'الـ <b>next version</b> بترجع للـ users، وتاني بيدّوا feedback. الـ loop ده بيتكرر: الـ prototype <b>بيتعدّل باستمرار</b> بالشغل القريب بين الـ analyst والـ users.' },
      { en: 'At the end the prototype can be the basis of the final system: <b>Convert to Operational System</b> (the figure marks this path "if prototype inefficient").', ar: 'في الآخر الـ prototype ممكن يبقى أساس السيستم النهائي، وده الـ <b>Convert to Operational System</b> (الرسمة كاتبة على السهم ده "if prototype inefficient").' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const [v, setV] = useState(1);
    useEffect(() => { if (i < 5) setV(1); }, [i]);
    const hot = n => ({ id: i === 0, dp: i === 1, iu: i === 2 || i === 5, rv: i === 3 || i === 4, cv: i === 6 })[n];
    const L = (on, cls = '') => 'sav2-ln' + (on ? ' sav2-hot' : '') + cls;
    return html`<figure className="fig sav2"><div className="fig-stage">
      <svg viewBox="0 0 290 266" className="sav2-svg" role="img" aria-label="Figure 1-11: the prototyping methodology"><${Marks} p="sav2-p" />
        <path d="M100 30 L188 30" className=${L(i === 0)} markerEnd="url(#sav2-pk)" />
        <text x="145" y="12" textAnchor="middle" style=${{ fontSize: '12.6px' }} className=${i === 0 ? 'sav2-kt' : 'sav2-gt'}>Initial</text><text x="145" y="25" textAnchor="middle" style=${{ fontSize: '12.6px' }} className=${i === 0 ? 'sav2-kt' : 'sav2-gt'}>Requirements</text>
        <path d="M196 56 L104 194" className=${L(i === 2)} markerEnd="url(#sav2-pk)" />
        <text x="0" y="0" textAnchor="middle" transform="translate(140 116) rotate(-56.3)" className=${i === 2 ? 'sav2-kt' : 'sav2-gt'}>Working Prototype</text>
        <path d="M102 214 L188 214" className=${L(i === 3)} markerEnd="url(#sav2-pk)" />
        <text x="145" y="207" textAnchor="middle" className=${i === 3 ? 'sav2-kt' : 'sav2-gt'}>Problems</text>
        <path d="M188 238 L102 238" className=${L(i === 5)} markerEnd="url(#sav2-pk)" />
        <text x="145" y="258" textAnchor="middle" className=${i === 5 ? 'sav2-kt' : 'sav2-gt'}>Next Version</text>
        <path d="M262 160 L246 190" className=${L(i === 4)} markerEnd="url(#sav2-pk)" />
        <text x="288" y="152" textAnchor="end" className=${i === 4 ? 'sav2-kt' : 'sav2-gt'}>New Requirements</text>
        <path d="M18 194 L18 150" className=${L(i === 6)} markerEnd="url(#sav2-pk)" />
        <text x="26" y="168" className=${i === 6 ? 'sav2-kt' : 'sav2-gt'}>If Prototype</text><text x="26" y="184" className=${i === 6 ? 'sav2-kt' : 'sav2-gt'}>Inefficient</text>
        <${Bx} x=${0} y=${8} w=${100} h=${46} t=${['Identify', 'Problem']} hot=${hot('id')} />
        <${Bx} x=${190} y=${8} w=${100} h=${46} t=${['Develop', 'Prototype']} hot=${hot('dp')} />
        <${Bx} x=${0} y=${88} w=${100} h=${58} t=${['Convert to', 'Operational', 'System']} hot=${hot('cv')} />
        <${Bx} x=${0} y=${196} w=${100} h=${58} t=${['Implement', 'and Use', 'Prototype']} hot=${hot('iu')} />
        <${Bx} x=${190} y=${196} w=${100} h=${58} t=${['Revise and', 'Enhance', 'Prototype']} hot=${hot('rv')} />
      </svg>
      ${i === 5 && html`<p className="sav2-note">Version <span className="sav2-k">${v}</span> with the users. <button className="fig-btn" onClick=${() => setV(x => x + 1)}>↻ Another round</button></p>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 53 to 55 and 71 (Figure 1-13): the RAD life cycle compared with Figure 1-3 ── */
  function L2Rad({ ar }) {
    const steps = [
      { en: '<b>RAD life cycle</b>, first phase: <b>Requirements Planning</b>, a short phase (similar to Planning in Figure 1-3).', ar: 'الـ <b>RAD life cycle</b>، أول phase هي الـ <b>Requirements Planning</b>، وهي phase قصيرة (شبه الـ Planning في الـ <bdi dir="ltr">Figure&nbsp;1-3</bdi>).' },
      { en: '<b>User Design</b>: extensive user involvement through JAD sessions and evaluation of prototypes.', ar: 'الـ <b>User Design</b>: مشاركة كبيرة من الـ users عن طريق الـ JAD sessions وتقييم الـ prototypes.' },
      { en: '<b>User Design ⇄ Construction</b>: the only two phases that iterate. Each prototype is built, users give feedback, design changes, and it is built again.', ar: 'الـ <b>User Design</b> والـ <b>Construction</b> هما الـ phases الوحيدة اللي بتعمل iteration: الـ prototype بيتبني، والـ users بيدّوا feedback، والـ design بيتغير، ويتبني تاني.' },
      { en: '<b>Cutover</b>: the new system goes into use; Construction and Cutover correspond to the implementation phase of Figure 1-3.', ar: 'الـ <b>Cutover</b>: السيستم الجديد بيبدأ يشتغل؛ والـ Construction مع الـ Cutover بيقابلوا مرحلة الـ implementation في الـ <bdi dir="ltr">Figure&nbsp;1-3</bdi>.' },
      { en: 'Compared with Figure 1-3, where every phase iterates, RAD conveys <b>speed</b>: design and implementation time radically decreased, made possible by prototyping, JAD, integrated CASE tools and code generators.', ar: 'مقارنة بالـ <bdi dir="ltr">Figure&nbsp;1-3</bdi> اللي كل phases فيه بتعمل iteration، الـ RAD بيوصّل فكرة <b>السرعة</b>: وقت الـ design والـ implementation بيقل جدًا، وده بفضل الـ prototyping والـ JAD والـ integrated CASE tools والـ code generators.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const [n, setN] = useState(0);
    useEffect(() => { if (i !== 2 || calm()) return; setN(0); const id = setInterval(() => setN(x => x + 1), 900); return () => clearInterval(id); }, [i]);
    const B = [[0, 4, ['Requirements', 'Planning']], [56, 60, ['User', 'Design']], [112, 116, ['Construction']], [170, 172, ['Cutover']]];
    const cyc = i === 2 ? n % 2 : -1;
    return html`<figure className="fig sav2"><div className="fig-stage">
      <svg viewBox="0 0 290 218" className="sav2-svg" role="img" aria-label="Figure 1-13: the RAD life cycle"><${Marks} p="sav2-r" />
        <path d="M118 24 Q132 24 132 58" className=${'sav2-ln' + (i === 1 ? ' sav2-hot' : '')} markerEnd="url(#sav2-rk)" />
        <path d="M174 80 Q192 80 192 114" className=${'sav2-ln' + (cyc === 0 ? ' sav2-hot' : '')} markerEnd="url(#sav2-rk)" />
        <path d="M112 136 Q88 136 88 102" className=${'sav2-ln' + (cyc === 1 ? ' sav2-hot' : '')} markerEnd="url(#sav2-rk)" />
        <path d="M230 136 Q248 136 248 170" className=${'sav2-ln' + (i === 3 ? ' sav2-hot' : '')} markerEnd="url(#sav2-rk)" />
        ${B.map(([x, y, t], k) => html`<g key=${k} className=${'sav2-g ' + pop(i >= k || i === 4 || (k === 2 && i >= 2))}><${Bx} x=${x} y=${y} w=${118} h=${40} t=${t} hot=${i === k || (i === 2 && k === 1 && cyc === 1)} /></g>`)}
        ${i === 2 && html`<text x="50" y="164" textAnchor="middle" className="sav2-kt">iteration ${calm() ? '' : (n >> 1) + 1}</text>`}
        <g className=${pop(i === 4)}>
          <text x="140" y="30" className="sav2-gt">≈ Planning</text>
          <text x="2" y="194" className="sav2-gt">≈ Implementation</text>
          <text x="2" y="210" className="sav2-gt">(Construction + Cutover)</text></g>
      </svg>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 43 to 49: the general types of CASE tools around the central repository ── */
  const CASE = [
    { k: 'a', t: 'Diagramming tools', en: '<b>Diagramming tools</b>: represent system processes, data and control structures <b>graphically</b>.', ar: 'الـ <b>Diagramming tools</b>: بترسم الـ processes والداتا والـ control structures بتاعة السيستم بشكل <b>graphical</b>.' },
    { k: 'b', t: 'Computer display and report generators', en: '<b>Computer display and report generators</b>: prototype how systems <b>"look and feel"</b> to users.', ar: 'الـ <b>Computer display and report generators</b>: بتعمل prototype لشكل السيستم وإحساسه عند الـ users (<b>"look and feel"</b>).' },
    { k: 'c', t: 'Analysis tools', en: '<b>Analysis tools</b>: automatically check for <b>incomplete, inconsistent or incorrect</b> specifications in diagrams, forms and reports.', ar: 'الـ <b>Analysis tools</b>: بتشيك أوتوماتيك على الـ specifications <b>الناقصة أو المتعارضة أو الغلط</b> في الـ diagrams والـ forms والـ reports.' },
    { k: 'd', t: 'Documentation generators', en: '<b>Documentation generators</b>: produce both technical and user documentation in <b>standard formats</b>.', ar: 'الـ <b>Documentation generators</b>: بتطلّع documentation تقنية وللـ user في <b>formats قياسية</b>.' },
    { k: 'e', t: 'Code generators', en: '<b>Code generators</b>: automatic generation of <b>program and database definition code</b> directly from the design documents, diagrams, forms and reports.', ar: 'الـ <b>Code generators</b>: بتطلّع أوتوماتيك <b>كود البرنامج وتعريفات الـ database</b> مباشرة من مستندات الـ design والـ diagrams والـ forms والـ reports.' }
  ];
  function L2CaseHub({ ar }) {
    const steps = [
      { en: '<b>CASE tools</b>: software that provides automated support for some portion of the SDLC, built around a <b>repository</b> of all the metadata (data names, format, uses, location) and system specifications.', ar: 'الـ <b>CASE tools</b>: برامج بتدّي automated support لجزء من الـ SDLC، ومبني حوالين <b>repository</b> فيه كل الـ metadata (أسامي الداتا، الـ format، الاستخدامات، المكان) والـ system specifications.' },
      ...CASE.map(c => ({ en: c.en, ar: c.ar })),
      { en: 'The <b>central repository</b>: integrated storage of specifications, diagrams, reports and project management information. It is the <b>most important component</b>: it integrates tools and activities, is used by all team members and gives a <b>single view</b> of the project.', ar: 'الـ <b>central repository</b>: تخزين متكامل للـ specifications والـ diagrams والـ reports ومعلومات الـ project management. وهو <b>أهم component</b>: بيربط الـ tools والأنشطة ببعض، وكل أعضاء الـ team بيستخدموه، وبيدّي <b>single view</b> للمشروع.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), last = steps.length - 1;
    return html`<figure className="fig sav2"><div className="fig-stage">
      <div className="sav2-hub">
        ${CASE.map((c, j) => html`<button key=${c.k} style=${{ gridArea: c.k }} className=${i === j + 1 || i === last ? 'on' : ''} aria-pressed=${String(i === j + 1)} onClick=${() => ctl.go(j + 1)}>${c.t}</button>`)}
        <button className=${'sav2-repo' + (i === 0 || i === last ? ' on' : '') + (i === last && !calm() ? ' pulse' : '')} onClick=${() => ctl.go(last)}>Central repository</button>
      </div>
      <div className=${'sav2-feat ' + pop(i === 0 || i === last)}>${(i === last ? ['security', 'version control', 'import/export', 'backup and recovery', 'user accounts', 'usage accounting'] : ['data names', 'format', 'uses', 'location']).map(f => html`<span key=${f}>${f}</span>`)}</div>
      <p className="sav2-note">${i === last ? 'Other features a CASE product may provide' : i === 0 ? 'Metadata kept in the repository' : 'Tap a tool'}</p>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2: CASE support in each SDLC phase ── */
  const TOOLS = ['Diagramming tools', 'Matrix tools', 'Repository', 'Documentation generators', 'Form and report generators', 'Analysis tools', 'Code and DDL generators'];
  const PH = [
    { p: 'Project identification and selection', u: [0, 1], en: '<b>Project identification and selection</b>: examine information needs, segment and rank them. Support: <b>diagramming and matrix tools</b>.', ar: 'الـ <b>Project identification and selection</b>: بنفحص الـ information needs ونقسمها ونرتبها. الدعم بييجي من الـ <b>diagramming tools والـ matrix tools</b>.' },
    { p: 'Project initiation and planning', u: [2, 3], en: '<b>Project initiation and planning</b>: organize a team, create a high-level plan. Support: <b>repository and documentation generators</b>.', ar: 'الـ <b>Project initiation and planning</b>: بننظم team ونعمل high-level plan. الدعم بييجي من الـ <b>repository والـ documentation generators</b>.' },
    { p: 'Analysis', u: [0], en: '<b>Analysis</b>: determine requirements within cost, labor and technical constraints. Support: <b>diagramming tools</b> for process, logic and data models.', ar: 'الـ <b>Analysis</b>: بنحدد الـ requirements جوه حدود التكلفة والعمالة والـ technical constraints. الدعم بييجي من الـ <b>diagramming tools</b> للـ process والـ logic والـ data models.' },
    { p: 'Design', u: [4, 5, 3], en: '<b>Design</b>: create detailed plans. Support: <b>form and report generators</b> to prototype; <b>analysis and documentation generators</b>.', ar: 'الـ <b>Design</b>: بنعمل plans مفصلة. الدعم بييجي من الـ <b>form and report generators</b> عشان الـ prototype، ومن الـ <b>analysis tools والـ documentation generators</b>.' },
    { p: 'Implementation', u: [6, 5, 4, 3], en: '<b>Implementation</b>: translate the design into an IS. Support: <b>code and DDL generators</b>, analysis tools, form and report generators, documentation generators.', ar: 'الـ <b>Implementation</b>: بنحوّل الـ design لـ IS. الدعم بييجي من الـ <b>code and DDL generators</b>، والـ analysis tools، والـ form and report generators، والـ documentation generators.' },
    { p: 'Maintenance', u: [0, 1, 2, 3, 4, 5, 6], s: 2, en: '<b>Maintenance</b>: change existing software. Support: <b>all tools</b>, with emphasis on the <b>central repository</b>.', ar: 'الـ <b>Maintenance</b>: بنغيّر الـ software الموجود. الدعم بييجي من <b>كل الـ tools</b>، مع التركيز على الـ <b>central repository</b>.' }
  ];
  function L2CasePhase({ ar }) {
    const [i, ctl] = useSteps(PH.length, 2600), P = PH[i];
    return html`<figure className="fig sav2"><div className="fig-stage">
      <div className="sav2-ph" role="group">${PH.map((x, j) => html`<button key=${x.p} className=${j === i ? 'cur' : ''} aria-pressed=${String(j === i)} onClick=${() => ctl.go(j)}>${x.p}</button>`)}</div>
      <div className="sav2-tools" aria-live="polite">${TOOLS.map((t, j) => html`<span key=${t} className=${(P.u.includes(j) ? 'on' : '') + (P.s === j ? ' star' : '')}>${P.s === j ? '★ ' : ''}${t}</span>`)}</div>
      </div><${Cap} en=${P.en} ar=${P.ar} showAr=${ar} /><${Bar} steps=${PH} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 64 and 65 (Figure 1-14): the RUP phases ── */
  const RUP = [['Inception', 30, 92, 'color-mix(in srgb, var(--fig-k) 14%, var(--paper))'], ['Elaboration', 68, 112, 'color-mix(in srgb, var(--fig-k) 34%, var(--paper))'], ['Construction', 128, 188, 'color-mix(in srgb, var(--fig-k) 82%, var(--paper))'], ['Transition', 30, 168, 'color-mix(in srgb, var(--fig-k) 60%, var(--paper))']];
  function L2Rup({ ar }) {
    const steps = [
      { en: '<b>Figure 1-14</b>: phases of OOSAD-based development in the <b>Rational Unified Process</b>, an object-oriented methodology. Resource on the vertical axis, time on the horizontal one.', ar: 'الـ <b><bdi dir="ltr">Figure&nbsp;1-14</bdi></b>: الـ phases بتاعة الـ OOSAD-based development في الـ <b>Rational Unified Process</b>، وهي methodology object-oriented. الـ resource على المحور الرأسي والوقت على الأفقي.' },
      { en: '<b>Inception</b>: the first phase, with the fewest resources.', ar: 'الـ <b>Inception</b>: أول phase، وأقل resources.' },
      { en: '<b>Elaboration</b>: more resources; this phase may have several iterations.', ar: 'الـ <b>Elaboration</b>: فيها resources أكتر، والـ phase دي ممكن يبقى فيها كذا iteration.' },
      { en: '<b>Construction</b>: the largest block, the construction of the actual system (coding), also in several iterations.', ar: 'الـ <b>Construction</b>: أكبر جزء، وفيه بناء السيستم الفعلي (الـ coding)، وبرضه على كذا iteration.' },
      { en: '<b>Transition</b>: the last phase.', ar: 'الـ <b>Transition</b>: آخر phase.' },
      { en: 'Each phase is organized into <b>separate iterations</b>: in OOSAD the iterations happen <b>within each phase</b>.', ar: 'كل phase متقسمة لـ <b>iterations منفصلة</b>: في الـ OOSAD الـ iterations بتحصل <b>جوه كل phase</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    let x = 30; const base = 176, scale = .62;
    const bars = RUP.map(([n, w, h, f], k) => { const r = { n, x, w: w * .98, h: h * scale, f, k }; x += w * .98; return r; });
    return html`<figure className="fig sav2"><div className="fig-stage">
      <svg viewBox="0 0 290 216" className="sav2-svg" role="img" aria-label="Figure 1-14: phases of OOSAD-based development"><${Marks} p="sav2-u" />
        <path d="M24 ${base + 4} L24 8" className="sav2-lg" markerEnd="url(#sav2-ug)" /><path d="M20 ${base} L284 ${base}" className="sav2-lg" markerEnd="url(#sav2-ug)" />
        <text x="30" y="20" className="sav2-gt">Resource</text><text x="284" y=${base + 36} textAnchor="end" className="sav2-gt">Time →</text>
        ${bars.map(b => html`<g key=${b.n} className=${'sav2-g' + (i > 0 && i < 5 && i !== b.k + 1 ? ' sav2-dim' : '')}>
          <rect x=${b.x} y=${base - b.h} width=${b.w} height=${b.h} fill=${b.f} stroke=${i === b.k + 1 ? 'var(--pen)' : 'var(--graphite)'} strokeWidth=${i === b.k + 1 ? 3 : 1} />
          ${(i === 5 || (i === b.k + 1 && (b.k === 1 || b.k === 2))) && [1, 2].map(q => html`<line key=${q} x1=${b.x + b.w * q / 3} x2=${b.x + b.w * q / 3} y1=${base - b.h} y2=${base} stroke="var(--paper)" strokeWidth="2" strokeDasharray="4 3" />`)}
          <text x=${b.x + b.w / 2} y=${base + 18} textAnchor="middle" className=${i === b.k + 1 ? 'sav2-pt' : 'sav2-bt'}>${b.n[0]}</text></g>`)}
      </svg>
      <div className="sav2-leg" role="group">${RUP.map(([n, , , f], k) => html`<button key=${n} className=${i === k + 1 ? 'cur' : ''} onClick=${() => ctl.go(k + 1)}><i style=${{ background: f, border: '1px solid var(--graphite)' }}></i>${n[0]} = ${n}</button>`)}</div>
      ${i === 5 && html`<p className="sav2-note">Dashed lines: iterations inside each phase (drawn schematically)</p>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 lab: SDLC time split, planning time used to estimate the whole project ── */
  const SPLIT = [['Planning', 15, 'project manager', 'color-mix(in srgb, var(--fig-k) 26%, var(--paper))'], ['Analysis', 20, 'system analyst', 'color-mix(in srgb, var(--pen) 22%, var(--paper))'], ['Design', 35, 'system designer', 'color-mix(in srgb, var(--ok) 26%, var(--paper))'], ['Implementation', 30, 'developer', 'color-mix(in srgb, var(--graphite) 26%, var(--paper))']];
  const r1 = x => String(Math.round(x * 10) / 10);
  function L2Split({ ar }) {
    const [p, setP] = useState(6);
    const P = Math.max(1, Math.min(365, +p || 1)), T = P / .15, d = SPLIT.map(s => T * s[1] / 100);
    const calc = `${r1(P)} ÷ 0.15 = ${r1(T)} days`, rest = `Analysis ${r1(d[1])}, Design ${r1(d[2])}, Implementation ${r1(d[3])}`;
    const cap = {
      en: `Planning is 15% of the project, so the whole project takes planning ÷ 0.15: <b>${calc}</b>. Then each phase gets its share: ${rest} days.`,
      ar: `الـ Planning بتاخد <bdi dir="ltr">15%</bdi> من المشروع، فوقت المشروع كله بيساوي وقت الـ planning مقسوم على <bdi dir="ltr">0.15</bdi>، يعني:<span class="ltr">${calc}</span>وبعدين كل phase بتاخد نصيبها بالأيام:<span class="ltr">${rest}</span>`
    };
    return html`<figure className="fig sav2"><div className="fig-stage">
      <div className="sav2-in"><label>Try your own: planning time <input type="number" min="1" max="365" value=${p} onInput=${e => setP(e.target.value)} aria-label="Planning time in days" /> days</label>
        <input type="range" min="1" max="60" value=${Math.min(60, P)} onInput=${e => setP(e.target.value)} aria-label="Planning time slider" /></div>
      <div className="sav2-stack" aria-hidden="true">${SPLIT.map(s => html`<div key=${s[0]} style=${{ flex: s[1], background: s[3] }}>${s[1]}%</div>`)}</div>
      <div className="sav2-rows">${SPLIT.map((s, k) => html`<div key=${s[0]}><i style=${{ background: s[3], border: '1px solid var(--graphite)' }}></i><span>${s[0]} ${s[1]}%<small>${s[2]}</small></span><b>${r1(d[k])} d</b></div>`)}
        <div><i></i><span><b style=${{ fontFamily: 'inherit' }}>Whole project</b></span><b>${r1(T)} d</b></div></div>
      <p className="sav2-note">The notes give only the percentages; pick any planning time.</p>
      </div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── L2 lab: the four methodologies (waterfall, parallel, RAD / iterative, agile) ── */
  const METH = {
    wf: { en: '<b>Waterfall</b>: one phase after the other, each starts when the one before it ends.', ar: 'الـ <b>Waterfall</b>: كل phase ورا التانية، وكل واحدة بتبدأ لما اللي قبلها تخلص.' },
    par: { en: '<b>Parallel</b>: after planning and analysis, the project is split into <b>subprojects</b> that are designed and implemented <b>in parallel</b>.', ar: 'الـ <b>Parallel</b>: بعد الـ planning والـ analysis المشروع بيتقسم لـ <b>subprojects</b>، وكل واحد بيتعمله design و implement <b>بالتوازي</b>.' },
    rad: { en: '<b>RAD / iterative</b>: the system is delivered in <b>versions</b> (version 1, 2, 3), each going through analysis, design and implementation again.', ar: 'الـ <b>RAD</b> أو الـ <b>iterative</b>: السيستم بيطلع على <b>نسخ</b> (نسخة 1 و 2 و 3)، وكل نسخة بتعدّي تاني على الـ analysis والـ design والـ implementation.' },
    ag: { en: '<b>Agile</b>: <b>face-to-face communication</b> in each phase.', ar: 'الـ <b>Agile</b>: فيه <b>تواصل وش لوش (face-to-face)</b> في كل phase.' }
  };
  function L2Methods({ ar }) {
    const [m, setM] = useState('wf'), [k, setK] = useState(0), c = calm();
    useEffect(() => { setK(0); if (c) return; const id = setInterval(() => setK(x => x + 1), 900); return () => clearInterval(id); }, [m]);
    const S = (t, on, sub) => html`<span className=${'sav2-s' + (on ? ' on' : '')}>${t}${sub && html`<small>${sub}</small>`}</span>`;
    const A = html`<span className="sav2-ar" aria-hidden="true">↓</span>`;
    const ph = ['Planning', 'Analysis', 'Design', 'Implementation'];
    let body;
    if (m === 'wf' || m === 'ag') { const n = k % 5; body = ph.map((t, j) => html`<div key=${t} className="sav2-r" style=${{ flexDirection: 'column', gap: '2px' }}>${j > 0 && A}${S(t, !c && n === j, m === 'ag' ? 'face-to-face' : '')}</div>`); }
    else if (m === 'par') { const n = k % 6; body = html`${S('Planning', n === 0)}${A}${S('Analysis', n === 1)}${A}
      <div className="sav2-cols">${[1, 2, 3].map(q => html`<div key=${q}><span className="sav2-lab">Subproject ${q}</span>${S('Design', n === 2)}<span className="sav2-ar" aria-hidden="true">→</span>${S('Implementation', n === 3)}</div>`)}</div>
      ${A}${S('System', n === 4)}`; }
    else { const n = k % 11; body = html`${S('Planning', n === 0)}${A}${[1, 2, 3].map(q => html`<div key=${q} className="sav2-ver" style=${{ marginBottom: '4px' }}><b>V${q}</b><div className="sav2-r">${['Analysis', 'Design', 'Implementation'].map((t, j) => html`<span key=${t} style=${{ display: 'contents' }}>${j > 0 && html`<span className="sav2-ar" aria-hidden="true">→</span>`}${S(t, n === (q - 1) * 3 + j + 1)}</span>`)}</div></div>`)}`; }
    return html`<figure className="fig sav2"><div className="fig-stage">
      <${Tabs} list=${[['wf', 'Waterfall'], ['par', 'Parallel'], ['rad', 'RAD / iterative'], ['ag', 'Agile']]} cur=${m} set=${setM} />
      <div className="sav2-flow">${body}</div>
      </div><${Cap} ...${METH[m]} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'sa-l2-triangle': L2Triangle, 'sa-l2-eras': L2Eras, 'sa-l2-tiers': L2Tiers, 'sa-l2-sdlc-cycle': L2Sdlc, 'sa-l2-heart': L2Heart,
    'sa-l2-waterfall': L2Waterfall, 'sa-l2-prototyping': L2Proto, 'sa-l2-rad': L2Rad, 'sa-l2-case-hub': L2CaseHub, 'sa-l2-case-phases': L2CasePhase,
    'sa-l2-rup': L2Rup, 'sa-l2-time-split': L2Split, 'sa-l2-methods': L2Methods
  });
})();
/* ── part L5 ── */
// Systems Analysis and Design visuals, Lecture 5 (COCOMO): the three models, the development modes, the Basic equations as curves, a COCOMO calculator with the course's rounding, the staff/time trade-off, the lecture's Basic and Intermediate examples, the CPLX multipliers, the 15 cost drivers, the Detailed hierarchy, the accuracy of each model and lecture problem (b) (CH_06 slides 3 to 30). Every label and number comes from the slides and the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.sav5 sup{ font-size:.92em; line-height:0; }
.sav5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.sav5 .fig-btn.sav5-on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.sav5-tabs{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 0 10px; }
.sav5-tabs .fig-btn{ font-size:.82rem; padding:3px 10px; min-height:30px; }
.sav5-sub{ text-align:center; font-size:.84rem; font-weight:700; color:var(--graphite); margin:6px 0 4px; }
.sav5-note{ text-align:center; font-size:.84rem; color:var(--graphite); margin:8px 0 0; line-height:1.4; }
.sav5-sl{ display:grid; grid-template-columns:5.6em minmax(0,1fr) 4.6em; gap:8px; align-items:center; max-width:460px; margin:4px auto; font-size:.86rem; color:var(--ink); }
.sav5-sl span{ font-weight:700; } .sav5-sl input{ width:100%; min-width:0; accent-color:var(--fig-k); }
.sav5-sl output{ font:700 .86rem var(--mono); text-align:right; color:var(--fig-k); }
/* models */
.sav5-mods{ display:grid; gap:6px; max-width:460px; margin:0 auto; }
.sav5-mod{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; transition:opacity .4s, box-shadow .4s, background .4s; opacity:.35; }
.sav5-mod.on{ opacity:1; } .sav5-mod.cur{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 10%, var(--paper)); }
.sav5-mod > b{ display:block; font-size:.92rem; color:var(--ink); margin-bottom:3px; }
.sav5-chips{ display:flex; flex-wrap:wrap; gap:4px; }
.sav5-chip{ font-size:.8rem; border:1px solid var(--line); border-radius:99px; padding:1px 8px; color:var(--ink); background:var(--paper-2); }
.sav5-chip.sav5-new{ border-color:var(--fig-k); color:var(--fig-k); font-weight:700; }
.sav5-out{ display:flex; gap:6px; justify-content:center; align-items:center; flex-wrap:wrap; margin:8px 0 0; font-size:.88rem; color:var(--ink); }
.sav5-out span{ border:2px solid var(--fig-k); border-radius:8px; padding:3px 8px; font-weight:700; background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); }
.sav5-out i{ font-style:normal; color:var(--fig-k); font-weight:700; }
/* modes */
.sav5-scale{ max-width:460px; margin:0 auto; }
.sav5-track{ height:10px; border-radius:99px; background:linear-gradient(90deg, var(--ok), var(--fig-k), var(--pen)); opacity:.75; }
.sav5-ticks{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:4px; margin-top:6px; }
.sav5-ticks button{ font:inherit; font-size:.84rem; font-weight:700; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:4px 2px; cursor:pointer; transition:opacity .3s, box-shadow .3s; opacity:.55; }
.sav5-ticks button.on{ opacity:1; box-shadow:0 0 0 2px var(--sav5-c, var(--fig-k)); }
.sav5-ends{ display:flex; justify-content:space-between; gap:8px; font-size:.8rem; color:var(--graphite); margin:4px 0 8px; line-height:1.25; }
.sav5-ends span:last-child{ text-align:right; }
.sav5-card{ border:2px solid var(--sav5-c, var(--fig-k)); border-radius:10px; background:var(--paper); padding:6px 10px; font-size:.88rem; line-height:1.4; color:var(--ink); max-width:460px; margin:0 auto; }
.sav5-card > b{ display:block; color:var(--sav5-c, var(--fig-k)); font-size:.95rem; }
.sav5-card ul{ margin:2px 0 0; padding-left:18px; }
/* chart */
.sav5-svg{ display:block; width:100%; height:auto; max-width:440px; margin:0 auto; }
.sav5 svg text{ fill:var(--ink); font-family:var(--body); }
.sav5 svg text.sav5-gt{ fill:var(--graphite); }
.sav5-tbl{ width:100%; max-width:460px; margin:8px auto 0; border-collapse:collapse; font-size:.84rem; color:var(--ink); }
.sav5-tbl th, .sav5-tbl td{ border-bottom:1px solid var(--line); padding:4px 4px; text-align:left; vertical-align:top; line-height:1.35; }
.sav5-tbl th{ font-size:.8rem; color:var(--graphite); }
.sav5-tbl td.sav5-m{ font-weight:700; white-space:nowrap; }
.sav5-tbl td i{ font-style:normal; display:block; font-size:.8rem; color:var(--graphite); }
.sav5-tbl td b{ font-family:var(--mono); }
.sav5-sw{ display:inline-block; width:10px; height:10px; border-radius:3px; margin-right:5px; vertical-align:middle; }
/* worksheet */
.sav5-ws{ display:grid; gap:5px; max-width:470px; margin:0 auto; }
.sav5-row{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 8px; transition:opacity .4s, box-shadow .4s, background .4s; }
.sav5-row.off{ opacity:0; height:0; padding:0; border:0; overflow:hidden; margin:0; }
.sav5-row.cur{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 9%, var(--paper)); }
.sav5-row > b{ display:block; font-size:.8rem; color:var(--graphite); }
.sav5-fx{ font:600 .86rem/1.45 var(--mono); color:var(--ink); direction:ltr; text-align:left; }
.sav5-fx em{ font-style:normal; color:var(--fig-k); font-weight:700; }
.sav5-fx small{ display:block; font:500 .8rem/1.4 var(--mono); color:var(--graphite); }
.sav5-fx div + div{ margin-top:2px; }
.sav5-team{ display:grid; gap:2px; max-width:300px; margin:8px auto 0; }
.sav5-team i{ display:block; aspect-ratio:1; border-radius:2px; background:color-mix(in srgb, var(--fig-k) 55%, var(--paper)); }
/* trade-off */
.sav5-cmp{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; max-width:460px; margin:8px auto 0; }
.sav5-cmp div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 6px; text-align:center; font-size:.82rem; color:var(--graphite); line-height:1.3; }
.sav5-cmp div b{ display:block; font:700 1rem var(--mono); color:var(--ink); }
.sav5-cmp div.sav5-hot{ border-color:var(--fig-k); } .sav5-cmp div.sav5-hot b{ color:var(--fig-k); }
/* comparison table */
.sav5-ct{ width:100%; max-width:460px; margin:0 auto; border-collapse:collapse; font-size:.86rem; color:var(--ink); }
.sav5-ct th, .sav5-ct td{ border-bottom:1px solid var(--line); padding:5px 6px; text-align:center; }
.sav5-ct th{ font-size:.8rem; color:var(--graphite); } .sav5-ct td:first-child, .sav5-ct th:first-child{ text-align:left; font-weight:700; }
.sav5-ct td span{ font:700 .92rem var(--mono); transition:opacity .4s; }
.sav5-ct td span.off{ opacity:0; } .sav5-ct td.sav5-up span{ color:var(--pen); }
.sav5-ct tr.cur td{ background:color-mix(in srgb, var(--fig-k) 10%, var(--paper)); }
/* multipliers */
.sav5-em{ display:grid; grid-template-columns:repeat(6, minmax(0,1fr)); gap:4px; max-width:460px; margin:0 auto; align-items:end; }
.sav5-em button{ font:inherit; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:3px 0 4px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:3px; min-width:0; }
.sav5-em button.on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); }
.sav5-em button i{ display:block; width:60%; border-radius:3px 3px 0 0; background:color-mix(in srgb, var(--fig-k) 60%, var(--paper)); }
.sav5-em button b{ font:700 .8rem var(--mono); }
.sav5-em button small{ font-size:.74rem; line-height:1.1; color:var(--graphite); text-align:center; }
.sav5-bar2{ max-width:460px; margin:10px auto 0; display:grid; gap:4px; font-size:.82rem; color:var(--ink); }
.sav5-bar2 div{ display:grid; grid-template-columns:6.2em minmax(0,1fr) 3.4em; gap:6px; align-items:center; }
.sav5-bar2 span{ display:block; height:14px; border-radius:4px; transition:width .5s; }
.sav5-bar2 b{ font-family:var(--mono); text-align:right; }
/* drivers */
.sav5-areas{ display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:6px; max-width:470px; margin:0 auto; }
.sav5-area{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:5px 8px; transition:opacity .4s, box-shadow .4s; opacity:.3; }
.sav5-area.on{ opacity:1; } .sav5-area.cur{ box-shadow:0 0 0 2px var(--fig-k); }
.sav5-area > b{ display:flex; justify-content:space-between; font-size:.88rem; color:var(--ink); }
.sav5-area > b i{ font-style:normal; font-family:var(--mono); color:var(--fig-k); }
.sav5-drv{ display:grid; grid-template-columns:3.6em minmax(0,1fr); gap:1px 6px; font-size:.82rem; line-height:1.3; margin-top:3px; color:var(--ink); }
.sav5-drv code{ font:700 .82rem var(--mono); color:var(--fig-k); background:none; padding:0; }
.sav5-tot{ text-align:center; font:700 .95rem var(--mono); color:var(--ink); margin:8px 0 0; }
.sav5-tot em{ font-style:normal; color:var(--fig-k); }
/* hierarchy */
.sav5-tree{ max-width:460px; margin:0 auto; display:grid; gap:6px; }
.sav5-lv{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:5px 8px; text-align:center; transition:opacity .4s, box-shadow .4s, background .4s; }
.sav5-lv.dim{ opacity:.35; } .sav5-lv.cur{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 10%, var(--paper)); }
.sav5-lv > b{ display:block; font-size:.88rem; color:var(--ink); }
.sav5-lv small{ display:block; font-size:.8rem; color:var(--graphite); line-height:1.3; }
.sav5-lv code{ font:700 .8rem var(--mono); color:var(--fig-k); background:none; padding:0; }
.sav5-subs{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; }
.sav5-subs > div{ display:grid; gap:4px; border-left:2px solid var(--line); border-right:2px solid var(--line); border-radius:12px; padding:0 3px; }
.sav5-mds{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:4px; }
.sav5-mds .sav5-lv{ padding:4px 2px; }
.sav5-down{ text-align:center; color:var(--graphite); font-size:.85rem; line-height:1; }
/* accuracy */
.sav5-acc{ display:grid; gap:7px; max-width:460px; margin:0 auto; }
.sav5-acc > div{ transition:opacity .4s; } .sav5-acc > div.off{ opacity:.18; }
.sav5-acc b{ display:block; font-size:.84rem; color:var(--ink); }
.sav5-acc small{ font-size:.8rem; color:var(--graphite); }
.sav5-tr{ position:relative; height:18px; border-radius:5px; background:var(--paper); border:1px solid var(--line); overflow:hidden; margin-top:2px; }
.sav5-tr span{ position:absolute; left:0; top:0; bottom:0; border-radius:4px; transition:width .7s; }
.sav5-tr em{ position:absolute; right:6px; top:0; font:700 .82rem/18px var(--mono); font-style:normal; color:var(--ink); }
`;
  if (!document.getElementById('sav5-css')) { const s = document.createElement('style'); s.id = 'sav5-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── shared arithmetic: the course's equations and rounding (round each result, use the rounded value next) ── */
  const R = Math.round, N = v => v.toLocaleString('en-US'), X = ' × ';
  const p4 = v => v.toPrecision(4), fx = v => (v >= 10 ? v.toFixed(1) : v.toFixed(2));
  const isInt = v => Math.abs(v - R(v)) < 1e-9;
  const ap = (v, r) => (isInt(v) ? '= ' + R(v) : '= ' + fx(v) + ' ≈ ' + r);
  const MODES = [
    { k: 'organic', n: 'Organic', col: 'var(--ok)', basic: [2.4, 1.05, 0.38], inter: [3.2, 1.05, 0.38] },
    { k: 'semi', n: 'Semidetached', col: 'var(--fig-k)', basic: [3.0, 1.12, 0.35], inter: [3.0, 1.12, 0.35] },
    { k: 'embedded', n: 'Embedded', col: 'var(--pen)', basic: [3.6, 1.20, 0.32], inter: [2.8, 1.20, 0.32] }
  ];
  function cocomo(a, b, c, dsi, eaf) {
    const k = dsi / 1000, pw = k ** b, Er = eaf * a * pw, E = R(Er), pc = E ** c, Tr = 2.5 * pc, T = R(Tr), Sr = E / T, S = R(Sr), Pr = dsi / E, P = R(Pr);
    const pre = eaf !== 1 ? eaf.toFixed(2) + X : '';
    return { k, pw, Er, E, pc, Tr, T, Sr, S, Pr, P,
      fE: `E = ${pre}${a.toFixed(1)}${X}${k}<sup>${b.toFixed(2)}</sup> = ${pre}${a.toFixed(1)}${X}${p4(pw)} <em>${ap(Er, E)}</em> MM`,
      fT: `TDEV = 2.5${X}${E}<sup>${c.toFixed(2)}</sup> = 2.5${X}${p4(pc)} <em>${ap(Tr, T)}</em> months`,
      fS: `Staffing = ${E} / ${T} <em>${ap(Sr, S)}</em> FSP`,
      fP: `Productivity = ${N(dsi)} / ${E} <em>${ap(Pr, P)}</em> DSI/MM` };
  }
  // staff changed by a factor: new staff rounded, then months = E / staff (rounded)
  function staffChange(E, S, f) { const sr = f * S, s2 = Math.max(1, R(sr)), mr = E / s2, m2 = R(mr), ex = E / sr; return { sr, s2, mr, m2, ex }; }
  // time changed by a factor: new time rounded to a whole month (a half month, like 6.5, is kept as in the course key), then FSP = E / time (rounded)
  function timeChange(E, T, f) { const tr = f * T, half = isInt(tr * 2), t2 = half ? tr : R(tr), sr = E / t2, s2 = R(sr); return { tr, half, t2, sr, s2 }; }
  const tStr = v => (isInt(v) ? String(R(v)) : String(+v.toFixed(2)));

  const Tabs = ({ list, sel, set }) => html`<div className="sav5-tabs">${list.map(([k, l]) => html`<button key=${k} className=${'fig-btn' + (sel === k ? ' sav5-on' : '')} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const Slider = ({ lab, min, max, step, v, set, show }) => html`<label className="sav5-sl"><span>${lab}</span><input type="range" min=${min} max=${max} step=${step} value=${v} onInput=${e => set(+e.target.value)} /><output>${show ? show(v) : v}</output></label>`;
  const Fx = ({ h }) => html`<div className="sav5-fx" dangerouslySetInnerHTML=${{ __html: h }}></div>`;

  /* ── [0.1, 0.2] COCOMO and its three models ── */
  function Models({ ar }) {
    const steps = [
      { en: 'COCOMO <b>predicts the effort and schedule</b> of a software product from inputs about the <b>size</b> of the software and a number of <b>cost drivers</b> that affect productivity.', ar: 'الـ COCOMO <b>بيتوقع الـ effort والـ schedule</b> لمنتج software من inputs عن <b>حجم</b> الـ software وعدد من الـ <b>cost drivers</b> اللي بتأثر على الـ productivity.' },
      { en: '<b>Basic model</b>: one predictor, the size in DSI, plus the development mode (organic, semidetached or embedded).', ar: 'الـ <b>Basic model</b> بيستخدم predictor واحد بس هو الحجم بالـ DSI، ومعاه الـ development mode (organic أو semidetached أو embedded).' },
      { en: '<b>Intermediate model</b>: adds <b>15 cost drivers</b>; the product of their effort multipliers is the <b>EAF</b>, which multiplies the effort.', ar: 'الـ <b>Intermediate model</b> بيزوّد <b>15 cost driver</b>، وحاصل ضرب الـ effort multipliers بتاعتهم هو الـ <b>EAF</b> اللي بيتضرب في الـ effort.' },
      { en: '<b>Detailed model</b>: same equations as Intermediate, plus <b>phase-sensitive</b> effort multipliers and a <b>module-subsystem-system hierarchy</b>. The three models reflect the complexity.', ar: 'الـ <b>Detailed model</b> بيستخدم نفس معادلات الـ Intermediate، وكمان effort multipliers <b>phase-sensitive</b> و<b>hierarchy</b> من module-subsystem-system. التلات models بيعكسوا درجة التعقيد.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const M = [
      ['Basic model', [['Size (KDSI)', 0], ['Mode', 0]]],
      ['Intermediate model', [['Size (KDSI)', 0], ['Mode', 0], ['15 cost drivers → EAF', 1]]],
      ['Detailed model', [['Size (KDSI)', 0], ['Mode', 0], ['15 cost drivers', 0], ['Phase-sensitive multipliers', 1], ['Module / subsystem / system', 1]]]
    ];
    return html`<figure className="fig sav5"><div className="fig-stage">
      <div className="sav5-mods">${M.map(([t, ch], j) => html`<div key=${j} className=${'sav5-mod' + (i >= j + 1 ? ' on' : '') + (i === j + 1 ? ' cur' : '')}>
        <b>${t}</b><div className="sav5-chips">${ch.map(([c, nw], q) => html`<span key=${q} className=${'sav5-chip' + (nw ? ' sav5-new' : '')}>${c}</span>`)}</div></div>`)}</div>
      <div className="sav5-out"><i>predicts</i><span>Effort E (man-months)</span><span>Schedule TDEV (months)</span></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] the three development modes ── */
  function Modes({ ar }) {
    const steps = [
      { en: '<b>Organic</b>: developed in a familiar, stable environment, similar to previously developed projects, relatively small, requires little innovation.', ar: 'الـ <b>Organic</b> بيتعمل في بيئة مألوفة ومستقرة، وشبه مشاريع اتعملت قبل كده، وصغير نسبيًا ومحتاج innovation قليل.' },
      { en: '<b>Semidetached</b>: intermediate between organic and embedded.', ar: 'الـ <b>Semidetached</b> في النص بين الـ organic والـ embedded.' },
      { en: '<b>Embedded</b>: tight, inflexible constraints and interface requirements; the product requires great innovation.', ar: 'الـ <b>Embedded</b> عنده constraints وinterface requirements صارمة ومش مرنة، والمنتج محتاج innovation كبير.' },
      { en: 'The mode picks the coefficients of the equations: the further right, the bigger the effort for the same size (exponent 1.05, 1.12, 1.20 in Basic COCOMO).', ar: 'الـ mode هو اللي بيحدد معاملات المعادلات، وكل ما نروح يمين الـ effort بيكبر لنفس الحجم.<span class="ltr">exponent: 1.05 → 1.12 → 1.20 (Basic)</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const C = [
      ['Developed in a familiar, stable environment', 'Similar to previously developed projects', 'Relatively small, requires little innovation'],
      ['Intermediate between organic and embedded'],
      ['Tight, inflexible constraints and interface requirements', 'The product requires great innovation']
    ];
    const cur = i < 3 ? i : -1;
    return html`<figure className="fig sav5"><div className="fig-stage">
      <div className="sav5-scale"><div className="sav5-track"></div>
        <div className="sav5-ticks">${MODES.map((m, j) => html`<button key=${j} style=${{ '--sav5-c': m.col }} className=${i === 3 || j === cur ? 'on' : ''} onClick=${() => ctl.go(j)}>${m.n}</button>`)}</div>
        <div className="sav5-ends"><span>familiar, small, little innovation</span><span>tight constraints, great innovation</span></div></div>
      ${cur >= 0 ? html`<div className="sav5-card" style=${{ '--sav5-c': MODES[cur].col }}><b>${MODES[cur].n} mode</b><ul>${C[cur].map((t, q) => html`<li key=${q}>${t}</li>`)}</ul></div>`
        : html`<table className="sav5-tbl"><thead><tr><th>Mode</th><th>Basic E</th><th>Basic TDEV</th></tr></thead><tbody>${MODES.map((m, j) => html`<tr key=${j}><td className="sav5-m"><span className="sav5-sw" style=${{ background: m.col }}></span>${m.n}</td><td><b>${m.basic[0].toFixed(1)}·KDSI<sup>${m.basic[1].toFixed(2)}</sup></b></td><td><b>2.5·E<sup>${m.basic[2].toFixed(2)}</sup></b></td></tr>`)}</tbody></table>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2] Basic equations: effort grows faster than size, more so for embedded ── */
  function Curves({ ar }) {
    const [k, setK] = useState(32);
    const W = 300, H = 196, x0 = 44, x1 = 290, y0 = 166, y1 = 12, YM = 950;
    const sx = v => x0 + (x1 - x0) * v / 100, sy = v => y0 - (y0 - y1) * v / YM;
    const res = MODES.map(m => cocomo(m.basic[0], m.basic[1], m.basic[2], k * 1000, 1));
    const path = m => Array.from({ length: 51 }, (_, j) => { const v = j * 2; return (j ? 'L' : 'M') + sx(v).toFixed(1) + ' ' + sy(m.basic[0] * v ** m.basic[1]).toFixed(1); }).join(' ');
    const [o, s, e] = res.map(r => r.E), [to, ts, te] = res.map(r => r.T);
    const cap = {
      en: `At <b>${k} KDSI</b> (${N(k * 1000)} DSI) Basic COCOMO gives <b>${o} MM</b> organic, <b>${s} MM</b> semidetached and <b>${e} MM</b> embedded (schedules ${to}, ${ts} and ${te} months). The exponent grows from 1.05 to 1.20, so the gap widens as the size grows.${k === 32 ? ' 32 KDSI semidetached is the lecture example: 146 MM, 14 months.' : ''}`,
      ar: `عند حجم <bdi dir="ltr">${k}&nbsp;KDSI</bdi> الـ Basic COCOMO بيدّي <b>${o} MM</b> للـ organic، و<b>${s} MM</b> للـ semidetached، و<b>${e} MM</b> للـ embedded، والـ schedules هي ${to} و ${ts} و ${te} شهر. الـ exponent بيكبر من 1.05 لـ 1.20 فالفرق بيزيد كل ما الحجم يكبر.${k === 32 ? ' وحجم 32 KDSI مع الـ semidetached هو مثال المحاضرة اللي طلع 146 MM و 14 شهر.' : ''}`
    };
    return html`<figure className="fig sav5"><div className="fig-stage">
      <svg className="sav5-svg" viewBox=${`0 0 ${W} ${H}`} role="img" aria-label="Effort against size for the three modes">
        ${[0, 250, 500, 750].map(v => html`<g key=${v}><line x1=${x0} x2=${x1} y1=${sy(v)} y2=${sy(v)} stroke="var(--line)" /><text x=${x0 - 5} y=${sy(v) + 5} textAnchor="end" fontSize="14" className="sav5-gt">${v}</text></g>`)}
        ${[0, 25, 50, 75, 100].map(v => html`<text key=${v} x=${sx(v)} y=${y0 + 17} textAnchor="middle" fontSize="14" className="sav5-gt">${v}</text>`)}
        <text x=${x1} y=${H - 1} textAnchor="end" fontSize="14">KDSI</text><text x=${x0 + 4} y=${y1 + 4} fontSize="14">E (MM)</text>
        <line x1=${sx(k)} x2=${sx(k)} y1=${y1} y2=${y0} stroke="var(--graphite)" strokeDasharray="4 4" />
        ${MODES.map((m, j) => html`<g key=${j}><path d=${path(m)} fill="none" stroke=${m.col} strokeWidth="2.6" /><circle cx=${sx(k)} cy=${sy(res[j].Er)} r="5" fill=${m.col} stroke="var(--paper)" strokeWidth="1.5" /></g>`)}
      </svg>
      <${Slider} lab="KDSI" min=${1} max=${100} step=${1} v=${k} set=${setK} />
      <table className="sav5-tbl"><thead><tr><th>Mode</th><th>Effort</th><th>Schedule</th></tr></thead><tbody>
        ${MODES.map((m, j) => html`<tr key=${j}><td className="sav5-m"><span className="sav5-sw" style=${{ background: m.col }}></span>${m.n}</td>
          <td><b>${res[j].E} MM</b><i>${m.basic[0].toFixed(1)}·${k}^${m.basic[1].toFixed(2)} = ${fx(res[j].Er)}</i></td>
          <td><b>${res[j].T} mo</b><i>2.5·${res[j].E}^${m.basic[2].toFixed(2)} = ${fx(res[j].Tr)}</i></td></tr>`)}</tbody></table>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── [3] COCOMO calculator with the course's rounding ── */
  const PRESETS = {
    lb: { lab: 'Lecture: Basic', m: 1, model: 'basic', dsi: 32000, eaf: 1, sal: 0 },
    li: { lab: 'Lecture: Intermediate', m: 1, model: 'inter', dsi: 32000, eaf: 1.15, sal: 0 },
    pb: { lab: 'Problem (b)', m: 0, model: 'inter', dsi: 8000, eaf: 1, sal: 5000 },
    e21: { lab: 'Exam 2021/22', m: 2, model: 'basic', dsi: 40000, eaf: 1, sal: 0 },
    e23: { lab: 'Exam 2023/24', m: 1, model: 'basic', dsi: 24000, eaf: 1, sal: 5000 }
  };
  function Calc({ ar }) {
    const [pre, setPre] = useState('lb'), [m, setM] = useState(1), [model, setModel] = useState('basic'), [dsi, setDsi] = useState(32000), [eaf, setEaf] = useState(1), [sal, setSal] = useState(5000);
    const own = pre === 'own', P = own ? { m, model, dsi, eaf: model === 'inter' ? eaf : 1, sal } : PRESETS[pre];
    const steps = [0, 1, 2, 3, 4, 5];
    const [i, ctl] = useSteps(steps.length, 1700);
    const pick = k => { setPre(k); if (k === 'own') ctl.go(5); else ctl.replay(); };
    const md = MODES[P.m], [a, b, c] = md[P.model], r = cocomo(a, b, c, P.dsi, P.eaf);
    const cost = P.sal ? r.S * r.T * P.sal : 0;
    const rows = [
      ['Inputs', `${md.n}, ${N(P.dsi)} DSI → KDSI = ${r.k}<br>E = ${P.model === 'inter' && P.eaf !== 1 ? 'EAF·' : ''}${a.toFixed(1)}·KDSI<sup>${b.toFixed(2)}</sup>${P.model === 'inter' ? (P.eaf !== 1 ? `, EAF = ${P.eaf.toFixed(2)}` : ' (EAF = 1)') : ''}; TDEV = 2.5·E<sup>${c.toFixed(2)}</sup>${P.sal ? `<br>salary = EP ${N(P.sal)} / month` : ''}`],
      ['1. Effort', r.fE], ['2. Schedule', r.fT], ['3. Average staffing', r.fS], ['4. Productivity', r.fP],
      ['5. Cost', P.sal ? `${r.S}${X}${r.T}${X}${N(P.sal)} = <em>EP ${N(cost)}</em><small>exact form E × salary = ${r.E}${X}${N(P.sal)} = EP ${N(r.E * P.sal)}</small>` : 'no salary given in this problem']
    ];
    const caps = [
      { en: `Inputs: ${md.n} mode, ${N(P.dsi)} DSI, so KDSI = ${r.k}.${pre === 'pb' ? ' The problem prints 3.2 (the Intermediate organic constant with EAF = 1); the Basic organic constant is 2.4. Always use the constant in the question.' : ''}`,
        ar: `المدخلات: الـ mode هو ${md.n} والحجم <bdi dir="ltr">${N(P.dsi)}&nbsp;DSI</bdi>${pre === 'pb' ? ' (والمسألة كاتبة الثابت 3.2 وده ثابت الـ Intermediate organic مع الـ EAF بواحد، أما ثابت الـ Basic organic فهو 2.4، فاستخدم دايمًا الثابت اللي في السؤال)' : ''}، وبكده<span class="ltr">KDSI = ${r.k}</span>` },
      { en: `Effort: ${fx(r.Er)} rounds to <b>${r.E} man-months</b>, and the next steps use ${r.E}.`, ar: `الـ Effort بيطلع ${fx(r.Er)} ونقرّبه لـ <b>${r.E}</b> man-months، والخطوات اللي بعد كده بتستخدم الرقم المقرّب.` },
      { en: `Schedule from the rounded effort: TDEV = ${fx(r.Tr)} ≈ <b>${r.T} months</b>.`, ar: `الـ Schedule بنحسبه من الـ effort المقرّب، وبيطلع <b>${r.T}</b> شهر.<span class="ltr">TDEV = ${fx(r.Tr)} ≈ ${r.T}</span>` },
      { en: `Average staffing = effort / schedule = ${r.E} / ${r.T} ≈ <b>${r.S} FSP</b> (full-time software personnel).`, ar: `الـ Average staffing هو الـ effort على الـ schedule وبيطلع <b>${r.S}</b> FSP يعني full-time software personnel.<span class="ltr">${r.E} / ${r.T} ≈ ${r.S}</span>` },
      { en: `Productivity = DSI / effort = ${N(P.dsi)} / ${r.E} ≈ <b>${r.P} DSI/MM</b>.`, ar: `الـ Productivity هي الـ DSI على الـ effort وبتطلع <bdi dir="ltr"><b>${r.P}</b>&nbsp;DSI/MM</bdi>.<span class="ltr">${N(P.dsi)} / ${r.E} ≈ ${r.P}</span>` },
      P.sal ? { en: `Course convention: cost = staff × months × salary = <b>EP ${N(cost)}</b>. The exact form E × salary gives EP ${N(r.E * P.sal)}.`, ar: `طريقة الكورس: التكلفة هي الـ staff في عدد الشهور في المرتب وبتطلع <b>EP ${N(cost)}</b>، والصيغة الدقيقة الـ E في المرتب بتدّي EP ${N(r.E * P.sal)}.` }
        : { en: 'This problem gives no salary, so there is no cost to compute.', ar: 'المسألة دي مفيهاش مرتب فمفيش تكلفة نحسبها.' }
    ];
    return html`<figure className="fig sav5"><div className="fig-stage">
      <${Tabs} list=${[...Object.entries(PRESETS).map(([k, v]) => [k, v.lab]), ['own', 'Try your own']]} sel=${pre} set=${pick} />
      ${own && html`<div>
        <${Tabs} list=${[['basic', 'Basic'], ['inter', 'Intermediate']]} sel=${model} set=${setModel} />
        <${Tabs} list=${MODES.map((q, j) => [j, q.n])} sel=${m} set=${setM} />
        <${Slider} lab="DSI" min=${1000} max=${100000} step=${1000} v=${dsi} set=${setDsi} show=${N} />
        ${model === 'inter' && html`<${Slider} lab="EAF" min=${0.5} max=${2} step=${0.05} v=${eaf} set=${setEaf} show=${v => v.toFixed(2)} />`}
        <${Slider} lab="Salary EP" min=${1000} max=${10000} step=${500} v=${sal} set=${setSal} show=${N} /></div>`}
      <div className="sav5-ws">${rows.map(([l, h], j) => html`<div key=${j} className=${'sav5-row' + (j > i ? ' off' : '') + (j === i ? ' cur' : '')}><b>${l}</b><${Fx} h=${h} /></div>`)}</div>
      </div><${Cap} ...${caps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] staff × months = effort: change the staff or the time ── */
  const TPRE = {
    pb: { lab: 'Problem (b)', E: 28, S: 3, T: 9 },
    e21: { lab: 'Exam 2021/22', E: 301, S: 19, T: 16 },
    e23: { lab: 'Exam 2023/24', E: 105, S: 8, T: 13 },
    q70: { lab: 'Quiz: 70 KDSI', E: 589, S: 31, T: 19 }
  };
  const FS = [['¼', 0.25], ['½', 0.5], ['¾', 0.75], ['80%', 0.8]], FT = [['¼', 0.25], ['½', 0.5], ['70%', 0.7], ['75%', 0.75], ['2×', 2]];
  function Tradeoff({ ar }) {
    const [pre, setPre] = useState('pb'), [kind, setKind] = useState('s'), [fs, setFs] = useState(0.75), [ft, setFt] = useState(2), [oE, setOE] = useState(120), [oT, setOT] = useState(12);
    const own = pre === 'own', B = own ? { E: oE, T: oT, S: Math.max(1, R(oE / oT)) } : TPRE[pre];
    const { E, S, T } = B;
    const fl = (kind === 's' ? FS : FT).find(q => q[1] === (kind === 's' ? fs : ft))[0];
    let S2, T2, en, arT, line;
    if (kind === 's') {
      const c = staffChange(E, S, fs); S2 = c.s2; T2 = c.m2;
      line = `${fl}${X}${S} ${ap(c.sr, c.s2)} FSP → ${E} / ${c.s2} ${ap(c.mr, c.m2)} months`;
      const exact = isInt(c.sr) ? '' : ` Without rounding the staff: ${E} / ${tStr(c.sr)} = ${fx(c.ex)}.`;
      en = `Staff decreased to <b>${fl}</b> of ${S}: ${line}. The effort stays ${E} MM, so fewer people need more months (was ${T}).${exact}`;
      arT = `الـ staff قلّ لـ <b>${fl}</b> من ${S} وبعد التقريب بقى <b>${c.s2}</b> FSP. الـ effort ثابت ${E} MM فالمدة بقت <b>${c.m2}</b> شهر بدل ${T}.<span class="ltr">${line}</span>${isInt(c.sr) ? '' : `ومن غير ما نقرّب الـ staff المدة بتبقى<span class="ltr">${E} / ${tStr(c.sr)} = ${fx(c.ex)}</span>`}`;
    } else {
      const c = timeChange(E, T, ft); S2 = c.s2; T2 = c.t2;
      const tl = isInt(c.tr) ? `${fl}${X}${T} = ${R(c.tr)}` : c.half ? `${fl}${X}${T} = ${tStr(c.tr)}` : `${fl}${X}${T} = ${tStr(c.tr)} ≈ ${c.t2}`;
      line = `${tl} months → ${E} / ${tStr(c.t2)} ${ap(c.sr, c.s2)} FSP`;
      en = `Time changed to <b>${fl}</b> of ${T} months: ${line} (was ${S}).${c.half && !isInt(c.tr) ? ' A half month is kept, as in the 2023/24 key.' : ''}`;
      arT = `الوقت اتغيّر لـ <b>${fl}</b> من ${T} شهر، فعدد الـ FSP المطلوب بقى <b>${c.s2}</b> بدل ${S}.<span class="ltr">${line}</span>${c.half && !isInt(c.tr) ? 'نص الشهر بيفضل زي ما هو زي حل امتحان <bdi dir="ltr">2023/24</bdi>.' : ''}`;
    }
    const Wd = 300, Hd = 188, mx = Math.max(T, T2) * 1.05, my = Math.max(S, S2) * 1.1, gx = 40, gy = 150, wW = 250, hH = 135;
    const rx = v => gx + wW * v / mx, ry = v => gy - hH * v / my;
    return html`<figure className="fig sav5"><div className="fig-stage">
      <${Tabs} list=${[...Object.entries(TPRE).map(([k, v]) => [k, v.lab]), ['own', 'Try your own']]} sel=${pre} set=${setPre} />
      ${own && html`<div><${Slider} lab="E (MM)" min=${10} max=${600} step=${1} v=${oE} set=${setOE} /><${Slider} lab="TDEV" min=${3} max=${30} step=${1} v=${oT} set=${setOT} /></div>`}
      <${Tabs} list=${[['s', 'Change the staff'], ['t', 'Change the time']]} sel=${kind} set=${setKind} />
      <${Tabs} list=${(kind === 's' ? FS : FT).map(([l, v]) => [v, l])} sel=${kind === 's' ? fs : ft} set=${kind === 's' ? setFs : setFt} />
      <svg className="sav5-svg" viewBox=${`0 0 ${Wd} ${Hd}`} role="img" aria-label="Effort as a rectangle: staff times months">
        <line x1=${gx} y1=${gy} x2=${gx + wW} y2=${gy} stroke="var(--graphite)" /><line x1=${gx} y1=${gy} x2=${gx} y2=${gy - hH - 4} stroke="var(--graphite)" />
        <rect x=${gx} y=${ry(S)} width=${rx(T) - gx} height=${gy - ry(S)} fill="none" stroke="var(--graphite)" strokeWidth="2" strokeDasharray="5 4" />
        <rect x=${gx} y=${ry(S2)} width=${rx(T2) - gx} height=${gy - ry(S2)} fill="color-mix(in srgb, var(--fig-k) 30%, transparent)" stroke="var(--fig-k)" strokeWidth="2.4" style=${{ transition: calm() ? 'none' : 'all .6s' }} />
        <text x=${gx - 6} y=${ry(S) + 5} textAnchor="end" fontSize="14" className="sav5-gt">${S}</text>
        <text x=${gx - 6} y=${ry(S2) + 5} textAnchor="end" fontSize="14" fontWeight="700" style=${{ fill: 'var(--fig-k)' }} className=${pop(S2 !== S)}>${S2}</text>
        <text x=${rx(T)} y=${gy + 16} textAnchor="middle" fontSize="14" className="sav5-gt">${T}</text>
        <text x=${rx(T2)} y=${gy + 16} textAnchor="middle" fontSize="14" fontWeight="700" style=${{ fill: 'var(--fig-k)' }} className=${pop(T2 !== T)}>${tStr(T2)}</text>
        <text x=${gx + 4} y="13" fontSize="14">staff (FSP)</text><text x=${gx + wW} y=${Hd - 2} textAnchor="end" fontSize="14">months</text>
      </svg>
      <div className="sav5-cmp"><div>estimate<b>${S} FSP × ${T} mo</b></div><div className="sav5-hot">changed<b>${S2} FSP × ${tStr(T2)} mo</b></div></div>
      <p className="sav5-note">Effort = staff × months stays ${E} MM. Dashed: the estimate.</p>
      </div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── shared worksheet for the worked examples ── */
  const Sheet = ({ rows, i }) => html`<div className="sav5-ws">${rows.map(([l, h], j) => html`<div key=${j} className=${'sav5-row' + (j > i ? ' off' : '') + (j === i ? ' cur' : '')}><b>${l}</b><${Fx} h=${h} /></div>`)}</div>`;

  /* ── [5] lecture example: Basic, semidetached, 32,000 DSI ── */
  function ExBasic({ ar }) {
    const r = cocomo(3.0, 1.12, 0.35, 32000, 1);
    const rows = [['Semidetached, 32,000 DSI', 'KDSI = 32000 / 1000 = <em>32</em><small>E = 3.0·KDSI<sup>1.12</sup>, TDEV = 2.5·E<sup>0.35</sup></small>'], ['Effort', r.fE], ['Schedule', r.fT], ['Productivity', r.fP], ['Average staffing', `${r.E} MM / ${r.T} months <em>${ap(r.Sr, r.S)}</em> MAN (FSP)`]];
    const steps = [
      { en: 'The project fits the <b>semidetached</b> mode and will have <b>32,000 DSI</b>, so KDSI = 32.', ar: 'المشروع مناسب للـ <b>semidetached</b> mode وهيبقى فيه <b>32,000</b> DSI، يعني<span class="ltr">KDSI = 32</span>' },
      { en: 'Effort = 3.0 × 32<sup>1.12</sup> = 3.0 × 48.50 = 145.5, rounded to <b>146 man-months</b>.', ar: 'الـ Effort بيطلع 145.5 ونقرّبه لـ <b>146</b> man-months.<span class="ltr">E = 3.0 × 32<sup>1.12</sup> = 3.0 × 48.50 = 145.5 ≈ 146</span>' },
      { en: 'Schedule uses the rounded 146: 2.5 × 146<sup>0.35</sup> = 2.5 × 5.722 = 14.3, so <b>14 months</b>.', ar: 'الـ Schedule بيستخدم الـ 146 المقرّبة وبيطلع <b>14</b> شهر.<span class="ltr">TDEV = 2.5 × 146<sup>0.35</sup> = 2.5 × 5.722 = 14.3 ≈ 14</span>' },
      { en: 'Productivity = 32,000 DSI / 146 MM = <b>219 DSI/MM</b>.', ar: 'الـ Productivity بتطلع <bdi dir="ltr"><b>219</b>&nbsp;DSI/MM</bdi>.<span class="ltr">32,000 DSI / 146 MM = 219 DSI/MM</span>' },
      { en: 'Average staffing = 146 MM / 14 months = 10.4, so <b>10 people</b> (the slide writes 10 MAN). Below: 10 people for 14 months, one square per man-month (10 × 14 = 140, close to 146 because the staff was rounded).', ar: 'الـ Average staffing بيطلع 10.4 يعني <b>10</b> أفراد (الـ slide كاتبة 10 MAN). تحت فيه 10 أفراد لمدة 14 شهر وكل مربع هو man-month واحد، ومجموعهم 140 قريب من 146 علشان الـ staff اتقرّب.<span class="ltr">146 MM / 14 months = 10.4 ≈ 10</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    return html`<figure className="fig sav5"><div className="fig-stage">
      <${Sheet} rows=${rows} i=${i} />
      ${i >= 4 && html`<div className="sav5-team" style=${{ gridTemplateColumns: `repeat(${r.T}, minmax(0,1fr))` }} aria-label="10 rows of 14 squares">${Array.from({ length: r.S * r.T }, (_, j) => html`<i key=${j}></i>`)}</div>
        <p className="sav5-note">${r.S} people (rows) × ${r.T} months (columns)</p>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6.0] effort multipliers: the CPLX row ── */
  const CPLX = [['Very Low', 0.70], ['Low', 0.85], ['Nominal', 1.00], ['High', 1.15], ['Very High', 1.30], ['Extra High', 1.65]];
  function Cplx({ ar }) {
    const [j, setJ] = useState(2);
    const v = CPLX[j][1], base = cocomo(3.0, 1.12, 0.35, 32000, 1), r = cocomo(3.0, 1.12, 0.35, 32000, v), mx = cocomo(3.0, 1.12, 0.35, 32000, 1.65).Er;
    const same = j === 3 ? ' High = 1.15 is the same multiplier as RELY = high in the lecture example, which also gives 167 MM.' : '';
    const cap = {
      en: `CPLX rated <b>${CPLX[j][0]}</b>: multiplier <b>${v.toFixed(2)}</b>. With the other 14 drivers nominal (1.00), EAF = ${v.toFixed(2)}, and the lecture's project (semidetached, 32 KDSI) needs E = ${v.toFixed(2)} × 3.0 × 48.50 = ${fx(r.Er)} ≈ <b>${r.E} MM</b> instead of ${base.E}.${same}`,
      ar: `الـ CPLX متقيّم <b>${CPLX[j][0]}</b> والـ multiplier بتاعه <b>${v.toFixed(2)}</b>. لو باقي الـ 14 driver على الـ nominal يعني 1.00 يبقى الـ EAF هو نفس الرقم، ومشروع المحاضرة (semidetached بحجم 32 KDSI) محتاج <b>${r.E}</b> MM بدل ${base.E}${j === 3 ? '، والـ High هنا هو نفس multiplier الـ RELY العالي في مثال المحاضرة اللي طلع 167 MM برضه' : ''}.<span class="ltr">E = ${v.toFixed(2)} × 3.0 × 48.50 = ${fx(r.Er)} ≈ ${r.E}</span>`
    };
    return html`<figure className="fig sav5"><div className="fig-stage">
      <p className="sav5-sub">CPLX (product complexity): pick a rating</p>
      <div className="sav5-em">${CPLX.map(([l, m], q) => html`<button key=${q} className=${q === j ? 'on' : ''} onClick=${() => setJ(q)}><i style=${{ height: (m * 46) + 'px' }}></i><b>${m.toFixed(2)}</b><small>${l}</small></button>`)}</div>
      <div className="sav5-bar2">
        <div><span style=${{ color: 'var(--graphite)' }}>Nominal</span><span style=${{ width: (100 * base.Er / mx) + '%', background: 'var(--faint)' }}></span><b>${base.E}</b></div>
        <div><span style=${{ fontWeight: 700 }}>EAF ${v.toFixed(2)}</span><span style=${{ width: (100 * r.Er / mx) + '%', background: 'var(--fig-k)' }}></span><b>${r.E}</b></div></div>
      <p className="sav5-note">Effort in MM for 32 KDSI, semidetached, Intermediate model</p>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── [6.1] the 15 cost drivers in four areas ── */
  const AREAS = [
    ['Product', [['RELY', 'Required software reliability'], ['DATA', 'Database size'], ['CPLX', 'Product complexity']]],
    ['Computer', [['TIME', 'Execution time constraint'], ['STOR', 'Main storage constraint'], ['VIRT', 'Virtual machine volatility'], ['TURN', 'Computer turnaround time']]],
    ['Personnel', [['ACAP', 'Analyst capability'], ['AEXP', 'Applications experience'], ['PCAP', 'Programmer capability'], ['VEXP', 'Virtual machine experience'], ['LEXP', 'Programming language experience']]],
    ['Project', [['MODP', 'Modern programming practices'], ['TOOL', 'Use of software tools'], ['SCED', 'Required development schedule']]]
  ];
  function Drivers({ ar }) {
    const steps = [
      { en: '<b>Product</b> attributes (3): RELY, DATA, CPLX.', ar: 'الـ <b>Product</b> attributes تلاتة: RELY و DATA و CPLX.' },
      { en: '<b>Computer</b> attributes (4): TIME, STOR, VIRT, TURN.', ar: 'الـ <b>Computer</b> attributes أربعة: TIME و STOR و VIRT و TURN.' },
      { en: '<b>Personnel</b> attributes (5): ACAP, AEXP, PCAP, VEXP, LEXP.', ar: 'الـ <b>Personnel</b> attributes خمسة: ACAP و AEXP و PCAP و VEXP و LEXP.' },
      { en: '<b>Project</b> attributes (3): MODP, TOOL, SCED.', ar: 'الـ <b>Project</b> attributes تلاتة: MODP و TOOL و SCED.' },
      { en: '3 + 4 + 5 + 3 = <b>15 cost drivers</b>. Each gets an effort multiplier from its rating; their product is the <b>EAF</b>.', ar: 'المجموع <b>15 cost driver</b>، وكل واحد بياخد effort multiplier حسب الـ rating، وحاصل ضربهم هو الـ <b>EAF</b>.<span class="ltr">3 + 4 + 5 + 3 = 15</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const cnt = AREAS.slice(0, Math.min(i + 1, 4)).reduce((t, a) => t + a[1].length, 0);
    return html`<figure className="fig sav5"><div className="fig-stage">
      <div className="sav5-areas">${AREAS.map(([t, d], j) => html`<div key=${j} className=${'sav5-area' + (j <= i ? ' on' : '') + (j === i ? ' cur' : '')}>
        <b>${t}<i>${d.length}</i></b><div className="sav5-drv">${d.map(([c, n], q) => html`<${React.Fragment} key=${q}><code>${c}</code><span>${n}</span></${React.Fragment}>`)}</div></div>`)}</div>
      <p className="sav5-tot">drivers: <em>${cnt}</em>${i >= 4 ? html` → EAF = product of the 15 multipliers` : ''}</p>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [7] lecture example: Intermediate, RELY high ── */
  function ExInter({ ar }) {
    const b = cocomo(3.0, 1.12, 0.35, 32000, 1), r = cocomo(3.0, 1.12, 0.35, 32000, 1.15);
    const steps = [
      { en: 'Project A: <b>32,000 DSI</b>, semidetached, in a mission-critical area, so the reliability is high: <b>RELY = high = 1.15</b> (EAF = 1.15).', ar: 'المشروع A حجمه <b>32,000</b> DSI وهو semidetached وفي مجال mission critical، فالـ reliability عالية يعني<span class="ltr">RELY = high = 1.15 (EAF = 1.15)</span>' },
      { en: 'Effort = 1.15 × 3.0 × 32<sup>1.12</sup> = 1.15 × 3.0 × 48.50 = 167.3 ≈ <b>167 MM</b> (Basic: 146).', ar: 'الـ Effort بقى <b>167</b> MM بدل 146 في الـ Basic.<span class="ltr">E = 1.15 × 3.0 × 48.50 = 167.3 ≈ 167</span>' },
      { en: 'Schedule = 2.5 × 167<sup>0.35</sup> = 2.5 × 5.997 = 15.0 ≈ <b>15 months</b> (Basic: 14).', ar: 'الـ Schedule بقى <b>15</b> شهر بدل 14.<span class="ltr">TDEV = 2.5 × 167<sup>0.35</sup> = 2.5 × 5.997 = 15.0 ≈ 15</span>' },
      { en: 'Productivity = 32,000 / 167 = <b>192 DSI/MM</b> (Basic: 219).', ar: 'الـ Productivity بقت <bdi dir="ltr"><b>192</b>&nbsp;DSI/MM</bdi> بدل 219.<span class="ltr">32,000 / 167 = 192</span>' },
      { en: 'Average staffing = 167 / 15 = 11.1 ≈ <b>11 FSP</b> (Basic: 10). One driver rated high made every result bigger, except productivity, which fell.', ar: 'الـ Average staffing بقى <b>11</b> FSP بدل 10. driver واحد بس متقيّم high كبّر كل النتايج ما عدا الـ productivity اللي قلّت.<span class="ltr">167 / 15 = 11.1 ≈ 11</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const T = [['Effort (MM)', b.E, r.E], ['Schedule (months)', b.T, r.T], ['Productivity (DSI/MM)', b.P, r.P], ['Staffing (FSP)', b.S, r.S]];
    return html`<figure className="fig sav5"><div className="fig-stage">
      <table className="sav5-ct"><thead><tr><th></th><th>Basic<br />EAF 1</th><th>Intermediate<br />RELY high, EAF 1.15</th></tr></thead><tbody>
        ${T.map(([l, x, y], j) => html`<tr key=${j} className=${i === j + 1 ? 'cur' : ''}><td>${l}</td><td><span>${x}</span></td><td className="sav5-up"><span className=${j + 1 <= i ? '' : 'off'}>${y}</span></td></tr>`)}</tbody></table>
      <div className="sav5-row" style=${{ marginTop: '8px' }}><${Fx} h=${[`EAF = 1.15 (RELY high)`, r.fE, r.fT, r.fP, r.fS][i]} /></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [8.1] Detailed model: module-subsystem-system hierarchy ── */
  function Hierarchy({ ar }) {
    const steps = [
      { en: 'Detailed COCOMO estimates the product in a <b>three-level hierarchy</b>: the system is made of subsystems, each made of modules. The 15 cost drivers belong to the module or subsystem level.', ar: 'الـ Detailed COCOMO بيقدّر المنتج في <b>hierarchy من تلات مستويات</b>: الـ system فيه subsystems وكل subsystem فيه modules. والـ 15 cost driver تابعين لمستوى الـ module أو الـ subsystem.' },
      { en: '<b>Module level</b>: drivers that vary at the lowest level: CPLX, PCAP, VEXP, LEXP. Each module can have its own rating.', ar: 'مستوى الـ <b>Module</b>: الـ drivers اللي بتتغير في أقل مستوى وهي CPLX و PCAP و VEXP و LEXP، وكل module ممكن يبقى ليه rating مختلف.' },
      { en: '<b>Subsystem level</b>: drivers that vary from subsystem to subsystem but are the same for all modules in one subsystem: RELY, DATA, TIME, STOR, VIRT.', ar: 'مستوى الـ <b>Subsystem</b> فيه drivers بتتغير من subsystem للتاني بس ثابتة لكل الـ modules جوه الواحد، وهي RELY و DATA و TIME و STOR و VIRT.' },
      { en: '<b>System level</b>: overall project relations, such as the nominal effort and schedule equations.', ar: 'مستوى الـ <b>System</b>: علاقات المشروع ككل زي معادلات الـ nominal effort والـ schedule.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const cl = lv => 'sav5-lv' + (i === 0 ? '' : i === lv ? ' cur' : ' dim');
    const Mod = (n, k) => html`<div key=${k} className=${cl(1)}><b>${n}</b>${i === 1 && html`<small><code>CPLX PCAP VEXP LEXP</code></small>`}</div>`;
    return html`<figure className="fig sav5"><div className="fig-stage"><div className="sav5-tree">
      <div className=${cl(3)}><b>System</b><small>nominal effort and schedule equations</small></div>
      <div className="sav5-down">▼</div>
      <div className="sav5-subs">${[1, 2].map(s => html`<div key=${s}>
        <div className=${cl(2)}><b>Subsystem ${s}</b>${i === 2 && html`<small><code>RELY DATA TIME STOR VIRT</code></small>`}<small>same for its modules</small></div>
        <div className="sav5-down">▼</div>
        <div className="sav5-mds">${Mod('Module ' + s + '.1', 1)}${Mod('Module ' + s + '.2', 2)}</div></div>`)}</div>
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4.2, 6.4, 8.4] accuracy of the three models ── */
  function Accuracy({ ar }) {
    const steps = [
      { en: '<b>Basic</b>: within a factor of <b>1.3</b> of the actual cost only <b>29%</b> of the time, and within a factor of <b>2</b> only <b>60%</b> of the time: it lacks the factors that strongly influence cost.', ar: 'الـ <b>Basic</b> تقديراته في حدود factor <b>1.3</b> من التكلفة الحقيقية في <b>29%</b> بس من الحالات، وفي حدود factor <b>2</b> في <b>60%</b> بس، لأنه ناقصه العوامل اللي بتأثر جامد على التكلفة.' },
      { en: '<b>Intermediate</b>: within <b>20%</b> of the actuals <b>68%</b> of the time, thanks to the 15 cost drivers.', ar: 'الـ <b>Intermediate</b> تقديراته في حدود <b>20%</b> من الحقيقي في <b>68%</b> من الحالات بفضل الـ 15 cost driver.' },
      { en: '<b>Detailed</b>: within <b>20%</b> of the actuals <b>70%</b> of the time, but it requires substantially more time and effort to calculate.', ar: 'الـ <b>Detailed</b> تقديراته في حدود <b>20%</b> من الحقيقي في <b>70%</b> من الحالات، بس محتاج وقت ومجهود أكتر بكتير في الحساب.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const A = [
      [0, 'Basic', 'within a factor of 1.3', 29], [0, 'Basic', 'within a factor of 2', 60],
      [1, 'Intermediate', 'within 20% of the actuals', 68], [2, 'Detailed', 'within 20% of the actuals', 70]
    ];
    return html`<figure className="fig sav5"><div className="fig-stage"><div className="sav5-acc">
      ${A.map(([s, m, t, p], j) => html`<div key=${j} className=${s <= i ? '' : 'off'}><b>${m} <small>${t}</small></b>
        <div className="sav5-tr"><span style=${{ width: (s <= i ? p : 0) + '%', background: s === i ? 'var(--fig-k)' : 'color-mix(in srgb, var(--fig-k) 45%, var(--paper))' }}></span><em>${p}% of the time</em></div></div>`)}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [9] lecture problem (b): organic, 8,000 DSI, salary EP 5000 ── */
  function ProbB({ ar }) {
    const r = cocomo(3.2, 1.05, 0.38, 8000, 1), E = r.E, S = r.S, T = r.T;
    const sc = [0.75, 0.5, 0.25].map(f => staffChange(E, S, f)), lb = ['¾', '½', '¼'];
    const dt = timeChange(E, T, 2), sal = 5000;
    const rows = [
      ['Given', 'Organic, 8,000 DSI → KDSI = 8<small>E = 3.2·KDSI<sup>1.05</sup>, TDEV = 2.5·E<sup>0.38</sup>, salary EP 5000</small>'],
      ['1. Man-months', r.fE], ['2. Duration', r.fT], ['3. Average staffing', r.fS], ['4. Productivity', r.fP],
      ['5. Staff decreased to ¾, ½, ¼', sc.map((c, j) => `<div>${lb[j]}${X}${S} ${ap(c.sr, c.s2)} → ${E} / ${c.s2} <em>${ap(c.mr, c.m2)}</em> months</div>`).join('') + `<small>exact ½ staff: ${E} / ${tStr(sc[1].sr)} = ${fx(sc[1].ex)} months</small>`],
      ['6. Time doubled', `2${X}${T} = ${dt.t2} months → ${E} / ${dt.t2} <em>${ap(dt.sr, dt.s2)}</em> FSP`],
      ['7. Total programmer cost', `${S}${X}${T}${X}${sal} = <em>EP ${N(S * T * sal)}</em><small>exact form E × salary = ${E}${X}${sal} = EP ${N(E * sal)}</small>`]
    ];
    const steps = [
      { en: 'Organic project of <b>8,000 DSI</b> (KDSI = 8), salary EP 5000 a month. The problem prints E = 3.2·KDSI<sup>1.05</sup>: 3.2 is the Intermediate organic constant with EAF = 1 (Basic organic uses 2.4). Always use the constant printed in the question.', ar: 'مشروع organic حجمه <b>8,000</b> DSI والمرتب EP 5000 في الشهر. المسألة كاتبة الثابت 3.2 وده ثابت الـ Intermediate organic مع الـ EAF بواحد، أما الـ Basic organic فثابته 2.4. استخدم دايمًا الثابت اللي في السؤال.<span class="ltr">KDSI = 8, E = 3.2·KDSI<sup>1.05</sup></span>' },
      { en: 'Man-months = 3.2 × 8<sup>1.05</sup> = 3.2 × 8.877 = 28.4 ≈ <b>28 MM</b>.', ar: 'عدد الـ man-months بيطلع <b>28</b>.<span class="ltr">3.2 × 8<sup>1.05</sup> = 3.2 × 8.877 = 28.4 ≈ 28</span>' },
      { en: 'Duration = 2.5 × 28<sup>0.38</sup> = 2.5 × 3.547 = 8.87 ≈ <b>9 months</b>.', ar: 'مدة المشروع بتطلع <b>9</b> شهور.<span class="ltr">2.5 × 28<sup>0.38</sup> = 2.5 × 3.547 = 8.87 ≈ 9</span>' },
      { en: 'Average staffing = 28 / 9 = 3.11 ≈ <b>3 FSP</b>.', ar: 'الـ Average staffing بيطلع <b>3</b> FSP.<span class="ltr">28 / 9 = 3.11 ≈ 3</span>' },
      { en: 'Productivity = 8000 / 28 = 285.7 ≈ <b>286 DSI/MM</b>.', ar: 'الـ Productivity بتطلع <bdi dir="ltr"><b>286</b>&nbsp;DSI/MM</bdi>.<span class="ltr">8000 / 28 = 285.7 ≈ 286</span>' },
      { en: 'Fewer staff, same 28 MM: ¾ × 3 = 2.25 ≈ 2 → <b>14 months</b>; ½ × 3 = 1.5 ≈ 2 → <b>14 months</b> (the exact 1.5 gives 18.7); ¼ × 3 = 0.75 ≈ 1 → <b>28 months</b>.', ar: 'نفس الـ 28 MM بعدد أقل من الناس: الـ ¾ بتدّي <b>14</b> شهر، والـ ½ بتدّي <b>14</b> شهر برضه (ولو سبنا 1.5 من غير تقريب تطلع 18.7)، والـ ¼ بتدّي <b>28</b> شهر.<span class="ltr">¾ × 3 = 2.25 ≈ 2 → 28 / 2 = 14</span><span class="ltr">½ × 3 = 1.5 ≈ 2 → 28 / 2 = 14</span><span class="ltr">¼ × 3 = 0.75 ≈ 1 → 28 / 1 = 28</span>' },
      { en: 'Double the time: 18 months → 28 / 18 = 1.56 ≈ <b>2 FSP</b>.', ar: 'لو الوقت اتضاعف يبقى 18 شهر ونحتاج <b>2</b> FSP بس.<span class="ltr">28 / 18 = 1.56 ≈ 2</span>' },
      { en: 'Cost (course convention) = 3 FSP × 9 months × 5000 = <b>EP 135,000</b>. The exact form E × salary gives 28 × 5000 = EP 140,000.', ar: 'التكلفة بطريقة الكورس هي <b>EP 135,000</b>، والصيغة الدقيقة الـ E في المرتب بتدّي EP 140,000.<span class="ltr">3 FSP × 9 months × 5000 = 135,000</span><span class="ltr">28 × 5000 = 140,000</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    return html`<figure className="fig sav5"><div className="fig-stage"><${Sheet} rows=${rows} i=${i} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'sa-cocomo-models': Models, 'sa-cocomo-modes': Modes, 'sa-cocomo-curves': Curves, 'sa-cocomo-calc': Calc, 'sa-cocomo-tradeoff': Tradeoff,
    'sa-cocomo-ex-basic': ExBasic, 'sa-cocomo-cplx': Cplx, 'sa-cocomo-drivers': Drivers, 'sa-cocomo-ex-inter': ExInter,
    'sa-cocomo-hierarchy': Hierarchy, 'sa-cocomo-accuracy': Accuracy, 'sa-cocomo-prob-b': ProbB
  });
})();

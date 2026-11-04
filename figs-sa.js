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

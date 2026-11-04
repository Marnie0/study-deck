// Visuals for the Operations Research notes (names 'or-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('for-accent')) { const s = document.createElement('style'); s.id = 'for-accent'; s.textContent = '[data-fig^="or-"]{ --fig-k: var(--k-os); --fig-s: var(--s-os); }'; document.head.appendChild(s); } })();
/* ── part L2 ── */
// Operations Research visuals, Lecture 2 (LP graphical solution): the definitions on a graph, shading a constraint, finding an intersection corner, the 4-step procedure, Examples 1, 2 and 5 (slides 6-36) step by step, a solver for the section/sheet problems and the special cases. Every label and number comes from the site's notes or is computed with the notes' method.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.orv2 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.orv2-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.orv2-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.orv2-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:460px; touch-action:manipulation; }
.orv2-svg text{ fill:var(--ink); font-family:var(--body); }
.orv2-svg text.orv2-mu{ fill:var(--graphite); }
.orv2-svg text.orv2-wt{ fill:#fff; font-weight:700; }
.orv2-draw{ stroke-dasharray:1; animation:orv2draw .9s ease-out both; }
@keyframes orv2draw{ from{ stroke-dashoffset:1; } to{ stroke-dashoffset:0; } }
.orv2-model{ max-width:460px; margin:0 auto 8px; font:.84rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 10px; color:var(--ink); }
.orv2-model div{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; transition:opacity .4s; }
.orv2-model .orv2-dim{ opacity:.45; } .orv2-model .orv2-on{ font-weight:700; }
.orv2-model .orv2-z{ color:var(--fig-k); font-weight:700; }
.orv2-model s{ text-decoration:line-through; opacity:.7; }
.orv2-sw{ width:16px; height:4px; border-radius:2px; display:inline-block; flex:none; }
.orv2-tbl{ width:100%; max-width:460px; margin:8px auto 0; border-collapse:collapse; font:.8rem/1.4 var(--mono); color:var(--ink); background:var(--paper); table-layout:fixed; }
.orv2-tbl th, .orv2-tbl td{ border:1px solid var(--line); padding:3px 6px; text-align:left; overflow-wrap:anywhere; vertical-align:top; }
.orv2-tbl th{ font-weight:600; background:var(--paper-2); }
.orv2-tbl th:first-child, .orv2-tbl td:first-child{ width:36%; }
.orv2-tbl tr.orv2-cur td{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.orv2-tbl tr.orv2-best td{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); font-weight:700; }
.orv2-f{ max-width:460px; margin:8px auto 0; font:.8rem/1.6 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; overflow-wrap:anywhere; }
.orv2-f div{ transition:opacity .4s; } .orv2-f .orv2-dim{ opacity:.3; } .orv2-f .orv2-on{ color:var(--fig-k); font-weight:700; }
.orv2-ed{ max-width:460px; margin:0 auto 8px; display:grid; gap:6px; font-size:.86rem; color:var(--ink); }
.orv2-ed .orv2-l{ display:flex; flex-wrap:wrap; align-items:center; gap:4px; }
.orv2-ed input, .orv2-ed select{ width:3.4em; font:inherit; font-size:.86rem; padding:3px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); min-height:30px; }
.orv2-ed select{ width:auto; }
.orv2-ed .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:30px; }
.orv2-verdict{ max-width:460px; margin:8px auto 0; text-align:center; font-weight:700; color:var(--ink); font-size:.9rem; }
.orv2-verdict.orv2-bad{ color:var(--pen); }
.orv2-range{ display:flex; align-items:center; gap:8px; max-width:460px; margin:6px auto 0; font:.82rem var(--mono); color:var(--ink); }
.orv2-range input{ flex:1; min-width:0; accent-color:var(--fig-s); }
.orv2-cards{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:6px; max-width:460px; margin:0 auto 8px; }
.orv2-cards div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.82rem; line-height:1.3; color:var(--ink); opacity:.5; transition:opacity .4s, box-shadow .4s; }
.orv2-cards div b{ display:block; color:var(--fig-k); font-size:.8rem; }
.orv2-cards div.orv2-on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); }
.orv2 .fig-cap .ltr{ text-align:left; font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .orv2-draw{ animation:none; stroke-dasharray:none; } .orv2-model div, .orv2-f div, .orv2-cards div{ transition:none; } }
`;
  if (!document.getElementById('orv2-css')) { const s = document.createElement('style'); s.id = 'orv2-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers: numbers and text ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const I = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const nf = (v, d = 2) => { let r = Math.round(v * 10 ** d) / 10 ** d; if (Object.is(r, -0)) r = 0; return r < 0 ? '−' + String(-r) : String(r); };
  const zf = v => { let r = Math.round(v * 100) / 100; if (Object.is(r, -0)) r = 0; return (r < 0 ? '−' : '') + Math.abs(r).toLocaleString('en-US', { maximumFractionDigits: 2 }); };
  const co = v => Math.abs(v) === 1 ? '' : nf(Math.abs(v));
  const expr = (a, b) => { let s = ''; if (a) s += (a < 0 ? '−' : '') + co(a) + 'x1'; if (b) s += (s ? (b < 0 ? ' − ' : ' + ') : (b < 0 ? '−' : '')) + co(b) + 'x2'; return s || '0'; };
  const OP = { '<=': '≤', '>=': '≥', '=': '=' };
  const cstr = k => `${expr(k.a, k.b)} ${OP[k.op]} ${nf(k.c)}`;
  const eqs = k => `${expr(k.a, k.b)} = ${nf(k.c)}`;
  const zstr = P => `${P.sense === 'max' ? 'Max' : 'Min'} Z = ${expr(P.c1, P.c2)}`;
  const pstr = (x, y, d = 2) => `(${nf(x, d)}, ${nf(y, d)})`;
  const zcalc = (P, x, y) => `${nf(P.c1)} × ${nf(x)} + ${nf(P.c2)} × ${nf(y)} = ${zf(P.c1 * x + P.c2 * y)}`;
  const COL = ['var(--fig-k)', 'var(--pen)', 'var(--ok)', 'var(--graphite)'];

  /* ── the graphical method: corners, region, optimum ── */
  const val = (k, x, y) => k.a * x + k.b * y;
  const tolOf = k => 1e-7 * Math.max(1, Math.abs(k.c), Math.abs(k.a), Math.abs(k.b));
  const ok = (k, x, y) => { const v = val(k, x, y), t = tolOf(k) * Math.max(1, Math.abs(x), Math.abs(y)); return k.op === '<=' ? v <= k.c + t : k.op === '>=' ? v >= k.c - t : Math.abs(v - k.c) <= t; };
  const feas = (cs, x, y) => x >= -1e-9 && y >= -1e-9 && cs.every(k => ok(k, x, y));
  const meet = (p, q) => { const d = p.a * q.b - q.a * p.b; if (Math.abs(d) < 1e-12) return null; return [(p.c * q.b - q.c * p.b) / d, (p.a * q.c - q.a * p.c) / d]; };
  function cornersOf(cs) {
    const ls = cs.map((k, i) => Object.assign({}, k, { id: i })).concat([{ a: 1, b: 0, c: 0, id: 'x1' }, { a: 0, b: 1, c: 0, id: 'x2' }]), pts = [];
    for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) {
      const m = meet(ls[i], ls[j]); if (!m) continue; let [x, y] = m; if (Math.abs(x) < 1e-9) x = 0; if (Math.abs(y) < 1e-9) y = 0;
      if (!feas(cs, x, y)) continue;
      const s = 1e-7 * Math.max(1, Math.abs(x), Math.abs(y)), old = pts.find(p => Math.abs(p.x - x) <= s && Math.abs(p.y - y) <= s);
      if (old) { [ls[i].id, ls[j].id].forEach(id => { if (!old.on.includes(id)) old.on.push(id); }); } else pts.push({ x, y, on: [ls[i].id, ls[j].id] });
    }
    if (!pts.length) return pts;
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length, cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    const st = pts.slice().sort((p, q) => p.x - q.x || p.y - q.y)[0], ang = p => Math.atan2(p.y - cy, p.x - cx), a0 = ang(st);
    pts.sort((p, q) => ((ang(p) - a0 + 4 * Math.PI) % (2 * Math.PI)) - ((ang(q) - a0 + 4 * Math.PI) % (2 * Math.PI)));
    pts.forEach((p, i) => { p.n = 'ABCDEFGHIJ'[i]; });
    return pts;
  }
  function clip(poly, k) {
    if (k.op === '=') return poly;
    const t = tolOf(k), inn = p => k.op === '<=' ? val(k, p[0], p[1]) <= k.c + t : val(k, p[0], p[1]) >= k.c - t, out = [];
    for (let i = 0; i < poly.length; i++) {
      const s = poly[i], e = poly[(i + 1) % poly.length], si = inn(s), ei = inn(e);
      if (si) out.push(s);
      if (si !== ei) { const vs = val(k, s[0], s[1]), ve = val(k, e[0], e[1]), u = (k.c - vs) / (ve - vs); out.push([s[0] + u * (e[0] - s[0]), s[1] + u * (e[1] - s[1])]); }
    }
    return out;
  }
  const region = (cs, X, Y) => cs.reduce((poly, k) => poly.length ? clip(poly, k) : poly, [[0, 0], [X, 0], [X, Y], [0, Y]]);
  function solve(P) {
    const cor = cornersOf(P.cs); cor.forEach(p => { p.z = P.c1 * p.x + P.c2 * p.y; });
    if (!cor.length) return { cor, status: 'infeasible', opt: [], red: [] };
    const sg = P.sense === 'max' ? 1 : -1, zb = Math.max(...cor.map(p => sg * p.z)) * sg, tz = 1e-7 * Math.max(1, Math.abs(zb));
    const big = region(P.cs, 1e6, 1e6), open = big.some(p => p[0] > 1e5 || p[1] > 1e5);
    const unb = big.some(p => sg * (P.c1 * p[0] + P.c2 * p[1]) > sg * zb + 1e-3 * Math.max(1, Math.abs(zb)));
    const opt = unb ? [] : cor.filter(p => Math.abs(p.z - zb) <= tz);
    const red = P.cs.map((k, i) => i).filter(i => !cor.some(p => p.on.includes(i)));
    return { cor, status: unb ? 'unbounded' : opt.length > 1 ? 'multiple' : 'optimal', opt, zb, open, red };
  }
  const nice = r => { const e = 10 ** Math.floor(Math.log10(r)); for (const m of [1, 2, 5, 10]) if (m * e >= r - 1e-9) return m * e; return 10 * e; };
  function viewOf(cs, pts = []) {
    const xs = [], ys = [];
    cs.forEach(k => { if (k.a > 0 && k.c > 0) xs.push(k.c / k.a); if (k.b > 0 && k.c > 0) ys.push(k.c / k.b); });
    pts.forEach(p => { xs.push(p.x); ys.push(p.y); });
    const mx = Math.max(1, ...xs), my = Math.max(1, ...ys), sx = nice(mx / 6), sy = nice(my / 6);
    return { X: Math.ceil(mx * 1.08 / sx) * sx, Y: Math.ceil(my * 1.08 / sy) * sy, sx, sy };
  }
  function seg(a, b, c, X, Y) { // the part of a·x1 + b·x2 = c inside the box [0,X] × [0,Y]
    const c2 = [], t = 1e-9 * Math.max(X, Y);
    if (b) { c2.push([0, c / b]); c2.push([X, (c - a * X) / b]); }
    if (a) { c2.push([c / a, 0]); c2.push([(c - b * Y) / a, Y]); }
    const inn = c2.filter(p => p[0] >= -t && p[0] <= X + t && p[1] >= -t && p[1] <= Y + t);
    if (inn.length < 2) return null;
    let best = null, d = -1; for (let i = 0; i < inn.length; i++) for (let j = i + 1; j < inn.length; j++) { const e = (inn[i][0] - inn[j][0]) ** 2 / (X * X) + (inn[i][1] - inn[j][1]) ** 2 / (Y * Y); if (e > d) { d = e; best = [inn[i], inn[j]]; } }
    return d > 1e-12 ? best : null;
  }
  function useTween(to, from, on) {
    const [v, setV] = useState(to);
    useEffect(() => {
      if (!on || calm() || to == null || from == null) { setV(to); return; }
      let raf; const t0 = performance.now(); setV(from);
      const f = t => { const k = Math.min(1, (t - t0) / 1500); setV(from + (to - from) * (1 - (1 - k) ** 2)); if (k < 1) raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
    }, [on, to, from]);
    return v;
  }

  /* ── the graph ── */
  const GW = 320, GH = 306, X0 = 46, X1 = 308, Y0 = 28, Y1 = 270;
  function Plot({ P, V, k, lone = [], reg = false, cor = [], hi = null, iso = null, isos = [], segPts = null, pt = null, onTap, fade = [], label }) {
    const n = k == null ? P.cs.length : k, sx = x => X0 + x / V.X * (X1 - X0), sy = y => Y1 - y / V.Y * (Y1 - Y0);
    const poly = ps => ps.map(p => sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)).join(' ');
    const tx = [], ty = []; for (let v = 0; v <= V.X + 1e-9; v += V.sx) tx.push(+v.toFixed(6)); for (let v = 0; v <= V.Y + 1e-9; v += V.sy) ty.push(+v.toFixed(6));
    const ref = useRef(null);
    const tap = e => { if (!onTap) return; const s = ref.current, p = s.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(s.getScreenCTM().inverse()); const x = (q.x - X0) / (X1 - X0) * V.X, y = (Y1 - q.y) / (Y1 - Y0) * V.Y; if (x >= 0 && y >= 0 && x <= V.X && y <= V.Y) onTap(x, y); };
    const pr = cor.length ? [cor.reduce((s, p) => s + sx(p.x), 0) / cor.length, cor.reduce((s, p) => s + sy(p.y), 0) / cor.length] : [0, 0];
    const lab = p => { let dx = sx(p.x) - pr[0], dy = sy(p.y) - pr[1]; const m = Math.hypot(dx, dy); if (m < 1) { dx = -1; dy = -1; } else { dx /= m; dy /= m; } let x = sx(p.x) + dx * 15, y = sy(p.y) + dy * 15 + 5; x = Math.min(Math.max(x, X0 + 8), X1 - 4); y = Math.min(Math.max(y, Y0 + 12), Y1 - 4); return [x, y]; };
    const lines = P.cs.slice(0, n).map((c, i) => ({ i, s: seg(c.a, c.b, c.c, V.X, V.Y) })).filter(o => o.s);
    const R = reg ? region(P.cs, V.X, V.Y) : [];
    const isoAll = (iso != null ? [iso] : []).concat(isos).map(z => seg(P.c1, P.c2, z, V.X, V.Y)).filter(Boolean);
    return html`<svg ref=${ref} className="orv2-svg" viewBox=${`0 0 ${GW} ${GH}`} role="img" aria-label=${label || 'Graph of the constraints in the x1, x2 plane'} onClick=${tap} style=${{ cursor: onTap ? 'crosshair' : 'default' }}>
      ${tx.map(v => html`<line key=${'gx' + v} x1=${sx(v)} x2=${sx(v)} y1=${Y0} y2=${Y1} stroke="var(--line)" strokeWidth="1" />`)}
      ${ty.map(v => html`<line key=${'gy' + v} x1=${X0} x2=${X1} y1=${sy(v)} y2=${sy(v)} stroke="var(--line)" strokeWidth="1" />`)}
      ${lone.map(i => { const r = region([P.cs[i]], V.X, V.Y); return r.length > 2 && html`<polygon key=${'lo' + i} points=${poly(r)} fill=${`color-mix(in srgb, ${COL[i % 4]} 20%, transparent)`} />`; })}
      ${R.length > 2 && html`<polygon key=${'rg' + P.cs.length} className="fade" points=${poly(R)} fill="color-mix(in srgb, var(--fig-k) 30%, transparent)" stroke="var(--fig-k)" strokeWidth="1" />`}
      <line x1=${X0} x2=${X1} y1=${Y1} y2=${Y1} stroke="var(--ink)" strokeWidth="1.6" /><line x1=${X0} x2=${X0} y1=${Y0} y2=${Y1} stroke="var(--ink)" strokeWidth="1.6" />
      ${tx.map(v => html`<text key=${'tx' + v} x=${sx(v)} y=${Y1 + 19} textAnchor="middle" fontSize="15" className="orv2-mu">${v}</text>`)}
      ${ty.map(v => html`<text key=${'ty' + v} x=${X0 - 5} y=${sy(v) + 5} textAnchor="end" fontSize="15" className="orv2-mu">${v}</text>`)}
      <text x=${X1} y=${GH - 2} textAnchor="end" fontSize="15" fontStyle="italic">x1</text><text x=${X0} y="15" textAnchor="middle" fontSize="15" fontStyle="italic">x2</text>
      ${lines.map(({ i, s }) => { const f = fade.includes(i); return html`<g key=${'ln' + i + '-' + P.cs.length}>
        <line x1=${sx(s[0][0])} y1=${sy(s[0][1])} x2=${sx(s[1][0])} y2=${sy(s[1][1])} pathLength="1" className=${f ? '' : 'orv2-draw'} stroke=${COL[i % 4]} strokeWidth=${f ? 2.5 : 3.5} strokeDasharray=${f ? '7 6' : null} strokeLinecap="round" />
        ${(() => { const u = .88 - .13 * i, x = sx(s[0][0] + (s[1][0] - s[0][0]) * u), y = sy(s[0][1] + (s[1][1] - s[0][1]) * u); return html`<g><circle cx=${x} cy=${y} r="10" fill=${COL[i % 4]} /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="14" className="orv2-wt">${i + 1}</text></g>`; })()}</g>`; })}
      ${segPts && html`<line x1=${sx(segPts[0].x)} y1=${sy(segPts[0].y)} x2=${sx(segPts[1].x)} y2=${sy(segPts[1].y)} stroke="var(--ok)" strokeWidth="7" strokeLinecap="round" opacity=".85" />`}
      ${isoAll.map((s, j) => html`<line key=${'iso' + j} x1=${sx(s[0][0])} y1=${sy(s[0][1])} x2=${sx(s[1][0])} y2=${sy(s[1][1])} stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 5" opacity=${j && iso != null ? .45 : .9} />`)}
      ${cor.map(p => { const h = hi && hi.includes(p.n), [lx, ly] = lab(p); return html`<g key=${'c' + p.n}>
        ${h && html`<circle cx=${sx(p.x)} cy=${sy(p.y)} r="10" fill="none" stroke="var(--ok)" strokeWidth="3" />`}
        <circle cx=${sx(p.x)} cy=${sy(p.y)} r="4.5" fill="var(--ink)" />
        <text x=${lx} y=${ly} textAnchor="middle" fontSize="16" fontWeight="700">${p.n}</text></g>`; })}
      ${pt && html`<g><circle cx=${sx(pt.x)} cy=${sy(pt.y)} r="7" fill=${pt.ok ? 'var(--ok)' : 'var(--pen)'} stroke="var(--paper)" strokeWidth="2" /></g>`}
    </svg>`;
  }
  const Model = ({ P, cur = -1, upto, red = [], extra }) => html`<div className="orv2-model">
    <div className="orv2-z">${zstr(P)}</div><div>subject to</div>
    ${P.cs.map((k, i) => html`<div key=${i} className=${upto != null && i >= upto ? 'orv2-dim' : i === cur ? 'orv2-on' : ''}><span className="orv2-sw" style=${{ background: COL[i % 4] }}></span>${i + 1}) ${red.includes(i) ? html`<s>${cstr(k)}</s>` : cstr(k)}</div>`)}
    <div>x1, x2 ≥ 0</div>${extra}</div>`;
  const CTable = ({ P, cor, upto, cur, best = [] }) => html`<table className="orv2-tbl"><thead><tr><th>Corner</th><th>${zstr(P)}</th></tr></thead><tbody>
    ${cor.slice(0, upto == null ? cor.length : upto).map(p => html`<tr key=${p.n} className=${best.includes(p.n) ? 'orv2-best' : p.n === cur ? 'orv2-cur' : ''}><td>${p.n}${pstr(p.x, p.y)}</td><td>${zcalc(P, p.x, p.y)}</td></tr>`)}</tbody></table>`;
  const Modes = ({ list, mode, set }) => html`<div className="orv2-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── intercepts and shading of one constraint ── */
  function icpt(k, d = 2) {
    if (k.a && k.b) return { en: `x1 = 0 → x2 = ${nf(k.c)}/${nf(k.b)} = ${nf(k.c / k.b, d)} ; x2 = 0 → x1 = ${nf(k.c)}/${nf(k.a)} = ${nf(k.c / k.a, d)}`, pts: [[0, k.c / k.b], [k.c / k.a, 0]] };
    if (!k.a) return { en: `x2 = ${k.b === 1 ? '' : nf(k.c) + '/' + nf(k.b) + ' = '}${nf(k.c / k.b, d)} (a horizontal line)`, pts: [[0, k.c / k.b]] };
    return { en: `x1 = ${k.a === 1 ? '' : nf(k.c) + '/' + nf(k.a) + ' = '}${nf(k.c / k.a, d)} (a vertical line)`, pts: [[k.c / k.a, 0]] };
  }
  function sideOf(k) {
    const o = ok(k, 0, 0), test = `(0, 0): 0 ${OP[k.op]} ${nf(k.c)} is ${o ? 'true' : 'false'}`;
    if (!k.a) { const up = k.op === '>=' ? k.b > 0 : k.b < 0; return { en: `${OP[k.op]} with a horizontal line: shade <b>${up ? 'above' : 'below'}</b> it.`, ar: `ولأنه خط أفقي بنظلّل ${up ? '<b>فوقه</b>' : '<b>تحته</b>'}.`, test }; }
    if (!k.b) { const rt = k.op === '>=' ? k.a > 0 : k.a < 0; return { en: `${OP[k.op]} with a vertical line: shade to the <b>${rt ? 'right' : 'left'}</b> of it.`, ar: `ولأنه خط رأسي بنظلّل ${rt ? '<b>يمينه</b>' : '<b>شماله</b>'}.`, test }; }
    return { en: `Test the origin ${test}, so shade ${o ? 'the side <b>toward the origin</b>' : 'the side <b>away from the origin</b>'}.`, ar: `بنجرّب الـ origin:` + L(test) + `يبقى بنظلّل ${o ? 'الناحية <b>اللي فيها الـ origin</b>' : 'الناحية <b>البعيدة عن الـ origin</b>'}.`, test };
  }

  /* ── solving two lines simultaneously (the notes' way) ── */
  const back = (v, c, k, w, d, r) => `${v} = ${Math.abs(d) === 1 && d > 0 ? '' : '('}${nf(c)} ${k < 0 ? '+' : '−'} ${Math.abs(k) === 1 ? '' : nf(Math.abs(k)) + ' × '}${nf(w)}${Math.abs(d) === 1 && d > 0 ? '' : ')/' + nf(d)} = ${nf(r)}`;
  function elim(p, q, mm) {
    const out = [];
    if (!p.a || !p.b || !q.a || !q.b) {
      const h = (!p.a || !p.b) ? p : q, o = h === p ? q : p;
      if (!h.a) { const y = h.c / h.b, x = (o.c - o.b * y) / o.a; out.push(h.b === 1 ? eqs(h) : `${eqs(h)} → x2 = ${nf(y)}`, `${eqs(o)} → ${co(o.a)}x1 = ${nf(o.c)} − ${nf(o.b * y)} = ${nf(o.c - o.b * y)}`, `x1 = ${nf(x)}`); return { lines: out, x, y, how: 'sub' }; }
      const x = h.c / h.a, y = (o.c - o.a * x) / o.b; out.push(h.a === 1 ? eqs(h) : `${eqs(h)} → x1 = ${nf(x)}`, `${eqs(o)} → ${co(o.b)}x2 = ${nf(o.c)} − ${nf(o.a * x)} = ${nf(o.c - o.a * x)}`, `x2 = ${nf(y)}`); return { lines: out, x, y, how: 'sub' };
    }
    let m = mm;
    if (!m) { const g = (a, b) => { a = Math.abs(a); b = Math.abs(b); if (a % 1 || b % 1) return 1; while (b) [a, b] = [b, a % b]; return a || 1; };
      const c1 = [q.a / g(q.a, p.a), -p.a / g(q.a, p.a)], c2 = [q.b / g(q.b, p.b), -p.b / g(q.b, p.b)];
      m = Math.abs(c2[0]) + Math.abs(c2[1]) < Math.abs(c1[0]) + Math.abs(c1[1]) ? c2 : c1; if (m[0] < 0 && m[1] < 0) m = [-m[0], -m[1]]; }
    const A = m[0] * p.a + m[1] * q.a, B = m[0] * p.b + m[1] * q.b, C = m[0] * p.c + m[1] * q.c;
    const mul = (f, k) => f === 1 ? eqs(k) : `${f === -1 ? '−' : nf(f) + ' ×'} (${eqs(k)}) → ${eqs({ a: f * k.a, b: f * k.b, c: f * k.c })}`;
    out.push(mul(m[0], p), mul(m[1], q));
    if (Math.abs(A) < 1e-12) {
      const y = C / B, src = Math.abs(p.a) > 1e-12 ? p : q, x = (src.c - src.b * y) / src.a;
      out.push(`add: ${eqs({ a: 0, b: B, c: C })} → x2 = ${nf(y)}`, back('x1', src.c, src.b, y, src.a, x));
      return { lines: out, x, y, how: 'x2', cancel: 'x1', m };
    }
    const x = C / A, src = Math.abs(p.b) > 1e-12 ? p : q, y = (src.c - src.a * x) / src.b;
    out.push(`add: ${eqs({ a: A, b: 0, c: C })} → x1 = ${nf(x)}`, back('x2', src.c, src.a, x, src.b, y));
    return { lines: out, x, y, how: 'x1', cancel: 'x2', m };
  }

  /* ── the notes' problems ── */
  const C = (a, b, op, c) => ({ a, b, op, c });
  const EX1 = { sense: 'max', c1: 200, c2: 175, cs: [C(10, 22, '<=', 2640), C(15, 18, '<=', 2500)], idp: 1, mm: { C: [15, -10] },
    rem: { B: ['The lecture rounds x1 to 166.7 and prints <b>$33,340</b>.', 'والمحاضرة بتقرّب الـ x1 لـ ' + I('166.7') + ' وبتكتب ' + I('$33,340') + '.'],
      C: ['The lecture prints C(49.91, 97.3) and $27,015.5.', 'والمحاضرة كاتبة الـ C كده:' + L('C(49.91, 97.3) → $27,015.5')] },
    end: ['To make the most revenue, the company should make <b>166.7 units of product A</b> and <b>zero units of product B</b>.', 'علشان الشركة تكسب أكبر revenue لازم تعمل <b>' + I('166.7') + ' وحدة من المنتج A</b> و<b>ولا وحدة من المنتج B</b>.'] };
  const JAY = { sense: 'max', c1: 25, c2: 20, cs: [C(1, 2, '<=', 22), C(4, 2, '<=', 40)], mm: { C: [-1, 1] },
    end: ['Jay should make <b>6 cupcake orders</b> (x1) and <b>8 personal cakes</b> (x2) for <b>$310</b>.', 'الـ Jay لازم يعمل <b>6 cupcake orders</b> و<b>8 personal cakes</b> علشان يكسب <b>' + I('$310') + '</b>.'] };
  const DIET = { sense: 'min', c1: 1.2, c2: 0.8, cs: [C(2, 2, '>=', 16), C(4, 1, '>=', 20)], mm: { B: [1, -2] },
    end: ['Minimum cost <b>$8</b> with <b>4 units of food A</b> and <b>4 units of food B</b>. An unbounded region is fine for a MIN problem: the minimum still occurs at a corner.', 'أقل تكلفة <b>' + I('$8') + '</b> بـ <b>4 وحدات من الـ food A</b> و<b>4 وحدات من الـ food B</b>. والمنطقة المفتوحة مش مشكلة في مسألة MIN لأن الـ minimum بيطلع برضه عند corner.'] };
  const MORE = [
    { key: 'l3', t: 'L3: Max 3x1 + x2', P: { sense: 'max', c1: 3, c2: 1, cs: [C(2, 1, '<=', 8), C(2, 3, '<=', 12)] }, en: 'Lecture 3: the slide prints "(3,2): Z = 3(2) + 2 = 8", a typo: the correct value is 3(3) + 2 = <b>11</b>.', ar: 'الـ slide في Lecture 3 كاتبة قيمة غلط عند النقطة دي:' + L('(3,2): Z = 3(2) + 2 = 8') + 'والصح هو:' + L('3(3) + 2 = 11') },
    { key: 'sec', t: 'Section: Min 8x1 + 10x2', P: { sense: 'min', c1: 8, c2: 10, cs: [C(2, 1, '>=', 7), C(2, 3, '>=', 15), C(0, 1, '>=', 2)] }, en: 'Section problem: all ≥, so the region is open upward; x2 ≥ 2 is a horizontal line.', ar: 'مسألة السكشن كلها ' + I('≥') + ' فالمنطقة مفتوحة لفوق، والـ ' + I('x2 ≥ 2') + ' خط أفقي.' },
    { key: 'sh1', t: 'Sheet 1: Max 3x1 + 4x2', P: { sense: 'max', c1: 3, c2: 4, cs: [C(2, 1, '<=', 6), C(2, 3, '<=', 9), C(0, 1, '>=', 2), C(1, 0, '<=', 1)] }, en: 'Sheet 1 (2022/23): C(1, 7/3) gives 12.33. If x must be an integer, the answer is (0, 3) with Z = 12.', ar: 'في الـ Sheet 1 النقطة ' + I('C(1, 7/3)') + ' بتدّي ' + I('12.33') + '. ولو الـ x لازم تبقى integer فالإجابة:' + L('(0, 3) → Z = 12') },
    { key: 'fur', t: 'Q1 furniture', P: { sense: 'max', c1: 120, c2: 80, cs: [C(2, 1, '<=', 6), C(7, 8, '<=', 28)] }, en: 'Q1 furniture: the optimum is (20/9, 14/9) ≈ (2.22, 1.56), Z ≈ 391.11.', ar: 'في مسألة الـ furniture الـ optimum هو:' + L('(20/9, 14/9) ≈ (2.22, 1.56) → Z ≈ 391.11') },
    { key: 'pai', t: 'Paint', P: { sense: 'max', c1: 1, c2: 1.5, cs: [C(2, 4, '<=', 12), C(3, 2, '<=', 10)] }, en: 'Paint: the optimum is (2, 2) with Z = 5.', ar: 'في مسألة الـ Paint الـ optimum هو:' + L('(2, 2) → Z = 5') },
    { key: 'fer', t: 'Fertilizer: Min', P: { sense: 'min', c1: 12, c2: 10, cs: [C(2, 4, '>=', 10), C(1, 3, '>=', 15), C(4, 5, '>=', 30)] }, en: 'Fertilizer: the optimum is (0, 6) with Z = 60. Constraint 1 never touches the region.', ar: 'في مسألة الـ Fertilizer الـ optimum هو:' + L('(0, 6) → Z = 60') + 'والقيد رقم 1 مش بيلمس المنطقة خالص.' }];

  /* ── step-through of one worked example ── */
  function walk(P) {
    const S = solve(P), cor = S.cor, nC = P.cs.length, steps = [], d = P.idp || 2, mx = P.sense === 'max';
    const allLe = P.cs.every(k => k.op === '<='), allGe = P.cs.every(k => k.op === '>=');
    steps.push({ en: `The model: ${zstr(P)} subject to ${nC} constraints and x1, x2 ≥ 0. Step 1: draw each constraint as a line.`, ar: 'ده الـ model، وفيه ' + nC + ' constraints غير الـ non-negativity. أول خطوة نرسم كل constraint كخط.', k: 0 });
    P.cs.forEach((k, i) => { const ic = icpt(k, d), sd = sideOf(k);
      steps.push({ en: `Constraint ${i + 1}: the line ${eqs(k)}. Intercepts: ${ic.en}. ${sd.en}`, ar: `القيد رقم ${i + 1} بيبقى الخط ده:` + L(eqs(k)) + 'والـ intercepts بتوعه:' + ic.en.split(' ; ').map(L).join('') + sd.ar, k: i + 1, lone: [i], cur: i }); });
    const named = cor.map(p => p.on.filter(t => typeof t === 'number').length >= 2 ? p.n : p.n + pstr(p.x, p.y, d)).join(', ');
    steps.push({ en: `The <b>feasible region</b> is the common region of all the constraints with x1, x2 ≥ 0${allLe ? ' (both ≤: the area under both lines)' : allGe ? ': both are ≥, so it is the <b>unbounded</b> area <b>above</b> both lines' : ''}. Its corners: ${named}.`, ar: `الـ <b>feasible region</b> هي المنطقة المشتركة بين كل الـ constraints ومعاها ${I('x1, x2 ≥ 0')}${allGe ? '، ولأن الاتنين ' + I('≥') + ' فهي المنطقة <b>المفتوحة</b> اللي <b>فوق</b> الخطين' : ''}. الـ corners بتاعتها:` + L(named), k: nC, reg: true, cor: true });
    cor.filter(p => p.on.filter(t => typeof t === 'number').length >= 2).forEach(p => { const [i, j] = p.on.filter(t => typeof t === 'number'), e = elim(P.cs[i], P.cs[j], P.mm && P.mm[p.n]);
      steps.push({ en: `To find ${p.n}, solve lines ${i + 1} and ${j + 1} together: multiply so one variable cancels, then add. ${p.n} = ${pstr(e.x, e.y)}.`, ar: `علشان نجيب الـ ${p.n} بنحل الخطين ${i + 1} و${j + 1} مع بعض: نضرب علشان variable يتشال وبعدين نجمع، فتطلع:` + L(`${p.n} = ${pstr(e.x, e.y)}`), k: nC, reg: true, cor: true, hi: [p.n], f: e.lines }); });
    cor.forEach((p, j) => { const r = P.rem && P.rem[p.n];
      steps.push({ en: `Step 2, corner point table: at ${p.n}${pstr(p.x, p.y)}, Z = ${zcalc(P, p.x, p.y)}.${r ? ' ' + r[0] : ''}`, ar: `الخطوة 2 هي الـ corner point table. نعوّض بالنقطة ${p.n} في الـ objective function كده:` + L(`Z = ${zcalc(P, p.x, p.y)}`) + (r ? r[1] : ''), k: nC, reg: true, cor: true, hi: [p.n], rows: j + 1, curRow: p.n }); });
    const o = S.opt[0];
    steps.push({ en: `Step 3: ${mx ? 'Max → the <b>largest</b> Z' : 'Min → the <b>smallest</b> Z'}: <b>${o.n}${pstr(o.x, o.y)}, Z = ${zf(o.z)}</b>. The dashed objective line moves ${mx ? 'away from' : 'toward'} the origin; the last point of the region it touches is ${o.n}.`, ar: `في الخطوة 3 ${mx ? 'الـ Max بناخد فيها <b>أكبر</b> Z' : 'الـ Min بناخد فيها <b>أصغر</b> Z'}، وده عند:` + L(`${o.n}${pstr(o.x, o.y)} → Z = ${zf(o.z)}`) + `وخط الـ objective المتقطع بيتحرك ${mx ? 'بعيد عن' : 'ناحية'} الـ origin، وآخر نقطة يلمسها من المنطقة هي ${o.n}.`, k: nC, reg: true, cor: true, hi: [o.n], rows: cor.length, best: [o.n], iso: true });
    steps.push({ en: 'Step 4, interpret: ' + P.end[0], ar: 'الخطوة 4 إننا نفسّر الحل: ' + P.end[1], k: nC, reg: true, cor: true, hi: [o.n], rows: cor.length, best: [o.n], iso: true });
    return { steps, S };
  }
  function Walk({ ar, P, ms = 3200, label }) {
    const wk = useRef(null); if (!wk.current) wk.current = walk(P);
    const { steps, S } = wk.current, [i, ctl] = useSteps(steps.length, ms), s = steps[i];
    const V = viewOf(P.cs, S.cor), o = S.opt[0], z0 = P.sense === 'max' ? 0 : Math.max(...S.cor.map(p => p.z)) * 1.6;
    const z = useTween(s.iso ? o.z : null, z0, !!s.iso);
    return html`<figure className="fig orv2"><div className="fig-stage">
      <${Model} P=${P} cur=${s.cur == null ? -1 : s.cur} />
      <${Plot} P=${P} V=${V} k=${s.k} lone=${s.lone || []} reg=${!!s.reg} cor=${s.cor ? S.cor : []} hi=${s.hi} iso=${s.iso ? z : null} label=${label} />
      ${s.f && html`<div className="orv2-f">${s.f.map((t, j) => html`<div key=${j} className=${j === s.f.length - 1 ? 'orv2-on' : ''}>${t}</div>`)}</div>`}
      ${s.rows && html`<${CTable} P=${P} cor=${S.cor} upto=${s.rows} cur=${s.curRow} best=${s.best || []} />`}
      </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const Ex1 = ({ ar }) => html`<${Walk} ar=${ar} P=${EX1} label="Example 1: the lines 10x1 + 22x2 = 2640 and 15x1 + 18x2 = 2500 and the feasible region" />`;
  const Ex2 = ({ ar }) => html`<${Walk} ar=${ar} P=${JAY} label="Example 2: the lines x1 + 2x2 = 22 and 4x1 + 2x2 = 40 and the feasible region" />`;
  const Ex5 = ({ ar }) => html`<${Walk} ar=${ar} P=${DIET} label="Example 5: the lines 2x1 + 2x2 = 16 and 4x1 + x2 = 20 and the unbounded feasible region above them" />`;

  /* ── [0] the definitions on Jay's graph, tap a point ── */
  function Terms({ ar }) {
    const S = solve(JAY), V = viewOf(JAY.cs, S.cor), [t, setT] = useState('reg'), [pt, setPt] = useState(null);
    const T = {
      reg: ['<b>Feasible region</b>: the common region determined by all the constraints, including x1 ≥ 0 and x2 ≥ 0 (shaded). Here: Jay\'s Example 2.', 'الـ <b>feasible region</b> هي المنطقة المشتركة اللي بتحددها كل الـ constraints ومعاها الـ non-negativity (المظللة). ده مثال الـ Jay رقم 2.'],
      sol: ['<b>Feasible solution</b>: every point in the feasible region, e.g. (3, 4): 3 + 2(4) = 11 ≤ 22 and 4(3) + 2(4) = 20 ≤ 40.', 'الـ <b>feasible solution</b> هي أي نقطة جوه الـ feasible region، زي النقطة ' + I('(3, 4)') + ' لأنها بتحقق الاتنين:' + L('3 + 2(4) = 11 ≤ 22 ; 4(3) + 2(4) = 20 ≤ 40')],
      opt: ['<b>Optimal solution</b>: the feasible point that gives the best Z. For Max Z = 25x1 + 20x2 it is <b>C(6, 8)</b>, Z = 310.', 'الـ <b>optimal solution</b> هي النقطة الـ feasible اللي بتدّي أحسن Z، وهنا هي:' + L('Max Z = 25x1 + 20x2 → C(6, 8), Z = 310')],
      cor: ['<b>Corner points</b>: where two boundary lines meet: A(0, 0), B(10, 0), C(6, 8), D(0, 11).', 'الـ <b>corner points</b> هي النقط اللي بيتقابل فيها خطين من حدود المنطقة:' + L('A(0, 0), B(10, 0), C(6, 8), D(0, 11)')],
      inf: ['<b>Infeasible solutions</b>: any points outside the feasible region, e.g. (10, 8): 4(10) + 2(8) = 56 > 40.', 'الـ <b>infeasible solutions</b> هي أي نقط برّه الـ feasible region، زي النقطة ' + I('(10, 8)') + ' لأن:' + L('4(10) + 2(8) = 56 > 40')]
    };
    const sample = { sol: { x: 3, y: 4, ok: true }, inf: { x: 10, y: 8, ok: false } }[t];
    const show = pt || sample, tap = (x, y) => { const r = v => Math.round(v * 2) / 2, X = r(x), Y = r(y); setPt({ x: X, y: Y, ok: feas(JAY.cs, X, Y) }); };
    let en, a;
    if (pt) { const bad = JAY.cs.filter(k => !ok(k, pt.x, pt.y)), lhs = k => `${nf(k.a)}(${nf(pt.x)}) + ${nf(k.b)}(${nf(pt.y)}) = ${nf(val(k, pt.x, pt.y))}`;
      en = `You tapped <b>(${nf(pt.x)}, ${nf(pt.y)})</b>: ${pt.ok ? 'inside the region, a <b>feasible solution</b>' : 'outside the region, an <b>infeasible solution</b>: it breaks ' + bad.map(k => `${cstr(k)} (${lhs(k)})`).join(' and ')}.`;
      a = `النقطة اللي اخترتها ${I(pstr(pt.x, pt.y))} ${pt.ok ? 'جوه المنطقة، يعني <b>feasible solution</b>.' : 'برّه المنطقة، يعني <b>infeasible solution</b>، لأنها مش بتحقق:' + L(bad.map(k => `${lhs(k)} > ${nf(k.c)}`).join(' ; '))}`; }
    else [en, a] = T[t];
    const pick = k => { setT(k); setPt(null); };
    return html`<figure className="fig orv2"><div className="fig-stage">
      <${Modes} list=${[['reg', 'Feasible region'], ['sol', 'Feasible solution'], ['opt', 'Optimal solution'], ['cor', 'Corner point'], ['inf', 'Infeasible solutions']]} mode=${pt ? '' : t} set=${pick} />
      <${Plot} P=${JAY} V=${V} reg=${true} cor=${t === 'cor' || t === 'opt' || pt ? S.cor : []} hi=${t === 'opt' && !pt ? ['C'] : t === 'cor' && !pt ? ['A', 'B', 'C', 'D'] : null} iso=${t === 'opt' && !pt ? 310 : null} pt=${show} onTap=${tap} label="Jay's feasible region with its corners; tap to test a point" />
      <p className="orv2-verdict">Tap the graph to test any point.</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [1] the 4-step procedure on Example 2 ── */
  function Procedure({ ar }) {
    const S = solve(JAY), V = viewOf(JAY.cs, S.cor);
    const steps = [
      { en: '<b>Step 1</b>: graph the feasible region, then (if an optimal solution exists) find the coordinates of each corner point.', ar: '<b>الخطوة 1</b>: ارسم الـ feasible region، وبعدين (لو فيه optimal solution) هات إحداثيات كل corner point.' },
      { en: '<b>Step 2</b>: construct a corner point table listing Z at each corner point.', ar: '<b>الخطوة 2</b>: اعمل corner point table فيه قيمة الـ Z عند كل corner point.' },
      { en: '<b>Step 3</b>: determine the optimal solution from the table: Max → largest Z. Here C(6, 8), Z = 310.', ar: '<b>الخطوة 3</b>: حدد الـ optimal solution من الجدول، والـ Max بناخد فيها أكبر Z:' + L('C(6, 8) → Z = 310') },
      { en: '<b>Step 4</b>: interpret it for the original problem: Jay should make 6 cupcake orders and 8 personal cakes for $310.', ar: '<b>الخطوة 4</b>: فسّر الحل بلغة المسألة: الـ Jay يعمل 6 cupcake orders و8 personal cakes ويكسب ' + I('$310') + '.' }];
    const [i, ctl] = useSteps(steps.length, 3000);
    const z = useTween(i >= 2 ? 310 : null, 0, i >= 2);
    return html`<figure className="fig orv2"><div className="fig-stage">
      <div className="orv2-cards">${['Graph the region + corners', 'Corner point table', 'Pick the best Z', 'Interpret'].map((t, j) => html`<div key=${j} className=${i === j ? 'orv2-on' : ''}><b>Step ${j + 1}</b>${t}</div>`)}</div>
      <${Plot} P=${JAY} V=${V} reg=${true} cor=${S.cor} hi=${i >= 2 ? ['C'] : null} iso=${i >= 2 ? z : null} label="Example 2 used for the four steps" />
      ${i >= 1 && html`<${CTable} P=${JAY} cor=${S.cor} best=${i >= 2 ? ['C'] : []} />`}
      ${i === 3 && html`<p className="orv2-verdict">6 cupcake orders + 8 personal cakes → $310</p>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.4] finding an intersection corner ── */
  const PAIRS = [
    { key: 'e1', t: 'Ex 1: C', p: EX1.cs[0], q: EX1.cs[1], m: [15, -10], n: 'C' },
    { key: 'e2', t: 'Ex 2: C', p: JAY.cs[0], q: JAY.cs[1], m: [-1, 1], n: 'C' },
    { key: 'e5', t: 'Ex 5: B', p: DIET.cs[0], q: DIET.cs[1], m: [1, -2], n: 'B' },
    { key: 'sec', t: 'Section: x2 = 2', p: C(0, 1, '>=', 2), q: C(2, 3, '>=', 15), n: 'C' }];
  function Intersect({ ar }) {
    const [mode, setMode] = useState('e1'), [own, setOwn] = useState({ a1: 2, b1: 1, c1: 8, a2: 2, b2: 3, c2: 12 });
    const pr = mode === 'own' ? { p: C(+own.a1 || 0, +own.b1 || 0, '<=', +own.c1 || 0), q: C(+own.a2 || 0, +own.b2 || 0, '<=', +own.c2 || 0), n: 'P' } : PAIRS.find(x => x.key === mode);
    const par = Math.abs(pr.p.a * pr.q.b - pr.q.a * pr.p.b) < 1e-12;
    const e = par ? null : elim(pr.p, pr.q, pr.m), sub = e && e.how === 'sub';
    const n = e ? e.lines.length + 1 : 1, [i, ctl] = useSteps(n, 2200);
    useEffect(() => { ctl.replay(); }, [mode, own.a1, own.b1, own.c1, own.a2, own.b2, own.c2]);
    const j = Math.min(i, n - 1), P = { sense: 'max', c1: 0, c2: 0, cs: [pr.p, pr.q] }, V = viewOf(P.cs, e && e.x >= 0 && e.y >= 0 ? [{ x: e.x, y: e.y }] : []);
    let en, a;
    if (par) { en = 'These two lines are <b>parallel</b> (same slope): they never meet, so there is no corner.'; a = 'الخطين دول <b>متوازيين</b> فمش هيتقابلوا، يعني مفيش corner.'; }
    else if (j === 0) { en = `Solve the two line equations <b>simultaneously</b>: ${sub ? 'one line is horizontal or vertical, so put its value straight into the other' : `multiply so that <b>${e.cancel}</b> cancels, then add`}.`; a = 'بنحل المعادلتين <b>مع بعض</b>' + (sub ? '، وبما إن فيه خط أفقي أو رأسي بنعوّض بقيمته في التاني على طول.' : '. بنضرب في أرقام علشان الـ ' + e.cancel + ' يتشال وبعدين نجمع.'); }
    else if (j < n - 1) { en = 'Line by line: ' + e.lines[j - 1] + '.'; a = 'السطر ده من الحل:' + L(e.lines[j - 1]); }
    else { const fz = e.x >= -1e-9 && e.y >= -1e-9; en = `The lines meet at <b>${pstr(e.x, e.y)}</b>${mode === 'own' ? (fz ? '.' : ', which has a negative coordinate: not in the first quadrant.') : `: corner <b>${pr.n}</b> in the notes.`}`; a = 'الخطين بيتقابلوا في النقطة دي:' + L(pstr(e.x, e.y)) + (mode === 'own' ? (fz ? '' : 'وفيها إحداثي سالب فهي مش في الربع الأول.') : 'ودي الـ corner ' + pr.n + ' في الـ notes.'); }
    const set = (k, v) => setOwn(o => Object.assign({}, o, { [k]: v }));
    const inp = k => html`<input type="number" step="any" value=${own[k]} onInput=${ev => set(k, ev.target.value)} aria-label=${k} />`;
    return html`<figure className="fig orv2"><div className="fig-stage">
      <${Modes} list=${PAIRS.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="orv2-ed">
        <div className="orv2-l">${inp('a1')} x1 + ${inp('b1')} x2 = ${inp('c1')}</div><div className="orv2-l">${inp('a2')} x1 + ${inp('b2')} x2 = ${inp('c2')}</div></div>`}
      <div className="orv2-f">
        <div>${eqs(pr.p)}</div><div>${eqs(pr.q)}</div>
        ${e && e.lines.map((t, k) => html`<div key=${k} className=${k + 1 > j ? 'orv2-dim' : k + 1 === j ? 'orv2-on' : ''}>${t}</div>`)}</div>
      <${Plot} P=${P} V=${V} cor=${e && j === n - 1 && e.x >= -1e-9 && e.y >= -1e-9 ? [{ x: e.x, y: e.y, n: pr.n }] : []} hi=${[pr.n]} label="The two lines and the point where they meet" />
      </div><${Cap} en=${en} ar=${a} showAr=${ar} />${!par && html`<${Bar} steps=${Array(n).fill(0)} i=${j} ctl=${ctl} />`}</figure>`;
  }

  /* ── [1.5] one constraint: line, intercepts, which side ── */
  const SH = [
    { key: 'a', k: C(10, 22, '<=', 2640), t: 'Ex 1' }, { key: 'b', k: C(2, 2, '>=', 16), t: 'Ex 5' },
    { key: 'c', k: C(0, 1, '>=', 2), t: 'x2 ≥ 2' }, { key: 'd', k: C(1, 0, '<=', 1), t: 'x1 ≤ 1' }];
  function Shade({ ar }) {
    const [mode, setMode] = useState('a'), [own, setOwn] = useState({ a: 4, b: 2, op: '<=', c: 40 });
    const k = mode === 'own' ? C(+own.a || 0, +own.b || 0, own.op, +own.c || 0) : SH.find(x => x.key === mode).k;
    const good = (k.a || k.b) && k.c > 0 && k.a >= 0 && k.b >= 0;
    const P = { sense: 'max', c1: 0, c2: 0, cs: [k] }, V = good ? viewOf([k]) : { X: 10, Y: 10, sx: 2, sy: 2 };
    if (good && (!k.a || !k.b)) { if (!k.a) { V.Y = Math.max(V.Y, nice(k.c / k.b) * 4); V.sy = nice(V.Y / 6); V.Y = Math.ceil(V.Y / V.sy) * V.sy; V.X = 5; V.sx = 1; } else { V.X = Math.max(V.X, nice(k.c / k.a) * 4); V.sx = nice(V.X / 6); V.X = Math.ceil(V.X / V.sx) * V.sx; V.Y = 5; V.sy = 1; } }
    const ic = good && icpt(k), sd = good && sideOf(k);
    const en = good ? `Turn ${cstr(k)} into the line <b>${eqs(k)}</b>. ${ic.en.replace(' ; ', '; ')}. ${sd.en}` : 'Use positive numbers here (a, b ≥ 0, not both 0, and c > 0) so the line crosses the first quadrant.';
    const a = good ? 'حوّل الـ inequality لخط:' + L(eqs(k)) + (k.a && k.b ? 'والـ intercepts بتوعه:' : 'وده:') + ic.en.split(' ; ').map(L).join('') + sd.ar : 'حط أرقام موجبة هنا علشان الخط يعدّي في الربع الأول.';
    const set = (f, v) => setOwn(o => Object.assign({}, o, { [f]: v }));
    return html`<figure className="fig orv2"><div className="fig-stage">
      <${Modes} list=${SH.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="orv2-ed"><div className="orv2-l">
        <input type="number" step="any" value=${own.a} onInput=${e => set('a', e.target.value)} aria-label="a" /> x1 + <input type="number" step="any" value=${own.b} onInput=${e => set('b', e.target.value)} aria-label="b" /> x2
        <select value=${own.op} onChange=${e => set('op', e.target.value)} aria-label="sign"><option value="<=">≤</option><option value=">=">≥</option></select>
        <input type="number" step="any" value=${own.c} onInput=${e => set('c', e.target.value)} aria-label="c" /></div></div>`}
      <div className="orv2-model"><div className="orv2-on"><span className="orv2-sw" style=${{ background: COL[0] }}></span>${cstr(k)}</div>${good && sd.test && k.a && k.b ? html`<div>test ${sd.test}</div>` : null}</div>
      ${good && html`<${Plot} key=${mode + cstr(k)} P=${P} V=${V} lone=${[0]} cor=${ic.pts.map((p, j) => ({ x: p[0], y: p[1], n: '' }))} pt=${{ x: 0, y: 0, ok: ok(k, 0, 0) }} label="One constraint line with its shaded side" />`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [5] solver: the section and sheet problems, or your own ── */
  function Solver({ ar }) {
    const [mode, setMode] = useState('l3'), [own, setOwn] = useState({ sense: 'max', c1: 25, c2: 20, cs: [{ a: 1, b: 2, op: '<=', c: 22 }, { a: 4, b: 2, op: '<=', c: 40 }] });
    const ex = MORE.find(x => x.key === mode);
    const P = ex ? ex.P : { sense: own.sense, c1: +own.c1 || 0, c2: +own.c2 || 0, cs: own.cs.map(k => C(+k.a || 0, +k.b || 0, k.op, +k.c || 0)).filter(k => k.a || k.b) };
    const S = solve(P), V = viewOf(P.cs, S.cor);
    const zs = S.cor.map(p => p.z), zmin = zs.length ? Math.min(0, ...zs) : 0, zmax = zs.length ? Math.max(...zs) * 1.3 + 1 : 10;
    const [zv, setZv] = useState(null); useEffect(() => { setZv(null); }, [mode, JSON.stringify(own)]);
    const zline = zv == null ? (S.opt.length ? S.zb : null) : zv;
    let en, a;
    const best = S.opt.map(p => p.n), red = S.red;
    if (S.status === 'infeasible') { en = 'No point satisfies all the constraints: the LP is <b>infeasible</b> (empty feasible region).'; a = 'مفيش ولا نقطة بتحقق كل الـ constraints، يعني الـ LP <b>infeasible</b> والـ feasible region فاضية.'; }
    else if (S.status === 'unbounded') { en = 'The region is open in the direction that improves Z: the solution is <b>unbounded</b> (Z → ∞).'; a = 'المنطقة مفتوحة في الاتجاه اللي بيحسّن الـ Z، يعني الحل <b>unbounded</b>:' + L('Z → ∞'); }
    else {
      const o = S.opt, w = o.map(p => p.n + pstr(p.x, p.y)).join(' and ');
      en = `${P.sense === 'max' ? 'Max → largest' : 'Min → smallest'} Z: <b>${w}</b>, Z = <b>${zf(S.zb)}</b>${o.length > 1 ? ': <b>multiple optimal solutions</b>, every point of the segment between them is optimal' : ''}.${red.length ? ` Constraint ${red.map(r => r + 1).join(', ')} does not touch the region: <b>redundant</b>.` : ''} ${ex ? ex.en : 'Drag the slider to move the objective line.'}`;
      a = `${P.sense === 'max' ? 'الـ Max بناخد فيها أكبر' : 'الـ Min بناخد فيها أصغر'} Z، وده عند:` + L(`${w} → Z = ${zf(S.zb)}`) + (o.length > 1 ? 'وده معناه <b>multiple optimal solutions</b>، وكل نقطة على الخط اللي بينهم optimal. ' : '') + (red.length ? 'والقيد رقم ' + red.map(r => r + 1).join(' و') + ' <b>redundant</b> لأنه مش بيلمس المنطقة. ' : '') + (ex ? ex.ar : 'حرّك الـ slider علشان تحرّك خط الـ objective.');
    }
    const setC = (j, f, v) => setOwn(o => Object.assign({}, o, { cs: o.cs.map((k, i) => i === j ? Object.assign({}, k, { [f]: v }) : k) }));
    const editor = !ex && html`<div className="orv2-ed">
      <div className="orv2-l"><select value=${own.sense} onChange=${e => setOwn(o => Object.assign({}, o, { sense: e.target.value }))} aria-label="max or min"><option value="max">Max</option><option value="min">Min</option></select>
        Z = <input type="number" step="any" value=${own.c1} onInput=${e => setOwn(o => Object.assign({}, o, { c1: e.target.value }))} aria-label="c1" /> x1 + <input type="number" step="any" value=${own.c2} onInput=${e => setOwn(o => Object.assign({}, o, { c2: e.target.value }))} aria-label="c2" /> x2</div>
      ${own.cs.map((k, j) => html`<div key=${j} className="orv2-l"><span className="orv2-sw" style=${{ background: COL[j % 4] }}></span>
        <input type="number" step="any" value=${k.a} onInput=${e => setC(j, 'a', e.target.value)} aria-label=${'a' + (j + 1)} /> x1 + <input type="number" step="any" value=${k.b} onInput=${e => setC(j, 'b', e.target.value)} aria-label=${'b' + (j + 1)} /> x2
        <select value=${k.op} onChange=${e => setC(j, 'op', e.target.value)} aria-label="sign"><option value="<=">≤</option><option value=">=">≥</option></select>
        <input type="number" step="any" value=${k.c} onInput=${e => setC(j, 'c', e.target.value)} aria-label=${'c' + (j + 1)} />
        ${own.cs.length > 1 && html`<button className="fig-btn" onClick=${() => setOwn(o => Object.assign({}, o, { cs: o.cs.filter((_, i) => i !== j) }))} aria-label="remove constraint">✕</button>`}</div>`)}
      ${own.cs.length < 4 && html`<div className="orv2-l"><button className="fig-btn" onClick=${() => setOwn(o => Object.assign({}, o, { cs: o.cs.concat({ a: 1, b: 1, op: '<=', c: 10 }) }))}>+ constraint</button></div>`}</div>`;
    return html`<figure className="fig orv2"><div className="fig-stage">
      <${Modes} list=${MORE.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${setMode} />
      ${ex ? html`<${Model} P=${P} red=${red} />` : editor}
      <${Plot} key=${mode} P=${P} V=${V} reg=${true} cor=${S.cor} hi=${best} iso=${zline} segPts=${S.opt.length > 1 ? [S.opt[0], S.opt[S.opt.length - 1]] : null} fade=${red} label="Feasible region, corners and the objective line of the chosen problem" />
      ${S.cor.length > 0 && S.status !== 'infeasible' && html`<div className="orv2-range"><span>Z line</span><input type="range" min=${zmin} max=${zmax} step=${(zmax - zmin) / 200} value=${zline == null ? zmin : zline} onInput=${e => setZv(+e.target.value)} aria-label="Move the objective line" /><span>${zf(zline == null ? zmin : zline)}</span></div>`}
      ${S.cor.length > 0 && html`<${CTable} P=${P} cor=${S.cor} best=${best} />`}
      <p className=${'orv2-verdict' + (S.status === 'infeasible' || S.status === 'unbounded' ? ' orv2-bad' : '')}>${S.status === 'infeasible' ? 'Infeasible LP' : S.status === 'unbounded' ? 'Unbounded solution' : S.status === 'multiple' ? 'Multiple optimal solutions' : 'Optimal: ' + best[0] + pstr(S.opt[0].x, S.opt[0].y) + ', Z = ' + zf(S.zb)}</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [6] the special cases on a graph ── */
  const SP = {
    inf: { t: 'Infeasible', P: { sense: 'max', c1: 200, c2: 300, cs: [C(2, 3, '>=', 1200), C(1, 1, '<=', 400), C(2, 1.5, '>=', 900)] }, lone: [1, 2],
      en: 'Revision Q14: Max 200x1 + 300x2 with 2x1 + 3x2 ≥ 1200, x1 + x2 ≤ 400, 2x1 + 1.5x2 ≥ 900. Inside x1 + x2 ≤ 400 (shaded) the largest 2x1 + 1.5x2 is 2(400) = 800 < 900, so the two shaded regions never overlap: <b>infeasible</b>.',
      ar: 'ده سؤال 14 من الـ revision، والـ constraints بتاعته:' + L('2x1 + 3x2 ≥ 1200') + L('x1 + x2 ≤ 400') + L('2x1 + 1.5x2 ≥ 900') + 'جوه منطقة الـ ' + I('x1 + x2 ≤ 400') + ' أكبر قيمة لـ ' + I('2x1 + 1.5x2') + ' هي:' + L('2(400) = 800 < 900') + 'يعني المنطقتين المظللين مش بيتقاطعوا، فالحل <b>infeasible</b>.' },
    unb: { t: 'Unbounded', P: { sense: 'max', c1: 1.2, c2: 0.8, cs: [C(2, 2, '>=', 16), C(4, 1, '>=', 20)] }, reg: true, isos: [16, 24, 32],
      en: 'The diet region (Example 5) is open upward. If we <b>maximised</b> 1.2x1 + 0.8x2 on it, the objective line could move away forever (Z = 16, 24, 32, …): <b>unbounded</b>, Z → ∞. (For the MIN problem the same region is fine.)',
      ar: 'منطقة الـ diet في Example 5 مفتوحة لفوق. لو عملنا <b>Max</b> لـ ' + I('1.2x1 + 0.8x2') + ' عليها، خط الـ objective هيفضل يبعد من غير نهاية:' + L('Z = 16, 24, 32, … → ∞') + 'وده الحل الـ <b>unbounded</b>. (أما مسألة الـ MIN فمفيهاش مشكلة.)' },
    mul: { t: 'Multiple optima', P: { sense: 'max', c1: 20, c2: 10, cs: [C(1, 2, '<=', 22), C(4, 2, '<=', 40)] }, reg: true,
      en: 'Jay\'s region (Example 2) with an objective <b>parallel</b> to 4x1 + 2x2 = 40, e.g. Max Z = 20x1 + 10x2 (chosen here to show the case): B(10, 0) and C(6, 8) both give Z = 200, so every point of segment BC is optimal.',
      ar: 'دي منطقة الـ Jay في Example 2 بس بـ objective <b>موازي</b> للخط ' + I('4x1 + 2x2 = 40') + ' (اخترناه هنا علشان نوضّح الحالة):' + L('Max Z = 20x1 + 10x2 → B(10, 0): 200 ; C(6, 8): 200') + 'فكل نقطة على الـ segment اللي بين B و C بتبقى optimal.' },
    red: { t: 'Redundant', P: MORE[5].P, reg: true,
      en: 'Fertilizer problem: 2x1 + 4x2 ≥ 10 (dashed, 1) does not touch the feasible region; the other two lines decide it. Removing it changes nothing: a <b>redundant constraint</b>.',
      ar: 'في مسألة الـ Fertilizer القيد ' + I('2x1 + 4x2 ≥ 10') + ' (المتقطع، رقم 1) مش بيلمس الـ feasible region، والخطين التانيين هما اللي بيحددوها. لو شلناه مفيش حاجة هتتغير، فده <b>redundant constraint</b>.' }
  };
  function Special({ ar }) {
    const [mode, setMode] = useState('inf'), c = SP[mode], S = solve(c.P), V = viewOf(c.P.cs, S.cor);
    const verdict = { infeasible: 'Infeasible LP: empty feasible region', unbounded: 'Unbounded solution: Z → ∞', multiple: 'Multiple optimal solutions: Z = ' + zf(S.zb || 0), optimal: 'Optimal: ' + (S.opt[0] ? S.opt[0].n + pstr(S.opt[0].x, S.opt[0].y) + ', Z = ' + zf(S.zb) : '') }[S.status];
    return html`<figure className="fig orv2"><div className="fig-stage">
      <${Modes} list=${Object.keys(SP).map(k => [k, SP[k].t])} mode=${mode} set=${setMode} />
      <${Model} P=${c.P} red=${S.red} />
      <${Plot} key=${mode} P=${c.P} V=${V} lone=${c.lone || []} reg=${!!c.reg} cor=${S.cor} hi=${S.opt.map(p => p.n)} iso=${S.status === 'multiple' || mode === 'red' ? S.zb : null} isos=${c.isos || []} segPts=${S.status === 'multiple' ? [S.opt[0], S.opt[S.opt.length - 1]] : null} fade=${S.red} label=${'Special case: ' + c.t} />
      <p className=${'orv2-verdict' + (S.status === 'infeasible' || S.status === 'unbounded' ? ' orv2-bad' : '')}>${verdict}</p>
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'or-lp-terms': Terms, 'or-lp-steps': Procedure, 'or-lp-intersect': Intersect, 'or-lp-shade': Shade, 'or-lp-ex1': Ex1, 'or-lp-ex2': Ex2, 'or-lp-ex5': Ex5, 'or-lp-solver': Solver, 'or-lp-special': Special });
})();
/* ── part L4 ── */
// Operations Research visuals, Lecture 4 (transportation problem): the network (Lec_04 slide 6), balance and m + n − 1, NWC / least cost / Vogel step-throughs (Lec_04, Lec_05, Lec_06 tableaux), one stepping stone loop, the stepping stone simulator (Final 2025/26) and a method comparison. Every label and number comes from the site's notes or is computed with the course's rules.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.orv4 .fig-stage{ padding:14px 6px 10px; }
.orv4-svg{ width:100%; height:auto; display:block; margin:0 auto; }
.orv4-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.orv4-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.orv4 .fig-btn[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.orv4-lbl{ display:block; font-size:.84rem; color:var(--graphite); margin:0 4px 4px; }
.orv4-in{ font:14px/1.45 var(--mono); width:100%; box-sizing:border-box; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); resize:vertical; }
.orv4-in:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.orv4-row{ margin:0 0 10px; }
.orv4-err{ color:var(--pen); font-size:.9rem; text-align:center; margin:6px 0; }
.orv4-bars{ display:grid; gap:10px; max-width:520px; margin:0 auto; font-size:.9rem; }
.orv4-bars .orv4-name{ display:flex; justify-content:space-between; gap:8px; color:var(--ink); margin-bottom:3px; }
.orv4-bars .orv4-name b{ font-family:var(--mono); }
.orv4-track{ height:16px; border-radius:6px; background:var(--paper); border:1px solid var(--line); overflow:hidden; display:flex; }
.orv4-fill{ height:100%; background:var(--fig-s); transition:width .6s ease; }
.orv4-fill.orv4-opt{ background:var(--ok); }
.orv4-seg{ height:100%; background:var(--fig-s); border-right:2px solid var(--paper); box-sizing:border-box; transition:width .5s ease; }
.orv4-seg.orv4-alt{ background:var(--fig-k); }
.orv4-seg.orv4-dum{ background:transparent; border:2px dashed var(--pen); }
.orv4-parts{ font-size:.84rem; color:var(--graphite); margin-top:3px; line-height:1.4; }
.orv4-sum{ max-width:520px; margin:12px auto 0; display:grid; gap:4px; font-size:.92rem; text-align:center; }
.orv4-sum b{ font-family:var(--mono); }
.orv4-chip{ display:inline-block; padding:2px 10px; border-radius:99px; font-weight:600; font-size:.88rem; border:1.5px solid var(--ok); color:var(--ok); }
.orv4-chip.orv4-no{ border-color:var(--pen); color:var(--pen); }
.orv4-z{ text-align:center; font-size:.92rem; margin-top:8px; color:var(--graphite); }
.orv4-z b{ font-family:var(--mono); color:var(--ink); }
.orv4 .orv4-pt{ transition:opacity .5s ease; }
@media (prefers-reduced-motion: reduce){ .orv4-fill, .orv4-seg, .orv4 .orv4-pt{ transition:none; } }`;
  if (!document.getElementById('orv4-css')) { const s = document.createElement('style'); s.id = 'orv4-css'; s.textContent = CSS; document.head.appendChild(s); }
  const b = x => `<bdi dir="ltr">${x}</bdi>`, L = x => `<span class="ltr">${x}</span>`;
  /* ── engine: NWC, least cost, Vogel, stepping stone (the course's rules) ── */
  const fmt = x => Number(x).toLocaleString('en-US');
  const LEC = { name: 'Canned peas (lecture)', rows: ['C1', 'C2', 'C3'], cols: ['W1', 'W2', 'W3', 'W4'], c: [[464, 513, 654, 867], [352, 216, 690, 791], [995, 682, 388, 685]], s: [75, 125, 100], d: [80, 65, 70, 85] };
  const VAMX = { name: 'VAM example', rows: ['S1', 'S2', 'S3', 'S4'], cols: ['D1', 'D2', 'D3', 'D4'], c: [[16, 13, 22, 17], [14, 13, 19, 15], [9, 20, 23, 10], [1, 1, 0, 1]], s: [200, 350, 150, 90], d: [100, 140, 300, 250] };
  const REV = { name: 'Revision example', rows: ['S1', 'S2', 'S3'], cols: ['D1', 'D2', 'D3'], c: [[100, 140, 75], [90, 20, 110], [60, 130, 220]], s: [300, 320, 380], d: [250, 550, 200] };
  const FIN = { name: 'Final 2025/26', rows: ['Q1', 'Q2', 'Q3'], cols: ['D1', 'D2', 'D3'], c: [[5, 6, 7], [1, 8, 4], [9, 3, 2]], s: [400, 500, 300], d: [200, 600, 400] };
  const nm = (P, r, c) => P.rows[r] + P.cols[c];
  const sum = a => a.reduce((x, y) => x + y, 0);
  const grid = (m, n, v) => Array.from({ length: m }, () => Array(n).fill(v));
  const cloneX = X => X.map(r => r.slice());
  // balance with a dummy source/destination of zero cost (textbook rule)
  function balance(P) {
    const S = sum(P.s), D = sum(P.d);
    if (S === D) return P;
    if (S < D) return Object.assign({}, P, { rows: P.rows.concat('Dum'), c: P.c.concat([P.cols.map(() => 0)]), s: P.s.concat(D - S), dummy: 'row' });
    return Object.assign({}, P, { cols: P.cols.concat('Dum'), c: P.c.map(r => r.concat(0)), d: P.d.concat(S - D), dummy: 'col' });
  }
  function penalty(P, outR, outC) {
    const two = a => { const v = a.slice().sort((x, y) => x - y); return v.length > 1 ? v[1] - v[0] : null; };
    const liveC = P.cols.map((_, j) => j).filter(j => !outC[j]), liveR = P.rows.map((_, i) => i).filter(i => !outR[i]);
    return { r: P.rows.map((_, i) => outR[i] ? null : two(liveC.map(j => P.c[i][j]))), c: P.cols.map((_, j) => outC[j] ? null : two(liveR.map(i => P.c[i][j]))) };
  }
  // one run of a method: a list of allocation steps
  function solve(P, method) {
    const m = P.rows.length, n = P.cols.length, S = P.s.slice(), D = P.d.slice(), X = grid(m, n, null), outR = Array(m).fill(false), outC = Array(n).fill(false), steps = [];
    let guard = 0;
    while (outR.some(x => !x) && outC.some(x => !x) && guard++ < 60) {
      const liveR = [...Array(m).keys()].filter(i => !outR[i]), liveC = [...Array(n).keys()].filter(j => !outC[j]);
      let r, c, pen = null, pick = null, tie = null, only = null;
      const cheapest = cells => cells.reduce((b, x) => P.c[x[0]][x[1]] < P.c[b[0]][b[1]] ? x : b);
      if (method === 'nwc') { r = liveR[0]; c = liveC[0]; }
      else if (method === 'lcm') { [r, c] = cheapest(liveR.flatMap(i => liveC.map(j => [i, j]))); }
      else {
        if (liveR.length === 1 || liveC.length === 1) { only = liveR.length === 1 ? { t: 'r', i: liveR[0] } : { t: 'c', i: liveC[0] }; [r, c] = cheapest(liveR.flatMap(i => liveC.map(j => [i, j]))); }
        else {
          pen = penalty(P, outR, outC);
          const lines = [].concat(liveR.map(i => ({ t: 'r', i, p: pen.r[i], cells: liveC.map(j => [i, j]) })), liveC.map(j => ({ t: 'c', i: j, p: pen.c[j], cells: liveR.map(i => [i, j]) })));
          const top = Math.max(...lines.map(l => l.p)), cand = lines.filter(l => l.p === top);
          cand.forEach(l => { l.best = cheapest(l.cells); l.bc = P.c[l.best[0]][l.best[1]]; });
          const low = Math.min(...cand.map(l => l.bc)); pick = cand.find(l => l.bc === low);
          if (cand.length > 1) tie = cand.map(l => ({ t: l.t, i: l.i, bc: l.bc }));
          [r, c] = pick.best; pick = { t: pick.t, i: pick.i, p: top };
        }
      }
      const s0 = S[r], d0 = D[c], q = Math.min(s0, d0);
      X[r][c] = q; S[r] -= q; D[c] -= q;
      let cross;
      if (S[r] === 0 && D[c] === 0) cross = liveR.length === 1 && liveC.length === 1 ? 'both' : liveR.length > 1 ? 'r' : 'c';
      else cross = S[r] === 0 ? 'r' : 'c';
      if (cross !== 'c') outR[r] = true; if (cross !== 'r') outC[c] = true;
      steps.push({ r, c, q, s0, d0, cross, deg: S[r] === 0 && D[c] === 0 && cross !== 'both', X: cloneX(X), S: S.slice(), D: D.slice(), outR: outR.slice(), outC: outC.slice(), pen, pick, tie, only });
    }
    return steps;
  }
  const cost = (P, X) => sum(X.flatMap((row, i) => row.map((x, j) => x ? x * P.c[i][j] : 0)));
  const terms = (P, X) => X.flatMap((row, i) => row.map((x, j) => [x, P.c[i][j]])).filter(([x]) => x > 0);
  // closed path from an empty cell: horizontal first, turning only at occupied cells
  function loopFor(X, r0, c0) {
    const B = []; X.forEach((row, i) => row.forEach((x, j) => { if (x != null) B.push([i, j]); }));
    const has = (p, a) => p.some(q => q[0] === a[0] && q[1] === a[1]);
    function dfs(path, horiz) {
      const [r, c] = path[path.length - 1];
      if (!horiz && path.length >= 4 && path.length % 2 === 0 && c === c0) return path;
      const next = B.filter(b => horiz ? b[0] === r && b[1] !== c : b[1] === c && b[0] !== r).filter(b => !has(path, b));
      for (const b of next) { const got = dfs(path.concat([b]), !horiz); if (got) return got; }
      return null;
    }
    const p = dfs([[r0, c0]], true);
    return p ? p.map((x, k) => ({ r: x[0], c: x[1], sg: k % 2 ? -1 : 1 })) : null;
  }
  function indices(P, X) {
    const out = [];
    X.forEach((row, i) => row.forEach((x, j) => { if (x != null) return; const L = loopFor(X, i, j); if (L) out.push({ r: i, c: j, L, v: sum(L.map(k => k.sg * P.c[k.r][k.c])) }); }));
    return out;
  }
  // stepping stone iterations from a starting allocation
  function stone(P, X0) {
    const its = []; let X = cloneX(X0);
    for (let t = 0; t < 25; t++) {
      const idx = indices(P, X), z = cost(P, X), neg = idx.filter(e => e.v < 0);
      if (!neg.length) { its.push({ X, idx, z, best: null }); break; }
      const best = neg.reduce((b, e) => e.v < b.v ? e : b), minus = best.L.filter(k => k.sg < 0), th = Math.min(...minus.map(k => X[k.r][k.c])), leave = minus.find(k => X[k.r][k.c] === th);
      const Y = cloneX(X); best.L.forEach(k => { Y[k.r][k.c] = (Y[k.r][k.c] || 0) + k.sg * th; }); Y[leave.r][leave.c] = null;
      its.push({ X, idx, z, best, th, leave, Y, z2: z + best.v * th });
      X = Y;
    }
    return its;
  }
  const finalX = (P, method) => { const st = solve(P, method); return st[st.length - 1].X; };

  /* ── shared pieces ── */
  const SETAR = { 'Canned peas (lecture)': 'بيانات المحاضرة (البسلة المعلبة)', 'VAM example': 'مثال الـ VAM', 'Revision example': 'مثال الـ Revision', 'Final 2025/26': 'امتحان الـ Final ' + b('2025/26'), 'Your data': 'بياناتك' };
  const SHORT = { 'Canned peas (lecture)': 'Lecture data', 'VAM example': 'VAM example', 'Revision example': 'Revision', 'Final 2025/26': 'Final 2025/26' };
  const MNAME = { nwc: 'Northwest corner', lcm: 'Least cost', vam: 'Vogel (VAM)' };
  const MS = { nwc: 'NWC', lcm: 'LCM', vam: 'VAM' };
  const money = z => '$' + fmt(z);
  const sgn = v => v < 0 ? '−' + Math.abs(v) : '+' + v;
  const Modes = ({ list, mode, set, label }) => html`<div className="orv4-modes" role="group" aria-label=${label || 'Choose'}>${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  // steps that restart when the data change (dep); autoplay only on the first mount
  function useWalk(n, ms, dep) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(false); }, [dep]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  // the text format of "Try your own": one source per line "costs | supply", last line the demands
  const toTxt = P => P.c.map((r, i) => r.join(' ') + ' | ' + P.s[i]).join('\n') + '\n' + P.d.join(' ');
  function parse(t) {
    const lines = t.split('\n').map(x => x.trim()).filter(Boolean), src = lines.filter(l => l.includes('|')), dem = lines.filter(l => !l.includes('|'));
    const nums = s => s.split(/[\s,]+/).filter(Boolean).map(Number);
    const E = (en, ar) => ({ err: { en, ar } });
    if (src.length < 2 || src.length > 5) return E('Write 2 to 5 source lines like "464 513 654 | 75".', 'اكتب من 2 لـ 5 سطور للـ sources بالشكل ده:' + L('464 513 654 | 75'));
    if (dem.length !== 1) return E('Write one last line with the demands (no "|").', 'اكتب سطر أخير واحد فيه الـ demands (من غير ' + b('|') + ').');
    const c = [], s = [];
    for (const l of src) { const [a, z] = l.split('|'); c.push(nums(a)); s.push(...nums(z)); }
    const d = nums(dem[0]), n = d.length;
    if (n < 2 || n > 5 || c.some(r => r.length !== n) || s.length !== c.length) return E('Every source line needs one cost per destination (2 to 5) and one supply.', 'كل سطر source محتاج تكلفة لكل destination (من 2 لـ 5) و supply واحد.');
    if ([...c.flat(), ...s, ...d].some(x => !Number.isInteger(x) || x < 0 || x > 9999)) return E('Use whole numbers from 0 to 9999.', 'استخدم أرقام صحيحة من ' + b('0') + ' لـ ' + b('9999') + '.');
    if (s.some(x => x === 0) || d.some(x => x === 0)) return E('Supplies and demands must be above 0.', 'الـ supply والـ demand لازم يكونوا أكبر من صفر.');
    return { P: balance({ name: 'Your data', rows: c.map((_, i) => 'S' + (i + 1)), cols: d.map((_, j) => 'D' + (j + 1)), c, s, d }) };
  }
  const dumEn = P => P.dummy ? ` Supply ≠ demand, so a dummy ${P.dummy === 'row' ? 'source' : 'destination'} "Dum" with zero costs takes the difference.` : '';
  const dumAr = P => P.dummy ? ` الـ supply مش بيساوي الـ demand، فضفنا dummy ${P.dummy === 'row' ? 'source' : 'destination'} اسمه ${b('Dum')} تكاليفه صفر عشان ياخد الفرق.` : '';

  /* the tableau as on the slides: cost in the small box, allocation in the cell, crossed lines shaded */
  function Tab({ P, X, outR, outC, cur, S, D, showPen, pen, pick, loop, closed, idx, sel, onCell, title }) {
    const m = P.rows.length, n = P.cols.length;
    const LW = 48, CW = n >= 5 ? 48 : n === 4 ? 56 : 70, SW = 58, PW = showPen ? 40 : 0, HH = 24, RH = 46;
    const DH = 44, PH = showPen ? 26 : 0, W = LW + n * CW + SW + PW, H = HH + m * RH + DH + PH + 2;
    const fs = Math.max(14, Math.ceil(12.1 * W / 280)), cx = j => LW + j * CW, cy = i => HH + i * RH;
    const out = (i, j) => (outR && outR[i]) || (outC && outC[j]);
    const iv = {}; (idx || []).forEach(e => { iv[e.r + ',' + e.c] = e.v; });
    const lp = loop || [], pts = lp.map(k => `${cx(k.c) + CW / 2},${cy(k.r) + RH / 2}`).join(' ');
    const T = (x, y, t, st, k) => html`<text key=${k} x=${x} y=${y} style=${st}>${t}</text>`;
    return html`<svg className="orv4-svg" viewBox=${`0 0 ${W} ${H}`} style=${{ maxWidth: Math.round(W * 1.45) + 'px' }} role="img" aria-label=${title || 'Transportation tableau'} fontSize=${fs}>
      ${P.cols.map((cn, j) => T(cx(j) + CW / 2, HH - 7, cn, { textAnchor: 'middle', fontWeight: 600 }, 'h' + j))}
      ${T(LW + n * CW + SW / 2, HH - 7, 'Supply', { textAnchor: 'middle', fontWeight: 600 }, 'hs')}
      ${showPen && T(W - PW / 2, HH - 7, 'Pen.', { textAnchor: 'middle', fontWeight: 600, fill: 'var(--fig-k)' }, 'hp')}
      ${P.rows.map((rn, i) => T(LW - 6, cy(i) + RH / 2 + 5, rn, { textAnchor: 'end', fontWeight: 600 }, 'r' + i))}
      ${T(LW - 6, cy(m) + 19, 'Dem.', { textAnchor: 'end', fontWeight: 600 }, 'rd')}
      ${P.rows.map((_, i) => P.cols.map((_, j) => { const x = cx(j), y = cy(i), v = X[i][j], k = i + ',' + j, ix = iv[k];
        return html`<g key=${k} onClick=${onCell ? () => onCell(i, j) : null} style=${{ cursor: onCell && v == null ? 'pointer' : 'default' }}>
          <rect x=${x} y=${y} width=${CW} height=${RH} style=${{ fill: v == null && out(i, j) ? 'color-mix(in srgb, var(--line) 75%, var(--paper))' : 'var(--paper)', stroke: 'var(--line)', transition: 'fill .4s' }} />
          <rect x=${x + 3} y=${y + 3} width=${Math.round(CW * .54)} height=${fs + 4} rx="2" style=${{ fill: 'none', stroke: 'var(--faint)' }} />
          <text x=${x + 6} y=${y + fs + 2} style=${{ fill: 'var(--graphite)' }}>${P.c[i][j]}</text>
          ${v != null && html`<text x=${x + CW - 5} y=${y + RH - 6} style=${{ textAnchor: 'end', fontWeight: 700 }} fontSize=${fs + 1}>${v}</text>`}
          ${v == null && ix != null && html`<text x=${x + CW - 5} y=${y + RH - 6} style=${{ textAnchor: 'end', fontWeight: 700, fontStyle: 'italic', fill: ix < 0 ? 'var(--pen)' : 'var(--ok)' }}>${sgn(ix)}</text>`}
        </g>`; }))}
      ${lp.length > 1 && html`<polyline points=${pts + (closed ? ' ' + pts.split(' ')[0] : '')} style=${{ fill: 'none', stroke: 'var(--fig-k)', strokeWidth: 3, strokeLinejoin: 'round', opacity: .85, pointerEvents: 'none' }} />`}
      ${lp.map((k, q) => html`<g key=${'s' + q} style=${{ pointerEvents: 'none' }}><circle cx=${cx(k.c) + CW - 12} cy=${cy(k.r) + 12} r="10.5" style=${{ fill: k.sg > 0 ? 'var(--ok)' : 'var(--pen)' }} /><text x=${cx(k.c) + CW - 12} y=${cy(k.r) + 17} style=${{ textAnchor: 'middle', fill: '#fff', fontWeight: 700 }}>${k.sg > 0 ? '+' : '−'}</text></g>`)}
      ${cur && html`<rect x=${cx(cur[1]) + 1.5} y=${cy(cur[0]) + 1.5} width=${CW - 3} height=${RH - 3} rx="3" style=${{ fill: 'none', stroke: 'var(--fig-k)', strokeWidth: 3, pointerEvents: 'none' }} />`}
      ${sel && html`<rect x=${cx(sel[1]) + 1.5} y=${cy(sel[0]) + 1.5} width=${CW - 3} height=${RH - 3} rx="3" style=${{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 2, strokeDasharray: '5 4', pointerEvents: 'none' }} />`}
      ${P.rows.map((_, i) => { const x = LW + n * CW + SW / 2, y = cy(i), ch = S && S[i] !== P.s[i];
        return html`<g key=${'sp' + i}><text x=${x} y=${y + (ch ? 19 : 28)} style=${{ textAnchor: 'middle', opacity: ch ? .6 : 1, textDecoration: ch ? 'line-through' : 'none' }}>${P.s[i]}</text>
          ${ch && html`<text x=${x} y=${y + 39} style=${{ textAnchor: 'middle', fontWeight: 700, fill: 'var(--fig-k)' }}>${S[i]}</text>`}</g>`; })}
      ${P.cols.map((_, j) => { const x = cx(j) + CW / 2, y = cy(m), ch = D && D[j] !== P.d[j];
        return html`<g key=${'dm' + j}><text x=${x} y=${y + 19} style=${{ textAnchor: 'middle', opacity: ch ? .6 : 1, textDecoration: ch ? 'line-through' : 'none' }}>${P.d[j]}</text>
          ${ch && html`<text x=${x} y=${y + 38} style=${{ textAnchor: 'middle', fontWeight: 700, fill: 'var(--fig-k)' }}>${D[j]}</text>`}</g>`; })}
      ${showPen && pen && P.rows.map((_, i) => pen.r[i] == null ? null : html`<g key=${'pr' + i}>
        ${pick && pick.t === 'r' && pick.i === i && html`<rect x=${W - PW + 4} y=${cy(i) + 10} width=${PW - 8} height=${RH - 20} rx="5" style=${{ fill: 'none', stroke: 'var(--fig-k)', strokeWidth: 2 }} />`}
        <text x=${W - PW / 2} y=${cy(i) + RH / 2 + 5} style=${{ textAnchor: 'middle', fill: 'var(--fig-k)', fontWeight: pick && pick.t === 'r' && pick.i === i ? 800 : 500 }}>${pen.r[i]}</text></g>`)}
      ${showPen && pen && P.cols.map((_, j) => pen.c[j] == null ? null : html`<g key=${'pc' + j}>
        ${pick && pick.t === 'c' && pick.i === j && html`<rect x=${cx(j) + 8} y=${cy(m) + DH + 1} width=${CW - 16} height=${PH - 1} rx="5" style=${{ fill: 'none', stroke: 'var(--fig-k)', strokeWidth: 2 }} />`}
        <text x=${cx(j) + CW / 2} y=${cy(m) + DH + PH - 7} style=${{ textAnchor: 'middle', fill: 'var(--fig-k)', fontWeight: pick && pick.t === 'c' && pick.i === j ? 800 : 500 }}>${pen.c[j]}</text></g>`)}
      ${showPen && T(LW - 6, cy(m) + DH + PH - 7, 'Pen.', { textAnchor: 'end', fontWeight: 600, fill: 'var(--fig-k)' }, 'rp')}
    </svg>`;
  }
  const zLines = (P, X) => { const t = terms(P, X), z = cost(P, X); return { a: 'Z = ' + t.map(([x, c]) => `${c}×${x}`).join(' + '), b: '= ' + t.map(([x, c]) => fmt(c * x)).join(' + ') + ' = ' + money(z), z }; };

  /* ── [2] [3] [5] NWC, least cost and Vogel, allocation by allocation ── */
  function capStep(P, method, s, k) {
    const cell = nm(P, s.r, s.c), cst = P.c[s.r][s.c], mins = `min(${s.s0}, ${s.d0}) = ${s.q}`, rn = P.rows[s.r], cn = P.cols[s.c], nw = method === 'nwc';
    let ce, ca;
    if (s.cross === 'both') { ce = 'Both run out: that was the last cell.'; ca = 'الاتنين خلصوا مع بعض، ودي كانت آخر خانة.'; }
    else if (s.cross === 'r') { ce = `${rn} is done (supply 0): cross out its row${nw ? ' and move down' : ''}.`; ca = `الـ ${b(rn)} خلص (الـ supply بقى صفر)، فاشطب الصف${nw ? ' وانزل لتحت' : ''}.`; }
    else { ce = `${cn} is done (demand 0): cross out its column${nw ? ' and move right' : ''}.`; ca = `الـ ${b(cn)} خلص (الـ demand بقى صفر)، فاشطب العمود${nw ? ' واتحرك يمين' : ''}.`; }
    if (s.deg) { ce += ' Supply and demand ran out together: only one line is crossed out, the other stays open with 0, so a 0 is allocated next (degenerate), keeping m + n − 1 cells.'; ca += ' الـ supply والـ demand خلصوا مع بعض، فبنشطب خط واحد بس والتاني بيفضل مفتوح بصفر، وبعدها بنحط صفر (degenerate) عشان يفضلوا ' + b('m&nbsp;+&nbsp;n&nbsp;−&nbsp;1') + ' خانة.'; }
    const lineEn = l => (l.t === 'r' ? 'row ' + P.rows[l.i] : 'column ' + P.cols[l.i]), lineAr = l => (l.t === 'r' ? 'الصف ' + b(P.rows[l.i]) : 'العمود ' + b(P.cols[l.i]));
    if (method === 'nwc') return { en: `Step ${k}: the northwest corner of what is left is <b>${cell}</b> (cost ${cst}). Allocate ${mins}. ${ce}`,
      ar: `الخطوة ${b(k)}: الركن الشمال فوق من اللي فاضل هو ${b(cell)} (التكلفة ${b(cst)}). حط أكبر كمية ممكنة:` + L(mins) + ca };
    if (method === 'lcm') return { en: `Step ${k}: the lowest cost still open is <b>${cst}</b> at <b>${cell}</b>. Allocate ${mins}. ${ce}`,
      ar: `الخطوة ${b(k)}: أقل تكلفة لسه مفتوحة هي ${b(cst)} في الخانة ${b(cell)}. حط أكبر كمية ممكنة:` + L(mins) + ca };
    if (s.only) return { en: `Step ${k}: only ${lineEn(s.only)} is still open, so its cheapest open cell <b>${cell}</b> (cost ${cst}) takes ${mins}. ${ce}`,
      ar: `الخطوة ${b(k)}: مفيش مفتوح غير ${lineAr(s.only)}، فأرخص خانة مفتوحة فيه ${b(cell)} (التكلفة ${b(cst)}) بتاخد:` + L(mins) + ca };
    const pr = P.rows.map((x, i) => s.pen.r[i] == null ? null : `${x} ${s.pen.r[i]}`).filter(Boolean).join(', '), pc = P.cols.map((x, j) => s.pen.c[j] == null ? null : `${x} ${s.pen.c[j]}`).filter(Boolean).join(', ');
    const tieE = s.tie ? ` Tie between ${s.tie.map(lineEn).join(' and ')}: take the one with the lowest-cost cell (${Math.min(...s.tie.map(t => t.bc))}).` : '';
    const tieA = s.tie ? ` فيه تعادل بين ${s.tie.map(lineAr).join(' و ')}، فبناخد اللي فيه أرخص خانة (${b(Math.min(...s.tie.map(t => t.bc)))}).` : '';
    return { en: `Step ${k}: penalties (next lowest − lowest): rows ${pr}; columns ${pc}. Highest: <b>${s.pick.p}</b> in ${lineEn(s.pick)}.${tieE} Its cheapest cell is <b>${cell}</b> (cost ${cst}). Allocate ${mins}. ${ce}`,
      ar: `الخطوة ${b(k)}: الـ penalties (تاني أقل تكلفة ناقص أقل تكلفة) في الصفوف وبعدين الأعمدة:` + L(`rows ${pr} / cols ${pc}`) + `أعلى penalty هو ${b(s.pick.p)} في ${lineAr(s.pick)}.${tieA} أرخص خانة فيه هي ${b(cell)} (التكلفة ${b(cst)}). حط:` + L(mins) + ca };
  }
  const INTRO = {
    nwc: { en: 'Northwest corner rule: start at the upper left-hand cell, allocate min(supply, demand), cross out what is satisfied, then move right or down. Costs are ignored.', ar: 'الـ Northwest corner rule: ابدأ من الخانة اللي في الركن الشمال فوق، وحط أكبر كمية ممكنة يعني' + L('min(supply, demand)') + 'واشطب اللي اتقفل، وبعدين اتحرك يمين أو تحت. التكاليف مش بتفرق هنا.' },
    lcm: { en: 'Least cost method: allocate as much as possible to the cheapest cell of the whole tableau, cross out the satisfied row or column, and repeat with the lowest remaining cost.', ar: 'الـ Least cost method: حط أكبر كمية ممكنة في أرخص خانة في الـ tableau كله، واشطب الصف أو العمود اللي اتقفل، وكرر مع أقل تكلفة فاضلة.' },
    vam: { en: 'Vogel: in every open row and column, penalty = next lowest cost − lowest cost. Take the highest penalty and allocate as much as possible to its cheapest cell. Smallest, largest, smallest.', ar: 'الـ Vogel: في كل صف وعمود مفتوح الـ penalty هو تاني أقل تكلفة ناقص أقل تكلفة. خد أعلى penalty وحط أكبر كمية ممكنة في أرخص خانة فيه. يعني أصغر، أكبر، أصغر.' },
  };
  function Method({ ar, method, sets }) {
    const [k, setK] = useState(0), [txt, setTxt] = useState(toTxt(sets[0]));
    const own = k === sets.length, got = own ? parse(txt) : { P: sets[k] }, P = got.P;
    const st = React.useMemo(() => P ? solve(P, method) : [], [P && JSON.stringify(P), method]);
    const n = st.length + 2, [i, ctl] = useWalk(n, 2600, own ? 'own' + txt : k);
    const pick = j => { if (j === sets.length && !own) setTxt(toTxt(sets[k])); setK(j); };
    const head = html`<${Modes} list=${sets.map((s, j) => [j, SHORT[s.name]]).concat([[sets.length, 'Try your own']])} mode=${k} set=${pick} label="Data" />
      ${own && html`<div className="orv4-row"><label className="orv4-lbl" htmlFor=${'orv4-in-' + method}>Each line: costs | supply. Last line: demands.</label>
        <textarea id=${'orv4-in-' + method} className="orv4-in" rows=${Math.min(7, txt.split('\n').length + 1)} value=${txt} onInput=${e => setTxt(e.target.value)} spellCheck="false" autoCapitalize="off"></textarea></div>`}`;
    if (!P) return html`<figure className="fig orv4"><div className="fig-stage">${head}<p className="orv4-err">${got.err.en}</p></div><${Cap} en=${got.err.en} ar=${got.err.ar} showAr=${ar} /></figure>`;
    const s = i > 0 && i <= st.length ? st[i - 1] : null, last = st[st.length - 1], done = i === n - 1;
    const view = i === 0 ? { X: P.rows.map(() => P.cols.map(() => null)) } : s || last;
    let cap;
    if (i === 0) cap = { en: `${INTRO[method].en} Data: ${P.name}.${dumEn(P)}`, ar: INTRO[method].ar + ` البيانات: ${SETAR[P.name]}.${dumAr(P)}` };
    else if (s) cap = capStep(P, method, s, i);
    else {
      const zl = zLines(P, last.X), m = P.rows.length, nn = P.cols.length, cnt = last.X.flat().filter(x => x != null).length, zz = ['nwc', 'lcm', 'vam'].map(q => money(cost(P, finalX(P, q))));
      cap = { en: `Done: ${cnt} allocated cells = m + n − 1 = ${m} + ${nn} − 1. ${zl.a} ${zl.b}. On this data NWC gives ${zz[0]}, least cost ${zz[1]}, VAM ${zz[2]}.`,
        ar: 'خلصنا. عدد الخانات المتوزع فيها:' + L(`${cnt} = m + n − 1 = ${m} + ${nn} − 1`) + 'والتكلفة الكلية:' + L(zl.a) + L(zl.b) + 'وعلى البيانات دي الطرق التلاتة بتدّي:' + L(`NWC ${zz[0]}, LCM ${zz[1]}, VAM ${zz[2]}`) };
    }
    return html`<figure className="fig orv4"><div className="fig-stage">${head}
      <${Tab} P=${P} X=${view.X} outR=${view.outR} outC=${view.outC} S=${view.S} D=${view.D} cur=${s ? [s.r, s.c] : null} showPen=${method === 'vam'} pen=${s && s.pen} pick=${s && s.pick} title=${MNAME[method] + ' tableau, ' + P.name} />
      <p className="orv4-z">${done ? html`Total cost <b>${money(cost(P, last.X))}</b>` : html`Allocated so far: <b>${i === 0 ? 0 : i}</b> of ${st.length} cells`}</p></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${Array(n).fill(0)} i=${i} ctl=${ctl} /></figure>`;
  }
  const Nwc = ({ ar }) => html`<${Method} ar=${ar} method="nwc" sets=${[LEC, REV, FIN]} />`;
  const Lcm = ({ ar }) => html`<${Method} ar=${ar} method="lcm" sets=${[LEC, REV, FIN]} />`;
  const Vam = ({ ar }) => html`<${Method} ar=${ar} method="vam" sets=${[VAMX, LEC, FIN]} />`;

  /* ── [0.3] Lec_04 slide 6: simple network representation, then the lecture's data as a network ── */
  function Network({ ar }) {
    const steps = [
      { en: 'Sources on the left, each with a supply s<sub>i</sub> (i = 1, …, m).', ar: 'الـ sources على الشمال، وكل واحد عنده supply اسمه ' + b('s<sub>i</sub>') + ' والـ i من ' + b('1') + ' لـ ' + b('m') + '.' },
      { en: 'Destinations on the right, each with a demand d<sub>j</sub> (j = 1, …, n).', ar: 'الـ destinations على اليمين، وكل واحد عنده demand اسمه ' + b('d<sub>j</sub>') + ' والـ j من ' + b('1') + ' لـ ' + b('n') + '.' },
      { en: 'An arc (i, j) for every route: x<sub>ij</sub> units shipped at a unit cost c<sub>ij</sub>. The shipping cost is directly proportional to the units shipped: c<sub>ij</sub> × x<sub>ij</sub>.', ar: 'فيه arc لكل route من source لـ destination، عليه ' + b('x<sub>ij</sub>') + ' وحدة متشحنة بتكلفة للوحدة ' + b('c<sub>ij</sub>') + '. تكلفة الشحن بتتناسب طرديًا مع عدد الوحدات:' + L('c<sub>ij</sub> × x<sub>ij</sub>') },
      { en: 'The lecture\'s data as a network: canneries C1 to C3 (supply in truckloads) ship to warehouses W1 to W4 (demand). Tap a cannery or a warehouse to see its route costs.', ar: 'بيانات المحاضرة على شكل network: الـ canneries من ' + b('C1') + ' لـ ' + b('C3') + ' (الـ supply بالـ truckloads) بتشحن للـ warehouses من ' + b('W1') + ' لـ ' + b('W4') + ' (الـ demand). دوس على cannery أو warehouse عشان تشوف تكاليف الـ routes بتاعته.' },
    ];
    const [i, ctl] = useSteps(steps.length, 2600), [sel, setSel] = useState({ t: 's', k: 0 });
    const W = 314, X1 = 104, X2 = 209, R = 14;
    if (i < 3) {
      const ys = [44, 96, 200], lab = ['1', '2', 'm'], labD = ['1', '2', 'n'];
      const sub = (t, s) => html`${t}<tspan fontSize="13" dy="4">${s}</tspan>`;
      return html`<figure className="fig orv4"><div className="fig-stage">
        <svg className="orv4-svg" viewBox=${`0 0 ${W} 250`} style=${{ maxWidth: '440px' }} role="img" aria-label="Simple network representation: m sources, n destinations, arcs with x ij and c ij" fontSize="15">
          <defs><marker id="orv4-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" style=${{ fill: 'var(--ink)' }} /></marker></defs>
          <text x=${X1} y="16" style=${{ textAnchor: 'middle', fontWeight: 600 }}>Sources</text>
          <text x=${X2 + 14} y="16" style=${{ textAnchor: 'middle', fontWeight: 600, opacity: i >= 1 ? 1 : 0 }} className="orv4-pt">Destinations</text>
          <g className="orv4-pt" style=${{ opacity: i >= 2 ? 1 : 0 }}>
            ${ys.map((ya, a) => ys.map((yb, c) => { const dx = X2 - X1, dy = yb - ya, d = Math.hypot(dx, dy); return html`<line key=${a + '-' + c} x1=${X1 + R * dx / d} y1=${ya + R * dy / d} x2=${X2 - (R + 1) * dx / d} y2=${yb - (R + 1) * dy / d} markerEnd="url(#orv4-arr)" style=${{ stroke: 'var(--ink)', strokeWidth: a === 0 && c === 1 ? 2.6 : 1.1 }} />`; }))}
            <text x="146" y="160" style=${{ textAnchor: 'middle' }}>${sub('x', 'ij')}</text>
            <text x="152" y="238" style=${{ textAnchor: 'middle' }}>${sub('Costs c', 'ij')}</text>
          </g>
          ${ys.map((y, a) => html`<g key=${'s' + a}><circle cx=${X1} cy=${y} r=${R} style=${{ fill: 'var(--fig-s)' }} /><text x=${X1} y=${y + 5} style=${{ textAnchor: 'middle', fill: '#fff', fontWeight: 700 }}>${lab[a]}</text>
            <text x=${X1 - 22} y=${y + 5} style=${{ textAnchor: 'end' }}>${sub('Supply s', lab[a])}</text></g>`)}
          <text x=${X1} y="152" style=${{ textAnchor: 'middle', fontWeight: 700 }}>⋮</text>
          <g className="orv4-pt" style=${{ opacity: i >= 1 ? 1 : 0 }}>
            ${ys.map((y, a) => html`<g key=${'d' + a}><circle cx=${X2} cy=${y} r=${R} style=${{ fill: 'var(--graphite)' }} /><text x=${X2} y=${y + 5} style=${{ textAnchor: 'middle', fill: 'var(--paper)', fontWeight: 700 }}>${labD[a]}</text>
              <text x=${X2 + 21} y=${y + 5}>${sub('Demand d', labD[a])}</text></g>`)}
            <text x=${X2} y="152" style=${{ textAnchor: 'middle', fontWeight: 700 }}>⋮</text>
          </g>
        </svg></div>
        <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
    }
    const P = LEC, ys = [52, 124, 196], yd = [34, 96, 158, 220];
    const on = (a, c) => sel.t === 's' ? sel.k === a : sel.k === c;
    const name = sel.t === 's' ? P.rows[sel.k] : P.cols[sel.k], list = sel.t === 's' ? P.cols.map((cn, c) => `${cn} ${P.c[sel.k][c]}`) : P.rows.map((rn, a) => `${rn} ${P.c[a][sel.k]}`);
    const cap = { en: steps[3].en + ` <b>${name}</b>: ${list.join(', ')} dollars per truckload.`, ar: steps[3].ar + ` تكاليف الـ ${b(name)} لكل truckload بالدولار:` + L(list.join(', ')) };
    return html`<figure className="fig orv4"><div className="fig-stage">
      <svg className="orv4-svg" viewBox=${`0 0 ${W} 250`} style=${{ maxWidth: '440px' }} role="img" aria-label="Lecture data network: canneries C1 to C3, warehouses W1 to W4" fontSize="15">
        <text x=${X1} y="16" style=${{ textAnchor: 'middle', fontWeight: 600 }}>Canneries</text>
        <text x=${X2 + 14} y="16" style=${{ textAnchor: 'middle', fontWeight: 600 }}>Warehouses</text>
        ${ys.map((ya, a) => yd.map((yb, c) => { const h = on(a, c); return html`<line key=${a + '-' + c} x1=${X1 + R} y1=${ya} x2=${X2 - R} y2=${yb} style=${{ stroke: h ? 'var(--fig-k)' : 'var(--line)', strokeWidth: h ? 2.6 : 1.2 }} />`; }))}
        ${ys.map((ya, a) => yd.map((yb, c) => { if (!on(a, c)) return null; const t = sel.t === 's' ? .62 : .38, x = X1 + R + t * (X2 - X1 - 2 * R), y = ya + t * (yb - ya);
          return html`<g key=${'c' + a + c}><rect x=${x - 18} y=${y - 10} width="36" height="19" rx="4" style=${{ fill: 'var(--paper)', stroke: 'var(--fig-k)' }} /><text x=${x} y=${y + 5} fontSize="14" style=${{ textAnchor: 'middle', fontWeight: 700 }}>${P.c[a][c]}</text></g>`; }))}
        ${ys.map((y, a) => html`<g key=${'s' + a} onClick=${() => setSel({ t: 's', k: a })} style=${{ cursor: 'pointer' }}><circle cx=${X1} cy=${y} r=${R + 3} style=${{ fill: 'var(--fig-s)', stroke: sel.t === 's' && sel.k === a ? 'var(--ink)' : 'none', strokeWidth: 2 }} /><text x=${X1} y=${y + 5} fontSize="14" style=${{ textAnchor: 'middle', fill: '#fff', fontWeight: 700 }}>${P.rows[a]}</text>
          <text x=${X1 - 24} y=${y + 5} style=${{ textAnchor: 'end' }}>${P.s[a]}</text></g>`)}
        ${yd.map((y, c) => html`<g key=${'d' + c} onClick=${() => setSel({ t: 'd', k: c })} style=${{ cursor: 'pointer' }}><circle cx=${X2} cy=${y} r=${R + 3} style=${{ fill: 'var(--graphite)', stroke: sel.t === 'd' && sel.k === c ? 'var(--fig-k)' : 'none', strokeWidth: 3 }} /><text x=${X2} y=${y + 5} fontSize="14" style=${{ textAnchor: 'middle', fill: 'var(--paper)', fontWeight: 700 }}>${P.cols[c]}</text>
          <text x=${X2 + 24} y=${y + 5}>${P.d[c]}</text></g>`)}
        <text x="18" y="244" fontSize="13" style=${{ fill: 'var(--graphite)' }}>supply</text>
        <text x="296" y="244" fontSize="13" style=${{ textAnchor: 'end', fill: 'var(--graphite)' }}>demand</text>
      </svg></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.4] [0.5] balanced or not (dummy), and m + n − 1 ── */
  function Balance({ ar }) {
    const sets = [LEC, VAMX, REV, FIN];
    const [k, setK] = useState(0), [sTxt, setS] = useState(LEC.s.join(' ')), [dTxt, setD] = useState(LEC.d.join(' '));
    const own = k === sets.length, nums = t => t.split(/[\s,]+/).filter(Boolean).map(Number);
    const s = own ? nums(sTxt) : sets[k].s, d = own ? nums(dTxt) : sets[k].d;
    const pick = j => { if (j === sets.length && !own) { setS(sets[k].s.join(' ')); setD(sets[k].d.join(' ')); } setK(j); };
    const bad = s.length < 1 || d.length < 1 || s.length > 8 || d.length > 8 || [...s, ...d].some(x => !Number.isInteger(x) || x <= 0 || x > 99999);
    let body, cap;
    if (bad) { body = html`<p className="orv4-err">Type 1 to 8 whole numbers above 0 in each box.</p>`; cap = { en: 'Type the supplies and the demands as whole numbers above 0.', ar: 'اكتب الـ supplies والـ demands أرقام صحيحة أكبر من صفر.' }; }
    else {
      const S = sum(s), D = sum(d), top = Math.max(S, D), dif = Math.abs(S - D), m = s.length + (S < D ? 1 : 0), n = d.length + (S > D ? 1 : 0);
      const rn = own ? s.map((_, i) => 'S' + (i + 1)) : sets[k].rows, cn = own ? d.map((_, j) => 'D' + (j + 1)) : sets[k].cols;
      const bar = (v, names, dum) => html`<div className="orv4-track">${v.map((x, j) => html`<div key=${j} className=${'orv4-seg' + (j % 2 ? ' orv4-alt' : '')} style=${{ width: (100 * x / top) + '%' }}></div>`)}${dum > 0 && html`<div className="orv4-seg orv4-dum" style=${{ width: (100 * dum / top) + '%' }}></div>`}</div>
        <div className="orv4-parts">${names.map((q, j) => `${q} ${v[j]}`).join(' · ')}${dum > 0 ? ` · Dummy ${dum}` : ''}</div>`;
      body = html`<div className="orv4-bars">
        <div><div className="orv4-name"><span>Total supply</span><b>${fmt(S)}</b></div>${bar(s, rn, S < D ? dif : 0)}</div>
        <div><div className="orv4-name"><span>Total demand</span><b>${fmt(D)}</b></div>${bar(d, cn, S > D ? dif : 0)}</div></div>
        <div className="orv4-sum"><div><span className=${'orv4-chip' + (dif ? ' orv4-no' : '')}>${dif ? 'Unbalanced: add a dummy' : 'Balanced'}</span></div>
          <div>m + n − 1 = ${m} + ${n} − 1 = <b>${m + n - 1}</b> allocated cells in a BFS</div>
          <div>(out of ${m} × ${n} = ${m * n} cells)</div></div>`;
      const dumE = dif ? ` Total supply ${fmt(S)} ≠ total demand ${fmt(D)}: add a dummy ${S < D ? 'source' : 'destination'} with ${S < D ? 'supply' : 'demand'} ${fmt(dif)} and zero costs to absorb the difference.` : ` Total supply = total demand = ${fmt(S)}: balanced, like all the course examples.`;
      const dumA = dif ? 'إجمالي الـ supply مش بيساوي إجمالي الـ demand:' + L(`${fmt(S)} ≠ ${fmt(D)}`) + `ضيف dummy ${S < D ? 'source' : 'destination'} فيه ${S < D ? 'supply' : 'demand'} قدره ${b(fmt(dif))} وتكاليفه صفر عشان ياخد الفرق.` : 'إجمالي الـ supply بيساوي إجمالي الـ demand:' + L(`${fmt(S)} = ${fmt(D)}`) + 'يعني المسألة Balanced زي كل أمثلة الكورس.';
      cap = { en: `${own ? 'Your data' : sets[k].name}.${dumE} A basic feasible solution then has m + n − 1 = ${m} + ${n} − 1 = ${m + n - 1} allocated cells.`,
        ar: `البيانات: ${own ? 'بياناتك' : SETAR[sets[k].name]}. ` + dumA + ' والـ basic feasible solution فيها عدد خانات متوزع فيها:' + L(`m + n − 1 = ${m} + ${n} − 1 = ${m + n - 1}`) };
    }
    return html`<figure className="fig orv4"><div className="fig-stage">
      <${Modes} list=${sets.map((x, j) => [j, SHORT[x.name]]).concat([[sets.length, 'Try your own']])} mode=${k} set=${pick} label="Data" />
      ${own && html`<div className="orv4-row"><label className="orv4-lbl" htmlFor="orv4-bs">Supplies</label><input id="orv4-bs" className="orv4-in" value=${sTxt} onInput=${e => setS(e.target.value)} spellCheck="false" />
        <label className="orv4-lbl" htmlFor="orv4-bd" style=${{ marginTop: '6px' }}>Demands</label><input id="orv4-bd" className="orv4-in" value=${dTxt} onInput=${e => setD(e.target.value)} spellCheck="false" /></div>`}
      ${body}</div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [7] one stepping stone loop, corner by corner (Final 2025/26, cell Q3D2) ── */
  function Loop({ ar }) {
    const X0 = React.useMemo(() => finalX(FIN, 'lcm'), []), it = React.useMemo(() => stone(FIN, X0)[0], []), e = it.best, Lp = e.L, P = FIN;
    const cn = k => nm(P, k.r, k.c), cc = k => P.c[k.r][k.c], z0 = cost(P, X0);
    const expr = Lp.map((k, q) => (q ? (k.sg > 0 ? ' + ' : ' − ') : '') + cc(k)).join('') + ' = ' + sgn(e.v).replace('+', '');
    const minus = Lp.filter(k => k.sg < 0), thE = `θ = min(${minus.map(k => `${cn(k)} = ${X0[k.r][k.c]}`).join(', ')}) = ${it.th}`;
    const moves = ['', 'horizontally', 'vertically', 'horizontally'];
    const steps = [
      { en: `Least cost start of Final 2025/26: Z = ${money(z0)}. Take the empty (unoccupied) cell <b>${cn(Lp[0])}</b>: would shipping units through it lower the cost?`, ar: `ده حل الـ least cost لامتحان الـ Final ${b('2025/26')} والتكلفة` + L(`Z = ${money(z0)}`) + `خد الخانة الفاضية ${b(cn(Lp[0]))}: لو شحنّا فيها وحدات التكلفة هتقل؟`, u: 0 },
      { en: `Start the closed path at the empty cell with <b>+</b> (cost ${cc(Lp[0])}).`, ar: `ابدأ الـ closed path من الخانة الفاضية بعلامة <b>+</b> (التكلفة ${b(cc(Lp[0]))}).`, u: 1 },
      ...Lp.slice(1).map((k, q) => ({ en: `Move ${moves[q + 1]} to the occupied cell <b>${cn(k)}</b> (${X0[k.r][k.c]} units) and turn there: sign <b>${k.sg > 0 ? '+' : '−'}</b> (cost ${cc(k)}).${q === Lp.length - 2 ? ' One vertical move closes the path back at the start.' : ''}`,
        ar: `اتحرك ${q % 2 ? 'رأسي' : 'أفقي'} للخانة المليانة ${b(cn(k))} (فيها ${b(X0[k.r][k.c])} وحدة) ولفّ عندها، وعلامتها <b>${k.sg > 0 ? '+' : '−'}</b> (التكلفة ${b(cc(k))}).${q === Lp.length - 2 ? ' وحركة رأسي واحدة بتقفل المسار عند البداية.' : ''}`, u: q + 2 })),
      { en: `Improvement index = sum of + costs − sum of − costs = ${expr}. Negative: every unit moved into ${cn(Lp[0])} saves $${-e.v}.`, ar: 'الـ Improvement index هو مجموع تكاليف الـ + ناقص مجموع تكاليف الـ −:' + L(expr) + `سالب، يعني كل وحدة بتنقلها للخانة ${b(cn(Lp[0]))} بتوفّر ${b('$' + (-e.v))}.`, u: Lp.length },
      { en: `Move θ = the smallest allocation on a − cell: ${thE}. Add θ at +, subtract at −: ${cn(it.leave)} drops to 0 and leaves. New cost = old cost + index × θ: Z = ${fmt(z0)} + (${e.v} × ${it.th}) = <b>${money(it.z2)}</b>.`, ar: 'انقل θ وهي أصغر allocation في خانات الـ −:' + L(thE) + `زوّد θ في الـ + واطرحها من الـ −، فالخانة ${b(cn(it.leave))} بتوصل صفر وبتخرج. والتكلفة الجديدة هي القديمة زائد الـ index في θ:` + L(`Z = ${fmt(z0)} + (${e.v} × ${it.th}) = ${money(it.z2)}`), u: Lp.length, after: true },
    ];
    const [i, ctl] = useSteps(steps.length, 2700), st = steps[i], aft = st.after;
    return html`<figure className="fig orv4"><div className="fig-stage">
      <${Tab} P=${P} X=${aft ? it.Y : X0} loop=${Lp.slice(0, st.u)} closed=${st.u === Lp.length} sel=${i === 0 ? [Lp[0].r, Lp[0].c] : null} cur=${aft ? [Lp[0].r, Lp[0].c] : null} title="Final 2025/26 least cost tableau with the closed path of Q3D2" />
      <p className="orv4-z">${aft ? html`New Z <b>${money(it.z2)}</b>` : html`Z <b>${money(z0)}</b>`}</p></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [8] stepping stone simulator: indices, most negative, θ, until all ≥ 0 ── */
  function Stone({ ar }) {
    const sets = [FIN, LEC, REV, VAMX];
    const [k, setK] = useState(0), [txt, setTxt] = useState(toTxt(FIN)), [start, setStart] = useState('lcm'), [sel, setSel] = useState(null);
    const own = k === sets.length, got = own ? parse(txt) : { P: sets[k] }, P = got.P;
    const key = (P ? JSON.stringify(P) : '') + start;
    const run = React.useMemo(() => { if (!P) return null; const X0 = finalX(P, start); return { X0, its: stone(P, X0) }; }, [key]);
    const plan = []; if (run) { plan.push({ t: 'start' }); run.its.forEach((it, q) => { plan.push({ t: 'idx', q }); if (it.best) plan.push({ t: 'move', q }); }); }
    const [i, ctl] = useWalk(Math.max(1, plan.length), 3000, key);
    useEffect(() => setSel(null), [i, key]);
    const pick = j => { if (j === sets.length && !own) setTxt(toTxt(sets[k])); setK(j); };
    const head = html`<${Modes} list=${sets.map((s, j) => [j, SHORT[s.name]]).concat([[sets.length, 'Try your own']])} mode=${k} set=${pick} label="Data" />
      ${own && html`<div className="orv4-row"><label className="orv4-lbl" htmlFor="orv4-in-st">Each line: costs | supply. Last line: demands.</label>
        <textarea id="orv4-in-st" className="orv4-in" rows=${Math.min(7, txt.split('\n').length + 1)} value=${txt} onInput=${e => setTxt(e.target.value)} spellCheck="false" autoCapitalize="off"></textarea></div>`}
      <${Modes} list=${[['nwc', 'Start: NWC'], ['lcm', 'Start: least cost'], ['vam', 'Start: VAM']]} mode=${start} set=${setStart} label="Starting solution" />`;
    if (!P) return html`<figure className="fig orv4"><div className="fig-stage">${head}<p className="orv4-err">${got.err.en}</p></div><${Cap} en=${got.err.en} ar=${got.err.ar} showAr=${ar} /></figure>`;
    const p = plan[i], it = p.t === 'start' ? run.its[0] : run.its[p.q], m = P.rows.length, n = P.cols.length;
    const cn = c => nm(P, c.r, c.c), path = L0 => L0.map(c => `(${P.rows[c.r]},${P.cols[c.c]})${c.sg > 0 ? '+' : '−'}`).join(' → ');
    const ex = e => e.L.map((c, q) => (q ? (c.sg > 0 ? ' + ' : ' − ') : '') + P.c[c.r][c.c]).join('') + ' = ' + (e.v < 0 ? '−' + -e.v : e.v);
    let X = it.X, loop = null, idx = null, cur = null, cap;
    if (p.t === 'start') cap = { en: `Start from the ${MNAME[start].toLowerCase()} solution of the ${P.name}: Z = <b>${money(it.z)}</b>, with m + n − 1 = ${m + n - 1} occupied cells.${dumEn(P)} Next: an improvement index for every empty cell.`,
      ar: `بنبدأ من حل الـ ${MNAME[start]} لـ ${SETAR[P.name]} والتكلفة` + L(`Z = ${money(it.z)}`) + `وفيه خانات مليانة عددها ${b(m + n - 1)} يعني ${b('m&nbsp;+&nbsp;n&nbsp;−&nbsp;1')}.${dumAr(P)} اللي جاي: improvement index لكل خانة فاضية.` };
    else if (p.t === 'idx') {
      idx = it.idx; const list = it.idx.map(e => `${cn(e)} = ${e.v < 0 ? '−' + -e.v : e.v}`).join(', ');
      if (it.best) { const e = it.best, mins = e.L.filter(c => c.sg < 0); loop = e.L; cur = [e.r, e.c];
        const th = `θ = min(${mins.map(c => it.X[c.r][c.c]).join(', ')}) = ${it.th}`;
        cap = { en: `Improvement indices of the empty cells: ${list}. Most negative: <b>${cn(e)}</b>. Path ${path(e.L)}: ${ex(e)}. ${th}, the smallest allocation on a − cell. Tap any empty cell to see its own path.`,
          ar: 'الـ improvement indices للخانات الفاضية:' + L(list) + `أكتر واحد سالب هو ${b(cn(e))}، ومساره وحسابه:` + L(path(e.L)) + L(ex(e)) + 'والـ θ هي أصغر allocation في خانات الـ −:' + L(th) + 'دوس على أي خانة فاضية عشان تشوف المسار بتاعها.' };
      } else cap = { en: `Improvement indices: ${list}. All are ≥ 0, so the solution is <b>optimal</b> (minimization): Z = <b>${money(it.z)}</b>. Tap any empty cell to see its path.`,
        ar: 'الـ improvement indices:' + L(list) + `كلهم أكبر من أو يساوي صفر، يعني الحل <b>optimal</b> (في الـ minimization) والتكلفة` + L(`Z = ${money(it.z)}`) + 'دوس على أي خانة فاضية عشان تشوف المسار بتاعها.' };
    } else {
      const e = it.best; X = it.Y; cur = [e.r, e.c];
      const zl = `Z = ${fmt(it.z)} + (${e.v} × ${it.th}) = ${money(it.z2)}`;
      cap = { en: `Move θ = ${it.th} around the path of ${cn(e)}: + cells gain ${it.th}, − cells lose ${it.th}; ${cn(it.leave)} drops to 0 and leaves. New cost = old cost + index × θ: ${zl}.`,
        ar: `انقل ${b('θ&nbsp;=&nbsp;' + it.th)} على مسار ${b(cn(e))}: خانات الـ + بتزيد وخانات الـ − بتقل، والخانة ${b(cn(it.leave))} بتوصل صفر وبتخرج. التكلفة الجديدة هي القديمة زائد الـ index في θ:` + L(zl) };
    }
    if (sel && idx) { const e = idx.find(x => x.r === sel[0] && x.c === sel[1]); if (e) { loop = e.L; cur = null;
      cap = { en: `<b>${cn(e)}</b>: path ${path(e.L)}. Index = ${ex(e)}${e.v < 0 ? ': negative, moving units here lowers the cost.' : ': ≥ 0, moving units here would not lower the cost.'}`,
        ar: `الخانة ${b(cn(e))} مسارها وحسابها:` + L(path(e.L)) + L(ex(e)) + (e.v < 0 ? 'سالب، يعني نقل وحدات هنا بيقلل التكلفة.' : 'مش سالب، يعني نقل وحدات هنا مش هيقلل التكلفة.') }; } }
    const tap = p.t === 'idx' ? (r, c) => { if (it.X[r][c] == null) setSel(sel && sel[0] === r && sel[1] === c ? null : [r, c]); } : null;
    return html`<figure className="fig orv4"><div className="fig-stage">${head}
      <${Tab} P=${P} X=${X} idx=${idx} loop=${loop} closed=${true} cur=${cur} sel=${sel} onCell=${tap} title=${'Stepping stone on ' + P.name} />
      <p className="orv4-z">${p.t === 'move' ? html`New Z <b>${money(it.z2)}</b>` : html`Z <b>${money(it.z)}</b>`}${p.t === 'idx' && !it.best ? ' · optimal' : ''}</p></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${plan} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [9] the three starting methods side by side, and the optimum ── */
  function Compare({ ar }) {
    const sets = [REV, LEC, VAMX, FIN];
    const [k, setK] = useState(0), [txt, setTxt] = useState(toTxt(REV));
    const own = k === sets.length, got = own ? parse(txt) : { P: sets[k] }, P = got.P;
    const pick = j => { if (j === sets.length && !own) setTxt(toTxt(sets[k])); setK(j); };
    const head = html`<${Modes} list=${sets.map((s, j) => [j, SHORT[s.name]]).concat([[sets.length, 'Try your own']])} mode=${k} set=${pick} label="Data" />
      ${own && html`<div className="orv4-row"><label className="orv4-lbl" htmlFor="orv4-in-cp">Each line: costs | supply. Last line: demands.</label>
        <textarea id="orv4-in-cp" className="orv4-in" rows=${Math.min(7, txt.split('\n').length + 1)} value=${txt} onInput=${e => setTxt(e.target.value)} spellCheck="false" autoCapitalize="off"></textarea></div>`}`;
    if (!P) return html`<figure className="fig orv4"><div className="fig-stage">${head}<p className="orv4-err">${got.err.en}</p></div><${Cap} en=${got.err.en} ar=${got.err.ar} showAr=${ar} /></figure>`;
    const z = ['nwc', 'lcm', 'vam'].map(q => cost(P, finalX(P, q))), its = stone(P, finalX(P, 'vam')), opt = its[its.length - 1].z, top = Math.max(...z, opt);
    const rows = [['Northwest corner', z[0]], ['Least cost', z[1]], ['Vogel (VAM)', z[2]], ['Optimal (stepping stone)', opt]];
    const hit = ['NWC', 'least cost', 'VAM'].filter((_, q) => z[q] === opt), hitA = ['الـ NWC', 'الـ least cost', 'الـ VAM'].filter((_, q) => z[q] === opt);
    const line = `NWC ${money(z[0])}, LCM ${money(z[1])}, VAM ${money(z[2])}, optimal ${money(opt)}`;
    const cap = { en: `${P.name}${dumEn(P)}: NWC ${money(z[0])}, least cost ${money(z[1])}, VAM ${money(z[2])}. Stepping stone from any start ends at the optimum ${money(opt)}. ${hit.length ? hit.join(' and ') + (hit.length > 1 ? ' already reach' : ' already reaches') + ' it here.' : 'None of the three starts is optimal here.'} NWC ignores costs, so it is usually the most expensive start.`,
      ar: `البيانات: ${SETAR[P.name]}.${dumAr(P)} التكلفة بكل طريقة، والـ optimum اللي الـ stepping stone بيوصله من أي بداية:` + L(line) + (hitA.length ? `هنا ${hitA.join(' و ')} ${hitA.length > 1 ? 'وصلوا' : 'وصل'} للـ optimum على طول.` : 'هنا ولا طريقة من التلاتة وصلت للـ optimum على طول.') + ' الـ NWC بيتجاهل التكاليف، فغالبًا بيبقى أغلى بداية.' };
    return html`<figure className="fig orv4"><div className="fig-stage">${head}
      <div className="orv4-bars">${rows.map(([t, v], q) => html`<div key=${q}><div className="orv4-name"><span>${t}</span><b>${money(v)}</b></div>
        <div className="orv4-track"><div className=${'orv4-fill' + (v === opt ? ' orv4-opt' : '')} style=${{ width: (100 * v / top) + '%' }}></div></div></div>`)}</div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'or-tp-network': Network, 'or-tp-balance': Balance, 'or-tp-nwc': Nwc, 'or-tp-lcm': Lcm, 'or-tp-vam': Vam, 'or-tp-loop': Loop, 'or-tp-stone': Stone, 'or-tp-compare': Compare });
})();
/* ── part L1 ── */
// Operations Research visuals, Lecture 1 (Introduction & Formulation of Linear Programming): the definition trap, optimization problem ⊃ mathematical program ⊃ LPP, the general form (slide 8), the key terms on Example 1, the key-word sorter, Example 1 formulated step by step (slides 11-12), a formulation workbench for Examples 2-5, Q1, Q2 and the exam problems, a plan checker for Q1/Q2, and the hidden constraints of Universal Mines / Recreational Motors. Every label and number comes from the site's notes.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.orv1{ --fig-k:var(--k-os); --fig-s:var(--s-os); }
.orv1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.orv1 .fig-btn.orv1-sel{ border-color:var(--k-os); box-shadow:0 0 0 1px var(--k-os); background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.orv1 .fig-cap .ltr{ font-family:var(--body); font-size:.92rem; margin:4px 0; overflow-wrap:anywhere; }
.orv1-wrap{ max-width:560px; margin:0 auto; color:var(--ink); }
.orv1-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 auto 10px; }
.orv1-row .fig-btn{ font-size:.86rem; padding:4px 10px; }
.orv1-muted{ color:var(--graphite); font-size:.86rem; line-height:1.4; }
.orv1-h{ font-size:.8rem; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:var(--k-os); margin:10px 0 4px; }
.orv1-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px 12px; }
.orv1-math{ font-family:var(--body); font-variant-numeric:tabular-nums; font-size:.98rem; line-height:1.55; direction:ltr; text-align:left; }
.orv1-math > div{ padding:1px 6px; border-radius:6px; transition:background .4s, box-shadow .4s, opacity .4s; }
.orv1-ln.on{ background:color-mix(in srgb, var(--k-os) 20%, var(--paper)); box-shadow:0 0 0 1.5px var(--k-os); }
.orv1-ln.dim{ opacity:.35; }
.orv1-ln.hid{ background:color-mix(in srgb, var(--pen) 12%, var(--paper)); box-shadow:0 0 0 1.5px var(--pen); }
.orv1-st{ display:inline-block; width:2.4em; font-weight:600; }
.orv1-tag{ font-family:var(--body); font-size:.78rem; color:var(--graphite); margin-left:6px; }
.orv1-k{ color:var(--k-os); font-weight:700; }
.orv1-ok{ color:var(--ok); font-weight:700; } .orv1-no{ color:var(--pen); font-weight:700; }
/* definition trap */
.orv1-def{ font-size:1rem; line-height:1.55; text-align:left; direction:ltr; }
.orv1-slot{ display:inline-block; min-width:9em; border-bottom:2px dashed var(--k-os); font-weight:700; color:var(--k-os); padding:0 4px; }
.orv1-slot.t{ color:var(--ok); border-color:var(--ok); } .orv1-slot.f{ color:var(--pen); border-color:var(--pen); text-decoration:line-through; }
.orv1-verdict{ text-align:center; font-weight:700; font-size:1.05rem; margin-top:8px; }
/* nested family */
.orv1-nest{ border:2px solid var(--line); border-radius:12px; padding:8px; background:var(--paper); transition:border-color .4s, opacity .5s; }
.orv1-nest.on{ border-color:var(--k-os); }
.orv1-nest > b{ display:block; font-size:.9rem; margin-bottom:4px; color:var(--k-os); }
.orv1-nest .orv1-muted{ margin-bottom:6px; }
.orv1-nest .orv1-nest{ background:var(--paper-2); }
.orv1-words{ display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px; }
.orv1-words div{ border:1px solid var(--line); border-radius:10px; padding:8px; background:var(--paper); font-size:.88rem; line-height:1.35; }
.orv1-words b{ display:block; color:var(--k-os); }
@media (max-width:420px){ .orv1-words{ grid-template-columns:1fr; } }
/* general form */
.orv1-gf{ display:grid; gap:6px; }
.orv1-gf .lab{ font-family:var(--body); font-weight:700; font-size:.9rem; color:var(--graphite); }
.orv1-gf .orv1-ln{ display:flex; flex-wrap:wrap; gap:2px 8px; align-items:baseline; }
.orv1-rel{ font-family:var(--body); font-size:.85rem; color:var(--k-os); font-weight:700; white-space:nowrap; }
.orv1-dots{ padding-left:20px; color:var(--graphite); }
/* tables */
.orv1-tab{ width:100%; border-collapse:collapse; table-layout:fixed; font-family:var(--body); font-variant-numeric:tabular-nums; font-size:.92rem; direction:ltr; }
.orv1-tab th, .orv1-tab td{ border:1px solid var(--line); padding:4px 3px; text-align:center; overflow-wrap:anywhere; }
.orv1-tab th{ font-family:var(--body); font-size:.74rem; padding:4px 1px; overflow-wrap:normal; word-break:normal; hyphens:auto; line-height:1.2; background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); color:var(--ink); }
.orv1-tab td{ background:var(--paper); transition:background .4s; }
.orv1-tab td.rh{ font-family:var(--body); font-size:.8rem; font-weight:700; background:color-mix(in srgb, var(--k-os) 8%, var(--paper)); }
.orv1-tab td.new{ background:color-mix(in srgb, var(--k-os) 26%, var(--paper)); }
.orv1-tab td.bl{ color:transparent; }
.orv1-tab input{ width:100%; box-sizing:border-box; font:inherit; text-align:center; padding:4px 1px; border:1px solid var(--line); border-radius:5px; background:var(--paper-2); color:var(--ink); min-width:0; }
.orv1-tab input:focus{ outline:2px solid var(--k-os); outline-offset:0; }
.orv1-tab input.bad{ border-color:var(--pen); box-shadow:0 0 0 1px var(--pen); }
.orv1-tab .orv1-cyc{ font:inherit; font-weight:700; width:100%; padding:4px 0; border-radius:5px; border:1px solid var(--k-os); background:var(--paper); color:var(--k-os); cursor:pointer; }
/* problem text */
.orv1-prob{ font-size:.92rem; line-height:1.5; text-align:left; direction:ltr; }
.orv1-prob span.s{ border-radius:4px; transition:background .4s, box-shadow .4s; }
.orv1-prob span.s.on{ background:color-mix(in srgb, var(--k-os) 28%, var(--paper)); box-shadow:0 0 0 1.5px var(--k-os); }
.orv1-prob span.s.was{ text-decoration:underline; text-decoration-color:var(--k-os); text-underline-offset:3px; }
.orv1-steps4{ display:grid; grid-template-columns:repeat(4, 1fr); gap:4px; margin:10px 0 6px; }
.orv1-steps4 div{ text-align:center; font-size:.8rem; font-weight:700; padding:5px 2px; border-radius:8px; border:1px solid var(--line); background:var(--paper); opacity:.45; transition:opacity .4s, background .4s; }
.orv1-steps4 div.on{ opacity:1; background:color-mix(in srgb, var(--k-os) 20%, var(--paper)); border-color:var(--k-os); }
.orv1-steps4 div.done{ opacity:.85; }
/* keywords */
.orv1-phrase{ font-size:1rem; line-height:1.5; text-align:left; direction:ltr; min-height:3em; }
.orv1-phrase .kw{ border-radius:4px; padding:0 2px; }
.orv1-phrase.shown .kw{ background:color-mix(in srgb, var(--k-os) 30%, var(--paper)); box-shadow:0 0 0 1.5px var(--k-os); font-weight:700; }
.orv1-src{ font-size:.8rem; color:var(--graphite); margin-bottom:4px; }
.orv1-pick{ display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin:10px 0 6px; }
.orv1-pick button{ font:700 1.05rem var(--mono); padding:8px 0; border-radius:10px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; min-height:40px; }
.orv1-pick button.good{ box-shadow:0 0 0 2px var(--ok); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.orv1-pick button.bad{ box-shadow:0 0 0 2px var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.orv1-pick button:disabled{ cursor:default; }
.orv1-legend{ display:grid; gap:4px; margin-top:8px; font-size:.84rem; line-height:1.35; direction:ltr; text-align:left; }
.orv1-legend div{ border:1px solid var(--line); border-radius:8px; padding:4px 8px; background:var(--paper); opacity:.6; transition:opacity .3s, box-shadow .3s; }
.orv1-legend div.on{ opacity:1; box-shadow:0 0 0 2px var(--k-os); }
.orv1-legend b{ font-family:var(--mono); color:var(--k-os); }
.orv1-score{ display:flex; justify-content:space-between; align-items:center; font-size:.86rem; color:var(--graphite); }
/* builder / checker */
.orv1-vars{ font-family:var(--body); font-size:.9rem; line-height:1.5; direction:ltr; text-align:left; }
.orv1-vars span{ font-family:var(--body); }
.orv1-mini{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:8px; }
.orv1-mini .fig-btn{ font-size:.82rem; padding:3px 9px; min-height:30px; }
.orv1-in{ display:flex; flex-wrap:wrap; gap:8px 14px; justify-content:center; align-items:center; margin:4px 0 10px; font-family:var(--body); font-size:1rem; direction:ltr; }
.orv1-in label{ display:flex; gap:6px; align-items:center; }
.orv1-in input{ width:5.2em; font:inherit; padding:5px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); text-align:center; }
.orv1-in input:focus{ outline:2px solid var(--k-os); outline-offset:1px; }
.orv1-in input.bad{ border-color:var(--pen); }
.orv1-con{ margin:8px 0; }
.orv1-con .top{ display:flex; justify-content:space-between; gap:8px; flex-wrap:wrap; font-family:var(--body); font-size:.9rem; direction:ltr; }
.orv1-meter{ position:relative; height:12px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin-top:4px; }
.orv1-meter i{ position:absolute; left:0; top:0; bottom:0; background:var(--k-os); transition:width .5s ease; }
.orv1-meter i.over{ background:var(--pen); }
.orv1-meter s{ position:absolute; top:-2px; bottom:-2px; width:2px; background:var(--ink); }
.orv1-z{ text-align:center; font:700 1.1rem var(--body); margin-top:8px; direction:ltr; }
/* hidden constraints */
.orv1-sl{ display:grid; grid-template-columns:auto 1fr 2.4em; gap:6px 8px; align-items:center; font-family:var(--body); font-size:.95rem; direction:ltr; }
.orv1-sl input{ width:100%; accent-color:var(--k-os); min-width:0; }
.orv1-sl b{ text-align:right; }
.orv1-need{ display:grid; gap:4px; margin-top:8px; font-size:.92rem; font-family:var(--body); direction:ltr; text-align:left; }
@media (prefers-reduced-motion: reduce){ .orv1 *{ transition:none !important; } }
`;
  if (!document.getElementById('orv1-css')) { const s = document.createElement('style'); s.id = 'orv1-css'; s.textContent = CSS; document.head.appendChild(s); }

  const SUB = ['₁', '₂', '₃'];
  const X = k => 'x' + SUB[k];
  const num = s => { const t = String(s).trim().replace('−', '-'); if (!/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN; return parseFloat(t); };
  // a linear expression written the way the notes write it: "x₁ + 2x₂", "1.0x₁ + 1.5x₂"
  const lin = cs => { let out = ''; cs.forEach((c, k) => { const v = num(c); if (!(v === v) || v === 0) return; const neg = v < 0, abs = String(c).trim().replace(/^[-−]/, ''); const co = abs === '1' ? '' : abs;
    out += (out ? (neg ? ' − ' : ' + ') : (neg ? '−' : '')) + co + X(k); }); return out || '0'; };
  const st = t => { const m = /^(S\.T\. |     )([\s\S]*)$/.exec(t); return m ? html`<span className="orv1-st">${m[1].trim()}</span>${m[2]}` : t; };
  const fmt = v => Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2);
  const vlist = n => Array.from({ length: n }, (_, k) => X(k)).join(', ');

  /* ── [0.2]-[0.3]: the exam definition, and the trap that swaps its subject ── */
  function DefTrap({ ar }) {
    const S = [
      { k: 'Operations research', ok: true, en: '<b>True.</b> This is the exam definition of <b>operations research</b>, and only operations research owns this sentence.', ar: '<b>صح.</b> ده تعريف الامتحان بتاع الـ <b>operations research</b>، والجملة دي بتاعته هو بس.' },
      { k: 'Linear programming', ok: false, en: '<b>False.</b> Linear programming is maximizing or minimizing a function subject to restrictions (constraints). The sentence belongs to operations research.', ar: '<b>غلط.</b> الـ Linear programming معناه إننا نعمل maximize أو minimize لـ function تحت قيود (constraints). والجملة دي بتاعة الـ operations research.' },
      { k: 'Formulation problem', ok: false, en: '<b>False.</b> Formulation is translating the real-world problem into the form of mathematical equations which could be solved. The sentence belongs to operations research.', ar: '<b>غلط.</b> الـ Formulation معناها إننا نترجم المسألة الحقيقية لـ mathematical equations ممكن تتحل. والجملة دي بتاعة الـ operations research.' },
      { k: 'Dynamic programming', ok: false, en: '<b>False.</b> Exam T/F questions swap the definition onto dynamic programming as a trap: only operations research owns this sentence.', ar: '<b>غلط.</b> أسئلة الـ <bdi dir="ltr">T/F</bdi> بتلزق التعريف على الـ dynamic programming كفخ، والجملة دي بتاعة الـ operations research بس.' }
    ];
    const [p, setP] = useState(null);
    const s = p == null ? null : S[p];
    const cap = s || { en: 'Exam T/F statements keep this sentence and swap its subject. Pick a subject: is the statement true or false?', ar: 'أسئلة الـ <bdi dir="ltr">T/F</bdi> في الامتحان بتسيب الجملة زي ما هي وتغيّر أولها بس. اختار البداية، وشوف الجملة صح ولا غلط.' };
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-box orv1-def"><span className=${'orv1-slot' + (s ? (s.ok ? ' t' : ' f') : '')}>${s ? s.k : '............'}</span> is concerned with scientifically deciding how to best design and operate man-machine systems, usually requiring the allocation of scarce resources.</div>
      <div className="orv1-row" style=${{ marginTop: '10px' }}>${S.map((x, k) => html`<button key=${k} className=${'fig-btn' + (p === k ? ' orv1-sel' : '')} aria-pressed=${String(p === k)} onClick=${() => setP(k)}>${x.k}</button>`)}</div>
      ${s && html`<div className=${'orv1-verdict ' + (s.ok ? 'orv1-ok' : 'orv1-no')}>${s.ok ? '✓ True' : '✗ False'}</div>`}
      </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [1.1]-[1.4]: optimization problem ⊃ mathematical program ⊃ LPP, and the words "linear" / "programming" ── */
  function ModelFamily({ ar }) {
    const steps = [
      { en: 'An <b>optimization problem</b>: maximize or minimize one quantity, the <b>objective</b>, which depends on a finite number of input (decision) variables. The variables may be independent or related through one or more constraints.', ar: 'الـ <b>optimization problem</b>: بنعمل max أو min لكمية واحدة اسمها الـ <b>objective</b>، وهي بتعتمد على عدد محدود من الـ input (decision) variables. والـ variables دي ممكن تبقى مستقلة أو مربوطة ببعض بـ constraint أو أكتر.' },
      { en: 'Inside it, a <b>mathematical program</b>: an optimization problem whose objective and constraints are given as mathematical functions and functional relationships.', ar: 'وجواه الـ <b>mathematical program</b>، وده optimization problem الـ objective والـ constraints فيه مكتوبين كـ mathematical functions وعلاقات رياضية.' },
      { en: 'Inside that, the <b>linear programming problem (LPP)</b>: the optimal value (max or min) of a <b>linear</b> objective function, with the variables non-negative and satisfying a set of linear inequalities (linear constraints). Example 1 is one.', ar: 'وجواه الـ <b>linear programming problem (LPP)</b>: بنلاقي الـ optimal value (max أو min) لـ objective function <b>linear</b>، بشرط إن الـ variables تبقى non-negative وتحقق مجموعة linear inequalities. والـ Example 1 مثال عليه.' },
      { en: '<b>Linear</b>: all mathematical relations used in the problem are linear. <b>Programming</b>: the method of determining a particular program or plan of action.', ar: 'كلمة <b>linear</b> معناها إن كل العلاقات الرياضية في المسألة linear. وكلمة <b>programming</b> معناها طريقة تحديد program أو خطة عمل (plan of action) معينة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-nest on"><b>Optimization problem</b>
        <div className="orv1-muted">max or min the objective · finite number of decision variables · maybe constraints</div>
        <div className=${'orv1-nest ' + (i >= 1 ? 'on ' : '') + pop(i >= 1)}><b>Mathematical program</b>
          <div className="orv1-muted">objective and constraints are mathematical functions</div>
          <div className=${'orv1-nest ' + (i >= 2 ? 'on ' : '') + pop(i >= 2)}><b>Linear programming problem (LPP)</b>
            <div className="orv1-math">
              <div className=${'orv1-ln' + (i === 3 ? ' on' : '')}>Max Z = 200x₁ + 175x₂${i >= 3 && html`<span className="orv1-tag">linear</span>`}</div>
              <div className=${'orv1-ln' + (i === 3 ? ' on' : '')}>10x₁ + 22x₂ ≤ 2640${i >= 3 && html`<span className="orv1-tag">linear</span>`}</div>
              <div className=${'orv1-ln' + (i === 3 ? ' on' : '')}>15x₁ + 18x₂ ≤ 2500${i >= 3 && html`<span className="orv1-tag">linear</span>`}</div>
              <div className="orv1-ln">x₁, x₂ ≥ 0<span className="orv1-tag">non-negative</span></div>
            </div>
            <div className="orv1-muted" style=${{ marginTop: '4px' }}>Example 1</div>
          </div>
        </div>
      </div>
      <div className=${'orv1-words ' + pop(i >= 3)}><div><b>Linear</b>all relations in the problem are linear</div><div><b>Programming</b>the method of determining a program or plan of action</div></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2] slide 8: the general form, built part by part, then Example 1 in the same form ── */
  function ModelGeneral({ ar }) {
    const steps = [
      { en: '<b>Optimize</b> (max or min) the objective, a function of the n decision variables: <b>Z = f(x₁, x₂, …, xₙ)</b>.', ar: 'أولاً بنعمل <b>Optimize</b> (max أو min) للـ objective، وهو function في الـ n decision variables:<span class="ltr">Z = f(x₁, x₂, …, xₙ)</span>' },
      { en: '<b>Subject to</b> m constraints g₁ … gₘ: each one is ≤, = or ≥ its number b₁ … bₘ.', ar: 'وبعدين <b>Subject to</b> عدد m من الـ constraints، وكل واحدة فيهم بالشكل ده:<span class="ltr">g(x₁, …, xₙ)  (≤ or = or ≥)  b</span>' },
      { en: '<b>Non-negativity:</b> x₁, x₂, …, xₙ ≥ 0.', ar: 'وآخر حاجة الـ <b>non-negativity</b>، يعني كل الـ decision variables أكبر من أو تساوي صفر:<span class="ltr">x₁, x₂, …, xₙ ≥ 0</span>' },
      { en: 'Example 1 in this form: n = 2 variables, m = 2 constraints, the objective is Max and both constraints are ≤.', ar: 'الـ Example 1 بالشكل ده فيه <bdi dir="ltr">n&nbsp;=&nbsp;2</bdi> variables و<bdi dir="ltr">m&nbsp;=&nbsp;2</bdi> constraints، والـ objective هنا Max، والـ constraints الاتنين <bdi dir="ltr">≤</bdi>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const cls = k => 'orv1-ln ' + (i === k ? 'on ' : '') + pop(i >= k);
    const g = (n, b) => html`<div className=${cls(1)}><span>g${n}(x₁, …, xₙ)</span><span className="orv1-rel">≤ or = or ≥</span><span>b${n}</span></div>`;
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-box orv1-math orv1-gf">
        <div className="lab">Optimize (max or min):</div>
        <div className=${cls(0)}>Z = f(x₁, x₂, …, xₙ)</div>
        <div className=${'lab ' + pop(i >= 1)}>Subject to:</div>
        ${g('₁', 'b₁')}${g('₂', 'b₂')}<div className=${'orv1-dots ' + pop(i >= 1)}>⋮</div>${g('ₘ')}
        <div className=${'lab ' + pop(i >= 2)}>Non-negativity:</div>
        <div className=${cls(2)}>x₁, x₂, …, xₙ ≥ 0</div>
      </div>
      <div className=${pop(i >= 3)}>
        <div className="orv1-h">Example 1 (n = 2, m = 2)</div>
        <div className="orv1-box orv1-math">
          <div className="orv1-ln">Max Z = 200x₁ + 175x₂</div>
          <div className="orv1-ln">10x₁ + 22x₂ ≤ 2640<span className="orv1-tag">g₁ ≤ b₁</span></div>
          <div className="orv1-ln">15x₁ + 18x₂ ≤ 2500<span className="orv1-tag">g₂ ≤ b₂</span></div>
          <div className="orv1-ln">x₁, x₂ ≥ 0</div>
        </div>
      </div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3]: the key terms, tap one to see its part of Example 1 ── */
  function ModelTerms({ ar }) {
    const T = [
      { k: 'Formulation', on: ['prob', 'var', 'obj', 'con', 'nn'], en: '<b>Formulation of an LPP:</b> translating the real-world problem into the form of mathematical equations which could be solved. It usually requires a thorough understanding of the problem.', ar: 'الـ <b>Formulation of an LPP</b> معناها ترجمة المسألة الحقيقية لـ mathematical equations ممكن تتحل، وغالبًا محتاجة فهم كويس جدًا للمسألة.' },
      { k: 'Decision variables', on: ['var'], en: '<b>Decision variables:</b> the unknown quantities we decide on (x₁, x₂, ...). Here: the number of units of product A and of product B.', ar: 'الـ <b>Decision variables</b> هي الكميات المجهولة اللي بنقرر قيمتها، وهنا هي عدد الوحدات من المنتج A وعدد الوحدات من المنتج B.' },
      { k: 'Objective function', on: ['obj'], en: '<b>Objective function:</b> attempts to maximize profits or minimize losses based on a set of constraints and the relationship between one or more decision variables. Here: maximize the sales revenue.', ar: 'الـ <b>Objective function</b> بتحاول تكبّر الأرباح أو تقلل الخسارة، بناءً على الـ constraints والعلاقة بين الـ decision variables. وهنا بنكبّر الـ sales revenue.' },
      { k: 'Constraints', on: ['con'], en: '<b>Constraints:</b> the linear inequalities on the variables of the LPP (capacity, availability, resources, technology...). Here: the minutes available on M1 and M2.', ar: 'الـ <b>Constraints</b> هي الـ linear inequalities على الـ variables (الـ capacity والـ availability والـ resources والـ technology). وهنا هي الدقايق المتاحة على الماكينة M1 والماكينة M2.' },
      { k: 'Non-negativity restriction', on: ['nn'], en: '<b>Non-negativity restriction:</b> all decision variables must take on values equal to or greater than zero.', ar: 'الـ <b>Non-negativity restriction</b> معناها إن كل الـ decision variables لازم تاخد قيم أكبر من أو تساوي صفر.' }
    ];
    const [p, setP] = useState(null);
    const s = p == null ? null : T[p], c = k => 'orv1-ln' + (s ? (s.on.includes(k) ? ' on' : ' dim') : '');
    const cap = s || { en: 'Example 1 as a model. Tap a term to see which part of the model it names.', ar: 'الـ Example 1 كـ model. دوس على أي مصطلح وشوف هو أنهي جزء في الـ model.' };
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-row">${T.map((x, k) => html`<button key=${k} className=${'fig-btn' + (p === k ? ' orv1-sel' : '')} aria-pressed=${String(p === k)} onClick=${() => setP(k)}>${x.k}</button>`)}</div>
      <div className="orv1-box orv1-math">
        <div className=${c('prob')} style=${{ fontFamily: 'var(--body)', fontSize: '.86rem' }}>Example 1: A and B on two machines, maximize sales revenue</div>
        <div className=${c('var')}>x₁ = units of product A</div>
        <div className=${c('var')}>x₂ = units of product B</div>
        <div className=${c('obj')}>Max Z = 200x₁ + 175x₂</div>
        <div className=${c('con')}>${st('S.T. 10x₁ + 22x₂ ≤ 2640')}</div>
        <div className=${c('con')}>${st('     15x₁ + 18x₂ ≤ 2500')}</div>
        <div className=${c('nn')}>x₁, x₂ ≥ 0</div>
      </div></div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [4.4]-[4.5]: the key words, sort the lecture's own phrases ── */
  const KW = [
    { src: 'Example 1', pre: 'The products are ', kw: 'sold', post: ' for $200 and $175 respectively per unit.', a: 'Max', out: 'Max Z = 200x₁ + 175x₂' },
    { src: 'Example 1', pre: 'The machines are ', kw: 'available', post: ' for 2640 and 2500 minutes respectively per week.', a: '≤', out: '10x₁ + 22x₂ ≤ 2640' },
    { src: 'Example 2', pre: 'He has 40 hours to decorate the new items and ', kw: 'can use no more than', post: ' 22 grams of cake mix.', a: '≤', out: 'x₁ + 2x₂ ≤ 22' },
    { src: 'Example 4', pre: 'The ', kw: 'minimum needs', post: ' are 10 units of A, 15 units of B, and 30 units of C.', a: '≥', out: '2x₁ + 4x₂ ≥ 10' },
    { src: 'Example 4', pre: 'Fast Grow, ', kw: 'costing', post: ' $12 a bag … Easy Grow, costing $10 a bag.', a: 'Min', out: 'Min Z = 12x₁ + 10x₂' },
    { src: 'Example 3', pre: 'He ', kw: 'has', post: ' stocks of 12 units of P, and 10 units of R.', a: '≤', out: '2x₁ + 4x₂ ≤ 12' },
    { src: 'Example 5', pre: 'A diet is to contain ', kw: 'at least', post: ' 16 units of carbohydrates and 20 units of protein.', a: '≥', out: '2x₁ + 2x₂ ≥ 16' },
    { src: 'Example 3', pre: 'Standard quality paint … is sold at a ', kw: 'profit', post: ' of $1.0 per unit.', a: 'Max', out: 'Max Z = 1.0x₁ + 1.5x₂' },
    { src: 'Q1', pre: 'Formulate the linear programming problem to maximize sales ', kw: 'revenue', post: '.', a: 'Max', out: 'Max Z = 120x₁ + 80x₂' },
    { src: 'Universal Mines', pre: 'The mines ', kw: 'must deliver', post: ' 54 tons of high-grade ore by the end of the week.', a: '≥', out: '4x₁ + 6x₂ + x₃ ≥ 54' },
    { src: 'Recycling centers', pre: 'Center 1 ', kw: 'costs', post: ' $40 per day, Center 2 $50 per day.', a: 'Min', out: 'Min Z = 40x₁ + 50x₂' },
    { src: 'Universal Mines (hidden)', pre: 'x₁, x₂, x₃ = days each mine operates, and the delivery is for ', kw: 'one week', post: '.', a: '≤', out: 'x₁, x₂, x₃ ≤ 7', hid: 1 },
    { src: 'Recreational Motors (hidden)', pre: 'x₁, x₂, x₃ = days each plant operates to make the carts and snowmobiles ', kw: 'in September', post: '.', a: '≤', out: 'x₁, x₂, x₃ ≤ 30', hid: 1 }
  ];
  const LEG = [['Max', 'profit, sold, sales, revenue'], ['Min', 'cost'], ['≤', 'available, has, at most, no more than, can use (and hidden: days in a week ≤ 7, days in September ≤ 30)'], ['≥', 'at least, contains, minimum needs, must deliver']];
  function FormulateKeywords({ ar }) {
    const [q, setQ] = useState(0), [pick, setPick] = useState(null), [score, setScore] = useState(0);
    const done = q >= KW.length, it = done ? null : KW[q], ans = pick != null;
    const choose = c => { if (ans) return; setPick(c); if (c === it.a) setScore(s => s + 1); };
    const next = () => { setPick(null); setQ(x => x + 1); };
    const restart = () => { setPick(null); setQ(0); setScore(0); };
    const A = { 'Max': 'Max', 'Min': 'Min', '≤': '<bdi dir="ltr">≤</bdi>', '≥': '<bdi dir="ltr">≥</bdi>' };
    let cap;
    if (done) cap = { en: `Done: <b>${score} of ${KW.length}</b> right first time. Profit, sold, sales, revenue → Max; cost → Min; available, has, at most, no more than → ≤; at least, contains, minimum needs, must deliver → ≥.`, ar: `خلصت: جبت <b>${score} من ${KW.length}</b> صح من أول مرة. والقاعدة إن كلمات زي profit و sales و revenue معناها Max، وكلمة cost معناها Min، وكلمات زي available و at most معناها <bdi dir="ltr">≤</bdi>، وكلمات زي at least و minimum needs معناها <bdi dir="ltr">≥</bdi>.` };
    else if (!ans) cap = { en: 'Read the phrase from the lecture. Does it make the objective <b>Max</b> or <b>Min</b>, or a <b>≤</b> or <b>≥</b> constraint?', ar: 'اقرا الجملة اللي من المحاضرة. هل بتخلّي الـ objective يبقى <b>Max</b> ولا <b>Min</b>، ولا بتدّيك constraint نوعه <bdi dir="ltr">≤</bdi> ولا <bdi dir="ltr">≥</bdi>؟' };
    else if (it.hid) cap = { en: `${pick === it.a ? '<b>Right.</b>' : '<b>Not quite.</b>'} A hidden constraint: “${it.kw}” limits the days, so ≤. The model gets:<span class="ltr">${it.out}</span>`, ar: `الإجابة ${pick === it.a ? '<b>صح</b>' : '<b>غلط</b>'}. ده constraint مستخبي، الكلمة <bdi dir="ltr">“${it.kw}”</bdi> بتحدد عدد الأيام، فالـ constraint نوعه <bdi dir="ltr">≤</bdi>. والـ model بياخد:<span class="ltr">${it.out}</span>` };
    else cap = { en: `${pick === it.a ? '<b>Right.</b>' : '<b>Not quite.</b>'} “${it.kw}” → <b>${it.a}</b>. In ${it.src} this gives:<span class="ltr">${it.out}</span>`, ar: `الإجابة ${pick === it.a ? '<b>صح</b>' : '<b>غلط</b>'}. الكلمة <bdi dir="ltr">“${it.kw}”</bdi> معناها <b>${A[it.a]}</b>. وفي الـ ${it.src} بتدّينا:<span class="ltr">${it.out}</span>` };
    const leg = ans ? LEG.findIndex(l => l[0] === it.a) : -1;
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-score"><span>${done ? 'All phrases done' : `Phrase ${q + 1} of ${KW.length}`}</span><span>Right: <b>${score}</b></span></div>
      ${done ? html`<div className="orv1-box orv1-verdict">${score} / ${KW.length}</div>` : html`<div className="orv1-box">
        <div className="orv1-src">${it.src}</div>
        <div className=${'orv1-phrase' + (ans ? ' shown' : '')}>${it.pre}<span className="kw">${it.kw}</span>${it.post}</div></div>
        <div className="orv1-pick">${['Max', 'Min', '≤', '≥'].map(c => html`<button key=${c} disabled=${ans} className=${ans ? (c === it.a ? 'good' : c === pick ? 'bad' : '') : ''} onClick=${() => choose(c)}>${c}</button>`)}</div>`}
      <div className="orv1-legend">${LEG.map((l, k) => html`<div key=${k} className=${k === leg || done ? 'on' : ''}><b>${l[0]}</b> ← ${l[1]}</div>`)}</div>
      </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>
        ${ans && !done && html`<button className="fig-btn solid" onClick=${next}>${q === KW.length - 1 ? 'Finish' : 'Next phrase ›'}</button>`}
        <button className="fig-btn" onClick=${restart}>↻ Start again</button></div></figure>`;
  }

  /* ── [5] slides 11-12: Example 1 formulated with the 4 steps, words → table → model ── */
  function FormulateSteps({ ar }) {
    const steps = [
      { h: [], en: 'Example 1 as given. We follow the <b>4 steps</b>: the highlighted words become the model.', ar: 'الـ Example 1 زي ما هو. هنمشي على الـ <b>4 steps</b>، والكلمات اللي بتنوّر هي اللي بتتحول لـ model.' },
      { h: ['s1'], st: 0, en: '<b>Step I</b>: introduce the decision variables. x₁ = the number of units of product A, x₂ = the number of units of product B.', ar: 'الـ <b>Step I</b>: نعرّف الـ decision variables. الـ <bdi dir="ltr">x₁</bdi> هو عدد الوحدات من المنتج A، والـ <bdi dir="ltr">x₂</bdi> هو عدد الوحدات من المنتج B.' },
      { h: ['s2'], st: 1, en: '<b>Step II</b>: summarize in a table. Product A takes 10 minutes on M1 and 15 on M2: that is column A.', ar: 'الـ <b>Step II</b>: نلخّص البيانات في جدول. المنتج A بياخد 10 دقايق على الـ M1 و15 على الـ M2، ودول العمود A.' },
      { h: ['s3'], st: 1, en: 'Product B takes 22 and 18 minutes: column B.', ar: 'والمنتج B بياخد 22 و18 دقيقة، ودول العمود B.' },
      { h: ['s4'], st: 1, en: 'The machines are available for 2640 and 2500 minutes: the availability, in the last column.', ar: 'والماكينات متاحة 2640 و2500 دقيقة، ودول الـ Available في آخر عمود.' },
      { h: ['s5'], st: 1, en: 'Sold for $200 and $175 per unit: the price, in the last row.', ar: 'وبيتباعوا بـ <bdi dir="ltr">$200</bdi> و<bdi dir="ltr">$175</bdi> للوحدة، ودول الـ Price في آخر صف.' },
      { h: ['s6'], st: 2, en: '<b>Step III</b>: “maximize sales revenue” → <b>Max</b>. Multiply the price row by the variables:<span class="ltr">Max Z = 200x₁ + 175x₂</span>', ar: 'الـ <b>Step III</b>: كلمة revenue معناها <b>Max</b>، فنضرب صف الـ Price في الـ variables:<span class="ltr">Max Z = 200x₁ + 175x₂</span>' },
      { h: ['s2', 's3', 's4'], st: 3, en: '<b>Step IV</b>: each machine row is a constraint, and “available” → ≤. Machine M1:<span class="ltr">10x₁ + 22x₂ ≤ 2640</span>', ar: 'الـ <b>Step IV</b>: كل صف ماكينة بيبقى constraint، وكلمة available معناها <bdi dir="ltr">≤</bdi>. صف الماكينة M1:<span class="ltr">10x₁ + 22x₂ ≤ 2640</span>' },
      { h: ['s2', 's3', 's4'], st: 3, en: 'Machine M2:<span class="ltr">15x₁ + 18x₂ ≤ 2500</span>', ar: 'وصف الماكينة M2:<span class="ltr">15x₁ + 18x₂ ≤ 2500</span>' },
      { h: [], st: 3, en: 'Last, the non-negativity condition: all decision variables ≥ 0. The model is complete.<span class="ltr">x₁, x₂ ≥ 0</span>', ar: 'وآخر حاجة الـ non-negativity condition، وكده الـ model كمل:<span class="ltr">x₁, x₂ ≥ 0</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const s = steps[i], seen = new Set(steps.slice(1, i).flatMap(x => x.h));
    const S = (id, t) => html`<span className=${'s' + (s.h.includes(id) ? ' on' : seen.has(id) ? ' was' : '')}>${t}</span>`;
    const cell = (v, at) => html`<td className=${i < at ? 'bl' : i === at ? 'new' : ''}>${v}</td>`;
    const L = (at, t, tag) => html`<div className=${'orv1-ln ' + (i === at ? 'on ' : '') + pop(i >= at)}>${st(t)}${tag && html`<span className="orv1-tag">${tag}</span>`}</div>`;
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-box orv1-prob">A company makes ${S('s1', 'two products A and B')}; both require processing on 2 machines. ${S('s2', 'Product A takes 10 and 15 minutes')} on the two machines per unit and ${S('s3', 'product B takes 22 and 18 minutes')} per unit on the two machines. The machines are ${S('s4', 'available for 2640 and 2500 minutes')} respectively per week. The products are ${S('s5', 'sold for $200 and $175')} respectively per unit. Formulate the linear programming problem to ${S('s6', 'maximize sales revenue')}?</div>
      <div className="orv1-steps4">${['Step I', 'Step II', 'Step III', 'Step IV'].map((t, k) => html`<div key=${k} className=${s.st === k ? 'on' : s.st > k ? 'done' : ''}>${t}</div>`)}</div>
      <div className=${'orv1-vars ' + pop(i >= 1)}><div>x₁ <span>= units of product A</span></div><div>x₂ <span>= units of product B</span></div></div>
      <div className=${pop(i >= 2)} style=${{ marginTop: '8px' }}><table className="orv1-tab"><thead><tr><th></th><th>A</th><th>B</th><th>Available</th></tr></thead><tbody>
        <tr><td className="rh">M1</td>${cell(10, 2)}${cell(22, 3)}${cell(2640, 4)}</tr>
        <tr><td className="rh">M2</td>${cell(15, 2)}${cell(18, 3)}${cell(2500, 4)}</tr>
        <tr><td className="rh">Price</td>${cell(200, 5)}${cell(175, 5)}<td></td></tr></tbody></table></div>
      <div className="orv1-box orv1-math" style=${{ marginTop: '8px' }}>
        ${L(6, 'Max Z = 200x₁ + 175x₂', 'revenue')}
        ${L(7, 'S.T. 10x₁ + 22x₂ ≤ 2640', 'M1')}
        ${L(8, '     15x₁ + 18x₂ ≤ 2500', 'M2')}
        ${L(9, 'x₁, x₂ ≥ 0')}
      </div></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6]-[8]: formulation workbench, the lecture's examples or your own table → the model ── */
  const PRE = [
    { id: 'ex1', name: 'Example 1', note: 'A: 10 and 15 min, B: 22 and 18 min on M1, M2; 2640 and 2500 min available; sold for $200 and $175.', vars: ['units of product A', 'units of product B'], cols: ['A', 'B'], rows: [['M1', ['10', '22'], '≤', '2640'], ['M2', ['15', '18'], '≤', '2500']], obj: 'Max', c: ['200', '175'], last: 'Price',
      en: 'Revenue → <b>Max</b>; minutes available → <b>≤</b>.', ar: 'كلمة revenue معناها <b>Max</b>، والدقايق المتاحة (available) معناها <bdi dir="ltr">≤</bdi>.' },
    { id: 'ex2', name: 'Example 2', note: "Jay's pastry: 40 h, 22 g cake mix; personal cake 2 g, 2 h, $20; cupcake order 1 g, 4 h, $25.", vars: ['cupcake orders', 'personal cakes'], cols: ['Cupcakes', 'Personal cake'], rows: [['Cake mix', ['1', '2'], '≤', '22'], ['Hours', ['4', '2'], '≤', '40']], obj: 'Max', c: ['25', '20'], last: 'Profit',
      en: 'Sold for $25 and $20 → <b>Max</b>; “has 40 hours”, “no more than 22 grams” → <b>≤</b>. Mind the order: x₁ is the cupcakes.', ar: 'بيبيع بـ <bdi dir="ltr">$25</bdi> و<bdi dir="ltr">$20</bdi> فده <b>Max</b>، وكلمات زي has و no more than معناها <bdi dir="ltr">≤</bdi>. وخلي بالك من الترتيب، الـ <bdi dir="ltr">x₁</bdi> هنا هو الـ cupcakes.' },
    { id: 'ex3', name: 'Example 3', note: 'Paint: P 2 and 4, R 3 and 2 per unit; stocks P 12, R 10; profit $1.0 and $1.5.', vars: ['units of S-type (standard)', 'units of T-type (top quality)'], cols: ['S-type', 'T-type'], rows: [['Pigment P', ['2', '4'], '≤', '12'], ['Resin R', ['3', '2'], '≤', '10']], obj: 'Max', c: ['1.0', '1.5'], last: 'Profit',
      en: 'Profit → <b>Max</b>; “he has stocks of” → <b>≤</b>.', ar: 'كلمة profit معناها <b>Max</b>، وجملة has stocks معناها <bdi dir="ltr">≤</bdi>.' },
    { id: 'ex4', name: 'Example 4', note: 'Fertilizer: need at least 10 A, 15 B, 30 C; Fast Grow $12 a bag: 2, 1, 4; Easy Grow $10: 4, 3, 5.', vars: ['bags of Fast Grow', 'bags of Easy Grow'], cols: ['Fast Grow', 'Easy Grow'], rows: [['A', ['2', '4'], '≥', '10'], ['B', ['1', '3'], '≥', '15'], ['C', ['4', '5'], '≥', '30']], obj: 'Min', c: ['12', '10'], last: 'Cost',
      en: 'Costing $12 and $10 → <b>Min</b>; “minimum needs” → <b>≥</b>. Three nutrients give three constraints.', ar: 'كلمة costing معناها <b>Min</b>، وجملة minimum needs معناها <bdi dir="ltr">≥</bdi>. وعندنا 3 nutrients، فبيبقى عندنا 3 constraints.' },
    { id: 'ex5', name: 'Example 5', note: 'Diet: at least 16 carbs, 20 protein; food A 2 carbs, 4 protein, $1.20; food B 2, 1, $0.80.', vars: ['units of food A', 'units of food B'], cols: ['Food A', 'Food B'], rows: [['Carbs', ['2', '2'], '≥', '16'], ['Protein', ['4', '1'], '≥', '20']], obj: 'Min', c: ['1.20', '0.80'], last: 'Cost',
      en: 'Costs → <b>Min</b>; “contain at least” → <b>≥</b>.', ar: 'كلمة costs معناها <b>Min</b>، وجملة at least معناها <bdi dir="ltr">≥</bdi>.' },
    { id: 'q1', name: 'Q1', note: 'Furniture: 6 units of wood, 28 h; model I 2 wood, 7 h, $120; model II 1 wood, 8 h, $80.', vars: ['model I screens', 'model II screens'], cols: ['Model I', 'Model II'], rows: [['Wood', ['2', '1'], '≤', '6'], ['Hours', ['7', '8'], '≤', '28']], obj: 'Max', c: ['120', '80'], last: 'Price',
      en: 'Maximize sales revenue → <b>Max</b>; the wood and hours he has → <b>≤</b>.', ar: 'جملة maximize sales revenue معناها <b>Max</b>، والخشب والساعات اللي عنده معناها <bdi dir="ltr">≤</bdi>.' },
    { id: 'q2', name: 'Q2', note: 'Small manufacturer: A uses 1 R1, 3 R2; B uses 1 R1, 2 R2; 5 R1 and 12 R2 available; profit $6 and $5.', vars: ['units of A', 'units of B'], cols: ['A', 'B'], rows: [['R1', ['1', '1'], '≤', '5'], ['R2', ['3', '2'], '≤', '12']], obj: 'Max', c: ['6', '5'], last: 'Profit',
      en: 'Profit → <b>Max</b>; resources available → <b>≤</b>.', ar: 'كلمة profit معناها <b>Max</b>، والـ resources المتاحة معناها <bdi dir="ltr">≤</bdi>.' },
    { id: 'rec', name: 'Recycling', note: 'Recycling centers: Center 1 $40/day, 140 lb glass, 60 lb aluminum; Center 2 $50/day, 100, 180; need at least 1540 glass, 1440 aluminum.', vars: ['days Center 1 runs', 'days Center 2 runs'], cols: ['Center 1', 'Center 2'], rows: [['Glass', ['140', '100'], '≥', '1540'], ['Aluminum', ['60', '180'], '≥', '1440']], obj: 'Min', c: ['40', '50'], last: 'Cost',
      en: 'Cost per day → <b>Min</b>; “at least” → <b>≥</b>.', ar: 'التكلفة في اليوم معناها <b>Min</b>، وجملة at least معناها <bdi dir="ltr">≥</bdi>.' },
    { id: 'pet', name: 'Pet store', note: 'Hamster feed: at least 70 protein, 100 carbs; A 20/50 $2, B 30/30 $3, C 40/20 $5.', vars: ['units of feed A', 'units of feed B', 'units of feed C'], cols: ['A', 'B', 'C'], rows: [['Protein', ['20', '30', '40'], '≥', '70'], ['Carbs', ['50', '30', '20'], '≥', '100']], obj: 'Min', c: ['2', '3', '5'], last: 'Cost',
      en: 'Cost → <b>Min</b>; “at least” → <b>≥</b>. Three feeds give three variables.', ar: 'كلمة cost معناها <b>Min</b>، وجملة at least معناها <bdi dir="ltr">≥</bdi>. وعندنا 3 أنواع أكل، فبيبقى عندنا 3 variables.' }
  ];
  const copy = p => ({ ...p, cols: [...p.cols], vars: [...p.vars], c: [...p.c], rows: p.rows.map(r => [r[0], [...r[1]], r[2], r[3]]) });
  const OWN = { id: 'own', name: 'Your own', note: '', vars: ['product 1', 'product 2'], cols: ['P1', 'P2'], rows: [['R1', ['', ''], '≤', ''], ['R2', ['', ''], '≤', '']], obj: 'Max', c: ['', ''], last: 'Profit' };
  function FormulateBuilder({ ar }) {
    const [m, setM] = useState(() => copy(PRE[1])), [edited, setEdited] = useState(false);
    const load = p => { setM(copy(p)); setEdited(false); };
    const own = m.id === 'own' || edited, n = m.cols.length;
    const upd = f => { const x = copy(m); f(x); setM(x); if (m.id !== 'own') setEdited(true); };
    const cyc = r => ({ '≤': '≥', '≥': '=', '=': '≤' })[r];
    const inp = (v, set, lab) => html`<input type="text" inputMode="decimal" aria-label=${lab} value=${v} className=${v !== '' && !(num(v) === num(v)) ? 'bad' : ''} onChange=${e => set(e.target.value)} />`;
    const blank = !m.c.some(v => num(v)) && !m.rows.some(r => r[1].some(v => num(v)));
    const cap = blank ? { en: 'Your own problem: fill in the table (Step II). Each row is a resource with its amount per unit of each product, ≤ / ≥ / = and the amount available or needed; the last row is the profit or cost per unit. The model writes itself.', ar: 'مسألتك أنت: املا الجدول (الـ Step II). كل صف resource فيه الكمية اللي كل منتج بياخدها، ونوع الـ constraint، والمتاح أو المطلوب. وآخر صف هو الـ profit أو الـ cost للوحدة، والـ model بيتكتب لوحده.' }
      : own ? { en: 'Your numbers: each row becomes a constraint (row × variables, then ≤, ≥ or =, then the last column), and the last row × the variables becomes the objective. Tap ≤ to switch the sign, Max to switch to Min.', ar: 'دي أرقامك أنت. كل صف بيبقى constraint (الصف مضروب في الـ variables، وبعدين نوع الـ constraint، وبعدين آخر عمود)، وآخر صف مضروب في الـ variables بيبقى الـ objective. دوس على الـ sign عشان تغيّره، ودوس على Max عشان تقلبه Min.' }
      : { en: `<b>${m.name}</b>: ${m.en}`, ar: `الـ <b>${m.name}</b>. ${m.ar}` };
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-row">${PRE.map(p => html`<button key=${p.id} className=${'fig-btn' + (m.id === p.id && !edited ? ' orv1-sel' : '')} onClick=${() => load(p)}>${p.name}</button>`)}
        <button className=${'fig-btn' + (m.id === 'own' ? ' orv1-sel' : '')} onClick=${() => load(OWN)}>Try your own</button></div>
      ${!own && html`<div className="orv1-muted" style=${{ marginBottom: '6px' }}>${m.note}</div>`}
      <div className="orv1-h">Step I · variables</div>
      <div className="orv1-vars">${m.vars.map((v, k) => html`<div key=${k}>${X(k)} <span>= ${v}</span></div>`)}</div>
      <div className="orv1-h">Step II · table${own ? ' (your numbers)' : ''}</div>
      <table className="orv1-tab"><thead><tr><th style=${{ width: n === 3 ? '20%' : '24%' }}></th>${m.cols.map((c, k) => html`<th key=${k}>${c}<br />${X(k)}</th>`)}<th style=${{ width: '13%' }}></th><th style=${{ width: n === 3 ? '17%' : '20%' }}>Avail. / need</th></tr></thead><tbody>
        ${m.rows.map((r, j) => html`<tr key=${j}><td className="rh">${r[0]}</td>${r[1].map((v, k) => html`<td key=${k}>${inp(v, t => upd(x => { x.rows[j][1][k] = t; }), `${r[0]}, ${m.cols[k]}`)}</td>`)}
          <td><button className="orv1-cyc" aria-label="Change the sign" onClick=${() => upd(x => { x.rows[j][2] = cyc(r[2]); })}>${r[2]}</button></td>
          <td>${inp(r[3], t => upd(x => { x.rows[j][3] = t; }), `${r[0]} available or needed`)}</td></tr>`)}
        <tr><td className="rh">${m.last}</td>${m.c.map((v, k) => html`<td key=${k}>${inp(v, t => upd(x => { x.c[k] = t; }), `${m.last}, ${m.cols[k]}`)}</td>`)}
          <td colSpan="2"><button className="orv1-cyc" aria-label="Switch Max and Min" onClick=${() => upd(x => { x.obj = x.obj === 'Max' ? 'Min' : 'Max'; x.last = x.obj === 'Max' ? 'Profit' : 'Cost'; })}>${m.obj}</button></td></tr>
      </tbody></table>
      ${m.id === 'own' && html`<div className="orv1-mini">
        <button className="fig-btn" disabled=${n >= 3} onClick=${() => upd(x => { x.cols.push('P' + (n + 1)); x.vars.push('product ' + (n + 1)); x.c.push(''); x.rows.forEach(r => r[1].push('')); })}>+ variable</button>
        <button className="fig-btn" disabled=${n <= 2} onClick=${() => upd(x => { x.cols.pop(); x.vars.pop(); x.c.pop(); x.rows.forEach(r => r[1].pop()); })}>− variable</button>
        <button className="fig-btn" disabled=${m.rows.length >= 4} onClick=${() => upd(x => { x.rows.push(['R' + (x.rows.length + 1), x.cols.map(() => ''), '≤', '']); })}>+ constraint</button>
        <button className="fig-btn" disabled=${m.rows.length <= 1} onClick=${() => upd(x => { x.rows.pop(); })}>− constraint</button></div>`}
      <div className="orv1-h">Steps III and IV · the model</div>
      <div className="orv1-box orv1-math">
        <div className="orv1-ln">${m.obj} Z = ${lin(m.c)}</div>
        ${m.rows.map((r, j) => html`<div key=${j} className="orv1-ln"><span className="orv1-st">${j === 0 ? 'S.T.' : ''}</span>${lin(r[1])} ${r[2]} ${r[3].trim() === '' ? '?' : r[3].trim()}<span className="orv1-tag">${r[0]}</span></div>`)}
        <div className="orv1-ln">${vlist(n)} ≥ 0</div>
      </div></div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [7]: Q1 and Q2, check a plan against the model (the notes' optimum, or your own) ── */
  const QS = {
    q1: { name: 'Q1 Furniture', obj: [120, 80], objS: 'Max Z = 120x₁ + 80x₂', rows: [['wood', [2, 1], 6, '2x₁ + x₂ ≤ 6'], ['hours', [7, 8], 28, '7x₁ + 8x₂ ≤ 28']], best: ['20/9', '14/9'], bestZ: '391.11' },
    q2: { name: 'Q2 Small manufacturer', obj: [6, 5], objS: 'Max Z = 6x₁ + 5x₂', rows: [['R1', [1, 1], 5, 'x₁ + x₂ ≤ 5'], ['R2', [3, 2], 12, '3x₁ + 2x₂ ≤ 12']], best: ['2', '3'], bestZ: '27' }
  };
  const val = s => { const t = String(s).trim().replace('−', '-'); const f = t.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/); if (f) return +f[2] ? +f[1] / +f[2] : NaN; return num(t); };
  function ModelCheck({ ar }) {
    const [q, setQ] = useState('q1'), [a, setA] = useState(QS.q1.best[0]), [b, setB] = useState(QS.q1.best[1]);
    const Q = QS[q], x = [val(a), val(b)], okIn = x.every(v => v === v);
    const go = k => { setQ(k); setA(QS[k].best[0]); setB(QS[k].best[1]); };
    const isBest = a.replace(/\s/g, '') === Q.best[0] && b.replace(/\s/g, '') === Q.best[1];
    const rs = okIn ? Q.rows.map(([nm, co, rhs, s]) => { const l = co[0] * x[0] + co[1] * x[1]; return { nm, rhs, s, l, ok: l <= rhs + 1e-9, tight: Math.abs(l - rhs) < 1e-9 }; }) : [];
    const nn = okIn && x[0] >= 0 && x[1] >= 0, feas = okIn && nn && rs.every(r => r.ok), Z = okIn ? Q.obj[0] * x[0] + Q.obj[1] * x[1] : NaN;
    const bad = rs.find(r => !r.ok);
    let cap;
    if (!okIn) cap = { en: 'Type a number for x₁ and x₂ (a fraction like 20/9 works too).', ar: 'اكتب رقم للـ <bdi dir="ltr">x₁</bdi> وللـ <bdi dir="ltr">x₂</bdi>، وينفع كسر زي <bdi dir="ltr">20/9</bdi>.' };
    else if (!nn) cap = { en: 'Not feasible: the non-negativity condition fails (a variable is below 0).', ar: 'الـ plan ده مش feasible، لأن الـ non-negativity condition مش متحققة (فيه variable أقل من صفر).' };
    else if (bad) cap = { en: `Not feasible: the ${bad.nm} constraint needs ${fmt(bad.l)} but only ${bad.rhs} is available.`, ar: `الـ plan ده مش feasible، لأن الـ constraint بتاع الـ ${bad.nm} محتاج أكتر من المتاح:<span class="ltr">${fmt(bad.l)} > ${bad.rhs}</span>` };
    else if (isBest) cap = { en: `The notes' optimum: x₁ = ${Q.best[0]}${q === 'q1' ? ' ≈ 2.22' : ''}, x₂ = ${Q.best[1]}${q === 'q1' ? ' ≈ 1.56' : ''}. Both constraints hold with equality (every resource used up) and Z = ${Q.bestZ}. Finding this point is the graphical method of Lecture 2.`, ar: `ده الـ optimum اللي في الملاحظات، والـ constraints الاتنين متحققين بالظبط (كل الـ resources اتستخدمت كلها)، والقيمة:<span class="ltr">x₁ = ${Q.best[0]}, x₂ = ${Q.best[1]}, Z = ${Q.bestZ}</span>وإزاي نوصل للنقطة دي ده الـ graphical method في Lecture 2.` };
    else cap = { en: `Feasible: every constraint and x₁, x₂ ≥ 0 hold, with Z = ${fmt(Z)}. ${rs.some(r => !r.tight) ? 'Some resource is left over.' : ''} Compare with the notes' optimum.`, ar: `الـ plan ده feasible، كل الـ constraints والـ non-negativity متحققين، والـ Z بتاعه:<span class="ltr">Z = ${fmt(Z)}</span>قارنه بالـ optimum اللي في الملاحظات.${rs.some(r => !r.tight) ? ' ولسه فيه resource فاضل منه حاجة.' : ''}` };
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-row">${Object.keys(QS).map(k => html`<button key=${k} className=${'fig-btn' + (q === k ? ' orv1-sel' : '')} onClick=${() => go(k)}>${QS[k].name}</button>`)}</div>
      <div className="orv1-box orv1-math"><div>${Q.objS}</div>${Q.rows.map((r, k) => html`<div key=${k}><span className="orv1-st">${k ? '' : 'S.T.'}</span>${r[3]}<span className="orv1-tag">${r[0]}</span></div>`)}<div>x₁, x₂ ≥ 0</div></div>
      <div className="orv1-h">Try a plan</div>
      <div className="orv1-in"><label>x₁ =<input type="text" inputMode="decimal" aria-label="x1" value=${a} className=${val(a) === val(a) ? '' : 'bad'} onChange=${e => setA(e.target.value)} /></label>
        <label>x₂ =<input type="text" inputMode="decimal" aria-label="x2" value=${b} className=${val(b) === val(b) ? '' : 'bad'} onChange=${e => setB(e.target.value)} /></label></div>
      <div className="orv1-row"><button className=${'fig-btn' + (isBest ? ' orv1-sel' : '')} onClick=${() => go(q)}>Example from the notes (optimum)</button></div>
      ${okIn && rs.map((r, k) => html`<div key=${k} className="orv1-con"><div className="top"><span>${r.nm}: ${fmt(r.l)} ${r.ok ? '≤' : '>'} ${r.rhs}</span><span className=${r.ok ? 'orv1-ok' : 'orv1-no'}>${r.ok ? (r.tight ? '✓ used up' : '✓ ' + fmt(r.rhs - r.l) + ' left') : '✗ over'}</span></div>
        <div className="orv1-meter"><i className=${r.ok ? '' : 'over'} style=${{ width: Math.max(0, Math.min(100, r.l / r.rhs / 1.25 * 100)) + '%' }}></i><s style=${{ left: (100 / 1.25) + '%' }}></s></div></div>`)}
      ${okIn && html`<div className="orv1-con"><div className="top"><span>x₁, x₂ ≥ 0</span><span className=${nn ? 'orv1-ok' : 'orv1-no'}>${nn ? '✓' : '✗'}</span></div></div>`}
      ${okIn && html`<div className=${'orv1-z ' + (feas ? '' : 'orv1-no')}>Z = ${fmt(Z)}${feas ? '' : ' (not feasible)'}</div>`}
      </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [8] with [4.5]: hidden constraints, Universal Mines and Recreational Motors ── */
  const HID = {
    mines: { name: 'Universal Mines', lim: 7, unit: '$1000', cost: [20, 22, 18], need: [['high grade (t)', [4, 6, 1], 54], ['low grade (t)', [4, 4, 6], 65]], vars: 'x₁, x₂, x₃ = days mine 1, 2, 3 operates in the week',
      lines: ['Min Z = 20x₁ + 22x₂ + 18x₃', '4x₁ + 6x₂ + x₃ ≥ 54', '4x₁ + 4x₂ + 6x₃ ≥ 65'], tags: ['$1000', 'high grade', 'low grade'],
      steps: [
        { en: 'Universal Mines as stated: minimize the cost ($1000 a day: 20, 22, 18) while delivering at least 54 t of high grade and 65 t of low grade ore by the end of the week.', ar: 'الـ Universal Mines زي ما هي مكتوبة: عايزين أقل تكلفة (بالـ $1000 في اليوم)، ونسلّم على الأقل 54 طن high grade و65 طن low grade قبل آخر الأسبوع.' },
        { en: 'Hidden constraint: the delivery is for one week and a week has 7 days, so no mine operates more than 7 days.<span class="ltr">x₁, x₂, x₃ ≤ 7</span>', ar: 'الـ constraint المستخبي: التسليم في أسبوع واحد، والأسبوع فيه 7 أيام، فمفيش منجم يشتغل أكتر من 7 أيام:<span class="ltr">x₁, x₂, x₃ ≤ 7</span>' },
        { en: 'Hidden too: the workers get a full day\'s pay for any fraction of a day, so a fraction of a day costs a whole day: the days are <b>integer</b>.', ar: 'وكمان مستخبي: العمال بياخدوا يومية كاملة لو اشتغلوا جزء من اليوم، فجزء اليوم بيتحسب يوم كامل، يعني الأيام لازم تبقى <b>integer</b>.' },
        { en: 'With non-negativity the model is complete. Try a plan below: the sliders only allow whole days from 0 to 7.', ar: 'ومع الـ non-negativity الـ model كمل. جرّب plan تحت، والـ sliders بتسمح بأيام كاملة بس من <bdi dir="ltr">0</bdi> لحد <bdi dir="ltr">7</bdi>.' }
      ] },
    motors: { name: 'Recreational Motors', lim: 30, unit: '$', cost: [210000, 190000, 182000], need: [['carts', [40, 65, 0], 1500], ['snowmobiles', [35, 0, 53], 1100]], vars: 'x₁, x₂, x₃ = days plant A, B, C operates in September',
      lines: ['Min Z = 210000x₁ + 190000x₂ + 182000x₃', '40x₁ + 65x₂ ≥ 1500', '35x₁ + 53x₃ ≥ 1100'], tags: ['$ a day', 'carts', 'snowmobiles'],
      steps: [
        { en: 'Recreational Motors as stated: plant A makes 40 carts and 35 snowmobiles a day, B 65 carts, C 53 snowmobiles, at $210000, $190000, $182000 a day. At least 1500 carts and 1100 snowmobiles are needed in September.', ar: 'الـ Recreational Motors زي ما هي مكتوبة: المصنع A بيعمل 40 cart و35 snowmobile في اليوم، والمصنع B بيعمل 65 cart، والمصنع C بيعمل 53 snowmobile. ومحتاجين على الأقل 1500 cart و1100 snowmobile في شهر سبتمبر.' },
        { en: 'Hidden constraint: the production is in September, which has 30 days.<span class="ltr">x₁, x₂, x₃ ≤ 30</span>', ar: 'الـ constraint المستخبي: الإنتاج في سبتمبر، وسبتمبر فيه 30 يوم:<span class="ltr">x₁, x₂, x₃ ≤ 30</span>' },
        { en: 'The notes\' model also takes whole days: the variables are <b>integer</b>.', ar: 'والـ model اللي في الملاحظات بياخد أيام كاملة، يعني الـ variables لازم تبقى <b>integer</b>.' },
        { en: 'With non-negativity the model is complete. Try a plan below: the sliders only allow whole days from 0 to 30.', ar: 'ومع الـ non-negativity الـ model كمل. جرّب plan تحت، والـ sliders بتسمح بأيام كاملة بس من <bdi dir="ltr">0</bdi> لحد <bdi dir="ltr">30</bdi>.' }
      ] }
  };
  function FormulateHidden({ ar }) {
    const [k, setK] = useState('mines'), H = HID[k];
    const [i, ctl] = useSteps(H.steps.length, 3400);
    const [d, setD] = useState([3, 3, 3]);
    const go = j => { setK(j); setD(j === 'mines' ? [3, 3, 3] : [15, 15, 15]); ctl.replay(); };
    const cost = H.cost.reduce((s, c, j) => s + c * d[j], 0);
    const met = H.need.map(([nm, co, r]) => { const v = co.reduce((s, c, j) => s + c * d[j], 0); return { nm, v, r, ok: v >= r }; });
    const L = (at, t, tag, hid) => html`<div className=${'orv1-ln ' + (i === at ? (hid ? 'hid ' : 'on ') : '') + pop(i >= at)}>${st(t)}${tag && html`<span className="orv1-tag">${tag}</span>`}</div>`;
    return html`<figure className="fig orv1"><div className="fig-stage"><div className="orv1-wrap">
      <div className="orv1-row">${Object.keys(HID).map(j => html`<button key=${j} className=${'fig-btn' + (k === j ? ' orv1-sel' : '')} onClick=${() => go(j)}>${HID[j].name}</button>`)}</div>
      <div className="orv1-muted" style=${{ marginBottom: '6px' }}>${H.vars}</div>
      <div className="orv1-box orv1-math">
        ${L(0, H.lines[0], H.tags[0])}${L(0, 'S.T. ' + H.lines[1], H.tags[1])}${L(0, '     ' + H.lines[2], H.tags[2])}
        ${L(1, 'x₁, x₂, x₃ ≤ ' + H.lim, 'hidden', 1)}${L(2, 'x₁, x₂, x₃ integer', 'hidden', 1)}${L(3, 'x₁, x₂, x₃ ≥ 0')}
      </div>
      <div className="orv1-h">Try a plan (whole days, 0 to ${H.lim})</div>
      <div className="orv1-sl">${d.map((v, j) => html`<${React.Fragment} key=${j}><span>${X(j)}</span><input type="range" min="0" max=${H.lim} step="1" value=${v} aria-label=${'x' + (j + 1)} onChange=${e => { const t = [...d]; t[j] = +e.target.value; setD(t); }} /><b>${v}</b></${React.Fragment}>`)}</div>
      <div className="orv1-need">${met.map((m, j) => html`<div key=${j}><span className=${m.ok ? 'orv1-ok' : 'orv1-no'}>${m.ok ? '✓' : '✗'}</span> ${m.nm}: ${m.v} ${m.ok ? '≥' : '<'} ${m.r}</div>`)}
        <div><b>Z = ${k === 'mines' ? cost + ' ($1000)' : '$' + cost.toLocaleString('en-US')}</b>${met.every(m => m.ok) ? '' : html` <span className="orv1-no">(needs not met)</span>`}</div></div>
      </div></div>
      <${Cap} ...${H.steps[i]} showAr=${ar} /><${Bar} steps=${H.steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'or-model-deftrap': DefTrap, 'or-model-family': ModelFamily, 'or-model-general': ModelGeneral, 'or-model-terms': ModelTerms,
    'or-formulate-keywords': FormulateKeywords, 'or-formulate-steps': FormulateSteps, 'or-formulate-builder': FormulateBuilder,
    'or-model-check': ModelCheck, 'or-formulate-hidden': FormulateHidden
  });
})();
/* ── part L5 ── */
// Operations Research visuals, Lecture 5 (assignment problem, Hungarian method): the assignment model as a one-unit transportation network, row/column scanning, the marking step, the θ update, the method as a flowchart, the page-107 and Example 2 solutions step by step (Lec_07 slides 3-43) and a Hungarian solver for the sheet and exam matrices. Every label and number comes from the site's notes or is computed with the lecture's rules.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.orv5 .fig-stage{ padding:14px 8px 10px; }
.orv5 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.orv5-modes .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.orv5-tw{ max-width:430px; margin:0 auto; }
.orv5-t{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 .95rem/1.1 var(--mono); color:var(--ink); }
.orv5-t th{ font:700 .82rem/1.15 var(--body); color:#fff; background:var(--fig-s); border:1px solid var(--paper-2); padding:6px 2px; text-align:center; overflow-wrap:anywhere; }
.orv5-t td{ background:var(--paper); border:1px solid var(--line); text-align:center; height:40px; padding:0 1px; transition:background-color .35s; position:relative; }
.orv5-t td.orv5-c{ cursor:default; }
.orv5-t.orv5-tap td.orv5-c{ cursor:pointer; }
.orv5-t th.orv5-sd, .orv5-t td.orv5-sd{ background:transparent; border:0; color:var(--graphite); font-weight:700; }
.orv5-t th.orv5-sd{ color:var(--graphite); font-size:.78rem; }
.orv5-t tr.orv5-ft td{ background:transparent; border:0; color:var(--graphite); font-weight:700; height:28px; }
.orv5-t tr.orv5-ft th{ background:transparent; border:0; color:var(--graphite); font-size:.78rem; }
.orv5-t tr.orv5-tkr td{ background:transparent; border:0; height:22px; }
.orv5-tk{ color:var(--fig-k); font:700 1rem/1 var(--body); }
.orv5-t td.orv5-un{ background:color-mix(in srgb, var(--fig-k) 9%, var(--paper)); }
.orv5-t td.orv5-hot{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.orv5-t td.orv5-sel{ box-shadow:inset 0 0 0 2px var(--ink); }
.orv5-t td.orv5-dm{ color:var(--graphite); }
.orv5-t td.orv5-lh{ background-image:linear-gradient(to bottom, transparent calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% + 1.5px), transparent calc(50% + 1.5px)); }
.orv5-t td.orv5-lv{ background-image:linear-gradient(to right, transparent calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% + 1.5px), transparent calc(50% + 1.5px)); }
.orv5-t td.orv5-lh.orv5-lv{ background-image:linear-gradient(to bottom, transparent calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% + 1.5px), transparent calc(50% + 1.5px)), linear-gradient(to right, transparent calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% - 1.5px), color-mix(in srgb, var(--fig-k) 75%, transparent) calc(50% + 1.5px), transparent calc(50% + 1.5px)); }
.orv5-v{ position:relative; z-index:1; padding:0 2px; }
.orv5-bx{ position:relative; z-index:1; display:inline-block; min-width:1.4em; padding:1px 3px; border:2px solid var(--fig-k); border-radius:4px; background:var(--paper); color:var(--ink); }
.orv5-cr{ font-style:normal; color:var(--pen); font-weight:700; margin-left:1px; }
.orv5-d{ display:block; font:700 12px/1.1 var(--mono); }
.orv5-d.orv5-m{ color:var(--pen); } .orv5-d.orv5-p{ color:var(--ok); } .orv5-d.orv5-z{ color:var(--graphite); }
.orv5-new{ font-weight:800; color:var(--fig-k); }
.orv5-stg{ text-align:center; font-size:.84rem; font-weight:700; color:var(--fig-k); margin:0 0 8px; }
.orv5-tot{ max-width:430px; margin:8px auto 0; text-align:center; font:700 .9rem/1.45 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; overflow-wrap:anywhere; }
.orv5-key{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; margin:8px auto 0; font-size:.8rem; color:var(--graphite); }
.orv5-key span{ display:inline-flex; align-items:center; gap:5px; }
.orv5-sw{ display:inline-block; width:14px; height:14px; border:1px solid var(--line); border-radius:3px; }
.orv5-svg{ display:block; width:100%; height:auto; max-width:330px; margin:0 auto; }
.orv5-svg text{ fill:var(--ink); font-family:var(--body); }
.orv5-svg .orv5-mu{ fill:var(--graphite); }
.orv5-arc{ transition:opacity .5s, stroke .5s, stroke-width .5s; }
.orv5-flow{ max-width:360px; margin:0 auto; display:grid; gap:6px; }
.orv5-box{ border:1px solid var(--line); border-radius:9px; background:var(--paper); padding:7px 9px; font-size:.86rem; line-height:1.35; color:var(--ink); opacity:.45; transition:opacity .4s, box-shadow .4s; }
.orv5-box b{ display:block; color:var(--fig-k); font-size:.8rem; }
.orv5-box.orv5-on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); }
.orv5-box.orv5-seen{ opacity:1; }
.orv5-dia{ border-radius:9px; border-style:dashed; text-align:center; }
.orv5-ar{ text-align:center; color:var(--fig-k); font-weight:700; line-height:1; font-size:1rem; }
.orv5-two{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:6px; align-items:start; }
.orv5-two > div{ display:grid; gap:6px; }
.orv5-lab{ text-align:center; font-size:.8rem; font-weight:700; color:var(--graphite); }
.orv5-ed{ max-width:430px; margin:0 auto 10px; display:grid; gap:6px; font-size:.86rem; color:var(--ink); }
.orv5-ed textarea{ font:14px/1.45 var(--mono); width:100%; box-sizing:border-box; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); resize:vertical; }
.orv5-ed label{ display:flex; align-items:center; gap:6px; }
.orv5-ed input[type=checkbox]{ width:18px; height:18px; accent-color:var(--fig-s); }
.orv5-err{ color:var(--pen); font-size:.9rem; text-align:center; margin:6px 0; }
.orv5 .fig-cap .ltr{ font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .orv5-t td, .orv5-box, .orv5-arc{ transition:none; } }
`;
  if (!document.getElementById('orv5-css')) { const s = document.createElement('style'); s.id = 'orv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const I = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const fmt = v => { let r = Math.round(v * 100) / 100; if (Object.is(r, -0)) r = 0; return (r < 0 ? '−' : '') + String(Math.abs(r)); };
  const K = (i, j) => i + ',' + j;
  const list = a => a.join(', ');
  const arList = a => a.map(I).join(' و ');
  const Modes = ({ list: ls, mode, set }) => html`<div className="orv5-modes" role="group">${ls.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── the course's matrices ── */
  const J = ['J1', 'J2', 'J3', 'J4'], PP = ['P1', 'P2', 'P3', 'P4'];
  const PRE = {
    p107: { name: 'Page 107', rows: ['A', 'B', 'C'], cols: ['D', 'E', 'F'], c: [[250, 400, 350], [400, 600, 350], [200, 400, 250]], money: true },
    ex2: { name: 'Example 2', rows: J, cols: PP, c: [[48, 48, 50, 44], [56, 60, 60, 68], [96, 94, 90, 85], [42, 44, 54, 46]], money: true },
    sh1: { name: 'Sheet 1', rows: ['1', '2', '3', '4'], cols: ['A', 'B', 'C', 'D'], c: [[1, 4, 6, 3], [9, 7, 10, 9], [4, 5, 11, 7], [8, 7, 8, 5]] },
    y23: { name: '2023/24', rows: J, cols: PP, c: [[40, 60, 60, 70], [10, 60, 70, 30], [20, 50, 40, 20], [30, 20, 10, 40]] },
    y19: { name: '2019/20', rows: ['Mohamed', 'Ahmed', 'Samy', 'Eslam'], cols: J, c: [[7, 9, 8, 13], [16, 16, 15, 11], [16, 19, 10, 15], [16, 17, 14, 16]] }
  };

  /* engine */
  const rmin = M => M.map(r => Math.min(...r));
  const cmin = M => M[0].map((_, j) => Math.min(...M.map(r => r[j])));
  // Step 3, the lecture's way: row scanning (a row with exactly one unmarked zero: box it, cross the other zeros of its column),
  // then column scanning (a column with exactly one unmarked zero: box it, cross the other zeros of its row); repeat; a tie is broken by boxing one zero.
  function scan(M) {
    const n = M.length, box = Array(n).fill(-1), cr = new Set(), ev = [], idx = [...Array(n).keys()];
    const free = (i, j) => M[i][j] === 0 && box[i] !== j && !cr.has(K(i, j));
    const snap = e => ev.push(Object.assign(e, { box: box.slice(), cr: new Set(cr) }));
    let first = true;
    for (let g = 0; g < 4 * n + 4; g++) {
      let ch = false;
      for (const i of idx) {
        const fz = idx.filter(j => free(i, j));
        if (box[i] < 0 && fz.length === 1) { const j = fz[0]; box[i] = j; const x = idx.filter(r => r !== i && free(r, j)); x.forEach(r => cr.add(K(r, j))); snap({ t: 'r', i, j, x }); ch = true; }
        else if (first) snap({ t: 'r', i, skip: fz.length, has: box[i] >= 0 });
      }
      for (const j of idx) {
        const fz = idx.filter(i => free(i, j)), has = box.includes(j);
        if (!has && fz.length === 1) { const i = fz[0]; box[i] = j; const x = idx.filter(c => c !== j && free(i, c)); x.forEach(c => cr.add(K(i, c))); snap({ t: 'c', i, j, x }); ch = true; }
        else if (first) snap({ t: 'c', j, skip: fz.length, has });
      }
      first = false;
      if (!ch) {
        let best = null;
        for (const i of idx) { const fz = idx.filter(j => free(i, j)); if (fz.length && (!best || fz.length < best.n)) best = { i, j: fz[0], n: fz.length }; }
        if (!best) break;
        const { i, j } = best; box[i] = j; const x = [];
        idx.forEach(c => { if (c !== j && free(i, c)) { cr.add(K(i, c)); x.push([i, c]); } });
        idx.forEach(r => { if (r !== i && free(r, j)) { cr.add(K(r, j)); x.push([r, j]); } });
        snap({ t: 'tie', i, j, x });
      }
    }
    // the most independent zeros (if a tie choice blocked one, re-choose with augmenting paths)
    const b = box.slice(), own = Array(n).fill(-1); b.forEach((j, i) => { if (j >= 0) own[j] = i; });
    const aug = (i, seen) => { for (const j of idx) if (M[i][j] === 0 && !seen[j]) { seen[j] = 1; if (own[j] < 0 || aug(own[j], seen)) { own[j] = i; b[i] = j; return true; } } return false; };
    idx.forEach(i => { if (b[i] < 0) aug(i, []); });
    const re = b.some((j, i) => j !== box[i]);
    const crF = re ? new Set(idx.flatMap(i => idx.filter(j => M[i][j] === 0 && b[i] !== j).map(j => K(i, j)))) : cr;
    return { ev, box: b, cr: crF, re, cnt: b.filter(j => j >= 0).length };
  }
  // Step 4: tick rows without an assignment; tick columns with a zero in a ticked row; tick rows with an assigned zero in a ticked column; repeat.
  function mark(M, box) {
    const n = M.length, idx = [...Array(n).keys()], tr = new Set(), tc = new Set(), ord = [];
    idx.forEach(i => { if (box[i] < 0) { tr.add(i); ord.push({ t: 'r', i }); } });
    for (let ch = true; ch;) {
      ch = false;
      for (const i of [...tr]) for (const j of idx) if (M[i][j] === 0 && !tc.has(j)) { tc.add(j); ord.push({ t: 'c', j, from: i }); ch = true; }
      for (const j of [...tc]) { const i = box.indexOf(j); if (i >= 0 && !tr.has(i)) { tr.add(i); ord.push({ t: 'r', i, from: j }); ch = true; } }
    }
    return { tr, tc, ord, lineR: new Set(idx.filter(i => !tr.has(i))), lineC: new Set(tc) };
  }
  // Step 5: θ = smallest uncovered; C − θ uncovered, C one line, C + θ two lines
  const kind = (lr, lc, i, j) => (lr.has(i) ? 1 : 0) + (lc.has(j) ? 1 : 0);
  function theta(M, lr, lc) {
    let th = Infinity, at = null;
    M.forEach((r, i) => r.forEach((v, j) => { if (!kind(lr, lc, i, j) && v < th) { th = v; at = [i, j]; } }));
    const M2 = M.map((r, i) => r.map((v, j) => { const k = kind(lr, lc, i, j); return k === 0 ? v - th : k === 2 ? v + th : v; }));
    return { th, at, M2 };
  }
  function solve(P) {
    let C = P.c.map(r => r.slice()), rows = P.rows.slice(), cols = P.cols.slice(), mx = null, dumR = -1, dumC = -1;
    const st = [];
    if (P.max) { mx = Math.max(...C.flat()); }
    const m = C.length, n0 = C[0].length, n = Math.max(m, n0);
    if (m < n) { for (let k = m; k < n; k++) { C.push(Array(n0).fill(0)); rows.push(n - m > 1 ? 'Dum' + (k - m + 1) : 'Dum'); } dumR = m; }
    if (n0 < n) { C = C.map(r => r.concat(Array(n - n0).fill(0))); for (let k = n0; k < n; k++) cols.push(n - n0 > 1 ? 'Dum' + (k - n0 + 1) : 'Dum'); dumC = n0; }
    const C0 = C.map(r => r.slice());
    const R = { rows, cols, n, C0, money: P.money, max: P.max, mx, dumR, dumC, st };
    if (P.max || dumR >= 0 || dumC >= 0) st.push({ k: 'prep', M: C0 });
    let M = P.max ? C.map((r, i) => r.map((v, j) => (dumR >= 0 && i >= dumR) || (dumC >= 0 && j >= dumC) ? 0 : mx - v)) : C;
    if (P.max) st.push({ k: 'conv', M });
    const rm = rmin(M); st.push({ k: 'orig', M, rm });
    M = M.map((r, i) => r.map(v => v - rm[i])); const cm = cmin(M); st.push({ k: 'row', M, cm });
    M = M.map(r => r.map((v, j) => v - cm[j])); st.push({ k: 'col', M });
    for (let it = 0; it < 40; it++) {
      const s = scan(M); st.push({ k: 'scan', M, box: s.box, cr: s.cr, ev: s.ev, re: s.re, cnt: s.cnt, it });
      if (s.cnt === n) { st.push({ k: 'done', M, box: s.box, cr: s.cr }); R.box = s.box; break; }
      const mk = mark(M, s.box); st.push(Object.assign({ k: 'mark', M, box: s.box, cr: s.cr }, mk));
      const t = theta(M, mk.lineR, mk.lineC); st.push({ k: 'theta', M, box: s.box, cr: s.cr, lineR: mk.lineR, lineC: mk.lineC, th: t.th, at: t.at, M2: t.M2 });
      const nz = new Set(); t.M2.forEach((r, i) => r.forEach((v, j) => { if (v === 0 && M[i][j] !== 0) nz.add(K(i, j)); }));
      M = t.M2; st.push({ k: 'upd', M, nz });
    }
    return R;
  }
  /* end engine */

  /* ── captions for a stage of the solution ── */
  const pr = (R, box) => box.map((j, i) => `${R.rows[i]}&nbsp;→&nbsp;${R.cols[j]}`);
  function total(R, box) {
    const v = box.map((j, i) => R.C0[i][j]), sum = v.reduce((a, b) => a + b, 0), d = R.money ? '$' : '';
    return { v, sum, eq: `Total ${R.max ? 'profit' : 'cost'} = ${v.map(fmt).join(' + ')} = ${d}${fmt(sum)}` };
  }
  function stageCap(R, s) {
    const n = R.n, rw = R.rows, cl = R.cols;
    switch (s.k) {
      case 'prep': {
        const en = [], ar = [];
        if (R.dumR >= 0 || R.dumC >= 0) { const w = R.dumR >= 0 ? 'row' : 'column'; en.push(`Unbalanced matrix: add a dummy ${w} of zeros to make it ${n} × ${n}.`); ar.push(`الـ matrix دي unbalanced، فبنضيف dummy ${w} كله أصفار عشان تبقى مربعة` + ` ${I(n + ' × ' + n)}.`); }
        if (R.max) { en.push(`Maximization: subtract every entry from the largest entry (${fmt(R.mx)}), then minimize.`); ar.push(`ودي مسألة maximization، فبنطرح كل خانة من أكبر خانة وهي ${I(fmt(R.mx))}، وبعدين نعمل minimize.`); }
        return { en: en.join(' '), ar: ar.join(' ') };
      }
      case 'conv': return { en: `Each entry becomes ${fmt(R.mx)} − entry: now solve it as a minimization.`, ar: `كل خانة بقت كده:` + L(`${fmt(R.mx)} − entry`) + 'ودلوقتي بنحلها كـ minimization عادي.' };
      case 'orig': { const t = list(rw.map((r, i) => `${r}: ${fmt(s.rm[i])}`));
        return { en: `${R.max ? 'The matrix to minimize' : 'The cost matrix'} (${n} × ${n}). The smallest entry of each row: ${t}.`, ar: `دي الـ matrix اللي هنعملها minimize. أصغر رقم في كل صف:` + L(t) }; }
      case 'row': { const t = list(cl.map((c, j) => `${c}: ${fmt(s.cm[j])}`));
        return { en: `<b>Step 1 (row reduction):</b> each row's minimum is subtracted from that row, so every row has a zero. The smallest entry of each column: ${t}.`, ar: `الـ <b>Step 1 (row reduction)</b>: طرحنا أصغر رقم في كل صف من الصف ده، فبقى في كل صف صفر. أصغر رقم في كل عمود:` + L(t) }; }
      case 'col': return { en: '<b>Step 2 (column reduction):</b> each column\'s minimum is subtracted from that column. Now every row and every column has a zero.', ar: 'الـ <b>Step 2 (column reduction)</b>: طرحنا أصغر رقم في كل عمود من العمود ده. دلوقتي كل صف وكل عمود فيه صفر.' };
      case 'scan': {
        const p = list(pr(R, s.box).filter((_, i) => s.box[i] >= 0)), ok = s.cnt === n;
        const en = `<b>Step 3${s.it ? ' again' : ''}:</b> row scanning, then column scanning, box one zero in a row and column and cross the other zeros: ${p}. ${s.cnt} assignments ${ok ? `= n = ${n}, so this assignment is optimal.` : `&lt; n = ${n}, so go to step 4.`}` + (s.re ? ' (One box was re-chosen to get the most independent zeros.)' : '');
        const ar = `الـ <b>Step 3${s.it ? ' تاني' : ''}</b>: بنعمل row scanning وبعدين column scanning، ونعمل box لصفر واحد في الصف والعمود ونشطب باقي الأصفار:` + L(p) +
          (ok ? `عدد الـ assignments هنا ${I(s.cnt)} وده يساوي n، يبقى الـ assignment ده optimal.` : `عدد الـ assignments هنا ${I(s.cnt)} وده أقل من n اللي هي ${I(n)}، فبنروح لـ step 4.`) + (s.re ? ' (غيّرنا box واحد عشان نوصل لأكبر عدد من الأصفار المستقلة.)' : '');
        return { en, ar };
      }
      case 'done': { const t = total(R, s.box), lp = list(s.box.map((j, i) => `${rw[i]}&nbsp;→&nbsp;${cl[j]}&nbsp;(${fmt(t.v[i])})`));
        return { en: `The total is read from the <b>original</b> matrix: ${lp}. <b>${t.eq}</b>.`, ar: `التكلفة بتتقري من الـ matrix <b>الأصلية</b>:` + L(lp) + 'والمجموع:' + L(t.eq) }; }
      case 'mark': { const seq = s.ord.map(o => '√ ' + (o.t === 'r' ? rw[o.i] : cl[o.j])).join(' → '), lr = [...s.lineR].map(i => rw[i]), lc = [...s.lineC].map(j => cl[j]), nl = lr.length + lc.length;
        const ln = `rows ${lr.length ? list(lr) : 'none'} + columns ${lc.length ? list(lc) : 'none'} = ${nl} lines`;
        return { en: `<b>Step 4 (marking):</b> tick ${seq}. Lines go through the unticked rows and the ticked columns: ${ln}.`, ar: 'الـ <b>Step 4 (الـ marking)</b>: بنعلّم بالترتيب ده:' + L(seq) + 'وبنرسم الخطوط على الصفوف اللي مش متعلّمة والأعمدة المتعلّمة:' + L(ln) }; }
      case 'theta': return { en: `<b>Step 5:</b> θ = ${fmt(s.th)}, the smallest uncovered entry (${rw[s.at[0]]}, ${cl[s.at[1]]}). Uncovered entries − θ, entries where two lines cross + θ, entries on one line stay the same.`, ar: 'الـ <b>Step 5</b>: الـ θ هي أصغر رقم مش متغطي:' + L(`θ = ${fmt(s.th)} (${rw[s.at[0]]}, ${cl[s.at[1]]})`) + 'الأرقام اللي مش متغطية بتقل بـ θ، واللي عند تقاطع خطين بتزيد بـ θ، واللي عليها خط واحد بتفضل زي ما هي.' };
      case 'upd': return { en: `The new matrix has ${s.nz.size === 1 ? 'a new zero' : s.nz.size + ' new zeros'} (in bold). Back to step 3.`, ar: `الـ matrix الجديدة فيها ${s.nz.size === 1 ? 'صفر جديد' : I(s.nz.size) + ' أصفار جديدة'} (بالـ bold). ونرجع لـ step 3.` };
    }
    return { en: '', ar: '' };
  }
  const STG = { prep: 'Set up', conv: 'Maximization → minimization', orig: 'Original matrix', row: 'Step 1: row reduction', col: 'Step 2: column reduction', scan: 'Step 3: assign zeros', done: 'Optimal assignment', mark: 'Step 4: marking', theta: 'Step 5: θ', upd: 'Modified matrix' };
  function stageView(R, s) {
    switch (s.k) {
      case 'prep': return { hot: (i, j) => (R.dumR >= 0 && i >= R.dumR) || (R.dumC >= 0 && j >= R.dumC) };
      case 'orig': return { rm: s.rm, hot: (i, j) => s.M[i][j] === s.rm[i] };
      case 'row': return { cm: s.cm, hot: (i, j) => s.M[i][j] === s.cm[j] };
      case 'col': return { hot: (i, j) => s.M[i][j] === 0 };
      case 'scan': case 'done': return { box: s.box, cr: s.cr };
      case 'mark': return { box: s.box, cr: s.cr, tickR: s.tr, tickC: s.tc, lineR: s.lineR, lineC: s.lineC };
      case 'theta': return { box: s.box, cr: s.cr, lineR: s.lineR, lineC: s.lineC, un: true, hot: (i, j) => i === s.at[0] && j === s.at[1], delta: (i, j) => { const k = kind(s.lineR, s.lineC, i, j); return k === 0 ? ['m', '−' + fmt(s.th)] : k === 2 ? ['p', '+' + fmt(s.th)] : null; } };
      case 'upd': return { bold: s.nz };
    }
    return {};
  }

  /* ── the matrix drawn like the slides' tables ── */
  function Mx({ R, M, o }) {
    o = o || {};
    const rows = R.rows, cols = R.cols, lw = Math.max(2.4, Math.max(...rows.map(r => r.length)) * .62 + 1);
    const side = o.rm ? 'min' : o.tickR ? '' : null;
    const lr = o.lineR || new Set(), lc = o.lineC || new Set();
    const cell = (i, j) => {
      const v = M[i][j], cls = ['orv5-c'];
      if (lr.has(i)) cls.push('orv5-lh'); if (lc.has(j)) cls.push('orv5-lv');
      if (o.un && !lr.has(i) && !lc.has(j)) cls.push('orv5-un');
      if (o.hot && o.hot(i, j)) cls.push('orv5-hot');
      if (o.sel && o.sel[0] === i && o.sel[1] === j) cls.push('orv5-sel');
      if ((R.dumR >= 0 && i >= R.dumR) || (R.dumC >= 0 && j >= R.dumC)) cls.push('orv5-dm');
      const bx = o.box && o.box[i] === j, cr = o.cr && o.cr.has(K(i, j)), d = o.delta && o.delta(i, j), b = o.bold && o.bold.has(K(i, j));
      return html`<td key=${j} className=${cls.join(' ')} onClick=${o.tap ? () => o.tap(i, j) : null}>${bx ? html`<span className="orv5-bx">${fmt(v)}</span>` : html`<span className=${'orv5-v' + (b ? ' orv5-new' : '')}>${fmt(v)}${cr ? html`<i className="orv5-cr">×</i>` : null}</span>`}${d ? html`<span className=${'orv5-d orv5-' + d[0]}>${d[1]}</span>` : null}</td>`;
    };
    return html`<div className="orv5-tw"><table className=${'orv5-t' + (o.tap ? ' orv5-tap' : '')}>
      <colgroup><col style=${{ width: lw + 'em' }} />${cols.map((_, j) => html`<col key=${j} />`)}${side != null ? html`<col style=${{ width: '2.7em' }} />` : null}</colgroup>
      <thead><tr><th></th>${cols.map((c, j) => html`<th key=${j} scope="col">${c}</th>`)}${side != null ? html`<th className="orv5-sd">${side}</th>` : null}</tr>
        ${o.tickC ? html`<tr className="orv5-tkr"><td></td>${cols.map((_, j) => html`<td key=${j} className="orv5-tk">${o.tickC.has(j) ? '√' : ''}</td>`)}${side != null ? html`<td></td>` : null}</tr>` : null}</thead>
      <tbody>${M.map((r, i) => html`<tr key=${i}><th scope="row">${rows[i]}</th>${r.map((_, j) => cell(i, j))}${side != null ? html`<td className=${'orv5-sd' + (o.tickR ? ' orv5-tk' : '')}>${o.rm ? fmt(o.rm[i]) : o.tickR.has(i) ? '√' : ''}</td>` : null}</tr>`)}</tbody>
      ${o.cm ? html`<tfoot><tr className="orv5-ft"><th>min</th>${o.cm.map((v, j) => html`<td key=${j}>${fmt(v)}</td>`)}</tr></tfoot>` : null}
    </table></div>`;
  }

  /* ── a whole solution, stage by stage ── */
  function Walk({ ar, P, ms }) {
    const R = React.useMemo(() => solve(P), [P]);
    const st = R.st, steps = st.map(s => stageCap(R, s));
    const [i, ctl] = useSteps(steps.length, ms || 2800);
    const s = st[i], o = stageView(R, s);
    const t = s.k === 'done' ? total(R, s.box) : null;
    return html`<${React.Fragment}><div className="fig-stage">
        <p className="orv5-stg">${STG[s.k]}${s.k === 'scan' && s.it ? ' (again)' : ''}</p>
        <${Mx} R=${R} M=${s.M} o=${o} />
        ${t && html`<div className="orv5-tot">${t.eq}</div>`}
      </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></${React.Fragment}>`;
  }
  function P107Walk({ ar }) { return html`<figure className="fig orv5"><${Walk} ar=${ar} P=${PRE.p107} ms=${2600} /></figure>`; }
  function Ex2Walk({ ar }) { return html`<figure className="fig orv5"><${Walk} ar=${ar} P=${PRE.ex2} ms=${2800} /></figure>`; }

  /* ── [0] the assignment model: a transportation model with supply = demand = 1 ── */
  function AssignModel({ ar }) {
    const steps = [
      { en: 'Like the <b>transportation model</b>: every source (row) can go to every destination (column). Page 107: sources A, B, C and destinations D, E, F.', ar: 'زي الـ <b>transportation model</b>: كل source (صف) ممكن يروح لأي destination (عمود). في مثال Page 107 الـ sources هم A و B و C والـ destinations هم D و E و F.' },
      { en: 'The difference: the <b>supply</b> at each source and the <b>demand</b> at each destination are each limited to <b>one unit</b>.', ar: 'الفرق: الـ <b>supply</b> عند كل source والـ <b>demand</b> عند كل destination كل واحد فيهم محدود بـ <b>وحدة واحدة</b>.' },
      { en: 'So each row gets <b>exactly one</b> column and each column exactly one row, for example A → E, B → F, C → D.', ar: 'عشان كده كل صف بياخد عمود واحد <b>بالظبط</b>، وكل عمود بياخد صف واحد بالظبط، زي كده:' + L('A → E, B → F, C → D') },
      { en: 'An n × n problem has n assignments: this 3 × 3 one has 3. The goal is the allocation with the minimum total cost (or the maximum total profit).', ar: 'المسألة ' + I('n × n') + ' فيها n assignments، والمسألة دي ' + I('3 × 3') + ' فيها 3. والهدف هو التوزيع اللي تكلفته الكلية أقل حاجة (أو ربحه الكلي أكبر حاجة).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const P = PRE.p107, R = { rows: P.rows, cols: P.cols, dumR: -1, dumC: -1 }, ch = [1, 2, 0];
    const ly = k => 62 + k * 66, x1 = 92, x2 = 208;
    const arcs = [];
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { const on = i >= 2 && ch[a] === b; arcs.push(html`<line key=${a + '' + b} className="orv5-arc" x1=${x1 + 20} y1=${ly(a)} x2=${x2 - 20} y2=${ly(b)} stroke=${on ? 'var(--fig-k)' : 'var(--graphite)'} strokeWidth=${on ? 4 : 1.5} opacity=${i >= 2 && !on ? .15 : on ? 1 : .6} />`); }
    const node = (x, y, t) => html`<g><circle cx=${x} cy=${y} r="20" fill="var(--paper)" stroke="var(--fig-k)" strokeWidth="2.5" /><text x=${x} y=${y + 6} textAnchor="middle" fontSize="18" fontWeight="700">${t}</text></g>`;
    const one = (x, y) => html`<g className=${pop(i >= 1)}><rect x=${x - 13} y=${y - 13} width="26" height="26" rx="6" fill="color-mix(in srgb, var(--fig-k) 18%, var(--paper))" stroke="var(--fig-k)" /><text x=${x} y=${y + 6} textAnchor="middle" fontSize="16" fontWeight="700">1</text></g>`;
    return html`<figure className="fig orv5"><div className="fig-stage">
      <svg className="orv5-svg" viewBox="0 0 300 230" role="img" aria-label="Sources A, B, C each with supply 1 linked to destinations D, E, F each with demand 1">
        <text x=${x1} y="22" textAnchor="middle" fontSize="15" fontWeight="700">rows</text>
        <text x=${x2} y="22" textAnchor="middle" fontSize="15" fontWeight="700">columns</text>
        <text x="20" y="22" textAnchor="middle" fontSize="13.5" className=${'orv5-mu ' + pop(i >= 1)}>supply</text>
        <text x="280" y="22" textAnchor="middle" fontSize="13.5" className=${'orv5-mu ' + pop(i >= 1)}>demand</text>
        ${arcs}
        ${P.rows.map((r, k) => html`<g key=${'s' + k}>${node(x1, ly(k), r)}${one(26, ly(k))}</g>`)}
        ${P.cols.map((c, k) => html`<g key=${'d' + k}>${node(x2, ly(k), c)}${one(274, ly(k))}</g>`)}
      </svg>
      <div style=${{ marginTop: '8px' }}><${Mx} R=${R} M=${P.c} o=${{ box: i >= 2 ? ch : null }} /></div>
      <div className="orv5-key"><span>costs from the page-107 example</span></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.2] step 3: row scanning then column scanning (slides 8-10 and 22-26) ── */
  const RED = { ex2: solve(PRE.ex2), p107: solve(PRE.p107), sh1: solve(PRE.sh1) };
  const colStage = R => R.st.find(s => s.k === 'col').M;
  function scanSteps(R, M) {
    const s = scan(M), rw = R.rows, cl = R.cols, out = [];
    out.push({ en: 'The matrix after the row and column reductions. Scan the <b>rows</b> first: a row with exactly one unmarked zero gets it <b>boxed</b> (assigned), and the other zeros in that column are <b>crossed</b>.', ar: 'دي الـ matrix بعد الـ row والـ column reduction. بنبدأ بالـ <b>rows</b>: الصف اللي فيه صفر واحد بس مش متعلّم بنعمله <b>box</b> (assign)، وبنشطب باقي الأصفار اللي في عموده.', box: Array(M.length).fill(-1), cr: new Set(), hot: null });
    let colIntro = false;
    for (const e of s.ev) {
      let en, ar;
      if (e.t === 'c' && !colIntro) colIntro = true;
      const cin = e.t === 'c' && colIntro && !out.some(o => o.col) ? 'Column scanning: ' : '', cinA = cin ? 'الـ column scanning: ' : '';
      if (e.t === 'r' && e.j != null) {
        en = `Row ${rw[e.i]}: exactly one unmarked zero (column ${cl[e.j]}). Box it` + (e.x.length ? ` and cross the other zero${e.x.length > 1 ? 's' : ''} in column ${cl[e.j]} (row ${list(e.x.map(r => rw[r]))}).` : '; its column has no other zero.');
        ar = `الصف ${I(rw[e.i])} فيه صفر واحد بس مش متعلّم في العمود ${I(cl[e.j])}، فبنعمله box` + (e.x.length ? ` ونشطب باقي الأصفار اللي في العمود ده (الصف ${arList(e.x.map(r => rw[r]))}).` : '، ومفيش أصفار تانية في عموده.');
      } else if (e.t === 'r') {
        en = `Row ${rw[e.i]}: ` + (e.has ? 'already has a box, skip.' : e.skip ? `${e.skip} unmarked zeros, skip it for now.` : 'no unmarked zero (its zero is crossed), skip.');
        ar = `الصف ${I(rw[e.i])} ` + (e.has ? 'فيه box خلاص، فبنعدّيه.' : e.skip ? `فيه ${e.skip === 2 ? 'صفرين' : I(e.skip) + ' أصفار'} مش متعلّمين، فبنعدّيه دلوقتي.` : 'مفيهوش صفر مش متعلّم (الصفر بتاعه متشطب)، فبنعدّيه.');
      } else if (e.t === 'c' && e.i != null) {
        en = cin + `column ${cl[e.j]}: exactly one unmarked zero (row ${rw[e.i]}). Box it` + (e.x.length ? ` and cross the other zero${e.x.length > 1 ? 's' : ''} in row ${rw[e.i]} (column ${list(e.x.map(c => cl[c]))}).` : '; its row has no other zero.');
        ar = cinA + `العمود ${I(cl[e.j])} فيه صفر واحد بس مش متعلّم في الصف ${I(rw[e.i])}، فبنعمله box` + (e.x.length ? ` ونشطب باقي الأصفار اللي في الصف ده (العمود ${arList(e.x.map(c => cl[c]))}).` : '، ومفيش أصفار تانية في صفه.');
      } else if (e.t === 'c') {
        en = cin + `column ${cl[e.j]}: ` + (e.has ? 'already has a box, skip.' : e.skip ? `${e.skip} unmarked zeros, skip it.` : 'no unmarked zero, skip.');
        ar = cinA + `العمود ${I(cl[e.j])} ` + (e.has ? 'فيه box خلاص، فبنعدّيه.' : e.skip ? `فيه ${e.skip === 2 ? 'صفرين' : I(e.skip) + ' أصفار'} مش متعلّمين، فبنعدّيه.` : 'مفيهوش صفر مش متعلّم، فبنعدّيه.');
      } else {
        en = `No row or column has exactly one unmarked zero left: box ${rw[e.i]} → ${cl[e.j]} and cross the other zeros in its row and column.`;
        ar = 'مفيش صف ولا عمود فاضل فيه صفر واحد بس مش متعلّم، فبنختار واحد ونعمله box ونشطب باقي الأصفار في صفه وعموده:' + L(`${rw[e.i]} → ${cl[e.j]}`);
      }
      const hot = e.t === 'tie' ? (i, j) => i === e.i && j === e.j : e.t === 'r' ? (i) => i === e.i : (i, j) => j === e.j;
      out.push({ en, ar, box: e.box, cr: e.cr, hot, col: e.t === 'c' });
    }
    const n = M.length, p = list(pr(R, s.box).filter((_, i) => s.box[i] >= 0)), ok = s.cnt === n;
    out.push({ en: `Result: ${s.cnt} boxed zeros (${p}). ${ok ? `${s.cnt} = n, so the assignment is optimal.` : `${s.cnt} &lt; n = ${n}, so it is not optimal yet: go to step 4 (marking).`}`,
      ar: `النتيجة: عندنا ${I(s.cnt)} أصفار عليها box:` + L(p) + (ok ? 'العدد ده يساوي n، يبقى الـ assignment ده optimal.' : `العدد ده أقل من n اللي هي ${I(n)}، يعني لسه مش optimal، فبنروح لـ step 4 (الـ marking).`), box: s.box, cr: s.cr, hot: null });
    return out;
  }
  function ScanInner({ ar, R }) {
    const M = colStage(R), steps = React.useMemo(() => scanSteps(R, M), [R]);
    const [i, ctl] = useSteps(steps.length, 2300), s = steps[i];
    return html`<${React.Fragment}><div className="fig-stage"><${Mx} R=${R} M=${M} o=${{ box: s.box, cr: s.cr, hot: s.hot }} />
      <div className="orv5-key"><span><span className="orv5-bx">0</span> boxed (assigned)</span><span>0<i className="orv5-cr">×</i> crossed</span></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></${React.Fragment}>`;
  }
  function HungScan({ ar }) {
    const [mode, setMode] = useState('ex2');
    return html`<figure className="fig orv5"><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Modes} list=${[['ex2', 'Example 2 (slides 22–26)'], ['p107', 'Page 107 (slides 8–10)']]} mode=${mode} set=${setMode} /></div>
      <${ScanInner} key=${mode} ar=${ar} R=${RED[mode]} /></figure>`;
  }

  /* ── [1.4] step 4: the marking (slides 27-33) ── */
  function markSteps(R, M, extra) {
    const s = scan(M), mk = mark(M, s.box), rw = R.rows, cl = R.cols, out = [], tr = new Set(), tc = new Set();
    out.push({ en: `After step 3 only ${s.cnt} zeros are boxed, fewer than n = ${M.length}. Step 4 finds the fewest lines that cover all the zeros.` + (extra ? ' ' + extra.en : ''), ar: `بعد الـ step 3 عندنا ${I(s.cnt)} أصفار بس عليها box، وده أقل من n اللي هي ${I(M.length)}. الـ step 4 بتجيب أقل عدد خطوط يغطي كل الأصفار.` + (extra ? ' ' + extra.ar : ''), tr: new Set(), tc: new Set() });
    for (const o of mk.ord) {
      let en, ar, hot;
      if (o.t === 'r' && o.from == null) { tr.add(o.i); en = `Tick (√) row ${rw[o.i]}: it has no assignment.`; ar = `بنعلّم (√) الصف ${I(rw[o.i])} لأنه مفيهوش assignment.`; hot = i => i === o.i; }
      else if (o.t === 'c') { tc.add(o.j); en = `Tick column ${cl[o.j]}: it has a zero in the ticked row ${rw[o.from]}.`; ar = `بنعلّم العمود ${I(cl[o.j])} لأن فيه صفر في الصف المتعلّم ${I(rw[o.from])}.`; hot = (i, j) => i === o.from && j === o.j; }
      else { tr.add(o.i); en = `Tick row ${rw[o.i]}: it has the assigned zero of the ticked column ${cl[o.from]}.`; ar = `بنعلّم الصف ${I(rw[o.i])} لأن فيه الـ assigned zero بتاع العمود المتعلّم ${I(cl[o.from])}.`; hot = (i, j) => i === o.i && j === o.from; }
      out.push({ en, ar, tr: new Set(tr), tc: new Set(tc), hot });
    }
    const lr = [...mk.lineR].map(i => rw[i]), lc = [...mk.lineC].map(j => cl[j]), nl = lr.length + lc.length;
    out.push({ en: `No new ticks. Draw lines through the <b>unticked rows</b> (${list(lr)}) and the <b>ticked columns</b> (${list(lc)}): ${nl} lines cover every zero. ${nl} &lt; ${M.length}, so go to step 5.`,
      ar: 'مفيش علامات جديدة. بنرسم خطوط على <b>الصفوف اللي مش متعلّمة</b> و<b>الأعمدة المتعلّمة</b>:' + L(`rows ${list(lr)} + columns ${list(lc)} = ${nl} lines &lt; ${M.length}`) + 'الخطوط دي بتغطي كل الأصفار، وعددها أقل من n، فبنروح لـ step 5.', tr: new Set(tr), tc: new Set(tc), lr: mk.lineR, lc: mk.lineC });
    return { out, box: s.box, cr: s.cr };
  }
  function MarkInner({ ar, R, note, extra }) {
    const M = colStage(R), D = React.useMemo(() => markSteps(R, M, extra), [R]), steps = D.out;
    const [i, ctl] = useSteps(steps.length, 2500), s = steps[i];
    return html`<${React.Fragment}><div className="fig-stage"><${Mx} R=${R} M=${M} o=${{ box: D.box, cr: D.cr, tickR: s.tr, tickC: s.tc, lineR: s.lr, lineC: s.lc, hot: s.hot }} />
      ${note && html`<div className="orv5-key"><span>${note}</span></div>`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></${React.Fragment}>`;
  }
  const EX2NOTE = { en: 'Row scanning boxes J1\'s only zero first (slides 22–26), so here J3 is the row left without an assignment; the notes\' text starts from J1 instead. Either way the lines are rows J2, J4 and column P4, and θ = 1.', ar: 'الـ row scanning بيعمل box للصفر الوحيد في J1 الأول (slides 22–26)، فهنا الصف اللي فاضل من غير assignment هو J3، والنوتس بتبدأ من J1 بدل كده. وفي الحالتين الخطوط على الصفين J2 و J4 والعمود P4، والـ θ بتساوي 1.' };
  function HungMark({ ar }) {
    const [mode, setMode] = useState('ex2');
    return html`<figure className="fig orv5"><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Modes} list=${[['ex2', 'Example 2 (slides 28–33)'], ['sh1', 'Sheet 1']]} mode=${mode} set=${setMode} /></div>
      <${MarkInner} key=${mode} ar=${ar} R=${RED[mode]} note=${mode === 'ex2' ? 'assignments as on slides 24–26' : null} extra=${mode === 'ex2' ? EX2NOTE : null} /></figure>`;
  }

  /* ── [1.5] step 5: θ and the three kinds of entry (slides 34-37); tap an entry ── */
  function ThetaInner({ ar, R }) {
    const s = R.st.find(x => x.k === 'theta'), M = s.M, rw = R.rows, cl = R.cols, th = fmt(s.th);
    const [sel, setSel] = useState(null);
    const steps = [
      { en: 'The lines from step 4. Every entry is <b>uncovered</b>, on <b>one line</b>, or where <b>two lines</b> cross.', ar: 'دي الخطوط اللي طلعت من الـ step 4. كل رقم يا إما <b>مش متغطي</b>، يا إما عليه <b>خط واحد</b>، يا إما عند <b>تقاطع خطين</b>.' },
      { en: `θ = the smallest uncovered entry = <b>${th}</b> (row ${rw[s.at[0]]}, column ${cl[s.at[1]]}).`, ar: 'الـ θ هي أصغر رقم مش متغطي:' + L(`θ = ${th} (${rw[s.at[0]]}, ${cl[s.at[1]]})`) },
      { en: `Uncovered entries: <b>C − θ</b> (subtract ${th}).`, ar: 'الأرقام اللي مش متغطية بتبقى:' + L(`C − θ = C − ${th}`) },
      { en: `Entries where two lines cross: <b>C + θ</b> (add ${th}).`, ar: 'الأرقام اللي عند تقاطع خطين بتبقى:' + L(`C + θ = C + ${th}`) },
      { en: 'Entries on one line: <b>C</b>, no change. The new matrix has a new zero; return to step 3.', ar: 'الأرقام اللي عليها خط واحد بتفضل C زي ما هي. الـ matrix الجديدة فيها صفر جديد، ونرجع لـ step 3.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2500);
    useEffect(() => setSel(null), [i]);
    const k = (a, b) => kind(s.lineR, s.lineC, a, b);
    const delta = (a, b) => { const t = k(a, b); if (t === 0 && i >= 2 && i < 4) return ['m', '−' + th]; if (t === 2 && i === 3) return ['p', '+' + th]; return null; };
    const showNew = i === 4, MM = showNew ? s.M2 : M;
    const nz = new Set(); if (showNew) s.M2.forEach((r, a) => r.forEach((v, b) => { if (v === 0 && M[a][b] !== 0) nz.add(K(a, b)); }));
    const hot = i === 1 ? (a, b) => a === s.at[0] && b === s.at[1] : i === 2 ? (a, b) => k(a, b) === 0 : i === 3 ? (a, b) => k(a, b) === 2 : null;
    let cap = steps[i];
    if (sel) {
      const [a, b] = sel, t = k(a, b), v = M[a][b], nv = s.M2[a][b], at = `${rw[a]}, ${cl[b]}`;
      const lines = [s.lineR.has(a) ? 'row ' + rw[a] : null, s.lineC.has(b) ? 'column ' + cl[b] : null].filter(Boolean);
      if (t === 0) cap = { en: `Entry (${at}) = ${fmt(v)} is <b>uncovered</b>: ${fmt(v)} − ${th} = <b>${fmt(nv)}</b>.`, ar: 'الرقم ده <b>مش متغطي</b>، فبيقل بـ θ:' + L(`(${at}): ${fmt(v)} − ${th} = ${fmt(nv)}`) };
      else if (t === 2) cap = { en: `Entry (${at}) = ${fmt(v)} is where <b>two lines</b> cross (${lines.join(' and ')}): ${fmt(v)} + ${th} = <b>${fmt(nv)}</b>.`, ar: 'الرقم ده عند <b>تقاطع خطين</b>، فبيزيد بـ θ:' + L(`(${at}): ${fmt(v)} + ${th} = ${fmt(nv)}`) };
      else cap = { en: `Entry (${at}) = ${fmt(v)} has <b>one line</b> (${lines[0]}): it stays ${fmt(v)}.`, ar: 'الرقم ده عليه <b>خط واحد</b>، فبيفضل زي ما هو:' + L(`(${at}): ${fmt(v)}`) };
    }
    return html`<${React.Fragment}><div className="fig-stage"><${Mx} R=${R} M=${MM} o=${{ lineR: showNew ? null : s.lineR, lineC: showNew ? null : s.lineC, un: !showNew && i >= 1, hot: sel ? null : hot, delta: showNew ? null : delta, bold: nz, tap: (a, b) => setSel([a, b]), sel }} />
      <div className="orv5-key"><span>tap an entry to see its rule</span></div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></${React.Fragment}>`;
  }
  function HungTheta({ ar }) {
    const [mode, setMode] = useState('ex2');
    return html`<figure className="fig orv5"><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Modes} list=${[['ex2', 'Example 2 (slides 34–37)'], ['sh1', 'Sheet 1']]} mode=${mode} set=${setMode} /></div>
      <${ThetaInner} key=${mode} ar=${ar} R=${RED[mode]} /></figure>`;
  }

  /* ── [1] the method as a flowchart ── */
  function HungFlow({ ar }) {
    const steps = [
      { en: '<b>Step 1:</b> subtract the minimum of each row from every entry of that row.', ar: 'الـ <b>Step 1</b>: اطرح أصغر رقم في كل صف من كل أرقام الصف ده.' },
      { en: '<b>Step 2:</b> subtract the minimum of each column from every entry of that column.', ar: 'الـ <b>Step 2</b>: اطرح أصغر رقم في كل عمود من كل أرقام العمود ده.' },
      { en: '<b>Step 3:</b> cover all zeros with the minimum number of lines (row scanning, then column scanning, boxing the assigned zeros).', ar: 'الـ <b>Step 3</b>: غطّي كل الأصفار بأقل عدد من الخطوط (الـ row scanning وبعدين الـ column scanning، ونعمل box للأصفار اللي اتعملها assign).' },
      { en: 'Test: is the number of lines (boxed assignments) equal to n?', ar: 'الاختبار: هل عدد الخطوط (يعني عدد الـ assignments اللي عليها box) يساوي n؟' },
      { en: '<b>Yes:</b> the assignment is optimal. Read the total cost from the original matrix.', ar: 'لو <b>أيوه</b> يبقى الـ assignment ده optimal، والتكلفة الكلية بتتقري من الـ matrix الأصلية.' },
      { en: '<b>No → Step 4:</b> tick rows without an assignment, then columns with a zero in a ticked row, then rows with an assigned zero in a ticked column; lines through unticked rows and ticked columns.', ar: 'لو <b>لأ</b> نروح لـ <b>Step 4</b>: علّم الصفوف اللي مافيهاش assignment، وبعدين الأعمدة اللي فيها صفر في صف متعلّم، وبعدين الصفوف اللي فيها assigned zero في عمود متعلّم، والخطوط على الصفوف اللي مش متعلّمة والأعمدة المتعلّمة.' },
      { en: '<b>Step 5:</b> θ = smallest uncovered entry; uncovered C − θ, one line C, two lines C + θ.', ar: 'الـ <b>Step 5</b>: الـ θ هي أصغر رقم مش متغطي، والأرقام بتتعدّل كده:' + L('uncovered: C − θ, one line: C, two lines: C + θ') },
      { en: '<b>Return to step 3</b> and test again, until the lines equal n. (Section shortcut: draw the lines through the rows/columns with the most zeros.)', ar: 'وبعدين <b>نرجع لـ step 3</b> ونختبر تاني لحد ما عدد الخطوط يساوي n. (اختصار السكشن: ارسم الخطوط على الصفوف أو الأعمدة اللي فيها أكتر أصفار.)' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const B = (k, head, body, extra) => html`<div className=${'orv5-box ' + (extra || '') + (i === k || (k === 2 && i === 7) ? ' orv5-on' : i > k ? ' orv5-seen' : '')}><b>${head}</b>${body}</div>`;
    return html`<figure className="fig orv5"><div className="fig-stage"><div className="orv5-flow">
      ${B(0, 'Step 1', 'Row reduction')}<div className="orv5-ar">↓</div>
      ${B(1, 'Step 2', 'Column reduction')}<div className="orv5-ar">↓</div>
      ${B(2, 'Step 3', 'Cover all zeros with the fewest lines' + (i === 7 ? '  ↺' : ''))}<div className="orv5-ar">↓</div>
      ${B(3, 'Test', 'lines = n ?', 'orv5-dia')}
      <div className="orv5-two">
        <div><div className="orv5-lab">Yes ↓</div>${B(4, 'Optimal', 'Total cost from the original matrix')}</div>
        <div><div className="orv5-lab">No ↓</div>${B(5, 'Step 4', 'Marking: √ rows and columns, draw lines')}<div className="orv5-ar">↓</div>${B(6, 'Step 5', 'θ: −θ uncovered, +θ at crossings')}<div className=${'orv5-lab ' + pop(i >= 7)} style=${{ color: 'var(--fig-k)' }}>↺ back to Step 3</div></div>
      </div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6] solver: the sheet and exam matrices, or your own ── */
  const OWN0 = '1 4 6 3\n9 7 10 9\n4 5 11 7\n8 7 8 5';
  function parseOwn(t, max) {
    const rows = t.trim().split(/\n+/).map(l => l.trim().split(/[\s,]+/).filter(Boolean).map(Number)).filter(r => r.length);
    if (rows.length < 2 || rows.length > 6) return { err: 'Type 2 to 6 rows, one row per line.' };
    const w = rows[0].length;
    if (w < 2 || w > 6) return { err: 'Each row needs 2 to 6 numbers.' };
    if (rows.some(r => r.length !== w)) return { err: 'Every row needs the same number of entries.' };
    if (rows.some(r => r.some(v => !isFinite(v)))) return { err: 'Only numbers, please.' };
    return { P: { name: 'own', rows: rows.map((_, i) => String(i + 1)), cols: rows[0].map((_, j) => String.fromCharCode(65 + j)), c: rows, max } };
  }
  function HungSolver({ ar }) {
    const [mode, setMode] = useState('sh1'), [txt, setTxt] = useState(OWN0), [max, setMax] = useState(false);
    const own = mode === 'own', parsed = React.useMemo(() => own ? parseOwn(txt, max) : null, [own, txt, max]);
    const P = own ? parsed.P : PRE[mode];
    const NOTE = { sh1: 'Sheet 1 / Final Aug 2022/23 Q2: rows 1-4, columns A-D.', y23: '2023/24 (3rd yr): jobs J1-J4, persons P1-P4. The marking gives lines J3, J4 and P1; the model answer covers with P1, P4 and J4: same θ = 10, same total.', y19: '2019/20: programmers and jobs J1-J4.', p107: 'Lecture example, page 107.', ex2: 'Lecture example 2: jobs J1-J4, persons P1-P4.' };
    return html`<figure className="fig orv5"><div className="fig-stage" style=${{ paddingBottom: 0 }}>
      <${Modes} list=${[['sh1', 'Sheet 1'], ['y23', '2023/24'], ['y19', '2019/20'], ['p107', 'Page 107'], ['ex2', 'Example 2'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${own ? html`<div className="orv5-ed">
          <textarea rows="4" value=${txt} onInput=${e => setTxt(e.target.value)} aria-label="Cost matrix, one row per line" spellCheck="false"></textarea>
          <label><input type="checkbox" checked=${max} onChange=${e => setMax(e.target.checked)} /> Maximization (profits): subtract from the largest entry</label>
          <span className="orv5-lab" style=${{ textAlign: 'left', fontWeight: 400 }}>Rows are 1, 2, …; columns A, B, … A non-square matrix gets a dummy row or column of zeros.</span>
        </div>` : html`<p className="orv5-lab" style=${{ margin: '0 0 6px', fontWeight: 400 }}>${NOTE[mode]}</p>`}
      </div>
      ${P ? html`<${Walk} key=${own ? 'own' + JSON.stringify(P) : mode} ar=${ar} P=${P} ms=${2600} />` : html`<p className="orv5-err">${parsed.err}</p>`}</figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'or-assign-model': AssignModel,
    'or-hungarian-scan': HungScan,
    'or-hungarian-mark': HungMark,
    'or-hungarian-theta': HungTheta,
    'or-hungarian-flow': HungFlow,
    'or-hungarian-p107': P107Walk,
    'or-hungarian-ex2': Ex2Walk,
    'or-hungarian-solver': HungSolver
  });
})();
/* ── part L3 ── */
// Operations Research visuals, Lecture 3 (LP simplex method): the key terms on the lecture tableau, slack variables as unused machine hours, the 7-step procedure as a loop, the pivot as a move between corners of the graph, the section's rectangle shortcut, the slide 13 pivot figure, reading the optimal tableau, the lecture and revision examples pivot by pivot, a simplex simulator for the exam tableaux, and building the dual (Final 2021/22). Every label and number comes from the site's notes or is computed with the notes' rules.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.orv3 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.orv3 .fig-cap .ltr{ text-align:left; font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
.orv3-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.orv3-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.orv3-tt{ max-width:460px; margin:6px auto 2px; font-size:.8rem; color:var(--graphite); text-align:left; }
.orv3-tb{ width:100%; max-width:460px; margin:0 auto; border-collapse:collapse; font:12.5px/1.3 var(--mono); color:var(--ink); background:var(--paper); }
.orv3-tb th, .orv3-tb td{ border:1px solid var(--line); padding:5px 2px; text-align:center; white-space:nowrap; transition:background .4s, color .4s, box-shadow .4s; }
.orv3-tb th{ background:var(--paper-2); font-weight:600; }
.orv3-tb td.orv3-bs{ font-weight:700; background:var(--paper-2); }
.orv3-tb tr.orv3-z td{ border-top:2px solid var(--graphite); }
.orv3-tb .orv3-pc, .orv3-tb .orv3-pr{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.orv3-tb .orv3-pe{ background:var(--fig-s); color:#fff; font-weight:700; }
.orv3-tb .orv3-mk{ box-shadow:inset 0 0 0 2px var(--fig-k); font-weight:700; }
.orv3-tb .orv3-hot{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); font-weight:700; }
.orv3-tb .orv3-ok{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); font-weight:700; }
.orv3-tb .orv3-sk{ color:var(--graphite); }
.orv3-tb .orv3-em{ color:var(--faint); }
.orv3-tb .orv3-new{ animation:orv3in .6s ease-out; }
.orv3-tb.orv3-tap td:not(.orv3-bs){ cursor:pointer; }
@keyframes orv3in{ from{ background:color-mix(in srgb, var(--ok) 45%, var(--paper)); } to{ } }
.orv3-pills{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:8px 0 0; }
.orv3-pills span{ font-size:.8rem; padding:3px 9px; border-radius:99px; border:1px solid var(--fig-k); color:var(--ink); background:var(--paper); }
.orv3-pills span.orv3-full{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv3-flow{ max-width:440px; margin:0 auto; display:grid; gap:0; }
.orv3-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 10px; font-size:.86rem; line-height:1.35; color:var(--ink); opacity:.5; transition:opacity .4s, box-shadow .4s; }
.orv3-box b{ color:var(--fig-k); }
.orv3-box.orv3-seen{ opacity:.85; } .orv3-box.orv3-on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); }
.orv3-box .orv3-ex{ display:block; margin-top:3px; font:.8rem/1.4 var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
.orv3-box .orv3-br{ display:block; margin-top:3px; font-size:.8rem; color:var(--graphite); }
.orv3-box .orv3-br.orv3-go{ color:var(--pen); font-weight:700; }
.orv3-arr{ text-align:center; color:var(--fig-k); font-size:1rem; line-height:1.2; }
.orv3-arr.orv3-back{ font-size:.8rem; color:var(--graphite); }
.orv3-arr.orv3-back.orv3-go{ color:var(--pen); font-weight:700; }
.orv3-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:420px; }
.orv3-svg text{ fill:var(--ink); font-family:var(--body); }
.orv3-svg text.orv3-mu{ fill:var(--graphite); }
.orv3-dot{ transition:transform 1.6s ease-in-out; }
.orv3-chips{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; margin:8px auto 0; font-size:.84rem; color:var(--ink); max-width:440px; }
.orv3-chips > div{ display:flex; gap:4px; align-items:center; flex-wrap:wrap; }
.orv3-chips i{ font-style:normal; font-family:var(--mono); padding:2px 8px; border-radius:99px; border:1px solid var(--line); background:var(--paper); }
.orv3-chips i.orv3-in{ border-color:var(--ok); box-shadow:0 0 0 1px var(--ok); }
.orv3-chips i.orv3-out{ border-color:var(--pen); box-shadow:0 0 0 1px var(--pen); }
.orv3-bars{ max-width:440px; margin:0 auto; display:grid; gap:10px; font-size:.84rem; color:var(--ink); }
.orv3-bars .orv3-lb{ display:flex; justify-content:space-between; gap:8px; flex-wrap:wrap; margin-bottom:3px; }
.orv3-track{ height:18px; border-radius:6px; background:var(--paper); border:1px solid var(--line); overflow:hidden; display:flex; }
.orv3-track i{ display:block; height:100%; transition:width .4s; }
.orv3-track i.orv3-u{ background:var(--fig-s); } .orv3-track i.orv3-f{ background:color-mix(in srgb, var(--ok) 40%, var(--paper)); }
.orv3-track.orv3-bad{ border-color:var(--pen); box-shadow:0 0 0 1px var(--pen); }
.orv3-sl{ display:flex; align-items:center; gap:8px; max-width:440px; margin:8px auto 0; font:.84rem var(--mono); color:var(--ink); }
.orv3-sl input{ flex:1; min-width:0; accent-color:var(--fig-s); }
.orv3-eq{ max-width:440px; margin:0 auto 8px; font:.84rem/1.55 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 10px; color:var(--ink); overflow-wrap:anywhere; }
.orv3-eq div{ transition:opacity .4s; } .orv3-eq .orv3-dim{ opacity:.4; } .orv3-eq .orv3-on{ color:var(--fig-k); font-weight:700; }
.orv3-eq s{ opacity:.6; }
.orv3-ed{ max-width:440px; margin:0 auto 8px; display:grid; gap:6px; font-size:.86rem; color:var(--ink); }
.orv3-ed .orv3-l{ display:flex; flex-wrap:wrap; align-items:center; gap:4px; }
.orv3-ed input, .orv3-ed select{ width:3.2em; font:inherit; font-size:.86rem; padding:3px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); min-height:30px; }
.orv3-ed select{ width:auto; }
.orv3-ed .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:30px; }
.orv3-msg{ max-width:440px; margin:8px auto 0; text-align:center; font-weight:700; font-size:.9rem; color:var(--ink); }
.orv3-msg.orv3-bad{ color:var(--pen); }
.orv3-nav{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding:0 14px 12px; }
.orv3-nav .orv3-n{ font:.84rem var(--mono); color:var(--graphite); }
.orv3-nav .orv3-g{ flex:1; }
@media (prefers-reduced-motion: reduce){ .orv3-dot, .orv3-tb th, .orv3-tb td, .orv3-box, .orv3-track i, .orv3-eq div{ transition:none; } .orv3-tb .orv3-new{ animation:none; } }
`;
  if (!document.getElementById('orv3-css')) { const s = document.createElement('style'); s.id = 'orv3-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers: text ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const I = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const MI = '−';

  /* ── exact fractions ── */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g + 0, d: d / g }; };
  const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
  const sub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => F(a.n * b.n, a.d * b.d);
  const dvd = (a, b) => F(a.n * b.d, a.d * b.n);
  const sg = a => Math.sign(a.n), num = a => a.n / a.d, lt = (a, b) => a.n * b.d < b.n * a.d, ab = a => F(Math.abs(a.n), a.d);
  const ZERO = F(0);
  function pf(s) {
    s = String(s).trim().replace(/−/g, '-'); if (!s) return null;
    let m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/); if (m) return +m[2] ? F(+m[1], +m[2]) : null;
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    const k = (s.split('.')[1] || '').length; if (k > 5) return null;
    return F(Math.round(parseFloat(s) * 10 ** k), 10 ** k);
  }
  const fs = (a, dec) => {
    if (a.d === 1) return (a.n < 0 ? MI : '') + Math.abs(a.n);
    if (!dec) return (a.n < 0 ? MI : '') + Math.abs(a.n) + '/' + a.d;
    let r = Math.round(num(a) * 100) / 100; if (Object.is(r, -0)) r = 0; return (r < 0 ? MI : '') + String(Math.abs(r));
  };
  const pn = (v, dec) => sg(v) < 0 || (v.d !== 1 && !dec) ? '(' + fs(v, dec) + ')' : fs(v, dec);
  const vec = (r, dec) => '(' + r.slice(0, -1).map(v => fs(v, dec)).join(', ') + ' | ' + fs(r[r.length - 1], dec) + ')';

  /* ── the simplex rules of the lecture ── */
  const mk = (vars, basis, rows) => ({ vars, basis: basis.concat('Z'), rows: rows.map(r => r.split(' ').map(pf)) });
  const zRow = T => T.rows[T.rows.length - 1];
  function pickCol(T) { const z = zRow(T); let c = -1; for (let j = 0; j < T.vars.length; j++) if (sg(z[j]) < 0 && (c < 0 || lt(z[j], z[c]))) c = j; return c; }
  const ratiosOf = (T, c) => T.rows.slice(0, -1).map(r => sg(r[c]) > 0 ? dvd(r[r.length - 1], r[c]) : null);
  function pickRow(R) { let r = -1; R.forEach((q, i) => { if (q && sg(q) >= 0 && (r < 0 || lt(q, R[r]))) r = i; }); return r; }
  function pivot(T, r, c) {
    const p = T.rows[r][c], np = T.rows[r].map(v => dvd(v, p));
    const rows = T.rows.map((row, i) => i === r ? np : row.map((v, j) => sub(v, mul(row[c], np[j]))));
    const basis = T.basis.slice(); basis[r] = T.vars[c]; return { vars: T.vars, basis, rows };
  }
  const rn = (T, i) => i === T.rows.length - 1 ? 'Z' : 'R' + (i + 1);
  const bOf = (T, i) => T.rows[i][T.vars.length];
  function solution(T, dec) {
    const m = T.rows.length - 1, bas = T.basis.slice(0, -1).map((v, i) => `${v} = ${fs(bOf(T, i), dec)}`).join(', ');
    const non = T.vars.filter(v => !T.basis.includes(v));
    return { bas, non: non.length ? non.join(' = ') + ' = 0' : '', z: fs(bOf(T, m), dec) };
  }

  /* ── the course's tableaux ── */
  const V2 = ['x1', 'x2', 's1', 's2'], V3 = ['x1', 'x2', 's1', 's2', 's3'];
  const LEC = mk(V2, ['s1', 's2'], ['2 1 1 0 8', '2 3 0 1 12', '-3 -1 0 0 0']);
  const REV = mk(V2, ['s1', 's2'], ['1 4 1 0 4', '3 5 0 1 24', '-8 -5 0 0 0']);
  const LECOPT = pivot(LEC, 0, 0);
  const PRE = [
    { key: 'lec', t: 'Lecture', T: LEC, dec: false, note: ['Lecture: Max Z = 3x1 + x2.', 'مثال المحاضرة:' + L('Max Z = 3x1 + x2')] },
    { key: 'rev', t: 'Revision', T: REV, dec: false, note: ['Revision: Max Z = 8x1 + 5x2.', 'مثال الـ Revision:' + L('Max Z = 8x1 + 5x2')] },
    { key: 'p26', t: '2025/26', T: mk(V2, ['s1', 's2'], ['5 2 1 0 20', '4 7 0 1 28', '-7 -6 0 0 0']), dec: true, note: ['Exam 2025/26: after one pivot Z = 28, not yet optimal (Z row still has −3.2).', 'امتحان ' + I('2025/26') + ' بعد pivot واحد بيدّي ' + I('Z = 28') + '، ولسه مش optimal لأن صف الـ Z فيه ' + I('−3.2') + '.'] },
    { key: 'p25', t: '2024/25', T: mk(V2, ['s1', 's2'], ['3 6 1 0 12', '2 9 0 1 18', '-12 -7 0 0 0']), dec: false, note: ['Exam 2024/25: one pivot reaches the optimum, Z = 48.', 'امتحان ' + I('2024/25') + ' بيوصل للـ optimum بعد pivot واحد، و' + I('Z = 48') + '.'] },
    { key: 'aug', t: 'Aug 2023/24', T: mk(V2, ['x1', 's2'], ['1 1/2 1/2 0 3', '0 3/2 -5/2 1 5', '0 -20 60 0 360']), dec: true, note: ['August 2023/24: the tableau is already one pivot in; pivot column x2.', 'امتحان أغسطس ' + I('2023/24') + ' الـ tableau فيه pivot قبل كده، والـ pivot column هو الـ x2.'] },
    { key: 'y3', t: '2023/24 (3rd yr)', T: mk(V3, ['s1', 's2', 'x2'], ['4/5 0 1 0 -1/5 3', '7/5 0 0 1 -3/5 4', '1/5 1 0 0 1/5 7', '-22/5 0 0 0 8/5 56']), dec: false, note: ['2023/24 (third year): pivot column x1, pivot 7/5 (not 1/5).', 'امتحان ' + I('2023/24') + ' (تالتة) الـ pivot column هو الـ x1 والـ pivot هو ' + I('7/5') + ' مش ' + I('1/5') + '.'] },
    { key: 'y2', t: '2023/24 (2nd yr)', T: mk(V3, ['s1', 'x1', 's3'], ['0 5/2 1 -5/6 0 50', '1 1/2 0 1/6 0 30', '0 1 0 -4/3 1 160', '0 -3/2 0 5/6 0 150']), dec: false, note: ['2023/24 (second year): pivot column x2, pivot 5/2 (not 1/2).', 'امتحان ' + I('2023/24') + ' (تانية) الـ pivot column هو الـ x2 والـ pivot هو ' + I('5/2') + ' مش ' + I('1/2') + '.'] },
    { key: 'j23', t: 'Jan 2022/23', T: mk(V3, ['s1', 's2', 's3'], ['1 1 1 0 0 20', '2 1 0 1 0 35', '-3 1 0 0 1 12', '-5 -4 0 0 0 0']), dec: true, note: ['January 2022/23: the s3 row has −3 in the pivot column, so it gets no ratio.', 'امتحان يناير ' + I('2022/23') + ' صف الـ s3 فيه ' + I('−3') + ' في الـ pivot column، فمالوش ratio.'] }
  ];

  /* ── one tableau ── */
  function Tab({ T, dec, hc = -1, hr = -1, rat, mark, onCell, title, newRow = -1, blank, basis }) {
    const nv = T.vars.length, m = T.rows.length - 1, B = basis || T.basis;
    const cls = (i, j) => { const k = []; if (j === hc && i !== -2) k.push(i === hr ? 'orv3-pe' : 'orv3-pc'); else if (i === hr && j >= -1) k.push('orv3-pr'); const x = mark && mark(i, j); if (x) k.push(x); if (i === newRow) k.push('orv3-new'); return k.join(' '); };
    return html`<div>${title && html`<div className="orv3-tt">${title}</div>`}<table className=${'orv3-tb' + (onCell ? ' orv3-tap' : '')}><thead><tr>
      <th className=${mark && mark(-2, -1) || ''}>Basic</th>${T.vars.map((v, j) => html`<th key=${v} className=${(j === hc ? 'orv3-pc ' : '') + (mark && mark(-2, j) || '')}>${v}</th>`)}<th className=${mark && mark(-2, nv) || ''}>b</th>${rat && html`<th>Ratio</th>`}</tr></thead>
      <tbody>${T.rows.map((r, i) => { const em = blank && blank[i]; return html`<tr key=${i + (em ? 'e' : 'f')} className=${i === m ? 'orv3-z' : ''}>
        <td className=${'orv3-bs ' + cls(i, -1)}>${em ? '·' : B[i]}</td>
        ${r.map((v, j) => html`<td key=${j} className=${cls(i, j) + (em ? ' orv3-em' : '')} onClick=${onCell ? () => onCell(i, j) : null}>${em ? '·' : (typeof v === 'string' ? v : fs(v, dec))}</td>`)}
        ${rat && html`<td className=${i < m && rat[i] === 'skip' ? 'orv3-sk' : i === hr ? 'orv3-pr' : ''}>${i < m ? rat[i] : ''}</td>`}</tr>`; })}</tbody></table></div>`;
  }
  const Modes = ({ list, mode, set }) => html`<div className="orv3-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Nav = ({ i, n, ctl }) => html`<div className="orv3-nav"><span className="orv3-n">${i + 1} / ${n}</span><span className="orv3-g"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;

  /* ── the method, pivot by pivot ── */
  function runSteps(T0, dec) {
    const f = v => fs(v, dec), out = [];
    let T = T0, k = 0;
    const s0 = solution(T, dec);
    out.push({ T, en: `Start: the basic variables are ${T.basis.slice(0, -1).join(', ')} (values in b); every other variable is non-basic = 0. So ${s0.bas}${s0.non ? '; ' + s0.non : ''}; Z = ${s0.z}.`,
      ar: 'في البداية الـ basic variables قيمها من عمود الـ b، وكل الباقي non-basic بصفر:' + L(`${s0.bas}${s0.non ? ' ; ' + s0.non : ''} ; Z = ${s0.z}`) });
    while (k < 8) {
      const c = pickCol(T), m = T.rows.length - 1, z = zRow(T);
      if (c < 0) {
        const s = solution(T, dec);
        out.push({ T, mark: (i, j) => i === m && j >= 0 && j < T.vars.length ? 'orv3-ok' : j === T.vars.length && i >= 0 ? 'orv3-mk' : '', end: 'opt',
          en: `No negative numbers in the bottom row (excluding b) → <b>optimal</b>. Basic variables = b: ${s.bas}${s.non ? '; non-basic: ' + s.non : ''}; <b>Z = ${s.z}</b>.`,
          ar: 'مفيش أرقام سالبة في صف الـ Z (من غير الـ b)، يعني الحل <b>optimal</b>. الـ basic variables قيمها من الـ b والـ non-basic بصفر:' + L(`${s.bas}${s.non ? ' ; ' + s.non : ''} ; Z = ${s.z}`) });
        break;
      }
      out.push({ T, hc: c, en: `Bottom (Z) row: the most negative entry is <b>${f(z[c])}</b> under <b>${T.vars[c]}</b>, so ${T.vars[c]} is the <b>pivot column</b> (entering variable).`,
        ar: `في صف الـ Z أكتر رقم سالب هو ${I(f(z[c]))} تحت الـ ${I(T.vars[c])}، فده الـ <b>pivot column</b> والـ ${I(T.vars[c])} هو الـ entering variable.` });
      const R = ratiosOf(T, c), r = pickRow(R), rat = R.map(q => q ? f(q) : 'skip');
      const calc = R.map((q, i) => q ? `${pn(bOf(T, i), dec)}/${pn(T.rows[i][c], dec)} = ${f(q)}` : `${T.basis[i]}: ${f(T.rows[i][c])} ≤ 0 → skip`).join(' ; ');
      if (r < 0) {
        out.push({ T, hc: c, rat, end: 'unb', en: `No positive entry in the pivot column (${calc}): the program has <b>no (bounded) solution</b>.`,
          ar: 'مفيش ولا رقم موجب في الـ pivot column، يعني البرنامج <b>ملوش (bounded) solution</b>:' + L(calc) });
        break;
      }
      out.push({ T, hc: c, rat, en: `Ratios b ÷ positive entries of the pivot column: ${calc}. The Z row never gets a ratio.`,
        ar: 'نقسم كل b على الرقم الموجب اللي قصاده في الـ pivot column، وصف الـ Z مالوش ratio:' + L(calc) });
      const p = T.rows[r][c];
      out.push({ T, hc: c, hr: r, rat, en: `Smallest positive ratio <b>${f(R[r])}</b> → <b>pivot row ${T.basis[r]}</b> (exiting variable). Pivot element = <b>${f(p)}</b>.`,
        ar: `أصغر ratio موجبة هي ${I(f(R[r]))} في صف الـ ${I(T.basis[r])}، فده الـ <b>pivot row</b> والـ ${I(T.basis[r])} هو الـ exiting variable. والـ <b>pivot element</b> هو ${I(f(p))}.` });
      const N = pivot(T, r, c), blank = T.rows.map(() => true);
      blank[r] = false;
      const pr = `new ${rn(T, r)} = ${rn(T, r)} ÷ ${pn(p, dec)} = ${vec(N.rows[r], dec)}`;
      out.push({ T, hc: c, hr: r, rat, N, blank: blank.slice(), nr: r, en: `Row operations. First the pivot row ÷ pivot, so the pivot becomes 1: ${pr}.`,
        ar: 'نبدأ الـ row operations: نقسم الـ pivot row على الـ pivot علشان الـ pivot يبقى واحد:' + L(pr) });
      T.rows.forEach((row, i) => {
        if (i === r) return; blank[i] = false;
        const e = row[c], nm = rn(T, i);
        let t, en, a;
        if (!sg(e)) { t = `new ${nm} = ${nm} = ${vec(row, dec)}`; en = `${nm} already has 0 in the pivot column, so it is copied unchanged: ${t}.`; a = 'الصف ده رقمه في الـ pivot column صفر أصلاً، فبيتنقل زي ما هو:' + L(t); }
        else {
          const sc = N.rows[r].map(v => mul(ab(e), v));
          t = `new ${nm} = ${nm} ${sg(e) > 0 ? '−' : '+'} ${pn(ab(e), dec)} × new ${rn(T, r)} = ${vec(row, dec)} ${sg(e) > 0 ? '−' : '+'} ${vec(sc, dec)} = ${vec(N.rows[i], dec)}`;
          en = `Make the ${f(e)} in the pivot column 0: ${t}.`; a = 'وبعدين نصفّر رقم الـ pivot column في الصف ده:' + L(t);
        }
        out.push({ T, hc: c, hr: r, rat, N, blank: blank.slice(), nr: i, en, ar: a });
      });
      const z0 = bOf(T, T.rows.length - 1), z1 = bOf(N, N.rows.length - 1), ent = T.vars[c], ex = T.basis[r];
      T = N; k++;
      out.push({ T, mark: (i, j) => i === r && j === -1 ? 'orv3-ok' : i === T.rows.length - 1 && j === T.vars.length ? 'orv3-mk' : '',
        en: `New tableau: <b>${ent}</b> replaced <b>${ex}</b> in the Basic column; Z: ${f(z0)} → ${f(z1)}${lt(z0, z1) ? ' (increased)' : ' (stayed the same)'}.`,
        ar: `ده الـ tableau الجديد: الـ ${I(ent)} خد مكان الـ ${I(ex)} في عمود الـ Basic، والـ Z ${lt(z0, z1) ? 'زاد' : 'فضل زي ما هو'}:` + L(`Z: ${f(z0)} → ${f(z1)}`) });
    }
    return out;
  }
  function RunBody({ ar, T, dec, label, ms, note, top }) {
    const [d, setD] = useState(!!dec);
    const steps = runSteps(T, d), [i, ctl] = useSteps(steps.length, ms || 2800), s = steps[Math.min(i, steps.length - 1)];
    return html`<div className="fig-stage">${top}
      <div className="orv3-row" role="group"><button className="fig-btn" aria-pressed=${String(!d)} onClick=${() => setD(false)}>Fractions</button><button className="fig-btn" aria-pressed=${String(d)} onClick=${() => setD(true)}>Decimals</button></div>
      <div role="img" aria-label=${label || 'Simplex tableau, pivot by pivot'}>
      <${Tab} T=${s.T} dec=${d} hc=${s.hc} hr=${s.hr} rat=${s.rat} mark=${s.mark} title=${s.N ? 'Old tableau' : 'Tableau'} />
      ${s.N && html`<div style=${{ height: '6px' }}></div><${Tab} T=${s.N} dec=${d} blank=${s.blank} newRow=${s.nr} title="New tableau" />`}
      ${s.end && html`<p className=${'orv3-msg' + (s.end === 'unb' ? ' orv3-bad' : '')}>${s.end === 'opt' ? 'Optimal: Z = ' + fs(bOf(s.T, s.T.rows.length - 1), d) : 'No (bounded) solution'}</p>`}
      </div></div>
      <${Cap} en=${(note && (i === 0 || s.end) ? note[0] + ' ' : '') + s.en} ar=${(note && (i === 0 || s.end) ? note[1] + ' ' : '') + s.ar} showAr=${ar} /><${Nav} i=${i} n=${steps.length} ctl=${ctl} />`;
  }

  /* ── [0] the key terms on the lecture's initial tableau ── */
  const TERMS = {
    sim: ['Simplex method', '<b>Simplex method</b>: proceeds from one basic feasible solution (a tableau) to another, increasing Z each time, until optimality is reached. It is most useful with more decision variables and more constraints; the graphical method handles only two variables and few constraints.',
      'الـ <b>simplex method</b> بتنقل من basic feasible solution (يعني tableau) للي بعده، والـ Z بيزيد كل مرة لحد ما نوصل للـ optimal. وهي مفيدة أكتر لما يبقى فيه decision variables و constraints كتير، لأن الـ graphical method بتشتغل مع متغيرين بس و constraints قليلة.'],
    sl: ['Slack variable', '<b>Slack variables</b> s1, s2 turn the ≤ constraints into equations: 2x1 + x2 + s1 = 8 and 2x1 + 3x2 + s2 = 12. They measure unused resource (hours of machines A and B).',
      'الـ <b>slack variables</b> (الـ s1 والـ s2) بيحوّلوا الـ constraints اللي فيها ' + I('≤') + ' لـ equations:' + L('2x1 + x2 + s1 = 8 ; 2x1 + 3x2 + s2 = 12') + 'وهما بيقيسوا الـ resource اللي مش مستخدم (ساعات المكنة A والمكنة B).'],
    ba: ['Basic', '<b>Basic variables</b>: the first column of the tableau (initially the slacks); their values are read from b: s1 = 8, s2 = 12.',
      'الـ <b>basic variables</b> هما اللي في أول عمود في الـ tableau (في الأول الـ slacks)، وقيمهم بنقراها من الـ b:' + L('s1 = 8, s2 = 12')],
    nb: ['Non-basic', '<b>Non-basic variables</b>: all the others, set to 0 (initially the decision variables): x1 = x2 = 0, so Z = 0.',
      'الـ <b>non-basic variables</b> هما كل الباقي وقيمتهم صفر (في الأول الـ decision variables):' + L('x1 = x2 = 0 → Z = 0')],
    pc: ['Pivot column', '<b>Pivot column</b>: the most negative entry of the bottom (Z) row, excluding b: −3 under x1. x1 is the entering variable.',
      'الـ <b>pivot column</b> هو اللي فيه أكتر رقم سالب في صف الـ Z (من غير الـ b)، وهنا ' + I('−3') + ' تحت الـ x1، فالـ x1 هو الـ entering variable.'],
    pr: ['Pivot row', '<b>Pivot row</b>: the smallest positive ratio b ÷ (positive pivot-column entry): 8/2 = 4 beats 12/2 = 6, so the s1 row. s1 is the exiting variable.',
      'الـ <b>pivot row</b> هو اللي ليه أصغر ratio موجبة:' + L('8/2 = 4 &lt; 12/2 = 6') + 'يعني صف الـ s1، والـ s1 هو الـ exiting variable.'],
    pe: ['Pivot element', '<b>Pivot element</b>: the intersection of the pivot column and the pivot row: 2. It must be positive (never zero or negative).',
      'الـ <b>pivot element</b> هو اللي عند تقاطع الـ pivot column مع الـ pivot row، وهنا ' + I('2') + '. ولازم يبقى موجب (عمره ما يبقى صفر أو سالب).']
  };
  function Terms({ ar }) {
    const [t, setT] = useState('sl');
    const mark = (i, j) => {
      if (t === 'sl') return (j === 2 || j === 3) ? 'orv3-mk' : '';
      if (t === 'ba') return (i >= 0 && i < 2 && (j === -1 || j === 4)) ? 'orv3-mk' : '';
      if (t === 'nb') return (j === 0 || j === 1) && i !== 2 ? 'orv3-mk' : '';
      return '';
    };
    const hc = ['pc', 'pr', 'pe'].includes(t) ? 0 : -1, hr = ['pr', 'pe'].includes(t) ? 0 : -1;
    const rat = ['pr', 'pe'].includes(t) ? ['8/2=4', '12/2=6'] : null;
    return html`<figure className="fig orv3"><div className="fig-stage">
      <${Modes} list=${Object.keys(TERMS).map(k => [k, TERMS[k][0]])} mode=${t} set=${setT} />
      <div role="img" aria-label="The initial simplex tableau of the lecture example with the chosen term highlighted">
      <${Tab} T=${LEC} hc=${t === 'pe' ? 0 : hc} hr=${t === 'pc' ? -1 : hr} rat=${rat} mark=${mark} title="Initial tableau: Max Z = 3x1 + x2" /></div>
      </div><${Cap} en=${TERMS[t][1]} ar=${TERMS[t][2]} showAr=${ar} /></figure>`;
  }

  /* ── [1.0] slack = unused machine hours ── */
  function Slack({ ar }) {
    const [x, setX] = useState([0, 0]), [x1, x2] = x;
    const s1 = 8 - (2 * x1 + x2), s2 = 12 - (2 * x1 + 3 * x2), z = 3 * x1 + x2, okk = s1 >= 0 && s2 >= 0;
    const n = v => (v < 0 ? MI : '') + Math.abs(v);
    const c1 = `s1 = 8 − (2×${n(x1)} + ${n(x2)}) = ${n(s1)}`, c2 = `s2 = 12 − (2×${n(x1)} + 3×${n(x2)}) = ${n(s2)}`;
    const bar = (used, cap, s) => html`<div className=${'orv3-track' + (s < 0 ? ' orv3-bad' : '')}><i className="orv3-u" style=${{ width: Math.min(100, used / cap * 100) + '%' }}></i><i className="orv3-f" style=${{ width: Math.max(0, s / cap * 100) + '%' }}></i></div>`;
    const en = `Machine A: ${c1} unused hours. Machine B: ${c2}. ${okk ? `Both slacks ≥ 0, so (${n(x1)}, ${n(x2)}) is feasible and Z − 3x1 − x2 = 0 gives Z = ${n(z)}.` : 'A slack is negative: this point breaks a constraint (slacks must be ≥ 0).'}`;
    const a = 'الـ slack هو الجزء اللي مش مستخدم من ساعات المكنة:' + L(c1) + L(c2) + (okk ? 'والاتنين مش سالبين، فالنقطة feasible، والـ Z بتطلع كده:' + L(`Z − 3x1 − x2 = 0 → Z = ${n(z)}`) : 'وفيه slack سالب، يعني النقطة دي بتكسر constraint (والـ slack لازم يبقى ' + I('≥ 0') + ').');
    return html`<figure className="fig orv3"><div className="fig-stage">
      <${Modes} list=${[['0,0', 'Start (0, 0)'], ['4,0', 'Optimum (4, 0)'], ['3,2', 'Corner (3, 2)']]} mode=${x.join(',')} set=${k => setX(k.split(',').map(Number))} />
      <div className="orv3-eq"><div>2x1 + x2 + s1 = 8</div><div>2x1 + 3x2 + s2 = 12</div><div>Z − 3x1 − x2 + 0s1 + 0s2 = 0</div></div>
      <div className="orv3-bars" role="img" aria-label="Used and unused hours of machines A and B">
        <div><div className="orv3-lb"><span>Machine A: 2x1 + x2 = ${n(8 - s1)} of 8 h</span><b>s1 = ${n(s1)}</b></div>${bar(8 - s1, 8, s1)}</div>
        <div><div className="orv3-lb"><span>Machine B: 2x1 + 3x2 = ${n(12 - s2)} of 12 h</span><b>s2 = ${n(s2)}</b></div>${bar(12 - s2, 12, s2)}</div>
      </div>
      <div className="orv3-sl"><span>x1 = ${x1}</span><input type="range" min="0" max="6" step="0.5" value=${x1} onInput=${e => setX([+e.target.value, x2])} aria-label="x1" /></div>
      <div className="orv3-sl"><span>x2 = ${x2}</span><input type="range" min="0" max="8" step="0.5" value=${x2} onInput=${e => setX([x1, +e.target.value])} aria-label="x2" /></div>
      <p className=${'orv3-msg' + (okk ? '' : ' orv3-bad')}>${okk ? 'Feasible: Z = ' + n(z) : 'Infeasible: a slack is negative'}</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [1] the procedure as a loop, on the lecture example ── */
  const FLOW = [
    { h: 'Step 1', t: 'Convert ≤ constraints to equations with slacks; write Z − c1x1 − c2x2 = 0.', ex: '2x1 + x2 + s1 = 8 ; 2x1 + 3x2 + s2 = 12 ; Z − 3x1 − x2 = 0' },
    { h: 'Step 2', t: 'Initial tableau; basic variables = the slacks (and Z).', ex: 's1 = 8, s2 = 12, Z = 0' },
    { h: 'Step 3', t: 'Pivot column: most negative number in the bottom row (excluding b).', ex: '−3 → x1 enters', br: 'no negative number → Step 7' },
    { h: 'Step 4', t: 'Pivot row: smallest positive ratio b ÷ positive entry.', ex: '8/2 = 4, 12/2 = 6 → s1 exits', br: 'no positive entry → no (bounded) solution' },
    { h: 'Step 5', t: 'Pivot element at the intersection (must be positive).', ex: 'pivot = 2' },
    { h: 'Step 6', t: 'Row operations: pivot → 1, every other pivot-column entry → 0.', ex: 'x1 replaces s1; Z row (0, 1/2, 3/2, 0 | 12)' },
    { h: 'Step 7', t: 'No negatives in the bottom row: basic = b, non-basic = 0, Z = bottom-right.', ex: 'x1 = 4, s2 = 4, x2 = s1 = 0, Z = 12' }
  ];
  function Flow({ ar }) {
    const steps = [
      { b: 0, en: '<b>Step 1</b>: slack variables turn the inequalities into equations, and the objective is written as Z − 3x1 − x2 = 0.', ar: 'في الـ <b>Step 1</b> الـ slack variables بتحوّل الـ inequalities لـ equations، والـ objective بيتكتب كده:' + L('Z − 3x1 − x2 = 0') },
      { b: 1, en: '<b>Step 2</b>: the initial tableau; the basic variables are the slacks: s1 = 8, s2 = 12, Z = 0.', ar: 'في الـ <b>Step 2</b> نعمل الـ initial tableau، والـ basic variables هما الـ slacks:' + L('s1 = 8, s2 = 12, Z = 0') },
      { b: 2, en: '<b>Step 3</b>: the most negative bottom-row number is −3, so x1 is the pivot column.', ar: 'في الـ <b>Step 3</b> أكتر رقم سالب في الصف الأخير هو ' + I('−3') + '، فالـ x1 هو الـ pivot column.' },
      { b: 3, en: '<b>Step 4</b>: ratios 8/2 = 4 and 12/2 = 6; the smallest, 4, picks the s1 row. (If no entry were positive: no bounded solution.)', ar: 'في الـ <b>Step 4</b> الـ ratios هما:' + L('8/2 = 4 ; 12/2 = 6') + 'وأصغرهم ' + I('4') + ' بيختار صف الـ s1. (ولو مفيش ولا رقم موجب يبقى ملوش bounded solution.)' },
      { b: 4, en: '<b>Step 5</b>: the pivot element is 2, at the intersection.', ar: 'في الـ <b>Step 5</b> الـ pivot element هو ' + I('2') + '، عند التقاطع.' },
      { b: 5, en: '<b>Step 6</b>: row operations make the pivot 1 and the rest of the x1 column 0; x1 replaces s1 and Z becomes 12.', ar: 'في الـ <b>Step 6</b> الـ row operations بتخلّي الـ pivot واحد وباقي عمود الـ x1 أصفار، والـ x1 بياخد مكان الـ s1 والـ Z بيبقى ' + I('12') + '.' },
      { b: 2, loop: true, en: '<b>Repeat from Step 3</b>: the bottom row is now 0, 1/2, 3/2, 0: no negative number, so jump to Step 7.', ar: '<b>نرجع لـ Step 3</b>: الصف الأخير بقى كده:' + L('0, 1/2, 3/2, 0') + 'مفيش ولا رقم سالب، فنروح على Step 7.' },
      { b: 6, en: '<b>Step 7</b>: read the solution: x1 = 4, x2 = 0 (s2 = 4, s1 = 0), Z = 12.', ar: 'في الـ <b>Step 7</b> نقرا الحل:' + L('x1 = 4, x2 = 0 (s2 = 4, s1 = 0) ; Z = 12') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const seen = j => steps.slice(0, i + 1).some(q => q.b === j);
    return html`<figure className="fig orv3"><div className="fig-stage">
      <div className="orv3-flow" role="img" aria-label="The simplex procedure: steps 1 to 6, then back to step 3 until there is no negative number, then step 7">
        ${FLOW.map((f, j) => html`<div key=${j}>
          ${j > 0 && html`<div className="orv3-arr">↓</div>`}
          <div className=${'orv3-box' + (s.b === j ? ' orv3-on' : seen(j) ? ' orv3-seen' : '')}><b>${f.h}</b> ${f.t}
            ${seen(j) && html`<span className="orv3-ex">${j === 2 && s.loop ? 'Z row 0, 1/2, 3/2, 0 → no negative' : f.ex}</span>`}
            ${f.br && html`<span className=${'orv3-br' + (s.loop && j === 2 ? ' orv3-go' : '')}>↳ ${f.br}</span>`}</div>
          ${j === 5 && html`<div className=${'orv3-arr orv3-back' + (s.loop ? ' orv3-go' : '')}>↺ repeat from Step 3</div>`}
        </div>`)}
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.7] one pivot = a move from corner (0, 0) to corner (4, 0) ── */
  function Path({ ar }) {
    const steps = [
      { en: 'The initial tableau is the corner <b>(0, 0)</b>: x1, x2 are non-basic (= 0); the basic s1 = 8 and s2 = 12 are all the unused hours; Z = 0.', ar: 'الـ initial tableau هو الـ corner اللي عند ' + I('(0, 0)') + '. الـ x1 والـ x2 non-basic بصفر، والـ basic هما:' + L('s1 = 8, s2 = 12 ; Z = 0') },
      { en: 'Pivot: <b>x1 enters</b> (non-basic → basic). As x1 grows along the x1 axis, s1 = 8 − 2x1 and s2 = 12 − 2x1 shrink. s1 hits 0 first, at x1 = 4 (ratio 4 &lt; 6).', ar: 'في الـ pivot الـ <b>x1 بيدخل</b> (من non-basic لـ basic). ولما الـ x1 يكبر على محوره الـ slacks بتقل:' + L('s1 = 8 − 2x1 ; s2 = 12 − 2x1') + 'والـ s1 بيوصل صفر الأول عند ' + I('x1 = 4') + ' (الـ ratio ' + I('4 < 6') + ').' },
      { en: '<b>s1 exits</b> (basic → non-basic = 0): the point stops on 2x1 + x2 = 8, machine A is fully used. Now x1 = 4, s2 = 12 − 8 = 4.', ar: 'الـ <b>s1 بيخرج</b> (من basic لـ non-basic بصفر)، فالنقطة بتقف على الخط ' + I('2x1 + x2 = 8') + ' والمكنة A مستخدمة كلها. ودلوقتي:' + L('x1 = 4 ; s2 = 12 − 8 = 4') },
      { en: '<b>Z increased</b> from 0 to 12. The graph agrees: the corners give Z = 0, 12, 11, 4, and (4, 0) is optimal. (The slide writes Z = 3(2) + 2 = 8 at (3, 2); 3(3) + 2 = 11.)', ar: 'الـ <b>Z زاد</b> من ' + I('0') + ' لـ ' + I('12') + '. والـ graph بيقول نفس الكلام، والـ corners بتدّي:' + L('(0,0): 0 ; (4,0): 12 ; (3,2): 11 ; (0,4): 4') + 'يعني ' + I('(4, 0)') + ' هي الـ optimal. (الـ slide كاتبة ' + I('3(2) + 2 = 8') + ' والصح ' + I('3(3) + 2 = 11') + '.)' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const X0 = 40, X1 = 286, Y0 = 12, Y1 = 214, sx = v => X0 + v / 6.5 * (X1 - X0), sy = v => Y1 - v / 8.5 * (Y1 - Y0);
    const at = i >= 1 ? 4 : 0, cor = [[0, 0, '0'], [4, 0, '12'], [3, 2, '11'], [0, 4, '4']];
    const basic = i >= 2 ? ['x1', 's2'] : ['s1', 's2'], non = i >= 2 ? ['x2', 's1'] : ['x1', 'x2'];
    const tag = v => (i === 1 && v === 'x1') || (i === 2 && v === 'x1') ? 'orv3-in' : (i === 1 && v === 's1') || (i === 2 && v === 's1') ? 'orv3-out' : '';
    return html`<figure className="fig orv3"><div className="fig-stage">
      <svg className="orv3-svg" viewBox="0 0 300 250" role="img" aria-label="Feasible region of the lecture example; the simplex moves from corner (0, 0) to corner (4, 0)">
        ${[0, 2, 4, 6].map(v => html`<g key=${'x' + v}><line x1=${sx(v)} x2=${sx(v)} y1=${Y0} y2=${Y1} stroke="var(--line)" /><text x=${sx(v)} y=${Y1 + 18} textAnchor="middle" fontSize="15" className="orv3-mu">${v}</text></g>`)}
        ${[0, 2, 4, 6, 8].map(v => html`<g key=${'y' + v}><line x1=${X0} x2=${X1} y1=${sy(v)} y2=${sy(v)} stroke="var(--line)" /><text x=${X0 - 6} y=${sy(v) + 5} textAnchor="end" fontSize="15" className="orv3-mu">${v}</text></g>`)}
        <polygon points=${[[0, 0], [4, 0], [3, 2], [0, 4]].map(p => sx(p[0]) + ',' + sy(p[1])).join(' ')} fill="color-mix(in srgb, var(--fig-k) 26%, transparent)" stroke="var(--fig-k)" />
        <line x1=${sx(0)} y1=${sy(8)} x2=${sx(4)} y2=${sy(0)} stroke="var(--fig-k)" strokeWidth=${i >= 2 ? 4.5 : 3} />
        <line x1=${sx(0)} y1=${sy(4)} x2=${sx(6)} y2=${sy(0)} stroke="var(--pen)" strokeWidth="3" />
        <line x1=${X0} x2=${X1} y1=${Y1} y2=${Y1} stroke="var(--ink)" strokeWidth="1.6" /><line x1=${X0} x2=${X0} y1=${Y0} y2=${Y1} stroke="var(--ink)" strokeWidth="1.6" />
        <text x=${sx(0.5)} y=${sy(7.6)} fontSize="15" fontWeight="700">2x1 + x2 = 8</text>
        <text x=${sx(2.6)} y=${sy(3.1)} fontSize="15" fontWeight="700">2x1 + 3x2 = 12</text>
        ${i === 1 && html`<line x1=${sx(0)} y1=${Y1 - 2} x2=${sx(6)} y2=${Y1 - 2} stroke="var(--ok)" strokeWidth="3" strokeDasharray="6 5" />`}
        ${cor.map(([x, y, z]) => html`<g key=${x + '-' + y}><circle cx=${sx(x)} cy=${sy(y)} r="4" fill="var(--ink)" />
          ${i >= 3 && html`<text x=${sx(x) + (x === 0 ? 8 : x === 4 ? -2 : 8)} y=${sy(y) - 9} fontSize="15" fontWeight="700" textAnchor=${x === 4 ? 'middle' : 'start'} fill=${z === '12' ? 'var(--ok)' : 'var(--ink)'}>Z=${z}</text>`}</g>`)}
        <g className="orv3-dot" style=${{ transform: `translate(${sx(at) - sx(0)}px, 0px)` }}><circle cx=${sx(0)} cy=${sy(0)} r="9" fill="var(--ok)" stroke="var(--paper)" strokeWidth="2" /></g>
      </svg>
      <div className="orv3-chips"><div>Basic: ${basic.map(v => html`<i key=${v} className=${tag(v)}>${v}</i>`)}</div><div>Non-basic: ${non.map(v => html`<i key=${v} className=${tag(v)}>${v}</i>`)}</div><div>Z = <i>${i >= 2 ? 12 : 0}</i></div></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2] the section's rectangle shortcut, tap any cell ── */
  const RX = { lec: { T: LEC, sel: [1, 1] }, rev: { T: REV, sel: [1, 1] } };
  function Rect({ ar }) {
    const [mode, setMode] = useState('lec'), [sel, setSel] = useState(RX.lec.sel), [done, setDone] = useState({ '1,1': 1 });
    const T = RX[mode].T, r = 0, c = 0, p = T.rows[r][c], N = pivot(T, r, c), nv = T.vars.length;
    const pick = k => { setMode(k); setSel(RX[k].sel); setDone({ [RX[k].sel.join(',')]: 1 }); };
    const tap = (i, j) => { setSel([i, j]); setDone(d => Object.assign({}, d, { [i + ',' + j]: 1 })); };
    const [i, j] = sel, old = T.rows[i][j], nw = N.rows[i][j], f = v => fs(v), q = v => pn(v, false);
    let en, a;
    if (i === r) { const t = `${f(old)} ÷ ${q(p)} = ${f(nw)}`; en = `Pivot row: new = old ÷ pivot = ${t}.`; a = 'ده في الـ pivot row، فبنقسمه على الـ pivot:' + L(t); }
    else if (j === c) { en = `Pivot column: every entry except the pivot becomes 0 (${f(old)} → 0).`; a = 'ده في الـ pivot column، وكل رقم فيه غير الـ pivot بيبقى صفر:' + L(`${f(old)} → 0`); }
    else {
      const A = T.rows[r][j], B = T.rows[i][c], t = `${f(old)} − (${q(A)} × ${q(B)}) ÷ ${q(p)} = ${f(nw)}`;
      if (!sg(A)) { en = `Its pivot-row element is 0, so this column is copied unchanged: ${t}.`; a = 'الرقم اللي في الـ pivot row في العمود ده صفر، فالعمود بيتنقل زي ما هو:' + L(t); }
      else { en = `Shortcut: new element = old − (corresponding pivot-row element × corresponding pivot-column element) ÷ pivot = ${t}.`; a = 'باختصار السكشن بنستخدم المستطيل (الرقم، والـ pivot، والركنين التانيين):' + L('new = ' + t); }
    }
    const mark = (a2, b2) => { if (a2 === i && b2 === j) return 'orv3-hot'; if (i !== r && j !== c && ((a2 === r && b2 === j) || (a2 === i && b2 === c))) return 'orv3-mk'; return ''; };
    const blank = N.rows.map(() => false), shown = N.rows.map((row, a2) => row.map((v, b2) => done[a2 + ',' + b2] ? v : '·'));
    const NT = { vars: N.vars, basis: N.basis, rows: shown };
    const all = () => { const d = {}; N.rows.forEach((row, a2) => row.forEach((_, b2) => { d[a2 + ',' + b2] = 1; })); setDone(d); };
    const cnt = Object.keys(done).length, tot = N.rows.length * (nv + 1);
    return html`<figure className="fig orv3"><div className="fig-stage">
      <${Modes} list=${[['lec', 'Lecture (pivot 2)'], ['rev', 'Revision (pivot 1)']]} mode=${mode} set=${pick} />
      <div role="img" aria-label="Old tableau with the pivot, the chosen cell and the two rectangle corners; new tableau filled as you tap">
      <${Tab} T=${T} hc=${c} hr=${r} mark=${mark} onCell=${tap} title="Old tableau: tap any number" />
      <div style=${{ height: '6px' }}></div>
      <${Tab} T=${NT} blank=${blank} basis=${N.rows[r].some((_, b2) => done[r + ',' + b2]) ? N.basis : T.basis} mark=${(a2, b2) => a2 === i && b2 === j ? 'orv3-ok' : ''} title=${`New tableau (${cnt} of ${tot} filled)`} /></div>
      <div className="orv3-row" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${all}>Fill all</button><button className="fig-btn" onClick=${() => setDone({})}>Clear</button></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [3] slide 13: pivot column, ratios, pivot row, pivot element ── */
  function Pick({ ar }) {
    const steps = [
      { en: 'The initial tableau of the lecture example (slide 13). Which entry is the pivot?', ar: 'ده الـ initial tableau بتاع مثال المحاضرة. مين الـ pivot؟' },
      { hc: 0, en: 'The most negative number in the bottom row is −3 (excluding b): <b>pivot column x1</b>.', ar: 'أكتر رقم سالب في الصف الأخير (من غير الـ b) هو ' + I('−3') + '، فده الـ <b>pivot column</b> وهو الـ x1.' },
      { hc: 0, rat: true, en: 'Divide each b by its positive pivot-column entry: 8/2 = 4 and 12/2 = 6. The Z row gets no ratio.', ar: 'نقسم كل b على الرقم الموجب اللي قصاده في الـ pivot column، وصف الـ Z مالوش ratio:' + L('8/2 = 4 ; 12/2 = 6') },
      { hc: 0, hr: 0, rat: true, en: 'The smallest positive ratio is 4: <b>pivot row s1</b>.', ar: 'أصغر ratio موجبة هي ' + I('4') + '، فده الـ <b>pivot row</b> وهو صف الـ s1.' },
      { hc: 0, hr: 0, rat: true, pe: true, en: 'The <b>pivot element</b> is 2, at the intersection; it is positive. Entering variable x1, exiting variable s1.', ar: 'الـ <b>pivot element</b> هو ' + I('2') + ' عند التقاطع، وهو موجب. والـ entering variable هو الـ x1 والـ exiting variable هو الـ s1.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400), s = steps[i];
    return html`<figure className="fig orv3"><div className="fig-stage">
      <div role="img" aria-label="Slide 13: the initial tableau with the pivot column x1, the ratios 4 and 6, the pivot row s1 and the pivot element 2">
      <${Tab} T=${LEC} hc=${s.hc == null ? -1 : 0} hr=${s.hr == null ? -1 : 0} rat=${s.rat ? ['8/2=4', '12/2=6'] : null} mark=${(a, b) => s.pe && a === 0 && b === 0 ? 'orv3-mk' : ''} /></div>
      <div className="orv3-pills"><span className=${pop(i >= 1) + (i === 1 ? ' orv3-full' : '')}>Pivot column: x1</span><span className=${pop(i >= 3) + (i === 3 ? ' orv3-full' : '')}>Pivot row: s1</span><span className=${pop(i >= 4) + (i === 4 ? ' orv3-full' : '')}>Pivot element: 2</span></div>
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] reading the optimal tableau ── */
  function Read({ ar }) {
    const T = LECOPT, m = 2;
    const steps = [
      { mk: (i, j) => i === m && j >= 0 && j < 4 ? 'orv3-ok' : '', en: 'Check the bottom row (excluding b): 0, 0.5, 1.5, 0. No negative numbers, so this tableau is <b>optimal</b>.', ar: 'نبص على الصف الأخير (من غير الـ b):' + L('0, 0.5, 1.5, 0') + 'مفيش ولا رقم سالب، يعني الـ tableau ده <b>optimal</b>.' },
      { mk: (i, j) => i === 0 && (j === -1 || j === 4) ? 'orv3-mk' : '', en: 'Basic variable x1 = its b value: <b>x1 = 4</b> (4 manual widgets).', ar: 'الـ x1 basic، فقيمته هي الـ b بتاعه:' + L('x1 = 4') },
      { mk: (i, j) => i === 1 && (j === -1 || j === 4) ? 'orv3-mk' : '', en: 'Basic variable <b>s2 = 4</b>: machine B still has 4 unused hours.', ar: 'والـ s2 basic برضه وقيمته ' + I('4') + '، يعني المكنة B لسه فيها 4 ساعات مش مستخدمة.' },
      { mk: (i, j) => (j === 1 || j === 2) && i >= -2 ? 'orv3-mk' : '', en: 'x2 and s1 are not in the Basic column: non-basic, so <b>x2 = 0</b> and <b>s1 = 0</b> (machine A fully used).', ar: 'الـ x2 والـ s1 مش في عمود الـ Basic، يعني non-basic بصفر:' + L('x2 = 0 ; s1 = 0') + 'والمكنة A مستخدمة كلها.' },
      { mk: (i, j) => i === m && j === 4 ? 'orv3-ok' : '', en: '<b>Z = 12</b>, the bottom-right entry: the optimal solution is Z = 12 at x1 = 4, x2 = 0, the same as the graphical solution.', ar: 'والـ Z هي الرقم اللي تحت خالص على اليمين، فالـ optimal solution هي:' + L('Z = 12 at x1 = 4, x2 = 0') + 'وده نفس حل الـ graph.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    return html`<figure className="fig orv3"><div className="fig-stage">
      <div role="img" aria-label="The lecture's final tableau: x1 = 4, s2 = 4, Z = 12">
      <${Tab} T=${T} dec=${true} mark=${s.mk} title="After one pivot" /></div>
      <div className="orv3-chips"><div>x1 = <i className=${i >= 1 ? 'orv3-in' : ''}>${i >= 1 ? 4 : '?'}</i></div><div>x2 = <i>${i >= 3 ? 0 : '?'}</i></div><div>s1 = <i>${i >= 3 ? 0 : '?'}</i></div><div>s2 = <i>${i >= 2 ? 4 : '?'}</i></div><div>Z = <i className=${i >= 4 ? 'orv3-in' : ''}>${i >= 4 ? 12 : '?'}</i></div></div>
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] and [6] the lecture and revision examples, pivot by pivot ── */
  const LecRun = ({ ar }) => html`<figure className="fig orv3"><${RunBody} ar=${ar} T=${LEC} dec=${false} ms=${3000} label="Lecture example: Max Z = 3x1 + x2 solved by one pivot" /></figure>`;
  const RevRun = ({ ar }) => html`<figure className="fig orv3"><${RunBody} ar=${ar} T=${REV} dec=${false} ms=${3000} label="Revision example: Max Z = 8x1 + 5x2 solved by one pivot" /></figure>`;

  /* ── [8] simulator: the exam tableaux and your own problem ── */
  const OWN0 = { n: 2, c: ['3', '1', '0'], A: [['2', '1', '0', '8'], ['2', '3', '0', '12'], ['1', '1', '1', '10']], m: 2 };
  function buildOwn(o) {
    const c = o.c.slice(0, o.n).map(pf), A = o.A.slice(0, o.m).map(r => r.slice(0, o.n).concat(r[3]).map(pf));
    if (c.some(v => !v) || A.some(r => r.some(v => !v))) return { err: 'Enter numbers (like 3, −2, 0.5 or 1/2) in every box.', errAr: 'اكتب أرقام في كل الخانات (زي ' + I('3') + ' أو ' + I('−2') + ' أو ' + I('1/2') + ').' };
    if (A.some(r => sg(r[o.n]) < 0)) return { err: 'Every b must be ≥ 0: the lecture\'s method starts from the slacks (s = b).', errAr: 'لازم كل b يبقى ' + I('≥ 0') + '، لأن طريقة المحاضرة بتبدأ من الـ slacks.' };
    const xs = Array.from({ length: o.n }, (_, j) => 'x' + (j + 1)), ss = Array.from({ length: o.m }, (_, i) => 's' + (i + 1));
    const rows = A.map((r, i) => r.slice(0, o.n).concat(ss.map((_, k) => F(k === i ? 1 : 0)), [r[o.n]]));
    rows.push(c.map(v => F(-v.n, v.d)).concat(ss.map(() => ZERO), [ZERO]));
    return { T: { vars: xs.concat(ss), basis: ss.concat('Z'), rows } };
  }
  function Sim({ ar }) {
    const [mode, setMode] = useState('p26'), [own, setOwn] = useState(OWN0), [go, setGo] = useState(OWN0), [ver, setVer] = useState(0);
    const ex = PRE.find(x => x.key === mode), built = !ex && buildOwn(go);
    const setA = (i, j, v) => setOwn(o => Object.assign({}, o, { A: o.A.map((r, a) => a === i ? r.map((x, b) => b === j ? v : x) : r) }));
    const inp = (v, on, lab) => html`<input type="text" inputMode="decimal" value=${v} onInput=${e => on(e.target.value)} aria-label=${lab} />`;
    const editor = !ex && html`<div className="orv3-ed">
      <div className="orv3-l"><span>Variables</span>${[2, 3].map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(own.n === k)} onClick=${() => setOwn(o => Object.assign({}, o, { n: k }))}>${k}</button>`)}
        <span>Constraints</span>${[2, 3].map(k => html`<button key=${'m' + k} className="fig-btn" aria-pressed=${String(own.m === k)} onClick=${() => setOwn(o => Object.assign({}, o, { m: k }))}>${k}</button>`)}</div>
      <div className="orv3-l">Max Z = ${own.c.slice(0, own.n).map((v, j) => html`<span key=${j}>${j ? ' + ' : ''}${inp(v, x => setOwn(o => Object.assign({}, o, { c: o.c.map((y, b) => b === j ? x : y) })), 'c' + (j + 1))} x${j + 1}</span>`)}</div>
      ${own.A.slice(0, own.m).map((r, i) => html`<div key=${i} className="orv3-l">${r.slice(0, own.n).map((v, j) => html`<span key=${j}>${j ? ' + ' : ''}${inp(v, x => setA(i, j, x), 'a' + (i + 1) + (j + 1))} x${j + 1}</span>`)} ≤ ${inp(r[3], x => setA(i, 3, x), 'b' + (i + 1))}</div>`)}
      <div className="orv3-l"><button className="fig-btn solid" onClick=${() => { setGo(own); setVer(v => v + 1); }}>Run simplex ›</button></div></div>`;
    const top = html`<${Modes} list=${PRE.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${setMode} />${editor}`;
    if (built && built.err) return html`<figure className="fig orv3"><div className="fig-stage">${top}<p className="orv3-msg orv3-bad">${built.err}</p></div><${Cap} en=${built.err} ar=${built.errAr} showAr=${ar} /></figure>`;
    return html`<figure className="fig orv3"><${RunBody} key=${mode + ver} ar=${ar} T=${ex ? ex.T : built.T} dec=${ex ? ex.dec : true} note=${ex ? ex.note : null} top=${top} ms=${3200} label="Simplex simulator: the chosen tableau pivot by pivot" /></figure>`;
  }

  /* ── [9] building the dual (Final 2021/22) ── */
  const DEX = { c: [12, 4], A: [[4, 7], [2, 5], [5, 4]], op: ['<=', '>=', '='], b: [56, 20, 40] };
  const nn = v => { let r = Math.round(v * 1000) / 1000; if (Object.is(r, -0)) r = 0; return (r < 0 ? MI : '') + Math.abs(r); };
  const OPS = { '<=': '≤', '>=': '≥', '=': '=' };
  const lin = (cf, nm) => { let s = ''; cf.forEach((v, k) => { if (!v) return; const a = Math.abs(v), t = (a === 1 ? '' : nn(a)) + nm[k]; s += s ? (v < 0 ? ' − ' : ' + ') + t : (v < 0 ? MI : '') + t; }); return s || '0'; };
  function dualOf(P) {
    const rows = P.A.map((a, i) => P.op[i] === '>=' ? { a: a.map(v => -v), op: '<=', b: -P.b[i], flip: true, o: a, ob: P.b[i] } : { a: a.slice(), op: P.op[i], b: P.b[i] });
    const ys = rows.map((_, i) => 'y' + (i + 1)), xs = P.c.map((_, j) => 'x' + (j + 1));
    return { rows, ys, xs, W: 'Min W = ' + lin(rows.map(r => r.b), ys), cons: P.c.map((cj, j) => `${lin(rows.map(r => r.a[j]), ys)} ≥ ${nn(cj)}`), sign: rows.map((r, i) => r.op === '=' ? ys[i] + ' unrestricted' : ys[i] + ' ≥ 0') };
  }
  function DualSteps({ ar, P, ex }) {
    const D = dualOf(P), fl = D.rows.map((r, i) => r.flip ? i : -1).filter(i => i >= 0);
    const Z = 'Max Z = ' + lin(P.c, D.xs), prim = P.A.map((a, i) => `${lin(a, D.xs)} ${OPS[P.op[i]]} ${nn(P.b[i])}`);
    const steps = [
      { hl: 'all', en: `Primal${ex ? ' (Final 2021/22)' : ''}: ${Z} subject to ${prim.join(', ')}, x ≥ 0. Its dual will be a MIN problem.`, ar: 'ده الـ primal، مسألة MAX:' + L(Z + ' ; ' + prim.join(' ; ')) + 'والـ dual بتاعه هيبقى مسألة MIN.' },
      { hl: 'flip', flip: true, en: fl.length ? `A MAX primal in canonical form needs ≤: multiply ${fl.map(i => prim[i]).join(' and ')} by −1 → ${fl.map(i => `${lin(D.rows[i].a, D.xs)} ≤ ${nn(D.rows[i].b)}`).join(' and ')}.` : 'All constraints are already ≤ or =: nothing to multiply by −1.',
        ar: fl.length ? 'الـ primal الـ MAX في الـ canonical form لازم يبقى ' + I('≤') + '، فبنضرب الـ constraint اللي فيه ' + I('≥') + ' في ' + I('−1') + ' كده:' + L(fl.map(i => `${prim[i]} → ${lin(D.rows[i].a, D.xs)} ≤ ${nn(D.rows[i].b)}`).join(' ; ')) : 'كل الـ constraints أصلاً ' + I('≤') + ' أو ' + I('=') + '، فمفيش حاجة نضربها في ' + I('−1') + '.' },
      { hl: 'y', flip: true, en: `One dual variable per constraint: ${D.sign.join(', ')} (a ≤ constraint gives y ≥ 0, an = constraint gives y unrestricted in sign).`, ar: 'كل constraint بيدّي dual variable واحد، والـ ' + I('≤') + ' بيدّي ' + I('y ≥ 0') + ' والـ ' + I('=') + ' بيدّي y unrestricted في الإشارة:' + L(D.sign.join(' ; ')) },
      { hl: 'b', flip: true, en: `The RHS values become the dual objective coefficients: <b>${D.W}</b>.`, ar: 'قيم الـ RHS بتبقى معاملات الـ dual objective:' + L(D.W) },
      ...D.cons.map((t, j) => ({ hl: 'c' + j, flip: true, n: j + 1, en: `Transpose: column ${D.xs[j]} (${D.rows.map(r => nn(r.a[j])).join(', ')}) with c${j + 1} = ${nn(P.c[j])} on the right; ${D.xs[j]} ≥ 0 makes it ≥: <b>${t}</b>.`, ar: `بنعمل transpose: عمود الـ ${I(D.xs[j])} بيبقى صف في الـ dual، والـ ${I('c' + (j + 1))} بيبقى الـ RHS، ولأن الـ ${I(D.xs[j] + ' ≥ 0')} القيد بيبقى ${I('≥')}:` + L(t) }))
    ];
    if (ex) steps.push({ hl: 'done', flip: true, n: 9, en: 'At the optimum primal Z = dual W (strong duality): both optima equal <b>1520/17 ≈ 89.41</b>.', ar: 'عند الـ optimum الـ Z بتاع الـ primal بيساوي الـ W بتاع الـ dual (strong duality):' + L('Z* = W* = 1520/17 ≈ 89.41') });
    const [i, ctl] = useSteps(steps.length, 3000), s = steps[i], nc = P.c.length;
    const cell = (r, j) => (s.hl === 'c' + j && r >= 0) || (s.hl === 'b' && j === 'b') || (s.hl === 'flip' && D.rows[r] && D.rows[r].flip && r >= 0) ? 'orv3-mk' : '';
    const showRows = s.flip ? D.rows : P.A.map((a, r) => ({ a, op: P.op[r], b: P.b[r] }));
    const done = s.n || (s.hl === 'b' ? 0 : -1);
    return html`<div className="fig-stage">
      <div role="img" aria-label="Primal coefficient table and the dual built from it">
      <table className="orv3-tb"><thead><tr><th></th>${D.xs.map(x => html`<th key=${x}>${x}</th>`)}<th></th><th>RHS</th><th>dual</th></tr></thead><tbody>
        ${showRows.map((r, k) => html`<tr key=${k}><td className="orv3-bs">${k + 1}</td>${r.a.map((v, j) => html`<td key=${j} className=${cell(k, j)}>${nn(v)}</td>`)}<td>${OPS[r.op]}</td><td className=${cell(k, 'b')}>${nn(r.b)}</td><td className=${s.hl === 'y' ? 'orv3-mk' : ''}>${i >= 2 ? D.sign[k].replace('unrestricted', 'free') : ''}</td></tr>`)}
        <tr className="orv3-z"><td className="orv3-bs">c</td>${P.c.map((v, j) => html`<td key=${j} className=${s.hl === 'c' + j ? 'orv3-hot' : ''}>${nn(v)}</td>`)}<td colSpan="3">Max Z</td></tr></tbody></table>
      <div className="orv3-eq" style=${{ marginTop: '8px' }}>
        <div className=${i >= 3 ? (s.hl === 'b' ? 'orv3-on' : '') : 'orv3-dim'}>${i >= 3 ? D.W : 'Min W = ?'}</div>
        <div>subject to</div>
        ${D.cons.map((t, j) => html`<div key=${j} className=${done > j ? (s.hl === 'c' + j ? 'orv3-on' : '') : 'orv3-dim'}>${done > j ? t : '?'}</div>`)}
        <div className=${i >= 2 ? '' : 'orv3-dim'}>${i >= 2 ? D.sign.join(', ') : 'signs of y ?'}</div>
        ${s.hl === 'done' && html`<div className="orv3-on">Z* = W* = 1520/17 ≈ 89.41</div>`}
      </div></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function Dual({ ar }) {
    const [mode, setMode] = useState('ex'), [own, setOwn] = useState({ c: ['3', '2'], A: [['1', '1', '<=', '4'], ['1', '3', '>=', '6']] }), [go, setGo] = useState(null), [ver, setVer] = useState(0);
    const setA = (i, j, v) => setOwn(o => Object.assign({}, o, { A: o.A.map((r, a) => a === i ? r.map((x, b) => b === j ? v : x) : r) }));
    const toP = o => ({ c: o.c.map(Number), A: o.A.map(r => [+r[0], +r[1]]), op: o.A.map(r => r[2]), b: o.A.map(r => +r[3]) });
    const okNum = o => o.c.concat(...o.A.map(r => [r[0], r[1], r[3]])).every(v => /^\s*-?(\d+\.?\d*|\.\d+)\s*$/.test(String(v).replace(/−/g, '-')));
    const fix = o => ({ c: o.c.map(v => String(v).replace(/−/g, '-')), A: o.A.map(r => r.map(v => String(v).replace(/−/g, '-'))) });
    const inp = (v, on, lab) => html`<input type="text" inputMode="decimal" value=${v} onInput=${e => on(e.target.value)} aria-label=${lab} />`;
    const editor = mode === 'own' && html`<div className="orv3-ed">
      <div className="orv3-l">Max Z = ${inp(own.c[0], x => setOwn(o => Object.assign({}, o, { c: [x, o.c[1]] })), 'c1')} x1 + ${inp(own.c[1], x => setOwn(o => Object.assign({}, o, { c: [o.c[0], x] })), 'c2')} x2</div>
      ${own.A.map((r, i) => html`<div key=${i} className="orv3-l">${inp(r[0], x => setA(i, 0, x), 'a' + (i + 1) + '1')} x1 + ${inp(r[1], x => setA(i, 1, x), 'a' + (i + 1) + '2')} x2
        <select value=${r[2]} onChange=${e => setA(i, 2, e.target.value)} aria-label="sign"><option value="<=">≤</option><option value=">=">≥</option><option value="=">=</option></select>
        ${inp(r[3], x => setA(i, 3, x), 'b' + (i + 1))}
        ${own.A.length > 1 && html`<button className="fig-btn" onClick=${() => setOwn(o => Object.assign({}, o, { A: o.A.filter((_, k) => k !== i) }))} aria-label="remove constraint">✕</button>`}</div>`)}
      <div className="orv3-l">${own.A.length < 3 && html`<button className="fig-btn" onClick=${() => setOwn(o => Object.assign({}, o, { A: o.A.concat([['1', '1', '<=', '10']]) }))}>+ constraint</button>`}
        <button className="fig-btn solid" onClick=${() => { setGo(okNum(own) ? toP(fix(own)) : 'bad'); setVer(v => v + 1); }}>Build the dual ›</button></div></div>`;
    const P = mode === 'ex' ? DEX : go && go !== 'bad' ? go : null;
    return html`<figure className="fig orv3"><div className="fig-stage" style=${{ paddingBottom: 0 }}>
      <${Modes} list=${[['ex', 'Final 2021/22'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />${editor}
      ${mode === 'own' && !P && html`<p className=${'orv3-msg' + (go === 'bad' ? ' orv3-bad' : '')}>${go === 'bad' ? 'Enter a number in every box.' : 'Type a MAX problem, then build its dual.'}</p>`}</div>
      ${P ? html`<${DualSteps} key=${mode + ver} ar=${ar} P=${P} ex=${mode === 'ex'} />` : html`<${Cap} en=${go === 'bad' ? 'Enter a number in every box.' : 'Type a MAX problem with two variables, then press Build the dual.'} ar=${go === 'bad' ? 'اكتب رقم في كل خانة.' : 'اكتب مسألة MAX فيها متغيرين، وبعدين دوس Build the dual.'} showAr=${ar} />`}</figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'or-simplex-terms': Terms, 'or-simplex-slack': Slack, 'or-simplex-loop': Flow, 'or-simplex-corner-move': Path,
    'or-simplex-rectangle': Rect, 'or-simplex-pivot-pick': Pick, 'or-simplex-read': Read,
    'or-simplex-lecture-run': LecRun, 'or-simplex-revision-run': RevRun, 'or-simplex-sim': Sim, 'or-simplex-dual': Dual
  });
})();
/* ── part L6 ── */
// Operations Research visuals, Lecture 6 (integer programming: branch and bound): the kinds of integer programs on one graph, why rounding fails, branching and the removed strip, the fathoming rules, x ≥ y and x ≤ y ⇒ x = y, the procedure as a flowchart, Sheets 1 and 2 solved node by node with their tree, and a solver for the other solved problems. Every label and number comes from the site's notes or is computed with the notes' method (graphical corners, branch on the largest fractional part).
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar } = window.FIGKIT;
  const CSS = `
.orv6 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv6-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.orv6-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.orv6-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:460px; touch-action:manipulation; }
.orv6-svg text{ fill:var(--ink); font-family:var(--body); }
.orv6-svg text.orv6-mu{ fill:var(--graphite); }
.orv6-svg text.orv6-wt{ fill:#fff; font-weight:700; }
.orv6-svg text.orv6-pen{ fill:var(--pen); }
.orv6-model{ max-width:460px; margin:0 auto 8px; font:.82rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 10px; color:var(--ink); overflow-wrap:anywhere; }
.orv6-model .orv6-z{ color:var(--fig-k); font-weight:700; }
.orv6-model .orv6-add{ margin-top:4px; padding-top:4px; border-top:1px dashed var(--line); font-weight:700; }
.orv6-sw{ width:16px; height:4px; border-radius:2px; display:inline-block; margin-right:6px; vertical-align:middle; }
.orv6-tbl{ width:100%; max-width:460px; margin:8px auto 0; border-collapse:collapse; font:.8rem/1.4 var(--mono); color:var(--ink); background:var(--paper); table-layout:fixed; }
.orv6-tbl th, .orv6-tbl td{ border:1px solid var(--line); padding:3px 6px; text-align:left; overflow-wrap:anywhere; vertical-align:top; }
.orv6-tbl th{ font-weight:600; background:var(--paper-2); }
.orv6-tbl th:first-child, .orv6-tbl td:first-child{ width:38%; }
.orv6-tbl tr.orv6-best td{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); font-weight:700; }
.orv6-verdict{ max-width:460px; margin:8px auto 0; text-align:center; font-weight:700; color:var(--ink); font-size:.9rem; }
.orv6-verdict.orv6-bad{ color:var(--pen); } .orv6-verdict.orv6-good{ color:var(--ok); }
.orv6-leg{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; max-width:460px; margin:4px auto 0; font-size:.78rem; color:var(--graphite); }
.orv6-leg span{ display:inline-flex; align-items:center; gap:4px; }
.orv6-leg i{ width:12px; height:12px; border-radius:50%; display:inline-block; border:2px solid var(--line); box-sizing:border-box; }
.orv6-tree{ max-width:460px; margin:10px auto 0; border-top:1px solid var(--line); padding-top:6px; }
.orv6-ol{ max-width:460px; margin:8px auto 0; font:.8rem/1.45 var(--mono); color:var(--ink); }
.orv6-ol div{ border-left:3px solid var(--line); padding:1px 0 1px 6px; margin:2px 0; overflow-wrap:anywhere; }
.orv6-ol div.orv6-on{ border-left-color:var(--fig-k); font-weight:700; }
.orv6-ed{ max-width:460px; margin:0 auto 8px; display:grid; gap:6px; font-size:.86rem; color:var(--ink); }
.orv6-ed .orv6-l{ display:flex; flex-wrap:wrap; align-items:center; gap:4px; }
.orv6-ed input, .orv6-ed select{ width:3.4em; font:inherit; font-size:.86rem; padding:3px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); min-height:30px; }
.orv6-ed select{ width:auto; }
.orv6-ed .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:30px; }
.orv6-flow{ max-width:460px; margin:0 auto; display:grid; gap:0; justify-items:center; }
.orv6-box{ width:100%; box-sizing:border-box; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.84rem; line-height:1.35; color:var(--ink); opacity:.5; transition:opacity .4s, box-shadow .4s; }
.orv6-box b{ color:var(--fig-k); }
.orv6-box.orv6-q{ border-style:dashed; border-radius:16px; text-align:center; }
.orv6-box.orv6-on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); }
.orv6-box .orv6-ex{ display:block; font:.78rem/1.4 var(--mono); color:var(--graphite); margin-top:2px; overflow-wrap:anywhere; }
.orv6-arr{ color:var(--graphite); font-size:.8rem; line-height:1.2; padding:1px 0; text-align:center; }
.orv6-arr.orv6-on{ color:var(--fig-k); font-weight:700; }
.orv6 .fig-cap .ltr{ text-align:left; font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .orv6-box{ transition:none; } }
`;
  if (!document.getElementById('orv6-css')) { const s = document.createElement('style'); s.id = 'orv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers: numbers and text ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const I = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const nf = (v, d = 2) => { let r = Math.round(v * 10 ** d) / 10 ** d; if (Object.is(r, -0)) r = 0; return r < 0 ? '−' + String(-r) : String(r); };
  const OP = { '<=': '≤', '>=': '≥', '=': '=' };
  const co = v => Math.abs(v) === 1 ? '' : nf(Math.abs(v));
  const expr = (a, b, V) => { let s = ''; if (a) s += (a < 0 ? '−' : '') + co(a) + V[0]; if (b) s += (s ? (b < 0 ? ' − ' : ' + ') : (b < 0 ? '−' : '')) + co(b) + V[1]; return s || '0'; };
  const C = (a, b, op, c) => ({ a, b, op, c });
  const cstr = (k, V) => `${expr(k.a, k.b, V)} ${OP[k.op]} ${nf(k.c)}`;
  const COL = ['var(--fig-k)', 'var(--pen)', 'var(--ok)', 'var(--graphite)'];
  const EPS = 1e-6, isI = v => Math.abs(v - Math.round(v)) < EPS, zeq = (a, b) => Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a));

  /* ── the graphical method (corner points), as in Lecture 2 ── */
  const val = (k, x, y) => k.a * x + k.b * y;
  const tolOf = k => 1e-7 * Math.max(1, Math.abs(k.c), Math.abs(k.a), Math.abs(k.b));
  const ok = (k, x, y) => { const v = val(k, x, y), t = tolOf(k) * Math.max(1, Math.abs(x), Math.abs(y)); return k.op === '<=' ? v <= k.c + t : k.op === '>=' ? v >= k.c - t : Math.abs(v - k.c) <= t; };
  const feas = (cs, x, y) => x >= -1e-9 && y >= -1e-9 && cs.every(k => ok(k, x, y));
  const meet = (p, q) => { const d = p.a * q.b - q.a * p.b; if (Math.abs(d) < 1e-12) return null; return [(p.c * q.b - q.c * p.b) / d, (p.a * q.c - q.a * p.c) / d]; };
  function cornersOf(cs) {
    const ls = cs.concat([C(1, 0, '>=', 0), C(0, 1, '>=', 0)]), pts = [];
    for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) {
      const m = meet(ls[i], ls[j]); if (!m) continue; let [x, y] = m; if (Math.abs(x) < 1e-9) x = 0; if (Math.abs(y) < 1e-9) y = 0;
      if (Math.abs(x - Math.round(x)) < 1e-9) x = Math.round(x); if (Math.abs(y - Math.round(y)) < 1e-9) y = Math.round(y);
      if (!feas(cs, x, y)) continue;
      const s = 1e-7 * Math.max(1, Math.abs(x), Math.abs(y)); if (!pts.some(p => Math.abs(p.x - x) <= s && Math.abs(p.y - y) <= s)) pts.push({ x, y });
    }
    if (pts.length < 2) return pts;
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length, cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    const st = pts.slice().sort((p, q) => p.x - q.x || p.y - q.y)[0], ang = p => Math.atan2(p.y - cy, p.x - cx), a0 = ang(st);
    return pts.sort((p, q) => ((ang(p) - a0 + 4 * Math.PI) % (2 * Math.PI)) - ((ang(q) - a0 + 4 * Math.PI) % (2 * Math.PI)));
  }
  function clip(poly, k) {
    if (k.op === '=') return poly;
    const t = tolOf(k), inn = p => k.op === '<=' ? val(k, p[0], p[1]) <= k.c + t : val(k, p[0], p[1]) >= k.c - t, out = [];
    for (let i = 0; i < poly.length; i++) {
      const s = poly[i], e = poly[(i + 1) % poly.length], si = inn(s), ei = inn(e);
      if (si) out.push(s);
      if (si !== ei) { const vs = val(k, s[0], s[1]), ve = val(k, e[0], e[1]), u = (k.c - vs) / (ve - vs); out.push([s[0] + u * (e[0] - s[0]), s[1] + u * (e[1] - s[1])]); }
    }
    return out;
  }
  const region = (cs, X, Y) => cs.reduce((poly, k) => poly.length ? clip(poly, k) : poly, [[0, 0], [X, 0], [X, Y], [0, Y]]);
  function lp(cs, c) {
    const cor = cornersOf(cs); cor.forEach(p => { p.z = c[0] * p.x + c[1] * p.y; });
    if (!cor.length) return { st: 'inf', cor };
    let b = cor[0]; cor.forEach(p => { if (p.z > b.z + 1e-9 * Math.max(1, Math.abs(b.z))) b = p; });
    const big = region(cs, 1e6, 1e6);
    if (big.some(p => c[0] * p[0] + c[1] * p[1] > b.z + 1e-3 * Math.max(1, Math.abs(b.z)))) return { st: 'unb', cor, b };
    return { st: 'ok', cor, b };
  }
  const bnd = e => C(e.v ? 0 : 1, e.v ? 1 : 0, e.op, e.k);
  const csOf = (P, ex) => P.cs.concat(ex.map(bnd));
  // the added branch constraints, tightest per variable; x ≥ y and x ≤ y shown as x = y
  function exStr(P, ex) {
    const out = [];
    [0, 1].forEach(v => { const lo = ex.filter(e => e.v === v && e.op === '>=').map(e => e.k), hi = ex.filter(e => e.v === v && e.op === '<=').map(e => e.k);
      const l = lo.length ? Math.max(...lo) : null, h = hi.length ? Math.min(...hi) : null;
      if (l != null && h != null && l === h) out.push(`${P.v[v]} = ${l}`); else { if (l != null) out.push(`${P.v[v]} ≥ ${l}`); if (h != null) out.push(`${P.v[v]} ≤ ${h}`); } });
    return out.join(', ');
  }
  const pstr = (p, d) => `(${nf(p.x, d)}, ${nf(p.y, d)})`;
  const zc = (P, p, d) => `${nf(P.c[0])}(${nf(p.x, d)}) + ${nf(P.c[1])}(${nf(p.y, d)}) = ${nf(p.z)}`;
  const corList = (P, cor, d) => cor.map(p => `${pstr(p, d)} = ${nf(p.z)}`).join(', ');
  const solStr = (P, b, d) => `${P.v[0]} = ${nf(b.x, d)}, ${P.v[1]} = ${nf(b.y, d)}, Z = ${nf(b.z)}`;
  // why a node is infeasible: its lower bounds already break a ≤ constraint (as the notes show)
  function whyInf(P, ex) {
    const lo = [0, 1].map(v => Math.max(0, ...ex.filter(e => e.v === v && e.op === '>=').map(e => e.k), ...P.cs.filter(k => k.op === '>=' && (v ? !k.a && k.b > 0 : !k.b && k.a > 0)).map(k => k.c / (v ? k.b : k.a))));
    const k = P.cs.find(k => k.op === '<=' && k.a >= 0 && k.b >= 0 && val(k, lo[0], lo[1]) > k.c + 1e-9);
    if (!k) return null;
    const t = (a, x) => `${a === 1 ? '' : nf(a)}(${nf(x)})`;
    return `${[k.a ? t(k.a, lo[0]) : '', k.b ? t(k.b, lo[1]) : ''].filter(Boolean).join(' + ')} = ${nf(val(k, lo[0], lo[1]))} > ${nf(k.c)}`;
  }

  /* ── branch and bound: solve a node, branch on the largest fractional part, fathom ── */
  function bb(P) {
    const nodes = [], ev = []; let inc = null;
    const mk = (par, ex, lab) => { const n = { id: nodes.length + 1, par, ex, lab, kids: [], depth: par ? par.depth + 1 : 0 }; n.lp = lp(csOf(P, ex), P.c); if (par) par.kids.push(n); nodes.push(n); return n; };
    const snap = () => ({ st: Object.fromEntries(nodes.map(n => [n.id, n.st])), inc: inc && inc.id, seen: nodes.length });
    const judge = n => { const R = n.lp;
      if (R.st === 'inf') n.st = 'inf'; else if (R.st === 'unb') n.st = 'unb';
      else if (isI(R.b.x) && isI(R.b.y)) { if (!inc || R.b.z > inc.lp.b.z && !zeq(R.b.z, inc.lp.b.z)) { if (inc) inc.st = 'int'; n.st = 'best'; inc = n; } else n.st = 'int'; }
      else if (inc && R.b.z < inc.lp.b.z && !zeq(R.b.z, inc.lp.b.z)) n.st = 'cut'; else n.st = 'live'; };
    const root = mk(null, [], null); judge(root); ev.push(Object.assign({ t: 'solve', n: root, iz: null }, snap()));
    while (root.st !== 'unb') {
      const live = nodes.filter(n => n.st === 'live'); if (!live.length) break;
      if (nodes.length > 27) { ev.push(Object.assign({ t: 'cap' }, snap())); break; }
      live.sort((a, b) => b.lp.b.z - a.lp.b.z || a.id - b.id); const n = live[0], iz = inc ? inc.lp.b.z : null;
      if (inc && n.lp.b.z < iz && !zeq(n.lp.b.z, iz)) { n.st = 'cut'; ev.push(Object.assign({ t: 'cut', n, iz }, snap())); continue; }
      const b = n.lp.b, fr = [b.x, b.y].map(x => { const f = x - Math.floor(x); return f > EPS && f < 1 - EPS ? f : 0; });
      const v = fr[1] > fr[0] + EPS ? 1 : 0, x = v ? b.y : b.x, k = Math.floor(x);
      const lo = { v, op: '<=', k }, hi = { v, op: '>=', k: k + 1 }, order = (P.ge || []).includes(n.id) ? [hi, lo] : [lo, hi];
      n.st = 'br'; const kids = order.map(c => mk(n, n.ex.concat([c]), c));
      ev.push(Object.assign({ t: 'branch', n, v, x, k, kids, fr, eq: iz != null && zeq(b.z, iz), iz }, snap()));
      kids.forEach(m => { const z0 = inc ? inc.lp.b.z : null; judge(m); ev.push(Object.assign({ t: 'solve', n: m, iz: z0 }, snap())); });
    }
    ev.push(Object.assign({ t: 'done' }, snap()));
    // tree layout: leaves in order, a parent above the middle of its children
    let li = 0; const place = n => { if (!n.kids.length) n.lx = li++; else { n.kids.forEach(place); n.lx = (n.kids[0].lx + n.kids[n.kids.length - 1].lx) / 2; } }; place(root);
    return { nodes, ev, inc, leaves: li, depth: Math.max(...nodes.map(n => n.depth)), root };
  }

  /* ── the graph ── */
  const nice = r => { const e = 10 ** Math.floor(Math.log10(r)); for (const m of [1, 2, 5, 10]) if (m * e >= r - 1e-9) return m * e; return 10 * e; };
  function viewOf(P, cor) {
    const xs = [], ys = [];
    P.cs.forEach(k => { if (k.a > 0 && k.c > 0) xs.push(k.c / k.a); if (k.b > 0 && k.c > 0) ys.push(k.c / k.b); });
    let mx = Math.max(1, ...xs), my = Math.max(1, ...ys);
    if (cor.length) { mx = Math.max(1, Math.min(mx, Math.max(...cor.map(p => p.x)) * 1.6 + 1)); my = Math.max(1, Math.min(my, Math.max(...cor.map(p => p.y)) * 1.6 + 1)); }
    const sx = nice(mx / 6), sy = nice(my / 6);
    return { X: Math.ceil(mx * 1.08 / sx) * sx, Y: Math.ceil(my * 1.08 / sy) * sy, sx, sy };
  }
  function seg(a, b, c, X, Y) {
    const c2 = [], t = 1e-9 * Math.max(X, Y);
    if (b) { c2.push([0, c / b]); c2.push([X, (c - a * X) / b]); }
    if (a) { c2.push([c / a, 0]); c2.push([(c - b * Y) / a, Y]); }
    const inn = c2.filter(p => p[0] >= -t && p[0] <= X + t && p[1] >= -t && p[1] <= Y + t);
    if (inn.length < 2) return null;
    let best = null, d = -1; for (let i = 0; i < inn.length; i++) for (let j = i + 1; j < inn.length; j++) { const e = (inn[i][0] - inn[j][0]) ** 2 / (X * X) + (inn[i][1] - inn[j][1]) ** 2 / (Y * Y); if (e > d) { d = e; best = [inn[i], inn[j]]; } }
    return d > 1e-12 ? best : null;
  }
  const GW = 320, GH = 292, X0 = 46, X1 = 308, Y0 = 14, Y1 = 256;
  // regs: [{ ex, col }] node regions; ghost: outline of the LP relaxation; bl: branch lines [{ v, k }]; strip: { v, a, b }; pts: [{ x, y, c, r, ring }]; lat: integer points of the relaxation
  function Plot({ P, V, regs = [], ghost = false, bl = [], strip = null, pts = [], lat = false, segs = [], label, onTap }) {
    const sx = x => X0 + x / V.X * (X1 - X0), sy = y => Y1 - y / V.Y * (Y1 - Y0);
    const poly = ps => ps.map(p => sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)).join(' ');
    const tx = [], ty = []; for (let v = 0; v <= V.X + 1e-9; v += V.sx) tx.push(+v.toFixed(6)); for (let v = 0; v <= V.Y + 1e-9; v += V.sy) ty.push(+v.toFixed(6));
    const ref = useRef(null);
    const tap = e => { if (!onTap) return; const s = ref.current, p = s.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(s.getScreenCTM().inverse()); const x = (q.x - X0) / (X1 - X0) * V.X, y = (Y1 - q.y) / (Y1 - Y0) * V.Y; if (x >= -.5 && y >= -.5 && x <= V.X && y <= V.Y) onTap(x, y); };
    const area = ps => Math.abs(ps.reduce((s, p, i) => { const q = ps[(i + 1) % ps.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
    const shape = (ps, fill, stroke, key, dash) => {
      if (!ps.length) return null;
      if (ps.length > 2 && area(ps) > 1e-6 * V.X * V.Y) return html`<polygon key=${key} points=${poly(ps)} fill=${fill} stroke=${stroke} strokeWidth="1.5" strokeDasharray=${dash || null} />`;
      let a = ps[0], b = ps[0], d = -1; ps.forEach(p => ps.forEach(q => { const e = (sx(p[0]) - sx(q[0])) ** 2 + (sy(p[1]) - sy(q[1])) ** 2; if (e > d) { d = e; a = p; b = q; } }));
      return d > 4 ? html`<line key=${key} x1=${sx(a[0])} y1=${sy(a[1])} x2=${sx(b[0])} y2=${sy(b[1])} stroke=${stroke} strokeWidth="7" strokeLinecap="round" opacity=".8" />` : html`<circle key=${key} cx=${sx(a[0])} cy=${sy(a[1])} r="6" fill=${stroke} opacity=".8" />`;
    };
    const lines = P.cs.map((c, i) => ({ i, s: seg(c.a, c.b, c.c, V.X, V.Y) })).filter(o => o.s);
    const root = region(P.cs, V.X, V.Y);
    const latPts = []; if (lat && (Math.floor(V.X) + 1) * (Math.floor(V.Y) + 1) <= 320) for (let x = 0; x <= V.X + 1e-9; x++) for (let y = 0; y <= V.Y + 1e-9; y++) if (feas(P.cs, x, y)) latPts.push([x, y]);
    return html`<svg ref=${ref} className="orv6-svg" viewBox=${`0 0 ${GW} ${GH}`} role="img" aria-label=${label || 'Graph of the constraints'} onClick=${tap} style=${{ cursor: onTap ? 'crosshair' : 'default' }}>
      ${tx.map(v => html`<line key=${'gx' + v} x1=${sx(v)} x2=${sx(v)} y1=${Y0} y2=${Y1} stroke="var(--line)" strokeWidth="1" />`)}
      ${ty.map(v => html`<line key=${'gy' + v} x1=${X0} x2=${X1} y1=${sy(v)} y2=${sy(v)} stroke="var(--line)" strokeWidth="1" />`)}
      ${ghost && shape(root, 'color-mix(in srgb, var(--fig-k) 8%, transparent)', 'var(--graphite)', 'gh', '5 4')}
      ${strip && (() => { const [a, b] = [strip.a, strip.b], r = strip.v ? [[0, a], [V.X, a], [V.X, b], [0, b]] : [[a, 0], [b, 0], [b, V.Y], [a, V.Y]]; return html`<polygon points=${poly(r)} fill="color-mix(in srgb, var(--pen) 22%, transparent)" />`; })()}
      ${regs.map((r, j) => shape(region(csOf(P, r.ex), V.X, V.Y), `color-mix(in srgb, ${r.col || 'var(--fig-k)'} 32%, transparent)`, r.col || 'var(--fig-k)', 'rg' + j))}
      <line x1=${X0} x2=${X1} y1=${Y1} y2=${Y1} stroke="var(--ink)" strokeWidth="1.6" /><line x1=${X0} x2=${X0} y1=${Y0} y2=${Y1} stroke="var(--ink)" strokeWidth="1.6" />
      ${tx.map(v => html`<text key=${'tx' + v} x=${sx(v)} y=${Y1 + 19} textAnchor="middle" fontSize="15" className="orv6-mu">${v}</text>`)}
      ${ty.map(v => html`<text key=${'ty' + v} x=${X0 - 5} y=${sy(v) + 5} textAnchor="end" fontSize="15" className="orv6-mu">${v}</text>`)}
      <text x=${X1} y=${GH - 2} textAnchor="end" fontSize="15" fontStyle="italic">${P.v[0]}</text><text x="4" y=${Y0 + 4} fontSize="15" fontStyle="italic">${P.v[1]}</text>
      ${lines.map(({ i, s }) => html`<g key=${'ln' + i}><line x1=${sx(s[0][0])} y1=${sy(s[0][1])} x2=${sx(s[1][0])} y2=${sy(s[1][1])} stroke=${COL[i % 4]} strokeWidth="3" strokeLinecap="round" />
        ${(() => { const u = .2 + .16 * i, x = sx(s[0][0] + (s[1][0] - s[0][0]) * u), y = sy(s[0][1] + (s[1][1] - s[0][1]) * u); return html`<g><circle cx=${x} cy=${y} r="10" fill=${COL[i % 4]} /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="14" className="orv6-wt">${i + 1}</text></g>`; })()}</g>`)}
      ${bl.map((b, j) => { const s = b.v ? [[0, b.k], [V.X, b.k]] : [[b.k, 0], [b.k, V.Y]]; return html`<line key=${'bl' + j} x1=${sx(s[0][0])} y1=${sy(s[0][1])} x2=${sx(s[1][0])} y2=${sy(s[1][1])} stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 5" />`; })}
      ${segs.map((s, j) => html`<line key=${'sg' + j} x1=${sx(s[0])} y1=${sy(s[1])} x2=${sx(s[2])} y2=${sy(s[3])} stroke="var(--fig-k)" strokeWidth="6" strokeLinecap="round" />`)}
      ${latPts.map(p => html`<circle key=${'lt' + p} cx=${sx(p[0])} cy=${sy(p[1])} r="2.6" fill="var(--graphite)" />`)}
      ${pts.map((p, j) => html`<g key=${'pt' + j}>${p.ring && html`<circle cx=${sx(p.x)} cy=${sy(p.y)} r="11" fill="none" stroke=${p.c} strokeWidth="3" />`}<circle cx=${sx(p.x)} cy=${sy(p.y)} r=${p.r || 6} fill=${p.c} stroke="var(--paper)" strokeWidth="2" /></g>`)}
    </svg>`;
  }
  const Modes = ({ list, mode, set }) => html`<div className="orv6-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Model = ({ P, add, tag }) => html`<div className="orv6-model">
    <div className="orv6-z">Max Z = ${expr(P.c[0], P.c[1], P.v)}</div>
    ${P.cs.map((k, i) => html`<div key=${i}><span className="orv6-sw" style=${{ background: COL[i % 4] }}></span>${cstr(k, P.v)}</div>`)}
    <div>${P.v[0]}, ${P.v[1]} ≥ 0 and integer</div>
    ${add != null && html`<div className="orv6-add">${tag}${add ? ': ' + add : ''}</div>`}</div>`;
  const CTable = ({ P, R, d }) => html`<table className="orv6-tbl"><thead><tr><th>Corner</th><th>Z = ${expr(P.c[0], P.c[1], P.v)}</th></tr></thead><tbody>
    ${R.cor.map((p, j) => html`<tr key=${j} className=${p === R.b ? 'orv6-best' : ''}><td>${pstr(p, d)}</td><td>${zc(P, p, d)}</td></tr>`)}</tbody></table>`;

  /* ── the tree ── */
  const STC = { best: ['var(--ok)', 'var(--ok)'], int: ['var(--paper)', 'var(--ok)'], inf: ['var(--paper)', 'var(--pen)'], cut: ['var(--paper-2)', 'var(--graphite)'], br: ['color-mix(in srgb, var(--fig-k) 28%, var(--paper))', 'var(--fig-k)'], live: ['var(--paper)', 'var(--fig-k)'], unb: ['var(--paper)', 'var(--pen)'] };
  const Legend = () => html`<div className="orv6-leg">
    <span><i style=${{ background: 'var(--ok)', borderColor: 'var(--ok)' }}></i>best integer</span><span><i style=${{ borderColor: 'var(--ok)' }}></i>integer</span>
    <span><i style=${{ borderColor: 'var(--fig-k)', background: 'color-mix(in srgb, var(--fig-k) 28%, var(--paper))' }}></i>branched</span><span><i style=${{ borderColor: 'var(--pen)', borderStyle: 'dashed' }}></i>infeasible</span>
    <span><i style=${{ borderColor: 'var(--graphite)', borderStyle: 'dashed', background: 'var(--paper-2)' }}></i>fathomed by Z</span><span>number under a node = its Z</span></div>`;
  function Tree({ P, B, e, cur }) {
    const vis = B.nodes.filter(n => n.id <= e.seen);
    if (B.leaves > 5) return html`<div className="orv6-tree"><div className="orv6-ol">${vis.map(n => { const s = e.st[n.id];
      return html`<div key=${n.id} className=${n.id === cur ? 'orv6-on' : ''} style=${{ marginLeft: n.depth * 10 + 'px' }}>N${n.id}${n.lab ? ' · ' + P.v[n.lab.v] + ' ' + OP[n.lab.op] + ' ' + n.lab.k : ''} · ${n.lp.st === 'inf' ? 'infeasible' : !s ? '?' : pstr(n.lp.b, P.d) + ' Z = ' + nf(n.lp.b.z)}${s === 'best' ? ' ★' : ''}</div>`; })}</div><${Legend} /></div>`;
    const SP = 66, LH = 84, W = Math.max(300, (B.leaves - 1) * SP + 92), H = B.depth * LH + 64, off = (W - (B.leaves - 1) * SP) / 2;
    const px = n => off + n.lx * SP, py = n => 24 + n.depth * LH;
    return html`<div className="orv6-tree"><svg className="orv6-svg" viewBox=${`0 0 ${W} ${H}`} role="img" aria-label="The branch and bound tree so far">
      ${vis.filter(n => n.par).map(n => { const p = n.par, x1 = px(p), y1 = py(p) + 36, x2 = px(n), y2 = py(n) - 19, mx = (x1 + x2) / 2, my = (y1 + y2) / 2, left = x2 < x1;
        return html`<g key=${'e' + n.id}><line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--graphite)" strokeWidth="1.6" />
          <text x=${mx + (left ? -5 : 5)} y=${my + 5} textAnchor=${left ? 'end' : 'start'} fontSize="14" fontWeight="600">${P.v[n.lab.v]} ${OP[n.lab.op]} ${n.lab.k}</text></g>`; })}
      ${vis.map(n => { const s = e.st[n.id], [f, k] = s ? STC[s] : ['var(--paper)', 'var(--line)'], x = px(n), y = py(n), dash = s === 'inf' || s === 'cut' ? '4 3' : null;
        return html`<g key=${'n' + n.id}>${n.id === cur && html`<circle cx=${x} cy=${y} r="23" fill="none" stroke="var(--fig-s)" strokeWidth="3" />`}
          <circle cx=${x} cy=${y} r="17" fill=${f} stroke=${k} strokeWidth="2.5" strokeDasharray=${dash} />
          <text x=${x} y=${y + 5} textAnchor="middle" fontSize="15" fontWeight="700" className=${s === 'best' ? 'orv6-wt' : ''}>${n.id}</text>
          <text x=${x} y=${y + 34} textAnchor="middle" fontSize=${s === 'inf' ? 13 : 14} className=${s === 'inf' ? 'orv6-pen' : 'orv6-mu'}>${!s ? '?' : n.lp.st === 'inf' ? 'infeasible' : nf(n.lp.b.z)}</text></g>`; })}
    </svg><${Legend} /></div>`;
  }

  /* ── captions for one event of the run ── */
  const NB = n => n.id === 1 ? 'Node 1 (LP relaxation)' : `Node ${n.id}`;
  function says(P, B, e) {
    const d = P.d, V = P.v;
    if (e.t === 'solve') {
      const n = e.n, R = n.lp, add = exStr(P, n.ex), head = n.id === 1 ? 'Node 1, the <b>LP relaxation</b>: drop the integer requirement and solve graphically.' : `<b>Node ${n.id}</b> (${add}).`;
      const har = n.id === 1 ? 'الـ Node 1 هي الـ <b>LP relaxation</b>: بنشيل شرط الـ integer ونحل بالرسم.' : `الـ <b>Node ${n.id}</b> بتضيف القيود دي:` + L(add);
      if (R.st === 'inf') { const w = whyInf(P, n.ex); return { en: `${head} No point satisfies all the constraints${w ? ': ' + w : ''}. <b>Infeasible</b>, so the node is fathomed.`, ar: har + 'مفيش ولا نقطة بتحقق كل القيود' + (w ? '، لأن:' + L(w) + 'يعني' : '، يعني') + ' الـ Node دي <b>infeasible</b> وبتبقى fathomed.' }; }
      if (R.st === 'unb') return { en: head + ' The LP is <b>unbounded</b>: branch and bound needs a bounded LP.', ar: har + 'والـ LP هنا <b>unbounded</b>، والـ branch and bound محتاج LP محدود.' };
      const b = R.b, s = e.st[n.id], iz = e.iz;
      let en = `${head} Corners: ${corList(P, R.cor, d)} → <b>${solStr(P, b, d)}</b>. `, ar = har + 'والـ corners بتاعتها:' + L(corList(P, R.cor, d)) + 'وأحسن نقطة فيهم:' + L(solStr(P, b, d));
      if (n.id === 1 && s === 'best') { en += 'All integer: <b>stop</b>, this is the integer optimum.'; ar += 'الحل كله integer، يبقى <b>نوقف</b> وده الـ optimum.'; }
      else if (s === 'best') { en += `All integer${iz != null ? ` and better than ${nf(iz)}` : ''}: the new <b>best integer solution</b> (incumbent). Fathomed.`; ar += 'الحل كله integer' + (iz != null ? ' وأحسن من اللي قبله' : '') + '، فده بقى الـ <b>incumbent</b> يعني أحسن حل integer لحد دلوقتي، والـ Node دي fathomed.'; }
      else if (s === 'int') { en += `Integer, but not better than the best integer Z = ${nf(iz)}. Fathomed.`; ar += 'الحل integer بس مش أحسن من أحسن Z integer، فالـ Node دي fathomed:' + L(`${nf(b.z)} ≤ ${nf(iz)}`); }
      else if (s === 'cut') { en += `Z = ${nf(b.z)} < ${nf(iz)} (best integer so far): no branch below it can do better. Fathomed.`; ar += 'والـ Z ده أقل من أحسن Z integer، فمفيش branch تحتها هيدّي أحسن، والـ Node دي fathomed:' + L(`${nf(b.z)} < ${nf(iz)}`); }
      else if (n.id === 1) { en += `Not integer, so branch. Z = ${nf(b.z)} is an <b>upper bound</b>: no integer solution can beat it.`; ar += 'الحل فيه كسور فلازم نعمل branch. والـ Z ده <b>upper bound</b> يعني مفيش حل integer هيعدّيه.'; }
      else if (iz != null) { en += `Fractional, and Z = ${nf(b.z)} ${zeq(b.z, iz) ? '=' : '>'} ${nf(iz)} (best so far): still <b>live</b>.`; ar += 'الحل فيه كسور والـ Z ده ' + (zeq(b.z, iz) ? 'مش أقل من' : 'أكبر من') + ' أحسن Z integer، فالـ Node لسه <b>live</b>:' + L(`${nf(b.z)} ${zeq(b.z, iz) ? '=' : '>'} ${nf(iz)}`); }
      else { en += 'Fractional: still <b>live</b>.'; ar += 'الحل فيه كسور، فالـ Node دي لسه <b>live</b>.'; }
      return { en, ar };
    }
    if (e.t === 'branch') {
      const n = e.n, v = V[e.v], [a, c] = e.kids, rule = `${v} ≤ ${e.k}`, rule2 = `${v} ≥ ${e.k + 1}`;
      const why = e.fr[0] && e.fr[1] ? `${v} has the larger fractional part (${nf(e.fr[e.v], 3)} vs ${nf(e.fr[1 - e.v], 3)})` : `${v} is the fractional one`;
      const whyA = e.fr[0] && e.fr[1] ? 'لأن الجزء العشري بتاعه أكبر:' + L(`${nf(e.fr[e.v], 3)} > ${nf(e.fr[1 - e.v], 3)}`) : 'لأنه هو اللي فيه كسر.';
      let en = '', ar = '';
      if (e.eq) { en = `Node ${n.id} has Z = ${nf(n.lp.b.z)}, equal to the best integer Z: it cannot give a better answer, but its branches are checked here as the notes do. `; ar = `الـ Z بتاع الـ Node ${n.id} بيساوي أحسن Z integer، فمش هتدّي إجابة أحسن، بس بنكمّل الـ branches بتاعتها زي الـ notes:` + L(`Z = ${nf(n.lp.b.z)} = ${nf(e.iz)}`); }
      en += `Branch Node ${n.id} on <b>${v} = ${nf(e.x, d)}</b> (${why}): Node ${a.id} gets ${exOne(P, a.lab)}, Node ${c.id} gets ${exOne(P, c.lab)}. The strip ${e.k} < ${v} < ${e.k + 1} holds no integer ${v} and is removed.`;
      ar += `بنعمل branch على الـ ${v} ` + whyA + 'والقيدين الجداد:' + L(`Node ${a.id}: ${exOne(P, a.lab)} ; Node ${c.id}: ${exOne(P, c.lab)}`) + `والشريط ده بيتشال لأن مفيهوش ${v} integer:` + L(`${e.k} < ${v} < ${e.k + 1}`);
      void rule; void rule2;
      return { en, ar };
    }
    if (e.t === 'cut') return { en: `Node ${e.n.id}: Z = ${nf(e.n.lp.b.z)} is now below the best integer Z = ${nf(e.iz)}. Fathomed.`, ar: `الـ Z بتاع الـ Node ${e.n.id} بقى أقل من أحسن Z integer، فهي fathomed:` + L(`${nf(e.n.lp.b.z)} < ${nf(e.iz)}`) };
    if (e.t === 'cap') return { en: 'The tree is getting large: stopped here.', ar: 'الـ tree كبرت أوي، فوقفنا هنا.' };
    const inc = B.inc;
    if (!inc) return { en: B.root.lp.st === 'unb' ? 'The LP relaxation is unbounded.' : 'No live node remains and no integer solution was found: the integer program is <b>infeasible</b>.', ar: B.root.lp.st === 'unb' ? 'الـ LP relaxation هنا unbounded.' : 'مفيش ولا live node ومالقيناش ولا حل integer، يعني الـ integer program <b>infeasible</b>.' };
    const end = P.end || ['', ''];
    return { en: `No live node remains: the best integer solution found is <b>optimal</b>: <b>${solStr(P, inc.lp.b, 0)}</b> (Node ${inc.id}).${end[0] ? ' ' + end[0] : ''}`, ar: 'مفيش ولا live node فاضلة، فأحسن حل integer لقيناه هو الـ <b>optimal</b>:' + L(`${solStr(P, inc.lp.b, 0)} (Node ${inc.id})`) + (end[1] || '') };
  }
  const exOne = (P, c) => `${P.v[c.v]} ${OP[c.op]} ${c.k}`;

  /* ── a full run, event by event: graph, corner table, tree ── */
  function viewFor(P, B) { return viewOf(P, B.root.lp.cor || []); }
  function Run({ ar, P, ms = 3600, label }) {
    const ref = useRef(null); if (!ref.current || ref.current.P !== P) ref.current = { P, B: bb(P) };
    const B = ref.current.B, [i, ctl] = useSteps(B.ev.length, ms), e = B.ev[Math.min(i, B.ev.length - 1)], V = viewFor(P, B), d = P.d;
    let regs = [], bl = [], strip = null, pts = [], tbl = null, cur = null, tag = null, add = null;
    const incN = e.inc ? B.nodes[e.inc - 1] : null, incPt = incN ? [{ x: incN.lp.b.x, y: incN.lp.b.y, c: 'var(--ok)', r: 7, ring: true }] : [];
    const lines = ex => ex.filter(c => c.op === '<=' ? c.k >= 0 : true).map(c => ({ v: c.v, k: c.k }));
    if (e.t === 'solve' || e.t === 'cut') {
      const n = e.n; cur = n.id; regs = [{ ex: n.ex }]; bl = lines(n.ex); tag = n.id === 1 ? 'Node 1: LP relaxation' : 'Node ' + n.id; add = n.id === 1 ? '' : exStr(P, n.ex);
      if (n.lp.st !== 'inf' && n.lp.b) { pts = [{ x: n.lp.b.x, y: n.lp.b.y, c: e.st[n.id] === 'best' || e.st[n.id] === 'int' ? 'var(--ok)' : e.st[n.id] === 'cut' ? 'var(--graphite)' : 'var(--fig-k)', r: 7 }]; tbl = n.lp; }
      if (incN && incN !== n) pts = incPt.concat(pts);
    } else if (e.t === 'branch') {
      const n = e.n; cur = n.id; regs = e.kids.map(k => ({ ex: k.ex })); strip = { v: e.v, a: e.k, b: e.k + 1 }; bl = [{ v: e.v, k: e.k }, { v: e.v, k: e.k + 1 }];
      pts = incPt.concat([{ x: n.lp.b.x, y: n.lp.b.y, c: 'var(--pen)', r: 7 }]); tag = 'Branch Node ' + n.id; add = e.kids.map(k => 'Node ' + k.id + ' ' + exOne(P, k.lab)).join(' | ');
    } else if (incN) { pts = incPt; regs = [{ ex: incN.ex, col: 'var(--ok)' }]; tag = 'Optimal'; add = solStr(P, incN.lp.b, 0); }
    const t = says(P, B, e);
    return html`<figure className="fig orv6"><div className="fig-stage">
      <${Model} P=${P} add=${add} tag=${tag} />
      <${Plot} P=${P} V=${V} regs=${regs} ghost=${true} bl=${bl} strip=${strip} pts=${pts} lat=${true} label=${label || 'The feasible region of the current node with its integer points'} />
      ${tbl && html`<${CTable} P=${P} R=${tbl} d=${d} />`}
      ${e.t === 'done' && B.inc && html`<p className="orv6-verdict orv6-good">Optimal: ${solStr(P, B.inc.lp.b, 0)}</p>`}
      <${Tree} P=${P} B=${B} e=${e} cur=${cur} />
      </div><${Cap} en=${t.en} ar=${t.ar} showAr=${ar} /><${Bar} steps=${B.ev} i=${Math.min(i, B.ev.length - 1)} ctl=${ctl} /></figure>`;
  }

  /* ── the notes' problems ── */
  const X12 = ['x1', 'x2'];
  const SH2 = { v: X12, c: [40, 30], cs: [C(10, 6, '<=', 35), C(1, 1, '<=', 4)], ge: [3], d: 2,
    end: ['Node 5\'s branches give (3, 0) = 120 and x1 ≥ 4 infeasible, as in the notes.', 'والـ branches بتاعة الـ Node 5 بتدّي النتيجة دي زي الـ notes:' + L('(3, 0) = 120 ; x1 ≥ 4 infeasible')] };
  const SH1 = { v: X12, c: [3, 4], cs: [C(1, 3, '<=', 13), C(5, 2, '<=', 20)], ge: [1], d: 3 };
  const MORE = [
    { key: 'j23', t: 'Final 2022/23 Jan', P: { v: X12, c: [80, 45], cs: [C(1, 1, '<=', 7), C(12, 5, '<=', 60), C(1, 0, '>=', 4), C(0, 1, '<=', 2)], d: 2 } },
    { key: 'f20', t: 'Final 2019/20', P: { v: X12, c: [20, 30], cs: [C(3, 6, '<=', 40), C(10, 5, '<=', 50), C(0, 1, '>=', 6), C(1, 0, '<=', 1)], d: 2 } },
    { key: 'f26', t: 'Final 2025/26', P: { v: ['X', 'Y'], c: [100, 150], cs: [C(8000, 4000, '<=', 40000), C(15, 30, '<=', 200), C(0, 1, '>=', 6), C(1, 0, '<=', 1)], d: 2 } },
    { key: 'f25', t: 'Final 2024/25', P: { v: X12, c: [3, 12], cs: [C(2, 4, '<=', 7), C(5, 3, '<=', 15), C(0, 1, '<=', 1)], d: 2 } },
    { key: 's1', t: 'Section ex. 1', P: { v: X12, c: [8, 5], cs: [C(9, 5, '<=', 45), C(1, 1, '<=', 6)], d: 2 } },
    { key: 's3', t: 'Section ex. 3', P: { v: X12, c: [5, 2], cs: [C(10, 5, '<=', 16)], ge: [1], d: 2,
      end: ['The notes follow the (0.6, 2) branch further, down to (0, 3), Z = 6; here it already stops at (0, 3.2), Z = 6.4 < 7.', 'الـ notes بتكمّل الـ branch بتاع النقطة ' + I('(0.6, 2)') + ' لحد ' + I('(0, 3)') + ' بقيمة ' + I('Z = 6') + '، وهنا بنوقف بدري عند النقطة دي لأنها أقل من 7:' + L('(0, 3.2) → Z = 6.4 < 7')] } },
    { key: 'q1', t: 'Sheet 1 (2022/23) Q1', P: { v: X12, c: [3, 4], cs: [C(2, 1, '<=', 6), C(2, 3, '<=', 9), C(0, 1, '>=', 2), C(1, 0, '<=', 1)], d: 2 } }];

  const Sheet2 = ({ ar }) => html`<${Run} ar=${ar} P=${SH2} label="Sheet 2: the lines 10x1 + 6x2 = 35 and x1 + x2 = 4, the current node's region and the integer points" />`;
  const Sheet1 = ({ ar }) => html`<${Run} ar=${ar} P=${SH1} label="Sheet 1: the lines x1 + 3x2 = 13 and 5x1 + 2x2 = 20, the current node's region and the integer points" />`;

  /* ── [5] the other solved problems, or your own ── */
  function Solver({ ar }) {
    const [mode, setMode] = useState('j23'), [own, setOwn] = useState({ c1: 5, c2: 4, cs: [{ a: 6, b: 4, op: '<=', c: 24 }, { a: 1, b: 2, op: '<=', c: 6 }] });
    const ex = MORE.find(x => x.key === mode);
    const ownP = useRef(null), sig = JSON.stringify(own);
    if (!ex && (!ownP.current || ownP.current.sig !== sig)) ownP.current = { sig, P: { v: X12, c: [+own.c1 || 0, +own.c2 || 0], cs: own.cs.map(k => C(+k.a || 0, +k.b || 0, k.op, +k.c || 0)).filter(k => k.a || k.b), d: 2 } };
    const P = ex ? ex.P : ownP.current.P;
    const setC = (j, f, v) => setOwn(o => Object.assign({}, o, { cs: o.cs.map((k, i) => i === j ? Object.assign({}, k, { [f]: v }) : k) }));
    const editor = !ex && html`<div className="orv6-ed">
      <div className="orv6-l">Max Z = <input type="number" step="any" value=${own.c1} onInput=${e => setOwn(o => Object.assign({}, o, { c1: e.target.value }))} aria-label="c1" /> x1 + <input type="number" step="any" value=${own.c2} onInput=${e => setOwn(o => Object.assign({}, o, { c2: e.target.value }))} aria-label="c2" /> x2</div>
      ${own.cs.map((k, j) => html`<div key=${j} className="orv6-l"><span className="orv6-sw" style=${{ background: COL[j % 4] }}></span>
        <input type="number" step="any" value=${k.a} onInput=${e => setC(j, 'a', e.target.value)} aria-label=${'a' + (j + 1)} /> x1 + <input type="number" step="any" value=${k.b} onInput=${e => setC(j, 'b', e.target.value)} aria-label=${'b' + (j + 1)} /> x2
        <select value=${k.op} onChange=${e => setC(j, 'op', e.target.value)} aria-label="sign"><option value="<=">≤</option><option value=">=">≥</option></select>
        <input type="number" step="any" value=${k.c} onInput=${e => setC(j, 'c', e.target.value)} aria-label=${'c' + (j + 1)} />
        ${own.cs.length > 1 && html`<button className="fig-btn" onClick=${() => setOwn(o => Object.assign({}, o, { cs: o.cs.filter((_, i) => i !== j) }))} aria-label="remove constraint">✕</button>`}</div>`)}
      ${own.cs.length < 3 && html`<div className="orv6-l"><button className="fig-btn" onClick=${() => setOwn(o => Object.assign({}, o, { cs: o.cs.concat({ a: 1, b: 1, op: '<=', c: 5 }) }))}>+ constraint</button></div>`}</div>`;
    return html`<div className="orv6">
      <div className="orv6-row" role="group">${MORE.map(x => html`<button key=${x.key} className="fig-btn" aria-pressed=${String(mode === x.key)} onClick=${() => setMode(x.key)}>${x.t}</button>`)}<button className="fig-btn" aria-pressed=${String(mode === 'own')} onClick=${() => setMode('own')}>Try your own</button></div>
      ${editor}
      <${Run} key=${mode + (ex ? '' : sig)} ar=${ar} P=${P} ms=${3000} label="The chosen problem: its lines, the current node's region and the integer points" /></div>`;
  }

  /* ── [0] the kinds of integer programs on Sheet 2's constraints ── */
  function Kinds({ ar }) {
    const [m, setM] = useState('lp'), P = SH2, R = lp(P.cs, P.c), V = viewOf(P, R.cor), z = (x, y) => P.c[0] * x + P.c[1] * y;
    const latt = []; for (let x = 0; x <= 5; x++) for (let y = 0; y <= 7; y++) if (feas(P.cs, x, y)) latt.push({ x, y, z: z(x, y) });
    const best = a => a.reduce((b, p) => p.z > b.z ? p : b, a[0]);
    const pure = best(latt);
    const mix = [0, 1, 2, 3].map(k => { const r = lp(P.cs.concat([C(1, 0, '<=', k), C(1, 0, '>=', k)]), P.c); return r.st === 'ok' ? { k, lo: Math.min(...r.cor.map(p => p.y)), hi: Math.max(...r.cor.map(p => p.y)), b: r.b } : null; }).filter(Boolean);
    const mb = mix.reduce((b, s) => s.b.z > b.b.z ? s : b, mix[0]).b;
    const bin = [[0, 0], [1, 0], [0, 1], [1, 1]].filter(p => feas(P.cs, p[0], p[1])).map(p => ({ x: p[0], y: p[1], z: z(p[0], p[1]) })), bb1 = best(bin);
    const T = {
      lp: { t: 'LP relaxation', en: `<b>LP relaxation</b>: omit the integer constraints. Every point of the shaded region counts. Best: (2.75, 1.25), Z = ${nf(R.b.z)}.`, ar: 'الـ <b>LP relaxation</b>: بنشيل شروط الـ integer، فأي نقطة في المنطقة المظللة تنفع. وأحسن نقطة:' + L(`(2.75, 1.25) → Z = ${nf(R.b.z)}`) },
      pure: { t: 'Pure IP', en: `<b>Pure integer</b>: ALL variables integer, so only the dots inside the region count (${latt.length} points). Best: (${pure.x}, ${pure.y}), Z = ${pure.z}.`, ar: `الـ <b>Pure integer</b>: كل الـ variables لازم integer، فالنقط اللي جوه المنطقة بس هي اللي تنفع وعددها ${latt.length}. وأحسنهم:` + L(`(${pure.x}, ${pure.y}) → Z = ${pure.z}`) },
      mix: { t: 'Mixed IP', en: `<b>Mixed integer</b>: only SOME variables integer. If only x1 must be an integer, the feasible points are the vertical segments x1 = 0, 1, 2, 3. Best: (${nf(mb.x)}, ${nf(mb.y)}), Z = ${nf(mb.z)}.`, ar: 'الـ <b>Mixed integer</b>: بعض الـ variables بس لازم integer. لو الـ x1 بس هو اللي لازم integer، يبقى النقط اللي تنفع هي الخطوط الرأسية دي:' + L('x1 = 0, 1, 2, 3') + 'وأحسن نقطة:' + L(`(${nf(mb.x)}, ${nf(mb.y)}) → Z = ${nf(mb.z)}`) },
      bin: { t: '0-1 IP', en: `<b>0-1 (binary)</b>: every variable equals 0 or 1, so only (0, 0), (1, 0), (0, 1), (1, 1). Best: (${bb1.x}, ${bb1.y}), Z = ${bb1.z}.`, ar: 'في الـ <b>binary</b> اللي هو ' + I('0-1') + ' كل variable بيبقى يا 0 يا 1، فمفيش غير 4 نقط بس. وأحسنهم:' + L(`(${bb1.x}, ${bb1.y}) → Z = ${bb1.z}`) } };
    const c = T[m], note = ` The stricter the conditions, the lower the best Z: ${nf(R.b.z)} ≥ ${nf(mb.z)} ≥ ${pure.z} ≥ ${bb1.z}.`;
    const noteAr = 'وكل ما الشروط تزيد أحسن Z بيقل:' + L(`${nf(R.b.z)} ≥ ${nf(mb.z)} ≥ ${pure.z} ≥ ${bb1.z}`);
    const pts = m === 'lp' ? [{ x: R.b.x, y: R.b.y, c: 'var(--fig-k)', r: 7, ring: true }] : m === 'pure' ? latt.map(p => ({ x: p.x, y: p.y, c: p === pure ? 'var(--ok)' : 'var(--graphite)', r: p === pure ? 7 : 4.5, ring: p === pure })) : m === 'mix' ? [{ x: mb.x, y: mb.y, c: 'var(--ok)', r: 7, ring: true }] : bin.map(p => ({ x: p.x, y: p.y, c: p === bb1 ? 'var(--ok)' : 'var(--graphite)', r: p === bb1 ? 7 : 4.5, ring: p === bb1 }));
    return html`<figure className="fig orv6"><div className="fig-stage">
      <${Modes} list=${Object.keys(T).map(k => [k, T[k].t])} mode=${m} set=${setM} />
      <${Model} P=${P} />
      <${Plot} P=${P} V=${V} regs=${m === 'lp' ? [{ ex: [] }] : []} ghost=${m !== 'lp'} segs=${m === 'mix' ? mix.map(s => [s.k, s.lo, s.k, s.hi]) : []} pts=${pts} label="Sheet 2's constraints: the feasible points for the LP relaxation, pure, mixed and binary versions" />
      </div><${Cap} en=${c.en + note} ar=${c.ar + noteAr} showAr=${ar} /></figure>`;
  }

  /* ── [1] why rounding fails (Sheet 2), tap any integer point ── */
  function Round({ ar }) {
    const P = SH2, R = lp(P.cs, P.c), V = viewOf(P, R.cor), z = (x, y) => P.c[0] * x + P.c[1] * y;
    const chk = (x, y) => { const bad = P.cs.filter(k => !ok(k, x, y)); return { x, y, z: z(x, y), ok: !bad.length && x >= 0 && y >= 0, bad }; };
    const four = [[3, 1], [3, 2], [2, 1], [2, 2]].map(p => chk(p[0], p[1]));
    const tm = (a, x) => a === 1 ? String(x) : `${nf(a)}(${x})`, lhs = (k, p) => `${tm(k.a, p.x)} + ${tm(k.b, p.y)} = ${val(k, p.x, p.y)} > ${k.c}`;
    const steps = [
      { en: `The LP relaxation's optimum is <b>(2.75, 1.25)</b>, Z = ${nf(R.b.z)}. But x1 and x2 must be integers.`, ar: 'الـ optimum بتاع الـ LP relaxation هو النقطة دي، بس الـ x1 والـ x2 لازم يبقوا integers:' + L(`(2.75, 1.25) → Z = ${nf(R.b.z)}`), p: [] },
      { en: 'Round to the nearest integers: <b>(3, 1)</b>. It breaks 10x1 + 6x2 ≤ 35: 10(3) + 6(1) = 36 > 35. <b>Infeasible.</b>', ar: 'لو قرّبنا لأقرب integers هتطلع النقطة ' + I('(3, 1)') + '، وهي بتكسر القيد ده:' + L('10(3) + 6(1) = 36 > 35') + 'يعني <b>infeasible</b>.', p: [four[0]] },
      { en: 'All four roundings: (3, 2) is infeasible too; (2, 1) is feasible but Z = 110; (2, 2) is feasible with Z = 140. Rounding down is safe here but <b>not optimal</b>.', ar: 'كل التقريبات الأربعة: النقطة ' + I('(3, 2)') + ' برضه infeasible، والنقطة ' + I('(2, 1)') + ' feasible بس قيمتها ' + I('Z = 110') + '، والنقطة ' + I('(2, 2)') + ' feasible وقيمتها ' + I('Z = 140') + '. يعني التقريب لتحت ممكن ينفع بس <b>مش optimal</b>.', p: four },
      { en: `Branch and bound finds the integer optimum <b>(2, 2), Z = 140</b>. For a MAX problem the LP Z is an <b>upper bound</b>: 140 ≤ ${nf(R.b.z)}, and every branch can only lower it. Tap any dot to test it.`, ar: 'الـ branch and bound بيلاقي الـ integer optimum ده:' + L('(2, 2) → Z = 140') + 'وفي مسألة الـ MAX الـ Z بتاع الـ LP بيبقى <b>upper bound</b>، وكل branch ممكن بس يقلله:' + L(`140 ≤ ${nf(R.b.z)}`) + 'دوس على أي نقطة علشان تختبرها.', p: [four[3]] }];
    const [i, ctl] = useSteps(steps.length, 3400), [tp, setTp] = useState(null);
    useEffect(() => { setTp(null); }, [i]);
    const s = steps[i], tap = (x, y) => { const X = Math.round(x), Y = Math.round(y); if (X >= 0 && Y >= 0) setTp(chk(X, Y)); };
    const show = tp ? [tp] : s.p, col = p => p.ok ? (p.x === 2 && p.y === 2 && i === 3 ? 'var(--ok)' : 'var(--fig-k)') : 'var(--pen)';
    let en = s.en, a = s.ar;
    if (tp) { en = `(${tp.x}, ${tp.y}): ${tp.ok ? `feasible, Z = 40(${tp.x}) + 30(${tp.y}) = ${tp.z}${tp.z === 140 ? ', the best integer point' : ''}.` : 'infeasible: ' + tp.bad.map(k => lhs(k, tp)).join(' and ') + '.'}`;
      a = tp.ok ? `النقطة ${I(`(${tp.x}, ${tp.y})`)} feasible وقيمتها:` + L(`Z = 40(${tp.x}) + 30(${tp.y}) = ${tp.z}`) + (tp.z === 140 ? 'ودي أحسن نقطة integer.' : '') : `النقطة ${I(`(${tp.x}, ${tp.y})`)} infeasible لأنها بتكسر:` + L(tp.bad.map(k => lhs(k, tp)).join(' ; ')); }
    return html`<figure className="fig orv6"><div className="fig-stage">
      <${Model} P=${P} />
      <${Plot} P=${P} V=${V} regs=${[{ ex: [] }]} lat=${true} pts=${[{ x: R.b.x, y: R.b.y, c: 'var(--ink)', r: 6 }].concat(show.map(p => ({ x: p.x, y: p.y, c: col(p), r: 7, ring: true })))} onTap=${tap} label="Sheet 2's feasible region, the LP optimum (2.75, 1.25) and the integer points around it; tap a point to test it" />
      ${(tp ? [tp] : s.p).length > 0 && html`<table className="orv6-tbl"><thead><tr><th>Point</th><th>Feasible? Z</th></tr></thead><tbody>${(tp ? [tp] : s.p).map((p, j) => html`<tr key=${j} className=${p.ok && p.z === 140 ? 'orv6-best' : ''}><td>(${p.x}, ${p.y})</td><td>${p.ok ? 'yes, Z = ' + p.z : 'no: ' + p.bad.map(k => lhs(k, p)).join('; ')}</td></tr>`)}</tbody></table>`}
      <p className="orv6-verdict">Tap any dot to test it.</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.1–2.2] branching removes a strip; each sub-problem is solved graphically ── */
  function Branch({ ar }) {
    const P = SH2, B = useRef(null); if (!B.current) B.current = bb(P);
    const [r, n2, n3] = B.current.nodes, V = viewOf(P, r.lp.cor);
    const steps = [
      { en: 'Node 1 (LP relaxation): x1 = 2.75, x2 = 1.25, Z = 147.5. x1 is fractional (and has the largest fractional part, 0.75).', ar: 'الـ Node 1 هي الـ LP relaxation، والحل بتاعها فيه x1 كسر وجزءه العشري هو الأكبر:' + L('x1 = 2.75, x2 = 1.25, Z = 147.5'), regs: [{ ex: [] }], pts: [{ x: 2.75, y: 1.25, c: 'var(--pen)', r: 7 }] },
      { en: 'No integer x1 lies strictly between 2 and 3, so the strip <b>2 < x1 < 3</b> can be thrown away. That strip holds the LP optimum.', ar: 'مفيش x1 integer بين 2 و 3، فالشريط ده ممكن نشيله، وهو اللي فيه الـ LP optimum:' + L('2 < x1 < 3'), regs: [{ ex: [] }], strip: true, bl: true, pts: [{ x: 2.75, y: 1.25, c: 'var(--pen)', r: 7 }] },
      { en: 'Two sub-problems: <b>Node 2</b> adds x1 ≤ 2 (left part), <b>Node 3</b> adds x1 ≥ 3 (right part). Each new constraint is a vertical line.', ar: 'كده بقى عندنا اتنين sub-problems، وكل constraint جديد خط رأسي:' + L('Node 2: x1 ≤ 2 ; Node 3: x1 ≥ 3'), regs: [{ ex: n2.ex }, { ex: n3.ex }], strip: true, bl: true, pts: [] },
      { en: `Solve Node 2 graphically. Corners: ${corList(P, n2.lp.cor, 2)} → <b>(2, 2), Z = 140</b>, all integer.`, ar: 'بنحل الـ Node 2 بالرسم، والـ corners بتاعتها:' + L(corList(P, n2.lp.cor, 2)) + 'وأحسنهم integer:' + L('(2, 2) → Z = 140'), regs: [{ ex: n2.ex }], bl: true, pts: [{ x: 2, y: 2, c: 'var(--ok)', r: 7, ring: true }], tb: n2.lp },
      { en: `Solve Node 3 graphically. Corners: ${corList(P, n3.lp.cor, 2)} → <b>(3, 0.83), Z = 145</b>: x2 is still fractional.`, ar: 'بنحل الـ Node 3 بالرسم، والـ corners بتاعتها:' + L(corList(P, n3.lp.cor, 2)) + 'وأحسنهم لسه فيه x2 كسر:' + L('(3, 0.83) → Z = 145'), regs: [{ ex: n3.ex }], bl: true, pts: [{ x: 3, y: 5 / 6, c: 'var(--fig-k)', r: 7, ring: true }], tb: n3.lp }];
    const [i, ctl] = useSteps(steps.length, 3200), s = steps[i];
    return html`<figure className="fig orv6"><div className="fig-stage">
      <${Model} P=${P} />
      <${Plot} P=${P} V=${V} regs=${s.regs} ghost=${true} strip=${s.strip ? { v: 0, a: 2, b: 3 } : null} bl=${s.bl ? [{ v: 0, k: 2 }, { v: 0, k: 3 }] : []} pts=${s.pts} lat=${true} label="Branching on x1 = 2.75: the strip 2 < x1 < 3 is removed, leaving x1 ≤ 2 and x1 ≥ 3" />
      ${s.tb && html`<${CTable} P=${P} R=${s.tb} d=${2} />`}
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.3] the three ways a node is fathomed ── */
  function Fathom({ ar }) {
    const P = SH2, B = useRef(null); if (!B.current) B.current = bb(P);
    const N = B.current.nodes, V = viewOf(P, N[0].lp.cor), [m, setM] = useState('int');
    const T = {
      int: { t: 'Integer', n: N[1], en: '<b>Its solution is integer.</b> Node 2 (x1 ≤ 2): (2, 2), Z = 140. Nothing to branch on; it becomes the incumbent (best integer so far), Z = 140.', ar: '<b>الحل بتاعها integer.</b> في الـ Node 2 الحل طلع كده:' + L('x1 ≤ 2 → (2, 2), Z = 140') + 'فمفيش حاجة نعمل عليها branch، وبقى هو الـ incumbent يعني أحسن حل integer لحد دلوقتي.', pt: 'var(--ok)' },
      inf: { t: 'Infeasible', n: N[3], en: '<b>It is infeasible.</b> Node 4 (x1 ≥ 3, x2 ≥ 1): the smallest point allowed, (3, 1), already gives 10(3) + 6(1) = 36 > 35, so the region is empty.', ar: '<b>الـ Node بتبقى infeasible.</b> في الـ Node 4 أصغر نقطة مسموحة هي ' + I('(3, 1)') + ' ودي لوحدها بتكسر القيد:' + L('10(3) + 6(1) = 36 > 35') + 'يعني المنطقة فاضية.', pt: null },
      bnd: { t: 'Z not better', n: N[4], en: '<b>Its Z is not better than the best integer Z.</b> Node 5 (x1 ≥ 3, x2 ≤ 0): (3.5, 0), Z = 140, not better than 140. Any branch below it can only lower Z. (Sheet 1 has a sharper case: 17.6 < 19.)', ar: '<b>الـ Z بتاعها مش أحسن من أحسن Z integer.</b> في الـ Node 5 الحل طلع كده:' + L('x1 ≥ 3, x2 ≤ 0 → (3.5, 0), Z = 140 ≤ 140') + 'وأي branch تحتها هيقلل الـ Z بس. (وفي الـ Sheet 1 حالة أوضح:' + I('17.6 < 19') + ')', pt: 'var(--graphite)' } };
    const c = T[m], n = c.n;
    return html`<figure className="fig orv6"><div className="fig-stage">
      <${Modes} list=${Object.keys(T).map(k => [k, T[k].t])} mode=${m} set=${setM} />
      <${Model} P=${P} add=${exStr(P, n.ex)} tag=${'Node ' + n.id} />
      <${Plot} P=${P} V=${V} regs=${[{ ex: n.ex }]} ghost=${true} bl=${n.ex.map(e => ({ v: e.v, k: e.k }))} lat=${true} pts=${(c.pt ? [{ x: n.lp.b.x, y: n.lp.b.y, c: c.pt, r: 7, ring: true }] : [{ x: 3, y: 1, c: 'var(--pen)', r: 7, ring: true }])} label=${'Fathomed node: ' + c.t} />
      <p className=${'orv6-verdict' + (m === 'inf' ? ' orv6-bad' : m === 'int' ? ' orv6-good' : '')}>Node ${n.id}: fathomed (${c.t.toLowerCase()})</p>
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  /* ── [2.5] x ≥ y and x ≤ y ⇒ x = y ── */
  function Equal({ ar }) {
    const P = SH2, R = lp(P.cs, P.c), V = viewOf(P, R.cor);
    const e3 = [{ v: 0, op: '>=', k: 3 }], e33 = e3.concat([{ v: 0, op: '<=', k: 3 }]), e6 = [{ v: 0, op: '>=', k: 3 }, { v: 1, op: '<=', k: 0 }, { v: 0, op: '<=', k: 3 }];
    const r33 = lp(csOf(P, e33), P.c), r6 = lp(csOf(P, e6), P.c);
    const steps = [
      { en: 'Node 3 has x1 ≥ 3: a small triangle to the right of the line x1 = 3.', ar: 'الـ Node 3 فيها القيد ده، وده مثلث صغير يمين الخط ' + I('x1 = 3') + ':' + L('x1 ≥ 3'), ex: e3 },
      { en: `Add x1 ≤ 3 on top of x1 ≥ 3: x1 ≥ 3 and x1 ≤ 3 ⇒ <b>x1 = 3</b>. The region shrinks to the segment on the line x1 = 3, from (3, 0) to (3, 0.83); its best point is (3, 0.83), Z = ${nf(r33.b.z)}.`, ar: 'لو ضفنا ' + I('x1 ≤ 3') + ' فوق ' + I('x1 ≥ 3') + ' يبقى الـ x1 بيساوي 3 بالظبط:' + L('x1 ≥ 3 and x1 ≤ 3 ⇒ x1 = 3') + 'والمنطقة بقت خط بس من ' + I('(3, 0)') + ' لـ ' + I('(3, 0.83)') + '، وأحسن نقطة عليه:' + L(`(3, 0.83) → Z = ${nf(r33.b.z)}`), ex: e33, b: r33.b },
      { en: `In the notes this happens below Node 5 (x1 ≥ 3, x2 ≤ 0): adding x1 ≤ 3 leaves the single point (3, 0), Z = ${nf(r6.b.z)}.`, ar: 'في الـ notes ده بيحصل تحت الـ Node 5، ولما نضيف ' + I('x1 ≤ 3') + ' بيفضل نقطة واحدة:' + L(`x1 = 3, x2 ≤ 0 → (3, 0), Z = ${nf(r6.b.z)}`), ex: e6, b: r6.b }];
    const [i, ctl] = useSteps(steps.length, 3400), s = steps[i];
    return html`<figure className="fig orv6"><div className="fig-stage">
      <${Model} P=${P} add=${exStr(P, s.ex)} tag="Added" />
      <${Plot} P=${P} V=${V} regs=${[{ ex: s.ex }]} ghost=${true} bl=${[{ v: 0, k: 3 }].concat(i === 2 ? [{ v: 1, k: 0 }] : [])} pts=${s.b ? [{ x: s.b.x, y: s.b.y, c: 'var(--fig-k)', r: 7, ring: true }] : []} lat=${true} label="x1 ≥ 3 and x1 ≤ 3 together leave only the line x1 = 3" />
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.0–2.4] the procedure as a flowchart, walked on Sheet 2 ── */
  function Flow({ ar }) {
    const BX = [
      { k: 'a', t: '<b>1.</b> Solve the LP relaxation graphically (corner point table).' },
      { k: 'q', q: true, t: 'Is the optimum integer?' },
      { k: 'b', t: '<b>2.</b> Branch on the variable with the largest fractional part: x ≤ ⌊v⌋ and x ≥ ⌊v⌋ + 1.' },
      { k: 'c', t: '<b>3.</b> Solve each sub-problem graphically.' },
      { k: 'd', t: '<b>4.</b> Fathom a node if it is integer (incumbent if better), infeasible, or its Z is not better than the best integer Z.' },
      { k: 'e', q: true, t: '<b>5.</b> Any live node left?' },
      { k: 'f', t: 'The best integer solution found is <b>optimal</b>.' }];
    const steps = [
      { on: 'a', ex: { a: '(2.75, 1.25), Z = 147.5' }, en: 'Step 1 on Sheet 2: the LP relaxation gives (2.75, 1.25), Z = 147.5.', ar: 'الخطوة 1 على الـ Sheet 2: الـ LP relaxation بتدّي:' + L('(2.75, 1.25) → Z = 147.5') },
      { on: 'q', ex: { q: 'no: x1 = 2.75' }, en: 'Is it integer? No: x1 = 2.75 (and x2 = 1.25). If it were integer we would stop here.', ar: 'هل الحل integer؟ لأ، فيه كسور. ولو كان integer كنا وقفنا هنا:' + L('x1 = 2.75, x2 = 1.25') },
      { on: 'b', ex: { b: 'x1 = 2.75 → x1 ≤ 2 | x1 ≥ 3' }, en: 'Step 2: x1 has the largest fractional part (0.75), so branch: x1 ≤ 2 and x1 ≥ 3.', ar: 'الخطوة 2: الـ x1 الجزء العشري بتاعه أكبر، فبنعمل branch:' + L('x1 = 2.75 → x1 ≤ 2 | x1 ≥ 3') },
      { on: 'c', ex: { c: 'Node 2: (2, 2) = 140 ; Node 3: (3, 0.83) = 145' }, en: 'Step 3: solve both: Node 2 gives (2, 2), Z = 140; Node 3 gives (3, 0.83), Z = 145.', ar: 'الخطوة 3: بنحل الاتنين:' + L('Node 2: (2, 2) = 140 ; Node 3: (3, 0.83) = 145') },
      { on: 'd', ex: { d: 'Node 2 integer → incumbent 140 ; Node 3: 145 > 140, live' }, en: 'Step 4: Node 2 is integer, so it is fathomed and becomes the incumbent (140). Node 3 has 145 > 140: still live.', ar: 'الخطوة 4: الـ Node 2 integer فبتبقى fathomed وبتبقى الـ incumbent، والـ Node 3 لسه live لأن:' + L('145 > 140') },
      { on: 'e', ex: { e: 'yes: Node 3' }, back: true, en: 'Step 5: a live node is left (Node 3), so go back to step 2 with it.', ar: 'الخطوة 5: لسه فيه live node هي الـ Node 3، فنرجع للخطوة 2 بيها.' },
      { on: 'b', ex: { b: 'x2 = 0.83 → x2 ≥ 1 | x2 ≤ 0' }, en: 'Step 2 again: Node 3 has x2 = 0.83, so branch: x2 ≥ 1 (Node 4) and x2 ≤ 0 (Node 5).', ar: 'الخطوة 2 تاني: الـ Node 3 فيها x2 كسر، فبنعمل branch:' + L('x2 = 0.83 → Node 4: x2 ≥ 1 ; Node 5: x2 ≤ 0') },
      { on: 'd', ex: { c: 'Node 4: 36 > 35 ; Node 5: (3.5, 0) = 140', d: 'Node 4 infeasible ; Node 5: 140 not better than 140' }, en: 'Steps 3 and 4: Node 4 is infeasible (10(3) + 6(1) = 36 > 35); Node 5 gives (3.5, 0), Z = 140, not better than 140. Both fathomed.', ar: 'الخطوة 3 و 4: الـ Node 4 infeasible، والـ Node 5 مش أحسن من 140، فالاتنين fathomed:' + L('Node 4: 10(3) + 6(1) = 36 > 35 ; Node 5: (3.5, 0) → Z = 140') },
      { on: 'f', ex: { e: 'no', f: 'x1 = 2, x2 = 2, Z = 140' }, en: 'Step 5: no live node is left, so the incumbent is optimal: <b>x1 = 2, x2 = 2, Z = 140</b>.', ar: 'الخطوة 5: مفيش ولا live node، فالـ incumbent هو الـ optimal:' + L('x1 = 2, x2 = 2, Z = 140') }];
    const [i, ctl] = useSteps(steps.length, 3200), s = steps[i];
    const seen = {}; steps.slice(0, i + 1).forEach(t => Object.assign(seen, t.ex));
    const arrow = (txt, on) => html`<div className=${'orv6-arr' + (on ? ' orv6-on' : '')}>${txt}</div>`;
    return html`<figure className="fig orv6"><div className="fig-stage"><div className="orv6-flow">
      ${BX.map((b, j) => html`<${React.Fragment} key=${b.k}>
        ${j > 0 && arrow(b.k === 'b' ? '↓ no' : b.k === 'f' ? '↓ no live node left' : '↓', false)}
        <div className=${'orv6-box' + (b.q ? ' orv6-q' : '') + (s.on === b.k ? ' orv6-on' : '')}><span dangerouslySetInnerHTML=${{ __html: b.t }}></span>${seen[b.k] && html`<span className="orv6-ex">${seen[b.k]}</span>`}</div>
        ${b.k === 'q' && arrow('yes → stop: it is optimal', false)}
        ${b.k === 'e' && arrow('yes → back to step 2 with the best live node', !!s.back)}</${React.Fragment}>`)}
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'or-ip-kinds': Kinds, 'or-ip-round': Round, 'or-bb-branch': Branch, 'or-bb-fathom': Fathom, 'or-bb-equal': Equal, 'or-bb-flow': Flow, 'or-bb-sheet2': Sheet2, 'or-bb-sheet1': Sheet1, 'or-bb-solver': Solver });
})();
/* ── part L8 ── */
// Operations Research visuals, Lecture 8 (PERT): the three time estimates on a time line, the te / σ² calculator, z and the normal table, the lecture and revision tables filled row by row, the lecture network with its paths (slide 7), the 104-week paths and a PERT solver for the exam projects (Lec_11 slides 3-11). Every label and number comes from the site's notes or is computed with the notes' method.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.orv8 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv8 .fig-btn:disabled{ opacity:.45; cursor:default; }
.orv8-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.orv8-row .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.orv8-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:460px; }
.orv8-svg text{ fill:var(--ink); font-family:var(--body); }
.orv8-svg text.orv8-mu{ fill:var(--graphite); }
.orv8-svg text.orv8-wt{ fill:#fff; font-weight:700; }
.orv8-svg text.orv8-kt{ fill:var(--fig-k); font-weight:700; }
.orv8-f{ max-width:460px; margin:8px auto 0; font:.82rem/1.6 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; overflow-wrap:anywhere; }
.orv8-f div{ transition:opacity .4s; } .orv8-f .orv8-dim{ opacity:.3; } .orv8-f .orv8-on{ color:var(--fig-k); font-weight:700; }
.orv8-f .orv8-ok{ color:var(--ok); font-weight:700; }
.orv8-chips{ display:flex; justify-content:center; align-items:center; gap:4px; flex-wrap:wrap; max-width:460px; margin:6px auto 0; font:.84rem var(--mono); color:var(--ink); }
.orv8-chips span{ border:1px solid var(--line); border-radius:6px; padding:2px 6px; background:var(--paper); }
.orv8-chips span.orv8-m{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); border-color:var(--fig-k); }
.orv8-chips i{ font-style:normal; color:var(--graphite); }
.orv8-tbl{ width:100%; max-width:460px; margin:0 auto; border-collapse:collapse; font:.8rem/1.35 var(--mono); color:var(--ink); background:var(--paper); table-layout:fixed; }
.orv8-tbl th, .orv8-tbl td{ border:1px solid var(--line); padding:3px 2px; text-align:center; overflow-wrap:anywhere; }
.orv8-tbl th{ font-weight:600; background:var(--paper-2); }
.orv8-tbl td.orv8-new{ color:var(--fig-k); font-weight:700; }
.orv8-tbl tr.orv8-cur td{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.orv8-tbl tr.orv8-crit td{ background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.orv8-tbl td.orv8-blank{ color:transparent; }
.orv8-tbl input{ width:100%; box-sizing:border-box; font:inherit; font-size:.8rem; padding:2px 1px; border:1px solid var(--line); border-radius:4px; background:var(--paper); color:var(--ink); text-align:center; min-height:26px; }
.orv8-tbl input.orv8-bad{ border-color:var(--pen); box-shadow:0 0 0 1px var(--pen); }
.orv8-z{ width:100%; max-width:300px; margin:8px auto 0; border-collapse:collapse; font:.8rem/1.35 var(--mono); color:var(--ink); background:var(--paper); table-layout:fixed; }
.orv8-z th, .orv8-z td{ border:1px solid var(--line); padding:3px 2px; text-align:center; transition:background .4s; }
.orv8-z th{ background:var(--paper-2); font-weight:600; }
.orv8-z .orv8-hl{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.orv8-z .orv8-hit{ background:var(--fig-s); color:#fff; font-weight:700; }
.orv8-leg{ display:flex; flex-wrap:wrap; justify-content:center; gap:4px 12px; max-width:460px; margin:6px auto 0; font-size:.82rem; color:var(--ink); }
.orv8-leg span{ display:inline-flex; align-items:center; gap:5px; }
.orv8-sw{ width:16px; height:12px; border-radius:3px; display:inline-block; flex:none; }
.orv8-paths{ max-width:460px; margin:8px auto 0; display:grid; gap:4px; }
.orv8-paths div{ font:.8rem/1.4 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:6px; padding:3px 6px; overflow-wrap:anywhere; transition:opacity .4s, box-shadow .4s; }
.orv8-paths div.orv8-dim{ opacity:.35; } .orv8-paths div.orv8-on{ box-shadow:0 0 0 2px var(--fig-k); }
.orv8-paths div.orv8-crit{ box-shadow:0 0 0 2px var(--ok); font-weight:700; }
.orv8-bars{ max-width:460px; margin:0 auto; display:grid; gap:7px; }
.orv8-bars .orv8-pr{ transition:opacity .4s; } .orv8-bars .orv8-pr.orv8-dim{ opacity:.3; }
.orv8-bars .orv8-hd{ display:flex; justify-content:space-between; gap:6px; font:.8rem/1.3 var(--mono); color:var(--ink); }
.orv8-bars .orv8-tr{ display:flex; height:22px; border-radius:4px; overflow:hidden; background:var(--paper); border:1px solid var(--line); }
.orv8-bars .orv8-tr span{ display:flex; align-items:center; justify-content:center; font:700 .75rem var(--mono); color:var(--ink); border-right:1px solid var(--paper); background:color-mix(in srgb, var(--graphite) 22%, var(--paper)); min-width:0; overflow:hidden; }
.orv8-bars .orv8-pr.orv8-crit .orv8-tr span{ background:var(--fig-s); color:#fff; }
.orv8-bars .orv8-pr.orv8-crit .orv8-hd{ font-weight:700; color:var(--fig-k); }
.orv8-ed{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; max-width:460px; margin:0 auto 8px; font-size:.86rem; color:var(--ink); }
.orv8-ed label{ display:inline-flex; align-items:center; gap:4px; font-family:var(--mono); }
.orv8-ed input{ width:4.2em; font:inherit; font-size:.86rem; padding:3px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); min-height:30px; }
.orv8-ed .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:30px; }
.orv8-warn{ max-width:460px; margin:8px auto 0; text-align:center; font-weight:700; color:var(--pen); font-size:.86rem; }
.orv8-out{ max-width:460px; margin:8px auto 0; display:grid; gap:6px; }
.orv8-out > div{ font:.8rem/1.5 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:5px 8px; overflow-wrap:anywhere; }
.orv8-out b{ color:var(--fig-k); }
.orv8 .fig-cap .ltr{ text-align:left; font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .orv8-f div, .orv8-paths div, .orv8-bars .orv8-pr, .orv8-z th, .orv8-z td{ transition:none; } }
`;
  if (!document.getElementById('orv8-css')) { const s = document.createElement('style'); s.id = 'orv8-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const I = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const nf = (v, d = 2) => { let r = Math.round(v * 10 ** d) / 10 ** d; if (Object.is(r, -0)) r = 0; return r < 0 ? '−' + String(-r) : String(r); };
  const r2 = v => Math.round(v * 100) / 100;
  const teOf = a => (a.o + 4 * a.m + a.p) / 6, vaOf = a => ((a.p - a.o) / 6) ** 2;
  const teCalc = a => `te = (${a.o} + 4×${a.m} + ${a.p})/6 = ${a.o + 4 * a.m + a.p}/6 = ${nf(teOf(a))}`;
  const vaCalc = a => `σ² = ((${a.p} − ${a.o})/6)² = (${a.p - a.o}/6)² = ${nf(vaOf(a))}`;
  const A = (n, pr, o, m, p) => ({ n, pr: pr ? pr.split(',') : [], o, m, p });
  const Modes = ({ list, mode, set }) => html`<div className="orv8-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── the course's projects ── */
  const LEC = [A('A', '', 5, 6, 7), A('B', '', 1, 3, 5), A('C', '', 1, 4, 7), A('D', 'A', 1, 2, 3), A('E', 'B', 1, 2, 9), A('F', 'C', 1, 5, 9), A('G', 'C', 2, 2, 8), A('H', 'E,F', 4, 4, 10), A('I', 'D', 2, 5, 8), A('J', 'H,G', 2, 2, 8)];
  const REV = [A('A', '', 7, 16, 28), A('B', 'A', 4, 19, 25), A('C', 'A', 10, 16, 37), A('D', 'B', 7, 13, 37), A('E', 'B,C', 13, 19, 33), A('F', 'B', 19, 22, 33), A('G', 'D,E', 4, 7, 19), A('H', 'F,G', 13, 19, 49), A('I', 'B,C', 13, 25, 37), A('J', 'H,I', 7, 13, 19)];
  const SH1 = [A('A', '', 1, 4, 7), A('B', '', 3, 6, 15), A('C', 'A', 3, 9, 27), A('D', 'B,C', 6, 9, 12), A('E', 'B,C', 6, 12, 30), A('F', 'D', 2, 5, 14)];
  const BRG = [A('A', '', 2, 5, 8), A('B', 'A', 4, 7, 10), A('C', 'A', 4, 9, 14), A('D', 'B', 6, 10, 20), A('E', 'C,D', 4, 5, 12)];
  const AUG = [A('A', '', 3, 6, 9), A('B', '', 2, 5, 8), A('C', 'A', 6, 12, 18), A('D', 'A', 4, 5, 6), A('E', 'B', 3, 9, 15), A('F', 'C', 8, 11, 14), A('G', 'C,D', 3, 7, 11), A('H', 'F,G', 2, 4, 6), A('I', 'E', 8, 16, 18)];

  /* every start-to-end path of an activity list (activities in the given order), or an error */
  function analyse(acts) {
    const by = {}; acts.forEach(a => { by[a.n] = a; });
    for (const a of acts) for (const q of a.pr) if (!by[q]) return { err: `"${a.n}" has an unknown predecessor "${q}"`, errAr: `فيه activity ليها predecessor مش موجود في الجدول` };
    const succ = {}; acts.forEach(a => { succ[a.n] = []; }); acts.forEach(a => a.pr.forEach(q => succ[q].push(a.n)));
    const paths = []; let cyc = false;
    const walk = (n, path) => { if (cyc || paths.length > 60) return; if (path.includes(n)) { cyc = true; return; } const p = path.concat(n); if (!succ[n].length) { paths.push(p); return; } succ[n].forEach(s => walk(s, p)); };
    acts.filter(a => !a.pr.length).forEach(a => walk(a.n, []));
    if (cyc || !paths.length) return { err: 'the predecessors make a loop', errAr: 'الـ predecessors عاملين loop' };
    if (paths.length > 60) return { err: 'too many paths to list', errAr: 'المسارات كتير قوي' };
    const P = paths.map(p => ({ p, len: p.reduce((s, n) => s + teOf(by[n]), 0), v: p.reduce((s, n) => s + vaOf(by[n]), 0) }));
    const mx = Math.max(...P.map(x => x.len)), crit = P.filter(x => Math.abs(x.len - mx) < 1e-9);
    const c = crit.reduce((b, x) => x.v > b.v ? x : b, crit[0]);
    return { by, paths: P, crit: c, tie: crit.length > 1, mu: r2(c.len), s2: r2(c.v) };
  }
  const pname = p => p.join('-');
  const lenCalc = (x, by) => `${x.p.map(n => nf(teOf(by[n]))).join(' + ')} = ${nf(x.len)}`;
  const varCalc = (x, by) => `σ² = ${x.p.map(n => nf(vaOf(by[n]))).join(' + ')} = ${nf(x.v)}`;

  /* ── the standard normal table (Normal_Distribution_Table_2): area from 0 to z, rows 0.0 .. 3.5, columns .00 .. .09 ── */
  const ZT = '0000,0040,0080,0120,0160,0199,0239,0279,0319,0359|0398,0438,0478,0517,0557,0596,0636,0675,0714,0753|0793,0832,0871,0910,0948,0987,1026,1064,1103,1141|1179,1217,1255,1293,1331,1368,1406,1443,1480,1517|1554,1591,1628,1664,1700,1736,1772,1808,1844,1879|1915,1950,1985,2019,2054,2088,2123,2157,2190,2224|2257,2291,2324,2357,2389,2422,2454,2486,2517,2549|2580,2611,2642,2673,2704,2734,2764,2794,2823,2852|2881,2910,2939,2967,2995,3023,3051,3078,3106,3133|3159,3186,3212,3238,3264,3289,3315,3340,3365,3389|3413,3438,3461,3485,3508,3531,3554,3577,3599,3621|3643,3665,3686,3708,3729,3749,3770,3790,3810,3830|3849,3869,3888,3907,3925,3944,3962,3980,3997,4015|4032,4049,4066,4082,4099,4115,4131,4147,4162,4177|4192,4207,4222,4236,4251,4265,4279,4292,4306,4319|4332,4345,4357,4370,4382,4394,4406,4418,4429,4441|4452,4463,4474,4484,4495,4505,4515,4525,4535,4545|4554,4564,4573,4582,4591,4599,4608,4616,4625,4633|4641,4649,4656,4664,4671,4678,4686,4693,4699,4706|4713,4719,4726,4732,4738,4744,4750,4756,4761,4767|4772,4778,4783,4788,4793,4798,4803,4808,4812,4817|4821,4826,4830,4834,4838,4842,4846,4850,4854,4857|4861,4864,4868,4871,4875,4878,4881,4884,4887,4890|4893,4896,4898,4901,4904,4906,4909,4911,4913,4916|4918,4920,4922,4925,4927,4929,4931,4932,4934,4936|4938,4940,4941,4943,4945,4946,4948,4949,4951,4952|4953,4955,4956,4957,4959,4960,4961,4962,4963,4964|4965,4966,4967,4968,4969,4970,4971,4972,4973,4974|4974,4975,4976,4977,4977,4978,4979,4979,4980,4981|4981,4982,4982,4983,4984,4984,4985,4985,4986,4986|4987,4987,4987,4988,4988,4989,4989,4989,4990,4990|4990,4991,4991,4991,4992,4992,4992,4992,4993,4993|4993,4993,4994,4994,4994,4994,4994,4995,4995,4995|4995,4995,4995,4996,4996,4996,4996,4996,4996,4997|4997,4997,4997,4997,4997,4997,4997,4997,4997,4998|4998,4998,4998,4998,4998,4998,4998,4998,4998,4998'.split('|').map(r => r.split(',').map(x => +('0.' + x)));
  const look = z => { const a = Math.round(Math.abs(z) * 100), r = Math.floor(a / 10), c = a % 10; return r > 35 ? { r, c, v: 0.5, off: true } : { r, c, v: ZT[r][c] }; };
  const zlab = (r, c) => (r / 10).toFixed(1) + (c == null ? '' : '');
  /* probability with the notes' rounding: σ = √σ² to 2 places, z to 2 places, then 0.5 ± area */
  function prob(mu, s2, X, after) {
    const sd = r2(Math.sqrt(s2)), z = r2((X - mu) / sd), t = look(z), a = t.v;
    const plus = after ? z < 0 : z >= 0, P = plus ? 0.5 + a : 0.5 - a;
    return { sd, z, t, a, plus, P };
  }
  const zCalc = (mu, X, R) => `z = (X − μ)/σ = (${nf(X)} − ${nf(mu)})/${nf(R.sd)} = ${nf(R.z)}`;
  const pCalc = (X, R, after) => `P(T ${after ? '≥' : '≤'} ${nf(X)}) = 0.5 ${R.plus ? '+' : '−'} ${R.a.toFixed(4)} = ${nf(R.P, 4)}`;

  /* ═══ [0] the three time estimates on a time line ═══ */
  function Three({ ar }) {
    const [k, setK] = useState('C'), a = LEC.find(x => x.n === k), t = teOf(a), v = vaOf(a), d = a.p - a.o, sum = a.o + 4 * a.m + a.p;
    const steps = [
      { en: `<b>CPM</b>: time is deterministic, one time estimate per activity. <b>PERT</b>: time is probabilistic, so activity ${k} gets three estimates.`, ar: `في الـ <b>CPM</b> الوقت deterministic، يعني تقدير واحد لكل activity. في الـ <b>PERT</b> الوقت probabilistic، فالـ activity ${I(k)} ليها تلات تقديرات.` },
      { en: `<b>Optimistic</b> time O = ${a.o}: the estimate under the best conditions (everything goes perfectly).`, ar: `الـ <b>Optimistic</b> time هو ${I('O = ' + a.o)}، وده التقدير في أحسن الظروف (كل حاجة ماشية تمام).` },
      { en: `<b>Most likely</b> time M = ${a.m}: the estimate under normal conditions.`, ar: `الـ <b>Most likely</b> time هو ${I('M = ' + a.m)}، وده التقدير في الظروف العادية.` },
      { en: `<b>Pessimistic</b> time P = ${a.p}: the estimate under the worst conditions.`, ar: `الـ <b>Pessimistic</b> time هو ${I('P = ' + a.p)}، وده التقدير في أسوأ الظروف.` },
      { en: `The expected time counts M four times out of six: ${L(teCalc(a))}`, ar: `الـ expected time بيعدّ الـ M أربع مرات من ست:` + L(teCalc(a)) },
      { en: `The spread from O to P is ${d}; one sixth of it is σ, and the variance is its square: ${L(vaCalc(a))}`, ar: `المسافة من الـ O للـ P هي ${I(d)}، وسدسها هو الـ σ، والـ variance هو مربعها:` + L(vaCalc(a)) }
    ];
    const [i, ctl] = useSteps(steps.length, 1900);
    const x = u => 22 + u * 25.6, Y = 92;
    const mk = (u, lab, y, on, col) => html`<g className=${pop(on)}><circle cx=${x(u)} cy=${Y} r="7" fill=${col} stroke="var(--paper)" strokeWidth="2" /><text x=${x(u)} y=${y} textAnchor="middle" fontSize="15" fontWeight="700">${lab}</text></g>`;
    return html`<figure className="fig orv8"><div className="fig-stage">
      <${Modes} list=${LEC.map(z => [z.n, z.n])} mode=${k} set=${setK} />
      <svg className="orv8-svg" viewBox="0 0 300 160" role="img" aria-label=${`Activity ${k}: O = ${a.o}, M = ${a.m}, P = ${a.p}, te = ${nf(t)} on a time line`}>
        <line x1="14" x2="290" y1=${Y} y2=${Y} stroke="var(--ink)" strokeWidth="1.6" />
        ${Array.from({ length: 11 }, (_, u) => html`<g key=${u}><line x1=${x(u)} x2=${x(u)} y1=${Y - 4} y2=${Y + 4} stroke="var(--ink)" strokeWidth="1.2" /><text x=${x(u)} y=${Y + 21} textAnchor="middle" fontSize="13" className="orv8-mu">${u}</text></g>`)}
        <text x="292" y=${Y - 12} textAnchor="end" fontSize="13" className="orv8-mu">weeks</text>
        <g className=${pop(i === 0)}><rect x="80" y="36" width="140" height="26" rx="5" fill="var(--paper)" stroke="var(--graphite)" /><text x="150" y="54" textAnchor="middle" fontSize="14">CPM: one estimate</text><line x1=${x(t)} x2=${x(t)} y1="62" y2=${Y - 8} stroke="var(--graphite)" strokeWidth="2" /><circle cx=${x(t)} cy=${Y} r="7" fill="var(--graphite)" /></g>
        ${mk(a.o, 'O', Y + 40, i >= 1, 'var(--ok)')}
        ${mk(a.m, 'M', Y - 16, i >= 2, 'var(--fig-k)')}
        ${mk(a.p, 'P', Y + 40, i >= 3, 'var(--pen)')}
        <g className=${pop(i >= 4)}><path d=${`M${x(t)},${Y - 9} l7,9 l-7,9 l-7,-9 Z`} fill="var(--ink)" /><line x1=${x(t)} x2=${x(t)} y1="30" y2=${Y - 10} stroke="var(--ink)" strokeDasharray="3 3" /><text x=${x(t)} y="24" textAnchor="middle" fontSize="15" fontWeight="700">${'te = ' + nf(t)}</text></g>
        <g className=${pop(i >= 5)}><line x1=${x(a.o)} x2=${x(a.p)} y1="148" y2="148" stroke="var(--fig-k)" strokeWidth="3" /><line x1=${x(a.o)} x2=${x(a.o)} y1="141" y2="155" stroke="var(--fig-k)" strokeWidth="2" /><line x1=${x(a.p)} x2=${x(a.p)} y1="141" y2="155" stroke="var(--fig-k)" strokeWidth="2" /></g>
      </svg>
      ${i >= 4 && html`<div className="orv8-chips" aria-label="te is the average of O, four Ms and P"><i>(</i><span>${a.o}</span>${[0, 1, 2, 3].map(j => html`<span key=${j} className="orv8-m">${a.m}</span>`)}<span>${a.p}</span><i>) / 6 = ${sum}/6 = ${nf(t)}</i></div>`}
      ${i >= 5 && html`<div className="orv8-chips"><i>${`P − O = ${a.p} − ${a.o} = ${d},  σ = ${d}/6 = ${nf(d / 6)},  σ² = ${nf(v)}`}</i></div>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ═══ [1] te and σ² calculator ═══ */
  const FP = [
    { key: 'a', t: 'Lecture A', o: 5, m: 6, p: 7 }, { key: 'e', t: 'Lecture E', o: 1, m: 2, p: 9 }, { key: 's', t: 'Sheet 1 C', o: 3, m: 9, p: 27 },
    { key: 'r', t: 'Revision A', o: 7, m: 16, p: 28 }, { key: 'b', t: 'Bridge D', o: 6, m: 10, p: 20 }];
  function Formula({ ar }) {
    const [mode, setMode] = useState('a'), [own, setOwn] = useState({ o: '2', m: '5', p: '14' });
    const pre = FP.find(x => x.key === mode), a = pre || { o: +own.o, m: +own.m, p: +own.p };
    const bad = [a.o, a.m, a.p].some(v => !isFinite(v) || v < 0) || !(a.o <= a.m && a.m <= a.p);
    const steps = [
      { en: `Three estimates: O = ${a.o}, M = ${a.m}, P = ${a.p}.`, ar: `التلات تقديرات هما:` + L(`O = ${a.o}, M = ${a.m}, P = ${a.p}`) },
      { en: `Expected duration: M counts four times, then divide by 6. ${L(bad ? '' : teCalc(a))}`, ar: `الـ expected duration بنعدّ فيه الـ M أربع مرات وبعدين نقسم على 6:` + L(bad ? '' : teCalc(a)) },
      { en: `Variance: the range P − O over 6, squared. ${L(bad ? '' : vaCalc(a))}`, ar: `الـ variance هو الفرق بين الـ P والـ O على 6، وبعدين نربّعه:` + L(bad ? '' : vaCalc(a)) }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    const set = (k, v) => setOwn(Object.assign({}, own, { [k]: v }));
    const inp = k => html`<label>${k.toUpperCase()} <input type="number" min="0" step="any" value=${own[k]} onInput=${e => set(k, e.target.value)} aria-label=${k.toUpperCase()} /></label>`;
    const lines = bad ? [] : [teCalc(a), vaCalc(a), `σ = (${a.p} − ${a.o})/6 = ${nf((a.p - a.o) / 6)}`];
    return html`<figure className="fig orv8"><div className="fig-stage">
      <${Modes} list=${FP.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${m => { setMode(m); ctl.go(2); }} />
      ${mode === 'own' && html`<div className="orv8-ed">${inp('o')}${inp('m')}${inp('p')}</div>`}
      ${bad ? html`<div className="orv8-warn">Need 0 ≤ O ≤ M ≤ P.</div>` : html`<div className="orv8-f">
        <div>${`O = ${a.o},  M = ${a.m},  P = ${a.p}`}</div>
        ${lines.map((t, k) => html`<div key=${k} className=${k + 1 > i ? 'orv8-dim' : k + 1 === i || (k === 2 && i === 2) ? 'orv8-on' : ''}>${t}</div>`)}</div>`}
      </div><${Cap} en=${bad ? 'Type the three estimates so that O ≤ M ≤ P.' : steps[i].en} ar=${bad ? 'اكتب التلات تقديرات بحيث الـ O أصغر من أو بيساوي الـ M، والـ M أصغر من أو بيساوي الـ P.' : steps[i].ar} showAr=${ar} />
      <${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ═══ the normal curve with the table's area ═══ */
  const cx = z => 150 + z * 38, cy = z => 112 - 92 * Math.exp(-z * z / 2);
  const area = (a, b) => { a = Math.max(-3.8, a); b = Math.min(3.8, b); if (b <= a) return ''; const pts = []; for (let z = a; z < b; z += .05) pts.push(cx(z).toFixed(1) + ',' + cy(z).toFixed(1)); pts.push(cx(b).toFixed(1) + ',' + cy(b).toFixed(1)); return `M${cx(a).toFixed(1)},112 L${pts.join(' L')} L${cx(b).toFixed(1)},112 Z`; };
  function Curve({ R, X, mu, after, show }) {
    const z = Math.max(-3.7, Math.min(3.7, R.z)), res = after ? [z, 9] : [-9, z], strip = R.z >= 0 ? [0, z] : [z, 0];
    let line = ''; for (let u = -3.8; u <= 3.81; u += .05) line += (line ? ' L' : 'M') + cx(u).toFixed(1) + ',' + cy(u).toFixed(1);
    const near = Math.abs(cx(z) - cx(0)) < 34;
    return html`<svg className="orv8-svg" viewBox="0 0 300 156" role="img" aria-label=${`Normal curve with mean ${nf(mu)} and X = ${nf(X)} at z = ${nf(R.z)}`}>
      ${show >= 3 && html`<path d=${area(res[0], res[1])} fill="color-mix(in srgb, var(--fig-k) 30%, transparent)" />`}
      ${show >= 2 && html`<path d=${area(strip[0], strip[1])} fill=${show >= 3 && !R.plus ? 'none' : 'color-mix(in srgb, var(--fig-k) 62%, transparent)'} stroke=${show >= 3 && !R.plus ? 'var(--pen)' : 'var(--fig-k)'} strokeWidth="2" strokeDasharray=${show >= 3 && !R.plus ? '5 4' : null} />`}
      <path d=${line} fill="none" stroke="var(--ink)" strokeWidth="2" />
      <line x1="6" x2="294" y1="112" y2="112" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1=${cx(0)} x2=${cx(0)} y1="20" y2="116" stroke="var(--graphite)" strokeDasharray="3 3" />
      <text x=${cx(0)} y="131" textAnchor="middle" fontSize="14">μ</text><text x=${cx(0)} y="150" textAnchor="middle" fontSize="13" className="orv8-mu">z = 0</text>
      ${show >= 1 && html`<g><line x1=${cx(z)} x2=${cx(z)} y1=${cy(z) - 6} y2="116" stroke="var(--fig-k)" strokeWidth="2.5" />
        <text x=${cx(z) + (near ? (z >= 0 ? 22 : -22) : 0)} y="131" textAnchor="middle" fontSize="14" className="orv8-kt">X</text>
        <text x=${Math.max(40, Math.min(260, cx(z) + (near ? (z >= 0 ? 34 : -34) : 0)))} y="150" textAnchor="middle" fontSize="13" className="orv8-kt">${'z = ' + nf(R.z)}</text></g>`}
    </svg>`;
  }
  function ZWin({ z }) {
    const t = look(z);
    if (t.off) return html`<div className="orv8-warn">|z| is past the table's last row (3.5): the area is about 0.5.</div>`;
    const r0 = Math.max(0, Math.min(31, t.r - 2)), c0 = Math.max(0, Math.min(5, t.c - 2));
    const rows = [0, 1, 2, 3, 4].map(k => r0 + k), cols = [0, 1, 2, 3, 4].map(k => c0 + k);
    return html`<table className="orv8-z" aria-label="Part of the standard normal table"><thead><tr><th>z</th>${cols.map(c => html`<th key=${c} className=${c === t.c ? 'orv8-hl' : ''}>${'.0' + c}</th>`)}</tr></thead>
      <tbody>${rows.map(r => html`<tr key=${r}><th className=${r === t.r ? 'orv8-hl' : ''}>${zlab(r)}</th>${cols.map(c => html`<td key=${c} className=${r === t.r && c === t.c ? 'orv8-hit' : r === t.r || c === t.c ? 'orv8-hl' : ''}>${ZT[r][c].toFixed(4).slice(1)}</td>`)}</tr>`)}</tbody></table>`;
  }

  /* ═══ [1] z, the table and P(T ≤ X) ═══ */
  const PP = [
    { key: 'lec', t: 'Lecture ≤ 22', mu: 17, s2: 4.78, X: 22 }, { key: 'rev', t: 'Revision ≤ 104', mu: 99.83, s2: 89.86, X: 104 },
    { key: 's28', t: 'Sheet 1 ≤ 28', mu: 30, s2: 22, X: 28 }, { key: 's34', t: 'Sheet 1 ≤ 34', mu: 30, s2: 22, X: 34 },
    { key: 'brg', t: 'Bridge ≤ 36', mu: 29, s2: 9.22, X: 36 }, { key: 'a32', t: 'Aug 23/24 ≤ 32', mu: 33, s2: 6.44, X: 32 },
    { key: 'a35', t: 'Aug 23/24 ≤ 35', mu: 33, s2: 6.44, X: 35 }, { key: 'f22', t: 'Final 25/26 ≤ 22', mu: 20, s2: 1.67, X: 22 }];
  function Prob({ ar }) {
    const [mode, setMode] = useState('lec'), [own, setOwn] = useState({ mu: '30', s2: '22', X: '25', after: false });
    const pre = PP.find(x => x.key === mode), q = pre ? Object.assign({ after: false }, pre) : { mu: +own.mu, s2: +own.s2, X: +own.X, after: own.after };
    const bad = ![q.mu, q.s2, q.X].every(isFinite) || q.s2 <= 0 || r2(Math.sqrt(q.s2)) <= 0;
    const R = bad ? null : prob(q.mu, q.s2, q.X, q.after), aft = q.after;
    const steps = bad ? [{ en: 'Type μ, a positive σ² and the target X.', ar: 'اكتب الـ μ والـ σ² (لازم تبقى موجبة) والـ X.' }] : [
      { en: `Project mean μ = ${nf(q.mu)} (sum of te on the critical path) and variance σ² = ${nf(q.s2)} (critical activities only). ${L(`σ = √${nf(q.s2)} = ${nf(R.sd)}`)}`,
        ar: `الـ mean بتاع الـ project هو مجموع الـ te على الـ critical path، والـ variance هو مجموع الـ variances بتاعة الـ critical activities بس:` + L(`μ = ${nf(q.mu)}, σ² = ${nf(q.s2)}, σ = √${nf(q.s2)} = ${nf(R.sd)}`) },
      { en: `The target date X = ${nf(q.X)} becomes a z value: ${L(zCalc(q.mu, q.X, R))}`, ar: `الـ target date اللي في السؤال بنحوّله لـ z:` + L(zCalc(q.mu, q.X, R)) },
      { en: R.t.off ? `|z| = ${nf(Math.abs(R.z))} is beyond the table, so the area from 0 to z is about 0.5.` : `The table gives the area from 0 to z (positive z only${R.z < 0 ? `, so look up |z| = ${nf(-R.z)}` : ''}): row ${zlab(R.t.r)}, column .0${R.t.c} → ${R.a.toFixed(4)}.`,
        ar: R.t.off ? `الـ z برّه الجدول، فالمساحة من 0 للـ z تقريباً 0.5.` : `الجدول بيدّي المساحة من 0 لحد الـ z الموجبة${R.z < 0 ? ' (فبندوّر على القيمة من غير السالب)' : ''}، من الصف ${I(zlab(R.t.r))} والعمود ${I('.0' + R.t.c)}:` + L(`area = ${R.a.toFixed(4)}`) },
      { en: `${aft ? '"After X" means P(T ≥ X), the part above X' : '"In / on / before X" means P(T ≤ X), the part below X'}. z is ${R.z >= 0 ? 'positive' : 'negative'}, so ${R.plus ? 'add the area to' : 'take the area away from'} 0.5: ${L(pCalc(q.X, R, aft))}`,
        ar: `في السؤال ده ${aft ? 'كلمة "بعد" معناها الجزء اللي فوق الـ X' : 'كلمة "في" أو "قبل" معناها الجزء اللي تحت الـ X'}، والـ z ${R.z >= 0 ? 'موجبة' : 'سالبة'} فبن${R.plus ? 'زوّد المساحة على' : 'طرح المساحة من'} الـ 0.5:` + L(pCalc(q.X, R, aft)) }
    ];
    const [i, ctl] = useSteps(steps.length, 2200), j = Math.min(i, steps.length - 1);
    const set = (k, v) => setOwn(Object.assign({}, own, { [k]: v }));
    const inp = (k, t) => html`<label>${t} <input type="number" step="any" value=${own[k]} onInput=${e => set(k, e.target.value)} aria-label=${t} /></label>`;
    return html`<figure className="fig orv8"><div className="fig-stage">
      <${Modes} list=${PP.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${m => { setMode(m); ctl.replay(); }} />
      ${mode === 'own' && html`<div className="orv8-ed">${inp('mu', 'μ')}${inp('s2', 'σ²')}${inp('X', 'X')}
        <button className="fig-btn" aria-pressed=${String(!own.after)} onClick=${() => set('after', false)}>T ≤ X</button><button className="fig-btn" aria-pressed=${String(own.after)} onClick=${() => set('after', true)}>T ≥ X</button></div>`}
      ${!bad && html`<${Curve} R=${R} X=${q.X} mu=${q.mu} after=${aft} show=${j} />`}
      ${!bad && j >= 2 && html`<div className="orv8-leg">
        <span><i className="orv8-sw" style=${{ background: j >= 3 && !R.plus ? 'transparent' : 'color-mix(in srgb, var(--fig-k) 62%, var(--paper))', border: j >= 3 && !R.plus ? '2px dashed var(--pen)' : 'none' }}></i>${'table area ' + R.a.toFixed(4) + (j >= 3 ? (R.plus ? ' (added)' : ' (taken away)') : '')}</span>
        ${j >= 3 && html`<span><i className="orv8-sw" style=${{ background: 'color-mix(in srgb, var(--fig-k) 30%, var(--paper))' }}></i>${`P(T ${aft ? '≥' : '≤'} X) = ${nf(R.P, 4)}`}</span>`}</div>`}
      ${!bad && j >= 2 && html`<${ZWin} z=${R.z} />`}
      ${!bad && html`<div className="orv8-f">
        <div className=${j === 0 ? 'orv8-on' : ''}>${`σ = √${nf(q.s2)} = ${nf(R.sd)}`}</div>
        <div className=${j < 1 ? 'orv8-dim' : j === 1 ? 'orv8-on' : ''}>${zCalc(q.mu, q.X, R)}</div>
        <div className=${j < 3 ? 'orv8-dim' : 'orv8-ok'}>${pCalc(q.X, R, aft)}</div></div>`}
      </div><${Cap} ...${steps[j]} showAr=${ar} />${!bad && html`<${Bar} steps=${steps} i=${j} ctl=${ctl} />`}</figure>`;
  }

  /* ═══ [2] and [4] the activity table filled row by row ═══ */
  function makeTable(acts, title, titleAr) {
    return function ActTable({ ar }) {
      const n = acts.length, steps = [{ en: `${title}: three estimates O, M, P for each activity. te and σ² are filled in row by row.`, ar: `في ${titleAr} كل activity ليها تلات تقديرات، وهنملا الـ te والـ σ² صف صف.` }]
        .concat(acts.map(a => ({ en: `Activity ${a.n}: ${teCalc(a)}; ${vaCalc(a)}`, ar: `نحسب الـ activity ${I(a.n)} كده:` + L(teCalc(a)) + L(vaCalc(a)) })))
        .concat([{ en: 'Every activity now has its expected time te and variance σ²: next, the paths and the critical path.', ar: 'كده كل activity ليها الـ te والـ σ² بتوعها، والخطوة الجاية هي المسارات والـ critical path.' }]);
      const [i, ctl] = useSteps(steps.length, 1700);
      return html`<figure className="fig orv8"><div className="fig-stage">
        <table className="orv8-tbl"><colgroup><col style=${{ width: '11%' }} /><col style=${{ width: '15%' }} /><col /><col /><col /><col style=${{ width: '17%' }} /><col style=${{ width: '17%' }} /></colgroup>
          <thead><tr><th>Act.</th><th>Pred.</th><th>O</th><th>M</th><th>P</th><th>te</th><th>σ²</th></tr></thead>
          <tbody>${acts.map((a, k) => { const done = i > k, cur = i === k + 1; return html`<tr key=${a.n} className=${cur ? 'orv8-cur' : ''}><td>${a.n}</td><td>${a.pr.join(', ') || '-'}</td><td>${a.o}</td><td>${a.m}</td><td>${a.p}</td>
            <td className=${!done ? 'orv8-blank' : cur ? 'orv8-new' : ''}>${nf(teOf(a))}</td><td className=${!done ? 'orv8-blank' : cur ? 'orv8-new' : ''}>${nf(vaOf(a))}</td></tr>`; })}</tbody></table>
        ${i >= 1 && i <= n && html`<div className="orv8-f"><div>${teCalc(acts[i - 1])}</div><div>${vaCalc(acts[i - 1])}</div></div>`}
        </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
    };
  }
  const LecTable = makeTable(LEC, 'Lecture example', 'مثال المحاضرة');
  const RevTable = makeTable(REV, 'Construction project (Final 2021/22, Revision)', 'مشروع البناء بتاع الـ Final والـ Revision');

  /* ═══ [3] the lecture network (slide 7), its paths, the critical path and the probability ═══ */
  const NODES = { 1: [22, 200], 2: [112, 96], 3: [112, 196], 4: [112, 300], 5: [230, 96], 6: [230, 196], 7: [230, 300], 9: [296, 200] };
  const EDGES = { A: [1, 2], B: [1, 3], C: [1, 4], D: [2, 5], E: [3, 6], F: [4, 6], G: [4, 7], H: [6, 7], I: [5, 9], J: [7, 9] };
  const ELAB = { A: [60, 138, 'end'], B: [67, 189, 'middle'], C: [58, 266, 'end'], D: [171, 88, 'middle'], E: [171, 188, 'middle'], F: [176, 262, 'start'], G: [171, 320, 'middle'], H: [224, 282, 'end'], I: [270, 140, 'start'], J: [270, 266, 'start'] };
  const BOX = { 1: [6, 142], 2: [98, 48], 3: [98, 140], 4: [98, 318], 5: [216, 48], 6: [216, 140], 7: [216, 318], 9: [312, 172] };
  function Net({ ar }) {
    const res = analyse(LEC), by = res.by, PS = res.paths, c = res.crit, R = prob(res.mu, res.s2, 22, false);
    // ES forward / LC backward over the slide's nodes, with te on the arrows
    const ES = { 1: 0 }, LC = {}, order = [1, 2, 3, 4, 5, 6, 7, 9];
    order.slice(1).forEach(v => { ES[v] = Math.max(...Object.keys(EDGES).filter(e => EDGES[e][1] === v).map(e => ES[EDGES[e][0]] + teOf(by[e]))); });
    LC[9] = ES[9]; order.slice().reverse().slice(1).forEach(v => { LC[v] = Math.min(...Object.keys(EDGES).filter(e => EDGES[e][0] === v).map(e => LC[EDGES[e][1]] - teOf(by[e]))); });
    const steps = [
      { en: 'The project network from the predecessors, numbered as on the slide; each arrow carries its expected time te.', ar: 'دي الـ network بتاعة الـ project من الـ predecessors بنفس ترقيم الـ slide، وكل سهم عليه الـ expected time بتاعه.' }]
      .concat(PS.map(x => ({ en: `Path ${pname(x.p)}: ${L(lenCalc(x, by))}`, ar: `طول المسار ${I(pname(x.p))} هو:` + L(lenCalc(x, by)) })))
      .concat([
        { en: `The longest path is the critical path: <b>${pname(c.p)}</b>, so the project completion time is μ = ${nf(c.len)} weeks. The slide's boxes (LC on top, ES below) are equal on its nodes.`, ar: `أطول مسار هو الـ critical path وهو ${I(pname(c.p))}، يعني الـ project بيخلص في ${I(nf(c.len))} أسبوع. والمربعات اللي على الـ slide (الـ LC فوق والـ ES تحت) متساوية على الـ nodes بتاعته.` },
        { en: `Project variance: add the variances of the critical activities only. ${L(`${varCalc(c, by)}, σ = √${nf(res.s2)} = ${nf(R.sd)}`)}`, ar: `الـ variance بتاع الـ project هو مجموع الـ variances بتاعة الـ critical activities بس:` + L(`${varCalc(c, by)}, σ = √${nf(res.s2)} = ${nf(R.sd)}`) },
        { en: `On or before 22 weeks: ${L(`P(X ≤ 22) = P(z ≤ (22 − ${nf(res.mu)})/${nf(R.sd)}) = P(z ≤ ${nf(R.z)}) = 0.5 + ${R.a.toFixed(4)} = ${nf(R.P, 4)}`)} About ${nf(R.P * 100, 1)}%.`, ar: `احتمال إن الـ project يخلص في 22 أسبوع أو قبلها:` + L(`P(X ≤ 22) = P(z ≤ (22 − ${nf(res.mu)})/${nf(R.sd)}) = P(z ≤ ${nf(R.z)}) = 0.5 + ${R.a.toFixed(4)} = ${nf(R.P, 4)}`) + `يعني حوالي ${I(nf(R.P * 100, 1) + '%')}.` }]);
    const [i, ctl] = useSteps(steps.length, 2000), np = PS.length;
    const cur = i >= 1 && i <= np ? PS[i - 1].p : i > np ? c.p : [], crit = i > np;
    const edge = e => { const [u, v] = EDGES[e], [x1, y1] = NODES[u], [x2, y2] = NODES[v], d = Math.hypot(x2 - x1, y2 - y1), r = 15, on = cur.includes(e);
      return html`<g key=${e}><line x1=${x1 + (x2 - x1) * r / d} y1=${y1 + (y2 - y1) * r / d} x2=${x2 - (x2 - x1) * (r + 3) / d} y2=${y2 - (y2 - y1) * (r + 3) / d} stroke=${on ? (crit ? 'var(--ok)' : 'var(--fig-k)') : 'var(--graphite)'} strokeWidth=${on ? 4 : 1.8} markerEnd=${on ? (crit ? 'url(#orv8-ah-ok)' : 'url(#orv8-ah-k)') : 'url(#orv8-ah)'} />
        <text x=${ELAB[e][0]} y=${ELAB[e][1]} textAnchor=${ELAB[e][2]} fontSize="15" fontWeight=${on ? 700 : 400}>${`${e} (${nf(teOf(by[e]))})`}</text></g>`; };
    const mark = (id, col) => html`<marker id=${id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill=${col} /></marker>`;
    return html`<figure className="fig orv8"><div className="fig-stage">
      <svg className="orv8-svg" viewBox="0 0 342 360" role="img" aria-label="The lecture's PERT network: nodes 1 to 9, activities A to J with their expected times">
        <defs>${mark('orv8-ah', 'var(--graphite)')}${mark('orv8-ah-k', 'var(--fig-k)')}${mark('orv8-ah-ok', 'var(--ok)')}</defs>
        ${Object.keys(EDGES).map(edge)}
        ${order.map(v => { const [x, y] = NODES[v], on = crit && (v === 1 || c.p.some(e => EDGES[e][1] === v)); return html`<g key=${'n' + v}><circle cx=${x} cy=${y} r="15" fill=${on ? 'var(--ok)' : 'var(--fig-s)'} /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="15" className="orv8-wt">${v}</text></g>`; })}
        ${order.map(v => { const [x, y] = BOX[v]; return html`<g key=${'b' + v} className=${pop(crit)}><rect x=${x} y=${y} width="28" height="38" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" /><line x1=${x} x2=${x + 28} y1=${y + 19} y2=${y + 19} stroke="var(--ink)" strokeWidth="1" />
          <text x=${x + 14} y=${y + 15} textAnchor="middle" fontSize="15">${nf(LC[v])}</text><text x=${x + 14} y=${y + 34} textAnchor="middle" fontSize="15">${nf(ES[v])}</text></g>`; })}
      </svg>
      ${crit && html`<div className="orv8-leg"><span>Boxes: LC on top, ES below</span></div>`}
      <div className="orv8-paths">${PS.map((x, k) => html`<div key=${k} className=${crit ? (x === c ? 'orv8-crit' : 'orv8-dim') : i === k + 1 ? 'orv8-on' : i > k + 1 ? '' : 'orv8-dim'}>${`${pname(x.p)} = ${lenCalc(x, by)}`}</div>`)}</div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ═══ [5] the 104-week answer: every path as a bar, the critical one, σ² and P ═══ */
  function RevPaths({ ar }) {
    const res = analyse(REV), by = res.by, PS = res.paths, c = res.crit, X = 104, R = prob(res.mu, res.s2, X, false), mx = Math.max(...PS.map(x => x.len)), np = PS.length;
    const steps = [{ en: 'Every path from start to end; its length is the sum of te along it (each block is one activity).', ar: 'دي كل المسارات من البداية للنهاية، وطول كل مسار هو مجموع الـ te اللي عليه (كل حتة هي activity).' }]
      .concat(PS.map(x => ({ en: `Path ${pname(x.p)}: ${L(lenCalc(x, by))}`, ar: `طول المسار ${I(pname(x.p))} هو:` + L(lenCalc(x, by)) })))
      .concat([
        { en: `The longest is the critical path <b>${pname(c.p)}</b>: μ = ${nf(c.len)} weeks.`, ar: `أطول مسار هو الـ critical path وهو ${I(pname(c.p))}، يعني:` + L(`μ = ${nf(c.len)} weeks`) },
        { en: `Project variance from the critical activities only: ${L(`${varCalc(c, by)}, σ = ${nf(R.sd)}`)}`, ar: `الـ variance بتاع الـ project من الـ critical activities بس:` + L(`${varCalc(c, by)}, σ = ${nf(R.sd)}`) },
        { en: `Within two years (104 weeks): z = (104 − ${nf(res.mu)})/${nf(R.sd)} = ${nf(R.z)}, so P(X ≤ 104) = 0.5 + ${R.a.toFixed(4)} = ${nf(R.P, 4)}. Careful: z is (X − μ)/σ. The reversed (99.8 − 104)/9.479 = −0.44 gives the wrong 0.33.`,
          ar: `احتمال إنه يخلص في سنتين يعني 104 أسبوع:` + L(`z = (104 − ${nf(res.mu)})/${nf(R.sd)} = ${nf(R.z)}`) + L(`P(X ≤ 104) = 0.5 + ${R.a.toFixed(4)} = ${nf(R.P, 4)}`) + `خلي بالك إن الـ z هي ${I('(X − μ)/σ')}، ولو قلبتها هتطلع ${I('−0.44')} والإجابة الغلط ${I('0.33')}.` }]);
    const [i, ctl] = useSteps(steps.length, 1900), crit = i > np;
    return html`<figure className="fig orv8"><div className="fig-stage"><div className="orv8-bars">
      ${PS.map((x, k) => html`<div key=${k} className=${'orv8-pr' + (crit ? (x === c ? ' orv8-crit' : ' orv8-dim') : i >= k + 1 ? '' : ' orv8-dim')}>
        <div className="orv8-hd"><span>${pname(x.p)}</span><span>${nf(x.len)}</span></div>
        <div className="orv8-tr" style=${{ width: (x.len / mx * 100).toFixed(1) + '%' }}>${x.p.map(n => html`<span key=${n} style=${{ flex: teOf(by[n]) + ' 1 0' }}>${n}</span>`)}</div></div>`)}</div>
      ${crit && html`<div className="orv8-f">
        <div className="orv8-on">${`${pname(c.p)}: μ = ${lenCalc(c, by)}`}</div>
        <div className=${i < np + 2 ? 'orv8-dim' : 'orv8-on'}>${`${varCalc(c, by)}, σ = ${nf(R.sd)}`}</div>
        <div className=${i < np + 3 ? 'orv8-dim' : 'orv8-ok'}>${`z = ${nf(R.z)} → P = 0.5 + ${R.a.toFixed(4)} = ${nf(R.P, 4)}`}</div></div>`}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ═══ [6] PERT solver: the exam projects, or your own ═══ */
  const SP = [
    { key: 'lec', t: 'Lecture', acts: LEC, X: [22] }, { key: 'rev', t: 'Revision 104', acts: REV, X: [104] }, { key: 'sh1', t: 'Sheet 1', acts: SH1, X: [28, 34] },
    { key: 'brg', t: 'Bridge 22/23', acts: BRG, X: [36] }, { key: 'aug', t: 'Aug 23/24', acts: AUG, X: [32, 35] }];
  const toRows = acts => acts.map(a => ({ n: a.n, pr: a.pr.join(','), o: String(a.o), m: String(a.m), p: String(a.p) }));
  function Solver({ ar }) {
    const [mode, setMode] = useState('sh1'), [rows, setRows] = useState(toRows(SH1)), [ox, setOx] = useState('30');
    const pre = SP.find(x => x.key === mode);
    const pick = m => { if (m === 'own' && pre) { setRows(toRows(pre.acts)); setOx(String(pre.X[0])); } setMode(m); };
    let acts, bad = {};
    if (pre) acts = pre.acts;
    else {
      acts = rows.map((r, k) => { const a = { n: r.n.trim(), pr: r.pr.split(/[ ,]+/).map(s => s.trim()).filter(Boolean), o: +r.o, m: +r.m, p: +r.p };
        if (!a.n || rows.findIndex(q => q.n.trim() === a.n) !== k) bad[k + 'n'] = 1;
        ['o', 'm', 'p'].forEach(f => { if (r[f].trim() === '' || !isFinite(a[f]) || a[f] < 0) bad[k + f] = 1; });
        if (!bad[k + 'o'] && !bad[k + 'm'] && !bad[k + 'p'] && !(a.o <= a.m && a.m <= a.p)) { bad[k + 'o'] = bad[k + 'p'] = 1; }
        return a; });
    }
    const ok = !Object.keys(bad).length, res = ok ? analyse(acts) : null, Xs = pre ? pre.X : [+ox];
    const set = (k, f, v) => setRows(rows.map((r, j) => j === k ? Object.assign({}, r, { [f]: v }) : r));
    const cell = (k, f) => html`<input value=${rows[k][f]} className=${bad[k + f] ? 'orv8-bad' : ''} onInput=${e => set(k, f, e.target.value)} aria-label=${f + ' of row ' + (k + 1)} />`;
    const add = () => { const used = rows.map(r => r.n.trim()); const n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').find(ch => !used.includes(ch)) || 'Z'; setRows(rows.concat({ n, pr: rows.length ? rows[rows.length - 1].n : '', o: '1', m: '2', p: '3' })); };
    const crit = res && !res.err ? res.crit : null, by = res && res.by;
    let en, a;
    if (!ok) { en = 'Fix the red cells: each activity needs a unique name and estimates 0 ≤ O ≤ M ≤ P.'; a = 'صلّح الخانات الحمرا: كل activity لازم يبقى ليها اسم مختلف، والتقديرات تبقى مترتبة من الـ O للـ M للـ P.'; }
    else if (res.err) { en = `Check the predecessors: ${res.err}.`; a = `راجع الـ predecessors لأن ${res.errAr}.`; }
    else { en = `te and σ² for each activity, then every path: the longest (${pname(crit.p)}, μ = ${nf(res.mu)}) is critical. Its variances give σ, then z and P(T ≤ X).`; a = `بنحسب الـ te والـ σ² لكل activity، وبعدين كل المسارات، وأطولهم هو الـ critical path ومنه الـ μ. ومن الـ variances بتاعته بنجيب الـ σ، وبعدين الـ z والاحتمال.`;
      if (res.tie) { en += ' Two or more paths tie for longest (the notes have no such case); the one with the larger variance is used.'; a += ' فيه أكتر من مسار بنفس أطول طول (الـ notes مفيهاش الحالة دي)، فاستخدمنا اللي الـ variance بتاعه أكبر.'; } }
    const isC = n => crit && crit.p.includes(n);
    return html`<figure className="fig orv8"><div className="fig-stage">
      <${Modes} list=${SP.map(x => [x.key, x.t]).concat([['own', 'Try your own']])} mode=${mode} set=${pick} />
      <table className="orv8-tbl"><colgroup><col style=${{ width: '11%' }} /><col style=${{ width: pre ? '15%' : '19%' }} /><col /><col /><col /><col style=${{ width: '15%' }} /><col style=${{ width: '15%' }} /></colgroup>
        <thead><tr><th>Act.</th><th>Pred.</th><th>O</th><th>M</th><th>P</th><th>te</th><th>σ²</th></tr></thead>
        <tbody>${pre ? acts.map(x => html`<tr key=${x.n} className=${isC(x.n) ? 'orv8-crit' : ''}><td>${x.n}</td><td>${x.pr.join(', ') || '-'}</td><td>${x.o}</td><td>${x.m}</td><td>${x.p}</td><td>${nf(teOf(x))}</td><td>${nf(vaOf(x))}</td></tr>`)
          : rows.map((r, k) => { const x = acts[k], g = !bad[k + 'o'] && !bad[k + 'm'] && !bad[k + 'p']; return html`<tr key=${k} className=${ok && isC(x.n) ? 'orv8-crit' : ''}><td>${cell(k, 'n')}</td><td>${cell(k, 'pr')}</td><td>${cell(k, 'o')}</td><td>${cell(k, 'm')}</td><td>${cell(k, 'p')}</td><td>${g ? nf(teOf(x)) : ''}</td><td>${g ? nf(vaOf(x)) : ''}</td></tr>`; })}</tbody></table>
      ${!pre && html`<div className="orv8-ed" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${add} disabled=${rows.length >= 14}>+ activity</button><button className="fig-btn" onClick=${() => setRows(rows.slice(0, -1))} disabled=${rows.length <= 1}>− last</button>
        <label>X <input type="number" step="any" value=${ox} onInput=${e => setOx(e.target.value)} aria-label="Target X" /></label></div>`}
      ${ok && res.err && html`<div className="orv8-warn">${'Check the predecessors: ' + res.err + '.'}</div>`}
      ${ok && !res.err && html`<div className="orv8-paths">${res.paths.map((x, k) => html`<div key=${k} className=${x === crit ? 'orv8-crit' : ''}>${`${pname(x.p)} = ${lenCalc(x, by)}`}</div>`)}</div>
        <div className="orv8-out"><div><b>Critical path</b> ${`${pname(crit.p)}, μ = ${nf(res.mu)}`}<br />${`${varCalc(crit, by)}, σ = √${nf(res.s2)} = ${nf(r2(Math.sqrt(res.s2)))}`}</div>
          ${Xs.filter(isFinite).map(X => { const R = res.s2 > 0 ? prob(res.mu, res.s2, X, false) : null; return html`<div key=${X}>${R ? html`<b>${`P(T ≤ ${nf(X)})`}</b><br />${zCalc(res.mu, X, R)}<br />${(R.t.off ? 'off the table: area ≈ 0.5, ' : '') + pCalc(X, R, false)}` : 'σ = 0: the time is certain.'}</div>`; })}</div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'or-pert-three': Three, 'or-pert-formula': Formula, 'or-pert-prob': Prob, 'or-pert-table-lec': LecTable,
    'or-pert-net': Net, 'or-pert-table-rev': RevTable, 'or-pert-paths-rev': RevPaths, 'or-pert-solver': Solver
  });
})();
/* ── part L9 ── */
// Operations Research visuals, Lecture 9 (dynamic programming: shortest route, backward approach): the slide's network cut into stages (Lec_12_DP slides 7 and 9), one node's recursion, listing all paths against DP, and backward step-throughs of every exam network (Finals 2019/20, 2021/22, 2023/24 both papers, 2025/26, Revision MCQ 21) with a "Try your own" network. Every label and number comes from the site's notes or is computed with the course's recursion.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.orv9 .fig-stage{ padding:14px 6px 10px; }
.orv9-svg{ width:100%; height:auto; display:block; margin:0 auto; max-width:480px; }
.orv9-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.orv9-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.orv9 .fig-btn[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.orv9-lbl{ display:block; font-size:.84rem; color:var(--graphite); margin:0 4px 4px; }
.orv9-in{ font:14px/1.45 var(--mono); width:100%; box-sizing:border-box; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); resize:vertical; }
.orv9-in:focus, .orv9-num:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.orv9-row{ margin:0 0 10px; }
.orv9-err{ color:var(--pen); font-size:.9rem; text-align:center; margin:6px 0; }
.orv9-calc{ font:.88rem/1.55 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 10px; margin:10px auto 0; max-width:520px; min-height:4.6em; box-sizing:border-box; }
.orv9-calc .orv9-t{ display:inline-block; white-space:nowrap; }
.orv9-calc .orv9-win{ color:var(--ok); font-weight:700; }
.orv9-calc .orv9-dim{ color:var(--graphite); }
.orv9 .orv9-a, .orv9 .orv9-n{ transition:opacity .45s ease; }
.orv9 .orv9-a line, .orv9 .orv9-a polygon, .orv9 .orv9-n circle{ transition:stroke .4s, fill .4s, stroke-width .4s; }
.orv9-bars{ display:grid; gap:7px; max-width:520px; margin:10px auto 0; font-size:.9rem; }
.orv9-bar{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:2px 8px; align-items:center; transition:opacity .4s; }
.orv9-bar .orv9-p{ font-family:var(--mono); font-size:.86rem; color:var(--ink); overflow-wrap:anywhere; }
.orv9-bar .orv9-v{ font:700 .9rem var(--mono); color:var(--ink); }
.orv9-track{ grid-column:1 / -1; height:10px; border-radius:5px; background:var(--paper); border:1px solid var(--line); overflow:hidden; }
.orv9-fill{ height:100%; background:var(--fig-s); transition:width .5s ease; }
.orv9-bar.orv9-best .orv9-fill{ background:var(--ok); }
.orv9-bar.orv9-best .orv9-v{ color:var(--ok); }
.orv9-bar.orv9-off{ opacity:.45; }
.orv9-sum{ text-align:center; font-size:.92rem; color:var(--graphite); margin-top:8px; }
.orv9-sum b{ font-family:var(--mono); color:var(--ink); }
.orv9-arcs{ display:grid; gap:6px; max-width:420px; margin:10px auto 0; }
.orv9-arcs .orv9-ar{ display:grid; grid-template-columns:44px 1fr 1fr; gap:6px; align-items:center; font-size:.86rem; color:var(--graphite); }
.orv9-arcs .orv9-ar b{ font-family:var(--mono); color:var(--ink); font-size:.9rem; }
.orv9-arcs .orv9-head{ font-size:.8rem; }
.orv9-num{ font:14px var(--mono); width:100%; box-sizing:border-box; padding:5px 6px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-height:32px; }
@media (prefers-reduced-motion: reduce){ .orv9 .orv9-a, .orv9 .orv9-n, .orv9 .orv9-a line, .orv9 .orv9-a polygon, .orv9 .orv9-n circle, .orv9-fill, .orv9-bar{ transition:none; } }`;
  if (!document.getElementById('orv9-css')) { const s = document.createElement('style'); s.id = 'orv9-css'; s.textContent = CSS; document.head.appendChild(s); }
  const b = x => `<bdi dir="ltr">${x}</bdi>`, L = x => `<span class="ltr">${x}</span>`;

  /* ── the course's networks (arcs in the order the notes write each min{…}); pos = [column, row] ── */
  const NETS = {
    st: { name: 'Final 2019/20', ar: 'امتحان الـ Final ' + b('2019/20'), short: 'S → T', src: 'S', dst: 'T', pair: true,
      pos: { S: [0, 1], A: [1, 0], B: [1, 1], C: [1, 2], D: [2, 0], E: [2, 1], T: [3, 1] },
      arcs: [['S', 'A', 1], ['S', 'B', 2], ['S', 'C', 7], ['A', 'D', 3], ['A', 'E', 6, .28], ['B', 'D', 4, .28], ['B', 'E', 10], ['C', 'T', 10], ['C', 'E', 3], ['D', 'T', 8], ['E', 'T', 2]] },
    m7: { name: 'Final 2021/22 & Sheet 2', ar: 'امتحان الـ Final ' + b('2021/22') + ' والـ Sheet 2', short: 'M1 → M7', src: 'M1', dst: 'M7', pair: true,
      pos: { M1: [0, 1], M2: [1, 1], M3: [2, 0], M4: [2, 2], M5: [3, 0], M6: [3, 2], M7: [4, 1] },
      arcs: [['M1', 'M2', 5], ['M2', 'M3', 7], ['M2', 'M4', 9], ['M3', 'M5', 11], ['M4', 'M5', 6, .35], ['M4', 'M6', 3], ['M5', 'M7', 6], ['M6', 'M7', 8]] },
    n10: { name: 'Final 2023/24, 3rd-year paper', ar: 'ورقة سنة تالتة في الـ Final ' + b('2023/24'), short: '3rd-year paper', src: '1', dst: '10',
      pos: { 1: [0, 1], 2: [1, 0], 3: [1, 1], 4: [1, 2], 5: [2, 0], 6: [2, 1], 7: [2, 2], 8: [3, .5], 9: [3, 1.5], 10: [4, 1] },
      arcs: [['1', '2', 4], ['1', '3', 6], ['1', '4', 4], ['2', '5', 3], ['2', '6', 6], ['3', '6', 8], ['3', '7', 7], ['4', '7', 7], ['5', '8', 6], ['6', '8', 5], ['6', '9', 8], ['7', '9', 7], ['8', '10', 2], ['9', '10', 6]] },
    n10b: { name: 'Final 2023/24, 2nd-year paper', ar: 'ورقة سنة تانية في الـ Final ' + b('2023/24'), short: '2nd-year paper', src: '1', dst: '10',
      pos: { 1: [0, 1], 2: [1, 0], 3: [1, 1], 4: [1, 2], 5: [2, 0], 6: [2, 1], 7: [2, 2], 8: [3, .5], 9: [3, 1.5], 10: [4, 1] },
      arcs: [['1', '2', 4], ['1', '3', 6], ['1', '4', 4], ['2', '5', 3], ['3', '5', 7], ['3', '6', 8], ['3', '7', 7], ['4', '7', 7], ['5', '8', 6], ['5', '9', 7, .4], ['6', '9', 8, .62], ['7', '8', 9, .22], ['7', '9', 7], ['8', '10', 2], ['9', '10', 6]],
      extra: { en: ' The arcs differ from the 3rd-year paper, but the answer is the same path, 1-2-5-8-10 = 15.', ar: ' الـ arcs مختلفة عن ورقة سنة تالتة، بس الإجابة نفس الـ path ونفس الطول ' + b('15') + '.' } },
    j8: { name: 'Final 2025/26', ar: 'امتحان الـ Final ' + b('2025/26'), short: 'J1 → J8', src: 'J1', dst: 'J8',
      pos: { J1: [0, 1], J2: [1, 0], J3: [1, 1], J4: [1, 2], J5: [2, 0], J6: [2, 1], J7: [2, 2], J8: [3, 1] },
      arcs: [['J1', 'J2', 4], ['J1', 'J3', 9], ['J1', 'J4', 11], ['J2', 'J5', 12], ['J2', 'J6', 8, .4], ['J3', 'J6', 10], ['J4', 'J7', 9], ['J5', 'J8', 13], ['J6', 'J8', 4], ['J7', 'J8', 15]] },
    n6: { name: 'Revision MCQ 21', ar: 'سؤال 21 في الـ Revision MCQ', short: 'N1 → N6', src: 'N1', dst: 'N6',
      pos: { N1: [0, 1], N2: [1, 0], N3: [1, 2], N4: [2, 0], N5: [2, 2], N6: [3, 1] },
      arcs: [['N1', 'N2', 4], ['N1', 'N3', 2], ['N2', 'N4', 3], ['N2', 'N5', 2, .4], ['N3', 'N5', 3], ['N4', 'N6', 2], ['N5', 'N6', 2]],
      extra: { en: ' That is choice D: N1, N3, N5, N6.', ar: ' ودي الإجابة D في السؤال.' } },
  };

  /* ── engine: stages, the backward recursion d(node) = min over arcs [length + d(next)], the path read forward ── */
  const dn = (N, x) => N.pair ? `d(${x}, ${N.dst})` : `d(${x})`;
  function solveNet(N) {
    const d = { [N.dst]: 0 }, via = {}, steps = [];
    const order = Object.keys(N.pos).filter(x => x !== N.dst).sort((p, q) => N.pos[q][0] - N.pos[p][0] || N.pos[p][1] - N.pos[q][1]);
    for (const x of order) {
      const opts = N.arcs.map((a, k) => ({ k, to: a[1], len: a[2], from: a[0] })).filter(o => o.from === x).map(o => Object.assign(o, { dv: d[o.to], v: o.len + d[o.to] }));
      const v = Math.min(...opts.map(o => o.v)), best = opts.find(o => o.v === v);
      d[x] = v; via[x] = best.to;
      steps.push({ x, stage: N.pos[x][0] + 1, opts, v, best, tie: opts.filter(o => o.v === v).length > 1, d: Object.assign({}, d) });
    }
    const path = [N.src]; while (path[path.length - 1] !== N.dst && path.length < 20) path.push(via[path[path.length - 1]]);
    const lens = path.slice(1).map((y, k) => N.arcs.find(a => a[0] === path[k] && a[1] === y)[2]);
    const pathArcs = path.slice(1).map((y, k) => N.arcs.findIndex(a => a[0] === path[k] && a[1] === y));
    const stages = Math.max(...Object.values(N.pos).map(p => p[0]));
    return { d, via, steps, path, lens, pathArcs, stages };
  }
  // the worked lines for one node, as the notes write them
  function calcLines(N, s) {
    const T = t => `<span class="orv9-t">${t}</span>`, list = (xs, f) => xs.map((o, k) => T((k === 0 ? 'min{' : '') + f(o) + (k === xs.length - 1 ? '}' : ','))).join(' ');
    const o = s.opts, X = dn(N, s.x), win = v => `<span class="orv9-win">${v}</span>`;
    if (o.length === 1 && o[0].to === N.dst) return [T(`${X} = ${win(s.v)}`)];
    if (o.length === 1) return [T(`${X} = ${o[0].len} + ${dn(N, o[0].to)}`), T(`= ${o[0].len} + ${o[0].dv} = ${win(s.v)}`) + ' ' + T(`<span class="orv9-dim">(${s.x} → ${o[0].to})</span>`)];
    const sym = list(o, q => q.to === N.dst ? `${q.len}` : `${q.len} + ${dn(N, q.to)}`), num = list(o, q => q.to === N.dst ? `${q.len}` : `${q.len} + ${q.dv}`);
    const vals = o.map(q => q.v === s.v ? win(q.v) : q.v).join(', ');
    return [T(`${X} =`) + ' ' + sym, T('=') + ' ' + num, T(`= min{${vals}} = ${win(s.v)}`) + ' ' + T(`<span class="orv9-dim">(${s.x} → ${s.best.to}${s.tie ? ', tie' : ''})</span>`)];
  }
  function stepCap(N, s) {
    const o = s.opts, X = s.x, Y = s.best.to, k = s.stage;
    if (o.length === 1 && o[0].to === N.dst) return {
      en: `<b>Stage ${k}</b> (next to ${N.dst}): ${X} goes straight to ${N.dst}, so its best distance is just the arc length, <b>${s.v}</b>.`,
      ar: `في الـ Stage ${b(k)} (جنب ${b(N.dst)})، الـ node ${b(X)} رايحة على طول لـ ${b(N.dst)}، فأحسن مسافة ليها هي طول الـ arc نفسه:` + L(`${dn(N, X)} = ${s.v}`) };
    if (o.length === 1) return {
      en: `<b>Stage ${k}</b>, node <b>${X}</b>: one arc only, to ${Y}. Its length plus the best distance already found for ${Y}: ${o[0].len} + ${o[0].dv} = <b>${s.v}</b>.`,
      ar: `في الـ Stage ${b(k)}، الـ node ${b(X)} ليها arc واحد بس لـ ${b(Y)}، فبنجمع طوله على أحسن مسافة لقيناها لـ ${b(Y)}، والحساب كده:` + L(`${dn(N, X)} = ${o[0].len} + ${o[0].dv} = ${s.v}`) };
    const ties = o.filter(q => q.v === s.v).map(q => q.to);
    return {
      en: `<b>Stage ${k}</b>, node <b>${X}</b>: ${o.length} arcs. For each, arc length + the best distance already found for the node it reaches; keep the minimum, <b>${s.v}</b>, and record ${X} → ${Y}.` + (s.tie ? ` (A tie: through ${ties.join(' and ')} both give ${s.v}.)` : ''),
      ar: `في الـ Stage ${b(k)}، الـ node ${b(X)} طالع منها ${b(o.length)} arcs. لكل arc بنجمع طوله على أحسن مسافة لقيناها للـ node اللي بيوصلها، وبناخد الأقل ونسجل الـ arc بتاعه.` + (s.tie ? ' وهنا فيه تعادل، فأكتر من arc بيدّي نفس القيمة.' : '') + ' النتيجة:' + L(`${dn(N, X)} = ${s.v}  (${X} → ${Y})`) };
  }

  /* ── the network drawing ── */
  const R = 16, FS = 14, VW = 300, PX = 24, TOP = 40, DY = 64;
  function layout(N) {
    const ps = Object.values(N.pos), cols = Math.max(...ps.map(p => p[0])) + 1, rows = Math.max(...ps.map(p => p[1]));
    const dx = (VW - 2 * PX) / (cols - 1), P = {};
    for (const k in N.pos) P[k] = [PX + N.pos[k][0] * dx, TOP + N.pos[k][1] * DY];
    return { P, dx, cols, H: Math.round(TOP + rows * DY + R + 34) };
  }
  // st: { bands, hl (stage column lit), cur, cand: Set, best, rec: Set, path: Set, pathNodes: Set, d: {}, done: Set, back }
  function Net({ N, st, title }) {
    const { P, dx, cols, H } = useMemo(() => layout(N), [N]);
    const sty = k => {
      if (st.path && st.path.size) return st.path.has(k) ? { s: 'var(--ok)', w: 3.6, o: 1 } : { s: 'var(--graphite)', w: 1.3, o: .35 };
      if (st.best === k) return { s: 'var(--ok)', w: 3.2, o: 1 };
      if (st.cand && st.cand.has(k)) return { s: 'var(--fig-k)', w: 2.6, o: 1 };
      if (st.rec && st.rec.has(k)) return { s: 'var(--fig-s)', w: 2.6, o: .9 };
      if (st.hlPath && st.hlPath.size) return { s: 'var(--graphite)', w: 1.3, o: .45 };
      return { s: 'var(--graphite)', w: 1.4, o: .75 };
    };
    const arcs = N.arcs.map((a, k) => {
      const [x1, y1] = P[a[0]], [x2, y2] = P[a[1]], L0 = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L0, uy = (y2 - y1) / L0;
      const sx = x1 + ux * R, sy = y1 + uy * R, tx = x2 - ux * (R + 1), ty = y2 - uy * (R + 1), z = sty(k), hp = st.hlPath && st.hlPath.has(k);
      const s2 = hp ? { s: 'var(--fig-s)', w: 3.2, o: 1 } : z;
      const t = a[3] || .5, lx = x1 + (x2 - x1) * t, ly = y1 + (y2 - y1) * t, lw = String(a[2]).length * 8.6 + 7;
      return html`<g key=${'a' + k} className="orv9-a" style=${{ opacity: s2.o }}>
        <line x1=${sx} y1=${sy} x2=${tx - ux * 6} y2=${ty - uy * 6} style=${{ stroke: s2.s, strokeWidth: s2.w, strokeLinecap: 'round' }} />
        <polygon points=${`${tx},${ty} ${tx - ux * 10 + uy * 5},${ty - uy * 10 - ux * 5} ${tx - ux * 10 - uy * 5},${ty - uy * 10 + ux * 5}`} style=${{ fill: s2.s, stroke: s2.s, strokeWidth: 1 }} />
        <rect x=${lx - lw / 2} y=${ly - 10} width=${lw} height="19" rx="4" style=${{ fill: 'var(--paper)', stroke: s2.o === 1 && s2.w > 2 ? s2.s : 'var(--line)', strokeWidth: 1.2 }} />
        <text x=${lx} y=${ly + 5} textAnchor="middle" fontSize=${FS} fontWeight="600">${a[2]}</text></g>`;
    });
    const nodes = Object.keys(N.pos).map(x => {
      const [cx, cy] = P[x], cur = st.cur === x, onP = st.pathNodes && st.pathNodes.has(x), done = st.done && st.done.has(x), dv = st.d && st.d[x];
      const fill = cur ? 'var(--fig-s)' : 'var(--paper)', stroke = onP ? 'var(--ok)' : cur ? 'var(--fig-s)' : done ? 'var(--fig-k)' : 'var(--ink)';
      return html`<g key=${'n' + x} className="orv9-n">
        <circle cx=${cx} cy=${cy} r=${R} style=${{ fill, stroke, strokeWidth: onP || done || cur ? 2.6 : 1.6 }} />
        <text x=${cx} y=${cy + 5} textAnchor="middle" fontSize=${x.length > 2 ? 12.5 : FS} fontWeight="700" style=${cur ? { fill: '#fff' } : null}>${x}</text>
        ${dv != null && x !== N.dst && html`<g><rect x=${cx - 15} y=${cy - R - 23} width="30" height="19" rx="9" style=${{ fill: 'var(--paper)', stroke: onP ? 'var(--ok)' : 'var(--fig-k)', strokeWidth: 1.6 }} /><text x=${cx} y=${cy - R - 8.5} textAnchor="middle" fontSize=${FS} fontWeight="700">${dv}</text></g>`}
      </g>`;
    });
    const bands = st.bands ? [...Array(cols - 1).keys()].map(c => {
      const x = PX + c * dx, w = Math.min(dx - 6, 76), lit = st.hl === c;
      return html`<g key=${'b' + c}><rect x=${x - w / 2} y="4" width=${w} height=${H - 30} rx="10" style=${{ fill: lit ? 'color-mix(in srgb, var(--fig-k) 22%, transparent)' : 'color-mix(in srgb, var(--fig-k) 7%, transparent)', stroke: lit ? 'var(--fig-k)' : 'none', strokeWidth: 1.5, transition: 'fill .4s' }} />
        <text x=${x} y=${H - 9} textAnchor="middle" fontSize=${FS} fontWeight=${lit ? 700 : 500} style=${{ fill: lit ? 'var(--ink)' : 'var(--graphite)' }}>Stage ${c + 1}</text></g>`;
    }) : null;
    const back = st.back ? html`<g className=${pop(true)}><line x1=${VW - PX - 10} y1="14" x2=${PX + 30} y2="14" style=${{ stroke: 'var(--fig-k)', strokeWidth: 2.4 }} /><polygon points=${`${PX + 20},14 ${PX + 31},8.5 ${PX + 31},19.5`} style=${{ fill: 'var(--fig-k)' }} />
      <rect x=${VW / 2 - 40} y="5" width="80" height="19" rx="9" style=${{ fill: 'var(--paper-2)' }} /><text x=${VW / 2} y="19.5" textAnchor="middle" fontSize=${FS} fontWeight="700" style=${{ fill: 'var(--fig-k)' }}>backward</text></g>` : null;
    return html`<svg className="orv9-svg" viewBox=${`0 0 ${VW} ${st.bands ? H : H - 26}`} role="img" aria-label=${title}>${bands}${arcs}${nodes}${back}</svg>`;
  }
  const Calc = ({ lines }) => html`<div className="orv9-calc" dir="ltr">${lines.map((l, k) => html`<div key=${k} dangerouslySetInnerHTML=${{ __html: l }}></div>`)}</div>`;
  const Modes = ({ list, mode, set, label }) => html`<div className="orv9-modes" role="group" aria-label=${label || 'Choose'}>${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  // steps that restart when the data change (dep); autoplay only on the first mount
  function useWalk(n, ms, dep) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(false); }, [dep]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const stageList = (N) => { const by = {}; Object.keys(N.pos).filter(x => x !== N.dst).forEach(x => { const c = N.pos[x][0] + 1; (by[c] = by[c] || []).push(x); }); return Object.keys(by).sort((p, q) => q - p).map(c => `<span class="orv9-t">Stage ${c}: {${by[c].join(', ')}}</span>`).join(' &nbsp; '); };

  /* ── "Try your own": one arc per line "from to length" ── */
  const toTxt = N => N.arcs.map(a => `${a[0]} ${a[1]} ${a[2]}`).join('\n');
  function parseNet(t) {
    const E = (en, ar) => ({ err: { en, ar } });
    const lines = t.split('\n').map(x => x.trim()).filter(Boolean), arcs = [];
    for (const l of lines) {
      const m = l.match(/^([A-Za-z0-9]{1,3})\s*(?:->|→|-|\s)\s*([A-Za-z0-9]{1,3})\s+(\d{1,3})$/);
      if (!m) return E(`Write each arc as "from to length", e.g. "S A 1". Problem in: ${l.slice(0, 20)}`, 'اكتب كل arc بالشكل ده (من، لـ، الطول):' + L('S A 1'));
      if (m[1] === m[2]) return E('An arc must join two different nodes.', 'الـ arc لازم يوصل بين اتنين nodes مختلفين.');
      if (arcs.some(a => a[0] === m[1] && a[1] === m[2])) return E(`The arc ${m[1]} → ${m[2]} is written twice.`, 'فيه arc مكتوب مرتين:' + L(`${m[1]} → ${m[2]}`));
      arcs.push([m[1], m[2], +m[3]]);
    }
    if (arcs.length < 2 || arcs.length > 18) return E('Use 2 to 18 arcs.', 'استخدم من ' + b('2') + ' لـ ' + b('18') + ' arc.');
    const names = []; arcs.forEach(a => { if (!names.includes(a[0])) names.push(a[0]); if (!names.includes(a[1])) names.push(a[1]); });
    if (names.length > 12) return E('Use at most 12 nodes.', 'استخدم ' + b('12') + ' node بالكتير.');
    const src = names.filter(x => !arcs.some(a => a[1] === x)), dst = names.filter(x => !arcs.some(a => a[0] === x));
    if (src.length !== 1 || dst.length !== 1) return E('The network needs exactly one source (no arcs in) and one destination (no arcs out).', 'الـ network محتاجة source واحد بس (مفيش arcs داخلة عليه) و destination واحد بس (مفيش arcs طالعة منه).');
    // stages: longest number of arcs from the source (every arc then goes forward)
    const col = { [src[0]]: 0 };
    for (let it = 0; it < 30; it++) { let ch = false; for (const a of arcs) if (col[a[0]] != null && (col[a[1]] == null || col[a[1]] < col[a[0]] + 1)) { col[a[1]] = col[a[0]] + 1; ch = true; } if (!ch) break; if (it === 29) return E('The arcs make a loop: the network must only go forward.', 'الـ arcs عاملة loop، والـ network لازم تمشي لقدام بس.'); }
    if (names.some(x => col[x] == null)) return E('Every node must be reachable from the source.', 'كل node لازم نقدر نوصلها من الـ source.');
    const cols = Math.max(...Object.values(col)) + 1;
    if (cols > 5) return E('Keep it to 4 stages (at most 4 arcs on any path from the source to the destination).', 'خليها ' + b('4') + ' stages بالكتير (يعني أي path من الـ source للـ destination فيه ' + b('4') + ' arcs بالكتير).');
    const per = {}; names.forEach(x => (per[col[x]] = per[col[x]] || []).push(x));
    const most = Math.max(...Object.values(per).map(v => v.length));
    if (most > 4) return E('At most 4 nodes in one stage.', 'كل stage فيها ' + b('4') + ' nodes بالكتير.');
    const pos = {}; Object.values(per).forEach(v => v.forEach((x, k) => { pos[x] = [col[x], (most - v.length) / 2 + k]; }));
    return { N: { name: 'Your network', ar: 'الـ network بتاعتك', short: 'Try your own', src: src[0], dst: dst[0], pair: true, pos, arcs } };
  }

  /* ── [1]–[5] the backward approach, node by node, on one exam network ── */
  function DpWalk({ ar, sets, own }) {
    const [k, setK] = useState(0), [txt, setTxt] = useState(toTxt(sets[0]));
    const isOwn = own && k === sets.length, got = isOwn ? parseNet(txt) : { N: sets[k] }, N = got.N;
    const sol = useMemo(() => N ? solveNet(N) : null, [isOwn ? txt : k]);
    const n = sol ? sol.steps.length + 2 : 1, [i, ctl] = useWalk(n, 2800, isOwn ? 'own' + txt : k);
    const pick = j => { if (j === sets.length && !isOwn) setTxt(toTxt(sets[k])); setK(j); };
    const modes = sets.map((s, j) => [j, s.short]).concat(own ? [[sets.length, 'Try your own']] : []);
    const head = html`${modes.length > 1 && html`<${Modes} list=${modes} mode=${k} set=${pick} label="Network" />`}
      ${isOwn && html`<div className="orv9-row"><label className="orv9-lbl" htmlFor="orv9-in-own">One arc per line: from to length.</label>
        <textarea id="orv9-in-own" className="orv9-in" rows=${Math.min(8, txt.split('\n').length + 1)} value=${txt} onInput=${e => setTxt(e.target.value)} spellCheck="false" autoCapitalize="off"></textarea></div>`}`;
    if (!N) return html`<figure className="fig orv9"><div className="fig-stage">${head}<p className="orv9-err">${got.err.en}</p></div><${Cap} en=${got.err.en} ar=${got.err.ar} showAr=${ar} /></figure>`;
    const S = sol.steps, s = i > 0 && i <= S.length ? S[i - 1] : null, done = i === n - 1;
    const st = { bands: true };
    let cap, lines;
    if (i === 0) {
      cap = { en: `${N.name}: shortest route from <b>${N.src}</b> to <b>${N.dst}</b>. The network is cut into stages (shaded). Backward approach: start with Stage ${sol.stages}, the nodes next to ${N.dst}, and move back stage by stage to ${N.src}.`,
        ar: `في ${N.ar}، عايزين أقصر route من ${b(N.src)} لـ ${b(N.dst)}. الـ network متقسمة لـ stages (المظللة). في الـ backward approach بنبدأ بالـ Stage ${b(sol.stages)} اللي جنب ${b(N.dst)}، ونرجع stage ورا stage لحد ${b(N.src)}.` };
      lines = [stageList(N)];
    } else if (s) {
      const prev = S.slice(0, i - 1);
      Object.assign(st, { hl: s.stage - 1, cur: s.x, cand: new Set(s.opts.map(o => o.k)), best: s.best.k, rec: new Set(prev.map(p => p.best.k)), d: s.d, done: new Set(prev.map(p => p.x).concat(s.x)) });
      cap = stepCap(N, s); lines = calcLines(N, s);
    } else {
      const sumx = `${sol.lens.join(' + ')} = ${sol.d[N.src]}`;
      Object.assign(st, { path: new Set(sol.pathArcs), pathNodes: new Set(sol.path), d: sol.d, done: new Set(Object.keys(sol.d)) });
      cap = { en: `Read the path forward from ${N.src}, following the recorded arcs: <b>${sol.path.join(' → ')}</b>, length <b>${sol.d[N.src]}</b> (${sumx}).` + (N.extra ? N.extra.en : ''),
        ar: `بعدها بنقرا الـ path من الأول، من ${b(N.src)} وماشيين على الـ arcs اللي سجلناها:` + L(sol.path.join(' → ')) + 'وطوله:' + L(sumx) + (N.extra ? N.extra.ar.trim() : '') };
      lines = [`<span class="orv9-t">Shortest path: ${sol.path.join(' → ')}</span>`, `<span class="orv9-t">Length = ${sumx.replace(/= (\d+)$/, '= <span class="orv9-win">$1</span>')}</span>`];
    }
    return html`<figure className="fig orv9"><div className="fig-stage">${head}
      <${Net} N=${N} st=${st} title=${'Shortest route network, ' + N.name} />
      <${Calc} lines=${lines} /></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${Array(n).fill(0)} i=${i} ctl=${ctl} /></figure>`;
  }
  const M7 = ({ ar }) => html`<${DpWalk} ar=${ar} sets=${[NETS.m7]} />`;
  const ST = ({ ar }) => html`<${DpWalk} ar=${ar} sets=${[NETS.st]} own=${true} />`;
  const N10 = ({ ar }) => html`<${DpWalk} ar=${ar} sets=${[NETS.n10, NETS.n10b]} />`;
  const J8 = ({ ar }) => html`<${DpWalk} ar=${ar} sets=${[NETS.j8]} />`;
  const N6 = ({ ar }) => html`<${DpWalk} ar=${ar} sets=${[NETS.n6]} />`;

  /* ── [0.2] the slide's network cut into stages, solved backward ── */
  function Stages({ ar }) {
    const N = NETS.st;
    const steps = [
      { en: 'The slide’s network: each number on a link is the distance between the two nodes it joins. Find the shortest path from city S to city T.', ar: `الـ network بتاعة الـ slide: كل رقم على link هو المسافة بين الاتنين nodes اللي بيوصلهم. المطلوب أقصر path من المدينة ${b('S')} للمدينة ${b('T')}.` },
      { en: 'Dynamic programming splits the big problem into stages: Stage 1 = {S}, Stage 2 = {A, B, C}, Stage 3 = {D, E}; T is the destination.', ar: 'الـ Dynamic programming بيقسم المسألة الكبيرة لـ stages:' + L('Stage 1 = {S}, Stage 2 = {A, B, C}, Stage 3 = {D, E}') + 'والـ T هي الـ destination.' },
      { en: 'Backward approach: start with the last stage, Stage 3, the nodes next to the destination. Their best distance to T is just their arc.', ar: 'في الـ backward approach بنبدأ بآخر stage، يعني الـ Stage 3 اللي فيها الـ nodes اللي جنب الـ destination، وأحسن مسافة ليهم لـ T هي طول الـ arc بتاعهم.' },
      { en: 'Move back to Stage 2: each of A, B, C is solved using the optimal results already found for the following stage (D, E, and T).', ar: 'بعدها نرجع للـ Stage 2، وكل node فيها (الـ A والـ B والـ C) بتتحل باستخدام الـ optimal results اللي لقيناها للـ stage اللي بعدها.' },
      { en: 'Finally Stage 1, the source S: its best distance is the answer, and following the recorded arcs from S gives the path. The next visuals work out the numbers.', ar: `وفي الآخر الـ Stage 1 اللي فيها الـ source يعني ${b('S')}. أحسن مسافة ليها هي الإجابة، ولو مشينا على الـ arcs اللي سجلناها من ${b('S')} هيطلع الـ path. والأرقام متحسوبة في الـ visuals اللي جاية.` },
    ];
    const [i, ctl] = useSteps(steps.length, 2900);
    const st = { bands: i >= 1, hl: i >= 2 ? 4 - i : null, back: i >= 2 };
    return html`<figure className="fig orv9"><div className="fig-stage"><${Net} N=${N} st=${st} title="Shortest route network from S to T, cut into three stages" /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3] one node's recursion: d(node) = min over arcs [length + d(next)] ── */
  const PRE = [
    { key: 'm4', label: 'M4 (Final 2021/22)', x: 'M4', rows: [['M5', 6, 6], ['M6', 3, 8]] },
    { key: 'a', label: 'A (Final 2019/20)', x: 'A', rows: [['D', 3, 8], ['E', 6, 2]] },
    { key: 's', label: 'S (Final 2019/20)', x: 'S', rows: [['A', 1, 8], ['B', 2, 12], ['C', 7, 5]] },
  ];
  function NodeCalc({ ar }) {
    const [k, setK] = useState(0), [own, setOwn] = useState([['Y1', '4', '9'], ['Y2', '7', '3'], ['Y3', '', '']]);
    const isOwn = k === PRE.length, X = isOwn ? 'X' : PRE[k].x;
    const rows = isOwn ? own.filter(r => r[1] !== '' && r[2] !== '').map(r => [r[0], +r[1], +r[2]]) : PRE[k].rows;
    const ok = rows.length > 0 && rows.every(r => Number.isFinite(r[1]) && Number.isFinite(r[2]) && r[1] >= 0 && r[2] >= 0 && r[1] <= 999 && r[2] <= 999);
    const set = (j, c, v) => setOwn(o => o.map((r, q) => q === j ? r.map((x, w) => w === c ? v.replace(/[^0-9]/g, '').slice(0, 3) : x) : r));
    const pick = j => { if (j === PRE.length && !isOwn) setOwn([0, 1, 2].map(q => { const r = PRE[k].rows[q]; return r ? ['Y' + (q + 1), String(r[1]), String(r[2])] : ['Y' + (q + 1), '', '']; })); setK(j); };
    const head = html`<${Modes} list=${PRE.map((p, j) => [j, p.label]).concat([[PRE.length, 'Try your own']])} mode=${k} set=${pick} label="Node" />`;
    const inputs = isOwn && html`<div className="orv9-arcs"><div className="orv9-ar orv9-head"><span>Arc</span><span>Length</span><span>d(next)</span></div>
      ${own.map((r, j) => html`<div key=${j} className="orv9-ar"><b>X → ${r[0]}</b>
        <input className="orv9-num" inputMode="numeric" aria-label=${'Length of X to ' + r[0]} value=${r[1]} onInput=${e => set(j, 1, e.target.value)} />
        <input className="orv9-num" inputMode="numeric" aria-label=${'Best distance of ' + r[0]} value=${r[2]} onInput=${e => set(j, 2, e.target.value)} /></div>`)}</div>`;
    if (!ok) return html`<figure className="fig orv9"><div className="fig-stage">${head}${inputs}<p className="orv9-err">Fill at least one arc: a length and d(next), whole numbers 0 to 999.</p></div>
      <${Cap} en="Fill at least one arc: its length and the best distance d of the node it reaches." ar="املا arc واحد على الأقل: طوله وأحسن مسافة للـ node اللي بيوصلها." showAr=${ar} /></figure>`;
    const vals = rows.map(r => r[1] + r[2]), v = Math.min(...vals), bi = vals.indexOf(v), Y = rows[bi][0];
    // a small fan: X on the left, the next nodes on the right with their d
    const H = 70 + (rows.length - 1) * 62, xs = 40, xe = 214, yy = j => 34 + j * 62 + (rows.length === 1 ? 0 : 0), yx = 34 + (rows.length - 1) * 31;
    const fan = html`<svg className="orv9-svg" viewBox=${`0 0 ${VW} ${H}`} role="img" aria-label=${'Node ' + X + ' and its outgoing arcs'} style=${{ maxWidth: '420px' }}>
      ${rows.map((r, j) => { const y = yy(j), L0 = Math.hypot(xe - xs, y - yx), ux = (xe - xs) / L0, uy = (y - yx) / L0, tx = xe - ux * (R + 1), ty = y - uy * (R + 1), win = j === bi, c = win ? 'var(--ok)' : 'var(--fig-k)', lx = (xs + xe) / 2, ly = (yx + y) / 2;
        return html`<g key=${j}><line x1=${xs + ux * R} y1=${yx + uy * R} x2=${tx - ux * 6} y2=${ty - uy * 6} style=${{ stroke: c, strokeWidth: win ? 3.2 : 2.2, transition: 'stroke .3s' }} />
          <polygon points=${`${tx},${ty} ${tx - ux * 10 + uy * 5},${ty - uy * 10 - ux * 5} ${tx - ux * 10 - uy * 5},${ty - uy * 10 + ux * 5}`} style=${{ fill: c }} />
          <rect x=${lx - 15} y=${ly - 10} width="30" height="19" rx="4" style=${{ fill: 'var(--paper)', stroke: c, strokeWidth: 1.2 }} /><text x=${lx} y=${ly + 5} textAnchor="middle" fontSize=${FS} fontWeight="600">${r[1]}</text>
          <circle cx=${xe} cy=${y} r=${R} style=${{ fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.6 }} /><text x=${xe} y=${y + 5} textAnchor="middle" fontSize=${FS} fontWeight="700">${r[0]}</text>
          <text x=${xe + 24} y=${y + 5} fontSize=${FS} style=${{ fill: 'var(--graphite)' }}>d = ${r[2]}</text></g>`; })}
      <circle cx=${xs} cy=${yx} r=${R} style=${{ fill: 'var(--fig-s)', stroke: 'var(--fig-s)' }} /><text x=${xs} y=${yx + 5} textAnchor="middle" fontSize=${FS} fontWeight="700" style=${{ fill: '#fff' }}>${X}</text>
      <rect x=${xs - 15} y=${yx - R - 23} width="30" height="19" rx="9" style=${{ fill: 'var(--paper)', stroke: 'var(--ok)', strokeWidth: 1.6 }} /><text x=${xs} y=${yx - R - 8.5} textAnchor="middle" fontSize=${FS} fontWeight="700">${v}</text></svg>`;
    const mx = Math.max(...vals, 1);
    const bars = html`<div className="orv9-bars">${rows.map((r, j) => html`<div key=${j} className=${'orv9-bar' + (j === bi ? ' orv9-best' : '')}>
      <span className="orv9-p">via ${r[0]}: ${r[1]} + ${r[2]}</span><span className="orv9-v">${vals[j]}</span>
      <div className="orv9-track"><div className="orv9-fill" style=${{ width: (vals[j] / mx * 100) + '%' }}></div></div></div>`)}</div>`;
    const f = `d(${X}) = min{${rows.map(r => r[1] + ' + ' + r[2]).join(', ')}} = min{${vals.join(', ')}} = ${v}`, f1 = `d(${X}) = ${rows[0][1]} + ${rows[0][2]} = ${v}`;
    const tie = vals.filter(q => q === v).length > 1;
    const cap = { en: `Recursion: for every arc out of ${X}, arc length + d of the node it reaches; keep the minimum. ${rows.length > 1 ? f : f1}, so record ${X} → ${Y}.` + (tie ? ' (A tie: either arc gives the same value.)' : '') + (!isOwn && PRE[k].key === 'm4' ? ' This is the quiz question: arcs 6 and 3 to nodes with d = 6 and 8 give 11.' : ''),
      ar: `الـ Recursion: لكل arc طالع من ${b(X)} بنجمع طوله على ${b('d')} بتاع الـ node اللي بيوصلها، وبناخد الأقل:` + L(rows.length > 1 ? f : f1) + 'وبنسجل الـ arc ده:' + L(`${X} → ${Y}`) + (tie ? 'وهنا فيه تعادل، فأي arc منهم بيدّي نفس القيمة.' : '') + (!isOwn && PRE[k].key === 'm4' ? 'وده سؤال الـ quiz بالظبط، والإجابة ' + b('11') + '.' : '') };
    return html`<figure className="fig orv9"><div className="fig-stage">${head}${inputs}${fan}${bars}</div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [0.4] the tutor's shortcut: list every path, then compare with the backward stages ── */
  function allPaths(N) {
    const out = [], go = (p) => { const x = p[p.length - 1]; if (x === N.dst) { out.push(p); return; } N.arcs.filter(a => a[0] === x).forEach(a => go(p.concat(a[1]))); };
    go([N.src]);
    return out.map(p => { const lens = p.slice(1).map((y, k) => N.arcs.find(a => a[0] === p[k] && a[1] === y)[2]); return { p, lens, v: lens.reduce((s, x) => s + x, 0), arcs: p.slice(1).map((y, k) => N.arcs.findIndex(a => a[0] === p[k] && a[1] === y)) }; });
  }
  const ALLS = [NETS.st, NETS.m7, NETS.n10];
  function AllPaths({ ar }) {
    const [k, setK] = useState(0), N = ALLS[k];
    const ps = useMemo(() => allPaths(N), [k]), n = ps.length + 2, [i, ctl] = useWalk(n, 2000, k);
    const v = Math.min(...ps.map(p => p.v)), best = ps.find(p => p.v === v), reads = ps.reduce((s, p) => s + p.lens.length, 0), mx = Math.max(...ps.map(p => p.v)), done = i === n - 1;
    const cur = i > 0 && i <= ps.length ? ps[i - 1] : null;
    const st = done ? { path: new Set(best.arcs), pathNodes: new Set(best.p) } : cur ? { hlPath: new Set(cur.arcs), pathNodes: new Set(cur.p) } : {};
    let cap;
    if (i === 0) cap = { en: `The tutor’s shortcut on ${N.name}: list every path from ${N.src} to ${N.dst} and add up its arcs.`, ar: `اختصار المعيد على ${N.ar}: بنكتب كل الـ paths من ${b(N.src)} لـ ${b(N.dst)} ونجمع الـ arcs بتاعة كل واحد.` };
    else if (cur) cap = { en: `Path ${i} of ${ps.length}: ${cur.p.join(' → ')} = ${cur.lens.join(' + ')} = <b>${cur.v}</b>.`, ar: `الـ path رقم ${b(i)} من ${b(ps.length)}، والحساب كده:` + L(`${cur.p.join(' → ')} = ${cur.lens.join(' + ')} = ${cur.v}`) };
    else cap = { en: `Shortest: <b>${best.p.join(' → ')} = ${v}</b>, the same answer as the backward stages. But listing added ${reads} arc lengths over ${ps.length} paths, while the backward approach uses each of the ${N.arcs.length} arcs once: it reuses every node’s best distance, so the work grows with arcs, not with the number of paths. The exam asks for the stages, so show them.`,
      ar: 'الأقصر هو:' + L(`${best.p.join(' → ')} = ${v}`) + `ودي نفس إجابة الـ stages الـ backward. بس الطريقة دي جمعت ${b(reads)} طول arc في ${b(ps.length)} paths، أما الـ backward approach فبيستخدم كل arc من الـ ${b(N.arcs.length)} مرة واحدة، لأنه بيعيد استخدام أحسن مسافة لكل node، فالشغل بيكبر مع عدد الـ arcs مش مع عدد الـ paths. والامتحان بيطلب الـ stages، فلازم توضحها.` };
    return html`<figure className="fig orv9"><div className="fig-stage">
      <${Modes} list=${ALLS.map((x, j) => [j, x.short === '3rd-year paper' ? '1 → 10' : x.short])} mode=${k} set=${setK} label="Network" />
      <${Net} N=${N} st=${st} title=${'All paths of the network, ' + N.name} />
      <div className="orv9-bars">${ps.map((p, j) => { const on = i > j, isB = done && p === best;
        return html`<div key=${j} className=${'orv9-bar' + (isB ? ' orv9-best' : '') + (on ? '' : ' orv9-off') + (done && !isB ? ' orv9-off' : '')}>
          <span className="orv9-p">${p.p.join('-')}${on ? ' = ' + p.lens.join(' + ') : ''}</span><span className="orv9-v">${on ? p.v : '?'}</span>
          <div className="orv9-track"><div className="orv9-fill" style=${{ width: (on ? p.v / mx * 100 : 0) + '%' }}></div></div></div>`; })}</div>
      ${done && html`<p className="orv9-sum">Listing: <b>${reads}</b> arc lengths added · Backward DP: each of <b>${N.arcs.length}</b> arcs used once</p>`}</div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${Array(n).fill(0)} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'or-dp-stages': Stages, 'or-dp-node': NodeCalc, 'or-dp-allpaths': AllPaths, 'or-dp-m1m7': M7, 'or-dp-st': ST, 'or-dp-n10': N10, 'or-dp-j8': J8, 'or-dp-n6': N6 });
})();
/* ── part L7 ── */
// Operations Research visuals, Lecture 7 (project scheduling, CPM): the network terms, building the arrow network (Lec_10 slide 1, Lec_09 slides 10-20), the two dummy rules, the time formulas (max at a merge node, min at a burst node, floats, the node test), the forward and backward pass with the ES/EF/LS/LF table (Lec_10 slides 3-5), the path list (Lec_10 slide 2), the section and Final examples step by step, and a CPM solver. Every label and number comes from the site's notes or is computed with the course's method.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.orv7 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.orv7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.orv7-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.orv7-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.orv7-net{ width:100%; }
.fig .orv7-net svg{ display:block; margin:0 auto; max-width:100%; height:auto; font-family:var(--body); }
.fig .orv7-net svg text{ fill:var(--ink); }
.fig .orv7-net svg text.orv7-w{ fill:#fff; font-weight:700; }
.fig .orv7-net svg text.orv7-mu{ fill:var(--graphite); }
.orv7-a, .orv7-lb, .orv7-nd, .orv7-bx{ transition:opacity .45s ease; }
.orv7-tbl{ width:100%; max-width:460px; margin:10px auto 0; border-collapse:collapse; font:.8rem/1.35 var(--mono); color:var(--ink); background:var(--paper); table-layout:fixed; }
.orv7-tbl th, .orv7-tbl td{ border:1px solid var(--line); padding:3px 2px; text-align:center; }
.orv7-tbl th{ font-weight:600; background:var(--paper-2); font-family:var(--body); }
.orv7-tbl tr.orv7-cur td{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.orv7-tbl tr.orv7-crit td{ font-weight:700; }
.orv7-tbl tr.orv7-crit td:first-child{ color:var(--fig-k); }
.orv7-tbl td.orv7-z{ color:var(--fig-k); }
.orv7-verdict{ max-width:460px; margin:8px auto 0; text-align:center; font-weight:700; color:var(--ink); font-size:.9rem; overflow-wrap:anywhere; }
.orv7-verdict.orv7-bad{ color:var(--pen); }
.orv7-key{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; }
.orv7-key span{ display:inline-flex; align-items:center; gap:5px; }
.orv7-key i{ display:inline-block; width:15px; height:13px; border:1.5px solid var(--fig-k); background:var(--paper); }
.orv7-key i.orv7-tri{ border:0; width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-bottom:13px solid var(--pen); background:none; }
.orv7-key i.orv7-crl{ border:0; height:4px; width:18px; background:var(--fig-k); }
.orv7-key i.orv7-dsh{ border:0; height:0; width:18px; border-top:2px dashed var(--graphite); background:none; }
.orv7-paths{ max-width:460px; margin:8px auto 0; display:grid; gap:3px; font:.8rem/1.4 var(--mono); color:var(--ink); }
.orv7-paths div{ display:flex; justify-content:space-between; gap:8px; border:1px solid var(--line); border-radius:6px; padding:2px 8px; background:var(--paper); }
.orv7-paths div.orv7-on{ font-weight:700; border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); }
.orv7-ed{ max-width:460px; margin:0 auto 8px; display:grid; gap:4px; font-size:.84rem; color:var(--ink); }
.orv7-ed .orv7-l{ display:grid; grid-template-columns:2.6em 3.6em minmax(0,1fr) auto; gap:4px; align-items:center; }
.orv7-ed .orv7-h{ font-size:.78rem; color:var(--graphite); }
.orv7-ed input{ width:100%; box-sizing:border-box; font:inherit; font-size:.84rem; padding:3px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); min-height:30px; }
.orv7-ed .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:30px; }
.fig .orv7-tl{ display:block; margin:0 auto; max-width:100%; height:auto; }
.orv7 .fig-dots{ flex-wrap:wrap; min-width:0; flex:1 1 150px; row-gap:5px; }
.fig .orv7-tl text{ fill:var(--ink); font-family:var(--body); }
.fig .orv7-tl text.orv7-mu{ fill:var(--graphite); }
.fig .orv7-tl text.orv7-w{ fill:#fff; font-weight:700; }
.orv7-dm{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; }
.orv7-dm > div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 4px; min-width:0; }
.orv7-dm b{ display:block; text-align:center; font-size:.82rem; }
.orv7-dm .orv7-no{ color:var(--pen); } .orv7-dm .orv7-ok{ color:var(--ok); }
@media (max-width:520px){ .orv7-dm{ grid-template-columns:minmax(0, 1fr); } }
.orv7 .fig-cap .ltr{ font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .orv7-a, .orv7-lb, .orv7-nd, .orv7-bx{ transition:none; } }
`;
  if (!document.getElementById('orv7-css')) { const s = document.createElement('style'); s.id = 'orv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers: text ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const I = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const M = '−';
  /* ── engine: CPM times (activity table) and the arrow network (nodes, activities, dummies) ── */
  const A_ = (s) => s.split(';').map(x => x.trim()).filter(Boolean).map(x => { const m = x.match(/^([A-Za-z]\w*)\s+(\d+(?:\.\d+)?)\s*(?:\(([^)]*)\))?$/); return { id: m[1], d: +m[2], p: m[3] ? m[3].split(',').map(t => t.trim()).filter(Boolean) : [] }; });
  // every activity: ES, EF, LS, LF, TF, FF; T; critical; all start-to-end paths
  function times(acts) {
    const by = {}; acts.forEach(a => { by[a.id] = a; });
    const err = [];
    acts.forEach(a => a.p.forEach(q => { if (!by[q]) err.push(`${a.id}: unknown predecessor ${q}`); if (q === a.id) err.push(`${a.id} cannot precede itself`); }));
    if (Object.keys(by).length !== acts.length) err.push('two activities have the same name');
    if (err.length) return { err };
    const succ = {}; acts.forEach(a => { succ[a.id] = []; }); acts.forEach(a => a.p.forEach(q => succ[q].push(a.id)));
    const order = [], deg = {}; acts.forEach(a => { deg[a.id] = a.p.length; });
    const q = acts.filter(a => !a.p.length).map(a => a.id);
    while (q.length) { const x = q.shift(); order.push(x); succ[x].forEach(y => { if (--deg[y] === 0) q.push(y); }); }
    if (order.length < acts.length) return { err: ['the predecessors form a loop'] };
    const R = {}; order.forEach(x => { const a = by[x], es = a.p.length ? Math.max(...a.p.map(p => R[p].EF)) : 0; R[x] = { id: x, d: a.d, p: a.p, ES: es, EF: es + a.d }; });
    const T = Math.max(...order.map(x => R[x].EF));
    order.slice().reverse().forEach(x => { const r = R[x], s = succ[x]; r.LF = s.length ? Math.min(...s.map(y => R[y].LS)) : T; r.LS = r.LF - r.d; r.TF = r.LS - r.ES; r.FF = (s.length ? Math.min(...s.map(y => R[y].ES)) : T) - r.EF; r.crit = r.TF === 0; r.succ = s; });
    const paths = []; const walk = (x, acc) => { if (paths.length > 40) return; const ac = acc.concat(x); if (!succ[x].length) paths.push({ ids: ac, len: ac.reduce((s, y) => s + by[y].d, 0) }); else succ[x].forEach(y => walk(y, ac)); };
    acts.filter(a => !a.p.length).forEach(a => walk(a.id, []));
    return { R, rows: acts.map(a => R[a.id]), T, order, succ, paths, crit: paths.filter(p => p.len === T) };
  }
  // the arrow (activity-on-arrow) network with the course's rules: one start node, one end node, activities with the same
  // predecessors leave the same node, dummies when an activity needs only part of a group and when two would share both nodes
  function network(acts, tm) {
    const key = s => s.slice().sort().join(',');
    const sets = {}; acts.forEach(a => { if (a.p.length) sets[key(a.p)] = a.p.slice().sort(); });
    const SK = Object.keys(sets), sub = (s, t) => s.length < t.length && s.every(x => t.includes(x));
    const cover = {}, unc = {};
    SK.forEach(t => { const ss = SK.filter(s => sub(sets[s], sets[t])); const mx = ss.filter(s => !ss.some(u => u !== s && sub(sets[s], sets[u]))); cover[t] = mx; const got = new Set(); mx.forEach(s => sets[s].forEach(x => got.add(x))); unc[t] = sets[t].filter(x => !got.has(x)); });
    const arcs = [], home = {}, start = {};
    acts.forEach(a => {
      const need = tm.succ[a.id].length ? SK.filter(t => unc[t].includes(a.id)).map(t => 'N:' + t) : ['E'];
      if (need.length === 1) home[a.id] = need[0]; else { home[a.id] = 'P:' + a.id; need.forEach(n => arcs.push({ t: 'P:' + a.id, h: n, dummy: true, d: 0 })); }
      start[a.id] = a.p.length ? 'N:' + key(a.p) : 'S';
    });
    const seen = {};
    acts.forEach(a => { const k = start[a.id] + '>' + home[a.id]; if (seen[k]) { arcs.push({ t: 'P:' + a.id, h: home[a.id], dummy: true, d: 0 }); home[a.id] = 'P:' + a.id; } else seen[k] = 1; });
    SK.forEach(t => cover[t].forEach(s => arcs.push({ t: 'N:' + s, h: 'N:' + t, dummy: true, d: 0 })));
    acts.forEach(a => arcs.unshift({ t: start[a.id], h: home[a.id], act: a.id, d: a.d }));
    // order activities first in the input order, dummies after
    const real = arcs.filter(x => !x.dummy), dum = arcs.filter(x => x.dummy);
    real.sort((x, y) => acts.findIndex(a => a.id === x.act) - acts.findIndex(a => a.id === y.act));
    const all = real.concat(dum), ids = [];
    const addN = n => { if (!ids.includes(n)) ids.push(n); };
    addN('S'); all.forEach(x => { addN(x.t); addN(x.h); }); ids.splice(ids.indexOf('E'), 1); ids.push('E');
    // node times: ES = max over arrows in, LF = min over arrows out
    const N = {}; ids.forEach(n => { N[n] = { id: n, inA: all.filter(x => x.h === n), outA: all.filter(x => x.t === n) }; });
    const lay = {}; const lv = n => lay[n] != null ? lay[n] : (lay[n] = N[n].inA.length ? Math.max(...N[n].inA.map(x => lv(x.t) + 1)) : 0);
    ids.forEach(lv); const LM = Math.max(...ids.map(n => lay[n])); lay.E = LM;
    const topo = ids.slice().sort((x, y) => lay[x] - lay[y]);
    topo.forEach(n => { const o = N[n]; o.L = lay[n]; o.es = o.inA.length ? Math.max(...o.inA.map(x => N[x.t].es + x.d)) : 0; });
    topo.slice().reverse().forEach(n => { const o = N[n]; o.lf = o.outA.length ? Math.min(...o.outA.map(x => N[x.h].lf - x.d)) : tm.T; });
    return { N, ids, arcs: all, LM };
  }
  // positions: layer L along the flow, R across it (barycentre ordering), unless the example fixes them
  function place(net, fix) {
    const { N, ids, arcs, LM } = net, layers = [];
    ids.forEach(n => { (layers[N[n].L] = layers[N[n].L] || []).push(n); });
    for (let l = 0; l <= LM; l++) layers[l] = layers[l] || [];
    const nR = Math.max(...layers.map(x => x.length)), pos = {};
    const setR = () => layers.forEach(ly => ly.forEach((n, i) => { pos[n] = i + (nR - ly.length) / 2; }));
    setR();
    const bary = (n, dir) => { const nb = arcs.filter(x => dir ? x.h === n : x.t === n).map(x => pos[dir ? x.t : x.h]); return nb.length ? nb.reduce((s, v) => s + v, 0) / nb.length : pos[n]; };
    for (let it = 0; it < 6; it++) { const dn = it % 2 === 0; const rng = dn ? layers.slice(1) : layers.slice(0, -1).reverse(); rng.forEach(ly => { const b = {}; ly.forEach(n => { b[n] = bary(n, dn); }); ly.sort((x, y) => b[x] - b[y]); }); setR(); }
    let nL = LM;
    if (fix) { Object.keys(fix).forEach(k => { if (N[k]) { N[k].L = fix[k][0]; pos[k] = fix[k][1]; } }); nL = Math.max(...ids.map(n => N[n].L)); }
    ids.forEach(n => { N[n].R = pos[n]; });
    const minR = Math.min(...ids.map(n => N[n].R)); ids.forEach(n => { N[n].R -= minR; });
    const sorted = ids.slice().sort((x, y) => N[x].L - N[y].L || N[x].R - N[y].R);
    sorted.forEach((n, i) => { N[n].num = i + 1; });
    return { N, ids: sorted, arcs, nL, nR: Math.max(...ids.map(n => N[n].R)) + 1, fixed: !!fix };
  }
  function build(acts, fix) { const tm = times(acts); if (tm.err) return tm; const net = place(network(acts, tm), fix); return Object.assign(tm, { net }); }

  /* ── the course's examples (exact inputs from the notes; Lec 9 = the doctor's slide example) ── */
  const EX = {
    y19: { t: '2019/20', u: 'months', ua: 'شهر', s: 'A 15; B 17 (A); C 21 (A); D 19 (B); E 22 (B); F 18 (C, D); G 15 (E, F)', fix: { S: [0, 1], 'N:A': [1, 1], 'N:B': [2, 0], 'N:C,D': [2.6, 2], 'N:E,F': [3.6, 1], E: [4.6, 1] } },
    sec: { t: 'Section', u: '', ua: '', s: 'A 5; B 7 (A); C 10 (A); D 2 (B); E 8 (C); F 10 (C); G 5 (D, E, F); H 3 (G)', fix: { S: [0, 1], 'N:A': [1, 1], 'N:B': [2, 0], 'N:C': [2, 2], 'P:F': [2.9, 2.2], 'N:D,E,F': [3.6, 1], 'N:G': [4.6, 1], E: [5.6, 1] } },
    y25: { t: '2024/25', u: 'days', ua: 'يوم', s: 'A 6; G 2; J 13; B 4 (A); C 7 (B); D 2 (A); E 4 (D); F 10 (E); H 10 (G); I 6 (J, H); K 9 (A); L 3 (C, K); M 5 (I, L)', fix: { S: [0, 1], 'N:A': [1, 0.6], 'N:G': [1.2, 2.4], 'N:D': [1.9, 0], 'N:B': [2.3, 1.3], 'N:H,J': [2.8, 2], 'N:E': [3, 0], 'N:C,K': [3.5, 1], 'N:I,L': [4.4, 1.5], E: [5.4, 1] } },
    y24c: { t: '2023/24 (3rd)', u: '', ua: '', s: 'A 3; B 3 (A); C 3 (A); D 5 (C); E 6 (B, C); F 9 (D, E); G 5 (E); H 3 (G); I 5 (G, F); J 6 (I, H); K 4 (J)', fix: { S: [0, 0.5], 'N:A': [1, 0.5], 'N:C': [2, 1], 'N:B,C': [2.6, 0], 'N:E': [3.6, 0], 'N:D,E': [4.3, 1], 'N:G': [4.6, 0], 'N:F,G': [5.6, 1], 'N:H,I': [6.6, 0.5], 'N:J': [7.6, 0.5], E: [8.6, 0.5] } },
    y24b: { t: '2023/24 (2nd)', u: '', ua: '', s: 'A 5; B 5; C 2 (B); D 2 (A, C); E 3 (A, C); F 1 (A, C); G 2 (B); H 7 (B); I 13 (E); J 6 (E, D); K 4 (F, G, H); L 5 (H); M 5 (J, K, L)', fix: { S: [0, 1], 'N:B': [1, 1.5], 'N:A,C': [2, 0], 'N:H': [2.5, 2], 'N:E': [2.7, 0], 'N:F,G,H': [3.6, 1.6], 'N:D,E': [4.2, 1], 'N:J,K,L': [5.2, 2], E: [6.2, 1] } },
    lec: { t: 'Lec 9 slides', u: 'months', ua: 'شهر', s: 'A 2; B 5; C 4; D 5 (B); E 7 (A); F 3 (A); G 3 (B); H 6 (C, D); I 2 (C, D); J 5 (E); K 4 (F, G, H); L 3 (F, G, H); M 12 (I); N 8 (J, K)', fix: { S: [0, 1.2], 'N:A': [1, 0], 'N:B': [1.5, 1], 'N:C,D': [2.2, 2], 'N:E': [2.6, 0], 'N:F,G,H': [3, 1], 'N:I': [3.4, 2.1], 'N:J,K': [4.1, 0.3], E: [5, 1.5] } }
  };
  const RUN = {}; const run = k => RUN[k] || (RUN[k] = build(A_(EX[k].s), EX[k].fix));
  const lab = a => a.dummy ? 'dummy' : `${a.act}(${a.d})`;
  const list = xs => xs.join(', ');
  const nm = (G, n) => G.N[n].num;

  /* ── width of the stage (the network turns vertical when it does not fit across) ── */
  function useW() {
    const ref = useRef(null), [w, setW] = useState(280);
    useEffect(() => { const el = ref.current; if (!el) return; const f = () => setW(el.clientWidth || 280); f();
      if (window.ResizeObserver) { const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect(); }
      window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
    return [ref, w];
  }

  /* ── the arrow network: nodes (number), box = ES, triangle = LF, arrows = activities, dashed = dummy ── */
  let SEQ = 0;
  function Net({ G, show, hi, alt, bad, crit, es, lf, ring, label, badges = true }) {
    const [ref, w] = useW(), uid = useRef('orv7-m' + (++SEQ)).current;
    const { N, ids, arcs, nL, nR } = G, H = nL * 100 + 72 <= w;
    let gA, gC, mA, mC;
    if (H) { gA = Math.min(130, (w - 72) / Math.max(nL, 1)); mA = 36; mC = badges ? 50 : 28; gC = 78; }
    else { gA = 92; mA = badges ? 36 : 26; mC = badges ? 56 : 34; gC = nR > 1 ? Math.max(62, Math.min(130, (w - 2 * mC) / (nR - 1))) : 0; }
    const stg = n => !H && badges && !G.fixed && nR > 1 ? (Math.round(N[n].R) % 2 ? .24 : -.24) * (N[n].L === 0 || N[n].L === nL ? 0 : 1) : 0;
    const P = n => { const o = N[n], a = mA + (o.L + stg(n)) * gA, c = mC + o.R * gC; return H ? [a, c] : [c, a]; };
    const Wv = Math.round(H ? 2 * mA + nL * gA : 2 * mC + (nR - 1) * gC), Hv = Math.round(H ? 2 * mC + (nR - 1) * gC : 2 * mA + nL * gA);
    const any = !!((hi && hi.size) || (alt && alt.size) || (bad && bad.size));
    const geo = arcs.map((a, i) => {
      const p = P(a.t), q = P(a.h), dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len, m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      let b = 0; const par = arcs.filter(x => x.t === a.t && x.h === a.h);
      if (par.length > 1) b = (par.indexOf(a) - (par.length - 1) / 2) * 80;
      else for (const n of ids) { if (n === a.t || n === a.h) continue; const c = P(n), t = Math.max(0, Math.min(1, ((c[0] - p[0]) * dx + (c[1] - p[1]) * dy) / (len * len))), d = Math.hypot(p[0] + t * dx - c[0], p[1] + t * dy - c[1]); if (d < 24) { const sd = (c[0] - m[0]) * nx + (c[1] - m[1]) * ny; b = sd > 0 ? -40 : 40; break; } }
      const C = [m[0] + nx * b, m[1] + ny * b], u = (f, g, r) => { const ex = g[0] - f[0], ey = g[1] - f[1], l = Math.hypot(ex, ey) || 1; return [f[0] + ex / l * r, f[1] + ey / l * r]; };
      const s = u(p, C, 15), e = u(q, C, 17), L0 = [.25 * p[0] + .5 * C[0] + .25 * q[0], .25 * p[1] + .5 * C[1] + .25 * q[1]];
      return { d: `M${s[0].toFixed(1)},${s[1].toFixed(1)} Q${C[0].toFixed(1)},${C[1].toFixed(1)} ${e[0].toFixed(1)},${e[1].toFixed(1)}`, L0, i };
    });
    const st = i => bad && bad.has(i) ? 'bad' : hi && hi.has(i) ? 'hi' : alt && alt.has(i) ? 'alt' : crit && crit.has(i) ? 'crit' : '';
    const col = { bad: 'var(--pen)', hi: 'var(--fig-s)', alt: 'var(--ok)', crit: 'var(--fig-k)', '': 'var(--graphite)' };
    const vis = i => !show || show.has(i), nodeVis = n => !show || arcs.some((a, i) => show.has(i) && (a.t === n || a.h === n));
    const op = i => !vis(i) ? 0 : any && !st(i) ? .35 : 1;
    const badge = (n) => { const [x, y] = P(n), o = N[n], e = es && es[n], f = lf && lf[n];
      const bx = H ? [x, y - 31] : [x - 35, y], tx = H ? [x, y + 30] : [x + 35, y];
      return html`<g key=${'b' + n}>
        <g className="orv7-bx" style=${{ opacity: e != null ? 1 : 0 }}><rect x=${bx[0] - 15} y=${bx[1] - 11} width="30" height="22" rx="2" fill="var(--paper)" stroke="var(--fig-k)" strokeWidth="1.8" /><text x=${bx[0]} y=${bx[1] + 4.5} textAnchor="middle" fontSize="13" fontWeight="600">${e != null ? e : ''}</text></g>
        <g className="orv7-bx" style=${{ opacity: f != null ? 1 : 0 }}><path d=${`M${tx[0]},${tx[1] - 15} L${tx[0] + 17},${tx[1] + 12} L${tx[0] - 17},${tx[1] + 12} Z`} fill="var(--paper)" stroke="var(--pen)" strokeWidth="1.8" strokeLinejoin="round" /><text x=${tx[0]} y=${tx[1] + 8.5} textAnchor="middle" fontSize="12.5" fontWeight="600">${f != null ? f : ''}</text></g></g>`; };
    return html`<div className="orv7-net" ref=${ref}><svg viewBox=${`0 0 ${Wv} ${Hv}`} width=${Wv} style=${{ width: Wv + 'px' }} role="img" aria-label=${label}>
      <defs>${Object.keys(col).map(k => html`<marker key=${k} id=${uid + k} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill=${col[k]} /></marker>`)}</defs>
      ${geo.map(g => { const a = arcs[g.i], s = st(g.i); return html`<path key=${'a' + g.i} className="orv7-a" d=${g.d} fill="none" stroke=${col[s]} strokeWidth=${s ? 3.2 : 1.8} strokeDasharray=${a.dummy ? '6 5' : null} markerEnd=${`url(#${uid + s})`} style=${{ opacity: op(g.i) }} />`; })}
      ${geo.map(g => { const a = arcs[g.i]; if (a.dummy) return null; const t = a.lbl != null ? a.lbl : lab(a), wd = t.length * 7.4 + 6, s = st(g.i);
        return html`<g key=${'l' + g.i} className="orv7-lb" style=${{ opacity: op(g.i) }}><rect x=${g.L0[0] - wd / 2} y=${g.L0[1] - 9} width=${wd} height="18" rx="4" fill="var(--paper-2)" /><text x=${g.L0[0]} y=${g.L0[1] + 4.5} textAnchor="middle" fontSize="12.5" fontWeight=${s ? 700 : 500}>${t}</text></g>`; })}
      ${ids.map(n => { const [x, y] = P(n); return html`<g key=${'n' + n} className="orv7-nd" style=${{ opacity: nodeVis(n) ? 1 : 0 }}>
        ${ring && ring.has(n) && html`<circle cx=${x} cy=${y} r="19" fill="none" stroke="var(--pen)" strokeWidth="2.5" />`}
        <circle cx=${x} cy=${y} r="14" fill="var(--fig-s)" /><text className="orv7-w" x=${x} y=${y + 4.6} textAnchor="middle" fontSize="13">${N[n].num}</text></g>`; })}
      ${badges && ids.map(badge)}
    </svg></div>`;
  }
  const Key = ({ dummy, crit }) => html`<div className="orv7-key"><span><i></i>ES (box)</span><span><i className="orv7-tri"></i>LF (triangle)</span>${crit && html`<span><i className="orv7-crl"></i>critical</span>`}${dummy && html`<span><i className="orv7-dsh"></i>dummy</span>`}</div>`;

  /* ── the activity table ── */
  function Tbl({ rows, cell, cur, ff, critOn }) {
    const cols = ['ES', 'EF', 'LS', 'LF', 'TF'].concat(ff ? ['FF'] : []);
    return html`<table className="orv7-tbl"><thead><tr><th>Act.</th><th>D</th>${cols.map(c => html`<th key=${c}>${c}</th>`)}</tr></thead><tbody>
      ${rows.map(r => html`<tr key=${r.id} className=${(cur && cur.has(r.id) ? 'orv7-cur ' : '') + (critOn && r.crit ? 'orv7-crit' : '')}><td>${r.id}</td><td>${r.d}</td>
        ${cols.map(c => { const v = cell ? cell(r, c) : r[c]; return html`<td key=${c} className=${(c === 'TF' && v === 0) ? 'orv7-z' : ''}>${v == null ? '' : v}</td>`; })}</tr>`)}</tbody></table>`;
  }
  const Modes = ({ list: l, mode, set }) => html`<div className="orv7-row" role="group">${l.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const arcIdx = (G, f) => new Set(G.arcs.map((a, i) => f(a) ? i : -1).filter(i => i >= 0));
  const actSet = (G, ids) => arcIdx(G, a => !a.dummy && ids.includes(a.act));
  const critArcs = r => { const G = r.net, on = new Set(r.rows.filter(x => x.crit).map(x => x.id)); return arcIdx(G, a => a.dummy ? G.N[a.t].es === G.N[a.t].lf && G.N[a.h].es === G.N[a.h].lf && G.N[a.h].es - G.N[a.t].es === 0 : on.has(a.act)); };
  const allT = r => { const es = {}, lf = {}; r.net.ids.forEach(n => { es[n] = r.net.N[n].es; lf[n] = r.net.N[n].lf; }); return { es, lf }; };

  /* ── [0] the terms on the section example's network ── */
  function Terms({ ar }) {
    const r = run('sec'), G = r.net, D = arcIdx(G, a => a.dummy);
    const T = [
      ['proj', 'Project', [], [], 'The whole network is the <b>project</b>: interrelated activities executed in a certain order before the entire task can be completed.', 'الـ network كلها هي الـ <b>project</b>: activities مرتبطة ببعض بتتنفذ بترتيب معين لحد ما الشغل كله يخلص.'],
      ['act', 'Activity', ['C'], [], 'An <b>activity</b> is a job, one arrow: C(10) needs time 10 and resources.', 'الـ <b>activity</b> شغلانة واحدة، وبتترسم سهم واحد زي الـ C اللي محتاجة وقت 10 و resources.'],
      ['pre', 'Predecessor', ['C'], ['E', 'F'], '<b>C is the predecessor</b> of E and F: it must be completed immediately prior to their start.', 'الـ C هي الـ <b>predecessor</b> بتاعة الـ E والـ F، يعني لازم تخلص قبلهم على طول.'],
      ['suc', 'Successor', ['G'], ['D', 'E', 'F'], '<b>G is a successor</b> of D, E and F: it cannot start until they are completed.', 'الـ G هي الـ <b>successor</b> بتاعة الـ D والـ E والـ F، ومتقدرش تبدأ غير لما يخلصوا.'],
      ['start', 'Start activity', ['A'], [], '<b>A is the start activity</b>: it has no predecessor, so it leaves the start node 1.', 'الـ A هي الـ <b>start activity</b> لأن مالهاش predecessor، فبتطلع من الـ start node رقم 1.'],
      ['dum', 'Dummy', [], [], 'The dashed arrow is a <b>dummy</b>: duration 0, no resources, it only shows that G also waits for F (E and F may not share both nodes).', 'السهم المتقطع ده <b>dummy</b> مدته صفر ومن غير resources، وبيوضح بس إن الـ G مستنية الـ F كمان (لأن الـ E والـ F مينفعش يشتركوا في الـ nodes الاتنين).'],
      ['path', 'Path', ['A', 'B', 'D', 'G', 'H'], [], 'A <b>path</b>: nodes and activities alternately from the start event to the end event, here A-B-D-G-H = 5 + 7 + 2 + 5 + 3 = 22.', 'الـ <b>path</b> سلسلة nodes و activities ورا بعض من الـ start event للـ end event، زي:' + L('A-B-D-G-H = 5 + 7 + 2 + 5 + 3 = 22')],
      ['crit', 'Critical path', ['A', 'C', 'F', 'G', 'H'], [], 'The <b>critical path</b> is the longest path, A-C-F-G-H = 33 = the <b>project completion time</b>. Its activities are <b>critical</b> (total float 0).', 'الـ <b>critical path</b> هو أطول path، وطوله هو الـ <b>project completion time</b>:' + L('A-C-F-G-H = 5 + 10 + 10 + 5 + 3 = 33') + 'والـ activities بتاعته <b>critical</b> والـ total float بتاعها صفر.'],
      ['tf', 'Total float', ['E'], [], '<b>Total float</b> of E = 2: E can finish 2 later without delaying the project (B and D have 11).', 'الـ <b>total float</b> بتاع الـ E قيمته 2، يعني ممكن تتأخر 2 من غير ما الـ project يتأخر (والـ B والـ D ليهم 11).']
    ];
    const [k, setK] = useState('proj'), c = T.find(x => x[0] === k);
    const hi = k === 'dum' ? D : actSet(G, c[2]), alt = actSet(G, c[3]);
    return html`<figure className="fig orv7"><div className="fig-stage">
      <${Modes} list=${T.map(x => [x[0], x[1]])} mode=${k} set=${setK} />
      <${Net} G=${G} hi=${hi} alt=${alt} badges=${false} label="The section example's network: A 5; B 7 (A); C 10 (A); D 2 (B); E 8 (C); F 10 (C); G 5 (D, E, F); H 3 (G)" />
      </div><${Cap} en=${c[4]} ar=${c[5]} showAr=${ar} /></figure>`;
  }

  /* ── [1] building the 2019/20 network activity by activity ── */
  function Build({ ar }) {
    const r = run('y19'), G = r.net;
    const S = [
      { a: ['A'], en: 'A has no predecessor: it leaves the single <b>start node 1</b> and ends at node 2.', ar: 'الـ A مالهاش predecessor، فبتطلع من الـ <b>start node</b> الوحيدة رقم 1 وبتخلص عند الـ node رقم 2.' },
      { a: ['B', 'C'], en: 'B and C both come after A: <b>same predecessors, same start node</b>, so both leave node 2.', ar: 'الـ B والـ C الاتنين بعد الـ A، يعني <b>نفس الـ predecessors فنفس الـ start node</b>، فالاتنين بيطلعوا من الـ node رقم 2.' },
      { a: ['D', 'E'], en: 'D and E both come after B: both leave B\'s end node 3.', ar: 'الـ D والـ E الاتنين بعد الـ B، فبيطلعوا من الـ node رقم 3 اللي الـ B بتخلص عندها.' },
      { a: ['F'], en: 'F needs C <b>and</b> D: C and D end at the same node 4, and F leaves it.', ar: 'الـ F محتاجة الـ C <b>والـ</b> D، فالاتنين بيخلصوا عند نفس الـ node رقم 4، والـ F بتطلع منها.' },
      { a: ['G'], en: 'G needs E and F: they meet at node 5. G is nobody\'s predecessor, so it enters the single <b>end node 6</b>. Done: 6 nodes, 7 activities, no dummy needed.', ar: 'الـ G محتاجة الـ E والـ F، فبيتقابلوا عند الـ node رقم 5. والـ G مش predecessor لحد، فبتدخل على الـ <b>end node</b> الوحيدة رقم 6. كده خلصنا: 6 nodes و 7 activities ومن غير dummy.' }
    ];
    const [i, ctl] = useSteps(S.length, 2400);
    const upto = [].concat(...S.slice(0, i + 1).map(s => s.a));
    return html`<figure className="fig orv7"><div className="fig-stage">
      <${Net} G=${G} show=${actSet(G, upto)} hi=${actSet(G, S[i].a)} badges=${false} label="Building the CPM network of A 15; B 17 (A); C 21 (A); D 19 (B); E 22 (B); F 18 (C, D); G 15 (E, F)" />
      </div><${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] the two dummy rules: wrong drawing vs right drawing ── */
  const mk = (nodes, arcs) => { const N = {}; nodes.forEach(([id, L0, R0, es, lf]) => { N[id] = { id, num: id, L: L0, R: R0, es, lf }; });
    return { N, ids: nodes.map(x => x[0]), arcs: arcs.map(([t, h, act, d]) => ({ t, h, act, d: d == null ? 0 : d, dummy: !act })), nL: Math.max(...nodes.map(x => x[1])), nR: Math.max(...nodes.map(x => x[2])) + 1 }; };
  const DUM = {
    par: { t: 'Same two nodes (1.3)',
      bad: mk([[2, 0, 0], [4, 1, 0], [6, 2, 0], [7, 3, 0]], [[2, 4, 'C', 10], [4, 6, 'E', 8], [4, 6, 'F', 10], [6, 7, 'G', 5]]),
      good: mk([[2, 0, 0], [4, 1, 0], [5, 1.9, 1], [6, 2.4, 0], [7, 3.4, 0]], [[2, 4, 'C', 10], [4, 6, 'E', 8], [4, 5, 'F', 10], [5, 6], [6, 7, 'G', 5]]),
      en: ['Section example: E 8 (C) and F 10 (C), and G needs both. Drawn straight, E and F would both run from node 4 to node 6: two activities with the <b>same start and end node</b>, so "activity 4-6" is ambiguous.', 'Fix: F ends at an <b>extra node 5</b>, and a <b>dummy</b> 5 → 6 (duration 0) carries the dependence on to G. Now every activity has its own pair of nodes.'],
      ar: ['في مثال السكشن الـ E والـ F الاتنين بعد الـ C، والـ G محتاجاهم الاتنين. لو رسمناهم على طول هيبقوا الاتنين من الـ node رقم 4 للـ node رقم 6، يعني اتنين activities ليهم <b>نفس الـ start node ونفس الـ end node</b>، ومش هنعرف مين فيهم الـ activity اللي بين 4 و 6.', 'الحل: الـ F تخلص عند <b>node زيادة</b> رقمها 5، وبعدين <b>dummy</b> مدته صفر يوصل الاعتماد للـ G:' + L('5 → 6 (dummy, 0)') + 'كده كل activity ليها زوج nodes خاص بيها.'] },
    part: { t: 'Part of a group (1.4)',
      bad: mk([[1, 0, 0], [2, 0, 1], [3, 1, 0.5], [4, 2, 0], [5, 2, 1]], [[1, 3, 'A', ''], [2, 3, 'C', ''], [3, 4, 'D', ''], [3, 5, 'F', '']]),
      good: mk([[1, 0, 0], [2, 0, 1], [3, 1, 0], [4, 1, 1], [5, 2, 0], [6, 2, 1]], [[1, 3, 'A', ''], [2, 4, 'C', ''], [4, 3], [3, 5, 'D', ''], [4, 6, 'F', '']]),
      en: ['D needs A and C, but F needs <b>only C</b>. If A and C end at one node and F leaves it, F would wrongly wait for A too.', 'Fix: C ends at its own node 4 and F leaves from there; a <b>dashed dummy</b> 4 → 3 tells D that C is done. D still waits for A and C, F only for C.'],
      ar: ['الـ D محتاجة الـ A والـ C، لكن الـ F محتاجة <b>الـ C بس</b>. لو الـ A والـ C خلصوا عند node واحدة والـ F طلعت منها، الـ F هتستنى الـ A كمان وده غلط.', 'الحل: الـ C تخلص عند node لوحدها رقمها 4 والـ F تطلع منها، و <b>dummy متقطع</b> بيقول للـ D إن الـ C خلصت:' + L('4 → 3 (dummy, 0)') + 'كده الـ D مستنية الـ A والـ C، والـ F مستنية الـ C بس.'] }
  };
  function Dummy({ ar }) {
    const [k, setK] = useState('par'), [fix, setFix] = useState(false), c = DUM[k];
    const G0 = fix ? c.good : c.bad, j = fix ? 1 : 0;
    const G = Object.assign({}, G0, { arcs: G0.arcs.map(a => Object.assign({}, a, { lbl: a.dummy ? '' : a.d === '' ? a.act : `${a.act}(${a.d})` })) });
    const mark = fix ? arcIdx(G, a => a.dummy) : arcIdx(G, a => k === 'par' ? a.act === 'E' || a.act === 'F' : a.act === 'F');
    return html`<figure className="fig orv7"><div className="fig-stage">
      <${Modes} list=${Object.keys(DUM).map(x => [x, DUM[x].t])} mode=${k} set=${x => { setK(x); setFix(false); }} />
      <${Modes} list=${[['n', '✕ Without dummy'], ['y', '✓ With dummy']]} mode=${fix ? 'y' : 'n'} set=${x => setFix(x === 'y')} />
      <${Net} key=${k + j} G=${G} hi=${fix ? mark : null} bad=${fix ? null : mark} badges=${false} label=${c.t} />
      <p className=${'orv7-verdict' + (fix ? '' : ' orv7-bad')}>${fix ? 'Correct network' : k === 'par' ? 'Wrong: E and F share both nodes' : 'Wrong: F would wait for A'}</p>
      </div><${Cap} en=${c.en[j]} ar=${c.ar[j]} showAr=${ar} /></figure>`;
  }

  /* ── [2] the time formulas on pieces of the 2019/20 network ── */
  const FR = {
    merge: mk([[3, 0, 0], [2, 0, 1], [4, 1, 0.5]], [[3, 4, 'D', 19], [2, 4, 'C', 21]]),
    burst: mk([[3, 0, 0.5], [5, 1, 0], [4, 1, 1]], [[3, 5, 'E', 22], [3, 4, 'D', 19]])
  };
  function Timeline({ ff }) {
    const X = t => 18 + t * 4.2, tick = [0, 15, 30, 36, 51];
    return html`<svg className="orv7-tl" viewBox="0 0 264 150" width="264" style=${{ width: "264px" }} role="img" aria-label=${ff ? 'Free float of C: from its EF 36 to the ES of F, 51' : 'Total float of C: earliest 15 to 36, latest 30 to 51'}>
      <text x=${X(0)} y="18" fontSize="13.5" className="orv7-mu">earliest</text>
      <rect x=${X(15)} y="24" width=${X(36) - X(15)} height="24" rx="4" fill="var(--fig-s)" /><text className="orv7-w" x=${(X(15) + X(36)) / 2} y="41" textAnchor="middle" fontSize="13.5">C (21)</text>
      ${!ff && html`<g><text x=${X(0)} y="68" fontSize="13.5" className="orv7-mu">latest</text>
        <rect x=${X(30)} y="74" width=${X(51) - X(30)} height="24" rx="4" fill="var(--paper)" stroke="var(--fig-s)" strokeWidth="2" strokeDasharray="5 4" /><text x=${(X(30) + X(51)) / 2} y="91" textAnchor="middle" fontSize="13.5">C (21)</text>
        <path d=${`M${X(15)},106 V112 H${X(30)} V106`} fill="none" stroke="var(--pen)" strokeWidth="2" /><text x=${(X(15) + X(30)) / 2} y="127" textAnchor="middle" fontSize="13.5" fontWeight="700">TF 15</text></g>`}
      ${ff && html`<g><path d=${`M${X(51)},14 V112`} stroke="var(--fig-k)" strokeWidth="2" /><text x=${X(51) - 4} y="70" textAnchor="end" fontSize="13.5">ES of F = 51</text>
        <path d=${`M${X(36)},56 V62 H${X(51)} V56`} fill="none" stroke="var(--pen)" strokeWidth="2" /><text x=${(X(36) + X(51)) / 2} y="92" textAnchor="middle" fontSize="13.5" fontWeight="700">FF 15</text></g>`}
      <path d=${`M${X(0)},134 H${X(56)}`} stroke="var(--graphite)" strokeWidth="1.5" />
      ${tick.map(t => html`<g key=${t}><path d=${`M${X(t)},130 V138`} stroke="var(--graphite)" strokeWidth="1.5" /><text x=${X(t)} y="149" textAnchor="middle" fontSize="13" className="orv7-mu">${t}</text></g>`)}
    </svg>`;
  }
  function Formulas({ ar }) {
    const S = [
      { en: 'Forward pass at a node with <b>two arrows in</b> (node 4): C gives 15 + 21 = 36, D gives 32 + 19 = 51. F can start only when both are done, so ES = <b>max</b> = 51.', ar: 'في الـ forward pass عند node داخل عليها <b>سهمين</b> (رقم 4) الـ F مش هتبدأ غير لما الاتنين يخلصوا، فبناخد الأكبر:' + L('C: 15 + 21 = 36 ; D: 32 + 19 = 51') + L('ES(F) = max(36, 51) = 51') },
      { en: 'Backward pass at a node with <b>two arrows out</b> (node 3): D must start by 51 − 19 = 32, E by 69 − 22 = 47. B must finish before the earlier one, so LF = <b>min</b> = 32.', ar: 'في الـ backward pass عند node طالع منها <b>سهمين</b> (رقم 3) الـ B لازم تخلص قبل أبدر واحد فيهم، فبناخد الأصغر:' + L('D: 51 − 19 = 32 ; E: 69 − 22 = 47') + L('LF(B) = min(32, 47) = 32') },
      { en: '<b>Total float</b> of C: it can run anywhere from its earliest (15 to 36) to its latest (30 to 51) without delaying the project. TF = LS − ES = 30 − 15 = 15 = LF − EF = 51 − 36.', ar: 'الـ <b>total float</b> بتاع الـ C: ممكن تتنفذ في أي وقت من الأبكر (من 15 لـ 36) للأخر (من 30 لـ 51) من غير ما الـ project يتأخر:' + L('TF = LS − ES = 30 − 15 = 15') + L('TF = LF − EF = 51 − 36 = 15') },
      { en: '<b>Free float</b> of C: how late it can finish without delaying the earliest start of its successor F (ES = 51). FF = min ES(successors) − EF = 51 − 36 = 15.', ar: 'الـ <b>free float</b> بتاع الـ C: قد إيه ممكن تتأخر من غير ما تأخر الـ ES بتاع الـ successor بتاعها F:' + L('FF = min ES(successors) − EF = 51 − 36 = 15') },
      { en: 'Node test: D is critical: box = triangle at node 3 (32, 32) and at node 4 (51, 51), and 51 − 32 = 19 = its duration. C is not: 51 − 15 = 36 ≠ 21.', ar: 'اختبار الـ nodes: الـ D critical لأن الـ box بيساوي الـ triangle عند الـ node رقم 3 (32) وعند رقم 4 (51)، والفرق بيساوي المدة:' + L('D: 51 − 32 = 19 = D ✓') + 'أما الـ C فمش critical:' + L('C: 51 − 15 = 36 ≠ 21 ✗') }
    ];
    const [i, ctl] = useSteps(S.length, 3600);
    let body;
    if (i === 0) body = html`<${Net} G=${FR.merge} es=${{ 3: 32, 2: 15, 4: 51 }} hi=${new Set([0, 1])} ring=${new Set([4])} label="Node 4 with C and D coming in" />`;
    else if (i === 1) body = html`<${Net} G=${FR.burst} lf=${{ 3: 32, 5: 69, 4: 51 }} hi=${new Set([0, 1])} ring=${new Set([3])} label="Node 3 with D and E going out" />`;
    else if (i < 4) body = html`<${Timeline} ff=${i === 3} />`;
    else body = html`<${Net} G=${FR.merge} es=${{ 3: 32, 2: 15, 4: 51 }} lf=${{ 3: 32, 2: 15, 4: 51 }} alt=${new Set([0])} bad=${new Set([1])} label="The node test for C and D" />`;
    return html`<figure className="fig orv7"><div className="fig-stage">${body}${i !== 2 && i !== 3 && html`<${Key} />`}</div>
      <${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── forward and backward pass, node by node, with the table filled in step ── */
  const UA = { months: 'بالشهور', days: 'بالأيام' };
  function passSteps(k) {
    const r = run(k), G = r.net, ord = G.ids, n = ord.length, ex = EX[k], u = ex.u ? ' ' + ex.u : '';
    const nd = G.arcs.filter(a => a.dummy).length, N = G.N, nm2 = a => a.dummy ? `dummy ${N[a.t].num}→${N[a.h].num}` : a.act;
    const cnt = m => m === 2 ? 'سهمين' : m + ' أسهم';
    const S = [{ en: `The network of the ${ex.t} example: ${n} nodes, ${r.rows.length} activities${nd ? ', ' + nd + ' dumm' + (nd > 1 ? 'ies' : 'y') : ''}. Forward pass: ES of every node from the start; backward pass: LF from the end.`, ar: `دي الـ network بتاعة المثال، فيها ${n} nodes و ${r.rows.length} activities${nd ? ' و ' + nd + ' dummy' : ''}. في الـ forward pass بنحسب الـ ES لكل node من البداية، وفي الـ backward pass بنحسب الـ LF من النهاية.`, f: 0, b: 0 }];
    ord.forEach((id, j) => {
      const o = N[id], inA = G.arcs.filter(a => a.h === id), ps = inA.map(a => `${nm2(a)}: ${N[a.t].es} + ${a.d} = ${N[a.t].es + a.d}`), endT = id === 'E' ? ` This is the project completion time <b>T = ${o.es}</b>${u}.` : '', endA = id === 'E' ? 'وده وقت انتهاء الـ project.' : '';
      let en, a;
      if (!inA.length) { en = 'Forward pass. Start node 1: <b>ES = 0</b>.'; a = 'الـ forward pass بيبدأ من الـ start node رقم 1، والـ ES بتاعها بصفر.'; }
      else if (inA.length === 1) { en = `Node ${o.num}: one arrow in, ${ps[0]} → <b>ES = ${o.es}</b>.` + endT; a = `الـ node رقم ${o.num} داخل عليها سهم واحد:` + L(`${ps[0]} → ES = ${o.es}`) + endA; }
      else { en = `Node ${o.num}: ${inA.length} arrows in, take the <b>largest</b>: ${ps.join('; ')} → <b>ES = max = ${o.es}</b>.` + endT; a = `الـ node رقم ${o.num} داخل عليها ${cnt(inA.length)} فبناخد الأكبر:` + L(ps.join(' ; ') + ` → ES = max = ${o.es}`) + endA; }
      S.push({ en, ar: a, f: j + 1, b: 0, cur: id, hi: arcIdx(G, x => x.h === id), rows: G.arcs.filter(x => x.t === id && !x.dummy).map(x => x.act) });
    });
    ord.slice().reverse().forEach((id, j) => {
      const o = N[id], out = G.arcs.filter(a => a.t === id), ps = out.map(a => `${nm2(a)}: ${N[a.h].lf} − ${a.d} = ${N[a.h].lf - a.d}`);
      let en, a;
      if (!out.length) { en = `Backward pass. End node ${o.num}: <b>LF = T = ${o.lf}</b>.`; a = `الـ backward pass بيبدأ من الـ end node رقم ${o.num}، والـ LF بتاعها هو الـ T:` + L(`LF = T = ${o.lf}`); }
      else if (out.length === 1) { en = `Node ${o.num}: one arrow out, ${ps[0]} → <b>LF = ${o.lf}</b>.`; a = `الـ node رقم ${o.num} طالع منها سهم واحد:` + L(`${ps[0]} → LF = ${o.lf}`); }
      else { en = `Node ${o.num}: ${out.length} arrows out, take the <b>smallest</b>: ${ps.join('; ')} → <b>LF = min = ${o.lf}</b>.`; a = `الـ node رقم ${o.num} طالع منها ${cnt(out.length)} فبناخد الأصغر:` + L(ps.join(' ; ') + ` → LF = min = ${o.lf}`); }
      S.push({ en, ar: a, f: n, b: j + 1, cur: id, hi: arcIdx(G, x => x.t === id), rows: G.arcs.filter(x => x.h === id && !x.dummy).map(x => x.act) });
    });
    const cr = r.rows.filter(x => x.crit).map(x => x.id), nc = r.rows.filter(x => !x.crit).map(x => `${x.id} ${x.TF}`), cps = r.crit.map(p => p.ids.join('-'));
    S.push({ en: `Total float TF = LS − ES. Critical activities (TF = 0): <b>${list(cr)}</b>. Critical path${cps.length > 1 ? 's (two)' : ''}: <b>${cps.join(' and ')}</b> = ${r.T}${u}, the project completion time. Non-critical, with their float: ${list(nc)}.`,
      ar: 'الـ total float بنحسبه كده:' + L('TF = LS − ES') + 'والـ critical activities هي اللي الـ TF بتاعها صفر:' + L(list(cr)) + (cps.length > 1 ? 'وفيه critical paths اتنين:' : 'والـ critical path هو:') + L(cps.map(p => `${p} = ${r.T}`).join(' ; ')) + `وده وقت انتهاء الـ project${ex.u ? ' ' + UA[ex.u] : ''}. والـ non-critical بالـ float بتاعها:` + L(list(nc)), f: n, b: n, fin: true });
    return { r, S };
  }
  function Pass({ ar, k }) {
    const { r, S } = passSteps(k), G = r.net, [i, ctl] = useSteps(S.length, 2600), s = S[i], N = G.N;
    const rank = id => N[id].num, n = G.ids.length;
    const es = {}, lf = {}; G.ids.forEach(id => { if (rank(id) <= s.f) es[id] = N[id].es; if (rank(id) > n - s.b) lf[id] = N[id].lf; });
    const tail = {}, head = {}; G.arcs.forEach(a => { if (!a.dummy) { tail[a.act] = a.t; head[a.act] = a.h; } });
    const cell = (row, c) => (c === 'ES' || c === 'EF') ? (es[tail[row.id]] != null ? row[c] : null) : (c === 'LS' || c === 'LF') ? (lf[head[row.id]] != null ? row[c] : null) : s.fin ? row[c] : null;
    return html`<figure className="fig orv7"><div className="fig-stage">
      <${Net} G=${G} es=${es} lf=${lf} ring=${s.cur ? new Set([s.cur]) : null} hi=${s.hi} crit=${s.fin ? critArcs(r) : null} label=${'CPM network of ' + EX[k].s} />
      <${Key} dummy=${G.arcs.some(a => a.dummy)} crit=${true} />
      <${Tbl} rows=${r.rows} cell=${cell} cur=${new Set(s.rows || [])} critOn=${!!s.fin} />
      </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }
  const PassY19 = ({ ar }) => html`<${Pass} ar=${ar} k="y19" />`;
  const PassSec = ({ ar }) => html`<${Pass} ar=${ar} k="sec" />`;
  const PassY25 = ({ ar }) => html`<${Pass} ar=${ar} k="y25" />`;
  const PassY24 = ({ ar }) => html`<${Pass} ar=${ar} k="y24c" />`;

  /* ── [4] the paths of the 2019/20 network (Lec_10 slide 2) ── */
  function Paths({ ar }) {
    const r = run('y19'), G = r.net, D = r.R;
    const PS = [['I', ['A', 'B', 'E', 'G']], ['II', ['A', 'B', 'D', 'F', 'G']], ['III', ['A', 'C', 'F', 'G']]];
    const sum = ids => ids.map(x => D[x].d).join(' + ') + ' = ' + ids.reduce((s, x) => s + D[x].d, 0);
    const S = PS.map(([n, ids]) => ({ en: `Path ${n}: ${ids.join('-')} = ${sum(ids)} months.`, ar: `الـ path رقم ${n}:` + L(`${ids.join('-')} = ${sum(ids)}`), p: ids }))
      .concat({ en: 'The <b>longest</b> path, A-B-D-F-G = 84 months, is the <b>critical path</b>: the project completion time is 84 months. Critical activities A, B, D, F, G; non-critical C and E (float 15 each).', ar: 'أطول path هو الـ <b>critical path</b>، ووقت انتهاء الـ project هو 84 شهر:' + L('A-B-D-F-G = 84') + 'والـ critical activities هي الـ A والـ B والـ D والـ F والـ G، والـ non-critical هي الـ C والـ E (الـ float لكل واحدة 15).', p: PS[1][1], fin: true });
    const [i, ctl] = useSteps(S.length, 2600), s = S[i];
    return html`<figure className="fig orv7"><div className="fig-stage">
      <${Net} G=${G} hi=${s.fin ? null : actSet(G, s.p)} crit=${s.fin ? actSet(G, s.p) : null} badges=${false} label="The three paths of the 2019/20 network" />
      <div className="orv7-paths">${PS.map(([n, ids], j) => html`<div key=${n} className=${(j === i || (s.fin && j === 1)) ? 'orv7-on' : ''} style=${{ opacity: j <= i ? 1 : .35 }}><span>${n}: ${ids.join('-')}</span><span>${j <= i ? ids.reduce((t, x) => t + D[x].d, 0) : ''}</span></div>`)}</div>
      </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [9] the CPM solver: any of the course's examples, or your own table ── */
  const toRows = s => A_(s).map(a => ({ id: a.id, d: String(a.d), p: a.p.join(', ') }));
  function Solver({ ar }) {
    const [mode, setMode] = useState('y24b'), [own, setOwn] = useState(() => toRows(EX.y19.s));
    let r, err = null;
    if (EX[mode]) r = run(mode);
    else {
      const acts = own.filter(x => x.id.trim()).map(x => ({ id: x.id.trim(), d: +x.d, p: x.p.split(/[\s,;]+/).filter(Boolean) }));
      const bad = acts.find(a => !(a.d >= 0) || x_bad(a.id));
      if (!acts.length) err = 'Add at least one activity.';
      else if (bad) err = `${bad.id}: the name must be letters/digits and the duration a number ≥ 0.`;
      else { r = build(acts); if (r.err) { err = r.err[0]; r = null; } }
    }
    const set = (j, f, v) => setOwn(o => o.map((x, i) => i === j ? Object.assign({}, x, { [f]: v }) : x));
    const next = () => { const used = own.map(x => x.id); for (const c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') if (!used.includes(c)) return c; return 'X' + own.length; };
    const editor = !EX[mode] && html`<div className="orv7-ed">
      <div className="orv7-l orv7-h"><span>Act.</span><span>D</span><span>Predecessors</span><span></span></div>
      ${own.map((x, j) => html`<div key=${j} className="orv7-l"><input value=${x.id} maxLength="3" onInput=${e => set(j, 'id', e.target.value)} aria-label=${'activity ' + (j + 1) + ' name'} />
        <input type="number" min="0" step="any" value=${x.d} onInput=${e => set(j, 'd', e.target.value)} aria-label=${'activity ' + (j + 1) + ' duration'} />
        <input value=${x.p} placeholder="none" onInput=${e => set(j, 'p', e.target.value)} aria-label=${'activity ' + (j + 1) + ' predecessors'} />
        <button className="fig-btn" onClick=${() => setOwn(o => o.filter((_, i) => i !== j))} aria-label="remove activity" disabled=${own.length < 2}>✕</button></div>`)}
      <div className="orv7-row" style=${{ justifyContent: 'flex-start' }}>${own.length < 16 && html`<button className="fig-btn" onClick=${() => setOwn(o => o.concat({ id: next(), d: '1', p: o.length ? o[o.length - 1].id : '' }))}>+ activity</button>`}</div></div>`;
    const ex = EX[mode], u = ex && ex.u ? ' ' + ex.u : '';
    let en, a, verdict;
    if (!r) { en = 'Fix the table: ' + err; a = 'فيه مشكلة في الجدول، صلّحها الأول.'; verdict = err; }
    else {
      const cr = r.rows.filter(x => x.crit).map(x => x.id), nc = r.rows.filter(x => !x.crit).map(x => `${x.id} ${x.TF}`), cps = r.crit.map(p => p.ids.join('-'));
      verdict = `T = ${r.T}${u} · critical: ${cps.join(' and ')}`;
      en = `Project completion time <b>T = ${r.T}</b>${u}. Critical activities (TF = 0): <b>${list(cr)}</b>${cps.length > 1 ? ' (' + cps.length + ' critical paths)' : ''}. Non-critical, with total float: ${nc.length ? list(nc) : 'none'}. FF = min ES(successors) − EF. ${EX[mode] ? '' : 'Edit names, durations or predecessors: the network, the dummies and the times are redrawn.'}`;
      a = 'وقت انتهاء الـ project هو:' + L(`T = ${r.T}`) + 'والـ critical activities اللي الـ TF بتاعها صفر:' + L(list(cr)) + (cps.length > 1 ? `وفيه ${cps.length} critical paths. ` : '') + (nc.length ? 'والـ non-critical بالـ total float بتاعها:' + L(list(nc)) : 'ومفيش non-critical activities. ') + 'والـ free float محسوب بـ:' + L('FF = min ES(successors) − EF') + (EX[mode] ? '' : 'غيّر الأسماء أو المدد أو الـ predecessors، والـ network والـ dummies والأوقات هتترسم من جديد.');
    }
    const T0 = r && allT(r);
    return html`<figure className="fig orv7"><div className="fig-stage">
      <${Modes} list=${Object.keys(EX).map(x => [x, EX[x].t]).concat([['own', 'Try your own']])} mode=${mode} set=${setMode} />
      ${editor}
      ${r && html`<${Net} key=${mode} G=${r.net} es=${T0.es} lf=${T0.lf} crit=${critArcs(r)} label=${'CPM network of the chosen project'} />
        <${Key} dummy=${r.net.arcs.some(x => x.dummy)} crit=${true} />`}
      <p className=${'orv7-verdict' + (r ? '' : ' orv7-bad')}>${verdict}</p>
      ${r && html`<${Tbl} rows=${r.rows} ff=${true} critOn=${true} />`}
      ${r && r.paths.length <= 12 && html`<div className="orv7-paths">${r.paths.map((p, j) => html`<div key=${j} className=${p.len === r.T ? 'orv7-on' : ''}><span>${p.ids.join('-')}</span><span>${p.len}</span></div>`)}</div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }
  const x_bad = id => !/^[A-Za-z0-9]{1,3}$/.test(id);

  window.FIGS = Object.assign(window.FIGS || {}, { 'or-cpm-terms': Terms, 'or-cpm-build': Build, 'or-cpm-dummy': Dummy, 'or-cpm-formulas': Formulas, 'or-cpm-pass-2019': PassY19, 'or-cpm-paths-2019': Paths, 'or-cpm-pass-section': PassSec, 'or-cpm-pass-2024-25': PassY25, 'or-cpm-pass-2023-24': PassY24, 'or-cpm-solver': Solver });
})();

// Head First final revision for Compiler Design (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course in one book, built around what the finals ask: the course map, the anatomy of the papers, every lecture
// in a few dense pages, and every written problem type of the past finals as an interactive worked problem with the paper's
// own numbers, then a fresh variant of ours. Every DFA, FIRST/FOLLOW set, table cell, parse move, derivation and printed
// output on these pages is computed by the solvers below from the paper's data; the solvers were run in node against the
// site's worked answers first. Facts come from the lecture notes and the final summary (final/compiler.js); our analogies,
// tricks, time plans and variants are labelled as ours. ‡ marks a slide or paper error the notes also flag.
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K; const { useState, useEffect, useMemo } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T, useSlot = H.K.useSlot;

  if (!document.getElementById('hf-css-compilerF')) {
    const s = document.createElement('style'); s.id = 'hf-css-compilerF';
    s.textContent = `
.hfb .hf-compilerF-star{ font:800 80px/0.8 var(--body); color:transparent; -webkit-text-stroke:2px var(--hf-line); }
.hfb .hf-compilerF-rate{ display:grid; gap:3px; }
.hfb .hf-compilerF-rate > div{ display:grid; grid-template-columns:28px minmax(0,1fr) auto; gap:6px; align-items:center; }
.hfb .hf-compilerF-rate b{ font:800 13px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-compilerF-rate span{ font:500 13px/1.1 var(--body); color:var(--ink); }
.hfb .hf-compilerF-rate .hf-compilerF-rb{ display:flex; gap:3px; }
.hfb .hf-compilerF-rb button{ font:700 12.5px/1 var(--body); min-width:46px; height:28px; padding:0 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-compilerF-rb button[aria-pressed="true"].r0{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-compilerF-rb button[aria-pressed="true"].r1{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-compilerF-rb button[aria-pressed="true"].r2{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
/* course map */
.hfb .hf-compilerF-map{ position:relative; display:grid; gap:4px; }
.hfb .hf-compilerF-map::before{ content:""; position:absolute; top:14px; bottom:14px; inset-inline-start:15px; width:4px; border-radius:2px; background:var(--hf-grey2); }
.hfb .hf-compilerF-dot{ position:absolute; inset-inline-start:12px; width:10px; height:10px; border-radius:50%; background:var(--hf-k); top:14px; animation:hf-compilerF-run 9s linear infinite; }
@keyframes hf-compilerF-run{ from{ top:14px; } to{ top:calc(100% - 24px); } }
.hfb .hf-compilerF-stop{ position:relative; display:grid; grid-template-columns:34px minmax(0,1fr); gap:7px; align-items:start; text-align:start; border:0; background:none; padding:2px 0; cursor:pointer; color:var(--ink); font:inherit; }
.hfb .hf-compilerF-stop > i{ display:grid; place-items:center; width:34px; height:34px; border-radius:50%; border:2.5px solid var(--hf-line); background:var(--paper); font:800 13px/1 var(--mono); font-style:normal; z-index:1; }
.hfb .hf-compilerF-stop[aria-pressed="true"] > i{ background:var(--hf-k); border-color:var(--hf-k); color:var(--paper); }
.hfb .hf-compilerF-stop b{ display:block; font:800 14px/1.15 var(--body); }
.hfb .hf-compilerF-stop small{ display:block; font:500 13px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-compilerF-zone{ display:inline-block; font:800 11px/1 var(--body); letter-spacing:.05em; text-transform:uppercase; color:var(--hf-k); margin-inline-end:5px; }
.hfb .hf-compilerF-link{ border-inline-start:3px solid var(--hf-k); padding:4px 9px; font-size:13.5px; line-height:1.32; background:var(--hf-grey); }
/* tables and grids */
.hfb .hf-compilerF-tb{ width:100%; border-collapse:collapse; table-layout:fixed; font:500 13px/1.25 var(--body); color:var(--ink); }
.hfb .hf-compilerF-tb th, .hfb .hf-compilerF-tb td{ border:1px solid var(--hf-line); padding:3px 4px; text-align:start; vertical-align:top; }
.hfb .hf-compilerF-tb th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-compilerF-tb td.m, .hfb .hf-compilerF-tb .m{ font-family:var(--mono); font-weight:600; }
.hfb .hf-compilerF-tb.c td, .hfb .hf-compilerF-tb.c th{ text-align:center; }
.hfb .hf-compilerF-bars{ display:grid; gap:4px; }
.hfb .hf-compilerF-bar{ display:grid; grid-template-columns:minmax(0,1fr) 64px 30px; gap:6px; align-items:center; font:600 13px/1.12 var(--body); color:var(--ink); }
.hfb .hf-compilerF-bar > span:first-child{ min-width:0; }
.hfb .hf-compilerF-bar > i{ display:block; height:12px; border-radius:3px; background:var(--hf-grey2); overflow:hidden; }
.hfb .hf-compilerF-bar > i > u{ display:block; height:100%; background:var(--hf-k); transform-origin:0 50%; animation:hf-compilerF-grow .9s cubic-bezier(.2,.7,.2,1) both; }
.hfb.hf-ar .hf-compilerF-bar > i > u{ transform-origin:100% 50%; }
@keyframes hf-compilerF-grow{ from{ transform:scaleX(0); } }
.hfb .hf-compilerF-bar > b{ font:800 13px/1 var(--mono); text-align:end; }
.hfb .hf-compilerF-card{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-compilerF-card h4{ margin:0 0 4px; font:800 14.5px/1.15 var(--body); color:var(--ink); }
.hfb .hf-compilerF-card p{ margin:0; font-size:13.5px; line-height:1.32; }
.hfb .hf-compilerF-card p + p{ margin-top:3px; }
.hfb .hf-compilerF-know{ display:grid; gap:5px; }
.hfb .hf-compilerF-know > div{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:7px; align-items:baseline; font-size:14px; line-height:1.32; }
.hfb .hf-compilerF-know > div > b:first-child{ font:800 11.5px/1.25 var(--body); letter-spacing:.04em; text-transform:uppercase; color:var(--paper); background:var(--hf-k); border-radius:4px; padding:3px 5px; white-space:nowrap; }
.hfb .hf-compilerF-lec{ display:flex; align-items:center; gap:9px; border-bottom:3px solid var(--hf-line); padding-bottom:5px; }
.hfb .hf-compilerF-lec > span{ font:800 40px/0.85 var(--body); color:transparent; -webkit-text-stroke:1.6px var(--hf-line); }
.hfb .hf-compilerF-lec .hf-h2{ font-size:19px; }
.hfb .hf-compilerF-pre{ font:600 13px/1.3 var(--mono); background:var(--hf-grey); border-inline-start:3px solid var(--hf-k); padding:5px 8px; margin:0; white-space:pre; color:var(--ink); overflow:hidden; direction:ltr; text-align:left; }
.hfb .hf-compilerF-two{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-compilerF-tabs{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-compilerF-tabs button{ font:700 12.5px/1.1 var(--body); min-height:30px; padding:3px 7px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-compilerF-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-compilerF-paper{ display:inline-block; font:800 11.5px/1 var(--body); letter-spacing:.05em; text-transform:uppercase; color:var(--paper); background:var(--hf-red); border-radius:4px; padding:4px 6px; }
.hfb .hf-compilerF-paper.ours{ background:var(--hf-hand); }
.hfb .hf-compilerF-method{ background:var(--hf-grey); border-radius:6px; padding:6px 9px; }
.hfb .hf-compilerF-method ol{ margin:0; padding:0; list-style:none; counter-reset:m; display:grid; gap:3px; }
.hfb .hf-compilerF-method li{ counter-increment:m; display:grid; grid-template-columns:20px minmax(0,1fr); gap:5px; font-size:13.5px; line-height:1.3; }
.hfb .hf-compilerF-method li::before{ content:counter(m); display:grid; place-items:center; width:19px; height:19px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 11.5px/1 var(--body); }
/* subset-construction builder (from chapter 3) */
.hfb .hf-compilerF-bld{ border:2px solid var(--hf-line); border-radius:8px; padding:7px; display:grid; gap:6px; }
.hfb .hf-compilerF-bld table{ border-collapse:collapse; width:100%; font:600 13.5px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-compilerF-bld th, .hfb .hf-compilerF-bld td{ border:1.5px solid var(--hf-line); padding:3px 4px; text-align:center; height:32px; }
.hfb .hf-compilerF-bld th{ background:var(--hf-grey); font:800 13.5px/1 var(--mono); }
.hfb .hf-compilerF-bld td.lab{ font-weight:800; white-space:nowrap; background:var(--hf-grey); text-align:left; width:86px; }
.hfb .hf-compilerF-bld td.wait{ color:var(--graphite); font-weight:500; }
.hfb .hf-compilerF-bld td.nw{ color:var(--hf-k); font-weight:800; }
.hfb .hf-compilerF-bld td.bad{ background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); }
.hfb .hf-compilerF-bld tr.cur td.lab{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-compilerF-chips{ display:inline-flex; gap:2px; }
.hfb .hf-compilerF-chips button{ min-width:24px; height:26px; padding:0 2px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:700 13px/1 var(--mono); cursor:pointer; }
.hfb .hf-compilerF-chips button[aria-pressed="true"]{ background:var(--hf-k); border-color:var(--hf-k); color:var(--paper); }
.hfb .hf-compilerF-msg{ font-size:13.5px; line-height:1.3; margin:0; }
.hfb .hf-compilerF-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-compilerF-row .hf-btn{ padding:7px 9px; }
.hfb .hf-compilerF-edges{ font:600 13px/1.35 var(--mono); color:var(--ink); direction:ltr; text-align:left; }
/* sets, table M, trace (from chapter 6) */
.hfb .hf-compilerF-spg{ display:grid; gap:3px; }
.hfb .hf-compilerF-spr{ display:grid; grid-template-columns:78px minmax(0,1fr) 13px; gap:4px; align-items:center; padding:2px 3px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-compilerF-spr.ok{ border-color:var(--ok); } .hfb .hf-compilerF-spr.no{ border-color:var(--hf-red); }
.hfb .hf-compilerF-spl{ font:700 13px/1.1 var(--mono); color:var(--ink); white-space:nowrap; }
.hfb .hf-compilerF-sc{ display:flex; flex-wrap:wrap; gap:2px; }
.hfb .hf-compilerF-sc button{ font:700 13px/1 var(--mono); min-width:24px; height:27px; padding:0 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-compilerF-sc button.on{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-compilerF-mk{ font:800 14px/1 var(--body); } .hfb .ok > .hf-compilerF-mk{ color:var(--ok); } .hfb .no > .hf-compilerF-mk{ color:var(--hf-red); }
.hfb .hf-compilerF-fix{ grid-column:1 / -1; font:600 13px/1.2 var(--mono); color:var(--hf-red); padding-left:82px; }
.hfb .hf-compilerF-tf table, .hfb .hf-compilerF-tr{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-compilerF-tf th, .hfb .hf-compilerF-tf td, .hfb .hf-compilerF-tr th, .hfb .hf-compilerF-tr td{ border:1px solid var(--hf-line); text-align:center; padding:2px 1px; white-space:nowrap; overflow:hidden; }
.hfb .hf-compilerF-tf thead th, .hfb .hf-compilerF-tr thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-compilerF-tf tbody th{ background:var(--hf-grey); color:var(--hf-k); font-weight:800; }
.hfb .hf-compilerF-tf td{ height:28px; padding:0; font-size:13px; }
.hfb .hf-compilerF-tf td button{ width:100%; height:28px; border:0; margin:0; padding:0; font:700 13px/1 var(--mono); color:var(--hf-hand); background:color-mix(in srgb, var(--hf-hand) 13%, var(--paper)); cursor:pointer; }
.hfb .hf-compilerF-tf td button.sel{ box-shadow:inset 0 0 0 2.5px var(--hf-hand); }
.hfb .hf-compilerF-tf td button.ok{ color:var(--ink); background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.hfb .hf-compilerF-tf td button.no{ color:var(--ink); background:color-mix(in srgb, var(--hf-red) 20%, var(--paper)); }
.hfb .hf-compilerF-cbar{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; min-height:34px; margin-top:6px; }
.hfb .hf-compilerF-cbar .q{ font:700 13.5px/1 var(--mono); color:var(--hf-hand); }
.hfb .hf-compilerF-cbar .hf-btn{ font-family:var(--mono); min-width:40px; padding:6px 8px; min-height:30px; }
.hfb .hf-compilerF-tr td{ text-align:left; padding-left:4px; }
.hfb .hf-compilerF-tr td.act{ color:var(--hf-k); }
.hfb .hf-compilerF-tr tr.cur td{ background:color-mix(in srgb, var(--hf-hand) 12%, var(--paper)); }
.hfb .hf-compilerF-tr td.qm{ color:var(--hf-hand); font-weight:800; }
.hfb .hf-compilerF-opts{ display:flex; flex-wrap:wrap; gap:4px; margin-top:6px; }
.hfb .hf-compilerF-opts .hf-btn{ font:600 13px/1 var(--mono); padding:5px 7px; min-height:30px; }
.hfb .hf-compilerF-shake{ animation:hf-compilerF-shake .35s; }
@keyframes hf-compilerF-shake{ 20%{ transform:translateX(-4px); } 50%{ transform:translateX(4px); } 80%{ transform:translateX(-2px); } }
/* leftmost-derivation game */
.hfb .hf-compilerF-lmd{ display:grid; grid-template-columns:1fr 1fr; gap:6px; direction:ltr; }
.hfb .hf-compilerF-lmd > div{ border:1.5px solid var(--faint); border-radius:7px; padding:4px 5px; min-height:60px; }
.hfb .hf-compilerF-lmd > div.on{ border-color:var(--hf-hand); box-shadow:0 0 0 1.5px var(--hf-hand); }
.hfb .hf-compilerF-lmd > div.done{ border-color:var(--ok); }
.hfb .hf-compilerF-lmd h5{ margin:0 0 2px; font:800 12.5px/1 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.05em; }
.hfb .hf-compilerF-lmd p{ margin:0; font:600 13px/1.4 var(--mono); color:var(--ink); white-space:nowrap; overflow:hidden; }
.hfb .hf-compilerF-lmd p u{ text-decoration:none; color:var(--hf-k); font-weight:800; }
/* fill-in cells: tap to cycle through the candidate values */
.hfb .hf-compilerF-fill{ display:grid; gap:4px; direction:ltr; }
.hfb .hf-compilerF-fr{ display:grid; grid-template-columns:74px minmax(0,1fr); gap:5px; align-items:center; }
.hfb .hf-compilerF-fr > span{ font:700 12.5px/1.15 var(--body); color:var(--graphite); }
.hfb.hf-ar .hf-compilerF-fr > span{ font-family:"IBM Plex Sans Arabic", var(--body); text-align:right; }
.hfb .hf-compilerF-fc{ display:flex; gap:3px; flex-wrap:wrap; }
.hfb .hf-compilerF-fc button{ display:grid; justify-items:center; gap:1px; min-width:42px; padding:2px 3px 3px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-compilerF-fc button small{ font:700 11px/1 var(--mono); color:var(--graphite); }
.hfb .hf-compilerF-fc button b{ font:800 16px/1.1 var(--mono); }
.hfb .hf-compilerF-fc button.q b{ color:var(--hf-hand); }
.hfb .hf-compilerF-fc button.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); }
.hfb .hf-compilerF-fc button.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
/* put-in-order */
.hfb .hf-compilerF-ord{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-compilerF-ord > div{ display:grid; gap:3px; align-content:start; }
.hfb .hf-compilerF-ord h5{ margin:0; font:800 12px/1.2 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.05em; }
.hfb.hf-ar .hf-compilerF-ord h5, .hfb.hf-ar .hf-compilerF-lmd h5{ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; }
.hfb .hf-compilerF-ord button{ text-align:start; font:600 13px/1.2 var(--body); padding:5px 6px; min-height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-compilerF-ord .slot{ font:600 13px/1.2 var(--body); padding:5px 6px; min-height:30px; border-radius:6px; border:1.5px dashed var(--faint); color:var(--ink); display:flex; gap:5px; align-items:center; }
.hfb .hf-compilerF-ord .slot i{ font:800 12px/1 var(--mono); font-style:normal; color:var(--hf-k); }
.hfb .hf-compilerF-ord .slot.ok{ border-style:solid; border-color:var(--ok); } .hfb .hf-compilerF-ord .slot.no{ border-style:solid; border-color:var(--hf-red); }
.hfb.hf-ar .hf-compilerF-stop b, .hfb.hf-ar .hf-compilerF-stop small, .hfb.hf-ar .hf-compilerF-link, .hfb.hf-ar .hf-compilerF-card, .hfb.hf-ar .hf-compilerF-know > div, .hfb.hf-ar .hf-compilerF-tb, .hfb.hf-ar .hf-compilerF-bar, .hfb.hf-ar .hf-compilerF-rate span, .hfb.hf-ar .hf-compilerF-rb button, .hfb.hf-ar .hf-compilerF-msg, .hfb.hf-ar .hf-compilerF-method li, .hfb.hf-ar .hf-compilerF-tabs button, .hfb.hf-ar .hf-compilerF-ord button, .hfb.hf-ar .hf-compilerF-ord .slot, .hfb.hf-ar .hf-compilerF-paper, .hfb.hf-ar .hf-compilerF-zone, .hfb.hf-ar .hf-compilerF-card h4{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hfb.hf-ar .hf-compilerF-know > div, .hfb.hf-ar .hf-compilerF-card p, .hfb.hf-ar .hf-compilerF-method li, .hfb.hf-ar .hf-compilerF-link{ font-size:13px; line-height:1.5; }
.hfb.hf-ar .hf-compilerF-stop small{ font-size:12.5px; line-height:1.4; }
.hfb.hf-ar .hf-compilerF-tb{ font-size:12.5px; line-height:1.4; }
.hfb.hf-ar .hf-compilerF-fix{ padding-left:82px; }
.hfb.hf-ar .hf-compilerF-msg bdi{ white-space:nowrap; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-compilerF-dot, .hfb .hf-compilerF-bar > i > u{ animation:none; } }
`;
    document.head.appendChild(s);
  }
  /* ── the solvers: every worked problem in this book is computed from the paper's data by these functions
        (the same code was run in node against the site's worked answers before it went in) ── */
  // subset construction (lecture 3's method): start from the ε-closure of the start state, one row per new set
  function dfa(M) {
    const srt = a => M.states.filter(q => a.includes(q));
    const nx = (q, x) => M.edges.filter(e => e[0] === q && e[1] === x).map(e => e[2]);
    const clo = a => { const r = a.slice(); for (let i = 0; i < r.length; i++) nx(r[i], 'ε').forEach(t => { if (!r.includes(t)) r.push(t); }); return srt(r); };
    const mv = (a, x) => clo([].concat(...a.map(q => nx(q, x))));
    const key = a => a.join(',');
    const start = clo([M.start]);
    const rows = [start], res = [], born = {};
    for (let i = 0; i < rows.length; i++) {
      const r = {};
      M.syms.forEach(x => { const t = mv(rows[i], x); r[x] = t; if (t.length && !rows.some(z => key(z) === key(t))) { rows.push(t); born[i + ':' + x] = true; } });
      res.push(r);
    }
    const nondet = M.states.filter(q => M.syms.some(x => nx(q, x).length > 1) || nx(q, 'ε').length);
    return { start, rows, res, born, eps: M.edges.some(e => e[1] === 'ε'), key, fin: a => a.some(q => M.fin.includes(q)), clo, nondet };
  }
  // LL(1) (lecture 6): FIRST, FOLLOW, table M and the stack/input trace. G = { order:[...], start, P:{ A:[[...rhs], ...] } }, ε = []
  function ll1(G) {
    const NT = G.order, isN = s => NT.includes(s), E = 'ε';
    const FI = {}; NT.forEach(A => { FI[A] = new Set(); });
    const firstSeq = seq => { const r = new Set(); for (const s of seq) { if (!isN(s)) { r.add(s); return r; } FI[s].forEach(x => { if (x !== E) r.add(x); }); if (!FI[s].has(E)) return r; } r.add(E); return r; };
    let ch = true;
    while (ch) { ch = false; NT.forEach(A => G.P[A].forEach(rhs => firstSeq(rhs).forEach(x => { if (!FI[A].has(x)) { FI[A].add(x); ch = true; } }))); }
    const FO = {}; NT.forEach(A => { FO[A] = new Set(); }); FO[G.start].add('$');
    ch = true;
    while (ch) { ch = false; NT.forEach(A => G.P[A].forEach(rhs => rhs.forEach((B, k) => { if (!isN(B)) return; const f = firstSeq(rhs.slice(k + 1));
      f.forEach(x => { if (x !== E && !FO[B].has(x)) { FO[B].add(x); ch = true; } }); if (f.has(E)) FO[A].forEach(x => { if (!FO[B].has(x)) { FO[B].add(x); ch = true; } }); }))); }
    const pr = (A, rhs) => A + ' → ' + (rhs.length ? rhs.join('') : 'ε');
    const M = {}; NT.forEach(A => { M[A] = {}; });
    const put = (A, a, rhs) => { (M[A][a] = M[A][a] || []).push(pr(A, rhs)); };
    NT.forEach(A => G.P[A].forEach(rhs => { const f = firstSeq(rhs); f.forEach(a => { if (a !== E) put(A, a, rhs); }); if (f.has(E)) FO[A].forEach(b => put(A, b, rhs)); }));
    const conflict = NT.some(A => Object.values(M[A]).some(c => c.length > 1));
    const parse = w => {   // w: array of terminals
      const st = ['$', G.start], inp = w.concat('$'), rows = []; let ip = 0;
      for (let g = 0; g < 200; g++) {
        const top = st[st.length - 1], a = inp[ip], row = [st.slice().reverse().join(''), inp.slice(ip).join('')];
        if (top === '$' && a === '$') { rows.push(row.concat('accept')); break; }
        if (!isN(top)) { if (top === a) { rows.push(row.concat('match ' + a)); st.pop(); ip++; continue; } rows.push(row.concat('error')); break; }
        const c = M[top][a]; if (!c) { rows.push(row.concat('error')); break; }
        rows.push(row.concat(c[0])); st.pop();
        const rhs = G.P[top].find(r => pr(top, r) === c[0]); for (let k = rhs.length - 1; k >= 0; k--) st.push(rhs[k]);
      }
      return rows;
    };
    const sorted = (set, ord) => ord.filter(x => set.has(x));
    return { FI, FO, M, conflict, parse, pr, sorted };
  }
  // all leftmost derivations of a terminal string w (array of terminals), pruned by the terminal prefix; nullable symbols cost nothing
  function lmds(G, w, cap) {
    const isN = s => G.order.includes(s), out = [], nul = new Set();
    let ch = true; while (ch) { ch = false; G.order.forEach(A => { if (!nul.has(A) && G.P[A].some(r => r.every(s => nul.has(s)))) { nul.add(A); ch = true; } }); }
    const go = (form, steps) => {
      if (out.length >= (cap || 50)) return;
      let k = 0; while (k < form.length && !isN(form[k])) { if (form[k] !== w[k]) return; k++; }
      if (form.filter(s => !nul.has(s)).length > w.length) return;
      if (k === form.length) { if (form.length === w.length) out.push(steps); return; }
      if (k > w.length) return;
      G.P[form[k]].forEach((rhs, j) => go(form.slice(0, k).concat(rhs, form.slice(k + 1)), steps.concat([[form[k], j, form.slice(0, k).concat(rhs, form.slice(k + 1))]])));
    };
    go([G.start], []);
    return out;
  }
  // parameter passing (lecture 9): main prints i and the array, calls f(i, a[i]); f does j := j + dj, x := x + dx, a[z] := 0 and prints j, x, a.
  // mode: value | result | vr (value-result) | ref; the copy-back goes to the address fixed at the call (the course's rule)
  function pass(mode, P) {
    const a = P.a.slice(); let i = P.i; const idx = P.i - P.base;
    let j, x;
    if (mode === 'value' || mode === 'vr') { j = i; x = a[idx]; } else if (mode === 'result') { j = 0; x = 0; }
    const get = w => mode === 'ref' ? (w === 'j' ? i : a[idx]) : (w === 'j' ? j : x);
    const set = (w, v) => { if (mode === 'ref') { if (w === 'j') i = v; else a[idx] = v; } else if (w === 'j') j = v; else x = v; };
    const before = [i].concat(a);
    set('j', P.fj(get('j'))); set('x', P.fx(get('x'))); a[P.z - P.base] = 0;
    const inside = [get('j'), get('x')].concat(a);
    if (mode === 'result' || mode === 'vr') { i = j; a[idx] = x; }
    return { before, inside, after: [i].concat(a) };
  }
  const setL = a => a.length ? '{' + a.join(',') + '}' : '∅';
  const LECS = [1, 2, 3, 4, 6, 7, 8, 9];

  // How ready am I? one row per lecture, kept with the book's answers
  function Rate({ names }) {
    const ar = useAr();
    const [v, setV] = useSlot('ready', {});
    const lab = ar ? ['مهزوز', 'تمام', 'جامد'] : ['shaky', 'OK', 'solid'];
    const shaky = LECS.filter(n => v[n] === 0);
    return html`<div className="hf-in"><div className="hf-compilerF-rate">${LECS.map((n, i) => html`<div key=${n}><b dir="ltr">L${n}</b><span>${names[i]}</span>
      <span className="hf-compilerF-rb">${lab.map((l, k) => html`<button key=${k} className=${'r' + k} aria-pressed=${String(v[n] === k)} onClick=${() => setV(Object.assign({}, v, { [n]: k }))}>${l}</button>`)}</span></div>`)}</div>
      ${shaky.length ? html`<p className="hf-hand red" style=${{ marginTop: '5px' }}>${ar ? 'ابدأ بالمحاضرات المهزوزة: ' : 'Start with your shaky ones: '}<bdi dir="ltr">${shaky.map(n => 'L' + n).join(', ')}</bdi></p>` : null}</div>`;
  }

  // the course map: one stop per lecture, a token rides down the line (it is the source program travelling through the compiler)
  function CourseMap({ stops, links }) {
    const [on, setOn] = useSlot('map', 0);
    return html`<div className="hf-in"><div className="hf-compilerF-map">${calm() ? null : html`<span className="hf-compilerF-dot" aria-hidden="true"></span>`}
      ${stops.map((s, i) => html`<button key=${i} className="hf-compilerF-stop" aria-pressed=${String(on === i)} onClick=${() => setOn(i)}><i dir="ltr">L${s[0]}</i>
        <span><b><span className="hf-compilerF-zone">${s[1]}</span>${s[2]}</b><small>${T(s[3])}</small></span></button>`)}</div>
      <p className="hf-compilerF-link" style=${{ marginTop: '6px' }}>${T(links[on])}</p></div>`;
  }

  // small bar chart: [label, count, out of]
  function Bars({ rows }) {
    return html`<div className="hf-compilerF-bars hf-in">${rows.map(([l, n, of], i) => html`<div key=${i} className="hf-compilerF-bar"><span>${T(l)}</span>
      <i><u style=${{ width: (100 * n / of) + '%', animationDelay: calm() ? '0s' : (0.1 + i * 0.08) + 's' }}></u></i><b dir="ltr">${n}/${of}</b></div>`)}</div>`;
  }

  // a static table of cells (strings or html)
  function Tb({ head, rows, c, mono }) {
    return html`<table className=${'hf-compilerF-tb hf-in' + (c ? ' c' : '')} dir=${mono ? 'ltr' : null}><thead><tr>${head.map((h, i) => html`<th key=${i}>${T(h)}</th>`)}</tr></thead>
      <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((x, j) => html`<td key=${j} className=${mono ? 'm' : ''}>${T(String(x))}</td>`)}</tr>`)}</tbody></table>`;
  }

  // a lecture's header strip
  const Lec = ({ n, title }) => html`<div className="hf-compilerF-lec hf-in"><span dir="ltr">${n}</span><h3 className="hf-h2">${title}</h3></div>`;
  // "you must know" rows: [tag, html]
  const Know = ({ rows }) => html`<div className="hf-compilerF-know hf-in">${rows.map(([k, v], i) => html`<div key=${i}><b>${k}</b><span>${T(v)}</span></div>`)}</div>`;
  // a label with no Arabic letters (paper names like "2024/25 (50) Q2-e") keeps its left-to-right order in the Arabic book
  const latinDir = x => /[\u0600-\u06FF]/.test([].concat(x).join('')) ? undefined : 'ltr';
  const Paper = ({ children, ours }) => html`<span dir=${latinDir(children)} className=${'hf-compilerF-paper' + (ours ? ' ours' : '')}>${children}</span>`;
  const Method = ({ steps }) => html`<div className="hf-compilerF-method hf-in"><ol>${steps.map((s, i) => html`<li key=${i}><span>${T(s)}</span></li>`)}</ol></div>`;
  const Pre = ({ lines }) => html`<div className="hf-compilerF-pre hf-in">${lines.join("\n")}</div>`;
  // tabs that switch the problem shown under them: body(k) renders tab k
  function Switch({ id, tabs, body }) {
    const [k, setK] = useSlot(id, 0);
    return html`<${React.Fragment}><div className="hf-compilerF-tabs hf-in" role="group">${tabs.map((x, i) => html`<button key=${i} dir=${latinDir(x)} aria-pressed=${String(k === i)} onClick=${() => setK(i)}>${x}</button>`)}</div>${body(k)}</${React.Fragment}>`;
  }

  // Be the subset construction (chapter 3's Builder, fed any NFA): one DFA row at a time; each new set gets its own row
  function Builder({ id, M }) {
    const ar = useAr();
    const S = useMemo(() => dfa(M), [M]);
    const init = { e: S.eps ? 0 : 1, k: 0, p: {}, c: [] };
    const [st, setSt] = useSlot(id, init);
    const [bad, setBad] = useState(null);
    const k = st.k, done = k >= S.rows.length;
    const has = (a, q) => (a || []).includes(q);
    const tog = (arr, q) => M.states.filter(z => z === q ? !has(arr, z) : has(arr, z));
    let found = 1; for (let i = 0; i < k && i < S.rows.length; i++) M.syms.forEach(x => { if (S.born[i + ':' + x]) found++; });
    const chips = (arr, on) => html`<span className="hf-compilerF-chips">${M.states.map(q => html`<button key=${q} aria-pressed=${String(has(arr, q))} aria-label=${'state ' + q} onClick=${() => on(tog(arr, q))}>${q}</button>`)}</span>`;
    const same = (a, b) => S.key(M.states.filter(q => has(a, q))) === S.key(b);
    const checkRow = () => { const wrong = M.syms.filter(x => !same(st.p[x], S.res[k][x])); if (wrong.length) setBad(wrong); else { setBad(null); setSt(Object.assign({}, st, { k: k + 1, p: {} })); } };
    const showRow = () => { setBad(null); setSt(Object.assign({}, st, { e: 1, k: Math.min(S.rows.length, (st.e ? k : 0) + 1), p: {} })); };
    const showAll = () => { setBad(null); setSt({ e: 1, k: S.rows.length, p: {}, c: S.start }); };
    const reset = () => { setBad(null); setSt(init); };
    const finals = S.rows.filter(S.fin);
    return html`<div className="hf-compilerF-bld hf-in">
      ${S.eps && html`<div className="hf-compilerF-row" dir="ltr" style=${{ font: '700 14px/1 var(--mono)' }}><span>ε-closure(${M.start}) =</span>${st.e ? html`<b style=${{ color: 'var(--hf-k)' }}>${setL(S.start)}</b>` : chips(st.c, c => setSt(Object.assign({}, st, { c })))}</div>`}
      ${!st.e ? html`<div className="hf-compilerF-row">
          <button className="hf-btn" style=${{ order: 3 }} onClick=${showAll}>${ar ? 'اعرض الكل' : 'Show all'}</button>
          <button className="hf-btn solid" onClick=${() => { if (same(st.c, S.start)) { setBad(null); setSt(Object.assign({}, st, { e: 1 })); } else setBad(['e']); }}>${ar ? 'صحّح الـ closure' : 'Check the closure'}</button>
          <button className="hf-btn" onClick=${() => { setBad(null); setSt(Object.assign({}, st, { e: 1, c: S.start })); }}>${ar ? 'اعرض الـ closure' : 'Show the closure'}</button></div>
        ${bad && html`<p className="hf-hand red">${ar ? 'الـ closure فيها الـ state نفسها وكل state توصلها بالـ ε من غير ما تقرا input.' : 'The closure holds the state itself plus every state its ε edges reach.'}</p>`}` : html`
      <table dir="ltr"><thead><tr><th>DFA</th>${M.syms.map(x => html`<th key=${x}>${x}</th>`)}</tr></thead><tbody>
        ${S.rows.slice(0, Math.max(found, done ? S.rows.length : 0)).map((r, i) => {
          const cur = i === k && !done, mk = (i === 0 ? '→' : '') + (done && S.fin(r) ? '*' : '');
          return html`<tr key=${i} className=${cur ? 'cur' : ''}><td className="lab">${mk ? mk + ' ' : ''}${setL(r)}</td>
            ${M.syms.map(x => i < k ? html`<td key=${x} className=${S.born[i + ':' + x] ? 'nw' : ''}>${setL(S.res[i][x])}</td>`
              : cur ? html`<td key=${x} className=${bad && bad.includes(x) ? 'bad' : ''}>${chips(st.p[x], v => { setBad(null); setSt(Object.assign({}, st, { p: Object.assign({}, st.p, { [x]: v }) })); })}</td>`
              : html`<td key=${x} className="wait">…</td>`)}</tr>`; })}
      </tbody></table>
      ${done ? html`<p className="hf-compilerF-msg">${T(ar ? `<b>خلصت!</b> <bdi dir="ltr">${S.rows.length}</bdi> DFA states، والـ final منهم <bdi dir="ltr">${finals.map(setL).join(' ')}</bdi>: كل set فيها <bdi dir="ltr">${M.fin.join(',')}</bdi>. الملوّن set جديدة فبقالها row.`
          : `<b>Done!</b> ${S.rows.length} DFA states; final: ${finals.map(setL).join(' ')} (every set containing ${M.fin.join(',')}). Coloured = a new set, so it got its own row.`)}</p>`
        : bad ? html`<p className="hf-hand red">${ar ? (S.eps ? 'خد الـ union لـ moves كل state في الـ set، وبعدين الـ ε-closure.' : 'خد الـ union لـ moves كل state في الـ set.') : S.eps ? "Union of every member's moves, then the ε-closure." : "Take the union of every member's moves."}</p>`
        : html`<p className="hf-compilerF-msg">${T(ar ? `املا صف <bdi dir="ltr">${setL(S.rows[k])}</bdi>: دوس على الـ states اللي بيوصلها، ولو مفيش يبقى <bdi dir="ltr">∅</bdi>.` : `Fill the row for ${setL(S.rows[k])}: tap the states it reaches (none = ∅).`)}</p>`}
      <div className="hf-compilerF-row">
        ${!done && html`<button className="hf-btn solid" onClick=${checkRow}>${ar ? 'صحّح الصف' : 'Check the row'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${showRow}>${ar ? 'اعرض الصف' : 'Show the row'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${showAll}>${ar ? 'اعرض الكل' : 'Show all'}</button>`}
        ${(done || k > 0) && html`<button className="hf-btn" onClick=${reset}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div>`}
    </div>`;
  }
  // an NFA as its list of edges
  const Edges = ({ M }) => html`<p className="hf-compilerF-edges hf-in">start ${M.start}, final ${M.fin.join(',')}: ${M.edges.map(e => e[0] + ' –' + e[1] + '→ ' + e[2]).join(';  ')}</p>`;

  // tap the members of each FIRST/FOLLOW set, then check; rows: [label, 'FI' | 'FO', non-terminal]
  function SetPick({ id, G, rows, syms }) {
    const ar = useAr();
    const R = useMemo(() => ll1(G), [G]);
    const ans = rows.map(r => R.sorted(r[1] === 'FI' ? R.FI[r[2]] : R.FO[r[2]], syms));
    const [pick, setPick] = useSlot(id, {});
    const [checked, setChecked] = useSlot(id + ':c', false);
    const has = (i, s) => (pick[i] || []).includes(s);
    const tog = (i, s) => { const cur = pick[i] || []; setChecked(false); setPick(Object.assign({}, pick, { [i]: cur.includes(s) ? cur.filter(x => x !== s) : cur.concat(s) })); };
    const same = i => { const a = pick[i] || [], b = ans[i]; return a.length === b.length && b.every(x => a.includes(x)); };
    const right = rows.filter((_, i) => same(i)).length;
    return html`<div className="hf-in">
      <div className="hf-compilerF-spg" dir="ltr">${rows.map((r, i) => html`<div key=${i} className=${'hf-compilerF-spr' + (checked ? (same(i) ? ' ok' : ' no') : '')}>
        <span className="hf-compilerF-spl">${r[0]}</span>
        <span className="hf-compilerF-sc">${syms.map(s => html`<button key=${s} className=${has(i, s) ? 'on' : ''} aria-pressed=${String(has(i, s))} aria-label=${r[0] + ' contains ' + s} onClick=${() => tog(i, s)}>${s}</button>`)}</span>
        <span className="hf-compilerF-mk">${checked ? (same(i) ? '✓' : '✗') : ''}</span>
        ${checked && !same(i) ? html`<span className="hf-compilerF-fix">= {${ans[i].join(', ')}}</span>` : null}</div>`)}</div>
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح المجموعات' : 'Check my sets'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; rows.forEach((r, i) => { p[i] = ans[i].slice(); }); setPick(p); setChecked(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  // fill the ? cells of table M (cells hold the right side; — = empty = error); every cell is computed by ll1()
  function TableFill({ id, G, ts, blanks }) {
    const ar = useAr();
    const R = useMemo(() => ll1(G), [G]);
    const rhs = p => p.split(' → ')[1];
    const cell = (N, t) => R.M[N][t] ? R.M[N][t].map(rhs).join(' | ') : '';
    const opts = N => G.P[N].map(r => r.length ? r.join('') : 'ε').concat('—');
    const [pick, setPick] = useSlot(id, {});
    const [checked, setChecked] = useSlot(id + ':c', false);
    const [sel, setSel] = useState(null);
    const key = (N, t) => N + '|' + t;
    const isBlank = (N, t) => blanks.some(([a, b]) => a === N && b === t);
    const ans = (N, t) => cell(N, t) || '—';
    const right = blanks.filter(([N, t]) => pick[key(N, t)] === ans(N, t)).length;
    const [selN, selT] = sel ? sel.split('|') : [];
    return html`<div className="hf-compilerF-tf hf-in" dir="ltr">
      <table><thead><tr><th style=${{ width: '34px' }}>M</th>${ts.map(t => html`<th key=${t}>${t}</th>`)}</tr></thead>
        <tbody>${G.order.map(N => html`<tr key=${N}><th>${N}</th>${ts.map(t => {
          if (!isBlank(N, t)) return html`<td key=${t}>${cell(N, t)}</td>`;
          const k = key(N, t), v = pick[k], st = checked && v != null ? (v === ans(N, t) ? ' ok' : ' no') : '';
          return html`<td key=${t}><button className=${(sel === k ? 'sel' : '') + st} aria-label=${'M[' + N + ', ' + t + ']'} onClick=${() => setSel(sel === k ? null : k)}>${v || '?'}</button></td>`;
        })}</tr>`)}</tbody></table>
      <div className="hf-compilerF-cbar">${sel ? html`<span className="q">M[${selN}, ${selT}] =</span>${opts(selN).map(o => html`<button key=${o} className="hf-btn" onClick=${() => { setPick(Object.assign({}, pick, { [sel]: o })); setChecked(false); setSel(null); }}>${o}</button>`)}`
        : html`<span className="hf-hand" dir=${ar ? 'rtl' : null}>${ar ? 'دوس على خانة فيها ؟ واختار الـ right side بتاعها' : 'tap a ? cell, then pick its right side'}</span>`}</div>
      <div className="hf-row" style=${{ marginTop: '3px' }} dir=${ar ? 'rtl' : null}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => { setChecked(true); setSel(null); }}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; blanks.forEach(([N, t]) => { p[key(N, t)] = ans(N, t); }); setPick(p); setChecked(true); setSel(null); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${blanks.length}</bdi></span>`}
      </div></div>`;
  }

  // Be the parser: choose every action of the stack/input trace; the last rows stay in view
  function BeParser({ id, G, w, view = 8 }) {
    const ar = useAr();
    const R = useMemo(() => ll1(G), [G]);
    const rows = useMemo(() => R.parse(w), [R]);
    const opts = useMemo(() => [].concat(...G.order.map(A => G.P[A].map(r => R.pr(A, r)))).concat('match', 'accept'), [R]);
    const [done, setDone] = useSlot(id, 0);
    const [miss, setMiss] = useState(null);
    const n = rows.length, cur = done < n ? rows[done] : null;
    const want = r => r[2].startsWith('match') ? 'match' : r[2];
    const tap = o => {
      if (!cur) return;
      if (o === want(cur)) { setMiss(null); setDone(done + 1); return; }
      const top = G.order.slice().sort((a, b) => b.length - a.length).find(A => cur[0].startsWith(A)) || cur[0][0], a = cur[1].split('$')[0][0] || '$';
      const hint = cur[0] === '$' ? (ar ? 'الـ stack فاضي ($) والـ input خلص ($).' : 'Stack and input are both down to $.')
        : !G.order.includes(top) ? (ar ? 'الـ top هو terminal وبيساوي الـ input.' : 'The top is a terminal equal to the input symbol.')
        : (ar ? html`الـ top هو non-terminal، فبص في <bdi dir="ltr">M[${top}, ${a}]</bdi>.` : html`The top is a non-terminal: look up M[${top}, ${a}].`);
      setMiss({ o, hint, k: Date.now() });
    };
    const from = Math.max(0, Math.min(n, done + 1) - view);
    return html`<div className="hf-in">
      <div dir="ltr"><table className="hf-compilerF-tr"><thead><tr><th style=${{ width: '30%' }}>Stack</th><th style=${{ width: '27%' }}>Input</th><th>Action <small style=${{ fontWeight: 600, color: 'var(--graphite)' }}>${Math.min(done + 1, n)}/${n}</small></th></tr></thead><tbody>
        ${rows.slice(from, Math.min(n, done + 1)).map((r, j) => { const k = from + j; return html`<tr key=${k} className=${k === done ? 'cur' : ''}><td>${r[0]}</td><td>${r[1]}</td>
          ${k < done ? html`<td className="act">${r[2]}</td>` : html`<td className="qm">?</td>`}</tr>`; })}</tbody></table></div>
      ${cur ? html`<div key=${miss ? miss.k : 'o'} className=${'hf-compilerF-opts' + (miss && !calm() ? ' hf-compilerF-shake' : '')} dir="ltr">${opts.map(o => html`<button key=${o} className="hf-btn" onClick=${() => tap(o)}>${o}</button>`)}</div>`
        : html`<p className="hf-hand" style=${{ marginTop: '5px' }}>${ar ? 'اتعمل accept، يبقى الـ string صح. الـ productions بالترتيب هي الـ leftmost derivation.' : 'Accept, so the string is correct. The productions, in order, are the leftmost derivation.'}</p>`}
      ${miss && cur && html`<p className="hf-hand red" style=${{ marginTop: '4px' }}>${ar ? html`مش <bdi dir="ltr">${miss.o}</bdi>. ` : 'Not ' + miss.o + '. '}${miss.hint}</p>`}
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        <button className="hf-btn" onClick=${() => { setDone(n); setMiss(null); }}>${ar ? 'اعرض الـ parse كله' : 'Show the whole parse'}</button>
        ${done > 0 && html`<button className="hf-btn" onClick=${() => { setDone(0); setMiss(null); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  // Find two leftmost derivations: always expand the leftmost non-terminal; a choice that can no longer reach the string is refused
  function LmdGame({ id, G, w }) {
    const ar = useAr();
    const all = useMemo(() => lmds(G, w, 30).map(d => d.map(s => s[1])), [G]);
    const [st, setSt] = useSlot(id, { d: [[], []], k: 0 });
    const [msg, setMsg] = useState(null);
    const isN = s => G.order.includes(s);
    const forms = seq => { let f = [G.start]; const out = [f]; seq.forEach(j => { const k = f.findIndex(isN); f = f.slice(0, k).concat(G.P[f[k]][j], f.slice(k + 1)); out.push(f); }); return out; };
    const k = st.k, seq = k < 2 ? st.d[k] : [], fs = forms(seq), last = fs[fs.length - 1], lnt = last.findIndex(isN);
    const pre = (a, b) => a.every((x, i) => b[i] === x);
    const pick = j => {
      const ns = seq.concat(j);
      if (!all.some(d => pre(ns, d))) { setMsg({ t: ar ? 'السكة دي مش هتوصل للـ string. جرّب production تانية.' : 'That can no longer reach the string. Try another production.', k: Date.now() }); return; }
      const full = all.find(d => d.length === ns.length && pre(ns, d));
      const d = st.d.slice(); d[k] = ns;
      if (full && k === 1 && pre(ns, st.d[0]) && ns.length === st.d[0].length) { d[1] = []; setSt({ d, k: 1 }); setMsg({ t: ar ? 'دي نفس الـ LMD الأولى. لازم تختار حاجة مختلفة في خطوة واحدة على الأقل.' : 'That is LMD 1 again. Choose differently in at least one step.', k: Date.now() }); return; }
      setMsg(null); setSt({ d, k: full ? k + 1 : k });
    };
    const col = (i) => { const f = forms(st.d[i]); return html`<div key=${i} className=${k === i ? 'on' : k > i ? 'done' : ''}><h5>LMD ${i + 1}${k > i ? ' ✓' : ''}</h5>
      ${f.map((x, j) => { const n = x.findIndex(isN); return html`<p key=${j}>${j ? '⇒ ' : ''}${x.map((s, q) => q === n && (j < f.length - 1 || k === i) ? html`<u key=${q}>${s}</u>` : s)}</p>`; })}</div>`; };
    return html`<div className="hf-in">
      <div className="hf-compilerF-lmd">${col(0)}${col(1)}</div>
      ${k < 2 && lnt >= 0 ? html`<div key=${msg ? msg.k : 'o'} className=${'hf-compilerF-opts' + (msg && !calm() ? ' hf-compilerF-shake' : '')} dir="ltr">${G.P[last[lnt]].map((r, j) => html`<button key=${j} className="hf-btn" onClick=${() => pick(j)}>${last[lnt]} → ${r.length ? r.join('') : 'ε'}</button>`)}</div>` : null}
      ${msg && k < 2 ? html`<p className="hf-hand red" style=${{ marginTop: '4px' }}>${msg.t}</p>` : null}
      ${k >= 2 ? html`<p className="hf-hand" style=${{ marginTop: '4px' }}>${ar ? 'اتنين leftmost derivations مختلفين لنفس الـ string، يبقى الـ grammar ambiguous.' : 'Two different leftmost derivations of the same string: the grammar is ambiguous.'}</p>` : null}
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        ${k < 2 && seq.length > 0 && html`<button className="hf-btn" onClick=${() => { const d = st.d.slice(); d[k] = seq.slice(0, -1); setSt({ d, k }); setMsg(null); }}>${ar ? 'ارجع خطوة' : 'Undo'}</button>`}
        <button className="hf-btn" onClick=${() => { setSt({ d: [all[0], all[1]], k: 2 }); setMsg(null); }}>${ar ? 'اعرض الاتنين' : 'Show both'}</button>
        ${(k > 0 || seq.length > 0) && html`<button className="hf-btn" onClick=${() => { setSt({ d: [[], []], k: 0 }); setMsg(null); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  // fill in printed values: tap a cell to cycle through its candidates; rows: [label, [[name, answer, [options]], ...]]
  function Fill({ id, rows }) {
    const ar = useAr();
    const [v, setV] = useSlot(id, {});
    const [checked, setChecked] = useSlot(id + ':c', false);
    const all = []; rows.forEach((r, i) => r[1].forEach((c, j) => all.push([i + ':' + j, c])));
    const right = all.filter(([k, c]) => v[k] === c[1]).length;
    const cyc = (k, o) => { const cur = v[k], i = o.indexOf(cur); setChecked(false); setV(Object.assign({}, v, { [k]: o[(i + 1) % o.length] })); };
    return html`<div className="hf-in"><div className="hf-compilerF-fill">${rows.map((r, i) => html`<div key=${i} className="hf-compilerF-fr"><span>${T(r[0])}</span><span className="hf-compilerF-fc">
      ${r[1].map((c, j) => { const k = i + ':' + j, x = v[k]; return html`<button key=${j} className=${(x == null ? 'q' : '') + (checked && x != null ? (x === c[1] ? ' ok' : ' no') : '')} aria-label=${c[0]} onClick=${() => cyc(k, c[2])}><small>${c[0]}</small><b>${x == null ? '?' : x}</b></button>`; })}</span></div>`)}</div>
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; all.forEach(([k, c]) => { p[k] = c[1]; }); setV(p); setChecked(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${all.length}</bdi></span>`}
      </div>
      <p className="hf-compilerF-msg" style=${{ marginTop: '3px', color: 'var(--graphite)' }}>${ar ? 'دوس على أي خانة عشان تقلّب بين القيم.' : 'Tap a cell to cycle through the values.'}</p></div>`;
  }
  // the cells for one parameter-passing mode, computed by pass(); options = every value that cell takes in any mode
  const passRows = (P, mode, ar, inside) => {
    const R = {}; ['value', 'result', 'vr', 'ref'].forEach(m => { R[m] = pass(m, P); });
    const an = P.a.map((_, j) => 'a[' + (j + P.base) + ']');
    const cells = (key, names) => names.map((nm, j) => { const o = [...new Set(Object.values(R).map(r => r[key][j]).concat(key === 'after' ? [R.value.before[j]] : []))].sort((x, y) => x - y); return [nm, R[mode][key][j], o]; });
    const rows = [];
    if (inside) rows.push([ar ? 'جوّه الـ procedure' : 'inside', cells('inside', [P.f[0], P.f[1]].concat(an))]);
    rows.push([ar ? 'الـ main بعد الـ call' : 'main, after', cells('after', ['i'].concat(an))]);
    return rows;
  };

  // put the blocks in order: tap them one by one
  function OrderIt({ id, items, mix, heads }) {
    const ar = useAr();
    const [seq, setSeq] = useSlot(id, []);
    const [checked, setChecked] = useSlot(id + ':c', false);
    const right = seq.filter((x, i) => x === i).length;
    return html`<div className="hf-in"><div className="hf-compilerF-ord">
      <div><h5>${heads[0]}</h5>${mix.filter(i => !seq.includes(i)).map(i => html`<button key=${i} onClick=${() => { setChecked(false); setSeq(seq.concat(i)); }}>${T(items[i])}</button>`)}</div>
      <div><h5>${heads[1]}</h5>${items.map((_, k) => { const x = seq[k]; return html`<div key=${k} className=${'slot' + (checked && x != null ? (x === k ? ' ok' : ' no') : '')}><i>${k + 1}</i>${x != null ? T(items[x]) : ''}</div>`; })}</div></div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${!seq.length} onClick=${() => setChecked(true)}>${ar ? 'صحّح الترتيب' : 'Check the order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(items.map((_, i) => i)); setChecked(true); }}>${ar ? 'اعرض الترتيب' : 'Show the order'}</button>
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setChecked(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${items.length}</bdi></span>`}
      </div></div>`;
  }

  // the past papers' data
  const NFA = {
    ex1: { states: ['1', '2', '3'], syms: ['0', '1'], start: '1', fin: ['3'], edges: [['1', '0', '3'], ['3', '0', '1'], ['3', '1', '3'], ['3', '1', '2'], ['2', '0', '3']] },
    ex2: { states: ['1', '2', '3'], syms: ['a', 'b'], start: '1', fin: ['1'], edges: [['1', 'b', '2'], ['1', 'ε', '3'], ['2', 'a', '2'], ['2', 'a', '3'], ['2', 'b', '3'], ['3', 'a', '1']] },
    p2324: { states: ['0', '1', '2', '3'], syms: ['a', 'b'], start: '0', fin: ['3'], edges: [['0', 'b', '2'], ['0', 'a', '1'], ['2', 'a', '2'], ['2', 'a', '3'], ['1', 'b', '3']] },
    srm: { states: ['S', 'R', 'M'], syms: ['0', '1'], start: 'S', fin: ['R'], edges: [['S', '0', 'S'], ['S', '0', 'R'], ['R', '0', 'S'], ['R', '1', 'R'], ['R', '1', 'M'], ['M', '0', 'R']] },
    s2324: { states: ['0', '1', '2'], syms: ['a', 'b'], start: '0', fin: ['2'], edges: [['0', 'b', '1'], ['0', 'a', '2'], ['1', 'a', '1'], ['1', 'a', '2'], ['2', 'a', '1']] },
    p2122: { states: ['1', '2', '3'], syms: ['0', '1'], start: '1', fin: ['3'], edges: [['1', '0', '3'], ['3', '0', '1'], ['3', '0', '3'], ['3', '1', '2'], ['2', '0', '3']] },
    ours: { states: ['A', 'B', 'C'], syms: ['a', 'b'], start: 'A', fin: ['C'], edges: [['A', 'a', 'A'], ['A', 'a', 'B'], ['B', 'b', 'B'], ['B', 'b', 'C'], ['C', 'ε', 'A']] }
  };
  const GR = {
    uvw: { order: ['S', 'U', 'V', 'W'], start: 'S', P: { S: [['U', 'V', 'W']], U: [['(', 'S', ')'], ['a', 'S', 'b'], ['d']], V: [['a', 'V'], []], W: [['c', 'W'], []] } },
    abe: { order: ['S', 'A', "A'", 'B'], start: 'S', P: { S: [['a', 'A', 'B', 'e']], A: [['b', "A'"]], "A'": [['b', 'c', "A'"], []], B: [['d']] } },
    ours: { order: ['S', 'L', "L'"], start: 'S', P: { S: [['(', 'L', ')'], ['x']], L: [['S', "L'"]], "L'": [[',', 'S', "L'"], []] } }
  };
  const AMB = {
    idid: [{ order: ['E'], start: 'E', P: { E: [['E', '+', 'E'], ['E', '-', 'E'], ['id']] } }, ['id', '-', 'id', '+', 'id']],
    s001: [{ order: ['S', 'A', 'B'], start: 'S', P: { S: [['0', 'A'], ['1', 'B']], A: [['0', 'A', 'A'], ['1', 'S'], ['1']], B: [['1', 'B', 'B'], ['0', 'S'], ['0']] } }, [...'001101']],
    aaac: [{ order: ['S', 'A', 'B', 'T'], start: 'S', P: { S: [['A', 'B']], A: [['A', 'A'], ['a']], B: [['T', 'c']], T: [['a', 'T'], ['a']] } }, [...'aaac']],
    num: [{ order: ['E', 'op'], start: 'E', P: { E: [['E', 'op', 'E'], ['(', 'E', ')'], ['+', 'E'], ['num']], op: [['+'], ['-'], ['*'], ['/'], []] } }, ['(', 'num', '/', 'num', ')', '+', 'num']],
    ours: [{ order: ['S'], start: 'S', P: { S: [['a', 'S'], ['S', 'b'], ['c']] } }, [...'acb']]
  };
  const PP = {
    s25: { a: [10, 20, 30], base: 0, i: 2, fj: j => j + 1, fx: x => x + 3, z: 2, f: ['j', 'x'] },
    p2122: { a: [2, 4, 6], base: 0, i: 1, fj: y => y + 2, fx: x => x + 8, z: 2, f: ['y', 'x'] },
    ours: { a: [5, 7, 9], base: 0, i: 1, fj: j => j + 4, fx: x => x + 1, z: 1, f: ['j', 'x'] }
  };

  H.chapters.compiler.final = {
    title: 'The Whole Compiler in One Night', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'الـ compiler كله في ليلة واحدة', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' questions from every lecture (quiz items with src), with the site's Arabic why for each option
      const arL = (window.AR && window.AR.compiler && window.AR.compiler.lectures) || {};
      const allQ = []; kit.course.lectures.forEach(l => l.quiz.forEach((x, i) => allQ.push([l.n, i, x])));
      const find = (re, src) => { const f = allQ.find(([, , x]) => !!x.src === src && re.test(strip(x.q))); return f ? { q: f[2], why: ((arL[f[0]] || {}).quiz || [])[f[1]] } : {}; };
      const mq = (id, re) => { const r = find(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const watch = (items, title) => html`<${Box} kind="watch" title=${title}><ul className="hf-ul">${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>`;
      const NAMES = A ? ['الـ compilers والـ phases', 'الـ regex والـ finite automata', 'التحويل من NFA لـ DFA', 'الـ CFG والـ derivations', 'الـ FIRST والـ FOLLOW والـ LL(1)', 'الـ attributes والـ SDT', 'الـ binding والـ symbol tables', 'الـ runtime والـ optimization']
        : ['Compilers and phases', 'Regex and finite automata', 'NFA → DFA', 'CFG, derivations, ambiguity', 'FIRST, FOLLOW, LL(1)', 'Attributes and SDT', 'Binding and symbol tables', 'Runtime, passing, optimizing'];
      const lp = n => t('Lecture ' + n, 'المحاضرة ' + n);
      const sec = n => ({ sec: (A ? 'المحاضرة ' : 'Lecture ') + n + ' · ' + NAMES[LECS.indexOf(n)] });
      return [
        // 0 · how to use this book + how ready am I
        page(html`
          <${H2}>${t('How to use this book', 'تذاكر الكتاب ده إزاي')}</${H2}>
          <${Method} steps=${A ? ['قيّم نفسك تحت، محاضرة محاضرة. كن صريح.', 'اقرا الخريطة وتشريح الامتحان.', 'عدّي على كل محاضرة، وابدأ بالمهزوزة.', 'حل <b>المسائل اللي بتيجي كل سنة</b> بإيدك على الصفحة، وبعدين ركن الامتحان.']
            : ['Rate yourself below, lecture by lecture. Be honest.', 'Read the map and the anatomy of the final.', 'Go through each lecture, shaky ones first.', 'Solve <b>the problems that always come up</b> by hand on the page, then the exam corner.']} />
          <${H3}>${t('How ready am I?', 'أنا جاهز قد إيه؟')}</${H3}>
          <${Rate} names=${NAMES} />
          <${Grow} />
          <${Hand}>${t('Your ratings stay in the book. Rate again the night before.', 'تقييمك بيتحفظ في الكتاب. قيّم تاني ليلة الامتحان.')}</${Hand}>
        `, { sec: t('How to use this book', 'تذاكر الكتاب ده إزاي') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="hf-compilerF-star">★</span><span className="t">${A ? html`المراجعة النهائية<br/>Compiler Design` : html`Final revision<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('The Whole Compiler in One Night', 'الـ compiler كله في ليلة واحدة')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('eight lectures, seven past finals, one book', 'تمن محاضرات، سبع امتحانات فاتت، كتاب واحد')}</p></div>
          <${Talk} who="dev">${X('The final is in a few days and I have <b>eight lectures</b> to revise. Where do I even start?', 'الفاينال كمان كام يوم وعندي <b>تمن محاضرات</b>. أبدأ منين أصلًا؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('With what they <b>actually ask</b>. Every final since 2021 had an <b>NFA → DFA</b> and an <b>ambiguity proof</b>. Most had an LL(1) table or a binding output.', 'من اللي <b>بيتسأل فعلًا</b>. كل فاينال من 2021 كان فيه <b>NFA → DFA</b> و<b>إثبات ambiguity</b>، ومعظمهم فيهم جدول LL(1) أو output بتاع binding.')}</${Talk}>
          <${P} small=${true}>${X('This book is the whole course, built around the past papers: a map, the anatomy of the final, every lecture in a few pages, and every written problem as an exercise you solve right here.', 'الكتاب ده هو الكورس كله، مبني على الامتحانات اللي فاتت: خريطة، وتشريح للفاينال، وكل محاضرة في كام صفحة، وكل مسألة written كتمرين بتحله هنا على الصفحة.')}</${P}>
        `, { sec: t('Final revision', 'المراجعة النهائية') }),

        // 2 · the course map
        page(html`
          <${H2}>${t('The course on one line', 'الكورس كله على خط واحد')}</${H2}>
          <${CourseMap} stops=${A ? [
            [1, 'الصورة', 'الـ compilers والـ six phases', 'ترسم الـ phases وإيه اللي بيتنقل بينهم.'],
            [2, 'lexical', 'الـ regex والـ FA', 'تعرف الـ regex المتساويين، وتكتب regex وترسم FA.'],
            [3, 'lexical', 'التحويل من NFA لـ DFA', 'تقول ليه NFA وتحوّلها بالـ 3 خطوات.'],
            [4, 'syntax', 'الـ CFG والـ ambiguity', 'تثبت ambiguity باتنين LMD وشجرتين، وتشيل الـ left recursion.'],
            [6, 'syntax', 'الـ FIRST والـ FOLLOW والـ LL(1)', 'المجموعات والجدول M والـ trace (12 درجة).'],
            [7, 'semantic', 'الـ attributes والـ SDT', 'الـ synthesized والـ inherited، والغرض من الـ SDT.'],
            [8, 'semantic', 'الـ binding والـ symbol tables', 'الـ output في الـ static والـ dynamic، والـ linked list.'],
            [9, 'back end', 'الـ runtime والـ optimization', 'الـ memory layout، والـ output لكل parameter mode، والـ optimization.']
          ] : [
            [1, 'big picture', 'Compilers and the six phases', 'Draw the phases and what flows between them.'],
            [2, 'lexical', 'Regular expressions and FA', 'Spot equal regexes; write a regex; draw an FA.'],
            [3, 'lexical', 'NFA → DFA', 'Say why it is an NFA; convert it in 3 steps.'],
            [4, 'syntax', 'CFG, derivations, ambiguity', 'Prove ambiguity (2 LMDs + 2 trees); remove left recursion.'],
            [6, 'syntax', 'FIRST, FOLLOW and LL(1)', 'Sets, table M and the stack trace (12 marks).'],
            [7, 'semantic', 'Attributes and SDT', 'Synthesized vs inherited; the purpose of SDT.'],
            [8, 'semantic', 'Binding and symbol tables', 'Static vs dynamic outputs; the linked-list table.'],
            [9, 'back end', 'Runtime, passing, optimizing', 'Memory layout; outputs per passing mode; optimize code.']
          ]} links=${A ? [
            'دوس على أي محطة. الـ six phases هي خريطة الكورس كله: المحاضرة 2 و3 هما الـ phase 1، و4 و6 الـ phase 2، و7 و8 الـ phase 3، و9 الـ runtime والـ optimizers.',
            'الـ regular expressions بتوصف الـ tokens، والـ finite automata بتتعرّف عليها. الـ NFA اللي طالعة من regex بتروح للمحاضرة 3.',
            'كل NFA ليها DFA بتعمل نفس الشغل (الـ subset construction). والـ automata مبتعرفش تقفل الأقواس المتداخلة، فالـ phase الجاية محتاجة CFG.',
            'الـ parser معمول على الـ CFG. والـ left recursion لازم تتشال قبل الـ LL(1) في المحاضرة 6.',
            'الـ FIRST والـ FOLLOW بيبنوا الجدول M، والـ parser بيطلّع الـ syntax tree اللي الـ semantic analysis هتعمله annotate.',
            'الـ attribute grammar بتحوّل الـ syntax tree لـ annotated syntax tree، وده بيدخل على الـ code optimizer.',
            'قواعد الـ scope بتحدد كل استخدام مربوط بأنهي declaration، والـ symbol table (الـ helper بتاع المحاضرة 1) بيشيلهم.',
            'وقت التشغيل: الـ storage (static وstack وheap) والـ parameter passing، والـ peephole والـ loop optimization بيخلّصوا الكود.'
          ] : [
            'Tap any stop. The six phases are the map of the whole course: L2–L3 are phase 1, L4–L6 phase 2, L7–L8 phase 3, L9 the runtime and the optimizers.',
            'Regular expressions specify tokens; finite automata recognize them. The NFA you build from a regex goes on to L3.',
            'Every NFA has an equivalent DFA (subset construction). Automata cannot match nested brackets, so the next phase needs a CFG.',
            'The parser is modeled on a CFG. Left recursion must go before LL(1) in L6.',
            'FIRST and FOLLOW build table M; the parser outputs the syntax tree that semantic analysis annotates.',
            'An attribute grammar turns the syntax tree into the annotated syntax tree, which goes to the code optimizer.',
            'Scope rules decide which declaration each use binds to; the symbol table (L1\'s helper) stores them.',
            'At run time: storage (static, stack, heap) and parameter passing; peephole and loop optimization finish the code.'
          ]} />
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // 3 · how the ideas connect
        page(html`
          <${H2}>${t('Three phases, three models', 'تلات phases، تلات models')}</${H2}>
          <${P} small=${true}>${X('The exams ask "modeled on the basis of…" for each analysis phase. One table answers all of them:', 'الامتحانات بتسأل كل phase معمولة على إيه. جدول واحد بيجاوبهم كلهم:')}</${P}>
          <${Tb} head=${A ? ['الـ phase', 'معمولة على', 'الناتج'] : ['Phase', 'Modeled on', 'Output']} rows=${A ? [
            ['الـ lexical', 'الـ regular expressions والـ FA', 'الـ tokens'],
            ['الـ syntax', 'الـ context free grammar', 'الـ parse tree'],
            ['الـ semantic', 'الـ attribute grammar', 'الـ annotated syntax tree']
          ] : [
            ['Lexical (scanner)', 'regular expressions + finite automata', 'tokens'],
            ['Syntax (parser)', 'context free grammar', 'parse (syntax) tree'],
            ['Semantic', 'attribute grammar', 'annotated syntax tree']
          ]} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why can\'t the scanner check that every <code>(</code> has its <code>)</code>? Which lecture answers it, and what does the parser use instead?', 'ليه الـ scanner ميقدرش يتأكد إن كل <code>(</code> ليها <code>)</code>؟ أنهي محاضرة بتجاوب، والـ parser بيستخدم إيه بدالها؟')}</p></${Box}>
          <${Hand} red=${true}>${t('answer: regular expressions cannot check balancing tokens (L4), so syntax analysis uses a CFG', 'الإجابة: الـ regular expressions مبتعرفش تشيّك على الـ balancing tokens (المحاضرة 4)، فالـ syntax analysis بتستخدم CFG')}</${Hand}>
        `),

        // 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الفاينال')}</${H2}>
          <${P} small=${true}>${X('Seven past finals, all <b>2 hours</b>. Two formats:', 'سبع امتحانات فاتت، كلهم <b>ساعتين</b>. وفيه شكلين:')}</${P}>
          <div className="hf-compilerF-card hf-in"><h4>${t('60 marks (CS321)', 'الـ 60 درجة (CS321)')}</h4>
            <p>${X('<b>Q1</b>: 10 MCQ + 10 True/False = 20 marks. <b>Q2</b>: 5 written problems × 8 = 40 marks.', '<b>السؤال الأول</b>: 10 MCQ و10 صح وغلط، يعني 20 درجة. <b>السؤال التاني</b>: 5 مسائل written، كل واحدة 8، يعني 40 درجة.')}</p>
            <p>${X('Variants: 2023/24 (60) has a <b>12-mark</b> LL(1) problem; 2024/25 (60) puts the written part first, then 15 MCQ + 5 T/F.', 'فيه نسخ تانية: امتحان <bdi dir="ltr">2023/24 (60)</bdi> فيه مسألة LL(1) عليها <b>12 درجة</b>، وامتحان <bdi dir="ltr">2024/25 (60)</bdi> بيبدأ بالـ written وبعده 15 MCQ و5 صح وغلط.')}</p></div>
          <div className="hf-compilerF-card hf-in"><h4>${t('50 marks (CS309)', 'الـ 50 درجة (CS309)')}</h4>
            <p>${X('<b>Q1</b>: 10 MCQ + 10 True/False = 20. <b>Q2</b>: 5 written × 6 = 30.', '<b>السؤال الأول</b>: 10 MCQ و10 صح وغلط، يعني 20. <b>السؤال التاني</b>: 5 written كل واحدة 6، يعني 30.')}</p></div>
          <div className="hf-compilerF-card hf-in"><h4>${t('The midterm 2026/27', 'ميدترم 2026/27')}</h4>
            <p>${X('Online, 24 MCQ + 16 T/F on L1–L4. Its questions are the same style as the finals\' Q1.', 'أونلاين، 24 MCQ و16 صح وغلط على المحاضرات من 1 لـ 4. أسئلته نفس ستايل السؤال الأول في الفاينال.')}</p></div>
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('No paper had a single surprise topic: every question maps to one of the eight lectures. The revision sheet has most of them word for word.', 'مفيش امتحان فيه موضوع غريب، والـ revision sheet فيها معظم الأسئلة بالحرف.')}</p></${Box}>
        `, { sec: t('Anatomy of the final', 'تشريح الفاينال') }),

        // 5 · hot list: written problems
        page(html`
          <${H2}>${t('The hot list: written problems', 'الأكتر تكرارًا: المسائل الـ written')}</${H2}>
          <${P} small=${true}>${t('How many of the 7 past finals asked each problem type (we counted them paper by paper):', 'كل نوع مسألة جه في كام امتحان من السبعة (عدّيناهم امتحان امتحان):')}</${P}>
          <${Bars} rows=${A ? [['التحويل من NFA لـ DFA', 7, 7], ['إثبات الـ ambiguity', 7, 7], ['اقترح optimization', 5, 7], ['جدول LL(1) والـ trace', 4, 7], ['الـ static والـ dynamic', 4, 7], ['الـ parameter passing', 3, 7], ['ارسم الـ phases', 2, 7], ['قارن الـ compiler بالـ interpreter', 2, 7], ['الغرض من الـ SDT', 2, 7], ['الـ memory layout', 1, 7], ['ارسم FA لـ regex', 1, 7], ['الـ symbol table بالـ linked list', 1, 7]]
            : [['NFA → DFA', 7, 7], ['Prove ambiguity', 7, 7], ['Propose optimizations', 5, 7], ['LL(1) table + trace', 4, 7], ['Static vs dynamic output', 4, 7], ['Parameter passing output', 3, 7], ['Phases figure', 2, 7], ['Compiler vs interpreter', 2, 7], ['Purpose of SDT', 2, 7], ['Memory layout figure', 1, 7], ['FA for a regex', 1, 7], ['Linked-list symbol table', 1, 7]]} />
          <${Box} kind="exam" title=${t('Asked again, word for word', 'اتسألوا تاني بالحرف')}><p className="hf-p small">${X('The <b>id-id+id</b> ambiguity was set in 3 papers. In 2 papers each: the NFA 1 –0→ 3, the <b>(dc)ac</b> LL(1), <b>abbcde</b>, <b>001101</b> and the <b>length-1 loop</b>. All of them are in the problems section, with their papers.',
            'سؤال الـ ambiguity بتاع <b><bdi dir="ltr">id-id+id</bdi></b> جه في 3 امتحانات. ودول جم في امتحانين كل واحد: الـ NFA بتاعة <bdi dir="ltr">1 –0→ 3</bdi>، والـ LL(1) بتاع <b><bdi dir="ltr">(dc)ac</bdi></b>، و<b>abbcde</b>، و<b>001101</b>، ولوب الـ <b><bdi dir="ltr">length-1</bdi></b>. كلهم موجودين في قسم المسائل بامتحاناتهم.')}</p></${Box}>
        `),

        // 6 · hot list: short questions
        page(html`
          <${H2}>${t('The hot list: MCQ and True/False', 'الأكتر تكرارًا: الـ MCQ والصح والغلط')}</${H2}>
          <${P} small=${true}>${t('Papers (of 7 finals + the midterm) with at least one question on it:', 'عدد الامتحانات (من 7 فاينال والميدترم) اللي فيها سؤال واحد على الأقل عنه:')}</${P}>
          <${Bars} rows=${A ? [['الـ lexical analyzer وإيه هي الـ tokens', 8, 8], ['جبر الـ regex والـ concatenation', 8, 8], ['الـ loops والـ ε والـ NFA', 8, 8], ['أجزاء الـ CFG والـ leaves', 8, 8], ['الـ parsing والـ derivation', 8, 8], ['إيه اللي مش phase', 8, 8], ['الـ intermediate code والـ annotated tree', 7, 8], ['الشجرة بتكبر من اليمين', 6, 8], ['الـ compiler بيبيّن الـ syntax error', 6, 8], ['الـ synthesized والـ inherited', 6, 8], ['الـ optimization والـ peephole', 6, 8], ['الـ SDT والـ attribute grammar', 5, 8], ['الـ binding والـ symbol table', 5, 8], ['الـ storage', 5, 8]]
            : [['Lexical analyzer and tokens', 8, 8], ['Regex algebra and concatenation', 8, 8], ['Loops, ε and NFAs', 8, 8], ['CFG parts and leaves', 8, 8], ['Parsing and derivations', 8, 8], ['What is not a phase', 8, 8], ['Intermediate code, annotated tree', 7, 8], ['A leftmost tree grows from the right', 6, 8], ['A compiler indicates syntax errors', 6, 8], ['Synthesized vs inherited', 6, 8], ['Optimization and peephole', 6, 8], ['SDT and attribute grammar', 5, 8], ['Binding and symbol tables', 5, 8], ['Storage types', 5, 8]]} />
          <${Grow} />
          <${Hand} red=${true}>${t('The midterm covered L1–L4 only, so L7–L9 topics can reach 7 at most.', 'الميدترم كان على المحاضرات من 1 لـ 4 بس، فمواضيع 7 و8 و9 آخرها 7.')}</${Hand}>
        `),

        // ── Lecture 1 ──
        page(html`
          <${Lec} n="1" title=${t('Compilers and the six phases', 'الـ compilers والـ six phases')} />
          <${Know} rows=${A ? [
            ['الـ compiler', 'بيترجم برنامج <b>high-level</b> لـ <b>low-level machine language</b>، وبيبلّغ عن أخطاء المبرمج الواضحة.'],
            ['الفرق', 'الـ interpreter: statement واحدة في المرة، analysis أقل وexecution <b>أبطأ</b>، ومفيش intermediate object code فموفّر في الـ memory، زي JavaScript وPython وRuby. الـ compiler: البرنامج كله، analysis طويل وexecution <b>أسرع</b>، وobject code محتاج linking، زي C و<bdi dir="ltr">C++</bdi> وJava.'],
            ['الـ phases', 'الترتيب:<span class="ltr">Scanner → tokens → Parser → syntax tree → Semantic analyzer → annotated tree → Source code optimizer → intermediate code → Code generator → target code → Target code optimizer</span>'],
            ['مش phases', 'الـ literal table والـ symbol table والـ error handler، ودول helpers بيستخدمهم كل الـ phases. والـ testing كمان مش phase.'],
            ['الـ optimize', 'بيتعمل مرتين: على الـ source وعلى الـ target اللي هو الـ assembly، وأبدر نقطة بعد الـ semantic analysis. والـ intermediate code موجود عشان منحتاجش compiler مختلف لكل machine.']
          ] : [
            ['Compiler', 'Translates a <b>high-level</b> program into <b>low-level machine language</b> and reports obvious programmer mistakes.'],
            ['vs', 'Interpreter: one statement at a time, less analysis, <b>slower</b> execution, no intermediate object code so memory efficient (JavaScript, Python, Ruby). Compiler: the whole program, long analysis, <b>faster</b> execution, object code that needs linking (C, C++, Java).'],
            ['Phases', 'Scanner → <i>tokens</i> → Parser → <i>syntax tree</i> → Semantic analyzer → <i>annotated tree</i> → Source code optimizer → <i>intermediate code</i> → Code generator → <i>target code</i> → Target code optimizer.'],
            ['Not phases', 'Literal table, symbol table, error handler (helpers all phases use). Testing is not a phase either.'],
            ['Optimize', 'Done twice, on source and target (assembly) code; earliest just after semantic analysis. Intermediate code avoids a unique compiler for each machine.']
          ]} />
        `, sec(1)),
        page(html`
          <${H2}>${t('The figure to draw: the phases', 'الرسمة اللي هترسمها: الـ phases')}</${H2}>
          <${Fig} name="cc-phases" />
        `),
        page(html`
          ${watch(A ? ['سؤال إيه اللي مش phase إجابته الـ <b>symbol table</b>، أو الـ <b>testing</b> لو الـ symbol table مش في الاختيارات.',
            'الـ <b>interpreter</b> هو اللي بياخد وقت طويل في الـ execution، مش الـ compiler.',
            'الـ compiler بيبيّن الـ <b>syntax</b> error بس. لو كتبت <code>*</code> بدل <code>/</code>، محدش هيمسكها: <b>none of the mentioned</b>.']
            : ['"……… is not a phase of a compiler" → <b>symbol table</b> (or <b>testing</b> when the symbol table is not an option).',
              '"Compilers take long time to execute source code": <b>False</b>. "Interpreters take long time to execute": <b>True</b>.',
              'A compiler indicates the <b>syntax</b> error only. Writing * instead of / is caught by <b>none of the mentioned</b>.'])}
          <${Gap} h=${4} />
          ${mq('l1', /source code to:$/)}
        `),

        // ── Lecture 2 ──
        page(html`
          <${Lec} n="2" title=${t('Regular expressions and finite automata', 'الـ regular expressions والـ finite automata')} />
          <${Know} rows=${A ? [
            ['الـ scanner', 'أول phase: characters داخلة وtokens طالعة. بيشيل الـ comments والـ white space، والـ keywords بتتعرف هنا. الـ token هو النوع (id) والـ lexeme هو النص نفسه (distance).'],
            ['العمليات', 'الـ union ترتيبه مش مهم. الـ concatenation ترتيبه مهم:<span class="ltr">{a,b}{0,11} = {a0, a11, b0, b11}</span>والـ * يعني صفر أو أكتر (فيها ε)، والـ + يعني واحد أو أكتر.'],
            ['الأولوية', 'الـ * الأول، وبعدها الـ concatenation، وبعدها الـ |:<span class="ltr">a|ab* = a|(a(b*))</span>'],
            ['القوانين', 'كلهم صح:<span class="ltr">aε = εa = a,  s|t = t|s,  r(s|t) = rs|rt,  (s*)* = s*,  ss* = s+</span>والقانون ده <b>غلط</b>:<span class="ltr">(X|Y)* = X*|Y*</span>'],
            ['الـ FA', 'الـ start عليه سهم، والـ final دايرتين. في الجدول: → للـ start و* للـ final و– يعني مفيش transition.']
          ] : [
            ['Scanner', 'Phase 1: characters in, tokens out. Removes comments and white space; keywords are recognized here. Token = category (id), lexeme = the actual string (distance).'],
            ['Ops', 'Union: order does not matter. Concatenation: order matters, {a,b}{0,11} = {a0, a11, b0, b11}. * = zero or more (has ε), + = one or more.'],
            ['Precedence', '* first, then concatenation, then |: a|ab* = a|(a(b*)).'],
            ['Laws', 'aε = εa = a; s|t = t|s; r(s|t) = rs|rt; (s*)* = s*; ss* = s+. But <b>(X|Y)* ≠ X*|Y*</b>.'],
            ['FA', 'Start has an arrow, final is a double circle. In a table: → start, * final, – no transition.']
          ]} />
        `, sec(2)),
        page(html`
          <${H2}>${t('An FA for 1*01(0|1)*', 'الـ FA بتاعة 1*01(0|1)*')}</${H2}>
          <${Fig} name="cc-fa-1s01" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Same language?', 'نفس اللغة؟')}><p className="hf-p small">${t('Tap = if the two sides describe the same language, ≠ if not.', 'دوس = لو الناحيتين بيوصفوا نفس اللغة، و≠ لو لأ.')}</p></${Box}>
          <${Sort} id="l2s" bins=${[['=', t('equal', 'متساويين')], ['≠', t('not equal', 'مش متساويين')]]} items=${[
            ['<bdi dir="ltr">(X|Y)*  vs  X*|Y*</bdi>', 1], ['<bdi dir="ltr">aε  vs  a</bdi>', 0], ['<bdi dir="ltr">(a)|((b)*(c))  vs  b*c|a</bdi>', 0], ['<bdi dir="ltr">a(b|c)  vs  ab|ac</bdi>', 0],
            ['<bdi dir="ltr">ab(c)  vs  (a)bc</bdi>', 0], ['<bdi dir="ltr">L1L2  vs  L2L1</bdi>', 1], ['<bdi dir="ltr">(s*)*  vs  s*</bdi>', 0], ['<bdi dir="ltr">a|ab*  vs  (a|ab)*</bdi>', 1]]} />
        `),
        page(html`
          <${H2}>${t('Write the regular expression', 'اكتب الـ regular expression')}</${H2}>
          <${P} small=${true}>${t('From the midterm, Sheet One and the revision sheet. Tap a description, then its expression.', 'من الميدترم وSheet One والـ revision sheet. دوس على الوصف وبعدين الـ expression بتاعه.')}</${P}>
          <${Match} id="l2m" left=${A ? ['فيها a اتنين بالظبط، على {a,b,c}', 'a واحدة وبعدها أي عدد b، أو b واحدة وبعدها أي عدد a', 'تقبل bbbb، على {a,b}', 'فيها b واحدة بالظبط، على {a,b,c}', 'فيها a اتنين بالظبط، على {a,b}']
            : ['Exactly two a\'s over {a,b,c}', 'One a then any b\'s, or one b then any a\'s', 'Recognizes bbbb over {a,b}', 'Exactly one b over {a,b,c}', 'Exactly two a\'s over {a,b}']}
            right=${['<bdi dir="ltr">ab* | ba*</bdi>', '<bdi dir="ltr">b*ab*ab*</bdi>', '<bdi dir="ltr">(a|c)*b(a|c)*</bdi>', '<bdi dir="ltr">(b|c)*a(b|c)*a(b|c)*</bdi>', '<bdi dir="ltr">(a|b)*</bdi>']}
            answer=${[3, 0, 4, 2, 1]} />
        `),

        // ── Lecture 3 ──
        page(html`
          <${Lec} n="3" title=${t('NFA vs DFA and NFA → DFA', 'الـ NFA والـ DFA والتحويل')} />
          <${Know} rows=${A ? [
            ['علامات الـ NFA', 'واحدة منهم كفاية: <b>(1)</b> فيها ε. <b>(2)</b> loop على symbol وكمان transition بنفس الـ symbol من نفس الـ state. <b>(3)</b> أكتر من path لنفس الـ input string.'],
            ['مش علامات', 'الـ loop لوحده، أو أكتر من accept state. والـ DFA ممكن يبقى فيها loops.'],
            ['الـ DFA', 'مفيش ε، وnext state واحدة بالظبط، ووقت أقل لكل string. والـ NFA ممكن يبقى ليها صفر أو واحدة أو أكتر (السلايد كاتبة "zero or one" ‡).'],
            ['الطريقة', '<b>1</b> جدول فيه عمود ε. <b>2</b> جدول من غير ε: ابدأ بالـ ε-closure بتاع الـ start، وكل set جديدة في خانة تبقى row جديد. <b>3</b> ارسم: أي set فيها final أصلية تبقى final، والخانة الفاضية dead state.'],
            ['دايمًا', 'كل NFA ليها DFA بتقبل نفس اللغة، والاتنين بيتعرّفوا على الـ regular expressions بس.']
          ] : [
            ['NFA signs', 'Any one is enough: <b>(1)</b> an ε; <b>(2)</b> a loop on a symbol plus another transition on the same symbol from that state; <b>(3)</b> several paths for the same input string.'],
            ['Not signs', 'A loop by itself; several accept states. A DFA may have loops.'],
            ['DFA', 'No ε, exactly one next state, less time per string. An NFA has zero, one or more (the slide writes "zero or one" ‡).'],
            ['Method', '<b>1</b> table with an ε column; <b>2</b> table without ε: start from the start state\'s ε-closure, every new set in a cell becomes a new row; <b>3</b> draw it: a set containing an original final state is final, an empty cell is a dead state.'],
            ['Always', 'Every NFA has a DFA accepting the same language; both recognize only regular expressions.']
          ]} />
        `, sec(3)),
        page(html`
          <${H2}>${t('The exam NFA, converted step by step', 'الـ NFA بتاعة الامتحان، خطوة خطوة')}</${H2}>
          <${Fig} name="cc-subset-exam1" />
        `),
        page(html`
          ${watch(A ? ['جملة إن أي loop بيخلّي الـ automaton nondeterministic <b>غلط</b>.', 'والـ ε <b>مش بتغيّر</b> اللغة اللي الـ automaton بيقبلها، ومينفعش تبقى في DFA.']
            : ['"Any loop causes the automaton to be nondeterministic": <b>False</b>.', 'An ε <b>does not change</b> the language accepted, and it cannot exist in a DFA.'])}
          <${P} small=${true}>${t('Tap NFA if this alone makes the automaton non-deterministic, DFA if a DFA may have it.', 'دوس NFA لو ده لوحده بيخليها non-deterministic، وDFA لو مسموح في الـ DFA.')}</${P}>
          <${Sort} id="l3s" bins=${[['NFA', t('makes it an NFA', 'بيخليها NFA')], ['DFA', t('allowed in a DFA', 'مسموح في الـ DFA')]]} items=${A ? [
            ['edge عليه ε', 0], ['loop على 0', 1], ['loop على 1 ومعاه edge تاني على 1 من نفس الـ state', 0], ['تلات accept states', 1], ['edge-ين على a من نفس الـ state', 0]]
            : [['An ε edge', 0], ['A loop on 0', 1], ['A loop on 1 plus another edge on 1 from that state', 0], ['Three accept states', 1], ['Two edges on a from the same state', 0]]} />
        `),

        // ── Lecture 4 ──
        page(html`
          <${Lec} n="4" title=${t('CFG, derivations, trees, ambiguity', 'الـ CFG والـ derivations والـ ambiguity')} />
          <${Know} rows=${A ? [
            ['الـ parsing', 'هو إيجاد parse tree لـ string من الـ tokens (اسمه كمان syntax analysis). بياخد tokens ويطلّع parse tree، ومعمول على CFG.'],
            ['الـ CFG', 'أربع حاجات <bdi dir="ltr">(V, Σ, P, S)</bdi>: non-terminals وterminals وproductions وstart symbol. مفيش "end symbol".'],
            ['الـ derivation', 'بيبدأ من الـ start symbol بس. الـ leftmost بيبدّل أول non-terminal على الشمال كل خطوة (والـ top-down بيطلّعه)، والـ bottom-up بيطلّع rightmost بالعكس.'],
            ['الشجرة', 'الـ root هو S، والـ leaves terminals، والـ interior nodes non-terminals. وحسب الـ key: الـ leftmost parsing tree بتكبر من <b>اليمين</b>.'],
            ['الـ ambiguity', 'أكتر من parse tree لنفس الـ string، يعني اتنين LMD مختلفين (أو اتنين RMD). LMD واحدة وRMD واحدة مش بيثبتوا حاجة.'],
            ['الـ left rec.', 'الشكل ده:<span class="ltr">A → Aα | β  ⇒  A → βA\',  A\' → αA\' | ε</span>والـ LL(1) مينفعش يشتغل وهي موجودة.']
          ] : [
            ['Parsing', 'Finding a parse tree for a string of tokens (also called syntax analysis). Tokens in, parse tree out; modeled on a CFG.'],
            ['CFG', '(V, Σ, P, S): non-terminals, terminals, productions, start symbol. There is no "end symbol".'],
            ['Derivation', 'Starts from the start symbol only. Leftmost replaces the leftmost non-terminal each step (top-down gives it); bottom-up gives a rightmost one in reverse.'],
            ['Tree', 'Root = S, leaves = terminals, interior nodes = non-terminals. Official key: a leftmost parsing tree grows from the <b>right</b>.'],
            ['Ambiguity', 'More than one parse tree for a string: two different LMDs (or two RMDs). One LMD + one RMD proves nothing.'],
            ['Left rec.', 'A → Aα | β becomes A → βA\', A\' → αA\' | ε. LL(1) cannot be applied while it is there.']
          ]} />
        `, sec(4)),
        page(html`
          <${H2}>${t('Two trees, one string', 'شجرتين، string واحد')}</${H2}>
          <${Fig} name="cc-ambig-trees" />
        `),
        page(html`
          ${watch(A ? ['سؤال الـ leftmost parsing tree بتكبر منين؟ إجابة الـ key <b>right</b>. السلايدز مقالتهاش، بس اتسألت في 6 امتحانات بنفس الإجابة.', 'لو اشتقيت string مرة leftmost ومرة rightmost، ده <b>مش</b> إثبات ambiguity.', 'سؤال الجملة الغلط في الميدترم إجابته <b>none of the mentioned</b>.']
            : ['"A leftmost parsing tree grows from the ___": the key says <b>right</b>. Not in the slides, but asked in 6 papers with that answer.', 'Deriving a string once leftmost and once rightmost does <b>not</b> prove ambiguity.', 'The midterm\'s "Which statement is false?" → <b>none of the mentioned</b>.'])}
          <${Gap} h=${4} />
          ${mq('l4', /rule A → Ab \| c will cause/)}
        `),

        // ── Lecture 6 ──
        page(html`
          <${Lec} n="6" title=${t('FIRST, FOLLOW and LL(1) tables', 'الـ FIRST والـ FOLLOW وجدول الـ LL(1)')} />
          <${Know} rows=${A ? [
            ['الـ FIRST', 'الـ terminals اللي ممكن تبدأ بيها الـ strings الطالعة من α، ومعاهم ε لو α ممكن تختفي. الـ terminal الـ FIRST بتاعه هو نفسه، ولو أول symbol ممكن يختفي بص على اللي بعده.'],
            ['الـ FOLLOW', 'الـ terminals اللي بتيجي على يمين A على طول. الـ $ للـ start symbol. في <bdi dir="ltr">A → αBβ</bdi> الـ <bdi dir="ltr">FIRST(β) − ε</bdi> بتدخل <bdi dir="ltr">FOLLOW(B)</bdi>، ولو B في الآخر أو β بتختفي ننقل <bdi dir="ltr">FOLLOW(A)</bdi>. <b>عمرها ما فيها ε</b>.'],
            ['الجدول M', 'الـ <bdi dir="ltr">A → α</bdi> تحت كل a في <bdi dir="ltr">FIRST(α)</bdi>، ولو فيها ε تحت كل b في <bdi dir="ltr">FOLLOW(A)</bdi> ومعاهم $. الخانة الفاضية error، وخانة فيها entry-ين يبقى مش LL(1).'],
            ['الـ parse', 'الـ stack بيبدأ <bdi dir="ltr">S$</bdi> والـ input <bdi dir="ltr">w$</bdi>. terminal فوق = match، non-terminal = بدّله بـ <bdi dir="ltr">M[A, a]</bdi> وأول symbol فوق، والاتنين $ = accept.'],
            ['الاسم', 'الـ L الأولى scan من الشمال لليمين، والتانية leftmost derivation، والـ 1 lookahead واحد. ومفيش left recursion ولا ambiguity.']
          ] : [
            ['FIRST', 'Terminals that begin strings derived from α, plus ε if α can vanish. A terminal\'s FIRST is itself; if the first symbol can vanish, look through it.'],
            ['FOLLOW', 'Terminals right after A. $ for the start symbol. A → αBβ: FIRST(β) − ε into FOLLOW(B); B last or β vanishing: copy FOLLOW(A). <b>Never ε</b>.'],
            ['Table M', 'A → α under each a in FIRST(α); if ε ∈ FIRST(α), under each b in FOLLOW(A), $ included. Empty = error; two entries in a cell = not LL(1).'],
            ['Parse', 'Stack S$, input w$. Terminal on top = match; non-terminal = replace by M[A, a], first symbol on top; both $ = accept.'],
            ['LL(1)', 'Left-to-right scan, Leftmost derivation, 1 lookahead. No left recursion, no ambiguity.']
          ]} />
        `, sec(6)),
        page(html`
          <${H2}>${t('The exam grammar\'s table, cell by cell', 'جدول grammar الامتحان، خانة خانة')}</${H2}>
          <${Fig} name="cc-exam-table" />
        `),
        page(html`
          ${watch(A ? ['الـ ε-productions بتتحط تحت الـ <b>FOLLOW</b> symbols، مش تحت الـ FIRST.', 'لو فيه left recursion شيلها الأول: في <bdi dir="ltr">A → Abc | b</bdi> الخانة <bdi dir="ltr">M[A, b]</bdi> بيبقى فيها entry-ين.']
            : ['ε-productions go under the <b>FOLLOW</b> symbols, never under FIRST.', 'Remove left recursion first: with A → Abc | b, the cell M[A, b] gets two entries.'])}
          <${P} small=${true}>${X('The exam grammar <code>S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε</code>. Which set placed each entry?', 'grammar الامتحان<span class="ltr">S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε</span>أنهي مجموعة حطت كل entry؟')}</${P}>
          <${Sort} id="l6s" bins=${[['FI', 'FIRST'], ['FO', 'FOLLOW']]} items=${[
            ['<bdi dir="ltr">M[S, d] = S → UVW</bdi>', 0], ['<bdi dir="ltr">M[V, )] = V → ε</bdi>', 1], ['<bdi dir="ltr">M[W, $] = W → ε</bdi>', 1],
            ['<bdi dir="ltr">M[U, a] = U → aSb</bdi>', 0], ['<bdi dir="ltr">M[V, c] = V → ε</bdi>', 1]]} />
        `),

        // ── Lecture 7 ──
        page(html`
          <${Lec} n="7" title=${t('Attribute grammars and SDT', 'الـ attribute grammars والـ SDT')} />
          <${Know} rows=${A ? [
            ['الـ semantic', 'بتتأكد إن الـ declarations والـ statements صح في المعنى، باستخدام الـ syntax tree والـ symbol table. والـ type checking بيتعمل هنا (أثناء الـ SDT). بتاخد syntax tree وتطلّع <b>annotated syntax tree</b>.'],
            ['6 أخطاء', 'الـ type mismatch، والـ undeclared variable، والـ reserved identifier misuse، والـ multiple declaration في scope، والـ out-of-scope access، والـ actual/formal parameter mismatch.'],
            ['الـ AG', 'الـ attribute grammar هي CFG متعلّق attributes على الـ non-terminals بتوعها. والـ semantic analysis معمولة عليها.'],
            ['الـ SDT', 'اختصار <b>Syntax</b> Directed Translation: قواعد زيادة على الـ grammar بتستخدم الـ lexical values والـ constants والـ attributes. في <bdi dir="ltr">2 + 3 * 4</bdi> بنوصل لـ <bdi dir="ltr">E.val = 14</bdi>.'],
            ['الاتجاه', 'الـ synthesized من الـ children (لفوق). والـ inherited من الـ parent و/أو الـ siblings (لتحت).'],
            ['الـ assign', 'الـ definitely assigned، والـ definitely unassigned، والـ unknown (ممكن يكون اتعمله assign وممكن لأ).']
          ] : [
            ['Semantic', 'Checks declarations and statements are semantically correct, using the syntax tree and the symbol table. Type checking happens here (during SDT). Syntax tree in, <b>annotated syntax tree</b> out.'],
            ['6 errors', 'Type mismatch, undeclared variable, reserved identifier misuse, multiple declaration in a scope, out-of-scope access, actual/formal parameter mismatch.'],
            ['AG', 'An attribute grammar is a CFG with attributes attached to its non-terminals. Semantic analysis is modeled on it.'],
            ['SDT', '<b>Syntax</b> Directed Translation: rules added to the grammar using lexical values, constants and attributes. For 2 + 3 * 4 it reaches E.val = 14.'],
            ['Direction', 'Synthesized: from the children (upwards). Inherited: from the parent and/or siblings (downwards).'],
            ['Assigned', 'Definitely assigned, definitely unassigned, unknown (may or may not be assigned).']
          ]} />
        `, sec(7)),
        page(html`
          <${H2}>${t('SDT on 2 + 3 * 4, bottom-up', 'الـ SDT على 2 + 3 * 4، من تحت لفوق')}</${H2}>
          <${Fig} name="cc-sdt-eval" />
        `),
        page(html`
          ${watch(A ? ['الـ SDT هي <b>Syntax</b> Directed Translation، و"Semantic Directed" <b>غلط</b>.', 'الـ semantic analysis بتطلّع الـ annotated syntax tree، ودي <b>غلط</b>:<span class="ltr">"Semantic analysis produces semantic table"</span>', 'في 2021/22 اختيارات سؤال الـ child nodes كانت غلط مطبعي ‡، فإجابته <b>none of the mentioned</b>.']
            : ['SDT = <b>Syntax</b> Directed Translation. "Semantic Directed" is <b>False</b>.', 'Semantic analysis produces the annotated syntax tree; "produces semantic table" is <b>False</b>.', 'In 2021/22 the child-nodes question had the wrong options printed ‡, so its answer is <b>none of the mentioned</b>.'])}
          <${Sort} id="l7s" bins=${[['S', 'synthesized'], ['I', 'inherited']]} items=${A ? [
            ['بياخد القيمة من الـ child nodes', 0], ['بياخد من الـ parent و/أو الـ siblings', 1], ['في <bdi dir="ltr">S → ABC</bdi> الـ B بتاخد من S وA وC', 1], ['في <bdi dir="ltr">S → ABC</bdi> الـ S بتاخد من A وB وC', 0], ['الـ symbol table بيورثه الـ scope بتاع الـ declaration', 1]]
            : [['Takes its value from the child nodes', 0], ['Takes it from the parent and/or siblings', 1], ['In S → ABC, B takes values from S, A, C', 1], ['In S → ABC, S takes values from A, B, C', 0], ['A symbol table, inherited by the declaration\'s scope', 1]]} />
        `),

        // ── Lecture 8 ──
        page(html`
          <${Lec} n="8" title=${t('Binding, scope and symbol tables', 'الـ binding والـ scope والـ symbol tables')} />
          <${Know} rows=${A ? [
            ['الـ binding', 'بيربط الـ declaration باستخداماته. والـ scope هو الجزء من البرنامج اللي الـ identifier متاح فيه.'],
            ['الـ static', 'على حسب شكل الـ syntax tree (الأقواس والـ blocks)، من نص البرنامج بس، وقت الـ compile. معظم اللغات زي Java وC.'],
            ['الـ dynamic', 'آخر declaration اتقابل وقت التشغيل هو اللي بيتستخدم، فمينفعش يتحل وقت الـ compile. لغات قليلة: Lisp وSNOBOL وPerl.'],
            ['الـ output', 'جوّه الـ block الاتنين زي بعض. بعد القوس: الـ static بيرجع للـ declaration اللي برّه، والـ dynamic (قاعدة الكورس) بيفضل على اللي جوّه.'],
            ['الـ table', 'بيشيل type وscope level وأحيانًا location. أشهر implementation هو الـ hash table. جدول لكل scope مشكلته <b>memory overhead</b>، والحل جدول واحد: key يبقى <bdi dir="ltr">"identifier,scope_id"</bdi>، أو identifier ومعاه linked list والأحدث في الأول.']
          ] : [
            ['Binding', 'Connects a declaration to its uses. The scope of an identifier is the part of the program where it is accessible.'],
            ['Static', 'Follows the syntax tree\'s structure (braces, blocks): program text only, compile time. Most languages, e.g. Java, C.'],
            ['Dynamic', 'The most recently encountered declaration during execution is used; cannot be resolved at compile time. Lisp, SNOBOL, Perl.'],
            ['Output', 'Inside the block both agree. After the brace: static goes back to the outer declaration; dynamic (course rule) keeps the inner one.'],
            ['Table', 'Holds type, scope level, sometimes location; hash tables are the most common. One table per scope costs <b>memory overhead</b>; the fix is one table: key "identifier,scope_id", or identifier → linked list, newest first.']
          ]} />
        `, sec(8)),
        page(html`
          <${H2}>${t('Static vs dynamic, on the lecture\'s code', 'الـ static والـ dynamic على كود المحاضرة')}</${H2}>
          <${Fig} name="cc-static-dynamic" />
        `),
        page(html`
          ${watch(A ? ['الـ memory overhead مشكلة جدول لكل scope، <b>مش</b> مشكلة الجدول الواحد.', 'وفيه <b>أكتر من</b> approach للـ symbol tables، مش واحد بس.', 'والـ linked list <b>مش</b> بياخد وقت، لأن أول عنصر دايمًا هو الصح.']
            : ['"The problem of using a single hash table is memory overhead": <b>False</b> (that is the per-scope problem).', '"There is only one approach to implement symbol tables": <b>False</b>.', 'The linked list is <b>not</b> time consuming: the front item is always the right one.'])}
          <${Gap} h=${4} />
          ${mq('l8', /Dynamic object binding is done based/)}
        `),

        // ── Lecture 9 ──
        page(html`
          <${Lec} n="9" title=${t('Runtime, parameter passing, optimization', 'الـ runtime والـ parameters والـ optimization')} />
          <${Know} rows=${A ? [
            ['الـ storage', '<b>3</b> أنواع: الـ static (مكان ثابت، والأحجام معروفة من الأول، فمفيش runtime support)، والـ stack (LIFO للـ procedure calls، ومفيد للـ recursion)، والـ heap (بيتحجز ويتفك وقت التشغيل، للغات اللي فيها dynamic data structures).'],
            ['الـ layout', 'الـ text والـ static data ثابتين، والـ stack والـ heap في الطرفين وبيكبروا ويصغروا ناحية بعض.'],
            ['الـ params', 'الـ formal في تعريف الـ function، والـ actual في الـ call. الـ by value: نسخة رايحة بس. الـ by result: مفيش حاجة رايحة (بتبدأ 0) والنسخة بترجع. الـ value-result: رايحة وراجعة على العناوين اللي اتثبتت وقت الـ call. الـ reference: alias.'],
            ['الـ peephole', 'على جزء صغير اسمه window، وmachine dependent. الطرق: redundant load/store elimination، والـ constant folding <bdi dir="ltr">(x = 2*3 → 6)</bdi>، والـ combine operations.'],
            ['الـ loop', 'بتحسّن الـ cache performance وتقلل الـ overhead: احسب <bdi dir="ltr">arr.length</bdi> مرة واحدة برّه اللوب.']
          ] : [
            ['Storage', '<b>3</b> types: static (fixed location, sizes known in advance, no runtime support), stack (LIFO for procedure calls, good for recursion), heap (allocated and freed at run time; for languages with dynamic data structures).'],
            ['Layout', 'Text and static data are fixed; stack and heap sit at the two ends and grow and shrink against each other.'],
            ['Params', 'Formal = in the definition, actual = in the call. Value: copy in only. Result: nothing in (formals start at 0), copy back. Value-result: in and back, to the addresses fixed at the call. Reference: aliases.'],
            ['Peephole', 'On a small window of code, machine dependent: redundant load/store elimination, constant folding (x = 2*3 → 6), combine operations.'],
            ['Loop', 'Improves cache performance and reduces overheads: compute arr.length once, outside the loop.']
          ]} />
        `, sec(9)),
        page(html`
          <${H2}>${t('The memory layout to draw', 'الـ memory layout اللي هترسمه')}</${H2}>
          <${Fig} name="cc-mem-layout" />
        `),
        page(html`
          ${watch(A ? ['دي <b>غلط</b>، لأن الـ queue مش نوع storage:<span class="ltr">"static, queue &amp; heap"</span>', 'الـ annotated syntax tree <b>مش</b> طريقة optimization، والـ peephole <b>مش</b> على اللوبس بس، والـ constant folding <b>مش</b> الطريقة الوحيدة.']
            : ['"Storage … static, queue & heap": <b>False</b>; a queue is not a storage type.', 'The annotated syntax tree is <b>not</b> an optimization method; peephole is <b>not</b> only for loops; constant folding is <b>not</b> the only technique.'])}
          <${P} small=${true}>${t('Name the technique. R = redundant load/store, F = constant folding, C = combine operations, L = loop optimization.', 'سمّي الطريقة. الـ R يعني redundant load/store، والـ F يعني constant folding، والـ C يعني combine operations، والـ L يعني loop optimization.')}</${P}>
          <${Sort} id="l9s" bins=${[['R', 'redundant load/store elimination'], ['F', 'constant folding'], ['C', 'combine operations'], ['L', 'loop optimization']]} items=${[
            ['<bdi dir="ltr">z = i; w = z * 3;  →  w = y * 3;</bdi>', 0], ['<bdi dir="ltr">x = 2 * 3;  →  x = 6;</bdi>', 1], ['<bdi dir="ltr">X = (2*3)+5; y = X – Sqrt(3*8);  →  X = 11; y = 11 – Sqrt(24);</bdi>', 2],
            [A ? 'نحسب <bdi dir="ltr">arr.length</bdi> مرة واحدة في size' : 'arr.length stored once in size', 3]]} />
        `),

        // ══ The problems that always come up ══
        page(html`
          <${H1}>${t('The problems that always come up', 'المسائل اللي بتيجي كل سنة')}</${H1}>
          <${P} small=${true}>${t('Every written problem type of the past finals, each with a real paper\'s numbers and then a fresh one of ours. You solve them on the page.', 'كل نوع مسألة written في الامتحانات اللي فاتت، بأرقام امتحان حقيقي، وبعدين واحدة جديدة من عندنا. وإنت اللي بتحلها على الصفحة.')}</${P}>
          <${Tb} head=${A ? ['المسألة', 'الدرجة', 'جت في'] : ['Problem', 'Marks', 'Asked in']} rows=${A ? [
            ['من NFA لـ DFA', '6–8', 'كل الفاينالات'], ['إثبات الـ ambiguity', '6–8', 'كل الفاينالات'], ['الـ LL(1) parser', '6–12', '4 فاينالات'], ['الـ static والـ dynamic', '6–8', '4 فاينالات'],
            ['الـ parameter passing', '6–8', '3 فاينالات'], ['الـ optimization', '6–8', '5 فاينالات'], ['رسمة الـ phases والـ memory', '6–8', '3 فاينالات'], ['الـ compare والـ SDT والـ FA', '4–8', '5 فاينالات']]
            : [['NFA → DFA', '6–8', 'every final'], ['Prove ambiguity', '6–8', 'every final'], ['LL(1) parser', '6–12', '4 finals'], ['Static vs dynamic', '6–8', '4 finals'],
              ['Parameter passing', '6–8', '3 finals'], ['Optimize the code', '6–8', '5 finals'], ['Phases / memory figure', '6–8', '3 finals'], ['Compare, SDT, regex → FA', '4–8', '5 finals']]} />
          <${Hand} red=${true}>${t('The first two are on every paper since 2021/22: up to 16 marks you can lock in tonight.', 'أول اتنين في كل امتحان من 2021/22: لحد 16 درجة تقدر تضمنهم النهارده.')}</${Hand}>
        `, { sec: t('The problems that always come up', 'المسائل اللي بتيجي كل سنة') }),

        // NFA → DFA
        page(html`
          <${H2}>${t('Problem 1: NFA → DFA', 'المسألة 1: من NFA لـ DFA')}</${H2}>
          <${Method} steps=${A ? ['اكتب <b>سبب</b> إنها NFA (عليه درجة).', 'اعمل الجدول الأول بعمود ε.', 'ابدأ بالـ <bdi dir="ltr">ε-closure</bdi> بتاع الـ start. لكل set ولكل symbol: اجمع الـ moves، وخد الـ closure.', 'كل set جديدة تبقى row جديد، لحد ما مفيش جديد.', 'الـ final = كل set فيها final state أصلية. والخانة الفاضية dead state.']
            : ['Write the <b>reason</b> it is an NFA (it carries marks).', 'Write the first table with an ε column.', 'Start from the start state\'s ε-closure. For every set and symbol: union the moves, then take the closure.', 'Every new set becomes a new row, until no new sets appear.', 'Final = every set containing an original final state. An empty cell is a dead state.']} />
          <${H3}>${t('The NFA from 2024/25 (50) Q2-c and Summer 2025 Q2-b', 'الـ NFA بتاعة 2024/25 (50) Q2-c وSummer 2025 Q2-b')}</${H3}>
          <${Edges} M=${NFA.ex1} />
          <${Tb} mono=${true} c=${true} head=${['state', '0', '1', 'ε']} rows=${[['→ 1', '3', '–', '1'], ['2', '3', '–', '2'], ['* 3', '1', '2,3', '3']]} />
          <${Hand} red=${true}>${t('reason: state 3 has a loop on 1 and another transition on 1 (to 2)', 'السبب: الـ state 3 عليها loop على 1 وكمان transition على 1 (لـ 2)')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('Final 2024/25 (50) Q2-c · Summer 2025 Q2-b', 'فاينال 2024/25 (50) Q2-c · Summer 2025 Q2-b')}</${Paper}></div>
          <${P} small=${true}>${t('No ε here, so the DFA starts at {1}. Fill each row, then check it.', 'مفيش ε هنا، فالـ DFA بتبدأ من {1}. املا كل صف وصحّحه.')}</${P}>
          <${Builder} id="b-ex1" M=${NFA.ex1} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('{2,3} on 0: 2 gives 3 and 3 gives 1, so <b>{1,3}</b> (an MCQ in 2024/25 (50)). {3} on 1 is <b>{2,3}</b>. All three sets with 3 are final.', 'الـ <bdi dir="ltr">{2,3}</bdi> على 0: الـ 2 بتدّي 3 والـ 3 بتدّي 1، يبقى <b><bdi dir="ltr">{1,3}</bdi></b>، ودي جت MCQ في امتحان <bdi dir="ltr">2024/25 (50)</bdi>. والـ <bdi dir="ltr">{3}</bdi> على 1 بتدّي <b><bdi dir="ltr">{2,3}</bdi></b>. والتلات sets اللي فيها 3 كلهم final.')}</p></${Box}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('Final 2024/25 (60) Q1-b · revision sheet Q16', 'فاينال 2024/25 (60) Q1-b · الـ revision sheet Q16')}</${Paper}></div>
          <${Edges} M=${NFA.ex2} />
          <${P} small=${true}>${X('With an ε, start from the closure E(1) = {1,3}, and take the closure again after every move.', 'لما يبقى فيه ε، ابدأ من الـ closure <bdi dir="ltr">E(1) = {1,3}</bdi>، وخد الـ closure تاني بعد كل move.')}</${P}>
          <${Builder} id="b-ex2" M=${NFA.ex2} />
        `),
        page(html`
          <${H2}>${t('Four more paper NFAs', 'أربع NFAs كمان من الامتحانات')}</${H2}>
          <${Switch} id="nfa-p" tabs=${['2023/24 (60) Q2-d', '2023/24 (50) Q2-c', t('Summer 23/24 Q2-d', 'Summer 23/24 Q2-d'), '2021/22 Q2-c']} body=${k => {
            const key = ['p2324', 'srm', 's2324', 'p2122'][k];
            const note = [t('Reason: state 2 loops on a and also goes to 3 on a.', 'السبب: الـ state 2 عليها loop على a وبتروح لـ 3 على a.'),
              t('Reason: S loops on 0 and also goes to R on 0.', 'السبب: الـ S عليها loop على 0 وبتروح لـ R على 0.'),
              t('Reason: state 1 loops on a and also goes to 2 on a.', 'السبب: الـ state 1 عليها loop على a وبتروح لـ 2 على a.'),
              t('‡ Here the loop on 3 is labelled 0; the sheet draws it on 1.', '‡ هنا الـ loop على 3 مكتوب عليه 0، والـ sheet راسماه على 1.')][k];
            return html`<${React.Fragment} key=${key}><${Edges} M=${NFA[key]} /><${Builder} id=${'b-' + key} M=${NFA[key]} /><p className="hf-compilerF-msg" style=${{ color: 'var(--graphite)' }}>${note}</p></${React.Fragment}>`; }} />
        `),
        page(html`
          <div className="hf-row"><${Paper} ours=${true}>${t('Practice: our own NFA', 'تدريب: NFA من عندنا')}</${Paper}></div>
          <${Edges} M=${NFA.ours} />
          <${P} small=${true}>${t('Fresh numbers, same method. First: why is it an NFA? Then convert it.', 'أرقام جديدة ونفس الطريقة. الأول: ليه دي NFA؟ وبعدين حوّلها.')}</${P}>
          <${Reveal} id="r-nfa-ours" label=${t('Show the reason', 'اعرض السبب')}><p className="hf-hand red">${t('A loops on a and also goes to B on a; B loops on b and also goes to C on b; and C has an ε edge. Any one is enough.', 'الـ A عليها loop على a وبتروح لـ B على a، والـ B عليها loop على b وبتروح لـ C على b، والـ C فيها ε. أي واحدة منهم كفاية.')}</p></${Reveal}>
          <${Builder} id="b-ours" M=${NFA.ours} />
        `),

        // ambiguity
        page(html`
          <${H2}>${t('Problem 2: prove the grammar is ambiguous', 'المسألة 2: أثبت إن الـ grammar ambiguous')}</${H2}>
          <${Method} steps=${A ? ['ابدأ من الـ start symbol، وفي كل خطوة بدّل <b>أول non-terminal على الشمال</b>.', 'اكتب <b>LMD 1</b> لحد ما توصل للـ string.', 'اكتب <b>LMD 2</b> مختلفة لنفس الـ string: اختار production تانية في خطوة.', 'ارسم <b>الشجرتين</b>.', 'اكتب الجملة: اتنين leftmost derivations (شجرتين) لنفس الـ string، يبقى ambiguous.']
            : ['Start at the start symbol; at every step replace the <b>leftmost non-terminal</b>.', 'Write <b>LMD 1</b> down to the string.', 'Write a different <b>LMD 2</b> for the same string: pick another production at some step.', 'Draw <b>both trees</b>.', 'Conclude: two leftmost derivations (two trees) for one string, so it is ambiguous.']} />
          <${H3}>${t('The trees for id-id+id (E → E + E | E-E | id)', 'الشجرتين بتوع id-id+id')}</${H3}>
          <div className="hf-compilerF-two hf-in" dir="ltr"><${Pre} lines=${['      E', '    / | \\', '   E  +  E', ' / | \\   |', 'E  -  E  id', '|     |', 'id    id']} /><${Pre} lines=${['   E', ' / | \\', 'E  -  E', '|   / | \\', 'id E  +  E', '   |     |', '   id    id']} /></div>
          <${Hand} red=${true}>${t('tree 1 = (id-id)+id, tree 2 = id-(id+id)', 'الشجرة 1 = (id-id)+id، والشجرة 2 = id-(id+id)')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2024/25 (50) Q2-e · Summer 2025 Q2-e · 2023/24 (60) Q2-c', '2024/25 (50) Q2-e · Summer 2025 Q2-e · 2023/24 (60) Q2-c')}</${Paper}></div>
          <${Code} lines=${['E → E + E | E-E | id', ['string: id-id+id', t('3 papers, same question', '3 امتحانات، نفس السؤال')]]} />
          <${P} small=${true}>${t('Be the parser\'s author: build LMD 1, then a different LMD 2. The leftmost non-terminal is coloured; a choice that can\'t reach the string is refused.', 'ابني LMD 1 وبعدين LMD 2 مختلفة. أول non-terminal على الشمال ملوّن، والاختيار اللي مش هيوصل للـ string بيترفض.')}</${P}>
          <${LmdGame} id="lmd-id" G=${AMB.idid[0]} w=${AMB.idid[1]} />
        `),
        page(html`
          <${H2}>${t('Three more paper grammars', 'تلات grammars كمان من الامتحانات')}</${H2}>
          <${Switch} id="amb-p" tabs=${['001101', 'aaac', '(num/num)+num']} body=${k => {
            const paper = ['2023/24 (50) Q2-b · 2021/22 Q2-b', '2024/25 (60) Q1-c', 'Summer 2023/24 Q2-c'][k];
            const key = ['s001', 'aaac', 'num'][k];
            const g = [['S → 0A | 1B', 'A → 0AA | 1S | 1', 'B → 1BB | 0S | 0'], ['S → AB    A → AA | a', 'B → Tc    T → aT | a'], ['E → E op E | (E) | +E | num', 'op → + | - | * | / | ε']][k];
            const note = [t('In LMD 1 the first A of 0AA uses A → 1S; in LMD 2 it uses A → 1.', 'في LMD 1 أول A في <bdi dir="ltr">0AA</bdi> بتاخد <bdi dir="ltr">A → 1S</bdi>، وفي LMD 2 بتاخد <bdi dir="ltr">A → 1</bdi>.'),
              t('Either A makes aa (and T makes a), or A makes a (and T makes aa).', 'يا الـ A تعمل aa والـ T تعمل a، يا الـ A تعمل a والـ T تعمل aa.'),
              t('The + is either op → +, or op → ε followed by E → +E.', 'الـ + يا إما <bdi dir="ltr">op → +</bdi>، يا <bdi dir="ltr">op → ε</bdi> وبعدها <bdi dir="ltr">E → +E</bdi>.')][k];
            return html`<${React.Fragment} key=${key}><div className="hf-row"><${Paper}>${paper}</${Paper}></div><${Code} lines=${g} /><${LmdGame} id=${'lmd-' + key} G=${AMB[key][0]} w=${AMB[key][1]} /><p className="hf-compilerF-msg" style=${{ color: 'var(--graphite)' }}>${T(note)}</p></${React.Fragment}>`; }} />
        `),
        page(html`
          <div className="hf-row"><${Paper} ours=${true}>${t('Practice: our own grammar', 'تدريب: grammar من عندنا')}</${Paper}></div>
          <${Code} lines=${['S → aS | Sb | c', 'string: acb']} />
          <${LmdGame} id="lmd-ours" G=${AMB.ours[0]} w=${AMB.ours[1]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Both of your derivations must be <b>leftmost</b>. A leftmost one and a rightmost one of the same string prove nothing: every string has both.', 'الاتنين لازم يبقوا <b>leftmost</b>. لو جبت واحدة leftmost وواحدة rightmost لنفس الـ string مش بتثبت حاجة، لأن أي string ليه الاتنين.')}</p></${Box}>
        `),

        // LL(1)
        page(html`
          <${H2}>${t('Problem 3: the LL(1) parser (12 marks)', 'المسألة 3: الـ LL(1) parser (12 درجة)')}</${H2}>
          <${Method} steps=${A ? ['فيه left recursion؟ شيلها: <bdi dir="ltr">A → βA\'</bdi> و<bdi dir="ltr">A\' → αA\' | ε</bdi>.', 'الـ FIRST لكل non-terminal (ابدأ من تحت).', 'الـ FOLLOW: الـ $ للـ start الأول، وبعدين القاعدتين لحد ما مفيش جديد.', 'الجدول M. خانة فيها entry-ين يبقى مش LL(1).', 'الـ trace: Stack | Input | Action لحد الـ accept.']
            : ['Left recursion? Remove it: A → βA\', A\' → αA\' | ε.', 'FIRST of every non-terminal (bottom up).', 'FOLLOW: $ for the start first, then the two rules until nothing changes.', 'Table M. A cell with two entries = not LL(1).', 'The trace: Stack | Input | Action until accept.']} />
          <div className="hf-row"><${Paper}>${t('Final 2024/25 (60) Q1-e · 2023/24 (60) Q2-e', 'فاينال 2024/25 (60) Q1-e · 2023/24 (60) Q2-e')}</${Paper}></div>
          <${Code} lines=${['S → UVW', 'U → (S) | aSb | d', 'V → aV | ε', ['W → cW | ε', t('no left recursion', 'مفيش left recursion')]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('FOLLOW(S) gets <b>)</b> from U → (S) and <b>b</b> from U → aSb, not only $. V and W can both vanish, so FOLLOW(U) = FIRST(VW) − ε plus FOLLOW(S).', 'الـ <bdi dir="ltr">FOLLOW(S)</bdi> بتاخد <b>)</b> من <bdi dir="ltr">U → (S)</bdi> و<b>b</b> من <bdi dir="ltr">U → aSb</bdi>، مش $ بس. والـ V والـ W الاتنين بيختفوا، فالـ <bdi dir="ltr">FOLLOW(U)</bdi> هي <bdi dir="ltr">FIRST(VW) − ε</bdi> ومعاها <bdi dir="ltr">FOLLOW(S)</bdi>.')}</p></${Box}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2024/25 (60) Q1-e · step 1: the sets', '2024/25 (60) Q1-e · الخطوة 1: المجموعات')}</${Paper}></div>
          <${SetPick} id="sp-uvw" G=${GR.uvw} syms=${['(', 'a', 'd', 'c', 'b', ')', '$', 'ε']} rows=${[['FIRST(S)', 'FI', 'S'], ['FIRST(U)', 'FI', 'U'], ['FIRST(V)', 'FI', 'V'], ['FIRST(W)', 'FI', 'W'], ['FOLLOW(S)', 'FO', 'S'], ['FOLLOW(U)', 'FO', 'U'], ['FOLLOW(V)', 'FO', 'V'], ['FOLLOW(W)', 'FO', 'W']]} />
          <${Grow} />
          <${Hand}>${t('FOLLOW(V) = {c} ∪ FOLLOW(S), because W can vanish; FOLLOW(W) = FOLLOW(S)', 'الـ FOLLOW(V) = {c} ∪ FOLLOW(S) لأن W بتختفي، والـ FOLLOW(W) = FOLLOW(S)')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2024/25 (60) Q1-e · step 2: table M', '2024/25 (60) Q1-e · الخطوة 2: الجدول M')}</${Paper}></div>
          <${P} small=${true}>${t('Nine cells are missing. Each shows the right side of its row\'s production; — means empty.', 'ناقص تسع خانات. كل خانة فيها الـ right side بتاع production الصف، والـ — معناها فاضية.')}</${P}>
          <${TableFill} id="tf-uvw" G=${GR.uvw} ts=${['(', 'a', 'd', 'c', 'b', ')', '$']} blanks=${[['S', '('], ['U', 'a'], ['U', 'd'], ['V', 'a'], ['V', 'c'], ['V', '$'], ['W', 'c'], ['W', 'b'], ['W', 'a']]} />
          <${Grow} />
          <${Hand} red=${true}>${t('M[V, )] = V → ε was an MCQ in the same paper. No cell has two entries: the grammar is LL(1).', 'الـ M[V, )] = V → ε جت MCQ في نفس الامتحان. ومفيش خانة فيها entry-ين، فالـ grammar ده LL(1).')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2024/25 (60) Q1-e · step 3: parse (dc)ac', '2024/25 (60) Q1-e · الخطوة 3: الـ parse لـ (dc)ac')}</${Paper}></div>
          <${BeParser} id="bp-uvw" G=${GR.uvw} w=${[...'(dc)ac']} view=${7} />
          <${Grow} />
          <${Hand}>${t('18 rows: 11 expansions, 6 matches, then accept', '18 صف: 11 expansion و6 match، وبعدين accept')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2023/24 (50) Q2-e · Summer 2023/24 Q2-e', '2023/24 (50) Q2-e · Summer 2023/24 Q2-e')}</${Paper}></div>
          <${Code} lines=${['S → aABe', ['A → Abc | b', t('← left recursive', '← left recursive')], 'B → d']} />
          <${P} small=${true}>${X('Prove <b>abbcde</b> is correct. Step 0, the rewrite: <code>A → bA\'</code>, <code>A\' → bcA\' | ε</code>.', 'أثبت إن <b>abbcde</b> صح. الخطوة 0 التحويل: <code>A → bA\'</code> و<code>A\' → bcA\' | ε</code>.')}</${P}>
          <${SetPick} id="sp-abe" G=${GR.abe} syms=${['a', 'b', 'c', 'd', 'e', '$', 'ε']} rows=${[['FIRST(A\')', 'FI', "A'"], ['FIRST(B)', 'FI', 'B'], ['FOLLOW(S)', 'FO', 'S'], ['FOLLOW(A)', 'FO', 'A'], ['FOLLOW(A\')', 'FO', "A'"], ['FOLLOW(B)', 'FO', 'B']]} />
          <${Hand} red=${true}>${t('FOLLOW(A) = FIRST(B) = {d}; the left-recursive original would put two entries in M[A, b]', 'الـ FOLLOW(A) = FIRST(B) = {d}، والـ grammar الأصلي كان هيحط entry-ين في M[A, b]')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2023/24 (50) Q2-e · the table and the parse', '2023/24 (50) Q2-e · الجدول والـ parse')}</${Paper}></div>
          <${Code} lines=${["M[S,a] = S → aABe    M[A,b] = A → bA'", "M[A',b] = A' → bcA'  M[A',d] = A' → ε", 'M[B,d] = B → d']} />
          <${BeParser} id="bp-abe" G=${GR.abe} w=${[...'abbcde']} view=${7} />
          <${Grow} />
          <${Hand}>${t('accept = "the string is correct": write that sentence in the exam', 'الـ accept معناها إن الـ string صح: اكتب الجملة دي في الامتحان')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper} ours=${true}>${t('Practice: our own grammar', 'تدريب: grammar من عندنا')}</${Paper}></div>
          <${Code} lines=${['S → (L) | x', ['L → L,S | S', t('← left recursive', '← left recursive')]]} />
          <${Reveal} id="r-ll-ours" label=${t('Show the rewrite', 'اعرض التحويل')}><${Code} lines=${["L → SL'", "L' → ,SL' | ε"]} /></${Reveal}>
          <${SetPick} id="sp-ours" G=${GR.ours} syms=${['(', ')', 'x', ',', '$', 'ε']} rows=${[['FIRST(S)', 'FI', 'S'], ['FIRST(L)', 'FI', 'L'], ["FIRST(L')", 'FI', "L'"], ['FOLLOW(S)', 'FO', 'S'], ['FOLLOW(L)', 'FO', 'L'], ["FOLLOW(L')", 'FO', "L'"]]} />
          <${Hand}>${t('the comma is a terminal here: S can be followed by , ) and $', 'الـ comma هنا terminal: الـ S ممكن ييجي بعدها , و) و$')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper} ours=${true}>${t('Practice: table and parse of (x,x)', 'تدريب: الجدول والـ parse لـ (x,x)')}</${Paper}></div>
          <${TableFill} id="tf-ours" G=${GR.ours} ts=${['(', ')', 'x', ',', '$']} blanks=${[['S', '('], ['S', 'x'], ['L', 'x'], ["L'", ')'], ["L'", ','], ["L'", '$']]} />
          <${BeParser} id="bp-ours" G=${GR.ours} w=${[...'(x,x)']} view=${5} />
        `),

        // binding
        page(html`
          <${H2}>${t('Problem 4: static vs dynamic output', 'المسألة 4: الـ output في الـ static والـ dynamic')}</${H2}>
          <${Method} steps=${A ? ['جوّه الـ block: الاتنين بيستخدموا الـ declaration اللي جوّه، فأول print واحد.', 'بعد القوس: الـ <b>static</b> بيرجع للـ declaration اللي برّه.', 'والـ <b>dynamic</b> (قاعدة الكورس): آخر declaration اتنفّذ لسه هو اللي شغال، يعني اللي جوّه.', 'اكتب جدول: كل print وقيمته في الـ static والـ dynamic.']
            : ['Inside the block both use the inner declaration, so the first print is the same.', 'After the brace, <b>static</b> goes back to the outer declaration.', '<b>Dynamic</b> (the course\'s rule): the most recently executed declaration, the inner one, is still used.', 'Write a table: every print, its static and its dynamic value.']} />
          <${H3}>${t('The linked-list table, 2021/22 Q2-d', 'جدول الـ linked list في 2021/22')}</${H3}>
          <${Pre} lines=${['i -> [1|YES|next] -> [0|YES|NULL]', 'w -> [0|YES|NULL]']} />
          <${P} small=${true}>${X('One hash table; each name points to its declarations, <b>newest first</b>: scope | initialized? | next. The inner i (scope 1) sits in front of the outer i (scope 0).', 'جدول hash واحد، وكل اسم بيشاور على الـ declarations بتاعته <b>والأحدث في الأول</b>: الـ scope والـ initialized والـ next. الـ i اللي جوّه (scope 1) قدّام الـ i اللي برّه (scope 0).')}</${P}>
          <${Hand} red=${true}>${t('the dynamic rule is the course\'s convention from L8 and the sheet; write it that way', 'قاعدة الـ dynamic دي بتاعة الكورس من المحاضرة 8 والـ sheet، اكتبها كده')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Be the runtime: three papers', 'خليك إنت الـ runtime: تلات امتحانات')}</${H2}>
          <${Switch} id="bind-p" tabs=${['2023/24 (60) Q2-b', '2021/22 Q2-d', t('2023/24 (50) · Summer 23/24', '2023/24 (50) · Summer 23/24')]} body=${k => {
            const code = [['int a = 10;  int b = 20;', '{  int a = 30;', '   b *= a;  cout<<b;  }', 'b += a;  cout<<b;'], ['int i = 10, w = 20;', '{  int i = 3;', '   w += i;  cout<<w;  }', 'w += i;  cout<<w;'],
              ['int x = 1;  int y = 2;', '{  int x = 3*2;', '   y += x;', '   cout<<"x= "<<x<<"y= "<<y;  }', 'y += x;', 'cout<<"x= "<<x<<"y= "<<y;']][k];
            const st = A ? 'الـ static' : 'static', dy = A ? 'الـ dynamic' : 'dynamic';
            const rows = [
              [[st, [['b', 600, [200, 600, 610, 630]], ['b', 610, [200, 600, 610, 630]]]], [dy, [['b', 600, [200, 600, 610, 630]], ['b', 630, [200, 600, 610, 630]]]]],
              [[st, [['w', 23, [23, 26, 30, 33]], ['w', 33, [23, 26, 30, 33]]]], [dy, [['w', 23, [23, 26, 30, 33]], ['w', 26, [23, 26, 30, 33]]]]],
              [[st, [['x', 6, [1, 6]], ['y', 8, [3, 8, 9, 14]], ['x', 1, [1, 6]], ['y', 9, [3, 8, 9, 14]]]], [dy, [['x', 6, [1, 6]], ['y', 8, [3, 8, 9, 14]], ['x', 6, [1, 6]], ['y', 14, [3, 8, 9, 14]]]]]][k];
            return html`<${React.Fragment} key=${k}><${Pre} lines=${code} /><${Fill} id=${'fb-' + k} rows=${rows} /></${React.Fragment}>`; }} />
          <${Hand}>${t('cells in order: the inner print first, then the print after the block', 'الخانات بالترتيب: الـ print اللي جوّه الأول، وبعدين اللي بعد الـ block')}</${Hand}>
        `),
        page(html`
          <div className="hf-row"><${Paper} ours=${true}>${t('Practice: our own code', 'تدريب: كود من عندنا')}</${Paper}></div>
          <${Code} lines=${['int m = 4;  int n = 5;', '{  int m = 7;', '   n *= m;  cout<<n;  }', 'n += m;  cout<<m<<" "<<n;']} />
          <${Fill} id="fb-ours" rows=${[[t('static', 'الـ static'), [['n', 35, [20, 35]], ['m', 4, [4, 7]], ['n', 39, [24, 35, 39, 42]]]], [t('dynamic', 'الـ dynamic'), [['n', 35, [20, 35]], ['m', 7, [4, 7]], ['n', 42, [24, 35, 39, 42]]]]]} />
          <${Reveal} id="r-bind-ours" label=${t('Show the working', 'اعرض الحل')}><p className="hf-p small">${X('Inside: n = 5 × 7 = 35 in both. After: static uses the outer m = 4, so n = 35 + 4 = 39; dynamic keeps m = 7, so n = 35 + 7 = 42.', 'جوّه: <bdi dir="ltr">n = 5 × 7 = 35</bdi> في الاتنين. بعد الـ block: الـ static بيستخدم m اللي برّه = 4، يبقى <bdi dir="ltr">n = 35 + 4 = 39</bdi>، والـ dynamic بيفضل على m = 7، يبقى <bdi dir="ltr">n = 35 + 7 = 42</bdi>.')}</p></${Reveal}>
          <${P} small=${true}>${t('Now draw its symbol table with linked lists. Which name gets two records?', 'ارسم الـ symbol table بالـ linked lists. أنهي اسم هياخد record-ين؟')}</${P}>
          <${Reveal} id="r-bind-ll" label=${t('Show the table', 'اعرض الجدول')}><${Pre} lines=${['m -> [1|YES|next] -> [0|YES|NULL]', 'n -> [0|YES|NULL]']} /></${Reveal}>
        `),

        // parameter passing
        page(html`
          <${H2}>${t('Problem 5: parameter passing outputs', 'المسألة 5: الـ output في الـ parameter passing')}</${H2}>
          <${Tb} head=${A ? ['الطريقة', 'وقت الـ call', 'وقت الـ return'] : ['Mode', 'At the call', 'At return']} rows=${A ? [['الـ by value', 'نسخة رايحة', 'ولا حاجة'], ['الـ by result', 'ولا حاجة، والـ formals بتبدأ 0', 'نسخة راجعة'], ['الـ value-result', 'نسخة رايحة', 'نسخة راجعة'], ['الـ reference', 'الـ formals هي الـ actuals نفسها', '—']]
            : [['by value', 'copy in', 'nothing'], ['by result', 'nothing (formals start at 0)', 'copy back'], ['by value-result', 'copy in', 'copy back'], ['by reference', 'formals are aliases of the actuals', '—']]} />
          <${Method} steps=${A ? ['حدد الـ call بالظبط: في <bdi dir="ltr">f(i, a[i])</bdi> عوّض بقيمة i <b>وقت الـ call</b>.', 'اكتب الـ formals في الأول على حسب الطريقة.', 'نفّذ جسم الـ function، والـ <bdi dir="ltr">a[2] := 0</bdi> بيغيّر الـ array الـ global.', 'في الـ result والـ value-result: انسخ الـ formals راجعين على <b>العناوين اللي اتثبتت وقت الـ call</b>.', 'اكتب الـ output: قبل، وجوّه، وبعد.']
            : ['Fix the call: in f(i, a[i]) substitute i\'s value <b>at the call</b>.', 'Set the formals for the mode.', 'Run the body; a[2] := 0 changes the global array.', 'By result and value-result: copy the formals back to <b>the addresses fixed at the call</b>.', 'Write the output: before, inside, after.']} />
          <${Box} kind="watch"><p className="hf-p small">${X('When x is bound to a[2], the copy-back of x <b>overwrites</b> the a[2] := 0. By value it stays 0.', 'لما x تبقى مربوطة بـ <bdi dir="ltr">a[2]</bdi>، النسخة الراجعة بتاعة x <b>بتكتب فوق</b> الـ <bdi dir="ltr">a[2] := 0</bdi>. وفي الـ by value بتفضل 0.')}</p></${Box}>
        `),
        page(html`
          <${Switch} id="pp-p" tabs=${['Summer 2025 Q2-c · sheet Q12', '2021/22 Q2-e']} body=${k => {
            const key = ['s25', 'p2122'][k], P0 = PP[key];
            const code = [['int a[] = {10,20,30};  int i = 2;', 'my_function(int j, int x) {', '  j:=j+1; x:=x+3; a[2]:=0;', '  print j x a }', 'main: print i a;', '  my_function(i, a[i]); print i a'],
              ['int a[] = {2,4,6};  int i = 1;', 'method(int y, int x) {', '  y:=y+2; x:=x+8; a[2]:=0;', '  print y x a }', 'main: print i a;', '  method(i, a[i]); print i a']][k];
            const modes = [[['value', 'by value'], ['result', 'by result'], ['vr', 'value-result']], [['result', 'by result'], ['vr', 'value-result']]][k];
            return html`<${React.Fragment} key=${key}><${Pre} lines=${code} /><p className="hf-compilerF-msg">${T(A ? (k ? 'الـ call هي <bdi dir="ltr">method(i, a[1])</bdi> لأن i = 1.' : 'الـ call هي <bdi dir="ltr">my_function(i, a[2])</bdi> لأن i = 2، وقبل الـ call بيطبع <bdi dir="ltr">2 10 20 30</bdi>.') : (k ? 'The call is method(i, a[1]) because i = 1. Before it main prints 1 2 4 6.' : 'The call is my_function(i, a[2]) because i = 2. Before it main prints 2 10 20 30.'))}</p>
              <${Switch} id=${'pp-m' + k} tabs=${modes.map(m => m[1])} body=${m => html`<${Fill} key=${m} id=${'pp-' + key + '-' + modes[m][0]} rows=${passRows(P0, modes[m][0], A, true)} />`} /></${React.Fragment}>`; }} />
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('Final 2024/25 (60) Q1-d', 'فاينال 2024/25 (60) Q1-d')}</${Paper}></div>
          <${Pre} lines=${['swap(int a, int b) { temp = a;', '  a = b; b = temp; cout<<a<<" "<<b; }', 'int value=2, list[5]={1,3,5,7,9};', 'swap(value, list[0]);', '  cout<<value<<" "<<list[0];', 'swap(value, list[value]);', '  cout<<value<<" "<<list[value];']} />
          <${Switch} id="sw-m" tabs=${['by value', 'by value-result']} body=${m => html`<${Fill} key=${m} id=${'sw-' + m} rows=${[
            [t('swap 1', 'الـ swap 1'), [['a', 1, [1, 2]], ['b', 2, [1, 2]]]], [t('main 1', 'الـ main 1'), [['value', m ? 1 : 2, [1, 2]], ['list[0]', m ? 2 : 1, [1, 2]]]],
            [t('swap 2', 'الـ swap 2'), [['a', m ? 3 : 5, [3, 5]], ['b', m ? 1 : 2, [1, 2]]]], [t('main 2', 'الـ main 2'), [['value', m ? 3 : 2, [2, 3]], ['list[value]', m ? 7 : 5, [1, 5, 7]]]]]} />`} />
          <${P} small=${true}>${X('Value-result: call 2 is swap(1, list[1]) and copies back value = 3, list[1] = 1, so main prints list[3] = 7. ‡ Re-evaluating list[value] at return gives "3 1"; we follow the lecture (address fixed at the call).', 'في الـ value-result الـ call التانية هي <bdi dir="ltr">swap(1, list[1])</bdi>، فالـ main بيطبع <bdi dir="ltr">3 7</bdi>. ‡ لو حسبت <bdi dir="ltr">list[value]</bdi> تاني وقت الـ return هتطلع <bdi dir="ltr">"3 1"</bdi>، وإحنا ماشيين على المحاضرة.')}</${P}>
        `),
        page(html`
          <div className="hf-row"><${Paper} ours=${true}>${t('Practice: all four modes', 'تدريب: الأربع طرق')}</${Paper}></div>
          <${Pre} lines=${['int a[] = {5,7,9};  int i = 1;', 'f(int j, int x) {', '  j:=j+4; x:=x+1; a[1]:=0;', '  print j x a }', 'main: print i a;', '  f(i, a[i]); print i a']} />
          <${Switch} id="pp-om" tabs=${['value', 'result', 'value-result', 'reference']} body=${m => { const md = ['value', 'result', 'vr', 'ref'][m]; return html`<${Fill} key=${m} id=${'pp-ours-' + md} rows=${passRows(PP.ours, md, A, true)} />`; }} />
          <${Hand} red=${true}>${t('here x is a[1] and the body zeroes a[1]: watch who wins in each mode', 'هنا الـ x مربوطة بنفس الخانة اللي الـ body بيصفّرها: شوف مين بيكسب في كل طريقة')}</${Hand}>
        `),

        // optimization
        page(html`
          <${H2}>${t('Problem 6: propose optimizations', 'المسألة 6: اقترح optimizations')}</${H2}>
          <div className="hf-row"><${Paper}>${t('2023/24 (50) Q2-d · Summer 2023/24 Q2-a', '2023/24 (50) Q2-d · Summer 2023/24 Q2-a')}</${Paper}></div>
          <${Code} lines=${['double d; string s[10];', 'int result;', 'int x = 1;   int y = 2;', '{ int x = 3*2;', '  result = (2+3) * sqrt(2*8);', '  y += x; … }']} />
          <${Reveal} id="r-opt" label=${t('Show the model answer', 'اعرض الإجابة النموذجية')}><${UL} items=${A ? ['<b>الـ constant folding</b> و<b>الـ combine operations</b>:<span class="ltr">int x = 3*2 → int x = 6</span><span class="ltr">result = (2+3)*sqrt(2*8) → 20</span>بتتحسب مرة واحدة وقت الـ compile.', '<b>شيل الـ variables اللي مش مستخدمة</b> ‡: الـ d والـ <bdi dir="ltr">s[10]</bdi>، والـ result كمان لأنه اتعمله assign وعمره ما اتستخدم، عشان نوفّر memory.']
            : ['<b>Constant folding</b> and <b>combine operations</b>: int x = 3*2 → int x = 6; result = (2+3)*sqrt(2*8) → 20, computed once at compile time.', '<b>Remove unused variables</b> ‡: d and s[10] (and result, assigned but never used) to save memory.']} /></${Reveal}>
          <${Box} kind="watch"><p className="hf-p small">${X('Always <b>name the technique</b> and give the folded value. ‡ Removing unused variables is the site\'s answer, not one of the slides\' three peephole techniques.', 'دايمًا <b>سمّي الطريقة</b> واكتب القيمة بعد الـ folding. ‡ شيل الـ variables اللي مش مستخدمة دي إجابة الموقع، مش من تلات طرق الـ peephole في السلايدز.')}</p></${Box}>
        `),
        page(html`
          <div className="hf-row"><${Paper}>${t('2024/25 (50) Q2-b · Summer 2025 Q2-d · sheet Q4', '2024/25 (50) Q2-b · Summer 2025 Q2-d · sheet Q4')}</${Paper}></div>
          <${Code} lines=${['for (i=0; i < a->length-1; i++)', '   swap_elements(a[i],a[i+1]);']} />
          <${Hand} arrow="down" red=${true}>${t('loop optimization', 'الـ loop optimization')}</${Hand}>
          <${Code} lines=${['int x = a->length-1;', 'for (i=0; i < x; i++)', '   swap_elements(a[i],a[i+1]);']} />
          <${P} small=${true}>${X('length-1 is computed <b>once</b> instead of on every iteration, which saves processing time (the same idea as the slide\'s arr.length → size).', 'الـ <bdi dir="ltr">length-1</bdi> بتتحسب <b>مرة واحدة</b> بدل كل لفة، فبنوفّر وقت. ودي نفس فكرة <bdi dir="ltr">arr.length → size</bdi> في السلايد.')}</${P}>
          <${Box} kind="pencil" title=${t('Ours: optimize these two', 'من عندنا: حسّن دول')}><${Code} lines=${['for (i=0; i < n*2; i++)', '   total += a[i];', 'double area = 3.5 * 2;']} />
            <${Reveal} id="r-loop-ours" label=${t('Show the answer', 'اعرض الإجابة')}><${Code} lines=${['int m = n*2;', 'for (i=0; i < m; i++) …', 'double area = 7.0;']} /></${Reveal}></${Box}>
        `),

        // figures to draw
        page(html`
          <${H2}>${t('Problem 7: show by figure the phases', 'المسألة 7: ارسم الـ phases')}</${H2}>
          <div className="hf-row"><${Paper}>${t('2024/25 (50) Q2-a · Summer 2025 Q2-a · sheet Q1', '2024/25 (50) Q2-a · Summer 2025 Q2-a · sheet Q1')}</${Paper}></div>
          <${OrderIt} id="ord-ph" heads=${[t('tap in order', 'دوس بالترتيب'), t('your figure', 'الرسمة بتاعتك')]} items=${['Scanner', 'Parser', 'Semantic analyzer', 'Source code optimizer', 'Code generator', 'Target code optimizer']} mix=${[3, 0, 5, 1, 4, 2]} />
          <${P} small=${true}>${X('Then label the arrows: <b>tokens, syntax tree, annotated tree, intermediate code, target code</b>, and draw the literal table, symbol table and error handler at the side, connected to all six.', 'وبعدين اكتب على الأسهم: <b>tokens وsyntax tree وannotated tree وintermediate code وtarget code</b>، وارسم الـ literal table والـ symbol table والـ error handler على الجنب متوصّلين بالستة.')}</${P}>
        `),
        page(html`
          <${H2}>${t('Problem 8: the memory layout', 'المسألة 8: الـ memory layout')}</${H2}>
          <div className="hf-row"><${Paper}>${t('Final 2024/25 (60) Q1-a (6 marks) · sheet Q3', 'فاينال 2024/25 (60) Q1-a (6 درجات) · الـ sheet Q3')}</${Paper}></div>
          <${OrderIt} id="ord-mem" heads=${[t('tap top to bottom', 'دوس من فوق لتحت'), t('your figure', 'الرسمة بتاعتك')]} items=${['Text (code)', 'Static data', 'Stack ↓', 'free space', 'Heap ↑']} mix=${[2, 4, 0, 3, 1]} />
          <${P} small=${true}>${X('Mark text and static data <b>fixed</b>, stack and heap <b>dynamic</b>, then describe the three allocations: static (fixed location, no runtime support), stack (LIFO, procedure activations, recursion), heap (allocated and freed at run time).', 'اكتب إن الـ text والـ static data <b>fixed</b>، والـ stack والـ heap <b>dynamic</b>. وبعدين اشرح التلات allocations: الـ static مكان ثابت ومفيش runtime support، والـ stack هو LIFO للـ activations والـ recursion، والـ heap بيتحجز ويتفك وقت التشغيل.')}</${P}>
        `),
        page(html`
          <${H2}>${t('The short written questions', 'الأسئلة الـ written القصيرة')}</${H2}>
          <${Switch} id="sw-short" tabs=${[t('Compiler vs interpreter', 'compiler وinterpreter'), t('Purpose of SDT', 'الغرض من الـ SDT'), t('Synthesized vs inherited', 'synthesized وinherited')]} body=${k => [
            html`<${React.Fragment} key="0"><div className="hf-row"><${Paper}>2023/24 (50) Q2-a · 2021/22 Q2-a</${Paper}></div><${Tb} head=${A ? ['الـ interpreter', 'الـ compiler'] : ['Interpreter', 'Compiler']} rows=${A ? [['statement واحدة في المرة', 'البرنامج كله مرة واحدة'], ['analysis أقل، execution أبطأ', 'analysis أكتر، execution أسرع'], ['مفيش intermediate object code، فموفّر memory', 'بيطلّع object code محتاج linking، memory أكتر'], ['JavaScript وPython وRuby', 'C و<bdi dir="ltr">C++</bdi> وJava']]
              : [['one statement at a time', 'the entire program as a whole'], ['less analysis time, slower execution', 'more analysis time, faster execution'], ['no intermediate object code, memory efficient', 'object code that needs linking, more memory'], ['JavaScript, Python, Ruby', 'C, C++, Java']]} /></${React.Fragment}>`,
            html`<${React.Fragment} key="1"><div className="hf-row"><${Paper}>2023/24 (60) Q2-a · Summer 2023/24 Q2-b</${Paper}></div><${P} small=${true}>${X('SDT adds <b>augmented (translation) rules</b> to the grammar to facilitate semantic analysis. It passes information <b>bottom-up and/or top-down</b> the parse tree as <b>attributes</b> attached to the nodes, using lexical values, constants and attributes. Build the parse/syntax tree, compute the attributes by visiting the nodes in some order, and you get the <b>annotated syntax tree</b>. Example: E → E1 + T { E.val = E1.val + T.val } gives E.val = 14 for 2+3*4.',
              'الـ SDT بتضيف <b>augmented rules</b> للـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات <b>من تحت لفوق و/أو من فوق لتحت</b> في الـ parse tree على شكل <b>attributes</b> متعلّقة على الـ nodes، وبتستخدم الـ lexical values والـ constants والـ attributes. نبني الشجرة، ونحسب الـ attributes بزيارة الـ nodes بترتيب معيّن، فيطلع الـ <b>annotated syntax tree</b>. مثال:<span class="ltr">E → E1 + T { E.val = E1.val + T.val }  ⇒  E.val = 14 for 2+3*4</span>')}</${P}></${React.Fragment}>`,
            html`<${React.Fragment} key="2"><div className="hf-row"><${Paper}>${t('revision sheet Q8', 'الـ revision sheet Q8')}</${Paper}></div><${P} small=${true}>${X('<b>Synthesized</b> attributes are passed <b>upwards</b>, from the leaves to the root: a node\'s value comes from its children. <b>Inherited</b> attributes are passed <b>downwards</b>, from the parent and/or siblings. Information synthesized in one subtree may be inherited by another. Example: a symbol table is synthesized by a declaration and inherited by the scope of the declaration.',
              'الـ <b>synthesized</b> بتطلع <b>لفوق</b> من الـ leaves للـ root: قيمة الـ node من الـ children بتوعها. والـ <b>inherited</b> بتنزل <b>لتحت</b> من الـ parent و/أو الـ siblings. والمعلومة اللي اتعملها synthesize في subtree ممكن subtree تانية تورثها. مثال: الـ symbol table بيتعمل synthesize من الـ declaration ويورثه الـ scope بتاعه.')}</${P}></${React.Fragment}>`][k]} />
        `),
        page(html`
          <${H2}>${t('Problem 9: regex ↔ finite automaton', 'المسألة 9: من regex لـ FA والعكس')}</${H2}>
          <div className="hf-row"><${Paper}>${t('2024/25 (50) Q2-d · sheet Q7, Q14', '2024/25 (50) Q2-d · الـ sheet Q7 وQ14')}</${Paper}></div>
          <${Code} lines=${['b*a+(c|d):', '  →q0 (loop b) –a→ q1 (loop a)', '  q1 –c,d→ q2*', '(a|b)*(c+|d+):', '  →q0 (loop a,b)', '  q0 –c→ q1* (loop c)', '  q0 –d→ q2* (loop d)']} />
          <${P} small=${true}>${X('The c\'s and d\'s need <b>separate final states</b> so they cannot mix.', 'الـ c والـ d محتاجين <b>final states منفصلين</b> عشان ميتخلطوش.')}</${P}>
          <${H3}>${t('Backwards: FA → regex (sheet Q14)', 'والعكس: من FA لـ regex (الـ sheet Q14)')}</${H3}>
          <${Code} lines=${['1 –ε→ 2 (loop a) –a→ 3 –b→ 5', '1 –a→ 4 (loop b) –b→ 5*']} />
          <${Hand} red=${true}>${t('= a+b | ab+', '= a+b | ab+')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Accepted or rejected?', 'مقبول ولا مرفوض؟')}</${H2}>
          <${P} small=${true}>${t('Run each string through the two automata of the last page.', 'مشّي كل string على الـ automata اللي في الصفحة اللي فاتت.')}</${P}>
          <${Sort} id="fa-s" bins=${[['✓', t('accepted', 'مقبول')], ['✗', t('rejected', 'مرفوض')]]} items=${[['<bdi dir="ltr">b*a+(c|d):  bbaad</bdi>', 0], ['<bdi dir="ltr">b*a+(c|d):  bc</bdi>', 1], ['<bdi dir="ltr">b*a+(c|d):  baac</bdi>', 0], ['<bdi dir="ltr">(a|b)*(c+|d+):  abccc</bdi>', 0], ['<bdi dir="ltr">(a|b)*(c+|d+):  cd</bdi>', 1], ['<bdi dir="ltr">(a|b)*(c+|d+):  d</bdi>', 0]]} />
        `),

        // ══ Cross-lecture showdowns ══
        page(html`
          <${Fireside} sub=${t('Tonight: a Regular Expression (L2) and a Context-Free Grammar (L4), who keep getting mixed up in the MCQs.', 'قعدة الليلة: Regular Expression من المحاضرة 2 وContext-Free Grammar من المحاضرة 4، اللي الناس بتلخبطهم في الـ MCQ.')} />
          <${Chat} names=${[t('Regular expression', 'الـ Regular expression'), t('CFG', 'الـ CFG')]} lines=${A ? [
            [0, 'أنا بوصف الـ <b>tokens</b>. الـ scanner معمول عليّا وعلى المكن بتاعتي، الـ <b>finite automata</b>.'],
            [1, 'وأنا بوصف <b>شكل البرنامج</b>. الـ parser معمول عليّا، والـ syntax analysis كلها.'],
            [0, 'عندي <code>* + |</code> وقوانين جبر: <code>aε = a</code>، و<code>r(s|t) = rs|rt</code>.'],
            [1, 'وأنا عندي أربع حاجات: <code>V, Σ, P, S</code>. ومفيش حاجة اسمها end symbol، مهما الامتحان حاول.'],
            [0, 'والـ NFA بتاعتي دايمًا ليها DFA.'],
            [1, 'بس ولا واحدة منهم تقدر تتأكد إن الأقواس مقفولة. أنا أقدر: <code>U → (S)</code>.']
          ] : [
            [0, 'I describe <b>tokens</b>. The scanner is modeled on me and my machines, the <b>finite automata</b>.'],
            [1, 'I describe the <b>structure of the program</b>. The parser, the whole syntax analysis, is modeled on me.'],
            [0, 'I have * + | and algebra laws: aε = a, r(s|t) = rs|rt.'],
            [1, 'I have four parts: V, Σ, P and S. No "end symbol", however hard the exam tries.'],
            [0, 'And every NFA of mine has a DFA.'],
            [1, 'But none of them can check balancing tokens like parentheses. I can: U → (S).']
          ]} />
        `, { sec: t('Cross-lecture showdowns', 'مواجهات بين المحاضرات') }),
        page(html`
          <${Chat} names=${[t('Regular expression', 'الـ Regular expression'), t('CFG', 'الـ CFG')]} start=${1} lines=${A ? [
            [0, 'وإنت ممكن تبقى <b>ambiguous</b>: اتنين leftmost derivations لنفس الـ string.'],
            [1, 'صح، grammar الـ <code>id-id+id</code> كل سنة. وعندي كمان left recursion لازم تتشال قبل الـ LL(1).'],
            [0, 'يعني إنت أقوى بس أتعب.'],
            [1, 'وأنا كمان مش كفاية. مبعرفش الـ x اتعملها declare ولا لأ.']
          ] : [
            [0, 'And you can be <b>ambiguous</b>: two leftmost derivations of one string.'],
            [1, 'Yes, E → E + E | E-E | id on id-id+id, every year. And my left recursion must go before LL(1).'],
            [0, 'So you are stronger, but more trouble.'],
            [1, 'And even I am not enough. I can\'t tell whether x was declared.']
          ]} />
          <${Talk} who="table" flip=${true}>${X('That is the <b>attribute grammar</b>\'s job: a CFG with attributes on its non-terminals. Semantic analysis is modeled on it.', 'دي شغلانة الـ <b>attribute grammar</b>: CFG عليه attributes على الـ non-terminals. والـ semantic analysis معمولة عليها.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('"One of the modeling criteria of lexical analysis" → <b>finite automata</b>. "Syntax analysis is modeled on" → <b>context free grammar</b>. "Semantic analysis is modeled on" → <b>attribute grammar</b>.', 'معايير الـ modeling: الـ lexical على <b>finite automata</b>، والـ syntax على <b>context free grammar</b>، والـ semantic على <b>attribute grammar</b>.')}</p></${Box}>
        `),
        page(html`
          <${Interview} title=${t('ε, exposed', 'الـ ε على المكشوف')} sub=${t('The smallest guest in four lectures.', 'أصغر ضيف في أربع محاضرات.')} lines=${A ? [
            ['المذيع', 'إنت في المحاضرة 2 و3 و4 و6. مين إنت أصلًا؟'],
            ['الـ ε', 'أنا الـ empty string. في الـ regex أنا العنصر المحايد:<span class="ltr">aε = εa = a,   Yε = εY = Y</span>'],
            ['المذيع', 'وفي الـ automata؟'],
            ['الـ ε', 'الـ ε edge بتتحرك من غير ما تقرا input. واحدة بس كفاية تخلّي الـ automaton NFA، والـ DFA مينفعش يبقى فيها.'],
            ['المذيع', 'بتغيّر اللغة؟'],
            ['الـ ε', 'لأ، دي <b>غلط</b>. الـ ε-closure بتبلعني جوّه الـ DFA.'],
            ['المذيع', 'وفي الـ grammars؟'],
            ['الـ ε', 'شيل الـ left recursion تلاقيني في <bdi dir="ltr">A\' → αA\' | ε</bdi>. وفي الـ FIRST معناي إن الـ symbol ممكن يختفي.'],
            ['المذيع', 'والـ FOLLOW؟'],
            ['الـ ε', '<b>عمري ما بدخلها</b>. لما β تختفي انقل <bdi dir="ltr">FOLLOW(A)</bdi>. والـ productions بتاعة ε بتتحط تحت الـ FOLLOW في الجدول.']
          ] : [
            ['Head First', 'You are in lectures 2, 3, 4 and 6. Who are you?'],
            ['ε', 'The empty string. In regular expressions I am the identity: aε = εa = a, Yε = εY = Y.'],
            ['Head First', 'And in automata?'],
            ['ε', 'An ε edge moves without reading input. One is enough to make an automaton an NFA, and a DFA cannot have me.'],
            ['Head First', 'Do you change the language accepted?'],
            ['ε', 'No, that statement is <b>False</b>. The ε-closures absorb me in the DFA.'],
            ['Head First', 'And in grammars?'],
            ['ε', 'Remove left recursion and you get A\' → αA\' | ε. In FIRST I mean "this can vanish".'],
            ['Head First', 'FOLLOW?'],
            ['ε', '<b>Never.</b> When β vanishes, copy FOLLOW(A) instead. And ε-productions go under FOLLOW in table M.']
          ]} />
        `),
        page(html`
          <${H2}>${t('Which part of the compiler?', 'أنهي جزء في الـ compiler؟')}</${H2}>
          <${P} small=${true}>${t('The whole course in one exercise. Lex = lexical, Syn = syntax, Sem = semantic (L7–L8), Run = runtime and optimization (L9).', 'الكورس كله في تمرين واحد. الـ Lex يعني lexical، والـ Syn يعني syntax، والـ Sem يعني semantic (7 و8)، والـ Run يعني runtime وoptimization (9).')}</${P}>
          <${Sort} id="all-s" bins=${[['Lex', 'lexical analysis'], ['Syn', 'syntax analysis'], ['Sem', 'semantic analysis'], ['Run', 'runtime / optimization']]} items=${A ? [
            ['الـ keywords بتتعرف هنا', 0], ['بيشيل الـ comments والـ white space', 0], ['بيشيّك على grammar البرنامج', 1], ['بنشيل الـ left recursion قبله', 1],
            ['الـ type checking', 2], ['معمول على attribute grammar', 2], ['الـ heap للـ dynamic data structures', 3], ['الـ constant folding في الـ peephole', 3]]
            : [['Keywords are recognized here', 0], ['Removes comments and white space', 0], ['Checks the grammar of the program', 1], ['Left recursion must be removed first', 1],
              ['Type checking', 2], ['Modeled on an attribute grammar', 2], ['The heap, for dynamic data structures', 3], ['Constant folding in peephole optimization', 3]]} />
        `),

        // ══ Exam corner ══
        page(html`
          <${H2}>${t('Exam corner', 'ركن الامتحان')}</${H2}>
          <${P} small=${true}>${t('The doctors\' own questions from the papers. Tap an answer to see why.', 'أسئلة الدكاترة نفسها من الامتحانات. دوس على إجابة عشان تعرف ليه.')}</${P}>
          ${mq('x1', /major difference between the phases of compilers/)}
          ${mq('x2', /^"Compilers generate intermediate code in order/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('x3', /process of generating \(searching for matched\) tokens/)}
          ${mq('x4', /exaclty two a's/)}
        `),
        page(html`
          ${mq('x5', /following condition will cause any automaton/)}
          ${mq('x7', /^Any NFA accepts/)}
        `),
        page(html`
          ${mq('x6', /^"DFAs and NFAs only recognize/)}
          ${mq('x8', /When only one rightmost or only one leftmost/)}
        `),
        page(html`
          ${mq('x9', /Which of the following statement is false/)}
          ${mq('x18', /^"Peephole optimization is only done/)}
        `),
        page(html`
          <${Pre} lines=${['S→UVW  U→(S)|aSb|d  V→aV|ε  W→cW|ε']} />
          ${mq('x10', /FOLLOW\(U\) is/)}
          ${mq('x11', /which entry is M\[V, \)\]/)}
        `),
        page(html`
          ${mq('x12', /Semantic analysis uses/)}
          ${mq('x14', /major problem when creating a symbol table per scope/)}
        `),
        page(html`
          ${mq('x15', /What does the LAST prin/)}
          ${mq('x16', /stack memory allocation for/)}
        `),
        page(html`
          ${mq('x17', /NOT a method of optimization/)}
          ${mq('x13', /^The attributes that get values from the attribute values of their child/)}
        `),
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t('Few short LL(1) questions in the papers, so here is one of the site\'s own. Ours, not the doctors\'.', 'أسئلة الـ LL(1) القصيرة قليلة في الامتحانات، فده سؤال من الموقع. من عندنا، مش من الدكاترة.')}</p></${Box}>
          ${pq('p1', /two L's and the 1 stand for/)}
        `),

        // ══ Exam day ══
        page(html`
          <${H2}>${t('Exam day: the plan', 'يوم الامتحان: الخطة')}</${H2}>
          <${P} small=${true}>${t('Our advice, built from the papers\' structure: every paper is 120 minutes.', 'نصيحة من عندنا، مبنية على شكل الامتحانات: كل امتحان 120 دقيقة.')}</${P}>
          <${Tb} head=${A ? ['الجزء', 'الـ 60 درجة', 'الـ 50 درجة'] : ['Part', '60 marks', '50 marks']} rows=${A ? [['اقرا الورقة كلها', '5 دقايق', '5 دقايق'], ['الـ MCQ والصح والغلط (20)', '25 دقيقة', '25 دقيقة'], ['الـ written، لكل درجة', 'دقيقتين: المسألة الـ 8 درجات 16 دقيقة، والـ 12 درجة 24', 'دقيقتين ونص: المسألة الـ 6 درجات 15 دقيقة'], ['المراجعة في الآخر', '10 دقايق', '10 دقايق'], ['المجموع', '120 دقيقة', '115 دقيقة']]
            : [['Read the whole paper', '5 min', '5 min'], ['MCQ + True/False (20)', '25 min', '25 min'], ['Written, per mark', '2 min: 16 min for 8 marks, 24 for 12', '2.5 min: 15 min for 6 marks'], ['Check at the end', '10 min', '10 min'], ['Total', '120 min', '115 min']]} />
          <${H3}>${t('The night before (ours)', 'الليلة اللي قبلها (من عندنا)')}</${H3}>
          <${UL} items=${A ? ['قيّم نفسك تاني في أول صفحة، وراجع المحاضرات اللي لسه مهزوزة.', 'حل واحدة NFA وواحدة ambiguity وواحدة LL(1) على ورقة من غير ما تبص.', 'اعمل الفاينال التجريبي بالوقت (آخر صفحة).'] : ['Rate yourself again on the first page; revisit the shaky lectures.', 'Solve one NFA, one ambiguity and one LL(1) on paper without looking.', 'Take the timed mock final (last page).']} />
        `, { sec: t('Exam day', 'يوم الامتحان') }),
        page(html`
          <${H2}>${t('Checklist: where marks get lost', 'شيّك على نفسك: الدرجات بتضيع فين')}</${H2}>
          <${Box} kind="watch"><ul className="hf-ul">${(A ? [
            'الـ NFA: نسيت تكتب السبب، أو بدأت من الـ state مش من الـ ε-closure، أو نسيت الـ final.',
            'الـ ambiguity: LMD من غير شجر، أو LMD وRMD، أو من غير جملة الخلاصة.',
            'الـ LL(1): مشلتش الـ left recursion، أو نسيت $ في الـ FOLLOW(S)، أو حطيت ε-production تحت الـ FIRST، أو الـ trace مخلصش بـ accept.',
            'الـ binding: بعد القوس الـ static برّه والـ dynamic جوّه. والـ params: الـ result بيبدأ 0، والنسخة بترجع على العنوان اللي اتثبت وقت الـ call.',
            'الـ optimization: سمّي الطريقة واكتب القيمة. والرسومات: اكتب fixed وdynamic والأسهم.'
          ] : [
            'NFA: no reason written; starting from the state instead of its ε-closure; final states forgotten.',
            'Ambiguity: LMDs without trees; one LMD + one RMD; no conclusion sentence.',
            'LL(1): left recursion not removed; $ missing from FOLLOW(S); an ε-production under FIRST; a trace that never reaches accept.',
            'Binding: after the brace static = outer, dynamic = inner. Params: by result starts at 0; copy back to the address fixed at the call.',
            'Optimization: name the technique and give the value. Figures: label fixed/dynamic and the arrows.'
          ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
        `),

        // ══ Bullet points ══
        page(html`
          <${Bullets} items=${A ? [
            'الـ phases:<span class="ltr">scanner → parser → semantic analyzer → source optimizer → code generator → target optimizer</span>والـ symbol table والـ literal table والـ error handler والـ testing <b>مش phases</b>.',
            'الـ interpreter أسرع في الـ analysis وأبطأ في الـ execution ومفيهوش intermediate code. والـ compiler بيبيّن الـ <b>syntax</b> errors.',
            'الـ lexical معمول على RE وFA، والـ syntax على CFG، والـ semantic على attribute grammar.',
            'القانون <code>aε = a</code>، والـ <code>(X|Y)*</code> مش هي <code>X*|Y*</code>، والـ concatenation ترتيبها مهم.',
            'علامة الـ NFA: إما ε، أو loop ومعاه move بنفس الـ symbol. والـ loop لوحده مش كفاية. والـ DFA بتبدأ من الـ <code>ε-closure</code>، والـ final هي أي set فيها final.',
            'الـ ambiguity معناها اتنين LMD، يعني شجرتين، لنفس الـ string. والـ leftmost tree بتكبر من اليمين حسب الـ key.'
          ] : [
            'Phases: scanner → parser → semantic analyzer → source optimizer → code generator → target optimizer. Symbol table, literal table, error handler and testing are <b>not phases</b>.',
            'Interpreter: quick to analyze, slow to execute, no intermediate code. A compiler indicates <b>syntax</b> errors.',
            'Lexical = RE + FA; syntax = CFG; semantic = attribute grammar.',
            'aε = a; (X|Y)* ≠ X*|Y*; order matters in concatenation.',
            'NFA = an ε, or a loop plus a move on the same symbol; a loop alone is not enough. The DFA starts at the ε-closure; final = any set with a final state.',
            'Ambiguous = two LMDs (two trees) for one string. A leftmost tree grows from the right (the key).'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ left recursion:<span class="ltr">A → Aα | β  ⇒  A → βA\',  A\' → αA\' | ε</span>',
            'الـ FOLLOW(S) فيها $، والـ FOLLOW عمرها ما فيها ε، والـ ε-productions تحت الـ FOLLOW.',
            'الـ synthesized من الـ children، والـ inherited من الـ parent والـ siblings. والـ SDT اختصار Syntax Directed Translation.',
            'الـ static بالأقواس وقت الـ compile، والـ dynamic آخر declaration اتنفّذ. ومشكلة جدول لكل scope هي الـ memory overhead.',
            'الـ storage تلاتة: الـ static، والـ stack للـ calls، والـ heap للـ dynamic data. والـ by result بيبدأ 0 وبيرجع على عنوان الـ call.',
            'الـ peephole: الـ redundant load/store، والـ constant folding، والـ combine operations. والـ loop: احسب الـ length برّه.'
          ] : [
            'Left recursion: A → Aα | β becomes A → βA\', A\' → αA\' | ε.',
            '$ ∈ FOLLOW(S); FOLLOW never holds ε; ε-productions go under FOLLOW.',
            'Synthesized from the children; inherited from the parent/siblings. SDT = Syntax Directed Translation.',
            'Static = braces, compile time; dynamic = the most recent declaration executed. Per-scope tables cost memory overhead.',
            'Three storage types: static, stack (calls), heap (dynamic). By result starts at 0 and copies back to the call\'s address.',
            'Peephole: redundant load/store, constant folding, combine operations. Loop: compute the length once, outside.'
          ]} />
        `),

        // ══ The end ══
        page(html`
          <div className="hf-end">
            <${H1}>${t('You have the whole course.', 'الكورس كله معاك.')}</${H1}>
            <${Talk} who="compiler">${t('Now prove it under exam conditions. Good luck in the final!', 'دلوقتي أثبتها في ظروف الامتحان. بالتوفيق في الفاينال!')}</${Talk}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: LECS.slice(), mock: 40, t: Date.now() } }}>${t('Timed mock final (40)', 'فاينال تجريبي بالوقت (40)')}</${K.Go}>
              <${K.Go} to=${{ mode: 'quiz', quizPreset: { lecs: LECS.slice(), only: 'prof', t: Date.now() } }}>${t('All the doctors\' questions', 'كل أسئلة الدكاترة')}</${K.Go}>
            </div>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} to=${{ mode: 'read', lec: 'fin', anchor: null }}>${t('The final summary', 'ملخص الفاينال')}</${K.Go}>
              <${K.Go} to=${{ mode: 'papers' }}>${t('Past papers', 'الامتحانات اللي فاتت')}</${K.Go}>
            </div>
          </div>
        `, { center: true })
      ];
    }
  };
})();

// Visuals for the Modeling & Simulation notes (names 'ms-…'), built on figs.js (window.FIGKIT).
// Labels and captions come from the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('mf-accent')) { const s = document.createElement('style'); s.id = 'mf-accent'; s.textContent = '[data-fig^="ms-"]{ --fig-k: var(--k-ms); --fig-s: var(--s-ms); }'; document.head.appendChild(s); } })();
/* ── part 1 ── */
// Modeling & Simulation visuals, part 1: L1 (Introduction to Modeling and Simulation). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf1 .fig-btn.mf1-sel{ border-color:var(--k-ms); box-shadow:0 0 0 1px var(--k-ms); background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)); }
.mf1-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.mf1-row .fig-btn{ font-size:.84rem; padding:4px 10px; }
.mf1-note{ font-size:.85rem; color:var(--graphite); text-align:center; margin:8px 0 0; line-height:1.4; }
.mf1-k{ color:var(--k-ms); font-weight:700; }
.mf1 svg text{ font-family:var(--body); }
.mf1 svg text.mf1-kt{ fill:var(--k-ms); font-weight:700; }
.mf1 svg text.mf1-gt{ fill:var(--graphite); }
.mf1 svg text.mf1-wt{ fill:#fff; font-weight:700; }
.mf1 svg text.mf1-pt{ fill:var(--pen); font-weight:700; }
.mf1 svg text.mf1-ot{ fill:var(--ok); font-weight:700; }
.mf1 .mf1-box{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.5; transition:fill .4s, stroke .4s; }
.mf1 .mf1-hot{ fill:color-mix(in srgb, var(--k-ms) 18%, var(--paper)); stroke:var(--k-ms); stroke-width:2.5; transition:fill .4s, stroke .4s; }
.mf1 .mf1-ln{ stroke:var(--graphite); stroke-width:1.6; fill:none; }
.mf1 .mf1-kl{ stroke:var(--k-ms); stroke-width:3; fill:none; stroke-linecap:round; stroke-linejoin:round; }
.mf1 .mf1-fade{ transition:opacity .5s; }
.mf1-pill{ display:inline-block; padding:1px 8px; border-radius:99px; font-size:.82rem; font-weight:700; border:1px solid currentColor; }
/* evaluate tree */
.mf1-ev{ max-width:560px; margin:0 auto; text-align:center; }
.mf1-top{ display:inline-block; padding:8px 18px; border-radius:8px; background:var(--s-ms); color:#fff; font-weight:700; font-size:1.05rem; line-height:1.25; }
.mf1-top small{ display:block; font-weight:500; font-size:.86rem; }
.mf1-stem{ width:2px; height:14px; background:var(--graphite); margin:0 auto; }
.mf1-ev-cols{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px; border-top:2px solid var(--graphite); padding-top:12px; }
.mf1-ev-c{ font:inherit; color:var(--ink); text-align:inherit; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; cursor:pointer; transition:opacity .4s, box-shadow .4s; }
.mf1-ev-c b{ display:block; color:var(--k-ms); font-size:.98rem; }
.mf1-ev-c span{ display:block; font-size:.86rem; line-height:1.38; margin-top:5px; }
.mf1-ev-c .mf1-pb{ color:var(--pen); }
.mf1-ev-c.dim{ opacity:.45; } .mf1-ev-c.on{ box-shadow:0 0 0 2px var(--k-ms); }
@media (max-width:560px){ .mf1-ev-cols{ grid-template-columns:1fr; border-top:0; border-left:2px solid var(--graphite); padding:0 0 0 12px; text-align:left; margin-left:6px; } }
/* chips and cards */
.mf1-cards{ display:grid; gap:6px; max-width:520px; margin:0 auto; }
.mf1-cd{ display:grid; grid-template-columns:110px minmax(0, 1fr); gap:8px; align-items:start; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 10px; font-size:.9rem; line-height:1.35; color:var(--ink); transition:opacity .4s, box-shadow .4s; }
.mf1-cd > b{ color:var(--k-ms); font-size:.86rem; }
.mf1-cd.on{ box-shadow:0 0 0 2px var(--k-ms); } .mf1-cd.dim{ opacity:.4; }
@media (max-width:420px){ .mf1-cd{ grid-template-columns:1fr; gap:2px; } }
/* quiz */
.mf1-q{ max-width:520px; margin:0 auto; text-align:center; }
.mf1-q .big{ font-size:1.12rem; font-weight:700; padding:14px 10px; border:1px solid var(--line); border-radius:12px; background:var(--paper); margin-bottom:10px; }
.mf1-q .fig-btn.ok{ border-color:var(--ok); box-shadow:0 0 0 2px var(--ok); } .mf1-q .fig-btn.no{ border-color:var(--pen); box-shadow:0 0 0 2px var(--pen); }
.mf1-score{ font-size:.88rem; color:var(--graphite); margin-top:8px; }
/* state grid */
.mf1-st{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:5px; max-width:360px; margin:8px auto 0; transition:opacity .4s; }
.mf1-st div{ border:1px solid var(--line); border-radius:6px; background:var(--paper); text-align:center; padding:3px 2px; font-size:.86rem; color:var(--ink); transition:box-shadow .4s, background .4s; }
.mf1-st div b{ display:block; font:700 1rem var(--mono); }
.mf1-st div.on{ box-shadow:0 0 0 2px var(--k-ms); background:color-mix(in srgb, var(--k-ms) 16%, var(--paper)); }
/* sliders */
.mf1-sl{ display:grid; grid-template-columns:auto minmax(0, 1fr) auto; gap:8px; align-items:center; max-width:420px; margin:6px auto; font-size:.9rem; color:var(--ink); }
.mf1-sl input{ width:100%; accent-color:var(--k-ms); }
.mf1-sl output{ font:700 .95rem var(--mono); min-width:4.5em; text-align:right; }
.mf1-out{ text-align:center; font:600 .92rem var(--body); color:var(--ink); margin:8px 0 0; }
.mf1-out small{ display:block; font:500 .86rem var(--body); color:var(--graphite); margin-top:2px; }
/* servers */
.mf1-srv{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:8px 0; }
.mf1-srv i{ width:30px; height:30px; border-radius:50%; display:grid; place-items:center; font-style:normal; font-size:.82rem; font-weight:700; border:2px solid var(--k-ms); color:var(--ink); background:var(--paper); }
.mf1-srv i.on{ background:var(--s-ms); color:#fff; border-color:transparent; }
.mf1-bars{ display:grid; gap:6px; max-width:420px; margin:0 auto; font-size:.86rem; color:var(--ink); }
.mf1-bars div{ display:grid; grid-template-columns:96px minmax(0, 1fr); gap:6px; align-items:center; }
.mf1-bars span{ display:block; height:16px; border-radius:4px; transition:width .4s; }
/* nested tree */
.mf1-tr{ max-width:480px; margin:0 auto; font-size:.92rem; color:var(--ink); }
.mf1-tr ul{ list-style:none; margin:0; padding:0 0 0 16px; border-left:2px solid var(--line); }
.mf1-tr > ul{ border-left:0; padding-left:0; }
.mf1-tr li{ margin:6px 0; position:relative; }
.mf1-tr ul ul li::before{ content:""; position:absolute; left:-16px; top:14px; width:12px; border-top:2px solid var(--line); }
.mf1-tn{ display:inline-block; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 10px; transition:opacity .45s, box-shadow .45s, background .45s; }
.mf1-tn.on{ box-shadow:0 0 0 2px var(--k-ms); background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)); }
.mf1-tn.off{ opacity:.25; } .mf1-tn.end{ background:var(--s-ms); color:#fff; border-color:transparent; font-weight:700; }
.mf1-tn small{ color:var(--graphite); font-size:.82rem; }
.mf1-tn.end small{ color:#fff; }
.mf1-res{ display:block; margin-top:3px; font-weight:700; color:var(--pen); font-size:.88rem; }
/* stacks */
.mf1-stk{ display:grid; gap:0; border:1.5px solid var(--graphite); border-radius:4px; overflow:hidden; background:var(--paper); }
.mf1-stk div{ height:34px; box-sizing:border-box; display:grid; place-items:center; padding:2px 4px; text-align:center; font-size:.86rem; line-height:1.12; color:var(--ink); border-top:1px solid var(--line); transition:background .4s, box-shadow .4s, opacity .4s; cursor:pointer; }
.mf1-stk div:first-child{ border-top:0; }
.mf1-stk div.on{ background:color-mix(in srgb, var(--k-ms) 20%, var(--paper)); box-shadow:inset 0 0 0 2px var(--k-ms); }
.mf1-stk div.none{ background:var(--paper-2); color:var(--graphite); font-style:italic; }
.mf1-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:12px; max-width:440px; margin:0 auto; }
.mf1-two h5{ margin:0 0 4px; text-align:center; font-size:.9rem; color:var(--ink); }
/* six levels */
.mf1-lv{ max-width:420px; margin:0 auto; display:grid; gap:0; }
.mf1-lv .lv{ display:grid; grid-template-columns:62px minmax(0, 1fr); gap:8px; align-items:center; }
.mf1-lv .lv i{ font-style:normal; font-weight:700; color:var(--pen); font-size:.9rem; }
.mf1-lv .lv span{ border:1.5px solid var(--graphite); border-radius:4px; background:var(--paper); padding:6px; text-align:center; font-size:.9rem; color:var(--ink); transition:background .4s, box-shadow .4s, opacity .4s; }
.mf1-lv .lv span.on{ background:color-mix(in srgb, var(--k-ms) 18%, var(--paper)); box-shadow:0 0 0 2px var(--k-ms); }
.mf1-lv .tx{ margin-left:70px; padding:4px 0 4px 14px; border-left:2px solid var(--graphite); font-size:.84rem; color:var(--k-ms); min-height:14px; transition:opacity .4s; }
/* metric tree */
.mf1-mt{ max-width:540px; margin:0 auto; }
.mf1-mt .req{ text-align:center; margin-bottom:8px; }
.mf1-mt .outs{ display:grid; gap:8px; }
.mf1-mt .out{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; transition:opacity .4s, box-shadow .4s; cursor:pointer; }
.mf1-mt .out.on{ box-shadow:0 0 0 2px var(--k-ms); } .mf1-mt .out.dim{ opacity:.45; }
.mf1-mt .out > b{ display:block; font-size:.95rem; color:var(--ink); margin-bottom:6px; }
.mf1-mt .out > b em{ font-style:normal; color:var(--pen); }
.mf1-mt .ms{ display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:6px; }
.mf1-mt .ms div{ border-radius:8px; padding:6px 8px; font-size:.86rem; line-height:1.3; color:var(--ink); border:1px solid var(--line); }
.mf1-mt .ms div b{ display:block; font-size:.88rem; }
.mf1-mt .ms div span{ display:block; font:600 .86rem var(--mono); color:var(--k-ms); margin-top:2px; }
.mf1-mt .c0 .ms div{ background:color-mix(in srgb, #38bdf8 14%, var(--paper)); }
.mf1-mt .c1 .ms div{ background:color-mix(in srgb, #f87171 14%, var(--paper)); }
.mf1-mt .c2 .ms div{ background:color-mix(in srgb, #4ade80 14%, var(--paper)); }
/* phases */
.mf1-ph{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:5px; max-width:560px; margin:10px auto 0; }
.mf1-ph div{ border-radius:8px; padding:5px 4px; font-size:.8rem; line-height:1.25; text-align:center; color:var(--ink); border:1px solid var(--line); opacity:.45; transition:opacity .4s, background .4s; }
.mf1-ph div b{ display:block; color:var(--k-ms); }
.mf1-ph div.on{ opacity:1; background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)); }
@media (max-width:480px){ .mf1-ph{ grid-template-columns:repeat(2, minmax(0, 1fr)); } }
/* history tape */
.mf1-tape{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-top:8px; min-height:30px; }
.mf1-tape span{ border:1px solid var(--k-ms); border-radius:6px; padding:2px 8px; font:600 .88rem var(--mono); color:var(--ink); background:var(--paper); }
.mf1-split{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:10px; }
.mf1-split h5{ margin:0 0 4px; font-size:.88rem; text-align:center; color:var(--ink); }
@media (max-width:560px){ .mf1-split{ grid-template-columns:1fr; } }
.mf1-leg{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.85rem; color:var(--ink); margin-top:8px; }
.mf1-leg i{ display:inline-block; width:11px; height:11px; border-radius:50%; margin-right:5px; vertical-align:-1px; }
`;
  if (!document.getElementById('mf1-css')) { const s = document.createElement('style'); s.id = 'mf1-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── small helpers ── */
  function useVisible(ref) {
    const [v, setV] = useState(false);
    useEffect(() => { const el = ref.current; if (!el || !window.IntersectionObserver) { setV(true); return; } const io = new IntersectionObserver(es => setV(es[0].isIntersecting), { rootMargin: '60px' }); io.observe(el); return () => io.disconnect(); }, []);
    return v;
  }
  // seconds that pass while the figure is on screen (stays 0 under reduced motion)
  function useTick(ref, on = true) {
    const vis = useVisible(ref), [t, setT] = useState(0);
    useEffect(() => { if (!on || !vis || calm()) return; let last = performance.now(); const id = setInterval(() => { const n = performance.now(); setT(x => x + (n - last) / 1000); last = n; }, 50); return () => clearInterval(id); }, [on, vis]);
    return t;
  }
  const Chips = ({ items, sel, on }) => html`<div className="mf1-row">${items.map((t, j) => html`<button key=${j} className=${'fig-btn' + (j === sel ? ' mf1-sel' : '')} aria-pressed=${j === sel} onClick=${() => on(j)}>${t}</button>`)}</div>`;
  const Head = (id, color) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${color || 'var(--graphite)'} /></marker>`;
  const fl = () => (calm() ? '' : 'flow');
  // point at distance s along a polyline
  const along = (pts, s) => { for (let k = 1; k < pts.length; k++) { const [x1, y1] = pts[k - 1], [x2, y2] = pts[k], d = Math.hypot(x2 - x1, y2 - y1); if (s <= d) return [x1 + (x2 - x1) * s / d, y1 + (y2 - y1) * s / d]; s -= d; } return pts[pts.length - 1]; };
  const plen = pts => pts.slice(1).reduce((a, p, k) => a + Math.hypot(p[0] - pts[k][0], p[1] - pts[k][1]), 0);
  const bfs = (n, adj, s, t) => { const prev = Array(n).fill(-1), seen = Array(n).fill(false), q = [s]; seen[s] = true; while (q.length) { const u = q.shift(); if (u === t) break; for (const v of adj[u]) if (!seen[v]) { seen[v] = true; prev[v] = u; q.push(v); } } if (!seen[t]) return null; const p = [t]; while (p[0] !== s) p.unshift(prev[p[0]]); return p; };

  /* ── slides 4-5: how to evaluate a system ── */
  function Evaluate({ ar }) {
    const A = [
      { t: 'Measurements', d: 'Use an existing instance of the system to perform performance measurements.', p: 'What if the system does not exist in reality, changes are very expensive or time consuming, or the system is not available?' },
      { t: 'Analysis', d: 'Develop a mathematical abstraction of the system and derive formulas which describe the system performance.', p: 'Good solutions, but only feasible for simple systems; real-world systems (factory, computer, network) are too complex.' },
      { t: 'Simulation', d: 'Develop a computer program which implements a model of the system; perform experiments by running the program.', p: 'How to assure that model, implementation and analysis do not show randomness? Garbage-In Garbage-Out (GIGO).' }
    ];
    const steps = [
      { en: 'Given a system, how do you evaluate its performance? The slide answers with a tree of <b>three ways</b>. Tap a box or press Next.', ar: 'عندك system، إزاي تقيّم الـ performance بتاعه؟ الـ slide بترد بشجرة فيها <b>3 طرق</b>. دوس على أي مربع أو على Next.' },
      { en: '<b>Measurements</b>: measure an existing instance of the system. <b>Problem</b> (slide 5): the system may not exist, may not be available, or changes may be too expensive or slow.', ar: 'أول طريقة هي الـ <b>Measurements</b>، يعني تقيس على نسخة موجودة فعلًا من الـ system. <b>المشكلة</b> (slide 5) إن الـ system ممكن يكون مش موجود أو مش متاح، أو التغيير فيه غالي جدًا أو بياخد وقت كبير.' },
      { en: '<b>Analysis</b>: a mathematical abstraction and formulas for the performance. <b>Problem</b>: only feasible for <b>simple systems</b>; real-world systems are too complex.', ar: 'تاني طريقة هي الـ <b>Analysis</b>، يعني mathematical abstraction للـ system و formulas للـ performance. <b>المشكلة</b> إنها تنفع مع الـ <b>simple systems</b> بس، والـ systems الحقيقية معقدة جدًا.' },
      { en: '<b>Simulation</b>: a computer program implementing a model of the system, run to do experiments. <b>Problem</b>: make sure the results do not just show randomness, and <b>Garbage-In Garbage-Out</b>.', ar: 'تالت طريقة هي الـ <b>Simulation</b>، يعني computer program بيعمل implement لـ model من الـ system ونشغله نعمل بيه تجارب. <b>المشكلة</b> إننا لازم نتأكد إن النتايج مش مجرد randomness، وكمان الـ <b>GIGO</b> يعني لو الداخل غلط الخارج هيبقى غلط.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    return html`<figure className="fig mf1"><div className="fig-stage"><div className="mf1-ev">
      <div className="mf1-top">System<small>How to evaluate?</small></div><div className="mf1-stem"></div>
      <div className="mf1-ev-cols">${A.map((a, j) => html`<button key=${j} className=${'mf1-ev-c' + (i === j + 1 ? ' on' : '') + (i > 0 && i < j + 1 ? ' dim' : '')} onClick=${() => ctl.go(j + 1)}>
        <b>${a.t}</b>${i >= j + 1 && html`<span>${a.d}</span><span className="mf1-pb"><b style=${{ display: 'inline', color: 'inherit', fontSize: 'inherit' }}>Problem: </b>${a.p}</span>`}</button>`)}</div>
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 10: client-server network and its queueing model ── */
  function NetQueue({ ar }) {
    const steps = [
      { en: '<b>Computer network</b>: clients request some service from a server over a network. Client = user and web browser; Service = web page; Server = web server; Network = {local network, Internet, wireless network}.', ar: 'مثال الـ <b>computer network</b>: الـ clients بيطلبوا service من الـ server عن طريق network.<span class="ltr">Client = user and web browser<br>Service = web page<br>Server = web server<br>Network = {local network, Internet, wireless network}</span>' },
      { en: '<b>Analysis</b>: the performance of the server and of the network. Below, the same picture as a queueing model: each client is a <b>queue</b> (boxes) followed by a <b>server</b> (circle).', ar: 'في الـ <b>Analysis</b> عايزين الـ performance بتاع الـ server وبتاع الـ network. تحت نفس الصورة كـ queueing model، وكل client عبارة عن <b>queue</b> (المربعات) وبعدها <b>server</b> (الدايرة).' },
      { en: 'The clients\' outputs join into one queue + server: the <b>network</b>.', ar: 'اللي خارج من الـ clients بيتجمع في queue واحدة وبعدها server، ودول بيمثلوا الـ <b>network</b>.' },
      { en: 'Then another queue + server: the <b>web server</b>. Attention: in this example the server as well as the network is depicted <b>very simply</b>.', ar: 'وبعدهم queue تانية و server تاني، ودول الـ <b>web server</b>. خد بالك إن في المثال ده الـ server والـ network مترسومين <b>ببساطة جدًا</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const person = (x, y) => html`<g><circle cx=${x} cy=${y - 9} r="7" fill="var(--k-ms)" /><path d=${`M${x - 12} ${y + 11} q12 -20 24 0 z`} fill="var(--k-ms)" /></g>`;
    const Q = (x, y, on, k) => html`<g key=${k} className=${pop(on)}><path d=${`M${x - 14} ${y} H${x - 1}`} className="mf1-ln" markerEnd="url(#mf1-nq-a)" />${[0, 1, 2, 3].map(j => html`<rect key=${j} x=${x + j * 9} y=${y - 7} width="9" height="14" className="mf1-box" />`)}<path d=${`M${x + 36} ${y} H${x + 42}`} className="mf1-ln" markerEnd="url(#mf1-nq-a)" /><circle cx=${x + 50} cy=${y} r="7.5" className="mf1-hot" /></g>`;
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 292" role="img" aria-label="Clients, network and server, and the same as a queueing model">
        <defs>${Head('mf1-nq-a')}</defs>
        ${person(30, 26)}<text x="30" y="56" textAnchor="middle" fontSize="13.5">Client 1</text>
        <text x="30" y="76" textAnchor="middle" fontSize="16" fontWeight="700">⋮</text>
        ${person(30, 98)}<text x="30" y="128" textAnchor="middle" fontSize="13.5">Client k</text>
        <path d="M46 30 L118 58" className=${'mf1-kl ' + fl()} style=${{ strokeWidth: 2 }} markerEnd="url(#mf1-nq-a)" />
        <path d="M46 100 L118 84" className=${'mf1-kl ' + fl()} style=${{ strokeWidth: 2 }} markerEnd="url(#mf1-nq-a)" />
        <g fill="color-mix(in srgb, #fb923c 30%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.2">
          <circle cx="128" cy="72" r="20" /><circle cx="150" cy="58" r="24" /><circle cx="173" cy="72" r="20" /><circle cx="150" cy="86" r="20" /></g>
        <g fill="color-mix(in srgb, #fb923c 30%, var(--paper))"><circle cx="128" cy="72" r="18.5" /><circle cx="150" cy="58" r="22.5" /><circle cx="173" cy="72" r="18.5" /><circle cx="150" cy="86" r="18.5" /></g>
        <text x="150" y="68" textAnchor="middle" fontSize="13.5">Network</text><text x="150" y="85" textAnchor="middle" fontSize="13.5">(Internet)</text>
        <path d="M195 70 L230 70" className=${'mf1-kl ' + fl()} style=${{ strokeWidth: 2 }} markerEnd="url(#mf1-nq-a)" />
        <rect x="236" y="48" width="48" height="36" rx="3" className="mf1-box" /><rect x="242" y="54" width="36" height="24" fill="#3b82f6" /><rect x="252" y="84" width="16" height="8" fill="var(--graphite)" /><rect x="244" y="92" width="32" height="5" rx="2" fill="var(--graphite)" />
        <text x="260" y="116" textAnchor="middle" fontSize="15" fontWeight="700">Server</text>
        <line x1="10" y1="146" x2="290" y2="146" stroke="var(--line)" strokeDasharray="4 4" className=${pop(i >= 1)} />
        <g className=${pop(i >= 1)}><text x="40" y="171" textAnchor="middle" fontSize="13.5">Client 1</text><text x="40" y="222" textAnchor="middle" fontSize="16" fontWeight="700">⋮</text><text x="40" y="282" textAnchor="middle" fontSize="13.5">Client k</text></g>
        ${Q(16, 186, i >= 1, 'a')}${Q(16, 252, i >= 1, 'b')}
        <g className=${pop(i >= 2)}><path d="M74 186 L98 219 M74 252 L98 219" className="mf1-ln" /><text x="129" y="200" textAnchor="middle" fontSize="13.5" className="mf1-kt">Network</text></g>
        ${Q(112, 219, i >= 2, 'c')}
        <g className=${pop(i >= 3)}><text x="226" y="200" textAnchor="middle" fontSize="13.5" className="mf1-kt">Web server</text><path d="M278 219 H296" className="mf1-ln" markerEnd="url(#mf1-nq-a)" /></g>
        ${Q(206, 219, i >= 3, 'd')}
        <path d="M170 219 H192" className=${'mf1-ln ' + pop(i >= 3)} />
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 11: large networks like the Internet ── */
  const NET = { P: [[16, 150], [46, 116], [44, 182], [92, 186], [88, 112], [126, 84], [160, 100], [128, 140], [166, 150], [198, 112], [204, 176], [234, 146], [196, 54], [258, 42], [258, 112], [286, 104], [254, 184], [228, 18]],
    E: [[0, 1], [0, 2], [1, 2], [1, 4], [2, 3], [3, 7], [4, 5], [4, 7], [5, 6], [5, 7], [6, 9], [7, 8], [8, 9], [8, 10], [6, 12], [9, 11], [10, 11], [10, 16], [11, 14], [12, 17], [12, 13], [13, 17], [13, 14], [14, 15], [14, 16], [15, 16], [9, 14]] };
  function Internet({ ar }) {
    const steps = [
      { en: 'Large computer networks like the Internet: many interconnected routers. To simulate one we must model its <b>topology</b>: the routers and the links that join them.', ar: 'الـ networks الكبيرة زي الـ Internet فيها routers كتير متوصلة ببعض. علشان نعمل لها simulation لازم نعمل model للـ <b>topology</b>، يعني الـ routers والـ links اللي بينهم.' },
      { en: '<b>Routing</b>: the route the packets take through the routers.', ar: 'وكمان الـ <b>routing</b>، يعني الطريق اللي الـ packets بتاخده بين الـ routers.' },
      { en: '<b>Traffic</b>: the packets that travel along the routes.', ar: 'وكمان الـ <b>traffic</b>، يعني الـ packets نفسها وهي ماشية على الطرق دي.' },
      { en: '<b>Background traffic</b>: the other traffic that also uses the links at the same time.', ar: 'وكمان الـ <b>background traffic</b>، يعني الـ traffic التاني اللي بيستخدم نفس الـ links في نفس الوقت.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const ref = useRef(null), t = useTick(ref);
    const n = NET.P.length, adj = Array.from({ length: n }, () => []); NET.E.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    const route = bfs(n, adj, 0, 15), rp = route.map(k => NET.P[k]), L = plen(rp);
    const onRoute = (a, b) => route.some((v, k) => k && ((route[k - 1] === a && v === b) || (route[k - 1] === b && v === a)));
    const bg = NET.E.filter(([a, b]) => !onRoute(a, b)).filter((_, k) => k % 3 === 0);
    const R = (x, y, k) => html`<g key=${k}><circle cx=${x} cy=${y} r="9" fill="var(--s-ms)" stroke="var(--paper)" strokeWidth="1.5" /><path d=${`M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8`} stroke="#fff" strokeWidth="1.6" /></g>`;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 200" role="img" aria-label="A mesh of interconnected routers">
        ${NET.E.map(([a, b], k) => html`<line key=${k} x1=${NET.P[a][0]} y1=${NET.P[a][1]} x2=${NET.P[b][0]} y2=${NET.P[b][1]} stroke="var(--graphite)" strokeWidth=${i === 0 ? 2.4 : 1.4} className="mf1-fade" style=${{ opacity: i >= 1 && !onRoute(a, b) ? .45 : 1 }} />`)}
        <polyline points=${rp.map(p => p.join(',')).join(' ')} className=${'mf1-kl ' + pop(i >= 1)} style=${{ strokeWidth: 5, opacity: i >= 1 ? .55 : 0 }} />
        ${NET.P.map(([x, y], k) => R(x, y, k))}
        ${i >= 2 && [0, 1, 2].map(k => { const [x, y] = along(rp, ((t * 60) + k * L / 3) % L); return html`<circle key=${'t' + k} cx=${x} cy=${y} r="5" fill="#facc15" stroke="#111" strokeWidth="1" />`; })}
        ${i >= 3 && bg.map(([a, b], k) => { const p = [NET.P[a], NET.P[b]], d = plen(p), s = (t * 35 + k * 17) % (2 * d); const [x, y] = along(p, s < d ? s : 2 * d - s); return html`<circle key=${'b' + k} cx=${x} cy=${y} r="4" fill="var(--faint)" stroke="var(--ink)" strokeWidth="1" />`; })}
      </svg>
      <div className="mf1-leg"><span><i style=${{ background: 'var(--s-ms)' }}></i>router</span>${i >= 1 && html`<span><i style=${{ background: 'var(--k-ms)', opacity: .55 }}></i>route</span>`}${i >= 2 && html`<span><i style=${{ background: '#facc15' }}></i>traffic</span>`}${i >= 3 && html`<span><i style=${{ background: 'var(--faint)' }}></i>background traffic</span>`}</div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 12: MANET ── */
  const MANET0 = [[40, 252], [104, 206], [62, 122], [170, 170], [150, 74], [226, 112], [262, 42], [246, 238], [58, 40]];
  function Manet({ ar }) {
    const RANGE = 84;
    const [P, setP] = useState(MANET0), [moves, setMoves] = useState(0);
    const ref = useRef(null), t = useTick(ref);
    const n = P.length, adj = Array.from({ length: n }, () => []), links = [];
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]) <= RANGE) { adj[a].push(b); adj[b].push(a); links.push([a, b]); }
    const path = bfs(n, adj, 0, 6) || [0], hops = path.length - 1;
    const steps = [
      { en: 'A <b>mobile multi-hop ad-hoc network</b>: a wireless network of mobile nodes in a movement area, with <b>no infrastructure</b> (no Access Points or Base Stations).', ar: 'الـ <b>MANET</b> عبارة عن wireless network فيها mobile nodes بتتحرك في مساحة، و<b>مفيهاش infrastructure</b> خالص يعني لا Access Points ولا Base Stations.' },
      { en: 'Each node has a <b>communication range</b> (dashed circle).', ar: 'كل node ليها <b>communication range</b> وهي الدايرة المتقطعة.' },
      { en: 'Two nodes can communicate if they are in their <b>mutual communication range</b> (the lines).', ar: 'أي اتنين nodes يقدروا يكلموا بعض لو كل واحد فيهم جوه الـ <b>communication range</b> بتاع التاني (الخطوط).' },
      { en: `Source and destination are several hops away (here <b>${hops} hops</b>), so the relay nodes forward the data: <b>all nodes have to forward data for others</b>. Press "Move the nodes" to see another layout.`, ar: `الـ source والـ destination بعاد عن بعض بكذا hop (هنا <b>${hops} hops</b>)، فالـ relay nodes بتعدّي الداتا، يعني <b>كل الـ nodes لازم تعدّي داتا لغيرها</b>. دوس على Move the nodes تشوف توزيعة تانية.` }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const move = () => { for (let k = 0; k < 400; k++) { const Q = Array.from({ length: 9 }, () => [20 + Math.random() * 260, 20 + Math.random() * 260]); const a = Array.from({ length: 9 }, () => []); for (let x = 0; x < 9; x++) for (let y = x + 1; y < 9; y++) if (Math.hypot(Q[x][0] - Q[y][0], Q[x][1] - Q[y][1]) <= RANGE) { a[x].push(y); a[y].push(x); } const p = bfs(9, a, 0, 6); if (p && p.length >= 4) { setP(Q); setMoves(m => m + 1); ctl.go(3); return; } } };
    const pp = path.map(k => P[k]), L = plen(pp), dot = hops > 0 ? along(pp, (t * 70) % (L + 40) > L ? L : (t * 70) % (L + 40)) : null;
    const col = k => k === 0 ? 'var(--s-ms)' : k === 6 ? 'var(--ok)' : i >= 3 && path.includes(k) ? 'var(--pen)' : 'var(--faint)';
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 300" style=${{ maxWidth: '380px' }} role="img" aria-label="Mobile nodes with communication ranges; data hops from source through relays to destination">
        <rect x="2" y="2" width="296" height="296" fill="color-mix(in srgb, #facc15 16%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.5" />
        ${P.map(([x, y], k) => html`<circle key=${'r' + k} cx=${x} cy=${y} r=${RANGE} fill="color-mix(in srgb, var(--k-ms) 6%, transparent)" stroke="var(--graphite)" strokeWidth="1" strokeDasharray="4 4" className=${pop(i >= 1)} />`)}
        ${links.map(([a, b], k) => html`<line key=${'l' + k} x1=${P[a][0]} y1=${P[a][1]} x2=${P[b][0]} y2=${P[b][1]} stroke="var(--graphite)" strokeWidth="1.6" className=${pop(i >= 2)} />`)}
        ${i >= 3 && html`<polyline points=${pp.map(p => p.join(',')).join(' ')} className="mf1-kl" style=${{ strokeWidth: 4 }} />`}
        ${P.map(([x, y], k) => html`<circle key=${'n' + k + '-' + moves} cx=${x} cy=${y} r="8" fill=${col(k)} stroke="var(--ink)" strokeWidth="1.4" />`)}
        ${i >= 3 && dot && html`<rect x=${dot[0] - 6} y=${dot[1] - 5} width="12" height="10" rx="2" fill="#facc15" stroke="#111" strokeWidth="1" />`}
      </svg>
      <div className="mf1-leg"><span><i style=${{ background: 'var(--s-ms)' }}></i>source node</span><span><i style=${{ background: 'var(--pen)' }}></i>relay node</span><span><i style=${{ background: 'var(--ok)' }}></i>destination node</span><span><i style=${{ background: 'var(--faint)' }}></i>mobile node</span></div>
      <div className="mf1-row" style=${{ margin: '10px 0 0' }}><button className="fig-btn solid" onClick=${move}>Move the nodes</button></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 13: where is a moving node? (random waypoint on a 1000 × 1000 area) ── */
  function Waypoint({ ar }) {
    const G = 10, S = useRef(null), ref = useRef(null), vis = useVisible(ref);
    const fresh = () => ({ x: Math.random() * 1000, y: Math.random() * 1000, tx: Math.random() * 1000, ty: Math.random() * 1000, legs: 0, pts: [], cnt: Array(G * G).fill(0), n: 0, mid: 0 });
    if (!S.current) { S.current = fresh(); S.current.pts.push([S.current.x, S.current.y]); }
    const [run, setRun] = useState(!calm()), [, force] = useState(0);
    const stepSim = steps => { const s = S.current; for (let k = 0; k < steps; k++) { const dx = s.tx - s.x, dy = s.ty - s.y, d = Math.hypot(dx, dy); if (d <= 5) { s.x = s.tx; s.y = s.ty; s.pts.push([s.x, s.y]); if (s.pts.length > 26) s.pts.shift(); s.legs++; s.tx = Math.random() * 1000; s.ty = Math.random() * 1000; } else { s.x += dx / d * 5; s.y += dy / d * 5; }
      s.cnt[Math.min(G - 1, Math.floor(s.y / 100)) * G + Math.min(G - 1, Math.floor(s.x / 100))]++; s.n++; if (s.x >= 250 && s.x < 750 && s.y >= 250 && s.y < 750) s.mid++; } };
    useEffect(() => { if (!run || !vis) return; if (calm()) { stepSim(400000); setRun(false); force(x => x + 1); return; } const id = setInterval(() => { stepSim(2500); force(x => x + 1); }, 80); return () => clearInterval(id); }, [run, vis]);
    const s = S.current, mx = Math.max(1, ...s.cnt), cur = [s.x, s.y];
    const sx = v => 46 + v * .24, sy = v => 254 - v * .24;
    const axes = html`<rect x="46" y="14" width="240" height="240" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="1.2" />
      ${[0, 500, 1000].map(v => html`<g key=${v}><text x=${v === 1000 ? 286 : sx(v)} y="276" textAnchor=${v === 1000 ? 'end' : 'middle'} fontSize="15" className="mf1-gt">${v}</text><text x="41" y=${sy(v) + 5} textAnchor="end" fontSize="15" className="mf1-gt">${v}</text></g>`)}`;
    const pct = s.n ? (100 * s.mid / s.n).toFixed(1) : '0.0';
    const en = `The slide's question: each new destination (waypoint) is picked with x and y <b>uniformly</b> on the 1000 × 1000 area. Is the node's position uniform too? Here one node moves at constant velocity with no pause time. Waypoints so far: <b>${s.legs.toLocaleString('en-US')}</b>. Time spent in the middle quarter of the area (250 to 750 on both axes): <b>${pct}%</b>, while a uniform position would give 25%. The density f(x, y) is a hill: highest in the <b>middle</b>, near 0 at the edges, so some areas are preferred. Simple to describe, but hard to get a closed-form f(x, y): that is why we simulate.`;
    const arT = `سؤال الـ slide: كل destination جديدة (waypoint) بتتختار بـ x و y <b>uniform</b> على المساحة اللي مقاسها 1000 في 1000. هل مكان الـ node نفسه هيطلع uniform؟ هنا node واحدة ماشية بـ velocity ثابتة ومن غير pause time. عدد الـ waypoints لحد دلوقتي <b>${s.legs.toLocaleString('en-US')}</b>. نسبة الوقت اللي قضّته في الربع اللي في النص (من 250 لـ 750 على المحورين) هي <b>${pct}%</b>، ولو المكان كان uniform كانت هتبقى 25%. الـ density بتاعة مكان الـ node شكلها هضبة، أعلى حاجة في <b>النص</b> وقريبة من الصفر عند الأطراف، يعني فيه أماكن مفضّلة. سهل نوصفها بس صعب نطلع لها formula مقفولة (closed form)، وعلشان كده بنعمل simulation.`;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage"><div className="mf1-split">
      <div><h5>Path of the node (last 25 waypoints)</h5><svg viewBox="0 0 300 284" role="img" aria-label="Zig-zag path of one node">${axes}
        <polyline points=${s.pts.concat([cur]).map(([x, y]) => sx(x) + ',' + sy(y)).join(' ')} fill="none" stroke="var(--ink)" strokeWidth="1.1" />
        ${s.pts.map(([x, y], k) => html`<circle key=${k} cx=${sx(x)} cy=${sy(y)} r="2.6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />`)}
        <circle cx=${sx(cur[0])} cy=${sy(cur[1])} r="6" fill="var(--s-ms)" /></svg></div>
      <div><h5>Where the node spends its time</h5><svg viewBox="0 0 300 284" role="img" aria-label="Density of the node's position over the area">${axes}
        ${s.cnt.map((c, k) => html`<rect key=${k} x=${46 + (k % G) * 24} y=${254 - (Math.floor(k / G) + 1) * 24} width="24" height="24" fill="var(--k-ms)" style=${{ opacity: c / mx }} />`)}
        <rect x=${sx(250)} y=${sy(750)} width="120" height="120" fill="none" stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" /></svg></div>
      </div>
      <div className="mf1-row" style=${{ margin: '10px 0 0' }}>
        <button className="fig-btn solid" onClick=${() => setRun(r => !r)}>${run ? 'Pause' : 'Run'}</button>
        <button className="fig-btn" onClick=${() => { S.current = fresh(); S.current.pts.push([S.current.x, S.current.y]); force(x => x + 1); }}>↻ Reset</button></div>
      <p className="mf1-note">Darker = more time spent there. Dashed square = the middle quarter.</p>
      </div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── slide 16: a simulation moves from state to state over time ── */
  function StateTime({ ar }) {
    const X = [16, 60, 136, 160, 184, 272];
    const steps = [
      { en: 'A <b>simulation</b> is the <b>imitation</b> of the operation of a real-world system <b>over time</b>.', ar: 'الـ <b>simulation</b> هي <b>تقليد</b> لطريقة شغل system حقيقي <b>على مدار الوقت</b>.' },
      { en: 'As time passes the system jumps from one state to the next: S<sub>0</sub>, S<sub>1</sub>, S<sub>2</sub>, …, with gaps of different length between the jumps.', ar: 'مع مرور الوقت الـ system بينط من state للي بعدها، والمسافات بين النطات مش متساوية.<span class="ltr">S<sub>0</sub> → S<sub>1</sub> → S<sub>2</sub> → …</span>' },
      { en: 'The method, part 1: <b>generate an artificial history</b> of the system (the sequence of states the run produces).', ar: 'الطريقة، الجزء الأول: <b>نولّد artificial history</b> للـ system، يعني سلسلة الـ states اللي الـ run بيطلعها.' },
      { en: 'Part 2: <b>draw inferences</b> from the artificial history about the characteristics of the system. How it is done: develop a <b>model</b>, made of <b>entities</b> (objects).', ar: 'الجزء التاني: <b>نطلع استنتاجات</b> (inferences) من الـ artificial history عن خصائص الـ system. وده بيتعمل إزاي؟ نبني <b>model</b> متكون من <b>entities</b> (objects).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const ref = useRef(null), t = useTick(ref, i === 1), anim = i === 1 && !calm();
    const per = 0.9, total = (X.length - 1) * per, ph = anim ? t % (total + 1.2) : total;
    const k = Math.min(X.length - 2, Math.floor(ph / per)), f = Math.min(1, (ph - k * per) / per);
    const arc = j => { const a = X[j], b = X[j + 1], h = Math.min(70, 18 + (b - a) * .7); return `M${a} 100 C${a + (b - a) * .15} ${100 - h * 1.3}, ${b - (b - a) * .15} ${100 - h * 1.3}, ${b} 100`; };
    const bez = j => { const a = X[j], b = X[j + 1], h = Math.min(70, 18 + (b - a) * .7), u = f, P0 = [a, 100], P1 = [a + (b - a) * .15, 100 - h * 1.3], P2 = [b - (b - a) * .15, 100 - h * 1.3], P3 = [b, 100], m = (p, q) => (1 - u) ** 3 * p[q] + 3 * (1 - u) ** 2 * u * P1[q] + 3 * (1 - u) * u * u * P2[q] + u ** 3 * P3[q]; return [m(P0, 0), m(P0, 1)]; };
    const done = i >= 1 ? (ph >= total ? X.length - 1 : k + (f >= 1 ? 1 : 0)) : 0;
    const dot = anim && ph < total ? bez(k) : [X[done], 100];
    const lab = ['S₀', 'S₁', 'S₂'];
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 130" role="img" aria-label="States S0, S1, S2 on a time axis, joined by jumps">
        <defs>${Head('mf1-st-a', 'var(--k-ms)')}${Head('mf1-st-b', '#dc2626')}</defs>
        <path d="M6 100 H292" stroke="var(--k-ms)" strokeWidth="2" markerEnd="url(#mf1-st-a)" />
        <text x="292" y="124" textAnchor="end" fontSize="15">Time</text>
        ${X.slice(0, -1).map((_, j) => html`<path key=${j} d=${arc(j)} fill="none" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#mf1-st-b)" className=${pop(i >= 1 && j < done)} />`)}
        ${lab.map((l, j) => html`<text key=${j} x=${X[j]} y="122" textAnchor="middle" fontSize="16" fontWeight="600">${l}</text>`)}
        <text x="184" y="122" textAnchor="middle" fontSize="16" fontWeight="600">…</text>
        <circle cx=${dot[0]} cy=${dot[1]} r="6" fill="var(--s-ms)" stroke="var(--paper)" strokeWidth="1.5" />
      </svg>
      <div className="mf1-tape" aria-label="artificial history">${i >= 2 && Array.from({ length: done + 1 }, (_, j) => html`<span key=${j}>S${String.fromCharCode(8320 + j)}</span>`)}${i >= 3 && html`<span style=${{ borderColor: 'var(--pen)', fontFamily: 'var(--body)' }}>→ inferences</span>`}</div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── lecture notes: common sense, 50/hour arrivals, 10/hour per server ── */
  function CommonSense({ ar }) {
    const [mode, setMode] = useState(0), [lam, setLam] = useState(50), [mu, setMu] = useState(10), [k, setK] = useState(3);
    const l = mode ? lam : 50, m = mode ? mu : 10, need = Math.ceil(l / m - 1e-9), ratio = l / m, ok = k * m >= l;
    const ratioS = Number.isInteger(ratio) ? String(ratio) : ratio.toFixed(2);
    const scale = Math.max(l, 10 * m) || 1;
    const en = mode === 0
      ? `Lecture-notes example: customers arrive at an average rate of <b>50/hour</b>, each server serves at a mean rate of <b>10/hour</b>. Minimum number of servers = 50 / 10 = <b>5</b>: common sense, <b>no simulation needed</b>. You picked <b>${k}</b> server${k > 1 ? 's' : ''}: capacity ${k} × 10 = <b>${k * 10}/hour</b>, ${ok ? 'enough for 50/hour' : 'less than 50/hour, too few'}.`
      : `Your numbers: ${l}/hour arriving, ${m}/hour per server. Arrival rate / service rate = ${l} / ${m} = <b>${ratioS}</b>, so at least <b>${need}</b> server${need > 1 ? 's' : ''}. With <b>${k}</b>: capacity ${k * m}/hour, ${ok ? 'enough' : 'too few'}.`;
    const a = mode === 0
      ? `مثال الـ lecture notes: الـ customers بيوصلوا بمعدل <b>50 في الساعة</b>، وكل server بيخدم بمعدل <b>10 في الساعة</b>. أقل عدد servers هو <b>5</b> لأن<span class="ltr">50 / 10 = 5</span>وده common sense يعني <b>مش محتاج simulation</b>. إنت اخترت <b>${k}</b> servers فالـ capacity هي <b>${k * 10} في الساعة</b>، ${ok ? 'وده كفاية للـ 50' : 'وده أقل من 50 يعني مش كفاية'}.`
      : `أرقامك: بيوصل ${l} في الساعة، وكل server بيخدم ${m} في الساعة. القسمة<span class="ltr">${l} / ${m} = ${ratioS}</span>يعني محتاج على الأقل <b>${need}</b> servers. ومع <b>${k}</b> الـ capacity هتبقى ${k * m} في الساعة، ${ok ? 'وده كفاية' : 'وده مش كفاية'}.`;
    return html`<figure className="fig mf1"><div className="fig-stage">
      <${Chips} items=${['Example from the notes', 'Try your own']} sel=${mode} on=${setMode} />
      ${mode === 1 && html`<div>
        <label className="mf1-sl"><span>Arrivals /hour</span><input type="range" min="10" max="120" step="5" value=${lam} onInput=${e => setLam(+e.target.value)} /><output>${lam}</output></label>
        <label className="mf1-sl"><span>Service /hour</span><input type="range" min="5" max="30" step="1" value=${mu} onInput=${e => setMu(+e.target.value)} /><output>${mu}</output></label></div>`}
      <label className="mf1-sl"><span>Servers</span><input type="range" min="1" max="12" step="1" value=${k} onInput=${e => setK(+e.target.value)} /><output>${k}</output></label>
      <div className="mf1-srv">${Array.from({ length: Math.max(k, need) }, (_, j) => html`<i key=${j} className=${j < k ? 'on' : ''}>${j + 1}</i>`)}</div>
      <div className="mf1-bars">
        <div><b>Arrivals</b><span style=${{ width: (100 * l / scale) + '%', background: 'var(--pen)' }}></span></div>
        <div><b>Capacity</b><span style=${{ width: Math.min(100, 100 * k * m / scale) + '%', background: ok ? 'var(--ok)' : 'var(--faint)' }}></span></div></div>
      <p className="mf1-out">minimum servers = arrival rate / service rate = ${l} / ${m} ${Number.isInteger(ratio) ? '=' : '≈'} ${ratioS}${Number.isInteger(ratio) ? '' : ' → ' + need}</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 23-24: system and system environment ── */
  function SysEnv({ ar }) {
    const steps = [
      { en: 'The <b>system</b>: a group of objects joined in regular interaction toward a purpose. Here, a computer network: the routers and lines inside the cloud.', ar: 'الـ <b>system</b> هو مجموعة objects بتتعامل مع بعض بانتظام علشان تحقق هدف. هنا الـ system هو computer network، يعني الـ routers والخطوط اللي جوه السحابة.' },
      { en: 'The <b>system environment</b>: everything <b>outside</b> the system that <b>affects</b> it: the laptop (wireless, through the antenna) and the desktop computer outside the cloud.', ar: 'الـ <b>system environment</b> هو أي حاجة <b>برا</b> الـ system بس <b>بتأثر</b> فيه، زي الـ laptop (wireless عن طريق الـ antenna) والـ desktop computer اللي برا السحابة.' },
      { en: '<b>Attention</b>: it is important to <b>decide on the boundary</b> between the system and its environment. This decision depends on the <b>purpose of the study</b>.', ar: '<b>خد بالك</b>: مهم جدًا <b>نحدد الحدود</b> بين الـ system والـ environment بتاعه، والقرار ده بيعتمد على <b>الهدف من الدراسة</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const R = (x, y, k) => html`<g key=${k}><ellipse cx=${x} cy=${y + 4} rx="15" ry="7" fill="#0369a1" /><rect x=${x - 15} y=${y - 2} width="30" height="6" fill="#0369a1" /><ellipse cx=${x} cy=${y - 2} rx="15" ry="7" fill="#0ea5e9" stroke="#fff" strokeWidth="1" /><path d=${`M${x - 6} ${y - 5} l12 6 M${x + 6} ${y - 5} l-12 6`} stroke="#fff" strokeWidth="1.5" /></g>`;
    const rs = [[124, 112], [164, 66], [212, 86], [172, 146]];
    const env = i >= 1 ? 'mf1-hot' : 'mf1-box';
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 210" role="img" aria-label="Routers inside a cloud (the system); a laptop and a desktop outside (the environment)">
        <path d="M98 108 C88 50, 160 26, 206 44 C256 56, 254 128, 228 160 C196 196, 122 186, 104 156 C94 140, 100 126, 98 108Z" fill="#facc15" stroke="var(--ink)" strokeWidth=${i >= 2 ? 3 : 1.2} strokeDasharray=${i >= 2 ? '7 5' : ''} className="mf1-fade" style=${{ opacity: i === 1 ? .55 : 1 }} />
        <path d="M124 112 L164 66 L212 86 L172 146 Z M164 66 L172 146" stroke="#555" strokeWidth="2" fill="none" />
        ${rs.map(([x, y], k) => R(x, y, k))}
        <text x="176" y="176" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111" style=${{ fill: '#111' }}>System</text>
        <path d="M66 112 H108 M226 86 H252" stroke="#777" strokeWidth="2.5" />
        <g><rect x="61" y="96" width="8" height="26" rx="3" className=${env} /><path d="M58 92 q7 -8 14 0 M55 88 q10 -14 20 0" fill="none" stroke="var(--graphite)" strokeWidth="1.5" /></g>
        <path d="M30 104 l8 -4 l-2 5 l10 -4" fill="none" stroke="#eab308" strokeWidth="2.5" />
        <g><rect x="6" y="104" width="30" height="20" rx="2" className=${env} /><path d="M2 128 H40 L36 124 H6 Z" fill="var(--graphite)" /></g>
        <g><rect x="254" y="66" width="38" height="30" rx="2" className=${env} /><rect x="259" y="71" width="28" height="20" fill="#60a5fa" /><rect x="262" y="100" width="26" height="12" rx="2" className=${env} /><rect x="256" y="114" width="36" height="5" rx="2" fill="var(--graphite)" /></g>
        <g className=${pop(i >= 1)}><text x="4" y="150" textAnchor="start" fontSize="14" className="mf1-kt">Environment</text><text x="296" y="56" textAnchor="end" fontSize="14" className="mf1-kt">Environment</text></g>
        <text x="150" y="24" textAnchor="middle" fontSize="14" className=${'mf1-pt ' + pop(i >= 2)}>boundary: depends on the purpose</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── lecture notes Fig 1.1: a factory system and its environment ── */
  function Factory({ ar }) {
    const steps = [
      { en: 'Fig 1.1, a factory system: raw materials go through the <b>Purchasing</b>, <b>Fabrication</b>, <b>Assembly</b> and <b>Shipping</b> departments and leave as finished products.', ar: 'الـ Fig 1.1 مصنع كـ system: الـ raw materials بتعدي على أقسام الـ <b>Purchasing</b> والـ <b>Fabrication</b> والـ <b>Assembly</b> والـ <b>Shipping</b> وتطلع finished products.' },
      { en: 'The <b>Production Control Department</b> receives the <b>customer orders</b> and is linked to the departments.', ar: 'الـ <b>Production Control Department</b> هو اللي بيستقبل الـ <b>customer orders</b> ومتوصل بالأقسام.' },
      { en: 'The factors controlling the arrival of orders are <b>outside the influence</b> of the factory, so they are part of the <b>environment</b> (outside the dashed boundary).', ar: 'العوامل اللي بتتحكم في وصول الـ orders <b>برا سيطرة</b> المصنع، فهي جزء من الـ <b>environment</b> (برا الحدود المتقطعة).' },
      { en: 'If the demand grows in the market, production increases in the factory. Hence the <b>market is the system environment</b>.', ar: 'لو الطلب زاد في السوق، الإنتاج في المصنع بيزيد. يعني <b>السوق هو الـ system environment</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const ref = useRef(null), t = useTick(ref);
    const D = [['Purchasing', 52], ['Fabrication', 112], ['Assembly', 172], ['Shipping', 232]];
    const speed = i >= 3 ? 2 : 1, chain = [[90, 28], [90, 300]], L = 272;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 322" style=${{ maxWidth: '400px' }} role="img" aria-label="Factory departments in a chain, a production control department receiving customer orders">
        <defs>${Head('mf1-fa-a')}</defs>
        <rect x="14" y="44" width="282" height="236" rx="10" fill="none" stroke="var(--pen)" strokeWidth="2" strokeDasharray="7 5" className=${pop(i >= 2)} />
        <text x="90" y="20" textAnchor="middle" fontSize="14">Raw materials</text>
        <text x="90" y="314" textAnchor="middle" fontSize="14">Finished products</text>
        <path d="M90 26 V50" className="mf1-ln" markerEnd="url(#mf1-fa-a)" />
        ${[0, 1, 2].map(k => { const s = ((t * 40 * speed) + k * L / 3) % L; const [x, y] = along(chain, s); return html`<circle key=${k} cx=${x} cy=${y} r="4.5" fill="var(--s-ms)" />`; })}
        ${D.map(([n, y], k) => html`<g key=${k}><rect x="24" y=${y} width="132" height="40" rx="4" className="mf1-box" /><text x="90" y=${y + 17} textAnchor="middle" fontSize="13.5">${n}</text><text x="90" y=${y + 33} textAnchor="middle" fontSize="13.5">Department</text>
          <path d=${`M90 ${y + 40} V${y + 58}`} className="mf1-ln" markerEnd="url(#mf1-fa-a)" /></g>`)}
        <g className=${pop(i >= 1)}>
          <rect x="190" y="112" width="100" height="62" rx="4" className="mf1-hot" />
          <text x="240" y="132" textAnchor="middle" fontSize="13.5">Production</text><text x="240" y="148" textAnchor="middle" fontSize="13.5">Control</text><text x="240" y="164" textAnchor="middle" fontSize="13.5">Department</text>
          ${D.map(([, y], k) => html`<path key=${k} d=${`M190 143 L157 ${y + 20}`} className="mf1-ln" markerEnd="url(#mf1-fa-a)" />`)}
          <text x="240" y="18" textAnchor="middle" fontSize="14">Customer</text><text x="240" y="34" textAnchor="middle" fontSize="14">orders</text>
          <path d="M240 40 V108" className=${'mf1-ln ' + (i >= 3 ? fl() : '')} style=${{ strokeWidth: i >= 3 ? 3 : 1.6 }} markerEnd="url(#mf1-fa-a)" />
        </g>
        <text x="246" y="76" textAnchor="start" fontSize="13.5" className=${'mf1-pt ' + pop(i >= 2)}>market</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 26: components of a simple system, a router with two interfaces ── */
  function Router({ ar }) {
    const steps = [
      { en: '<b>Entity</b> (object of interest): the <b>router</b> with two interfaces.', ar: 'الـ <b>Entity</b> (الـ object اللي يهمنا) هنا هو الـ <b>router</b> اللي ليه interface اتنين.' },
      { en: '<b>Attributes</b> (properties of the entity): {IF1, IF2}.', ar: 'الـ <b>Attributes</b> (خصائص الـ entity) هي الـ interfaces.<span class="ltr">{IF1, IF2}</span>' },
      { en: '<b>Activities</b> (time periods of specified length): Transmit IF1 → IF2, 20 µs; Transmit IF2 → IF2, 15 µs (as on the slide; most likely IF2 → IF1); Drop on IF1, 10 µs; Drop on IF2, 10 µs.', ar: 'الـ <b>Activities</b> (فترات وقت طولها معروف) هي:<span class="ltr">Transmit IF1 → IF2, 20 µs<br>Transmit IF2 → IF2, 15 µs<br>Drop on IF1, 10 µs<br>Drop on IF2, 10 µs</span>والتانية مكتوبة كده في الـ slide، والأغلب إن المقصود هو<span class="ltr">IF2 → IF1</span>' },
      { en: '<b>System state</b>: S = {R1, T1, D1, Q1, R2, T2, D2, Q2}: Ri = received packets on interface i, Ti = transmitted packets on interface i, Di = dropped packets at interface i, Qi = queue length of interface i.', ar: 'الـ <b>System state</b> هي المتغيرات دي:<span class="ltr">S = {R1, T1, D1, Q1, R2, T2, D2, Q2}</span>الـ Ri عدد الـ packets اللي اتستقبلت على interface i، والـ Ti اللي اتبعتت، والـ Di اللي اتعملها drop، والـ Qi طول الـ queue.' },
      { en: '<b>Event</b>: arrival of a packet {IF, Time, Packet length}. An event is instantaneous and might change the state: a packet received on IF1 adds 1 to R1.', ar: 'الـ <b>Event</b> هنا وصول packet ومعاها المعلومات دي:<span class="ltr">{IF, Time, Packet length}</span>الـ event بيحصل في لحظة وممكن يغير الـ state، يعني packet وصلت على IF1 بتزود R1 بواحد.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const ref = useRef(null), t = useTick(ref, i === 4);
    const px = i === 4 ? (calm() ? 104 : Math.min(104, 4 + (t % 4) * 70)) : -20, got = i === 4 && px >= 104;
    const cls = on => on ? 'mf1-hot' : 'mf1-box';
    const S = ['R1', 'T1', 'D1', 'Q1', 'R2', 'T2', 'D2', 'Q2'];
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 176" role="img" aria-label="A router with interfaces IF1 and IF2, its activities and an arriving packet">
        <defs>${Head('mf1-ro-a', 'var(--k-ms)')}</defs>
        <path d="M4 104 H116" stroke=${i === 1 ? 'var(--k-ms)' : 'var(--ink)'} strokeWidth=${i === 1 ? 6 : 4} />
        <path d="M184 104 H296" stroke=${i === 1 ? 'var(--k-ms)' : 'var(--ink)'} strokeWidth=${i === 1 ? 6 : 4} />
        <text x="30" y="94" textAnchor="middle" fontSize="16" fontWeight="700">IF1</text><text x="270" y="94" textAnchor="middle" fontSize="16" fontWeight="700">IF2</text>
        <g style=${{ filter: i === 0 ? 'drop-shadow(0 0 5px var(--k-ms))' : 'none' }}>
          <ellipse cx="150" cy="118" rx="38" ry="13" fill="#0369a1" /><rect x="112" y="94" width="76" height="24" fill="#0369a1" /><ellipse cx="150" cy="94" rx="38" ry="13" fill="#0ea5e9" stroke="#fff" strokeWidth="1.5" />
          <path d="M136 88 l28 12 M164 88 l-28 12" stroke="#fff" strokeWidth="2.2" /></g>
        <g className=${pop(i === 2)}>
          <path d="M40 54 Q150 4 260 54" fill="none" className="mf1-kl" style=${{ strokeWidth: 2.2 }} markerEnd="url(#mf1-ro-a)" /><text x="150" y="24" textAnchor="middle" fontSize="14" className="mf1-kt">Transmit IF1 → IF2: 20 µs</text>
          <path d="M240 72 Q150 42 60 72" fill="none" className="mf1-kl" style=${{ strokeWidth: 2.2, strokeDasharray: '5 4' }} markerEnd="url(#mf1-ro-a)" /><text x="150" y="62" textAnchor="middle" fontSize="14" className="mf1-kt">Transmit (15 µs)</text>
          <text x="58" y="138" textAnchor="middle" fontSize="14" className="mf1-pt">✕ Drop on IF1</text><text x="58" y="156" textAnchor="middle" fontSize="14" className="mf1-pt">10 µs</text>
          <text x="242" y="138" textAnchor="middle" fontSize="14" className="mf1-pt">✕ Drop on IF2</text><text x="242" y="156" textAnchor="middle" fontSize="14" className="mf1-pt">10 µs</text></g>
        ${i === 4 && html`<g><rect x=${px - 12} y="96" width="24" height="16" rx="3" fill="#facc15" stroke="#111" strokeWidth="1" /><text x="150" y="158" textAnchor="middle" fontSize="13.5">{IF, Time, Packet length}</text></g>`}
        <text x="150" y="170" textAnchor="middle" fontSize="14" className=${'mf1-kt ' + pop(i === 0)}>Entity: the router</text>
      </svg>
      <div className="mf1-st" style=${{ opacity: i >= 3 ? 1 : .35 }}>${S.map((s, k) => html`<div key=${s} className=${(i === 3 || (got && s === 'R1')) ? 'on' : ''}><b>${s}</b>${got && s === 'R1' ? 1 : 0}</div>`)}</div>
      <p className="mf1-note">R received · T transmitted · D dropped · Q queue length</p>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 27: more examples of systems and components ── */
  const SYS = [
    ['Banking', 'Customers', 'Checking-account balance', 'Making deposits; Draw money', 'Arrival; departure', 'Number of busy tellers; Number of waiting customer'],
    ['Rapid rail', 'Riders', 'Source; Destination', 'Traveling', 'Arrival at station; Arrival at destination', 'Number of riders at each station; Number of rider in transit'],
    ['Production', 'Machines', 'Speed; Capacity; Breakdown rate', 'Welding; Stamping', 'Breakdown', 'Status of machines'],
    ['Communications', 'Messages', 'Length; Destination', 'Transmitting', 'Arrival at destination', 'Number of waiting messages to be transmitted'],
    ['Inventory', 'Warehouse', 'Capacity', 'Withdrawing', 'Demand', 'Levels of inventory'],
    ['Mobility model', 'Node', 'Position; Velocity', 'Travel', 'End of movement', 'Position; Velocity']];
  const COMP = ['Entities', 'Attributes', 'Activities', 'Events', 'State variables'];
  const COMP_D = ['object of interest', 'property of an entity', 'time period of specified length', 'instantaneous occurrence that might change the state', 'describe the system at any time'];
  function SysTable({ ar }) {
    const [mode, setMode] = useState(0), [sys, setSys] = useState(0), [q, setQ] = useState(null), [pick, setPick] = useState(null), [score, setScore] = useState([0, 0]);
    const items = []; SYS.forEach((r, a) => r.slice(1).forEach((v, c) => { if (!(a === 5 && c === 4)) items.push([a, c, v]); }));
    const next = () => { let n; do { n = Math.floor(Math.random() * items.length); } while (q != null && n === q && items.length > 1); setQ(n); setPick(null); };
    useEffect(() => { if (mode === 1 && q == null) next(); }, [mode]);
    const answer = c => { if (pick != null) return; setPick(c); const [a, cc, v] = items[q], right = SYS[a].slice(1).some((x, j) => x === v && j === c); setScore(([r, n]) => [r + (right ? 1 : 0), n + 1]); };
    let body, en, a;
    if (mode === 0) {
      body = html`<div className="mf1-row">${SYS.map((r, j) => html`<button key=${j} className=${'fig-btn' + (j === sys ? ' mf1-sel' : '')} onClick=${() => setSys(j)}>${r[0]}</button>`)}</div>
        <div className="mf1-cards">${COMP.map((c, j) => html`<div key=${j} className="mf1-cd"><b>${c}</b><span>${SYS[sys][j + 1].split('; ').join(' · ')}</span></div>`)}</div>`;
      en = `<b>${SYS[sys][0]}</b> (slide 27). Entities are the objects of interest, attributes their properties, activities time periods of specified length, events instantaneous occurrences that might change the state, and the state variables describe the system at any time.`;
      a = `الـ system هنا <b>${SYS[sys][0]}</b> (slide 27). الـ entities هي الـ objects اللي تهمنا، والـ attributes خصايصها، والـ activities فترات وقت طولها معروف، والـ events حاجات بتحصل في لحظة وممكن تغير الـ state، والـ state variables بتوصف الـ system في أي لحظة.`;
    } else {
      const it = q != null ? items[q] : null, right = it ? SYS[it[0]].slice(1).map((x, j) => x === it[2] ? j : -1).filter(j => j >= 0) : [];
      body = it && html`<div className="mf1-q"><p className="mf1-note" style=${{ margin: '0 0 6px' }}>System: <b>${SYS[it[0]][0]}</b></p><div className="big">${it[2].split('; ').join(' · ')}</div>
        <div className="mf1-row">${COMP.map((c, j) => html`<button key=${j} className=${'fig-btn' + (pick != null && right.includes(j) ? ' ok' : pick === j ? ' no' : '')} onClick=${() => answer(j)}>${c}</button>`)}</div>
        ${pick != null && html`<button className="fig-btn solid" onClick=${next}>Next item ›</button>`}<p className="mf1-score">Score: ${score[0]} / ${score[1]}</p></div>`;
      if (!it) { en = ''; a = ''; }
      else if (pick == null) { en = 'Which component of the system is this? Tap your answer.'; a = 'ده أنهي component من الـ system؟ دوس على إجابتك.'; }
      else { const ok = right.includes(pick), c = right[0]; en = (ok ? '<b>Right.</b> ' : '<b>Not quite.</b> ') + `In the slide's ${SYS[it[0]][0]} row it is one of the <b>${COMP[c]}</b>: ${COMP_D[c]}.`; a = (ok ? '<b>صح.</b> ' : '<b>مش بالظبط.</b> ') + `في صف الـ ${SYS[it[0]][0]} في الـ slide دي من الـ <b>${COMP[c]}</b>.`; }
    }
    return html`<figure className="fig mf1"><div className="fig-stage">
      <${Chips} items=${['Browse the table', 'Test yourself']} sel=${mode} on=${m => { setMode(m); }} />${body}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 28: discrete vs continuous state over time ── */
  const STEP = [[0, 1], [.2, 2], [.38, 1], [.55, 2], [.75, 3]], EVT = ['arrival', 'service completed', 'arrival', 'arrival'];
  const KEYS = [[0, .12], [.24, .55], [.38, .04], [.6, .95], [.72, .48], [1, .98]];
  const water = u => { let k = 0; while (k < KEYS.length - 2 && u > KEYS[k + 1][0]) k++; const [a, ya] = KEYS[k], [b, yb] = KEYS[k + 1], f = (u - a) / (b - a); return ya + (yb - ya) * (1 - Math.cos(Math.PI * f)) / 2; };
  function DisCont({ ar }) {
    const steps = [
      { en: '<b>Discrete system</b>: the state variable changes only at a <b>discrete set of points</b> in time. Customers waiting in a bank: the count stays flat, then jumps when a customer <b>arrives</b> (up) or a <b>service is completed</b> (down).', ar: 'الـ <b>discrete system</b>: الـ state variable بيتغير بس عند <b>نقط معينة</b> في الوقت. عدد الـ customers المستنيين في البنك ثابت، وبعدين بينط لما customer <b>يوصل</b> (لفوق) أو لما <b>الخدمة تخلص</b> (لتحت).' },
      { en: '<b>Continuous system</b>: the state variable changes <b>continuously</b> over time. The head of water behind a dam rises after a rain storm and falls as water is drawn off for flood control and electricity: a smooth curve, no jumps.', ar: 'الـ <b>continuous system</b>: الـ state variable بيتغير <b>بشكل مستمر</b> مع الوقت. منسوب المية ورا السد بيعلى بعد العاصفة وبيقل لما ياخدوا مية علشان الفيضانات والكهربا، فالمنحنى ناعم ومفيهوش نطات.' },
      { en: 'Watch the cursor: on the top graph the value changes only at the marked instants; on the bottom one it changes at every moment. Examples: discrete, bank, gift shop, router, host, jobs in queue; continuous, head of water, temperature.', ar: 'بص على الخط اللي بيتحرك: في الرسمة اللي فوق القيمة بتتغير بس عند اللحظات المتعلّمة، وفي اللي تحت بتتغير كل لحظة. أمثلة الـ discrete هي البنك والـ gift shop والـ router والـ host والـ jobs in queue، وأمثلة الـ continuous هي منسوب المية والحرارة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const ref = useRef(null), t = useTick(ref), u = calm() ? 1 : (t / 8) % 1.08 > 1 ? 1 : (t / 8) % 1.08;
    const X = v => 40 + v * 250, Ys = v => 120 - v * 28, Yw = v => 120 - v * 90;
    const stepPath = STEP.map(([x, y], k) => (k ? `H${X(x)} V${Ys(y)}` : `M${X(0)} ${Ys(y)}`)).join(' ') + ` H${X(1)}`;
    const wPts = Array.from({ length: 101 }, (_, k) => `${X(k / 100)},${Yw(water(k / 100))}`).join(' ');
    const axis = (lab, id) => html`<path d="M40 8 V130 H292" fill="none" stroke="var(--k-ms)" strokeWidth="1.8" markerStart=${`url(#${id})`} markerEnd=${`url(#${id})`} /><text x="290" y="148" textAnchor="end" fontSize="15">Time</text><text x="18" y="70" textAnchor="middle" fontSize="15" transform="rotate(-90 18 70)">${lab}</text>`;
    const cur = STEP.filter(([x]) => x <= u).length;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <div style=${{ opacity: i === 1 ? .45 : 1 }} className="mf1-fade"><svg viewBox="0 0 300 152" role="img" aria-label="Customers waiting: a step function over time">
        <defs>${Head('mf1-dc-a', 'var(--k-ms)')}</defs>${axis('Customers waiting', 'mf1-dc-a')}
        <path d=${stepPath} fill="none" stroke="#dc2626" strokeWidth="2.6" />
        ${STEP.slice(1).map(([x, y], k) => html`<g key=${k} className=${pop(u >= x)}><circle cx=${X(x)} cy=${Ys(STEP[k][1])} r="3.5" fill="var(--ink)" /><text x=${X(x)} y=${Ys(Math.max(y, STEP[k][1])) - 10} textAnchor="middle" fontSize="13.5" className="mf1-kt">${y > STEP[k][1] ? '↑' : '↓'}</text></g>`)}
        <line x1=${X(u)} y1="8" x2=${X(u)} y2="130" stroke="var(--graphite)" strokeDasharray="3 3" />
      </svg>
      <p className="mf1-note" style=${{ margin: '0 0 8px' }}>${cur > 1 ? 'last change: ' + EVT[cur - 2] + (EVT[cur - 2] === 'arrival' ? ' ↑' : ' ↓') : 'no change yet'} · changes so far: ${cur - 1}</p></div>
      <div style=${{ opacity: i === 0 ? .45 : 1 }} className="mf1-fade"><svg viewBox="0 0 300 152" role="img" aria-label="Head of water: a smooth curve over time">
        <defs>${Head('mf1-dc-b', 'var(--k-ms)')}</defs>${axis('Head of water', 'mf1-dc-b')}
        <polyline points=${wPts} fill="none" stroke="#dc2626" strokeWidth="2.6" />
        <line x1=${X(u)} y1="8" x2=${X(u)} y2="130" stroke="var(--graphite)" strokeDasharray="3 3" /><circle cx=${X(u)} cy=${Yw(water(u))} r="5" fill="var(--s-ms)" />
      </svg></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 34: system and model ── */
  function SysModel({ ar }) {
    const steps = [
      { en: 'A real <b>system</b> takes an <b>input</b> and gives an <b>output</b>.', ar: 'الـ <b>system</b> الحقيقي بياخد <b>input</b> وبيطلع <b>output</b>.' },
      { en: '<b>Approach</b>: consider <b>only those aspects</b> of the system that affect the problem under investigation (the lecture notes: a model is a simplification of reality).', ar: '<b>الطريقة</b>: ناخد <b>بس الجوانب</b> من الـ system اللي بتأثر على المشكلة اللي بندرسها (والـ lecture notes بتقول إن الـ model تبسيط للواقع).' },
      { en: 'A <b>model</b> is a representation of a system for the purpose of studying the system: input I(t), output O(t).', ar: 'الـ <b>model</b> هو تمثيل للـ system بهدف إننا ندرس الـ system ده، والـ input بتاعه <bdi dir="ltr">I(t)</bdi> والـ output بتاعه <bdi dir="ltr">O(t)</bdi>.' },
      { en: '<b>Problems</b>: the <b>granularity of details</b> (how much detail to keep), and <b>models are not unique</b> (the same system can have different models).', ar: '<b>المشاكل</b>: الأولى الـ <b>granularity of details</b> يعني نسيب تفاصيل قد إيه، والتانية إن <b>الـ models مش unique</b> يعني نفس الـ system ممكن يتعمل له كذا model.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 250" style=${{ maxWidth: '420px' }} role="img" aria-label="System with input and output, an arrow down to a model with I(t) and O(t)">
        <defs>${Head('mf1-sm-a', 'var(--ink)')}</defs>
        <path d="M10 52 H82" stroke="var(--ink)" strokeWidth="2.5" markerEnd="url(#mf1-sm-a)" /><text x="44" y="42" textAnchor="middle" fontSize="15">Input</text>
        <path d="M218 52 H290" stroke="var(--ink)" strokeWidth="2.5" markerEnd="url(#mf1-sm-a)" /><text x="254" y="42" textAnchor="middle" fontSize="15">Output</text>
        <g fill="color-mix(in srgb, #fb923c 35%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.2"><circle cx="118" cy="56" r="26" /><circle cx="150" cy="40" r="30" /><circle cx="184" cy="56" r="26" /><circle cx="150" cy="70" r="24" /></g>
        <g fill="color-mix(in srgb, #fb923c 35%, var(--paper))"><circle cx="118" cy="56" r="24.5" /><circle cx="150" cy="40" r="28.5" /><circle cx="184" cy="56" r="24.5" /><circle cx="150" cy="70" r="22.5" /></g>
        <text x="150" y="60" textAnchor="middle" fontSize="19" fontWeight="700">System</text>
        <path d="M134 104 H166 V150 H182 L150 182 L118 150 H134 Z" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="1.5" className=${pop(i >= 1)} />
        <g className=${pop(i >= 2)}>
          <rect x="100" y="192" width="100" height="48" rx="3" fill="color-mix(in srgb, #fb923c 22%, var(--paper))" stroke="#fb923c" strokeWidth="1.5" /><text x="150" y="222" textAnchor="middle" fontSize="19">Model</text>
          <path d="M20 216 H96" stroke="var(--ink)" strokeWidth="2.5" markerEnd="url(#mf1-sm-a)" /><text x="56" y="207" textAnchor="middle" fontSize="15" fontStyle="italic">I(t)</text>
          <path d="M204 216 H280" stroke="var(--ink)" strokeWidth="2.5" markerEnd="url(#mf1-sm-a)" /><text x="242" y="207" textAnchor="middle" fontSize="15" fontStyle="italic">O(t)</text></g>
        <g className=${pop(i >= 3)}><text x="236" y="120" textAnchor="middle" fontSize="14" className="mf1-pt">how much</text><text x="236" y="137" textAnchor="middle" fontSize="14" className="mf1-pt">detail?</text>
          <text x="62" y="120" textAnchor="middle" fontSize="14" className="mf1-pt">not</text><text x="62" y="137" textAnchor="middle" fontSize="14" className="mf1-pt">unique</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── tree helper: [label, children, extra] ── */
  const Tree = ({ node, on, off, end, res }) => {
    const li = (n, key) => { const [lab, kids] = n; return html`<li key=${key}><span className=${'mf1-tn' + (on.includes(lab) ? ' on' : '') + (off.includes(lab) ? ' off' : '') + (end.includes(lab) ? ' end' : '')} dangerouslySetInnerHTML=${{ __html: lab }}></span>${res && res[lab] && html`<span className="mf1-res">${res[lab]}</span>`}${kids && kids.length ? html`<ul>${kids.map((k, j) => li(k, j))}</ul>` : null}</li>`; };
    return html`<div className="mf1-tr"><ul>${li(node, 0)}</ul></div>`;
  };

  /* ── slide 37: how to study a system ── */
  function HowStudy({ ar }) {
    const steps = [
      { en: 'System: how to study it? Either <b>experiment with the actual system</b>, or <b>experiment with a model of the system</b>.', ar: 'عندك system، تدرسه إزاي؟ يا إما <b>تجرب على الـ system الحقيقي نفسه</b>، يا إما <b>تجرب على model للـ system</b>.' },
      { en: 'A model is either a <b>mathematical model</b> (symbolic notation and mathematical equations) or a <b>physical model</b> (a prototype of the system, e.g. a molecule model).', ar: 'الـ model يا إما <b>mathematical model</b> (رموز ومعادلات رياضية)، يا إما <b>physical model</b> (prototype للـ system زي مجسم الجزيء).' },
      { en: 'A mathematical model is studied either by an <b>analytical model</b> (formulas) or by <b>simulation</b>, the subject of this course.', ar: 'والـ mathematical model بندرسه يا إما بـ <b>analytical model</b> (formulas)، يا إما بالـ <b>simulation</b> وهي موضوع المادة دي.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const T = ['System <small>How to study?</small>', [['Experiment with the <b>actual system</b>'], ['Experiment with a <b>model</b> of the system', i >= 1 ? [['Mathematical Model', i >= 2 ? [['Analytical Model'], ['Simulation']] : []], ['Physical Model']] : []]]];
    const on = [[], ['Experiment with a <b>model</b> of the system'], ['Mathematical Model']][i], end = i >= 2 ? ['Simulation'] : [];
    return html`<figure className="fig mf1"><div className="fig-stage"><${Tree} node=${T} on=${on} off=${[]} end=${end} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 38: mobility model d = v · t ── */
  function Mobility({ ar }) {
    const [v, setV] = useState(20), [T, setT] = useState(10), [go, setGo] = useState(0);
    const ref = useRef(null), tick = useTick(ref, go > 0), [t0, setT0] = useState(0);
    useEffect(() => { setT0(tick); }, [go]);
    const tt = go > 0 && !calm() ? Math.min(T, (tick - t0) * 2) : T, d = v * tt, max = 30 * 10, x = 20 + 250 * d / max;
    const en = `Mobility model: <b>d = v · t</b>, assuming a <b>constant velocity</b> v over the whole time t. Here v = ${v} m/s and t = ${tt.toFixed(1)} s, so d = ${v} × ${tt.toFixed(1)} = <b>${d.toFixed(0)} m</b>. Advantage: simple and intuitive. Disadvantage: <b>seldom valid</b> for a whole travel (humans, cars, planes change speed).`;
    const a = `الـ mobility model بيقول المسافة تساوي السرعة في الزمن، على فرض إن الـ <b>velocity ثابتة</b> طول الوقت.<span class="ltr">d = v · t = ${v} × ${tt.toFixed(1)} = ${d.toFixed(0)} m</span>الميزة إنه بسيط وسهل نفهمه. العيب إنه <b>نادرًا ما بيكون صح</b> لرحلة كاملة، لأن الناس والعربيات والطيارات بيغيروا سرعتهم.`;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 92" role="img" aria-label="A car moving at constant speed on a road">
        <rect x="0" y="50" width="300" height="26" fill="#6b7280" /><path d="M0 63 H300" stroke="#fff" strokeWidth="2" strokeDasharray="10 8" />
        <path d="M20 40 V82" stroke="var(--k-ms)" strokeWidth="2" /><path d=${`M${x} 40 V82`} stroke="var(--k-ms)" strokeWidth="2" />
        <path d=${`M20 30 H${x}`} stroke="var(--k-ms)" strokeWidth="2" /><text x=${Math.max(60, Math.min(250, (20 + x) / 2))} y="22" textAnchor="middle" fontSize="15" className="mf1-kt">d = ${d.toFixed(0)} m</text>
        <g transform=${`translate(${x - 30} 44)`}><rect x="0" y="6" width="30" height="10" rx="3" fill="#dc2626" /><path d="M6 6 L10 0 H22 L26 6 Z" fill="#dc2626" /><circle cx="7" cy="17" r="3.5" fill="#111" /><circle cx="23" cy="17" r="3.5" fill="#111" /></g>
      </svg>
      <label className="mf1-sl"><span>v (m/s)</span><input type="range" min="1" max="30" value=${v} onInput=${e => { setV(+e.target.value); setGo(0); }} /><output>${v}</output></label>
      <label className="mf1-sl"><span>t (s)</span><input type="range" min="0" max="10" step="0.5" value=${T} onInput=${e => { setT(+e.target.value); setGo(0); }} /><output>${T}</output></label>
      <div className="mf1-row"><button className="fig-btn solid" onClick=${() => setGo(g => g + 1)}>▶ Drive</button></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 39: free-space radio propagation ── */
  function FreeSpace({ ar }) {
    const [d, setD] = useState(10), [wall, setWall] = useState(false);
    const extra = 20 * Math.log10(d), X = v => 40 + v * 10, Y = v => 130 - v * 3.6, ax = 40 + (d - 1) / 24 * 216, mid = (40 + ax) / 2;
    const pts = Array.from({ length: 49 }, (_, k) => { const x = 1 + k * .5; return `${X(x)},${Y(20 * Math.log10(x))}`; }).join(' ');
    const en = wall ? 'With an obstacle between the antennas there is no direct line of sight: the free-space model\'s assumptions (LOS, no obstacles) do not hold, which is why it is not really useful for <b>indoor and city</b> environments.' : `Free-space model: PL<sub>dB</sub>(d) = −10 lg( G<sub>t</sub> G<sub>r</sub> λ² / ((4π)² d²) ). Only d² changes with distance, so the loss grows by 20 lg d compared with 1 m: at d = ${d} m it is <b>${extra.toFixed(1)} dB</b> more than at 1 m (each doubling of d adds about 6 dB). Assumptions: <b>direct line of sight (LOS)</b>, <b>no obstacles</b>. Advantage: simple asymptotic formulae for open space.`;
    const a = wall ? 'لو فيه عائق بين الـ antennas مفيش line of sight مباشر، فافتراضات الـ free-space model (الـ LOS ومفيش عوائق) مش متحققة، وعلشان كده هو مش مفيد أوي <b>جوه المباني وفي المدن</b>.' : `الـ free-space model:<span class="ltr">PL<sub>dB</sub>(d) = −10 lg( G<sub>t</sub> G<sub>r</sub> λ² / ((4π)² d²) )</span>الحاجة الوحيدة اللي بتتغير مع المسافة هي d²، فالـ loss بيزيد بمقدار 20 lg d عن الـ 1 m. عند مسافة ${d} m الزيادة <b>${extra.toFixed(1)} dB</b>، وكل ما d تتضاعف بنزود حوالي 6 dB. الافتراضات هي <b>line of sight مباشر</b> و<b>مفيش عوائق</b>، والميزة إن الـ formulas بسيطة للأماكن المفتوحة.`;
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 70" role="img" aria-label="Two antennas a distance d apart">
        <g><path d="M30 64 L36 30 H44 L50 64 Z" fill="#cbd5e1" stroke="var(--graphite)" /><circle cx="40" cy="26" r="4" fill="var(--k-ms)" /></g>
        <g transform=${`translate(${ax - 40} 0)`}><path d="M30 64 L36 30 H44 L50 64 Z" fill="#cbd5e1" stroke="var(--graphite)" /><circle cx="40" cy="26" r="4" fill="var(--k-ms)" /></g>
        <path d=${`M46 26 H${ax - 6}`} stroke=${wall ? 'var(--faint)' : '#dc2626'} strokeWidth="2" strokeDasharray=${wall ? '3 4' : '5 3'} />
        ${wall && html`<rect x=${mid - 5} y="6" width="10" height="58" fill="var(--graphite)" />`}
        <text x=${Math.max(90, Math.min(210, mid))} y="60" textAnchor="middle" fontSize="15" fontStyle="italic">d = ${d} m</text>
      </svg>
      <svg viewBox="0 0 300 160" role="img" aria-label="Extra path loss compared with 1 m against distance">
        <path d="M40 8 V130 H292" fill="none" stroke="var(--graphite)" strokeWidth="1.5" />
        ${[0, 10, 20, 30].map(v => html`<text key=${v} x="34" y=${Y(v) + 5} textAnchor="end" fontSize="14" className="mf1-gt">${v}</text>`)}
        ${[1, 5, 10, 15, 20, 25].map(v => html`<text key=${v} x=${X(v)} y="148" textAnchor="middle" fontSize="14" className="mf1-gt">${v}</text>`)}
        <polyline points=${pts} fill="none" stroke="#dc2626" strokeWidth="2.4" style=${{ opacity: wall ? .3 : 1 }} />
        <circle cx=${X(d)} cy=${Y(extra)} r="5.5" fill="var(--s-ms)" />
        <text x="290" y="122" textAnchor="end" fontSize="13.5" className="mf1-gt">distance d [m]</text>
        <text x="48" y="20" fontSize="13.5" className="mf1-gt">loss above 1 m [dB]</text>
      </svg>
      <label className="mf1-sl"><span>d (m)</span><input type="range" min="1" max="25" value=${d} onInput=${e => setD(+e.target.value)} /><output>${d} m</output></label>
      <div className="mf1-row"><button className=${'fig-btn' + (wall ? ' mf1-sel' : '')} aria-pressed=${wall} onClick=${() => setWall(w => !w)}>${wall ? 'Remove the obstacle' : 'Put an obstacle in between'}</button></div>
      <p className="mf1-note">The slide's measured curve zig-zags around the theoretical one: the model only approximates reality.</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 40: ISO/OSI network model ── */
  const OSI = ['Application', 'Presentation', 'Session', 'Transport', 'Network', 'Data Link', 'Physical'];
  function Osi({ ar }) {
    const steps = [
      { en: 'Host A and Host B each have <b>7 layers</b> with an application process on top; Router A and Router B have only the <b>Network, Data Link and Physical</b> layers.', ar: 'كل Host فيهم (A و B) فيه <b>7 layers</b> وفوقهم الـ application process، أما الـ Routers (A و B) فيهم بس الـ <b>Network والـ Data Link والـ Physical</b>.' },
      { en: 'Data goes <b>down</b> Host A, across the routers (up to their Network layer and down again), and <b>up</b> Host B to the application process.', ar: 'الداتا بتنزل <b>لتحت</b> في Host A، وبعدين تعدي على الـ routers (تطلع لحد الـ Network layer وتنزل تاني)، وبعدين <b>تطلع لفوق</b> في Host B لحد الـ application process.' },
      { en: 'Peer layers of the two hosts talk through the <b>Application, Presentation, Session and Transport protocols</b> (end to end).', ar: 'الـ layers المتقابلة في الـ hosts بتكلم بعض بالـ <b>Application و Presentation و Session و Transport protocols</b> من طرف لطرف.' },
      { en: 'Between the routers the lower layers use <b>internal protocols</b>.', ar: 'وبين الـ routers الـ layers اللي تحت بتستخدم <b>internal protocols</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const ref = useRef(null), t = useTick(ref, i === 1);
    const cx = [140, 180, 220, 260], ry = k => 34 + k * 26, W = 300;
    const route = [[cx[0], ry(0)], [cx[0], ry(6)], [cx[1], ry(6)], [cx[1], ry(4)], [cx[1], ry(6)], [cx[2], ry(6)], [cx[2], ry(4)], [cx[2], ry(6)], [cx[3], ry(6)], [cx[3], ry(0)]];
    const L = plen(route), dot = i === 1 ? along(route, calm() ? L : (t * 110) % (L + 60) > L ? L : (t * 110) % (L + 60)) : null;
    const has = (c, k) => c === 0 || c === 3 || k >= 4;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox=${`0 0 ${W} 232`} style=${{ maxWidth: '440px' }} role="img" aria-label="Seven-layer stacks for two hosts, three-layer stacks for two routers">
        ${['A', 'RA', 'RB', 'B'].map((h, c) => html`<text key=${h} x=${cx[c]} y="16" textAnchor="middle" fontSize="14" fontWeight="700">${h}</text>`)}
        ${OSI.map((n, k) => html`<g key=${n}><text x="4" y=${ry(k) + 5} fontSize="14" className=${(i === 2 && k < 4) || (i === 3 && k >= 4) ? 'mf1-kt' : ''}>${n}</text>
          ${cx.map((x, c) => has(c, k) && html`<rect key=${c} x=${x - 15} y=${ry(k) - 10} width="30" height="20" rx="3" className=${(i === 2 && k < 4 && (c === 0 || c === 3)) || (i === 3 && k >= 4 && (c === 1 || c === 2)) ? 'mf1-hot' : 'mf1-box'} />`)}</g>`)}
        ${i === 2 && [0, 1, 2, 3].map(k => html`<path key=${k} d=${`M${cx[0] + 16} ${ry(k)} H${cx[3] - 16}`} className="mf1-kl" style=${{ strokeWidth: 2, strokeDasharray: '4 3' }} />`)}
        ${i === 3 && [4, 5, 6].map(k => html`<path key=${k} d=${`M${cx[1] + 16} ${ry(k)} H${cx[2] - 16}`} className="mf1-kl" style=${{ strokeWidth: 2, strokeDasharray: '4 3' }} />`)}
        ${i >= 1 && html`<polyline points=${route.map(p => p.join(',')).join(' ')} fill="none" stroke="var(--pen)" strokeWidth="1.8" style=${{ opacity: i === 1 ? .9 : .25 }} />`}
        ${dot && html`<circle cx=${dot[0]} cy=${dot[1]} r="6" fill="#facc15" stroke="#111" />`}
        <text x="4" y="222" fontSize="13.5" className="mf1-gt">A, B = hosts · RA, RB = routers</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 41: TCP/IP compared with ISO/OSI ── */
  function TcpIp({ ar }) {
    const T = [['Application Layer', [0]], ['Don\'t exist', [1, 2]], ['Transport Layer', [3]], ['Internet Layer', [4]], ['Host-to-Network Layer', [5, 6]]];
    const [sel, setSel] = useState(0);
    const msgs = [
      ['<b>Application</b> ↔ Application: both models have it.', 'الـ <b>Application</b> موجودة في الاتنين.'],
      ['<b>Presentation</b> and <b>Session</b> <b>don\'t exist</b> in TCP/IP.', 'الـ <b>Presentation</b> والـ <b>Session</b> <b>مش موجودين</b> في الـ <bdi dir="ltr">TCP/IP</bdi>.'],
      ['<b>Transport</b> ↔ Transport: both models have it.', 'الـ <b>Transport</b> موجودة في الاتنين.'],
      ['The OSI <b>Network</b> layer is the TCP/IP <b>Internet layer</b>.', 'الـ <b>Network layer</b> في الـ OSI هي الـ <b>Internet layer</b> في الـ <bdi dir="ltr">TCP/IP</bdi>.'],
      ['OSI <b>Data Link + Physical</b> together are the TCP/IP <b>Host-to-Network layer</b>.', 'الـ <b>Data Link والـ Physical</b> في الـ OSI مع بعض هما الـ <b>Host-to-Network layer</b> في الـ <bdi dir="ltr">TCP/IP</bdi>.']];
    const rows = [1, 2, 1, 1, 2];
    return html`<figure className="fig mf1"><div className="fig-stage"><div className="mf1-two">
      <div><h5>ISO/OSI</h5><div className="mf1-stk">${OSI.map((n, k) => html`<div key=${k} className=${T[sel][1].includes(k) ? 'on' : ''} onClick=${() => setSel(T.findIndex(x => x[1].includes(k)))}>${n} Layer</div>`)}</div></div>
      <div><h5>TCP/IP</h5><div className="mf1-stk">${T.map(([n], k) => html`<div key=${k} className=${(k === sel ? 'on' : '') + (k === 1 ? ' none' : '')} style=${{ height: rows[k] * 34 + 'px' }} onClick=${() => setSel(k)}>${n}</div>`)}</div></div>
      </div><p className="mf1-note">Tap a layer to see what it matches.</p></div>
      <${Cap} en=${msgs[sel][0]} ar=${msgs[sel][1]} showAr=${ar} /></figure>`;
  }

  /* ── slide 42: six-level computer model ── */
  function SixLevel({ ar }) {
    const LV = [['Level 5', 'Problem-oriented language level', 'Translation (Compiler)'], ['Level 4', 'Assembly language level', 'Translation (Assembler)'], ['Level 3', 'Operating system machine level', 'Partial interpretation (operating system)'], ['Level 2', 'ISA (Instruction Set Architecture) level', 'Interpretation (microprogram) or direct execution'], ['Level 1', 'Microarchitecture level', 'Hardware'], ['Level 0', 'Digital logic level', '']];
    const steps = LV.map(([l, n, x], k) => k < 5 ? { en: `<b>${l}</b>: ${n}. Going down to level ${4 - k}: <b>${x}</b>.`, ar: `الـ <b>${l}</b> هو الـ ${n}، وعلشان ننزل للـ level اللي تحته بنستخدم الـ <b>${x}</b>.` } : { en: '<b>Level 0</b>: Digital logic level, the bottom of the model.', ar: 'الـ <b>Level 0</b> هو الـ Digital logic level، وده آخر مستوى تحت.' });
    steps.unshift({ en: 'The <b>six-level computer model</b>: each level is a model of the computer, and each one is turned into the level below it by translation or interpretation.', ar: 'الـ <b>six-level computer model</b>: كل level عبارة عن model للكمبيوتر، وكل level بيتحول للـ level اللي تحته عن طريق translation أو interpretation.' });
    const [i, ctl] = useSteps(steps.length, 2400);
    return html`<figure className="fig mf1"><div className="fig-stage"><div className="mf1-lv">
      ${LV.map(([l, n, x], k) => html`<div key=${k}><div className="lv"><i>${l}</i><span className=${i === k + 1 ? 'on' : ''}>${n}</span></div>${k < 5 && html`<div className="tx" style=${{ opacity: i === 0 || i === k + 1 ? 1 : .35 }}>${x}</div>`}</div>`)}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 43: delays on a communication link ── */
  function LinkDelay({ ar }) {
    const steps = [
      { en: 'A packet in a network suffers various delays on its way from router A to router B.', ar: 'الـ packet في الـ network بتتأخر كذا نوع تأخير وهي رايحة من router A لـ router B.' },
      { en: '<b>Processing</b> in the node: examine the packet header.', ar: 'الأول الـ <b>Processing</b> جوه الـ node، يعني فحص الـ header بتاع الـ packet.' },
      { en: '<b>Queueing</b>: the packet waits for transmission behind the packets ahead of it.', ar: 'وبعدين الـ <b>Queueing</b>، يعني الـ packet بتستنى دورها في الـ transmission ورا الـ packets اللي قبلها.' },
      { en: '<b>Transmission</b>: the time to put all bits of the packet on the medium.', ar: 'وبعدين الـ <b>Transmission</b>، يعني الوقت اللي بناخده علشان نحط كل الـ bits بتاعة الـ packet على الـ medium.' },
      { en: '<b>Propagation</b>: the time to propagate on the medium from A to B.', ar: 'وآخر حاجة الـ <b>Propagation</b>، يعني الوقت اللي الإشارة بتاخده وهي ماشية على الـ medium من A لـ B.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const ref = useRef(null), t = useTick(ref, i === 4), prop = i === 4 ? (calm() ? 1 : Math.min(1, (t % 3) / 2)) : 0;
    const pk = i <= 1 ? [96, 116] : i === 2 ? [112, 116] : i === 3 ? [146, 116] : [146 + prop * 110, 116];
    const lab = ['', 'Nodal processing', 'Queueing', 'Transmission', 'Propagation'];
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 190" role="img" aria-label="Two computers send packets to router A; packets queue then travel along the link to router B">
        <defs>${Head('mf1-ld-a')}</defs>
        <g><rect x="6" y="30" width="34" height="26" rx="2" className="mf1-box" /><rect x="10" y="34" width="26" height="18" fill="#94a3b8" /><rect x="6" y="160" width="34" height="26" rx="2" className="mf1-box" /><rect x="10" y="164" width="26" height="18" fill="#94a3b8" /></g>
        <path d="M40 48 L92 112 M40 168 L92 120" className="mf1-ln" />
        <path d="M96 116 H256" stroke="var(--graphite)" strokeWidth="4" />
        <g><ellipse cx="104" cy="122" rx="20" ry="8" fill="#94a3b8" /><rect x="84" y="102" width="40" height="20" fill="#94a3b8" /><ellipse cx="104" cy="102" rx="20" ry="8" fill="#cbd5e1" stroke="var(--graphite)" /><text x="104" y="86" textAnchor="middle" fontSize="15" fontWeight="700">A</text></g>
        <g><ellipse cx="270" cy="122" rx="20" ry="8" fill="#94a3b8" /><rect x="250" y="106" width="40" height="16" fill="#94a3b8" /><ellipse cx="270" cy="106" rx="20" ry="8" fill="#cbd5e1" stroke="var(--graphite)" /><text x="270" y="88" textAnchor="middle" fontSize="15" fontWeight="700">B</text></g>
        ${i >= 2 && [0, 1, 2].map(k => html`<rect key=${k} x=${120 + k * 8} y="108" width="7" height="16" fill="#2563eb" style=${{ opacity: i === 2 ? 1 : .45 }} />`)}
        ${i === 3 && html`<rect x="140" y="104" width="12" height="24" fill="none" stroke="var(--k-ms)" strokeWidth="2" />`}
        <rect x=${pk[0] - 6} y=${pk[1] - 9} width="12" height="18" fill="#facc15" stroke="#111" style=${{ transition: calm() ? 'none' : 'x .5s' }} />
        ${i === 1 && html`<circle cx="104" cy="112" r="20" fill="none" stroke="var(--k-ms)" strokeWidth="2.5" />`}
        ${i === 4 && html`<path d="M152 140 H256" className="mf1-kl" style=${{ strokeWidth: 2 }} markerEnd="url(#mf1-ld-a)" />`}
        <text x="186" y="176" textAnchor="middle" fontSize="16" className="mf1-kt">${lab[i]}</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 44: cellular system model ── */
  function Cells({ ar }) {
    const [k, setK] = useState(0);
    const uses = ['cellular networks', 'WLAN', 'WIMAX', 'Wireless Mesh networks'];
    const r = 22, w = Math.sqrt(3) * r, cells = [];
    for (let row = 0; row < 6; row++) for (let col = 0; col < 8; col++) { const x = 4 + w / 2 + col * w + (row % 2 ? w / 2 : 0), y = 24 + row * r * 1.5; if (x + w / 2 <= 298) cells.push([x, y]); }
    const hex = (x, y) => Array.from({ length: 6 }, (_, j) => { const a = Math.PI / 180 * (60 * j - 30); return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`; }).join(' ');
    const ref = useRef(null), t = useTick(ref), lit = Math.floor(t * 1.5) % cells.length;
    return html`<figure className="fig mf1" ref=${ref}><div className="fig-stage">
      <svg viewBox="0 0 300 210" role="img" aria-label="A grid of hexagonal cells">
        ${cells.map(([x, y], j) => html`<polygon key=${j} points=${hex(x, y)} fill=${j === lit ? 'color-mix(in srgb, var(--k-ms) 40%, var(--paper))' : 'color-mix(in srgb, #fb923c 18%, var(--paper))'} stroke="#1e3a8a" strokeWidth="2" />`)}
        ${cells.map(([x, y], j) => html`<circle key=${'c' + j} cx=${x} cy=${y} r="2.5" fill="var(--graphite)" />`)}
      </svg>
      <${Chips} items=${uses} sel=${k} on=${setK} /></div>
      <${Cap} en=${`<b>Multi-cellular network system model</b>: the area is divided into hexagonal cells. The same model can be used for ${uses.map((u, j) => j === k ? '<b>' + u + '</b>' : u).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`} ar=${'الـ <b>multi-cellular network system model</b> بيقسم المساحة لـ cells شكلها سداسي. ونفس الـ model ده ينفع للـ cellular networks والـ WLAN والـ WIMAX والـ Wireless Mesh networks.'} showAr=${ar} /></figure>`;
  }

  /* ── slide 45: user behavior at three levels ── */
  function UserLevels({ ar }) {
    const U = [[14, 22], [74, 22], [158, 22], [254, 22]], O = [[14, 46], [74, 70], [158, 92], [254, 40]], PK = [2, 3, 3, 2];
    const steps = [
      { en: '<b>User / application level</b>: short user or application actions (e.g. a click).', ar: 'الـ <b><bdi dir="ltr">User/Application&nbsp;level</bdi></b>: أفعال قصيرة من الـ user أو الـ application (زي click).' },
      { en: '<b>Object level</b>: each action produces a longer object transfer.', ar: 'الـ <b>Object level</b>: كل فعل بيطلع عنه object transfer أطول.' },
      { en: '<b>Packet level</b>: each object is split into several packets. User behavior can be modelled at any of the three levels.', ar: 'الـ <b>Packet level</b>: كل object بيتقسم لكذا packet. ونقدر نعمل model لسلوك الـ user على أي level من التلاتة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const Y = [40, 92, 144];
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 168" role="img" aria-label="Three time lines: user actions, objects, packets">
        ${['User/Application', 'Object', 'Packet'].map((l, k) => html`<g key=${l} className=${pop(i >= k)}><text x="4" y=${Y[k] - 16} fontSize="14" fontWeight="600">${l}</text><path d=${`M4 ${Y[k]} H296`} stroke="#1e3a8a" strokeWidth="1.8" /></g>`)}
        ${U.map(([x, w], k) => html`<rect key=${'u' + k} x=${x} y=${Y[0] - 10} width="12" height="10" fill="#fed7aa" stroke="var(--graphite)" />`)}
        ${O.map(([x, w], k) => html`<rect key=${'o' + k} x=${x} y=${Y[1] - 12} width=${w} height="12" fill="#facc15" stroke="var(--graphite)" className=${pop(i >= 1)} />`)}
        ${O.map(([x, w], k) => Array.from({ length: PK[k] }, (_, j) => { const pw = w / PK[k]; return html`<rect key=${'p' + k + j} x=${x + j * pw + 1} y=${Y[2] - 12} width=${pw - 2} height="12" fill="#4ade80" stroke="var(--graphite)" className=${pop(i >= 2)} />`; }))}
        ${i >= 1 && U.map(([x], k) => html`<path key=${'a' + k} d=${`M${x + 6} ${Y[0] + 2} V${Y[1] - 14}`} stroke="var(--faint)" strokeDasharray="2 3" />`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 50: kinds of simulation models (explore) ── */
  function Taxonomy({ ar }) {
    const [a, setA] = useState(1), [b, setB] = useState(1), [c, setC] = useState(1);
    const name = a === 0 ? (b === 1 ? 'Monte Carlo Simulation' : null) : (b === 1 ? (c === 1 ? 'Discrete-event Simulation' : null) : null);
    const T = ['Models', [['static', [['deterministic'], ['stochastic ']]], ['dynamic', [['deterministic '], ['stochastic', [['continuous'], ['discrete']]]]]]];
    const path = ['Models', a ? 'dynamic' : 'static', a ? (b ? 'stochastic' : 'deterministic ') : (b ? 'stochastic ' : 'deterministic')].concat(a && b ? [c ? 'discrete' : 'continuous'] : []);
    const all = ['Models', 'static', 'dynamic', 'deterministic', 'stochastic ', 'deterministic ', 'stochastic', 'continuous', 'discrete'];
    const res = { 'stochastic ': 'Monte Carlo Simulation', discrete: 'Discrete-event Simulation' };
    const en = `Static: the system at a particular point in time; dynamic: over a time interval. Deterministic: no random variables; stochastic: with random variables. Discrete: state changes only at discrete time points; continuous: continuously. Your choice: <b>${path.slice(1).map(s => s.trim()).join(', ')}</b>${name ? ' = <b>' + name + '</b>' : ''}.${a && b && c ? ' This course focuses on <b>discrete, dynamic, stochastic</b> models.' : ''}`;
    const arT = `الـ static بيمثل الـ system في لحظة معينة، والـ dynamic على فترة من الوقت. الـ deterministic مفيهوش random variables، والـ stochastic فيه. الـ discrete الـ state بيتغير فيه عند نقط معينة بس، والـ continuous بيتغير على طول. اختيارك هو<span class="ltr">${path.slice(1).map(s => s.trim()).join(' + ')}${name ? ' = ' + name : ''}</span>${a && b && c ? 'والمادة دي بتركز على الـ models اللي هي <b>discrete و dynamic و stochastic</b>.' : ''}`;
    return html`<figure className="fig mf1"><div className="fig-stage">
      <${Chips} items=${['static', 'dynamic']} sel=${a} on=${setA} />
      <${Chips} items=${['deterministic', 'stochastic']} sel=${b} on=${setB} />
      ${a === 1 && b === 1 && html`<${Chips} items=${['continuous', 'discrete']} sel=${c} on=${setC} />`}
      <${Tree} node=${T} on=${path.slice(0, -1)} off=${all.filter(x => !path.includes(x))} end=${[path[path.length - 1]]} res=${res} /></div>
      <${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── lecture notes Fig 1.4: types of models ── */
  function Fig14({ ar }) {
    const steps = [
      { en: 'Fig 1.4: <b>models</b> are physical or mathematical.', ar: 'الـ Fig 1.4: الـ <b>models</b> يا إما physical يا إما mathematical.' },
      { en: 'A <b>mathematical</b> model is <b>static</b> (relationships between attributes when the system is in equilibrium) or <b>dynamic</b> (attributes change as a function of time).', ar: 'الـ <b>mathematical</b> model يا إما <b>static</b> (العلاقة بين الـ attributes والـ system في حالة توازن) يا إما <b>dynamic</b> (الـ attributes بتتغير كـ function في الوقت).' },
      { en: 'A static model is solved by <b>numerical</b> or <b>analytical</b> methods; a dynamic one by <b>numerical</b> computation, which is <b>simulation</b>.', ar: 'الـ static model بيتحل بطرق <b>numerical</b> أو <b>analytical</b>، والـ dynamic بالحساب الـ <b>numerical</b> وده اللي هو الـ <b>simulation</b>.' },
      { en: 'A simulation model is then characterized as static / dynamic, deterministic / stochastic, discrete / continuous.', ar: 'وبعدين الـ simulation model بنوصفه بالأزواج دي:<span class="ltr">Static / Dynamic<br>Deterministic / Stochastic<br>Discrete / Continuous</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const T = ['Models', [['Physical'], ['Mathematical', i >= 1 ? [['Static', i >= 2 ? [['Numerical'], ['Analytical']] : []], ['Dynamic', i >= 2 ? [['Numerical ', [['Simulation', i >= 3 ? [['Static / Dynamic'], ['Deterministic / Stochastic'], ['Discrete / Continuous']] : []]]]] : []]] : []]]];
    const on = [['Models'], ['Mathematical'], ['Dynamic', 'Numerical '], ['Simulation']][i];
    return html`<figure className="fig mf1"><div className="fig-stage"><${Tree} node=${T} on=${on} off=${[]} end=${i >= 2 ? ['Simulation'] : []} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 53-54: selecting performance metrics, web server example ── */
  function Metrics({ ar }) {
    const O = [
      { t: 'Done correctly', e: '', m: [['Time (Response time)', '300 msec = 0.3 sec'], ['Rate (Throughput)', '8420 queries/min = 12.5 MB/sec'], ['Resources (Utilization)', '48.4% Load']] },
      { t: 'Done incorrectly', e: 'Error j: Page not found', m: [['Probability', 'p = 0.3'], ['Time between errors', '30 min = 1800 sec']] },
      { t: 'Cannot do', e: 'Event k: Server Down', m: [['Duration of the event', '1 Hour = 3600 sec'], ['Time between events', '1 Day = 86400 sec']] }];
    const steps = [
      { en: 'A <b>request for service i</b> enters the <b>system</b> (here a web server; the request is "Get page name.html"). Three things can happen.', ar: 'فيه <b>request for service i</b> بيدخل الـ <b>system</b>، وهنا الـ system هو web server والـ request هو <bdi dir="ltr">Get page name.html</bdi>. فيه 3 احتمالات.' },
      { en: '<b>Done correctly</b> → measure <b>time</b> (response time), <b>rate</b> (throughput) and <b>resources</b> (utilization). Web server: 300 msec = 0.3 sec; 8420 queries/min = 12.5 MB/sec; 48.4% load.', ar: 'لو <b>اتعمل صح</b> بنقيس الـ <b>time</b> (الـ response time) والـ <b>rate</b> (الـ throughput) والـ <b>resources</b> (الـ utilization). في الـ web server القيم هي:<span class="ltr">300 msec = 0.3 sec<br>8420 queries/min = 12.5 MB/sec<br>48.4% Load</span>' },
      { en: '<b>Done incorrectly</b> → <b>error j</b> (page not found) → measure its <b>probability</b> (p = 0.3) and the <b>time between errors</b> (30 min = 1800 sec).', ar: 'لو <b>اتعمل غلط</b> يبقى حصل <b>error j</b>، يعني الصفحة مش موجودة. ساعتها بنقيس الـ <b>probability</b> بتاعته، والوقت بين الـ errors وده الـ <b>time between errors</b>.<span class="ltr">p = 0.3<br>30 min = 1800 sec</span>' },
      { en: '<b>Cannot do</b> → <b>event k</b> (server down) → measure the <b>duration of the event</b> (1 hour = 3600 sec) and the <b>time between events</b> (1 day = 86400 sec).', ar: 'لو <b>مقدرش يعمله</b> يبقى حصل <b>event k</b>، يعني الـ server وقع. ساعتها بنقيس مدة الـ event وده الـ <b>duration of the event</b>، والوقت بين الـ events وده الـ <b>time between events</b>.<span class="ltr">1 Hour = 3600 sec<br>1 Day = 86400 sec</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    return html`<figure className="fig mf1"><div className="fig-stage"><div className="mf1-mt">
      <div className="req"><span className="mf1-top" style=${{ fontSize: '.95rem', padding: '6px 14px' }}>Request for service <i>i</i></span><div className="mf1-stem" style=${{ background: '#dc2626', width: '3px' }}></div><span className="mf1-pill" style=${{ color: 'var(--ink)', fontSize: '.95rem', padding: '3px 16px' }}>System</span></div>
      <div className="outs">${O.map((o, k) => html`<div key=${k} className=${'out c' + k + (i === k + 1 ? ' on' : '') + (i > 0 && i !== k + 1 ? ' dim' : '')} onClick=${() => ctl.go(k + 1)}>
        <b>${o.t}${o.e && html` → <em>${o.e}</em>`}</b>
        ${i === k + 1 && html`<div className="ms">${o.m.map(([n, v], j) => html`<div key=${j}><b>${n}</b><span>${v}</span></div>`)}</div>`}</div>`)}</div>
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 55-56: response time and its relatives ── */
  function RespTime({ ar }) {
    const EV = [['User starts request', 28], ['User finishes request', 68], ['System starts execution', 128], ['System starts response', 180], ['System completes response', 232], ['User starts next request', 292]];
    const IV = [null, null, ['Reaction time', 1, 2, 128], ['Response time', 1, 3, 98], ['Response time', 1, 4, 68], ['Think time', 4, 5, 128]];
    const steps = [
      { en: 'Slide 55: <b>response time</b> is the time between the <b>user request</b> and the <b>system response</b>.', ar: 'الـ slide 55: الـ <b>response time</b> هو الوقت بين <b>طلب الـ user</b> و<b>رد الـ system</b>.' },
      { en: 'Slide 56 splits the time line (going down here) into six instants.', ar: 'الـ slide 56 بتقسم خط الوقت (نازل لتحت هنا) لـ 6 لحظات.' },
      { en: '<b>Reaction time</b> = from <b>user finishes request</b> to <b>system starts execution</b>.', ar: 'الـ <b>Reaction time</b> من لحظة <b>الـ user يخلص الطلب</b> لحد <b>الـ system يبدأ التنفيذ</b>.' },
      { en: '<b>Response time</b> (first definition) = from <b>user finishes request</b> to <b>system starts response</b>.', ar: 'الـ <b>Response time</b> (التعريف الأول) من لحظة <b>الـ user يخلص الطلب</b> لحد <b>الـ system يبدأ الرد</b>.' },
      { en: '<b>Response time</b> (second definition) = from <b>user finishes request</b> to <b>system completes response</b>.', ar: 'الـ <b>Response time</b> (التعريف التاني) من لحظة <b>الـ user يخلص الطلب</b> لحد <b>الـ system يخلص الرد</b>.' },
      { en: '<b>Think time</b> = from <b>system completes response</b> to <b>user starts next request</b>.', ar: 'الـ <b>Think time</b> من لحظة <b>الـ system يخلص الرد</b> لحد <b>الـ user يبدأ الطلب اللي بعده</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const show = i === 0 ? [1, 4] : [0, 1, 2, 3, 4, 5], lab0 = { 1: 'User request', 4: 'System response' };
    const iv = i === 0 ? ['Response time', 1, 4, 128] : IV[i];
    const on = iv ? [iv[1], iv[2]] : [];
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 316" style=${{ maxWidth: '400px' }} role="img" aria-label="A vertical time line with six instants and the intervals between them">
        <defs>${Head('mf1-rt-a', 'var(--k-ms)')}${Head('mf1-rt-b', 'var(--ink)')}</defs>
        <path d="M150 8 V310" stroke="var(--k-ms)" strokeWidth="2" markerEnd="url(#mf1-rt-a)" /><text x="144" y="310" textAnchor="end" fontSize="14">Time</text>
        ${EV.map(([n, y], k) => show.includes(k) && html`<g key=${k}><path d=${`M146 ${y} H158`} stroke="var(--ink)" strokeWidth="2.5" />${(i === 0 ? lab0[k] : n).replace(/ (\S+)$/, '\n$1').split('\n').map((w, j) => html`<text key=${j} x="164" y=${y + 5 + j * 16 - 8} fontSize="13.5" className=${on.includes(k) ? 'mf1-kt' : ''}>${w}</text>`)}</g>`)}
        ${i >= 2 && IV.filter(Boolean).map(([n, a, b, x], k) => IV[i] && IV[i][0] === n && IV[i][2] === b ? null : html`<path key=${k} d=${`M${x} ${EV[a][1]} V${EV[b][1]}`} stroke="var(--faint)" strokeWidth="1.5" />`)}
        ${iv && html`<g><path d=${`M${iv[3]} ${EV[iv[1]][1] + 1} V${EV[iv[2]][1] - 1}`} stroke="var(--ink)" strokeWidth="2.2" markerStart="url(#mf1-rt-b)" markerEnd="url(#mf1-rt-b)" />
          <path d=${`M${iv[3] - 6} ${EV[iv[1]][1]} H146 M${iv[3] - 6} ${EV[iv[2]][1]} H146`} stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2" />
          <text x=${iv[3] - 8} y=${(EV[iv[1]][1] + EV[iv[2]][1]) / 2 + 5} textAnchor="end" fontSize="14" className="mf1-kt">${iv[0].split(' ')[0]}</text><text x=${iv[3] - 8} y=${(EV[iv[1]][1] + EV[iv[2]][1]) / 2 + 22} textAnchor="end" fontSize="14" className="mf1-kt">time</text></g>`}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 57: utility classification ── */
  function Utility({ ar }) {
    const K = [
      { t: 'Lower is better', f: m => 1 / (1 + 6 * m), ex: 'response time', en: 'utility falls as the metric grows (e.g. <b>response time</b>).', a: 'الـ utility بتقل كل ما الـ metric تزيد، زي الـ <b>response time</b>.' },
      { t: 'Higher is better', f: m => .05 + .95 * m ** 3, ex: 'throughput', en: 'utility rises as the metric grows (e.g. <b>throughput</b>).', a: 'الـ utility بتزيد كل ما الـ metric تزيد، زي الـ <b>throughput</b>.' },
      { t: 'Nominal is best', f: m => Math.max(0, 1 - ((m - .5) / .42) ** 2), ex: 'utilization', en: 'utility is highest at a middle value (e.g. <b>utilization</b>: too low wastes resources, too high causes delays).', a: 'الـ utility أعلى حاجة عند قيمة في النص، زي الـ <b>utilization</b>: لو قليلة أوي بنهدر resources، ولو عالية أوي بيحصل تأخير.' }];
    const [k, setK] = useState(0), [m, setM] = useState(30);
    const X = v => 40 + v * 240, Y = v => 150 - v * 130, c = K[k], u = c.f(m / 100);
    const pts = Array.from({ length: 81 }, (_, j) => { const x = j / 80; return `${X(x)},${Y(Math.max(0, Math.min(1, c.f(x))))}`; }).join(' ');
    return html`<figure className="fig mf1"><div className="fig-stage">
      <${Chips} items=${K.map(x => x.t)} sel=${k} on=${setK} />
      <svg viewBox="0 0 300 180" style=${{ maxWidth: '420px' }} role="img" aria-label=${c.t + ': utility against metric'}>
        <defs>${Head('mf1-ut-a', 'var(--k-ms)')}</defs>
        <path d="M40 160 V10 M40 160 H292" fill="none" stroke="var(--k-ms)" strokeWidth="2" markerEnd="url(#mf1-ut-a)" /><path d="M40 160 V10" stroke="var(--k-ms)" strokeWidth="2" markerEnd="url(#mf1-ut-a)" />
        <text x="22" y="90" textAnchor="middle" fontSize="15" transform="rotate(-90 22 90)">Utility</text><text x="166" y="178" textAnchor="middle" fontSize="15">Metric (${c.ex})</text>
        <polyline points=${pts} fill="none" stroke="#dc2626" strokeWidth="2.6" />
        <line x1=${X(m / 100)} y1="160" x2=${X(m / 100)} y2=${Y(Math.max(0, Math.min(1, u)))} stroke="var(--graphite)" strokeDasharray="3 3" />
        <circle cx=${X(m / 100)} cy=${Y(Math.max(0, Math.min(1, u)))} r="6" fill="var(--s-ms)" />
      </svg>
      <label className="mf1-sl"><span>Metric</span><input type="range" min="0" max="100" value=${m} onInput=${e => setM(+e.target.value)} /><span></span></label>
      </div><${Cap} en=${'<b>' + c.t + '</b>: ' + c.en + ' Move the metric and watch the utility.'} ar=${'الـ <b>' + c.t + '</b> معناها إن ' + c.a + ' حرّك الـ metric وشوف الـ utility.'} showAr=${ar} /></figure>`;
  }

  /* ── slides 59-60: steps in a simulation study (flowchart walked through) ── */
  function Steps({ ar }) {
    const B = { 1: [150, 22, 'Problem', 'formulation'], 2: [150, 72, 'Setting of objectives', 'and overall project plan', 190], 3: [76, 132, 'Model', 'conceptualization'], 4: [224, 132, 'Data', 'collection'], 5: [150, 188, 'Model', 'translation'], 8: [150, 352, 'Experimental', 'design'], 9: [150, 404, 'Production runs', 'and analysis'], 11: [150, 520, 'Documentation', 'and reporting'], 12: [150, 572, 'Implementation', '', 132, 18] };
    const D = { 6: [150, 240, 'Verified?'], 7: [150, 296, 'Validated?'], 10: [150, 462, 'More runs?'] };
    const S = [
      { on: [1], ph: 0, en: '<b>(1) Problem formulation</b>: clearly understand the problem; reformulate it if needed. Analyst and client must agree on it.', ar: 'الخطوة <b>(1) Problem formulation</b>: نفهم المشكلة كويس ونعيد صياغتها لو محتاجة، والـ analyst والـ client لازم يتفقوا عليها.' },
      { on: [2], ph: 0, en: '<b>(2) Setting of objectives and overall project plan</b>: which questions should be answered? Is simulation appropriate? Costs?', ar: 'الخطوة <b>(2) Setting of objectives and overall project plan</b>: إيه الأسئلة اللي عايزين نجاوب عليها؟ هل الـ simulation مناسبة؟ والتكلفة قد إيه؟' },
      { on: [3, 4], ph: 1, en: '<b>(3) Model conceptualization</b> (no general guide; tools such as UML) and <b>(4) Data collection</b> (how to get data? are random distributions appropriate?) run side by side.', ar: 'الخطوتين <b>(3) Model conceptualization</b> (مفيش دليل عام، وفيه أدوات زي UML) و<b>(4) Data collection</b> (نجيب الداتا إزاي؟ والـ random distributions مناسبة؟) بيمشوا جنب بعض.' },
      { on: [5], ph: 1, en: '<b>(5) Model translation</b>: a program which runs on a computer.', ar: 'الخطوة <b>(5) Model translation</b>: نحول الـ model لـ program بيشتغل على الكمبيوتر.' },
      { on: [6], loop: 'v', ph: 1, en: '<b>(6) Verified?</b> Does the program do what the model describes? <b>No</b> → back to (5) model translation.', ar: 'الخطوة <b>(6) Verified?</b> هل الـ program بيعمل اللي الـ model بيوصفه؟ لو <b>لأ</b> نرجع لخطوة (5).' },
      { on: [7], loop: 'w', ph: 1, en: '<b>(6) Yes</b> → <b>(7) Validated?</b> Do the results match reality (calibration)? <b>No</b> → back to (3) and (4). Validation is the <b>most crucial step</b>: an invalid model can lead to dangerous and expensive decisions.', ar: 'لو خطوة (6) <b>آه</b> نروح لـ <b>(7) Validated?</b> هل النتايج زي الواقع (calibration)؟ لو <b>لأ</b> نرجع لـ (3) و (4). الـ validation هي <b>أهم خطوة</b>، لأن الـ model الغلط ممكن يودينا لقرارات خطيرة وغالية.' },
      { on: [8], ph: 2, en: '<b>(7) Yes</b> → <b>(8) Experimental design</b>: which alternatives should be run? which parameters should be varied?', ar: 'لو خطوة (7) <b>آه</b> نروح لـ <b>(8) Experimental design</b>: أنهي alternatives نشغلها؟ وأنهي parameters نغيرها؟' },
      { on: [9], ph: 2, en: '<b>(9) Production runs and analysis</b>: estimate the measures of performance of the designs simulated.', ar: 'الخطوة <b>(9) Production runs and analysis</b>: نقدّر مقاييس الـ performance للتصميمات اللي عملنالها simulation.' },
      { on: [10], loop: 'm', ph: 2, en: '<b>(10) More runs?</b> <b>Yes</b> → back to (9), or to (8) for a new design.', ar: 'الخطوة <b>(10) More runs?</b> لو <b>آه</b> نرجع لـ (9)، أو لـ (8) لو محتاجين تصميم جديد.' },
      { on: [11], ph: 3, en: '<b>(10) No</b> → <b>(11) Documentation and reporting</b>: program documentation (how does the program work) and progress documentation (chronology of the work).', ar: 'لو خطوة (10) <b>لأ</b> نروح لـ <b>(11) Documentation and reporting</b>: الـ program documentation (البرنامج شغال إزاي) والـ progress documentation (تسلسل الشغل).' },
      { on: [12], ph: 3, en: '<b>(12) Implementation</b>: more likely to succeed if the client was involved throughout.', ar: 'الخطوة <b>(12) Implementation</b>: فرصتها في النجاح أكبر لو الـ client كان مشارك من الأول.' }
    ];
    const [i, ctl] = useSteps(S.length, 2600), s = S[i];
    const box = (n, [x, y, a, b, w = 132, rx = 4]) => html`<g key=${n}><rect x=${x - w / 2} y=${y - 18} width=${w} height="36" rx=${rx} className=${s.on.includes(+n) ? 'mf1-hot' : 'mf1-box'} /><text x=${x - w / 2 + 2} y=${y - 21} fontSize="13" className="mf1-gt">${n}</text><text x=${x} y=${b ? y - 3 : y + 5} textAnchor="middle" fontSize="13.5">${a}</text>${b && html`<text x=${x} y=${y + 13} textAnchor="middle" fontSize="13.5">${b}</text>`}</g>`;
    const dia = (n, [x, y, a]) => html`<g key=${n}><path d=${`M${x} ${y - 20} L${x + 54} ${y} L${x} ${y + 20} L${x - 54} ${y} Z`} className=${s.on.includes(+n) ? 'mf1-hot' : 'mf1-box'} /><text x=${x - 30} y=${y - 14} fontSize="13.5" textAnchor="end" className="mf1-gt">${n}</text><text x=${x} y=${y + 5} textAnchor="middle" fontSize="13.5">${a}</text></g>`;
    const ln = (d, hot, k) => html`<path key=${k} d=${d} fill="none" stroke=${hot ? 'var(--k-ms)' : 'var(--graphite)'} strokeWidth=${hot ? 3 : 1.5} markerEnd=${hot ? 'url(#mf1-sp-b)' : 'url(#mf1-sp-a)'} />`;
    const lab = (x, y, t, k) => html`<text key=${k} x=${x} y=${y} fontSize="13" textAnchor="middle" className="mf1-gt">${t}</text>`;
    const ph = [['Phase 1', 'Discovery and Orientation', '1-2'], ['Phase 2', 'Model building and data collection', '3-7'], ['Phase 3', 'Run the model', '8-10'], ['Phase 4', 'Implementation', '11-12']];
    return html`<figure className="fig mf1"><div className="fig-stage">
      <svg viewBox="0 0 300 600" style=${{ maxWidth: '360px' }} role="img" aria-label="Flowchart of the 12 steps of a simulation study">
        <defs>${Head('mf1-sp-a')}${Head('mf1-sp-b', 'var(--k-ms)')}</defs>
        ${ln('M150 40 V52')}${ln('M150 92 V102 H76 V112')}${ln('M150 102 H224 V112')}
        ${ln('M76 150 V160 H150 V168')}${ln('M224 150 V160 H150')}${ln('M150 206 V218')}
        ${ln('M150 260 V274', i === 5)}${lab(162, 271, 'Yes')}
        ${ln('M96 240 H24 V188 H82', s.loop === 'v', 'v')}${lab(70, 234, 'No')}
        ${ln('M150 316 V332', i === 6)}${lab(162, 328, 'Yes')}
        ${ln('M96 296 H3 V132 H8', s.loop === 'w', 'w1')}
        ${ln('M204 296 H297 V132 H292', s.loop === 'w', 'w2')}${lab(78, 290, 'No')}${lab(222, 290, 'No')}
        ${ln('M150 370 V384')}${ln('M150 422 V440')}
        ${ln('M96 462 H30 V404 H82', s.loop === 'm', 'm1')}${lab(66, 456, 'Yes')}
        ${ln('M204 462 H270 V352 H218', s.loop === 'm', 'm2')}${lab(234, 456, 'Yes')}
        ${ln('M150 482 V500', i === 9)}${lab(162, 496, 'No')}
        ${ln('M150 538 V550')}
        ${Object.entries(B).map(([n, b]) => box(n, b))}${Object.entries(D).map(([n, d]) => dia(n, d))}
      </svg>
      <div className="mf1-ph">${ph.map(([a, b, c], k) => html`<div key=${k} className=${s.ph === k ? 'on' : ''}><b>${a}</b>${b}<br />steps ${c}</div>`)}</div>
      </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ms-evaluate': Evaluate, 'ms-netqueue': NetQueue, 'ms-internet': Internet, 'ms-manet': Manet, 'ms-waypoint': Waypoint,
    'ms-statetime': StateTime, 'ms-commonsense': CommonSense, 'ms-sysenv': SysEnv, 'ms-factory': Factory, 'ms-router': Router,
    'ms-systable': SysTable, 'ms-discont': DisCont, 'ms-sysmodel': SysModel, 'ms-howstudy': HowStudy, 'ms-mobility': Mobility,
    'ms-freespace': FreeSpace, 'ms-osi': Osi, 'ms-tcpip': TcpIp, 'ms-sixlevel': SixLevel, 'ms-linkdelay': LinkDelay,
    'ms-cells': Cells, 'ms-userlevels': UserLevels, 'ms-taxonomy': Taxonomy, 'ms-fig14': Fig14, 'ms-metrics': Metrics,
    'ms-resptime': RespTime, 'ms-utility': Utility, 'ms-steps': Steps
  });
})();
/* ── part 2 ── */
// Modeling & Simulation visuals, part 2: L2 simulation examples (simulation table, queueing systems, grocery, Able-Baker, newspaper seller, (M, N) and (r, x) inventory). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf2 .fig-btn[aria-pressed="true"]{ background:var(--s-ms); color:#fff; border-color:transparent; }
.mf2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf2 .fig-dots{ flex-wrap:wrap; max-width:100%; }
.mf2-modes, .mf2-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; font-size:.86rem; color:var(--ink); }
.mf2-modes .fig-btn, .mf2-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.mf2-row input, .mf2-row select{ font:inherit; font-size:.88rem; width:4.4em; padding:3px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); box-sizing:border-box; }
.mf2-row label{ display:inline-flex; align-items:center; gap:4px; }
.mf2-tw{ max-width:520px; margin:0 auto; max-height:320px; overflow-y:auto; overflow-x:hidden; border-radius:6px; }
.mf2-t{ border-collapse:collapse; width:100%; font-size:.8rem; font-variant-numeric:tabular-nums; color:var(--ink); }
.mf2-t th, .mf2-t td{ border:1px solid var(--line); padding:3px 1px; text-align:center; background:var(--paper); color:var(--ink); }
.mf2-t th{ background:var(--paper-2); color:var(--graphite); font-weight:600; font-size:.76rem; line-height:1.2; position:sticky; top:0; z-index:1; }
.mf2-t tr.cur td{ background:color-mix(in srgb, var(--k-ms) 22%, var(--paper)); font-weight:700; }
.mf2-t tr.cyc td{ border-top:2.5px solid var(--graphite); }
.mf2-t tr.tot td{ font-weight:700; background:var(--paper-2); }
.mf2-t td.hot{ color:var(--k-ms); font-weight:700; }
.mf2-t td.bad{ color:var(--pen); font-weight:700; }
.mf2-t td.dim{ color:var(--graphite); }
.mf2-key{ font-size:.78rem; color:var(--graphite); text-align:center; margin:6px auto 0; max-width:520px; line-height:1.45; }
.mf2-key b{ color:var(--ink); }
.mf2-stat{ display:grid; grid-template-columns:repeat(auto-fit, minmax(7.4em, 1fr)); gap:6px; max-width:520px; margin:8px auto 0; }
.mf2-stat div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 6px; text-align:center; font-size:.76rem; color:var(--graphite); line-height:1.3; transition:box-shadow .4s, opacity .4s; }
.mf2-stat div.on{ box-shadow:0 0 0 2px var(--k-ms); color:var(--ink); }
.mf2-stat div.off{ opacity:.35; }
.mf2-stat b{ display:block; font:700 .98rem var(--mono); color:var(--k-ms); }
.mf2-stat small{ display:block; font-family:var(--mono); font-size:.76rem; color:var(--ink); }
.mf2-now{ display:flex; flex-wrap:wrap; justify-content:center; gap:6px 14px; margin:0 0 8px; font-size:.86rem; color:var(--ink); align-items:center; }
.mf2-now b{ font-family:var(--mono); color:var(--k-ms); font-size:1rem; }
.mf2-chip{ display:inline-grid; place-items:center; min-width:1.9em; height:1.9em; border-radius:99px; border:1.5px solid var(--k-ms); font:700 .8rem var(--mono); color:var(--ink); background:var(--paper); margin:0 2px; }
.mf2-chip.srv{ background:var(--s-ms); color:#fff; border-color:transparent; }
.mf2-tag{ display:inline-block; padding:1px 8px; border-radius:99px; font-size:.78rem; font-weight:700; border:1px solid var(--line); background:var(--paper); color:var(--ink); }
.mf2-tag.busy{ border-color:var(--k-ms); color:var(--k-ms); }
.mf2-tag.idle{ border-color:var(--pen); color:var(--pen); }
.mf2-svg{ max-width:520px; margin:0 auto 8px; }
.mf2 svg .ax{ stroke:var(--graphite); stroke-width:1.5; fill:none; }
.mf2 svg .gr{ stroke:var(--line); stroke-width:1; fill:none; }
.mf2 svg .busy{ fill:color-mix(in srgb, var(--k-ms) 55%, var(--paper)); stroke:var(--k-ms); stroke-width:1; }
.mf2 svg .busyB{ fill:color-mix(in srgb, var(--k-ms) 25%, var(--paper)); stroke:var(--k-ms); stroke-width:1; }
.mf2 svg .lane{ fill:var(--paper); stroke:var(--line); }
.mf2 svg .now{ stroke:var(--pen); stroke-width:2; }
.mf2 svg .ln{ stroke:var(--k-ms); stroke-width:3; fill:none; stroke-linejoin:round; }
.mf2 svg .dash{ stroke:var(--graphite); stroke-width:1.5; stroke-dasharray:5 4; fill:none; }
.mf2 svg text.mu{ fill:var(--graphite); }
.mf2 svg text.k{ fill:var(--k-ms); font-weight:700; }
.mf2 svg text.p{ fill:var(--pen); font-weight:700; }
.mf2-sb{ font-size:.78rem; vertical-align:-.28em; }
.mf2-f{ max-width:520px; margin:8px auto 0; font:.8rem/1.55 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; overflow-wrap:anywhere; }
.mf2-f div{ transition:opacity .4s; } .mf2-f .on{ color:var(--k-ms); font-weight:700; }
/* boxes and flow charts */
.mf2-box{ border:1.5px solid var(--graphite); border-radius:6px; background:var(--paper); color:var(--ink); padding:6px 8px; text-align:center; font-size:.84rem; line-height:1.3; transition:opacity .45s, box-shadow .45s, background .45s; }
.mf2-box.dia{ border-radius:18px; border-style:double; border-width:3px; }
.mf2-box.on{ box-shadow:0 0 0 3px var(--k-ms); background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)); }
.mf2-box.dim{ opacity:.35; }
.mf2-box small{ display:block; font-size:.76rem; color:var(--graphite); }
.mf2-arr{ text-align:center; color:var(--k-ms); font-weight:700; font-size:1.05rem; line-height:1.2; }
.mf2-lbl{ font-size:.78rem; font-weight:700; color:var(--graphite); }
.mf2-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; }
.mf2-col{ display:flex; flex-direction:column; gap:4px; min-width:0; }
.mf2-hb{ display:grid; grid-template-columns:3.2em minmax(0, 1fr) 3.4em; gap:6px; align-items:center; font-size:.8rem; color:var(--ink); margin:2px 0; }
.mf2-hb i{ display:block; height:14px; border-radius:3px; background:var(--k-ms); transition:width .6s ease; }
.mf2-hb i.lo{ background:color-mix(in srgb, var(--k-ms) 40%, var(--paper)); }
.mf2-hb span:last-child{ font-family:var(--mono); text-align:right; }
.mf2-hb.on span{ font-weight:700; color:var(--k-ms); }
.mf2-h4{ margin:4px 0; font-size:.84rem; color:var(--ink); text-align:center; }
@media (prefers-reduced-motion: reduce){ .mf2-box, .mf2-hb i, .mf2-stat div{ transition:none; } }
`;
  if (!document.getElementById('mf2-css')) { const s = document.createElement('style'); s.id = 'mf2-css'; s.textContent = CSS; document.head.appendChild(s); }
  const L = t => `<span class="ltr">${t}</span>`;
  const Modes = ({ list, mode, set }) => html`<div className="mf2-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const rdig = n => String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, '0');
  const usd = c => (c < 0 ? '−' : '') + (Math.abs(c) / 100).toFixed(2);
  const f2 = x => (Math.round(x * 100) / 100).toFixed(2);
  // a table whose current row stays in view inside its own scroll box
  function Tbl({ head, rows, cur, tot, rowCls, cellCls, label }) {
    const ref = useRef(null);
    useEffect(() => { const box = ref.current; if (!box) return; const tr = box.querySelector('tr.cur'); if (tr) box.scrollTop = Math.max(0, tr.offsetTop - box.clientHeight / 2); else if (cur === 'end') box.scrollTop = box.scrollHeight; }, [cur, rows.length]);
    return html`<div className="mf2-tw" ref=${ref} role="region" aria-label=${label || 'Simulation table'} tabIndex="0"><table className="mf2-t"><thead><tr>${head.map((h, j) => html`<th key=${j} scope="col" dangerouslySetInnerHTML=${{ __html: h }}></th>`)}</tr></thead>
      <tbody>${rows.map((r, k) => html`<tr key=${k} className=${(k === cur ? 'cur ' : '') + (rowCls ? rowCls(k) : '')}>${r.map((v, j) => html`<td key=${j} className=${cellCls ? cellCls(k, j) : ''}>${v}</td>`)}</tr>`)}
      ${tot && html`<tr className="tot">${tot.map((v, j) => html`<td key=${j}>${v}</td>`)}</tr>`}</tbody></table></div>`;
  }
  // custom stepper for simulators whose length changes (try-your-own runs)
  function useRun(n, ms) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm());
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(n - 1, x + 1)), ms); return () => clearTimeout(t); }, [i, play, n]);
    useEffect(() => { if (i > n - 1) setI(n - 1); }, [n]);
    return [Math.min(i, n - 1), { replay: () => { setI(0); setPlay(!calm()); }, go: j => { setPlay(false); setI(j); }, play }];
  }
  // Bar with step numbers instead of dots (long runs)
  const RunBar = ({ n, i, ctl, label }) => html`<div className="fig-bar">
    <span className="mf2-lbl" aria-live="off">${label}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${() => ctl.go(n - 1)} disabled=${i === n - 1}>End</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻</button></div>`;

  /* ── the course's methods (Lecture 2), used by the step-throughs and the simulators ── */
  // a random-digit string to its number: "00" is 100 and "000" is 1000 (the notes' ranges end at 00 / 000)
  const dnum = d => { const n = parseInt(d, 10); return n === 0 ? Math.pow(10, d.length) : n; };
  // ranges [lo, hi, value] (inclusive, as the notes' random-digit assignments)
  const look = (d, R) => { const n = dnum(d); const r = R.find(([lo, hi]) => n >= lo && n <= hi); return r ? r[2] : null; };
  const G_ARR = [[1, 125, 1], [126, 250, 2], [251, 375, 3], [376, 500, 4], [501, 625, 5], [626, 750, 6], [751, 875, 7], [876, 1000, 8]];
  const G_SVC = [[1, 10, 1], [11, 30, 2], [31, 60, 3], [61, 85, 4], [86, 95, 5], [96, 100, 6]];
  // Example 2.2 (Tables 2.3, 2.4): arrival digits for customers 2..20, service digits for 1..20
  const G_AD = [null, '913', '727', '015', '948', '309', '922', '753', '235', '302', '109', '093', '607', '738', '359', '888', '106', '212', '493', '535'];
  const G_SD = ['84', '10', '74', '53', '17', '79', '91', '67', '89', '38', '32', '94', '79', '05', '79', '84', '52', '55', '30', '50'];
  // the grocery model equations (sheet): arrival, begins = max(arrival, previous end), ends, waiting, in system, idle
  function queueRun(ia, sv) {
    const rows = []; let arr = 0, prevEnd = 0;
    for (let k = 0; k < sv.length; k++) {
      arr = k === 0 ? 0 : arr + ia[k];
      const beg = Math.max(arr, prevEnd), end = beg + sv[k];
      rows.push({ c: k + 1, ia: k === 0 ? null : ia[k], arr, s: sv[k], beg, end, wait: beg - arr, sys: end - arr, idle: k === 0 ? 0 : Math.max(0, arr - prevEnd), prevEnd });
      prevEnd = end;
    }
    return rows;
  }
  const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
  function queueStats(rows) {
    const n = rows.length, W = sum(rows, r => r.wait), S = sum(rows, r => r.s), T = sum(rows, r => r.sys), I = sum(rows, r => r.idle), IA = sum(rows, r => r.ia || 0);
    const nw = rows.filter(r => r.wait > 0).length, run = rows[n - 1].end;
    return { n, W, S, T, I, IA, nw, run };
  }
  function grocery(ad, sd, fix) {
    const ia = ad.map(d => d == null ? null : look(d, G_ARR)), sv = sd.map((d, k) => fix && fix[k] != null ? fix[k] : look(d, G_SVC));
    return queueRun(ia, sv).map((r, k) => ({ ...r, ad: ad[k], sd: sd[k], fixed: !!(fix && fix[k] != null) }));
  }

  // Example 2.3 Able-Baker (Tables 2.6-2.8)
  const AB_ARR = [[1, 25, 1], [26, 65, 2], [66, 85, 3], [86, 100, 4]];
  const AB_A = [[1, 30, 2], [31, 58, 3], [59, 83, 4], [84, 100, 5]];
  const AB_B = [[1, 35, 3], [36, 60, 4], [61, 80, 5], [81, 100, 6]];
  const AB_AD = [null, '26', '98', '90', '26', '42', '74', '80', '68', '22', '48', '34', '45', '24', '34', '63', '38', '80', '42', '56', '89', '18', '51', '71', '16', '92'];
  const AB_SD = ['95', '21', '51', '92', '89', '38', '13', '61', '50', '49', '39', '53', '88', '01', '81', '53', '81', '64', '01', '67', '01', '47', '75', '57', '87', '47'];
  // Able if both idle; the idle one if only one is; if both busy, the first to become free (Able on a tie)
  function ableBaker(ad, sd) {
    let t = 0, fa = 0, fb = 0; const rows = [];
    for (let k = 0; k < sd.length; k++) {
      const ia = k === 0 ? null : look(ad[k], AB_ARR); t = k === 0 ? 0 : t + ia;
      const who = fa <= t ? 'A' : fb <= t ? 'B' : (fa <= fb ? 'A' : 'B');
      const s = look(sd[k], who === 'A' ? AB_A : AB_B), beg = Math.max(t, who === 'A' ? fa : fb), end = beg + s;
      rows.push({ c: k + 1, ad: ad[k], ia, arr: t, sd: sd[k], who, beg, s, end, wait: beg - t, fa, fb });
      if (who === 'A') fa = end; else fb = end;
    }
    return rows;
  }

  // Example 2.4 newspaper seller (Tables 2.10-2.12); money in cents
  const N_TYPE = [[1, 35, 'Good'], [36, 80, 'Fair'], [81, 100, 'Poor']];
  const N_DEM = [40, 50, 60, 70, 80, 90, 100];
  const N_CUM = { Good: [3, 8, 23, 43, 78, 93, 100], Fair: [10, 28, 68, 88, 96, 100, 100], Poor: [44, 66, 82, 94, 100, 100, 100] };
  const N_TD = ['94', '77', '49', '45', '43', '32', '49', '00', '16', '24', '31', '14', '41', '61', '85', '08', '15', '97', '52', '78'];
  const N_DD = ['80', '20', '15', '88', '98', '65', '86', '73', '24', '60', '60', '29', '18', '90', '93', '73', '21', '45', '76', '96'];
  const newsDemand = (type, d) => { const n = dnum(d), c = N_CUM[type]; return N_DEM[c.findIndex(x => n <= x)]; };
  function news(td, dd, Q) {
    return td.map((t, k) => {
      const type = look(t, N_TYPE), D = newsDemand(type, dd[k]), sold = Math.min(D, Q);
      const rev = 50 * sold, lost = 17 * Math.max(0, D - Q), salv = 5 * Math.max(0, Q - D), cost = 33 * Q;
      return { day: k + 1, td: t, type, dd: dd[k], D, rev, lost, salv, cost, profit: rev - cost - lost + salv };
    });
  }

  // Example 2.5 (M, N) inventory, M = 11, N = 5 (Tables 2.14-2.16)
  const MN_DEM = [[1, 10, 0], [11, 35, 1], [36, 70, 2], [71, 91, 3], [92, 100, 4]];
  const MN_LT = [[1, 6, 1], [7, 9, 2], [10, 10, 3]];
  const MN_DD = ['24', '35', '65', '81', '54', '03', '87', '27', '73', '70', '47', '45', '48', '17', '09', '42', '87', '26', '36', '40', '07', '63', '19', '88', '94'];
  const MN_LD = ['5', '0', '3', '4', '8'];
  // orders placed at the close of day 5 of a cycle arrive at the beginning of the day after the lead time; shortages are backordered
  function mnRun(dd, ld, M, N, inv0, q0, due0) {
    let inv = inv0, short = 0, ord = { q: q0, at: due0 }; const rows = [];
    for (let t = 1; t <= dd.length; t++) {
      const got = ord && ord.at === t ? ord.q : 0; if (got) { inv += got; ord = null; }
      const beg = inv, d = look(dd[t - 1], MN_DEM), need = short + d;
      if (inv >= need) { inv -= need; short = 0; } else { short = need - inv; inv = 0; }
      const r = { t, cyc: Math.ceil(t / N), day: (t - 1) % N + 1, beg, got, dd: dd[t - 1], d, end: inv, short, q: null, ld: null, L: null, until: null };
      if (r.day === N) { const c = r.cyc - 1; r.q = M - inv + short; r.ld = ld[c]; r.L = look(ld[c] === '0' ? '10' : ld[c], MN_LT); ord = { q: r.q, at: t + r.L + 1 }; }
      if (ord) r.until = ord.at - t - 1;
      rows.push(r);
    }
    return rows;
  }

  // inventory deck: lead time and daily demand from R (intervals include their lower end)
  const LT_R = [[0, .2, 1], [.2, .3, 2], [.3, .7, 3], [.7, .9, 4], [.9, 1, 5]];
  const DM_R = [[0, .5, 0], [.5, .75, 1], [.75, .9, 2], [.9, .95, 3], [.95, 1, 4]];
  const rlook = (R, T) => { const r = T.find(([lo, hi]) => R >= lo && R < hi); return r ? r[2] : T[T.length - 1][2]; };
  const I_R1 = [.093, .681, .292, .528, .866, .975, .622, .819, .373, .353], I_R2 = [.620, .939];
  // daily process (inventory slide 8); costs in cents; shortages are lost (I = 0)
  function invRun(R1, R2, I0, x, r) {
    let I = I0, out = null, k2 = 0; const rows = [];
    R1.forEach((R, k) => {
      const day = k + 1, beg = I, rc = out && out.at === day ? x : 0; if (rc) { I += x; out = null; }
      const d = rlook(R, DM_R), ok = I >= d, sc = ok ? 0 : 5000 * (d - I); I = ok ? I - d : 0;
      const hit = I <= r, busy = !!out; let oc = 0, R2v = null, L = null;
      if (hit && !busy && k2 < R2.length) { oc = 2000; R2v = R2[k2++]; L = rlook(R2v, LT_R); out = { at: day + L }; }
      const hc = 10 * I; rows.push({ day, beg, rc, R, d, ok, end: I, hit, busy, R2: R2v, L, hc, oc, sc, tc: hc + oc + sc });
    });
    return rows;
  }

  /* ── §0: the simulation table built in its three steps (slides 4, 5) ── */
  function SimTable({ ar }) {
    const steps = [
      { en: 'The simulation table (slides 4 and 5): one column per <b>input</b> x<sub>ij</sub>, one <b>response</b> y<sub>i</sub>, one row per <b>repetition i</b>. The header row is <b>static meta data</b>; rows 1 … n are <b>dynamic data during the simulation run</b>.', ar: 'ده الـ simulation table (الـ slides 4 و 5): عمود لكل <b>input</b> وعمود للـ <b>response</b>، وصف لكل <b>repetition</b>. صف العناوين هو الـ <b>static meta data</b>، والصفوف من 1 لحد n هي الـ <b>dynamic data during the simulation run</b>.' },
      { en: '<b>Step 1</b>: determine the <b>characteristics of each input</b> to the simulation.', ar: '<b>الخطوة الأولى</b>: نحدد <b>خصائص كل input</b> داخل في الـ simulation.' },
      { en: '<b>Step 2</b>: construct a simulation table of <b>p inputs</b> x<sub>ij</sub>, j = 1, 2, …, p and <b>one response</b> y<sub>i</sub>, i = 1, 2, …, n.', ar: '<b>الخطوة التانية</b>: نبني الـ table بـ <b>p inputs</b> و <b>response واحد</b>:' + L('x<sub>ij</sub>, j = 1, 2, …, p ;  y<sub>i</sub>, i = 1, 2, …, n') },
      { en: '<b>Step 3</b>, repetition 1: <b>generate a value for each of the p inputs</b> x<sub>11</sub> … x<sub>1p</sub>, then <b>calculate the response</b> y<sub>1</sub>.', ar: '<b>الخطوة التالتة</b> في الـ repetition الأولى: <b>نولّد قيمة لكل input</b> من الـ p inputs، وبعدين <b>نحسب الـ response</b> اللي هو y<sub>1</sub>.' },
      { en: 'Repetition 2: new input values x<sub>21</sub> … x<sub>2p</sub>, new response y<sub>2</sub>.', ar: 'في الـ repetition التانية: قيم inputs جديدة، و response جديد اسمه y<sub>2</sub>.' },
      { en: '… and so on until repetition <b>n</b>. These rows are the <b>dynamic data</b> produced during the run.', ar: 'وهكذا لحد الـ repetition رقم <b>n</b>. الصفوف دي هي الـ <b>dynamic data</b> اللي بتطلع أثناء الـ run.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const X = (r, c) => html`x<span className="mf2-sb">${r}${c}</span>`, Y = r => html`y<span className="mf2-sb">${r}</span>`;
    const cols = ['1', '2', '…', 'j', '…', 'p'];
    const rows = [['1', 1], ['2', 2], ['⋮', 3], ['n', 4]];
    const filled = k => i === 0 || (i >= 3 && (k < i - 2 || (i === 5 && k <= 3)));
    const hd = i === 0 || i >= 1, body = i === 0 || i >= 2;
    return html`<figure className="fig mf2"><div className="fig-stage">
      <div className="mf2-tw" style=${{ maxHeight: 'none' }}><table className="mf2-t" aria-label="Simulation table">
        <thead><tr><th>Rep. i</th><th colSpan="6" style=${{ background: i === 1 ? 'color-mix(in srgb, var(--k-ms) 22%, var(--paper))' : '' }}>Inputs x<span className="mf2-sb">ij</span></th><th>Resp. ${Y('i')}</th></tr>
          <tr>${[html`<th key="r"></th>`, ...cols.map((c, j) => html`<th key=${j} style=${{ background: i === 1 ? 'color-mix(in srgb, var(--k-ms) 22%, var(--paper))' : '' }}>${c === '…' ? '…' : X('i', c)}</th>`), html`<th key="y">${Y('i')}</th>`]}</tr></thead>
        <tbody className=${pop(body)}>${rows.map(([lab, k], kk) => html`<tr key=${lab} className=${i >= 3 && i <= 4 && kk === i - 3 ? 'cur' : ''}><td>${lab}</td>${cols.map((c, j) => html`<td key=${j} className="hot">${filled(kk) ? (lab === '⋮' || c === '…' ? (lab === '⋮' ? '⋮' : '…') : X(lab, c)) : ''}</td>`)}<td className="hot">${filled(kk) ? (lab === '⋮' ? '⋮' : Y(lab)) : ''}</td></tr>`)}</tbody></table></div>
      <div className="mf2-two" style=${{ marginTop: '8px' }}>
        <div className=${'mf2-box' + (i === 0 || i === 2 ? ' on' : '')}>static meta data<small>the header row</small></div>
        <div className=${'mf2-box' + (i === 0 || i >= 3 ? ' on' : '')}>dynamic data during simulation run<small>rows 1 … n</small></div></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §1: what describes a queueing system (slide 8, notes Fig 2.1) ── */
  function QueueSys({ ar }) {
    const steps = [
      { en: 'Slide 8: customers come from the <b>calling population</b>, join the <b>waiting line</b> and are served by the <b>server</b>; the notes\' Fig 2.1 adds the arrow back to the calling population.', ar: 'في الـ slide 8: الـ customers جايين من الـ <b>calling population</b>، بيقفوا في الـ <b>waiting line</b>، والـ <b>server</b> بيخدمهم. والـ Fig 2.1 في الـ notes زوّدت سهم راجع للـ calling population.' },
      { en: '<b>Calling population</b>: the potential customers, <b>finite</b> or <b>infinite</b>.', ar: 'الـ <b>calling population</b> هي كل الـ customers المحتملين، وممكن تكون <b>finite</b> أو <b>infinite</b>.' },
      { en: '<b>Arrival rate</b>: how often customers arrive (average arrivals per unit time), described by the interarrival times.', ar: 'الـ <b>arrival rate</b> هو الـ customers بييجوا بمعدل قد إيه (متوسط الوصول في وحدة الزمن)، وبنوصفه بالـ interarrival times.' },
      { en: '<b>Service mechanism</b>: the service times (constant or random) and the number of parallel servers c.', ar: 'الـ <b>service mechanism</b> هو الـ service times (ثابتة أو random) وعدد الـ servers اللي شغالين بالتوازي c.' },
      { en: '<b>System capacity</b>: a limit on the number of customers in the waiting line or system (limited or unlimited).', ar: 'الـ <b>system capacity</b> هو أقصى عدد customers مسموح بيه في الـ waiting line أو الـ system، وممكن تكون limited أو unlimited.' },
      { en: '<b>Queueing discipline</b>: which customer is chosen when the server becomes free (FIFO, LIFO, SIRO, SPT, PR).', ar: 'الـ <b>queueing discipline</b> هو مين يتخدم لما الـ server يفضى، زي الـ FIFO والـ LIFO والـ SIRO والـ SPT والـ PR.' },
      { en: 'Customers are eventually served and <b>leave the system</b>, back to the calling population (Fig 2.1).', ar: 'في الآخر الـ customer بيتخدم و<b>يخرج من الـ system</b> ويرجع للـ calling population (الـ Fig 2.1).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300), mv = calm() ? '' : 'flow';
    const hl = k => i === 0 || i === k, st = k => ({ opacity: hl(k) ? 1 : .3, transition: 'opacity .45s' });
    return html`<figure className="fig mf2"><div className="fig-stage">
      <svg viewBox="0 0 300 200" role="img" aria-label="Calling population, waiting line and server">
        <g style=${st(1)}><path d="M18 92 q-14 -26 12 -34 q8 -24 34 -14 q22 -14 36 8 q24 2 14 30 q10 22 -16 26 q-14 18 -38 6 q-30 10 -42 -22 z" fill="color-mix(in srgb, var(--k-ms) 14%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.5" />
          <text x="60" y="78" textAnchor="middle" fontSize="15">Calling</text><text x="60" y="96" textAnchor="middle" fontSize="15">population</text></g>
        <g style=${st(2)}><path d="M114 80 H136" stroke="var(--k-ms)" strokeWidth="3" className=${i === 2 ? mv : ''} /><path d="M132 74 l8 6 l-8 6" fill="none" stroke="var(--k-ms)" strokeWidth="3" /></g>
        <g style=${st(4)}>${[0, 1, 2, 3].map(k => html`<rect key=${k} x=${142 + k * 22} y="66" width="22" height="28" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="1.5" />`)}
          <text x="186" y="54" textAnchor="middle" fontSize="15">Waiting line</text></g>
        <g style=${st(5)}>${[1, 2, 3].map(k => html`<circle key=${k} cx=${142 + k * 22 + 11} cy="80" r="7" fill="var(--k-ms)" />`)}
          <text x="186" y="116" textAnchor="middle" fontSize="15" className=${pop(i === 5)}>← first in, first out</text></g>
        <g style=${st(3)}><path d="M230 80 H246" stroke="var(--k-ms)" strokeWidth="3" /><circle cx="272" cy="80" r="22" fill="color-mix(in srgb, var(--k-ms) 30%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.5" />
          <text x="272" y="124" textAnchor="middle" fontSize="15">Server</text></g>
        <g style=${st(6)}><path d="M272 132 C272 186, 60 186, 60 128" fill="none" stroke="var(--graphite)" strokeWidth="2" strokeDasharray="5 4" className=${i === 6 ? mv : ''} /><path d="M54 136 l6 -9 l6 9" fill="none" stroke="var(--graphite)" strokeWidth="2" /></g>
      </svg></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §3: arrival process for a finite population (notes Fig 2.2, machine 3; five tire-curing machines) ── */
  function Finite({ ar }) {
    const steps = [
      { en: 'Machine 3 starts <b>pending</b>: closed and curing a tire, outside the system (a member of the calling population). Its first <b>run time</b> is A₁⁽³⁾.', ar: 'الـ machine 3 بتبدأ <b>pending</b>: مقفولة وبتعمل curing للكاوتش، يعني برّه الـ system (جزء من الـ calling population). أول <b>run time</b> ليها اسمه A₁⁽³⁾.', on: [0] },
      { en: '<b>First arrival of machine 3</b>: it opens and demands service from the worker. It is <b>open</b> for its <b>system time</b> S₁⁽³⁾ (waiting plus service).', ar: 'هنا <b>أول وصول للـ machine 3</b>: بتفتح وبتطلب خدمة من العامل. بتفضل <b>open</b> طول الـ <b>system time</b> بتاعها اللي اسمه S₁⁽³⁾.', on: [0, 1] },
      { en: 'Served, it leaves the system and is pending again for its second run time A₂⁽³⁾: the time from leaving until its next arrival.', ar: 'بعد ما تتخدم بتخرج من الـ system وترجع pending تاني لمدة الـ run time التاني A₂⁽³⁾، وهو الوقت من خروجها لحد الوصول اللي بعده.', on: [0, 1, 2] },
      { en: '<b>Second arrival of machine 3</b>, then open again for S₂⁽³⁾.', ar: 'وبعدين <b>تاني وصول للـ machine 3</b>، وتفضل open تاني لمدة S₂⁽³⁾.', on: [0, 1, 2, 3] },
      { en: 'Five machines, one worker. If all are pending at time 0, the first arrival is at A₁ = min{A₁⁽¹⁾, …, A₁⁽⁵⁾}. The arrival rate is a <b>function of the number of pending customers</b>.', ar: 'عندنا 5 machines وعامل واحد. لو كلهم pending عند الزمن صفر، يبقى أول وصول هو:' + L('A₁ = min{A₁⁽¹⁾, …, A₁⁽⁵⁾}') + 'والـ arrival rate هنا <b>دالة في عدد الـ customers اللي pending</b>.', on: [0, 1, 2, 3], m: 0 },
      { en: 'All five open (one being served, four waiting): no machine is pending, so the <b>arrival rate is zero</b>. This is why a finite calling population changes the arrival rate.', ar: 'لما الخمسة يفتحوا (واحدة بتتخدم وأربعة مستنيين) مفيش ولا machine pending، فالـ <b>arrival rate بيبقى صفر</b>. وده سبب إن الـ finite calling population بتغيّر الـ arrival rate.', on: [0, 1, 2, 3], m: 5 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const seg = [['A₁⁽³⁾', 'Pending', ''], ['S₁⁽³⁾', 'Open', 'system time'], ['A₂⁽³⁾', 'Pending', ''], ['S₂⁽³⁾', 'Open', 'system time']];
    return html`<figure className="fig mf2"><div className="fig-stage">
      <p className="mf2-h4">Machine 3</p>
      <div style=${{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '3px' }}>
        ${seg.map(([t, n, sub], k) => html`<div key=${k} className=${'mf2-box' + (s.on.includes(k) ? (s.on[s.on.length - 1] === k && s.m == null ? ' on' : '') : ' dim')} style=${{ padding: '4px 2px', borderStyle: n === 'Open' ? 'solid' : 'dashed' }}><b>${t}</b><br />${n}${sub && html`<small>${sub}</small>`}</div>`)}
        ${seg.map((_, k) => html`<div key=${'a' + k} className="mf2-lbl" style=${{ textAlign: 'left', color: 'var(--k-ms)', opacity: (k === 1 && s.on.includes(1)) || (k === 3 && s.on.includes(3)) ? 1 : 0, transition: 'opacity .4s', lineHeight: 1.25 }}>${k === 1 ? '↑ first arrival' : k === 3 ? '↑ second arrival' : ''}</div>`)}
      </div>
      <div className=${pop(s.m != null)} style=${{ marginTop: '10px' }}>
        <div style=${{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '4px' }}>${[1, 2, 3, 4, 5].map(k => html`<div key=${k} className=${'mf2-box' + (s.m === 5 ? ' on' : '')} style=${{ padding: '4px 0', borderStyle: s.m === 5 ? 'solid' : 'dashed' }}>M${k}<small>${s.m === 5 ? 'open' : 'pending'}</small></div>`)}</div>
        <p className="mf2-now" style=${{ marginTop: '6px' }}>pending: <b>${s.m === 5 ? 0 : 5}</b> · arrival rate: <b>${s.m === 5 ? '0' : '> 0'}</b></p></div>
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §4: Example 2.1, the discount warehouse (notes Fig 2.3 and Fig 2.4) ── */
  function Warehouse({ ar }) {
    const steps = [
      { en: 'Example 2.1, a discount warehouse with <b>three service centers</b> (Fig 2.3). Customers arrive…', ar: 'في المثال 2.1 عندنا discount warehouse فيه <b>3 service centers</b> (الـ Fig 2.3). الـ customers بيوصلوا…' },
      { en: '…and either <b>serve themselves</b>: Queue 1 → Service center 1, <b>c = ∞</b> (a self-service facility is treated as unlimited servers)…', ar: 'وبعدين يا إما <b>يخدموا نفسهم</b> في الـ Service center 1 اللي فيه عدد servers غير محدود، لأن الـ self service بنعتبره unlimited servers:' + L('Queue 1 → Service center 1, c = ∞') },
      { en: '…or wait for one of the <b>3 clerks</b>: Queue 2 → Service center 2, <b>c = 3</b>.', ar: 'يا إما يستنوا واحد من الـ <b>3 clerks</b>:' + L('Queue 2 → Service center 2, c = 3') },
      { en: 'Both paths join Queue 3 and pay a <b>single cashier</b>: Service center 3, <b>c = 1</b>, then depart.', ar: 'الطريقين بيتجمعوا في الـ Queue 3 ويدفعوا عند <b>cashier واحد</b>، وبعدين يمشوا:' + L('Queue 3 → Service center 3, c = 1 → Departures') },
      { en: 'Fig 2.4: Service center 2 in detail, <b>c = 3 parallel servers</b> between its arrivals and departures.', ar: 'الـ Fig 2.4 بتفصّل الـ Service center 2: فيه <b>3 servers شغالين بالتوازي</b> بين الـ arrivals والـ departures بتوعه.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2500);
    const B = (txt, sub, on, dim) => html`<div className=${'mf2-box' + (on ? ' on' : '') + (dim ? ' dim' : '')}>${txt}${sub && html`<small>${sub}</small>`}</div>`;
    return html`<figure className="fig mf2"><div className="fig-stage"><div style=${{ maxWidth: '420px', margin: '0 auto' }}>
      ${i < 4 ? html`<div className="mf2-col">
        ${B('Arrivals', '', i === 0)}
        <div className="mf2-two"><div className="mf2-arr">↙</div><div className="mf2-arr">↘</div></div>
        <div className="mf2-two">
          <div className="mf2-col">${B('Queue 1', '', i === 1, i > 0 && i !== 1 && i !== 3)}<div className="mf2-arr">↓</div>${B('Service center 1', 'c = ∞ · self service', i === 1, i > 0 && i !== 1 && i !== 3)}</div>
          <div className="mf2-col">${B('Queue 2', '', i === 2, i > 0 && i !== 2 && i !== 3)}<div className="mf2-arr">↓</div>${B('Service center 2', 'c = 3 · 3 clerks', i === 2, i > 0 && i !== 2 && i !== 3)}</div></div>
        <div className="mf2-two"><div className="mf2-arr">↘</div><div className="mf2-arr">↙</div></div>
        ${B('Queue 3', '', i === 3, i > 0 && i < 3)}<div className="mf2-arr">↓</div>${B('Service center 3', 'c = 1 · cashier', i === 3, i > 0 && i < 3)}<div className="mf2-arr">↓</div>${B('Departures', '', i === 3, i > 0 && i < 3)}</div>`
      : html`<div className="mf2-col">${B('Arrivals')}<div className="mf2-arr">↓</div>
        <div className="mf2-box" style=${{ borderStyle: 'dashed', padding: '8px' }}><span className="mf2-lbl">Service center 2 (c = 3)</span>
          <div style=${{ display: 'grid', gap: '6px', marginTop: '6px' }}>${[1, 2, 3].map(k => html`<div key=${k} className="mf2-box on" style=${{ animation: calm() ? 'none' : '' }}>Server ${k}</div>`)}</div></div>
        <div className="mf2-arr">↓</div>${B('Departures')}</div>`}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §5: reading A/B/c/N/K ── */
  const SYM = { M: ['exponential or Markov', 'exponential أو Markov'], D: ['constant or deterministic', 'constant أو deterministic'], 'Eₖ': ['Erlang of order k', 'Erlang من الدرجة k'], GI: ['general independent', 'general independent'], G: ['G, as the notes write it for the tire-curing system', 'الـ G زي ما الـ notes كاتباها في مثال الـ tire-curing'] };
  function Notation({ ar }) {
    const [mode, setMode] = useState('mm1'), [own, setOwn] = useState({ A: 'M', B: 'D', c: '2', N: '∞', K: '∞' });
    const P = { mm1: { A: 'M', B: 'M', c: '1', N: '∞', K: '∞', short: 1 }, full: { A: 'M', B: 'M', c: '1', N: '∞', K: '∞' }, tire: { A: 'G', B: 'G', c: '1', N: '5', K: '5' }, own }[mode];
    const text = mode === 'mm1' ? 'M/M/1' : mode === 'full' ? 'M/M/1/∞/∞' : mode === 'tire' ? 'G/G/1/5/5' : [own.A, own.B, own.c, own.N, own.K].join('/');
    const ROWS = [['A', 'Interarrival-time distribution', 'الـ interarrival-time distribution'], ['B', 'Service-time distribution', 'الـ service-time distribution'], ['c', 'Number of parallel servers', 'عدد الـ parallel servers'], ['N', 'System capacity', 'الـ system capacity'], ['K', 'Size of the calling population', 'حجم الـ calling population']];
    const val = (k, v) => k === 'A' || k === 'B' ? `${v}: ${SYM[v][0]}` : v === '∞' ? (k === 'c' ? '∞ (unlimited servers)' : '∞ (no limit)') : v;
    const cap = mode === 'mm1' ? { en: '<b>M/M/1/∞/∞</b> is usually shortened to <b>M/M/1</b>: when N and K are left out they are ∞.', ar: 'الـ <b><bdi dir="ltr">M/M/1/∞/∞</bdi></b> عادة بنختصرها لـ <b><bdi dir="ltr">M/M/1</bdi></b>، يعني لما الـ N والـ K مش مكتوبين يبقوا ∞.' }
      : mode === 'full' ? { en: 'The full form: exponential interarrival and service times, one server, unlimited capacity, infinite calling population.', ar: 'دي الصيغة الكاملة: الـ interarrival times والـ service times الاتنين exponential، وفيه server واحد، والـ capacity مفتوحة، والـ calling population لانهائية.' }
      : mode === 'tire' ? { en: 'The tire-curing system: <b>one worker</b> (c = 1) and <b>five machines</b>, so at most 5 in the system (N = 5) from a calling population of 5 (K = 5): <b>G/G/1/5/5</b>.', ar: 'نظام الـ tire-curing فيه <b>عامل واحد</b> و<b>5 machines</b>، فبالكتير 5 في الـ system من calling population حجمها 5:' + L('c = 1, N = 5, K = 5 → G/G/1/5/5') }
      : { en: 'Pick each symbol; the reading updates. M, D, Eₖ and GI are the notes\' common symbols for A and B.', ar: 'اختار كل رمز وهتلاقي القراءة بتتغير. والـ M والـ D والـ Eₖ والـ GI هما الرموز المشهورة في الـ notes للـ A والـ B.' };
    const sel = (k, opts) => html`<label key=${k}>${k}<select value=${own[k]} onChange=${e => setOwn(o => ({ ...o, [k]: e.target.value }))} aria-label=${k}>${opts.map(o => html`<option key=${o} value=${o}>${o}</option>`)}</select></label>`;
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['mm1', 'M/M/1'], ['full', 'M/M/1/∞/∞'], ['tire', 'G/G/1/5/5'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="mf2-row">${sel('A', ['M', 'D', 'Eₖ', 'GI'])}${sel('B', ['M', 'D', 'Eₖ', 'GI'])}${sel('c', ['1', '2', '3', '∞'])}${sel('N', ['∞', '5', '10'])}${sel('K', ['∞', '5', '10'])}</div>`}
      <p className="mf2-now" style=${{ fontSize: '1.2rem' }}><b style=${{ fontSize: '1.3rem' }}>${text}</b></p>
      <div className="mf2-col" style=${{ maxWidth: '440px', margin: '0 auto' }}>${ROWS.map(([k, m]) => html`<div key=${k} className=${'mf2-box' + (P.short && (k === 'N' || k === 'K') ? ' dim' : '')} style=${{ textAlign: 'left', display: 'grid', gridTemplateColumns: '1.6em minmax(0, 1fr)', gap: '6px' }}><b style=${{ color: 'var(--k-ms)' }}>${k}</b><span>${m}<small>${P.short && (k === 'N' || k === 'K') ? '∞ (left out)' : val(k, P[k])}</small></span></div>`)}</div>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §6: the single-server queue of slide 9, its state and its two events ── */
  function Ssq({ ar }) {
    const [n, setN] = useState(4), [last, setLast] = useState(null);
    const arrive = () => { setN(x => Math.min(8, x + 1)); setLast(n >= 8 ? 'full' : 'a'); };
    const depart = () => { if (n === 0) { setLast('none'); return; } setN(x => x - 1); setLast('d'); };
    const busy = n > 0, q = Math.max(0, n - 1);
    const cap = last === 'a' ? { en: `<b>Arrival event</b>: ${n === 1 ? 'the server was idle, so the unit enters service at once' : 'the server is busy, so the unit joins the waiting line'}. The state changes instantly: <b>${n}</b> unit(s) in the system, server <b>${busy ? 'busy' : 'idle'}</b>.`, ar: `ده <b>arrival event</b>: ${n === 1 ? 'الـ server كان idle فالـ unit دخلت الخدمة على طول' : 'الـ server busy فالـ unit وقفت في الـ waiting line'}. والـ state اتغيرت في لحظتها: بقى فيه <b>${n}</b> units في الـ system، والـ server <b>${busy ? 'busy' : 'idle'}</b>.` }
      : last === 'd' ? { en: `<b>Departure event</b>: a unit finished service and left. ${n > 0 ? 'The queue was not empty, so the next unit (FIFO) begins service.' : 'The queue was empty, so the server becomes idle.'} State: <b>${n}</b> unit(s), server <b>${busy ? 'busy' : 'idle'}</b>.`, ar: `ده <b>departure event</b>: فيه unit خلّصت خدمتها ومشيت. ${n > 0 ? 'الـ queue مكانتش فاضية، فاللي عليه الدور (FIFO) بيبدأ خدمته.' : 'الـ queue كانت فاضية، فالـ server بقى idle.'} والـ state بقت <b>${n}</b> units، والـ server <b>${busy ? 'busy' : 'idle'}</b>.` }
      : last === 'none' ? { en: 'No unit is in the system, so no departure can happen: the next event must be an arrival.', ar: 'مفيش ولا unit في الـ system، فمينفعش يحصل departure: الـ event الجاية لازم تكون arrival.' }
      : last === 'full' ? { en: 'The drawing has room for this many; in the model the line is unlimited.', ar: 'الرسمة مش واسعة أكتر من كده، لكن في الـ model الـ line مفتوحة من غير حد.' }
      : { en: 'Slide 9 as drawn: 3 units in the waiting line and 1 being served. <b>State</b> = number of units in the system (<b>4</b>) and the server status (<b>busy</b>). Only two <b>events</b> change it: press them. (FIFO, infinite calling population; arrival rate &lt; service rate keeps the system stable.)', ar: 'دي الـ slide 9 زي ما هي مرسومة: 3 units في الـ waiting line وواحدة بتتخدم. الـ <b>state</b> هي عدد الـ units في الـ system (يعني <b>4</b>) وحالة الـ server (<b>busy</b>). وفيه <b>events</b> اتنين بس بيغيّروها، جرّب تدوس عليهم. والـ system ده FIFO والـ calling population فيه infinite، ولو الـ arrival rate أقل من الـ service rate يبقى الـ system مستقر (stable).' };
    return html`<figure className="fig mf2"><div className="fig-stage">
      <div style=${{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <div className="mf2-box" style=${{ borderRadius: '40%', borderStyle: 'dashed' }}>Calling<br />population</div><span className="mf2-arr">→</span>
        <div style=${{ textAlign: 'center' }}><span className="mf2-chip">t<span className="mf2-sb">i+1</span></span><span className="mf2-chip">t<span className="mf2-sb">i</span></span><small className="mf2-lbl" style=${{ display: 'block' }}>arrivals</small></div><span className="mf2-arr">→</span>
        <div style=${{ textAlign: 'center' }}><div className="mf2-box" style=${{ minWidth: '6.5em', minHeight: '2.2em', padding: '4px', display: 'flex', gap: '2px', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap' }}>${Array.from({ length: q }, (_, k) => html`<span key=${k} className="mf2-chip" style=${{ minWidth: '1.4em', height: '1.4em' }}></span>`)}</div><small className="mf2-lbl">Waiting line</small></div><span className="mf2-arr">→</span>
        <div style=${{ textAlign: 'center' }}><span className=${'mf2-chip' + (busy ? ' srv' : '')} style=${{ minWidth: '2.6em', height: '2.6em' }}>${busy ? '●' : ''}</span><small className="mf2-lbl" style=${{ display: 'block' }}>Server</small></div><span className="mf2-arr">→</span></div>
      <p className="mf2-now" style=${{ marginTop: '10px' }}>units in system <b>${n}</b> · server <span className=${'mf2-tag ' + (busy ? 'busy' : 'idle')}>${busy ? 'busy' : 'idle'}</span></p>
      <div className="mf2-row"><button className="fig-btn solid" onClick=${arrive}>Arrival event</button><button className="fig-btn solid" onClick=${depart}>Departure event</button><button className="fig-btn" onClick=${() => { setN(4); setLast(null); }}>↻</button></div>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §7: arrival and departure flow diagrams (slide 10, notes Fig 2.5 and 2.6) walked through ── */
  function Flows({ ar }) {
    const steps = [
      { ev: 'a', ans: 'No', en: '<b>Arrival event</b>, server idle: <b>Server busy?</b> No → <b>unit enters service</b>.', ar: 'ده <b>arrival event</b> والـ server فاضي: السؤال <b>Server busy?</b> إجابته No، فالـ unit <b>بتدخل الخدمة</b> على طول.' },
      { ev: 'a', ans: 'Yes', en: '<b>Arrival event</b>, server busy: Yes → <b>unit enters queue for service</b>.', ar: 'ده <b>arrival event</b> والـ server مشغول: الإجابة Yes، فالـ unit <b>بتدخل الـ queue</b> تستنى دورها.' },
      { ev: 'd', ans: 'No', en: '<b>Departure event</b>, nobody waiting: <b>Another unit waiting?</b> No → <b>begin server idle time</b>.', ar: 'ده <b>departure event</b> ومفيش حد مستني: السؤال <b>Another unit waiting?</b> إجابته No، فالـ server <b>يبدأ idle time</b>.' },
      { ev: 'd', ans: 'Yes', en: '<b>Departure event</b>, a unit waiting: Yes → <b>remove the waiting unit from the queue</b> → <b>begin servicing the unit</b>.', ar: 'ده <b>departure event</b> وفيه unit مستنية: الإجابة Yes، فبنشيلها من الـ queue ونبدأ نخدمها:' + L('Remove the waiting unit from the queue → Begin servicing the unit') },
      { ev: 'x', en: 'Events occur <b>randomly</b> (slide 10): in the small example, interarrival times ∈ {1, …, 6} and service times ∈ {1, …, 4}. The randomness comes from random numbers.', ar: 'الـ events بتحصل <b>random</b> (الـ slide 10): في المثال الصغير الـ interarrival times من 1 لـ 6 والـ service times من 1 لـ 4، والعشوائية دي جاية من الـ random numbers.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const A = s.ev === 'a', D = s.ev === 'd', on = (ev, a) => s.ev === ev && (a == null || s.ans === a);
    const chart = (ev, title, q, no, yes) => html`<div className=${'mf2-col' + (s.ev === 'x' ? '' : s.ev === ev ? '' : ' mf2-hide')} style=${{ opacity: s.ev === 'x' || s.ev === ev ? 1 : .3, transition: 'opacity .45s' }}>
      <div className=${'mf2-box' + (on(ev) ? ' on' : '')}><b>${title}</b></div><div className="mf2-arr">↓</div>
      <div className=${'mf2-box dia' + (on(ev) ? ' on' : '')}>${q}</div>
      <div className="mf2-two"><div className="mf2-arr">↙ <span className="mf2-lbl">No</span></div><div className="mf2-arr"><span className="mf2-lbl">Yes</span> ↘</div></div>
      <div className="mf2-two" style=${{ alignItems: 'start' }}><div className="mf2-col">${no.map((t, k) => html`<div key=${k}>${k ? html`<div className="mf2-arr">↓</div>` : ''}<div className=${'mf2-box' + (on(ev, 'No') ? ' on' : s.ev === ev ? ' dim' : '')}>${t}</div></div>`)}</div>
        <div className="mf2-col">${yes.map((t, k) => html`<div key=${k}>${k ? html`<div className="mf2-arr">↓</div>` : ''}<div className=${'mf2-box' + (on(ev, 'Yes') ? ' on' : s.ev === ev ? ' dim' : '')}>${t}</div></div>`)}</div></div></div>`;
    return html`<figure className="fig mf2"><div className="fig-stage"><div style=${{ display: 'grid', gap: '14px', maxWidth: '440px', margin: '0 auto' }}>
      ${chart('a', 'Arrival event', 'Server busy?', ['Unit enters service'], ['Unit enters queue for service'])}
      ${chart('d', 'Departure event', 'Another unit waiting?', ['Begin server idle time'], ['Remove the waiting unit from the queue', 'Begin servicing the unit'])}
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §7: Fig 2.7 and Fig 2.8 as tappable grids ── */
  function Outcomes({ ar }) {
    const [f, setF] = useState('27'), [c, setC] = useState(null);
    const G = f === '27'
      ? { t: 'Fig 2.7: potential unit actions upon arrival', rows: 'Server status', cells: [['Enter queue', 'Enter queue'], ['Impossible', 'Enter service']],
        why: [[['Server busy, others waiting: the new unit joins the queue.', 'الـ server مشغول وفيه ناس مستنية: الـ unit الجديدة بتقف في الـ queue.'], ['Server busy, queue empty: the unit still has to wait, so it enters the queue.', 'الـ server مشغول والـ queue فاضية: برضه لازم تستنى، فبتدخل الـ queue.']], [['<b>Impossible</b>: an idle server never leaves units waiting in the queue.', 'دي <b>مستحيلة</b>: الـ server الفاضي عمره ما يسيب units مستنية في الـ queue.'], ['Server idle, queue empty: the unit enters service at once.', 'الـ server فاضي والـ queue فاضية: الـ unit بتدخل الخدمة على طول.']]] }
      : { t: 'Fig 2.8: server outcomes after service completion', rows: 'Server outcomes', cells: [['Another unit enters service', 'Impossible'], ['Impossible', 'Server becomes idle']],
        why: [[['Queue not empty: another unit enters the server, so it stays busy (shaded in the figure).', 'الـ queue مش فاضية: unit تانية بتدخل الـ server فيفضل busy، والخانة دي متظللة في الرسمة.'], ['<b>Impossible</b> in Fig 2.8: with the queue empty nobody can take the server after a completion.', 'دي <b>مستحيلة</b> في الـ Fig 2.8: لو الـ queue فاضية مفيش حد ياخد الـ server بعد ما الخدمة تخلص.']], [['<b>Impossible</b>: the server cannot go idle while units are waiting.', 'دي <b>مستحيلة</b>: الـ server مينفعش يبقى idle وفيه units مستنية.'], ['Queue empty: the server becomes idle after the service is completed (shaded in the figure).', 'الـ queue فاضية: الـ server بيبقى idle بعد ما الخدمة تخلص، والخانة دي متظللة في الرسمة.']]] };
    const cap = c ? { en: G.why[c[0]][c[1]][0], ar: G.why[c[0]][c[1]][1] } : { en: 'Tap a cell: rows are the server, columns the queue. Hatched cells are <b>impossible</b>.', ar: 'دوس على أي خانة: الصفوف للـ server والأعمدة للـ queue. والخانات المشطوبة <b>مستحيلة</b>.' };
    const hatch = 'repeating-linear-gradient(45deg, var(--paper) 0 6px, var(--paper-2) 6px 12px)';
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['27', 'Fig 2.7 (arrival)'], ['28', 'Fig 2.8 (completion)']]} mode=${f} set=${k => { setF(k); setC(null); }} />
      <p className="mf2-h4">${G.t}</p>
      <div style=${{ display: 'grid', gridTemplateColumns: '3.6em minmax(0, 1fr) minmax(0, 1fr)', gap: '4px', maxWidth: '420px', margin: '0 auto', fontSize: '.84rem' }}>
        <span className="mf2-lbl" style=${{ alignSelf: 'end' }}>${G.rows}</span><b style=${{ textAlign: 'center' }}>Queue not empty</b><b style=${{ textAlign: 'center' }}>Queue empty</b>
        ${['Busy', 'Idle'].map((r, k) => html`<${React.Fragment} key=${r}><b style=${{ alignSelf: 'center' }}>${r}</b>${[0, 1].map(j => { const imp = G.cells[k][j] === 'Impossible', sel = c && c[0] === k && c[1] === j;
          return html`<button key=${j} className=${'mf2-box' + (sel ? ' on' : '')} style=${{ font: 'inherit', fontSize: '.84rem', cursor: 'pointer', minHeight: '3.2em', background: imp && !sel ? hatch : f === '28' && !imp && !sel ? 'color-mix(in srgb, var(--k-ms) 14%, var(--paper))' : '', color: imp ? 'var(--graphite)' : 'var(--ink)', fontWeight: imp ? 700 : 400 }} onClick=${() => setC([k, j])}>${G.cells[k][j]}</button>`; })}</${React.Fragment}>`)}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §8: meshing clock, arrival and service times for 6 customers (slide 11) ── */
  const M6 = queueRun([null, 2, 4, 1, 2, 6], [2, 1, 3, 2, 1, 4]);
  function Mesh({ ar }) {
    const steps = [{ en: 'Slide 11: the interarrival and service times are taken from distributions (2, 4, 1, 2, 6 and 2, 1, 3, 2, 1, 4). Mesh them with the clock, one customer at a time.', ar: 'في الـ slide 11 الـ interarrival times والـ service times جايين من distributions. هندمجهم مع الـ clock، واحد ورا التاني.' }]
      .concat(M6.map((r, k) => {
        if (k === 0) return { en: 'Customer 1 arrives at clock <b>0</b> to an idle server: service begins at 0 and ends 0 + 2 = <b>2</b>.', ar: 'الـ customer الأول بيوصل عند الـ clock صفر والـ server فاضي، فالخدمة بتبدأ عند صفر وتخلص عند 2:' + L('0 + 2 = 2') };
        const p = M6[k - 1], w = r.beg > r.arr;
        return { en: `Customer ${r.c}: arrives at ${p.arr} + ${r.ia} = <b>${r.arr}</b>. ${w ? `Customer ${p.c} is served until ${p.end}, so service begins at max(${r.arr}, ${p.end}) = <b>${r.beg}</b>.` : `The server is free (previous end ${p.end}), so service begins at max(${r.arr}, ${p.end}) = <b>${r.beg}</b>.`} Ends at ${r.beg} + ${r.s} = <b>${r.end}</b>.`,
          ar: `الـ customer رقم ${r.c} بيوصل عند ${r.arr}. ${w ? `الـ customer رقم ${p.c} لسه بيتخدم لحد ${p.end}، فالخدمة بتبدأ عند ${r.beg}.` : `الـ server فاضي (آخر خدمة خلصت عند ${p.end})، فالخدمة بتبدأ عند ${r.beg}.`} وبتخلص عند ${r.end}:` + L(`arrival = ${p.arr} + ${r.ia} = ${r.arr} ; begins = max(${r.arr}, ${p.end}) = ${r.beg} ; ends = ${r.beg} + ${r.s} = ${r.end}`) };
      })).concat([{ en: 'Done: customers 4 and 5 had to wait (begins &gt; arrival); the server was idle 3 to 6 and 12 to 15.', ar: 'خلصنا: الـ customers رقم 4 و 5 اضطروا يستنوا لأن الخدمة بدأت بعد وصولهم، والـ server كان فاضي في الفترتين دول:' + L('3 → 6 ,  12 → 15') }]);
    const [i, ctl] = useSteps(steps.length, 2600), n = Math.min(i, 6);
    const X = t => 20 + t * 13;
    return html`<figure className="fig mf2"><div className="fig-stage">
      <svg className="mf2-svg" viewBox="0 0 300 74" role="img" aria-label="Server busy periods on the clock">
        <rect className="lane" x="20" y="8" width="260" height="30" />
        ${M6.slice(0, n).map(r => html`<g key=${r.c}><rect className="busy" x=${X(r.beg)} y="8" width=${r.s * 13} height="30" /><text x=${X(r.beg) + r.s * 6.5} y="29" textAnchor="middle" fontSize="15">${r.c}</text></g>`)}
        ${n > 0 && html`<line className="now" x1=${X(M6[n - 1].arr)} x2=${X(M6[n - 1].arr)} y1="2" y2="44" />`}
        ${[0, 5, 10, 15, 20].map(t => html`<text key=${t} x=${X(t)} y="62" textAnchor="middle" fontSize="15" className="mu">${t}</text>`)}
      </svg>
      <${Tbl} head=${['Cust.', 'Inter-arrival', 'Arrival [clock]', 'Service [duration]', 'Begins [clock]', 'Ends [clock]']} cur=${n - 1}
        rows=${M6.slice(0, Math.max(n, 0)).map(r => [r.c, r.ia == null ? '-' : r.ia, r.arr, r.s, r.beg, r.end])} cellCls=${(k, j) => (k === n - 1 && j >= 4 ? 'hot' : '')} label="Meshed simulation table" />
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §9: chronological ordering of events and the number of customers in the system (slide 12) ── */
  const EV = (() => { const e = []; M6.forEach(r => { e.push({ t: r.arr, c: r.c, a: 1 }); e.push({ t: r.end, c: r.c, a: 0 }); }); e.sort((x, y) => x.t - y.t || x.a - y.a); let n = 0; return e.map(x => ({ ...x, n: n += x.a ? 1 : -1 })); })();
  function Chrono({ ar }) {
    const steps = EV.map((e, k) => ({ en: `Clock <b>${e.t}</b>: customer ${e.c} ${e.a ? 'arrives' : 'departs'} → <b>${e.n}</b> customer(s) in the system.${k > 0 && EV[k - 1].t === e.t ? ' <b>Two events at the same time.</b>' : ''}`, ar: `عند الـ clock ${e.t}: الـ customer رقم ${e.c} ${e.a ? 'بيوصل' : 'بيمشي'}، فبقى فيه <b>${e.n}</b> في الـ system.${k > 0 && EV[k - 1].t === e.t ? ' <b>هنا حصل event اتنين في نفس اللحظة.</b>' : ''}` }))
      .concat([{ en: 'Observations (slide 12): customer 1 is in the system at time 0; sometimes there are <b>no</b> customers; sometimes <b>two</b> (7 to 11); several events may occur at the <b>same time</b> (2 and 9).', ar: 'ملاحظات الـ slide 12: الـ customer الأول موجود في الـ system عند الزمن صفر، وساعات مفيش <b>ولا customer</b>، وساعات فيه <b>اتنين</b> (من 7 لـ 11)، وممكن كذا event يحصلوا في <b>نفس اللحظة</b> (عند 2 وعند 9).' }]);
    const [i, ctl] = useSteps(steps.length, 1700), n = Math.min(i, EV.length - 1), done = i >= EV.length;
    const X = t => 26 + t * 13, Y = v => 112 - v * 42;
    let d = `M${X(0)} ${Y(0)}`, lv = 0; EV.slice(0, n + 1).forEach(e => { d += ` H${X(e.t)} V${Y(e.n)}`; lv = e.n; });
    const tEnd = done ? 20 : EV[n].t; d += ` H${X(tEnd)}`;
    return html`<figure className="fig mf2"><div className="fig-stage">
      <svg className="mf2-svg" viewBox="0 0 300 150" role="img" aria-label="Number of customers in the system against time">
        ${[0, 1, 2].map(v => html`<g key=${v}><line className="gr" x1=${X(0)} x2=${X(20)} y1=${Y(v)} y2=${Y(v)} /><text x=${X(0) - 8} y=${Y(v) + 5} textAnchor="end" fontSize="15" className="mu">${v}</text></g>`)}
        <line className="ax" x1=${X(0)} x2=${X(20)} y1=${Y(0)} y2=${Y(0)} />
        ${[0, 5, 10, 15, 20].map(t => html`<text key=${t} x=${X(t)} y="134" textAnchor="middle" fontSize="15" className="mu">${t}</text>`)}
        <path d=${d} className="ln" />
        ${!done && html`<circle cx=${X(EV[n].t)} cy=${Y(EV[n].n)} r="5" fill="var(--pen)" />`}
      </svg>
      <${Tbl} head=${['Clock time', 'Customer', 'Event type', 'Number of customers']} cur=${done ? -1 : n} rows=${EV.slice(0, n + 1).map(e => [e.t, e.c, e.a ? 'Arrival' : 'Departure', e.n])} label="Chronological ordering of events" />
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §10: the grocery's input distributions (slide 14) ── */
  function GroceryDist({ ar }) {
    const [m, setM] = useState('p');
    const IA = [1, 2, 3, 4, 5, 6, 7, 8].map(t => [t, .125, t * .125]), SV = [[1, .10, .10], [2, .20, .30], [3, .30, .60], [4, .25, .85], [5, .10, .95], [6, .05, 1]];
    const fmt = (x, d) => x.toFixed(d);
    const bars = (rows, d, title) => html`<div style=${{ maxWidth: '420px', margin: '0 auto 10px' }}><p className="mf2-h4">${title}</p>${rows.map(([t, p, c]) => { const v = m === 'p' ? p : c; return html`<div key=${t} className="mf2-hb"><span>${t} min</span><span><i className=${m === 'p' ? '' : 'lo'} style=${{ width: (v * 100) + '%' }}></i></span><span>${fmt(v, d)}</span></div>`; })}</div>`;
    const cap = m === 'p' ? { en: 'Probabilities: every interarrival time 1 to 8 has <b>0.125</b> (uniform); service times 1 to 6 have 0.10, 0.20, 0.30, 0.25, 0.10, 0.05.', ar: 'الـ probabilities: كل interarrival time من 1 لـ 8 احتماله <b>0.125</b> (uniform)، والـ service times من 1 لـ 6 احتمالاتهم كده:' + L('0.10, 0.20, 0.30, 0.25, 0.10, 0.05') }
      : { en: 'Cumulative probability = running sum of the probabilities: interarrival 0.125, 0.250, …, 1.000; service 0.10, 0.30, 0.60, 0.85, 0.95, 1.00.', ar: 'الـ cumulative probability هو مجموع الـ probabilities لحد القيمة دي:' + L('interarrival: 0.125, 0.250, …, 1.000<br>service: 0.10, 0.30, 0.60, 0.85, 0.95, 1.00') };
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['p', 'Probability'], ['c', 'Cumulative']]} mode=${m} set=${setM} />
      ${bars(IA, 3, 'Interarrival time')}${bars(SV, 2, 'Service time')}
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §12: the grocery model equations applied to slide 15's rows 1-6 and its totals ── */
  const G15 = queueRun([null, 1, 1, 6, 3, 7], [4, 2, 5, 4, 1, 5]);
  function GroceryEq({ ar }) {
    const steps = G15.map((r, k) => {
      const p = k ? G15[k - 1] : null;
      const lines = k === 0 ? ['Arrival(1) = 0', 'Begins = 0', `Ends = 0 + ${r.s} = ${r.end}`, 'Waiting = 0', `In system = ${r.end} − 0 = ${r.sys}`, 'Idle = 0']
        : [`Arrival = ${p.arr} + ${r.ia} = ${r.arr}`, `Begins = MAX(${r.arr}, ${p.end}) = ${r.beg}`, `Ends = ${r.beg} + ${r.s} = ${r.end}`, `Waiting = ${r.beg} − ${r.arr} = ${r.wait}`, `In system = ${r.end} − ${r.arr} = ${r.sys}`, r.arr > p.end ? `Idle = ${r.arr} − ${p.end} = ${r.idle}` : `Idle = 0 (${r.arr} ≤ ${p.end})`];
      const en = k === 0 ? 'Customer 1 arrives at 0 and is served at once.' : r.wait ? `Customer ${r.c} arrives at ${r.arr} while the server is busy until ${p.end}: waits <b>${r.wait}</b> min.` : `Customer ${r.c} arrives at ${r.arr}; the server has been free since ${p.end}: idle <b>${r.idle}</b> min, no wait.`;
      const a = k === 0 ? 'الـ customer الأول بيوصل عند صفر ويتخدم على طول.' : r.wait ? `الـ customer رقم ${r.c} بيوصل عند ${r.arr} والـ server مشغول لحد ${p.end}، فبيستنى <b>${r.wait}</b> دقايق.` : `الـ customer رقم ${r.c} بيوصل عند ${r.arr}، والـ server فاضي من عند ${p.end}، يعني الـ server كان idle لمدة <b>${r.idle}</b> دقايق والـ customer مستناش.`;
      return { en, ar: a, lines };
    }).concat([{ en: 'Rows 7 to 99 are hidden on the slide; row 100 arrives at 415 and ends at 418. Totals for all 100 customers: interarrival <b>415</b>, service <b>317</b>, waiting <b>174</b>, in system <b>491</b>, idle <b>101</b>.', ar: 'الصفوف من 7 لـ 99 مش معروضة في الـ slide، والصف 100 بيوصل عند 415 ويخلص عند 418. والـ totals للـ 100 customer هي:' + L('interarrival 415, service 317, waiting 174, in system 491, idle 101'), lines: ['Total over 100 customers'], end: 1 }]);
    const [i, ctl] = useSteps(steps.length, 3000), s = steps[i], n = s.end ? 6 : i + 1;
    const rows = G15.slice(0, n).map(r => [r.c, r.ia == null ? '-' : r.ia, r.arr, r.s, r.beg, r.end, r.wait, r.sys, r.idle]);
    if (s.end) rows.push(['…', '…', '…', '…', '…', '…', '…', '…', '…'], [100, 5, 415, 2, 416, 418, 1, 3, 0]);
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Tbl} head=${['#', 'IA', 'Arr', 'Svc', 'Beg', 'End', 'Wait', 'Sys', 'Idle']} cur=${s.end ? -1 : i} rows=${rows} tot=${s.end ? ['Tot', 415, '', 317, '', '', 174, 491, 101] : null} cellCls=${(k, j) => (!s.end && k === i && j >= 2 ? 'hot' : '')} label="Grocery simulation table rows 1 to 6" />
      <p className="mf2-key"><b>IA</b> interarrival · <b>Arr</b> arrival · <b>Svc</b> service · <b>Beg</b>/<b>End</b> service begins/ends · <b>Wait</b> in queue · <b>Sys</b> in system · <b>Idle</b> of server</p>
      <div className="mf2-f" aria-label="Equations for this row">${s.lines.map((l, k) => html`<div key=${k}>${l}</div>`)}</div>
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §13: the seven statistics of slide 16 from the 100-customer totals ── */
  function GroceryStats({ ar }) {
    const S = [
      ['Average waiting time', '174 / 100', '1.74 min', 'w̄ = 174 / 100 = 1.74 min', 'متوسط الـ waiting time'],
      ['P(customer waits)', '46 / 100', '0.46', 'p(wait) = 46 / 100 = 0.46', 'احتمال إن الـ customer يستنى'],
      ['P(idle server)', '101 / 418', '0.24', 'p(idle) = 101 / 418 = 0.24', 'نسبة الـ idle time للـ server، والـ 418 هو الـ run time (آخر خدمة خلصت عنده)'],
      ['Average service time', '317 / 100', '3.17 min', 's̄ = 317 / 100 = 3.17 ; E(s) = Σ s·p(s) = 3.2 min', 'متوسط الـ service time، ونقارنه بالـ expected value'],
      ['Avg time between arrivals', '415 / 99', '4.19 min', '415 / (100 − 1) = 4.19 ; E(τ) = (1 + 8)/2 = 4.5 min', 'متوسط الوقت بين الوصول، وبنقسم على 99 لأن أول customer وصل عند صفر'],
      ['Avg wait of those who wait', '174 / 54', '3.22 min', '174 / 54 = 3.22 (slide) ; 174 / 46 = 3.78 ‡', 'متوسط الانتظار للي استنوا بس'],
      ['Average time in system', '491 / 100', '4.91 min', 't̄ = 491 / 100 = 4.91 = 1.74 + 3.17', 'متوسط الوقت في الـ system، وبيساوي الانتظار زائد الخدمة']
    ];
    const steps = [{ en: 'Slide 16 turns the 100-customer totals into seven statistics: waiting <b>174</b>, customers who wait <b>46</b>, idle <b>101</b>, run time <b>418</b>, service <b>317</b>, interarrival <b>415</b>, in system <b>491</b>.', ar: 'الـ slide 16 بتحوّل الـ totals بتاعة الـ 100 customer لـ 7 statistics، والأرقام اللي بنستخدمها هي:' + L('waiting 174, waited 46, idle 101, run 418, service 317, interarrival 415, system 491'), k: -1 }]
      .concat(S.map(([t, fr, v, f, a], k) => ({ en: `<b>${t}</b>: ${f.replace(/ ; /g, '; ')}.${k === 5 ? ' ‡ The slide divides by <b>54</b> here but uses <b>46</b> waiters for p(wait); with 46 it would be 3.78 min. The method: total waiting ÷ number who actually waited.' : ''}`, ar: `<b>${a}</b>:` + L(f) + (k === 5 ? '‡ الـ slide قسمت هنا على <b>54</b> مع إنها استخدمت <b>46</b> في الـ <bdi dir="ltr">p(wait)</bdi>، ولو قسمنا على 46 تطلع 3.78. والطريقة الصح: مجموع الانتظار على عدد اللي استنوا فعلًا.' : ''), k })));
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    return html`<figure className="fig mf2"><div className="fig-stage">
      <div className="mf2-stat">${S.map(([t, fr, v], k) => html`<div key=${k} className=${s.k === k ? 'on' : s.k >= 0 && k > s.k ? 'off' : ''}>${t}<small>${fr}</small><b>${s.k === -1 || k <= s.k ? v : '?'}</b></div>`)}</div>
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §14: histogram of the average waiting time over 50 trials (slide 17) ── */
  function Hist({ ar }) {
    const H = [['0', 0], ['0.5', 2], ['1', 15], ['1.5', 17], ['2', 7], ['2.5', 5], ['3', 2], ['3.5', 1], ['4', 0], ['4.5', 0], ['>4.5', 1]];
    const steps = [
      { en: 'Slide 17: the grocery simulation repeated for <b>50 trials</b>; each trial gives one average customer waiting time. The histogram counts trials per 0.5-minute class.', ar: 'الـ slide 17: الـ grocery simulation اتعادت <b>50 trial</b>، وكل trial بيدّي متوسط waiting time واحد. والـ histogram بيعدّ الـ trials في كل class عرضها نص دقيقة.' },
      { en: 'Occurrences: the bars add up to <b>50</b> trials.', ar: 'الـ occurrences: مجموع الـ bars بيطلع <b>50</b> trial.' },
      { en: 'The tallest bars are <b>17</b> (1.5 min) and <b>15</b> (1 min): most trials give an average wait between about 1 and 2 minutes.', ar: 'أطول bars هما <b>17</b> عند 1.5 دقيقة و <b>15</b> عند دقيقة واحدة، يعني أغلب الـ trials متوسط الانتظار فيها بين دقيقة ودقيقتين تقريبًا.' },
      { en: 'Interpretations: average waiting time is <b>not high</b>; the server has <b>not an undue amount of idle time</b>; <b>nearly half</b> of the customers have to wait (46%). A <b>longer run</b> would increase the accuracy.', ar: 'التفسير: متوسط الانتظار <b>مش عالي</b>، والـ server <b>مش قاعد فاضي زيادة عن اللزوم</b>، و<b>حوالي نص</b> الـ customers بيستنوا (46%). ولو الـ run <b>أطول</b> الدقة هتزيد.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    return html`<figure className="fig mf2"><div className="fig-stage"><div style=${{ maxWidth: '420px', margin: '0 auto' }}>
      <p className="mf2-h4">Average customer waiting time [min] → occurrences [no. of trials]</p>
      ${H.map(([x, v]) => html`<div key=${x} className=${'mf2-hb' + (i === 2 && v >= 15 ? ' on' : '')}><span>${x}</span><span><i style=${{ width: (i >= 1 ? v / 18 * 100 : 0) + '%' }}></i></span><span>${i >= 1 ? v : ''}</span></div>`)}
      <p className="mf2-now" style=${{ marginTop: '6px' }}>trials <b>${i >= 1 ? 50 : '?'}</b></p></div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §15: random-digit assignment lookup (Tables 2.1, 2.2) ── */
  function Digits({ ar }) {
    const [m, setM] = useState('a'), [d, setD] = useState('913');
    const T = m === 'a' ? { n: 3, R: G_ARR, lab: ['001–125', '126–250', '251–375', '376–500', '501–625', '626–750', '751–875', '876–000'], p: '0.125', unit: 'Time between arrivals' } : { n: 2, R: G_SVC, lab: ['01–10', '11–30', '31–60', '61–85', '86–95', '96–00'], p: '', unit: 'Service time' };
    const ok = new RegExp('^\\d{' + T.n + '}$').test(d), v = ok ? look(d, T.R) : null, k = ok ? T.R.findIndex(r => r[2] === v) : -1;
    const setMode = x => { setM(x); setD(x === 'a' ? '913' : '84'); };
    const ex = (m === 'a' && d === '913') || (m === 's' && d === '84');
    const cap = !ok ? { en: `Type exactly ${T.n} digits.`, ar: `اكتب ${T.n} أرقام بالظبط.` }
      : { en: `Digits <b>${d}</b> lie in <b>${T.lab[k]}</b> → <b>${v} min</b>.${ex ? (m === 'a' ? ' (The notes\' example: 913 → 8 minutes.)' : ' (Customer 1 of Example 2.2: 84 → 4 minutes.)') : ''} ${m === 'a' ? 'Three-digit numbers because the probabilities have 3 significant digits (1000 values, 001 to 000).' : 'Two digits are enough for Table 2.2.'}`, ar: `الأرقام <b>${d}</b> واقعة في المدى ده، فالقيمة <b>${v}</b> دقايق:` + L(`${d} ∈ ${T.lab[k]} → ${v} min`) + (m === 'a' ? 'وبنستخدم 3 أرقام لأن الـ probabilities فيها 3 significant digits، يعني 1000 قيمة من 001 لحد 000.' : 'وفي الـ Table 2.2 رقمين كفاية.') };
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['a', 'Interarrival (3 digits)'], ['s', 'Service (2 digits)']]} mode=${m} set=${setMode} />
      <div className="mf2-row"><label>Random digits <input value=${d} inputMode="numeric" maxLength=${T.n} onInput=${e => setD(e.target.value.replace(/\D/g, '').slice(0, T.n))} aria-label="Random digits" /></label>
        <button className="fig-btn solid" onClick=${() => setD(rdig(T.n))}>New digits</button></div>
      <${Tbl} head=${['Minutes', 'Random-digit assignment']} cur=${k} rows=${T.R.map((r, j) => [r[2], T.lab[j]])} label=${T.unit + ' assignment'} />
      <p className="mf2-now" style=${{ marginTop: '8px' }}>${T.unit}: <b>${ok ? v + ' min' : '?'}</b></p>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §17-18: Example 2.2, the grocery for 20 customers, row by row (and try your own digits) ── */
  const statCards = st => [
    ['Average waiting time', `${st.W} / ${st.n}`, f2(st.W / st.n) + ' min'],
    ['P(customer waits)', `${st.nw} / ${st.n}`, f2(st.nw / st.n)],
    ['P(idle server)', `${st.I} / ${st.run}`, f2(st.I / st.run)],
    ['Average service time', `${st.S} / ${st.n}`, f2(st.S / st.n) + ' min'],
    ['Avg time between arrivals', `${st.IA} / ${st.n - 1}`, f2(st.IA / (st.n - 1)) + ' min'],
    ['Avg wait of those who wait', st.nw ? `${st.W} / ${st.nw}` : '0 waited', st.nw ? f2(st.W / st.nw) + ' min' : '-'],
    ['Average time in system', `${st.T} / ${st.n}`, f2(st.T / st.n) + ' min']];
  function Timeline({ rows, upto, run, at }) {
    const W = 270, X = t => 15 + t * W / Math.max(run, 1), step = run > 60 ? 20 : 10, ticks = []; for (let t = 0; t <= run; t += step) ticks.push(t);
    return html`<svg className="mf2-svg" viewBox="0 0 300 62" role="img" aria-label="Server busy (filled) and idle (empty) over the clock">
      <rect className="lane" x="15" y="6" width=${W} height="24" />
      ${rows.slice(0, upto).map(r => html`<rect key=${r.c} className="busy" x=${X(r.beg)} y="6" width=${Math.max(.5, X(r.end) - X(r.beg))} height="24" />`)}
      ${at != null && html`<line className="now" x1=${X(at)} x2=${X(at)} y1="1" y2="36" />`}
      ${ticks.map(t => html`<text key=${t} x=${X(t)} y="54" textAnchor="middle" fontSize="15" className="mu">${t}</text>`)}</svg>`;
  }
  function Grocery20({ ar }) {
    const [mode, setMode] = useState('ex'), [cnt, setCnt] = useState(20), [dig, setDig] = useState(null);
    const ex = mode === 'ex';
    const rows = ex ? grocery(G_AD, G_SD, { 14: 5 }) : dig ? grocery(dig.a, dig.s) : grocery(G_AD, G_SD, { 14: 5 });
    const n = rows.length, st = queueStats(rows);
    const [i, ctl] = useRun(n + 1, 2200), end = i >= n, r = end ? null : rows[i], p = r && i > 0 ? rows[i - 1] : null;
    const fresh = c => { const a = [null], s = []; for (let k = 0; k < c; k++) { if (k) a.push(rdig(3)); s.push(rdig(2)); } setDig({ a, s }); ctl.go(c); };
    const setM = m => { setMode(m); if (m === 'try') fresh(cnt); else ctl.replay(); };
    let en, a;
    if (end) { en = `${ex ? 'Table 2.5 complete: totals service <b>68</b>, waiting <b>56</b>, in system <b>124</b>, idle <b>18</b>; the last service ends at <b>86</b>. ' : ''}The statistics: average wait ${st.W}/${st.n} = <b>${f2(st.W / st.n)}</b>, P(wait) ${st.nw}/${st.n} = <b>${f2(st.nw / st.n)}</b>, P(idle) ${st.I}/${st.run} = <b>${f2(st.I / st.run)}</b>, average service ${f2(st.S / st.n)} (E(S) = 3.2), time between arrivals ${f2(st.IA / (st.n - 1))} (E(A) = 4.5), time in system ${f2(st.T / st.n)} = wait + service.${ex ? ' The notes round 82/19 and 56/13 to <b>4.3</b>.' : ''}`;
      a = (ex ? 'كده الـ Table 2.5 كمل، والـ totals: الخدمة 68 والانتظار 56 والوقت في الـ system كان 124 والـ idle كان 18، وآخر خدمة خلصت عند 86. ' : '') + 'الـ statistics بتطلع كده:' + L(`w̄ = ${st.W}/${st.n} = ${f2(st.W / st.n)} ; P(wait) = ${st.nw}/${st.n} = ${f2(st.nw / st.n)} ; P(idle) = ${st.I}/${st.run} = ${f2(st.I / st.run)}<br>s̄ = ${f2(st.S / st.n)} (E(S) = 3.2) ; ${st.IA}/${st.n - 1} = ${f2(st.IA / (st.n - 1))} (E(A) = 4.5) ; t̄ = ${f2(st.T / st.n)}`) + (ex ? 'والـ notes قرّبت الناتجين دول لـ 4.3:' + L('82/19 ≈ 4.3 ; 56/13 ≈ 4.3') : ''); }
    else if (i === 0) { en = `Customer 1 arrives at time <b>0</b>. Service digits ${r.sd} → <b>${r.s} min</b>; service begins at once and ends at <b>${r.end}</b>.`; a = `الـ customer الأول بيوصل عند الزمن صفر، والـ service digits بتوعه ${r.sd} يدّوا <b>${r.s}</b> دقايق، فالخدمة بتبدأ على طول وتخلص عند <b>${r.end}</b>.`; }
    else {
      const why = r.wait ? `The server is busy until ${p.end}, so service begins at <b>${r.beg}</b>: waits ${r.beg} − ${r.arr} = <b>${r.wait}</b>.` : r.idle ? `The server has been idle since ${p.end}: idle ${r.arr} − ${p.end} = <b>${r.idle}</b> min; service begins at once.` : 'The server frees up exactly now, so service begins at once.';
      en = `Customer ${r.c}: digits ${r.ad} → <b>${r.ia} min</b> since the last arrival, arrives at ${p.arr} + ${r.ia} = <b>${r.arr}</b>. Service digits ${r.sd} → <b>${r.s} min</b>${r.fixed ? ' (the notes use 5; by Table 2.2, 79 gives 4 ‡)' : ''}. ${why} Ends at <b>${r.end}</b>, in system ${r.sys} min.`;
      a = `الـ customer رقم ${r.c}: الـ digits بتوع الوصول ${r.ad} يدّوا <b>${r.ia}</b> دقايق من آخر وصول، فبيوصل عند <b>${r.arr}</b>، والـ service digits بتوعه ${r.sd} يدّوا <b>${r.s}</b> دقايق${r.fixed ? ' (الـ notes كاتبة 5، لكن حسب الـ Table 2.2 الرقم 79 يدّي 4 ‡)' : ''}. ${r.wait ? `الـ server مشغول لحد ${p.end}، فبيستنى <b>${r.wait}</b> دقايق.` : r.idle ? `الـ server كان فاضي من عند ${p.end}، يعني idle لمدة <b>${r.idle}</b> دقايق، والخدمة بتبدأ على طول.` : 'الـ server بيفضى في نفس اللحظة دي، فالخدمة بتبدأ على طول.'} وبيخلص عند <b>${r.end}</b>:` + L(`arrival = ${p.arr} + ${r.ia} = ${r.arr} ; begins = max(${r.arr}, ${p.end}) = ${r.beg} ; ends = ${r.beg} + ${r.s} = ${r.end}`);
    }
    const shown = end ? n : i + 1, inSys = r ? rows.slice(0, i + 1).filter(x => x.arr <= r.arr && x.end > r.arr) : [];
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${setM} />
      ${!ex && html`<div className="mf2-row"><label>Customers <input type="number" min="5" max="40" value=${cnt} onInput=${e => setCnt(e.target.value)} /></label><button className="fig-btn solid" onClick=${() => fresh(Math.max(5, Math.min(40, parseInt(cnt, 10) || 20)))}>New random digits</button></div>`}
      ${r && html`<div className="mf2-now">clock <b>${r.arr}</b> · in system ${inSys.map(x => html`<span key=${x.c} className=${'mf2-chip' + (x.beg <= r.arr ? ' srv' : '')}>${x.c}</span>`)}</div>`}
      <${Timeline} rows=${rows} upto=${shown} run=${end ? st.run : Math.max(rows[n - 1].end, 1)} at=${r ? r.arr : null} />
      <${Tbl} head=${['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']} cur=${end ? 'end' : i} rows=${rows.slice(0, shown).map(x => [x.c, x.ia == null ? '-' : x.ia, x.arr, x.fixed ? x.s + '‡' : x.s, x.beg, x.wait, x.end, x.sys, x.idle])}
        tot=${end ? ['Tot', '', '', st.S, '', st.W, '', st.T, st.I] : null} cellCls=${(k, j) => (k === i && (j === 5 && rows[k].wait) ? 'bad' : k === i && j === 8 && rows[k].idle ? 'bad' : '')} label="Grocery simulation table" />
      <p className="mf2-key"><b>A</b> customer · <b>B</b> time since last arrival · <b>C</b> arrival time · <b>D</b> service time · <b>E</b> service begins · <b>F</b> waits in queue · <b>G</b> service ends · <b>H</b> time in system · <b>I</b> idle time of server</p>
      ${end && html`<div className="mf2-stat">${statCards(st).map(([t, fr, v], k) => html`<div key=${k}>${t}<small>${fr}</small><b>${v}</b></div>`)}</div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${RunBar} n=${n + 1} i=${i} ctl=${ctl} label=${end ? 'statistics' : 'customer ' + (i + 1) + ' of ' + n} /></figure>`;
  }

  /* ── §20-21: Example 2.3, Able and Baker carhops ── */
  function AbleBaker({ ar }) {
    const [mode, setMode] = useState('ex'), [cnt, setCnt] = useState(26), [dig, setDig] = useState(null);
    const ex = mode === 'ex', rows = ex || !dig ? ableBaker(AB_AD, AB_SD) : ableBaker(dig.a, dig.s), n = rows.length;
    const [i, ctl] = useRun(n + 1, 2000), end = i >= n, r = end ? null : rows[i];
    const fresh = c => { const a = [null], s = []; for (let k = 0; k < c; k++) { if (k) a.push(rdig(2)); s.push(rdig(2)); } setDig({ a, s }); ctl.go(c); };
    const setM = m => { setMode(m); if (m === 'try') fresh(cnt); else ctl.replay(); };
    const run = Math.max(...rows.map(x => x.end)), As = sum(rows.filter(x => x.who === 'A'), x => x.s), Bs = sum(rows.filter(x => x.who === 'B'), x => x.s), Wt = sum(rows, x => x.wait), nw = rows.filter(x => x.wait > 0).length;
    let en, a;
    if (end) { en = `Over the <b>${run}-minute</b> period: Able busy ${As}/${run} = <b>${Math.round(As / run * 100)}%</b>, Baker ${Bs}/${run} = <b>${Math.round(Bs / run * 100)}%</b>. Average wait of all ${n} = ${Wt}/${n} = <b>${f2(Wt / n)} min</b>; <b>${nw}</b> waited, on average ${nw ? Wt + '/' + nw + ' = <b>' + f2(Wt / nw) + ' min</b>' : '0'}.${ex ? ' The notes: well balanced; one server cannot handle all the customers and three would probably be too many.' : ''}`;
      a = `على مدار <b>${run}</b> دقيقة، دي نسب الشغل والانتظار:` + L(`Able ${As}/${run} = ${Math.round(As / run * 100)}% ; Baker ${Bs}/${run} = ${Math.round(Bs / run * 100)}%<br>average wait ${Wt}/${n} = ${f2(Wt / n)} min ; ${nw} waited${nw ? ' → ' + Wt + '/' + nw + ' = ' + f2(Wt / nw) + ' min' : ''}`) + (ex ? 'والـ notes بتقول إن الـ system متوازن: server واحد مش هيقدر على كل الـ customers، وتلاتة غالبًا كتير.' : ''); }
    else {
      const st = r.fa <= r.arr && r.fb <= r.arr ? ['both carhops are idle, so <b>Able</b> takes it (seniority)', 'الاتنين فاضيين، فالـ <b>Able</b> ياخده (الأقدمية)']
        : r.fa <= r.arr ? ['Able is idle (Baker busy until ' + r.fb + '), so <b>Able</b> serves', 'الـ Able فاضي والـ Baker مشغول، فالـ <b>Able</b> يخدم']
        : r.fb <= r.arr ? ['Able is busy until ' + r.fa + ' and Baker is idle, so <b>Baker</b> serves', 'الـ Able مشغول لحد ' + r.fa + ' والـ Baker فاضي، فالـ <b>Baker</b> يخدم']
        : r.fa === r.fb ? ['both are busy until ' + r.fa + '; on the tie <b>Able</b> takes it', 'الاتنين مشغولين لحد ' + r.fa + '، وعند التعادل الـ <b>Able</b> ياخده']
        : ['both are busy (Able until ' + r.fa + ', Baker until ' + r.fb + '); the car waits for the first free: <b>' + (r.who === 'A' ? 'Able' : 'Baker') + '</b>', 'الاتنين مشغولين، والعربية بتستنى أول واحد يفضى، وهو الـ <b>' + (r.who === 'A' ? 'Able' : 'Baker') + '</b>'];
      en = `Car ${r.c}: ${i ? `digits ${r.ad} → ${r.ia} min, arrives at <b>${r.arr}</b>` : 'arrives at <b>0</b>'}; ${st[0]}. Service digits ${r.sd} in ${r.who === 'A' ? 'Able\'s table' : 'Baker\'s table'} → <b>${r.s} min</b>: ${r.beg} to <b>${r.end}</b>${r.wait ? `, waits <b>${r.wait}</b>` : ''}.`;
      a = `العربية رقم ${r.c} بتوصل عند <b>${r.arr}</b>، و${st[1]}. الـ service digits بتوعها ${r.sd} بنقراهم في جدول الـ ${r.who === 'A' ? 'Able' : 'Baker'} فيدّوا <b>${r.s}</b> دقايق${r.wait ? `، والعربية بتستنى <b>${r.wait}</b>` : ''}:` + L(`${i ? `${r.ad} → ${r.ia} min ; ` : ''}${r.sd} → ${r.s} min ; ${r.beg} → ${r.end}`);
    }
    const shown = end ? n : i + 1, Xs = t => 58 + t * 230 / Math.max(run, 1);
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${setM} />
      ${!ex && html`<div className="mf2-row"><label>Cars <input type="number" min="5" max="40" value=${cnt} onInput=${e => setCnt(e.target.value)} /></label><button className="fig-btn solid" onClick=${() => fresh(Math.max(5, Math.min(40, parseInt(cnt, 10) || 26)))}>New random digits</button></div>`}
      <svg className="mf2-svg" viewBox="0 0 300 92" role="img" aria-label="Able and Baker busy periods">
        ${[['Able', 'A', 6], ['Baker', 'B', 38]].map(([nm, w, y]) => html`<g key=${w}><text x="2" y=${y + 18} fontSize="15">${nm}</text><rect className="lane" x="58" y=${y} width="230" height="26" />
          ${rows.slice(0, shown).filter(x => x.who === w).map(x => html`<rect key=${x.c} className=${w === 'A' ? 'busy' : 'busyB'} x=${Xs(x.beg)} y=${y} width=${Math.max(.5, Xs(x.end) - Xs(x.beg))} height="26" />`)}</g>`)}
        ${r && html`<line className="now" x1=${Xs(r.arr)} x2=${Xs(r.arr)} y1="2" y2="68" />`}
        ${[0, 20, 40, 60].filter(t => t <= run).map(t => html`<text key=${t} x=${Xs(t)} y="86" textAnchor="middle" fontSize="15" className="mu">${t}</text>`)}</svg>
      <${Tbl} head=${['Car', 'Arr', 'Who', 'Beg', 'Svc', 'End', 'Wait']} cur=${end ? 'end' : i} rows=${rows.slice(0, shown).map(x => [x.c, x.arr, x.who === 'A' ? 'Able' : 'Baker', x.beg, x.s, x.end, x.wait])}
        tot=${end ? ['Tot', '', '', '', `${As}+${Bs}`, '', Wt] : null} cellCls=${(k, j) => (j === 6 && rows[k].wait ? 'bad' : j === 2 && rows[k].who === 'A' ? 'hot' : '')} label="Able Baker simulation table" />
      <p className="mf2-key"><b>Arr</b> clock time of arrival · <b>Beg</b>/<b>End</b> service begins/ends · <b>Svc</b> service time · <b>Wait</b> time in queue</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${RunBar} n=${n + 1} i=${i} ctl=${ctl} label=${end ? 'analysis' : 'car ' + (i + 1) + ' of ' + n} /></figure>`;
  }

  /* ── §22: the (M, N) inventory chart (slide 19, notes Fig 2.9) drawn period by period ── */
  function MnChart({ ar }) {
    // shape traced from the slide: start below M, three review periods of length N, Q1-Q3 restore the level to M
    const X0 = 40, N = 72, Mv = 34, Z = 136, X = k => X0 + 20 + k * N;
    const seg = [`M${X0 + 8} 74 L${X(0)} 84 L${X(0)} ${Mv}`, `L${X(1)} 112 L${X(1)} ${Mv}`, `L${X(2)} ${Z + 10} L${X(2)} ${Mv}`, `L${X(3)} 70 L${X(3)} ${Mv} L${X(3) + 22} 56`];
    const steps = [
      { en: 'Slide 19: amount in inventory <b>I</b> against time <b>T</b>. The dashed line is the standard inventory level <b>M</b>; reviews come every <b>N</b> time units.', ar: 'الـ slide 19: الـ amount in inventory <b>I</b> مع الزمن <b>T</b>. الخط المتقطع هو الـ standard inventory level <b>M</b>، والـ review بتيجي كل <b>N</b> وحدة زمن.' },
      { en: 'Demand lowers the level during the period. At the review an order is placed to bring the inventory <b>up to M</b>.', ar: 'الـ demand بيقلل المستوى طول الفترة، وعند الـ review بنطلب order يرجّع الـ inventory <b>لحد M</b>.' },
      { en: 'First period: the level falls, then order <b>Q₁</b> (the quantity to fill up to M) brings it back to M.', ar: 'في أول فترة المستوى بيقل، وبعدين الـ order <b>Q₁</b> (الكمية اللي تكمّل لحد M) بترجّعه لـ M.' },
      { en: 'Second period: demand is high and the level falls <b>below zero</b>, a <b>shortage</b>. Units short are backordered; <b>Q₂</b> fills them first and restores M.', ar: 'في تاني فترة الـ demand عالي والمستوى بينزل <b>تحت الصفر</b>، وده <b>shortage</b>. الـ units الناقصة بتبقى backorder، والـ <b>Q₂</b> بتغطيها الأول وترجّع المستوى لـ M.' },
      { en: 'Third period: a smaller drop, a smaller <b>Q₃</b>. Each Qᵢ differs because demand is random; total cost depends on M and N.', ar: 'في تالت فترة النزول أقل، فالـ <b>Q₃</b> أصغر. كل Qᵢ مختلفة لأن الـ demand عشوائي، والـ total cost بيتأثر بالـ M والـ N.' },
      { en: 'Events: <b>demand</b>, <b>review</b> of the inventory, <b>receipt of an order</b> at the end of each review; with zero lead time the last two happen at the same moment (the vertical jumps).', ar: 'الـ events هي الـ <b>demand</b> والـ <b>review</b> والـ <b>receipt of an order</b> في آخر كل review. ولو الـ lead time صفر، آخر اتنين بيحصلوا في نفس اللحظة، وده اللي بيعمل الطلعات الرأسية في الرسمة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), k = i < 2 ? 1 : i >= 4 ? 4 : i;
    const Q = [['Q₁', X(1) + 6, 100], ['Q₂', X(2) + 6, 100], ['Q₃', X(3) + 6, 82]];
    return html`<figure className="fig mf2"><div className="fig-stage">
      <svg className="mf2-svg" viewBox="0 0 300 196" role="img" aria-label="Inventory level against time with reviews every N">
        <line className="ax" x1=${X0} x2=${X0} y1="8" y2=${Z} /><line className="ax" x1=${X0} x2="292" y1=${Z} y2=${Z} />
        <text x=${X0 - 6} y="20" textAnchor="end" fontSize="15">I</text><text x="290" y=${Z - 6} textAnchor="end" fontSize="15">T</text>
        <line className="dash" x1=${X0} x2="292" y1=${Mv} y2=${Mv} /><text x=${X0 - 6} y=${Mv + 5} textAnchor="end" fontSize="15" className="k">M</text>
        ${[0, 1, 2, 3].map(j => html`<line key=${j} className="gr" x1=${X(j)} x2=${X(j)} y1=${Mv} y2=${Z + 22} strokeDasharray="4 4" />`)}
        <path d=${seg.slice(0, k).join(' ')} className="ln" />
        ${Q.slice(0, k - 1).map(([t, x, y]) => html`<text key=${t} x=${x} y=${y} fontSize="15" className="k">${t}</text>`)}
        ${k >= 3 && html`<text x=${X(2) - 6} y=${Z + 2} textAnchor="end" fontSize="15" className=${'p ' + pop(i >= 3)}>shortage</text>`}
        ${[0, 1, 2].map(j => html`<g key=${j} className=${pop(i >= 1)}><text x=${X(j) + N / 2} y=${Z + 22} textAnchor="middle" fontSize="15">N</text><path d=${`M${X(j) + 3} ${Z + 17} H${X(j) + N / 2 - 10} M${X(j) + N / 2 + 10} ${Z + 17} H${X(j + 1) - 3}`} className="ax" /></g>`)}
        <text x="166" y="190" textAnchor="middle" fontSize="15" className="mu">Time</text>
      </svg></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §23-25: Example 2.4, the newspaper seller, day by day, and other policies ── */
  function News({ ar }) {
    const [mode, setMode] = useState('ex'), [Q, setQ] = useState(70), [dig, setDig] = useState(null);
    const ex = mode === 'ex', td = ex || !dig ? N_TD : dig.t, dd = ex || !dig ? N_DD : dig.d, q = ex ? 70 : Q;
    const rows = news(td, dd, q), tot = { rev: sum(rows, r => r.rev), lost: sum(rows, r => r.lost), salv: sum(rows, r => r.salv), p: sum(rows, r => r.profit) };
    const [i, ctl] = useRun(21, 2000), end = i >= 20, r = end ? null : rows[i];
    const pol = [40, 50, 60, 70, 80, 90, 100].map(x => [x, sum(news(td, dd, x), r => r.profit)]), best = pol.reduce((m, x) => (x[1] > m[1] ? x : m));
    const fresh = () => { const t = [], d = []; for (let k = 0; k < 20; k++) { t.push(rdig(2)); d.push(rdig(2)); } setDig({ t, d }); };
    let en, a;
    if (ex && !end) {
      const tl = r.type === 'Good' ? '01–35' : r.type === 'Fair' ? '36–80' : '81–00';
      en = `Day ${r.day}: type digits <b>${r.td}</b> ∈ ${tl} → <b>${r.type}</b>; demand digits <b>${r.dd}</b> in the ${r.type} column → demand <b>${r.D}</b>. Profit = ${usd(r.rev)} − 23.10 − ${usd(r.lost)} + ${usd(r.salv)} = <b>$${usd(r.profit)}</b>${r.lost ? ` (${r.D - 70} papers short × $0.17)` : r.salv ? ` (${70 - r.D} scrap × $0.05)` : ''}.`;
      a = `اليوم رقم ${r.day}: الـ type digits بتوعه ${r.td} يدّوا يوم <b>${r.type}</b>، والـ demand digits ${r.dd} في عمود الـ ${r.type} يدّوا demand قدره <b>${r.D}</b>. والـ profit بيطلع كده:` + L(`${r.td} ∈ ${tl} → ${r.type} ; ${r.dd} → ${r.D}<br>profit = ${usd(r.rev)} − 23.10 − ${usd(r.lost)} + ${usd(r.salv)} = $${usd(r.profit)}`);
    } else if (ex) { en = 'Policy <b>70</b> papers a day: total = $645.00 − $462.00 − $13.60 + $5.50 = <b>$174.90</b> for 20 days. The bars repeat the same 20 days for the other policies (computed with the same random digits): with these digits 70 is the best.'; a = 'الـ policy إننا نشتري <b>70</b> جرنال في اليوم بتدّي total على 20 يوم قدره <bdi dir="ltr">$174.90</bdi>:' + L('645.00 − 462.00 − 13.60 + 5.50 = $174.90') + 'والـ bars بتعيد نفس الـ 20 يوم مع policies تانية بنفس الـ random digits، وبالأرقام دي الـ 70 هي الأحسن.'; }
    else { en = `Buy <b>${q}</b> papers a day (cost ${q} × $0.33 = $${usd(33 * q)}): total profit for 20 days = <b>$${usd(tot.p)}</b>. Best policy for these digits: <b>${best[0]}</b> ($${usd(best[1])}). Change the policy or draw new digits.`; a = `لو اشترينا <b>${q}</b> جرنال في اليوم، الـ total profit على 20 يوم بيطلع <b><bdi dir="ltr">$${usd(tot.p)}</bdi></b>. وأحسن policy بالـ digits دي هي <b>${best[0]}</b>. غيّر الـ policy أو هات digits جديدة.`; }
    const mx = Math.max(...pol.map(x => Math.abs(x[1])), 1);
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try other policies']]} mode=${mode} set=${m => { setMode(m); if (m === 'ex') ctl.replay(); else ctl.go(20); }} />
      ${!ex && html`<div className="mf2-row"><label>Papers bought <select value=${Q} onChange=${e => setQ(+e.target.value)}>${[40, 50, 60, 70, 80, 90, 100].map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select></label><button className="fig-btn solid" onClick=${fresh}>New random digits</button>${dig && html`<button className="fig-btn" onClick=${() => setDig(null)}>Notes' digits</button>`}</div>`}
      ${r && html`<div className="mf2-now">day <b>${r.day}</b> · <span className="mf2-tag busy">${r.type}</span> · demand <b>${r.D}</b> · profit <b>$${usd(r.profit)}</b></div>`}
      <${Tbl} head=${['Day', 'Type', 'Dem.', 'Revenue', 'Lost profit', 'Salvage', 'Daily profit']} cur=${end ? 'end' : i} rows=${rows.slice(0, end ? 20 : i + 1).map(x => [x.day, x.type, x.D, usd(x.rev), x.lost ? usd(x.lost) : '-', x.salv ? usd(x.salv) : '-', usd(x.profit)])}
        tot=${end ? ['Tot', '', '', usd(tot.rev), usd(tot.lost), usd(tot.salv), usd(tot.p)] : null} cellCls=${(k, j) => (j === 4 && rows[k].lost ? 'bad' : j === 6 ? 'hot' : '')} label="Newspaper seller simulation table" />
      <p className="mf2-key">Buy at <b>$0.33</b>, sell at <b>$0.50</b>, scrap <b>$0.05</b>, lost profit <b>$0.17</b> per paper short · cost ${q} × 0.33 = <b>$${usd(33 * q)}</b> a day</p>
      ${end && html`<div style=${{ maxWidth: '420px', margin: '8px auto 0' }}><p className="mf2-h4">Total profit for 20 days by policy</p>${pol.map(([x, v]) => html`<div key=${x} className=${'mf2-hb' + (x === q ? ' on' : '')}><span>${x}</span><span><i className=${x === best[0] ? '' : 'lo'} style=${{ width: Math.max(0, v) / mx * 100 + '%' }}></i></span><span>${usd(v)}</span></div>`)}</div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${RunBar} n=${21} i=${i} ctl=${ctl} label=${end ? 'totals' : 'day ' + (i + 1) + ' of 20'} /></figure>`;
  }

  /* ── §26-27: Example 2.5, the (M, N) inventory simulation, day by day ── */
  function MnSim({ ar }) {
    const [mode, setMode] = useState('ex'), [M, setM] = useState(11), [Nn, setNn] = useState(5), [dig, setDig] = useState(null);
    const ex = mode === 'ex', mm = ex ? 11 : M, nn = ex ? 5 : Nn;
    const rows = ex || !dig ? mnRun(MN_DD, MN_LD, 11, 5, 3, 8, 3) : mnRun(dig.d, dig.l, mm, nn, 3, 8, 3), n = rows.length;
    const [i, ctl] = useRun(n + 1, 1700), end = i >= n, r = end ? null : rows[i];
    const fresh = (m2, n2) => { const d = [], l = []; for (let k = 0; k < 5 * n2; k++) d.push(rdig(2)); for (let k = 0; k < 5; k++) l.push(rdig(1)); setDig({ d, l }); ctl.go(5 * n2); };
    const endSum = sum(rows, x => x.end), shortDays = rows.filter(x => x.short > 0).length;
    let en, a;
    if (end) { en = `${ex ? 'Table 2.16 complete. ' : ''}Average ending inventory = ${endSum} / ${n} ≈ <b>${(endSum / n).toFixed(1)} units</b>; a shortage existed on <b>${shortDays} of ${n}</b> days. Many more cycles (and other M, N) are needed for a good estimate.`; a = (ex ? 'كده الـ Table 2.16 كمل. ' : '') + `متوسط الـ ending inventory حوالي <b>${(endSum / n).toFixed(1)}</b> وحدة، وكان فيه shortage في <b>${shortDays}</b> أيام من ${n}:` + L(`${endSum} / ${n} ≈ ${(endSum / n).toFixed(1)}`) + 'ومحتاجين cycles أكتر بكتير (و M و N تانيين) عشان تقدير كويس.'; }
    else {
      const parts = [], pa = [];
      if (r.got) { parts.push(`the order of <b>${r.got}</b> arrives this morning, so beginning inventory is <b>${r.beg}</b>`); pa.push(`الـ order بتاع <b>${r.got}</b> وصل الصبح فالـ beginning inventory بقى <b>${r.beg}</b>`); }
      parts.push(`demand digits ${r.dd} → <b>${r.d}</b>`); pa.push(`الـ demand digits ${r.dd} يدّوا <b>${r.d}</b>`);
      if (r.short) { parts.push(`not enough stock: shortage <b>${r.short}</b> (backordered)`); pa.push(`المخزون مش كفاية، فالـ shortage بقى <b>${r.short}</b> وبيتسجل backorder`); }
      else if (r.got && i > 0 && rows[i - 1].short) { parts.push(`the ${rows[i - 1].short} backordered units are filled first: ${r.beg} − ${rows[i - 1].short} − ${r.d} = <b>${r.end}</b>`); pa.push(`الـ ${rows[i - 1].short} units اللي كانوا backorder بيتغطوا الأول، فالباقي <b>${r.end}</b>`); }
      else { parts.push(`ending inventory <b>${r.end}</b>`); pa.push(`الـ ending inventory بقى <b>${r.end}</b>`); }
      if (r.q != null) { parts.push(`end of cycle ${r.cyc}: order ${mm} − ${r.end}${r.short ? ' + ' + r.short : ''} = <b>${r.q}</b>; lead-time digit ${r.ld} → <b>${r.L}</b> day(s)`); pa.push(`وده آخر الـ cycle، فبنطلب <b>${r.q}</b> والـ lead time بيطلع <b>${r.L}</b> يوم`); }
      en = `Cycle ${r.cyc}, day ${r.day}: ` + parts.join('; ') + '.';
      a = `الـ cycle رقم ${r.cyc}، اليوم رقم ${r.day}: ` + pa.join('، و') + '.' + (r.q != null ? L(`Q = ${mm} − ${r.end}${r.short ? ' + ' + r.short : ''} = ${r.q} ; digit ${r.ld} → L = ${r.L}`) : '');
    }
    const shown = end ? n : i + 1, top = Math.max(mm, ...rows.map(x => x.beg)), low = Math.max(4, ...rows.map(x => x.short));
    const bw = 270 / n, Y = v => 10 + (top - v) * 96 / (top + low);
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${m => { setMode(m); if (m === 'try') fresh(M, Nn); else ctl.replay(); }} />
      ${!ex && html`<div className="mf2-row"><label>M <input type="number" min="5" max="20" value=${M} onInput=${e => setM(+e.target.value || 11)} /></label><label>N <input type="number" min="3" max="7" value=${Nn} onInput=${e => { const v = Math.max(3, Math.min(7, +e.target.value || 5)); setNn(v); fresh(M, v); }} /></label><button className="fig-btn solid" onClick=${() => fresh(M, Nn)}>New random digits</button></div>`}
      <svg className="mf2-svg" viewBox="0 0 300 132" role="img" aria-label="Ending inventory (bars up) and shortage (bars down) each day">
        <line className="dash" x1="22" x2="292" y1=${Y(mm)} y2=${Y(mm)} /><text x="18" y=${Y(mm) + 5} textAnchor="end" fontSize="15" className="k">M</text>
        <line className="ax" x1="22" x2="292" y1=${Y(0)} y2=${Y(0)} /><text x="18" y=${Y(0) + 5} textAnchor="end" fontSize="15" className="mu">0</text>
        ${rows.slice(0, shown).map((x, k) => html`<g key=${k}>${x.end > 0 && html`<rect className="busy" x=${22 + k * bw + 1} y=${Y(x.end)} width=${bw - 2} height=${Y(0) - Y(x.end)} />`}
          ${x.short > 0 && html`<rect x=${22 + k * bw + 1} y=${Y(0)} width=${bw - 2} height=${Y(-x.short) - Y(0)} fill="var(--pen)" />`}
          ${x.got > 0 && html`<text x=${22 + k * bw + bw / 2} y=${Y(top) + 2} textAnchor="middle" fontSize="15" className="k">▼</text>`}</g>`)}
        ${[1, 2, 3, 4].map(c => html`<line key=${c} className="gr" x1=${22 + c * nn * bw} x2=${22 + c * nn * bw} y1="4" y2="112" strokeDasharray="3 4" />`)}
        ${[1, 2, 3, 4, 5].map(c => html`<text key=${c} x=${22 + (c - .5) * nn * bw} y="128" textAnchor="middle" fontSize="15" className="mu">cycle ${c}</text>`)}
      </svg>
      <${Tbl} head=${['Cyc · day', 'Beg.', 'Dem.', 'End', 'Short', 'Order', 'Lead', 'Due in']} cur=${end ? 'end' : i} rowCls=${k => (k > 0 && rows[k].day === 1 ? 'cyc' : '')}
        rows=${rows.slice(0, shown).map(x => [x.cyc + ' · ' + x.day, x.beg, x.d, x.end, x.short, x.q == null ? '-' : x.q, x.L == null ? '-' : x.L, x.until == null ? '-' : x.until])}
        tot=${end ? ['Tot', '', '', endSum, '', '', '', ''] : null} cellCls=${(k, j) => (j === 4 && rows[k].short ? 'bad' : j === 1 && rows[k].got ? 'hot' : j === 5 && rows[k].q != null ? 'hot' : '')} label="(M, N) inventory simulation table" />
      <p className="mf2-key"><b>M = ${mm}</b>, <b>N = ${nn}</b> days; starts with 3 units and 8 due in 2 days · <b>Lead</b> days of lead time · <b>Due in</b> days until the order arrives · ▼ order received</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${RunBar} n=${n + 1} i=${i} ctl=${ctl} label=${end ? 'summary' : 'day ' + (i + 1) + ' of ' + n} /></figure>`;
  }

  /* ── §30-31: lead time and daily demand from a random number R (intervals include their lower end) ── */
  function RLookup({ ar }) {
    const [m, setM] = useState('d'), [R, setR] = useState('0.866');
    const T = m === 'd' ? { t: DM_R, lab: 'Daily demand', u: 'unit(s)', ex: ['0.093', '0.866', '0.975'] } : { t: LT_R, lab: 'Lead time', u: 'day(s)', ex: ['0.620', '0.939'] };
    const x = parseFloat(R), ok = x >= 0 && x < 1, v = ok ? rlook(x, T.t) : null, k = ok ? T.t.findIndex(r => r[2] === v) : -1;
    const iv = r => `${r[0].toFixed(2)} to ${(r[1] - .00001).toFixed(5)}`;
    const cap = !ok ? { en: 'Type R from 0 to 0.99999.', ar: 'اكتب R من صفر لحد 0.99999.' } : { en: `R = <b>${R}</b> lies in ${iv(T.t[k])} → <b>${v} ${T.u}</b>. Each interval includes its <b>lower end</b>: R = ${T.t[1][0].toFixed(2)} already gives ${T.t[1][2]}.`, ar: `الـ R ده واقع في المدى ده، فالقيمة <b>${v}</b>:` + L(`R = ${R} ∈ [${T.t[k][0].toFixed(2)}, ${T.t[k][1].toFixed(2)}) → ${v}`) + `وكل interval بيشمل <b>الطرف الأصغر</b> بتاعه، يعني لو الـ R بالظبط ${T.t[1][0].toFixed(2)} يدّي ${T.t[1][2]}.` };
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['d', 'Daily demand (slide 6)'], ['l', 'Lead time (slide 5)']]} mode=${m} set=${y => { setM(y); setR(y === 'd' ? '0.866' : '0.620'); }} />
      <div className="mf2-row"><label>R <input value=${R} inputMode="decimal" onInput=${e => setR(e.target.value)} aria-label="Random number R" style=${{ width: '5.4em' }} /></label>
        ${T.ex.map(e => html`<button key=${e} className="fig-btn" aria-pressed=${String(R === e)} onClick=${() => setR(e)}>${e}</button>`)}<button className="fig-btn solid" onClick=${() => setR((Math.floor(Math.random() * 1000) / 1000).toFixed(3))}>New R</button></div>
      <div style=${{ position: 'relative', maxWidth: '440px', margin: '0 auto 40px', display: 'flex', height: '40px', border: '1.5px solid var(--graphite)', borderRadius: '4px' }}>
        ${T.t.map((r, j) => html`<div key=${j} style=${{ width: (r[1] - r[0]) * 100 + '%', borderLeft: j ? '1.5px solid var(--graphite)' : 0, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '.9rem', color: 'var(--ink)', background: j === k ? 'color-mix(in srgb, var(--k-ms) 30%, var(--paper))' : 'var(--paper)', transition: 'background .3s' }}>${r[2]}</div>`)}
        ${[0, ...T.t.map(r => r[1]).slice(0, -1)].map((c, j) => html`<span key=${'c' + j} style=${{ position: 'absolute', top: j % 2 ? '58px' : '42px', left: c * 100 + '%', transform: 'translateX(' + (c === 0 ? '0' : c === 1 ? '-100%' : '-50%') + ')', fontSize: '.76rem', color: 'var(--graphite)', fontFamily: 'var(--mono)' }}>${c === 0 ? '0' : c === 1 ? '1' : c.toFixed(c * 100 % 10 ? 2 : 1)}</span>`)}
        ${ok && html`<span style=${{ position: 'absolute', top: '-12px', left: x * 100 + '%', transform: 'translateX(-50%)', color: 'var(--pen)', fontSize: '.9rem', lineHeight: 1 }}>▼</span>`}</div>
      <p className="mf2-now">${T.lab}: <b>${ok ? v + ' ' + T.u : '?'}</b></p>
      <${Tbl} head=${[T.lab, 'Cumulative', 'R interval']} cur=${k} rows=${T.t.map(r => [r[2], r[1].toFixed(2), iv(r)])} label="Random-number intervals" />
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §32: the daily simulation process (inventory slide 8) walked for one day of the 10-day example ── */
  const IRUN = invRun(I_R1, I_R2, 5, 5, 3);
  function InvFlow({ ar }) {
    const [d, setD] = useState(4);
    const r = IRUN[d - 1], Ia = r.beg + r.rc;
    const P = [['beg', 'Begin Day', `I = ${r.beg}`]];
    P.push(['arr', 'Any arrivals?', r.rc ? 'Yes' : 'No']); if (r.rc) P.push(['upd', 'Update inventory I = I + x', `I = ${r.beg} + 5 = ${Ia}`]);
    P.push(['gen', 'Generate daily demand d', `R = ${r.R.toFixed(3)} → d = ${r.d}`]); P.push(['sat', 'Can inventory satisfy demand (I ≥ d)?', `${Ia} ≥ ${r.d}? ${r.ok ? 'Yes' : 'No'}`]);
    if (r.ok) P.push(['sub', 'Update inventory I = I − d', `I = ${Ia} − ${r.d} = ${r.end}`]); else { P.push(['sc', 'Compute shortage cost $50 (d − I)', `50 × (${r.d} − ${Ia}) = $${usd(r.sc)}`]); P.push(['z', 'Update inventory I = 0', 'I = 0']); }
    P.push(['rop', 'Has reorder point been reached (I ≤ r)?', `${r.end} ≤ 3? ${r.hit ? 'Yes' : 'No'}`]);
    if (r.hit) { P.push(['out', 'Is an order currently outstanding?', r.busy ? 'Yes' : 'No']); if (!r.busy) { P.push(['ord', 'Place an order (cost = $20)', '$20.00']); P.push(['lt', 'Generate lead time L', `R = ${r.R2.toFixed(3)} → L = ${r.L}`]); } }
    P.push(['hc', 'Compute holding cost (0.10)(I)', `0.10 × ${r.end} = $${usd(r.hc)}`]); P.push(['tc', 'Compute total daily cost', `$${usd(r.tc)}`]);
    const [i, ctl] = useRun(P.length, 1100);
    useEffect(() => { ctl.replay(); }, [d]);
    const ALL = [['beg', 'Begin Day'], ['arr', 'Any arrivals?', 1], ['upd', 'Update inventory I = I + x', 0, 'Yes'], ['gen', 'Generate daily demand d'], ['sat', 'Can inventory satisfy demand (I ≥ d)?', 1], ['sc', 'Compute shortage cost $50 (d − I)', 0, 'No'], ['z', 'Update inventory I = 0', 0, 'No'], ['sub', 'Update inventory I = I − d', 0, 'Yes'], ['rop', 'Has reorder point been reached (I ≤ r)?', 1], ['out', 'Is an order currently outstanding?', 1, 'Yes'], ['ord', 'Place an order (cost = $20)', 0, 'No'], ['lt', 'Generate lead time L', 0, 'No'], ['hc', 'Compute holding cost (0.10)(I)'], ['tc', 'Compute total daily cost']];
    const seen = P.slice(0, i + 1), at = id => seen.find(p => p[0] === id), cur = P[i][0];
    const en = `Day ${d} of the 10-day example (I₀ = 5, x = 5, r = 3): ` + seen.map(p => `${p[1]} <b>${p[2]}</b>`).slice(-1)[0] + (i === P.length - 1 ? `. Day ${d}: holding $${usd(r.hc)}, order $${usd(r.oc)}, shortage $${usd(r.sc)}.` : '');
    const a = `اليوم رقم ${d} من مثال الـ 10 أيام، والخطوة الحالية في الـ flowchart:` + L(`${P[i][1]} → ${P[i][2]}`) + (i === P.length - 1 ? 'وتكاليف اليوم:' + L(`holding $${usd(r.hc)}, order $${usd(r.oc)}, shortage $${usd(r.sc)}`) : '');
    return html`<figure className="fig mf2"><div className="fig-stage">
      <div className="mf2-modes" role="group" aria-label="Day">${IRUN.map(x => html`<button key=${x.day} className="fig-btn" style=${{ minWidth: '2.4em', padding: '4px 6px' }} aria-pressed=${String(d === x.day)} onClick=${() => setD(x.day)}>${x.day}</button>`)}</div>
      <div className="mf2-col" style=${{ maxWidth: '440px', margin: '0 auto' }}>${ALL.map(([id, t, dia, br]) => { const p = at(id), skip = !P.some(q => q[0] === id);
        return html`<div key=${id} style=${{ marginLeft: br ? '18px' : 0, borderLeft: br ? '2px solid var(--line)' : 0, paddingLeft: br ? '6px' : 0 }}>
          ${br && html`<span className="mf2-lbl">if ${br}</span>`}
          <div className=${'mf2-box' + (dia ? ' dia' : '') + (cur === id ? ' on' : skip ? ' dim' : '')} style=${{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', opacity: skip ? .3 : p ? 1 : .55 }}>
            <span>${t}</span>${p && html`<b style=${{ color: 'var(--k-ms)', fontFamily: 'var(--mono)', fontSize: '.8rem' }}>${p[2]}</b>`}</div></div>`; })}</div>
      <p className="mf2-key">I = inventory level · x = order quantity · r = reorder point · d = daily demand</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${RunBar} n=${P.length} i=${i} ctl=${ctl} label=${'box ' + (i + 1) + ' of ' + P.length} /></figure>`;
  }

  /* ── §33: the 10-day (r = 3, x = 5) simulation and your own r, x ── */
  function Inv10({ ar }) {
    const [mode, setMode] = useState('ex'), [rx, setRx] = useState({ r: 3, x: 5, I0: 5 }), [rn, setRn] = useState(null);
    const ex = mode === 'ex', P = ex ? { r: 3, x: 5, I0: 5 } : rx;
    const rows = ex || !rn ? invRun(I_R1, I_R2, 5, 5, 3) : invRun(rn.a, rn.b, P.I0, P.x, P.r), n = rows.length;
    const [i, ctl] = useRun(n + 1, 2000), end = i >= n, r = end ? null : rows[i];
    const fresh = () => { const a = [], b = []; for (let k = 0; k < 10; k++) { a.push(Math.floor(Math.random() * 1000) / 1000); b.push(Math.floor(Math.random() * 1000) / 1000); } setRn({ a, b }); ctl.go(10); };
    const T = { h: sum(rows, x => x.hc), o: sum(rows, x => x.oc), s: sum(rows, x => x.sc), t: sum(rows, x => x.tc) };
    let en, a;
    if (end) { en = `Average cost for ${n} simulated days: holding ${usd(T.h)}/${n} = <b>${usd(T.h / n)}</b>, order ${usd(T.o)}/${n} = <b>${usd(T.o / n)}</b>, shortage ${usd(T.s)}/${n} = <b>${usd(T.s / n)}</b>, total <b>$${usd(T.t / n)}</b> per day.${ex ? ' (The slide prints the day 5 order cost as "000": it means 0.00.)' : ''}`; a = `متوسط التكلفة على ${n} أيام:` + L(`holding ${usd(T.h / n)} ; order ${usd(T.o / n)} ; shortage ${usd(T.s / n)} ; total $${usd(T.t / n)} / day`) + (ex ? 'والـ slide كاتبة الـ order cost في اليوم الخامس "000"، وتقصد 0.00.' : ''); }
    else {
      const bits = [`begins with ${r.beg}${r.rc ? ` and receives <b>${r.rc}</b>` : ''}`, `R = ${r.R.toFixed(3)} → demand <b>${r.d}</b>`, r.ok ? `I = <b>${r.end}</b>` : `only ${r.beg + r.rc} in stock: shortage ${r.d - r.beg - r.rc} × $50 = <b>$${usd(r.sc)}</b>, I = 0`,
        r.hit ? (r.busy ? `I ≤ r but an order is <b>outstanding</b>: no new order` : r.R2 != null ? `I ≤ r = ${P.r} and no order outstanding: <b>order</b> ($20), R = ${r.R2.toFixed(3)} → lead time <b>${r.L}</b> (arrives day ${r.day + r.L})` : 'I ≤ r') : `I &gt; r: no order`];
      en = `Day ${r.day}: ` + bits.join('; ') + `. Holding 0.10 × ${r.end} = ${usd(r.hc)}; total <b>${usd(r.tc)}</b>.`;
      a = `اليوم رقم ${r.day}: ` + (r.ok ? 'المخزون كفى الـ demand' : `المخزون مكفاش، فيه shortage تكلفته <b><bdi dir="ltr">$${usd(r.sc)}</bdi></b> والـ I بقى صفر`) + '، و' + (r.hit ? (r.busy ? 'وصلنا للـ reorder point لكن فيه order لسه مجاش، فمفيش order جديد' : 'وصلنا للـ reorder point ومفيش order معلّق، فبنطلب order بـ $20') : 'لسه موصلناش للـ reorder point') + ':' + L(`begin ${r.beg}${r.rc ? ' + ' + r.rc : ''} ; R = ${r.R.toFixed(3)} → d = ${r.d} ; I = ${r.end}${r.R2 != null ? ` ; R = ${r.R2.toFixed(3)} → L = ${r.L}` : ''} ; total = ${usd(r.tc)}`);
    }
    const shown = end ? n : i + 1, num = (k, lo, hi) => e => { const v = Math.max(lo, Math.min(hi, parseInt(e.target.value, 10) || 0)); setRx(o => ({ ...o, [k]: v })); };
    return html`<figure className="fig mf2"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${m => { setMode(m); if (m === 'try') fresh(); else ctl.replay(); }} />
      ${!ex && html`<div className="mf2-row"><label>r <input type="number" min="0" max="10" value=${rx.r} onInput=${num('r', 0, 10)} /></label><label>x <input type="number" min="1" max="20" value=${rx.x} onInput=${num('x', 1, 20)} /></label><label>I₀ <input type="number" min="0" max="20" value=${rx.I0} onInput=${num('I0', 0, 20)} /></label><button className="fig-btn solid" onClick=${fresh}>New random numbers</button></div>`}
      ${r && html`<div className="mf2-stat" style=${{ marginTop: 0, marginBottom: '8px' }}><div>Holding<b>${usd(r.hc)}</b></div><div className=${r.oc ? 'on' : ''}>Order<b>${usd(r.oc)}</b></div><div className=${r.sc ? 'on' : ''}>Shortage<b>${usd(r.sc)}</b></div><div>Total<b>${usd(r.tc)}</b></div></div>`}
      <${Tbl} head=${['Day', 'Beg.', 'Rcvd', 'R', 'd', 'End', 'L', 'Total cost']} cur=${end ? 'end' : i} rows=${rows.slice(0, shown).map(x => [x.day, x.beg, x.rc, x.R.toFixed(3), x.d, x.end, x.L == null ? '' : x.L, usd(x.tc)])}
        tot=${end ? ['Avg', '', '', '', '', '', '', usd(T.t / n)] : null} cellCls=${(k, j) => (j === 7 && rows[k].sc ? 'bad' : j === 6 && rows[k].L ? 'hot' : j === 2 && rows[k].rc ? 'hot' : '')} label="Inventory simulation for 10 days" />
      <p className="mf2-key"><b>r = ${P.r}</b>, <b>x = ${P.x}</b>, <b>I₀ = ${P.I0}</b> · holding $0.10 per unit per day · order $20 · shortage $50 per unit · <b>L</b> lead time (an order placed on day t arrives at the start of day t + L)</p>
      ${end && html`<div className="mf2-stat"><div>Holding<b>${usd(T.h / n)}</b></div><div>Order<b>${usd(T.o / n)}</b></div><div>Shortage<b>${usd(T.s / n)}</b></div><div className="on">Total / day<b>${usd(T.t / n)}</b></div></div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${RunBar} n=${n + 1} i=${i} ctl=${ctl} label=${end ? 'averages' : 'day ' + (i + 1) + ' of ' + n} /></figure>`;
  }

  /* ── §34-35: the simulator's average daily cost tables as heat maps ── */
  const C1 = { xs: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], rs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], mark: [5, 3], v: [[14.35, 8.30, 6.58, 5.20, 5.35, 4.16, 3.30, 4.42, 3.98, 5.22], [11.51, 5.93, 5.46, 3.92, 3.91, 3.44, 2.96, 3.69, 3.62, 3.71], [9.34, 5.64, 3.37, 3.01, 3.03, 2.84, 2.96, 3.29, 2.90, 3.07], [3.90, 4.12, 3.47, 2.78, 3.14, 2.79, 3.29, 3.25, 3.37, 3.42], [5.41, 3.31, 2.85, 2.42, 2.61, 3.24, 3.25, 2.93, 3.18, 3.22], [4.72, 2.75, 2.69, 2.10, 3.39, 2.74, 2.93, 3.06, 3.13, 3.34], [4.72, 2.85, 2.52, 2.60, 2.76, 2.71, 3.06, 2.99, 3.02, 3.28], [5.50, 2.89, 2.66, 2.50, 2.62, 2.75, 2.99, 3.05, 3.33, 3.56], [4.36, 3.11, 2.62, 2.62, 2.66, 2.77, 3.05, 3.18, 3.34, 3.49], [4.68, 3.05, 2.75, 2.72, 2.80, 2.58, 3.18, 3.28, 3.30, 3.72]] };
  const C2 = { xs: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], rs: [4, 5, 6, 7, 8], mark: [2, 1], v: [[2.94, 3.02, 3.13, 2.74, 2.89, 2.56, 2.74, 3.07, 2.67, 3.24], [2.59, 2.58, 2.84, 2.70, 2.66, 2.59, 2.88, 2.57, 2.48, 2.75], [2.55, 2.33, 2.87, 2.35, 2.75, 2.45, 2.81, 2.79, 2.61, 2.60], [2.52, 2.45, 2.47, 2.51, 2.57, 2.67, 2.61, 2.63, 2.32, 3.67], [2.50, 2.69, 2.48, 2.49, 2.63, 2.57, 2.63, 2.69, 2.69, 2.71]] };
  function CostGrid({ ar, D, fine }) {
    const flat = D.v.flat(), sorted = flat.slice().sort((a, b) => a - b), mn = sorted[0];
    const minAt = (() => { for (let k = 0; k < D.v.length; k++) { const j = D.v[k].indexOf(mn); if (j >= 0) return [k, j]; } })();
    const [sel, setSel] = useState(D.mark);
    const v = D.v[sel[0]][sel[1]], rk = sorted.indexOf(v) + 1, isMark = sel[0] === D.mark[0] && sel[1] === D.mark[1], isMin = sel[0] === minAt[0] && sel[1] === minAt[1];
    const shade = x => { const q = sorted.indexOf(x) / (sorted.length - 1); return `color-mix(in srgb, var(--k-ms) ${Math.round(75 - q * 70)}%, var(--paper))`; };
    const cap = { en: `r = <b>${D.rs[sel[0]]}</b>, x = <b>${D.xs[sel[1]]}</b>: average daily cost <b>$${v.toFixed(2)}</b> (rank ${rk} of ${flat.length}; darker = cheaper).` + (isMark ? (fine ? ' The slide marks this cell (2.33) as the best. ‡ The table also shows <b>2.32</b> at r = 7, x = 29, lower by the table\'s own numbers; the difference is within simulation noise.' : ' The slide highlights this cell: <b>r = 6, x = 20</b>, the smallest cost in the table. (The lecture notes print a different text value; follow the slide.)') : isMin && fine ? ' ‡ The smallest value in this table, though the slide marks 2.33.' : ' Tap another cell.'),
      ar: `الخانة دي متوسط تكلفتها اليومية <b><bdi dir="ltr">$${v.toFixed(2)}</bdi></b>، وترتيبها ${rk} من ${flat.length}، وكل ما اللون يغمق التكلفة تقل:` + L(`r = ${D.rs[sel[0]]}, x = ${D.xs[sel[1]]} → ${v.toFixed(2)}`) + (isMark ? (fine ? 'الـ slide معلّمة الخانة دي (2.33) على إنها الأحسن. ‡ لكن الجدول نفسه فيه <b>2.32</b> عند الخانة اللي r فيها 7 و x فيها 29، وهي أقل، والفرق صغير جدًا وجوه الـ simulation noise.' : 'الـ slide معلّمة الخانة دي على إنها الأحسن، وهي أقل تكلفة في الجدول. والـ lecture notes كاتبة رقم تاني في الكلام، فامشي على الـ slide.') : isMin && fine ? '‡ دي أقل قيمة في الجدول ده، مع إن الـ slide معلّمة 2.33.' : 'دوس على خانة تانية.') };
    return html`<figure className="fig mf2"><div className="fig-stage"><div style=${{ maxWidth: '460px', margin: '0 auto' }}>
      <p className="mf2-h4">${fine ? '1000 days, 21 ≤ x ≤ 30' : '1000 days, 5 ≤ x ≤ 50 and 1 ≤ r ≤ 10'}</p>
      <div role="grid" aria-label="Average daily cost by reorder level r and order quantity x" style=${{ display: 'grid', gridTemplateColumns: `1.7em repeat(${D.xs.length}, minmax(0, 1fr))`, gap: '2px', fontSize: '.76rem', textAlign: 'center' }}>
        <span className="mf2-lbl">r\\x</span>${D.xs.map(x => html`<span key=${x} className="mf2-lbl">${x}</span>`)}
        ${D.v.map((row, k) => html`<${React.Fragment} key=${k}><span className="mf2-lbl" style=${{ alignSelf: 'center' }}>${D.rs[k]}</span>${row.map((x, j) => { const s = sel[0] === k && sel[1] === j, mk = D.mark[0] === k && D.mark[1] === j, mi = fine && minAt[0] === k && minAt[1] === j;
          return html`<button key=${j} aria-label=${`r ${D.rs[k]}, x ${D.xs[j]}: ${x.toFixed(2)}`} onClick=${() => setSel([k, j])} style=${{ height: '22px', minWidth: 0, padding: 0, border: s ? '2.5px solid var(--pen)' : mk ? '2.5px solid var(--ink)' : mi ? '2.5px dashed var(--ink)' : '1px solid var(--line)', borderRadius: '3px', background: shade(x), cursor: 'pointer' }}></button>`; })}</${React.Fragment}>`)}</div>
      <p className="mf2-now" style=${{ marginTop: '8px' }}>r = <b>${D.rs[sel[0]]}</b> · x = <b>${D.xs[sel[1]]}</b> · cost <b>$${v.toFixed(2)}</b></p>
      <p className="mf2-key">solid outline: the slide's best cell${fine ? ' · dashed: the smallest value in the table' : ''}</p></div>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }
  const CostGrid1 = ({ ar }) => html`<${CostGrid} ar=${ar} D=${C1} fine=${false} />`;
  const CostGrid2 = ({ ar }) => html`<${CostGrid} ar=${ar} D=${C2} fine=${true} />`;

  /* ── §36: random numbers from the random-digit table (slide 22) ── */
  const RD = [['29602', '29464', '99219', '20308'], ['94135', '94661', '87724', '88187'], ['87926', '34092', '34334', '55064'], ['85039', '19212', '59160', '83537'], ['66070', '38480', '74636', '45095']];
  function RandDigits({ ar }) {
    const path = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3]];
    const steps = [
      { en: 'Slide 22: a table of random digits in groups of five. Select a number randomly, e.g. the boxed <b>99219</b>.', ar: 'الـ slide 22: جدول random digits متقسم مجموعات كل واحدة 5 أرقام. بنختار رقم عشوائي، زي <b>99219</b> اللي عليه مربع.', n: 0, d: 0 },
      { en: 'One digit: <b>0.9</b> (put a decimal point to the left of the digit).', ar: 'لو محتاجين رقم واحد: <b>0.9</b>، يعني بنحط العلامة العشرية على شمال الرقم.', n: 0, d: 1 },
      { en: 'Two digits: <b>0.19</b>.', ar: 'لو رقمين: <b>0.19</b>.', n: 0, d: 2 },
      { en: 'Three digits: <b>0.219</b>.', ar: 'لو تلاتة أرقام: <b>0.219</b>.', n: 0, d: 3 },
      { en: 'Then proceed in a <b>systematic direction</b>, e.g. <b>first down then right</b>: with three digits, 0.219, 0.724, 0.334, 0.160, 0.636 down the column…', ar: 'وبعدين نمشي في <b>اتجاه ثابت</b>، زي <b>تحت الأول وبعدين يمين</b>. بتلات أرقام بنمشي لتحت في نفس العمود:' + L('0.219, 0.724, 0.334, 0.160, 0.636'), n: 4, d: 3 },
      { en: '…then the next column to the right: 0.308, 0.187, 0.064, 0.537, 0.095. (Another direction, e.g. first up then left, works the same way.)', ar: 'وبعدين العمود اللي على اليمين:' + L('0.308, 0.187, 0.064, 0.537, 0.095') + 'وأي اتجاه تاني ثابت، زي فوق الأول وبعدين شمال، بيمشي بنفس الطريقة.', n: 9, d: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 2400), s = steps[i];
    const idx = (k, j) => path.findIndex(p => p[0] === k && p[1] === j);
    const nums = path.slice(0, s.n + 1).map(([k, j]) => '0.' + RD[k][j].slice(5 - s.d));
    return html`<figure className="fig mf2"><div className="fig-stage">
      <div style=${{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '4px 6px', maxWidth: '360px', margin: '0 auto', fontFamily: 'var(--mono)', fontSize: '.92rem', textAlign: 'center' }}>
        ${RD.map((row, k) => row.map((g, j) => { const p = idx(k, j), used = p >= 0 && p <= s.n, start = k === 0 && j === 2;
          return html`<span key=${k + '-' + j} style=${{ padding: '3px 0', borderRadius: '4px', border: start ? '2px solid var(--pen)' : '2px solid transparent', background: used && s.d ? 'color-mix(in srgb, var(--k-ms) 18%, var(--paper))' : 'transparent', color: 'var(--ink)' }}>${used && s.d ? html`<span style=${{ color: 'var(--graphite)' }}>${g.slice(0, 5 - s.d)}</span><b style=${{ color: 'var(--k-ms)' }}>${g.slice(5 - s.d)}</b>` : g}</span>`; }))}</div>
      <p className="mf2-now" style=${{ marginTop: '10px' }}>${s.d ? nums.map((x, k) => html`<span key=${k} className="mf2-tag busy" style=${{ fontFamily: 'var(--mono)' }}>${x}</span>`) : html`<span className="mf2-lbl">start: 99219</span>`}</p>
      </div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  if (window.MF2_TEST) window.MF2_TEST({ grocery, ableBaker, news, mnRun, invRun, queueRun, queueStats });
  window.FIGS = Object.assign(window.FIGS || {}, {
    'ms-simtable': SimTable, 'ms-queue-sys': QueueSys, 'ms-finite-pop': Finite, 'ms-warehouse': Warehouse, 'ms-notation': Notation, 'ms-ssq-state': Ssq,
    'ms-event-flows': Flows, 'ms-event-grids': Outcomes, 'ms-mesh6': Mesh, 'ms-chrono': Chrono, 'ms-grocery-dist': GroceryDist, 'ms-grocery-eq': GroceryEq,
    'ms-grocery-stats': GroceryStats, 'ms-wait-hist': Hist, 'ms-digit-lookup': Digits, 'ms-grocery20': Grocery20, 'ms-able-baker': AbleBaker, 'ms-mn-chart': MnChart,
    'ms-newspaper': News, 'ms-mn-sim': MnSim, 'ms-r-lookup': RLookup, 'ms-inv-flow': InvFlow, 'ms-inv10': Inv10, 'ms-cost-grid': CostGrid1, 'ms-cost-fine': CostGrid2, 'ms-rand-digits': RandDigits
  });
})();
/* ── part 3 ── */
// Modeling & Simulation visuals, part 3: L3 Statistical Models in Simulation. Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf3-row{ display:flex; flex-wrap:wrap; gap:6px 8px; justify-content:center; align-items:center; margin:0 0 8px; font-size:.88rem; color:var(--ink); }
.mf3-row .fig-btn{ font-size:.84rem; padding:4px 10px; }
.mf3 .fig-btn[aria-pressed="true"]{ border-color:var(--k-ms); background:color-mix(in srgb, var(--k-ms) 18%, var(--paper)); }
.mf3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf3-sl{ display:grid; grid-template-columns:auto minmax(0, 1fr) auto; gap:8px; align-items:center; font-size:.9rem; max-width:440px; margin:6px auto; color:var(--ink); }
.mf3-sl input{ width:100%; min-width:0; accent-color:var(--k-ms); }
.mf3-sl b{ font-family:var(--mono); font-size:.88rem; min-width:3.2em; text-align:right; }
.mf3-num{ display:inline-flex; gap:4px; align-items:center; font-size:.88rem; color:var(--ink); }
.mf3-num input{ width:4.6em; font:inherit; padding:3px 5px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.mf3-sel{ font:inherit; font-size:.86rem; padding:3px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.mf3-res{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:8px; }
.mf3-res span{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 8px; font-size:.88rem; color:var(--ink); }
.mf3-res b{ font-family:var(--mono); }
.mf3-tbl{ border-collapse:collapse; margin:0 auto; font-size:.88rem; color:var(--ink); }
.mf3-tbl th, .mf3-tbl td{ border:1px solid var(--line); padding:3px 7px; text-align:center; font-variant-numeric:tabular-nums; transition:opacity .4s, background .4s; }
.mf3-tbl th{ background:var(--paper); font-weight:600; }
.mf3-tbl tr.on td{ background:color-mix(in srgb, var(--k-ms) 20%, var(--paper)); }
.mf3-tbl tr.off td{ opacity:.18; }
.mf3-tbl tr.sum td{ font-weight:700; border-top:2px solid var(--graphite); }
.mf3-out{ text-align:center; margin-top:8px; font-size:.92rem; color:var(--ink); line-height:1.5; }
.mf3-out b{ font-family:var(--mono); }
.mf3-trials{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:8px 0; min-height:46px; }
.mf3-trials span{ display:grid; justify-items:center; gap:2px; font:600 .8rem var(--mono); color:var(--ink); }
.mf3-trials i{ width:22px; height:22px; border-radius:50%; border:2px solid var(--ink); background:var(--paper); box-sizing:border-box; }
.mf3-trials i.s{ background:var(--ink); }
.mf3-trials span.new i{ animation:mf3in .35s ease; }
@keyframes mf3in{ from{ transform:scale(.3); opacity:0; } }
.mf3-flow{ display:grid; gap:4px; max-width:420px; margin:0 auto; }
.mf3-fr{ display:grid; grid-template-columns:minmax(0, 1.4fr) 34px minmax(0, 1fr); gap:4px; align-items:center; }
.mf3-fb{ border:1.5px solid var(--line); border-radius:10px; padding:7px 6px; background:var(--paper); font-size:.88rem; line-height:1.25; color:var(--ink); text-align:center; transition:opacity .4s, box-shadow .4s, background .4s; }
.mf3-fb.q{ border-style:dashed; }
.mf3-fb.dim{ opacity:.35; } .mf3-fb.on{ box-shadow:0 0 0 2px var(--k-ms); opacity:1; } .mf3-fb.done{ background:color-mix(in srgb, var(--k-ms) 20%, var(--paper)); box-shadow:0 0 0 2px var(--k-ms); opacity:1; }
.mf3-fa{ font-size:.8rem; color:var(--graphite); text-align:center; line-height:1.1; }
.mf3-fd{ text-align:center; font-size:.8rem; color:var(--graphite); width:58%; }
.mf3-link{ display:flex; flex-direction:column; gap:8px; justify-content:center; align-items:center; margin-top:10px; }
.mf3-link div{ border:1.5px solid var(--line); border-radius:8px; padding:6px 10px; text-align:center; font-size:.88rem; background:var(--paper); color:var(--ink); }
.mf3-link div.hot{ border-color:var(--k-ms); background:color-mix(in srgb, var(--k-ms) 16%, var(--paper)); }
.mf3-link small{ display:block; font-size:.8rem; color:var(--graphite); margin-top:2px; }
.mf3-link .arw{ border:0; background:none; font-size:1.2rem; padding:0; color:var(--k-ms); }
.mf3-note{ text-align:center; font-size:.84rem; color:var(--graphite); margin:6px 0 0; }
@media (prefers-reduced-motion: reduce){ .mf3-trials span.new i{ animation:none; } }`;
  if (!document.getElementById('mf3-css')) { const s = document.createElement('style'); s.id = 'mf3-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const fx = (v, d = 3) => { const s = v.toFixed(d); return /^-0\.?0*$/.test(s) ? s.slice(1) : s; };
  const tr = v => String(+(+v).toFixed(4));
  const K = 'var(--k-ms)', AREA = 'color-mix(in srgb, var(--k-ms) 32%, transparent)', FAINT = 'color-mix(in srgb, var(--graphite) 30%, transparent)';
  function ticks(lo, hi, n = 5) {
    const raw = (hi - lo) / n, mag = 10 ** Math.floor(Math.log10(raw)), st = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw - 1e-12);
    const out = []; for (let v = Math.ceil(lo / st - 1e-9) * st; v <= hi + 1e-9; v += st) out.push(+v.toFixed(10)); return out;
  }
  function frame({ W = 300, H = 200, l = 44, r = 14, t = 16, b = 34, x0, x1, y0 = 0, y1, xt = [], yt = [], xf = tr, yf = tr, xl = 'x', yl = '' }) {
    const sx = x => l + (x - x0) / (x1 - x0) * (W - l - r), sy = y => H - b - (Math.max(y0, Math.min(y1, y)) - y0) / (y1 - y0) * (H - t - b);
    const axes = html`<g>
      <line x1=${l} y1=${H - b} x2=${W - r} y2=${H - b} stroke="var(--graphite)" strokeWidth="1.5" />
      <line x1=${l} y1=${t - 8} x2=${l} y2=${H - b} stroke="var(--graphite)" strokeWidth="1.5" />
      ${xt.map(v => html`<g key=${'x' + v}><line x1=${sx(v)} x2=${sx(v)} y1=${H - b} y2=${H - b + 4} stroke="var(--graphite)" /><text x=${sx(v)} y=${H - b + 20} textAnchor="middle" fontSize="15">${xf(v)}</text></g>`)}
      ${yt.map(v => html`<g key=${'y' + v}><line x1=${l - 4} x2=${l} y1=${sy(v)} y2=${sy(v)} stroke="var(--graphite)" /><text x=${l - 7} y=${sy(v) + 5} textAnchor="end" fontSize="15">${yf(v)}</text></g>`)}
      ${xl && html`<text x=${W - r} y=${H - b - 7} textAnchor="end" fontSize="15" fontStyle="italic">${xl}</text>`}
      ${yl && html`<text x=${l + 6} y=${t + 2} fontSize="15" fontStyle="italic">${yl}</text>`}
    </g>`;
    return { sx, sy, W, H, axes, l, r, t, b, x0, x1, y0, y1 };
  }
  const curve = (f, a, z, F, n = 140) => { let d = ''; for (let i = 0; i <= n; i++) { const x = a + (z - a) * i / n; d += (i ? 'L' : 'M') + F.sx(x).toFixed(1) + ',' + F.sy(f(x)).toFixed(1); } return d; };
  const area = (f, a, z, F) => z > a ? curve(f, a, z, F, 100) + `L${F.sx(z).toFixed(1)},${F.sy(0)}L${F.sx(a).toFixed(1)},${F.sy(0)}Z` : '';
  const Svg = ({ F, label, children }) => html`<svg viewBox=${`0 0 ${F.W} ${F.H}`} role="img" aria-label=${label}>${F.axes}${children}</svg>`;
  const Slide = ({ label, min, max, step, v, set, show }) => html`<label className="mf3-sl"><span dangerouslySetInnerHTML=${{ __html: label }}></span><input type="range" min=${min} max=${max} step=${step} value=${v} onInput=${e => set(+e.target.value)} onChange=${e => set(+e.target.value)} /><b>${show != null ? show : v}</b></label>`;
  const Num = ({ label, v, set, step, min, max }) => html`<label className="mf3-num"><span dangerouslySetInnerHTML=${{ __html: label }}></span><input type="number" inputMode="decimal" step=${step || 'any'} min=${min} max=${max} value=${v} onInput=${e => set(e.target.value)} onChange=${e => set(e.target.value)} /></label>`;
  const Modes = ({ list, mode, set }) => html`<div className="mf3-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Res = ({ items }) => html`<div className="mf3-res">${items.filter(Boolean).map(([k, v], j) => html`<span key=${j}><span dangerouslySetInnerHTML=${{ __html: k }}></span> <b>${v}</b></span>`)}</div>`;
  const Fig = ({ children, cap, ar, bar }) => html`<figure className="fig mf3"><div className="fig-stage">${children}</div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />${bar || null}</figure>`;
  const num = s => { const v = parseFloat(s); return isFinite(v) ? v : NaN; };
  const Phi = z => { const t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989422804014327 * Math.exp(-z * z / 2), p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))); return z >= 0 ? 1 - p : p; };
  function gammaF(z) { if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaF(1 - z)); z -= 1; const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; let x = c[0]; for (let i = 1; i < 9; i++) x += c[i] / (z + i); const t = z + 7.5; return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x; }
  const choose = (n, x) => { let c = 1; for (let i = 1; i <= x; i++) c = c * (n - x + i) / i; return Math.round(c); };
  const fact = x => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; };

  /* ── §2 Fig 3.1: PMF of the loaded die ── */
  function Die({ ar }) {
    const steps = [
      { en: 'Loaded die: p(x) is proportional to x. The weights 1 + 2 + ... + 6 add up to <b>21</b>, so p(x) = x/21.', ar: 'ده زهر متلعّب فيه: الـ <bdi dir="ltr">p(x)</bdi> متناسبة مع x. الأوزان مجموعها <b>21</b>:' + L('1 + 2 + 3 + 4 + 5 + 6 = 21') + 'يبقى' + L('p(x) = x/21') },
      { en: 'Fig 3.1: a vertical bar at each x = 1..6, heights 1/21 to 6/21, increasing.', ar: 'الـ Fig 3.1 فيها عمود رأسي عند كل قيمة x من 1 لـ 6، وأطوالهم بتزيد بالترتيب:' + L('1/21, 2/21, 3/21, 4/21, 5/21, 6/21') },
      { en: 'PMF condition 1: every p(xᵢ) ≥ 0. All six bars stand on or above the axis.', ar: 'أول شرط للـ PMF إن كل الاحتمالات موجبة أو صفر:' + L('p(xᵢ) ≥ 0') + 'وفعلًا كل الأعمدة الستة فوق المحور.' },
      { en: 'PMF condition 2: the bars add up to 1: 1/21 + 2/21 + ... + 6/21 = 21/21 = 1 (the strip below).', ar: 'تاني شرط إن مجموع الأعمدة يساوي 1 (الشريط اللي تحت):' + L('1/21 + 2/21 + ... + 6/21 = 21/21 = 1') }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const F = frame({ H: 250, b: 84, x0: 0.4, x1: 6.6, y1: 0.32, xt: [1, 2, 3, 4, 5, 6], yt: [0, 0.1, 0.2, 0.3], yl: 'p(x)' });
    const y0 = F.sy(0), sw = (F.sx(6.6) - F.sx(0.4)) / 21;
    let acc = 0;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${F} label="PMF of the loaded die: bars 1/21 to 6/21">
        ${[1, 2, 3, 4, 5, 6].map(x => { const h = i >= 1 ? y0 - F.sy(x / 21) : 0; return html`<g key=${x}>
          <rect x=${F.sx(x) - 14} y=${y0 - h} width="28" height=${h} fill=${K} style=${{ transition: 'all .6s ease ' + (x * 0.08) + 's' }} />
          <text x=${F.sx(x)} y=${(i >= 1 ? F.sy(x / 21) : y0) - 6} textAnchor="middle" fontSize="15" className=${pop(i >= 1)}>${x}/21</text>
          ${i === 2 && html`<text x=${F.sx(x)} y=${y0 - 4} textAnchor="middle" fontSize="15" fill="var(--ok)" style=${{ fill: 'var(--ok)' }}>✓</text>`}</g>`; })}
        <g className=${pop(i >= 3)}>
          ${[1, 2, 3, 4, 5, 6].map(x => { const x0 = F.sx(0.4) + acc * sw; acc += x; return html`<g key=${'s' + x}><rect x=${x0} y="206" width=${x * sw} height="22" fill=${x % 2 ? K : 'var(--pen)'} opacity=${x % 2 ? 0.85 : 0.6} stroke="var(--paper)" /><text x=${x0 + x * sw / 2} y="222" textAnchor="middle" fontSize="15" style=${{ fill: 'var(--paper)' }}>${x > 1 ? x : ''}</text></g>`; })}
          <text x=${F.sx(0.4)} y="246" fontSize="15">0</text><text x=${F.sx(6.6)} y="246" textAnchor="end" fontSize="15">21/21 = 1</text>
        </g>
      <//><//>`;
  }

  /* ── table step-through of E(X), E(X²), V(X), σ (Example 3.4 and the slide 49 exercise) ── */
  function Moments({ ar, c }) {
    const n = c.xs.length;
    const steps = [...c.xs.map((_, j) => c.row(j)), ...c.end];
    const [i, ctl] = useSteps(steps.length, 1700);
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <table className="mf3-tbl"><thead><tr><th>x</th><th>p(x)</th><th>x·p(x)</th><th>x²·p(x)</th></tr></thead><tbody>
        ${c.xs.map((x, j) => html`<tr key=${j} className=${i === j ? 'on' : i < j ? 'off' : ''}><td>${x}</td><td>${c.p[j]}</td><td>${c.xp[j]}</td><td>${c.x2p[j]}</td></tr>`)}
        <tr className="sum"><td colSpan="2">Σ</td><td className=${pop(i >= n)}>${c.sums[0]}</td><td className=${pop(i >= n + 1)}>${c.sums[1]}</td></tr></tbody></table>
      <div className="mf3-out">
        <div className=${pop(i >= n)}>E(X) = <b>${c.E}</b></div>
        <div className=${pop(i >= n + 1)}>E(X²) = <b>${c.E2}</b></div>
        <div className=${pop(i >= n + 2)}>V(X) = <b>${c.V}</b>, σ = <b>${c.sd}</b></div></div>
    <//>`;
  }
  const DIE = {
    xs: [1, 2, 3, 4, 5, 6], p: ['1/21', '2/21', '3/21', '4/21', '5/21', '6/21'], xp: ['1/21', '4/21', '9/21', '16/21', '25/21', '36/21'], x2p: ['1/21', '8/21', '27/21', '64/21', '125/21', '216/21'],
    sums: ['91/21', '441/21'], E: '91/21 = 4.33', E2: '441/21 = 21', V: '21 − (91/21)² = 2.22', sd: '√2.22 = 1.49',
    row: j => { const x = j + 1; return { en: `x = ${x}: x·p(x) = ${x} × ${x}/21 = ${x * x}/21, and x²·p(x) = ${x * x} × ${x}/21 = ${x ** 3}/21.`, ar: `في الصف ده القيمة ${x}:` + L(`x·p(x) = ${x} × ${x}/21 = ${x * x}/21`) + 'وكمان' + L(`x²·p(x) = ${x * x} × ${x}/21 = ${x ** 3}/21`) }; },
    end: [
      { en: 'Add the x·p(x) column: E(X) = 1(1/21) + 2(2/21) + ... + 6(6/21) = 91/21 = <b>4.33</b>.', ar: 'نجمع عمود الـ <bdi dir="ltr">x·p(x)</bdi>:' + L('E(X) = 1(1/21) + 2(2/21) + ... + 6(6/21) = 91/21 = 4.33') },
      { en: 'Add the x²·p(x) column: E(X²) = 441/21 = <b>21</b>.', ar: 'نجمع عمود الـ <bdi dir="ltr">x²·p(x)</bdi>:' + L('E(X²) = 441/21 = 21') },
      { en: 'V(X) = E(X²) − (E(X))² = 21 − 18.78 = <b>2.22</b> (using the exact mean 91/21; squaring the rounded 4.33 would give 2.25), σ = √2.22 = <b>1.49</b>.', ar: 'الـ variance بنطرح مربع المتوسط:' + L('V(X) = 21 − (91/21)² = 21 − 18.78 = 2.22') + 'وده بالمتوسط المظبوط (لو ربّعنا الـ 4.33 المقرّبة هتطلع 2.25). والـ standard deviation:' + L('σ = √2.22 = 1.49') }
    ]
  };
  const DISC = {
    xs: [2, 5, 7, 9, 10], p: ['0.2', '0.2', '0.2', '0.3', '0.1'], xp: ['0.4', '1', '1.4', '2.7', '1'], x2p: ['0.8', '5', '9.8', '24.3', '10'],
    sums: ['6.5', '49.9'], E: '6.5', E2: '49.9', V: '49.9 − 6.5² = 7.65', sd: '√7.65 = 2.77',
    row: j => { const x = DISC.xs[j], p = DISC.p[j]; return { en: `x = ${x}: x·p(x) = ${x} × ${p} = ${DISC.xp[j]}, and x²·p(x) = ${x * x} × ${p} = ${DISC.x2p[j]}.`, ar: `في الصف ده القيمة ${x}:` + L(`x·p(x) = ${x} × ${p} = ${DISC.xp[j]}`) + 'وكمان' + L(`x²·p(x) = ${x * x} × ${p} = ${DISC.x2p[j]}`) }; },
    end: [
      { en: 'E(X) = 0.4 + 1 + 1.4 + 2.7 + 1 = <b>6.5</b>.', ar: 'نجمع عمود الـ <bdi dir="ltr">x·p(x)</bdi>:' + L('E(X) = 0.4 + 1 + 1.4 + 2.7 + 1 = 6.5') },
      { en: 'E(X²) = 0.8 + 5 + 9.8 + 24.3 + 10 = <b>49.9</b>.', ar: 'نجمع عمود الـ <bdi dir="ltr">x²·p(x)</bdi>:' + L('E(X²) = 0.8 + 5 + 9.8 + 24.3 + 10 = 49.9') },
      { en: 'V(X) = 49.9 − 6.5² = 49.9 − 42.25 = <b>7.65</b>; σ = √7.65 = <b>2.77</b>. (Part (c), which the slide leaves as "try to compute".)', ar: 'الـ variance والـ standard deviation:' + L('V(X) = 49.9 − 6.5² = 49.9 − 42.25 = 7.65') + L('σ = √7.65 = 2.77') + 'وده الجزء (c) اللي الـ slide سايباه تمرين.' }
    ]
  };
  const DieMoments = ({ ar }) => html`<${Moments} ar=${ar} c=${DIE} />`;
  const DiscMoments = ({ ar }) => html`<${Moments} ar=${ar} c=${DISC} />`;

  /* ── §3 slide 7: area under a PDF between a and b ── */
  const gpdf = x => 0.0905 * x * x * Math.exp(-x / 1.25) / 1.25; // a generic PDF shape on [0, 10] (no numbers shown)
  function PdfArea({ ar }) {
    const steps = [
      { en: 'A PDF f(x): f(x) ≥ 0 everywhere and the whole area under the curve is 1.', ar: 'ده منحنى الـ PDF:' + L('f(x) ≥ 0') + 'في كل حتة، والمساحة كلها تحت المنحنى بتساوي 1.' },
      { en: 'The shaded area between a and b is P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx.', ar: 'المساحة المظللة بين a و b هي الاحتمال:' + L('P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx') },
      { en: 'Bring b down to a: the area shrinks to nothing, so P(X = x₀) = 0 for a continuous X.', ar: 'لو قرّبنا b لحد a المساحة بتختفي، يعني في الـ continuous random variable:' + L('P(X = x₀) = 0') },
      { en: 'So including or excluding the ends changes nothing: P(a ≤ X ≤ b) = P(a < X ≤ b) = P(a ≤ X < b) = P(a < X < b).', ar: 'عشان كده مش فارقة الأطراف داخلة ولا لأ:' + L('P(a ≤ X ≤ b) = P(a < X ≤ b) = P(a ≤ X < b) = P(a < X < b)') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [ab, setAb] = useState(null);
    useEffect(() => setAb(null), [i]);
    const preset = [[3, 6], [3, 6], [4.6, 4.6], [3, 6]][i], [a, b] = ab || preset;
    const F = frame({ H: 190, l: 30, x0: 0, x1: 10, y1: 0.075, yl: 'f(x)' });
    const lo = Math.min(a, b), hi = Math.max(a, b);
    let cap = steps[i];
    if (ab) cap = lo === hi ? { en: 'a = b: there is no area, so P(X = x₀) = 0.', ar: 'لما a تساوي b مفيش مساحة، يعني' + L('P(X = x₀) = 0') } : { en: 'The shaded area is P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx.', ar: 'المساحة المظللة هي' + L('P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx') };
    return html`<${Fig} ar=${ar} cap=${cap} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${F} label="A PDF with the area between a and b shaded">
        <path d=${area(gpdf, lo, hi, F)} fill=${AREA} className=${pop(i >= 1 || ab)} />
        <path d=${curve(gpdf, 0, 10, F)} fill="none" stroke=${K} strokeWidth="3" />
        ${(i >= 1 || ab) && html`<g>
          <line x1=${F.sx(lo)} x2=${F.sx(lo)} y1=${F.sy(0)} y2=${F.sy(gpdf(lo))} stroke="var(--pen)" strokeWidth="2" />
          <line x1=${F.sx(hi)} x2=${F.sx(hi)} y1=${F.sy(0)} y2=${F.sy(gpdf(hi))} stroke="var(--pen)" strokeWidth="2" />
          ${lo === hi ? html`<text x=${F.sx(lo)} y=${F.H - 12} textAnchor="middle" fontSize="15" fontStyle="italic">a = b</text>`
            : html`<g><text x=${F.sx(lo)} y=${F.H - 12} textAnchor="middle" fontSize="15" fontStyle="italic">a</text><text x=${F.sx(hi)} y=${F.H - 12} textAnchor="middle" fontSize="15" fontStyle="italic">b</text></g>`}</g>`}
      <//>
      <${Slide} label="a" min="0.2" max="9.8" step="0.1" v=${a} set=${v => setAb([v, b])} show=" " />
      <${Slide} label="b" min="0.2" max="9.8" step="0.1" v=${b} set=${v => setAb([a, v])} show=" " />
    <//>`;
  }

  /* ── §4 / §6: the inspection device, f(x) = ½e^(−x/2), F(x) = 1 − e^(−x/2) ── */
  function Device({ ar, mode }) {
    const pdf = mode === 'pdf';
    const [a, setA] = useState(2), [b, setB] = useState(3);
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const f = x => 0.5 * Math.exp(-x / 2), Fc = x => 1 - Math.exp(-x / 2);
    const ea = Math.exp(-lo / 2), eb = Math.exp(-hi / 2), d = +fx(ea) - +fx(eb);
    const F = pdf ? frame({ H: 200, x0: 0, x1: 10, y1: 0.55, xt: [0, 2, 4, 6, 8, 10], yt: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yl: 'f(x)', xl: 'years' })
      : frame({ H: 200, x0: 0, x1: 10, y1: 1.05, xt: [0, 2, 4, 6, 8, 10], yt: [0, 0.2, 0.4, 0.6, 0.8, 1], yl: 'F(x)', xl: 'years' });
    let cap;
    if (pdf) cap = { en: `P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = ½∫ e^(−x/2) dx from ${tr(lo)} to ${tr(hi)} = e^(−${tr(lo)}/2) − e^(−${tr(hi)}/2) = ${fx(ea)} − ${fx(eb)} = <b>${fx(d)}</b> (the shaded area).${lo === 2 && hi === 3 ? ' This is the slide 8 example: 0.368 − 0.223 = 0.145.' : ''}`,
      ar: 'الاحتمال هو المساحة المظللة:' + L(`P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = e^(−${tr(lo)}/2) − e^(−${tr(hi)}/2) = ${fx(ea)} − ${fx(eb)} = ${fx(d)}`) + (lo === 2 && hi === 3 ? 'وده مثال الـ slide 8 بالظبط.' : '') };
    else {
      const Fa = Fc(lo), Fb = Fc(hi);
      cap = lo === 0 ? { en: `P(0 ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) − F(0) = F(${tr(hi)}) = 1 − e^(−${tr(hi)}/2) = <b>${fx(Fb)}</b>.${hi === 2 ? ' Slide 10: the device lasts less than 2 years with probability 0.632.' : ''}`, ar: 'من الـ CDF على طول:' + L(`P(0 ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) = 1 − e^(−${tr(hi)}/2) = ${fx(Fb)}`) + (hi === 2 ? 'وده مثال الـ slide 10: الجهاز يعيش أقل من سنتين.' : '') }
        : { en: `P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) − F(${tr(lo)}) = ${fx(Fb)} − ${fx(Fa)} = <b>${fx(d)}</b> (the jump of F between the two dots).${lo === 2 && hi === 3 ? ' Same answer as integrating the PDF: 0.145.' : ''}`, ar: 'الاحتمال هو الفرق بين قيمتين الـ CDF:' + L(`P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) − F(${tr(lo)}) = ${fx(Fb)} − ${fx(Fa)} = ${fx(d)}`) + (lo === 2 && hi === 3 ? 'نفس إجابة تكامل الـ PDF.' : '') };
    }
    const ex = pdf ? [['2 to 3 years', 2, 3]] : [['less than 2 years', 0, 2], ['2 to 3 years', 2, 3]];
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row"><span>Example:</span>${ex.map(([t, x, y]) => html`<button key=${t} className="fig-btn" aria-pressed=${String(lo === x && hi === y)} onClick=${() => { setA(x); setB(y); }}>${t}</button>`)}</div>
      <${Svg} F=${F} label=${pdf ? 'Exponential PDF of the device life with the area between a and b shaded' : 'CDF of the device life'}>
        ${pdf ? html`<g><path d=${area(f, lo, hi, F)} fill=${AREA} /><path d=${curve(f, 0, 10, F)} fill="none" stroke=${K} strokeWidth="3" /></g>`
          : html`<g><line x1=${F.sx(0)} x2=${F.sx(10)} y1=${F.sy(1)} y2=${F.sy(1)} stroke="var(--graphite)" strokeDasharray="5 5" />
            <path d=${curve(Fc, 0, 10, F)} fill="none" stroke=${K} strokeWidth="3" />
            ${[lo, hi].map((x, j) => html`<g key=${j}><line x1=${F.sx(x)} x2=${F.sx(x)} y1=${F.sy(0)} y2=${F.sy(Fc(x))} stroke="var(--graphite)" strokeDasharray="4 4" /><line x1=${F.l} x2=${F.sx(x)} y1=${F.sy(Fc(x))} y2=${F.sy(Fc(x))} stroke="var(--graphite)" strokeDasharray="4 4" /><circle cx=${F.sx(x)} cy=${F.sy(Fc(x))} r="5" fill="var(--pen)" /></g>`)}
            <line x1=${F.l + 5} x2=${F.l + 5} y1=${F.sy(Fc(lo))} y2=${F.sy(Fc(hi))} stroke="var(--pen)" strokeWidth="5" /></g>`}
      <//>
      <${Slide} label="a" min="0" max="10" step="0.1" v=${a} set=${setA} show=${tr(a)} />
      <${Slide} label="b" min="0" max="10" step="0.1" v=${b} set=${setB} show=${tr(b)} />
    <//>`;
  }
  const DevicePdf = ({ ar }) => html`<${Device} ar=${ar} mode="pdf" />`;
  const DeviceCdf = ({ ar }) => html`<${Device} ar=${ar} mode="cdf" />`;

  /* ── §5 slide 9: CDF properties ── */
  const gcdf = x => 1 / (1 + Math.exp(-(x - 5) / 1.1));
  function CdfProps({ ar }) {
    const steps = [
      { en: 'The CDF F(x) = P(X ≤ x): an S-shaped curve rising from 0 toward the dashed line F(x) = 1.', ar: 'الـ CDF هي' + L('F(x) = P(X ≤ x)') + 'وشكلها S طالعة من 0 ناحية الخط المتقطع اللي عند 1.' },
      { en: 'F is <b>nondecreasing</b>: if a ≤ b then F(a) ≤ F(b). Moving right, the curve never goes down.', ar: 'الـ F عمرها ما بتنزل (<b>nondecreasing</b>): لو a أصغر من أو تساوي b يبقى' + L('F(a) ≤ F(b)') },
      { en: 'Limits: F(x) → 0 as x → −∞ and F(x) → 1 as x → ∞.', ar: 'النهايات: لما x تروح لسالب ما لا نهاية الـ F بتقرب من 0، ولما تروح لما لا نهاية بتقرب من 1.' },
      { en: 'Any probability comes from the CDF: P(a < X ≤ b) = F(b) − F(a), the jump between the two dots.', ar: 'أي احتمال نقدر نجيبه من الـ CDF، وهو الفرق بين النقطتين:' + L('P(a < X ≤ b) = F(b) − F(a)') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const F = frame({ H: 200, x0: 0, x1: 10, y1: 1.1, yt: [0, 1], yl: 'F(x)' });
    const a = 3.6, b = 6.2;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${F} label="An S-shaped CDF">
        <line x1=${F.sx(0)} x2=${F.sx(10)} y1=${F.sy(1)} y2=${F.sy(1)} stroke="var(--graphite)" strokeDasharray="5 5" />
        <path d=${curve(gcdf, 0, 10, F)} fill="none" stroke=${K} strokeWidth="3" />
        <g className=${pop(i === 1 || i === 3)}>${[a, b].map((x, j) => html`<g key=${j}><line x1=${F.sx(x)} x2=${F.sx(x)} y1=${F.sy(0)} y2=${F.sy(gcdf(x))} stroke="var(--graphite)" strokeDasharray="4 4" /><line x1=${F.l} x2=${F.sx(x)} y1=${F.sy(gcdf(x))} y2=${F.sy(gcdf(x))} stroke="var(--graphite)" strokeDasharray="4 4" /><circle cx=${F.sx(x)} cy=${F.sy(gcdf(x))} r="5" fill="var(--pen)" /><text x=${F.sx(x)} y=${F.H - 12} textAnchor="middle" fontSize="15" fontStyle="italic">${j ? 'b' : 'a'}</text></g>`)}</g>
        <g className=${pop(i === 1)}><text x=${F.sx(a) - 6} y=${F.sy(gcdf(a)) - 8} textAnchor="end" fontSize="15">F(a)</text><text x=${F.sx(b) - 6} y=${F.sy(gcdf(b)) - 8} textAnchor="end" fontSize="15">F(b)</text></g>
        <g className=${pop(i === 3)}><line x1=${F.l + 6} x2=${F.l + 6} y1=${F.sy(gcdf(a))} y2=${F.sy(gcdf(b))} stroke="var(--pen)" strokeWidth="5" /><text x=${F.l + 14} y=${F.sy((gcdf(a) + gcdf(b)) / 2) + 5} fontSize="15">F(b) − F(a)</text></g>
        <g className=${pop(i === 2)}><text x=${F.sx(0.3)} y=${F.sy(0) - 10} fontSize="15">→ 0</text><text x=${F.sx(9.9)} y=${F.sy(1) + 20} textAnchor="end" fontSize="15">→ 1</text></g>
      <//><//>`;
  }

  /* ── §8 slide 12: σ² large vs σ² small ── */
  function Variance({ ar }) {
    const steps = [
      { en: 'Two PDFs with the same mean μ. Variance measures the <b>spread</b> of X around the mean.', ar: 'ده منحنيين PDF ليهم نفس المتوسط μ. الـ variance بتقيس <b>انتشار</b> قيم X حوالين المتوسط.' },
      { en: '<b>σ² large</b>: values spread far from μ, so the curve is wide and low.', ar: 'لما تكون <b>الـ σ² كبيرة</b> القيم بتبعد عن μ، فالمنحنى عريض وواطي.' },
      { en: '<b>σ² small</b>: values stay close to μ, so the curve is narrow and tall.', ar: 'لما تكون <b>الـ σ² صغيرة</b> القيم قريبة من μ، فالمنحنى ضيق وعالي.' },
      { en: 'σ = √V(X) is in the same units as the mean, so read σ together with the mean.', ar: 'الـ standard deviation هي جذر الـ variance، وبنفس وحدة المتوسط، فلازم نقراها مع المتوسط.' + L('σ = √V(X)') }
    ];
    const [i, ctl] = useSteps(steps.length, 2500);
    const F = frame({ H: 200, l: 20, x0: -6, x1: 6, y1: 0.45, xt: [0], xf: () => 'μ' });
    const n = s => x => Math.exp(-x * x / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
    const big = n(2.3), sm = n(1);
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${F} label="A wide curve with large variance and a narrow curve with small variance">
        <line x1=${F.sx(0)} x2=${F.sx(0)} y1=${F.sy(0)} y2=${F.sy(0.42)} stroke="var(--graphite)" strokeDasharray="4 4" />
        <path d=${curve(big, -6, 6, F)} fill="none" stroke=${i === 2 ? FAINT : 'var(--pen)'} strokeWidth=${i === 1 ? 4 : 2.5} />
        <path d=${curve(sm, -6, 6, F)} fill="none" stroke=${i === 1 ? FAINT : K} strokeWidth=${i === 2 ? 4 : 2.5} />
        <text x=${F.sx(-2.4)} y=${F.sy(0.2)} textAnchor="end" fontSize="15" className=${pop(i !== 2)}>σ² large</text>
        <text x=${F.sx(0.9)} y=${F.sy(0.38)} fontSize="15" className=${pop(i !== 1)}>σ² small</text>
      <//><//>`;
  }

  /* ── §13 slide 20: the α-quantile ── */
  function Quantile({ ar }) {
    const [al, setAl] = useState(0.5);
    const xa = 5 + 1.1 * Math.log(al / (1 - al));
    const F = frame({ H: 200, x0: 0, x1: 10, y1: 1.1, yt: [0, 1], yl: 'F(x)' });
    const med = Math.abs(al - 0.5) < 1e-9;
    const cap = { en: `Go across at height α = ${al.toFixed(2)} until you meet the CDF, then drop down: that x is the <b>α-quantile</b> x<sub>α</sub>, with F(x<sub>α</sub>) = P(X ≤ x<sub>α</sub>) = α.${med ? ' At α = 0.5 it is the <b>median</b>: half of the values are smaller, half larger.' : ''}`,
      ar: `امشي بالعرض عند ارتفاع α لحد ما تقابل الـ CDF وبعدين انزل لتحت: النقطة دي هي الـ <b>α-quantile</b>، وهي اللي بتحقق` + L(`F(xα) = P(X ≤ xα) = α = ${al.toFixed(2)}`) + (med ? 'وعند 0.5 بالظبط دي الـ <b>median</b>: نص القيم أصغر منها ونصها أكبر.' : '') };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Svg} F=${F} label="Reading the alpha-quantile off a CDF">
        <line x1=${F.sx(0)} x2=${F.sx(10)} y1=${F.sy(1)} y2=${F.sy(1)} stroke="var(--graphite)" strokeDasharray="5 5" />
        <path d=${curve(gcdf, 0, 10, F)} fill="none" stroke=${K} strokeWidth="3" />
        <line x1=${F.l} x2=${F.sx(xa)} y1=${F.sy(al)} y2=${F.sy(al)} stroke="var(--pen)" strokeWidth="2.5" />
        <line x1=${F.sx(xa)} x2=${F.sx(xa)} y1=${F.sy(al)} y2=${F.sy(0)} stroke="var(--pen)" strokeWidth="2.5" strokeDasharray="5 4" />
        <circle cx=${F.sx(xa)} cy=${F.sy(al)} r="5" fill="var(--pen)" />
        <text x=${F.l - 7} y=${F.sy(al) + 5} textAnchor="end" fontSize="15" fontStyle="italic">α</text>
        <text x=${F.sx(xa)} y=${F.H - 12} textAnchor="middle" fontSize="15" fontStyle="italic">${med ? 'x₀.₅ = median' : 'xα'}</text>
      <//>
      <${Slide} label="α" min="0.05" max="0.95" step="0.05" v=${al} set=${setAl} show=${al.toFixed(2)} />
    <//>`;
  }

  /* ── §13 slide 22: mean, median and mode on five PDFs ── */
  const npdf = (m, s) => x => Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
  const gam = x => x <= 0 ? 0 : x * Math.exp(-x); // shape 2: mode 1, median 1.678, mean 2
  const MMM = [
    { k: 'Symmetric', f: npdf(5, 1.5), lines: [[5, ['Median', 'Mean', 'Mode'], 'mid']], en: 'One peak, symmetric: <b>median = mean = mode</b>, all at the centre.', ar: 'قمة واحدة ومتماثل: الثلاثة واحد في النص.' + L('median = mean = mode') },
    { k: 'Two peaks', f: x => (npdf(3.1, 0.95)(x) + npdf(6.9, 0.95)(x)) / 2, lines: [[3.1, [], 'mid'], [6.9, [], 'mid'], [5, ['Median', 'Mean'], 'mid']], modes: true, en: 'Two peaks (bimodal): <b>two modes</b>; the median and the mean are in the middle.', ar: 'قمتين (bimodal): فيه <b>2 mode</b>، والـ median والـ mean في النص.' },
    { k: 'Flat', f: x => (x >= 2 && x <= 8 ? 1 / 6 : 0), flat: true, lines: [[5, ['Median', 'Mean'], 'mid']], none: true, en: 'Flat (uniform): <b>no mode</b>; median = mean at the centre.', ar: 'مسطح (uniform): <b>مفيش mode</b>، والـ median بيساوي الـ mean في النص.' },
    { k: 'Right tail', f: x => gam((x - 0.5) / 1.9) / 1.9, lines: [[0.5 + 1.9, ['Mode'], 'top'], [0.5 + 1.9 * 1.678, ['Median'], 'r1'], [0.5 + 1.9 * 2, ['Mean'], 'r2']], en: 'Long right tail: <b>mode &lt; median &lt; mean</b>. The few large values pull the mean to the right.', ar: 'ديل طويل ناحية اليمين: القيم الكبيرة القليلة بتشد الـ mean لليمين.' + L('mode < median < mean') },
    { k: 'Left tail', f: x => gam((9.5 - x) / 1.9) / 1.9, lines: [[9.5 - 1.9, ['Mode'], 'top'], [9.5 - 1.9 * 1.678, ['Median'], 'l1'], [9.5 - 1.9 * 2, ['Mean'], 'l2']], en: 'Long left tail: <b>mean &lt; median &lt; mode</b>.', ar: 'ديل طويل ناحية الشمال: الترتيب بيتعكس.' + L('mean < median < mode') }
  ];
  function MeanMedianMode({ ar }) {
    const [i, ctl] = useSteps(MMM.length, 3000);
    const s = MMM[i], F = frame({ H: 230, l: 26, t: 70, x0: 0, x1: 10, y1: 0.28, yl: '' });
    const top = F.sy(0.28);
    return html`<${Fig} ar=${ar} cap=${s} bar=${html`<${Bar} steps=${MMM} i=${i} ctl=${ctl} />`}>
      <${Modes} list=${MMM.map((m, j) => [j, m.k])} mode=${i} set=${ctl.go} />
      <${Svg} F=${F} label=${'Mean, median and mode on a ' + s.k + ' PDF'}>
        <text x=${F.l + 6} y="18" fontSize="15" fontStyle="italic">pdf, f(x)</text>
        ${s.flat ? html`<path d=${`M${F.sx(2)},${F.sy(0)}V${F.sy(1 / 6)}H${F.sx(8)}V${F.sy(0)}`} fill="none" stroke="var(--pen)" strokeWidth="3" />` : html`<path d=${curve(s.f, 0.2, 9.8, F, 160)} fill="none" stroke="var(--pen)" strokeWidth="3" />`}
        ${s.lines.map(([x, labs, pos], j) => { const yTop = F.sy(s.f(x)), side = pos[0] === 'r' || pos[0] === 'l';
          const lineTop = pos === 'top' ? 44 : pos[1] === '1' ? 62 : pos[1] === '2' ? 82 : Math.min(yTop, F.sy(0.24));
          const anchor = pos[0] === 'r' ? 'start' : pos[0] === 'l' ? 'end' : 'middle', dx = pos[0] === 'r' ? 3 : pos[0] === 'l' ? -3 : 0;
          const ly = pos === 'top' ? 38 : side ? lineTop - 3 : top - 10 - (labs.length - 1) * 17;
          return html`<g key=${i + '-' + j}><line x1=${F.sx(x)} x2=${F.sx(x)} y1=${F.sy(0)} y2=${lineTop} stroke=${K} strokeWidth="2" strokeDasharray="6 4" />
            ${labs.map((t, k) => html`<text key=${k} x=${F.sx(x) + dx} y=${ly + k * 17} textAnchor=${anchor} fontSize="15">${t}</text>`)}</g>`; })}
        ${s.modes && html`<g><text x=${F.sx(5)} y="40" textAnchor="middle" fontSize="15">Modes</text><path d=${`M${F.sx(4.4)},44 L${F.sx(3.3)},${F.sy(s.f(3.1)) - 6} M${F.sx(5.6)},44 L${F.sx(6.7)},${F.sy(s.f(6.9)) - 6}`} stroke=${K} strokeDasharray="5 4" fill="none" strokeWidth="1.5" /></g>`}
        ${s.none && html`<text x=${F.sx(5)} y="40" textAnchor="middle" fontSize="15">No mode</text>`}
      <//><//>`;
  }

  /* ── §14 slide 23: selecting among mean, median and mode ── */
  const QS = [['Is data categorical?', 'Use mode', 'هل الـ data دي categorical؟', 'الـ mode'], ['Is total of interest?', 'Use mean', 'هل المجموع (الـ total) هو اللي يهمنا؟', 'الـ mean'], ['Is distribution skewed?', 'Use median', 'هل الـ distribution دي skewed؟', 'الـ median']];
  function CentralFlow({ ar }) {
    const [path, setPath] = useState([]);
    const at = path.length, yes = path.indexOf(true), end = yes >= 0 ? yes : at === 3 ? 3 : -1;
    const ans = v => { if (end < 0) setPath(p => p.concat(v)); };
    let cap;
    if (end === -1) cap = { en: `Select central tendency. Question ${at + 1}: <b>${QS[at][0]}</b>`, ar: `اختيار مقياس النزعة المركزية. السؤال رقم ${at + 1}: <b>${QS[at][2]}</b>` };
    else if (end < 3) cap = { en: `Yes, so <b>${QS[end][1]}</b>.`, ar: `الإجابة أيوه، يبقى نستخدم <b>${QS[end][3]}</b>.` };
    else cap = { en: 'No to all three questions, so <b>use mean</b>.', ar: 'الإجابة لأ على التلت أسئلة، يبقى نستخدم <b>الـ mean</b>.' };
    const cls = j => end === j ? 'done' : at === j && end < 0 ? 'on' : j < at ? '' : 'dim';
    return html`<${Fig} ar=${ar} cap=${cap} bar=${html`<div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setPath([])}>↻ Start over</button></div>`}>
      <div className="mf3-flow">
        <div className="mf3-fr"><div className="mf3-fb on" style=${{ gridColumn: '1 / 2' }}>Select central tendency</div></div>
        ${QS.map((q, j) => html`<div key=${j}>
          <div className="mf3-fd">↓${j > 0 ? ' No' : ''}</div>
          <div className="mf3-fr"><div className=${'mf3-fb q ' + (j < at && path[j] === false ? '' : cls(j))}>${q[0]}</div><div className="mf3-fa">Yes<br />→</div><div className=${'mf3-fb ' + (end === j ? 'done' : 'dim')}>${q[1]}</div></div></div>`)}
        <div className="mf3-fd">↓ No</div>
        <div className="mf3-fr"><div className=${'mf3-fb ' + (end === 3 ? 'done' : 'dim')}>Use mean</div></div>
      </div>
      <div className="mf3-row" style=${{ marginTop: '10px' }}>${end < 0 ? html`<button className="fig-btn solid" onClick=${() => ans(true)}>Yes</button><button className="fig-btn" onClick=${() => ans(false)}>No</button>` : html`<span>Done</span>`}</div>
    <//>`;
  }

  /* ── §16 slide 26: Bernoulli trials ── */
  function Bernoulli({ ar }) {
    const [n, setN] = useState(10), [p, setP] = useState(0.5), [res, setRes] = useState([]), [shown, setShown] = useState(0);
    const run = () => { const r = Array.from({ length: n }, () => Math.random() < p ? 1 : 0); setRes(r); setShown(calm() ? n : 0); };
    useEffect(() => { run(); }, []);
    useEffect(() => { if (shown >= res.length) return; const t = setTimeout(() => setShown(s => s + 1), 260); return () => clearTimeout(t); }, [shown, res]);
    const vis = res.slice(0, shown), k = vis.reduce((s, v) => s + v, 0), done = shown >= res.length && res.length;
    const q = +(1 - p).toFixed(2);
    const cap = { en: `${res.length} independent Bernoulli trials with p = ${p}: black = success (Xⱼ = 1), white = failure (Xⱼ = 0). Each trial has E(Xⱼ) = p = ${p} and V(Xⱼ) = pq = ${p} × ${q} = ${tr(p * q)}.${done ? ` Here <b>${k}</b> successes: that count is binomial (next section).` : ''}`,
      ar: `دي ${res.length} محاولة Bernoulli مستقلة: الأسود نجاح والأبيض فشل.` + L(`Xⱼ = 1 (success), Xⱼ = 0 (failure)`) + 'ولكل محاولة:' + L(`E(Xⱼ) = p = ${p},  V(Xⱼ) = pq = ${p} × ${q} = ${tr(p * q)}`) + (done ? `وهنا عدد النجاحات <b>${k}</b>، والعدد ده هو الـ binomial (الجزء الجاي).` : '') };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Slide} label="trials n" min="1" max="12" step="1" v=${n} set=${v => setN(v)} />
      <${Slide} label="p" min="0.05" max="0.95" step="0.05" v=${p} set=${v => setP(+v.toFixed(2))} show=${p.toFixed(2)} />
      <div className="mf3-row"><button className="fig-btn solid" onClick=${run}>Run ${n} trial${n > 1 ? 's' : ''}</button></div>
      <div className="mf3-trials" aria-label="Trial results">${vis.map((v, j) => html`<span key=${j + '-' + res.length} className=${j === shown - 1 ? 'new' : ''}><i className=${v ? 's' : ''}></i>${v}</span>`)}</div>
      <${Res} items=${[['successes X =', done ? k : '…'], ['E(Xⱼ) =', tr(p)], ['V(Xⱼ) =', tr(p * q)]]} />
    <//>`;
  }

  /* ── bars for a discrete PMF ── */
  function Bars({ xs, ps, hot, yl = 'p(x)', label, step }) {
    const pmax = Math.max(...ps, 1e-9), y1 = pmax * 1.12, xt = xs.length <= 13 ? xs : ticks(xs[0], xs[xs.length - 1], 5).filter(v => Number.isInteger(v));
    const F = frame({ H: 200, l: 48, x0: xs[0] - 0.7, x1: xs[xs.length - 1] + 0.7, y1, xt, yt: ticks(0, pmax, 3), yl });
    const w = Math.max(2, Math.min(26, (F.sx(1) - F.sx(0)) * 0.7));
    if (step) {
      const G = frame({ H: 200, l: 48, x0: xs[0] - 0.7, x1: xs[xs.length - 1] + 0.7, y1: 1.08, xt, yt: [0, 0.2, 0.4, 0.6, 0.8, 1], yl: 'F(x)' });
      let c = 0;
      return html`<${Svg} F=${G} label=${label}>${xs.map((x, j) => { const c0 = c; c += ps[j]; const nx = j < xs.length - 1 ? xs[j + 1] : G.x1; return html`<g key=${x}><line x1=${G.sx(x)} x2=${G.sx(x)} y1=${G.sy(c0)} y2=${G.sy(c)} stroke=${FAINT} strokeDasharray="3 3" /><line x1=${G.sx(x)} x2=${G.sx(nx)} y1=${G.sy(c)} y2=${G.sy(c)} stroke=${hot(x) ? 'var(--pen)' : K} strokeWidth="3" /><circle cx=${G.sx(x)} cy=${G.sy(c)} r="4" fill=${hot(x) ? 'var(--pen)' : K} /></g>`; })}<//>`;
    }
    return html`<${Svg} F=${F} label=${label}>${xs.map((x, j) => html`<rect key=${x} x=${F.sx(x) - w / 2} y=${F.sy(ps[j])} width=${w} height=${F.sy(0) - F.sy(ps[j])} fill=${hot(x) ? 'var(--pen)' : K} opacity=${hot(x) ? 1 : 0.55} />`)}<//>`;
  }

  /* ── §17–18: binomial explorer, Example 3.5 ── */
  function Binomial({ ar }) {
    const [nS, setN] = useState('50'), [pS, setP] = useState('0.02'), [kS, setK] = useState('2'), [q, setQ] = useState('gt');
    const n = Math.round(num(nS)), p = num(pS), k = Math.round(num(kS));
    const ok = n >= 1 && n <= 100 && p > 0 && p < 1 && k >= 0 && k <= n;
    const ex = nS === '50' && pS === '0.02' && kS === '2';
    let body = null, cap;
    if (!ok) cap = { en: 'Use n from 1 to 100, 0 < p < 1 and k from 0 to n.', ar: 'استخدم n من 1 لـ 100، والـ p بين 0 و 1، والـ k من 0 لحد n.' };
    else {
      const qq = 1 - p, pm = x => choose(n, x) * p ** x * qq ** (n - x);
      const all = Array.from({ length: n + 1 }, (_, x) => x), keep = all.filter(x => x <= k || pm(x) >= 5e-4);
      const xs = keep.length > 41 ? keep.filter(x => pm(x) >= 5e-4 || x <= k).slice(0, 41) : keep;
      const Fk = all.filter(x => x <= k).reduce((s, x) => s + pm(x), 0);
      const terms = k <= 3 ? all.filter(x => x <= k).map(x => fx(pm(x), 4)) : null;
      body = html`<div>
        <${Bars} xs=${xs} ps=${xs.map(pm)} hot=${x => q === 'gt' ? x > k : x <= k} label=${`Binomial PMF, n = ${n}, p = ${p}`} />
        <${Res} items=${[['P(X ≤ ' + k + ') =', fx(Fk, 4)], ['P(X > ' + k + ') =', fx(1 - Fk, 4)], ['E(X) = np =', tr(n * p)], ['V(X) = npq =', tr(n * p * qq)]]} /></div>`;
      const sumTxt = terms ? `${terms.join(' + ')} = ${fx(Fk, 4)}` : fx(Fk, 4);
      cap = { en: `X ~ binomial(n = ${n}, p = ${p}), p(x) = C(${n}, x) pˣ q^(${n} − x). P(X ≤ ${k}) = ${sumTxt}, so P(X > ${k}) = 1 − ${fx(Fk, 4)} = <b>${fx(1 - Fk, 4)}</b>.${ex ? ' Example 3.5: the process is stopped with probability 0.0784; the notes round to 0.364 + 0.372 + 0.186 = 0.92 and 1 − 0.92 = 0.08. E(X) = 50(0.02) = 1, V(X) = 50(0.02)(0.98) = 0.98.' : ` E(X) = np = ${tr(n * p)}, V(X) = npq = ${tr(n * p * qq)}.`}`,
        ar: 'الـ X هنا binomial، ونجمع الاحتمالات لحد k:' + L(`P(X ≤ ${k}) = ${sumTxt}`) + L(`P(X > ${k}) = 1 − ${fx(Fk, 4)} = ${fx(1 - Fk, 4)}`) + (ex ? 'ده مثال 3.5: الـ process بتقف باحتمال 0.0784، والنوتس بتقرّب لـ 0.92 و 0.08. والمتوسط والتباين:' + L('E(X) = 50(0.02) = 1,  V(X) = 50(0.02)(0.98) = 0.98') : 'والمتوسط والتباين:' + L(`E(X) = np = ${tr(n * p)},  V(X) = npq = ${tr(n * p * qq)}`)) };
    }
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row"><button className="fig-btn" aria-pressed=${String(ex)} onClick=${() => { setN('50'); setP('0.02'); setK('2'); setQ('gt'); }}>Example 3.5 (chips)</button></div>
      <div className="mf3-row"><${Num} label="n" v=${nS} set=${setN} step="1" min="1" max="100" /><${Num} label="p" v=${pS} set=${setP} step="0.01" min="0" max="1" /><${Num} label="k" v=${kS} set=${setK} step="1" min="0" /></div>
      <${Modes} list=${[['le', 'P(X ≤ k)'], ['gt', 'P(X > k)']]} mode=${q} set=${setQ} />
      ${body}<//>`;
  }

  /* ── §19–20: geometric, Example 3.6 ── */
  function Geometric({ ar }) {
    const [p, setP] = useState(0.6), [x, setX] = useState(3);
    const q = +(1 - p).toFixed(2), pm = v => q ** (v - 1) * p, xs = Array.from({ length: 10 }, (_, j) => j + 1);
    const ex = p === 0.6 && x === 3;
    const cap = { en: `X = number of trials to the 1st success. {X = ${x}} is ${x - 1} failure${x === 2 ? '' : 's'} then a success: p(${x}) = q^${x - 1}·p = (${q})^${x - 1}(${p}) = <b>${tr(pm(x))}</b>. E(X) = 1/p = ${fx(1 / p, 3)}, V(X) = q/p² = ${fx(q / p / p, 3)}.${ex ? ' Example 3.6: 40% of printers are rejected (q = 0.4, p = 0.6); the first acceptable printer is the third one with probability (0.4)²(0.6) = 0.096, about 10% of cases.' : ''}`,
      ar: `الـ X هي عدد المحاولات لحد أول نجاح. يعني ${x - 1} فشل وبعدين نجاح:` + L(`p(${x}) = q^${x - 1}·p = (${q})^${x - 1}(${p}) = ${tr(pm(x))}`) + L(`E(X) = 1/p = ${fx(1 / p, 3)},  V(X) = q/p² = ${fx(q / p / p, 3)}`) + (ex ? 'ده مثال 3.6: نسبة الرفض 40% في الطابعات، فاحتمال إن أول طابعة مقبولة تكون التالتة 0.096، يعني حوالي 10% من الحالات.' : '') };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row"><button className="fig-btn" aria-pressed=${String(ex)} onClick=${() => { setP(0.6); setX(3); }}>Example 3.6 (printers)</button></div>
      <div className="mf3-trials" aria-label=${`${x - 1} failures then a success`}>${Array.from({ length: x }, (_, j) => html`<span key=${j}><i className=${j === x - 1 ? 's' : ''}></i>${j === x - 1 ? 'S' : 'F'}</span>`)}</div>
      <${Bars} xs=${xs} ps=${xs.map(pm)} hot=${v => v === x} label=${`Geometric PMF, p = ${p}`} />
      <${Slide} label="p" min="0.05" max="0.95" step="0.05" v=${p} set=${v => setP(+v.toFixed(2))} show=${p.toFixed(2)} />
      <${Slide} label="x" min="1" max="10" step="1" v=${x} set=${setX} />
    <//>`;
  }

  /* ── §21–22: Poisson PMF and CDF, repair person beeps ── */
  function Poisson({ ar }) {
    const [a, setA] = useState(2), [x, setX] = useState(3), [q, setQ] = useState('eq'), [view, setView] = useState('pmf');
    const pm = v => a ** v / fact(v) * Math.exp(-a), Fc = v => { let s = 0; for (let j = 0; j <= v; j++) s += pm(j); return s; };
    const top = Math.min(20, Math.max(8, Math.ceil(a + 4 * Math.sqrt(a)))), xs = Array.from({ length: top + 1 }, (_, j) => j), xx = Math.min(x, top);
    const ea = Math.exp(-a);
    let cap;
    if (q === 'eq') cap = { en: `p(${xx}) = α^x e^(−α)/x! = ${tr(a)}^${xx} × ${fx(ea)} / ${xx}! = <b>${fx(pm(xx))}</b>${xx > 0 ? `; from the CDF: F(${xx}) − F(${xx - 1}) = ${fx(Fc(xx))} − ${fx(Fc(xx - 1))}` : ''}.${a === 2 && xx === 3 ? ' Slide 31: three beeps in the next hour, (8)(0.135)/6 = 0.18.' : ''}`, ar: 'احتمال قيمة واحدة من الـ PMF:' + L(`p(${xx}) = ${tr(a)}^${xx} × ${fx(ea)} / ${xx}! = ${fx(pm(xx))}`) + (xx > 0 ? 'ومن الـ CDF:' + L(`F(${xx}) − F(${xx - 1}) = ${fx(Fc(xx))} − ${fx(Fc(xx - 1))}`) : '') + (a === 2 && xx === 3 ? 'وده مثال الـ slide 31: تلت beeps في الساعة الجاية.' : '') };
    else if (q === 'le') cap = { en: `P(X ≤ ${xx}) = F(${xx}) = Σ αⁱe^(−α)/i! for i = 0..${xx} = <b>${fx(Fc(xx))}</b>.`, ar: 'بنجمع الـ PMF من 0 لحد x:' + L(`P(X ≤ ${xx}) = F(${xx}) = ${fx(Fc(xx))}`) };
    else cap = xx === 0 ? { en: 'P(X ≥ 0) = 1.', ar: 'الاحتمال هنا 1 لأن X دايمًا أكبر من أو تساوي 0.' } : { en: `P(X ≥ ${xx}) = 1 − F(${xx - 1}) = 1 − ${fx(Fc(xx - 1))} = <b>${fx(1 - +fx(Fc(xx - 1)))}</b>.${a === 2 && xx === 2 ? ' Slide 31: two or more beeps in an hour, 1 − (0.135 + 0.271) = 0.594 (Question 3-a, January 2026 final).' : ''}`, ar: 'بنطرح من 1 الـ CDF عند القيمة اللي قبلها:' + L(`P(X ≥ ${xx}) = 1 − F(${xx - 1}) = 1 − ${fx(Fc(xx - 1))} = ${fx(1 - +fx(Fc(xx - 1)))}`) + (a === 2 && xx === 2 ? 'وده مثال الـ slide 31: اتنين beeps أو أكتر، وجه في امتحان يناير 2026.' : '') };
    const hot = v => q === 'eq' ? v === xx : q === 'le' ? v <= xx : v >= xx;
    const setEx = (qq, v) => { setA(2); setQ(qq); setX(v); };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row"><span>Beeps (α = 2):</span><button className="fig-btn" aria-pressed=${String(a === 2 && q === 'eq' && xx === 3)} onClick=${() => setEx('eq', 3)}>p(3)</button><button className="fig-btn" aria-pressed=${String(a === 2 && q === 'ge' && xx === 2)} onClick=${() => setEx('ge', 2)}>2 or more</button></div>
      <${Modes} list=${[['pmf', '(a) PMF'], ['cdf', '(b) CDF']]} mode=${view} set=${setView} />
      <${Bars} xs=${xs} ps=${xs.map(pm)} hot=${hot} step=${view === 'cdf'} label=${`Poisson ${view.toUpperCase()}, alpha = ${a}`} />
      <div className="mf3-row"><select className="mf3-sel" value=${q} onChange=${e => setQ(e.target.value)} aria-label="Probability to find"><option value="eq">P(X = x)</option><option value="le">P(X ≤ x)</option><option value="ge">P(X ≥ x)</option></select></div>
      <${Slide} label="α" min="0.5" max="8" step="0.5" v=${a} set=${setA} />
      <${Slide} label="x" min="0" max=${top} step="1" v=${xx} set=${setX} />
      <${Res} items=${[['E(X) = V(X) = α =', tr(a)]]} />
    <//>`;
  }

  /* ── a PDF chart above its CDF chart ── */
  function PdfCdf({ f, Fc, x0, x1, lo, hi, ymax, label, xl = 'x' }) {
    const xt = ticks(x0, x1, 5), A = frame({ H: 170, x0, x1, y1: ymax * 1.1, xt, yt: ticks(0, ymax, 3), yl: 'f(x)', xl }), B = frame({ H: 160, x0, x1, y1: 1.08, xt, yt: [0, 0.5, 1], yl: 'F(x)', xl });
    return html`<div>
      <${Svg} F=${A} label=${label + ' PDF'}><path d=${area(f, lo, hi, A)} fill=${AREA} /><path d=${curve(f, x0, x1, A, 200)} fill="none" stroke=${K} strokeWidth="3" /><//>
      <${Svg} F=${B} label=${label + ' CDF'}><line x1=${B.sx(x0)} x2=${B.sx(x1)} y1=${B.sy(1)} y2=${B.sy(1)} stroke="var(--graphite)" strokeDasharray="5 5" /><path d=${curve(Fc, x0, x1, B, 200)} fill="none" stroke=${K} strokeWidth="3" />
        ${[lo, hi].map((x, j) => html`<circle key=${j} cx=${B.sx(x)} cy=${B.sy(Fc(x))} r="5" fill="var(--pen)" />`)}
        <line x1=${B.l + 5} x2=${B.l + 5} y1=${B.sy(Fc(lo))} y2=${B.sy(Fc(hi))} stroke="var(--pen)" strokeWidth="5" /><//></div>`;
  }

  /* ── §23: uniform U(a, b) ── */
  function Uniform({ ar }) {
    const [aS, setA] = useState('1'), [bS, setB] = useState('6'), [u, setU] = useState([2, 4]);
    const a = num(aS), b = num(bS), ok = isFinite(a) && isFinite(b) && b > a;
    let cap, body = null;
    if (!ok) cap = { en: 'Use a < b.', ar: 'لازم a تكون أصغر من b.' };
    else {
      const x1 = a + u[0] / 10 * (b - a), x2 = a + u[1] / 10 * (b - a), lo = Math.min(x1, x2), hi = Math.max(x1, x2);
      const f = x => (x >= a && x <= b ? 1 / (b - a) : 0), Fc = x => (x < a ? 0 : x >= b ? 1 : (x - a) / (b - a)), pad = (b - a) * 0.2;
      body = html`<div><${PdfCdf} f=${f} Fc=${Fc} x0=${a - pad} x1=${b + pad} lo=${lo} hi=${hi} ymax=${1 / (b - a)} label=${`Uniform(${a}, ${b})`} />
        <${Slide} label="x₁" min="0" max="10" step="1" v=${u[0]} set=${v => setU([v, u[1]])} show=${tr(x1)} />
        <${Slide} label="x₂" min="0" max="10" step="1" v=${u[1]} set=${v => setU([u[0], v])} show=${tr(x2)} />
        <${Res} items=${[['f(x) = 1/(b − a) =', tr(1 / (b - a))], ['E(X) = (a + b)/2 =', tr((a + b) / 2)], ['V(X) = (b − a)²/12 =', tr((b - a) ** 2 / 12)]]} /></div>`;
      cap = { en: `U(${a}, ${b}): the PDF is flat at 1/(b − a) = ${tr(1 / (b - a))} and the CDF is a straight line from 0 at x = ${a} to 1 at x = ${b}. P(${tr(lo)} < X < ${tr(hi)}) = (x₂ − x₁)/(b − a) = ${tr(hi - lo)}/${tr(b - a)} = <b>${fx((hi - lo) / (b - a))}</b>: proportional to the length of the interval.`,
        ar: `الـ PDF مسطحة عند ارتفاع ${tr(1 / (b - a))}، والـ CDF خط مستقيم من 0 لـ 1. والاحتمال متناسب مع طول الفترة:` + L(`P(${tr(lo)} < X < ${tr(hi)}) = (x₂ − x₁)/(b − a) = ${tr(hi - lo)}/${tr(b - a)} = ${fx((hi - lo) / (b - a))}`) };
    }
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row"><button className="fig-btn" aria-pressed=${String(aS === '1' && bS === '6')} onClick=${() => { setA('1'); setB('6'); }}>Slide 34: U(1, 6)</button></div>
      <div className="mf3-row"><${Num} label="a" v=${aS} set=${setA} /><${Num} label="b" v=${bS} set=${setB} /></div>${body}<//>`;
  }

  /* ── §24 Example 3.8: waiting for a bus ── */
  function Bus({ ar }) {
    const steps = [
      { en: 'A bus arrives every 20 minutes from 6:40 am to 8:40 am. Around the passenger: buses at 7:00, 7:20 and 7:40.', ar: 'الأتوبيس بييجي كل 20 دقيقة من <bdi dir="ltr">6:40</bdi> لحد <bdi dir="ltr">8:40</bdi>، فحوالين الراكب فيه أتوبيسات الساعة <bdi dir="ltr">7:00</bdi> و <bdi dir="ltr">7:20</bdi> و <bdi dir="ltr">7:40</bdi>.' },
      { en: 'The passenger arrives uniformly between 7:00 and 7:30. X = minutes past 7 am, X ~ U(0, 30).', ar: 'الراكب بيوصل في أي لحظة بين <bdi dir="ltr">7:00</bdi> و <bdi dir="ltr">7:30</bdi> بنفس الاحتمال. لو X عدد الدقايق بعد الساعة 7 يبقى' + L('X ~ U(0, 30)') },
      { en: 'Arriving between 7:00 and 7:15 (0 < X < 15), the next bus is 7:20: the wait is more than 5 minutes.', ar: 'لو وصل بين <bdi dir="ltr">7:00</bdi> و <bdi dir="ltr">7:15</bdi> الأتوبيس الجاي <bdi dir="ltr">7:20</bdi>، يعني هيستنى أكتر من 5 دقايق.' },
      { en: 'Arriving between 7:20 and 7:30 (20 < X < 30), the next bus is 7:40: again more than 5 minutes.', ar: 'ولو وصل بين <bdi dir="ltr">7:20</bdi> و <bdi dir="ltr">7:30</bdi> الأتوبيس الجاي <bdi dir="ltr">7:40</bdi>، وبرضه هيستنى أكتر من 5 دقايق.' },
      { en: 'P = P(0 < X < 15) + P(20 < X < 30) = 15/30 − 0 + 1 − 20/30 = <b>5/6</b>.', ar: 'الاحتمال الكلي:' + L('P = F(15) − F(0) + F(30) − F(20) = 15/30 − 0 + 1 − 20/30 = 5/6') }
    ];
    const [i, ctl] = useSteps(steps.length, 2700);
    const [t, setT] = useState(10);
    const W = 300, sx = m => 22 + m * 6.4, y = 92;
    const nxt = Math.ceil(t / 20 - 1e-9) * 20, wait = nxt - t;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <svg viewBox="0 0 300 150" role="img" aria-label="Bus times and the passenger's arrival window">
        <rect x=${sx(0)} y=${y - 18} width=${sx(30) - sx(0)} height="18" fill=${AREA} className=${pop(i >= 1)} />
        <rect x=${sx(0)} y=${y - 18} width=${sx(15) - sx(0)} height="18" fill="var(--pen)" opacity=".55" className=${pop(i >= 2)} />
        <rect x=${sx(20)} y=${y - 18} width=${sx(30) - sx(20)} height="18" fill="var(--pen)" opacity=".55" className=${pop(i >= 3)} />
        <line x1=${sx(0) - 12} x2=${sx(40) + 8} y1=${y} y2=${y} stroke="var(--graphite)" strokeWidth="1.5" />
        ${[0, 20, 40].map(m => html`<g key=${m}><rect x=${sx(m) - 13} y="22" width="26" height="16" rx="4" fill=${K} /><text x=${sx(m)} y="16" textAnchor="middle" fontSize="15">7:${m === 0 ? '00' : m}</text><line x1=${sx(m)} x2=${sx(m)} y1="38" y2=${y} stroke=${K} strokeWidth="2" strokeDasharray="4 3" /></g>`)}
        ${[0, 15, 20, 30, 40].map(m => html`<g key=${'t' + m}><line x1=${sx(m)} x2=${sx(m)} y1=${y} y2=${y + 5} stroke="var(--graphite)" /><text x=${sx(m)} y=${y + 22} textAnchor="middle" fontSize="15">${m}</text></g>`)}
        <text x=${sx(40) + 8} y=${y + 44} textAnchor="end" fontSize="15" fontStyle="italic">minutes past 7</text>
        <circle cx=${sx(t)} cy=${y - 9} r="6" fill="var(--ink)" />
        <path d=${`M${sx(t)},${y - 30} H${sx(nxt)}`} stroke="var(--ok)" strokeWidth="3" fill="none" />
      </svg>
      <${Slide} label="passenger X" min="0" max="30" step="0.5" v=${t} set=${setT} show=${tr(t)} />
      <p className="mf3-note">wait = ${tr(nxt)} − ${tr(t)} = <b>${tr(wait)}</b> min ${wait > 5 ? '(more than 5)' : '(5 or less)'}</p>
    <//>`;
  }

  /* ── §25–26: exponential, Example 3.9 lamp ── */
  function Exponential({ ar }) {
    const [lam, setLam] = useState(1 / 3), [q, setQ] = useState('gt'), [a, setA] = useState(3), [b, setB] = useState(3);
    const third = Math.abs(lam - 1 / 3) < 1e-9, ls = third ? '1/3' : tr(lam);
    const x1 = Math.min(15, Math.max(3, Math.ceil(4.6 / lam))), lo = q === 'gt' ? a : Math.min(a, b), hi = q === 'gt' ? x1 : Math.max(a, b);
    const f = x => lam * Math.exp(-lam * x), Fc = x => 1 - Math.exp(-lam * x);
    let cap;
    if (q === 'gt') cap = { en: `P(X > ${tr(a)}) = 1 − F(${tr(a)}) = e^(−λx) = e^(−${ls} × ${tr(a)}) = <b>${fx(Math.exp(-lam * a))}</b>.${third && a === 3 ? ' Example 3.9: the lamp lasts longer than its mean life of 3000 hours with probability e⁻¹ = 0.368.' : ''}`, ar: 'احتمال إنه يعيش أكتر من x:' + L(`P(X > ${tr(a)}) = 1 − F(${tr(a)}) = e^(−${ls} × ${tr(a)}) = ${fx(Math.exp(-lam * a))}`) + (third && a === 3 ? 'وده مثال 3.9: اللمبة تعيش أكتر من متوسط عمرها 3000 ساعة.' : '') };
    else { const ta = Math.exp(-lam * lo), tb = Math.exp(-lam * hi), d = +fx(ta) - +fx(tb); cap = { en: `P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) − F(${tr(lo)}) = e^(−λ·${tr(lo)}) − e^(−λ·${tr(hi)}) = ${fx(ta)} − ${fx(tb)} = <b>${fx(d)}</b>.${third && lo === 2 && hi === 3 ? ' Example 3.9: the lamp lasts between 2000 and 3000 hours, −0.368 + 0.513 = 0.145.' : ''}`, ar: 'الاحتمال بين قيمتين:' + L(`P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) − F(${tr(lo)}) = ${fx(ta)} − ${fx(tb)} = ${fx(d)}`) + (third && lo === 2 && hi === 3 ? 'وده مثال 3.9: اللمبة تعيش بين 2000 و 3000 ساعة.' : '') }; }
    const go = (qq, x, y) => { setLam(1 / 3); setQ(qq); setA(x); setB(y); };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row"><span>Lamp, λ = 1/3:</span><button className="fig-btn" aria-pressed=${String(third && q === 'gt' && a === 3)} onClick=${() => go('gt', 3, 3)}>P(X > 3)</button><button className="fig-btn" aria-pressed=${String(third && q === 'bt' && lo === 2 && hi === 3)} onClick=${() => go('bt', 2, 3)}>P(2 ≤ X ≤ 3)</button></div>
      <${Modes} list=${[['gt', 'P(X > a)'], ['bt', 'P(a ≤ X ≤ b)']]} mode=${q} set=${setQ} />
      <${PdfCdf} f=${f} Fc=${Fc} x0=${0} x1=${x1} lo=${Math.min(lo, x1)} hi=${Math.min(hi, x1)} ymax=${lam} label=${`Exponential, lambda = ${ls}`} />
      <${Slide} label="λ" min="0.1" max="2" step="0.05" v=${+lam.toFixed(2)} set=${v => setLam(v)} show=${ls} />
      <${Slide} label="a" min="0" max=${x1} step="0.5" v=${a} set=${setA} show=${tr(a)} />
      ${q === 'bt' && html`<${Slide} label="b" min="0" max=${x1} step="0.5" v=${b} set=${setB} show=${tr(b)} />`}
      <${Res} items=${[['E(X) = 1/λ =', tr(1 / lam)], ['V(X) = 1/λ² =', tr(1 / lam / lam)]]} />
    <//>`;
  }

  /* ── §25 slide 36: several exponential PDFs ── */
  const LAMS = [2, 1.5, 1, 0.5];
  function ExpFamily({ ar }) {
    const steps = [
      ...LAMS.map(l => ({ en: `λ = ${l}: f(x) = ${l}e^(−${l}x). It meets the vertical axis at <b>${l}</b>, the value of λ.`, ar: `لما λ تساوي ${l} المنحنى بيقطع المحور الرأسي عند <b>${l}</b>، يعني عند قيمة λ نفسها.` })),
      { en: 'For every exponential PDF the intercept on the vertical axis is λ, and all the PDFs eventually intersect.', ar: 'في كل الـ exponential PDFs نقطة التقاطع مع المحور الرأسي هي λ، وكل المنحنيات في الآخر بتتقاطع مع بعض.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    const F = frame({ H: 220, x0: 0, x1: 3, y1: 2.15, xt: [0, 1, 2, 3], yt: [0, 0.5, 1, 1.5, 2], yl: 'f(x)' });
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${F} label="Exponential PDFs for lambda 0.5, 1, 1.5 and 2">
        ${LAMS.map((l, j) => { const on = i === j || i === 4; return html`<g key=${l}><path d=${curve(x => l * Math.exp(-l * x), 0, 3, F)} fill="none" stroke=${on ? (i === 4 ? K : 'var(--pen)') : FAINT} strokeWidth=${on ? 3 : 2} />
          ${on && html`<g><circle cx=${F.sx(0)} cy=${F.sy(l)} r="5" fill="var(--pen)" />${i < 4 && html`<text x=${F.sx(0.12)} y=${F.sy(l) + 5} fontSize="15">λ = ${l}</text>`}</g>`}</g>`; })}
      <//><//>`;
  }

  /* ── §27: normal shape and Z ── */
  function NormalShape({ ar }) {
    const steps = [
      { en: 'X ~ N(μ, σ²): a bell-shaped curve centred at μ.', ar: 'الـ normal distribution شكلها جرس متمركز عند μ.' + L('X ~ N(μ, σ²)') },
      { en: '(1) f(x) → 0 as x → −∞ and as x → ∞: both tails approach the axis.', ar: '(1) الـ <bdi dir="ltr">f(x)</bdi> بتقرب من 0 في الناحيتين، يعني الطرفين بيقربوا من المحور.' },
      { en: '(2) f(μ − x) = f(μ + x): the PDF is <b>symmetric about μ</b> (the two dots have the same height).', ar: '(2) الـ PDF <b>متماثلة حوالين μ</b>، والنقطتين ليهم نفس الارتفاع:' + L('f(μ − x) = f(μ + x)') },
      { en: '(3) The maximum of the PDF is at x = μ, so <b>the mean and the mode are equal</b>.', ar: '(3) أعلى نقطة في الـ PDF عند μ، يعني <b>الـ mean بيساوي الـ mode</b>.' },
      { en: 'No closed form: use the standard normal Z = (X − μ)/σ ~ N(0, 1). The lower scale shows μ − σ, μ, μ + σ becoming −1, 0, 1.', ar: 'مفيش closed form، فبنحوّل للـ standard normal:' + L('Z = (X − μ)/σ ~ N(0, 1)') + 'والسطر اللي تحت بيوضح التحويل ده:' + L('μ − σ, μ, μ + σ  →  −1, 0, 1') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const F = frame({ H: 220, l: 20, b: 58, x0: -2.7, x1: 2.7, y1: 0.45, xt: [-1, 0, 1], xf: v => (v === 0 ? 'μ' : v < 0 ? 'μ − σ' : 'μ + σ'), xl: '' });
    const f = npdf(0, 1), d = 1.6;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${F} label="Normal PDF centred at mu">
        <path d=${curve(f, -2.7, 2.7, F)} fill="none" stroke=${K} strokeWidth="3" />
        <g className=${pop(i === 1)}><text x=${F.sx(-2.65)} y=${F.sy(0) - 12} fontSize="15">→ 0</text><text x=${F.sx(2.65)} y=${F.sy(0) - 12} textAnchor="end" fontSize="15">0 ←</text></g>
        <g className=${pop(i === 2)}>${[-d, d].map(x => html`<g key=${x}><line x1=${F.sx(x)} x2=${F.sx(x)} y1=${F.sy(0)} y2=${F.sy(f(x))} stroke="var(--pen)" strokeWidth="2" /><circle cx=${F.sx(x)} cy=${F.sy(f(x))} r="5" fill="var(--pen)" /></g>`)}
          <line x1=${F.sx(-d)} x2=${F.sx(d)} y1=${F.sy(f(d))} y2=${F.sy(f(d))} stroke="var(--pen)" strokeDasharray="4 4" /></g>
        <g className=${pop(i === 3)}><line x1=${F.sx(0)} x2=${F.sx(0)} y1=${F.sy(0)} y2=${F.sy(f(0))} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" /><circle cx=${F.sx(0)} cy=${F.sy(f(0))} r="5" fill="var(--pen)" /><text x=${F.sx(0.25)} y=${F.sy(f(0)) + 2} fontSize="15">mean = mode</text></g>
        <g className=${pop(i === 4)}>${[-1, 0, 1].map(z => html`<text key=${z} x=${F.sx(z)} y=${F.H - 12} textAnchor="middle" fontSize="15" fill="var(--pen)" style=${{ fill: 'var(--pen)' }}>${z === 0 ? '0' : z < 0 ? '−1' : '1'}</text>`)}<text x=${F.sx(-2.65)} y=${F.H - 12} fontSize="15" style=${{ fill: 'var(--pen)' }}>z:</text></g>
      <//><//>`;
  }

  /* ── §28: normal probabilities (vessel loading, Examples 3.10 and 3.12) ── */
  const NEX = [
    { k: 'vessel', t: 'Vessel', mu: '12', sd: '2', q: 'le', x1: '10', x2: '' },
    { k: 'e310', t: 'Ex 3.10', mu: '50', sd: '3', q: 'le', x1: '56', x2: '' },
    { k: 'e312', t: 'Ex 3.12', mu: '15', sd: '3', q: 'bt', x1: '14', x2: '17' }
  ];
  function Normal({ ar }) {
    const [s, setS] = useState(NEX[0]);
    const up = k => v => setS(o => ({ ...o, [k]: v }));
    const mu = num(s.mu), sd = num(s.sd), x1 = num(s.x1), x2 = num(s.x2), bt = s.q === 'bt';
    const exk = (NEX.find(e => ['mu', 'sd', 'q', 'x1'].every(k => e[k] === s[k]) && (!bt || e.x2 === s.x2)) || {}).k;
    const ok = isFinite(mu) && sd > 0 && isFinite(x1) && (!bt || isFinite(x2));
    let cap, body = null;
    if (!ok) cap = { en: 'Enter μ, σ > 0 and the x value(s).', ar: 'اكتب μ و σ أكبر من 0 وقيم x.' };
    else {
      const lo = bt ? Math.min(x1, x2) : mu - 4 * sd, hi = bt ? Math.max(x1, x2) : x1;
      const z1 = (x1 - mu) / sd, zs = z => tr(+z.toFixed(3)).replace('-', '−'), P1 = Phi(z1);
      const F = frame({ H: 220, l: 20, b: 56, x0: mu - 4 * sd, x1: mu + 4 * sd, y1: 0.44 / sd, xt: [-2, -1, 0, 1, 2].map(k => mu + k * sd), xl: '' });
      const f = npdf(mu, sd);
      body = html`<${Svg} F=${F} label="Normal PDF with the probability shaded">
        <path d=${area(f, Math.max(lo, F.x0), Math.min(hi, F.x1), F)} fill=${AREA} /><path d=${curve(f, F.x0, F.x1, F, 200)} fill="none" stroke=${K} strokeWidth="3" />
        ${[-2, -1, 0, 1, 2].map(k => html`<text key=${k} x=${F.sx(mu + k * sd)} y=${F.H - 12} textAnchor="middle" fontSize="15" style=${{ fill: 'var(--pen)' }}>${k < 0 ? '−' + -k : k}</text>`)}
        <text x=${F.sx(mu - 3.9 * sd)} y=${F.H - 12} fontSize="15" style=${{ fill: 'var(--pen)' }}>z:</text>
        <text x=${F.sx(mu - 3.9 * sd)} y=${F.H - 36} fontSize="15">x:</text>
      <//>`;
      if (!bt) {
        const sym = z1 < 0, Pp = sym ? 1 - +fx(Phi(-z1), 4) : P1;
        cap = { en: `F(${tr(x1)}) = Φ((${tr(x1)} − ${tr(mu)})/${tr(sd)}) = Φ(${zs(z1)})${sym ? ` = 1 − Φ(${zs(-z1)}) = 1 − ${fx(Phi(-z1), 4)}` : ''} = <b>${fx(Pp, 4)}</b>.${exk === 'vessel' ? ' Slide 39: the vessel is loaded in less than 10 hours with probability 0.1587; by symmetry Φ(−1) = 1 − Φ(1).' : exk === 'e310' ? ' Example 3.10: 56 is 2σ above the mean, Φ(2) = 0.9772 (Table A.3).' : ''}`,
          ar: 'بنحوّل لـ z وبعدين نجيب Φ:' + L(`F(${tr(x1)}) = Φ((${tr(x1)} − ${tr(mu)})/${tr(sd)}) = Φ(${zs(z1)})${sym ? ` = 1 − Φ(${zs(-z1)}) = 1 − ${fx(Phi(-z1), 4)}` : ''} = ${fx(Pp, 4)}`) + (exk === 'vessel' ? 'وده مثال الـ slide 39: تحميل السفينة في أقل من 10 ساعات، واستخدمنا الـ symmetry.' : exk === 'e310' ? 'وده مثال 3.10: القيمة 56 أعلى من المتوسط بـ 2σ.' : '') };
      } else {
        const za = (lo - mu) / sd, zb = (hi - mu) / sd, pa = fx(Phi(za), 4), pb = fx(Phi(zb), 4);
        cap = { en: `P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = F(${tr(hi)}) − F(${tr(lo)}) = Φ(${zs(zb)}) − Φ(${zs(za)}) = ${pb} − ${pa} = <b>${fx(+pb - +pa, 4)}</b>.${exk === 'e312' ? ' Example 3.12 (cafeteria queue, N(15, 9)): the notes give 0.3780 from the table; Φ computed exactly gives 0.3781.' : ''}`,
          ar: 'الفرق بين قيمتين Φ:' + L(`P(${tr(lo)} ≤ X ≤ ${tr(hi)}) = Φ(${zs(zb)}) − Φ(${zs(za)}) = ${pb} − ${pa} = ${fx(+pb - +pa, 4)}`) + (exk === 'e312' ? 'وده مثال 3.12 (طابور الكافيتريا): النوتس كاتبة 0.3780 من الجدول، والحساب المظبوط بيدي 0.3781.' : '') };
      }
    }
    return html`<${Fig} ar=${ar} cap=${cap}>
      <div className="mf3-row">${NEX.map(e => html`<button key=${e.k} className="fig-btn" aria-pressed=${String(exk === e.k)} onClick=${() => setS(e)}>${e.t}</button>`)}</div>
      <div className="mf3-row"><${Num} label="μ" v=${s.mu} set=${up('mu')} /><${Num} label="σ" v=${s.sd} set=${up('sd')} /></div>
      <${Modes} list=${[['le', 'P(X ≤ x)'], ['bt', 'P(x₁ ≤ X ≤ x₂)']]} mode=${s.q} set=${up('q')} />
      <div className="mf3-row"><${Num} label=${bt ? 'x₁' : 'x'} v=${s.x1} set=${up('x1')} />${bt && html`<${Num} label="x₂" v=${s.x2} set=${up('x2')} />`}</div>
      ${body}<//>`;
  }

  /* ── §29: Weibull, triangular, lognormal ── */
  function MoreDists({ ar }) {
    const [tab, setTab] = useState('w');
    const [w, setW] = useState({ nu: '1.34', al: '0.04', be: '0.5', x: '1.5' });
    const [t, setT] = useState({ a: '0.05', b: '1.1', c: '6.5', x: '2.5' });
    const [g, setG] = useState({ mu: '0', s2: '0.25' });
    let body = null, cap, row, exBtn;
    if (tab === 'w') {
      const nu = num(w.nu), al = num(w.al), be = num(w.be), x = num(w.x), ok = isFinite(nu) && al > 0 && be > 0 && isFinite(x);
      const ex = w.nu === '1.34' && w.al === '0.04' && w.be === '0.5' && w.x === '1.5';
      exBtn = html`<button className="fig-btn" aria-pressed=${String(ex)} onClick=${() => setW({ nu: '1.34', al: '0.04', be: '0.5', x: '1.5' })}>Example 3.13 (aircraft)</button>`;
      row = html`<div className="mf3-row"><${Num} label="ν" v=${w.nu} set=${v => setW({ ...w, nu: v })} /><${Num} label="α" v=${w.al} set=${v => setW({ ...w, al: v })} /><${Num} label="β" v=${w.be} set=${v => setW({ ...w, be: v })} /><${Num} label="x" v=${w.x} set=${v => setW({ ...w, x: v })} /></div>`;
      if (!ok) cap = { en: 'Use α > 0 and β > 0.', ar: 'لازم α و β يكونوا أكبر من 0.' };
      else {
        const Fc = v => v <= nu ? 0 : 1 - Math.exp(-(((v - nu) / al) ** be)), inner = Math.max(0, (x - nu) / al), pw = inner ** be;
        const x1 = nu + al * (-Math.log(0.02)) ** (1 / be), X1 = Math.max(x1, x + al * 0.2);
        const F = frame({ H: 190, x0: nu, x1: X1, y1: 1.08, xt: ticks(nu, X1, 3), yt: [0, 0.5, 1], yl: 'F(x)' });
        const E = nu + al * gammaF(1 / be + 1), V = al * al * (gammaF(2 / be + 1) - gammaF(1 / be + 1) ** 2);
        body = html`<div><${Svg} F=${F} label="Weibull CDF"><path d=${curve(Fc, nu, X1, F, 200)} fill="none" stroke=${K} strokeWidth="3" />
          <line x1=${F.sx(Math.min(x, X1))} x2=${F.sx(Math.min(x, X1))} y1=${F.sy(0)} y2=${F.sy(Fc(x))} stroke="var(--pen)" strokeDasharray="4 4" /><circle cx=${F.sx(Math.min(x, X1))} cy=${F.sy(Fc(x))} r="5" fill="var(--pen)" /><//>
          <${Res} items=${[['F(x) = P(X ≤ x) =', fx(Fc(x))], ['P(X > x) =', fx(1 - Fc(x))], ['E(X) =', fx(E)], ['V(X) =', fx(V, 4)]]} /></div>`;
        cap = { en: `Weibull CDF F(x) = 1 − exp[−((x − ν)/α)^β]. ((${tr(x)} − ${tr(nu)})/${tr(al)})^${tr(be)} = ${tr(inner)}^${tr(be)} = ${tr(pw)}, so F(${tr(x)}) = 1 − e^(−${tr(pw)}) = <b>${fx(Fc(x))}</b> and P(X > ${tr(x)}) = <b>${fx(1 - Fc(x))}</b>. E(X) = ν + αΓ(1/β + 1).${ex ? ' Example 3.13: the notes write P(X > 1.5) = 1 − e⁻² = 0.865 ‡; with this CDF 0.865 is F(1.5) = P(X ≤ 1.5), and P(X > 1.5) = e⁻² = 0.135.' : ''}`,
          ar: 'الـ Weibull CDF:' + L(`F(${tr(x)}) = 1 − exp[−((${tr(x)} − ${tr(nu)})/${tr(al)})^${tr(be)}] = 1 − e^(−${tr(pw)}) = ${fx(Fc(x))}`) + L(`P(X > ${tr(x)}) = ${fx(1 - Fc(x))}`) + (ex ? 'ده مثال 3.13: النوتس كاتبة إن 0.865 هي احتمال أكبر من 1.5 ‡، بس بالـ CDF دي 0.865 هي <bdi dir="ltr">F(1.5)</bdi> يعني أقل من أو يساوي، والاحتمال الأكبر من 1.5 هو 0.135.' : '') };
      }
    } else if (tab === 't') {
      const a = num(t.a), b = num(t.b), c = num(t.c), x = num(t.x), ok = isFinite(a + b + c + x) && a <= b && b <= c && c > a;
      const ex = t.a === '0.05' && t.b === '1.1' && t.c === '6.5' && t.x === '2.5';
      exBtn = html`<button className="fig-btn" aria-pressed=${String(ex)} onClick=${() => setT({ a: '0.05', b: '1.1', c: '6.5', x: '2.5' })}>Example 3.14 (CPU)</button>`;
      row = html`<div className="mf3-row"><${Num} label="a" v=${t.a} set=${v => setT({ ...t, a: v })} /><${Num} label="b" v=${t.b} set=${v => setT({ ...t, b: v })} /><${Num} label="c" v=${t.c} set=${v => setT({ ...t, c: v })} /><${Num} label="x" v=${t.x} set=${v => setT({ ...t, x: v })} /></div>`;
      if (!ok) cap = { en: 'Use a ≤ b ≤ c with a < c.', ar: 'لازم a أصغر من أو تساوي b، و b أصغر من أو تساوي c.' };
      else {
        const f = v => v < a || v > c ? 0 : v <= b ? (b > a ? 2 * (v - a) / ((b - a) * (c - a)) : 2 / (c - a)) : 2 * (c - v) / ((c - b) * (c - a));
        const Fc = v => v <= a ? 0 : v <= b ? (v - a) ** 2 / ((b - a) * (c - a)) : v < c ? 1 - (c - v) ** 2 / ((c - b) * (c - a)) : 1;
        const F = frame({ H: 200, x0: a, x1: c, y1: 2.2 / (c - a), xt: [a, b, c], yt: [0, 2 / (c - a)], yf: v => fx(v), yl: 'f(x)' });
        const xc = Math.max(a, Math.min(c, x));
        body = html`<div><${Svg} F=${F} label="Triangular PDF with the area up to x shaded"><path d=${area(f, a, xc, F)} fill=${AREA} /><path d=${`M${F.sx(a)},${F.sy(0)}L${F.sx(b)},${F.sy(2 / (c - a))}L${F.sx(c)},${F.sy(0)}`} fill="none" stroke=${K} strokeWidth="3" />
          <line x1=${F.sx(xc)} x2=${F.sx(xc)} y1=${F.sy(0)} y2=${F.sy(f(xc))} stroke="var(--pen)" strokeWidth="2" /><//>
          <${Res} items=${[['F(x) =', fx(Fc(x))], ['mode = b =', tr(b)], ['E(X) = (a + b + c)/3 =', fx((a + b + c) / 3)]]} /></div>`;
        const br = x <= a ? { en: `x ≤ a, so F(x) = 0.`, ar: 'الـ x أصغر من أو تساوي a، يبقى' + L('F(x) = 0') } : x <= b ? { en: `a < x ≤ b, so F(x) = (x − a)²/((b − a)(c − a)) = ${fx((x - a) ** 2, 4)}/${fx((b - a) * (c - a), 2)} = <b>${fx(Fc(x))}</b>.`, ar: 'الـ x بين a و b، يبقى' + L(`F(x) = (x − a)²/((b − a)(c − a)) = ${fx((x - a) ** 2, 4)}/${fx((b - a) * (c - a), 2)} = ${fx(Fc(x))}`) } : x < c ? { en: `b < x ≤ c, so F(x) = 1 − (c − x)²/((c − b)(c − a)) = 1 − ${tr((c - x) ** 2)}/${fx((c - b) * (c - a), 2)} = <b>${fx(Fc(x))}</b>.`, ar: 'الـ x بين b و c، يبقى' + L(`F(x) = 1 − (c − x)²/((c − b)(c − a)) = 1 − ${tr((c - x) ** 2)}/${fx((c - b) * (c - a), 2)} = ${fx(Fc(x))}`) } : { en: 'x ≥ c, so F(x) = 1.', ar: 'الـ x أكبر من أو تساوي c، يبقى' + L('F(x) = 1') };
        cap = { en: `Triangular: the mode is at b and the peak height is 2/(c − a) = ${fx(2 / (c - a))}. ${br.en}${ex ? ' Example 3.14: 1.1 < 2.5 ≤ 6.5, 1 − 16/34.83 = 0.541.' : ''}`, ar: `الـ triangular الـ mode بتاعه عند b، وأعلى ارتفاع ${fx(2 / (c - a))}. ` + br.ar + (ex ? 'وده مثال 3.14 بالظبط.' : '') };
      }
    } else {
      const mu = num(g.mu), s2 = num(g.s2), ok = isFinite(mu) && s2 > 0;
      exBtn = html`<span>(the notes give no worked example)</span>`;
      row = html`<div className="mf3-row"><${Num} label="μ" v=${g.mu} set=${v => setG({ ...g, mu: v })} /><${Num} label="σ²" v=${g.s2} set=${v => setG({ ...g, s2: v })} /></div>`;
      if (!ok) cap = { en: 'Use σ² > 0.', ar: 'لازم σ² تكون أكبر من 0.' };
      else {
        const s = Math.sqrt(s2), f = x => x <= 0 ? 0 : Math.exp(-((Math.log(x) - mu) ** 2) / (2 * s2)) / (Math.sqrt(2 * Math.PI) * s * x);
        const E = Math.exp(mu + s2 / 2), V = Math.exp(2 * mu + s2) * (Math.exp(s2) - 1), X1 = Math.exp(mu + 2.6 * s);
        let m = 0; for (let k = 1; k <= 300; k++) m = Math.max(m, f(X1 * k / 300));
        const F = frame({ H: 200, x0: 0, x1: X1, y1: m * 1.12, xt: ticks(0, X1, 4), yt: ticks(0, m, 3), yl: 'f(x)' });
        body = html`<div><${Svg} F=${F} label="Lognormal PDF"><path d=${curve(f, X1 / 400, X1, F, 240)} fill="none" stroke=${K} strokeWidth="3" />
          ${E <= X1 && html`<g><line x1=${F.sx(E)} x2=${F.sx(E)} y1=${F.sy(0)} y2=${F.sy(f(E))} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" /><text x=${F.sx(E) + 5} y=${F.sy(f(E)) - 6} fontSize="15">E(X)</text></g>`}<//>
          <${Res} items=${[['E(X) = e^(μ + σ²/2) =', fx(E)], ['V(X) ‡ =', fx(V)]]} /></div>`;
        cap = { en: `If Y ~ N(μ, σ²) then X = e^Y is lognormal with parameters μ = ${tr(mu)} and σ² = ${tr(s2)}, which are <b>not</b> the mean and variance of X: E(X) = e^(μ + σ²/2) = <b>${fx(E)}</b>. The notes leave V(X) blank ‡; the standard result e^(2μ+σ²)(e^(σ²) − 1) gives ${fx(V)}.`,
          ar: 'لو Y موزعة normal يبقى المتغير' + L('X = e^Y') + 'موزع lognormal بنفس الـ parameters، بس دول <b>مش</b> المتوسط والتباين بتوع X:' + L(`E(X) = e^(μ + σ²/2) = ${fx(E)}`) + 'والنوتس سايبة الـ <bdi dir="ltr">V(X)</bdi> فاضية ‡، والقانون المعروف بيدي:' + L(`V(X) = e^(2μ+σ²)(e^(σ²) − 1) = ${fx(V)}`) };
      }
    }
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['w', 'Weibull'], ['t', 'Triangular'], ['g', 'Lognormal']]} mode=${tab} set=${setTab} />
      <div className="mf3-row">${exBtn}</div>${row}${body}<//>`;
  }

  /* ── §30: Poisson process simulator ── */
  function PoissonProcess({ ar }) {
    const T = 10, [lam, setLam] = useState(1), [arr, setArr] = useState([]), [cur, setCur] = useState(T), [many, setMany] = useState(null);
    const gen = l => { const out = []; let t = -Math.log(1 - Math.random()) / l; while (t <= T) { out.push(t); t += -Math.log(1 - Math.random()) / l; } return out; };
    const run = () => { setArr(gen(lam)); setCur(calm() ? T : 0); setMany(null); };
    useEffect(() => { run(); }, []);
    useEffect(() => { if (cur >= T) return; const id = setTimeout(() => setCur(c => Math.min(T, c + 0.25)), 60); return () => clearTimeout(id); }, [cur]);
    const repeat = () => { const ns = Array.from({ length: 1000 }, () => gen(lam).length), m = ns.reduce((s, v) => s + v, 0) / ns.length, v = ns.reduce((s, x) => s + (x - m) ** 2, 0) / (ns.length - 1); setMany({ m, v, l: lam }); };
    const seen = arr.filter(t => t <= cur), N = seen.length, ymax = Math.max(4, arr.length + 1);
    const F = frame({ H: 200, x0: 0, x1: T, y1: ymax, xt: [0, 2, 4, 6, 8, 10], yt: ticks(0, ymax, 3).filter(Number.isInteger), yl: 'N(t)', xl: 't' });
    let d = `M${F.sx(0)},${F.sy(0)}`; seen.forEach((t, j) => { d += `H${F.sx(t)}V${F.sy(j + 1)}`; }); d += `H${F.sx(cur)}`;
    const gaps = seen.map((t, j) => t - (j ? seen[j - 1] : 0)).slice(0, 4);
    const cap = { en: `Arrivals one at a time, rate λ = ${lam} per unit time: N(t) counts them in [0, t]. In this run N(${T}) = <b>${cur >= T ? N : '…'}</b>; N(t) is Poisson with mean and variance λt = ${tr(lam * T)}. The gaps between arrivals (A₁, A₂, …) are exponential with mean 1/λ = ${tr(1 / lam)}.${many && many.l === lam ? ` Over 1000 runs: mean of N(10) = ${many.m.toFixed(2)}, variance = ${many.v.toFixed(2)}, both close to λt = ${tr(lam * T)}.` : ''}`,
      ar: `الوصول بيحصل واحد واحد بمعدل λ، والـ <bdi dir="ltr">N(t)</bdi> بتعد عدد الوصولات في الفترة لحد t. في الـ run دي:` + L(`N(${T}) = ${cur >= T ? N : '…'},  E[N(t)] = V[N(t)] = λt = ${tr(lam * T)}`) + `والمسافات بين الوصولات exponential ومتوسطها ${tr(1 / lam)}.` + (many && many.l === lam ? 'وعلى 1000 run:' + L(`mean = ${many.m.toFixed(2)},  variance = ${many.v.toFixed(2)}`) + 'والاتنين قريبين من λt.' : '') };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Svg} F=${F} label="A Poisson process: counting function N(t)">
        <path d=${d} fill="none" stroke=${K} strokeWidth="3" />
        ${seen.map((t, j) => html`<circle key=${j} cx=${F.sx(t)} cy=${F.sy(0)} r="4" fill="var(--pen)" />`)}
      <//>
      <p className="mf3-note">A₁, A₂, A₃, A₄ = ${gaps.length ? gaps.map(g => g.toFixed(2)).join(', ') : '…'}</p>
      <${Slide} label="λ" min="0.5" max="3" step="0.1" v=${lam} set=${v => setLam(+v.toFixed(1))} show=${lam.toFixed(1)} />
      <div className="mf3-row"><button className="fig-btn solid" onClick=${run}>New run</button><button className="fig-btn" onClick=${repeat}>Repeat 1000 runs</button></div>
    <//>`;
  }

  /* ── §31 slide 44: interarrival times ── */
  function Interarrival({ ar }) {
    const steps = [
      { en: 'A₁, A₂, … are the interarrival times: A₁ is the gap from 0 to the 1st arrival, A₂ the gap to the 2nd.', ar: 'الـ A₁ و A₂ هما الـ interarrival times: الـ A₁ الفترة من 0 لأول وصول، والـ A₂ الفترة لحد التاني.' },
      { en: 'The 1st arrival comes after time t <b>iff</b> there are no arrivals in [0, t].', ar: 'أول وصول هييجي بعد t <b>لو وبس لو</b> مفيش ولا وصول في الفترة من 0 لـ t.' },
      { en: 'So P(A₁ > t) = P(N(t) = 0) = e^(−λt).', ar: 'يبقى' + L('P(A₁ > t) = P(N(t) = 0) = e^(−λt)') },
      { en: 'P(A₁ ≤ t) = 1 − e^(−λt): the CDF of exp(λ). Interarrival times are exponential and independent with mean 1/λ.', ar: 'وده الـ CDF بتاع الـ exponential:' + L('P(A₁ ≤ t) = 1 − e^(−λt)') + 'يعني الـ interarrival times موزعة exponential ومستقلة ومتوسطها <bdi dir="ltr">1/λ</bdi>.' },
      { en: 'Arrival counts ~ Poisson(λ) (stationary and independent) ⟷ interarrival time ~ exp(1/λ) (memoryless); the slide writes exp(1/λ) meaning mean 1/λ.', ar: 'الوجهين لنفس الـ process: عدد الوصولات Poisson، والوقت بينهم exponential ومالوش ذاكرة (memoryless). والـ slide كاتبة الـ exp بالمتوسط <bdi dir="ltr">1/λ</bdi>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2700);
    const P = { o: 22, t: 140, a1: 184, a2: 258 }, y = 50;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <svg viewBox="0 0 300 140" role="img" aria-label="Time line with t, A1 and A1 plus A2">
        <rect x=${P.o} y=${y - 14} width=${P.t - P.o} height="14" fill="var(--ok)" opacity=".35" className=${pop(i >= 1 && i <= 2)} />
        <text x=${(P.o + P.t) / 2} y=${y - 20} textAnchor="middle" fontSize="15" className=${pop(i >= 1 && i <= 2)}>no arrivals</text>
        <line x1=${P.o} x2="286" y1=${y} y2=${y} stroke="var(--graphite)" strokeWidth="1.5" />
        <text x="292" y=${y + 5} textAnchor="end" fontSize="15">…</text>
        ${[['0', P.o], ['t', P.t], ['A₁', P.a1], ['A₁ + A₂', P.a2]].map(([l, x]) => html`<g key=${l}><line x1=${x} x2=${x} y1=${y - 8} y2=${y + 8} stroke="var(--ink)" strokeWidth="2" /><text x=${x} y=${y + 26} textAnchor="middle" fontSize="15" fontStyle="italic">${l}</text></g>`)}
        ${[P.a1, P.a2].map(x => html`<circle key=${x} cx=${x} cy=${y} r="5" fill="var(--pen)" />`)}
        <g>${[[P.o, P.a1, 'A₁'], [P.a1, P.a2, 'A₂']].map(([x1, x2, l], j) => html`<g key=${l} className=${pop(i === 0 || i >= 3)}><path d=${`M${x1},${y + 52} H${x2} M${x1},${y + 44} V${y + 60} M${x2},${y + 44} V${y + 60}`} stroke=${j ? 'var(--pen)' : K} strokeWidth="2" fill="none" /><text x=${(x1 + x2) / 2} y=${y + 80} textAnchor="middle" fontSize="15" fontStyle="italic">${l}</text></g>`)}</g>
      </svg>
      <div className=${'mf3-link ' + pop(i >= 4)}><div className=${i >= 4 ? 'hot' : ''}>Arrival counts<br />~ Poisson(λ)<small>Stationary & Independent</small></div><div className="arw">↕</div><div className=${i >= 4 ? 'hot' : ''}>Interarrival time<br />~ exp(1/λ)<small>Memoryless</small></div></div>
    <//>`;
  }

  /* ── §33 slides 47–48: group sizes ── */
  const GS = [[1, 30, 0.10, 0.10], [2, 110, 0.37, 0.47], [3, 45, 0.15, 0.62], [4, 71, 0.24, 0.86], [5, 12, 0.04, 0.90], [6, 13, 0.04, 0.94], [7, 7, 0.02, 0.96], [8, 12, 0.04, 1.00]];
  function Groups({ ar }) {
    const steps = [...GS.map(([s, f, r, c], j) => ({ en: `Group size ${s}: ${f} of the last 300 groups, relative frequency ${f}/300 = ${r.toFixed(2)}; cumulative ${j ? GS[j - 1][3].toFixed(2) + ' + ' + r.toFixed(2) + ' = ' : ''}${c.toFixed(2)}.${s === 4 || s === 5 ? ` (‡ exact: ${s === 4 ? '256' : '268'}/300 = ${s === 4 ? '0.853' : '0.893'}; the slide adds the rounded values.)` : ''}`,
      ar: `المجموعات اللي حجمها ${s}: عددها ${f} من آخر 300 مجموعة.` + L(`relative = ${f}/300 = ${r.toFixed(2)},  cumulative = ${j ? GS[j - 1][3].toFixed(2) + ' + ' + r.toFixed(2) + ' = ' : ''}${c.toFixed(2)}`) + (s === 4 || s === 5 ? `والقيمة المظبوطة ‡ هي ${s === 4 ? '0.853' : '0.893'}، لأن الـ slide بتجمع القيم المقرّبة.` : '') })),
      { en: 'Slide 48: left, the relative frequencies (tallest at size 2, then 4, 3, 1); right, the empirical CDF rising from 0.10 at size 1 to 1.00 at size 8.', ar: 'الـ slide 48: الرسمة الأولى الـ relative frequency (أعلاها حجم 2، وبعده 4 و 3 و 1)، والتانية الـ empirical CDF طالعة من 0.10 لحد 1.00.' }];
    const [i, ctl] = useSteps(steps.length, 1600);
    const xt = [1, 2, 3, 4, 5, 6, 7, 8];
    const A = frame({ H: 180, x0: 0.3, x1: 8.7, y1: 0.42, xt, yt: [0, 0.1, 0.2, 0.3, 0.4], yl: 'relative frequency', xl: '' });
    const B = frame({ H: 180, x0: 0.3, x1: 8.7, y1: 1.08, xt, yt: [0, 0.5, 1], yl: 'cumulative', xl: 'size' });
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} F=${A} label="Relative frequency of group sizes">${GS.map(([s, , r], j) => html`<g key=${s} className=${pop(j <= i)}><rect x=${A.sx(s) - 11} y=${A.sy(r)} width="22" height=${A.sy(0) - A.sy(r)} fill=${j === i ? 'var(--pen)' : K} /></g>`)}<//>
      <${Svg} F=${B} label="Cumulative relative frequency of group sizes">${GS.map(([s, , , c], j) => html`<g key=${s} className=${pop(j <= i)}><line x1=${B.sx(s)} x2=${B.sx(Math.min(8.7, s + 1))} y1=${B.sy(c)} y2=${B.sy(c)} stroke=${j === i ? 'var(--pen)' : K} strokeWidth="3" /><circle cx=${B.sx(s)} cy=${B.sy(c)} r="4" fill=${j === i ? 'var(--pen)' : K} /></g>`)}<//>
    <//>`;
  }

  /* ── §34 Example 3.16: conveyor repair times, piecewise-linear empirical CDF ── */
  const CV = [[0, 0], [0.5, 0.21], [1.0, 0.33], [1.5, 0.62], [2.0, 0.81], [2.5, 0.89], [3.0, 1.00]];
  function Conveyor({ ar }) {
    const [x, setX] = useState(1.2);
    const j = Math.max(1, CV.findIndex(([v]) => v >= x - 1e-9)), [xa, Fa] = CV[j - 1], [xb, Fb] = CV[j], Fx = Fa + (x - xa) / (xb - xa) * (Fb - Fa);
    const F = frame({ H: 200, x0: 0, x1: 3.1, y1: 1.08, xt: [0, 0.5, 1, 1.5, 2, 2.5, 3], yt: [0, 0.2, 0.4, 0.6, 0.8, 1], yl: 'F(x)', xl: 'hours' });
    const cap = { en: `Join the points [x, F(x)] with straight lines. x = ${x.toFixed(2)} lies in (${xa.toFixed(1)}, ${xb.toFixed(1)}]: F(x) = ${Fa.toFixed(2)} + (${x.toFixed(2)} − ${xa.toFixed(1)})/0.5 × (${Fb.toFixed(2)} − ${Fa.toFixed(2)}) = <b>${fx(Fx)}</b>.`,
      ar: 'بنوصّل النقط بخطوط مستقيمة، والقيمة دي واقعة بين نقطتين فبنمشي على الخط اللي بينهم:' + L(`F(${x.toFixed(2)}) = ${Fa.toFixed(2)} + (${x.toFixed(2)} − ${xa.toFixed(1)})/0.5 × (${Fb.toFixed(2)} − ${Fa.toFixed(2)}) = ${fx(Fx)}`) };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Svg} F=${F} label="Empirical CDF of the conveyor repair times">
        <path d=${CV.map(([a, b], k) => (k ? 'L' : 'M') + F.sx(a) + ',' + F.sy(b)).join('')} fill="none" stroke=${K} strokeWidth="3" />
        ${CV.map(([a, b]) => html`<circle key=${a} cx=${F.sx(a)} cy=${F.sy(b)} r="4" fill=${K} />`)}
        <line x1=${F.sx(x)} x2=${F.sx(x)} y1=${F.sy(0)} y2=${F.sy(Fx)} stroke="var(--pen)" strokeDasharray="4 4" strokeWidth="2" />
        <line x1=${F.l} x2=${F.sx(x)} y1=${F.sy(Fx)} y2=${F.sy(Fx)} stroke="var(--pen)" strokeDasharray="4 4" strokeWidth="2" />
        <circle cx=${F.sx(x)} cy=${F.sy(Fx)} r="5" fill="var(--pen)" />
      <//>
      <${Slide} label="x (hours)" min="0" max="3" step="0.05" v=${x} set=${setX} show=${x.toFixed(2)} />
      <table className="mf3-tbl" style=${{ marginTop: '6px' }}><thead><tr><th>x</th>${CV.map(([a]) => html`<th key=${a}>${a}</th>`)}</tr></thead><tbody><tr><td>F</td>${CV.map(([a, b], k) => html`<td key=${a} style=${k === j || k === j - 1 ? { background: 'color-mix(in srgb, var(--k-ms) 20%, var(--paper))' } : null}>${b === 0 ? '0' : b.toFixed(2).replace(/^0/, '')}</td>`)}</tr></tbody></table>
    <//>`;
  }

  /* ── §35 slides 49–52: discrete CDF and a random number ── */
  const DX = [2, 5, 7, 9, 10], DC = [0.2, 0.4, 0.6, 0.9, 1.0];
  function DiscCdf({ ar }) {
    const [r, setR] = useState(0.78);
    const j = DC.findIndex(c => r <= c + 1e-9), x = DX[j];
    const F = frame({ H: 210, x0: 0, x1: 11.5, y1: 1.08, xt: DX, yt: [0, 0.2, 0.4, 0.6, 0.8, 1], yl: 'F(x)' });
    const prev = j ? DC[j - 1] : 0;
    const cap = { en: `R = ${r.toFixed(2)}: ${j ? prev.toFixed(1) + ' < ' : '0 ≤ '}${r.toFixed(2)} ≤ ${DC[j].toFixed(1)}, so <b>x = ${x}</b>. Go across at height R to the step, then down to x.${Math.abs(r - 0.78) < 1e-9 ? ' Slide 51: 0.6 < 0.78 ≤ 0.9 gives x = 9.' : ''}`,
      ar: 'امشي بالعرض عند ارتفاع R لحد السلمة، وانزل لتحت على x:' + L(`${j ? prev.toFixed(1) + ' < ' : '0 ≤ '}R = ${r.toFixed(2)} ≤ ${DC[j].toFixed(1)}  ⟹  x = ${x}`) + (Math.abs(r - 0.78) < 1e-9 ? 'وده مثال الـ slide 51 بالظبط.' : '') };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Svg} F=${F} label="Step CDF with a random number mapped to x">
        ${DX.map((v, k) => html`<g key=${v}><line x1=${F.sx(v)} x2=${F.sx(k < 4 ? DX[k + 1] : 11.5)} y1=${F.sy(DC[k])} y2=${F.sy(DC[k])} stroke=${k === j ? 'var(--pen)' : K} strokeWidth="3" /><line x1=${F.sx(v)} x2=${F.sx(v)} y1=${F.sy(k ? DC[k - 1] : 0)} y2=${F.sy(DC[k])} stroke=${k === j ? 'var(--pen)' : FAINT} strokeWidth="2" strokeDasharray="3 3" /><circle cx=${F.sx(v)} cy=${F.sy(DC[k])} r="4" fill=${k === j ? 'var(--pen)' : K} /></g>`)}
        <line x1=${F.sx(0)} x2=${F.sx(2)} y1=${F.sy(0)} y2=${F.sy(0)} stroke=${K} strokeWidth="3" />
        <line x1=${F.l} x2=${F.sx(x)} y1=${F.sy(r)} y2=${F.sy(r)} stroke="var(--ok)" strokeWidth="2.5" />
        <line x1=${F.sx(x)} x2=${F.sx(x)} y1=${F.sy(r)} y2=${F.sy(0) - 2} stroke="var(--ok)" strokeWidth="2.5" />
        <path d=${`M${F.sx(x) - 5},${F.sy(0) - 10} L${F.sx(x)},${F.sy(0) - 2} L${F.sx(x) + 5},${F.sy(0) - 10}`} stroke="var(--ok)" strokeWidth="2.5" fill="none" />
        <text x=${F.l + 4} y=${F.sy(r) - 6} fontSize="15">R</text>
      <//>
      <${Slide} label="R" min="0" max="1" step="0.01" v=${r} set=${setR} show=${r.toFixed(2)} />
      <div className="mf3-row"><button className="fig-btn" aria-pressed=${String(Math.abs(r - 0.78) < 1e-9)} onClick=${() => setR(0.78)}>Slide 51: R = 0.78</button></div>
      <table className="mf3-tbl"><thead><tr><th>R</th><th>x</th></tr></thead><tbody>${DX.map((v, k) => html`<tr key=${v} className=${k === j ? 'on' : ''}><td>${k ? DC[k - 1].toFixed(1) + ' < R ≤ ' : '0 ≤ R ≤ '}${DC[k] === 1 ? '1.00' : DC[k].toFixed(1)}</td><td>${v}</td></tr>`)}</tbody></table>
    <//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ms-die': Die, 'ms-pdf-area': PdfArea, 'ms-device-pdf': DevicePdf, 'ms-cdf-props': CdfProps, 'ms-device-cdf': DeviceCdf, 'ms-variance': Variance,
    'ms-die-moments': DieMoments, 'ms-quantile': Quantile, 'ms-mmm': MeanMedianMode, 'ms-central-flow': CentralFlow, 'ms-bernoulli': Bernoulli,
    'ms-binomial': Binomial, 'ms-geometric': Geometric, 'ms-poisson': Poisson, 'ms-uniform': Uniform, 'ms-bus': Bus, 'ms-exponential': Exponential,
    'ms-exp-family': ExpFamily, 'ms-normal-shape': NormalShape, 'ms-normal': Normal, 'ms-more-dists': MoreDists, 'ms-pp-sim': PoissonProcess,
    'ms-pp-times': Interarrival, 'ms-groups': Groups, 'ms-conveyor': Conveyor, 'ms-disc-cdf': DiscCdf, 'ms-disc-moments': DiscMoments
  });
})();
/* ── part 4 ── */
// Modeling & Simulation visuals, part 4: L4 Random-Number Generation and Tests for Random Numbers (midsquare, LCG and period, combined LCG, KS, chi-square, gap, autocorrelation, runs and poker tests). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf4 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mf4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf4-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mf4-modes .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:30px; }
.mf4-svg{ display:block; width:100%; margin:0 auto; overflow:visible; }
.mf4-svg text{ fill:var(--ink); font-family:var(--body); }
.mf4-eq{ text-align:center; font-family:var(--mono); font-size:.86rem; color:var(--ink); margin:8px auto 0; line-height:1.55; overflow-wrap:anywhere; max-width:520px; }
.mf4-eq b{ color:var(--fig-k); }
.mf4-tbl{ border-collapse:collapse; margin:0 auto; font-size:.82rem; }
.mf4 .fig-stage sub, .mf4 .fig-stage sup{ font-size:.92em; }
.mf4-tbl th, .mf4-tbl td{ border:1px solid var(--line); padding:3px 5px; text-align:center; background:var(--paper); color:var(--ink); white-space:nowrap; transition:background .4s, opacity .4s; }
.mf4-tbl th{ background:var(--paper-2); color:var(--graphite); font-weight:600; font-size:.8rem; white-space:normal; line-height:1.25; }
.mf4-tbl td{ font-family:var(--mono); }
.mf4-tbl td.l{ text-align:left; font-family:var(--body); }
.mf4-tbl tr.cur td{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.mf4-tbl td.hi{ background:color-mix(in srgb, var(--fig-k) 34%, var(--paper)); font-weight:700; }
.mf4-tbl tr.sum td{ font-weight:700; background:var(--paper-2); }
.mf4-tbl .st{ display:block; line-height:1.3; }
.mf4-form{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; align-items:center; margin:0 0 10px; font-size:.88rem; color:var(--ink); }
.mf4-form label{ display:inline-flex; gap:4px; align-items:center; }
.mf4-in{ width:4.8em; font:inherit; font-size:.92rem; padding:3px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.mf4-in.w{ width:7.4em; }
.mf4-ta{ display:block; width:100%; box-sizing:border-box; min-height:4.6em; font:.86rem/1.4 var(--mono); padding:6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); resize:vertical; margin:0 0 8px; }
.mf4-msg{ text-align:center; font-size:.86rem; color:var(--pen); margin:6px 0; }
.mf4-chips{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; }
.mf4-chip{ font:600 .8rem/1.2 var(--mono); border:1px solid var(--line); border-radius:6px; padding:3px 4px; background:var(--paper); color:var(--ink); text-align:center; min-width:2.6em; transition:background .3s, border-color .3s, opacity .3s; }
.mf4-chip.hi{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.mf4-chip.on{ border-color:var(--pen); box-shadow:0 0 0 1.5px var(--pen); }
.mf4-chip.dim{ opacity:.4; }
.mf4-good{ color:var(--ok); font-weight:700; } .mf4-bad{ color:var(--pen); font-weight:700; }
.mf4-big{ text-align:center; font:600 .98rem/1.45 var(--mono); color:var(--ink); margin:4px 0 8px; overflow-wrap:anywhere; min-height:1.45em; }
.mf4-big b{ color:var(--fig-k); }
.mf4-note{ text-align:center; font-size:.84rem; color:var(--graphite); margin:6px 0 0; }
.mf4-pans{ display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:8px; max-width:560px; margin:0 auto; }
.mf4-pan{ border:2px solid var(--ink); background:var(--paper); padding:8px; min-height:92px; font-size:.9rem; line-height:1.35; color:var(--ink); }
.mf4-pan small{ display:block; font-size:.78rem; letter-spacing:.06em; color:var(--graphite); border:1px solid var(--line); padding:1px 4px; margin-bottom:6px; }
.mf4-pan .nn{ font:700 .95rem/1.5 var(--mono); color:var(--fig-k); }
.mf4-pan .nn span{ display:inline-block; margin-right:6px; animation:mf4in .35s ease both; }
@keyframes mf4in{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
.mf4-map{ display:grid; grid-template-columns:1fr 2fr; gap:10px; max-width:560px; margin:0 auto; }
@media (max-width:520px){ .mf4-map{ grid-template-columns:1fr; } }
.mf4-grp{ border:1.5px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; }
.mf4-grp > b{ display:block; color:var(--fig-k); font-size:.9rem; margin-bottom:6px; }
.mf4-grp .h{ font:.8rem/1.35 var(--mono); color:var(--graphite); margin-bottom:6px; }
.mf4-test{ border:1px solid var(--line); border-radius:8px; padding:5px 7px; margin-top:6px; font-size:.86rem; line-height:1.35; color:var(--ink); background:var(--paper-2); }
.mf4-test i{ font-style:normal; font-size:.78rem; border-radius:99px; padding:0 6px; margin-left:4px; background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); white-space:nowrap; }
.mf4-algo{ max-width:520px; margin:0 auto 8px; display:grid; gap:3px; }
.mf4-algo div{ font-size:.82rem; line-height:1.35; padding:3px 7px; border-radius:6px; border:1px solid var(--line); background:var(--paper); color:var(--ink); opacity:.5; transition:opacity .3s, background .3s; overflow-wrap:anywhere; }
.mf4-algo div.on{ opacity:1; background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); border-color:var(--fig-k); }
.mf4-digits{ display:grid; grid-template-columns:repeat(11, minmax(0,1fr)); gap:2px; max-width:420px; margin:0 auto; }
.mf4-digits span{ font:600 .86rem/1.7 var(--mono); text-align:center; border-radius:4px; color:var(--ink); background:var(--paper); transition:background .3s; }
.mf4-digits span.t{ background:var(--fig-s); color:#fff; }
.mf4-digits span.g{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.mf4-grid5{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:3px; max-width:340px; margin:0 auto; }
.mf4-grid5 span{ font:600 .82rem/1.25 var(--mono); text-align:center; padding:3px 0; border-radius:5px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:background .3s, opacity .3s; }
.mf4-grid5 span small{ display:block; font:.78rem var(--body); color:var(--graphite); }
.mf4-grid5 span.hi{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); border-color:var(--fig-k); }
.mf4-grid5 span.on{ box-shadow:0 0 0 2px var(--pen); }
.mf4-runs{ display:flex; flex-wrap:wrap; gap:4px 3px; justify-content:center; max-width:480px; margin:0 auto; }
.mf4-runs > div{ display:flex; flex-direction:column; align-items:center; gap:2px; }
.mf4-runs .n{ font:600 .8rem/1.2 var(--mono); border:1px solid var(--line); border-radius:5px; padding:3px 3px; background:var(--paper); color:var(--ink); }
.mf4-runs .s{ font:700 .86rem/1.1 var(--mono); min-width:1.6em; text-align:center; border-radius:4px; min-height:1.1em; color:var(--ink); }
.mf4-runs .s.r0{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); }
.mf4-runs .s.r1{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.mf4-runs .s.ani{ animation:mf4in .3s ease both; }
.mf4-stat{ max-width:460px; margin:10px auto 0; display:grid; gap:4px; }
.mf4-stat div{ font:.84rem/1.45 var(--mono); color:var(--ink); border-left:3px solid var(--fig-k); padding:1px 8px; overflow-wrap:anywhere; }
.mf4-pix{ display:block; width:200px; height:200px; margin:0 auto; image-rendering:pixelated; border:1px solid var(--line); }
@media (prefers-reduced-motion: reduce){ .mf4-pan .nn span, .mf4-runs .s.ani{ animation:none; } .mf4-tbl th, .mf4-tbl td, .mf4-chip, .mf4-algo div{ transition:none; } }`;
  if (!document.getElementById('mf4-css')) { const s = document.createElement('style'); s.id = 'mf4-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers ── */
  const L = t => `<span class="ltr">${t}</span>`;
  const sub = n => String(n).split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[d] || d).join('');
  const r4 = x => String(+x.toFixed(4));
  const nums = s => (String(s).match(/-?\d*\.?\d+(e-?\d+)?/gi) || []).map(Number).filter(x => isFinite(x));
  const Modes = ({ list, mode, set }) => html`<div className="mf4-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const NumIn = ({ label, v, set, w }) => html`<label>${label}<input className=${'mf4-in' + (w ? ' w' : '')} type="number" inputMode="numeric" value=${v} onChange=${e => set(e.target.value)} /></label>`;
  const Tbl = ({ head, rows, cls }) => html`<table className="mf4-tbl"><thead><tr>${head.map((h, k) => html`<th key=${k} dangerouslySetInnerHTML=${{ __html: h }}></th>`)}</tr></thead>
    <tbody>${rows.map((r, j) => html`<tr key=${j} className=${(cls && cls(j)) || ''}>${r.map((c, k) => html`<td key=${k} dangerouslySetInnerHTML=${{ __html: c }}></td>`)}</tr>`)}</tbody></table>`;
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const isPrime = n => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const isPow2 = n => n >= 2 && (n & (n - 1)) === 0 && n <= 2 ** 30;

  // X_{i+1} = (a X_i + c) mod m until a value repeats; xs = X0..X_{n-1}, X_n = rep (already seen at index start)
  function lcgRun(a, c, m, x0) {
    const xs = [x0], pos = new Map([[x0, 0]]); let x = x0;
    for (let k = 1; k <= m + 1; k++) { x = (a * x + c) % m; if (pos.has(x)) return { xs, rep: x, start: pos.get(x), period: k - pos.get(x) }; pos.set(x, k); xs.push(x); }
    return { xs, rep: null, start: 0, period: 0 };
  }

  /* ── slide 8: the PDF of a random number ── */
  function Uniform({ ar }) {
    const steps = [
      { en: 'Each R<sub>i</sub> is drawn from the uniform distribution on [0,1]: <b>f(x) = 1</b> for 0 ≤ x ≤ 1 and 0 elsewhere.', ar: 'كل R<sub>i</sub> بيتسحب من الـ uniform distribution على الفترة من 0 لـ 1، والـ PDF بتاعه:' + L('f(x) = 1 for 0 ≤ x ≤ 1, f(x) = 0 otherwise'), eq: 'f(x) = 1, 0 ≤ x ≤ 1;  f(x) = 0 otherwise' },
      { en: 'The graph is a rectangle of width 1 and height 1, so the <b>area under f is 1</b>.', ar: 'الرسمة مستطيل عرضه 1 وطوله 1، يعني <b>المساحة تحت الـ f بتساوي 1</b>.', eq: 'area = 1 × 1 = 1' },
      { en: 'The mean sits in the middle: <b>E(R) = 1/2</b>.', ar: 'الـ mean في النص بالظبط:' + L('E(R) = ∫₀¹ x dx = [x²/2]₀¹ = 1/2'), eq: 'E(R) = ∫₀¹ x dx = [x²/2]₀¹ = <b>1/2</b>' },
      { en: 'The variance is <b>V(R) = 1/12</b>. ‡ (lecture notes)', ar: 'والـ variance بيطلع كده ‡ (lecture notes):' + L('V(R) = ∫₀¹ x² dx − [E(R)]² = 1/3 − 1/4 = 1/12'), eq: 'V(R) = ∫₀¹ x² dx − [E(R)]² = 1/3 − 1/4 = <b>1/12</b>' },
      { en: 'Divide [0,1] into n classes of equal length: each class expects <b>N/n</b> of the N observations (e.g. N = 100, n = 10 gives 10 per class), whatever values came before. ‡ (lecture notes)', ar: 'لو قسمنا الفترة لـ n classes متساوية، كل class متوقع يجيلها <b><bdi dir="ltr">N/n</bdi></b> من الـ N observations، مهما كانت القيم اللي قبلها ‡ (lecture notes). مثلًا:' + L('N = 100, n = 10 → 10 per class'), eq: 'expected per class = N/n' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const X = x => 20 + (x + 0.3) / 1.6 * 245, Y0 = 160, Y1 = 55;
    return html`<figure className="fig mf4"><div className="fig-stage">
      <svg className="mf4-svg" viewBox="0 0 280 196" style=${{ maxWidth: '420px' }} role="img" aria-label="Uniform PDF on 0 to 1">
        <line x1="12" y1=${Y0} x2="272" y2=${Y0} stroke="var(--graphite)" strokeWidth="1.5" />
        <line x1=${X(0)} y1=${Y0 + 4} x2=${X(0)} y2="22" stroke="var(--graphite)" strokeWidth="1.5" />
        <rect x=${X(0)} y=${Y1} width=${X(1) - X(0)} height=${Y0 - Y1} fill="var(--fig-k)" className="fade" style=${{ opacity: i >= 1 ? .22 : 0 }} />
        <path d=${`M12 ${Y0} H${X(0)} V${Y1} H${X(1)} V${Y0} H272`} fill="none" stroke="var(--fig-k)" strokeWidth="3" />
        ${i >= 4 && [1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => html`<line key=${k} x1=${X(k / 10)} y1=${Y1} x2=${X(k / 10)} y2=${Y0} stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" />`)}
        <g className=${pop(i >= 2)}><line x1=${X(.5)} y1="38" x2=${X(.5)} y2=${Y0} stroke="var(--pen)" strokeWidth="2.5" strokeDasharray="6 4" /><text x=${X(.5)} y="32" textAnchor="middle" fontSize="15" fontWeight="700">E(R) = 1/2</text></g>
        <text x=${X(0) - 6} y=${Y1 + 5} textAnchor="end" fontSize="15">1</text>
        <text x=${X(0) + 6} y="26" fontSize="15" fontStyle="italic">f(x)</text>
        <text x=${X(0)} y=${Y0 + 20} textAnchor="middle" fontSize="15">0</text>
        <text x=${X(1)} y=${Y0 + 20} textAnchor="middle" fontSize="15">1</text>
        <text x="270" y=${Y0 + 20} textAnchor="end" fontSize="15" fontStyle="italic">x</text>
        ${i === 1 && html`<text x=${X(.5)} y=${(Y0 + Y1) / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="700">area = 1</text>`}
      </svg>
      <p className="mf4-eq" dangerouslySetInnerHTML=${{ __html: steps[i].eq }}></p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 13-14: the midsquare method ── */
  function msRows(z0) {
    const rows = [], seen = new Set(); let z = z0;
    for (let i = 0; i < 20; i++) { const sq = String(z * z).padStart(8, '0'); const rep = seen.has(z); rows.push({ i, z, sq, next: +sq.slice(2, 6) }); seen.add(z); if (rep) break; z = +sq.slice(2, 6); }
    return rows;
  }
  function MidRun({ z0, ar, notes }) {
    const rows = msRows(z0), last = rows[rows.length - 1];
    const endEn = notes ? 'The numbers <b>tend to 0</b>: from i = 9 the values shrink (78, 60, 36, 12, 1) and reach 0, after which the generator stays at 0 forever.'
      : last.z === 0 ? `The sequence reached <b>0</b> and stays at 0 forever: the numbers tend to 0.` : `Z = ${last.z} has appeared before, so from here the sequence <b>repeats</b>.`;
    const endAr = notes ? 'الأرقام <b>بتروح ناحية الـ 0</b>: من أول الـ i اللي قيمته 9 القيم بتصغر لحد ما توصل 0، وبعدها الـ generator بيفضل 0 على طول:' + L('78, 60, 36, 12, 1 → 0')
      : last.z === 0 ? 'الـ sequence وصلت <b>0</b> وهتفضل 0 على طول، يعني الأرقام بتروح ناحية الـ 0.' : 'القيمة دي ظهرت قبل كده، فمن هنا الـ sequence <b>بتعيد نفسها</b>:' + L(`Z = ${last.z}`);
    const steps = rows.slice(0, -1).map(r => ({
      en: (r.i === 0 ? `Start with the four-digit seed <b>Z₀ = ${z0}</b>. ` : '') + `Square it: ${r.z}² = ${r.sq} (8 digits, with leading zeros). The <b>middle four digits</b> give Z${sub(r.i + 1)} = ${r.next}, so U${sub(r.i + 1)} = ${r.next}/10000 = ${(r.next / 1e4).toFixed(4)}.`,
      ar: (r.i === 0 ? 'بنبدأ بالـ seed اللي هو رقم من 4 digits. ' : '') + 'نربّع الرقم ونكمّله لـ 8 digits بأصفار على الشمال، وناخد <b>الـ 4 digits اللي في النص</b>:' + L(`Z${sub(r.i)}² = ${r.z}² = ${r.sq} → Z${sub(r.i + 1)} = ${r.next}, U${sub(r.i + 1)} = ${(r.next / 1e4).toFixed(4)}`)
    })).concat([{ en: endEn, ar: endAr }]);
    const [i, ctl] = useSteps(steps.length, 1500), k = Math.min(i, rows.length - 2), done = i === steps.length - 1, cur = rows[Math.max(0, k)];
    const shown = done ? rows : rows.slice(0, k + 1);
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-big">${cur.z}² = ${cur.sq.slice(0, 2)}<b>${cur.sq.slice(2, 6)}</b>${cur.sq.slice(6)} → Z${sub(cur.i + 1)} = <b>${cur.next}</b></div>
      <${Tbl} head=${['i', 'Z<sub>i</sub>', 'U<sub>i</sub>', 'Z<sub>i</sub>×Z<sub>i</sub>']} rows=${shown.map(r => [r.i, r.z, r.i === 0 ? '-' : (r.z / 1e4).toFixed(4), r.sq.slice(0, 2) + '<b>' + r.sq.slice(2, 6) + '</b>' + r.sq.slice(6)])} cls=${j => (!done && j === k) ? 'cur' : ''} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function Midsquare({ ar }) {
    const [mode, setMode] = useState('n'), [z, setZ] = useState('7182');
    const zz = Math.round(+z), ok = zz >= 1000 && zz <= 9999;
    return html`<figure className="fig mf4"><div className="fig-stage">
      <${Modes} list=${[['n', 'Example from the notes'], ['o', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'o' && html`<div className="mf4-form"><${NumIn} label="Seed Z₀ (4 digits)" v=${z} set=${setZ} w=${1} /></div>`}
      ${mode === 'o' && !ok ? html`<p className="mf4-msg">Enter a four-digit positive integer (1000 to 9999).</p>` : null}
      </div>${(mode === 'n' || ok) && html`<${MidRun} key=${mode + (mode === 'n' ? 7182 : zz)} z0=${mode === 'n' ? 7182 : zz} notes=${mode === 'n'} ar=${ar} />`}</figure>`;
  }

  /* ── slides 16-18: the linear congruential method ── */
  function LcgRun({ a, c, m, x0, ar, ex1 }) {
    const run = lcgRun(a, c, m, x0), all = run.xs.concat([run.rep]), n = Math.min(all.length - 1, 24);
    const rv = x => ex1 ? (x / m).toFixed(2) : r4(x / m);
    const steps = [{ en: `Seed <b>X₀ = ${x0}</b>, a = ${a}, c = ${c}, m = ${m}. Each step: X<sub>i+1</sub> = (a·X<sub>i</sub> + c) mod m, then R<sub>i</sub> = X<sub>i</sub>/m.`, ar: 'الـ seed والـ parameters هما:' + L(`X₀ = ${x0}, a = ${a}, c = ${c}, m = ${m}`) + 'وفي كل خطوة بنحسب:' + L('X<sub>i+1</sub> = (a·X<sub>i</sub> + c) mod m, R<sub>i</sub> = X<sub>i</sub>/m') }];
    for (let j = 1; j <= n; j++) {
      const p = all[j - 1], x = all[j], t = a * p + c, line = `X${sub(j)} = (${a}×${p} + ${c}) mod ${m} = ${t} mod ${m} = ${x} → R${sub(j)} = ${rv(x)}`;
      const back = j === all.length - 1;
      steps.push({ en: line + (back ? (run.start === 0 ? `<br><b>X${sub(j)} = ${x} is the seed again</b>: the sequence repeats, so the period is <b>${run.period}</b>.` + (ex1 ? ' (The slide labels this last value "R₃ = 0.27"; it is R₄ ‡.)' : '') : `<br>${x} already appeared as X${sub(run.start)}: the sequence cycles with period <b>${run.period}</b> (the seed never comes back).`) : ''),
        ar: 'الخطوة دي:' + L(line) + (back ? (run.start === 0 ? 'القيمة دي <b>هي الـ seed تاني</b>، فالـ sequence بتعيد نفسها والـ period بتاعها:' + L(`P = ${run.period}`) + (ex1 ? 'الـ slide كاتبة آخر قيمة على إنها R₃ والصح إنها R₄ ‡.' : '') : 'القيمة دي ظهرت قبل كده، فالـ sequence بتلف في cycle والـ seed مش بيرجع، والـ period:' + L(`P = ${run.period}`)) : ''), j });
    }
    if (n < all.length - 1) steps.push({ en: `… the run goes on: the first repeat comes at step ${all.length - 1}, so the period is <b>${run.period}</b>.`, ar: 'الحساب بيكمل بنفس الطريقة لحد أول تكرار، والـ period بيطلع:' + L(`P = ${run.period}`), j: n });
    const [i, ctl] = useSteps(steps.length, 1700), j = steps[i].j || 0;
    const rows = all.slice(0, j + 1).map((x, k) => [k, x, k === 0 ? '-' : rv(x)]);
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-big">X<sub>i+1</sub> = (<b>${a}</b>·X<sub>i</sub> + <b>${c}</b>) mod <b>${m}</b></div>
      <${Tbl} head=${['i', 'X<sub>i</sub>', 'R<sub>i</sub> = X<sub>i</sub>/m']} rows=${rows} cls=${k => k === j && j > 0 ? 'cur' : ''} />
      <p className="mf4-note">${j === all.length - 1 ? html`Period <b className="mf4-good">${run.period}</b>` : html` `}</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function Lcg({ ar }) {
    const [mode, setMode] = useState('n'), [p, setP] = useState({ a: '17', c: '43', m: '100', x0: '27' });
    const v = { a: Math.round(+p.a), c: Math.round(+p.c), m: Math.round(+p.m), x0: Math.round(+p.x0) };
    const err = !(v.m > 0 && v.m <= 100000) ? 'Use a modulus m from 1 to 100000.' : !(v.a > 0 && v.a < v.m && v.c >= 0 && v.c < v.m && v.x0 >= 0 && v.x0 < v.m) ? 'The slide assumes 0 < a < m, 0 ≤ c < m and 0 ≤ X₀ < m.' : '';
    const set = k => val => setP(o => Object.assign({}, o, { [k]: val }));
    const cfg = mode === 'n' ? { a: 17, c: 43, m: 100, x0: 27 } : v;
    return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <${Modes} list=${[['n', 'Example from the notes'], ['o', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'o' && html`<div className="mf4-form"><${NumIn} label="a" v=${p.a} set=${set('a')} /><${NumIn} label="c" v=${p.c} set=${set('c')} /><${NumIn} label="m" v=${p.m} set=${set('m')} w=${1} /><${NumIn} label="X₀" v=${p.x0} set=${set('x0')} /></div>`}
      ${mode === 'o' && err ? html`<p className="mf4-msg">${err}</p>` : null}</div>
      ${!(mode === 'o' && err) && html`<${LcgRun} key=${JSON.stringify(cfg) + mode} ...${cfg} ex1=${mode === 'n'} ar=${ar} />`}</figure>`;
  }

  /* ── slide 19 and the lecture spreadsheet: the seed decides the period ── */
  function Ring({ cyc, k, m, x0, done }) {
    const P = cyc.length, R = P > 8 ? 98 : 80, C = 130, at = j => [C + R * Math.sin(2 * Math.PI * j / P), C - R * Math.cos(2 * Math.PI * j / P)];
    return html`<svg className="mf4-svg" viewBox="0 0 260 260" style=${{ maxWidth: '300px' }} role="img" aria-label=${'Cycle of the generator from seed ' + x0}>
      ${cyc.map((_, j) => { if (j >= k) return null; const [x1, y1] = at(j), [x2, y2] = at((j + 1) % P); const back = j === P - 1;
        return html`<line key=${'l' + j} x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke=${back ? 'var(--pen)' : 'var(--fig-k)'} strokeWidth=${back ? 3 : 2} />`; })}
      ${cyc.map((x, j) => { const [cx, cy] = at(j), on = j <= k; return html`<g key=${j} className="fade" style=${{ opacity: on ? 1 : .12 }}>
        <circle cx=${cx} cy=${cy} r="16" fill=${j === 0 ? (done ? 'var(--pen)' : 'var(--fig-s)') : 'var(--paper)'} stroke=${j === k && !done ? 'var(--pen)' : 'var(--fig-k)'} strokeWidth=${j === k && !done ? 3 : 2} />
        <text x=${cx} y=${cy + 5} textAnchor="middle" fontSize="14" fontWeight="700" style=${{ fill: j === 0 ? '#fff' : 'var(--ink)' }}>${x}</text></g>`; })}
      <text x=${C} y=${C - 4} textAnchor="middle" fontSize="16" fontWeight="700">X₀ = ${x0}</text>
      <text x=${C} y=${C + 18} textAnchor="middle" fontSize="15">${done ? 'period ' + P : 'mod ' + m}</text></svg>`;
  }
  function SeedRun({ a, c, m, x0, ar, showR }) {
    const run = lcgRun(a, c, m, x0), cyc = run.xs, P = run.period;
    const steps = [{ en: `Seed <b>X₀ = ${x0}</b> with a = ${a}, c = ${c}, m = ${m}.`, ar: 'الـ seed هنا:' + L(`X₀ = ${x0}, a = ${a}, c = ${c}, m = ${m}`) }];
    for (let j = 1; j <= P; j++) { const p = cyc[j - 1], x = j < P ? cyc[j] : run.rep, line = `X${sub(j)} = (${a}×${p}) mod ${m} = ${a * p} mod ${m} = ${x}` + (showR ? ` → R${sub(j)} = ${r4(x / m)}` : '');
      steps.push(j < P ? { en: line, ar: 'الخطوة دي:' + L(line) } : { en: line + `: the seed is back, so the <b>period is ${P}</b>.`, ar: 'الخطوة دي:' + L(line) + 'الـ seed رجع تاني، يعني <b>الـ period</b> هو:' + L(`P = ${P}`) }); }
    const [i, ctl] = useSteps(steps.length, P > 8 ? 900 : 1400), done = i === steps.length - 1;
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}><${Ring} cyc=${cyc} k=${Math.min(i, P - 1) + (done ? 1 : 0)} m=${m} x0=${x0} done=${done} />
      ${showR && html`<div className="mf4-chips" style=${{ marginTop: '6px' }}>${cyc.slice(1).concat([run.rep]).slice(0, i).map((x, j) => html`<span key=${j} className="mf4-chip">R${sub(j + 1)} = ${r4(x / m)}</span>`)}</div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function seedsFig(cfg) {
    return function Seeds({ ar }) {
      const [s, setS] = useState(cfg.seeds[0]);
      return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
        <div className="mf4-modes" role="group">${cfg.seeds.map(x => { const P = lcgRun(cfg.a, cfg.c, cfg.m, x).period; return html`<button key=${x} className="fig-btn" aria-pressed=${String(s === x)} onClick=${() => setS(x)}>X₀ = ${x} · P = ${P}</button>`; })}</div></div>
        <${SeedRun} key=${s} a=${cfg.a} c=${cfg.c} m=${cfg.m} x0=${s} showR=${cfg.showR} ar=${ar} /></figure>`;
    };
  }
  const Seeds64 = seedsFig({ a: 13, c: 0, m: 64, seeds: [1, 2, 3, 4] });
  const Seeds32 = seedsFig({ a: 13, c: 0, m: 32, seeds: [2, 6], showR: true });

  /* ── slides 22-23: successive numbers plotted in 2-D and 3-D ── */
  const M1 = 2147483563, M2 = 2147483399;
  function clcg(s1, s2, n) { const out = []; let x1 = s1, x2 = s2; for (let k = 0; k < n; k++) { x1 = 40014 * x1 % M1; x2 = 40692 * x2 % M2; const x = ((x1 - x2) % (M1 - 1) + (M1 - 1)) % (M1 - 1); out.push({ x1, x2, x, r: x > 0 ? x / M1 : (M1 - 1) / M1 }); } return out; }
  let CL1000 = null;
  function Lattice({ ar }) {
    const [g, setG] = useState('lcg'), [dim, setDim] = useState(2), [ang, setAng] = useState(35), [p, setP] = useState({ a: '13', c: '0', m: '64', x0: '1' }), [spin, setSpin] = useState(!calm());
    useEffect(() => { if (!(spin && dim === 3)) return; const t = setInterval(() => setAng(x => (x + 2) % 360), 70); return () => clearInterval(t); }, [spin, dim]);
    const v = { a: Math.round(+p.a), c: Math.round(+p.c), m: Math.round(+p.m), x0: Math.round(+p.x0) };
    const bad = g === 'own' && !(v.m > 1 && v.m <= 65536 && v.a > 0 && v.a < v.m && v.c >= 0 && v.c < v.m && v.x0 >= 0 && v.x0 < v.m);
    let R = [];
    if (g === 'clcg') { CL1000 = CL1000 || clcg(111, 222, 1000).map(o => o.r); R = CL1000; }
    else if (!bad) { const c = g === 'lcg' ? { a: 13, c: 0, m: 64, x0: 1 } : v; const run = lcgRun(c.a, c.c, c.m, c.x0); const cyc = run.xs.slice(run.start); R = cyc.concat(cyc.slice(0, dim - 1)).map(x => x / c.m).slice(0, 3000); }
    const pts = []; for (let k = 0; k + dim - 1 < R.length; k++) pts.push(R.slice(k, k + dim));
    const S = 210, O = 25, th = ang * Math.PI / 180, ph = .42;
    const proj = ([x, y, z]) => { const X = x - .5, Y = y - .5, Z = z - .5, px = X * Math.cos(th) - Y * Math.sin(th), d = X * Math.sin(th) + Y * Math.cos(th); return [130 + px * 150, 130 - (Z * Math.cos(ph) - d * Math.sin(ph)) * 150]; };
    const edges = [[0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1], [1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1]];
    const sz = pts.length > 200 ? 3 : 6;
    const set = k => val => setP(o => Object.assign({}, o, { [k]: val }));
    const capEn = { lcg: 'The notes\' generator a = 13, c = 0, m = 64, X₀ = 1 (period 16): plotting each R<sub>i</sub> against the next shows the points on a <b>regular lattice</b> of parallel lines, like slide 22. Such structure means the numbers are <b>not independent</b>.', clcg: 'The notes\' combined generator (L\'Ecuyer, seeds 111 and 222), first 1000 numbers: the points <b>fill the square (and the cube) evenly</b> with no visible pattern, which is what a good generator should look like (slide 23, right).', own: 'Try your own a, c, m and X₀ (m up to 65536): with a small m or a poor multiplier the points fall on a few lines or planes (slide 22); a bigger m with a good choice fills the space more densely.' };
    const capAr = { lcg: 'ده الـ generator بتاع الـ notes والـ period بتاعه 16. لما نرسم كل R<sub>i</sub> قصاد اللي بعده، النقط بتقع على <b>lattice منتظمة</b> من خطوط متوازية زي الـ slide 22، والشكل المنتظم ده معناه إن الأرقام <b>مش independent</b>:' + L('a = 13, c = 0, m = 64, X₀ = 1'), clcg: 'ده الـ combined generator بتاع L\'Ecuyer من الـ notes، بالـ seeds دول، وأول 1000 رقم منه. النقط <b>بتملا المربع (والمكعب) بالتساوي</b> من غير أي pattern، وده الشكل اللي المفروض الـ generator الكويس يطلّعه (الـ slide 23 على اليمين):' + L('seeds 111, 222'), own: 'جرّب الـ a والـ c والـ m والـ X₀ بتوعك، والـ m لحد 65536. لو الـ m صغير أو الـ multiplier وحش، النقط بتقع على خطوط أو مستويات قليلة زي الـ slide 22، ولو الـ m كبير والاختيار كويس النقط بتملا المساحة أكتر.' };
    return html`<figure className="fig mf4"><div className="fig-stage">
      <${Modes} list=${[['lcg', 'a=13, m=64'], ['clcg', 'Combined LCG'], ['own', 'Try your own']]} mode=${g} set=${setG} />
      ${g === 'own' && html`<div className="mf4-form"><${NumIn} label="a" v=${p.a} set=${set('a')} /><${NumIn} label="c" v=${p.c} set=${set('c')} /><${NumIn} label="m" v=${p.m} set=${set('m')} w=${1} /><${NumIn} label="X₀" v=${p.x0} set=${set('x0')} /></div>`}
      <${Modes} list=${[[2, '2-D: (Rᵢ, Rᵢ₊₁)'], [3, '3-D: (Rᵢ, Rᵢ₊₁, Rᵢ₊₂)']]} mode=${dim} set=${setDim} />
      ${bad ? html`<p className="mf4-msg">${'Use 1 < m ≤ 65536, 0 < a < m, 0 ≤ c < m, 0 ≤ X₀ < m.'}</p>` : html`<svg className="mf4-svg" viewBox="0 0 260 260" style=${{ maxWidth: '340px' }} role="img" aria-label="Scatter plot of successive random numbers">
        ${dim === 2 ? html`<g><rect x=${O} y=${O} width=${S} height=${S} fill="none" stroke="var(--graphite)" strokeWidth="1.2" />
          ${pts.map((q, k) => html`<rect key=${k} x=${O + q[0] * S - sz / 2} y=${O + S - q[1] * S - sz / 2} width=${sz} height=${sz} fill="var(--pen)" />`)}
          <text x=${O} y=${O + S + 18} textAnchor="middle" fontSize="14">0</text><text x=${O + S} y=${O + S + 18} textAnchor="middle" fontSize="14">1</text><text x=${O - 6} y=${O + 5} textAnchor="end" fontSize="14">1</text></g>`
          : html`<g>${edges.map((e, k) => { const [a1, b1] = proj(e.slice(0, 3)), [a2, b2] = proj(e.slice(3)); return html`<line key=${k} x1=${a1} y1=${b1} x2=${a2} y2=${b2} stroke="var(--graphite)" strokeWidth="1" />`; })}
          ${pts.map((q, k) => { const [x, y] = proj(q); return html`<rect key=${k} x=${x - sz / 2} y=${y - sz / 2} width=${sz} height=${sz} fill="var(--pen)" />`; })}</g>`}
      </svg>`}
      ${dim === 3 && html`<div className="mf4-form"><label>Turn<input type="range" min="0" max="359" value=${ang} onInput=${e => { setSpin(false); setAng(+e.target.value); }} onChange=${e => { setSpin(false); setAng(+e.target.value); }} style=${{ width: '150px' }} /></label><button className="fig-btn" onClick=${() => setSpin(x => !x)}>${spin ? 'Stop' : 'Rotate'}</button></div>`}
      <p className="mf4-note">${pts.length} points</p></div>
      <${Cap} en=${capEn[g]} ar=${capAr[g]} showAr=${ar} /></figure>`;
  }

  /* ── slide 21: proper choice of a, c, m: compare the rule with the period you actually get ── */
  function Rules({ ar }) {
    const [p, setP] = useState({ a: '13', c: '0', m: '64', x0: '1' });
    const v = { a: Math.round(+p.a), c: Math.round(+p.c), m: Math.round(+p.m), x0: Math.round(+p.x0) };
    const set = k => val => setP(o => Object.assign({}, o, { [k]: val }));
    const load = (a, c, m, x0) => setP({ a: String(a), c: String(c), m: String(m), x0: String(x0) });
    const bad = !(v.m > 1 && v.m <= 65536 && v.a > 0 && v.a < v.m && v.c >= 0 && v.c < v.m && v.x0 >= 0 && v.x0 < v.m);
    let body = null, en = '', arr = '';
    if (!bad) {
      const run = lcgRun(v.a, v.c, v.m, v.x0), P = run.period, b = Math.round(Math.log2(v.m));
      let cs = null;
      if (isPow2(v.m) && v.c !== 0) cs = { n: 1, max: v.m, maxT: `m = 2<sup>${b}</sup> = ${v.m}`, conds: [[`c relatively prime to m (gcd(${v.c}, ${v.m}) = ${gcd(v.c, v.m)})`, gcd(v.c, v.m) === 1], [`a = 1 + 4k (${v.a} mod 4 = ${v.a % 4})`, v.a % 4 === 1]] };
      else if (isPow2(v.m) && v.c === 0) cs = { n: 2, max: v.m / 4, maxT: `m/4 = 2<sup>${b - 2}</sup> = ${v.m / 4}`, conds: [[`X₀ odd (X₀ = ${v.x0})`, v.x0 % 2 === 1], [`a = 3 + 8k or 5 + 8k (${v.a} mod 8 = ${v.a % 8})`, v.a % 8 === 3 || v.a % 8 === 5]] };
      else if (isPrime(v.m) && v.c === 0) { let k = 1, t = v.a % v.m; while (t !== 1 && k < v.m) { t = t * v.a % v.m; k++; } cs = { n: 3, max: v.m - 1, maxT: `m − 1 = ${v.m - 1}`, conds: [[`smallest k with m | a<sup>k</sup> − 1 is k = m − 1 (here k = ${t === 1 ? k : 'none'})`, t === 1 && k === v.m - 1]] }; }
      const allOk = cs && cs.conds.every(x => x[1]);
      body = html`<div className="mf4-stat">
        <div>Case: ${cs ? html`<b>Case ${cs.n}</b> (${cs.n === 1 ? 'm = 2^b, c ≠ 0' : cs.n === 2 ? 'm = 2^b, c = 0' : 'm prime, c = 0'})` : 'none of the three cases on slide 21'}</div>
        ${cs && cs.conds.map(([t, ok], k) => html`<div key=${k}><span className=${ok ? 'mf4-good' : 'mf4-bad'}>${ok ? '✓' : '✗'}</span> <span dangerouslySetInnerHTML=${{ __html: t }}></span></div>`)}
        ${cs && html`<div>Longest possible period: <span dangerouslySetInnerHTML=${{ __html: cs.maxT }}></span></div>`}
        <div>Period found by running it: <b className=${cs && P === cs.max ? 'mf4-good' : ''}>${P}</b>${run.start ? ` (after ${run.start} values before the cycle)` : ''}</div></div>
        <div className="mf4-chips" style=${{ marginTop: '8px' }}>${run.xs.slice(0, 18).map((x, k) => html`<span key=${k} className=${'mf4-chip' + (k === 0 ? ' hi' : '')}>${x}</span>`)}${run.xs.length > 18 ? html`<span className="mf4-chip dim">…</span>` : ''}</div>`;
      if (!cs) { en = `m = ${v.m} is neither a power of 2 nor a prime with c = 0, so slide 21 gives no rule here. Running the generator gives period <b>${P}</b>.`; arr = 'الـ m هنا مش power of 2 ومش prime مع <bdi dir="ltr">c&nbsp;=&nbsp;0</bdi>، فالـ slide 21 مالهاش قاعدة للحالة دي. ولما نشغّل الـ generator الـ period بيطلع:' + L(`m = ${v.m}, P = ${P}`); }
      else if (allOk) { en = `All conditions of Case ${cs.n} hold, so the generator reaches the longest possible period: <b>P = ${cs.max}</b>, and running it confirms ${P}.`; arr = 'كل شروط الحالة دي متحققة، فالـ generator بيوصل لأطول period ممكن، والتشغيل بيأكد ده:' + L(`Case ${cs.n}: P = ${cs.max}, found ${P}`); }
      else { en = `A condition of Case ${cs.n} fails, so the period (<b>${P}</b>) can be below the longest possible ${cs.max}.`; arr = 'فيه شرط من شروط الحالة دي مش متحقق، فالـ period ممكن يطلع أقل من أطول period ممكن:' + L(`Case ${cs.n}: max ${cs.max}, found ${P}`); }
    } else { en = 'Use 1 < m ≤ 65536, 0 < a < m, 0 ≤ c < m and 0 ≤ X₀ < m.'; arr = 'استخدم قيم في الحدود دي:' + L('1 < m ≤ 65536, 0 < a < m, 0 ≤ c < m, 0 ≤ X₀ < m'); }
    return html`<figure className="fig mf4"><div className="fig-stage">
      <div className="mf4-modes" role="group">
        <button className="fig-btn" onClick=${() => load(13, 0, 64, 1)}>Notes: X₀ = 1</button><button className="fig-btn" onClick=${() => load(13, 0, 64, 2)}>Notes: X₀ = 2</button><button className="fig-btn" onClick=${() => load(13, 0, 64, 4)}>Notes: X₀ = 4</button><button className="fig-btn" onClick=${() => load(17, 43, 100, 27)}>Example 1</button></div>
      <div className="mf4-form"><${NumIn} label="a" v=${p.a} set=${set('a')} /><${NumIn} label="c" v=${p.c} set=${set('c')} /><${NumIn} label="m" v=${p.m} set=${set('m')} w=${1} /><${NumIn} label="X₀" v=${p.x0} set=${set('x0')} /></div>
      ${body}</div><${Cap} en=${en} ar=${arr} showAr=${ar} /></figure>`;
  }

  /* ── slide 28 and the lecture spreadsheet: L'Ecuyer's combined generator ── */
  const ALGO = ['Step 1: select seeds X<sub>0,1</sub> in [1, 2147483562] and X<sub>0,2</sub> in [1, 2147483398]; i = 0', 'Step 2: X<sub>i+1,1</sub> = 40014·X<sub>i,1</sub> mod 2147483563 and X<sub>i+1,2</sub> = 40692·X<sub>i,2</sub> mod 2147483399', 'Step 3: X<sub>i+1</sub> = (X<sub>i+1,1</sub> − X<sub>i+1,2</sub>) mod 2147483562', 'Step 4: R<sub>i+1</sub> = X<sub>i+1</sub>/2147483563 if X<sub>i+1</sub> > 0, else 2147483562/2147483563', 'Step 5: i = i + 1, go back to Step 2'];
  function ClcgRun({ s1, s2, ar }) {
    const rows = clcg(s1, s2, 10), r0 = rows[0], d = r0.x1 - r0.x2;
    const steps = [
      { en: `Step 1: seeds <b>X<sub>0,1</sub> = ${s1}</b> and <b>X<sub>0,2</sub> = ${s2}</b>, i = 0.`, ar: 'الخطوة الأولى: نختار الـ seeds ونبدأ بالـ i من الصفر:' + L(`X<sub>0,1</sub> = ${s1}, X<sub>0,2</sub> = ${s2}`), s: 0, n: 0 },
      { en: `Step 2: each generator moves one step: X<sub>1,1</sub> = 40014 × ${s1} mod 2147483563 = <b>${r0.x1}</b>; X<sub>1,2</sub> = 40692 × ${s2} mod 2147483399 = <b>${r0.x2}</b>.`, ar: 'الخطوة التانية: كل generator بيتحرك خطوة:' + L(`X<sub>1,1</sub> = 40014 × ${s1} mod 2147483563 = ${r0.x1}<br>X<sub>1,2</sub> = 40692 × ${s2} mod 2147483399 = ${r0.x2}`), s: 1, n: 0 },
      { en: `Step 3: X₁ = (${r0.x1} − ${r0.x2}) mod 2147483562 = ${d} mod 2147483562 = <b>${r0.x}</b>` + (d < 0 ? ' (a negative difference wraps around by adding 2147483562).' : '.'), ar: 'الخطوة التالتة: نطرح الاتنين وناخد الـ mod، ولو الفرق سالب بنزوّد عليه 2147483562:' + L(`X₁ = (${r0.x1} − ${r0.x2}) mod 2147483562 = ${r0.x}`), s: 2, n: 0 },
      { en: `Step 4: X₁ > 0, so R₁ = ${r0.x}/2147483563 = <b>${r0.r.toFixed(6)}</b>.`, ar: 'الخطوة الرابعة: الـ X₁ أكبر من صفر، فبنقسم على الـ m₁:' + L(`R₁ = ${r0.x}/2147483563 = ${r0.r.toFixed(6)}`), s: 3, n: 1 },
      { en: 'Step 5: i = 1, go back to Step 2.', ar: 'الخطوة الخامسة: نزوّد الـ i بواحد ونرجع للخطوة التانية.', s: 4, n: 1 }
    ].concat(rows.slice(1).map((r, k) => ({ en: `i = ${k + 1}: Steps 2 to 4 give X<sub>${k + 2},1</sub> = ${r.x1}, X<sub>${k + 2},2</sub> = ${r.x2}, X${sub(k + 2)} = ${r.x}, R${sub(k + 2)} = <b>${r.r.toFixed(6)}</b>.`, ar: 'نفس الخطوات من التانية للرابعة بتدي:' + L(`X<sub>${k + 2},1</sub> = ${r.x1}, X<sub>${k + 2},2</sub> = ${r.x2}, X${sub(k + 2)} = ${r.x}, R${sub(k + 2)} = ${r.r.toFixed(6)}`), s: 3, n: k + 2 })))
      .concat([{ en: 'The combined generator\'s period is (m₁ − 1)(m₂ − 1)/2 = 2147483562 × 2147483398 / 2 ≈ 2.3 × 10¹⁸ (the slide says ≈ 2 × 10¹⁸).', ar: 'الـ period بتاع الـ combined generator كبير جدًا:' + L('(m₁ − 1)(m₂ − 1)/2 = 2147483562 × 2147483398 / 2 ≈ 2.3 × 10¹⁸') + 'والـ slide بتقرّبه لـ' + L('≈ 2 × 10¹⁸'), s: -1, n: 10 }]);
    const [i, ctl] = useSteps(steps.length, 2200), s = steps[i];
    const rowsShown = rows.slice(0, s.n), part = i >= 1 && i <= 2;
    const tb = rowsShown.map((r, k) => [k + 1, `<span class="st">${r.x1}</span><span class="st">${r.x2}</span>`, r.x, r.r.toFixed(6)]);
    if (part) tb.push([1, `<span class="st">${r0.x1}</span><span class="st">${r0.x2}</span>`, i >= 2 ? r0.x : '', '']);
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-algo">${ALGO.map((t, k) => html`<div key=${k} className=${s.s === k ? 'on' : ''} dangerouslySetInnerHTML=${{ __html: t }}></div>`)}</div>
      <${Tbl} head=${['i', 'X<sub>i,1</sub><br>X<sub>i,2</sub>', 'X<sub>i</sub>', 'R<sub>i</sub>']} rows=${tb} cls=${k => k === tb.length - 1 && s.s >= 0 ? 'cur' : ''} /></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function Clcg({ ar }) {
    const [mode, setMode] = useState('n'), [p, setP] = useState({ s1: '111', s2: '222' });
    const a = Math.round(+p.s1), b = Math.round(+p.s2), ok = a >= 1 && a <= 2147483562 && b >= 1 && b <= 2147483398;
    return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <${Modes} list=${[['n', 'Spreadsheet seeds 111, 222'], ['o', 'Try your own seeds']]} mode=${mode} set=${setMode} />
      ${mode === 'o' && html`<div className="mf4-form"><${NumIn} label="X₀,₁" v=${p.s1} set=${v => setP(o => Object.assign({}, o, { s1: v }))} w=${1} /><${NumIn} label="X₀,₂" v=${p.s2} set=${v => setP(o => Object.assign({}, o, { s2: v }))} w=${1} /></div>`}
      ${mode === 'o' && !ok ? html`<p className="mf4-msg">X₀,₁ in [1, 2147483562] and X₀,₂ in [1, 2147483398].</p>` : null}</div>
      ${(mode === 'n' || ok) && html`<${ClcgRun} key=${mode === 'n' ? 'n' : a + ',' + b} s1=${mode === 'n' ? 111 : a} s2=${mode === 'n' ? 222 : b} ar=${ar} />`}</figure>`;
  }

  /* ── slides 31-33: the two kinds of tests and the five tests ── */
  function TestsMap({ ar }) {
    const steps = [
      { en: 'Two categories of tests: <b>uniformity</b> (H₀: R<sub>i</sub> ~ U[0,1]) and <b>independence</b> (H₀: R<sub>i</sub> ~ independent). Failing to reject H₀ only means no evidence against it was detected.', ar: 'فيه نوعين من الـ tests: الـ <b>uniformity</b> والـ <b>independence</b>. ولو مرفضناش الـ H₀ فده معناه بس إننا ملقيناش دليل ضدها:' + L('H₀: R<sub>i</sub> ~ U[0,1]<br>H₀: R<sub>i</sub> ~ independent') },
      { en: '(1) <b>Frequency test</b> checks uniformity: Kolmogorov-Smirnov or chi-square against the uniform distribution.', ar: '(1) الـ <b>Frequency test</b> بيختبر الـ uniformity، بالـ Kolmogorov‑Smirnov أو بالـ chi‑square، ويقارن بالـ uniform distribution.' },
      { en: '(2) <b>Runs test</b>: runs up and down, runs above and below the mean (Z statistic for the number of runs, chi-square for their length).', ar: '(2) الـ <b>Runs test</b>: الـ runs up and down والـ runs above and below the mean. بنستخدم Z لعدد الـ runs، و chi‑square لأطوالها.' },
      { en: '(3) <b>Autocorrelation test</b>: compares the sample correlation with the expected correlation of zero.', ar: '(3) الـ <b>Autocorrelation test</b>: بيقارن الـ correlation بتاع العينة بالـ correlation المتوقع اللي هو صفر.' },
      { en: '(4) <b>Gap test</b>: counts the digits between repetitions of a digit, then compares with the expected gaps using Kolmogorov-Smirnov.', ar: '(4) الـ <b>Gap test</b>: بيعد الـ digits اللي بين تكرارات نفس الـ digit، ويقارن بالمتوقع باستخدام الـ Kolmogorov‑Smirnov.' },
      { en: '(5) <b>Poker test</b>: treats grouped digits as a poker hand and compares the hands with the expected ones using chi-square. Tests 2 to 5 all check <b>independence</b>.', ar: '(5) الـ <b>Poker test</b>: بيعتبر الأرقام المتجمعة كأنها إيد poker، ويقارن بالمتوقع باستخدام الـ chi‑square. والـ tests من 2 لـ 5 كلها بتختبر الـ <b>independence</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const T = (k, name, tag) => html`<div className=${'mf4-test ' + pop(i >= k)}>${name}<i>${tag}</i></div>`;
    return html`<figure className="fig mf4"><div className="fig-stage"><div className="mf4-map">
      <div className="mf4-grp"><b>Uniformity</b><div className="h">H₀: Rᵢ ~ U[0,1]</div>${T(1, '(1) Frequency test', 'KS or χ²')}</div>
      <div className="mf4-grp"><b>Independence</b><div className="h">H₀: Rᵢ ~ independent</div>${T(2, '(2) Runs test', 'Z / χ²')}${T(3, '(3) Autocorrelation', 'Z')}${T(4, '(4) Gap test', 'KS')}${T(5, '(5) Poker test', 'χ²')}</div>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 35-37: F(x), the empirical CDF and the KS statistic ── */
  const KS_T = { 1: [.950, .975, .995], 2: [.776, .842, .929], 3: [.642, .708, .828], 4: [.564, .624, .733], 5: [.510, .565, .669], 6: [.470, .521, .618], 7: [.438, .486, .577], 8: [.411, .457, .543], 9: [.388, .432, .514], 10: [.368, .410, .490], 11: [.352, .391, .468], 12: [.338, .375, .450], 13: [.325, .361, .433], 14: [.314, .349, .418], 15: [.304, .338, .404], 16: [.295, .328, .392], 17: [.286, .318, .381], 18: [.278, .309, .371], 19: [.272, .301, .363], 20: [.264, .294, .356], 25: [.24, .27, .32], 30: [.22, .24, .29], 35: [.21, .23, .27] };
  const ksCrit = (N, a) => N > 35 ? [1.22, 1.36, 1.63][a] / Math.sqrt(N) : KS_T[N] ? KS_T[N][a] : null;
  function ksStat(xs) { const s = xs.slice().sort((a, b) => a - b), N = s.length; const dp = s.map((r, k) => (k + 1) / N - r), dm = s.map((r, k) => r - k / N); const Dp = Math.max(...dp), Dm = Math.max(...dm); return { s, N, dp, dm, Dp, Dm, D: Math.max(Dp, Dm), ip: dp.indexOf(Dp), im: dm.indexOf(Dm) }; }
  // the 100 numbers of Example 4.5 (the printed "0.6" read as 0.06, as the notes' counts require)
  const EX45 = '0.34 0.90 0.25 0.89 0.87 0.44 0.12 0.21 0.46 0.67 0.83 0.76 0.79 0.64 0.70 0.81 0.94 0.74 0.22 0.74 0.96 0.99 0.77 0.67 0.56 0.41 0.52 0.73 0.99 0.02 0.47 0.30 0.17 0.82 0.56 0.05 0.45 0.31 0.78 0.05 0.79 0.71 0.23 0.19 0.82 0.93 0.65 0.37 0.39 0.42 0.99 0.17 0.99 0.46 0.05 0.66 0.10 0.42 0.18 0.49 0.37 0.51 0.54 0.01 0.81 0.28 0.69 0.34 0.75 0.49 0.72 0.43 0.56 0.97 0.30 0.94 0.96 0.58 0.73 0.05 0.6 0.39 0.84 0.24 0.40 0.64 0.40 0.19 0.79 0.62 0.18 0.26 0.97 0.88 0.64 0.47 0.60 0.11 0.29 0.78';
  const EX45N = fix => { const a = nums(EX45); a[80] = fix ? 0.06 : 0.6; return a; };
  function CdfPlot({ s, x0 = 0, x1 = 1, gaps, maxAt, ext, showS = true, aria }) {
    const W = 280, Hh = 250, l = 42, r = 266, t = 14, b = 214, X = x => l + (x - x0) / (x1 - x0) * (r - l), Y = y => b - y * (b - t);
    const N = s ? s.length : 0; let d = '';
    if (s && N) { d = `M${X(Math.max(x0, 0))} ${Y(0)}`; s.forEach((v, k) => { d += ` H${X(v)} V${Y((k + 1) / N)}`; }); d += ` H${X(Math.min(x1, 1))}`; }
    return html`<svg className="mf4-svg" viewBox=${`0 0 ${W} ${Hh}`} style=${{ maxWidth: '380px' }} role="img" aria-label=${aria}>
      <line x1=${l} y1=${b} x2=${r} y2=${b} stroke="var(--graphite)" /><line x1=${X(0)} y1=${b} x2=${X(0)} y2=${t - 4} stroke="var(--graphite)" />
      ${[0, .5, 1].map(v => html`<text key=${'x' + v} x=${X(v)} y=${b + 18} textAnchor="middle" fontSize="14">${v}</text>`)}
      ${[.5, 1].map(v => html`<text key=${'y' + v} x=${X(0) - 5} y=${Y(v) + 5} textAnchor="end" fontSize="14">${v}</text>`)}
      <path d=${`M${X(x0)} ${Y(0)} H${X(0)} L${X(1)} ${Y(1)} ${ext ? `H${X(x1)}` : ''}`} fill="none" stroke="var(--graphite)" strokeWidth="2" />
      <text x=${X(.62)} y=${Y(.62) - 10} fontSize="15" fontStyle="italic" textAnchor="end">F(x)</text>
      ${showS && d && html`<path d=${d} fill="none" stroke="var(--fig-k)" strokeWidth="2.6" />`}
      ${showS && d && html`<text x=${X(.82)} y=${Y(.6)} fontSize="15" fontStyle="italic" style=${{ fill: 'var(--fig-k)' }}>S<tspan fontSize="14" dy="3">N</tspan><tspan dy="-3">(x)</tspan></text>`}
      ${gaps && gaps.map((g, k) => html`<g key=${k}><line x1=${X(g.x)} y1=${Y(g.y1)} x2=${X(g.x)} y2=${Y(g.y2)} stroke=${g.max ? 'var(--pen)' : 'var(--ink)'} strokeWidth=${g.max ? 3.5 : 1.6} />
        <text x=${X(g.x) + (g.left ? -4 : 4)} y=${Y((g.y1 + g.y2) / 2) + 5} fontSize="14" textAnchor=${g.left ? 'end' : 'start'} fontWeight=${g.max ? 700 : 400} style=${{ fill: g.max ? 'var(--pen)' : 'var(--ink)', paintOrder: 'stroke', stroke: 'var(--paper-2)', strokeWidth: 4 }}>${g.t}</text></g>`)}
      ${maxAt && html`<circle cx=${X(maxAt.x)} cy=${Y(maxAt.y)} r="5" fill="var(--pen)" />`}
    </svg>`;
  }
  function KsCdf({ ar }) {
    const Ns = [0, 5, 10, 25, 50, 100], [k, setK] = useState(0), data = EX45N(true);
    const N = Ns[k], st = N ? ksStat(data.slice(0, N)) : null;
    const en = N === 0 ? 'F(x), the CDF of U[0,1] (slide 35): 0 for x < 0, the straight line from (0,0) to (1,1), then 1 for x > 1. Pick N to draw the empirical CDF S<sub>N</sub>(x).'
      : `S<sub>N</sub>(x) for the first <b>N = ${N}</b> of the 100 numbers of Example 4.5: a step function that jumps by 1/N at each observed value. Largest gap D = max |F(x) − S<sub>N</sub>(x)| = <b>${st.D.toFixed(3)}</b>. As N grows, S<sub>N</sub>(x) ≈ F(x). ‡ (lecture notes)`;
    const arr = N === 0 ? 'الـ <bdi dir="ltr">F(x)</bdi> هي الـ CDF بتاعة الـ uniform على الفترة من 0 لـ 1 (الـ slide 35): صفر قبل الـ 0، وبعدين خط مستقيم بين النقطتين دول، وبعدها 1:' + L('(0,0) → (1,1)') + 'اختار N عشان ترسم الـ empirical CDF.'
      : 'دي الـ <bdi dir="ltr">S<sub>N</sub>(x)</bdi> لأول N رقم من الـ 100 رقم بتوع Example 4.5. هي step function بتنط بمقدار <bdi dir="ltr">1/N</bdi> عند كل قيمة، وكل ما الـ N يكبر بتقرب من الـ <bdi dir="ltr">F(x)</bdi> ‡ (lecture notes). وأكبر فرق بينهم:' + L(`N = ${N}: D = max |F(x) − S<sub>N</sub>(x)| = ${st.D.toFixed(3)}`);
    return html`<figure className="fig mf4"><div className="fig-stage">
      <div className="mf4-modes" role="group">${Ns.map((n, j) => html`<button key=${n} className="fig-btn" aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${n === 0 ? 'F(x) only' : 'N = ' + n}</button>`)}</div>
      <${CdfPlot} s=${st && st.s} x0=${-0.15} x1=${1.15} ext=${1} aria="Uniform CDF and empirical CDF" maxAt=${null} />
      ${st && html`<p className="mf4-note">D = ${st.D.toFixed(3)}</p>`}</div>
      <${Cap} en=${en} ar=${arr} showAr=${ar} /></figure>`;
  }
  function KsSteps({ ar, top }) {
    const R = [0.44, 0.81, 0.14, 0.05, 0.93], st = ksStat(R), f2 = x => x.toFixed(2);
    const gaps = []; st.s.forEach((r, k) => { if (st.dm[k] > 0) gaps.push({ x: r, y1: k / 5, y2: r, t: f2(st.dm[k]), left: true, max: false }); if (st.dp[k] > 0) gaps.push({ x: r, y1: r, y2: (k + 1) / 5, t: f2(st.dp[k]), max: k === st.ip }); });
    const steps = [
      { en: 'N = 5 numbers: 0.44, 0.81, 0.14, 0.05, 0.93; α = 0.05.', ar: 'عندنا 5 أرقام والـ α هي 0.05:' + L('0.44, 0.81, 0.14, 0.05, 0.93') },
      { en: 'Step 1: rank from smallest to largest: R<sub>(i)</sub> = 0.05, 0.14, 0.44, 0.81, 0.93.', ar: 'الخطوة الأولى: نرتب من الأصغر للأكبر:' + L('R<sub>(i)</sub> = 0.05, 0.14, 0.44, 0.81, 0.93') },
      { en: 'Step 2: i/N = 0.20, 0.40, 0.60, 0.80, 1.00.', ar: 'الخطوة التانية: نحسب الـ <bdi dir="ltr">i/N</bdi>:' + L('i/N = 0.20, 0.40, 0.60, 0.80, 1.00') },
      { en: 'D⁺ = max{i/N − R<sub>(i)</sub>} = <b>0.26</b> (at i = 2). "-" marks a negative value, which cannot be the maximum.', ar: 'الـ D⁺ هو أكبر قيمة في الصف ده، والعلامة "-" معناها قيمة سالبة ومينفعش تبقى الـ max:' + L('D⁺ = max{i/N − R<sub>(i)</sub>} = 0.26 (i = 2)') },
      { en: 'D⁻ = max{R<sub>(i)</sub> − (i−1)/N} = <b>0.21</b> (at i = 4).', ar: 'والـ D⁻ هو أكبر قيمة في الصف التاني:' + L('D⁻ = max{R<sub>(i)</sub> − (i−1)/N} = 0.21 (i = 4)') },
      { en: 'The slide\'s plot: S<sub>N</sub>(x) jumps by 0.2 at each R<sub>(i)</sub>; the vertical gaps to F(x) = x are 0.05, 0.15, 0.26, 0.04, 0.16, 0.21, 0.13, 0.07. The largest, <b>0.26</b>, is just after R<sub>(2)</sub> = 0.14.', ar: 'رسمة الـ slide: الـ <bdi dir="ltr">S<sub>N</sub>(x)</bdi> بتنط 0.2 عند كل <bdi dir="ltr">R<sub>(i)</sub></bdi>، والمسافات الرأسية بينها وبين الـ <bdi dir="ltr">F(x)</bdi> هي اللي تحت. وأكبرها 0.26 بعد <bdi dir="ltr">R<sub>(2)</sub></bdi> على طول:' + L('0.05, 0.15, 0.26, 0.04, 0.16, 0.21, 0.13, 0.07') },
      { en: 'Step 3: D = max(D⁺, D⁻) = <b>0.26</b>. Step 4: D<sub>0.05</sub> for N = 5 is 0.565. Step 5: D = 0.26 ≤ 0.565, so <b>H₀ is not rejected</b>: no difference from the uniform distribution was detected.', ar: 'الخطوة التالتة والرابعة والخامسة: نجيب الـ D ونقارنه بالـ critical value. الـ D أصغر، يعني <b>مش هنرفض الـ H₀</b>، ومفيش فرق اتلاحظ عن الـ uniform distribution:' + L('D = max(0.26, 0.21) = 0.26 ≤ D<sub>0.05</sub> = 0.565') }
    ];
    const [i, ctl] = useSteps(steps.length, 2500);
    const rowR = i >= 1 ? st.s : R, cell = (v, k, hi) => (v > 0 ? f2(v) : '-');
    const rows = [['R<sub>(i)</sub>'].concat(rowR.map(f2))];
    if (i >= 2) rows.push(['i/N'].concat([1, 2, 3, 4, 5].map(k => (k / 5).toFixed(2))));
    if (i >= 3) rows.push(['i/N − R<sub>(i)</sub>'].concat(st.dp.map(cell)));
    if (i >= 4) rows.push(['R<sub>(i)</sub> − (i−1)/N'].concat(st.dm.map(cell)));
    return html`<figure className="fig mf4"><div className="fig-stage">${top}
      <table className="mf4-tbl"><thead><tr><th>${i >= 1 ? 'i' : ''}</th>${[1, 2, 3, 4, 5].map(k => html`<th key=${k}>${i >= 1 ? k : ''}</th>`)}</tr></thead><tbody>
        ${rows.map((r, j) => html`<tr key=${j}><td className="l" style=${{ whiteSpace: 'normal', maxWidth: '76px' }} dangerouslySetInnerHTML=${{ __html: r[0] }}></td>${r.slice(1).map((c, k) => html`<td key=${k} className=${(j === 2 && k === st.ip && i >= 3) || (j === 3 && k === st.im && i >= 4) ? 'hi' : ''}>${c}</td>`)}</tr>`)}</tbody></table>
      <div className=${pop(i >= 5)} style=${{ marginTop: '8px' }}><${CdfPlot} s=${st.s} gaps=${i >= 5 ? gaps : null} aria="Empirical CDF of the five numbers against F(x) = x" /></div>
      ${i >= 6 && html`<p className="mf4-big">D = <b>0.26</b> ≤ D<sub>0.05</sub> = 0.565 → <span className="mf4-good">not rejected</span></p>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  function KsOwn({ ar, top }) {
    const [t, setT] = useState('0.44, 0.81, 0.14, 0.05, 0.93'), [a, setA] = useState(1);
    const xs = nums(t), bad = !xs.length || xs.some(x => x < 0 || x > 1), N = xs.length, st = bad ? null : ksStat(xs), crit = bad ? null : ksCrit(N, a);
    const f = x => x.toFixed(3);
    let en, arr;
    if (bad) { en = 'Type numbers between 0 and 1, separated by spaces or commas.'; arr = 'اكتب أرقام بين 0 و 1، وافصل بينهم بمسافة أو comma.'; }
    else if (crit == null) { en = `D = ${f(st.D)}, but Table A.8 on the slide lists no D<sub>α</sub> for N = ${N} (it gives N = 1 to 20, 25, 30, 35 and the formula for N over 35).`; arr = 'الـ D اتحسب، بس جدول الـ slide مفيهوش critical value للـ N ده. الجدول فيه من 1 لـ 20، و 25 و 30 و 35، وقانون للـ N اللي أكبر من 35:' + L(`N = ${N}, D = ${f(st.D)}`); }
    else { const rej = st.D > crit; en = `N = ${N}: D⁺ = ${f(st.Dp)}, D⁻ = ${f(st.Dm)}, D = <b>${f(st.D)}</b>; D<sub>${['0.10', '0.05', '0.01'][a]}</sub> = ${f(crit)}. ${rej ? '<b>D > D<sub>α</sub>: reject H₀</b> (not uniform).' : '<b>D ≤ D<sub>α</sub>: H₀ is not rejected.</b>'}`; arr = (rej ? 'الـ D أكبر من الـ critical value، يعني <b>بنرفض الـ H₀</b>:' : 'الـ D أصغر من أو بيساوي الـ critical value، يعني <b>مش هنرفض الـ H₀</b>:') + L(`N = ${N}, D⁺ = ${f(st.Dp)}, D⁻ = ${f(st.Dm)}, D = ${f(st.D)}, D<sub>α</sub> = ${f(crit)}`); }
    return html`<figure className="fig mf4"><div className="fig-stage">${top}
      <textarea className="mf4-ta" aria-label="Your numbers" value=${t} onChange=${e => setT(e.target.value)}></textarea>
      <${Modes} list=${[[0, 'α = 0.10'], [1, 'α = 0.05'], [2, 'α = 0.01']]} mode=${a} set=${setA} />
      ${st && html`<div style=${{ maxHeight: '260px', overflowY: 'auto' }}><${Tbl} head=${['i', 'R<sub>(i)</sub>', 'i/N − R<sub>(i)</sub>', 'R<sub>(i)</sub> − (i−1)/N']} rows=${st.s.map((r, k) => [k + 1, r, st.dp[k] > 0 ? f(st.dp[k]) : '-', st.dm[k] > 0 ? f(st.dm[k]) : '-'])} cls=${k => k === st.ip || k === st.im ? 'cur' : ''} /></div>`}
      ${st && html`<${CdfPlot} s=${st.s} aria="Empirical CDF of your numbers" />`}</div>
      <${Cap} en=${en} ar=${arr} showAr=${ar} /></figure>`;
  }
  function Ks({ ar }) {
    const [mode, setMode] = useState('n');
    const top = html`<${Modes} list=${[['n', 'Example from the notes'], ['o', 'Try your own']]} mode=${mode} set=${setMode} />`;
    return mode === 'n' ? html`<${KsSteps} ar=${ar} top=${top} />` : html`<${KsOwn} ar=${ar} top=${top} />`;
  }

  /* ── slides 48-51: the autocorrelation test ── */
  const A30 = nums('0.12 0.01 0.23 0.28 0.89 0.31 0.64 0.28 0.83 0.93 0.99 0.15 0.33 0.35 0.91 0.41 0.60 0.27 0.75 0.88 0.68 0.49 0.05 0.43 0.95 0.58 0.19 0.36 0.69 0.87');
  function AutoRun({ i0, m, notes, ar }) {
    const N = 30, M = Math.floor((N - i0) / m) - 1, idx = Array.from({ length: M + 2 }, (_, k) => i0 + k * m), R = j => A30[j - 1];
    const prods = Array.from({ length: M + 1 }, (_, k) => R(idx[k]) * R(idx[k + 1])), sum = prods.reduce((a, b) => a + b, 0);
    const rho = sum / (M + 1) - .25, sg = Math.sqrt(13 * M + 7) / (12 * (M + 1)), z = rho / sg, ok = Math.abs(z) <= 1.96;
    const f2 = x => x.toFixed(2), rs = rho.toFixed(4).replace('-', '−'), ss = sg.toFixed(4), zs = z.toFixed(3).replace('-', '−');
    const steps = [];
    if (notes) steps.push({ en: 'Slide 48: the 30 numbers (five per row here). The 5th, 10th, 15th, … numbers (last column) are all large: such a pattern can pass the other tests and still be dependent.', ar: 'دي الـ 30 رقم بتوع الـ slide 48، خمسة في كل صف. الأرقام اللي في المكان الخامس والعاشر والخامس عشر وهكذا (آخر عمود) كلها كبيرة، والـ pattern ده ممكن يعدّي من الـ tests التانية وهو dependent.', hi: [5, 10, 15, 20, 25, 30] });
    steps.push({ en: `i = ${i0}, lag m = ${m}, N = 30: M is the largest integer with i + (M+1)m ≤ N: ${i0} + (M+1)·${m} ≤ 30, so <b>M = ${M}</b>.`, ar: 'الـ M هو أكبر عدد صحيح يحقق الشرط ده:' + L(`${i0} + (M+1)·${m} ≤ 30 → M = ${M}`), hi: [] });
    steps.push({ en: `The numbers tested: ${idx.map(j => `R${sub(j)} = ${f2(R(j))}`).join(', ')}.`, ar: 'الأرقام اللي هنختبرها:' + L(idx.map(j => `R${sub(j)} = ${f2(R(j))}`).join(', ')), hi: idx });
    prods.forEach((p, k) => steps.push({ en: `R${sub(idx[k])} × R${sub(idx[k + 1])} = (${f2(R(idx[k]))})(${f2(R(idx[k + 1]))}) = ${p.toFixed(4)}. Running sum = <b>${prods.slice(0, k + 1).reduce((a, b) => a + b, 0).toFixed(4)}</b>.`, ar: 'نضرب كل رقم في اللي بعده ونجمع:' + L(`(${f2(R(idx[k]))})(${f2(R(idx[k + 1]))}) = ${p.toFixed(4)}, sum = ${prods.slice(0, k + 1).reduce((a, b) => a + b, 0).toFixed(4)}`), hi: idx, on: [idx[k], idx[k + 1]] }));
    steps.push({ en: `ρ̂<sub>${i0}${m}</sub> = [1/(M+1)] Σ − 0.25 = ${sum.toFixed(4)}/${M + 1} − 0.25 = <b>${rs}</b>.`, ar: 'نحسب الـ estimator:' + L(`ρ̂ = ${sum.toFixed(4)}/${M + 1} − 0.25 = ${rs}`), hi: idx });
    steps.push({ en: `σ̂ = √(13M + 7) / [12(M + 1)] = √${13 * M + 7}/${12 * (M + 1)} = <b>${ss}</b>.`, ar: 'ونحسب الـ standard deviation:' + L(`σ̂ = √(13(${M}) + 7) / [12(${M} + 1)] = √${13 * M + 7}/${12 * (M + 1)} = ${ss}`), hi: idx });
    steps.push({ en: `Z₀ = ρ̂/σ̂ = ${rs}/${ss} = <b>${zs}</b>` + (notes ? ' (the slide prints −1.516; exact division gives −1.519 ‡).' : '.'), ar: 'والـ Z₀ بيطلع كده' + (notes ? '، والـ slide كاتبة <bdi dir="ltr">−1.516</bdi> والقسمة الصح بتدي <bdi dir="ltr">−1.519</bdi> ‡' : '') + ':' + L(`Z₀ = ${rs}/${ss} = ${zs}`), hi: idx, z: 1 });
    steps.push({ en: `z<sub>0.025</sub> = 1.96 and ${ok ? `−1.96 ≤ ${zs} ≤ 1.96, so the hypothesis of independence is <b>not rejected</b>.` : `|Z₀| > 1.96, so the hypothesis of independence is <b>rejected</b>.`}` + (rho > 0 ? ' (ρ̂ > 0: positive autocorrelation, high numbers tend to follow high ones.)' : ' (ρ̂ < 0: negative autocorrelation, low numbers tend to be followed by high ones.)'), ar: (ok ? 'الـ Z₀ جوه منطقة القبول، يعني <b>مش بنرفض</b> الـ independence' : 'الـ Z₀ برّه منطقة القبول، يعني <b>بنرفض</b> الـ independence') + '، والإشارة بتقول نوع الـ autocorrelation لو موجود:' + L(`−1.96 ≤ Z₀ ≤ 1.96? Z₀ = ${zs}; ρ̂ ${rho > 0 ? '> 0' : '< 0'}`), hi: idx, z: 1 });
    const [i, ctl] = useSteps(steps.length, 2300), s = steps[i], hi = new Set(s.hi), on = new Set(s.on || []);
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-grid5">${A30.map((x, k) => html`<span key=${k} className=${(hi.has(k + 1) ? 'hi' : '') + (on.has(k + 1) ? ' on' : '')}><small>R${sub(k + 1)}</small>${f2(x)}</span>`)}</div>
      ${s.z ? html`<div style=${{ marginTop: '8px' }}><${Normal} z=${z} zLabel=${'Z₀ = ' + zs} /></div>` : html`<p className="mf4-big">Σ = <b>${(i >= steps.length - 5 ? sum : prods.slice(0, Math.max(0, i - (notes ? 2 : 1))).reduce((a, b) => a + b, 0)).toFixed(4)}</b></p>`}</div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function Autocorr({ ar }) {
    const [mode, setMode] = useState('n'), [p, setP] = useState({ i: '3', m: '5' });
    const i0 = Math.round(+p.i), m = Math.round(+p.m), ok = i0 >= 1 && m >= 1 && i0 + 2 * m <= 30;
    return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <${Modes} list=${[['n', 'Example: i = 3, m = 5'], ['o', 'Try your own i, m']]} mode=${mode} set=${setMode} />
      ${mode === 'o' && html`<div className="mf4-form"><${NumIn} label="i" v=${p.i} set=${v => setP(o => Object.assign({}, o, { i: v }))} /><${NumIn} label="lag m" v=${p.m} set=${v => setP(o => Object.assign({}, o, { m: v }))} /></div>`}
      ${mode === 'o' && !ok ? html`<p className="mf4-msg">Pick i ≥ 1 and m ≥ 1 with i + 2m ≤ 30 (so M ≥ 1).</p>` : null}</div>
      ${(mode === 'n' || ok) && html`<${AutoRun} key=${mode === 'n' ? 'n' : i0 + ',' + m} i0=${mode === 'n' ? 3 : i0} m=${mode === 'n' ? 5 : m} notes=${mode === 'n'} ar=${ar} />`}</figure>`;
  }

  /* ── chi-square: bars of observed counts against the expected line ── */
  function Bars({ O, E, upto, labels, hi }) {
    const W = 280, l = 26, r = 272, t = 22, b = 170, mx = Math.max(E * 1.8, ...O, 1), bw = (r - l) / O.length, Y = v => b - v / mx * (b - t);
    return html`<svg className="mf4-svg" viewBox=${`0 0 ${W} 200`} style=${{ maxWidth: '420px' }} role="img" aria-label="Observed count per class against the expected count">
      <line x1=${l} y1=${b} x2=${r} y2=${b} stroke="var(--graphite)" />
      ${O.map((o, k) => html`<g key=${k} className="fade" style=${{ opacity: k < upto ? 1 : .15 }}>
        <rect x=${l + k * bw + 3} y=${Y(o)} width=${bw - 6} height=${b - Y(o)} fill=${k === hi ? 'var(--pen)' : 'var(--fig-k)'} opacity=".75" />
        <text x=${l + k * bw + bw / 2} y=${Y(o) - 5} textAnchor="middle" fontSize="14" fontWeight="700">${o}</text>
        <text x=${l + k * bw + bw / 2} y=${b + 18} textAnchor="middle" fontSize="13.5">${labels[k]}</text></g>`)}
      <line x1=${l} y1=${Y(E)} x2=${r} y2=${Y(E)} stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
      <text x=${l - 3} y=${Y(E) + 5} textAnchor="end" fontSize="14">${E}</text>
    </svg>`;
  }
  /* ── slide 40: 100 numbers, 10 intervals ── */
  function ChiSlide({ ar }) {
    const O = [10, 9, 5, 6, 16, 13, 10, 7, 10, 14], E = 10, terms = O.map(o => (o - E) ** 2 / E);
    const steps = [{ en: '100 numbers, 10 intervals of width 0.1, α = 0.05: each interval expects E<sub>i</sub> = 100/10 = <b>10</b>; degrees of freedom = 10 − 1 = 9.', ar: 'عندنا 100 رقم و 10 intervals، والـ α هي 0.05. كل interval متوقع يجيله 10، ودرجات الحرية 9:' + L('E<sub>i</sub> = N/n = 100/10 = 10, df = n − 1 = 9'), k: 0 }]
      .concat(O.map((o, k) => { const line = `(${o} − 10)²/10 = ${(o - 10) ** 2}/10 = ${terms[k].toFixed(1)}`, sum = terms.slice(0, k + 1).reduce((s, x) => s + x, 0);
        return { en: `Interval ${k + 1} (up to ${((k + 1) / 10).toFixed(1)}): O = ${o}, ${line}. Running χ₀² = <b>${sum.toFixed(1)}</b>.`, ar: 'الـ interval ده فيه ' + o + ' رقم، والحد بتاعه:' + L(`${line}, χ₀² so far = ${sum.toFixed(1)}`), k: k + 1 }; }))
      .concat([{ en: 'χ₀² = <b>11.2</b> < χ²<sub>0.05,9</sub> = 16.9, so <b>accept</b> (do not reject) uniformity. (The slide\'s "Sum" row shows 0 under (O<sub>i</sub>−E<sub>i</sub>)²; that column sums to 112 ‡.)', ar: 'الـ χ₀² أصغر من الـ critical value، يعني <b>بنقبل</b> الـ uniformity (مش بنرفضها). وفي صف الـ Sum الـ slide كاتبة 0 تحت العمود ده:' + L('(O<sub>i</sub>−E<sub>i</sub>)²') + 'والصح إن مجموعه 112 ‡:' + L('χ₀² = 11.2 < χ²<sub>0.05,9</sub> = 16.9'), k: 10 }]);
    const [i, ctl] = useSteps(steps.length, 1500), k = steps[i].k, sum = terms.slice(0, k).reduce((s, x) => s + x, 0);
    return html`<figure className="fig mf4"><div className="fig-stage">
      <${Bars} O=${O} E=${E} upto=${k} labels=${O.map((_, j) => j + 1)} hi=${i > 0 && i <= 10 ? k - 1 : -1} />
      <p className="mf4-big">χ₀² = Σ (O<sub>i</sub> − E<sub>i</sub>)²/E<sub>i</sub> = <b>${sum.toFixed(1)}</b>${i === steps.length - 1 ? html` ${'<'} 16.9 → <span className="mf4-good">accept</span>` : ''}</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  /* ── Example 4.5: the 100 numbers dropped into 10 classes ── */
  const chiClass = x => Math.min(9, Math.max(0, Math.ceil(Math.round(x * 100) / 10) - 1)); // (0.01-0.10) → class 1, …
  function ChiData({ ar }) {
    const [mode, setMode] = useState('a'), [t, setT] = useState(EX45), [k, setK] = useState(calm() ? 100 : 0), [key, setKey] = useState(0);
    const data = mode === 'a' ? EX45N(true) : mode === 'b' ? EX45N(false) : nums(t).filter(x => x >= 0 && x <= 1);
    const N = data.length;
    useEffect(() => { if (calm()) { setK(N); return; } setK(0); const id = setInterval(() => setK(x => { if (x >= N) { clearInterval(id); return x; } return x + 1; }), 45); return () => clearInterval(id); }, [mode, key, mode === 'o' ? t : '']);
    const shown = Math.min(k, N), O = Array(10).fill(0); data.slice(0, shown).forEach(x => O[chiClass(x)]++);
    const E = N / 10, chi = O.reduce((s, o) => s + (o - E) ** 2 / E, 0), done = shown >= N && N > 0, cur = shown > 0 && !done ? data[shown - 1] : null;
    const labels = ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1'];
    let en, arr;
    if (!done) { en = `Each number goes to its class (0.01-0.10), (0.11-0.20), …, (0.91-1.00). ${cur != null ? `Now: <b>${cur.toFixed(2)}</b> → class ${chiClass(cur) + 1}.` : ''}`; arr = 'كل رقم بيروح للـ class بتاعته، والـ classes هي:' + L('(0.01-0.10), (0.11-0.20), …, (0.91-1.00)'); }
    else if (mode === 'o') { const rej = chi > 16.9; en = `N = ${N}, E<sub>i</sub> = N/10 = ${E}; χ₀² = <b>${chi.toFixed(2)}</b> ${rej ? '>' : '≤'} χ²<sub>0.05,9</sub> = 16.9, so uniformity is ${rej ? '<b>rejected</b>' : '<b>not rejected</b>'}.${N < 50 ? ' (The test is valid only for large samples, N ≥ 50.)' : ''}`; arr = (rej ? 'الـ χ₀² أكبر من الـ critical value، يعني <b>بنرفض</b> الـ uniformity' : 'الـ χ₀² مش أكبر من الـ critical value، يعني <b>مش بنرفض</b> الـ uniformity') + (N < 50 ? '، بس خد بالك إن الـ test ده بيصلح للعينات الكبيرة بس' : '') + ':' + L(`N = ${N}, E<sub>i</sub> = ${E}, χ₀² = ${chi.toFixed(2)}, χ²<sub>0.05,9</sub> = 16.9`); }
    else { en = `Observed counts ${O.join(', ')}; E<sub>i</sub> = 10. χ₀² = <b>${chi.toFixed(1)}</b> < χ²<sub>0.05,9</sub> = 16.9, so uniformity is <b>not rejected</b>. ` + (mode === 'a' ? 'This reads the printed "0.6" (9th row) as 0.06, which is what the notes\' counts need. ‡' : 'Reading the printed "0.6" as 0.60 moves one number from class 1 to class 6: χ₀² = 3.6, same conclusion. ‡'); arr = 'الـ χ₀² أصغر من الـ critical value، يعني <b>مش بنرفض</b> الـ uniformity:' + L(`O = ${O.join(', ')}; χ₀² = ${chi.toFixed(1)} < 16.9`) + (mode === 'a' ? 'هنا قرينا الرقم المطبوع 0.6 في الصف التاسع على إنه 0.06، وده اللي بيطلّع العدّات بتاعة الـ notes ‡.' : 'ولو قرينا الرقم المطبوع 0.6 على إنه 0.60، رقم واحد بيتنقل من الـ class الأولى للسادسة والـ χ₀² بتبقى 3.6، ونفس النتيجة ‡.'); }
    return html`<figure className="fig mf4"><div className="fig-stage">
      <${Modes} list=${[['a', 'Notes (0.6 as 0.06)'], ['b', '0.6 as 0.60'], ['o', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'o' && html`<textarea className="mf4-ta" aria-label="Your numbers" value=${t} onChange=${e => setT(e.target.value)}></textarea>`}
      ${N === 0 ? html`<p className="mf4-msg">Type numbers between 0 and 1.</p>` : html`<${Bars} O=${O} E=${E} upto=${10} labels=${labels} hi=${cur != null ? chiClass(cur) : -1} />`}
      <p className="mf4-big">${shown} of ${N} placed${done ? html` · χ₀² = <b>${chi.toFixed(mode === 'o' ? 2 : 1)}</b>` : ''}</p>
      ${done && mode !== 'o' && html`<${Tbl} head=${['Class', 'O<sub>i</sub>', '(O<sub>i</sub>−E<sub>i</sub>)²/E<sub>i</sub>']} rows=${O.map((o, j) => [`${(j / 10 + .01).toFixed(2)}-${((j + 1) / 10).toFixed(2)}`, o, ((o - 10) ** 2 / 10).toFixed(1)]).concat([['Total', N, chi.toFixed(1)]])} cls=${j => j === 10 ? 'sum' : ''} />`}</div>
      <${Cap} en=${en} ar=${arr} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setKey(x => x + 1)}>↻ Replay</button></div></figure>`;
  }

  /* ── slide 42: gaps between repeats of a digit ── */
  const DIG = '4,1,3,5,1,7,2,8,2,0,7,9,1,3,5,2,7,9,4,1,6,3,3,9,6,3,4,8,2,3,1,9,4,4,6,8,4,1,3,8,9,5,5,7,3,9,5,9,8,5,3,2,2,3,7,4,7,0,3,6,3,5,9,9,5,5,5,0,4,6,8,0,4,7,0,3,3,0,9,5,7,9,5,1,6,6,3,8,8,8,9,2,9,1,8,5,4,4,5,0,2,3,9,7,1,2,0,3,6,3'.split(',').map(Number);
  const gapsOf = d => { const pos = []; DIG.forEach((x, k) => { if (x === d) pos.push(k); }); return { pos, g: pos.slice(1).map((p, k) => p - pos[k] - 1) }; };
  function GapRun({ d, ar }) {
    const { pos, g } = gapsOf(d), per = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => gapsOf(x).g.length);
    const steps = [{ en: `The 110 digits, with every <b>${d}</b> marked: ${pos.length} of them, so <b>${g.length} gaps</b> (number of gaps = number of ${d}'s − 1).`, ar: 'دي الـ 110 digit، ومعلّم عليها كل الـ ' + d + '. عددها ' + pos.length + '، يعني عدد الـ gaps هو العدد ناقص واحد:' + L(`${pos.length} − 1 = ${g.length} gaps`), j: -1 }]
      .concat(g.map((x, j) => ({ en: `Gap ${j + 1}: between the ${d} at position ${pos[j] + 1} and the next at ${pos[j + 1] + 1} there are <b>${x}</b> other digits.`, ar: 'الـ gap دي بين الـ ' + d + ' اللي في مكان ' + (pos[j] + 1) + ' واللي بعده في مكان ' + (pos[j + 1] + 1) + '، وطولها:' + L(`gap ${j + 1} = ${x}`), j })))
      .concat([{ en: `All lengths for ${d}: ${g.join(', ')}. Over all ten digits: ${per.join(' + ')} = <b>100 gaps</b> = 110 − 10.`, ar: 'كل الأطوال بتاعة الـ ' + d + ' تحت، ولو جمعنا الـ gaps لكل الـ 10 digits نلاقي 100 gap، يعني 110 ناقص 10:' + L(`${g.join(', ')}<br>${per.join(' + ')} = 100`), j: g.length }]);
    const [i, ctl] = useSteps(steps.length, 1100), j = steps[i].j;
    const inGap = new Set(); if (j >= 0 && j < g.length) for (let p = pos[j] + 1; p < pos[j + 1]; p++) inGap.add(p);
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-digits" aria-label="110 digits">${DIG.map((x, k) => html`<span key=${k} className=${x === d ? 't' : inGap.has(k) ? 'g' : ''}>${x}</span>`)}</div>
      <div className="mf4-chips" style=${{ marginTop: '8px' }}>${g.slice(0, Math.max(0, Math.min(j + 1, g.length))).map((x, q) => html`<span key=${q} className=${'mf4-chip' + (q === j ? ' hi' : '')}>${x}</span>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function GapDigits({ ar }) {
    const [d, setD] = useState(3);
    return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <div className="mf4-modes" role="group" aria-label="Digit">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => html`<button key=${x} className="fig-btn" style=${{ minWidth: '34px', padding: '4px 8px' }} aria-pressed=${String(d === x)} onClick=${() => setD(x)}>${x}</button>`)}</div></div>
      <${GapRun} key=${d} d=${d} ar=${ar} /></figure>`;
  }
  /* ── slides 43-46: KS on the gap lengths ── */
  function GapKs({ ar }) {
    const freq = [35, 22, 17, 9, 5, 6, 3, 0, 0, 2, 0, 1]; let c = 0;
    const rows = freq.map((f, k) => { c += f; const F = 1 - Math.pow(0.9, 4 * k + 4), S = c / 100; return { cl: `${4 * k}-${4 * k + 3}`, f, S, F, d: Math.abs(F - S), x: 4 * k + 3 }; });
    const mx = rows.reduce((b, r, k) => r.d > rows[b].d ? k : b, 0);
    const steps = [{ en: '100 gaps (110 digits − 10). For random digits P(gap = x) = (0.9)<sup>x</sup>(0.1), so the CDF is <b>F(x) = 1 − 0.9<sup>x+1</sup></b>. The gaps are grouped in classes of width 4, and F is taken at the upper end of each class.', ar: 'عندنا 100 gap. لو الـ digits random يبقى احتمال الـ gap ودالة الـ CDF بتوعها زي ما تحت. الـ gaps متقسمة classes عرضها 4، والـ F بتتحسب عند آخر الـ class:' + L('P(gap = x) = (0.9)<sup>x</sup>(0.1)<br>F(x) = 1 − 0.9<sup>x+1</sup>'), k: -1 }]
      .concat(rows.map((r, k) => ({ en: `Class ${r.cl}: frequency ${r.f}, S<sub>N</sub>(${r.x}) = ${r.S.toFixed(2)}, F(${r.x}) = 1 − 0.9<sup>${r.x + 1}</sup> = ${r.F.toFixed(4)}, |F − S<sub>N</sub>| = <b>${r.d.toFixed(4)}</b>.` + (k === 6 ? ' (The slide prints F = 0.9497; 1 − 0.9²⁸ = 0.9477, which matches its 0.0223 ‡.)' : k === 9 ? ' (The slide prints 0.0043; 0.99 − 0.9852 = 0.0048 ‡.)' : ''), ar: 'الـ class دي:' + L(`${r.cl}: freq ${r.f}, S<sub>N</sub> = ${r.S.toFixed(2)}, F(${r.x}) = 1 − 0.9<sup>${r.x + 1}</sup> = ${r.F.toFixed(4)}, |F − S<sub>N</sub>| = ${r.d.toFixed(4)}`) + (k === 6 ? 'الـ slide كاتبة 0.9497 والصح 0.9477، وده اللي بيدي الـ 0.0223 اللي في الـ slide ‡.' : k === 9 ? 'الـ slide كاتبة 0.0043 هنا، والصح 0.0048 ‡.' : ''), k })))
      .concat([{ en: `The largest deviation is <b>D = ${rows[mx].d.toFixed(4)}</b> (class ${rows[mx].cl}). D<sub>0.05</sub> = 1.36/√100 = 0.136. Since 0.0224 < 0.136, <b>do not reject</b> independence. (Re-counting the printed digits gives 1 gap in 36-39 and 2 in 44-47 instead of 2 and 1; D and the decision do not change ‡.)`, ar: 'أكبر فرق هو الـ D، والـ critical value أكبر منه، يعني <b>مش بنرفض</b> الـ independence:' + L(`D = ${rows[mx].d.toFixed(4)} < D<sub>0.05</sub> = 1.36/√100 = 0.136`) + 'ولو عدّينا الـ digits المطبوعة تاني بنلاقي gap واحدة واتنين في الـ classes دي بدل العكس:' + L('36-39: 1, 44-47: 2') + 'والـ D والقرار مبيتغيروش ‡.', k: 12 }]);
    const [i, ctl] = useSteps(steps.length, 1600), k = steps[i].k, end = k === 12;
    return html`<figure className="fig mf4"><div className="fig-stage">
      <${Tbl} head=${['Gap length', 'Freq.', 'S<sub>N</sub>(x)', 'F(x)', '|F − S<sub>N</sub>|']} rows=${rows.map((r, j) => j <= k ? [r.cl, r.f, r.S.toFixed(2), r.F.toFixed(4), (end && j === mx ? '<b>' : '') + r.d.toFixed(4) + (end && j === mx ? '</b>' : '')] : [r.cl, '', '', '', ''])} cls=${j => j === k ? 'cur' : end && j === mx ? 'cur' : ''} />
      ${end && html`<p className="mf4-big">D = <b>0.0224</b> ${'<'} 0.136 → <span className="mf4-good">not rejected</span></p>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── the standard normal acceptance region (slide 56) ── */
  function Normal({ z, zLabel, shade = true }) {
    const X = v => 150 + v / 3.6 * 135, phi = v => Math.exp(-v * v / 2), Y = v => 118 - phi(v) * 90;
    let d = ''; for (let v = -3.6; v <= 3.601; v += .1) d += (d ? ' L' : 'M') + X(v).toFixed(1) + ' ' + Y(v).toFixed(1);
    const tail = (a, b) => { let p = `M${X(a)} 118`; for (let v = a; v <= b + 1e-9; v += .05) p += ` L${X(v).toFixed(1)} ${Y(v).toFixed(1)}`; return p + ` L${X(b)} 118 Z`; };
    const zc = Math.max(-3.5, Math.min(3.5, z == null ? 0 : z));
    return html`<svg className="mf4-svg" viewBox="0 0 300 160" style=${{ maxWidth: '420px' }} role="img" aria-label="Standard normal curve with the acceptance region">
      ${shade && html`<path d=${tail(-3.6, -1.96)} fill="var(--pen)" opacity=".35" />`}${shade && html`<path d=${tail(1.96, 3.6)} fill="var(--pen)" opacity=".35" />`}
      <path d=${d} fill="none" stroke="var(--ink)" strokeWidth="2" /><line x1="10" y1="118" x2="290" y2="118" stroke="var(--graphite)" />
      <line x1=${X(0)} y1="118" x2=${X(0)} y2=${Y(0)} stroke="var(--graphite)" strokeWidth="1" />
      ${shade && html`<g><line x1=${X(-1.96)} y1="118" x2=${X(-1.96)} y2=${Y(-1.96) - 4} stroke="var(--pen)" strokeWidth="2" /><line x1=${X(1.96)} y1="118" x2=${X(1.96)} y2=${Y(1.96) - 4} stroke="var(--pen)" strokeWidth="2" />
        <text x=${X(-1.96)} y="138" textAnchor="middle" fontSize="15">−1.96</text><text x=${X(1.96)} y="138" textAnchor="middle" fontSize="15">1.96</text>
        <text x=${X(-3)} y="94" textAnchor="middle" fontSize="15">α/2</text><text x=${X(3)} y="94" textAnchor="middle" fontSize="15">α/2</text></g>`}
      ${z != null && html`<g><line x1=${X(zc)} y1="122" x2=${X(zc)} y2="22" stroke="var(--fig-k)" strokeWidth="3" /><text x=${X(zc)} y="16" textAnchor="middle" fontSize="15" fontWeight="700" style=${{ fill: 'var(--fig-k)' }}>${zLabel}</text></g>`}
      <text x=${X(0)} y="156" textAnchor="middle" fontSize="15">0</text></svg>`;
  }
  function ZRegion({ ar }) {
    const steps = [
      { en: 'Under H₀ the statistic Z₀ ~ N(0,1), the standard normal curve.', ar: 'تحت الـ H₀ الـ statistic بيمشي على الـ standard normal:' + L('Z₀ ~ N(0,1)'), z: null, sh: false },
      { en: 'Each tail beyond ±z<sub>α/2</sub> has area α/2 (reject). For α = 0.05, z<sub>0.025</sub> = 1.96. The middle, <b>−z<sub>α/2</sub> ≤ Z₀ ≤ z<sub>α/2</sub></b>, is the acceptance region for independence (fail to reject).', ar: 'كل ذيل بعد الـ critical value مساحته <bdi dir="ltr">α/2</bdi>، ولو الـ Z₀ وقع فيه بنرفض. ولما الـ α تبقى 0.05 الـ critical value بتبقى 1.96. والنص هو منطقة القبول للـ independence:' + L('−z<sub>α/2</sub> ≤ Z₀ ≤ z<sub>α/2</sub>, z<sub>0.025</sub> = 1.96'), z: null, sh: true },
      { en: 'Runs up and down (40 numbers): Z₀ = <b>−0.13</b>, inside the region: independence cannot be rejected.', ar: 'في مثال الـ runs up and down على 40 رقم الـ Z₀ جوه منطقة القبول، فمنقدرش نرفض الـ independence:' + L('Z₀ = −0.13'), z: -0.13, sh: true },
      { en: 'Runs above and below the mean (Example 4.8): Z₀ = <b>−1.07</b>, inside: not rejected. ‡ (lecture notes)', ar: 'في مثال الـ runs above and below the mean الـ Z₀ جوه برضه، فمش بنرفض ‡ (lecture notes):' + L('Z₀ = −1.07'), z: -1.07, sh: true },
      { en: 'Autocorrelation of the 3rd, 8th, 13th, … numbers: Z₀ = <b>−1.519</b> (the slide prints −1.516 ‡), still inside: not rejected.', ar: 'في مثال الـ autocorrelation الـ Z₀ لسه جوه المنطقة، فمش بنرفض. والـ slide كاتبة <bdi dir="ltr">−1.516</bdi> والقسمة الصح بتدي <bdi dir="ltr">−1.519</bdi> ‡:' + L('Z₀ = −1.519'), z: -1.519, sh: true }
    ];
    const [i, ctl] = useSteps(steps.length, 2400), s = steps[i];
    return html`<figure className="fig mf4"><div className="fig-stage"><${Normal} z=${s.z} zLabel=${s.z != null ? 'Z₀ = ' + s.z : ''} shade=${s.sh} />
      <p className="mf4-note">${s.sh ? html`reject | <b className="mf4-good">fail to reject</b> | reject` : html` `}</p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 53: uniform-looking but not random ── */
  const S53 = nums('0.08 0.09 0.23 0.29 0.42 0.55 0.58 0.72 0.89 0.91 0.11 0.16 0.18 0.31 0.41 0.53 0.71 0.73 0.74 0.84 0.02 0.09 0.30 0.32 0.45 0.47 0.69 0.74 0.91 0.95 0.12 0.13 0.29 0.36 0.38 0.54 0.68 0.86 0.88 0.91');
  function RunsWhy({ ar }) {
    const steps = [
      { en: 'Slide 53\'s 40 numbers, counted in 10 classes: about 4 in each, so the KS and chi-square tests would indicate <b>uniformity</b>.', ar: 'الـ 40 رقم بتوع الـ slide 53 لو عدّيناهم في 10 classes هنلاقي حوالي 4 في كل واحدة، فالـ KS والـ chi‑square هيقولوا إنهم <b>uniform</b>.' },
      { en: 'Now plot them <b>in order</b>: each row of ten increases steadily, four rising ramps. The numbers are <b>not random</b>, which only a test of independence such as the runs test can catch.', ar: 'بس لو رسمناهم <b>بالترتيب</b> هنلاقي كل صف من العشرة طالع على طول، يعني 4 طلعات ورا بعض. الأرقام <b>مش random</b>، وده مش هيبان غير بـ test للـ independence زي الـ runs test.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const O = Array(10).fill(0); S53.forEach(x => O[chiClass(x)]++);
    const X = k => 22 + k * 6.3, Y = v => 160 - v * 140;
    return html`<figure className="fig mf4"><div className="fig-stage">
      ${i === 0 ? html`<${Bars} O=${O} E=${4} upto=${10} labels=${['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1']} hi=${-1} />`
        : html`<svg className="mf4-svg" viewBox="0 0 280 196" style=${{ maxWidth: '420px' }} role="img" aria-label="The 40 numbers in order">
          <line x1="20" y1="160" x2="272" y2="160" stroke="var(--graphite)" /><line x1="20" y1="160" x2="20" y2="14" stroke="var(--graphite)" />
          <path d=${S53.map((v, k) => (k ? 'L' : 'M') + X(k) + ' ' + Y(v)).join(' ')} fill="none" stroke="var(--fig-k)" strokeWidth="2.4" />
          ${S53.map((v, k) => html`<circle key=${k} cx=${X(k)} cy=${Y(v)} r="3" fill="var(--pen)" />`)}
          <text x="16" y=${Y(1) + 5} textAnchor="end" fontSize="14">1</text><text x="16" y="165" textAnchor="end" fontSize="14">0</text>
          <text x=${X(0)} y="180" textAnchor="middle" fontSize="14">1</text><text x=${X(39)} y="180" textAnchor="middle" fontSize="14">40</text></svg>`}
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── runs up and down / above and below the mean ── */
  const R40 = nums('0.41 0.68 0.89 0.94 0.74 0.91 0.55 0.62 0.36 0.27 0.19 0.72 0.75 0.08 0.54 0.02 0.01 0.36 0.16 0.28 0.18 0.01 0.95 0.69 0.18 0.47 0.23 0.32 0.82 0.53 0.31 0.42 0.73 0.04 0.83 0.45 0.13 0.57 0.63 0.29');
  const ILL_UD = nums('0.87 0.15 0.23 0.45 0.69 0.32 0.30 0.19 0.24 0.18 0.65 0.82 0.93 0.22');
  const ILL_AB = nums('0.40 0.84 0.75 0.18 0.13 0.92 0.57 0.77 0.30 0.71 0.42 0.05 0.78 0.74 0.68 0.03 0.18 0.51 0.10 0.37');
  const signsUD = xs => xs.slice(1).map((x, k) => x > xs[k] ? '+' : x < xs[k] ? '−' : '=');
  const signsAB = (xs, mu) => xs.map(x => x > mu ? '+' : '−');
  const runLens = s => { const L2 = []; let c = 0; s.forEach((x, k) => { if (k && x === s[k - 1]) c++; else { if (k) L2.push(c); c = 1; } }); if (s.length) L2.push(c); return L2; };
  function RunsRun({ xs, kind, full, ar }) {
    const N = xs.length, s = kind === 'ud' ? signsUD(xs) : signsAB(xs, 0.495), lens = runLens(s), a = lens.length;
    const runIdx = []; lens.forEach((n, r) => { for (let q = 0; q < n; q++) runIdx.push(r); });
    const f2 = x => x.toFixed(2).replace('-', '−');
    let st = [];
    if (kind === 'ud') {
      const mu = (2 * N - 1) / 3, v = (16 * N - 29) / 90, z = (a - mu) / Math.sqrt(v), up = lens.filter((_, r) => s[runIdx.indexOf(r)] === '+').length;
      st = [
        { en: `${N} numbers. Write <b>+</b> if a number is followed by a larger one, <b>−</b> if followed by a smaller one.`, ar: 'عندنا ' + N + ' رقم. بنكتب <b>+</b> لو الرقم اللي بعده أكبر، و <b>−</b> لو اللي بعده أصغر.', sg: false },
        { en: `${N - 1} signs for ${N} numbers.`, ar: 'كده طلع عندنا إشارات عددها أقل من الأرقام بواحد:' + L(`${N - 1} signs`), sg: true },
        { en: `Count the runs (each colour block is one run): <b>a = ${a}</b> (${up} up runs and ${a - up} down runs). The maximum possible is N − 1 = ${N - 1}, the minimum is 1.`, ar: 'نعد الـ runs، وكل بلوك لون هو run واحدة. وأكبر عدد ممكن هو الـ N ناقص واحد، وأقل عدد هو واحد:' + L(`a = ${a} (${up} up, ${a - up} down)`), sg: true, ct: true }
      ];
      if (full) st.push(
        { en: `μ<sub>a</sub> = (2N − 1)/3 = (2(${N}) − 1)/3 = <b>${f2(mu)}</b>; σ<sub>a</sub>² = (16N − 29)/90 = (16(${N}) − 29)/90 = <b>${f2(v)}</b>.`, ar: 'نحسب الـ mean والـ variance:' + L(`μ<sub>a</sub> = (2(${N}) − 1)/3 = ${f2(mu)}<br>σ<sub>a</sub>² = (16(${N}) − 29)/90 = ${f2(v)}`), sg: true, ct: true, m: [`μa = ${f2(mu)}`, `σa² = ${f2(v)}`] },
        { en: `Z₀ = (a − μ<sub>a</sub>)/σ<sub>a</sub> = (${a} − ${f2(mu)})/√${f2(v)} = <b>${f2(z)}</b>. ` + (Math.abs(z) <= 1.96 ? `−1.96 ≤ ${f2(z)} ≤ 1.96, so <b>independence cannot be rejected</b>.` : `|Z₀| > 1.96, so <b>independence is rejected</b>.`) + (N <= 20 ? ' (The normal approximation is meant for N > 20.)' : ''), ar: (Math.abs(z) <= 1.96 ? 'الـ Z₀ جوه منطقة القبول، يعني <b>منقدرش نرفض الـ independence</b>' : 'الـ Z₀ برّه منطقة القبول، يعني <b>بنرفض الـ independence</b>') + (N <= 20 ? '، بس خد بالك إن الـ normal approximation معمولة للـ N الأكبر من 20' : '') + ':' + L(`Z₀ = (${a} − ${f2(mu)})/√${f2(v)} = ${f2(z)}`), sg: true, ct: true, m: [`μa = ${f2(mu)}`, `σa² = ${f2(v)}`, `Z₀ = ${f2(z)}`] });
    } else {
      const n1 = s.filter(x => x === '+').length, n2 = N - n1, mu = 2 * n1 * n2 / N + .5, v = 2 * n1 * n2 * (2 * n1 * n2 - N) / (N * N * (N - 1)), z = (a - mu) / Math.sqrt(v), hiR = lens.filter((_, r) => s[runIdx.indexOf(r)] === '+').length;
      st = [
        { en: `${N} numbers. Write <b>+</b> for a number above the mean 0.495 and <b>−</b> for one below it. ‡ (lecture notes)`, ar: 'عندنا ' + N + ' رقم. بنكتب <b>+</b> للرقم اللي فوق الـ mean و <b>−</b> للي تحته ‡ (lecture notes):' + L('mean = (0.99 + 0.00)/2 = 0.495'), sg: false },
        { en: `n₁ = <b>${n1}</b> above the mean, n₂ = <b>${n2}</b> below, N = ${N}.`, ar: 'نعد اللي فوق واللي تحت:' + L(`n₁ = ${n1}, n₂ = ${n2}, N = ${N}`), sg: true },
        { en: `Count the runs: <b>b = ${a}</b> (${hiR} above and ${a - hiR} below the mean).`, ar: 'نعد الـ runs، وكل بلوك لون هو run واحدة:' + L(`b = ${a} (${hiR} above, ${a - hiR} below)`), sg: true, ct: true }
      ];
      if (full) st.push(
        { en: `μ<sub>b</sub> = 2n₁n₂/N + 1/2 = 2(${n1})(${n2})/${N} + 1/2 = <b>${f2(mu)}</b>; σ<sub>b</sub>² = 2n₁n₂(2n₁n₂ − N)/[N²(N − 1)] = <b>${f2(v)}</b>.` + (n1 > 20 || n2 > 20 ? ` Since ${n2 > 20 ? 'n₂' : 'n₁'} > 20, the normal approximation is accepted.` : ' (Neither n₁ nor n₂ is above 20, so the normal approximation is not justified.)'), ar: 'نحسب الـ mean والـ variance' + (n1 > 20 || n2 > 20 ? '، وبما إن واحد منهم أكبر من 20 فالـ normal approximation مقبولة' : '، بس مفيش ولا واحد منهم أكبر من 20 فالـ normal approximation مش مضمونة') + ':' + L(`μ<sub>b</sub> = 2(${n1})(${n2})/${N} + 1/2 = ${f2(mu)}<br>σ<sub>b</sub>² = ${f2(v)}`), sg: true, ct: true, m: [`μb = ${f2(mu)}`, `σb² = ${f2(v)}`] },
        { en: `Z₀ = (b − μ<sub>b</sub>)/σ<sub>b</sub> = (${a} − ${f2(mu)})/√${f2(v)} = <b>${f2(z)}</b>. ` + (Math.abs(z) <= 1.96 ? `−1.96 ≤ ${f2(z)} ≤ 1.96, so <b>independence cannot be rejected</b>.` : `|Z₀| > 1.96, so <b>independence is rejected</b>.`), ar: (Math.abs(z) <= 1.96 ? 'الـ Z₀ جوه منطقة القبول، يعني <b>منقدرش نرفض الـ independence</b>:' : 'الـ Z₀ برّه منطقة القبول، يعني <b>بنرفض الـ independence</b>:') + L(`Z₀ = (${a} − ${f2(mu)})/√${f2(v)} = ${f2(z)}`), sg: true, ct: true, m: [`μb = ${f2(mu)}`, `σb² = ${f2(v)}`, `Z₀ = ${f2(z)}`] });
    }
    const [i, ctl] = useSteps(st.length, 2600), S = st[i], ani = !calm() && i === 1;
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-runs">${xs.map((x, k) => { const si = kind === 'ud' ? k - 1 : k, sg = si >= 0 ? s[si] : '';
        return html`<div key=${k}><span className="n">${x.toFixed(2)}</span><span className=${'s' + (S.sg && sg ? (S.ct ? ' r' + (runIdx[si] % 2) : '') + (ani ? ' ani' : '') : '')} style=${ani ? { animationDelay: k * 45 + 'ms' } : null}>${S.sg ? sg : ''}</span></div>`; })}</div>
      ${S.ct && html`<p className="mf4-big">${kind === 'ud' ? 'a' : 'b'} = <b>${a}</b> runs</p>`}
      ${S.m && html`<div className="mf4-stat">${S.m.map((t, k) => html`<div key=${k}>${t}</div>`)}</div>`}</div>
      <${Cap} ...${S} showAr=${ar} /><${Bar} steps=${st} i=${i} ctl=${ctl} /></div>`;
  }
  function runsFig(kind) {
    return function Runs({ ar }) {
      const ill = kind === 'ud' ? ILL_UD : ILL_AB, [mode, setMode] = useState('n'), [t, setT] = useState(R40.map(x => x.toFixed(2)).join(' '));
      const own = nums(t).filter(x => x >= 0 && x <= 1), xs = mode === 'n' ? R40 : mode === 'i' ? ill : own;
      return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
        <${Modes} list=${[['n', kind === 'ud' ? 'Slide 57: 40 numbers' : 'Example 4.8: 40 numbers'], ['i', `Illustration: ${ill.length} numbers`], ['o', 'Try your own']]} mode=${mode} set=${setMode} />
        ${mode === 'o' && html`<textarea className="mf4-ta" aria-label="Your numbers" value=${t} onChange=${e => setT(e.target.value)}></textarea>`}
        ${mode === 'o' && own.length < 3 ? html`<p className="mf4-msg">Type at least 3 numbers between 0 and 1.</p>` : null}</div>
        ${xs.length >= 3 && html`<${RunsRun} key=${mode + (mode === 'o' ? t : '')} xs=${xs} kind=${kind} full=${mode !== 'i'} ar=${ar} />`}</figure>`;
    };
  }
  const RunsUD = runsFig('ud'), RunsAB = runsFig('ab');

  /* ── length of runs: Examples 4.9 and 4.10 ── */
  const S60 = nums('0.30 0.48 0.36 0.01 0.54 0.34 0.96 0.06 0.61 0.85 0.48 0.86 0.14 0.86 0.89 0.37 0.49 0.60 0.04 0.83 0.42 0.83 0.37 0.21 0.90 0.89 0.91 0.79 0.57 0.99 0.95 0.27 0.41 0.81 0.96 0.31 0.09 0.06 0.23 0.77 0.73 0.47 0.13 0.55 0.11 0.75 0.36 0.25 0.23 0.72 0.60 0.84 0.70 0.30 0.26 0.38 0.05 0.19 0.73 0.44');
  const rd = (x, d) => +x.toFixed(d);
  function RunLenRun({ kind, ar }) {
    const N = 60, s = kind === 'ud' ? signsUD(S60) : signsAB(S60, 0.495), lens = runLens(s), O = [1, 2, 3].map(q => lens.filter(x => x === q).length).concat([lens.filter(x => x >= 4).length]);
    let E, Eall, Ex, eqs, comb, df, crit, eLine, eAr;
    if (kind === 'ud') {
      const fact = n => n <= 1 ? 1 : n * fact(n - 1);
      Ex = [1, 2, 3].map(q => 2 / fact(q + 3) * (N * (q * q + 3 * q + 1) - (q ** 3 + 3 * q * q - q - 4))); Ex.push((2 * N - 1) / 3 - Ex[0] - Ex[1] - Ex[2]); E = Ex.slice(0, 3).map(x => rd(x, 2)); Eall = rd((2 * N - 1) / 3, 2);
      eqs = [`E(Y₁) = 2/4! [60(5) − (−1)] = ${E[0]}`, `E(Y₂) = 2/5! [60(11) − 14] = ${E[1]}`, `E(Y₃) = 2/6! [60(19) − 47] = ${E[2]}`, `μa = (2(60) − 1)/3 = ${Eall}`];
      comb = 1; df = 1; crit = 3.84;
    } else {
      const n1 = s.filter(x => x === '+').length, n2 = N - n1, w = [1, 2, 3].map(q => rd((n1 / N) ** q * (n2 / N) + (n1 / N) * (n2 / N) ** q, 3)), EI = rd(n1 / n2 + n2 / n1, 2);
      E = w.map(x => rd(N * x / EI, 2)); Eall = rd(N / EI, 2); { const wx = [1, 2, 3].map(q => (n1 / N) ** q * (n2 / N) + (n1 / N) * (n2 / N) ** q), ei = n1 / n2 + n2 / n1; Ex = wx.map(x => N * x / ei); Ex.push(N / ei - Ex[0] - Ex[1] - Ex[2]); }
      eqs = [`n₁ = ${n1}, n₂ = ${n2}; w₁ = ${w[0]}, w₂ = ${w[1]}, w₃ = ${w[2]}`, `E(I) = ${n1}/${n2} + ${n2}/${n1} = ${EI}`, `E(Y₁) = 60(${w[0]})/${EI} = ${E[0].toFixed(2)}, E(Y₂) = ${E[1].toFixed(2)}, E(Y₃) = ${E[2].toFixed(2)}`, `E(A) = 60/${EI} = ${Eall.toFixed(2)}`];
      comb = 2; df = 2; crit = 5.99;
    }
    const E4 = rd(Eall - E[0] - E[1] - E[2], 2), Ef = E.concat([E4]);
    const cO = O.slice(0, comb).concat([O.slice(comb).reduce((a, b) => a + b, 0)]), cE = Ef.slice(0, comb).concat([rd(Ef.slice(comb).reduce((a, b) => a + b, 0), 2)]);
    const terms = cO.map((o, k) => rd((o - cE[k]) ** 2 / cE[k], 2)), chi = rd(terms.reduce((a, b) => a + b, 0), 2), cEx = Ex.slice(0, comb).concat([Ex.slice(comb).reduce((a, b) => a + b, 0)]), chiU = cO.reduce((a, o, k) => a + (o - cEx[k]) ** 2 / cEx[k], 0);
    const lab = kind === 'ud' ? ['1', '2', '3', '≥ 4'] : ['1', '2', '3', '≥ 4'], cLab = kind === 'ud' ? ['1', '2, 3, ≥ 4'] : ['1', '2', '3, ≥ 4'];
    const nm = kind === 'ud' ? 'Example 4.9 (runs up and down)' : 'Example 4.10 (runs above and below the mean 0.495)';
    const steps = [
      { en: `${nm}: the 60 numbers give ${s.length} signs and <b>${lens.length} runs</b>. Tally the run lengths: O₁ = ${O[0]}, O₂ = ${O[1]}, O₃ = ${O[2]}, O<sub>≥4</sub> = ${O[3]}. ‡ (lecture notes)`, ar: 'الـ 60 رقم بيطلّعوا الإشارات دي والـ runs اللي تحت، وبنعد كل طول اتكرر كام مرة ‡ (lecture notes):' + L(`${s.length} signs, ${lens.length} runs; O₁ = ${O[0]}, O₂ = ${O[1]}, O₃ = ${O[2]}, O≥4 = ${O[3]}`), p: 0 },
      { en: 'Expected counts E(Y<sub>i</sub>) from the formulas; the class "≥ 4" takes what is left of the expected total number of runs.', ar: 'نحسب الـ expected counts من القوانين، والـ class بتاعة "4 أو أكتر" بتاخد الباقي من العدد المتوقع الكلي للـ runs:' + L(eqs.join('<br>') + `<br>E(Y≥4) = ${Eall.toFixed(2)} − ${rd(E[0] + E[1] + E[2], 2).toFixed(2)} = ${E4.toFixed(2)}`), p: 1 },
      { en: `Expected values below 5 are too small, so combine lengths ${cLab[cLab.length - 1]}: O = ${cO[cO.length - 1]}, E = ${cE[cE.length - 1].toFixed(2)}. That leaves L = ${cO.length} classes, df = L − 1 = ${df}.`, ar: 'القيم المتوقعة الصغيرة بندمجها مع بعض، فبيفضل عندنا classes أقل ودرجات حرية أقل:' + L(`O = ${cO[cO.length - 1]}, E = ${cE[cE.length - 1].toFixed(2)}; L = ${cO.length}, df = ${df}`), p: 2 },
      { en: `χ₀² = ${terms.map(x => x.toFixed(2)).join(' + ')} = <b>${chi.toFixed(2)}</b> (${chiU.toFixed(3)} unrounded) < χ²<sub>0.05,${df}</sub> = ${crit}, so <b>independence is not rejected</b>.` + (kind === 'ud' ? ' (The notes\' Table 4.3 lists E(Y₃) as 3.82; the formula gives 3.04 ‡.)' : ''), ar: 'الـ χ₀² أصغر من الـ critical value، يعني <b>مش بنرفض الـ independence</b>:' + L(`χ₀² = ${terms.map(x => x.toFixed(2)).join(' + ')} = ${chi.toFixed(2)} < χ²<sub>0.05,${df}</sub> = ${crit}`) + (kind === 'ud' ? 'وجدول 4.3 في الـ notes كاتب 3.82 للـ <bdi dir="ltr">E(Y₃)</bdi>، والقانون بيدي 3.04 ‡.' : ''), p: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 3200), P = steps[i].p;
    const rows = P < 2 ? lab.map((l, k) => [l, O[k], P >= 1 ? Ef[k].toFixed(2) : '']) : cLab.map((l, k) => [l, cO[k], cE[k].toFixed(2)].concat(P >= 3 ? [terms[k].toFixed(2)] : []));
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="mf4-chips" aria-label="Run lengths">${lens.map((x, k) => html`<span key=${k} className=${'mf4-chip' + (x >= 4 ? ' on' : x >= 2 ? ' hi' : '')} style=${{ minWidth: '1.8em' }}>${x}</span>`)}</div>
      <div style=${{ marginTop: '10px' }}><${Tbl} head=${['Run length', 'O<sub>i</sub>', 'E(Y<sub>i</sub>)'].concat(P >= 3 ? ['(O − E)²/E'] : [])} rows=${P >= 3 ? rows.concat([['', '', 'χ₀² =', chi.toFixed(2)]]) : rows} cls=${k => P >= 3 && k === rows.length ? 'sum' : ''} /></div>
      ${P === 3 && html`<p className="mf4-big">${chi.toFixed(2)} ${'<'} ${crit} → <span className="mf4-good">not rejected</span></p>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function RunLen({ ar }) {
    const [k, setK] = useState('ud');
    return html`<figure className="fig mf4"><div className="fig-stage" style=${{ paddingBottom: 4 }}><${Modes} list=${[['ud', 'Example 4.9: up and down'], ['ab', 'Example 4.10: above/below']]} mode=${k} set=${setK} /></div>
      <${RunLenRun} key=${k} kind=${k} ar=${ar} /></figure>`;
  }

  /* ── slides 60-63: the poker test ── */
  const pokerClass = n => { const d = String(n).padStart(3, '0').split(''); const u = new Set(d).size; return u === 3 ? 0 : u === 1 ? 1 : 2; };
  function Poker({ ar }) {
    const six = ['255', '577', '331', '414', '828', '909'], O = [680, 31, 289], E = [720, 10, 270], terms = O.map((o, k) => (o - E[k]) ** 2 / E[k]), tot = terms.reduce((a, b) => a + b, 0);
    const names = ['Three different digits', 'Three like digits', 'Exactly one pair'];
    const steps = [
      { en: 'Slide 60: 0.255 0.577 0.331 0.414 0.828 0.909. <b>A pair of like digits appears in every number</b>, which is suspicious.', ar: 'في الـ slide 60 <b>كل رقم فيه زوج digits متشابهين</b>، وده شيء يخلّينا نشك:' + L('0.255 0.577 0.331 0.414 0.828 0.909'), p: 0 },
      { en: 'Three different digits: the 2nd differs from the 1st (0.9), the 3rd differs from both (0.8): P = (0.9)(0.8) = <b>0.72</b>.', ar: 'تلات digits مختلفين: التاني مختلف عن الأول، والتالت مختلف عن الاتنين:' + L('P = (0.9)(0.8) = 0.72'), p: 1 },
      { en: 'Three like digits: the 2nd and the 3rd both equal the 1st: P = (0.1)(0.1) = <b>0.01</b>.', ar: 'تلات digits زي بعض: التاني والتالت نفس الأول:' + L('P = (0.1)(0.1) = 0.01'), p: 2 },
      { en: 'Exactly one pair: everything else: P = 1 − 0.72 − 0.01 = <b>0.27</b>.', ar: 'زوج واحد بالظبط: هو الباقي:' + L('P = 1 − 0.72 − 0.01 = 0.27'), p: 3 },
      { en: '1000 three-digit numbers, α = 0.05: expected counts are 1000 × 0.72 = 720, 1000 × 0.01 = 10 and 1000 × 0.27 = 270; observed 680, 31 and 289.', ar: 'عندنا 1000 رقم من 3 digits والـ α هي 0.05، والمتوقع والمشاهد كده:' + L('E = 720, 10, 270<br>O = 680, 31, 289'), p: 4 },
      { en: `χ₀² = ${terms.map(x => x.toFixed(2)).join(' + ')} = <b>${tot.toFixed(2)}</b> (the slide prints 2.24, 1.33 and 47.65 ‡). df = 3 − 1 = 2 and χ²<sub>0.05,2</sub> = 5.99 < ${tot.toFixed(2)}, so <b>independence is rejected</b>.`, ar: 'الـ χ₀² أكبر بكتير من الـ critical value، يعني <b>بنرفض الـ independence</b>. والـ slide كاتبة 2.24 و 1.33 و 47.65، والقسمة الصح زي ما تحت ‡:' + L(`χ₀² = ${terms.map(x => x.toFixed(2)).join(' + ')} = ${tot.toFixed(2)} > χ²<sub>0.05,2</sub> = 5.99`), p: 5 }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), P = steps[i].p, [mine, setMine] = useState('');
    const mv = /^\d{3}$/.test(mine) ? pokerClass(mine) : null;
    const pair = d => { const c = {}; d.split('').forEach(x => c[x] = (c[x] || 0) + 1); return d.split('').map((x, k) => html`<b key=${k} style=${c[x] > 1 ? { color: 'var(--pen)' } : null}>${x}</b>`); };
    return html`<figure className="fig mf4"><div className="fig-stage">
      ${P === 0 && html`<div className="mf4-chips">${six.map(x => html`<span key=${x} className="mf4-chip" style=${{ fontSize: '1rem' }}>0.${pair(x)}</span>`)}</div>`}
      ${P >= 1 && P <= 3 && html`<div className="mf4-stat">
        <div className=${pop(P >= 1)}>3 different: (0.9)(0.8) = <b>0.72</b></div><div className=${pop(P >= 2)}>3 like: (0.1)(0.1) = <b>0.01</b></div><div className=${pop(P >= 3)}>one pair: 1 − 0.72 − 0.01 = <b>0.27</b></div></div>`}
      ${P >= 4 && html`<${Tbl} head=${['Combination', 'O<sub>i</sub>', 'E<sub>i</sub>'].concat(P >= 5 ? ['(O−E)²/E'] : [])} rows=${names.map((n, k) => [`<span style="white-space:normal">${n}</span>`, O[k], E[k]].concat(P >= 5 ? [terms[k].toFixed(2)] : [])).concat(P >= 5 ? [['Total', 1000, 1000, tot.toFixed(2)]] : [])} cls=${k => k === 3 ? 'sum' : ''} />`}
      ${P === 5 && html`<p className="mf4-big">${tot.toFixed(2)} > 5.99 → <span className="mf4-bad">rejected</span></p>`}
      <div className="mf4-form" style=${{ marginTop: '10px', marginBottom: 0 }}><label>Classify 0.<input className="mf4-in" inputMode="numeric" maxLength="3" value=${mine} placeholder="255" aria-label="Three digits" onChange=${e => setMine(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
        <span>${mv == null ? '' : names[mv]}</span></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 65: a bitmap of random pixels ── */
  function Bitmap({ ar }) {
    const ref = useRef(null), [n, setN] = useState(0);
    useEffect(() => { const cv = ref.current; if (!cv) return; const ctx = cv.getContext('2d'), img = ctx.createImageData(100, 100), b = new Uint8Array(10000);
      (window.crypto || {}).getRandomValues ? crypto.getRandomValues(b) : b.forEach((_, k) => b[k] = Math.random() * 256);
      for (let k = 0; k < 10000; k++) { const v = b[k] & 1 ? 255 : 0; img.data.set([v, v, v, 255], k * 4); } ctx.putImageData(img, 0, 0); }, [n]);
    return html`<figure className="fig mf4"><div className="fig-stage"><canvas ref=${ref} width="100" height="100" className="mf4-pix" role="img" aria-label="Random black and white pixels"></canvas></div>
      <${Cap} en="Like slide 65's bitmap from random.org/analysis: every pixel is black or white at random, and <b>no pattern is visible</b>. (random.org gets its randomness from atmospheric noise; this one uses your browser's crypto random source.)" ar="زي الـ bitmap اللي في الـ slide 65 من <bdi dir="ltr">random.org/analysis</bdi>: كل pixel أسود أو أبيض بشكل random، و<b>مفيش أي pattern باين</b>. والـ random.org بياخد الـ randomness من الـ atmospheric noise، أما هنا فالـ pixels جاية من الـ crypto random source بتاع الـ browser." showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setN(x => x + 1)}>New bitmap</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ms-rn-uniform': Uniform, 'ms-midsquare': Midsquare, 'ms-lcg': Lcg, 'ms-lcg-seeds': Seeds64, 'ms-lcg-sheet': Seeds32,
    'ms-lcg-lattice': Lattice, 'ms-lcg-rules': Rules, 'ms-clcg': Clcg, 'ms-rn-tests': TestsMap, 'ms-ks-cdf': KsCdf, 'ms-ks': Ks,
    'ms-chisq-slide': ChiSlide, 'ms-chisq-data': ChiData, 'ms-gap-digits': GapDigits, 'ms-gap-ks': GapKs, 'ms-autocorr': Autocorr, 'ms-z-region': ZRegion,
    'ms-runs-why': RunsWhy, 'ms-runs-ud': RunsUD, 'ms-runs-ab': RunsAB, 'ms-runs-len': RunLen, 'ms-poker': Poker, 'ms-rn-bitmap': Bitmap
  });
})();
/* ── part 5 ── */
// Modeling & Simulation visuals, part 5: L5 Random-Variate Generation (inverse transform, discrete lookups, geometric, acceptance-rejection, Poisson). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf5 .fig-btn[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mf5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf5-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; font-size:.85rem; color:var(--ink); }
.mf5-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.mf5-ctl{ display:grid; grid-template-columns:auto minmax(0,1fr) auto; gap:4px 8px; align-items:center; max-width:420px; margin:8px auto 0; font-size:.85rem; color:var(--ink); }
.mf5-ctl b{ font-family:var(--mono); font-size:.85rem; min-width:3.6em; text-align:right; }
.mf5-range{ width:100%; min-width:0; accent-color:var(--fig-k); }
.mf5-svg{ max-width:420px !important; }
.mf5-svg text{ font-size:14px; }
.mf5-ib{ position:relative; height:36px; margin:28px 4px 24px; border:1px solid var(--graphite); border-radius:6px; background:var(--paper); }
.mf5-ib .sg{ position:absolute; top:0; bottom:0; border-right:1px solid var(--graphite); display:grid; place-items:center; font-size:.8rem; color:var(--ink); overflow:hidden; white-space:nowrap; transition:background .35s; }
.mf5-ib .sg.end{ border-right:0; }
.mf5-ib .sg.on{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); font-weight:700; }
.mf5-ib .sg.rej{ background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.mf5-ib .mk{ position:absolute; top:-7px; bottom:-7px; width:2px; margin-left:-1px; background:var(--pen); transition:left .35s; }
.mf5-ib .mkl{ position:absolute; top:-25px; transform:translateX(-50%); font-size:.8rem; color:var(--pen); white-space:nowrap; font-weight:700; transition:left .35s; }
.mf5-ib .tk{ position:absolute; top:100%; margin-top:4px; font-size:.8rem; color:var(--graphite); white-space:nowrap; }
.mf5-ib .dot{ position:absolute; width:7px; height:7px; margin:-3.5px 0 0 -3.5px; border-radius:50%; }
.mf5-ib .dot.y{ background:var(--ok); } .mf5-ib .dot.n{ background:var(--pen); }
.mf5-calc{ max-width:420px; margin:6px auto 0; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:7px 10px; font-size:.86rem; line-height:1.5; color:var(--ink); }
.mf5-calc div{ overflow-wrap:anywhere; }
.mf5-calc .ok{ color:var(--ok); font-weight:700; } .mf5-calc .no{ color:var(--pen); font-weight:700; }
.mf5-tbw{ max-width:420px; margin:8px auto 0; }
.mf5-tb{ border-collapse:collapse; margin:0 auto; font-size:.84rem; width:100%; }
.mf5-tb td, .mf5-tb th{ border:1px solid var(--line); padding:3px 5px; text-align:center; background:var(--paper); color:var(--ink); white-space:nowrap; }
.mf5-tb th{ white-space:normal; background:var(--paper-2); color:var(--graphite); font-size:.8rem; font-weight:600; }
.mf5-tb tr.on td{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); font-weight:700; }
.mf5-tb td.ok{ color:var(--ok); font-weight:700; } .mf5-tb td.no{ color:var(--pen); font-weight:700; }
.mf5-tb tr.new td{ animation:mf5in .45s ease; }
@keyframes mf5in{ from{ opacity:0; } to{ opacity:1; } }
.mf5-flow{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:440px; margin:0 auto 10px; }
.mf5-flow div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:5px 6px; font-size:.8rem; line-height:1.3; text-align:center; opacity:.5; transition:opacity .35s, box-shadow .35s; }
.mf5-flow div b{ display:block; font-size:.8rem; color:var(--fig-k); }
.mf5-flow div.on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); }
.mf5-flow div.y{ box-shadow:0 0 0 2px var(--ok); opacity:1; } .mf5-flow div.n{ box-shadow:0 0 0 2px var(--pen); opacity:1; }
@media (max-width:420px){ .mf5-flow{ grid-template-columns:minmax(0,1fr); } }
.mf5-stat{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:8px 0 0; font-size:.84rem; color:var(--ink); }
.mf5-stat span{ border:1px solid var(--line); border-radius:99px; padding:2px 9px; background:var(--paper); }
.mf5-stat b{ font-family:var(--mono); }
.mf5-hist{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:10px auto 0; align-items:end; }
.mf5-hist div{ text-align:center; font-size:.8rem; color:var(--graphite); }
.mf5-hist i{ display:block; margin:0 auto 3px; width:70%; background:var(--fig-k); border-radius:4px 4px 0 0; transition:height .35s; min-height:2px; }
.mf5-hist b{ display:block; color:var(--ink); font-size:.82rem; }
.mf5-meter{ position:relative; height:26px; max-width:420px; margin:26px auto 22px; border:1px solid var(--graphite); border-radius:6px; background:var(--paper); }
.mf5-meter i{ position:absolute; left:0; top:0; bottom:0; border-radius:5px 0 0 5px; background:color-mix(in srgb, var(--fig-k) 45%, var(--paper)); transition:width .45s; }
.mf5-meter .th{ position:absolute; top:-6px; bottom:-6px; width:2px; margin-left:-1px; background:var(--pen); }
.mf5-meter .thl{ position:absolute; top:-24px; transform:translateX(-50%); font-size:.8rem; color:var(--pen); font-weight:700; white-space:nowrap; }
.mf5-meter .pl{ position:absolute; top:100%; margin-top:4px; transform:translateX(-50%); font-size:.8rem; color:var(--ink); font-weight:700; white-space:nowrap; transition:left .45s; }
.mf5-in{ font:inherit; font-family:var(--mono); font-size:.85rem; width:4.6em; padding:3px 6px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); }
.mf5-note{ text-align:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; }
@media (prefers-reduced-motion: reduce){ .mf5-ib .sg, .mf5-ib .mk, .mf5-ib .mkl, .mf5-flow div, .mf5-hist i, .mf5-meter i, .mf5-meter .pl{ transition:none; } .mf5-tb tr.new td{ animation:none; } }`;
  if (!document.getElementById('mf5-css')) { const s = document.createElement('style'); s.id = 'mf5-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = t => `<span class="ltr">${t}</span>`;
  const f2 = v => v.toFixed(2), f3 = v => v.toFixed(3), f4 = v => v.toFixed(4);
  const W = 280;
  // plot frame: x in [xa, xb], y in [0, ymax]
  function frame(H, xa, xb, ymax = 1, pad = { l: 36, r: 12, t: 14, b: 28 }) {
    const X = v => pad.l + (v - xa) / (xb - xa) * (W - pad.l - pad.r), Y = v => H - pad.b - v / ymax * (H - pad.t - pad.b);
    return { X, Y, x0: pad.l, x1: W - pad.r, y0: H - pad.b, y1: pad.t, H };
  }
  const curve = (fn, a, b, f, n = 60) => Array.from({ length: n + 1 }, (_, k) => { const x = a + (b - a) * k / n; return (k ? 'L' : 'M') + f.X(x).toFixed(1) + ',' + f.Y(fn(x)).toFixed(1); }).join(' ');
  const Axes = ({ f, xt, yt, xl, yl }) => html`<g>
    <line x1=${f.x0} y1=${f.y0} x2=${f.x1 + 4} y2=${f.y0} stroke="var(--graphite)" strokeWidth="1.3" />
    <line x1=${f.x0} y1=${f.y0} x2=${f.x0} y2=${f.y1 - 6} stroke="var(--graphite)" strokeWidth="1.3" />
    ${xt.map(([v, t], k) => html`<g key=${'x' + k}><line x1=${f.X(v)} y1=${f.y0} x2=${f.X(v)} y2=${f.y0 + 4} stroke="var(--graphite)" /><text x=${f.X(v)} y=${f.y0 + 18} textAnchor="middle" fill="var(--graphite)">${t}</text></g>`)}
    ${yt.map(([v, t], k) => html`<g key=${'y' + k}><line x1=${f.x0 - 4} y1=${f.Y(v)} x2=${f.x0} y2=${f.Y(v)} stroke="var(--graphite)" /><text x=${f.x0 - 6} y=${f.Y(v) + 5} textAnchor="end" fill="var(--graphite)">${t}</text></g>`)}
    ${yl && html`<text x=${f.x0 + 6} y=${f.y1 - 2} fontWeight="700">${yl}</text>`}
    ${xl && html`<text x=${f.x1 + 4} y=${f.y0 - 6} textAnchor="end" fontWeight="700">${xl}</text>`}
  </g>`;
  // R → X reading on a cdf: across from the vertical axis, then down to the horizontal axis
  const Read = ({ f, r, x, across, down, color, lab, dy = 0, dash }) => html`<g>
    ${across && html`<line x1=${f.x0} y1=${f.Y(r)} x2=${f.X(x)} y2=${f.Y(r)} stroke=${color} strokeWidth="2" strokeDasharray=${dash || '5 4'} />`}
    ${across && html`<circle cx=${f.x0} cy=${f.Y(r)} r="4" fill=${color} />`}
    ${down && html`<line x1=${f.X(x)} y1=${f.Y(r)} x2=${f.X(x)} y2=${f.y0} stroke=${color} strokeWidth="2" strokeDasharray=${dash || '5 4'} />`}
    ${down && html`<circle cx=${f.X(x)} cy=${f.y0} r="4.5" fill=${color} />`}
    ${down && lab && html`<text x=${f.X(x) > W - 100 ? f.X(x) - 6 : f.X(x) + 6} y=${f.y0 - 8 - dy} textAnchor=${f.X(x) > W - 100 ? 'end' : 'start'} fill=${color} fontWeight="700">${lab}</text>`}
  </g>`;
  const Modes = ({ list, mode, set }) => html`<div className="mf5-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Slide = ({ label, v, min, max, step, set, show }) => html`<label style=${{ display: 'contents' }}><span>${label}</span><input className="mf5-range" type="range" min=${min} max=${max} step=${step || 1} value=${v} onInput=${e => set(+e.target.value)} onChange=${e => set(+e.target.value)} /><b>${show}</b></label>`;
  // an interval bar on [0, 1]: cuts = [0, r1, …, 1], one label per segment, an optional R marker
  const clampPct = v => Math.max(14, Math.min(86, v * 100));
  const IBar = ({ cuts, labels, R, Rlab, on, cls, ticks, dots }) => html`<div className="mf5-ib" role="img" aria-label=${'Interval bar from 0 to 1' + (R != null ? ', R = ' + Rlab : '')}>
    ${labels.map((t, k) => { const w = (cuts[k + 1] - cuts[k]) * 100; return html`<div key=${k} className=${'sg' + (k === labels.length - 1 ? ' end' : '') + (on === k ? ' on' : '') + (cls && cls[k] ? ' ' + cls[k] : '')} style=${{ left: cuts[k] * 100 + '%', width: w + '%' }}>${w >= (String(t).length > 3 ? 13 : 6) ? t : ''}</div>`; })}
    ${(dots || []).map((d, k) => html`<span key=${'d' + k} className=${'dot ' + (d[1] ? 'y' : 'n')} style=${{ left: d[0] * 100 + '%', top: (20 + (k * 37) % 60) + '%' }}></span>`)}
    ${(ticks || [[0, '0'], [1, '1']]).map(([v, t], k) => html`<span key=${'t' + k} className="tk" style=${{ left: v * 100 + '%', transform: v <= 0 ? 'none' : v >= 1 ? 'translateX(-100%)' : 'translateX(-50%)' }}>${t}</span>`)}
    ${R != null && html`<span className="mk" style=${{ left: R * 100 + '%' }}></span><span className="mkl" style=${{ left: clampPct(R) + '%' }}>${Rlab}</span>`}
  </div>`;

  /* ── 3.0-3.5: inverse transform for the exponential, R on the vertical axis → X on the horizontal axis ── */
  function ExpInv({ ar }) {
    const [lam, setLam] = useState(1), [Rh, setRh] = useState(62), [hist, setHist] = useState([]);
    const [i, ctl] = useSteps(5, 3400);
    const R = Rh / 100, x1 = -Math.log(1 - R) / lam, x2 = -Math.log(R) / lam;
    const xb = 5 / lam, f = frame(200, 0, xb);
    const ticks = [0, 1, 2, 3, 4, 5].map(k => [k / lam, String(+(k / lam).toFixed(2))]);
    const newR = () => { const r = Math.round(Math.random() * 98) + 1, rr = r / 100; setRh(r); setHist(h => [{ R: rr, a: -Math.log(1 - rr) / lam, b: -Math.log(rr) / lam }, ...h].slice(0, 5)); if (i < 3) ctl.go(3); };
    const S = [
      { en: `<b>Step 1</b>: the cdf of the exponential is F(x) = 1 − e^(−λx), x ≥ 0 (here λ = ${lam}, so the mean is 1/λ = ${+(1 / lam).toFixed(2)}).`,
        ar: 'الخطوة الأولى: نحسب الـ <b>cdf</b> بتاع الـ exponential' + L('F(x) = 1 − e^(−λx),  x ≥ 0') + 'وهنا' + L(`λ = ${lam},  mean = 1/λ = ${+(1 / lam).toFixed(2)}`) },
      { en: `<b>Step 2</b>: set F(X) = R. The random number R = ${f2(R)} is placed on the vertical axis (R is uniform on (0, 1)).`,
        ar: 'الخطوة التانية: نخلي الـ <bdi dir="ltr">F(X)</bdi> تساوي الـ R. بنحط الـ random number على المحور الرأسي (الـ R دي uniform على الفترة من 0 لـ 1)' + L(`F(X) = R = ${f2(R)}`) },
      { en: `<b>Step 3</b>: solve for X: go across to the curve and drop to the x axis. X = −(1/λ) ln(1 − R) = −(1/${lam}) ln(${f2(1 - R)}) = <b>${f3(x1)}</b> (5.1). This is X = F⁻¹(R), not 1/f.`,
        ar: 'الخطوة التالتة: نحل المعادلة ونطلع الـ X. نمشي أفقي لحد المنحنى وننزل على محور الـ x' + L(`X = −(1/λ) ln(1 − R) = −(1/${lam}) ln(${f2(1 - R)}) = ${f3(x1)}`) + 'ودي معادلة (5.1)، يعني الـ X هي الـ <bdi dir="ltr">F⁻¹(R)</bdi> مش <bdi dir="ltr">1/f</bdi>.' },
      { en: `<b>Step 4</b>: every new random number Ri gives a new Xi = F⁻¹(Ri). Press <b>New R</b> to generate R1, R2, R3, … and their variates.`,
        ar: 'الخطوة الرابعة: كل random number جديد بيدّي variate جديد. دوس <b>New R</b> عشان تولّد أرقام جديدة وتشوف الـ X بتاعة كل واحد' + L('Xi = F⁻¹(Ri),  i = 1, 2, …') },
      { en: `<b>(5.2)</b>: 1 − Ri can be replaced by Ri, because both are uniform on (0, 1). X = −(1/λ) ln R = <b>${f3(x2)}</b> (grey line, reading the level 1 − R). A different value for the same R, but the stream has the same exponential distribution.`,
        ar: 'في معادلة (5.2) بنحط الـ Ri مكان الكمية دي، لأن الاتنين uniform على الفترة من 0 لـ 1' + L('1 − Ri  →  Ri') + L(`X = −(1/λ) ln R = ${f3(x2)}`) + 'الخط الرمادي بيقرا الـ cdf عند المستوى المكمّل للـ R. القيمة مختلفة لنفس الـ R، بس الأرقام كلها ليها نفس الـ exponential distribution.' }
    ];
    return html`<figure className="fig mf5"><div className="fig-stage">
      <svg className="mf5-svg" viewBox=${'0 0 ' + W + ' 200'} role="img" aria-label="Exponential cdf with a random number R read across to the curve and down to X">
        <${Axes} f=${f} xt=${ticks} yt=${[[0.5, '0.5'], [1, '1']]} xl="x" yl="F(x)" />
        <line x1=${f.x0} y1=${f.Y(1)} x2=${f.x1} y2=${f.Y(1)} stroke="var(--line)" strokeDasharray="3 4" />
        <path d=${curve(t => 1 - Math.exp(-lam * t), 0, xb, f)} fill="none" stroke="var(--fig-k)" strokeWidth="3" />
        <text x=${f.X(xb * 0.55)} y=${f.Y(1 - Math.exp(-lam * xb * 0.55)) + 22} fill="var(--fig-k)" fontWeight="700">1 − e^(−λx)</text>
        ${i >= 4 && html`<${Read} f=${f} r=${1 - R} x=${x2} across down color="var(--graphite)" lab=${'(5.2) ' + f3(x2)} dy=${20} dash="2 4" />`}
        <${Read} f=${f} r=${R} x=${x1} across=${i >= 1} down=${i >= 2} color="var(--pen)" lab=${'X = ' + f3(x1)} />
        ${i >= 1 && html`<text x=${f.x0 + 8} y=${f.Y(R) - 7} fill="var(--pen)" fontWeight="700">R = ${f2(R)}</text>`}
      </svg>
      <div className="mf5-ctl">
        <span>λ</span><div className="mf5-row" style=${{ margin: 0, justifyContent: 'flex-start' }}>${[0.5, 1, 2].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(lam === v)} onClick=${() => { setLam(v); setHist([]); }}>${v}</button>`)}</div><span></span>
        <${Slide} label="R" v=${Rh} min="1" max="99" set=${v => { setRh(v); if (i < 2) ctl.go(2); }} show=${f2(R)} />
      </div>
      <div className="mf5-row" style=${{ marginTop: '8px' }}><button className="fig-btn solid" onClick=${newR}>New R</button></div>
      ${i >= 3 && hist.length > 0 && html`<div className="mf5-tbw"><table className="mf5-tb"><thead><tr><th>Ri</th><th>Xi (5.1)</th><th>Xi (5.2)</th></tr></thead>
        <tbody>${hist.map((h, k) => html`<tr key=${hist.length - k + '-' + h.R} className=${k === 0 ? 'on new' : ''}><td>${f2(h.R)}</td><td>${f3(h.a)}</td><td>${f3(h.b)}</td></tr>`)}</tbody></table></div>`}
    </div><${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 4.0-4.4: uniform on [a, b], X = a + (b − a)R ── */
  function UnifInv({ ar }) {
    const [a, setA] = useState(1), [b, setB] = useState(5), [Rh, setRh] = useState(40);
    const [i, ctl] = useSteps(3, 3200);
    const ok = isFinite(a) && isFinite(b) && b > a, A = ok ? a : 1, B = ok ? b : 5;
    const R = Rh / 100, x = A + (B - A) * R, d = (B - A) * 0.3, f = frame(190, A - d, B + d);
    const S = [
      { en: `<b>Step 1</b>: the cdf is 0 for x < a, (x − a)/(b − a) for a ≤ x ≤ b, and 1 for x > b (here a = ${A}, b = ${B}).`,
        ar: 'الخطوة الأولى: الـ <b>cdf</b> بيساوي 0 قبل الـ a، وبعدين خط مستقيم لحد الـ b، وبعد كده 1' + L(`F(x) = (x − a)/(b − a),  a ≤ x ≤ b`) + 'وهنا' + L(`a = ${A},  b = ${B}`) },
      { en: `<b>Step 2</b>: set F(X) = (X − a)/(b − a) = R, with R = ${f2(R)} on the vertical axis.`,
        ar: 'الخطوة التانية: نخلي الـ <bdi dir="ltr">F(X)</bdi> تساوي الـ R، والـ R على المحور الرأسي' + L(`(X − a)/(b − a) = R = ${f2(R)}`) },
      { en: `<b>Step 3</b>: solve for X: X − a = R(b − a), so X = a + (b − a)R = ${A} + ${B - A} × ${f2(R)} = <b>${+x.toFixed(3)}</b> (5.3).`,
        ar: 'الخطوة التالتة: نحل ونطلع الـ X، ودي معادلة (5.3)' + L(`X = a + (b − a)R = ${A} + ${B - A} × ${f2(R)} = ${+x.toFixed(3)}`) }
    ];
    const num = (v, set, lab) => html`<label style=${{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>${lab}<input className="mf5-in" type="number" step="1" value=${v} onInput=${e => set(e.target.value === '' ? NaN : +e.target.value)} aria-label=${lab} /></label>`;
    return html`<figure className="fig mf5"><div className="fig-stage">
      <svg className="mf5-svg" viewBox=${'0 0 ' + W + ' 190'} role="img" aria-label="Uniform cdf on a to b with R read down to X">
        <${Axes} f=${f} xt=${[[A, 'a = ' + A], [B, 'b = ' + B]]} yt=${[[1, '1']]} xl="" yl="F(x)" />
        <path d=${`M${f.x0},${f.y0} L${f.X(A)},${f.y0} L${f.X(B)},${f.Y(1)} L${f.x1},${f.Y(1)}`} fill="none" stroke="var(--fig-k)" strokeWidth="3" />
        <${Read} f=${f} r=${R} x=${x} across=${i >= 1} down=${i >= 2} color="var(--pen)" lab=${'X = ' + +x.toFixed(2)} dy=${18} />
        ${i >= 1 && html`<text x=${f.x0 + 6} y=${f.Y(R) - 7} fill="var(--pen)" fontWeight="700">R = ${f2(R)}</text>`}
      </svg>
      <div className="mf5-row" style=${{ marginTop: '8px' }}>${num(a, setA, 'a')}${num(b, setB, 'b')}${!ok && html`<span style=${{ color: 'var(--pen)' }}>b must be greater than a</span>`}</div>
      <div className="mf5-ctl" style=${{ marginTop: 0 }}><${Slide} label="R" v=${Rh} min="0" max="100" set=${v => { setRh(v); if (i < 2) ctl.go(2); }} show=${f2(R)} /></div>
    </div><${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 5.0-5.1: Figure 5.1, density of the triangular distribution ── */
  function TriPdf({ ar }) {
    const S = [
      { en: 'The pdf rises as <b>f(x) = x</b> for 0 ≤ x ≤ 1.', ar: 'الـ <b>pdf</b> بيطلع على الخط ده من 0 لـ 1' + L('f(x) = x,  0 ≤ x ≤ 1') },
      { en: 'Then it falls as <b>f(x) = 2 − x</b> for 1 < x ≤ 2.', ar: 'وبعدين بينزل على الخط ده من 1 لـ 2' + L('f(x) = 2 − x,  1 < x ≤ 2') },
      { en: 'And <b>f(x) = 0 otherwise</b> (outside 0 to 2).', ar: 'وبيساوي <b>صفر</b> في أي مكان تاني برة الفترة من 0 لـ 2.' },
      { en: 'Figure 5.1: a triangle with <b>endpoints (0, 2)</b> and <b>mode at 1</b>, where the peak has height 1.', ar: 'ده شكل Fig 5.1، مثلث الـ <b>endpoints</b> بتاعته 0 و 2 والـ <b>mode</b> عند 1، وأعلى نقطة ارتفاعها 1.' }
    ];
    const [i, ctl] = useSteps(S.length, 2400);
    const f = frame(190, -0.4, 2.5, 1.2);
    return html`<figure className="fig mf5"><div className="fig-stage">
      <svg className="mf5-svg" viewBox=${'0 0 ' + W + ' 190'} role="img" aria-label="Figure 5.1: triangular density rising from 0 to a peak of 1 at x = 1 and falling to 0 at x = 2">
        <line x1=${f.X(-0.4)} y1=${f.y0} x2=${f.x1 + 4} y2=${f.y0} stroke="var(--graphite)" strokeWidth="1.3" />
        <line x1=${f.X(0)} y1=${f.y0} x2=${f.X(0)} y2=${f.y1 - 6} stroke="var(--graphite)" strokeWidth="1.3" />
        <text x=${f.X(0) + 6} y=${f.y1 - 2} fontWeight="700">f(x)</text><text x=${f.x1 + 4} y=${f.y0 - 6} textAnchor="end" fontWeight="700">x</text>
        ${[[0, '0'], [1, '1'], [2, '2']].map(([v, t]) => html`<text key=${v} x=${f.X(v)} y=${f.y0 + 18} textAnchor="middle" fill="var(--graphite)">${t}</text>`)}
        <line x1=${f.X(0) - 4} y1=${f.Y(1)} x2=${f.X(0)} y2=${f.Y(1)} stroke="var(--graphite)" /><text x=${f.X(0) - 7} y=${f.Y(1) + 5} textAnchor="end" fill="var(--graphite)">1</text>
        ${i >= 3 && html`<path d=${`M${f.X(0)},${f.y0} L${f.X(1)},${f.Y(1)} L${f.X(2)},${f.y0} Z`} fill="color-mix(in srgb, var(--fig-k) 16%, transparent)" />`}
        <line className=${pop(i >= 0)} x1=${f.X(0)} y1=${f.y0} x2=${f.X(1)} y2=${f.Y(1)} stroke="var(--fig-k)" strokeWidth="3" />
        <text className=${pop(i >= 0)} x=${f.X(0.12)} y=${f.Y(0.62)} fill="var(--fig-k)" fontWeight="700">x</text>
        <line className=${pop(i >= 1)} x1=${f.X(1)} y1=${f.Y(1)} x2=${f.X(2)} y2=${f.y0} stroke="var(--fig-k)" strokeWidth="3" />
        <text className=${pop(i >= 1)} x=${f.X(1.62)} y=${f.Y(0.62)} fill="var(--fig-k)" fontWeight="700">2 − x</text>
        <g className=${pop(i >= 2)}><line x1=${f.X(-0.4)} y1=${f.y0 - 1.5} x2=${f.X(0)} y2=${f.y0 - 1.5} stroke="var(--pen)" strokeWidth="3" /><line x1=${f.X(2)} y1=${f.y0 - 1.5} x2=${f.x1} y2=${f.y0 - 1.5} stroke="var(--pen)" strokeWidth="3" />
          <text x=${f.X(2.25)} y=${f.y0 - 10} textAnchor="middle" fill="var(--pen)" fontWeight="700">0</text></g>
        <g className=${pop(i >= 3)}><line x1=${f.X(1)} y1=${f.Y(1)} x2=${f.X(1)} y2=${f.y0} stroke="var(--graphite)" strokeDasharray="4 4" />
          <text x=${f.X(1)} y=${f.Y(1) - 8} textAnchor="middle" fontWeight="700">mode</text></g>
      </svg></div><${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 5.2-5.5: inverse transform for the triangular distribution, two pieces split at R = 1/2 ── */
  const triF = x => x <= 0 ? 0 : x <= 1 ? x * x / 2 : x <= 2 ? 1 - (2 - x) * (2 - x) / 2 : 1;
  function TriInv({ ar }) {
    const [Rh, setRh] = useState(30);
    const [i, ctl] = useSteps(4, 3400);
    useEffect(() => { if (i === 1 && Rh > 50) setRh(30); if (i === 2 && Rh <= 50) setRh(80); if (i === 3) setRh(50); }, [i]);
    const R = Rh / 100, low = R <= 0.5, x = low ? Math.sqrt(2 * R) : 2 - Math.sqrt(2 * (1 - R));
    const f = frame(200, -0.2, 2.4);
    const S = [
      { en: 'The cdf has two pieces: F(x) = x²/2 for 0 < x ≤ 1 and F(x) = 1 − (2 − x)²/2 for 1 < x ≤ 2. They meet at x = 1, where F = 1/2.',
        ar: 'الـ <b>cdf</b> ليه جزئين بيتقابلوا عند النقطة دي' + L('x = 1,   F(1) = 1/2') + L('F(x) = x²/2,  0 < x ≤ 1') + L('F(x) = 1 − (2 − x)²/2,  1 < x ≤ 2') },
      { en: `R = ${f2(R)} ≤ 1/2, so X is on the first piece: R = X²/2 (5.4), X = √(2R) = √(${f2(2 * R)}) = <b>${f3(x)}</b>.`,
        ar: 'الـ R هنا أقل من أو تساوي <bdi dir="ltr">1/2</bdi>، يبقى الـ X على الجزء الأول، معادلة (5.4)' + L(`R = ${f2(R)} ≤ 1/2   ⇒   X = √(2R) = √(${f2(2 * R)}) = ${f3(x)}`) },
      { en: `R = ${f2(R)} > 1/2, so X is on the second piece: R = 1 − (2 − X)²/2 (5.5), X = 2 − √(2(1 − R)) = 2 − √(${f2(2 * (1 - R))}) = <b>${f3(x)}</b>.`,
        ar: 'الـ R هنا أكبر من <bdi dir="ltr">1/2</bdi>، يبقى الـ X على الجزء التاني، معادلة (5.5)' + L(`R = ${f2(R)} > 1/2   ⇒   X = 2 − √(2(1 − R)) = 2 − √(${f2(2 * (1 - R))}) = ${f3(x)}`) },
      { en: `Check: R = 1/2 gives X = √1 = 1 from both pieces, the mode. Move R: ${low ? 'X = √(2R)' : 'X = 2 − √(2(1 − R))'} = <b>${f3(x)}</b>.`,
        ar: 'للتأكيد: الجزئين بيدّوا نفس القيمة عند الـ mode' + L('R = 1/2   ⇒   X = √1 = 1') + 'حرّك الـ R وشوف' + L(`R = ${f2(R)}   ⇒   X = ${f3(x)}`) }
    ];
    return html`<figure className="fig mf5"><div className="fig-stage">
      <svg className="mf5-svg" viewBox=${'0 0 ' + W + ' 200'} role="img" aria-label="Triangular cdf with two pieces; R read across and down to X">
        <${Axes} f=${f} xt=${[[0, '0'], [1, '1'], [2, '2']]} yt=${[[0.5, '1/2'], [1, '1']]} xl="x" yl="F(x)" />
        <line x1=${f.x0} y1=${f.Y(0.5)} x2=${f.X(1)} y2=${f.Y(0.5)} stroke="var(--line)" strokeDasharray="3 4" />
        <path d=${curve(triF, 0, 1, f, 30)} fill="none" stroke="var(--fig-k)" strokeWidth=${low || i === 0 ? 4 : 2.5} opacity=${low || i === 0 || i === 3 ? 1 : 0.45} />
        <path d=${curve(triF, 1, 2, f, 30)} fill="none" stroke="var(--fig-k)" strokeWidth=${!low || i === 0 ? 4 : 2.5} opacity=${!low || i === 0 || i === 3 ? 1 : 0.45} />
        <line x1=${f.X(2)} y1=${f.Y(1)} x2=${f.x1} y2=${f.Y(1)} stroke="var(--fig-k)" strokeWidth="2.5" />
        <text x=${f.X(0.12)} y=${f.Y(0.3)} fill="var(--fig-k)" fontWeight="700">x²/2</text>
        <text x=${f.X(2.4)} y=${f.Y(0.58)} textAnchor="end" fill="var(--fig-k)" fontWeight="700">1 − (2 − x)²/2</text>
        <${Read} f=${f} r=${R} x=${x} across=${i >= 1} down=${i >= 1} color="var(--pen)" lab=${'X = ' + f3(x)} />
        ${i >= 1 && html`<text x=${f.x0 + 6} y=${f.Y(R) - 7} fill="var(--pen)" fontWeight="700">R = ${f2(R)}</text>`}
      </svg>
      <div className="mf5-ctl"><${Slide} label="R" v=${Rh} min="0" max="100" set=${v => { setRh(v); if (i === 0) ctl.go(3); }} show=${f2(R)} /></div>
    </div><${Cap} ...${S[i === 0 || i === 3 ? i : low ? 1 : 2]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 7.3-7.7: Figure 5.2, the cdf of the number of shipments, R1 = 0.73 read graphically ── */
  const SHIP = [[0, 0.5], [1, 0.8], [2, 1]];
  const shipX = Rh => Rh <= 50 ? 0 : Rh <= 80 ? 1 : 2;
  function ShipCdf({ ar }) {
    const [mode, setMode] = useState('ex'), [Rh, setRh] = useState(73);
    const S = [
      { en: 'The cdf of a discrete random variable is made of <b>horizontal line segments</b>: F(x) = 0.5 for 0 ≤ x < 1, 0.8 for 1 ≤ x < 2, 1 for x ≥ 2.',
        ar: 'الـ <b>cdf</b> بتاع أي discrete random variable عبارة عن <b>خطوط أفقية</b>، وهنا قيمته 0.5 من 0 لـ 1، وبعدين 0.8 من 1 لـ 2، وبعدين 1.' },
      { en: 'It <b>jumps by p(x)</b> at each value: 0.5 at x = 0, 0.3 at x = 1 and 0.2 at x = 2.', ar: 'وبيعمل <b>jump</b> بحجم الـ <bdi dir="ltr">p(x)</bdi> عند كل قيمة' + L('p(0) = 0.5,  p(1) = 0.3,  p(2) = 0.2') },
      { en: '<b>Graphically</b>: locate R1 = 0.73 on the vertical axis and draw a horizontal line until it hits a jump in the cdf.', ar: 'بالرسم: نحدد الـ R1 على المحور الرأسي ونرسم خط أفقي لحد ما يخبط في <b>jump</b> في الـ cdf' + L('R1 = 0.73') },
      { en: 'Then drop a perpendicular to the horizontal axis: the generated variate is <b>X1 = 1</b>.', ar: 'وبعدين ننزل عمودي على المحور الأفقي، فالـ variate اللي طلع هو' + L('X1 = 1') }
    ];
    const [i, ctl] = useSteps(S.length, 2800);
    const ex = mode === 'ex', st = ex ? i : 3, R = ex ? 0.73 : Rh / 100, X = ex ? 1 : shipX(Rh);
    const f = frame(200, 0, 3.4, 1.1);
    const cap = ex ? S[i] : { en: `R = ${f2(R)} hits the jump at x = ${X}, so <b>X = ${X}</b> (${X === 0 ? 'R ≤ 0.5' : X === 1 ? '0.5 < R ≤ 0.8' : '0.8 < R ≤ 1.0'}).`,
      ar: 'الخط الأفقي بيخبط في الـ jump اللي عند القيمة دي' + L(`R = ${f2(R)}   ⇒   X = ${X}   (${X === 0 ? 'R ≤ 0.5' : X === 1 ? '0.5 < R ≤ 0.8' : '0.8 < R ≤ 1.0'})`) };
    const prev = [0, 0.5, 0.8];
    return html`<figure className="fig mf5"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${setMode} />
      <svg className="mf5-svg" viewBox=${'0 0 ' + W + ' 200'} role="img" aria-label="Figure 5.2: step cdf of the number of shipments with levels 0.5, 0.8 and 1">
        <${Axes} f=${f} xt=${[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} yt=${[[0.5, '0.5'], [0.8, '0.8'], [1, '1']]} xl="x" yl="F(x)" />
        ${SHIP.map(([x, y], k) => html`<g key=${k}>
          <line x1=${f.X(x)} y1=${f.Y(y)} x2=${k < 2 ? f.X(x + 1) : f.x1 - 6} y2=${f.Y(y)} stroke="var(--fig-k)" strokeWidth="3" />
          ${k === 2 && html`<path d=${`M${f.x1 - 8},${f.Y(y) - 5} L${f.x1 + 2},${f.Y(y)} L${f.x1 - 8},${f.Y(y) + 5} Z`} fill="var(--fig-k)" />`}
          <circle cx=${f.X(x)} cy=${f.Y(y)} r="4" fill="var(--fig-k)" />
          ${k < 2 && html`<circle cx=${f.X(x + 1)} cy=${f.Y(y)} r="4" fill="var(--paper-2)" stroke="var(--fig-k)" strokeWidth="2" />`}
          <g className=${pop(st >= 1)}><line x1=${f.X(x)} y1=${f.Y(prev[k])} x2=${f.X(x)} y2=${f.Y(y)} stroke="var(--graphite)" strokeWidth="1.3" strokeDasharray="2 3" />
            <text x=${f.X(x) + 6} y=${f.Y((prev[k] + y) / 2) + 5} fill="var(--graphite)" fontWeight="700">+${f2(y - prev[k]).replace(/0$/, '')}</text></g>
        </g>`)}
        <${Read} f=${f} r=${R} x=${X} across=${st >= 2} down=${st >= 3} color="var(--pen)" lab=${(ex ? 'X1 = ' : 'X = ') + X} dy=${X === 0 ? 0 : 0} />
        ${st >= 2 && html`<text x=${f.X(X === 0 ? 0.1 : 0.12)} y=${f.Y(R) + (R > 0.55 && R < 0.8 ? 18 : -7)} fill="var(--pen)" fontWeight="700" textAnchor="start">${ex ? 'R1' : 'R'} = ${f2(R)}</text>`}
      </svg>
      ${!ex && html`<div className="mf5-ctl"><${Slide} label="R" v=${Rh} min="1" max="100" set=${setRh} show=${f2(R)} /></div>`}
    </div><${Cap} ...${cap} showAr=${ar} />${ex && html`<${Bar} steps=${S} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── 7.2, 7.8-7.9: Table 5.2 and the table-lookup procedure ── */
  function ShipLookup({ ar }) {
    const [mode, setMode] = useState('ex'), [Rh, setRh] = useState(73);
    const S = [
      { en: 'Cumulative probabilities: r1 = p(0) = 0.5, r2 = 0.5 + 0.3 = 0.8, r3 = 0.8 + 0.2 = 1.0. Table 5.2: the input ri gives the output xi.',
        ar: 'نجمع الاحتمالات تراكمي، وده Table 5.2: الـ input هو الـ ri والـ output هو الـ xi' + L('r1 = 0.5,  r2 = 0.5 + 0.3 = 0.8,  r3 = 0.8 + 0.2 = 1.0') },
      { en: 'With r0 = 0, the cuts split (0, 1] into intervals: X = 0 if R ≤ 0.5; X = 1 if 0.5 < R ≤ 0.8; X = 2 if 0.8 < R ≤ 1.0.',
        ar: 'ولو حطينا الـ r0 بصفر، الفترة من 0 لـ 1 بتتقسم كده' + L('X = 0 if R ≤ 0.5') + L('X = 1 if 0.5 < R ≤ 0.8') + L('X = 2 if 0.8 < R ≤ 1.0') },
      { en: 'Now R1 = 0.73: find the interval it lies in.', ar: 'دلوقتي عندنا الـ R1 ونشوف هي في أنهي فترة' + L('R1 = 0.73') },
      { en: 'r1 = 0.5 < R1 = 0.73 ≤ r2 = 0.8, so set <b>X1 = x2 = 1</b>.', ar: 'الـ R1 واقعة بين الـ r1 والـ r2، يبقى' + L('r1 = 0.5 < R1 = 0.73 ≤ r2 = 0.8   ⇒   X1 = x2 = 1') }
    ];
    const [i, ctl] = useSteps(S.length, 3000);
    const ex = mode === 'ex', st = ex ? i : 3, R = ex ? 0.73 : Rh / 100, X = ex ? 1 : shipX(Rh);
    const lo = [0, 0.5, 0.8][X], hi = [0.5, 0.8, 1.0][X];
    const cap = ex ? S[i] : { en: `F(x${X}) = r${X} = ${f2(lo)} < R = ${f2(R)} ≤ r${X + 1} = ${f2(hi)}, so <b>X = x${X + 1} = ${X}</b>.`,
      ar: 'نلاقي الفترة اللي فيها الـ R' + L(`r${X} = ${f2(lo)} < R = ${f2(R)} ≤ r${X + 1} = ${f2(hi)}   ⇒   X = x${X + 1} = ${X}`) };
    return html`<figure className="fig mf5"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${setMode} />
      <div className="mf5-tbw" style=${{ maxWidth: '300px' }}><table className="mf5-tb"><thead><tr><th>i</th><th>x</th><th>p(x)</th><th>input ri</th><th>output xi</th></tr></thead>
        <tbody>${SHIP.map(([x, r], k) => html`<tr key=${k} className=${st >= 3 && X === x ? 'on' : ''}><td>${k + 1}</td><td>${x}</td><td>${f2([0.5, 0.3, 0.2][k])}</td><td>${f2(r)}</td><td>${x}</td></tr>`)}</tbody></table></div>
      <div className=${pop(st >= 1)}><${IBar} cuts=${[0, 0.5, 0.8, 1]} labels=${['X = 0', 'X = 1', 'X = 2']} on=${st >= 3 ? X : -1}
        ticks=${[[0, 'r0 = 0'], [0.5, '0.5'], [0.8, '0.8'], [1, '1.0']]} R=${st >= 2 ? R : null} Rlab=${(ex ? 'R1' : 'R') + ' = ' + f2(R)} /></div>
      ${!ex && html`<div className="mf5-ctl"><${Slide} label="R" v=${Rh} min="1" max="100" set=${setRh} show=${f2(R)} /></div>`}
    </div><${Cap} ...${cap} showAr=${ar} />${ex && html`<${Bar} steps=${S} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── 8.0-8.5: discrete uniform on {1, …, k}, X = ⌈Rk⌉ ── */
  function DUnif({ ar }) {
    const [k, setK] = useState(10), [Rh, setRh] = useState(78);
    const R = Rh / 100, Rk100 = Rh * k, X = Math.ceil(Rk100 / 100), Rk = +(Rk100 / 100).toFixed(2);
    const cuts = Array.from({ length: k + 1 }, (_, j) => j / k);
    const cap = { en: `k = ${k}, so each value i gets an interval of width 1/k: (i − 1)/k < R ≤ i/k (5.6). R = ${f2(R)} gives Rk = ${Rk} and <b>X = ⌈Rk⌉ = ⌈${Rk}⌉ = ${X}</b>${k === 10 && Rh === 78 ? ' (the notes’ example ⌈7.8⌉ = 8)' : ''}.`,
      ar: 'كل قيمة i ليها فترة عرضها <bdi dir="ltr">1/k</bdi>، ودي معادلة (5.6). نضرب الـ R في الـ k ونقرّب لفوق' + L(`(i − 1)/k < R ≤ i/k`) + L(`k = ${k},  R = ${f2(R)},  Rk = ${Rk}`) + L(`X = ⌈Rk⌉ = ⌈${Rk}⌉ = ${X}`) + (k === 10 && Rh === 78 ? 'وده نفس مثال الـ notes.' : '') };
    return html`<figure className="fig mf5"><div className="fig-stage">
      <${IBar} cuts=${cuts} labels=${cuts.slice(1).map((_, j) => j + 1)} on=${X - 1} R=${R} Rlab=${'R = ' + f2(R)} />
      <div className="mf5-calc"><div>${X - 1}/${k} ${'<'} R = ${f2(R)} ≤ ${X}/${k}</div><div>X = ⌈Rk⌉ = ⌈${f2(R)} × ${k}⌉ = ⌈${Rk}⌉ = <b>${X}</b></div></div>
      <div className="mf5-ctl"><${Slide} label="k" v=${k} min="2" max="12" set=${setK} show=${k} /><${Slide} label="R" v=${Rh} min="1" max="100" set=${setRh} show=${f2(R)} /></div>
    </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── 9.0-9.5: pmf p(x) = 2x/(k(k + 1)), X from the quadratic formula ── */
  function Ex54({ ar }) {
    const [k, setK] = useState(4), [Rh, setRh] = useState(50);
    const R = Rh / 100, kk = k * (k + 1), F = x => x * (x + 1) / kk;
    let XL = 1; while (XL < k && XL * (XL + 1) * 100 < kk * Rh) XL++;   // table lookup: (X − 1)X < k(k + 1)R ≤ X(X + 1), exact in hundredths
    const c = kk * R, xr = (1 + Math.sqrt(1 + 4 * c)) / 2, XF = Math.ceil(Math.round((xr - 1) * 1e9) / 1e9);
    const cuts = [0, ...Array.from({ length: k }, (_, j) => F(j + 1))];
    const cap = { en: `k = ${k}: F(x) = x(x + 1)/(k(k + 1)) = x(x + 1)/${kk}. R = ${f2(R)} gives k(k + 1)R = ${+c.toFixed(2)}, x = (1 + √(1 + 4·${+c.toFixed(2)}))/2 = ${f3(xr)} and <b>X = ⌈x − 1⌉ = ⌈${f3(xr - 1)}⌉ = ${XF}</b>, the same value the table lookup F(X − 1) < R ≤ F(X) finds.`,
      ar: 'الـ <b>cdf</b> هنا' + L(`F(x) = x(x + 1)/(k(k + 1)) = x(x + 1)/${kk}`) + 'وبالـ quadratic formula بنطلع الجذر الموجب وبعدين نقرّب لفوق' + L(`k(k + 1)R = ${+c.toFixed(2)},  x = ${f3(xr)}`) + L(`X = ⌈x − 1⌉ = ⌈${f3(xr - 1)}⌉ = ${XF}`) + 'ودي نفس القيمة اللي بيطلّعها الـ table lookup.' };
    return html`<figure className="fig mf5"><div className="fig-stage">
      <${IBar} cuts=${cuts} labels=${cuts.slice(1).map((_, j) => j + 1)} on=${XL - 1} R=${R} Rlab=${'R = ' + f2(R)} />
      <div className="mf5-calc">
        <div>k(k + 1)R = ${kk} × ${f2(R)} = ${+c.toFixed(2)}</div>
        <div>x = (1 + √(1 + 4(k² + k)R)) / 2 = ${f3(xr)}</div>
        <div>X = ⌈x − 1⌉ = ⌈${f3(xr - 1)}⌉ = <b>${XF}</b></div>
        <div>check: F(${XF - 1}) = ${f3(F(XF - 1))} ${'<'} R = ${f2(R)} ≤ F(${XF}) = ${f3(F(XF))} <span className=${XF === XL ? 'ok' : 'no'}>${XF === XL ? '✓' : '✗'}</span></div></div>
      <div className="mf5-ctl"><${Slide} label="k" v=${k} min="2" max="8" set=${setK} show=${k} /><${Slide} label="R" v=${Rh} min="1" max="100" set=${setRh} show=${f2(R)} /></div>
    </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── 10, 11.0-11.5: geometric variates, Example 5.6 (p = 1/2, q = 1) ── */
  function geo(R, p, q) { let y = Math.log(1 - R) / Math.log(1 - p); y = Math.round(y * 1e9) / 1e9; return { y, X: q + Math.ceil(y - 1) }; }
  const GEX = [0.932, 0.105, 0.687];
  function geoBar(p, q) { const cuts = [0], labels = []; let F = 0, j = 0; while (j < 14 && 1 - F > 0.03) { F = 1 - Math.pow(1 - p, j + 1); cuts.push(F); labels.push(q + j); j++; } if (F < 1) { cuts.push(1); labels.push('…'); } return { cuts, labels }; }
  function Geom({ ar }) {
    const [mode, setMode] = useState('ex'), [ph, setPh] = useState(30), [q, setQ] = useState(1), [Rh, setRh] = useState(60);
    const S = [
      { en: 'Example 5.6: geometric on {1, 2, …} with mean 1/p = 2, so <b>p = 1/2</b> and <b>q = 1</b>: X = 1 + ⌈ln(1 − R)/ln(1 − 0.5) − 1⌉. Random numbers 0.932, 0.105, 0.687.',
        ar: 'في Example 5.6 الـ mean بيساوي 2، يبقى الـ p بتساوي <bdi dir="ltr">1/2</bdi> والـ q بتساوي 1' + L('X = 1 + ⌈ln(1 − R)/ln(1 − 0.5) − 1⌉') + 'والـ random numbers هي' + L('R1 = 0.932,  R2 = 0.105,  R3 = 0.687') }
    ];
    GEX.forEach((r, k) => {
      const g = geo(r, 0.5, 1);
      S.push({ en: `R${k + 1} = ${r}: ln(1 − ${r})/ln 0.5 = ln ${f3(1 - r)}/ln 0.5 = <b>${f3(g.y)}</b>${k === 1 ? ' (the notes print 0.166)' : ''}.`,
        ar: 'نحسب الكمية دي للـ R' + (k + 1) + L(`ln(1 − ${r})/ln 0.5 = ${f3(g.y)}`) + (k === 1 ? 'والـ notes كاتبة 0.166 بدل 0.160.' : '') });
      S.push({ en: `X${k + 1} = 1 + ⌈${f3(g.y)} − 1⌉ = ⌈${f3(g.y)}⌉ = <b>${g.X}</b>. On the cdf bar R${k + 1} falls in the interval of x = ${g.X}.`,
        ar: 'نقرّب لفوق، والـ R' + (k + 1) + ' واقعة في فترة القيمة دي على الـ cdf' + L(`X${k + 1} = 1 + ⌈${f3(g.y)} − 1⌉ = ⌈${f3(g.y)}⌉ = ${g.X}`) });
    });
    S.push({ en: 'Result: <b>X1 = 4, X2 = 1, X3 = 2</b>. (The notes move the 1 inside the ceiling: 1 + ⌈y⌉ = ⌈1 + y⌉.)', ar: 'النتيجة النهائية' + L('X1 = 4,  X2 = 1,  X3 = 2') + 'والـ notes بتدخّل الـ 1 جوه الـ ceiling لأنه integer.' });
    const [i, ctl] = useSteps(S.length, 3000);
    const ex = mode === 'ex', p = ex ? 0.5 : ph / 100, qq = ex ? 1 : q;
    const cur = ex ? (i === 0 ? -1 : i === S.length - 1 ? 2 : Math.floor((i - 1) / 2)) : -1;
    const R = ex ? (cur >= 0 ? GEX[cur] : null) : Rh / 100, g = R != null ? geo(R, p, qq) : null;
    const showX = !ex || (i >= 2 && (i % 2 === 0 || i === S.length - 1));
    const bar = geoBar(p, qq), on = g && showX ? bar.labels.indexOf(g.X) : -1;
    const Fv = x => 1 - Math.pow(1 - p, x - qq + 1);
    const cap = ex ? S[i] : { en: `p = ${f2(p)}, q = ${qq}: ln(1 − R)/ln(1 − p) = ln ${f2(1 - R)}/ln ${f2(1 - p)} = ${f3(g.y)}, so <b>X = ${qq} + ⌈${f3(g.y)} − 1⌉ = ${g.X}</b>.`,
      ar: 'نطبّق نفس المعادلة على أرقامك' + L(`p = ${f2(p)},  q = ${qq},  R = ${f2(R)}`) + L(`ln(1 − R)/ln(1 − p) = ${f3(g.y)}`) + L(`X = ${qq} + ⌈${f3(g.y)} − 1⌉ = ${g.X}`) };
    const rows = ex ? GEX.map((r, k) => ({ k, r, g: geo(r, 0.5, 1), seen: 2 * k + 1 <= i, done: 2 * k + 2 <= i })) : [];
    return html`<figure className="fig mf5"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example 5.6'], ['try', 'Try your own']]} mode=${mode} set=${setMode} />
      <${IBar} cuts=${bar.cuts} labels=${bar.labels} on=${on} R=${R} Rlab=${R != null ? 'R = ' + (ex ? R : f2(R)) : ''} ticks=${[[0, '0'], [1, '1']]} />
      ${ex ? html`<div className="mf5-tbw"><table className="mf5-tb"><thead><tr><th>i</th><th>Ri</th><th>ln(1 − Ri)/ln 0.5</th><th>Xi</th></tr></thead>
        <tbody>${rows.map(r => html`<tr key=${r.k} className=${cur === r.k && i < S.length - 1 ? 'on' : ''}><td>${r.k + 1}</td><td>${r.r}</td><td>${r.seen ? f3(r.g.y) : ''}</td><td>${r.done ? r.g.X : ''}</td></tr>`)}</tbody></table></div>`
        : html`<div className="mf5-calc"><div>X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉ = ${qq} + ⌈${f3(g.y)} − 1⌉ = <b>${g.X}</b></div>
          <div>check: F(${g.X - 1}) = ${f3(Fv(g.X - 1))} ${'<'} R ≤ F(${g.X}) = ${f3(Fv(g.X))}, with F(x) = 1 − (1 − p)^(x − q + 1)</div></div>
          <div className="mf5-ctl"><${Slide} label="p" v=${ph} min="5" max="95" set=${setPh} show=${f2(p)} /><${Slide} label="q" v=${q} min="0" max="3" set=${setQ} show=${q} /><${Slide} label="R" v=${Rh} min="1" max="99" set=${setRh} show=${f2(R)} /></div>`}
    </div><${Cap} ...${cap} showAr=${ar} />${ex && html`<${Bar} steps=${S} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── 12.0-12.7: acceptance-rejection for X uniform on [1/4, 1] ── */
  function AccRej({ ar }) {
    const [log, setLog] = useState([]), [last, setLast] = useState(null);
    const rnd = () => Math.round(Math.random() * 1e4) / 1e4 || 0.0001;
    const one = () => { const r = rnd(), y = r >= 0.25; setLog(l => [...l, [r, y]]); setLast({ r, y }); };
    const many = () => { const add = []; let acc = 0; while (acc < 100) { const r = rnd(), y = r >= 0.25; add.push([r, y]); if (y) acc++; } setLog(l => [...l, ...add]); setLast({ many: true, tries: add.length }); };
    const tries = log.length, accd = log.filter(d => d[1]), nAcc = accd.length, nRej = tries - nAcc;
    const bins = [0, 0, 0]; accd.forEach(([r]) => { bins[Math.min(2, Math.floor((r - 0.25) / 0.25))]++; });
    const mx = Math.max(1, ...bins);
    let cap;
    if (!last) cap = { en: 'Generate X uniform on [1/4, 1]. <b>Step 1</b>: generate R. <b>Step 2</b>: accept X = R if R ≥ 1/4, otherwise reject R and go back to Step 1. <b>Step 3</b>: repeat if another X is needed. Press <b>Generate R</b>.',
      ar: 'عايزين X تكون uniform على الفترة من <bdi dir="ltr">1/4</bdi> لـ 1. الخطوة الأولى نولّد R، والتانية نقبلها لو أكبر من أو تساوي <bdi dir="ltr">1/4</bdi> ونرفضها لو أصغر ونرجع للخطوة الأولى، والتالتة نكرر لو محتاجين X تاني. دوس <b>Generate R</b>.' };
    else if (last.many) cap = { en: `100 values accepted after <b>${last.tries}</b> random numbers. Overall ${nAcc} accepted of ${tries} (${(100 * nAcc / tries).toFixed(1)}%; P(R ≥ 1/4) = 3/4). Each accepted part of [1/4, 1] gets about the same share: (b − a)/(3/4). Fewer rejections means higher efficiency.`,
      ar: 'اتقبل 100 قيمة بعد عدد ده من الـ random numbers' + L(`${last.tries} random numbers,  accepted ${nAcc} / ${tries} = ${(100 * nAcc / tries).toFixed(1)}%`) + 'والاحتمال النظري للقبول هو <bdi dir="ltr">3/4</bdi>. وكل جزء من الفترة بياخد تقريبًا نفس النصيب، ودي الـ <b>uniform</b>. وكل ما الـ rejections تقل الـ efficiency تزيد.' };
    else if (last.y) cap = { en: `<b>Step 2a</b>: R = ${f4(last.r)} ≥ 1/4, so <b>accept X = ${f4(last.r)}</b>. Step 3: press Generate R again if another X is needed.`, ar: 'دي <b>acceptance</b> لأن الـ R أكبر من أو تساوي <bdi dir="ltr">1/4</bdi>' + L(`R = ${f4(last.r)} ≥ 1/4   ⇒   X = ${f4(last.r)}`) + 'ولو محتاج X تاني دوس Generate R تاني.' };
    else cap = { en: `<b>Step 2b</b>: R = ${f4(last.r)} < 1/4, so <b>reject</b> it and return to Step 1 for a new R.`, ar: 'دي <b>rejection</b> لأن الـ R أصغر من <bdi dir="ltr">1/4</bdi>، فنرجع للخطوة الأولى ونولّد R جديدة' + L(`R = ${f4(last.r)} < 1/4`) };
    const fl = !last ? -1 : last.many ? 3 : last.y ? 1 : 2;
    return html`<figure className="fig mf5"><div className="fig-stage">
      <div className="mf5-flow">
        <div className=${fl === -1 || fl === 2 ? 'on' : ''}><b>Step 1</b>Generate a random number R</div>
        <div className=${fl === 1 ? 'y' : fl === 2 ? 'n' : ''}><b>Step 2</b>R ≥ 1/4: accept X = R · R ${'<'} 1/4: reject, back to Step 1</div>
        <div className=${fl === 1 || fl === 3 ? 'on' : ''}><b>Step 3</b>Another X needed? Repeat from Step 1, else stop</div></div>
      <${IBar} cuts=${[0, 0.25, 1]} labels=${['reject', 'accept X = R']} cls=${['rej', '']} on=${last && !last.many && last.y ? 1 : -1}
        ticks=${[[0, '0'], [0.25, '1/4'], [1, '1']]} R=${last && !last.many ? last.r : null} Rlab=${last && !last.many ? 'R = ' + f4(last.r) : ''} dots=${log.slice(-60)} />
      <div className="mf5-row"><button className="fig-btn solid" onClick=${one}>Generate R</button><button className="fig-btn" onClick=${many}>Generate 100 X</button><button className="fig-btn" onClick=${() => { setLog([]); setLast(null); }} disabled=${!tries}>Reset</button></div>
      <div className="mf5-stat"><span>tries <b>${tries}</b></span><span>accepted <b>${nAcc}</b></span><span>rejected <b>${nRej}</b></span>${tries > 0 && html`<span>accept rate <b>${(100 * nAcc / tries).toFixed(1)}%</b></span>`}</div>
      ${nAcc > 0 && html`<div className="mf5-hist" aria-label="Accepted values in three equal parts of [1/4, 1]">${bins.map((b, k) => html`<div key=${k}><i style=${{ height: Math.round(60 * b / mx) + 'px' }}></i><b>${b}</b>${['1/4 to 1/2', '1/2 to 3/4', '3/4 to 1'][k]}</div>`)}</div>`}
    </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── 13.2-13.6: N = n iff A1 + … + An ≤ 1 < A1 + … + An+1, with the R's of Example 5.7 (α = 0.2) ── */
  const PEX = [[0.4357], [0.4146], [0.8353, 0.9952, 0.8004]];
  function PoisTimeRun({ v, setV, ar }) {
    const Rs = PEX[v], A = Rs.map(r => -Math.log(r) / 0.2), Sm = A.map((_, j) => A.slice(0, j + 1).reduce((s, x) => s + x, 0));
    const N = Sm.filter(s => s <= 1).length;
    const S = [{ en: `Variate ${v + 1} of Example 5.7, α = 0.2: each interarrival time is Ai = −(1/α) ln Ri = −5 ln Ri (5.8). N counts the arrivals before time 1 (5.7).`,
      ar: 'الـ variate رقم ' + (v + 1) + ' من Example 5.7، ومعادلة (5.8) بتدّي الـ interarrival time' + L('α = 0.2,   Ai = −(1/α) ln Ri = −5 ln Ri') + 'والـ N هي عدد الـ arrivals اللي قبل الزمن 1، معادلة (5.7).' }];
    Sm.forEach((s, j) => S.push({ en: `R${j + 1} = ${Rs[j]}: A${j + 1} = −5 ln ${Rs[j]} = ${f3(A[j])}; arrival ${j + 1} at time ${f3(s)} ${s <= 1 ? '≤ 1, inside the unit of time' : '> 1, after the unit of time'}.`,
      ar: 'الـ arrival رقم ' + (j + 1) + (s <= 1 ? ' جوه وحدة الزمن' : ' بعد وحدة الزمن') + L(`A${j + 1} = −5 ln ${Rs[j]} = ${f3(A[j])},   A1 + … + A${j + 1} = ${f3(s)} ${s <= 1 ? '≤' : '>'} 1`) }));
    S.push({ en: `${N === 0 ? 'A1 > 1' : `A1 + … + A${N} ≤ 1 < A1 + … + A${N + 1}`}, so <b>N = ${N}</b>: the same answer the product method gives with the same random numbers.`,
      ar: 'يبقى عدد الـ arrivals في وحدة الزمن' + L(`${N === 0 ? 'A1 > 1' : `A1 + … + A${N} ≤ 1 < A1 + … + A${N + 1}`}   ⇒   N = ${N}`) + 'ودي نفس النتيجة اللي بتطلع من طريقة الضرب بنفس الـ random numbers.' });
    const [i, ctl] = useSteps(S.length, 2800);
    const shown = Math.min(i, Sm.length), f = frame(110, 0, 2.5, 1, { l: 14, r: 14, t: 10, b: 30 });
    const y0 = 70;
    return html`<div className="fig-stage"><${Modes} list=${[[0, 'Variate 1'], [1, 'Variate 2'], [2, 'Variate 3']]} mode=${v} set=${setV} />
      <svg className="mf5-svg" viewBox=${'0 0 ' + W + ' 110'} role="img" aria-label="Arrival times on a time line with the unit time mark at 1">
        <line x1=${f.X(0)} y1=${y0} x2=${f.x1 + 6} y2=${y0} stroke="var(--graphite)" strokeWidth="1.5" />
        <rect x=${f.X(0)} y=${y0 - 12} width=${f.X(1) - f.X(0)} height="12" fill="color-mix(in srgb, var(--fig-k) 18%, transparent)" />
        ${[0, 1, 2].map(t => html`<g key=${t}><line x1=${f.X(t)} y1=${y0 - (t === 1 ? 12 : 5)} x2=${f.X(t)} y2=${y0 + (t === 1 ? 8 : 5)} stroke=${t === 1 ? 'var(--ink)' : 'var(--graphite)'} strokeWidth=${t === 1 ? 2.5 : 1.3} /><text x=${f.X(t)} y=${y0 + 23} textAnchor="middle" fill=${t === 1 ? 'var(--ink)' : 'var(--graphite)'} fontWeight=${t === 1 ? 700 : 400}>${t === 1 ? 'time 1' : t}</text></g>`)}
        ${Sm.slice(0, shown).map((s, j) => { const off = s > 2.5, x = off ? f.x1 : f.X(s), col = s <= 1 ? 'var(--ok)' : 'var(--pen)';
          return html`<g key=${j}>${off ? html`<path d=${`M${x - 10},${y0 - 6} L${x},${y0} L${x - 10},${y0 + 6} Z`} fill=${col} />` : html`<circle cx=${x} cy=${y0} r="5.5" fill=${col} />`}
            <text x=${off ? x : x} y=${y0 - 16 - (j % 2) * 18 - (j === 2 ? 0 : 0)} textAnchor=${off ? 'end' : x < 40 ? 'start' : 'middle'} fill=${col} fontWeight="700">${off ? `#${j + 1} at ${f3(s)} →` : '#' + (j + 1)}</text></g>`; })}
      </svg>
      <div className="mf5-tbw"><table className="mf5-tb"><thead><tr><th>j</th><th>Rj</th><th>Aj = −5 ln Rj</th><th>A1 + … + Aj</th></tr></thead>
        <tbody>${Sm.map((s, j) => html`<tr key=${j} className=${j === shown - 1 && i <= Sm.length ? 'on' : ''}><td>${j + 1}</td><td>${Rs[j]}</td><td>${j < shown ? f3(A[j]) : ''}</td><td className=${j < shown ? (s <= 1 ? 'ok' : 'no') : ''}>${j < shown ? f3(s) + (s <= 1 ? ' ≤ 1' : ' > 1') : ''}</td></tr>`)}</tbody></table></div>
      ${i === S.length - 1 && html`<p className="mf5-note" style=${{ color: 'var(--ink)', fontWeight: 700 }}>N = ${N}</p>`}</div>
      <${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} />`;
  }
  function PoisTime({ ar }) {
    const [v, setV] = useState(2);
    return html`<figure className="fig mf5"><${PoisTimeRun} key=${v} v=${v} setV=${setV} ar=${ar} /></figure>`;
  }

  /* ── 14, 15: the product method, Example 5.7 (α = 0.2, e^(−α) = 0.8187) ── */
  // rows as printed in the notes (P = 0.8312 for 0.8353 × 0.9952 = 0.83129…)
  const PROWS = [[1, 0, 0.4357, '0.4357', 1], [2, 0, 0.4146, '0.4146', 1], [3, 0, 0.8353, '0.8353', 0], [3, 1, 0.9952, '0.8312', 0], [3, 2, 0.8004, '0.6654', 1]];
  function PoisGen({ ar }) {
    const [mode, setMode] = useState('ex');
    const S = [{ en: 'Example 5.7: α = 0.2, so e^(−α) = e^(−0.2) = <b>0.8187</b>. Generate 3 Poisson variates.', ar: 'في Example 5.7 بنولّد 3 Poisson variates' + L('α = 0.2,   e^(−α) = e^(−0.2) = 0.8187'), st: -1, row: 0 }];
    PROWS.forEach(([v, n, r, P, acc], k) => {
      if (n === 0) S.push({ en: `Variate ${v}, <b>Step 1</b>: set n = 0, P = 1.`, ar: 'الـ variate رقم ' + v + '، الخطوة الأولى' + L('n = 0,   P = 1'), st: 0, row: k, v, pv: 1, pStr: '1' });
      S.push({ en: `<b>Step 2</b>: R${n + 1} = ${r}, P = ${n === 0 ? '1' : PROWS[k - 1][3]} × ${r} = <b>${P}</b>${k === 3 ? ' (0.83129…, the notes keep 0.8312)' : ''}.`,
        ar: 'الخطوة التانية: نولّد R جديدة ونضربها في الـ P' + L(`R${n + 1} = ${r},   P = ${n === 0 ? '1' : PROWS[k - 1][3]} × ${r} = ${P}`) + (k === 3 ? 'والقيمة بالظبط 0.83129 والـ notes كاتباها 0.8312.' : ''), st: 1, row: k + 1, v, pv: +P, pStr: P });
      S.push(acc ? { en: `<b>Step 3</b>: P = ${P} < e^(−α) = 0.8187, so <b>accept N = ${n}</b>.`, ar: 'الخطوة التالتة: الـ P أصغر من الـ <bdi dir="ltr">e^(−α)</bdi>، يبقى نقبل' + L(`P = ${P} < 0.8187   ⇒   N = ${n}`), st: 2, row: k + 1, v, pv: +P, pStr: P, acc: 1 }
        : { en: `<b>Step 3</b>: P = ${P} ≥ e^(−α) = 0.8187, so <b>reject n = ${n}</b>, set n = ${n + 1} and return to Step 2.`, ar: 'الخطوة التالتة: الـ P أكبر من أو تساوي الـ <bdi dir="ltr">e^(−α)</bdi>، يبقى نرفض الـ n دي ونزودها واحد ونرجع للخطوة التانية' + L(`P = ${P} ≥ 0.8187   ⇒   n = ${n + 1}`), st: 2, row: k + 1, v, pv: +P, pStr: P, acc: 0 });
    });
    S.push({ en: 'N = 0, 0, 2 used <b>5 random numbers</b>. N = n needs n + 1 random numbers, so on average E(N + 1) = α + 1: about 1000(0.2 + 1) = <b>1200</b> random numbers for 1000 variates.',
      ar: 'التلات variates استخدموا <b>5 random numbers</b>. ولو الـ variate طلع قيمته n، بنحتاج random numbers عددها' + L('n + 1') + 'فالمتوسط' + L('E(N + 1) = α + 1') + 'يعني عشان نولّد 1000 variate محتاجين حوالي' + L('1000(0.2 + 1) = 1200'), st: 3, row: 5 });
    const [i, ctl] = useSteps(S.length, 2600);
    // try your own
    const [al, setAl] = useState(20), [tr, setTr] = useState(null), [tot, setTot] = useState({ v: 0, r: 0, sn: 0 });
    const a = al / 100, ea = Math.exp(-a);
    const gen = () => { let n = 0, P = 1; const rows = []; for (;;) { const r = Math.round(Math.random() * 1e4) / 1e4 || 0.0001; P *= r; rows.push({ n, r, P, acc: P < ea }); if (P < ea) break; n++; } return { rows, N: n }; };
    const one = () => { const g = gen(); setTr(g); setTot(t => ({ v: t.v + 1, r: t.r + g.rows.length, sn: t.sn + g.N })); };
    const many = () => { let r = 0, sn = 0, g; for (let k = 0; k < 1000; k++) { g = gen(); r += g.rows.length; sn += g.N; } setTr(g); setTot(t => ({ v: t.v + 1000, r: t.r + r, sn: t.sn + sn })); };
    const ex = mode === 'ex', s = S[i];
    const pv = ex ? (s.pv != null ? s.pv : null) : tr ? tr.rows[tr.rows.length - 1].P : null, th = ex ? 0.8187 : ea;
    const flow = ex ? s.st : tr ? 2 : -1;
    let cap = ex ? s : !tr ? { en: `α = ${a}, e^(−α) = ${f4(ea)}. Press <b>Generate N</b> to run Steps 1 to 3 with fresh random numbers.`, ar: 'دوس <b>Generate N</b> عشان تمشي الخطوات من 1 لـ 3 بـ random numbers جديدة' + L(`α = ${a},   e^(−α) = ${f4(ea)}`) }
      : { en: `N = <b>${tr.N}</b> using ${tr.rows.length} random number(s). So far ${tot.v} variate(s), ${tot.r} random numbers: ${(tot.r / tot.v).toFixed(3)} per variate (α + 1 = ${f2(a + 1)}), mean N = ${(tot.sn / tot.v).toFixed(3)} (α = ${a}).`,
        ar: 'الـ variate ده طلع بعدد ده من الـ random numbers' + L(`N = ${tr.N},   ${tr.rows.length} random numbers`) + 'والمتوسط لحد دلوقتي بيقرّب من القيمة النظرية' + L(`${tot.r} / ${tot.v} = ${(tot.r / tot.v).toFixed(3)}   vs   α + 1 = ${f2(a + 1)}`) };
    const exRows = ex ? PROWS.slice(0, s.row) : [];
    return html`<figure className="fig mf5"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example 5.7'], ['try', 'Try your own']]} mode=${mode} set=${setMode} />
      <div className="mf5-flow">
        <div className=${flow === 0 ? 'on' : ''}><b>Step 1</b>n = 0, P = 1</div>
        <div className=${flow === 1 ? 'on' : ''}><b>Step 2</b>new R(n+1), P = P · R(n+1)</div>
        <div className=${flow === 2 ? ((ex ? s.acc : 1) ? 'y' : 'n') : ''}><b>Step 3</b>P ${'<'} e^(−α): accept N = n · else n = n + 1, back to Step 2</div></div>
      <div className="mf5-meter" role="img" aria-label=${'P compared with e^(−α)'}>
        ${pv != null && html`<i style=${{ width: pv * 100 + '%' }}></i><span className="pl" style=${{ left: pv * 100 + '%', transform: pv > 0.5 ? 'translateX(-100%)' : 'none' }}>P = ${ex ? s.pStr : f4(pv)}</span>`}
        <span className="th" style=${{ left: th * 100 + '%' }}></span><span className="thl" style=${{ left: clampPct(th) + '%' }}>e^(−α) = ${f4(th)}</span></div>
      ${ex ? html`<div className="mf5-tbw"><table className="mf5-tb"><thead><tr><th>N#</th><th>n</th><th>R(n+1)</th><th>P</th><th>result</th></tr></thead>
        <tbody>${exRows.map(([v, n, r, P, acc], k) => { const decided = !(k === s.row - 1 && s.st === 1);
          return html`<tr key=${k} className=${k === s.row - 1 && (s.st === 1 || s.st === 2) ? 'on' : ''}><td>${v}</td><td>${n}</td><td>${r}</td><td>${P}</td><td className=${decided ? (acc ? 'ok' : 'no') : ''}>${decided ? (acc ? 'N = ' + n : 'reject') : ''}</td></tr>`; })}</tbody></table></div>`
        : html`<div className="mf5-ctl"><${Slide} label="α" v=${al} min="10" max="300" step="10" set=${v => { setAl(v); setTr(null); setTot({ v: 0, r: 0, sn: 0 }); }} show=${a} /></div>
          <div className="mf5-row" style=${{ marginTop: '8px' }}><button className="fig-btn solid" onClick=${one}>Generate N</button><button className="fig-btn" onClick=${many}>Generate 1000</button></div>
          ${tr && html`<div className="mf5-tbw"><table className="mf5-tb"><thead><tr><th>n</th><th>R(n+1)</th><th>P</th><th>result</th></tr></thead>
            <tbody>${tr.rows.slice(-6).map((r, k) => html`<tr key=${k}><td>${r.n}</td><td>${f4(r.r)}</td><td>${f4(r.P)}</td><td className=${r.acc ? 'ok' : 'no'}>${r.acc ? 'N = ' + r.n : 'reject'}</td></tr>`)}</tbody></table>
            ${tr.rows.length > 6 && html`<p className="mf5-note">last 6 of ${tr.rows.length} rows</p>`}</div>`}`}
    </div><${Cap} ...${cap} showAr=${ar} />${ex && html`<${Bar} steps=${S} i=${i} ctl=${ctl} />`}</figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'ms-exp-inv': ExpInv, 'ms-unif-inv': UnifInv, 'ms-tri-pdf': TriPdf, 'ms-tri-inv': TriInv, 'ms-ship-cdf': ShipCdf, 'ms-ship-lookup': ShipLookup, 'ms-dunif': DUnif, 'ms-ex54': Ex54, 'ms-geom': Geom, 'ms-acc-rej': AccRej, 'ms-pois-time': PoisTime, 'ms-pois-gen': PoisGen });
})();
/* ── part 6 ── */
// Modeling & Simulation visuals, part 6: L6 Input Modeling (data collection, histograms, scatter, families, Q-Q, estimation, chi-square, K-S, no-data, multivariate, time series). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf6-tabs{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mf6 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mf6 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf6-flow{ display:flex; flex-direction:column; align-items:center; gap:4px; max-width:620px; margin:0 auto; }
.mf6-arr{ color:var(--faint); font-size:1.3rem; line-height:1; transition:color .4s; } .mf6-arr.on{ color:var(--fig-k); } .mf6-arr .mf6-h{ display:none; }
@media (min-width:640px){ .mf6-flow{ flex-direction:row; align-items:stretch; } .mf6-flow .mf6-box{ flex:1 1 0; display:grid; place-content:center; } .mf6-arr{ align-self:center; } .mf6-arr .mf6-h{ display:inline; } .mf6-arr .mf6-v{ display:none; } }
.mf6-box{ width:min(100%, 230px); box-sizing:border-box; text-align:center; padding:12px 10px; font-weight:600; font-size:.92rem; line-height:1.3; color:var(--ink); background:var(--paper); border:2px solid var(--line); opacity:.4; transition:opacity .4s, border-color .4s, box-shadow .4s; }
.mf6-box.on{ opacity:1; border-color:var(--fig-k); } .mf6-box.cur{ box-shadow:0 0 0 3px color-mix(in srgb, var(--fig-k) 35%, transparent); }
.mf6-cloud{ border-radius:40px; } .mf6-doc{ border-radius:4px 4px 22px 4px; } .mf6-proc{ border-radius:3px; } .mf6-cyl{ border-radius:50% / 24%; }
.mf6-box small{ display:block; font-weight:500; font-size:.8rem; color:var(--pen); margin-top:4px; }
.mf6-flow.bad .mf6-box{ border-color:var(--pen); }
.mf6-hist{ max-width:520px; margin:0 auto; padding-top:18px; }
.mf6-hb{ display:flex; align-items:flex-end; gap:2px; height:150px; border-bottom:1.5px solid var(--graphite); border-left:1.5px solid var(--graphite); padding:0 2px; }
.mf6-bar{ flex:1 1 0; min-width:0; position:relative; box-sizing:border-box; background:color-mix(in srgb, var(--fig-k) 38%, var(--paper)); border:1px solid var(--fig-k); border-bottom:0; transition:height .6s ease, background .4s; padding:0; font:inherit; cursor:default; }
.mf6-bar.tap{ cursor:pointer; } .mf6-bar.gap{ border:0; background:transparent; }
.mf6-bar span{ position:absolute; bottom:100%; left:50%; transform:translateX(-50%); font-size:.78rem; color:var(--ink); white-space:nowrap; line-height:1.4; }
.mf6-bar.hi{ background:color-mix(in srgb, var(--pen) 40%, var(--paper)); border-color:var(--pen); }
.mf6-hx{ display:flex; gap:2px; padding:3px 2px 0; } .mf6-hx span{ flex:1 1 0; min-width:0; text-align:center; font-size:.76rem; color:var(--graphite); white-space:pre-line; line-height:1.15; }
.mf6-ttl{ text-align:center; font-size:.8rem; color:var(--graphite); margin:4px 0 0; }
.mf6-tw{ max-width:100%; margin:8px auto 0; display:flex; justify-content:center; }
.mf6-tbl{ border-collapse:collapse; font-size:.8rem; color:var(--ink); font-variant-numeric:tabular-nums; }
.mf6-tbl th, .mf6-tbl td{ border:1px solid var(--line); padding:3px 5px; text-align:center; background:var(--paper); transition:background .4s; }
.mf6-tbl th{ font-weight:600; }
.mf6-tbl tr.on td{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.mf6-tbl td.lo{ color:var(--pen); font-weight:700; }
.mf6-tbl td.grp{ background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); font-weight:600; }
.mf6-tbl tr.tot td{ font-weight:700; }
.mf6-tbl .fix{ color:var(--pen); font-weight:700; }
.mf6-tbl td.dim{ color:var(--faint); }
.mf6-eq{ text-align:center; font:600 .84rem/1.5 var(--mono); color:var(--ink); margin:8px auto 0; max-width:520px; overflow-wrap:anywhere; }
.mf6-verd{ margin:8px auto 0; max-width:420px; text-align:center; padding:7px 10px; border-radius:10px; border:2px solid var(--pen); color:var(--ink); font-size:.88rem; font-weight:600; }
.mf6-verd.ok{ border-color:var(--ok); }
.mf6-row{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; margin:8px 0 0; font-size:.86rem; color:var(--ink); }
.mf6-row input[type=range]{ flex:1 1 120px; min-width:0; max-width:260px; accent-color:var(--fig-k); }
.mf6-row b{ font-variant-numeric:tabular-nums; }
.mf6-ins{ margin:8px auto 0; max-width:440px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font-size:.84rem; color:var(--ink); line-height:1.5; font-variant-numeric:tabular-nums; }
.mf6-chips{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; max-width:520px; margin:0 auto; }
.mf6-chip{ font:500 .8rem/1.3 var(--mono); padding:2px 5px; border-radius:6px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:background .3s, box-shadow .3s; }
.mf6-chip small{ font-size:.76rem; color:var(--graphite); margin-right:3px; }
.mf6-chip.on{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.mf6-leg{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.82rem; color:var(--ink); margin-top:6px; }
.mf6-leg i{ display:inline-block; width:16px; height:4px; border-radius:2px; vertical-align:middle; margin-right:5px; }
.mf6-grid2{ display:grid; grid-template-columns:auto 1fr 1fr; gap:4px; max-width:420px; margin:0 auto; font-size:.84rem; color:var(--ink); }
.mf6-grid2 > div{ display:grid; place-items:center; text-align:center; padding:6px 4px; font-weight:600; }
.mf6-grid2 button{ font:inherit; font-size:.82rem; line-height:1.3; border:2px solid var(--line); border-radius:10px; background:var(--paper); color:var(--ink); padding:8px 6px; cursor:pointer; min-height:64px; transition:border-color .3s, background .3s; }
.mf6-grid2 button.good.on{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.mf6-grid2 button.err.on{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 14%, var(--paper)); }
.mf6-ta{ width:100%; max-width:420px; box-sizing:border-box; font:500 .86rem/1.4 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; }
.mf6 svg .mf6-draw{ stroke-dasharray:1; stroke-dashoffset:1; animation:mf6draw 1.3s ease forwards; }
@keyframes mf6draw{ to{ stroke-dashoffset:0; } }
.mf6 svg .mf6-dot{ animation:mf6pop .45s ease both; transform-box:fill-box; transform-origin:center; }
@keyframes mf6pop{ from{ opacity:0; transform:scale(.2); } to{ opacity:1; transform:scale(1); } }
.mf6 svg .mf6-late{ animation:mf6fade .6s ease both; }
@keyframes mf6fade{ from{ opacity:0; } to{ opacity:1; } }
@media (prefers-reduced-motion: reduce){ .mf6 svg .mf6-draw{ animation:none; stroke-dashoffset:0; } .mf6 svg .mf6-dot, .mf6 svg .mf6-late{ animation:none; } .mf6-bar, .mf6-box{ transition:none; } }`;
  if (!document.getElementById('mf6-css')) { const s = document.createElement('style'); s.id = 'mf6-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── shared helpers ── */
  const L = s => `<span class="ltr">${s}</span>`;
  const fx = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toFixed(d);
  const Tabs = ({ list, v, set }) => html`<div className="mf6-tabs" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(v === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  function frame(xr, yr, o = {}) {
    const W = o.W || 300, H = o.H || 220, m = { l: o.l == null ? 42 : o.l, r: o.r == null ? 12 : o.r, t: o.t == null ? 26 : o.t, b: o.b == null ? 30 : o.b };
    const X = v => m.l + (v - xr[0]) / (xr[1] - xr[0]) * (W - m.l - m.r), Y = v => H - m.b - (v - yr[0]) / (yr[1] - yr[0]) * (H - m.t - m.b);
    return { W, H, m, X, Y };
  }
  const Axes = ({ f, xt = [], yt = [], xf = String, yf = String, xl, yl, grid = true }) => html`<g>
    ${grid && yt.map(v => html`<line key=${'g' + v} x1=${f.m.l} x2=${f.W - f.m.r} y1=${f.Y(v)} y2=${f.Y(v)} stroke="var(--line)" strokeWidth="1" />`)}
    <line x1=${f.m.l} x2=${f.W - f.m.r} y1=${f.H - f.m.b} y2=${f.H - f.m.b} stroke="var(--graphite)" strokeWidth="1.5" />
    <line x1=${f.m.l} x2=${f.m.l} y1=${f.m.t - 8} y2=${f.H - f.m.b} stroke="var(--graphite)" strokeWidth="1.5" />
    ${xt.map(v => html`<text key=${'x' + v} x=${f.X(v)} y=${f.H - f.m.b + 17} textAnchor="middle" fontSize="15">${xf(v)}</text>`)}
    ${yt.map(v => html`<text key=${'y' + v} x=${f.m.l - 5} y=${f.Y(v) + 5} textAnchor="end" fontSize="15">${yf(v)}</text>`)}
    ${xl && html`<text x=${f.W - f.m.r} y=${f.H - 3} textAnchor="end" fontSize="15" style=${{ fill: 'var(--graphite)' }}>${xl}</text>`}
    ${yl && html`<text x=${f.m.l + 6} y=${f.m.t - 10} fontSize="15" style=${{ fill: 'var(--graphite)' }}>${yl}</text>`}
  </g>`;
  // HTML histogram: v values, max for the scale, lab labels under bars; top shows the value on the bar
  const Hist = ({ v, max, lab, top = true, hi = [], grow = true, pick, gapZero = false, delay = 0 }) => html`<div className="mf6-hist">
    <div className="mf6-hb">${v.map((x, j) => html`<button key=${j} type="button" tabIndex=${pick ? 0 : -1} className=${'mf6-bar' + (hi.includes(j) ? ' hi' : '') + (pick ? ' tap' : '') + (gapZero && !x ? ' gap' : '')}
      style=${{ height: (grow ? x / max * 100 : 0) + '%', transitionDelay: delay ? (j * delay) + 'ms' : '0ms' }} onClick=${pick ? () => pick(j) : null} aria-label=${lab[j] ? lab[j] + ': ' + x : String(x)}>${top && grow && html`<span>${x}</span>`}</button>`)}</div>
    <div className="mf6-hx" aria-hidden="true">${lab.map((t, j) => html`<span key=${j}>${t}</span>`)}</div></div>`;
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function ninv(p) {
    const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.3577518672690, -30.66479806614716, 2.506628277459239], b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572],
      c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783], d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    const tail = q => (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    if (p < 0.02425) return tail(Math.sqrt(-2 * Math.log(p)));
    if (p > 1 - 0.02425) return -tail(Math.sqrt(-2 * Math.log(1 - p)));
    const q = p - .5, r = q * q; return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const path = (pts) => pts.map((p, j) => (j ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const corr = (a, b) => { const n = a.length, ma = a.reduce((s, x) => s + x, 0) / n, mb = b.reduce((s, x) => s + x, 0) / n; let sab = 0, saa = 0, sbb = 0; for (let j = 0; j < n; j++) { sab += (a[j] - ma) * (b[j] - mb); saa += (a[j] - ma) ** 2; sbb += (b[j] - mb) ** 2; } return sab / Math.sqrt(saa * sbb); };

  /* ── [1.2]–[1.3] slide 5: Raw Data → Input Data → Simulation → Output, and GIGO ── */
  const GIGO = [
    { en: 'Input modeling starts from <b>Raw Data</b> collected from the real system.', ar: 'الـ input modeling بيبدأ من الـ <b>Raw Data</b> اللي بنجمعها من الـ system الحقيقي.' },
    { en: 'The raw data are turned into <b>Input Data</b> for the model, e.g. the distributions of time between arrivals and service times.', ar: 'الـ raw data دي بتتحول لـ <b>Input Data</b> للـ model، زي توزيع الـ time between arrivals والـ service times.' },
    { en: 'The input data drive the <b>System Performance Simulation</b>: input models provide the driving force for a simulation model.', ar: 'الـ input data هي اللي بتشغّل الـ <b>System Performance Simulation</b>، لأن الـ input models هي الـ driving force بتاعة الـ simulation model.' },
    { en: 'The simulation gives the <b>Output</b>. Its quality is <b>no better</b> than the quality of the inputs.', ar: 'الـ simulation بتطلّع الـ <b>Output</b>، وجودته <b>عمرها ما هتبقى أحسن</b> من جودة الـ inputs.' },
    { en: '<b>GIGO: Garbage-In-Garbage-Out.</b> If the input data are inaccurately collected, inappropriately analyzed or not representative of the environment, the results can be misleading even when the model structure is valid.', ar: 'ده معنى الـ <b>GIGO</b> يعني <b><bdi dir="ltr">Garbage-In-Garbage-Out</bdi></b>. لو الـ input data اتجمعت غلط أو اتحللت بطريقة مش مناسبة أو مش ممثلة للبيئة، النتايج ممكن تضلّلنا حتى لو الـ model structure نفسه valid.' }
  ];
  function Gigo({ ar }) {
    const [i, ctl] = useSteps(GIGO.length, 2600), bad = i === 4;
    const B = [['cloud', 'Raw Data'], ['doc', 'Input Data'], ['proc', 'System Performance Simulation'], ['cyl', 'Output']];
    return html`<figure className="fig mf6"><div className="fig-stage"><div className=${'mf6-flow' + (bad ? ' bad' : '')}>
      ${B.map(([k, t], j) => html`<${React.Fragment} key=${k}>${j > 0 && html`<div className=${'mf6-arr' + (i >= j ? ' on' : '')} aria-hidden="true"><span className="mf6-h">→</span><span className="mf6-v">↓</span></div>`}
        <div className=${'mf6-box mf6-' + k + (i >= j ? ' on' : '') + (i === j ? ' cur' : '')}>${t}${bad && j === 0 && html`<small>inaccurately collected · inappropriately analyzed · not representative</small>`}${bad && j === 3 && html`<small>misleading results</small>`}</div><//>`)}
    </div></div>
      <${Cap} ...${GIGO[i]} showAr=${ar} /><${Bar} steps=${GIGO} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.5] slide 9: same data with different interval sizes ── */
  const W9 = [
    { v: [5, 10, 11, 6, 8, 9, 7, 10, 8, 12, 14], lab: ['0', '', '4', '', '8', '', '12', '', '16', '', '20'], max: 15,
      en: 'The same 100 values on 0 to 20. Narrow intervals of <b>width 2</b>: <b>11 bars</b> of uneven height (about 5, 10, 11, 6, 8, 9, 7, 10, 8, 12, 14). The histogram looks <b>ragged</b>.',
      ar: 'نفس الـ 100 قيمة من 0 لـ 20. بـ intervals ضيقة <b>عرضها 2</b> بيطلع <b>11 bar</b> أطوالهم مش منتظمة، فالـ histogram شكله <b>ragged</b>.' },
    { v: [26, 14, 16, 18, 26], lab: ['4', '8', '12', '16', '20'], max: 30,
      en: 'Intervals of <b>width 4</b>: the same data in <b>5 bars</b> (about 26, 14, 16, 18, 26).',
      ar: 'بـ intervals <b>عرضها 4</b> نفس الـ data بتبقى <b>5 bars</b> بس.' },
    { v: [36, 30, 34], lab: ['7', '14', '20'], max: 40,
      en: 'Intervals of width about <b>7</b>: only <b>3 bars</b> (about 36, 30, 34), which look almost <b>flat</b>. The shape you see depends on the interval width.',
      ar: 'بـ intervals عرضها حوالي <b>7</b> بيبقى فيه <b>3 bars</b> بس وشكلهم تقريباً <b>flat</b>. يعني الشكل اللي بتشوفه بيعتمد على عرض الـ interval.' }
  ];
  function HistWidths({ ar }) {
    const [i, ctl] = useSteps(W9.length, 3000), s = W9[i];
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Hist} key=${i} v=${s.v} max=${s.max} lab=${s.lab} />
      <p className="mf6-ttl">frequency of the same 100 values · ${s.v.length} intervals</p></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${W9} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.8] Fig 6.1 of the notes: ragged, coarse and appropriate histograms (heights as drawn) ── */
  const F61 = [
    { v: [1, 0, 1, 1, 3, 1, 1.8, 1, 5, 2.7, 5, 3.8, 6, 1, 0, 0, 1.7, 1.7, 1, 0, 0, 0, 0, 0, 1], lab: Array.from({ length: 25 }, (_, j) => j % 4 === 0 ? String(j) : ''), max: 7,
      en: '(a) Original data in cells of <b>width 1</b> from 0 to 24: <b>too ragged</b>. The intervals are too narrow.', ar: 'في الرسمة (a) الـ data الأصلية في cells <b>عرضها 1</b> من 0 لـ 24، والنتيجة <b>ragged قوي</b> لأن الـ intervals ضيقة أوي.' },
    { v: [10.5, 23, 6.5], lab: ['0-7', '8-15', '16-23'], max: 24,
      en: '(b) Adjacent cells combined into <b>0-7, 8-15, 16-23</b>: <b>too coarse</b> (blocky). The intervals are too wide.', ar: 'في الرسمة (b) لما نجمع الـ cells اللي جنب بعض في 3 cells بس الشكل بيبقى <b>coarse قوي</b> (blocky)، لأن الـ intervals واسعة أوي.' },
    { v: [2, 5, 7.5, 10, 6.6, 5, 1, 1], lab: ['0-\n2', '3-\n5', '6-\n8', '9-\n11', '12-\n14', '15-\n17', '18-\n20', '21-\n24'], max: 12,
      en: '(c) Cells combined in threes (0-2, 3-5, …, 21-24): <b>appropriate</b>, a smooth single-peaked shape.', ar: 'في الرسمة (c) لما نجمع كل 3 cells مع بعض الشكل بيبقى <b>appropriate</b>، يعني ناعم وليه peak واحدة.' }
  ];
  function HistCells({ ar }) {
    const [i, ctl] = useSteps(F61.length, 3000), s = F61[i];
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Hist} key=${i} v=${s.v} max=${s.max} lab=${s.lab} top=${false} gapZero=${true} />
      <p className="mf6-ttl">frequency · bar heights as drawn in Fig 6.1</p></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${F61} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.2] slide 10: vehicle arrivals histogram, one cell per value ── */
  const VF = [12, 10, 19, 17, 10, 8, 7, 5, 5, 3, 3, 1];
  function useGrow() { const [g, setG] = useState(calm()); useEffect(() => { if (g) return; const t = setTimeout(() => setG(true), 80); return () => clearTimeout(t); }, [g]); return [g, () => { if (!calm()) setG(false); }]; }
  function VehicleHist({ ar }) {
    const [g, replay] = useGrow(), [sel, setSel] = useState(null);
    const en = sel == null ? 'Vehicles arriving at an intersection between 7:00 and 7:05 am on <b>100 workdays</b>. The data are discrete and ample, so there is <b>one cell for each value</b> 0 to 11. The bars rise to a peak of 19 at 2, then fall to 1 at 11 (right-skewed). Tap a bar.'
      : `<b>${VF[sel]}</b> of the 100 periods had <b>${sel}</b> arrival${sel === 1 ? '' : 's'}.`;
    const a = sel == null ? 'دي عربيات بتوصل لتقاطع من الساعة 7 الصبح لحد خمس دقايق بعدها على مدار <b>100 يوم شغل</b>. الـ data دي discrete وكتير، فبنعمل <b>cell لكل قيمة</b> من 0 لـ 11. الـ bars بتعلى لحد peak عند 2 وبعدين بتنزل (right-skewed). دوس على أي bar.'
      : `عدد الفترات اللي جالها <b>${sel}</b> عربية هو <b>${VF[sel]}</b> من الـ 100.`;
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Hist} v=${VF} max=${20} lab=${VF.map((_, j) => String(j))} grow=${g} delay=${70} hi=${sel == null ? [] : [sel]} pick=${setSel} />
      <p className="mf6-ttl">arrivals per period (x) · frequency on each bar</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setSel(null); replay(); }}>↻ Replay</button></div></figure>`;
  }

  /* ── [3.4]–[3.6] slide 11 / Table 6.2: chip life in intervals of 3 days ── */
  const LIFE = [79.919, 3.081, 0.062, 1.961, 5.845, 3.027, 6.505, 0.021, 0.013, 0.123, 6.769, 59.899, 1.192, 34.760, 5.009, 18.387, 0.141, 43.565, 24.420, 0.433, 144.695, 2.663, 17.967, 0.091, 9.003, 0.941, 0.878, 3.371, 2.157, 7.579, 0.624, 5.380, 3.148, 7.078, 23.960, 0.590, 1.928, 0.300, 0.002, 0.543, 7.004, 31.764, 1.005, 1.147, 0.219, 3.217, 14.382, 1.008, 2.336, 4.562];
  const TAB62 = (() => { const t = Array(49).fill(0); [[0, 23], [1, 10], [2, 5], [3, 1], [4, 1], [5, 2], [7, 1], [8, 1], [10, 1], [11, 1], [14, 1], [19, 1], [26, 1], [48, 1]].forEach(([k, n]) => t[k] = n); return t; })();
  const CNT62 = (() => { const t = Array(49).fill(0); LIFE.forEach(x => t[Math.floor(x / 3)]++); return t; })();
  function ChipHist({ ar }) {
    const [m, setM] = useState('tab'), v = m === 'tab' ? TAB62 : CNT62, diff = TAB62.map((x, j) => x !== CNT62[j]);
    const f = frame([0, 150], [0, 25], { b: 40, l: 34 });
    const en = m === 'tab' ? 'Chip lifetimes (days) at 1.5 times the nominal voltage, in intervals of <b>3 days</b>, as in the notes\' table: 23 in 0-3, then 10, 5, then bars of 1 or 2 scattered out to 144-147. A long right tail: the shape of an <b>exponential density</b>.'
      : 'Counting the 50 listed lifetimes gives <b>24</b> in 0-3, <b>9</b> in 3-6, <b>1</b> in 15-18 and <b>1</b> in 18-21 (17.967 and 18.387), not 23, 10, 2 and 0 (red bars). The exponential-like shape is the same.';
    const a = m === 'tab' ? 'دي أعمار الـ chips بالأيام عند 1.5 مرة من الـ nominal voltage، في intervals <b>عرضها 3 أيام</b> زي جدول الـ notes. فيه bar طويل في الأول وبعدين ذيل طويل ناحية اليمين، وده شكل الـ <b>exponential density</b>.'
      : 'لما نعدّ الـ 50 عمر اللي في الـ notes بنلاقي فروق في 4 intervals (الـ bars الحمرا)، وأرقامها مكتوبة تحت. بس الشكل الـ exponential زي ما هو.' + L('0-3: 24 · 3-6: 9 · 15-18: 1 · 18-21: 1');
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Tabs} list=${[['tab', 'Table in the notes'], ['cnt', 'Counted from the 50 lifetimes']]} v=${m} set=${setM} />
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Histogram of chip life in 3-day intervals">
        <${Axes} f=${f} xt=${[0, 30, 60, 90, 120, 150]} yt=${[0, 10, 20]} xl="chip life (days)" yl="frequency" />
        ${v.map((n, j) => n > 0 && html`<rect key=${m + j} x=${f.X(j * 3)} y=${f.Y(n)} width=${f.X(3) - f.X(0)} height=${f.Y(0) - f.Y(n)} fill=${m === 'cnt' && diff[j] ? 'color-mix(in srgb, var(--pen) 45%, var(--paper))' : 'color-mix(in srgb, var(--fig-k) 40%, var(--paper))'} stroke=${m === 'cnt' && diff[j] ? 'var(--pen)' : 'var(--fig-k)'} strokeWidth="1" />`)}
        ${v.map((n, j) => n >= 5 && html`<text key=${'t' + m + j} x=${f.X(j * 3 + 1.5) + (j ? 4 : 0)} y=${f.Y(n) - 4} textAnchor=${j ? 'start' : 'middle'} fontSize="15">${n}</text>`)}
      </svg></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [3.7] slide 12: histograms of normData with 5 to 200 bins (a generated normal sample) ── */
  const NORM = (() => { const r = rng(6), out = []; while (out.length < 10000) { const u1 = r() || 1e-9, u2 = r(), R = Math.sqrt(-2 * Math.log(u1)); out.push(R * Math.cos(2 * Math.PI * u2), R * Math.sin(2 * Math.PI * u2)); } return out; })();
  const BINS = [5, 10, 20, 50, 100, 200];
  const BIN_TXT = {
    5: ['With <b>5 bins</b> the shape is a blocky step.', 'بـ <b>5 bins</b> الشكل بيبقى درجات blocky.'],
    10: ['With <b>10 bins</b> the bell shape starts to show.', 'بـ <b>10 bins</b> شكل الـ bell بيبدأ يبان.'],
    20: ['With <b>20 bins</b> the bell shape is clear.', 'بـ <b>20 bins</b> شكل الـ bell واضح.'],
    50: ['With <b>50 bins</b> the bell is still clear and smoother.', 'بـ <b>50 bins</b> الـ bell لسه واضح وأنعم.'],
    100: ['With <b>100 bins</b> the bars get thin and jagged.', 'بـ <b>100 bins</b> الـ bars بقت رفيعة ومسننة.'],
    200: ['With <b>200 bins</b> the bars are very thin and jagged. The number of bins changes how the same data look.', 'بـ <b>200 bins</b> الـ bars رفيعة جداً ومسننة. يعني عدد الـ bins بيغيّر شكل نفس الـ data.']
  };
  const BSTEPS = BINS.map(k => ({ en: BIN_TXT[k][0] + ' (A generated normal sample of 10,000 values centred at 0, like the slide\'s normData.)', ar: BIN_TXT[k][1] + ' (دي عينة normal متولّدة فيها 10 آلاف قيمة حوالين الـ 0 زي الـ normData اللي في الـ slide.)' }));
  function HistBins({ ar }) {
    const [i, ctl] = useSteps(BINS.length, 2200), k = BINS[i];
    const cnt = Array(k).fill(0), w = 8 / k; NORM.forEach(x => { const j = Math.floor((x + 4) / w); if (j >= 0 && j < k) cnt[j]++; });
    const mx = Math.max(...cnt), top = Math.ceil(mx * 1.08 / 10 ** Math.floor(Math.log10(mx))) * 10 ** Math.floor(Math.log10(mx));
    const f = frame([-4, 4], [0, top], { b: 40, l: 48 });
    return html`<figure className="fig mf6"><div className="fig-stage">
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label=${'Histogram of a normal sample with ' + k + ' bins'}>
        <${Axes} f=${f} xt=${[-4, -2, 0, 2, 4]} yt=${[0, top / 2, top]} xl=${'#bins ' + k} yl="frequency" />
        ${cnt.map((n, j) => html`<rect key=${k + '-' + j} x=${f.X(-4 + j * w)} y=${f.Y(n)} width=${Math.max(.6, f.X(w) - f.X(0))} height=${f.Y(0) - f.Y(n)} fill="color-mix(in srgb, var(--fig-k) 40%, var(--paper))" stroke=${k <= 50 ? 'var(--fig-k)' : 'none'} strokeWidth=".8" />`)}
      </svg>
      <div className="mf6-tabs" style=${{ marginTop: '8px' }}>${BINS.map((b, j) => html`<button key=${b} className="fig-btn" aria-pressed=${String(j === i)} onClick=${() => ctl.go(j)}>${b}</button>`)}</div></div>
      <${Cap} ...${BSTEPS[i]} showAr=${ar} /><${Bar} steps=${BSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.1] slide 14 and [5.3] slide 15: scatter diagrams (points read from the slides) ── */
  const P = (ys) => ys.map((y, x) => [x, y]);
  const SC = {
    strong: { t: 'Strong correlation', y: 35, yt: [0, 10, 20, 30], pts: P([0, 2, 5, 4.5, 5.5, 5.5, 8, 9, 8, 9, 12, 14, 14, 15, 16, 17.5, 18.5, 20, 18, 22, 21.5, 24, 23, 24.5, 26, 27, 28, 29.5, 29, 30.5, 31.5]),
      en: '<b>Strong correlation</b>: the points lie very close to a rising straight line from (0, 0) to about (30, 31).', ar: 'الـ <b>Strong correlation</b> معناها إن النقط قريبة جداً من خط مستقيم طالع.' },
    moderate: { t: 'Moderate correlation', y: 60, yt: [0, 20, 40, 60], pts: P([12, 15, 19, 5, 10, 11, 11, 21, 15, 12, 29, 26, 26, 32, 22, 19, 22, 21, 37, 25, 26, 33, 41, 27, 27, 27, 47, 37, 47, 43, 36]),
      en: '<b>Moderate correlation</b>: the points rise from about 10 to 45 but are spread widely around the trend.', ar: 'الـ <b>Moderate correlation</b> معناها إن النقط طالعة بس متفرقة كتير حوالين الاتجاه.' },
    none: { t: 'No correlation', y: 35, yt: [0, 10, 20, 30], pts: P([0, 29, 18, 20, 20, 29, 22, 13, 17, 17, 30, 20, 0, 30, 13, 12, 4, 9, 12, 30, 0, 13, 23, 29, 28, 21, 25, 15, 7, 25, 11]),
      en: '<b>No correlation</b>: the points are scattered all over 0 to 30 with no pattern.', ar: 'الـ <b>No correlation</b> معناها إن النقط متبعترة في كل حتة من غير أي pattern.' },
    pos: { t: 'Positive correlation', y: 35, yt: [0, 10, 20, 30], line: true, pts: P([4.5, 4, 5, 7.5, 5.5, 5, 6, 9, 13.5, 11.5, 14.5, 17, 17.5, 16, 15, 15.5, 19.5, 18, 19, 21.5, 24, 25, 26.5, 24, 28, 31, 29, 28, 32, 33, 30.5]),
      en: '<b>Positive correlation</b>: points rise from about 4 at x = 0 to about 31 at x = 30. For a linear relationship: <b>correlation</b> measures how well the data line up, the <b>slope</b> measures the steepness, the <b>direction</b> here is up, and the line meets the y-axis at the <b>Y intercept</b>.',
      ar: 'الـ <b>Positive correlation</b> معناها إن النقط طالعة مع الـ x. وفي الـ linear relationship عندنا الـ <b>correlation</b> بتقيس النقط متراصة على خط قد إيه، والـ <b>slope</b> بيقيس الميل، والـ <b>direction</b> هنا لفوق، والخط بيقابل محور الـ y عند الـ <b>Y intercept</b>.' },
    neg: { t: 'Negative correlation', y: 40, yt: [0, 10, 20, 30, 40], line: true, pts: P([35, 35, 32, 34.5, 30, 28.5, 34, 27, 28.5, 27.5, 29, 25.5, 26, 20, 24, 22.5, 19.5, 19.5, 20, 20.5, 14, 12.5, 17.5, 11, 12, 11, 9.5, 6.5, 8, 8, 4]),
      en: '<b>Negative correlation</b>: points fall from about 35 at x = 0 to about 4 at x = 30. The <b>direction</b> is down (negative slope), with a high <b>Y intercept</b>.',
      ar: 'الـ <b>Negative correlation</b> معناها إن النقط نازلة كل ما الـ x يزيد. الـ <b>direction</b> هنا لتحت (slope سالب) والـ <b>Y intercept</b> عالي.' }
  };
  function makeScatter(keys) {
    const steps = keys.map(k => ({ en: SC[k].en, ar: SC[k].ar }));
    return function Scatter({ ar }) {
      const [i, ctl] = useSteps(keys.length, 3600), k = keys[i], s = SC[k];
      const f = frame([0, 32], [0, s.y], { b: 40, l: 34 });
      let ln = null;
      if (s.line) { const xs = s.pts.map(p => p[0]), ys = s.pts.map(p => p[1]), n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
        const sl = xs.reduce((a, x, j) => a + (x - mx) * (ys[j] - my), 0) / xs.reduce((a, x) => a + (x - mx) ** 2, 0), b0 = my - sl * mx; ln = [b0, b0 + sl * 31]; }
      return html`<figure className="fig mf6"><div className="fig-stage">
        <div className="mf6-tabs">${keys.map((kk, j) => html`<button key=${kk} className="fig-btn" aria-pressed=${String(j === i)} onClick=${() => ctl.go(j)}>${SC[kk].t}</button>`)}</div>
        <svg key=${k} viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label=${s.t + ' scatter diagram'}>
          <${Axes} f=${f} xt=${[0, 10, 20, 30]} yt=${s.yt} xl="X (Data 1)" yl="Y (Data 2)" />
          ${s.pts.map((p, j) => html`<circle key=${j} className="mf6-dot" style=${{ animationDelay: (j * 35) + 'ms' }} cx=${f.X(p[0])} cy=${f.Y(p[1])} r="4.2" fill="var(--fig-k)" stroke="var(--paper)" strokeWidth="1" />`)}
          ${ln && html`<g className="mf6-late" style=${{ animationDelay: '1.3s' }}>
            <line x1=${f.X(0)} y1=${f.Y(ln[0])} x2=${f.X(31)} y2=${f.Y(ln[1])} stroke="var(--pen)" strokeWidth="2.5" />
            <circle cx=${f.X(0)} cy=${f.Y(ln[0])} r="6" fill="none" stroke="var(--pen)" strokeWidth="2.5" />
            <text x=${k === 'pos' ? f.X(1.5) : f.X(12)} y=${k === 'pos' ? f.Y(ln[0]) - 10 : f.Y(38)} fontSize="15" fontWeight="600" style=${{ fill: 'var(--pen)' }}>Y intercept</text></g>`}
        </svg></div>
        <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
    };
  }
  const ScatterCorr = makeScatter(['strong', 'moderate', 'none']), ScatterDir = makeScatter(['pos', 'neg']);

  /* ── [6.2] slide 17: exponential, normal and the two β curve families ── */
  const COL = ['var(--fig-k)', 'var(--pen)', 'var(--ok)', 'var(--graphite)'];
  const curve = (f, fn, a, b, cap) => { const pts = []; for (let j = 0; j <= 160; j++) { const x = a + (b - a) * j / 160; let y = fn(x); if (!isFinite(y) || y > cap) y = cap; pts.push([f.X(x), f.Y(y)]); } return path(pts); };
  const FAM = [
    { k: 'exp', t: 'Exponential', en: '<b>Easier to analyze</b>: the <b>exponential</b> density starts at height λ at x = 0 and decays.', ar: 'ده من الـ <b>Easier to analyze</b>. الـ <b>exponential</b> density بتبدأ عند ارتفاع λ في أول المحور وبعدين بتقل.' },
    { k: 'norm', t: 'Normal', en: '<b>Easier to analyze</b>: the bell-shaped <b>normal</b> density centred at μ. (Exponential, normal and Poisson are the easier ones.)', ar: 'ده كمان من الـ <b>Easier to analyze</b>. الـ <b>normal</b> density شكلها bell ومتمركزة عند μ. والـ exponential والـ normal والـ Poisson هما الأسهل.' },
    { k: 'gam', t: 'β = 1, 2, 3', en: '<b>Difficult to analyze</b> (Beta, Gamma and Weibull): the first family on the slide, curves labelled β = 1, 2, 3. The shape parameter β changes the curve from decaying (β = 1) to peaked. The slide does not name the family.', ar: 'ده من الـ <b>Difficult to analyze</b> (الـ Beta والـ Gamma والـ Weibull). دي أول عيلة منحنيات في الـ slide، والـ shape parameter β بيغيّر المنحنى من نازل (لما الـ β قيمتها 1) لمنحنى ليه peak. والـ slide مش كاتبة اسم العيلة.' },
    { k: 'wei', t: 'β = ½, 1, 2, 4', en: 'The second family on the slide, curves labelled β = ½, 1, 2, 4: from a curve that shoots up at 0 to a sharp peak. The slide does not name it either. The notes add that gamma and Weibull give a <b>wide array of shapes</b>, which is why they are harder to analyze. ‡ (lecture notes)', ar: 'دي تاني عيلة في الـ slide، ومنحنياتها من منحنى بيطلع لفوق عند الـ 0 لحد peak حادة، والـ slide برضه مش كاتبة اسمها. والـ notes بتقول إن الـ gamma والـ Weibull بيدّوا <b>أشكال كتير</b> وعشان كده أصعب في التحليل. ‡ (من الـ lecture notes)' }
  ];
  function Families({ ar }) {
    const [i, ctl] = useSteps(FAM.length, 3400), s = FAM[i];
    let body, leg = null;
    if (s.k === 'exp') { const f = frame([0, 5], [0, 1.15], { b: 34, l: 30 });
      body = html`<g><${Axes} f=${f} grid=${false} xl="x" yl="f(x)" /><text x=${f.m.l - 6} y=${f.Y(1) + 5} textAnchor="end" fontSize="17">λ</text><text x=${f.m.l} y=${f.H - f.m.b + 18} textAnchor="middle" fontSize="15">0</text>
        <path className="mf6-draw" pathLength="1" d=${curve(f, x => Math.exp(-x), 0, 5, 2)} fill="none" stroke="var(--fig-k)" strokeWidth="3" /></g>`; }
    else if (s.k === 'norm') { const f = frame([-3.5, 3.5], [0, .45], { b: 34, l: 16 });
      body = html`<g><${Axes} f=${f} grid=${false} yl="f(x)" /><line x1=${f.X(0)} x2=${f.X(0)} y1=${f.Y(0)} y2=${f.Y(.42)} stroke="var(--graphite)" strokeWidth="1.5" /><text x=${f.X(0)} y=${f.H - f.m.b + 20} textAnchor="middle" fontSize="17">μ</text>
        <path className="mf6-draw" pathLength="1" d=${curve(f, x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI), -3.5, 3.5, 2)} fill="none" stroke="var(--fig-k)" strokeWidth="3" /></g>`; }
    else if (s.k === 'gam') { const f = frame([0, 3], [0, 1], { b: 34 }), B = [1, 2, 3], G = [1, 1, 2];
      body = html`<g><${Axes} f=${f} xt=${[0, 1, 2, 3]} yt=${[0, .5, 1]} yf=${v => v.toFixed(1)} yl="f(x)" xl="x" />
        ${B.map((b, j) => html`<path key=${b} className="mf6-draw" style=${{ animationDelay: (j * .5) + 's' }} pathLength="1" d=${curve(f, x => b / G[j] * (b * x) ** (b - 1) * Math.exp(-b * x), 0, 3, 1)} fill="none" stroke=${COL[j]} strokeWidth="3" />`)}</g>`;
      leg = B.map((b, j) => html`<span key=${b}><i style=${{ background: COL[j] }}></i>β = ${b}</span>`); }
    else { const f = frame([0, 3], [0, 2], { b: 34 }), B = [.5, 1, 2, 4];
      body = html`<g><${Axes} f=${f} xt=${[0, 1, 2, 3]} yt=${[0, 1, 2]} yl="f(x)" xl="x" />
        ${B.map((b, j) => html`<path key=${b} className="mf6-draw" style=${{ animationDelay: (j * .5) + 's' }} pathLength="1" d=${curve(f, x => b * Math.pow(x, b - 1) * Math.exp(-Math.pow(x, b)), 0.0005, 3, 2)} fill="none" stroke=${COL[j]} strokeWidth="3" />`)}</g>`;
      leg = B.map((b, j) => html`<span key=${b}><i style=${{ background: COL[j] }}></i>β = ${b === .5 ? '½' : b}</span>`); }
    return html`<figure className="fig mf6"><div className="fig-stage">
      <div className="mf6-tabs">${FAM.map((x, j) => html`<button key=${x.k} className="fig-btn" aria-pressed=${String(j === i)} onClick=${() => ctl.go(j)}>${x.t}</button>`)}</div>
      <svg key=${s.k} viewBox="0 0 300 220" role="img" aria-label=${s.t + ' density'}>${body}</svg>
      ${leg && html`<div className="mf6-leg">${leg}</div>`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${FAM} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [7.5]–[7.6] Example 6.3: normal Q-Q plot of the door installation times ── */
  const QQ = [99.79, 99.56, 100.17, 100.33, 100.26, 100.41, 99.98, 99.83, 100.23, 100.27, 100.02, 100.47, 99.55, 99.62, 99.65, 99.82, 99.96, 99.90, 100.06, 99.85];
  const QS = QQ.slice().sort((a, b) => a - b), QP = QS.map((_, j) => (j + .5) / 20), QF = QP.map(p => 99.99 + 0.2832 * ninv(p));
  const QSTEPS = [
    { en: 'Example 6.3: 20 door installation times (seconds) by a robot, as recorded. Sample mean <b>99.99 s</b>, sample variance <b>(0.2832)² s²</b>.', ar: 'ده مثال 6.3 وفيه 20 وقت لتركيب الأبواب بالثواني زي ما اتسجلوا. الـ sample mean بيساوي <b>99.99</b> ثانية والـ standard deviation بيساوي <b>0.2832</b>.' },
    { en: 'Sort them: y₁ = 99.55 ≤ y₂ = 99.56 ≤ … ≤ y₂₀ = 100.47. The rank j is 1 for the smallest and 20 for the largest.', ar: 'بنرتبهم تصاعدي، والـ rank اللي اسمه j بيبقى 1 لأصغر قيمة و 20 لأكبر قيمة.' + L('y₁ = 99.55 ≤ y₂ = 99.56 ≤ … ≤ y₂₀ = 100.47') },
    { en: 'Each yⱼ estimates the <b>(j − ½)/n quantile</b>: (1 − ½)/20 = 0.025, (2 − ½)/20 = 0.075, …, (20 − ½)/20 = 0.975. Move the slider to see each j.', ar: 'كل yⱼ بيقدّر الـ <b>quantile</b> بتاع الكسر ده، وحرّك الـ slider عشان تشوف كل j.' + L('(j − ½)/n = 0.025, 0.075, …, 0.975') },
    { en: 'Find the normal quantile F⁻¹((j − ½)/20) with mean 99.99 and σ = 0.2832: about 99.43, 99.58, 99.66, …, 100.40, 100.55. (The notes\' Table 6.3 column lists (j − ½)/20 rounded, not these quantiles.)', ar: 'بنجيب الـ normal quantile بالـ mean 99.99 والـ σ اللي قيمتها 0.2832، والنتيجة تقريباً كده:' + L('F⁻¹((j − ½)/20) ≈ 99.43, 99.58, 99.66, …, 100.40, 100.55') + 'وخلي بالك إن عمود جدول 6.3 في الـ notes فيه الكسر نفسه مقرّب، مش الـ quantiles.' },
    { en: 'Plot yⱼ against F⁻¹((j − ½)/20). The points lie close to a <b>straight line of slope 1</b>, supporting a normal model with these parameters.', ar: 'بنرسم yⱼ قصاد الـ quantile. النقط قريبة من <b>خط مستقيم slope بتاعه 1</b>، وده بيدعم إن الـ normal model بالـ parameters دي مناسب.' },
    { en: 'The points never fall exactly on the line and scatter about it (they are ranked, so not independent). The extremes vary more, so bigger gaps there are acceptable: <b>linearity in the middle matters more</b>.', ar: 'النقط عمرها ما هتقع على الخط بالظبط وبتتبعتر حواليه لأنها مترتبة ومش independent. والأطراف الـ variance بتاعتها أكبر، فالفرق الكبير هناك مقبول، و<b>الأهم إن النص يبقى على خط مستقيم</b>.' }
  ];
  function QQPlot({ ar }) {
    const [i, ctl] = useSteps(QSTEPS.length, 3400), [j, setJ] = useState(7);
    const f = frame([99.4, 100.6], [99.4, 100.6], { l: 52, b: 40 });
    const ins = i >= 2 && html`<div className="mf6-row"><label htmlFor="mf6-qj">j = <b>${j}</b></label><input id="mf6-qj" type="range" min="1" max="20" value=${j} onInput=${e => setJ(+e.target.value)} aria-label="rank j" /></div>
      <div className="mf6-ins">yⱼ = <b>${QS[j - 1].toFixed(2)}</b> · (j − ½)/20 = <b>${QP[j - 1].toFixed(3)}</b>${i >= 3 ? html` · F⁻¹ = <b>${QF[j - 1].toFixed(2)}</b>` : ''}</div>`;
    return html`<figure className="fig mf6"><div className="fig-stage">
      ${i < 4 ? html`<div className="mf6-chips">${(i === 0 ? QQ : QS).map((v, k) => html`<span key=${k} className=${'mf6-chip' + (i >= 2 && k === j - 1 ? ' on' : '')}>${i >= 1 && html`<small>${k + 1}</small>`}${v.toFixed(2)}</span>`)}</div>`
        : html`<svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Normal Q-Q plot of the installation times">
          <${Axes} f=${f} xt=${[99.4, 99.8, 100.2, 100.6]} yt=${[99.4, 99.8, 100.2, 100.6]} xf=${v => v.toFixed(1)} yf=${v => v.toFixed(1)} xl="F⁻¹((j − ½)/20)" yl="yⱼ" />
          ${i === 5 && html`<rect x=${f.X(99.8)} y=${f.Y(100.2)} width=${f.X(100.2) - f.X(99.8)} height=${f.Y(99.8) - f.Y(100.2)} fill="color-mix(in srgb, var(--ok) 16%, transparent)" />`}
          <line className="mf6-late" x1=${f.X(99.4)} y1=${f.Y(99.4)} x2=${f.X(100.6)} y2=${f.Y(100.6)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="6 5" />
          ${QS.map((y, k) => html`<circle key=${k} className="mf6-dot" style=${{ animationDelay: (k * 60) + 'ms' }} cx=${f.X(QF[k])} cy=${f.Y(y)} r=${k === j - 1 ? 6.5 : 4.5} fill=${k === j - 1 ? 'var(--pen)' : 'var(--fig-k)'} stroke="var(--paper)" strokeWidth="1" />`)}
        </svg>`}
      ${ins}</div>
      <${Cap} ...${QSTEPS[i]} showAr=${ar} /><${Bar} steps=${QSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [9] slide 22: sample mean and variance of the vehicle data, then the Poisson curve ── */
  const PO = (() => { const p = []; let v = Math.exp(-3.64); for (let x = 0; x < 12; x++) { if (x) v *= 3.64 / x; p.push(v); } return p; })();
  const VSTEPS = [
    { en: 'The vehicle arrival table: X₁ = 0 with f₁ = 12, X₂ = 1 with f₂ = 10, … ; n = Σ fⱼ = <b>100</b> periods.', ar: 'ده جدول وصول العربيات، وكل قيمة Xⱼ معاها الـ frequency بتاعتها fⱼ، ومجموع الـ frequencies هو عدد الفترات.' + L('n = Σ fⱼ = 100') },
    { en: 'Multiply each value by its frequency and add: Σ fⱼXⱼ = <b>364</b>.', ar: 'بنضرب كل قيمة في الـ frequency بتاعتها ونجمع.' + L('Σ fⱼXⱼ = 364') },
    { en: 'Square each value, multiply by its frequency and add: Σ fⱼXⱼ² = <b>2080</b>.', ar: 'بنربّع كل قيمة ونضربها في الـ frequency ونجمع.' + L('Σ fⱼXⱼ² = 2080') },
    { en: 'Sample mean: X̄ = Σ fⱼXⱼ / n = 364 / 100 = <b>3.64</b>.', ar: 'الـ sample mean بيطلع كده:' + L('X̄ = 364 / 100 = 3.64') },
    { en: 'Sample variance: S² = (Σ fⱼXⱼ² − n X̄²) / (n − 1) = (2080 − 100 × 3.64²) / 99 = (2080 − 1324.96) / 99 = 755.04 / 99 = <b>7.63</b>.', ar: 'الـ sample variance بيطلع كده:' + L('S² = (2080 − 100 × 3.64²) / 99 = 755.04 / 99 = 7.63') },
    { en: 'The histogram suggests a <b>Poisson</b> distribution. The red curve is 100 · p(x) for a Poisson with α = 3.64; it peaks at about 21 near x = 3, higher than the bars there.', ar: 'الـ histogram بيقول إن التوزيع <b>Poisson</b>. المنحنى الأحمر هو 100 مضروبة في <bdi dir="ltr">p(x)</bdi> لـ Poisson بـ α قيمتها 3.64، والـ peak بتاعه حوالي 21 عند القيمة 3.' },
    { en: 'But X̄ = 3.64 is not equal to S² = 7.63, although for a Poisson μ = σ² = λ. Reason: <b>each estimator is a random variable</b>; it is not perfect.', ar: 'بس الـ mean مش بيساوي الـ variance، مع إن في الـ Poisson المفروض الـ mean يساوي الـ variance. والسبب إن <b>كل estimator هو random variable</b> ومش perfect.' + L('X̄ = 3.64 ≠ S² = 7.63,  μ = σ² = λ') }
  ];
  function VehicleEst({ ar }) {
    const [i, ctl] = useSteps(VSTEPS.length, 3000);
    let body;
    if (i < 5) {
      body = html`<div className="mf6-tw"><table className="mf6-tbl"><thead><tr><th>Xⱼ</th><th>fⱼ</th><th>fⱼXⱼ</th><th>fⱼXⱼ²</th></tr></thead><tbody>
        ${VF.map((fq, x) => html`<tr key=${x}><td>${x}</td><td>${fq}</td><td className=${i >= 1 ? '' : 'dim'}>${i >= 1 ? fq * x : '·'}</td><td className=${i >= 2 ? '' : 'dim'}>${i >= 2 ? fq * x * x : '·'}</td></tr>`)}
        <tr className="tot"><td>Σ</td><td>100</td><td>${i >= 1 ? 364 : ''}</td><td>${i >= 2 ? 2080 : ''}</td></tr></tbody></table></div>
        ${i >= 3 && html`<p className="mf6-eq">X̄ = 364 / 100 = 3.64</p>`}${i >= 4 && html`<p className="mf6-eq">S² = (2080 − 100·3.64²) / 99 = 7.63</p>`}`;
    } else {
      const f = frame([-.5, 11.5], [0, 25], { b: 40, l: 34 }), w = f.X(1) - f.X(0);
      body = html`<svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Vehicle histogram with the Poisson curve">
        <${Axes} f=${f} xt=${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} yt=${[0, 10, 20]} xl="arrivals per period" yl="frequency" />
        ${VF.map((n, x) => html`<rect key=${x} x=${f.X(x - .5)} y=${f.Y(n)} width=${w} height=${f.Y(0) - f.Y(n)} fill="color-mix(in srgb, var(--fig-k) 40%, var(--paper))" stroke="var(--fig-k)" strokeWidth="1" />`)}
        <path className="mf6-draw" pathLength="1" d=${path(PO.map((p, x) => [f.X(x), f.Y(100 * p)]))} fill="none" stroke="var(--pen)" strokeWidth="3" />
        ${PO.map((p, x) => html`<circle key=${'c' + x} className="mf6-late" style=${{ animationDelay: '1.1s' }} cx=${f.X(x)} cy=${f.Y(100 * p)} r="3.5" fill="var(--pen)" />`)}
      </svg><p className="mf6-eq">X̄ = 3.64 ≠ S² = 7.63</p>`;
    }
    return html`<figure className="fig mf6"><div className="fig-stage">${body}</div>
      <${Cap} ...${VSTEPS[i]} showAr=${ar} /><${Bar} steps=${VSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [10.4]–[10.5] Example 6.4: lognormal estimates from ln of the data ── */
  const LGX = [18.8, 27.9, 21.0, 6.1, 37.4, 5.0, 22.9, 1.0, 3.1, 8.3], LGL = [2.9, 3.3, 3.0, 1.8, 3.6, 1.6, 3.1, 0, 1.1, 2.1];
  const LSTEPS = [
    { en: 'Example 6.4: rates of return on 10 investments. For the lognormal, μ̂ and σ̂² are computed <b>after taking ln of the data</b>.', ar: 'ده مثال 6.4 وفيه rates of return لـ 10 investments. في الـ lognormal بنحسب μ̂ و σ̂² <b>بعد ما ناخد ln للـ data</b>.' },
    { en: 'Take natural logs (rounded to one decimal as in the notes): 2.9, 3.3, 3.0, 1.8, 3.6, 1.6, 3.1, 0, 1.1, 2.1.', ar: 'بناخد الـ natural log لكل قيمة ونقرّبه لرقم عشري واحد زي الـ notes.' },
    { en: 'μ̂ = X̄ of the logs = 22.5 / 10 = <b>2.25</b>.', ar: 'الـ μ̂ هي متوسط الـ logs.' + L('μ̂ = 22.5 / 10 = 2.25') },
    { en: 'σ̂² = S² of the logs = (Σ(ln)² − n X̄²) / (n − 1) = (62.29 − 10 × 2.25²) / 9 = 11.665 / 9 = 1.296 ≈ <b>1.3</b>.', ar: 'الـ σ̂² هي الـ S² بتاعة الـ logs.' + L('σ̂² = (62.29 − 10 × 2.25²) / 9 = 11.665 / 9 ≈ 1.3') },
    { en: 'With unrounded logs the estimates are μ̂ = 2.27 and σ̂² = 1.32. (This example was asked on the 2024/25 final.)', ar: 'لو استخدمنا الـ logs من غير تقريب النتيجة بتبقى كده، والمثال ده جه في امتحان <bdi dir="ltr">2024/25</bdi>.' + L('μ̂ = 2.27,  σ̂² = 1.32') }
  ];
  function Lognormal({ ar }) {
    const [mode, setMode] = useState('ex'), [i, ctl] = useSteps(LSTEPS.length, 3000), [txt, setTxt] = useState('18.8, 27.9, 21.0, 6.1, 37.4, 5.0, 22.9, 1.0, 3.1, 8.3');
    const setM = m => { setMode(m); if (m === 'ex') ctl.replay(); };
    let rows, foot, en, a;
    if (mode === 'ex') {
      rows = LGX.map((x, k) => [x.toFixed(1), i >= 1 ? LGL[k].toFixed(1) : '·', i >= 3 ? fx(LGL[k] ** 2) : '·']);
      foot = ['Σ', i >= 2 ? '22.5' : '', i >= 3 ? '62.29' : '']; en = LSTEPS[i].en; a = LSTEPS[i].ar;
    } else {
      const v = txt.split(/[\s,;]+/).map(Number).filter(x => isFinite(x) && x > 0).slice(0, 15), lg = v.map(Math.log), n = v.length;
      const m = n ? lg.reduce((s, x) => s + x, 0) / n : 0, s2 = n > 1 ? (lg.reduce((s, x) => s + x * x, 0) - n * m * m) / (n - 1) : NaN;
      rows = v.map((x, k) => [x, fx(lg[k], 3), fx(lg[k] ** 2, 3)]); foot = ['Σ', fx(lg.reduce((s, x) => s + x, 0), 3), fx(lg.reduce((s, x) => s + x * x, 0), 3)];
      en = n > 1 ? `n = ${n}: μ̂ = ${fx(m, 3)} and σ̂² = ${fx(s2, 3)} (unrounded logs; at most 15 positive values).` : 'Type at least two positive values, separated by commas.';
      a = n > 1 ? 'دي التقديرات من الـ logs من غير تقريب (بحد أقصى 15 قيمة موجبة).' + L(`n = ${n},  μ̂ = ${fx(m, 3)},  σ̂² = ${fx(s2, 3)}`) : 'اكتب قيمتين موجبتين على الأقل وافصل بينهم بـ comma.';
    }
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Tabs} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} v=${mode} set=${setM} />
      ${mode === 'try' && html`<div style=${{ textAlign: 'center' }}><textarea className="mf6-ta" rows="2" value=${txt} onInput=${e => setTxt(e.target.value)} aria-label="Data values"></textarea></div>`}
      <div className="mf6-tw"><table className="mf6-tbl"><thead><tr><th>Xᵢ</th><th>ln Xᵢ</th><th>(ln Xᵢ)²</th></tr></thead><tbody>
        ${rows.map((r, k) => html`<tr key=${k}><td>${r[0]}</td><td className=${r[1] === '·' ? 'dim' : ''}>${r[1]}</td><td className=${r[2] === '·' ? 'dim' : ''}>${r[2]}</td></tr>`)}
        <tr className="tot"><td>${foot[0]}</td><td>${foot[1]}</td><td>${foot[2]}</td></tr></tbody></table></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${mode === 'ex' && html`<${Bar} steps=${LSTEPS} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [11.2] slide 26: Type I and Type II errors ── */
  const ERR = {
    at: { en: 'H₀ is true and we <b>accept</b> it: a <b>correct</b> decision.', ar: 'الـ H₀ صح واحنا <b>قبلناها</b>، يعني قرار <b>صح</b>.', good: true },
    af: { en: '<b>Type II error (β)</b>, error of the second kind, a <b>false negative</b>: we retain H₀ when it is not true.', ar: 'ده <b>Type II error</b> واسمه β، يعني <b>false negative</b>. احنا قبلنا الـ H₀ وهي غلط.' },
    rt: { en: '<b>Type I error (α)</b>, error of the first kind, a <b>false positive</b>: we reject H₀ when it is true.', ar: 'ده <b>Type I error</b> واسمه α، يعني <b>false positive</b>. احنا رفضنا الـ H₀ وهي صح.' },
    rf: { en: 'H₀ is false and we <b>reject</b> it: a <b>correct</b> decision.', ar: 'الـ H₀ غلط واحنا <b>رفضناها</b>، يعني قرار <b>صح</b>.', good: true }
  };
  function Errors({ ar }) {
    const [c, setC] = useState(null), cell = (k, t) => html`<button className=${(ERR[k].good ? 'good' : 'err') + (c === k ? ' on' : '')} onClick=${() => setC(k)} aria-pressed=${String(c === k)}>${t}</button>`;
    const m = c ? ERR[c] : { en: 'A goodness-of-fit test ends in a decision about H₀. Tap a cell: what really holds (columns) against what we decide (rows).', ar: 'أي <bdi dir="ltr">goodness-of-fit</bdi> test بيخلص بقرار عن الـ H₀. دوس على أي خانة، والأعمدة هي الحقيقة والصفوف هي قرارنا.' };
    return html`<figure className="fig mf6"><div className="fig-stage"><div className="mf6-grid2">
      <div></div><div>H₀ true</div><div>H₀ false</div>
      <div>Accept H₀</div>${cell('at', 'Correct')}${cell('af', 'Type II error (β)')}
      <div>Reject H₀</div>${cell('rt', 'Type I error (α)')}${cell('rf', 'Correct')}
    </div></div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }

  /* ── [13] slide 30: chi-square test of the vehicle data against Poisson(3.64) ── */
  const CP = { p: ['0.026', '0.096', '0.174', '0.211', '0.192', '0.140', '0.085', '0.044', '0.020', '0.008', '0.003', '0.001'], E: ['2.6', '9.6', '17.4', '21.1', '19.2', '14.0', '8.5', '4.4', '2.0', '0.8', '0.3', '0.1'],
    G: [{ r: [0, 1], O: 22, E: '12.2', c: '7.87' }, { r: [2], O: 19, E: '17.4', c: '0.15' }, { r: [3], O: 17, E: '21.1', c: '0.80' }, { r: [4], O: 10, E: '19.2', c: '4.41' }, { r: [5], O: 8, E: '14.0', c: '2.57' }, { r: [6], O: 7, E: '8.5', c: '0.26' }, { r: [7, 8, 9, 10, 11], O: 17, E: '7.6', c: '11.62' }] };
  const CSTEPS = [
    { en: 'H₀: the number of arrivals is <b>Poisson</b>; H₁: it is not. The parameter is estimated as α̂ = X̄ = <b>3.64</b>. (Slide 30 prints O = 19 and 6 for x = 4 and 5; the data give 10 and 8, which make the total 100.)', ar: 'الـ H₀ إن عدد العربيات <b>Poisson</b> والـ H₁ إنه مش Poisson، والـ parameter متقدّر من الـ mean. وخلي بالك إن الـ slide كاتبة 19 و 6 عند القيمتين 4 و 5، بس الـ data بتدّي 10 و 8.' + L('α̂ = X̄ = 3.64') },
    { en: 'Expected frequencies: Eᵢ = n · p(x) = 100 · e^(−α) αˣ / x!. For example p(0) = 0.026, so E = 2.6.', ar: 'الـ expected frequencies بنحسبها كده:' + L('Eᵢ = n · p(x) = 100 · e^(−α) αˣ / x!') },
    { en: 'The suggested minimum is <b>Eᵢ = 5</b>. E = 2.6 at x = 0 and every E from x = 7 on (4.4, 2.0, 0.8, 0.3, 0.1) are too small (red).', ar: 'الحد الأدنى المقترح هو إن الـ <b>Eᵢ تبقى 5</b>. القيم الحمرا أقل من 5 عند القيمة 0 ومن القيمة 7 لفوق.' },
    { en: 'Combine adjacent cells, adding their O and E: x = 0 and 1 give O = 22, E = 12.2; x = 7 to ≥ 11 give O = 17, E = 7.6. Now <b>k = 7</b> cells.', ar: 'بنجمع الـ cells اللي جنب بعض ونجمع الـ O والـ E بتوعهم، فبيفضل عندنا <b>7 cells</b>.' + L('x = 0, 1 → O = 22, E = 12.2  |  x ≥ 7 → O = 17, E = 7.6') },
    { en: 'Each cell gives (Oᵢ − Eᵢ)² / Eᵢ, e.g. (22 − 12.2)² / 12.2 = 7.87 and (17 − 7.6)² / 7.6 = 11.62.', ar: 'كل cell بتدّي المقدار ده، مثلاً أول وآخر cell:' + L('(22 − 12.2)² / 12.2 = 7.87,  (17 − 7.6)² / 7.6 = 11.62') },
    { en: 'χ₀² = <b>27.68</b>. Degrees of freedom = k − s − 1 = 7 − 1 − 1 = <b>5</b> (one parameter estimated). χ²0.05,5 = <b>11.07</b>. Since 27.68 > 11.07, <b>H₀ is rejected</b>: the data are not Poisson with α = 3.64.', ar: 'المجموع هو الـ χ₀² والـ degrees of freedom طلعت 5 لأننا قدّرنا parameter واحد. ولأن 27.68 أكبر من 11.07 <b>بنرفض الـ H₀</b>، يعني الـ data مش Poisson بالـ α دي.' + L('χ₀² = 27.68 > χ²0.05,5 = 11.07') }
  ];
  function ChisqPoisson({ ar }) {
    const [i, ctl] = useSteps(CSTEPS.length, 3400), merged = i >= 3;
    const body = [];
    if (!merged) VF.forEach((o, x) => body.push(html`<tr key=${x}><td>${x === 11 ? '≥ 11' : x}</td><td className=${i >= 1 ? '' : 'dim'}>${i >= 1 ? CP.p[x] : '·'}</td><td>${o}</td><td className=${i >= 2 && (x === 0 || x >= 7) ? 'lo' : i >= 1 ? '' : 'dim'}>${i >= 1 ? CP.E[x] : '·'}</td><td className="dim">·</td></tr>`));
    else CP.G.forEach((g, gi) => g.r.forEach((x, k) => body.push(html`<tr key=${x}><td>${x === 11 ? '≥ 11' : x}</td><td>${CP.p[x]}</td>
      ${k === 0 && html`<td rowSpan=${g.r.length} className=${g.r.length > 1 ? 'grp' : ''}>${g.O}</td><td rowSpan=${g.r.length} className=${g.r.length > 1 ? 'grp' : ''}>${g.E}</td><td rowSpan=${g.r.length} className=${i >= 4 ? (g.r.length > 1 ? 'grp' : '') : 'dim'}>${i >= 4 ? g.c : '·'}</td>`}</tr>`)));
    return html`<figure className="fig mf6"><div className="fig-stage">
      <div className="mf6-tw"><table className="mf6-tbl"><thead><tr><th>x</th><th>p(x)</th><th>Oᵢ</th><th>Eᵢ</th><th>(O−E)²/E</th></tr></thead><tbody>${body}
        <tr className="tot"><td>Σ</td><td></td><td>100</td><td>${i >= 1 ? '100.0' : ''}</td><td>${i >= 5 ? '27.68' : ''}</td></tr></tbody></table></div>
      ${i >= 5 && html`<div className="mf6-verd">χ₀² = 27.68 > χ²0.05,5 = 11.07 → reject H₀</div>`}</div>
      <${Cap} ...${CSTEPS[i]} showAr=${ar} /><${Bar} steps=${CSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [14] Example 6.6: chi-square with equal-probability intervals, chip lifetimes vs exponential(0.084) ── */
  const LAM = 0.084, A8 = [0, 1.590, 3.425, 5.595, 8.252, 11.677, 16.503, 24.755, Infinity];
  const CHI05 = { 1: 3.84, 2: 5.99, 3: 7.81, 4: 9.49, 5: 11.07, 6: 12.59, 7: 14.07, 8: 15.51 };
  function eqProb(k) {
    const a = k === 8 ? A8 : Array.from({ length: k + 1 }, (_, j) => j === k ? Infinity : -Math.log(1 - j / k) / LAM);
    const E = 50 / k, O = a.slice(0, k).map((lo, j) => LIFE.filter(x => x >= lo && x < a[j + 1]).length), C = O.map(o => (o - E) ** 2 / E);
    return { a, E, O, C, chi: C.reduce((s, x) => s + x, 0), df: k - 2 };
  }
  const ESTEPS = [
    { en: 'Example 6.6: the 50 chip lifetimes look exponential. λ̂ = 1/X̄ = 1/11.89 = <b>0.084</b>. H₀: exponential; H₁: not. n = 50 so k ≤ n/5 = 10; take <b>k = 8</b> intervals of equal probability p = 1/8 = 0.125, so every Eᵢ = 50/8 = <b>6.25</b>.', ar: 'ده مثال 6.6 والـ 50 عمر شكلهم exponential. الـ H₀ إن التوزيع exponential. بما إن عدد القيم 50 يبقى k لازم تبقى 10 أو أقل، فبناخد 8 intervals متساوية في الاحتمال.' + L('λ̂ = 1/11.89 = 0.084,  p = 1/8 = 0.125,  Eᵢ = 50/8 = 6.25') },
    { en: 'Endpoints from F(aᵢ) = 1 − e^(−λaᵢ) = i·p, so aᵢ = −(1/λ) ln(1 − i·p): each step of 0.125 up the CDF gives one endpoint (a₀ = 0, a₈ = ∞). The intervals are equal in probability, not in width.', ar: 'الـ endpoints بتيجي من الـ CDF، وكل خطوة قدها 0.125 على الـ CDF بتدّي endpoint. الـ intervals متساوية في الاحتمال مش في العرض.' + L('aᵢ = −(1/λ) ln(1 − i·p)') },
    { en: 'Count the 50 lifetimes in each interval: O = 19, 10, 3, 6, 1, 1, 4, 6. The dashed line is E = 6.25.', ar: 'بنعدّ الـ 50 عمر في كل interval، والخط المتقطع هو الـ E.' + L('O = 19, 10, 3, 6, 1, 1, 4, 6') },
    { en: 'Each interval gives (Oᵢ − Eᵢ)²/Eᵢ. The third is (3 − 6.25)²/6.25 = <b>1.69</b> (the notes\' Table 6.7 prints 0.81).', ar: 'كل interval بيدّي المقدار ده، والتالت قيمته الصح 1.69 (جدول 6.7 في الـ notes كاتب 0.81).' + L('(3 − 6.25)² / 6.25 = 1.69') },
    { en: 'χ₀² = <b>39.60</b> (the notes print 38.72). Degrees of freedom = k − s − 1 = 8 − 1 − 1 = <b>6</b>, χ²0.05,6 = <b>12.6</b>. Since χ₀² > 12.6, <b>H₀ is rejected</b>: the exponential with λ = 0.084 does not fit.', ar: 'الـ χ₀² الصح 39.60 (الـ notes كاتبة 38.72)، والـ degrees of freedom طلعت 6. ولأنها أكبر من 12.6 <b>بنرفض الـ H₀</b>، يعني الـ exponential بالـ λ دي مش مناسب.' + L('χ₀² = 39.60 > χ²0.05,6 = 12.6') }
  ];
  function ChisqExp({ ar }) {
    const [mode, setMode] = useState('ex'), [i, ctl] = useSteps(ESTEPS.length, 3600), [k, setK] = useState(8);
    const setM = m => { setMode(m); if (m === 'ex') ctl.replay(); };
    const kk = mode === 'ex' ? 8 : k, R = eqProb(kk), st = mode === 'ex' ? i : 9;
    const cdf = (() => { const f = frame([0, 30], [0, 1], { b: 40, l: 40 });
      return html`<svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Exponential CDF with equal-probability endpoints">
        <${Axes} f=${f} xt=${[0, 10, 20, 30]} yt=${[0, .5, 1]} yf=${v => v === 0 ? '0' : v.toFixed(1)} xl="life x (days)" yl="F(x) = 1 − e^(−0.084x)" />
        <path className="mf6-draw" pathLength="1" d=${curve(f, x => 1 - Math.exp(-LAM * x), 0, 30, 1)} fill="none" stroke="var(--fig-k)" strokeWidth="3" />
        ${st >= 1 && R.a.slice(1, kk).map((x, j) => html`<g key=${kk + '-' + j} className="mf6-late" style=${{ animationDelay: (j * 180) + 'ms' }}>
          <line x1=${f.m.l} x2=${f.X(x)} y1=${f.Y((j + 1) / kk)} y2=${f.Y((j + 1) / kk)} stroke="var(--pen)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1=${f.X(x)} x2=${f.X(x)} y1=${f.Y((j + 1) / kk)} y2=${f.Y(0)} stroke="var(--pen)" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx=${f.X(x)} cy=${f.Y(0)} r="3.5" fill="var(--pen)" /></g>`)}
      </svg>`; })();
    const bars = (() => { const top = Math.max(20, ...R.O), f = frame([0, kk], [0, top], { b: 40, l: 34 }), w = f.X(1) - f.X(0);
      return html`<svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Observed counts per equal-probability interval">
        <${Axes} f=${f} yt=${[0, 10, 20]} xl="interval i" yl="Oᵢ" />
        ${R.O.map((o, j) => html`<g key=${kk + '-' + j}><rect x=${f.X(j) + 3} y=${f.Y(o)} width=${w - 6} height=${f.Y(0) - f.Y(o)} fill="color-mix(in srgb, var(--fig-k) 40%, var(--paper))" stroke="var(--fig-k)" />
          <text x=${f.X(j + .5)} y=${f.Y(o) - 4} textAnchor="middle" fontSize="15">${o}</text><text x=${f.X(j + .5)} y=${f.H - f.m.b + 17} textAnchor="middle" fontSize="15">${j + 1}</text></g>`)}
        <line x1=${f.m.l} x2=${f.W - f.m.r} y1=${f.Y(R.E)} y2=${f.Y(R.E)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="6 5" />
        <text x=${f.W - f.m.r} y=${f.Y(R.E) - 5} textAnchor="end" fontSize="15" style=${{ fill: 'var(--pen)' }}>E = ${fx(R.E)}</text></svg>`; })();
    const fa = x => x === Infinity ? '∞' : x.toFixed(3);
    const table = html`<div className="mf6-tw"><table className="mf6-tbl"><thead><tr><th>interval</th><th>Oᵢ</th><th>Eᵢ</th><th>(O−E)²/E</th></tr></thead><tbody>
      ${R.O.map((o, j) => html`<tr key=${j}><td>${st >= 1 ? `[${fa(R.a[j])}, ${fa(R.a[j + 1])})` : '·'}</td><td className=${st >= 2 ? '' : 'dim'}>${st >= 2 ? o : '·'}</td><td>${fx(R.E)}</td>
        <td className=${st >= 3 ? (mode === 'ex' && j === 2 ? 'fix' : '') : 'dim'}>${st >= 3 ? fx(R.C[j]) : '·'}</td></tr>`)}
      <tr className="tot"><td>Σ</td><td>50</td><td>50</td><td>${st >= 4 ? fx(R.chi) : ''}</td></tr></tbody></table></div>`;
    const crit = CHI05[R.df], rej = R.chi > crit;
    const verd = st >= 4 && html`<div className=${'mf6-verd' + (rej ? '' : ' ok')}>χ₀² = ${fx(R.chi)} ${rej ? '>' : '≤'} χ²0.05,${R.df} = ${crit} → ${rej ? 'reject H₀' : 'do not reject H₀'}</div>`;
    let en, a;
    if (mode === 'ex') { en = ESTEPS[i].en; a = ESTEPS[i].ar; }
    else { en = `k = ${kk} intervals of probability 1/${kk}, each Eᵢ = 50/${kk} = ${fx(R.E)}. χ₀² = <b>${fx(R.chi)}</b> with k − s − 1 = ${R.df} degrees of freedom (critical ${crit}). The endpoints aᵢ = −(1/0.084) ln(1 − i/${kk}) move with k, so the counts change: a different grouping can change the test result.`;
      a = `هنا عندنا ${kk} intervals، وكل ما الـ k تتغير الـ endpoints بتتحرك والعدّ بيتغير. يعني الـ grouping المختلف ممكن يغيّر نتيجة الـ test.` + L(`Eᵢ = ${fx(R.E)},  χ₀² = ${fx(R.chi)},  df = ${R.df},  χ²0.05 = ${crit}`); }
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Tabs} list=${[['ex', 'Example from the notes'], ['try', 'Try your own k']]} v=${mode} set=${setM} />
      ${mode === 'try' && html`<div className="mf6-row"><label htmlFor="mf6-k">k = <b>${k}</b></label><input id="mf6-k" type="range" min="3" max="10" value=${k} onInput=${e => setK(+e.target.value)} aria-label="number of intervals k" /></div>`}
      ${mode === 'ex' ? (i < 2 ? cdf : bars) : bars}
      ${table}${verd}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${mode === 'ex' && html`<${Bar} steps=${ESTEPS} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [15.6]–[15.8] Example 6.7: K-S test of the 50 normalized arrival times for uniformity ── */
  const KR = [0.0044, 0.0097, 0.0301, 0.0575, 0.0775, 0.0805, 0.1059, 0.1111, 0.1313, 0.1502, 0.1655, 0.1676, 0.1956, 0.1960, 0.2095, 0.2927, 0.3161, 0.3356, 0.3366, 0.3508, 0.3553, 0.3561, 0.3670, 0.3746, 0.4300, 0.4694, 0.4796, 0.5027, 0.5315, 0.5382, 0.5494, 0.5520, 0.5977, 0.6514, 0.6526, 0.6845, 0.7008, 0.7154, 0.7262, 0.7468, 0.7553, 0.7636, 0.7880, 0.7982, 0.8206, 0.8417, 0.8732, 0.9022, 0.9680, 0.9744];
  const KSTEPS = [
    { en: 'Example 6.7: interarrival times collected over <b>T = 100</b> minutes. Add them up for the arrival times and divide by T: 0.44 → 0.0044, 0.44 + 0.53 = 0.97 → 0.0097, … If the interarrival times are exponential, these <b>50 points</b> are <b>uniform on (0, 1)</b>.', ar: 'ده مثال 6.7 والـ interarrival times متجمعة على 100 دقيقة. بنجمعهم عشان نجيب الـ arrival times ونقسم على T. لو الـ interarrival times دي exponential يبقى الـ 50 نقطة دول <b>uniform</b> على الفترة من 0 لـ 1.' + L('0.44 → 0.0044,  0.44 + 0.53 = 0.97 → 0.0097, …') },
    { en: 'The empirical CDF S<sub>N</sub>(x) steps up by 1/50 at each point. Compare it with the uniform CDF <b>F(x) = x</b> (dashed). Move the slider to inspect each i.', ar: 'الـ empirical CDF بيطلع درجة قدها جزء من 50 عند كل نقطة، وبنقارنه بالـ uniform CDF (الخط المتقطع). حرّك الـ slider عشان تشوف كل i.' + L('F(x) = x') },
    { en: 'D⁺ = max(i/N − R₍ᵢ₎) = 24/50 − 0.3746 = 0.48 − 0.3746 = <b>0.1054</b>, at i = 24 (red gap).', ar: 'أكبر مسافة الـ step فيها فوق الخط عند الـ i رقم 24 (الفرق الأحمر).' + L('D⁺ = 24/50 − 0.3746 = 0.1054') },
    { en: 'D⁻ = max(R₍ᵢ₎ − (i − 1)/N) = 0.9680 − 48/50 = <b>0.0080</b>, at i = 49.', ar: 'وأكبر مسافة الخط فيها فوق الـ step عند الـ i رقم 49.' + L('D⁻ = 0.9680 − 48/50 = 0.0080') },
    { en: 'D = max(0.1054, 0.0080) = <b>0.1054</b>. Critical value D0.05 = 1.36/√50 = <b>0.1923</b>. D < Dα, so H₀ is <b>not rejected</b>: the interarrival times are taken as exponential.', ar: 'الـ D هي الأكبر فيهم، والـ critical value من الجدول. ولأن D أصغر <b>مش بنرفض الـ H₀</b>، يعني الـ interarrival times نعتبرها exponential.' + L('D = 0.1054 < D0.05 = 1.36/√50 = 0.1923') }
  ];
  function KsTest({ ar }) {
    const [i, ctl] = useSteps(KSTEPS.length, 3400), [j, setJ] = useState(24);
    const f = frame([0, 1], [0, 1], { b: 40, l: 44 }), N = 50, r = KR[j - 1];
    const step = [[f.X(0), f.Y(0)]]; KR.forEach((x, k) => { step.push([f.X(x), f.Y(k / N)], [f.X(x), f.Y((k + 1) / N)]); }); step.push([f.X(1), f.Y(1)]);
    return html`<figure className="fig mf6"><div className="fig-stage">
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Empirical CDF of the 50 points against the uniform CDF">
        <${Axes} f=${f} xt=${[0, .25, .5, .75, 1]} yt=${[0, .5, 1]} xf=${v => v ? String(v) : '0'} yf=${v => v ? String(v) : '0'} xl="x" yl="CDF" />
        <line x1=${f.X(0)} y1=${f.Y(0)} x2=${f.X(1)} y2=${f.Y(1)} stroke="var(--graphite)" strokeWidth="2" strokeDasharray="6 5" />
        ${KR.map((x, k) => html`<line key=${k} className="mf6-late" style=${{ animationDelay: (k * 25) + 'ms' }} x1=${f.X(x)} x2=${f.X(x)} y1=${f.Y(0)} y2=${f.Y(0) - 8} stroke="var(--fig-k)" strokeWidth="1.4" />`)}
        ${i >= 1 && html`<path className="mf6-draw" pathLength="1" d=${path(step)} fill="none" stroke="var(--fig-k)" strokeWidth="2.2" />`}
        ${i >= 2 && html`<line x1=${f.X(.3746)} x2=${f.X(.3746)} y1=${f.Y(.3746)} y2=${f.Y(.48)} stroke="var(--pen)" strokeWidth="4" /><text x=${f.X(.3746) - 6} y=${f.Y(.48) - 6} textAnchor="end" fontSize="15" fontWeight="700" style=${{ fill: 'var(--pen)' }}>D⁺</text>`}
        ${i >= 3 && html`<circle cx=${f.X(.968)} cy=${f.Y(.964)} r="7" fill="none" stroke="var(--pen)" strokeWidth="2.5" /><text x=${f.X(.968) - 10} y=${f.Y(.964) + 22} textAnchor="end" fontSize="15" fontWeight="700" style=${{ fill: 'var(--pen)' }}>D⁻</text>`}
        ${i >= 1 && html`<circle cx=${f.X(r)} cy=${f.Y(j / N)} r="5" fill="var(--ok)" stroke="var(--paper)" />`}
      </svg>
      ${i >= 1 && html`<div className="mf6-row"><label htmlFor="mf6-ki">i = <b>${j}</b></label><input id="mf6-ki" type="range" min="1" max="50" value=${j} onInput=${e => setJ(+e.target.value)} aria-label="index i" /></div>
        <div className="mf6-ins">R₍ᵢ₎ = <b>${r.toFixed(4)}</b> · i/N − R₍ᵢ₎ = <b>${(j / N - r).toFixed(4)}</b> · R₍ᵢ₎ − (i−1)/N = <b>${(r - (j - 1) / N).toFixed(4)}</b></div>`}
      ${i >= 4 && html`<div className="mf6-verd ok">D = 0.1054 ${"<"} D0.05 = 0.1923 → do not reject H₀</div>`}</div>
      <${Cap} ...${KSTEPS[i]} showAr=${ar} /><${Bar} steps=${KSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [17.3] Example 6.8: input model without data, sales of product XYZ ── */
  const ND = [[1000, 0], [2000, .10], [3500, .75], [4500, .99], [5000, 1]];
  const NROWS = [['1000 ≤ x ≤ 2000', '0.10', '0.10'], ['2000 < x ≤ 3500', '0.65', '0.75'], ['3500 < x ≤ 4500', '0.24', '0.99'], ['4500 < x ≤ 5000', '0.01', '1.00']];
  const NSTEPS = [
    { en: 'Example 6.8, no data: sales of product XYZ are <b>no fewer than 1000</b> units (existing contracts) and <b>no more than 5000</b> (the whole market).', ar: 'ده مثال 6.8 ومفيش data. مبيعات المنتج XYZ <b>مش أقل من 1000</b> وحدة بسبب العقود الموجودة، و<b>مش أكتر من 5000</b> لأن ده السوق كله.' },
    { en: '90% chance of selling more than 2000, so P(1000 ≤ x ≤ 2000) = 1 − 0.90 = <b>0.10</b>.', ar: 'فيه فرصة 90% نبيع أكتر من 2000، فالاحتمال الأول بيبقى 0.10.' + L('P(1000 ≤ x ≤ 2000) = 0.10') },
    { en: '25% chance of more than 3500, so P(2000 < x ≤ 3500) = 0.90 − 0.25 = <b>0.65</b>; cumulative 0.75.', ar: 'فيه فرصة 25% نبيع أكتر من 3500، فالاحتمال ده بيبقى 0.65 والتراكمي 0.75.' + L('P(2000 < x ≤ 3500) = 0.90 − 0.25 = 0.65') },
    { en: '1% chance of more than 4500, so P(3500 < x ≤ 4500) = 0.25 − 0.01 = <b>0.24</b>; cumulative 0.99.', ar: 'فيه فرصة 1% نبيع أكتر من 4500، فالاحتمال ده بيبقى 0.24 والتراكمي 0.99.' + L('P(3500 < x ≤ 4500) = 0.25 − 0.01 = 0.24') },
    { en: 'The rest: P(4500 < x ≤ 5000) = <b>0.01</b>; cumulative 1.00. The minimum, maximum and the <b>breakpoints</b> (a value and the probability of being ≤ it) define the input model.', ar: 'الباقي احتماله 0.01 والتراكمي 1.00. الـ minimum والـ maximum والـ <b>breakpoints</b> هما اللي بيحددوا الـ input model.' + L('P(4500 < x ≤ 5000) = 0.01') }
  ];
  function NoData({ ar }) {
    const [i, ctl] = useSteps(NSTEPS.length, 3000), f = frame([1000, 5000], [0, 1], { b: 40, l: 44, r: 20 });
    const shown = i === 0 ? [0, 4] : [0, ...Array.from({ length: i }, (_, k) => k + 1), 4].filter((v, k, a) => a.indexOf(v) === k);
    return html`<figure className="fig mf6"><div className="fig-stage">
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Cumulative probabilities at the breakpoints">
        <${Axes} f=${f} xt=${[1000, 2000, 3000, 4000, 5000]} yt=${[0, .25, .5, .75, 1]} xf=${v => (v / 1000) + 'k'} yf=${v => v ? String(v) : '0'} xl="units sold" yl="P(sales ≤ x)" />
        ${shown.map(k => { const [x, y] = ND[k]; return html`<g key=${k} className="mf6-late">
          <line x1=${f.X(x)} x2=${f.X(x)} y1=${f.Y(0)} y2=${f.Y(y)} stroke="var(--fig-k)" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle className="mf6-dot" cx=${f.X(x)} cy=${f.Y(y)} r="6" fill=${k === i ? 'var(--pen)' : 'var(--fig-k)'} stroke="var(--paper)" strokeWidth="1.5" />
          ${k > 0 && html`<text x=${f.X(x) - 9} y=${f.Y(y) + (k === 4 ? 18 : 5)} textAnchor="end" fontSize="15" fontWeight="600">${y.toFixed(2)}</text>`}</g>`; })}
      </svg>
      <div className="mf6-tw"><table className="mf6-tbl"><thead><tr><th>interval (units)</th><th>frequency</th><th>cumulative</th></tr></thead><tbody>
        ${NROWS.map((r, k) => html`<tr key=${k} className=${k + 1 === i || (i === 4 && k === 3) ? 'on' : ''}><td>${r[0]}</td><td className=${k < i ? '' : 'dim'}>${k < i ? r[1] : '·'}</td><td className=${k < i ? '' : 'dim'}>${k < i ? r[2] : '·'}</td></tr>`)}
      </tbody></table></div></div>
      <${Cap} ...${NSTEPS[i]} showAr=${ar} /><${Bar} steps=${NSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [18.5]–[18.6] Example 6.9: lead time and demand, covariance and correlation ── */
  const LD = [[6.5, 103], [4.3, 83], [6.9, 116], [6.0, 97], [6.9, 112], [6.9, 104], [5.8, 106], [7.3, 109], [4.5, 92], [6.3, 96]];
  const RSTEPS = [
    { en: 'Example 6.9: (lead time X₁, annual demand X₂) for 10 years, drawn as a scatter diagram.', ar: 'ده مثال 6.9 وفيه الـ lead time والـ demand لمدة 10 سنين، مرسومين كـ scatter diagram.' },
    { en: 'The sample means: X̄₁ = <b>6.14</b>, X̄₂ = <b>101.80</b> (dashed lines).', ar: 'الـ sample means هي الخطوط المتقطعة.' + L('X̄₁ = 6.14,  X̄₂ = 101.80') },
    { en: '<b>8 of 10</b> points are on the <b>same side</b> of both means (green), only 2 on opposite sides (red): the pairs tend to move together, so β > 0 and the covariance is positive.', ar: 'فيه <b>8 نقط من 10</b> في <b>نفس الناحية</b> من الـ means (الأخضر) و 2 بس عكس بعض (الأحمر). يعني الاتنين بيتحركوا مع بعض، فالـ β موجبة والـ covariance موجب.' },
    { en: 'σ̂₁ = 1.02, σ̂₂ = 9.93, Σ X₁X₂ = 6328.5. cov̂ = [6328.5 − 10(6.14)(101.80)] / 9 = <b>8.66</b>.', ar: 'بنحسب الـ covariance من المجموع ده.' + L('cov̂ = [6328.5 − 10(6.14)(101.80)] / 9 = 8.66') },
    { en: 'ρ̂ = 8.66 / (1.02 × 9.93) = <b>0.86</b>: lead time and demand are <b>strongly dependent</b>. (Unrounded: 0.85, same conclusion.)', ar: 'الـ correlation قريب من 1، يعني الـ lead time والـ demand <b>معتمدين على بعض جامد</b>. ومن غير تقريب بيطلع 0.85 ونفس النتيجة.' + L('ρ̂ = 8.66 / (1.02 × 9.93) = 0.86') }
  ];
  function CorrEx({ ar }) {
    const [i, ctl] = useSteps(RSTEPS.length, 3200), f = frame([4, 8], [80, 120], { b: 40, l: 44 });
    return html`<figure className="fig mf6"><div className="fig-stage">
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Lead time against demand">
        <${Axes} f=${f} xt=${[4, 5, 6, 7, 8]} yt=${[80, 90, 100, 110, 120]} xl="lead time X₁" yl="demand X₂" />
        ${i >= 1 && html`<g className="mf6-late"><line x1=${f.X(6.14)} x2=${f.X(6.14)} y1=${f.Y(80)} y2=${f.Y(120)} stroke="var(--graphite)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1=${f.m.l} x2=${f.W - f.m.r} y1=${f.Y(101.8)} y2=${f.Y(101.8)} stroke="var(--graphite)" strokeWidth="1.5" strokeDasharray="5 5" /></g>`}
        ${LD.map(([x, y], k) => { const same = (x - 6.14) * (y - 101.8) > 0; return html`<circle key=${k} className="mf6-dot" style=${{ animationDelay: (k * 80) + 'ms' }} cx=${f.X(x)} cy=${f.Y(y)} r="5.5" fill=${i >= 2 ? (same ? 'var(--ok)' : 'var(--pen)') : 'var(--fig-k)'} stroke="var(--paper)" strokeWidth="1.2" />`; })}
      </svg>
      ${i >= 3 && html`<p className="mf6-eq">cov̂ = 8.66${i >= 4 ? ' · ρ̂ = 0.86' : ''}</p>`}</div>
      <${Cap} ...${RSTEPS[i]} showAr=${ar} /><${Bar} steps=${RSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [18.7] bivariate normal variates (parameters from Example 6.9) ── */
  const BV = { m1: 6.14, s1: 1.02, m2: 101.8, s2: 9.93 };
  function Bivar({ ar }) {
    const [rho, setRho] = useState(0.86), [pts, setPts] = useState([]), [last, setLast] = useState(null);
    const one = r => { const R1 = 1 - Math.random(), R2 = Math.random(), q = Math.sqrt(-2 * Math.log(R1)), Z1 = q * Math.cos(2 * Math.PI * R2), Z2 = q * Math.sin(2 * Math.PI * R2);
      return { R1, R2, Z1, Z2, X1: BV.m1 + BV.s1 * Z1, X2: BV.m2 + BV.s2 * (r * Z1 + Math.sqrt(1 - r * r) * Z2) }; };
    const add = n => { const g = Array.from({ length: n }, () => one(rho)); setPts(p => p.concat(g).slice(-300)); setLast(g[g.length - 1]); };
    const f = frame([3, 9], [70, 135], { b: 40, l: 44 });
    const r = pts.length >= 3 ? corr(pts.map(p => p.X1), pts.map(p => p.X2)) : null;
    let en, a;
    if (!last) { en = `Generate (X₁, X₂) pairs with the algorithm: μ₁ = 6.14, σ₁ = 1.02, μ₂ = 101.8, σ₂ = 9.93 from Example 6.9 and ρ = ${fx(rho)}. Step 1 makes two independent standard normals Z₁, Z₂; step 2 sets X₁ = μ₁ + σ₁Z₁; step 3 sets X₂ = μ₂ + σ₂(ρZ₁ + √(1 − ρ²) Z₂).`;
      a = 'ولّد أزواج بالـ algorithm بالـ parameters بتاعة مثال 6.9. الخطوة الأولى بتعمل 2 standard normals مستقلين، والتانية والتالتة بيحسبوا الـ X₁ والـ X₂ كده:' + L('X₁ = μ₁ + σ₁Z₁,  X₂ = μ₂ + σ₂(ρZ₁ + √(1 − ρ²) Z₂)'); }
    else { const s = `R₁ = ${fx(last.R1, 3)}, R₂ = ${fx(last.R2, 3)} → Z₁ = ${fx(last.Z1, 3)}, Z₂ = ${fx(last.Z2, 3)} → X₁ = ${fx(last.X1)}, X₂ = ${fx(last.X2)}`;
      en = `Last pair: ${s}. ${pts.length} pairs so far; their sample correlation is ${r == null ? '(needs 3 pairs)' : '<b>' + fx(r) + '</b>'} (target ρ = ${fx(rho)}).`;
      a = `ده آخر زوج اتولّد. عندنا ${pts.length} أزواج لحد دلوقتي، والـ correlation بتاعهم قريب من الـ ρ المطلوبة.` + L(s) + (r == null ? '' : L(`r = ${fx(r)},  ρ = ${fx(rho)}`)); }
    return html`<figure className="fig mf6"><div className="fig-stage">
      <div className="mf6-row"><label htmlFor="mf6-rho">ρ = <b>${fx(rho)}</b></label><input id="mf6-rho" type="range" min="-0.95" max="0.95" step="0.01" value=${rho} onInput=${e => { setRho(+e.target.value); setPts([]); setLast(null); }} aria-label="correlation rho" /></div>
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Generated bivariate normal pairs">
        <${Axes} f=${f} xt=${[3, 5, 7, 9]} yt=${[70, 90, 110, 130]} xl="X₁ (lead time)" yl="X₂ (demand)" />
        ${pts.filter(p => p.X1 > 3 && p.X1 < 9 && p.X2 > 70 && p.X2 < 135).map((p, k) => html`<circle key=${k} cx=${f.X(p.X1)} cy=${f.Y(p.X2)} r=${p === last ? 6 : 3.5} fill=${p === last ? 'var(--pen)' : 'color-mix(in srgb, var(--fig-k) 70%, transparent)'} />`)}
      </svg></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><button className="fig-btn solid" onClick=${() => add(1)}>Generate a pair</button><button className="fig-btn" onClick=${() => add(50)}>+ 50 pairs</button>
        <span className="grow"></span><button className="fig-btn" onClick=${() => { setPts([]); setLast(null); setRho(0.86); }}>↻ Reset</button></div></figure>`;
  }

  /* ── [19.6] Example 6.10: gaps between buy and sell orders, lag-1 autocorrelation and EAR(1) ── */
  const GAP = [1.95, 1.75, 1.58, 1.42, 1.28, 1.15, 1.04, 0.93, 0.84, 0.75, 0.68, 0.61, 11.98, 10.79, 9.71, 14.02, 12.62, 11.36, 10.22, 9.20];
  const GSTEPS = [
    { en: 'Example 6.10: 20 gaps (seconds) between buy and sell orders, in time order Xₜ.', ar: 'ده مثال 6.10 وفيه 20 فاصل زمني بالثواني بين أوامر البيع والشراء بالترتيب.' },
    { en: 'Plot each gap against the next one (Xₜ, Xₜ₊₁): the points sit near the diagonal, so a gap is close to the one before. The gaps are <b>dependent</b>.', ar: 'لما نرسم كل فاصل قصاد اللي بعده النقط بتبقى قريبة من القطر، يعني كل فاصل قريب من اللي قبله. الفواصل دي <b>dependent</b>.' },
    { en: 'X̄ = <b>5.2</b>, σ̂² = <b>26.7</b>.', ar: 'الـ mean والـ variance بتوع الـ 20 فاصل كده:' + L('X̄ = 5.2,  σ̂² = 26.7') },
    { en: 'Σ XₜXₜ₊₁ = 924.1, so the lag-1 covariance cov̂ = [924.1 − 19 × 5.2²] / 19 = <b>21.6</b>.', ar: 'بنحسب الـ <bdi dir="ltr">lag-1</bdi> covariance من المجموع ده.' + L('cov̂ = (924.1 − 19 × 5.2²) / 19 = 21.6') },
    { en: 'ρ̂ = 21.6 / 26.7 = <b>0.8</b>: a high positive lag-1 autocorrelation.', ar: 'الـ <bdi dir="ltr">lag-1</bdi> autocorrelation عالية وموجبة.' + L('ρ̂ = 21.6 / 26.7 = 0.8') },
    { en: 'Model the gaps as <b>EAR(1)</b> with λ̂ = 1/5.2 = <b>0.192</b> and φ̂ = <b>0.8</b>, provided the exponential is a good model for the individual gaps.', ar: 'بنعمل للفواصل model من نوع <b><bdi dir="ltr">EAR(1)</bdi></b> بالـ parameters دي، بشرط إن الـ exponential يبقى مناسب لكل فاصل لوحده.' + L('λ̂ = 1/5.2 = 0.192,  φ̂ = 0.8') }
  ];
  function EarEx({ ar }) {
    const [i, ctl] = useSteps(GSTEPS.length, 3200);
    let svg;
    if (i === 1) { const f = frame([0, 15], [0, 15], { b: 40, l: 34 });
      svg = html`<svg key="lag" viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Each gap against the next">
        <${Axes} f=${f} xt=${[0, 5, 10, 15]} yt=${[0, 5, 10, 15]} xl="Xₜ" yl="Xₜ₊₁" />
        <line x1=${f.X(0)} y1=${f.Y(0)} x2=${f.X(15)} y2=${f.Y(15)} stroke="var(--graphite)" strokeWidth="1.5" strokeDasharray="5 5" />
        ${GAP.slice(0, 19).map((x, k) => html`<circle key=${k} className="mf6-dot" style=${{ animationDelay: (k * 60) + 'ms' }} cx=${f.X(x)} cy=${f.Y(GAP[k + 1])} r="5" fill="var(--fig-k)" stroke="var(--paper)" />`)}</svg>`; }
    else { const f = frame([0.5, 20.5], [0, 15], { b: 40, l: 34 });
      svg = html`<svg key="ts" viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="The 20 gaps in time order">
        <${Axes} f=${f} xt=${[1, 5, 10, 15, 20]} yt=${[0, 5, 10, 15]} xl="t" yl="gap Xₜ (s)" />
        ${i >= 2 && html`<g className="mf6-late"><line x1=${f.m.l} x2=${f.W - f.m.r} y1=${f.Y(5.2)} y2=${f.Y(5.2)} stroke="var(--pen)" strokeWidth="1.8" strokeDasharray="6 5" /><text x=${f.X(1)} y=${f.Y(5.2) - 6} fontSize="15" style=${{ fill: 'var(--pen)' }}>X̄ = 5.2</text></g>`}
        <path className="mf6-draw" pathLength="1" d=${path(GAP.map((x, k) => [f.X(k + 1), f.Y(x)]))} fill="none" stroke="var(--fig-k)" strokeWidth="2" />
        ${GAP.map((x, k) => html`<circle key=${k} cx=${f.X(k + 1)} cy=${f.Y(x)} r="3.8" fill="var(--fig-k)" />`)}</svg>`; }
    return html`<figure className="fig mf6"><div className="fig-stage">${svg}
      ${i >= 3 && html`<p className="mf6-eq">cov̂ = 21.6${i >= 4 ? ' · ρ̂ = 0.8' : ''}${i >= 5 ? ' · λ̂ = 0.192' : ''}</p>`}</div>
      <${Cap} ...${GSTEPS[i]} showAr=${ar} /><${Bar} steps=${GSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [19.3] and [19.5]: generating AR(1) and EAR(1) series ── */
  function TsGen({ ar }) {
    const [m, setM] = useState('ear'), [phi, setPhi] = useState(0.8), [xs, setXs] = useState([]), [last, setLast] = useState(null);
    const MU = 5.2, V = 26.7, LM = 0.192;
    const nrm = () => { const R1 = 1 - Math.random(), R2 = Math.random(); return Math.sqrt(-2 * Math.log(R1)) * Math.cos(2 * Math.PI * R2); };
    const expo = () => -Math.log(1 - Math.random()) / LM;
    const next = (prev) => {
      if (m === 'ear') {
        if (prev == null) { const x = expo(); return { x, en: `Step 1: X₁ exponential with mean 1/λ = 5.2: X₁ = ${fx(x)}.`, ar: L(`X₁ = ${fx(x)}`) }; }
        const U = Math.random();
        if (U <= phi) { const x = phi * prev; return { x, en: `U = ${fx(U, 3)} ≤ φ = ${fx(phi)}, so Xₜ = φXₜ₋₁ = ${fx(phi)} × ${fx(prev)} = ${fx(x)}.`, ar: L(`U = ${fx(U, 3)} ≤ φ → Xₜ = φXₜ₋₁ = ${fx(x)}`) }; }
        const e = expo(), x = phi * prev + e; return { x, en: `U = ${fx(U, 3)} > φ = ${fx(phi)}, so εₜ = ${fx(e)} (exponential) and Xₜ = φXₜ₋₁ + εₜ = ${fx(x)}.`, ar: L(`U = ${fx(U, 3)} > φ → Xₜ = φXₜ₋₁ + εₜ = ${fx(x)}`) };
      }
      const se2 = V * (1 - phi * phi);
      if (prev == null) { const x = MU + Math.sqrt(se2 / (1 - phi * phi)) * nrm(); return { x, en: `Step 1: X₁ normal with mean μ = 5.2 and variance σε²/(1 − φ²) = 26.7: X₁ = ${fx(x)}.`, ar: L(`X₁ = ${fx(x)}`) }; }
      const e = Math.sqrt(se2) * nrm(), x = MU + phi * (prev - MU) + e;
      return { x, en: `εₜ = ${fx(e)} (normal, variance σε² = ${fx(se2)}), Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ = 5.2 + ${fx(phi)}(${fx(prev)} − 5.2) + ${fx(e)} = ${fx(x)}.`, ar: L(`Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ = ${fx(x)}`) };
    };
    const add = n => { let arr = xs.slice(), l = last; for (let k = 0; k < n && arr.length < 60; k++) { l = next(arr.length ? arr[arr.length - 1] : null); arr.push(l.x); } setXs(arr); setLast(l); };
    const reset = (mm, ph) => { setXs([]); setLast(null); if (mm) setM(mm); if (ph != null) setPhi(ph); };
    const top = Math.max(15, ...xs.map(x => Math.ceil(x / 5) * 5)), bot = Math.min(0, ...xs.map(x => Math.floor(x / 5) * 5));
    const f = frame([0.5, 60.5], [bot, top], { b: 40, l: 38 });
    const r1 = xs.length >= 10 ? corr(xs.slice(0, -1), xs.slice(1)) : null;
    const intro = m === 'ear' ? { en: `<b>EAR(1)</b> with λ = 0.192 (mean 5.2) and φ = ${fx(phi)}: each step draws U; if U ≤ φ then Xₜ = φXₜ₋₁, otherwise Xₜ = φXₜ₋₁ + εₜ with εₜ exponential. Only positive autocorrelation can be represented.`, ar: 'الـ <b><bdi dir="ltr">EAR(1)</bdi></b> بالـ λ والـ φ دول. كل خطوة بنسحب U، ولو أصغر من أو بتساوي φ بنضرب القيمة اللي فاتت في φ بس، غير كده بنزود الـ <bdi dir="ltr">εₜ</bdi> exponential. والـ model ده بيمثل autocorrelation موجبة بس.' }
      : { en: `<b>AR(1)</b> with μ = 5.2, σ̂² = 26.7 (Example 6.10) and φ = ${fx(phi)}: Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ, εₜ normal with σε² = σ̂²(1 − φ²). Here φ can also be negative.`, ar: 'الـ <b><bdi dir="ltr">AR(1)</bdi></b> بالـ mean والـ variance بتوع مثال 6.10. كل قيمة بتتحسب من اللي قبلها والـ <bdi dir="ltr">εₜ</bdi> normal، وهنا الـ φ ممكن تبقى سالبة.' + L('Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ,  σε² = σ̂²(1 − φ²)') };
    const en = last ? last.en + (r1 == null ? '' : ` Lag-1 autocorrelation of the ${xs.length} values: <b>${fx(r1)}</b> (ρ₁ = φ = ${fx(phi)}).`) : intro.en;
    const a = last ? 'دي آخر خطوة اتحسبت.' + last.ar + (r1 == null ? '' : 'والـ <bdi dir="ltr">lag-1</bdi> autocorrelation للقيم المتولّدة قريبة من φ.' + L(`r₁ = ${fx(r1)},  φ = ${fx(phi)}`)) : intro.ar;
    return html`<figure className="fig mf6"><div className="fig-stage">
      <${Tabs} list=${[['ear', 'EAR(1)'], ['ar', 'AR(1)']]} v=${m} set=${k => reset(k, 0.8)} />
      <div className="mf6-row"><label htmlFor="mf6-phi">φ = <b>${fx(phi)}</b></label><input id="mf6-phi" type="range" min=${m === 'ear' ? 0 : -0.95} max="0.95" step="0.05" value=${phi} onInput=${e => reset(null, +e.target.value)} aria-label="phi" /></div>
      <svg viewBox=${`0 0 ${f.W} ${f.H}`} role="img" aria-label="Generated time series">
        <${Axes} f=${f} xt=${[1, 20, 40, 60]} yt=${[bot, (bot + top) / 2, top]} xl="t" yl="Xₜ" />
        <line x1=${f.m.l} x2=${f.W - f.m.r} y1=${f.Y(5.2)} y2=${f.Y(5.2)} stroke="var(--graphite)" strokeWidth="1.2" strokeDasharray="5 5" />
        ${xs.length > 1 && html`<path d=${path(xs.map((x, k) => [f.X(k + 1), f.Y(x)]))} fill="none" stroke="var(--fig-k)" strokeWidth="2" />`}
        ${xs.length > 0 && html`<circle cx=${f.X(xs.length)} cy=${f.Y(xs[xs.length - 1])} r="5" fill="var(--pen)" />`}
      </svg></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><button className="fig-btn solid" onClick=${() => add(1)} disabled=${xs.length >= 60}>Next Xₜ</button><button className="fig-btn" onClick=${() => add(20)} disabled=${xs.length >= 60}>+ 20</button>
        <span className="grow"></span><button className="fig-btn" onClick=${() => reset()}>↻ Reset</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ms-in-gigo': Gigo, 'ms-in-hist-widths': HistWidths, 'ms-in-hist-cells': HistCells, 'ms-in-vehicle-hist': VehicleHist, 'ms-in-chip-hist': ChipHist, 'ms-in-hist-bins': HistBins,
    'ms-in-scatter-corr': ScatterCorr, 'ms-in-scatter-dir': ScatterDir, 'ms-in-families': Families, 'ms-in-qq': QQPlot, 'ms-in-vehicle-est': VehicleEst, 'ms-in-lognormal': Lognormal,
    'ms-in-errors': Errors, 'ms-in-chisq-poisson': ChisqPoisson, 'ms-in-chisq-exp': ChisqExp, 'ms-in-ks': KsTest, 'ms-in-nodata': NoData, 'ms-in-corr': CorrEx, 'ms-in-bivar': Bivar,
    'ms-in-ear-ex': EarEx, 'ms-in-ts-gen': TsGen
  });
})();
/* ── part 7 ── */
// Modeling & Simulation visuals, part 7: L7 (Verification and Validation: Fig 7.1, Example 7.1 trace, Fig 7.2, Naylor-Finger, Turing test, study steps 6-7). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf7-w{ max-width:520px; margin:0 auto; color:var(--ink); }
.mf7-dim{ opacity:.18; transition:opacity .5s; } .mf7-show{ opacity:1; transition:opacity .5s; }
.mf7-hot{ box-shadow:0 0 0 3px var(--k-ms) !important; background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)) !important; }
.mf7-k{ color:var(--k-ms); font-weight:700; }
.mf7-muted{ color:var(--graphite); font-size:.82rem; }
/* Fig 7.1 */
.mf7-b{ display:grid; grid-template-columns:30px minmax(0,1fr); }
.mf7-loop{ grid-column:1; position:relative; }
.mf7-loop.mf7-l1::before{ content:""; position:absolute; left:8px; right:0; top:50%; bottom:0; border-left:2px solid var(--graphite); border-top:2px solid var(--graphite); }
.mf7-loop.mf7-l2::before{ content:""; position:absolute; left:8px; top:0; bottom:0; border-left:2px solid var(--graphite); }
.mf7-loop.mf7-l3::before{ content:""; position:absolute; left:8px; right:0; top:0; bottom:0; border-left:2px solid var(--graphite); }
.mf7-loop.mf7-l3::after{ content:""; position:absolute; left:8px; right:0; top:50%; border-top:2px solid var(--graphite); }
.mf7-loop.mf7-l5::before{ content:""; position:absolute; left:8px; right:0; top:0; bottom:50%; border-left:2px solid var(--graphite); border-bottom:2px solid var(--graphite); }
.mf7-loop .mf7-hd{ position:absolute; right:-4px; top:50%; transform:translateY(-52%); color:var(--graphite); font-size:.8rem; line-height:1; }
.mf7-loop.mf7-hi::before, .mf7-loop.mf7-hi::after{ border-color:var(--k-ms) !important; border-width:3px !important; } .mf7-loop.mf7-hi .mf7-hd{ color:var(--k-ms); }
.mf7-main{ grid-column:2; display:flex; justify-content:center; position:relative; }
.mf7-stub{ position:absolute; left:0; top:50%; border-top:2px solid var(--graphite); transition:opacity .5s; }
.mf7-stub.mf7-ah::after{ content:"▶"; position:absolute; right:-7px; top:-.66em; font-size:.8rem; line-height:1; color:var(--graphite); }
.mf7-stub.mf7-hi{ border-top:3px solid var(--k-ms); } .mf7-stub.mf7-hi::after{ color:var(--k-ms); }
.mf7-rs{ width:120px; height:66px; border-radius:50%; border:1.5px solid var(--graphite); background:var(--paper); display:grid; place-items:center; font-weight:600; font-size:.92rem; text-align:center; line-height:1.2; transition:box-shadow .4s, background .4s, opacity .5s; }
.mf7-cm{ width:100%; border:1.5px solid var(--graphite); border-radius:14px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.35; transition:box-shadow .4s, background .4s, opacity .5s; }
.mf7-cm b{ display:block; font-size:.92rem; }
.mf7-om{ width:210px; max-width:100%; border:1.5px solid var(--graphite); background:var(--paper); padding:8px 12px; text-align:center; font-size:.88rem; line-height:1.3; transition:box-shadow .4s, background .4s, opacity .5s; }
.mf7-om b{ display:block; }
.mf7-dbl{ display:flex; align-items:center; gap:8px; justify-content:center; min-height:44px; font-size:.84rem; transition:opacity .5s, color .4s; }
.mf7-dbl i{ font-style:normal; font-size:1.2rem; line-height:1; color:var(--graphite); }
.mf7-dbl.mf7-hi{ color:var(--k-ms); font-weight:700; } .mf7-dbl.mf7-hi i{ color:var(--k-ms); }
.mf7-cv{ margin:2px 0 6px 30px; font-size:.82rem; color:var(--graphite); transition:color .4s; } .mf7-cv.mf7-hi{ color:var(--k-ms); font-weight:700; }
/* trace */
.mf7-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mf7-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.mf7-modes .fig-btn.mf7-sel{ border-color:var(--k-ms); box-shadow:0 0 0 1px var(--k-ms); background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)); }
.mf7-tb{ width:100%; border-collapse:collapse; font-size:.86rem; text-align:center; background:var(--paper); }
.mf7-tb th, .mf7-tb td{ border:1px solid var(--line); padding:3px 2px; }
.mf7-tb th{ font-size:.76rem; font-weight:700; background:var(--paper-2); letter-spacing:-.01em; }
.mf7-tb tr{ transition:opacity .4s, background .4s; } .mf7-tb tr.mf7-off{ opacity:.15; }
.mf7-tb tr.mf7-cur td{ background:color-mix(in srgb, var(--k-ms) 14%, var(--paper)); }
.mf7-tb td.mf7-bad{ color:var(--pen); font-weight:700; outline:2px solid var(--pen); outline-offset:-2px; }
.mf7-tb td.mf7-fix{ color:var(--ok); font-weight:700; }
.mf7-tl{ position:relative; margin:14px 4px 0; }
.mf7-tl .mf7-lane{ display:flex; height:40px; border-bottom:2px solid var(--graphite); align-items:flex-end; }
.mf7-tl .mf7-seg{ position:relative; height:100%; display:flex; align-items:flex-end; border-left:1px dashed var(--faint); transition:opacity .4s; }
.mf7-tl .mf7-seg .mf7-q{ width:100%; background:var(--fig-s, var(--s-ms)); opacity:.85; transition:height .5s; }
.mf7-tl .mf7-seg.mf7-off{ opacity:0; }
.mf7-tl .mf7-ticks{ position:relative; height:18px; }
.mf7-tl .mf7-ticks span{ position:absolute; top:2px; transform:translateX(-50%); font-size:.76rem; font-family:var(--mono); color:var(--ink); }
.mf7-tl .mf7-ax{ font-size:.76rem; color:var(--graphite); margin-top:2px; }
.mf7-tl .mf7-clk{ position:absolute; top:-4px; height:48px; border-left:3px solid var(--k-ms); transition:left .6s; }
.mf7-sum{ margin-top:10px; padding:8px 10px; border:1px solid var(--line); border-radius:10px; background:var(--paper); font-family:var(--mono); font-size:.84rem; line-height:1.5; overflow-wrap:anywhere; }
.mf7-sum b{ color:var(--k-ms); }
/* Fig 7.2 */
.mf7-c{ display:grid; grid-template-columns:64px minmax(0,1fr) 98px; column-gap:4px; align-items:center; }
.mf7-c .mf7-oval{ grid-column:1; grid-row:1 / span 6; align-self:stretch; border:1.5px solid var(--graphite); border-radius:50%; background:var(--paper); display:grid; place-items:center; text-align:center; font-weight:600; font-size:.86rem; line-height:1.2; padding:0 4px; min-height:270px; }
.mf7-c .mf7-lk{ grid-column:2; text-align:center; font-size:.78rem; line-height:1.25; transition:opacity .5s, color .4s; }
.mf7-c .mf7-lk .mf7-ln{ display:block; height:0; border-top:2px solid var(--graphite); position:relative; margin:4px 2px 0; }
.mf7-c .mf7-lk .mf7-ln::before{ content:"◀"; position:absolute; left:-4px; top:-.62em; font-size:.75rem; color:var(--graphite); }
.mf7-c .mf7-lk .mf7-ln::after{ content:"▶"; position:absolute; right:-4px; top:-.62em; font-size:.75rem; color:var(--graphite); }
.mf7-c .mf7-lk.mf7-hi{ color:var(--k-ms); font-weight:700; } .mf7-c .mf7-lk.mf7-hi .mf7-ln{ border-color:var(--k-ms); } .mf7-c .mf7-lk.mf7-hi .mf7-ln::before, .mf7-c .mf7-lk.mf7-hi .mf7-ln::after{ color:var(--k-ms); }
.mf7-c .mf7-md{ grid-column:3; border:1.5px solid var(--graphite); background:var(--paper); padding:8px 4px; text-align:center; font-size:.84rem; line-height:1.25; transition:opacity .5s, box-shadow .4s, background .4s; }
.mf7-c .mf7-md.mf7-r1{ border-radius:50%; } .mf7-c .mf7-md.mf7-r2{ border-radius:50% 6px 6px 50% / 50% 6px 6px 50%; padding-left:12px; }
.mf7-c .mf7-rv{ grid-column:3; text-align:center; font-size:.8rem; color:var(--graphite); line-height:1.15; padding:2px 0; transition:opacity .5s, color .4s; }
.mf7-c .mf7-rv i{ display:block; font-style:normal; font-size:1rem; }
.mf7-c .mf7-rv.mf7-hi{ color:var(--k-ms); font-weight:700; }
/* cards */
.mf7-cards{ display:grid; gap:8px; }
.mf7-cd{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.88rem; line-height:1.35; transition:opacity .45s, box-shadow .45s, background .45s; }
.mf7-cd .mf7-n{ display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--fig-s, var(--s-ms)); color:#fff; font-weight:700; font-size:.85rem; margin-right:6px; }
.mf7-cd .mf7-s{ display:block; margin-top:4px; font-size:.82rem; color:var(--graphite); }
.mf7-cd.mf7-fade{ opacity:.3; } .mf7-cd.mf7-lit{ box-shadow:0 0 0 2px var(--k-ms); background:color-mix(in srgb, var(--k-ms) 12%, var(--paper)); }
/* Turing */
.mf7-rp{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:6px; }
.mf7-doc{ position:relative; border:1px solid var(--graphite); border-radius:4px; background:var(--paper); padding:6px 4px 4px; text-align:center; font-size:.76rem; line-height:1.15; transition:transform .7s, opacity .5s, box-shadow .4s; }
.mf7-doc .mf7-l{ display:block; height:3px; margin:3px 2px; background:var(--faint); border-radius:2px; }
.mf7-doc .mf7-tg{ display:block; margin-top:3px; font-weight:700; }
.mf7-doc.mf7-real .mf7-tg{ color:var(--ok); } .mf7-doc.mf7-fake .mf7-tg{ color:var(--pen); }
.mf7-doc.mf7-hid .mf7-tg{ color:var(--graphite); }
.mf7-doc.mf7-spot{ box-shadow:0 0 0 2px var(--pen); }
.mf7-lab{ font-size:.82rem; font-weight:600; margin:8px 0 4px; }
.mf7-eng{ margin-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.mf7-eng div{ border:1px solid var(--line); border-radius:10px; padding:8px; font-size:.84rem; line-height:1.3; background:var(--paper); text-align:center; transition:opacity .45s, box-shadow .45s; }
.mf7-eng div.mf7-fade{ opacity:.3; } .mf7-eng div.mf7-lit{ box-shadow:0 0 0 2px var(--k-ms); }
.mf7-eng b{ display:block; }
/* study steps */
.mf7-st{ display:grid; gap:4px; justify-items:center; }
.mf7-st .mf7-row{ display:flex; gap:8px; justify-content:center; width:100%; }
.mf7-box{ border:1.5px solid var(--graphite); background:var(--paper); border-radius:6px; padding:6px 8px; font-size:.86rem; line-height:1.25; text-align:center; min-width:0; flex:1; max-width:220px; transition:box-shadow .4s, background .4s, opacity .4s; }
.mf7-box small{ display:block; font-size:.76rem; color:var(--graphite); }
.mf7-box.mf7-dc{ position:relative; border:0; background:none; padding:16px 36px; max-width:210px; }
.mf7-box.mf7-dc.mf7-hot{ background:none !important; box-shadow:none !important; }
.mf7-box > small, .mf7-box > span{ position:relative; }
.mf7-box .mf7-dsv{ position:absolute; inset:0; width:100%; height:100% !important; max-width:none; }
.mf7-dsv polygon{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.5; vector-effect:non-scaling-stroke; transition:fill .4s; }
.mf7-dc.mf7-hot .mf7-dsv polygon{ fill:color-mix(in srgb, var(--k-ms) 22%, var(--paper)); stroke:var(--k-ms); stroke-width:3; }
.mf7-dn{ font-size:1rem; line-height:1; color:var(--graphite); }
.mf7-ask{ display:flex; gap:8px; justify-content:center; margin-top:10px; flex-wrap:wrap; }
.mf7-path{ margin-top:8px; text-align:center; font-size:.8rem; color:var(--graphite); line-height:1.4; }
@media (prefers-reduced-motion: reduce){ .mf7-tl .mf7-clk, .mf7-doc, .mf7-tl .mf7-seg .mf7-q{ transition:none; } }
`;
  if (!document.getElementById('mf7-css')) { const s = document.createElement('style'); s.id = 'mf7-css'; s.textContent = CSS; document.head.appendChild(s); }
  const vis = on => on ? 'mf7-show' : 'mf7-dim';

  /* ── 7.1, Fig 7.1 (p. 122): model building, verification and validation ── */
  function Build({ ar }) {
    const steps = [
      { en: '<b>Step 1</b>: observe the <b>real system</b>, the interactions among its components, and collect data on its behavior.', ar: 'الـ <b>Step 1</b>: نراقب الـ <b>real system</b> والـ interactions بين مكوناته، ونجمع data عن سلوكه.' },
      { en: '<b>Step 2</b>: build the <b>conceptual model</b>: assumptions on the system components and structure, and hypotheses on the values of the input parameters.', ar: 'الـ <b>Step 2</b>: نبني الـ <b>conceptual model</b>، وهو assumptions عن مكونات الـ system وتركيبه، و hypotheses عن قيم الـ input parameters.' },
      { en: 'The double arrow between the real system and the conceptual model is <b>conceptual validation</b>.', ar: 'السهم المزدوج بين الـ real system والـ conceptual model اسمه <b>Conceptual validation</b>.' },
      { en: '<b>Step 3</b>: translate the model into a computer-recognizable form, the <b>operational model</b> (computerized representation).', ar: 'الـ <b>Step 3</b>: نترجم الموديل لشكل الكمبيوتر يفهمه، وده الـ <b>operational model</b> (الـ computerized representation).' },
      { en: 'The double arrow between the conceptual model and the operational model is <b>model verification</b>: building the model <b>right</b>.', ar: 'السهم المزدوج بين الـ conceptual model والـ operational model اسمه <b>Model verification</b>، يعني بنبني الموديل <b>صح</b> (building the model right).' },
      { en: 'The loop on the left is <b>calibration and validation</b>: it joins the operational model back to the conceptual model and the real system. Model building is <b>not a linear process</b>: the builder goes back to these steps many times.', ar: 'اللفة اللي على الشمال هي الـ <b>Calibration and validation</b>، بترجّع الـ operational model للـ conceptual model وللـ real system. وبناء الموديل <b>مش linear</b>: اللي بيبني بيرجع للخطوات دي كذا مرة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const loop = i >= 5;
    return html`<figure className="fig"><div className="fig-stage"><div className="mf7-w">
      <div className="mf7-b">
        <div className=${'mf7-loop mf7-l1 ' + (loop ? 'mf7-hi ' : '') + vis(loop)}></div>
        <div className="mf7-main"><span className=${'mf7-stub mf7-ah ' + (loop ? 'mf7-hi ' : '') + vis(loop)} style=${{ width: 'calc(50% - 60px)' }}></span><div className=${'mf7-rs' + (i === 0 ? ' mf7-hot' : '')}>Real<br />system</div></div>
        <div className=${'mf7-loop mf7-l2 ' + (loop ? 'mf7-hi ' : '') + vis(loop)}></div>
        <div className="mf7-main"><div className=${'mf7-dbl ' + vis(i >= 2) + (i === 2 ? ' mf7-hi' : '')}><i>↕</i><span>Conceptual validation</span></div></div>
        <div className=${'mf7-loop mf7-l3 ' + (loop ? 'mf7-hi ' : '') + vis(loop)}><span className="mf7-hd">▶</span></div>
        <div className="mf7-main"><div className=${'mf7-cm ' + vis(i >= 1) + (i === 1 ? ' mf7-hot' : '')}><b>Conceptual model</b>Assumptions on system components<br />Structural assumptions, which define the interactions between system components<br />Input parameters and data assumptions</div></div>
        <div className=${'mf7-loop mf7-l2 ' + (loop ? 'mf7-hi ' : '') + vis(loop)}></div>
        <div className="mf7-main"><div className=${'mf7-dbl ' + vis(i >= 4) + (i === 4 ? ' mf7-hi' : '')}><i>↕</i><span>Model verification</span></div></div>
        <div className=${'mf7-loop mf7-l5 ' + (loop ? 'mf7-hi ' : '') + vis(loop)}></div>
        <div className="mf7-main"><span className=${'mf7-stub ' + (loop ? 'mf7-hi ' : '') + vis(loop)} style=${{ width: 'calc(50% - 105px)' }}></span><div className=${'mf7-om ' + vis(i >= 3) + (i === 3 ? ' mf7-hot' : '')}><b>Operational model</b>(Computerized representation)</div></div>
      </div>
      <div className=${'mf7-cv ' + vis(loop) + (loop ? ' mf7-hi' : '')}>↺ Calibration and Validation</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── Example 7.1 (Table 7.1, p. 124): the trace, and L̂Q computed from it ── */
  const TR = [[0, 'Start', 0, 0], [3, 'Arrival', 1, 0], [5, 'Depart', 0, 0], [11, 'Arrival', 1, 0], [12, 'Arrival', 2, 1], [16, 'Depart', 1, 1]];
  function Trace({ ar }) {
    const [mode, setMode] = useState(0); // 0 as printed, 1 STATUS corrected (‡ our check)
    const rows = TR.map(([c, e, n, s]) => { const st = mode === 1 && n >= 1 ? 1 : s; return { c, e, n, s: st, bad: n >= 1 && s === 0, q: n - st }; });
    const T = 16, segs = rows.slice(0, -1).map((r, k) => ({ a: r.c, b: rows[k + 1].c, len: rows[k + 1].c - r.c, q: r.q }));
    const terms = segs.map(g => `${g.q}×${g.len}`), total = segs.reduce((s, g) => s + g.q * g.len, 0);
    const fmt = x => String(+x.toFixed(4));
    const steps = [];
    steps.push(mode === 0
      ? { en: 'Start: CLOCK = 0, nobody in the system (NCUST = 0), server idle (STATUS = 0). Queue length = NCUST − STATUS.', ar: 'البداية: مفيش حد في الـ system والـ server فاضي.<span class="ltr">CLOCK = 0, NCUST = 0, STATUS = 0</span>وطول الـ queue بنحسبه كده:<span class="ltr">queue = NCUST − STATUS</span>' }
      : { en: '‡ Our check (not in the notes): the same trace with STATUS = 1 whenever NCUST ≥ 1, as correct logic requires.', ar: 'ده حسابنا ‡ (مش في الـ notes): نفس الـ trace بس الـ STATUS بيبقى 1 كل ما يكون فيه customer.<span class="ltr">STATUS = 1 if NCUST ≥ 1</span>' });
    for (let k = 1; k < rows.length; k++) {
      const g = segs[k - 1], r = rows[k], so = terms.slice(0, k).join(' + '), sv = segs.slice(0, k).reduce((s, x) => s + x.q * x.len, 0);
      let en = `Clock moves ${g.a} → ${g.b}: for ${g.len} time units the queue held ${g.q} (${g.q}×${g.len} = ${g.q * g.len}). Running Σ i·TᵢQ = ${sv}. Now ${r.e}: NCUST = ${r.n}, STATUS = ${r.s}.`;
      let a = `الـ clock بيتحرك، وطول الـ queue في الفترة دي:<span class="ltr">${g.a} → ${g.b}: ${g.q}×${g.len} = ${g.q * g.len}, Σ = ${sv}</span>وبعد الـ ${r.e}:<span class="ltr">NCUST = ${r.n}, STATUS = ${r.s}</span>`;
      if (mode === 0 && r.bad && r.c === 3) { en += ' <b>Error found</b>: a customer is in the system but the server is idle. This is incorrect logic.'; a += 'و<b>لقينا error</b>: فيه customer في الـ system والـ server فاضي، وده logic غلط.'; }
      if (mode === 0 && r.bad && r.c === 11) { en += ' ‡ The same error again (NCUST = 1, STATUS = 0); the notes only point out CLOCK = 3.'; a += 'ونفس الـ error بيتكرر تاني ‡ (والـ notes بتشاور على أول مرة بس):<span class="ltr">CLOCK = 11: NCUST = 1, STATUS = 0</span>'; }
      if (r.c === T) { en += ' The run ends at T = 16.'; a += 'والـ run بيخلص هنا:<span class="ltr">T = 16</span>'; }
      steps.push({ en, ar: a });
    }
    steps.push(mode === 0
      ? { en: `L̂Q = (1/T) Σ i·TᵢQ = (${terms.join(' + ')}) / 16 = ${total}/16 = <b>${fmt(total / T)}</b>, the value the program reported. The arithmetic is right for the STATUS values printed, but the result is <b>wrong</b> because STATUS did not have the correct value.`, ar: `الـ program حسب الرقم ده:<span class="ltr">L̂Q = (${terms.join(' + ')}) / 16 = ${total}/16 = ${fmt(total / T)}</span>والحسبة نفسها صح بالـ STATUS اللي اتطبع، بس النتيجة <b>غلط</b> لأن الـ STATUS مكانش بالقيمة الصح.` }
      : { en: `‡ With STATUS correct, only 12 to 16 has a customer waiting: L̂Q = (${terms.join(' + ')}) / 16 = ${total}/16 = <b>${fmt(total / T)}</b> (our calculation, not in the notes).`, ar: `لو الـ STATUS صح ‡، الفترة من 12 لـ 16 بس فيها حد مستني:<span class="ltr">L̂Q = (${terms.join(' + ')}) / 16 = ${total}/16 = ${fmt(total / T)}</span>وده حسابنا مش في الـ notes.` });
    const [i, ctl] = useSteps(steps.length, 2600);
    const first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } ctl.go(0); }, [mode]);
    const shown = Math.min(i, rows.length - 1), clockAt = rows[shown].c;
    const done = segs.filter((_, k) => k < shown);
    return html`<figure className="fig"><div className="fig-stage"><div className="mf7-w">
      <div className="mf7-modes">
        <button className=${'fig-btn' + (mode === 0 ? ' mf7-sel' : '')} onClick=${() => setMode(0)}>Trace as printed</button>
        <button className=${'fig-btn' + (mode === 1 ? ' mf7-sel' : '')} onClick=${() => setMode(1)}>‡ STATUS corrected</button>
      </div>
      <table className="mf7-tb"><thead><tr><th>CLOCK</th><th>EVTYP</th><th>NCUST</th><th>STATUS</th><th>Queue</th></tr></thead><tbody>
        ${rows.map((r, k) => html`<tr key=${k} className=${k > shown ? 'mf7-off' : k === shown && i < steps.length - 1 ? 'mf7-cur' : ''}>
          <td>${r.c}</td><td>${r.e}</td><td>${r.n}</td>
          <td className=${mode === 0 && r.bad && k <= shown ? 'mf7-bad' : mode === 1 && TR[k][2] >= 1 && TR[k][3] === 0 ? 'mf7-fix' : ''}>${r.s}</td><td>${r.q}</td></tr>`)}
      </tbody></table>
      <div className="mf7-tl" aria-label="Queue length over time">
        <div className="mf7-lane">${segs.map((g, k) => html`<div key=${k} className=${'mf7-seg' + (k < shown ? '' : ' mf7-off')} style=${{ width: (g.len / T * 100) + '%' }}><div className="mf7-q" style=${{ height: (g.q * 50) + '%' }}></div></div>`)}</div>
        <div className="mf7-clk" style=${{ left: `calc(${clockAt / T * 100}% - 1px)` }}></div>
        <div className="mf7-ticks">${rows.map((r, k) => html`<span key=${k} style=${{ left: (r.c / T * 100) + '%', top: r.c === 12 ? '16px' : '2px' }}>${r.c}</span>`)}</div>
        <div className="mf7-ax" style=${{ marginTop: '16px' }}>Queue length (NCUST − STATUS) against CLOCK</div>
      </div>
      <div className="mf7-sum">Σ i·TᵢQ = ${done.length ? done.map(g => `${g.q}×${g.len}`).join(' + ') + ' = ' : ''}<b>${done.reduce((s, g) => s + g.q * g.len, 0)}</b>${i === steps.length - 1 ? html`<br />L̂Q = ${total}/16 = <b>${fmt(total / T)}</b>` : ''}</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 7.3, Fig 7.2 (p. 126): iterative process of calibrating a model ── */
  function Calib({ ar }) {
    const steps = [
      { en: 'Start with the <b>initial model</b> and <b>compare the model to reality</b> (the real system).', ar: 'نبدأ بالـ <b>Initial model</b> و<b>نقارنه بالواقع</b> (الـ real system).' },
      { en: '<b>Revise</b> it into the <b>first revision of the model</b>, then <b>compare the revised model to reality</b>.', ar: 'نعمل <b>Revise</b> فيطلع الـ <b>First revision of model</b>، وبعدين نقارن الموديل المعدّل بالواقع.' },
      { en: '<b>Revise</b> again into the <b>second revision of the model</b>, then <b>compare the second revision to reality</b>.', ar: 'نعمل <b>Revise</b> تاني فيطلع الـ <b>Second revision of model</b>، ونقارنه بالواقع.' },
      { en: 'And <b>revise</b> again: comparing and revising the conceptual and operational model goes on <b>until the model is judged accurate</b>.', ar: 'ونعمل <b>Revise</b> تاني: المقارنة والتعديل في الـ conceptual والـ operational model بيكملوا <b>لحد ما الموديل يتحكم عليه إنه accurate</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const lk = (k, t) => html`<div className=${'mf7-lk ' + vis(i >= k) + (i === k ? ' mf7-hi' : '')}>${t}<span className="mf7-ln"></span></div>`;
    const md = (k, cls, t) => html`<div className=${'mf7-md ' + cls + ' ' + vis(i >= k) + (i === k ? ' mf7-hot' : '')}>${t}</div>`;
    const rv = k => html`<div className=${'mf7-rv ' + vis(i >= k) + (i === k ? ' mf7-hi' : '')}><i>↓</i>Revise</div>`;
    return html`<figure className="fig"><div className="fig-stage"><div className="mf7-w">
      <div className="mf7-c">
        <div className="mf7-oval">Real<br />system</div>
        ${lk(0, 'Compare model to reality')}${md(0, 'mf7-r0', 'Initial model')}
        <div></div>${rv(1)}
        ${lk(1, 'Compare revised model to reality')}${md(1, 'mf7-r1', 'First revision of model')}
        <div></div>${rv(2)}
        ${lk(2, 'Compare second revision to reality')}${md(2, 'mf7-r2', 'Second revision of model')}
        <div></div>${rv(3)}
      </div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 7.3, Naylor and Finger [1967]: three-step approach to validation ── */
  function Naylor({ ar }) {
    const C = [
      ['Build a model that has <b>high face validity</b>.', '7.3.1 Face validity: involve potential users; sensitivity analysis.'],
      ['<b>Validate model assumptions</b>.', '7.3.2 Structural assumptions and data assumptions.'],
      ['<b>Compare the model input-output transformations</b> to the corresponding input-output transformations of the real system.', '7.3.3 Validating input-output transformations; 7.3.4 using historical input data; 7.3.5 using a Turing test.']
    ];
    const steps = [
      { en: 'Naylor and Finger [1967] proposed a <b>three-step approach</b> to validation.', ar: 'الـ Naylor and Finger [1967] اقترحوا <b>3 خطوات</b> للـ validation.' },
      { en: '(1) Build a model with <b>high face validity</b> (section 7.3.1).', ar: '(1) نبني موديل عنده <b>high face validity</b> (الجزء 7.3.1).' },
      { en: '(2) <b>Validate the model assumptions</b>: structural and data (section 7.3.2).', ar: '(2) نعمل <b>validate للـ model assumptions</b> بنوعيها الـ structural و الـ data (الجزء 7.3.2).' },
      { en: '(3) <b>Compare the input-output transformations</b> of the model with those of the real system (sections 7.3.3 to 7.3.5).', ar: '(3) <b>نقارن الـ input-output transformations</b> بتاعة الموديل باللي في الـ real system (الأجزاء من 7.3.3 لـ 7.3.5).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    return html`<figure className="fig"><div className="fig-stage"><div className="mf7-w mf7-cards">
      ${C.map(([t, s], k) => html`<div key=${k} className=${'mf7-cd ' + (i === 0 || i === k + 1 ? 'mf7-lit' : i > k + 1 ? '' : 'mf7-fade')}><span className="mf7-n">${k + 1}</span>${html`<span dangerouslySetInnerHTML=${{ __html: t }}></span>`}<span className="mf7-s">${s}</span></div>`)}
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 7.3.5: input-output validation using a Turing test ── */
  const SHUF = [3, 7, 0, 9, 5, 1, 8, 4, 6, 2]; // a fixed shuffle so the step-through is the same each time
  function Turing({ ar }) {
    const steps = [
      { en: 'Prepare <b>5 real reports</b> of system performance over 5 different days.', ar: 'نجهز <b>5 تقارير حقيقية</b> عن أداء الـ system في 5 أيام مختلفة.' },
      { en: 'Use simulation output to produce <b>5 fake reports</b>, in exactly the same format: <b>10 reports</b> in all.', ar: 'نستخدم الـ simulation output ونطلع <b>5 تقارير fake</b> بنفس الـ format بالظبط، فيبقى عندنا <b>10 تقارير</b>.' },
      { en: 'The 10 reports are <b>shuffled randomly</b> and given to an engineer, who must say which are fake and which are real.', ar: 'الـ 10 تقارير <b>بيتلخبطوا عشوائياً</b> ويتدّوا لـ engineer، وهو يقول أنهي fake وأنهي real.' },
      { en: 'If the engineer <b>identifies the fake reports</b>, the model builder questions the engineer and uses the information to <b>improve the model</b>.', ar: 'لو الـ engineer <b>عرف التقارير الـ fake</b>، اللي عامل الموديل يسأله ويستخدم المعلومات دي عشان <b>يحسّن الموديل</b>.' },
      { en: 'If the engineer <b>cannot distinguish</b> them, the modeler concludes the model is <b>adequate</b>. The Turing test detects model inadequacies and increases model credibility.', ar: 'لو الـ engineer <b>مقدرش يفرّق</b> بينهم، يبقى الموديل <b>adequate</b>. والـ Turing test بيكشف عيوب الموديل وبيزوّد الـ credibility بتاعته.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const docs = Array.from({ length: 10 }, (_, k) => ({ real: k < 5, day: k % 5 + 1 }));
    const order = i >= 2 ? SHUF : docs.map((_, k) => k);
    const doc = (d, k) => { const hid = i === 2 || i === 4; const show = d.real ? true : i >= 1;
      return html`<div key=${k} className=${'mf7-doc ' + (d.real ? 'mf7-real' : 'mf7-fake') + (hid ? ' mf7-hid' : '') + (i === 3 && !d.real ? ' mf7-spot' : '') + ' ' + vis(show)}>
        <b>Day ${d.day}</b><span className="mf7-l"></span><span className="mf7-l"></span><span className="mf7-l"></span>
        <span className="mf7-tg">${hid ? '?' : d.real ? 'real' : 'fake'}</span></div>`; };
    return html`<figure className="fig"><div className="fig-stage"><div className="mf7-w">
      ${i < 2 ? html`<div className="mf7-lab">Real system: 5 days</div><div className="mf7-rp">${docs.slice(0, 5).map(doc)}</div>
        <div className="mf7-lab">Simulation output: 5 days, same format</div><div className="mf7-rp">${docs.slice(5).map((d, k) => doc(d, k + 5))}</div>`
      : html`<div className="mf7-lab">10 shuffled reports, given to an engineer</div><div className="mf7-rp">${order.map(k => doc(docs[k], k))}</div>`}
      <div className=${'mf7-eng ' + vis(i >= 3)}>
        <div className=${i === 3 ? 'mf7-lit' : i === 4 ? 'mf7-fade' : ''}><b>Fakes identified</b>question the engineer, improve the model</div>
        <div className=${i === 4 ? 'mf7-lit' : i === 3 ? 'mf7-fade' : ''}><b>Cannot distinguish</b>the model is adequate</div>
      </div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 59-60 as linked in the notes: steps 3-8 of a simulation study, drive the two checks ── */
  function Study({ ar }) {
    // state: 'build' (3, 4 then 5), 'ver' at step 6, 'val' at step 7, 'done' at step 8
    const [st, setSt] = useState('build'), [path, setPath] = useState(['3 + 4', '5']);
    const go = (s, add) => { setSt(s); setPath(p => p.concat(add)); };
    const reset = () => { setSt('build'); setPath(['3 + 4', '5']); };
    const msg = {
      build: { en: 'Phase 2, model building and data collection: <b>3 Model conceptualization</b> and <b>4 Data collection</b>, then <b>5 Model translation</b>. Press Next to reach the first check.', ar: 'الـ Phase 2 (model building and data collection): الخطوة 3 الـ <b>Model conceptualization</b> والخطوة 4 الـ <b>Data collection</b>، وبعدين الخطوة 5 الـ <b>Model translation</b>. دوس Next عشان توصل لأول check.' },
      ver: { en: '<b>Step 6, Verified?</b> Does the program do what the model describes? Choose an answer.', ar: 'الخطوة 6 الـ <b>Verified?</b> يعني هل الـ program بيعمل اللي الموديل بيوصفه؟ اختار إجابة.' },
      verNo: { en: '<b>Not verified</b>: go back to <b>step 5, model translation</b>, and fix the program. Then check again.', ar: 'لو <b>مش verified</b> نرجع للخطوة 5 الـ <b>model translation</b> ونصلح الـ program، وبعدين نشيّك تاني.' },
      val: { en: '<b>Step 7, Validated?</b> Do the results match the reality? (Calibration.) It is the <b>most crucial step</b>: an invalid model can lead to dangerous and expensive decisions.', ar: 'الخطوة 7 الـ <b>Validated?</b> يعني هل النتايج بتطابق الواقع؟ (Calibration). ودي <b>أهم خطوة</b>، لأن الموديل الـ invalid ممكن يودّي لقرارات خطيرة ومكلفة.' },
      valNo: { en: '<b>Not validated</b>: go back to <b>step 3, model conceptualization</b>, and <b>step 4, data collection</b>, then through 5 and 6 again.', ar: 'لو <b>مش validated</b> نرجع للخطوة 3 الـ <b>model conceptualization</b> والخطوة 4 الـ <b>data collection</b>، ونعدّي على 5 و 6 تاني.' },
      done: { en: '<b>Verified and validated</b>: go on to <b>step 8, experimental design</b> (Phase 3, run the model).', ar: 'لو <b>verified و validated</b> نكمل على الخطوة 8 الـ <b>experimental design</b> (الـ Phase 3، تشغيل الموديل).' }
    };
    const [note, setNote] = useState(null);
    const m = msg[note || st];
    const hot = note === 'verNo' ? ['5'] : { build: ['3', '4', '5'], ver: ['6'], val: ['7'], done: ['8'] }[st];
    const B = (k, t, cls) => html`<div className=${'mf7-box' + (cls ? ' ' + cls : '') + (hot.includes(k) ? ' mf7-hot' : '')}>${cls === 'mf7-dc' && html`<svg className="mf7-dsv" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="50,1 99,50 50,99 1,50" /></svg>`}<small>${k}</small><span>${t}</span></div>`;
    return html`<figure className="fig"><div className="fig-stage"><div className="mf7-w mf7-st">
      <div className="mf7-row">${B('3', 'Model conceptualization')}${B('4', 'Data collection')}</div>
      <span className="mf7-dn">↓</span>${B('5', 'Model translation')}
      <span className="mf7-dn">↓</span>${B('6', 'Verified?', 'mf7-dc')}
      <span className="mf7-muted">No → back to 5</span>
      <span className="mf7-dn">↓ Yes</span>${B('7', 'Validated?', 'mf7-dc')}
      <span className="mf7-muted">No → back to 3 and 4</span>
      <span className="mf7-dn">↓ Yes</span>${B('8', 'Experimental design')}
      <div className="mf7-ask">
        ${st === 'build' && html`<button className="fig-btn solid" onClick=${() => { setNote(null); go('ver', '6'); }}>Next ›</button>`}
        ${st === 'ver' && html`<button className="fig-btn" onClick=${() => { setNote('verNo'); setSt('build'); setPath(p => p.concat('No → 5')); }}>No</button><button className="fig-btn solid" onClick=${() => { setNote(null); go('val', '7'); }}>Yes</button>`}
        ${st === 'val' && html`<button className="fig-btn" onClick=${() => { setNote('valNo'); setSt('build'); setPath(p => p.concat('No → 3 + 4', '5')); }}>No</button><button className="fig-btn solid" onClick=${() => { setNote(null); go('done', '8'); }}>Yes</button>`}
        ${(path.length > 2 || st !== 'build') && html`<button className="fig-btn" onClick=${() => { setNote(null); reset(); }}>↻ Start over</button>`}
      </div>
      <div className="mf7-path">Path: ${path.join(' → ')}</div>
    </div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'ms-vv-build': Build, 'ms-vv-trace': Trace, 'ms-vv-calib': Calib, 'ms-vv-naylor': Naylor, 'ms-vv-turing': Turing, 'ms-vv-study': Study });
})();
/* ── part 8 ── */
// Modeling & Simulation visuals, part 8: L8 Case Studies (labs, quizzes and the book's chapter 8). Every label and number comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mf8 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mf8 .fig-btn.mf8-sel{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mf8-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.mf8-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.mf8-note{ text-align:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; line-height:1.45; }
.mf8-vars{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 0 10px; }
.mf8-vars span{ font:600 .8rem/1.3 var(--mono); padding:3px 8px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:border-color .3s, background .3s; }
.mf8-vars span.ch{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
/* flowcharts */
.mf8-fl{ display:flex; flex-direction:column; align-items:center; max-width:340px; margin:0 auto; }
.mf8-nd{ box-sizing:border-box; width:100%; padding:7px 10px; text-align:center; font-size:.86rem; line-height:1.32; color:var(--ink); background:var(--paper); border:1.5px solid var(--graphite); border-radius:4px; transition:background .35s, border-color .35s; overflow-wrap:anywhere; }
.mf8-nd.t{ border-radius:99px; width:64%; }
.mf8-nd.d{ border:0; clip-path:polygon(16px 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0 50%); background:color-mix(in srgb, var(--graphite) 16%, var(--paper)); padding:9px 22px; }
.mf8-nd.io{ border:0; clip-path:polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%); background:color-mix(in srgb, var(--graphite) 11%, var(--paper)); padding:7px 20px; }
.mf8-nd.on{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); border-color:var(--fig-k); font-weight:600; }
.mf8-arw{ font-size:.95rem; line-height:1.1; color:var(--graphite); margin:1px 0; }
.mf8-gap{ height:10px; }
.mf8-brs{ display:flex; gap:5px; justify-content:center; flex-wrap:wrap; margin:4px 0 0; width:100%; }
.mf8-brs span{ font-size:.78rem; line-height:1.3; padding:2px 7px; border-radius:6px; border:1px dashed var(--line); color:var(--graphite); transition:background .3s, color .3s, border-color .3s; }
.mf8-brs span.on{ border:1px solid var(--fig-k); color:var(--ink); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); font-weight:600; }
.mf8-pair{ display:grid; grid-template-columns:1fr 1fr; gap:8px; width:100%; margin-top:2px; }
.mf8-pair > div{ display:flex; flex-direction:column; align-items:center; }
.mf8-pair .lb{ font-size:.8rem; color:var(--graphite); }
/* tables */
.mf8-tb{ border-collapse:collapse; margin:0 auto; font-size:.8rem; font-variant-numeric:tabular-nums; }
.mf8-tb th, .mf8-tb td{ border:1px solid var(--line); padding:3px 5px; text-align:center; background:var(--paper); color:var(--ink); white-space:nowrap; transition:background .3s; }
.mf8-tb th{ background:var(--paper-2); color:var(--graphite); font-weight:600; }
.mf8-tb tr.cur td{ background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.mf8-tb tr.off td{ color:transparent; }
.mf8-tb tr.tot td{ font-weight:700; background:var(--paper-2); }
.mf8-tb td.y{ color:var(--ok); font-weight:700; } .mf8-tb td.n{ color:var(--pen); font-weight:700; }
.mf8-tb input{ font:inherit; width:2.6em; padding:2px; text-align:center; border:1px solid var(--line); border-radius:5px; background:var(--paper); color:var(--ink); box-sizing:border-box; }
.mf8-tb.cmp th, .mf8-tb.cmp td{ padding:3px 2px; }
.mf8-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.55; color:var(--ink); margin:10px auto 0; max-width:440px; overflow-wrap:anywhere; transition:opacity .4s; }
.mf8-card.off{ opacity:.4; }
.mf8-f{ font-family:var(--mono); font-size:.8rem; }
.mf8-big{ font-weight:700; color:var(--fig-k); }
.mf8-ok{ color:var(--ok); font-weight:700; } .mf8-bad{ color:var(--pen); font-weight:700; }
.mf8-num{ display:inline-flex; align-items:center; gap:4px; font-size:.86rem; color:var(--ink); }
.mf8-num b{ font-family:var(--mono); min-width:2.2em; text-align:center; }
.mf8-num .fig-btn{ min-width:32px; padding:2px 8px; }
.mf8-nav{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding:0 14px 12px; }
.mf8-nav .grow{ flex:1; } .mf8-nav .cnt{ font-size:.84rem; color:var(--graphite); }
/* bars */
.mf8-bars{ display:grid; gap:6px; max-width:440px; margin:0 auto; }
.mf8-bar{ display:grid; grid-template-columns:3.4em minmax(0, 1fr) 4.2em; align-items:center; gap:6px; font-size:.84rem; color:var(--ink); background:none; border:0; padding:0; font-family:inherit; text-align:left; cursor:pointer; }
.mf8-bar .trk{ position:relative; height:18px; background:var(--paper); border:1px solid var(--line); border-radius:4px; overflow:hidden; }
.mf8-bar .trk i{ position:absolute; top:0; bottom:0; background:color-mix(in srgb, var(--fig-k) 50%, var(--paper)); transition:width .6s ease, left .6s ease; }
.mf8-bar .trk i.neg{ background:color-mix(in srgb, var(--pen) 45%, var(--paper)); }
.mf8-bar .trk b{ position:absolute; top:-1px; bottom:-1px; width:1.5px; background:var(--graphite); }
.mf8-bar .v{ font-family:var(--mono); text-align:right; font-size:.8rem; }
.mf8-bar.best .v, .mf8-bar.best .q{ color:var(--fig-k); font-weight:700; }
.mf8-bar.sel .trk{ box-shadow:0 0 0 2px var(--fig-k); }
/* chips */
.mf8-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 0 10px; }
.mf8-chips button, .mf8-chips span{ font:inherit; font-size:.8rem; border:1px solid var(--line); border-radius:99px; background:var(--paper); color:var(--ink); padding:3px 9px; min-height:28px; box-sizing:border-box; display:inline-flex; align-items:center; gap:4px; }
.mf8-chips button{ cursor:pointer; }
.mf8-chips .sel{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); border-color:var(--fig-k); }
.mf8-chips .best{ box-shadow:0 0 0 1.5px var(--ok); }
.mf8-chips b{ font-family:var(--mono); }
@media (prefers-reduced-motion: reduce){ .mf8-nd, .mf8-brs span, .mf8-bar .trk i, .mf8-tb th, .mf8-tb td, .mf8-card{ transition:none; } }
`;
  if (!document.getElementById('mf8-css')) { const s = document.createElement('style'); s.id = 'mf8-css'; s.textContent = CSS; document.head.appendChild(s); }

  // ── shared helpers ──
  const L = s => `<span class="ltr">${s}</span>`;
  const fx = (x, d) => { const s = (Math.round(x * 10 ** d) / 10 ** d).toFixed(d); return /^-0\.?0*$/.test(s) ? s.slice(1) : s; };
  const mn = s => String(s).replace(/^-/, '−');
  const sum = a => a.reduce((p, q) => p + q, 0);
  const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1)); // integer in [lo, hi], both ends included
  // step-through that restarts whenever sig changes; atEnd jumps to the last step
  function useRun(n, ms, sig, atEnd) {
    const [i, setI] = useState(atEnd || calm() ? n - 1 : 0), [play, setPlay] = useState(!atEnd && !calm());
    const first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(atEnd || calm() ? n - 1 : 0); setPlay(!atEnd && !calm()); }, [sig]);
    const ii = Math.min(i, n - 1);
    useEffect(() => { if (!play) return; if (ii >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(x, n - 1) + 1), ms); return () => clearTimeout(t); }, [ii, play, n]);
    return [ii, { replay: () => { setI(0); setPlay(!calm()); }, go: j => { setPlay(false); setI(j); } }];
  }
  const Nav = ({ i, n, ctl }) => html`<div className="mf8-nav"><span className="cnt">Step ${i + 1} of ${n}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${() => ctl.go(n - 1)} disabled=${i === n - 1}>End »</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Seg = ({ opts, v, set }) => html`<div className="mf8-row" role="tablist">${opts.map(([k, lab]) => html`<button key=${k} role="tab" aria-selected=${v === k} className=${'fig-btn' + (v === k ? ' mf8-sel' : '')} onClick=${() => set(k)}>${lab}</button>`)}</div>`;
  const Num = ({ lab, v, set, min, max, step = 1, fmt }) => html`<span className="mf8-num">${lab}<button className="fig-btn" onClick=${() => set(Math.max(min, +(v - step).toFixed(4)))} disabled=${v <= min} aria-label=${'Decrease ' + lab}>−</button><b>${fmt ? fmt(v) : v}</b><button className="fig-btn" onClick=${() => set(Math.min(max, +(v + step).toFixed(4)))} disabled=${v >= max} aria-label=${'Increase ' + lab}>+</button></span>`;
  const Vars = ({ v, prev }) => v ? html`<div className="mf8-vars">${Object.entries(v).map(([k, x]) => html`<span key=${k} className=${prev && prev[k] !== undefined && prev[k] !== x ? 'ch' : ''}>${k} = ${x}</span>`)}</div>` : null;

  // flowchart: nodes [{ id, k: 't'|'p'|'d'|'io', en, y, n, cut, pair }] drawn top to bottom; at = current node, br = 'y' | 'n' | 0 | 1
  function Flow({ nodes, at, br }) {
    return html`<div className="mf8-fl">${nodes.map((n, j) => html`<${React.Fragment} key=${n.id}>
      ${j === 0 ? null : n.cut ? html`<div className="mf8-gap"></div>` : html`<div className="mf8-arw" aria-hidden="true">↓</div>`}
      <div className=${'mf8-nd ' + (n.k || 'p') + (at === n.id ? ' on' : '')} dangerouslySetInnerHTML=${{ __html: n.en }}></div>
      ${n.y || n.n ? html`<div className="mf8-brs">${n.y ? html`<span className=${at === n.id && br === 'y' ? 'on' : ''} dangerouslySetInnerHTML=${{ __html: (n.yl || 'Yes') + ' → ' + n.y }}></span>` : null}${n.n ? html`<span className=${at === n.id && br === 'n' ? 'on' : ''} dangerouslySetInnerHTML=${{ __html: (n.nl || 'No') + ' → ' + n.n }}></span>` : null}</div>` : null}
      ${n.pair ? html`<div className="mf8-pair">${n.pair.map((p, k) => html`<div key=${k}><span className="lb">${p.lb} ↓</span>${p.en.map((t, m) => html`<${React.Fragment} key=${m}>${m ? html`<div className="mf8-arw" aria-hidden="true">↓</div>` : null}<div className=${'mf8-nd' + (at === n.id && br === k ? ' on' : '')} dangerouslySetInnerHTML=${{ __html: t }}></div><//>`)}</div>`)}</div>` : null}
    <//>`)}</div>`;
  }
  // a flowchart walked step by step: steps [{ at, br, v, en, ar }]
  function Walk({ ar, nodes, steps, ms, top }) {
    const [i, ctl] = useSteps(steps.length, ms || 2100), s = steps[i];
    return html`<figure className="fig mf8"><div className="fig-stage">${top || null}<${Vars} v=${s.v} prev=${i ? steps[i - 1].v : null} /><${Flow} nodes=${nodes} at=${s.at} br=${s.br} /></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} />${steps.length > 12 ? html`<${Nav} i=${i} n=${steps.length} ctl=${ctl} />` : html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [2] the standard algorithm for a random number in [Low, High] ── */
  function RandAlg({ ar }) {
    const [mode, setMode] = useState('ex'), [lo, setLo] = useState(1), [hi, setHi] = useState(10), [r1, setR1] = useState(0.5), [isInt, setInt] = useState(true), [tally, setTally] = useState(null);
    const pick = m => { setMode(m); setTally(null); if (m === 'ex') { setLo(1); setHi(10); setR1(0.5); setInt(true); } else setR1(Math.random()); };
    const r1s = mode === 'ex' ? '0.5' : fx(r1, 4), r2 = r1 * (hi - lo), r2s = mode === 'ex' ? '4.5' : fx(r2, 4), t = Math.floor(r2), R = isInt ? lo + t : lo + r2, Rs = isInt ? String(R) : fx(R, 4);
    const n = 6, sig = [mode, lo, hi, r1, isInt].join();
    const [i, ctl] = useRun(n, 1500, sig);
    const box = (k, title, val) => html`<div className=${'mf8-nd' + (i === k ? ' on' : '')} style=${{ opacity: i >= k ? 1 : .3 }}><b>${title}</b><br /><span className="mf8-f" dangerouslySetInnerHTML=${{ __html: i >= k ? val : '·' }}></span></div>`;
    const draw = () => { const c = {}; for (let v = lo; v <= hi; v++) c[v] = 0; for (let k = 0; k < 1000; k++) c[lo + Math.floor(Math.random() * (hi - lo))]++; setTally(c); };
    const caps = [
      { en: `Step (1): generate an integer <b>R0 = rand()</b>, from 0 up to RAND_MAX (a macro that gives the maximum value rand() returns).`, ar: `الخطوة (1): بنطلع integer عشوائي${L('R0 = rand()')}وقيمته من 0 لحد الـ RAND_MAX (ده macro بيدّي أكبر قيمة الـ <bdi dir="ltr">rand()</bdi> ممكن ترجعها).` },
      { en: `Step (2) <b>normalization</b>: R1 = R0 / (RAND_MAX + 1) = <b>${r1s}</b>. Because R0 ≤ RAND_MAX, R1 is always in [0, 1).`, ar: `الخطوة (2) هي الـ <b>normalization</b>:${L(`R1 = R0 / (RAND_MAX + 1) = ${r1s}`)}ولأن الـ R0 عمره ما يعدي الـ RAND_MAX فالـ R1 دايماً جوه ${L('[0, 1)')}` },
      { en: `Step (3) <b>scaling</b> by the interval length: R2 = R1 × (High − Low) = ${r1s} × (${hi} − ${lo}) = <b>${r2s}</b>.`, ar: `الخطوة (3) هي الـ <b>scaling</b> بطول الفترة:${L(`R2 = R1 × (High − Low) = ${r1s} × (${hi} − ${lo}) = ${r2s}`)}` },
      isInt ? { en: `Step (4) for integers, <b>truncation</b>: int(${r2s}) = <b>${t}</b>.`, ar: `الخطوة (4) للـ integers بنعمل <b>truncation</b>:${L(`int(${r2s}) = ${t}`)}` } : { en: 'Step (4): a real number skips the truncation.', ar: 'الخطوة (4): الرقم الـ real مش محتاج truncation.' },
      { en: `Step (5) <b>translation</b>: R = ${isInt ? t : r2s} + Low = ${isInt ? t : r2s} + ${lo} = <b>${Rs}</b>.${mode === 'ex' ? ' This is the lab’s example: a random number in [1, 10] from R1 = 0.5 gives 5.' : ''}`, ar: `الخطوة (5) هي الـ <b>translation</b>:${L(`R = ${isInt ? t : r2s} + Low = ${isInt ? t : r2s} + ${lo} = ${Rs}`)}${mode === 'ex' ? 'وده مثال الـ lab بالظبط.' : ''}` },
      isInt ? { en: `R1 is always below 1, so int(R1 × (High − Low)) is at most High − Low − 1 and the largest result is <b>${hi - 1}</b>: <b>RandInt never returns High</b> (${hi}). To include High, scale by (High − Low + 1). Tap “Draw 1000” to see it.`, ar: `الـ R1 دايماً أقل من 1، فأكبر نتيجة هي <b>${hi - 1}</b> يعني <b>الـ RandInt عمرها ما ترجع الـ High</b> اللي هو ${hi}. عشان الـ High يطلع لازم نضرب في ${L('(High − Low + 1)')}دوس “Draw 1000” وشوف بنفسك.` } : { en: `A real result R = Low + R2 lies in [${lo}, ${hi}).`, ar: `النتيجة الـ real هي${L(`R = Low + R2 ∈ [${lo}, ${hi})`)}` }
    ];
    const mx = tally ? Math.max(...Object.values(tally)) : 1;
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} v=${mode} set=${pick} />
      ${mode === 'try' ? html`<div className="mf8-row"><button className="fig-btn solid" onClick=${() => { setR1(Math.random()); setTally(null); }}>rand()</button><${Num} lab="Low" v=${lo} set=${v => { setLo(v); setTally(null); }} min=${0} max=${hi - 1} /><${Num} lab="High" v=${hi} set=${v => { setHi(v); setTally(null); }} min=${lo + 1} max=${10} /></div>
        <div className="mf8-row"><button className=${'fig-btn' + (isInt ? ' mf8-sel' : '')} onClick=${() => setInt(true)}>Integer</button><button className=${'fig-btn' + (!isInt ? ' mf8-sel' : '')} onClick=${() => { setInt(false); setTally(null); }}>Real</button></div>` : null}
      <div className="mf8-fl">
        ${box(0, '(1) R0 = rand()', 'integer in 0 … RAND_MAX')}<div className="mf8-arw">↓</div>
        ${box(1, '(2) Normalization', `R1 = R0 / (RAND_MAX + 1) = ${r1s}`)}<div className="mf8-arw">↓</div>
        ${box(2, '(3) Scaling', `R2 = ${r1s} × (${hi} − ${lo}) = ${r2s}`)}<div className="mf8-arw">↓</div>
        ${box(3, '(4) Truncation', isInt ? `int(${r2s}) = ${t}` : '(real: none)')}<div className="mf8-arw">↓</div>
        ${box(4, '(5) Translation', `R = ${isInt ? t : r2s} + ${lo} = <b>${Rs}</b>`)}
      </div>
      ${isInt && i === n - 1 ? html`<div className="mf8-row" style=${{ marginTop: '10px' }}><button className="fig-btn" onClick=${draw}>Draw 1000 with RandInt(${lo}, ${hi})</button></div>` : null}
      ${tally ? html`<div style=${{ display: 'flex', gap: '3px', alignItems: 'flex-end', justifyContent: 'center', height: '110px', maxWidth: '360px', margin: '0 auto' }}>${Object.entries(tally).map(([v, c]) => html`<div key=${v} style=${{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}><span className="mf8-f" style=${{ fontSize: '.76rem' }}>${c}</span><i style=${{ display: 'block', width: '100%', height: (c / mx * 70) + 'px', background: c ? 'color-mix(in srgb, var(--fig-k) 50%, var(--paper))' : 'transparent', borderBottom: '1.5px solid var(--graphite)' }}></i><span style=${{ fontSize: '.8rem', color: +v === hi ? 'var(--pen)' : 'var(--ink)', fontWeight: +v === hi ? 700 : 400 }}>${v}</span></div>`)}</div>
        <p className="mf8-note">1000 draws: ${hi} never appears (0 times).</p>` : null}
    </div><${Cap} ...${caps[i]} showAr=${ar} /><${Nav} i=${i} n=${n} ctl=${ctl} /></figure>`;
  }

  /* ── [3] unbiased coin: the two lab flowcharts (RealRand and IntRand) ── */
  function CoinFlow({ ar }) {
    const [kind, setKind] = useState('real');
    const [Rs] = useState(() => Array.from({ length: 100 }, () => Math.random()));
    const isR = kind === 'real';
    const nodes = [
      { id: 's', k: 't', en: 'Start' },
      { id: 'i', en: 'H = 0, T = 0, R = 0, i = 0' },
      { id: 'q', k: 'd', en: 'i &lt; 100 ?', y: '↓', n: 'PH = H / 100' },
      { id: 'g', en: isR ? 'R = RealRand(0, 1)' : 'R = integerRand(0, 1)' },
      { id: 't', k: 'd', en: isR ? 'R &lt; 0.5 ?' : 'R == 0 ?', y: 'H++', n: 'T++' },
      { id: 'c', en: 'i++ &nbsp;↺ back to “i &lt; 100 ?”' },
      { id: 'o', cut: true, en: 'PH = H / 100, PT = T / 100' },
      { id: 'p', k: 'io', en: 'print (PH, PT)' },
      { id: 'e', k: 't', en: 'end' }
    ];
    const val = k => isR ? Rs[k] : 0, head = k => isR ? Rs[k] < 0.5 : true;
    const H = Rs.filter((_, k) => head(k)).length, T = 100 - H;
    const steps = [{ at: 's', en: 'Goal: show by simulation that P(H) = P(T) = 1/2 for an unbiased coin.', ar: 'الهدف: نثبت بالـ simulation إن الـ <bdi dir="ltr">P(H)</bdi> والـ <bdi dir="ltr">P(T)</bdi> كل واحد فيهم <bdi dir="ltr">1/2</bdi> للعملة الـ unbiased.' },
      { at: 'i', v: { i: 0, H: 0, T: 0 }, en: 'Start the counters at zero.', ar: 'بنبدأ العدادات كلها بصفر.' }];
    let h = 0, tt = 0;
    for (let k = 0; k < 2; k++) {
      const r = val(k), hd = head(k), rs = isR ? fx(r, 4) : '0';
      steps.push({ at: 'q', br: 'y', v: { i: k, H: h, T: tt }, en: `i = ${k} &lt; 100: toss again.`, ar: `لسه أقل من 100 رمية، فبنرمي تاني.` });
      steps.push({ at: 'g', v: { i: k, H: h, T: tt, R: rs }, en: isR ? `R = RealRand(0, 1) = ${rs}.` : 'R = integerRand(0, 1) = 0 + int(d × 1) = <b>0</b>: d is below 1, so int(d × 1) is always 0 with the Lab 1 RandInt.', ar: isR ? `بنطلع رقم عشوائي${L(`R = RealRand(0, 1) = ${rs}`)}` : `مع الـ RandInt بتاعة Lab 1 النتيجة دايماً صفر:${L('R = 0 + int(d × 1) = 0')}لأن الـ d أقل من 1.` });
      if (hd) h++; else tt++;
      steps.push({ at: 't', br: hd ? 'y' : 'n', v: { i: k, H: h, T: tt, R: rs }, en: isR ? `${rs} ${hd ? '&lt;' : '≥'} 0.5, so it is a <b>${hd ? 'Head' : 'Tail'}</b>: ${hd ? 'H' : 'T'}++.` : 'R == 0, so it is a <b>Head</b>: H++.', ar: isR ? `الرقم ${hd ? 'أقل من' : 'مش أقل من'} 0.5 فدي <b>${hd ? 'Head' : 'Tail'}</b> وبنزوّد الـ ${hd ? 'H' : 'T'}.` : 'الـ R بصفر فدي <b>Head</b> وبنزوّد الـ H.' });
      steps.push({ at: 'c', v: { i: k + 1, H: h, T: tt, R: rs }, en: `i++ makes i = ${k + 1}; back to the test.`, ar: `بنزوّد الـ i فبقى ${k + 1} ونرجع للشرط.` });
    }
    steps.push({ at: 'c', v: { i: 100, H, T }, en: `Tosses 3 to 100 go round the same loop. After 100 tosses: H = ${H}, T = ${T}.`, ar: `الرميات من 3 لحد 100 بتلف في نفس الـ loop. بعد 100 رمية عدد الـ Heads ${H} وعدد الـ Tails ${T}.` });
    steps.push({ at: 'q', br: 'n', v: { i: 100, H, T }, en: 'i = 100 is not below 100: leave the loop.', ar: 'الـ i وصلت 100 فبنخرج من الـ loop.' });
    steps.push({ at: 'o', v: { PH: fx(H / 100, 2), PT: fx(T / 100, 2) }, en: `PH = ${H}/100 = ${fx(H / 100, 2)}, PT = ${T}/100 = ${fx(T / 100, 2)}.`, ar: `النسب هي${L(`PH = ${H}/100 = ${fx(H / 100, 2)} , PT = ${T}/100 = ${fx(T / 100, 2)}`)}` });
    steps.push({ at: 'p', v: { PH: fx(H / 100, 2), PT: fx(T / 100, 2) }, en: isR ? 'Print PH and PT: both close to 0.5.' : 'Print PH = 1 and PT = 0: every toss was a Head. With this RandInt an integer coin needs RandInt(0, 2).', ar: isR ? 'بنطبع الـ PH والـ PT والاتنين قريبين من 0.5.' : `بنطبع الـ PH بواحد والـ PT بصفر لأن كل الرميات طلعت Head. مع الـ RandInt دي العملة الـ integer محتاجة${L('RandInt(0, 2)')}` });
    steps.push({ at: 'e', v: { PH: fx(H / 100, 2), PT: fx(T / 100, 2) }, en: 'End.', ar: 'خلصنا.' });
    return html`<${Walk} key=${kind} ar=${ar} nodes=${nodes} steps=${steps} ms=${1800} top=${html`<${Seg} opts=${[['real', 'With RealRand'], ['int', 'With IntRand']]} v=${kind} set=${setKind} />`} />`;
  }

  /* ── [3] unbiased coin: toss it 100 times ── */
  function CoinSim({ ar }) {
    const [N, setN] = useState(100), [seq, setSeq] = useState(() => Array.from({ length: 100 }, () => Math.random() < 0.5)), [shown, setShown] = useState(calm() ? 100 : 0);
    const toss = n => { setN(n); setSeq(Array.from({ length: n }, () => Math.random() < 0.5)); setShown(calm() ? n : 0); };
    useEffect(() => { if (shown >= seq.length) return; const t = setTimeout(() => setShown(s => Math.min(seq.length, s + Math.max(1, Math.ceil(seq.length / 50)))), 40); return () => clearTimeout(t); }, [shown, seq]);
    const H = seq.slice(0, shown).filter(Boolean).length, T = shown - H, done = shown >= seq.length;
    const pH = shown ? H / shown : 0, pT = shown ? T / shown : 0;
    const bar = (lab, c, p, col) => html`<div className="mf8-bar" style=${{ cursor: 'default' }}><span className="q">${lab}</span><span className="trk"><i style=${{ left: 0, width: (p * 100) + '%', background: col }}></i><b style=${{ left: '50%' }}></b></span><span className="v">${c}</span></div>`;
    return html`<figure className="fig mf8"><div className="fig-stage">
      <div className="mf8-row">${[100, 1000, 10000].map(n => html`<button key=${n} className=${'fig-btn' + (N === n ? ' mf8-sel' : '')} onClick=${() => toss(n)}>Toss ${n}</button>`)}</div>
      ${N === 100 ? html`<div style=${{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '3px', maxWidth: '260px', margin: '0 auto 10px' }} role="img" aria-label=${`${H} heads and ${T} tails`}>${seq.map((h, k) => html`<i key=${k} style=${{ display: 'block', aspectRatio: '1', borderRadius: '50%', background: k < shown ? (h ? 'var(--fig-k)' : 'var(--graphite)') : 'var(--line)', opacity: k < shown ? 1 : .4, transition: 'background .2s' }}></i>`)}</div>
        <p className="mf8-note" style=${{ margin: '0 0 10px' }}><span style=${{ color: 'var(--fig-k)' }}>●</span> Head (R &lt; 0.5) · <span>●</span> Tail</p>` : null}
      <div className="mf8-bars">${bar('Heads', H, pH, 'color-mix(in srgb, var(--fig-k) 55%, var(--paper))')}${bar('Tails', T, pT, 'color-mix(in srgb, var(--graphite) 45%, var(--paper))')}</div>
      <div className="mf8-card"><div>P(H) = ${H} / ${shown || N} = <span className="mf8-big">${fx(pH, N >= 1000 ? 4 : 2)}</span></div><div>P(T) = ${T} / ${shown || N} = <span className="mf8-big">${fx(pT, N >= 1000 ? 4 : 2)}</span></div></div>
      <p className="mf8-note">The lab’s Excel run of 100 tosses: H = 48 (48.00%), T = 52 (52.00%).</p>
    </div><${Cap} en=${done ? `${N} tosses: P(H) = ${fx(pH, 4)} and P(T) = ${fx(pT, 4)}, close to 0.5. The more tosses, the closer both get to 1/2. Press a button to toss again.` : 'Tossing: R = RealRand(0, 1); R &lt; 0.5 counts a Head, otherwise a Tail.'} ar=${done ? `بعد ${N} رمية النسب طلعت${L(`P(H) = ${fx(pH, 4)} , P(T) = ${fx(pT, 4)}`)}وقريبة من 0.5. وكل ما نزوّد الرميات النسبتين بيقربوا أكتر من <bdi dir="ltr">1/2</bdi>. دوس على أي زرار وارمي تاني.` : `بنرمي العملة: لو الرقم العشوائي أقل من 0.5 تبقى Head وغير كده Tail.`} showAr=${ar} /></figure>`;
  }

  /* ── [5] gift shop: arrival and departure events ── */
  function GiftEvents({ ar }) {
    const [st, setSt] = useState({ busy: true, q: 1, f: null, k: null });
    const arrive = () => setSt(s => s.busy ? { busy: true, q: s.q + 1, f: 'a', k: 1 } : { busy: true, q: s.q, f: 'a', k: 0 });
    const depart = () => setSt(s => s.q > 0 ? { busy: true, q: s.q - 1, f: 'd', k: 1 } : { busy: false, q: 0, f: 'd', k: 0 });
    const A = [{ id: 'ae', k: 't', en: 'Arrival event' }, { id: 'aq', k: 'd', en: 'Server busy?' }, { id: 'ap', cut: true, en: '', k: 'none', pair: [{ lb: 'No', en: ['Unit enters service'] }, { lb: 'Yes', en: ['Unit enters queue for service'] }] }];
    const D = [{ id: 'de', k: 't', en: 'Departure event' }, { id: 'dq', k: 'd', en: 'Another unit waiting?' }, { id: 'dp', cut: true, en: '', k: 'none', pair: [{ lb: 'No', en: ['Begin server idle time'] }, { lb: 'Yes', en: ['Remove the waiting unit from the queue', 'Begin servicing the unit'] }] }];
    const fl = (nodes, f) => html`<div style=${{ opacity: st.f && st.f !== f ? .55 : 1, transition: 'opacity .3s' }}><${Flow} nodes=${nodes.filter(n => !n.pair).concat([])} at=${st.f === f ? nodes[1].id : null} br=${null} />
      <div className="mf8-fl"><div className="mf8-pair">${nodes[2].pair.map((p, k) => html`<div key=${k}><span className="lb">${p.lb} ↓</span>${p.en.map((t, m) => html`<${React.Fragment} key=${m}>${m ? html`<div className="mf8-arw" aria-hidden="true">↓</div>` : null}<div className=${'mf8-nd' + (st.f === f && st.k === k ? ' on' : '')}>${t}</div><//>`)}</div>`)}</div></div></div>`;
    const msg = !st.f ? { en: 'A unit is in service and one waits. Fire an event and follow its flowchart.', ar: 'فيه unit بتتخدم وواحدة مستنية. اختار event واتبع الـ flowchart بتاعها.' }
      : st.f === 'a' ? (st.k ? { en: 'Arrival: the server is busy, so the unit <b>enters the queue</b> for service.', ar: 'وصول: الـ server مشغول، فالـ unit <b>بتدخل الـ queue</b> تستنى.' } : { en: 'Arrival: the server is idle, so the unit <b>enters service</b> at once.', ar: 'وصول: الـ server فاضي، فالـ unit <b>بتدخل الخدمة</b> على طول.' })
        : (st.k ? { en: 'Departure: another unit is waiting, so it is <b>removed from the queue</b> and the server <b>begins servicing</b> it.', ar: 'خروج: فيه unit تانية مستنية، فبنشيلها من الـ queue والـ server <b>يبدأ يخدمها</b>.' } : { en: 'Departure: nobody is waiting, so the server <b>begins its idle time</b>.', ar: 'خروج: مفيش حد مستني، فالـ server <b>يبدأ الـ idle time</b> بتاعه.' });
    return html`<figure className="fig mf8"><div className="fig-stage">
      <div style=${{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 0 12px', flexWrap: 'wrap' }} role="img" aria-label=${`Queue ${st.q}, server ${st.busy ? 'busy' : 'idle'}`}>
        <span className="mf8-note" style=${{ margin: 0 }}>Queue</span>
        <span style=${{ display: 'flex', gap: '4px', minWidth: '60px', minHeight: '22px', alignItems: 'center', justifyContent: 'flex-end', borderBottom: '2px solid var(--line)', padding: '0 4px 2px' }}>${Array.from({ length: st.q }, (_, k) => html`<i key=${k} style=${{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--graphite)', display: 'block' }}></i>`)}</span>
        <span style=${{ fontSize: '1.1rem', color: 'var(--graphite)' }}>→</span>
        <span style=${{ border: '1.5px solid var(--graphite)', borderRadius: '6px', padding: '4px 10px', background: 'var(--paper)', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '.84rem', color: 'var(--ink)' }}>Clerk ${st.busy ? html`<i style=${{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--fig-k)', display: 'block' }}></i>` : html`<span style=${{ color: 'var(--graphite)' }}>idle</span>`}</span>
      </div>
      <div className="mf8-row"><button className="fig-btn solid" onClick=${arrive}>Arrival event</button><button className="fig-btn solid" onClick=${depart} disabled=${!st.busy}>Departure event</button></div>
      <div style=${{ display: 'grid', gap: '16px' }}>${fl(A, 'a')}${fl(D, 'd')}</div>
    </div><${Cap} ...${msg} showAr=${ar} /></figure>`;
  }

  /* ── [6], [7], [9] gift shop: the simulation table, customer by customer ── */
  const GIFT = {
    ex: { lab: 'Worked example', d: [0, 4, 2, 8, 3], st: [2, 5, 1, 4, 3], pEn: 'The lab writes 28.5% (it truncates).', pAr: 'الـ lab كاتبها 28.5% (بيقطع الكسر).' },
    exr: { lab: 'Exercise', d: [0, 10, 7, 7, 8], st: [1, 4, 6, 6, 2], pEn: 'The lab writes 44.11%.', pAr: 'الـ lab كاتبها 44.11%.' },
    run: { lab: 'Program output (20)', d: [0, 6, 8, 5, 9, 7, 8, 5, 1, 4, 2, 5, 1, 4, 6, 6, 6, 4, 6, 8], st: [1, 1, 3, 2, 5, 1, 4, 2, 1, 1, 5, 1, 1, 3, 4, 1, 3, 1, 4, 3], pEn: 'The program prints 54.8077%.', pAr: 'البرنامج بيطبع 54.8077%.' }
  };
  function giftRows(d, st) {
    const R = [];
    d.forEach((_, i) => { const p = R[i - 1]; const ar = i ? p.ar + d[i] : 0, beg = i ? Math.max(ar, p.end) : 0, end = beg + st[i];
      R.push({ d: i ? d[i] : 0, st: st[i], ar, beg, end, wt: end - ar, idle: i && ar > p.end ? ar - p.end : 0, pEnd: i ? p.end : 0 }); });
    return R;
  }
  function GiftTimeline({ rows, shown }) {
    const t = rows.length ? rows[rows.length - 1].end : 1, S = rows.slice(0, shown), pc = x => (x / t * 100) + '%';
    const lane = (lab, kids) => html`<div style=${{ display: 'grid', gridTemplateColumns: '3.3em minmax(0, 1fr)', alignItems: 'center', gap: '6px', margin: '0 0 5px' }}><span style=${{ fontSize: '.78rem', color: 'var(--graphite)' }}>${lab}</span><div style=${{ position: 'relative', height: '18px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '3px' }}>${kids}</div></div>`;
    const seg = (a, b, bg, k, extra) => html`<i key=${k} style=${Object.assign({ position: 'absolute', top: '1px', bottom: '1px', left: pc(a), width: pc(b - a), background: bg, display: 'block' }, extra || {})}></i>`;
    return html`<div style=${{ maxWidth: '440px', margin: '0 auto 6px' }} role="img" aria-label="Clerk busy and idle times, and customers waiting">
      ${lane('Clerk', S.map((r, k) => html`<${React.Fragment} key=${k}>${seg(r.beg, r.end, k % 2 ? 'color-mix(in srgb, var(--fig-k) 70%, var(--paper))' : 'color-mix(in srgb, var(--fig-k) 40%, var(--paper))', 'b')}${r.idle ? seg(r.pEnd, r.ar, 'repeating-linear-gradient(45deg, color-mix(in srgb, var(--pen) 45%, var(--paper)) 0 3px, transparent 3px 6px)', 'i') : null}<//>`))}
      ${lane('Queue', S.map((r, k) => r.beg > r.ar ? seg(r.ar, r.beg, 'var(--graphite)', k, { top: '5px', bottom: '5px', borderRadius: '3px' }) : null))}
      <div style=${{ display: 'grid', gridTemplateColumns: '3.3em minmax(0, 1fr)', gap: '6px' }}><span></span><div style=${{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: 'var(--graphite)' }}><span>0</span><span>t = ${t} min</span></div></div>
      <p className="mf8-note" style=${{ marginTop: '2px' }}><span style=${{ color: 'var(--fig-k)' }}>■</span> serving · <span style=${{ color: 'var(--pen)' }}>▨</span> clerk idle · <span>▬</span> customer waits in the queue</p></div>`;
  }
  function GiftSim({ ar, start }) {
    const [pre, setPre] = useState(start), [d, setD] = useState(GIFT[start].d), [st, setSt] = useState(GIFT[start].st), [edit, setEdit] = useState(false);
    const load = k => { setPre(k); setEdit(false); if (k === 'try') { const n = 5; setD([0].concat(Array.from({ length: n - 1 }, () => ri(1, 10)))); setST(n); } else { setD(GIFT[k].d); setSt(GIFT[k].st); } };
    const setST = n => setSt(Array.from({ length: n }, () => ri(1, 6)));
    const rows = giftRows(d, st), n = rows.length, N = n + 2, t = rows[n - 1].end;
    const sig = JSON.stringify([d, st, edit]);
    const [i, ctl] = useRun(N, 1600, sig, edit);
    const shown = Math.min(i, n), cur = i >= 1 && i <= n ? i - 1 : -1, fin = i === N - 1;
    const W = rows.map(r => r.wt), I = rows.map(r => r.idle), sW = sum(W), sI = sum(I), avg = sW / n, P = sI / t * 100;
    const terms = (a, keep0) => { const v = keep0 ? a : a.filter(x => x); return n <= 8 ? '(' + (v.length ? v.join(' + ') : '0') + ')' : 'Σ = ' + sum(a); };
    const P0 = pre !== 'try' ? GIFT[pre] : null;
    const setCell = (k, f, v) => { const x = Math.round(Number(v)); if (v === '' || !isFinite(x)) return; const c = Math.min(f === 'd' ? 10 : 6, Math.max(1, x)); if (f === 'd') setD(d.map((y, j) => j === k ? c : y)); else setSt(st.map((y, j) => j === k ? c : y)); };
    const resize = m => { if (m < 2 || m > 8) return; setD(m > n ? d.concat([ri(1, 10)]) : d.slice(0, m)); setSt(m > n ? st.concat([ri(1, 6)]) : st.slice(0, m)); };
    let cap;
    if (i === 0) cap = { en: `Each customer has a delay (time since the previous arrival) and a service time. Five equations fill the row: arrival clock, service begin = Max(arrival, previous service end), service end, waiting time = end − arrival, and the clerk’s idle time. ${pre === 'try' ? 'Here the delays are random in 1 to 10 min and the service times in 1 to 6 min, as the problem states.' : ''}`, ar: `كل customer ليه delay (الوقت من اللي قبله) وservice time. فيه 5 معادلات بيملوا الصف: الـ arrival clock وبداية الخدمة (أكبر واحد من وقت الوصول ونهاية خدمة اللي قبله) ونهاية الخدمة والـ waiting time والـ idle بتاع الـ clerk.${pre === 'try' ? ' هنا الـ delays عشوائية من 1 لـ 10 دقايق والـ service من 1 لـ 6 زي ما المسألة بتقول.' : ''}` };
    else if (!fin) {
      const r = rows[cur], k = cur + 1;
      if (cur === 0) cap = { en: `Customer 1: delay = 0, arrival clock = 0, service begins at 0 and ends at ${r.end}; waiting time = its service time = ${r.wt}; idle = 0.`, ar: `أول customer: الـ delay بصفر وبيوصل عند صفر وخدمته تبدأ على طول وتخلص عند ${r.end}. الـ waiting time بتاعه هو الـ service time يعني ${r.wt}، والـ idle بصفر.` };
      else if (r.ar < r.pEnd) cap = { en: `Customer ${k} arrives at ${r.ar} but the clerk is busy until ${r.pEnd}, so service begins at ${r.beg}. WT = ${r.end} − ${r.ar} = ${r.wt} (${r.st} min service + ${r.beg - r.ar} min waiting in the queue). Idle = 0.`, ar: `الـ customer رقم ${k} وصل عند ${r.ar} بس الـ clerk مشغول لحد ${r.pEnd}، فخدمته تبدأ عند ${r.beg}. الـ waiting time هو${L(`WT = ${r.end} − ${r.ar} = ${r.wt}`)}يعني ${r.st} دقيقة خدمة و${r.beg - r.ar} دقيقة في الـ queue، والـ idle بصفر.` };
      else if (r.ar > r.pEnd) cap = { en: `Customer ${k} arrives at ${r.ar}; the clerk has been free since ${r.pEnd}: idle = ${r.ar} − ${r.pEnd} = ${r.idle}. No waiting, so WT = service time = ${r.wt}.`, ar: `الـ customer رقم ${k} وصل عند ${r.ar} والـ clerk فاضي من عند ${r.pEnd}، فالـ idle هو${L(`${r.ar} − ${r.pEnd} = ${r.idle}`)}ومفيش انتظار، فالـ WT هو الـ service time يعني ${r.wt}.` };
      else cap = { en: `Customer ${k} arrives at ${r.ar}, just as the clerk finishes: no waiting and no idle time. WT = ${r.wt}.`, ar: `الـ customer رقم ${k} وصل عند ${r.ar} مع خلاص الـ clerk بالظبط، فمفيش انتظار ولا idle، والـ WT بيساوي ${r.wt}.` };
    } else cap = { en: `Average waiting time Ar = ${terms(W, true)}/${n} = ${sW}/${n} = <b>${fx(avg, 2)} min</b>. Clerk idle P = ${terms(I)}/${t} × 100 = ${sI}/${t} × 100 = <b>${fx(P, 2)}%</b>${P0 ? ' (' + P0.pEn + ')' : ''}. The standard clerk idle is 12.5% (H.R.W.): ${P > 12.5 ? 'this clerk is idle for a long time.' : 'this clerk is idle less than that.'}`, ar: `متوسط الـ waiting time هو${L(`Ar = ${sW}/${n} = ${fx(avg, 2)} min`)}ونسبة الـ idle للـ clerk هي${L(`P = ${sI}/${t} × 100 = ${fx(P, 2)}%`)}${P0 ? P0.pAr + ' ' : ''}والـ standard حسب H.R.W. هو 12.5%، ${P > 12.5 ? 'فالـ clerk ده قاعد فاضي وقت كبير.' : 'والـ clerk ده فاضي أقل من كده.'}` };
    if (edit) cap = { en: 'Change any delay (1 to 10) or service time (1 to 6), or add and remove customers; press Done to run the table.', ar: 'غيّر أي delay (من 1 لـ 10) أو service time (من 1 لـ 6)، أو زوّد وشيل customers، وبعدين دوس Done عشان الجدول يتملي.' };
    const r = cur >= 0 ? rows[cur] : null;
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['ex', 'Worked example'], ['exr', 'Exercise'], ['run', 'Program (20)'], ['try', 'Try your own']]} v=${pre} set=${load} />
      ${pre === 'try' ? html`<div className="mf8-row"><button className="fig-btn" onClick=${() => load('try')}>New random customers</button><button className=${'fig-btn' + (edit ? ' solid' : '')} onClick=${() => { if (edit) { setEdit(false); ctl.replay(); } else setEdit(true); }}>${edit ? '✓ Done' : '✎ Edit'}</button></div>` : null}
      ${edit ? html`<table className="mf8-tb"><thead><tr><th>#</th><th>Delay</th><th>Service</th></tr></thead><tbody>${rows.map((x, k) => html`<tr key=${k}><td>${k + 1}</td><td>${k ? html`<input type="number" inputMode="numeric" min="1" max="10" value=${d[k]} aria-label=${'Delay of customer ' + (k + 1)} onFocus=${e => e.target.select()} onChange=${e => setCell(k, 'd', e.target.value)} />` : '0'}</td><td><input type="number" inputMode="numeric" min="1" max="6" value=${st[k]} aria-label=${'Service time of customer ' + (k + 1)} onFocus=${e => e.target.select()} onChange=${e => setCell(k, 's', e.target.value)} /></td></tr>`)}</tbody></table>
        <div className="mf8-row" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${() => resize(n + 1)} disabled=${n >= 8}>+ Customer</button><button className="fig-btn" onClick=${() => resize(n - 1)} disabled=${n <= 2}>− Customer</button></div>` : html`
      <${GiftTimeline} rows=${rows} shown=${shown} />
      <table className="mf8-tb cmp"><thead><tr><th>#</th><th>Dly</th><th>ST</th><th>Arr</th><th>Beg</th><th>End</th><th>WT</th><th>Idle</th></tr></thead>
        <tbody>${rows.map((x, k) => html`<tr key=${k} className=${k === cur ? 'cur' : k >= shown ? 'off' : ''}><td>${k + 1}</td><td>${x.d}</td><td>${x.st}</td><td>${x.ar}</td><td>${x.beg}</td><td>${x.end}</td><td>${x.wt}</td><td>${x.idle}</td></tr>`)}
        <tr className=${'tot' + (fin ? '' : ' off')}><td colSpan="6">Total</td><td>${sW}</td><td>${sI}</td></tr></tbody></table>
      <p className="mf8-note">Dly delay · ST service time · Arr arrival clock · Beg / End service begin / end · WT waiting time</p>
      ${r ? html`<div className="mf8-card mf8-f">
        <div>(1) Ar_Clk = ${cur ? `${rows[cur - 1].ar} + ${r.d} = ` : ''}<b>${r.ar}</b></div>
        <div>(2) Begin = ${cur ? `Max(${r.ar}, ${r.pEnd}) = ` : ''}<b>${r.beg}</b></div>
        <div>(3) End = ${r.beg} + ${r.st} = <b>${r.end}</b></div>
        <div>(4) WT = ${r.end} − ${r.ar} = <b>${r.wt}</b></div>
        <div>(5) Idle = ${r.idle ? `${r.ar} − ${r.pEnd} = ` : ''}<b>${r.idle}</b>${!r.idle && cur ? ` (${r.ar} ≤ ${r.pEnd})` : ''}</div></div>` : html`<div className=${'mf8-card' + (fin ? '' : ' off')}>${fin ? html`<div>Ar = ${sW} / ${n} = <span className="mf8-big">${fx(avg, 2)} min</span></div><div>P = ${sI} / ${t} × 100 = <span className="mf8-big">${fx(P, 2)}%</span></div><div className="mf8-note" style=${{ textAlign: 'left' }}>${P0 ? P0.pEn + ' ' : ''}Standard clerk idle: 12.5% (H.R.W.).</div>` : html`<span className="mf8-note">Ar and P appear when the table is complete.</span>`}</div>`}`}
    </div><${Cap} ...${cap} showAr=${ar} />${edit ? null : html`<${Nav} i=${i} n=${N} ctl=${ctl} />`}</figure>`;
  }

  /* ── [10] Figure 8-1: area under the curve y = f(x), accept or reject a random point ── */
  function AreaFig({ ar }) {
    const steps = [
      { en: 'The shaded area <b>A</b> is bounded by the non-negative curve y = f(x), the x axis and the vertical lines x = b and x = c: A is the integral of f(x) from b to c, with 0 ≤ f(x) ≤ h.', ar: `المساحة المظللة <b>A</b> محصورة بين المنحنى الموجب${L('y = f(x)')}ومحور الـ x والخطين ${L('x = b , x = c')}يعني الـ A هي تكامل الـ <bdi dir="ltr">f(x)</bdi> من b لـ c.` },
      { en: 'Enclose it in the rectangle <b>R</b> with base (b, c) and height h.', ar: 'بنحطها جوه المستطيل <b>R</b> اللي قاعدته من b لـ c وارتفاعه h.' },
      { en: 'Drop a point (xᵢ, yᵢ) at random on R, like a dart: every portion of R has the same chance of being hit. This one is under the curve: <b>accepted</b>.', ar: 'بنرمي نقطة عشوائية على الـ R زي السهم، وكل حتة في الـ R ليها نفس الفرصة. النقطة دي تحت المنحنى فهي <b>accepted</b>.' },
      { en: 'This point is above the curve: <b>rejected</b>.', ar: 'النقطة دي فوق المنحنى فهي <b>rejected</b>.' },
      { en: 'Drop N points; K fall inside A. The probability of falling in A is p = A / (h(c − b)), so <b>A = K h (c − b) / N</b> (equation 2).', ar: `بنرمي N نقطة ويقع منهم K جوه الـ A. احتمال الوقوع جوه الـ A هو${L('p = A / (h(c − b))')}وبالتالي${L('A = K h (c − b) / N')}` }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const X0 = 40, Y0 = 200, bx = 110, cx = 250, hy = 50, fy = px => Y0 - (60 + 85 * (1 - Math.exp(-(px - bx) / 45)));
    const pts = []; for (let px = bx; px <= cx; px += 5) pts.push([px, fy(px)]);
    const curve = 'M' + pts.map(p => p.join(',')).join(' L');
    const area = curve + ` L${cx},${Y0} L${bx},${Y0} Z`;
    const [dots] = useState(() => Array.from({ length: 40 }, () => { const x = bx + Math.random() * (cx - bx), y = hy + Math.random() * (Y0 - hy); return [x, y, y >= fy(x)]; }));
    const acc = [170, 160], rej = [215, 70];
    return html`<figure className="fig mf8"><div className="fig-stage">
      <svg viewBox="0 0 330 228" role="img" aria-label="Area A under the curve y = f(x) inside the rectangle R">
        <path d=${area} fill="color-mix(in srgb, var(--fig-k) 26%, var(--paper))" />
        <rect x=${bx} y=${hy} width=${cx - bx} height=${Y0 - hy} fill="none" stroke="var(--graphite)" strokeWidth="1.5" className=${pop(i >= 1)} />
        <line x1=${X0} y1=${hy} x2=${bx} y2=${hy} stroke="var(--graphite)" strokeDasharray="4 4" className=${pop(i >= 1)} />
        <text x=${X0 - 8} y=${hy + 5} textAnchor="end" fontSize="16" className=${pop(i >= 1)}>h</text>
        <text x=${bx + 8} y=${hy + 20} fontSize="16" fontWeight="700" className=${pop(i >= 1)}>R</text>
        <path d=${curve} fill="none" stroke="var(--ink)" strokeWidth="2.5" />
        <text x="180" y="185" textAnchor="middle" fontSize="18" fontWeight="700">A</text>
        <line x1=${X0} y1=${Y0} x2="322" y2=${Y0} stroke="var(--ink)" strokeWidth="1.5" /><line x1=${X0} y1=${Y0} x2=${X0} y2="14" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="322" y=${Y0 + 18} textAnchor="end" fontSize="16">x</text><text x=${X0 + 8} y="22" fontSize="16">y</text>
        <text x=${bx} y=${Y0 + 18} textAnchor="middle" fontSize="16">b</text><text x=${cx} y=${Y0 + 18} textAnchor="middle" fontSize="16">c</text>
        <text x=${cx + 5} y=${fy(cx) + 5} fontSize="15">y = f(x)</text>
        ${i === 4 ? dots.map((p, k) => html`<circle key=${k} cx=${p[0]} cy=${p[1]} r="3.2" fill=${p[2] ? 'var(--ok)' : 'var(--pen)'} />`) : null}
        <g className=${pop(i === 2 || i === 3)}>
          <circle cx=${acc[0]} cy=${acc[1]} r="5" fill="var(--ok)" className=${pop(i === 2)} /><text x=${acc[0] + 9} y=${acc[1] + 5} fontSize="15" className=${pop(i === 2)}>accept</text>
          <circle cx=${rej[0]} cy=${rej[1]} r="5" fill="var(--pen)" className=${pop(i === 3)} /><text x=${rej[0] - 9} y=${rej[1] + 5} textAnchor="end" fontSize="15" className=${pop(i === 3)}>reject</text>
        </g>
      </svg></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  const AREA_BOOK = { 500: '0.7680001', 1000: '0.76899999', 1500: '0.76933336', 2000: '0.78100002', 2500: '0.78560001', 3000: '0.78399998' };
  const fq = x => Math.sqrt(1 - x * x), fq1 = x => x / (1 + x * x);
  /* ── [11] Figure 8-2: the flowchart walked with the book's example f(x) = √(1 − x²) ── */
  function AreaFlow({ ar }) {
    const [P] = useState(() => Array.from({ length: 3000 }, () => { const x = Math.random(), y = Math.random(); return { x, y, f: fq(x), in: y <= fq(x) }; }));
    const nodes = [
      { id: 's', k: 't', en: 'start' }, { id: 'z', en: 'N, K ← 0' }, { id: 'n', en: 'N ← N + 1' },
      { id: 'q', k: 'd', en: 'N &gt; 3000 ?', y: 'End', n: '↓' },
      { id: 'g', en: 'Generate uniformly distributed independent random numbers (x, y), 0 ≤ y ≤ h, b ≤ x ≤ c; compute f(x)' },
      { id: 'a', k: 'd', en: 'y ≤ f(x) ?', y: 'K ← K + 1', n: 'N mod 500 = 0 ?' },
      { id: 'k', en: 'K ← K + 1 (point (x, y) belongs to the area)' },
      { id: 'm', k: 'd', en: 'N mod 500 = 0 ?', y: 'print', n: '↺ N ← N + 1' },
      { id: 'p', k: 'io', en: 'Print N, A = K h (c − b) / N &nbsp;↺ N ← N + 1' },
      { id: 'e', k: 't', cut: true, en: 'End' }
    ];
    const K = n => P.slice(0, n).filter(p => p.in).length;
    const steps = [{ at: 's', en: 'The book’s example: b = 0, c = 1, h = 1 and f(x) = √(1 − x²), so A = K / N.', ar: `مثال الكتاب فيه${L('b = 0 , c = 1 , h = 1 , f(x) = √(1 − x²)')}فالمساحة${L('A = K / N')}` },
      { at: 'z', v: { N: 0, K: 0 }, en: 'Start both counters at 0.', ar: 'بنبدأ العدادين بصفر.' }];
    for (let j = 0; j < 2; j++) {
      const p = P[j], v = { N: j + 1, K: K(j), x: fx(p.x, 3), y: fx(p.y, 3), 'f(x)': fx(p.f, 3) };
      steps.push({ at: 'n', v: { N: j + 1, K: K(j) }, en: `N ← ${j + 1}.`, ar: `الـ N بقت ${j + 1}.` });
      steps.push({ at: 'q', br: 'n', v: { N: j + 1, K: K(j) }, en: `${j + 1} is not above 3000: continue.`, ar: 'لسه موصلناش 3000 فبنكمل.' });
      steps.push({ at: 'g', v, en: `Random point x = ${v.x}, y = ${v.y}; f(${v.x}) = √(1 − ${v.x}²) = ${v['f(x)']}.`, ar: `نقطة عشوائية${L(`x = ${v.x} , y = ${v.y} , f(x) = ${v['f(x)']}`)}` });
      steps.push({ at: 'a', br: p.in ? 'y' : 'n', v, en: p.in ? `${v.y} ≤ ${v['f(x)']}: the point is under the curve.` : `${v.y} &gt; ${v['f(x)']}: the point is above the curve, K stays.`, ar: p.in ? 'الـ y أقل من أو بتساوي الـ <bdi dir="ltr">f(x)</bdi> فالنقطة تحت المنحنى.' : 'الـ y أكبر من الـ <bdi dir="ltr">f(x)</bdi> فالنقطة فوق المنحنى والـ K زي ما هي.' });
      if (p.in) steps.push({ at: 'k', v: Object.assign({}, v, { K: K(j + 1) }), en: `K ← ${K(j + 1)}.`, ar: `الـ K بقت ${K(j + 1)}.` });
      steps.push({ at: 'm', br: 'n', v: Object.assign({}, v, { K: K(j + 1) }), en: `${j + 1} mod 500 ≠ 0: no print, back to N ← N + 1.`, ar: 'باقي القسمة على 500 مش صفر، فمفيش طباعة ونرجع نزوّد الـ N.' });
    }
    const k5 = K(500), k3 = K(3000);
    steps.push({ at: 'm', br: 'y', v: { N: 500, K: k5 }, en: `… the loop repeats. At N = 500 (K = ${k5}) N mod 500 = 0:`, ar: `الـ loop بيتكرر. عند N بـ 500 والـ K بـ ${k5} باقي القسمة بصفر.` });
    steps.push({ at: 'p', v: { N: 500, K: k5, A: fx(k5 / 500, 4) }, en: `Print N = 500, A = ${k5} × 1 × (1 − 0) / 500 = ${fx(k5 / 500, 4)}. (The book’s run printed 0.7680001.)`, ar: `بنطبع${L(`N = 500 , A = ${k5}/500 = ${fx(k5 / 500, 4)}`)}وتشغيلة الكتاب طبعت 0.7680001.` });
    steps.push({ at: 'p', v: { N: 3000, K: k3, A: fx(k3 / 3000, 4) }, en: `… prints at 1000, 1500, 2000, 2500 and 3000: A = ${k3}/3000 = ${fx(k3 / 3000, 4)}. (The book’s run: 0.78399998; π/4 = 0.7853981.)`, ar: `وبنطبع تاني عند 1000 و 1500 و 2000 و 2500 و 3000، وآخر قيمة${L(`A = ${k3}/3000 = ${fx(k3 / 3000, 4)}`)}والكتاب طلع 0.78399998 والقيمة المظبوطة <bdi dir="ltr">π/4</bdi>.` });
    steps.push({ at: 'q', br: 'y', v: { N: 3001, K: k3 }, en: 'N ← 3001 &gt; 3000: End.', ar: 'الـ N عدّت 3000 فبنخلص.' });
    steps.push({ at: 'e', v: { N: 3001, K: k3 }, en: 'End.', ar: 'خلصنا.' });
    return html`<${Walk} ar=${ar} nodes=${nodes} steps=${steps} ms=${1900} />`;
  }

  /* ── [11] Monte Carlo area simulator ── */
  function AreaSim({ ar }) {
    const [fn, setFn] = useState('book'), [c, setC] = useState(2), [run, setRun] = useState(0), [n, setN] = useState(0);
    const cv = useRef(null), ptsRef = useRef([]);
    const f = fn === 'book' ? fq : fq1, b = 0, cc = fn === 'book' ? 1 : c, h = fn === 'book' ? 1 : 0.5, NN = 3000;
    useEffect(() => { ptsRef.current = Array.from({ length: NN }, () => { const x = b + Math.random() * (cc - b), y = Math.random() * h; return [x, y, y <= f(x)]; }); setN(calm() ? NN : 0); }, [fn, c, run]);
    useEffect(() => { if (n >= NN) return; const t = setTimeout(() => setN(m => Math.min(NN, m + 40)), 30); return () => clearTimeout(t); }, [n, fn, c, run]);
    useEffect(() => {
      const el = cv.current; if (!el) return; const W = el.clientWidth, H = el.clientHeight, dpr = window.devicePixelRatio || 1;
      if (el.width !== Math.round(W * dpr)) { el.width = Math.round(W * dpr); el.height = Math.round(H * dpr); }
      const g = el.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      const cs = getComputedStyle(el), ok = cs.getPropertyValue('--ok').trim() || 'green', pen = cs.getPropertyValue('--pen').trim() || 'red', ink = cs.getPropertyValue('--ink').trim() || '#000';
      const X = x => (x - b) / (cc - b) * W, Y = y => H - y / h * H;
      ptsRef.current.slice(0, n).forEach(p => { g.fillStyle = p[2] ? ok : pen; g.globalAlpha = .75; g.fillRect(X(p[0]) - 1.2, Y(p[1]) - 1.2, 2.4, 2.4); });
      g.globalAlpha = 1; g.strokeStyle = ink; g.lineWidth = 2; g.beginPath(); for (let k = 0; k <= 100; k++) { const x = b + (cc - b) * k / 100; k ? g.lineTo(X(x), Y(f(x))) : g.moveTo(X(x), Y(f(x))); } g.stroke();
    });
    const P = ptsRef.current, K = P.slice(0, n).filter(p => p[2]).length, A = n ? K * h * (cc - b) / n : 0;
    const prints = [500, 1000, 1500, 2000, 2500, 3000].filter(m => m <= n).map(m => { const k = P.slice(0, m).filter(p => p[2]).length; return [m, k, k * h * (cc - b) / m]; });
    const done = n >= NN;
    const cap = fn === 'book'
      ? { en: done ? `3000 points: K = ${K}, A = K/N = ${fx(A, 4)}; the exact area is π/4 = 0.7853981, a difference of ${fx(Math.abs(A - Math.PI / 4), 4)}. Each run of random numbers gives a slightly different answer: simulation is less accurate than the analytic solution.` : 'Dropping points on the square 0 ≤ x ≤ 1, 0 ≤ y ≤ 1: green under f(x) = √(1 − x²) is accepted, red is rejected.', ar: done ? `بعد 3000 نقطة${L(`K = ${K} , A = K/N = ${fx(A, 4)}`)}والمساحة المظبوطة${L('π/4 = 0.7853981')}وكل تشغيلة بأرقام عشوائية جديدة بتدّي إجابة مختلفة شوية، فالـ simulation أقل دقة من الحل الـ analytic.` : 'بنرمي نقط على المربع، والأخضر تحت المنحنى accepted والأحمر rejected.' }
      : { en: done ? `End-of-chapter Q1: f(x) = x/(1 + x²) from b = 0 to c = ${cc}, inside a rectangle of height h = 0.5 (the largest value of f, at x = 1). 3000 points: K = ${K}, A = K h (c − b)/N = ${K} × 0.5 × ${cc} / 3000 = ${fx(A, 4)}.` : 'Q1: dropping points under f(x) = x/(1 + x²).', ar: done ? `سؤال Q1 في آخر الفصل: الدالة${L(`f(x) = x/(1 + x²) , b = 0 , c = ${cc} , h = 0.5`)}والارتفاع h هو أكبر قيمة للدالة (عند x بواحد). بعد 3000 نقطة${L(`A = ${K} × 0.5 × ${cc} / 3000 = ${fx(A, 4)}`)}` : 'سؤال Q1: بنرمي نقط تحت الدالة.' };
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['book', 'Book: √(1 − x²)'], ['q1', 'Q1: x/(1 + x²)']]} v=${fn} set=${setFn} />
      <div className="mf8-row"><button className="fig-btn solid" onClick=${() => setRun(r => r + 1)}>↻ New 3000 points</button>${fn === 'q1' ? html`<${Num} lab="c" v=${c} set=${setC} min=${1} max=${4} />` : null}</div>
      <div style=${{ maxWidth: '300px', margin: '0 auto' }}>
        <div style=${{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', color: 'var(--graphite)' }}><span>y = h = ${h}</span><span className="mf8-f">N = ${n} · K = ${K}</span></div>
        <canvas ref=${cv} style=${{ display: 'block', width: '100%', aspectRatio: fn === 'book' ? '1' : '1.6', border: '1.5px solid var(--graphite)', background: 'var(--paper)', boxSizing: 'border-box' }} role="img" aria-label=${`${n} random points, ${K} under the curve`}></canvas>
        <div style=${{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', color: 'var(--graphite)' }}><span>b = 0</span><span>c = ${cc}</span></div>
      </div>
      <table className="mf8-tb" style=${{ marginTop: '10px' }}><thead><tr><th>N</th><th>K</th><th>Your A</th>${fn === 'book' ? html`<th>Book’s A</th>` : null}</tr></thead><tbody>
        ${[500, 1000, 1500, 2000, 2500, 3000].map((m, k) => { const p = prints[k]; return html`<tr key=${m} className=${p ? '' : 'off'}><td>${m}</td><td>${p ? p[1] : '·'}</td><td>${p ? fx(p[2], 4) : '·'}</td>${fn === 'book' ? html`<td>${AREA_BOOK[m]}</td>` : null}</tr>`; })}</tbody></table>
      ${fn === 'book' ? html`<p className="mf8-note">Exact: π/4 = 0.7853981</p>` : null}
    </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── pursuit problem data and the course's method ── */
  const np = v => String(v).startsWith('-') ? '(' + mn(v) + ')' : v;
  const XB = [80, 90, 99, 108, 116, 125, 133, 141, 151, 160, 169, 179, 180], YB = [0, -2, -5, -9, -15, -18, -23, -29, -28, -25, -21, -20, -17];
  function pursue(vf) {
    const R = []; let xf = 0, yf = 50;
    for (let t = 0; t <= 12; t++) {
      const d = Math.hypot(YB[t] - yf, XB[t] - xf), s = (YB[t] - yf) / d, c = (XB[t] - xf) / d;
      const r = { t, xf, yf, xb: XB[t], yb: YB[t], d, s, c, nx: xf + vf * c, ny: yf + vf * s };
      R.push(r); if (d <= 10) return { R, caught: true };
      xf = r.nx; yf = r.ny;
    }
    return { R, caught: false };
  }
  function PursuitSvg({ R, upto, sight, ring, path }) {
    const all = R.slice(0, upto + 1);
    const xs = XB.concat(all.map(r => r.xf)), ys = YB.concat(all.map(r => r.yf));
    const x0 = Math.min(-12, ...xs) - 4, x1 = Math.max(...xs) + 8, y0 = Math.min(...ys) - 12, y1 = Math.max(56, ...ys) + 10;
    const W = x1 - x0, H = y1 - y0, X = x => x - x0, Y = y => y1 - y;
    const r = R[Math.min(upto, R.length - 1)];
    return html`<svg viewBox=${`0 0 ${W} ${H}`} role="img" aria-label="Fighter and bomber positions" style=${{ maxWidth: '520px' }}>
      <line x1=${X(x0 + 2)} y1=${Y(0)} x2=${X(x1 - 2)} y2=${Y(0)} stroke="var(--line)" strokeWidth="1" /><line x1=${X(0)} y1=${Y(y0 + 2)} x2=${X(0)} y2=${Y(y1 - 2)} stroke="var(--line)" strokeWidth="1" />
      <text x=${X(0) + 3} y=${Y(y1) + 11} fontSize="11">N</text><text x=${X(x1) - 3} y=${Y(0) - 3} fontSize="11" textAnchor="end">E</text>
      ${path ? html`<polyline points=${XB.slice(0, path).map((x, t) => X(x) + ',' + Y(YB[t])).join(' ')} fill="none" stroke="var(--pen)" strokeWidth="1.2" strokeDasharray="3 2" />
        ${XB.slice(0, path).map((x, t) => html`<circle key=${t} cx=${X(x)} cy=${Y(YB[t])} r="1.6" fill="var(--pen)" />`)}` : null}
      ${all.length > 1 ? html`<polyline points=${all.map(p => X(p.xf) + ',' + Y(p.yf)).join(' ')} fill="none" stroke="var(--fig-k)" strokeWidth="1.6" />${all.map((p, k) => html`<circle key=${k} cx=${X(p.xf)} cy=${Y(p.yf)} r="1.7" fill="var(--fig-k)" />`)}` : null}
      ${sight && r ? html`<line x1=${X(r.xf)} y1=${Y(r.yf)} x2=${X(r.xb)} y2=${Y(r.yb)} stroke="var(--ink)" strokeWidth="1" strokeDasharray="4 3" />` : null}
      ${ring && r ? html`<circle cx=${X(r.xb)} cy=${Y(r.yb)} r="10" fill="none" stroke="var(--pen)" strokeWidth="1" opacity=".7" />` : null}
      ${r ? html`<g><circle cx=${X(r.xf)} cy=${Y(r.yf)} r="3.2" fill="var(--fig-k)" /><text x=${X(r.xf) + 4} y=${Y(r.yf) - 4} fontSize="11" fontWeight="700">F</text>
        <circle cx=${X(r.xb)} cy=${Y(r.yb)} r="3.2" fill="var(--pen)" /><text x=${X(r.xb) - 4} y=${Y(r.yb) - 5} fontSize="11" fontWeight="700" textAnchor="end">B</text></g>` : null}
    </svg>`;
  }
  /* ── [12] Figure 8-3: positions at time zero, and the bomber's specified path ── */
  function PursuitPos({ ar }) {
    const steps = [
      { en: 'Origin at the point due south of the fighter and due west of the target; North axis up, East axis right; distances in km.', ar: 'نقطة الأصل جنوب الـ fighter بالظبط وغرب الـ target بالظبط، ومحور الـ North لفوق والـ East لليمين، والمسافات بالـ km.' },
      { en: 'Time zero: the fighter <b>F</b> at XF(0) = 0, YF(0) = 50 km, and the bomber <b>B</b> at (80, 0). The dashed line is the line of sight.', ar: `عند الزمن صفر الـ fighter <b>F</b> عند${L('XF(0) = 0 , YF(0) = 50')}والـ bomber <b>B</b> عند ${L('(80, 0)')}والخط المتقطع هو خط النظر.` },
      { en: 'The bomber’s path is specified minute by minute (t = 0 … 12): (80, 0), (90, −2), (99, −5), (108, −9), (116, −15), (125, −18), (133, −23), (141, −29), (151, −28), (160, −25), (169, −21), (179, −20), (180, −17).', ar: `مسار الـ bomber متحدد دقيقة بدقيقة من t بصفر لحد 12، وده شكله (بالنقط الحمرا).` },
      { en: 'The fighter flies at a constant VF = 20 km/min and realigns toward the bomber every minute. It destroys the bomber once within 10 km (the circle); after 12 minutes the bomber escapes.', ar: 'الـ fighter سرعته ثابتة 20 km في الدقيقة وبيعدل اتجاهه ناحية الـ bomber كل دقيقة. بيضربه أول ما يقرب 10 km أو أقل (الدايرة)، ولو عدّت 12 دقيقة الـ bomber يهرب.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const { R } = pursue(20);
    return html`<figure className="fig mf8"><div className="fig-stage">
      ${i === 0 ? html`<${PursuitSvg} R=${[]} upto=${0} />` : html`<${PursuitSvg} R=${R} upto=${0} sight=${i >= 1} ring=${i >= 3} path=${i >= 2 ? 13 : 0} />`}
      <p className="mf8-note">${i >= 1 ? html`<span style=${{ color: 'var(--fig-k)' }}>●</span> F fighter (0, 50) · <span style=${{ color: 'var(--pen)' }}>●</span> B bomber (80, 0)` : 'North ↑ · East →'}</p>
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  /* ── [13] Figure 8-4: the pursuit flowchart walked ── */
  function PursuitFlow({ ar }) {
    const { R } = pursue(20), f3 = x => fx(x, 3);
    const nodes = [
      { id: 'r', k: 'io', en: 'Read XB(t), YB(t) for t = 0 … 12; XF(0), YF(0); VF' },
      { id: 't0', en: 't = 0' },
      { id: 'c', en: 'Compute the current distance DIST(t) and the fighter’s next position XF(t + 1), YF(t + 1)' },
      { id: 'd', k: 'd', en: 'DIST ≤ 10 ?', y: 'print t, DIST; stop', n: '↓' },
      { id: 'e', k: 'd', en: 't &gt; 11 ?', y: '“target escaped”; stop', n: '↓' },
      { id: 'i', en: 't = t + 1 &nbsp;↺ back to compute' },
      { id: 's', k: 't', cut: true, en: 'Stop' }
    ];
    const v = (r, t) => ({ t: t == null ? r.t : t, XF: f3(r.xf), YF: f3(r.yf), DIST: f3(r.d) });
    const steps = [{ at: 'r', v: { VF: 20, XF: 0, YF: 50 }, en: 'Read the bomber’s path for t = 0 … 12, the fighter’s start (0, 50) and its speed VF = 20 km/min.', ar: `بنقرا مسار الـ bomber من t بصفر لـ 12، ومكان الـ fighter في الأول ${L('(0, 50)')}وسرعته 20 km في الدقيقة.` },
      { at: 't0', v: { t: 0, XF: '0.000', YF: '50.000' }, en: 't = 0.', ar: 'بنبدأ بـ t بصفر.' }];
    [0, 1].forEach(t => { const r = R[t];
      steps.push({ at: 'c', v: v(r), en: `DIST(${t}) = √[(${mn(r.yb)} − ${np(f3(r.yf))})² + (${r.xb} − ${np(f3(r.xf))})²] = ${f3(r.d)}; next position XF(${t + 1}) = ${f3(r.nx)}, YF(${t + 1}) = ${f3(r.ny)}.`, ar: `المسافة${L(`DIST(${t}) = ${f3(r.d)}`)}والمكان الجاي${L(`XF(${t + 1}) = ${f3(r.nx)} , YF(${t + 1}) = ${f3(r.ny)}`)}` });
      steps.push({ at: 'd', br: 'n', v: v(r), en: `${f3(r.d)} &gt; 10: not yet.`, ar: 'المسافة لسه أكبر من 10.' });
      steps.push({ at: 'e', br: 'n', v: v(r), en: `t = ${t} is not above 11.`, ar: 'الـ t لسه مش أكبر من 11.' });
      steps.push({ at: 'i', v: Object.assign(v(r), { t: t + 1, XF: f3(r.nx), YF: f3(r.ny), DIST: '' }), en: `t = ${t + 1}.`, ar: `الـ t بقت ${t + 1}.` });
    });
    const r9 = R[9];
    steps.push({ at: 'c', v: v(R[8]), en: `t = 2 … 8 go round the same loop: DIST = ${R.slice(2, 9).map(r => f3(r.d)).join(', ')}.`, ar: `من t بـ 2 لحد 8 نفس الـ loop، والمسافة بتقل لحد ما توصل ${f3(R[8].d)}.` });
    steps.push({ at: 'c', v: v(r9), en: `t = 9: DIST(9) = ${f3(r9.d)}.`, ar: `عند t بـ 9 المسافة بقت ${f3(r9.d)}.` });
    steps.push({ at: 'd', br: 'y', v: v(r9), en: `${f3(r9.d)} ≤ 10: print t = 9 and DIST = ${f3(r9.d)}: the fighter catches and destroys the bomber.`, ar: `المسافة ${f3(r9.d)} أقل من 10، فبنطبع الـ t بـ 9 والمسافة، والـ fighter مسك الـ bomber ودمره.` });
    steps.push({ at: 's', v: v(r9), en: 'Stop.', ar: 'وقفنا.' });
    return html`<${Walk} ar=${ar} nodes=${nodes} steps=${steps} ms=${2000} />`;
  }
  /* ── [14] pursuit: minute by minute ── */
  function PursuitSim({ ar }) {
    const [mode, setMode] = useState('ex'), [vf, setVf] = useState(20);
    const V = mode === 'ex' ? 20 : vf, { R, caught } = pursue(V), n = R.length + 1, f3 = x => fx(x, 3);
    const [i, ctl] = useRun(n, 1700, mode + V);
    const k = Math.min(i, R.length - 1), r = R[k], fin = i === n - 1;
    let cap;
    if (fin) cap = caught ? { en: `DIST(${r.t}) = ${f3(r.d)} ≤ 10 km: <b>the fighter catches and destroys the bomber at t = ${r.t} minutes</b>${V === 20 ? ' (the program prints Distance = 2.969 and Time = 9).' : '.'}`, ar: `المسافة ${f3(r.d)} km يعني 10 أو أقل، فالـ <b>fighter مسك الـ bomber ودمره عند الدقيقة ${r.t}</b>.` } : { en: `At t = 12 the distance is still ${f3(r.d)} km &gt; 10: <b>target escaped</b>.`, ar: `عند الدقيقة 12 المسافة لسه ${f3(r.d)} km أكبر من 10، فالـ <b>bomber هرب</b>.` };
    else {
      cap = { en: `t = ${r.t}: DIST = √[(${mn(r.yb)} − ${np(f3(r.yf))})² + (${r.xb} − ${np(f3(r.xf))})²] = <b>${f3(r.d)}</b> ${r.d <= 10 ? '≤' : '&gt;'} 10. The fighter aligns with the line of sight: sin θ = ${fx(r.s, 4)}, cos θ = ${fx(r.c, 4)}, and flies one minute to (${f3(r.nx)}, ${f3(r.ny)}).`, ar: `عند t بـ ${r.t} المسافة ${f3(r.d)}. الـ fighter بيوجّه نفسه على خط النظر وبيطير دقيقة لحد${L(`(${f3(r.nx)}, ${f3(r.ny)})`)}` };
      if (mode === 'ex' && r.t <= 1) { cap.en += r.t === 0 ? ' The lab rounds sin and cos to 2 decimals (−0.53, 0.85) and gets XF(1) = 17, YF(1) = 39.4; the program keeps full precision (16.96).' : ' The lab’s hand steps give Dist(1) = 83.922 (from XF(1) = 17); full precision gives 83.957.'; cap.ar += r.t === 0 ? 'والـ lab بيقرّب الـ sin والـ cos لرقمين عشريين فبيطلع عنده 17 و 39.4، والبرنامج بيحسب بدقة كاملة.' : 'وحساب الـ lab بالإيد بيدّي 83.922 بدل 83.957 عشان التقريب.'; }
    }
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['ex', 'Example from the notes (VF = 20)'], ['try', 'Try your own speed']]} v=${mode} set=${setMode} />
      ${mode === 'try' ? html`<div className="mf8-row"><${Num} lab="VF (km/min)" v=${vf} set=${setVf} min=${10} max=${40} /></div>` : null}
      <${PursuitSvg} R=${R} upto=${k} sight=${!fin || !caught} ring=${true} path=${13} />
      <p className="mf8-note"><span style=${{ color: 'var(--fig-k)' }}>●</span> fighter path · <span style=${{ color: 'var(--pen)' }}>●</span> bomber path · ○ 10 km</p>
      <table className="mf8-tb" style=${{ marginTop: '8px' }}><thead><tr><th>t</th><th>XF</th><th>YF</th><th>XB</th><th>YB</th><th>DIST</th></tr></thead><tbody>
        ${R.map((x, j) => html`<tr key=${j} className=${j === k ? 'cur' : j > k ? 'off' : ''}><td>${x.t}</td><td>${f3(x.xf)}</td><td>${f3(x.yf)}</td><td>${x.xb}</td><td>${x.yb}</td><td>${f3(x.d)}</td></tr>`)}</tbody></table>
    </div><${Cap} ...${cap} showAr=${ar} /><${Nav} i=${i} n=${n} ctl=${ctl} /></figure>`;
  }

  /* ── [16] the staggering drunk ── */
  const DRUNK = [[73, 21, 45, 76, 96, 94, 53, 57, 96, 43], [10, 89, 14, 81, 30, 91, 6, 38, 79, 43], [5, 88, 10, 4, 48, 19, 44, 21, 95, 11], [6, 95, 4, 67, 51, 95, 73, 10, 76, 30], [64, 76, 79, 54, 28, 5, 71, 75, 56, 29]];
  const dir = rn => rn < 25 ? ['E', 1, 0] : rn < 50 ? ['W', -1, 0] : rn < 75 ? ['N', 0, 1] : ['S', 0, -1];
  const walk = rns => { let x = 0, y = 0; return rns.map(rn => { const [dd, dx, dy] = dir(rn); x += dx; y += dy; return { rn, dd, x, y }; }); };
  const d2 = rn => String(rn).padStart(2, '0');
  function DrunkFlow({ ar }) {
    const nodes = [
      { id: 's', en: 'Set X = 0, Y = 0' },
      { id: 'r', en: 'Select two-digit random number RN' },
      { id: 'a', k: 'd', en: 'RN &lt; 25 ?', y: 'x = x + 1', n: '↓' },
      { id: 'b', k: 'd', en: 'RN &lt; 50 ?', y: 'x = x − 1', n: '↓' },
      { id: 'c', k: 'd', en: 'RN &lt; 75 ?', y: 'y = y + 1', n: 'y = y − 1' },
      { id: 'n', k: 'd', cut: true, en: 'N = 1 ?', n: 'N = N − 1 ↺ select the next RN', y: '↓' },
      { id: 'p', k: 'io', en: 'Print X and Y' },
      { id: 'e', k: 't', en: 'Stop' }
    ];
    const W = walk(DRUNK[0]), steps = [{ at: 's', v: { X: 0, Y: 0, N: 10 }, en: 'Trial 1 of Table 8-1: start at the corner (0, 0); N = 10 blocks to walk.', ar: `أول trial في <bdi dir="ltr">Table&nbsp;8-1</bdi>: بنبدأ من الناصية ${L('(0, 0)')}وقدامنا 10 blocks.` }];
    const tests = { E: ['a'], W: ['a', 'b'], N: ['a', 'b', 'c'], S: ['a', 'b', 'c'] };
    const nameEn = { E: 'east', W: 'west', N: 'north', S: 'south' }, nameAr = { E: 'الشرق', W: 'الغرب', N: 'الشمال', S: 'الجنوب' };
    for (let k = 0; k < 3; k++) {
      const w = W[k], px = k ? W[k - 1].x : 0, py = k ? W[k - 1].y : 0, N = 10 - k;
      steps.push({ at: 'r', v: { X: px, Y: py, N, RN: d2(w.rn) }, en: `RN = ${d2(w.rn)}.`, ar: `الرقم العشوائي ${d2(w.rn)}.` });
      tests[w.dd].forEach((id, m, arr) => { const last = m === arr.length - 1; const yes = last && w.dd !== 'S';
        steps.push({ at: id, br: yes ? 'y' : 'n', v: last ? { X: w.x, Y: w.y, N, RN: d2(w.rn) } : { X: px, Y: py, N, RN: d2(w.rn) }, en: last ? `${d2(w.rn)} goes <b>${nameEn[w.dd]}</b>: he is now at (${w.x}, ${w.y}).` : `${d2(w.rn)} is not below ${({ a: 25, b: 50, c: 75 })[id]}.`, ar: last ? `الرقم ده معناه يروح <b>${nameAr[w.dd]}</b>، فبقى عند${L(`(${w.x}, ${w.y})`)}` : `الرقم مش أقل من ${({ a: 25, b: 50, c: 75 })[id]}.` }); });
      steps.push({ at: 'n', br: 'n', v: { X: w.x, Y: w.y, N: N - 1 }, en: `N = ${N} is not 1: N = ${N - 1}, select the next RN.`, ar: `الـ N مش بواحد، فبتبقى ${N - 1} ونختار رقم جديد.` });
    }
    const z = W[9];
    steps.push({ at: 'n', br: 'y', v: { X: z.x, Y: z.y, N: 1 }, en: `Blocks 4 to 10 (RN ${DRUNK[0].slice(3).map(d2).join(', ')}) go round the same loop; after the 10th block N = 1.`, ar: 'الـ blocks من 4 لحد 10 بتلف في نفس الـ loop، وبعد العاشر الـ N بقت بواحد.' });
    steps.push({ at: 'p', v: { X: z.x, Y: z.y }, en: `Print X = ${z.x}, Y = ${z.y}: |X| + |Y| = 2 ≤ 2, a success.`, ar: `بنطبع المكان${L(`X = ${z.x} , Y = ${z.y} , |X| + |Y| = 2 ≤ 2`)}يعني الـ trial نجحت.` });
    steps.push({ at: 'e', v: { X: z.x, Y: z.y }, en: 'Stop.', ar: 'وقفنا.' });
    return html`<${Walk} ar=${ar} nodes=${nodes} steps=${steps} ms=${1800} />`;
  }
  function DrunkSim({ ar }) {
    const [tr, setTr] = useState(0), [rns, setRns] = useState(DRUNK[0]), [many, setMany] = useState(null);
    const pick = k => { setTr(k); setRns(k === 'r' ? Array.from({ length: 10 }, () => ri(0, 99)) : DRUNK[k]); };
    const W = walk(rns), n = 12;
    const [i, ctl] = useRun(n, 1200, tr + rns.join());
    const shown = Math.min(i, 10), w = shown ? W[shown - 1] : { x: 0, y: 0 }, fin = i === n - 1, ok = Math.abs(W[9].x) + Math.abs(W[9].y) <= 2;
    const R = Math.max(4, ...W.map(p => Math.max(Math.abs(p.x), Math.abs(p.y)))), C = 22, S = (2 * R + 1) * C, P = v => (v + R) * C + C / 2;
    const cells = []; for (let x = -R; x <= R; x++) for (let y = -R; y <= R; y++) if (Math.abs(x) + Math.abs(y) <= 2) cells.push([x, y]);
    const lines = []; for (let k = -R; k <= R; k++) lines.push(k);
    const runMany = () => { let ok2 = 0; for (let t = 0; t < 1000; t++) { let x = 0, y = 0; for (let b = 0; b < 10; b++) { const [, dx, dy] = dir(ri(0, 99)); x += dx; y += dy; } if (Math.abs(x) + Math.abs(y) <= 2) ok2++; } setMany(m => ({ ok: (m ? m.ok : 0) + ok2, n: (m ? m.n : 0) + 1000 })); };
    let cap;
    if (i === 0) cap = { en: 'Each block uses one two-digit RN: 00-24 east (X + 1), 25-49 west (X − 1), 50-74 north (Y + 1), 75-99 south (Y − 1). The shaded corners are within 2 blocks of the start.', ar: 'كل block بياخد رقم عشوائي من رقمين: من 00 لـ 24 شرق، من 25 لـ 49 غرب، من 50 لـ 74 شمال، من 75 لـ 99 جنوب. النواصي المظللة هي اللي على بعد 2 blocks أو أقل من البداية.' };
    else if (!fin) cap = { en: `Block ${shown}: RN ${d2(w.rn)} → ${({ E: 'east', W: 'west', N: 'north', S: 'south' })[w.dd]}; location (${w.x}, ${w.y}).`, ar: `الـ block رقم ${shown}: الرقم ${d2(w.rn)} معناه ${({ E: 'شرق', W: 'غرب', N: 'شمال', S: 'جنوب' })[w.dd]}، والمكان${L(`(${w.x}, ${w.y})`)}` };
    else cap = { en: `After 10 blocks he is at (${W[9].x}, ${W[9].y}): |X| + |Y| = ${Math.abs(W[9].x) + Math.abs(W[9].y)} ${ok ? '≤ 2, a <b>success</b>' : '&gt; 2, a <b>failure</b>'}. Table 8-1: trials 1, 4 and 5 succeed, so the estimate is 3/5 = 0.6; five trials are not enough for a good estimate.`, ar: `بعد 10 blocks بقى عند${L(`(${W[9].x}, ${W[9].y}) , |X| + |Y| = ${Math.abs(W[9].x) + Math.abs(W[9].y)}`)}${ok ? 'يعني <b>نجاح</b>.' : 'يعني <b>فشل</b>.'} في <bdi dir="ltr">Table&nbsp;8-1</bdi> الـ trials رقم 1 و 4 و 5 نجحوا، فالتقدير ${L('3/5 = 0.6')}وخمس trials مش كفاية لتقدير كويس.` };
    return html`<figure className="fig mf8"><div className="fig-stage">
      <div className="mf8-row">${[0, 1, 2, 3, 4].map(k => html`<button key=${k} className=${'fig-btn' + (tr === k ? ' mf8-sel' : '')} onClick=${() => pick(k)}>Trial ${k + 1}</button>`)}<button className=${'fig-btn' + (tr === 'r' ? ' mf8-sel' : '')} onClick=${() => pick('r')}>Random trial</button></div>
      <svg viewBox=${`0 0 ${S} ${S}`} style=${{ maxWidth: '300px' }} role="img" aria-label=${`Walk ending at ${W[9].x}, ${W[9].y}`}>
        ${cells.map(([x, y]) => html`<rect key=${x + ',' + y} x=${P(x) - C / 2} y=${P(-y) - C / 2} width=${C} height=${C} fill="color-mix(in srgb, var(--ok) 16%, var(--paper))" />`)}
        ${lines.map(k => html`<g key=${k}><line x1=${C / 2} y1=${P(k)} x2=${S - C / 2} y2=${P(k)} stroke="var(--line)" /><line x1=${P(k)} y1=${C / 2} x2=${P(k)} y2=${S - C / 2} stroke="var(--line)" /></g>`)}
        <circle cx=${P(0)} cy=${P(0)} r="5" fill="none" stroke="var(--ink)" strokeWidth="2" />
        <polyline points=${[[0, 0]].concat(W.slice(0, shown).map(p => [p.x, p.y])).map(([x, y]) => P(x) + ',' + P(-y)).join(' ')} fill="none" stroke="var(--fig-k)" strokeWidth="3" strokeLinejoin="round" />
        <circle cx=${P(w.x)} cy=${P(-w.y)} r="7" fill=${fin ? (ok ? 'var(--ok)' : 'var(--pen)') : 'var(--fig-k)'} style=${{ transition: calm() ? 'none' : 'cx .4s, cy .4s' }} />
      </svg>
      <p className="mf8-note">○ start (0, 0) · shaded: |X| + |Y| ≤ 2 · North ↑ East →</p>
      <div className="mf8-chips" style=${{ marginTop: '8px' }}>${W.map((p, k) => html`<span key=${k} className=${k === shown - 1 ? 'sel' : ''} style=${{ opacity: k < shown ? 1 : .35 }}><b>${d2(p.rn)}</b>${p.dd}</span>`)}</div>
      <table className="mf8-tb"><thead><tr><th>Trial</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>End</td>${DRUNK.map((t, k) => { const e = walk(t)[9]; return html`<td key=${k}>${e.x}, ${e.y}</td>`; })}</tr><tr><td>Success</td>${DRUNK.map((t, k) => { const e = walk(t)[9], s = Math.abs(e.x) + Math.abs(e.y) <= 2; return html`<td key=${k} className=${s ? 'y' : 'n'}>${s ? 'YES' : 'No'}</td>`; })}</tr></tbody></table>
      <div className="mf8-row" style=${{ marginTop: '10px' }}><button className="fig-btn" onClick=${runMany}>Run 1000 random trials</button></div>
      ${many ? html`<div className="mf8-card">${many.n} trials: ${many.ok} successes, estimate = ${many.ok}/${many.n} = <span className="mf8-big">${fx(many.ok / many.n, 4)}</span></div>` : null}
    </div><${Cap} ...${cap} showAr=${ar} /><${Nav} i=${i} n=${n} ctl=${ctl} /></figure>`;
  }

  /* ── [18] flipping coin game: the lab flowchart ── */
  const QRN = [0.34, 0.90, 0.25, 0.89, 0.87, 0.44, 0.12, 0.21, 0.46, 0.67, 0.83, 0.76, 0.79, 0.64, 0.70, 0.81, 0.94, 0.74, 0.22, 0.74, 0.96, 0.99, 0.77, 0.67, 0.56, 0.41, 0.52, 0.73, 0.99, 0.02, 0.47, 0.30, 0.17, 0.82, 0.56, 0.05, 0.45, 0.31, 0.78, 0.05, 0.79, 0.71, 0.23, 0.19, 0.82, 0.93, 0.65, 0.37, 0.39, 0.42, 0.99, 0.17, 0.99, 0.46, 0.05, 0.66, 0.10, 0.42, 0.18, 0.49, 0.37, 0.51, 0.54, 0.01, 0.81, 0.28, 0.69, 0.34, 0.75, 0.49, 0.72, 0.43, 0.56, 0.97, 0.30, 0.94, 0.96, 0.58, 0.73, 0.05, 0.06, 0.39, 0.84, 0.24, 0.40, 0.64, 0.40, 0.19, 0.79, 0.60, 0.18, 0.26, 0.97, 0.88, 0.64, 0.47, 0.60, 0.11, 0.29, 0.78];
  // games from a list of numbers: r < 0.5 is a tail (T++), otherwise a head; a game ends when |H − T| = 3
  function games(rns, count) {
    const G = []; let idx = 0;
    while (count ? G.length < count : idx < rns.length) { let H = 0, T = 0; const fl = [], s = idx; while (Math.abs(H - T) < 3) { const r = rns[idx % rns.length]; if (r < 0.5) T++; else H++; fl.push({ r, k: idx, h: r >= 0.5, diff: H - T }); idx++; } G.push({ s, e: idx - 1, fl, n: fl.length, net: 8 - fl.length }); }
    return G;
  }
  function FlipFlow({ ar }) {
    const nodes = [
      { id: 's', k: 't', en: 'Start' },
      { id: 'z', en: 'Success = 0, Game = 0, Toss = 0, T_Gain = 0, T_loss = 0' },
      { id: 'ng', en: 'H = 0, T = 0, Toss = 1' },
      { id: 'g', en: 'Generate R.N r ∈ [0, 1]' },
      { id: 'a', k: 'd', en: 'r &lt; 0.5 ?', y: 'T++', n: 'H++' },
      { id: 'b', k: 'd', en: '|H − T| = 3 ?', n: 'Toss++ ↺ generate', y: '↓' },
      { id: 'c', k: 'd', en: 'Toss &lt; 8 ?', y: 'Success++, T_Gain = T_Gain + (8 − Toss)', n: 'T_Loss = T_Loss − (8 − Toss)' },
      { id: 'd', k: 'd', en: 'Game &lt; 100 ?', y: 'Game++ ↺ new game', n: '↓' },
      { id: 'p', en: 'P = Success / Game' },
      { id: 'o', k: 'io', en: 'Print P, T_Gain, T_Loss' },
      { id: 'e', k: 't', en: 'End' }
    ];
    const G = games(QRN, 2), st = { Game: 0, Success: 0, T_Gain: 0, T_Loss: 0 };
    const steps = [{ at: 's', en: 'The lab’s flowchart, walked with the first numbers of Quiz 2: 0.34, 0.90, 0.25, …', ar: 'الـ flowchart بتاع الـ lab ماشيين فيه بأول أرقام Quiz 2.' },
      { at: 'z', v: Object.assign({}, st), en: 'All totals start at 0.', ar: 'كل المجاميع بتبدأ بصفر.' }];
    G.forEach((g, gi) => {
      steps.push({ at: 'ng', v: Object.assign({}, st, { H: 0, T: 0, Toss: 1 }), en: `Game ${gi + 1}: H = 0, T = 0, Toss = 1.`, ar: `الـ game رقم ${gi + 1} بيبدأ والعدادات بصفر والـ Toss بواحد.` });
      const show = gi === 0 ? [0, 1, 8] : [0, 1, 2];
      let H = 0, T = 0;
      g.fl.forEach((f, k) => { if (f.h) H++; else T++;
        if (!show.includes(k)) return;
        if (gi === 0 && k === 8) steps.push({ at: 'b', br: 'n', v: Object.assign({}, st, { H: H - (f.h ? 1 : 0), T: T - (f.h ? 0 : 1), Toss: 9 }), en: 'Flips 3 to 8 go round the same loop (0.25 T, 0.89 H, 0.87 H, 0.44 T, 0.12 T, 0.21 T).', ar: 'الرميات من 3 لحد 8 بتلف في نفس الـ loop.' });
        steps.push({ at: 'g', v: Object.assign({}, st, { H: H - (f.h ? 1 : 0), T: T - (f.h ? 0 : 1), Toss: k + 1, r: fx(f.r, 2) }), en: `r = ${fx(f.r, 2)}.`, ar: `الرقم العشوائي ${fx(f.r, 2)}.` });
        steps.push({ at: 'a', br: f.h ? 'n' : 'y', v: Object.assign({}, st, { H, T, Toss: k + 1, r: fx(f.r, 2) }), en: `${fx(f.r, 2)} ${f.h ? '≥' : '&lt;'} 0.5: ${f.h ? 'H++ (head)' : 'T++ (tail)'}.`, ar: f.h ? 'الرقم مش أقل من 0.5 فدي head.' : 'الرقم أقل من 0.5 فدي tail.' });
        const end = Math.abs(H - T) === 3;
        steps.push({ at: 'b', br: end ? 'y' : 'n', v: Object.assign({}, st, { H, T, Toss: end ? k + 1 : k + 2 }), en: end ? `|${H} − ${T}| = 3: the game ends after ${k + 1} flips.` : `|${H} − ${T}| = ${Math.abs(H - T)} ≠ 3: Toss++ and flip again.`, ar: end ? `الفرق بقى 3 فالـ game خلصت بعد ${k + 1} رميات.` : 'الفرق لسه مش 3، فبنزوّد الـ Toss ونرمي تاني.' });
      });
      const win = g.n < 8; if (win) { st.Success++; st.T_Gain += 8 - g.n; } else st.T_Loss -= 8 - g.n;
      steps.push({ at: 'c', br: win ? 'y' : 'n', v: Object.assign({}, st, { Toss: g.n }), en: win ? `Toss = ${g.n} &lt; 8: a win. Success = ${st.Success}, T_Gain = ${st.T_Gain} (+${8 - g.n}).` : `Toss = ${g.n} is not below 8: a loss. T_Loss = T_Loss − (8 − ${g.n}) = ${st.T_Loss}.`, ar: win ? `الرميات أقل من 8 فدي مكسب، والـ T_Gain زاد ${8 - g.n}.` : `الرميات مش أقل من 8 فدي خسارة، والـ T_Loss بقى ${st.T_Loss}.` });
      st.Game++;
      steps.push({ at: 'd', br: 'y', v: Object.assign({}, st), en: `Game &lt; 100: Game++ = ${st.Game}, start a new game.`, ar: `لسه أقل من 100 game، فبنبدأ game جديدة.` });
    });
    steps.push({ at: 'd', br: 'n', v: { Game: 100, Success: 71, T_Gain: 255, T_Loss: 247 }, en: 'The lab ran 100 games (with its own random numbers): 71 wins, total gain 255, total loss 247.', ar: 'الـ lab شغّل 100 game بأرقامه العشوائية: كسب 71 مرة، ومجموع المكسب 255، ومجموع الخسارة 247.' });
    steps.push({ at: 'p', v: { P: '0.71' }, en: 'P = Success / Game = 71 / 100 = 0.71.', ar: `الاحتمال${L('P = 71 / 100 = 0.71')}` });
    steps.push({ at: 'o', v: { P: '0.71', T_Gain: 255, T_Loss: 247 }, en: 'Print P(Success) = 0.71, Total Gain = 255, Total Loss = 247: “It’s Safe to Play This Game”.', ar: 'بنطبع الـ P بـ 0.71 والمكسب 255 والخسارة 247، والـ lab قال إن اللعبة safe.' });
    steps.push({ at: 'e', v: { P: '0.71', T_Gain: 255, T_Loss: 247 }, en: 'End.', ar: 'خلصنا.' });
    return html`<${Walk} ar=${ar} nodes=${nodes} steps=${steps} ms=${1800} />`;
  }

  /* ── [19] Quiz 2: the 100 given numbers, game by game; or 100 random games ── */
  function stats(G) { const v = G.map(g => g.net), n = v.length, m = sum(v) / n, va = sum(v.map(x => (x - m) ** 2)) / n; return { n, s: sum(v), m, va, sd: Math.sqrt(va), w: G.filter(g => g.n < 8).length, gain: sum(G.filter(g => g.net > 0).map(g => g.net)), loss: -sum(G.filter(g => g.net < 0).map(g => g.net)) }; }
  function FlipQuiz({ ar }) {
    const [mode, setMode] = useState('quiz'), [rg, setRg] = useState(null);
    const G = games(QRN), S = stats(G), N = G.length + 2;
    const [i, ctl] = useRun(N, 2000, mode);
    const play = () => { const out = []; for (let k = 0; k < 100; k++) { let H = 0, T = 0, n = 0; while (Math.abs(H - T) < 3) { if (Math.random() < 0.5) T++; else H++; n++; } out.push({ n, net: 8 - n }); } setRg(stats(out)); };
    if (mode === 'rand') {
      const R = rg;
      const cap = R ? { en: `100 random games: P(success) = ${R.w}/100 = ${fx(R.w / 100, 2)}, total gain ${R.gain}, total loss ${R.loss}. Mean net gain = ${fx(R.m, 4)}, variance = ${fx(R.va, 4)}, standard deviation = ${fx(R.sd, 4)}: ${R.m > 0 ? 'positive, so this run says “safe to play”' : 'not positive, so this run says “not safe”'}. Play again: a different run can change the decision.`, ar: `بعد 100 game عشوائية الاحتمال${L(`P = ${R.w}/100 = ${fx(R.w / 100, 2)} , Mean = ${fx(R.m, 4)} , SD = ${fx(R.sd, 4)}`)}${R.m > 0 ? 'والمتوسط موجب فالتشغيلة دي بتقول safe.' : 'والمتوسط مش موجب فالتشغيلة دي بتقول not safe.'} العب تاني وشوف إن القرار ممكن يتغير.` } : { en: 'Lab 5 plays 100 games with random numbers. Press Play.', ar: 'الـ Lab 5 بيلعب 100 game بأرقام عشوائية. دوس Play.' };
      return html`<figure className="fig mf8"><div className="fig-stage">
        <${Seg} opts=${[['quiz', 'Quiz 2 numbers'], ['rand', 'Try your own: 100 random games']]} v=${mode} set=${setMode} />
        <div className="mf8-row"><button className="fig-btn solid" onClick=${play}>▶ Play 100 games</button></div>
        ${R ? html`<div className="mf8-card mf8-f"><div>P(success) = ${R.w}/100 = <b>${fx(R.w / 100, 2)}</b></div><div>Total gain = ${R.gain} · Total loss = ${R.loss}</div><div>Mean = ${mn(fx(R.m, 4))} · Variance = ${fx(R.va, 4)} · SD = ${fx(R.sd, 4)}</div><div className=${R.m > 0 ? 'mf8-ok' : 'mf8-bad'}>${R.m > 0 ? 'Safe to play' : 'Not safe to play'}</div></div>` : null}
        <p className="mf8-note">The lab’s run: P = 0.71, gain 255, loss 247, mean 0.08, variance 58.034, SD 7.618.</p>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
    }
    const gi = i >= 1 && i <= G.length ? i - 1 : -1, g = gi >= 0 ? G[gi] : null, fin = i === N - 1;
    let cap;
    if (i === 0) cap = { en: 'Quiz 2 gives 100 random numbers. rn &lt; 0.5 is a tail (diff − 1), otherwise a head (diff + 1); a game ends when |diff| = 3 and its net gain is 8 − flips.', ar: 'الـ Quiz 2 مدّينا 100 رقم عشوائي. لو الرقم أقل من 0.5 تبقى tail (الفرق يقل 1) وغير كده head (الفرق يزيد 1). الـ game بتخلص لما الفرق يوصل 3، والـ net gain هو 8 ناقص عدد الرميات.' };
    else if (g) cap = { en: `Game ${gi + 1} uses numbers ${g.s + 1}-${g.e + 1 > 100 ? '100, then 1-' + (g.e + 1 - 100) : g.e + 1}: ${g.n} flips, net gain 8 − ${g.n} = <b>${mn(g.net)}</b>${g.n < 8 ? ' (a win)' : ' (a loss)'}.${g.e >= 100 ? ' Only 18 numbers were left, so the code (rns[idx % total]) reuses numbers 1-9 from the start.' : ''}`, ar: `الـ game رقم ${gi + 1} خدت ${g.n} رميات، والـ net gain${L(`8 − ${g.n} = ${mn(g.net)}`)}${g.n < 8 ? 'يعني مكسب.' : 'يعني خسارة.'}${g.e >= 100 ? ' كان فاضل 18 رقم بس، فالكود بيرجع ياخد الأرقام من 1 لـ 9 من الأول.' : ''}` };
    else cap = { en: `13 games, sum of net gains = ${S.s}. Mean = ${S.s}/13 = <b>${mn(fx(S.m, 4))}</b>, variance = Σ(net − mean)²/13 = <b>${fx(S.va, 4)}</b>, standard deviation = <b>${fx(S.sd, 4)}</b>. ${S.w} wins (won $${S.gain}, lost $${S.loss}). The average net gain is negative: an expected loss over time, so <b>the game is not safe to play</b>.`, ar: `عندنا 13 game ومجموع الـ net gains بـ <bdi dir="ltr">${mn(S.s)}</bdi>.${L(`Mean = ${mn(fx(S.m, 4))} , Variance = ${fx(S.va, 4)} , SD = ${fx(S.sd, 4)}`)}المتوسط سالب يعني خسارة متوقعة على المدى الطويل، فـ <b>اللعبة مش safe</b>.` };
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['quiz', 'Quiz 2 numbers'], ['rand', 'Try your own: 100 random games']]} v=${mode} set=${setMode} />
      ${g ? html`<div className="mf8-chips">${g.fl.map((f, k) => html`<span key=${k} title=${'number ' + (f.k % 100 + 1)} style=${f.k >= 100 ? { borderStyle: 'dashed' } : null}><b>${fx(f.r, 2)}</b>${f.h ? 'H' : 'T'} ${f.diff > 0 ? '+' + f.diff : mn(f.diff)}</span>`)}</div>
        <p className="mf8-note" style=${{ margin: '0 0 8px' }}>each flip: number, H or T, running diff = H − T${g.e >= 100 ? ' · dashed: reused from the start of the list' : ''}</p>` : null}
      <table className="mf8-tb"><thead><tr><th>Game</th><th>RNs used</th><th>Flips</th><th>Net</th></tr></thead><tbody>
        ${G.map((x, k) => html`<tr key=${k} className=${k === gi ? 'cur' : k >= i ? 'off' : ''}><td>${k + 1}</td><td>${x.s + 1}-${x.e >= 100 ? '100, 1-' + (x.e - 99) : x.e + 1}</td><td>${x.n}</td><td className=${x.n < 8 ? 'y' : 'n'}>${mn(x.net)}</td></tr>`)}
        <tr className=${'tot' + (fin ? '' : ' off')}><td colSpan="3">Sum</td><td>${mn(S.s)}</td></tr></tbody></table>
      <div className=${'mf8-card mf8-f' + (fin ? '' : ' off')}>${fin ? html`<div>Mean = ${mn(S.s)}/13 = <b>${mn(fx(S.m, 4))}</b></div><div>Variance = <b>${fx(S.va, 4)}</b> · SD = <b>${fx(S.sd, 4)}</b></div><div className="mf8-bad">Not safe to play</div>` : html`<span>Mean, variance and SD appear after game 13.</span>`}</div>
    </div><${Cap} ...${cap} showAr=${ar} /><${Nav} i=${i} n=${N} ctl=${ctl} /></figure>`;
  }

  /* ── [20]-[22] newspaper seller, Quiz 5 ── */
  const NEWS = [[41, 19], [68, 72], [89, 75], [94, 8], [74, 54], [91, 2], [55, 1], [62, 36], [36, 16], [27, 28]];
  const NTYPE = k => k <= 35 ? 'Good' : k <= 80 ? 'Fair' : 'Poor', NTAR = { Good: 'Good', Fair: 'Fair', Poor: 'Poor' };
  const NTRANGE = { Good: '01-35', Fair: '36-80', Poor: '81-100' };
  const NDEM = { Good: [[8, 50], [23, 60], [43, 70], [78, 80], [93, 90], [100, 100]], Fair: [[28, 50], [68, 60], [88, 70], [96, 80], [100, 90]], Poor: [[44, 50], [66, 60], [82, 70], [94, 80], [100, 90]] };
  const p2 = k => k === 100 ? '100' : String(k).padStart(2, '0');
  const ndem = (type, k) => { const T = NDEM[type]; for (let j = 0; j < T.length; j++) if (k <= T[j][0]) return { d: T[j][1], rg: p2(j ? T[j - 1][0] + 1 : 1) + '-' + p2(T[j][0]) }; };
  const rnS = k => k === 100 ? '1.00' : '0.' + String(k).padStart(2, '0');
  const money = c => mn((c / 100).toFixed(2));
  function newsDays(days) { return days.map(([a, b]) => { const type = NTYPE(a), dd = ndem(type, b); return { a, b, type, d: dd.d, rg: dd.rg }; }); }
  function newsQ(D, Q) { return D.map(x => { const sold = Math.min(x.d, Q), rev = 50 * sold, cost = 33 * Q, salv = 5 * (Q - sold), lost = 17 * Math.max(0, x.d - Q); return { sold, left: Q - sold, short: Math.max(0, x.d - Q), rev, cost, salv, lost, p: rev - cost - lost + salv }; }); }
  const QS = [50, 60, 70, 80, 90, 100];
  function NewsDays({ ar }) {
    const [mode, setMode] = useState('quiz'), [days, setDays] = useState(NEWS), [Q, setQ] = useState(60);
    const pick = m => { setMode(m); setDays(m === 'quiz' ? NEWS : Array.from({ length: 10 }, () => [ri(1, 100), ri(1, 100)])); };
    const D = newsDays(days), R = newsQ(D, Q), N = 12;
    const tot = QS.map(q => sum(newsQ(D, q).map(r => r.p))), best = Math.max(...tot);
    const [i, ctl] = useRun(N, 1700, mode + days.join() + Q);
    const cur = i >= 1 && i <= 10 ? i - 1 : -1, fin = i === N - 1;
    const T = k => sum(R.slice(0, k + 1).map(r => r.p));
    const tR = sum(R.map(r => r.rev)), tC = sum(R.map(r => r.cost)), tS = sum(R.map(r => r.salv)), tL = sum(R.map(r => r.lost)), tP = sum(R.map(r => r.p));
    let cap;
    if (i === 0) cap = { en: `Policy Q = ${Q}: buy ${Q} papers at $0.33 each every day, sell at $0.50, scrap leftovers at $0.05, and lose $0.17 profit for each unmet demand. For each day one RN gives the type of newsday and a second RN gives the demand for that type.`, ar: `الـ policy إننا نشتري ${Q} جرنال كل يوم بـ 0.33 دولار، ونبيع بـ 0.50، والفاضل يتباع scrap بـ 0.05، وكل طلب مش متلبّي بيضيّع 0.17 ربح. كل يوم ليه رقم عشوائي بيحدد نوع اليوم ورقم تاني بيحدد الـ demand.` };
    else if (cur >= 0) { const x = D[cur], r = R[cur]; cap = { en: `Day ${cur + 1}: RN ${rnS(x.a)} → <b>${x.type}</b> day (${NTRANGE[x.type]}); RN ${rnS(x.b)} → demand <b>${x.d}</b> (${x.type} ${x.rg}). Sold ${r.sold}${r.left ? `, ${r.left} left as scrap` : ''}${r.short ? `, ${r.short} demands unmet` : ''}: profit = ${money(r.rev)} − ${money(r.cost)}${r.lost ? ` − ${money(r.lost)}` : ''}${r.salv ? ` + ${money(r.salv)}` : ''} = <b>${money(r.p)}</b>.`, ar: `اليوم رقم ${cur + 1} نوعه <b>${x.type}</b> والـ demand بتاعه <b>${x.d}</b> جرنال. بعنا ${r.sold}${r.left ? ` وفضل ${r.left} اتباعوا scrap` : ''}${r.short ? ` وفيه ${r.short} طلب متلبّاش` : ''}، والربح${L(`${money(r.rev)} − ${money(r.cost)}${r.lost ? ` − ${money(r.lost)}` : ''}${r.salv ? ` + ${money(r.salv)}` : ''} = ${money(r.p)}`)}` }; }
    else cap = { en: `Q = ${Q} totals: revenue ${money(tR)}, cost ${money(tC)}, salvage ${money(tS)}, lost profit ${money(tL)}, profit <b>$${money(tP)}</b>. ${tP === best ? `This is the best of the six policies on these days${mode === 'quiz' ? ' (Quiz 5: Q = 60, $74.40)' : ''}.` : `The best policy on these days is Q = ${QS[tot.indexOf(best)]} ($${money(best)}).`}`, ar: `مجموع الـ Q بـ ${Q}: الربح الكلي ${money(tP)} دولار. ${tP === best ? 'ودي أحسن policy من الست على الأيام دي.' : `وأحسن policy على الأيام دي هي ${QS[tot.indexOf(best)]} جرنال.`}` };
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['quiz', 'Quiz 5 days'], ['rand', 'New random days']]} v=${mode} set=${pick} />
      <div className="mf8-chips">${QS.map((q, k) => html`<button key=${q} className=${(q === Q ? 'sel' : '') + (tot[k] === best ? ' best' : '')} onClick=${() => setQ(q)}>Q = ${q} <b>${money(tot[k])}</b></button>`)}</div>
      <p className="mf8-note" style=${{ margin: '-4px 0 10px' }}>total 10-day profit of each policy (tap one) · green ring: best</p>
      <table className="mf8-tb"><thead><tr><th>Day</th><th>Type</th><th>Demand</th><th>Profit</th><th>Total</th></tr></thead><tbody>
        ${D.map((x, k) => html`<tr key=${k} className=${k === cur ? 'cur' : k >= i ? 'off' : ''}><td>${k + 1}</td><td>${x.type}</td><td>${x.d}</td><td>${money(R[k].p)}</td><td>${money(T(k))}</td></tr>`)}
      </tbody></table>
      ${cur >= 0 ? html`<div className="mf8-card mf8-f"><div>RN ${rnS(D[cur].a)} → ${D[cur].type} · RN ${rnS(D[cur].b)} → demand ${D[cur].d}</div><div>Revenue = 0.50 × ${R[cur].sold} = ${money(R[cur].rev)}</div><div>Cost = 0.33 × ${Q} = ${money(R[cur].cost)}</div><div>Salvage = 0.05 × ${R[cur].left} = ${money(R[cur].salv)}</div><div>Lost profit = 0.17 × ${R[cur].short} = ${money(R[cur].lost)}</div><div>Profit = <b>${money(R[cur].p)}</b></div></div>`
        : html`<div className=${'mf8-card mf8-f' + (fin ? '' : ' off')}>${fin ? html`<div>Revenue ${money(tR)} · Cost ${money(tC)}</div><div>Salvage ${money(tS)} · Lost profit ${money(tL)}</div><div>Total profit = <span className="mf8-big">$${money(tP)}</span></div>` : html`<span>Day by day: revenue − cost − lost profit + salvage.</span>`}</div>`}
    </div><${Cap} ...${cap} showAr=${ar} /><${Nav} i=${i} n=${N} ctl=${ctl} /></figure>`;
  }
  function NewsBest({ ar }) {
    const D = newsDays(NEWS), rows = QS.map(q => { const R = newsQ(D, q); return { q, rev: sum(R.map(r => r.rev)), cost: sum(R.map(r => r.cost)), salv: sum(R.map(r => r.salv)), lost: sum(R.map(r => r.lost)), p: sum(R.map(r => r.p)) }; });
    const steps = rows.map(r => ({ en: `Q = ${r.q}: revenue ${money(r.rev)} − cost ${money(r.cost)} − lost profit ${money(r.lost)} + salvage ${money(r.salv)} = <b>$${money(r.p)}</b>.${r.q >= 80 ? ' From Q = 70 up every demand is met: each extra 10 papers adds $33 cost and only $5 salvage, so profit falls by $28.' : ''}`, ar: `الـ Q بـ ${r.q}:${L(`${money(r.rev)} − ${money(r.cost)} − ${money(r.lost)} + ${money(r.salv)} = ${money(r.p)}`)}${r.q >= 80 ? 'ومن 70 وطالع كل الطلبات متلبّية، فكل 10 جرايد زيادة بيزوّدوا التكلفة 33 دولار والـ salvage بـ 5 بس، فالربح بيقل 28.' : ''}` }));
    steps.push({ en: 'Demands over the 10 days: 50, 70, 70, 50, 60, 50, 50, 60, 50, 70. Best policy (highest total profit): <b>Q = 60 newspapers, $74.40</b>.', ar: 'أحسن policy (أعلى ربح كلي) هي <b>إننا نشتري 60 جرنال</b> وربحها 74.40 دولار.' });
    const [i, ctl] = useSteps(steps.length, 1700);
    const lo = Math.min(0, ...rows.map(r => r.p)), hi = Math.max(...rows.map(r => r.p)), span = hi - lo, z = -lo / span * 100;
    return html`<figure className="fig mf8"><div className="fig-stage"><div className="mf8-bars">
      ${rows.map((r, k) => { const w = Math.abs(r.p) / span * 100, on = k <= i; return html`<button key=${r.q} className=${'mf8-bar' + (i === rows.length && r.q === 60 ? ' best' : '') + (k === i ? ' sel' : '')} onClick=${() => ctl.go(k)} aria-label=${`Q ${r.q}: profit ${money(r.p)}`}><span className="q">Q = ${r.q}</span><span className="trk"><i className=${r.p < 0 ? 'neg' : ''} style=${{ left: (r.p < 0 ? z - (on ? w : 0) : z) + '%', width: (on ? w : 0) + '%' }}></i><b style=${{ left: z + '%' }}></b></span><span className="v">${on ? money(r.p) : ''}</span></button>`; })}
    </div><p className="mf8-note">total profit over the 10 simulated days of Quiz 5 ($)</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [23]-[27] cake shop ── */
  const CAKE_D = [5, 1, 6, 3, 4, 4, 8, 0, 5, 6], CAKE_F = [1, 2, 1, 2, 3, 6, 3, 1, 1];
  const CAKE_CUM = CAKE_F.map((_, k) => sum(CAKE_F.slice(0, k + 1)) / 20);
  const cakeR = R => { for (let k = 0; k < 9; k++) if (R < CAKE_CUM[k] - 1e-12) return k; return 8; }; // lower end included
  const cz = (x, d, g) => x <= d ? 2.5 * x - (g || 0) * (d - x) : 3 * d - 0.5 * x;
  const m2 = v => mn(fx(v, 2));
  function CakeModel({ ar }) {
    const [x, setX] = useState(3), [d, setD] = useState(5), z = cz(x, d), c1 = x <= d;
    const cap = c1 ? { en: `Case 1, x ≤ d: all ${x} cakes are sold at a profit of $2.50 each, z = 2.50 × ${x} = <b>$${m2(z)}</b>${x < d ? ` (under-production: ${d - x} cakes of demand are not met).` : '.'}`, ar: `الحالة الأولى لأن الإنتاج أقل من أو بيساوي الطلب: كل الـ ${x} كيكات اتباعوا بربح 2.50 للواحدة.${L(`z = 2.50 × ${x} = ${m2(z)}`)}` }
      : { en: `Case 2, x &gt; d: ${d} cakes earn $2.50 each and the ${x - d} extra cakes are sold day-old at a loss of $0.50 each: z = 3.00 × ${d} − 0.50 × ${x} = <b>$${m2(z)}</b>.`, ar: `الحالة التانية لأن الإنتاج أكبر من الطلب: ${d} كيكات بربح 2.50، والـ ${x - d} الزيادة بيتباعوا day-old بخسارة 0.50 للواحدة.${L(`z = 3.00 × ${d} − 0.50 × ${x} = ${m2(z)}`)}` };
    const io = (t, s, v) => html`<div className="mf8-nd" style=${{ width: 'auto', flex: '1 1 0' }}><b>${t}</b><br /><span style=${{ fontSize: '.8rem', color: 'var(--graphite)' }}>${s}</span><br /><span className="mf8-big mf8-f">${v}</span></div>`;
    return html`<figure className="fig mf8"><div className="fig-stage">
      <div className="mf8-row"><${Num} lab="x" v=${x} set=${setX} min=${1} max=${8} /><${Num} lab="d" v=${d} set=${setD} min=${0} max=${8} /></div>
      <div className="mf8-fl">
        <div style=${{ display: 'flex', gap: '8px', width: '100%' }}>${io('Production quantity x', 'controllable input', 'x = ' + x)}${io('Daily demand d', 'uncontrollable input', 'd = ' + d)}</div>
        <div className="mf8-arw">↓</div>
        <div className="mf8-nd" style=${{ borderWidth: '2px' }}><b>Model</b>
          <div style=${{ padding: '2px 4px', borderRadius: '4px', background: c1 ? 'color-mix(in srgb, var(--fig-k) 26%, var(--paper))' : 'transparent', fontWeight: c1 ? 700 : 400 }}>If x ≤ d, z = 2.50 x</div>
          <div style=${{ padding: '2px 4px', borderRadius: '4px', background: !c1 ? 'color-mix(in srgb, var(--fig-k) 26%, var(--paper))' : 'transparent', fontWeight: !c1 ? 700 : 400 }}>If x &gt; d, z = 3.00 d − 0.50 x</div></div>
        <div className="mf8-arw">↓</div>
        ${io('Daily profit z', 'output', 'z = $' + m2(z))}
      </div>
      <p className="mf8-note">P = $4.50 selling price, C = $2.00 cost, S = $1.50 day-old price. Demand is uncertain, so this is a stochastic model.</p>
    </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }
  function CakeFlow({ ar }) {
    const nodes = [{ id: 'x', en: 'Select a production quantity' }, { id: 'g', en: 'Generate a value for daily demand' }, { id: 'z', en: 'Compute the daily profit' }, { id: 'a', en: 'Add to the total profit &nbsp;↺ return for N hypothetical days of operation' }];
    const steps = [{ at: 'x', v: { x: 3 }, en: 'Pick a production quantity x: e.g. x = 3.', ar: 'بنختار كمية إنتاج، مثلاً 3 كيكات.' }];
    let tot = 0;
    [0, 1].forEach(k => { const d = CAKE_D[k], z = cz(3, d); tot += z;
      steps.push({ at: 'g', v: { x: 3, day: k + 1, d }, en: `A hypothetical daily demand is chosen for day ${k + 1}: d = ${d}.`, ar: `بنختار demand افتراضي لليوم رقم ${k + 1} وهو ${d}.` });
      steps.push({ at: 'z', v: { x: 3, day: k + 1, d, z: m2(z) }, en: d >= 3 ? `The model gives the daily profit: x = 3 ≤ d = ${d}, so z = 3(2.50) = ${m2(z)}.` : `The model gives the daily profit: x = 3 &gt; d = ${d}, so z = 3(${d}) − 0.5(3) = ${m2(z)}.`, ar: `الـ model بيحسب الربح${L(`z = ${m2(z)}`)}` });
      steps.push({ at: 'a', v: { x: 3, day: k + 1, d, z: m2(z), total: m2(tot) }, en: `Add to the total: $${m2(tot)}. Return for the next day.`, ar: `بنضيفه للمجموع فيبقى ${m2(tot)} ونرجع لليوم اللي بعده.` }); });
    steps.push({ at: 'a', v: { x: 3, day: 10, total: '60.00' }, en: 'The daily profits are accumulated for a prespecified number of days N: after 10 days (Table 8-3) the total is $60.00.', ar: 'الأرباح اليومية بتتجمع لعدد أيام N متحدد: بعد 10 أيام (<bdi dir="ltr">Table&nbsp;8-3</bdi>) المجموع 60 دولار.' });
    return html`<${Walk} ar=${ar} nodes=${nodes} steps=${steps} ms=${2000} />`;
  }
  const SLIPS = CAKE_F.flatMap((f, d) => Array(f).fill(d));
  function CakeSlips({ ar }) {
    const [mode, setMode] = useState('slip'), [last, setLast] = useState(null), [tal, setTal] = useState(Array(9).fill(0));
    const draw = (k, R) => { const r = mode === 'rn' || R != null ? (R != null ? R : Math.random()) : null; const d = r != null ? cakeR(r) : SLIPS[k]; setLast({ k, R: r, d }); setTal(t => t.map((v, j) => j === d ? v + 1 : v)); };
    const one = () => mode === 'slip' ? draw(Math.floor(Math.random() * 20)) : draw(null, Math.random());
    const many = () => { const t = tal.slice(); for (let k = 0; k < 500; k++) t[mode === 'slip' ? SLIPS[Math.floor(Math.random() * 20)] : cakeR(Math.random())]++; setTal(t); setLast(null); };
    const n = sum(tal);
    const lo = d => d ? CAKE_CUM[d - 1] : 0;
    const cap = last ? (last.R != null ? { en: `R = ${fx(last.R, 4)} falls in ${fx(lo(last.d), 2)} to ${fx(CAKE_CUM[last.d] - 0.00001, 5)}, so d = <b>${last.d}</b>. Each interval includes its lower end${last.R === 0.15 || last.R === 0.75 ? `: R = ${last.R} equals a cumulative probability and goes to the <b>next</b> value. The random-digit reading of Lecture 2 and the rule F(xᵢ₋₁) &lt; R ≤ F(xᵢ) of Lecture 5 would give ${last.d - 1} instead; state the convention you use.` : '.'}`, ar: `الرقم${L(`R = ${fx(last.R, 4)} → d = ${last.d}`)}وكل فترة بتشمل أولها${last.R === 0.15 || last.R === 0.75 ? `، فالـ R اللي بتساوي cumulative probability بتروح للقيمة <b>اللي بعدها</b>. طريقة الـ random digits في Lecture 2 وقاعدة Lecture 5 بيحطوها في القيمة اللي قبلها، فلازم تقول إنت ماشي بأنهي convention.` : '.'}` } : { en: `Drew a slip with <b>${last.d}</b> written on it, then put it back and reshuffled (with replacement).`, ar: `سحبنا ورقة مكتوب عليها <b>${last.d}</b> ورجعناها وخلطنا تاني.` })
      : { en: `The past 20 days (Table 8-2) on 20 equal slips: 0 on one, 1 on two, 2 on one, 3 on two, 4 on three, 5 on six, 6 on three, 7 on one, 8 on one. Drawing a slip per day generates 0 about 5% of the time, 1 about 10%, and so on.${n ? ` After ${n} draws, compare your frequencies with the table.` : ''}`, ar: `الـ 20 يوم اللي فاتوا (<bdi dir="ltr">Table&nbsp;8-2</bdi>) على 20 ورقة متساوية، وسحب ورقة كل يوم بيطلّع الصفر حوالي 5% من الوقت والواحد حوالي 10% وهكذا.${n ? ` بعد ${n} سحبة قارن النسب بتاعتك بالجدول.` : ''}` };
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['slip', 'Paper slips'], ['rn', 'Random numbers']]} v=${mode} set=${m => { setMode(m); setLast(null); setTal(Array(9).fill(0)); }} />
      <div className="mf8-row"><button className="fig-btn solid" onClick=${one}>${mode === 'slip' ? 'Draw a slip' : 'Generate R'}</button><button className="fig-btn" onClick=${many}>+500 draws</button>${mode === 'rn' ? html`<button className="fig-btn" onClick=${() => draw(null, 0.15)}>R = 0.15</button><button className="fig-btn" onClick=${() => draw(null, 0.75)}>R = 0.75</button>` : null}</div>
      ${mode === 'slip' ? html`<div style=${{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', maxWidth: '260px', margin: '0 auto 10px' }}>${SLIPS.map((d, k) => html`<span key=${k} style=${{ border: '1px solid var(--line)', borderRadius: '4px', padding: '5px 0', textAlign: 'center', fontWeight: 600, fontSize: '.9rem', color: 'var(--ink)', background: last && last.k === k ? 'color-mix(in srgb, var(--fig-k) 35%, var(--paper))' : 'var(--paper)', boxShadow: last && last.k === k ? '0 0 0 2px var(--fig-k)' : 'none' }}>${d}</span>`)}</div>`
        : html`<div style=${{ maxWidth: '420px', margin: '0 auto 10px' }}><div style=${{ position: 'relative', display: 'flex', height: '28px', border: '1px solid var(--graphite)' }}>${CAKE_F.map((f, d) => html`<span key=${d} style=${{ flex: f + ' 1 0', minWidth: 0, borderLeft: d ? '1px solid var(--graphite)' : '0', display: 'grid', placeItems: 'center', fontSize: '.8rem', color: 'var(--ink)', background: last && last.d === d ? 'color-mix(in srgb, var(--fig-k) 35%, var(--paper))' : 'var(--paper)' }}>${d}</span>`)}
          ${last ? html`<i style=${{ position: 'absolute', top: '-6px', bottom: '-6px', width: '2px', background: 'var(--pen)', left: (last.R * 100) + '%' }}></i>` : null}</div>
          <div style=${{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: 'var(--graphite)' }}><span>0</span><span>0.45</span><span>0.75</span><span>1</span></div></div>`}
      <table className="mf8-tb"><thead><tr><th>d</th><th>Days</th><th>Rel. freq</th>${mode === 'rn' ? html`<th>Interval</th>` : null}<th>Yours</th></tr></thead><tbody>
        ${CAKE_F.map((f, d) => html`<tr key=${d} className=${last && last.d === d ? 'cur' : ''}><td>${d}</td><td>${f}</td><td>${fx(f / 20, 2)}</td>${mode === 'rn' ? html`<td>${fx(lo(d), 2)}-${fx(CAKE_CUM[d] - 0.00001, 5)}</td>` : null}<td>${n ? fx(tal[d] / n, 2) : '·'}</td></tr>`)}</tbody></table>
      ${n ? html`<p className="mf8-note">${n} draws</p>` : null}
    </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }
  function CakeSim({ ar }) {
    const [mode, setMode] = useState('book'), [D, setD] = useState(CAKE_D), [x, setX] = useState(3), [g, setG] = useState(0);
    const pick = m => { setMode(m); setD(m === 'book' ? CAKE_D : Array.from({ length: m === 'r500' ? 500 : 10 }, () => cakeR(Math.random()))); };
    const tot = [1, 2, 3, 4, 5, 6, 7, 8].map(q => sum(D.map(d => cz(q, d, g)))), best = Math.max(...tot);
    const long = D.length > 10, N = long ? 1 : 12;
    const [i, ctl] = useRun(N, 1500, mode + D.join() + x + g);
    const cur = !long && i >= 1 && i <= 10 ? i - 1 : -1, fin = i === N - 1;
    const Z = D.map(d => cz(x, d, g)), run = k => sum(Z.slice(0, k + 1));
    const bestX = tot.map((t, k) => t === best ? k + 1 : 0).filter(Boolean);
    let cap;
    if (long) cap = { en: `500 simulated days (each demand from the random-number intervals of Table 8-2): the totals per x are on the chips; best: x = ${bestX.join(', ')}. The book’s 500-day computer run (Table 8-5) also found x = 6 ($4467).${g ? ' With the $2 goodwill cost.' : ''}`, ar: `عملنا 500 يوم simulation، والمجاميع لكل x مكتوبة على الأزرار، وأحسن x هي ${bestX.join(' و ')}. وتشغيلة الكتاب لـ 500 يوم (<bdi dir="ltr">Table&nbsp;8-5</bdi>) طلّعت x بـ 6 برضه.` };
    else if (i === 0) cap = { en: `Production x = ${x} every day; the same ten demands are used for every x${mode === 'book' ? ' (Table 8-3: 5, 1, 6, 3, 4, 4, 8, 0, 5, 6)' : ''}.${g ? ' Q2 adds a goodwill cost of $2 per unsatisfied order: if x ≤ d, z = 2.5x − 2(d − x).' : ''}`, ar: `بننتج ${x} كيكات كل يوم، ونفس الـ 10 demands بتتستخدم لكل x.${g ? ` سؤال Q2 بيضيف goodwill cost بـ 2 دولار لكل طلب متلبّاش:${L('x ≤ d → z = 2.5x − 2(d − x)')}` : ''}` };
    else if (cur >= 0) { const d = D[cur], z = Z[cur]; cap = { en: `Day ${cur + 1}: d = ${d}. ${x <= d ? `x = ${x} ≤ d: z = 2.5(${x})${g && d > x ? ` − 2(${d - x})` : ''} = ${m2(z)}${x < d ? ` (under-production of ${d - x})` : ''}` : `x = ${x} &gt; d: z = 3(${d}) − 0.5(${x}) = ${m2(z)} (${x - d} sold day-old at a loss of $0.50 each)`}. Total $${m2(run(cur))}.`, ar: `اليوم رقم ${cur + 1} الطلب فيه ${d}.${L(`z = ${m2(z)} , total = ${m2(run(cur))}`)}` }; }
    else cap = { en: `Ten-day profit for x = ${x}: <b>$${m2(run(9))}</b>. ${mode === 'book' && !g ? 'Table 8-4 (tap the chips): the best is x = 6 ($90).' : g && mode === 'book' ? 'With goodwill, x = 6, 7 and 8 all give $86 (a three-way tie): the goodwill cost penalizes under-production, so the best quantity tends to increase.' : `Best on these days: x = ${bestX.join(', ')}.`} Ten days is too short to trust the result.`, ar: `ربح الـ 10 أيام لـ x بـ ${x} هو ${m2(run(9))} دولار. ${mode === 'book' && !g ? 'وفي <bdi dir="ltr">Table&nbsp;8-4</bdi> أحسن واحدة x بـ 6 بربح 90.' : g && mode === 'book' ? 'ومع الـ goodwill الـ x بـ 6 و 7 و 8 كلهم 86 (تعادل)، فالـ goodwill بيعاقب قلة الإنتاج والكمية الأحسن بتميل تزيد.' : `وأحسن x على الأيام دي ${bestX.join(' و ')}.`} والـ 10 أيام مدة قصيرة أوي عشان نثق في النتيجة.` };
    return html`<figure className="fig mf8"><div className="fig-stage">
      <${Seg} opts=${[['book', 'Table 8-3 demands'], ['r10', 'New 10 days'], ['r500', '500 days']]} v=${mode} set=${pick} />
      <div className="mf8-row"><button className=${'fig-btn' + (!g ? ' mf8-sel' : '')} onClick=${() => setG(0)}>No goodwill</button><button className=${'fig-btn' + (g ? ' mf8-sel' : '')} onClick=${() => setG(2)}>Q2: goodwill $2</button></div>
      <div className="mf8-chips">${tot.map((t, k) => html`<button key=${k} className=${(x === k + 1 ? 'sel' : '') + (t === best ? ' best' : '')} onClick=${() => setX(k + 1)}>x = ${k + 1} <b>${m2(t)}</b></button>`)}</div>
      <p className="mf8-note" style=${{ margin: '-4px 0 10px' }}>${long ? '500-day' : 'ten-day'} profit of each production size (tap one) · green ring: best</p>
      ${long ? null : html`<table className="mf8-tb"><thead><tr><th>Day</th><th>Demand d</th><th>Profit z</th><th>Total</th></tr></thead><tbody>
        ${D.map((d, k) => html`<tr key=${k} className=${k === cur ? 'cur' : k >= i ? 'off' : ''}><td>${k + 1}</td><td>${d}</td><td>${m2(Z[k])}</td><td>${m2(run(k))}</td></tr>`)}</tbody></table>`}
    </div><${Cap} ...${cap} showAr=${ar} />${long ? null : html`<${Nav} i=${i} n=${N} ctl=${ctl} />`}</figure>`;
  }
  function CakeCompare({ ar }) {
    const T4 = [22, 41, 60, 76, 86, 90, 88, 86], T5 = [1187, 2191, 3096, 3845, 4360, 4467, 4397, 4231];
    const steps = [
      { en: 'Table 8-4: the same ten demands for every x = 1 … 8. The best ten-day profit is <b>x = 6 ($90)</b>. But ten days is too short: demands of 2 and 7 never appeared although each has 5%.', ar: 'الـ <bdi dir="ltr">Table&nbsp;8-4</bdi>: نفس الـ 10 demands لكل x. أحسن ربح لـ 10 أيام عند <b>x بـ 6</b> وهو 90 دولار. بس 10 أيام قليلة: الطلب 2 والطلب 7 مظهروش خالص مع إن كل واحد ليه 5%.' },
      { en: 'Table 8-5: a computer simulation of <b>500 days</b>; the longer run follows Table 8-2 more closely. It also gives <b>x = 6</b> as the best ($4467).', ar: 'الـ <bdi dir="ltr">Table&nbsp;8-5</bdi> فيه simulation على الكمبيوتر لـ <b>500 يوم</b> بتمشي مع <bdi dir="ltr">Table&nbsp;8-2</bdi> أكتر، وبرضه أحسن حاجة <b>x بـ 6</b> بربح 4467.' },
      { en: 'Conclusion: if the model and the demand distribution are appropriate, produce <b>x = 6 cakes per day</b>.', ar: 'النتيجة: لو الـ model وتوزيع الطلب مناسبين، ننتج <b>6 كيكات كل يوم</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const grp = (T, title, on) => html`<div style=${{ opacity: on ? 1 : .3, transition: 'opacity .4s' }}><p className="mf8-note" style=${{ margin: '0 0 6px', fontWeight: 600 }}>${title}</p><div className="mf8-bars">${T.map((v, k) => html`<div key=${k} className=${'mf8-bar' + (k === 5 ? ' best' : '')} style=${{ cursor: 'default' }}><span className="q">x = ${k + 1}</span><span className="trk"><i style=${{ left: 0, width: (on ? v / Math.max(...T) * 100 : 0) + '%' }}></i></span><span className="v">${v}</span></div>`)}</div></div>`;
    return html`<figure className="fig mf8"><div className="fig-stage"><div style=${{ display: 'grid', gap: '14px' }}>${grp(T4, 'Ten-day profit ($), Table 8-4', true)}${grp(T5, '500-day profit ($), Table 8-5', i >= 1)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [28] Figure 8-8: one simulated day of the inventory system ── */
  function InvDay({ ar }) {
    const [a, setA] = useState({ arr: true, sat: true, reo: true, out: false });
    const nodes = [
      { id: 'b', k: 't', en: 'Begin day' },
      { id: 'q1', k: 'd', en: 'Any arrivals?', y: 'Update inventory I = I + x', n: '↓' },
      { id: 'g', en: 'Generate daily demand d' },
      { id: 'q2', k: 'd', en: 'Can inventory satisfy demand, I ≥ d ?', y: 'Update inventory I = I − d', n: 'Shortage cost $50 (d − I); I = 0' },
      { id: 'q3', k: 'd', en: 'Has the reorder point been reached, I ≤ r ?', y: '↓', n: 'holding cost' },
      { id: 'q4', k: 'd', en: 'Is an order currently outstanding?', y: 'holding cost', n: 'Place an order (cost = $20); generate lead time L' },
      { id: 'h', en: 'Compute holding cost (0.10)(I)' },
      { id: 't', en: 'Compute total daily cost' }
    ];
    const steps = [{ at: 'b', en: 'Begin the day.', ar: 'بداية اليوم.' },
      { at: 'q1', br: a.arr ? 'y' : 'n', en: a.arr ? 'An order arrives at the start of the day: I = I + x.' : 'No order arrives today.', ar: a.arr ? `فيه طلبية وصلت أول اليوم فبنزوّد المخزون${L('I = I + x')}` : 'مفيش طلبيات وصلت النهارده.' },
      { at: 'g', en: 'Generate the daily demand d from its distribution.', ar: 'بنطلّع الـ demand بتاع اليوم من التوزيع بتاعه.' },
      { at: 'q2', br: a.sat ? 'y' : 'n', en: a.sat ? 'I ≥ d: the demand is met, I = I − d.' : 'I &lt; d: the customer takes what is available and buys the rest elsewhere: shortage cost $50(d − I), then I = 0.', ar: a.sat ? `المخزون يكفي فبنطرح${L('I = I − d')}` : `المخزون مش كفاية، فالزبون بياخد الموجود ويشتري الباقي من برّه:${L('shortage = 50 (d − I) , I = 0')}` },
      { at: 'q3', br: a.reo ? 'y' : 'n', en: a.reo ? 'I ≤ r: the reorder point has been reached.' : 'I &gt; r: no need to order.', ar: a.reo ? 'المخزون وصل لنقطة الـ reorder أو أقل.' : 'المخزون لسه فوق نقطة الـ reorder فمش محتاجين نطلب.' }];
    if (a.reo) steps.push({ at: 'q4', br: a.out ? 'y' : 'n', en: a.out ? 'An order is already outstanding: never two orders outstanding, so no new order.' : 'No order outstanding: place an order ($20) and generate its lead time L.', ar: a.out ? 'فيه طلبية لسه موصلتش، ومينفعش طلبيتين في نفس الوقت، فمفيش طلب جديد.' : 'مفيش طلبية معلقة، فبنطلب (التكلفة 20 دولار) ونطلّع الـ lead time L.' });
    const parts = [!a.sat ? '$50(d − I)' : null, a.reo && !a.out ? '$20' : null, '0.10 × I'].filter(Boolean);
    steps.push({ at: 'h', en: 'Holding cost: $0.10 per unit left in inventory, 0.10 × I.', ar: `تكلفة التخزين 0.10 دولار لكل وحدة فاضلة:${L('holding = 0.10 × I')}` });
    steps.push({ at: 't', en: `Total daily cost = shortage + ordering + holding = ${parts.join(' + ')}.`, ar: `التكلفة الكلية لليوم هي الـ shortage والـ ordering والـ holding:${L(`cost = ${parts.join(' + ')}`)}` });
    const tg = (k, lab) => html`<button className=${'fig-btn' + (a[k] ? ' mf8-sel' : '')} onClick=${() => setA(Object.assign({}, a, { [k]: !a[k] }))}>${lab}: ${a[k] ? 'Yes' : 'No'}</button>`;
    return html`<${Walk} key=${JSON.stringify(a)} ar=${ar} nodes=${nodes} steps=${steps} ms=${1700} top=${html`<div className="mf8-row">${tg('arr', 'Arrival')}${tg('sat', 'I ≥ d')}${tg('reo', 'I ≤ r')}${a.reo ? tg('out', 'Outstanding') : null}</div>`} />`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ms-rand-alg': RandAlg, 'ms-coin-flow': CoinFlow, 'ms-coin-sim': CoinSim, 'ms-gift-events': GiftEvents,
    'ms-gift-ex': ({ ar }) => html`<${GiftSim} ar=${ar} start="ex" />`, 'ms-gift-exr': ({ ar }) => html`<${GiftSim} ar=${ar} start="exr" />`, 'ms-gift-run': ({ ar }) => html`<${GiftSim} ar=${ar} start="run" />`,
    'ms-area-fig': AreaFig, 'ms-area-flow': AreaFlow, 'ms-area-sim': AreaSim,
    'ms-pursuit-pos': PursuitPos, 'ms-pursuit-flow': PursuitFlow, 'ms-pursuit-sim': PursuitSim,
    'ms-drunk-flow': DrunkFlow, 'ms-drunk-sim': DrunkSim, 'ms-flip-flow': FlipFlow, 'ms-flip-quiz': FlipQuiz,
    'ms-news-days': NewsDays, 'ms-news-best': NewsBest,
    'ms-cake-model': CakeModel, 'ms-cake-flow': CakeFlow, 'ms-cake-slips': CakeSlips, 'ms-cake-sim': CakeSim, 'ms-cake-compare': CakeCompare,
    'ms-inv-day': InvDay
  });
})();

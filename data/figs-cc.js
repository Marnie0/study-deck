// Visuals for the Compiler Design notes (names 'cc-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('cf-accent')) { const s = document.createElement('style'); s.id = 'cf-accent'; s.textContent = '[data-fig^="cc-"]{ --fig-k: var(--k-compiler); --fig-s: var(--s-compiler); }'; document.head.appendChild(s); } })();
/* ── part 1 ── */
// Compiler Design visuals, part 1: Lecture 1 (Introduction to Compilers), slides 3, 4, 6, 7, 8, 9–10, 11–14, 15–17, 18–20.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.cf1{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cf1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cf1 .fig-btn.cf1-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cf1-k{ color:var(--k-compiler); font-weight:700; }
.cf1-mono{ font-family:var(--mono); }
.cf1-muted{ color:var(--graphite); font-size:.84rem; }
.cf1-fade{ transition:opacity .5s ease; }
/* trees */
.cf1-tw{ max-width:620px; margin:0 auto; }
.cf1-tw svg{ max-width:620px !important; }
.cf1-ol, .cf1-ol ul{ list-style:none; margin:0; padding:0; }
.cf1-ol ul{ padding-left:12px; }
.cf1-ol li{ position:relative; padding:2px 0 2px 14px; }
.cf1-ol > li{ padding-left:0; }
.cf1-ol ul > li::before{ content:""; position:absolute; left:0; top:0; bottom:0; border-left:1.5px solid var(--faint); }
.cf1-ol ul > li:last-child::before{ bottom:auto; height:14px; }
.cf1-ol ul > li::after{ content:""; position:absolute; left:0; top:14px; width:10px; border-top:1.5px solid var(--faint); }
.cf1-nd{ display:inline-block; font-size:.92rem; line-height:1.35; color:var(--ink); padding:1px 5px; border-radius:5px; transition:background .4s, box-shadow .4s; }
.cf1-nd.hi{ background:color-mix(in srgb, var(--k-compiler) 20%, var(--paper)); box-shadow:0 0 0 1.5px var(--k-compiler); }
.cf1-nd.term{ font-family:var(--mono); font-weight:700; }
.cf1-v{ font-family:var(--mono); font-weight:700; color:var(--k-compiler); margin-left:6px; }
.cf1-t{ font-style:italic; color:var(--ok); margin-left:6px; }
/* phases */
.cf1-ph svg{ max-width:400px !important; }
.cf1-ph .bx{ cursor:pointer; }
.cf1-ph .bx rect{ fill:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); stroke:var(--graphite); stroke-width:1.2; transition:stroke .3s, stroke-width .3s, fill .3s; }
.cf1-ph .bx.on rect{ fill:color-mix(in srgb, var(--k-compiler) 42%, var(--paper)); stroke:var(--k-compiler); stroke-width:3; }
.cf1-ph .bx:focus{ outline:none; } .cf1-ph .bx:focus-visible rect{ stroke:var(--pen); stroke-width:3; }
.cf1-ph .hp rect{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.2; transition:stroke .3s, stroke-width .3s; }
.cf1-ph .hp.on rect{ stroke:var(--k-compiler); stroke-width:3; }
.cf1-ph .ln{ stroke:var(--graphite); stroke-width:1.5; fill:none; transition:stroke .3s, opacity .4s; }
.cf1-ph .ln.on{ stroke:var(--k-compiler); stroke-width:2.5; }
.cf1-ph .ar{ stroke:var(--ink); stroke-width:1.6; fill:none; }
.cf1-out{ max-width:560px; margin:10px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; color:var(--ink); min-width:0; }
.cf1-oh{ display:block; font-size:.84rem; color:var(--graphite); font-weight:600; margin-bottom:6px; }
.cf1-src{ font:700 1.1rem/1.4 var(--mono); color:var(--k-compiler); }
/* tokens */
.cf1-toks{ display:flex; flex-wrap:wrap; gap:6px; }
.cf1-tok{ border:1px solid var(--line); border-radius:8px; padding:3px 7px; font-size:.86rem; background:var(--paper-2); line-height:1.3; }
.cf1-tok .lx{ font-family:var(--mono); font-weight:700; color:var(--k-compiler); margin-right:5px; }
/* code boxes */
.cf1-cg{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center; max-width:560px; margin:0 auto; }
.cf1-code{ font-family:var(--mono); font-size:.9rem; line-height:1.6; border:1.5px solid var(--graphite); border-radius:6px; background:var(--paper); padding:6px 10px; color:var(--ink); min-width:0; transition:opacity .5s, box-shadow .4s; }
.cf1-code.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cf1-ln{ display:block; white-space:pre; border-radius:3px; padding:0 3px; transition:background .4s, opacity .4s; }
.cf1-ln.on{ background:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); }
.cf1-ln.gone{ text-decoration:line-through; opacity:.45; }
.cf1-ln.new{ background:color-mix(in srgb, var(--ok) 20%, var(--paper)); }
.cf1-arw{ display:flex; flex-direction:column; align-items:center; color:var(--k-compiler); font-size:.84rem; font-weight:600; text-align:center; line-height:1.2; }
.cf1-arw i{ font-style:normal; font-size:1.4rem; line-height:1; }
.cf1-tasks{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:10px auto 0; max-width:560px; }
.cf1-task{ font-size:.86rem; border:1px solid var(--line); border-radius:99px; padding:3px 10px; background:var(--paper); color:var(--ink); transition:opacity .4s, box-shadow .4s; }
.cf1-task.on{ box-shadow:0 0 0 2px var(--pen); color:var(--pen); font-weight:600; }
/* IR boxes */
.cf1-ir{ display:grid; gap:4px; justify-items:center; max-width:340px; margin:0 auto; }
.cf1-ir .cf1-code{ width:100%; text-align:center; font-size:.98rem; box-sizing:border-box; }
.cf1-ir .dn{ color:var(--ink); font-size:1.2rem; line-height:1; }
.cf1-ch{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); border-radius:3px; padding:0 2px; font-weight:700; }
/* compiler vs interpreter */
.cf1-cvi{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:560px; margin:0 auto; color:var(--ink); }
.cf1-col{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; min-width:0; }
.cf1-hd{ display:block; text-align:center; font-weight:700; font-size:.98rem; color:var(--k-compiler); margin-bottom:6px; }
.cf1-prog{ border:1px dashed var(--faint); border-radius:6px; padding:4px; display:grid; gap:3px; transition:box-shadow .4s, background .4s; }
.cf1-prog.all{ box-shadow:0 0 0 2px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 12%, var(--paper)); }
.cf1-stm{ font:500 .82rem/1.3 var(--mono); padding:2px 4px; border-radius:4px; overflow-wrap:anywhere; }
.cf1-stm.seq{ animation:cf1seq 3.6s linear infinite; }
@keyframes cf1seq{ 0%,30%{ background:color-mix(in srgb, var(--k-compiler) 30%, var(--paper)); } 33%,100%{ background:transparent; } }
.cf1-row{ margin-top:6px; padding:6px; border-radius:8px; background:var(--paper-2); font-size:.84rem; line-height:1.35; }
.cf1-row.cur{ box-shadow:0 0 0 2px var(--k-compiler); }
.cf1-mc{ margin-top:4px; text-align:center; font:600 .82rem/1.3 var(--mono); border:1.5px solid var(--graphite); border-radius:5px; padding:3px; }
.cf1-bars{ display:grid; grid-template-columns:auto minmax(0, 1fr); gap:3px 6px; align-items:center; margin-top:4px; font-size:.8rem; }
.cf1-bars i{ display:block; height:10px; border-radius:99px; background:var(--k-compiler); transition:width .6s; }
.cf1-bars i.ex{ background:var(--graphite); }
.cf1-chips{ display:flex; flex-wrap:wrap; gap:4px; margin-top:4px; }
.cf1-chips span{ font-size:.82rem; border:1px solid var(--line); border-radius:99px; padding:1px 8px; background:var(--paper); }
/* scanner */
.cf1-sc{ max-width:560px; margin:0 auto; color:var(--ink); }
.cf1-in{ font-family:var(--mono); font-size:1rem; width:100%; max-width:300px; box-sizing:border-box; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.cf1-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.cf1-chars{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin:10px 0; }
.cf1-chars span{ display:grid; place-items:center; min-width:22px; height:30px; padding:0 2px; box-sizing:border-box; font:700 1rem/1 var(--mono); border:1px solid var(--line); border-radius:4px; background:var(--paper); transition:background .3s, box-shadow .3s; }
.cf1-chars span.sp{ color:var(--faint); font-weight:400; }
.cf1-chars span.done{ background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cf1-chars span.cur{ background:color-mix(in srgb, var(--k-compiler) 36%, var(--paper)); box-shadow:0 0 0 2px var(--k-compiler); }
.cf1-chars span.bad{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
.cf1-tt{ width:100%; max-width:340px; margin:0 auto; border-collapse:collapse; font-size:.92rem; }
.cf1-tt th, .cf1-tt td{ border:1px solid var(--line); padding:3px 8px; text-align:left; }
.cf1-tt th{ background:var(--paper-2); font-weight:700; }
.cf1-tt td:first-child{ font-family:var(--mono); font-weight:700; color:var(--k-compiler); }
.cf1-tt tr.cur td{ background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cf1-tt td.bad{ color:var(--pen); }
/* is it a phase */
.cf1-q{ max-width:420px; margin:0 auto; text-align:center; color:var(--ink); }
.cf1-item{ font-size:1.2rem; font-weight:700; padding:14px 8px; border:1px solid var(--line); border-radius:12px; background:var(--paper); margin-bottom:10px; }
.cf1-pick{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; }
.cf1-fb{ margin-top:10px; font-weight:700; }
.cf1-fb.ok{ color:var(--ok); } .cf1-fb.no{ color:var(--pen); }
.cf1-bins{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; margin-top:12px; text-align:left; }
.cf1-bin{ border:1px solid var(--line); border-radius:10px; padding:6px 8px; background:var(--paper); font-size:.84rem; line-height:1.45; min-height:3em; }
.cf1-bin > span{ display:block; font-weight:700; color:var(--graphite); margin-bottom:2px; }
/* data structures */
.cf1-ds{ max-width:560px; margin:0 auto; color:var(--ink); }
.cf1-dsb{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:10px; }
.cf1-dsb .fig-btn{ font-size:.84rem; padding:4px 10px; }
.cf1-pts{ margin:0 0 8px; padding-left:18px; font-size:.9rem; line-height:1.45; }
.cf1-st{ border-collapse:collapse; font-size:.9rem; margin:0 auto; }
.cf1-st th, .cf1-st td{ border:1px solid var(--line); padding:3px 8px; text-align:left; }
.cf1-st th{ background:var(--paper-2); }
.cf1-st td:first-child{ font-family:var(--mono); font-weight:700; color:var(--k-compiler); }
@media (prefers-reduced-motion: reduce){ .cf1-stm.seq{ animation:none; } .cf1-fade, .cf1-code, .cf1-ln, .cf1-nd, .cf1-chars span{ transition:none; } }
`;
  if (!document.getElementById('cf1-css')) { const s = document.createElement('style'); s.id = 'cf1-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ───────── trees (slides 7, 8, 10, 12, 13) ───────── */
  // node: { id, p (parent id), l (label), v (value line), t (type line), x (extra: not used for layout) }
  const TF = 19, LH = 23, GAP = 14;
  const tw = (s, mono) => s.length * TF * (mono ? .62 : .54);
  const nodeW = n => Math.max(tw(n.l), n.v ? tw(n.v, true) : 0, n.t ? tw(n.t) : 0) + 14;
  const nLines = n => 1 + (n.v ? 1 : 0) + (n.t ? 1 : 0);
  function layoutTree(nodes) {
    const kids = {}, by = {}, dep = {}; let root;
    nodes.forEach(n => { by[n.id] = n; if (n.p == null) root = n.id; else (kids[n.p] = kids[n.p] || []).push(n.id); });
    const maxL = Math.max(...nodes.map(nLines)), rowH = maxL * LH + 30, W = {};
    const wid = id => { const ks = kids[id] || []; const sum = ks.reduce((a, c) => a + wid(c), 0) + GAP * Math.max(0, ks.length - 1); return (W[id] = Math.max(nodeW(by[id]), sum)); };
    wid(root);
    const pos = {}; let maxD = 0;
    const place = (id, left, d) => {
      dep[id] = d; maxD = Math.max(maxD, d); const ks = kids[id] || [];
      if (!ks.length) { pos[id] = { x: left + W[id] / 2, y: d * rowH }; return; }
      const sum = ks.reduce((a, c) => a + W[c], 0) + GAP * (ks.length - 1); let cur = left + (W[id] - sum) / 2;
      ks.forEach(c => { place(c, cur, d + 1); cur += W[c] + GAP; });
      pos[id] = { x: (pos[ks[0]].x + pos[ks[ks.length - 1]].x) / 2, y: d * rowH };
    };
    place(root, 0, 0);
    return { pos, dep, rowH, W: W[root], H: maxD * rowH + (maxL - 1) * LH + 12 };
  }
  // all: every node that may appear; show(id): visible now; tOn(id): its type line visible; hi: Set of highlighted ids; over: {id: {x,y}} position overrides
  function Tree({ all, show, tOn, hi, over, label }) {
    const base = all.filter(n => !n.x), L = useRef(null);
    if (!L.current) L.current = layoutTree(base);
    const lay = L.current, wrap = useRef(null), [wide, setWide] = useState(false);
    const need = (lay.W + 16) * 11.8 / TF;
    useEffect(() => {
      const el = wrap.current; if (!el) return;
      const f = () => setWide(el.clientWidth >= need);
      f(); if (!window.ResizeObserver) return; const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect();
    }, []);
    const by = {}; all.forEach(n => { by[n.id] = n; });
    const P = id => (over && over[id]) || lay.pos[id];
    const isT = id => tOn ? tOn(id) : true;
    const H = hi || new Set();
    if (wide) {
      const edges = all.filter(n => n.p != null && by[n.p]).map(n => {
        const a = P(n.p), b = P(n.id), pa = by[n.p];
        const on = show(n.id) && show(n.p);
        const y1 = a.y + (nLines(pa) - 1) * LH + 8, y2 = b.y - TF * .85 - 2;
        return html`<line key=${'e' + n.id} x1=${a.x} y1=${y1} x2=${b.x} y2=${y2} stroke="var(--graphite)" strokeWidth="1.5" className="cf1-fade" style=${{ opacity: on ? 1 : 0, stroke: H.has(n.id) && H.has(n.p) ? 'var(--k-compiler)' : 'var(--graphite)', strokeWidth: H.has(n.id) && H.has(n.p) ? 3 : 1.5 }} />`;
      });
      const nodes = all.map(n => {
        const p = P(n.id), on = show(n.id), h = H.has(n.id), w = nodeW(n) - 6;
        let k = 0;
        return html`<g key=${n.id} style=${{ transform: `translate(${p.x}px, ${p.y}px)`, transition: calm() ? 'none' : 'transform .8s ease, opacity .5s ease', opacity: on ? 1 : 0 }}>
          <rect x=${-w / 2} y=${-TF - 2} width=${w} height=${nLines(n) * LH + 6} rx="6" style=${{ fill: h ? 'color-mix(in srgb, var(--k-compiler) 20%, var(--paper))' : 'transparent', stroke: h ? 'var(--k-compiler)' : 'none', strokeWidth: 1.5, transition: 'fill .4s' }} />
          <text x="0" y="0" textAnchor="middle" fontSize=${TF} style=${{ fontFamily: n.term ? 'var(--mono)' : 'inherit', fontWeight: n.term ? 700 : 400 }}>${n.l}</text>
          ${n.v && html`<text x="0" y=${LH * ++k} textAnchor="middle" fontSize=${TF} style=${{ fontFamily: 'var(--mono)', fontWeight: 700, fill: 'var(--k-compiler)' }}>${n.v}</text>`}
          ${n.t && html`<text x="0" y=${LH * (++k)} textAnchor="middle" fontSize=${TF} className="cf1-fade" style=${{ fontStyle: 'italic', fill: 'var(--ok)', opacity: isT(n.id) ? 1 : 0 }}>${n.t}</text>`}
        </g>`;
      });
      return html`<div className="cf1-tw" ref=${wrap}><svg viewBox=${`-8 -${TF + 6} ${lay.W + 16} ${lay.H + TF + 10}`} role="img" aria-label=${label}>${edges}${nodes}</svg></div>`;
    }
    const kids = {}; let root;
    all.forEach(n => { if (!show(n.id)) return; if (n.p == null) root = n.id; else (kids[n.p] = kids[n.p] || []).push(n.id); });
    const li = id => { const n = by[id]; return html`<li key=${id}><span className=${'cf1-nd' + (H.has(id) ? ' hi' : '') + (n.term ? ' term' : '')}>${n.l}${n.v && html`<span className="cf1-v">${n.v}</span>`}${n.t && isT(id) && html`<span className="cf1-t">${n.t}</span>`}</span>${kids[id] && html`<ul>${kids[id].map(li)}</ul>`}</li>`; };
    return html`<div className="cf1-tw" ref=${wrap} role="img" aria-label=${label}><ul className="cf1-ol">${root != null && li(root)}</ul></div>`;
  }

  const PARSE = [
    { id: 'e0', p: null, l: 'expression' }, { id: 'as', p: 'e0', l: 'Assign-expression' },
    { id: 'eL', p: 'as', l: 'expression' }, { id: 'eq', p: 'as', l: '=', term: 1 }, { id: 'eR', p: 'as', l: 'expression' },
    { id: 'sb', p: 'eL', l: 'subscript-expression' }, { id: 'ad', p: 'eR', l: 'additive-expression' },
    { id: 'e1', p: 'sb', l: 'Expression' }, { id: 'lb', p: 'sb', l: '[', term: 1 }, { id: 'e2', p: 'sb', l: 'expression' }, { id: 'rb', p: 'sb', l: ']', term: 1 },
    { id: 'e3', p: 'ad', l: 'expression' }, { id: 'pl', p: 'ad', l: '+', term: 1 }, { id: 'e4', p: 'ad', l: 'expression' },
    { id: 'i1', p: 'e1', l: 'identifier', v: 'a' }, { id: 'i2', p: 'e2', l: 'identifier', v: 'index' },
    { id: 'n4', p: 'e3', l: 'number', v: '4' }, { id: 'n2', p: 'e4', l: 'number', v: '2' }
  ];
  const SYN = [
    { id: 'as', p: null, l: 'Assign-expression' },
    { id: 'sb', p: 'as', l: 'subscript-expression', t: 'integer' }, { id: 'ad', p: 'as', l: 'additive-expression', t: 'integer' },
    { id: 'i1', p: 'sb', l: 'identifier', v: 'a', t: 'array of integer' }, { id: 'i2', p: 'sb', l: 'identifier', v: 'index', t: 'integer' },
    { id: 'n4', p: 'ad', l: 'number', v: '4', t: 'integer' }, { id: 'n2', p: 'ad', l: 'number', v: '2', t: 'integer' }
  ];
  const SYN_PLAIN = SYN.map(n => Object.assign({}, n, { t: undefined }));
  const depthOf = (nodes) => { const by = {}; nodes.forEach(n => { by[n.id] = n; }); const d = id => by[id].p == null ? 0 : 1 + d(by[id].p); const o = {}; nodes.forEach(n => { o[n.id] = d(n.id); }); return o; };
  const PD = depthOf(PARSE), SD = depthOf(SYN);

  /* ───────── slide 3: compilers vs interpreters ───────── */
  function CompVsInterp({ ar }) {
    const steps = [
      { en: 'An <b>interpreter</b> and a <b>compiler</b> get the same program. The slide compares them in four rows.', ar: 'الـ <b>interpreter</b> والـ <b>compiler</b> واخدين نفس البرنامج. الـ slide بتقارن بينهم في 4 صفوف.' },
      { en: 'Interpreter: translates the program <b>one statement at a time</b>. Compiler: <b>scans the entire program</b> and translates it as a whole into machine code.', ar: 'الـ interpreter: بيترجم البرنامج <b>statement واحدة في المرة</b>. الـ compiler: <b>بيعمل scan للبرنامج كله</b> ويترجمه مرة واحدة لـ machine code.' },
      { en: 'Interpreter: usually <b>less time to analyze</b> the source code, but the overall execution is <b>slower</b>. Compiler: usually a <b>large amount of time to analyze</b>, but the overall execution is <b>faster</b>. (Bar lengths only show more or less; the slide gives no numbers.)', ar: 'الـ interpreter: غالباً <b>وقت أقل في الـ analysis</b> للـ source code، بس الـ execution كله <b>أبطأ</b>. الـ compiler: غالباً <b>وقت كبير في الـ analysis</b>، بس الـ execution <b>أسرع</b>. (طول الـ bars بيوضح أكتر وأقل بس؛ الـ slide مفيهاش أرقام.)' },
      { en: 'Interpreter: <b>no intermediate object code</b> is generated, so it is <b>memory efficient</b>. Compiler: generates <b>intermediate object code</b> which further requires <b>linking</b>, so it requires <b>more memory</b>.', ar: 'الـ interpreter: <b>مفيش intermediate object code</b> بيتعمل، فهو <b>موفّر في الـ memory</b>. الـ compiler: بيعمل <b>intermediate object code</b> محتاج <b>linking</b> بعد كده، فبيحتاج <b>memory أكتر</b>.' },
      { en: 'Languages that use interpreters: <b>JavaScript, Python, Ruby</b>. Languages that use compilers: <b>C, C++, Java</b>.', ar: 'لغات بتستخدم interpreters: <b>JavaScript و Python و Ruby</b>. لغات بتستخدم compilers: <b>C و C++ و Java</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const S = ['statement 1', 'statement 2', 'statement 3'];
    const row = (k, body) => html`<div className=${'cf1-row ' + pop(i >= k) + (i === k ? ' cur' : '')}>${body}</div>`;
    const bars = (an, ex) => html`<div className="cf1-bars"><span>analyze</span><span><i style=${{ width: an }}></i></span><span>execute</span><span><i className="ex" style=${{ width: ex }}></i></span></div>`;
    return html`<figure className="fig cf1"><div className="fig-stage"><div className="cf1-cvi">
      <div className="cf1-col"><span className="cf1-hd">Interpreter</span>
        <div className="cf1-prog">${S.map((s, k) => html`<div key=${k} className=${'cf1-stm' + (i === 1 && !calm() ? ' seq' : '')} style=${{ animationDelay: (k * 1.2) + 's' }}>${s}</div>`)}</div>
        ${row(1, html`<span>One statement at a time.</span>`)}
        ${row(2, html`<span>Less time to analyze; slower execution.</span>${bars('30%', '90%')}`)}
        ${row(3, html`<span>No intermediate object code: memory efficient.</span>`)}
        ${row(4, html`<div className="cf1-chips"><span>JavaScript</span><span>Python</span><span>Ruby</span></div>`)}
      </div>
      <div className="cf1-col"><span className="cf1-hd">Compiler</span>
        <div className=${'cf1-prog' + (i === 1 ? ' all' : '')}>${S.map((s, k) => html`<div key=${k} className="cf1-stm">${s}</div>`)}</div>
        ${row(1, html`<span>The entire program, as a whole:</span><div className="cf1-mc">machine code</div>`)}
        ${row(2, html`<span>More time to analyze; faster execution.</span>${bars('90%', '30%')}`)}
        ${row(3, html`<span>Intermediate object code → linking: more memory.</span>`)}
        ${row(4, html`<div className="cf1-chips"><span>C</span><span>C++</span><span>Java</span></div>`)}
      </div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slide 4: phases of a compiler, with the slides' example a[index]=4+2 ───────── */
  const PHASES = ['Scanner', 'Parser', 'Semantics Analyzer', 'Source Code Optimizer', 'Code Generator', 'Target Code Optimizer'];
  const FLOW = ['Source code', 'Tokens', 'Syntax Tree', 'Annotated Tree', 'Intermediate code', 'Target code', 'Target code'];
  const TOKS = [['a', 'identifier'], ['[', 'left bracket'], ['index', 'identifier'], [']', 'right bracket'], ['=', 'assignment'], ['4', 'number'], ['+', 'plus sign'], ['2', 'number']];
  const GEN = ['MOV R0, index', 'MUL R0,2', 'MOV R1,&a', 'ADD R1,R0', 'MOV *R1,6'];
  const OPT = ['MOV R0, index', 'SHL R0', 'MOV &a[R1],6'];
  function Phases({ ar }) {
    const steps = [
      { en: 'The slides’ example <b>a[index]=4+2</b> enters as <b>source code</b>. Press Next to send it through the six phases, or tap a phase.', ar: 'مثال الـ slides <b>a[index]=4+2</b> بيدخل كـ <b>source code</b>. دوس Next عشان يعدّي على الـ six phases، أو دوس على أي phase.' },
      { en: '<b>1 Scanner</b> → <b>tokens</b>: it collects sequences of characters into meaningful units (slide 6).', ar: '<b>1 الـ Scanner</b> → <b>tokens</b>: بيجمّع سلاسل الحروف في وحدات ليها معنى (slide 6).' },
      { en: '<b>2 Parser</b> → <b>syntax tree</b>: it determines the structure of the program (slide 8).', ar: '<b>2 الـ Parser</b> → <b>syntax tree</b>: بيحدد الـ structure بتاع البرنامج (slide 8).' },
      { en: '<b>3 Semantics Analyzer</b> → <b>annotated tree</b>: the syntax tree with its attributes (the types) added (slide 10).', ar: '<b>3 الـ Semantics Analyzer</b> → <b>annotated tree</b>: الـ syntax tree ومعاها الـ attributes (الـ types) (slide 10).' },
      { en: '<b>4 Source Code Optimizer</b> → <b>intermediate code</b>: 4+2 is folded to 6, so the code becomes a[index]=6 (slides 13 and 14).', ar: '<b>4 الـ Source Code Optimizer</b> → <b>intermediate code</b>: الـ 4+2 بتتعمل fold لـ 6، فالكود بيبقى a[index]=6 (slides 13 و 14).' },
      { en: '<b>5 Code Generator</b> → <b>target code</b>: a code sequence in a hypothetical assembly language (slide 16).', ar: '<b>5 الـ Code Generator</b> → <b>target code</b>: code sequence بـ assembly language افتراضية (slide 16).' },
      { en: '<b>6 Target Code Optimizer</b> → improved <b>target code</b>: MUL R0,2 becomes SHL R0 and five lines become three (slide 17).', ar: '<b>6 الـ Target Code Optimizer</b> → <b>target code</b> أحسن: الـ MUL R0,2 بقت SHL R0 والـ 5 سطور بقوا 3 (slide 17).' },
      { en: 'Every phase is linked to the <b>Literal Table</b>, the <b>Symbol Table</b> and the <b>Error Handler</b>. They are data structures and helpers, <b>not phases</b>.', ar: 'كل phase متوصلة بالـ <b>Literal Table</b> والـ <b>Symbol Table</b> والـ <b>Error Handler</b>. دول data structures وأدوات مساعدة، <b>مش phases</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3400);
    const X = 6, BW = 204, BH = 30, cx = X + BW / 2, by = k => 30 + k * 64, J = { x: 250, y: 208 }, HX = 268, HW = 70;
    const helpers = [['Literal', 'Table', 118], ['Symbol', 'Table', 208], ['Error', 'Handler', 298]];
    let out;
    if (i === 0) out = html`<span className="cf1-oh">Source code</span><div className="cf1-src">a[index]=4+2</div>`;
    else if (i === 1) out = html`<span className="cf1-oh">Tokens</span><div className="cf1-toks">${TOKS.map(([l, k], j) => html`<span key=${j} className="cf1-tok"><span className="lx">${l}</span>${k}</span>`)}</div>`;
    else if (i === 2) out = html`<span className="cf1-oh">Syntax tree</span><${Tree} all=${SYN_PLAIN} show=${() => true} label="Syntax tree of a[index]=4+2" />`;
    else if (i === 3) out = html`<span className="cf1-oh">Annotated tree</span><${Tree} all=${SYN} show=${() => true} label="Annotated syntax tree of a[index]=4+2" />`;
    else if (i === 4) out = html`<span className="cf1-oh">Intermediate code</span><div className="cf1-src">a[index]=6</div>`;
    else if (i === 5) out = html`<span className="cf1-oh">Target code</span><div className="cf1-code">${GEN.map((l, j) => html`<span key=${j} className="cf1-ln">${l}</span>`)}</div>`;
    else if (i === 6) out = html`<span className="cf1-oh">Target code (optimized)</span><div className="cf1-code">${OPT.map((l, j) => html`<span key=${j} className=${'cf1-ln' + (j ? ' new' : '')}>${l}</span>`)}</div>`;
    else out = html`<span className="cf1-oh">Not phases</span><div className="cf1-toks"><span className="cf1-tok">Literal Table</span><span className="cf1-tok">Symbol Table</span><span className="cf1-tok">Error Handler</span></div>`;
    const key = (k) => e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctl.go(k); } };
    return html`<figure className="fig cf1"><div className="fig-stage"><div className="cf1-ph">
      <svg viewBox="0 0 344 432" role="img" aria-label="Phases of a compiler: six phases in a chain, each linked to the literal table, symbol table and error handler">
        <defs><marker id="cf1-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" style=${{ fill: 'var(--ink)' }} /></marker></defs>
        ${PHASES.map((_, k) => html`<line key=${'l' + k} x1=${X + BW} y1=${by(k) + BH / 2} x2=${J.x} y2=${J.y} className=${'ln' + (i === 7 ? ' on' : '')} style=${{ opacity: i === 7 || i === k + 1 ? 1 : .35 }} />`)}
        ${helpers.map(([, , y], k) => html`<line key=${'h' + k} x1=${J.x} y1=${J.y} x2=${HX} y2=${y} className=${'ln' + (i === 7 ? ' on' : '')} style=${{ opacity: i === 7 ? 1 : .35 }} />`)}
        ${FLOW.map((f, k) => { const y0 = k === 0 ? 0 : by(k - 1) + BH, y1 = k === 6 ? y0 + 34 : by(k); const on = i >= k; return html`<g key=${'f' + k} className="cf1-fade" style=${{ opacity: on ? 1 : .3 }}>
          <line x1=${cx} y1=${y0} x2=${cx} y2=${y1 - 1} className="ar" markerEnd="url(#cf1-ah)" style=${{ stroke: i === k ? 'var(--k-compiler)' : 'var(--ink)', strokeWidth: i === k ? 3 : 1.6 }} />
          <text x=${cx + 8} y=${(y0 + y1) / 2 + 6} fontSize="16" style=${{ fontWeight: i === k ? 700 : 400, fill: i === k ? 'var(--k-compiler)' : 'var(--ink)' }}>${f}</text></g>`; })}
        ${PHASES.map((p, k) => html`<g key=${'p' + k} className=${'bx' + (i === k + 1 ? ' on' : '')} role="button" tabIndex="0" aria-label=${'Phase ' + (k + 1) + ': ' + p} onClick=${() => ctl.go(k + 1)} onKeyDown=${key(k + 1)}>
          <rect x=${X} y=${by(k)} width=${BW} height=${BH} rx="3" /><text x=${cx} y=${by(k) + 21} textAnchor="middle" fontSize="16" style=${{ fontWeight: i === k + 1 ? 700 : 400 }}>${p}</text></g>`)}
        ${helpers.map(([a, b, y], k) => html`<g key=${'hp' + k} className=${'hp' + (i === 7 ? ' on' : '')} onClick=${() => ctl.go(7)} style=${{ cursor: 'pointer' }}>
          <rect x=${HX} y=${y - 28} width=${HW} height="56" /><text x=${HX + HW / 2} y=${y - 4} textAnchor="middle" fontSize="16">${a}</text><text x=${HX + HW / 2} y=${y + 16} textAnchor="middle" fontSize="16">${b}</text></g>`)}
      </svg></div>
      <div className="cf1-out" aria-live="polite">${out}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slide 4 (exam favourite): is it a phase? ───────── */
  const ITEMS = [
    ['Symbol Table', false, 'Not a phase: a data structure beside the phases that (almost) every phase uses. The exams love this one.', 'مش phase: data structure جنب الـ phases وكل phase تقريباً بتستخدمها. الامتحانات بتحب السؤال ده.'],
    ['Scanner', true, 'Phase 1: source code → tokens.', 'Phase 1: الـ source code → tokens.'],
    ['Testing', false, '“Testing” is not a phase of a compiler.', 'الـ “Testing” مش phase من phases الـ compiler.'],
    ['Code Generator', true, 'Phase 5: intermediate code → target code.', 'Phase 5: الـ intermediate code → target code.'],
    ['Error Handler', false, 'Not a phase: a helper linked to every phase.', 'مش phase: أداة مساعدة متوصلة بكل الـ phases.'],
    ['Parser', true, 'Phase 2: tokens → syntax tree.', 'Phase 2: الـ tokens → syntax tree.'],
    ['Literal Table', false, 'Not a phase: a data structure linked to every phase.', 'مش phase: data structure متوصلة بكل الـ phases.'],
    ['Semantics Analyzer', true, 'Phase 3: syntax tree → annotated tree.', 'Phase 3: الـ syntax tree → annotated tree.'],
    ['Source Code Optimizer', true, 'Phase 4: annotated tree → intermediate code.', 'Phase 4: الـ annotated tree → intermediate code.'],
    ['Target Code Optimizer', true, 'Phase 6: target code → improved target code.', 'Phase 6: الـ target code → target code أحسن.']
  ];
  function IsPhase({ ar }) {
    const [k, setK] = useState(0), [ans, setAns] = useState(null), [done, setDone] = useState([]), [score, setScore] = useState(0);
    const it = ITEMS[k], end = k >= ITEMS.length;
    const answer = v => { if (ans !== null || end) return; const ok = v === it[1]; setAns(ok); if (ok) setScore(s => s + 1); setDone(d => d.concat([[it[0], it[1]]])); };
    const next = () => { setAns(null); setK(x => x + 1); };
    const reset = () => { setK(0); setAns(null); setDone([]); setScore(0); };
    let en, a;
    if (end) { en = `You got <b>${score} of ${ITEMS.length}</b>. The six phases: Scanner, Parser, Semantics Analyzer, Source Code Optimizer, Code Generator, Target Code Optimizer. The Literal Table, Symbol Table and Error Handler are not phases.`; a = `جبت <b>${score} من ${ITEMS.length}</b>. الـ six phases: Scanner و Parser و Semantics Analyzer و Source Code Optimizer و Code Generator و Target Code Optimizer. الـ Literal Table والـ Symbol Table والـ Error Handler مش phases.`; }
    else if (ans === null) { en = '<b>Try it:</b> is this a <b>phase</b> of a compiler? (A favourite exam question.)'; a = '<b>جرّب:</b> ده <b>phase</b> من phases الـ compiler ولا لأ؟ (سؤال بيتكرر في الامتحانات.)'; }
    else { en = (ans ? 'Right. ' : 'Not quite. ') + it[2]; a = (ans ? 'صح. ' : 'لأ. ') + it[3]; }
    return html`<figure className="fig cf1"><div className="fig-stage"><div className="cf1-q">
      <p className="cf1-muted" style=${{ margin: '0 0 8px' }}>${end ? 'Done' : `Item ${k + 1} of ${ITEMS.length}`}</p>
      ${!end && html`<div className="cf1-item">${it[0]}</div>
      <div className="cf1-pick"><button className=${'fig-btn' + (ans !== null && it[1] ? ' cf1-sel' : '')} onClick=${() => answer(true)} disabled=${ans !== null}>Phase</button><button className=${'fig-btn' + (ans !== null && !it[1] ? ' cf1-sel' : '')} onClick=${() => answer(false)} disabled=${ans !== null}>Not a phase</button></div>`}
      ${ans !== null && !end && html`<p className=${'cf1-fb ' + (ans ? 'ok' : 'no')}>${ans ? '✓ Right' : '✗ Not quite'}</p>`}
      <div className="cf1-bins"><div className="cf1-bin"><span>Phases</span>${done.filter(d => d[1]).map(d => d[0]).join(', ')}</div><div className="cf1-bin"><span>Not phases</span>${done.filter(d => !d[1]).map(d => d[0]).join(', ')}</div></div>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>${ans !== null && !end && html`<button className="fig-btn solid" onClick=${next}>Next item ›</button>`}${(k > 0 || ans !== null) && html`<button className="fig-btn" onClick=${reset}>↻ Start over</button>`}</div></figure>`;
  }

  /* ───────── slide 6: the scanner, type a line ───────── */
  const KIND = { '[': 'left bracket', ']': 'right bracket', '=': 'assignment', '+': 'plus sign' };
  const KIND_AR = { identifier: 'identifier', number: 'number', 'left bracket': 'left bracket', 'right bracket': 'right bracket', assignment: 'assignment', 'plus sign': 'plus sign' };
  function scan(s) {
    const out = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      let j = i + 1, k;
      if (/[A-Za-z]/.test(c)) { while (j < s.length && /[A-Za-z0-9]/.test(s[j])) j++; k = 'identifier'; }
      else if (/[0-9]/.test(c)) { while (j < s.length && /[0-9]/.test(s[j])) j++; k = 'number'; }
      else k = KIND[c] || null;
      out.push({ lx: s.slice(i, j), k, a: i, b: j }); i = j;
    }
    return out;
  }
  const EX = 'a[index]=4+2';
  function Scanner({ ar }) {
    const [src, setSrc] = useState(EX), [n, setN] = useState(0), [play, setPlay] = useState(false);
    const toks = scan(src);
    useEffect(() => { if (!play) return; if (n >= toks.length) { setPlay(false); return; } const t = setTimeout(() => setN(x => x + 1), 650); return () => clearTimeout(t); }, [play, n, src]);
    const edit = v => { setSrc(v.slice(0, 24)); setN(0); setPlay(false); };
    const cur = n > 0 ? toks[n - 1] : null, done = n >= toks.length && toks.length > 0;
    const charCls = j => { const t = toks.findIndex(x => j >= x.a && j < x.b); if (t < 0) return src[j] === ' ' ? 'sp' : ''; if (t >= n) return ''; if (!toks[t].k) return 'bad'; return t === n - 1 ? 'cur' : 'done'; };
    let en, a;
    if (!toks.length) { en = 'Type a line to scan.'; a = 'اكتب سطر عشان نعمله scan.'; }
    else if (n === 0) { en = (src === EX ? 'This is the slide’s example (slide 6). ' : '') + '<b>Try it:</b> press <b>Next token</b> and watch the scanner collect characters into tokens. You can also type your own line.'; a = (src === EX ? 'ده مثال الـ slide (slide 6). ' : '') + '<b>جرّب:</b> دوس <b>Next token</b> وشوف الـ scanner بيجمّع الحروف في tokens. وممكن تكتب السطر بتاعك.'; }
    else if (done && src === EX) { en = 'Done: the same <b>8 tokens</b> as the slide. The scanner collects sequences of characters into meaningful units called <b>tokens</b>.'; a = 'خلصنا: نفس الـ <b>8 tokens</b> اللي في الـ slide. الـ scanner بيجمّع سلاسل الحروف في وحدات ليها معنى اسمها <b>tokens</b>.'; }
    else if (!cur.k) { en = `<b>${cur.lx}</b> is not one of the token kinds on the slide (identifier, number, brackets, assignment, plus sign).`; a = `<b>${cur.lx}</b> مش من أنواع الـ tokens اللي في الـ slide (identifier و number والأقواس و assignment و plus sign).`; }
    else { en = `<b>${cur.lx}</b>${cur.lx.length > 1 ? ` (${cur.lx.length} characters)` : ''} → one token: <b>${cur.k}</b>.` + (done ? ' All characters are now tokens.' : ''); a = `<b>${cur.lx}</b>${cur.lx.length > 1 ? ` (${cur.lx.length} حروف)` : ''} → token واحد: <b>${KIND_AR[cur.k]}</b>.` + (done ? ' كل الحروف بقت tokens.' : ''); }
    return html`<figure className="fig cf1"><div className="fig-stage"><div className="cf1-sc">
      <div style=${{ textAlign: 'center' }}><input className="cf1-in" value=${src} onInput=${e => edit(e.target.value)} onChange=${e => edit(e.target.value)} aria-label="Source line to scan" spellCheck="false" autoComplete="off" /></div>
      <div className="cf1-chars" aria-hidden="true">${[...src].map((c, j) => html`<span key=${j} className=${charCls(j)}>${c === ' ' ? '␣' : c}</span>`)}</div>
      <table className="cf1-tt"><thead><tr><th>lexeme</th><th>token</th></tr></thead><tbody>
        ${toks.slice(0, n).map((t, j) => html`<tr key=${j} className=${j === n - 1 ? 'cur' : ''}><td>${t.lx}</td><td className=${t.k ? '' : 'bad'}>${t.k || 'not on the slide'}</td></tr>`)}
        ${n === 0 && html`<tr><td style=${{ color: 'var(--faint)' }}>…</td><td style=${{ color: 'var(--faint)' }}>…</td></tr>`}
      </tbody></table></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>
        <button className="fig-btn solid" onClick=${() => { setPlay(false); setN(x => Math.min(toks.length, x + 1)); }} disabled=${n >= toks.length}>Next token ›</button>
        <button className="fig-btn" onClick=${() => { if (calm()) setN(toks.length); else { setN(0); setPlay(true); } }} disabled=${!toks.length}>▶ Scan all</button>
        ${src !== EX ? html`<button className="fig-btn" onClick=${() => edit(EX)}>Slide example</button>` : html`<button className="fig-btn" onClick=${() => { setN(0); setPlay(false); }} disabled=${n === 0}>↻ Reset</button>`}
      </div></figure>`;
  }

  /* ───────── slide 7: the parse tree ───────── */
  function ParseTree({ ar }) {
    const steps = [
      { en: 'The parse tree for <b>a[index]=4+2</b> starts at <b>expression</b> → <b>Assign-expression</b>.', ar: 'الـ parse tree بتاع <b>a[index]=4+2</b> بيبدأ من <b>expression</b> → <b>Assign-expression</b>.' },
      { en: 'Assign-expression has three children: <b>expression</b>, <b>=</b>, <b>expression</b>.', ar: 'الـ Assign-expression ليها 3 children: <b>expression</b> و <b>=</b> و <b>expression</b>.' },
      { en: 'The left expression is a <b>subscript-expression</b>; the right one is an <b>additive-expression</b>.', ar: 'الـ expression الشمال <b>subscript-expression</b>؛ واليمين <b>additive-expression</b>.' },
      { en: 'subscript-expression → <b>Expression [ expression ]</b>. additive-expression → <b>expression + expression</b>.', ar: 'الـ subscript-expression → <b>Expression [ expression ]</b>. الـ additive-expression → <b>expression + expression</b>.' },
      { en: 'At the bottom: <b>identifier</b> a and index, <b>number</b> 4 and 2. The parse tree keeps every grammar node.', ar: 'تحت خالص: <b>identifier</b> للـ a والـ index، و <b>number</b> للـ 4 والـ 2. الـ parse tree بيحتفظ بكل node في الـ grammar.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const hi = new Set(PARSE.filter(n => PD[n.id] === i + 1 || (i === 0 && PD[n.id] <= 1) || (i === 4 && PD[n.id] === 5)).map(n => n.id));
    return html`<figure className="fig cf1"><div className="fig-stage">
      <${Tree} all=${PARSE} show=${id => PD[id] <= i + 1} hi=${hi} label="Parse tree of a[index]=4+2" /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slide 8: the syntax tree ───────── */
  function SyntaxTree({ ar }) {
    const steps = [
      { en: 'The syntax tree (abstract syntax tree) for <b>a[index]=4+2</b>: the root is <b>Assign-expression</b>.', ar: 'الـ syntax tree (الـ abstract syntax tree) بتاع <b>a[index]=4+2</b>: الـ root هو <b>Assign-expression</b>.' },
      { en: 'Its two children: <b>subscript-expression</b> and <b>additive-expression</b>.', ar: 'ليها 2 children: <b>subscript-expression</b> و <b>additive-expression</b>.' },
      { en: 'The leaves: <b>identifier</b> a, <b>identifier</b> index, <b>number</b> 4, <b>number</b> 2.', ar: 'الأوراق: <b>identifier</b> a و <b>identifier</b> index و <b>number</b> 4 و <b>number</b> 2.' },
      { en: 'Compared with the parse tree (slide 7) this is the condensed version: the expression nodes and the <b>[ ] = +</b> nodes are gone.', ar: 'مقارنة بالـ parse tree (slide 7) دي النسخة المختصرة: الـ expression nodes والـ <b>[ ] = +</b> مش موجودين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const hi = new Set(i < 3 ? SYN.filter(n => SD[n.id] === i).map(n => n.id) : []);
    return html`<figure className="fig cf1"><div className="fig-stage">
      <${Tree} all=${SYN_PLAIN} show=${id => SD[id] <= i} hi=${hi} label="Syntax tree of a[index]=4+2" /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slides 9–10: the annotated syntax tree ───────── */
  function Annotated({ ar }) {
    const steps = [
      { en: 'Start from the syntax tree. Semantics is the program’s “meaning”, as opposed to its syntax (structure). <b>Static semantics</b>: declarations and type checking.', ar: 'نبدأ من الـ syntax tree. الـ semantics هي “معنى” البرنامج، عكس الـ syntax (الـ structure). الـ <b>static semantics</b>: الـ declarations والـ type checking.' },
      { en: '<b>Attributes</b> are the extra pieces of information computed by the semantic analyzer: <b>a</b> is an <b>array of integer</b> and <b>index</b> is an <b>integer</b>.', ar: 'الـ <b>attributes</b> هي المعلومات الزيادة اللي الـ semantic analyzer بيحسبها: <b>a</b> هي <b>array of integer</b> و <b>index</b> هو <b>integer</b>.' },
      { en: 'The numbers <b>4</b> and <b>2</b> are <b>integer</b>.', ar: 'الأرقام <b>4</b> و <b>2</b> نوعهم <b>integer</b>.' },
      { en: '<b>subscript-expression</b> and <b>additive-expression</b> are <b>integer</b> too. This is the annotated syntax tree (slide 10).', ar: 'الـ <b>subscript-expression</b> والـ <b>additive-expression</b> نوعهم <b>integer</b> كمان. ده الـ annotated syntax tree (slide 10).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const at = { i1: 1, i2: 1, n4: 2, n2: 2, sb: 3, ad: 3 };
    const hi = new Set(Object.keys(at).filter(k => at[k] === i));
    return html`<figure className="fig cf1"><div className="fig-stage">
      <${Tree} all=${SYN} show=${() => true} tOn=${id => at[id] <= i} hi=${hi} label="Annotated syntax tree of a[index]=4+2" /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slides 11–13: constant folding on the annotated tree ───────── */
  const FOLD = SYN.concat([{ id: 'n6', p: 'as', l: 'number', v: '6', t: 'integer', x: 1 }]);
  function FoldTree({ ar }) {
    const steps = [
      { en: 'Before (slide 12): the annotated tree. The earliest point of most optimization steps is <b>just after semantic analysis</b>.', ar: 'قبل (slide 12): الـ annotated tree. أول مكان لمعظم خطوات الـ optimization هو <b>بعد الـ semantic analysis على طول</b>.' },
      { en: '<b>Constant folding</b> performed directly on the annotated tree: the additive-expression adds two constants, <b>4 + 2</b>.', ar: 'الـ <b>constant folding</b> بيتعمل على الـ annotated tree مباشرة: الـ additive-expression بتجمع 2 constants، <b>4 + 2</b>.' },
      { en: 'After (slide 13): the additive-expression and its numbers are replaced by a single <b>number 6</b> (integer).', ar: 'بعد (slide 13): الـ additive-expression والأرقام بتاعتها اتشالوا وحل مكانهم <b>number 6</b> واحد (integer).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const lay = useRef(null); if (!lay.current) lay.current = layoutTree(SYN);
    const P = lay.current.pos, over = { n6: i < 2 ? { x: P.ad.x, y: P.ad.y } : { x: P.ad.x, y: P.i1.y } };
    const gone = new Set(['ad', 'n4', 'n2']);
    const show = id => id === 'n6' ? i >= 2 : !(i >= 2 && gone.has(id));
    const hi = new Set(i === 1 ? ['ad', 'n4', 'n2'] : i === 2 ? ['n6'] : []);
    return html`<figure className="fig cf1"><div className="fig-stage">
      <${Tree} all=${FOLD} show=${show} hi=${hi} over=${over} label="Annotated tree before and after constant folding" /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slide 14: optimization on intermediate code ───────── */
  function FoldIR({ ar }) {
    const steps = [
      { en: 'Optimization using <b>intermediate code</b> (three-address code, p-code): <b>t = 4 + 2</b>, then <b>a[index]=t</b>.', ar: 'الـ optimization باستخدام الـ <b>intermediate code</b> (three-address code و p-code): <b>t = 4 + 2</b>، وبعدين <b>a[index]=t</b>.' },
      { en: '<b>4 + 2</b> is folded: <b>t = 6</b>.', ar: 'الـ <b>4 + 2</b> بتتعمل fold: <b>t = 6</b>.' },
      { en: 't is replaced by its value: <b>a[index]=6</b>. One line instead of two.', ar: 'الـ t اتبدلت بقيمتها: <b>a[index]=6</b>. سطر واحد بدل اتنين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const B = (k, body) => html`<div className=${'cf1-code ' + pop(i >= k) + (i === k ? ' on' : '')}>${body}</div>`;
    const Dn = k => html`<div className=${'dn ' + pop(i >= k)} aria-hidden="true">↓</div>`;
    return html`<figure className="fig cf1"><div className="fig-stage"><div className="cf1-ir">
      ${B(0, html`<span className="cf1-ln">t = <span className=${i === 0 ? 'cf1-ch' : ''}>4 + 2</span></span><span className="cf1-ln">a[index]=t</span>`)}
      ${Dn(1)}${B(1, html`<span className="cf1-ln">t = <span className=${i === 1 ? 'cf1-ch' : ''}>6</span></span><span className="cf1-ln">a[index]=t</span>`)}
      ${Dn(2)}${B(2, html`<span className="cf1-ln">a[index]=<span className=${i === 2 ? 'cf1-ch' : ''}>6</span></span>`)}
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slides 15–17: code generator and target code optimizer ───────── */
  function CodeGen({ ar }) {
    const steps = [
      { en: 'The <b>code generator</b> takes the intermediate code (IR), here <b>a[index]=6</b>, and generates code for the target machine.', ar: 'الـ <b>code generator</b> بياخد الـ intermediate code (الـ IR)، هنا <b>a[index]=6</b>، ويعمل كود للـ target machine.' },
      { en: 'A possible code sequence in a <b>hypothetical assembly language</b>. The properties of the target machine (its instructions and representation of data) become the major factor.', ar: 'code sequence ممكنة بـ <b>assembly language افتراضية</b>. خصائص الـ target machine (الـ instructions وطريقة تمثيل الـ data) بتبقى العامل الأساسي.' },
      { en: '<b>MUL R0,2</b>: the index is multiplied by 2 (‡ the slide gives no reason; usually because an integer takes 2 bytes here).', ar: '<b>MUL R0,2</b>: الـ index بيتضرب في 2 (‡ السلايد مش بتقول ليه؛ غالبًا لأن الـ integer واخد 2 bytes هنا).' },
      { en: 'The <b>target code optimizer</b> improves the target code: <b>address modes</b> choosing, <b>instructions</b> replacing, and <b>redundant</b> eliminating.', ar: 'الـ <b>target code optimizer</b> بيحسّن الـ target code: اختيار الـ <b>address modes</b>، واستبدال الـ <b>instructions</b>، وشيل الـ <b>redundant</b>.' },
      { en: '<b>Instructions replacing</b>: MUL R0,2 becomes <b>SHL R0</b> (shift left).', ar: '<b>Instructions replacing</b>: الـ MUL R0,2 بقت <b>SHL R0</b> (shift left).' },
      { en: '<b>Address modes choosing</b> and <b>redundant eliminating</b>: MOV R1,&amp;a, ADD R1,R0 and MOV *R1,6 become one instruction, <b>MOV &amp;a[R1],6</b> (as printed on the slide; the site’s notes read it as &amp;a[R0]). Five lines become three.', ar: '<b>Address modes choosing</b> و <b>redundant eliminating</b>: الـ MOV R1,&amp;a و ADD R1,R0 و MOV *R1,6 بقوا instruction واحدة <b>MOV &amp;a[R1],6</b> (زي ما مكتوبة في الـ slide؛ الـ notes بتقراها &amp;a[R0]). الـ 5 سطور بقوا 3.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const genCls = j => 'cf1-ln' + (i === 2 && j === 1 ? ' on' : '') + (i === 4 && j === 1 ? ' gone' : '') + (i >= 5 && j >= 1 ? ' gone' : '') + (i === 5 && j >= 2 ? ' on' : '');
    const optCls = j => 'cf1-ln' + ((i === 4 && j === 1) || (i === 5 && j === 2) ? ' new' : '') + ((i === 4 && j === 2) ? ' ' : '');
    const optShown = j => i >= 5 || (i === 4 && j <= 1);
    return html`<figure className="fig cf1"><div className="fig-stage">
      <div className="cf1-cg">
        <div className=${'cf1-code' + (i === 0 ? ' on' : '')}><span className="cf1-ln">a[index]=6</span></div>
        <div className="cf1-arw"><i>→</i>Code Generator</div>
        <div className=${'cf1-code ' + pop(i >= 1) + (i >= 1 && i <= 2 ? ' on' : '')}>${GEN.map((l, j) => html`<span key=${j} className=${genCls(j)}>${l}</span>`)}</div>
        <div className=${'cf1-arw ' + pop(i >= 3)}><i>→</i>Target Code Optimizer</div>
        <div className=${'cf1-code ' + pop(i >= 4) + (i >= 4 ? ' on' : '')}>${OPT.map((l, j) => html`<span key=${j} className=${optCls(j)} style=${{ opacity: optShown(j) ? 1 : .15 }}>${l}</span>`)}</div>
      </div>
      <div className=${'cf1-tasks ' + pop(i >= 3)}>
        <span className=${'cf1-task' + (i === 5 ? ' on' : '')}>Address modes choosing</span>
        <span className=${'cf1-task' + (i === 4 ? ' on' : '')}>Instructions replacing</span>
        <span className=${'cf1-task' + (i === 5 ? ' on' : '')}>Redundant eliminating</span>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slides 18–20: principal data structures for communication among phases ───────── */
  const DS = [
    { k: 'Tokens', pts: ['A scanner collects characters into a token, as a value of an enumerated data type for tokens.', 'May also preserve the string of characters or other derived information, such as the name of an identifier or the value of a number token.', 'Kept in a single global variable or an array of tokens.'],
      ar: ['الـ scanner بيجمّع الحروف في token، كقيمة من enumerated data type للـ tokens.', 'ممكن كمان يحتفظ بالـ string بتاع الحروف أو معلومات تانية، زي اسم الـ identifier أو قيمة الـ number token.', 'بتتحفظ في global variable واحد أو array of tokens.'],
      ex: () => html`<span className="cf1-oh">The tokens of a[index]=4+2 (slide 6)</span><div className="cf1-toks">${TOKS.map(([l, k], j) => html`<span key=${j} className="cf1-tok"><span className="lx">${l}</span>${k}</span>`)}</div>` },
    { k: 'Syntax tree', pts: ['A standard pointer-based structure generated by the parser.', 'Each node represents information collected by the parser or later, which may be dynamically allocated or stored in the symbol table.', 'The node requires different attributes depending on the kind of language structure, which may be represented as a variable record.'],
      ar: ['structure عادية معمولة بالـ pointers والـ parser هو اللي بيعملها.', 'كل node بتمثل معلومات جمعها الـ parser أو اللي بعده، وممكن تتعمل dynamically allocated أو تتحفظ في الـ symbol table.', 'الـ node محتاجة attributes مختلفة حسب نوع الـ language structure، وممكن تتمثل كـ variable record.'],
      ex: () => html`<span className="cf1-oh">The syntax tree of a[index]=4+2 (slide 8)</span><${Tree} all=${SYN_PLAIN} show=${() => true} label="Syntax tree of a[index]=4+2" />` },
    { k: 'Symbol table', pts: ['Keeps information associated with identifiers: functions, variables, constants and data types.', 'Interacts with almost every phase of the compiler.', 'Access operations need to be constant-time, so one or several hash tables are often used.'],
      ar: ['بيحتفظ بالمعلومات الخاصة بالـ identifiers: الـ functions والـ variables والـ constants والـ data types.', 'بيتعامل مع تقريباً كل phase في الـ compiler.', 'عمليات الـ access لازم تبقى constant-time، فغالباً بنستخدم hash table واحد أو أكتر.'],
      ex: () => html`<span className="cf1-oh">The identifiers of a[index]=4+2, with the attributes from slide 10</span><table className="cf1-st"><thead><tr><th>identifier</th><th>information</th></tr></thead><tbody><tr><td>a</td><td>array of integer</td></tr><tr><td>index</td><td>integer</td></tr></tbody></table>` },
    { k: 'Literal table', pts: ['Stores constants and strings, reducing the size of the program.', 'Quick insertion and lookup are essential.'],
      ar: ['بيخزن الـ constants والـ strings، وده بيقلل حجم البرنامج.', 'الـ insertion والـ lookup السريعين أساسيين.'],
      ex: () => html`<span className="cf1-oh">The constants in a[index]=4+2</span><div className="cf1-toks"><span className="cf1-tok"><span className="lx">4</span></span><span className="cf1-tok"><span className="lx">2</span></span></div>` },
    { k: 'Intermediate code', pts: ['Kept as an array of text strings, a temporary text, or a linked list of structures, depending on the kind of intermediate code (e.g. three-address code and p-code).', 'Should be easy to reorganize.'],
      ar: ['بيتحفظ كـ array of text strings، أو temporary text، أو linked list of structures، حسب نوع الـ intermediate code (زي three-address code و p-code).', 'لازم يبقى سهل نعيد ترتيبه.'],
      ex: () => html`<span className="cf1-oh">Intermediate code from slide 14</span><div className="cf1-code" style=${{ display: 'inline-block' }}><span className="cf1-ln">t = 4 + 2</span><span className="cf1-ln">a[index]=t</span></div>` },
    { k: 'Temporary files', pts: ['Hold the products of intermediate steps during compiling.', 'Solve the problem of memory constraints, or back-patch addresses during code generation.'],
      ar: ['بتشيل نواتج الخطوات الوسطانية أثناء الـ compiling.', 'بتحل مشكلة الـ memory constraints، أو بتعمل back-patch للـ addresses أثناء الـ code generation.'],
      ex: () => null }
  ];
  function DataStructs({ ar }) {
    const [k, setK] = useState(0), d = DS[k], ex = d.ex();
    return html`<figure className="fig cf1"><div className="fig-stage"><div className="cf1-ds">
      <div className="cf1-dsb" role="group" aria-label="Data structures">${DS.map((x, j) => html`<button key=${j} className=${'fig-btn' + (j === k ? ' cf1-sel' : '')} aria-pressed=${j === k} onClick=${() => setK(j)}>${x.k}</button>`)}</div>
      <div className="cf1-out" style=${{ marginTop: 0 }}><span className="cf1-oh" style=${{ color: 'var(--k-compiler)', fontSize: '.95rem' }}>${d.k}</span><ul className="cf1-pts">${d.pts.map((p, j) => html`<li key=${j}>${p}</li>`)}</ul>${ex}</div>
    </div></div>
      <${Cap} en=${'<b>Try it:</b> pick a data structure. These carry information between the phases (slides 18–20).'} ar=${'<b>جرّب:</b> اختار data structure. دول اللي بينقلوا المعلومات بين الـ phases (slides 18–20).<br>' + d.ar.map(x => '• ' + x).join('<br>')} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-comp-vs-interp': CompVsInterp, 'cc-phases': Phases, 'cc-is-phase': IsPhase, 'cc-scanner': Scanner,
    'cc-parse-tree': ParseTree, 'cc-syntax-tree': SyntaxTree, 'cc-annotated-tree': Annotated,
    'cc-fold-tree': FoldTree, 'cc-fold-ir': FoldIR, 'cc-codegen': CodeGen, 'cc-data-structs': DataStructs
  });
})();

/* ── part 2 ── */
/* ── part 2 ── */
// Compiler Design visuals, part 2: Lecture 2 (Lexical Analysis), slides 2–12.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.cf2{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cf2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cf2 .fig-btn.cf2-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cf2-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.cf2-row .fig-btn{ font-size:.84rem; padding:4px 10px; }
.cf2-lbl{ font-size:.85rem; color:var(--graphite); }
.cf2-wrap{ max-width:560px; margin:0 auto; color:var(--ink); min-width:0; }
.cf2-in{ display:block; font:500 .95rem/1.45 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; width:100%; box-sizing:border-box; min-width:0; }
.cf2-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
textarea.cf2-in{ resize:vertical; }
.cf2-field{ display:flex; gap:6px; align-items:center; margin:0 0 8px; }
.cf2-field > span{ font:600 .9rem var(--mono); color:var(--graphite); flex:none; }
.cf2-field .cf2-in{ flex:1; }
.cf2-h{ font-size:.8rem; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:var(--graphite); margin:10px 0 5px; }
.cf2-chips{ display:flex; flex-wrap:wrap; gap:5px; align-items:flex-start; }
.cf2-chip{ display:inline-flex; flex-direction:column; align-items:center; border:1px solid var(--line); border-radius:7px; background:var(--paper); padding:3px 7px; min-width:0; max-width:100%; transition:box-shadow .3s, opacity .3s; }
.cf2-chip code{ font:600 .9rem/1.3 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; background:none; padding:0; border:0; }
.cf2-chip small{ font-size:.8rem; line-height:1.2; color:var(--k-compiler); font-weight:600; }
.cf2-chip.cf2-rm{ opacity:.6; border-style:dashed; } .cf2-chip.cf2-rm code{ text-decoration:line-through; } .cf2-chip.cf2-rm small{ color:var(--graphite); }
.cf2-chip.cf2-bad{ border-color:var(--pen); } .cf2-chip.cf2-bad small{ color:var(--pen); }
.cf2-chip.cf2-now{ box-shadow:0 0 0 2px var(--k-compiler); }
.cf2-chip.cf2-l1{ background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cf2-chip.cf2-l2{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.cf2-chip.cf2-both{ background:linear-gradient(90deg, color-mix(in srgb, var(--k-compiler) 14%, var(--paper)) 50%, color-mix(in srgb, var(--ok) 16%, var(--paper)) 50%); }
.cf2-chip.cf2-diff{ box-shadow:0 0 0 2px var(--pen); }
.cf2-set{ font:500 .92rem/1.6 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; overflow-wrap:anywhere; }
.cf2-set .cf2-ok{ color:var(--ok); font-weight:700; font-family:var(--body); }
.cf2-set .cf2-no{ color:var(--pen); font-weight:700; font-family:var(--body); }
.cf2-err{ margin-top:8px; padding:6px 10px; border-radius:8px; border:2px solid var(--pen); color:var(--pen); font-weight:600; font-size:.9rem; }
.cf2-note{ font-size:.9rem; color:var(--graphite); margin:8px 0 0; line-height:1.45; }
.cf2-sym{ display:inline-flex; flex-direction:column; align-items:center; min-width:30px; border:1px solid var(--line); border-radius:6px; background:var(--paper); padding:2px 4px; }
.cf2-sym code{ font:700 1.05rem/1.3 var(--mono); color:var(--ink); background:none; padding:0; border:0; }
.cf2-sym small{ font-size:.8rem; color:var(--graphite); }
.cf2-sym.cf2-bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.cf2-sym.cf2-done{ opacity:.45; }
.cf2-sym.cf2-next{ border-color:var(--k-compiler); box-shadow:0 0 0 2px var(--k-compiler); }
.cf2-grid{ border-collapse:collapse; margin:0 auto; font:500 .9rem var(--mono); color:var(--ink); }
.cf2-grid th, .cf2-grid td{ border:1px solid var(--line); padding:4px 8px; text-align:center; }
.cf2-grid th{ background:var(--paper-2); color:var(--graphite); font-weight:700; }
.cf2-grid td{ background:var(--paper); transition:opacity .35s, background .35s; }
.cf2-grid td.cf2-off{ opacity:0; }
.cf2-grid td.cf2-hot{ background:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); }
.cf2-grid tr.cf2-cur td, .cf2-grid tr.cf2-cur th{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.cf2-grid td.cf2-col{ box-shadow:inset 0 0 0 2px var(--k-compiler); }
.cf2-range{ width:100%; accent-color:var(--k-compiler); }
.cf2-krow{ display:grid; grid-template-columns:auto minmax(0, 1fr); gap:4px 8px; align-items:start; font-size:.88rem; }
.cf2-krow > span:nth-child(odd){ color:var(--graphite); white-space:nowrap; padding-top:4px; }
.cf2-law{ display:grid; gap:4px; }
.cf2-law button{ font:inherit; text-align:left; display:grid; grid-template-columns:minmax(0, 1.1fr) minmax(0, 1fr); gap:8px; align-items:center; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:5px 8px; cursor:pointer; min-height:34px; }
.cf2-law button > span:first-child{ font:600 .9rem var(--mono); overflow-wrap:anywhere; }
.cf2-law button > span:last-child{ font-size:.82rem; color:var(--graphite); }
.cf2-law button.cf2-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 12%, var(--paper)); }
.cf2-law button.cf2-trap{ border-style:dashed; }
.cf2-side{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; margin-top:6px; }
.cf2-side > div:first-child{ font:600 .92rem var(--mono); margin-bottom:4px; overflow-wrap:anywhere; }
.cf2-side .cf2-chip{ padding:1px 6px; }
.cf2-fa svg{ max-width:440px !important; }
.cf2-fa .cf2-st{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.6; transition:fill .3s, stroke .3s; }
.cf2-fa .cf2-st.cf2-shade{ fill:color-mix(in srgb, var(--k-compiler) 12%, var(--paper)); }
.cf2-fa .cf2-st.cf2-on{ fill:color-mix(in srgb, var(--k-compiler) 34%, var(--paper)); stroke:var(--k-compiler); stroke-width:3; }
.cf2-fa .cf2-st.cf2-acc{ stroke:var(--ok); fill:color-mix(in srgb, var(--ok) 26%, var(--paper)); }
.cf2-fa .cf2-st.cf2-rej{ stroke:var(--pen); fill:color-mix(in srgb, var(--pen) 18%, var(--paper)); }
.cf2-fa .cf2-ed{ fill:none; stroke:var(--graphite); stroke-width:1.6; transition:stroke .3s; }
.cf2-fa .cf2-ed.cf2-on{ stroke:var(--k-compiler); stroke-width:3.2; }
.cf2-fa text.cf2-el{ font-weight:700; }
.cf2-fa text.cf2-el.cf2-on{ fill:var(--k-compiler); }
.cf2-tape{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:8px 0; }
.cf2-verdict{ text-align:center; font-weight:700; font-size:.95rem; margin:6px 0 0; min-height:1.4em; }
.cf2-verdict.cf2-yes{ color:var(--ok); } .cf2-verdict.cf2-nope{ color:var(--pen); }
.cf2-tt{ margin-top:8px; }
.cf2-cmp{ display:grid; grid-template-columns:minmax(0, 1fr); gap:10px; }
.cf2-cmp > div{ min-width:0; }
.cf2-cmp h4{ margin:0 0 2px; text-align:center; font-size:.95rem; color:var(--ink); }
.cf2-cmp svg{ max-width:300px !important; }
.cf2-nd .cf2-ed{ fill:none; stroke:var(--graphite); stroke-width:1.6; transition:stroke .3s; }
.cf2-nd .cf2-ed.cf2-on{ stroke:var(--k-compiler); stroke-width:3; }
.cf2-nd .cf2-st{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.6; transition:fill .3s, stroke .3s; }
.cf2-nd .cf2-st.cf2-on{ fill:color-mix(in srgb, var(--k-compiler) 30%, var(--paper)); stroke:var(--k-compiler); stroke-width:3; }
.cf2-nd text.cf2-on{ fill:var(--k-compiler); font-weight:700; }
.cf2-rows{ display:grid; gap:6px; margin-top:10px; }
.cf2-rowc{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; transition:opacity .4s, box-shadow .4s; font-size:.86rem; line-height:1.4; }
.cf2-rowc > div:first-child{ font-weight:700; margin-bottom:3px; }
.cf2-rowc .cf2-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; }
.cf2-rowc .cf2-two span > i{ display:block; font-style:normal; font-size:.8rem; font-weight:700; color:var(--k-compiler); }
.cf2-rowc.cf2-dim{ opacity:.4; } .cf2-rowc.cf2-on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cf2-dag{ font-size:.8rem; color:var(--graphite); display:block; margin-top:3px; }
@media (prefers-reduced-motion: reduce){ .cf2 *{ transition:none !important; } }`;
  if (!document.getElementById('cf2-css')) { const s = document.createElement('style'); s.id = 'cf2-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const E = s => s === '' ? 'ε' : s;
  const uniq = a => a.filter((x, k) => a.indexOf(x) === k);
  // all strings over the letters in sig, shortest first, up to length n
  function allStrings(sig, n) { let out = [''], layer = ['']; for (let k = 1; k <= n; k++) { layer = layer.flatMap(p => sig.map(c => p + c)); out = out.concat(layer); } return out; }
  // a set typed as "{abc, ab, ba}" (ε or an empty item is the empty string)
  const parseSet = t => uniq(String(t).replace(/[{}\s]/g, '').split(',').filter(x => x !== '').map(x => x === 'ε' ? '' : x.slice(0, 6)).slice(0, 6));
  const setText = a => '{' + a.map(E).join(', ') + '}';

  /* ── L2 slide 2: the lexical analysis phase, type a line and scan it ── */
  const KW = ['if', 'then', 'else', 'for', 'while', 'do'];
  function lex(src) {
    const out = []; let i = 0, line = 1;
    while (i < src.length) {
      const rest = src.slice(i); let m;
      const add = (o, len) => { out.push(Object.assign({ line }, o)); i += len; };
      if (rest[0] === '\n') { add({ k: 'ws', t: '\\n', tok: 'newline' }, 1); line++; continue; }
      if ((m = rest.match(/^[ \t]+/))) { add({ k: 'ws', t: m[0].replace(/\t/g, '\\t').replace(/ /g, '␣'), tok: m[0].includes('\t') ? 'tab' : 'blank' }, m[0].length); continue; }
      if ((m = rest.match(/^\/\/[^\n]*/))) { add({ k: 'cm', t: m[0], tok: 'comment' }, m[0].length); continue; }
      if (rest.startsWith('/*')) {
        const e = rest.indexOf('*/', 2);
        if (e < 0) { add({ k: 'err', t: rest.slice(0, 12) + (rest.length > 12 ? '…' : ''), tok: 'error', msg: 'comment is never closed' }, rest.length); continue; }
        const t = rest.slice(0, e + 2); add({ k: 'cm', t, tok: 'comment' }, t.length); line += (t.match(/\n/g) || []).length; continue;
      }
      if ((m = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/))) { const kw = KW.includes(m[0]); add({ k: kw ? 'kw' : 'id', t: m[0], tok: kw ? m[0] : 'id' }, m[0].length); continue; }
      if ((m = rest.match(/^[0-9]+(\.[0-9]+)?/))) { add({ k: 'num', t: m[0], tok: 'number' }, m[0].length); continue; }
      if ((m = rest.match(/^(<=|>=|<>|==|!=|<|>|=)/))) { add({ k: 'rel', t: m[0], tok: 'relop' }, m[0].length); continue; }
      if (rest.startsWith(':=')) { add({ k: 'op', t: ':=', tok: ':=' }, 2); continue; }
      if ((m = rest.match(/^[-–+*/();,]/))) { add({ k: 'op', t: m[0], tok: m[0] }, 1); continue; }
      add({ k: 'err', t: rest[0], tok: 'error', msg: 'unexpected character ' + rest[0] }, 1);
    }
    return out;
  }
  const LEX_EX = [
    ['Notes example', 'if distance >= rate * (time1 – time0) then distance := maxdist;'],
    ['With comments', '// compute the distance\nif distance >= rate * (time1 – time0)\nthen distance := maxdist; /* done */'],
    ['With an error', 'distance := rate * time;\nmaxdist := distance @ 2;']
  ];
  function Lexer({ ar }) {
    const [src, setSrc] = useState(LEX_EX[0][1]), [shown, setShown] = useState(calm() ? 1e9 : 0), [play, setPlay] = useState(!calm()), [showRm, setShowRm] = useState(true);
    const items = useMemo(() => lex(src), [src]);
    const n = Math.min(shown, items.length);
    useEffect(() => { if (!play) return; if (shown >= items.length) { setPlay(false); return; } const t = setTimeout(() => setShown(x => x + 1), 380); return () => clearTimeout(t); }, [play, shown, items.length]);
    const scan = () => { if (calm()) { setShown(1e9); setPlay(false); } else { setShown(0); setPlay(true); } };
    const load = t => { setSrc(t); if (calm()) setShown(1e9); else { setShown(0); setPlay(true); } };
    const vis = items.slice(0, n), toks = vis.filter(x => x.k !== 'ws' && x.k !== 'cm' && x.k !== 'err'), errs = vis.filter(x => x.k === 'err');
    const cnt = k => vis.filter(x => x.tok === k).length;
    const cur = n > 0 && n <= items.length && (play || n < items.length) ? items[n - 1] : null;
    let en, a;
    if (n === 0) { en = 'The scanner reads the input characters <b>left to right</b> and groups them into tokens.'; a = 'الـ scanner بيقرا الـ input characters <b>من الشمال لليمين</b> ويجمّعها في tokens.'; }
    else if (cur && play) {
      const L = '<code>' + esc(cur.t) + '</code>';
      if (cur.k === 'ws') { en = 'Reading ' + L + ': white space (' + cur.tok + '), <b>removed</b>.'; a = 'بيقرا ' + L + ': ده white space (' + cur.tok + ')، <b>بيتشال</b>.'; }
      else if (cur.k === 'cm') { en = 'Reading ' + L + ': a comment, <b>removed</b>.'; a = 'بيقرا ' + L + ': ده comment، <b>بيتشال</b>.'; }
      else if (cur.k === 'err') { en = 'Line ' + cur.line + ': ' + esc(cur.msg) + '. The error message is tied to <b>line ' + cur.line + '</b> of the source.'; a = 'سطر ' + cur.line + ': ' + esc(cur.msg) + '. رسالة الـ error مربوطة بـ <b>السطر ' + cur.line + '</b> في الـ source.'; }
      else if (cur.k === 'kw') { en = 'Reading ' + L + ': a <b>keyword</b>, recognized here. Token: <code>' + cur.tok + '</code>.'; a = 'بيقرا ' + L + ': ده <b>keyword</b>، بيتعرف عليه هنا. الـ token: <code>' + cur.tok + '</code>.'; }
      else if (cur.tok === cur.t) { en = 'Reading ' + L + ': the token is the symbol itself.'; a = 'بيقرا ' + L + ': الـ token هو الرمز نفسه.'; }
      else { en = 'Reading ' + L + ': token <code>' + cur.tok + '</code>, lexeme <code>' + esc(cur.t) + '</code>.'; a = 'بيقرا ' + L + ': الـ token هو <code>' + cur.tok + '</code> والـ lexeme هو <code>' + esc(cur.t) + '</code>.'; }
    } else {
      const rm = [['blank', cnt('blank')], ['tab', cnt('tab')], ['newline', cnt('newline')], ['comment', cnt('comment')]].filter(x => x[1]);
      en = '<b>' + toks.length + ' tokens</b> go to the parser for syntax analysis.' + (rm.length ? ' Removed: ' + rm.map(([k, c]) => c + ' ' + k + (c > 1 ? 's' : '')).join(', ') + '.' : '') + (errs.length ? ' Errors are reported with their <b>line number</b> in the source program.' : '');
      a = '<b>' + toks.length + ' tokens</b> رايحين للـ parser عشان الـ syntax analysis.' + (rm.length ? ' اتشال: ' + rm.map(([k, c]) => c + ' ' + k).join('، ') + '.' : '') + (errs.length ? ' والـ errors بتطلع ومعاها <b>رقم السطر</b> في الـ source program.' : '');
    }
    const chip = (x, j) => {
      const rm = x.k === 'ws' || x.k === 'cm';
      if (rm && !showRm) return null;
      return html`<span key=${j} className=${'cf2-chip' + (rm ? ' cf2-rm' : '') + (x.k === 'err' ? ' cf2-bad' : '') + (j === n - 1 && play ? ' cf2-now' : '')}><code>${x.t}</code><small>${rm ? x.tok + ' (removed)' : x.k === 'err' ? 'error, line ' + x.line : x.tok}</small></span>`;
    };
    return html`<figure className="fig cf2"><div className="fig-stage"><div className="cf2-wrap">
      <div className="cf2-row">${LEX_EX.map(([l, t]) => html`<button key=${l} className=${'fig-btn' + (src === t ? ' cf2-sel' : '')} onClick=${() => load(t)}>${l}</button>`)}</div>
      <textarea className="cf2-in" rows="3" spellCheck="false" aria-label="Source program to scan" value=${src} onChange=${e => { setSrc(e.target.value.slice(0, 240)); setPlay(false); setShown(1e9); }}></textarea>
      <div className="cf2-h">Characters read, left to right</div>
      <div className="cf2-chips">${vis.map(chip)}${n === 0 ? html`<span className="cf2-lbl">Press Scan.</span>` : null}</div>
      <div className="cf2-h">Tokens for the parser</div>
      <div className="cf2-set">${toks.length ? toks.map(x => x.tok).join(' ') : ' '}</div>
      ${errs.map((x, j) => html`<div key=${j} className="cf2-err">Line ${x.line}: ${x.msg}</div>`)}
      <p className="cf2-note">Keywords this demo knows: ${KW.join(', ')}. Comments: <code>//</code> to the end of the line, or <code>/* … */</code>.</p>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><label className="cf2-lbl"><input type="checkbox" checked=${showRm} onChange=${e => setShowRm(e.target.checked)} /> show removed</label><span className="grow"></span>
        <button className="fig-btn solid" onClick=${scan}>▶ Scan</button></div></figure>`;
  }

  /* ── L2 slide 3: alphabets and strings ── */
  const ALPHA = [
    { id: 'bin', b: 'Σ = {0, 1}', name: 'alphabet Σ = {0, 1}', nameAr: 'الـ alphabet Σ = {0, 1}', ok: c => c === '0' || c === '1' },
    { id: 'dig', b: '0–9', name: 'the digits 0–9 (integers)', nameAr: 'الأرقام 0–9 (الـ integers)', ok: c => /[0-9]/.test(c) },
    { id: 'var', b: 'letters, digits, _', name: 'letters, digits and underscore (variable names)', nameAr: 'الحروف والأرقام والـ underscore (أسماء المتغيرات)', ok: c => /[A-Za-z0-9_]/.test(c) },
    { id: 'cpp', b: 'C++', name: 'the alphabet of C++ language', nameAr: 'الـ alphabet بتاع لغة C++', ok: c => /[\x21-\x7e]/.test(c) }
  ];
  const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  function Strings({ ar }) {
    const [al, setAl] = useState(0), [w, setW] = useState('011');
    const A = ALPHA[al], syms = [...w], bad = syms.findIndex(c => !A.ok(c));
    const ex = [['011', 0], ['0101', 0], ['for', 3]];
    const len = syms.length, lw = len <= 10 ? NUMW[len] : String(len);
    let en, a;
    if (!len) { en = 'No symbols: this is <b>ε</b>, the empty string, of length 0.'; a = 'مفيش symbols: ده <b>ε</b>، الـ empty string، طوله 0.'; }
    else if (bad < 0) { en = '<code>' + esc(w) + '</code> is a string of length <b>' + lw + '</b> over ' + A.name + ': a finite sequence of symbols from the alphabet.'; a = '<code>' + esc(w) + '</code> هو string طوله <b>' + len + '</b> على ' + A.nameAr + ': sequence محدودة من symbols من الـ alphabet.'; }
    else { en = '<code>' + esc(w) + '</code> is <b>not</b> a string over ' + A.name + ': symbol ' + (bad + 1) + ' (<code>' + esc(syms[bad]) + '</code>) is not in the alphabet.'; a = '<code>' + esc(w) + '</code> <b>مش</b> string على ' + A.nameAr + ': الـ symbol رقم ' + (bad + 1) + ' (<code>' + esc(syms[bad]) + '</code>) مش في الـ alphabet.'; }
    return html`<figure className="fig cf2"><div className="fig-stage"><div className="cf2-wrap">
      <div className="cf2-row"><span className="cf2-lbl">Alphabet:</span>${ALPHA.map((x, k) => html`<button key=${x.id} className=${'fig-btn' + (al === k ? ' cf2-sel' : '')} onClick=${() => setAl(k)}>${x.b}</button>`)}</div>
      <div className="cf2-row"><span className="cf2-lbl">Slide:</span>${ex.map(([s, k]) => html`<button key=${s} className=${'fig-btn' + (w === s && al === k ? ' cf2-sel' : '')} onClick=${() => { setW(s); setAl(k); }}>${s}</button>`)}</div>
      <input className="cf2-in" spellCheck="false" aria-label="Type a string" value=${w} onChange=${e => setW(e.target.value.replace(/\s/g, '').slice(0, 16))} />
      <div className="cf2-tape">${len ? syms.map((c, k) => html`<span key=${k} className=${'cf2-sym' + (!A.ok(c) ? ' cf2-bad' : '')}><code>${c}</code><small>${k + 1}</small></span>`) : html`<span className="cf2-sym"><code>ε</code><small>0</small></span>`}</div>
      <div className=${'cf2-verdict ' + (bad < 0 ? 'cf2-yes' : 'cf2-nope')}>length |${len ? w : 'ε'}| = ${len}${bad < 0 ? ' ✓' : ' ✕ not over this alphabet'}</div>
      <p className="cf2-note">A set of strings is called a <i>language</i>: the set of all integer constants (alphabet 0–9) or all variable names (letters, digits, perhaps underscore).</p>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L2 slides 4–6: operations performed on a language ── */
  function Ops({ ar }) {
    const [tab, setTab] = useState(0);
    const [u1, setU1] = useState('abc, ab, ba'), [u2, setU2] = useState('ba, bb');
    const [c1, setC1] = useState('ab, c'), [c2, setC2] = useState('d, ef'), [swap, setSwap] = useState(false), [cells, setCells] = useState(calm() ? 99 : 0);
    const [ks, setKs] = useState('a'), [kn, setKn] = useState(4);
    const [orx, setOrx] = useState('a|b|c');
    useEffect(() => { if (tab !== 1 || cells >= 99 || calm()) return; const t = setTimeout(() => setCells(x => x + 1), 450); return () => clearTimeout(t); }, [tab, cells]);
    const restart = () => setCells(calm() ? 99 : 0);
    const tabs = ['Union', 'Concatenation', 'Kleene * and +', 'Or |'];
    let body, en, a;
    if (tab === 0) {
      const A = parseSet(u1), B = parseSet(u2), U = uniq(A.concat(B)), V = uniq(B.concat(A));
      const cls = x => 'cf2-chip ' + (A.includes(x) && B.includes(x) ? 'cf2-both' : A.includes(x) ? 'cf2-l1' : 'cf2-l2');
      const same = U.length === V.length && U.every(x => V.includes(x)), both = A.filter(x => B.includes(x));
      body = html`<div className="cf2-field"><span>L1 =</span><input className="cf2-in" aria-label="L1" value=${u1} onChange=${e => setU1(e.target.value.slice(0, 40))} /></div>
        <div className="cf2-field"><span>L2 =</span><input className="cf2-in" aria-label="L2" value=${u2} onChange=${e => setU2(e.target.value.slice(0, 40))} /></div>
        <div className="cf2-h">L1 ∪ L2</div><div className="cf2-chips">${U.map(x => html`<span key=${'u' + x} className=${cls(x)}><code>${E(x)}</code><small>${A.includes(x) && B.includes(x) ? 'L1 and L2' : A.includes(x) ? 'L1' : 'L2'}</small></span>`)}</div>
        <div className="cf2-h">L2 ∪ L1</div><div className="cf2-chips">${V.map(x => html`<span key=${'v' + x} className=${cls(x)}><code>${E(x)}</code></span>`)}</div>
        <div className="cf2-set" style=${{ marginTop: '8px' }}>${setText(U)} ${same ? html`<span className="cf2-ok">= L2 ∪ L1 ✓</span>` : null}</div>`;
      en = 'Union: all the elements in each of the two sets, with nothing else.' + (both.length ? ' <code>' + both.map(E).join(', ') + '</code> is in both, so it appears once.' : '') + ' Notice that L1 ∪ L2 = L2 ∪ L1.';
      a = 'الـ Union: كل العناصر اللي في كل set من الاتنين، ومفيش حاجة تانية.' + (both.length ? ' <code>' + both.map(E).join(', ') + '</code> موجودة في الاتنين، فبتظهر مرة واحدة.' : '') + ' لاحظ إن L1 ∪ L2 = L2 ∪ L1.';
    } else if (tab === 1) {
      const A0 = parseSet(c1), B0 = parseSet(c2), A = swap ? B0 : A0, B = swap ? A0 : B0;
      const prod = uniq(A.flatMap(x => B.map(y => x + y))), other = uniq(B.flatMap(x => A.map(y => x + y)));
      const same = prod.length === other.length && prod.every(x => other.includes(x));
      const nm = swap ? ['L2', 'L1'] : ['L1', 'L2'];
      let k = 0;
      body = html`<div className="cf2-row">${[['ab, c', 'd, ef', '{ab, c}, {d, ef}'], ['a, b', '0, 11', 'L1 = {a,b}, L2 = {0,11}']].map(([p, q, l]) => html`<button key=${l} className=${'fig-btn' + (c1 === p && c2 === q ? ' cf2-sel' : '')} onClick=${() => { setC1(p); setC2(q); setSwap(false); restart(); }}>${l}</button>`)}</div>
        <div className="cf2-field"><span>L1 =</span><input className="cf2-in" aria-label="L1" value=${c1} onChange=${e => { setC1(e.target.value.slice(0, 40)); setCells(99); }} /></div>
        <div className="cf2-field"><span>L2 =</span><input className="cf2-in" aria-label="L2" value=${c2} onChange=${e => { setC2(e.target.value.slice(0, 40)); setCells(99); }} /></div>
        <div style=${{ overflowX: 'auto' }}><table className="cf2-grid"><thead><tr><th>${nm[0]} \\ ${nm[1]}</th>${B.map(y => html`<th key=${y}>${E(y)}</th>`)}</tr></thead>
          <tbody>${A.map(x => html`<tr key=${x}><th>${E(x)}</th>${B.map(y => { const on = k++ < cells; return html`<td key=${y} className=${on ? (k === cells ? 'cf2-hot' : '') : 'cf2-off'}>${E(x + y)}</td>`; })}</tr>`)}</tbody></table></div>
        <div className="cf2-set" style=${{ marginTop: '8px' }}>${nm[0] + nm[1]} = ${setText(prod)}${swap ? html`<br /><span className=${same ? 'cf2-ok' : 'cf2-no'}>${same ? 'L1L2 = L2L1 here' : 'L1L2 ≠ L2L1: order matters'}</span>` : null}</div>`;
      en = swap ? 'Now each string of L2 comes first: ' + nm[0] + nm[1] + ' = ' + setText(prod) + '. ' + (same ? 'Here both orders give the same set.' : 'Notice that <b>L1L2 ≠ L2L1</b>.') : 'Concatenation: each string in L1 joined with each string in L2, giving ' + setText(prod) + '. Press <b>Swap order</b> to build L2L1.';
      a = swap ? 'دلوقتي كل string من L2 بييجي الأول: ' + nm[0] + nm[1] + ' = ' + setText(prod) + '. ' + (same ? 'هنا الترتيبين طلعوا نفس الـ set.' : 'لاحظ إن <b>L1L2 ≠ L2L1</b>.') : 'الـ Concatenation: كل string في L1 نلزق فيه كل string في L2، فيطلع ' + setText(prod) + '. دوس <b>Swap order</b> عشان تبني L2L1.';
    } else if (tab === 2) {
      const S = parseSet(ks).filter(x => x !== '');
      const rows = []; let layer = [''];
      for (let j = 0; j <= kn; j++) { if (j > 0) layer = uniq(layer.flatMap(p => S.map(c => p + c))); rows.push(layer.slice()); }
      const flat = uniq(rows.flat()), more = S.length ? ', …' : '';
      const star = '{' + flat.map(E).join(', ') + more + '}', plus = '{' + flat.filter(x => x !== '').map(E).join(', ') + more + '}';
      body = html`<div className="cf2-field"><span>Σ =</span><input className="cf2-in" aria-label="Sigma" value=${ks} onChange=${e => setKs(e.target.value.slice(0, 20))} /></div>
        <label className="cf2-lbl" style=${{ display: 'block' }}>Concatenate up to ${kn} strings<input className="cf2-range" type="range" min="0" max="4" value=${kn} onInput=${e => setKn(+e.target.value)} onChange=${e => setKn(+e.target.value)} /></label>
        <div className="cf2-krow" style=${{ marginTop: '6px' }}>${rows.map((r, j) => [html`<span key=${'k' + j}>${j} string${j === 1 ? '' : 's'}:</span>`, html`<span key=${'v' + j} className="cf2-chips">${r.slice(0, 27).map(x => html`<span key=${x} className=${'cf2-chip' + (j === 0 ? ' cf2-rm' : '')}><code style=${j === 0 ? { textDecoration: 'none' } : null}>${E(x)}</code></span>`)}${r.length > 27 ? '…' : ''}</span>`])}</div>
        <div className="cf2-set" style=${{ marginTop: '8px' }}>Σ* = ${star}<br />Σ⁺ = ${plus}</div>`;
      en = 'Kleene closure Σ*: all strings made by concatenating <b>zero or more</b> strings in Σ, so it includes <b>ε</b> (zero strings). Positive closure Σ⁺: <b>one or more</b>, so no ε. ε is the empty string: {ε} is a set of one element.';
      a = 'الـ Kleene closure Σ*: كل الـ strings اللي بنعملها بـ concatenation لـ <b>صفر أو أكتر</b> من الـ strings اللي في Σ، فبتشمل <b>ε</b> (صفر strings). الـ Positive closure Σ⁺: <b>واحد أو أكتر</b>، فمفيهاش ε. الـ ε هي الـ empty string: و{ε} set فيها عنصر واحد.';
    } else {
      const parts = uniq(orx.replace(/\s/g, '').split('|').map(x => x === 'ε' ? '' : x).slice(0, 8));
      body = html`<div className="cf2-field"><span>RE</span><input className="cf2-in" aria-label="Alternatives" value=${orx} onChange=${e => setOrx(e.target.value.slice(0, 30))} /></div>
        <div className="cf2-set" style=${{ marginTop: '8px' }}>${orx.replace(/\s/g, '') || 'ε'} = ${setText(parts)}</div>`;
      en = 'The <b>or</b> operator |: a|b|c = {a, b, c}. Each alternative is one string of the set.'; a = 'الـ <b>or</b> operator |: a|b|c = {a, b, c}. كل اختيار هو string واحدة في الـ set.';
    }
    return html`<figure className="fig cf2"><div className="fig-stage"><div className="cf2-wrap">
      <div className="cf2-row">${tabs.map((t, k) => html`<button key=${t} className=${'fig-btn' + (tab === k ? ' cf2-sel' : '')} onClick=${() => { setTab(k); if (k === 1) restart(); }}>${t}</button>`)}</div>
      ${body}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      ${tab === 1 && html`<div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${restart}>↻ Replay</button><button className="fig-btn solid" onClick=${() => { setSwap(s => !s); restart(); }}>⇄ Swap order</button></div>`}</figure>`;
  }

  /* ── L2 slide 7 (and the lecture's examples): regular expressions, test a string ── */
  const RX = [
    { re: 'ab*', g: 'a(b*)', sig: ['a', 'b', 'c'] }, { re: 'a|b|c*', g: 'a|b|(c*)', sig: ['a', 'b', 'c'] }, { re: 'a|ab*', g: 'a|(a(b*))', sig: ['a', 'b', 'c'] },
    { re: '0|1', g: '0|1', sig: ['0', '1'] }, { re: '0*', g: '0*', sig: ['0', '1'] }, { re: '(0|1)(0|1)', g: '(0|1)(0|1)', sig: ['0', '1'] },
    { re: '0|0*1', g: '0|((0*)1)', sig: ['0', '1'] }, { re: '(a|c)*b(a|c)*', g: '(a|c)*b(a|c)*', sig: ['a', 'b', 'c'], note: 'exactly one b over {a,b,c}' }
  ];
  function RegexTest({ ar }) {
    const [k, setK] = useState(0), [w, setW] = useState('abb');
    const R = RX[k], rx = new RegExp('^(?:' + R.re + ')$'), hit = rx.test(w);
    const mem = allStrings(R.sig, 4).filter(s => rx.test(s)), shown = mem.slice(0, 12);
    const en = '<code>' + esc(R.re) + '</code> is read as <code>' + esc(R.g) + '</code>: * binds tightest, then concatenation, then |. ' + (w === '' ? 'ε (the empty string) ' : '<code>' + esc(w) + '</code> ') + (hit ? 'is <b>in</b> the language.' : 'is <b>not</b> in the language.');
    const a = '<code>' + esc(R.re) + '</code> بتتقري <code>' + esc(R.g) + '</code>: الـ * الأقوى، بعدها الـ concatenation، بعدها الـ |. ' + (w === '' ? 'الـ ε (الـ empty string) ' : '<code>' + esc(w) + '</code> ') + (hit ? '<b>جوه</b> الـ language.' : '<b>مش</b> جوه الـ language.');
    return html`<figure className="fig cf2"><div className="fig-stage"><div className="cf2-wrap">
      <div className="cf2-row">${RX.map((x, j) => html`<button key=${x.re} className=${'fig-btn' + (k === j ? ' cf2-sel' : '')} style=${{ fontFamily: 'var(--mono)' }} onClick=${() => setK(j)}>${x.re}</button>`)}</div>
      <div className="cf2-field"><span>string</span><input className="cf2-in" spellCheck="false" aria-label="String to test" value=${w} onChange=${e => setW(e.target.value.replace(/\s/g, '').slice(0, 16))} /></div>
      <div className=${'cf2-verdict ' + (hit ? 'cf2-yes' : 'cf2-nope')}>${w === '' ? 'ε' : w} ${hit ? '✓ matches' : '✕ does not match'} ${R.re}</div>
      <div className="cf2-h">In the language (length ≤ 4)${R.note ? ', ' + R.note : ''}</div>
      <div className="cf2-chips">${shown.map(s => html`<button key=${s} className=${'fig-btn' + (s === w ? ' cf2-sel' : '')} style=${{ fontFamily: 'var(--mono)', padding: '2px 9px', minHeight: '28px' }} onClick=${() => setW(s)}>${E(s)}</button>`)}${mem.length > shown.length ? html`<span className="cf2-lbl">…</span>` : null}</div>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L2 slide 8: algebraic properties of regular expressions, check each law ── */
  const LAWS = [
    { f: ['(r|s)|t', 'r|s|t', 'r|(s|t)'], m: '| is associative', ma: 'الـ | associative' },
    { f: ['s|t', 't|s'], m: '| is commutative', ma: 'الـ | commutative' },
    { f: ['s|s', 's'], m: '| is idempotent', ma: 'الـ | idempotent' },
    { f: ['s?', 's|ε'], m: 'by definition', ma: 'بالتعريف' },
    { f: ['(rs)t', 'rst', 'r(st)'], m: 'concatenation is associative', ma: 'الـ concatenation associative' },
    { f: ['sε', 's', 'εs'], m: 'ε is a neutral element for concatenation', ma: 'الـ ε عنصر محايد للـ concatenation' },
    { f: ['r(s|t)', 'rs|rt'], m: 'concatenation distributes over |', ma: 'الـ concatenation بيتوزع على الـ |' },
    { f: ['(r|s)t', 'rt|st'], m: 'concatenation distributes over |', ma: 'الـ concatenation بيتوزع على الـ |' },
    { f: ['(s*)*', 's*'], m: '* is idempotent', ma: 'الـ * idempotent' },
    { f: ['s*s*', 's*'], m: '0 or more twice is still 0 or more', ma: 'صفر أو أكتر مرتين لسه صفر أو أكتر' },
    { f: ['ss*', 's⁺', 's*s'], m: 'by definition', ma: 'بالتعريف' },
    { f: ['aε', 'εa', 'a'], m: 'exam trap: aε = a, not ε', ma: 'فخ امتحان: aε = a مش ε', trap: true },
    { f: ['(X|Y)*', 'X*|Y*'], m: 'exam trap: these are not equal', ma: 'فخ امتحان: دول مش متساويين', trap: true }
  ];
  const SUB = { r: 'a', s: 'b', t: 'c', X: 'a', Y: 'b' };
  const toRx = f => f.replace(/[rstXY]/g, c => SUB[c]).replace(/ε/g, '(?:)').replace(/⁺/g, '+');
  const shownSub = f => f.replace(/[rstXY]/g, c => SUB[c]);
  function Algebra({ ar }) {
    const [k, setK] = useState(0);
    const L = LAWS[k], U = allStrings(['a', 'b', 'c'], 3);
    const sets = L.f.map(f => { const rx = new RegExp('^(?:' + toRx(f) + ')$'); return U.filter(s => rx.test(s)); });
    const same = sets.every(S => S.length === sets[0].length && S.every(x => sets[0].includes(x)));
    const vars = L.f.join('').match(/[XY]/) ? 'X = a, Y = b' : 'r = a, s = b, t = c';
    const en = same ? 'With ' + vars + ', every side gives the <b>same set</b> of strings (checked for all strings up to length 3): <code>' + esc(L.f.join(' = ')) + '</code>, ' + esc(L.m) + '.'
      : 'With ' + vars + ' the sets differ: (X|Y)* contains <code>ab</code> (that is XY) and <code>ba</code>, but X*|Y* only has strings of all a or all b. So <b>(X|Y)* ≠ X*|Y*</b>.';
    const a = same ? 'لما ' + vars + '، كل الأطراف بتطلع <b>نفس الـ set</b> من الـ strings (اتشيكت على كل الـ strings لحد طول 3): <code>' + esc(L.f.join(' = ')) + '</code>، ' + L.ma + '.'
      : 'لما ' + vars + ' الـ sets بتختلف: (X|Y)* فيها <code>ab</code> (يعني XY) و<code>ba</code>، لكن X*|Y* فيها بس strings كلها a أو كلها b. يبقى <b>(X|Y)* ≠ X*|Y*</b>.';
    return html`<figure className="fig cf2"><div className="fig-stage"><div className="cf2-wrap">
      <div className="cf2-law" role="list">${LAWS.map((x, j) => html`<button key=${j} className=${(k === j ? 'cf2-sel' : '') + (x.trap ? ' cf2-trap' : '')} onClick=${() => setK(j)}><span>${x.f.join(' = ').replace('(X|Y)* = X*|Y*', '(X|Y)* ≠ X*|Y*')}</span><span>${x.m}</span></button>`)}</div>
      <div className="cf2-h">Try it: ${vars}, strings up to length 3</div>
      ${L.f.map((f, j) => html`<div key=${j} className="cf2-side"><div>${f}${f !== shownSub(f) ? '  →  ' + shownSub(f) : ''}</div>
        <div className="cf2-chips">${sets[j].slice(0, 20).map(s => html`<span key=${s} className=${'cf2-chip' + (!same && !sets[1 - j].includes(s) ? ' cf2-diff' : '')}><code>${E(s)}</code></span>`)}${sets[j].length > 20 ? html`<span className="cf2-lbl">… ${sets[j].length} strings</span>` : null}</div></div>`)}
      <div className=${'cf2-verdict ' + (same ? 'cf2-yes' : 'cf2-nope')}>${same ? '✓ same set' : '✕ different sets'}</div>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L2 slide 9: state and transition ── */
  function StateTrans({ ar }) {
    const steps = [
      { en: 'A finite automaton is a machine with a finite number of <b>states</b> and a finite number of <b>transitions</b> between these.', ar: 'الـ finite automaton هو machine فيها عدد محدود من الـ <b>states</b> وعدد محدود من الـ <b>transitions</b> بينهم.' },
      { en: 'A <b>state</b> is drawn as a circle with its name inside: q1.', ar: 'الـ <b>state</b> بتترسم دايرة واسمها جواها: q1.' },
      { en: 'A <b>transition</b> is an arrow labelled with an <b>input token</b>; the slide shows one pointing right and one pointing left.', ar: 'الـ <b>transition</b> سهم مكتوب عليه <b>input token</b>؛ الـ slide بتوري واحد رايح يمين وواحد رايح شمال.' },
      { en: 'In the next slides: the <b>start state</b> has an incoming “start” arrow, and a <b>final (accept) state</b> is a double circle.', ar: 'في الـ slides الجاية: الـ <b>start state</b> داخل عليها سهم “start”، والـ <b>final (accept) state</b> دايرة دبل.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    return html`<figure className="fig cf2"><div className="fig-stage cf2-fa">
      <svg viewBox="0 0 300 300" role="img" aria-label="A state q1 drawn as a circle, and two transitions drawn as arrows labelled input token">
        <defs><marker id="cf2-st-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--k-compiler)" /></marker>
          <marker id="cf2-st-ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--graphite)" /></marker></defs>
        <g className=${pop(i >= 1)}><text x="20" y="62" fontSize="20">State</text><circle cx="180" cy="55" r="30" className=${'cf2-st' + (i === 1 ? ' cf2-on' : '')} /><text x="180" y="62" textAnchor="middle" fontSize="20">q1</text></g>
        <g className=${pop(i >= 2)}><text x="20" y="162" fontSize="20">Transition</text>
          <text x="210" y="122" textAnchor="middle" fontSize="17">input token</text>
          <path d="M150 135 H272" stroke="var(--k-compiler)" strokeWidth="2.4" markerEnd="url(#cf2-st-ah)" />
          <path d="M272 172 H150" stroke="var(--k-compiler)" strokeWidth="2.4" markerEnd="url(#cf2-st-ah)" />
          <text x="210" y="196" textAnchor="middle" fontSize="17">input token</text></g>
        <g className=${pop(i >= 3)}>
          <text x="10" y="240" fontSize="17">start</text><path d="M10 262 H62" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#cf2-st-ag)" />
          <circle cx="88" cy="262" r="24" className="cf2-st" /><text x="88" y="268" textAnchor="middle" fontSize="17">q0</text>
          <circle cx="232" cy="262" r="24" className="cf2-st" /><circle cx="232" cy="262" r="18" className="cf2-st" /><text x="232" y="268" textAnchor="middle" fontSize="17">q2</text>
          <text x="88" y="298" textAnchor="middle" fontSize="16" fill="var(--graphite)" style=${{ fill: 'var(--graphite)' }}>start state</text>
          <text x="232" y="298" textAnchor="middle" fontSize="16" style=${{ fill: 'var(--graphite)' }}>final state</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 10–11: the slide's finite automata, run a string through them ── */
  const FA = {
    '01': { re: '01', slide: 'A finite automata for the expression 01 (slide 10)', slideAr: 'A finite automata for the expression 01 (سلايد 10)', vb: [340, 140], sig: ['0', '1'], start: 'q0', fin: ['q2'],
      S: [{ id: 'q0', x: 95, y: 62, sub: 'Start State' }, { id: 'q1', x: 190, y: 62 }, { id: 'q2', x: 285, y: 62, sub: 'End State' }], E: [{ f: 'q0', t: 'q1', l: '0' }, { f: 'q1', t: 'q2', l: '1' }], ex: ['01', '0', '011', '10'] },
    'a*': { re: 'a*', slide: 'the automaton for a* (slide 10)', slideAr: 'الـ automaton بتاع a* (سلايد 10)', vb: [340, 160], sig: ['a'], start: 'S', fin: ['S'], named: true,
      S: [{ id: 'S', x: 190, y: 98, shade: true, sub: 'a*' }], E: [{ f: 'S', t: 'S', l: 'a' }], ex: ['aaa', '', 'ab'] },
    'a+': { re: 'a⁺', slide: 'the automaton for a⁺ (slide 10)', slideAr: 'الـ automaton بتاع a⁺ (سلايد 10)', vb: [340, 160], sig: ['a'], start: 'S0', fin: ['S1'], named: true,
      S: [{ id: 'S0', x: 140, y: 98, shade: true, sub: 'a⁺' }, { id: 'S1', x: 268, y: 98 }], E: [{ f: 'S0', t: 'S0', l: 'a' }, { f: 'S0', t: 'S1', l: 'a' }], ex: ['aaa', 'a', ''] },
    '(a|b)*': { re: '(a|b)*', slide: 'the automaton for (a|b)* (slide 10)', slideAr: 'الـ automaton بتاع (a|b)* (سلايد 10)', vb: [340, 160], sig: ['a', 'b'], start: 'q2', fin: ['q2'],
      S: [{ id: 'q2', x: 190, y: 98, sub: '(a|b)*' }], E: [{ f: 'q2', t: 'q2', l: 'a,b' }], ex: ['abba', '', 'abc'] },
    '1*01(0|1)*': { re: '1*01(0|1)*', slide: 'the automaton for 1*01(0|1)* (slide 11)', slideAr: 'الـ automaton بتاع 1*01(0|1)* (سلايد 11)', vb: [340, 172], sig: ['0', '1'], start: 'q0', fin: ['q2'],
      S: [{ id: 'q0', x: 95, y: 100 }, { id: 'q1', x: 190, y: 100 }, { id: 'q2', x: 285, y: 100, sub: 'Final state' }], E: [{ f: 'q0', t: 'q0', l: '1' }, { f: 'q0', t: 'q1', l: '0' }, { f: 'q1', t: 'q2', l: '1' }, { f: 'q2', t: 'q2', l: '0,1' }], ex: ['1101', '11010', '01', '100'] }
  };
  Object.values(FA).forEach(M => { M.d = {}; M.S.forEach(s => { M.d[s.id] = {}; }); M.E.forEach(e => e.l.split(',').forEach(c => { (M.d[e.f][c] = M.d[e.f][c] || []).push(e.t); })); });
  function trace(M, w) { const sets = [[M.start]]; for (const c of w) { const cur = sets[sets.length - 1]; const nx = uniq(cur.flatMap(s => (M.d[s][c] || []))); sets.push(nx); if (!nx.length) break; } return sets; }
  const R = 24;
  function FaDiagram({ M, on, edgeOn, end }) {
    const P = id => M.S.find(s => s.id === id);
    return html`<svg viewBox=${'0 0 ' + M.vb[0] + ' ' + M.vb[1]} role="img" aria-label=${'Finite automaton for ' + M.re}>
      <defs><marker id="cf2-fa-ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--graphite)" /></marker>
        <marker id="cf2-fa-ak" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--k-compiler)" /></marker></defs>
      ${(() => { const s = P(M.start); return html`<g><text x=${s.x - R - 64} y=${s.y - 10} fontSize="18">start</text><path d=${`M${s.x - R - 64} ${s.y} H${s.x - R - 1}`} stroke="var(--graphite)" strokeWidth="1.8" markerEnd="url(#cf2-fa-ag)" /></g>`; })()}
      ${M.E.map((e, j) => {
        const a = P(e.f), b = P(e.t), lit = edgeOn(e), cls = 'cf2-ed' + (lit ? ' cf2-on' : ''), mk = lit ? 'url(#cf2-fa-ak)' : 'url(#cf2-fa-ag)';
        if (e.f === e.t) return html`<g key=${j}><path className=${cls} d=${`M${a.x - 13} ${a.y - R + 3} C${a.x - 34} ${a.y - R - 42} ${a.x + 34} ${a.y - R - 42} ${a.x + 13} ${a.y - R + 3}`} markerEnd=${mk} /><text className=${'cf2-el' + (lit ? ' cf2-on' : '')} x=${a.x} y=${a.y - R - 38} textAnchor="middle" fontSize="19">${e.l}</text></g>`;
        return html`<g key=${j}><path className=${cls} d=${`M${a.x + R} ${a.y} H${b.x - R - 1}`} markerEnd=${mk} /><text className=${'cf2-el' + (lit ? ' cf2-on' : '')} x=${(a.x + b.x) / 2} y=${a.y - 10} textAnchor="middle" fontSize="19">${e.l}</text></g>`;
      })}
      ${M.S.map(s => { const act = on.includes(s.id), fin = M.fin.includes(s.id); const cls = 'cf2-st' + (s.shade ? ' cf2-shade' : '') + (act ? ' cf2-on' + (end ? (fin ? ' cf2-acc' : ' cf2-rej') : '') : '');
        return html`<g key=${s.id}><circle cx=${s.x} cy=${s.y} r=${R} className=${cls} />${fin && html`<circle cx=${s.x} cy=${s.y} r=${R - 5} className=${cls} style=${{ fill: 'none' }} />`}
          ${(M.named || !s.shade) && html`<text x=${s.x} y=${s.y + 6} textAnchor="middle" fontSize="17">${s.id}</text>`}
          ${s.sub && html`<text x=${s.x} y=${s.y + R + 24} textAnchor="middle" fontSize="18">${s.sub}</text>`}</g>`; })}
    </svg>`;
  }
  function FaSim({ ar, ids }) {
    const [mi, setMi] = useState(0), M = FA[ids[mi]];
    const [w, setW] = useState(M.ex[0]), [pos, setPos] = useState(calm() ? 99 : 0), [play, setPlay] = useState(!calm());
    const sets = useMemo(() => trace(M, w), [M, w]), last = sets.length - 1, p = Math.min(pos, last);
    const cur = sets[p], stuck = cur.length === 0, end = p === last, acc = end && !stuck && w.length === p && cur.some(s => M.fin.includes(s));
    useEffect(() => { if (!play) return; if (pos >= last) { setPlay(false); return; } const t = setTimeout(() => setPos(x => x + 1), 900); return () => clearTimeout(t); }, [play, pos, last]);
    const start = (nw, nm) => { if (nm != null) setMi(nm); if (nw != null) setW(nw); if (calm()) { setPos(99); setPlay(false); } else { setPos(0); setPlay(true); } };
    const prev = p > 0 ? sets[p - 1] : null, c = p > 0 ? w[p - 1] : null;
    const edgeOn = e => !!prev && !stuck && prev.includes(e.f) && e.l.split(',').includes(c);
    const L = s => s.join(', '), wq = w === '' ? 'ε' : '<code>' + esc(w) + '</code>';
    let en, a;
    if (p === 0) { en = 'Slide’s automaton loaded: ' + M.slide + '. ' + 'Start in <b>' + M.start + '</b>, the start state. Input: ' + wq + '.'; a = 'الـ automaton بتاع الـ slide: ' + M.slideAr + '. ' + 'نبدأ من <b>' + M.start + '</b>، الـ start state. الـ input: ' + wq + '.'; }
    else if (stuck) { en = 'Read <b>' + esc(c) + '</b>: there is no transition from ' + L(prev) + ' on ' + esc(c) + '.'; a = 'قرينا <b>' + esc(c) + '</b>: مفيش transition من ' + L(prev) + ' على ' + esc(c) + '.'; }
    else { en = 'Read <b>' + esc(c) + '</b>: ' + L(prev) + ' → ' + L(cur) + '.' + (cur.length > 1 ? ' Two edges are labelled ' + esc(c) + ', so the machine can be in <b>both</b> states.' : ''); a = 'قرينا <b>' + esc(c) + '</b>: ' + L(prev) + ' → ' + L(cur) + '.' + (cur.length > 1 ? ' فيه edgeين عليهم ' + esc(c) + '، فالـ machine ممكن تبقى في <b>الاتنين</b>.' : ''); }
    if (end) {
      if (acc) { en += ' Input finished in ' + L(cur.filter(s => M.fin.includes(s))) + ', a final state (double circle): ' + wq + ' is <b>accepted</b>.'; a += ' الـ input خلص في ' + L(cur.filter(s => M.fin.includes(s))) + '، وهي final state (دايرة دبل): ' + wq + ' <b>accepted</b>.'; }
      else if (stuck) { en += ' ' + wq + ' is <b>rejected</b>.'; a += ' ' + wq + ' <b>rejected</b>.'; }
      else { en += ' Input finished in ' + L(cur) + ', which is not a final state: ' + wq + ' is <b>rejected</b>.'; a += ' الـ input خلص في ' + L(cur) + '، ودي مش final state: ' + wq + ' <b>rejected</b>.'; }
    }
    const syms = [...w];
    return html`<figure className="fig cf2"><div className="fig-stage cf2-fa"><div className="cf2-wrap">
      ${ids.length > 1 && html`<div className="cf2-row">${ids.map((id, k) => html`<button key=${id} className=${'fig-btn' + (mi === k ? ' cf2-sel' : '')} style=${{ fontFamily: 'var(--mono)' }} onClick=${() => start(FA[id].ex[0], k)}>${FA[id].re}</button>`)}</div>`}
      <${FaDiagram} M=${M} on=${cur} edgeOn=${edgeOn} end=${end} />
      <div className="cf2-row" style=${{ marginTop: '8px' }}><span className="cf2-lbl">Try:</span>${M.ex.map(s => html`<button key=${'x' + s} className=${'fig-btn' + (w === s ? ' cf2-sel' : '')} style=${{ fontFamily: 'var(--mono)' }} onClick=${() => start(s)}>${E(s)}</button>`)}</div>
      <input className="cf2-in" spellCheck="false" aria-label="Input string" value=${w} placeholder="type a string (empty = ε)" onChange=${e => { setW(e.target.value.replace(/\s/g, '').slice(0, 14)); setPos(0); setPlay(false); }} />
      <div className="cf2-tape">${syms.length ? syms.map((ch, k) => html`<span key=${k} className=${'cf2-sym' + (k < p ? ' cf2-done' : '') + (k === p && !end ? ' cf2-next' : '') + (stuck && k === p - 1 ? ' cf2-bad' : '')}><code>${ch}</code><small>${k + 1}</small></span>`) : html`<span className="cf2-sym"><code>ε</code><small>empty</small></span>`}</div>
      <div className=${'cf2-verdict ' + (end ? (acc ? 'cf2-yes' : 'cf2-nope') : '')}>${end ? (acc ? '✓ accepted' : '✕ rejected') : 'current: ' + L(cur)}</div>
      <table className="cf2-grid cf2-tt"><thead><tr><th>State</th>${M.sig.map(s => html`<th key=${s}>${s}</th>`)}</tr></thead>
        <tbody>${M.S.map(s => html`<tr key=${s.id} className=${cur.includes(s.id) ? 'cf2-cur' : ''}><th>${(s.id === M.start ? '→ ' : '') + (M.fin.includes(s.id) ? '* ' : '') + s.id}</th>${M.sig.map(x => html`<td key=${x} className=${!end && cur.includes(s.id) && w[p] === x ? 'cf2-col' : ''}>${(M.d[s.id][x] || []).join(', ') || '–'}</td>`)}</tr>`)}</tbody></table>
      ${M.named && html`<p className="cf2-note">The slide leaves these states unnamed; ${M.S.length > 1 ? M.S.map(s => s.id).join(' and ') + ' are names' : M.S[0].id + ' is a name'} given in the notes.</p>`}
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="cf2-lbl">${Math.min(p, w.length)} / ${w.length} read</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => { setPlay(false); setPos(Math.max(0, p - 1)); }} disabled=${p === 0}>‹ Back</button>
        <button className="fig-btn" onClick=${() => { setPlay(false); setPos(Math.min(last, p + 1)); }} disabled=${end}>Next symbol ›</button>
        <button className="fig-btn solid" onClick=${() => start()}>▶ Run</button></div></figure>`;
  }
  const Fa01 = ({ ar }) => html`<${FaSim} ar=${ar} ids=${['01']} />`;
  const FaClosures = ({ ar }) => html`<${FaSim} ar=${ar} ids=${['a*', 'a+', '(a|b)*']} />`;
  const Fa1s01 = ({ ar }) => html`<${FaSim} ar=${ar} ids=${['1*01(0|1)*']} />`;

  /* ── L2 slide 12: NFA vs. DFA, the table and its two examples ── */
  const CMP = [
    ['Empty string transition', 'DFA is not capable of using an Empty String transition.', 'NFA can use an empty String transition.'],
    ['Transition functions', 'The number related to the next state is one.', 'The number related to the next state/ states is either zero or one.'],
    ['Complexities of time', 'The total time required for running any input string in DFA is less than what it is in NFA.', 'The total time required for running any input string in NFA is larger than that in comparison to DFA.'],
    ['The setting of the next possible set', 'The next possible state is clearly set in DFA.', 'Every single pair of input symbols and states may contain many possible next states.']
  ];
  const D_S = 'M78 72 C100 26 200 26 222 72', D_T = 'M78 88 C100 134 200 134 222 88';
  const N_PATH = { s: 'M54 84 C66 46 88 36 114 36 L186 36 C214 36 236 52 244 80', t: 'M54 106 C66 144 88 154 114 154 L186 154 C214 154 236 138 244 110' };
  function NfaDfa({ ar }) {
    const steps = [
      { en: 'NFA vs. DFA: the slide compares the two kinds of finite automata, with an example of each.', ar: 'NFA vs. DFA: الـ slide بتقارن بين النوعين بتوع الـ finite automata، ومعاها مثال لكل واحد.' },
      { en: '<b>Empty string transition:</b> the DFA’s edges carry input symbols (s, t). The NFA’s edges marked <b>ε</b> are empty string transitions.', ar: '<b>Empty string transition:</b> الـ edges في الـ DFA عليها input symbols (s و t). أما الـ NFA فالـ edges اللي عليها <b>ε</b> هي empty string transitions.' },
      { en: '<b>Transition functions:</b> in the DFA, reading s (or t) from the start state leads to <b>one</b> next state. The slide says an NFA has zero or one; in general an NFA can have zero, one or several next states.', ar: '<b>Transition functions:</b> في الـ DFA، لو قرينا s (أو t) من الـ start state بنروح لـ <b>state واحدة</b>. الـ slide بتقول الـ NFA عندها صفر أو واحد؛ وعموماً الـ NFA ممكن يبقى عندها صفر أو واحد أو أكتر.' },
      { en: '<b>Complexities of time:</b> running any input string takes less time in a DFA than in an NFA.', ar: '<b>Complexities of time:</b> تشغيل أي input string بياخد وقت أقل في الـ DFA عن الـ NFA.' },
      { en: '<b>The setting of the next possible set:</b> in the DFA the next state is clearly set. In the NFA, the start state has two ε edges, so it can be in <b>both</b> paths (through s and through t) at once.', ar: '<b>The setting of the next possible set:</b> في الـ DFA الـ next state محددة بوضوح. في الـ NFA، الـ start state طالع منها edgeين ε، فممكن تبقى في <b>المسارين</b> (عن طريق s وعن طريق t) في نفس الوقت.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const [pick, setPick] = useState('s'), [nk, setNk] = useState(0);
    const still = calm();
    const dot = (d, key, cx, cy) => still ? html`<circle key=${key} cx=${cx} cy=${cy} r="7" fill="var(--k-compiler)" />` : html`<circle key=${key + nk} r="7" fill="var(--k-compiler)"><animateMotion dur="1.8s" repeatCount="indefinite" path=${d} /></circle>`;
    const dfaRun = i === 2 || i === 4, nfaRun = i >= 4 || i === 1;
    const eps = i === 1 || i === 4;
    return html`<figure className="fig cf2"><div className="fig-stage cf2-nd"><div className="cf2-wrap">
      <div className="cf2-cmp">
        <div><h4>DFA</h4><svg viewBox="0 0 300 160" role="img" aria-label="DFA example: a start state with edges s and t to a second state">
          <defs><marker id="cf2-nd-ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--graphite)" /></marker></defs>
          <path d="M6 80 H38" stroke="var(--graphite)" strokeWidth="1.8" markerEnd="url(#cf2-nd-ag)" />
          <path d=${D_S} className=${'cf2-ed' + (dfaRun && pick === 's' ? ' cf2-on' : '')} markerEnd="url(#cf2-nd-ag)" />
          <path d=${D_T} className=${'cf2-ed' + (dfaRun && pick === 't' ? ' cf2-on' : '')} markerEnd="url(#cf2-nd-ag)" />
          <text x="150" y="28" textAnchor="middle" fontSize="20" fontStyle="italic" className=${dfaRun && pick === 's' ? 'cf2-on' : ''}>s</text>
          <text x="150" y="150" textAnchor="middle" fontSize="20" fontStyle="italic" className=${dfaRun && pick === 't' ? 'cf2-on' : ''}>t</text>
          <circle cx="60" cy="80" r="21" className=${'cf2-st' + (i === 2 ? ' cf2-on' : '')} /><circle cx="240" cy="80" r="21" className=${'cf2-st' + (dfaRun ? ' cf2-on' : '')} />
          <path d="M261 80 H296" stroke="var(--graphite)" strokeWidth="1.8" />
          ${dfaRun && dot(pick === 's' ? D_S : D_T, 'd' + pick, 150, pick === 's' ? 38 : 122)}
        </svg>
          <div className="cf2-row" style=${{ margin: '4px 0 0' }}><span className="cf2-lbl">read</span>${['s', 't'].map(x => html`<button key=${x} className=${'fig-btn' + (pick === x && dfaRun ? ' cf2-sel' : '')} onClick=${() => { setPick(x); setNk(k => k + 1); if (!dfaRun) ctl.go(2); }}>${x}</button>`)}</div></div>
        <div><h4>NFA</h4><svg viewBox="0 0 300 190" role="img" aria-label="NFA example: epsilon edges from the start state into boxes s and t, and epsilon edges from them into a second state">
          <path d="M4 95 H26" stroke="var(--graphite)" strokeWidth="1.8" markerEnd="url(#cf2-nd-ag)" />
          ${['s', 't'].map(b => html`<path key=${b} d=${N_PATH[b]} className=${'cf2-ed' + (eps || nfaRun ? ' cf2-on' : '')} markerEnd="url(#cf2-nd-ag)" />`)}
          <ellipse cx="150" cy="36" rx="36" ry="17" className=${'cf2-st' + (nfaRun ? ' cf2-on' : '')} /><text x="150" y="43" textAnchor="middle" fontSize="20" fontStyle="italic">s</text>
          <ellipse cx="150" cy="154" rx="36" ry="17" className=${'cf2-st' + (nfaRun ? ' cf2-on' : '')} /><text x="150" y="161" textAnchor="middle" fontSize="20" fontStyle="italic">t</text>
          <circle cx="44" cy="95" r="17" className=${'cf2-st' + (i === 4 ? ' cf2-on' : '')} /><circle cx="256" cy="95" r="17" className="cf2-st" />
          <path d="M273 95 H298" className=${'cf2-ed' + (eps ? ' cf2-on' : '')} />
          ${[[66, 36], [64, 172], [226, 30], [228, 176], [284, 82]].map(([x, y], k) => html`<text key=${k} x=${x} y=${y} textAnchor="middle" fontSize="20" className=${eps ? 'cf2-on' : ''}>ε</text>`)}
          ${nfaRun && [dot(N_PATH.s, 'ns', 150, 36), dot(N_PATH.t, 'nt', 150, 154)]}
        </svg>
          <div className="cf2-row" style=${{ margin: '4px 0 0' }}><button className=${'fig-btn' + (nfaRun ? ' cf2-sel' : '')} onClick=${() => { setNk(k => k + 1); if (!nfaRun) ctl.go(4); }}>follow ε</button></div></div>
      </div>
      <div className="cf2-rows">${CMP.map(([h, d, n], k) => html`<div key=${k} className=${'cf2-rowc' + (i === 0 ? '' : i === k + 1 ? ' cf2-on' : ' cf2-dim')}><div>${h}</div>
        <div className="cf2-two"><span><i>DFA</i>${d}</span><span><i>NFA</i>${n}${k === 1 ? html`<span className="cf2-dag">‡ In general: zero, one or several next states.</span>` : null}</span></div></div>`)}</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-lexer': Lexer, 'cc-strings': Strings, 'cc-lang-ops': Ops, 'cc-regex-test': RegexTest, 'cc-re-algebra': Algebra,
    'cc-state-transition': StateTrans, 'cc-fa-01': Fa01, 'cc-fa-closures': FaClosures, 'cc-fa-1s01': Fa1s01, 'cc-nfa-dfa': NfaDfa
  });
})();

/* ── part 3 ── */
// Compiler Design visuals, part 3: Lecture 3 (NFA vs. DFA), slides 2, 3, 4, 5 and 6, plus the worked exam NFAs of the notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.cf3{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cf3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cf3 .fig-btn.cf3-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.fig-stage svg.cf3-g{ display:block; width:100%; height:auto; margin:0 auto; }
.cf3-g .st{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.6; transition:fill .35s, stroke .35s, stroke-width .35s; }
.cf3-g .st.on{ fill:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); stroke:var(--k-compiler); stroke-width:2.6; }
.cf3-g .ed{ fill:none; stroke:var(--graphite); stroke-width:1.6; transition:stroke .35s, stroke-width .35s; }
.cf3-g .ed.hot{ stroke:var(--k-compiler); stroke-width:3; }
.cf3-g text{ font-weight:600; }
.cf3-g text.el{ paint-order:stroke; stroke:var(--paper-2); stroke-width:5px; stroke-linejoin:round; }
.cf3-g text.hot{ fill:var(--k-compiler); font-weight:800; }
.cf3-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.cf3-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.cf3-lbl{ font-size:.85rem; color:var(--graphite); }
.cf3-note{ font-size:.84rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.cf3-in{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; align-items:center; margin:8px 0 6px; min-height:34px; }
.cf3-sym{ display:inline-grid; place-items:center; min-width:28px; height:30px; padding:0 4px; border-radius:6px; border:1px solid var(--line); background:var(--paper); color:var(--ink); font:600 1rem var(--mono); transition:background .3s, color .3s; }
.cf3-sym.done{ background:var(--fig-s); color:#fff; border-color:transparent; }
.cf3-sym.next{ box-shadow:0 0 0 2px var(--k-compiler); }
.cf3-empty{ font-size:.86rem; color:var(--graphite); }
.cf3-trace{ display:flex; flex-wrap:wrap; gap:4px 6px; justify-content:center; align-items:center; font-size:.9rem; color:var(--ink); margin:4px 0 2px; }
.cf3-set{ padding:2px 7px; border-radius:99px; border:1px solid var(--line); background:var(--paper); white-space:nowrap; }
.cf3-set.cur{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); font-weight:700; }
.cf3-set.acc{ color:var(--ok); border-color:var(--ok); }
.cf3-arw{ color:var(--graphite); font-family:var(--mono); white-space:nowrap; }
.cf3-paths{ max-width:420px; margin:8px auto 0; padding:0; list-style:none; font-size:.88rem; line-height:1.45; color:var(--ink); }
.cf3-paths li{ padding:3px 8px; border-radius:6px; border:1px solid var(--line); background:var(--paper); margin-top:4px; overflow-wrap:anywhere; }
.cf3-paths li.ok{ border-color:var(--ok); }
.cf3-paths .tg{ float:right; margin-left:6px; font-weight:700; }
.cf3-paths li.ok .tg{ color:var(--ok); } .cf3-paths li.no .tg{ color:var(--graphite); }
.cf3-two{ display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; max-width:640px; margin:0 auto; }
.cf3-two > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 6px 4px; }
.cf3-hd{ text-align:center; font-weight:700; font-size:.95rem; color:var(--ink); margin:0 0 4px; }
.cf3-cmp{ display:grid; gap:6px; max-width:640px; margin:12px auto 0; }
.cf3-cr{ display:grid; grid-template-columns:1fr 1fr; gap:4px 8px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.88rem; line-height:1.4; color:var(--ink); transition:opacity .45s, transform .45s, box-shadow .35s; }
.cf3-cr.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cf3-cr .rh{ grid-column:1 / -1; font-weight:700; }
.cf3-cr .tg{ display:block; font-size:.78rem; font-weight:700; letter-spacing:.04em; color:var(--k-compiler); }
.cf3-cr .fx{ grid-column:1 / -1; font-size:.84rem; color:var(--graphite); }
.cf3-tw{ max-width:100%; overflow-x:auto; margin:10px auto 0; }
.cf3-tb{ border-collapse:collapse; margin:0 auto; font-size:.92rem; color:var(--ink); }
.cf3-tb caption{ caption-side:top; font-size:.85rem; font-weight:700; color:var(--graphite); padding-bottom:4px; }
.cf3-tb th, .cf3-tb td{ border:1px solid var(--line); padding:4px 8px; text-align:center; min-width:2.4em; white-space:nowrap; }
.cf3-tb thead th{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.cf3-tb tbody th{ background:var(--paper); text-align:left; font-weight:700; }
.cf3-tb td{ background:var(--paper); transition:background .35s; }
.cf3-tb td.pick{ cursor:pointer; }
.cf3-tb td.cur, .cf3-tb tbody th.cur{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); font-weight:700; }
.cf3-tb tr.new th{ box-shadow:inset 0 0 0 2px var(--k-compiler); }
.cf3-tb .mk{ color:var(--k-compiler); font-weight:800; }
.cf3-ex{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.cf3-ex .fig-btn{ font-size:.82rem; padding:4px 9px; min-height:32px; }
.cf3-ph{ text-align:center; font-size:.86rem; font-weight:700; color:var(--k-compiler); margin:10px 0 0; }
.cf3-cnt{ font-size:.85rem; color:var(--graphite); }
@media (prefers-reduced-motion: reduce){ .cf3-g .st, .cf3-g .ed, .cf3-sym, .cf3-tb td, .cf3-cr{ transition:none; } }`;
  if (!document.getElementById('cf3-css')) { const s = document.createElement('style'); s.id = 'cf3-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── automata: parse 'A-0,1>B' edges, ε-closure and move ── */
  function mk(def) {
    const E = def.edges.map((s, id) => { const m = s.match(/^(.+?)-(.+)>(.+)$/); return { id, f: m[1], t: m[3], syms: m[2].split(','), l: m[2] }; });
    const d = {}; def.states.forEach(q => { d[q] = {}; });
    E.forEach(e => e.syms.forEach(x => { const a = d[e.f][x] = d[e.f][x] || []; if (!a.includes(e.t)) a.push(e.t); }));
    const srt = a => def.states.filter(q => a.includes(q));
    const clo = a => { const r = a.slice(); for (let i = 0; i < r.length; i++) (d[r[i]]['ε'] || []).forEach(t => { if (!r.includes(t)) r.push(t); }); return srt(r); };
    const mv = (a, x) => srt([].concat(...a.map(q => d[q][x] || [])));
    const nm = q => (def.lab && def.lab[q]) || q;
    return Object.assign({}, def, { E, d, srt, clo, mv, nm, hasEps: E.some(e => e.syms.includes('ε')) });
  }
  // graph of an automaton for <Graph>
  const nfaGraph = M => ({ w: M.w, h: M.h, nodes: M.states.map(q => ({ id: q, x: M.pos[q][0], y: M.pos[q][1], label: M.nm(q), fin: M.fin.includes(q), start: q === M.start ? (M.startDir || 'left') : null })),
    edges: M.E.map(e => ({ id: e.id, f: e.f, t: e.t, l: e.l, loop: e.f === e.t ? ((M.loops || {})[e.f + '>' + e.t] || 'up') : null, bend: (M.bends || {})[e.f + '>' + e.t] })) });

  /* ── drawing: states as (double) ellipses, edges as curves with arrowheads, self-loops, start arrow ── */
  const DIR = { up: -Math.PI / 2, down: Math.PI / 2, left: Math.PI, right: 0 };
  const r1 = v => Math.round(v * 10) / 10, P = p => r1(p[0]) + ',' + r1(p[1]);
  function Graph({ g, on, hot, fs, mw, title }) {
    on = on || []; hot = hot || []; fs = fs || 18;
    const uid = useRef('cf3g' + Math.random().toString(36).slice(2, 8)).current;
    const N = {};
    g.nodes.forEach(n => { N[n.id] = Object.assign({}, n, { rx: Math.max(20, n.label.length * fs * 0.3 + 9), ry: 20, pad: n.fin ? 4 : 0 }); });
    const bpt = (n, dx, dy) => { const rx = n.rx + n.pad, ry = n.ry + n.pad, k = 1 / Math.sqrt(dx * dx / (rx * rx) + dy * dy / (ry * ry)); return [n.x + dx * k, n.y + dy * k]; };
    const has = (f, t) => g.edges.some(e => e.f === f && e.t === t);
    const tw = s => s.length * fs * 0.55;
    const E = g.edges.map(e => {
      const a = N[e.f], b = N[e.t], isHot = hot.includes(e.id);
      let p, lx, ly, anc = 'middle';
      if (e.f === e.t) {
        const th = DIR[e.loop || 'up'], u = o => [Math.cos(th + o), Math.sin(th + o)], horiz = Math.abs(Math.cos(th)) > .5;
        const ext = horiz ? a.rx + a.pad : a.ry + a.pad;
        const p1 = bpt(a, ...u(-.45)), p2 = bpt(a, ...u(.45)), c1 = [a.x + u(-.55)[0] * (ext + 50), a.y + u(-.55)[1] * (ext + 50)], c2 = [a.x + u(.55)[0] * (ext + 50), a.y + u(.55)[1] * (ext + 50)];
        p = `M${P(p1)} C${P(c1)} ${P(c2)} ${P(p2)}`;
        const m = [.125 * p1[0] + .375 * c1[0] + .375 * c2[0] + .125 * p2[0], .125 * p1[1] + .375 * c1[1] + .375 * c2[1] + .125 * p2[1]];
        lx = m[0] + Math.cos(th) * (horiz ? 8 : 14); ly = m[1] + Math.sin(th) * (horiz ? 8 : 14);
        if (horiz) anc = Math.cos(th) > 0 ? 'start' : 'end';
      } else {
        const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
        const bend = e.bend != null ? e.bend : has(e.t, e.f) ? -22 : 0;
        const c = [(a.x + b.x) / 2 + nx * bend * 2, (a.y + b.y) / 2 + ny * bend * 2];
        const s = bpt(a, c[0] - a.x, c[1] - a.y), t = bpt(b, c[0] - b.x, c[1] - b.y);
        p = `M${P(s)} Q${P(c)} ${P(t)}`;
        const mx = .25 * s[0] + .5 * c[0] + .25 * t[0], my = .25 * s[1] + .5 * c[1] + .25 * t[1], sd = bend > 0 ? 1 : -1, off = 11 + Math.abs(nx) * tw(e.l) / 2;
        lx = mx + nx * sd * off; ly = my + ny * sd * off;
      }
      return { e, p, lx, ly, anc, isHot };
    });
    const starts = g.nodes.filter(n => n.start).map(n => { const a = N[n.id], th = DIR[n.start], ext = Math.abs(Math.cos(th)) > .5 ? a.rx + a.pad : a.ry + a.pad; return `M${P([a.x + Math.cos(th) * (ext + 28), a.y + Math.sin(th) * (ext + 28)])} L${P([a.x + Math.cos(th) * ext, a.y + Math.sin(th) * ext])}`; });
    return html`<svg className="cf3-g" viewBox=${'0 0 ' + g.w + ' ' + g.h} style=${{ maxWidth: (mw || 420) + 'px' }} role="img" aria-label=${title || 'automaton'}>
      <defs>
        <marker id=${uid + 'm'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,0 L10,5 L0,10 z" style=${{ fill: 'var(--graphite)' }} /></marker>
        <marker id=${uid + 'h'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,0 L10,5 L0,10 z" style=${{ fill: 'var(--k-compiler)' }} /></marker>
      </defs>
      ${starts.map((d, j) => html`<path key=${'s' + j} className="ed" d=${d} markerEnd=${`url(#${uid}m)`} />`)}
      ${E.map(x => html`<path key=${'e' + x.e.id} className=${'ed' + (x.isHot ? ' hot' : '')} d=${x.p} markerEnd=${`url(#${uid}${x.isHot ? 'h' : 'm'})`} />`)}
      ${g.nodes.map(n => { const a = N[n.id], lit = on.includes(n.id); return html`<g key=${'n' + n.id}>
        ${n.fin && html`<ellipse className=${'st' + (lit ? ' on' : '')} cx=${a.x} cy=${a.y} rx=${a.rx + 4} ry=${a.ry + 4} />`}
        <ellipse className=${'st' + (lit ? ' on' : '')} cx=${a.x} cy=${a.y} rx=${a.rx} ry=${a.ry} />
        <text x=${a.x} y=${a.y} textAnchor="middle" dominantBaseline="central" fontSize=${fs}>${n.label}</text></g>`; })}
      ${E.map(x => html`<text key=${'l' + x.e.id} className=${'el' + (x.isHot ? ' hot' : '')} x=${r1(x.lx)} y=${r1(x.ly)} textAnchor=${x.anc} dominantBaseline="central" fontSize=${fs}>${x.e.l}</text>`)}
    </svg>`;
  }

  /* ── L3 slides 2–3: the three signs of an NFA, with a simulator that lights up the set of current states ── */
  const SIGNS = [
    mk({ key: 'eps', tab: '1) Contains ε', states: ['a', 'b', 'c'], start: 'a', fin: ['a'], syms: ['0', '1'], edges: ['a-ε>b', 'b-0>a', 'a-1>c', 'c-0>c', 'c-0,1>b'],
      pos: { a: [175, 50], b: [62, 165], c: [262, 165] }, w: 350, h: 210, loops: { 'c>c': 'right' }, bends: { 'a>b': 24, 'b>a': 24 }, init: '',
      en: '<b>Sign 1: it contains ε.</b> The edge a –ε→ b is taken without reading any input, so before reading anything the NFA is already in <b>{a, b}</b> (the ε-closure of a). A DFA is not capable of using an empty-string transition. Press <b>0</b> and <b>1</b> to feed a string.',
      ar: '<b>العلامة 1: فيه ε.</b> الـ edge اللي هو a –ε→ b بيتاخد من غير ما يقرا أي input، فقبل ما يقرا أي حاجة الـ NFA بيبقى في <b>{a, b}</b> (الـ ε-closure بتاع a). الـ DFA مايقدرش يستخدم empty-string transition. دوس <b>0</b> و<b>1</b> عشان تدخّل string.' }),
    mk({ key: 'loop', tab: '2) Loop + same symbol', states: ['q0', 'q1', 'q2'], lab: { q0: 'q₀', q1: 'q₁', q2: 'q₂' }, start: 'q0', fin: ['q2'], syms: ['0', '1'], edges: ['q0-0,1>q0', 'q0-0>q1', 'q1-1>q2'],
      pos: { q0: [72, 95], q1: [190, 95], q2: [305, 95] }, w: 350, h: 130, init: '',
      en: '<b>Sign 2: a loop with an input symbol followed by a transition with the same input symbol.</b> q₀ loops on 0,1 and also has q₀ –0→ q₁, so on 0 the machine can stay in q₀ or move to q₁. Press <b>0</b> and watch both light up.',
      ar: '<b>العلامة 2: loop على input symbol وبعده transition بنفس الـ symbol.</b> الـ q₀ عليها loop على 0,1 وكمان q₀ –0→ q₁، فعلى 0 الـ machine ممكن تفضل في q₀ أو تروح q₁. دوس <b>0</b> وشوف الاتنين بينوّروا.' }),
    mk({ key: 'paths', tab: '3) Multiple paths (001)', states: ['A', 'B', 'C'], start: 'A', fin: ['B', 'C'], syms: ['0', '1'], edges: ['A-0,1>A', 'A-0>C', 'A-1>B', 'B-1>C', 'C-0,1>C'],
      pos: { A: [72, 85], B: [72, 200], C: [285, 85] }, w: 350, h: 238, init: '001', note: 'The slide draws no start arrow; the paths start from A.', noteAr: 'الـ slide مش راسمة سهم بداية؛ الـ paths بتبدأ من A.',
      en: '<b>Sign 3: multiple paths with the same input string that the automaton can recognize.</b> The slide says: try the expression <b>001</b>. Press <b>Next</b> (or <b>Run</b>) to read it symbol by symbol; the list below shows every path.',
      ar: '<b>العلامة 3: أكتر من path لنفس الـ input string والـ automaton بيقبلها.</b> الـ slide بتقول: جرّب الـ expression <b>001</b>. دوس <b>Next</b> (أو <b>Run</b>) عشان تقراها symbol symbol؛ القايمة اللي تحت فيها كل الـ paths.' }),
  ];
  function Signs({ ar }) {
    const [tab, setTab] = useState(0), M = SIGNS[tab];
    const [w, setW] = useState(M.init), [k, setK] = useState(0), [run, setRun] = useState(false);
    const pick = j => { setTab(j); setW(SIGNS[j].init); setK(0); setRun(false); };
    const sets = [M.clo([M.start])];
    for (let i = 0; i < w.length; i++) sets.push(M.clo(M.mv(sets[i], w[i])));
    useEffect(() => { if (!run) return; if (k >= w.length) { setRun(false); return; } const t = setTimeout(() => setK(x => x + 1), 1000); return () => clearTimeout(t); }, [run, k, w]);
    const add = x => { if (w.length >= 8) return; setRun(false); setW(w + x); setK(w.length + 1); };
    const cur = sets[k], S = a => a.length ? '{' + a.map(M.nm).join(', ') + '}' : '∅';
    const hot = M.E.filter(e => (k > 0 && sets[k - 1].includes(e.f) && e.syms.includes(w[k - 1]) && cur.includes(e.t)) || (e.syms.includes('ε') && cur.includes(e.f) && cur.includes(e.t))).map(e => e.id);
    // every path that reads the first k symbols (no ε in tabs 2 and 3)
    let paths = [];
    if (!M.hasEps && k > 0) {
      const go = (q, i, acc) => { if (paths.length > 12) return; if (i === k) { paths.push(acc); return; } (M.d[q][w[i]] || []).forEach(t => go(t, i + 1, acc.concat(t))); };
      go(M.start, 0, [M.start]);
    }
    let en = M.en, a = M.ar;
    if (k > 0) {
      const x = w[k - 1], prev = sets[k - 1], mvs = M.mv(prev, x), added = cur.filter(q => !mvs.includes(q));
      const mv = prev.map(q => [q, M.d[q][x] || []]);
      const pe = mv.map(([q, t]) => t.length ? `${M.nm(q)} –${x}→ ${t.map(M.nm).join(', ')}` : `${M.nm(q)} has no move on ${x}`).join('; ');
      const pa = mv.map(([q, t]) => t.length ? `${M.nm(q)} –${x}→ ${t.map(M.nm).join(', ')}` : `${M.nm(q)} مالهاش move على ${x}`).join('؛ ');
      const multi = mv.filter(([, t]) => t.length > 1);
      en = `Read <b>${x}</b> (symbol ${k} of ${w.length}): ${pe}${added.length ? `; then ε adds ${added.map(M.nm).join(', ')}` : ''}. Now in <b>${S(cur)}</b>.`;
      a = `قرينا <b>${x}</b> (الـ symbol رقم ${k} من ${w.length}): ${pa}${added.length ? `؛ وبعدين الـ ε بتضيف ${added.map(M.nm).join(', ')}` : ''}. دلوقتي إحنا في <b>${S(cur)}</b>.`;
      if (multi.length) { en += ` ${multi.map(([q, t]) => `${M.nm(q)} has ${t.length} next states on ${x}`).join(', ')}: non-deterministic.`; a += ` ${multi.map(([q, t]) => `الـ ${M.nm(q)} ليها ${t.length} next states على ${x}`).join('، ')}: ده non-deterministic.`; }
      if (k === w.length) {
        const acc = cur.some(q => M.fin.includes(q)), fins = M.fin.map(M.nm).join(', ');
        en += acc ? ` End of input: the set contains a final state (${fins}), so <b>${w}</b> is <b>accepted</b>.` : cur.length ? ` End of input: no final state (${fins}) in the set, so <b>${w}</b> is <b>rejected</b>.` : ` No state is left, so <b>${w}</b> is <b>rejected</b>.`;
        a += acc ? ` خلص الـ input: الـ set فيها final state (${fins})، يبقى <b>${w}</b> <b>مقبولة (accepted)</b>.` : cur.length ? ` خلص الـ input: مفيش final state (${fins}) في الـ set، يبقى <b>${w}</b> <b>مرفوضة (rejected)</b>.` : ` مفضلش ولا state، يبقى <b>${w}</b> <b>مرفوضة (rejected)</b>.`;
      }
    }
    return html`<figure className="fig cf3"><div className="fig-stage">
      <div className="cf3-row" role="tablist">${SIGNS.map((s, j) => html`<button key=${s.key} role="tab" aria-selected=${tab === j} className=${'fig-btn' + (tab === j ? ' cf3-sel' : '')} onClick=${() => pick(j)}>${s.tab}</button>`)}</div>
      <${Graph} g=${nfaGraph(M)} on=${cur} hot=${hot} title=${'Slide automaton: ' + M.tab} />
      ${M.note && html`<p className="cf3-note">${ar ? M.note + ' · ' + M.noteAr : M.note}</p>`}
      <div className="cf3-in" aria-label="input string">${w.length ? w.split('').map((x, j) => html`<span key=${j} className=${'cf3-sym' + (j < k ? ' done' : j === k ? ' next' : '')}>${x}</span>`) : html`<span className="cf3-empty">input: (empty)</span>`}</div>
      <div className="cf3-trace" aria-live="polite">${sets.slice(0, k + 1).map((s, j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<span className="cf3-arw">–${w[j - 1]}→</span>`}<span className=${'cf3-set' + (j === k ? ' cur' : '') + (j === k && k === w.length && k > 0 && s.some(q => M.fin.includes(q)) ? ' acc' : '')}>${S(s)}</span></${React.Fragment}>`)}</div>
      ${paths.length > 0 && html`<ul className="cf3-paths" aria-label="paths">${paths.map((pt, j) => { const ok = k === w.length && M.fin.includes(pt[pt.length - 1]); return html`<li key=${j} className=${k === w.length ? (ok ? 'ok' : 'no') : ''}>${k === w.length && html`<span className="tg">${ok ? '✓ final' : '✗ not final'}</span>`}${pt.map((q, i) => (i ? ` –${w[i - 1]}→ ` : '') + M.nm(q)).join('')}</li>`; })}</ul>`}
      </div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar">
        <span className="cf3-lbl">Input:</span>
        ${M.syms.map(x => html`<button key=${x} className="fig-btn" onClick=${() => add(x)} disabled=${w.length >= 8} aria-label=${'add ' + x}>${x}</button>`)}
        <button className="fig-btn" onClick=${() => { setRun(false); setW(w.slice(0, -1)); setK(Math.min(k, w.length - 1)); }} disabled=${!w.length} aria-label="delete last symbol">⌫</button>
        ${M.init && html`<button className="fig-btn" onClick=${() => { setRun(false); setW(M.init); setK(0); }}>Slide: ${M.init}</button>`}
        <span className="grow"></span>
        <button className="fig-btn" onClick=${() => { setRun(false); setK(Math.max(0, k - 1)); }} disabled=${k === 0}>‹ Back</button>
        <button className="fig-btn" onClick=${() => { setRun(false); setK(Math.min(w.length, k + 1)); }} disabled=${k >= w.length}>Next ›</button>
        <button className="fig-btn solid" onClick=${() => { if (calm()) { setK(w.length); return; } setK(0); setRun(true); }} disabled=${!w.length}>▶ Run</button>
      </div></figure>`;
  }

  /* ── L3 slide 4: NFA vs. DFA, the comparison table and its two example figures ── */
  const CMP = [
    ['Empty string transition', 'DFA is not capable of using an empty string transition.', 'NFA can use an empty string transition.'],
    ['Transition functions', 'The number related to the next state is one.', 'The number related to the next state/states is either zero or one.'],
    ['Complexities of time', 'The total time required for running any input string in DFA is less than what it is in NFA.', 'The total time required for running any input string in NFA is larger than that in comparison to DFA.'],
    ['The setting of the next possible set', 'The next possible state is clearly set in DFA.', 'Every single pair of input symbols and states may contain many possible next states.'],
  ];
  function NfaVsDfa({ ar }) {
    const uid = useRef('cf3c' + Math.random().toString(36).slice(2, 8)).current;
    const steps = [
      { en: 'Slide 4’s two examples. <b>DFA</b>: two edges go from the start state to the second state, one labelled <b>s</b> and one labelled <b>t</b>, with no ε. <b>NFA</b>: ε edges lead from the start state into a box for s and a box for t, ε edges lead out of them into the last state, and the last state has an outgoing ε edge.',
        ar: 'المثالين بتوع slide 4. الـ <b>DFA</b>: فيه edgeين من الـ start state للـ state التانية، واحد عليه <b>s</b> وواحد عليه <b>t</b>، ومفيش ε. الـ <b>NFA</b>: فيه ε edges من الـ start state داخلة على box لـ s وbox لـ t، وε edges طالعة منهم للـ state الأخيرة، والـ state الأخيرة طالع منها ε edge.' },
      { en: '<b>Empty string transition.</b> DFA is not capable of using an empty string transition. NFA can use an empty string transition: every lit edge in the NFA example is an ε edge.', ar: '<b>الـ Empty string transition.</b> الـ DFA مايقدرش يستخدم empty string transition. الـ NFA يقدر: كل الـ edges المنوّرة في مثال الـ NFA هي ε edges.' },
      { en: '<b>Transition functions.</b> DFA: the number related to the next state is one (on s, exactly one next state; on t, exactly one). NFA, as the slide says: either zero or one. ‡ In fact an NFA may have zero, one or more next states for a (state, symbol) pair, as the last row says.', ar: '<b>الـ Transition functions.</b> الـ DFA: عدد الـ next state واحد بس (على s فيه next state واحدة بالظبط، وعلى t واحدة). الـ NFA زي ما الـ slide بتقول: يا صفر يا واحد. ‡ في الحقيقة الـ NFA ممكن يبقى ليه صفر أو واحد أو أكتر من next state لكل (state, symbol)، زي ما الصف الأخير بيقول.' },
      { en: '<b>Complexities of time.</b> The total time required for running any input string in a DFA is less than in an NFA; in an NFA it is larger.', ar: '<b>الـ Complexities of time.</b> الوقت الكلي لتشغيل أي input string في الـ DFA أقل منه في الـ NFA؛ وفي الـ NFA أكبر.' },
      { en: '<b>The setting of the next possible set.</b> DFA: the next possible state is clearly set. NFA: every single pair of input symbols and states may contain many possible next states (here the start state’s ε edges lead to both the s box and the t box).', ar: '<b>الـ setting بتاع الـ next possible set.</b> الـ DFA: الـ next possible state محددة بوضوح. الـ NFA: كل pair من input symbol وstate ممكن يبقى ليه next states كتير (هنا الـ ε edges بتاعة الـ start state بتروح للـ box بتاع s وللـ box بتاع t الاتنين).' },
    ];
    const [i, ctl] = useSteps(steps.length, 3800);
    const epsAll = i === 1, epsStart = i === 1 || i === 4, dHot = i === 2;
    const M1 = `url(#${uid}m)`, MH = `url(#${uid}h)`;
    const ed = (on, d, k) => html`<path key=${k} className=${'ed' + (on ? ' hot' : '')} d=${d} markerEnd=${on ? MH : M1} />`;
    const lb = (on, x, y, t, k) => html`<text key=${k} className=${'el' + (on ? ' hot' : '')} x=${x} y=${y} textAnchor="middle" dominantBaseline="central" fontSize="19">${t}</text>`;
    const defs = html`<defs>
      <marker id=${uid + 'm'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,0 L10,5 L0,10 z" style=${{ fill: 'var(--graphite)' }} /></marker>
      <marker id=${uid + 'h'} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,0 L10,5 L0,10 z" style=${{ fill: 'var(--k-compiler)' }} /></marker></defs>`;
    const box = (cy, t, k) => html`<g key=${k}><ellipse className="st" cx="170" cy=${cy} rx="40" ry="21" /><path className="ed" d=${`M136,${cy + 8} L202,${cy + 8}`} markerEnd=${M1} /><text x="170" y=${cy - 5} textAnchor="middle" dominantBaseline="central" fontSize="19">${t}</text></g>`;
    return html`<figure className="fig cf3"><div className="fig-stage">
      <div className="cf3-two">
        <div><p className="cf3-hd">DFA</p><svg className="cf3-g" viewBox="0 0 300 150" style=${{ maxWidth: '300px' }} role="img" aria-label="DFA example: start state to second state on s or on t">${defs}
          ${ed(false, 'M10,75 L48,75', 'st')}
          ${ed(dHot, 'M86,64 C110,20 190,20 214,64', 's')}${ed(dHot, 'M86,86 C110,130 190,130 214,86', 't')}
          <path className="ed" d="M250,75 L292,75" />
          <circle className="st" cx="68" cy="75" r="20" /><circle className="st" cx="232" cy="75" r="20" />
          ${lb(dHot, 150, 18, 's', 'ls')}${lb(dHot, 150, 132, 't', 'lt')}
        </svg></div>
        <div><p className="cf3-hd">NFA</p><svg className="cf3-g" viewBox="0 0 340 170" style=${{ maxWidth: '330px' }} role="img" aria-label="NFA example: ε edges into a box for s and a box for t, ε edges out, and an outgoing ε from the last state">${defs}
          ${ed(false, 'M2,85 L20,85', 'st')}
          ${ed(epsStart, 'M50,72 Q72,40 128,40', 'e1')}${ed(epsStart, 'M50,98 Q72,130 128,130', 'e2')}
          ${ed(epsAll, 'M212,40 Q268,40 289,72', 'e3')}${ed(epsAll, 'M212,130 Q268,130 289,98', 'e4')}
          ${ed(epsAll, 'M320,85 L338,85', 'e5')}
          <circle className="st" cx="38" cy="85" r="18" /><circle className="st" cx="302" cy="85" r="18" />
          ${box(40, 's', 'bs')}${box(130, 't', 'bt')}
          ${lb(epsStart, 70, 38, 'ε', 'l1')}${lb(epsStart, 70, 132, 'ε', 'l2')}${lb(epsAll, 270, 38, 'ε', 'l3')}${lb(epsAll, 270, 132, 'ε', 'l4')}${lb(epsAll, 328, 66, 'ε', 'l5')}
        </svg></div>
      </div>
      <div className="cf3-cmp">${CMP.map((r, j) => html`<div key=${j} className=${'cf3-cr ' + pop(i >= j + 1) + (i === j + 1 ? ' on' : '')}>
        <span className="rh">${r[0]}</span><span><span className="tg">DFA</span>${r[1]}</span><span><span className="tg">NFA</span>${r[2]}</span>
        ${j === 1 && html`<span className="fx">‡ Really zero, one or more next states (see the last row).</span>`}</div>`)}</div>
      </div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L3 slide 5: the transition table of the example automaton, filled row by row ── */
  const TT = mk({ states: ['S', 'P', 'Q', 'R', 'T', 'F'], start: 'S', fin: ['F'], syms: ['a', 'b'], edges: ['S-a>P', 'S-b>Q', 'P-b>R', 'R-b>F', 'Q-a>Q', 'Q-a>T', 'T-b>T', 'T-a>F'],
    pos: { S: [52, 105], P: [150, 40], Q: [150, 165], R: [255, 40], T: [255, 165], F: [334, 105] }, w: 362, h: 255, loops: { 'Q>Q': 'down', 'T>T': 'down' } });
  const TTROW = [
    ['Row S (the start state): S –a→ P and S –b→ Q.', 'صف S (الـ start state): S –a→ P و S –b→ Q.'],
    ['Row P: P –b→ R. P has no edge on a, so that cell is <b>-</b> (no transition).', 'صف P: P –b→ R. الـ P مالهاش edge على a، فالخانة دي <b>-</b> (مفيش transition).'],
    ['Row Q: on a, Q can loop back to Q or go to T, so the cell holds two states: <b>Q,T</b>. No edge on b: <b>-</b>.', 'صف Q: على a الـ Q ممكن ترجع لنفسها (loop) أو تروح T، فالخانة فيها state اتنين: <b>Q,T</b>. مفيش edge على b: <b>-</b>.'],
    ['Row R: R –b→ F; nothing on a: <b>-</b>.', 'صف R: R –b→ F؛ مفيش حاجة على a: <b>-</b>.'],
    ['Row T: T –a→ F, and T –b→ T (the loop).', 'صف T: T –a→ F، و T –b→ T (الـ loop).'],
    ['Row F: F is the final state (double circle) and has no outgoing edges: <b>-</b> and <b>-</b>.', 'صف F: الـ F هي الـ final state (الدايرة المزدوجة) ومفيش edges طالعة منها: <b>-</b> و <b>-</b>.'],
  ];
  function TransTable({ ar }) {
    const steps = [{ en: 'A <b>transition table</b> is a tabular representation of an automaton: one row per state, one column per input symbol, and each cell holds the next state(s); <b>-</b> means no transition. Watch it fill row by row, or tap a filled cell.', ar: 'الـ <b>transition table</b> هو تمثيل للـ automaton على شكل جدول: صف لكل state، وعمود لكل input symbol، وكل خانة فيها الـ next state (أو states)؛ و<b>-</b> معناها مفيش transition. اتفرّج عليه وهو بيتملا صف صف، أو دوس على خانة مليانة.' }]
      .concat(TTROW.map(r => ({ en: r[0], ar: r[1] })));
    const [i, ctl] = useSteps(steps.length, 2600), [sel, setSel] = useState(null);
    useEffect(() => setSel(null), [i]);
    const cell = (q, x) => { const t = TT.d[q][x] || []; return t.length ? t.join(',') : '-'; };
    let on = [], hot = [], cap = steps[i];
    if (sel) {
      const [q, x] = sel, t = TT.d[q][x] || [];
      on = [q]; hot = TT.E.filter(e => e.f === q && e.syms.includes(x)).map(e => e.id);
      cap = { en: `(${q}, ${x}) = <b>${cell(q, x)}</b>: ` + (t.length ? `from ${q} on ${x} the automaton goes to ${t.join(' or ')}.` : `${q} has no edge on ${x}, so there is no transition.`),
        ar: `(${q}, ${x}) = <b>${cell(q, x)}</b>: ` + (t.length ? `من ${q} على ${x} الـ automaton بيروح ${t.join(' أو ')}.` : `الـ ${q} مالهاش edge على ${x}، يعني مفيش transition.`) };
    } else if (i > 0) { const q = TT.states[i - 1]; on = [q]; hot = TT.E.filter(e => e.f === q).map(e => e.id); }
    return html`<figure className="fig cf3"><div className="fig-stage">
      <${Graph} g=${nfaGraph(TT)} on=${on} hot=${hot} mw=${440} title="Slide 5 automaton: S, P, Q, R, T, F" />
      <div className="cf3-tw"><table className="cf3-tb"><thead><tr><th>State</th><th>a</th><th>b</th></tr></thead><tbody>
        ${TT.states.map((q, j) => html`<tr key=${q}><th className=${(i === j + 1 && !sel) || (sel && sel[0] === q) ? 'cur' : ''}>${q === 'S' ? '→ ' : ''}${q}${q === 'F' ? ' (final)' : ''}</th>
          ${TT.syms.map(x => { const vis = i >= j + 1, s = sel && sel[0] === q && sel[1] === x; return html`<td key=${x} className=${(vis ? 'pick ' : '') + (s ? 'cur' : '')} onClick=${() => vis && setSel([q, x])}>${vis ? cell(q, x) : ''}</td>`; })}</tr>`)}
      </tbody></table></div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L3 slide 6: the first transition table (with empty transition), cell by cell ── */
  const SL = { states: ['A', 'B'], start: 'A', fin: ['B'], syms: ['0', '1'], edges: ['A-0,1>A', 'A-0>B'], pos: { A: [90, 95], B: [262, 95] }, w: 340, h: 135 };
  const SLM = mk(SL);
  function FirstTable({ ar }) {
    const steps = [
      { en: 'Slide 6’s NFA: <b>A</b> is the start state with a loop on 0,1, and A –0→ <b>B</b>; B is the final state (double circle). <b>Construct the first transition table (with empty transition)</b>: columns 0, 1 and ε.', ar: 'الـ NFA بتاع slide 6: الـ <b>A</b> هي الـ start state وعليها loop على 0,1، و A –0→ <b>B</b>؛ والـ B هي الـ final state (دايرة مزدوجة). <b>اعمل أول transition table (فيها empty transition)</b>: أعمدة 0 و 1 و ε.', on: [], hot: [] },
      { en: '(A, 0): on 0, A can loop back to A <b>or</b> go to B, so the cell is <b>A,B</b>.', ar: '(A, 0): على 0 الـ A ممكن ترجع لنفسها (loop) <b>أو</b> تروح B، فالخانة <b>A,B</b>.', on: ['A'], hot: [0, 1] },
      { en: '(A, 1): only the loop reads 1, so the cell is <b>A</b>.', ar: '(A, 1): الـ loop بس هو اللي بيقرا 1، فالخانة <b>A</b>.', on: ['A'], hot: [0] },
      { en: '(A, ε): there is no ε edge, but every state reaches itself by ε, so the ε cell of A is <b>A</b>.', ar: '(A, ε): مفيش ε edge، بس كل state بتوصل لنفسها بالـ ε، فخانة الـ ε بتاعة A هي <b>A</b>.', on: ['A'], hot: [] },
      { en: 'Row B: no edge leaves B, so its 0 and 1 cells are <b>-</b>, and its ε cell is <b>B</b> itself. Next comes the second table, without ε (next section).', ar: 'صف B: مفيش edge طالع من B، فخانات 0 و 1 بتاعتها <b>-</b>، وخانة الـ ε هي <b>B</b> نفسها. بعد كده الـ second table من غير ε (السكشن اللي جاي).', on: ['B'], hot: [] },
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const T = [['A', ['A,B', 'A', 'A']], ['B', ['-', '-', 'B']]], seen = [[1, 2, 3], [4, 4, 4]];
    return html`<figure className="fig cf3"><div className="fig-stage">
      <${Graph} g=${nfaGraph(SLM)} on=${steps[i].on} hot=${steps[i].hot} mw=${400} title="Slide 6 NFA: A loop 0,1, A to B on 0" />
      <div className="cf3-tw"><table className="cf3-tb"><caption>First transition table (with empty transition)</caption><thead><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr></thead><tbody>
        ${T.map(([q, cs], r) => html`<tr key=${q}><th className=${steps[i].on.includes(q) ? 'cur' : ''}>${q === 'A' ? '→ ' : '* '}${q}</th>${cs.map((c, j) => html`<td key=${j} className=${i === seen[r][j] ? 'cur' : ''}>${i >= seen[r][j] ? c : ''}</td>`)}</tr>`)}
      </tbody></table></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L3 slide 6 and the notes' exam NFAs: the lecture's 3-step NFA → DFA (subset construction) ── */
  const EX = [
    Object.assign({}, SL, { key: 'slide', name: 'Slide 6', fmt: 'slide',
      why: 'on 0, A can stay in A (the loop) or go to B, so (A, 0) has two next states', whyAr: 'على 0 الـ A ممكن تفضل في A (الـ loop) أو تروح B، يعني (A, 0) ليها next state اتنين',
      end: 'It accepts the strings that end in 0.', endAr: 'بيقبل الـ strings اللي آخرها 0.',
      dpos: { 'A': [82, 105], 'A,B': [255, 105] }, dw: 340, dh: 150 }),
    { key: 'exam1', name: 'Exam NFA 1', states: ['1', '2', '3'], start: '1', fin: ['3'], syms: ['0', '1'], edges: ['1-0>3', '3-0>1', '3-1>3', '3-1>2', '2-0>3'],
      pos: { 1: [60, 110], 3: [185, 110], 2: [305, 110] }, w: 345, h: 155,
      why: 'state 3 has a loop on 1 AND a transition on the same symbol 1 to state 2, so (3, 1) has two next states', whyAr: 'الـ state 3 عليها loop على 1 وكمان transition بنفس الـ symbol 1 لـ state 2، يعني (3, 1) ليها next state اتنين',
      dpos: { '1': [70, 60], '3': [255, 60], '2,3': [255, 195], '1,3': [70, 195] }, dloops: { '2,3': 'down', '1,3': 'down' }, dw: 340, dh: 282 },
    { key: 'exam2', name: 'Exam NFA 2 (ε)', states: ['1', '2', '3'], start: '1', fin: ['1'], syms: ['a', 'b'], edges: ['1-b>2', '1-ε>3', '2-a>2', '2-a,b>3', '3-a>1'],
      pos: { 1: [62, 180], 2: [180, 85], 3: [300, 180] }, w: 340, h: 225,
      why: 'it contains ε (1 –ε→ 3)', whyAr: 'فيه ε (1 –ε→ 3)',
      dpos: { '1,3': [76, 80], '2': [190, 80], '3': [72, 215], '2,3': [190, 215], '1,2,3': [302, 215] }, dloops: { '1,3': 'up', '1,2,3': 'up' }, dw: 350, dh: 268 },
    { key: 'qa3', name: 'Q&A: ab | ba+', states: ['0', '1', '2', '3'], start: '0', fin: ['3'], syms: ['a', 'b'], edges: ['0-b>2', '0-a>1', '2-a>2', '2-a>3', '1-b>3'],
      pos: { 0: [55, 110], 1: [180, 45], 2: [180, 175], 3: [305, 110] }, w: 340, h: 252, loops: { '2>2': 'down' },
      why: 'on a, state 2 can loop back to 2 or go to 3', whyAr: 'على a الـ state 2 ممكن ترجع لنفسها (loop) أو تروح 3',
      end: 'The language is ab | ba+.', endAr: 'الـ language هي ab | ba+.',
      dpos: { '0': [55, 110], '1': [172, 45], '2': [172, 175], '3': [300, 45], '2,3': [300, 175] }, dloops: { '2,3': 'down' }, dw: 345, dh: 255 },
    { key: 'p2122', name: '2021/22 paper', states: ['1', '2', '3'], start: '1', fin: ['3'], syms: ['0', '1'], edges: ['1-0>3', '3-0>1', '3-0>3', '3-1>2', '2-0>3'],
      pos: { 1: [60, 110], 3: [185, 110], 2: [305, 110] }, w: 345, h: 155,
      why: 'state 3 has two moves on 0 (to 1, and the loop back to 3)', whyAr: 'الـ state 3 ليها move اتنين على 0 (لـ 1، والـ loop لنفسها)',
      dpos: { '1': [55, 60], '3': [180, 60], '2': [300, 60], '1,3': [95, 190] }, dloops: { '1,3': 'down' }, dw: 340, dh: 262 },
    { key: 's2324', name: 'Summer 2023/24', states: ['0', '1', '2'], start: '0', fin: ['2'], syms: ['a', 'b'], edges: ['0-b>1', '0-a>2', '1-a>1', '1-a>2', '2-a>1'],
      pos: { 0: [55, 120], 1: [195, 50], 2: [195, 190] }, w: 320, h: 230, loops: { '1>1': 'right' },
      why: 'on a, state 1 goes to 1 (the loop) and to 2', whyAr: 'على a الـ state 1 بتروح 1 (الـ loop) و 2',
      dpos: { '0': [55, 120], '1': [180, 50], '2': [180, 190], '1,2': [300, 50] }, dloops: { '1,2': 'down' }, dbends: { '2>1': 6 }, dw: 345, dh: 225 },
  ].map(mk);

  function plan(M) {
    const key = a => a.join(','), steps = [{ k: 'nfa' }];
    M.states.forEach(q => steps.push({ k: 't1', q }));
    const start = M.clo([M.start]), rows = [start], keys = [key(start)];
    steps.push({ k: 'start', S: start });
    for (let r = 0; r < rows.length; r++) M.syms.forEach(x => {
      const S = rows[r], mv = M.mv(S, x), res = M.clo(mv), kk = key(res); let isNew = false;
      if (res.length && !keys.includes(kk)) { keys.push(kk); rows.push(res); isNew = true; }
      steps.push({ k: 'cell', r, x, S, mv, res, isNew, n: rows.length });
    });
    steps.push({ k: 'done' }, { k: 'dfa' });
    return { steps, rows, keys };
  }
  function dfaGraph(M, pl) {
    const nodes = pl.rows.map((S, j) => { const k = S.join(','); return { id: k, x: M.dpos[k][0], y: M.dpos[k][1], label: k, fin: S.some(q => M.fin.includes(q)), start: j === 0 ? 'left' : null }; });
    const em = {};
    pl.steps.filter(s => s.k === 'cell' && s.res.length).forEach(s => { const f = s.S.join(','), t = s.res.join(','), id = f + '>' + t; (em[id] = em[id] || { f, t, syms: [] }).syms.push(s.x); });
    const edges = Object.keys(em).map((id, j) => ({ id: j, f: em[id].f, t: em[id].t, l: em[id].syms.join(','), loop: em[id].f === em[id].t ? ((M.dloops || {})[em[id].f] || 'up') : null, bend: (M.dbends || {})[id] }));
    return { w: M.dw, h: M.dh, nodes, edges };
  }
  function SubsetRun({ M, ar, pick }) {
    const pl = useRef(plan(M)).current, steps = pl.steps, n = steps.length;
    const [i, ctl] = useSteps(n, 2600);
    const st = steps[i], slide = M.fmt === 'slide';
    const F2 = a => !a.length ? (slide ? '-' : '∅') : slide && a.length === 1 ? a[0] : '{' + a.join(',') + '}';
    const F1 = a => a.length ? M.srt(a).join(',') : '-';
    const Ce = a => '{' + a.join(', ') + '}';
    // what is visible at step i
    let t1 = 0, t2 = 0, filled = {}, started = false;
    for (let j = 0; j <= i; j++) { const s = steps[j]; if (s.k === 't1') t1++; if (s.k === 'start') { started = true; t2 = 1; } if (s.k === 'cell') { filled[s.r + '|' + s.x] = s.res; t2 = s.n; } }
    const showF = st.k === 'dfa';
    // highlights in the NFA
    let on = [], hot = [];
    if (st.k === 't1') { on = [st.q]; hot = M.E.filter(e => e.f === st.q).map(e => e.id); }
    if (st.k === 'start') { on = st.S; hot = M.E.filter(e => e.syms.includes('ε') && st.S.includes(e.f) && st.S.includes(e.t)).map(e => e.id); }
    if (st.k === 'cell') { on = st.S; hot = M.E.filter(e => (st.S.includes(e.f) && e.syms.includes(st.x) && st.mv.includes(e.t)) || (e.syms.includes('ε') && st.res.includes(e.f) && st.res.includes(e.t) && !st.S.includes(e.f))).map(e => e.id); }
    const finSets = pl.rows.filter(S => S.some(q => M.fin.includes(q)));
    const anyEmpty = steps.some(s => s.k === 'cell' && !s.res.length);
    let en, a;
    if (st.k === 'nfa') { en = `<b>${M.name}.</b> Start state ${M.start}; final state${M.fin.length > 1 ? 's' : ''} ${M.fin.join(', ')}. It is non-deterministic: ${M.why}. Convert it with the lecture’s 3 steps (press Next).`; a = `<b>${M.name}.</b> الـ start state هي ${M.start}؛ والـ final هي ${M.fin.join(', ')}. ده non-deterministic: ${M.whyAr}. حوّله بالـ 3 steps بتوع المحاضرة (دوس Next).`; }
    if (st.k === 't1') {
      const q = st.q, E1 = M.clo([q]);
      const mv = M.syms.map(x => `on ${x} → ${F1(M.d[q][x] || [])}`).join(', '), mva = M.syms.map(x => `على ${x} ← ${F1(M.d[q][x] || [])}`).join('، ');
      en = `<b>Step 1: first transition table (with ε).</b> Row ${q}: ${mv}; ε → <b>${F1(E1)}</b> (every state reaches itself by ε${E1.length > 1 ? `, plus ${E1.filter(x => x !== q).map(t => q + ' –ε→ ' + t).join(', ')}` : ''}).`;
      a = `<b>الخطوة 1: أول transition table (فيها ε).</b> صف ${q}: ${mva}؛ والـ ε ← <b>${F1(E1)}</b> (كل state بتوصل لنفسها بالـ ε${E1.length > 1 ? `، وكمان ${E1.filter(x => x !== q).map(t => q + ' –ε→ ' + t).join('، ')}` : ''}).`;
    }
    if (st.k === 'start') {
      en = `<b>Step 2: second transition table (without ε).</b> Start from the ε-closure of the start state: E(${M.start}) = <b>${Ce(st.S)}</b>. This set is the first row, the DFA start state.`;
      a = `<b>الخطوة 2: تاني transition table (من غير ε).</b> ابدأ من الـ ε-closure بتاع الـ start state: E(${M.start}) = <b>${Ce(st.S)}</b>. الـ set دي هي أول صف، وهي الـ start state بتاعة الـ DFA.`;
    }
    if (st.k === 'cell') {
      const parts = st.S.map(q => [q, M.d[q][st.x] || []]).filter(p => p[1].length);
      const pe = parts.length ? parts.map(([q, t]) => `${q} –${st.x}→ ${t.join(', ')}`).join('; ') : `no member of ${F2(st.S)} moves on ${st.x}`;
      const pa = parts.length ? parts.map(([q, t]) => `${q} –${st.x}→ ${t.join(', ')}`).join('؛ ') : `ولا عنصر في ${F2(st.S)} بيتحرك على ${st.x}`;
      const epsAdd = st.res.length > st.mv.length;
      en = `Row ${F2(st.S)} on <b>${st.x}</b>: ${pe}` + (epsAdd ? `; the ε-closure of ${Ce(st.mv)} is ${Ce(st.res)}` : '') + '. ';
      a = `صف ${F2(st.S)} على <b>${st.x}</b>: ${pa}` + (epsAdd ? `؛ والـ ε-closure بتاع ${Ce(st.mv)} هو ${Ce(st.res)}` : '') + '. ';
      if (!st.res.length) { en += `The cell is <b>${F2([])}</b>: a dead state, or simply no transition.`; a += `الخانة <b>${F2([])}</b>: dead state، أو ببساطة مفيش transition.`; }
      else if (st.isNew) { en += `<b>${F2(st.res)} is a new set, so it becomes a new row.</b>`; a += `<b>${F2(st.res)} set جديدة، فبتبقى صف جديد.</b>`; }
      else { en += `Cell = <b>${F2(st.res)}</b>, which already has a row.`; a += `الخانة = <b>${F2(st.res)}</b>، ودي ليها صف خلاص.`; }
    }
    if (st.k === 'done') { en = `No new sets appear, so the second table is complete: <b>${pl.rows.length} DFA states</b>${anyEmpty ? ' (not counting the dead state)' : ''}.`; a = `مفيش sets جديدة ظهرت، فالـ second table خلص: <b>${pl.rows.length} DFA states</b>${anyEmpty ? ' (من غير الـ dead state)' : ''}.`; }
    if (st.k === 'dfa') {
      en = `<b>Step 3: draw the DFA.</b> Start state ${F2(pl.rows[0])}. Every set that contains an original final state (${M.fin.join(', ')}) is final: <b>${finSets.map(F2).join(', ')}</b>.` + (anyEmpty ? ` Empty cells (${F2([])}) are a dead state, or simply no transition (not drawn).` : '') + (M.end ? ' ' + M.end : '');
      a = `<b>الخطوة 3: ارسم الـ DFA.</b> الـ start state هي ${F2(pl.rows[0])}. كل set فيها final state أصلية (${M.fin.join(', ')}) تبقى final: <b>${finSets.map(F2).join(', ')}</b>.` + (anyEmpty ? ` الخانات الفاضية (${F2([])}) معناها dead state، أو ببساطة مفيش transition (مش مرسومة).` : '') + (M.endAr ? ' ' + M.endAr : '');
    }
    const curCell = st.k === 'cell' ? st.r + '|' + st.x : null;
    return html`<figure className="fig cf3"><div className="fig-stage">
      <div className="cf3-ex"><span className="cf3-lbl">Example:</span>${EX.map(e => html`<button key=${e.key} className=${'fig-btn' + (e.key === M.key ? ' cf3-sel' : '')} onClick=${() => pick(e.key)}>${e.name}</button>`)}</div>
      <${Graph} g=${nfaGraph(M)} on=${on} hot=${hot} mw=${400} title=${M.name + ' NFA'} />
      <div className="cf3-tw"><table className="cf3-tb"><caption>Step 1: first table (with ε)</caption><thead><tr><th>State</th>${M.syms.map(x => html`<th key=${x}>${x}</th>`)}<th>ε</th></tr></thead><tbody>
        ${M.states.map((q, j) => html`<tr key=${q}><th className=${st.k === 't1' && st.q === q ? 'cur' : ''}>${q === M.start ? '→' : ''}${M.fin.includes(q) ? '*' : ''}${q === M.start || M.fin.includes(q) ? ' ' : ''}${q}</th>
          ${M.syms.concat('ε').map(x => html`<td key=${x}>${j < t1 ? (x === 'ε' ? F1(M.clo([q])) : F1(M.d[q][x] || [])) : ''}</td>`)}</tr>`)}
      </tbody></table></div>
      ${started && html`<div className="cf3-tw"><table className="cf3-tb"><caption>Step 2: second table (without ε)</caption><thead><tr><th>DFA state</th>${M.syms.map(x => html`<th key=${x}>${x}</th>`)}</tr></thead><tbody>
        ${pl.rows.slice(0, t2).map((S, r) => { const isNewRow = st.k === 'cell' && st.isNew && r === st.n - 1; return html`<tr key=${r} className=${isNewRow ? 'new' : ''}><th className=${st.k === 'cell' && st.r === r ? 'cur' : ''}>${r === 0 ? html`<span className="mk">→</span>` : ''}${showF && S.some(q => M.fin.includes(q)) ? html`<span className="mk">*</span>` : ''}${r === 0 || (showF && S.some(q => M.fin.includes(q))) ? ' ' : ''}${F2(S)}</th>
          ${M.syms.map(x => { const c = filled[r + '|' + x]; return html`<td key=${x} className=${curCell === r + '|' + x ? 'cur' : ''}>${c ? F2(c) : ''}</td>`; })}</tr>`; })}
      </tbody></table></div>`}
      ${st.k === 'dfa' && html`<p className="cf3-ph">Step 3: the DFA</p><${Graph} g=${dfaGraph(M, pl)} mw=${400} title=${M.name + ' DFA'} />`}
      </div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="cf3-cnt">Step ${i + 1} / ${n}</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
        <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
        <button className="fig-btn" onClick=${() => ctl.go(n - 1)} disabled=${i === n - 1}>Skip to DFA</button>
        <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div></figure>`;
  }
  function Subset({ ar, init }) {
    const [k, setK] = useState(init || 'slide'), M = EX.find(e => e.key === k);
    return html`<${SubsetRun} key=${k} M=${M} ar=${ar} pick=${setK} />`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-nfa-signs': Signs,
    'cc-nfa-vs-dfa': NfaVsDfa,
    'cc-trans-table': TransTable,
    'cc-first-table': FirstTable,
    'cc-subset': ({ ar }) => html`<${Subset} ar=${ar} init="slide" />`,
    'cc-subset-exam1': ({ ar }) => html`<${Subset} ar=${ar} init="exam1" />`,
    'cc-subset-exam2': ({ ar }) => html`<${Subset} ar=${ar} init="exam2" />`,
  });
})();
/* ── part L4 ── */
// Compiler Design visuals, Lecture 4 (Syntax Analysis: CFG, Derivations, Parse Trees, Ambiguity, Left Recursion): the parser pipeline, the CFG parts of slide 5, derivations of int*int (slide 8), the leftmost tree of id+id*id (slides 10–12), the two trees of id-id+id (slide 13), the sheets' ambiguity proofs, and left recursion and its removal (slides 14–17). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.cv4{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cv4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cv4 .fig-btn[aria-pressed="true"]{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv4 .ltr{ display:block; direction:ltr; unicode-bidi:isolate; text-align:left; font-family:var(--mono); color:var(--ink); margin:3px 0; overflow-wrap:anywhere; }
.cv4-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.cv4-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.cv4-tw{ max-width:620px; margin:0 auto; }
.fig-stage .cv4-tw svg{ width:100%; height:auto; display:block; margin:0 auto; max-width:620px; }
.cv4-tw .nd{ transition:opacity .5s ease; }
.cv4-tw .ed{ stroke:var(--graphite); stroke-width:1.5; transition:opacity .5s ease, stroke .3s; }
.cv4-tw .ed.hi{ stroke:var(--k-compiler); stroke-width:2.6; }
.cv4-tw ellipse{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.4; transition:fill .35s, stroke .35s; }
.cv4-tw .hi ellipse, .cv4-tw .hi rect{ fill:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); stroke:var(--k-compiler); stroke-width:2.4; }
.cv4-tw .mk ellipse, .cv4-tw .mk rect{ fill:color-mix(in srgb, var(--ok) 22%, var(--paper)); stroke:var(--ok); stroke-width:2.4; }
.cv4-tw rect{ fill:transparent; stroke:none; transition:fill .35s; }
.cv4-tw text.t{ font-family:var(--mono); font-weight:700; }
.cv4-tw text.e{ font-style:italic; fill:var(--graphite); }
.cv4-ol, .cv4-ol ul{ list-style:none; margin:0; padding:0; }
.cv4-ol ul{ padding-left:12px; }
.cv4-ol li{ position:relative; padding:2px 0 2px 14px; }
.cv4-ol > li{ padding-left:0; }
.cv4-ol ul > li::before{ content:""; position:absolute; left:0; top:0; bottom:0; border-left:1.5px solid var(--faint); }
.cv4-ol ul > li:last-child::before{ bottom:auto; height:14px; }
.cv4-ol ul > li::after{ content:""; position:absolute; left:0; top:14px; width:10px; border-top:1.5px solid var(--faint); }
.cv4-nd{ display:inline-block; font-size:.92rem; line-height:1.35; color:var(--ink); padding:1px 5px; border-radius:5px; }
.cv4-nd.t{ font-family:var(--mono); font-weight:700; }
.cv4-nd.hi{ background:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); box-shadow:0 0 0 1.5px var(--k-compiler); }
.cv4-nd.mk{ background:color-mix(in srgb, var(--ok) 20%, var(--paper)); box-shadow:0 0 0 1.5px var(--ok); }
.cv4-form{ font:600 1.02rem/1.5 var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.cv4-form .n{ color:var(--k-compiler); }
.cv4-form .at{ text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:3px; }
.cv4-form .nw{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); border-radius:3px; }
.cv4-cur{ text-align:center; margin:4px 0 8px; padding:6px 8px; border:1px solid var(--line); border-radius:10px; background:var(--paper); }
.cv4-cur small{ display:block; font:.8rem var(--body); color:var(--graphite); }
.cv4-tb{ border-collapse:collapse; margin:0 auto 10px; font-size:.86rem; color:var(--ink); max-width:100%; }
.cv4-tb th, .cv4-tb td{ border:1px solid var(--line); padding:3px 7px; text-align:left; }
.cv4-tb th{ background:var(--paper-2); font-weight:700; font-size:.8rem; }
.cv4-tb td{ font-family:var(--mono); background:var(--paper); transition:background .3s, opacity .3s; overflow-wrap:anywhere; }
.cv4-tb tr.cur td{ background:color-mix(in srgb, var(--k-compiler) 18%, var(--paper)); font-weight:700; }
.cv4-tb tr.fut td{ opacity:.3; }
.cv4-gram{ font:600 .98rem/1.6 var(--mono); color:var(--ink); text-align:center; margin:0 auto 8px; }
.cv4-gram .r{ white-space:nowrap; }
.cv4-gram small{ display:block; font:.8rem var(--body); color:var(--graphite); }
.cv4-in{ font:1rem var(--mono); width:100%; max-width:320px; box-sizing:border-box; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
textarea.cv4-in{ max-width:100%; min-height:5.6em; resize:vertical; line-height:1.4; }
.cv4-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.cv4-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; }
.cv4-lbl{ font-size:.84rem; color:var(--graphite); }
.cv4-err{ color:var(--pen); font-weight:700; font-size:.9rem; text-align:center; margin:6px 0; }
.cv4-ok{ color:var(--ok); font-weight:700; }
.cv4-pill{ display:inline-block; font:600 .9rem/1.3 var(--mono); border:1px solid var(--line); border-radius:7px; padding:2px 7px; background:var(--paper); color:var(--ink); margin:2px; transition:opacity .4s, box-shadow .3s; }
.cv4-pill.hi{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv4-pill.bad{ box-shadow:0 0 0 2px var(--pen); color:var(--pen); }
.cv4-pill.dn{ opacity:.4; }
/* pipeline */
.cv4-pipe{ display:grid; gap:4px; justify-items:center; max-width:420px; margin:0 auto; }
.cv4-box{ width:100%; box-sizing:border-box; border:1.5px solid var(--graphite); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; color:var(--ink); transition:opacity .45s, box-shadow .35s; }
.cv4-box > b{ display:block; font-size:.92rem; }
.cv4-box > small{ display:block; font-size:.8rem; color:var(--graphite); }
.cv4-box.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv4-box.off{ opacity:.35; }
.cv4-dn{ color:var(--k-compiler); font-size:1.2rem; line-height:1; }
/* cfg parts */
.cv4-rules{ display:grid; gap:4px; justify-content:center; font:600 1.15rem/1.4 var(--mono); color:var(--ink); margin:0 auto 10px; }
.cv4-rule{ padding:1px 8px; border-radius:7px; transition:box-shadow .3s; }
.cv4-rule.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv4-sy{ padding:0 2px; border-radius:4px; transition:background .35s, color .35s; }
.cv4-sy.v{ background:color-mix(in srgb, var(--k-compiler) 28%, var(--paper)); }
.cv4-sy.s{ background:var(--fig-s); color:#fff; }
.cv4-sy.t{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); }
.cv4-sy.l{ box-shadow:inset 0 -3px 0 var(--k-compiler); }
.cv4-sy.r{ box-shadow:inset 0 -3px 0 var(--ok); }
.cv4-cards{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:6px; max-width:460px; margin:0 auto; }
.cv4-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; font-size:.86rem; line-height:1.35; color:var(--ink); transition:opacity .4s, box-shadow .3s; min-width:0; }
.cv4-card > b{ display:block; color:var(--k-compiler); }
.cv4-card .m{ font-family:var(--mono); font-weight:600; overflow-wrap:anywhere; }
.cv4-card.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv4-card.dim{ opacity:.3; }
.cv4-card.no{ grid-column:1 / -1; text-align:center; border-style:dashed; color:var(--pen); }
.cv4-card.no s{ font-weight:700; }
/* derive playground */
.cv4-chips{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:4px 0 8px; }
.cv4-chip{ font:700 1.1rem/1 var(--mono); min-width:34px; min-height:36px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); padding:0 6px; }
button.cv4-chip{ cursor:pointer; color:var(--k-compiler); border-color:var(--k-compiler); }
button.cv4-chip.sel{ background:var(--fig-s); color:#fff; }
.cv4-hist{ font:600 .92rem/1.5 var(--mono); color:var(--ink); text-align:center; overflow-wrap:anywhere; margin:6px 0; }
.cv4-hist i{ font-style:normal; font-family:var(--body); font-size:.78rem; color:var(--graphite); }
/* two panels */
.cv4-two{ display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:10px; max-width:640px; margin:0 auto; }
.cv4-pan{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 6px 6px; min-width:0; }
.cv4-pan > b{ display:block; text-align:center; font-size:.92rem; color:var(--ink); margin-bottom:2px; }
.cv4-lst{ list-style:none; margin:0 0 6px; padding:0; font:600 .92rem/1.45 var(--mono); color:var(--ink); text-align:center; }
.cv4-lst li{ border-radius:5px; transition:opacity .3s, background .3s; overflow-wrap:anywhere; }
.cv4-lst li.cur{ background:color-mix(in srgb, var(--k-compiler) 18%, var(--paper)); }
.cv4-lst li.fut{ opacity:.25; }
.cv4-verd{ text-align:center; font-weight:700; margin:8px 0 0; color:var(--ink); }
.cv4-verd.amb{ color:var(--pen); } .cv4-verd.one{ color:var(--ok); }
/* left recursion */
.cv4-tape{ display:flex; gap:3px; justify-content:center; flex-wrap:wrap; margin:6px 0; }
.cv4-tape span{ display:grid; place-items:center; min-width:28px; height:32px; border:1px solid var(--line); border-radius:5px; font:700 1.05rem var(--mono); background:var(--paper); color:var(--ink); transition:background .3s, box-shadow .3s; }
.cv4-tape span.dn{ background:var(--fig-s); color:#fff; border-color:transparent; }
.cv4-tape span.nx{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv4-loop{ text-align:center; font-weight:700; color:var(--pen); margin:4px 0; }
.cv4-chain{ display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:4px 6px; font:600 1.1rem/1.4 var(--mono); color:var(--ink); margin:6px 0; }
.cv4-chain .lm{ background:color-mix(in srgb, var(--pen) 18%, var(--paper)); box-shadow:0 0 0 2px var(--pen); border-radius:4px; padding:0 3px; }
.cv4-chain .ar{ color:var(--graphite); }
.cv4-alts{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:6px 0; }
.cv4-alt{ font:600 1rem var(--mono); border-radius:8px; padding:3px 9px; border:1.5px solid var(--line); background:var(--paper); color:var(--ink); transition:border-color .3s, background .3s; }
.cv4-alt.al{ border-color:var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv4-alt.be{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.cv4-alt small{ font:600 .78rem var(--body); color:var(--graphite); margin-left:5px; }
.cv4-res{ font:700 1.1rem/1.6 var(--mono); text-align:center; color:var(--ink); }
.cv4-res div{ transition:opacity .45s; }
.cv4-same{ font-size:.86rem; color:var(--ink); text-align:center; margin-top:8px; line-height:1.45; }
.cv4-same span{ font-family:var(--mono); }
.cv4-sbar{ font-size:.84rem; color:var(--graphite); }
@media (prefers-reduced-motion: reduce){ .cv4-tw .nd, .cv4-tw .ed, .cv4-tw ellipse, .cv4-tb td, .cv4-box, .cv4-card, .cv4-sy, .cv4-tape span, .cv4-lst li, .cv4-res div{ transition:none; } }
`;
  if (!document.getElementById('cv4-css')) { const s = document.createElement('style'); s.id = 'cv4-css'; s.textContent = CSS; document.head.appendChild(s); }
  const L = s => '<span class="ltr">' + s + '</span>';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const Modes = ({ list, mode, set }) => html`<div className="cv4-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  // the step bar: dots for short walks, a counter for long ones
  const SBar = ({ steps, i, ctl }) => steps.length <= 10 ? html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />` : html`<div className="fig-bar"><span className="cv4-sbar">${i + 1} / ${steps.length}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(steps.length - 1, i + 1))} disabled=${i === steps.length - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const isN = s => /^[A-Z]/.test(s);
  const tok = s => [...String(s).matchAll(/int|id|eps|ε|[A-Z]['′’‘]*|\S/g)].map(m => m[0] === 'eps' ? 'ε' : m[0].replace(/[′’‘]/g, "'"));
  const cat = (a, sp) => !a.length ? 'ε' : sp ? a.join(' ') : a.reduce((s, x, k) => s + (k && /\w$/.test(a[k - 1]) && /^\w/.test(x) && (a[k - 1].replace(/'+$/, '').length > 1 || x.replace(/'+$/, '').length > 1) ? ' ' : '') + x, '');
  function parseG(text) {
    const P = {}, order = []; let err = null;
    String(text).split(/[\n,;]+/).map(s => s.trim()).filter(Boolean).forEach(line => {
      if (err) return; const m = line.split(/->|→/);
      if (m.length !== 2) { err = 'Each rule needs one arrow: ' + line; return; }
      const h = tok(m[0]); if (h.length !== 1 || !isN(h[0])) { err = 'The left side must be one non-terminal: ' + line; return; }
      const alts = m[1].split('|').map(a => tok(a).filter(x => x !== 'ε'));
      if (!P[h[0]]) { P[h[0]] = []; order.push(h[0]); } P[h[0]].push(...alts);
    });
    if (!err && !order.length) err = 'Type at least one rule, like S → aS | b';
    if (!err) for (const A of order) for (const a of P[A]) for (const s of a) if (isN(s) && !P[s] && !err) err = s + ' has no rules';
    return { P, order, start: order[0], err };
  }
  // tree: { N: {id: {s, kids, p, eps}}, root }
  function treeFrom(G, ch) {
    const N = {}; let c = 0; const mk = (s, p, eps) => { const id = 'n' + c++; N[id] = { s, kids: [], p, eps: !!eps }; if (p != null) N[p].kids.push(id); return id; };
    const root = mk(G.start, null); let form = [root];
    for (const j of ch) { const k = form.findIndex(id => isN(N[id].s) && !N[id].kids.length); const n = form[k], alt = G.P[N[n].s][j];
      const kids = alt.length ? alt.map(s => mk(s, n)) : (mk('ε', n, 1), []); form = form.slice(0, k).concat(kids, form.slice(k + 1)); }
    return { N, root };
  }
  function allLmd(G, target, cap) {
    cap = cap || 6; const n = target.length, res = []; let work = 0;
    const noEps = !Object.values(G.P).some(al => al.some(a => !a.length));
    const dfs = (form, ch) => {
      if (res.length >= cap || ++work > 150000) return;
      let k = 0; while (k < form.length && !G.P[form[k]]) { if (k >= n || form[k] !== target[k]) return; k++; }
      if (k === form.length) { if (k === n) res.push(ch.slice()); return; }
      if ((noEps ? form.length : form.filter(s => !G.P[s]).length) > n || ch.length > 4 * n + 6) return;
      G.P[form[k]].forEach((alt, j) => { ch.push(j); dfs(form.slice(0, k).concat(alt, form.slice(k + 1)), ch); ch.pop(); });
    };
    dfs([G.start], []);
    return { trees: res.map(ch => treeFrom(G, ch)), cut: work > 150000 };
  }
  // the order a derivation expands the tree's interior nodes: 'L' leftmost, 'R' rightmost
  function order(T, mode) {
    let form = [T.root]; const out = [{ n: null, form }];
    for (;;) { const idx = form.map((id, k) => T.N[id].kids.length ? k : -1).filter(k => k >= 0); if (!idx.length) break;
      const k = mode === 'R' ? idx[idx.length - 1] : idx[0], n = form[k];
      form = form.slice(0, k).concat(T.N[n].kids.filter(c => !T.N[c].eps), form.slice(k + 1)); out.push({ n, k, form }); }
    return out;
  }
  const rule = (T, n, sp) => T.N[n].s + ' → ' + cat(T.N[n].kids.filter(c => !T.N[c].eps).map(c => T.N[c].s), sp);
  const fstr = (T, f, sp) => cat(f.map(id => T.N[id].s), sp);

  const Gram = ({ g }) => g.split(', ').map((r, k, A) => html`<span key=${k}><span className="r">${r}</span>${k < A.length - 1 ? ', ' : ''}</span>`);

  // like useSteps, but restarts when dep changes and copes with a changing length
  function useWalk(n, ms, dep) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [dep]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    return [Math.max(0, Math.min(i, n - 1)), { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }

  /* ───────── the parse-tree drawing (slide style: non-terminals in ellipses, terminals in bold) ───────── */
  const FS = 18, ROW = 56, GAP = 12, NONE = new Set();
  const lw = s => Math.max(s.length * FS * .62 + 16, 32);
  function layout(T) {
    const W = {}, pos = {}; let md = 0;
    const w = id => { const ks = T.N[id].kids; const sum = ks.reduce((a, c) => a + w(c), 0) + GAP * Math.max(0, ks.length - 1); return (W[id] = Math.max(lw(T.N[id].s), sum)); };
    w(T.root);
    const place = (id, left, d) => { md = Math.max(md, d); const ks = T.N[id].kids;
      if (!ks.length) { pos[id] = { x: left + W[id] / 2, y: d * ROW }; return; }
      const sum = ks.reduce((a, c) => a + W[c], 0) + GAP * (ks.length - 1); let cur = left + (W[id] - sum) / 2;
      ks.forEach(c => { place(c, cur, d + 1); cur += W[c] + GAP; });
      pos[id] = { x: (pos[ks[0]].x + pos[ks[ks.length - 1]].x) / 2, y: d * ROW }; };
    place(T.root, 0, 0);
    return { pos, W: W[T.root], H: md * ROW };
  }
  // T: tree; vis(id): shown now; hi / mk: Sets of highlighted (compiler colour) / marked (green) nodes
  function Tree({ T, vis, hi, mk, label }) {
    const Lo = React.useMemo(() => layout(T), [T]);
    const wrap = useRef(null), [cw, setCw] = useState(0);
    useEffect(() => { const el = wrap.current; if (!el) return; const f = () => setCw(el.clientWidth); f(); if (!window.ResizeObserver) return; const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect(); }, []);
    const V = id => !vis || vis(id), H = hi || NONE, M = mk || NONE, VW = Lo.W + 20;
    const cls = id => H.has(id) ? 'hi' : M.has(id) ? 'mk' : '';
    if (!cw || cw * FS / VW >= 12.4) {
      const P = Lo.pos, ids = Object.keys(T.N);
      return html`<div className="cv4-tw" ref=${wrap}><svg viewBox=${`-10 -22 ${VW} ${Lo.H + 44}`} style=${{ maxWidth: Math.round(VW * 1.1) + 'px' }} role="img" aria-label=${label}>
        ${ids.filter(id => T.N[id].p != null).map(id => { const a = P[T.N[id].p], b = P[id], on = V(id) && V(T.N[id].p);
          return html`<line key=${'e' + id} className=${'ed' + (H.has(id) && H.has(T.N[id].p) ? ' hi' : '')} x1=${a.x} y1=${a.y + 16} x2=${b.x} y2=${b.y - 16} style=${{ opacity: on ? 1 : 0 }} />`; })}
        ${ids.map(id => { const n = T.N[id], p = P[id], nt = isN(n.s), w = lw(n.s);
          return html`<g key=${id} className=${'nd ' + cls(id)} style=${{ opacity: V(id) ? 1 : 0 }}>
            ${nt ? html`<ellipse cx=${p.x} cy=${p.y} rx=${w / 2 - 3} ry="16" />` : html`<rect x=${p.x - w / 2 + 3} y=${p.y - 15} width=${w - 6} height="30" rx="7" />`}
            <text x=${p.x} y=${p.y} textAnchor="middle" dominantBaseline="central" fontSize=${FS} className=${n.eps ? 'e' : nt ? '' : 't'}>${n.s}</text></g>`; })}
      </svg></div>`;
    }
    const li = id => { const n = T.N[id], ks = n.kids.filter(V); return html`<li key=${id}><span className=${'cv4-nd ' + (isN(n.s) ? '' : 't ') + cls(id)}>${n.s}</span>${ks.length ? html`<ul>${ks.map(li)}</ul>` : null}</li>`; };
    return html`<div className="cv4-tw" ref=${wrap} role="img" aria-label=${label}><ul className="cv4-ol">${V(T.root) && li(T.root)}</ul></div>`;
  }
  // a sentential form: non-terminals coloured, the one replaced next underlined, the newest symbols shaded
  const Form = ({ T, f, at, nw, sp }) => html`<span className="cv4-form">${f.length ? f.map((id, k) => html`<span key=${id} className=${(isN(T.N[id].s) ? 'n' : '') + (id === at ? ' at' : '') + (nw && nw.has(id) ? ' nw' : '')}>${T.N[id].s}</span>${sp && k < f.length - 1 ? ' ' : ''}`) : 'ε'}</span>`;
  // nodes shown after k steps of a derivation (top-down growth)
  const grown = (T, ord, k) => { const s = new Set([T.root]); for (let j = 1; j <= k && j < ord.length; j++) T.N[ord[j].n].kids.forEach(c => s.add(c)); return s; };

  /* ───────── the slide-8 grammar E→TX, X→+E|ε, T→int Y|(E), Y→*T|ε: a recursive-descent parser that builds the tree ───────── */
  const G8 = 'E → T X, X → + E | ε, T → int Y | ( E ), Y → * T | ε';
  function lex8(src) { const out = []; let i = 0; const s = String(src);
    while (i < s.length) { const c = s[i]; if (/\s/.test(c)) { i++; continue; } if (s.startsWith('int', i)) { out.push('int'); i += 3; continue; } if ('+*()'.includes(c)) { out.push(c); i++; continue; } return { err: c, toks: out }; }
    return { toks: out }; }
  function parse8(tk) {
    const N = {}; let c = 0, i = 0; const mk = (s, p, eps) => { const id = 'n' + c++; N[id] = { s, kids: [], p, eps: !!eps }; if (p != null) N[p].kids.push(id); return id; };
    const fail = need => { throw { need, got: i < tk.length ? tk[i] : null, at: i }; };
    const E = n => { const t = mk('T', n), x = mk('X', n); T(t); X(x); };
    const X = n => { if (tk[i] === '+') { mk('+', n); i++; E(mk('E', n)); } else mk('ε', n, 1); };
    const T = n => { if (tk[i] === 'int') { mk('int', n); i++; Y(mk('Y', n)); } else if (tk[i] === '(') { mk('(', n); i++; E(mk('E', n)); if (tk[i] !== ')') fail(')'); mk(')', n); i++; } else fail('int or ('); };
    const Y = n => { if (tk[i] === '*') { mk('*', n); i++; T(mk('T', n)); } else mk('ε', n, 1); };
    const root = mk('E', null);
    try { E(root); if (i < tk.length) fail('the end of the input'); return { T: { N, root } }; } catch (e) { if (e && e.need) return { err: e }; throw e; }
  }
  const errEn = e => `expected <b>${esc(e.need)}</b> but found <b>${e.got == null ? 'the end of the input' : esc(e.got)}</b> (token ${e.at + 1})`;
  const errAr = e => `كان مستني <bdi>${esc(e.need)}</bdi> ولقى <bdi>${e.got == null ? 'end of input' : esc(e.got)}</bdi>`;

  /* ───────── [0] the parser between the lexer and the parse tree ───────── */
  const PIPE_EX = ['int*int', '(int*int)', '(int*int', 'int*int)'];
  function Pipeline({ ar }) {
    const [src, setSrc] = useState(PIPE_EX[1]);
    const lx = lex8(src), ps = lx.err == null ? parse8(lx.toks) : null, n = lx.toks.length;
    const steps = [0, 1, 2, 3];
    const [i, ctl] = useWalk(4, 2300, src);
    const S = esc(src.trim() || ' ');
    let en, a;
    if (i === 0) { en = `Source text <b>${S}</b>. Syntax analysis (parsing) is the second phase; first the lexical analyzer reads the characters.`; a = 'ده الـ source text، والـ syntax analysis (الـ parsing) هو تاني phase. الأول الـ lexical analyzer بيقرا الحروف:' + L(S); }
    else if (lx.err != null) { en = `The lexical analyzer finds the tokens with regular expressions, but <b>${esc(lx.err)}</b> is not a token of this grammar: a lexical error, so nothing reaches the parser.`; a = `الـ lexical analyzer بيلاقي الـ tokens بالـ regular expressions، لكن الحرف <bdi>${esc(lx.err)}</bdi> مش token في الـ grammar دي، فده lexical error ومفيش حاجة بتوصل للـ parser.`; }
    else if (i === 1) { en = `The lexical analyzer finds <b>${n}</b> tokens with regular expressions. It does not check that the parentheses balance: regular expressions cannot check balancing tokens.`; a = `الـ lexical analyzer لقى <bdi>${n}</bdi> tokens بالـ regular expressions. هو مش بيتشيك إن الأقواس متوازنة، لأن الـ regular expressions ماتقدرش تتشيك على الـ balancing tokens.`; }
    else if (i === 2) { en = 'The parser takes the token stream and checks it against the production rules of a context-free grammar (here the grammar of slide 8).'; a = 'الـ parser بياخد الـ token stream ويقارنه بالـ production rules بتاعة الـ context-free grammar (هنا الـ grammar بتاعة slide 8).'; }
    else if (ps.err) { en = `The parser detects a syntax error: ${errEn(ps.err)}. The lexer passed the same tokens without complaint; only the CFG sees that the structure is wrong.`; a = `الـ parser اكتشف syntax error لأنه ${errAr(ps.err)}. الـ lexer عدّى نفس الـ tokens عادي؛ الـ CFG بس هي اللي شافت إن الـ structure غلط.`; }
    else { en = 'No errors, so the output is a <b>parse tree</b>. Parsing = finding a parse tree for a string of tokens. Its leaves, read left to right, are the tokens again.'; a = 'مفيش errors، فالـ output هو <b>parse tree</b>. الـ Parsing يعني إننا نلاقي parse tree لـ string من الـ tokens، والـ leaves بتاعته لو قريناها من الشمال لليمين بترجع الـ tokens تاني.'; }
    const bad = ps && ps.err;
    return html`<figure className="fig cv4"><div className="fig-stage">
      <div className="cv4-row">${PIPE_EX.map(x => html`<button key=${x} className="fig-btn" aria-pressed=${String(src === x)} onClick=${() => setSrc(x)} style=${{ fontFamily: 'var(--mono)' }}>${x}</button>`)}</div>
      <div className="cv4-row"><label className="cv4-lbl">Try your own <input className="cv4-in" value=${src} onInput=${e => setSrc(e.target.value)} aria-label="Source text" spellCheck="false" autoCapitalize="off" style=${{ maxWidth: '190px' }} /></label></div>
      <div className="cv4-pipe">
      <div className=${'cv4-box' + (i === 0 ? ' on' : '')}><b>Source text</b><span className="cv4-form">${src.trim() || ' '}</span></div>
      <div className="cv4-dn">↓</div>
      <div className=${'cv4-box' + (i === 1 ? ' on' : '') + (i < 1 ? ' off' : '')}><b>Lexical analyzer</b><small>regular expressions</small></div>
      <div className="cv4-dn">↓</div>
      <div className=${'cv4-box' + (i < 1 ? ' off' : '')}><b>Token stream</b><div>${i >= 1 && lx.toks.map((t, k) => html`<span key=${k} className=${'cv4-pill' + (i >= 3 && bad && bad.at === k ? ' bad' : '')}>${t}</span>`)}${i >= 1 && lx.err != null && html`<span className="cv4-pill bad">${lx.err}</span>`}</div></div>
      <div className="cv4-dn">↓</div>
      <div className=${'cv4-box' + (i === 2 ? ' on' : '') + (i < 2 || lx.err != null ? ' off' : '')}><b>Parser (syntax analyzer)</b><small>production rules of the CFG</small><div className="cv4-gram" style=${{ fontSize: '.86rem', margin: 0 }}><${Gram} g="E → TX, X → +E | ε, T → int Y | (E), Y → *T | ε" /></div></div>
      <div className="cv4-dn">↓</div>
      <div className=${'cv4-box' + (i === 3 ? ' on' : '') + (i < 3 || lx.err != null ? ' off' : '')}>${i >= 3 && lx.err == null ? (bad ? html`<b style=${{ color: 'var(--pen)' }}>Syntax error</b><small dangerouslySetInnerHTML=${{ __html: errEn(bad) }}></small>` : html`<b>Parse tree</b><${Tree} T=${ps.T} label="Parse tree" />`) : html`<b>Output</b><small>parse tree or errors</small>`}</div>
    </div></div><${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [1.5] slide 5: the four components of a CFG ───────── */
  const R5 = [['S', [['A', 'B', 'C']]], ['A', [['a'], ['A', 'a']]], ['B', [['b'], ['B', 'b']]], ['C', [['c']]]];
  function CfgParts({ ar }) {
    const steps = [
      { en: 'Slide 5: a context-free grammar. Every CFG has four components; each step lights one up.', ar: 'الـ slide 5 فيها context-free grammar. أي CFG ليه أربع components، وكل خطوة بتنوّر واحد منهم.' },
      { en: '<b>Non-terminals (V)</b> = {S, A, B, C}: syntactic variables that denote sets of strings.', ar: 'الـ <b>Non-terminals (V)</b> هم الـ syntactic variables اللي بتمثّل sets من الـ strings:' + L('V = {S, A, B, C}') },
      { en: '<b>Terminals (Σ)</b> = {a, b, c}: tokens, the basic symbols from which strings are formed.', ar: 'الـ <b>Terminals (Σ)</b> هم الـ tokens، الرموز الأساسية اللي الـ strings بتتكوّن منها:' + L('Σ = {a, b, c}') },
      { en: '<b>Productions (P)</b>: each has a <b>left side</b> (a non-terminal, underlined in the compiler colour), an arrow, and a <b>right side</b> of tokens and/or non-terminals (underlined in green).', ar: 'الـ <b>Productions (P)</b>: كل واحدة ليها <b>left side</b> (non-terminal، تحته خط بلون المادة)، وسهم، و<b>right side</b> فيه tokens و/أو non-terminals (تحته خط أخضر).' },
      { en: '<b>Start symbol (S)</b> = S: derivation begins here, then non-terminals are replaced by right sides again and again.', ar: 'الـ <b>Start symbol</b> هو S، ومنه الـ derivation بيبدأ، وبعدين بنفضل نبدّل الـ non-terminals بالـ right sides.' },
      { en: 'Only these four. There is <b>no "end symbol"</b> in a CFG (a common exam distractor).', ar: 'دول الأربعة بس. <b>مفيش حاجة اسمها "end symbol"</b> في الـ CFG (اختيار غلط مشهور في الامتحانات).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const sy = (s, side, k) => { let c = 'cv4-sy'; if (i === 1 && isN(s)) c += ' v'; if (i === 2 && !isN(s)) c += ' t'; if (i === 3) c += side === 'l' ? ' l' : ' r'; if (i === 4 && side === 'l' && s === 'S') c += ' s'; return html`<span key=${k} className=${c}>${s}</span>`; };
    const card = (k, head, body) => html`<div className=${'cv4-card' + (i === k ? ' on' : i < k ? ' dim' : '')}><b>${head}</b><span className="m">${body}</span></div>`;
    return html`<figure className="fig cv4"><div className="fig-stage">
      <div className="cv4-rules" aria-label="S→ABC, A→a|Aa, B→b|Bb, C→c">${R5.map(([h, alts], r) => html`<div key=${r} className=${'cv4-rule' + (i === 3 ? ' on' : '')}>${sy(h, 'l', 'h')} → ${alts.map((al, j) => html`<span key=${j}>${j ? ' | ' : ''}${al.map((s, q) => sy(s, 'r', q))}</span>`)}</div>`)}</div>
      <div className="cv4-cards">
        ${card(1, 'Non-terminals (V)', '{S, A, B, C}')}${card(2, 'Terminals (Σ)', '{a, b, c}')}
        ${card(3, 'Productions (P)', '{S→ABC, A→a|Aa, B→b|Bb, C→c}')}${card(4, 'Start symbol (S)', '{S}')}
        <div className=${'cv4-card no ' + pop(i >= 5)}><s>end symbol</s> is not a component</div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [2.0] derive a string yourself: the two decisions of every step ───────── */
  const G5 = parseG('S → ABC, A → a | Aa, B → b | Bb, C → c');
  const fresh5 = () => ({ T: { N: { n0: { s: 'S', kids: [], p: null } }, root: 'n0' }, c: 1, form: ['n0'], hist: [], sel: 'n0', last: null });
  function CfgDerive({ ar }) {
    const [st, setSt] = useState(fresh5);
    const { T, form, hist, sel } = st;
    const nts = form.filter(id => isN(T.N[id].s)), done = !nts.length;
    const where = id => { const k = nts.indexOf(id); return nts.length === 1 ? 'B' : k === 0 ? 'L' : k === nts.length - 1 ? 'R' : 'M'; };
    const apply = j => {
      const N = {}; Object.keys(T.N).forEach(k => { N[k] = Object.assign({}, T.N[k], { kids: T.N[k].kids.slice() }); });
      let c = st.c; const alt = G5.P[N[sel].s][j], kids = alt.map(s => { const id = 'n' + c++; N[id] = { s, kids: [], p: sel }; N[sel].kids.push(id); return id; });
      const k = form.indexOf(sel), nf = form.slice(0, k).concat(kids, form.slice(k + 1)), T2 = { N, root: T.root };
      const left = nf.filter(id => isN(N[id].s));
      setSt({ T: T2, c, form: nf, hist: hist.concat({ r: N[sel].s + ' → ' + cat(alt), f: cat(nf.map(id => N[id].s)), w: where(sel) }), sel: left.length === 1 ? left[0] : null, last: sel });
    };
    const kind = hist.every(h => h.w === 'L' || h.w === 'B') ? 'L' : hist.every(h => h.w === 'R' || h.w === 'B') ? 'R' : 'M';
    const str = cat(form.map(id => T.N[id].s));
    let en, a;
    if (!hist.length) { en = 'The grammar of slide 5. Every derivation step takes two decisions: (1) which non-terminal to replace, (2) which production to use. Start: pick a production for <b>S</b>.'; a = 'دي الـ grammar بتاعة slide 5. كل خطوة في الـ derivation فيها قرارين: (1) أنهي non-terminal هنبدّله و(2) أنهي production هنستخدمها. ابدأ واختار production للـ <b>S</b>.'; }
    else if (done) {
      en = `Derived <b>${str}</b> in ${hist.length} steps. ` + (kind === 'L' ? 'You always replaced the leftmost non-terminal: a <b>leftmost derivation</b>.' : kind === 'R' ? 'You always replaced the rightmost non-terminal: a <b>rightmost derivation</b>.' : 'You mixed the order, so it is neither leftmost nor rightmost; the string and the tree do not depend on the order.');
      a = `وصلنا للـ string <bdi>${str}</bdi> في <bdi>${hist.length}</bdi> خطوات. ` + (kind === 'L' ? 'انت دايماً بدّلت الـ non-terminal اللي على أقصى الشمال، يبقى ده <b>leftmost derivation</b>.' : kind === 'R' ? 'انت دايماً بدّلت الـ non-terminal اللي على أقصى اليمين، يبقى ده <b>rightmost derivation</b>.' : 'انت خلطت الترتيب، فده لا leftmost ولا rightmost؛ والـ string والـ tree مش بيتأثروا بالترتيب.');
    } else if (sel) { const w = where(sel), s = T.N[sel].s;
      en = `Decision 2: which production for <b>${s}</b>?` + (w === 'L' ? ' It is the leftmost non-terminal.' : w === 'R' ? ' It is the rightmost non-terminal.' : w === 'B' ? ' It is the only non-terminal left.' : ' It is neither the leftmost nor the rightmost.');
      a = `القرار التاني: أنهي production للـ <bdi>${s}</bdi>؟` + (w === 'L' ? ' ده الـ non-terminal اللي على أقصى الشمال.' : w === 'R' ? ' ده الـ non-terminal اللي على أقصى اليمين.' : w === 'B' ? ' ده آخر non-terminal فاضل.' : ' ده لا اللي على الشمال ولا اللي على اليمين.'); }
    else { en = `Decision 1: which non-terminal to replace? ${nts.length} are left; tap one.`; a = `القرار الأول: أنهي non-terminal هنبدّله؟ فاضل <bdi>${nts.length}</bdi>، دوس على واحد.`; }
    const hiSet = st.last ? new Set([st.last, ...T.N[st.last].kids]) : NONE;
    return html`<figure className="fig cv4"><div className="fig-stage">
      <div className="cv4-gram"><${Gram} g="S → ABC, A → a | Aa, B → b | Bb, C → c" /><small>slide 5</small></div>
      <div className="cv4-chips" aria-label="Current sentential form">${form.map(id => isN(T.N[id].s) ? html`<button key=${id} className=${'cv4-chip' + (sel === id ? ' sel' : '')} aria-pressed=${String(sel === id)} onClick=${() => setSt(Object.assign({}, st, { sel: id }))}>${T.N[id].s}</button>` : html`<span key=${id} className="cv4-chip" style=${{ display: 'inline-grid', placeItems: 'center' }}>${T.N[id].s}</span>`)}</div>
      ${sel && !done && html`<div className="cv4-row">${G5.P[T.N[sel].s].map((alt, j) => html`<button key=${j} className="fig-btn solid" style=${{ fontFamily: 'var(--mono)' }} onClick=${() => apply(j)}>${T.N[sel].s} → ${cat(alt)}</button>`)}</div>`}
      <div className="cv4-hist">S${hist.map((h, k) => html`<span key=${k}> ⇒ ${h.f}</span>`)}</div>
      <${Tree} T=${T} hi=${hiSet} label="Parse tree so far" /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="cv4-sbar">${hist.length} step${hist.length === 1 ? '' : 's'}</span><span className="grow"></span><button className="fig-btn" onClick=${() => setSt(fresh5())}>↻ Start over</button></div></figure>`;
  }

  /* ───────── [3] slide 8: leftmost and rightmost derivations of int*int ───────── */
  function IntDerive({ ar }) {
    const [mode, setMode] = useState('ex'), [dir, setDir] = useState('L'), [own, setOwn] = useState('int+int*int');
    const src = mode === 'ex' ? 'int*int' : own, lx = lex8(src), ps = lx.err == null ? parse8(lx.toks) : null, T = ps && ps.T;
    const ord = React.useMemo(() => T ? order(T, dir) : [{ n: null, form: [] }], [src, dir]);
    const n = ord.length, [i, ctl] = useWalk(n, 1900, src + dir + mode), steps = ord, Ld = dir === 'L';
    let en = '', a = '';
    if (!T) { en = lx.err != null ? `<b>${esc(lx.err)}</b> is not a token of this grammar (tokens: int + * ( )).` : `Not derivable: ${errEn(ps.err)}.`; a = lx.err != null ? `الحرف <bdi>${esc(lx.err)}</bdi> مش token في الـ grammar دي.` : `الـ string دي مش بتتعمل derive لأن الـ parser ${errAr(ps.err)}.`; }
    else if (i === 0) { en = 'Start with the start symbol <b>E</b>. ' + (Ld ? '<b>Leftmost</b>: always replace the leftmost non-terminal (scan left to right).' : '<b>Rightmost</b>: always replace the rightmost non-terminal (scan right to left).');
      a = 'بنبدأ بالـ start symbol اللي هو E. ' + (Ld ? 'في الـ <b>leftmost</b> دايماً بنبدّل الـ non-terminal اللي على أقصى الشمال (من الشمال لليمين).' : 'في الـ <b>rightmost</b> دايماً بنبدّل الـ non-terminal اللي على أقصى اليمين (من اليمين للشمال).'); }
    else { const r = rule(T, ord[i].n, true), f = fstr(T, ord[i].form, true), s = T.N[ord[i].n].s;
      en = `Step ${i}: the ${Ld ? 'leftmost' : 'rightmost'} non-terminal is <b>${s}</b>; apply <b>${r}</b> to get <b>${f}</b>.`;
      a = `في الخطوة <bdi>${i}</bdi> الـ non-terminal اللي على أقصى ${Ld ? 'الشمال' : 'اليمين'} هو <bdi>${s}</bdi>، فبنطبّق الـ production دي ونوصل للـ sentential form:` + L(`${r} &nbsp;⇒&nbsp; ${f}`);
      if (i === n - 1) { en += ' Done: only terminals are left. Leftmost and rightmost use the same productions in a different order and build the same parse tree.'; a += 'كده خلصنا: مفيش غير terminals. الـ leftmost والـ rightmost بيستخدموا نفس الـ productions بترتيب مختلف وبيبنوا نفس الـ parse tree.'; } }
    const vis = T ? grown(T, ord, i) : null, cur = T && i > 0 ? ord[i].n : null, hi = cur ? new Set([cur, ...T.N[cur].kids]) : NONE;
    return html`<figure className="fig cv4"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="cv4-row"><input className="cv4-in" value=${own} onInput=${e => setOwn(e.target.value)} aria-label="String of int + * ( )" spellCheck="false" autoCapitalize="off" style=${{ maxWidth: '220px' }} /></div>`}
      <div className="cv4-gram"><${Gram} g="E → TX, X → +E | ε, T → int Y | (E), Y → *T | ε" /><small>string <b style=${{ fontFamily: 'var(--mono)' }}>${src}</b></small></div>
      <${Modes} list=${[['L', 'Leftmost'], ['R', 'Rightmost']]} mode=${dir} set=${setDir} />
      ${T ? html`<div className="cv4-cur"><small>sentential form</small><${Form} T=${T} f=${ord[i].form} at=${i < n - 1 ? ord[i + 1].n : null} nw=${hi} sp=${1} /></div>
      <table className="cv4-tb"><thead><tr><th>${Ld ? 'Leftmost' : 'Rightmost'}</th><th>Sentential form</th></tr></thead><tbody>
        ${ord.slice(1).map((o, k) => html`<tr key=${k} className=${k + 1 === i ? 'cur' : k + 1 > i ? 'fut' : ''}><td>${rule(T, o.n, true)}</td><td>${fstr(T, o.form, true)}</td></tr>`)}</tbody></table>
      <${Tree} T=${T} vis=${id => vis.has(id)} hi=${hi} label="Parse tree of the string" />` : html`<p className="cv4-err">No derivation</p>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} />${T && html`<${SBar} steps=${steps} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ───────── [2.2] top-down = leftmost, bottom-up = rightmost in reverse (on int*int) ───────── */
  function TopBottom({ ar }) {
    const [dir, setDir] = useState('TD');
    const T = React.useMemo(() => parse8(lex8('int*int').toks).T, []);
    const lo = React.useMemo(() => order(T, 'L'), []), ro = React.useMemo(() => order(T, 'R'), []), n = lo.length - 1;
    const rIdx = {}; ro.forEach((o, j) => { if (o.n) rIdx[o.n] = j; });
    const [i, ctl] = useWalk(n + 1, 2000, dir), steps = lo, td = dir === 'TD';
    let vis, hi = NONE, f, en, a;
    if (td) { vis = grown(T, lo, i); f = lo[i].form; if (i) hi = new Set([lo[i].n, ...T.N[lo[i].n].kids]); }
    else { const showN = id => { const nd = T.N[id]; if (nd.kids.length) return rIdx[id] > n - i; if (nd.eps) return showN(nd.p); return true; };
      vis = new Set(Object.keys(T.N).filter(showN)); f = ro[n - i].form; if (i) { const m = ro[n - i + 1].n; hi = new Set([m, ...T.N[m].kids]); } }
    const fs = fstr(T, f, true);
    if (td) {
      if (i === 0) { en = '<b>Top-down</b> parser: it starts at the root, the start symbol <b>E</b>, and expands downward toward the tokens.'; a = 'الـ <b>top-down</b> parser بيبدأ من الـ root، يعني الـ start symbol اللي هو E، ويعمل expand لتحت لحد الـ tokens.'; }
      else { const r = rule(T, lo[i].n, true); en = `Expand the leftmost non-terminal with <b>${r}</b>: <b>${fs}</b>.`; a = 'بنعمل expand للـ non-terminal اللي على أقصى الشمال:' + L(`${r} &nbsp;⇒&nbsp; ${fs}`); }
      if (i === n) { en += ' The expansions, in order, are exactly the leftmost derivation of slide 8: <b>a top-down parser produces a leftmost derivation</b>.'; a += 'الـ expansions دي بالترتيب هي نفس الـ leftmost derivation بتاع slide 8، يعني <b>الـ top-down parser بيطلّع leftmost derivation</b>.'; }
    } else {
      if (i === 0) { en = '<b>Bottom-up</b> (shift-reduce, LR) parser: it starts from the tokens <b>int * int</b> at the leaves and reduces upward to <b>E</b>.'; a = 'الـ <b>bottom-up</b> parser (الـ shift-reduce أو الـ LR) بيبدأ من الـ tokens اللي في الـ leaves ويعمل reduce لفوق لحد E:' + L('int * int'); }
      else { const r = rule(T, ro[n - i + 1].n, true); en = `Reduce by <b>${r}</b>: <b>${fs}</b>.`; a = 'بنعمل reduce بالـ production دي:' + L(`${r} &nbsp;⇐&nbsp; ${fs}`); }
      if (i === n) { en += ' Read upward, the reductions are the rightmost derivation of slide 8 backwards: <b>a bottom-up parser produces a rightmost derivation in reverse</b>.'; a += 'لو قريت الـ reductions دي من تحت لفوق هتلاقيها الـ rightmost derivation بتاع slide 8 بالمقلوب، يعني <b>الـ bottom-up parser بيطلّع rightmost derivation بالعكس</b>.'; }
    }
    const rows = td ? lo.map(o => fstr(T, o.form, true)) : ro.slice().reverse().map(o => fstr(T, o.form, true));
    return html`<figure className="fig cv4"><div className="fig-stage">
      <${Modes} list=${[['TD', 'Top-down'], ['BU', 'Bottom-up']]} mode=${dir} set=${setDir} />
      <ol className="cv4-lst">${rows.map((r, k) => html`<li key=${k} className=${k === i ? 'cur' : k > i ? 'fut' : ''}>${k ? (td ? '⇒ ' : '⇐ ') : ''}${r}</li>`)}</ol>
      <${Tree} T=${T} vis=${id => vis.has(id)} hi=${hi} label="Parse tree of int*int" /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [4] slides 10–12: the leftmost parsing tree of id+id*id ───────── */
  const G10 = parseG('E → E+E | E*E | id');
  const T10 = treeFrom(G10, [1, 0, 2, 2, 2]), O10 = order(T10, 'L');
  function LmTree({ ar }) {
    const D = [
      ['The root gets three children: <b>E * E</b>.', 'الـ root بياخد 3 children وهم E و * و E.'],
      ['The leftmost E expands to <b>E + E</b>.', 'الـ E اللي على الشمال بيتعمله expand لـ <bdi>E + E</bdi>.'],
      ['The leftmost E becomes <b>id</b>.', 'الـ E اللي على أقصى الشمال بيبقى id.'],
      ['The next leftmost E becomes <b>id</b>.', 'الـ E اللي بعده على الشمال بيبقى id.'],
      ['The last E becomes <b>id</b>: the tree is complete and every leaf is a terminal.', 'آخر E بيبقى id، والـ tree كده كملت وكل leaf فيها terminal.']];
    const steps = [{ en: 'Leftmost parsing tree for <b>id+id*id</b> (slides 10–11). The start symbol <b>E</b> is the root.', ar: 'ده الـ leftmost parsing tree بتاع id+id*id من slides 10 و 11. الـ start symbol اللي هو E هو الـ root.' }]
      .concat(D.map(([e, r], k) => { const f = 'E → ' + fstr(T10, O10[k + 1].form); return { en: `Step ${k + 1}: <b>${f}</b>. ${e}`, ar: `في الخطوة <bdi>${k + 1}</bdi> ${r}` + L(f) }; }));
    const [i, ctl] = useSteps(steps.length, 2300);
    const vis = grown(T10, O10, i), hi = i ? new Set(T10.N[O10[i].n].kids.concat(O10[i].n)) : new Set([T10.root]);
    return html`<figure className="fig cv4"><div className="fig-stage">
      <div className="cv4-cur"><small>derivation so far</small><span className="cv4-form">E${O10.slice(1, i + 1).map((o, k) => html`<span key=${k}> ⇒ ${fstr(T10, o.form)}</span>`)}</span></div>
      <${Tree} T=${T10} vis=${id => vis.has(id)} hi=${hi} label="Leftmost parsing tree of id+id*id" /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [4.1–4.2] slide 12: leaves, interior nodes, in-order traversal, the deepest sub-tree first ───────── */
  function TreeParts({ ar }) {
    const ids = Object.keys(T10.N), leaves = [], walk = id => { const k = T10.N[id].kids; if (!k.length) leaves.push(id); k.forEach(walk); }; walk(T10.root);
    const inner = ids.filter(id => T10.N[id].kids.length), deep = T10.N[T10.root].kids[0], sub = []; const col = id => { sub.push(id); T10.N[id].kids.forEach(col); }; col(deep);
    const steps = [
      { en: 'The parse tree of <b>id+id*id</b> from slide 11.', ar: 'ده الـ parse tree بتاع id+id*id من slide 11.' },
      { en: 'All <b>leaf nodes are terminals</b>: id, +, id, *, id.', ar: 'كل الـ <b>leaf nodes بتبقى terminals</b>، وهم:' + L('id, +, id, *, id') },
      { en: 'All <b>interior (non-leaf) nodes are non-terminals</b>: every E.', ar: 'كل الـ <b>interior (non-leaf) nodes بتبقى non-terminals</b>، يعني كل الـ E.' },
      ...leaves.map((id, k) => ({ en: `In-order traversal reads the leaves from left to right: <b>${leaves.slice(0, k + 1).map(x => T10.N[x].s).join('')}</b>` + (k === leaves.length - 1 ? '. That is the original input string.' : ' …'), ar: 'الـ in-order traversal بيقرا الـ leaves من الشمال لليمين:' + L(leaves.slice(0, k + 1).map(x => T10.N[x].s).join('')) + (k === leaves.length - 1 ? 'وده الـ input string الأصلي.' : '') })),
      { en: 'Precedence: the <b>deepest sub-tree is traversed first</b>. Here that is E → E + E, so <b>id + id</b> is evaluated before anything in the parent nodes.', ar: 'الـ precedence: <b>أعمق sub-tree بيتحسب الأول</b>. هنا ده الـ <bdi>E → E + E</bdi>، فالـ <bdi>id + id</bdi> بيتحسب قبل أي حاجة في الـ parent nodes.' },
      { en: 'Then the <b>*</b> at the root uses that result: in this tree + has precedence over *, so it computes <b>(id + id) * id</b>.', ar: 'وبعدين الـ * اللي في الـ root بيستخدم الناتج ده. يعني في الـ tree دي الـ + ليه precedence على الـ *، فهي بتحسب:' + L('(id + id) * id') }
    ];
    const [i, ctl] = useSteps(steps.length, 2200), nl = leaves.length;
    let hi = NONE, mk = NONE;
    if (i === 0) hi = new Set([T10.root]);
    else if (i === 1) mk = new Set(leaves);
    else if (i === 2) hi = new Set(inner);
    else if (i < 3 + nl) { mk = new Set(leaves.slice(0, i - 2)); hi = new Set([leaves[i - 3]]); }
    else if (i === 3 + nl) hi = new Set(sub);
    else { mk = new Set(sub); hi = new Set([T10.root, ...T10.N[T10.root].kids.slice(1)]); }
    const read = i >= 3 ? leaves.slice(0, Math.min(nl, i - 2)).map(x => T10.N[x].s).join(' ') : '';
    return html`<figure className="fig cv4"><div className="fig-stage">
      <${Tree} T=${T10} hi=${hi} mk=${mk} label="Parse tree of id+id*id" />
      <div className="cv4-cur" style=${{ marginTop: '8px' }}><small>${i < 3 ? 'leaves = terminals, interior nodes = non-terminals' : i < 3 + nl ? 'in-order traversal' : 'evaluation order'}</small><span className="cv4-form">${i < 3 ? '' : i < 3 + nl ? read : i === 3 + nl ? '(id + id) first' : '(id + id) * id'}</span></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${SBar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [5.3] slide 13: two leftmost derivations of id-id+id ───────── */
  const G13 = parseG('E → E+E | E-E | id'), A13 = allLmd(G13, tok('id-id+id')).trees, O13 = A13.map(T => order(T, 'L'));
  function AmbigTrees({ ar }) {
    const n = O13[0].length;
    const steps = [{ en: 'Slide 13: <b>E → E + E | E – E | id</b>. Derive <b>id-id+id</b> leftmost, two ways side by side.', ar: 'الـ slide 13 فيها الـ grammar دي، وهنعمل leftmost derivation للـ string <bdi>id-id+id</bdi> بطريقتين جنب بعض:' + L('E → E + E | E – E | id') }];
    for (let k = 1; k < n; k++) {
      const f1 = fstr(A13[0], O13[0][k].form), f2 = fstr(A13[1], O13[1][k].form);
      steps.push(k === 1 ? { en: 'The first step already differs: LMD 1 uses <b>E → E+E</b> (root +), LMD 2 uses <b>E → E-E</b> (root -).', ar: 'من أول خطوة الاتنين مختلفين: الـ LMD 1 بيستخدم <bdi>E → E+E</bdi> (الـ root هو +)، والـ LMD 2 بيستخدم <bdi>E → E-E</bdi> (الـ root هو -).' }
        : { en: `Step ${k}: each replaces its leftmost E. LMD 1 ⇒ <b>${f1}</b>, LMD 2 ⇒ <b>${f2}</b>.`, ar: `في الخطوة <bdi>${k}</bdi> كل واحد بيبدّل الـ E اللي على أقصى الشمال:` + L(`LMD 1 ⇒ ${f1}<br>LMD 2 ⇒ ${f2}`) });
    }
    steps.push({ en: 'Same string, <b>two different leftmost derivations</b> and two parse trees (root + with id-id below it, root - with id+id below it): the grammar is <b>ambiguous</b>.', ar: 'نفس الـ string ليها <b>اتنين leftmost derivations مختلفين</b> واتنين parse trees (واحدة الـ root بتاعها + وتحتها id-id، والتانية الـ root بتاعها - وتحتها id+id)، يبقى الـ grammar دي <b>ambiguous</b>.' });
    const [i, ctl] = useSteps(steps.length, 2300), k = Math.min(i, n - 1);
    const pan = (T, O, t) => { const vis = grown(T, O, k), hi = k && i < n ? new Set([O[k].n, ...T.N[O[k].n].kids]) : i >= n ? new Set([T.root]) : NONE;
      return html`<div className="cv4-pan"><b>${t}</b><ol className="cv4-lst">${O.map((o, j) => html`<li key=${j} className=${j === k ? 'cur' : j > k ? 'fut' : ''}>${j ? '⇒ ' : ''}${fstr(T, o.form)}</li>`)}</ol><${Tree} T=${T} vis=${id => vis.has(id)} hi=${hi} label=${t} /></div>`; };
    return html`<figure className="fig cv4"><div className="fig-stage"><div className="cv4-two">${pan(A13[0], O13[0], 'LMD 1 (root is +)')}${pan(A13[1], O13[1], 'LMD 2 (root is -)')}</div>
      <p className=${'cv4-verd amb ' + pop(i >= n)}>2 leftmost derivations → ambiguous</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [5.1] one leftmost + one rightmost derivation prove nothing ───────── */
  const G6 = parseG('E → E+T | T, T → T*F | F, F → (E) | id'), T6 = allLmd(G6, tok('id+id*id')).trees[0];
  function LmdRmd({ ar }) {
    const [dir, setDir] = useState('L'), O = React.useMemo(() => order(T6, dir), [dir]), n = O.length, Ld = dir === 'L';
    const [i, ctl] = useWalk(n, 1500, dir);
    let en, a;
    if (i === 0) { en = `The sheets' unambiguous grammar <b>E → E+T | T, T → T*F | F, F → (E) | id</b> and the string <b>id+id*id</b>. Derive it ${Ld ? 'leftmost' : 'rightmost'}.`; a = `دي الـ grammar الـ unambiguous بتاعة الشيتات، والـ string هي <bdi>id+id*id</bdi>. هنعمل ${Ld ? 'leftmost' : 'rightmost'} derivation:` + L('E → E+T | T, T → T*F | F, F → (E) | id'); }
    else { const r = rule(T6, O[i].n), f = fstr(T6, O[i].form); en = `Replace the ${Ld ? 'leftmost' : 'rightmost'} non-terminal with <b>${r}</b>: <b>${f}</b>.`; a = `بنبدّل الـ non-terminal اللي على أقصى ${Ld ? 'الشمال' : 'اليمين'}:` + L(`${r} &nbsp;⇒&nbsp; ${f}`); }
    if (i === n - 1) { en += ' The leftmost and the rightmost derivations look different, yet they build <b>the same single tree</b>. One leftmost plus one rightmost derivation does NOT prove ambiguity: you need two different leftmost (or two rightmost) ones.'; a += 'الـ leftmost والـ rightmost شكلهم مختلف، لكن الاتنين بيبنوا <b>نفس الـ tree الوحيدة</b>. يعني leftmost واحد و rightmost واحد مش بيثبتوا الـ ambiguity؛ لازم اتنين leftmost مختلفين (أو اتنين rightmost).'; }
    const vis = grown(T6, O, i), hi = i ? new Set([O[i].n, ...T6.N[O[i].n].kids]) : NONE;
    return html`<figure className="fig cv4"><div className="fig-stage">
      <${Modes} list=${[['L', 'Leftmost'], ['R', 'Rightmost']]} mode=${dir} set=${setDir} />
      <div className="cv4-hist">${O.map((o, j) => html`<span key=${j} style=${{ opacity: j > i ? .25 : 1, color: j === i ? 'var(--k-compiler)' : '' }}>${j ? ' ⇒ ' : ''}${fstr(T6, o.form)}</span>`)}</div>
      <${Tree} T=${T6} vis=${id => vis.has(id)} hi=${hi} label="The only parse tree of id+id*id" /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${SBar} steps=${O} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [6] the sheets' ambiguity proofs: every leftmost derivation of a string ───────── */
  const AMB = [
    { g: 'S → 0A | 1B\nA → 0AA | 1S | 1\nB → 1BB | 0S | 0', s: '001101' },
    { g: 'S → Ab | aaB\nA → a | Aa\nB → b', s: 'aab', flip: 1 },
    { g: 'S → AB | C\nA → aAb | ab\nB → cBd | cd\nC → aCd | aDd\nD → bDc | bc', s: 'aabbccdd' },
    { g: 'E → E+T | T\nT → T*F | F\nF → (E) | id', s: 'id+id*id' },
    { g: 'S → AB\nA → AA | a\nB → Tc\nT → aT | a', s: 'aaac' }];
  function AmbigFinder({ ar }) {
    const [p, setP] = useState(0), [own, setOwn] = useState(false), [g, setG] = useState(AMB[0].g), [s, setS] = useState(AMB[0].s), [k, setK] = useState(0);
    const pick = j => { setP(j); setOwn(false); setG(AMB[j].g); setS(AMB[j].s); setK(0); };
    const R = React.useMemo(() => { const G = parseG(g); if (G.err) return { err: G.err }; const r = allLmd(G, tok(s), 6); if (!own && AMB[p].flip) r.trees.reverse(); return r; }, [g, s]);
    const m = R.trees ? R.trees.length : 0, kk = Math.min(k, Math.max(0, m - 1)), T = m ? R.trees[kk] : null, O = T ? order(T, 'L') : null;
    let en, a;
    if (R.err) { en = 'Grammar: ' + esc(R.err) + '.'; a = 'فيه مشكلة في الـ grammar:' + L(esc(R.err)); }
    else if (!m) { en = R.cut ? 'The search stopped early: try a shorter string.' : `No leftmost derivation: <b>${esc(s)}</b> is not in the language of this grammar.`; a = R.cut ? 'البحث وقف بدري، جرّب string أقصر.' : `مفيش leftmost derivation، يعني الـ string <bdi>${esc(s)}</bdi> مش من الـ language بتاعة الـ grammar دي.`; }
    else if (m === 1) { en = `Exactly <b>one</b> leftmost derivation (one parse tree) for <b>${esc(s)}</b>${R.cut ? ' found before the search stopped' : ''}. If only one leftmost tree exists for every sentence, the grammar is unambiguous.`; a = `فيه leftmost derivation <b>واحد بس</b> (parse tree واحدة) للـ string <bdi>${esc(s)}</bdi>. ولو كل sentence ليها leftmost tree واحدة بس، تبقى الـ grammar دي unambiguous.`; }
    else { en = `<b>${m === 6 ? 'At least 6' : m}</b> different leftmost derivations, so ${m === 6 ? 'at least 6' : m} parse trees, for <b>${esc(s)}</b>: the grammar is <b>ambiguous</b>. Switch between them below.`; a = `لقينا <bdi>${m === 6 ? '6+' : m}</bdi> leftmost derivations مختلفين، يعني نفس العدد من الـ parse trees، للـ string <bdi>${esc(s)}</bdi>، يبقى الـ grammar <b>ambiguous</b>. بدّل بينهم تحت.`; }
    return html`<figure className="fig cv4"><div className="fig-stage">
      <div className="cv4-modes" role="group">${AMB.map((x, j) => html`<button key=${j} className="fig-btn" style=${{ fontFamily: 'var(--mono)' }} aria-pressed=${String(!own && p === j)} onClick=${() => pick(j)}>${x.s}</button>`)}<button className="fig-btn" aria-pressed=${String(own)} onClick=${() => setOwn(true)}>Try your own</button></div>
      ${own ? html`<div style=${{ display: 'grid', gap: '6px', maxWidth: '360px', margin: '0 auto 8px' }}><textarea className="cv4-in" value=${g} onInput=${e => { setG(e.target.value); setK(0); }} aria-label="Grammar, one rule per line" spellCheck="false" autoCapitalize="off"></textarea>
        <label className="cv4-lbl">string <input className="cv4-in" value=${s} onInput=${e => { setS(e.target.value); setK(0); }} spellCheck="false" autoCapitalize="off" style=${{ maxWidth: '200px' }} /></label></div>`
        : html`<div className="cv4-gram">${g.split('\n').map((l, j) => html`<div key=${j}>${l}</div>`)}<small>string <b style=${{ fontFamily: 'var(--mono)' }}>${s}</b></small></div>`}
      ${m > 1 && html`<div className="cv4-modes" role="group">${R.trees.map((_, j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(kk === j)} onClick=${() => setK(j)}>LMD ${j + 1}</button>`)}</div>`}
      ${T && html`<div className="cv4-hist">${O.map((o, j) => html`<span key=${j}>${j ? ' ⇒ ' : ''}${fstr(T, o.form)}</span>`)}</div><${Tree} key=${g + s + kk} T=${T} label=${'Parse tree ' + (kk + 1)} />`}
      <p className=${'cv4-verd ' + (m > 1 ? 'amb' : m === 1 ? 'one' : '')}>${R.err ? '' : m > 1 ? (m === 6 ? '6+' : m) + ' leftmost derivations → ambiguous' : m === 1 ? 'one leftmost derivation for this string' : 'not derivable'}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ───────── [7.1] why left recursion loops a top-down parser (A → Ab | c, from the quiz) ───────── */
  const LOOP = 6;
  const loopTree = (() => { const N = {}; let c = 0; const mk = (s, p) => { const id = 'n' + c++; N[id] = { s, kids: [], p }; if (p != null) N[p].kids.push(id); return id; };
    let cur = mk('A', null); const root = cur, chain = [cur]; for (let k = 0; k < LOOP; k++) { const a = mk('A', cur); mk('b', cur); cur = a; chain.push(a); } return { T: { N, root }, chain }; })();
  function rightTree(w) { const N = {}; let c = 0; const mk = (s, p, eps) => { const id = 'n' + c++; N[id] = { s, kids: [], p, eps: !!eps }; if (p != null) N[p].kids.push(id); return id; };
    const root = mk('A', null), ex = [root]; mk('c', root); let cur = mk("A'", root);
    for (let k = 1; k < w.length; k++) { ex.push(cur); mk('b', cur); cur = mk("A'", cur); } ex.push(cur); mk('ε', cur, 1); return { T: { N, root }, ex }; }
  function LrLoop({ ar }) {
    const [dir, setDir] = useState('L'), [w, setW] = useState('cbb');
    const ok = /^cb*$/.test(w), Ld = dir === 'L';
    const R = React.useMemo(() => ok ? rightTree(w) : null, [w]);
    const n = Ld ? LOOP + 2 : ok ? R.ex.length + 2 : 1, [i, ctl] = useWalk(n, 1500, dir + w);
    let T, vis, hi = NONE, form, eat = 0, en, a;
    if (Ld) { T = loopTree.T; const d = Math.min(i, LOOP); vis = new Set(); loopTree.chain.slice(0, d + 1).forEach((id, k) => { vis.add(id); if (k < d) T.N[id].kids.forEach(c => vis.add(c)); });
      form = 'A' + 'b'.repeat(d); if (i && i <= LOOP) hi = new Set([loopTree.chain[d - 1], ...T.N[loopTree.chain[d - 1]].kids]);
      if (i === 0) { en = `Grammar <b>A → Ab | c</b> is left-recursive. A top-down parser gets the input <b>${esc(w)}</b> and starts from the start symbol A.`; a = 'الـ grammar دي left-recursive. الـ top-down parser بياخد الـ input ده ويبدأ من الـ start symbol اللي هو A:' + L('A → Ab | c &nbsp;&nbsp; input: ' + esc(w)); }
      else if (i <= LOOP) { en = `Expand the left A with <b>A → Ab</b>: <b>${form}</b>. The leftmost symbol is A again, so no input can be matched.`; a = 'بنعمل expand للـ A اللي على الشمال، والـ leftmost symbol بيرجع A تاني، فمفيش ولا input بيتعمله match:' + L('A → Ab &nbsp;⇒&nbsp; ' + form); }
      else { en = 'It cannot judge when to stop expanding the left A, so it goes into an <b>infinite loop</b>, never moving along the input. That is why LL(1) cannot be applied to a left-recursive grammar.'; a = 'مايعرفش يحدد إمتى يبطّل expand للـ A اللي على الشمال، فبيدخل في <b>infinite loop</b> ومابيتحركش في الـ input خالص. عشان كده الـ LL(1) مينفعش يتطبّق على left-recursive grammar.'; } }
    else if (!ok) { en = `<b>${esc(w)}</b> is not generated by A → Ab | c (its strings are c followed by b's). Type c, cb, cbb, …`; a = 'الـ string دي مش من الـ grammar دي، لأن الـ strings بتاعتها c وبعدها b كذا مرة. اكتب حاجة زي:' + L('c, cb, cbb, …'); }
    else { T = R.T; const d = Math.min(i, R.ex.length); vis = new Set([T.root]); R.ex.slice(0, d).forEach(id => T.N[id].kids.forEach(c => vis.add(c)));
      const f = [T.root]; let fo = f; for (let k = 0; k < d; k++) { const id = R.ex[k]; const j = fo.indexOf(id); fo = fo.slice(0, j).concat(T.N[id].kids.filter(c => !T.N[c].eps), fo.slice(j + 1)); }
      form = fstr(T, fo); eat = Math.min(d, w.length); if (d) hi = new Set([R.ex[d - 1], ...T.N[R.ex[d - 1]].kids]);
      if (i === 0) { en = "After removing the left recursion (A → Aα | β with α = b, β = c): <b>A → cA', A' → bA' | ε</b>. Same input."; a = 'بعد ما شيلنا الـ left recursion (هنا α هي b و β هي c) الـ grammar بقت كده، ونفس الـ input:' + L("A → cA' , A' → bA' | ε"); }
      else if (i === 1) { en = "Expand A → cA': the <b>c</b> is matched at once."; a = 'بنعمل expand بالـ production دي، والـ c بيتعمله match على طول:' + L("A → cA'"); }
      else if (i < R.ex.length) { en = "Next input is <b>b</b>: A' → bA' matches it; the parser moves forward."; a = 'الـ input اللي جاي b، فالـ production دي بتعمله match والـ parser بيتقدّم:' + L("A' → bA'"); }
      else if (i === R.ex.length) { en = "No input left: <b>A' → ε</b> ends the derivation."; a = 'مفيش input فاضل، فالـ production دي بتنهي الـ derivation:' + L("A' → ε"); }
      else { en = `Done: <b>${esc(w)}</b> parsed in ${R.ex.length} expansions, each one matching input. No loop.`; a = `خلصنا: الـ string <bdi>${esc(w)}</bdi> اتعملها parse في <bdi>${R.ex.length}</bdi> expansions، وكل واحدة عملت match لـ input. مفيش loop.`; } }
    return html`<figure className="fig cv4"><div className="fig-stage">
      <${Modes} list=${[['L', 'A → Ab | c'], ['R', "A → cA', A' → bA' | ε"]]} mode=${dir} set=${setDir} />
      <div className="cv4-row"><label className="cv4-lbl">input <input className="cv4-in" value=${w} onInput=${e => setW(e.target.value.trim())} spellCheck="false" autoCapitalize="off" style=${{ maxWidth: '150px' }} /></label></div>
      <div className="cv4-tape" aria-label="Input">${w.split('').map((ch, k) => html`<span key=${k} className=${k < eat ? 'dn' : k === eat ? 'nx' : ''}>${ch}</span>`)}</div>
      ${T && html`<div className="cv4-cur"><small>sentential form</small><span className="cv4-form">${form}${Ld && i > LOOP ? ' …' : ''}</span></div>`}
      ${Ld && html`<p className=${'cv4-loop ' + pop(i > LOOP)}>∞ infinite loop</p>`}
      ${T && html`<${Tree} key=${dir + w} T=${T} vis=${id => vis.has(id)} hi=${hi} label="Parse tree" />`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${T && html`<${Bar} steps=${Array(n).fill(0)} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ───────── [7.2] slide 15: immediate and indirect left recursion ───────── */
  function LrKinds({ ar }) {
    const steps = [
      { en: 'Slide 15: (1) <b>A → Aα | β</b> and (2) <b>S → Aα | β</b> with <b>A ⇒ Sd</b>.', ar: 'الـ slide 15 فيها مثالين:' + L('(1) A → Aα | β<br>(2) S → Aα | β , A ⇒ Sd') },
      { en: '(1) One step: <b>A ⇒ Aα</b>. A is the left-most symbol of its own derivation right away: <b>immediate left recursion</b>.', ar: 'في (1) بخطوة واحدة الـ A بيرجع أول symbol على الشمال في الـ derivation بتاعه، وده <b>immediate left recursion</b>:' + L('A ⇒ Aα') },
      { en: '(2) First step: <b>S ⇒ Aα</b>. S is gone from the left for now…', ar: 'في (2) أول خطوة الـ S بيختفي من الشمال مؤقتاً:' + L('S ⇒ Aα') },
      { en: '…then A ⇒ Sd gives <b>S ⇒ Aα ⇒ Sdα</b>: S is the left-most symbol again, through A. That is <b>indirect left recursion</b>.', ar: 'وبعدين الـ A بيدّي Sd، فالـ S بيرجع أول symbol على الشمال عن طريق الـ A، وده <b>indirect left recursion</b>:' + L('S ⇒ Aα ⇒ Sdα') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const ch = (xs, lm) => html`<span className="cv4-form">${xs.map((s, k) => html`<span key=${k} className=${k === 0 && lm ? 'lm' : ''}>${s}</span>`)}</span>`;
    return html`<figure className="fig cv4"><div className="fig-stage"><div className="cv4-two">
      <div className=${'cv4-pan' + (i === 1 ? ' on' : '')}><b>(1) immediate</b><div className="cv4-gram">A → Aα | β</div>
        <div className="cv4-chain">${ch(['A'], i >= 1)}${i >= 1 && html`<span className="ar">⇒</span>`}${i >= 1 && ch(['A', 'α'], true)}</div></div>
      <div className="cv4-pan"><b>(2) indirect</b><div className="cv4-gram">S → Aα | β, A ⇒ Sd</div>
        <div className="cv4-chain">${ch(['S'], i >= 3)}${i >= 2 && html`<span className="ar">⇒</span>`}${i >= 2 && ch(['A', 'α'], false)}${i >= 3 && html`<span className="ar">⇒</span>`}${i >= 3 && ch(['S', 'd', 'α'], true)}</div></div>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [8] slides 16–17: removing immediate left recursion, A → Aα | β ⇒ A → βA', A' → αA' | ε ───────── */
  const LRX = ['A → Aα | β', 'E → E+T | T', 'A → ABα | Aa | a', 'A → aB | Ad', 'A → Abc | b'];
  function lrSplit(line) {
    const m = String(line).split(/->|→/); if (m.length !== 2) return { err: 'Type one rule with an arrow, like A → Ab | c' };
    const h = tok(m[0]); if (h.length !== 1 || !isN(h[0])) return { err: 'The left side must be one non-terminal' };
    const A = h[0], alts = m[1].split('|').map(x => tok(x).filter(s => s !== 'ε')), Ap = A + "'";
    const al = alts.filter(x => x[0] === A).map(x => x.slice(1)), be = alts.filter(x => x[0] !== A);
    if (!al.length) return { A, alts, err: `No alternative starts with ${A}: it is not immediately left-recursive` };
    if (al.some(x => !x.length)) return { A, alts, err: `${A} → ${A} is a cycle, not covered by the rule` };
    if (!be.length) return { A, alts, err: `Every alternative starts with ${A}: there is no β, so the rule derives no string` };
    const lhs = A + ' → ' + be.map(b => cat(b.concat(Ap))).join(' | '), rhs = Ap + ' → ' + al.map(x => cat(x.concat(Ap))).join(' | ') + ' | ε';
    // strings of up to 5 symbols from each grammar (only A and A' are expanded)
    const gen = (P, start) => { const out = new Set(), q = [[start]]; let w = 0; while (q.length && w++ < 4000) { const f = q.shift(), k = f.findIndex(s => P[s]); if (k < 0) { out.add(cat(f)); continue; } if (f.filter(s => !P[s]).length > 5) continue; P[f[k]].forEach(r => q.push(f.slice(0, k).concat(r, f.slice(k + 1)))); }
      return [...out].filter(s => s.length).sort((x, y) => x.length - y.length || (x < y ? -1 : 1)); };
    const g1 = gen({ [A]: alts }, A), g2 = gen({ [A]: be.map(b => b.concat(Ap)), [Ap]: al.map(x => x.concat(Ap)).concat([[]]) }, A);
    const s1 = g1.filter(s => tok(s).length <= 5), s2 = g2.filter(s => tok(s).length <= 5);
    return { A, Ap, alts, al, be, lhs, rhs, same: s1.length === s2.length && s1.every(s => s2.includes(s)), list: s1.slice(0, 5) };
  }
  function LrRemove({ ar }) {
    const [p, setP] = useState(1), [own, setOwn] = useState(false), [txt, setTxt] = useState(LRX[1]);
    const R = React.useMemo(() => lrSplit(txt), [txt]), bad = !!R.err;
    const [i, ctl] = useWalk(bad ? 1 : 5, 2400, txt + own), steps = Array(bad ? 1 : 5).fill(0);
    const pick = j => { setP(j); setOwn(false); setTxt(LRX[j]); };
    let en, a;
    if (bad) { en = esc(R.err) + '.'; a = 'الـ rule دي مش هتنفع هنا:' + L(esc(R.err)); }
    else { const A = R.A, Ap = R.Ap, als = R.al.map(x => cat(x)).join(', '), bes = R.be.map(x => cat(x)).join(', ');
      if (i === 0) { en = `For each rule with a left-recursive option, <b>A → Aα | β</b>, introduce a new non-terminal A'. Here: <b>${esc(txt)}</b>.`; a = "لكل rule فيها اختيار left-recursive بالشكل ده بنضيف non-terminal جديد اسمه A'. والـ rule هنا:" + L('A → Aα | β &nbsp;&nbsp;&nbsp; ' + esc(txt)); }
      else if (i === 1) { en = `Split the alternatives: those starting with <b>${A}</b> give α = <b>${als}</b>; the others give β = <b>${bes}</b>.` + (R.al.length > 1 ? ' Slide 17 does each left-recursive option separately and merges the A\' rules: the same result.' : ''); a = `بنقسم الاختيارات: اللي بيبدأ بالـ <bdi>${A}</bdi> بيدّينا الـ α، والباقي بيدّينا الـ β:` + L(`α = ${als} &nbsp;&nbsp; β = ${bes}`) + (R.al.length > 1 ? "والـ slide 17 بتعمل كل اختيار left-recursive لوحده وبعدين تجمع الـ A' rules، ونفس النتيجة." : ''); }
      else if (i === 2) { en = `Each β is followed by the new non-terminal: <b>${R.lhs}</b>.`; a = 'كل β بييجي بعدها الـ non-terminal الجديد:' + L(R.lhs); }
      else if (i === 3) { en = `${Ap} produces each α again and again, or ε to stop: <b>${R.rhs}</b>. No alternative starts with its own left side any more.`; a = `الـ <bdi>${Ap}</bdi> بيطلّع كل α مرة ورا مرة، أو ε عشان يقف. ومفيش اختيار بقى بيبدأ بالـ left side بتاعه:` + L(R.rhs); }
      else { en = `Both grammars derive the same strings (checked up to 5 symbols): <b>${R.list.join(', ')}</b>, … ${R.same ? '' : '(mismatch!)'}`; a = 'الـ grammar القديمة والجديدة بيطلّعوا نفس الـ strings (اتشيّكنا على كل الـ strings اللي طولها لحد خمس symbols):' + L(R.list.join(', ') + ', …'); } }
    return html`<figure className="fig cv4"><div className="fig-stage">
      <div className="cv4-modes" role="group">${LRX.map((x, j) => html`<button key=${j} className="fig-btn" style=${{ fontFamily: 'var(--mono)' }} aria-pressed=${String(!own && p === j)} onClick=${() => pick(j)}>${x}</button>`)}<button className="fig-btn" aria-pressed=${String(own)} onClick=${() => setOwn(true)}>Try your own</button></div>
      ${own && html`<div className="cv4-row"><input className="cv4-in" value=${txt} onInput=${e => setTxt(e.target.value)} aria-label="One rule, like A → Ab | c" spellCheck="false" autoCapitalize="off" /></div>`}
      <div className="cv4-gram" style=${{ fontSize: '1.1rem' }}>${txt}</div>
      ${!bad && html`<div className="cv4-alts">${R.alts.map((x, j) => { const isA = x[0] === R.A; return html`<span key=${j} className=${'cv4-alt' + (i >= 1 ? (isA ? ' al' : ' be') : '')}>${cat(x)}${i >= 1 && html`<small>${isA ? 'α = ' + cat(x.slice(1)) : 'β'}</small>`}</span>`; })}</div>
        <div className="cv4-res"><div style=${{ opacity: i >= 2 ? 1 : 0 }}>${R.lhs}</div><div style=${{ opacity: i >= 3 ? 1 : 0 }}>${R.rhs}</div></div>
        <p className=${'cv4-same ' + pop(i >= 4)}>${R.same ? html`<span className="cv4-ok">✓ same strings: </span>` : html`<span className="cv4-err">✗ </span>`}<span>${R.list.join(', ')}, …</span></p>`}
      ${bad && html`<p className="cv4-err">${R.err}</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-parse-pipeline': Pipeline,
    'cc-cfg-parts': CfgParts,
    'cc-cfg-derive': CfgDerive,
    'cc-top-bottom': TopBottom,
    'cc-int-derive': IntDerive,
    'cc-lm-tree': LmTree,
    'cc-tree-parts': TreeParts,
    'cc-lmd-rmd': LmdRmd,
    'cc-ambig-trees': AmbigTrees,
    'cc-ambig-finder': AmbigFinder,
    'cc-lr-loop': LrLoop,
    'cc-lr-kinds': LrKinds,
    'cc-lr-remove': LrRemove,
  });
})();
/* ── part L6 ── */
// Compiler Design visuals, Lecture 6 (LL(1) Parsing: FIRST, FOLLOW and Predictive Parsing Tables): choosing a production by FIRST, FOLLOW in a sentential form, FIRST and FOLLOW rule by rule, the LL(1) letters and conditions, the parser's moves, left-recursion removal, the table M filled cell by cell and the stack/input/action trace (slides 2-9 and the notes' exam and Q&A grammars). Every label and number comes from the site's notes or is computed with the lecture's rules.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.cv6{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cv6 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cv6-pick{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.cv6-pick .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.cv6 .fig-btn.cv6-on{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv6-own{ display:grid; gap:6px; max-width:460px; margin:0 auto 10px; }
.cv6-own textarea, .cv6-own input{ font:16px/1.4 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; width:100%; box-sizing:border-box; }
.cv6-own label{ display:grid; gap:2px; font-size:.85rem; color:var(--graphite); }
.cv6-own .fig-btn{ justify-self:start; }
.cv6-hint{ font-size:.8rem; color:var(--graphite); margin:0; line-height:1.4; }
.cv6-err{ color:var(--pen); font-weight:600; text-align:center; font-size:.9rem; margin:6px 0; overflow-wrap:anywhere; }
.cv6-g{ font:600 .95rem/1.6 var(--mono); max-width:420px; margin:0 auto 8px; color:var(--ink); }
.cv6-g > div{ padding:0 6px; }
.cv6-g .nt{ color:var(--k-compiler); }
.cv6-g .alt{ border-radius:4px; padding:0 2px; transition:background .3s; }
.cv6-g .alt.on{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); }
.cv6-g .hit{ color:var(--pen); text-decoration:underline; text-decoration-thickness:2px; }
.cv6-g .beta{ background:color-mix(in srgb, var(--ok) 24%, transparent); border-radius:3px; }
.cv6-tw{ max-width:100%; overflow-x:auto; margin:8px auto 0; }
.cv6-tb{ border-collapse:collapse; margin:0 auto; font-size:.86rem; color:var(--ink); }
.cv6-tb caption{ caption-side:top; font-size:.85rem; font-weight:700; color:var(--graphite); padding-bottom:4px; }
.cv6-tb th, .cv6-tb td{ border:1px solid var(--line); padding:3px 5px; text-align:center; white-space:nowrap; background:var(--paper); transition:background .35s; }
.cv6-tb thead th{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.cv6-tb td{ font-family:var(--mono); }
.cv6-tb .cur{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); font-weight:700; }
.cv6-tb .src{ box-shadow:inset 0 0 0 2px var(--k-compiler); }
.cv6-tb .bad{ background:color-mix(in srgb, var(--pen) 24%, var(--paper)); }
.cv6-tb .new{ color:var(--pen); font-weight:800; }
.cv6-tb .fad{ color:var(--graphite); font-weight:400; }
.cv6-m td{ min-width:1.7em; font-size:.8rem; padding:3px 3px; }
.cv6-m td div + div{ border-top:1px dashed var(--pen); }
@media (max-width:520px){ .cv6-lhs{ display:none; } }
.cv6-key{ font-size:.82rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.cv6-calc{ display:block; font-family:var(--mono); font-size:.88rem; margin-top:2px; overflow-wrap:anywhere; }
.cv6-cnt{ font-size:.85rem; color:var(--graphite); }
.cv6-tape{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; align-items:center; margin:4px 0 8px; }
.cv6-sym{ display:inline-grid; place-items:center; min-width:30px; height:32px; padding:0 5px; border-radius:6px; border:1px solid var(--line); background:var(--paper); color:var(--ink); font:600 1rem var(--mono); transition:background .3s, color .3s, box-shadow .3s; box-sizing:border-box; }
.cv6-sym.done{ background:var(--fig-s); color:#fff; border-color:transparent; }
.cv6-sym.look{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv6-sym.hi{ box-shadow:0 0 0 2px var(--pen); color:var(--pen); }
.cv6-sym.ok{ box-shadow:0 0 0 2px var(--ok); color:var(--ok); }
.cv6-sym.end{ border-style:dashed; }
.cv6-sym.nt{ color:var(--k-compiler); }
.cv6-sym.new{ animation:cv6in .45s ease both; }
@keyframes cv6in{ from{ opacity:0; transform:translateY(-8px); } to{ opacity:1; transform:none; } }
.cv6-badges{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:0 0 10px; }
.cv6-badges span{ border:1px solid var(--line); border-radius:10px; padding:4px 8px; font-size:.84rem; background:var(--paper); color:var(--ink); }
.cv6-badges b{ color:var(--k-compiler); font-size:1.05rem; margin-right:4px; }
.cv6-der{ font:600 .95rem/1.7 var(--mono); text-align:center; color:var(--ink); overflow-wrap:anywhere; }
.cv6-der .lm{ color:var(--pen); text-decoration:underline; }
.cv6-der .fad{ color:var(--graphite); font-weight:400; }
.cv6-lbl{ font-size:.82rem; color:var(--graphite); text-align:center; margin:0 0 2px; }
.cv6-alts{ display:grid; grid-template-columns:1fr 1fr; gap:8px; max-width:420px; margin:0 auto 10px; }
.cv6-alt{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; text-align:center; transition:box-shadow .3s, opacity .3s; color:var(--ink); }
.cv6-alt b{ display:block; font-family:var(--mono); font-size:1rem; }
.cv6-alt span{ font-family:var(--mono); font-size:.88rem; color:var(--graphite); }
.cv6-alt.on{ box-shadow:0 0 0 2px var(--ok); }
.cv6-alt.clash{ box-shadow:0 0 0 2px var(--pen); }
.cv6-alt.dim{ opacity:.5; }
.cv6-sets{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:8px; }
.cv6-sets span{ border:1px solid var(--line); border-radius:99px; padding:3px 10px; font:600 .9rem var(--mono); background:var(--paper); color:var(--ink); }
.cv6-mv{ display:grid; grid-template-columns:76px 1fr; gap:10px; max-width:460px; margin:0 auto; align-items:start; }
.cv6-stk{ display:flex; flex-direction:column; gap:4px; align-items:center; border:1px solid var(--line); border-top:0; border-radius:0 0 10px 10px; padding:6px 4px; min-height:150px; justify-content:flex-start; background:var(--paper); }
.cv6-stk .cv6-sym{ width:56px; }
.cv6-case{ display:grid; gap:4px; margin-top:8px; }
.cv6-case div{ border:1px solid var(--line); border-radius:8px; padding:4px 8px; font-size:.82rem; line-height:1.35; background:var(--paper); color:var(--ink); opacity:.5; transition:opacity .3s, box-shadow .3s; }
.cv6-case div.on{ opacity:1; box-shadow:0 0 0 2px var(--k-compiler); }
.cv6-case div.on.e{ box-shadow:0 0 0 2px var(--pen); }
.cv6-look{ font:600 .9rem var(--mono); text-align:center; color:var(--ink); min-height:1.4em; overflow-wrap:anywhere; }
.cv6-rw{ max-width:420px; margin:0 auto; display:grid; gap:8px; }
.cv6-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font:600 .98rem/1.6 var(--mono); color:var(--ink); }
.cv6-box small{ display:block; font:700 .78rem var(--body); color:var(--graphite); letter-spacing:.04em; }
.cv6-a{ color:var(--pen); } .cv6-b{ color:var(--k-compiler); }
.cv6-ck{ display:grid; gap:8px; max-width:460px; margin:0 auto; }
.cv6-ck > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font-size:.84rem; line-height:1.45; color:var(--ink); }
.cv6-ck .hd{ font:700 .95rem var(--mono); margin-bottom:2px; }
.cv6-ck .r{ display:grid; grid-template-columns:1.4em 1fr; gap:4px; overflow-wrap:anywhere; }
.cv6-ck .y{ color:var(--ok); font-weight:800; } .cv6-ck .n{ color:var(--pen); font-weight:800; }
.cv6-ck .m{ font-family:var(--mono); }
.cv6-verd{ text-align:center; font-weight:700; margin-top:8px; font-size:.95rem; }
.cv6-verd.y{ color:var(--ok); } .cv6-verd.n{ color:var(--pen); }
.cv6-tree{ display:block; width:100%; height:auto; margin:10px auto 0; }
.cv6-tree line{ stroke:var(--graphite); stroke-width:1.5; }
.cv6-tree text{ font-family:var(--mono); font-weight:600; }
.cv6-tree text.nt{ fill:var(--k-compiler); }
.cv6-tree text.hit{ fill:var(--ok); font-weight:800; }
.cv6-tree text.top{ fill:var(--pen); font-weight:800; }
.cv6-tree text.eps{ fill:var(--graphite); }
.cv6-tr td{ text-align:left; }
.cv6-tr tr.cur td{ background:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); font-weight:700; }
@media (prefers-reduced-motion: reduce){ .cv6-sym, .cv6-tb th, .cv6-tb td, .cv6-alt, .cv6-case div, .cv6-g .alt{ transition:none; } .cv6-sym.new{ animation:none; } }`;
  if (!document.getElementById('cv6-css')) { const s = document.createElement('style'); s.id = 'cv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  const EPS = 'ε';
  const L = x => `<span class="ltr">${x}</span>`, bd = x => `<bdi>${x}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const uniq = a => a.filter((x, i) => a.indexOf(x) === i);
  const seq = r => r.length ? r.join('') : EPS;
  const set = a => '{' + a.join(', ') + '}';
  const prodS = p => `${p.A} → ${seq(p.rhs)}`;

  /* ── the lecture's grammars ── */
  const GR = {
    ex1: { name: 'Example 1', text: "S -> A\nA -> aBA'\nA' -> dA' | ε\nB -> b\nC -> g", ts: ['a', 'b', 'd', 'g'], nts: ['S', 'A', "A'", 'B', 'C'], w: 'abd' },
    ex1lr: { name: 'Example 1 (left-recursive)', text: 'S -> A\nA -> aB | Ad\nB -> b\nC -> g', ts: ['a', 'b', 'd', 'g'], w: 'abd' },
    ex2: { name: 'Example 2', text: "E -> TE'\nE' -> +TE' | ε\nT -> FT'\nT' -> *FT' | ε\nF -> (E) | id", ts: ['id', '+', '*', '(', ')'], nts: ['E', "E'", 'T', "T'", 'F'], w: 'id+id*id', sortW: true },
    exam: { name: 'Exam grammar', text: 'S -> UVW\nU -> (S) | aSb | d\nV -> aV | ε\nW -> cW | ε', ts: ['(', 'a', 'd', 'c', 'b', ')'], nts: ['S', 'U', 'V', 'W'], w: '(dc)ac' },
    qa: { name: 'Q&A grammar', text: "S -> aABe\nA -> bA'\nA' -> bcA' | ε\nB -> d", ts: ['a', 'b', 'c', 'd', 'e'], nts: ['S', 'A', "A'", 'B'], w: 'abbcde' },
  };

  /* ── grammar engine: parse, FIRST / FOLLOW / table with the lecture's rules, traced ── */
  function tokens(s) {
    const out = []; let i = 0;
    while (i < s.length) {
      const r = s.slice(i); let m;
      if (/^\s/.test(r)) { i++; continue; }
      if ((m = r.match(/^[A-Z]'*/))) m = m[0]; else if (r.startsWith('id')) m = 'id'; else if (r.startsWith('ε')) m = 'ε'; else m = r[0];
      out.push(m); i += m.length;
    }
    return out.filter(t => t !== EPS);
  }
  function parseG(text) {
    const lines = text.split(/\n|;/).map(s => s.trim()).filter(Boolean);
    if (!lines.length) return { err: 'type at least one production, like S -> aS | b' };
    const raw = [];
    for (const ln of lines) {
      const m = ln.match(/^(\S+?)\s*(?:->|→)\s*(.*)$/);
      if (!m) return { err: `"${ln}" needs an arrow ->` };
      if (!/^[A-Z]'*$/.test(m[1])) return { err: `left side "${m[1]}" must be a capital letter (' allowed)` };
      raw.push([m[1], m[2]]);
    }
    const prods = [];
    for (const [A, r] of raw) for (const alt of r.split('|')) { const s = alt.trim(); prods.push({ A, rhs: (s === 'ε' || s === 'eps' || s === '') ? [] : tokens(s) }); }
    if (prods.length > 30) return { err: 'at most 30 productions' };
    const nts = uniq(raw.map(r => r[0]));
    const undef = uniq(prods.flatMap(p => p.rhs).filter(x => /^[A-Z]/.test(x) && !nts.includes(x)));
    if (undef.length) return { err: `${undef.join(', ')} has no production` };
    if (prods.some(p => p.rhs.includes('$'))) return { err: '$ is the end marker, not a grammar symbol' };
    return { prods, nts, start: nts[0] };
  }
  function analyze(text, tsOrd, ntOrd, sortW) {
    const G = parseG(text); if (G.err) return G;
    const NT = new Set(G.nts), isNT = s => NT.has(s);
    const nts = ntOrd && ntOrd.length === G.nts.length && ntOrd.every(x => NT.has(x)) ? ntOrd : G.nts;
    const tsAll = uniq(G.prods.flatMap(p => p.rhs).filter(s => !isNT(s))), o = tsOrd || [];
    const ts = o.filter(t => tsAll.includes(t)).concat(tsAll.filter(t => !o.includes(t)), '$');
    const fs = (sq, F) => { const out = []; for (const Y of sq) { const f = isNT(Y) ? F[Y] : [Y]; for (const t of f) if (t !== EPS && !out.includes(t)) out.push(t); if (!f.includes(EPS)) return out; } out.push(EPS); return out; };
    const snap = X => { const c = {}; for (const k in X) c[k] = X[k].slice(); return c; };
    // FIRST: productions ordered so the non-terminals others begin with come first, passes until nothing changes
    const nul = new Set(); let c = true;
    while (c) { c = false; for (const p of G.prods) if (!nul.has(p.A) && p.rhs.every(s => nul.has(s))) { nul.add(p.A); c = true; } }
    const seen = new Set(), ord = [];
    const visit = A => { if (seen.has(A)) return; seen.add(A); for (const p of G.prods.filter(q => q.A === A)) for (const Y of p.rhs) { if (!isNT(Y)) break; visit(Y); if (!nul.has(Y)) break; } ord.push(A); };
    nts.forEach(visit);
    const pOrd = ord.flatMap(A => G.prods.filter(p => p.A === A));
    const F = {}; nts.forEach(A => F[A] = []);
    const fst = [{ k: 'r1', F: snap(F) }]; let pass = 0, ch = true;
    while (ch && pass < 30) {
      pass++; ch = false;
      for (const p of pOrd) {
        const parts = []; let all = true;
        for (const Y of p.rhs) { const f = isNT(Y) ? F[Y] : [Y]; parts.push({ Y, f: f.filter(t => t !== EPS) }); if (!f.includes(EPS)) { all = false; break; } }
        const add = uniq(parts.flatMap(x => x.f).concat(all ? [EPS] : [])).filter(t => !F[p.A].includes(t));
        if (add.length) { F[p.A].push(...add); ch = true; fst.push({ k: 'p', p, parts, all, add, pass, F: snap(F) }); }
      }
    }
    fst.push({ k: 'done', pass, F: snap(F) });
    const Ff = F, fsq = sq => fs(sq, Ff);
    // FOLLOW: rule 1, then each non-terminal in turn, looking for it on the right sides; passes until nothing changes
    const W = {}; nts.forEach(A => W[A] = []); W[G.start].push('$');
    const wst = [{ k: 'r1', W: snap(W) }]; pass = 0; ch = true;
    while (ch && pass < 30) {
      pass++; ch = false;
      for (const B of nts) {
        const occ = []; G.prods.forEach(p => p.rhs.forEach((s, j) => { if (s === B) occ.push([p, j]); }));
        if (pass === 1 && !occ.length && B !== G.start) wst.push({ k: 'none', B, W: snap(W) });
        for (const [p, j] of occ) {
          const beta = p.rhs.slice(j + 1), fb = fsq(beta), r2 = fb.filter(t => t !== EPS), r3 = fb.includes(EPS) && p.A !== B;
          if (!r2.length && !r3) continue;
          const from = r3 ? W[p.A].slice() : [], add = uniq(r2.concat(from)).filter(t => !W[B].includes(t));
          if (add.length) { W[B].push(...add); ch = true; if (sortW) W[B].sort((x, y) => ts.indexOf(x) - ts.indexOf(y)); }
          if (add.length || pass === 1) wst.push({ k: 'o', B, p, j, beta, r2, r3, from, add, pass, W: snap(W) });
        }
      }
    }
    wst.push({ k: 'done', pass, W: snap(W) });
    // table M: each production by the two rules
    const M = {}; nts.forEach(A => { M[A] = {}; ts.forEach(t => M[A][t] = []); });
    const tst = [{ k: 'start' }];
    G.prods.forEach(p => {
      const f = fsq(p.rhs), r1 = f.filter(t => t !== EPS), e = f.includes(EPS), r2 = e ? W[p.A] : [], cells = uniq(r1.concat(r2));
      cells.forEach(t => M[p.A][t].push({ p, at: tst.length }));
      tst.push({ k: 'p', p, r1, e, r2, cells, clash: cells.filter(t => M[p.A][t].length > 1) });
    });
    const conflicts = []; nts.forEach(A => ts.forEach(t => { if (M[A][t].length > 1) conflicts.push([A, t]); }));
    tst.push({ k: 'done', conflicts });
    return { prods: G.prods, nts, ts, start: G.start, isNT, F: Ff, W, M, fst, wst, tst, conflicts, fsq };
  }

  /* ── shared pieces ── */
  function useRun(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), k = useRef(key);
    useEffect(() => { if (k.current !== key) { k.current = key; setI(calm() ? n - 1 : 0); setPlay(!calm()); } }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: x => { setPlay(false); setI(x); } }];
  }
  const SBar = ({ n, i, ctl, label }) => html`<div className="fig-bar"><span className="cv6-cnt">${label || `step ${i + 1} of ${n}`}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;

  function useGrammar(init, keys, withW) {
    const [key, setKey] = useState(init), [draft, setDraft] = useState(GR[init].text), [wd, setWd] = useState(GR[init].w || ''), [own, setOwn] = useState({ text: GR[init].text, w: GR[init].w || '' });
    const ex = key !== 'own', src = ex ? GR[key] : own;
    const an = React.useMemo(() => analyze(src.text, ex ? GR[key].ts : null, ex ? GR[key].nts : null, ex && GR[key].sortW), [key, own]);
    const pick = k => { setKey(k); if (k !== 'own') { setDraft(GR[k].text); setWd(GR[k].w || ''); } else setOwn({ text: draft, w: wd }); };
    const ui = html`<div className="cv6-pick">${keys.map(k => html`<button key=${k} className=${'fig-btn' + (key === k ? ' cv6-on' : '')} onClick=${() => pick(k)}>${GR[k].name}${withW ? ': ' + GR[k].w : ''}</button>`)}
      <button className=${'fig-btn' + (!ex ? ' cv6-on' : '')} onClick=${() => pick('own')}>Try your own</button></div>
      ${!ex && html`<div className="cv6-own"><textarea rows="5" value=${draft} onInput=${e => setDraft(e.target.value)} aria-label="Grammar, one line per non-terminal" spellCheck="false"></textarea>
        ${withW && html`<label>String to parse<input value=${wd} onInput=${e => setWd(e.target.value)} spellCheck="false" /></label>`}
        <button className="fig-btn solid" onClick=${() => setOwn({ text: draft, w: wd })}>Build</button>
        <p className="cv6-hint">One line per non-terminal, | between alternatives, ε (or eps) for empty. Capital letters (with ') are non-terminals; id and single characters are terminals; the first line's left side is the start symbol.</p></div>`}`;
    return { an, ui, key: key + '|' + (ex ? '' : own.text + '|' + own.w), w: src.w || '' };
  }
  const errCap = an => ({ en: 'The grammar has a problem: <b>' + esc(an.err) + '</b>.', ar: 'الـ grammar فيه مشكلة:' + L(esc(an.err)) });

  const GramView = ({ an, p, j }) => html`<div className="cv6-g">${an.nts.map(A => html`<div key=${A}><span className="nt">${A}</span> → ${an.prods.filter(q => q.A === A).map((q, k) => html`<span key=${k}>${k ? ' | ' : ''}<span className=${'alt' + (p === q ? ' on' : '')}>${q.rhs.length ? q.rhs.map((s, m) => html`<span key=${m} className=${p === q && j === m ? 'hit' : p === q && j != null && m > j ? 'beta' : ''}>${s}</span>`) : EPS}</span></span>`)}</div>`)}</div>`;
  const SetSpan = ({ a, add, dash }) => a.length ? html`<span>{${a.map((t, k) => html`<span key=${k}>${k ? ', ' : ''}<span className=${add && add.includes(t) ? 'new' : ''}>${t}</span></span>`)}}</span>` : (dash ? '{-}' : '');
  const SetTb = ({ an, F, W, add, hi, src, which, dash = true }) => html`<div className="cv6-tw"><table className="cv6-tb"><thead><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr></thead><tbody>
    ${an.nts.map(A => html`<tr key=${A}><th className=${A === hi ? 'cur' : A === src ? 'src' : ''}>${A}</th>
      <td className=${which === 'F' && A === hi ? 'cur' : which === 'W' ? 'fad' : ''}><${SetSpan} a=${F[A]} add=${which === 'F' && A === hi ? add : null} /></td>
      <td className=${which === 'W' && A === hi ? 'cur' : ''}>${W ? html`<${SetSpan} a=${W[A]} add=${which === 'W' && A === hi ? add : null} dash=${dash} />` : ''}</td></tr>`)}</tbody></table></div>`;

  /* ── [0.1] choose the production by FIRST of each alternative ── */
  function FirstPick({ ar }) {
    const [m, setM] = useState('F'), [s, setS] = useState(null);
    const D = m === 'F' ? { N: 'F', alts: [['F → (E)', ['('], 'FIRST((E))'], ['F → id', ['id'], 'FIRST(id)']], syms: ['id', '(', '+', '*', ')', '$'] }
      : { N: 'A', alts: [['A → aB', ['a'], 'FIRST(aB)'], ['A → Ad', ['a'], 'FIRST(Ad) = FIRST(A)']], syms: ['a', 'b', 'd', '$'] };
    const hits = s == null ? [] : D.alts.filter(a => a[1].includes(s));
    let en, a;
    if (s == null && m === 'F') { en = '<b>F → (E) | id</b> (Example 2): FIRST((E)) = {(} and FIRST(id) = {id} are <b>disjoint</b>. Tap the next input symbol: the parser picks the one F-production whose FIRST holds it.'; a = 'في Example 2 عندنا:' + L('F → (E) | id ; FIRST((E)) = {(} ; FIRST(id) = {id}') + 'المجموعتين <b>disjoint</b>. دوس على الـ input symbol اللي جاي، والـ parser هيختار الـ F-production اللي الـ FIRST بتاعها فيها الـ symbol ده.'; }
    else if (s == null) { en = '<b>A → aB | Ad</b> (Example 1 before removing left recursion): FIRST(aB) = {a} and FIRST(Ad) = FIRST(A) = {a}. They are <b>not disjoint</b>. Tap the next input symbol.'; a = 'في Example 1 قبل ما نشيل الـ left recursion بيبقى عندنا:' + L('A → aB | Ad ; FIRST(aB) = {a} ; FIRST(Ad) = FIRST(A) = {a}') + 'المجموعتين <b>مش disjoint</b>. دوس على الـ input symbol اللي جاي.'; }
    else if (hits.length === 1) { en = `Next input <b>${esc(s)}</b>: only ${hits[0][2]} contains it, so the parser picks <b>${hits[0][0]}</b> by looking at one symbol, with no backtracking.`; a = `الـ input اللي جاي هو ${bd(esc(s))}، ومفيش غير production واحدة ممكن تبدأ بيه، فالـ parser بيختارها من غير backtracking:` + L(hits[0][0]); }
    else if (hits.length === 2) { en = 'Next input <b>a</b>: <b>both</b> A → aB and A → Ad can begin with a. One lookahead symbol cannot choose between them, which is why Example 1 removes the left recursion first.'; a = `الـ input اللي جاي هو ${bd('a')}، والاتنين ممكن يبدأوا بيه، فـ symbol واحد مش كفاية عشان نختار. عشان كده Example 1 بيشيل الـ left recursion الأول.`; }
    else { en = `Next input <b>${esc(s)}</b>: no ${D.N}-production can begin with it, so this is an <b>error</b> (an empty table cell).`; a = `الـ input اللي جاي هو ${bd(esc(s))}، ومفيش ولا production تقدر تبدأ بيه، يبقى ده <b>error</b> (خانة فاضية في الجدول).`; }
    return html`<figure className="fig cv6"><div className="fig-stage">
      <div className="cv6-pick">${[['F', 'F → (E) | id'], ['A', 'A → aB | Ad']].map(([k, t]) => html`<button key=${k} className=${'fig-btn' + (m === k ? ' cv6-on' : '')} onClick=${() => { setM(k); setS(null); }}>${t}</button>`)}</div>
      <div className="cv6-alts">${D.alts.map((x, k) => html`<div key=${k} className=${'cv6-alt' + (s == null ? '' : hits.length === 2 ? ' clash' : hits.includes(x) ? ' on' : ' dim')}><b>${x[0]}</b><span>${x[2].split(' = ')[0]} = {${x[1].join(', ')}}</span></div>`)}</div>
      <p className="cv6-lbl">next input symbol</p>
      <div className="cv6-tape">${D.syms.map(t => html`<button key=${t} className=${'fig-btn' + (s === t ? ' cv6-on' : '')} style=${{ fontFamily: 'var(--mono)', minWidth: '40px' }} onClick=${() => setS(t)}>${t}</button>`)}</div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [0.2] FOLLOW read off sentential forms of Example 1 ── */
  function FollowForm({ ar }) {
    const steps = [
      { form: ['S'], der: 'S', hi: [], en: 'Example 1 starts from <b>S</b>. FIRST looks at what can <b>begin</b> a string; FOLLOW looks at what can stand <b>right after</b> a non-terminal.', ar: 'الـ Example 1 بيبدأ من <b>S</b>. الـ FIRST بيبص على اللي ممكن <b>يبدأ</b> بيه الـ string، والـ FOLLOW بيبص على اللي ممكن ييجي <b>على يمين</b> الـ non-terminal على طول.' },
      { form: ['a', 'B', "A'"], der: "S ⇒ A ⇒ aBA'", hi: [[0, 'ok']], sets: 1, en: "S ⇒ A ⇒ aBA'. Every string derived from A begins with <b>a</b>, so FIRST(A) = {a}. What stands right after <b>B</b>? Here A', a non-terminal, so keep deriving.", ar: 'كل string طالع من A بيبدأ بـ ' + bd('a') + '، يبقى:' + L("S ⇒ A ⇒ aBA' ; FIRST(A) = {a}") + 'طيب إيه اللي جاي على يمين <b>B</b> على طول؟ هنا ' + bd("A'") + ' وده non-terminal، فنكمّل.' },
      { form: ['a', 'B', 'd', "A'"], der: "aBA' ⇒ aBdA'", hi: [[1, 'look'], [2, 'hi']], sets: 2, en: "Use A' → dA': aBdA'. Now the terminal <b>d</b> is right after B, so d ∈ FOLLOW(B).", ar: 'لو استخدمنا الـ production ده:' + L("A' → dA' : aBA' ⇒ aBdA'") + 'دلوقتي ' + bd('d') + ' جاية على يمين B على طول، يبقى:' + L('d ∈ FOLLOW(B)') },
      { form: ['a', 'B', '$'], der: "aBA' ⇒ aB", hi: [[1, 'look'], [2, 'hi']], sets: 3, en: "Use A' → ε instead: aB. Now B is the <b>rightmost</b> symbol, so $ ∈ FOLLOW(B).", ar: 'ولو استخدمنا بدله:' + L("A' → ε : aBA' ⇒ aB") + 'الـ B بقت آخر symbol على اليمين، يبقى:' + L('$ ∈ FOLLOW(B)') },
      { form: ['a', 'B', '$'], der: "aBA' ⇒ aB", hi: [[1, 'look']], sets: 3, en: 'So FOLLOW(B) = {d, $}, as in the notes\' table. FOLLOW never contains ε: ε is not a symbol that can stand after B.', ar: 'يبقى:' + L('FOLLOW(B) = {d, $}') + 'زي جدول الـ notes بالظبط. والـ FOLLOW عمره ما بيكون فيه ε، لأن ε مش symbol ممكن ييجي بعد B.' },
    ];
    const [i, ctl] = useSteps(steps.length, 2800), st = steps[i], cls = k => { const h = st.hi.find(x => x[0] === k); return h ? ' ' + h[1] : ''; };
    return html`<figure className="fig cv6"><div className="fig-stage">
      <p className="cv6-der">${st.der}</p>
      <div className="cv6-tape">${st.form.map((t, k) => html`<span key=${i + '-' + k} className=${'cv6-sym' + (/^[A-Z]/.test(t) ? ' nt' : '') + (t === '$' ? ' end' : '') + cls(k)}>${t}</span>`)}</div>
      <div className="cv6-sets"><span className=${pop(i >= 1)}>FIRST(A) = {a}</span><span className=${pop(i >= 2)}>FOLLOW(B) = {${['d', '$'].slice(0, Math.max(0, (st.sets || 0) - 1)).join(', ')}}</span></div>
      </div><${Cap} ...${st} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] FIRST rule by rule ── */
  function firstCap(s, an) {
    const pre = s.pass > 1 ? `Pass ${s.pass}: ` : '', preA = s.pass > 1 ? `في اللفّة رقم ${s.pass}، ` : '';
    if (s.k === 'r1') { const ts = an.ts.filter(t => t !== '$').map(esc); return { en: `<b>Rule 1</b>: a terminal is its own FIRST, FIRST(a) = {a}, for ${ts.join(', ')}. Now go through the productions (rules 2 and 3), starting with the non-terminals that others begin with.`, ar: '<b>القاعدة 1</b>: الـ terminal الـ FIRST بتاعه هو نفسه:' + L(ts.map(t => `FIRST(${t}) = {${t}}`).join(' ; ')) + 'وبعدين نلف على الـ productions (القاعدة 2 و 3)، ونبدأ بالـ non-terminals اللي غيرها بيبدأ بيها.' }; }
    if (s.k === 'done') return { en: `Pass ${s.pass} adds nothing new, so these FIRST sets are final.`, ar: `اللفّة رقم ${s.pass} مش بتضيف أي حاجة جديدة، يبقى الـ FIRST sets دي نهائية.` };
    const P = esc(prodS(s.p)), A = esc(s.p.A);
    if (!s.p.rhs.length) return { en: `${pre}<b>${P}</b>: rule 3 adds ε to FIRST(${A}).`, ar: `${preA}القاعدة 3 بتضيف ε:` + L(`${P} ⇒ ε ∈ FIRST(${A})`) };
    const Y = esc(s.parts[0].Y), t1 = !an.isNT(s.parts[0].Y);
    const calc = s.parts.map(x => an.isNT(x.Y) ? `FIRST(${esc(x.Y)}) − ε = ${esc(set(x.f))}` : `FIRST(${esc(x.Y)}) = {${esc(x.Y)}}`).join(' ; ') + (s.all ? ' ; all ⇒* ε ⇒ ε' : '') + ` ⇒ FIRST(${A}) = ${esc(set(s.F[s.p.A]))}`;
    const en = `${pre}<b>${P}</b>, rule 2: ` + (t1 ? `the right side starts with the terminal <b>${Y}</b>` : `the right side starts with ${Y}, so take FIRST(${Y}) without ε`) + (s.parts.length > 1 ? '; the symbols before can derive ε, so the next symbol counts too' : '') + (s.all ? '; every symbol can derive ε, so ε is added' : '') + '.<span class="cv6-calc">' + calc + '</span>';
    const a = `${preA}القاعدة 2 على ${bd(P)}: ` + (t1 ? `الـ right side بيبدأ بالـ terminal ${bd(Y)}.` : `الـ right side بيبدأ بـ ${bd(Y)}، فبناخد الـ FIRST بتاعها من غير ε.`) + (s.parts.length > 1 ? ' وبما إن اللي قبله ممكن يطلّع ε بنبص على الـ symbol اللي بعده كمان.' : '') + (s.all ? ' وكل الـ symbols ممكن تطلّع ε، فـ ε بتدخل كمان.' : '') + L(calc);
    return { en, ar: a };
  }
  function FirstSets({ ar, init }) {
    const g = useGrammar(init, ['ex1', 'ex2', 'exam', 'qa']), an = g.an, n = an.err ? 1 : an.fst.length;
    const [i, ctl] = useRun(n, 2600, g.key);
    if (an.err) return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}<p className="cv6-err">${an.err}</p></div><${Cap} ...${errCap(an)} showAr=${ar} /></figure>`;
    const s = an.fst[i], c = firstCap(s, an);
    return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}
      <${GramView} an=${an} p=${s.p} />
      <div className="cv6-tw"><table className="cv6-tb"><thead><tr><th>NT</th><th>FIRST</th></tr></thead><tbody>
        ${an.nts.map(A => html`<tr key=${A}><th className=${s.p && s.p.A === A ? 'cur' : ''}>${A}</th><td className=${s.p && s.p.A === A ? 'cur' : ''}><${SetSpan} a=${s.F[A]} add=${s.p && s.p.A === A ? s.add : null} /></td></tr>`)}</tbody></table></div>
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><${SBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2] FOLLOW rule by rule ── */
  function followCap(s, an) {
    const pre = s.pass > 1 ? `Pass ${s.pass}: ` : '', preA = s.pass > 1 ? `في اللفّة رقم ${s.pass}، ` : '', S = esc(an.start);
    if (s.k === 'r1') return { en: `<b>Rule 1</b>: ${S} is the start symbol, so $ goes into FOLLOW(${S}). Then, for each non-terminal in turn, find it on the right sides (rules 2 and 3).`, ar: `<b>القاعدة 1</b>: الـ ${bd(S)} هي الـ start symbol، فـ $ بتدخل في الـ FOLLOW بتاعها. وبعدين لكل non-terminal بندوّر عليه في الـ right sides (القاعدة 2 و 3).` };
    if (s.k === 'done') { const e = an.nts.filter(A => !s.W[A].length).map(esc); return { en: `Pass ${s.pass} adds nothing new, so these FOLLOW sets are final.` + (e.length ? ` FOLLOW(${e.join('), FOLLOW(')}) stays empty, written {-}.` : ''), ar: `اللفّة رقم ${s.pass} مش بتضيف أي حاجة جديدة، يبقى الـ FOLLOW sets دي نهائية.` + (e.length ? ' واللي فاضي بنكتبه {-}.' : '') }; }
    const B = esc(s.B);
    if (s.k === 'none') return { en: `<b>${B}</b> never appears on a right side, so nothing can follow it: FOLLOW(${B}) stays empty (the slide writes {-}).`, ar: `الـ ${bd(B)} مش موجودة في أي right side، فمفيش حاجة ممكن تيجي بعدها، والـ FOLLOW بتاعها بيفضل فاضي (الـ slide كاتبة {-}).` };
    const P = esc(prodS(s.p)), A = esc(s.p.A), be = esc(seq(s.beta));
    const calc = [s.beta.length ? `FIRST(${be}) − ε = ${esc(set(s.r2))}` : '', s.r3 ? `FOLLOW(${A}) = ${esc(set(s.from))}` : ''].filter(Boolean).join(' ; ') + ` ⇒ FOLLOW(${B}) = ${esc(set(s.W[s.B]))}`;
    const en = `${pre}FOLLOW(${B}) from <b>${P}</b>: ` + (s.beta.length ? `after ${B} comes ${be}, so rule 2 adds FIRST(${be}) − ε` : `${B} is at the end`) + (s.r3 ? (s.beta.length ? `; ${be} can derive ε, so rule 3 adds FOLLOW(${A})` : `, so rule 3 adds FOLLOW(${A})`) : '') + '.' + (s.add.length ? ` New: <b>${esc(s.add.join(', '))}</b>.` : ' Nothing new.') + '<span class="cv6-calc">' + calc + '</span>';
    const a = `${preA}في ${bd(P)}، ` + (s.beta.length ? `بعد ${bd(B)} جاي ${bd(be)}، فالقاعدة 2 بتضيف الـ FIRST بتاعه ما عدا ε` : `الـ ${bd(B)} جاية في آخر الـ right side`) + (s.r3 ? (s.beta.length ? `، وبما إنه ممكن يختفي (ε) القاعدة 3 بتضيف كمان الـ FOLLOW بتاع ${bd(A)}` : `، فالقاعدة 3 بتضيف الـ FOLLOW بتاع ${bd(A)}`) : '') + ':' + L(calc) + (s.add.length ? '' : 'ومفيش حاجة جديدة.');
    return { en, ar: a };
  }
  function FollowSets({ ar, init }) {
    const g = useGrammar(init, ['ex1', 'ex2', 'exam', 'qa']), an = g.an, n = an.err ? 1 : an.wst.length;
    const [i, ctl] = useRun(n, 2800, g.key);
    if (an.err) return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}<p className="cv6-err">${an.err}</p></div><${Cap} ...${errCap(an)} showAr=${ar} /></figure>`;
    const s = an.wst[i], c = followCap(s, an), hi = s.k === 'r1' ? an.start : s.B;
    return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}
      <${GramView} an=${an} p=${s.p} j=${s.j} />
      <${SetTb} an=${an} F=${an.F} W=${s.W} add=${s.k === 'r1' ? ['$'] : s.add} hi=${hi} src=${s.r3 ? s.p.A : null} which="W" dash=${s.k === 'done'} />
      <p className="cv6-key">Underlined: the non-terminal whose FOLLOW is being found; shaded after it: β. Boxed row: FOLLOW(A) copied by rule 3.</p>
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><${SBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.1] what L, L and 1 mean, on Example 1's abd ── */
  function Letters({ ar }) {
    const forms = [['S'], ['A'], ['a', 'B', "A'"], ['a', 'b', "A'"], ['a', 'b', 'd', "A'"], ['a', 'b', 'd']], tape = ['a', 'b', 'd', '$'];
    const lead = f => { let k = 0; while (k < f.length && !/^[A-Z]/.test(f[k])) k++; return k; };
    const steps = [
      { en: 'LL(1) on Example 1\'s input <b>abd</b>: the first <b>L</b> scans the input left to right, the second <b>L</b> builds a leftmost derivation, and <b>1</b> is one input symbol of lookahead.', ar: 'الـ LL(1) على الـ input بتاع Example 1 وهو ' + bd('abd') + ':' + L('L = Left to right ; L = Leftmost derivation ; 1 = one lookahead symbol') },
      { en: 'Lookahead <b>a</b>. The leftmost non-terminal is <b>S</b>: S ⇒ A.', ar: 'الـ lookahead هو ' + bd('a') + '، والـ leftmost non-terminal هو ' + bd('S') + ':' + L('S ⇒ A') },
      { en: 'Still lookahead <b>a</b>; expand the leftmost non-terminal <b>A</b>: ⇒ aBA\'. Its a matches the input, so the scan moves right.', ar: 'الـ lookahead لسه ' + bd('a') + '، فنفك الـ leftmost non-terminal وهو A، والـ a بتاعته بتعمل match مع الـ input فالـ scan بيتحرك يمين:' + L("A ⇒ aBA'") },
      { en: 'Lookahead <b>b</b>; the leftmost non-terminal is now <b>B</b>: ⇒ abA\'.', ar: 'الـ lookahead بقى ' + bd('b') + '، والـ leftmost non-terminal دلوقتي ' + bd('B') + ':' + L("aBA' ⇒ abA'") },
      { en: 'Lookahead <b>d</b>; expand <b>A\'</b> with A\' → dA\': ⇒ abdA\'.', ar: 'الـ lookahead بقى ' + bd('d') + '، فنفك الـ ' + bd("A'") + ' بالـ production اللي بتبدأ بـ ' + bd('d') + ':' + L("abA' ⇒ abdA'") },
      { en: 'Lookahead <b>$</b>: A\' ⇒ ε gives <b>abd</b>. Every step expanded the leftmost non-terminal and looked at one input symbol only.', ar: 'الـ lookahead بقى $، فنستخدم ' + bd("A' → ε") + ' ونوصل لـ ' + bd('abd') + '. وكل خطوة فكّينا فيها الـ leftmost non-terminal وبصّينا على input symbol واحد بس:' + L("abdA' ⇒ abd") },
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const cur = i === 0 ? 0 : i - 1, used = i === 0 ? 0 : lead(forms[cur]) + (i === 2 ? 1 : 0);
    const look = i === 0 ? 0 : Math.min(lead(forms[i === 2 ? 2 : cur]), 3);
    return html`<figure className="fig cv6"><div className="fig-stage">
      <div className="cv6-badges"><span><b>L</b>left to right</span><span><b>L</b>leftmost</span><span><b>1</b>lookahead</span></div>
      <p className="cv6-lbl">input</p>
      <div className="cv6-tape">${tape.map((t, k) => html`<span key=${k} className=${'cv6-sym' + (k < look ? ' done' : '') + (k === look ? ' look' : '') + (t === '$' ? ' end' : '')}>${t}</span>`)}</div>
      <p className="cv6-lbl">leftmost derivation</p>
      <p className="cv6-der">${forms.slice(0, i + 1).map((f, k) => html`<span key=${k}>${k ? ' ⇒ ' : ''}<span className=${k === i ? '' : 'fad'}>${f.length ? f.map((s, m) => html`<span key=${m} className=${k === i && i < 5 && m === lead(f) ? 'lm' : ''}>${s}</span>`) : 'ε'}</span></span>`)}</p>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.2-3.3] the LL(1) conditions checked pair by pair ── */
  function Check({ ar }) {
    const g = useGrammar('ex1lr', ['ex1lr', 'ex1', 'ex2', 'exam']), an = g.an;
    if (an.err) return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}<p className="cv6-err">${an.err}</p></div><${Cap} ...${errCap(an)} showAr=${ar} /></figure>`;
    const cards = [], bad = [];
    const lr = an.prods.filter(p => p.rhs[0] === p.A);
    an.nts.forEach(A => {
      const ps = an.prods.filter(p => p.A === A);
      for (let x = 0; x < ps.length; x++) for (let y = x + 1; y < ps.length; y++) {
        const a = ps[x], b = ps[y], fa = an.fsq(a.rhs), fb = an.fsq(b.rhs), na = fa.includes(EPS), nb = fb.includes(EPS);
        const both = fa.filter(t => t !== EPS && fb.includes(t));
        const c3 = na ? fb.filter(t => t !== EPS && an.W[A].includes(t)) : nb ? fa.filter(t => t !== EPS && an.W[A].includes(t)) : null;
        const ok = [!both.length, !(na && nb), !(c3 && c3.length)];
        if (!ok.every(Boolean)) bad.push(`${A} → ${seq(a.rhs)} | ${seq(b.rhs)}`);
        cards.push({ A, a, b, fa, fb, na, nb, both, c3, ok, nul: na ? a : nb ? b : null, oth: na ? b : a });
      }
    });
    const ll1 = !an.conflicts.length;
    const en = (ll1 ? 'Every pair of alternatives passes the three conditions and no table cell gets two entries: <b>LL(1)</b>.' : `<b>Not LL(1)</b>: ${esc(bad.join('; ')) || 'a cell gets two entries'} fails a condition, and ${an.conflicts.map(([A, t]) => `M[${esc(A)}, ${esc(t)}]`).join(', ')} would hold two entries.`) + (lr.length ? ` ${esc(lr.map(prodS).join(', '))} is <b>left-recursive</b>.` : '') + (cards.length ? '' : ' No non-terminal has two alternatives, so there is never a choice.');
    const a = (ll1 ? 'كل زوج alternatives بيعدّي الـ 3 شروط، ومفيش خانة في الجدول فيها entry-ين، يبقى الـ grammar ده <b>LL(1)</b>.' : 'الـ grammar ده <b>مش LL(1)</b>، لأن فيه شرط مش متحقق، وفيه خانات هيبقى فيها entry-ين:' + L(esc(bad.concat(an.conflicts.map(([A, t]) => `M[${A}, ${t}]`)).join(' ; ')))) + (lr.length ? 'وكمان فيه <b>left recursion</b> في الـ production ده:' + L(esc(lr.map(prodS).join(' ; '))) : '') + (cards.length ? '' : ' ومفيش non-terminal ليه alternative-ين، فمفيش اختيار أصلًا.');
    const R = (ok, txt) => html`<div className="r"><span className=${ok ? 'y' : 'n'}>${ok ? '✓' : '✗'}</span><span>${txt}</span></div>`;
    return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}
      <div className="cv6-ck">${cards.map((c, k) => html`<div key=${k}><div className="hd">${c.A} → ${seq(c.a.rhs)} | ${seq(c.b.rhs)}</div>
        ${R(c.ok[0], html`(1) no common first terminal: <span className="m">${set(c.fa.filter(t => t !== EPS))} ∩ ${set(c.fb.filter(t => t !== EPS))} = ${c.both.length ? set(c.both) : '∅'}</span>`)}
        ${R(c.ok[1], html`(2) at most one derives ε: <span className="m">${seq(c.a.rhs)}</span> ${c.na ? 'yes' : 'no'}, <span className="m">${seq(c.b.rhs)}</span> ${c.nb ? 'yes' : 'no'}`)}
        ${R(c.ok[2], c.c3 == null ? '(3) neither derives ε, so it does not apply' : html`(3) <span className="m">${seq(c.nul.rhs)} ⇒* ε</span>, so <span className="m">FIRST(${seq(c.oth.rhs)}) ∩ FOLLOW(${c.A}) = ${c.c3.length ? set(c.c3) : '∅'}</span>`)}</div>`)}
        ${lr.length ? html`<div>${R(false, html`left recursion: <span className="m">${lr.map(prodS).join(', ')}</span>`)}</div>` : ''}</div>
      <p className=${'cv6-verd ' + (ll1 ? 'y' : 'n')}>${ll1 ? 'LL(1): no table cell has two entries' : 'Not LL(1): ' + an.conflicts.map(([A, t]) => `M[${A}, ${t}]`).join(', ') + ' has two entries'}</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [4.4] the parser's moves: expand, match, accept, error (Example 1) ── */
  function Moves({ ar }) {
    const steps = [
      { st: ['S', '$'], w: 'abd', ip: 0, md: -1, look: '', en: 'Start: the stack holds <b>S$</b> (the start symbol on top of $) and the input is <b>w$</b> = abd$.', ar: 'في الأول الـ stack فيه S فوق $، والـ input هو ' + bd('w$') + ':' + L('stack = S$ ; input = abd$') },
      { st: ['A', '$'], nw: 1, w: 'abd', ip: 0, md: 1, look: 'M[S, a] = S → A', en: 'Top <b>S</b> is a non-terminal and the next input is a: M[S, a] = <b>S → A</b>. Pop S, push A.', ar: 'الـ top هو non-terminal والـ input اللي جاي ' + bd('a') + '، فبنبص في الجدول ونعمل pop للـ S و push للـ ' + bd('A') + ':' + L('M[S, a] = S → A') },
      { st: ['a', 'B', "A'", '$'], nw: 3, w: 'abd', ip: 0, md: 1, look: "M[A, a] = A → aBA'", en: "Top <b>A</b>: M[A, a] = <b>A → aBA'</b>. Pop A and push the right side backwards (A', then B, then a), so the <b>first symbol a is on top</b>.", ar: 'الـ top هو A، والجدول بيقول:' + L("M[A, a] = A → aBA'") + 'بنعمل pop للـ A و push للـ right side بالعكس، عشان <b>أول symbol يبقى فوق</b>.' },
      { st: ['B', "A'", '$'], w: 'abd', ip: 1, md: 0, look: 'a = a', en: 'Top <b>a</b> is a terminal equal to the next input a: <b>match</b>. Pop it and advance the input.', ar: 'الـ top هو terminal بيساوي الـ input اللي جاي، يبقى <b>match</b>: نعمل pop ونقدّم في الـ input.' },
      { st: ['$'], w: 'abd', ip: 3, md: 1, look: "M[A', $] = A' → ε", en: "Then B → b, match b, A' → dA', match d. Now the top is <b>A'</b> and the input is $: M[A', $] = <b>A' → ε</b>, so pop A' and push nothing.", ar: 'وبعد كده بنكمّل بنفس الطريقة لحد ما الـ top يبقى ' + bd("A'") + ' والـ input يبقى $، والجدول بيقول نعمل pop ومش بنعمل push لحاجة:' + L("B → b ; match b ; A' → dA' ; match d ; M[A', $] = A' → ε") },
      { st: ['$'], w: 'abd', ip: 3, md: 2, look: '$ = $', en: 'Top <b>$</b> and input <b>$</b>: <b>accept</b>.', ar: 'الـ top هو $ والـ input كمان $، يبقى <b>accept</b>.' },
      { st: ["A'", '$'], w: 'abg', ip: 2, md: 3, look: "M[A', g] = empty", en: "Empty entries are errors: if the input were ab<b>g</b>, then after a and b are matched the top is A' and the next input is g. M[A', g] is empty, so <b>error</b>.", ar: 'الخانات الفاضية معناها errors: لو الـ input كان ' + bd('abg') + '، بعد ما a و b يتعملهم match الـ top هيبقى ' + bd("A'") + ' والـ input اللي جاي g، والخانة دي فاضية، يبقى <b>error</b>:' + L("M[A', g] = empty ⇒ error") },
    ];
    const [i, ctl] = useSteps(steps.length, 2800), s = steps[i], tp = (s.w + '$').split('');
    const cases = ['top = next input (terminal): match, pop, advance', 'top = A (non-terminal): replace A by M[A, a], first symbol on top', 'top = $ and input = $: accept', 'empty cell (or terminal mismatch): error'];
    return html`<figure className="fig cv6"><div className="fig-stage"><div className="cv6-mv">
      <div><p className="cv6-lbl">stack (top ↓)</p><div className="cv6-stk">${s.st.map((t, k) => html`<span key=${i + '-' + k} className=${'cv6-sym' + (/^[A-Z]/.test(t) ? ' nt' : '') + (t === '$' ? ' end' : '') + (k < (s.nw || 0) && !calm() ? ' new' : '') + (k === 0 ? (s.md === 3 ? ' hi' : s.md === 2 ? ' ok' : ' look') : '')}>${t}</span>`)}</div></div>
      <div><p className="cv6-lbl">input</p>
        <div className="cv6-tape">${tp.map((t, k) => html`<span key=${k} className=${'cv6-sym' + (k < s.ip ? ' done' : '') + (k === s.ip ? (s.md === 3 ? ' hi' : ' look') : '') + (t === '$' ? ' end' : '')}>${t}</span>`)}</div>
        <p className="cv6-look">${s.look}</p>
        <div className="cv6-case">${cases.map((c, k) => html`<div key=${k} className=${(k === s.md ? 'on' : '') + (k === 3 ? ' e' : '')}>${c}</div>`)}</div></div>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.0] removing the left recursion of Example 1 ── */
  function LeftRec({ ar }) {
    const steps = [
      { en: 'Example 1 has <b>A → aB | Ad</b>. In A → Ad the right side starts with A itself: the grammar is <b>left-recursive</b>, so LL(1) cannot use it as it is.', ar: 'في Example 1 عندنا ' + bd('A → aB | Ad') + '. في ' + bd('A → Ad') + ' الـ right side بيبدأ بـ A نفسها، يعني الـ grammar ده <b>left-recursive</b> والـ LL(1) مينفعش يستخدمه كده.' },
      { en: 'Match it to <b>A → Aα | β</b>: <b>α = d</b> (what follows A) and <b>β = aB</b> (the other alternative).', ar: 'نطابقه مع الشكل ده:' + L('A → Aα | β ; α = d ; β = aB') },
      { en: "Rewrite A as <b>A → βA'</b>: A → aBA'.", ar: 'نكتب الـ A على الشكل ده:' + L("A → βA' = aBA'") },
      { en: "Add the new non-terminal <b>A' → αA' | ε</b>: A' → dA' | ε.", ar: 'ونضيف non-terminal جديد:' + L("A' → αA' | ε = dA' | ε") },
      { en: "Result: S → A, A → aBA', A' → dA' | ε, B → b, C → g. Both grammars give aB followed by any number of d, for example aBdd.", ar: 'النتيجة:' + L("S → A, A → aBA', A' → dA' | ε, B → b, C → g") + 'والاتنين بيطلّعوا aB وبعدها أي عدد من d، مثلًا:' + L("A ⇒ Ad ⇒ Add ⇒ aBdd<br>A ⇒ aBA' ⇒ aBdA' ⇒ aBddA' ⇒ aBdd") },
    ];
    const [i, ctl] = useSteps(steps.length, 2800), c = i >= 1;
    return html`<figure className="fig cv6"><div className="fig-stage"><div className="cv6-rw">
      <div className="cv6-box"><small>BEFORE</small>A → ${c ? html`<span className="cv6-b">aB</span>` : 'aB'} | A${c ? html`<span className="cv6-a">d</span>` : 'd'}
        <div className=${pop(c)} style=${{ fontSize: '.88rem' }}>A → A<span className="cv6-a">α</span> | <span className="cv6-b">β</span> : <span className="cv6-a">α = d</span>, <span className="cv6-b">β = aB</span></div></div>
      <div className=${'cv6-box ' + pop(i >= 2)}><small>AFTER</small>
        <div>A → <span className="cv6-b">aB</span>A'</div>
        <div className=${pop(i >= 3)}>A' → <span className="cv6-a">d</span>A' | ε</div></div>
      <div className=${'cv6-box ' + pop(i >= 4)} style=${{ fontSize: '.88rem' }}><small>SAME STRINGS, E.G. aBdd</small>
        <div>A ⇒ Ad ⇒ Add ⇒ aBdd</div><div>A ⇒ aBA' ⇒ aBdA' ⇒ aBddA' ⇒ aBdd</div></div>
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5], [7], [8] the table M filled production by production ── */
  function tableCap(s, an) {
    if (s.k === 'start') return { en: 'Table <b>M</b>: one row per non-terminal, one column per terminal and $. For each production A → α apply the two rules, using the FIRST and FOLLOW sets above. Each cell shows the right side of its row\'s production.', ar: 'الجدول <b>M</b> فيه صف لكل non-terminal وعمود لكل terminal ومعاهم $. لكل production بنطبّق القاعدتين باستخدام الـ FIRST والـ FOLLOW اللي فوق، وكل خانة مكتوب فيها الـ right side بتاع الـ production.' };
    if (s.k === 'done') {
      const cs = s.conflicts.map(([A, t]) => `M[${esc(A)}, ${esc(t)}]`).join(', ');
      return s.conflicts.length ? { en: `Every other cell is empty = error. ${cs} holds two entries, so the grammar is <b>not LL(1)</b>.`, ar: 'باقي الخانات فاضية يعني error. وفيه خانات فيها entry-ين، يبقى الـ grammar ده <b>مش LL(1)</b>، ودي الخانات:' + L(cs) }
        : { en: 'Every other cell is empty = <b>error</b>. No cell has two entries, so the grammar is <b>LL(1)</b>.', ar: 'باقي الخانات فاضية يعني <b>error</b>. ومفيش خانة فيها entry-ين، يبقى الـ grammar ده <b>LL(1)</b>.' };
    }
    const P = esc(prodS(s.p)), A = esc(s.p.A), al = esc(seq(s.p.rhs));
    const calc = [s.r1.length ? `FIRST(${al}) − ε = ${esc(set(s.r1))}` : '', s.e ? `ε ∈ FIRST(${al}) ⇒ FOLLOW(${A}) = ${esc(set(s.r2))}` : ''].filter(Boolean).join(' ; ') + ' ⇒ ' + (s.cells.length ? s.cells.map(t => `M[${A}, ${esc(t)}]`).join(', ') : 'no cell');
    const en = `<b>${P}</b>: ` + [s.r1.length ? 'rule 1 puts it under each terminal in FIRST(' + al + ')' : '', s.e ? `ε ∈ FIRST(${al}), so rule 2 puts it under each b in FOLLOW(${A})` : ''].filter(Boolean).join('; ') + '.' + (s.clash.length ? ` Cell ${s.clash.map(t => `M[${A}, ${esc(t)}]`).join(', ')} now holds two entries.` : '') + '<span class="cv6-calc">' + calc + '</span>';
    const a = `الـ production ${bd(P)}` + (s.r1.length ? '، القاعدة 1 بتحطه تحت كل terminal في الـ FIRST بتاعها' : '') + (s.e ? `، والـ right side ممكن يطلّع ε فالقاعدة 2 بتحطه تحت كل حاجة في الـ FOLLOW بتاع ${bd(A)}` : '') + ':' + L(calc) + (s.clash.length ? 'ودلوقتي فيه خانة فيها entry-ين.' : '');
    return { en, ar: a };
  }
  function Table({ ar, init }) {
    const g = useGrammar(init, ['ex1', 'ex1lr', 'ex2', 'exam', 'qa']), an = g.an, n = an.err ? 1 : an.tst.length;
    const [i, ctl] = useRun(n, 2600, g.key);
    if (an.err) return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}<p className="cv6-err">${an.err}</p></div><${Cap} ...${errCap(an)} showAr=${ar} /></figure>`;
    const s = an.tst[i], c = tableCap(s, an), A = s.p && s.p.A;
    return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}
      <${GramView} an=${an} p=${s.p} />
      <${SetTb} an=${an} F=${an.F} W=${an.W} hi=${A} which="T" />
      <div className="cv6-tw"><table className="cv6-tb cv6-m"><caption>Predictive parsing table M</caption><thead><tr><th>NT</th>${an.ts.map(t => html`<th key=${t}>${t}</th>`)}</tr></thead><tbody>
        ${an.nts.map(N => html`<tr key=${N}><th className=${N === A ? 'cur' : ''}>${N}</th>${an.ts.map(t => {
          const es = an.M[N][t].filter(e => e.at <= i), now = s.k === 'p' && N === A && s.cells.includes(t);
          return html`<td key=${t} className=${es.length > 1 ? 'bad' : now ? 'cur' : ''}>${es.map((e, k) => html`<div key=${k}><span className="cv6-lhs">${e.p.A} → </span>${seq(e.p.rhs)}</div>`)}</td>`; })}</tr>`)}
      </tbody></table></div>
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><${SBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6], [8] stack / input / action trace with the parse tree growing ── */
  function lexW(w, ts) {
    const T = ts.filter(t => t !== '$').sort((a, b) => b.length - a.length), out = [], s = w.replace(/\s+/g, '').replace(/\$+$/, '');
    let i = 0;
    while (i < s.length) { const t = T.find(x => s.startsWith(x, i)); if (!t) return { err: `"${s[i]}" is not a terminal of this grammar` }; out.push(t); i += t.length; }
    if (out.length > 30) return { err: 'at most 30 input symbols' };
    out.push('$'); return out;
  }
  function runParse(an, w) {
    const toks = lexW(w, an.ts); if (toks.err) return toks;
    let id = 0; const mk = (s, at) => ({ id: id++, s, at, kids: null, hit: null });
    const root = mk(an.start, 0); let st = [root, { s: '$' }], ip = 0; const rows = [];
    for (let k = 0; k < 200; k++) {
      const top = st[0], a = toks[ip], row = { st: st.map(x => x.s), inp: toks.slice(ip), top, a };
      rows.push(row);
      if (top.s === '$' && a === '$') { row.act = { k: 'acc' }; break; }
      if (top.s === '$' || !an.isNT(top.s)) { if (top.s === a) { row.act = { k: 'm' }; top.hit = k + 1; st = st.slice(1); ip++; continue; } row.act = { k: 'err', why: 'm' }; break; }
      const cell = an.M[top.s][a] || [];
      if (!cell.length) { row.act = { k: 'err', why: 'e' }; break; }
      const p = cell[0].p; top.kids = p.rhs.length ? p.rhs.map(s => mk(s, k + 1)) : [mk(EPS, k + 1)];
      row.act = { k: 'e', p }; st = (p.rhs.length ? top.kids : []).concat(st.slice(1));
    }
    return { rows, root };
  }
  function Tree({ root, i, top }) {
    let x = 0, depth = 0; const pos = {}, all = [];
    const go = (nd, d) => { all.push(nd); depth = Math.max(depth, d); if (!nd.kids) { pos[nd.id] = [x++, d]; return pos[nd.id][0]; } const xs = nd.kids.map(k => go(k, d + 1)); pos[nd.id] = [(xs[0] + xs[xs.length - 1]) / 2, d]; return pos[nd.id][0]; };
    go(root, 0);
    if (x > 14) return html`<p className="cv6-key">(parse tree too wide to draw here: ${x} leaves)</p>`;
    const dx = 30, dy = 40, pad = 18, W = Math.max(x * dx + 2 * pad - dx, 140), H = depth * dy + 2 * pad;
    const P = nd => [pad + pos[nd.id][0] * dx + (W - (x * dx + 2 * pad - dx)) / 2, pad + pos[nd.id][1] * dy];
    const vis = nd => nd.at <= i + 1;
    return html`<svg className="cv6-tree" viewBox=${`0 0 ${W} ${H}`} style=${{ maxWidth: W * 1.15 + 'px' }} role="img" aria-label="Parse tree so far">
      ${all.filter(vis).map(nd => (nd.kids || []).filter(vis).map(k => { const [x1, y1] = P(nd), [x2, y2] = P(k); return html`<line key=${nd.id + '-' + k.id} x1=${x1} y1=${y1 + 8} x2=${x2} y2=${y2 - 13} />`; }))}
      ${all.filter(vis).map(nd => { const [cx, cy] = P(nd); const cl = nd === top ? 'top' : nd.s === EPS ? 'eps' : nd.hit && nd.hit <= i + 1 ? 'hit' : /^[A-Z]/.test(nd.s) ? 'nt' : ''; return html`<text key=${nd.id} x=${cx} y=${cy + 5} textAnchor="middle" fontSize="16" className=${cl}>${nd.s}</text>`; })}
    </svg>`;
  }
  function parseCap(r, an) {
    const t = esc(r.top.s), a = esc(r.a);
    if (r.act.k === 'acc') return { en: 'Stack and input are both <b>$</b>: <b>accept</b>. The productions used, in order, are the leftmost derivation, and the tree is complete.', ar: 'الـ stack والـ input الاتنين بقوا $، يبقى <b>accept</b>. والـ productions اللي استخدمناها بالترتيب هي الـ leftmost derivation، والـ tree كملت.' };
    if (r.act.k === 'm') return { en: `Top <b>${t}</b> is a terminal equal to the next input: <b>match</b>. Pop it and advance.`, ar: `الـ top هو ${bd(t)} وده terminal بيساوي الـ input اللي جاي، يبقى <b>match</b>: نعمل pop ونقدّم في الـ input.` };
    if (r.act.k === 'e') { const P = esc(prodS(r.act.p)); return { en: `Top <b>${t}</b> is a non-terminal, next input <b>${a}</b>: M[${t}, ${a}] = <b>${P}</b>. ` + (r.act.p.rhs.length ? `Replace ${t} by ${esc(seq(r.act.p.rhs))}, first symbol on top.` : `Pop ${t} and push nothing.`), ar: `الـ top هو non-terminal والـ input اللي جاي ${bd(a)}، ` + (r.act.p.rhs.length ? 'فبنبدّل الـ top بالـ right side اللي في الجدول (أول symbol فوق):' : 'والجدول فيه ε، فبنعمل pop ومش بنعمل push لحاجة:') + L(`M[${t}, ${a}] = ${P}`) }; }
    if (r.act.why === 'e') return { en: `M[${t}, ${a}] is empty: <b>error</b>. The string is not in the language.`, ar: 'الخانة دي فاضية، يبقى <b>error</b> والـ string مش من الـ language، والخانة دي:' + L(`M[${t}, ${a}] = error`) };
    return { en: `Top <b>${t}</b> is a terminal but the next input is <b>${a}</b>: <b>error</b>.`, ar: `الـ top هو terminal ${bd(t)} بس الـ input اللي جاي ${bd(a)}، يبقى <b>error</b>.` };
  }
  function Parser({ ar, init }) {
    const g = useGrammar(init, ['ex1', 'exam', 'qa'], true), an = g.an;
    const res = React.useMemo(() => an.err || an.conflicts.length ? null : runParse(an, g.w), [g.key, an]);
    const n = res && res.rows ? res.rows.length : 1;
    const [i, ctl] = useRun(n, 2200, g.key);
    let msg = null;
    if (an.err) msg = errCap(an);
    else if (an.conflicts.length) msg = { en: `This grammar is <b>not LL(1)</b>: ${an.conflicts.map(([A, t]) => `M[${esc(A)}, ${esc(t)}]`).join(', ')} has two entries, so the parser cannot choose.`, ar: 'الـ grammar ده <b>مش LL(1)</b>: فيه خانات فيها entry-ين، فالـ parser مش هيعرف يختار:' + L(an.conflicts.map(([A, t]) => esc(`M[${A}, ${t}]`)).join(' ; ')) };
    else if (res.err) msg = { en: 'The string has a problem: <b>' + esc(res.err) + '</b>.', ar: 'الـ string فيه مشكلة:' + L(esc(res.err)) };
    if (msg) return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}<p className="cv6-err" dangerouslySetInnerHTML=${{ __html: msg.en }}></p></div><${Cap} ...${msg} showAr=${ar} /></figure>`;
    const r = res.rows[i], c = parseCap(r, an), act = x => x.act.k === 'acc' ? 'accept' : x.act.k === 'm' ? 'match ' + x.top.s : x.act.k === 'e' ? prodS(x.act.p) : 'error';
    return html`<figure className="fig cv6"><div className="fig-stage">${g.ui}
      <div className="cv6-tw"><table className="cv6-tb cv6-tr"><thead><tr><th>Stack</th><th>Input</th><th>Action</th></tr></thead><tbody>
        ${res.rows.slice(0, i + 1).map((x, k) => html`<tr key=${k} className=${k === i ? 'cur' : ''}><td>${x.st.join('')}</td><td>${x.inp.join('')}</td><td>${act(x)}</td></tr>`)}</tbody></table></div>
      <${Tree} root=${res.root} i=${i} top=${r.act.k === 'e' || r.act.k === 'm' ? r.top : null} />
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><${SBar} n=${n} i=${i} ctl=${ctl} label=${`row ${i + 1} of ${n}`} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-first-pick': FirstPick,
    'cc-follow-form': FollowForm,
    'cc-first-sets': ({ ar }) => html`<${FirstSets} ar=${ar} init="ex2" />`,
    'cc-follow-sets': ({ ar }) => html`<${FollowSets} ar=${ar} init="ex2" />`,
    'cc-ll1-letters': Letters,
    'cc-ll1-check': Check,
    'cc-ll1-moves': Moves,
    'cc-leftrec-ex1': LeftRec,
    'cc-table-ex1': ({ ar }) => html`<${Table} ar=${ar} init="ex1" />`,
    'cc-parse-abd': ({ ar }) => html`<${Parser} ar=${ar} init="ex1" />`,
    'cc-table-expr': ({ ar }) => html`<${Table} ar=${ar} init="ex2" />`,
    'cc-exam-follow': ({ ar }) => html`<${FollowSets} ar=${ar} init="exam" />`,
    'cc-exam-table': ({ ar }) => html`<${Table} ar=${ar} init="exam" />`,
    'cc-exam-parse': ({ ar }) => html`<${Parser} ar=${ar} init="exam" />`,
  });
})();
/* ── part L7 ── */
// Compiler Design visuals, Lecture 7 (Semantic Analysis: Attribute Grammars and SDT): semantic analysis in and out, attribute grammar, the SDT rules PR#1 to PR#5, the SDT approach, 2 + 3 * 4 evaluated on its parse tree (plus your own expression), synthesized vs inherited, definite assignment (slides 2, 4–12). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.cv7{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cv7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cv7 .fig-btn.cv7-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv7-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.cv7-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.cv7-muted{ color:var(--graphite); font-size:.84rem; }
/* box flows */
.cv7-flow{ display:grid; gap:4px; justify-items:center; max-width:420px; margin:0 auto; color:var(--ink); }
.cv7-pair{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; width:100%; }
.cv7-box{ border:1.5px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 8px; text-align:center; font-size:.92rem; line-height:1.35; width:100%; box-sizing:border-box; min-width:0; color:var(--ink); transition:box-shadow .4s, border-color .4s, background .4s, opacity .5s, transform .5s; }
.cv7-box > b{ display:block; }
.cv7-box.on{ border-color:var(--k-compiler); box-shadow:0 0 0 2px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 12%, var(--paper)); }
.cv7-box small{ display:block; font-size:.8rem; color:var(--graphite); margin-top:2px; }
.cv7-dn{ color:var(--graphite); font-size:1.2rem; line-height:1; }
.cv7-tag{ display:inline-block; margin-top:4px; font-size:.8rem; padding:1px 8px; border-radius:99px; background:color-mix(in srgb, var(--ok) 22%, var(--paper)); color:var(--ink); }
.cv7-chips{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-top:5px; }
.cv7-chip{ font-size:.8rem; line-height:1.3; border:1px solid var(--line); border-radius:99px; padding:2px 8px; background:var(--paper-2); color:var(--ink); transition:box-shadow .4s, opacity .4s; }
.cv7-chip.on{ box-shadow:0 0 0 2px var(--k-compiler); font-weight:700; }
.cv7-chip.dim{ opacity:.5; }
.cv7-or{ font-size:.82rem; color:var(--graphite); align-self:center; }
/* svg */
.fig-stage svg.cv7-svg{ display:block; width:100%; height:auto; margin:0 auto; max-width:400px; }
.cv7-svg .nd{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.4; transition:fill .35s, stroke .35s, stroke-width .35s, opacity .5s; }
.cv7-svg .nd.done{ fill:color-mix(in srgb, var(--k-compiler) 12%, var(--paper)); }
.cv7-svg .nd.on{ fill:color-mix(in srgb, var(--k-compiler) 28%, var(--paper)); stroke:var(--k-compiler); stroke-width:2.6; }
.cv7-svg .nd.lx{ fill:color-mix(in srgb, var(--ok) 20%, var(--paper)); stroke:var(--ok); }
.cv7-svg .nd.lx.on{ stroke-width:2.6; }
.cv7-svg .ed{ stroke:var(--graphite); stroke-width:1.5; fill:none; transition:stroke .35s, stroke-width .35s, opacity .5s; }
.cv7-svg .ed.on{ stroke:var(--k-compiler); stroke-width:3; }
.cv7-svg .ed.ghost, .cv7-svg .nd.ghost{ stroke-dasharray:5 4; opacity:.45; }
.cv7-svg .fl{ stroke:var(--k-compiler); stroke-width:2.6; fill:none; transition:opacity .45s; }
.cv7-svg text{ font-weight:600; }
.fig svg.cv7-svg text.cv7-v{ fill:var(--k-compiler); font-family:var(--mono); font-weight:700; transition:opacity .4s; }
.fig svg.cv7-svg text.cv7-m{ font-family:var(--mono); font-weight:700; }
.fig svg.cv7-svg text.cv7-tg{ fill:var(--k-compiler); font-family:var(--mono); font-weight:700; }
.cv7-svg .tg{ fill:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); stroke:var(--k-compiler); stroke-width:1.4; }
.cv7-svg .hit{ cursor:pointer; }
.cv7-svg .hit:focus{ outline:none; } .cv7-svg .hit:focus-visible circle{ stroke:var(--pen); stroke-width:3; }
.cv7-svg .fade{ transition:opacity .5s; }
/* rules */
.cv7-prod{ text-align:center; font:700 1rem/1.5 var(--mono); color:var(--ink); margin:0 0 6px; overflow-wrap:anywhere; }
.cv7-prod .act{ color:var(--k-compiler); transition:opacity .5s; }
.cv7-rules{ display:grid; gap:5px; max-width:380px; margin:0 auto; }
.cv7-rl{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 8px; font:500 .9rem/1.45 var(--mono); color:var(--ink); transition:box-shadow .35s, opacity .45s, transform .45s; min-width:0; overflow-wrap:anywhere; }
.cv7-rl.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv7-rl .no{ float:right; margin-left:6px; font-family:var(--body); font-size:.8rem; color:var(--graphite); font-weight:700; }
.cv7-rl .act{ display:block; transition:opacity .45s; }
.cv7-rl .act.off{ opacity:0; }
.cv7-g3{ max-width:380px; margin:0 auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 10px; font:600 1rem/1.6 var(--mono); color:var(--ink); text-align:center; }
.cv7-ha{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); border-radius:3px; padding:0 1px; }
.cv7-hl{ background:color-mix(in srgb, var(--ok) 28%, var(--paper)); border-radius:3px; padding:0 1px; }
.cv7-hp{ box-shadow:inset 0 -2px 0 var(--pen); }
.cv7-key{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:8px 0 0; font-size:.8rem; color:var(--ink); }
.cv7-key span{ padding:1px 8px; border-radius:99px; border:1px solid var(--line); background:var(--paper); }
/* evaluation */
.cv7-rule{ max-width:360px; margin:8px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font:600 .9rem/1.5 var(--mono); color:var(--ink); text-align:center; overflow-wrap:anywhere; }
.cv7-rule .pr{ color:var(--k-compiler); font-weight:800; }
.cv7-trace{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-top:8px; }
.cv7-trace span{ font:600 .8rem/1.3 var(--mono); padding:2px 7px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:opacity .35s, box-shadow .35s; }
.cv7-trace span.off{ opacity:.3; } .cv7-trace span.cur{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv7-try{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; }
.cv7-in{ font:600 1rem var(--mono); width:100%; max-width:170px; box-sizing:border-box; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.cv7-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.cv7-err{ color:var(--pen); font-size:.86rem; text-align:center; margin:4px 0 0; }
/* symbol table example */
.cv7-st{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:380px; margin:8px auto 0; }
/* definite assignment */
.cv7-path{ font:inherit; cursor:pointer; }
.cv7-path .cd{ display:block; font:700 .95rem/1.4 var(--mono); margin-top:4px; }
.cv7-path.as{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.cv7-path:focus-visible{ outline:2px solid var(--k-compiler); outline-offset:2px; }
.cv7-st3{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:5px; width:100%; margin-top:8px; }
.cv7-st3 .cv7-box{ padding:6px 4px; font-size:.8rem; }
@media (prefers-reduced-motion: reduce){ .cv7-box, .cv7-chip, .cv7-svg .nd, .cv7-svg .ed, .cv7-svg .fl, .cv7-svg .fade, .cv7-rl, .cv7-rl .act, .cv7-trace span, .fig svg.cv7-svg text.cv7-v{ transition:none; } }`;
  if (!document.getElementById('cv7-css')) { const s = document.createElement('style'); s.id = 'cv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const box = (on, extra) => 'cv7-box' + (on ? ' on' : '') + (extra ? ' ' + extra : '');
  const Head = ({ id }) => html`<defs><marker id=${id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" style=${{ fill: 'var(--k-compiler)' }} /></marker></defs>`;
  // a straight arrow from (x1,y1) to (x2,y2), pulled in by r1 / r2 at the ends and shifted sideways by off
  const arw = (x1, y1, x2, y2, r1, r2, off) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy * off, py = ux * off; return `M${(x1 + ux * r1 + px).toFixed(1)} ${(y1 + uy * r1 + py).toFixed(1)} L${(x2 - ux * r2 + px).toFixed(1)} ${(y2 - uy * r2 + py).toFixed(1)}`; };

  /* ───────── slide 2: what semantic analysis takes and gives ───────── */
  function SemPipeline({ ar }) {
    const steps = [
      { en: '<b>Semantic analysis</b> makes sure that the declarations and statements of a program are <b>semantically correct</b>.', ar: 'الـ <b>Semantic analysis</b> بيتأكد إن الـ declarations والـ statements بتاعة البرنامج <b>صح من ناحية المعنى</b>.' },
      { en: 'It works on two inputs: the <b>syntax tree</b> and the <b>symbol table</b>.', ar: 'بيشتغل على حاجتين هما الـ <b>syntax tree</b> والـ <b>symbol table</b>.' },
      { en: 'With them it checks whether the program is <b>consistent with the language definition</b>.', ar: 'وبيهم بيشوف البرنامج <b>ماشي مع تعريف اللغة</b> ولا لأ.' },
      { en: 'It gathers <b>type information</b> and stores it in the syntax tree or the symbol table.', ar: 'بيجمع <b>type information</b> ويخزنها في الـ syntax tree أو الـ symbol table.' },
      { en: '<b>Type checking</b> is done here, during semantic analysis, i.e. during <b>syntax-directed translation</b>.', ar: 'الـ <b>Type checking</b> بيتعمل هنا أثناء الـ semantic analysis، يعني أثناء الـ <b>syntax-directed translation</b>.' },
      { en: 'Output: the <b>annotated syntax tree</b>, a parse tree showing the attribute values at each node.', ar: 'الـ Output هو الـ <b>annotated syntax tree</b>، يعني parse tree بيبيّن قيم الـ attributes عند كل node.' },
      { en: 'Later, the compiler uses the type information during <b>intermediate-code generation</b>.', ar: 'وبعدين الـ compiler بيستخدم الـ type information دي في الـ <b>intermediate-code generation</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const ti = html`<span className=${'cv7-tag ' + pop(i >= 3)}>type information</span>`;
    const chip = (k, t) => html`<span className=${'cv7-chip' + (i === k ? ' on' : '') + (i < k ? ' dim' : '')}>${t}</span>`;
    return html`<figure className="fig cv7"><div className="fig-stage"><div className="cv7-flow">
      <div className="cv7-pair">
        <div className=${box(i === 1 || i === 3)}><b>Syntax tree</b>${ti}</div>
        <div className=${box(i === 1 || i === 3)}><b>Symbol table</b>${ti}</div>
      </div>
      <div className="cv7-dn" aria-hidden="true">↓</div>
      <div className=${box(i === 0 || i === 2 || i === 4)}><b>Semantic analysis</b>
        <div className="cv7-chips">${chip(0, 'declarations and statements semantically correct?')}${chip(2, 'consistent with the language definition?')}${chip(3, 'gathers type information')}${chip(4, 'type checking (SDT)')}</div></div>
      <div className=${'cv7-dn ' + pop(i >= 5)} aria-hidden="true">↓</div>
      <div className=${box(i === 5, pop(i >= 5))}><b>Annotated syntax tree</b><small>a parse tree showing the attribute values at each node</small></div>
      <div className=${'cv7-dn ' + pop(i >= 6)} aria-hidden="true">↓</div>
      <div className=${box(i === 6, pop(i >= 6))}><b>Intermediate-code generation</b><small>uses the type information</small></div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slide 4: a CFG production becomes an attribute grammar ───────── */
  function AttrGrammar({ ar }) {
    const steps = [
      { en: 'A plain CFG production: <b>E → E + T</b>. On its own it describes syntax only.', ar: 'دي production عادية في الـ CFG وهي بتوصف الـ syntax بس.<span class="ltr">E → E + T</span>' },
      { en: 'Append an <b>attribute</b> to the non-terminals: here <b>value</b>, on E and T. Each attribute has a well-defined domain: integer, float, character, string, expressions.', ar: 'بنضيف <b>attribute</b> على الـ non-terminals، وهنا اسمه <b>value</b> على الـ E والـ T. كل attribute ليه domain واضح زي integer و float و character و string و expressions.' },
      { en: 'Add the semantic rule <b>{ E.value = E.value + T.value }</b>. Viewed as a parse tree, values now pass among the nodes: the children’s values go up to the parent. Syntax and semantics are specified together.', ar: 'بنضيف الـ semantic rule، ولو بصّينا عليها كـ parse tree هتنقل قيم بين الـ nodes يعني قيم الـ children بتطلع للـ parent. كده بنوصف الـ syntax والـ semantics مع بعض.<span class="ltr">{ E.value = E.value + T.value }</span>' },
      { en: 'Attaching attributes to each non-terminal of the CFG produces an <b>attribute grammar</b>. Semantic analysis uses it to transform the <b>syntax tree</b> into the <b>annotated syntax tree</b>.', ar: 'لما نربط attributes بكل non-terminal في الـ CFG بيطلع <b>attribute grammar</b>. والـ semantic analysis بيستخدمه عشان يحوّل الـ <b>syntax tree</b> لـ <b>annotated syntax tree</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const P = { x: 150, y: 36 }, K = [{ x: 58, y: 136, l: 'E' }, { x: 150, y: 136, l: '+', t: 1 }, { x: 242, y: 136, l: 'T' }];
    const tag = (x, y, on) => html`<g className="fade" style=${{ opacity: on ? 1 : 0 }}><rect className="tg" x=${x - 34} y=${y - 15} width="68" height="24" rx="6" /><text className="cv7-tg" x=${x} y=${y + 3} textAnchor="middle" fontSize="15">.value</text></g>`;
    return html`<figure className="fig cv7"><div className="fig-stage">
      <p className="cv7-prod">E → E + T <span className="act" style=${{ opacity: i >= 2 ? 1 : 0 }}>{ E.value = E.value + T.value }</span></p>
      <svg className="cv7-svg" viewBox="0 -34 300 234" role="img" aria-label="The production E → E + T as a small tree, with the attribute value on E and T">
        <${Head} id="cv7-ah-ag" />
        ${K.map((k, j) => html`<line key=${'e' + j} className="ed" x1=${P.x} y1=${P.y + 18} x2=${k.x} y2=${k.y - 18} />`)}
        <circle className=${'nd' + (i >= 1 ? ' done' : '')} cx=${P.x} cy=${P.y} r="18" /><text x=${P.x} y=${P.y + 7} textAnchor="middle" fontSize="20">E</text>
        ${K.map((k, j) => html`<g key=${'n' + j}>${!k.t && html`<circle className=${'nd' + (i >= 1 ? ' done' : '')} cx=${k.x} cy=${k.y} r="18" />`}<text className=${k.t ? 'cv7-m' : ''} x=${k.x} y=${k.y + 7} textAnchor="middle" fontSize="20">${k.l}</text></g>`)}
        ${tag(P.x, P.y - 50, i >= 1)}
        ${tag(K[0].x, K[0].y + 40, i >= 1)}${tag(K[2].x, K[2].y + 40, i >= 1)}
        <path className="fl" d="M 22 168 Q 6 -14 112 -18" markerEnd="url(#cv7-ah-ag)" style=${{ opacity: i >= 2 ? 1 : 0 }} />
        <path className="fl" d="M 278 168 Q 294 -14 188 -18" markerEnd="url(#cv7-ah-ag)" style=${{ opacity: i >= 2 ? 1 : 0 }} />
      </svg>
      ${i === 1 && html`<div className="cv7-chips">${['integer', 'float', 'character', 'string', 'expressions'].map(d => html`<span key=${d} className="cv7-chip">${d}</span>`)}</div>`}
      ${i === 3 && html`<div className="cv7-chips"><span className="cv7-chip">syntax tree</span><span className="cv7-or">→ attribute grammar →</span><span className="cv7-chip on">annotated syntax tree</span></div>`}
    </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slides 6–7: the grammar augmented with SDT rules ───────── */
  const RULES = [
    ['E → E + T', [['E.val', 'a', 'L'], ' = ', ['E.val', 'a', 'R'], ' + ', ['T.val', 'a', 'R']]],
    ['E → T', [['E.val', 'a', 'L'], ' = ', ['T.val', 'a', 'R']]],
    ['T → T * F', [['T.val', 'a', 'L'], ' = ', ['T.val', 'a', 'R'], ' * ', ['F.val', 'a', 'R']]],
    ['T → F', [['T.val', 'a', 'L'], ' = ', ['F.val', 'a', 'R']]],
    ['F → INT', [['F.val', 'a', 'L'], ' = ', ['INT.lexval', 'l', 'R']]]
  ];
  function SdtAugment({ ar }) {
    const steps = [
      { en: 'Slide 6’s grammar validates the syntax of expressions with additions and multiplications: <b>E → E+T | T</b>, <b>T → T*F | F</b>, <b>F → INT</b>.', ar: 'الـ grammar بتاعة slide 6 بتتأكد من الـ syntax بتاع expressions فيها جمع وضرب.<span class="ltr">E → E+T | T<br>T → T*F | F<br>F → INT</span>' },
      { en: 'SDT <b>augments</b> the grammar: each of the five productions gets a translation rule in braces, numbered PR#1 to PR#5.', ar: 'الـ SDT بيزوّد الـ grammar بـ <b>augmented rules</b>، فكل production من الخمسة بياخد translation rule بين أقواس، ومترقمين من PR#1 لـ PR#5.' },
      { en: 'The rules use <b>attributes of non-terminals</b>: <b>val</b> is the attribute of E, T and F (highlighted).', ar: 'القواعد بتستخدم <b>attributes بتاعة الـ non-terminals</b>، والـ attribute هنا اسمه <b>val</b> على الـ E والـ T والـ F (المتعلّم عليهم).' },
      { en: 'The rules use <b>lexical values</b> of nodes: <b>INT.lexval</b> in PR#5 is the token’s value, like 2, 3 and 4.', ar: 'القواعد بتستخدم الـ <b>lexical values</b> بتاعة الـ nodes، زي <bdi>INT.lexval</bdi> في الـ PR#5 وهي قيمة الـ token زي 2 و3 و4.' },
      { en: 'Rules may also use <b>constants</b>. These five rules use none: every value comes from an attribute or a lexical value.', ar: 'القواعد ممكن كمان تستخدم <b>constants</b>. الخمس قواعد دول مفيهمش ولا constant، وكل قيمة جاية من attribute أو lexical value.' },
      { en: '<b>PR#1</b>: the right-hand side of the rule (E.val + T.val) uses the attributes of the right-side nodes of the production, the children E and T. The left side E.val (underlined) belongs to the parent E.', ar: 'في الـ <b>PR#1</b> الجانب اليمين من القاعدة بيستخدم attributes الـ nodes اللي على يمين الـ production يعني الـ children، والجانب الشمال (اللي تحته خط) بتاع الـ parent.<span class="ltr">E → E + T { E.val = E.val + T.val }</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const cls = (t, r) => (i === 2 && t[1] === 'a') || (i === 3 && t[1] === 'l') || (i === 5 && r === 0 && t[2] === 'R') ? (t[1] === 'l' ? 'cv7-hl' : 'cv7-ha') : (i === 5 && r === 0 && t[2] === 'L' ? 'cv7-hp' : '');
    return html`<figure className="fig cv7"><div className="fig-stage">
      ${i === 0 ? html`<div className="cv7-g3">E → E+T | T<br />T → T*F | F<br />F → INT</div>`
        : html`<div className="cv7-rules">${RULES.map(([p, act], r) => html`<div key=${r} className=${'cv7-rl' + (i === 5 && r === 0 ? ' on' : '') + (i === 5 && r > 0 ? ' dim' : '')} style=${{ opacity: i === 5 && r > 0 ? .45 : 1 }}>
            <span className="no">PR#${r + 1}</span>${p}
            <span className="act" style=${{ transitionDelay: calm() || i !== 1 ? '0s' : (r * .35) + 's' }}>{ ${act.map((t, k) => typeof t === 'string' ? t : html`<span key=${k} className=${cls(t, r)}>${t[0]}</span>`)} }</span></div>`)}</div>`}
      ${i >= 2 && i <= 4 && html`<div className="cv7-key"><span className=${i === 2 ? 'cv7-ha' : ''}>attributes</span><span className=${i === 3 ? 'cv7-hl' : ''}>lexical values</span><span style=${{ fontWeight: i === 4 ? 700 : 400 }}>constants: none here</span></div>`}
    </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slide 5: the general approach of SDT ───────── */
  function SdtApproach({ ar }) {
    const steps = [
      { en: 'General approach, step 1: build a <b>parse tree</b> or <b>syntax tree</b> for the input.', ar: 'الطريقة العامة، أول خطوة إننا نبني <b>parse tree</b> أو <b>syntax tree</b> للـ input.' },
      { en: 'Step 2: <b>visit the nodes in some order</b> and compute the attribute values at each one. The numbers show one such order: depth-first, bottom-up, as in the 2 + 3 * 4 example.', ar: 'تاني خطوة إننا <b>نزور الـ nodes بترتيب معيّن</b> ونحسب قيم الـ attributes عند كل واحدة. الأرقام بتوضح ترتيب من دول (depth-first و bottom-up زي المثال اللي جاي).' },
      { en: 'The rules use attributes, constants and lexical values. Once every node has its values, the result is the <b>annotated syntax tree</b>.', ar: 'القواعد بتستخدم attributes و constants و lexical values. ولما كل node تاخد قيمها النتيجة بتبقى الـ <b>annotated syntax tree</b>.' },
      { en: 'Often the translation can be done <b>during parsing</b>, without building an explicit tree: the values are computed while the input is parsed.', ar: 'وغالباً الـ translation ممكن يتعمل <b>أثناء الـ parsing</b> من غير ما نبني tree صريحة، والقيم بتتحسب وإحنا بنعمل parse للـ input.' }
    ];
    const [i, ctl] = useSteps(steps.length, 4200);
    const N = [{ x: 40, y: 168 }, { x: 116, y: 168 }, { x: 78, y: 100 }, { x: 184, y: 168 }, { x: 260, y: 168 }, { x: 222, y: 100 }, { x: 150, y: 34 }];
    const E = [[6, 2], [6, 5], [2, 0], [2, 1], [5, 3], [5, 4]];
    const ghost = i === 3;
    return html`<figure className="fig cv7"><div className="fig-stage">
      <div className="cv7-chips" style=${{ marginBottom: '8px' }}>
        <span className=${'cv7-chip' + (i === 0 ? ' on' : '') + (ghost ? ' dim' : '')}>1 build tree</span>
        <span className=${'cv7-chip' + (i === 1 ? ' on' : '') + (ghost ? ' dim' : '')}>2 visit nodes</span>
        <span className=${'cv7-chip' + (i === 2 ? ' on' : '') + (ghost ? ' dim' : '')}>3 annotated tree</span>
        <span className="cv7-or">or</span>
        <span className=${'cv7-chip' + (ghost ? ' on' : ' dim')}>during parsing</span></div>
      <svg className="cv7-svg" viewBox="0 0 300 216" role="img" aria-label="A parse tree whose nodes are visited in order and get their attribute values">
        ${E.map(([a, b], k) => html`<line key=${'e' + k} className=${'ed' + (ghost ? ' ghost' : '')} x1=${N[a].x} y1=${N[a].y + 20} x2=${N[b].x} y2=${N[b].y - 20} />`)}
        ${N.map((n, k) => { const vis = i >= 1 && !ghost, done = i >= 2 && !ghost;
          return html`<g key=${k}>
            <circle className=${'nd' + (ghost ? ' ghost' : done ? ' on' : '')} cx=${n.x} cy=${n.y} r="20" style=${{ transitionDelay: i === 1 && !calm() ? (k * .4) + 's' : '0s', fill: i === 1 ? 'color-mix(in srgb, var(--k-compiler) 18%, var(--paper))' : undefined }} />
            <text className="cv7-tg fade" x=${n.x} y=${n.y + 5} textAnchor="middle" fontSize="15" style=${{ opacity: done ? 1 : 0 }}>val</text>
            <text className="cv7-m fade" x=${n.x + (k === 6 ? 32 : 0)} y=${n.y + (k === 6 ? 6 : 6)} textAnchor="middle" fontSize="16" style=${{ opacity: vis && !done ? 1 : 0, transitionDelay: i === 1 && !calm() ? (k * .4) + 's' : '0s' }}>${k + 1}</text>
          </g>`; })}
        ${ghost && html`<text x="150" y="212" textAnchor="middle" fontSize="15" style=${{ fill: 'var(--graphite)' }}>no explicit tree</text>`}
      </svg>
    </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── slides 7–9: 2 + 3 * 4 evaluated on its parse tree, and your own expression ───────── */
  // E → E+T | T, T → T*F | F, F → INT over one-digit numbers (at most four); the tree keeps the grammar's left recursion
  function parseExpr(s) {
    if (!/^\d([+*]\d){0,3}$/.test(s)) return null;
    let id = 0; const mk = (sym, kids, extra) => Object.assign({ id: id++, s: sym, kids }, extra || {});
    const F = d => mk('F', [mk('INT', [], { lex: +d })]);
    const T = fs => fs.reduce((acc, d, k) => k === 0 ? mk('T', [F(d)]) : mk('T', [acc, mk('*', [], { op: 1 }), F(d)]), null);
    return s.split('+').map(t => t.split('*')).reduce((acc, fs, k) => k === 0 ? mk('E', [T(fs)]) : mk('E', [acc, mk('+', [], { op: 1 }), T(fs)]), null);
  }
  function layout(root) {
    const nodes = [], edges = []; let col = 0, maxD = 0;
    const walk = (n, d, par) => { n.d = d; n.par = par; maxD = Math.max(maxD, d); nodes.push(n);
      if (!n.kids.length) n.c = col++; else { n.kids.forEach(k => { edges.push([n, k]); walk(k, d + 1, n); }); n.c = (n.kids[0].c + n.kids[n.kids.length - 1].c) / 2; } };
    walk(root, 0, null);
    return { nodes, edges, cols: col, maxD };
  }
  // depth-first, children before parents, left to right: one entry per non-terminal
  function evalOrder(root) {
    const out = [];
    const go = n => { n.kids.forEach(go); if (n.s === 'INT' || n.op) return;
      if (n.s === 'F') { n.v = n.kids[0].lex; n.pr = 5; }
      else if (n.kids.length === 1) { n.v = n.kids[0].v; n.pr = n.s === 'T' ? 4 : 2; }
      else { const a = n.kids[0].v, b = n.kids[2].v; n.ab = [a, b]; n.v = n.s === 'T' ? a * b : a + b; n.pr = n.s === 'T' ? 3 : 1; }
      n.k = out.length; out.push(n); };
    go(root); return out;
  }
  const PR = { 1: 'E → E + T', 2: 'E → T', 3: 'T → T * F', 4: 'T → F', 5: 'F → INT' };
  const PR_SUB = { 1: 'E → E₁ + T', 3: 'T → T₁ * F' };
  const calc = (n, sub) => ({
    5: `F.val = INT.lexval = ${n.v}`, 4: `T.val = F.val = ${n.v}`, 2: `E.val = T.val = ${n.v}`,
    3: n.ab && `T.val = ${sub ? 'T₁' : 'T'}.val * F.val = ${n.ab[0]} * ${n.ab[1]} = ${n.v}`,
    1: n.ab && `E.val = ${sub ? 'E₁' : 'E'}.val + T.val = ${n.ab[0]} + ${n.ab[1]} = ${n.v}`
  })[n.pr];
  const chipTxt = n => n.pr === 3 ? `T.val = ${n.ab[0]} * ${n.ab[1]} = ${n.v}` : n.pr === 1 ? `E.val = ${n.ab[0]} + ${n.ab[1]} = ${n.v}` : `${n.s}.val = ${n.v}`;
  const pretty = s => s.replace(/([+*])/g, ' $1 ');

  function EvalRun({ expr, ex, sub, ar, top }) {
    const R = useRef(null);
    if (!R.current) { const root = parseExpr(expr), lay = layout(root), ord = evalOrder(root); R.current = { root, lay, ord }; }
    const { root, lay, ord } = R.current;
    const lex = lay.nodes.filter(n => n.s === 'INT').map(n => n.lex);
    const prRule = n => (sub && PR_SUB[n.pr]) || PR[n.pr];
    const steps = [{
      en: `The parse tree of <b>${pretty(expr)}</b>${ex ? ' (slide 8)' : ''}. Its leaves ${lex.join(', ')} are the <b>lexical values</b>. One depth-first traversal, bottom-up and left to right, computes each <b>val</b> with the rule of its production.` + (sub ? ' A child with the same name as its parent is written with subscript 1 (E₁, T₁) to tell the child from the parent.' : ''),
      ar: `الـ parse tree بتاع <bdi>${pretty(expr)}</bdi>${ex ? ' (slide 8)' : ''}. الأوراق هي الـ <b>lexical values</b>، وبـ depth-first traversal واحد (bottom-up ومن الشمال لليمين) بنحسب كل <b>val</b> بالقاعدة بتاعة الـ production بتاعه.` + (sub ? ' والـ child اللي ليه نفس اسم الـ parent مكتوب بـ subscript 1 عشان نفرّقه عن الـ parent.' : '')
    }].concat(ord.map(n => {
      const f = calc(n, sub), last = n === root;
      const en = { 5: 'F gets the lexical value of its leaf.', 4: 'T copies the value of F.', 2: 'E copies the value of T.', 3: 'Both children are done, so the parent can be computed.', 1: 'Both children are done, so the parent can be computed.' }[n.pr];
      const a = `بنطبّق قاعدة الـ <b>PR#${n.pr}</b>، ` + { 5: 'والـ F بياخد الـ lexical value بتاعة الورقة اللي تحته.', 4: 'والـ T بياخد نفس قيمة الـ F.', 2: 'والـ E بياخد نفس قيمة الـ T.', 3: 'لأن الـ children الاتنين اتحسبوا فنقدر نحسب الـ parent.', 1: 'لأن الـ children الاتنين اتحسبوا فنقدر نحسب الـ parent.' }[n.pr];
      return {
        en: `<b>PR#${n.pr}</b> ${prRule(n)}: ${en} <b>${f}</b>` + (last ? `. The root holds the result, E.val = ${n.v}. Every child was computed before its parent.` : ''),
        ar: a + (last ? ' والـ root فيه النتيجة النهائية، وكل child اتحسب قبل الـ parent بتاعه.' : '') + `<span class="ltr">${prRule(n)}<br>${f}</span>`
      };
    }));
    const [i, ctl] = useSteps(steps.length, 2600);
    const cur = i > 0 ? ord[i - 1] : null;
    const CW = lay.cols > 5 ? 44 : 54, RH = 70, W = Math.max(lay.cols * CW, 270), off = (W - lay.cols * CW) / 2, H = 24 + lay.maxD * RH + 22;
    const X = n => off + (n.c + .5) * CW, Y = n => 22 + n.d * RH;
    const lbl = n => n.s === 'INT' ? String(n.lex) : n.s + (sub && n.par && n.par.s === n.s ? '₁' : '');
    return html`<figure className="fig cv7"><div className="fig-stage">${top}
      <svg className="cv7-svg" viewBox=${`0 0 ${W} ${H}`} role="img" aria-label=${'Parse tree of ' + pretty(expr) + ' with the val of each node'}>
        ${lay.edges.map(([p, c], k) => html`<line key=${'e' + k} className=${'ed' + (cur === p ? ' on' : '')} x1=${X(p)} y1=${Y(p) + 33} x2=${X(c)} y2=${Y(c) - 17} />`)}
        ${lay.nodes.map(n => {
          const x = X(n), y = Y(n), leaf = n.s === 'INT', hasV = n.k != null && n.k < i;
          if (n.op) return html`<text key=${n.id} className="cv7-m" x=${x} y=${y + 6} textAnchor="middle" fontSize="18">${n.s}</text>`;
          const w = lbl(n).length > 1 ? 34 : 28;
          return html`<g key=${n.id}>
            <rect className=${'nd' + (leaf ? ' lx' + (i === 0 || (cur && cur.kids[0] === n) ? ' on' : '') : cur === n ? ' on' : hasV ? ' done' : '')} x=${x - w / 2} y=${y - 15} width=${w} height="28" rx="7" />
            <text className=${leaf ? 'cv7-m' : ''} x=${x} y=${y + 6} textAnchor="middle" fontSize="17">${lbl(n)}</text>
            ${!leaf && html`<text className="cv7-v" x=${x} y=${y + 31} textAnchor="middle" fontSize="15" style=${{ opacity: hasV ? 1 : 0 }}>${hasV ? n.v : ''}</text>`}
          </g>`; })}
      </svg>
      <div className="cv7-rule">${cur ? html`<span className="pr">PR#${cur.pr}</span> ${prRule(cur)}<br />${calc(cur, sub)}` : html`<span className="pr">lexical values</span> ${lex.join(', ')}`}</div>
      <div className="cv7-trace">${ord.map((n, k) => html`<span key=${k} className=${k < i - 1 ? '' : k === i - 1 ? 'cur' : 'off'}>${chipTxt(n)}</span>`)}</div>
    </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  function SdtEval({ ar }) {
    const [mode, setMode] = useState('ex'), [txt, setTxt] = useState('5*2+3*4'), [sub, setSub] = useState(false);
    const clean = txt.replace(/\s+/g, ''), ok = !!parseExpr(clean), expr = mode === 'ex' ? '2+3*4' : clean;
    const top = html`<div className="cv7-modes">
        ${[['ex', 'Example from the notes'], ['own', 'Try your own']].map(([k, l]) => html`<button key=${k} className=${'fig-btn' + (mode === k ? ' cv7-sel' : '')} onClick=${() => setMode(k)}>${l}</button>`)}
        <button className=${'fig-btn' + (sub ? ' cv7-sel' : '')} aria-pressed=${sub} onClick=${() => setSub(!sub)}>Subscript 1: ${sub ? 'on' : 'off'}</button></div>
      ${mode === 'own' && html`<div className="cv7-try"><label className="cv7-muted" htmlFor="cv7-expr">Digits with + and * (up to 4 numbers)</label>
        <input id="cv7-expr" className="cv7-in" value=${txt} maxLength="12" spellCheck="false" autoComplete="off" onChange=${e => setTxt(e.target.value)} /></div>`}`;
    if (mode === 'own' && !ok) return html`<figure className="fig cv7"><div className="fig-stage">${top}<p className="cv7-err">Type one-digit numbers joined by + or *, for example 5*2+3*4.</p></div>
      <${Cap} en="The grammar only has <b>INT</b>, <b>+</b> and <b>*</b>: E → E+T | T, T → T*F | F, F → INT." ar="الـ grammar فيها بس <b>INT</b> و <b>+</b> و <b>*</b>.<span class='ltr'>E → E+T | T<br>T → T*F | F<br>F → INT</span>" showAr=${ar} /></figure>`;
    return html`<${EvalRun} key=${expr} expr=${expr} ex=${mode === 'ex'} sub=${sub} ar=${ar} top=${top} />`;
  }

  /* ───────── slides 10–12: synthesized vs inherited on S → ABC ───────── */
  function SynInh({ ar }) {
    const steps = [
      { en: '<b>S → ABC</b>: a parent S with three children A, B and C. Where an attribute gets its value decides its kind. Tap a node or press Next.', ar: 'الـ production دي فيها parent اسمه S وتلات children هما A و B و C. نوع الـ attribute بيتحدد من المكان اللي بياخد منه قيمته. دوس على أي node أو Next.<span class="ltr">S → ABC</span>' },
      { en: '<b>Synthesized</b>: S takes its value from its children A, B and C. Values pass upwards, from the leaves to the root, as in <b>E → E + T</b>. A synthesized attribute never takes values from its parent or its siblings.', ar: 'الـ <b>Synthesized</b>: الـ S بياخد قيمته من الـ children بتوعه A و B و C كلهم. القيم بتطلع لفوق من الأوراق للـ root زي<span class="ltr">E → E + T</span>والـ synthesized attribute عمره ما بياخد قيم من الـ parent أو الـ siblings.' },
      { en: '<b>Inherited</b>: A can take values from its parent S and from its siblings B and C.', ar: 'الـ <b>Inherited</b>: الـ A يقدر ياخد قيم من الـ parent بتاعه S ومن الـ siblings بتوعه B و C كمان.' },
      { en: '<b>Inherited</b>: B can take values from S, A and C.', ar: 'الـ <b>Inherited</b>: الـ B يقدر ياخد قيم من S و A و C كلهم.' },
      { en: '<b>Inherited</b>: C can take values from S, A and B. Information passes downwards and sideways in the tree.', ar: 'الـ <b>Inherited</b>: الـ C يقدر ياخد قيم من S و A و B كلهم. والمعلومات بتنزل لتحت وبتتنقل للجنب جوه الـ tree.' },
      { en: 'Example from the notes: a <b>symbol table</b> is <b>synthesized</b> by a declaration and <b>inherited</b> by the scope of that declaration.', ar: 'مثال من النوتس: الـ <b>symbol table</b> بيبقى <b>synthesized</b> من الـ declaration، وبيبقى <b>inherited</b> للـ scope بتاع الـ declaration ده.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3800);
    const S = { x: 150, y: 40, l: 'S' }, K = [{ x: 55, y: 150, l: 'A' }, { x: 150, y: 150, l: 'B' }, { x: 245, y: 150, l: 'C' }], r = 22;
    const tgt = i >= 2 && i <= 4 ? i - 2 : -1;
    const flows = [];
    if (i === 1) K.forEach((k, j) => flows.push(arw(k.x, k.y, S.x, S.y, r + 2, r + 6, j === 0 ? -10 : j === 1 ? 12 : 10)));
    if (tgt >= 0) {
      const t = K[tgt];
      flows.push(arw(S.x, S.y, t.x, t.y, r + 2, r + 4, tgt === 0 ? 10 : tgt === 1 ? 12 : -10));
      K.forEach((k, j) => { if (j === tgt) return;
        if (Math.abs(j - tgt) === 1) flows.push(arw(k.x, k.y, t.x, t.y, r + 2, r + 4, 0));
        else flows.push(`M${k.x} ${k.y + r + 3} Q 150 236 ${t.x} ${t.y + r + 5}`); });
    }
    const node = (n, k, on) => html`<g className=${k != null ? 'hit' : ''} tabIndex=${k != null ? 0 : undefined} role=${k != null ? 'button' : undefined} aria-label=${k != null ? 'Inherited attribute of ' + n.l : 'Synthesized attribute of S'}
        onClick=${() => ctl.go(k != null ? k + 2 : 1)} onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctl.go(k != null ? k + 2 : 1); } }}>
      <circle className=${'nd' + (on ? ' on' : '')} cx=${n.x} cy=${n.y} r=${r} /><text x=${n.x} y=${n.y + 7} textAnchor="middle" fontSize="21">${n.l}</text></g>`;
    return html`<figure className="fig cv7"><div className="fig-stage">
      <div className="cv7-chips" style=${{ marginBottom: '6px' }}>
        <span className=${'cv7-chip' + (i === 1 ? ' on' : '')}>Synthesized ↑ from children</span>
        <span className=${'cv7-chip' + (tgt >= 0 ? ' on' : '')}>Inherited ↓ ↔ from parent and siblings</span></div>
      <svg className="cv7-svg" viewBox="0 0 300 236" role="img" aria-label="S → ABC: arrows show where the attribute takes its values from" style=${{ opacity: i === 5 ? .4 : 1, transition: 'opacity .5s' }}>
        <${Head} id="cv7-ah-si" />
        ${K.map((k, j) => html`<line key=${'e' + j} className="ed" x1=${S.x} y1=${S.y + r} x2=${k.x} y2=${k.y - r} />`)}
        ${flows.map((d, j) => html`<path key=${i + '-' + j} className="fl" d=${d} markerEnd="url(#cv7-ah-si)" />`)}
        ${node(S, null, i === 1)}${K.map((k, j) => html`<g key=${j}>${node(k, j, tgt === j)}</g>`)}
      </svg>
      ${i === 5 && html`<div className="cv7-st">
        <div className="cv7-box on"><b>Declaration</b><small>synthesizes the symbol table ↑</small></div>
        <div className="cv7-box on"><b>Scope of that declaration</b><small>inherits the symbol table ↓</small></div></div>`}
    </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── lecture notes / revision sheet: definite assignment states ───────── */
  function DefAssign({ ar }) {
    const [p, setP] = useState([true, false]);
    const n = p.filter(Boolean).length, st = n === 2 ? 0 : n === 0 ? 1 : 2;
    const cap = [
      { en: 'Every path to the use assigns x, so x is <b>definitely assigned</b>: known with certainty to be assigned.', ar: 'كل المسارات اللي بتوصل للاستخدام بتدّي x قيمة، يبقى x <b>definitely assigned</b> (متأكدين إنه أخد قيمة).' },
      { en: 'No path assigns x, so x is <b>definitely unassigned</b>: known with certainty to be unassigned. It is not assigned before it is used.', ar: 'ولا مسار بيدّي x قيمة، يبقى x <b>definitely unassigned</b> (متأكدين إنه ماخدش قيمة)، يعني مش بياخد قيمة قبل ما يتستخدم.' },
      { en: 'Only one path assigns x, so x may or may not be assigned: its state is <b>unknown</b>.', ar: 'مسار واحد بس بيدّي x قيمة، يبقى x ممكن يكون أخد قيمة وممكن لأ، والحالة <b>unknown</b>.' }
    ][st];
    const intro = { en: '<b>Definite assignment analysis</b> is a data-flow analysis that ensures x is always assigned before it is used. Tap a path to make it assign x or not. ', ar: 'الـ <b>Definite assignment analysis</b> هو data-flow analysis بيتأكد إن x دايماً بياخد قيمة قبل ما يتستخدم. دوس على أي مسار عشان يدّي قيمة لـ x أو لأ. ' };
    const path = j => html`<button className=${'cv7-box cv7-path' + (p[j] ? ' as' : '')} aria-pressed=${p[j]} onClick=${() => setP(p.map((v, k) => k === j ? !v : v))}>
      <b>Path ${j + 1}</b><span className="cd">${p[j] ? 'x = …' : 'no x = …'}</span><small>${p[j] ? 'assigns x' : 'does not assign x'}</small></button>`;
    const S = ['Definitely assigned', 'Definitely unassigned', 'Unknown'];
    return html`<figure className="fig cv7"><div className="fig-stage"><div className="cv7-flow">
      <div className="cv7-pair">${path(0)}${path(1)}</div>
      <div className="cv7-dn" aria-hidden="true">↘ ↙</div>
      <div className="cv7-box on"><b>x is used here</b><small>state of x: <b>${S[st]}</b></small></div>
      <div className="cv7-st3">${S.map((s, k) => html`<div key=${k} className=${box(k === st)} style=${{ opacity: k === st ? 1 : .55 }}>${s}</div>`)}</div>
    </div></div>
      <${Cap} en=${intro.en + cap.en} ar=${intro.ar + cap.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setP([true, false])}>↻ Reset</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-sem-pipeline': SemPipeline, 'cc-attr-grammar': AttrGrammar, 'cc-sdt-augment': SdtAugment, 'cc-sdt-approach': SdtApproach,
    'cc-sdt-eval': SdtEval, 'cc-syn-inh': SynInh, 'cc-def-assign': DefAssign
  });
})();
/* ── part L8 ── */
// Compiler Design visuals, Lecture 8 (Semantic Analysis Part 2: Scoping, Binding and Symbol Tables): scopes and binding, static vs dynamic runs of the course's programs, symbol-table operations and implementations, the one-table-per-scope walkthrough, and the two single-table solutions (slides 2–14). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.cv8{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.cv8 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cv8 .fig-btn.cv8-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv8-wrap{ max-width:520px; margin:0 auto; color:var(--ink); min-width:0; }
.cv8-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.cv8-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.cv8-muted{ font-size:.82rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.cv8-code{ font:500 .78rem/1.6 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px; color:var(--ink); min-width:0; }
.cv8-code code{ font:inherit; color:var(--ink); }
.cv8-ln{ display:flex; align-items:stretch; border-radius:4px; transition:background .4s, opacity .4s; }
.cv8-ln > code{ font:inherit; white-space:pre-wrap; overflow-wrap:anywhere; padding:0 4px; flex:1; min-width:0; color:var(--ink); }
.cv8-ln.on{ background:color-mix(in srgb, var(--k-compiler) 20%, var(--paper)); }
.cv8-ln.blk{ background:color-mix(in srgb, var(--ok) 10%, var(--paper)); }
.cv8-ln.dim{ opacity:.5; }
.cv8-g{ width:9px; flex:none; margin-right:3px; border-radius:2px; transition:background .4s; }
.cv8-g.o{ background:var(--k-compiler); } .cv8-g.i{ background:var(--ok); }
.cv8-xo{ color:var(--k-compiler); font-weight:800; } .cv8-xi{ color:var(--ok); font-weight:800; }
.cv8-mk{ border-radius:3px; box-shadow:0 0 0 1.5px currentColor; padding:0 1px; }
.cv8-hl{ background:color-mix(in srgb, var(--k-compiler) 40%, var(--paper)); border-radius:3px; box-shadow:0 0 0 1.5px var(--k-compiler); }
.cv8-leg{ display:flex; flex-wrap:wrap; gap:6px 12px; justify-content:center; font-size:.84rem; margin-top:8px; }
.cv8-leg i{ display:inline-block; width:10px; height:10px; border-radius:2px; margin-right:5px; vertical-align:middle; }
.cv8-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; margin-top:10px; }
.cv8-pan{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:7px; min-width:0; font-size:.86rem; line-height:1.4; transition:box-shadow .4s; }
.cv8-pan.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv8-ph{ display:block; text-align:center; font-weight:700; color:var(--k-compiler); margin-bottom:5px; font-size:.92rem; }
.cv8-var{ display:block; font:600 .82rem/1.35 var(--mono); border:1px solid var(--line); border-radius:6px; padding:2px 5px; margin-top:3px; background:var(--paper-2); overflow-wrap:anywhere; transition:opacity .4s, box-shadow .4s; }
.cv8-var.used{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv8-var.dead{ opacity:.55; border-style:dashed; }
.cv8-var small{ display:block; font:500 .75rem/1.3 var(--body); color:var(--graphite); }
.cv8-out{ margin-top:6px; font:700 .86rem var(--mono); color:var(--k-compiler); overflow-wrap:anywhere; }
.cv8-in{ font:600 .9rem var(--mono); width:54px; box-sizing:border-box; padding:4px 5px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.cv8-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.cv8-lbl{ font-size:.85rem; color:var(--graphite); }
.cv8-tbl{ border-collapse:collapse; width:100%; font-size:.82rem; margin-top:3px; }
.cv8-tbl th, .cv8-tbl td{ border:1px solid var(--line); padding:2px 4px; text-align:center; }
.cv8-tbl th{ background:var(--paper-2); font-weight:700; }
.cv8-tbl td{ transition:background .4s; }
.cv8-tbl td.new{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); font-weight:700; }
.cv8-tbl td.q{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); font-weight:700; }
.cv8-st{ margin-top:8px; transition:opacity .4s; min-width:0; }
.cv8-st.off{ opacity:.45; }
.cv8-st > b{ font-size:.86rem; } .cv8-st > span{ font-size:.78rem; color:var(--graphite); margin-left:6px; }
.cv8-ev{ border:1px solid var(--line); border-left:4px solid var(--k-compiler); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.85rem; line-height:1.45; margin-top:8px; min-height:3.2em; }
.cv8-ev div b{ color:var(--k-compiler); }
.cv8-ev .no{ color:var(--pen); font-weight:700; } .cv8-ev .yes{ color:var(--ok); font-weight:700; }
.cv8-blk{ border:1.5px solid var(--graphite); border-radius:6px; margin:2px 0 2px 12px; padding:1px 0; position:relative; }
.cv8-blk.on{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); }
.cv8-tag{ position:absolute; right:4px; top:1px; font:600 .75rem var(--body); color:var(--graphite); }
.cv8-ops{ display:grid; grid-template-columns:minmax(0, 1fr); gap:6px; margin-top:8px; }
.cv8-op{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; font-size:.86rem; }
.cv8-chip{ display:inline-block; border:1px solid var(--line); border-radius:99px; padding:2px 9px; background:var(--paper); font-size:.84rem; transition:box-shadow .4s, opacity .4s; }
.cv8-chip.on{ box-shadow:0 0 0 2px var(--k-compiler); font-weight:700; }
.cv8-chip.m{ font-family:var(--mono); border-radius:6px; }
.cv8-chip.ok{ border-color:var(--ok); color:var(--ok); font-weight:700; }
.cv8-chip.no{ border-color:var(--pen); color:var(--pen); font-weight:700; }
.cv8-stack{ display:flex; flex-direction:column; gap:4px; margin-top:8px; }
.cv8-frame{ border:1.5px solid var(--graphite); border-radius:8px; padding:4px 7px; background:var(--paper); font-size:.85rem; transition:opacity .4s, box-shadow .4s; }
.cv8-frame.top{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); }
.cv8-frame.gone{ opacity:.4; border-style:dashed; text-decoration:line-through; }
.cv8-frame b{ font-size:.8rem; color:var(--graphite); margin-right:6px; }
.cv8-ll{ display:flex; flex-wrap:wrap; gap:4px 6px; align-items:center; }
.cv8-arw{ color:var(--graphite); font:600 .9rem var(--mono); }
.cv8-it{ display:inline-grid; place-items:center; min-width:26px; height:28px; padding:0 5px; border-radius:6px; border:1px solid var(--line); background:var(--paper); font:700 .92rem var(--mono); transition:background .3s, box-shadow .3s, opacity .3s; }
.cv8-it.seen{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.cv8-it.cur{ box-shadow:0 0 0 2px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 32%, var(--paper)); }
.cv8-it.hit{ background:var(--ok); color:#fff; border-color:transparent; }
.cv8-bst text{ font:700 15px var(--mono); }
.cv8-bst .nd{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.5; transition:fill .3s, stroke .3s; }
.cv8-bst .nd.seen{ fill:color-mix(in srgb, var(--k-compiler) 18%, var(--paper)); }
.cv8-bst .nd.cur{ stroke:var(--k-compiler); stroke-width:3; fill:color-mix(in srgb, var(--k-compiler) 34%, var(--paper)); }
.cv8-bst .nd.hit{ fill:var(--ok); stroke:var(--ok); }
.cv8-bst text.hit{ fill:#fff; }
.cv8-bst line{ stroke:var(--graphite); stroke-width:1.5; }
.cv8-ht{ display:grid; grid-template-columns:auto minmax(0, 1fr); gap:4px 6px; align-items:center; }
.cv8-bk{ font:700 .82rem var(--mono); color:var(--graphite); text-align:right; }
.cv8-slots{ display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); gap:3px; margin-top:4px; }
.cv8-slot{ border:1px solid var(--line); border-radius:5px; min-height:44px; background:var(--paper-2); padding:2px; display:flex; flex-direction:column; gap:2px; align-items:stretch; transition:box-shadow .4s; }
.cv8-slot.cur{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv8-slot > i{ font:600 .75rem var(--mono); color:var(--graphite); text-align:center; font-style:normal; }
.cv8-slot > span{ font:700 .78rem var(--mono); text-align:center; background:var(--paper); border:1px solid var(--line); border-radius:4px; padding:0 1px; overflow-wrap:anywhere; }
.cv8-slot > span.hit{ background:var(--ok); color:#fff; border-color:transparent; }
.cv8-cnt{ text-align:center; font-weight:700; color:var(--k-compiler); font-size:.9rem; margin-top:6px; }
.cv8-keys{ display:grid; grid-template-columns:auto minmax(0, 1fr); gap:3px 8px; font-size:.84rem; align-items:center; }
.cv8-keys code{ font:700 .88rem var(--mono); border:1px solid var(--line); border-radius:5px; padding:1px 6px; background:var(--paper); text-align:center; transition:box-shadow .3s, background .3s; }
.cv8-keys code.cur{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv8-keys code.hit{ background:var(--ok); color:#fff; border-color:transparent; }
.cv8-keys code.miss{ background:color-mix(in srgb, var(--pen) 18%, var(--paper)); text-decoration:line-through; }
.cv8-badge{ display:inline-block; font:700 .86rem var(--mono); border-radius:6px; padding:2px 8px; background:var(--fig-s); color:#fff; }
.cv8-rec{ display:inline-flex; border:1.5px solid var(--graphite); border-radius:5px; overflow:hidden; font:700 .8rem var(--mono); transition:box-shadow .4s, opacity .4s; }
.cv8-rec span{ padding:2px 5px; border-left:1px solid var(--line); } .cv8-rec span:first-child{ border-left:0; }
.cv8-rec.new{ box-shadow:0 0 0 2px var(--ok); }
.cv8-rec.use{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv8-rec.del{ opacity:.4; border-style:dashed; text-decoration:line-through; }
.cv8-lrow{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; margin-top:5px; }
.cv8-lrow > b{ font:800 1rem var(--mono); color:var(--k-compiler); min-width:16px; }
.cv8-dl{ display:grid; gap:6px; }
.cv8-dl > div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.86rem; line-height:1.4; transition:opacity .4s, box-shadow .4s; }
.cv8-dl > div.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv8-dl > div > b{ display:block; font-size:.8rem; color:var(--graphite); text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px; }
.cv8-dl .cv8-two{ margin-top:0; gap:6px; }
.cv8-dl .cv8-two > span{ min-width:0; }
.cv8-dl .cv8-two > span > i{ display:block; font-style:normal; font-weight:700; color:var(--k-compiler); font-size:.8rem; }
@media (max-width:400px){ .cv8-dl .cv8-two{ grid-template-columns:minmax(0, 1fr); } }
@media (prefers-reduced-motion: reduce){ .cv8-ln, .cv8-var, .cv8-tbl td, .cv8-it, .cv8-bst .nd, .cv8-frame, .cv8-rec, .cv8-chip{ transition:none; } }
`;
  if (!document.getElementById('cv8-css')) { const s = document.createElement('style'); s.id = 'cv8-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi>${s}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = v => Number.isInteger(v) ? String(v) : v.toFixed(5) + '…';
  // a code line with one substring marked: mark(line, [from, len], className)
  const marked = (s, at, cls) => !at ? s : html`${s.slice(0, at[0])}<span className=${cls}>${s.slice(at[0], at[0] + at[1])}</span>${s.slice(at[0] + at[1])}`;

  /* ───────── [0] binding and scope on the lecture's example ───────── */
  // segments: plain strings, or ['x', 'o' | 'i'] for the outer / inner x
  const BIND = [
    ['{'],
    [' int ', ['x', 'o'], ' = 1; int y = 2;'],
    [' {'],
    ['  double ', ['x', 'i'], ' = 3.14159265358979;'],
    ['  y += (int)', ['x', 'i'], ';'],
    [' }'],
    [' y += (int)', ['x', 'o'], ';'],
    ['}']
  ];
  const OUTV = [0, 1, 1, 0, 0, 0, 1, 1], INV = [0, 0, 0, 1, 1, 1, 0, 0];
  function Binding({ ar }) {
    const steps = [
      { en: '<b>Binding</b> connects a declaration and its uses. Each use of <b>x</b> is bound to one declaration: the <span class="cv8-xo">outer x</span> or the <span class="cv8-xi">inner x</span>.', ar: 'الـ <b>binding</b> بيربط الـ declaration بالـ uses بتوعه. كل use للـ <b>x</b> مربوط بـ declaration واحد: الـ <span class="cv8-xo">x اللي برّه</span> أو الـ <span class="cv8-xi">x اللي جوه</span>.' },
      { en: 'The <b>scope</b> of an identifier is the portion of the program where it is accessible. The bar shows where the <span class="cv8-xo">outer x</span> is accessible: from its declaration to the last brace, except the inner block.', ar: 'الـ <b>scope</b> بتاع الـ identifier هو الجزء من البرنامج اللي تقدر توصله فيه. الشريط بيوضح الـ <span class="cv8-xo">x اللي برّه</span> متاح فين: من الـ declaration بتاعه لحد آخر قوس، ما عدا الـ block الداخلي.' },
      { en: 'The same identifier <b>x</b> refers to different things in different parts of the program. The two scopes of x (two bars) <b>do not overlap</b>.', ar: 'نفس الـ identifier اللي هو <b>x</b> بيشاور على حاجات مختلفة في أجزاء مختلفة من البرنامج. والـ 2 scopes بتوع الـ x (الشريطين) <b>مش بيتداخلوا</b>.' },
      { en: 'An identifier may have <b>restricted scope</b>: the <span class="cv8-xi">inner x</span> is accessible only between the inner braces.', ar: 'الـ identifier ممكن يكون الـ scope بتاعه <b>محدود</b>: الـ <span class="cv8-xi">x اللي جوه</span> متاح بس بين القوسين الداخليين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '400px' }}>
      <div className="cv8-code" role="img" aria-label="The lecture's scoping example with the scope of the outer and inner x">
        ${BIND.map((segs, k) => html`<div key=${k} className=${'cv8-ln' + (i === 3 && k >= 2 && k <= 5 ? ' blk' : '')}>
          <span className=${'cv8-g' + (i >= 1 && OUTV[k] ? ' o' : '')}></span><span className=${'cv8-g' + (i >= 2 && INV[k] ? ' i' : '')}></span>
          <code>${segs.map((s, j) => typeof s === 'string' ? s : html`<span key=${j} className=${(s[1] === 'o' ? 'cv8-xo' : 'cv8-xi') + (i === 0 ? ' cv8-mk' : '')}>${s[0]}</span>`)}</code></div>`)}
      </div>
      <div className="cv8-leg"><span><i style=${{ background: 'var(--k-compiler)' }}></i>outer x (int, 1)</span><span><i style=${{ background: 'var(--ok)' }}></i>inner x (double)</span></div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [1] static vs dynamic binding ───────── */
  const SD_ROWS = [
    ['Rule', 'Scoping based on the structure of the syntax tree (i.e. braces / blocks).', 'The declaration most recently encountered during execution defines the current use of the name.'],
    ['Depends on', 'Only the program text, not run-time behaviour.', 'The execution of the program. The compiler/interpreter walks up the symbol-table stack to find the right instance.'],
    ['Languages', 'Most languages: Java, C.', 'A few: Lisp, SNOBOL, Perl (via keywords).'],
    ['When', 'Resolved at compile time.', 'Cannot be resolved at compile time.']
  ];
  function StaticDynamic({ ar }) {
    const steps = [
      { en: 'Which <b>x</b> does the last line <code>y += (int)x;</code> of the lecture example use? The two kinds of binding answer differently.', ar: 'السطر الأخير في مثال المحاضرة بيستخدم أنهي <b>x</b>؟ نوعين الـ binding بيجاوبوا إجابات مختلفة.<span class="ltr">y += (int)x;</span>' },
      { en: '<b>Static</b>: look at the braces. The use sits in the outer block, so it is the outer <b>x = 1</b>. <b>Dynamic</b>: the declaration most recently encountered while running is the inner <b>x = 3.14…</b>.', ar: 'في الـ <b>static</b> بنبص على الأقواس: الـ use موجود في الـ block الخارجي، فده الـ <bdi>x = 1</bdi> اللي برّه. وفي الـ <b>dynamic</b> آخر declaration اتقابل وقت التنفيذ هو الـ x اللي جوه وقيمته <bdi>3.14…</bdi>.' },
      { en: 'Static depends only on the program text. Dynamic depends on the execution: the compiler/interpreter <b>walks up the symbol-table stack</b> from the top and takes the first x it meets.', ar: 'الـ static معتمد على نص البرنامج بس. والـ dynamic معتمد على التنفيذ: الـ compiler/interpreter <b>بيطلع في الـ symbol-table stack</b> من فوق وياخد أول x يقابله.' },
      { en: 'Most languages are static (Java, C). A few are dynamic: Lisp, SNOBOL, and Perl through certain keywords.', ar: 'معظم اللغات static زي Java و C. وقليل منها dynamic زي Lisp و SNOBOL، والـ Perl من خلال keywords معينة.' },
      { en: 'Static binding is <b>resolved at compile time</b>. Dynamic binding, by its nature, <b>cannot be resolved at compile time</b>.', ar: 'الـ static binding <b>بيتحدد وقت الـ compile</b>. والـ dynamic binding بطبيعته <b>مينفعش يتحدد وقت الـ compile</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const rowOn = k => k === 0 ? i >= 1 : k === 1 ? i >= 2 : k === 2 ? i >= 3 : i >= 4;
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap">
      <div className="cv8-two" style=${{ marginTop: 0 }}>
        <div className=${'cv8-pan' + (i >= 1 ? ' on' : '')}><span className="cv8-ph">Static</span>
          <div className="cv8-code" style=${{ padding: '3px' }}>
            <code style=${{ display: 'block', paddingLeft: '3px' }}>{ int x = 1;</code>
            <div className="cv8-blk" style=${{ marginLeft: '6px' }}><code style=${{ display: 'block', paddingLeft: '3px' }}>{ double x … }</code></div>
            <div className=${'cv8-ln' + (i >= 1 ? ' on' : '')}><code>y += (int)x;</code></div>
            <code style=${{ display: 'block', paddingLeft: '3px' }}>}</code>
          </div>
          <div className=${'cv8-out ' + pop(i >= 1)}>x = 1 (outer)</div>
        </div>
        <div className=${'cv8-pan' + (i >= 1 ? ' on' : '')}><span className="cv8-ph">Dynamic</span>
          <div className="cv8-stack" style=${{ marginTop: 0 }}>
            <div className=${'cv8-var' + (i >= 1 ? ' used' : '')}>x = 3.14…<small>most recent</small></div>
            <div className="cv8-var">y = 5</div>
            <div className="cv8-var">x = 1</div>
          </div>
          <div className=${'cv8-out ' + pop(i >= 1)}>x = 3 (inner)</div>
        </div>
      </div>
      <div className="cv8-dl" style=${{ marginTop: '10px' }}>${SD_ROWS.map((r, k) => rowOn(k) && html`<div key=${k} className=${i === k + 1 ? 'on' : ''}><b>${r[0]}</b>
        <div className="cv8-two"><span><i>Static</i>${r[1]}</span><span><i>Dynamic</i>${r[2]}</span></div></div>`)}</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [2] run the course's programs with static and dynamic binding ───────── */
  // line kinds: open, close, decl (d: [[name, value, shown]]), op (n op= r, cast), print (names, style)
  const O = '{', C = '}';
  const PROGS = {
    lec: { b: 'Lecture', lines: [
      { s: '{', t: O }, { s: '  int x = 1; int y = 2;', t: 'decl', d: [['x', 1], ['y', 2]] }, { s: '  {', t: O },
      { s: '    double x = 3.14159265358979;', t: 'decl', d: [['x', 3.14159265358979]] }, { s: '    y += (int)x;', t: 'op', n: 'y', op: '+=', r: 'x', cast: 1 },
      { s: '  }', t: C }, { s: '  y += (int)x;', t: 'op', n: 'y', op: '+=', r: 'x', cast: 1 }, { s: '}', t: C }] },
    rev: { b: 'Revision sheet', lines: [
      { s: '{', t: O }, { s: '  int x = 1; int y = 2;', t: 'decl', d: [['x', 1], ['y', 2]] }, { s: '  {', t: O },
      { s: '    int x = 3;', t: 'decl', d: [['x', 3]] }, { s: '    y += x;', t: 'op', n: 'y', op: '+=', r: 'x' }, { s: '    cout << y;', t: 'print', p: ['y'] },
      { s: '  }', t: C }, { s: '  y += x;', t: 'op', n: 'y', op: '+=', r: 'x' }, { s: '  cout << y;', t: 'print', p: ['y'] }, { s: '}', t: C }] },
    qa: { b: 'Q&A', lines: [
      { s: 'int a = 10; int b = 20;', t: 'decl', d: [['a', 10], ['b', 20]] }, { s: '{', t: O }, { s: '  int a = 30;', t: 'decl', d: [['a', 30]] },
      { s: '  b *= a;', t: 'op', n: 'b', op: '*=', r: 'a' }, { s: '  cout << b;', t: 'print', p: ['b'] }, { s: '}', t: C },
      { s: 'b += a;', t: 'op', n: 'b', op: '+=', r: 'a' }, { s: 'cout << b;', t: 'print', p: ['b'] }] },
    q1: { b: 'Quiz 1', lines: [
      { s: '{', t: O }, { s: '  int i = 10, w = 20;', t: 'decl', d: [['i', 10], ['w', 20]] }, { s: '  {', t: O },
      { s: '    int i = 3;', t: 'decl', d: [['i', 3]] }, { s: '    w += i;', t: 'op', n: 'w', op: '+=', r: 'i' }, { s: '    cout << w;', t: 'print', p: ['w'] },
      { s: '  }', t: C }, { s: '  w += i;', t: 'op', n: 'w', op: '+=', r: 'i' }, { s: '  cout << w;', t: 'print', p: ['w'] }, { s: '}', t: C }] },
    q2: { b: 'Quiz 2', lines: [
      { s: 'int x = 1, y = 2;', t: 'decl', d: [['x', 1], ['y', 2]] }, { s: '{', t: O }, { s: '  int x = 3*2;', t: 'decl', d: [['x', 6]] },
      { s: '  y += x;', t: 'op', n: 'y', op: '+=', r: 'x' }, { s: '  print x, y', t: 'print', p: ['x', 'y'], lab: 1 }, { s: '}', t: C },
      { s: 'y += x;', t: 'op', n: 'y', op: '+=', r: 'x' }, { s: 'print x, y', t: 'print', p: ['x', 'y'], lab: 1 }] }
  };
  const own = (x, y, xi, op) => ({ b: 'Try your own', lines: [
    { s: '{', t: O }, { s: `  int x = ${x}; int y = ${y};`, t: 'decl', d: [['x', x], ['y', y]] }, { s: '  {', t: O },
    { s: `    int x = ${xi};`, t: 'decl', d: [['x', xi]] }, { s: `    y ${op} x;`, t: 'op', n: 'y', op, r: 'x' }, { s: '    cout << y;', t: 'print', p: ['y'] },
    { s: '  }', t: C }, { s: `  y ${op} x;`, t: 'op', n: 'y', op, r: 'x' }, { s: '  cout << y;', t: 'print', p: ['y'] }, { s: '}', t: C }] });

  // runs the program; dynamic = course convention: a block's declarations stay the most recent ones after the block ends
  function runProg(lines, dyn) {
    const vars = [], out = [], snaps = []; let depth = 0;
    const find = n => { for (let k = vars.length - 1; k >= 0; k--) if (vars[k].n === n && (dyn || vars[k].alive)) return vars[k]; return null; };
    lines.forEach(ln => {
      let used = null, info = {};
      if (ln.t === O) depth++;
      else if (ln.t === C) { info.closed = vars.filter(v => v.depth === depth && v.alive).map(v => v.n); vars.forEach(v => { if (v.depth === depth) v.alive = false; }); depth--; }
      else if (ln.t === 'decl') ln.d.forEach(([n, v]) => vars.push({ n, v, depth, alive: true, id: vars.length }));
      else if (ln.t === 'op') { const r = find(ln.r), t = find(ln.n); const rv = ln.cast ? Math.trunc(r.v) : r.v; t.v = ln.op === '+=' ? t.v + rv : t.v * rv; used = r.id; info = { rv, rawv: r.v, nv: t.v, inner: r.depth > 1 || (r.depth === 1 && lines[0].t !== O) }; }
      else if (ln.t === 'print') { const s = ln.lab ? ln.p.map(n => `${n}= ${fmt(find(n).v)}`).join(' ') : ln.p.map(n => fmt(find(n).v)).join(' '); out.push(s); info.s = s; }
      snaps.push({ vars: vars.map(v => Object.assign({}, v)), out: out.slice(), used, info, depth });
    });
    return snaps;
  }
  const stepCap = (P, k, S, Dy) => {
    const ln = P.lines[k], s = S[k], d = Dy[k], last = k === P.lines.length - 1, code = esc(ln.s.trim());
    let en, a;
    if (ln.t === O) { en = `<code>{</code> opens a new block (a new scope).`; a = `القوس ده بيفتح block جديد (scope جديد).${L('{')}`; }
    else if (ln.t === 'decl') {
      const list = ln.d.map(([n, v]) => `${n} = ${fmt(v)}`), shadow = ln.d.some(([n]) => S[k].vars.filter(v => v.n === n && v.alive).length > 1);
      en = `Declares ${list.join(' and ')} in the current block.` + (shadow ? ` It <b>hides</b> the outer ${ln.d[0][0]}.` : '');
      a = `بنعرّف ${list.map(D).join(' و ')} في الـ block الحالي.` + (shadow ? ` وده <b>بيخبّي</b> الـ ${ln.d[0][0]} اللي برّه.` : '');
    } else if (ln.t === 'op') {
      const r = ln.cast ? `(int)${ln.r}` : ln.r, same = s.info.rv === d.info.rv;
      if (same) { en = `<code>${code}</code>: both use ${r} = ${fmt(s.info.rv)}, so ${ln.n} = ${fmt(s.info.nv)}.`; a = `الاتنين بيستخدموا ${D(r + ' = ' + fmt(s.info.rv))} فالـ ${D(ln.n + ' = ' + fmt(s.info.nv))}.${L(code)}`; }
      else { en = `<code>${code}</code>: <b>static</b> uses the outer ${r} = ${fmt(s.info.rv)}, so ${ln.n} = ${fmt(s.info.nv)}. <b>Dynamic</b> uses the most recent ${r} = ${fmt(d.info.rv)}, so ${ln.n} = ${fmt(d.info.nv)}.`;
        a = `في الـ <b>static</b> بنستخدم الـ ${ln.r} اللي برّه ${D(r + ' = ' + fmt(s.info.rv))} فالـ ${D(ln.n + ' = ' + fmt(s.info.nv))}. وفي الـ <b>dynamic</b> بنستخدم آخر واحد ${D(r + ' = ' + fmt(d.info.rv))} فالـ ${D(ln.n + ' = ' + fmt(d.info.nv))}.${L(code)}`; }
    } else if (ln.t === 'print') {
      en = s.info.s === d.info.s ? `Prints <b>${esc(s.info.s)}</b> in both.` : `Prints <b>${esc(s.info.s)}</b> (static) and <b>${esc(d.info.s)}</b> (dynamic).`;
      a = s.info.s === d.info.s ? `بيطبع نفس الحاجة في الاتنين.${L(esc(s.info.s))}` : `بيطبع في الـ static وبعدها في الـ dynamic بالترتيب ده:${L(esc(s.info.s) + '  |  ' + esc(d.info.s))}`;
    } else if (s.depth >= 1 || (s.depth === 0 && P.lines[0].t !== O)) {
      const nm = s.info.closed.join(', ');
      en = `<code>}</code> ends the inner block. <b>Static</b>: the inner ${nm} is gone, the outer one is visible again. <b>Dynamic</b> (course convention): the inner ${nm} stays the most recently executed declaration, so it is still used.`;
      a = `القوس ده بيقفل الـ block الداخلي. في الـ <b>static</b> الـ ${nm} الداخلي خلص والخارجي رجع visible. وفي الـ <b>dynamic</b> (اتفاقية الكورس) الـ ${nm} الداخلي بيفضل آخر declaration اتنفّذ، فلسه بيتستخدم.`;
    } else { en = '<code>}</code> ends the program.'; a = 'القوس ده بيقفل البرنامج.'; }
    if (last) {
      const so = S[k].out, dout = Dy[k].out;
      if (so.length) { en += ` Output: static <b>${esc(so.join(', '))}</b>, dynamic <b>${esc(dout.join(', '))}</b>.`; a += ` الـ output في الـ static وبعده الـ dynamic بالترتيب ده:${L(esc(so.join(', ')) + '  |  ' + esc(dout.join(', ')))}`; }
      else { const n = P.lines.filter(l => l.t === 'op').pop().n, fs = S[k].vars.find(v => v.n === n).v, fd = Dy[k].vars.find(v => v.n === n).v; en += ` Final ${n}: static <b>${fs}</b>, dynamic <b>${fd}</b>.`; a += ` الـ ${n} النهائي في الـ static وبعده الـ dynamic بالترتيب ده:${L(fs + '  |  ' + fd)}`; }
    }
    return { en, ar: a };
  };
  function RunPanel({ title, snap, dyn, on }) {
    const vs = snap ? snap.vars.filter(v => dyn || v.alive) : [];
    return html`<div className=${'cv8-pan' + (on ? ' on' : '')}><span className="cv8-ph">${title}</span>
      ${vs.length ? vs.map(v => html`<div key=${v.id} className=${'cv8-var' + (snap.used === v.id ? ' used' : '') + (!v.alive ? ' dead' : '')}>${v.n} = ${fmt(v.v)}${!v.alive && html`<small>block ended, still most recent</small>`}</div>`) : html`<div className="cv8-muted" style=${{ textAlign: 'left', marginTop: 0 }}>no variables yet</div>`}
      <div className="cv8-out">${snap && snap.out.length ? 'Output: ' + snap.out.join(', ') : ''}</div></div>`;
  }
  function Run({ P, ar, head }) {
    const S = runProg(P.lines, false), Dy = runProg(P.lines, true);
    const steps = P.lines.map((_, k) => stepCap(P, k, S, Dy));
    const [i, ctl] = useSteps(steps.length, 2400);
    const t = P.lines[i].t, diff = t === 'op' && S[i].info.rv !== Dy[i].info.rv;
    return html`<div className="fig-stage"><div className="cv8-wrap">${head}
      <div className="cv8-code">${P.lines.map((l, k) => html`<div key=${k} className=${'cv8-ln' + (k === i ? ' on' : '') + (k > i ? ' dim' : '')}><code>${l.s}</code></div>`)}</div>
      <div className="cv8-two"><${RunPanel} title="Static" snap=${S[i]} dyn=${false} on=${diff} /><${RunPanel} title="Dynamic" snap=${Dy[i]} dyn=${true} on=${diff} /></div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function ScopeRun({ ar }) {
    const [ex, setEx] = useState('lec'), [v, setV] = useState({ x: 1, y: 2, xi: 3, op: '+=' });
    const num = (k, val) => { const n = Math.max(-99, Math.min(999, parseInt(val, 10) || 0)); setV(o => Object.assign({}, o, { [k]: n })); };
    const P = ex === 'own' ? own(v.x, v.y, v.xi, v.op) : PROGS[ex];
    const key = ex === 'own' ? `own-${v.x}-${v.y}-${v.xi}-${v.op}` : ex;
    const head = html`<div className="cv8-row">${Object.keys(PROGS).map(k => html`<button key=${k} className=${'fig-btn' + (ex === k ? ' cv8-sel' : '')} onClick=${() => setEx(k)}>${PROGS[k].b}</button>`)}
        <button className=${'fig-btn' + (ex === 'own' ? ' cv8-sel' : '')} onClick=${() => setEx('own')}>Try your own</button></div>
      ${ex === 'own' && html`<div className="cv8-row"><label className="cv8-lbl">outer x <input className="cv8-in" type="number" value=${v.x} onChange=${e => num('x', e.target.value)} /></label>
        <label className="cv8-lbl">y <input className="cv8-in" type="number" value=${v.y} onChange=${e => num('y', e.target.value)} /></label>
        <label className="cv8-lbl">inner x <input className="cv8-in" type="number" value=${v.xi} onChange=${e => num('xi', e.target.value)} /></label>
        <button className=${'fig-btn' + (v.op === '+=' ? ' cv8-sel' : '')} onClick=${() => setV(o => Object.assign({}, o, { op: '+=' }))}>+=</button><button className=${'fig-btn' + (v.op === '*=' ? ' cv8-sel' : '')} onClick=${() => setV(o => Object.assign({}, o, { op: '*=' }))}>*=</button></div>`}`;
    return html`<figure className="fig cv8"><${Run} key=${key} P=${P} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [3] symbol-table operations while walking the lecture example ───────── */
  const OPS_LINES = ['{', '  int x = 1; int y = 2;', '  {', '    double x = 3.14…;', '    y += (int)x;', '  }', '  y += (int)x;', '}'];
  const HI = ['enter scope', 'process a declaration', 'process a use', 'exit scope'];
  function SymOps({ ar }) {
    // ln, high-level op index, low-level calls [text, result: 'ok' | 'no' | ''], stack (bottom first) [[label, names]], gone
    const S = [
      { ln: 0, h: 0, c: [['enter_scope()', '']], st: [['scope 1', []]], en: '<code>{</code>: <b>enter scope</b>. <code>enter_scope()</code> starts a new nested scope.', ar: 'القوس ده معناه <b>enter scope</b>: الـ <code>enter_scope()</code> بتبدأ scope جديد nested.' },
      { ln: 1, h: 1, c: [['local_lookup(x)', 'no'], ['insert_symbol(x)', 'ok'], ['local_lookup(y)', 'no'], ['insert_symbol(y)', 'ok']], st: [['scope 1', ['x', 'y']]], en: '<b>Process a declaration</b>: <code>local_lookup</code> finds x and y are not yet in the local scope, then <code>insert_symbol</code> adds them to the table.', ar: 'بنعمل <b>process a declaration</b>: الـ <code>local_lookup</code> بتلاقي إن x و y مش موجودين في الـ local scope، وبعدين الـ <code>insert_symbol</code> بتضيفهم للـ table.' },
      { ln: 2, h: 0, c: [['enter_scope()', '']], st: [['scope 1', ['x', 'y']], ['scope 2', []]], en: 'The inner <code>{</code>: <b>enter scope</b> again, a nested scope on top.', ar: 'القوس الداخلي: <b>enter scope</b> تاني، scope nested فوق الأولاني.' },
      { ln: 3, h: 1, c: [['local_lookup(x)', 'no'], ['insert_symbol(x)', 'ok']], st: [['scope 1', ['x', 'y']], ['scope 2', ['x']]], en: '<code>local_lookup(x)</code> checks only the <b>local</b> scope: the outer x does not count, so the new x is inserted in scope 2.', ar: 'الـ <code>local_lookup(x)</code> بتدوّر في الـ scope <b>المحلي</b> بس: الـ x اللي برّه مش بيتحسب، فالـ x الجديد بيتضاف في scope 2.' },
      { ln: 4, h: 2, c: [['look_up(y)', 'ok'], ['look_up(x)', 'ok']], st: [['scope 1', ['x', 'y']], ['scope 2', ['x']]], f: 'x', en: '<b>Process a use</b>: <code>look_up</code> finds the current x via the scoping rules: the x of scope 2. y is found in scope 1.', ar: 'بنعمل <b>process a use</b>: الـ <code>look_up</code> بتلاقي الـ x الحالي بالـ scoping rules: الـ x بتاع scope 2. والـ y بيتلاقي في scope 1.' },
      { ln: 5, h: 3, c: [['exit_scope()', '']], st: [['scope 1', ['x', 'y']], ['scope 2', ['x'], 1]], en: '<code>}</code>: <b>exit scope</b>. <code>exit_scope()</code> exits the current scope; its x is no longer visible.', ar: 'القوس ده معناه <b>exit scope</b>: الـ <code>exit_scope()</code> بتخرج من الـ scope الحالي، والـ x بتاعه مبقاش visible.' },
      { ln: 6, h: 2, c: [['look_up(y)', 'ok'], ['look_up(x)', 'ok']], st: [['scope 1', ['x', 'y']]], f: 'x1', en: '<b>Process a use</b> again: now <code>look_up(x)</code> finds the outer x (static scoping).', ar: 'بنعمل <b>process a use</b> تاني: دلوقتي الـ <code>look_up(x)</code> بتلاقي الـ x اللي برّه (static scoping).' },
      { ln: 7, h: 3, c: [['exit_scope()', '']], st: [['scope 1', ['x', 'y'], 1]], en: 'The last <code>}</code>: <b>exit scope</b> for the outer block too.', ar: 'آخر قوس: <b>exit scope</b> للـ block الخارجي كمان.' }
    ];
    const [i, ctl] = useSteps(S.length, 3000), s = S[i];
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '420px' }}>
      <div className="cv8-code">${OPS_LINES.map((l, k) => html`<div key=${k} className=${'cv8-ln' + (k === s.ln ? ' on' : '') + (k > s.ln ? ' dim' : '')}><code>${l}</code></div>`)}</div>
      <div className="cv8-ops">
        <div className="cv8-op"><span className="cv8-lbl">High level:</span>${HI.map((h, k) => html`<span key=${k} className=${'cv8-chip' + (k === s.h ? ' on' : '')} style=${{ opacity: k === s.h ? 1 : .5 }}>${h}</span>`)}</div>
        <div className="cv8-op"><span className="cv8-lbl">Low level:</span>${s.c.map(([c, r], k) => html`<span key=${k} className=${'cv8-chip m' + (r ? ' ' + r : '')}>${c}${r === 'no' ? ' → not found' : r === 'ok' && /^look/.test(c) ? ' → found' : ''}</span>`)}</div>
      </div>
      <div className="cv8-stack" style=${{ flexDirection: 'column-reverse' }}>${s.st.map(([lab, ns, gone], k) => html`<div key=${k} className=${'cv8-frame' + (gone ? ' gone' : k === s.st.length - 1 ? ' top' : '')}><b>${lab}</b>${ns.length ? ns.map((n, j) => html`<span key=${j} className=${'cv8-chip m' + ((s.f === 'x' && k === 1 && n === 'x') || (s.f === 'x1' && k === 0 && n === 'x') ? ' on' : '')} style=${{ marginRight: '4px' }}>${n}</span>`) : html`<span className="cv8-lbl">empty</span>`}</div>`)}</div>
    </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [4] four ways to implement a symbol table ───────── */
  const IDS = ['y', 'x', 'a', 'd', 'c', 'b', 'w', 'i'];
  const SORTED = IDS.slice().sort();
  const pos = c => c.charCodeAt(0) - 96, HB = c => pos(c) % 5;
  const BUCKETS = [0, 1, 2, 3, 4].map(b => IDS.filter(c => HB(c) === b));
  const BST = (() => { const T = {}; let root = null; IDS.forEach(c => { T[c] = { c, l: null, r: null, d: 0 }; if (!root) { root = c; return; } let p = root, d = 1; for (;;) { const k = c < p ? 'l' : 'r'; if (!T[p][k]) { T[p][k] = c; T[c].d = d; T[c].p = p; break; } p = T[p][k]; d++; } }); return { T, root }; })();
  const probes = (m, t) => {
    if (m === 'un') { const k = IDS.indexOf(t); return k < 0 ? IDS.slice() : IDS.slice(0, k + 1); }
    if (m === 'ord') { const out = []; for (const c of SORTED) { out.push(c); if (c >= t) break; } return out; }
    if (m === 'bst') { const out = []; let p = BST.root; while (p) { out.push(p); if (p === t) break; p = BST.T[p][t < p ? 'l' : 'r']; } return out; }
    const b = BUCKETS[HB(t)], k = b.indexOf(t); return k < 0 ? b.slice() : b.slice(0, k + 1);
  };
  const MODES = [['un', 'Unordered list'], ['ord', 'Ordered list'], ['bst', 'Binary search tree'], ['hash', 'Hash table']];
  function Impl({ ar }) {
    const [m, setM] = useState('hash'), [t, setT] = useState('i'), [k, setK] = useState(calm() ? 99 : 0);
    const P = probes(m, t), found = P[P.length - 1] === t, n = Math.min(k, P.length), done = k >= P.length;
    useEffect(() => { if (done) return; const h = setTimeout(() => setK(x => x + 1), 650); return () => clearTimeout(h); }, [k, m, t]);
    const go = (mm, tt) => { setM(mm); setT(tt); setK(calm() ? 99 : 0); };
    const cls = c => { const j = P.indexOf(c); if (j < 0 || j >= n) return ''; if (j === n - 1) return done && found ? ' hit' : ' cur'; return ' seen'; };
    let body;
    if (m === 'un' || m === 'ord') { const arr = m === 'un' ? IDS : SORTED; body = html`<div className="cv8-ll" style=${{ justifyContent: 'center' }}>${arr.map((c, j) => html`<span key=${c} style=${{ display: 'contents' }}><span className=${'cv8-it' + cls(c)}>${c}</span>${j < arr.length - 1 && html`<span className="cv8-arw">→</span>`}</span>`)}</div>`; }
    else if (m === 'bst') {
      const X = c => 18 + SORTED.indexOf(c) * 36, Y = c => 20 + BST.T[c].d * 42, cs = IDS;
      const nc = c => { const s = cls(c); return s.trim(); };
      body = html`<svg className="cv8-bst" viewBox="0 0 288 ${Y('b') + 22}" role="img" aria-label="Binary search tree of the identifiers">
        ${cs.filter(c => BST.T[c].p).map(c => html`<line key=${'e' + c} x1=${X(BST.T[c].p)} y1=${Y(BST.T[c].p)} x2=${X(c)} y2=${Y(c)} />`)}
        ${cs.map(c => html`<g key=${c}><circle className=${'nd ' + nc(c)} cx=${X(c)} cy=${Y(c)} r="15" /><text className=${nc(c) === 'hit' ? 'hit' : ''} x=${X(c)} y=${Y(c) + 5} textAnchor="middle">${c}</text></g>`)}</svg>`;
    } else body = html`<div className="cv8-ht">${BUCKETS.map((b, j) => html`<span key=${'k' + j} style=${{ display: 'contents' }}><span className="cv8-bk" style=${{ color: HB(t) === j && n > 0 ? 'var(--k-compiler)' : '' }}>[${j}]</span>
      <span className="cv8-ll">${b.length ? b.map((c, q) => html`<span key=${c} style=${{ display: 'contents' }}><span className=${'cv8-it' + cls(c)}>${c}</span>${q < b.length - 1 && html`<span className="cv8-arw">→</span>`}</span>`) : html`<span className="cv8-lbl">empty</span>`}</span></span>`)}</div>`;
    const how = { un: 'checks the items one by one in insertion order', ord: 'walks the sorted list and can stop once it passes the place where the name would be', bst: 'compares with a node and goes left or right', hash: `computes the bucket first (here an example hash: letter position mod 5, so ${t} → ${pos(t)} mod 5 = ${HB(t)}) and checks only that bucket` }[m];
    const howA = { un: 'بيبص على العناصر واحد واحد بترتيب الإضافة', ord: 'بيمشي في الـ list المترتبة ويقدر يقف أول ما يعدّي مكان الاسم', bst: 'بيقارن بالـ node ويروح شمال أو يمين', hash: `بيحسب الـ bucket الأول (هنا hash كمثال: ترتيب الحرف mod 5) وبيدوّر في الـ bucket ده بس${L(`${t} → ${pos(t)} mod 5 = ${HB(t)}`)}` }[m];
    const res = done ? (found ? `found after <b>${P.length}</b> comparison${P.length > 1 ? 's' : ''}` : `not in the table after <b>${P.length}</b> comparison${P.length !== 1 ? 's' : ''}`) : 'searching…';
    const resA = done ? (found ? `لقاه بعد <b>${P.length}</b> مقارنة` : `مش موجود في الـ table بعد <b>${P.length}</b> مقارنة`) : 'بيدوّر…';
    const en = `<b>${MODES.find(x => x[0] === m)[1]}</b>: look_up(${t}) ${how}: ${res}. Hash tables are the most common way to implement symbol tables.`;
    const a = `في الـ <b>${MODES.find(x => x[0] === m)[1]}</b> الـ look_up بتاع ${t} ${howA} ${resA}. والـ hash tables هي الأشهر في تنفيذ الـ symbol tables.`;
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '420px' }}>
      <div className="cv8-row">${MODES.map(([k2, b]) => html`<button key=${k2} className=${'fig-btn' + (m === k2 ? ' cv8-sel' : '')} onClick=${() => go(k2, t)}>${b}</button>`)}</div>
      <div className="cv8-row"><span className="cv8-lbl">look_up:</span>${SORTED.concat('z').map(c => html`<button key=${c} className=${'fig-btn' + (t === c ? ' cv8-sel' : '')} style=${{ fontFamily: 'var(--mono)', minWidth: '34px', padding: '4px 8px' }} onClick=${() => go(m, c)}>${c}</button>`)}</div>
      ${body}
      <div className="cv8-cnt">${done ? (found ? `look_up(${t}): found, ${P.length} comparison${P.length > 1 ? 's' : ''}` : `look_up(${t}): not found, ${P.length} comparison${P.length !== 1 ? 's' : ''}`) : `look_up(${t})…`}</div>
      <p className="cv8-muted">Identifiers from this lecture's examples, inserted in the order y, x, a, d, c, b, w, i.</p>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setK(calm() ? 99 : 0)}>↻ Replay</button></div></figure>`;
  }

  /* ───────── [5] one symbol table per scope: the slides' walkthrough ───────── */
  const PS_LINES = ['{ int a, b, c;', '  a = 0; b = 0; c = 0;', '  { int c, d;', '    c = a + 1;', '    d = c; }', '  { string a; int c;', '    print c; }', '  print d', '}'];
  const PS_BLK = { 2: 2, 3: 2, 4: 2, 5: 3, 6: 3 };
  // e: event lines [label, text, cls?]; act: list of mutations
  const PS = [
    { ln: 0, at: '{', ev: [['Event', 'enter new block'], ['Action', 'Create Symbol Table ST1']], mk: ['ST1'], en: 'Enter <b>Block 1</b>: create symbol table <b>ST1</b> with the columns Symb, Token, Dtype, Init?.', ar: 'بندخل <b>Block 1</b>: بنعمل الـ symbol table <b>ST1</b> بالأعمدة Symb و Token و Dtype و Init?.' },
    { ln: 0, at: 'int a, b, c;', ev: [['Event', 'recognise type dec'], ['Action', 'Add to current symbol table']], add: ['ST1', [['a', 'Int'], ['b', 'Int'], ['c', 'Int']]], en: 'Type declaration: add <b>a, b, c</b> to the current table ST1 (Token id, Dtype int, Init? No).', ar: 'الـ type declaration: بنضيف <b>a و b و c</b> للـ table الحالية ST1 (الـ Token هو id والـ Dtype هو int والـ Init? هو No).' },
    { ln: 1, at: 'a = 0;', ev: [['Event', 'variable assignment'], ['Query', 'Found in current ST? Yes', 'yes'], ['Action', 'Mark as initiated']], init: ['ST1', 'a'], en: '<b>a = 0</b>: found in the current ST? Yes, so mark a as initiated.', ar: 'في <bdi>a = 0</bdi> الـ a موجود في الـ ST الحالية؟ Yes، فبنعلّمه initiated.' },
    { ln: 1, at: 'b = 0;', ev: [['Event', 'variable assignment'], ['Query', 'Found in current ST? Yes', 'yes'], ['Action', 'Mark as initiated']], init: ['ST1', 'b'], en: '<b>b = 0</b>: found in the current ST? Yes, so mark b as initiated.', ar: 'في <bdi>b = 0</bdi> الـ b موجود في الـ ST الحالية؟ Yes، فبنعلّمه initiated.' },
    { ln: 1, at: 'c = 0;', ev: [['Event', 'variable assignment'], ['Query', 'Found in current ST? Yes', 'yes'], ['Action', 'Mark as initiated']], init: ['ST1', 'c'], en: '<b>c = 0</b>: found in the current ST? Yes, so mark c as initiated.', ar: 'في <bdi>c = 0</bdi> الـ c موجود في الـ ST الحالية؟ Yes، فبنعلّمه initiated.' },
    { ln: 2, at: '{', ev: [['Event', 'Enter new block'], ['Action', 'Create new Symb Table ST2']], mk: ['ST2'], en: 'Enter <b>Block 2</b>: create a new symbol table <b>ST2</b>. Its parent is ST1.', ar: 'بندخل <b>Block 2</b>: بنعمل symbol table جديدة <b>ST2</b>، والـ parent بتاعها ST1.' },
    { ln: 2, at: 'int c, d;', ev: [['Event', 'recognise type dec'], ['Action', 'Add to current symbol table']], add: ['ST2', [['c', 'Int'], ['d', 'Int']]], en: 'Type declaration: add <b>c, d</b> to the current table ST2 (Init? No). This c is a different c from ST1’s.', ar: 'الـ type declaration: بنضيف <b>c و d</b> للـ table الحالية ST2 (الـ Init? هو No). والـ c ده غير الـ c اللي في ST1.' },
    { ln: 3, at: 'c', ev: [['Event', 'variable assignment (c)'], ['Query', 'Found in current ST? Yes', 'yes'], ['Action', 'Mark as initiated']], init: ['ST2', 'c'], en: '<b>c = a + 1</b>, the assignment to <b>c</b>: found in the current ST (ST2)? Yes, so mark ST2’s c as initiated.', ar: 'في <bdi>c = a + 1</bdi> الـ assignment للـ <b>c</b>: موجود في الـ ST الحالية (ST2)؟ Yes، فبنعلّم الـ c بتاع ST2 إنه initiated.' },
    { ln: 3, at: 'a', from: 5, ev: [['Event', 'variable reference to a'], ['Query', 'Found in current ST? NO', 'no'], ['Query', 'Found in parent ST? YES', 'yes'], ['Query', 'Initiated in parent ST? YES', 'yes']], q: [['ST1', 'a']], en: 'The reference to <b>a</b>: not in ST2, so look in the parent <b>ST1</b>: found, and it is initiated.', ar: 'الـ reference للـ <b>a</b>: مش في ST2، فبندوّر في الـ parent اللي هي <b>ST1</b>: لقيناه وهو initiated.' },
    { ln: 4, at: 'd = c;', ev: [['Event', 'variable assignment (d)'], ['Query', 'Found in current ST? Yes', 'yes'], ['Action', 'Mark as initiated'], ['Event', 'variable reference to c'], ['Query', 'Found in current ST? Yes, initiated', 'yes']], init: ['ST2', 'd'], q: [['ST2', 'c']], en: 'Continuing the same way (the slides stop at c = a + 1): <b>d = c</b> marks d as initiated in ST2, and c is found in ST2, initiated.', ar: 'بنكمّل بنفس الطريقة (السلايدز وقفت عند <bdi>c = a + 1</bdi>): الـ <bdi>d = c</bdi> بيعلّم الـ d إنه initiated في ST2، والـ c بيتلاقي في ST2 وهو initiated.' },
    { ln: 4, at: '}', last: 1, ev: [['Event', 'exit block'], ['Action', 'exit_scope(): close ST2, back to ST1']], close: 'ST2', en: '<b>}</b> ends Block 2: exit the scope, so ST2 is closed and ST1 is current again.', ar: 'القوس ده بيقفل Block 2: بنعمل exit للـ scope، فالـ ST2 بتتقفل والـ ST1 ترجع هي الحالية.' },
    { ln: 5, at: '{', ev: [['Event', 'Enter new block'], ['Action', 'Create new Symb Table ST3']], mk: ['ST3'], en: 'Enter <b>Block 3</b>: create <b>ST3</b>, whose parent is ST1.', ar: 'بندخل <b>Block 3</b>: بنعمل <b>ST3</b>، والـ parent بتاعها ST1.' },
    { ln: 5, at: 'string a; int c;', ev: [['Event', 'recognise type dec'], ['Action', 'Add to current symbol table']], add: ['ST3', [['a', 'String'], ['c', 'Int']]], en: 'Type declarations: add <b>a</b> (string) and <b>c</b> (int) to ST3.', ar: 'الـ type declarations: بنضيف <b>a</b> (string) و <b>c</b> (int) لـ ST3.' },
    { ln: 6, at: 'print c;', ev: [['Event', 'variable reference to c'], ['Query', 'Found in current ST? Yes (ST3’s c, Init? No)', 'yes']], q: [['ST3', 'c']], en: '<b>print c</b>: c is found in the current table ST3 (its Init? is No).', ar: 'في <bdi>print c</bdi> الـ c بيتلاقي في الـ table الحالية ST3 (والـ Init? بتاعه No).' },
    { ln: 6, at: '}', last: 1, ev: [['Event', 'exit block'], ['Action', 'exit_scope(): close ST3, back to ST1']], close: 'ST3', en: '<b>}</b> ends Block 3: ST3 is closed and ST1 is current again.', ar: 'القوس ده بيقفل Block 3: الـ ST3 بتتقفل والـ ST1 ترجع هي الحالية.' },
    { ln: 7, at: 'print d', ev: [['Event', 'variable reference to d'], ['Query', 'Found in current ST (ST1)? NO', 'no'], ['Query', 'ST1 has no parent: d is not visible', 'no']], en: '<b>print d</b> is outside Block 2: d is not in ST1 and ST1 has no parent, so d is <b>not visible</b>. This is an out-of-scope access.', ar: 'الـ <bdi>print d</bdi> برّه Block 2: الـ d مش في ST1 والـ ST1 ملهاش parent، فالـ d <b>مش visible</b>. ده access لمتغير out-of-scope.' }
  ];
  const PS_STATES = (() => { const st = {}, order = [], out = []; PS.forEach(s => {
    const chg = new Set(), q = new Set();
    if (s.mk) { st[s.mk[0]] = { rows: [], closed: false }; order.push(s.mk[0]); }
    if (s.add) s.add[1].forEach(([n, t]) => { st[s.add[0]].rows.push({ n, t, init: 'No' }); chg.add(s.add[0] + n); });
    if (s.init) { st[s.init[0]].rows.find(r => r.n === s.init[1]).init = 'Yes'; chg.add(s.init[0] + s.init[1] + 'i'); }
    if (s.q) s.q.forEach(([t, n]) => q.add(t + n));
    if (s.close) st[s.close].closed = true;
    out.push({ order: order.slice(), st: JSON.parse(JSON.stringify(st)), chg, q });
  }); return out; })();
  function PerScope({ ar }) {
    const [i, ctl] = useSteps(PS.length, 2600), s = PS[i], S = PS_STATES[i];
    const cur = S.order.filter(n => !S.st[n].closed).pop();
    const line = (k) => { const l = PS_LINES[k]; let at = null; if (k === s.ln) { const f = s.last ? l.lastIndexOf(s.at) : l.indexOf(s.at, s.from || 0); at = [f, s.at.length]; } return html`<div key=${k} className=${'cv8-ln' + (k === s.ln ? ' on' : '')}><code>${marked(l, at, 'cv8-hl')}</code></div>`; };
    const blk = (n, ks) => html`<div className=${'cv8-blk' + (PS_BLK[s.ln] === n ? ' on' : '')}><span className="cv8-tag">Block ${n}</span>${ks.map(line)}</div>`;
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '440px' }}>
      <div className="cv8-code" style=${{ position: 'relative' }}><span className="cv8-tag">Block 1</span>${line(0)}${line(1)}${blk(2, [2, 3, 4])}${blk(3, [5, 6])}${line(7)}${line(8)}</div>
      <div className="cv8-ev" aria-live="polite">${s.ev.map(([k, t, c], j) => html`<div key=${j}><b>${k}:</b> <span className=${c || ''}>${t}</span></div>`)}</div>
      ${S.order.map(n => html`<div key=${n} className=${'cv8-st' + (S.st[n].closed ? ' off' : '')}><b>${n}</b><span>${S.st[n].closed ? 'closed' : n === cur ? 'current' : 'parent'}</span>
        <table className="cv8-tbl"><thead><tr><th>Symb</th><th>Token</th><th>Dtype</th><th>Init?</th></tr></thead><tbody>
        ${S.st[n].rows.map(r => html`<tr key=${r.n}><td className=${S.chg.has(n + r.n) ? 'new' : S.q.has(n + r.n) ? 'q' : ''}>${r.n}</td><td className=${S.chg.has(n + r.n) ? 'new' : ''}>Id</td><td className=${S.chg.has(n + r.n) ? 'new' : ''}>${r.t}</td><td className=${S.chg.has(n + r.n) || S.chg.has(n + r.n + 'i') ? 'new' : S.q.has(n + r.n) ? 'q' : ''}>${r.init}</td></tr>`)}
        </tbody></table></div>`)}
    </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${PS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [6] the problem: a table per scope vs one table for all scopes ───────── */
  // program: int x=1; int y=2; { int x=3; ... } (the notes' example); 5 slots per hash table, example hash: letter position mod 5
  function OneVsAll({ ar }) {
    const steps = [
      { en: '<b>One symbol table per scope</b> for <code>int x=1; int y=2; { int x=3; … }</code>: scope 0 and scope 1 each get their own hash table. Each table needs its own slots: <b>10 slots</b> for 3 symbols. That is the <b>memory overhead</b>.', ar: 'في <b>symbol table لكل scope</b> الـ scope 0 والـ scope 1 كل واحد ليه hash table لوحده. وكل table محتاجة slots خاصة بيها: <b>10 slots</b> لـ 3 symbols بس. ده الـ <b>memory overhead</b>.<span class="ltr">int x=1; int y=2; { int x=3; … }</span>' },
      { en: 'Inside the inner scope, <b>look_up(y)</b>: search the scope 1 table (miss), then the scope 0 table (found). <b>2 searches</b>: less efficient for speed as well.', ar: 'جوه الـ scope الداخلي بنعمل <b>look_up(y)</b>: بندوّر في table الـ scope 1 (مش موجود)، وبعدين table الـ scope 0 (لقيناه). يعني <b>2 searches</b>، وده أبطأ كمان.' },
      { en: 'Solution: <b>a single hash table for all scopes</b>. The same 3 symbols need only <b>5 slots</b>: less memory overhead.', ar: 'الحل: <b>hash table واحدة لكل الـ scopes</b>. نفس الـ 3 symbols محتاجين <b>5 slots</b> بس: memory overhead أقل.' },
      { en: '<b>look_up(y)</b> in the single table: <b>only one search</b>.', ar: 'الـ <b>look_up(y)</b> في الـ table الواحدة: <b>search واحد بس</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3400);
    const T0 = { 0: ['y'], 4: ['x'] }, T1 = { 4: ['x'] }, ALL = { 0: ['y (0)'], 4: ['x (1)', 'x (0)'] };
    const tab = (title, T, cur, hit, on) => html`<div className=${'cv8-pan' + (on ? ' on' : '')}><span className="cv8-ph" style=${{ fontSize: '.86rem' }}>${title}</span>
      <div className="cv8-slots">${[0, 1, 2, 3, 4].map(k => html`<div key=${k} className=${'cv8-slot' + (cur && k === 0 ? ' cur' : '')}><i>${k}</i>${(T[k] || []).map(e => html`<span key=${e} className=${hit && e[0] === 'y' ? 'hit' : ''}>${e}</span>`)}</div>`)}</div></div>`;
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '420px' }}>
      ${i < 2 ? html`<div className="cv8-stack" style=${{ marginTop: 0 }}>${tab('Scope 1 table', T1, i === 1, false, i === 1)}${tab('Scope 0 table', T0, i === 1, i === 1, i === 1)}</div>
        <div className="cv8-cnt">${i === 1 ? 'look_up(y): 2 searches' : '2 tables, 10 slots'}</div>`
      : html`${tab('One table for all scopes', ALL, i === 3, i === 3, i === 3)}<div className="cv8-cnt">${i === 3 ? 'look_up(y): 1 search' : '1 table, 5 slots'}</div>`}
      <p className="cv8-muted">Slot = example hash, letter position mod 5: x → 24 mod 5 = 4, y → 25 mod 5 = 0.</p>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [6] solution 1: key = "identifier,scope_id" ───────── */
  function Sol1({ ar }) {
    // keys present, current scope id, search log [[key, hit]]
    const S = [
      { keys: ['x,0', 'y,0'], sid: 0, log: [], ln: 0, en: 'Global scope: <b>scope_id = 0</b>. <code>int x=1; int y=2;</code> enter the table with the keys <b>"x,0"</b> and <b>"y,0"</b>.', ar: 'الـ global scope ليه <bdi>scope_id = 0</bdi>. والتعريفين بيدخلوا الـ table بالـ keys دي:<span class="ltr">int x=1; int y=2;  →  "x,0"  "y,0"</span>' },
      { keys: ['x,0', 'y,0', 'x,1'], sid: 1, log: [], ln: 1, en: '<code>{</code> starts a new scope: increment, <b>scope_id = 1</b>. <code>int x=3;</code> enters with the key <b>"x,1"</b>, a different key from "x,0".', ar: 'القوس بيبدأ scope جديد: بنزوّد الـ scope_id فيبقى 1. والـ x الجديد بيدخل بـ key مختلف عن الأولاني:<span class="ltr">int x=3;  →  "x,1"</span>' },
      { keys: ['x,0', 'y,0', 'x,1'], sid: 1, log: [['x,1', 1]], ln: 2, en: 'Use of <b>x</b> in scope 1: append the current scope_id, look for <b>"x,1"</b>: found in <b>1 search</b>.', ar: 'استخدام الـ <b>x</b> في scope 1: بنلزّق الـ scope_id الحالي وندوّر على <bdi>"x,1"</bdi>: لقيناه في <b>search واحد</b>.' },
      { keys: ['x,0', 'y,0', 'x,1'], sid: 1, log: [['y,1', 0], ['y,0', 1]], ln: 2, en: 'Use of <b>y</b> in scope 1: <b>"y,1"</b> is not there, so try the enclosing scope, <b>"y,0"</b>: found. <b>2 searches</b>: this solution still may require multiple searches!', ar: 'استخدام الـ <b>y</b> في scope 1: مفيش <bdi>"y,1"</bdi>، فبنجرّب الـ scope اللي برّه <bdi>"y,0"</bdi>: لقيناه. يعني <b>2 searches</b>: الحل ده لسه ممكن يحتاج كذا بحث!' },
      { keys: ['x,0', 'y,0', 'x,1'], sid: 0, log: [['x,0', 1]], ln: 3, en: 'After <code>}</code> we are back in scope 0: use of <b>x</b> looks for <b>"x,0"</b>, the outer x.', ar: 'بعد القوس رجعنا لـ scope 0: استخدام الـ <b>x</b> بيدوّر على <bdi>"x,0"</bdi> اللي هو الـ x اللي برّه.' }
    ];
    const LN = ['int x=1; int y=2;', '{ int x=3;', '  y += x; }', 'y += x;'];
    const [i, ctl] = useSteps(S.length, 3200), s = S[i];
    const st = k => { const e = s.log.find(l => l[0] === k); return e ? (e[1] ? ' hit' : ' miss') : ''; };
    return html`<figure className="fig cv8"><div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '400px' }}>
      <div className="cv8-code">${LN.map((l, k) => html`<div key=${k} className=${'cv8-ln' + (k === s.ln ? ' on' : '') + (k > s.ln ? ' dim' : '')}><code>${l}</code></div>`)}</div>
      <div className="cv8-row" style=${{ margin: '10px 0' }}><span className="cv8-lbl">current</span><span className="cv8-badge">scope_id = ${s.sid}</span></div>
      <div className="cv8-pan"><span className="cv8-ph" style=${{ fontSize: '.86rem' }}>One hash table, key "identifier,scope_id"</span>
        <div className="cv8-keys">${['x,0', 'y,0', 'x,1'].map(k => html`<span key=${k} style=${{ display: 'contents' }}><code className=${pop(s.keys.includes(k)) + st(k)}>"${k}"</code><span className=${pop(s.keys.includes(k))}>${k[0]}, int, scope ${k[2]}, value ${k === 'x,0' ? 1 : k === 'y,0' ? 2 : 3}</span></span>`)}</div></div>
      <div className="cv8-row" style=${{ marginTop: '8px', marginBottom: 0 }}>${s.log.map(([k, h], j) => html`<span key=${j} className=${'cv8-chip m ' + (h ? 'ok' : 'no')}>search ${j + 1}: "${k}" ${h ? 'found' : 'missing'}</span>`)}</div>
    </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [6] solution 2: identifier → linked list of its declarations, newest in front ───────── */
  const SOL2 = {
    notes: { b: 'Notes: x and y', A: 'x', B: 'y', av: 1, bv: 2, iv: 3 },
    quiz: { b: 'Quiz: i and w', A: 'i', B: 'w', av: 10, bv: 20, iv: 3 }
  };
  function Sol2Run({ E, ar, head }) {
    const { A, B, av, bv, iv } = E;
    const R = (s, v) => ({ s, v });
    // lists: {A: [records newest first], B: [...]}; scopes: [[scope, names]]; mark: {name, idx, kind}
    const S = [
      { ln: `int ${A}=${av};`, L: { [A]: [R(0, av)], [B]: [] }, sc: [[0, [A]]], mk: [A, 0, 'new'], en: `<code>int ${A}=${av};</code>: key <b>${A}</b> gets a list with one record <b>[0 | YES | NULL]</b> (scope 0, initialised).`, ar: `الـ key <b>${A}</b> بياخد list فيها record واحد (scope 0 ومتعمله initialise).${L(`int ${A}=${av};  →  ${A} → [0 | YES | NULL]`)}` },
      { ln: `int ${B}=${bv};`, L: { [A]: [R(0, av)], [B]: [R(0, bv)] }, sc: [[0, [A, B]]], mk: [B, 0, 'new'], en: `<code>int ${B}=${bv};</code>: key <b>${B}</b> → [0 | YES | NULL]. The separate structure lists what scope 0 defined: ${A}, ${B}.`, ar: `الـ key <b>${B}</b> بياخد record بتاعه. والـ structure المنفصلة بتسجّل اللي scope 0 عرّفه.${L(`${B} → [0 | YES | NULL]    scope 0: ${A}, ${B}`)}` },
      { ln: '{', L: { [A]: [R(0, av)], [B]: [R(0, bv)] }, sc: [[0, [A, B]], [1, []]], en: '<code>{</code>: enter scope 1. The separate structure starts an empty list for it.', ar: 'القوس بيدخلنا scope 1، والـ structure المنفصلة بتبدأله list فاضية.' },
      { ln: `int ${A}=${iv};`, L: { [A]: [R(1, iv), R(0, av)], [B]: [R(0, bv)] }, sc: [[0, [A, B]], [1, [A]]], mk: [A, 0, 'new'], en: `<code>int ${A}=${iv};</code>: the new record goes at the <b>front</b> of ${A}’s list: <b>${A} → [1 | YES | next] → [0 | YES | NULL]</b>.`, ar: `الـ record الجديد بيتحط في <b>أول</b> الـ list بتاعة الـ ${A} كده:${L(`${A} → [1 | YES | next] → [0 | YES | NULL]`)}` },
      { ln: `${B} += ${A};`, L: { [A]: [R(1, iv), R(0, av)], [B]: [R(0, bv)] }, sc: [[0, [A, B]], [1, [A]]], mk: [A, 0, 'use'], mk2: [B, 0, 'use'], en: `Use of <b>${A}</b>: take the <b>front item</b>, the scope 1 ${A} = ${iv}. It is always the right one for the current scope, so the lookup is not time consuming. (${B}’s front item is scope 0’s.)`, ar: `استخدام الـ <b>${A}</b>: بناخد <b>أول item</b> اللي هو الـ ${A} بتاع scope 1 وقيمته ${D(String(iv))}. ده دايمًا الصح للـ scope الحالي، فالبحث مش بياخد وقت. (وأول item للـ ${B} هو بتاع scope 0.)` },
      { ln: '}', L: { [A]: [R(1, iv), R(0, av)], [B]: [R(0, bv)] }, sc: [[0, [A, B]], [1, [A], 1]], mk: [A, 0, 'del'], en: `<code>}</code>: exit scope 1. The separate structure says scope 1 defined <b>${A}</b>, so its front record is deleted.`, ar: `القوس بيخرجنا من scope 1. الـ structure المنفصلة بتقول إن scope 1 عرّف <b>${A}</b>، فبنمسح أول record في الـ list بتاعته.` },
      { ln: `${B} += ${A};`, L: { [A]: [R(0, av)], [B]: [R(0, bv)] }, sc: [[0, [A, B]]], mk: [A, 0, 'use'], en: `Use of <b>${A}</b> after the block: the front item is now scope 0’s ${A} = ${av}. All entries left are in open scopes.`, ar: `استخدام الـ <b>${A}</b> بعد الـ block: أول item دلوقتي هو الـ ${A} بتاع scope 0 وقيمته ${D(String(av))}. وكل الـ entries اللي فاضلة في scopes مفتوحة.` }
    ];
    const [i, ctl] = useSteps(S.length, 3000), s = S[i];
    const cls = (n, k) => { for (const m of [s.mk, s.mk2]) if (m && m[0] === n && m[1] === k) return ' ' + m[2]; return ''; };
    return html`<div className="fig-stage"><div className="cv8-wrap" style=${{ maxWidth: '420px' }}>${head}
      <div className="cv8-row" style=${{ marginBottom: '6px' }}><span className="cv8-lbl">now:</span><span className="cv8-chip m on">${s.ln}</span></div>
      <div className="cv8-pan"><span className="cv8-ph" style=${{ fontSize: '.86rem' }}>Key → linked list [scope | init | next]</span>
        ${[A, B].map(n => html`<div key=${n} className="cv8-lrow"><b>${n}</b><span className="cv8-arw">→</span>
          ${s.L[n].map((r, k) => html`<span key=${k} style=${{ display: 'contents' }}><span className=${'cv8-rec' + cls(n, k)} title=${'value ' + r.v}><span>${r.s}</span><span>YES</span><span>${k < s.L[n].length - 1 ? 'next' : 'NULL'}</span></span>${k < s.L[n].length - 1 && html`<span className="cv8-arw">→</span>`}</span>`)}</div>`)}
      </div>
      <div className="cv8-pan" style=${{ marginTop: '8px' }}><span className="cv8-ph" style=${{ fontSize: '.86rem' }}>Identifiers defined per open scope</span>
        <div className="cv8-stack" style=${{ marginTop: 0, flexDirection: 'column-reverse' }}>${s.sc.map(([k, ns, gone]) => html`<div key=${k} className=${'cv8-frame' + (gone ? ' gone' : k === s.sc.length - 1 ? ' top' : '')}><b>scope ${k}</b>${ns.length ? ns.join(', ') : html`<span className="cv8-lbl">none yet</span>`}</div>`)}</div></div></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} />`;
  }
  function Sol2({ ar }) {
    const [ex, setEx] = useState('notes');
    const head = html`<div className="cv8-row">${Object.keys(SOL2).map(k => html`<button key=${k} className=${'fig-btn' + (ex === k ? ' cv8-sel' : '')} onClick=${() => setEx(k)}>${SOL2[k].b}</button>`)}</div>`;
    return html`<figure className="fig cv8"><${Sol2Run} key=${ex} E=${SOL2[ex]} ar=${ar} head=${head} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-binding-scope': Binding, 'cc-static-dynamic': StaticDynamic, 'cc-scope-run': ScopeRun, 'cc-symtab-ops': SymOps, 'cc-symtab-impl': Impl,
    'cc-st-per-scope': PerScope, 'cc-st-one-vs-all': OneVsAll, 'cc-st-sol1': Sol1, 'cc-st-sol2': Sol2
  });
})();
/* ── part L9 ── */
// Compiler Design visuals, Lecture 9 (Runtime Environment, Parameter Passing and Code Optimization): runtime support, storage allocation, the memory layout figure, formal vs actual parameters, the concentrate(i, a[i]) parameter-passing simulator, peephole techniques and loop optimization (slides 2–13). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.cv9 .fig-btn:disabled{ opacity:.45; cursor:default; }
.cv9 .fig-btn.cv9-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv9-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.cv9-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:32px; }
.cv9-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.4; color:var(--ink); transition:opacity .45s, box-shadow .35s, transform .45s; }
.cv9-card.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv9-card.dim{ opacity:.3; }
.cv9-card > b{ display:block; }
.cv9-card small{ display:block; font-size:.78rem; color:var(--graphite); line-height:1.35; }
.cv9-link{ text-align:center; color:var(--k-compiler); font-weight:700; font-size:.82rem; padding:4px 0; transition:opacity .45s; }
.cv9-stack{ display:grid; gap:0; max-width:420px; margin:0 auto; }
.cv9-cells{ display:flex; gap:4px; margin-top:6px; }
.cv9-cells i{ flex:1; height:18px; border-radius:4px; border:1px solid var(--line); background:var(--paper-2); transition:background .35s; }
.cv9-cells i.on{ background:var(--fig-s); border-color:transparent; }
.cv9-act{ font-size:.8rem; color:var(--graphite); margin-top:4px; min-height:1.3em; }
.cv9-map{ display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr); gap:8px 6px; align-items:center; max-width:520px; margin:0 auto; }
.cv9-arw{ color:var(--k-compiler); font-weight:800; font-size:1.1rem; transition:opacity .45s; }
.cv9-three{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:8px; max-width:480px; margin:0 auto; }
.cv9-col{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px; text-align:center; transition:box-shadow .35s; }
.cv9-col.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv9-col > b{ display:block; font-size:.86rem; color:var(--ink); }
.cv9-col > small{ display:block; font-size:.75rem; color:var(--graphite); margin-bottom:6px; }
.cv9-slots{ display:flex; flex-direction:column; gap:4px; min-height:132px; }
.cv9-slots.up{ flex-direction:column-reverse; }
.cv9-slot{ height:28px; border-radius:6px; display:grid; place-items:center; font:600 .78rem var(--mono); border:1px dashed var(--line); color:var(--graphite); }
.cv9-slot.full{ border:1px solid transparent; background:color-mix(in srgb, var(--k-compiler) 24%, var(--paper)); color:var(--ink); }
.cv9-slot.new{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv9-hist{ margin:10px auto 0; max-width:480px; font-size:.8rem; color:var(--ink); }
.cv9-hist div{ display:grid; grid-template-columns:4.2em 1fr; gap:6px; align-items:center; padding:2px 0; }
.cv9-hist span{ font-family:var(--mono); letter-spacing:.08em; }
.cv9-hist .fx{ color:var(--ok); font-weight:700; } .cv9-hist .vr{ color:var(--pen); font-weight:700; }
.cv9-mem{ display:grid; grid-template-columns:24px minmax(0,1fr); gap:0 6px; max-width:360px; margin:0 auto; }
.cv9-side{ writing-mode:vertical-rl; transform:rotate(180deg); text-align:center; font-size:.78rem; font-weight:700; color:var(--graphite); border-left:2px solid var(--graphite); border-radius:0 0 0 0; padding:0 2px; transition:opacity .45s; }
.cv9-blk{ border:1px solid var(--line); background:var(--paper); padding:6px 8px; text-align:center; font-size:.84rem; color:var(--ink); transition:opacity .45s; }
.cv9-blk small{ display:block; font-size:.75rem; color:var(--graphite); }
.cv9-split{ display:grid; grid-template-columns:1fr 1fr; }
.cv9-split > div + div{ border-left:1px dashed var(--line); }
.cv9-dyn{ border:1px solid var(--line); background:var(--paper-2); height:250px; display:flex; flex-direction:column; padding:4px; gap:3px; }
.cv9-fr{ border-radius:6px; padding:3px 6px; font-size:.78rem; line-height:1.25; text-align:center; color:var(--ink); }
.cv9-fr.sk{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); }
.cv9-fr.hp{ background:color-mix(in srgb, var(--pen) 18%, var(--paper)); cursor:pointer; }
.cv9-fr.hole{ border:1px dashed var(--line); color:var(--graphite); background:transparent; }
.cv9-fr.new{ box-shadow:0 0 0 2px var(--k-compiler); }
.cv9-free{ flex:1; display:flex; flex-direction:column; justify-content:space-between; align-items:center; color:var(--graphite); font-size:.8rem; min-height:0; overflow:hidden; }
.cv9-free .g{ font-size:1.1rem; color:var(--k-compiler); font-weight:800; line-height:1; }
.cv9-free.clash{ background:color-mix(in srgb, var(--pen) 14%, transparent); border-radius:6px; color:var(--pen); font-weight:700; justify-content:center; }
.cv9-code{ font:500 .8rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; color:var(--ink); text-align:left; direction:ltr; }
.cv9-code div{ white-space:pre-wrap; overflow-wrap:anywhere; padding-left:2ch; text-indent:-2ch; border-radius:4px; transition:background .3s; }
.cv9-code div.on{ background:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); }
.cv9-code div.gone{ text-decoration:line-through; color:var(--graphite); }
.cv9-code div.new{ background:color-mix(in srgb, var(--ok) 20%, var(--paper)); }
.cv9-code .tk{ border-radius:3px; padding:0 2px; }
.cv9-code .tk.on{ background:var(--fig-s); color:#fff; }
.cv9-code .tk.fold{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
.cv9-code .tk.ok{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); }
.cv9-cmt{ color:var(--graphite); }
.cv9-boxes{ display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px; margin:10px 0 0; }
.cv9-frm{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; transition:opacity .45s; }
.cv9-frm > b{ display:block; font-size:.8rem; color:var(--graphite); margin-bottom:4px; }
.cv9-vars{ display:flex; flex-wrap:wrap; gap:6px; }
.cv9-v{ display:inline-flex; flex-direction:column; align-items:center; font-size:.76rem; color:var(--graphite); }
.cv9-v span{ min-width:30px; padding:2px 5px; border-radius:6px; border:1px solid var(--line); background:var(--paper-2); color:var(--ink); font:700 .9rem var(--mono); text-align:center; transition:background .3s, box-shadow .3s; }
.cv9-v span.hot{ background:color-mix(in srgb, var(--k-compiler) 30%, var(--paper)); box-shadow:0 0 0 2px var(--k-compiler); }
.cv9-v span.ref{ font-size:.78rem; font-weight:600; }
.cv9-out{ margin:8px 0 0; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 8px; font:600 .86rem/1.5 var(--mono); color:var(--ink); min-height:2em; }
.cv9-out em{ font-style:normal; font-family:var(--body); font-weight:500; font-size:.78rem; color:var(--graphite); margin-right:6px; }
.cv9-out .ok{ color:var(--ok); font-family:var(--body); font-size:.8rem; margin-left:6px; }
.cv9-sum{ margin:8px 0 0; display:grid; gap:4px; }
.cv9-sum div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:3px 8px; font-size:.78rem; color:var(--graphite); }
.cv9-sum div.cur{ box-shadow:0 0 0 2px var(--k-compiler); color:var(--ink); }
.cv9-sum span{ display:block; font:600 .82rem var(--mono); color:var(--ink); }
.cv9-own{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; align-items:center; margin:0 0 10px; font-size:.84rem; color:var(--ink); }
.cv9-stp{ display:inline-flex; align-items:center; gap:3px; }
.cv9-stp button{ font:inherit; width:28px; height:28px; border-radius:50%; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.cv9-stp b{ min-width:1.4em; text-align:center; font-family:var(--mono); }
.cv9-win{ position:relative; }
.cv9-win div{ padding-left:calc(2ch + 4px); }
.cv9-win div.in{ box-shadow:inset 3px 0 0 var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.cv9-tag{ display:inline-block; font-size:.76rem; font-weight:700; color:#fff; background:var(--fig-s); border-radius:99px; padding:1px 8px; margin:0 0 4px; }
.cv9-cnt{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; margin:10px 0 0; }
.cv9-cnt div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; font-size:.8rem; color:var(--graphite); }
.cv9-cnt b{ display:block; font:700 1.25rem var(--mono); color:var(--ink); }
.cv9-cnt div.good b{ color:var(--ok); }
.cv9-arr{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin:8px 0 0; }
.cv9-arr span{ min-width:24px; height:26px; display:inline-grid; place-items:center; border-radius:5px; border:1px solid var(--line); background:var(--paper); font:600 .8rem var(--mono); color:var(--ink); transition:background .25s; }
.cv9-arr span.done{ background:color-mix(in srgb, var(--k-compiler) 20%, var(--paper)); }
.cv9-arr span.cur{ background:var(--fig-s); color:#fff; border-color:transparent; }
.cv9-two{ display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:8px; }
.cv9-two .cv9-tag{ margin-bottom:4px; }
.cv9-sl{ display:flex; align-items:center; gap:8px; justify-content:center; font-size:.84rem; color:var(--ink); margin:0 0 8px; }
.cv9-sl input{ width:140px; accent-color:var(--k-compiler); }
.cv9-ops{ text-align:center; font-size:.84rem; color:var(--graphite); margin:8px 0 0; }
.cv9-ops b{ color:var(--ink); font-family:var(--mono); }
@media (prefers-reduced-motion: reduce){ .cv9-card, .cv9-link, .cv9-cells i, .cv9-arw, .cv9-side, .cv9-blk, .cv9-code div, .cv9-frm, .cv9-v span, .cv9-arr span{ transition:none; } }`;
  if (!document.getElementById('cv9-css')) { const s = document.createElement('style'); s.id = 'cv9-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => '<span class="ltr">' + s + '</span>';
  const Chips = ({ items, sel, on }) => html`<div className="cv9-row">${items.map(([k, t]) => html`<button key=${k} className=${'fig-btn' + (sel === k ? ' cv9-sel' : '')} onClick=${() => on(k)}>${t}</button>`)}</div>`;

  /* ── slide 2: the runtime environment and the runtime support system ── */
  function RuntimeEnv({ ar }) {
    const steps = [
      { en: '<b>Runtime</b> means a program in execution: a running <b>process</b>.', ar: 'الـ <b>Runtime</b> معناه برنامج شغّال، يعني <b>process</b> في التنفيذ.' },
      { en: 'The <b>runtime environment</b> is a state of the target machine (software libraries, environment variables…) that provides services to the running processes.', ar: 'الـ <b>runtime environment</b> هو حالة الـ target machine (software libraries و environment variables…) اللي بتقدّم خدمات للـ processes اللي شغّالة.' },
      { en: 'The <b>runtime support system</b> is a package, mostly generated with the executable itself, that handles the communication between the process and the runtime environment.', ar: 'الـ <b>runtime support system</b> ده package بيتعمل غالبًا مع الـ executable نفسه، وهو اللي بيظبط التواصل بين الـ process والـ runtime environment.' },
      { en: 'It takes care of <b>memory allocation and de-allocation</b> while the program runs: cells are allocated and freed as the process needs them.', ar: 'وهو اللي بياخد باله من الـ <b>memory allocation و de-allocation</b> وإنت البرنامج شغّال: الخانات بتتحجز وتتفك على حسب احتياج الـ process.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const [cells, setCells] = useState([1, 1, 0, 1, 0, 0, 1, 0]), [act, setAct] = useState('');
    useEffect(() => {
      if (i !== 3 || calm()) return;
      let k = 0; const seq = [2, 0, 5, 3, 7, 1, 4, 6];
      const id = setInterval(() => { const c = seq[k++ % seq.length]; setCells(cs => { const n = cs.slice(); n[c] = n[c] ? 0 : 1; setAct(n[c] ? 'allocate cell ' + (c + 1) : 'de-allocate cell ' + (c + 1)); return n; }); }, 900);
      return () => clearInterval(id);
    }, [i]);
    const card = (on, hot, t, sub, extra) => html`<div className=${'cv9-card ' + (on ? (hot ? 'on' : '') : 'dim')}><b>${t}</b><small>${sub}</small>${extra}</div>`;
    return html`<figure className="fig cv9"><div className="fig-stage"><div className="cv9-stack">
      ${card(true, i === 0, 'Running process', 'a program in execution')}
      <div className="cv9-link" style=${{ opacity: i >= 2 ? 1 : .2 }}>⇅ communication</div>
      ${card(i >= 2, i >= 2, 'Runtime support system', 'a package generated with the executable', html`<div className=${pop(i >= 3)}><div className="cv9-cells">${cells.map((c, k) => html`<i key=${k} className=${c ? 'on' : ''}></i>`)}</div><div className="cv9-act">${i >= 3 ? (act || 'memory allocation and de-allocation') : ''}</div></div>`)}
      <div className="cv9-link" style=${{ opacity: i >= 2 ? 1 : .2 }}>⇅ services</div>
      ${card(i >= 1, i === 1, 'Runtime environment', 'state of the target machine: software libraries, environment variables…')}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 3: what needs runtime memory, and which storage manages it ── */
  function MemNeeds({ ar }) {
    const R = [
      ['Code', 'the text part; does not change at runtime', 'Fixed text memory', 'needs known at compile time'],
      ['Procedures', 'static text, called in a random order', 'Stack', 'manages procedure calls and activations'],
      ['Variables', 'known only at runtime (unless global or constant)', 'Heap', 'allocation and de-allocation at runtime']
    ];
    const steps = [
      { en: 'The runtime environment manages the runtime memory needs of three entities: <b>code</b>, <b>procedures</b> and <b>variables</b>.', ar: 'الـ runtime environment بيدير احتياجات الميموري وقت الـ runtime لـ 3 حاجات: الـ <b>code</b> والـ <b>procedures</b> والـ <b>variables</b>.' },
      { en: '<b>Code</b> (the text part) does not change at runtime, so its memory needs are known at <b>compile time</b>: it gets a fixed amount.', ar: 'الـ <b>Code</b> (الـ text part) مش بيتغير وقت الـ runtime، فاحتياجه من الميموري معروف في الـ <b>compile time</b> وبياخد كمية ثابتة.' },
      { en: '<b>Procedures</b>: their text is static but they are called in a random order, so <b>stack</b> storage manages the calls and activations.', ar: 'الـ <b>Procedures</b>: الـ text بتاعها static بس بتتنادى بترتيب عشوائي، فالـ <b>stack</b> هو اللي بيدير الـ calls والـ activations.' },
      { en: '<b>Variables</b> are known only at runtime (unless global or constant), so <b>heap</b> allocation manages them.', ar: 'الـ <b>Variables</b> بتتعرف بس وقت الـ runtime (إلا لو global أو constant)، فالـ <b>heap</b> allocation هو اللي بيديرها.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    return html`<figure className="fig cv9"><div className="fig-stage"><div className="cv9-map">
      ${R.map((r, k) => html`<${React.Fragment} key=${k}>
        <div className=${'cv9-card ' + (i === k + 1 ? 'on' : i === 0 || i > k ? '' : 'dim')}><b>${r[0]}</b><small>${r[1]}</small></div>
        <div className="cv9-arw" style=${{ opacity: i > k ? 1 : .15 }}>→</div>
        <div className=${'cv9-card ' + pop(i > k) + (i === k + 1 ? ' on' : '')}><b>${r[2]}</b><small>${r[3]}</small></div>
      </${React.Fragment}>`)}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 4–5: the 3 types of storage allocation, over the run of a program ── */
  function AllocKinds({ ar }) {
    const ST = ['data', 'data', 'data'];
    const S = [
      { sk: [], hp: [], on: 0, en: '<b>Static allocation</b>: data is bound to fixed locations before the program runs, and they never change. Sizes and places are known in advance, so <b>no runtime support package</b> is needed.', ar: 'الـ <b>Static allocation</b>: الداتا بتترتبط بأماكن ثابتة قبل ما البرنامج يشتغل، ومش بتتغير. الأحجام والأماكن معروفة من الأول، فمش محتاجين <b>runtime support package</b>.' },
      { sk: ['P #1'], hp: [], on: 1, nw: 'sk', en: '<b>Stack allocation</b>: a procedure call pushes an activation of P on the stack.', ar: 'الـ <b>Stack allocation</b>: الـ procedure call بيعمل push لـ activation بتاعة P على الـ stack.' },
      { sk: ['P #1', 'P #2'], hp: [], on: 1, nw: 'sk', en: 'P calls itself (a <b>recursive</b> call): a second activation goes on top. This is why the stack suits recursion.', ar: 'الـ P بتنادي نفسها (<b>recursive</b> call): activation تانية بتتحط فوق. وعشان كده الـ stack مناسب للـ recursion.' },
      { sk: ['P #1'], hp: [], on: 1, en: 'Return: the <b>last</b> activation pushed is the <b>first</b> removed (LIFO).', ar: 'الـ Return: آخر activation اتحطت هي <b>أول</b> واحدة تطلع (LIFO).' },
      { sk: ['P #1'], hp: ['x', 'y'], on: 2, nw: 'hp', en: '<b>Heap allocation</b>: memory for variables x and y is allocated dynamically, at runtime.', ar: 'الـ <b>Heap allocation</b>: الميموري بتاعة المتغيرات x و y بتتحجز dynamically وقت الـ runtime.' },
      { sk: ['P #1'], hp: [null, 'y'], on: 2, en: 'x is no longer required, so its memory is de-allocated and claimed back, in any order (not LIFO).', ar: 'الـ x مابقيناش محتاجينه، فالميموري بتاعته بتتفك وترجع، وبأي ترتيب (مش LIFO).' },
      { sk: ['P #1'], hp: [null, 'y'], on: -1, en: 'Look at the sizes over the run: the <b>static</b> area never changed, while <b>stack and heap grew and shrank</b>. So they cannot be given a fixed amount of memory: the compiler uses fixed-size (static) and dynamic-size (stack/heap) storage.', ar: 'بص على الأحجام طول التشغيل: الـ <b>static</b> area ماتغيرتش، لكن الـ <b>stack والـ heap كبروا وصغروا</b>. فماينفعش ندّيهم كمية ميموري ثابتة: الـ compiler بيستخدم storage حجمه ثابت (static) و storage حجمه متغير (stack/heap).' }
    ];
    const [i, ctl] = useSteps(S.length, 3000), s = S[i];
    const N = 4, used = st => ({ st: 3, sk: st.sk.length, hp: st.hp.filter(Boolean).length });
    const col = (k, t, sub, cells, up, nw) => html`<div className=${'cv9-col' + (s.on === k ? ' on' : '')}><b>${t}</b><small>${sub}</small>
      <div className=${'cv9-slots' + (up ? ' up' : '')}>${Array.from({ length: k === 0 ? 3 : N }, (_, j) => { const c = cells[j]; return html`<div key=${j} className=${'cv9-slot' + (c ? ' full' : '') + (c && nw && j === cells.length - 1 ? ' new' : '')}>${c || (j < cells.length ? 'free' : '')}</div>`; })}</div></div>`;
    const H = S.slice(0, i + 1).map(used);
    return html`<figure className="fig cv9"><div className="fig-stage">
      <div className="cv9-three">
        ${col(0, 'Static', 'fixed', ST, false, false)}
        ${col(1, 'Stack', 'LIFO', s.sk, true, s.nw === 'sk')}
        ${col(2, 'Heap', 'any order', s.hp, false, s.nw === 'hp')}
      </div>
      <div className="cv9-hist" aria-label="cells in use after each step">
        <div><b>Static</b><span className=${i === 6 ? 'fx' : ''}>${H.map(h => h.st).join(' ')}</span></div>
        <div><b>Stack</b><span className=${i === 6 ? 'vr' : ''}>${H.map(h => h.sk).join(' ')}</span></div>
        <div><b>Heap</b><span className=${i === 6 ? 'vr' : ''}>${H.map(h => h.hp).join(' ')}</span></div>
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 6 (draw this figure): the memory layout, with stack and heap growing toward each other ── */
  const CAP = 6;
  function MemLayout({ ar }) {
    const steps = [
      { en: '<b>Text (code) memory</b> gets a fixed amount: the code does not change at runtime.', ar: 'الـ <b>Text (code) memory</b> بياخد كمية ثابتة، لأن الكود مش بيتغير وقت الـ runtime.' },
      { en: '<b>Static data</b> is fixed too. In C it is the initialized data segment (globals/statics with a value) and the uninitialized one, <b>BSS</b> (globals/statics without one).', ar: 'الـ <b>Static data</b> ثابتة برضه. في C هي الـ initialized data segment (globals/statics ليها قيمة) والـ uninitialized اللي اسمها <b>BSS</b> (من غير قيمة).' },
      { en: '<b>Stack memory</b> sits at one extreme of the dynamic part and grows <b>down</b>: one stack frame per call (automatic variables and the return address).', ar: 'الـ <b>Stack memory</b> في طرف من الجزء الـ dynamic وبيكبر <b>لتحت</b>: stack frame لكل call (فيه الـ automatic variables والـ return address).' },
      { en: '<b>Heap memory</b> sits at the other extreme and grows <b>up</b> (malloc/realloc/free). Stack and heap grow and shrink against each other.', ar: 'الـ <b>Heap memory</b> في الطرف التاني وبيكبر <b>لفوق</b> (malloc/realloc/free). والـ stack والـ heap بيكبروا ويصغروا ناحية بعض.' },
      { en: '<b>Try it:</b> call and return to push and pop stack frames; malloc and free (or tap a heap block) to use the heap. Watch the free space between them.', ar: '<b>جرّب:</b> اعمل call و return عشان تعمل push و pop للـ stack frames؛ واعمل malloc و free (أو دوس على block في الـ heap). وبص على المساحة الفاضية اللي بينهم.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const [m, setM] = useState({ n: 2, hp: [1, 2], next: 3, nw: null, msg: null });
    const live = i === 4, sk = live ? m.n : i >= 2 ? 2 : 0, hp = live ? m.hp : i >= 3 ? [1, 2] : [], free = CAP - sk - hp.length;
    const trim = a => { const b = a.slice(); while (b.length && b[b.length - 1] == null) b.pop(); return b; };
    const act = f => { ctl.go(4); setM(x => f(x)); };
    const clash = { en: 'No free space left: the stack and the heap have met. They cannot be given a fixed size, they share the space between them.', ar: 'مفيش مساحة فاضية: الـ stack والـ heap اتقابلوا. ماينفعش ندّي كل واحد حجم ثابت، هما بيتشاركوا المساحة اللي بينهم.' };
    const call = () => act(x => x.n + x.hp.length >= CAP ? Object.assign({}, x, { msg: clash, nw: null }) : Object.assign({}, x, { n: x.n + 1, nw: 'sk', msg: { en: `Call: stack frame ${x.n + 1} pushed; the stack grew down.`, ar: `عملنا call: الـ stack frame رقم ${x.n + 1} اتعمله push، والـ stack كبر لتحت.` } }));
    const ret = () => act(x => x.n === 0 ? Object.assign({}, x, { nw: null, msg: { en: 'The stack is empty: nothing to return from.', ar: 'الـ stack فاضي: مفيش حاجة نعمل منها return.' } }) : Object.assign({}, x, { n: x.n - 1, nw: null, msg: { en: `Return: stack frame ${x.n} popped (LIFO); the stack shrank.`, ar: `عملنا return: الـ stack frame رقم ${x.n} اتعمله pop (LIFO)، والـ stack صغر.` } }));
    const malloc = () => act(x => { const h = x.hp.indexOf(null);
      if (h >= 0) { const hp = x.hp.slice(); hp[h] = x.next; return Object.assign({}, x, { hp, next: x.next + 1, nw: x.next, msg: { en: `malloc: block ${x.next} reuses a freed hole inside the heap.`, ar: `عملنا malloc: الـ block رقم ${x.next} أخد مكان فاضي جوه الـ heap اتفك قبل كده.` } }); }
      if (x.n + x.hp.length >= CAP) return Object.assign({}, x, { msg: clash, nw: null });
      return Object.assign({}, x, { hp: x.hp.concat(x.next), next: x.next + 1, nw: x.next, msg: { en: `malloc: block ${x.next} allocated at runtime; the heap grew up.`, ar: `عملنا malloc: الـ block رقم ${x.next} اتحجز وقت الـ runtime، والـ heap كبر لفوق.` } }); });
    const freeB = id => act(x => { const k = id == null ? x.hp.map((v, j) => v != null ? j : -1).filter(j => j >= 0).pop() : x.hp.indexOf(id);
      if (k == null || k < 0) return Object.assign({}, x, { nw: null, msg: { en: 'The heap is empty: nothing to free.', ar: 'الـ heap فاضي: مفيش حاجة نعملها free.' } });
      const v = x.hp[k], hp = x.hp.slice(); hp[k] = null; const t = trim(hp);
      return Object.assign({}, x, { hp: t, nw: null, msg: t.length < x.hp.length ? { en: `free: block ${v} reclaimed; the heap shrank.`, ar: `عملنا free: الـ block رقم ${v} رجع، والـ heap صغر.` } : { en: `free: block ${v} reclaimed, leaving a hole inside the heap that a later malloc can reuse.`, ar: `عملنا free: الـ block رقم ${v} رجع، وساب مكان فاضي جوه الـ heap ممكن malloc بعد كده يستخدمه.` } }); });
    const cap = live && m.msg ? m.msg : steps[i];
    return html`<figure className="fig cv9"><div className="fig-stage">
      <div className="cv9-mem">
        <div className="cv9-side" style=${{ gridRow: '1 / 3', opacity: i >= 0 ? 1 : .2 }}>Fixed</div>
        <div className="cv9-blk" style=${{ borderRadius: '8px 8px 0 0' }}><b>Text memory</b><small>code (text segment)</small></div>
        <div className=${'cv9-blk cv9-split ' + pop(i >= 1)} style=${{ padding: 0 }}><div style=${{ padding: '6px 4px' }}><b>Static data</b><small>initialized data</small></div><div style=${{ padding: '6px 4px' }}><b>BSS</b><small>uninitialized data</small></div></div>
        <div className="cv9-side" style=${{ opacity: i >= 2 ? 1 : .2 }}>Dynamic</div>
        <div className="cv9-dyn" style=${{ borderRadius: '0 0 8px 8px', opacity: i >= 2 ? 1 : .35 }}>
          ${i >= 2 && html`<div className="cv9-fr" style=${{ fontWeight: 700, fontSize: '.8rem' }}>Stack memory ↓</div>`}
          ${Array.from({ length: sk }, (_, k) => html`<div key=${'s' + k} className=${'cv9-fr sk' + (live && m.nw === 'sk' && k === sk - 1 ? ' new' : '')}>frame ${k + 1}: locals + return address</div>`)}
          <div className=${'cv9-free' + (free <= 0 ? ' clash' : '')}>${free <= 0 ? 'stack and heap meet' : html`${i >= 2 && html`<span className="g">↓</span>`}<span>free space</span>${i >= 3 && html`<span className="g">↑</span>`}`}</div>
          ${hp.slice().reverse().map((v, k) => html`<div key=${'h' + k} className=${'cv9-fr ' + (v == null ? 'hole' : 'hp') + (live && v != null && m.nw === v ? ' new' : '')} onClick=${() => v != null && freeB(v)}>${v == null ? 'freed (hole)' : 'block ' + v + ' (malloc)'}</div>`)}
          ${i >= 3 && html`<div className="cv9-fr" style=${{ fontWeight: 700, fontSize: '.8rem' }}>Heap memory ↑</div>`}
        </div>
      </div>
      <div className="cv9-row" style=${{ marginTop: '10px', marginBottom: 0 }}>
        <button className="fig-btn" onClick=${call}>Call</button><button className="fig-btn" onClick=${ret}>Return</button>
        <button className="fig-btn" onClick=${malloc}>malloc</button><button className="fig-btn" onClick=${() => freeB(null)}>free</button>
      </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${{ go: j => { setM(x => Object.assign({}, x, { msg: null })); ctl.go(j); }, replay: () => { setM({ n: 2, hp: [1, 2], next: 3, nw: null, msg: null }); ctl.replay(); } }} /></figure>`;
  }

  /* ── slides 7–8: formal vs actual parameters ── */
  function FormalActual({ ar }) {
    const steps = [
      { en: 'The slide’s example: fun_one calls fun_two and passes it actual_parameter (10).', ar: 'مثال الـ slide: الـ fun_one بتنادي الـ fun_two وبتبعتلها الـ actual_parameter (قيمته 10).' },
      { en: '<b>Formal parameter</b>: declared in the <b>definition</b> of the called function (fun_two); it receives the information passed by the caller.', ar: 'الـ <b>Formal parameter</b>: متعرّف في الـ <b>definition</b> بتاع الـ function اللي اتنادت (fun_two)، وبيستقبل المعلومات اللي الـ caller بعتها.' },
      { en: '<b>Actual parameter</b>: the variable whose value or address is passed; it appears in the <b>call</b> as an argument.', ar: 'الـ <b>Actual parameter</b>: المتغير اللي قيمته أو عنوانه بيتبعت، وبيظهر في الـ <b>call</b> كـ argument.' },
      { en: 'The formal holds the actual’s information. It may be <b>a value</b>: formal_parameter gets a copy, 10.', ar: 'الـ formal بيشيل معلومات الـ actual. ممكن تبقى <b>قيمة</b>: الـ formal_parameter بياخد نسخة منها، يعني 10.' },
      { en: '…or <b>an address</b>: formal_parameter holds the address of actual_parameter and reaches the 10 through it.', ar: 'أو ممكن تبقى <b>عنوان</b>: الـ formal_parameter بيشيل عنوان الـ actual_parameter وبيوصل للـ 10 من خلاله.' },
      { en: 'Either way, print formal_parameter prints <b>10</b>. Which one is held depends on the parameter-passing technique (next section).', ar: 'وفي الحالتين، الـ print formal_parameter بيطبع <b>10</b>. وأنهي واحدة بتتشال بيعتمد على طريقة الـ parameter passing (السكشن اللي جاي).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), [by, setBy] = useState(null);
    useEffect(() => setBy(null), [i]);
    const mode = by || (i === 4 ? 'addr' : 'val');
    const tk = (w, k) => { const on = (w === 'formal_parameter' && i === 1) || (w === 'actual_parameter' && i === 2); return html`<span key=${k} className=${'tk' + (on ? ' on' : '')}>${w}</span>`; };
    const line = (s, k, hl) => html`<div key=${k} className=${hl ? 'on' : ''}>${s.split(/(formal_parameter|actual_parameter)/).map((p, j) => /_parameter$/.test(p) ? tk(p, j) : p)}</div>`;
    const C = [['fun_one() {', 0], ['   int actual_parameter = 10;', 0], ['   call fun_two(int actual_parameter);', 2], ['}', 0], ['fun_two(int formal_parameter) {', 1], ['   print formal_parameter;', 5], ['}', 0]];
    return html`<figure className="fig cv9"><div className="fig-stage">
      <div className="cv9-code">${C.map(([s, h], k) => line(s, k, h && h === i))}</div>
      <div className=${pop(i >= 3)}>
        ${i >= 3 && html`<${Chips} items=${[['val', 'holds a value'], ['addr', 'holds an address']]} sel=${mode} on=${setBy} />`}
        <div className="cv9-boxes" style=${{ marginTop: 0 }}>
          <div className="cv9-frm"><b>fun_one (caller)</b><div className="cv9-vars"><div className="cv9-v"><span className=${mode === 'addr' && i >= 3 ? 'hot' : ''}>10</span>actual_parameter</div></div></div>
          <div className="cv9-frm"><b>fun_two (called)</b><div className="cv9-vars"><div className="cv9-v"><span className=${mode === 'addr' ? 'ref' : 'hot'}>${mode === 'addr' ? '→ actual_parameter' : '10'}</span>formal_parameter</div></div></div>
        </div>
        <div className="cv9-out"><em>output</em>${i >= 5 ? '10' : ''}</div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 9: parameter-passing mechanisms on concentrate(i, a[i]) ── */
  const MODES = [['value', 'By value'], ['result', 'By result'], ['vr', 'By value-result'], ['ref', 'By reference']];
  const MNAME = { value: 'by value', result: 'by result', vr: 'by value-result', ref: 'by reference' };
  const MAR = { value: 'الـ by value', result: 'الـ by result', vr: 'الـ by value-result', ref: 'الـ by reference' };
  const EXP = {
    lec: { value: ['3 5 1 0 3', '2 1 0 3'], result: ['1 3 1 0 3', '1 1 3 3'], vr: ['3 5 1 0 3', '3 1 5 3'], ref: ['3 0 1 0 3', '3 1 0 3'] },
    quiz: { result: [null, '2 2 8 0'], vr: [null, '3 2 12 0'] }
  };
  const progLec = (a, i0) => ({ key: 'lec', base: 1, a, i0, f: ['j', 'x'], d: [1, 3], zi: 2, local: true, pre: true, pin: true, proc: 'concentrate',
    code: [['glob', `var a: array[1..3] of integer := (${a.join(',')});`], ['glob', `var i: integer := ${i0};`], ['', 'proc concentrate(mode j, x: integer) is'], ['local', '   var i: integer := 0;'], ['', 'begin'],
      ['j', '   j := j+1;'], ['x', '   x := x+3;'], ['z', '   a[2] := 0;'], ['pin', '   print(j); print(x); print(a);'], ['ret', 'end concentrate;'], ['', 'begin'],
      ['pre', '   print(i); print(a);'], ['call', '   concentrate(i, a[i]);'], ['post', '   print(i); print(a);'], ['', 'end']] });
  const progQuiz = () => ({ key: 'quiz', base: 0, a: [2, 4, 6], i0: 1, f: ['y', 'x'], d: [2, 8], zi: 2, local: false, pre: false, pin: false, proc: 'method',
    code: [['glob', 'int a[] = {2,4,6};'], ['glob', 'int i = 1;'], ['', 'method(mode y, x) {'], ['j', '   y := y+2;'], ['x', '   x := x+8;'], ['z', '   a[2] := 0;'], ['ret', '}'],
      ['call', 'method(i, a[i]);'], ['post', 'print i, a[0], a[1], a[2];']] });

  function runParams(P, mode) {
    const G = { i: P.i0, a: P.a.slice() }, out = [], S = []; let F = null;
    const [f0, f1] = P.f, xi = P.i0, ax = k => k - P.base, ref = mode === 'ref';
    const gj = () => ref ? G.i : F.j, gx = () => ref ? G.a[ax(xi)] : F.x;
    const snap = (key, en, a, hot) => S.push({ key, G: { i: G.i, a: G.a.slice() }, F: F && { j: gj(), x: gx(), li: F.li }, out: out.slice(), hot: hot || [], en, ar: a });
    const arr = () => G.a.join(' '), A = `a[${xi}]`;
    snap('glob', `Globals: a = (${P.a.join(', ')}) and i = ${P.i0}. Mode: <b>${MNAME[mode]}</b>.`, `الـ globals هي${L(`a = (${P.a.join(', ')}), i = ${P.i0}`)}والطريقة: <b>${MAR[mode]}</b>.`, ['i', 'a']);
    if (P.pre) { out.push(`${G.i} ${arr()}`); snap('pre', `Main prints i and a: <b>${out[0]}</b>.`, `الـ main بيطبع i و a:${L(out[0])}`); }
    const call = `${P.proc}(i, a[i])`;
    if (mode === 'value') { F = { j: G.i, x: G.a[ax(xi)] }; snap('call', `Call ${call}: i = ${G.i}, so the call is ${P.proc}(i, ${A}). <b>By value</b>: ${f0} gets a copy of i (${F.j}) and ${f1} a copy of ${A} (${F.x}). Nothing will be copied back.`, `الـ call ده${L(call)}وبما إن${L('i = ' + G.i)}يبقى الـ call على${L(A)}و<b>by value</b> يعني ${f0} بياخد نسخة من i وهي ${F.j}، و ${f1} بياخد نسخة من${L(A)}وهي ${F.x}. ومفيش حاجة هترجع.`, ['j', 'x']); }
    if (mode === 'result') { F = { j: 0, x: 0 }; snap('call', `Call ${call} = ${P.proc}(i, ${A}). <b>By result</b>: no value goes in, so ${f0} = 0 and ${f1} = 0. The addresses of i and ${A} are kept for the copy back.`, `الـ call ده${L(`${call} = ${P.proc}(i, ${A})`)}و<b>by result</b> يعني مفيش قيمة بتدخل، فالـ ${f0} و ${f1} بيبدأوا بـ 0. وعناوين i و${L(A)}بتتحفظ عشان الـ copy back.`, ['j', 'x']); }
    if (mode === 'vr') { F = { j: G.i, x: G.a[ax(xi)] }; snap('call', `Call ${call} = ${P.proc}(i, ${A}). <b>By value-result</b>: copied in (${f0} = ${F.j}, ${f1} = ${F.x}), and the addresses i and ${A} are fixed now, at call time, for the copy back.`, `الـ call ده${L(`${call} = ${P.proc}(i, ${A})`)}و<b>by value-result</b> يعني القيم بتدخل نسخ (${f0} = ${F.j} و ${f1} = ${F.x})، وعناوين i و${L(A)}بتتثبت دلوقتي وقت الـ call عشان الـ copy back.`, ['j', 'x']); }
    if (ref) { F = {}; snap('call', `Call ${call} = ${P.proc}(i, ${A}). <b>By reference</b>: ${f0} is another name (alias) for i, and ${f1} IS ${A}. No copies.`, `الـ call ده${L(`${call} = ${P.proc}(i, ${A})`)}و<b>by reference</b> يعني ${f0} اسم تاني (alias) لـ i، و ${f1} هو نفسه${L(A)}ومفيش نسخ.`, ['j', 'x', 'i', 'a' + xi]); }
    if (P.local) { F.li = 0; snap('local', `A local i := 0 is created inside ${P.proc}. It hides the global i, but the call already used the global i (${P.i0}) to pick ${A}.`, `اتعمل i جديد local جوه الـ ${P.proc} قيمته 0. ده بيخبّي الـ i الـ global، بس الـ call كان خلاص استخدم الـ i الـ global (${P.i0}) عشان يختار${L(A)}`, ['li']); }
    const setJ = v => { if (ref) G.i = v; else F.j = v; }, setX = v => { if (ref) G.a[ax(xi)] = v; else F.x = v; };
    setJ(gj() + P.d[0]); snap('j', `${f0} := ${f0}+${P.d[0]} gives ${f0} = <b>${gj()}</b>` + (ref ? `, and since ${f0} is i, the global i is now ${G.i}.` : '.'), `الـ ${f0} بقى <b>${gj()}</b>` + (ref ? `، وبما إن ${f0} هو i فالـ i الـ global بقى ${G.i}.` : '.') + L(`${f0} := ${f0}+${P.d[0]}`), ref ? ['j', 'i'] : ['j']);
    setX(gx() + P.d[1]); snap('x', `${f1} := ${f1}+${P.d[1]} gives ${f1} = <b>${gx()}</b>` + (ref ? `, written straight into ${A}.` : '.'), `الـ ${f1} بقى <b>${gx()}</b>` + (ref ? ` ومكتوب على طول في${L(A)}` : '.') + (ref ? '' : L(`${f1} := ${f1}+${P.d[1]}`)), ref ? ['x', 'a' + xi] : ['x']);
    G.a[ax(P.zi)] = 0;
    const same = xi === P.zi;
    snap('z', `a[${P.zi}] := 0 writes the global array` + (same ? (ref ? `: ${f1} IS a[${P.zi}], so ${f1} is 0 now too.` : `: ${f1} is a separate copy, so it keeps ${gx()}.`) : '.'), `الـ${L(`a[${P.zi}] := 0`)}بيكتب في الـ array الـ global` + (same ? (ref ? `، وبما إن ${f1} هو نفسه${L(`a[${P.zi}]`)}فالـ ${f1} بقى 0 هو كمان.` : `، والـ ${f1} نسخة منفصلة فبيفضل ${gx()}.`) : '.'), ['a' + P.zi].concat(same && ref ? ['x'] : []));
    if (P.pin) { out.push(`${gj()} ${gx()} ${arr()}`); snap('pin', `Inside, print(${f0}); print(${f1}); print(a) prints <b>${out[out.length - 1]}</b>.`, `جوه الـ procedure الطباعة بتطلع${L(out[out.length - 1])}`); }
    const vj = gj(), vx = gx();
    if (mode === 'result' || mode === 'vr') {
      G.i = vj; G.a[ax(xi)] = vx;
      snap('ret', `Return: copy back i := ${f0} (${vj}) and ${A} := ${f1} (${vx})` + (same ? `. This overwrites the 0 that a[${P.zi}] := 0 wrote.` : '.'), `الـ Return: بيحصل copy back، يعني i بياخد ${vj} و${L(A)}بياخد ${vx}` + (same ? `، وده بيمسح الـ 0 اللي${L(`a[${P.zi}] := 0`)}كتبه.` : '.'), ['i', 'a' + xi]);
    } else snap('ret', mode === 'ref' ? 'Return: nothing to copy back, the changes were already made in place.' : 'Return: by value nothing is copied back; the copies are thrown away.', mode === 'ref' ? 'الـ Return: مفيش حاجة ترجع، التغييرات حصلت في مكانها خلاص.' : 'الـ Return: في الـ by value مفيش حاجة بترجع، والنسخ بتترمي.');
    F = null; out.push(`${G.i} ${arr()}`);
    const e = (EXP[P.key] || {})[mode], ok = e && e[1] === out[out.length - 1] && (!e[0] || !P.pin || e[0] === out[1]);
    snap('post', `After the call main prints <b>${out[out.length - 1]}</b>.` + (ok ? ' Same as the notes ✓' : ''), `بعد الـ call الـ main بيطبع${L(out[out.length - 1])}` + (ok ? 'ونفس اللي في الـ notes ✓' : ''));
    return S;
  }

  function ParamRun({ P, mode, ar }) {
    const S = runParams(P, mode), [i, ctl] = useSteps(S.length, 2600), s = S[i];
    const hot = k => s.hot.includes(k) ? 'hot' : '';
    const ref = mode === 'ref', [f0, f1] = P.f;
    const all = MODES.map(([k, t]) => { const R = runParams(P, k), o = R[R.length - 1].out; return [k, t, o.join(' / ')]; });
    return html`<div>
      <div className="cv9-code">${P.code.map(([k, t], j) => html`<div key=${j} className=${k && k === s.key ? 'on' : ''}>${t}</div>`)}</div>
      <div className="cv9-boxes">
        <div className="cv9-frm"><b>main (globals)</b><div className="cv9-vars">
          <div className="cv9-v"><span className=${hot('i')}>${s.G.i}</span>i</div>
          ${s.G.a.map((v, k) => html`<div key=${k} className="cv9-v"><span className=${hot('a' + (k + P.base))}>${v}</span>a[${k + P.base}]</div>`)}</div></div>
        <div className="cv9-frm" style=${{ opacity: s.F ? 1 : .35 }}><b>${P.proc} (frame)</b><div className="cv9-vars">
          ${s.F ? html`
            <div className="cv9-v"><span className=${hot('j') + (ref ? ' ref' : '')}>${ref ? '→ i = ' + s.F.j : s.F.j}</span>${f0}</div>
            <div className="cv9-v"><span className=${hot('x') + (ref ? ' ref' : '')}>${ref ? `→ a[${P.i0}] = ` + s.F.x : s.F.x}</span>${f1}</div>
            ${s.F.li != null && html`<div className="cv9-v"><span className=${hot('li')}>${s.F.li}</span>local i</div>`}` : html`<span className="cv9-v">not active</span>`}
        </div></div>
      </div>
      <div className="cv9-out"><em>output</em>${s.out.map((o, k) => html`<div key=${k}>${o}</div>`)}</div>
      <div className="cv9-sum" aria-label="output of every mode">${all.map(([k, t, o]) => html`<div key=${k} className=${k === mode ? 'cur' : ''}>${t}<span>${o}</span></div>`)}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></div>`;
  }

  function ParamModes({ ar }) {
    const [ex, setEx] = useState('lec'), [mode, setMode] = useState('value'), [oi, setOi] = useState(2), [oa, setOa] = useState([1, 2, 3]);
    const P = ex === 'lec' ? progLec([1, 2, 3], 2) : ex === 'quiz' ? progQuiz() : Object.assign(progLec(oa, oi), { key: 'own' });
    const stp = (lab, v, set, lo, hi, k) => html`<span key=${k} className="cv9-stp">${lab}<button aria-label=${'decrease ' + lab} onClick=${() => set(Math.max(lo, v - 1))}>−</button><b>${v}</b><button aria-label=${'increase ' + lab} onClick=${() => set(Math.min(hi, v + 1))}>+</button></span>`;
    return html`<figure className="fig cv9"><div className="fig-stage">
      <${Chips} items=${[['lec', 'Example from the notes'], ['quiz', 'Quiz example'], ['own', 'Try your own']]} sel=${ex} on=${setEx} />
      ${ex === 'own' && html`<div className="cv9-own">${stp('i', oi, setOi, 1, 3, 'i')}${oa.map((v, k) => stp(`a[${k + 1}]`, v, n => setOa(a => a.map((w, j) => j === k ? n : w)), 0, 9, k))}</div>`}
      <${Chips} items=${MODES} sel=${mode} on=${setMode} />
      <${ParamRun} key=${ex + mode + oi + oa.join('')} P=${P} mode=${mode} ar=${ar} />
    </div></figure>`;
  }

  /* ── slides 11–12: the peephole (window) sliding over the code, redundant load and store elimination ── */
  function PeepRedundant({ ar }) {
    const steps = [
      { en: 'Initial code: 4 instructions. Peephole optimization looks at a small window of them at a time (the <b>peephole</b>).', ar: 'الكود الأصلي: 4 instructions. الـ Peephole optimization بيبص على window صغيرة منهم كل مرة (الـ <b>peephole</b>).', w: -1 },
      { en: 'Window on y = x + 5; i = y; nothing redundant: y is computed and stored in i.', ar: 'الـ window على أول سطرين: مفيش حاجة زيادة، الـ y بيتحسب ويتخزن في i.', w: 0 },
      { en: 'Window on i = y; z = i; z is just another copy of i, which is a copy of y.', ar: 'الـ window على السطر التاني والتالت: الـ z مجرد نسخة تانية من i، والـ i نسخة من y.', w: 1 },
      { en: 'Window on z = i; w = z * 3; z only carries the value into w, so the store into z and its load are <b>redundant</b>: use y directly.', ar: 'الـ window على آخر سطرين: الـ z بس بينقل القيمة لـ w، فالـ store في z والـ load منه <b>redundant</b>: نستخدم y على طول.', w: 2 },
      { en: 'Optimized code: y = x + 5; i = y; w = y * 3; <b>3 instructions instead of 4</b>, shorter and faster, with the same output. Try any x: w is the same.', ar: 'الكود بعد الـ optimization فيه <b>3 instructions بدل 4</b>: أقصر وأسرع وبيدّي نفس الـ output. جرّب أي x وهتلاقي w زي ما هي.', w: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), [x, setX] = useState(1), s = steps[i];
    const C = ['y = x + 5;', 'i = y;', 'z = i;', 'w = z * 3;'];
    const y = x + 5, w1 = y * 3, w2 = y * 3;
    return html`<figure className="fig cv9"><div className="fig-stage"><div className="cv9-two">
      <div><span className="cv9-tag">Initial code</span><div className="cv9-code cv9-win">${C.map((t, k) => html`<div key=${k} className=${(s.w >= 0 && s.w < 3 && (k === s.w || k === s.w + 1) ? 'in' : '') + (i >= 3 && k === 2 ? ' gone' : '')}>${i >= 3 && k === 3 ? html`w = <span className="tk on">${i >= 4 ? 'y' : 'z'}</span> * 3;` : t}</div>`)}</div></div>
      ${i >= 4 && html`<div><span className="cv9-tag">Optimized code</span><div className="cv9-code"><div>y = x + 5;</div><div>i = y;</div><div className="new">w = y * 3;</div></div></div>`}
      </div>
      ${i >= 4 && html`<div>
        <div className="cv9-sl" style=${{ marginTop: '10px' }}><span>x =</span><input type="range" min="0" max="20" value=${x} onInput=${e => setX(+e.target.value)} aria-label="value of x" /><b>${x}</b></div>
        <div className="cv9-cnt" style=${{ marginTop: 0 }}><div>initial: 4 instructions<b>w = ${w1}</b></div><div className="good">optimized: 3 instructions<b>w = ${w2}</b></div></div>
      </div>`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 12: constant folding and combine operations ── */
  function PeepFold({ ar }) {
    const steps = [
      { en: '<b>Constant folding</b>, initial code: x = 2 * 3; both operands are constants, so the value can be computed at compile time.', ar: 'الـ <b>Constant folding</b>، الكود الأصلي فيه ضرب رقمين ثابتين، فالقيمة ممكن تتحسب في الـ compile time.' + L('x = 2 * 3;') },
      { en: 'Optimized code: x = 6; the multiplication no longer happens at runtime.', ar: 'الكود بعد الـ optimization مابقاش فيه ضرب وقت الـ runtime.' + L('x = 6;') },
      { en: '<b>Combine operations</b>: several operations are replaced by a single equivalent one. The slide’s code: 5 operations at runtime.', ar: 'الـ <b>Combine operations</b>: كذا operation بتتبدّل بواحدة مكافئة. كود الـ slide فيه 5 operations وقت الـ runtime.' },
      { en: 'Fold the constant parts: 2*3 is 6 and 3*8 is 24.', ar: 'نعمل fold للأجزاء الثابتة:' + L('2*3 = 6, 3*8 = 24') },
      { en: 'Combine (6)+5 into the single value 11: X = 11;', ar: 'نجمع العملية في قيمة واحدة:' + L('(6)+5 → 11') },
      { en: 'X is now a known constant, so it can be used directly: y = 11 – Sqrt(24); only 2 operations are left at runtime.', ar: 'الـ X بقى constant معروف، فنستخدمه على طول. وفاضل operations اتنين بس وقت الـ runtime.' + L('X = 11; y = 11 – Sqrt(24);') }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const T = (t, c) => html`<span className=${'tk ' + (c || '')}>${t}</span>`;
    let a, b, ops;
    if (i <= 1) { a = i === 0 ? html`x = ${T('2 * 3', 'fold')};` : html`x = ${T('6', 'ok')};`; b = null; ops = i === 0 ? 1 : 0; }
    else if (i === 2) { a = html`X = (2*3)+5;`; b = html`y = X – Sqrt(3*8);`; ops = 5; }
    else if (i === 3) { a = html`X = (${T('6', 'ok')})+5;`; b = html`y = X – Sqrt(${T('24', 'ok')});`; ops = 3; }
    else if (i === 4) { a = html`X = ${T('11', 'ok')};`; b = html`y = X – Sqrt(24);`; ops = 2; }
    else { a = html`X = 11;`; b = html`y = ${T('11', 'ok')} – Sqrt(24);`; ops = 2; }
    return html`<figure className="fig cv9"><div className="fig-stage">
      <span className="cv9-tag">${i <= 1 ? 'Constant folding' : 'Combine operations'}</span>
      <div className="cv9-code" style=${{ fontSize: '.95rem' }}><div>${a}</div>${b && html`<div>${b}</div>`}</div>
      <p className="cv9-ops">operations left at runtime: <b>${ops}</b></p>
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 13 and the exam version: loop optimization (code hoisting) ── */
  function LoopHoist({ ar }) {
    const [ver, setVer] = useState('java'), [n, setN] = useState(10), [t, setT] = useState(0), [play, setPlay] = useState(false);
    const java = ver === 'java', len = n, checks = java ? len + 1 : len, body = java ? len : len - 1;
    useEffect(() => { setT(calm() ? checks : 0); setPlay(!calm()); }, [ver, n]);
    useEffect(() => { if (!play) return; if (t >= checks) { setPlay(false); return; } const id = setTimeout(() => setT(x => x + 1), 450); return () => clearTimeout(id); }, [t, play]);
    const iCur = t > 0 && t <= body ? t - 1 : -1, done = t >= checks;
    const arr = Array.from({ length: len }, (_, k) => k + 1);
    const A = java ? ['for(int i=0;i<arr.length;i++)', '   System.out.println(arr[i]);'] : ['for (i=0; i < a→length-1; i++)', '   swap_elements(a[i], a[i+1]);'];
    const B = java ? ['int size = arr.length;', 'for(int i=0;i<size;i++)', '   System.out.println(arr[i]);'] : ['int x = a→length-1;', 'for (i=0; i < x; i++)', '   swap_elements(a[i], a[i+1]);'];
    const ex = java ? 'arr.length' : 'length-1';
    const en = (java ? `Slide 13: the condition <b>i &lt; arr.length</b> is checked ${checks} times for the ${len}-element array (i = 0 … ${len}), so arr.length is evaluated on every check. ` : `Exam version: the bound <b>a→length-1</b> is recomputed on every check: ${checks} times for a ${len}-element array (i = 0 … ${len - 1}). `)
      + `The optimized loop computes it <b>once</b> before the loop (code hoisting) and compares against ${java ? 'size' : 'x'}. Same output, less processing and time.`;
    const a = (java ? `في slide 13 الشرط${L('i &lt; arr.length')}بيتشيك ${checks} مرة للـ array اللي فيها ${len} عناصر، يعني الـ arr.length بيتحسب في كل مرة. ` : `في نسخة الامتحان الحد${L('a→length-1')}بيتحسب من جديد في كل check، يعني ${checks} مرة لـ array فيها ${len} عناصر. `)
      + `والـ loop بعد الـ optimization بيحسبه <b>مرة واحدة</b> قبل الـ loop (code hoisting) ويقارن بـ ${java ? 'size' : 'x'}. نفس الـ output بس processing ووقت أقل.`;
    return html`<figure className="fig cv9"><div className="fig-stage">
      <${Chips} items=${[['java', 'Slide example'], ['exam', 'Exam version']]} sel=${ver} on=${setVer} />
      <div className="cv9-sl"><span>array length</span><input type="range" min="2" max="16" value=${n} onInput=${e => setN(+e.target.value)} aria-label="array length" /><b>${n}</b>${n !== 10 && html`<button className="fig-btn" onClick=${() => setN(10)}>slide: 10</button>`}</div>
      <div className="cv9-two">
        <div><span className="cv9-tag">Initial</span><div className="cv9-code">${A.map((l, k) => html`<div key=${k} className=${k === 0 && t > 0 && !done ? 'on' : ''}>${l}</div>`)}</div></div>
        <div><span className="cv9-tag">Optimized</span><div className="cv9-code">${B.map((l, k) => html`<div key=${k} className=${k === 0 && t > 0 ? 'new' : k === 1 && t > 0 && !done ? 'on' : ''}>${l}</div>`)}</div></div>
      </div>
      <div className="cv9-arr" aria-label="array elements">${arr.map((v, k) => html`<span key=${k} className=${k === iCur ? 'cur' : (k < iCur || (done && k < body) || (t > body && k < body) ? 'done' : '')}>${java ? v : 'a' + k}</span>`)}</div>
      <div className="cv9-cnt">
        <div>initial: ${ex} evaluated<b>${t}</b></div>
        <div className="good">optimized: evaluated<b>${t > 0 ? 1 : 0}</b></div>
      </div>
      <div className="cv9-row" style=${{ marginTop: '10px', marginBottom: 0 }}><button className="fig-btn solid" onClick=${() => { setT(0); setPlay(!calm()); if (calm()) setT(checks); }}>↻ Run the loop</button></div>
    </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'cc-runtime-env': RuntimeEnv,
    'cc-mem-needs': MemNeeds,
    'cc-alloc-kinds': AllocKinds,
    'cc-mem-layout': MemLayout,
    'cc-formal-actual': FormalActual,
    'cc-param-modes': ParamModes,
    'cc-peep-redundant': PeepRedundant,
    'cc-peep-fold': PeepFold,
    'cc-loop-hoist': LoopHoist,
  });
})();

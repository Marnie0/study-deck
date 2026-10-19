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


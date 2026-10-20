// Visuals for the Multimedia notes (names 'mm-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fm-accent')) { const s = document.createElement('style'); s.id = 'fm-accent'; s.textContent = '[data-fig^="mm-"]{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }'; document.head.appendChild(s); } })();
/* ── part 1 ── */
/* ── part 1 ── */
// Multimedia visuals, part 1: Lecture 1 (Introduction to Multimedia), slides 6, 7, 8, 14, 23–27.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.fm1 .fig-dots i.on{ background:var(--k-mm); } .fm1 .fig-btn:hover{ border-color:var(--k-mm); } .fm1 .fig-btn.solid{ background:var(--s-mm); color:#fff; }
.fm1 .fig-btn.sel{ border-color:var(--k-mm); box-shadow:0 0 0 1px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.fm1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fm1-k{ color:var(--k-mm); font-weight:700; }
.fm1-muted{ color:var(--graphite); font-size:.85rem; }
/* hypertext */
.fm1-ht{ display:grid; grid-template-columns:minmax(0, 120px) minmax(0, 1fr); gap:10px; max-width:520px; margin:0 auto; }
.fm1-toc{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px; display:grid; gap:4px; align-content:start; }
.fm1-toc .h{ font-size:.78rem; color:var(--graphite); text-align:center; }
.fm1-toc button{ font:inherit; font-size:.86rem; border:1px solid var(--line); border-radius:6px; background:var(--paper-2); color:var(--ink); padding:5px 4px; cursor:pointer; min-height:32px; }
.fm1-toc button.on{ border-color:var(--k-mm); background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); }
.fm1-page{ border:1.5px solid var(--graphite); border-radius:6px; background:var(--paper); padding:24px 10px 12px; position:relative; transition:box-shadow .35s; }
.fm1-page.flash{ box-shadow:0 0 0 3px var(--k-mm); }
.fm1-page .no{ position:absolute; top:4px; right:8px; font-size:.82rem; color:var(--graphite); }
.fm1-ln{ display:flex; align-items:center; gap:6px; height:26px; }
.fm1-ln i{ display:block; height:7px; border-radius:4px; background:var(--faint); opacity:.7; }
.fm1-hs{ width:26px; height:26px; border-radius:50%; border:0; padding:0; cursor:pointer; background:transparent; display:grid; place-items:center; flex:none; }
.fm1-hs::after{ content:""; width:14px; height:14px; border-radius:50%; background:var(--pen); box-shadow:0 0 0 3px color-mix(in srgb, var(--pen) 25%, transparent); }
.fm1-hs:hover::after, .fm1-hs:focus-visible::after{ transform:scale(1.25); }
.fm1-trail{ text-align:center; margin:10px 0 0; font-size:.92rem; color:var(--ink); }
.fm1-trail span{ font-family:var(--mono); color:var(--k-mm); font-weight:700; }
@media (max-width:420px){ .fm1-ht{ grid-template-columns:minmax(0, 92px) minmax(0, 1fr); gap:8px; } }
/* lip sync */
.fm1-ls{ max-width:520px; margin:0 auto; }
.fm1-ls svg{ max-width:260px !important; }
.fm1-trk{ display:grid; grid-template-columns:52px minmax(0, 1fr); gap:6px; align-items:center; margin-top:6px; }
.fm1-trk > span{ font-size:.85rem; font-weight:600; color:var(--ink); }
.fm1-cells{ display:grid; grid-template-columns:repeat(16, minmax(0, 1fr)); gap:2px; }
.fm1-cells div{ height:24px; border-radius:3px; border:1px solid var(--line); background:var(--paper); display:grid; place-items:center; font:600 .75rem/1 var(--mono); color:var(--graphite); }
.fm1-cells div.v{ background:color-mix(in srgb, var(--k-mm) 32%, var(--paper)); color:var(--ink); }
.fm1-cells div.a{ background:color-mix(in srgb, var(--ok) 32%, var(--paper)); }
.fm1-cells div.cur{ outline:2px solid var(--ink); outline-offset:1px; }
.fm1-chk{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; margin:10px 0 0; font-size:.9rem; color:var(--ink); }
.fm1-chk .y{ color:var(--ok); font-weight:700; } .fm1-chk .n{ color:var(--pen); font-weight:700; }
/* calculator */
.fm1-calc{ max-width:540px; margin:0 auto; color:var(--ink); }
.fm1-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.fm1-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.fm1-in{ display:grid; grid-template-columns:repeat(auto-fit, minmax(118px, 1fr)); gap:8px; margin:4px 0 10px; }
.fm1-in label{ display:grid; gap:3px; font-size:.82rem; color:var(--graphite); }
.fm1-in input, .fm1-in select{ font:inherit; font-size:.95rem; padding:5px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-width:0; width:100%; box-sizing:border-box; }
.fm1-in input:focus, .fm1-in select:focus{ outline:2px solid var(--k-mm); outline-offset:1px; }
.fm1-res{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 12px; font-size:.92rem; line-height:1.55; overflow-wrap:anywhere; }
.fm1-res .f{ font-family:var(--mono); font-size:.85rem; }
.fm1-res .big{ font-size:1.05rem; font-weight:700; color:var(--k-mm); }
.fm1-res .sl{ margin-top:6px; padding:4px 8px; border-radius:6px; background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
/* frames */
.fm1-fr{ max-width:520px; margin:0 auto; }
.fm1-strip{ display:grid; gap:2px; margin-top:8px; }
.fm1-strip div{ height:16px; border-radius:2px; border:1px solid var(--line); background:var(--paper); }
.fm1-strip div.done{ background:color-mix(in srgb, var(--k-mm) 30%, var(--paper)); } .fm1-strip div.cur{ background:var(--k-mm); }
.fm1-cnt{ text-align:center; margin:8px 0 0; font-size:.95rem; color:var(--ink); } .fm1-cnt span{ font-family:var(--mono); font-weight:700; color:var(--k-mm); }
/* lossy / lossless */
.fm1-cmp{ max-width:540px; margin:0 auto; display:grid; gap:10px; }
.fm1-line{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; transition:opacity .4s, box-shadow .4s; }
.fm1-line.dim{ opacity:.35; } .fm1-line.on{ box-shadow:0 0 0 2px var(--k-mm); }
.fm1-line .t{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:2px 10px; font-size:.86rem; margin-bottom:6px; color:var(--ink); }
.fm1-line .t .nm{ font-weight:700; } .fm1-line .t .q{ color:var(--graphite); }
.fm1-bars{ display:flex; align-items:flex-end; gap:2px; height:44px; }
.fm1-bars i{ display:block; flex:1 1 0; min-width:0; background:var(--k-mm); border-radius:2px 2px 0 0; transition:flex .6s ease, opacity .6s ease, margin .6s ease; }
.fm1-bars i.lr{ background:var(--faint); }
.fm1-bars i.gone{ flex:0 0 0; opacity:0; margin:0 -1px; }
.fm1-leg{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.82rem; color:var(--ink); }
.fm1-leg i{ display:inline-block; width:12px; height:12px; border-radius:2px; margin-right:5px; vertical-align:-1px; }
.fm1-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; min-height:30px; }
.fm1-chips span{ border:1px solid var(--k-mm); border-radius:99px; padding:3px 10px; font-size:.84rem; background:var(--paper); color:var(--ink); }
.fm1-filter{ font-weight:800; color:var(--pen); letter-spacing:.04em; }
/* synthesis */
.fm1-syn{ max-width:520px; margin:0 auto; }
.fm1-keys{ display:grid; grid-template-columns:repeat(8, minmax(0, 1fr)); gap:3px; max-width:400px; margin:0 auto; }
.fm1-keys button{ height:92px; border:1px solid var(--graphite); border-radius:0 0 6px 6px; background:#fafafa; cursor:pointer; padding:0; transition:background .12s; }
.fm1-keys button.dn{ background:color-mix(in srgb, var(--k-mm) 45%, #fafafa); }
.fm1-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; margin-top:10px; }
.fm1-two > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.45; color:var(--ink); min-width:0; }
.fm1-two .hd{ font-weight:700; margin-bottom:4px; } .fm1-two .n{ font:700 1.05rem var(--mono); color:var(--k-mm); overflow-wrap:anywhere; }
.fm1-ins{ display:flex; flex-wrap:wrap; gap:3px; margin-top:4px; max-height:84px; overflow:hidden; }
.fm1-ins span{ font:500 .74rem/1.2 var(--mono); border:1px solid var(--line); border-radius:4px; padding:2px 4px; }
@media (max-width:420px){ .fm1-two{ grid-template-columns:1fr; } }
@media (prefers-reduced-motion: reduce){ .fm1-bars i, .fm1-page{ transition:none; } }
`;
  if (!document.getElementById('fm1-css')) { const s = document.createElement('style'); s.id = 'fm1-css'; s.textContent = CSS; document.head.appendChild(s); }

  const arrowDef = (id, col) => html`<marker id=${id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${col} /></marker>`;
  const num = n => Math.round(n).toLocaleString('en-US');
  const mb = (b, d) => String(parseFloat((b / d).toFixed(2)));

  /* ── L1 slide 6: HyperText, hot spots and the content table-like view ── */
  const HT = [{ 1: 2, 4: 1 }, { 2: 0, 5: 2 }, { 0: 1, 3: 0 }];
  const W = [[92, 78, 95, 70, 86, 62, 88], [84, 96, 74, 90, 66, 80, 58], [70, 92, 86, 76, 94, 68, 82]];
  function Hypertext({ ar }) {
    const [pg, setPg] = useState(0), [trail, setTrail] = useState([0]), [msg, setMsg] = useState(null), [flash, setFlash] = useState(false);
    useEffect(() => { if (!flash) return; const t = setTimeout(() => setFlash(false), 600); return () => clearTimeout(t); }, [flash]);
    const go = (to, how) => { setPg(to); setTrail(t => t.concat(to).slice(-9)); setFlash(!calm()); setMsg(how === 'hs'
      ? { en: 'You clicked a <b>hot spot</b>: the reader is <b>immediately transported to related material</b> in the document (page ' + (to + 1) + ').', ar: 'دوست على <b>hot spot</b>: القارئ <b>اتنقل على طول للمادة المرتبطة</b> في الـ document (صفحة ' + (to + 1) + ').' }
      : { en: 'Navigation by an <b>"overview" mechanism</b>: the <b>content table-like view</b> on the left takes you straight to page ' + (to + 1) + '.', ar: 'تنقل بـ <b>آلية "overview"</b>: الـ <b>view اللي شبه جدول المحتويات</b> على الشمال بتوديك على طول لصفحة ' + (to + 1) + '.' }); };
    const intro = { en: 'HyperText is <b>non-linear</b> documents. <b>Try it:</b> click a red <b>hot spot</b> in the page, or a page in the content table on the left.', ar: 'الـ HyperText هو documents <b>non-linear</b>. <b>جرّب:</b> دوس على <b>hot spot</b> حمرا في الصفحة، أو على صفحة في جدول المحتويات اللي على الشمال.' };
    const m = msg || intro;
    const jumped = trail.some((p, k) => k > 0 && p !== trail[k - 1] + 1);
    return html`<figure className="fig fm1"><div className="fig-stage"><div className="fm1-ht">
      <div className="fm1-toc" role="group" aria-label="Content table-like view"><div className="h">Contents</div>
        ${[0, 1, 2].map(k => html`<button key=${k} className=${pg === k ? 'on' : ''} onClick=${() => go(k, 'toc')}>Page ${k + 1}</button>`)}</div>
      <div className=${'fm1-page' + (flash ? ' flash' : '')} aria-label=${'Page ' + (pg + 1)}><span className="no">page ${pg + 1}</span>
        ${W[pg].map((w, l) => html`<div key=${pg + '-' + l} className="fm1-ln"><i style=${{ width: (HT[pg][l] != null ? w - 16 : w) + '%' }}></i>
          ${HT[pg][l] != null && html`<button className="fm1-hs" onClick=${() => go(HT[pg][l], 'hs')} aria-label=${'Hot spot: go to page ' + (HT[pg][l] + 1)} title=${'hot spot → page ' + (HT[pg][l] + 1)}></button>`}</div>`)}
      </div></div>
      <p className="fm1-trail">Reading order: <span>${trail.map(p => p + 1).join(' → ')}</span>${jumped ? ' (non-linear)' : ''}</p></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="fm1-muted">Hot spots and the content table-like view are the two ways to navigate.</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => { setPg(0); setTrail([0]); setMsg(null); }}>↻ Start over</button></div></figure>`;
  }

  /* ── L1 slide 7: HyperText Navigation, Normal Text (LINEAR) vs HyperText ── */
  function LinearHyper({ ar }) {
    const steps = [
      { en: 'Traversal through pages of hypertext is usually <b>non-linear</b>. Compare it with normal text.', ar: 'التنقل بين صفحات الـ hypertext عادةً بيبقى <b>non-linear</b>. قارنه بالـ text العادي.' },
      { en: '<b>Normal Text</b> is read <b>LINEAR</b>: along each line, down the page, then on to the next page, always in one order.', ar: 'الـ <b>Normal Text</b> بيتقري <b>LINEAR</b>: على طول السطر، ونازل في الصفحة، وبعدين الصفحة اللي بعدها، دايماً بترتيب واحد.' },
      { en: '<b>HyperText</b>: a hot spot on one page jumps to another page, so the reading order is <b>non-linear</b> (here page 1 → 3 → 2 → 1).', ar: 'الـ <b>HyperText</b>: الـ hot spot في صفحة بتنطك لصفحة تانية، فترتيب القراية بيبقى <b>non-linear</b> (هنا صفحة 1 ← 3 ← 2 ← 1).' },
      { en: 'This has implications in the <b>layout and organisation</b> of material, and depends a lot on the application at hand.', ar: 'ده بيأثر على <b>الـ layout وتنظيم</b> المادة، وبيعتمد جامد على الـ application اللي شغالين عليه.' }
    ];
    const [i, ctl] = useSteps(steps.length, 5200);
    const [t, setT] = useState(0);
    useEffect(() => { setT(0); if (calm() || (i !== 1 && i !== 2)) return; const id = setInterval(() => setT(x => x + 1), i === 1 ? 420 : 700); return () => clearInterval(id); }, [i]);
    const lin = calm() ? -1 : t % 16, lp = Math.floor(lin / 8), ll = lin % 8;
    const P = { 1: [258, 36], 2: [356, 98], 3: [258, 164] };
    const route = [1, 3, 2], k = calm() ? -1 : Math.floor(t / 2) % 3;
    const ARR = ['M258 82 C222 104 222 176 256 192', 'M334 214 Q392 222 392 168', 'M392 98 Q392 50 334 54'];
    const DOT = { 1: [266, 82], 3: [326, 214], 2: [392, 108] };
    const page = (n) => { const [x, y] = P[n], on = i === 2 && route[k] === n; return html`<g key=${n}>
      <rect x=${x} y=${y} width="76" height="66" rx="3" fill="var(--paper)" stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${on ? 3 : 1.5} />
      ${[0, 1, 2, 3].map(r => html`<rect key=${r} x=${x + 8} y=${y + 24 + r * 10} width=${[54, 60, 46, 58][r]} height="4" rx="2" fill="var(--faint)" />`)}
      <text x=${x + 7} y=${y + 18} fontSize="20" fontWeight="700">${n}</text></g>`; };
    return html`<figure className="fig fm1"><div className="fig-stage">
      <svg viewBox="0 0 440 248" role="img" aria-label="Normal text read linearly in a book, and hypertext pages joined by hot-spot links">
        <defs>${arrowDef('fm1-ah', 'var(--graphite)')}${arrowDef('fm1-ahk', 'var(--k-mm)')}</defs>
        <g style=${{ opacity: i === 2 ? .35 : 1, transition: 'opacity .4s' }}>
          <text x="112" y="22" textAnchor="middle" fontSize="20" fontWeight="700">Normal Text</text>
          <path d="M40 36 H96 M128 36 H184" stroke="var(--graphite)" strokeWidth="2.5" markerEnd="url(#fm1-ah)" />
          <path d="M14 60 V176 M210 60 V176" stroke="var(--graphite)" strokeWidth="2.5" markerEnd="url(#fm1-ah)" />
          ${[0, 1].map(p => html`<g key=${p}><rect x=${26 + p * 88} y="48" width="84" height="140" rx="3" fill="var(--paper)" stroke=${i === 1 && lp === p ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${i === 1 && lp === p ? 2.5 : 1.5} />
            ${[0, 1, 2, 3, 4, 5, 6, 7].map(r => html`<rect key=${r} x=${34 + p * 88} y=${60 + r * 15} width="68" height="6" rx="3" fill=${i === 1 && lp === p && ll === r ? 'var(--k-mm)' : 'var(--faint)'} />`)}</g>`)}
          <text x="112" y="218" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--k-mm)" style=${{ fill: 'var(--k-mm)' }}>LINEAR</text>
        </g>
        <g style=${{ opacity: i === 1 ? .35 : 1, transition: 'opacity .4s' }}>
          <text x="350" y="22" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--pen)" style=${{ fill: 'var(--pen)' }}>HyperText</text>
          ${ARR.map((d, j) => html`<path key=${j} d=${d} fill="none" stroke=${i === 2 && k === j ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${i === 2 && k === j ? 3 : 1.8} markerEnd=${i === 2 && k === j ? 'url(#fm1-ahk)' : 'url(#fm1-ah)'} className=${i === 2 && k === j ? 'flow' : ''} />`)}
          ${[1, 2, 3].map(page)}
          ${[1, 2, 3].map(n => html`<circle key=${'d' + n} cx=${DOT[n][0]} cy=${DOT[n][1]} r=${i === 2 && route[k] === n ? 6 : 4.5} fill="var(--pen)" />`)}
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 8: Hypermedia, Graphics, Sound, Text and Video linked ── */
  function Hypermedia({ ar }) {
    const steps = [
      { en: 'Hypertext links <b>text</b> to other texts.', ar: 'الـ Hypertext بيربط <b>text</b> بنصوص تانية.' },
      { en: '<b>HyperMedia</b> is not constrained to be text-based. It can include other media, e.g. <b>graphics</b>, images,', ar: 'الـ <b>HyperMedia</b> مش مقصورة على الـ text. ممكن تضم media تانية، زي <b>graphics</b> وimages،' },
      { en: '... and especially <b>continuous media</b>: <b>sound</b>', ar: '... وخصوصاً الـ <b>continuous media</b>: الـ <b>sound</b>' },
      { en: '... and <b>video</b>.', ar: '... والـ <b>video</b>.' },
      { en: 'Every medium is linked to the others, both ways: <b>HYPERMEDIA</b>.', ar: 'كل media متربطة بالباقيين في الاتجاهين: ده الـ <b>HYPERMEDIA</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const A = 'var(--k-mm)', fl = i >= 4 && !calm() ? 'flow' : '';
    const L = (d, j) => html`<path key=${j} d=${d} fill="none" stroke=${A} strokeWidth="2.5" markerStart="url(#fm1-hm)" markerEnd="url(#fm1-hm)" className=${fl} />`;
    return html`<figure className="fig fm1"><div className="fig-stage">
      <svg viewBox="0 0 440 318" role="img" aria-label="Graphics, Sound, Text and Video joined by two-way arrows around the word HYPERMEDIA">
        <defs>${arrowDef('fm1-hm', A)}</defs>
        <g className=${pop(i >= 4)}>${['M220 84 V178', 'M112 132 H318', 'M252 40 Q350 40 366 98', 'M382 196 Q378 226 262 222', 'M178 222 Q62 226 58 196', 'M74 98 Q90 40 188 40'].map(L)}</g>
        <g className=${pop(i >= 1)}>
          <polygon points="196,52 214,20 232,52" fill="color-mix(in srgb, var(--k-mm) 55%, var(--paper))" />
          <circle cx="236" cy="38" r="15" fill="color-mix(in srgb, var(--s-mm) 70%, var(--paper))" opacity=".9" />
          <text x="220" y="74" textAnchor="middle" fontSize="20" fontWeight="700">Graphics</text></g>
        <g className=${pop(i >= 2)}>
          <path d="M30 122 h12 l16 -14 v48 l-16 -14 h-12 z" fill="var(--ink)" />
          ${[0, 1, 2].map(j => html`<path key=${j} d=${`M${66 + j * 9} ${118 - j * 5} q8 14 0 ${28 + j * 10}`} stroke=${A} strokeWidth="3" fill="none" />`)}
          <text x="60" y="186" textAnchor="middle" fontSize="20" fontWeight="700">Sound</text></g>
        <g>
          ${[0, 1].map(j => html`<g key=${j}><rect x=${352 + j * 16} y=${104 + j * 12} width="38" height="44" rx="2" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="1.5" />
            ${[0, 1, 2].map(r => html`<rect key=${r} x=${358 + j * 16} y=${112 + j * 12 + r * 9} width="26" height="3" rx="1.5" fill="var(--faint)" />`)}<circle cx=${384 + j * 16} cy=${140 + j * 12} r="3.5" fill="var(--pen)" /></g>`)}
          <text x="380" y="186" textAnchor="middle" fontSize="20" fontWeight="700">Text</text></g>
        <g className=${pop(i >= 3)}>
          <rect x="194" y="190" width="52" height="38" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" /><rect x="200" y="196" width="40" height="26" rx="2" fill="color-mix(in srgb, var(--k-mm) 30%, var(--paper))" />
          <text x="220" y="250" textAnchor="middle" fontSize="20" fontWeight="700">Video</text></g>
        <g className=${pop(i >= 4)}>
          <rect x="90" y="262" width="260" height="46" rx="3" fill="var(--ink)" />
          ${Array.from({ length: 16 }, (_, j) => html`<g key=${j}><rect x=${96 + j * 16} y="265" width="8" height="5" fill="var(--paper)" /><rect x=${96 + j * 16} y="300" width="8" height="5" fill="var(--paper)" /></g>`)}
          <rect x="104" y="273" width="232" height="24" fill="var(--paper)" />
          <text x="220" y="291" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--pen)" style=${{ fill: 'var(--pen)', letterSpacing: '.06em' }}>HYPERMEDIA</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 14: sequencing within the media and lip synchronisation ── */
  const MOUTH = [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0];
  const SHUF = [0, 5, 2, 9, 4, 1, 12, 7, 3, 14, 10, 6, 8, 15, 11, 13];
  function LipSync({ ar }) {
    const N = 16;
    const [f, setF] = useState(0), [play, setPlay] = useState(!calm()), [shuf, setShuf] = useState(false), [shift, setShift] = useState(false);
    useEffect(() => { if (!play) return; const id = setInterval(() => setF(x => (x + 1) % N), 320); return () => clearInterval(id); }, [play]);
    const vid = k => shuf ? SHUF[k] : k;
    const snd = k => MOUTH[shift ? (k + N - 3) % N : k];
    const open = MOUTH[vid(f)], sound = snd(f);
    const seqOk = !shuf, syncOk = !shuf && !shift;
    let cap;
    if (!shuf && !shift) cap = { en: 'Frames play in the <b>correct order/time frame</b> (sequencing within the media) and the sound matches the mouth (<b>synchronisation</b>, inter-media scheduling). <b>Try</b> the two buttons below.', ar: 'الـ frames بتشتغل <b>بالترتيب والتوقيت الصح</b> (sequencing within the media) والصوت ماشي مع البُق (<b>synchronisation</b>، inter-media scheduling). <b>جرّب</b> الزرارين اللي تحت.' };
    else if (shuf && !shift) cap = { en: 'Frames out of order: <b>sequencing within the media</b> fails. Video must play its frames in the correct order/time frame, and the mouth no longer matches the sound either.', ar: 'الـ frames مش بالترتيب: الـ <b>sequencing within the media</b> باظ. الـ video لازم يشغّل الـ frames بالترتيب والتوقيت الصح، وكمان البُق مبقاش ماشي مع الصوت.' };
    else if (!shuf) cap = { en: 'Audio shifted against the video: an <b>out of (lip) sync</b> film. Lip synchronisation is clearly important for humans to watch playback of video and audio, and even animation and audio. Ever tried watching one for a long time?', ar: 'الصوت متزحلق عن الـ video: فيلم <b>out of (lip) sync</b>. الـ lip synchronisation مهم جداً للناس وهم بيتفرجوا على video وaudio، وحتى animation وaudio. جربت تتفرج على فيلم كده مدة طويلة؟' };
    else cap = { en: 'Both fail: frames out of order (<b>sequencing</b>) and audio shifted (<b>synchronisation</b>). These are the temporal relationships a multimedia system must keep.', ar: 'الاتنين باظوا: الـ frames مش بالترتيب (<b>sequencing</b>) والصوت متزحلق (<b>synchronisation</b>). دي الـ temporal relationships اللي الـ multimedia system لازم يحافظ عليها.' };
    return html`<figure className="fig fm1"><div className="fig-stage"><div className="fm1-ls">
      <svg viewBox="0 0 260 120" role="img" aria-label=${'Mouth ' + (open ? 'open' : 'closed') + ', sound ' + (sound ? 'on' : 'off')}>
        <circle cx="80" cy="60" r="50" fill="color-mix(in srgb, var(--k-mm) 22%, var(--paper))" stroke="var(--graphite)" strokeWidth="2" />
        <circle cx="62" cy="46" r="5" fill="var(--ink)" /><circle cx="98" cy="46" r="5" fill="var(--ink)" />
        <ellipse cx="80" cy="82" rx="18" ry=${open ? 13 : 2.5} fill="var(--ink)" />
        <path d="M168 48 h12 l16 -14 v52 l-16 -14 h-12 z" fill="var(--ink)" />
        ${[0, 1, 2].map(j => html`<path key=${j} d=${`M${206 + j * 12} ${44 - j * 6} q10 16 0 ${32 + j * 12}`} stroke="var(--ok)" strokeWidth="4" fill="none" style=${{ opacity: sound ? 1 : .12 }} />`)}
      </svg>
      <div className="fm1-trk"><span>Video</span><div className="fm1-cells">${Array.from({ length: N }, (_, k) => html`<div key=${k} className=${(MOUTH[vid(k)] ? 'v' : '') + (k === f ? ' cur' : '')}>${vid(k) + 1}</div>`)}</div></div>
      <div className="fm1-trk"><span>Audio</span><div className="fm1-cells">${Array.from({ length: N }, (_, k) => html`<div key=${k} className=${(snd(k) ? 'a' : '') + (k === f ? ' cur' : '')}></div>`)}</div></div>
      <div className="fm1-chk"><span>Sequencing: <span className=${seqOk ? 'y' : 'n'}>${seqOk ? '✓ frames in order' : '✗ frames out of order'}</span></span><span>Lip sync: <span className=${syncOk ? 'y' : 'n'}>${syncOk ? '✓ in sync' : '✗ out of sync'}</span></span></div>
      <p className="fm1-muted" style=${{ textAlign: 'center', margin: '6px 0 0' }}>Shaded video frames: mouth open · shaded audio: sound</p>
    </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <div className="fig-bar">
        <button className=${'fig-btn' + (shuf ? ' sel' : '')} onClick=${() => setShuf(s => !s)} aria-pressed=${shuf}>${shuf ? 'Put frames in order' : 'Mix up frame order'}</button>
        <button className=${'fig-btn' + (shift ? ' sel' : '')} onClick=${() => setShift(s => !s)} aria-pressed=${shift}>${shift ? 'Re-sync audio' : 'Shift the audio'}</button>
        <span className="grow"></span>
        <button className="fig-btn" onClick=${() => setPlay(p => !p)}>${play ? '❚❚ Pause' : '▶ Play'}</button>
        <button className="fig-btn" onClick=${() => { setPlay(false); setF(x => (x + 1) % N); }}>Next frame ›</button></div></figure>`;
  }

  /* ── L1 slides 23–25: how big is uncompressed image, audio and video data? ── */
  const IMG_P = [
    { label: '512×512 grey scale', s: { w: 512, h: 512, bpp: 8, mp: 0 }, slide: '1/4 MB' },
    { label: '512×512 24 bit', s: { w: 512, h: 512, bpp: 24, mp: 0 }, slide: '3/4 MB' },
    { label: '10 Megapixel camera', s: { w: 0, h: 0, bpp: 24, mp: 10 }, slide: '≈ 29 MB' }];
  const AUD_P = [
    { label: '1 min mono CD', s: { rate: 44100, bits: 16, ch: 1, min: 1 }, slide: '5 MB' },
    { label: '1 min stereo CD', s: { rate: 44100, bits: 16, ch: 2, min: 1 }, slide: '10 MB' }];
  const VID_P = [
    { label: '512×512 monochrome', s: { w: 512, h: 512, B: 1, fps: 25 }, slide: '25 × 0.25 = 6.25 MB' },
    { label: 'PAL 720×576', s: { w: 720, h: 576, B: 3, fps: 25 }, slide: '≈ 1.24 × 25 = 31 MB' },
    { label: 'HD Blu-ray 1920×1080', s: { w: 1920, h: 1080, B: 3, fps: 25 }, slide: '≈ 6.2 × 25 = 155 MB' }];
  const same = (a, b) => Object.keys(b).every(k => a[k] === b[k]);
  function DataSize({ ar }) {
    const [tab, setTab] = useState(0);
    const [im, setIm] = useState(IMG_P[0].s), [au, setAu] = useState(AUD_P[0].s), [vi, setVi] = useState(VID_P[0].s);
    const n = (v, lo, hi) => { const x = Math.round(Number(v)); return isFinite(x) ? Math.min(hi, Math.max(lo, x)) : lo; };
    const field = (lab, val, on, lo, hi) => html`<label>${lab}<input type="number" inputMode="numeric" min=${lo} max=${hi} value=${val} onChange=${e => on(n(e.target.value, lo, hi))} /></label>`;
    const choose = (lab, val, opts, on) => html`<label>${lab}<select value=${val} onChange=${e => on(Number(e.target.value))}>${opts.map(([v, t]) => html`<option key=${v} value=${v}>${t}</option>`)}</select></label>`;
    const chooseWide = (lab, val, opts, on) => html`<label style=${{ gridColumn: '1 / -1' }}>${lab}<select value=${val} onChange=${e => on(Number(e.target.value))}>${opts.map(([v, t]) => html`<option key=${v} value=${v}>${t}</option>`)}</select></label>`;
    const MB = b => html`<div><span className="big">${mb(b, 1048576)} MB</span> <span className="fm1-muted">(1 MB = 1024 × 1024 B)</span></div><div><span className="big">${mb(b, 1e6)} MB</span> <span className="fm1-muted">(1 MB = 1,000,000 B)</span></div>`;
    const presets = (P, cur, set) => html`<div className="fm1-row">${P.map((p, j) => html`<button key=${j} className=${'fig-btn' + (same(cur, p.s) ? ' sel' : '')} onClick=${() => set(p.s)}>${p.label}</button>`)}</div>`;
    const slideOf = (P, cur) => { const p = P.find(q => same(cur, q.s)); return p && html`<div className="sl">Slide: ${p.slide}</div>`; };
    let body, cap;
    if (tab === 0) {
      const px = im.mp ? im.mp * 1e6 : im.w * im.h, b = px * im.bpp / 8;
      body = html`${presets(IMG_P, im, setIm)}
        <div className="fm1-in">${im.mp ? html`<label>Pixels<input type="text" value="10 Megapixels" readOnly /></label>` : html`${field('Width (pixels)', im.w, v => setIm({ ...im, w: v }), 1, 20000)}${field('Height (pixels)', im.h, v => setIm({ ...im, h: v }), 1, 20000)}`}
          ${chooseWide('Bits per pixel', im.bpp, [[1, '1 (Black and White)'], [8, '8 (Grey Scale, Colour Map)'], [24, '24 (True Colour)']], v => setIm({ ...im, bpp: v }))}
          ${im.mp ? html`<label> <button className="fig-btn" onClick=${() => setIm({ w: 512, h: 512, bpp: im.bpp, mp: 0 })}>Enter width × height</button></label>` : null}</div>
        <div className="fm1-res"><div className="f">${im.mp ? num(px) : num(im.w) + ' × ' + num(im.h)} pixels × ${im.bpp} bits ÷ 8 = ${num(b)} B</div>${MB(b)}${slideOf(IMG_P, im)}</div>`;
      cap = { en: 'Images are still pictures stored (uncompressed) as a <b>bitmap</b>: 1 bit per pixel (Black and White), 8 (Grey Scale, Colour Map) or 24 (True Colour). Size = pixels × bits per pixel ÷ 8. The overhead soon increases with image size, so <b>compression</b> is commonly applied.', ar: 'الـ images صور ثابتة بتتخزن (من غير compression) كـ <b>bitmap</b>: 1 bit لكل pixel (أبيض وأسود)، 8 (Grey Scale، Colour Map) أو 24 (True Colour). الحجم = عدد الـ pixels × الـ bits لكل pixel ÷ 8. الحجم بيكبر بسرعة مع حجم الصورة، عشان كده الـ <b>compression</b> بيتعمل عادةً.' };
    } else if (tab === 1) {
      const b = au.rate * au.bits / 8 * au.ch * au.min * 60;
      body = html`${presets(AUD_P, au, setAu)}
        <div className="fm1-in">${choose('Sampling rate', au.rate, [[44100, '44.1 kHz (CD)'], [96000, '96 kHz (audiophile)']], v => setAu({ ...au, rate: v }))}
          ${choose('Bits per sample', au.bits, [[16, '16-bit (CD)'], [24, '24-bit (audiophile)']], v => setAu({ ...au, bits: v }))}
          ${choose('Channels', au.ch, [[1, 'Mono (1)'], [2, 'Stereo (2)']], v => setAu({ ...au, ch: v }))}
          ${field('Minutes', au.min, v => setAu({ ...au, min: v }), 1, 120)}</div>
        <div className="fm1-res"><div className="f">${num(au.rate)} samples/s × ${au.bits} bits ÷ 8 × ${au.ch} × ${num(au.min * 60)} s = ${num(b)} B</div>${MB(b)}${slideOf(AUD_P, au)}</div>`;
      cap = { en: 'Audio is a continuous analog signal, input from microphones, then digitised. CD Quality Audio is <b>16-bit sampling at 44.1 kHz</b>; audiophile rates are higher (e.g. 24-bit, 96 kHz). Size = samples per second × bits ÷ 8 × channels × seconds. Usually <b>compressed</b> (e.g. MP3, AAC, Flac, Ogg Vorbis).', ar: 'الـ audio إشارة analog مستمرة، بتدخل من الـ microphones وبعدين بتتحول digital. الـ CD Quality Audio هو <b>16-bit sampling عند 44.1 kHz</b>؛ والـ audiophile أعلى (زي 24-bit و96 kHz). الحجم = samples في الثانية × الـ bits ÷ 8 × الـ channels × الثواني. وعادةً بيبقى <b>compressed</b> (زي MP3 وAAC وFlac وOgg Vorbis).' };
    } else {
      const fr = vi.w * vi.h * vi.B, b = fr * vi.fps;
      body = html`${presets(VID_P, vi, setVi)}
        <div className="fm1-in">${field('Width (pixels)', vi.w, v => setVi({ ...vi, w: v }), 1, 8000)}${field('Height (pixels)', vi.h, v => setVi({ ...vi, h: v }), 1, 8000)}
          ${choose('Each pixel', vi.B, [[1, 'Monochrome (1 byte)'], [3, 'Colour (3 bytes)']], v => setVi({ ...vi, B: v }))}
          ${choose('Frames per second', vi.fps, [[25, '25'], [30, '30'], [50, '50']], v => setVi({ ...vi, fps: v }))}</div>
        <div className="fm1-res"><div className="f">One frame: ${num(vi.w)} × ${num(vi.h)} × ${vi.B} B = ${num(fr)} B</div><div className="f">× ${vi.fps} frames = ${num(b)} B for a second</div>${MB(b)}${slideOf(VID_P, vi)}</div>`;
      cap = { en: 'Raw video is a <b>series of single images</b>, typically 25, 30 or 50 frames per second. Size for a second = one frame × frames per second. Digital video <b>clearly needs to be compressed</b> for most times.', ar: 'الـ raw video هو <b>سلسلة صور منفردة</b>، عادةً 25 أو 30 أو 50 frame في الثانية. الحجم لثانية = frame واحد × عدد الـ frames في الثانية. الـ digital video <b>لازم يتعمله compression</b> في أغلب الأوقات.' };
    }
    return html`<figure className="fig fm1"><div className="fig-stage"><div className="fm1-calc">
      <div className="fm1-row" role="tablist">${['Image', 'Audio', 'Video'].map((t, j) => html`<button key=${j} role="tab" aria-selected=${tab === j} className=${'fig-btn' + (tab === j ? ' solid' : '')} onClick=${() => setTab(j)}>${t}</button>`)}</div>
      ${body}</div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <div className="fig-bar"><span className="fm1-muted">Pick a slide example, or change the numbers.</span></div></figure>`;
  }

  /* ── L1 slide 25: raw video is a series of single images (25, 30 or 50 per second) ── */
  function Frames({ ar }) {
    const [fps, setFps] = useState(25), [fr, setFr] = useState(0), [s, setS] = useState(0), [play, setPlay] = useState(!calm());
    useEffect(() => { if (!play) return; const id = setInterval(() => setFr(x => { if (x + 1 >= fps) { setS(y => y + 1); return 0; } return x + 1; }), 1000 / fps); return () => clearInterval(id); }, [play, fps]);
    const pick = v => { setFps(v); setFr(0); setS(0); };
    const x = 30 + fr / (fps - 1) * 380, cols = fps === 30 ? 15 : 25;
    return html`<figure className="fig fm1"><div className="fig-stage"><div className="fm1-fr">
      <svg viewBox="0 0 440 110" role="img" aria-label=${'Frame ' + (fr + 1) + ' of ' + fps}>
        <rect x="4" y="4" width="432" height="102" rx="6" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" />
        <rect x="4" y="88" width="432" height="18" fill="color-mix(in srgb, var(--k-mm) 14%, var(--paper))" />
        <circle cx=${x} cy="64" r="22" fill="var(--k-mm)" />
      </svg>
      <div className="fm1-strip" style=${{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-hidden="true">${Array.from({ length: fps }, (_, k) => html`<div key=${k} className=${k === fr ? 'cur' : k < fr ? 'done' : ''}></div>`)}</div>
      <p className="fm1-cnt">Single image <span>${fr + 1}</span> of <span>${fps}</span> in this second${s > 0 ? html` · seconds played: <span>${s}</span>` : ''}</p></div></div>
      <${Cap} en=${'Raw video can be regarded as being a <b>series of single images</b>. There are typically <b>25, 30 or 50 frames per second</b> (there are higher possible frame rates). Here one second is ' + fps + ' single images.'} ar=${'الـ raw video ممكن نعتبره <b>سلسلة صور منفردة</b>. عادةً بيبقى <b>25 أو 30 أو 50 frame في الثانية</b> (وفيه frame rates أعلى كمان). هنا الثانية الواحدة = ' + fps + ' صورة منفردة.'} showAr=${ar} />
      <div className="fig-bar">${[25, 30, 50].map(v => html`<button key=${v} className=${'fig-btn' + (fps === v ? ' sel' : '')} onClick=${() => pick(v)}>${v} fps</button>`)}
        <span className="grow"></span>
        <button className="fig-btn" onClick=${() => setPlay(p => !p)}>${play ? '❚❚ Pause' : '▶ Play'}</button>
        <button className="fig-btn" onClick=${() => { setPlay(false); setFr(x => (x + 1) % fps); }}>Next frame ›</button></div></figure>`;
  }

  /* ── L1 slide 26: lossy v lossless ── */
  const HTS = [70, 22, 88, 40, 15, 95, 60, 18, 80, 35, 12, 74, 92, 25, 55, 16, 84, 45, 20, 66, 90, 14, 50, 78];
  function LossyLossless({ ar }) {
    const steps = [
      { en: 'How can we compress data? <b>Lossy v Lossless</b>. Here is a stream of multimedia data.', ar: 'إزاي نعمل compression للـ data؟ <b>Lossy ولا Lossless</b>. دي stream من الـ multimedia data.' },
      { en: '<b>Lossless</b>: ideal (e.g. zip, unix compress): every part of the data is kept. But it is <b>not good enough for MM data</b>.', ar: 'الـ <b>Lossless</b>: مثالي (زي zip وunix compress): كل حتة في الـ data بتفضل موجودة. بس <b>مش كفاية للـ MM data</b>.' },
      { en: '<b>Lossy</b>: throw away nonessential (<b>perceptually less relevant</b>) parts of the data stream: <b>FILTER</b> the data somehow.', ar: 'الـ <b>Lossy</b>: بنرمي الأجزاء اللي مش أساسية (<b>perceptually less relevant</b>) من الـ data stream: بنعمل <b>FILTER</b> للـ data بطريقة ما.' },
      { en: 'Lossy examples: <b>MP3, JPEG, MPEG Video/Audio</b>.', ar: 'أمثلة على الـ lossy: <b>MP3 وJPEG وMPEG Video/Audio</b>.' },
      { en: 'Lossless = <b>zero error</b>, high quality, low compression. Lossy = some error, lower quality, <b>higher compression</b> (e.g. YouTube uses lossy).', ar: 'الـ Lossless = <b>zero error</b>، جودة عالية، compression قليل. الـ Lossy = شوية error، جودة أقل، <b>compression أعلى</b> (زي YouTube بيستخدم lossy).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const lr = h => h < 30;
    const bars = cut => html`<div className="fm1-bars">${HTS.map((h, j) => html`<i key=${j} className=${(lr(h) ? 'lr' : '') + (cut && lr(h) ? ' gone' : '')} style=${{ height: h + '%' }}></i>`)}</div>`;
    return html`<figure className="fig fm1"><div className="fig-stage"><div className="fm1-cmp">
      <div className="fm1-leg"><span><i style=${{ background: 'var(--k-mm)' }}></i>essential</span><span><i style=${{ background: 'var(--faint)' }}></i>perceptually less relevant</span></div>
      <div className=${'fm1-line' + (i === 0 ? ' on' : '')}><div className="t"><span className="nm">Data stream</span></div>${bars(false)}</div>
      <div className=${'fm1-line ' + (i === 1 || i === 4 ? 'on' : i >= 2 && i < 4 ? 'dim' : '') + ' ' + pop(i >= 1)}><div className="t"><span className="nm">Lossless (zip, unix compress)</span><span className="q">${i >= 4 ? 'zero error · high quality · low compression' : 'everything kept'}</span></div>${bars(false)}</div>
      <div className=${'fm1-line ' + (i >= 2 ? 'on' : '') + ' ' + pop(i >= 2)}><div className="t"><span className="nm">Lossy <span className="fm1-filter">FILTER</span></span><span className="q">${i >= 4 ? 'some error · lower quality · higher compression' : 'less relevant parts thrown away'}</span></div>${bars(i >= 2)}</div>
      <div className=${'fm1-chips ' + pop(i >= 3)}>${['MP3', 'JPEG', 'MPEG Video/Audio'].map(t => html`<span key=${t}>${t}</span>`)}</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 27: compression via synthesis (the MIDI keyboards) ── */
  const FREQ = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
  function Synthesis({ ar }) {
    const [ev, setEv] = useState([]), [t0, setT0] = useState(null), [frozen, setFrozen] = useState(0), [now, setNow] = useState(0), [dn, setDn] = useState(-1), [snd, setSnd] = useState(true);
    const ac = useRef(null);
    useEffect(() => { if (t0 == null) return; const id = setInterval(() => { const n = performance.now(); setNow(n); if (n - t0 > 60000) { setFrozen(60); setT0(null); } }, 100); return () => clearInterval(id); }, [t0]);
    useEffect(() => () => { if (ac.current) ac.current.close(); }, []);
    const tone = k => { if (!snd) return; try { const C = ac.current || (ac.current = new (window.AudioContext || window.webkitAudioContext)()); const o = C.createOscillator(), g = C.createGain(), s = C.currentTime; o.type = 'triangle'; o.frequency.value = FREQ[k]; g.gain.setValueAtTime(.18, s); g.gain.exponentialRampToValueAtTime(.001, s + .6); o.connect(g).connect(C.destination); o.start(s); o.stop(s + .62); } catch (e) {} };
    const press = k => { tone(k); setDn(k); setTimeout(() => setDn(d => d === k ? -1 : d), 180); if (t0 == null) { const n = performance.now(); setT0(n - frozen * 1000); setNow(n); } setEv(e => e.concat(k)); };
    const el = t0 != null ? Math.min(60, (now - t0) / 1000) : frozen, bytes = Math.round(44100 * 16 / 8 * el);
    const stop = () => { setFrozen(Math.min(60, (performance.now() - t0) / 1000)); setT0(null); };
    const reset = () => { setEv([]); setT0(null); setFrozen(0); };
    return html`<figure className="fig fm1"><div className="fig-stage"><div className="fm1-syn">
      <div className="fm1-keys" role="group" aria-label="Keyboard">${FREQ.map((_, k) => html`<button key=${k} className=${dn === k ? 'dn' : ''} onClick=${() => press(k)} aria-label=${'Key ' + (k + 1)}></button>`)}</div>
      <div className="fm1-two">
        <div><div className="hd">Store the sound itself</div>CD quality, mono: 44,100 samples/s × 16 bits<div className="n">${num(bytes)} B</div><span className="fm1-muted">${sec(el)} of sound${t0 != null ? ', and growing' : ''}</span></div>
        <div><div className="hd">Encode how to make it</div>one instruction per key press<div className="n">${ev.length} instruction${ev.length === 1 ? '' : 's'}</div>
          <div className="fm1-ins">${ev.slice(-24).map((k, j) => html`<span key=${j}>key ${k + 1}</span>`)}</div></div>
      </div></div></div>
      <${Cap} en=${ev.length ? 'The sound is <b>synthesised</b> from the instructions each time it is played. Storing the instructions instead of the sound <b>can be done in many less bits in certain cases</b>. Examples: Vector Graphics (Flash), MPEG Video, MP4 (Audio), <b>MIDI</b>.' : '<b>Compression via Synthesis</b>: encode how to make (<b>synthesise</b>) the data. <b>Try it:</b> play a few keys, like the MIDI keyboards on the slide.'}
        ar=${ev.length ? 'الصوت بيتعمله <b>synthesis</b> من الـ instructions كل مرة بيتشغل. تخزين الـ instructions بدل الصوت نفسه <b>ممكن ياخد bits أقل بكتير في حالات معينة</b>. أمثلة: Vector Graphics (Flash) وMPEG Video وMP4 (Audio) و<b>MIDI</b>.' : 'الـ <b>Compression via Synthesis</b>: بنعمل encode لطريقة عمل (<b>synthesise</b>) الـ data. <b>جرّب:</b> اعزف كام نوتة، زي الـ MIDI keyboards اللي في الـ slide.'} showAr=${ar} />
      <div className="fig-bar"><button className=${'fig-btn' + (snd ? ' sel' : '')} onClick=${() => setSnd(v => !v)} aria-pressed=${snd}>${snd ? '🔊 Sound on' : '🔇 Sound off'}</button><span className="grow"></span>
        ${t0 != null && html`<button className="fig-btn" onClick=${stop}>■ Stop</button>`}
        <button className="fig-btn" onClick=${reset}>↻ Start over</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'mm-hypertext': Hypertext, 'mm-linear-hyper': LinearHyper, 'mm-hypermedia': Hypermedia, 'mm-lipsync': LipSync, 'mm-data-size': DataSize, 'mm-frames': Frames, 'mm-lossy-lossless': LossyLossless, 'mm-synthesis': Synthesis });
})();

/* ── part 2 ── */
/* ── part 2 ── */
// Multimedia visuals, part 2: Lecture 4 (Digital Audio: sampling, Nyquist, aliasing, quantisation, file size, formats, synthetic sound).
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
[data-fig^="mm-"]{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }
.fm2-wave{ animation:fm2pulse 1.6s ease-out infinite; }
@keyframes fm2pulse{ 0%{ opacity:.2; } 40%{ opacity:1; } 100%{ opacity:.2; } }
.fm2-stem{ transition:opacity .35s ease; }
.fm2-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fm2-chips .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.fm2-chips .fig-btn.sel{ border-color:var(--k-mm); box-shadow:0 0 0 1px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.fm2-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); max-width:560px; margin:0 auto 10px; overflow:hidden; color:var(--ink); }
.fm2-box > .hd{ background:color-mix(in srgb, var(--k-mm) 22%, var(--paper)); padding:6px 10px; font-weight:700; font-size:.9rem; }
.fm2-box > .bd{ padding:8px 10px; font-size:.9rem; line-height:1.45; }
.fm2-row{ display:grid; grid-template-columns:minmax(0, 1.2fr) auto minmax(0, 1.4fr); gap:4px 10px; align-items:center; padding:5px 0; border-top:1px solid var(--line); }
.fm2-row:first-of-type{ border-top:0; }
.fm2-row .n{ font:700 1rem var(--mono); color:var(--k-mm); text-align:right; }
.fm2-row .bin{ font:500 .8rem var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
.fm2-range{ display:flex; gap:8px; align-items:center; margin:2px 0 6px; font-size:.86rem; color:var(--graphite); flex-wrap:wrap; }
.fm2-range input{ flex:1; min-width:140px; accent-color:var(--k-mm); }
.fm2-out{ text-align:center; font-size:.92rem; color:var(--ink); margin:6px 0 0; line-height:1.45; }
.fm2-out .v{ font:700 1rem var(--mono); color:var(--k-mm); }
.fm2-c-b{ color:var(--k-compiler); font-weight:700; } .fm2-c-r{ color:var(--pen); font-weight:700; } .fm2-c-g{ color:var(--ok); font-weight:700; }
.fm2-tbl{ border-collapse:collapse; width:100%; max-width:520px; margin:0 auto; font-size:.9em; color:var(--ink); }
.fm2-tbl th, .fm2-tbl td{ border:1px solid var(--line); padding:6px 6px; text-align:center; vertical-align:middle; }
.fm2-tbl th{ background:var(--paper-2); font-weight:600; }
.fm2-tbl td{ background:var(--paper); }
.fm2-tbl th.rh{ font-style:italic; text-align:left; white-space:nowrap; }
.fm2-tbl td.pick{ cursor:pointer; font-family:var(--mono); }
.fm2-st th, .fm2-st td{ padding:5px 3px; } .fm2-st th.rh{ white-space:normal; }
.fm2-tbl td.pick:hover{ background:color-mix(in srgb, var(--k-mm) 10%, var(--paper)); }
.fm2-tbl td.sel{ background:color-mix(in srgb, var(--k-mm) 24%, var(--paper)); font-weight:700; }
.fm2-tbl tr.on td{ background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.fm2-calc{ max-width:520px; margin:10px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font:500 .86rem/1.6 var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.fm2-calc div{ padding:0 2px; } .fm2-calc .res{ color:var(--k-mm); font-weight:700; } .fm2-calc .note{ font-family:var(--body); color:var(--graphite); font-size:.84rem; }
.fm2-form{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px 10px; max-width:520px; margin:0 auto; font-size:.86rem; color:var(--ink); }
.fm2-form label{ display:grid; gap:3px; font-weight:600; }
.fm2-form .ln{ display:flex; gap:4px; }
.fm2-form input, .fm2-form select{ box-sizing:border-box; min-width:0; width:100%; font:inherit; font-weight:400; font-size:.95rem; padding:5px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.fm2-form select{ width:auto; }
.fm2-form input:focus, .fm2-form select:focus{ outline:2px solid var(--k-mm); outline-offset:1px; }
@media (max-width:420px){ .fm2-form{ grid-template-columns:1fr; } }
.fm2-chain{ display:grid; grid-template-columns:minmax(0, 1fr) 16px minmax(0, 1fr) 16px minmax(0, 1fr) 16px minmax(0, 1fr) 16px minmax(0, 1fr); gap:4px; align-items:center; max-width:640px; margin:0 auto; }
.fm2-chain .fm2-ar{ text-align:center; color:var(--k-mm); font-size:1.1rem; } .fm2-chain .fm2-ar .v{ display:none; }
.fm2-node{ text-align:center; font-size:.8rem; line-height:1.25; color:var(--ink); opacity:.4; transition:opacity .4s; }
.fm2-node.on{ opacity:1; } .fm2-node svg{ width:100%; max-width:150px; height:auto; display:block; margin:0 auto 4px; }
.fm2-blk{ border:2px solid var(--graphite); border-radius:6px; background:var(--paper); padding:12px 4px; text-align:center; font-size:.84rem; font-weight:600; color:var(--ink); opacity:.4; transition:opacity .4s, border-color .4s; }
.fm2-blk.on{ opacity:1; border-color:var(--k-mm); } .fm2-blk.off{ opacity:.25; text-decoration:line-through; }
@media (max-width:620px){ .fm2-chain{ grid-template-columns:1fr; max-width:260px; } .fm2-chain .fm2-ar .h{ display:none; } .fm2-chain .fm2-ar .v{ display:inline; } }
.fm2-ana{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:560px; margin:10px auto 0; }
.fm2-ana .card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.4; color:var(--ink); opacity:.35; transition:opacity .4s, box-shadow .4s; }
.fm2-ana .card.on{ opacity:1; box-shadow:0 0 0 2px var(--k-mm); }
.fm2-ana .card .t{ display:block; font-weight:700; color:var(--k-mm); margin-bottom:4px; }
.fm2-ana .card svg{ width:100%; height:auto; display:block; margin:0 0 6px; }
.fm2-ana .foot{ grid-column:1 / -1; text-align:center; font-weight:700; color:var(--ink); }
@media (max-width:420px){ .fm2-ana{ grid-template-columns:1fr; } }
.fm2-desc{ max-width:560px; margin:0 auto 8px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 12px; font-size:.92rem; line-height:1.45; color:var(--ink); }
.fm2-desc .t{ color:var(--k-mm); font-weight:700; }
.fm2-checks{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; font-size:.88rem; color:var(--ink); margin:8px 0 0; }
.fm2-checks label{ display:inline-flex; gap:5px; align-items:center; cursor:pointer; } .fm2-checks input{ accent-color:var(--k-mm); width:18px; height:18px; }
.fm2-leg{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.84rem; color:var(--ink); margin:6px 0 0; }
.fm2-leg span{ display:inline-flex; align-items:center; gap:6px; } .fm2-leg i{ display:inline-block; width:18px; height:4px; border-radius:2px; } .fm2-leg i.dot{ width:10px; height:10px; border-radius:50%; } .fm2-leg i.ring{ width:10px; height:10px; border-radius:50%; background:transparent !important; border:2px solid var(--k-fp); }
.fm2-big{ font-size:1.15rem; font-weight:700; text-align:center; padding:6px; color:var(--ink); }
.fm2-small{ font-size:.82rem; color:var(--graphite); text-align:center; margin:6px auto 0; max-width:560px; line-height:1.4; }
.fm2-play{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin:10px 0 0; }
.fm2-play .fig-btn.on{ background:var(--fig-s, var(--s-mm)); color:#fff; border-color:transparent; }
.fm2-pb{ font:inherit; font-size:.85rem; border:1px solid var(--line); border-radius:99px; background:var(--paper); color:var(--ink); padding:4px 12px; cursor:pointer; min-height:32px; }
.fm2-pb.on{ background:var(--fig-s, var(--s-mm)); color:#fff; border-color:transparent; }
@media (prefers-reduced-motion: reduce){ .fm2-wave{ animation:none; } .fm2-stem{ transition:none; } }
`;
  if (!document.getElementById('fm2-css')) { const s = document.createElement('style'); s.id = 'fm2-css'; s.textContent = CSS; document.head.appendChild(s); }

  // helpers
  const N = (n, f) => Array.from({ length: n }, (_, k) => f(k));
  const curve = (f, a, b, n, X, Y) => N(n + 1, k => { const t = a + (b - a) * k / n; return (k ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1); }).join(' ');
  const fmt = (x, d) => x.toLocaleString('en-US', { maximumFractionDigits: d == null ? 2 : d });
  const tint = 'color-mix(in srgb, var(--k-mm) 20%, var(--paper))';
  const arrowDef = (id, c) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`;
  // smooth curve through equally spaced points [[t, y], ...] (Catmull-Rom)
  const spline = P => t => {
    let k = 0; while (k < P.length - 2 && t > P[k + 1][0]) k++;
    const p0 = P[Math.max(0, k - 1)][1], p1 = P[k][1], p2 = P[k + 1][1], p3 = P[Math.min(P.length - 1, k + 2)][1];
    const u = (t - P[k][0]) / (P[k + 1][0] - P[k][0]), u2 = u * u, u3 = u2 * u;
    return .5 * (2 * p1 + (p2 - p0) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (3 * p1 - p0 - 3 * p2 + p3) * u3);
  };
  // shared Web Audio: one context, one sound at a time per figure
  let AC = null;
  const ctx = () => { if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended') AC.resume(); return AC; };
  function playData(data, rate, onEnd) {
    const c = ctx(); if (!c) return null;
    let buf;
    try { buf = c.createBuffer(1, data.length, rate); buf.getChannelData(0).set(data); }
    catch (e) { const r = c.sampleRate, n = Math.floor(data.length * r / rate); buf = c.createBuffer(1, n, r); const d = buf.getChannelData(0); for (let k = 0; k < n; k++) d[k] = data[Math.floor(k * rate / r)]; }
    const s = c.createBufferSource(), g = c.createGain(); g.gain.value = .35; s.buffer = buf; s.connect(g); g.connect(c.destination);
    s.onended = onEnd; s.start(); return s;
  }
  function usePlayer() {
    const cur = useRef(null), [on, setOn] = useState(null), [t, setT] = useState(0), t0 = useRef(0), raf = useRef(0);
    const stop = () => { if (cur.current) { try { cur.current.onended = null; cur.current.stop(); } catch (e) {} cur.current = null; } cancelAnimationFrame(raf.current); setOn(null); setT(0); };
    useEffect(() => stop, []);
    const play = (key, data, rate) => {
      if (on === key) { stop(); return; }
      stop(); const s = playData(data, rate, () => { cur.current = null; cancelAnimationFrame(raf.current); setOn(null); setT(0); });
      if (!s) return; cur.current = s; setOn(key); t0.current = performance.now();
      const tick = () => { setT((performance.now() - t0.current) / 1000); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick);
    };
    return { on, t, play, stop, ok: !!(window.AudioContext || window.webkitAudioContext) };
  }

  /* ── L4 slide 3: digitising sound ── */
  function Digitise({ ar }) {
    const steps = [
      { en: '<b>Microphone</b>: receives sound.', ar: 'الـ <b>Microphone</b>: بيستقبل الصوت.' },
      { en: 'The microphone <b>converts</b> it to an <b>analog signal</b>.', ar: 'الـ microphone <b>بيحوّله</b> لـ <b>analog signal</b>.' },
      { en: 'Computers like <b>discrete entities</b>, so we need to convert <b>Analog-to-Digital</b>: dedicated hardware (e.g. a <b>Soundcard</b>).', ar: 'الكمبيوتر بيحب الـ <b>discrete entities</b>، فلازم نحوّل <b>Analog-to-Digital</b>: hardware مخصوص (زي الـ <b>Soundcard</b>).' },
      { en: 'Out come <b>binary numbers</b>. This is also known as <b>Digital Sampling</b>.', ar: 'بيطلع منه <b>أرقام binary</b>. وده اسمه برضه <b>Digital Sampling</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const mv = !calm();
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 230" role="img" aria-label="Sound waves, microphone, cable, sound card, binary numbers">
        ${[22, 42, 62].map((x, k) => html`<path key=${k} d=${`M${x} ${40 - k * 8} q ${16 + k * 4} ${20 + k * 8} 0 ${40 + k * 16}`} stroke="var(--k-compiler)" strokeWidth="5" fill="none" strokeLinecap="round" className=${mv ? 'fm2-wave' : ''} style=${{ animationDelay: (2 - k) * .25 + 's' }} />`)}
        <circle cx="104" cy="60" r="15" fill="var(--graphite)" stroke=${i === 0 ? 'var(--k-mm)' : 'none'} strokeWidth="3" />
        <rect x="100" y="75" width="8" height="48" rx="2" fill="var(--faint)" />
        <path d="M104 123 C104 200 200 190 238 78" stroke=${i >= 1 ? 'var(--k-os)' : 'var(--ink)'} strokeWidth="3" fill="none" className=${i >= 1 && mv ? 'flow' : ''} />
        <text x="6" y="222" fontSize="20" className=${pop(i >= 1)} style=${{ fill: 'var(--k-os)' }}>analog signal</text>
        <rect x="216" y="18" width="134" height="58" rx="4" fill=${tint} stroke="var(--k-mm)" strokeWidth=${i === 2 ? 4 : 2} className="fade" />
        <text x="283" y="53" textAnchor="middle" fontSize="20" fontWeight="600">Sound card</text>
        <g className=${pop(i >= 3)}>
          <path d="M222 96 H394 V82 L438 156 L394 228 V214 H222 Z" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" />
          ${['1010', '0100', '1110 10101010', '0111 11001111'].map((t, k) => html`<text key=${k} x="230" y=${124 + k * 25} fontSize="20" style=${{ fontFamily: 'var(--mono)' }}>${t}</text>`)}
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 5: digital sampling (1), y(t) and its samples ── */
  function Sampling1({ ar }) {
    const steps = [
      { en: 'The continuous <b>analog signal</b> y(t) against t.', ar: 'الـ <b>analog signal</b> المتصلة y(t) قصاد الـ t.' },
      { en: '<b>Measuring</b> the analog signal at <b>regular discrete intervals</b>: Tₛ, 2Tₛ, 3Tₛ, 4Tₛ, …', ar: '<b>بنقيس</b> الـ analog signal على <b>فترات منتظمة discrete</b>: Tₛ و2Tₛ و3Tₛ و4Tₛ و…' },
      { en: '<b>Recording</b> the value at these points: each stem is as high as the signal there. This is the sampled signal yₛ(t).', ar: '<b>بنسجّل</b> القيمة عند النقط دي: كل stem طوله قد قيمة الإشارة عندها. وده الـ sampled signal اللي هي yₛ(t).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const f = t => 1.6 * (1 - Math.exp(-t)) * Math.exp(-t / 9) / 1.12;
    const X = t => 46 + t * 37, Y1 = v => 120 - v * 92, Y2 = v => 282 - v * 92;
    const ks = N(10, k => k + 1);
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 312" role="img" aria-label="Top: continuous signal y(t). Bottom: sampled signal ys(t) as stems at Ts, 2Ts, 3Ts and so on">
        <path d="M46 10 V122 M40 120 H430" stroke="var(--graphite)" strokeWidth="1.5" fill="none" />
        <text x="54" y="22" fontSize="20" fontStyle="italic">y(t)</text><text x="418" y="140" fontSize="20" fontStyle="italic">t</text>
        <path d=${curve(f, 0, 10.2, 120, X, Y1)} stroke="var(--k-os)" strokeWidth="3" fill="none" className="fade" style=${{ opacity: i >= 2 ? .45 : 1 }} />
        ${ks.map(k => html`<g key=${k} className=${pop(i >= 1)}><path d=${`M${X(k)} 120 V${Y1(f(k))}`} stroke="var(--faint)" strokeDasharray="3 4" /><circle cx=${X(k)} cy=${Y1(f(k))} r="4" fill="var(--pen)" /></g>`)}
        <path d="M46 172 V284 M40 282 H430" stroke="var(--graphite)" strokeWidth="1.5" fill="none" />
        <text x="54" y="180" fontSize="20" fontStyle="italic">yₛ(t)</text><text x="418" y="300" fontSize="20" fontStyle="italic">t</text>
        ${ks.map(k => html`<g key=${k} className="fm2-stem" style=${{ opacity: i >= 2 ? 1 : 0, transitionDelay: i >= 2 && !calm() ? k * .12 + 's' : '0s' }}><path d=${`M${X(k)} 282 V${Y2(f(k))}`} stroke="var(--ink)" strokeWidth="2.5" /><circle cx=${X(k)} cy=${Y2(f(k))} r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" /></g>`)}
        ${['Tₛ', '2Tₛ', '3Tₛ', '4Tₛ', '…'].map((t, k) => html`<text key=${k} x=${X(k + 1)} y="302" textAnchor="middle" fontSize="20" className=${pop(i >= 1)}>${t}</text>`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 6: digital sampling (2), S(t) and the samples Si ── */
  function Sampling2({ ar }) {
    const steps = [
      { en: 'A signal <b>S(t)</b> against t, going above and below the axis.', ar: 'إشارة <b>S(t)</b> قصاد الـ t، بتطلع فوق المحور وتنزل تحته.' },
      { en: 'One sample every <b>sampling interval T</b>, at the sample indices 0, 1, …, i, 4, 5, …, 13.', ar: 'sample واحدة كل <b>sampling interval T</b>، عند الـ sample indices من 0، 1، …، i، 4، 5، … لحد 13.' },
      { en: 'The samples <b>Sᵢ</b> are dots on the curve: the signal\'s value at each sample index.', ar: 'الـ samples <b>Sᵢ</b> هي نقط على المنحنى: قيمة الإشارة عند كل sample index.' },
      { en: 'Sample number <b>i</b> has the value <b>Sᵢ</b>. Only these values, one every T, are kept.', ar: 'الـ sample رقم <b>i</b> قيمتها <b>Sᵢ</b>. القيم دي بس، واحدة كل T، هي اللي بتتحفظ.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const V = [0, 60, 116, 91, 63, 78, 83, 63, 8, -55, -110, -125, -100, -40, 0];
    const f = spline(V.map((v, k) => [k, v]));
    const X = t => 26 + t * 28.4, Y = v => 132 - v * .85;
    const area = curve(f, 0, 14, 140, X, Y) + ` L${X(14)} 132 L${X(0)} 132 Z`;
    const lab = ['0', '1', '…', 'i', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 252" role="img" aria-label="Shaded signal S(t) with samples Si at indices 0 to 13, one every interval T">
        <defs>${arrowDef('fm2-s2-a', 'var(--ink)')}</defs>
        <path d=${area} fill="color-mix(in srgb, #facc15 55%, var(--paper))" stroke="none" />
        <path d=${curve(f, 0, 14, 140, X, Y)} stroke="var(--ok)" strokeWidth="2.5" fill="none" />
        <path d="M14 132 H432" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#fm2-s2-a)" />
        <text x="420" y="152" fontSize="20" fontStyle="italic">t</text>
        <text x=${X(5) - 6} y="44" fontSize="20" fontStyle="italic" style=${{ fill: 'var(--ok)' }}>S(t)</text>
        ${lab.map((t, k) => html`<text key=${k} x=${X(k)} y=${k >= 9 ? 124 : 151} textAnchor="middle" fontSize="20" fontStyle="italic" className=${pop(i >= 1)}>${t}</text>`)}
        <g className=${pop(i >= 1)}><path d=${`M${X(1) + 4} 116 H${X(2) - 4}`} stroke="var(--ink)" strokeWidth="1.5" markerStart="url(#fm2-s2-a)" markerEnd="url(#fm2-s2-a)" />
          <text x=${(X(1) + X(2)) / 2} y="110" textAnchor="middle" fontSize="20" fontStyle="italic">T</text></g>
        ${V.slice(0, 14).map((v, k) => html`<g key=${k} className="fm2-stem" style=${{ opacity: i >= 2 ? 1 : 0, transitionDelay: i === 2 && !calm() ? k * .1 + 's' : '0s' }}>
          <path d=${`M${X(k)} 132 V${Y(v)}`} stroke="var(--k-compiler)" strokeWidth="1.2" opacity=".6" />
          <circle cx=${X(k)} cy=${Y(v)} r=${i === 3 && k === 3 ? 7 : 4.5} fill=${i === 3 && k === 3 ? 'var(--k-mm)' : 'var(--k-compiler)'} /></g>`)}
        <text x=${X(3) + 9} y=${Y(91) + 20} fontSize="20" fontStyle="italic" className=${pop(i >= 2)} style=${{ fill: i === 3 ? 'var(--k-mm)' : 'var(--k-compiler)' }}>Sᵢ</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 4: bit size (quantisation) and sample rate, try it ── */
  const RATES = [['8 KHz', 'Telephone', 'تليفون', 8000], ['11.025 KHz', 'Speech', 'كلام (Speech)', 11025], ['22.05 KHz', 'Low Grade Audio (WWW Audio, AM Radio)', 'Low Grade Audio (WWW Audio، AM Radio)', 22050], ['44.1 KHz', 'CD Quality', 'جودة CD', 44100]];
  function BitRate({ ar }) {
    const [v, setV] = useState(50), [r, setR] = useState(3);
    const q8 = Math.round(v / 100 * 255), q16 = Math.round(v / 100 * 65535);
    const bin = (n, w) => n.toString(2).padStart(w, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const [lab, use, useAr, fs] = RATES[r], T = 1e6 / fs, dots = Math.round(fs / 1000);
    const en = `<b>${lab}</b> (${use}): ${fmt(fs, 0)} samples every second, one every T = 1/fs ≈ ${fmt(T, 2)} µs. Each sample value is stored as an <b>8 bit value</b> (0-255) or a <b>16 bit value</b> (integer, 0-65535).`;
    const a = `<b>${lab}</b> (${useAr}): ${fmt(fs, 0)} sample في الثانية، يعني واحدة كل T = 1/fs ≈ ${fmt(T, 2)} µs. وكل قيمة sample بتتخزن كـ <b>8 bit value</b> (من 0 لـ 255) أو <b>16 bit value</b> (integer، من 0 لـ 65535).`;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm2-box"><div className="hd">Bit Size: Quantisation</div><div className="bd">
        <div className="fm2-range"><span>Sample value (low → high)</span><input type="range" min="0" max="100" step="1" value=${v} onInput=${e => setV(+e.target.value)} onChange=${e => setV(+e.target.value)} aria-label="Sample value" /></div>
        <div className="fm2-row"><span>8 Bit Value (0-255)</span><span className="n">${q8}</span><span className="bin">${bin(q8, 8)}</span></div>
        <div className="fm2-row"><span>16 Bit Value (Integer) (0-65535)</span><span className="n">${q16}</span><span className="bin">${bin(q16, 16)}</span></div>
        <div className="fm2-small" style=${{ textAlign: 'left', margin: '4px 0 0' }}>Levels = 2^bits: 8 bit → 256 levels, 16 bit → 65,536 levels.</div>
      </div></div>
      <div className="fm2-box"><div className="hd">Sample Rate: how many samples to take?</div><div className="bd">
        <div className="fm2-chips">${RATES.map((x, k) => html`<button key=${k} className=${'fig-btn' + (k === r ? ' sel' : '')} onClick=${() => setR(k)}>${x[0]}</button>`)}</div>
        <svg viewBox="0 0 440 72" role="img" aria-label=${dots + ' samples in one millisecond'}>
          <path d="M20 30 H420" stroke="var(--graphite)" strokeWidth="2" /><path d="M20 20 V40 M420 20 V40" stroke="var(--graphite)" strokeWidth="2" />
          ${N(dots, k => html`<circle key=${k} cx=${20 + (k + .5) * 400 / dots} cy="30" r=${dots > 30 ? 3.5 : 5} fill="var(--k-mm)" />`)}
          <text x="220" y="68" textAnchor="middle" fontSize="23">${dots} samples in 1 ms</text>
        </svg>
      </div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L4 slides 8–10: sampling at the signal frequency, twice it, and above Nyquist ── */
  function Nyquist3({ ar }) {
    const steps = [
      { en: '<b>Sampling at Signal Frequency</b>: one sample per cycle, all at the same height, so joining them gives a <b>flat line</b>. The sine is lost.', ar: '<b>Sampling at Signal Frequency</b>: sample واحدة في كل cycle، كلها على نفس الارتفاع، فلما توصلهم يطلع <b>خط مستقيم</b>. الـ sine ضاع.' },
      { en: '<b>Sampling at Twice Nyquist Frequency</b> (slide title): samples at every <b>peak and trough</b>, 2 per cycle. Joined, they give a <b>triangle wave</b> with the sine\'s frequency: the sine is just captured. (The sample rate here is twice the signal frequency, i.e. the Nyquist rate 2·fmax.)', ar: '<b>Sampling at Twice Nyquist Frequency</b> (عنوان السلايد): samples عند كل <b>قمة وقاع</b>، 2 في كل cycle. لما توصلهم يطلع <b>triangle wave</b> بنفس frequency الـ sine: الـ sine اتلقط بالعافية. (الـ sample rate هنا ضعف frequency الإشارة، يعني الـ Nyquist rate 2·fmax.)' },
      { en: '<b>Sampling at above Nyquist Frequency</b>: many samples per cycle trace the sine closely, so the waveform is captured well.', ar: '<b>Sampling at above Nyquist Frequency</b>: samples كتير في كل cycle ماشية على الـ sine بالظبط تقريبًا، فالـ waveform بيتلقط كويس.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const X = t => 20 + t * 133, Y = v => 112 - v * 82, f = t => Math.sin(2 * Math.PI * t);
    const S = i === 0 ? [.25, 1.25, 2.25] : i === 1 ? N(6, n => .25 + n / 2) : N(37, n => n / 12);
    const join = i === 0 ? `M${X(0)} ${Y(1)} H${X(3)}` : 'M' + S.map(t => X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1)).join(' L');
    const col = i === 2 ? 'var(--pen)' : 'var(--ok)';
    const titles = ['At Signal Frequency', 'Twice Nyquist Frequency', 'Above Nyquist Frequency'];
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm2-chips">${titles.map((t, k) => html`<button key=${k} className=${'fig-btn' + (k === i ? ' sel' : '')} onClick=${() => ctl.go(k)}>${t}</button>`)}</div>
      <svg viewBox="0 0 440 236" role="img" aria-label=${'Sine wave sampled: ' + titles[i]}>
        <path d="M20 112 H425 M20 20 V205" stroke="var(--graphite)" strokeWidth="1.3" />
        <path d=${curve(f, 0, 3.05, 240, X, Y)} stroke="var(--k-os)" strokeWidth="2.5" fill="none" />
        <path d=${join} stroke=${col} strokeWidth=${i === 2 ? 1.5 : 2.5} fill="none" />
        ${S.map((t, k) => html`<circle key=${i + '-' + k} cx=${X(t)} cy=${Y(f(t))} r=${i === 2 ? 4 : 6} fill=${i === 2 ? 'var(--pen)' : 'var(--k-fp)'} stroke="var(--paper)" strokeWidth="1.5" />`)}
        <text x="220" y="230" textAnchor="middle" fontSize="20" fontWeight="600">${['1 sample per cycle', '2 samples per cycle', 'many samples per cycle'][i]}</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 Nyquist's theorem, try it: fs ≥ 2·fmax against the slide's sample rates ── */
  function NyquistCalc({ ar }) {
    const [fmax, setF] = useState(4000);
    const ok = isFinite(fmax) && fmax > 0, need = 2 * fmax;
    const en = ok ? `Highest frequency <b>${fmt(fmax)} Hz</b> → Nyquist: sample at least <b>2 × ${fmt(fmax)} = ${fmt(need)} Hz</b> (sampling interval at most 1/${fmt(need)} = ${fmt(1 / need, 7)} s). A rate captures the signal when its Nyquist frequency fs/2 reaches fmax.` : 'Enter the highest frequency component in the signal (in Hz).';
    const a = ok ? `أعلى frequency <b>${fmt(fmax)} Hz</b> ← Nyquist: لازم نعمل sampling على الأقل بـ <b>2 × ${fmt(fmax)} = ${fmt(need)} Hz</b> (والـ sampling interval أقصاه 1/${fmt(need)} = ${fmt(1 / need, 7)} s). الـ rate بيلقط الإشارة لما الـ Nyquist frequency بتاعته fs/2 توصل للـ fmax.` : 'اكتب أعلى frequency component في الإشارة (بالـ Hz).';
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm2-form" style=${{ gridTemplateColumns: '1fr' }}><label>Highest frequency in the signal, fmax (Hz)
        <input type="number" min="1" step="any" value=${isFinite(fmax) ? fmax : ''} onInput=${e => setF(parseFloat(e.target.value))} /></label></div>
      <div className="fm2-chips" style=${{ marginTop: '8px' }}>
        <button className=${'fig-btn' + (fmax === 4000 ? ' sel' : '')} onClick=${() => setF(4000)}>Speech: 4 KHz</button>
        <button className=${'fig-btn' + (fmax === 22050 ? ' sel' : '')} onClick=${() => setF(22050)}>Hearing: 22.05 KHz</button></div>
      <table className="fm2-tbl"><thead><tr><th>Sample rate fs</th><th>Nyquist frequency fs/2</th><th>fs ≥ 2·fmax?</th></tr></thead><tbody>
        ${RATES.map((x, k) => { const good = ok && x[3] >= need; return html`<tr key=${k}><td>${x[0]}</td><td>${fmt(x[3] / 2000, 4)} KHz</td><td style=${{ color: good ? 'var(--ok)' : 'var(--pen)', fontWeight: 700 }}>${ok ? (good ? '✓ captured' : '✗ too low (aliasing)') : ''}</td></tr>`; })}
      </tbody></table></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L4 slide 11: sampling a signal ever more sparsely ── */
  const D11 = [22, 38, 53, 48, 30, 32, 50, 57, 48, 35, 18, 10, 38, 49, 52, 65, 65, 63, 50, 42, 37, 40, 43, 44, 47, 43, 37, 28, 20, 18, 17, 14, 11];
  function AliasPanels({ ar }) {
    const steps = [
      { en: 'The original signal: a continuous curve on a 0 to 32 axis.', ar: 'الإشارة الأصلية: منحنى متصل على محور من 0 لـ 32.' },
      { en: 'Sampled <b>densely</b> (a bar at every point): the bars still follow its shape.', ar: 'متعملها sampling <b>كتير</b> (bar عند كل نقطة): الـ bars لسه ماشية على شكلها.' },
      { en: 'Sampled <b>less densely</b>: details start to go.', ar: 'متعملها sampling <b>أقل</b>: التفاصيل بتبتدي تضيع.' },
      { en: 'Sampled <b>sparsely</b>: the shape of the signal is lost. <b>Digital Sampling Artefacts Arise</b>: effect known as <b>Aliasing</b>. Affects <b>Audio, Imagery and Video</b>.', ar: 'متعملها sampling <b>قليل خالص</b>: شكل الإشارة ضاع. <b>بتظهر Digital Sampling Artefacts</b>: الظاهرة دي اسمها <b>Aliasing</b>، وبتأثر على <b>الـ Audio والصور والـ Video</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [cmp, setCmp] = useState(false);
    const f = spline(D11.map((v, k) => [k, v]));
    const X = t => 48 + t * 11.6, Y = v => 205 - v * 2.3;
    const step = [0, 1, 2, 4][i], bars = step ? N(Math.floor(32 / step) + 1, k => k * step) : [];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 236" role="img" aria-label="Signal from 0 to 32 and its samples as bars">
        <path d="M48 16 V205 H425" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        ${[0, 20, 40, 60, 80].map(v => html`<g key=${v}><path d=${`M43 ${Y(v)} H48`} stroke="var(--ink)" /><text x="38" y=${Y(v) + 5} textAnchor="end" fontSize="20">${v}</text></g>`)}
        ${[0, 8, 16, 24, 32].map(t => html`<g key=${t}><path d=${`M${X(t)} 205 V210`} stroke="var(--ink)" /><text x=${X(t)} y="228" textAnchor="middle" fontSize="20">${t}</text></g>`)}
        ${(i === 0 || cmp) && html`<path d=${curve(f, 0, 32, 320, X, Y)} stroke=${i === 0 ? 'var(--ink)' : 'var(--k-mm)'} strokeWidth=${i === 0 ? 2.5 : 2} strokeDasharray=${i === 0 ? null : '5 4'} fill="none" />`}
        ${bars.map(t => html`<rect key=${step + '-' + t} x=${X(t) - 2} y=${Y(D11[t])} width="4" height=${205 - Y(D11[t])} fill="var(--ink)" />`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} />
      <div className="fig-bar" style=${{ paddingBottom: 0 }}><button className=${'fm2-pb' + (cmp ? ' on' : '')} onClick=${() => setCmp(c => !c)} disabled=${i === 0}>${cmp ? 'Hide the original' : 'Compare with the original'}</button></div>
      <${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 12: three sinusoids through the same sample points ── */
  function SameSamples({ ar }) {
    const steps = [
      { en: 'The <b>sample points</b>: one sample at each t = −4, −3, …, 4.', ar: 'الـ <b>sample points</b>: sample واحدة عند كل t = −4، −3، …، 4.' },
      { en: 'A <span class="fm2-c-b">blue</span> sinusoid passes through them.', ar: 'sinusoid <span class="fm2-c-b">أزرق</span> بيعدي عليهم.' },
      { en: 'A <span class="fm2-c-r">red</span> sinusoid, a different one, passes through <b>exactly the same points</b>.', ar: 'sinusoid <span class="fm2-c-r">أحمر</span>، واحد تاني خالص، بيعدي على <b>نفس النقط بالظبط</b>.' },
      { en: 'So does a <span class="fm2-c-g">green</span> one.', ar: 'وكمان واحد <span class="fm2-c-g">أخضر</span>.' },
      { en: 'If you get Nyquist sampling wrong, the samples alone <b>cannot tell the three apart</b>.', ar: 'لو الـ Nyquist sampling غلط، الـ samples لوحدها <b>مش هتعرف تفرق بين التلاتة</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const X = t => 52 + (t + 4) * 46, Y = v => 140 - v * 40, P = Math.PI;
    const C = [[t => Math.cos(P * t), 'var(--k-compiler)', 1], [t => Math.SQRT2 * Math.cos(P * t + P / 4), 'var(--pen)', 2], [t => 2 * Math.cos(P * t - P / 3), 'var(--ok)', 3]];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 290" role="img" aria-label="Three sinusoids, blue, red and green, crossing the same sample points at t from -4 to 4">
        <rect x="52" y="20" width="368" height="240" fill="none" stroke="var(--graphite)" strokeWidth="1.2" />
        ${N(7, k => k - 3).map(v => html`<g key=${'y' + v}><path d=${`M52 ${Y(v)} H57`} stroke="var(--graphite)" /><text x="44" y=${Y(v) + 5} textAnchor="end" fontSize="20">${v}</text></g>`)}
        ${N(9, k => k - 4).map(t => html`<g key=${'x' + t}><path d=${`M${X(t)} 260 V255`} stroke="var(--graphite)" /><text x=${X(t)} y="281" textAnchor="middle" fontSize="20">${t}</text></g>`)}
        ${C.map(([f, c, s], k) => html`<path key=${k} d=${curve(f, -4, 4, 320, X, Y)} stroke=${c} strokeWidth="2.2" fill="none" className="fade" style=${{ opacity: i >= s ? (i === s || i === 4 ? 1 : .55) : 0 }} />`)}
        ${N(9, k => k - 4).map(t => html`<circle key=${t} cx=${X(t)} cy=${Y(t % 2 ? -1 : 1)} r="5.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 13: what does aliasing sound like? ── */
  const SWEEP = 4, TOP = 8000;
  const sweep = fs => { const n = Math.round(SWEEP * fs), d = new Float32Array(n), k = TOP / SWEEP; for (let j = 0; j < n; j++) { const t = j / fs, env = Math.min(1, t / .03, (SWEEP - t) / .03); d[j] = .6 * env * Math.sin(Math.PI * k * t * t); } return d; };
  function AliasSound({ ar }) {
    const pl = usePlayer();
    const X = t => 56 + t * 90, Y = f => 196 - f * 20;
    const go = key => pl.play(key, sweep(key === 'cd' ? 44100 : 8000), key === 'cd' ? 44100 : 8000);
    const T = Math.min(pl.t, SWEEP);
    let en, a;
    if (pl.on === 'cd') { en = 'Playing: the sine sweeping up from 0 to 8 KHz, sampled at <b>44.1 KHz</b> (CD). Its Nyquist frequency is 22.05 KHz, so the whole sweep is captured: you hear it rise all the way.'; a = 'شغّال: sine طالع من 0 لـ 8 KHz، متعملها sampling بـ <b>44.1 KHz</b> (CD). الـ Nyquist frequency بتاعتها 22.05 KHz، فالـ sweep كله بيتلقط: هتسمعه طالع للآخر.'; }
    else if (pl.on === 'tel') { en = 'Playing: the same sweep sampled at <b>8 KHz</b> (telephone). Its Nyquist frequency is 8 ÷ 2 = 4 KHz. Above that the samples no longer fit the sine: <b>aliasing</b>, a false lower frequency, so the pitch you hear turns round and falls.'; a = 'شغّال: نفس الـ sweep متعملها sampling بـ <b>8 KHz</b> (تليفون). الـ Nyquist frequency بتاعتها 8 ÷ 2 = 4 KHz. فوقها الـ samples مبقتش بتمثل الـ sine: <b>aliasing</b>، يعني frequency أقل كدابة، فالـ pitch اللي بتسمعه بيلف وينزل.'; }
    else { en = 'What does aliasing sound like? Play a sine that sweeps up from 0 to 8 KHz, once sampled at 44.1 KHz (CD) and once at 8 KHz (telephone). The graph shows the frequency you hear. The slide\'s demos (Sine Wave, Aliased Sine Wave, Aliased Piano) come with MATLAB code (Plot Version, Audio Version); more on image and video sampling artefacts later.'; a = 'الـ aliasing صوته عامل إزاي؟ شغّل sine طالع من 0 لـ 8 KHz، مرة متعملها sampling بـ 44.1 KHz (CD) ومرة بـ 8 KHz (تليفون). الرسمة بتوري الـ frequency اللي بتسمعها. ديمو السلايد (Sine Wave وAliased Sine Wave وAliased Piano) معاه MATLAB code (Plot Version وAudio Version)؛ والـ artefacts بتاعة الصور والـ video جاية بعدين.'; }
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 236" role="img" aria-label="Heard frequency against time: at 44.1 KHz it rises to 8 KHz; at 8 KHz it rises to 4 KHz then falls back">
        <path d="M56 26 V196 H426" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        ${[0, 2, 4, 6, 8].map(f => html`<g key=${f}><path d=${`M51 ${Y(f)} H56`} stroke="var(--ink)" /><text x="46" y=${Y(f) + 5} textAnchor="end" fontSize="20">${f}</text></g>`)}
        ${[0, 1, 2, 3, 4].map(t => html`<g key=${t}><path d=${`M${X(t)} 196 V201`} stroke="var(--ink)" /><text x=${X(t)} y="218" textAnchor="middle" fontSize="20">${t} s</text></g>`)}
        <text x="10" y="18" fontSize="20">KHz heard</text>
        <path d=${`M56 ${Y(4)} H426`} stroke="var(--graphite)" strokeDasharray="4 5" /><text x="62" y=${Y(4) - 8} fontSize="20" style=${{ fill: 'var(--graphite)' }}>8 KHz ÷ 2 = 4 KHz</text>
        <path d=${`M${X(0)} ${Y(0)} L${X(4)} ${Y(8)}`} stroke="var(--k-compiler)" strokeWidth=${pl.on === 'cd' ? 4 : 2.5} fill="none" />
        <path d=${`M${X(0)} ${Y(0)} L${X(2)} ${Y(4)} L${X(4)} ${Y(0)}`} stroke="var(--pen)" strokeWidth=${pl.on === 'tel' ? 4 : 2.5} fill="none" />
        ${pl.on && html`<path d=${`M${X(T)} 26 V196`} stroke="var(--k-mm)" strokeWidth="2.5" />`}
      </svg>
      <div className="fm2-leg"><span><i style=${{ background: 'var(--k-compiler)' }}></i>sampled at 44.1 KHz</span><span><i style=${{ background: 'var(--pen)' }}></i>sampled at 8 KHz</span></div>
      <div className="fm2-play">
        <button className=${'fig-btn' + (pl.on === 'cd' ? ' on' : '')} onClick=${() => go('cd')} disabled=${!pl.ok}>${pl.on === 'cd' ? '■ Stop' : '▶ Sine Wave'}</button>
        <button className=${'fig-btn' + (pl.on === 'tel' ? ' on' : '')} onClick=${() => go('tel')} disabled=${!pl.ok}>${pl.on === 'tel' ? '■ Stop' : '▶ Aliased Sine Wave'}</button></div>
      ${!pl.ok && html`<p className="fm2-small">This browser cannot play generated sound.</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L4 slide 17: low-pass filter before sampling ── */
  function LowPass({ ar }) {
    const steps = [
      { en: '<b>Input Signal (Analog)</b>: it also contains high frequencies.', ar: '<b>Input Signal (Analog)</b>: فيها frequencies عالية كمان.' },
      { en: 'It must go through a <b>Low Pass Filter</b> before sampling.', ar: 'لازم تعدي على <b>Low Pass Filter</b> قبل الـ sampling.' },
      { en: '<b>Filtered Signal (Analog)</b>: the high frequencies are taken out.', ar: '<b>Filtered Signal (Analog)</b>: الـ frequencies العالية اتشالت.' },
      { en: 'The <b>A/D Converter</b> samples it.', ar: 'الـ <b>A/D Converter</b> بيعمل لها sampling.' },
      { en: '<b>Sampled Signal (Digital)</b>: the samples follow the signal. Try <b>Skip the filter</b> below.', ar: '<b>Sampled Signal (Digital)</b>: الـ samples ماشية مع الإشارة. جرّب <b>Skip the filter</b> تحت.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    const [skip, setSkip] = useState(false);
    const slow = u => Math.sin(2 * Math.PI * u), inp = u => slow(u) + .45 * Math.sin(2 * Math.PI * 9 * u);
    const Xm = u => 6 + u * 148, Ym = v => 32 - v * 18;
    const mini = (f, on) => html`<svg viewBox="0 0 160 64" aria-hidden="true"><path d="M4 32 H156" stroke="var(--faint)" /><path d=${curve(f, 0, 1, 200, Xm, Ym)} stroke=${on ? 'var(--k-os)' : 'var(--faint)'} strokeWidth="2" fill="none" /></svg>`;
    const src = skip ? inp : slow, pts = N(13, k => k / 12);
    const dig = html`<svg viewBox="0 0 160 64" aria-hidden="true"><path d="M4 32 H156" stroke="var(--faint)" />
      ${skip && html`<path d=${curve(slow, 0, 1, 100, Xm, Ym)} stroke="var(--faint)" strokeDasharray="3 3" fill="none" />`}
      ${pts.map((u, k) => html`<g key=${k}><path d=${`M${Xm(u)} 32 V${Ym(src(u))}`} stroke="var(--ink)" strokeWidth="1.3" /><circle cx=${Xm(u)} cy=${Ym(src(u))} r="3.2" fill=${skip ? 'var(--pen)' : 'var(--k-mm)'} /></g>`)}</svg>`;
    const arw = on => html`<div className="fm2-ar" style=${{ opacity: on ? 1 : .3 }}><span className="h">→</span><span className="v">↓</span></div>`;
    const cap = skip && i === steps.length - 1 ? { en: 'Without the filter, high frequency signals (<b>above the Nyquist Limit</b>) reach the A/D converter and <b>strange artefacts</b> appear in the sampled signal: the dots no longer follow the slow wave (dashed).', ar: 'من غير الـ filter، الـ high frequency signals (<b>فوق الـ Nyquist Limit</b>) بتوصل للـ A/D converter و<b>artefacts غريبة</b> بتظهر في الـ sampled signal: النقط مبقتش ماشية مع الموجة البطيئة (المتقطعة).' } : steps[i];
    return html`<figure className="fig"><div className="fig-stage"><div className="fm2-chain">
      <div className=${'fm2-node' + (i >= 0 ? ' on' : '')}>${mini(inp, true)}Input Signal (Analog)</div>${arw(i >= 1)}
      <div className=${'fm2-blk' + (skip ? ' off' : i >= 1 ? ' on' : '')}>Low Pass Filter</div>${arw(i >= 2)}
      <div className=${'fm2-node' + (i >= 2 && !skip ? ' on' : '')}>${mini(skip ? inp : slow, i >= 2)}Filtered Signal (Analog)</div>${arw(i >= 3)}
      <div className=${'fm2-blk' + (i >= 3 ? ' on' : '')}>A/D Converter</div>${arw(i >= 4)}
      <div className=${'fm2-node' + (i >= 4 ? ' on' : '')}>${dig}Sampled Signal (Digital)</div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} />
      <div className="fig-bar" style=${{ paddingBottom: 0 }}><button className=${'fm2-pb' + (skip ? ' on' : '')} onClick=${() => { setSkip(s => !s); ctl.go(steps.length - 1); }}>${skip ? 'Use the filter' : 'Skip the filter'}</button></div>
      <${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 18–19: why are CD sample rates 44.1 KHz? ── */
  function CdRate({ ar }) {
    const steps = [
      { en: 'Why are CD sample rates <b>44.1 KHz</b>?', ar: 'ليه الـ sample rate بتاع الـ CD <b>44.1 KHz</b>؟' },
      { en: 'The upper range of human hearing is around <b>20-22 KHz</b>.', ar: 'أعلى مدى لسمع الإنسان حوالي <b>20-22 KHz</b>.' },
      { en: 'Apply <b>Nyquist</b>: sample at least twice the highest frequency, 2 × 22.05 KHz = <b>44.1 KHz</b>.', ar: 'طبّق <b>Nyquist</b>: الـ sampling لازم يكون على الأقل ضعف أعلى frequency، 2 × 22.05 KHz = <b>44.1 KHz</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const X = f => 22 + f * 8.9;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 186" role="img" aria-label="Frequency axis: human hearing up to about 20 to 22 KHz, doubled to 44.1 KHz">
        <defs>${arrowDef('fm2-cd-a', 'var(--k-mm)')}</defs>
        <text x="220" y="30" textAnchor="middle" fontSize="22" fontWeight="700" className=${pop(i === 0)}>Why 44.1 KHz?</text>
        <g className=${pop(i >= 1)}>
          <rect x=${X(0)} y="92" width=${X(20) - X(0)} height="40" fill=${tint} />
          <rect x=${X(20)} y="92" width=${X(22) - X(20)} height="40" fill=${tint} opacity=".5" />
          <text x=${X(10)} y="117" textAnchor="middle" fontSize="20" fontWeight="600">human hearing</text>
        </g>
        <g className=${pop(i >= 2)}>
          <path d=${`M${X(22.05)} 86 V138`} stroke="var(--k-mm)" strokeWidth="2.5" /><text x=${X(22.05)} y="80" textAnchor="middle" fontSize="20" fontWeight="700">22.05</text>
          <path d=${`M${X(22.05) + 4} 60 Q ${X(33)} 30 ${X(44.1) - 4} 60`} stroke="var(--k-mm)" strokeWidth="2" fill="none" markerEnd="url(#fm2-cd-a)" />
          <text x=${X(33)} y="58" textAnchor="middle" fontSize="20" fontWeight="700" style=${{ fill: 'var(--k-mm)' }}>× 2</text>
          <path d=${`M${X(44.1)} 66 V138`} stroke="var(--k-mm)" strokeWidth="3" /><text x=${X(44.1) - 6} y="82" textAnchor="end" fontSize="20" fontWeight="700">44.1</text>
        </g>
        <path d="M22 138 H426" stroke="var(--ink)" strokeWidth="1.5" />
        ${[0, 10, 20, 30, 40].map(f => html`<g key=${f}><path d=${`M${X(f)} 138 V144`} stroke="var(--ink)" /><text x=${X(f)} y="162" textAnchor="middle" fontSize="20">${f}</text></g>`)}
        <text x="438" y="182" textAnchor="end" fontSize="20">KHz</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 15: the sound examples table, playable ── */
  const Q15 = [['44 KHz 16 bit', 44100, 16], ['44 KHz 8-bit', 44100, 8], ['22 KHz 16-bit', 22050, 16], ['22 KHz 8-bit', 22050, 8], ['11 KHz 8-bit', 11025, 8]];
  const clip = (fs, bits) => {
    const L = 2.2, n = Math.round(L * fs), d = new Float32Array(n), notes = [440, 554.37, 659.25, 880];
    notes.forEach((f0, j) => { const st = j * .45; for (let h = 1; h <= 24; h++) { const f = f0 * h; if (f >= fs / 2 || f > 16000) break; const amp = 1 / h; for (let s = Math.round(st * fs); s < n; s++) { const t = s / fs - st; d[s] += amp * Math.exp(-3 * t) * Math.sin(2 * Math.PI * f * t); } } });
    let m = 0; for (let s = 0; s < n; s++) m = Math.max(m, Math.abs(d[s]));
    const lv = Math.pow(2, bits) - 1;
    for (let s = 0; s < n; s++) { const x = .9 * d[s] / m * Math.min(1, (n - s) / (fs * .05)); d[s] = Math.round((x + 1) / 2 * lv) / lv * 2 - 1; }
    return d;
  };
  function QualityPlay({ ar }) {
    const pl = usePlayer(), cache = useRef({});
    const go = k => { const [, fs, b] = Q15[k]; if (!cache.current[k]) cache.current[k] = clip(fs, b); pl.play(k, cache.current[k], fs); };
    const k = pl.on;
    const en = k == null ? 'The slide\'s audio examples (all mono) at five settings. Press play: the page makes one short clip at each setting so you can compare. Fewer bits and a lower sample rate give lower quality.' : `Playing <b>${Q15[k][0]}</b>: ${fmt(Q15[k][1], 0)} samples per second, each stored with ${Q15[k][2]} bits (${fmt(Math.pow(2, Q15[k][2]), 0)} levels).`;
    const a = k == null ? 'أمثلة الصوت بتاعة السلايد (كلها mono) بخمس إعدادات. دوس play: الصفحة بتعمل clip قصير بكل إعداد عشان تقارن. bits أقل وsample rate أقل يعني جودة أقل.' : `شغّال <b>${Q15[k][0]}</b>: ${fmt(Q15[k][1], 0)} sample في الثانية، وكل واحدة متخزنة بـ ${Q15[k][2]} bits (${fmt(Math.pow(2, Q15[k][2]), 0)} level).`;
    return html`<figure className="fig"><div className="fig-stage">
      <table className="fm2-tbl" style=${{ maxWidth: '380px' }}><thead><tr><th>File Type</th><th>Audio File (all mono)</th></tr></thead><tbody>
        ${Q15.map((r, j) => html`<tr key=${j} className=${k === j ? 'on' : ''}><td>${r[0]}</td><td><button className=${'fm2-pb' + (k === j ? ' on' : '')} onClick=${() => go(j)} disabled=${!pl.ok} aria-label=${(k === j ? 'Stop ' : 'Play ') + r[0]}>${k === j ? '■ Stop' : '▶ Play'}</button></td></tr>`)}
      </tbody></table>
      ${!pl.ok && html`<p className="fm2-small">This browser cannot play generated sound.</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L4 slide 16: memory required for 1 minute of digital audio ── */
  const R16 = [['16 Bit Stereo', 16, 2, ['10.1 Mb', '5.05 Mb', '2.52 Mb']], ['16 Bit Mono', 16, 1, ['5.05 Mb', '2.52 Mb', '1.26 Mb']], ['8 Bit Mono', 8, 1, ['2.52 Mb', '1.26 Mb', '630 Kb']]];
  const C16 = [['44.1 KHz', 44100], ['22.05 KHz', 22050], ['11.025 KHz', 11025]];
  function SizeTable({ ar }) {
    const [sel, setSel] = useState([0, 0]), fit = useFit(sel.join());
    const [r, c] = sel, row = R16[r], fs = C16[c][1], bits = fs * row[1] * row[2] * 60, B = bits / 8;
    const en = `<b>${row[0]} at ${C16[c][0]}</b> for 1 minute: size = sample rate × bits × channels × time. The result matches the slide's <b>${row[3][c]}</b>. Tap another cell.`;
    const a = `<b>${row[0]} بـ ${C16[c][0]}</b> لمدة دقيقة: الحجم = sample rate × bits × channels × time. الناتج نفس رقم السلايد <b>${row[3][c]}</b>. دوس على خانة تانية.`;
    return html`<figure className="fig"><div className="fig-stage">
      <div ref=${fit} style=${{ overflow: 'hidden' }}><table className="fm2-tbl fm2-st"><thead><tr><th>File Type</th>${C16.map(x => html`<th key=${x[0]}>${x[0]}</th>`)}</tr></thead><tbody>
        ${R16.map((x, j) => html`<tr key=${j}><th className="rh">${x[0]}</th>${x[3].map((v, k) => html`<td key=${k} className=${'pick' + (j === r && k === c ? ' sel' : '')} onClick=${() => setSel([j, k])} role="button" tabIndex="0" onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') setSel([j, k]); }}>${v}</td>`)}</tr>`)}
      </tbody></table></div>
      <p className="fm2-small">Memory Required for <b style=${{ color: 'var(--k-mm)' }}>1 Minute</b> of Digital Audio</p>
      <div className="fm2-calc">
        <div>${fmt(fs, 0)} × ${row[1]} × ${row[2]} × 60 s = ${fmt(bits, 0)} bits</div>
        <div>÷ 8 = ${fmt(B, 0)} bytes</div>
        <div>÷ 1024 = ${fmt(B / 1024)} KB</div>
        <div className="res">÷ 1024 = ${fmt(B / 1048576)} MB → slide: ${row[3][c]}</div>
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L4 audio file size, worked examples (course summary) ── */
  const EX = [
    { n: 'Ex 1', m: 'rate', rate: 44100, bits: 16, time: 60, tu: 's', ch: 2 },
    { n: 'Ex 2', m: 'int', iv: 0.000125, iu: 's', bits: 16, time: 4.5, tu: 'min', ch: 2 },
    { n: 'Ex 3', m: 'int', iv: 500, iu: 'ms', bits: 64, time: 5.5, tu: 'h', ch: 2 },
    { n: 'Ex 4 (speech)', m: 'rate', rate: 8000, bits: 32, time: 2.5, tu: 'h', ch: 2 }
  ];
  function SizeCalc({ ar }) {
    const [s, setS] = useState(Object.assign({ iv: 0.000125, iu: 's', rate: 44100 }, EX[0])), [ex, setEx] = useState(0);
    const up = (k, v) => { setEx(null); setS(o => Object.assign({}, o, { [k]: v })); };
    const num = e => parseFloat(e.target.value);
    const ivs = s.iu === 'ms' ? s.iv / 1000 : s.iv;
    const fs = s.m === 'int' ? Math.round(1 / ivs * 1e6) / 1e6 : s.rate;
    const mul = { s: 1, min: 60, h: 3600 }[s.tu], t = s.time * mul;
    const ok = [fs, s.bits, t, s.ch].every(x => isFinite(x) && x > 0);
    const bits = fs * s.bits * t * s.ch, B = bits / 8;
    const en = '<b>Size (bits) = time (s) × sample rate (Hz) × sample size (bits) × channels.</b> Divide by 8 for bytes, by 1024 for KB, by 1024 again for MB. If only the sampling interval is given, fs = 1 / interval. Pick a worked example or enter your own values.';
    const a = '<b>الحجم (bits) = الوقت (s) × الـ sample rate (Hz) × الـ sample size (bits) × عدد الـ channels.</b> اقسم على 8 عشان الـ bytes، وعلى 1024 للـ KB، وعلى 1024 تاني للـ MB. لو معاك الـ sampling interval بس، fs = 1 / interval. اختار مثال محلول أو اكتب أرقامك.';
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm2-chips">${EX.map((x, k) => html`<button key=${k} className=${'fig-btn' + (ex === k ? ' sel' : '')} onClick=${() => { setEx(k); setS(o => Object.assign({}, o, x)); }}>${x.n}</button>`)}</div>
      <div className="fm2-form">
        <label>${s.m === 'int' ? 'Sampling interval' : 'Sample rate (Hz)'}
          <div className="ln">${s.m === 'int' ? html`<input type="number" step="any" min="0" value=${s.iv} onInput=${e => up('iv', num(e))} /><select value=${s.iu} onChange=${e => up('iu', e.target.value)}><option value="s">s</option><option value="ms">ms</option></select>` : html`<input type="number" step="any" min="0" value=${s.rate} onInput=${e => up('rate', num(e))} />`}
            <select value=${s.m} onChange=${e => up('m', e.target.value)} aria-label="Give the rate or the interval"><option value="rate">rate</option><option value="int">interval</option></select></div></label>
        <label>Sample size (bits)<input type="number" step="1" min="1" value=${s.bits} onInput=${e => up('bits', num(e))} /></label>
        <label>Time<div className="ln"><input type="number" step="any" min="0" value=${s.time} onInput=${e => up('time', num(e))} /><select value=${s.tu} onChange=${e => up('tu', e.target.value)}><option value="s">s</option><option value="min">min</option><option value="h">h</option></select></div></label>
        <label>Channels<select value=${s.ch} onChange=${e => up('ch', +e.target.value)} style=${{ width: '100%' }}><option value="1">1 (mono)</option><option value="2">2 (stereo)</option></select></label>
      </div>
      ${ok ? html`<div className="fm2-calc">
        ${s.m === 'int' && html`<div>fs = 1 / ${fmt(ivs, 9)} s = ${fmt(fs, 4)} Hz</div>`}
        ${ex === 3 && html`<div className="note">Speech: fs = 2 × 4000 = 8000 Hz</div>`}
        ${mul !== 1 && html`<div>t = ${fmt(s.time, 4)} × ${mul} = ${fmt(t, 4)} s</div>`}
        <div>${fmt(fs, 4)} × ${s.bits} × ${fmt(t, 4)} × ${s.ch} = ${fmt(bits, 0)} bits</div>
        <div>÷ 8 = ${fmt(B)} bytes</div>
        <div>÷ 1024 = ${fmt(B / 1024)} KB</div>
        <div className="res">÷ 1024 = ${fmt(B / 1048576)} MB</div>
      </div>` : html`<p className="fm2-small">Enter positive numbers.</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L4 slide 20: ADPCM predicts the next sample and stores the difference ── */
  function Adpcm({ ar }) {
    const x = [3.0, 4.2, 5.0, 5.4, 5.2, 4.4, 3.4, 2.6];
    const p = x.map((_, k) => k < 2 ? null : 2 * x[k - 1] - x[k - 2]);
    const steps = [
      { en: '<b>ADPCM</b> (Adaptive Delta Pulse Code Modulation) starts from the <b>past samples</b>.', ar: 'الـ <b>ADPCM</b> (Adaptive Delta Pulse Code Modulation) بيبدأ من الـ <b>samples اللي فاتت</b>.' },
      { en: 'Based on past samples, it <b>predicts the next sample</b> (hollow dot).', ar: 'على أساس الـ samples اللي فاتت، <b>بيتوقع الـ sample الجاية</b> (النقطة الفاضية).' },
      { en: 'It then <b>encodes the difference</b> between the actual value and the predicted value: only this difference is stored (bottom row).', ar: 'وبعدين <b>بيعمل encode للفرق</b> بين القيمة الحقيقية والقيمة المتوقعة: الفرق ده بس هو اللي بيتخزن (الصف اللي تحت).' },
      ...N(4, k => ({ en: 'Next sample: predict it, then encode the difference.', ar: 'الـ sample اللي بعدها: نتوقعها، وبعدين نعمل encode للفرق.' })),
      { en: 'The stored differences are much smaller than the samples. A simple and widely used method (by .au, .aiff and .wav). More on this later (Audio Compression).', ar: 'الفروق اللي اتخزنت أصغر بكتير من الـ samples نفسها. طريقة بسيطة ومستخدمة كتير (في .au و.aiff و.wav). تفاصيل أكتر بعدين (Audio Compression).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    const cur = i === 0 ? 1 : i <= 2 ? 2 : Math.min(7, i);
    const shown = k => k < 2 || k < cur || (k === cur && i >= 2) || i === steps.length - 1;
    const pred = k => k >= 2 && (k < cur || k === cur || i === steps.length - 1) && i >= 1;
    const diff = k => k >= 2 && (k < cur || (k === cur && i >= 2) || i === steps.length - 1);
    const X = k => 50 + k * 50, Y = v => 150 - v * 22, Yd = v => 222 - v * 40;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 262" role="img" aria-label="Samples, predicted values and the stored differences">
        <path d="M30 150 H430 M30 222 H430" stroke="var(--graphite)" strokeWidth="1.3" />
        <text x="30" y="20" fontSize="20" fontWeight="600">Samples</text><text x="30" y="182" fontSize="20" fontWeight="600">Stored: differences</text>
        ${x.map((v, k) => html`<g key=${k}>
          ${pred(k) && html`<circle cx=${X(k)} cy=${Y(p[k])} r="6.5" fill="none" stroke="var(--k-fp)" strokeWidth="2.5" strokeDasharray=${k === cur && i === 1 ? '3 2' : null} />`}
          ${shown(k) && html`<g><path d=${`M${X(k)} 150 V${Y(v)}`} stroke="var(--ink)" strokeWidth="2" /><circle cx=${X(k)} cy=${Y(v)} r="5.5" fill=${k < 2 ? 'var(--graphite)' : 'var(--k-os)'} /></g>`}
          ${diff(k) && html`<g><path d=${`M${X(k) + 10} ${Y(p[k])} V${Y(v)}`} stroke="var(--pen)" strokeWidth="2.5" /><path d=${`M${X(k)} 222 V${Yd(v - p[k])}`} stroke="var(--pen)" strokeWidth="5" /></g>`}
          ${k === cur && i >= 1 && i < steps.length - 1 && html`<path d=${`M${X(k) - 20} 158 H${X(k) + 20}`} stroke="var(--k-mm)" strokeWidth="3" />`}
        </g>`)}
        <text x="430" y="255" textAnchor="end" fontSize="20" style=${{ fill: 'var(--graphite)' }}>time →</text>
      </svg>
      <div className="fm2-leg"><span><i className="dot" style=${{ background: 'var(--k-os)' }}></i>actual value</span><span><i className="ring"></i>predicted value</span><span><i style=${{ background: 'var(--pen)' }}></i>difference</span></div>
      <p className="fm2-small">The prediction drawn here continues the line through the last two samples, only as an illustration: the slide does not say how ADPCM predicts.</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 22 and 24: synthesis pipeline and the analogy with vector graphics ── */
  function SynthPipe({ ar }) {
    const steps = [
      { en: '<b>Synthesis pipeline</b>: synthesise sounds in <b>hardware or software</b>.', ar: '<b>Synthesis pipeline</b>: بنعمل synthesis للأصوات بالـ <b>hardware أو الـ software</b>.' },
      { en: 'The <b>client produces the sound</b>: only <b>parameters</b> to control the sound are sent (<b>MIDI / MP4 / HTML5</b>).', ar: 'الـ <b>client هو اللي بيطلّع الصوت</b>: بنبعت بس <b>الـ parameters</b> اللي بتتحكم في الصوت (<b>MIDI / MP4 / HTML5</b>).' },
      { en: '<b>Recorded sounds</b> and <b>digital images</b>: regular sampling; large data size; difficult to modify.', ar: 'الـ <b>Recorded sounds</b> والـ <b>digital images</b>: sampling منتظم؛ حجم data كبير؛ صعب تعدّل فيها.' },
      { en: '<b>Synthetic sounds</b> and <b>vector graphics</b>: high level descriptions; small data size; easier to edit. <b>Conversion is needed before display</b>: synthesis or rasterisation.', ar: 'الـ <b>Synthetic sounds</b> والـ <b>vector graphics</b>: وصف high level؛ حجم data صغير؛ أسهل في التعديل. <b>لازم conversion قبل العرض</b>: synthesis أو rasterisation.' },
      { en: 'Difference: <b>1D vs 2D</b>.', ar: 'الفرق: <b>1D vs 2D</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const mv = !calm();
    const sw = u => Math.sin(2 * Math.PI * 2 * u) * Math.exp(-u * 1.5);
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 154" role="img" aria-label="Only parameters are sent; the client synthesises the sound">
        <defs>${arrowDef('fm2-sp-a', 'var(--k-mm)')}</defs>
        <rect x="2" y="36" width="182" height="72" rx="8" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" className=${pop(i >= 1)} />
        <text x="93" y="66" textAnchor="middle" fontSize="20" fontWeight="600" className=${pop(i >= 1)}>parameters</text>
        <text x="93" y="92" textAnchor="middle" fontSize="20" className=${pop(i >= 1)}>MIDI/MP4/HTML5</text>
        <path d="M186 72 H216" stroke="var(--k-mm)" strokeWidth="3" markerEnd="url(#fm2-sp-a)" className=${(i >= 1 && mv ? 'flow ' : '') + pop(i >= 1)} />
        <rect x="220" y="24" width="218" height="96" rx="10" fill=${tint} stroke="var(--k-mm)" strokeWidth=${i <= 1 ? 3 : 1.5} className="fade" />
        <text x="329" y="52" textAnchor="middle" fontSize="20" fontWeight="700">Client: synthesise</text>
        <text x="329" y="76" textAnchor="middle" fontSize="20">hardware or software</text>
        <path d=${curve(sw, 0, 1, 80, u => 262 + u * 136, v => 98 - v * 14)} stroke="var(--k-os)" strokeWidth="2.5" fill="none" className=${pop(i >= 1)} />
        <text x="220" y="146" textAnchor="middle" fontSize="20" className=${pop(i >= 1)}>sound produced at the client</text>
      </svg>
      <div className="fm2-ana">
        <div className=${'card' + (i === 2 || i === 4 ? ' on' : '')}><span className="t">Recorded sounds ≈ digital images</span>
          <svg viewBox="0 0 200 50" aria-hidden="true">${N(13, k => html`<path key=${k} d=${`M${8 + k * 10} 42 V${42 - 30 * Math.abs(Math.sin(k / 2.5))}`} stroke="var(--ink)" strokeWidth="2" />`)}${N(25, k => html`<rect key=${'p' + k} x=${150 + (k % 5) * 9} y=${4 + Math.floor(k / 5) * 9} width="8" height="8" fill=${(k * 7) % 3 ? 'var(--k-mm)' : 'var(--faint)'} opacity=${.35 + ((k * 5) % 7) / 10} />`)}</svg>
          Regular sampling; large data size; difficult to modify.</div>
        <div className=${'card' + (i === 3 || i === 4 ? ' on' : '')}><span className="t">Synthetic sounds ≈ vector graphics</span>
          <svg viewBox="0 0 200 50" aria-hidden="true"><path d=${curve(sw, 0, 1, 60, u => 8 + u * 120, v => 26 - v * 18)} stroke="var(--k-os)" strokeWidth="2.5" fill="none" /><circle cx="172" cy="25" r="18" fill="none" stroke="var(--k-mm)" strokeWidth="3" /></svg>
          High level descriptions; small data size; easier to edit. Conversion is needed before display: synthesis or rasterisation.</div>
        <div className=${'foot ' + pop(i >= 4)}>Difference: 1D vs 2D</div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 23: synthesis methods, with additive and subtractive to try ── */
  const METH = [
    ['FM (Frequency Modulation) Synthesis', 'used in low-end Sound Blaster cards, OPL-4 chip, Yamaha DX Synthesiser range popular in Early 1980\'s.', 'مستخدم في كروت Sound Blaster الرخيصة، وشريحة OPL-4، وسلسلة Yamaha DX Synthesiser اللي كانت مشهورة في أول الثمانينات.'],
    ['Wavetable synthesis', 'wavetable generated from sampled sound waves of real instruments.', 'الـ wavetable بيتعمل من sound waves متسجلة (sampled) لآلات حقيقية.'],
    ['Additive synthesis', 'make up signal from smaller simpler waveforms.', 'بنكوّن الإشارة من waveforms أصغر وأبسط.'],
    ['Subtractive synthesis', 'modify a (complex) waveform but taking out (Filtering) elements.', 'بنعدّل waveform (معقدة) عن طريق إننا نشيل منها عناصر (Filtering).'],
    ['Granular Synthesis', 'use small fragments of existing samples to make new sounds.', 'بنستخدم حتت صغيرة من samples موجودة عشان نعمل أصوات جديدة.'],
    ['Physical Modelling', 'model how acoustic sound is generated in software.', 'بنعمل model بالـ software للطريقة اللي الصوت الـ acoustic بيتولد بيها.'],
    ['Sample-based synthesis', 'record and play back recorded audio, often small fragments and audio processed.', 'بنسجل ونشغّل audio متسجل، غالبًا حتت صغيرة، والـ audio بيتعالج.']
  ];
  function SynthMethods({ ar }) {
    const [m, setM] = useState(2), [on, setOn] = useState([true, false, false, false]);
    const pl = usePlayer();
    const pick = k => { setM(k); pl.stop(); if (k === 2) setOn([true, false, false, false]); if (k === 3) setOn([true, true, true, true]); };
    const demo = m === 2 || m === 3;
    const comp = h => t => Math.sin(2 * Math.PI * h * t) / h;
    const sum = t => on.reduce((s, o, k) => s + (o ? comp(k + 1)(t) : 0), 0);
    const X = t => 20 + t * 200, Y = v => 80 - v * 44;
    const play = () => { const c = ctx(); if (!c) return; const fs = c.sampleRate, n = Math.round(1.2 * fs), d = new Float32Array(n); for (let j = 0; j < n; j++) { const t = j / fs, e = Math.min(1, t / .02, (1.2 - t) / .05); d[j] = .4 * e * sum(220 * t); } pl.play('s', d, fs); };
    const toggle = k => { pl.stop(); setOn(o => o.map((v, j) => j === k ? !v : v)); };
    const [t, en, a] = METH[m];
    const enC = `<b>${t}</b>: ${en}${demo ? (m === 2 ? ' <b>Try it:</b> add simpler waveforms (sines) to build the signal.' : ' <b>Try it:</b> start from the complex waveform and take elements out.') : ''} Most modern Synthesisers use a mixture of sample and synthesis.`;
    const arC = `<b>${t}</b>: ${a}${demo ? (m === 2 ? ' <b>جرّب:</b> زوّد waveforms أبسط (sines) عشان تبني الإشارة.' : ' <b>جرّب:</b> ابدأ من الـ waveform المعقدة وشيل منها عناصر.') : ''} معظم الـ Synthesisers الحديثة بتستخدم خليط من الـ sample والـ synthesis.`;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm2-chips">${METH.map((x, k) => html`<button key=${k} className=${'fig-btn' + (k === m ? ' sel' : '')} onClick=${() => pick(k)}>${x[0].replace(' (Frequency Modulation)', '')}</button>`)}</div>
      <div className="fm2-desc"><span className="t">${t}</span>: ${en}</div>
      ${demo && html`<div>
        <svg viewBox="0 0 440 160" role="img" aria-label="Simple sine components and their sum">
          <path d="M20 80 H420" stroke="var(--faint)" />
          ${on.map((o, k) => o && html`<path key=${k} d=${curve(comp(k + 1), 0, 2, 200, X, Y)} stroke="var(--faint)" strokeWidth="1.3" fill="none" />`)}
          <path d=${curve(sum, 0, 2, 400, X, Y)} stroke="var(--k-mm)" strokeWidth="3" fill="none" />
        </svg>
        <div className="fm2-checks">${on.map((o, k) => html`<label key=${k}><input type="checkbox" checked=${o} onChange=${() => toggle(k)} />sine ${k + 1}</label>`)}</div>
        <div className="fm2-play"><button className=${'fig-btn' + (pl.on ? ' on' : '')} onClick=${() => pl.on ? pl.stop() : play()} disabled=${!pl.ok || !on.some(Boolean)}>${pl.on ? '■ Stop' : '▶ Listen'}</button></div>
      </div>`}</div>
      <${Cap} en=${enC} ar=${arC} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-digitise': Digitise, 'mm-sampling-1': Sampling1, 'mm-sampling-2': Sampling2, 'mm-bit-rate': BitRate,
    'mm-nyquist-3': Nyquist3, 'mm-nyquist-calc': NyquistCalc, 'mm-alias-panels': AliasPanels, 'mm-same-samples': SameSamples,
    'mm-alias-sound': AliasSound, 'mm-lowpass': LowPass, 'mm-cd-rate': CdRate, 'mm-quality-play': QualityPlay,
    'mm-size-table': SizeTable, 'mm-size-calc': SizeCalc, 'mm-adpcm': Adpcm, 'mm-synth-pipe': SynthPipe, 'mm-synth-methods': SynthMethods
  });
})();

/* ── part 3 ── */
// Multimedia visuals, part 3: L8 slides 1 to 32 (image types and sizes, colour LUT, dithering, light and the eye,
// cones, RGB / Lab / YIQ channels, colour displays, CIE, Lab model, YIQ and YUV transforms, NTSC bandwidths, YUV fields).
// Every label and caption comes from the slide or the site's notes for that slide.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
[data-fig^="mm-8a-"]{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }
.fm3-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fm3-chip{ font:inherit; font-size:.85rem; padding:5px 10px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; min-height:32px; }
.fm3-chip:hover{ border-color:var(--k-mm); } .fm3-chip.on{ background:var(--s-mm); color:#fff; border-color:transparent; }
.fm3-sl{ display:grid; grid-template-columns:5.6em 1fr 4.2em; gap:8px; align-items:center; max-width:460px; margin:6px auto; font-size:.9rem; color:var(--ink); }
.fm3-sl input{ width:100%; accent-color:var(--k-mm); min-width:0; }
.fm3-sl output{ font-family:var(--mono); text-align:right; }
.fm3-calc{ max-width:480px; margin:10px auto 0; font-family:var(--mono); font-size:.86rem; line-height:1.65; background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:8px 10px; overflow-wrap:anywhere; color:var(--ink); }
.fm3-hi{ color:var(--k-mm); font-weight:700; } .fm3-mut{ color:var(--graphite); }
.fm3-tiles{ display:grid; grid-template-columns:repeat(auto-fit, minmax(128px,1fr)); gap:8px; max-width:480px; margin:10px auto 0; }
.fm3-tiles > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; font-size:.82rem; color:var(--graphite); }
.fm3-tiles strong{ display:block; font:700 1.02rem var(--mono); color:var(--ink); }
.fm3-in{ display:flex; gap:8px; justify-content:center; align-items:center; flex-wrap:wrap; margin:0 0 8px; font-size:.9rem; color:var(--ink); }
.fm3-in input{ width:5.2em; font:inherit; font-family:var(--mono); padding:4px 6px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.fm3-bits{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:8px auto 0; max-width:480px; }
.fm3-bits .grp{ text-align:center; font-size:.78rem; color:var(--graphite); }
.fm3-bits .cells{ display:flex; gap:1px; } .fm3-bits .cells i{ width:8px; height:18px; border-radius:2px; background:color-mix(in srgb, var(--k-mm) 45%, var(--paper)); border:1px solid var(--k-mm); }
.fm3-grey{ display:flex; gap:10px; justify-content:center; margin-top:8px; font-size:.82rem; color:var(--graphite); } .fm3-grey span{ display:inline-flex; gap:6px; align-items:center; } .fm3-grey i{ width:26px; height:26px; border-radius:6px; border:1px solid var(--line); display:inline-block; }
.fm3-lut{ display:grid; grid-template-columns:1fr auto 1.35fr auto 1fr; gap:8px; align-items:center; max-width:640px; margin:0 auto; }
.fm3-arr{ font-size:1.4rem; color:var(--k-mm); text-align:center; transition:opacity .4s; } .fm3-arr .v{ display:none; }
@media (max-width:600px){ .fm3-lut{ grid-template-columns:1fr; } .fm3-arr .h{ display:none; } .fm3-arr .v{ display:inline; } }
.fm3-pan{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; font-size:.82rem; color:var(--ink); transition:box-shadow .4s, opacity .4s; text-align:center; }
.fm3-pan.on{ box-shadow:0 0 0 2px var(--k-mm); } .fm3-pan.dim{ opacity:.45; }
.fm3-pan .ttl{ font-weight:700; margin-bottom:4px; display:block; }
.fm3-mem{ display:grid; grid-template-columns:repeat(8, 1fr); gap:1px; background:var(--line); border:1px solid var(--line); max-width:180px; margin:4px auto; }
.fm3-mem i{ aspect-ratio:1; background:var(--paper-2); } .fm3-mem i.px{ outline:2px solid var(--k-mm); outline-offset:-2px; }
.fm3-ax{ display:flex; justify-content:space-between; max-width:180px; margin:0 auto; font-size:.78rem; color:var(--graphite); }
.fm3-box{ display:inline-block; margin-top:4px; border:1px solid var(--ink); padding:3px 8px; font-family:var(--mono); }
.fm3-tab{ width:100%; border-collapse:collapse; font-family:var(--mono); font-size:.8rem; }
.fm3-tab th, .fm3-tab td{ padding:2px 3px; text-align:center; } .fm3-tab th{ font-family:var(--body); }
.fm3-tab tr.hit td{ background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); }
.fm3-bit{ cursor:pointer; border-radius:2px; padding:0 1px; } .fm3-bit:hover{ background:color-mix(in srgb, var(--k-mm) 35%, var(--paper)); }
@media (max-width:600px){ .fm3-bit{ padding:0; } .fm3-tab th, .fm3-tab td{ padding:2px 1px; } .fm3-pan{ min-width:0; padding:8px 4px; } }
.fm3-dm{ display:grid; grid-template-columns:repeat(4, 46px); gap:3px; justify-content:center; }
.fm3-dm div{ height:46px; border-radius:6px; display:grid; place-items:center; font:700 .95rem var(--mono); border:1px solid #777; transition:background .3s, color .3s; }
.fm3-dm div.d1{ background:#fff; color:#111; } .fm3-dm div.d0{ background:#111; color:#ddd; }
.fm3-dith{ display:flex; gap:16px; justify-content:center; align-items:center; flex-wrap:wrap; }
.fm3-dith .lbl{ font-size:.82rem; color:var(--graphite); text-align:center; margin-top:4px; }
.fm3-pix{ width:64px; height:64px; border-radius:6px; border:1px solid var(--line); margin:0 auto; }
.fm3-mini{ display:grid; grid-template-columns:repeat(4, 6px); gap:0; margin:0 auto; border:1px solid var(--line); width:max-content; }
.fm3-mini i{ width:6px; height:6px; }
.fm3-cv{ display:block; width:100%; height:auto; image-rendering:pixelated; border:1px solid var(--line); border-radius:4px; }
.fm3-cvl{ font-size:.82rem; color:var(--graphite); margin:3px 0 10px; text-align:center; }
.fm3-imgs{ max-width:480px; margin:0 auto; }
.fm3-quad{ display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; max-width:440px; margin:0 auto; }
.fm3-quad canvas{ width:100%; height:auto; display:block; }
.fm3-quad .cap{ font-size:.85rem; text-align:center; color:var(--ink); font-weight:600; margin-top:2px; }
.fm3-read{ text-align:center; font-family:var(--mono); font-size:.86rem; margin-top:8px; color:var(--ink); min-height:1.4em; }
.fm3-bars{ display:grid; gap:6px; max-width:440px; margin:8px auto 0; }
.fm3-bars > div{ display:grid; grid-template-columns:6.6em 1fr; gap:8px; align-items:center; font-size:.86rem; color:var(--ink); }
.fm3-bars .tr{ height:16px; border-radius:99px; background:var(--paper); border:1px solid var(--line); overflow:hidden; } .fm3-bars .tr i{ display:block; height:100%; transition:width .5s; }
.fm3-bars em{ font-style:normal; font-family:var(--mono); font-size:.86rem; }
.fm3-lcd{ display:grid; grid-template-columns:minmax(0,1.5fr) repeat(3, minmax(0,1fr)); gap:3px; max-width:440px; margin:0 auto; font-size:.8rem; color:var(--ink); }
.fm3-lcd > span{ display:flex; align-items:center; min-height:24px; } .fm3-lcd > div{ border-radius:4px; min-height:24px; display:grid; place-items:center; font-family:var(--mono); font-size:.78rem; border:1px solid var(--line); transition:background .3s; }
.fm3-sw{ display:flex; gap:12px; align-items:center; justify-content:center; margin-top:10px; font-size:.86rem; color:var(--ink); }
.fm3-sw i{ width:52px; height:52px; border-radius:10px; border:1px solid var(--line); display:inline-block; }
.fm3-mat{ display:flex; gap:6px; align-items:center; justify-content:center; font-family:var(--mono); font-size:.82rem; color:var(--ink); flex-wrap:nowrap; }
.fm3-mat table{ border-collapse:collapse; border-left:2px solid var(--ink); border-right:2px solid var(--ink); } .fm3-mat td{ padding:1px 5px; text-align:right; }
.fm3-mat tr.hit td{ background:color-mix(in srgb, var(--k-mm) 20%, var(--paper)); }
.fm3-fld{ display:grid; gap:3px; max-width:360px; margin:0 auto; }
.fm3-fld > div{ display:grid; grid-template-columns:2.2em 1fr; gap:6px; align-items:center; font:.78rem var(--mono); color:var(--graphite); }
.fm3-fld .ln{ height:13px; border-radius:2px; background:var(--paper); border:1px solid var(--line); position:relative; overflow:hidden; }
.fm3-fld .ln i{ position:absolute; top:0; bottom:0; transition:opacity .5s; }
.fm3-draw{ stroke-dasharray:1400; stroke-dashoffset:0; animation:fm3draw 2.2s ease-out; }
@keyframes fm3draw{ from{ stroke-dashoffset:1400; } to{ stroke-dashoffset:0; } }
.fm3-click{ cursor:crosshair; touch-action:manipulation; }
@media (prefers-reduced-motion: reduce){ .fm3-draw{ animation:none; } .fm3-bars .tr i, .fm3-dm div, .fm3-fld .ln i{ transition:none; } }`;
  if (!document.getElementById('fm3-css')) { const s = document.createElement('style'); s.id = 'fm3-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── shared colour maths ── */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const gam = c => 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
  const rgbCss = (r, g, b) => `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  function rgb2lab(r, g, b) {
    const R = lin(r), G = lin(g), B = lin(b);
    const X = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047, Y = 0.2126 * R + 0.7152 * G + 0.0722 * B, Z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
    const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
    const fx = f(X), fy = f(Y), fz = f(Z); return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  function lab2rgb(L, a, b) {
    const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200, fi = t => t > 0.206893 ? t * t * t : (t - 16 / 116) / 7.787;
    const X = 0.95047 * fi(fx), Y = fi(fy), Z = 1.08883 * fi(fz);
    const R = 3.2406 * X - 1.5372 * Y - 0.4986 * Z, G = -0.9689 * X + 1.8758 * Y + 0.0415 * Z, B = 0.0557 * X - 0.2040 * Y + 1.0570 * Z;
    const ok = [R, G, B].every(v => v >= -0.002 && v <= 1.002);
    return [gam(clamp(R, 0, 1)), gam(clamp(G, 0, 1)), gam(clamp(B, 0, 1)), ok];
  }
  function xy2rgb(x, y) {
    const X = x / y, Z = (1 - x - y) / y;
    let R = 3.2406 * X - 1.5372 - 0.4986 * Z, G = -0.9689 * X + 1.8758 + 0.0415 * Z, B = 0.0557 * X - 0.2040 + 1.0570 * Z;
    R = Math.max(0, R); G = Math.max(0, G); B = Math.max(0, B); const m = Math.max(R, G, B) || 1;
    return [gam(R / m), gam(G / m), gam(B / m)];
  }
  // the slides' transforms (slides 28 and 32)
  const YIQ = [[0.299, 0.587, 0.114], [0.596, -0.275, -0.321], [0.212, -0.528, 0.311]];
  const YUV = [[0.299, 0.587, 0.114], [-0.299, -0.587, 0.886], [0.701, -0.587, -0.114]];
  const mul = (M, v) => M.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  function inv3(m) {
    const [a, b, c] = m[0], [d, e, f] = m[1], [g, h, i] = m[2];
    const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g, det = a * A + b * B + c * C;
    return [[A / det, -(b * i - c * h) / det, (b * f - c * e) / det], [B / det, (a * i - c * g) / det, -(a * f - c * d) / det], [C / det, -(a * h - b * g) / det, (a * e - b * d) / det]];
  }
  const fmt = (v, d) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(d == null ? 2 : d);
  const num = v => v.toLocaleString('en-US', { maximumFractionDigits: 2 });
  function pip(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
  // paint an RGBA buffer into a canvas (or return a data URL)
  function paintCanvas(c, w, h, fn) { c.width = w; c.height = h; const ctx = c.getContext('2d'), img = ctx.createImageData(w, h); fn(img.data); ctx.putImageData(img, 0, 0); }
  function dataUrl(w, h, fn) { const c = document.createElement('canvas'); paintCanvas(c, w, h, fn); return c.toDataURL(); }
  function Cv({ w, h, fn, dep, cls, onClick, label }) {
    const ref = useRef(null);
    useEffect(() => { if (ref.current) paintCanvas(ref.current, w, h, fn); }, [dep]);
    return html`<canvas ref=${ref} width=${w} height=${h} className=${'fm3-cv ' + (cls || '')} onClick=${onClick} role="img" aria-label=${label}></canvas>`;
  }
  const svgPt = (e, svg) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };

  /* ── slides 3 to 5, 8, 9: image types and their sizes ── */
  const TYPES = [
    { n: 'Bit-map (B/W)', bpp: 1, grp: [['0 or 1', 1]], div: 1024, slide: '37.5 KB', en: 'each pixel is stored as a single bit (0 or 1). Dithering is often used for displaying monochrome images.', ar: 'كل pixel بيتخزن كـ bit واحد (0 أو 1). والـ dithering بيستخدم كتير عشان نعرض صور monochrome.' },
    { n: 'Grey-scale', bpp: 8, grp: [['0 to 255', 8]], div: 1024, slide: 'over 300 KB', en: 'each pixel is usually stored as a byte (value between 0 to 255). A dark pixel may have a value of 10; a bright one may be 240.', ar: 'كل pixel غالباً بيتخزن كـ byte (قيمة من 0 لـ 255). الـ pixel الغامق ممكن قيمته 10، والفاتح ممكن 240.' },
    { n: '8-bit colour', bpp: 8, grp: [['LUT index', 8]], div: 1000, slide: '307.2 KB (cf. 8-bit greyscale)', en: 'one byte for each pixel; supports 256 out of the millions possible colours; acceptable colour quality; requires Colour Look-Up Tables (LUTs).', ar: 'byte واحد لكل pixel؛ بيدعم 256 لون من الملايين الممكنة؛ جودة ألوان مقبولة؛ ومحتاج Colour Look-Up Tables (LUTs).' },
    { n: '24-bit colour', bpp: 24, grp: [['R', 8], ['G', 8], ['B', 8]], div: 1000, slide: '921.6 KB', en: 'each pixel is represented by three bytes (e.g. RGB); supports 256 × 256 × 256 (16,777,216) possible colours.', ar: 'كل pixel بيتمثل بـ 3 bytes (زي RGB)؛ بيدعم 256 × 256 × 256 (16,777,216) لون ممكن.' },
    { n: '32-bit colour', bpp: 32, grp: [['R', 8], ['G', 8], ['B', 8], ['alpha', 8]], div: null, slide: null, en: 'the extra byte of data for each pixel is used to store an alpha value representing special effect information.', ar: 'الـ byte الزيادة في كل pixel بيتخزن فيه قيمة <b>alpha</b> بتمثل معلومات الـ special effects.' }
  ];
  function ImgSizes({ ar }) {
    const [t, setT] = useState(0), [W, setW] = useState(640), [H, setH] = useState(480);
    const T = TYPES[t], w = Math.max(0, Math.floor(+W || 0)), h = Math.max(0, Math.floor(+H || 0));
    const bits = w * h * T.bpp, bytes = bits / 8, std = w === 640 && h === 480;
    const kbLine = d => html`<div className=${T.div === d ? 'fm3-hi' : 'fm3-mut'}>÷ ${d} = ${num(bytes / d)} KB${T.div === d && std ? ' ← the slide’s ' + T.slide : ''}</div>`;
    const en = `<b>${T.n}</b>: ${T.en} ` + (T.slide ? `The slide: a 640 × 480 image takes <b>${T.slide}</b> (bytes ÷ ${T.div}).` : 'The slide gives no size for 32-bit images; the same formula gives 1,228,800 B at 640 × 480.') + ' Size = width × height × bits per pixel ÷ 8 bytes.';
    const a = `<b>${T.n}</b>: ${T.ar} ` + (T.slide ? `الـ slide: صورة 640 × 480 بتاخد <b>${T.slide}</b> (الـ bytes ÷ ${T.div}).` : 'الـ slide مش مدية حجم للـ 32-bit؛ نفس القانون بيدي 1,228,800 B لـ 640 × 480.') + ' الحجم = العرض × الطول × الـ bits per pixel ÷ 8 bytes.';
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm3-row">${TYPES.map((x, k) => html`<button key=${k} className=${'fm3-chip' + (k === t ? ' on' : '')} onClick=${() => setT(k)}>${x.n}</button>`)}</div>
      <div className="fm3-in"><label>Width <input type="number" min="1" value=${W} onChange=${e => setW(e.target.value)} /></label> × <label>Height <input type="number" min="1" value=${H} onChange=${e => setH(e.target.value)} /></label>
        ${!std && html`<button className="fm3-chip" onClick=${() => { setW(640); setH(480); }}>640 × 480</button>`}</div>
      <div className="fm3-bits" aria-label=${'One pixel: ' + T.bpp + ' bits'}>${T.grp.map(([l, n], k) => html`<div key=${k} className="grp"><div className="cells">${Array.from({ length: n }, (_, j) => html`<i key=${j}></i>`)}</div>${l}</div>`)}</div>
      <p className="fm3-cvl">one pixel = ${T.bpp} bit${T.bpp > 1 ? 's' : ''}</p>
      ${t === 1 && html`<div className="fm3-grey"><span><i style=${{ background: 'rgb(10,10,10)' }}></i>dark: 10</span><span><i style=${{ background: 'rgb(240,240,240)' }}></i>bright: 240</span></div>`}
      <div className="fm3-calc">
        <div>${num(w)} × ${num(h)} × ${T.bpp} bit${T.bpp > 1 ? 's' : ''} = ${num(bits)} bits</div>
        <div>÷ 8 = <span className="fm3-hi">${num(bytes)} bytes</span></div>
        ${kbLine(1024)}${kbLine(1000)}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 10: the colour LUT ── */
  function Lut({ ar }) {
    const steps = [
      { en: 'Store only the <b>index</b> of the colour LUT for each pixel: in the image memory (M × N, x from 0 to M−1, y from 0 to N−1) this pixel holds the <b>memory value 25</b>.', ar: 'بنخزن <b>الـ index</b> بتاع الـ colour LUT بس لكل pixel: في الـ image memory (M × N، الـ x من 0 لـ M−1 والـ y من 0 لـ N−1) الـ pixel ده شايل <b>memory value = 25</b>.' },
      { en: 'Look up the table to find the colour (RGB) for the index: go to <b>row 25</b> of the LUT (rows 0 to 255, columns R, G, B).', ar: 'ندوّر في الـ table على اللون (RGB) بتاع الـ index: نروح لـ <b>row 25</b> في الـ LUT (الـ rows من 0 لـ 255، والـ columns هي R وG وB).' },
      { en: 'Row 25 holds <b>00011110 10111110 00111100</b>: one byte each for R, G and B.', ar: 'الـ row 25 فيه <b>00011110 10111110 00111100</b>: byte لكل واحد من R وG وB.' },
      { en: 'The displayed pixel gets the <b>pixel value R = 30, G = 190, B = 60</b>.', ar: 'الـ pixel اللي بيتعرض بياخد <b>pixel value: R = 30، G = 190، B = 60</b>.' },
      { en: '<b>Try:</b> palette animation is possible by changing the colour map. Tap any bit of row 25: the image memory still holds 25, but the displayed colour changes.', ar: '<b>جرّب:</b> الـ palette animation ممكنة لما نغيّر الـ colour map. دوس على أي bit في الـ row 25: الـ image memory لسه فيها 25، بس اللون اللي بيتعرض بيتغير.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [rgb, setRgb] = useState([30, 190, 60]);
    const flip = (c, b) => setRgb(v => v.map((x, k) => k === c ? x ^ (1 << (7 - b)) : x));
    const bin = x => x.toString(2).padStart(8, '0');
    const cell = (k, show) => html`<i key=${k} className=${k === 9 ? 'px' : ''} style=${k === 9 && show ? { background: rgbCss(...rgb) } : null}></i>`;
    const grid = show => html`<div className="fm3-ax"><span>0</span><span>→ x</span><span>M−1</span></div><div className="fm3-mem">${Array.from({ length: 48 }, (_, k) => cell(k, show))}</div><div className="fm3-ax"><span>y ↓</span><span>N−1</span></div>`;
    const changed = rgb[0] !== 30 || rgb[1] !== 190 || rgb[2] !== 60;
    return html`<figure className="fig"><div className="fig-stage"><div className="fm3-lut">
      <div className=${'fm3-pan' + (i === 0 ? ' on' : '')}><span className="ttl">Image memory</span>${grid(false)}<span className="fm3-box">Memory value 25</span></div>
      <div className="fm3-arr" style=${{ opacity: i >= 1 ? 1 : .25 }}><span className="h">→</span><span className="v">↓</span></div>
      <div className=${'fm3-pan' + (i === 1 || i === 2 || i === 4 ? ' on' : '') + (i < 1 ? ' dim' : '')}><span className="ttl">Colour LUT</span>
        <table className="fm3-tab"><thead><tr><th></th><th>R</th><th>G</th><th>B</th></tr></thead><tbody>
          <tr><td>0</td><td></td><td></td><td></td></tr><tr><td>⋮</td><td></td><td></td><td></td></tr>
          <tr className=${i >= 1 ? 'hit' : ''}><td>25</td>${rgb.map((v, c) => html`<td key=${c}>${i >= 2 ? bin(v).split('').map((d, b) => html`<span key=${b} className="fm3-bit" onClick=${() => flip(c, b)} title="flip this bit">${d}</span>`) : ''}</td>`)}</tr>
          <tr><td>⋮</td><td></td><td></td><td></td></tr><tr><td>255</td><td></td><td></td><td></td></tr></tbody></table></div>
      <div className="fm3-arr" style=${{ opacity: i >= 3 ? 1 : .25 }}><span className="h">→</span><span className="v">↓</span></div>
      <div className=${'fm3-pan' + (i === 3 || i === 4 ? ' on' : '') + (i < 3 ? ' dim' : '')}><span className="ttl">Displayed image</span>${grid(i >= 3)}<span className="fm3-box">Pixel value<br />R = ${rgb[0]}<br />G = ${rgb[1]}<br />B = ${rgb[2]}</span></div>
      </div>${changed && html`<div className="fm3-row" style=${{ marginTop: '10px' }}><button className="fm3-chip" onClick=${() => setRgb([30, 190, 60])}>Reset row 25 to 30, 190, 60</button></div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 6 and 7: dithering one pixel ── */
  const DM = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const remap = v => Math.floor(v * 17 / 256);
  function Dither({ ar }) {
    const [v, setV] = useState(200), q = v * 17 / 256, r = remap(v);
    const en = `Pixel value <b>${v}</b> → ${v} ÷ (256/17) = ${q.toFixed(2)} → rounding down: <b>${r}</b> (new range 0 to 16). Put a dot (set to 1) where ${r} &gt; the dither matrix entry, otherwise 0: <b>${r} of 16</b> dots. A 4 × 4 array of dots approximates from 0 (no dots) to 16 (full dots).`;
    const a = `الـ pixel value <b>${v}</b> → ${v} ÷ (256/17) = ${q.toFixed(2)} → بنقرّب لتحت: <b>${r}</b> (الـ range الجديد 0 لـ 16). بنحط نقطة (1) في المكان لو ${r} &gt; الـ entry بتاع الـ dither matrix، غير كده 0: <b>${r} من 16</b> نقطة. الـ 4 × 4 array من النقط بتقرّب من 0 (مفيش نقط) لـ 16 (كل النقط).`;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm3-row">${[0, 10, 200, 240, 255].map(x => html`<button key=${x} className=${'fm3-chip' + (x === v ? ' on' : '')} onClick=${() => setV(x)}>${x}</button>`)}</div>
      <div className="fm3-sl"><span>Pixel value</span><input type="range" min="0" max="255" value=${v} onChange=${e => setV(+e.target.value)} aria-label="Pixel value" /><output>${v}</output></div>
      <div className="fm3-dith" style=${{ marginTop: '10px' }}>
        <div><div className="fm3-pix" style=${{ background: rgbCss(v, v, v) }}></div><div className="lbl">original pixel</div></div>
        <div><div className="fm3-dm">${DM.flat().map((d, k) => html`<div key=${k} className=${r > d ? 'd1' : 'd0'}>${d}</div>`)}</div><div className="lbl">dither matrix: dot where ${r} > entry</div></div>
        <div><div className="fm3-mini">${DM.flat().map((d, k) => html`<i key=${k} style=${{ background: r > d ? '#fff' : '#111' }}></i>`)}</div><div className="lbl">the 4 × 4 dots, small</div></div>
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 7: simple dither (16 times larger) vs ordered dither (same size) ── */
  const RW = 64, RH = 16, ramp = x => Math.round(x / (RW - 1) * 255);
  function Ordered({ ar }) {
    const steps = [
      { en: 'A greyscale image (here a grey ramp from 0 to 255, standing in for the slide’s photo): <b>64 × 16 pixels</b>.', ar: 'صورة greyscale (هنا تدرّج رمادي من 0 لـ 255، بدل صورة الـ slide): <b>64 × 16 pixel</b>.' },
      { en: '<b>Simple dithering</b>: replace each pixel by a 4 × 4 array of dots. Since each pixel is replaced by 4 × 4 dots, the image becomes <b>16 times as large</b>: 256 × 64.', ar: 'الـ <b>Simple dithering</b>: بنبدّل كل pixel بـ 4 × 4 نقط. وبما إن كل pixel بقى 4 × 4، الصورة بتكبر <b>16 مرة</b>: 256 × 64.' },
      { en: 'To keep the image size, an <b>ordered dither</b> produces an output pixel with value 1 <b>iff</b> the remapped intensity level <b>just at the pixel position</b> is greater than the corresponding matrix entry: still 64 × 16.', ar: 'عشان نحافظ على حجم الصورة، الـ <b>ordered dither</b> بيطلع output pixel قيمته 1 <b>لو وبس لو</b> الـ intensity بعد الـ remap <b>عند مكان الـ pixel نفسه</b> أكبر من الـ entry المقابل في الـ matrix: لسه 64 × 16.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const src = d => { for (let y = 0; y < RH; y++) for (let x = 0; x < RW; x++) { const o = 4 * (y * RW + x), g = ramp(x); d[o] = d[o + 1] = d[o + 2] = g; d[o + 3] = 255; } };
    const simple = d => { const w = RW * 4; for (let y = 0; y < RH * 4; y++) for (let x = 0; x < w; x++) { const o = 4 * (y * w + x), on = remap(ramp(x >> 2)) > DM[y & 3][x & 3]; d[o] = d[o + 1] = d[o + 2] = on ? 255 : 0; d[o + 3] = 255; } };
    const ord = d => { for (let y = 0; y < RH; y++) for (let x = 0; x < RW; x++) { const o = 4 * (y * RW + x), on = remap(ramp(x)) > DM[y & 3][x & 3]; d[o] = d[o + 1] = d[o + 2] = on ? 255 : 0; d[o + 3] = 255; } };
    return html`<figure className="fig"><div className="fig-stage"><div className="fm3-imgs">
      <${Cv} w=${RW} h=${RH} fn=${src} dep=${0} label="Grey ramp, 64 by 16 pixels" /><p className="fm3-cvl">Original: 64 × 16 pixels</p>
      <div className=${pop(i >= 1)}><${Cv} w=${RW * 4} h=${RH * 4} fn=${simple} dep=${0} label="Simple dither, 256 by 64 dots" /><p className="fm3-cvl">Simple dither: 256 × 64 dots (16 times as large)</p></div>
      <div className=${pop(i >= 2)}><${Cv} w=${RW} h=${RH} fn=${ord} dep=${0} label="Ordered dither, 64 by 16 pixels" /><p className="fm3-cvl">Ordered dither: 64 × 16 pixels (same size)</p></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 17: light and spectra ── */
  const SPEC = [[400, .55], [415, .6], [430, .63], [445, .66], [460, .7], [470, .72], [480, .7], [495, .68], [510, .67], [525, .63], [540, .58], [555, .62], [570, .68], [580, .69], [595, .64], [610, .56], [625, .48], [640, .4], [655, .3], [668, .18], [678, .12], [690, .11], [700, .11]];
  const BAND = [[400, '#7a00c8'], [430, '#3b00ff'], [460, '#0050ff'], [485, '#00b4ff'], [500, '#00ffb0'], [520, '#20ff00'], [560, '#c8ff00'], [580, '#ffee00'], [600, '#ff9000'], [630, '#ff3000'], [670, '#e00000'], [700, '#900000']];
  function Spectrum({ ar }) {
    const steps = [
      { en: 'Visible light is an <b>electromagnetic wave</b> in the <b>400 nm to 700 nm</b> range.', ar: 'الضوء المرئي هو <b>electromagnetic wave</b> في الـ range من <b>400 nm لـ 700 nm</b>.' },
      { en: 'Most light we see is not one wavelength, it’s a <b>combination of many wavelengths</b> (cf. a Rainbow): the graph plots Amplitude E(λ) against Wavelength (λ).', ar: 'أغلب الضوء اللي بنشوفه مش wavelength واحدة، ده <b>خليط من wavelengths كتير</b> (زي قوس قزح): الـ graph بيرسم الـ Amplitude E(λ) قصاد الـ Wavelength (λ).' },
      { en: 'The profile above is called a <b>spectra</b>.', ar: 'الشكل ده اسمه <b>spectra</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const X = l => 60 + (l - 400) * 1.2, Y = a => 200 - a * 200;
    const d = SPEC.map(([l, a], k) => (k ? 'L' : 'M') + X(l).toFixed(1) + ' ' + Y(a).toFixed(1)).join(' ');
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 262" role="img" aria-label="Spectrum: amplitude E of lambda against wavelength from 400 to 700 nanometres">
        <defs><linearGradient id="fm3-band" x1="0" x2="1">${BAND.map(([l, c]) => html`<stop key=${l} offset=${(l - 400) / 300} stopColor=${c} />`)}</linearGradient>
          <marker id="fm3-sp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker></defs>
        <path d="M60 205 V22" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#fm3-sp-a)" /><path d="M56 200 H424" stroke="var(--ink)" strokeWidth="1.6" />
        <text x="22" y="112" fontSize="19" textAnchor="middle" transform="rotate(-90 22 112)">Amplitude E(λ)</text>
        <rect x="60" y="208" width="360" height="12" fill="url(#fm3-band)" className=${pop(i >= 0)} />
        <text x="60" y="244" fontSize="19" textAnchor="middle">400 nm</text><text x="240" y="244" fontSize="19" textAnchor="middle">Wavelength (λ)</text><text x="408" y="244" fontSize="19" textAnchor="middle">700 nm</text>
        ${i >= 1 && html`<path key=${'c' + i} d=${d} fill="none" stroke="var(--k-mm)" strokeWidth="3" strokeLinejoin="round" className=${i === 1 && !calm() ? 'fm3-draw' : ''} />`}
        <text x="300" y="40" fontSize="20" fontWeight="700" className=${pop(i >= 2)} style=${{ fill: 'var(--k-mm)' }}>spectra</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 18 (and 19): the human eye ── */
  function Eye({ ar }) {
    const steps = [
      { en: 'Basic eye anatomy: the eye is basically similar to a <b>camera</b>.', ar: 'تشريح العين الأساسي: العين شبه الـ <b>camera</b> في الأساس.' },
      { en: 'It has a <b>lens</b> to focus light onto the <b>Retina</b> of the eye.', ar: 'فيها <b>lens</b> بتركّز الضوء على الـ <b>Retina</b> بتاعة العين.' },
      { en: 'The retina is full of <b>neurons</b>.', ar: 'الـ retina مليانة <b>neurons</b>.' },
      { en: 'Each neuron is either a <b>rod</b> or a <b>cone</b>. Rods are <b>not sensitive to colour</b>.', ar: 'كل neuron يا إما <b>rod</b> يا إما <b>cone</b>. الـ Rods <b>مش حساسة للألوان</b>.' },
      { en: 'Cones come in <b>3 types</b>: red, green and blue (slide 19).', ar: 'الـ Cones ليها <b>3 أنواع</b>: red وgreen وblue (slide 19).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const cx = 220, cy = 150;
    const L = (x, y, x2, y2, t, anchor) => html`<g><path d=${`M${x2} ${y2} L${x} ${y}`} stroke="var(--graphite)" strokeWidth="1" /><text x=${x} y=${y + (y < y2 ? -4 : 14)} fontSize="19" textAnchor=${anchor || 'middle'}>${t}</text></g>`;
    const N = [['r', 0], ['c', 0], ['r', 0], ['r', 0], ['c', 1], ['r', 0], ['c', 2], ['r', 0], ['r', 0], ['c', 0], ['r', 0], ['c', 1]];
    const CC = ['#dc2626', '#16a34a', '#2563eb'];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 300" role="img" aria-label="Eye anatomy: sclera, choroid, retina, cornea, iris, lens, ciliary body, optic nerve; light focused onto the retina">
        <defs><marker id="fm3-eye-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#f59e0b" /></marker></defs>
        <rect x="320" y=${cy - 4} width="80" height="26" rx="6" fill="color-mix(in srgb, #f59e0b 30%, var(--paper))" stroke="var(--graphite)" />
        <circle cx=${cx} cy=${cy} r="105" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="5" />
        <circle cx=${cx} cy=${cy} r="98" fill="none" stroke="#a16207" strokeWidth="4" />
        <path d=${`M${cx + 92 * Math.cos(-1.9)} ${cy + 92 * Math.sin(-1.9)} A92 92 0 1 1 ${cx + 92 * Math.cos(1.9)} ${cy + 92 * Math.sin(1.9)}`} transform=${`rotate(0)`} fill="none" stroke="#e11d48" strokeWidth=${i >= 2 ? 6 : 4} className="fade" />
        <path d=${`M${cx - 92} ${cy - 50} Q${cx - 140} ${cy} ${cx - 92} ${cy + 50}`} fill="color-mix(in srgb, #60a5fa 25%, var(--paper))" stroke="#60a5fa" strokeWidth="3" />
        <path d=${`M${cx - 86} ${cy - 46} V${cy - 20} M${cx - 86} ${cy + 20} V${cy + 46}`} stroke="#7c3aed" strokeWidth="6" />
        <ellipse cx=${cx - 66} cy=${cy} rx="13" ry="34" fill="color-mix(in srgb, #60a5fa 35%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.5" />
        <circle cx=${cx - 66} cy=${cy - 42} r="7" fill="#be185d" opacity=".7" /><circle cx=${cx - 66} cy=${cy + 42} r="7" fill="#be185d" opacity=".7" />
        <g className=${pop(i >= 1)} stroke="#f59e0b" strokeWidth="2.5" fill="none">
          <path d=${`M14 ${cy - 26} H${cx - 66} L${cx + 92} ${cy}`} markerEnd="url(#fm3-eye-a)" className=${i === 1 && !calm() ? 'flow' : ''} />
          <path d=${`M14 ${cy + 26} H${cx - 66} L${cx + 92} ${cy}`} markerEnd="url(#fm3-eye-a)" className=${i === 1 && !calm() ? 'flow' : ''} />
        </g>
        <text x="16" y=${cy - 34} fontSize="19" className=${pop(i >= 1)}>Light</text>
        ${L(200, 22, 212, 46, 'Sclera')}${L(330, 30, 288, 76, 'Choroid')}${L(390, 98, 306, 118, 'Retina')}
        ${L(70, 70, 102, 116, 'Cornea')}${L(52, 232, cx - 86, cy + 36, 'Iris')}${L(130, 278, cx - 66, cy + 30, 'Lens')}
        ${L(250, 276, cx - 60, cy + 48, 'Ciliary Body')}${L(380, 214, 372, cy + 20, 'Optic Nerve')}
      </svg>
      <svg viewBox="0 0 440 112" className=${pop(i >= 2)} role="img" aria-label="Retina neurons: rods and cones">
        <rect x="10" y="88" width="420" height="10" rx="3" fill="#e11d48" opacity=".35" />
        ${N.map(([t, c], k) => { const x = 28 + k * 34, col = i >= 4 && t === 'c' ? CC[c] : i >= 3 && t === 'r' ? '#9ca3af' : 'var(--graphite)';
          return t === 'r' ? html`<rect key=${k} x=${x - 5} y="22" width="10" height="66" rx="5" fill=${col} className="fade" />` : html`<path key=${k} d=${`M${x - 9} 88 L${x - 6} 50 Q${x} 36 ${x + 6} 50 L${x + 9} 88 Z`} fill=${col} className="fade" />`; })}
        <g className=${pop(i >= 3)}><text x="28" y="16" fontSize="19" textAnchor="middle">rod</text><text x="62" y="30" fontSize="19" textAnchor="middle">cone</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 19: spectral-response functions of the cones ── */
  const CONES = [['Blue', '#2563eb', 445, 20, .022], ['Green', '#16a34a', 545, 40, .2], ['Red', '#dc2626', 575, 45, .188]];
  const resp = (c, l) => c[4] * Math.exp(-((l - c[2]) ** 2) / (2 * c[3] * c[3]));
  function Cones({ ar }) {
    const [l, setL] = useState(545), [run, setRun] = useState(false);
    useEffect(() => { if (!run) return; const id = setInterval(() => setL(x => { if (x >= 700) { setRun(false); return 700; } return x + 3; }), 40); return () => clearInterval(id); }, [run]);
    const X = w => 60 + (w - 400) * 1.2, Y = f => 225 - f * 900;
    const path = c => { let d = ''; for (let w = 400; w <= 700; w += 4) d += (w === 400 ? 'M' : 'L') + X(w).toFixed(1) + ' ' + Y(resp(c, w)).toFixed(1); return d; };
    return html`<figure className="fig"><div className="fig-stage">
      <p className="fm3-cvl" style=${{ margin: '0 0 4px' }}>Fraction of light absorbed by each type of cone</p>
      <svg viewBox="0 0 440 262" role="img" aria-label="Spectral-response curves of the blue, green and red cones from 400 to 700 nanometres">
        <path d="M60 225 V30 M60 225 H424" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        ${[.1, .2].map(f => html`<g key=${f}><path d=${`M55 ${Y(f)} H60`} stroke="var(--ink)" /><text x="50" y=${Y(f) + 5} fontSize="19" textAnchor="end">${f}</text></g>`)}
        ${[400, 500, 600, 700].map(w => html`<g key=${w}><path d=${`M${X(w)} 225 v5`} stroke="var(--ink)" /><text x=${X(w)} y="248" fontSize="19" textAnchor=${w === 700 ? 'end' : w === 400 ? 'start' : 'middle'} dx=${w === 700 ? 6 : w === 400 ? -6 : 0}>${w}nm</text></g>`)}
        ${CONES.map(c => html`<path key=${c[0]} d=${path(c)} fill="none" stroke=${c[1]} strokeWidth="2.5" />`)}
        <text x=${X(440)} y=${Y(.022) - 8} fontSize="19" textAnchor="middle" style=${{ fill: '#2563eb' }}>Blue</text>
        <text x=${X(530)} y=${Y(.2) - 6} fontSize="19" textAnchor="end" style=${{ fill: '#16a34a' }}>Green</text>
        <text x=${X(590)} y=${Y(.188) - 6} fontSize="19" textAnchor="start" style=${{ fill: '#dc2626' }}>Red</text>
        <path d=${`M${X(l)} 30 V225`} stroke="var(--k-mm)" strokeWidth="2" strokeDasharray="5 4" />
      </svg>
      <div className="fm3-sl"><span>Wavelength</span><input type="range" min="400" max="700" value=${l} onChange=${e => { setRun(false); setL(+e.target.value); }} aria-label="Wavelength in nanometres" /><output>${l} nm</output></div>
      <div className="fm3-bars">${CONES.map(c => html`<div key=${c[0]}><span>${c[0]} cones</span><div className="tr"><i style=${{ width: (resp(c, l) / .2 * 100) + '%', background: c[1] }}></i></div></div>`)}</div></div>
      <${Cap} en="Cones come in <b>3 types</b>: red, green and blue. Each responds differently to various frequencies of light: the figure shows the <b>spectral-response functions</b> of the cones (Luminous-efficiency Function of the Human Eye’s Cones). Move the wavelength and compare the bars." ar="الـ Cones ليها <b>3 أنواع</b>: red وgreen وblue. كل نوع بيستجيب بشكل مختلف للـ frequencies المختلفة للضوء: الـ figure بتوري الـ <b>spectral-response functions</b> بتاعة الـ cones (Luminous-efficiency Function of the Human Eye’s Cones). حرّك الـ wavelength وقارن الـ bars." showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${() => { setL(400); setRun(!calm()); if (calm()) setL(545); }}>▶ Sweep 400 to 700 nm</button></div></figure>`;
  }

  /* ── slides 20, 21, 26, 27, 30: an image split into R G B / L A B / Y I Q intensities ── */
  const HS = 120, HR = 56, E1 = [2 / Math.sqrt(6), -1 / Math.sqrt(6), -1 / Math.sqrt(6)], E2 = [0, 1 / Math.sqrt(2), -1 / Math.sqrt(2)];
  function hexRGB(px, py) { // the RGB colour cube seen corner-on (slide 27)
    const s = Math.sqrt(6) / 3 / HR, u = (px - HS / 2) * s, v = -(py - HS / 2) * s;
    const p = [0, 1, 2].map(k => u * E1[k] + v * E2[k]), t = 1 - Math.max(...p), c = p.map(x => x + t);
    return Math.min(...c) < -1e-6 ? null : c.map(x => Math.round(clamp(x, 0, 1) * 255));
  }
  let HEX = null;
  const hexData = () => { if (HEX) return HEX; HEX = []; for (let y = 0; y < HS; y++) for (let x = 0; x < HS; x++) HEX.push(hexRGB(x + .5, y + .5)); return HEX; };
  const CH = {
    RGB: { names: ['R', 'G', 'B'], f: ([r, g, b]) => [[r, r, r], [g, g, g], [b, b, b]] },
    Lab: { names: ['L', 'A', 'B'], f: ([r, g, b]) => { const [L, A, B] = rgb2lab(r, g, b), l = L / 100 * 255; return [[l, l, l], lab2rgb(65, A, 0), lab2rgb(65, 0, B)]; } },
    YIQ: { names: ['Y', 'I', 'Q'], f: ([r, g, b]) => mul(YIQ, [r, g, b]).map(x => { const c = clamp(x, 0, 255); return [c, c, c]; }) }
  };
  function Channels({ ar }) {
    const [m, setM] = useState('RGB'), [pk, setPk] = useState(null);
    const D = hexData(), M = CH[m];
    const paint = k => d => D.forEach((c, j) => { const o = 4 * j; if (!c) { d[o + 3] = 0; return; } const v = k < 0 ? c : M.f(c)[k]; d[o] = v[0]; d[o + 1] = v[1]; d[o + 2] = v[2]; d[o + 3] = 255; });
    const tap = e => { const r = e.currentTarget.getBoundingClientRect(), x = Math.floor((e.clientX - r.left) / r.width * HS), y = Math.floor((e.clientY - r.top) / r.height * HS); const c = D[clamp(y, 0, HS - 1) * HS + clamp(x, 0, HS - 1)]; if (c) setPk(c); };
    let read = 'Tap the image to read a pixel’s (R, G, B) triplet.';
    if (pk) { const [r, g, b] = pk; read = `(R, G, B) = (${r}, ${g}, ${b})`;
      if (m === 'YIQ') { const [Y, I, Q] = mul(YIQ, pk); read += ` → Y = ${fmt(Y, 1)}, I = ${fmt(I, 1)}, Q = ${fmt(Q, 1)}`; }
      if (m === 'Lab') { const [L, A, B] = rgb2lab(r, g, b); read += ` → L = ${fmt(L, 1)}, a = ${fmt(A, 1)}, b = ${fmt(B, 1)}`; } }
    const caps = {
      RGB: ['A true colour image is a 2-D array of (R,G,B) integer triplets. The image here is the RGB colour cube seen corner-on (slide 27). The <b>RGB colour space</b> is made up of Red, Green and Blue intensity components: the three grey images are the <b>Red, Green, Blue (RGB) respective intensities</b> (slide 21).', 'الـ true colour image هي 2-D array من integer triplets (R,G,B). الصورة هنا هي الـ RGB colour cube متشافة من الركن (slide 27). الـ <b>RGB colour space</b> مكوّنة من intensity components للأحمر والأخضر والأزرق: الـ 3 صور الرمادي هما <b>الـ Red وGreen وBlue respective intensities</b> (slide 21).'],
      Lab: ['<b>Lab image space</b> (slide 26): the original colour image and its <b>L, A, B image intensities</b>. L (luminance) looks like the grey-scale image; A (green to red) and B (blue to yellow) are shown in false colour, as on the slide.', 'الـ <b>Lab image space</b> (slide 26): الصورة الأصلية والـ <b>L وA وB image intensities</b>. الـ L (luminance) شبه الصورة الـ grey-scale؛ والـ A (من green لـ red) والـ B (من blue لـ yellow) معروضين بـ false colour زي الـ slide.'],
      YIQ: ['<b>YIQ colour space</b> (slide 30): the original colour image and its <b>Y, I, Q image intensities</b>, worked out with the slide’s YIQ transform. Y is the black-and-white (luminance) image; I and Q are small and can be negative, so as intensities they look dark, as on the slide.', 'الـ <b>YIQ colour space</b> (slide 30): الصورة الأصلية والـ <b>Y وI وQ image intensities</b>، محسوبين بالـ YIQ transform بتاع الـ slide. الـ Y هي الصورة الأبيض وأسود (luminance)؛ والـ I والـ Q قيمهم صغيرة وممكن تبقى سالبة، فبيبانوا غامقين زي الـ slide.']
    };
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm3-row">${Object.keys(CH).map(k => html`<button key=${k} className=${'fm3-chip' + (k === m ? ' on' : '')} onClick=${() => setM(k)}>${k === 'Lab' ? 'L, A, B' : k.split('').join(', ')}</button>`)}</div>
      <div className="fm3-quad">
        <div><${Cv} w=${HS} h=${HS} fn=${paint(-1)} dep=${'o'} cls="fm3-click" onClick=${tap} label="RGB colour cube seen corner-on as a hexagon" /><div className="cap">Original colour image</div></div>
        ${[0, 1, 2].map(k => html`<div key=${m + k}><${Cv} w=${HS} h=${HS} fn=${paint(k)} dep=${m + k} label=${M.names[k] + ' intensity image'} /><div className="cap">${M.names[k]}</div></div>`)}
      </div>
      <p className="fm3-read">${read}</p></div>
      <${Cap} en=${caps[m][0]} ar=${caps[m][1]} showAr=${ar} /></figure>`;
  }

  /* ── slide 22: colour displays (CRT and TFT LCD) and the gamut ── */
  function Displays({ ar }) {
    const [mode, setMode] = useState('CRT'), [v, setV] = useState([255, 190, 0]);
    const set = (k, x) => setV(o => o.map((y, j) => j === k ? x : y));
    const PC = ['#ff0000', '#00ff00', '#0000ff'], N = ['R', 'G', 'B'];
    const lit = k => `color-mix(in srgb, ${PC[k]} ${Math.round(v[k] / 2.55)}%, #222)`;
    const any = v.some(x => x > 0);
    const crt = html`<svg viewBox="0 0 440 236" role="img" aria-label="CRT: electron gun, electron beam, deflectors, phosphors R G B">
      <path d="M40 100 H110 L140 92 L320 30 Q350 118 320 206 L140 144 L110 136 H40 Z" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" />
      <rect x="40" y="104" width="64" height="28" rx="4" fill="var(--graphite)" />
      <rect x="150" y="88" width="34" height="7" fill="var(--ink)" /><rect x="150" y="141" width="34" height="7" fill="var(--ink)" />
      ${[0, 1, 2].map(k => html`<path key=${k} d=${`M104 ${112 + k * 6} L330 ${108 + k * 12}`} stroke=${v[k] > 0 ? PC[k] : 'var(--line)'} strokeWidth="2" className=${v[k] > 0 && !calm() ? 'flow' : ''} />`)}
      <text x="20" y="90" fontSize="19">electron gun</text><text x="190" y="62" fontSize="19">electron beam</text><text x="140" y="178" fontSize="19">deflectors</text><text x="306" y="20" fontSize="19">phosphors</text>
      ${[[398, 92], [380, 126], [416, 126]].map(([x, y], k) => html`<g key=${k}><circle cx=${x} cy=${y} r="15" fill=${lit(k)} stroke="var(--graphite)" /><text x=${x} y=${y + 5} fontSize="19" textAnchor="middle" fontWeight="700" style=${{ fill: '#fff' }}>${N[k]}</text></g>`)}
      <text x="398" y="168" fontSize="19" textAnchor="middle">mix</text><rect x="374" y="176" width="48" height="40" rx="8" fill=${rgbCss(...v)} stroke="var(--graphite)" />
    </svg>`;
    const lay = ['Polarizer', 'Color filter', 'Color filter glass', 'Liquid crystal (voltage)', 'TFT glass', 'Polarizer', 'Backlight'];
    const lcd = html`<div className="fm3-lcd" role="img" aria-label="TFT LCD layers from top: polarizer, colour filter, colour filter glass, liquid crystal, TFT glass, polarizer, backlight">
      ${lay.map((t, r) => html`<${React.Fragment} key=${r}><span>${t}</span>${[0, 1, 2].map(k => {
        let bg = 'var(--paper)', txt = '';
        if (r === 1) bg = lit(k); if (r === 3) { bg = `color-mix(in srgb, #fff ${Math.round(v[k] / 2.55 * .8)}%, #333)`; } if (r === 4) txt = N[k] + (v[k] > 0 ? ' on' : ' off'); if (r === 6) { bg = '#fef9c3'; txt = '↑ light'; }
        return html`<div key=${k} style=${{ background: bg, color: r === 6 ? '#111' : 'var(--ink)' }}>${txt}</div>`; })}<//>`)}
      <span>Displayed pixel</span><div style=${{ gridColumn: 'span 3', background: rgbCss(...v), minHeight: '34px' }}></div></div>`;
    const en = (mode === 'CRT' ? '(Old) <b>CRT</b> displays have three phosphors (RGB) which produce a <b>mix of colours</b> when excited with electrons.' : '(Newer) colour <b>LCD</b> panels (typically thin-film-transistor liquid-crystal displays, <b>TFT LCD</b>): a transistor switch for each (R, G or B) pixel.') + ' Set the three primaries. The <b>gamut</b> is all colours that can be reproduced using the three primaries; the gamut of a colour monitor is smaller than that of colour models such as CIE (LAB).';
    const a = (mode === 'CRT' ? 'شاشات الـ <b>CRT</b> (القديمة) فيها 3 phosphors (RGB) بيطلّعوا <b>خليط من الألوان</b> لما الـ electrons تثيرهم.' : 'شاشات الـ <b>LCD</b> الملونة (الأحدث، غالباً thin-film-transistor liquid-crystal displays، <b>TFT LCD</b>): transistor switch لكل pixel (R أو G أو B).') + ' ظبط الـ 3 primaries. الـ <b>gamut</b> هو كل الألوان اللي ممكن نطلّعها بالـ 3 primaries؛ والـ gamut بتاع الشاشة أصغر من بتاع colour models زي الـ CIE (LAB).';
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm3-row">${['CRT', 'TFT LCD'].map(k => html`<button key=${k} className=${'fm3-chip' + (k === mode ? ' on' : '')} onClick=${() => setMode(k)}>${k}</button>`)}</div>
      ${mode === 'CRT' ? crt : lcd}
      <div style=${{ marginTop: '10px' }}>${[0, 1, 2].map(k => html`<div key=${k} className="fm3-sl"><span>${mode === 'CRT' ? 'Beam ' : 'Switch '}${N[k]}</span><input type="range" min="0" max="255" value=${v[k]} onChange=${e => set(k, +e.target.value)} aria-label=${N[k] + ' intensity'} /><output>${v[k]}</output></div>`)}</div>
      ${!any && html`<p className="fm3-cvl">All three off: nothing is lit.</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── CIE 1931 spectral locus (x, y) at the slide's labelled wavelengths and between ── */
  const LOCUS = [[400, .1733, .0048], [420, .1714, .0051], [440, .1644, .0109], [450, .1566, .0177], [460, .1440, .0297], [470, .1241, .0578], [475, .1096, .0868], [480, .0913, .1327], [485, .0687, .2007], [490, .0454, .2950], [495, .0235, .4127], [500, .0082, .5384], [505, .0039, .6548], [510, .0139, .7502], [515, .0389, .8120], [520, .0743, .8338], [525, .1142, .8262], [530, .1547, .8059], [540, .2296, .7543], [550, .3016, .6923], [560, .3731, .6245], [570, .4441, .5547], [580, .5125, .4866], [590, .5752, .4242], [600, .6270, .3725], [610, .6658, .3340], [620, .6915, .3083], [640, .7190, .2809], [660, .7300, .2700], [700, .7347, .2653]];
  const POLY = LOCUS.map(p => [p[1], p[2]]);

  /* ── slide 23: the CIE XYZ primaries, the horseshoe cone and the plane X+Y+Z=1 ── */
  function CieCone({ ar }) {
    const steps = [
      { en: 'Human focussed colour models: in 1931, the CIE defined three standard primaries <b>(X, Y, Z)</b>.', ar: 'Colour models مبنية على الإنسان: في 1931 الـ CIE عرّفت 3 standard primaries <b>(X, Y, Z)</b>.' },
      { en: 'The <b>Y</b> primary was intentionally chosen to be identical to the <b>luminous-efficiency</b> function of human eyes (<b>Perceptual Model</b>).', ar: 'الـ primary <b>Y</b> اتختار عن قصد يبقى زي الـ <b>luminous-efficiency</b> function بتاعة عين الإنسان بالظبط (<b>Perceptual Model</b>).' },
      { en: 'All visible colours are in a <b>horseshoe shaped cone</b> in the X-Y-Z space.', ar: 'كل الألوان المرئية موجودة جوه <b>cone على شكل حدوة حصان</b> في الـ X-Y-Z space.' },
      { en: 'Consider the plane <b>X+Y+Z=1</b>: it cuts the cone in a horseshoe.', ar: 'خد الـ plane <b>X+Y+Z=1</b>: بيقطع الـ cone في شكل حدوة.' },
      { en: 'Project it onto the X-Y plane and we get the <b>CIE chromaticity diagram</b> (next figure).', ar: 'نعمله projection على الـ X-Y plane فنطلع بالـ <b>CIE chromaticity diagram</b> (الـ figure اللي بعدها).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const O = [170, 210], ax = [190, 30], ay = [0, -145], az = [-100, 90];
    const P = (X, Y, Z) => [O[0] + X * ax[0] + Y * ay[0] + Z * az[0], O[1] + X * ax[1] + Y * ay[1] + Z * az[1]];
    const curve = (k, flat) => LOCUS.map(([, x, y], j) => { const p = flat ? P(x * k, y * k, 0) : P(x * k, y * k, (1 - x - y) * k); return (j ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ') + ' Z';
    const axis = (v, t, on) => { const e = [O[0] + v[0] * 1.25, O[1] + v[1] * 1.25]; return html`<g><path d=${`M${O[0]} ${O[1]} L${e[0]} ${e[1]}`} stroke=${on ? 'var(--k-mm)' : 'var(--ink)'} strokeWidth=${on ? 3 : 1.6} markerEnd="url(#fm3-cie-a)" /><text x=${e[0] + (t === 'Z' ? -14 : t === 'X' ? 6 : -22)} y=${e[1] + (t === 'Y' ? 14 : 4)} fontSize="20" fontWeight="700">${t}</text></g>`; };
    const spokes = [0, 4, 8, 11, 13, 16, 19, 22, 25, 29];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 345" role="img" aria-label="X, Y, Z axes with the horseshoe-shaped cone of visible colours and the plane X+Y+Z=1">
        <defs><marker id="fm3-cie-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker></defs>
        <g className=${pop(i >= 3)}><path d=${'M' + P(1, 0, 0).join(' ') + ' L' + P(0, 1, 0).join(' ') + ' L' + P(0, 0, 1).join(' ') + ' Z'} fill="color-mix(in srgb, var(--k-mm) 14%, transparent)" stroke="var(--k-mm)" strokeDasharray="5 4" />
          <text x="300" y="290" fontSize="19" style=${{ fill: 'var(--k-mm)' }}>X+Y+Z=1</text></g>
        <g className=${pop(i >= 2)} stroke="var(--graphite)" fill="none" strokeWidth="1">
          ${spokes.map(j => { const [, x, y] = LOCUS[j], e = P(x * 1.3, y * 1.3, (1 - x - y) * 1.3); return html`<path key=${j} d=${`M${O[0]} ${O[1]} L${e[0]} ${e[1]}`} />`; })}
          <path d=${curve(1.3)} strokeWidth="1.6" /></g>
        <path d=${curve(1)} fill="color-mix(in srgb, var(--k-mm) 30%, transparent)" stroke="var(--k-mm)" strokeWidth="2.5" className=${pop(i >= 3)} />
        <path d=${curve(1, true)} fill="none" stroke="var(--pen)" strokeWidth="2.5" strokeDasharray="6 4" className=${pop(i >= 4)} />
        ${i >= 4 && [0, 11, 16, 29].map(j => { const [, x, y] = LOCUS[j], a = P(x, y, 1 - x - y), b = P(x, y, 0); return html`<path key=${j} d=${`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} stroke="var(--pen)" strokeWidth="1" strokeDasharray="2 3" />`; })}
        ${axis(ax, 'X')}${axis(ay, 'Y', i === 1)}${axis(az, 'Z')}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 24: the CIE chromaticity diagram (a vector-based colour model) ── */
  const CX = x => 50 + x * 400, CY = y => 380 - y * 400, WHITE = [.3135, .3237];
  const TAGS = { 400: [6, 16], 480: [-34, 6], 490: [-34, 6], 500: [-36, 4], 510: [-36, 0], 520: [-14, -8], 540: [8, -6], 560: [10, -2], 580: [10, 0], 600: [10, 2], 700: [6, 16] };
  function CieMix({ ar }) {
    const [A, setA] = useState(null), [B, setB] = useState(null), [t, setT] = useState(50);
    const svg = useRef(null);
    const img = useMemo(() => dataUrl(160, 180, d => { for (let j = 0; j < 180; j++) for (let k = 0; k < 160; k++) { const x = (k + .5) / 200, y = (179 - j + .5) / 200, o = 4 * (j * 160 + k); if (!pip([x, y], POLY)) { d[o + 3] = 0; continue; } const c = xy2rgb(x, y); d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255; } }), []);
    const tap = e => { const p = svgPt(e, svg.current), xy = [(p.x - 50) / 400, (380 - p.y) / 400]; if (!pip(xy, POLY)) return; if (!A || B) { setA(xy); setB(null); setT(50); } else setB(xy); };
    const M = A && B ? [A[0] + (B[0] - A[0]) * t / 100, A[1] + (B[1] - A[1]) * t / 100] : null;
    const dot = (p, l, c) => html`<g><circle cx=${CX(p[0])} cy=${CY(p[1])} r="8" fill=${rgbCss(...xy2rgb(...p))} stroke=${c} strokeWidth="3" /><text x=${CX(p[0]) + 11} y=${CY(p[1]) - 9} fontSize="19" fontWeight="700" style=${{ fill: '#111', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 4 }}>${l}</text></g>`;
    const en = !A ? 'The <b>CIE chromaticity diagram</b>: the edges represent the <b>pure</b> colours (wavelengths in nm); <b>white</b> (a blackbody radiating at 6447 kelvin) is at the <b>dot</b>. <b>Tap a colour</b> inside the horseshoe.' : !B ? 'Now tap a <b>second</b> colour.' : '<b>Vector-based colour model</b>: when <b>added</b>, any two colours (points on the CIE diagram) produce a point <b>on the line between them</b>. Slide the mix along the line. Tap again to start over.';
    const a = !A ? 'الـ <b>CIE chromaticity diagram</b>: الأطراف بتمثل الألوان <b>الـ pure</b> (الـ wavelengths بالـ nm)؛ والـ <b>white</b> (blackbody بيشع عند 6447 kelvin) عند <b>النقطة</b>. <b>دوس على لون</b> جوه الحدوة.' : !B ? 'دلوقتي دوس على <b>لون تاني</b>.' : '<b>Vector-based colour model</b>: لما <b>نجمع</b> أي لونين (نقطتين على الـ CIE diagram) بيطلع نقطة <b>على الخط اللي بينهم</b>. حرّك الـ mix على الخط. دوس تاني عشان تبدأ من الأول.';
    const lab = (x, y, t) => html`<text x=${CX(x)} y=${CY(y)} fontSize="19" fontWeight="600" textAnchor="middle" style=${{ fill: '#111' }}>${t}</text>`;
    return html`<figure className="fig"><div className="fig-stage">
      <svg ref=${svg} viewBox="0 0 400 412" className="fm3-click" onClick=${tap} role="img" aria-label="CIE chromaticity diagram: horseshoe of pure colours from 400 to 700 nm, white dot in the middle">
        <defs><marker id="fm3-cm-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker></defs>
        <path d="M50 392 V12 M38 380 H392" stroke="var(--ink)" strokeWidth="1.5" fill="none" markerEnd="url(#fm3-cm-a)" /><path d="M50 392 V12" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#fm3-cm-a)" />
        <text x="40" y="18" fontSize="19" textAnchor="end">y</text><text x="388" y="404" fontSize="19">x</text>
        <image href=${img} x="50" y="20" width="320" height="360" />
        <path d=${POLY.map((p, j) => (j ? 'L' : 'M') + CX(p[0]).toFixed(1) + ' ' + CY(p[1]).toFixed(1)).join(' ') + ' Z'} fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        ${LOCUS.filter(p => TAGS[p[0]]).map(([l, x, y]) => html`<text key=${l} x=${CX(x) + TAGS[l][0]} y=${CY(y) + TAGS[l][1]} fontSize="18" textAnchor=${TAGS[l][0] < 0 ? 'start' : 'start'}>${l}</text>`)}
        ${lab(.2, .66, 'Green')}${lab(.11, .36, 'Cyan')}${lab(.19, .1, 'Blue')}${lab(.43, .5, 'Yellow')}${lab(.6, .31, 'Red')}
        <circle cx=${CX(WHITE[0])} cy=${CY(WHITE[1])} r="5" fill="#111" />
        ${A && B && html`<path d=${`M${CX(A[0])} ${CY(A[1])} L${CX(B[0])} ${CY(B[1])}`} stroke="#111" strokeWidth="2.5" strokeDasharray="6 4" />`}
        ${A && dot(A, 'A', '#111')}${B && dot(B, 'B', '#111')}${M && dot(M, 'mix', '#fff')}
      </svg>
      ${M && html`<div className="fm3-sl"><span>A ↔ B</span><input type="range" min="0" max="100" value=${t} onChange=${e => setT(+e.target.value)} aria-label="Position of the mix on the line from A to B" /><output>${t}%</output></div>
        <div className="fm3-sw"><span>A</span><i style=${{ background: rgbCss(...xy2rgb(...A)) }}></i><span>+</span><span>B</span><i style=${{ background: rgbCss(...xy2rgb(...B)) }}></i><span>→</span><i style=${{ background: rgbCss(...xy2rgb(...M)) }}></i></div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 25: the L*a*b* (Lab) colour model ── */
  function Lab({ ar }) {
    const [L, setL] = useState(60), [A, setA] = useState(40), [B, setB] = useState(40);
    const disc = useMemo(() => dataUrl(120, 120, d => { for (let j = 0; j < 120; j++) for (let k = 0; k < 120; k++) { const o = 4 * (j * 120 + k), a = (k + .5 - 60) / 60 * 100, b = -(j + .5 - 60) / 60 * 100; if (a * a + b * b > 10000) { d[o + 3] = 0; continue; } const c = lab2rgb(L, a, b); d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255; } }), [L]);
    const [r, g, b, ok] = lab2rgb(L, A, B);
    const cx = 200, top = 52, bot = 292, cy = 262 - 172 * L / 100, rx = 100, ry = 40;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 400 340" role="img" aria-label="Lab model: vertical L axis from L=0 black to L=100 white through a colour disc with minus a green, plus a red, minus b blue, plus b yellow">
        <defs><linearGradient id="fm3-lab-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient></defs>
        <rect x=${cx - 9} y=${top} width="18" height=${bot - top} rx="4" fill="url(#fm3-lab-l)" stroke="var(--graphite)" />
        <text x=${cx} y="20" fontSize="19" textAnchor="middle" fontWeight="700">L=100</text><text x=${cx} y="40" fontSize="19" textAnchor="middle">White</text>
        <text x=${cx} y="312" fontSize="19" textAnchor="middle">Black</text><text x=${cx} y="332" fontSize="19" textAnchor="middle" fontWeight="700">L=0</text>
        <image href=${disc} x=${cx - rx} y=${cy - ry} width=${rx * 2} height=${ry * 2} preserveAspectRatio="none" />
        <ellipse cx=${cx} cy=${cy} rx=${rx} ry=${ry} fill="none" stroke="var(--graphite)" />
        <rect x=${cx - 9} y=${top} width="18" height=${Math.max(0, cy - top)} rx="4" fill="url(#fm3-lab-l)" stroke="var(--graphite)" />
        <circle cx=${cx + A / 100 * rx} cy=${cy - B / 100 * ry} r="7" fill=${rgbCss(r, g, b)} stroke="#111" strokeWidth="2.5" />
        <text x=${cx - rx - 6} y=${cy + 5} fontSize="19" textAnchor="end">−a Green</text><text x=${cx + rx + 6} y=${cy + 5} fontSize="19">+a Red</text>
        <text x=${cx + 70} y=${cy - ry - 6} fontSize="19">+b Yellow</text><text x=${cx - 70} y=${cy + ry + 18} fontSize="19" textAnchor="end">−b Blue</text>
      </svg>
      <div className="fm3-sl"><span>L</span><input type="range" min="0" max="100" value=${L} onChange=${e => setL(+e.target.value)} aria-label="L, luminance, 0 black to 100 white" /><output>${L}</output></div>
      <div className="fm3-sl"><span>a</span><input type="range" min="-100" max="100" value=${A} onChange=${e => setA(+e.target.value)} aria-label="a, from green to red" /><output>${A < 0 ? 'green' : A > 0 ? 'red' : '0'}</output></div>
      <div className="fm3-sl"><span>b</span><input type="range" min="-100" max="100" value=${B} onChange=${e => setB(+e.target.value)} aria-label="b, from blue to yellow" /><output>${B < 0 ? 'blue' : B > 0 ? 'yellow' : '0'}</output></div>
      <div className="fm3-sw"><i style=${{ background: rgbCss(r, g, b) }}></i><span>${ok ? 'This colour is inside the monitor’s gamut.' : 'Outside the monitor’s gamut: shown clipped (the gamut of a monitor is smaller than CIE Lab, slide 22).'}</span></div></div>
      <${Cap} en="<b>L*a*b* (Lab)</b>: a refined CIE model, named CIE L*a*b* in 1976. <b>Luminance: L</b> runs from L=0 (Black) to L=100 (White). <b>Chrominance</b>: <b>a</b> ranges from green to red, <b>b</b> ranges from blue to yellow. Used by Photoshop. Move L to slide the colour disc up and down the axis." ar="الـ <b>L*a*b* (Lab)</b>: CIE model متحسّن، اسمه CIE L*a*b* في 1976. الـ <b>Luminance: L</b> من L=0 (Black) لـ L=100 (White). الـ <b>Chrominance</b>: الـ <b>a</b> من green لـ red، والـ <b>b</b> من blue لـ yellow. بيستخدمه Photoshop. حرّك الـ L عشان الـ colour disc يطلع وينزل على المحور." showAr=${ar} /></figure>`;
  }

  /* ── slides 28, 31, 32: the YIQ and YUV transforms ── */
  const PRE = [['Red', [255, 0, 0]], ['Green', [0, 255, 0]], ['Blue', [0, 0, 255]], ['White', [255, 255, 255]], ['Black', [0, 0, 0]], ['30, 190, 60', [30, 190, 60]]];
  function YiqYuv({ ar }) {
    const [m, setM] = useState('YIQ'), [c, setC] = useState([30, 190, 60]), [row, setRow] = useState(0);
    const Mx = m === 'YIQ' ? YIQ : YUV, out = mul(Mx, c), nm = m === 'YIQ' ? ['Y', 'I', 'Q'] : ['Y', 'U', 'V'];
    const term = (k, j) => (j === 0 ? (Mx[k][j] < 0 ? '−' : '') : (Mx[k][j] < 0 ? ' − ' : ' + ')) + Math.abs(Mx[k][j]) + '×' + c[j];
    const y = out[0];
    const check = m === 'YUV' && row > 0 ? html`<div className="fm3-mut">check: ${row === 1 ? `U = B − Y = ${c[2]} − ${fmt(y, 3)} = ${fmt(c[2] - y, 3)}` : `V = R − Y = ${c[0]} − ${fmt(y, 3)} = ${fmt(c[0] - y, 3)}`}</div>` : null;
    const en = m === 'YIQ' ? 'YIQ is used in colour TV broadcasting; it is downward compatible with B/W TV. <b>Y</b> (luminance) is the CIE Y primary: <b>Y = 0.299R + 0.587G + 0.114B</b>; the other two vectors: <b>I = 0.596R − 0.275G − 0.321B</b>, <b>Q = 0.212R − 0.528G + 0.311B</b>. Pick a colour and tap a row of the transform.' : 'YUV uses the <b>Y, U, V</b> colour space: <b>Y = 0.299R + 0.587G + 0.114B</b>, <b>U = B − Y</b>, <b>V = R − Y</b>. The YUV transform writes the same thing as a matrix: tap the U or V row to check it against B − Y or R − Y.';
    const a = m === 'YIQ' ? 'الـ YIQ بيستخدم في الـ colour TV broadcasting؛ وهو downward compatible مع التليفزيون الأبيض وأسود. الـ <b>Y</b> (luminance) هو الـ CIE Y primary: <b>Y = 0.299R + 0.587G + 0.114B</b>؛ والـ vectors التانيين: <b>I = 0.596R − 0.275G − 0.321B</b>، <b>Q = 0.212R − 0.528G + 0.311B</b>. اختار لون ودوس على row في الـ transform.' : 'الـ YUV بيستخدم الـ <b>Y, U, V</b> colour space: <b>Y = 0.299R + 0.587G + 0.114B</b>، <b>U = B − Y</b>، <b>V = R − Y</b>. الـ YUV transform بيكتب نفس الكلام كـ matrix: دوس على row الـ U أو الـ V وقارنه بـ B − Y أو R − Y.';
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm3-row">${['YIQ', 'YUV'].map(k => html`<button key=${k} className=${'fm3-chip' + (k === m ? ' on' : '')} onClick=${() => setM(k)}>${k} transform</button>`)}</div>
      <div className="fm3-row">${PRE.map(([n, v]) => html`<button key=${n} className=${'fm3-chip' + (v.join() === c.join() ? ' on' : '')} onClick=${() => setC(v)}>${n}</button>`)}</div>
      ${['R', 'G', 'B'].map((n, k) => html`<div key=${n} className="fm3-sl"><span>${n}</span><input type="range" min="0" max="255" value=${c[k]} onChange=${e => { const x = +e.target.value; setC(o => o.map((y, j) => j === k ? x : y)); }} aria-label=${n} /><output>${c[k]}</output></div>`)}
      <div className="fm3-mat" style=${{ marginTop: '8px' }}>
        <table><tbody>${nm.map((n, k) => html`<tr key=${k} className=${k === row ? 'hit' : ''}><td>${n}</td></tr>`)}</tbody></table><span>=</span>
        <table><tbody>${Mx.map((r, k) => html`<tr key=${k} className=${k === row ? 'hit' : ''} onClick=${() => setRow(k)} style=${{ cursor: 'pointer' }}>${r.map((x, j) => html`<td key=${j}>${fmt(x, 3)}</td>`)}</tr>`)}</tbody></table>
        <table><tbody>${['R', 'G', 'B'].map((n, k) => html`<tr key=${k}><td>${c[k]}</td></tr>`)}</tbody></table></div>
      <div className="fm3-row" style=${{ marginTop: '8px' }}>${nm.map((n, k) => html`<button key=${k} className=${'fm3-chip' + (k === row ? ' on' : '')} onClick=${() => setRow(k)}>${n} row</button>`)}</div>
      <div className="fm3-calc"><div>${nm[row]} = ${[0, 1, 2].map(j => term(row, j)).join('')}</div><div>= <span className="fm3-hi">${fmt(out[row], 3)}</span></div>${check}</div>
      <div className="fm3-tiles">${nm.map((n, k) => html`<div key=${k}>${n}<strong>${fmt(out[k], 1)}</strong></div>`)}</div>
      <div className="fm3-sw"><span>colour</span><i style=${{ background: rgbCss(...c) }}></i><span>Y alone (B/W)</span><i style=${{ background: rgbCss(clamp(y, 0, 255), clamp(y, 0, 255), clamp(y, 0, 255)) }}></i></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 29: NTSC (analog) compression scheme ── */
  const YIQi = inv3(YIQ);
  function Ntsc({ ar }) {
    const steps = [
      { en: '<b>I</b> is the <b>red-orange</b> axis (the I–Q plane here keeps Y fixed, worked out from the slide’s YIQ transform).', ar: 'الـ <b>I</b> هو محور الـ <b>red-orange</b> (الـ I–Q plane هنا ثابت فيها الـ Y، محسوبة من الـ YIQ transform بتاع الـ slide).' },
      { en: '<b>Q</b> is roughly <b>orthogonal</b> to I.', ar: 'الـ <b>Q</b> تقريباً <b>orthogonal</b> (عمودي) على الـ I.' },
      { en: 'The eye is <b>most sensitive</b> to <b>Y</b>, next to <b>I</b>, next to <b>Q</b>.', ar: 'العين <b>أكتر حساسية</b> للـ <b>Y</b>، بعده الـ <b>I</b>، بعده الـ <b>Q</b>.' },
      { en: '<b>Analog Video Compression Scheme</b>: <b>4 MHz</b> is allocated to Y, <b>1.5 MHz</b> to I, <b>0.6 MHz</b> to Q.', ar: 'الـ <b>Analog Video Compression Scheme</b>: <b>4 MHz</b> للـ Y، و<b>1.5 MHz</b> للـ I، و<b>0.6 MHz</b> للـ Q.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const plane = useMemo(() => dataUrl(120, 120, d => { for (let j = 0; j < 120; j++) for (let k = 0; k < 120; k++) { const o = 4 * (j * 120 + k), I = (k + .5 - 60) / 60 * .6, Q = -(j + .5 - 60) / 60 * .6, c = mul(YIQi, [.5, I, Q]); if (c.some(v => v < 0 || v > 1)) { d[o + 3] = 0; continue; } d[o] = c[0] * 255; d[o + 1] = c[1] * 255; d[o + 2] = c[2] * 255; d[o + 3] = 255; } }), []);
    const BW = [['Y', 4, 'var(--ink)'], ['I', 1.5, '#ea580c'], ['Q', 0.6, '#7c3aed']];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 400 250" role="img" aria-label="The I-Q plane: I is the red-orange axis, Q roughly orthogonal to I">
        <defs><marker id="fm3-nt-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker></defs>
        <image href=${plane} x="90" y="15" width="220" height="220" />
        <path d="M80 125 H322" stroke=${i === 0 ? '#ea580c' : 'var(--ink)'} strokeWidth=${i === 0 ? 3.5 : 1.6} markerEnd="url(#fm3-nt-a)" />
        <path d="M200 240 V8" stroke=${i === 1 ? '#7c3aed' : 'var(--ink)'} strokeWidth=${i === 1 ? 3.5 : 1.6} markerEnd="url(#fm3-nt-a)" className=${pop(i >= 1)} />
        <text x="330" y="130" fontSize="20" fontWeight="700">I</text><text x="210" y="20" fontSize="20" fontWeight="700" className=${pop(i >= 1)}>Q</text>
        <text x="396" y="154" fontSize="19" textAnchor="end">red-orange</text>
        <text x="206" y="118" fontSize="19" className=${pop(i >= 1)}>90°</text>
      </svg>
      <div className=${'fm3-row ' + pop(i >= 2)} style=${{ marginTop: '6px' }}><span className="fm3-chip on">1. Y</span><span className="fm3-chip">2. I</span><span className="fm3-chip">3. Q</span></div>
      <div className=${'fm3-bars ' + pop(i >= 3)}>${BW.map(([n, mhz, c]) => html`<div key=${n}><span>${n}</span><div style=${{ display: 'flex', gap: '8px', alignItems: 'center' }}><div className="tr" style=${{ flex: 1 }}><i style=${{ width: (i >= 3 ? mhz / 4 * 100 : 0) + '%', background: c }}></i></div><em>${mhz} MHz</em></div></div>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 31: fields (odd and even lines), two fields make a frame ── */
  function Fields({ ar }) {
    const steps = [
      { en: 'YUV: a digital video standard established in 1982. Video is represented by a <b>sequence of fields</b> (odd and even lines).', ar: 'الـ YUV: digital video standard اتعمل في 1982. الـ video بيتمثل كـ <b>sequence of fields</b> (سطور فردية وسطور زوجية).' },
      { en: 'One field: the <b>odd lines</b> (1, 3, 5, …).', ar: 'field واحد: <b>السطور الفردية</b> (1، 3، 5، …).' },
      { en: 'The other field: the <b>even lines</b> (2, 4, 6, …).', ar: 'الـ field التاني: <b>السطور الزوجية</b> (2، 4، 6، …).' },
      { en: '<b>Two fields make a frame.</b>', ar: '<b>الـ 2 fields بيعملوا frame.</b>' },
      { en: 'Works in <b>PAL (50 fields/sec)</b> or <b>NTSC (60 fields/sec)</b>; with two fields per frame that is 25 or 30 frames each second.', ar: 'بيشتغل في <b>PAL (50 fields/sec)</b> أو <b>NTSC (60 fields/sec)</b>؛ وبما إن كل frame = 2 fields يبقى 25 أو 30 frame في الثانية.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const n = 14, R = 6.2;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fm3-fld" role="img" aria-label="A frame of 14 lines: odd lines form one field, even lines the other">${Array.from({ length: n }, (_, k) => {
        const line = k + 1, odd = line % 2 === 1, show = odd ? i >= 1 : i >= 2, dy = k + .5 - n / 2, half = Math.sqrt(Math.max(0, R * R - dy * dy)) / R * 38;
        return html`<div key=${k}><span>${line}</span><div className="ln"><i style=${{ left: (50 - half) + '%', width: 2 * half + '%', background: odd ? 'var(--k-mm)' : 'var(--graphite)', opacity: show ? (i === 1 && !odd ? 0 : 1) : 0 }}></i></div></div>`; })}</div>
      <div className="fm3-tiles">
        <div className=${pop(i >= 1)}>odd lines<strong style=${{ color: 'var(--k-mm)' }}>field 1</strong></div>
        <div className=${pop(i >= 2)}>even lines<strong>field 2</strong></div>
        <div className=${pop(i >= 3)}>field 1 + field 2<strong>1 frame</strong></div></div>
      <div className=${'fm3-tiles ' + pop(i >= 4)}><div>PAL<strong>50 fields/sec</strong>25 frames/sec</div><div>NTSC<strong>60 fields/sec</strong>30 frames/sec</div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-8a-sizes': ImgSizes, 'mm-8a-lut': Lut, 'mm-8a-dither': Dither, 'mm-8a-ordered': Ordered,
    'mm-8a-spectrum': Spectrum, 'mm-8a-eye': Eye, 'mm-8a-cones': Cones, 'mm-8a-channels': Channels, 'mm-8a-displays': Displays,
    'mm-8a-cie-cone': CieCone, 'mm-8a-cie-mix': CieMix, 'mm-8a-lab': Lab, 'mm-8a-yiq-yuv': YiqYuv, 'mm-8a-ntsc': Ntsc, 'mm-8a-fields': Fields
  });
})();

/* ── part 4 ── */
// Multimedia visuals, part 4: L8 slides 33 to 64 (YCrCb, CMY/CMYK, video signals, NTSC/PAL, chroma subsampling, aliasing).
// Every label and caption comes from the slide or the site's notes for that slide.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fm4{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }
.fm4 .fig-btn.solid{ background:var(--s-mm); }
.fm4-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; padding:0 14px 12px; }
.fm4-lbl{ font-size:.85rem; color:var(--graphite); text-align:center; margin:0 0 6px; }
.fm4-px{ display:grid; grid-template-columns:auto auto; gap:14px; justify-content:center; align-items:start; }
.fm4-px .g2{ display:grid; grid-template-columns:repeat(2, 58px); gap:3px; }
.fm4-px .g8{ display:grid; grid-template-columns:repeat(4, 34px); gap:3px; }
.fm4-px button{ border:1px solid var(--line); border-radius:4px; cursor:pointer; padding:0; aspect-ratio:1; transition:background .4s; }
.fm4-px button.sel{ outline:3px solid var(--k-mm); outline-offset:2px; }
.fm4-calc{ margin:12px auto 0; max-width:440px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px 12px; font:500 .84rem/1.5 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; }
.fm4-calc .hd{ font-family:var(--body); font-weight:700; display:flex; gap:8px; align-items:center; margin-bottom:4px; }
.fm4-calc .hd i{ width:18px; height:18px; border-radius:4px; border:1px solid var(--line); display:inline-block; }
.fm4-calc .em{ color:var(--k-mm); font-weight:700; }
.fm4-sl{ display:grid; gap:4px; max-width:440px; margin:10px auto 0; font-size:.85rem; }
.fm4-sl label{ display:grid; grid-template-columns:22px 1fr 40px; gap:8px; align-items:center; }
.fm4-sl input{ width:100%; accent-color:var(--k-mm); }
.fm4-sl span:last-child{ font-family:var(--mono); text-align:right; }
.fm4-note{ font-size:.82rem; color:var(--graphite); max-width:440px; margin:8px auto 0; line-height:1.45; }
.fm4-tag{ position:absolute; font-size:.82rem; }
.fm4-circ text{ font-weight:700; }
.fm4-sig{ display:grid; gap:8px; max-width:520px; margin:0 auto; }
.fm4-sig .card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; opacity:.4; transition:opacity .4s, box-shadow .4s; }
.fm4-sig .card.on{ opacity:1; box-shadow:0 0 0 2px var(--k-mm); }
.fm4-sig .card > strong{ display:block; font-size:.92rem; margin-bottom:4px; }
.fm4-sig .card p{ margin:4px 0 0; font-size:.84rem; color:var(--graphite); line-height:1.4; }
.fm4-wire{ display:grid; grid-template-columns:minmax(96px, 40%) 1fr; gap:8px; align-items:center; font-size:.84rem; margin:3px 0; }
.fm4-wire i{ height:6px; border-radius:3px; background-size:28px 6px; animation:fm4run 1s linear infinite; }
@keyframes fm4run{ to{ background-position:28px 0; } }
.fm4-std{ display:grid; grid-template-columns:minmax(0, 240px) 1fr; gap:12px; align-items:start; max-width:560px; margin:0 auto; }
@media (max-width:520px){ .fm4-std{ grid-template-columns:1fr; } }
.fm4-std dl{ margin:0; display:grid; grid-template-columns:auto 1fr; gap:2px 10px; font-size:.85rem; }
.fm4-std dt{ color:var(--graphite); } .fm4-std dd{ margin:0; font-weight:600; }
.fm4-leg{ display:flex; gap:12px; justify-content:center; font-size:.82rem; color:var(--graphite); margin-top:4px; flex-wrap:wrap; }
.fm4-leg i{ display:inline-block; width:14px; height:4px; border-radius:2px; vertical-align:middle; margin-right:4px; }
.fm4-bars{ max-width:560px; margin:12px auto 0; display:grid; gap:5px; font-size:.84rem; }
.fm4-bars .t{ font-weight:700; font-size:.86rem; margin-top:4px; }
.fm4-bars .b{ display:grid; grid-template-columns:minmax(80px, 32%) 1fr; gap:8px; align-items:center; }
.fm4-bars .b > div{ background:var(--paper); border:1px solid var(--line); border-radius:6px; height:22px; overflow:hidden; display:flex; }
.fm4-bars .b > div span{ display:flex; align-items:center; justify-content:flex-end; padding:0 6px; font:600 .78rem var(--mono); color:#fff; white-space:nowrap; transition:width .6s; }
.fm4-form{ text-align:center; font:500 .84rem/1.4 var(--mono); margin:10px auto 0; max-width:560px; }
.fm4-lay{ display:grid; grid-template-columns:1fr 1fr 1.6fr 1fr; gap:10px; max-width:600px; margin:0 auto; }
@media (max-width:520px){ .fm4-lay{ grid-template-columns:1fr 1fr; } }
.fm4-lay .col{ opacity:.35; transition:opacity .4s; text-align:center; } .fm4-lay .col.on{ opacity:1; }
.fm4-lay .col > strong{ display:block; font:700 .95rem var(--mono); margin-bottom:6px; }
.fm4-lay .blk{ display:grid; gap:2px; margin:0 auto 8px; }
.fm4-lay sub{ font-size:12px; }
.fm4-lay .blk span{ border:1px solid var(--graphite); background:var(--paper); font:600 .86rem/1 var(--mono); padding:6px 0; color:var(--ink); }
.fm4-lay .blk span.c{ background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.fm4-lay .n{ font-size:.85rem; color:var(--graphite); }
.fm4-two{ display:grid; grid-template-columns:1fr 1fr; gap:10px; max-width:460px; margin:0 auto; }
.fm4-two svg{ width:100%; height:auto; display:block; }
.fm4-wheel{ display:grid; grid-template-columns:1fr 1fr; gap:10px; max-width:420px; margin:0 auto; }
.fm4-wheel svg{ width:100%; height:auto; display:block; border-radius:6px; }
.fm4-strip{ display:grid; grid-template-columns:repeat(5, 1fr); gap:4px; max-width:420px; margin:10px auto 0; text-align:center; font-size:.78rem; color:var(--graphite); }
.fm4-strip svg{ width:100%; height:auto; display:block; border-radius:4px; }
.fm4-ratio{ max-width:520px; margin:10px auto 0; font-size:.86rem; line-height:1.45; }
.fm4-ratio div{ display:grid; grid-template-columns:28px 1fr; gap:6px; } .fm4-ratio div > span:first-child{ font:700 1rem var(--mono); color:var(--k-mm); text-align:center; }
.fm4-code{ max-width:520px; margin:8px auto 0; font:500 .8rem/1.45 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:8px 10px; white-space:pre-wrap; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .fm4-wire i{ animation:none; } .fm4-bars .b > div span, .fm4-px button{ transition:none; } }`;
  if (!document.getElementById('fm4-css')) { const s = document.createElement('style'); s.id = 'fm4-css'; s.textContent = CSS; document.head.appendChild(s); }

  const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
  const rgbs = (r, g, b) => `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`;
  const neg = s => s.replace('-', '−');
  const f2 = x => { const s = (Math.round(x * 100) / 100).toFixed(2); return neg(s === '-0.00' ? '0.00' : s); };
  const f6 = x => { const r = Math.round(x * 1e6) / 1e6; return Number.isInteger(r) ? String(r) : r.toFixed(6); };
  const Btn = ({ on, onClick, children, label }) => html`<button className=${'fig-btn' + (on ? ' solid' : '')} aria-pressed=${!!on} aria-label=${label} onClick=${onClick}>${children}</button>`;

  // the site's worked 2×2 image (L8 notes §6) and the eight cube colours (slides 35 and 36)
  const EX4 = [['pixel (1,1)', 110, 110, 255], ['pixel (1,2)', 60, 210, 130], ['pixel (2,1)', 20, 120, 90], ['pixel (2,2)', 70, 220, 140]];
  const CUBE8 = [['Red', 255, 0, 0], ['Yellow', 255, 255, 0], ['Green', 0, 255, 0], ['Cyan', 0, 255, 255], ['Blue', 0, 0, 255], ['Magenta', 255, 0, 255], ['White', 255, 255, 255], ['Black', 0, 0, 0]];
  const TILES = EX4.concat(CUBE8);
  const ycc = (r, g, b) => { const Y = 0.299 * r + 0.587 * g + 0.114 * b; return { Y, Cb: (b - Y) / 1.772, Cr: (r - Y) / 1.402 }; };
  const cmyk = (r, g, b) => { const C = 1 - r / 255, M = 1 - g / 255, Yy = 1 - b / 255, K = Math.min(C, M, Yy); return { C, M, Y: Yy, K, c: C - K, m: M - K, y: Yy - K }; };
  const plane = (mode, view, [r, g, b]) => {
    if (view === 'orig') return rgbs(r, g, b);
    if (mode === 'ycc') { const v = ycc(r, g, b); const t = view === 'Y' ? v.Y : 128 + v[view]; return rgbs(t, t, t); }
    const v = cmyk(r, g, b);
    if (view === 'C') return rgbs(255 * (1 - v.c), 255, 255);
    if (view === 'M') return rgbs(255, 255 * (1 - v.m), 255);
    if (view === 'Y') return rgbs(255, 255, 255 * (1 - v.y));
    return rgbs(255 * (1 - v.K), 255 * (1 - v.K), 255 * (1 - v.K));
  };

  /* ── L8 slides 33, 34 (YCrCb) and 37 to 39 (CMY, CMYK): a pixel lab with the slides' formulas and component images ── */
  function PixelLab({ ar, mode }) {
    const isY = mode === 'ycc', VIEWS = isY ? ['orig', 'Y', 'Cr', 'Cb'] : ['orig', 'C', 'M', 'Y', 'K'];
    const start = isY ? 0 : 10;
    const [view, setView] = useState('orig'), [sel, setSel] = useState(start), [cur, setCur] = useState(TILES[start].slice(1));
    const pick = i => { setSel(i); setCur(TILES[i].slice(1)); };
    const slide = (k, v) => { const c = cur.slice(); c[k] = +v; setCur(c); setSel(-1); };
    const [r, g, b] = cur, name = sel >= 0 ? TILES[sel][0] : 'your colour';
    let calc;
    if (isY) { const v = ycc(r, g, b);
      calc = [[`Y  = 0.299×${r} + 0.587×${g} + 0.114×${b}`], ['   = ', f2(v.Y)], [`Cb = (B − Y)/1.772 = (${b} − ${f2(v.Y)})/1.772`], ['   = ', f2(v.Cb)], [`Cr = (R − Y)/1.402 = (${r} − ${f2(v.Y)})/1.402`], ['   = ', f2(v.Cr)]]; }
    else { const v = cmyk(r, g, b);
      calc = [[`RGB ÷ 255 = (${f6(r / 255)}, ${f6(g / 255)}, ${f6(b / 255)})`], ['[C;M;Y] = [1;1;1] − [R;G;B]'], [`   = (${f6(v.C)}, ${f6(v.M)}, ${f6(v.Y)})`], [`K = min(C, M, Y) = ${f6(v.K)}`], ['C, M, Y (CMYK) = C − K, M − K, Y − K'], ['CMYK = ', `(${f6(v.c)}, ${f6(v.m)}, ${f6(v.y)}, ${f6(v.K)})`]]; }
    const capY = {
      orig: ['YCrCb (CCIR 601) is similar to YUV, normalised by a scaling: <span class="em">Cb = (B − Y)/1.772</span>, <span class="em">Cr = (R − Y)/1.402</span>. Tap a pixel or move the sliders; switch to Y, Cr or Cb to see each component as its own image (slide 34).', 'الـ YCrCb (CCIR 601) شبه الـ YUV بس متعمله scaling: <b>Cb = (B − Y)/1.772</b> و <b>Cr = (R − Y)/1.402</b>. دوس على pixel أو حرّك الـ sliders، وبدّل لـ Y أو Cr أو Cb عشان تشوف كل component كصورة لوحدها (slide 34).'],
      Y: ['<b>Y image intensities</b>: the luminance Y = 0.299R + 0.587G + 0.114B; it looks like the grey-scale image.', '<b>صورة الـ Y</b>: الـ luminance يعني Y = 0.299R + 0.587G + 0.114B؛ شكلها زي الصورة الـ grey-scale.'],
      Cr: ['<b>Cr image intensities</b> (R − Y)/1.402, drawn with 0 as mid-grey: a low-contrast grey image that only shows the colour difference.', '<b>صورة الـ Cr</b> يعني (R − Y)/1.402، مرسومة والـ 0 رمادي في النص: صورة رمادي contrast قليل بتبيّن فرق اللون بس.'],
      Cb: ['<b>Cb image intensities</b> (B − Y)/1.772, drawn with 0 as mid-grey: a low-contrast grey image that only shows the colour difference.', '<b>صورة الـ Cb</b> يعني (B − Y)/1.772، مرسومة والـ 0 رمادي في النص: صورة رمادي contrast قليل بتبيّن فرق اللون بس.']
    };
    const capC = {
      orig: ['CMY are the complements of RGB: <span class="em">[C;M;Y] = [1;1;1] − [R;G;B]</span>. E.g. White (1,1,1) in RGB is (0,0,0) in CMY. CMYK adds K = min(C, M, Y), then C − K, M − K, Y − K. Switch to C, M, Y or K to see one image per ink (slide 39).', 'الـ CMY هي الـ complements بتاعة الـ RGB: <b>[C;M;Y] = [1;1;1] − [R;G;B]</b>. مثلاً الـ White (1,1,1) في الـ RGB تبقى (0,0,0) في الـ CMY. الـ CMYK بتزود K = min(C, M, Y) وبعدين C − K و M − K و Y − K. بدّل لـ C أو M أو Y أو K عشان تشوف صورة لكل ink (slide 39).'],
      C: ['<b>C image intensity</b>: how much cyan ink each pixel gets after K is taken out.', '<b>صورة الـ C</b>: قد إيه cyan ink كل pixel بياخد بعد ما نطلّع الـ K.'],
      M: ['<b>M image intensity</b>: how much magenta ink each pixel gets after K is taken out.', '<b>صورة الـ M</b>: قد إيه magenta ink كل pixel بياخد بعد ما نطلّع الـ K.'],
      Y: ['<b>Y image intensity</b>: how much yellow ink each pixel gets after K is taken out.', '<b>صورة الـ Y</b>: قد إيه yellow ink كل pixel بياخد بعد ما نطلّع الـ K.'],
      K: ['<b>K image intensity</b> (K = black, K = min(C, M, Y)): a separate black ink gives a darker black than simply mixing CMY, which is never really black.', '<b>صورة الـ K</b> (الـ K = black، و K = min(C, M, Y)): الـ black ink اللي لوحده بيدّي أسود أغمق من خلط الـ CMY، اللي عمره ما بيطلع أسود بجد.']
    };
    const cap = (isY ? capY : capC)[view];
    const tile = i => html`<button key=${i} className=${sel === i ? 'sel' : ''} style=${{ background: plane(mode, view, TILES[i].slice(1)) }} title=${TILES[i][0]} aria-label=${TILES[i][0] + ' ' + TILES[i].slice(1).join(', ')} onClick=${() => pick(i)}></button>`;
    return html`<figure className="fig fm4"><div className="fig-stage">
      <div className="fm4-px">
        <div><p className="fm4-lbl">2×2 image (notes §6)</p><div className="g2">${[0, 1, 2, 3].map(tile)}</div></div>
        <div><p className="fm4-lbl">Cube colours</p><div className="g8">${[4, 5, 6, 7, 8, 9, 10, 11].map(tile)}</div></div>
      </div>
      <div className="fm4-calc" aria-live="polite"><div className="hd"><i style=${{ background: rgbs(r, g, b) }}></i>${name}: R, G, B = ${r}, ${g}, ${b}</div>${calc.map((l, j) => html`<div key=${j}>${l[0]}${l[1] != null && html`<span className="em">${l[1]}</span>`}</div>`)}</div>
      <div className="fm4-sl">${['R', 'G', 'B'].map((k, j) => html`<label key=${k}><span>${k}</span><input type="range" min="0" max="255" value=${cur[j]} onInput=${e => slide(j, e.target.value)} onChange=${e => slide(j, e.target.value)} aria-label=${k + ' value'} /><span>${cur[j]}</span></label>`)}</div>
      ${isY && html`<p className="fm4-note">Matrix form (slide 33): [−0.169 −0.331 0.500] is the Cb row and [0.500 −0.419 −0.081] the Cr row; the slide prints the two row labels the other way round.</p>`}
      </div>
      <${Cap} en=${cap[0]} ar=${cap[1]} showAr=${ar} />
      <div className="fm4-row">${VIEWS.map(v => html`<${Btn} key=${v} on=${view === v} onClick=${() => setView(v)}>${v === 'orig' ? 'Original' : v}<//>`)}</div></figure>`;
  }
  const YcrcbLab = p => html`<${PixelLab} ...${p} mode="ycc" />`;
  const CmykLab = p => html`<${PixelLab} ...${p} mode="cmyk" />`;

  /* ── L8 slide 35: the RGB cube and the CMY cube ── */
  // corner positions share one tuple; in the RGB cube the tuple is (R,G,B), in the CMY cube it is (C,M,Y)
  const CORN = [
    { t: [0, 0, 1], x: 180, y: 50, lx: 180, ly: 32 }, { t: [0, 1, 1], x: 320, y: 50, lx: 320, ly: 32 },
    { t: [1, 0, 1], x: 110, y: 110, lx: 54, ly: 104 }, { t: [1, 1, 1], x: 250, y: 110, lx: 286, ly: 140, far: 1 },
    { t: [1, 0, 0], x: 110, y: 250, lx: 92, ly: 276 }, { t: [1, 1, 0], x: 250, y: 250, lx: 262, ly: 276 },
    { t: [0, 0, 0], x: 180, y: 190, lx: 146, ly: 180, far: 1 }, { t: [0, 1, 0], x: 320, y: 190, lx: 360, ly: 196 }
  ];
  const NAME = { '1,0,0': 'Red', '0,1,0': 'Green', '0,0,1': 'Blue', '0,1,1': 'Cyan', '1,0,1': 'Magenta', '1,1,0': 'Yellow', '1,1,1': 'White', '0,0,0': 'Black' };
  function CmyCubes({ ar }) {
    const [cmy, setCmy] = useState(false), [sel, setSel] = useState(3);
    const rgbOf = t => cmy ? t.map(v => 1 - v) : t;
    const nm = t => NAME[rgbOf(t).join()];
    const S = CORN[sel], t = S.t, rgb = rgbOf(t), comp = rgb.map(v => 1 - v);
    const E = (a, b, dash) => html`<line x1=${CORN[a].x} y1=${CORN[a].y} x2=${CORN[b].x} y2=${CORN[b].y} stroke="var(--ink)" strokeWidth="2.5" strokeDasharray=${dash ? '7 6' : null} />`;
    const tx = '(' + t.join(', ') + ')';
    const en = cmy
      ? `<b>The CMY Cube</b>: White at (0,0,0) and Black at (1,1,1). Every corner holds the <b>complement</b> of the RGB cube's colour at the same place. ${nm(t)} is (C,M,Y) = ${tx}; back to RGB: [1;1;1] − ${tx} = (${rgb.join(', ')}).`
      : `<b>The RGB Cube</b>: Black at (0,0,0) and White at (1,1,1). ${nm(t)} is (R,G,B) = ${tx}; in CMY: [1;1;1] − ${tx} = <b>(${comp.join(', ')})</b>.`;
    const a = cmy
      ? `<b>الـ CMY Cube</b>: الـ White عند (0,0,0) والـ Black عند (1,1,1). كل ركن فيه الـ <b>complement</b> بتاع لون الـ RGB cube في نفس المكان. الـ ${nm(t)} هو (C,M,Y) = ${tx}؛ ونرجع للـ RGB: [1;1;1] − ${tx} = (${rgb.join(', ')}).`
      : `<b>الـ RGB Cube</b>: الـ Black عند (0,0,0) والـ White عند (1,1,1). الـ ${nm(t)} هو (R,G,B) = ${tx}؛ في الـ CMY: [1;1;1] − ${tx} = <b>(${comp.join(', ')})</b>.`;
    return html`<figure className="fig fm4"><div className="fig-stage">
      <svg viewBox="12 10 392 292" role="img" aria-label=${cmy ? 'The CMY cube' : 'The RGB cube'}>
        ${E(2, 3)}${E(3, 5)}${E(5, 4)}${E(4, 2)}${E(0, 1)}${E(1, 7)}${E(2, 0)}${E(3, 1)}${E(5, 7)}${E(6, 0, 1)}${E(6, 7, 1)}${E(6, 4, 1)}
        <line x1=${CORN[6].x} y1=${CORN[6].y} x2=${CORN[3].x} y2=${CORN[3].y} stroke="var(--faint)" strokeWidth="2" strokeDasharray="3 5" />
        ${CORN.map((c, i) => { const rg = rgbOf(c.t); return html`<g key=${i} style=${{ cursor: 'pointer' }} onClick=${() => setSel(i)} role="button" aria-label=${nm(c.t)}>
          <circle cx=${c.x} cy=${c.y} r="20" fill="transparent" />
          <circle cx=${c.x} cy=${c.y} r=${sel === i ? 13 : 10} fill=${rgbs(rg[0] * 255, rg[1] * 255, rg[2] * 255)} stroke=${sel === i ? 'var(--k-mm)' : 'var(--ink)'} strokeWidth=${sel === i ? 4 : 1.5} className="fade" />
          <text x=${c.lx} y=${c.ly} textAnchor="middle" fontSize="19" fontWeight=${sel === i ? 700 : 500} style=${{ paintOrder: 'stroke', stroke: 'var(--paper-2)', strokeWidth: 5 }}>${nm(c.t)}</text></g>`; })}
        <text x="260" y="164" fontSize="18" style=${{ paintOrder: 'stroke', stroke: 'var(--paper-2)', strokeWidth: 5 }}>(1,1,1)</text>
        <text x="184" y="220" fontSize="18" style=${{ paintOrder: 'stroke', stroke: 'var(--paper-2)', strokeWidth: 5 }}>(0,0,0)</text>
      </svg></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fm4-row"><${Btn} on=${!cmy} onClick=${() => setCmy(false)}>The RGB Cube<//><${Btn} on=${cmy} onClick=${() => setCmy(true)}>The CMY Cube<//><span className="fm4-lbl" style=${{ width: '100%', margin: 0 }}>Tap a corner</span></div></figure>`;
  }

  /* ── L8 slide 36: additive v. subtractive colours ── */
  function AddSub({ ar }) {
    const [sub, setSub] = useState(false), [on, setOn] = useState([true, true, true]);
    const P = [[180, 112], [128, 202], [232, 202]], R = 84;
    const add = { names: ['Red', 'Blue', 'Green'], cols: ['#ff0000', '#0000ff', '#00ff00'], pair: { '01': 'Magenta', '02': 'Yellow', '12': 'Cyan' }, all: 'White', bg: '#000' };
    const sb = { names: ['Cyan', 'Magenta', 'Yellow'], cols: ['#00ffff', '#ff00ff', '#ffff00'], pair: { '01': 'Blue', '02': 'Green', '12': 'Red' }, all: 'Black', bg: '#fff' };
    const M = sub ? sb : add;
    const LBL = { 0: [180, 64], 1: [94, 236], 2: [266, 236], '01': [136, 146], '02': [224, 146], '12': [180, 250], all: [180, 184] };
    const halo = { paintOrder: 'stroke', stroke: '#000', strokeWidth: 4, fill: '#fff' };
    const T = (k, s) => html`<text key=${k} x=${LBL[k][0]} y=${LBL[k][1]} textAnchor="middle" fontSize="16" style=${halo}>${s}</text>`;
    const ids = [0, 1, 2].filter(i => on[i]);
    const pairs = ['01', '02', '12'].filter(k => on[+k[0]] && on[+k[1]]);
    const sum = ids.length === 3 ? M.names.join(' + ') + ' = ' + M.all : pairs.length ? M.names[+pairs[0][0]] + ' + ' + M.names[+pairs[0][1]] + ' = ' + M.pair[pairs[0]] : ids.length ? M.names[ids[0]] : 'nothing';
    const en = (sub ? '<b>Subtractive</b> (CMY, inks on paper: pigments absorb colours). ' : '<b>Additive</b> (RGB, light). ') + 'Turn the circles on and off: <b>' + sum + '</b>.';
    const a = (sub ? '<b>Subtractive</b> (الـ CMY، حبر على ورق: الـ pigments بتمتص ألوان). ' : '<b>Additive</b> (الـ RGB، نور). ') + 'شغّل واطفي الدواير: <b>' + sum + '</b>.';
    return html`<figure className="fig fm4"><div className="fig-stage">
      <svg viewBox="0 0 360 310" role="img" aria-label="Combinations of additive and subtractive colours" className="fm4-circ">
        <g style=${{ isolation: 'isolate' }}><rect x="0" y="0" width="360" height="310" rx="10" fill=${M.bg} />
          ${P.map((p, i) => html`<circle key=${i} cx=${p[0]} cy=${p[1]} r=${R} fill=${M.cols[i]} stroke=${sub ? '#666' : '#444'} strokeWidth="1" className="fade" style=${{ mixBlendMode: sub ? 'multiply' : 'screen', opacity: on[i] ? 1 : 0 }} />`)}</g>
        ${ids.map(i => T(i, M.names[i]))}${pairs.map(k => T(k, M.pair[k]))}${ids.length === 3 && T('all', M.all)}
      </svg></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fm4-row"><${Btn} on=${!sub} onClick=${() => setSub(false)}>Additive<//><${Btn} on=${sub} onClick=${() => setSub(true)}>Subtractive<//></div>
      <div className="fm4-row">${M.names.map((n, i) => html`<${Btn} key=${n} on=${on[i]} onClick=${() => setOn(on.map((v, j) => j === i ? !v : v))}>${n}<//>`)}</div></figure>`;
  }

  /* ── L8 slide 41: types of colour video signals ── */
  function VideoSignals({ ar }) {
    const steps = [
      { en: '<b>Component video</b>: each primary is sent as a <b>separate</b> video signal. The primaries can be RGB or a luminance-chrominance transformation of them (e.g. YIQ, YUV). Best colour reproduction, but it requires more bandwidth and good synchronisation of the three components.', ar: 'الـ <b>Component video</b>: كل primary بيتبعت كـ video signal <b>لوحده</b>. الـ primaries ممكن تكون RGB أو luminance-chrominance transformation ليهم (زي YIQ و YUV). أحسن colour reproduction، بس محتاج bandwidth أكتر و synchronisation كويس للـ 3 components.' },
      { en: '<b>Composite video</b>: colour (chrominance) and luminance signals are <b>mixed into a single carrier wave</b>. Some interference between the two signals is inevitable.', ar: 'الـ <b>Composite video</b>: الـ chrominance والـ luminance <b>بيتخلطوا في carrier wave واحدة</b>. شوية interference بين الـ 2 signals لازم يحصل.' },
      { en: '<b>S-Video</b> (Separated video, e.g. in S-VHS): a compromise between component analog video and composite video. It uses <b>two lines</b>, one for luminance and another for the composite chrominance signal.', ar: 'الـ <b>S-Video</b> (Separated video، زي في الـ S-VHS): حل وسط بين الـ component analog video والـ composite video. بيستخدم <b>خطين</b>: واحد للـ luminance والتاني للـ composite chrominance signal.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const dash = c => ({ backgroundImage: `repeating-linear-gradient(90deg, ${c} 0 18px, transparent 18px 28px)` });
    const mix = { backgroundImage: 'repeating-linear-gradient(90deg, #888 0 6px, #e11d48 6px 9px, #888 9px 14px, #2563eb 14px 18px, #888 18px 22px, #16a34a 22px 25px, transparent 25px 28px)' };
    const W = (lab, st) => html`<div className="fm4-wire"><span>${lab}</span><i style=${st}></i></div>`;
    return html`<figure className="fig fm4"><div className="fig-stage"><div className="fm4-sig">
      <div className=${'card' + (i === 0 ? ' on' : '')}><strong>Component video (3 signals)</strong>${W('R (or Y)', dash('#e11d48'))}${W('G (or I / U)', dash('#16a34a'))}${W('B (or Q / V)', dash('#2563eb'))}</div>
      <div className=${'card' + (i === 1 ? ' on' : '')}><strong>Composite video (1 signal)</strong>${W('Chrominance + luminance', mix)}</div>
      <div className=${'card' + (i === 2 ? ' on' : '')}><strong>S-Video (2 lines)</strong>${W('Luminance', dash('#888'))}${W('Composite chrominance', dash('#c026d3'))}</div>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 slides 42 to 44: NTSC and PAL ── */
  const STD = {
    NTSC: { lines: 525, fps: '30 (exactly 29.97)', ms: '33.37 ms', field: '262.5', model: 'YIQ', form: 'Composite = Y + I cos(Fsc t) + Q sin(Fsc t)', bw: [['Y', 4], ['I', 1.5], ['Q', 0.6]] },
    PAL: { lines: 625, fps: '25', ms: '40 ms', field: '312.5', model: 'YUV (YCrCb)', form: 'Composite = Y + 0.492 × U sin(Fsc t) + 0.877 × V cos(Fsc t)', bw: [['Y', 5.5], ['U', 1.8], ['V', 1.8]] }
  };
  function NtscPal({ ar }) {
    const [k, setK] = useState('NTSC'), [tick, setTick] = useState(calm() ? 15 : 0);
    useEffect(() => { if (calm()) return; const id = setInterval(() => setTick(t => (t + 1) % 22), 160); return () => clearInterval(id); }, []);
    const s = STD[k], N = 16, order = [0, 2, 4, 6, 8, 10, 12, 14, 1, 3, 5, 7, 9, 11, 13, 15];
    const shown = Math.min(N, tick + 1);
    const BW = (lab, v, max, col) => html`<div className="b" key=${lab}><span>${lab}</span><div><span style=${{ width: (v / max * 100) + '%', background: col }}>${v}</span></div></div>`;
    const en = k === 'NTSC'
      ? '<b>NTSC</b>: 525 scan lines per frame, 30 frames per second (exactly 29.97 fps, 33.37 msec/frame), aspect ratio 4:3, <b>interlaced</b>: each frame is 2 fields of 262.5 lines (field 1 draws, then field 2 fills the gaps). 20 lines per field are reserved for control information, so at most <b>485</b> visible lines. Colour: YIQ, and the eye is most sensitive to Y, next to I, next to Q, so 4 MHz to Y, 1.5 MHz to I, 0.6 MHz to Q: this is STILL analog compression. Fsc is the frequency of the colour subcarrier.'
      : '<b>PAL</b>: 625 scan lines per frame, 25 frames per second (40 msec/frame), aspect ratio 4:3, <b>interlaced</b>: each frame is 2 fields of 312.5 lines. Colour: YUV (YCrCb). PAL analog video compression: 5.5 MHz is allocated to Y, 1.8 MHz each to U and V.';
    const a = k === 'NTSC'
      ? 'الـ <b>NTSC</b>: 525 scan line في الـ frame، و 30 frame في الثانية (بالظبط 29.97 fps يعني 33.37 msec للـ frame)، والـ aspect ratio 4:3، و <b>interlaced</b>: كل frame عبارة عن 2 fields كل واحد 262.5 line (الـ field 1 يترسم وبعدين الـ field 2 يملا الفراغات). فيه 20 line في كل field محجوزين للـ control information، فأقصى حاجة <b>485</b> line ظاهرين. الألوان: YIQ، والعين أحسّ حاجة للـ Y وبعدين الـ I وبعدين الـ Q، فـ 4 MHz للـ Y و 1.5 MHz للـ I و 0.6 MHz للـ Q: ده لسه analog compression. الـ Fsc هو تردد الـ colour subcarrier.'
      : 'الـ <b>PAL</b>: 625 scan line في الـ frame، و 25 frame في الثانية (40 msec للـ frame)، والـ aspect ratio 4:3، و <b>interlaced</b>: كل frame عبارة عن 2 fields كل واحد 312.5 line. الألوان: YUV (YCrCb). الـ PAL analog video compression: 5.5 MHz للـ Y و 1.8 MHz لكل واحد من الـ U والـ V.';
    return html`<figure className="fig fm4"><div className="fig-stage">
      <div className="fm4-std">
        <div><svg viewBox="0 0 240 180" role="img" aria-label="An interlaced frame: field 1 lines then field 2 lines (drawn with 16 lines instead of all of them)" style=${{ width: '100%', height: 'auto', display: 'block' }}>
          <rect x="1" y="1" width="238" height="178" rx="6" fill="var(--paper)" stroke="var(--line)" strokeWidth="2" />
          ${order.slice(0, shown).map(j => html`<line key=${j} x1="14" x2="226" y1=${12 + j * 10.4} y2=${12 + j * 10.4} stroke=${j % 2 ? 'var(--pen)' : 'var(--k-mm)'} strokeWidth="4" strokeLinecap="round" />`)}
        </svg>
        <div className="fm4-leg"><span><i style=${{ background: 'var(--k-mm)' }}></i>Field 1</span><span><i style=${{ background: 'var(--pen)' }}></i>Field 2</span><span>(16 lines drawn, 4:3)</span></div></div>
        <dl><dt>Scan lines</dt><dd>${s.lines} per frame</dd><dt>Frames/s</dt><dd>${s.fps}</dd><dt>Per frame</dt><dd>${s.ms}</dd><dt>Aspect ratio</dt><dd>4:3</dd><dt>Interlaced</dt><dd>2 fields, ${s.field} lines/field</dd><dt>Colour model</dt><dd>${s.model}</dd></dl>
      </div>
      <p className="fm4-form">${s.form}</p>
      <div className="fm4-bars">
        <div className="t">Bandwidth (MHz)</div>
        ${s.bw.map(([l, v], j) => BW(l, v, 5.5, j ? 'var(--s-mm)' : '#4B5563'))}
        ${k === 'NTSC' && html`<div className="t">Lines (NTSC)</div>
          <div className="b"><span>Per frame</span><div><span style=${{ width: (40 / 525 * 100) + '%', background: '#4B5563' }}>40</span><span style=${{ width: (485 / 525 * 100) + '%', background: 'var(--s-mm)', justifyContent: 'flex-start' }}>485 visible max</span></div></div>
          <div className="fm4-note" style=${{ margin: '0 0 2px' }}>2 fields × 20 control lines = 40, so 525 − 40 = 485.</div>
          <div className="b"><span>Laser disc, S-VHS</span><div><span style=${{ width: (420 / 525 * 100) + '%', background: 'var(--s-mm)' }}>≈420</span></div></div>
          <div className="b"><span>Ordinary TV</span><div><span style=${{ width: (320 / 525 * 100) + '%', background: 'var(--s-mm)' }}>≈320</span></div></div>`}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fm4-row"><${Btn} on=${k === 'NTSC'} onClick=${() => setK('NTSC')}>NTSC<//><${Btn} on=${k === 'PAL'} onClick=${() => setK('PAL')}>PAL<//><button className="fig-btn" onClick=${() => setTick(0)}>↻ Replay fields</button></div></figure>`;
  }

  /* ── L8 slide 50: chroma subsampling examples (sample layout) ── */
  function ChromaLayout({ ar }) {
    const steps = [
      { en: '<b>4:4:4</b>: no subsampling in any band, equal ratios. Every pixel keeps all three samples: R0 to R3, G0 to G3, B0 to B3 (12 samples for 4 pixels).', ar: '<b>4:4:4</b>: مفيش subsampling في أي band، النسب متساوية. كل pixel محتفظ بالـ 3 samples: من R0 لـ R3 ومن G0 لـ G3 ومن B0 لـ B3 (12 sample لكل 4 pixels).' },
      { en: '<b>4:2:2</b>: the two chroma components are sampled at half the sample rate of luma: Y0 to Y3, but one Cb and one Cr per row of 2 pixels. Horizontal chroma resolution halved (8 samples for 4 pixels).', ar: '<b>4:2:2</b>: الـ 2 chroma components بيتعملهم sampling بنص الـ sample rate بتاع الـ luma: Y0 لـ Y3، بس Cb واحد و Cr واحد لكل صف فيه 2 pixels. الـ horizontal chroma resolution بقت النص (8 samples لكل 4 pixels).' },
      { en: '<b>4:1:1</b>: horizontally subsampled by a factor of 4: Y0 to Y7, with one Cb and one Cr per row of 4 pixels (12 samples for 8 pixels, i.e. 6 for 4).', ar: '<b>4:1:1</b>: subsampling أفقي بمعامل 4: من Y0 لـ Y7، و Cb واحد و Cr واحد لكل صف فيه 4 pixels (12 sample لكل 8 pixels، يعني 6 لكل 4).' },
      { en: '<b>4:2:0</b>: subsampled by a factor of 2 in both the horizontal and vertical axes: Y0 to Y3 with a single Cb and a single Cr for the whole 2×2 block (6 samples for 4 pixels).', ar: '<b>4:2:0</b>: subsampling بمعامل 2 في الاتجاه الأفقي والرأسي الاتنين: Y0 لـ Y3 و Cb واحد و Cr واحد للـ 2×2 block كله (6 samples لكل 4 pixels).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const sub = (L, n) => html`${L}<sub>${n}</sub>`;
    const blk = (cols, cells, cls) => html`<div className="blk" style=${{ gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: (cols * 38) + 'px' }}>${cells.map((c, j) => html`<span key=${j} className=${cls || ''} style=${c.span ? { gridColumn: 'span ' + c.span, gridRow: c.rows ? 'span ' + c.rows : null, padding: c.rows ? '18px 0' : null } : null}>${c.t}</span>`)}</div>`;
    const Ys = n => Array.from({ length: n }, (_, j) => ({ t: sub('Y', j) }));
    const C = (L, n, span, rows) => Array.from({ length: n }, () => ({ t: sub('C', L), span, rows }));
    const cols = [
      ['4:4:4', [blk(2, [0, 1, 2, 3].map(j => ({ t: sub('R', j) }))), blk(2, [0, 1, 2, 3].map(j => ({ t: sub('G', j) }))), blk(2, [0, 1, 2, 3].map(j => ({ t: sub('B', j) })))], '12 per 4 pixels'],
      ['4:2:2', [blk(2, Ys(4)), blk(2, C('B', 2, 2), 'c'), blk(2, C('R', 2, 2), 'c')], '8 per 4 pixels'],
      ['4:1:1', [blk(4, Ys(8)), blk(4, C('B', 2, 4), 'c'), blk(4, C('R', 2, 4), 'c')], '6 per 4 pixels'],
      ['4:2:0', [blk(2, Ys(4)), blk(2, C('B', 1, 2, 2), 'c'), blk(2, C('R', 1, 2, 2), 'c')], '6 per 4 pixels']
    ];
    return html`<figure className="fig fm4"><div className="fig-stage"><div className="fm4-lay">
      ${cols.map((c, j) => html`<div key=${j} className=${'col' + (j === i ? ' on' : '')}><strong>${c[0]}</strong>${c[1]}<div className="n">${c[2]}</div></div>`)}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 slides 49, 51, 52, 53: where chroma is sampled, and what it does to an image ── */
  const GN = 8, PAL4 = [[220, 90, 80], [235, 200, 90], [80, 120, 200], [90, 170, 110]];
  const IMG = Array.from({ length: GN }, (_, r) => Array.from({ length: GN }, (_, c) => PAL4[Math.floor((r + c) / 4) % 4]));
  function subsample(s) {
    const Yv = IMG.map(row => row.map(p => ycc(...p)));
    return Yv.map((row, r) => row.map((v, c) => {
      let cb, cr;
      if (s === '4:4:4') { cb = v.Cb; cr = v.Cr; }
      else if (s === '4:2:2') { const q = Yv[r][c - c % 2]; cb = q.Cb; cr = q.Cr; }
      else if (s === '4:1:1') { const q = Yv[r][c - c % 4]; cb = q.Cb; cr = q.Cr; }
      else { const r0 = r - r % 2, c0 = c - c % 2, B = [Yv[r0][c0], Yv[r0][c0 + 1], Yv[r0 + 1][c0], Yv[r0 + 1][c0 + 1]]; cb = B.reduce((x, q) => x + q.Cb, 0) / 4; cr = B.reduce((x, q) => x + q.Cr, 0) / 4; }
      const R = v.Y + 1.402 * cr, Bb = v.Y + 1.772 * cb, G = (v.Y - 0.299 * R - 0.114 * Bb) / 0.587;
      return [R, G, Bb];
    }));
  }
  function ChromaGrid({ ar }) {
    const [s, setS] = useState('4:2:2');
    const out = subsample(s), Z = 40;
    const dots = [];
    for (let r = 0; r < GN; r++) for (let c = 0; c < GN; c++) {
      dots.push(html`<circle key=${'y' + r + c} cx=${c * Z + Z / 2} cy=${r * Z + Z / 2} r="4" fill="#555" stroke="#fff" strokeWidth="1" />`);
      if (s === '4:4:4' || (s === '4:2:2' && c % 2 === 0) || (s === '4:1:1' && c % 4 === 0)) dots.push(html`<circle key=${'c' + r + c} cx=${c * Z + Z / 2} cy=${r * Z + Z / 2} r="6.5" fill="#1d4ed8" stroke="#fff" strokeWidth="1.5" />`);
      if (s === '4:2:0' && r % 2 === 0 && c % 2 === 0) dots.push(html`<circle key=${'c' + r + c} cx=${c * Z + Z} cy=${r * Z + Z} r="7" fill="#1d4ed8" stroke="#fff" strokeWidth="1.5" />`);
    }
    const grid = (px, extra) => html`<svg viewBox=${`0 0 ${GN * Z} ${GN * Z}`} role="img" aria-label="8 by 8 pixel image">${px.map((row, r) => row.map((p, c) => html`<rect key=${r + '-' + c} x=${c * Z} y=${r * Z} width=${Z} height=${Z} fill=${rgbs(...p)} stroke="rgba(0,0,0,.25)" strokeWidth="1" />`))}${extra}</svg>`;
    const INFO = {
      '4:4:4': { d: [['4', 'Luma (Y): horizontal sampling reference'], ['4', 'Cr: horizontal factor 4 (relative to the first digit): every pixel'], ['4', 'Cb: horizontal factor 4: every pixel']], m: 'No subsampling: Cr and Cb kept at full size.', en: '<b>4:4:4</b>: no subsampling in any band. A chroma sample (blue) on every pixel, so the result is the same as the original.', ar: '<b>4:4:4</b>: مفيش subsampling في أي band. فيه chroma sample (الأزرق) على كل pixel، فالنتيجة زي الأصل بالظبط.' },
      '4:2:2': { d: [['4', 'Luma (Y): horizontal sampling reference'], ['2', 'Cr: horizontal factor 2 of 4: every second pixel'], ['2', 'Cb: horizontal factor 2 of 4: every second pixel']], m: "On U/I and V/Q: B = IMRESIZE(A,[MROWS MCOLS],'nearest')\nwith MCOLS = half the image width", en: '<b>4:2:2</b>: choose every second pixel value along each row (1×2 subsampling). Each pixel keeps its own Y, so edges stay sharp in brightness; only the colour spreads a little.', ar: '<b>4:2:2</b>: ناخد قيمة كل تاني pixel في كل صف (1×2 subsampling). كل pixel محتفظ بالـ Y بتاعه، فالـ edges فاضلة حادة في الـ brightness؛ اللون بس اللي بيسيح شوية.' },
      '4:1:1': { d: [['4', 'Luma (Y): horizontal sampling reference'], ['1', 'Cr: horizontal factor 1 of 4: every fourth pixel'], ['1', 'Cb: horizontal factor 1 of 4: every fourth pixel']], m: "On U/I and V/Q: B = IMRESIZE(A,[MROWS MCOLS],'nearest')\nwith MCOLS = a quarter of the image width", en: '<b>4:1:1</b>: horizontally subsampled by a factor of 4: choose every fourth pixel value along each row (1×4 subsampling).', ar: '<b>4:1:1</b>: subsampling أفقي بمعامل 4: ناخد قيمة كل رابع pixel في كل صف (1×4 subsampling).' },
      '4:2:0': { d: [['4', 'Luma (Y): horizontal sampling reference'], ['2', 'Cr: horizontal factor 2 of 4'], ['0', 'Zero: Cb horizontal factor equals the second digit, and both Cr and Cb are subsampled 2:1 vertically']], m: "On U/I and V/Q: B = IMRESIZE(A,0.5,'bilinear')\n(bilinear to average, scale set to half)", en: '<b>4:2:0</b>: Cr and Cb are effectively centred vertically halfway between image rows: break the image into 2×2 pixel blocks and store the <b>average</b> colour information for each 2×2 pixel group.', ar: '<b>4:2:0</b>: الـ Cr والـ Cb بيبقوا في النص رأسياً بين صفوف الصورة: نقسم الصورة لـ 2×2 pixel blocks ونخزن <b>متوسط</b> معلومات اللون لكل 2×2 pixel group.' }
    }[s];
    const extraEn = ' Grey dots: luma (Y) samples; blue dots: chroma (Cr, Cb) samples. The HVS is more sensitive to brightness than colour, so the reduction gives almost no perceivable visual difference.';
    const extraAr = ' النقط الرمادي: luma (Y) samples؛ والزرقا: chroma (Cr و Cb) samples. الـ HVS حساس للـ brightness أكتر من اللون، فالتقليل ده تقريباً مش باين للعين.';
    return html`<figure className="fig fm4"><div className="fig-stage">
      <div className="fm4-two"><div><p className="fm4-lbl">Sample positions</p>${grid(IMG, dots)}</div><div><p className="fm4-lbl">Result after ${s}</p>${grid(out, null)}</div></div>
      <div className="fm4-ratio">${INFO.d.map((d, j) => html`<div key=${j}><span>${d[0]}</span><span>${d[1]}</span></div>`)}</div>
      <div className="fm4-code">MATLAB (slide 53): ${INFO.m}</div></div>
      <${Cap} en=${INFO.en + extraEn} ar=${INFO.ar + extraAr} showAr=${ar} />
      <div className="fm4-row">${['4:4:4', '4:2:2', '4:1:1', '4:2:0'].map(k => html`<${Btn} key=${k} on=${s === k} onClick=${() => setS(k)}>${k}<//>`)}</div></figure>`;
  }

  /* ── L8 slide 56: aliasing in images (stair-stepping, image zooming) ── */
  function StairZoom({ ar }) {
    const [n, setN] = useState(1);
    const W = 200, H = 120, N = 16 / n, cw = W / N, rows = Math.round(H / cw);
    const yAt = x => H - 6 - x * 0.5; // the slanted edge
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < N; c++) { const xc = (c + .5) * cw, yc = (r + .5) * cw; if (yc > yAt(xc)) cells.push(html`<rect key=${r + '-' + c} x=${c * cw} y=${r * cw} width=${cw} height=${cw} fill="var(--ink)" />`); }
    const gridL = []; for (let c = 0; c <= N; c++) gridL.push(html`<line key=${'v' + c} x1=${c * cw} x2=${c * cw} y1="0" y2=${rows * cw} stroke="var(--faint)" strokeWidth="1" />`); for (let r = 0; r <= rows; r++) gridL.push(html`<line key=${'h' + r} x1="0" x2=${W} y1=${r * cw} y2=${r * cw} stroke="var(--faint)" strokeWidth="1" />`);
    const pane = (body, lab) => html`<div><p className="fm4-lbl">${lab}</p><svg viewBox=${`0 0 ${W} ${H}`} role="img" aria-label=${lab}><rect width=${W} height=${H} fill="var(--paper)" />${body}${gridL}</svg></div>`;
    const en = `<b>Stair-stepping</b>: stepped or jagged edges of angled lines, e.g. at the slanted edges of letters. <b>Image zooming</b> (digital zoom on cameras, digital scanning): zooming in by a factor n divides the sample resolution by n. Here n = ${n}: ${N} samples across. Explanation: simply application of Nyquist's Sampling Theorem.`;
    const a = `الـ <b>Stair-stepping</b>: حواف متدرجة أو مسننة للخطوط المايلة، زي الحواف المايلة للحروف. الـ <b>Image zooming</b> (الـ digital zoom في الكاميرات أو الـ digital scanning): لما تعمل zoom in بمعامل n بتقسم الـ sample resolution على n. هنا n = ${n}: ${N} samples بالعرض. التفسير: ببساطة تطبيق لـ Nyquist's Sampling Theorem.`;
    return html`<figure className="fig fm4"><div className="fig-stage"><div className="fm4-two">
      ${pane(html`<polygon points=${`0,${yAt(0)} ${W},${yAt(W)} ${W},${H} 0,${H}`} fill="var(--ink)" />`, 'The angled edge')}
      ${pane(cells, 'Sampled on the pixel grid')}
    </div></div><${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fm4-row"><span className="fm4-lbl" style=${{ margin: 0, alignSelf: 'center' }}>Zoom in by n =</span>${[1, 2, 4].map(v => html`<${Btn} key=${v} on=${n === v} onClick=${() => setN(v)}>${v}<//>`)}</div></figure>`;
  }

  /* ── L8 slides 57 to 62: temporal aliasing, the wagon wheel ── */
  const RATE = { below: 337.5, at: 180, above: 22.5 }; // degrees the wheel turns between two video frames
  const Wheel = ({ a }) => html`<svg viewBox="0 0 200 200" aria-hidden="true"><rect width="200" height="200" fill="#000" />
    <g transform=${`rotate(${a} 100 100)`}><circle cx="100" cy="100" r="82" fill="none" stroke="#fff" strokeWidth="11" />
      ${[1, 2, 3, 4, 5, 6, 7].map(j => html`<line key=${j} x1="100" y1="100" x2=${100 + 82 * Math.sin(j * Math.PI / 4)} y2=${100 - 82 * Math.cos(j * Math.PI / 4)} stroke="#fff" strokeWidth="9" />`)}
      <line x1="100" y1="100" x2="100" y2="14" stroke="#e5261a" strokeWidth="11" /></g></svg>`;
  function WagonWheel({ ar }) {
    const [rate, setRate] = useState('below'), [run, setRun] = useState(!calm());
    const [st, setSt] = useState({ real: 0, frames: [0], n: 1 });
    const acc = useRef({ real: 0, since: 0 });
    useEffect(() => { acc.current = { real: 0, since: 0 }; setSt({ real: 0, frames: [0], n: 1 }); }, [rate]);
    useEffect(() => {
      if (!run) return; let raf, last = performance.now();
      const loop = now => { const dt = Math.min(.1, (now - last) / 1000); last = now; const A = acc.current, d = 360 * dt; A.real += d; A.since += d; let took = false;
        while (A.since >= RATE[rate]) { A.since -= RATE[rate]; took = true; setSt(s => ({ real: A.real, frames: s.frames.concat((A.real - A.since) % 360).slice(-5), n: s.n + 1 })); }
        if (!took) setSt(s => Object.assign({}, s, { real: A.real })); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
    }, [run, rate]);
    const next = () => { setRun(false); const A = acc.current; A.real += RATE[rate] - A.since; A.since = 0; setSt(s => ({ real: A.real, frames: s.frames.concat(A.real % 360).slice(-5), n: s.n + 1 })); };
    const slide62 = () => { setRun(false); setRate('below'); setTimeout(() => { const f = [0, 1, 2, 3, 4].map(j => (j * 337.5) % 360); acc.current = { real: 4 * 337.5, since: 0 }; setSt({ real: 4 * 337.5, frames: f, n: 5 }); }, 0); };
    const shown = st.frames[st.frames.length - 1], first = st.n - st.frames.length + 1;
    const T = {
      below: ['<b>Sampling below the Nyquist video sample rate</b>: between two frames the wheel turns almost a whole turn (337.5°), so each frame catches the red spoke 22.5° short of where it was: the video shows the wheel turning <b>backwards</b>. This is the <b>strobing effect</b>: the incorrect sampling rate "freezes" the frames at the wrong moment (slide 62: Frame 1 to Frame 5).', 'الـ <b>Sampling أقل من الـ Nyquist video sample rate</b>: بين كل 2 frames العجلة بتلف تقريباً لفة كاملة (337.5°)، فكل frame بيمسك الـ spoke الأحمر ورا مكانه بـ 22.5°: الفيديو يبيّن العجلة بتلف <b>بالعكس</b>. ده الـ <b>strobing effect</b>: الـ sampling rate الغلط بيـ"جمّد" الـ frames في اللحظة الغلط (slide 62: من Frame 1 لـ Frame 5).'],
      at: ['<b>Sampling at the Nyquist video sample rate</b>: half a turn (180°) between frames. The red spoke just flips up, down, up: from the frames alone you cannot tell which way the wheel turns.', 'الـ <b>Sampling عند الـ Nyquist video sample rate</b>: نص لفة (180°) بين الـ frames. الـ spoke الأحمر بيقلب فوق، تحت، فوق: من الـ frames لوحدها متقدرش تعرف العجلة بتلف في أنهي اتجاه.'],
      above: ['<b>Sampling above the Nyquist video sample rate</b>: only 22.5° between frames, so the video shows the true motion: the wheel turns forwards (clockwise).', 'الـ <b>Sampling أعلى من الـ Nyquist video sample rate</b>: 22.5° بس بين الـ frames، فالفيديو بيبيّن الحركة الحقيقية: العجلة بتلف لقدام (مع عقارب الساعة).']
    }[rate];
    return html`<figure className="fig fm4"><div className="fig-stage">
      <div className="fm4-wheel"><div><p className="fm4-lbl">Real wheel (clockwise)</p><${Wheel} a=${st.real % 360} /></div><div><p className="fm4-lbl">Video frame ${st.n}</p><${Wheel} a=${shown} /></div></div>
      <div className="fm4-strip">${st.frames.map((f, j) => html`<div key=${j}><${Wheel} a=${f} />Frame ${first + j}</div>`)}</div></div>
      <${Cap} en=${T[0]} ar=${T[1]} showAr=${ar} />
      <div className="fm4-row">${[['below', 'Below Nyquist'], ['at', 'At Nyquist'], ['above', 'Above Nyquist']].map(([k, l]) => html`<${Btn} key=${k} on=${rate === k} onClick=${() => setRate(k)}>${l}<//>`)}</div>
      <div className="fm4-row"><button className="fig-btn" onClick=${() => setRun(!run)}>${run ? '❚❚ Pause' : '▶ Play'}</button><button className="fig-btn" onClick=${next}>Next frame ›</button><button className="fig-btn" onClick=${slide62}>Frames 1 to 5 (slide 62)</button></div></figure>`;
  }

  /* ── L8 slides 63 and 64: interlacing aliasing (and twinkling on sharp horizontal lines) ── */
  function Interlace({ ar }) {
    const steps = [
      { en: 'A full frame: a nearly horizontal line and a sharp one-pixel horizontal line, sampled on every row.', ar: 'frame كامل: خط شبه أفقي وخط أفقي حاد سُمكه pixel واحد، متعملهم sampling على كل صف.' },
      { en: '<b>Interlacing aliasing</b>: some video is interlaced. Field 1 only has every second row, which effectively <b>halves the sampling frequency</b>: the slanted line now steps in bigger jumps.', ar: 'الـ <b>Interlacing aliasing</b>: فيه video بيبقى interlaced. الـ field 1 فيه كل تاني صف بس، وده عملياً <b>بيقسم الـ sampling frequency على 2</b>: الخط المايل بقى بيتدرج بقفزات أكبر.' },
      { en: 'Field 2 has the other rows: the same line is drawn with different steps, and the sharp one-pixel horizontal line is <b>missing</b> from this field.', ar: 'الـ field 2 فيه باقي الصفوف: نفس الخط بيترسم بدرجات مختلفة، والخط الأفقي الحاد اللي سُمكه pixel واحد <b>مش موجود</b> في الـ field ده.' },
      { en: 'Shown one field after the other, the steps jump and the sharp horizontal line appears in one field only: the <b>twinkling or strobing</b> effect on sharp horizontal lines (raster scan aliasing, slide 63). Explanation: simply application of Nyquist\'s Sampling Theorem.', ar: 'لما الـ fields تتعرض ورا بعض، الدرجات بتنط والخط الأفقي الحاد بيظهر في field واحد بس: ده الـ <b>twinkling أو strobing</b> effect على الخطوط الأفقية الحادة (الـ raster scan aliasing، slide 63). التفسير: ببساطة تطبيق لـ Nyquist\'s Sampling Theorem.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const [f, setF] = useState(0);
    useEffect(() => { if (i !== 3 || calm()) return; const id = setInterval(() => setF(x => 1 - x), 450); return () => clearInterval(id); }, [i]);
    const C = 24, R = 12, Z = 16, yLine = x => 8.6 - x * 0.22, HROW = 10;
    const field = i === 0 ? -1 : i === 1 ? 0 : i === 2 ? 1 : f;
    const lit = []; const rowsOk = r => field < 0 || r % 2 === field;
    for (let c = 0; c < C; c++) { const y = yLine(c + .5); let r = Math.round(y - .5); if (!rowsOk(r)) { const up = r - 1, dn = r + 1; r = Math.abs(up + .5 - y) < Math.abs(dn + .5 - y) ? up : dn; } lit.push([r, c]); if (rowsOk(HROW)) lit.push([HROW, c]); }
    return html`<figure className="fig fm4"><div className="fig-stage">
      <svg viewBox=${`0 0 ${C * Z} ${R * Z}`} role="img" aria-label="Pixel grid showing interlaced fields" style=${{ maxWidth: '440px' }}>
        <rect width=${C * Z} height=${R * Z} fill="var(--paper)" />
        ${Array.from({ length: R }, (_, r) => html`<rect key=${'r' + r} x="0" y=${r * Z} width=${C * Z} height=${Z} fill=${rowsOk(r) ? 'transparent' : 'var(--faint)'} opacity=".3" />`)}
        ${lit.map(([r, c], j) => html`<rect key=${j} x=${c * Z} y=${r * Z} width=${Z} height=${Z} fill="var(--ink)" />`)}
        ${Array.from({ length: R + 1 }, (_, r) => html`<line key=${'h' + r} x1="0" x2=${C * Z} y1=${r * Z} y2=${r * Z} stroke="var(--faint)" strokeWidth=".6" />`)}
      </svg>
      <p className="fm4-lbl" style=${{ marginTop: '6px' }}>${field < 0 ? 'Full frame (all rows)' : 'Field ' + (field + 1) + ' (shaded rows not sampled)'}</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-ycrcb-lab': YcrcbLab, 'mm-cmy-cubes': CmyCubes, 'mm-add-sub': AddSub, 'mm-cmyk-lab': CmykLab,
    'mm-video-signals': VideoSignals, 'mm-ntsc-pal': NtscPal, 'mm-chroma-layout': ChromaLayout, 'mm-chroma-grid': ChromaGrid,
    'mm-stair-zoom': StairZoom, 'mm-wagon-wheel': WagonWheel, 'mm-interlace': Interlace
  });
})();
/* ── part L2 ── */
// Multimedia visuals, Lecture 2 (DSP, Filters and the Fourier Transform): sine waves, dB, signal flow graphs, IIR/FIR, the Fourier transform and DFT, frequency-domain filtering, convolution (slides 3–108). Every label and number comes from the site's notes or is computed with the course's formulas.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mv2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mv2 .fig-btn.mv2-sel{ border-color:var(--k-mm); box-shadow:0 0 0 1px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.fig-stage svg.mv2-s{ max-width:460px; }
.mv2 svg text{ font-family:var(--body); }
.mv2 svg text.mv2-kt{ fill:var(--k-mm); font-weight:700; }
.mv2 svg text.mv2-gt{ fill:var(--graphite); }
.mv2 svg text.mv2-pt{ fill:var(--pen); font-weight:700; }
.mv2 svg text.mv2-ot{ fill:var(--ok); font-weight:700; }
.mv2 svg text.mv2-mono{ font-family:var(--mono); }
.mv2-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.mv2-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.mv2-sl{ display:grid; grid-template-columns:minmax(0, auto) minmax(0, 1fr) auto; gap:8px; align-items:center; max-width:440px; margin:4px auto; font-size:.86rem; color:var(--ink); }
.mv2-sl input{ width:100%; min-width:0; accent-color:var(--k-mm); }
.mv2-sl output{ font:700 .88rem var(--mono); min-width:3.4em; text-align:right; color:var(--k-mm); }
.mv2-out{ text-align:center; font-size:.9rem; line-height:1.5; color:var(--ink); margin:8px auto 0; max-width:520px; overflow-wrap:anywhere; }
.mv2-v, .mv2-k{ font-family:var(--mono); font-weight:700; color:var(--k-mm); }
.mv2-r{ color:var(--pen); font-weight:700; } .mv2-g{ color:var(--ok); font-weight:700; } .mv2-m{ color:var(--graphite); }
.mv2-pl{ font-size:.82rem; font-weight:600; color:var(--graphite); margin:8px auto 2px; max-width:460px; }
.mv2-calc{ max-width:520px; margin:10px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font:500 .84rem/1.6 var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.mv2-calc .mv2-res, .mv2-calc.mv2-res{ color:var(--k-mm); font-weight:700; } .mv2-calc .mv2-note{ font-family:var(--body); color:var(--graphite); font-size:.82rem; }
.mv2-calc .err{ color:var(--pen); font-weight:700; font-family:var(--body); }
.mv2-form{ display:grid; grid-template-columns:repeat(auto-fit, minmax(84px, 1fr)); gap:8px; max-width:460px; margin:0 auto 8px; font-size:.82rem; color:var(--ink); }
.mv2-form label{ display:grid; gap:3px; font-weight:600; min-width:0; }
.mv2-form input{ box-sizing:border-box; min-width:0; width:100%; font:inherit; font-weight:400; font-size:.92rem; padding:5px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.mv2-form input:focus{ outline:2px solid var(--k-mm); outline-offset:1px; }
.mv2-form.wide{ grid-template-columns:1fr; }
.mv2-tbl{ border-collapse:collapse; width:100%; max-width:460px; margin:8px auto 0; font-size:.82rem; color:var(--ink); }
.mv2-tbl th, .mv2-tbl td{ border:1px solid var(--line); padding:4px 4px; text-align:center; }
.mv2-tbl th{ background:var(--paper-2); font-weight:600; } .mv2-tbl td{ background:var(--paper); font-family:var(--mono); }
.mv2-tbl tr.on td{ background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); font-weight:700; }
.mv2-tbl tr.pick{ cursor:pointer; } .mv2-tbl tr.pick:hover td{ background:color-mix(in srgb, var(--k-mm) 9%, var(--paper)); }
.mv2-tbl td.t{ font-family:var(--body); }
.mv2-leg{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.82rem; color:var(--ink); margin:4px 0 0; }
.mv2-leg span{ display:inline-flex; align-items:center; gap:6px; } .mv2-leg i{ display:inline-block; width:18px; height:4px; border-radius:2px; }
.mv2-fx{ font:600 .95rem var(--mono); text-align:center; color:var(--ink); margin:2px 0 8px; overflow-wrap:anywhere; }
.mv2-fx .on{ color:var(--k-mm); text-decoration:underline; text-underline-offset:3px; }
.mv2-fade{ transition:opacity .45s; }
/* bars */
.mv2-trk{ position:relative; height:20px; border-radius:6px; background:var(--paper); border:1px solid var(--line); overflow:hidden; max-width:460px; margin:0 auto; }
.mv2-trk i{ position:absolute; left:0; top:0; bottom:0; background:var(--k-mm); border-radius:5px; transition:width .45s; }
.mv2-trk i.alt{ background:var(--graphite); }
.mv2-tks{ position:relative; height:18px; max-width:460px; margin:2px auto 0; font-size:.82rem; color:var(--graphite); }
.mv2-tks span{ position:absolute; transform:translateX(-50%); white-space:nowrap; }
.mv2-tks span:first-child{ transform:none; } .mv2-tks span:last-child{ transform:translateX(-100%); }
.mv2-bits{ display:grid; grid-template-columns:repeat(12, minmax(0, 1fr)); gap:3px; max-width:440px; margin:0 auto; }
.mv2-bits div{ height:26px; border-radius:4px; display:grid; place-items:center; font:700 .78rem var(--mono); color:var(--ink); border:1px solid var(--line); background:color-mix(in srgb, var(--k-mm) 26%, var(--paper)); }
.mv2-bits div.lsb{ background:color-mix(in srgb, var(--pen) 26%, var(--paper)); }
.mv2-hb{ display:grid; grid-template-columns:62px minmax(0, 1fr) 56px; gap:8px; align-items:center; max-width:460px; margin:6px auto 0; font-size:.84rem; color:var(--ink); }
.mv2-hb b{ font-family:var(--mono); text-align:right; color:var(--k-mm); }
/* EQ */
.mv2-eq{ display:grid; grid-template-columns:repeat(10, minmax(0, 1fr)); gap:3px; max-width:420px; margin:0 auto; padding:8px; border-radius:10px; background:var(--paper); border:1px solid var(--line); }
.mv2-eq .col{ display:grid; grid-template-rows:repeat(6, 15px) auto; gap:2px; }
.mv2-eq button{ border:0; padding:0; border-radius:2px; cursor:pointer; background:var(--line); min-width:0; }
.mv2-eq button.on{ background:var(--k-mm); }
.mv2-eq span{ font:600 .78rem var(--mono); text-align:center; color:var(--ink); margin-top:3px; }
/* images */
.mv2-ims{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:460px; margin:0 auto; }
.mv2-ims.three{ grid-template-columns:repeat(3, minmax(0, 1fr)); }
@media (max-width:420px){ .mv2-ims.three{ grid-template-columns:repeat(2, minmax(0, 1fr)); } }
.mv2-ims figure{ margin:0; min-width:0; transition:opacity .45s; }
.mv2-ims canvas{ width:100%; aspect-ratio:1; display:block; border-radius:6px; border:1px solid var(--line); image-rendering:pixelated; background:#000; }
.mv2-ims figcaption{ font-size:.78rem; line-height:1.3; color:var(--ink); text-align:center; margin-top:3px; }
.mv2-spg{ width:100%; height:150px; display:block; border-radius:6px; border:1px solid var(--line); image-rendering:pixelated; background:#000; }
.mv2 .fig-stage sub, .mv2 .fig-stage sup{ font-size:.92em; }
.mv2-strip i{ display:block; }
.mv2-strip{ display:grid; grid-template-columns:repeat(64, minmax(0, 1fr)); height:26px; max-width:440px; margin:0 auto; border:1px solid var(--line); border-radius:4px; overflow:hidden; }
/* DFT bins */
.mv2-bins{ display:grid; gap:3px; max-width:440px; margin:6px auto 0; align-items:end; }
.mv2-bins button{ font:inherit; border:1px solid var(--line); border-radius:6px; background:var(--paper); padding:2px 0 0; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:70px; min-width:0; color:var(--ink); }
.mv2-bins button i{ display:block; width:60%; background:var(--k-mm); border-radius:2px 2px 0 0; }
.mv2-bins button span{ font:600 .78rem var(--mono); }
.mv2-bins button.mv2-sel{ box-shadow:0 0 0 2px var(--k-mm); }
@media (prefers-reduced-motion: reduce){ .mv2-trk i, .mv2-fade, .mv2-ims figure{ transition:none; } }
`;
  if (!document.getElementById('mv2-css')) { const s = document.createElement('style'); s.id = 'mv2-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers ── */
  const N = (n, f) => Array.from({ length: n }, (_, k) => f(k));
  const rd = (x, d) => { const v = +(+x).toFixed(d); return Object.is(v, -0) ? 0 : v; };
  const fmt = (x, d = 3) => { if (!isFinite(x)) return String(x); const s = rd(x, d).toLocaleString('en-US', { maximumFractionDigits: d, useGrouping: false }); return s.replace(/^-/, '−'); };
  const P2 = Math.PI * 2;
  const pathOf = pts => pts.map((p, k) => (k ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const curve = (f, a, b, n, X, Y) => pathOf(N(n + 1, k => { const t = a + (b - a) * k / n; return [X(t), Y(f(t))]; }));
  const tk = a => a.map(v => Array.isArray(v) ? v : [v, String(v).replace('-', '−')]);
  function frame({ W = 300, H = 140, L = 34, R = 18, T = 10, B = 24, x0, x1, y0, y1 }) {
    const X = x => L + (x - x0) / (x1 - x0) * (W - L - R), Y = y => T + (y1 - y) / (y1 - y0) * (H - T - B);
    return { W, H, L, R, T, B, X, Y, x0, x1, y0, y1 };
  }
  const Axes = ({ F, xt = [], yt = [], zero = true }) => html`<g>
    <path d=${`M${F.L} ${F.T} V${F.H - F.B} H${F.W - F.R}`} stroke="var(--graphite)" strokeWidth="1.2" fill="none" />
    ${zero && F.y0 < 0 && F.y1 > 0 && html`<path d=${`M${F.L} ${F.Y(0)} H${F.W - F.R}`} stroke="var(--faint)" strokeWidth="1" />`}
    ${tk(yt).map(([v, t]) => html`<g key=${'y' + v}><path d=${`M${F.L - 4} ${F.Y(v)} H${F.L}`} stroke="var(--graphite)" /><text x=${F.L - 6} y=${F.Y(v) + 5} textAnchor="end" fontSize="14">${t}</text></g>`)}
    ${tk(xt).map(([v, t]) => html`<g key=${'x' + v}><path d=${`M${F.X(v)} ${F.H - F.B} V${F.H - F.B + 4}`} stroke="var(--graphite)" /><text x=${F.X(v)} y=${F.H - F.B + 19} textAnchor="middle" fontSize="14">${t}</text></g>`)}
  </g>`;
  const Stems = ({ F, d, col = 'var(--k-mm)', hi = -1, show = Infinity, from = 0, r = 3.6 }) => html`<g>${d.map((v, k) => k < show && html`<g key=${k}><path d=${`M${F.X(k + from)} ${F.Y(0)} V${F.Y(v)}`} stroke=${k === hi ? 'var(--pen)' : col} strokeWidth="2" /><circle cx=${F.X(k + from)} cy=${F.Y(v)} r=${k === hi ? r + 1.4 : r} fill=${k === hi ? 'var(--pen)' : col} /></g>`)}</g>`;
  const Sl = ({ label, min, max, step = 1, v, set, out }) => html`<label className="mv2-sl"><span>${label}</span><input type="range" min=${min} max=${max} step=${step} value=${v} onInput=${e => set(+e.target.value)} /><output>${out == null ? v : out}</output></label>`;
  const Chips = ({ items, on, set }) => html`<div className="mv2-row">${items.map(([k, t]) => html`<button key=${k} className=${'fig-btn' + (on === k ? ' mv2-sel' : '')} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Leg = ({ items }) => html`<div className="mv2-leg">${items.map(([c, t], k) => html`<span key=${k}><i style=${{ background: c }}></i>${t}</span>`)}</div>`;
  const marker = (id, c) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`;
  const parseNum = s => { s = String(s).trim().replace(/\s/g, '').replace(/−/g, '-'); if (!s) return NaN; let m = s.match(/^(-?[\d.]+)\^(-?[\d.]+)$/); if (m) return Math.pow(+m[1], +m[2]); m = s.match(/^(-?[\d.]+)\/(-?[\d.]+)$/); if (m) return +m[1] / +m[2]; return Number(s); };
  const parseList = s => String(s).split(/[,\s;]+/).filter(Boolean).map(parseNum);
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  // seeded random numbers so the pictures are the same every time
  const rng = seed => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  // radix-2 FFT in place (MATLAB fft: no 1/N; inverse divides by N)
  function fft(re, im, inv) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = P2 / len * (inv ? 1 : -1), wr = Math.cos(ang), wi = Math.sin(ang);
      for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let j = 0; j < len / 2; j++) { const a = i + j, b = a + len / 2, tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr; re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti; const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr; } }
    }
    if (inv) for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
  }
  function fft2(re, im, S, inv) {
    const r = new Float64Array(S), i = new Float64Array(S);
    for (let y = 0; y < S; y++) { for (let x = 0; x < S; x++) { r[x] = re[y * S + x]; i[x] = im[y * S + x]; } fft(r, i, inv); for (let x = 0; x < S; x++) { re[y * S + x] = r[x]; im[y * S + x] = i[x]; } }
    for (let x = 0; x < S; x++) { for (let y = 0; y < S; y++) { r[y] = re[y * S + x]; i[y] = im[y * S + x]; } fft(r, i, inv); for (let y = 0; y < S; y++) { re[y * S + x] = r[y]; im[y * S + x] = i[y]; } }
  }
  // paint a grey image (values 0..1, clipped) into a canvas
  function paint(c, S, val) { if (!c) return; c.width = S; c.height = S; const g = c.getContext('2d'); if (!g) return; const im = g.createImageData(S, S); for (let k = 0; k < S * S; k++) { const v = Math.max(0, Math.min(255, Math.round(val(k) * 255))); im.data[4 * k] = im.data[4 * k + 1] = im.data[4 * k + 2] = v; im.data[4 * k + 3] = 255; } g.putImageData(im, 0, 0); }
  const Cv = ({ S, val, dep, cap, dim }) => { const ref = useRef(null); useEffect(() => paint(ref.current, S, val), [dep]); return html`<figure style=${{ opacity: dim ? .3 : 1 }}><canvas ref=${ref} width=${S} height=${S}></canvas><figcaption dangerouslySetInnerHTML=${{ __html: cap }}></figcaption></figure>`; };

  /* ════════ [0] Waveforms and the sine wave ════════ */

  /* ── slide 3: frequency, period and wavelength ── */
  function Period({ ar }) {
    const [f, setF] = useState(8);
    const F = frame({ H: 150, L: 22, T: 30, B: 26, x0: 0, x1: 1, y0: -1.15, y1: 1.15 }), T = 1 / f, w = t => Math.sin(P2 * f * t);
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 150" role="img" aria-label=${`A ${f} Hz sine over one second, one period of ${fmt(T, 4)} s highlighted`}>
        <${Axes} F=${F} xt=${[[0, '0'], [0.5, '0.5 s'], [1, '1 s']]} />
        <path d=${curve(w, 0, 1, 600, F.X, F.Y)} stroke="var(--graphite)" strokeWidth="1.5" fill="none" />
        <path d=${curve(w, 0, T, 120, F.X, F.Y)} stroke="var(--k-mm)" strokeWidth="3.4" fill="none" />
        <path d=${`M${F.X(0)} 22 V14 H${F.X(T)} V22`} stroke="var(--k-mm)" strokeWidth="2" fill="none" />
        <text x=${F.X(T) + 6} y="20" fontSize="14" className="mv2-kt">T = ${fmt(T, 4)} s (one cycle)</text>
      </svg>
      <${Sl} label="f (Hz)" min="1" max="16" v=${f} set=${setF} />
      <p className="mv2-out">f = <span className="mv2-v">${f} Hz</span>: ${f} cycles in 1 s · T = 1/${f} = <span className="mv2-v">${fmt(T, 4)} s</span></p></div>
      <${Cap} en=${`<b>Frequency</b> = cycles per second, in Hz. <b>Period</b> T = 1/f: at ${f} Hz the wave makes ${f} cycles in one second, each lasting ${fmt(T, 4)} s${f === 8 ? ' (the notes\' example: 1/8 = 0.125 s)' : ''}. Wavelength varies as 1/frequency: raise f and each cycle (highlighted) gets shorter.`}
        ar=${`الـ <b>Frequency</b> هي عدد الـ cycles في الثانية وبتتقاس بالـ Hz، والـ <b>Period</b> هو <bdi>T = 1/f</bdi>. عند <bdi>${f} Hz</bdi> الموجة بتعمل ${f} cycles في الثانية، وكل cycle بتاخد <bdi>${fmt(T, 4)} s</bdi>${f === 8 ? ' (ده مثال النوتس <bdi>1/8 = 0.125 s</bdi>)' : ''}. الـ Wavelength بيتناسب عكسيًا مع الـ frequency: علّي الـ f والـ cycle المتلونة هتقصر.`} showAr=${ar} /></figure>`;
  }

  /* ── slide 5: amplitude, frequency and phase of z = a·sin(ωt + φ) ── */
  const ABC = { amp: [1.6, 1, 0], freq: [1, 2, 0], phase: [1, 1, 90] };
  function SineAbc({ ar }) {
    const [a, setA] = useState(1.6), [w, setW] = useState(1), [ph, setPh] = useState(0);
    const mode = Object.keys(ABC).find(k => ABC[k][0] === a && ABC[k][1] === w && ABC[k][2] === ph) || null;
    const set = k => { const [x, y, z] = ABC[k]; setA(x); setW(y); setPh(z); };
    const F = frame({ H: 170, L: 30, x0: 0, x1: 2, y0: -2.1, y1: 2.1 });
    const ref = t => Math.sin(P2 * t), mine = t => a * Math.sin(P2 * w * t + ph * Math.PI / 180);
    const C = {
      amp: ['Change the <b>amplitude</b> a: the wave gets taller (or flatter), same frequency and phase.', 'غيّر الـ <b>amplitude</b> a: الموجة بتطول (أو تقصر) وبنفس الـ frequency والـ phase.'],
      freq: ['Change the <b>frequency</b> ω: more cycles fit in the same time, same height.', 'غيّر الـ <b>frequency</b> ω: cycles أكتر بتدخل في نفس الوقت وبنفس الارتفاع.'],
      phase: ['Change the <b>phase</b> φ: the same wave slides along the time axis.', 'غيّر الـ <b>phase</b> φ: نفس الموجة بتتزحلق على محور الوقت.']
    };
    const [en, at] = mode ? C[mode] : ['Your wave (thin) against the original (thick).', 'الموجة بتاعتك (الرفيعة) قصاد الأصلية (التخينة).'];
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['amp', 'Amplitude'], ['freq', 'Frequency'], ['phase', 'Phase']]} on=${mode} set=${set} />
      <p className="mv2-fx">z(t) = <span className=${a !== 1 ? 'on' : ''}>a</span>·sin(<span className=${w !== 1 ? 'on' : ''}>ω</span>·t + <span className=${ph !== 0 ? 'on' : ''}>φ</span>)</p>
      <svg className="mv2-s" viewBox="0 0 300 170" role="img" aria-label="The original sine (thick) and the changed sine (thin)">
        <${Axes} F=${F} yt=${[-2, -1, 0, 1, 2]} />
        <path d=${curve(ref, 0, 2, 300, F.X, F.Y)} stroke="var(--graphite)" strokeWidth="3.4" fill="none" />
        <path d=${curve(mine, 0, 2, 300, F.X, F.Y)} stroke="var(--k-mm)" strokeWidth="1.8" fill="none" />
      </svg>
      <${Leg} items=${[['var(--graphite)', 'original: a = 1, φ = 0'], ['var(--k-mm)', 'changed']]} />
      <${Sl} label="a" min="0.2" max="2" step="0.1" v=${a} set=${setA} />
      <${Sl} label="ω (×)" min="0.5" max="3" step="0.25" v=${w} set=${setW} />
      <${Sl} label="φ" min="0" max="360" step="15" v=${ph} set=${setPh} out=${ph + '°'} /></div>
      <${Cap} en=${'A sine wave is described by three quantities: <b>amplitude, frequency and phase</b>, z(t) = a·sin(ω·t + φ). ' + en} ar=${'الـ sine wave بتتوصف بـ 3 حاجات: الـ <b>amplitude</b> والـ <b>frequency</b> والـ <b>phase</b>.<span class="ltr">z(t) = a·sin(ω·t + φ)</span>' + at} showAr=${ar} /></figure>`;
  }

  /* ── slides 6–7: sinphasedemo, x axis in degrees ── */
  function PhaseDemo({ ar }) {
    const [ph, setPh] = useState(90);
    const F = frame({ H: 170, L: 34, x0: 0, x1: 720, y0: -1.1, y1: 1.1 }), r = Math.PI / 180;
    const cos = ph === 90, inv = ph === 180;
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 170" role="img" aria-label=${`sinphasedemo: initial sine and the same sine with phase ${ph} degrees`}>
        <${Axes} F=${F} yt=${[-1, 0, 1]} xt=${[0, 180, 360, 540, 720]} />
        ${[90, 270, 450, 630].map(d => html`<path key=${d} d=${`M${F.X(d)} ${F.H - F.B} V${F.H - F.B + 4}`} stroke="var(--graphite)" />`)}
        <path d=${curve(t => Math.sin(t * r), 0, 720, 360, F.X, F.Y)} stroke="var(--graphite)" strokeWidth="2.2" fill="none" />
        <path d=${curve(t => Math.sin((t + ph) * r), 0, 720, 360, F.X, F.Y)} stroke="var(--pen)" strokeWidth="2.2" fill="none" />
      </svg>
      <${Leg} items=${[['var(--graphite)', 'initial wave: phase = 0'], ['var(--pen)', `s2: phase = ${ph}°`]]} />
      <${Sl} label="Enter Phase" min="0" max="360" step="15" v=${ph} set=${setPh} out=${ph + '°'} />
      <p className="mv2-out">${cos ? html`phase 90° → the red wave is a <span className="mv2-r">cosine</span>` : inv ? 'phase 180° → the wave is upside down' : ph % 360 === 0 ? 'phase 0° or 360° → the same wave' : html`the red wave is shifted ${ph}° along the axis`}</p></div>
      <${Cap} en=${'sinphasedemo.m plots a 1 Hz sine for 2 seconds with the x axis in degrees (360° = one cycle), then asks for a phase and plots the shifted wave in red. Changing the phase shifts the wave along the axis; <b>a cosine is a sine wave 90° out of phase</b>.'}
        ar=${'الـ sinphasedemo.m بيرسم sine بـ <bdi>1 Hz</bdi> لمدة ثانيتين والـ x axis بالدرجات (<bdi>360°</bdi> يعني cycle كاملة)، وبعدين بيطلب phase ويرسم الموجة المزاحة بالأحمر. تغيير الـ phase بيزق الموجة على المحور؛ والـ <b>cosine هو sine wave متزاحة <bdi>90°</bdi></b>.'} showAr=${ar} /></figure>`;
  }

  /* ── slide 4 + worked example: y = A·sin(2π·n·Fw/Fs) ── */
  const piFrac = r => { for (let d = 1; d <= 96; d++) { const p = r * d; if (Math.abs(p - Math.round(p)) < 1e-9) { const q = Math.round(p); if (!q) return '0'; const g = gcd(q, d), P = q / g, D = d / g; return (P === 1 ? '' : P === -1 ? '−' : P) + 'π' + (D === 1 ? '' : '/' + D); } } return fmt(r * Math.PI, 4); };
  function SampledSine({ ar }) {
    const [A, setA] = useState('1'), [Fw, setFw] = useState('1000'), [Fs, setFs] = useState('8000'), [n, setN] = useState(1);
    const a = parseNum(A), fw = parseNum(Fw), fs = parseNum(Fs), ok = isFinite(a) && a > 0 && fw > 0 && fs > 0;
    const spc = ok ? fs / fw : 8, M = Math.max(9, Math.min(33, Math.round(2 * spc) + 1)), nn = Math.min(n, M - 1);
    const ex = A === '1' && Fw === '1000' && Fs === '8000';
    const F = frame({ H: 160, L: 34, x0: -0.5, x1: M - 0.5, y0: -1.2, y1: 1.2 });
    const y = k => Math.sin(P2 * k * fw / fs), s = ok ? y(nn) : 0;
    const step = Math.max(1, Math.ceil(M / 9));
    const calc = ok ? `y(${nn}) = A·sin(2π·${nn}·${fmt(fw)}/${fmt(fs)}) = A·sin(${piFrac(2 * nn * fw / fs)}) = ${fmt(s, 4)}A${a !== 1 ? ' = ' + fmt(a * s, 4) : ''}` : '';
    return html`<figure className="fig mv2"><div className="fig-stage">
      <div className="mv2-form">
        <label>A<input value=${A} onInput=${e => setA(e.target.value)} inputMode="decimal" /></label>
        <label>Fw (Hz)<input value=${Fw} onInput=${e => setFw(e.target.value)} inputMode="decimal" /></label>
        <label>Fs (Hz)<input value=${Fs} onInput=${e => setFs(e.target.value)} inputMode="decimal" /></label></div>
      <div className="mv2-row"><button className=${'fig-btn' + (ex ? ' mv2-sel' : '')} onClick=${() => { setA('1'); setFw('1000'); setFs('8000'); setN(1); }}>Example from the notes</button></div>
      ${ok ? html`<svg className="mv2-s" viewBox="0 0 300 160" role="img" aria-label=${`Samples of a ${fw} Hz sine taken at ${fs} Hz`}>
        <${Axes} F=${F} yt=${[[-1, '−A'], [0, '0'], [1, 'A']]} xt=${N(Math.floor((M - 1) / step) + 1, k => k * step)} />
        <path d=${curve(t => y(t), -0.3, M - 0.7, 400, F.X, F.Y)} stroke="var(--faint)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <${Stems} F=${F} d=${N(M, y)} hi=${nn} />
      </svg>
      <${Sl} label="n" min="0" max=${M - 1} v=${nn} set=${setN} />
      <div className="mv2-calc"><div>Fw/Fs = ${fmt(fw)}/${fmt(fs)} = ${fmt(fw / fs, 5)} → one cycle every <span className="mv2-res">${fmt(spc, 3)} samples</span></div><div className="mv2-res">${calc}</div></div>` : html`<p className="mv2-out">Enter positive numbers for A, Fw and Fs.</p>`}</div>
      <${Cap} en=${'The sampled sine wave y = A·sin(2π·n·Fw/Fs): A amplitude, Fw frequency of the wave, Fs sample frequency, n sample index (MATLAB sin() works in radians, 2π = 360° = one cycle). Notes\' example: Fw = 1000 Hz, Fs = 8000 Hz → 8 samples per cycle; n = 1 gives 0.7071A, n = 2 gives A, n = 4 gives 0.'}
        ar=${'الـ sine wave الـ sampled هي<span class="ltr">y = A·sin(2π·n·Fw/Fs)</span>حيث A الـ amplitude و Fw الـ frequency بتاعة الموجة و Fs الـ sample frequency و n الـ sample index (الـ <bdi>sin()</bdi> في MATLAB بالـ radians، و <bdi>2π = 360°</bdi> يعني cycle كاملة). مثال النوتس:<span class="ltr">Fw = 1000 Hz, Fs = 8000 Hz → 8 samples per cycle<br>n = 1 → 0.7071A, n = 2 → A, n = 4 → 0</span>'} showAr=${ar} /></figure>`;
  }

  /* ════════ [1] The decibel (dB), dynamic range and SNR ════════ */

  /* ── slides 9–12: why a log scale, 0 dB to the threshold of pain ── */
  function DbScale({ ar }) {
    const [e, setE] = useState(12);
    const lin = Math.pow(10, e - 12) * 100, db = 10 * e;
    const sup = html`10<sup>${e}</sup>`;
    return html`<figure className="fig mv2"><div className="fig-stage">
      <p className="mv2-pl">Power ratio X/X0 = ${sup} on a linear scale (full bar = 10<sup>12</sup>)</p>
      <div className="mv2-trk"><i className="alt" style=${{ width: Math.max(lin, .4) + '%' }}></i></div>
      <div className="mv2-tks"><span style=${{ left: '0%' }}>0</span><span style=${{ left: '50%' }}>5×10<sup>11</sup></span><span style=${{ left: '100%' }}>10<sup>12</sup></span></div>
      <p className="mv2-pl">The same ratio in decibels: 10·log10(${sup}) = <span className="mv2-k">${db} dB</span></p>
      <div className="mv2-trk"><i style=${{ width: (db / 120 * 100) + '%' }}></i></div>
      <div className="mv2-tks"><span style=${{ left: '0%' }}>0 dB</span><span style=${{ left: '50%' }}>60 dB</span><span style=${{ left: '100%' }}>120 dB</span></div>
      <${Sl} label="X/X0 = 10^" min="0" max="12" v=${e} set=${setE} />
      <p className="mv2-out">${e === 0 ? html`X = X0 → log10(1) = 0 → <span className="mv2-v">0 dB</span>: the reference, the threshold of human perception` : e === 12 ? html`max/min power the ear handles ≈ 10<sup>12</sup> → log = 12 → <span className="mv2-r">120 dB, threshold of pain</span>` : html`${sup} times the reference power → <span className="mv2-v">${db} dB</span>`}</p></div>
      <${Cap} en=${'Logarithmic units are used when there is a large range in magnitude. On a linear scale anything below about 10<sup>10</sup> is invisible next to 10<sup>12</sup>; in dB every factor of 10 is the same +10 dB step. In acoustics 0 dB is the threshold of human perception and a power ratio above 10<sup>12</sup> (log = 12) is 120 dB, the threshold of pain.'}
        ar=${'الوحدات الـ logarithmic بنستخدمها لما يكون فيه مدى كبير جدًا في القيم. على scale خطي أي حاجة أقل من حوالي <bdi>10<sup>10</sup></bdi> مش باينة جنب <bdi>10<sup>12</sup></bdi>؛ لكن بالـ dB كل ضرب في 10 هو نفس الخطوة <bdi>+10 dB</bdi>. في الـ acoustics الـ <bdi>0 dB</bdi> هو أقل صوت الإنسان يحس بيه، ونسبة power أكبر من <bdi>10<sup>12</sup></bdi> (الـ log بتاعها 12) يعني <bdi>120 dB</bdi> وده الـ threshold of pain.'} showAr=${ar} /></figure>`;
  }

  /* ── slide 14: 6 dB per bit ── */
  function BitsDb({ ar }) {
    const [b, setB] = useState(16);
    const R = (b - 1) * 6;
    const row = (t, v, alt) => html`<div className="mv2-hb"><span>${t}</span><div className="mv2-trk"><i className=${alt ? 'alt' : ''} style=${{ width: (v / 138 * 100) + '%' }}></i></div><b>${v} dB</b></div>`;
    return html`<figure className="fig mv2"><div className="fig-stage">
      <div className="mv2-bits">${N(b, k => html`<div key=${k} className=${k === 0 ? 'lsb' : ''}>${k === 0 ? 'LSB' : '+6'}</div>`)}</div>
      <${Sl} label="bits" min="2" max="24" v=${b} set=${setB} />
      <div className="mv2-calc"><div>first bit (LSB) = residual quantisation noise; each further bit doubles resolution = 10·log10(4) ≈ 6 dB</div><div className="mv2-res">${b}-bit: (${b} − 1) × 6 = ${R} dB dynamic range</div></div>
      ${row('8-bit', 42, true)}${row('16-bit', 90, true)}${row(b + '-bit', R)}
      <p className="mv2-out">16-bit vs 8-bit: 90 − 42 = <span className="mv2-v">48 dB</span> → 48/6 = <span className="mv2-v">8</span> ("8 times as noisy", as the slide words it)</p></div>
      <${Cap} en=${'Digital noise: <b>6 dB per bit</b> in linear PCM. The first bit (LSB) only gives residual quantisation noise; every bit after it adds about 6 dB of dynamic range between quantisation noise and clipping. 16-bit has 15 bits beyond the first: 15 × 6 = 90 dB; 8-bit: 7 × 6 = 42 dB.'}
        ar=${'الـ Digital noise: <b>6 dB لكل bit</b> في الـ linear PCM. أول bit (الـ LSB) بيدي residual quantisation noise بس؛ وكل bit بعده بيزود حوالي <bdi>6 dB</bdi> في الـ dynamic range ما بين الـ quantisation noise والـ clipping. الـ 16-bit فيه 15 bits بعد الأول يعني<span class="ltr">15 × 6 = 90 dB</span>والـ 8-bit<span class="ltr">7 × 6 = 42 dB</span>'} showAr=${ar} /></figure>`;
  }

  /* ── slides 8, 15 and the notes' table: dB and SNR calculator ── */
  const DBT = [['P', '100'], ['P', '10^12'], ['P', '2'], ['A', '10'], ['A', '100'], ['P', '0.5']];
  function DbCalc({ ar }) {
    const [m, setM] = useState('P'), [s, setS] = useState('100');
    const r = parseNum(s), ok = isFinite(r) && r > 0, c = m === 'P' ? 10 : 20, db = ok ? c * Math.log10(r) : 0;
    const other = m === 'P' ? Math.sqrt(r) : r * r;
    const word = !ok ? '' : Math.abs(db) < 1e-9 ? 'X = X0: the 0 dB reference level' : db > 0 ? 'positive: a power increase' : 'negative: a power decrease';
    const pick = (mm, ss) => { setM(mm); setS(ss); };
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['P', 'Power ratio (10·log)'], ['A', 'Amplitude ratio (20·log)']]} on=${m} set=${setM} />
      <div className="mv2-form wide"><label>${m === 'P' ? 'Power ratio X/X0 (or Psignal/Pnoise)' : 'Amplitude ratio (or Asignal/Anoise, RMS)'}<input value=${s} onInput=${e => setS(e.target.value)} /></label></div>
      ${ok ? html`<div className="mv2-calc">
        <div className="mv2-res">${c}·log10(${fmt(r, 6)}) = ${c} × ${fmt(Math.log10(r), 4)} = ${fmt(db, 2)} dB</div>
        <div>${m === 'P' ? `same as amplitude ratio √${fmt(r, 6)} = ${fmt(other, 4)} → 20·log10(${fmt(other, 4)}) = ${fmt(db, 2)} dB` : `same as power ratio ${fmt(r, 6)}² = ${fmt(other, 6)} → 10·log10(${fmt(other, 6)}) = ${fmt(db, 2)} dB`}</div>
        <div className="mv2-note">${word}</div></div>` : html`<p className="mv2-out">Enter a ratio above 0 (for example 100, 2, 0.5 or 10^12).</p>`}
      <table className="mv2-tbl"><thead><tr><th>Given</th><th>Formula</th><th>Result</th></tr></thead><tbody>
        ${DBT.map(([mm, ss], k) => { const v = (mm === 'P' ? 10 : 20) * Math.log10(parseNum(ss)); return html`<tr key=${k} className=${'pick' + (m === mm && s === ss ? ' on' : '')} onClick=${() => pick(mm, ss)}><td className="t">${mm === 'P' ? 'Power' : 'Amplitude'} ${ss.replace('10^12', '10¹²')}</td><td>${mm === 'P' ? 10 : 20}·log10</td><td>${(Math.abs(v - Math.round(v)) < 1e-9 ? '' : '≈ ') + fmt(v, 2)} dB</td></tr>`; })}
      </tbody></table></div>
      <${Cap} en=${'X<sub>dB</sub> = 10·log10(X/X0) for power; since power = |X|², amplitude ratios use 20·log10. SNR = Psignal/Pnoise = (Asignal/Anoise)², so SNR<sub>dB</sub> = 10·log10(Ps/Pn) = 20·log10(As/An). Tap a row of the notes\' table to load it.'}
        ar=${'للـ power بنستخدم<span class="ltr">XdB = 10·log10(X/X0)</span>وعشان الـ power يساوي <bdi>|X|²</bdi> فنسب الـ amplitude بتاخد <bdi>20·log10</bdi>. والـ SNR هو<span class="ltr">SNR = Ps/Pn = (As/An)²<br>SNRdB = 10·log10(Ps/Pn) = 20·log10(As/An)</span>دوس على أي صف من جدول النوتس عشان يتحمّل.'} showAr=${ar} /></figure>`;
  }

  /* ════════ [2] Signal flow graphs ════════ */
  const Wire = ({ d, on, arrow, id, flow }) => html`<path d=${d} stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${on ? 2.6 : 1.6} fill="none" className=${on && flow && !calm() ? 'flow' : ''} markerEnd=${arrow ? `url(#${id})` : null} />`;
  const Box = ({ x, y, w = 30, h = 28, t = 'T', on }) => html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill="var(--paper)" stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${on ? 2.4 : 1.6} /><text x=${x + w / 2} y=${y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700">${t}</text></g>`;
  const Op = ({ x, y, t, r = 13, on }) => html`<g><circle cx=${x} cy=${y} r=${r} fill="var(--paper)" stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${on ? 2.4 : 1.6} /><text x=${x} y=${y + 5.5} textAnchor="middle" fontSize="16" fontWeight="700">${t}</text></g>`;

  /* ── slides 17–21: delay, multiplication, addition ── */
  const XS = [0, 1, 0.5, 0, 0, 0, 0, 0], X2 = [0, 0, 0, 0, 1, 0, 0, 0];
  const BLK = {
    d1: { eq: 'y(n) = x(n − 1)', y: n => n >= 1 ? XS[n - 1] : 0, en: 'A <b>delay</b> of one sampling interval: a block labelled T. Every input sample comes out one step later.', ar: 'الـ <b>delay</b> بمقدار sampling interval واحد بيترسم block مكتوب عليه T. كل sample بتطلع متأخرة خطوة.' },
    d2: { eq: 'y(n) = x(n − 2)', y: n => n >= 2 ? XS[n - 2] : 0, en: 'Two T blocks in series: a delay of <b>two</b> sampling intervals.', ar: 'اتنين T ورا بعض: <b>delay</b> بمقدار اتنين sampling intervals.' },
    mul: { eq: 'y(n) = a·x(n), a = 0.5', y: n => .5 * XS[n], en: '<b>Multiplication</b> (weighting): a circle with × and the coefficient a. With a = 0.5 every sample is halved.', ar: 'الـ <b>Multiplication</b> (الـ weighting) بتترسم دايرة فيها × ومعاها الـ coefficient a. لما <bdi>a = 0.5</bdi> كل sample بتتقسم على 2.' },
    add: { eq: 'y(n) = a1·x1(n) + a2·x2(n), a1 = a2 = 1', y: n => XS[n] + X2[n], en: '<b>Addition</b>: a circle with +. With a1 = a2 = 1 the output is x1(n) + x2(n), sample by sample.', ar: 'الـ <b>Addition</b> بتترسم دايرة فيها +. لما <bdi>a1 = a2 = 1</bdi> الـ output بيبقى مجموع <bdi>x1(n) + x2(n)</bdi> sample بـ sample.' }
  };
  function BlockRun({ m, ar }) {
    const B = BLK[m], [i, ctl] = useSteps(8, 750), id = 'mv2-ab-' + m;
    const F = frame({ H: 96, L: 30, B: 24, T: 8, x0: -0.5, x1: 7.5, y0: -0.15, y1: 1.15 });
    const plot = (lab, d) => html`<p className="mv2-pl">${lab}</p><svg className="mv2-s" viewBox="0 0 300 96" role="img" aria-label=${lab}><${Axes} F=${F} yt=${[0, 1]} xt=${[0, 1, 2, 3, 4, 5, 6, 7]} /><${Stems} F=${F} d=${d} show=${lab.startsWith('y') ? i + 1 : Infinity} hi=${lab.startsWith('y') ? i : -1} /></svg>`;
    const ys = N(8, B.y);
    let g;
    if (m === 'd1') g = html`<text x="4" y="45" fontSize="15">x(n)</text><${Wire} d="M42 40 H108" arrow id=${id} on /><${Box} x=${110} y=${26} on /><${Wire} d="M140 40 H222" arrow id=${id} on /><text x="226" y="45" fontSize="15">y(n)</text>`;
    else if (m === 'd2') g = html`<text x="4" y="45" fontSize="15">x(n)</text><${Wire} d="M42 40 H78" arrow id=${id} on /><${Box} x=${80} y=${26} on /><${Wire} d="M110 40 H168" arrow id=${id} on /><text x="139" y="20" textAnchor="middle" fontSize="14" className="mv2-gt">x(n−1)</text><${Box} x=${170} y=${26} on /><${Wire} d="M200 40 H246" arrow id=${id} on /><text x="250" y="45" fontSize="15">y(n)</text>`;
    else if (m === 'mul') g = html`<text x="4" y="45" fontSize="15">x(n)</text><${Wire} d="M42 40 H134" arrow id=${id} on /><${Op} x=${150} y=${40} t="×" on /><text x="150" y="18" textAnchor="middle" fontSize="15" className="mv2-kt">a = 0.5</text><${Wire} d="M164 40 H230" arrow id=${id} on /><text x="234" y="45" fontSize="15">y(n)</text>`;
    else g = html`<text x="4" y="18" fontSize="15">x1(n)</text><text x="4" y="74" fontSize="15">x2(n)</text><${Wire} d="M50 14 H120 L139 31" arrow id=${id} on /><${Wire} d="M50 70 H120 L139 51" arrow id=${id} on /><${Op} x=${150} y=${41} t="+" on /><${Wire} d="M164 41 H230" arrow id=${id} on /><text x="234" y="46" fontSize="15">y(n)</text>`;
    return html`<div><svg className="mv2-s" viewBox="0 0 300 82" role="img" aria-label=${'Signal flow graph: ' + B.eq}><defs>${marker(id, 'var(--k-mm)')}</defs>${g}</svg>
      <p className="mv2-fx">${B.eq}</p>
      ${plot(m === 'add' ? 'x1(n)' : 'x(n)', XS)}${m === 'add' && plot('x2(n)', X2)}${plot('y(n)', ys)}
      <p className="mv2-out">n = ${i}: y(${i}) = <span className="mv2-v">${fmt(ys[i])}</span></p>
      <${Cap} en=${B.en} ar=${B.ar} showAr=${ar} /><${Bar} steps=${N(8, k => k)} i=${i} ctl=${ctl} /></div>`;
  }
  function SfgBlocks({ ar }) {
    const [m, setM] = useState('d1');
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['d1', 'Delay T'], ['d2', 'Delay 2T'], ['mul', 'Multiply ×'], ['add', 'Add +']]} on=${m} set=${setM} /></div>
      <${BlockRun} key=${m} m=${m} ar=${ar} /></figure>`;
  }

  /* ── slides 22–23 + worked example: y(n) = ½x(n) + ⅓x(n−1) + ¼x(n−2) ── */
  const CF = [1 / 2, 1 / 3, 1 / 4], CS = ['½', '⅓', '¼'];
  function SfgSteps({ x, ar, label }) {
    const L = x.length + 2, [i, ctl] = useSteps(L + 1, 2000), id = 'mv2-ac';
    const xa = n => n >= 0 && n < x.length ? x[n] : 0;
    const y = n => CF.reduce((s, c, k) => s + c * xa(n - k), 0);
    const n = Math.min(i, L), xs = [0, 1, 2].map(k => xa(n - k)), pr = xs.map((v, k) => v * CF[k]);
    const terms = [0, 1, 2].filter(k => xs[k] !== 0);
    const calc = terms.length ? `y(${n}) = ${terms.map(k => CS[k] + '·' + fmt(xs[k])).join(' + ')}${terms.length > 1 ? ' = ' + terms.map(k => fmt(pr[k])).join(' + ') : ''} = ${fmt(y(n))}` : `y(${n}) = 0`;
    const TX = [60, 150, 250], on = true;
    const F = frame({ H: 100, L: 30, B: 24, T: 8, x0: -0.5, x1: L + 0.5, y0: 0, y1: Math.max(1, ...x.map(Math.abs), ...N(L + 1, y)) * 1.1 });
    const top = F.y1 > 3 ? Math.floor(F.y1) : 1;
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <svg className="mv2-s" viewBox="0 0 300 215" role="img" aria-label="Signal flow graph of y(n) = one half x(n) plus one third x(n minus 1) plus one quarter x(n minus 2), with the values at the current n">
        <defs>${marker(id, 'var(--graphite)')}</defs>
        <text x="2" y="33" fontSize="15">x(n)</text>
        <${Wire} d="M36 28 H95" /><${Box} x=${95} y=${14} /><${Wire} d="M125 28 H185" /><${Box} x=${185} y=${14} /><${Wire} d="M215 28 H250" />
        <text x="155" y="10" fontSize="14" className="mv2-gt">x(n−1)</text><text x="255" y="10" fontSize="14" className="mv2-gt">x(n−2)</text>
        ${TX.map((X, k) => html`<g key=${k}>
          <circle cx=${X} cy="28" r="3" fill="var(--graphite)" /><${Wire} d=${`M${X} 28 V73`} arrow id=${id} />
          <${Op} x=${X} y=${88} t="×" /><text x=${X + 17} y="94" fontSize="16" className="mv2-kt">${CS[k]}</text>
          <text x=${X - 6} y="60" textAnchor="end" fontSize="14" className="mv2-kt mv2-mono">${fmt(xs[k])}</text>
          <text x=${X + 6} y="130" fontSize="14" className="mv2-pt mv2-mono">${fmt(pr[k])}</text></g>`)}
        <${Wire} d="M60 101 V165 H134" arrow id=${id} /><${Wire} d="M150 101 V149" arrow id=${id} /><${Wire} d="M250 101 V165 H166" arrow id=${id} />
        <${Op} x=${150} y=${165} t="+" r=${14} on=${on} />
        <${Wire} d="M150 179 V208" on />
        <text x="158" y="205" fontSize="15">y(${n}) = <tspan className="mv2-kt">${fmt(y(n))}</tspan></text>
      </svg>
      <p className="mv2-pl">x(n) ${label}</p><svg className="mv2-s" viewBox="0 0 300 100" role="img" aria-label="input samples"><${Axes} F=${F} yt=${[0, top]} xt=${N(L + 1, k => k)} /><${Stems} F=${F} d=${N(L + 1, xa)} hi=${n} /></svg>
      <p className="mv2-pl">y(n)</p><svg className="mv2-s" viewBox="0 0 300 100" role="img" aria-label="output samples"><${Axes} F=${F} yt=${[0, top]} xt=${N(L + 1, k => k)} /><${Stems} F=${F} d=${N(L + 1, y)} show=${n + 1} hi=${n} /></svg>
      <div className="mv2-calc mv2-res">${calc}</div></div>
      <${Cap} en=${`n = ${n}: the delay line holds x(${n}), x(${n}−1), x(${n}−2) = ${xs.map(v => fmt(v)).join(', ')}; each is weighted (½, ⅓, ¼) and the adder sums them. Two delays, three multipliers, one adder.`}
        ar=${`عند <bdi>n = ${n}</bdi> الـ delay line شايلة<span class="ltr">x(${n}), x(${n}−1), x(${n}−2) = ${xs.map(v => fmt(v)).join(', ')}</span>كل واحدة بتتضرب في الـ weight بتاعها (<bdi>½ و ⅓ و ¼</bdi>) والـ adder بيجمعهم. يعني 2 delays و 3 multipliers و adder واحد.`} showAr=${ar} />
      <${Bar} steps=${N(L + 1, k => k)} i=${n} ctl=${ctl} /></div>`;
  }
  function SfgRun({ ar }) {
    const [m, setM] = useState('ex'), [own, setOwn] = useState(['1', '2', '3']);
    const x = m === 'imp' ? [1, 0, 0] : m === 'ex' ? [2, 4, 6] : own.map(v => { const n = parseNum(v); return isFinite(n) ? n : 0; });
    const label = m === 'imp' ? '= 1, 0, 0, … (impulse)' : `= ${x.map(v => fmt(v)).join(', ')}, then zeros`;
    return html`<figure className="fig mv2"><div className="fig-stage" style=${{ paddingBottom: 0 }}>
      <${Chips} items=${[['ex', 'Example: 2, 4, 6'], ['imp', 'Impulse response'], ['own', 'Try your own']]} on=${m} set=${setM} />
      ${m === 'own' && html`<div className="mv2-form">${own.map((v, k) => html`<label key=${k}>x(${k})<input value=${v} inputMode="decimal" onInput=${e => { const o = own.slice(); o[k] = e.target.value; setOwn(o); }} /></label>`)}</div>`}</div>
      <${SfgSteps} key=${m + x.join(',')} x=${x} ar=${ar} label=${label} /></figure>`;
  }

  /* ════════ [3] Filtering; IIR and FIR systems ════════ */

  /* ── slides 27–29: the IIR signal flow graph ── */
  function IirGraph({ ar }) {
    const steps = [
      { en: 'The input x(n) enters the adder.', ar: 'الـ input <bdi>x(n)</bdi> بيدخل على الـ adder.' },
      { en: 'The adder\'s result is the output y(n).', ar: 'ناتج الـ adder هو الـ output <bdi>y(n)</bdi>.' },
      { en: 'The output y(n) is <b>fed back</b> through a series of delays: y(n − 1), y(n − 2).', ar: 'الـ output <bdi>y(n)</bdi> بيرجع <b>feedback</b> على سلسلة delays فيطلع <bdi>y(n − 1)</bdi> و <bdi>y(n − 2)</bdi>.' },
      { en: 'Each delay is <b>weighted</b>: by −a1 and −a2.', ar: 'كل delay بيتضرب في <b>weight</b> وهما <bdi>−a1</bdi> و <bdi>−a2</bdi>.' },
      { en: 'Each fed-back weighted delay is summed into the new output: a <b>recursive</b> system. y(n) = x(n) − a1·y(n − 1) − a2·y(n − 2); in general y(n) = x(n) − Σ<sub>k=1..M</sub> a<sub>k</sub>·y(n − k).', ar: 'كل delay راجع ومتضرب بيتجمع على الـ output الجديد، فده نظام <b>recursive</b>.<span class="ltr">y(n) = x(n) − a1·y(n − 1) − a2·y(n − 2)<br>y(n) = x(n) − Σ(k=1..M) ak·y(n − k)</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200), id = 'mv2-ai', id2 = 'mv2-ai2';
    const A = (k, last) => last ? i === k : i >= k;
    const mk = on => on ? id : id2;
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 205" role="img" aria-label="IIR signal flow graph: the output fed back through two delays, weighted by minus a1 and minus a2, into the adder">
        <defs>${marker(id, 'var(--k-mm)')}${marker(id2, 'var(--graphite)')}</defs>
        <text x="2" y="35" fontSize="15">x(n)</text>
        <${Wire} d="M38 30 H95" on=${A(0)} flow arrow id=${mk(A(0))} />
        <${Op} x=${110} y=${30} t="+" on=${A(0)} />
        <${Wire} d="M124 30 H286" on=${A(1)} flow arrow id=${mk(A(1))} /><text x="282" y="20" textAnchor="end" fontSize="15">y(n)</text>
        <${Wire} d="M220 30 V50" on=${A(2)} flow arrow id=${mk(A(2))} /><${Box} x=${205} y=${52} on=${A(2)} />
        <${Wire} d="M220 80 V118" on=${A(2)} flow arrow id=${mk(A(2))} /><${Box} x=${205} y=${120} on=${A(2)} />
        <${Wire} d="M220 148 V168" on=${A(2)} flow />
        <text x="226" y="104" fontSize="14" className="mv2-gt">y(n−1)</text><text x="226" y="186" fontSize="14" className="mv2-gt">y(n−2)</text>
        <${Wire} d="M220 100 H176" on=${A(3)} flow arrow id=${mk(A(3))} /><${Op} x=${163} y=${100} t="×" on=${A(3)} /><text x="163" y="130" textAnchor="middle" fontSize="14" className="mv2-kt">−a1</text>
        <${Wire} d="M220 168 H176" on=${A(3)} flow arrow id=${mk(A(3))} /><${Op} x=${163} y=${168} t="×" on=${A(3)} /><text x="163" y="198" textAnchor="middle" fontSize="14" className="mv2-kt">−a2</text>
        <${Wire} d="M150 168 H110 V44" on=${A(4)} flow arrow id=${mk(A(4))} /><${Wire} d="M150 100 H110" on=${A(4)} flow />
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 30–31: the FIR signal flow graph with N − 1 feed-forward delays ── */
  function FirGraph({ ar }) {
    const [Nn, setNn] = useState(3);
    const steps = [
      { en: `The input passes along a line of <b>${Nn - 1} delay${Nn > 2 ? 's' : ''}</b> (N − 1 feed-forward delays): x(n), x(n − 1), ….`, ar: `الـ input بيمشي على خط فيه <b>${Nn - 1} delay</b> (يعني N − 1 feed-forward delays) فيطلع <bdi>x(n)</bdi> و <bdi>x(n − 1)</bdi> وهكذا.` },
      { en: 'Each delayed input is weighted by its coefficient b<sub>k</sub>.', ar: 'كل input متأخر بيتضرب في الـ coefficient بتاعه <bdi>b<sub>k</sub></bdi>.' },
      { en: 'The weighted values are summed to give the output y(n).', ar: 'القيم المتضروبة بتتجمع وتدي الـ output <bdi>y(n)</bdi>.' },
      { en: 'There is <b>no feedback loop</b>: the output never goes back in, so FIR is simpler than IIR and its impulse response is finite.', ar: 'مفيش <b>feedback loop</b>: الـ output عمره ما بيرجع جوه، فالـ FIR أبسط من الـ IIR والـ impulse response بتاعه finite.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200), id = 'mv2-af', id2 = 'mv2-af2';
    const X = k => 34 + k * (230 - 34) / (Nn - 1), mk = on => on ? id : id2;
    const lab = k => k ? `x(n−${k})` : 'x(n)';
    const sum = N(Nn, k => `b${k}·${lab(k)}`).join(' + ');
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 172" role="img" aria-label=${`FIR signal flow graph with ${Nn} taps and no feedback`}>
        <defs>${marker(id, 'var(--k-mm)')}${marker(id2, 'var(--graphite)')}</defs>
        <${Wire} d=${`M10 34 H${X(Nn - 1)}`} on=${i === 0} flow />
        ${N(Nn, k => html`<g key=${k}>
          <text x=${X(k)} y="16" textAnchor="middle" fontSize="13.5" className="mv2-gt">${lab(k)}</text>
          ${k > 0 && html`<${Box} x=${(X(k - 1) + X(k)) / 2 - 12} y=${22} w=${24} h=${24} on=${i === 0} />`}
          <circle cx=${X(k)} cy="34" r="3" fill="var(--graphite)" />
          <${Wire} d=${`M${X(k)} 34 V67`} on=${i === 1} flow arrow id=${mk(i === 1)} />
          <${Op} x=${X(k)} y=${80} r=${11} t="×" on=${i === 1} /><text x=${X(k) + 13} y="104" fontSize="14" className="mv2-kt">b${k}</text>
          ${k === 0 ? html`<${Wire} d=${`M${X(0)} 91 V135 H${X(1) - 13}`} on=${i === 2} flow arrow id=${mk(i === 2)} />` : html`<${Wire} d=${`M${X(k)} 91 V120`} on=${i === 2} flow arrow id=${mk(i === 2)} /><${Op} x=${X(k)} y=${135} r=${12} t="+" on=${i === 2} />`}
          ${k > 0 && k < Nn - 1 && html`<${Wire} d=${`M${X(k) + 12} 135 H${X(k + 1) - 13}`} on=${i === 2} flow arrow id=${mk(i === 2)} />`}
        </g>`)}
        <${Wire} d=${`M${X(Nn - 1) + 12} 135 H292`} on=${i >= 2} flow arrow id=${mk(i >= 2)} /><text x="292" y="126" textAnchor="end" fontSize="15">y(n)</text>
        ${i === 3 && html`<text x="150" y="168" textAnchor="middle" fontSize="14" className="mv2-ot">no path from y(n) back to the input</text>`}
      </svg>
      <p className="mv2-fx">y(n) = ${sum}</p>
      <${Sl} label="taps N" min="2" max="5" v=${Nn} set=${setNn} />
      <p className="mv2-out">N = 3 is the simple example y(n) = b0x(n) + b1x(n − 1) + b2x(n − 2); in general y(n) = Σ<sub>k=0..N−1</sub> b<sub>k</sub>·x(n − k).</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── IIR vs FIR impulse responses ── */
  function ImpulseResp({ ar }) {
    const [a1, setA1] = useState(-0.5), [i, ctl] = useSteps(12, 650);
    const iir = []; for (let n = 0; n < 12; n++) iir.push((n === 0 ? 1 : 0) - a1 * (n ? iir[n - 1] : 0));
    const fir = N(12, n => n < 3 ? CF[n] : 0);
    const F = frame({ H: 110, L: 34, B: 24, T: 8, x0: -0.5, x1: 11.5, y0: -1.1, y1: 1.1 });
    const pl = (d, lab) => html`<p className="mv2-pl">${lab}</p><svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label=${lab}><${Axes} F=${F} yt=${[-1, 0, 1]} xt=${[0, 2, 4, 6, 8, 10]} /><${Stems} F=${F} d=${d} show=${i + 1} hi=${i} /></svg>`;
    return html`<figure className="fig mv2"><div className="fig-stage">
      ${pl(iir, `IIR: y(n) = x(n) − a1·y(n − 1), a1 = ${fmt(a1)}`)}
      <div className="mv2-calc">y(${i}) = x(${i}) − a1·y(${i - 1}) = ${i === 0 ? 1 : 0} − (${fmt(a1)})·${i ? fmt(iir[i - 1], 5) : 0} = <span className="mv2-res">${fmt(iir[i], 5)}</span></div>
      ${pl(fir, 'FIR: y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2)')}
      <p className="mv2-out">IIR: ${iir.slice(0, 6).map(v => fmt(v, 4)).join(', ')}, … · FIR: ½, ⅓, ¼, 0, 0, …</p>
      <${Sl} label="a1" min="-0.9" max="0.9" step="0.1" v=${a1} set=${setA1} out=${fmt(a1)} /></div>
      <${Cap} en=${a1 === 0 ? 'With a1 = 0 there is no feedback and the response stops after one sample.' : `Impulse input 1, 0, 0, …. The IIR filter feeds each output back, so with a1 = ${fmt(a1)} the response ${a1 < 0 ? 'halves' : 'shrinks'} every step${a1 > 0 ? ' and flips sign' : ''} but <b>never becomes exactly zero</b>: an infinite impulse response. The FIR filter has no feedback, so after its last tap the response is 0: finite.`}
        ar=${a1 === 0 ? 'لما <bdi>a1 = 0</bdi> مفيش feedback والـ response بيخلص بعد sample واحدة.' : `الـ input هو impulse يعني <bdi>1, 0, 0, …</bdi>. الـ IIR filter بيرجّع كل output تاني، فمع <bdi>a1 = ${fmt(a1)}</bdi> الـ response بيصغر كل خطوة${a1 > 0 ? ' وإشارته بتتقلب' : ''} لكن <b>عمره ما يوصل للصفر بالظبط</b>، وده الـ infinite impulse response. الـ FIR مفيهوش feedback، فبعد آخر tap الـ response بيبقى صفر يعني finite.`} showAr=${ar} />
      <${Bar} steps=${N(12, k => k)} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 37: MATLAB filter(B, A, X) ── */
  const FPRE = { fir: ['1/2, 1/3, 1/4', '1', '2, 4, 6, 0, 0, 0'], iir: ['1', '1, -0.5', '1, 0, 0, 0, 0, 0'], norm: ['2', '2, -1', '1, 0, 0, 0, 0, 0'], zero: ['1', '0, 1', '1, 0, 0'] };
  function FilterBA({ ar }) {
    const [b, setB] = useState(FPRE.fir[0]), [a, setA] = useState(FPRE.fir[1]), [x, setX] = useState(FPRE.fir[2]), [sel, setSel] = useState(3);
    const pre = Object.keys(FPRE).find(k => FPRE[k][0] === b && FPRE[k][1] === a && FPRE[k][2] === x) || null;
    const load = k => { setB(FPRE[k][0]); setA(FPRE[k][1]); setX(FPRE[k][2]); setSel(k === 'fir' ? 3 : 2); };
    const B = parseList(b), A = parseList(a), X = parseList(x), bad = [B, A, X].some(v => !v.length || v.some(n => !isFinite(n)));
    let body;
    if (bad) body = html`<p className="mv2-out">Enter numbers separated by commas (fractions like 1/3 are fine).</p>`;
    else if (A[0] === 0) body = html`<div className="mv2-calc"><span className="err">Error: first denominator filter coefficient must be non-zero.</span><div className="mv2-note">a(1) = 0 cannot be used to normalise the coefficients.</div></div>`;
    else {
      const y = []; X.forEach((_, n) => { let s = 0; B.forEach((c, k) => { if (n - k >= 0) s += c * X[n - k]; }); A.forEach((c, k) => { if (k && n - k >= 0) s -= c * y[n - k]; }); y.push(s / A[0]); });
      const n = Math.min(sel, X.length) - 1;
      const tb = B.map((c, k) => n - k >= 0 ? `${fmt(c, 4)}·${fmt(X[n - k], 4)}` : null).filter(Boolean), ta = A.map((c, k) => k && n - k >= 0 ? `− ${fmt(c, 4)}·${fmt(y[n - k], 4)}` : null).filter(Boolean);
      const s = y[n] * A[0];
      body = html`<table className="mv2-tbl"><thead><tr><th>n</th><th>x(n)</th><th>y(n)</th></tr></thead><tbody>${X.map((v, k) => html`<tr key=${k} className=${'pick' + (k === n ? ' on' : '')} onClick=${() => setSel(k + 1)}><td>${k + 1}</td><td>${fmt(v, 4)}</td><td>${fmt(y[k], 4)}</td></tr>`)}</tbody></table>
        <div className="mv2-calc"><div>a(1)y(${n + 1}) = ${[tb.join(' + '), ta.join(' ')].filter(Boolean).join(' ')}</div>
        <div>${fmt(A[0], 4)}·y(${n + 1}) = ${fmt(s, 4)}</div><div className="mv2-res">y(${n + 1}) = ${A[0] !== 1 ? `${fmt(s, 4)} / ${fmt(A[0], 4)} = ` : ''}${fmt(y[n], 4)}</div>
        ${A[0] !== 1 && html`<div className="mv2-note">a(1) ≠ 1, so every coefficient is normalised by a(1) = ${fmt(A[0], 4)}.</div>`}</div>`;
    }
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['fir', 'FIR example'], ['iir', 'IIR example'], ['norm', 'a(1) = 2'], ['zero', 'a(1) = 0']]} on=${pre} set=${load} />
      <div className="mv2-form wide"><label>B = {b<sub>k</sub>} (feed-forward)<input value=${b} onInput=${e => setB(e.target.value)} /></label>
        <label>A = {a<sub>k</sub>} (feedback)<input value=${a} onInput=${e => setA(e.target.value)} /></label>
        <label>X (input)<input value=${x} onInput=${e => setX(e.target.value)} /></label></div>
      <p className="mv2-fx">Y = filter(B, A, X)</p>${body}</div>
      <${Cap} en=${'MATLAB filter(B, A, X) is a Direct Form II Transposed IIR/FIR hybrid: a(1)y(n) = b(1)x(n) + … + b(nb+1)x(n − nb) − a(2)y(n − 1) − … − a(na+1)y(n − na). With A = 1 it is an FIR filter; any further a(k) adds feedback (IIR). If a(1) ≠ 1 the coefficients are normalised by a(1); a(1) = 0 is an error. Tap a row to see its sum.'}
        ar=${'الـ <bdi>filter(B, A, X)</bdi> في MATLAB هو hybrid بين IIR و FIR بطريقة Direct Form II Transposed:<span class="ltr">a(1)y(n) = b(1)x(n) + … + b(nb+1)x(n − nb) − a(2)y(n − 1) − … − a(na+1)y(n − na)</span>لو <bdi>A = 1</bdi> يبقى FIR، وأي <bdi>a(k)</bdi> زيادة بتضيف feedback يعني IIR. لو <bdi>a(1) ≠ 1</bdi> الـ coefficients بتتقسم على <bdi>a(1)</bdi>، ولو <bdi>a(1) = 0</bdi> يطلع error. دوس على أي صف تشوف الجمع بتاعه.'} showAr=${ar} /></figure>`;
  }

  /* ── slides 34–36: IIRdemo.m, coefficients and the loop by hand ── */
  function IirDemo({ ar }) {
    const [fg, setFg] = useState('4000'), [fa, setFa] = useState('48000'), [j, setJ] = useState(calm() ? 19 : 0);
    const g = parseNum(fg), s = parseNum(fa), ok = g > 0 && s > 0 && g < s / 2;
    const L = 19;
    let C = null, tr = [];
    if (ok) {
      const k = Math.tan(Math.PI * g / s), d = 1 + Math.SQRT2 * k + k * k;
      C = { k, b: [1 / d, -2 / d, 1 / d], a: [1, 2 * (k * k - 1) / d, (1 - Math.SQRT2 * k + k * k) / d] };
      let xh1 = 0, xh2 = 0, yh1 = 0, yh2 = 0;
      for (let n = 1; n <= L; n++) { const x = n === 1 ? 1 : 0, st = { xh1, xh2, yh1, yh2 }; const y = C.b[0] * x + C.b[1] * xh1 + C.b[2] * xh2 - C.a[1] * yh1 - C.a[2] * yh2; xh2 = xh1; xh1 = x; yh2 = yh1; yh1 = y; tr.push({ n, x, y, st, after: { xh1, xh2, yh1, yh2 } }); }
    }
    useEffect(() => { if (calm() || j >= L || !ok) return; const t = setTimeout(() => setJ(v => v + 1), j ? 650 : 1400); return () => clearTimeout(t); }, [j, ok]);
    const ymax = ok ? Math.max(1, ...tr.map(t => Math.abs(t.y))) * 1.1 : 1.1;
    const F = frame({ H: 110, L: 36, B: 24, T: 8, x0: -0.5, x1: L - 0.5, y0: -ymax, y1: ymax });
    const cur = ok && j ? tr[j - 1] : null, f4 = v => fmt(v, 4);
    return html`<figure className="fig mv2"><div className="fig-stage">
      <div className="mv2-form"><label>fg (cut-off, Hz)<input value=${fg} onInput=${e => { setFg(e.target.value); setJ(0); }} inputMode="decimal" /></label><label>fa (sampling, Hz)<input value=${fa} onInput=${e => { setFa(e.target.value); setJ(0); }} inputMode="decimal" /></label></div>
      ${ok ? html`<div className="mv2-calc"><div>k = tan(π·${fmt(g)}/${fmt(s)}) = ${f4(C.k)}</div><div>b(1..3) = ${C.b.map(f4).join(', ')}</div><div>a(1..3) = ${C.a.map(f4).join(', ')}</div></div>
      <p className="mv2-pl">x(n): impulse 1, 0, 0, …</p><svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label="impulse input"><${Axes} F=${F} yt=${[[-1, '−1'], [0, '0'], [1, '1']].filter(v => Math.abs(v[0]) <= ymax)} xt=${[0, 4, 8, 12, 16]} /><${Stems} F=${F} d=${N(L, n => n ? 0 : 1)} hi=${j - 1} /></svg>
      <p className="mv2-pl">y(n)</p><svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label="filter output"><${Axes} F=${F} yt=${[[-1, '−1'], [0, '0'], [1, '1']].filter(v => Math.abs(v[0]) <= ymax)} xt=${[0, 4, 8, 12, 16]} /><${Stems} F=${F} d=${tr.map(t => t.y)} show=${j} hi=${j - 1} /></svg>
      <div className="mv2-calc">${cur ? html`<div>n=${cur.n}: y(n) = b(1)·${cur.x} + b(2)·xh1 + b(3)·xh2 − a(2)·yh1 − a(3)·yh2</div><div>xh1=${f4(cur.st.xh1)}, xh2=${f4(cur.st.xh2)}, yh1=${f4(cur.st.yh1)}, yh2=${f4(cur.st.yh2)}</div><div className="mv2-res">y(${cur.n}) = ${f4(cur.y)}</div><div className="mv2-note">then xh2=xh1; xh1=x(n); yh2=yh1; yh1=y(n)</div>` : html`<div className="mv2-note">All state variables xh1, xh2, yh1, yh2 start at 0. Press Next to run the loop.</div>`}</div>`
        : html`<p className="mv2-out">Enter fg and fa with 0 < fg < fa/2.</p>`}</div>
      <${Cap} en=${'IIRdemo.m builds the filter banks by hand: k = tan(π·fg/fa) with fg = 4000 Hz and fa = 48000 Hz, three b and three a coefficients (a(1) = 1). The loop applies the difference equation sample by sample, keeping the last two inputs (xh1, xh2) and outputs (yh1, yh2). Feeding in an impulse gives the slide\'s output. filter() does the same for any filter length. (The plot index starts at 0; the loop\'s n starts at 1.)'}
        ar=${'الـ IIRdemo.m بيبني الـ filter banks بإيده:<span class="ltr">k = tan(π·fg/fa), fg = 4000 Hz, fa = 48000 Hz</span>وبيحسب 3 coefficients لـ b و 3 لـ a (و <bdi>a(1) = 1</bdi>). الـ loop بيطبق الـ difference equation sample بـ sample، وبيحفظ آخر اتنين inputs (xh1 و xh2) وآخر اتنين outputs (yh1 و yh2). لما ندخل impulse يطلع الـ output اللي في السلايد. الـ <bdi>filter()</bdi> بيعمل نفس الحاجة لأي طول filter. (الرسمة بتبدأ من 0 والـ n بتاع الـ loop بيبدأ من 1.)'} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setJ(v => Math.max(0, v - 1))} disabled=${!j}>‹ Back</button><button className="fig-btn" onClick=${() => setJ(v => Math.min(L, v + 1))} disabled=${j >= L || !ok}>Next ›</button><button className="fig-btn" onClick=${() => setJ(0)}>↻ Replay</button></div></figure>`;
  }

  /* ════════ [4] Frequency domain and the Fourier Transform ════════ */

  /* ── slide 41: a piano chord in the time and frequency domains ── */
  const CHORD = [['D♭', 554.40], ['F', 698.48], ['A♭', 830.64], ['C', 1046.56]];
  function Chord({ ar }) {
    const [on, setOn] = useState([1, 1, 1, 1]);
    const act = CHORD.filter((_, k) => on[k]), n = act.length;
    const T = frame({ H: 140, L: 30, x0: 0, x1: 10, y0: -4.4, y1: 4.4 });
    const S = frame({ H: 140, L: 30, T: 24, x0: 0, x1: 1200, y0: 0, y1: 1.2 });
    const sig = t => act.reduce((s, [, f]) => s + Math.sin(P2 * f * t / 1000), 0);
    return html`<figure className="fig mv2"><div className="fig-stage">
      <div className="mv2-row">${CHORD.map(([nm, f], k) => html`<button key=${k} className=${'fig-btn' + (on[k] ? ' mv2-sel' : '')} onClick=${() => { const o = on.slice(); o[k] = o[k] ? 0 : 1; setOn(o); }}>${nm} ${f.toFixed(2)} Hz</button>`)}</div>
      <p className="mv2-pl">Temporal domain: amplitude against time (ms)</p>
      <svg className="mv2-s" viewBox="0 0 300 140" role="img" aria-label="The chord's waveform over 10 milliseconds">
        <${Axes} F=${T} yt=${[-4, 0, 4]} xt=${[0, 5, 10]} />
        ${n ? html`<path d=${curve(sig, 0, 10, 800, T.X, T.Y)} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" />` : null}
      </svg>
      <p className="mv2-pl">Frequency domain: the pitches and their amplitudes (Hz)</p>
      <svg className="mv2-s" viewBox="0 0 300 140" role="img" aria-label="The chord's spectrum: one line at each note's fundamental frequency">
        <${Axes} F=${S} yt=${[0, 1]} xt=${[0, 400, 800, 1200]} />
        ${CHORD.map(([nm, f], k) => on[k] ? html`<g key=${k}><path d=${`M${S.X(f)} ${S.Y(0)} V${S.Y(1)}`} stroke="var(--k-mm)" strokeWidth="4" /><text x=${S.X(f)} y=${S.Y(1) - 5} textAnchor="middle" fontSize="14" className="mv2-kt">${nm}</text></g>` : null)}
      </svg></div>
      <${Cap} en=${'A complicated sound such as a chord can be described in the <b>temporal domain</b> (the amplitude sampled many times a second, a function of time) or the <b>frequency domain</b> (the pitches of the notes and their amplitudes). Fundamentals: D♭ 554.40 Hz, F 698.48 Hz, A♭ 830.64 Hz, C 1046.56 Hz; a real piano adds harmonics, not drawn here. Tap a note to switch it off.'}
        ar=${'أي صوت معقد زي الـ chord ممكن نوصفه في الـ <b>temporal domain</b> (الـ amplitude متعملها sampling مرات كتير في الثانية، يعني function في الوقت) أو في الـ <b>frequency domain</b> (الـ pitches بتاعة النوتات والـ amplitudes بتاعتها). الـ Fundamentals هي<span class="ltr">D♭ 554.40 Hz, F 698.48 Hz, A♭ 830.64 Hz, C 1046.56 Hz</span>والبيانو الحقيقي بيضيف harmonics مش مرسومة هنا. دوس على أي نوتة تقفلها.'} showAr=${ar} /></figure>`;
  }

  /* ── slide 42: an 8 Hz sine and its single spectral peak ── */
  function EightHz({ ar }) {
    const [f, setF] = useState(8);
    const T = frame({ H: 130, L: 30, x0: 0, x1: 1, y0: -1.2, y1: 1.2 });
    const S = frame({ H: 130, L: 30, T: 22, x0: 0, x1: 20, y0: 0, y1: 1.2 });
    return html`<figure className="fig mv2"><div className="fig-stage">
      <p className="mv2-pl">Time domain (s)</p>
      <svg className="mv2-s" viewBox="0 0 300 130" role="img" aria-label=${`A ${f} Hz sine over one second`}><${Axes} F=${T} yt=${[-1, 0, 1]} xt=${[0, 0.5, 1]} /><path d=${curve(t => Math.sin(P2 * f * t), 0, 1, 600, T.X, T.Y)} stroke="var(--k-mm)" strokeWidth="1.6" fill="none" /></svg>
      <p className="mv2-pl">Frequency domain (Hz)</p>
      <svg className="mv2-s" viewBox="0 0 300 130" role="img" aria-label=${`One peak at ${f} Hz with magnitude 1`}><${Axes} F=${S} yt=${[0, 0.5, 1]} xt=${[0, 5, 10, 15, 20]} /><path d=${`M${S.X(f)} ${S.Y(0)} V${S.Y(1)}`} stroke="var(--k-mm)" strokeWidth="4" /><text x=${S.X(f)} y=${S.Y(1) - 5} textAnchor="middle" fontSize="14" className="mv2-kt">${f} Hz, 1.0</text></svg>
      <${Sl} label="f (Hz)" min="1" max="19" v=${f} set=${setF} /></div>
      <${Cap} en=${`A ${f} Hz sine completes ${f} cycles in one second. In the frequency domain there is <b>one peak</b> at ${f} Hz (only one sine wave here) with magnitude 1.0, i.e. the whole signal.`}
        ar=${`الـ sine اللي بـ <bdi>${f} Hz</bdi> بتعمل ${f} cycles في الثانية. في الـ frequency domain فيه <b>peak واحدة</b> عند <bdi>${f} Hz</bdi> (لأن فيه sine wave واحدة بس) والـ magnitude بتاعها <bdi>1.0</bdi> يعني الإشارة كلها.`} showAr=${ar} /></figure>`;
  }

  /* ── slides 43–44: what frequencies in an image mean ── */
  const dft1 = f => { const n = f.length; return N(n, u => { let r = 0, i = 0; f.forEach((v, x) => { const a = -P2 * x * u / n; r += v * Math.cos(a); i += v * Math.sin(a); }); return [r / n, i / n]; }); };
  const LINES = (() => { const r1 = rng(7), r2 = rng(11); const obj = N(64, x => x >= 20 && x < 44 ? 1 : 0); return { obj, text: N(64, () => r1() < .4 ? 0 : 1), noise: obj.map(v => Math.max(0, Math.min(1, v + (r2() - .5) * .9))) }; })();
  function ImageLine({ ar }) {
    const [m, setM] = useState('obj');
    const f = LINES[m], Fu = dft1(f), mag = N(32, u => Math.hypot(...Fu[u + 1]));
    const e = mag.map(v => v * v), lowE = e.slice(0, 8).reduce((s, v) => s + v, 0), tot = e.reduce((s, v) => s + v, 0), low = Math.round(100 * lowE / tot);
    const B = frame({ H: 100, L: 30, x0: -0.5, x1: 63.5, y0: -0.1, y1: 1.1 });
    const top = Math.max(...mag) * 1.1, S = frame({ H: 120, L: 34, x0: 0.5, x1: 32.5, y0: 0, y1: top });
    const C = { obj: ['One simple object (a white box on black) fills the line: <b>large low-frequency components</b>, large-scale features dominate.', 'فيه object واحد بسيط (مربع أبيض على أسود) ماليّ الخط: <b>low-frequency components كبيرة</b>، يعني الحاجات الكبيرة هي المسيطرة.'], text: ['A line through a page of text: the brightness changes rapidly over short distances, so the <b>high-frequency components are large</b>.', 'خط ماشي على صفحة كلام: الـ brightness بيتغير بسرعة على مسافات صغيرة، فالـ <b>high-frequency components كبيرة</b>.'], noise: ['The same box with noise added: the noise brings in <b>very high frequencies</b> on top of the box\'s low ones.', 'نفس المربع ومعاه noise: الـ noise بيضيف <b>frequencies عالية جدًا</b> فوق الـ low frequencies بتاعة المربع.'] }[m];
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['obj', 'One simple object'], ['text', 'Page of text'], ['noise', 'Object + noise']]} on=${m} set=${setM} />
      <p className="mv2-pl">Brightness along one line of the image (64 equally spaced samples)</p>
      <div className="mv2-strip">${f.map((v, k) => html`<i key=${k} style=${{ background: `rgb(${Math.round(v * 255)},${Math.round(v * 255)},${Math.round(v * 255)})` }}></i>`)}</div>
      <svg className="mv2-s" viewBox="0 0 300 100" role="img" aria-label="brightness against distance"><${Axes} F=${B} yt=${[0, 1]} xt=${[0, 32, 63]} /><path d=${pathOf(f.flatMap((v, k) => [[B.X(k - .5), B.Y(v)], [B.X(k + .5), B.Y(v)]]))} stroke="var(--k-mm)" strokeWidth="1.6" fill="none" /></svg>
      <p className="mv2-pl">Spatial frequencies |F(u)|, u = 1 … 32 (u = 0, the average brightness, not drawn)</p>
      <svg className="mv2-s" viewBox="0 0 300 120" role="img" aria-label="magnitude of each spatial frequency"><${Axes} F=${S} xt=${[1, 8, 16, 24, 32]} />
        ${mag.map((v, k) => html`<rect key=${k} x=${S.X(k + 1) - 3} y=${S.Y(v)} width="6" height=${S.Y(0) - S.Y(v)} fill=${k < 8 ? 'var(--k-mm)' : 'var(--graphite)'} />`)}</svg>
      <${Leg} items=${[['var(--k-mm)', 'low (u ≤ 8)'], ['var(--graphite)', 'high (u > 8)']]} />
      <p className="mv2-out">Share of the energy in the low frequencies: <span className="mv2-v">${low}%</span></p></div>
      <${Cap} en=${C[0] + ' Brightness along a line can be recorded at equally spaced distances or as a set of spatial frequencies; a whole image gives a 2D grid of them.'} ar=${C[1] + ' الـ brightness على خط ممكن نسجله على مسافات متساوية أو كمجموعة spatial frequencies؛ والصورة كلها بتدي grid ثنائي الأبعاد منهم.'} showAr=${ar} /></figure>`;
  }

  /* ── slides 45–46: summing sine waves into a square(ish) wave ── */
  function Additive({ ar }) {
    const steps = [
      { en: 'Start with the <b>200 Hz</b> sine (the fundamental).', ar: 'نبدأ بالـ sine اللي بـ <b>200 Hz</b> (الـ fundamental).' },
      { en: 'Add <b>600 Hz</b> (3 × 200) with a third of the amplitude.', ar: 'نضيف <b>600 Hz</b> (يعني <bdi>3 × 200</bdi>) بتلت الـ amplitude.' },
      { en: 'Add <b>1000 Hz</b> (5 × 200) with a fifth: the sum already looks square(ish), as on the slide.', ar: 'نضيف <b>1000 Hz</b> (يعني <bdi>5 × 200</bdi>) بخُمس الـ amplitude: المجموع بقى شبه square زي السلايد.' },
      { en: 'Keep adding odd multiples (1400, 1800, … Hz): the sum gets closer and closer to a square wave.', ar: 'نكمّل نضيف الـ odd multiples (<bdi>1400, 1800, … Hz</bdi>): المجموع بيقرب أكتر وأكتر من الـ square wave.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400), [ov, setOv] = useState(null);
    const K = ov == null ? [1, 2, 3, 10][i] : ov, wrap = { go: j => { setOv(null); ctl.go(j); }, replay: () => { setOv(null); ctl.replay(); } };
    const comp = k => t => Math.sin(P2 * (2 * k + 1) * 200 * t / 1000) / (2 * k + 1);
    const sum = t => N(K, k => comp(k)(t)).reduce((s, v) => s + v, 0);
    const T = frame({ H: 150, L: 30, x0: 0, x1: 10, y0: -1.15, y1: 1.15 }), S = frame({ H: 110, L: 30, T: 10, x0: 0, x1: 4000, y0: 0, y1: 1.1 });
    return html`<figure className="fig mv2"><div className="fig-stage">
      <p className="mv2-pl">The components (thin) and their sum (thick), time in ms</p>
      <svg className="mv2-s" viewBox="0 0 300 150" role="img" aria-label=${`Sum of the first ${K} odd harmonics of 200 Hz`}>
        <${Axes} F=${T} yt=${[-1, 0, 1]} xt=${[0, 5, 10]} />
        ${K <= 4 && N(K, k => html`<path key=${k} d=${curve(comp(k), 0, 10, 500, T.X, T.Y)} stroke="var(--graphite)" strokeWidth="1" fill="none" opacity=".75" />`)}
        <path d=${curve(sum, 0, 10, 900, T.X, T.Y)} stroke="var(--k-mm)" strokeWidth="2.6" fill="none" />
      </svg>
      <p className="mv2-pl">Spectrum (Hz): 200, 600, 1000, … with amplitude 1, 1/3, 1/5, …</p>
      <svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label="spectrum of the sum"><${Axes} F=${S} yt=${[0, 1]} xt=${[0, 1000, 2000, 3000, 4000]} />
        ${N(K, k => (2 * k + 1) * 200 <= 4000 && html`<path key=${k} d=${`M${S.X((2 * k + 1) * 200)} ${S.Y(0)} V${S.Y(1 / (2 * k + 1))}`} stroke="var(--k-mm)" strokeWidth="3.5" />`)}</svg>
      <${Sl} label="sines" min="1" max="10" v=${K} set=${setOv} /></div>
      <${Cap} en=${'Any digital signal can be decomposed into sine waves of different amplitude, frequency and phase that add back to the original. A 200 Hz square(ish) wave is made of sinusoids at 200, 600, 1000 Hz … (odd multiples): this is also how additive synthesis works. ' + (ov == null ? steps[i].en : `Now ${K} sine${K > 1 ? 's' : ''}.`)}
        ar=${'أي digital signal ممكن نفككها لـ sine waves بـ amplitudes و frequencies و phases مختلفة، ولما نجمعهم ترجع الأصلية. الـ square(ish) wave اللي بـ <bdi>200 Hz</bdi> متكونة من sinusoids عند<span class="ltr">200, 600, 1000 Hz … (odd multiples)</span>وده برضه اللي بيعمله الـ additive synthesis. ' + (ov == null ? steps[i].ar : `دلوقتي فيه ${K} sines.`)} showAr=${ar} />
      <${Bar} steps=${steps} i=${ov == null ? i : steps.length - 1} ctl=${wrap} /></figure>`;
  }

  /* ── slides 48–49: filtering in frequency space, think graphic equaliser ── */
  const EQB = ['31', '63', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'];
  const EQP = { flat: N(10, () => 6), low: N(10, k => k < 5 ? 6 : 0), high: N(10, k => k < 5 ? 0 : 6), band: N(10, k => k >= 4 && k <= 7 ? 6 : 0) };
  function Eq({ ar }) {
    const [g, setG] = useState(EQP.low);
    const pre = Object.keys(EQP).find(k => EQP[k].every((v, j) => v === g[j])) || null;
    const kept = EQB.filter((_, k) => g[k] === 6), cut = EQB.filter((_, k) => g[k] === 0);
    const C = { flat: ['Flat: every frequency passes unchanged.', 'الإعداد الـ Flat بيعدّي كل الـ frequencies زي ما هي.'], low: ['<b>Low-pass</b>: keep the low frequencies, ignore the high ones (e.g. high-frequency noise).', 'الـ <b>Low-pass</b>: بنسيب الـ low frequencies ونتجاهل العالية (زي الـ high-frequency noise).'], high: ['<b>High-pass</b>: the opposite, keep only the high frequencies.', 'الـ <b>High-pass</b>: العكس، بنسيب الـ high frequencies بس.'], band: ['<b>Band-pass</b>: only a range of frequencies passes.', 'الـ <b>Band-pass</b>: بيعدّي range معين من الـ frequencies بس.'] }[pre] || ['Your own setting: lower a band to attenuate it, empty it to remove it.', 'إعداد من عندك: نزّل أي band عشان تقلله، وفضّيه خالص عشان تشيله.'];
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['low', 'Low-pass'], ['high', 'High-pass'], ['band', 'Band-pass'], ['flat', 'Flat']]} on=${pre} set=${k => setG(EQP[k])} />
      <div className="mv2-eq">${EQB.map((b, k) => html`<div key=${k} className="col">${N(6, r => { const lv = 6 - r; return html`<button key=${r} className=${g[k] >= lv ? 'on' : ''} aria-label=${`${b} Hz level ${lv}`} onClick=${() => { const o = g.slice(); o[k] = o[k] === lv ? lv - 1 : lv; setG(o); }}></button>`; })}<span>${b}</span></div>`)}</div>
      <p className="mv2-out">${kept.length ? html`passed: <span className="mv2-v">${kept.join(', ')}</span>` : 'nothing passes untouched'}${cut.length ? html` · removed: <span className="mv2-r">${cut.join(', ')}</span>` : ''} (Hz)</p></div>
      <${Cap} en=${'Filtering in frequency space means <b>attenuating or removing</b> certain frequencies. Think of a graphic equaliser: each slider is one frequency band. ' + C[0] + ' Tap the cells to set each band.'} ar=${'الـ Filtering في الـ frequency space معناه إننا <b>نقلل أو نشيل</b> frequencies معينة. تخيل الـ graphic equaliser: كل slider هو frequency band. ' + C[1] + ' دوس على المربعات عشان تظبط كل band.'} showAr=${ar} /></figure>`;
  }

  /* ════════ [5] FT formulas, DFT and spectra ════════ */

  /* ── slides 54–56: the Fourier transform of a top hat is the sinc function ── */
  function Sinc({ ar }) {
    const steps = [
      { en: 'The top hat: f(x) = 1 for |x| ≤ 1, 0 otherwise. Its area is 2.', ar: 'الـ top hat هي <bdi>f(x) = 1</bdi> لما <bdi>|x| ≤ 1</bdi> وصفر غير كده، ومساحتها 2.' },
      { en: 'F(u) = ∫ f(x)e<sup>−2πixu</sup>dx over −1 … 1 = (−1/2πiu)(e<sup>−2πiu</sup> − e<sup>2πiu</sup>) = sin(2πu)/(πu): the <b>sinc function</b>.', ar: 'بنحسب التكامل من −1 لـ 1 فيطلع الـ <b>sinc function</b>:<span class="ltr">F(u) = (−1/2πiu)(e^(−2πiu) − e^(2πiu)) = sin(2πu)/(πu)</span>' },
      { en: 'As u → 0 the peak value is <b>2</b>, the area of the top hat.', ar: 'لما <bdi>u → 0</bdi> القيمة العظمى بتبقى <b>2</b>، وهي مساحة الـ top hat.' },
      { en: 'Zeros at u = ±0.5, ±1, ±1.5, …', ar: 'الأصفار عند<span class="ltr">u = ±0.5, ±1, ±1.5, …</span>' },
      { en: 'F(u) is <b>purely real</b> because f is even (symmetric in x and −x). Drag u to read values.', ar: 'الـ F(u) <b>real بالكامل</b> لأن الـ f دالة even (متماثلة بين x و −x). حرّك u عشان تقرا القيم.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), [u, setU] = useState(0.25);
    const sc = v => Math.abs(v) < 1e-9 ? 2 : Math.sin(P2 * v) / (Math.PI * v);
    const A = frame({ H: 110, L: 30, x0: -2, x1: 2, y0: -0.1, y1: 1.25 }), B = frame({ H: 170, L: 30, x0: -3, x1: 3, y0: -0.6, y1: 2.25 });
    return html`<figure className="fig mv2"><div className="fig-stage">
      <p className="mv2-pl">f(x): top hat</p>
      <svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label="Top hat of height 1 from x = -1 to 1">
        <${Axes} F=${A} yt=${[0, 1]} xt=${[-2, -1, 0, 1, 2]} />
        <rect x=${A.X(-1)} y=${A.Y(1)} width=${A.X(1) - A.X(-1)} height=${A.Y(0) - A.Y(1)} fill="color-mix(in srgb, var(--k-mm) 20%, transparent)" />
        <path d=${`M${A.X(-2)} ${A.Y(0)} H${A.X(-1)} V${A.Y(1)} H${A.X(1)} V${A.Y(0)} H${A.X(2)}`} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" />
        <text x=${A.X(0)} y=${A.Y(0.45)} textAnchor="middle" fontSize="14">area = 2</text></svg>
      <p className="mv2-pl">F(u) = sin(2πu)/(πu)</p>
      <svg className="mv2-s" viewBox="0 0 300 170" role="img" aria-label="The sinc function, peak 2 at u = 0, zeros at multiples of 0.5">
        <${Axes} F=${B} yt=${[0, 1, 2]} xt=${[-3, -2, -1, 0, 1, 2, 3]} />
        <path className="mv2-fade" style=${{ opacity: i >= 1 ? 1 : 0 }} d=${curve(sc, -3, 3, 600, B.X, B.Y)} stroke="var(--k-mm)" strokeWidth="2.2" fill="none" />
        ${i >= 2 && html`<g><circle cx=${B.X(0)} cy=${B.Y(2)} r="5" fill="var(--pen)" /><text x=${B.X(0) + 9} y=${B.Y(2) + 5} fontSize="14" className="mv2-pt">2</text></g>`}
        ${i >= 3 && N(6, k => (k + 1) * .5).flatMap(v => [v, -v]).map(v => html`<circle key=${v} cx=${B.X(v)} cy=${B.Y(0)} r="3.5" fill="var(--paper)" stroke="var(--pen)" strokeWidth="2" />`)}
        ${i >= 4 && html`<g><path d=${`M${B.X(u)} ${B.Y(0)} V${B.Y(sc(u))}`} stroke="var(--ink)" strokeDasharray="3 3" /><circle cx=${B.X(u)} cy=${B.Y(sc(u))} r="5" fill="var(--ink)" /></g>`}
      </svg>
      ${i >= 4 && html`<${Sl} label="u" min="-3" max="3" step="0.05" v=${u} set=${setU} out=${fmt(u, 2)} /><p className="mv2-out">F(${fmt(u, 2)}) = ${Math.abs(u) < 1e-9 ? 'limit 2' : `sin(2π·${fmt(u, 2)})/(π·${fmt(u, 2)})`} = <span className="mv2-v">${fmt(sc(u), 4)}</span></p>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 58–59: the 1D DFT, one sum at a time ── */
  const DSIG = { cos: ['cos 1 cycle', N(8, x => Math.cos(P2 * x / 8))], sin: ['sin 2 cycles', N(8, x => Math.sin(P2 * 2 * x / 8))], hat: ['top hat', [1, 1, 1, 0, 0, 0, 1, 1]], imp: ['impulse', [1, 0, 0, 0, 0, 0, 0, 0]] };
  const fmtC = (re, im, d = 3) => { const r = rd(re, d), i = rd(im, d); if (!r && !i) return '0'; if (!i) return fmt(r, d); const is = (Math.abs(i) === 1 ? '' : fmt(Math.abs(i), d)) + 'i'; if (!r) return (i < 0 ? '−' : '') + is; return `${fmt(r, d)} ${i < 0 ? '−' : '+'} ${is}`; };
  function DftWalk({ f, u, ar }) {
    const n = f.length, [i, ctl] = useSteps(n + 1, 700);
    const terms = f.map((v, x) => { const a = -P2 * x * u / n; return [v * Math.cos(a), v * Math.sin(a), a]; });
    const ps = [[0, 0]]; terms.forEach(([r, im]) => ps.push([ps[ps.length - 1][0] + r, ps[ps.length - 1][1] + im]));
    const R = Math.max(1, ...ps.map(p => Math.max(Math.abs(p[0]), Math.abs(p[1])))) * 1.15, sc = 92 / R, X = v => 150 + v * sc, Y = v => 104 - v * sc;
    const k = i - 1, S = ps[i], fin = i === n;
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}>
      <svg className="mv2-s" viewBox="0 0 300 208" role="img" aria-label="The terms of the DFT sum added head to tail in the complex plane">
        <defs>${marker('mv2-ad', 'var(--k-mm)')}${marker('mv2-ad2', 'var(--pen)')}</defs>
        <path d="M10 104 H290 M150 6 V202" stroke="var(--faint)" /><text x="288" y="98" textAnchor="end" fontSize="14" className="mv2-gt">Re</text><text x="156" y="20" fontSize="14" className="mv2-gt">Im</text>
        ${terms.slice(0, i).map(([r, im], j) => (Math.abs(r) + Math.abs(im) > 1e-9) && html`<path key=${j} d=${`M${X(ps[j][0])} ${Y(ps[j][1])} L${X(ps[j + 1][0])} ${Y(ps[j + 1][1])}`} stroke=${j === k ? 'var(--pen)' : 'var(--k-mm)'} strokeWidth="2.4" markerEnd=${`url(#${j === k ? 'mv2-ad2' : 'mv2-ad'})`} />`)}
        <circle cx=${X(S[0])} cy=${Y(S[1])} r="4.5" fill="var(--ink)" />
      </svg>
      <div className="mv2-calc">${i === 0 ? html`<div className="mv2-note">Sum over x = 0 … ${n - 1} of f(x)·e<sup>−2πixu/N</sup>, here u = ${u}, N = ${n}. Press Next or wait.</div>` : html`<div>x = ${k}: f(${k})·e<sup>−2πi·${k}·${u}/${n}</sup> = ${fmt(f[k])} × (angle ${fmt(terms[k][2] * 180 / Math.PI, 1)}°) = ${fmtC(terms[k][0], terms[k][1])}</div><div>running sum = ${fmtC(S[0], S[1])}</div>`}
        ${fin && html`<div className="mv2-res">F(${u}) = (1/${n}) × ${fmtC(S[0], S[1])} = ${fmtC(S[0] / n, S[1] / n)}</div>`}</div></div>
      <${Cap} en=${'DFT: F(u) = (1/N) Σ<sub>x=0..N−1</sub> f(x)·e<sup>−2πixu/N</sup>. Each sample becomes a phasor (an arrow of length f(x) turned by −2πxu/N); the arrows are added head to tail and the total is divided by N. The inverse f(x) = Σ F(u)·e<sup>2πixu/N</sup> has the opposite sign and no 1/N. Tap a bar to pick u.'}
        ar=${'الـ DFT هو<span class="ltr">F(u) = (1/N) Σ(x=0..N−1) f(x)·e^(−2πixu/N)</span>كل sample بتبقى phasor (سهم طوله <bdi>f(x)</bdi> ومتلف بزاوية <bdi>−2πxu/N</bdi>)، الأسهم بتتجمع ورا بعض والمجموع بيتقسم على N. والـ inverse هو<span class="ltr">f(x) = Σ F(u)·e^(2πixu/N)</span>بإشارة عكسية ومن غير <bdi>1/N</bdi>. دوس على أي bar تختار u.'} showAr=${ar} />
      <${Bar} steps=${N(n + 1, j => j)} i=${i} ctl=${ctl} /></div>`;
  }
  function Dft({ ar }) {
    const [m, setM] = useState('cos'), [own, setOwn] = useState('1, 2, 3, 4, 0, 0, 0, 0'), [u, setU] = useState(1);
    const ov = parseList(own).slice(0, 16), f = m === 'own' ? (ov.length >= 2 && ov.every(isFinite) ? ov : [0, 0]) : DSIG[m][1], n = f.length, uu = Math.min(u, n - 1);
    const Fu = dft1(f), mags = Fu.map(c => Math.hypot(c[0], c[1])), top = Math.max(...mags, 1e-9);
    return html`<figure className="fig mv2"><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <${Chips} items=${[...Object.keys(DSIG).map(k => [k, DSIG[k][0]]), ['own', 'Try your own']]} on=${m} set=${setM} />
      ${m === 'own' && html`<div className="mv2-form wide"><label>f(x), 2 to 16 numbers<input value=${own} onInput=${e => setOwn(e.target.value)} /></label></div>`}
      <p className="mv2-out">f(x) = ${f.map(v => fmt(v, 3)).join(', ')}</p>
      <p className="mv2-pl">|F(u)| for u = 0 … ${n - 1} (tap one)</p>
      <div className="mv2-bins" style=${{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>${mags.map((v, k) => html`<button key=${k} className=${k === uu ? 'mv2-sel' : ''} onClick=${() => setU(k)} aria-label=${`u = ${k}`}><i style=${{ height: (v / top * 44) + 'px' }}></i><span>${k}</span></button>`)}</div>
      <p className="mv2-out">F(${uu}) = <span className="mv2-v">${fmtC(Fu[uu][0], Fu[uu][1])}</span></p></div>
      <${DftWalk} key=${m + f.join(',') + '|' + uu} f=${f} u=${uu} ar=${ar} /></figure>`;
  }

  /* ── slides 64–65: magnitude and phase of a complex F ── */
  function MagPhase({ ar }) {
    const [re, setRe] = useState(3), [im, setIm] = useState(4);
    const r = Math.hypot(re, im), ph = Math.atan(im / re) * 180 / Math.PI;
    const s = 26, X = v => 30 + v * s, Y = v => 150 - v * s;
    const arc = (() => { const rr = 30, a = Math.atan(im / re); return `M${X(0) + rr} ${Y(0)} A${rr} ${rr} 0 0 ${a > 0 ? 0 : 1} ${X(0) + rr * Math.cos(a)} ${Y(0) - rr * Math.sin(a)}`; })();
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 290" role="img" aria-label=${`F = ${re} + ${im}i drawn in the complex plane`}>
        <defs>${marker('mv2-am', 'var(--k-mm)')}</defs>
        <path d=${`M${X(0)} 10 V284 M10 ${Y(0)} H${X(10)}`} stroke="var(--graphite)" strokeWidth="1.2" />
        <text x=${X(10)} y=${Y(0) - 6} textAnchor="end" fontSize="14" className="mv2-gt">Re</text><text x=${X(0) + 6} y="22" fontSize="14" className="mv2-gt">Im</text>
        ${[-5, 5].map(v => html`<text key=${v} x=${X(0) - 6} y=${Y(v) + 5} textAnchor="end" fontSize="14">${v < 0 ? '−5' : '5'}</text>`)}<text x=${X(5)} y=${Y(0) + 18} textAnchor="middle" fontSize="14">5</text>
        <path d=${`M${X(re)} ${Y(0)} V${Y(im)}`} stroke="var(--graphite)" strokeDasharray="4 4" />
        <path d=${`M${X(0)} ${Y(0)} L${X(re)} ${Y(im)}`} stroke="var(--k-mm)" strokeWidth="3" markerEnd="url(#mv2-am)" />
        <path d=${arc} stroke="var(--pen)" strokeWidth="2" fill="none" /><text x=${X(0) + 36} y=${Y(0) - (im >= 0 ? 8 : -20)} fontSize="14" className="mv2-pt">φ</text>
        <text x=${X(re / 2) - 8} y=${Y(im / 2) - 8} textAnchor="end" fontSize="14" className="mv2-kt">|F| = ${fmt(r, 2)}</text>
      </svg>
      <${Sl} label=${html`F<sub>R</sub>`} min="0.5" max="9" step="0.5" v=${re} set=${setRe} />
      <${Sl} label=${html`F<sub>I</sub>`} min="-5" max="5" step="0.5" v=${im} set=${setIm} />
      <div className="mv2-calc"><div>F = ${fmtC(re, im, 2)}</div><div className="mv2-res">|F| = √(${fmt(re, 2)}² + ${fmt(im, 2)}²) = √${fmt(re * re + im * im, 2)} = ${fmt(r, 4)}</div><div className="mv2-res">φ = arctan(${fmt(im, 2)}/${fmt(re, 2)}) = ${fmt(ph, 2)}°</div><div>phasor form r·e<sup>iφ</sup> = ${fmt(r, 3)}·(cos ${fmt(ph, 2)}° + i sin ${fmt(ph, 2)}°)</div></div></div>
      <${Cap} en=${'The Fourier transform of real data is complex. <b>Magnitude spectrum</b>: |F(k)| = √(F<sub>R</sub>(k)² + F<sub>I</sub>(k)²) (MATLAB abs(fft(X,N))/N). <b>Phase spectrum</b>: φ = arctan(F<sub>I</sub>(k)/F<sub>R</sub>(k)) (MATLAB angle). Notes\' example: F = 3 + 4i → |F| = 5, φ ≈ 53.13°.'}
        ar=${'الـ Fourier transform للداتا الـ real بيطلع complex. الـ <b>Magnitude spectrum</b> هو<span class="ltr">|F(k)| = √(FR(k)² + FI(k)²)   (MATLAB abs(fft(X,N))/N)</span>والـ <b>Phase spectrum</b> هو<span class="ltr">φ = arctan(FI(k)/FR(k))   (MATLAB angle)</span>مثال النوتس:<span class="ltr">F = 3 + 4i → |F| = 5, φ ≈ 53.13°</span>'} showAr=${ar} /></figure>`;
  }

  /* ── slide 66: sample point k → frequency fk = k·fs/N ── */
  function BinFreq({ ar }) {
    const [fs, setFs] = useState('8000'), [n, setN] = useState('256'), [k, setK] = useState('32');
    const S = parseNum(fs), M = parseNum(n), K = parseNum(k), ok = S > 0 && M >= 1 && Number.isInteger(M) && Number.isInteger(K) && K >= 0 && K < M;
    const step = S / M, fk = K * step, top = (M - 1) * step;
    const ex = fs === '8000' && n === '256' && k === '32';
    return html`<figure className="fig mv2"><div className="fig-stage">
      <div className="mv2-form"><label>fs (Hz)<input value=${fs} onInput=${e => setFs(e.target.value)} inputMode="decimal" /></label><label>N<input value=${n} onInput=${e => setN(e.target.value)} inputMode="numeric" /></label><label>k<input value=${k} onInput=${e => setK(e.target.value)} inputMode="numeric" /></label></div>
      <div className="mv2-row"><button className=${'fig-btn' + (ex ? ' mv2-sel' : '')} onClick=${() => { setFs('8000'); setN('256'); setK('32'); }}>Example from the notes</button></div>
      ${ok ? html`<div className="mv2-trk"><i style=${{ width: (K / Math.max(1, M - 1) * 100) + '%' }}></i></div>
      <div className="mv2-tks"><span style=${{ left: '0%' }}>k = 0 → 0 Hz</span><span style=${{ left: '100%' }}>k = ${fmt(M - 1)} → ${fmt(top, 3)} Hz</span></div>
      <div className="mv2-calc"><div>step = fs/N = ${fmt(S)}/${fmt(M)} = ${fmt(step, 4)} Hz</div><div className="mv2-res">f${K} = k·fs/N = ${K} × ${fmt(step, 4)} = ${fmt(fk, 4)} Hz</div><div className="mv2-note">equidistant steps from 0 Hz to (N−1)fs/N = ${fmt(top, 3)} Hz</div></div>`
        : html`<p className="mv2-out">Enter fs > 0, a whole number N ≥ 1 and a whole k from 0 to N − 1.</p>`}</div>
      <${Cap} en=${'To label a DFT plot in Hz instead of sample points k = 0 … N − 1: f<sub>k</sub> = k·f<sub>s</sub>/N. Notes\' example: f<sub>s</sub> = 8000 Hz, N = 256 → steps of 31.25 Hz, and k = 32 is 1000 Hz.'}
        ar=${'عشان نكتب محور الـ DFT بالـ Hz بدل الـ sample points من 0 لـ <bdi>N − 1</bdi> بنستخدم <bdi>fk = k·fs/N</bdi>. مثال النوتس:<span class="ltr">fs = 8000 Hz, N = 256 → step 31.25 Hz, k = 32 → 1000 Hz</span>'} showAr=${ar} /></figure>`;
  }

  /* ── slides 67–68: the spectrogram (windowed STFT) ── */
  const WIN = { rect: ['No window', () => 1], hann: ['Hanning', (j, n) => .5 - .5 * Math.cos(P2 * j / (n - 1))], hamm: ['Hamming', (j, n) => .54 - .46 * Math.cos(P2 * j / (n - 1))], black: ['Blackman', (j, n) => .42 - .5 * Math.cos(P2 * j / (n - 1)) + .08 * Math.cos(2 * P2 * j / (n - 1))] };
  const SPF = 8000, SPL = 8192, SWEEP = (() => { const T = SPL / SPF; return N(SPL, j => { const t = j / SPF; return Math.sin(P2 * (500 * t + 3000 * t * t / (2 * T))); }); })();
  function segSpec(seg, w) { const n = seg.length, re = new Float64Array(n), im = new Float64Array(n); for (let j = 0; j < n; j++) re[j] = seg[j] * WIN[w][1](j, n); fft(re, im); return N(n / 2, k => Math.hypot(re[k], im[k])); }
  const heat = v => [Math.round(255 * Math.min(1, v * 1.6)), Math.round(255 * Math.max(0, Math.min(1, v * 1.8 - .6))), Math.round(255 * Math.max(0, v * 2.4 - 1.4))];
  function Spectrogram({ ar }) {
    const [segs, setSegs] = useState(32), [w, setW] = useState('hann'), [c, setC] = useState(calm() ? 64 : 0), ref = useRef(null);
    const len = SPL / segs;
    const cols = useMemo(() => { const out = N(segs, s => segSpec(SWEEP.slice(s * len, (s + 1) * len), w)); const mx = Math.max(...out.flat()); return out.map(col => col.map(v => Math.max(0, 1 + 20 * Math.log10(v / mx + 1e-12) / 80))); }, [segs, w]);
    useEffect(() => { if (calm()) { setC(segs); return; } setC(0); }, [segs, w]);
    useEffect(() => { if (c >= segs) return; const t = setTimeout(() => setC(v => v + 1), 70); return () => clearTimeout(t); }, [c, segs]);
    useEffect(() => { const cv = ref.current; if (!cv) return; const h = len / 2; cv.width = segs; cv.height = h; const g = cv.getContext('2d'); if (!g) return; const im = g.createImageData(segs, h); for (let s = 0; s < segs; s++) for (let k = 0; k < h; k++) { const p = 4 * ((h - 1 - k) * segs + s), v = s < c ? cols[s][k] : 0, [r, gg, b] = heat(v); im.data[p] = r; im.data[p + 1] = gg; im.data[p + 2] = b; im.data[p + 3] = 255; } g.putImageData(im, 0, 0); }, [c, cols]);
    const one = useMemo(() => { const sp = segSpec(SWEEP.slice(Math.floor(segs / 2) * len, (Math.floor(segs / 2) + 1) * len), w), mx = Math.max(...sp); return sp.map(v => Math.max(-100, 20 * Math.log10(v / mx + 1e-12))); }, [segs, w]);
    const F = frame({ H: 130, L: 40, x0: 0, x1: 4000, y0: -100, y1: 0 });
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[[16, '16 segments'], [32, '32'], [64, '64']]} on=${segs} set=${setSegs} />
      <${Chips} items=${Object.keys(WIN).map(k => [k, WIN[k][0]])} on=${w} set=${setW} />
      <p className="mv2-pl">Spectrogram: time → (1 s), frequency ↑ (0 to 4000 Hz)</p>
      <canvas ref=${ref} className="mv2-spg" role="img" aria-label="Spectrogram of a sine sweeping up from 500 to 3500 Hz"></canvas>
      <p className="mv2-out">segment ${Math.min(c, segs)} of ${segs}: ${len} samples = ${fmt(len / SPF * 1000, 1)} ms each</p>
      <p className="mv2-pl">One segment's spectrum in dB: leakage around the peak</p>
      <svg className="mv2-s" viewBox="0 0 300 130" role="img" aria-label="Spectrum of one windowed segment in decibels"><${Axes} F=${F} yt=${[[-100, '−100'], [-50, '−50'], [0, '0']]} xt=${[0, 2000, 4000]} />
        <path d=${pathOf(one.map((v, k) => [F.X(k * SPF / len), F.Y(v)]))} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" /></svg></div>
      <${Cap} en=${'Spectrogram: split the signal into N segments and take a windowed <b>Short-Time Fourier Transform</b> of each, giving the frequency content over time (here a sine sweeping from 500 to 3500 Hz, fs = 8000 Hz). A Blackman, Hamming or Hanning window reduces the <b>leakage</b> that a short segment spreads around each peak: compare "No window". MATLAB: spectrogram(y,512,20,1024,Fs).'}
        ar=${'الـ Spectrogram: بنقسم الإشارة لـ N segments ونعمل لكل واحد <b>Short-Time Fourier Transform</b> بـ window، فنشوف الـ frequencies بتتغير إزاي مع الوقت (هنا sine طالع من <bdi>500</bdi> لـ <bdi>3500 Hz</bdi> و <bdi>fs = 8000 Hz</bdi>). الـ window زي Blackman أو Hamming أو Hanning بيقلل الـ <b>leakage</b> اللي الـ segment القصير بيفرشه حوالين كل peak: قارن بـ "No window". وفي MATLAB<span class="ltr">spectrogram(y,512,20,1024,Fs)</span>'} showAr=${ar} /></figure>`;
  }

  /* ════════ [6] Filtering in the frequency domain ════════ */

  /* ── slides 70–74: G = H·F on a noisy 1D signal ── */
  const L1 = 128, CLEAN = N(L1, x => Math.sin(P2 * 2 * x / L1) + .5 * Math.sin(P2 * 5 * x / L1)), NOISY = (() => { const r = rng(5); return CLEAN.map(v => v + (r() - .5) * 1.1); })();
  const FN = (() => { const re = Float64Array.from(NOISY), im = new Float64Array(L1); fft(re, im); return [re, im]; })();
  function Lpf1d({ ar }) {
    const steps = [
      { en: 'f(x): the signal with noise, spurious high frequencies (rapid local transitions).', ar: 'الـ <bdi>f(x)</bdi>: الإشارة ومعاها noise، يعني high frequencies زيادة (تغييرات سريعة في أماكن صغيرة).' },
      { en: 'F(u): its Fourier transform. The two real components sit at low u; the noise is spread over all u.', ar: 'الـ <bdi>F(u)</bdi>: الـ Fourier transform بتاعها. الـ components الحقيقية قاعدة عند u صغيرة، والـ noise متفرش على كل الـ u.' },
      { en: 'H(u): the ideal low-pass filter, a top hat: 1 for u ≤ u0 (cut-off), 0 elsewhere.', ar: 'الـ <bdi>H(u)</bdi>: الـ ideal low-pass filter، وهو top hat قيمته 1 لما <bdi>u ≤ u0</bdi> (الـ cut-off) وصفر غير كده.' },
      { en: 'G(u) = H(u)·F(u): everything above u0 is discarded (MATLAB G = H.*F).', ar: 'الـ <bdi>G(u) = H(u)·F(u)</bdi>: أي حاجة فوق u0 بتتشال (في MATLAB <bdi>G = H.*F</bdi>).' },
      { en: 'g(x): the inverse FT of G, the improved signal. Move u0: too low and the signal itself is blurred, too high and the noise stays.', ar: 'الـ <bdi>g(x)</bdi>: الـ inverse FT لـ G، وهي الإشارة بعد التحسين. حرّك u0: لو واطي قوي الإشارة نفسها بتتمسح، ولو عالي قوي الـ noise بيفضل.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400), [u0, setU0] = useState(8);
    const H = N(L1, u => Math.min(u, L1 - u) <= u0 ? 1 : 0);
    const g = useMemo(() => { const re = Float64Array.from(FN[0], (v, u) => v * H[u]), im = Float64Array.from(FN[1], (v, u) => v * H[u]); fft(re, im, true); return Array.from(re); }, [u0]);
    const mag = N(65, u => Math.hypot(FN[0][u], FN[1][u]) / L1), top = Math.max(...mag) * 1.1;
    const T = frame({ H: 110, L: 30, x0: 0, x1: L1 - 1, y0: -2.2, y1: 2.2 }), S = frame({ H: 110, L: 40, x0: -0.5, x1: 64.5, y0: 0, y1: top });
    const sig = (d, col) => pathOf(d.map((v, x) => [T.X(x), T.Y(v)]));
    const bars = (d, col) => d.map((v, u) => html`<rect key=${u} x=${S.X(u) - 1.6} y=${S.Y(v)} width="3.2" height=${S.Y(0) - S.Y(v)} fill=${col} />`);
    const pan = (k, lab, body) => html`<div className="mv2-fade" style=${{ opacity: i >= k ? 1 : .15 }}><p className="mv2-pl">${lab}</p><svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label=${lab}>${body}</svg></div>`;
    return html`<figure className="fig mv2"><div className="fig-stage">
      ${pan(0, 'f(x): signal with noise', html`<${Axes} F=${T} yt=${[-2, 0, 2]} xt=${[0, 64, 127]} /><path d=${sig(NOISY)} stroke="var(--graphite)" strokeWidth="1.3" fill="none" />`)}
      ${pan(1, 'F(u) and the filter H(u), u = 0 … 64', html`<${Axes} F=${S} yt=${[0]} xt=${[0, 16, 32, 48, 64]} />${bars(mag, 'var(--graphite)')}${i >= 2 && html`<path d=${`M${S.X(0)} ${S.Y(top * .9)} H${S.X(u0 + .5)} V${S.Y(0)} H${S.X(64.5)}`} stroke="var(--pen)" strokeWidth="2.2" fill="none" />`}${i >= 2 && html`<text x=${S.X(u0 + .5) + 4} y="22" fontSize="14" className="mv2-pt">u0 = ${u0}</text>`}`)}
      ${pan(3, 'G(u) = H(u)·F(u)', html`<${Axes} F=${S} yt=${[0]} xt=${[0, 16, 32, 48, 64]} />${bars(mag.map((v, u) => v * H[u]), 'var(--k-mm)')}`)}
      ${pan(4, 'g(x) = inverse FT of G (dashed: the signal without noise)', html`<${Axes} F=${T} yt=${[-2, 0, 2]} xt=${[0, 64, 127]} /><path d=${sig(CLEAN)} stroke="var(--graphite)" strokeWidth="1.3" strokeDasharray="4 4" fill="none" /><path d=${sig(g)} stroke="var(--k-mm)" strokeWidth="2" fill="none" />`)}
      <${Sl} label="cut-off u0" min="1" max="64" v=${u0} set=${setU0} /></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 75: the ideal 2D low-pass filter, keep a circle of radius w0 ── */
  function Ideal2d({ ar }) {
    const [w0, setW0] = useState(20), [p, setP] = useState([12, 16]);
    const s = 5.4, X = u => 150 + u * s, Y = v => 150 - v * s, d = Math.hypot(p[0], p[1]), keep = d <= w0 + 1e-9;
    const tap = e => { const b = e.currentTarget.getBoundingClientRect(), x = (e.clientX - b.left) / b.width * 300, y = (e.clientY - b.top) / b.height * 300; setP([Math.max(-25, Math.min(25, Math.round((x - 150) / s))), Math.max(-25, Math.min(25, Math.round((150 - y) / s)))]); };
    const is = (a, b) => p[0] === a && p[1] === b;
    return html`<figure className="fig mv2"><div className="fig-stage">
      <div className="mv2-row"><button className=${'fig-btn' + (is(12, 16) ? ' mv2-sel' : '')} onClick=${() => { setP([12, 16]); setW0(20); }}>(12, 16)</button><button className=${'fig-btn' + (is(15, 16) ? ' mv2-sel' : '')} onClick=${() => { setP([15, 16]); setW0(20); }}>(15, 16)</button></div>
      <svg className="mv2-s" viewBox="0 0 300 300" role="img" aria-label=${`Frequency plane with a circle of radius ${w0}; point (${p[0]}, ${p[1]}) is ${keep ? 'kept' : 'discarded'}`} onClick=${tap} style=${{ cursor: 'crosshair', maxWidth: '360px' }}>
        <rect x="0" y="0" width="300" height="300" fill="var(--paper)" />
        ${N(11, k => (k - 5) * 5).map(v => html`<path key=${v} d=${`M${X(v)} 15 V285 M15 ${Y(v)} H285`} stroke="var(--line)" strokeWidth="1" />`)}
        <circle cx="150" cy="150" r=${w0 * s} fill="color-mix(in srgb, var(--k-mm) 22%, transparent)" stroke="var(--k-mm)" strokeWidth="2" />
        <path d="M15 150 H285 M150 15 V285" stroke="var(--graphite)" strokeWidth="1.3" />
        ${[-20, 20].map(v => html`<g key=${v}><text x=${X(v)} y="166" textAnchor="middle" fontSize="14">${v < 0 ? '−20' : '20'}</text><text x="144" y=${Y(v) + 5} textAnchor="end" fontSize="14">${v < 0 ? '−20' : '20'}</text></g>`)}
        <text x="282" y="142" textAnchor="end" fontSize="14" className="mv2-gt">u</text><text x="158" y="28" fontSize="14" className="mv2-gt">v</text>
        <path d=${`M150 150 L${X(p[0])} ${Y(p[1])}`} stroke="var(--ink)" strokeDasharray="4 3" />
        <circle cx=${X(p[0])} cy=${Y(p[1])} r="6" fill=${keep ? 'var(--ok)' : 'var(--pen)'} stroke="var(--paper)" strokeWidth="2" />
      </svg>
      <${Sl} label="w0" min="5" max="25" v=${w0} set=${setW0} />
      <div className="mv2-calc"><div>(u, v) = (${p[0]}, ${p[1]}): √(u² + v²) = √(${p[0] * p[0]} + ${p[1] * p[1]}) = √${p[0] * p[0] + p[1] * p[1]} = ${fmt(d, 2)}</div><div className="mv2-res">${fmt(d, 2)} ${keep ? '≤' : '>'} w0 = ${w0} → ${keep ? 'kept, H = 1' : 'discarded, H = 0'}</div></div></div>
      <${Cap} en=${'Ideal 2D low-pass filter: H(u, v) = 1 if √(u² + v²) ≤ w0, else 0. All frequencies <b>inside a circle</b> of radius w0 are kept and all others discarded. Tap the plane to test any point. Notes\' example with w0 = 20: (12, 16) → √400 = 20, kept; (15, 16) → √481 ≈ 21.9, discarded.'}
        ar=${'الـ ideal 2D low-pass filter هو<span class="ltr">H(u, v) = 1 if √(u² + v²) ≤ w0, else 0</span>يعني كل الـ frequencies <b>جوه دايرة</b> نص قطرها w0 بتفضل والباقي بيتشال. دوس على أي نقطة تجربها. مثال النوتس مع <bdi>w0 = 20</bdi>:<span class="ltr">(12, 16) → √400 = 20 → kept<br>(15, 16) → √481 ≈ 21.9 → discarded</span>'} showAr=${ar} /></figure>`;
  }

  /* ── slides 82–84: the Butterworth low-pass, a smoothed top hat ── */
  function Butter({ ar }) {
    const [n, setN] = useState(2), [w0, setW0] = useState(20);
    const hb = u => 1 / (1 + Math.pow(u * u / (w0 * w0), n)), F = frame({ H: 150, L: 34, T: 12, x0: 0, x1: 60, y0: 0, y1: 1.1 });
    const S2 = 96, ideal = k => { const x = k % S2 - 48, y = Math.floor(k / S2) - 48; return Math.hypot(x, y) <= w0 ? 1 : 0; }, bw = k => { const x = k % S2 - 48, y = Math.floor(k / S2) - 48; return 1 / (1 + Math.pow((x * x + y * y) / (w0 * w0), n)); };
    const h2 = hb(2 * w0);
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 150" role="img" aria-label="Ideal top hat and Butterworth low-pass filter against u">
        <${Axes} F=${F} yt=${[0, 0.5, 1]} xt=${[0, [w0, 'w0'], [2 * w0 <= 60 ? 2 * w0 : 60, 2 * w0 <= 60 ? '2w0' : '60']]} />
        <path d=${`M${F.X(0)} ${F.Y(1)} H${F.X(w0)} V${F.Y(0)} H${F.X(60)}`} stroke="var(--graphite)" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
        <path d=${curve(hb, 0, 60, 300, F.X, F.Y)} stroke="var(--k-mm)" strokeWidth="2.6" fill="none" />
        <circle cx=${F.X(w0)} cy=${F.Y(.5)} r="4.5" fill="var(--pen)" />${2 * w0 <= 60 && html`<circle cx=${F.X(2 * w0)} cy=${F.Y(h2)} r="4.5" fill="var(--pen)" />`}
      </svg>
      <${Leg} items=${[['var(--graphite)', 'ideal (top hat)'], ['var(--k-mm)', `Butterworth, order n = ${n}`]]} />
      <${Sl} label="order n" min="1" max="10" v=${n} set=${setN} /><${Sl} label="w0" min="8" max="30" v=${w0} set=${setW0} />
      <div className="mv2-calc"><div>H = 1 / (1 + [(u² + v²)/w0²]<sup>n</sup>)</div><div className="mv2-res">at the cut-off u = w0: 1/(1 + 1) = 0.5</div><div className="mv2-res">at u = 2w0: 1/(1 + 4<sup>${n}</sup>) = 1/${fmt(1 + Math.pow(4, n))} ≈ ${fmt(h2, 4)}</div></div>
      <div className="mv2-ims" style=${{ marginTop: '10px' }}><${Cv} S=${S2} val=${ideal} dep=${'i' + w0} cap="ideal 2D: a sharp circle" /><${Cv} S=${S2} val=${bw} dep=${'b' + w0 + '-' + n} cap=${`Butterworth (n = ${n}): a blurred circle`} /></div></div>
      <${Cap} en=${'The Butterworth low-pass filter is essentially a <b>smoothed top hat</b> (in 2D a blurred circle). It keeps some high-frequency information, so it reduces the blurring of the ideal filter. H is 1/2 at the cut-off; the 2nd-order filter at twice the cut-off is 1/(1 + 4²) = 1/17 ≈ 0.059. A higher order n gets closer to the ideal top hat.'}
        ar=${'الـ Butterworth low-pass filter هو تقريبًا <b>top hat ناعمة</b> (وفي 2D دايرة متمسحة الحواف). بيسيب شوية من الـ high-frequency information فبيقلل الـ blurring اللي بيعمله الـ ideal filter. قيمته <bdi>1/2</bdi> عند الـ cut-off، والـ 2nd order عند ضعف الـ cut-off بيبقى<span class="ltr">1/(1 + 4²) = 1/17 ≈ 0.059</span>وكل ما الـ order n يزيد بيقرب من الـ ideal top hat.'} showAr=${ar} /></figure>`;
  }

  /* ── slides 78–93: lowpass.m / butterworth.m on the slides' two images ── */
  const S = 256;
  let IMGS = null;
  function images() {
    if (IMGS) return IMGS;
    const box = new Float64Array(S * S); for (let y = 96; y < 160; y++) for (let x = 96; x < 160; x++) box[y * S + x] = 1;
    const text = new Float64Array(S * S), c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
    if (g) { g.fillStyle = '#000'; g.fillRect(0, 0, S, S); g.fillStyle = '#fff'; g.font = 'bold 25px sans-serif'; ['The term watershed', 'refers to a ridge', 'that divides areas', 'drained by different', 'river systems.'].forEach((t, k) => g.fillText(t, 8, 46 + k * 42)); const d = g.getImageData(0, 0, S, S).data; for (let k = 0; k < S * S; k++) text[k] = d[4 * k] / 255; }
    return (IMGS = { box, text });
  }
  const freqIdx = k => k > S / 2 ? k - S : k;
  const Hfun = (shape, u0) => { const H = new Float64Array(S * S); for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const U = freqIdx(y), V = freqIdx(x), D2 = U * U + V * V; H[y * S + x] = shape === 'ideal' ? (D2 <= u0 * u0 ? 1 : 0) : 1 / (1 + Math.pow(D2 / (u0 * u0), 2)); } return H; };
  const shiftV = (arr, f) => k => { const x = (k % S + S / 2) % S, y = (Math.floor(k / S) + S / 2) % S; return f(arr, y * S + x); };
  function spectrumOf(img) { const re = Float64Array.from(img), im = new Float64Array(S * S); fft2(re, im, S); return [re, im]; }
  function ImageLpf({ ar }) {
    const [pic, setPic] = useState('text'), [noise, setNoise] = useState(true), [type, setType] = useState('low'), [shape, setShape] = useState('ideal'), [u0, setU0] = useState(20);
    const inp = useMemo(() => { const base = images()[pic], r = rng(3); return noise ? base.map(v => { const q = r(); return q < .025 ? 0 : q < .05 ? 1 : v; }) : base; }, [pic, noise]);
    const F = useMemo(() => spectrumOf(inp), [inp]);
    const spec = useMemo(() => { const lg = new Float64Array(S * S); let mx = 0; for (let k = 0; k < S * S; k++) { lg[k] = Math.log(1 + Math.hypot(F[0][k], F[1][k])); if (lg[k] > mx) mx = lg[k]; } return lg.map(v => v / mx); }, [F]);
    const H = useMemo(() => { const h = Hfun(shape, u0); return type === 'low' ? h : h.map(v => 1 - v); }, [shape, u0, type]);
    const g = useMemo(() => { const re = F[0].map((v, k) => v * H[k]), im = F[1].map((v, k) => v * H[k]); fft2(re, im, S, true); return re; }, [F, H]);
    const key = [pic, noise, type, shape, u0].join('-');
    const C = type === 'high' ? ['<b>High-pass = 1 − low-pass</b>: the low frequencies (the big flat areas) are removed and only rapid changes, the edges and the noise, are left.', 'الـ <b>High-pass = 1 − low-pass</b>: الـ low frequencies (المساحات الكبيرة الساده) بتتشال ومش بيفضل غير التغييرات السريعة، يعني الـ edges والـ noise.']
      : shape === 'ideal' ? ['<b>Ideal low-pass</b>: the noise goes, but edges are high frequencies too, so they blur; the sharp cut also gives ringing. Lower u0: more noise removed, more blur.', 'الـ <b>Ideal low-pass</b>: الـ noise بيروح، بس الـ edges برضه high frequencies فبتتمسح، والقطع الحاد بيعمل ringing كمان. كل ما u0 يقل الـ noise بيتشال أكتر والـ blur يزيد.']
      : ['<b>Butterworth low-pass</b> (2nd order): the smoothed top hat keeps some high frequencies, so there is less blurring and ringing than with the ideal filter.', 'الـ <b>Butterworth low-pass</b> (2nd order): الـ top hat الناعمة بتسيب شوية high frequencies، فالـ blurring والـ ringing أقل من الـ ideal filter.'];
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['text', 'Text image'], ['box', 'White box']]} on=${pic} set=${setPic} />
      <${Chips} items=${[['low', 'Low-pass'], ['high', 'High-pass (1 − H)']]} on=${type} set=${setType} />
      <${Chips} items=${[['ideal', 'Ideal'], ['butter', 'Butterworth']]} on=${shape} set=${setShape} />
      <div className="mv2-row"><button className=${'fig-btn' + (noise ? ' mv2-sel' : '')} onClick=${() => setNoise(v => !v)}>${noise ? '✓ ' : ''}imnoise (salt & pepper)</button></div>
      <div className="mv2-ims">
        <${Cv} S=${S} val=${k => inp[k]} dep=${pic + noise} cap="(a) input image f" />
        <${Cv} S=${S} val=${shiftV(spec, (a, k) => a[k])} dep=${pic + noise} cap="(b) |F|, fftshift, log scale" />
        <${Cv} S=${S} val=${shiftV(H, (a, k) => a[k])} dep=${type + shape + u0} cap=${`(c) filter H, u0 = ${u0}`} />
        <${Cv} S=${S} val=${k => g[k]} dep=${key} cap="(d) g = real(ifft2(H.*F))" /></div>
      <${Sl} label="cut-off u0" min="4" max="80" v=${u0} set=${setU0} /></div>
      <${Cap} en=${'The slides\' code: F = fft2(image), compute H on the frequency grid (u0 = 20 in lowpass.m and butterworth.m), G = H.*F, g = real(ifft2(G)). ' + C[0]} ar=${'كود السلايدز: بنحسب <bdi>F = fft2(image)</bdi> وبعدين H على الـ frequency grid (الـ <bdi>u0 = 20</bdi> في lowpass.m و butterworth.m)، وبعدين <bdi>G = H.*F</bdi> و <bdi>g = real(ifft2(G))</bdi>. ' + C[1]} showAr=${ar} /></figure>`;
  }

  /* ── slide 92: other filters ── */
  const OF = {
    low: ['Low-pass', (u, a) => u <= a ? 1 : 0, 'keep below u0', 'بيسيب اللي تحت u0'],
    high: ['High-pass', (u, a) => u <= a ? 0 : 1, 'select above u0, defined as 1 − low-pass', 'بيختار اللي فوق u0، وتعريفه <bdi>1 − low-pass</bdi>'],
    band: ['Band-pass', (u, a, b) => u >= a && u <= b ? 1 : 0, 'keep only u0 … u1', 'بيسيب من u0 لـ u1 بس'],
    rej: ['Band-reject', (u, a, b) => u >= a && u <= b ? 0 : 1, 'attenuate u0 … u1', 'بيقلل من u0 لـ u1'],
    notch: ['Notch', (u, a) => Math.abs(u - a) <= 3 ? 0 : 1, 'attenuate a narrow band around u0', 'بيقلل band ضيق حوالين u0'],
    res: ['Resonator', (u, a) => Math.abs(u - a) <= 3 ? 2 : 1, 'amplify a narrow band around u0', 'بيكبّر band ضيق حوالين u0']
  };
  function OtherFilters({ ar }) {
    const [m, setM] = useState('band'), [a, setA] = useState(30), [b, setB] = useState(60);
    const [nm, h, en, at] = OF[m], two = m === 'band' || m === 'rej', hi = Math.max(a + 2, b);
    const F = frame({ H: 150, L: 30, T: 12, x0: 0, x1: 100, y0: 0, y1: 2.2 });
    const d = pathOf(N(1001, k => k / 10).map(u => [F.X(u), F.Y(h(u, a, hi))]));
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${Object.keys(OF).map(k => [k, OF[k][0]])} on=${m} set=${setM} />
      <svg className="mv2-s" viewBox="0 0 300 150" role="img" aria-label=${nm + ' filter H(u)'}>
        <${Axes} F=${F} yt=${[0, 1, 2]} xt=${[0, 50, 100]} />
        <path d=${d + ` L${F.X(100)} ${F.Y(0)} L${F.X(0)} ${F.Y(0)} Z`} fill="color-mix(in srgb, var(--k-mm) 22%, transparent)" stroke="none" />
        <path d=${d} stroke="var(--k-mm)" strokeWidth="2.4" fill="none" />
        <text x=${F.X(a)} y=${F.Y(2.1)} textAnchor="middle" fontSize="14" className="mv2-pt">u0</text>${two && html`<text x=${F.X(hi)} y=${F.Y(2.1)} textAnchor="middle" fontSize="14" className="mv2-pt">u1</text>`}
        <path d=${`M${F.X(a)} ${F.Y(2)} V${F.Y(0)}`} stroke="var(--pen)" strokeDasharray="3 3" />${two && html`<path d=${`M${F.X(hi)} ${F.Y(2)} V${F.Y(0)}`} stroke="var(--pen)" strokeDasharray="3 3" />`}
      </svg>
      <${Sl} label="u0" min="5" max="90" v=${a} set=${setA} />${two && html`<${Sl} label="u1" min="10" max="95" v=${hi} set=${setB} />`}
      <p className="mv2-out"><b>${nm}</b>: ${en}</p></div>
      <${Cap} en=${'Other filters, drawn as H(u): high-pass (select above u0; usually 1 − low-pass), band-pass (keep u0 … u1), band-reject (attenuate u0 … u1), notch (attenuate a narrow band around u0), resonator (amplify a narrow band around u0). The shaded area is what passes.'}
        ar=${`فلاتر تانية مرسومة كـ <bdi>H(u)</bdi>: الـ ${nm} ${at}. الـ high-pass بيختار اللي فوق u0، والـ band-pass بيسيب من u0 لـ u1، والـ band-reject بيقللهم، والـ notch بيقلل band ضيق حوالين u0، والـ resonator بيكبّره. الجزء المتلون هو اللي بيعدي.`} showAr=${ar} /></figure>`;
  }

  /* ════════ [7] Convolution ════════ */
  const hConv = x => x <= -1 || x >= 2 ? 0 : x <= 0 ? (x + 1) / 2 : x <= 1 ? .5 : 1 - x / 2;

  /* ── slides 96–101: convolving the two top hats ── */
  function Convolve({ ar }) {
    const steps = [
      { en: 'f(α): the top hat, 1 for |α| ≤ 1.', ar: 'الـ <bdi>f(α)</bdi>: الـ top hat، قيمتها 1 لما <bdi>|α| ≤ 1</bdi>.' },
      { en: 'g(α) = ½ for 0 ≤ α ≤ 1.', ar: 'الـ <bdi>g(α) = ½</bdi> لما <bdi>0 ≤ α ≤ 1</bdi>.' },
      { en: 'g(−α) is the <b>reflection</b> of g in the vertical y-axis.', ar: 'الـ <bdi>g(−α)</bdi> هي <b>انعكاس</b> g حوالين محور y الرأسي.' },
      { en: 'g(x − α) is that reflection <b>shifted right by x</b>. For each x, ∫f(α)g(x − α)dα is the <b>area of overlap</b> (shaded). Slide x.', ar: 'الـ <bdi>g(x − α)</bdi> هي نفس الانعكاس <b>متزاح يمين بمقدار x</b>. لكل x التكامل هو <b>مساحة التداخل</b> (المتلونة). حرّك x.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300), [x, setX] = useState(-0.5), raf = useRef(0);
    useEffect(() => () => cancelAnimationFrame(raf.current), []);
    const play = () => { if (calm()) { setX(1.5); return; } ctl.go(3); const t0 = performance.now(); const f = t => { const p = Math.min(1, (t - t0) / 5000); setX(rd(-2 + 5 * p, 2)); if (p < 1) raf.current = requestAnimationFrame(f); }; cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(f); };
    const A = frame({ H: 130, L: 30, x0: -2.5, x1: 3.5, y0: 0, y1: 1.2 }), B = frame({ H: 120, L: 30, x0: -2.5, x1: 3.5, y0: 0, y1: 0.65 });
    const [g0, g1] = i === 1 ? [0, 1] : i === 2 ? [-1, 0] : [x - 1, x];
    const o0 = Math.max(-1, g0), o1 = Math.min(1, g1), ov = i === 3 && o1 > o0;
    const piece = x <= -1 || x >= 2 ? 'no overlap: 0' : x <= 0 ? `(x + 1)/2 = ${fmt((x + 1) / 2, 3)}` : x <= 1 ? 'overlap stays at ½ = 0.5' : `1 − x/2 = ${fmt(1 - x / 2, 3)}`;
    return html`<figure className="fig mv2"><div className="fig-stage">
      <svg className="mv2-s" viewBox="0 0 300 130" role="img" aria-label="The top hat f and the reflected, shifted g">
        <${Axes} F=${A} yt=${[0, 0.5, 1]} xt=${[-2, -1, 0, 1, 2, 3]} />
        ${ov && html`<rect x=${A.X(o0)} y=${A.Y(.5)} width=${A.X(o1) - A.X(o0)} height=${A.Y(0) - A.Y(.5)} fill="color-mix(in srgb, var(--pen) 35%, transparent)" />`}
        <path d=${`M${A.X(-2.5)} ${A.Y(0)} H${A.X(-1)} V${A.Y(1)} H${A.X(1)} V${A.Y(0)} H${A.X(3.5)}`} stroke="var(--graphite)" strokeWidth="2.2" fill="none" />
        <text x=${A.X(-0.95)} y=${A.Y(1) - 4} fontSize="14" className="mv2-gt">f(α)</text>
        ${i >= 1 && html`<g><path d=${`M${A.X(g0)} ${A.Y(0)} V${A.Y(.5)} H${A.X(g1)} V${A.Y(0)}`} stroke="var(--k-mm)" strokeWidth="2.6" fill="none" /><text x=${A.X(g1) + 4} y=${A.Y(.5) - 4} fontSize="14" className="mv2-kt">${['', 'g(α)', 'g(−α)', 'g(x − α)'][i]}</text></g>`}
        ${i === 3 && html`<path d=${`M${A.X(x)} ${A.Y(0)} V${A.Y(0) + 6}`} stroke="var(--pen)" strokeWidth="3" />`}
      </svg>
      <p className="mv2-pl">f(x) * g(x)</p>
      <svg className="mv2-s" viewBox="0 0 300 120" role="img" aria-label="The convolution: rises from 0 at x = -1 to one half, flat to x = 1, falls to 0 at x = 2">
        <${Axes} F=${B} yt=${[0, [0.5, '½']]} xt=${[-2, -1, 0, 1, 2, 3]} />
        <path d=${curve(hConv, -2.5, 3.5, 240, B.X, B.Y)} stroke="var(--faint)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        ${i === 3 && html`<g><path d=${curve(hConv, -2.5, x, 240, B.X, B.Y)} stroke="var(--k-mm)" strokeWidth="2.8" fill="none" /><circle cx=${B.X(x)} cy=${B.Y(hConv(x))} r="5" fill="var(--pen)" /></g>`}
      </svg>
      <${Sl} label="x" min="-2" max="3" step="0.05" v=${x} set=${v => { ctl.go(3); setX(v); }} out=${fmt(x, 2)} />
      <div className="mv2-row"><button className="fig-btn solid" onClick=${play}>▶ Slide x from −2 to 3</button></div>
      <div className="mv2-calc mv2-res">x = ${fmt(x, 2)}: ${piece}</div></div>
      <${Cap} en=${steps[i].en + ' Result: (x + 1)/2 for −1 ≤ x ≤ 0; ½ for 0 ≤ x ≤ 1; 1 − x/2 for 1 ≤ x ≤ 2; 0 otherwise (x = −0.5 → 0.25, x = 1.5 → 0.25).'}
        ar=${steps[i].ar + ' النتيجة:<span class="ltr">(x + 1)/2 for −1 ≤ x ≤ 0<br>½ for 0 ≤ x ≤ 1<br>1 − x/2 for 1 ≤ x ≤ 2<br>0 otherwise   (x = −0.5 → 0.25, x = 1.5 → 0.25)</span>'} showAr=${ar} />
      <${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 102–103: the convolution theorem, checked on samples of the two top hats ── */
  const DL = 0.125, FS16 = N(16, () => 1), GS8 = N(8, () => .5);
  const CT = (() => {
    const direct = N(23, m => DL * N(16, i => (m - i >= 0 && m - i < 8) ? FS16[i] * GS8[m - i] : 0).reduce((s, v) => s + v, 0));
    const pad = a => { const re = new Float64Array(32); a.forEach((v, k) => re[k] = v); const im = new Float64Array(32); fft(re, im); return [re, im]; };
    const Fz = pad(FS16), Gz = pad(GS8), Pr = Fz[0].map((r, k) => r * Gz[0][k] - Fz[1][k] * Gz[1][k]), Pi = Fz[0].map((r, k) => r * Gz[1][k] + Fz[1][k] * Gz[0][k]);
    const re = Float64Array.from(Pr), im = Float64Array.from(Pi); fft(re, im, true);
    const via = N(23, m => DL * re[m]);
    return { direct, via, F: N(17, k => Math.hypot(Fz[0][k], Fz[1][k])), G: N(17, k => Math.hypot(Gz[0][k], Gz[1][k])), P: N(17, k => Math.hypot(Pr[k], Pi[k])), err: Math.max(...direct.map((v, m) => Math.abs(v - via[m]))) };
  })();
  function ConvTheorem({ ar }) {
    const steps = [
      { en: 'Sample both top hats every 0.125: f = 1 on −1 ≤ α < 1 (16 samples), g = ½ on 0 < α ≤ 1 (8 samples).', ar: 'ناخد samples من الـ top hats كل <bdi>0.125</bdi>: الـ f قيمتها 1 (16 sample) والـ g قيمتها ½ (8 samples).' },
      { en: '<b>Directly</b>: f * g = Σ f(α)g(x − α)·0.125 for every x, the same shape as before: up to ½, flat, down to 0.', ar: '<b>مباشرةً</b>: بنحسب المجموع لكل x فيطلع نفس الشكل: بيطلع لـ ½ ويفضل ثابت وينزل لصفر.' },
      { en: '<b>Fourier route</b>: take the FT of each (fft, padded to 32 points): |F| and |G|.', ar: '<b>طريق Fourier</b>: ناخد الـ FT لكل واحدة (fft بعد ما نكملها لـ 32 نقطة) فيطلع |F| و |G|.' },
      { en: 'Multiply: F(u)·G(u), point by point. No sliding, no overlap areas.', ar: 'نضرب <bdi>F(u)·G(u)</bdi> نقطة بنقطة، من غير تزحيق ولا حساب مساحات تداخل.' },
      { en: `Inverse FT of F·G gives exactly the direct result (largest difference ${CT.err < 1e-12 ? 'below 10⁻¹²' : CT.err.toExponential(1)}): <b>the FT of f * g is F(u)·G(u)</b>.`, ar: `الـ inverse FT لـ <bdi>F·G</bdi> بيدي نفس النتيجة المباشرة بالظبط، وده معناه إن الـ <b>FT بتاع f * g هو F(u)·G(u)</b>.` }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const A = frame({ H: 110, L: 30, x0: -1.25, x1: 2.25, y0: 0, y1: 1.15 }), Q = frame({ H: 100, L: 36, x0: -0.5, x1: 16.5, y0: 0, y1: 1 });
    const bars = (d, col, mx) => d.map((v, k) => html`<rect key=${k} x=${Q.X(k) - 3} y=${Q.Y(v / mx)} width="6" height=${Q.Y(0) - Q.Y(v / mx)} fill=${col} />`);
    const xs = m => -0.875 + m * DL, mxF = Math.max(...CT.F, ...CT.G), mxP = Math.max(...CT.P);
    const pts = (d, xf) => d.map((v, k) => [xf(k), v]);
    return html`<figure className="fig mv2"><div className="fig-stage">
      <p className="mv2-pl">${i === 0 ? 'f (grey) and g (colour)' : 'f * g: direct sum (stems)' + (i === 4 ? ' and via F·G (rings)' : '')}</p>
      <svg className="mv2-s" viewBox="0 0 300 110" role="img" aria-label="samples and the convolution result">
        <${Axes} F=${A} yt=${[0, [0.5, '½'], 1]} xt=${[-1, 0, 1, 2]} />
        ${i === 0 ? html`<g>${pts(FS16, k => -1 + k * DL).map(([x, v], k) => html`<path key=${'f' + k} d=${`M${A.X(x)} ${A.Y(0)} V${A.Y(v)}`} stroke="var(--graphite)" strokeWidth="2" />`)}${pts(GS8, k => (k + 1) * DL).map(([x, v], k) => html`<circle key=${'g' + k} cx=${A.X(x)} cy=${A.Y(v)} r="4" fill="var(--k-mm)" />`)}</g>`
        : html`<g><path d=${curve(hConv, -1.25, 2.25, 200, A.X, A.Y)} stroke="var(--faint)" strokeDasharray="4 4" fill="none" />
          ${CT.direct.map((v, m) => html`<path key=${m} d=${`M${A.X(xs(m))} ${A.Y(0)} V${A.Y(v)}`} stroke="var(--k-mm)" strokeWidth="2" />`)}
          ${i === 4 && CT.via.map((v, m) => html`<circle key=${'v' + m} cx=${A.X(xs(m))} cy=${A.Y(v)} r="4.2" fill="none" stroke="var(--pen)" strokeWidth="1.8" />`)}</g>`}
      </svg>
      <div className="mv2-fade" style=${{ opacity: i >= 2 ? 1 : .15 }}><p className="mv2-pl">|F(u)| (grey) and |G(u)| (colour), u = 0 … 16</p>
        <svg className="mv2-s" viewBox="0 0 300 100" role="img" aria-label="Fourier magnitudes of f and g"><${Axes} F=${Q} xt=${[0, 8, 16]} /><g transform="translate(-3 0)">${bars(CT.F, 'var(--graphite)', mxF)}</g><g transform="translate(3 0)">${bars(CT.G, 'var(--k-mm)', mxF)}</g></svg></div>
      <div className="mv2-fade" style=${{ opacity: i >= 3 ? 1 : .15 }}><p className="mv2-pl">|F(u)·G(u)|</p>
        <svg className="mv2-s" viewBox="0 0 300 100" role="img" aria-label="magnitude of the product"><${Axes} F=${Q} xt=${[0, 8, 16]} />${bars(CT.P, 'var(--pen)', mxP)}</svg></div></div>
      <${Cap} en=${steps[i].en + ' This is why filtering by G = H.*F works: multiplying in frequency space is convolving in real space.'} ar=${steps[i].ar + ' وعشان كده الـ filtering بـ <bdi>G = H.*F</bdi> شغال: الضرب في الـ frequency space هو نفسه الـ convolution في الـ real space.'} showAr=${ar} />
      <${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 104–108: deconvolution, G./H, and what noise does to it ── */
  function Deconv({ ar }) {
    const [pic, setPic] = useState('text'), [sig, setSig] = useState(0);
    const H = useMemo(() => Hfun('butter', 20), []);
    const base = useMemo(() => images()[pic], [pic]);
    const blur = useMemo(() => { const [re, im] = spectrumOf(base); for (let k = 0; k < S * S; k++) { re[k] *= H[k]; im[k] *= H[k]; } fft2(re, im, S, true); return re; }, [base]);
    const out = useMemo(() => { const r = rng(9), gn = blur.map(v => { if (!sig) return v; const u1 = Math.max(1e-12, r()), u2 = r(); return v + sig * Math.sqrt(-2 * Math.log(u1)) * Math.cos(P2 * u2); }); const [re, im] = spectrumOf(gn); for (let k = 0; k < S * S; k++) { re[k] /= H[k]; im[k] /= H[k]; } fft2(re, im, S, true); return { gn, re }; }, [blur, sig]);
    const k0 = pic + sig;
    const C = sig ? ['With noise added to the blurred image, dividing by H amplifies it enormously: H is tiny at high frequencies, so 1/H is huge. Deconvolution fails. In the real world we also do not know the exact blurring function H.', 'لما نضيف noise للصورة الـ blurred، القسمة على H بتكبّره جدًا: الـ H صغيرة خالص عند الـ high frequencies فـ <bdi>1/H</bdi> ضخمة. الـ deconvolution بيفشل. وفي الحقيقة كمان مش بنبقى عارفين الـ blurring function H بالظبط.']
      : ['Blur with the Butterworth low-pass H (multiply: G = H.*F), then divide by the same H (Ghigh = G./H, effectively a high-pass filter) and inverse FT: in this ideal case we get F, and the image, back.', 'بنعمل blur بالـ Butterworth low-pass H (ضرب يعني <bdi>G = H.*F</bdi>)، وبعدين نقسم على نفس H (يعني <bdi>Ghigh = G./H</bdi> وده فعليًا high-pass filter) ونعمل inverse FT: في الحالة المثالية دي بنرجّع F والصورة زي ما هي.'];
    return html`<figure className="fig mv2"><div className="fig-stage">
      <${Chips} items=${[['text', 'Text image'], ['box', 'White box']]} on=${pic} set=${setPic} />
      <${Chips} items=${[[0, 'No noise'], [0.0001, 'Tiny noise'], [0.001, 'Noise']]} on=${sig} set=${setSig} />
      <div className="mv2-ims three">
        <${Cv} S=${S} val=${k => base[k]} dep=${pic} cap="(a) input image" />
        <${Cv} S=${S} val=${k => out.gn[k]} dep=${k0} cap=${'(b) blurred, G = H.*F' + (sig ? ' + noise' : '')} />
        <${Cv} S=${S} val=${k => out.re[k]} dep=${k0} cap="(c) deconvolved, G./H" /></div></div>
      <${Cap} en=${'Deconvolution: FT the degraded data, FT the system\'s effect, <b>multiply</b> to apply an effect (blur, reverb) or <b>divide</b> to remove it, then inverse FT. ' + C[0]} ar=${'الـ Deconvolution: ناخد FT للداتا البايظة و FT لتأثير السيستم، <b>نضرب</b> عشان نطبق تأثير (blur أو reverb) أو <b>نقسم</b> عشان نشيله، وبعدين inverse FT. ' + C[1]} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-period': Period, 'mm-sine-abc': SineAbc, 'mm-phase-demo': PhaseDemo, 'mm-sampled-sine': SampledSine,
    'mm-db-scale': DbScale, 'mm-bits-db': BitsDb, 'mm-db-calc': DbCalc,
    'mm-sfg-blocks': SfgBlocks, 'mm-sfg-run': SfgRun,
    'mm-iir-graph': IirGraph, 'mm-fir-graph': FirGraph, 'mm-impulse': ImpulseResp, 'mm-filter-ba': FilterBA, 'mm-iirdemo': IirDemo,
    'mm-chord': Chord, 'mm-8hz': EightHz, 'mm-image-line': ImageLine, 'mm-additive': Additive, 'mm-eq': Eq,
    'mm-sinc': Sinc, 'mm-dft': Dft, 'mm-mag-phase': MagPhase, 'mm-bin-freq': BinFreq, 'mm-spectrogram': Spectrogram,
    'mm-lpf-1d': Lpf1d, 'mm-ideal-2d': Ideal2d, 'mm-butter': Butter, 'mm-image-lpf': ImageLpf, 'mm-other-filters': OtherFilters,
    'mm-convolve': Convolve, 'mm-conv-theorem': ConvTheorem, 'mm-deconv': Deconv
  });
})();
/* ── part L3 ── */
// Multimedia visuals, Lecture 3 (Multimedia Data Basics): static vs continuous media, transducers, ADC and DAC, sampling + quantisation,
// the analog-to-digital-to-analog pipeline, capture routes, text bytes, graphics vs bitmaps, tweening, the slide's 10×10 bitmap,
// video data rates and the worked size sums (slides 5–25). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.mv3 .fig-btn.sel{ border-color:var(--k-mm); box-shadow:0 0 0 1px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.mv3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mv3 .fig-cap .ltr{ display:block; direction:ltr; unicode-bidi:isolate; text-align:left; font-family:var(--mono); font-size:.86rem; margin:2px 0; }
.mv3-w{ max-width:540px; margin:0 auto; color:var(--ink); }
.mv3-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mv3-chips .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.mv3-muted{ color:var(--graphite); font-size:.82rem; }
.mv3-k{ color:var(--k-mm); font-weight:700; }
.mv3-rng{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:.86rem; color:var(--graphite); margin:6px 0 0; }
.mv3-rng input{ flex:1; min-width:120px; accent-color:var(--k-mm); }
.mv3-rng b{ color:var(--ink); font-family:var(--mono); }
/* static vs continuous */
.mv3-mt{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; }
.mv3-mt .mv3-grp{ grid-column:1 / -1; font-size:.8rem; font-weight:700; letter-spacing:.04em; color:var(--graphite); margin-top:2px; }
.mv3-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; min-width:0; }
.mv3-card .mv3-t{ font-weight:700; font-size:.86rem; }
.mv3 .mv3-card svg{ display:block; width:100%; height:46px; margin:4px 0; }
.mv3-card .mv3-r{ font-size:.76rem; color:var(--graphite); font-family:var(--mono); overflow-wrap:anywhere; }
.mv3-card.mv3-cont{ border-color:var(--k-mm); } .mv3-card.mv3-cont .mv3-r{ color:var(--k-mm); }
.mv3-txt{ height:46px; margin:4px 0; display:grid; place-items:center; font-family:var(--mono); font-size:.86rem; border-radius:6px; background:var(--paper-2); }
.mv3-clock{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-top:10px; font-size:.86rem; color:var(--graphite); }
.mv3-clock input{ flex:1; min-width:110px; accent-color:var(--k-mm); }
.mv3-clock b{ font-family:var(--mono); color:var(--ink); }
/* sensors */
.mv3-sn{ display:grid; gap:8px; max-width:480px; margin:0 auto; }
.mv3-sr{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; transition:opacity .4s, box-shadow .4s; }
.mv3-sr.mv3-dim{ opacity:.35; } .mv3-sr.mv3-on{ box-shadow:0 0 0 2px var(--k-mm); }
.mv3-sr .mv3-t{ font-weight:700; font-size:.86rem; margin-bottom:2px; }
.mv3-sg{ display:grid; grid-template-columns:minmax(0, 1fr) 14px 44px 14px minmax(0, 1fr); gap:4px; align-items:center; }
.mv3-sg > div{ text-align:center; font-size:.76rem; line-height:1.25; min-width:0; color:var(--graphite); }
.mv3 .mv3-sg svg{ display:block; width:100%; height:34px; }
.mv3-arw{ color:var(--k-mm); font-weight:700; text-align:center; font-size:.9rem; }
/* rows: block | signal */
.mv3-rows{ display:grid; gap:6px; max-width:480px; margin:0 auto; }
.mv3-rw{ display:grid; grid-template-columns:104px minmax(0, 1fr); gap:8px; align-items:center; transition:opacity .4s; }
.mv3-rw.mv3-dim{ opacity:.3; }
.mv3-blk{ border:1.5px solid var(--graphite); border-radius:6px; background:var(--paper); padding:5px 4px; text-align:center; font-size:.78rem; line-height:1.25; font-weight:600; transition:box-shadow .4s, background .4s; }
.mv3-blk small{ display:block; font-weight:400; font-size:.74rem; color:var(--graphite); }
.mv3-blk.mv3-on{ box-shadow:0 0 0 2px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 16%, var(--paper)); }
.mv3-blk.mv3-off{ opacity:.45; text-decoration:line-through; }
.mv3 .mv3-rw svg{ display:block; width:100%; height:52px; }
.mv3-sys{ border:1.5px dashed var(--graphite); border-radius:10px; padding:6px; display:grid; gap:6px; }
.mv3-nums{ display:flex; flex-wrap:wrap; gap:3px; }
.mv3-nums span{ font:600 .78rem/1 var(--mono); border:1px solid var(--line); border-radius:4px; padding:4px 3px; min-width:22px; text-align:center; background:var(--paper); }
.mv3-nums.mv3-mod span{ border-color:var(--k-mm); }
.mv3-tog{ font:inherit; font-size:.82rem; border:1px solid var(--line); border-radius:99px; background:var(--paper); color:var(--ink); padding:4px 12px; cursor:pointer; min-height:32px; }
.mv3-tog.mv3-on{ background:var(--fig-s, var(--s-mm)); color:#fff; border-color:transparent; }
/* capture */
.mv3-flow{ display:grid; grid-template-columns:minmax(0, 1fr) 16px minmax(0, 1.3fr) 16px minmax(0, 1fr); gap:4px; align-items:center; }
.mv3-box{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:8px 5px; text-align:center; font-size:.8rem; line-height:1.3; min-width:0; }
.mv3-box b{ display:block; font-size:.76rem; color:var(--graphite); font-weight:600; margin-bottom:2px; }
.mv3-badge{ text-align:center; margin:10px 0 0; font-weight:700; font-size:.9rem; }
.mv3-badge.mv3-y{ color:var(--ok); } .mv3-badge.mv3-n{ color:var(--k-mm); }
@media (max-width:420px){ .mv3-flow{ grid-template-columns:1fr; } .mv3-flow .mv3-arw{ transform:rotate(90deg); } }
/* text bytes */
.mv3-in{ font:inherit; font-size:1rem; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); width:100%; box-sizing:border-box; }
.mv3-cells{ display:flex; flex-wrap:wrap; gap:4px; margin-top:10px; }
.mv3-cell{ border:1px solid var(--line); border-radius:6px; background:var(--paper); padding:3px 4px; text-align:center; min-width:34px; }
.mv3-cell .mv3-ch{ font-size:1rem; font-weight:700; }
.mv3-cell .mv3-hx{ font:500 .74rem/1.3 var(--mono); color:var(--graphite); }
.mv3-cell.mv3-uni{ border-color:var(--k-mm); } .mv3-cell.mv3-uni .mv3-hx{ color:var(--k-mm); }
.mv3-sum{ margin-top:10px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.9rem; line-height:1.5; }
/* vector / bitmap */
.mv3-vb{ display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1fr); gap:10px; align-items:start; }
@media (max-width:480px){ .mv3-vb{ grid-template-columns:1fr; } }
.mv3-pg{ position:relative; max-width:220px; margin:0 auto; width:100%; border:1px solid var(--line); line-height:0; }
.mv3 .mv3-pg svg{ width:100%; height:auto; display:block; }
.mv3-pg canvas{ width:100%; height:auto; display:block; image-rendering:pixelated; cursor:crosshair; }
.mv3-sel{ position:absolute; border:1.5px dashed #111; box-shadow:0 0 0 1px #fff; pointer-events:none; }
.mv3-file{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.8rem; line-height:1.45; }
.mv3-file .mv3-hd{ font-weight:700; margin-bottom:2px; }
.mv3-file button{ display:block; width:100%; text-align:left; font:500 .78rem/1.35 var(--mono); border:0; border-radius:4px; background:transparent; color:var(--ink); padding:3px 4px; cursor:pointer; }
.mv3-file button.mv3-on{ background:color-mix(in srgb, var(--k-mm) 20%, var(--paper)); }
.mv3-ops{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin-top:8px; }
.mv3-ops .fig-btn{ padding:4px 10px; min-height:32px; font-size:.82rem; }
/* tween */
.mv3-strip{ display:grid; grid-template-columns:repeat(13, minmax(0, 1fr)); gap:2px; margin-top:8px; }
.mv3-strip button{ border:1px solid var(--line); border-radius:3px; background:var(--paper); padding:1px; cursor:pointer; line-height:0; min-width:0; }
.mv3-strip button.mv3-key{ border:2px solid var(--k-mm); }
.mv3-strip button.mv3-cur{ outline:2px solid var(--ink); outline-offset:1px; }
.mv3 .mv3-strip svg{ width:100%; height:auto; }
.mv3-out{ text-align:center; font-size:.9rem; margin:8px 0 0; line-height:1.45; }
/* bitmap */
.mv3-bm{ display:grid; grid-template-columns:repeat(10, minmax(0, 1fr)); gap:1px; max-width:340px; margin:0 auto; background:var(--line); border:1px solid var(--line); }
.mv3-bm button{ aspect-ratio:1; border:0; padding:0; font:600 .75rem/1 var(--mono); cursor:pointer; min-width:0; }
.mv3-bm button.mv3-cur{ outline:2px solid var(--k-mm); outline-offset:-2px; position:relative; z-index:1; }
/* bars */
.mv3-bars{ display:grid; gap:8px; }
.mv3-bar .mv3-l{ display:flex; justify-content:space-between; gap:6px; flex-wrap:wrap; font-size:.84rem; }
.mv3-bar .mv3-l span:last-child{ font-family:var(--mono); font-weight:700; color:var(--k-mm); }
.mv3-bar .mv3-tr{ height:14px; border-radius:99px; background:var(--paper); border:1px solid var(--line); overflow:hidden; margin-top:3px; }
.mv3-bar .mv3-tr i{ display:block; height:100%; background:var(--k-mm); border-radius:99px; transition:width .6s ease; }
.mv3-bar .mv3-f{ font:500 .76rem var(--mono); color:var(--graphite); }
/* worked */
.mv3-wk{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; }
.mv3-wk div{ font:500 .84rem/1.5 var(--mono); padding:3px 0; border-top:1px solid var(--line); overflow-wrap:anywhere; }
.mv3-wk div:first-child{ border-top:0; }
.mv3-wk div.mv3-now{ color:var(--k-mm); font-weight:700; }
@media (prefers-reduced-motion: reduce){ .mv3-sr, .mv3-rw, .mv3-blk, .mv3-bar .mv3-tr i{ transition:none; } }
`;
  if (!document.getElementById('mv3-css')) { const s = document.createElement('style'); s.id = 'mv3-css'; s.textContent = CSS; document.head.appendChild(s); }

  const N = (n, f) => Array.from({ length: n }, (_, k) => f(k));
  const curve = (f, a, b, n, X, Y) => N(n + 1, k => { const t = a + (b - a) * k / n; return (k ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1); }).join(' ');
  const smooth = P => P.map((p, i) => { if (!i) return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`; const p0 = P[i - 2] || P[i - 1], p1 = P[i - 1], p3 = P[i + 1] || p;
    return `C${(p1[0] + (p[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p[1] - p0[1]) / 6).toFixed(1)} ${(p[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`; }).join(' ');
  const num = n => Math.round(n).toLocaleString('en-US');
  const fx = (n, d) => n.toLocaleString('en-US', { maximumFractionDigits: d });

  /* the slide's 10×10 grey values (slide 20) */
  const GRID = [[99, 71, 61, 51, 49, 40, 35, 53, 86, 99], [93, 74, 53, 56, 48, 46, 48, 72, 85, 102], [101, 69, 57, 53, 54, 52, 64, 82, 88, 101], [107, 82, 64, 63, 59, 60, 81, 90, 93, 100], [114, 93, 76, 69, 72, 85, 94, 99, 95, 99],
    [117, 108, 94, 92, 97, 101, 100, 108, 105, 99], [116, 114, 109, 106, 105, 108, 108, 102, 107, 110], [115, 113, 109, 114, 111, 111, 113, 108, 111, 115], [110, 113, 111, 109, 106, 108, 110, 115, 120, 122], [103, 107, 106, 108, 109, 114, 120, 124, 124, 132]];

  /* ── slide 5: static (time independent) vs continuous (time dependent) media ── */
  function MediaTime({ ar }) {
    const [t, setT] = useState(0), [play, setPlay] = useState(!calm());
    useEffect(() => { if (!play) return; let id, last = performance.now(); const f = now => { setT(x => (x + (now - last) / 1000) % 4); last = now; id = requestAnimationFrame(f); }; id = requestAnimationFrame(f); return () => cancelAnimationFrame(id); }, [play]);
    const frame = Math.floor(t * 25) + 1, sample = Math.floor(t * 44100);
    const shape = 'M0 -14 L5 -4 L15 -2 L6 5 L9 15 L0 9 L-9 15 L-6 5 L-15 -2 L-5 -4 Z';
    const wave = u => 13 * Math.sin(2 * Math.PI * (u * 3 + t * .9)) * (0.6 + 0.4 * Math.sin(2 * Math.PI * (u * .7 + t * .25)));
    const card = (title, body, r, cont) => html`<div className=${'mv3-card' + (cont ? ' mv3-cont' : '')}><div className="mv3-t">${title}</div>${body}<div className="mv3-r">${r}</div></div>`;
    const svg = (kids, label) => html`<svg viewBox="0 0 120 46" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${label}>${kids}</svg>`;
    const ax = 10 + 100 * (t < 2 ? t / 2 : (4 - t) / 2);
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <div className="mv3-mt">
        <div className="mv3-grp">STATIC (DISCRETE) MEDIA</div>
        ${card('Text', html`<div className="mv3-txt">Multimedia</div>`, 'same at every t')}
        ${card('Normal data', html`<div className="mv3-txt">42 · 17 · 8</div>`, 'same at every t')}
        ${card('Single image', svg(GRID.slice(0, 4).map((row, y) => row.slice(0, 8).map((v, x) => html`<rect key=${y * 8 + x} x=${28 + x * 8} y=${3 + y * 10} width="8" height="10" fill=${`rgb(${v},${v},${v})`} />`)), 'a still image'), 'same at every t')}
        ${card('Graphics', svg(html`<rect x="22" y="10" width="30" height="20" fill="var(--k-mm)" opacity=".5" /><circle cx="80" cy="22" r="14" fill="none" stroke="var(--ink)" strokeWidth="2" /><path d="M10 40 L110 6" stroke="var(--graphite)" strokeWidth="2" />`, 'a rectangle, a circle and a line'), 'same at every t')}
        <div className="mv3-grp">CONTINUOUS MEDIA</div>
        ${card('Video', svg(html`<rect x="30" y="1" width="60" height="44" rx="4" fill="var(--paper-2)" stroke="var(--line)" /><path d=${shape} transform=${`translate(60 23) rotate(${frame * 9})`} fill="var(--graphite)" />`, 'a rotating shape'), `frame ${frame} (25 fps)`, true)}
        ${card('Animation', svg(html`<path d="M6 40 H114" stroke="var(--line)" /><circle cx=${ax} cy=${40 - 26 * Math.abs(Math.sin(Math.PI * t))} r="6" fill="var(--k-mm)" />`, 'a moving ball'), `t = ${t.toFixed(2)} s`, true)}
        <div className="mv3-card mv3-cont" style=${{ gridColumn: '1 / -1' }}><div className="mv3-t">Audio</div>
          ${svg(html`<path d="M0 23 H120" stroke="var(--line)" /><path d=${curve(wave, 0, 1, 120, u => u * 120, v => 23 - v)} stroke="var(--k-mm)" strokeWidth="1.6" fill="none" /><path d="M60 0 V46" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2" />`, 'an audio waveform scrolling past the playhead')}
          <div className="mv3-r">sample ${num(sample)} (44,100 per second)</div></div>
      </div>
      <div className="mv3-clock"><button className="fig-btn" onClick=${() => setPlay(p => !p)}>${play ? '❚❚ Pause' : '▶ Play'}</button><span>t = <b>${t.toFixed(2)} s</b></span>
        <input type="range" min="0" max="3.99" step="0.01" value=${t} aria-label="Time" onInput=${e => { setPlay(false); setT(+e.target.value); }} /></div>
    </div></div>
      <${Cap} en="Drag the clock. <b>Static (discrete) media</b> (normal data, text, a single image, graphics) are <b>time independent</b>: the same at every t. <b>Continuous media</b> (video, animation, audio) are <b>time dependent</b>: they change with t, and they all run on the same clock, so the data has temporal relationships and the media need <b>synchronisation</b>."
        ar="حرّك الساعة. الـ <b>Static (discrete) media</b> (data عادية والـ text وصورة واحدة والـ graphics) <b>مش معتمدة على الزمن</b>: شكلها واحد في أي وقت t. الـ <b>Continuous media</b> (الـ video والـ animation والـ audio) <b>معتمدة على الزمن</b>: بتتغير مع الـ t، وكلها ماشية على نفس الساعة، عشان كده الـ data فيها temporal relationships والـ media محتاجة <b>synchronisation</b>." showAr=${ar} /></figure>`;
  }

  /* ── slide 7: transducers turn what they sense into electrical signals ── */
  const thermo = html`<svg viewBox="0 0 44 40" aria-hidden="true"><rect x="18" y="3" width="8" height="24" rx="4" fill="none" stroke="var(--ink)" strokeWidth="2" /><circle cx="22" cy="31" r="6" fill="var(--k-mm)" /><rect x="20.5" y="12" width="3" height="16" fill="var(--k-mm)" /></svg>`;
  const mic = html`<svg viewBox="0 0 44 40" aria-hidden="true"><rect x="15" y="2" width="14" height="22" rx="7" fill="var(--graphite)" /><path d="M10 18 Q10 30 22 30 Q34 30 34 18 M22 30 V38" stroke="var(--ink)" strokeWidth="2" fill="none" /></svg>`;
  const cam = html`<svg viewBox="0 0 44 40" aria-hidden="true"><rect x="4" y="11" width="36" height="24" rx="4" fill="var(--graphite)" /><rect x="14" y="6" width="12" height="7" rx="2" fill="var(--graphite)" /><circle cx="22" cy="23" r="8" fill="var(--paper)" /><circle cx="22" cy="23" r="4.5" fill="var(--k-mm)" /></svg>`;
  function Sensors({ ar }) {
    const S = [
      { n: 'Thermocouple', ic: thermo, q: 'temperature', f: u => .7 * Math.sin(2 * Math.PI * u * .8) + .2 * u },
      { n: 'Microphone', ic: mic, q: 'sound (acoustic)', f: u => .8 * Math.sin(2 * Math.PI * u * 5) * Math.sin(Math.PI * u) },
      { n: 'Camera', ic: cam, q: 'light', f: u => .8 * Math.sin(2 * Math.PI * u * 2 + .6) * .9 + .1 * Math.sin(2 * Math.PI * u * 7) }];
    const steps = [
      { en: 'The world we sense is full of <b>analog signals</b>: temperature, sound and light all vary continuously.', ar: 'العالم اللي بنحسه مليان <b>analog signals</b>: الحرارة والصوت والضوء كلهم بيتغيروا بشكل متصل.' },
      { en: 'A <b>thermocouple</b> is a temperature sensor: it converts the temperature into an <b>electrical signal</b> of the same shape.', ar: 'الـ <b>thermocouple</b> هو sensor للحرارة: بيحوّل الحرارة لـ <b>electrical signal</b> بنفس الشكل.' },
      { en: 'A <b>microphone</b> is an acoustic sensor: sound in, electrical signal out.', ar: 'الـ <b>microphone</b> هو acoustic sensor: صوت بيدخل و electrical signal بتطلع.' },
      { en: 'A <b>camera</b> (still or video) is a light sensor.', ar: 'الـ <b>camera</b> (صور أو video) هي light sensor.' },
      { en: 'These electrical signals are (usually) <b>continuous analog</b> signals, so they must be <b>converted (digitised)</b> before a computer can process them.', ar: 'الـ electrical signals دي (غالبًا) <b>continuous analog</b>، فلازم <b>تتحول (digitise)</b> قبل ما الكمبيوتر يقدر يعالجها.' }];
    const [i, ctl] = useSteps(steps.length, 2200);
    const w = (f, col) => html`<svg viewBox="0 0 80 34" aria-hidden="true"><path d="M2 17 H78" stroke="var(--line)" /><path d=${curve(f, 0, 1, 80, u => 3 + u * 74, v => 17 - v * 13)} stroke=${col} strokeWidth="2" fill="none" /></svg>`;
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-sn">
      ${S.map((s, k) => { const on = i === k + 1 || i === 4 || i === 0; return html`<div key=${k} className=${'mv3-sr' + (i === k + 1 ? ' mv3-on' : on ? '' : ' mv3-dim')}>
        <div className="mv3-t">${s.n}</div>
        <div className="mv3-sg"><div>${w(s.f, 'var(--graphite)')}${s.q}</div><div className="mv3-arw">→</div><div>${s.ic}</div><div className="mv3-arw">→</div>
          <div className=${pop(i >= k + 1)}>${w(s.f, 'var(--k-mm)')}electrical signal</div></div></div>`; })}
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 8–9: ADC records, the computer may modify, DAC plays back ── */
  const REC = N(8, k => Math.round(6 * Math.sin(2 * Math.PI * k / 8)));
  function AdcDac({ ar }) {
    const steps = [
      { en: 'An analog sensor, here a <b>microphone</b>, gives an analog signal.', ar: 'الـ analog sensor، هنا <b>microphone</b>، بيدّي analog signal.' },
      { en: 'The <b>ADC</b> (special hardware, e.g. a sound card) takes the analog signal and <b>digitally samples</b> it: out come numbers.', ar: 'الـ <b>ADC</b> (hardware خاص، زي الـ sound card) بياخد الـ analog signal ويعمله <b>digital sampling</b>: بيطلع منه أرقام.' },
      { en: 'The computer may <b>modify</b> the digital signal, e.g. a <b>volume change</b> (try the buttons) or equalisation.', ar: 'الكمبيوتر ممكن <b>يعدّل</b> الـ digital signal، زي <b>تغيير الـ volume</b> (جرّب الزراير) أو الـ equalisation.' },
      { en: '<b>Playback</b>: the <b>DAC</b> does the converse and outputs an <b>analog signal</b>.', ar: 'الـ <b>Playback</b>: الـ <b>DAC</b> بيعمل العكس ويطلّع <b>analog signal</b>.' },
      { en: 'An <b>analog output device</b> plays it: a loudspeaker (or, for pictures, an RGB monitor).', ar: 'الـ <b>analog output device</b> بيشغّلها: سماعة loudspeaker (أو للصور RGB monitor).' }];
    const [i, ctl] = useSteps(steps.length, 2400);
    const [vol, setVol] = useState(1);
    const MOD = REC.map(v => Math.round(v * vol));
    const X = k => 10 + k * 22, Y = v => 26 - v * 3;
    const sine = (a, col) => html`<svg viewBox="0 0 180 52" aria-hidden="true"><path d="M0 26 H180" stroke="var(--line)" /><path d=${curve(u => a * Math.sin(2 * Math.PI * u), 0, 1, 90, u => 10 + u * 176, v => Y(v))} stroke=${col} strokeWidth="2" fill="none" /></svg>`;
    const dots = V => html`<svg viewBox="0 0 180 52" aria-hidden="true"><path d="M0 26 H180" stroke="var(--line)" />${V.map((v, k) => html`<g key=${k}><path d=${`M${X(k)} 26 V${Y(v)}`} stroke="var(--ink)" strokeWidth="1.5" /><circle cx=${X(k)} cy=${Y(v)} r="3" fill="var(--k-mm)" /></g>`)}</svg>`;
    const row = (k, label, sub, body) => html`<div className=${'mv3-rw' + (i >= k ? '' : ' mv3-dim')}><div className=${'mv3-blk' + (i === k ? ' mv3-on' : '')}>${label}${sub && html`<small>${sub}</small>`}</div><div>${i >= k ? body : null}</div></div>`;
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-rows">
      ${row(0, 'Microphone', 'analog sensor', sine(6, 'var(--graphite)'))}
      ${row(1, 'ADC', 'sound card', html`${dots(REC)}<div className="mv3-nums">${REC.map((v, k) => html`<span key=${k}>${v}</span>`)}</div>`)}
      ${row(2, 'Computer', vol === 1 ? 'no change' : 'volume × ' + vol, html`${dots(MOD)}<div className="mv3-nums mv3-mod">${MOD.map((v, k) => html`<span key=${k}>${v}</span>`)}</div>`)}
      ${row(3, 'DAC', 'sound card', sine(6 * vol, 'var(--k-mm)'))}
      ${row(4, 'Loudspeaker', 'analog output device', sine(6 * vol, 'var(--k-mm)'))}
    </div>
      <div className="mv3-chips" style=${{ marginTop: '10px', marginBottom: 0 }}>${[1, .5, 1.5].map(v => html`<button key=${v} className=${'fig-btn' + (vol === v ? ' sel' : '')} onClick=${() => { setVol(v); if (i < 2) ctl.go(4); }}>${v === 1 ? 'No change' : 'Volume × ' + v}</button>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── digital = sampling + quantisation ── */
  function Digital({ ar }) {
    const steps = [
      { en: 'An <b>analog</b> signal: continuous in time and in value.', ar: 'الـ <b>analog</b> signal: متصلة في الزمن وفي القيمة.' },
      { en: '<b>Sampling</b>: measure it at regular instants. Continuous → <b>discrete in time</b>.', ar: 'الـ <b>Sampling</b>: بنقيسها عند لحظات منتظمة. من continuous لـ <b>discrete في الزمن</b>.' },
      { en: '<b>Quantisation</b>: each sample snaps to the nearest allowed level (red: the error). Discrete → <b>digital values</b>.', ar: 'الـ <b>Quantisation</b>: كل sample بتتقرّب لأقرب level مسموح (الأحمر هو الـ error). من discrete لـ <b>digital values</b>.' },
      { en: 'Each level is a binary code, so the signal is now a list of numbers. <b>Digital = sampling + quantisation</b>, which is what the ADC does. Change the sliders to try your own.', ar: 'كل level ليه binary code، فالإشارة بقت قايمة أرقام. يعني <b>Digital = sampling + quantisation</b>، وده اللي الـ ADC بيعمله. غيّر الـ sliders وجرّب بنفسك.' }];
    const [i, ctl] = useSteps(steps.length, 2400);
    const [n, setN] = useState(12), [bits, setBits] = useState(3);
    const L = 2 ** bits, f = u => .8 * Math.sin(2 * Math.PI * u) + .2 * Math.sin(4 * Math.PI * u + 1);
    const X = u => 40 + u * 252, Y = v => 92 - v * 74;
    const S = N(n, k => { const u = (k + .5) / n, v = f(u), q = Math.round((v + 1) / 2 * (L - 1)); return { u, v, q, qv: -1 + 2 * q / (L - 1) }; });
    const code = q => q.toString(2).padStart(bits, '0');
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <svg viewBox="0 0 300 184" role="img" aria-label="Analog signal, its samples and the quantised levels">
        ${i >= 2 && N(L, q => html`<g key=${q}><path d=${`M40 ${Y(-1 + 2 * q / (L - 1))} H294`} stroke="var(--line)" strokeDasharray="3 3" />${L <= 8 && html`<text x="34" y=${Y(-1 + 2 * q / (L - 1)) + 5} textAnchor="end" fontSize="14" style=${{ fontFamily: 'var(--mono)' }}>${code(q)}</text>`}</g>`)}
        <path d="M40 10 V176 M40 92 H296" stroke="var(--graphite)" strokeWidth="1.2" fill="none" />
        <path d=${curve(f, 0, 1, 160, X, Y)} stroke="var(--graphite)" strokeWidth="2.5" fill="none" className="fade" style=${{ opacity: i >= 1 ? .45 : 1 }} />
        ${i >= 1 && S.map((s, k) => html`<g key=${k}>
          <path d=${`M${X(s.u)} 92 V${Y(i >= 2 ? s.qv : s.v)}`} stroke="var(--ink)" strokeWidth="1.5" />
          ${i >= 2 && html`<path d=${`M${X(s.u)} ${Y(s.v)} V${Y(s.qv)}`} stroke="var(--pen)" strokeWidth="2.5" />`}
          <circle cx=${X(s.u)} cy=${Y(i >= 2 ? s.qv : s.v)} r="4" fill="var(--k-mm)" /></g>`)}
      </svg>
      ${i >= 3 && html`<div className="mv3-nums" style=${{ justifyContent: 'center', marginTop: '6px' }}>${S.map((s, k) => html`<span key=${k}>${code(s.q)}</span>`)}</div>`}
      <div className="mv3-rng"><span>Samples: <b>${n}</b></span><input type="range" min="4" max="24" value=${n} aria-label="Number of samples" onInput=${e => { setN(+e.target.value); if (i < 3) ctl.go(3); }} /></div>
      <div className="mv3-rng"><span>Bits per sample: <b>${bits}</b> (${L} levels)</span><input type="range" min="1" max="4" value=${bits} aria-label="Bits per sample" onInput=${e => { setBits(+e.target.value); if (i < 3) ctl.go(3); }} /></div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 10–11: the analog-to-digital-to-analog pipeline ── */
  function Pipeline({ ar }) {
    const steps = [
      { en: 'The pipeline <b>begins</b> with the analog input. This one also carries a fast wiggle: a frequency <b>above the sampling limit</b>.', ar: 'الـ pipeline <b>بتبدأ</b> بالـ analog input. الإشارة دي فيها كمان رعشة سريعة: frequency <b>فوق حد الـ sampling</b>.' },
      { en: '<b>Analog conditioning</b>: the <b>anti-aliasing filter</b> removes the frequencies above the sampling limit that would cause aliasing.', ar: 'الـ <b>Analog conditioning</b>: الـ <b>anti-aliasing filter</b> بيشيل الـ frequencies اللي فوق حد الـ sampling اللي ممكن تعمل aliasing.' },
      { en: 'The <b>ADC</b> samples it and <b>quantises</b> the continuous input into <b>discrete levels</b> (here 12 samples, 8 levels).', ar: 'الـ <b>ADC</b> بيعمل sampling وبيعمل <b>quantise</b> للـ input المتصل ويحوّله لـ <b>discrete levels</b> (هنا 12 sample و8 levels).' },
      { en: '<b>Digital processing</b> works on the numbers (e.g. volume change, equalisation). Here they pass unchanged.', ar: 'الـ <b>Digital processing</b> بيشتغل على الأرقام (زي تغيير الـ volume أو الـ equalisation). هنا بتعدي من غير تغيير.' },
      { en: 'The <b>DAC</b> converts the discrete levels into <b>continuous voltages or currents</b>: each level is held, so the output has steps.', ar: 'الـ <b>DAC</b> بيحوّل الـ discrete levels لـ <b>voltages أو currents متصلة</b>: كل level بيتمسك لحد اللي بعده، فالـ output فيه سلالم.' },
      { en: 'The output is filtered with a <b>low-pass filter</b> to remove the aliases (images) from the sampling, and the pipeline <b>ends</b> with the analog output.', ar: 'الـ output بيتعمله filter بـ <b>low-pass filter</b> عشان يشيل الـ aliases (images) اللي جت من الـ sampling، والـ pipeline <b>بتخلص</b> بالـ analog output.' }];
    const [i, ctl] = useSteps(steps.length, 2300);
    const [skipIn, setSkipIn] = useState(false), [skipOut, setSkipOut] = useState(false);
    const slow = u => Math.sin(2 * Math.PI * u), inp = u => slow(u) + .35 * Math.sin(2 * Math.PI * 9 * u), src = skipIn ? inp : slow;
    const X = u => 6 + u * 188, Y = v => 28 - v * 17, M = 1.35, LV = 8, q = v => -M + 2 * M * Math.round((Math.max(-M, Math.min(M, v)) + M) / (2 * M) * (LV - 1)) / (LV - 1);
    const S = N(13, k => [k / 12, q(src(k / 12))]);
    const box = kids => html`<svg viewBox="0 0 200 56" aria-hidden="true"><path d="M2 28 H198" stroke="var(--line)" />${kids}</svg>`;
    const line = (f, col, dash) => html`<path d=${curve(f, 0, 1, 240, X, Y)} stroke=${col} strokeWidth="2" fill="none" strokeDasharray=${dash || null} />`;
    const dots = col => S.map(([u, v], k) => html`<g key=${k}><path d=${`M${X(u)} 28 V${Y(v)}`} stroke="var(--ink)" strokeWidth="1.2" /><circle cx=${X(u)} cy=${Y(v)} r="3" fill=${col} /></g>`);
    const stairPath = S.slice(0, 12).map(([u, v], k) => `${k ? 'V' : 'M' + X(u).toFixed(1)} ${Y(v).toFixed(1)} H${X(S[k + 1][0]).toFixed(1)}`).join(' ');
    const outSmooth = smooth(S.map(([u, v]) => [X(u), Y(v)]));
    const row = (k, label, sub, body, off) => html`<div className=${'mv3-rw' + (i >= k ? '' : ' mv3-dim')}><div className=${'mv3-blk' + (off ? ' mv3-off' : i === k ? ' mv3-on' : '')}>${label}${sub && html`<small>${sub}</small>`}</div><div>${box(i >= k ? body : null)}</div></div>`;
    let cap = steps[i];
    if (i === steps.length - 1 && (skipIn || skipOut)) {
      const a = [], b = [];
      if (skipIn) { a.push('Without the <b>anti-aliasing filter</b>, the fast wiggle reaches the ADC. 12 samples cannot follow it, so it turns into a <b>false slower wave</b> (aliasing) that no later filter removes: compare with the dashed signal.'); b.push('من غير الـ <b>anti-aliasing filter</b>، الرعشة السريعة بتوصل للـ ADC. الـ 12 sample مش قادرين يتابعوها، فبتتحول لـ <b>موجة أبطأ غلط</b> (aliasing) ومفيش filter بعد كده يشيلها: قارن بالإشارة المتقطعة.'); }
      if (skipOut) { a.push('Without the output <b>low-pass filter</b>, the DAC\'s <b>steps</b> stay in the output: those sharp edges are the aliases (images) from the sampling.'); b.push('من غير الـ <b>low-pass filter</b> في الآخر، <b>سلالم</b> الـ DAC بتفضل في الـ output: الحواف الحادة دي هي الـ aliases (images) اللي جت من الـ sampling.'); }
      cap = { en: a.join(' '), ar: b.join(' ') };
    }
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-rows">
      ${row(0, 'Analog input', null, line(inp, 'var(--graphite)'))}
      ${row(1, 'Analog conditioning', 'anti-aliasing filter', line(src, 'var(--graphite)'), skipIn)}
      <div className="mv3-sys">
        ${row(2, 'Analog / Digital Conversion', 'ADC', html`${N(LV, k => html`<path key=${k} d=${`M2 ${Y(-M + 2 * M * k / (LV - 1))} H198`} stroke="var(--line)" strokeDasharray="2 3" />`)}${dots('var(--k-mm)')}`)}
        ${row(3, 'Digital Processing', null, dots('var(--k-mm)'))}
        ${row(4, 'Digital / Analog Conversion', 'DAC', html`<path d=${stairPath} stroke="var(--k-mm)" strokeWidth="2" fill="none" />`)}
      </div>
      ${row(5, 'Analog conditioning', 'low-pass filter', html`${skipIn && line(slow, 'var(--graphite)', '4 4')}<path d=${skipOut ? stairPath : outSmooth} stroke="var(--k-mm)" strokeWidth="2.2" fill="none" />`, skipOut)}
    </div>
      <div className="mv3-chips" style=${{ marginTop: '10px', marginBottom: 0 }}>
        <button className=${'mv3-tog' + (skipIn ? ' mv3-on' : '')} onClick=${() => { setSkipIn(s => !s); ctl.go(steps.length - 1); }}>${skipIn ? 'Use' : 'Skip'} the input filter</button>
        <button className=${'mv3-tog' + (skipOut ? ' mv3-on' : '')} onClick=${() => { setSkipOut(s => !s); ctl.go(steps.length - 1); }}>${skipOut ? 'Use' : 'Skip'} the output filter</button></div></div>
      <${Cap} ...${cap} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 12: how each source gets into the computer ── */
  const SRC = [
    { k: 'Typed text', how: 'Keyboard: generated directly', out: 'Text in binary (e.g. ASCII)', dig: false,
      en: '<b>Typed text</b> is generated directly by the computer in a binary format: it does <b>not</b> need digitising.', ar: 'الـ <b>text المكتوب بالـ keyboard</b> بيتعمل على طول بالكمبيوتر في binary format: <b>مش</b> محتاج digitising.' },
    { k: 'Drawing program', how: 'Generated directly by the program', out: 'Graphics in a binary format', dig: false,
      en: 'Graphics (and some images) made in a <b>drawing/painting program</b> are generated directly in a binary format: <b>no</b> digitising.', ar: 'الـ graphics (وبعض الـ images) اللي بتتعمل في <b>برنامج رسم</b> بتطلع على طول في binary format: <b>مفيش</b> digitising.' },
    { k: 'Printed text', how: 'Scanner + OCR', out: 'Text', dig: true,
      en: '<b>Printed text</b> is scanned and read by <b>OCR</b> (Optical Character Recognition).', ar: 'الـ <b>text المطبوع</b> بيتعمله scan وبيتقري بالـ <b>OCR</b> (Optical Character Recognition).' },
    { k: 'Handwritten text', how: 'OCR (some) or electronic pen sensing', out: 'Text', dig: true,
      en: 'Some <b>handwritten text</b> can be scanned via OCR; handwriting can also be digitised by <b>electronic pen sensing</b>.', ar: 'شوية من الـ <b>text المكتوب بخط الإيد</b> ممكن يتعمله scan بالـ OCR؛ والخط اليدوي ممكن كمان يتعمله digitise بالـ <b>electronic pen sensing</b>.' },
    { k: 'Printed image', how: 'Flatbed scanner', out: 'Image format', dig: true,
      en: '<b>Printed imagery/graphics</b> can be <b>flatbed scanned</b> directly to image formats.', ar: 'الـ <b>صور/graphics المطبوعة</b> ممكن تتعمل <b>flatbed scan</b> على طول لـ image formats.' }];
  function Capture({ ar }) {
    const [i, ctl] = useSteps(SRC.length, 2600), s = SRC[i];
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <div className="mv3-chips">${SRC.map((x, k) => html`<button key=${k} className=${'fig-btn' + (k === i ? ' sel' : '')} onClick=${() => ctl.go(k)}>${x.k}</button>`)}</div>
      <div className="mv3-flow">
        <div className="mv3-box"><b>Source</b>${s.k}</div><div className="mv3-arw">→</div>
        <div className="mv3-box" style=${{ borderColor: 'var(--k-mm)' }}><b>How</b>${s.how}</div><div className="mv3-arw">→</div>
        <div className="mv3-box"><b>Stored as</b>${s.out}</div></div>
      <p className=${'mv3-badge ' + (s.dig ? 'mv3-n' : 'mv3-y')}>${s.dig ? 'Needs digitising' : 'No digitising needed'}</p>
    </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${SRC} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 13: text is stored character by character ── */
  function TextBytes({ ar }) {
    const EX = ['Multimedia', 'a,b,3', 'صوت', 'café'];
    const [txt, setTxt] = useState(EX[0]);
    const enc = new TextEncoder(), chars = Array.from(txt).slice(0, 24);
    const cells = chars.map(c => { const b = Array.from(enc.encode(c)); return { c, cp: c.codePointAt(0), b }; });
    const total = cells.reduce((a, x) => a + x.b.length, 0), uni = cells.some(x => x.b.length > 1);
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <div className="mv3-chips">${EX.map(e => html`<button key=${e} className=${'fig-btn' + (txt === e ? ' sel' : '')} onClick=${() => setTxt(e)}>${e}</button>`)}</div>
      <input className="mv3-in" value=${txt} maxLength="24" aria-label="Type some text" onInput=${e => setTxt(e.target.value)} />
      <div className="mv3-cells">${cells.map((x, k) => html`<div key=${k} className=${'mv3-cell' + (x.b.length > 1 ? ' mv3-uni' : '')}>
        <div className="mv3-ch">${x.c === ' ' ? '␣' : x.c}</div><div className="mv3-hx">${x.b.map(v => v.toString(16).toUpperCase().padStart(2, '0')).join(' ')}</div></div>`)}</div>
      <div className="mv3-sum"><span className="mv3-k">${chars.length}</span> characters → <span className="mv3-k">${total}</span> bytes.
        ${uni ? html` The coloured characters are not ASCII: in UTF-8 (a Unicode encoding) they take <b>more than 1 byte</b>.` : html` All ASCII: <b>1 byte per character</b>.`}
        ${txt === 'a,b,3' ? html`<div className="mv3-muted">A CSV (Comma-Separated Values) row is stored as plain text like this.</div>` : null}</div>
    </div></div>
      <${Cap} en="Text is stored and input <b>character by character</b>: <b>1 byte per character</b> (text or format character) in ASCII, <b>more bytes for Unicode</b>. Each box shows a character and its bytes in hex. Type your own." ar="الـ text بيتخزن وبيدخل <b>حرف حرف</b>: <b>1 byte لكل حرف</b> (حرف عادي أو format character) في الـ ASCII، و<b>bytes أكتر في الـ Unicode</b>. كل مربع فيه حرف والـ bytes بتاعته بالـ hex. اكتب حاجة من عندك." showAr=${ar} /></figure>`;
  }

  /* ── slides 15–16, 22: graphics store primitives you can select; an image stores pixels ── */
  const star = (cx, cy, R, r) => 'M' + N(10, k => { const a = -Math.PI / 2 + k * Math.PI / 5, d = k % 2 ? r : R; return (cx + d * Math.cos(a)).toFixed(1) + ' ' + (cy + d * Math.sin(a)).toFixed(1); }).join(' L') + ' Z';
  const PR = [
    { id: 'line', d: 'M8 30 L30 95', st: '#555', w: 1.5, bb: [8, 30, 22, 65], file: 'line (8,30) to (30,95)' },
    { id: 'rect', d: 'M22 28 H46 V43 H22 Z', fill: '#4f9a9b', st: '#2d5d5e', w: 1, bb: [22, 28, 24, 15], file: 'polygon: rectangle 24 × 15' },
    { id: 'circ', d: 'M60 35 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0', fill: '#f2e600', st: '#8a8000', w: 1, bb: [60, 25, 20, 20], file: 'circle centre (70,35) r 10' },
    { id: 'star', d: star(55, 70, 19, 8), fill: '#d4248c', st: '#7a1450', w: 1, bb: [37, 51, 36, 34], file: 'polygon: star, 10 points' },
    { id: 'curve', d: 'M44 16 Q57 4 70 14 T96 10', st: '#7aa52a', w: 2.5, bb: [44, 6, 52, 10], file: 'curve (44,16) to (96,10)' },
    { id: 'arc', d: 'M30 106 A40 40 0 0 1 90 106', st: '#4c8a1e', w: 2, bb: [30, 92, 60, 14], file: 'arc (30,106) to (90,106) r 40' }];
  const PW = 50, PH = 60;
  const tf = (p, g) => { const cx = p.bb[0] + p.bb[2] / 2, cy = p.bb[1] + p.bb[3] / 2; return `translate(${cx + g.dx} ${cy + g.dy}) scale(${g.s}) translate(${-cx} ${-cy})`; };
  function VectorBitmap({ ar }) {
    const fresh = () => Object.fromEntries(PR.map(p => [p.id, { dx: 0, dy: 0, s: 1 }]));
    const [mode, setMode] = useState(0), [g, setG] = useState(fresh), [sel, setSel] = useState('star'), [box, setBox] = useState({ x: 18, y: 25, w: 18, h: 18 }), [ver, setVer] = useState(0);
    const cv = useRef(null), px = useRef(null);
    const raster = () => { const c = document.createElement('canvas'); c.width = PW; c.height = PH; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, PW, PH); x.scale(PW / 100, PH / 120);
      PR.forEach(p => { const q = g[p.id], cx = p.bb[0] + p.bb[2] / 2, cy = p.bb[1] + p.bb[3] / 2; x.save(); x.translate(cx + q.dx, cy + q.dy); x.scale(q.s, q.s); x.translate(-cx, -cy); const P = new Path2D(p.d);
        if (p.fill) { x.fillStyle = p.fill; x.fill(P); } x.strokeStyle = p.st; x.lineWidth = p.w; x.stroke(P); x.restore(); });
      px.current = x.getImageData(0, 0, PW, PH); };
    useEffect(() => { if (mode === 1) { raster(); setVer(v => v + 1); } }, [mode]);
    useEffect(() => { const c = cv.current; if (!c || !px.current) return; c.width = PW; c.height = PH; c.getContext('2d').putImageData(px.current, 0, 0); }, [ver, mode]);
    const move = (dx, dy) => {
      if (mode === 0) { setG(o => ({ ...o, [sel]: { ...o[sel], dx: o[sel].dx + dx * 5, dy: o[sel].dy + dy * 5 } })); return; }
      const d = px.current.data, src = new Uint8ClampedArray(d), { x, y, w, h } = box, mx = dx * 2, my = dy * 2;
      for (let j = y; j < y + h; j++) for (let k = x; k < x + w; k++) { const o = (j * PW + k) * 4; d[o] = d[o + 1] = d[o + 2] = 255; d[o + 3] = 255; }
      for (let j = y; j < y + h; j++) for (let k = x; k < x + w; k++) { const tj = j + my, tk = k + mx; if (tj < 0 || tk < 0 || tj >= PH || tk >= PW) continue; const o = (j * PW + k) * 4, t = (tj * PW + tk) * 4; for (let c = 0; c < 4; c++) d[t + c] = src[o + c]; }
      setBox({ ...box, x: x + mx, y: y + my }); setVer(v => v + 1);
    };
    const scale = f => setG(o => ({ ...o, [sel]: { ...o[sel], s: Math.max(.4, Math.min(2, o[sel].s * f)) } }));
    const tap = e => { const r = e.currentTarget.getBoundingClientRect(), k = Math.floor((e.clientX - r.left) / r.width * PW), j = Math.floor((e.clientY - r.top) / r.height * PH);
      const x = Math.max(0, Math.min(PW - 18, k - 9)), y = Math.max(0, Math.min(PH - 18, j - 9)); setBox({ x, y, w: 18, h: 18 }); };
    const reset = () => { setG(fresh()); setBox({ x: 18, y: 25, w: 18, h: 18 }); if (mode === 1) { px.current = null; setMode(0); } };
    const P = PR.find(p => p.id === sel), q = g[sel];
    const gfx = html`<svg viewBox="0 0 100 120" role="img" aria-label="A drawing made of primitives: line, rectangle, circle, star, curve and arc">
      <rect x="0" y="0" width="100" height="120" fill="#fff" />
      ${PR.map(p => html`<g key=${p.id} transform=${tf(p, g[p.id])} style=${{ cursor: 'pointer' }} onClick=${() => setSel(p.id)}>
        <path d=${p.d} fill=${p.fill || 'none'} stroke=${p.st} strokeWidth=${p.w} /><path d=${p.d} fill=${p.fill ? 'transparent' : 'none'} stroke="transparent" strokeWidth="10" /></g>`)}
      <g transform=${tf(P, q)} pointerEvents="none"><rect x=${P.bb[0] - 2} y=${P.bb[1] - 2} width=${P.bb[2] + 4} height=${P.bb[3] + 4} fill="none" stroke="#2f6fd8" strokeWidth=${1 / q.s} strokeDasharray="2 2" />
        ${[[0, 0], [1, 0], [0, 1], [1, 1]].map(([a, b], k) => html`<rect key=${k} x=${P.bb[0] - 2 + a * (P.bb[2] + 4) - 1.5 / q.s} y=${P.bb[1] - 2 + b * (P.bb[3] + 4) - 1.5 / q.s} width=${3 / q.s} height=${3 / q.s} fill="#2f6fd8" />`)}</g>
    </svg>`;
    const img = html`<div style=${{ position: 'relative' }} onClick=${tap}><canvas ref=${cv} width=${PW} height=${PH} role="img" aria-label="The same drawing saved as a bitmap of pixels"></canvas>
      <div className="mv3-sel" style=${{ left: box.x / PW * 100 + '%', top: box.y / PH * 100 + '%', width: box.w / PW * 100 + '%', height: box.h / PH * 100 + '%' }}></div></div>`;
    const cap = mode === 0
      ? { en: '<b>Graphics</b> are built from <b>primitives</b> (lines, polygons, circles, curves, arcs). The file stores the primitive assembly, so it is small, and each object stays <b>selectable and editable</b>: tap one, then move or resize it.', ar: 'الـ <b>Graphics</b> متكونة من <b>primitives</b> (lines والـ polygons والـ circles والـ curves والـ arcs). الـ file بيخزن تجميعة الـ primitives، فحجمه صغير، وكل object بيفضل <b>ينفع يتختار ويتعدل</b>: دوس على واحد وحرّكه أو كبّره.' }
      : { en: 'Saved as an <b>image</b>, the same picture is only a grid of pixels: the shapes are gone. You can only edit <b>individual pixels or groups of pixels</b> (as in Photoshop): tap to place the selection, then move it. It drags whatever pixels are inside and leaves a hole.', ar: 'لما نفس الرسمة تتحفظ كـ <b>image</b>، بتبقى grid من الـ pixels بس: الأشكال راحت. تقدر تعدّل <b>pixels لوحدها أو مجموعات pixels</b> بس (زي في الـ Photoshop): دوس عشان تحط الـ selection وبعدين حرّكها. هتسحب أي pixels جواها وتسيب مكانها فاضي.' };
    const B = PW * PH * 24 / 8;
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <div className="mv3-chips" role="tablist">${['Graphics (primitives)', 'Image (pixels)'].map((t, k) => html`<button key=${k} role="tab" aria-selected=${mode === k} className=${'fig-btn' + (mode === k ? ' solid' : '')} onClick=${() => setMode(k)}>${t}</button>`)}</div>
      <div className="mv3-vb"><div><div className="mv3-pg">${mode === 0 ? gfx : img}</div>
        <div className="mv3-ops">${[['←', -1, 0], ['→', 1, 0], ['↑', 0, -1], ['↓', 0, 1]].map(([t, a, b]) => html`<button key=${t} className="fig-btn" aria-label=${'Move ' + t} onClick=${() => move(a, b)}>${t}</button>`)}
          <button className="fig-btn" disabled=${mode === 1} onClick=${() => scale(1.2)}>Bigger</button><button className="fig-btn" disabled=${mode === 1} onClick=${() => scale(1 / 1.2)}>Smaller</button>
          <button className="fig-btn" onClick=${reset}>↻ Reset</button></div></div>
        <div className="mv3-file"><div className="mv3-hd">The file stores</div>
          ${mode === 0 ? PR.map(p => html`<button key=${p.id} className=${p.id === sel ? 'mv3-on' : ''} onClick=${() => setSel(p.id)}>${p.file}</button>`)
            : html`<div>${PW} × ${PH} = ${num(PW * PH)} pixels</div><div>× 24 bits ÷ 8 = <b>${num(B)} B</b></div><div className="mv3-muted" style=${{ marginTop: '4px' }}>No shapes, just colour values: the star is only pink pixels.</div>`}</div></div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── slide 17: 2D animation by key-frame interpolation (tweening of motion and shape) ── */
  const K0 = { x: 20, y: 34, w: 60, h: 36, r: 0, c: [31, 157, 58] }, K1 = { x: 196, y: 30, w: 74, h: 50, r: 1, c: [214, 31, 31] };
  const lerp = (a, b, t) => a + (b - a) * t;
  const at = t => ({ x: lerp(K0.x, K1.x, t), y: lerp(K0.y, K1.y, t), w: lerp(K0.w, K1.w, t), h: lerp(K0.h, K1.h, t), r: t, c: K0.c.map((v, k) => Math.round(lerp(v, K1.c[k], t))) });
  const shp = s => html`<rect x=${s.x} y=${s.y} width=${s.w} height=${s.h} rx=${s.r * s.w / 2} ry=${s.r * s.h / 2} fill=${`rgb(${s.c.join(',')})`} />`;
  function Tween({ ar }) {
    const NF = 12;
    const [f, setF] = useState(calm() ? NF : 0), [play, setPlay] = useState(!calm());
    useEffect(() => { if (!play) return; if (f >= NF) { const t = setTimeout(() => setF(0), 1400); return () => clearTimeout(t); } const t = setTimeout(() => setF(x => x + 1), 160); return () => clearTimeout(t); }, [f, play]);
    const s = at(f / NF), key = f === 0 || f === NF;
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <svg viewBox="0 0 290 110" role="img" aria-label="A green rectangle tweened into a red ellipse">
        <rect x=${K0.x} y=${K0.y} width=${K0.w} height=${K0.h} fill="none" stroke="var(--faint)" strokeDasharray="3 3" />
        <ellipse cx=${K1.x + K1.w / 2} cy=${K1.y + K1.h / 2} rx=${K1.w / 2} ry=${K1.h / 2} fill="none" stroke="var(--faint)" strokeDasharray="3 3" />
        ${shp(s)}
      </svg>
      <div className="mv3-strip">${N(NF + 1, k => html`<button key=${k} aria-label=${'Frame ' + k} className=${(k === 0 || k === NF ? 'mv3-key' : '') + (k === f ? ' mv3-cur' : '')} onClick=${() => { setPlay(false); setF(k); }}>
        <svg viewBox=${`${(at(k / NF).x + at(k / NF).w / 2 - 42).toFixed(1)} 13 84 84`} aria-hidden="true">${shp(at(k / NF))}</svg></button>`)}</div>
      <p className="mv3-out">Frame <b>${f}</b> of ${NF}: ${key ? html`<span className="mv3-k">key frame (stored)</span>` : 'in-between (computed)'}</p>
      <p className="mv3-out mv3-muted" style=${{ marginTop: '2px' }}>Stored: 2 key frames. Shown: ${NF + 1} frames, ${NF - 1} of them tweened.</p>
      <div className="mv3-clock"><button className="fig-btn" onClick=${() => { if (!play && f >= NF) setF(0); setPlay(p => !p); }}>${play ? '❚❚ Pause' : '▶ Play'}</button>
        <input type="range" min="0" max=${NF} value=${f} aria-label="Frame" onInput=${e => { setPlay(false); setF(+e.target.value); }} /></div>
    </div></div>
      <${Cap} en="Animation is a sequence of slightly changed graphics. In 2D animation (e.g. Flash) you draw only the <b>key frames</b> (outlined) and the program fills the frames between them by <b>key-frame interpolation</b>: <b>tweening</b> of motion and shape (here the colour too). Storing two key frames instead of every frame is why graphics animation is <b>compact</b> and suits network transmission."
        ar="الـ Animation سلسلة graphics كل واحدة متغيرة شوية. في الـ 2D animation (زي الـ Flash) بترسم الـ <b>key frames</b> بس (اللي حواليها إطار) والبرنامج بيملا الـ frames اللي بينهم بالـ <b>key-frame interpolation</b>: يعني <b>tweening</b> للحركة والشكل (وهنا اللون كمان). تخزين 2 key frames بدل كل الـ frames هو اللي بيخلي الـ graphics animation <b>compact</b> ومناسبة للإرسال على الـ network." showAr=${ar} /></figure>`;
  }

  /* ── slides 20–21: the slide's 10×10 bitmap and image sizes ── */
  function Bitmap({ ar }) {
    const [cur, setCur] = useState([3, 6]), [view, setView] = useState(2), [bpp, setBpp] = useState(8);
    const v = GRID[cur[0]][cur[1]];
    const b10 = 100 * bpp / 8, b512 = 512 * 512 * bpp / 8, frac = 1048576 / b512;
    const mbTxt = Number.isInteger(frac) ? (frac === 1 ? '1 MB' : `1/${frac} MB`) : (b512 / 1048576 === .75 ? '3/4 MB' : fx(b512 / 1048576, 3) + ' MB');
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <div className="mv3-chips">${['Numbers', 'Greys', 'Both'].map((t, k) => html`<button key=${k} className=${'fig-btn' + (view === k ? ' sel' : '')} onClick=${() => setView(k)}>${t}</button>`)}</div>
      <div className="mv3-bm" role="grid" aria-label="10 by 10 grid of grey values">${GRID.map((row, r) => row.map((g, c) => html`<button key=${r * 10 + c} aria-label=${`row ${r + 1} column ${c + 1}: ${g}`}
        className=${cur[0] === r && cur[1] === c ? 'mv3-cur' : ''} onClick=${() => setCur([r, c])}
        style=${view === 0 ? { background: 'var(--paper)', color: 'var(--ink)' } : { background: `rgb(${g},${g},${g})`, color: g > 100 ? '#111' : '#fff' }}>${view === 1 ? '' : g}</button>`))}</div>
      <div className="mv3-sum">Row ${cur[0] + 1}, column ${cur[1] + 1}: grey value <span className="mv3-k">${v}</span> = <span style=${{ fontFamily: 'var(--mono)' }}>${v.toString(2).padStart(8, '0')}</span> (8 bits)</div>
      <div className="mv3-chips" style=${{ marginTop: '10px' }}>${[[1, '1 bit (B/W)'], [8, '8 bits (grey)'], [24, '24 bits (true colour)']].map(([b, t]) => html`<button key=${b} className=${'fig-btn' + (bpp === b ? ' sel' : '')} onClick=${() => setBpp(b)}>${t}</button>`)}</div>
      <div className="mv3-sum" style=${{ marginTop: 0 }}>
        <div>This grid: 10 × 10 × ${bpp} bits ÷ 8 = <b>${fx(b10, 1)} B</b></div>
        <div>512 × 512 × ${bpp} bits ÷ 8 = ${num(b512)} B = <span className="mv3-k">${mbTxt}</span></div></div>
    </div></div>
      <${Cap} en="An uncompressed image is a <b>bitmap</b>: a grid of pixels, each a number (these are the slide's grey values, 35 to 132). Tap a pixel. Stored at 1 bit per pixel (black and white), 8 bits (grey scale, colour map) or 24 bits (true colour): a 512 × 512 grey image is 1/4 MB, a 24-bit one 3/4 MB."
        ar="الـ image من غير compression هي <b>bitmap</b>: grid من الـ pixels، كل واحد رقم (دي قيم الـ grey بتاعة السلايد، من 35 لـ 132). دوس على أي pixel. بتتخزن بـ 1 bit لكل pixel (أبيض وأسود) أو 8 bits (grey scale والـ colour map) أو 24 bits (true colour): صورة grey مقاسها <bdi>512 × 512</bdi> حجمها 1/4 MB، والـ 24-bit حجمها 3/4 MB." showAr=${ar} /></figure>`;
  }

  /* ── slide 25: uncompressed video per second / per minute ── */
  const VID = [{ n: '512×512 monochrome', f: .25 }, { n: 'PAL 720×576 colour', f: 1.2 }, { n: 'HD Blu-ray 1920×1080', f: 6 }];
  function VideoRate({ ar }) {
    const [fps, setFps] = useState(25), [min, setMin] = useState(false);
    const vals = VID.map(v => v.f * fps * (min ? 60 : 1)), top = Math.max(...vals);
    const show = x => x >= 1000 ? `${fx(x, 2)} MB = ${fx(x / 1000, 2)} GB` : `${fx(x, 2)} MB`;
    return html`<figure className="fig mv3"><div className="fig-stage"><div className="mv3-w">
      <div className="mv3-chips">${[25, 30, 50].map(v => html`<button key=${v} className=${'fig-btn' + (fps === v ? ' sel' : '')} onClick=${() => setFps(v)}>${v} fps</button>`)}
        <button className=${'fig-btn' + (min ? ' sel' : '')} onClick=${() => setMin(m => !m)}>${min ? 'Per minute' : 'Per second'}</button></div>
      <div className="mv3-bars">${VID.map((v, k) => html`<div key=${k} className="mv3-bar"><div className="mv3-l"><span>${v.n}</span><span>${show(vals[k])}</span></div>
        <div className="mv3-tr"><i style=${{ width: Math.max(1, vals[k] / top * 100) + '%' }}></i></div>
        <div className="mv3-f">${v.f} MB per frame × ${fps}${min ? ' × 60 s' : ''}</div></div>`)}</div>
    </div></div>
      <${Cap} en=${`Raw video is a series of images at 25, 30 or 50 frames per second, so size = frame size × frames per second. The slide's sums at 25 fps: 25 × 0.25 = 6.25 MB, 1.2 × 25 = 30 MB and 6 × 25 = 150 MB for a second, i.e. 9 GB for a minute of HD. Digital video clearly needs to be <b>compressed</b>.`}
        ar=${`الـ Raw video سلسلة صور بـ 25 أو 30 أو 50 frame في الثانية، فالحجم = حجم الـ frame × عدد الـ frames في الثانية. حسابات السلايد عند 25 fps للثانية الواحدة:<span class="ltr">25 × 0.25 = 6.25 MB ; 1.2 × 25 = 30 MB ; 6 × 25 = 150 MB</span>يعني دقيقة الـ HD حوالي 9 GB. الـ digital video لازم يتعمله <b>compression</b>.`} showAr=${ar} /></figure>`;
  }

  /* ── worked size calculations ── */
  function workedSets() {
    const hdPx = 1920 * 1080, hdF = hdPx * 3, hdS = hdF * 25, hdM = hdS * 60;
    const palPx = 720 * 576, palF = palPx * 3;
    const mp = 10e6 * 3;
    const cdBits = 44100 * 16 * 1 * 60, cdB = cdBits / 8;
    return [
      { t: 'HD minute', rows: [
        { f: `1920 × 1080 = ${num(hdPx)} pixels`, en: 'One HD frame has 1920 × 1080 pixels, about <b>2 megapixels</b>.', ar: 'الـ HD frame الواحد فيه حوالي <b>2 megapixels</b>:<span class="ltr">1920 × 1080 = ' + num(hdPx) + '</span>' },
        { f: `× 3 B = ${num(hdF)} B per frame`, en: 'Each colour pixel takes <b>3 bytes</b> (24 bits): about 6 MB per frame.', ar: 'كل pixel ملوّن بياخد <b>3 bytes</b> (يعني 24 bits): حوالي 6 MB لكل frame.' },
        { f: `× 25 = ${num(hdS)} B per second`, en: '<b>25 frames</b> every second: the slide rounds this to <b>150 MB</b> per second.', ar: 'فيه <b>25 frame</b> كل ثانية: السلايد بيقرّبها لـ <b>150 MB</b> في الثانية.' },
        { f: `× 60 = ${num(hdM)} B ≈ ${fx(hdM / 1e9, 1)} GB`, en: 'A minute is 60 seconds: about <b>9.3 GB</b>. The slide rounds 150 MB × 60 = <b>9 GB</b>.', ar: 'الدقيقة 60 ثانية: يعني حوالي <b>9.3 GB</b>. السلايد بيقرّب:<span class="ltr">150 MB × 60 = 9 GB</span>' }] },
      { t: 'PAL frame', rows: [
        { f: `720 × 576 = ${num(palPx)} pixels`, en: 'A PAL frame has 720 × 576 pixels.', ar: 'الـ PAL frame فيه:<span class="ltr">720 × 576 = ' + num(palPx) + ' pixels</span>' },
        { f: `× 3 B = ${num(palF)} B ≈ 1.2 MB`, en: 'At 3 bytes per colour pixel: about <b>1.2 MB</b> per frame.', ar: 'بـ 3 bytes لكل pixel ملوّن: حوالي <b>1.2 MB</b> لكل frame.' },
        { f: `× 25 = ${num(palF * 25)} B ≈ 30 MB/s`, en: 'At 25 fps the slide gives 1.2 × 25 = <b>30 MB</b> for a second.', ar: 'عند 25 fps السلايد بيدّي <b>30 MB</b> للثانية:<span class="ltr">1.2 × 25 = 30 MB</span>' }] },
      { t: '10 MP photo', rows: [
        { f: `10,000,000 × 3 B = ${num(mp)} B`, en: 'A 10 megapixel photo at 3 bytes per pixel.', ar: 'صورة 10 megapixel بـ 3 bytes لكل pixel.' },
        { f: `÷ 1,048,576 = ${fx(mp / 1048576, 1)} MB ≈ 29 MB`, en: 'With 1 MB = 1,048,576 B that is <b>28.6 MB</b>, the slide\'s <b>≈ 29 MB</b> uncompressed.', ar: 'لو الـ MB الواحد = 1,048,576 B يبقى <b>28.6 MB</b>، وده الـ <b>≈ 29 MB</b> بتاع السلايد من غير compression.' }] },
      { t: 'CD audio minute', rows: [
        { f: `44,100 × 16 bits = ${num(44100 * 16)} bits/s`, en: 'CD quality: <b>16-bit</b> samples at <b>44.1 kHz</b>.', ar: 'الـ CD quality معناها samples بـ <b>16-bit</b> عند <b>44.1 kHz</b>.' },
        { f: `× 1 channel × 60 s = ${num(cdBits)} bits`, en: 'Mono is 1 channel; a minute is 60 seconds.', ar: 'الـ Mono يعني channel واحدة؛ والدقيقة 60 ثانية.' },
        { f: `÷ 8 = ${num(cdB)} B`, en: '8 bits per byte.', ar: 'كل byte فيه 8 bits.' },
        { f: `÷ 1,048,576 = ${fx(cdB / 1048576, 2)} MB ≈ 5 MB`, en: 'About <b>5 MB</b> for a mono minute; stereo doubles it to about <b>10 MB</b>.', ar: 'حوالي <b>5 MB</b> للدقيقة الـ mono؛ والـ stereo بيضاعفها لحوالي <b>10 MB</b>.' }] }];
  }
  function WorkedOne({ rows, ar }) {
    const [i, ctl] = useSteps(rows.length, 2200);
    return html`<div><div className="fig-stage" style=${{ paddingTop: 0 }}><div className="mv3-w"><div className="mv3-wk">
      ${rows.map((r, k) => html`<div key=${k} className=${(k === i ? 'mv3-now ' : '') + pop(k <= i)}>${r.f}</div>`)}</div></div></div>
      <${Cap} en=${rows[i].en} ar=${rows[i].ar} showAr=${ar} /><${Bar} steps=${rows} i=${i} ctl=${ctl} /></div>`;
  }
  function Worked({ ar }) {
    const [tab, setTab] = useState(0), sets = workedSets();
    return html`<figure className="fig mv3"><div className="fig-stage" style=${{ paddingBottom: '6px' }}><div className="mv3-chips" style=${{ marginBottom: 0 }}>
      ${sets.map((s, k) => html`<button key=${k} className=${'fig-btn' + (tab === k ? ' solid' : '')} onClick=${() => setTab(k)}>${s.t}</button>`)}</div></div>
      <${WorkedOne} key=${tab} rows=${sets[tab].rows} ar=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-l3-media-time': MediaTime, 'mm-l3-sensors': Sensors, 'mm-l3-adc-dac': AdcDac, 'mm-l3-digital': Digital, 'mm-l3-pipeline': Pipeline,
    'mm-l3-capture': Capture, 'mm-l3-text-bytes': TextBytes, 'mm-l3-vector-bitmap': VectorBitmap, 'mm-l3-tween': Tween,
    'mm-l3-bitmap': Bitmap, 'mm-l3-video-rate': VideoRate, 'mm-l3-worked': Worked
  });
})();
/* ── part L5 ── */
// Multimedia visuals, Lecture 5 (Digital Audio Synthesis): subtractive + ADSR, additive, FM and its sidebands, sample-based synthesis,
// beat slicing, wavetable, granular, PSOLA and Karplus-Strong (slides 5–119). Every label and number comes from the site's notes or is computed with their method.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mv5{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }
.mv5 .fig-btn.solid{ background:var(--s-mm); }
.mv5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mv5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mv5-modes .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.mv5-modes .fig-btn[aria-pressed="true"]{ background:var(--s-mm); color:#fff; border-color:transparent; }
.mv5-sl{ display:grid; grid-template-columns:minmax(0, 6.4em) minmax(0, 1fr) 5.2em; gap:8px; align-items:center; max-width:470px; margin:4px auto; font-size:.86rem; color:var(--ink); }
.mv5-sl input{ width:100%; min-width:0; accent-color:var(--k-mm); }
.mv5-sl output{ font-family:var(--mono); text-align:right; font-size:.84rem; }
.mv5-lbl{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:2px 10px; max-width:560px; margin:8px auto 2px; font-size:.82rem; color:var(--graphite); line-height:1.3; }
.mv5-lbl:first-child{ margin-top:0; }
.mv5-lbl b{ color:var(--ink); }
.mv5-plot{ display:block; width:100%; height:auto; max-width:560px; margin:0 auto; overflow:visible; }
.mv5-plot text{ font-family:var(--body); }
.mv5-calc{ max-width:520px; margin:8px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font:500 .84rem/1.6 var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.mv5-calc .mv5-res{ color:var(--k-mm); font-weight:700; }
.mv5-calc .mv5-mut{ color:var(--graphite); font-family:var(--body); }
.mv5-chain{ display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:4px 6px; margin:0 auto 8px; max-width:560px; }
.mv5-box{ border:2px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 8px; font-size:.82rem; text-align:center; color:var(--ink); line-height:1.25; transition:border-color .4s, opacity .4s; }
.mv5-box.on{ border-color:var(--k-mm); }
.mv5-box.dim{ opacity:.4; }
.mv5-box small{ display:block; color:var(--graphite); font-size:.76rem; }
.mv5-arw{ color:var(--k-mm); font-weight:700; }
.mv5-leg{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.8rem; color:var(--ink); margin:4px 0 0; }
.mv5-leg span{ display:inline-flex; align-items:center; gap:5px; }
.mv5-leg i{ display:inline-block; width:16px; height:4px; border-radius:2px; }
.mv5-note{ font-size:.82rem; color:var(--graphite); text-align:center; margin:6px auto 0; max-width:560px; line-height:1.4; }
.mv5-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:8px 0 0; }
.mv5-checks{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; font-size:.86rem; color:var(--ink); margin:6px 0 0; }
.mv5-checks label{ display:inline-flex; gap:6px; align-items:center; cursor:pointer; }
.mv5-checks input{ accent-color:var(--k-mm); width:18px; height:18px; }
.mv5-paint{ display:grid; grid-template-columns:repeat(16, minmax(0, 1fr)); gap:2px; max-width:420px; margin:0 auto; }
.mv5-paint button{ aspect-ratio:1; border:1px solid var(--line); border-radius:2px; padding:0; min-width:0; background:var(--paper); cursor:pointer; }
.mv5-paint button.on{ background:var(--k-mm); border-color:var(--k-mm); }
.mv5-steps{ display:grid; grid-template-columns:repeat(12, minmax(0, 1fr)); gap:3px; max-width:420px; margin:6px auto 0; }
.mv5-steps button{ height:30px; border:1px solid var(--line); border-radius:4px; background:var(--paper); padding:0; min-width:0; cursor:pointer; }
.mv5-steps button.on{ background:var(--s-mm); border-color:transparent; }
.mv5-pads{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:6px; max-width:300px; margin:8px auto 0; }
.mv5-pads div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 2px; text-align:center; font-size:.8rem; color:var(--graphite); transition:background .2s; }
.mv5-pads div.has{ color:var(--ink); font-weight:600; border-color:var(--k-mm); }
.mv5-pads div.hit{ background:color-mix(in srgb, var(--k-mm) 40%, var(--paper)); }
.mv5-tbl{ border-collapse:collapse; margin:8px auto 0; font-size:.84rem; color:var(--ink); }
.mv5-tbl th, .mv5-tbl td{ border:1px solid var(--line); padding:3px 8px; text-align:center; font-family:var(--mono); }
.mv5-tbl th{ background:var(--paper-2); font-family:var(--body); font-weight:600; }
.mv5-tbl tr.on td{ background:color-mix(in srgb, var(--k-mm) 16%, var(--paper)); font-weight:700; }
.mv5-tabs{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:6px; max-width:420px; margin:0 auto; }
.mv5-tabs div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:3px; text-align:center; font-size:.78rem; color:var(--graphite); transition:box-shadow .3s, opacity .3s; }
.mv5-tabs div.on{ box-shadow:0 0 0 2px var(--k-mm); color:var(--ink); }
.mv5-tabs div.dim{ opacity:.35; }
.mv5-tabs svg{ display:block; width:100%; height:auto; }
.mv5-env{ display:grid; grid-template-columns:52px 14px minmax(0, 1fr); gap:4px 6px; align-items:center; max-width:460px; margin:0 auto; }
.mv5-env svg{ display:block; width:100%; height:auto; }
.mv5-env .x{ color:var(--graphite); text-align:center; font-weight:700; }
.mv5-sum{ text-align:center; margin:6px 0 2px; font-size:.86rem; color:var(--ink); }
.mv5-sum b{ display:inline-grid; place-items:center; width:30px; height:30px; border-radius:50%; border:2px solid var(--k-mm); color:var(--k-mm); margin-right:6px; }
@media (prefers-reduced-motion: reduce){ .mv5 .flow{ animation:none; } }
`;
  if (!document.getElementById('mv5-css')) { const s = document.createElement('style'); s.id = 'mv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  // ── helpers ──
  const W = 320;
  const N = (n, f) => Array.from({ length: n }, (_, k) => f(k));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fx = (x, d) => (+x).toFixed(d);
  const fmt = (x, d = 2) => (+x).toLocaleString('en-US', { maximumFractionDigits: d });
  const L = t => `<span class="ltr">${t}</span>`;
  const sy = (v, lo, hi, yT, yB) => yB - (clamp(v, lo, hi) - lo) / (hi - lo) * (yB - yT);
  const line = (ys, x0, x1, yT, yB, lo = -1, hi = 1) => { const n = ys.length; let s = ''; for (let k = 0; k < n; k++) s += (k ? 'L' : 'M') + (x0 + (x1 - x0) * k / Math.max(1, n - 1)).toFixed(1) + ' ' + sy(ys[k], lo, hi, yT, yB).toFixed(1); return s; };
  const fnp = (f, a, b, n, x0, x1, yT, yB, lo, hi) => line(N(n + 1, k => f(a + (b - a) * k / n)), x0, x1, yT, yB, lo, hi);
  // min/max envelope of a long signal, drawn as a filled band
  const band = (ys, x0, x1, yT, yB, lo = -1, hi = 1, cols = 160, from = 0, to = ys.length) => {
    const n = to - from, top = [], bot = [];
    for (let c = 0; c < cols; c++) {
      const a = from + Math.floor(c * n / cols), z = Math.max(a + 1, from + Math.floor((c + 1) * n / cols)); let mx = -1e9, mn = 1e9;
      for (let k = a; k < z && k < ys.length; k++) { const v = ys[k]; if (v > mx) mx = v; if (v < mn) mn = v; }
      if (mx < mn) { mx = 0; mn = 0; }
      const x = (x0 + (x1 - x0) * (c + .5) / cols).toFixed(1); top.push(x + ' ' + sy(mx, lo, hi, yT, yB).toFixed(1)); bot.push(x + ' ' + sy(mn, lo, hi, yT, yB).toFixed(1));
    }
    return 'M' + top.join(' L') + ' L' + bot.reverse().join(' L') + ' Z';
  };
  const peak = ys => { let m = 1e-9; for (let k = 0; k < ys.length; k++) m = Math.max(m, Math.abs(ys[k])); return m; };
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  // Bessel function of the first kind, J_n(x) = (1/π)∫₀^π cos(nτ − x sin τ) dτ (Simpson's rule)
  function besselJ(n, x) { const M = 240; let s = 0; for (let k = 0; k <= M; k++) { const t = Math.PI * k / M, w = k === 0 || k === M ? 1 : k % 2 ? 4 : 2; s += w * Math.cos(n * t - x * Math.sin(t)); } return s / (3 * M); }
  // in-place radix-2 FFT
  function fft(re, im, inv) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = 2 * Math.PI / len * (inv ? 1 : -1), wr = Math.cos(ang), wi = Math.sin(ang);
      for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const a = i + k, b = a + len / 2, tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr; re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti; const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr; } }
    }
    if (inv) for (let k = 0; k < n; k++) { re[k] /= n; im[k] /= n; }
  }
  // MATLAB butter(n, Wn, 'low') as second-order sections (bilinear transform of the analog Butterworth prototype)
  function butter(n, Wn) {
    const c = Math.tan(Math.PI * Wn / 2), S = [];
    for (let k = 0; k < Math.floor(n / 2); k++) { const th = Math.PI * (2 * k + n + 1) / (2 * n), a = -2 * c * Math.cos(th), cc = c * c, d = 1 + a + cc; S.push({ b: [cc / d, 2 * cc / d, cc / d], a: [(2 * cc - 2) / d, (1 - a + cc) / d] }); }
    if (n % 2) { const d = 1 + c; S.push({ b: [c / d, c / d, 0], a: [(c - 1) / d, 0] }); }
    return S;
  }
  function filt(S, x) { let y = Float64Array.from(x); for (const s of S) { const o = new Float64Array(y.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0; for (let k = 0; k < y.length; k++) { const v = s.b[0] * y[k] + s.b[1] * x1 + s.b[2] * x2 - s.a[0] * y1 - s.a[1] * y2; x2 = x1; x1 = y[k]; y2 = y1; y1 = v; o[k] = v; } y = o; } return y; }
  const butterMag = (n, Wn, f, Fs) => 1 / Math.sqrt(1 + Math.pow(Math.tan(Math.PI * f / Fs) / Math.tan(Math.PI * Wn / 2), 2 * n));
  // synth.m: 'sine' or 'saw', with its 10 ms Bartlett edge ramp
  function synth(freq, dur, amp, Fs, type, edge = true) {
    const n = Math.floor(dur * Fs), y = new Float64Array(n);
    if (type === 'sine') for (let k = 0; k < n; k++) y[k] = amp * Math.sin(2 * Math.PI * k * freq / Fs);
    else { const T = Fs / freq; let m = 0; for (let k = 0; k < n; k++) { const r = k / T; y[k] = amp * (r - Math.trunc(r)); m += y[k]; } m /= n; for (let k = 0; k < n; k++) y[k] -= m; }
    if (edge && dur > .02) { const Lb = 2 * Math.trunc(.01 * Fs) + 1, h = Math.ceil(Lb / 2); for (let k = 0; k < h; k++) { const w = 2 * k / (Lb - 1); y[k] *= w; y[n - 1 - k] *= w; } }
    return y;
  }
  function useAnim(on, deps = []) {
    const [t, setT] = useState(0);
    useEffect(() => { if (!on || calm()) { setT(0); return; } let raf, t0 = performance.now(); const f = now => { setT((now - t0) / 1000); raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf); }, [on, ...deps]);
    return t;
  }
  const Modes = ({ list, mode, set }) => html`<div className="mv5-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Slider = ({ label, min, max, step = 1, v, set, out }) => html`<label className="mv5-sl"><span>${label}</span><input type="range" min=${min} max=${max} step=${step} value=${v} onChange=${e => set(+e.target.value)} /><output>${out == null ? v : out}</output></label>`;
  const Lbl = ({ l, r }) => html`<div className="mv5-lbl"><span dangerouslySetInnerHTML=${{ __html: l }}></span>${r ? html`<span dangerouslySetInnerHTML=${{ __html: r }}></span>` : null}</div>`;
  const Calc = ({ rows }) => html`<div className="mv5-calc">${rows.filter(Boolean).map((r, k) => html`<div key=${k} dangerouslySetInnerHTML=${{ __html: r }}></div>`)}</div>`;
  const Fig = ({ children, cap, ar, bar }) => html`<figure className="fig mv5"><div className="fig-stage">${children}</div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />${bar || null}</figure>`;
  const Svg = ({ h, children, label }) => html`<svg className="mv5-plot" viewBox=${`0 0 ${W} ${h}`} role=${label ? 'img' : null} aria-label=${label || null} aria-hidden=${label ? null : 'true'}>${children}</svg>`;
  const axis = (y, x0 = 0, x1 = W) => html`<path d=${`M${x0} ${y} H${x1}`} stroke="var(--faint)" strokeWidth="1" />`;
  const ticks = (list, X, y) => list.map(([v, t], k) => html`<g key=${'t' + k}><path d=${`M${X(v)} ${y - 4} V${y}`} stroke="var(--graphite)" /><text x=${X(v)} y=${y + 16} textAnchor=${k === 0 && X(v) < 20 ? 'start' : k === list.length - 1 && X(v) > W - 20 ? 'end' : 'middle'} fontSize="15" style=${{ fill: 'var(--graphite)' }}>${t}</text></g>`);
  // vertical spectrum bars at positions xs with heights hs (0..1)
  const bars = (xs, hs, yT, yB, color, wd = 5, key = 'b') => xs.map((x, k) => html`<path key=${key + k} d=${`M${x.toFixed(1)} ${yB} V${(yB - clamp(hs[k], 0, 1) * (yB - yT)).toFixed(1)}`} stroke=${typeof color === 'function' ? color(k) : color} strokeWidth=${wd} />`);

  /* ── [1.1] slide 5: simulating a bowed string, sawtooth → low-pass filter ── */
  function Bowed({ ar }) {
    const steps = [
      { en: 'Take the output of a <b>sawtooth generator</b> (440 Hz at 22050 Hz, as in subtract_synth.m): a harsh wave, rich in harmonics. Its partials sit at every multiple of 440 Hz.', ar: 'خد الـ output بتاع <b>sawtooth generator</b> (<bdi>440 Hz</bdi> على <bdi>22050 Hz</bdi> زي subtract_synth.m): موجة حادة وغنية بالـ harmonics. الـ partials بتاعتها عند كل مضاعف لـ <bdi>440 Hz</bdi>.' },
      { en: 'Use a <b>low-pass filter</b> (here butter(1, 0.04), cut-off 441 Hz) to <b>dampen its higher partials</b>: the dashed curve is the filter, the bars show what is left of each partial.', ar: 'استخدم <b>low-pass filter</b> (هنا <bdi>butter(1, 0.04)</bdi> والـ cut-off بتاعه <bdi>441 Hz</bdi>) عشان <b>تهدّي الـ partials العالية</b>: المنحنى المتقطع هو الـ filter، والأعمدة بتوري اللي فاضل من كل partial.' },
      { en: 'The result is smoother: a <b>more natural approximation of a bowed string</b> than the sawtooth generator alone. Removing overtones from a rich sound is subtractive synthesis.', ar: 'النتيجة أنعم: <b>تقريب أطبع لصوت الوتر بالقوس</b> من الـ sawtooth generator لوحده. إننا نشيل overtones من صوت غني هو ده الـ subtractive synthesis.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const d = useMemo(() => { const y = synth(440, .2, .9, 22050, 'saw'), yf = filt(butter(1, .04), y); return { raw: Array.from(y.slice(2000, 2251)), f: Array.from(yf.slice(2000, 2251)) }; }, []);
    const pf = peak(d.f), hs = N(25, k => 1 / (k + 1)), hf = hs.map((a, k) => a * butterMag(1, .04, 440 * (k + 1), 22050));
    const X = f => 10 + f / 11025 * 300;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <div className="mv5-chain"><div className=${'mv5-box ' + (i === 0 ? 'on' : '')}>Sawtooth generator</div><span className="mv5-arw">→</span><div className=${'mv5-box ' + (i === 1 ? 'on' : i < 1 ? 'dim' : '')}>Low-pass filter</div><span className="mv5-arw">→</span><div className=${'mv5-box ' + (i === 2 ? 'on' : i < 2 ? 'dim' : '')}>Bowed string</div></div>
      <${Lbl} l=${i < 2 ? '<b>Waveform</b>: sawtooth' : '<b>Waveform</b>: filtered (scaled to fit)'} r="250 samples" />
      <${Svg} h=${90}>${axis(45)}<path d=${line(d.raw, 4, 316, 6, 84, -.5, .5)} stroke=${i < 2 ? 'var(--k-mm)' : 'var(--faint)'} strokeWidth="2" fill="none" />
        ${i === 2 && html`<path d=${line(d.f.map(v => v / pf * .45), 4, 316, 6, 84, -.5, .5)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" />`}<//>
      <${Lbl} l="<b>Spectrum</b>: partials 1 to 25" r="0 to 11025 Hz" />
      <${Svg} h=${100}>${axis(80)}
        ${bars(hs.map((_, k) => X(440 * (k + 1))), hs, 6, 80, i === 0 ? 'var(--k-mm)' : 'var(--faint)', 5, 'r')}
        ${i >= 1 && bars(hs.map((_, k) => X(440 * (k + 1))), hf, 6, 80, 'var(--k-mm)', 5, 'f')}
        ${i >= 1 && html`<path d=${fnp(f => butterMag(1, .04, f, 22050), 1, 11000, 120, X(1), X(11000), 6, 80, 0, 1)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" fill="none" />`}
        ${ticks([[0, '0'], [5000, '5 kHz'], [11025, '11 kHz']], X, 80)}<//>
    <//>`;
  }

  /* ── [1.2] slides 6–7: the voice as subtractive synthesis, ooh / aah / sweeping filter ── */
  function Vocal({ ar }) {
    const [mode, setMode] = useState('sweep');
    const t = useAnim(mode === 'sweep');
    const cut = mode === 'ooh' ? 1.5 : mode === 'aah' ? 12 : 1.5 + 10.5 * (.5 - .5 * Math.cos(2 * Math.PI * t / 4));
    const H = n => 1 / Math.sqrt(1 + Math.pow(n / cut, 4));
    const src = N(16, k => 1 / Math.sqrt(k + 1)), out = src.map((a, k) => a * H(k + 1));
    const wave = N(241, j => { const x = 4 * Math.PI * j / 240; return out.reduce((s, a, k) => s + a * Math.sin((k + 1) * x), 0); });
    const pw = Math.max(1.5, peak(wave));
    const X = n => 10 + (n - .5) * 300 / 16;
    const name = mode === 'sweep' ? (cut < 4 ? 'ooh' : cut > 9 ? 'aah' : 'ooh ↔ aah') : mode;
    const cap = mode === 'ooh' ? { en: '<b>"ooh"</b>: the mouth and throat filter <b>removes</b> most of the harmonics (to be more precise, reduces their amplitude). The vocal cords still make the same raw, rich sound.', ar: 'الـ <b>"ooh"</b>: الـ filter بتاع البُق والزور <b>بيشيل</b> معظم الـ harmonics (أو بالأدق بيقلل الـ amplitude بتاعها). الأحبال الصوتية لسه بتطلع نفس الصوت الخام الغني.' }
      : mode === 'aah' ? { en: '<b>"aah"</b>: most of the original harmonics are still <b>present</b>. Same pitch, same source: only the filter (the mouth shape) changed.', ar: 'الـ <b>"aah"</b>: معظم الـ harmonics الأصلية لسه <b>موجودة</b>. نفس الـ pitch ونفس المصدر، اللي اتغير بس هو الـ filter (شكل البُق).' }
      : { en: '<b>A sweeping filter</b>: gradually changing from "ooh" to "aah" and back again moves the <b>cut-off frequency</b>, subtracting more or fewer harmonics. This is the basis of the <b>wah-wah</b> guitar effect.', ar: '<b>فلتر بيتحرك (sweeping filter)</b>: لما تغيّر بالراحة من "ooh" لـ "aah" وترجع، الـ <b>cut-off frequency</b> بتتحرك فبتشيل harmonics أكتر أو أقل. ودي فكرة الـ <b>wah-wah</b> effect بتاع الجيتار.' };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['ooh', '"ooh"'], ['aah', '"aah"'], ['sweep', 'Sweep ooh → aah → ooh']]} mode=${mode} set=${setMode} />
      <div className="mv5-chain"><div className="mv5-box on">Oscillator<small>vocal cords</small></div><span className="mv5-arw">→</span><div className="mv5-box on">Filter<small>mouth and throat</small></div><span className="mv5-arw">→</span><div className="mv5-box">"${name}"</div></div>
      <${Lbl} l="<b>Harmonics</b>: source (grey) and after the filter" r="harmonic 1 to 16" />
      <${Svg} h=${96}>${axis(84)}
        ${bars(src.map((_, k) => X(k + 1)), src, 6, 84, 'var(--faint)', 9, 's')}
        ${bars(out.map((_, k) => X(k + 1)), out, 6, 84, 'var(--k-mm)', 9, 'o')}
        <path d=${fnp(H, .5, 16.5, 120, 10, 310, 6, 84, 0, 1)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" fill="none" /><//>
      <${Lbl} l="<b>Sound</b> after the filter" r="two periods" />
      <${Svg} h=${80}>${axis(40)}<path d=${line(wave, 4, 316, 4, 76, -pw, pw)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" /><//>
    <//>`;
  }

  /* ── [1.3] slide 8: aeroplane noise, white "ssh" filtered into pink noise ── */
  function Noise({ ar }) {
    const [mode, setMode] = useState('white');
    const d = useMemo(() => {
      const r = rng(7), n = 4096, w = new Float64Array(n), p = new Float64Array(n); let b0 = 0, b1 = 0, b2 = 0;
      for (let k = 0; k < n; k++) { const x = 2 * r() - 1; w[k] = x; b0 = .99765 * b0 + x * .099046; b1 = .963 * b1 + x * .2965164; b2 = .57 * b2 + x * 1.0526913; p[k] = b0 + b1 + b2 + x * .1848; }
      const spec = x => { const re = Float64Array.from(x), im = new Float64Array(n); fft(re, im); const bandE = N(16, b => { let s = 0; for (let k = b * 128 + 1; k < (b + 1) * 128; k++) s += re[k] * re[k] + im[k] * im[k]; return s; }); const m = Math.max(...bandE); return bandE.map(e => 10 * Math.log10(e / m)); };
      return { w, p, sw: spec(w), sp: spec(p), pw: peak(w), pp: peak(p) };
    }, []);
    const pink = mode === 'pink', sig = pink ? d.p : d.w, pk = pink ? d.pp : d.pw, db = pink ? d.sp : d.sw;
    const X = b => 10 + (b + .5) * 300 / 16;
    const cap = pink ? { en: 'Now shape the mouth to <b>remove the high frequencies</b>: the energy falls off as the frequency rises. This is <b>pink noise</b>, the sound of a jet landing. Filtered white noise also makes ocean waves, wind, and the snare and percussion of early drum machines.', ar: 'دلوقتي شكّل بُقك عشان <b>تشيل الـ high frequencies</b>: الطاقة بتقل كل ما الـ frequency تعلى. ده الـ <b>pink noise</b>، صوت طيارة بتهبط. والـ white noise بعد الـ filtering بيعمل كمان صوت موج البحر والريح، والـ snare والـ percussion في الـ drum machines القديمة.' }
      : { en: 'Make a <b>"ssh"</b> sound: <b>white noise</b>, random samples with the same energy at every frequency (the spectrum is flat).', ar: 'اعمل صوت <b>"ssh"</b>: ده <b>white noise</b>، وهي samples عشوائية فيها نفس الطاقة عند كل frequency (الـ spectrum مسطح).' };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['white', '"ssh": white noise'], ['pink', 'Shape the mouth: pink noise']]} mode=${mode} set=${setMode} />
      <${Lbl} l="<b>Waveform</b>" r="300 samples" />
      <${Svg} h=${80}>${axis(40)}<path d=${line(Array.from(sig.slice(1000, 1300)), 4, 316, 4, 76, -pk, pk)} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" /><//>
      <${Lbl} l="<b>Energy per frequency band</b> (dB, low → high)" r="0 to −30 dB" />
      <${Svg} h=${96}>${axis(84)}${bars(db.map((_, b) => X(b)), db.map(v => 1 + v / 30), 6, 84, pink ? 'var(--pen)' : 'var(--k-mm)', 13)}<//>
    <//>`;
  }

  /* ── [1.4] slide 9: the three basic elements, source → filter (cut-off, resonance) → amplitude envelope ── */
  function Control({ ar }) {
    const [src, setSrc] = useState('saw'), [cut, setCut] = useState(4), [q, setQ] = useState(2), [env, setEnv] = useState(true);
    const M = 256;
    const d = useMemo(() => {
      const per = N(M, k => src === 'square' ? (k < M / 2 ? 1 : -1) : src === 'pulse' ? (k < M / 4 ? 1 : -1) : src === 'saw' ? 1 - 2 * k / M : (k < M / 2 ? -1 + 4 * k / M : 3 - 4 * k / M));
      const mean = per.reduce((s, v) => s + v, 0) / M, x = per.map(v => v - mean);
      const re = Float64Array.from(x), im = new Float64Array(M); fft(re, im);
      const amp = N(24, n => Math.hypot(re[n + 1], im[n + 1]) / (M / 2));
      const H = n => { const w = n / cut, dr = 1 - w * w, di = w / q, m = dr * dr + di * di; return [dr / m, -di / m]; };
      re[0] = 0; im[0] = 0;
      for (let n = 1; n < M / 2; n++) { const [hr, hi] = H(n); for (const k of [n, M - n]) { const s = k === n ? 1 : -1, ar2 = re[k], ai = im[k], hi2 = hi * s; re[k] = ar2 * hr - ai * hi2; im[k] = ar2 * hi2 + ai * hr; } }
      re[M / 2] = 0; im[M / 2] = 0;
      fft(re, im, true);
      const out = Array.from(re), mag = n => Math.hypot(...H(n));
      return { x, out, amp, famp: amp.map((a, k) => a * mag(k + 1)), mag };
    }, [src, cut, q]);
    const two = a => a.concat(a), po = Math.max(1, peak(d.out));
    const mx = Math.max(...d.amp, ...d.famp);
    const X = n => 10 + (n - .5) * 300 / 24;
    const e = t => t < .1 ? t / .1 : t < .25 ? 1 - .4 * (t - .1) / .15 : t < .75 ? .6 : Math.max(0, .6 * (1 - (t - .75) / .25));
    const note = N(1201, j => (env ? e(j / 1200) : 1) * d.out[(j * 9) % M] / po);
    const nm = { square: 'square', pulse: 'pulse', saw: 'sawtooth', tri: 'triangle' }[src];
    const cap = { en: `<b>Source signal</b>: a ${nm} wave (common sources: square, pulse, sawtooth and triangle; modern synthesisers allow arbitrary waveforms). <b>Filtering</b>: the cut-off (here ${cut} × the fundamental) and resonance (Q = ${q}) are set to simulate an instrument's timbre; resonance boosts the harmonics near the cut-off. <b>Amplitude envelope</b>: shapes the note's volume over time (strictly not subtractive, but frequently used).`,
      ar: `الـ <b>Source signal</b> هنا موجة ${nm} (المصادر المشهورة square و pulse و sawtooth و triangle، والـ synthesisers الحديثة بتسمح بأي waveform). الـ <b>Filtering</b>: بنظبط الـ cut-off (هنا <bdi>${cut} × f₀</bdi>) والـ resonance (<bdi>Q = ${q}</bdi>) عشان نقلّد الـ timbre بتاع آلة؛ والـ resonance بتعلّي الـ harmonics اللي جنب الـ cut-off. الـ <b>Amplitude envelope</b>: بيشكّل علو النوتة مع الوقت (مش subtractive بالظبط بس مستخدم كتير).` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['square', 'Square'], ['pulse', 'Pulse'], ['saw', 'Sawtooth'], ['tri', 'Triangle']]} mode=${src} set=${setSrc} />
      <${Slider} label="Cut-off" min=${1} max=${16} v=${cut} set=${setCut} out=${cut + '× f₀'} />
      <${Slider} label="Resonance" min=${.7} max=${8} step=${.1} v=${q} set=${setQ} out=${'Q ' + fx(q, 1)} />
      <div className="mv5-checks"><label><input type="checkbox" checked=${env} onChange=${() => setEnv(v => !v)} />Amplitude envelope</label></div>
      <${Lbl} l="<b>(1) Source</b> (grey) and <b>filtered</b> signal" r="two periods" />
      <${Svg} h=${80}>${axis(40)}<path d=${line(two(d.x), 4, 316, 6, 74, -1.1, 1.1)} stroke="var(--faint)" strokeWidth="2" fill="none" /><path d=${line(two(d.out).map(v => v / po), 4, 316, 6, 74, -1.1, 1.1)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" /><//>
      <${Lbl} l="<b>(2) Filtering</b>: harmonics 1 to 24 and the filter" />
      <${Svg} h=${90}>${axis(80)}${bars(d.amp.map((_, k) => X(k + 1)), d.amp.map(a => a / mx), 6, 80, 'var(--faint)', 6, 's')}${bars(d.famp.map((_, k) => X(k + 1)), d.famp.map(a => a / mx), 6, 80, 'var(--k-mm)', 6, 'o')}
        <path d=${fnp(n => d.mag(n) / Math.max(1, d.mag(cut)), .5, 24.5, 160, 10, 310, 6, 80, 0, 1)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" fill="none" /><//>
      <${Lbl} l="<b>(3) Amplitude envelope</b>: the whole note" />
      <${Svg} h=${80}>${axis(40)}<path d=${band(note, 4, 316, 4, 76, -1, 1, 150)} fill="var(--k-mm)" opacity=".75" /><//>
    <//>`;
  }

  /* ── [1.6] slides 10–11: the ADSR envelope ── */
  const ADSR_P = { organ: [.02, 0, 1, .06], guitar: [.01, 1.5, 0, .1], pad: [.8, .3, .8, .5], bell: [.01, .9, .45, 1.9] };
  function Adsr({ ar }) {
    const steps = [
      { en: '<b>Attack</b>: how quickly the sound reaches full volume after the key is pressed. Virtually instantaneous for most mechanical instruments; slowed down for bowed strings and "pads".', ar: 'الـ <b>Attack</b>: الصوت بيوصل للعلو الكامل بسرعة قد إيه بعد ما الـ key تتداس. تقريبًا لحظي في معظم الآلات الميكانيكية، وبطيء في الأوتار بالقوس والـ "pads".' },
      { en: '<b>Decay</b>: how quickly the sound drops to the sustain level after the initial peak.', ar: 'الـ <b>Decay</b>: الصوت بينزل لمستوى الـ sustain بسرعة قد إيه بعد أول قمة.' },
      { en: '<b>Sustain</b>: the "constant" volume held after the decay until the note is released. It is a <b>volume level, not a time period</b>.', ar: 'الـ <b>Sustain</b>: العلو "الثابت" اللي بيفضل بعد الـ decay لحد ما النوتة تتساب. ده <b>مستوى علو مش مدة زمنية</b>.' },
      { en: '<b>Release</b>: how quickly the sound fades when the key is released. Often very short (an organ); longer for a bell or a piano with the sustain pedal pressed.', ar: 'الـ <b>Release</b>: الصوت بيختفي بسرعة قد إيه لما الـ key تتساب. غالبًا قصير جدًا (زي الـ organ)، وأطول في الجرس أو البيانو والـ sustain pedal مداس.' },
      { en: 'Each instrument changes its volume over time in its own way. Pick an instrument or move the sliders. Envelopes can also control a filter frequency or an oscillator pitch.', ar: 'كل آلة بيتغير علوها مع الوقت بطريقتها. اختار آلة أو حرّك الـ sliders. والـ envelope ممكن كمان يتحكم في الـ filter frequency أو الـ pitch بتاع الـ oscillator.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [pre, setPre] = useState('pad'), [p, setP] = useState(ADSR_P.pad);
    const pick = k => { setPre(k); setP(ADSR_P[k]); ctl.go(4); };
    const set = j => v => { setPre('own'); setP(o => o.map((x, k) => k === j ? v : x)); };
    const [A, D, S, R] = p, HOLD = 1.6, TT = 3.8;
    const lv = t => t < A ? t / Math.max(A, 1e-6) : t < A + D ? 1 - (1 - S) * (t - A) / Math.max(D, 1e-6) : S;
    const up = lv(HOLD), env = t => t < HOLD ? lv(t) : t < HOLD + R ? up * (1 - (t - HOLD) / Math.max(R, 1e-6)) : 0;
    const X = t => 12 + t / TT * 300, Y = v => 128 - v * 100;
    const seg = [[0, Math.min(A, HOLD)], [Math.min(A, HOLD), Math.min(A + D, HOLD)], [Math.min(A + D, HOLD), HOLD], [HOLD, HOLD + R]];
    const cap = i < 4 ? steps[i] : pre === 'organ' ? { en: '<b>Pipe organ</b>: when a key is pressed it plays at constant volume; the sound dies quickly when the key is released.', ar: 'الـ <b>Pipe organ</b>: لما الـ key تتداس بيعزف بعلو ثابت، والصوت بيموت بسرعة لما الـ key تتساب.' }
      : pre === 'guitar' ? { en: '<b>Guitar</b>: loudest immediately after it is played, then it fades with time.', ar: 'الـ <b>Guitar</b>: بيبقى أعلى حاجة أول ما يتعزف، وبعدين بيخفت مع الوقت.' }
      : pre === 'bell' ? { en: '<b>Bell, or piano with the sustain pedal</b>: an example where the release is longer.', ar: 'الـ <b>جرس، أو بيانو والـ sustain pedal مداس</b>: مثال الـ release فيه أطول.' } : steps[4];
    return html`<${Fig} ar=${ar} cap=${cap} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} h=${150} label="ADSR envelope: volume against time from key pressed to key released">
        ${i < 4 && seg[i][1] > seg[i][0] && html`<rect x=${X(seg[i][0])} y="20" width=${X(seg[i][1]) - X(seg[i][0])} height="108" fill="color-mix(in srgb, var(--k-mm) 18%, transparent)" />`}
        <path d="M12 128 H314 M12 20 V128" stroke="var(--graphite)" strokeWidth="1.5" fill="none" />
        <path d=${`M12 ${Y(S)} H${X(HOLD)}`} stroke="var(--faint)" strokeDasharray="4 4" />
        <path d=${fnp(env, 0, TT, 380, X(0), X(TT), Y(1), Y(0), 0, 1)} stroke="var(--k-mm)" strokeWidth="3" fill="none" />
        <path d=${`M${X(0)} 136 l-6 10 h12 z M${X(HOLD)} 146 l-6 -10 h12 z`} fill="var(--pen)" />
        ${['A', 'D', 'S', 'R'].map((t, k) => seg[k][1] > seg[k][0] + .05 && html`<text key=${t} x=${(X(seg[k][0]) + X(seg[k][1])) / 2} y="16" textAnchor="middle" fontSize="16" fontWeight="700" style=${{ fill: i === k ? 'var(--k-mm)' : 'var(--ink)' }}>${t}</text>`)}<//>
      <p className="mv5-note"><span style=${{ color: 'var(--pen)' }}>▲</span> key pressed · <span style=${{ color: 'var(--pen)' }}>▼</span> key released · dashed: sustain level</p>
      <div className="mv5-row" style=${{ marginBottom: '6px' }}><${Modes} list=${[['organ', 'Pipe organ'], ['guitar', 'Guitar'], ['pad', 'Bowed / pad'], ['bell', 'Bell / piano + pedal']]} mode=${pre} set=${pick} /></div>
      <${Slider} label="Attack" min=${0} max=${1.5} step=${.01} v=${A} set=${set(0)} out=${fx(A, 2) + ' s'} />
      <${Slider} label="Decay" min=${0} max=${1.5} step=${.01} v=${D} set=${set(1)} out=${fx(D, 2) + ' s'} />
      <${Slider} label="Sustain" min=${0} max=${1} step=${.01} v=${S} set=${set(2)} out=${Math.round(S * 100) + '%'} />
      <${Slider} label="Release" min=${0} max=${2} step=${.01} v=${R} set=${set(3)} out=${fx(R, 2) + ' s'} />
    <//>`;
  }

  /* ── [1.7] slides 12–14: subtract_synth.m, butter(1, 0.04) and butter(4, 0.04) on a 440 Hz sawtooth ── */
  function Butter({ ar }) {
    const [mode, setMode] = useState('o1'), [n, setN] = useState(2), [wn, setWn] = useState(.1);
    const y = useMemo(() => synth(440, 2, .9, 22050, 'saw').slice(0, 440), []);
    const ord = mode === 'o1' ? 1 : mode === 'o4' ? 4 : n, Wn = mode === 'own' ? wn : .04, raw = mode === 'raw';
    const yf = useMemo(() => raw ? null : Array.from(filt(butter(ord, Wn), y)), [ord, Wn, raw]);
    const hs = N(25, k => 1 / (k + 1)), hf = hs.map((a, k) => a * butterMag(ord, Wn, 440 * (k + 1), 22050));
    const X = f => 10 + f / 11025 * 300, fc = Wn * 11025;
    const g = f => fx(butterMag(ord, Wn, f, 22050), 3);
    const cap = raw ? { en: '<b>y = synth(440, 2, 0.9, 22050, \'saw\')</b>, then <b>plot(y(1:440))</b>: the raw sawtooth, harmonics at every multiple of 440 Hz up to the Nyquist frequency 11025 Hz. (The first 221 samples rise with synth.m\'s 10 ms edge ramp.)', ar: 'الأول بنعمل الـ sawtooth الخام وبنرسم أول 440 sample:' + L("y = synth(440, 2, 0.9, 22050, 'saw') ; plot(y(1:440))") + 'الـ harmonics عند كل مضاعف لـ <bdi>440 Hz</bdi> لحد الـ Nyquist frequency <bdi>11025 Hz</bdi>. (أول 221 sample طالعين مع الـ edge ramp بتاع synth.m اللي طوله <bdi>10 ms</bdi>.)' }
      : { en: `<b>[B, A] = butter(${ord}, ${Wn}, 'low'); yf = filter(B, A, y)</b>. The cut-off ${Wn} is relative to Nyquist: ${Wn} × 11025 = <b>${fmt(fc, 1)} Hz</b>. ${mode === 'o4' ? 'The <b>4th-order</b> filter removes much more of the high partials than the 1st-order one: almost only the 440 Hz fundamental is left.' : mode === 'o1' ? 'The <b>1st-order</b> filter falls gently, so higher partials are reduced but still there. Compare with butter(4, 0.04).' : 'Higher order = steeper fall above the cut-off.'}`,
        ar: `بنعمل الـ filter وبنطبقه:` + L(`[B, A] = butter(${ord}, ${Wn}, 'low') ; yf = filter(B, A, y)`) + `الـ cut-off نسبة من الـ Nyquist:` + L(`${Wn} × 11025 = ${fmt(fc, 1)} Hz`) + (mode === 'o4' ? 'الـ filter الـ <b>4th-order</b> بيشيل من الـ partials العالية أكتر بكتير من الـ 1st-order، وتقريبًا مفيش غير الـ fundamental بتاع <bdi>440 Hz</bdi>.' : mode === 'o1' ? 'الـ filter الـ <b>1st-order</b> بينزل بالراحة، فالـ partials العالية بتقل بس لسه موجودة. قارن بـ <bdi>butter(4, 0.04)</bdi>.' : 'كل ما الـ order يعلى، النزول بعد الـ cut-off بيبقى أحدّ.') };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['raw', 'Raw sawtooth'], ['o1', 'butter(1, 0.04)'], ['o4', 'butter(4, 0.04)'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div><${Slider} label="Order" min=${1} max=${8} v=${n} set=${setN} /><${Slider} label="Cut-off Wn" min=${.01} max=${.4} step=${.01} v=${wn} set=${setWn} out=${fx(wn, 2)} /></div>`}
      <${Lbl} l=${raw ? '<b>plot(y(1:440))</b>' : '<b>plot(yf(1:440))</b>, raw in grey'} r="samples 1 to 440" />
      <${Svg} h=${96}>${axis(48)}<path d=${line(Array.from(y), 4, 316, 6, 90, -.5, .5)} stroke=${raw ? 'var(--k-mm)' : 'var(--faint)'} strokeWidth="1.6" fill="none" />
        ${yf && html`<path d=${line(yf, 4, 316, 6, 90, -.5, .5)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" />`}<//>
      <${Lbl} l="<b>Partials</b> at 440 Hz × 1 … 25" r="0 to 11025 Hz" />
      <${Svg} h=${100}>${axis(80)}
        ${bars(hs.map((_, k) => X(440 * (k + 1))), hs, 6, 80, raw ? 'var(--k-mm)' : 'var(--faint)', 5, 'r')}
        ${!raw && bars(hs.map((_, k) => X(440 * (k + 1))), hf, 6, 80, 'var(--k-mm)', 5, 'f')}
        ${!raw && html`<path d=${fnp(f => butterMag(ord, Wn, f, 22050), 1, 11000, 160, X(1), X(11000), 6, 80, 0, 1)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" fill="none" />`}
        ${ticks([[0, '0'], [5000, '5 kHz'], [11025, '11 kHz']], X, 80)}<//>
      ${!raw && html`<${Calc} rows=${[`cut-off = ${Wn} × 11025 = <span class="mv5-res">${fmt(fc, 1)} Hz</span>`, `gain at 440 Hz = ${g(440)} · 880 Hz = ${g(880)}`, `gain at 2200 Hz = ${g(2200)} · 4400 Hz = ${g(4400)}`]} />`}
    <//>`;
  }

  /* ── [1.8] slides 15–19: how synth.m builds its sawtooth ── */
  function SynthSaw({ ar }) {
    const steps = [
      { en: '<b>T = (1/freq) × Fs</b> = 22050 / 440 = <b>50.11</b> samples per period (fractional). <b>ramp = (0:(N−1))/T</b> counts periods: it rises by 1 every 50.11 samples.', ar: 'الـ period بالـ samples (رقم كسري):' + L('T = (1/freq) × Fs = 22050 / 440 = 50.11') + 'وبعدين الـ ramp بيعدّ الـ periods وبيزيد 1 كل 50.11 sample:' + L('ramp = (0:(N−1)) / T') },
      { en: '<b>y = ramp − fix(ramp)</b>: fix() rounds towards zero, so only the fractional part is left: a sawtooth from 0 up to almost 1 that drops back after each period.', ar: 'الـ <b>fix()</b> بيقرّب ناحية الصفر، فلما نطرحه بيفضل الجزء الكسري بس: sawtooth من 0 لحد تقريبًا 1 وبيرجع ينزل بعد كل period.' + L('y = ramp − fix(ramp)') },
      { en: '<b>y = amp × y</b> with amp = 0.9, then <b>y = y − mean(y)</b> so it is centred on zero.', ar: 'بنضرب في الـ amplitude وبعدين نطرح المتوسط عشان الموجة تبقى حوالين الصفر:' + L('y = 0.9 × y ; y = y − mean(y)') },
      { en: '<b>Smooth edges with a 10 ms ramp</b>: L = 2 × fix(0.01 × 22050) + 1 = 441, and the first 221 samples are multiplied by a rising Bartlett ramp. Plotted, the first 100 samples have the <b>non-linear up slope</b> of slide 18.', ar: 'الـ <b>edges بتتنعّم بـ ramp طوله 10 ms</b>، وأول 221 sample بيتضربوا في Bartlett ramp طالع:' + L('L = 2 × fix(0.01 × 22050) + 1 = 441') + 'ولما نرسم أول 100 sample بيطلع الـ <b>non-linear up slope</b> اللي في slide 18.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const d = useMemo(() => { const T = 22050 / 440, ramp = N(101, k => k / T), fr = ramp.map(r => r - Math.trunc(r)); const full = synth(440, 2, .9, 22050, 'saw', false), fin = synth(440, 2, .9, 22050, 'saw'); return { ramp, fr, c: Array.from(full.slice(0, 101)), e: Array.from(fin.slice(0, 101)), mean: (.9 * fr[0]) - full[0] }; }, []);
    const cur = [d.ramp, d.fr, d.c, d.e][i], lo = i === 0 ? 0 : i === 1 ? 0 : -.5, hi = i === 0 ? 2 : i === 1 ? 1 : .5;
    const X = k => 14 + k * 3;
    const pv = k => fx(cur[k], i < 2 ? 3 : 4);
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Lbl} l=${'<b>' + ['ramp', 'ramp − fix(ramp)', '0.9 × y − mean(y)', 'after the 10 ms edge ramp'][i] + '</b>'} r="samples 0 to 100" />
      <${Svg} h=${150} label="The first 100 samples of synth.m's sawtooth">
        <path d=${`M14 ${sy(0, lo, hi, 8, 128)} H316`} stroke="var(--faint)" />
        ${i === 3 && html`<path d=${line(d.c, X(0), X(100), 8, 128, lo, hi)} stroke="var(--faint)" strokeWidth="1.6" fill="none" />`}
        <path d=${line(cur, X(0), X(100), 8, 128, lo, hi)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" />
        ${[50.11, 100.23].map((t, k) => html`<path key=${k} d=${`M${X(t)} 8 V128`} stroke="var(--pen)" strokeDasharray="3 4" opacity=${i === 0 ? 1 : .5} />`)}
        ${ticks([[0, '0'], [50, '50'], [100, '100']], X, 128)}<//>
      <${Calc} rows=${[`y(25) = ${pv(25)} · y(50) = ${pv(50)}`, `y(51) = ${pv(51)} · y(100) = ${pv(100)}`, i >= 2 ? `<span class="mv5-mut">mean(0.9 × y) over 2 s = ${fx(d.mean, 4)}</span>` : `<span class="mv5-mut">dashed: whole periods at 50.11 and 100.23</span>`]} />
    <//>`;
  }

  /* ── [2.1] each partial has its own amplitude envelope ── */
  function Partials({ ar }) {
    const ENV = [t => Math.min(1, t / .3) * (1 - .3 * t), t => Math.min(1, t / .03) * Math.exp(-t * 5), t => Math.max(0, Math.sin(Math.PI * clamp((t - .25) / .6, 0, 1)))];
    const steps = [
      { en: '<b>Partial 1</b> (the fundamental, f) has its own amplitude envelope: a slow rise, then a long sustain.', ar: 'الـ <b>Partial 1</b> (الـ fundamental يعني f) ليه amplitude envelope خاص بيه: طلوع بطيء وبعدين sustain طويل.' },
      { en: '<b>Partial 2</b> (2f) behaves independently: a sharp attack that dies away quickly.', ar: 'الـ <b>Partial 2</b> (يعني 2f) بيتصرف لوحده: attack حاد وبيموت بسرعة.' },
      { en: '<b>Partial 3</b> (3f) swells in later and fades again.', ar: 'الـ <b>Partial 3</b> (يعني 3f) بيعلى متأخر وبعدين يخفت تاني.' },
      { en: '<b>Additive synthesis</b>: the sum. Because every partial follows its own envelope, the mix of frequencies (the timbre) keeps changing during the note. The sources could also be other synthesis forms or samples.', ar: 'الـ <b>Additive synthesis</b>: المجموع. وبما إن كل partial ماشي على الـ envelope بتاعه، خليط الـ frequencies (الـ timbre) بيفضل يتغير طول النوتة. والمصادر ممكن تبقى كمان أنواع synthesis تانية أو samples.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const n = 900, part = k => N(n, j => { const t = j / n; return ENV[k](t) * Math.sin(2 * Math.PI * (k + 1) * 14 * t); });
    const P = useMemo(() => [0, 1, 2].map(part), []), sum = N(n, j => (P[0][j] + P[1][j] + P[2][j]) / 1.8);
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      ${['Partial 1 · f', 'Partial 2 · 2f', 'Partial 3 · 3f'].map((t, k) => html`<div key=${k} style=${{ opacity: i === k || i === 3 ? 1 : .35, transition: 'opacity .4s' }}>
        <${Lbl} l=${'<b>' + t + '</b>'} />
        <${Svg} h=${54}>${axis(27)}<path d=${line(P[k], 4, 316, 3, 51)} stroke=${i === k ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth="1.3" fill="none" /><path d=${fnp(ENV[k], 0, 1, 100, 4, 316, 3, 51, -1, 1)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" fill="none" /><//></div>`)}
      <div className=${pop(i === 3)}><${Lbl} l="<b>Sum</b> = additive synthesis" /><${Svg} h=${70}>${axis(35)}<path d=${line(sum, 4, 316, 3, 67)} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" /><//></div>
      <p className="mv5-note">dashed: each partial's amplitude envelope</p>
    <//>`;
  }

  /* ── [2.5] slide 23: approximating a 100 Hz square wave with odd harmonics ── */
  function Square({ ar }) {
    const KS = [1, 2, 3, 4, 5, 10, 25];
    const steps = KS.map(k => ({ en: '', ar: '' }));
    const [i, ctl] = useSteps(KS.length, 2000);
    const K = KS[i];
    const wave = t => 4 / Math.PI * N(K, j => Math.sin(2 * Math.PI * (2 * j + 1) * 100 * t) / (2 * j + 1)).reduce((s, v) => s + v, 0);
    const X = f => 10 + f / 2600 * 300;
    const list = N(Math.min(K, 4), j => `${(2 * j + 1) * 100} Hz × ${j ? '1/' + (2 * j + 1) : '1'}`).join(' + ') + (K > 4 ? ' + …' : '');
    const cap = { en: `Adding <b>${K}</b> odd harmonic${K > 1 ? 's' : ''} of 100 Hz (f, 3f, 5f, … with amplitudes 1, 1/3, 1/5, …): ${list}. ${K === 1 ? 'One sine is a poor square.' : K < 10 ? 'Each new sine makes the edges steeper and the top flatter.' : 'With many harmonics the sum is close to the square wave (the grey target).'} Fourier theory: a timbre analysed into sinusoids can be rebuilt by adding them.`,
      ar: `بنجمع <b>${K}</b> من الـ odd harmonics بتوع <bdi>100 Hz</bdi> (يعني f و 3f و 5f بـ amplitudes قدها 1 و 1/3 و 1/5):` + L(list) + (K === 1 ? 'موجة sine واحدة بعيدة عن الـ square.' : K < 10 ? 'كل sine جديدة بتخلي الحروف أحدّ والقمة أفلط.' : 'مع harmonics كتير المجموع بيقرب من الـ square wave (الهدف الرمادي).') + ' ودي الـ Fourier theory: الـ timbre اللي اتحلل لـ sinusoids ممكن يتبني تاني بجمعهم.' };
    return html`<${Fig} ar=${ar} cap=${cap} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Lbl} l=${`<b>Sum of ${K} sine${K > 1 ? 's' : ''}</b>`} r="20 ms (two periods)" />
      <${Svg} h=${110}>${axis(55)}<path d=${'M4 ' + sy(1, -1.3, 1.3, 6, 104) + ' H82 V' + sy(-1, -1.3, 1.3, 6, 104) + ' H160 V' + sy(1, -1.3, 1.3, 6, 104) + ' H238 V' + sy(-1, -1.3, 1.3, 6, 104) + ' H316'} stroke="var(--faint)" strokeWidth="2" fill="none" />
        <path d=${fnp(wave, 0, .02, 500, 4, 316, 6, 104, -1.3, 1.3)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" /><//>
      <${Lbl} l="<b>Spectrum</b>: 100, 300, 500, … Hz" r="0 to 2600 Hz" />
      <${Svg} h=${96}>${axis(76)}${bars(N(Math.min(K, 13), j => X((2 * j + 1) * 100)), N(Math.min(K, 13), j => 1 / (2 * j + 1)), 6, 76, 'var(--k-mm)', 7)}
        ${ticks([[0, '0'], [1000, '1000'], [2000, '2000 Hz']], X, 76)}<//>
    <//>`;
  }

  /* ── [2.5] slide 24: the Aphex Twin idea, paint a spectrogram and add up the sinusoids ── */
  const FACE = ['0000000000000000', '0000110000110000', '0000110000110000', '0000000000000000', '0010000000000100', '0001000000001000', '0000111111110000', '0000000000000000'];
  function Paint({ ar }) {
    const [g, setG] = useState(FACE.map(r => r.split('').map(c => c === '1')));
    const tog = (r, c) => setG(o => o.map((row, j) => j === r ? row.map((v, k) => k === c ? !v : v) : row));
    const S = 48, wave = [];
    for (let c = 0; c < 16; c++) for (let s = 0; s < S; s++) { const t = c * S + s; let v = 0; for (let r = 0; r < 8; r++) if (g[r][c]) v += Math.sin(2 * Math.PI * (8 - r) * 2 * t / S); wave.push(v); }
    const pk = Math.max(1, peak(wave)), lit = g.flat().filter(Boolean).length;
    const cap = { en: `Paint a <b>spectrogram</b>: each lit pixel is one sinusoid. Its <b>row</b> sets the frequency (higher row = higher frequency), its <b>column</b> sets when it sounds, its intensity sets the amplitude. Adding them (inverse Fourier, additive synthesis) gives the waveform below, whose spectrogram shows your picture: the Aphex Twin trick. ${lit} pixel${lit === 1 ? '' : 's'} lit.`,
      ar: `ارسم <b>spectrogram</b>: كل pixel منوّر هو sinusoid واحدة. الـ <b>row</b> بتاعه بيحدد الـ frequency (كل ما يعلى الـ frequency تعلى)، والـ <b>column</b> بيحدد إمتى تشتغل، وشدة اللون بتحدد الـ amplitude. لما نجمعهم (inverse Fourier يعني additive synthesis) بتطلع الـ waveform اللي تحت، واللي الـ spectrogram بتاعها بيورّي رسمتك: ودي فكرة الـ Aphex Twin. عدد الـ pixels المنوّرة <bdi>${lit}</bdi>.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Lbl} l="<b>Spectrogram</b>: tap pixels" r="↑ frequency · time →" />
      <div className="mv5-paint" role="group" aria-label="Spectrogram pixels">${g.map((row, r) => row.map((v, c) => html`<button key=${r + '-' + c} className=${v ? 'on' : ''} aria-label=${'row ' + (r + 1) + ' column ' + (c + 1)} aria-pressed=${String(v)} onClick=${() => tog(r, c)}></button>`))}</div>
      <div className="mv5-row"><button className="fig-btn" onClick=${() => setG(FACE.map(r => r.split('').map(c => c === '1')))}>Example</button><button className="fig-btn" onClick=${() => setG(N(8, () => N(16, () => false)))}>Clear</button></div>
      <${Lbl} l="<b>Waveform</b>: the sum of all lit sinusoids" />
      <${Svg} h=${80}>${axis(40)}<path d=${line(wave, 4, 316, 4, 76, -pk, pk)} stroke="var(--k-mm)" strokeWidth="1.2" fill="none" /><//>
    <//>`;
  }

  /* ── [3.3] slide 29: basic FM, e = A sin(αt + I sin βt) ── */
  function FmBasic({ ar }) {
    const [a, setA] = useState(8), [b, setB] = useState(1), [I, setI] = useState(4);
    const mod = t => Math.sin(2 * Math.PI * b * t), car = t => Math.sin(2 * Math.PI * a * t), e = t => Math.sin(2 * Math.PI * a * t + I * Math.sin(2 * Math.PI * b * t));
    const dev = I * b;
    const cap = { en: `<b>Modulator</b> (β = ${b} Hz) bends the frequency of the <b>carrier</b> (α = ${a} Hz). I is the modulation index, peak deviation ÷ modulator frequency, so the peak deviation is I × β = ${fmt(I, 1)} × ${b} = <b>${fmt(dev, 1)} Hz</b>: the carrier swings between ${fmt(Math.max(0, a - dev), 1)} and ${fmt(a + dev, 1)} Hz. A is the peak amplitude, e the instantaneous amplitude. Oscillator = device generating waveforms.`,
      ar: `الـ <b>Modulator</b> (<bdi>β = ${b} Hz</bdi>) بيلوي الـ frequency بتاعة الـ <b>carrier</b> (<bdi>α = ${a} Hz</bdi>). الـ I هو الـ modulation index، يعني الـ peak deviation على الـ modulator frequency، فالـ peak deviation بيطلع:` + L(`I × β = ${fmt(I, 1)} × ${b} = ${fmt(dev, 1)} Hz`) + `يعني الـ carrier بتتمرجح بين <bdi>${fmt(Math.max(0, a - dev), 1)}</bdi> و <bdi>${fmt(a + dev, 1)} Hz</bdi>. الـ A هو الـ peak amplitude والـ e هو الـ instantaneous amplitude. والـ Oscillator جهاز بيطلّع waveforms.` };
    const P = (f, lbl, col) => html`<${Lbl} l=${lbl} /><${Svg} h=${56}>${axis(28)}<path d=${fnp(f, 0, 2, 600, 4, 316, 3, 53)} stroke=${col} strokeWidth="1.6" fill="none" /><//>`;
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Slider} label="Carrier α" min=${2} max=${16} v=${a} set=${setA} out=${a + ' Hz'} />
      <${Slider} label="Modulator β" min=${.5} max=${4} step=${.5} v=${b} set=${setB} out=${b + ' Hz'} />
      <${Slider} label="Index I" min=${0} max=${10} step=${.5} v=${I} set=${setI} out=${fx(I, 1)} />
      ${P(mod, '<b>Modulator</b>: sin βt', 'var(--graphite)')}
      ${P(car, '<b>Carrier</b>: sin αt', 'var(--graphite)')}
      ${P(e, '<b>e = A sin(αt + I sin βt)</b>', 'var(--k-mm)')}
      <div className="mv5-lbl"><span>t = 0</span><span>2 s</span></div>
    <//>`;
  }

  /* ── [3.5] slides 31–34: Bessel functions J0…J4 and the sidebands they set ── */
  const JCOL = ['var(--k-mm)', 'var(--pen)', 'var(--ok)', 'var(--graphite)', 'var(--ink)'], JDASH = ['', '6 4', '2 3', '8 3 2 3', '1 5'];
  function Bessel({ ar }) {
    const [I, setI] = useState(1);
    const curves = useMemo(() => N(5, n => N(201, k => besselJ(n, k / 10))), []);
    const Jn = N(9, n => besselJ(n, I)), X = z => 10 + z / 20 * 300;
    const sig = N(9, n => Math.abs(Jn[n]) > .01 ? n : 0).reduce((m, v) => Math.max(m, v), 0);
    const bx = n => 160 + n * 16.5;
    const cap = { en: I === 0 ? '<b>I = 0</b>: no modulation, only the carrier (J0(0) = 1).' : `<b>I = ${fx(I, 1)}</b>: J0(I) = ${fx(Jn[0], 3)} sets the <b>carrier</b> amplitude, Jn(I) the <b>n-th upper and lower sidebands</b> at α ± nβ. Sidebands above 1% reach n = ${sig}: the bandwidth grows with I, and higher-order sidebands only gain energy when I is large.${I > 1 ? ' Since I > 1, energy is increasingly stolen from the carrier.' : ''}${Math.abs(Jn[0]) < .03 ? ' Here the carrier almost vanishes.' : ''} As I increases the sideband energies vary like a damped sinusoid.`,
      ar: I === 0 ? 'لما <bdi>I = 0</bdi> مفيش modulation، الـ carrier بس <bdi>(J0(0) = 1)</bdi>.' : `عند <bdi>I = ${fx(I, 1)}</bdi> الـ J0 بيحدد amplitude الـ <b>carrier</b>، والـ Jn بيحدد <b>الـ sidebands رقم n فوق وتحت</b> عند <bdi>α ± nβ</bdi>:` + L(`J0(${fx(I, 1)}) = ${fx(Jn[0], 3)}`) + `الـ sidebands اللي فوق 1% بتوصل لحد <bdi>n = ${sig}</bdi>: الـ bandwidth بتكبر مع الـ I، والـ sidebands العالية مبتاخدش طاقة غير لما I تبقى كبيرة.${I > 1 ? ' وبما إن I أكبر من 1، الطاقة بتتسرق من الـ carrier أكتر وأكتر.' : ''}${Math.abs(Jn[0]) < .03 ? ' وهنا الـ carrier تقريبًا اختفت.' : ''} ولما I تزيد، طاقة الـ sidebands بتتغير زي damped sinusoid.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[0, 1, 2, 3, 4].map(v => [v, 'I = ' + v])} mode=${I} set=${setI} />
      <${Slider} label="Index I" min=${0} max=${20} step=${.1} v=${I} set=${setI} out=${fx(I, 1)} />
      <${Lbl} l="<b>J0 … J4</b> against the modulation index" r="I = 0 to 20" />
      <${Svg} h=${140} label="Bessel functions J0 to J4 for I from 0 to 20">
        <path d=${`M10 ${sy(0, -.5, 1, 6, 118)} H310`} stroke="var(--faint)" />
        ${curves.map((c, n) => html`<path key=${n} d=${line(c, 10, 310, 6, 118, -.5, 1)} stroke=${JCOL[n]} strokeWidth=${n ? 1.8 : 2.6} strokeDasharray=${JDASH[n]} fill="none" />`)}
        <path d=${`M${X(I)} 6 V118`} stroke="var(--k-mm)" strokeWidth="2" />
        ${ticks([[0, '0'], [5, '5'], [10, '10'], [15, '15'], [20, '20']], X, 118)}<//>
      <div className="mv5-leg">${JCOL.map((c, n) => html`<span key=${n}><i style=${{ background: c }}></i>J${n} = ${fx(Jn[n], 2)}</span>`)}</div>
      <${Lbl} l="<b>Spectrum</b>: |Jn(I)| at α + nβ" r="n = −8 … +8" />
      <${Svg} h=${100}>${axis(76)}${bars(N(17, k => bx(k - 8)), N(17, k => Math.abs(Jn[Math.abs(k - 8)])), 6, 76, k => k === 8 ? 'var(--k-mm)' : 'var(--pen)', 8)}
        ${[[-8, 'α−8β'], [0, 'α'], [8, 'α+8β']].map(([n, t]) => html`<text key=${n} x=${bx(n)} y="94" textAnchor="middle" fontSize="15" style=${{ fill: 'var(--graphite)' }}>${t}</text>`)}<//>
    <//>`;
  }

  /* ── [3.6] slides 35–36: FM algorithms (operator routings) ── */
  function FmAlgo({ ar }) {
    const [m, setM] = useState('car');
    const mv = !calm();
    const op = (x, y, t, on) => html`<g><rect x=${x - 44} y=${y - 17} width="88" height="34" rx="6" fill="var(--paper)" stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth="2.5" /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="15" fontWeight="600">${t}</text></g>`;
    const ar_ = (d, k) => html`<path key=${k} d=${d} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" markerEnd="url(#mv5-fa)" className=${mv ? 'flow' : ''} />`;
    const out = useMemo(() => {
      if (m === 'car') return N(801, k => { const t = k / 400, md = 3 * Math.sin(2 * Math.PI * t); return (Math.sin(2 * Math.PI * 5 * t + md) + Math.sin(2 * Math.PI * 8 * t + md)) / 2; });
      if (m === 'mod') return N(801, k => { const t = k / 400; return Math.sin(2 * Math.PI * 6 * t + 2 * Math.sin(2 * Math.PI * t) + 2 * Math.sin(2 * Math.PI * 1.5 * t)); });
      let y = 0; return N(801, k => { y = Math.sin(2 * Math.PI * 6 * k / 400 + 1.2 * y); return y; });
    }, [m]);
    const cap = m === 'car' ? { en: '<b>Multiple carriers</b>: one oscillator (Operator 3) simultaneously modulates two or more carriers (Operators 1 and 2). In FM terminology <b>operators</b> are just oscillators; FM synths have 4 or 6, because one modulator and one carrier are not complex enough. <b>Algorithms</b> are the preset routings.', ar: 'الـ <b>Multiple carriers</b> معناها إن oscillator واحد (Operator 3) بيعمل modulation لـ اتنين carriers أو أكتر في نفس الوقت (Operators 1 و 2). في لغة الـ FM الـ <b>operators</b> هي الـ oscillators، والـ FM synths فيها 4 أو 6 لأن modulator واحد و carrier واحد مش معقدين كفاية. والـ <b>Algorithms</b> هي التوصيلات الجاهزة (preset routings).' }
      : m === 'mod' ? { en: '<b>Multiple modulators</b>: two or more oscillators (Operators 2 and 3) simultaneously modulate a single carrier (Operator 1).', ar: 'الـ <b>Multiple modulators</b>: اتنين oscillators أو أكتر (Operators 2 و 3) بيعملوا modulation لـ carrier واحد (Operator 1) في نفس الوقت.' }
      : { en: '<b>Feedback</b>: the output of an oscillator modulates the same oscillator.', ar: 'الـ <b>Feedback</b>: الـ output بتاع الـ oscillator بيعمل modulation لنفس الـ oscillator.' };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['car', 'Multiple carriers'], ['mod', 'Multiple modulators'], ['fb', 'Feedback']]} mode=${m} set=${setM} />
      <${Svg} h=${170} label="Operator routing">
        <defs><marker id="mv5-fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--k-mm)" /></marker></defs>
        ${m === 'car' && html`<g>${op(160, 24, 'Operator 3', 1)}${op(90, 92, 'Operator 1')}${op(230, 92, 'Operator 2')}${ar_('M150 42 L100 73', 1)}${ar_('M170 42 L220 73', 2)}${ar_('M90 110 L150 146', 3)}${ar_('M230 110 L170 146', 4)}<text x="160" y="164" textAnchor="middle" fontSize="15">output</text></g>`}
        ${m === 'mod' && html`<g>${op(90, 24, 'Operator 2', 1)}${op(230, 24, 'Operator 3', 1)}${op(160, 92, 'Operator 1')}${ar_('M100 42 L150 73', 1)}${ar_('M220 42 L170 73', 2)}${ar_('M160 110 V146', 3)}<text x="160" y="164" textAnchor="middle" fontSize="15">output</text></g>`}
        ${m === 'fb' && html`<g>${op(160, 70, 'Operator 1', 1)}${ar_('M160 88 V140', 1)}${ar_('M204 70 H262 V20 H160 V50', 2)}<text x="160" y="160" textAnchor="middle" fontSize="15">output</text><text x="268" y="50" fontSize="15">feedback</text></g>`}<//>
      <${Lbl} l="<b>Output</b> (example settings)" r="0 to 2 s" />
      <${Svg} h=${70}>${axis(35)}<path d=${line(out, 4, 316, 3, 67)} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" /><//>
    <//>`;
  }

  /* ── [4.0–4.3] slide 30: fm_eg.m, fc = 440 Hz, fm = 30 Hz, I rising 0 → 20 over 2 s ── */
  function FmEg({ ar }) {
    const [mode, setMode] = useState('ex'), [fc, setFc] = useState(440), [fm, setFm] = useState(30), [im, setIm] = useState(20);
    const [t, setT] = useState(1), [play, setPlay] = useState(false);
    const ex = mode === 'ex', C = ex ? 440 : fc, M = ex ? 30 : fm, IM = ex ? 20 : im;
    const at = useAnim(play);
    useEffect(() => { if (play) { const v = Math.min(2, at * .5); setT(Math.round(v * 20) / 20); if (v >= 2) setPlay(false); } }, [at]);
    const I = t * IM / 2, nmax = Math.ceil(IM + 4), J = N(nmax + 1, n => besselJ(n, I));
    const lo = Math.max(0, C - (nmax + 1) * M), hi = C + (nmax + 1) * M, X = f => 10 + (f - lo) / (hi - lo) * 300;
    const items = []; for (let n = -nmax; n <= nmax; n++) { const f = C + n * M; if (f >= 0) items.push([f, Math.abs(J[Math.abs(n)]), n]); }
    const win = N(301, k => { const tt = t + k / 300 / M, Ii = tt * IM / 2; return Math.sin(2 * Math.PI * C * tt + Ii * Math.sin(2 * Math.PI * M * tt)); });
    const cap = { en: `I = t × (Imax − Imin)/dur + Imin, so at <b>t = ${fx(t, 2)} s</b>, <b>I = ${fx(I, 1)}</b>. Sidebands at fc ± n·fm: n = 1 → ${C - M} and ${C + M} Hz (J1), n = 2 → ${C - 2 * M} and ${C + 2 * M} Hz (J2), n = 3 → ${C - 3 * M} and ${C + 3 * M} Hz (J3). As I grows during the note more sidebands gain energy, so the sound gets brighter and more complex. Press Play to let I rise.`,
      ar: `الـ I بيزيد مع الوقت حسب الكود، فعند <bdi>t = ${fx(t, 2)} s</bdi> بيبقى <bdi>I = ${fx(I, 1)}</bdi>:` + L(`I = t × (Imax − Imin)/dur + Imin`) + `والـ sidebands عند <bdi>fc ± n·fm</bdi>:` + L(`n = 1 → ${C - M}, ${C + M} Hz (J1)<br>n = 2 → ${C - 2 * M}, ${C + 2 * M} Hz (J2)<br>n = 3 → ${C - 3 * M}, ${C + 3 * M} Hz (J3)`) + 'وكل ما I تكبر خلال النوتة، sidebands أكتر بتاخد طاقة، فالصوت بيبقى أسطع وأعقد. دوس Play وسيب I تطلع.' };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} mode=${mode} set=${m => { setMode(m); setPlay(false); }} />
      ${!ex && html`<div><${Slider} label="Carrier fc" min=${200} max=${1000} step=${10} v=${fc} set=${setFc} out=${fc + ' Hz'} /><${Slider} label="Modulator fm" min=${10} max=${200} step=${5} v=${fm} set=${setFm} out=${fm + ' Hz'} /><${Slider} label="Imax" min=${1} max=${20} v=${im} set=${setIm} /></div>`}
      <${Slider} label="Time t" min=${0} max=${2} step=${.05} v=${t} set=${v => { setPlay(false); setT(v); }} out=${fx(t, 2) + ' s'} />
      <div className="mv5-row"><button className="fig-btn solid" onClick=${() => { setT(0); setPlay(true); }}>▶ Play 0 → 2 s</button></div>
      <${Lbl} l=${`<b>Spectrum</b> at I = ${fx(I, 1)}`} r=${`${Math.round(lo)} to ${Math.round(hi)} Hz`} />
      <${Svg} h=${100}>${axis(76)}${bars(items.map(([f]) => X(f)), items.map(([, a]) => a), 6, 76, k => items[k][2] === 0 ? 'var(--k-mm)' : Math.abs(items[k][2]) <= 3 ? 'var(--pen)' : 'var(--graphite)', 4)}
        ${ticks([[lo, String(Math.round(lo))], [C, String(C)], [hi, String(Math.round(hi))]], X, 76)}<//>
      <table className="mv5-tbl"><thead><tr><th>n</th><th>fc − n·fm</th><th>fc + n·fm</th><th>|Jn(I)|</th></tr></thead><tbody>
        ${[0, 1, 2, 3].map(n => html`<tr key=${n} className=${n ? '' : 'on'}><td>${n}</td><td>${C - n * M}</td><td>${C + n * M}</td><td>${fx(Math.abs(J[n]), 3)}</td></tr>`)}</tbody></table>
      <${Lbl} l=${`<b>Waveform</b> from t = ${fx(t, 2)} s`} r="one modulator period" />
      <${Svg} h=${70}>${axis(35)}<path d=${line(win, 4, 316, 3, 67)} stroke="var(--k-mm)" strokeWidth="1.3" fill="none" /><//>
    <//>`;
  }

  /* ── [4.4] harmonic (1:1) versus inharmonic (non-integer ratio) FM ── */
  function FmRatio({ ar }) {
    const [mode, setMode] = useState('h'), [fc, setFc] = useState(200), [fm, setFm] = useState(150);
    const C = mode === 'own' ? fc : 200, M = mode === 'h' ? 200 : mode === 'i' ? 141 : fm;
    const sb = []; for (let n = 1; n <= 4; n++) for (const s of [-1, 1]) { const f = C + s * n * M; if (f >= 0 && f <= 1000) sb.push([f, n]); }
    const r = M / C, g = (a, b) => b ? g(b, a % b) : a, G = g(C, M), harm = G >= Math.min(C, M) / 4;
    const X = f => 10 + f / 1000 * 300;
    const listS = sb.map(([f]) => f).sort((a, b) => a - b).join(', ');
    const cap = harm ? { en: `fc = ${C}, fm = ${M} (ratio ${fmt(r, 3)}): fc ± n·fm = ${listS} Hz … all multiples of <b>${G} Hz</b> (the grey grid), so the sound is <b>harmonic</b>: the modulator has a harmonic relationship to the carrier.`, ar: 'الـ sidebands كلها مضاعفات لـ <bdi>' + G + ' Hz</bdi> (الخطوط الرمادية)، فالصوت <b>harmonic</b>: الـ modulator ليه علاقة harmonic بالـ carrier.' + L(`fc = ${C}, fm = ${M} → ${listS} Hz`) }
      : { en: `fc = ${C}, fm = ${M} (non-integer ratio ${fmt(r, 3)}): fc ± n·fm = ${listS} Hz … are not multiples of a common fundamental, so the sound is <b>inharmonic</b>: bell-like, dissonant, percussive ("clang", "bong").`, ar: 'الـ sidebands مش مضاعفات لـ fundamental مشترك (النسبة مش رقم صحيح)، فالصوت <b>inharmonic</b>: شبه الجرس، نشاز و percussive ("clang" و "bong").' + L(`fc = ${C}, fm = ${M} → ${listS} Hz`) };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['h', 'fm = 200 (1:1)'], ['i', 'fm = 141'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div><${Slider} label="Carrier fc" min=${100} max=${400} v=${fc} set=${setFc} out=${fc + ' Hz'} /><${Slider} label="Modulator fm" min=${20} max=${400} v=${fm} set=${setFm} out=${fm + ' Hz'} /></div>`}
      <${Lbl} l="<b>Carrier and sidebands</b>, n = 1 to 4" r="0 to 1000 Hz" />
      <${Svg} h=${110}>
        ${harm && N(Math.floor(1000 / G) + 1, k => G * k).filter(f => f <= 1000 && 1000 / G <= 60).map(f => html`<path key=${'g' + f} d=${`M${X(f)} 8 V84`} stroke="var(--faint)" strokeDasharray="3 3" />`)}
        ${axis(84)}
        <path d=${`M${X(C)} 84 V10`} stroke="var(--k-mm)" strokeWidth="6" />
        ${sb.map(([f, n], k) => html`<path key=${k} d=${`M${X(f)} 84 V${10 + n * 14}`} stroke=${harm ? 'var(--ok)' : 'var(--pen)'} strokeWidth="5" />`)}
        ${ticks([[0, '0'], [200, '200'], [400, '400'], [600, '600'], [800, '800'], [1000, '1000']], X, 84)}<//>
      <div className="mv5-leg"><span><i style=${{ background: 'var(--k-mm)' }}></i>carrier ${C} Hz</span><span><i style=${{ background: harm ? 'var(--ok)' : 'var(--pen)' }}></i>sidebands (shorter = higher n)</span></div>
    <//>`;
  }

  /* ── [5.3] slides 42–44: looping, finding loop points ── */
  function Loop({ ar }) {
    const [mode, setMode] = useState('sus'), [s, setS] = useState(160), [e, setE] = useState(330);
    const P = 37;
    const sig = useMemo(() => { const r = rng(3); return {
      drum: N(600, k => { const h = k % 150; return h < 120 ? (2 * r() - 1) * Math.exp(-h / 22) * (k < 150 || (k >= 300 && k < 450) ? 1 : .6) : 0; }),
      sus: N(600, k => (k < 90 ? (2 * r() - 1) * .8 * Math.exp(-k / 25) : 0) + Math.min(1, k / 40) * (.55 * Math.sin(2 * Math.PI * k / P) + .3 * Math.sin(4 * Math.PI * k / P + 1)))
    }; }, []);
    const y = sig[mode];
    const setM = m => { setMode(m); setS(160); setE(330); };
    const snapZero = () => { if (mode === 'drum') { const h = v => clamp(Math.round(v / 150) * 150 - 10, 140, 590); const a = Math.min(h(s), 440), z = h(e) > a ? h(e) : a + 150; setS(a); setE(z); return; } const zc = []; for (let k = 100; k < 600; k++) if (y[k - 1] < 0 && y[k] >= 0) zc.push(k); const near = v => zc.reduce((b, k) => Math.abs(k - v) < Math.abs(b - v) ? k : b, zc[0]); const a = near(s); let z = near(e); if (z <= a) z = zc.find(k => k > a) || 600; setS(a); setE(z); };
    const snapPat = () => { const n = Math.max(1, Math.round((e - s) / P)); setE(Math.min(s + n * P, s + Math.floor((600 - s) / P) * P)); };
    const len = e - s, out = y.slice(0, s).concat(y.slice(s, e), y.slice(s, e), y.slice(s, e));
    const jump = Math.abs(y[s] - (e < 600 ? y[e] : 0)), click = jump > .12, tot = out.length;
    const cap = mode === 'drum' ? { en: `Samples were kept short (memory was expensive) and part of the sample is <b>looped</b>. Simple idea: find <b>silence points</b> (zero amplitude crossings), e.g. between drum beats, and loop between these. Loop ${s} → ${e}: the jump at each seam is <b>${fx(jump, 2)}</b>${click ? ', a click.' : ', clean.'} Press "Snap to silence".`, ar: `زمان الـ samples كانت قصيرة (الـ memory كانت غالية) وجزء منها بيتعمله <b>loop</b>. الفكرة البسيطة: دوّر على <b>نقط السكوت</b> (الـ zero amplitude crossings) زي اللي بين ضربات الـ drums، واعمل loop بينها. الـ loop من <bdi>${s}</bdi> لـ <bdi>${e}</bdi> والقفزة عند كل لحام <bdi>${fx(jump, 2)}</bdi>${click ? '، يعني click.' : '، يعني نضيف.'} دوس "Snap to silence".` }
      : { en: `A <b>sustaining instrument</b>: after the attack, part of the sustain is <b>looped</b> to save memory. Loop ${s} → ${e} (${len} samples): the jump at each seam is <b>${fx(jump, 2)}</b>${click ? ': a click.' : ': clean.'} Snap to <b>zero crossings</b>, or use <b>pattern matching</b> (find portions with the same audio content: here a whole number of ${P}-sample periods).`, ar: `آلة <b>sustaining</b>: بعد الـ attack، جزء من الـ sustain بيتعمله <b>loop</b> عشان نوفر memory. الـ loop من <bdi>${s}</bdi> لـ <bdi>${e}</bdi> (<bdi>${len}</bdi> sample) والقفزة عند كل لحام <bdi>${fx(jump, 2)}</bdi>${click ? '، يعني click.' : '، يعني نضيف.'} اعمل snap على الـ <b>zero crossings</b> أو استخدم <b>pattern matching</b> (دوّر على أجزاء فيها نفس المحتوى الصوتي: هنا عدد صحيح من الـ periods، كل period <bdi>${P}</bdi> sample).` };
    const Xo = k => 4 + k / Math.max(tot, 600) * 312;
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['sus', 'Sustaining instrument'], ['drum', 'Drum beats']]} mode=${mode} set=${setM} />
      <${Lbl} l="<b>Sample</b> with the loop region" r="600 samples" />
      <${Svg} h=${80}><rect x=${4 + s / 600 * 312} y="2" width=${(e - s) / 600 * 312} height="76" fill="color-mix(in srgb, var(--k-mm) 18%, transparent)" />${axis(40)}<path d=${line(y, 4, 316, 4, 76, -1.2, 1.2)} stroke="var(--graphite)" strokeWidth="1.3" fill="none" /><//>
      <${Slider} label="Loop start" min=${100} max=${560} v=${s} set=${v => { setS(v); if (e <= v) setE(Math.min(600, v + 20)); }} />
      <${Slider} label="Loop end" min=${120} max=${600} v=${e} set=${v => setE(Math.max(s + 10, v))} />
      <div className="mv5-row"><button className="fig-btn solid" onClick=${snapZero}>${mode === 'drum' ? 'Snap to silence' : 'Snap to zero crossings'}</button>${mode === 'sus' && html`<button className="fig-btn" onClick=${snapPat}>Pattern match</button>`}</div>
      <${Lbl} l="<b>Playback</b>: attack, then the loop three times" r=${click ? '<span style="color:var(--pen)">click at the seams</span>' : 'smooth seams'} />
      <${Svg} h=${80}>${axis(40)}<path d=${line(out, Xo(0), Xo(tot - 1), 4, 76, -1.2, 1.2)} stroke="var(--k-mm)" strokeWidth="1.3" fill="none" />
        ${[1, 2].map(j => html`<path key=${j} d=${`M${Xo(s + j * len)} 2 V78`} stroke=${click ? 'var(--pen)' : 'var(--ok)'} strokeWidth="2" strokeDasharray="4 3" />`)}<//>
    <//>`;
  }

  // a two-octave keyboard (25 keys) drawn in SVG; over(k) → [colour, opacity]
  const WHITE = [0, 2, 4, 5, 7, 9, 11];
  function Keys({ over, onKey, sel, top = 0, children }) {
    const wk = [], bk = []; let w = 0;
    for (let k = 0; k < 25; k++) { if (WHITE.includes(k % 12)) { wk.push([k, w]); w++; } else bk.push([k, w]); }
    const KW = 320 / 15, x = (k, wi, black) => black ? wi * KW - 7 : wi * KW;
    const key = (k, wi, black) => { const [c, o] = over(k); const X0 = x(k, wi, black), wd = black ? 14 : KW - 1, h = black ? 56 : 90;
      return html`<g key=${k} onClick=${() => onKey(k)} style=${{ cursor: 'pointer' }} role="button" aria-label=${'key ' + (k + 1)}>
        <rect x=${X0} y=${top} width=${wd} height=${h} rx="2" fill=${black ? '#1f2024' : '#f7f7f5'} stroke="#6b6f76" strokeWidth="1" />
        ${c && html`<rect x=${X0 + 1} y=${top + 1} width=${wd - 2} height=${h - 2} rx="2" fill=${c} opacity=${o} />`}
        ${sel === k && html`<rect x=${X0 + 1.5} y=${top + 1.5} width=${wd - 3} height=${h - 3} rx="2" fill="none" stroke="var(--pen)" strokeWidth="3" />`}</g>`; };
    return html`<${Svg} h=${top + 92} label="Keyboard">${wk.map(([k, wi]) => key(k, wi, false))}${bk.map(([k, wi]) => key(k, wi, true))}${children}<//>`;
  }
  const keyX = k => { let w = 0; for (let j = 0; j < k; j++) if (WHITE.includes(j % 12)) w++; return WHITE.includes(k % 12) ? (w + .5) * 320 / 15 : w * 320 / 15; };

  /* ── [5.5] slides 45, 58–59: pitch control and multisampling ── */
  function Multi({ ar }) {
    const [mode, setMode] = useState('split'), [sel, setSel] = useState(9);
    const roots = mode === 'one' ? [12] : mode === 'split' ? [2, 7, 12, 17, 22] : N(25, k => k);
    const root = k => roots.reduce((b, r) => Math.abs(r - k) < Math.abs(b - k) ? r : b, roots[0]);
    const drum = mode === 'drum';
    const over = k => drum ? [k < 10 ? (k % 2 ? 'var(--pen)' : 'var(--k-mm)') : null, .45] : [Math.abs(k - root(k)) === 0 ? 'var(--k-mm)' : 'var(--pen)', Math.abs(k - root(k)) === 0 ? .7 : Math.min(.65, .12 * Math.abs(k - root(k)))];
    const r = root(sel), sh = sel - r, idx = roots.indexOf(r) + 1;
    const cap = drum ? { en: `<b>Drum mapping</b>, the non-pitched example: each key triggers a different drum sound, so key ${sel + 1} ${sel < 10 ? 'plays drum sample ' + (sel + 1) + ', unshifted' : 'has no sample here'}. No speed change is needed.`, ar: `الـ <b>Drum mapping</b> هو المثال اللي من غير pitch: كل key بتشغّل صوت drum مختلف${sel < 10 ? '، فالـ key رقم <bdi>' + (sel + 1) + '</bdi> بتشغّل drum sample رقم <bdi>' + (sel + 1) + '</bdi> من غير shift' : '، والـ key دي ملهاش sample هنا'}. مش محتاجين نغيّر السرعة.` }
      : { en: `Key ${sel + 1} plays sample ${mode === 'every' ? sel + 1 : idx} (recorded at key ${r + 1})${sh ? `, sped ${sh > 0 ? 'up' : 'down'} by <b>${Math.abs(sh)} semitone${Math.abs(sh) > 1 ? 's' : ''}</b>` : ', at its own speed'}. Speeding up or slowing a sample changes its pitch but is realistic only over a few semitones (darker red = further). ${mode === 'one' ? 'One sample for the whole keyboard stretches it too far.' : mode === 'split' ? '<b>Multisampling</b>: the instrument is sampled at regular intervals, each sample covering a region of adjacent notes (a split).' : 'Sampling every note: the most natural progression from the low to the high registers.'}`,
        ar: `الـ key رقم <bdi>${sel + 1}</bdi> بتشغّل sample رقم <bdi>${mode === 'every' ? sel + 1 : idx}</bdi> (متسجّلة عند key رقم <bdi>${r + 1}</bdi>)${sh ? `، ومتسرّعة ${sh > 0 ? 'لفوق' : 'لتحت'} بمقدار <b><bdi>${Math.abs(sh)}</bdi> semitone</b>` : '، بسرعتها الأصلية'}. لما نسرّع أو نبطّأ الـ sample الـ pitch بيتغير، بس ده واقعي لكام semitone بس (الأحمر الأغمق يعني أبعد). ${mode === 'one' ? 'الـ sample الواحدة للكيبورد كله بتتمط زيادة عن اللزوم.' : mode === 'split' ? 'ده الـ <b>Multisampling</b>: الآلة بتتسجل على مسافات منتظمة، وكل sample بتغطي منطقة من النوتات اللي جنب بعض (split).' : 'لما نسجل كل نوتة بنوصل لأطبع انتقال من الـ registers الواطية للعالية.'}` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['one', 'One sample'], ['split', 'Splits'], ['every', 'Every note'], ['drum', 'Drum map']]} mode=${mode} set=${setMode} />
      <${Keys} over=${over} onKey=${setSel} sel=${sel} top=${28}>
        ${mode === 'split' && [[0, 4], [5, 9], [10, 14], [15, 19], [20, 24]].map(([a, z], j) => html`<g key=${j}><path d=${`M${keyX(a) - 6} 24 V16 H${keyX(z) + 6} V24`} stroke="var(--k-mm)" strokeWidth="2" fill="none" /><text x=${keyX(roots[j])} y="13" textAnchor="middle" fontSize="15" fontWeight="700">${j + 1}</text></g>`)}
        ${mode === 'one' && html`<text x=${keyX(12)} y="18" textAnchor="middle" fontSize="15" fontWeight="700">sample</text>`}
      <//>
      <p className="mv5-note">Tap a key.</p>
    <//>`;
  }

  /* ── [5.6] slides 60–64: velocity layers and the key map ── */
  const VZ = {
    one: [[0, 11, 1, 127, 'sound 1']],
    two: [[0, 11, 1, 63, 'sound 1'], [0, 11, 64, 127, 'sound 2']],
    three: [[0, 11, 1, 42, 'sound 1'], [0, 11, 43, 85, 'sound 2'], [0, 11, 86, 127, 'sound 3']],
    map: [[0, 3, 1, 63, 'S1 soft'], [0, 3, 64, 127, 'S1 hard'], [4, 7, 1, 63, 'S2 soft'], [4, 7, 64, 127, 'S2 hard'], [8, 11, 1, 63, 'S3 soft'], [8, 11, 64, 127, 'S3 hard']]
  };
  function Velocity({ ar }) {
    const [mode, setMode] = useState('two'), [k, setK] = useState(9), [v, setV] = useState(100);
    const ref = useRef(null);
    const X = c => 10 + c * 25, Y = vel => 130 - (vel - 1) / 126 * 120;
    const tap = ev => { const r = ref.current.getBoundingClientRect(), sx = (ev.clientX - r.left) / r.width * 320, sy2 = (ev.clientY - r.top) / r.height * 150; setK(clamp(Math.floor((sx - 10) / 25), 0, 11)); setV(clamp(Math.round(1 + (130 - sy2) / 120 * 126), 1, 127)); };
    const Z = VZ[mode], z = Z.find(q => k >= q[0] && k <= q[1] && v >= q[2] && v <= q[3]);
    const cols = ['var(--k-mm)', 'var(--pen)', 'var(--ok)'];
    const zc = (q, j) => mode === 'map' ? cols[Math.floor(j / 2)] : cols[j];
    const cap = mode === 'one' ? { en: `<b>Single velocity layer</b>: only one type of sound is played at any velocity. Velocity ${v} changes only the volume (${v}/127), not the timbre.`, ar: `الـ <b>Single velocity layer</b>: نوع صوت واحد بس بيشتغل مع أي velocity. الـ velocity <bdi>${v}</bdi> بتغيّر العلو بس (<bdi>${v}/127</bdi>) مش الـ timbre.` }
      : mode === 'map' ? { en: `<b>Key map + velocity layers</b>: most instruments combine both. Multisamples are laid out <b>vertically</b> (each covers a column of keys), velocity layers <b>horizontally</b>. Key ${k + 1} at velocity ${v} → <b>${z[4]}</b>.`, ar: `الـ <b>Key map مع الـ velocity layers</b>: معظم الآلات بتجمع الاتنين. الـ multisamples مترتبة <b>رأسي</b> (كل واحدة بتغطي عمود keys)، والـ velocity layers <b>أفقي</b>. الـ key رقم <bdi>${k + 1}</bdi> مع velocity <bdi>${v}</bdi> بتشغّل <b><bdi>${z[4]}</bdi></b>.` }
      : { en: `<b>${mode === 'two' ? 'Dual' : 'Triple'} velocity layer</b>: the sound depends on how hard the key is hit. ${mode === 'two' ? 'Sound one is played at lower velocity, sound two at higher velocity.' : 'Three types of sound are played according to the velocity.'} Velocity ${v} → <b>${z[4]}</b>, so the timbre changes, not just the volume.`, ar: `الـ <b>${mode === 'two' ? 'Dual' : 'Triple'} velocity layer</b>: الصوت بيعتمد على إنت ضاغط على الـ key جامد قد إيه. ${mode === 'two' ? 'الصوت الأول بيشتغل مع velocity واطية والتاني مع velocity عالية.' : 'تلات أنواع أصوات بتشتغل حسب الـ velocity.'} الـ velocity <bdi>${v}</bdi> بتشغّل <b><bdi>${z[4]}</bdi></b>، فالـ timbre بيتغير مش العلو بس.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['one', 'Single'], ['two', 'Dual'], ['three', 'Triple'], ['map', 'Key map + layers']]} mode=${mode} set=${setMode} />
      <${Lbl} l="<b>Key map</b>: keys → , velocity ↑" r="tap the map" />
      <svg ref=${ref} className="mv5-plot" viewBox="0 0 320 150" role="img" aria-label="Key map: keys across, velocity up" onClick=${tap} style=${{ cursor: 'crosshair' }}>
        ${Z.map((q, j) => html`<g key=${j}><rect x=${X(q[0]) + 1} y=${Y(q[3])} width=${(q[1] - q[0] + 1) * 25 - 2} height=${Y(q[2]) - Y(q[3]) - 2} rx="4" fill=${zc(q, j)} opacity=${z === q ? .55 : .22} /><text x=${X(q[0]) + (q[1] - q[0] + 1) * 12.5} y=${(Y(q[2]) + Y(q[3])) / 2 + 5} textAnchor="middle" fontSize="15" fontWeight=${z === q ? 700 : 400}>${q[4]}</text></g>`)}
        <path d="M10 130 H310 M10 10 V130" stroke="var(--graphite)" fill="none" />
        <circle cx=${X(k) + 12.5} cy=${Y(v)} r="6" fill="var(--paper)" stroke="var(--pen)" strokeWidth="3" />
        <text x="10" y="148" fontSize="15" style=${{ fill: 'var(--graphite)' }}>key 1</text><text x="310" y="148" textAnchor="end" fontSize="15" style=${{ fill: 'var(--graphite)' }}>key 12</text></svg>
      <${Slider} label="Velocity" min=${1} max=${127} v=${v} set=${setV} />
    <//>`;
  }

  /* ── [5.7] slide 65: keyswitching ── */
  const KSW = { tr: ['Trumpet', 'muted', 'open'], vn: ['Violin', 'plucked', 'bowed'] };
  function Keyswitch({ ar }) {
    const [ins, setIns] = useState('tr'), [st, setSt] = useState(0), [sel, setSel] = useState(14);
    const [name, a, b] = KSW[ins], style = st ? b : a;
    const over = k => k === 0 ? ['var(--pen)', st === 0 ? .7 : .25] : k === 2 ? ['var(--pen)', st === 1 ? .7 : .25] : k >= 7 ? ['var(--k-mm)', .18] : [null, 0];
    const tapK = k => { if (k === 0) setSt(0); else if (k === 2) setSt(1); setSel(k); };
    const msg = sel === 0 || sel === 2 ? `Key ${sel + 1} is a <b>keyswitch</b>: it plays no note, it selects <b>${style}</b>.` : sel >= 7 ? `Key ${sel + 1} plays the <b>${style} ${name.toLowerCase()}</b> bank (key-mapped, velocity-layered samples).` : `Key ${sel + 1} is outside the ${name.toLowerCase()}'s range.`;
    const msgA = sel === 0 || sel === 2 ? `الـ key رقم <bdi>${sel + 1}</bdi> هي <b>keyswitch</b>: مبتعزفش نوتة، بتختار <b><bdi>${style}</bdi></b>.` : sel >= 7 ? `الـ key رقم <bdi>${sel + 1}</bdi> بتشغّل الـ bank بتاع الـ <b><bdi>${style} ${name.toLowerCase()}</bdi></b> (samples عاملة key-map و velocity layers).` : `الـ key رقم <bdi>${sel + 1}</bdi> برّه مدى الـ ${name.toLowerCase()}.`;
    const cap = { en: `Instruments sound vastly different depending on how they are played. <b>Keyswitching</b>: keys outside the instrument's range (usually low keys, red) choose the playing style. ${msg}`, ar: `الآلات صوتها بيختلف جدًا حسب طريقة العزف. الـ <b>Keyswitching</b> معناه إن keys برّه مدى الآلة (غالبًا الـ keys الواطية، الحمرا) بتختار طريقة العزف. ${msgA}` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['tr', 'Trumpet: muted / open'], ['vn', 'Violin: plucked / bowed']]} mode=${ins} set=${k => { setIns(k); setSt(0); }} />
      <${Keys} over=${over} onKey=${tapK} sel=${sel} top=${24}>
        <text x=${keyX(1)} y="16" textAnchor="middle" fontSize="15" fontWeight="700" style=${{ fill: 'var(--pen)' }}>switch</text>
        <text x=${(keyX(7) + keyX(24)) / 2} y="16" textAnchor="middle" fontSize="15" fontWeight="700" style=${{ fill: 'var(--k-mm)' }}>${name.toLowerCase()} range</text><//>
      <div className="mv5-row"><span className="mv5-box on">Style: ${style}</span></div>
      <p className="mv5-note">Tap a red keyswitch, then a key in the range.</p>
    <//>`;
  }

  /* ── [6.1–6.2] slides 47–48: simple sound energy beat detection ── */
  function BeatEnergy({ ar }) {
    const [pat, setPat] = useState([1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0]);
    const [run, setRun] = useState(0);
    const d = useMemo(() => {
      const fs = 44100, n = 3 * fs, x = new Float64Array(n), r = rng(11);
      for (let k = 0; k < n; k++) x[k] = .01 * (2 * r() - 1);
      pat.forEach((on, j) => { if (!on) return; const a = j % 2 ? .6 : 1, s0 = Math.round(j * .25 * fs); for (let k = 0; k < .2 * fs && s0 + k < n; k++) x[s0 + k] += a * (2 * r() - 1) * Math.exp(-k / (.04 * fs)); });
      const B = 2205, E = N(60, b => { let s = 0; for (let k = b * B; k < (b + 1) * B; k++) s += x[k] * x[k]; return s; });
      const avg = E.map((_, b) => { const a0 = Math.max(0, b - 20); if (b === 0) return Infinity; let s = 0; for (let j = a0; j < b; j++) s += E[j]; return s / (b - a0); });
      const beat = E.map((e, b) => e > avg[b]);
      return { x, E, avg, beat };
    }, [pat]);
    const t = useAnim(true, [run, pat]);
    const cur = calm() ? 59 : Math.min(59, Math.floor(t * 20));
    const db = v => 10 * Math.log10(Math.max(v, 1e-9)), mx = db(Math.max(...d.E)), mn = mx - 50;
    const H = v => clamp((db(v) - mn) / (mx - mn), 0, 1);
    const beats = d.beat.filter((b, k) => b && !d.beat[k - 1]).length;
    const runs = d.beat.slice(0, cur + 1).filter((b, k) => b && !d.beat[k - 1]).length;
    const cE = d.E[cur], cA = d.avg[cur], g3 = v => isFinite(v) ? v.toPrecision(3) : '-';
    const cap = { en: `The ear hears a beat when the sound energy is <b>much larger than its recent history</b>. Simple detection: the <b>instant energy</b> over about 5/100 s (0.05 × 44,100 = 2,205 samples, the bars) against the <b>average energy</b> over about 1 s (44,100 samples, the line). A beat is detected only when instant > local average (red). Block ${cur + 1} at ${fx(cur * .05, 2)} s: ${g3(cE)} ${d.beat[cur] ? '>' : '≤'} ${g3(cA)}. Beats so far: <b>${runs}</b> of ${beats}. Tap the steps to change the rhythm.`,
      ar: `الودن بتسمع beat لما طاقة الصوت تبقى <b>أكبر بكتير من تاريخها القريب</b>. الكشف البسيط بيقارن الـ <b>instant energy</b> على حوالي 5/100 ثانية (الأعمدة) بالـ <b>average energy</b> على حوالي ثانية (الخط):` + L('0.05 × 44,100 = 2,205 samples ; 1 s = 44,100 samples') + `وبنعتبرها beat بس لما الـ instant أكبر من الـ local average (الأحمر). الـ block رقم <bdi>${cur + 1}</bdi> عند <bdi>${fx(cur * .05, 2)} s</bdi>:` + L(`${g3(cE)} ${d.beat[cur] ? '>' : '≤'} ${g3(cA)}`) + `عدد الـ beats لحد دلوقتي <b><bdi>${runs}</bdi></b> من <bdi>${beats}</bdi>. دوس على الخانات عشان تغيّر الإيقاع.` };
    const X = b => 4 + (b + .5) * 312 / 60;
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Lbl} l="<b>Signal</b> (3 s at 44.1 kHz)" />
      <${Svg} h=${70}>${axis(35)}<path d=${band(d.x, 4, 316, 3, 67, -1, 1, 156)} fill="var(--graphite)" opacity=".7" /><path d=${`M${X(cur)} 0 V70`} stroke="var(--k-mm)" strokeWidth="2" /><//>
      <${Lbl} l="<b>Instant energy</b> per 0.05 s block (dB)" r="line: average of the last 1 s" />
      <${Svg} h=${100}>${axis(90)}${bars(N(cur + 1, b => X(b)), N(cur + 1, b => H(d.E[b])), 6, 90, b => d.beat[b] ? 'var(--pen)' : 'var(--k-mm)', 4)}
        <path d=${line(N(cur, b => d.avg[b + 1]).map(v => db(v)), X(1), X(cur), 6, 90, mn, mx)} stroke="var(--ink)" strokeWidth="2" fill="none" /><//>
      <div className="mv5-steps" role="group" aria-label="Rhythm steps of 0.25 s">${pat.map((on, j) => html`<button key=${j} className=${on ? 'on' : ''} aria-pressed=${String(!!on)} aria-label=${'step ' + (j + 1)} onClick=${() => { setPat(p => p.map((v, k) => k === j ? 1 - v : v)); setRun(x => x + 1); }}></button>`)}</div>
      <div className="mv5-row"><button className="fig-btn" onClick=${() => setRun(x => x + 1)}>↻ Scan again</button></div>
    <//>`;
  }

  /* ── [6.3] slide 49: frequency-selected sound energy, 1024-sample FFT in 32 sub-bands ── */
  function Subbands({ ar }) {
    const d = useMemo(() => {
      const fs = 44100, n = 2 * fs, x = new Float64Array(n), r = rng(5);
      for (const t0 of [.25, 1.25]) { const s0 = Math.round(t0 * fs); for (let k = 0; k < .4 * fs; k++) x[s0 + k] += .9 * Math.sin(2 * Math.PI * 60 * k / fs) * Math.exp(-k / (.08 * fs)); }
      for (const t0 of [.75, 1.75]) { const s0 = Math.round(t0 * fs); let p = 0; for (let k = 0; k < .2 * fs && s0 + k < n; k++) { const w = 2 * r() - 1; x[s0 + k] += .5 * (w - p) * Math.exp(-k / (.03 * fs)); p = w; } }
      const F = Math.floor(n / 1024), E = [];
      for (let f = 0; f < F; f++) { const re = Float64Array.from(x.subarray(f * 1024, f * 1024 + 1024)), im = new Float64Array(1024); fft(re, im); E.push(N(32, b => { let s = 0; for (let k = b * 16; k < b * 16 + 16; k++) s += re[k] * re[k] + im[k] * im[k]; return s; })); }
      const A = E.map((_, f) => N(32, b => { const a0 = Math.max(0, f - 43); if (f === 0) return Infinity; let s = 0; for (let j = a0; j < f; j++) s += E[j][b]; return s / (f - a0); }));
      let mx = 0; E.forEach(e => e.forEach(v => { mx = Math.max(mx, v); }));
      return { x, E, A, F, mx };
    }, []);
    const [f, setF] = useState(32), [play, setPlay] = useState(false);
    const t = useAnim(play);
    useEffect(() => { if (play) { const v = Math.floor(t * 20); if (v >= d.F) { setPlay(false); setF(d.F - 1); } else setF(v); } }, [t]);
    const db = v => 10 * Math.log10(Math.max(v, 1e-12) / d.mx), H = v => clamp((db(v) + 70) / 70, 0, 1);
    const over = N(32, b => d.E[f][b] > d.A[f][b] && d.E[f][b] > 0), cnt = over.filter(Boolean).length;
    const X = b => 10 + (b + .5) * 300 / 32;
    const tt = f * 1024 / 44100;
    const cap = { en: `More elaborate: look for large energy changes in particular <b>frequency sub-bands</b>. Frame ${f + 1} (${fx(tt, 2)} s): Fourier transform over <b>1024 samples</b>, divided into <b>32 sub-bands</b>; each band's energy (bar) is compared with its recent average over about 1 s (tick). ${cnt ? `<b>${cnt}</b> sub-band${cnt > 1 ? 's are' : ' is'} above ${cnt > 1 ? 'their' : 'its'} average (red): <b>beat detected</b>.` : 'No sub-band is above its average: no beat.'} The low drum lights the low bands, the hi-hat the high ones.`,
      ar: `طريقة أدق: بندوّر على تغيّرات كبيرة في الطاقة في <b>frequency sub-bands</b> معينة. في الـ frame رقم <bdi>${f + 1}</bdi> (<bdi>${fx(tt, 2)} s</bdi>) بنعمل Fourier transform على <b>1024 sample</b> ونقسمه لـ <b>32 sub-band</b>، وطاقة كل band (العمود) بتتقارن بمتوسطها القريب على حوالي ثانية (الشرطة). ${cnt ? `فيه <b><bdi>${cnt}</bdi></b> sub-band فوق المتوسط بتاعها (الأحمر)، يعني <b>اتكشف beat</b>.` : 'مفيش sub-band فوق المتوسط بتاعها، يعني مفيش beat.'} الـ drum الواطي بينوّر الـ bands الواطية، والـ hi-hat بينوّر العالية.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Lbl} l="<b>Signal</b>: low drum and hi-hat (2 s)" />
      <${Svg} h=${64}>${axis(32)}<path d=${band(d.x, 4, 316, 3, 61, -1, 1, 156)} fill="var(--graphite)" opacity=".7" /><rect x=${4 + f / d.F * 312} y="0" width=${Math.max(2, 312 / d.F)} height="64" fill="var(--k-mm)" opacity=".6" /><//>
      <${Slider} label="Frame" min=${0} max=${d.F - 1} v=${f} set=${v => { setPlay(false); setF(v); }} out=${(f + 1) + '/' + d.F} />
      <div className="mv5-row"><button className="fig-btn solid" onClick=${() => { setF(0); setPlay(true); }}>▶ Play</button></div>
      <${Lbl} l="<b>Energy in 32 sub-bands</b> (dB)" r="low → high" />
      <${Svg} h=${100}>${axis(86)}${bars(N(32, X), N(32, b => H(d.E[f][b])), 6, 86, b => over[b] ? 'var(--pen)' : 'var(--k-mm)', 6)}
        ${N(32, b => isFinite(d.A[f][b]) && html`<path key=${'a' + b} d=${`M${X(b) - 4} ${86 - H(d.A[f][b]) * 80} h8`} stroke="var(--ink)" strokeWidth="2" />`)}<//>
    <//>`;
  }

  /* ── [6.4] slides 50–54: slicing at hitpoints and triggering the slices from pads ── */
  const HITA = [1, .35, .8, .3, 1, .5, .7, .25];
  function Slices({ ar }) {
    const [th, setTh] = useState(.4), [play, setPlay] = useState(false);
    const x = useMemo(() => { const fs = 8000, r = rng(9), y = new Float64Array(2 * fs); HITA.forEach((a, j) => { const s0 = j * fs / 4; for (let k = 0; k < fs / 4; k++) y[s0 + k] += a * (2 * r() - 1) * Math.exp(-k / (.035 * fs)); }); return y; }, []);
    const hits = HITA.map((a, j) => [j * .25, a]).filter(([, a]) => a >= th).map(([t]) => t);
    const sl = hits.map((t, k) => [t, k + 1 < hits.length ? hits[k + 1] : 2]);
    const tt = useAnim(play), pt = Math.min(2, tt);
    useEffect(() => { if (play && tt >= 2.2) setPlay(false); }, [tt]);
    const curK = play ? sl.findIndex(([a, z]) => pt >= a && pt < z) : -1;
    const X = t => 4 + t / 2 * 312;
    const cap = { en: `Set the <b>threshold</b> (Cubase: Hitpoints + Threshold; ReCycle: the Sensitivity slider): every hit above it becomes a <b>hitpoint</b>, and <b>Create Slices</b> cuts the loop there. ${hits.length} slices. Dragged onto Groove Agent One, the slices go to <b>consecutive pads</b>. A MIDI chromatic scale whose notes trigger each slice at the right time recreates the audio${play ? ' (playing)' : ': press Play'}.`,
      ar: `ظبّط الـ <b>threshold</b> (في Cubase الـ Hitpoints والـ Threshold، وفي ReCycle الـ Sensitivity slider): كل ضربة فوقه بتبقى <b>hitpoint</b>، والـ <b>Create Slices</b> بيقطع الـ loop عندها. عدد الـ slices <bdi>${hits.length}</bdi>. ولما نسحبهم على Groove Agent One بيروحوا على <b>pads ورا بعض</b>. وMIDI chromatic scale نوتاتها بتشغّل كل slice في وقتها بيرجّع الصوت زي ما كان${play ? ' (شغّال)' : '، دوس Play'}.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Slider} label="Threshold" min=${.1} max=${.95} step=${.05} v=${th} set=${setTh} out=${fx(th, 2)} />
      <${Lbl} l="<b>Drum loop</b> cut at the hitpoints" r="2 s" />
      <${Svg} h=${90}>
        ${sl.map(([a, z], k) => html`<rect key=${k} x=${X(a)} y="2" width=${X(z) - X(a)} height="86" fill=${k % 2 ? 'color-mix(in srgb, var(--k-mm) 10%, transparent)' : 'color-mix(in srgb, var(--k-mm) 24%, transparent)'} stroke=${curK === k ? 'var(--pen)' : 'none'} strokeWidth="2" />`)}
        ${axis(45)}<path d=${band(x, 4, 316, 4, 86, -1.05, 1.05, 156)} fill="var(--graphite)" opacity=".8" />
        <path d=${`M4 ${sy(th, -1.05, 1.05, 4, 86)} H316`} stroke="var(--pen)" strokeDasharray="5 4" />
        ${hits.map((t, k) => html`<g key=${'h' + k}><path d=${`M${X(t)} 2 V88`} stroke="var(--k-mm)" strokeWidth="2.5" /></g>`)}
        ${play && html`<path d=${`M${X(pt)} 0 V90`} stroke="var(--ink)" strokeWidth="2" />`}<//>
      <div className="mv5-pads">${N(16, k => html`<div key=${k} className=${(k < sl.length ? 'has' : '') + (curK === k ? ' hit' : '')}>${k < sl.length ? 'slice ' + (k + 1) : 'pad ' + (k + 1)}</div>`)}</div>
      <div className="mv5-row"><button className="fig-btn solid" onClick=${() => setPlay(true)}>▶ Play the MIDI notes</button></div>
    <//>`;
  }

  /* ── [6.5–6.6] slides 55–57: tempo change problems and their fixes ── */
  function Tempo({ ar }) {
    const [r, setR] = useState(.75), [fade, setFade] = useState(false), [loop, setLoop] = useState(false);
    const sp = .25 / r, LEN = .25, TT = 3.4, gap = sp - LEN;
    const X = t => 6 + t / TT * 308;
    const shape = (k, lane) => {
      const t0 = k * sp, yc = lane ? 92 : 38, T = loop && gap > 0 ? sp : fade ? Math.min(LEN, sp) : LEN;
      const amp = t => (t < LEN ? Math.exp(-t / .2) : Math.exp(-LEN / .2)) * (fade || (loop && gap > 0) ? clamp((T - t) / (T * .3), 0, 1) : 1);
      const n = 40, top = [], bot = [];
      for (let j = 0; j <= n; j++) { const t = T * j / n, a = amp(t) * 22; top.push(X(t0 + t).toFixed(1) + ' ' + (yc - a).toFixed(1)); bot.push(X(t0 + t).toFixed(1) + ' ' + (yc + a).toFixed(1)); }
      return 'M' + top.join(' L') + ' L' + bot.reverse().join(' L') + ' Z';
    };
    const tot = 8 * sp;
    const cap = r < 1 ? { en: `<b>Slower tempo</b> (${Math.round(r * 100)}%): each slice still starts on its beat, now every ${Math.round(sp * 1000)} ms, but lasts only 250 ms, so <b>extra time is introduced as silent gaps</b> of ${Math.round(gap * 1000)} ms (red). ${loop ? 'Fix: <b>loop the end of the tail</b> to extend it through the gap (dashed).' : fade ? 'The fade envelope ends each slice cleanly, but the gaps stay: for gaps, loop the end of the tail.' : 'The attacks stay artefact free, the most important part of percussion.'} Total ${fx(tot, 2)} s instead of 2 s.`, ar: `الـ <b>tempo أبطأ</b> (<bdi>${Math.round(r * 100)}%</bdi>): كل slice لسه بتبدأ على الـ beat بتاعها، كل <bdi>${Math.round(sp * 1000)} ms</bdi>، بس طولها <bdi>250 ms</bdi> بس، فـ <b>الوقت الزيادة بيظهر كفراغات سكوت</b> طولها <bdi>${Math.round(gap * 1000)} ms</bdi> (الأحمر). ${loop ? 'الحل: <b>نعمل loop لآخر الذيل</b> عشان نمدّه لحد آخر الفراغ (المتقطع).' : fade ? 'الـ fade envelope بيقفل كل slice بنضافة، بس الفراغات لسه موجودة: للفراغات اعمل loop لآخر الذيل.' : 'الـ attacks بتفضل من غير artefacts، ودي أهم حتة في الـ percussion.'} الطول الكلي <bdi>${fx(tot, 2)} s</bdi> بدل <bdi>2 s</bdi>.` }
      : r > 1 ? { en: `<b>Faster tempo</b> (${Math.round(r * 100)}%): slices now start every ${Math.round(sp * 1000)} ms but still last 250 ms, so their <b>tails overlap</b> by ${Math.round(-gap * 1000)} ms (red), and the overlaps reduce the total playing time to ${fx(tot, 2)} s. ${fade ? 'Fix: an <b>envelope fades each slice to silence</b> before the next one starts.' : 'Turn on the fade envelope.'}`, ar: `الـ <b>tempo أسرع</b> (<bdi>${Math.round(r * 100)}%</bdi>): الـ slices بقت تبدأ كل <bdi>${Math.round(sp * 1000)} ms</bdi> بس لسه طولها <bdi>250 ms</bdi>، فـ <b>الذيول بتتداخل</b> بمقدار <bdi>${Math.round(-gap * 1000)} ms</bdi> (الأحمر)، والتداخل بيقلل وقت التشغيل الكلي لـ <bdi>${fx(tot, 2)} s</bdi>. ${fade ? 'الحل: <b>envelope بيعمل fade لكل slice لحد السكوت</b> قبل ما اللي بعدها تبدأ.' : 'شغّل الـ fade envelope.'}` }
      : { en: 'Original tempo: each 250 ms slice ends just as the next one starts. Move the slider to replay the slices slower or faster.', ar: 'الـ tempo الأصلي: كل slice طولها <bdi>250 ms</bdi> بتخلص بالظبط لما اللي بعدها تبدأ. حرّك الـ slider عشان تشغّل الـ slices أبطأ أو أسرع.' };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Slider} label="Tempo" min=${.6} max=${1.6} step=${.05} v=${r} set=${setR} out=${Math.round(r * 100) + '%'} />
      <div className="mv5-checks"><label><input type="checkbox" checked=${fade} onChange=${() => setFade(v => !v)} />Fade envelope</label><label><input type="checkbox" checked=${loop} onChange=${() => setLoop(v => !v)} />Loop tail into gaps</label></div>
      <${Svg} h=${140} label="Slices S1 to S8 replayed at the new tempo">
        ${N(8, k => { const a = k * sp + LEN, z = (k + 1) * sp; if (k === 7) return null;
          if (gap > 0 && !loop) return html`<rect key=${'g' + k} x=${X(a)} y=${k % 2 ? 66 : 12} width=${X(z) - X(a)} height="52" fill="color-mix(in srgb, var(--pen) 22%, transparent)" />`;
          if (gap < 0 && !fade) return html`<rect key=${'o' + k} x=${X(z)} y="12" width=${X(a) - X(z)} height="106" fill="color-mix(in srgb, var(--pen) 22%, transparent)" />`; return null; })}
        ${N(8, k => html`<g key=${k}><path d=${shape(k, k % 2)} fill="var(--k-mm)" opacity=".75" />${loop && gap > 0 && html`<path d=${`M${X(k * sp + LEN)} ${k % 2 ? 92 : 38} H${X(k * sp + sp)}`} stroke="var(--ink)" strokeDasharray="3 3" />`}<text x=${X(k * sp) + 2} y=${k % 2 ? 132 : 12} fontSize="15" fontWeight="700">S${k + 1}</text></g>`)}
        <path d=${`M${X(2)} 14 V120`} stroke="var(--graphite)" strokeDasharray="2 4" /><//>
      <p className="mv5-note">Odd slices on the top row, even on the bottom · dotted line: the original 2 s end</p>
    <//>`;
  }

  /* ── [7.2] slide 71: making waves, a circular sequence of single-period wavetables ── */
  const TAB = N(4, k => N(65, j => { const x = 2 * Math.PI * j / 64; let v = 0; for (let h = 1; h <= 7; h++) v += Math.exp(-(h - 1) * k * .7) * Math.sin(h * x) / h; return v; })).map(t => { const p = peak(t); return t.map(v => v / p); });
  const tabAt = (k, ph) => { const t = TAB[k], x = ((ph % 1) + 1) % 1 * 64, i = Math.floor(x), f = x - i; return t[i] * (1 - f) + t[i + 1] * f; };
  function Wavetable({ ar }) {
    const steps = [
      { en: 'The sound of an existing instrument (a single note) is <b>sampled</b>. Its waveform slowly changes from period to period (dashed lines = period boundaries).', ar: 'صوت آلة موجودة (نوتة واحدة) بيتعمله <b>sampling</b>. الـ waveform بتاعته بتتغير بالراحة من period للتاني (الخطوط المتقطعة حدود الـ periods).' },
      { en: 'It is parsed into a <b>circular sequence of wavetables</b>, each holding <b>one period</b> (one cycle) of the wave. A set of wavetables with user-specified harmonic content can also be generated mathematically.', ar: 'بيتقسم لـ <b>سلسلة دايرية من الـ wavetables</b>، كل واحد فيه <b>period واحد</b> (cycle واحدة) من الموجة. وممكن كمان نولّد wavetables بالرياضة بـ harmonic content نحدده.' },
      { en: '<b>At playback</b> the wavetables are used to fetch samples (<b>table lookup</b>): a pointer steps round the current table, period after period.', ar: '<b>وقت التشغيل</b> الـ wavetables بتُستخدم عشان نجيب الـ samples (<b>table lookup</b>): pointer بيلف حوالين الـ table الحالي، period ورا period.' },
      { en: 'But the output is not normally static: it <b>evolves slowly in time</b> as one wavetable is mixed with the next, while <b>ADSR enveloping</b> shapes the volume.', ar: 'بس الـ output عادة مش ثابت: <b>بيتطور بالراحة مع الوقت</b> لأن كل wavetable بيتخلط باللي بعده، والـ <b>ADSR enveloping</b> بيشكّل العلو.' },
      { en: '<b>Looping</b> may be used to slow or reverse the wavetable evolution: here the sequence runs forward, then back.', ar: 'الـ <b>Looping</b> ممكن يُستخدم عشان نبطّأ أو نعكس تطور الـ wavetables: هنا السلسلة ماشية لقدام وبعدين بترجع.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const t = useAnim(i === 2), ptr = (t * .8) % 1;
    const P = 16, n = P * 40;
    const note = useMemo(() => N(n, j => { const ph = j / 40, pos = Math.min(2.999, ph / P * 3), k = Math.floor(pos), f = pos - k; return tabAt(k, ph) * (1 - f) + tabAt(k + 1, ph) * f; }), []);
    const env = u => u < .08 ? u / .08 : u < .2 ? 1 - .3 * (u - .08) / .12 : u < .8 ? .7 : .7 * (1 - (u - .8) / .2);
    const out = i <= 1 ? note : i === 2 ? N(n, j => tabAt(0, j / 40)) : N(n, j => { const u = j / n, pos = i === 3 ? Math.min(2.999, u * 3) : Math.min(2.999, (u < .5 ? u * 2 : (1 - u) * 2) * 3), k = Math.floor(pos), f = pos - k; return env(u) * (tabAt(k, j / 40) * (1 - f) + tabAt(k + 1, j / 40) * f); });
    const tk = i === 2 ? [0] : i >= 3 ? [0, 1, 2, 3] : i === 1 ? [0, 1, 2, 3] : [];
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <div className=${pop(i >= 1)}><div className="mv5-tabs">${TAB.map((tb, k) => html`<div key=${k} className=${tk.includes(k) ? 'on' : 'dim'}><svg viewBox="0 0 100 60" aria-hidden="true"><path d="M2 30 H98" stroke="var(--faint)" /><path d=${line(tb, 2, 98, 4, 56)} stroke="var(--k-mm)" strokeWidth="2.5" fill="none" />${i === 2 && k === 0 && html`<circle cx=${2 + ptr * 96} cy=${sy(tabAt(0, ptr), -1, 1, 4, 56)} r="6" fill="var(--pen)" />`}</svg>table ${k + 1}</div>`)}</div>
        <p className="mv5-note">${i === 4 ? '1 → 2 → 3 → 4 → 3 → 2 → 1' : i >= 1 ? '1 → 2 → 3 → 4 → back to 1 (circular)' : ''}</p></div>
      <${Lbl} l=${i <= 1 ? '<b>Sampled note</b>' : i === 2 ? '<b>Output</b>: table 1 read again and again' : '<b>Output</b>: tables mixed, with ADSR'} r="16 periods" />
      <${Svg} h=${90}>${axis(45)}${i === 0 && N(P - 1, k => html`<path key=${k} d=${`M${4 + (k + 1) * 312 / P} 4 V86`} stroke="var(--faint)" strokeDasharray="3 3" />`)}<path d=${line(out, 4, 316, 6, 84)} stroke="var(--k-mm)" strokeWidth="1.6" fill="none" /><//>
    <//>`;
  }

  /* ── [7.3] slide 72: attack sample once, then a looped, enveloped sustain segment ── */
  function AttackLoop({ ar }) {
    const steps = [
      { en: 'A wavetable synthesiser stores two parts of an instrument\'s sound. First, a sample of the <b>attack</b> section (e.g. the hammer hitting a piano string). When triggered it is <b>played once</b>.', ar: 'الـ wavetable synthesiser بيخزن جزئين من صوت الآلة. الأول sample للـ <b>attack</b> (زي صوت الـ hammer وهو بيخبط في وتر البيانو). لما النوتة تشتغل بيتشغّل <b>مرة واحدة</b>.' },
      { en: 'Second, a <b>small segment of the sustain</b> portion. It follows the attack immediately and is <b>looped</b> endlessly.', ar: 'التاني <b>حتة صغيرة من الـ sustain</b>. بتيجي بعد الـ attack على طول وبيتعملها <b>loop</b> على طول.' },
      { en: 'The endlessly looping segment is then <b>enveloped</b> to create a natural sounding decay (the sound dying away).', ar: 'وبعدين الحتة اللي بتتكرر دي بيتعملها <b>envelope</b> عشان يطلع decay طبيعي (الصوت وهو بيموت).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const A = 110, Pd = 28;
    const d = useMemo(() => { const r = rng(4); const att = N(A, k => (2 * r() - 1) * Math.exp(-k / 18) * .9 + Math.min(1, k / 30) * .6 * Math.sin(2 * Math.PI * k / Pd)); const seg = N(Pd, k => .6 * Math.sin(2 * Math.PI * (A + k) / Pd) + .2 * Math.sin(4 * Math.PI * (A + k) / Pd)); return { att, seg }; }, []);
    const reps = 17, tot = A + reps * Pd;
    const out = N(tot, k => k < A ? d.att[k] : d.seg[(k - A) % Pd] * (i === 2 ? Math.exp(-(k - A) / 160) : 1));
    const X = k => 4 + k / tot * 312;
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <div className="mv5-leg"><span><i style=${{ background: 'var(--pen)' }}></i>attack (once)</span><span className=${pop(i >= 1)}><i style=${{ background: 'var(--k-mm)' }}></i>sustain segment (looped)</span></div>
      <${Svg} h=${110} label="Attack sample followed by a looped sustain segment">
        <rect x=${X(0)} y="4" width=${X(A) - X(0)} height="96" fill="color-mix(in srgb, var(--pen) 14%, transparent)" />
        ${i >= 1 && N(reps, j => html`<rect key=${j} x=${X(A + j * Pd)} y="4" width=${X(Pd) - X(0) - .6} height="96" fill=${j % 2 ? 'color-mix(in srgb, var(--k-mm) 10%, transparent)' : 'color-mix(in srgb, var(--k-mm) 22%, transparent)'} />`)}
        ${axis(52)}<path d=${line(i === 0 ? d.att : out, X(0), i === 0 ? X(A - 1) : X(tot - 1), 6, 98, -1.3, 1.3)} stroke="var(--ink)" strokeWidth="1.4" fill="none" />
        ${i === 2 && html`<path d=${fnp(k => .8 * Math.exp(-(k - A) / 160), A, tot, 60, X(A), X(tot), 6, 98, -1.3, 1.3)} stroke="var(--pen)" strokeWidth="2" strokeDasharray="5 4" fill="none" />`}<//>
    <//>`;
  }

  /* ── [7.5] slides 74, 79–80: dynamic waveshaping, linear crossfading and sequential enveloping ── */
  function SeqEnv({ ar }) {
    const [m, setM] = useState('cross');
    const E = m === 'cross' ? [t => Math.max(0, 1 - t / .5), t => Math.max(0, 1 - Math.abs(t - .5) / .5), t => Math.max(0, (t - .5) / .5)] : [t => Math.exp(-3 * t), t => .9 * Math.pow(Math.sin(Math.PI * t), 2), t => t * t];
    const T3 = [0, 1, 3], n = 900, cyc = 14;
    const out = N(n, j => { const u = j / n, ph = u * cyc; return E.reduce((s, e, k) => s + e(u) * tabAt(T3[k], ph), 0); }), pk = Math.max(1, peak(out));
    const cap = m === 'cross' ? { en: '<b>Linear crossfading</b>, the simplest idea: crossfade from one wavetable to the next sequentially; the crossfade is an envelope that smoothly merges the waveforms. Seen as sequential enveloping, it is the subclass where the <b>envelopes are overlapping triangular pulses</b>.', ar: 'الـ <b>Linear crossfading</b> أبسط فكرة: نعمل crossfade من wavetable للي بعده بالترتيب، والـ crossfade ده envelope بيدمج الـ waveforms بنعومة. ولو بصينا له كـ sequential enveloping، فهو الحالة الخاصة اللي <b>الـ envelopes فيها نبضات مثلثة متداخلة</b>.' }
      : { en: '<b>Sequential enveloping</b>, the more sophisticated method: the wavetables are mixed at any instant by <b>moving envelope scales</b>. Each table passes through an envelope scaler driven by its own envelope function, and a summer (Σ) adds them into the output.', ar: 'الـ <b>Sequential enveloping</b> الطريقة الأشطر: الـ wavetables بتتخلط في أي لحظة بـ <b>envelope scales بتتحرك</b>. كل table بيعدي على envelope scaler ماشي بالـ envelope function بتاعته، والـ summer (Σ) بيجمعهم في الـ output.' };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['cross', 'Linear crossfading'], ['seq', 'Sequential enveloping']]} mode=${m} set=${setM} />
      <div className="mv5-env">${E.map((e, k) => html`<${React.Fragment} key=${k}>
        <svg viewBox="0 0 100 60" aria-hidden="true"><rect x="1" y="1" width="98" height="58" rx="6" fill="var(--paper)" stroke="var(--line)" /><path d=${line(TAB[T3[k]], 6, 94, 8, 52)} stroke="var(--k-mm)" strokeWidth="3" fill="none" /></svg>
        <span className="x">×</span>
        <svg viewBox="0 0 300 50" aria-hidden="true"><path d="M2 46 H298" stroke="var(--faint)" /><path d=${fnp(e, 0, 1, 120, 2, 298, 4, 46, 0, 1)} stroke="var(--pen)" strokeWidth="3" fill="none" /></svg><//>`)}</div>
      <p className="mv5-sum"><b>Σ</b>summer → output</p>
      <${Svg} h=${80}>${axis(40)}<path d=${line(out, 4, 316, 4, 76, -pk, pk)} stroke="var(--k-mm)" strokeWidth="1.4" fill="none" /><//>
      <p className="mv5-note">Left: wavetables · right: their envelope functions over the note</p>
    <//>`;
  }

  /* ── [7.7] slides 75–78: wavetable_synth.m, crossfading one 440 Hz sine period into one 500 Hz saw period ── */
  function wtSynth(f1, f2) {
    const Fs = 22050, y1 = Array.from(synth(f1, 1 / f1, .9, Fs, 'sine')), y2 = Array.from(synth(f2, 1 / f2, .9, Fs, 'saw'));
    const xw = Math.floor(Fs / (f1 * 2)), ramp1 = N(xw + 1, k => k / xw), ramp2 = ramp1.map(v => 1 - v), pad = Fs / f1 + Fs / f2 - 2.5 * xw;
    const z = c => N(Math.max(0, Math.floor(c)), () => 0), o = c => N(Math.max(0, Math.floor(c)), () => 1);
    const xr1 = o(1.5 * xw).concat(ramp2, z(pad)), xr2 = z(1.5 * xw).concat(ramp1, o(pad)), yw2 = y1.concat(z(Fs / f2)), yt = z(Fs / f1).concat(y2);
    const n = Math.max(xr1.length, yw2.length, yt.length, 100);
    const g = (a, k, d) => k < a.length ? a[k] : d;
    return { y1: N(n, k => g(yw2, k, 0)), y2: N(n, k => g(yt, k, 0)), m1: N(n, k => g(xr1, k, 0)), m2: N(n, k => g(xr2, k, 1)), out: N(n, k => g(xr1, k, 0) * g(yw2, k, 0) + g(xr2, k, 1) * g(yt, k, 0)), n1: y1.length, n2: y2.length, xw, a: Math.floor(1.5 * xw) };
  }
  function Crossfade({ ar }) {
    const steps = [
      { en: '<b>Wave 1</b>: y1 = synth(440, 1/440, 0.9, 22050, \'sine\'), one period of a 440 Hz sine: 22050/440 = 50.1, so <b>50 samples</b>, followed by zeros.', ar: 'الـ <b>Wave 1</b> هي period واحد من sine بتاعة <bdi>440 Hz</bdi>، وبعدها أصفار:' + L("y1 = synth(440, 1/440, 0.9, 22050, 'sine') ; 22050/440 = 50.1 → 50 samples") },
      { en: '<b>Wave 2</b>: y2 = synth(500, 1/500, 0.9, 22050, \'saw\'), one period of a 500 Hz sawtooth: 22050/500 = 44.1, so <b>44 samples</b>, placed after Wave 1.', ar: 'الـ <b>Wave 2</b> هي period واحد من sawtooth بتاعة <bdi>500 Hz</bdi>، متحطوطة بعد الـ Wave 1:' + L("y2 = synth(500, 1/500, 0.9, 22050, 'saw') ; 22050/500 = 44.1 → 44 samples") },
      { en: '<b>Crossfade masks</b>: xfadewidth = floor(22050/(440 × 2)) = 25. Mask 1 (green) stays at 1, then ramps down over 26 samples centred on the join; mask 2 (red) ramps up: ramp2 = 1 − ramp1.', ar: 'الـ <b>Crossfade masks</b>: الـ mask الأول (الأخضر) بيفضل 1 وبعدين بينزل على 26 sample حوالين نقطة اللحام، والتاني (الأحمر) بيطلع:' + L('xfadewidth = floor(22050/(440 × 2)) = 25 ; ramp2 = 1 − ramp1') },
      { en: '<b>WaveTable Synthesis</b>: ywave2 = xramp1 .* ywave2 + xramp2 .* ytemp. The sine fades into the saw across the join. Note: this sort of technique is useful to create an <b>ADSR envelope</b> in MATLAB.', ar: 'الـ <b>WaveTable Synthesis</b>: الـ sine بتعمل fade جوه الـ saw عند نقطة اللحام:' + L('ywave2 = xramp1 .* ywave2 + xramp2 .* ytemp') + 'ملحوظة: التكنيك ده مفيد عشان نعمل <b>ADSR envelope</b> في MATLAB.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const [mode, setMode] = useState('ex'), [f1, setF1] = useState(300), [f2, setF2] = useState(600);
    const ex = mode === 'ex', w = useMemo(() => wtSynth(ex ? 440 : f1, ex ? 500 : f2), [ex, f1, f2]);
    const n = w.out.length, X0 = 4, X1 = 316;
    const P = (ys, col, lo = -1, hi = 1, h = 64, extra) => html`<${Svg} h=${h}><path d=${`M${X0} ${sy(0, lo, hi, 4, h - 4)} H${X1}`} stroke="var(--faint)" />${extra}<path d=${line(ys, X0, X0 + (X1 - X0) * (n - 1) / Math.max(n - 1, 99), 4, h - 4, lo, hi)} stroke=${col} strokeWidth="2" fill="none" /><//>`;
    const cap = ex ? steps[i] : { en: `<b>Try your own</b>: f1 = ${f1} Hz gives ${w.n1} samples of sine, f2 = ${f2} Hz gives ${w.n2} samples of saw; xfadewidth = floor(22050/(${f1} × 2)) = ${w.xw}, so the crossfade runs from sample ${w.a} to ${w.a + w.xw}.`, ar: `<b>جرّب بنفسك</b>: الـ f1 بيدّي <bdi>${w.n1}</bdi> sample من الـ sine، والـ f2 بيدّي <bdi>${w.n2}</bdi> sample من الـ saw، والـ crossfade من sample <bdi>${w.a}</bdi> لحد <bdi>${w.a + w.xw}</bdi>:` + L(`f1 = ${f1} Hz ; f2 = ${f2} Hz ; xfadewidth = floor(22050/(${f1} × 2)) = ${w.xw}`) };
    return html`<${Fig} ar=${ar} cap=${cap} bar=${ex ? html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />` : null}>
      <${Modes} list=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${!ex && html`<div><${Slider} label="f1 (sine)" min=${200} max=${800} step=${10} v=${f1} set=${setF1} out=${f1 + ' Hz'} /><${Slider} label="f2 (saw)" min=${200} max=${800} step=${10} v=${f2} set=${setF2} out=${f2 + ' Hz'} /></div>`}
      <div style=${{ opacity: !ex || i === 0 || i === 3 ? 1 : .35 }}><${Lbl} l="<b>Wave 1</b>" />${P(w.y1, 'var(--k-mm)')}</div>
      <div style=${{ opacity: !ex || i >= 1 ? 1 : .2 }}><${Lbl} l="<b>Wave 2</b>" />${P(w.y2, 'var(--k-mm)', -.5, .5)}</div>
      <div style=${{ opacity: !ex || i >= 2 ? 1 : .2 }}><${Lbl} l="<b>Crossfade masks</b>" r="green: xramp1 · red: xramp2" />${P(w.m1, 'var(--ok)', 0, 1.05, 56, html`<path d=${line(w.m2, X0, X0 + (X1 - X0) * (n - 1) / Math.max(n - 1, 99), 4, 52, 0, 1.05)} stroke="var(--pen)" strokeWidth="2" fill="none" />`)}</div>
      <div style=${{ opacity: !ex || i >= 3 ? 1 : .2 }}><${Lbl} l="<b>WaveTable Synthesis</b>" r=${`samples 0 to ${Math.max(n - 1, 99)}`} />${P(w.out, 'var(--k-mm)')}</div>
    <//>`;
  }

  /* ── [8.4] slides 93–94: grain envelopes and the grain spectrum ── */
  function Grain({ ar }) {
    const [env, setEnv] = useState('q'), [dur, setDur] = useState(20), [ct, setCt] = useState('sine');
    const fs = 44100, fr = { q: .25, h: .5, s: 1 / 16 }[env];
    const d = useMemo(() => {
      const Lg = Math.max(8, Math.round(dur * 44.1)), a = Math.max(1, Math.round(fr * Lg)), r = rng(2);
      const e = N(Lg, k => k < a ? k / a : k >= Lg - a ? Math.max(0, (Lg - 1 - k) / a) : 1);
      const c = N(Lg, k => ct === 'sine' ? Math.sin(2 * Math.PI * 1000 * k / fs) : .6 * Math.sin(2 * Math.PI * 1000 * k / fs) + .3 * Math.sin(2 * Math.PI * 1730 * k / fs + 1) + .25 * (2 * r() - 1));
      const g = e.map((v, k) => v * c[k]);
      const NF = 8192, re = new Float64Array(NF), im = new Float64Array(NF); g.forEach((v, k) => { re[k] = v; }); fft(re, im);
      const top = Math.round(3000 / fs * NF), mag = N(top + 1, k => Math.hypot(re[k], im[k])), mx = Math.max(...mag), db = mag.map(v => 20 * Math.log10(Math.max(v / mx, 1e-6)));
      let pk = 0; db.forEach((v, k) => { if (Math.abs(k * fs / NF - 1000) < 200 && v > db[pk]) pk = k; });
      if (Math.abs(pk * fs / NF - 1000) >= 200) pk = Math.round(1000 / fs * NF);
      let lo = pk, hi = pk; while (lo > 0 && db[lo - 1] > -20) lo--; while (hi < top && db[hi + 1] > -20) hi++;
      return { Lg, a, e, g, db, bw: (hi - lo) * fs / NF };
    }, [env, dur, ct]);
    const name = { q: '1/4 Dur', h: '1/2 Dur', s: '1/16 Dur' }[env];
    const cap = { en: `A grain = <b>envelope</b> × <b>contents</b>. ${dur} ms = ${d.Lg} samples at 44.1 kHz; the ${name} envelope ${env === 'h' ? 'rises for half the grain and falls for the other half (a triangle)' : `ramps over ${d.a} samples at each end`}, so there are no clicks or distortion at the beginning and end. ${ct === 'sine' ? `Spectrum width at −20 dB around 1 kHz: <b>${Math.round(d.bw)} Hz</b>. Sharper attacks (1/16 Dur) and shorter grains give <b>broader bandwidths</b>.` : 'The contents can come from any source: basic waveforms or samples.'}`,
      ar: `الـ grain عبارة عن <b>envelope</b> مضروب في <b>contents</b>. الـ <bdi>${dur} ms</bdi> تساوي <bdi>${d.Lg}</bdi> sample على <bdi>44.1 kHz</bdi>، والـ envelope بتاع <bdi>${name}</bdi> ${env === 'h' ? 'بيطلع نص الـ grain وينزل النص التاني (مثلث)' : `بيطلع وينزل على <bdi>${d.a}</bdi> sample في كل طرف`}، فمفيش clicks أو تشويش في الأول والآخر. ${ct === 'sine' ? `عرض الـ spectrum عند <bdi>−20 dB</bdi> حوالين <bdi>1 kHz</bdi> قده <b><bdi>${Math.round(d.bw)} Hz</bdi></b>. الـ attacks الأحدّ (<bdi>1/16 Dur</bdi>) والـ grains الأقصر بيدّوا <b>bandwidth أعرض</b>.` : 'والـ contents ممكن تيجي من أي مصدر: waveforms بسيطة أو samples.'}` };
    const X = f => 10 + f / 3000 * 300;
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['q', '1/4 Dur'], ['h', '1/2 Dur'], ['s', '1/16 Dur']]} mode=${env} set=${setEnv} />
      <${Modes} list=${[['sine', 'Contents: sine 1 kHz'], ['sample', 'Contents: a sample']]} mode=${ct} set=${setCt} />
      <${Slider} label="Duration" min=${2} max=${50} v=${dur} set=${setDur} out=${dur + ' ms'} />
      <${Lbl} l="<b>Grain</b> and its envelope (dashed)" r=${d.Lg + ' samples'} />
      <${Svg} h=${86}>${axis(43)}<path d=${line(d.g, 4, 316, 4, 82, -1.3, 1.3)} stroke="var(--k-mm)" strokeWidth="1.2" fill="none" /><path d=${line(d.e, 4, 316, 4, 82, -1.3, 1.3)} stroke="var(--pen)" strokeWidth="2.2" strokeDasharray="5 4" fill="none" /><//>
      <${Lbl} l="<b>Spectrum</b> (dB)" r="0 to 3 kHz" />
      <${Svg} h=${100}><path d=${`M10 ${sy(-20, -60, 0, 6, 80)} H310`} stroke="var(--faint)" strokeDasharray="3 4" />${axis(80, 10, 310)}<path d=${line(d.db, 10, 310, 6, 80, -60, 0)} stroke="var(--k-mm)" strokeWidth="2" fill="none" />
        ${ticks([[0, '0'], [1000, '1 kHz'], [2000, '2 kHz'], [3000, '3 kHz']], X, 80)}<//>
    <//>`;
  }

  /* ── [8.1, 8.5] slides 95–98: three ways to combine grains ── */
  const hann = u => u <= 0 || u >= 1 ? 0 : .5 - .5 * Math.cos(2 * Math.PI * u);
  function GrainModes({ ar }) {
    const [m, setM] = useState('quasi'), [seed, setSeed] = useState(1);
    const d = useMemo(() => {
      const n = 900;
      if (m === 'quasi') { const G = N(10, k => [k * .1 + .01, .08, 1]); return { G: [G], out: N(n, j => { const t = j / n; return G.reduce((s, [a, w, A]) => s + A * hann((t - a) / w), 0) * Math.sin(2 * Math.PI * 60 * t); }) }; }
      if (m === 'async') { const r = rng(seed * 13); const L3 = N(3, () => N(10, () => [r() * .92, .03 + r() * .06, .5 + r() * .5])); const all = L3.flat(); return { G: L3, out: N(n, j => { const t = j / n; return all.reduce((s, [a, w, A]) => s + A * hann((t - a) / w) * Math.sin(2 * Math.PI * (40 + 60 * A) * t), 0); }) }; }
      const p = 1 / 12, wv = t => Math.sin(2 * Math.PI * 12 * t) + .4 * Math.sin(2 * Math.PI * 24 * t + 1); const G = N(13, k => [(k - 1) * p, 2 * p, 1]);
      return { G: [G.filter((_, k) => k % 2 === 0), G.filter((_, k) => k % 2 === 1)], out: N(n, j => { const t = j / n; return G.reduce((s, [a, w]) => s + hann((t - a) / w), 0) * wv(t); }), wv };
    }, [m, seed]);
    const pk = Math.max(1, peak(d.out));
    const cap = m === 'quasi' ? { en: '<b>Quasi-synchronous</b>: a grain stream of <b>equal duration grains</b> at regular intervals. With grains shorter than 50 ms this produces <b>amplitude modulation</b>. Grain streams with variable delays between grains, summed, resemble asynchronous synthesis.', ar: 'الـ <b>Quasi-synchronous</b>: سلسلة grains <b>كلها نفس المدة</b> على مسافات منتظمة. ولو الـ grains أقصر من <bdi>50 ms</bdi> ده بيطلع <b>amplitude modulation</b>. ولو الـ streams فيها تأخير متغير بين الـ grains، مجموعها بيشبه الـ asynchronous.' }
      : m === 'async' ? { en: '<b>Asynchronous</b>: grains are distributed <b>stochastically</b> with no quasi regularity (random start, duration and amplitude). Thousands of such grains give a cloud, a soundscape rather than a single tone.', ar: 'الـ <b>Asynchronous</b>: الـ grains متوزعة <b>عشوائيًا</b> من غير أي انتظام (بداية ومدة و amplitude عشوائيين). آلاف من الـ grains دي بتعمل سحابة، soundscape مش نغمة واحدة.' }
      : { en: '<b>Pitch/Tempo-synchronous</b>: overlapping grain envelopes are <b>synchronous with the frequency of the grain waveform</b> (here each grain is two periods long and a new one starts every period), producing fewer artefacts. Used to preserve pitch or tempo while changing playback speed (e.g. Intakt, Kontakt).', ar: 'الـ <b>Pitch/Tempo-synchronous</b>: الـ envelopes المتداخلة بتاعة الـ grains <b>متزامنة مع الـ frequency بتاعة الـ waveform</b> (هنا كل grain طولها two periods وكل period بتبدأ واحدة جديدة)، فالـ artefacts بتقل. بتُستخدم عشان نحافظ على الـ pitch أو الـ tempo وإحنا بنغيّر سرعة التشغيل (زي Intakt و Kontakt).' };
    const lanes = d.G.length, LH = 30;
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['quasi', 'Quasi-synchronous'], ['async', 'Asynchronous'], ['pitch', 'Pitch-synchronous']]} mode=${m} set=${setM} />
      <${Lbl} l="<b>Grains</b> on the time line" r=${m === 'async' ? 'three streams' : ''} />
      <${Svg} h=${lanes * LH + 6}>${d.G.map((G, li) => html`<g key=${li}>${axis(li * LH + LH)}${G.map(([a, w, A], k) => html`<path key=${k} d=${fnp(u => A * hann(u), 0, 1, 30, 4 + a * 312, 4 + (a + w) * 312, li * LH + 4, li * LH + LH, 0, 1)} fill=${(k + li) % 2 ? 'var(--pen)' : 'var(--k-mm)'} opacity=".7" stroke="none" />`)}</g>`)}<//>
      <${Lbl} l="<b>Sum</b> of the grains" />
      <${Svg} h=${80}>${axis(40)}<path d=${line(d.out, 4, 316, 4, 76, -pk, pk)} stroke="var(--k-mm)" strokeWidth="1.3" fill="none" /><//>
      ${m === 'async' && html`<div className="mv5-row"><button className="fig-btn" onClick=${() => setSeed(s => s + 1)}>New random grains</button></div>`}
    <//>`;
  }

  /* ── [8.6] slides 99–101: granulation.m, 400 grains of 10–20 ms with 10 ms Hanning fades ── */
  function Granulation({ ar }) {
    const [nEv, setNEv] = useState(400), [seed, setSeed] = useState(1);
    const fs = 44100, Ly = fs, maxL = fs * .02, minL = fs * .01, Lw = fs * .01;
    const x = useMemo(() => N(Ly, k => { const t = k / fs, j = Math.min(2, Math.floor(t * 3)), f = [220, 330, 440][j], u = t - j / 3; return Math.exp(-u * 5) * Math.min(1, u * 200) * (.6 * Math.sin(2 * Math.PI * f * t) + .25 * Math.sin(4 * Math.PI * f * t)); }), []);
    const d = useMemo(() => {
      const r = rng(seed * 7 + 1), w = N(2 * Lw + 1, k => .5 * (1 - Math.cos(2 * Math.PI * (k + 1) / (2 * Lw + 2)))), y = new Float64Array(Ly); let g0 = null, L0 = 0, i0 = 0, o0 = 0;
      for (let e = 0; e < nEv; e++) {
        const L = Math.round((maxL - minL) * r()) + minL, ini = Math.ceil((Ly - maxL) * r()), out = Math.ceil((Ly - maxL) * r());
        const g = x.slice(Math.max(0, ini - 1), Math.max(0, ini - 1) + L);
        for (let k = 0; k < Lw; k++) g[k] *= w[k];
        for (let k = 0; k < Lw; k++) g[L - Lw + k] *= w[Lw + 1 + k];
        for (let k = 0; k < L; k++) y[out - 1 + k] += g[k];
        if (e === 0) { g0 = g; L0 = L; i0 = ini; o0 = out; }
      }
      return { y, g0, L0, i0, o0 };
    }, [nEv, seed]);
    const py = peak(d.y);
    const cap = { en: `granulation.m: <b>nEv = ${nEv}</b> grains, each of random length L between minL = fs × 0.01 = 441 and maxL = fs × 0.02 = 882 samples (10 to 20 ms), cut from a random place in the input (initIn) and added at a random place in the output (initOut). grainLn.m fades each grain in and out with a <b>Hanning</b> window of Lw = fs × 0.01 = 441 samples. ${nEv < 60 ? 'Few grains: they are separated by silences.' : 'Many overlapping grains: a sound texture, a cloud.'}`,
      ar: `في granulation.m عندنا <b><bdi>nEv = ${nEv}</bdi></b> grain، كل واحدة طولها L عشوائي بين <bdi>441</bdi> و <bdi>882</bdi> sample (من <bdi>10</bdi> لـ <bdi>20 ms</bdi>):` + L('minL = fs × 0.01 = 441 ; maxL = fs × 0.02 = 882') + `كل grain بتتقطع من مكان عشوائي في الـ input (initIn) وتتجمع في مكان عشوائي في الـ output (initOut). والـ grainLn.m بيعمل fade in و fade out لكل grain بـ <b>Hanning</b> window طولها <bdi>Lw = 441</bdi> sample. ${nEv < 60 ? 'الـ grains قليلة، فبينها فترات سكوت.' : 'فيه grains كتير متداخلة، فبيطلع sound texture، سحابة.'}` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Slider} label="Grains nEv" min=${10} max=${400} step=${10} v=${nEv} set=${setNEv} />
      <div className="mv5-row"><button className="fig-btn" onClick=${() => setSeed(s => s + 1)}>New random grains</button></div>
      <${Lbl} l="<b>Input x</b> (three notes)" r="1 s at 44.1 kHz" />
      <${Svg} h=${64}>${axis(32)}<path d=${band(x, 4, 316, 3, 61, -1, 1, 156)} fill="var(--graphite)" opacity=".7" /><rect x=${4 + d.i0 / Ly * 312} y="0" width=${Math.max(2, d.L0 / Ly * 312)} height="64" fill="var(--pen)" opacity=".5" /><//>
      <${Lbl} l="<b>Output y</b> = sum of the grains" r="red: grain 1" />
      <${Svg} h=${64}>${axis(32)}<path d=${band(Array.from(d.y), 4, 316, 3, 61, -py, py, 156)} fill="var(--k-mm)" opacity=".8" /><rect x=${4 + d.o0 / Ly * 312} y="0" width=${Math.max(2, d.L0 / Ly * 312)} height="64" fill="var(--pen)" opacity=".5" /><//>
      <${Lbl} l=${`<b>Grain 1</b>: L = ${d.L0} samples (${fx(d.L0 / 44.1, 1)} ms)`} r="scaled to fit" />
      <${Svg} h=${64}>${axis(32)}<path d=${line(d.g0, 4, 316, 3, 61, -peak(d.g0), peak(d.g0))} stroke="var(--k-mm)" strokeWidth="1.3" fill="none" /><//>
    <//>`;
  }

  /* ── [8.7] slides 103–106: PSOLA, moving, repeating and dropping overlapping segments ── */
  function Psola({ ar }) {
    const [sp, setSp] = useState(1.4), [du, setDu] = useState(1);
    const P0 = 40, M = 9;
    const x = useMemo(() => N(400, n => { const k = n % P0; return Math.exp(-k / 9) * Math.sin(2 * Math.PI * k / 15) + .15 * Math.sin(2 * Math.PI * n / P0); }), []);
    const seg = j => N(2 * P0, i => x[j * P0 + i] * hann((i + .5) / (2 * P0)));
    const Pn = Math.round(P0 * sp), C = Math.max(2, Math.round(M * du));
    const idx = N(C, q => Math.min(M - 1, Math.floor(q * M / C)));
    const len = 2 * P0 + (C - 1) * Pn, out = new Float64Array(len);
    idx.forEach((j, q) => { const s = seg(j), a = q * Pn; s.forEach((v, i) => { out[a + i] += v; }); });
    const span = Math.max(400, len), X = n => 4 + n / span * 312;
    const pitch = P0 / Pn, rep = C > M ? 'some segments are <b>repeated</b> (longer)' : C < M ? 'some segments are <b>eliminated</b> (shorter)' : 'each segment used once';
    const repA = C > M ? 'بعض الـ segments <b>بتتكرر</b> (أطول)' : C < M ? 'بعض الـ segments <b>بتتشال</b> (أقصر)' : 'كل segment مستخدمة مرة واحدة';
    const cap = { en: `PSOLA divides the waveform into <b>small overlapping segments</b> (two periods each, one per pitch period of ${P0} samples). Segments moved ${Pn > P0 ? '<b>further apart</b>' : Pn < P0 ? '<b>closer together</b>' : 'the same distance apart'} (every ${Pn} samples) → pitch × ${fx(pitch, 2)}, ${Pn > P0 ? 'lower' : Pn < P0 ? 'higher' : 'unchanged'}. ${C} segments from ${M}: ${rep}. They are recombined by <b>overlap-add</b>; unlike the phase vocoder there is no STFT. ${Pn > 2 * P0 ? 'Grains this far apart are separated by silences.' : ''}`,
      ar: `الـ PSOLA بيقسم الـ waveform لـ <b>segments صغيرة متداخلة</b> (كل واحدة two periods، واحدة لكل pitch period طوله <bdi>${P0}</bdi> sample). لما الـ segments ${Pn > P0 ? '<b>تبعد عن بعض</b>' : Pn < P0 ? '<b>تقرب من بعض</b>' : 'تفضل على نفس المسافة'} (كل <bdi>${Pn}</bdi> sample) الـ pitch بيتضرب في <bdi>${fx(pitch, 2)}</bdi>، يعني ${Pn > P0 ? 'بيوطى' : Pn < P0 ? 'بيعلى' : 'مبيتغيرش'}. عندنا <bdi>${C}</bdi> segment من <bdi>${M}</bdi>، يعني ${repA}. وبعدين بتتجمع بالـ <b>overlap-add</b>، ومن غير STFT عكس الـ phase vocoder. ${Pn > 2 * P0 ? 'ولما الـ grains تبعد كده بيبقى بينها سكوت.' : ''}` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Slider} label="Spacing" min=${.5} max=${2.5} step=${.05} v=${sp} set=${setSp} out=${Pn + ' smp'} />
      <${Slider} label="Duration" min=${.5} max=${2} step=${.25} v=${du} set=${setDu} out=${'× ' + du} />
      <${Lbl} l="<b>Input</b> and its overlapping segments" r=${`period ${P0} samples`} />
      <${Svg} h=${80}>${N(M, j => html`<path key=${j} d=${fnp(u => hann(u), 0, 1, 30, X(j * P0), X(j * P0 + 2 * P0), 6, 74, 0, 1.15)} stroke=${j % 2 ? 'var(--pen)' : 'var(--ok)'} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />`)}
        <path d=${line(x, X(0), X(399), 6, 74, -1.15, 1.15)} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" /><//>
      <${Lbl} l=${`<b>Output</b>: ${C} segments every ${Pn} samples, overlap-added`} r=${`${len} samples`} />
      <${Svg} h=${80}>${idx.map((j, q) => html`<path key=${q} d=${fnp(u => hann(u), 0, 1, 30, X(q * Pn), X(q * Pn + 2 * P0), 6, 74, 0, 1.15)} stroke=${j % 2 ? 'var(--pen)' : 'var(--ok)'} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />`)}
        <path d=${line(Array.from(out), X(0), X(len - 1), 6, 74, -1.15, 1.15)} stroke="var(--k-mm)" strokeWidth="1.5" fill="none" /><//>
    <//>`;
  }

  /* ── [9.2] slides 109–110: the Karplus-Strong loop ── */
  function KsDiagram({ ar }) {
    const steps = [
      { en: '<b>Input</b>: a burst of white noise, <b>L samples long</b> (other signals can be used).', ar: 'الـ <b>Input</b>: دفعة white noise <b>طولها L sample</b> (وممكن نستخدم إشارة تانية).' },
      { en: 'It goes to the <b>output</b> and is fed into a <b>delay line</b> of D samples.', ar: 'بتروح للـ <b>output</b> وكمان بتدخل <b>delay line</b> طوله D sample.' },
      { en: 'The output of the delay line is fed through a <b>filter</b>. Its gain must be <b>less than 1 at all frequencies</b>; usually a first-order low-pass filter.', ar: 'الـ output بتاع الـ delay line بيعدي على <b>filter</b>. الـ gain بتاعه لازم يبقى <b>أقل من 1 عند كل الـ frequencies</b>، وغالبًا بيبقى first-order low-pass filter.' },
      { en: 'The filtered output is simultaneously <b>mixed back into the output</b> and <b>fed back into the delay line</b>. Feedback, filtering and delay: essentially subtractive synthesis with a feedback loop like a comb filter. It makes a musical, plucked-string sound from noise.', ar: 'الـ output بعد الـ filter بيتخلط <b>تاني في الـ output</b> وفي نفس الوقت <b>بيرجع للـ delay line</b>. يعني feedback و filtering و delay: هو أساسًا subtractive synthesis فيه feedback loop زي الـ comb filter. وبيطلع من الـ noise صوت موسيقي زي وتر بيتشد.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const mv = !calm();
    const ln = (d, on, k) => html`<path key=${k} d=${d} stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${on ? 3 : 2} fill="none" markerEnd=${on ? 'url(#mv5-ks-a)' : 'url(#mv5-ks-g)'} className=${on && mv ? 'flow' : ''} />`;
    const box = (x, y, w, h, t1, t2, on) => html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="6" fill="var(--paper)" stroke=${on ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${on ? 3 : 2} /><text x=${x + w / 2} y=${y + (t2 ? 20 : 26)} textAnchor="middle" fontSize="15" fontWeight="600">${t1}</text>${t2 && html`<text x=${x + w / 2} y=${y + 38} textAnchor="middle" fontSize="15">${t2}</text>`}</g>`;
    const r = rng(6), nz = N(24, () => 2 * r() - 1);
    return html`<${Fig} ar=${ar} cap=${steps[i]} bar=${html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}>
      <${Svg} h=${178} label="Karplus-Strong: noise burst into an adder, output, delay line, filter, fed back">
        <defs>${[['a', 'var(--k-mm)'], ['g', 'var(--graphite)']].map(([k, c]) => html`<marker key=${k} id=${'mv5-ks-' + k} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`)}</defs>
        <rect x="4" y="16" width="70" height="46" rx="6" fill="var(--paper)" stroke=${i === 0 ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${i === 0 ? 3 : 2} />
        <path d=${line(nz, 10, 68, 22, 56)} stroke="var(--ink)" strokeWidth="1.3" fill="none" />
        <text x="39" y="80" textAnchor="middle" fontSize="15">noise, L</text>
        ${ln('M76 39 H106', i === 0, 1)}
        <circle cx="122" cy="39" r="15" fill="var(--paper)" stroke=${i === 3 ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth="2.5" /><text x="122" y="45" textAnchor="middle" fontSize="20" fontWeight="700">+</text>
        ${ln('M137 39 H306', i === 1 || i === 3, 2)}<text x="306" y="28" textAnchor="end" fontSize="15">output</text>
        ${ln('M228 39 V104', i === 1, 3)}
        ${box(184, 106, 92, 52, 'delay', 'D samples', i === 1)}
        ${ln('M184 132 H156', i === 2, 4)}
        ${box(60, 106, 94, 52, 'filter', 'gain < 1', i === 2)}
        ${ln('M107 106 V80 L118 56', i === 3, 5)}<//>
    <//>`;
  }

  /* ── [9.3–9.4] slides 111–114: karplus.m, fs = 44100, D = 200 → 220.5 Hz ── */
  function Karplus({ ar }) {
    const [mode, setMode] = useState('200'), [own, setOwn] = useState(150), [n, setN] = useState(16000), [play, setPlay] = useState(false);
    const D = mode === '200' ? 200 : mode === '100' ? 100 : own, fs = 44100, NN = 80000;
    const d = useMemo(() => {
      const r = rng(D + 3), dl = N(D, () => 2 * r() - 1), orig = dl.slice(), y = new Float64Array(NN), snaps = [orig.slice()]; let ptr = 0, z = 0;
      for (let k = 0; k < NN; k++) { y[k] = dl[ptr]; const o = .495 * y[k] + z; z = .495 * y[k]; dl[ptr] = o; ptr = (ptr + 1) % D; if ((k + 1) % 2000 === 0) snaps.push(dl.slice()); }
      let best = D, bv = -1e9; const ac = lag => { let s = 0; for (let k = 20000; k < 30000; k++) s += y[k] * y[k + lag]; return s; };
      const A = N(5, j => ac(D - 2 + j)); A.forEach((v, j) => { if (v > bv) { bv = v; best = D - 2 + j; } });
      const jj = best - (D - 2), a0 = A[jj - 1] ?? A[jj], a2 = A[jj + 1] ?? A[jj], den = a0 - 2 * A[jj] + a2, per = best + (den ? .5 * (a0 - a2) / den : 0);
      return { orig, y, snaps, per };
    }, [D]);
    const t = useAnim(play);
    useEffect(() => { if (play) { const v = Math.min(NN, Math.round(t * 20) * 2000); setN(v); if (v >= NN) setPlay(false); } }, [t]);
    const snap = d.snaps[Math.round(n / 2000)], pk = 1, zoom = n >= 3 * D ? Array.from(d.y.slice(n - 3 * D, n)) : null;
    const F1 = fs / D;
    const cap = { en: `Tuning: the period of the signal is the delay-line length plus the average group delay of the filter, and the fundamental is its reciprocal, so <b>D = Fs / F1</b>. With D = ${D}: F1 = 44100 / ${D} = <b>${fmt(F1, 2)} Hz</b>${mode === '200' ? ' (karplus.m)' : mode === '100' ? ', the A = 441 Hz case (D = 44100 / 441 = 100)' : ''}. The filter averages neighbouring samples with gain 0.99 &lt; 1, so at step n = ${n.toLocaleString('en-US')} the delay line is ${n ? 'smoother and smaller' : 'still white noise'}: high partials die first, like a plucked string.`,
      ar: `الضبط (tuning): الـ period بتاع الإشارة = طول الـ delay line زائد متوسط الـ group delay بتاع الـ filter، والـ fundamental هو مقلوبه، فبيطلع <bdi>D = Fs / F1</bdi>:` + L(`D = ${D} → F1 = 44100 / ${D} = ${fmt(F1, 2)} Hz`) + (mode === '200' ? 'ودي حالة karplus.m. ' : mode === '100' ? 'ودي حالة <bdi>A = 441 Hz</bdi> اللي محتاجة <bdi>D = 100</bdi>. ' : '') + `الـ filter بياخد متوسط الـ samples اللي جنب بعض بـ gain قده <bdi>0.99</bdi> (أقل من 1)، فعند الـ step رقم <bdi>${n.toLocaleString('en-US')}</bdi> الـ delay line ${n ? 'بقى أنعم وأصغر' : 'لسه white noise'}: الـ partials العالية بتموت الأول زي الوتر لما يتشد.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['200', 'D = 200 (karplus.m)'], ['100', 'D = 100 (A 441 Hz)'], ['own', 'Try your own']]} mode=${mode} set=${m => { setMode(m); setPlay(false); }} />
      ${mode === 'own' && html`<${Slider} label="Delay D" min=${20} max=${400} v=${own} set=${setOwn} out=${own + ' smp'} />`}
      <${Slider} label="Step n" min=${0} max=${NN} step=${2000} v=${n} set=${v => { setPlay(false); setN(v); }} out=${(n / 1000) + 'k'} />
      <div className="mv5-row"><button className="fig-btn solid" onClick=${() => { setN(0); setPlay(true); }}>▶ Run the loop</button></div>
      <${Lbl} l="<b>Original delayline</b>" r=${D + ' samples'} />
      <${Svg} h=${56}>${axis(28)}<path d=${line(d.orig, 4, 316, 3, 53)} stroke="var(--graphite)" strokeWidth="1.2" fill="none" /><//>
      <${Lbl} l=${`<b>Filter delayline step ${n.toLocaleString('en-US')}</b>`} />
      <${Svg} h=${56}>${axis(28)}<path d=${line(snap, 4, 316, 3, 53)} stroke="var(--k-mm)" strokeWidth="1.6" fill="none" /><//>
      <${Lbl} l=${`<b>Waveform step ${n.toLocaleString('en-US')}</b>`} r="80,000 samples" />
      <${Svg} h=${64}>${axis(32)}${n > 0 && html`<path d=${band(d.y, 4, 4 + 312 * n / NN, 3, 61, -pk, pk, Math.max(4, Math.round(156 * n / NN)), 0, n)} fill="var(--k-mm)" opacity=".8" />`}<//>
      ${zoom && html`<div><${Lbl} l="<b>Zoom</b>: the last three periods" r=${3 * D + ' samples'} /><${Svg} h=${56}>${axis(28)}<path d=${line(zoom, 4, 316, 3, 53, -peak(zoom), peak(zoom))} stroke="var(--k-mm)" strokeWidth="1.4" fill="none" />${[1, 2].map(j => html`<path key=${j} d=${`M${4 + j * 104} 0 V56`} stroke="var(--pen)" strokeDasharray="3 3" />`)}<//></div>`}
      <${Calc} rows=${[`F1 = Fs / D = 44100 / ${D} = <span class="mv5-res">${fmt(F1, 2)} Hz</span>`, `<span class="mv5-mut">period measured on the waveform: ${fx(d.per, 2)} samples (D plus the averaging filter's ½-sample group delay)</span>`]} />
    <//>`;
  }

  /* ── [9.5–9.6] slides 115–118: the drum variant, blend factor b and table length p ── */
  const KSP = { string: [200, .02, false], snare: [300, .5, false], crash: [500, .99, true], plink: [20, .99, true] };
  function KsDrum({ ar }) {
    const [pre, setPre] = useState('snare'), [p, setP] = useState(300), [b, setB] = useState(.5), [env, setEnv] = useState(false);
    const pick = k => { setPre(k); const [pp, bb, ee] = KSP[k]; setP(pp); setB(bb); setEnv(ee); };
    const own = f => v => { setPre('own'); f(v); };
    const d = useMemo(() => {
      const n = 22050, r = rng(p * 7 + Math.round(b * 100)), X = new Float64Array(n);
      for (let t = 0; t < p; t++) X[t] = 2 * r() - 1;
      for (let t = p; t < n; t++) { const a = .5 * (X[t - p] + X[t - p + 1]); X[t] = r() < b ? a : -a; }
      if (env) for (let t = 0; t < n; t++) X[t] *= Math.exp(-t / (44100 * .12));
      const rms = N(50, w => { let s = 0; for (let k = w * 441; k < (w + 1) * 441; k++) s += X[k] * X[k]; return Math.sqrt(s / 441); });
      const w1 = rms.findIndex(v => v < .01 * rms[0]);
      return { X, dec: w1 < 0 ? null : w1 * .01 };
    }, [p, b, env]);
    const nm = { string: 'String', snare: 'Snare', crash: 'Crash cymbal', plink: 'Metallic plink' }[pre];
    const cap = { en: `Start with a wavetable X of length <b>p = ${p}</b> (here random). For t &gt; p, X(t) = +½(X(t − p) + X(t − p + 1)) with probability <b>b = ${fx(b, 2)}</b>, else −½(…). p sets the decay (big = long) and the pitch somewhat (big = low); b is the <b>blend factor</b> (b = ½ makes the best snare). ${pre !== 'own' ? `<b>${nm}</b> preset: ${pre === 'crash' ? 'b &gt; 0.98, p = 200 to 800, random table, decaying envelope.' : pre === 'plink' ? 'b &gt; 0.98, p = 5 to 50, random table, envelope decay.' : pre === 'string' ? 'b &lt; 0.05, p = 20 to 400, random table.' : 'b = ½, p in 150 to 500.'} ` : ''}It falls to 1% of its start level after <b>${d.dec == null ? 'more than 0.5 s' : fx(d.dec, 2) + ' s'}</b>.`,
      ar: `بنبدأ بـ wavetable اسمه X طوله <bdi>p = ${p}</bdi> (هنا عشوائي). ولكل t أكبر من p بنحسب المتوسط بالموجب باحتمال <bdi>b = ${fx(b, 2)}</bdi> وبالسالب غير كده:` + L('X(t) = ±½(X(t − p) + X(t − p + 1))') + `الـ p بيحدد الـ decay (كبير يعني طويل) وشوية الـ pitch (كبير يعني واطي)، والـ b هو الـ <b>blend factor</b> (لما <bdi>b = ½</bdi> بيطلع أحسن snare). ${pre !== 'own' ? `الـ preset بتاع الـ <b>${nm}</b>:` + L(pre === 'crash' ? 'b > 0.98, p = 200–800, random table, decaying envelope' : pre === 'plink' ? 'b > 0.98, p = 5–50, random table, envelope decay' : pre === 'string' ? 'b < 0.05, p = 20–400, random table' : 'b = ½, p = 150–500') : ''}الصوت بينزل لـ 1% من مستواه الأول بعد <b><bdi>${d.dec == null ? '> 0.5 s' : fx(d.dec, 2) + ' s'}</bdi></b>.` };
    return html`<${Fig} ar=${ar} cap=${cap}>
      <${Modes} list=${[['snare', 'Snare'], ['crash', 'Crash cymbal'], ['plink', 'Metallic plink'], ['string', 'String']]} mode=${pre} set=${pick} />
      <${Slider} label="Length p" min=${5} max=${800} v=${p} set=${own(setP)} />
      <${Slider} label="Blend b" min=${0} max=${1} step=${.01} v=${b} set=${own(setB)} out=${fx(b, 2)} />
      <div className="mv5-checks"><label><input type="checkbox" checked=${env} onChange=${() => { setPre('own'); setEnv(v => !v); }} />Decaying envelope</label></div>
      <${Lbl} l="<b>Output</b>" r="0.5 s at 44.1 kHz" />
      <${Svg} h=${70}>${axis(35)}<path d=${band(d.X, 4, 316, 3, 67, -1, 1, 156)} fill="var(--k-mm)" opacity=".8" /><//>
      <${Lbl} l="<b>Zoom</b>: 20 ms from 0.05 s" />
      <${Svg} h=${60}>${axis(30)}<path d=${line(Array.from(d.X.slice(2205, 3087)), 4, 316, 3, 57, -peak(d.X.slice(2205, 3087)), peak(d.X.slice(2205, 3087)))} stroke="var(--k-mm)" strokeWidth="1.2" fill="none" /><//>
    <//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-5-bowed': Bowed, 'mm-5-vocal': Vocal, 'mm-5-noise': Noise, 'mm-5-control': Control, 'mm-5-adsr': Adsr, 'mm-5-butter': Butter, 'mm-5-synth-saw': SynthSaw,
    'mm-5-partials': Partials, 'mm-5-square': Square, 'mm-5-paint': Paint,
    'mm-5-fm-basic': FmBasic, 'mm-5-bessel': Bessel, 'mm-5-fm-algo': FmAlgo, 'mm-5-fm-eg': FmEg, 'mm-5-fm-ratio': FmRatio,
    'mm-5-loop': Loop, 'mm-5-multi': Multi, 'mm-5-velocity': Velocity, 'mm-5-keyswitch': Keyswitch,
    'mm-5-beat': BeatEnergy, 'mm-5-subbands': Subbands, 'mm-5-slices': Slices, 'mm-5-tempo': Tempo,
    'mm-5-wavetable': Wavetable, 'mm-5-attack-loop': AttackLoop, 'mm-5-seq-env': SeqEnv, 'mm-5-crossfade': Crossfade,
    'mm-5-grain': Grain, 'mm-5-grain-modes': GrainModes, 'mm-5-granulation': Granulation, 'mm-5-psola': Psola,
    'mm-5-ks-diagram': KsDiagram, 'mm-5-karplus': Karplus, 'mm-5-ks-drum': KsDrum
  });
})();
/* ── part L6 ── */
// Multimedia visuals, Lecture 6 (MIDI and MPEG-4 Structured Audio): MIDI as instructions, the MIDI system, concepts and ports (slides 2–15),
// message bytes, classification, the voice-message table, decoding and sizing (16–22), system messages, GM maps (23–33), MSB/LSB, Structured Audio tools, AudioBIFS (34–48).
// Every label and number comes from the site's notes or the slides they came from; results are computed with the course's rules.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.mv6{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }
.mv6 .fig-btn.sel{ border-color:var(--k-mm); box-shadow:0 0 0 1px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.mv6 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mv6-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mv6-chips .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.mv6-k{ color:var(--k-mm); font-weight:700; }
.mv6-mono{ font-family:var(--mono); }
.mv6-small{ font-size:.82rem; color:var(--graphite); text-align:center; margin:8px auto 0; max-width:520px; line-height:1.4; }
.mv6-dim{ opacity:.35; transition:opacity .4s, box-shadow .4s, border-color .4s; }
.mv6-on{ opacity:1; }
/* cards and flows */
.mv6-card{ border:1.5px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.4; color:var(--ink); transition:opacity .4s, box-shadow .4s, border-color .4s; }
.mv6-card > b{ display:block; font-size:.92rem; margin-bottom:2px; }
.mv6-card .sub{ color:var(--graphite); font-size:.82rem; display:block; }
.mv6-card.hi{ border-color:var(--k-mm); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-mm) 40%, transparent); }
.mv6-card.lo{ opacity:.35; }
.mv6-flow{ display:grid; gap:0; max-width:520px; margin:0 auto; }
.mv6-arr{ height:26px; display:grid; place-items:center; position:relative; }
.mv6-arr i{ width:3px; height:100%; background:var(--line); position:relative; display:block; }
.mv6-arr i::after{ content:""; position:absolute; left:-5px; bottom:-1px; border:6.5px solid transparent; border-top-color:var(--line); border-bottom:0; }
.mv6-arr.go i{ background:repeating-linear-gradient(180deg, var(--k-mm) 0 6px, transparent 6px 11px); background-size:3px 22px; animation:mv6down .8s linear infinite; }
.mv6-arr.go i::after{ border-top-color:var(--k-mm); }
@keyframes mv6down{ to{ background-position:0 22px; } }
.mv6-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; }
/* bytes and bits */
.mv6-bytes{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin:0 0 10px; }
.mv6-byte{ font:700 1.35rem var(--mono); padding:6px 12px; border-radius:8px; border:2px solid var(--line); background:var(--paper); color:var(--ink); transition:border-color .4s, background .4s; }
.mv6-byte.st{ border-color:var(--k-mm); background:color-mix(in srgb, var(--k-mm) 16%, var(--paper)); }
.mv6-byte.cur{ box-shadow:0 0 0 3px color-mix(in srgb, var(--k-mm) 45%, transparent); }
.mv6-bitrow{ display:grid; grid-template-columns:44px repeat(8, minmax(0, 1fr)); gap:3px; align-items:center; max-width:420px; margin:0 auto 6px; }
.mv6-bitrow > span:first-child{ font:700 .95rem var(--mono); color:var(--ink); }
.mv6-bit{ height:34px; border-radius:5px; border:1px solid var(--line); background:var(--paper); display:grid; place-items:center; font:700 1rem var(--mono); color:var(--ink); transition:background .4s, opacity .4s; }
.mv6-bit.m{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
.mv6-bit.t{ background:color-mix(in srgb, var(--k-mm) 26%, var(--paper)); }
.mv6-bit.c{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); }
.mv6-bit.d{ background:color-mix(in srgb, var(--k-mm) 12%, var(--paper)); }
.mv6-bit.lo{ opacity:.35; }
.mv6-brace{ display:grid; grid-template-columns:44px 1fr 3fr 4fr; gap:3px; max-width:420px; margin:0 auto 8px; font-size:.8rem; text-align:center; color:var(--graphite); line-height:1.2; }
.mv6-brace span{ border-top:2px solid var(--line); padding-top:3px; }
.mv6-brace span.m{ border-color:var(--pen); } .mv6-brace span.t{ border-color:var(--k-mm); } .mv6-brace span.c{ border-color:var(--ok); }
.mv6-calc{ max-width:440px; margin:10px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font:500 .86rem/1.6 var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.mv6-calc div{ padding:0 2px; } .mv6-calc .mv6-res{ color:var(--k-mm); font-weight:700; } .mv6-calc .note{ font-family:var(--body); color:var(--graphite); font-size:.84rem; }
.mv6-calc .err{ color:var(--pen); font-weight:700; font-family:var(--body); }
.mv6-calc .hd{ font-family:var(--body); font-weight:700; margin-top:4px; }
.mv6-calc .hd:first-child{ margin-top:0; }
/* tree */
.mv6-tree{ max-width:440px; margin:0 auto; font-size:.9rem; color:var(--ink); }
.mv6-tree ul{ list-style:none; margin:0; padding:0 0 0 18px; border-left:2px solid var(--line); margin-left:12px; }
.mv6-tree li{ position:relative; margin:6px 0; transition:opacity .45s, transform .45s; }
.mv6-tree li::before{ content:""; position:absolute; left:-18px; top:18px; width:16px; border-top:2px solid var(--line); }
.mv6-tree .nd{ display:inline-block; border:1.5px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 10px; font-weight:600; }
.mv6-tree .nd small{ display:block; font-weight:400; font-size:.8rem; color:var(--graphite); font-family:var(--mono); }
.mv6-tree .nd.hi{ border-color:var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.mv6-tree li.off{ opacity:0; transform:translateY(6px); }
.mv6-tree > .nd{ margin-bottom:2px; }
/* forms */
.mv6-form{ display:grid; gap:8px; max-width:440px; margin:0 auto; font-size:.86rem; color:var(--ink); }
.mv6-form label{ display:grid; grid-template-columns:minmax(0, 1fr) auto; gap:2px 8px; align-items:center; font-weight:600; }
.mv6-form label input[type=range]{ grid-column:1 / -1; width:100%; accent-color:var(--k-mm); }
.mv6-form label .v{ font-family:var(--mono); color:var(--k-mm); font-weight:700; }
.mv6-form select, .mv6-in{ box-sizing:border-box; min-width:0; width:100%; font:inherit; font-size:.95rem; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.mv6-in{ font-family:var(--mono); font-size:1.05rem; letter-spacing:.04em; }
.mv6-form select:focus, .mv6-in:focus{ outline:2px solid var(--k-mm); outline-offset:1px; }
.mv6-tbl{ border-collapse:collapse; width:100%; max-width:520px; margin:0 auto; font-size:.84rem; color:var(--ink); }
.mv6-tbl th, .mv6-tbl td{ border:1px solid var(--line); padding:5px 4px; text-align:center; vertical-align:middle; }
.mv6-tbl th{ background:var(--paper-2); font-weight:600; }
.mv6-tbl td{ background:var(--paper); cursor:pointer; }
.mv6-tbl td.n{ text-align:left; }
.mv6-tbl tr.on td{ background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); font-weight:600; }
/* bars */
.mv6-bars{ display:grid; gap:6px; max-width:520px; margin:10px auto 0; font-size:.84rem; color:var(--ink); }
.mv6-bars .b{ display:grid; grid-template-columns:76px minmax(0, 1fr); gap:8px; align-items:center; }
.mv6-bars .b > div{ background:var(--paper); border:1px solid var(--line); border-radius:6px; height:22px; overflow:hidden; }
.mv6-bars .b > div i{ display:block; height:100%; min-width:3px; transition:width .6s; }
.mv6-bars .val{ grid-column:2; font:600 .84rem var(--mono); color:var(--ink); margin-top:-2px; }
/* grids of buttons */
.mv6-grid{ display:grid; gap:4px; max-width:440px; margin:0 auto; }
.mv6-grid button{ font:600 .84rem var(--mono); border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); cursor:pointer; min-height:34px; padding:2px; min-width:0; transition:background .3s, box-shadow .3s; }
.mv6-grid button.sel{ box-shadow:0 0 0 2px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 22%, var(--paper)); }
.mv6-grid button.na{ color:var(--graphite); opacity:.55; }
.mv6-fam{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:4px; max-width:440px; margin:0 auto; }
.mv6-fam button{ font:inherit; font-size:.82rem; text-align:left; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); cursor:pointer; padding:5px 6px; min-height:34px; line-height:1.2; }
.mv6-fam button small{ font-family:var(--mono); color:var(--graphite); font-size:.78rem; display:block; }
.mv6-fam button.sel{ box-shadow:0 0 0 2px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); }
.mv6-progs{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:4px; max-width:440px; margin:10px auto 0; }
.mv6-progs button{ font:inherit; font-size:.82rem; text-align:left; border:1px solid var(--line); border-radius:6px; background:var(--paper-2); color:var(--ink); cursor:pointer; padding:4px 6px; min-height:32px; display:flex; gap:6px; align-items:center; min-width:0; }
.mv6-progs button b{ font-family:var(--mono); color:var(--k-mm); flex:none; }
.mv6-progs button.sel{ box-shadow:0 0 0 2px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); }
.mv6-out{ max-width:440px; margin:10px auto 0; text-align:center; font-size:.92rem; color:var(--ink); line-height:1.5; }
.mv6-out .big{ display:block; font:700 1.3rem var(--mono); color:var(--k-mm); }
/* sequencer and synth */
.mv6-seq{ display:grid; gap:4px; }
.mv6-trk{ display:grid; grid-template-columns:auto minmax(0, 1fr) auto; gap:6px; align-items:center; border:1px solid var(--line); border-radius:8px; padding:4px 6px; background:var(--paper-2); font-size:.84rem; transition:opacity .3s; }
.mv6-trk.off{ opacity:.45; }
.mv6-trk button{ font:600 .8rem var(--body); border:1px solid var(--line); border-radius:99px; padding:2px 8px; min-height:28px; background:var(--paper); color:var(--ink); cursor:pointer; }
.mv6-trk button.on{ background:var(--fig-s, var(--s-mm)); color:#fff; border-color:transparent; }
.mv6-trk .ch{ font:700 .8rem var(--mono); padding:2px 6px; border-radius:5px; background:var(--paper); border:1px solid var(--line); white-space:nowrap; }
.mv6-tag{ display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:4px; vertical-align:middle; }
.mv6-voices{ display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:3px; margin-top:6px; }
.mv6-voices div{ height:34px; border-radius:5px; border:1px solid var(--line); background:var(--paper-2); display:grid; place-items:center; font:700 .8rem var(--mono); color:#fff; transition:background .3s; }
.mv6-voices div.free{ color:var(--graphite); font-weight:500; }
.mv6-hl{ outline:2px solid var(--k-mm); outline-offset:2px; border-radius:6px; }
/* serial wire */
.mv6-wire{ display:grid; grid-template-columns:repeat(10, minmax(0, 1fr)); gap:2px; width:100%; }
.mv6-wire div{ height:30px; border-radius:4px; border:1px solid var(--line); background:var(--paper); display:grid; place-items:center; font:700 .8rem var(--mono); color:var(--ink); transition:background .2s; }
.mv6-wire div.ss{ background:var(--paper-2); color:var(--graphite); }
.mv6-wire div.on{ background:color-mix(in srgb, var(--k-mm) 40%, var(--paper)); }
.mv6-wire div.done{ background:color-mix(in srgb, var(--k-mm) 16%, var(--paper)); }
.mv6-frame{ display:grid; grid-template-columns:52px minmax(0, 1fr); gap:6px; align-items:center; max-width:440px; margin:0 auto 6px; font-size:.82rem; }
.mv6-frame > span{ font:700 .95rem var(--mono); color:var(--k-mm); }
.mv6-meter{ height:8px; border-radius:99px; background:var(--paper); border:1px solid var(--line); overflow:hidden; max-width:440px; margin:8px auto 0; }
.mv6-meter i{ display:block; height:100%; background:var(--k-mm); }
/* system byte map */
.mv6-sys{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:4px; max-width:360px; margin:0 auto; }
.mv6-sys button{ font:700 .95rem var(--mono); border:1.5px solid var(--line); border-radius:6px; cursor:pointer; min-height:40px; color:var(--ink); background:var(--paper); }
.mv6-sys button.ex{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
.mv6-sys button.co{ background:color-mix(in srgb, var(--k-mm) 22%, var(--paper)); }
.mv6-sys button.rt{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); }
.mv6-sys button.un{ color:var(--graphite); opacity:.5; }
.mv6-sys button.sel{ border-color:var(--ink); box-shadow:0 0 0 2px var(--k-mm); }
.mv6-leg{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.82rem; color:var(--ink); margin:8px 0 0; }
.mv6-leg i{ display:inline-block; width:12px; height:12px; border-radius:3px; margin-right:5px; vertical-align:-1px; border:1px solid var(--line); }
.mv6-stream{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin:10px auto 0; font:700 .84rem var(--mono); }
.mv6-stream span{ border:1px solid var(--line); border-radius:5px; padding:5px 6px; background:var(--paper); color:var(--ink); }
.mv6-stream span.ex{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
/* svg */
.mv6 svg text{ font-family:var(--body); }
.mv6-svg{ max-width:360px !important; }
@media (prefers-reduced-motion: reduce){ .mv6-arr.go i{ animation:none; } .mv6-tree li, .mv6-card, .mv6-bit{ transition:none; } }
`;
  if (!document.getElementById('mv6-css')) { const s = document.createElement('style'); s.id = 'mv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  // helpers
  const N = (n, f) => Array.from({ length: n }, (_, k) => f(k));
  const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');
  const B8 = n => n.toString(2).padStart(8, '0');
  const fmt = x => x.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const hexCalc = n => `${H2(n)} = ${Math.floor(n / 16)}×16 + ${n % 16} = ${n}`;
  const Arrow = ({ go }) => html`<div className=${'mv6-arr' + (go && !calm() ? ' go' : '')} aria-hidden="true"><i></i></div>`;
  const arrowDef = (id, c) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`;

  // slide 20: channel voice messages
  const VOICE = [
    ['Note off', 0x8, 'Key number', 'Note off velocity'],
    ['Note on', 0x9, 'Key number', 'Note on velocity'],
    ['Polyphonic key pressure', 0xA, 'Key number', 'Amount of pressure'],
    ['Control change', 0xB, 'Controller number', 'Controller value'],
    ['Program change', 0xC, 'Program number', null],
    ['Channel pressure', 0xD, 'Pressure value', null],
    ['Pitch bend', 0xE, 'MSB', 'LSB']
  ];
  // slides 24 to 26: system messages [name, group, data bytes]
  const SYS = {
    0xF0: ['Sysex Start', 'ex', null], 0xF7: ['Sysex End', 'ex', null],
    0xF1: ['MIDI Timing Code', 'co', 1], 0xF2: ['Song Position Pointer', 'co', 2], 0xF3: ['Song Select', 'co', 1], 0xF6: ['Tune Request', 'co', 0],
    0xF8: ['Timing Clock', 'rt', 0], 0xFA: ['Start Sequence', 'rt', 0], 0xFB: ['Continue Sequence', 'rt', 0], 0xFC: ['Stop Sequence', 'rt', 0], 0xFE: ['Active Sensing', 'rt', 0], 0xFF: ['System Reset', 'rt', 0]
  };
  const GRP = { ex: ['System exclusive', 'الـ System exclusive'], co: ['System common', 'الـ System common'], rt: ['System real-time', 'الـ System real-time'] };
  // slides 29 to 31: GM instrument patch map
  const FAM = ['Piano', 'Chromatic Percussion', 'Organ', 'Guitar', 'Bass', 'Strings', 'Ensemble', 'Brass', 'Reed', 'Pipe', 'Synth Lead', 'Synth Pad', 'Synth Effects', 'Ethnic', 'Percussive', 'Sound Effects'];
  const PROG = ['Acoustic Grand', 'Bright Acoustic', 'Electric Grand', 'Honky-Tonk', 'Electric Piano 1', 'Electric Piano 2', 'Harpsichord', 'Clav',
    'Celesta', 'Glockenspiel', 'Music Box', 'Vibraphone', 'Marimba', 'Xylophone', 'Tubular Bells', 'Dulcimer',
    'Drawbar Organ', 'Percussive Organ', 'Rock Organ', 'Church Organ', 'Reed Organ', 'Accordion', 'Harmonica', 'Tango Accordian',
    'Acoustic Guitar(nylon)', 'Acoustic Guitar(steel)', 'Electric Guitar(jazz)', 'Electric Guitar(clean)', 'Electric Guitar(muted)', 'Overdriven Guitar', 'Distortion Guitar', 'Guitar Harmonics',
    'Acoustic Bass', 'Electric Bass(finger)', 'Electric Bass(pick)', 'Fretless Bass', 'Slap Bass 1', 'Slap Bass 2', 'Synth Bass 1', 'Synth Bass 2',
    'Violin', 'Viola', 'Cello', 'Contrabass', 'Tremolo Strings', 'Pizzicato Strings', 'Orchestral Strings', 'Timpani',
    'String Ensemble 1', 'String Ensemble 2', 'SynthStrings 1', 'SynthStrings 2', 'Choir Aahs', 'Voice Oohs', 'Synth Voice', 'Orchestra Hit',
    'Trumpet', 'Trombone', 'Tuba', 'Muted Trumpet', 'French Horn', 'Brass Section', 'SynthBrass 1', 'SynthBrass 2',
    'Soprano Sax', 'Alto Sax', 'Tenor Sax', 'Baritone Sax', 'Oboe', 'English Horn', 'Bassoon', 'Clarinet',
    'Piccolo', 'Flute', 'Recorder', 'Pan Flute', 'Blown Bottle', 'Skakuhachi', 'Whistle', 'Ocarina',
    'Lead 1 (square)', 'Lead 2 (sawtooth)', 'Lead 3 (calliope)', 'Lead 4 (chiff)', 'Lead 5 (charang)', 'Lead 6 (voice)', 'Lead 7 (fifths)', 'Lead 8 (bass+lead)',
    'Pad 1 (new age)', 'Pad 2 (warm)', 'Pad 3 (polysynth)', 'Pad 4 (choir)', 'Pad 5 (bowed)', 'Pad 6 (metallic)', 'Pad 7 (halo)', 'Pad 8 (sweep)',
    'FX 1 (rain)', 'FX 2 (soundtrack)', 'FX 3 (crystal)', 'FX 4 (atmosphere)', 'FX 5 (brightness)', 'FX 6 (goblins)', 'FX 7 (echoes)', 'FX 8 (sci-fi)',
    'Sitar', 'Banjo', 'Shamisen', 'Koto', 'Kalimba', 'Bagpipe', 'Fiddle', 'Shanai',
    'Tinkle Bell', 'Agogo', 'Steel Drums', 'Woodblock', 'Taiko Drum', 'Melodic Tom', 'Synth Drum', 'Reverse Cymbal',
    'Guitar Fret Noise', 'Breath Noise', 'Seashore', 'Bird Tweet', 'Telephone Ring', 'Helicopter', 'Applause', 'Gunshot'];
  // slide 32: GM percussion key map, keys 35 to 81
  const PERC = ['Acoustic Bass Drum', 'Bass Drum 1', 'Side Stick', 'Acoustic Snare', 'Hand Clap', 'Electric Snare', 'Low Floor Tom', 'Closed Hi-Hat', 'High Floor Tom', 'Pedal Hi-Hat',
    'Low Tom', 'Open Hi-Hat', 'Low-Mid Tom', 'Hi-Mid Tom', 'Crash Cymbal 1', 'High Tom', 'Ride Cymbal 1', 'Chinese Cymbal', 'Ride Bell', 'Tambourine', 'Splash Cymbal', 'Cowbell',
    'Crash Cymbal 2', 'Vibraslap', 'Ride Cymbal 2', 'Hi Bongo', 'Low Bongo', 'Mute Hi Conga', 'Open Hi Conga', 'Low Conga', 'High Timbale', 'Low Timbale', 'High Agogo', 'Low Agogo',
    'Cabasa', 'Maracas', 'Short Whistle', 'Long Whistle', 'Short Guiro', 'Long Guiro', 'Claves', 'Hi Wood Block', 'Low Wood Block', 'Mute Cuica', 'Open Cuica', 'Mute Triangle', 'Open Triangle'];

  /* ── slides 2–3: MIDI sends instructions, the client makes the sound ── */
  function Instr({ ar }) {
    const steps = [
      { en: '<b>Recorded audio</b> sends the sound itself: samples, one after the other. One second of stereo CD audio is 44100 × 16 × 2 / 8 = <b>176,400 bytes</b>.', ar: 'الـ <b>audio المتسجل</b> بيبعت الصوت نفسه: samples ورا بعض. ثانية واحدة من الـ stereo CD audio حجمها<span class="ltr">44100 × 16 × 2 / 8 = 176,400 bytes</span>' },
      { en: '<b>MIDI</b> sends <b>instructions</b> instead of audio samples: which note, how loud, which channel (what sound). A Note On is just <b>3 bytes</b>: 9C 50 7F.', ar: 'الـ <b>MIDI</b> بيبعت <b>تعليمات</b> بدل الـ audio samples: أنهي note، بصوت عالي قد إيه، وعلى أنهي channel (أنهي صوت). الـ Note On عبارة عن <b>3 bytes</b> بس: <bdi>9C 50 7F</bdi>.' },
      { en: 'The <b>responsibility of producing the sound is moved to the client</b>: a synthesiser module, sampler, soundcard or software synth turns the instructions into sound.', ar: '<b>مسؤولية إنتاج الصوت بتتنقل للـ client</b>: الـ synthesiser module أو الـ sampler أو الـ soundcard أو الـ software synth بيحوّل التعليمات لصوت.' },
      { en: 'So a MIDI file needs only a few 100K bytes and very low bandwidth: MIDI works as a <b>compression tool</b> (and a compression control language in MPEG-4 and HTML5).', ar: 'عشان كده ملف الـ MIDI محتاج كام 100K bytes بس و bandwidth قليلة جدًا: الـ MIDI بيشتغل كـ <b>compression tool</b> (وكـ compression control language في الـ MPEG-4 والـ HTML5).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const W = 300, wave = N(61, k => { const t = k / 60; return [10 + t * 280, 46 - 30 * Math.sin(2 * Math.PI * 4 * t) * Math.exp(-t * 1.6)]; });
    const wpath = 'M' + wave.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className=${'mv6-card' + (i === 0 ? ' hi' : i >= 1 ? ' lo' : '')} style=${{ maxWidth: '440px', margin: '0 auto' }}>
        <b>Audio: the samples themselves</b>
        <svg viewBox=${`0 0 ${W} 92`} aria-hidden="true" style=${{ width: '100%', height: 'auto', display: 'block' }}>
          <path d="M10 46 H290" stroke="var(--faint)" />
          ${wave.map((p, k) => html`<g key=${k}><path d=${`M${p[0].toFixed(1)} 46 V${p[1].toFixed(1)}`} stroke="var(--graphite)" strokeWidth="1.2" /><circle cx=${p[0]} cy=${p[1]} r="2.2" fill="var(--k-mm)" /></g>`)}
        </svg>
        <span className="sub">1 s of stereo CD audio = <b className="mv6-mono">176,400</b> bytes</span>
      </div>
      <${Arrow} go=${false} />
      <div className=${'mv6-card' + (i === 1 ? ' hi' : i === 0 ? ' lo' : '')} style=${{ maxWidth: '440px', margin: '0 auto' }}>
        <b>MIDI: instructions</b>
        <div className="mv6-bytes" style=${{ margin: '6px 0 4px' }}>
          <span className="mv6-byte st">9C</span><span className="mv6-byte">50</span><span className="mv6-byte">7F</span></div>
        <span className="sub" style=${{ textAlign: 'center' }}>Note On · channel 13 · key 80 · velocity 127 = <b className="mv6-mono">3</b> bytes</span>
      </div>
      <${Arrow} go=${i >= 2} />
      <div className=${'mv6-card' + (i === 2 || i === 3 ? ' hi' : ' lo')} style=${{ maxWidth: '440px', margin: '0 auto' }}>
        <b>Client produces the sound</b>
        <span className="sub">synthesiser module · sampler · soundcard · software synth</span>
        <svg viewBox=${`0 0 ${W} 92`} aria-hidden="true" style=${{ width: '100%', height: 'auto', display: 'block' }} className=${pop(i >= 2)}>
          <path d="M10 46 H290" stroke="var(--faint)" /><path d=${wpath} stroke="var(--k-mm)" strokeWidth="2.6" fill="none" />
        </svg>
      </div>
      <p className=${'mv6-small ' + pop(i >= 3)}><b>MIDI = compression tool</b>: a few 100K bytes, very low bandwidth.</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 6–12: the components of a MIDI system ── */
  function System({ ar }) {
    const steps = [
      { en: 'A <b>MIDI system</b>: data travels from the control input devices, through an interface, to the computer, and out to the devices that make sound or do other things.', ar: 'الـ <b>MIDI system</b>: الـ data بتمشي من الـ control input devices، عن طريق interface، للكمبيوتر، وبعدين للأجهزة اللي بتطلّع صوت أو بتعمل حاجات تانية.' },
      { en: '<b>MIDI control input devices</b>: usually a keyboard with extra controls (sustain, pitch bend, modulation, aftertouch), or another instrument (customised guitar, wind controller), a bunch of controllers, motion capture, even "mind control".', ar: 'الـ <b>MIDI control input devices</b>: غالبًا keyboard عليه controls زيادة (sustain و pitch bend و modulation و aftertouch)، أو آلة تانية (guitar متعدّلة أو wind controller)، أو مجموعة controllers، أو motion capture، وحتى "mind control".' },
      { en: '<b>MIDI interfaces</b> connect MIDI devices to the computer, wired or wireless: MIDI cable, USB, Ethernet, Bluetooth or WiFi. Often bundled into the keyboard or an audio interface.', ar: 'الـ <b>MIDI interfaces</b> بتوصّل أجهزة الـ MIDI بالكمبيوتر، سلكي أو لاسلكي: MIDI cable أو USB أو Ethernet أو Bluetooth أو WiFi. وغالبًا بتبقى جوّه الـ keyboard أو الـ audio interface.' },
      { en: 'The <b>computer</b> is the heart of the system: it controls scheduling, synchronisation and recording of all data. The <b>sequencer</b> (hardware or software) now lives inside Digital Audio Workstations (Cubase, Logic, Sonar, Live, Reason).', ar: 'الـ <b>computer</b> هو قلب الـ system: بيتحكم في الـ scheduling والـ synchronisation وتسجيل كل الـ data. والـ <b>sequencer</b> (hardware أو software) بقى جوّه الـ Digital Audio Workstations زي Cubase و Logic و Sonar و Live و Reason.' },
      { en: 'The <b>synthesiser / sampler</b> is the tone generation unit: it makes the sound (pitch, loudness, tone colour). It has MIDI IN/OUT and/or USB/Bluetooth/WiFi, and can be software (softsynths such as VSTi, Audio Units).', ar: 'الـ <b>synthesiser / sampler</b> هو الـ tone generation unit: بيطلّع الصوت (pitch و loudness و tone colour). عنده MIDI IN/OUT و/أو USB/Bluetooth/WiFi، وممكن يبقى software (softsynths زي VSTi و Audio Units).' },
      { en: '<b>MIDI control output devices</b>: MIDI controls more than sound: lighting, robotics (Pat Metheny\'s Orchestrion), video systems (video DJing), MPEG-4 compression, even "hamster control".', ar: 'الـ <b>MIDI control output devices</b>: الـ MIDI بيتحكم في حاجات غير الصوت: الإضاءة، والـ robotics (الـ Orchestrion بتاع Pat Metheny)، والـ video systems (الـ video DJing)، والـ MPEG-4 compression، وحتى "hamster control".' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const c = k => 'mv6-card' + (i === 0 ? '' : i === k ? ' hi' : ' lo');
    return html`<figure className="fig mv6"><div className="fig-stage"><div className="mv6-flow">
      <div className=${c(1)}><b>Control input devices</b><span className="sub">keyboard · guitar · wind controller · breath, motion, bite controllers</span></div>
      <${Arrow} go=${i === 0 || i === 2} />
      <div className=${c(2)}><b>MIDI interface</b><span className="sub">MIDI cable · USB · Ethernet · Bluetooth · WiFi</span></div>
      <${Arrow} go=${i === 0 || i === 3} />
      <div className=${c(3)}><b>Computer + sequencer (DAW)</b><span className="sub">scheduling · synchronisation · recording</span></div>
      <${Arrow} go=${i === 0 || i >= 4} />
      <div className="mv6-two">
        <div className=${c(4)}><b>Synthesiser / Sampler</b><span className="sub">tone generation → sound</span></div>
        <div className=${c(5)}><b>Control output devices</b><span className="sub">lighting · robotics · video · MPEG-4</span></div>
      </div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 13–14: track, channel, timbre, pitch, voice, patch ── */
  const TRK = [
    { n: 'Piano', ch: 1, keys: [60, 64, 67], col: 'var(--k-mm)' },
    { n: 'Brass', ch: 2, keys: [55, 62], col: 'var(--pen)' },
    { n: 'Drums', ch: 10, keys: [36, 42], col: 'var(--ok)' }
  ];
  function Concepts({ ar }) {
    const steps = [
      { en: '<b>Track</b>: the sequencer organises the recordings in tracks. Tracks can be turned on or off when recording or playing back. <b>Try it:</b> switch a track off.', ar: 'الـ <b>Track</b>: الـ sequencer بينظّم التسجيلات في tracks. ممكن تشغّل أو تطفي track وإنت بتسجّل أو بتشغّل. <b>جرّب:</b> اطفي track.' },
      { en: '<b>Channel</b>: separates the information. There are <b>16 channels</b> in one "cable", and the channel number is coded into each MIDI message.', ar: 'الـ <b>Channel</b>: بيفصل المعلومات عن بعض. فيه <b>16 channel</b> في الـ "cable" الواحد، ورقم الـ channel متكوّد جوّه كل MIDI message.' },
      { en: '<b>Timbre</b>: the quality of the sound (piano, brass, drums). The synth here is <b>multitimbral</b>: it plays many different sounds at the same time.', ar: 'الـ <b>Timbre</b>: نوعية الصوت (piano أو brass أو drums). الـ synth هنا <b>multitimbral</b>: بيشغّل أصوات كتير مختلفة في نفس الوقت.' },
      { en: '<b>Pitch</b>: the musical note the instrument plays (shown as key numbers).', ar: 'الـ <b>Pitch</b>: الـ note الموسيقية اللي الآلة بتعزفها (مكتوبة كأرقام keys).' },
      { en: '<b>Voice</b>: the portion of the synthesiser that produces sound. This synth has 12 voices, each working independently and simultaneously; every sounding note takes one.', ar: 'الـ <b>Voice</b>: الجزء من الـ synthesiser اللي بيطلّع الصوت. الـ synth ده فيه 12 voice، كل واحد شغال لوحده وفي نفس الوقت؛ وكل note شغالة بتاخد voice.' },
      { en: '<b>Patch</b>: the control settings that define a particular timbre (one patch is selected per channel).', ar: 'الـ <b>Patch</b>: إعدادات التحكم اللي بتحدد timbre معيّن (كل channel مختارله patch).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3400);
    const [on, setOn] = useState([true, true, true]);
    const used = []; TRK.forEach((t, k) => { if (on[k]) t.keys.forEach(key => used.push([t, key])); });
    const hl = k => i === k ? ' mv6-hl' : '';
    return html`<figure className="fig mv6"><div className="fig-stage"><div style=${{ maxWidth: '440px', margin: '0 auto' }}>
      <div className="mv6-card"><b>Sequencer</b>
        <div className=${'mv6-seq' + hl(0)}>${TRK.map((t, k) => html`<div key=${k} className=${'mv6-trk' + (on[k] ? '' : ' off')}>
          <button className=${on[k] ? 'on' : ''} aria-pressed=${on[k]} onClick=${() => setOn(o => o.map((v, j) => j === k ? !v : v))}>${on[k] ? 'on' : 'off'}</button>
          <span><span className="mv6-tag" style=${{ background: t.col }}></span>Track ${k + 1}: <span className=${i === 3 ? 'mv6-hl' : ''}>keys ${t.keys.join(', ')}</span></span>
          <span className=${'ch' + (i === 1 ? ' mv6-hl' : '')}>ch ${t.ch}</span></div>`)}</div></div>
      <${Arrow} go=${!calm() && used.length > 0} />
      <div className="mv6-card"><b>Synthesiser (multitimbral)</b>
        <div className=${'mv6-seq' + (i === 2 || i === 5 ? ' mv6-hl' : '')}>${TRK.map((t, k) => html`<div key=${k} className=${'mv6-trk' + (on[k] ? '' : ' off')} style=${{ gridTemplateColumns: 'auto minmax(0, 1fr)' }}>
          <span className="ch">ch ${t.ch}</span><span>${i === 5 ? html`patch → <b>${t.n}</b> timbre` : html`<span className="mv6-tag" style=${{ background: t.col }}></span><b>${t.n}</b> timbre`}</span></div>`)}</div>
        <div className=${'mv6-voices' + hl(4)}>${N(12, k => { const u = used[k]; return html`<div key=${k} className=${u ? '' : 'free'} style=${u ? { background: u[0].col } : null}>${u ? u[1] : 'free'}</div>`; })}</div>
        <span className="sub" style=${{ textAlign: 'center', marginTop: '4px' }}>12 voices: <b>${used.length}</b> in use</span>
      </div></div>
      <p className="mv6-small">The tracks, keys and channels are a made-up example to show the terms.</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 15: MIDI IN, OUT and THROUGH in a chain ── */
  function Ports({ ar }) {
    const steps = [
      { en: 'Older MIDI units have <b>three 5-pin ports</b> on the back: <b>MIDI IN</b>, <b>MIDI OUT</b> and <b>MIDI THROUGH</b> (THRU). The slide\'s set-up: a master keyboard, a MIDI interface / sound card and two modules.', ar: 'أجهزة الـ MIDI القديمة عليها <b>3 ports بـ 5 pins</b> من ورا: الـ <b>MIDI IN</b> والـ <b>MIDI OUT</b> والـ <b>MIDI THROUGH</b> (THRU). الـ set-up اللي في الـ slide: master keyboard و MIDI interface / sound card و 2 modules.' },
      { en: '<b>MIDI OUT</b> transmits all the MIDI data the device <b>generates itself</b>: the keys played on the master keyboard go to the interface\'s IN.', ar: 'الـ <b>MIDI OUT</b> بيبعت كل الـ MIDI data اللي الجهاز <b>بيطلّعها بنفسه</b>: الـ keys اللي بتتعزف على الـ master keyboard بتروح للـ IN بتاع الـ interface.' },
      { en: '<b>MIDI IN</b> receives all MIDI data: the interface\'s OUT feeds the keyboard\'s IN.', ar: 'الـ <b>MIDI IN</b> بيستقبل كل الـ MIDI data: الـ OUT بتاع الـ interface داخل على الـ IN بتاع الـ keyboard.' },
      { en: '<b>MIDI THROUGH</b> echoes the data received at MIDI IN: the keyboard passes it on to Module A.', ar: 'الـ <b>MIDI THROUGH</b> بيعيد الـ data اللي وصلت على الـ MIDI IN: الـ keyboard بيعدّيها لـ Module A.' },
      { en: 'Module A echoes it again from its THRU to Module B, and so on (etc.): one stream reaches every module in the chain.', ar: 'الـ Module A بيعيدها تاني من الـ THRU بتاعه لـ Module B، وهكذا (etc.): نفس الـ stream بتوصل لكل module في السلسلة.' },
      { en: '<b>Modern interfaces</b>: many devices bundle IN/OUT/THROUGH and connect directly to the computer, wired (USB/Ethernet) or wireless (Bluetooth/WiFi).', ar: 'الـ <b>Modern interfaces</b>: أجهزة كتير بتجمع الـ IN/OUT/THROUGH في وصلة واحدة وبتتوصل بالكمبيوتر على طول، سلكي (USB/Ethernet) أو لاسلكي (Bluetooth/WiFi).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const mv = !calm();
    const wire = (d, k) => { const live = i === k || (k === 4 && i === 4); const show = i === 0 || i === 5 || live || i > k; return html`<path d=${d} fill="none" stroke=${live ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${live ? 3.2 : 1.8} markerEnd=${live ? 'url(#mv6-pa)' : 'url(#mv6-pg)'} className=${live && mv ? 'flow' : ''} opacity=${show ? (i === 5 ? .35 : 1) : .25} />`; };
    const box = (x, y, w, h, name, ports, k) => html`<g opacity=${i === 5 ? .35 : 1}>
      <rect x=${x} y=${y} width=${w} height=${h} rx="8" fill="var(--paper)" stroke=${k ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${k ? 2.6 : 1.6} />
      ${ports.map(([px, py, t], j) => html`<text key=${j} x=${px} y=${py} textAnchor="middle" fontSize="13" fontWeight="700" style=${{ fill: 'var(--graphite)' }}>${t}</text>`)}
      ${name.map((t, j) => html`<text key=${'n' + j} x=${x + w / 2} y=${y + h / 2 + 6 + (j - (name.length - 1) / 2) * 16} textAnchor="middle" fontSize="14" fontWeight="600" fontStyle="italic">${t}</text>`)}</g>`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <svg className="mv6-svg" viewBox="0 0 300 352" role="img" aria-label="MIDI chain: keyboard, interface and two modules connected by IN, OUT and THRU">
        <defs>${arrowDef('mv6-pa', 'var(--k-mm)')}${arrowDef('mv6-pg', 'var(--graphite)')}</defs>
        ${box(6, 40, 168, 70, ['Master Keyboard'], [[34, 58, 'THRU'], [90, 58, 'IN'], [146, 58, 'OUT']], i === 1 || i === 3)}
        ${box(186, 40, 108, 70, ['MIDI Interface', 'Sound Card'], [[212, 58, 'IN'], [268, 58, 'OUT']], i === 2)}
        ${box(6, 160, 168, 64, ['MIDI Module A'], [[34, 178, 'IN'], [146, 178, 'THRU']], i === 3 || i === 4)}
        ${box(6, 262, 168, 64, ['MIDI Module B'], [[34, 280, 'IN'], [146, 280, 'THRU']], i === 4)}
        ${wire('M146 40 V24 H212 V38', 1)}
        ${wire('M268 40 V10 H90 V38', 2)}
        ${wire('M34 40 V30 H2 V140 H34 V158', 3)}
        ${wire('M146 160 V146 H186 V244 H34 V260', 4)}
        ${wire('M146 262 V250 H192 V340 H212', 4)}
        <text x="218" y="345" fontSize="14" fontStyle="italic" opacity=${i === 5 ? .35 : 1}>etc.</text>
        <g className=${pop(i === 5)}>
          <rect x="190" y="128" width="104" height="118" rx="10" fill="var(--paper)" stroke="var(--k-mm)" strokeWidth="2.6" />
          <text x="242" y="152" textAnchor="middle" fontSize="14" fontWeight="700">Modern:</text>
          <text x="242" y="174" textAnchor="middle" fontSize="13">direct to</text>
          <text x="242" y="191" textAnchor="middle" fontSize="13">computer</text>
          <text x="242" y="213" textAnchor="middle" fontSize="13">USB/Ethernet</text>
          <text x="242" y="234" textAnchor="middle" fontSize="13">Bluetooth/WiFi</text>
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 16–17, 21: the bits of 9C 50 7F ── */
  function Bits({ ar }) {
    const steps = [
      { en: 'The slide\'s Note On: play note number 80 (hex 50) with maximum velocity 127 (hex 7F) on channel 13 (hex C). The device sends <b>3 hexadecimal bytes</b>.', ar: 'الـ Note On بتاع الـ slide: نعزف note رقم 80 (hex 50) بأقصى velocity وهي 127 (hex 7F) على channel 13 (hex C). الجهاز بيبعت <b>3 bytes بالـ hex</b>.' },
      { en: 'Each hex digit is 4 bits, so each byte is 8 bits.', ar: 'كل hex digit عبارة عن 4 bits، فكل byte عبارة عن 8 bits.' },
      { en: 'The <b>most significant bit</b> tells the byte type: <b>1 = status byte</b>, <b>0 = data byte</b>. A message = one status byte + up to two data bytes.', ar: 'الـ <b>most significant bit</b> بيقول نوع الـ byte: الـ <b>1 يبقى status byte</b> والـ <b>0 يبقى data byte</b>. الـ message عبارة عن status byte واحد وبعده لحد 2 data bytes.' },
      { en: 'In the status byte, the <b>3 bits after the MSB</b> identify the message: 001, so the first hex digit is 9 = <b>Note On</b>.', ar: 'في الـ status byte، الـ <b>3 bits اللي بعد الـ MSB</b> بيحددوا الـ message: هنا 001، فأول hex digit بيبقى 9 يعني <b>Note On</b>.' },
      { en: 'The <b>4 low-order bits</b> are the channel: 1100 = C = 12. Musicians count channels 1 to 16, so this is <b>channel 12 + 1 = 13</b> (4 bits give 16 channels).', ar: 'الـ <b>4 low-order bits</b> هما الـ channel: 1100 يعني C يعني 12. الموسيقيين بيعدّوا الـ channels من 1 لـ 16، فده <b>channel 13</b> (يعني 12 + 1)، والـ 4 bits بيدّوا 16 channel.' },
      { en: 'Data byte 1: MSB 0, so 7 bits of value (0 to 127). 50 = 5×16 + 0 = <b>80</b>: the key (note) number.', ar: 'الـ data byte الأول: الـ MSB بـ 0، فالقيمة 7 bits (من 0 لـ 127). هنا<span class="ltr">50 = 5×16 + 0 = 80</span>وده رقم الـ key (الـ note).' },
      { en: 'Data byte 2: 7F = 7×16 + 15 = <b>127</b>, the largest 7-bit value: maximum velocity. <b>9C 50 7F = Note On, channel 13, key 80, velocity 127.</b>', ar: 'الـ data byte التاني:<span class="ltr">7F = 7×16 + 15 = 127</span>وده أكبر قيمة في 7 bits يعني أقصى velocity. يعني الـ message دي <b>Note On على channel 13، key 80، velocity 127</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const BY = [0x9C, 0x50, 0x7F];
    const cls = (b, k) => { if (i < 2) return ''; if (k === 0) return 'm'; if (b > 0) return i >= 5 ? 'd' + (i === 5 && b === 2 || i === 6 && b === 1 ? ' lo' : '') : ''; if (i >= 3 && k <= 3) return 't' + (i >= 4 && i < 5 ? ' lo' : ''); if (i >= 4 && k >= 4) return 'c'; return ''; };
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-bytes">${BY.map((b, k) => html`<span key=${k} className=${'mv6-byte' + (i >= 2 && k === 0 ? ' st' : '') + ((i >= 3 && i <= 4 && k === 0) || (i === 5 && k === 1) || (i === 6 && k === 2) ? ' cur' : '')}>${H2(b)}</span>`)}</div>
      <div className=${pop(i >= 1)}>
        ${BY.map((b, r) => html`<div key=${r} className="mv6-bitrow"><span>${H2(b)}</span>${B8(b).split('').map((d, k) => html`<div key=${k} className=${'mv6-bit ' + cls(r, k)}>${d}</div>`)}</div>`)}
        ${i >= 2 && html`<div className="mv6-brace"><span style=${{ border: 0 }}></span><span className="m">MSB</span>${i >= 3 ? html`<span className="t">type ${i >= 3 ? '001' : ''}</span>` : html`<span></span>`}${i >= 4 ? html`<span className="c">channel 1100</span>` : html`<span></span>`}</div>`}
      </div>
      <div className=${'mv6-calc ' + pop(i >= 3)}>
        <div>status ${H2(0x9C)}: 1 | 001 | 1100</div>
        ${i >= 3 && html`<div>9x → Note On</div>`}
        ${i >= 4 && html`<div>C = 12 → channel 12 + 1 = 13</div>`}
        ${i >= 5 && html`<div>${hexCalc(0x50)} → key 80</div>`}
        ${i >= 6 && html`<div>${hexCalc(0x7F)} → velocity 127</div>`}
        ${i >= 6 && html`<div className="mv6-res">Note On, channel 13, key 80, velocity 127</div>`}
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 18: classification of MIDI messages ── */
  function Classes({ ar }) {
    const steps = [
      { en: '<b>MIDI messages</b> fall into two families.', ar: 'الـ <b>MIDI messages</b> بتتقسم لعيلتين.' },
      { en: '<b>Channel messages</b> carry a channel number in the status byte (status 8x to Ex).', ar: 'الـ <b>Channel messages</b> شايلة رقم channel في الـ status byte (الـ status من <bdi>8x</bdi> لـ <bdi>Ex</bdi>).' },
      { en: 'They are <b>voice messages</b> (play and shape notes) and <b>mode messages</b> (Control Change Bx with first data byte 121 to 127: how an instrument processes voice messages).', ar: 'وبتتقسم لـ <b>voice messages</b> (بتشغّل الـ notes وتغيّر صوتها) و <b>mode messages</b> (الـ Control Change <bdi>Bx</bdi> لما أول data byte يبقى من 121 لـ 127: بتحدد الآلة تتعامل إزاي مع الـ voice messages).' },
      { en: '<b>System messages</b> are not channel specific (status Fx).', ar: 'الـ <b>System messages</b> مش خاصة بـ channel معيّن (الـ status <bdi>Fx</bdi>).' },
      { en: 'They are <b>common</b> (unrelated messages, e.g. Song Select F3), <b>real-time</b> (timing and synchronisation, e.g. Timing Clock F8) and <b>exclusive</b> (Sysex, bracketed by F0 and F7).', ar: 'وبتتقسم لـ <b>common</b> (رسايل ملهاش علاقة ببعض، زي الـ Song Select <bdi>F3</bdi>)، و <b>real-time</b> (للـ timing والـ synchronisation، زي الـ Timing Clock <bdi>F8</bdi>)، و <b>exclusive</b> (الـ Sysex، محصورة بين <bdi>F0</bdi> و <bdi>F7</bdi>).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const li = (show, hi, name, sub, kids) => html`<li className=${show ? '' : 'off'}><span className=${'nd' + (hi ? ' hi' : '')}>${name}${sub && html`<small>${sub}</small>`}</span>${kids}</li>`;
    return html`<figure className="fig mv6"><div className="fig-stage"><div className="mv6-tree">
      <span className=${'nd' + (i === 0 ? ' hi' : '')}>MIDI messages</span>
      <ul>
        ${li(i >= 1, i === 1, 'Channel messages', 'status 8x to Ex', html`<ul>
          ${li(i >= 2, i === 2, 'Voice messages', '8x 9x Ax Bx Cx Dx Ex')}
          ${li(i >= 2, i === 2, 'Mode messages', 'Bx, data 1 = 121 to 127')}</ul>`)}
        ${li(i >= 3, i === 3, 'System messages', 'status Fx', html`<ul>
          ${li(i >= 4, i === 4, 'Common messages', 'F1 F2 F3 F6')}
          ${li(i >= 4, i === 4, 'Real-time messages', 'F8 FA FB FC FE FF')}
          ${li(i >= 4, i === 4, 'Exclusive messages', 'F0 … F7')}</ul>`)}
      </ul></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 20, 22: build a channel voice (or mode) message ── */
  function Builder({ ar }) {
    const [m, setM] = useState(1), [ch, setCh] = useState(13), [d1, setD1] = useState(80), [d2, setD2] = useState(127);
    const [t, hi, l1, l2] = VOICE[m];
    const st = hi * 16 + ch - 1, bytes = l2 ? [st, d1, d2] : [st, d1];
    const mode = hi === 0xB && d1 >= 121;
    const ex = () => { setM(1); setCh(13); setD1(80); setD2(127); };
    const en = `<b>Pick a voice message</b> from the slide's table, a channel and the data values: the bytes are built with the course's rule, first hex digit = message, second = channel − 1. ${l2 ? 'This message has two data bytes (3 bytes).' : 'This message has <b>one</b> data byte (2 bytes total).'}${mode ? ' <b>First data byte 121 to 127 on a Control Change: this is a channel mode message.</b>' : ''}`;
    const a = `<b>اختار voice message</b> من جدول الـ slide، و channel، وقيم الـ data: الـ bytes بتتبني بقاعدة الكورس، أول hex digit هو الـ message والتاني هو الـ channel ناقص 1. ${l2 ? 'الـ message دي ليها 2 data bytes (يعني 3 bytes).' : 'الـ message دي ليها data byte <b>واحد</b> بس (يعني 2 bytes كلها).'}${mode ? ' <b>أول data byte من 121 لـ 127 على Control Change: يبقى دي channel mode message.</b>' : ''}`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <table className="mv6-tbl"><thead><tr><th>Voice message</th><th>Status</th><th>Data 1</th><th>Data 2</th></tr></thead><tbody>
        ${VOICE.map((v, k) => html`<tr key=${k} className=${k === m ? 'on' : ''} onClick=${() => setM(k)}><td className="n">${v[0]}</td><td className="mv6-mono">${v[1].toString(16).toUpperCase()}x</td><td>${v[2]}</td><td>${v[3] || 'None'}</td></tr>`)}</tbody></table>
      <div className="mv6-form" style=${{ marginTop: '10px' }}>
        <label>Channel (1 to 16) <span className="v">${ch}</span><input type="range" min="1" max="16" value=${ch} onInput=${e => setCh(+e.target.value)} /></label>
        <label>Data 1: ${l1} <span className="v">${d1}</span><input type="range" min="0" max="127" value=${d1} onInput=${e => setD1(+e.target.value)} /></label>
        ${l2 && html`<label>Data 2: ${l2} <span className="v">${d2}</span><input type="range" min="0" max="127" value=${d2} onInput=${e => setD2(+e.target.value)} /></label>`}
      </div>
      <div className="mv6-bytes" style=${{ marginTop: '10px' }}>${bytes.map((b, k) => html`<span key=${k} className=${'mv6-byte' + (k === 0 ? ' st' : '')}>${H2(b)}</span>`)}</div>
      <div className="mv6-calc">
        <div>status = ${hi.toString(16).toUpperCase()} | ${ch} − 1 = ${(ch - 1).toString(16).toUpperCase()} → ${H2(st)} = ${B8(st).slice(0, 4)} ${B8(st).slice(4)}</div>
        <div>data 1 = ${d1} → ${H2(d1)} = ${B8(d1)}</div>
        ${l2 && html`<div>data 2 = ${d2} → ${H2(d2)} = ${B8(d2)}</div>`}
        <div className="mv6-res">${mode ? 'Channel mode message' : t}: ${bytes.length} bytes</div>
      </div>
      <div className="mv6-chips" style=${{ marginTop: '10px' }}><button className="fig-btn" onClick=${ex}>Example from the notes: 9C 50 7F</button></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── notes §5: decode any MIDI byte stream ── */
  const DEX = [['9C 50 7F', 'slide 21'], ['80 3C 40', 'Note Off'], ['99 26 64', 'snare on ch 10'], ['F0 7E 01 F7', 'Sysex']];
  function decode(src) {
    const toks = src.trim().split(/[\s,]+/).filter(Boolean), out = [];
    const bad = toks.find(t => !/^[0-9a-fA-F]{1,2}$/.test(t));
    if (!toks.length) return { err: 'Type some hex bytes, e.g. 9C 50 7F.' };
    if (bad) return { err: `"${bad}" is not a hex byte (00 to FF).` };
    const b = toks.map(t => parseInt(t, 16));
    let k = 0;
    while (k < b.length && out.length < 8) {
      const s = b[k];
      if (s < 0x80) { out.push({ err: `${H2(s)} = ${B8(s)}: MSB 0, a data byte with no status byte before it.` }); k++; continue; }
      const lines = [`${H2(s)} = ${B8(s).slice(0, 4)} ${B8(s).slice(4)}: MSB 1 → status byte`];
      if (s < 0xF0) {
        const v = VOICE[(s >> 4) - 8], ch = (s & 15) + 1, need = v[3] ? 2 : 1, d = b.slice(k + 1, k + 1 + need);
        lines.push(`${(s >> 4).toString(16).toUpperCase()}x → ${v[0]}`, `${(s & 15).toString(16).toUpperCase()} = ${s & 15} → channel ${s & 15} + 1 = ${ch}`);
        if (d.length < need || d.some(x => x >= 0x80)) { out.push({ lines, err: `${v[0]} needs ${need} data byte${need > 1 ? 's' : ''} (MSB 0) after it.` }); k += 1 + d.filter(x => x < 0x80).length; continue; }
        lines.push(`${hexCalc(d[0])} → ${v[2]} ${d[0]}`);
        if (need === 2) lines.push(`${hexCalc(d[1])} → ${v[3]} ${d[1]}`);
        let res = need === 2 ? `${v[0]}, channel ${ch}, ${v[2].toLowerCase()} ${d[0]}, ${v[3].toLowerCase()} ${d[1]}` : `${v[0]}, channel ${ch}, ${v[2].toLowerCase()} ${d[0]}`;
        if (v[1] === 0xB && d[0] >= 121) res = `Channel mode message (Control Change with data 1 = ${d[0]}, in 121 to 127), channel ${ch}`;
        const note = (v[1] === 0x9 || v[1] === 0x8) && ch === 10 && d[0] >= 35 && d[0] <= 81 ? `GM percussion (channel 10): key ${d[0]} = ${PERC[d[0] - 35]}` : null;
        out.push({ lines, res, note, n: 1 + need }); k += 1 + need; continue;
      }
      if (s === 0xF0) {
        let e = k + 1; while (e < b.length && b[e] < 0x80) e++;
        lines.push('F0 → Sysex Start (system exclusive)');
        if (b[e] !== 0xF7) { out.push({ lines, err: 'A Sysex stream must end with F7 (Sysex End); its bytes in between have MSB 0.' }); k = e; continue; }
        lines.push(`${e - k - 1} data byte${e - k - 1 === 1 ? '' : 's'} with MSB 0 (format is system dependent)`, 'F7 → Sysex End');
        out.push({ lines, res: 'System exclusive message', n: e - k + 1 }); k = e + 1; continue;
      }
      const y = SYS[s];
      if (!y) { out.push({ lines, err: `${H2(s)} is not one of the system messages on the slides.` }); k++; continue; }
      const need = y[2] || 0, d = b.slice(k + 1, k + 1 + need);
      lines.push(`${H2(s)} → ${y[0]} (${GRP[y[1]][0]})`);
      if (d.length < need || d.some(x => x >= 0x80)) { out.push({ lines, err: `${y[0]} needs ${need} data byte${need > 1 ? 's' : ''}.` }); k++; continue; }
      d.forEach((x, j) => lines.push(`data ${j + 1}: ${hexCalc(x)}`));
      out.push({ lines, res: y[0], n: 1 + need }); k += 1 + need;
    }
    return { out, total: b.length };
  }
  function Decoder({ ar }) {
    const [src, setSrc] = useState('9C 50 7F'), [ex, setEx] = useState(0);
    const r = decode(src);
    const en = '<b>Decode any MIDI bytes.</b> Rule: MSB 1 = status byte, first hex digit = message type, second hex digit = channel − 1; data bytes are 00 to 7F. Pick one of the notes\' examples or type your own (several messages in a row work too).';
    const a = '<b>فُك أي MIDI bytes.</b> القاعدة: لو الـ MSB بـ 1 يبقى status byte، أول hex digit هو نوع الـ message، وتاني hex digit هو الـ channel ناقص 1؛ والـ data bytes من <bdi>00</bdi> لـ <bdi>7F</bdi>. اختار مثال من الـ notes أو اكتب bytes من عندك (ينفع كذا message ورا بعض).';
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-chips">${DEX.map((x, k) => html`<button key=${k} className=${'fig-btn' + (ex === k ? ' sel' : '')} onClick=${() => { setEx(k); setSrc(x[0]); }}>${x[0]}</button>`)}</div>
      <div style=${{ maxWidth: '440px', margin: '0 auto' }}><input className="mv6-in" aria-label="MIDI bytes in hex" value=${src} spellCheck="false" autoComplete="off" onInput=${e => { setEx(null); setSrc(e.target.value); }} /></div>
      <div className="mv6-calc">
        ${r.err ? html`<div className="err">${r.err}</div>` : r.out.map((o, k) => html`<div key=${k}>
          ${r.out.length > 1 && html`<div className="hd">Message ${k + 1}</div>`}
          ${(o.lines || []).map((l, j) => html`<div key=${j}>${l}</div>`)}
          ${o.res && html`<div className="mv6-res">= ${o.res} (${o.n} bytes)</div>`}
          ${o.note && html`<div className="note">${o.note}</div>`}
          ${o.err && html`<div className="err">${o.err}</div>`}</div>`)}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── notes §5.5: 1000 notes in MIDI vs one minute of CD audio ── */
  function Size({ ar }) {
    const [n, setN] = useState(1000), [min, setMin] = useState(1);
    const midi = n * 2 * 3, cd = 44100 * 16 * 2 * 60 * min / 8, ratio = cd / midi;
    const en = `A piece of <b>${min} minute${min > 1 ? 's' : ''}</b> with <b>${fmt(n)} notes</b>: MIDI sends ${fmt(n)} Note On + ${fmt(n)} Note Off, 3 bytes each = <b>${fmt(midi)} bytes</b>. The same time of stereo CD audio is <b>${fmt(cd)} bytes</b>, about <b>${fmt(Math.round(ratio))} times</b> more. That is why MIDI is called a compression tool. The MIDI bar is drawn to scale.`;
    const a = `قطعة مدتها <b>${min} دقيقة</b> فيها <b>${fmt(n)} note</b>: الـ MIDI بيبعت ${fmt(n)} Note On و ${fmt(n)} Note Off، كل واحدة 3 bytes يعني <b>${fmt(midi)} bytes</b>. نفس المدة من الـ stereo CD audio حجمها <b>${fmt(cd)} bytes</b>، يعني حوالي <b>${fmt(Math.round(ratio))} مرة</b> أكبر. عشان كده الـ MIDI بيتقال عليه compression tool. الـ bar بتاع الـ MIDI مترسوم بنفس المقياس.`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-form">
        <label>Notes in the piece <span className="v">${fmt(n)}</span><input type="range" min="100" max="5000" step="100" value=${n} onInput=${e => setN(+e.target.value)} /></label>
        <label>Length (minutes) <span className="v">${min}</span><input type="range" min="1" max="10" value=${min} onInput=${e => setMin(+e.target.value)} /></label>
      </div>
      <div className="mv6-calc">
        <div>MIDI: (${fmt(n)} + ${fmt(n)}) × 3 = ${fmt(midi)} bytes</div>
        <div>CD: 44100 × 16 × 2 × ${60 * min} / 8 = ${fmt(cd)} bytes</div>
        <div className="mv6-res">CD / MIDI ≈ ${fmt(Math.round(ratio))}</div>
      </div>
      <div className="mv6-bars">
        <div className="b"><span>CD audio</span><div><i style=${{ width: '100%', background: 'var(--graphite)' }}></i></div><span className="val">${fmt(cd)} B</span></div>
        <div className="b"><span className="mv6-k">MIDI</span><div><i style=${{ width: (100 / ratio) + '%', background: 'var(--k-mm)' }}></i></div><span className="val">${fmt(midi)} B</span></div>
      </div>
      <div className="mv6-chips" style=${{ marginTop: '10px' }}><button className="fig-btn" onClick=${() => { setN(1000); setMin(1); }}>Example from the notes: 1000 notes, 1 minute</button></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── notes §5.6: a message on the 31.25 kbaud serial link ── */
  function Wire({ ar }) {
    const [len, setLen] = useState(3), [pos, setPos] = useState(calm() ? 99 : 0), [run, setRun] = useState(!calm());
    const bytes = len === 3 ? [0x9C, 0x50, 0x7F] : [0xC0, 0x05];
    const nb = bytes.length * 10;
    useEffect(() => { if (!run) return; if (pos >= nb) { setRun(false); return; } const t = setTimeout(() => setPos(p => p + 1), 90); return () => clearTimeout(t); }, [pos, run, nb]);
    const pick = l => { setLen(l); setPos(calm() ? 99 : 0); setRun(!calm()); };
    const ms = nb / 31250 * 1000, per = Math.floor(31250 / nb), done = Math.min(pos, nb);
    const en = `Each byte travels as <b>10 bits</b> (start + 8 data + stop) on a <b>31.25 kbaud</b> link, so one bit takes 1 / 31,250 s = 32 µs. A ${len}-byte message = ${nb} bits / 31,250 bit/s = <b>${fmt(ms)} ms</b>, about <b>${fmt(per)}</b> such messages per second. (Standard MIDI 1.0 fact, not on the slides.)`;
    const a = `كل byte بيتبعت كـ <b>10 bits</b> (start و 8 data و stop) على link سرعته <b>31.25 kbaud</b>، فالـ bit الواحد بياخد 32 µs. الـ message اللي ${len} bytes بتاخد<span class="ltr">${nb} bits / 31,250 bit/s = ${fmt(ms)} ms</span>يعني حوالي <b>${fmt(per)}</b> message من النوع ده في الثانية. (معلومة من الـ MIDI 1.0 standard، مش في الـ slides.)`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-chips"><button className=${'fig-btn' + (len === 3 ? ' sel' : '')} onClick=${() => pick(3)}>3 bytes: 9C 50 7F</button><button className=${'fig-btn' + (len === 2 ? ' sel' : '')} onClick=${() => pick(2)}>2 bytes: Program change C0 05</button></div>
      ${bytes.map((b, r) => html`<div key=${r} className="mv6-frame"><span>${H2(b)}</span>
        <div className="mv6-wire">${N(10, k => { const g = r * 10 + k, ss = k === 0 || k === 9; return html`<div key=${k} className=${(ss ? 'ss ' : '') + (g < done - 1 || done >= nb ? 'done' : g === done - 1 ? 'on' : '')}>${k === 0 ? 'S' : k === 9 ? 'P' : 'd'}</div>`; })}</div></div>`)}
      <p className="mv6-small" style=${{ marginTop: '2px' }}>S = start bit · d = data bit · P = stop bit</p>
      <div className="mv6-meter" aria-hidden="true"><i style=${{ width: (done / nb * 100) + '%' }}></i></div>
      <div className="mv6-out"><span className="big">${fmt(done * 0.032)} ms</span>${done} of ${nb} bits sent (32 µs each)</div>
      <div className="mv6-chips" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${() => { setPos(calm() ? nb : 0); setRun(!calm()); }}>↻ Send again</button></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 23–26: the system status bytes F0 to FF ── */
  function SysBytes({ ar }) {
    const [s, setS] = useState(0xF8);
    const y = SYS[s];
    const enInfo = y ? (y[1] === 'ex' ? `<b>${H2(s)} = ${y[0]}</b> (system exclusive). Sysex carries things that cannot be standardised (system-dependent creation and organisation of sounds): a stream of bytes with high bits 0, bracketed by F0 and F7. Its format is system dependent.`
      : `<b>${H2(s)} = ${y[0]}</b> (${GRP[y[1]][0]}${y[1] === 'rt' ? ': timing and synchronisation' : ': unrelated messages'}).${y[1] === 'co' ? ` Data bytes: <b>${y[2] || 'none'}</b>.` : ''}`) : `<b>${H2(s)}</b> is not one of the system messages listed on the slides.`;
    const arInfo = y ? (y[1] === 'ex' ? `الـ <b>${y[0]}</b> هو <bdi>${H2(s)}</bdi> (system exclusive). الـ Sysex بيشيل الحاجات اللي ماينفعش تتعمل لها standard (طريقة عمل وتنظيم الأصوات الخاصة بكل system): stream من bytes الـ high bit بتاعها 0، محصورة بين <bdi>F0</bdi> و <bdi>F7</bdi>. والـ format بتاعها بيعتمد على الـ system.`
      : `الـ <b>${y[0]}</b> هو <bdi>${H2(s)}</bdi> (${GRP[y[1]][1]}${y[1] === 'rt' ? ': للـ timing والـ synchronisation' : ': رسايل ملهاش علاقة ببعض'}).${y[1] === 'co' ? ` عدد الـ data bytes: <b>${y[2] || 'مفيش'}</b>.` : ''}`) : `الـ byte <bdi>${H2(s)}</bdi> مش من الـ system messages اللي في الـ slides.`;
    const en = 'System messages carry information that is not channel specific: their status bytes are F0 to FF. <b>Tap a byte.</b> ' + enInfo;
    const a = 'الـ System messages بتشيل معلومات مش خاصة بـ channel: الـ status bytes بتاعتها من <bdi>F0</bdi> لـ <bdi>FF</bdi>. <b>دوس على byte.</b> ' + arInfo;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-sys">${N(16, k => { const b = 0xF0 + k, g = SYS[b]; return html`<button key=${k} className=${(g ? g[1] : 'un') + (b === s ? ' sel' : '')} aria-pressed=${b === s} onClick=${() => setS(b)}>${H2(b)}</button>`; })}</div>
      <div className="mv6-leg"><span><i style=${{ background: 'color-mix(in srgb, var(--ok) 24%, var(--paper))' }}></i>real-time</span><span><i style=${{ background: 'color-mix(in srgb, var(--k-mm) 22%, var(--paper))' }}></i>common</span><span><i style=${{ background: 'color-mix(in srgb, var(--pen) 22%, var(--paper))' }}></i>exclusive</span></div>
      <div className="mv6-out"><b>${y ? y[0] : 'not on the slides'}</b></div>
      ${y && y[1] === 'ex' && html`<div className="mv6-stream" aria-label="Sysex stream"><span className="ex">F0</span><span>0xxxxxxx</span><span>0xxxxxxx</span><span>…</span><span className="ex">F7</span></div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 29–31: the GM instrument patch map ── */
  function Patch({ ar }) {
    const [p, setP] = useState(1);
    const f = Math.floor((p - 1) / 8);
    const en = `General MIDI fixes <b>128 instruments in 16 families of 8</b>, so a program number means the same instrument everywhere. <b>Program ${p}</b> = <b>${PROG[p - 1]}</b>, family ${FAM[f]} (programs ${f * 8 + 1} to ${f * 8 + 8}). Tap a family, then an instrument.`;
    const a = `الـ General MIDI بيثبّت <b>128 instrument في 16 عيلة كل عيلة 8</b>، فرقم الـ program بيعني نفس الآلة في أي مكان. الـ <b>program ${p}</b> هو <b>${PROG[p - 1]}</b>، من عيلة الـ ${FAM[f]} (الـ programs من ${f * 8 + 1} لـ ${f * 8 + 8}). دوس على عيلة وبعدين على آلة.`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-fam">${FAM.map((x, k) => html`<button key=${k} className=${k === f ? 'sel' : ''} aria-pressed=${k === f} onClick=${() => setP(k * 8 + 1)}><small>${k * 8 + 1}–${k * 8 + 8}</small>${x}</button>`)}</div>
      <div className="mv6-progs">${N(8, k => { const q = f * 8 + k + 1; return html`<button key=${k} className=${q === p ? 'sel' : ''} aria-pressed=${q === p} onClick=${() => setP(q)}><b>${q}</b><span>${PROG[q - 1]}</span></button>`; })}</div>
      <div className="mv6-out"><span className="big">${p}</span>${PROG[p - 1]} · ${FAM[f]}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 32–33: the GM percussion key map on channel 10 ── */
  function Drums({ ar }) {
    const [k, setK] = useState(38);
    const st = 0x99, v = 100;
    const en = `<b>47 percussion sounds on keys 35 to 81</b>, sent on <b>channel 10</b> by default. Each key is a switch for one sound, with no pitch information. <b>Key ${k} = ${PERC[k - 35]}</b>. Note On on channel 10 with velocity 100 (as in the notes): status 9 | 10 − 1 = 9 → 99; key ${k} → ${H2(k)}; 100 → 64. Tap a key.`;
    const a = `<b>47 صوت percussion على الـ keys من 35 لـ 81</b>، وبيتبعتوا على <b>channel 10</b> by default. كل key عبارة عن switch لصوت واحد، من غير pitch. الـ <b>key ${k}</b> هو <b>${PERC[k - 35]}</b>. الـ Note On على channel 10 بـ velocity 100 (زي الـ notes):<span class="ltr">status 9 | 10 − 1 = 9 → 99 ; key ${k} → ${H2(k)} ; 100 → 64</span>دوس على key.`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-grid" style=${{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>${N(47, j => { const key = 35 + j; return html`<button key=${j} className=${key === k ? 'sel' : ''} aria-label=${key + ' ' + PERC[j]} aria-pressed=${key === k} onClick=${() => setK(key)}>${key}</button>`; })}</div>
      <div className="mv6-out"><span className="big">${PERC[k - 35]}</span>key ${k} on channel 10</div>
      <div className="mv6-bytes" style=${{ marginTop: '8px' }}><span className="mv6-byte st">${H2(st)}</span><span className="mv6-byte">${H2(k)}</span><span className="mv6-byte">${H2(v)}</span></div>
      <div className="mv6-calc"><div>9 (Note On) | 10 − 1 = 9 → 99</div><div>key ${k} = ${Math.floor(k / 16)}×16 + ${k % 16} → ${H2(k)}</div><div>velocity 100 = 6×16 + 4 → 64</div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 34: two 8-bit values as MSB and LSB give a 16-bit range ── */
  function MsbLsb({ ar }) {
    const [hi, setHi] = useState(1), [lo, setLo] = useState(44);
    const v = hi * 256 + lo;
    const en = `Most MIDI numbers are <b>8-bit</b>: only 256 steps (0 to 255). Some manufacturers use <b>two values as the Most and Least Significant Bytes</b>: value = MSB × 256 + LSB, a <b>16-bit range</b> of 65,536 steps (0 to 65,535). Now: ${hi} × 256 + ${lo} = <b>${fmt(v)}</b>.`;
    const a = `معظم أرقام الـ MIDI <b>8-bit</b>: يعني 256 خطوة بس (من 0 لـ 255). بعض الشركات بتستخدم <b>قيمتين كـ Most و Least Significant Bytes</b>: يعني <b>16-bit range</b> فيه 65,536 خطوة (من 0 لـ 65,535). دلوقتي:<span class="ltr">value = MSB × 256 + LSB = ${hi} × 256 + ${lo} = ${fmt(v)}</span>`;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <div className="mv6-form">
        <label>MSB <span className="v">${hi} (${H2(hi)})</span><input type="range" min="0" max="255" value=${hi} onInput=${e => setHi(+e.target.value)} /></label>
        <label>LSB <span className="v">${lo} (${H2(lo)})</span><input type="range" min="0" max="255" value=${lo} onInput=${e => setLo(+e.target.value)} /></label>
      </div>
      <div className="mv6-calc"><div>${B8(hi)} ${B8(lo)}</div><div className="mv6-res">${hi} × 256 + ${lo} = ${fmt(v)}</div></div>
      <div className="mv6-bars">
        <div className="b"><span>one byte</span><div><i style=${{ width: (Math.min(255, hi) / 255 * 100) + '%', background: 'var(--graphite)' }}></i></div><span className="val">${hi} of 255 (MSB alone)</span></div>
        <div className="b"><span className="mv6-k">MSB + LSB</span><div><i style=${{ width: (v / 65535 * 100) + '%', background: 'var(--k-mm)' }}></i></div><span className="val">${fmt(v)} of 65,535</span></div>
      </div>
      <p className="mv6-small">Other solutions on the slide: Open Sound Control (OSC) and MIDI 2.0 High Definition MIDI.</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 35–45: the six MPEG-4 Structured Audio tools working together ── */
  function SaTools({ ar }) {
    const steps = [
      { en: '<b>MPEG-4 Structured Audio</b> combines compression, synthesis and MIDI: encode <b>what note to play and how to play it</b> with a small number of parameters, and let the generation side create the audio.', ar: 'الـ <b>MPEG-4 Structured Audio</b> بيجمع الـ compression والـ synthesis والـ MIDI: بنعمل encode لـ <b>أنهي note تتعزف وتتعزف إزاي</b> بعدد صغير من الـ parameters، والـ generation side هو اللي بيعمل الصوت.' },
      { en: '<b>SAOL</b> ("sail"), the Structured Audio Orchestra Language: the central part, a software-synthesis language that describes the synthesisers (instruments). Any method: FM, physical modelling, sample-based, granular, subtractive, FOF, hybrids.', ar: 'الـ <b>SAOL</b> (بتتنطق "sail")، الـ Structured Audio Orchestra Language: الجزء الأساسي، لغة software synthesis بتوصف الـ synthesisers (الـ instruments). أي طريقة: FM و physical modelling و sample-based و granular و subtractive و FOF والـ hybrids.' },
      { en: '<b>SASL</b>, the Score Language: tells the SAOL instruments what notes to play, how loud, what tempo, how long. Like MIDI but without its limits on time resolution and bandwidth; no looping, sections, repeats or expressions.', ar: 'الـ <b>SASL</b>، الـ Score Language: بتقول للـ SAOL instruments تعزف أنهي notes، وبصوت عالي قد إيه، وبأنهي tempo، ولمدة قد إيه. زي الـ MIDI بس من غير حدوده في الـ time resolution والـ bandwidth؛ ومافيهاش looping ولا sections ولا repeats ولا expressions.' },
      { en: '<b>SASBF</b>, the Sample Bank Format: efficiently transmits banks of samples for wavetable or sample-based synthesis (partly compatible with MIDI DLS).', ar: 'الـ <b>SASBF</b>، الـ Sample Bank Format: بيبعت banks من الـ samples بكفاءة للـ wavetable أو الـ sample-based synthesis (متوافق جزئيًا مع الـ MIDI DLS).' },
      { en: '<b>MIDI semantics</b>: SAOL can also be driven by MIDI, the most common score format, using a subset of MIDI with some semantics redefined for MPEG-4.', ar: 'الـ <b>MIDI semantics</b>: الـ SAOL ممكن كمان يتحرك بالـ MIDI، أشهر format للـ score، باستخدام subset من الـ MIDI وبعض الـ semantics متعرّفة من جديد للـ MPEG-4.' },
      { en: 'The <b>Scheduler</b>, the main body of Structured Audio: defines how SAOL creates sound when driven by MIDI or SASL.', ar: 'الـ <b>Scheduler</b>، الجزء الرئيسي في الـ Structured Audio: بيحدد الـ SAOL بيعمل الصوت إزاي لما يتحرك بالـ MIDI أو الـ SASL.' },
      { en: '<b>AudioBIFS</b> (part of BIFS) mixes and post-produces the audio scene at playback with tools and effects, to make the soundtrack.', ar: 'الـ <b>AudioBIFS</b> (جزء من الـ BIFS) بيعمل mixing و post-production للـ audio scene وقت التشغيل بأدوات و effects، عشان يطلع الـ soundtrack.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3400);
    const c = k => 'mv6-card' + (i === 0 ? '' : i === k ? ' hi' : ' lo');
    return html`<figure className="fig mv6"><div className="fig-stage"><div className="mv6-flow">
      <div className="mv6-two">
        <div className=${c(2)}><b>SASL</b><span className="sub">score: notes, loudness, tempo, duration</span></div>
        <div className=${c(4)}><b>MIDI semantics</b><span className="sub">a subset of MIDI as the score</span></div>
      </div>
      <${Arrow} go=${i === 0 || i === 5} />
      <div className=${c(5)}><b>Scheduler</b><span className="sub">how SAOL makes sound when driven by MIDI or SASL</span></div>
      <${Arrow} go=${i === 0 || i === 5} />
      <div className="mv6-two">
        <div className=${c(1)}><b>SAOL</b><span className="sub">orchestra: the instruments (synthesisers)</span></div>
        <div className=${c(3)}><b>SASBF</b><span className="sub">sample banks for wavetable synthesis</span></div>
      </div>
      <${Arrow} go=${i === 0 || i === 6} />
      <div className=${c(6)}><b>AudioBIFS</b><span className="sub">mixing and effects → soundtrack</span></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 48: an AudioBIFS scene tree built from three elementary streams ── */
  function Bifs({ ar }) {
    const steps = [
      { en: 'Three <b>elementary sound streams</b> arrive: Piano, Bass and Vocal.', ar: 'بيوصل 3 <b>elementary sound streams</b>: الـ Piano والـ Bass والـ Vocal.' },
      { en: 'Each stream enters the scene through an <b>AudioSource</b> node.', ar: 'كل stream بيدخل الـ scene عن طريق node اسمها <b>AudioSource</b>.' },
      { en: 'Effects are applied: an <b>AudioFX</b> on the Piano and on the Bass, an <b>AudioDelay</b> on the Vocal.', ar: 'بيتطبق عليهم effects: <b>AudioFX</b> على الـ Piano وعلى الـ Bass، و <b>AudioDelay</b> على الـ Vocal.' },
      { en: 'An <b>AudioMix</b> mixes Piano and Bass; the delayed Vocal gets another <b>AudioFX</b>.', ar: 'الـ <b>AudioMix</b> بيعمل mix للـ Piano والـ Bass؛ والـ Vocal بعد الـ delay بياخد <b>AudioFX</b> تاني.' },
      { en: 'The top <b>AudioMix</b> combines both branches into one sound: the scene describes the mixing and post-production at playback (e.g. voice over background music, fading after 10 s, new music with reverb).', ar: 'الـ <b>AudioMix</b> اللي فوق بيجمع الفرعين في صوت واحد: الـ scene بتوصف الـ mixing والـ post-production وقت التشغيل (زي صوت فوق background music، وبعدين fade بعد 10 ثواني، ومزيكا جديدة عليها reverb).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const mv = !calm();
    const X = [52, 150, 248], lvl = [0, 60, 118, 176];
    const node = (x, y, t, on, hi) => html`<g className=${pop(on)}><rect x=${x - 47} y=${y} width="94" height="30" rx="5" fill=${hi ? 'color-mix(in srgb, var(--k-mm) 20%, var(--paper))' : 'var(--paper)'} stroke=${hi ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${hi ? 2.4 : 1.6} /><text x=${x} y=${y + 20} textAnchor="middle" fontSize="13.5" fontWeight="700">${t}</text></g>`;
    const edge = (x1, y1, x2, y2, on, live) => html`<path d=${`M${x1} ${y1} V${(y1 + y2) / 2} H${x2} V${y2}`} fill="none" stroke=${live ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth=${live ? 2.6 : 1.6} className=${(live && mv ? 'flow ' : '') + pop(on)} />`;
    const SY = [238, 262, 286], SN = ['Piano', 'Bass', 'Vocal'];
    const top = lvl[0] + 10, mid = lvl[1] + 10, fx = lvl[2] + 10, src = lvl[3] + 10;
    return html`<figure className="fig mv6"><div className="fig-stage">
      <svg className="mv6-svg" viewBox="0 0 300 300" role="img" aria-label="AudioBIFS tree: three AudioSources, effects, two AudioMix nodes">
        ${SN.map((n, k) => html`<g key=${k}><text x="4" y=${SY[k] + 5} fontSize="14" fontWeight="700" fontStyle="italic">${n}</text><path d=${`M48 ${SY[k]} H296`} stroke=${i === 0 ? 'var(--k-mm)' : 'var(--graphite)'} strokeWidth="2" className=${i === 0 && mv ? 'flow' : ''} /><circle cx=${X[k]} cy=${SY[k]} r="4.5" fill="var(--ink)" /></g>`)}
        ${X.map((x, k) => edge(x, SY[k], x, src + 30, i >= 1, i === 1))}
        ${X.map((x, k) => edge(x, src, x, fx + 30, i >= 2, i === 2))}
        ${edge(X[0], fx, 101, mid + 30, i >= 3, i === 3)}${edge(X[1], fx, 101, mid + 30, i >= 3, i === 3)}${edge(X[2], fx, X[2], mid + 30, i >= 3, i === 3)}
        ${edge(101, mid, 150, top + 30, i >= 4, i === 4)}${edge(X[2], mid, 150, top + 30, i >= 4, i === 4)}
        ${X.map((x, k) => html`<g key=${k}>${node(x, src, 'AudioSource', i >= 1, i === 1)}</g>`)}
        ${node(X[0], fx, 'AudioFX', i >= 2, i === 2)}${node(X[1], fx, 'AudioFX', i >= 2, i === 2)}${node(X[2], fx, 'AudioDelay', i >= 2, i === 2)}
        ${node(101, mid, 'AudioMix', i >= 3, i === 3)}${node(X[2], mid, 'AudioFX', i >= 3, i === 3)}
        ${node(150, top, 'AudioMix', i >= 4, i === 4)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-6-instr': Instr, 'mm-6-system': System, 'mm-6-concepts': Concepts, 'mm-6-ports': Ports,
    'mm-6-bits': Bits, 'mm-6-classes': Classes, 'mm-6-builder': Builder, 'mm-6-decoder': Decoder,
    'mm-6-size': Size, 'mm-6-wire': Wire, 'mm-6-sysbytes': SysBytes, 'mm-6-patch': Patch,
    'mm-6-drums': Drums, 'mm-6-msblsb': MsbLsb, 'mm-6-sa-tools': SaTools, 'mm-6-bifs': Bifs
  });
})();
/* ── part L7 ── */
// Multimedia visuals, Lecture 7 (Digital Audio Effects): effect chains, EQ shelving/peak filters, wah-wah and the state variable filter, comb filters, vibrato/flanger, ring/amplitude modulation, limiter/compressor/distortion, exciters, panning and reverb (slides 2–118). Every label and number comes from the site's notes or is computed with the slides' own MATLAB methods.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const useMemo = React.useMemo;
  const CSS = `
.mv7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.mv7 .fig-btn.sel{ border-color:var(--k-mm); box-shadow:0 0 0 1px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.mv7-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.mv7-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
.mv7-sl{ display:grid; grid-template-columns:minmax(0, auto) minmax(0, 1fr) auto; gap:8px; align-items:center; font-size:.84rem; color:var(--ink); margin:4px auto; max-width:520px; }
.mv7-sl input{ width:100%; min-width:0; accent-color:var(--k-mm); }
.mv7-sl output{ font:600 .82rem var(--mono); color:var(--k-mm); min-width:62px; text-align:right; }
.mv7-plot{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 6px 3px; max-width:540px; margin:0 auto 8px; }
.mv7-plot svg{ display:block; width:100%; height:auto; }
.mv7-pt{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:0 8px; font-size:.78rem; color:var(--graphite); line-height:1.35; }
.mv7-pt .v{ font-family:var(--mono); color:var(--k-mm); font-weight:700; }
.mv7-ax{ display:flex; justify-content:space-between; font-size:.75rem; color:var(--graphite); font-family:var(--mono); }
.mv7-out{ max-width:540px; margin:6px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font-size:.86rem; line-height:1.55; color:var(--ink); overflow-wrap:anywhere; }
.mv7-out .f{ font-family:var(--mono); font-size:.82rem; }
.mv7-out .k{ color:var(--k-mm); font-weight:700; } .mv7-out .r{ color:var(--pen); font-weight:700; } .mv7-out .g{ color:var(--ok); font-weight:700; }
.mv7-leg{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.8rem; color:var(--ink); margin:0 0 6px; }
.mv7-leg span{ display:inline-flex; align-items:center; gap:5px; } .mv7-leg i{ display:inline-block; width:16px; height:4px; border-radius:2px; }
.mv7-chain{ display:flex; flex-wrap:wrap; gap:4px 2px; justify-content:center; align-items:center; max-width:560px; margin:0 auto 10px; }
.mv7-chain span{ font-size:.78rem; border:1px solid var(--line); border-radius:99px; padding:2px 8px; background:var(--paper); color:var(--ink); transition:background .3s, border-color .3s; }
.mv7-chain span.on{ border-color:var(--k-mm); background:color-mix(in srgb, var(--k-mm) 22%, var(--paper)); font-weight:700; }
.mv7-chain b{ color:var(--k-mm); font-size:.8rem; }
.mv7-mods{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:6px; max-width:560px; margin:0 auto; }
@media (max-width:480px){ .mv7-mods{ grid-template-columns:repeat(2, minmax(0, 1fr)); } }
.mv7-mods button{ font:inherit; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:6px 4px; cursor:pointer; text-align:center; font-size:.78rem; font-weight:700; min-height:40px; transition:opacity .3s, box-shadow .3s; opacity:.6; }
.mv7-mods button small{ display:block; font-weight:400; color:var(--graphite); font-size:.75rem; }
.mv7-mods button.on{ opacity:1; box-shadow:0 0 0 2px var(--k-mm); background:color-mix(in srgb, var(--k-mm) 12%, var(--paper)); }
.mv7-types{ max-width:560px; margin:8px auto 0; display:flex; flex-wrap:wrap; gap:5px; justify-content:center; min-height:28px; }
.mv7-types span{ font-size:.8rem; border:1px solid var(--k-mm); border-radius:99px; padding:2px 9px; background:var(--paper); color:var(--ink); }
.mv7-q{ text-align:center; max-width:520px; margin:0 auto; }
.mv7-q .big{ display:inline-block; font-size:1.2rem; font-weight:700; padding:10px 18px; border:2px solid var(--k-mm); border-radius:12px; background:var(--paper); color:var(--ink); margin:2px 0 10px; }
.mv7-q .cnt{ font-size:.8rem; color:var(--graphite); }
.mv7-cls{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:6px; max-width:520px; margin:0 auto; }
.mv7-cls button{ font:inherit; font-size:.82rem; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:6px; cursor:pointer; min-height:36px; }
.mv7-cls button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 20%, var(--paper)); font-weight:700; }
.mv7-cls button.no{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 14%, var(--paper)); }
.mv7-tbl{ border-collapse:collapse; width:100%; max-width:540px; margin:0 auto; font-size:.82rem; color:var(--ink); }
.mv7-tbl th, .mv7-tbl td{ border:1px solid var(--line); padding:4px 5px; text-align:center; vertical-align:middle; }
.mv7-tbl th{ background:var(--paper-2); font-weight:600; } .mv7-tbl td{ background:var(--paper); }
.mv7-tbl td.l, .mv7-tbl th.l{ text-align:left; }
.mv7-tbl tr.on td{ background:color-mix(in srgb, var(--k-mm) 18%, var(--paper)); font-weight:700; }
.mv7-tbl tr.pick{ cursor:pointer; }
.mv7-tbl .m{ font-family:var(--mono); }
.mv7-in{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:520px; margin:0 auto 8px; font-size:.84rem; color:var(--ink); }
.mv7-in label{ display:grid; gap:3px; font-weight:600; }
.mv7-in input, .mv7-in select{ box-sizing:border-box; width:100%; min-width:0; font:inherit; font-weight:400; font-size:.95rem; padding:5px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.mv7-cells{ display:grid; grid-template-columns:repeat(10, minmax(0, 1fr)); gap:2px; max-width:420px; margin:0 auto 4px; }
.mv7-cells div{ height:26px; border:1px solid var(--line); border-radius:3px; background:var(--paper); }
.mv7-cells div.last{ border:2px solid var(--k-mm); }
.mv7-cl{ display:flex; justify-content:space-between; max-width:420px; margin:0 auto 8px; font-size:.75rem; color:var(--graphite); }
.mv7-gantt{ display:grid; grid-template-columns:96px minmax(0, 1fr); gap:5px 8px; align-items:center; max-width:540px; margin:0 auto; font-size:.8rem; color:var(--ink); }
.mv7-gantt .nm{ line-height:1.2; } .mv7-gantt .nm small{ display:block; color:var(--graphite); font-size:.75rem; }
.mv7-gantt .tr{ position:relative; height:20px; background:var(--paper); border:1px solid var(--line); border-radius:4px; }
.mv7-gantt .tr i{ position:absolute; top:2px; bottom:2px; border-radius:3px; background:color-mix(in srgb, var(--k-mm) 30%, var(--paper)); }
.mv7-gantt .on .tr i, .mv7-gantt .tr.on i{ background:var(--k-mm); }
.mv7-gantt .cur{ position:absolute; top:-3px; bottom:-3px; width:2px; background:var(--pen); }
.mv7-gantt .nm.on{ font-weight:700; color:var(--k-mm); }
.mv7-blk{ display:flex; flex-direction:column; align-items:center; gap:2px; max-width:420px; margin:0 auto; }
.mv7-blk .bx{ width:100%; box-sizing:border-box; border:2px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; text-align:center; font-size:.84rem; color:var(--ink); line-height:1.35; opacity:.4; transition:opacity .4s, border-color .4s; }
.mv7-blk .bx.on{ opacity:1; border-color:var(--k-mm); } .mv7-blk .bx b{ display:block; }
.mv7-blk .bx small{ color:var(--graphite); font-size:.78rem; }
.mv7-blk .ar{ color:var(--k-mm); font-size:1rem; line-height:1; }
.mv7-blk .two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:6px; width:100%; }
.mv7-bars{ display:grid; grid-template-columns:28px minmax(0, 1fr) 64px; gap:6px 8px; align-items:center; max-width:420px; margin:8px auto 0; font-size:.86rem; color:var(--ink); }
.mv7-bars .t{ height:16px; border-radius:4px; background:var(--paper); border:1px solid var(--line); overflow:hidden; }
.mv7-bars .t i{ display:block; height:100%; background:var(--k-mm); transition:width .2s; }
.mv7-bars .t i.r{ background:var(--pen); }
.mv7-bars output{ font:600 .84rem var(--mono); text-align:right; }
@media (prefers-reduced-motion: reduce){ .mv7-chain span, .mv7-mods button, .mv7-blk .bx, .mv7-bars .t i{ transition:none; } }
`;
  if (!document.getElementById('mv7-css')) { const s = document.createElement('style'); s.id = 'mv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const N = (n, f) => Array.from({ length: n }, (_, k) => f(k));
  const f2 = (x, d) => (Math.abs(x) < 1e-12 ? 0 : x).toLocaleString('en-US', { maximumFractionDigits: d == null ? 3 : d, minimumFractionDigits: 0 }).replace('-', '−');
  const fx = (x, d) => (Math.abs(x) < 5 * Math.pow(10, -d - 1) ? 0 : x).toFixed(d).replace('-', '−');
  const Yv = (v, H, lo, hi) => H - (v - lo) / (hi - lo) * H;
  const line = (arr, H, lo, hi, W = 300) => arr.map((v, k) => (k ? 'L' : 'M') + (k * W / (arr.length - 1)).toFixed(1) + ' ' + Math.max(-2, Math.min(H + 2, Yv(v, H, lo, hi))).toFixed(1)).join(' ');
  const band = (arr, H, lo, hi, W = 300, cols = 300) => { let d = ''; for (let c = 0; c < cols; c++) { const a = Math.floor(c * arr.length / cols), b = Math.max(a + 1, Math.floor((c + 1) * arr.length / cols)); let mn = Infinity, mx = -Infinity; for (let k = a; k < b && k < arr.length; k++) { if (arr[k] < mn) mn = arr[k]; if (arr[k] > mx) mx = arr[k]; } if (mn === Infinity) continue; const x = (c + .5) * W / cols, y1 = Yv(mn, H, lo, hi), y2 = Math.min(Yv(mx, H, lo, hi), y1 - .7); d += 'M' + x.toFixed(1) + ' ' + y1.toFixed(1) + 'V' + y2.toFixed(1); } return d; };
  const stems = (vals, H, lo, hi, W = 300, n) => { const L = n || vals.length; let d = ''; const y0 = Yv(0, H, lo, hi); vals.forEach((v, k) => { if (!v) return; const x = (k + .5) * W / L; d += 'M' + x.toFixed(1) + ' ' + y0.toFixed(1) + 'V' + Yv(v, H, lo, hi).toFixed(1); }); return d; };
  const Plot = ({ h = 80, title, right, foot, children }) => html`<div className="mv7-plot">${title && html`<div className="mv7-pt"><span dangerouslySetInnerHTML=${{ __html: title }}></span>${right != null && html`<span className="v">${right}</span>`}</div>`}
    <svg viewBox=${'0 0 300 ' + h} aria-hidden="true" preserveAspectRatio="none">${children}</svg>
    ${foot && html`<div className="mv7-ax">${foot.map((t, k) => html`<span key=${k}>${t}</span>`)}</div>`}</div>`;
  const Sl = ({ label, min, max, step, v, set, show }) => html`<label className="mv7-sl"><span>${label}</span><input type="range" min=${min} max=${max} step=${step} value=${v} onInput=${e => set(+e.target.value)} onChange=${e => set(+e.target.value)} /><output>${show}</output></label>`;
  const Chips = ({ opts, v, set }) => html`<div className="mv7-row">${opts.map(([k, l]) => html`<button key=${k} className=${'fig-btn' + (v === k ? ' sel' : '')} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const Leg = ({ items }) => html`<div className="mv7-leg">${items.map(([c, t], k) => html`<span key=${k}><i style=${{ background: c }}></i>${t}</span>`)}</div>`;
  const mk = (id, c) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`;
  // animation clock in seconds (stops when reduced motion is asked for)
  function useAnim(on) {
    const [t, setT] = useState(0), raf = useRef(0), tt = useRef(0);
    useEffect(() => { if (!on || calm()) return; const t0 = performance.now() - tt.current * 1000; const f = now => { tt.current = (now - t0) / 1000; setT(tt.current); raf.current = requestAnimationFrame(f); }; raf.current = requestAnimationFrame(f); return () => cancelAnimationFrame(raf.current); }, [on]);
    return t;
  }
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  // complex helpers: evaluate a polynomial in z^-1 at angle w
  const pz = (c, w) => { let re = 0, im = 0; c.forEach((v, k) => { re += v * Math.cos(k * w); im -= v * Math.sin(k * w); }); return [re, im]; };
  const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cabs = a => Math.hypot(a[0], a[1]);
  const db = v => 20 * Math.log10(Math.max(v, 1e-6));
  // the slides' symmetrical soft clipping (symclip.m)
  const symclip = v => { const a = Math.abs(v), s = Math.sign(v); if (a < 1 / 3) return 2 * v; if (a > 2 / 3) return s; return s * (3 - Math.pow(2 - a * 3, 2)) / 3; };
  // radix-2 FFT in place
  function fft(re, im, inv) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
    for (let len = 2; len <= n; len <<= 1) { const ang = (inv ? 2 : -2) * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang), h = len >> 1;
      for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < h; k++) { const p = i + k, q = p + h, br = re[q] * cr - im[q] * ci, bi = re[q] * ci + im[q] * cr; re[q] = re[p] - br; im[q] = im[p] - bi; re[p] += br; im[p] += bi; const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t; } } }
    if (inv) for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
  }
  // fconv.m: fast convolution with the FFT, normalised to ±1
  function fconv(x, h) {
    const Ly = x.length + h.length - 1; let n = 1; while (n < Ly) n <<= 1;
    const xr = new Float64Array(n), xi = new Float64Array(n), hr = new Float64Array(n), hi = new Float64Array(n);
    xr.set(x); hr.set(h); fft(xr, xi); fft(hr, hi);
    for (let k = 0; k < n; k++) { const r = xr[k] * hr[k] - xi[k] * hi[k], i = xr[k] * hi[k] + xi[k] * hr[k]; xr[k] = r; xi[k] = i; }
    fft(xr, xi, true); const y = Array.from(xr.slice(0, Ly)); let m = 0; y.forEach(v => { m = Math.max(m, Math.abs(v)); }); return { y: y.map(v => v / m), n };
  }
  // magnitude of y = sum over a few lines of a sampled signal (DFT at one frequency)
  const dftMag = (y, f, fs) => { let re = 0, im = 0; for (let k = 0; k < y.length; k++) { const a = 2 * Math.PI * f * k / fs; re += y[k] * Math.cos(a); im -= y[k] * Math.sin(a); } return 2 * Math.hypot(re, im) / y.length; };

  /* ── slides 2–3: series and parallel chains, and why the order matters ── */
  function FxOrder({ ar }) {
    const steps = [
      { en: 'In <b>series</b>, each effect feeds the next one: x(n) → effect 1 → effect 2 → y(n).', ar: 'في الـ <b>series</b> كل effect بيدخل في اللي بعده:<span class="ltr">x(n) → effect 1 → effect 2 → y(n)</span>' },
      { en: 'In a <b>parallel</b> audio chain the signal is split, each branch gets its own effect, and the branches are mixed (+).', ar: 'في الـ audio chain الـ <b>parallel</b> الإشارة بتتقسم، كل فرع ليه effect، وبعدين الفروع بتتجمع (+).' },
      { en: 'Order matters. <b>Tremolo then Overdrive</b> (the lecture\'s tremolo1.m, 5 Hz, α = 0.5, then symclip.m) on a 0.9 sine: the clipping flattens the tremolo, the peaks only swing between <b>__A__</b>.', ar: 'الترتيب بيفرق. <b>Tremolo وبعده Overdrive</b> (الـ tremolo1.m بتاع المحاضرة على <bdi>5 Hz</bdi> و<bdi>α = 0.5</bdi> وبعده الـ symclip.m) على sine ارتفاعها 0.9: الـ clipping بيفرد الـ tremolo، والقمم بتتحرك بس بين<span class="ltr">__A__</span>' },
      { en: '<b>Overdrive then Tremolo</b>: the same two effects, swapped. Now the tremolo comes after the clipping, so the peaks swing fully between <b>__B__</b>.', ar: '<b>Overdrive وبعده Tremolo</b>: نفس الـ effects بس بالعكس. دلوقتي الـ tremolo جاي بعد الـ clipping، فالقمم بتتحرك على الآخر بين<span class="ltr">__B__</span>' },
      { en: 'Same effects, drastically different output. There is <b>no absolute rule</b> for the order: it depends on the sound you want.', ar: 'نفس الـ effects والـ output مختلف خالص. ومفيش <b>قاعدة ثابتة</b> للترتيب: ده بيعتمد على الصوت اللي انت عايزه.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const fs = 2000, n = 800, f0 = 40, al = .5, tr = k => 1 + al * Math.sin(2 * Math.PI * 5 * k / fs);
    const x = useMemo(() => N(n, k => .9 * Math.sin(2 * Math.PI * f0 * k / fs)), []);
    const A = useMemo(() => x.map((v, k) => symclip(v * tr(k))), []), B = useMemo(() => x.map((v, k) => symclip(v) * tr(k)), []);
    const rA = f2(symclip(.9 * (1 - al)), 2) + ' and ' + f2(symclip(.9 * (1 + al)), 2), rB = f2(symclip(.9) * (1 - al), 2) + ' and ' + f2(symclip(.9) * (1 + al), 2);
    const sub = s => ({ en: s.en.replace('__A__', rA).replace('__B__', rB), ar: s.ar.replace('__A__', rA).replace('__B__', rB) });
    const par = i === 1, lab = i === 2 ? ['Tremolo', 'Overdrive'] : i === 3 ? ['Overdrive', 'Tremolo'] : ['Effect 1', 'Effect 2'];
    const box = (x0, y0, t) => html`<g><rect x=${x0} y=${y0} width="94" height="34" rx="6" fill="color-mix(in srgb, var(--k-mm) 16%, var(--paper))" stroke="var(--k-mm)" strokeWidth="2" /><text x=${x0 + 47} y=${y0 + 23} textAnchor="middle" fontSize="15" fontWeight="600">${t}</text></g>`;
    const H = 70, show = i === 2 ? [[A, 'var(--k-mm)', 'Tremolo → Overdrive']] : i === 3 ? [[B, 'var(--k-mm)', 'Overdrive → Tremolo']] : i === 4 ? [[A, 'var(--pen)', 'Tremolo → Overdrive'], [B, 'var(--k-mm)', 'Overdrive → Tremolo']] : [[x, 'var(--graphite)', 'Input x(n): a 0.9 sine']];
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 320 112" role="img" aria-label=${par ? 'Parallel chain' : 'Series chain'}><defs>${mk('mv7-fo-a', 'var(--graphite)')}</defs>
        <text x="2" y="61" fontSize="15">x(n)</text><text x="318" y="61" fontSize="15" textAnchor="end">y(n)</text>
        ${par ? html`<g>
          <path d="M34 56 H52 M52 22 V90 M52 22 H74 M52 90 H74" stroke="var(--graphite)" strokeWidth="2" fill="none" />
          <path d="M52 22 H76" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-fo-a)" /><path d="M52 90 H76" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-fo-a)" />
          ${box(78, 5, lab[0])}${box(78, 73, lab[1])}
          <path d="M172 22 H238 V44 M172 90 H238 V68" stroke="var(--graphite)" strokeWidth="2" fill="none" markerEnd="url(#mv7-fo-a)" />
          <circle cx="238" cy="56" r="12" fill="var(--paper)" stroke="var(--k-mm)" strokeWidth="2" /><text x="238" y="61" textAnchor="middle" fontSize="16" fontWeight="700">+</text>
          <path d="M250 56 H280" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-fo-a)" /></g>`
        : html`<g><path d="M34 56 H58" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-fo-a)" />${box(60, 39, lab[0])}
          <path d="M154 56 H170" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-fo-a)" />${box(172, 39, lab[1])}
          <path d="M266 56 H282" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-fo-a)" /></g>`}
      </svg>
      ${show.map(([d, c, t], k) => html`<${Plot} key=${k + '-' + i} h=${H} title=${t}><path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" /><path d=${line(d, H, -1.6, 1.6)} stroke=${c} strokeWidth="1.3" fill="none" /><//>`)}
      </div>
      <${Cap} ...${sub(steps[i])} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 3: the standard order and the Zoom G1/G1X pedal's 8 serial modules ── */
  const MODS = [['COMP/EFX', 'Compression', ['Compressor', 'Auto Wah', 'Booster', 'Tremolo', 'Phaser', '…']], ['DRIVE', 'Distortion', ['FD Clean', 'VX Clean', 'HW Clean', 'US Blues', 'BG Crunch', '…']], ['EQ', 'EQ', []], ['ZNR', 'Noise Redux', ['ZNR']], ['AMP', 'Amp Sim', ['AMP Sim.']], ['MODULATION', 'Modulation', ['Chorus', 'Ensemble', 'Flanger', 'Step', 'Pitch Shift', '…']], ['DELAY', 'Delay', ['Delay', 'Tape Echo', 'Analog Delay', 'Ping Pong Delay']], ['REVERB', 'Reverb', ['Hall', 'Room', 'Spring', 'Arena', 'Tiled Room']]];
  function FxPedal({ ar }) {
    const steps = [{ en: 'A standard order: <b>Compression → Distortion → EQ → Noise Redux → Amp Sim → Modulation → Delay → Reverb</b>. The Zoom G1/G1X pedal links <b>8 modules in series</b> in this order. Tap a module.', ar: 'ترتيب standard:<span class="ltr">Compression → Distortion → EQ → Noise Redux → Amp Sim → Modulation → Delay → Reverb</span>والـ pedal بتاع Zoom G1/G1X بيوصل <b>8 modules ورا بعض</b> بنفس الترتيب ده. دوس على أي module.' }]
      .concat(MODS.map(([m, s, t], j) => ({ en: `Module ${j + 1}: <b>${m}</b> (${s}). ${t.length ? 'You pick one effect type from several: ' + t.join(', ') + '.' : 'The slide lists no types under it.'}`, ar: `الـ module رقم ${j + 1} هو <b>${m}</b> (${s}). ${t.length ? 'بتختار effect type واحد من كذا اختيار (تحت).' : 'الـ slide مش كاتبة types تحته.'}` })));
    const [i, ctl] = useSteps(steps.length, 1700);
    const cur = i - 1;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <div className="mv7-chain">${MODS.map(([, s], j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<b>→</b>`}<span className=${cur === j || i === 0 ? 'on' : ''}>${s}</span><//>`)}</div>
      <div className="mv7-mods">${MODS.map(([m], j) => html`<button key=${j} className=${cur === j ? 'on' : ''} onClick=${() => ctl.go(j + 1)}><small>${j + 1}</small>${m}</button>`)}</div>
      <div className="mv7-types">${cur >= 0 && MODS[cur][2].map((t, k) => html`<span key=${k}>${t}</span>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 4: classify effects by the way they process the signal (sorting game) ── */
  const CLS = [['Basic filtering', 'الـ Basic filtering'], ['Time-varying filters', 'الـ Time-varying filters'], ['Delays', 'الـ Delays'], ['Modulators', 'الـ Modulators'], ['Non-linear processing', 'الـ Non-linear processing'], ['Spatial effects', 'الـ Spatial effects']];
  const EFX = [['Lowpass', [0]], ['Wah-wah', [1]], ['Echo', [2]], ['Ring modulation', [3]], ['Compression', [4]], ['Reverb', [5]], ['Equaliser', [0]], ['Phaser', [1]], ['Flanger', [2]], ['Tremolo', [3]], ['Distortion', [4]], ['Panning', [5]], ['Chorus', [2]], ['Vibrato', [2, 3]], ['Limiters', [4]], ['Highpass', [0]], ['Exciters/Enhancers', [4]], ['Surround sound', [5]]];
  function FxClasses({ ar }) {
    const [k, setK] = useState(0), [pick, setPick] = useState([]), [score, setScore] = useState(0), [all, setAll] = useState(false);
    const done = k >= EFX.length, e = EFX[k], right = e && pick.some(p => e[1].includes(p));
    const tap = c => { if (right || pick.includes(c)) return; setPick(p => p.concat(c)); if (e[1].includes(c) && !pick.length) setScore(s => s + 1); };
    const next = () => { setK(k + 1); setPick([]); };
    let en, a;
    if (done || all) { en = `The six classes, by the way the signal is processed.${done ? ` You got <b>${score} of ${EFX.length}</b> right first time.` : ''} Vibrato sits in two classes: it is a delay effect and a modulator.`; a = `الـ 6 classes حسب طريقة معالجة الإشارة.${done ? ` جبت <b>${score} من ${EFX.length}</b> صح من أول مرة.` : ''} والـ Vibrato موجود في class اتنين: هو delay effect وmodulator كمان.`; }
    else if (!pick.length) { en = `Which class does <b>${e[0]}</b> belong to?`; a = `الـ <b>${e[0]}</b> تبع أنهي class؟`; }
    else if (right) { en = `Right: <b>${e[0]}</b> is in ${e[1].map(c => CLS[c][0]).join(' and ')}.`; a = `صح: الـ <b>${e[0]}</b> تبع ${e[1].map(c => CLS[c][1]).join(' و')}.`; }
    else { en = `Not that one. Try again.`; a = 'مش دي. جرّب تاني.'; }
    return html`<figure className="fig mv7"><div className="fig-stage">
      ${done || all ? html`<table className="mv7-tbl"><tbody>${CLS.map(([c], j) => html`<tr key=${j}><th className="l">${c}</th><td className="l">${(j === 0 ? ['Lowpass', 'Highpass filter', 'Equaliser'] : EFX.filter(x => x[1].includes(j)).map(x => x[0])).join(', ')}</td></tr>`)}</tbody></table>`
      : html`<div className="mv7-q"><div className="cnt">Effect ${k + 1} of ${EFX.length} · score ${score}</div><div className="big">${e[0]}</div></div>
        <div className="mv7-cls">${CLS.map(([c], j) => html`<button key=${j} className=${pick.includes(j) ? (e[1].includes(j) ? 'ok' : 'no') : ''} onClick=${() => tap(j)}>${c}</button>`)}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><button className="fig-btn" onClick=${() => setAll(!all)} disabled=${done}>${all ? 'Back to the game' : 'Show the classes'}</button><span className="grow"></span>
        ${!done && !all && html`<button className="fig-btn solid" onClick=${next} disabled=${!right}>Next ›</button>`}
        <button className="fig-btn" onClick=${() => { setK(0); setPick([]); setScore(0); setAll(false); }}>↻ Start over</button></div></figure>`;
  }

  /* ── slides 5–7, 9, 12, 14–19: shelving and peak filter responses ── */
  function shelving(G, fc, fs, Q, type) { // shelving.m
    const K = Math.tan(Math.PI * fc / fs), r2 = 1 / Q; let V0 = Math.pow(10, G / 20); if (V0 < 1) V0 = 1 / V0; const s = Math.sqrt(V0);
    let b, a;
    if (G > 0 && type === 'bass') { const d = 1 + r2 * K + K * K; b = [(1 + s * r2 * K + V0 * K * K) / d, 2 * (V0 * K * K - 1) / d, (1 - s * r2 * K + V0 * K * K) / d]; a = [1, 2 * (K * K - 1) / d, (1 - r2 * K + K * K) / d]; }
    else if (G < 0 && type === 'bass') { const d = 1 + r2 * s * K + V0 * K * K; b = [(1 + r2 * K + K * K) / d, 2 * (K * K - 1) / d, (1 - r2 * K + K * K) / d]; a = [1, 2 * (V0 * K * K - 1) / d, (1 - r2 * s * K + V0 * K * K) / d]; }
    else if (G > 0) { const d = 1 + r2 * K + K * K; b = [(V0 + r2 * s * K + K * K) / d, 2 * (K * K - V0) / d, (V0 - r2 * s * K + K * K) / d]; a = [1, 2 * (K * K - 1) / d, (1 - r2 * K + K * K) / d]; }
    else if (G < 0) { const d = V0 + r2 * s * K + K * K, e = 1 + r2 / s * K + K * K / V0; b = [(1 + r2 * K + K * K) / d, 2 * (K * K - 1) / d, (1 - r2 * K + K * K) / d]; a = [1, 2 * (K * K / V0 - 1) / e, (1 - r2 / s * K + K * K / V0) / e]; }
    else { b = [1, 0, 0]; a = [1, 0, 0]; }
    return [b, a];
  }
  // 2nd-order peak filter from the difference equation in the notes
  const peakH = (G, fc, fb, fs, w) => {
    const V0 = Math.pow(10, G / 20), H0 = V0 - 1, t = Math.tan(2 * Math.PI * fb / fs), a = G >= 0 ? (t - 1) / (t + 1) : (t - V0) / (t + V0), d = -Math.cos(2 * Math.PI * fc / fs);
    const A2 = cdiv(pz([-a, d * (1 - a), 1], w), pz([1, d * (1 - a), -a], w));
    return [1 + H0 / 2 * (1 - A2[0]), -H0 / 2 * A2[1]];
  };
  function EqResponse({ ar }) {
    const fs = 44100;
    const [mode, setMode] = useState('bass'), [G, setG] = useState(4), [fc, setFc] = useState(300), [Q, setQ] = useState(3), [fb, setFb] = useState(400);
    const lf = Math.log10(fc), F = N(161, k => Math.pow(10, Math.log10(20) + 3 * k / 160));
    const resp = g => F.map(f => { const w = 2 * Math.PI * f / fs; if (mode === 'peak') return db(cabs(peakH(g, fc, fb, fs, w))); const [b, a] = shelving(g, fc, fs, Q, mode); return db(cabs(cdiv(pz(b, w), pz(a, w)))); });
    const H = 130, lo = -18, hi = 18, xf = f => (Math.log10(f) - Math.log10(20)) / 3 * 300;
    const V0 = Math.pow(10, G / 20), H0 = V0 - 1;
    const ex = () => { setG(4); setQ(3); setFc(mode === 'treble' ? 600 : 300); if (mode === 'peak') { setMode('bass'); setFc(300); } };
    const cur = resp(G);
    const nm = { bass: 'Bass shelf', treble: 'Treble shelf', peak: 'Peak filter' }[mode];
    const en = mode === 'peak' ? `<b>Peak filter</b>: boosts or cuts a <b>mid-frequency band</b> around the centre frequency fc, as wide as the bandwidth fb; frequencies far away stay at 0 dB. Computed with the notes' 2nd-order peak equations (d = −cos(2πfc/fs), fs = 44.1 kHz). Faint curves: the same filter at ±4, ±8, ±12 dB.`
      : `<b>${nm}</b> (shelving.m): ${G >= 0 ? 'boosts' : 'cuts'} the <b>${mode === 'bass' ? 'low' : 'high'}</b> band ${mode === 'bass' ? 'below' : 'above'} the cut-off fc by G dB and leaves the rest at 0 dB. ${G === 4 && Q === 3 && fc === (mode === 'bass' ? 300 : 600) ? 'These are the notes\' demo settings: G = 4 dB, ' + (mode === 'bass' ? 'bass fc = 300 Hz' : 'treble fc = 600 Hz') + ', Q = 3 (fs = 44.1 kHz). Q = 3 replaces the √2 term, which gives the bump and dip around fc.' : 'Faint curves: the same shelf at ±4, ±8, ±12 dB.'}`;
    const a = mode === 'peak' ? 'الـ <b>Peak filter</b>: بيعلّي أو يوطّي <b>band في النص</b> حوالين الـ centre frequency اللي هي fc، وعرضها قد الـ bandwidth اللي هي fb؛ والترددات البعيدة بتفضل على 0 dB. متحسوبة بمعادلات الـ peak من الدرجة التانية اللي في النوتس، والـ fs قيمتها 44.1 kHz. المنحنيات الباهتة هي نفس الفلتر على ±4 و±8 و±12 dB.'
      : `الـ <b>${nm}</b> (من shelving.m): ${G >= 0 ? 'بيعلّي' : 'بيوطّي'} الـ band <b>${mode === 'bass' ? 'الواطية' : 'العالية'}</b> ${mode === 'bass' ? 'تحت' : 'فوق'} الـ cut-off بمقدار G dB، والباقي بيفضل على 0 dB. ${G === 4 && Q === 3 && fc === (mode === 'bass' ? 300 : 600) ? 'دي إعدادات الـ demo في النوتس:<span class="ltr">G = 4 dB, fc = ' + fc + ' Hz, Q = 3, fs = 44.1 kHz</span>والـ Q بتاخد مكان الـ √2 وده اللي بيعمل الـ bump والوادي حوالين fc.' : 'المنحنيات الباهتة هي نفس الـ shelf على ±4 و±8 و±12 dB.'}`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['bass', 'Bass shelf'], ['treble', 'Treble shelf'], ['peak', 'Peak']]} v=${mode} set=${m => { setMode(m); if (m === 'treble' && fc === 300) setFc(600); if (m === 'bass' && fc === 600) setFc(300); if (m === 'peak') setFc(1000); }} />
      <${Plot} h=${H} title=${'Gain (dB) against frequency (log)'} right=${'G = ' + G + ' dB'} foot=${['20 Hz', '200', '2k', '20k']}>
        ${[-12, 0, 12].map(v => html`<path key=${v} d=${'M0 ' + Yv(v, H, lo, hi) + 'H300'} stroke="var(--line)" strokeDasharray=${v ? '3 4' : ''} />`)}
        ${[-12, -8, -4, 4, 8, 12].map(g => html`<path key=${g} d=${line(resp(g), H, lo, hi)} stroke=${g > 0 ? 'var(--k-mm)' : 'var(--pen)'} strokeWidth="1" opacity=".3" fill="none" />`)}
        <path d=${'M' + xf(fc).toFixed(1) + ' 0V' + H} stroke="var(--graphite)" strokeDasharray="4 4" />
        <path d=${line(cur, H, lo, hi)} stroke=${G >= 0 ? 'var(--k-mm)' : 'var(--pen)'} strokeWidth="2.6" fill="none" />
      <//>
      <${Sl} label="G" min=${-12} max=${12} step=${1} v=${G} set=${setG} show=${G + ' dB'} />
      <${Sl} label="fc" min=${Math.log10(50)} max=${Math.log10(10000)} step=${.01} v=${lf} set=${v => setFc(Math.round(Math.pow(10, v) / 10) * 10)} show=${fc + ' Hz'} />
      ${mode === 'peak' ? html`<${Sl} label="fb" min=${50} max=${2000} step=${50} v=${fb} set=${setFb} show=${fb + ' Hz'} />` : html`<${Sl} label="Q" min=${.5} max=${3} step=${.1} v=${Q} set=${setQ} show=${Q.toFixed(1)} />`}
      <div className="mv7-out"><span className="f">V0 = 10^(G/20) = ${f2(V0, 3)} · H0 = V0 − 1 = ${f2(H0, 3)}</span></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${ex}>Example from the notes</button></div></figure>`;
  }

  /* ── slides 8, 10, 11, 13: signal flow graphs of the shelving and peak filters ── */
  function EqFlow({ ar }) {
    const [kind, setKind] = useState('shelf');
    const S = kind === 'shelf' ? [
      { en: '<b>x(n)</b> enters and is split three ways: into A(z), into the ± node, and straight past everything to the last +.', ar: 'الـ <b>x(n)</b> بتدخل وبتتقسم 3 طرق: لـ A(z)، وللـ ± node، وطريق مباشر لآخر +.' },
      { en: '<b>A(z)</b> is a first-order <b>allpass</b>: it passes all frequencies but modifies their phase. y1(n) = a·x(n) + x(n−1) − a·y1(n−1), with a = a<sub>B</sub> (boost) or a<sub>C</sub> (cut).', ar: 'الـ <b>A(z)</b> ده <b>allpass</b> من الدرجة الأولى: بيعدّي كل الترددات بس بيغيّر الـ phase بتاعها.<span class="ltr">y1(n) = a·x(n) + x(n−1) − a·y1(n−1)</span>' },
      { en: '<b>±</b>: + for the LF (bass) shelf, − for the HF (treble) shelf. For the bass shelf, low frequencies leave A(z) in phase (A ≈ +1) so x + y1 ≈ 2x; high frequencies leave inverted (A ≈ −1) and cancel.', ar: 'الـ <b>±</b> بتبقى + للـ LF shelf و − للـ HF shelf. في الـ bass shelf الترددات الواطية بتطلع من A(z) بنفس الـ phase يعني <bdi>A ≈ +1</bdi>، فالمجموع تقريبًا 2x؛ والعالية بتطلع مقلوبة يعني <bdi>A ≈ −1</bdi> فبتلغي بعض.' },
      { en: '<b>× H0/2</b> scales that band, with H0 = V0 − 1 and V0 = 10^(G/20).', ar: 'الـ <b>× H0/2</b> بيكبّر الـ band دي، والـ H0 هي <bdi>V0 − 1</bdi> والـ V0 هي <bdi>10^(G/20)</bdi>.' },
      { en: 'The direct x(n) is added: <b>y(n) = (H0/2)(x(n) ± y1(n)) + x(n)</b>. In the shelf band y ≈ (1 + H0)·x = V0·x; elsewhere y ≈ x.', ar: 'الـ x(n) المباشرة بتتجمع:<span class="ltr">y(n) = (H0/2)(x(n) ± y1(n)) + x(n)</span>في الـ band بتاعة الـ shelf الناتج تقريبًا <bdi>V0·x</bdi>، وفي الباقي تقريبًا x.' }
    ] : [
      { en: '<b>x(n)</b> enters and is split three ways, as in the shelving filter.', ar: 'الـ <b>x(n)</b> بتدخل وبتتقسم 3 طرق زي الـ shelving filter.' },
      { en: '<b>A2(z)</b> is a second-order <b>allpass</b>; its centre is set by d = −cos(2πfc/fs) and its width by a<sub>B</sub>/a<sub>C</sub> (from the bandwidth fb).', ar: 'الـ <b>A2(z)</b> ده <b>allpass</b> من الدرجة التانية؛ المركز بتاعه بيتحدد بـ <bdi>d = −cos(2πfc/fs)</bdi> والعرض بـ a<sub>B</sub> أو a<sub>C</sub> (من الـ bandwidth اللي هي fb).' },
      { en: '<b>× (−1)</b> then + gives x(n) − y1(n). At fc, A2 = −1 so x − y1 = 2x; far from fc, A2 ≈ +1 and they cancel.', ar: 'الـ <b>× (−1)</b> وبعدها + بيدّوا <bdi>x(n) − y1(n)</bdi>. عند fc الـ A2 بتساوي −1 فالناتج 2x؛ وبعيد عن fc الـ A2 تقريبًا +1 فبيلغوا بعض.' },
      { en: '<b>× H0/2</b> scales the band around fc (H0 = V0 − 1).', ar: 'الـ <b>× H0/2</b> بيكبّر الـ band اللي حوالين fc.' },
      { en: 'Add the direct x(n): <b>y(n) = (H0/2)(x(n) − y1(n)) + x(n)</b>, i.e. H(z) = 1 + (H0/2)(1 − A2(z)). At fc the gain is V0; far away it is 1.', ar: 'نجمع الـ x(n) المباشرة:<span class="ltr">y(n) = (H0/2)(x(n) − y1(n)) + x(n)</span>يعني عند fc الـ gain بيبقى V0، وبعيد عنها بيبقى 1.' }
    ];
    const [i, ctl] = useSteps(S.length, 2600);
    const on = k => i >= k ? 'var(--k-mm)' : 'var(--faint)', pk = kind === 'peak';
    const circ = (x, y, t, k) => html`<g><circle cx=${x} cy=${y} r="12" fill="var(--paper)" stroke=${on(k)} strokeWidth="2" /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="15" fontWeight="700">${t}</text></g>`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['shelf', 'Shelving filter'], ['peak', 'Peak filter']]} v=${kind} set=${k => { setKind(k); ctl.replay(); }} />
      <svg viewBox="0 0 320 150" role="img" aria-label="Signal flow graph"><defs>${mk('mv7-ef-a', 'var(--graphite)')}</defs>
        <text x="0" y="90" fontSize="15">x(n)</text>
        <path d="M34 95 H50" stroke=${on(0)} strokeWidth="2" /><circle cx="50" cy="95" r="3.5" fill=${on(0)} />
        <path d="M50 95 V30 H268 V80" stroke=${on(0)} strokeWidth="2" fill="none" markerEnd="url(#mv7-ef-a)" />
        <path d=${'M50 95 V132 H' + (pk ? 192 : 186) + ' V110'} stroke=${on(0)} strokeWidth="2" fill="none" markerEnd="url(#mv7-ef-a)" />
        <path d="M50 95 H62" stroke=${on(1)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" />
        <rect x="64" y="80" width="46" height="30" rx="3" fill="var(--paper)" stroke=${on(1)} strokeWidth="2" /><text x="87" y="100" textAnchor="middle" fontSize="15">${pk ? 'A2' : 'A(z)'}</text>
        <text x=${pk ? 116 : 128} y="86" fontSize="14">y1</text>
        ${pk ? html`<g><path d="M110 95 H134" stroke=${on(2)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" />${circ(148, 95, '×', 2)}<text x="140" y="74" fontSize="14">−1</text><path d="M160 95 H178" stroke=${on(2)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" />${circ(192, 95, '+', 2)}</g>`
          : html`<g><path d="M110 95 H172" stroke=${on(2)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" />${circ(186, 95, '±', 2)}</g>`}
        <path d=${'M' + (pk ? 204 : 198) + ' 95 H214'} stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" />${circ(228, 95, '×', 3)}<text x="210" y="74" fontSize="14">H0/2</text>
        <path d="M240 95 H254" stroke=${on(4)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" />${circ(268, 95, '+', 4)}
        <path d="M280 95 H300" stroke=${on(4)} strokeWidth="2" markerEnd="url(#mv7-ef-a)" /><text x="320" y="122" textAnchor="end" fontSize="15">y(n)</text>
      </svg></div>
      <${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 9: gain in dB to V0 and H0 ── */
  function EqDb({ ar }) {
    const [G, setG] = useState(4);
    const V0 = Math.pow(10, G / 20), H0 = V0 - 1, top = Math.max(1, V0) * 1.1, H = 70;
    const s = N(201, k => Math.sin(2 * Math.PI * 2 * k / 200));
    const ex = { 4: ['G = 4 dB is the EQ demo: V0 = 1.585, H0 = 0.585.', 'الـ <bdi>G = 4 dB</bdi> هو الـ demo بتاع الـ EQ:<span class="ltr">V0 = 1.585, H0 = 0.585</span>'], 20: ['G = 20 dB: V0 = 10, H0 = 9 (ten times the amplitude).', 'الـ <bdi>G = 20 dB</bdi> يعني الـ amplitude بتتضرب في 10:<span class="ltr">V0 = 10, H0 = 9</span>'], 6: ['G = 6 dB: V0 ≈ 1.995, about doubling the amplitude.', 'الـ <bdi>G = 6 dB</bdi> يعني الـ amplitude تقريبًا بتتضاعف:<span class="ltr">V0 ≈ 1.995</span>'] }[G];
    const en = (ex ? ex[0] + ' ' : '') + (G < 0 ? 'A negative G is a <b>cut</b>: V0 < 1 and H0 is negative.' : G === 0 ? 'G = 0 dB: V0 = 1 and H0 = 0, the signal is unchanged.' : 'The coloured wave is the input (dashed, amplitude 1) multiplied by V0.');
    const a = (ex ? ex[1] : '') + (G < 0 ? 'لو الـ G بالسالب يبقى <b>cut</b>: الـ V0 أقل من 1 والـ H0 بالسالب.' : G === 0 ? 'لما الـ G بصفر الإشارة مش بتتغير.' : 'الموجة الملوّنة هي الـ input (المتقطعة، ارتفاعها 1) مضروبة في V0.');
    return html`<figure className="fig mv7"><div className="fig-stage">
      <div className="mv7-row">${[4, 6, 20, -6].map(g => html`<button key=${g} className=${'fig-btn' + (G === g ? ' sel' : '')} onClick=${() => setG(g)}>${g} dB</button>`)}</div>
      <${Sl} label="G" min=${-20} max=${20} step=${1} v=${G} set=${setG} show=${G + ' dB'} />
      <${Plot} h=${H} title="Amplitude: input 1 against V0">
        <path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" />
        <path d=${line(s, H, -top, top)} stroke="var(--graphite)" strokeDasharray="4 3" fill="none" />
        <path d=${line(s.map(v => v * V0), H, -top, top)} stroke=${G >= 0 ? 'var(--k-mm)' : 'var(--pen)'} strokeWidth="2.2" fill="none" />
      <//>
      <div className="mv7-out"><div className="f">V0 = 10^(${G}/20) = <span className="k">${f2(V0, 3)}</span></div><div className="f">H0 = V0 − 1 = <span className="k">${f2(H0, 3)}</span></div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* state variable filter: transfer functions of the three outputs (slides 25–26) */
  const svf = (fc, d, fs, w) => {
    const F1 = 2 * Math.sin(Math.PI * fc / fs), Q1 = 2 * d, z1 = [Math.cos(w), -Math.sin(w)], u = [1 - z1[0], -z1[1]], u2 = cmul(u, u), zu = cmul(z1, u);
    const D = [u2[0] + Q1 * F1 * zu[0] + F1 * F1 * z1[0], u2[1] + Q1 * F1 * zu[1] + F1 * F1 * z1[1]];
    return { l: cdiv([F1 * F1, 0], D), b: cdiv([F1 * u[0], F1 * u[1]], D), h: cdiv(u2, D), F1, Q1 };
  };
  const tri = t => { const p = (t % 2.5) / 1.25; return p < 1 ? 500 + 2500 * p : 3000 - 2500 * (p - 1); }; // 500 ↔ 3000 Hz at Fw = 2000 Hz/s

  /* ── slides 22–23, 27: wah-wah signal flow, and the phaser (notch instead of bandpass) ── */
  function WahFlow({ ar }) {
    const [mode, setMode] = useState('bp'), [run, setRun] = useState(true);
    const t = useAnim(run), fc = calm() ? 1500 : tri(t), fs = 44100, H = 90;
    const F = N(161, k => 20 + k * 25);
    const filt = F.map(f => { const r = svf(fc, .05, fs, 2 * Math.PI * f / fs); return mode === 'bp' ? [r.b[0] * r.Q1, r.b[1] * r.Q1] : [r.l[0] + r.h[0], r.l[1] + r.h[1]]; });
    const out = filt.map(h => cabs([.5 + .5 * h[0], .5 * h[1]]));
    const en = mode === 'bp' ? '<b>Wah-wah</b>: a <b>bandpass</b> filter (BP) with a small bandwidth whose centre frequency is varied in time (here swept 500 ↔ 3000 Hz). The filtered signal (wah-mix) is added to the direct signal (direct-mix); 0.5 and 0.5 are example mixes.'
      : '<b>Phaser</b>: the same structure with a <b>notch</b> (band-reject) filter replacing the bandpass, so a moving dip is cut into the spectrum instead of a moving peak.';
    const a = mode === 'bp' ? 'الـ <b>Wah-wah</b>: <b>bandpass</b> filter عرضه صغير والـ centre frequency بتاعته بتتغير مع الوقت (هنا من 500 لـ 3000 Hz ورجوع). الإشارة المفلترة (wah-mix) بتتجمع مع الإشارة المباشرة (direct-mix)؛ والـ 0.5 و0.5 قيم مثال.'
      : 'الـ <b>Phaser</b>: نفس التركيبة بس بـ <b>notch</b> filter بدل الـ bandpass، فبيتعمل وادي بيتحرك في الـ spectrum بدل قمة بتتحرك.';
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['bp', 'Wah-wah (BP)'], ['notch', 'Phaser (notch)']]} v=${mode} set=${setMode} />
      <svg viewBox="0 0 320 112" role="img" aria-label="Wah-wah signal flow"><defs>${mk('mv7-wf-a', 'var(--graphite)')}</defs>
        <text x="0" y="36" fontSize="15">x(n)</text><path d="M34 31 H50" stroke="var(--graphite)" strokeWidth="2" /><circle cx="50" cy="31" r="3.5" fill="var(--graphite)" />
        <path d="M50 31 H186" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-wf-a)" />
        <circle cx="200" cy="31" r="12" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" /><text x="200" y="36" textAnchor="middle" fontSize="15">×</text><text x="200" y="12" textAnchor="middle" fontSize="14">direct-mix</text>
        <path d="M212 31 H252" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-wf-a)" />
        <circle cx="266" cy="31" r="12" fill="var(--paper)" stroke="var(--k-mm)" strokeWidth="2" /><text x="266" y="36" textAnchor="middle" fontSize="15">+</text>
        <path d="M278 31 H296" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-wf-a)" /><text x="320" y="58" textAnchor="end" fontSize="15">y(n)</text>
        <path d="M50 31 V86 H84" stroke="var(--graphite)" strokeWidth="2" fill="none" markerEnd="url(#mv7-wf-a)" />
        <rect x="86" y="70" width="66" height="32" rx="3" fill="color-mix(in srgb, var(--k-mm) 18%, var(--paper))" stroke="var(--k-mm)" strokeWidth="2" /><text x="119" y="91" textAnchor="middle" fontSize="15" fontWeight="700">${mode === 'bp' ? 'BP' : 'Notch'}</text>
        <path d="M152 86 H186" stroke="var(--graphite)" strokeWidth="2" markerEnd="url(#mv7-wf-a)" />
        <circle cx="200" cy="86" r="12" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" /><text x="200" y="91" textAnchor="middle" fontSize="15">×</text><text x="232" y="110" textAnchor="middle" fontSize="14">wah-mix</text>
        <path d="M212 86 H266 V45" stroke="var(--graphite)" strokeWidth="2" fill="none" markerEnd="url(#mv7-wf-a)" />
      </svg>
      <${Plot} h=${H} title=${'Response, 0 to 4 kHz (dashed: the filter alone)'} right=${'fc = ' + Math.round(fc) + ' Hz'} foot=${['0', '1k', '2k', '3k', '4k']}>
        <path d=${line(filt.map(cabs), H, 0, 1.1)} stroke="var(--graphite)" strokeDasharray="4 3" fill="none" />
        <path d=${line(out, H, 0, 1.1)} stroke="var(--k-mm)" strokeWidth="2.4" fill="none" />
      <//></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>${!calm() && html`<button className="fig-btn" onClick=${() => setRun(!run)}>${run ? '❚❚ Pause' : '▶ Play'}</button>`}</div></figure>`;
  }

  /* ── slide 23: the M-fold wah-wah ── */
  function MFold({ ar }) {
    const [M, setM] = useState(8), [d, setD] = useState(.05), [run, setRun] = useState(true);
    const t = useAnim(run), ph = calm() ? .3 : (t * .25) % 1, fs = 44100, H = 90;
    const F = N(161, k => Math.pow(10, 2 + 2 * k / 160));
    const cs = N(M, k => 200 * Math.pow(40, (k + ph) / M));
    const mag = F.map(f => { const w = 2 * Math.PI * f / fs; let s = 0; cs.forEach(c => { const r = svf(c, d, fs, w); s = Math.max(s, cabs(r.b) * r.Q1); }); return s; });
    const en = `<b>M-fold wah-wah</b>: M = ${M} bandpass filters spread over the whole spectrum change their centre frequencies <b>simultaneously</b> (they all slide up together). A <b>bell</b> effect needs about a hundred of them with <b>narrow</b> bandwidths: try M = 100 with a small damping.`;
    const a = `الـ <b>M-fold wah-wah</b>: عدد ${M} bandpass filters متوزعين على الـ spectrum كله، وبيغيّروا الـ centre frequencies <b>في نفس الوقت</b> (كلهم بيطلعوا مع بعض). الـ <b>bell</b> effect محتاج حوالي 100 منهم بـ bandwidth <b>ضيق</b>: جرّب 100 مع damping صغير.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Plot} h=${H} title=${'Bandpass responses, 100 Hz to 10 kHz (log)'} right=${'M = ' + M} foot=${['100', '1k', '10k']}>
        <path d=${line(mag, H, 0, 1.1)} stroke="var(--k-mm)" strokeWidth="1.8" fill="none" />
      <//>
      <${Sl} label="M" min=${1} max=${100} step=${1} v=${M} set=${setM} show=${M + ' filters'} />
      <${Sl} label="damping" min=${.005} max=${.2} step=${.005} v=${d} set=${setD} show=${d.toFixed(3)} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>${!calm() && html`<button className="fig-btn" onClick=${() => setRun(!run)}>${run ? '❚❚ Pause' : '▶ Play'}</button>`}</div></figure>`;
  }

  /* ── slides 24–26: the state variable filter, impulse run sample by sample ── */
  function SvfStep({ ar }) {
    const fs = 44100, fc = 1000, d = .05, F1 = 2 * Math.sin(Math.PI * fc / fs), Q1 = 2 * d;
    const R = []; { let yh = 1, yb = F1 * yh, yl = F1 * yb; R.push([1, 1, yh, yb, yl]); for (let n = 2; n <= 4; n++) { yh = 0 - yl - Q1 * yb; yb = F1 * yh + yb; yl = F1 * yb + yl; R.push([n, 0, yh, yb, yl]); } }
    const r = k => R[k].slice(2).map(v => fx(v, 4));
    const steps = [
      { en: 'The <b>State Variable Filter</b> gives independent control of the cut-off (through F1) and the damping (through Q1), and outputs <b>lowpass yl, bandpass yb and highpass yh</b> at the same time. Example: fc = 1000 Hz, fs = 44100 Hz, d = 0.05.', ar: 'الـ <b>State Variable Filter</b> بيدّي تحكم مستقل في الـ cut-off (عن طريق F1) والـ damping (عن طريق Q1)، وبيطلّع <b>lowpass وbandpass وhighpass</b> في نفس الوقت. مثال:<span class="ltr">fc = 1000 Hz, fs = 44100 Hz, d = 0.05</span>' },
      { en: `Tuning coefficients: F1 = 2 sin(π·1000/44100) = 2 sin(0.07124) = <b>${fx(F1, 4)}</b>, Q1 = 2d = <b>${fx(Q1, 1)}</b>.`, ar: `معاملات الضبط:<span class="ltr">F1 = 2 sin(π·1000/44100) = ${fx(F1, 4)}<br>Q1 = 2d = ${fx(Q1, 1)}</span>` },
      { en: `First sample of a unit impulse (as wah_wah.m starts): yh(1) = x(1) = 1, yb(1) = F1·yh(1) = ${r(0)[1]}, yl(1) = F1·yb(1) = ${r(0)[2]}.`, ar: `أول sample من unit impulse (زي ما wah_wah.m بيبدأ):<span class="ltr">yh(1) = 1, yb(1) = ${r(0)[1]}, yl(1) = ${r(0)[2]}</span>` },
      { en: `n = 2 (x = 0): yh = x − yl(1) − Q1·yb(1) = ${r(1)[0]}; yb = F1·yh + yb(1) = ${r(1)[1]}; yl = F1·yb + yl(1) = ${r(1)[2]}.`, ar: `عند n = 2 والـ x بصفر:<span class="ltr">yh = x − yl(1) − Q1·yb(1) = ${r(1)[0]}<br>yb = F1·yh + yb(1) = ${r(1)[1]}<br>yl = F1·yb + yl(1) = ${r(1)[2]}</span>` },
      { en: 'Each output feeds the next through ×F1 and an accumulator (T), and the highpass node subtracts the delayed lowpass and Q1 × the delayed bandpass. A lower damping d gives a smaller pass band.', ar: 'كل output بيدخل في اللي بعده عن طريق ×F1 وaccumulator (T)، والـ highpass node بتطرح الـ lowpass المتأخر و Q1 مضروبة في الـ bandpass المتأخر. والـ damping الأقل بيدّي pass band أصغر.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const c = (x, y, t) => html`<g><circle cx=${x} cy=${y} r="11" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="15">${t}</text></g>`;
    const T = (x, y) => html`<g><rect x=${x - 11} y=${y - 11} width="22" height="22" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="14">T</text></g>`;
    const tap = (x, t, col) => html`<g><circle cx=${x} cy="62" r="3.5" fill=${col} /><path d=${'M' + x + ' 62 V24'} stroke=${col} strokeWidth="2" /><text x=${x} y="18" textAnchor="middle" fontSize="15" fontWeight="700" style=${{ fill: col }}>${t}</text></g>`;
    const g = 'var(--graphite)';
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 320 178" role="img" aria-label="State variable filter diagram"><defs>${mk('mv7-sv-a', g)}</defs>
        <text x="0" y="56" fontSize="15">x</text><path d="M12 62 H30" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(42, 62, '+')}
        <path d="M53 62 H96" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(108, 62, '×')}<text x="108" y="44" textAnchor="middle" fontSize="14">F1</text>
        <path d="M119 62 H138" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(150, 62, '+')}
        <path d="M161 62 H204" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(216, 62, '×')}<text x="216" y="44" textAnchor="middle" fontSize="14">F1</text>
        <path d="M227 62 H246" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(258, 62, '+')}
        <path d="M269 62 H318" stroke=${g} strokeWidth="2" />
        ${tap(72, 'yh', 'var(--pen)')}${tap(182, 'yb', 'var(--k-mm)')}${tap(296, 'yl', 'var(--ok)')}
        <path d="M182 62 V98 H174" stroke=${g} strokeWidth="2" fill="none" />${T(162, 98)}<path d="M151 98 H150 V74" stroke=${g} strokeWidth="2" fill="none" markerEnd="url(#mv7-sv-a)" />
        <path d="M296 62 V98 H282" stroke=${g} strokeWidth="2" fill="none" />${T(270, 98)}<path d="M259 98 H258 V74" stroke=${g} strokeWidth="2" fill="none" markerEnd="url(#mv7-sv-a)" />
        <path d="M182 98 V132 H174" stroke=${g} strokeWidth="2" fill="none" />${T(162, 132)}<path d="M151 132 H120" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(108, 132, '×')}<text x="76" y="124" textAnchor="middle" fontSize="14">−Q1</text>
        <path d="M296 98 V164 H174" stroke=${g} strokeWidth="2" fill="none" />${T(162, 164)}<path d="M151 164 H120" stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sv-a)" />${c(108, 164, '×')}<text x="80" y="158" textAnchor="middle" fontSize="14">−1</text>
        <path d="M97 132 H42 V74 M97 164 H42 V132" stroke=${g} strokeWidth="2" fill="none" markerEnd="url(#mv7-sv-a)" />
      </svg>
      <table className="mv7-tbl"><thead><tr><th>n</th><th>x</th><th style=${{ color: 'var(--pen)' }}>yh</th><th style=${{ color: 'var(--k-mm)' }}>yb</th><th style=${{ color: 'var(--ok)' }}>yl</th></tr></thead>
        <tbody>${R.slice(0, 4).map((row, k) => html`<tr key=${k} className=${i === k + 2 ? 'on' : ''} style=${{ opacity: i >= k + 2 || (i === 4 && k < 3) ? 1 : .25 }}><td>${row[0]}</td><td>${row[1]}</td>${row.slice(2).map((v, j) => html`<td key=${j} className="m">${i >= k + 2 || (i === 4 && k < 3) ? fx(v, 4) : '·'}</td>`)}</tr>`)}</tbody></table></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 27–31: wah-wah = state variable filter with a swept fc ── */
  function WahSweep({ ar }) {
    const fs = 44100, [d, setD] = useState(.05), [run, setRun] = useState(true), [man, setMan] = useState(1000);
    const t = useAnim(run), live = run && !calm(), fc = live ? tri(t) : man, F1 = 2 * Math.sin(Math.PI * fc / fs);
    const F = N(161, k => Math.pow(10, 2 + 2 * k / 160));
    const R = F.map(f => svf(fc, d, fs, 2 * Math.PI * f / fs)), H = 110, lo = -40, hi = 40;
    const tt = N(201, k => k * 5 / 200), Ht = 50;
    const en = `wah_wah.m sweeps fc as a <b>triangle wave</b> between 500 and 3000 Hz at Fw = 2000 Hz per second, damping 0.05. <b>F1 must be recalculated every time fc changes</b>: now fc = ${Math.round(fc)} Hz, F1 = 2 sin(π fc/fs) = ${fx(F1, 4)}, Q1 = 2d = ${fx(2 * d, 3)}. The bandpass output (yb) is the wah. A lower damping gives a smaller pass band.`;
    const a = `الـ wah_wah.m بيحرّك الـ fc كـ <b>triangle wave</b> بين 500 و3000 Hz بسرعة <bdi>Fw = 2000 Hz</bdi> في الثانية، والـ damping قيمته 0.05. <b>لازم نحسب F1 من جديد كل ما الـ fc تتغير</b>:<span class="ltr">fc = ${Math.round(fc)} Hz, F1 = 2 sin(π fc/fs) = ${fx(F1, 4)}, Q1 = 2d = ${fx(2 * d, 3)}</span>والـ bandpass output (yb) هو الـ wah. والـ damping الأقل بيدّي pass band أصغر.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Plot} h=${Ht} title="fc over 5 s: 500 ↔ 3000 Hz" right=${Math.round(fc) + ' Hz'}>
        <path d=${line(tt.map(tri), Ht, 400, 3100)} stroke="var(--graphite)" strokeWidth="1.6" fill="none" />
        ${live && html`<circle cx=${(t % 5) / 5 * 300} cy=${Yv(fc, Ht, 400, 3100)} r="5" fill="var(--pen)" />`}
      <//>
      <${Leg} items=${[['var(--ok)', 'lowpass yl'], ['var(--k-mm)', 'bandpass yb'], ['var(--pen)', 'highpass yh']]} />
      <${Plot} h=${H} title="Gain (dB), 100 Hz to 10 kHz (log)" foot=${['100', '1k', '10k']}>
        <path d=${'M0 ' + Yv(0, H, lo, hi) + 'H300'} stroke="var(--line)" />
        <path d=${line(R.map(r => db(cabs(r.l))), H, lo, hi)} stroke="var(--ok)" strokeWidth="1.6" fill="none" />
        <path d=${line(R.map(r => db(cabs(r.h))), H, lo, hi)} stroke="var(--pen)" strokeWidth="1.6" fill="none" />
        <path d=${line(R.map(r => db(cabs(r.b))), H, lo, hi)} stroke="var(--k-mm)" strokeWidth="2.6" fill="none" />
      <//>
      <${Sl} label="damping d" min=${.01} max=${.5} step=${.01} v=${d} set=${setD} show=${d.toFixed(2)} />
      ${!live && html`<${Sl} label="fc" min=${500} max=${3000} step=${10} v=${man} set=${setMan} show=${man + ' Hz'} />`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>${!calm() && html`<button className="fig-btn" onClick=${() => { if (run) setMan(Math.round(tri(t) / 10) * 10); setRun(!run); }}>${run ? '❚❚ Pause, set fc by hand' : '▶ Sweep'}</button>`}</div></figure>`;
  }

  /* ── slides 34–35 and 37–38: FIR and IIR comb filter signal flow ── */
  function CombFlow({ ar, kind }) {
    const fir = kind === 'fir';
    const steps = fir ? [
      { en: 'The input <b>x(n)</b> goes straight to the output, multiplied by 1.', ar: 'الـ input <b>x(n)</b> بيروح على طول للـ output مضروب في 1.' },
      { en: 'A copy waits in the delay <b>T<sup>M</sup></b>: after M samples (a time τ) it comes out as <b>x(n − M)</b>.', ar: 'نسخة بتستنى في الـ delay <b>T<sup>M</sup></b>: بعد M samples (وقت τ) بتطلع <b>x(n − M)</b>.' },
      { en: 'The delayed copy is multiplied by the gain <b>g</b>.', ar: 'النسخة المتأخرة بتتضرب في الـ gain اللي هو <b>g</b>.' },
      { en: 'And added to the input: <b>y(n) = x(n) + g·x(n − M)</b>, H(z) = 1 + g·z<sup>−M</sup>. A single delay: one echo (here M = 10, g = 0.5).', ar: 'وبتتجمع على الـ input:<span class="ltr">y(n) = x(n) + g·x(n − M)<br>H(z) = 1 + g·z^−M</span>يعني delay واحد: echo واحد بس (هنا <bdi>M = 10</bdi> و<bdi>g = 0.5</bdi>).' }
    ] : [
      { en: 'The input <b>x(n)</b> is scaled by <b>c</b> (sometimes used to compensate the structure\'s high amplification).', ar: 'الـ input <b>x(n)</b> بيتضرب في <b>c</b> (ساعات بنستخدمه عشان نعوّض التكبير العالي بتاع التركيبة).' },
      { en: 'The <b>output</b> y(n) (not the input) goes into the delay line <b>T<sup>M</sup></b> and comes back M samples later as <b>y(n − M)</b>.', ar: 'الـ <b>output</b> اللي هو y(n) (مش الـ input) بيدخل الـ delay line اللي هي <b>T<sup>M</sup></b> ويرجع بعد M samples كـ <b>y(n − M)</b>.' },
      { en: 'It is attenuated by <b>g</b> on each pass.', ar: 'وبيضعف بـ <b>g</b> في كل لفة.' },
      { en: '<b>y(n) = c·x(n) + g·y(n − M)</b>: the signal circulates in the loop, giving an <b>endless</b> series of echoes, like reflections at both ends of a cylinder (here c = 1, M = 10, g = 0.5).', ar: 'المعادلة:<span class="ltr">y(n) = c·x(n) + g·y(n − M)</span>الإشارة بتلف في الـ loop، فبيطلع عدد <b>مالوش آخر</b> من الـ echoes، زي الانعكاسات على طرفين أسطوانة (هنا <bdi>c = 1</bdi> و<bdi>M = 10</bdi> و<bdi>g = 0.5</bdi>).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const on = k => i >= k ? 'var(--k-mm)' : 'var(--faint)', g = 'var(--graphite)';
    const c = (x, y, t, k) => html`<g><circle cx=${x} cy=${y} r="13" fill="var(--paper)" stroke=${on(k)} strokeWidth="2.2" /><text x=${x} y=${y + 5} textAnchor="middle" fontSize="16" fontWeight="700">${t}</text></g>`;
    const imp = N(50, n => fir ? (n === 0 ? 1 : n === 10 ? .5 : 0) : (n % 10 === 0 ? Math.pow(.5, n / 10) : 0)), Hs = 56;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 320 160" role="img" aria-label=${fir ? 'FIR comb filter' : 'IIR comb filter'}><defs>${mk('mv7-cf-a' + kind, g)}</defs>
        <text x="0" y="28" fontSize="15">x(n)</text><text x="320" y="20" textAnchor="end" fontSize="15">y(n)</text>
        ${fir ? html`<g>
          <path d="M36 34 H80" stroke=${on(0)} strokeWidth="2.2" /><circle cx="80" cy="34" r="4" fill=${on(0)} />
          <path d="M80 34 H138" stroke=${on(0)} strokeWidth="2.2" markerEnd="url(#mv7-cf-afir)" />${c(152, 34, '×', 0)}<text x="152" y="72" textAnchor="middle" fontSize="15">1</text>
          <path d="M165 34 H206" stroke=${on(0)} strokeWidth="2.2" markerEnd="url(#mv7-cf-afir)" />${c(220, 34, '+', 3)}<path d="M233 34 H300" stroke=${on(3)} strokeWidth="2.2" markerEnd="url(#mv7-cf-afir)" />
          <path d="M80 34 V76" stroke=${on(1)} strokeWidth="2.2" markerEnd="url(#mv7-cf-afir)" /><rect x="60" y="78" width="40" height="34" fill="var(--paper)" stroke=${on(1)} strokeWidth="2.2" /><text x="80" y="101" textAnchor="middle" fontSize="15">T<tspan dy="-6" fontSize="14">M</tspan></text>
          <path d="M80 112 V138 H138" stroke=${on(1)} strokeWidth="2.2" fill="none" markerEnd="url(#mv7-cf-afir)" /><text x="2" y="154" fontSize="14">x(n−M)</text>
          ${c(152, 138, '×', 2)}<text x="176" y="154" fontSize="15">g</text>
          <path d="M162 128 L211 45" stroke=${on(3)} strokeWidth="2.2" markerEnd="url(#mv7-cf-afir)" /></g>`
        : html`<g>
          <path d="M36 34 H58" stroke=${on(0)} strokeWidth="2.2" markerEnd="url(#mv7-cf-aiir)" />${c(72, 34, '×', 0)}<text x="72" y="70" textAnchor="middle" fontSize="15">c</text>
          <path d="M85 34 H126" stroke=${on(0)} strokeWidth="2.2" markerEnd="url(#mv7-cf-aiir)" />${c(140, 34, '+', 3)}
          <path d="M153 34 H262" stroke=${on(0)} strokeWidth="2.2" /><circle cx="262" cy="34" r="4" fill=${on(1)} /><path d="M262 34 H300" stroke=${on(0)} strokeWidth="2.2" markerEnd="url(#mv7-cf-aiir)" />
          <path d="M262 34 V76" stroke=${on(1)} strokeWidth="2.2" markerEnd="url(#mv7-cf-aiir)" /><rect x="242" y="78" width="40" height="34" fill="var(--paper)" stroke=${on(1)} strokeWidth="2.2" /><text x="262" y="101" textAnchor="middle" fontSize="15">T<tspan dy="-6" fontSize="14">M</tspan></text>
          <path d="M262 112 V138 H176" stroke=${on(1)} strokeWidth="2.2" fill="none" markerEnd="url(#mv7-cf-aiir)" /><text x="318" y="154" textAnchor="end" fontSize="14">y(n−M)</text>
          ${c(162, 138, '×', 2)}<text x="136" y="154" fontSize="15">g</text>
          <path d="M156 126 L144 50" stroke=${on(3)} strokeWidth="2.2" markerEnd="url(#mv7-cf-aiir)" /></g>`}
      </svg>
      <div className=${pop(i >= 3)}><${Plot} h=${Hs} title=${'Impulse response, n = 0 … 49'} right=${fir ? 'one echo' : 'endless echoes'}><path d=${'M0 ' + Yv(0, Hs, -.1, 1.1) + 'H300'} stroke="var(--line)" /><path d=${stems(imp, Hs, -.1, 1.1)} stroke="var(--k-mm)" strokeWidth="2.4" /><//></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 34, 47: the delay τ in samples, M = τ × fs ── */
  const RANGES = [['Resonator', 0, 20, 'None'], ['Flanger', 0, 15, 'Sinusoidal (≈ 1 Hz)'], ['Chorus', 10, 25, 'Random'], ['Slapback', 25, 50, 'None'], ['Echo', 50, Infinity, 'None']];
  const inRange = (ms, r) => ms >= r[1] && (r[2] === Infinity ? ms > 50 : ms <= r[2]);
  function DelayCalc({ ar }) {
    const [tau, setTau] = useState(100), [fs, setFs] = useState(44100);
    const M = tau / 1000 * fs, Mr = Math.round(M), hits = RANGES.filter(r => inRange(tau, r)).map(r => r[0]);
    const ex = [[100, 44100, '100 ms @ 44.1 kHz'], [1.25, 8000, '1.25 ms @ 8 kHz'], [100, 8000, '100 ms @ 8 kHz'], [3, 44100, '3 ms @ 44.1 kHz']];
    const en = `The slides write M = τ/fs, but numerically the delay in samples is <b>M = τ × fs</b> (τ divided by the sampling period 1/fs): ${f2(tau, 3)} ms × ${f2(fs, 0)} Hz = ${f2(tau / 1000, 5)} × ${f2(fs, 0)} = <b>${f2(M, 2)}</b>${Math.abs(M - Mr) > 1e-9 ? ', rounded to ' + Mr + ' samples' : ' samples'}.${hits.length ? ' In the delay table, ' + f2(tau, 3) + ' ms falls in: ' + hits.join(', ') + '.' : ''}`;
    const a = `الـ slides كاتبة <bdi>M = τ/fs</bdi>، بس بالأرقام عدد الـ samples هو <b>τ × fs</b> (يعني τ مقسومة على الـ sampling period):<span class="ltr">M = ${f2(tau / 1000, 5)} × ${f2(fs, 0)} = ${f2(M, 2)}${Math.abs(M - Mr) > 1e-9 ? ' → ' + Mr : ''} samples</span>${hits.length ? 'وفي جدول الـ delay القيمة دي تبع:<span class="ltr">' + hits.join(', ') + '</span>' : ''}`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <div className="mv7-row">${ex.map(([t, f, l], k) => html`<button key=${k} className=${'fig-btn' + (tau === t && fs === f ? ' sel' : '')} onClick=${() => { setTau(t); setFs(f); }}>${l}</button>`)}</div>
      <div className="mv7-in"><label>τ (ms)<input type="number" min="0" step="0.05" value=${tau} onInput=${e => setTau(Math.max(0, +e.target.value || 0))} /></label>
        <label>fs (Hz)<select value=${fs} onChange=${e => setFs(+e.target.value)}>${[8000, 11025, 22050, 44100, 48000].map(f => html`<option key=${f} value=${f}>${f2(f, 0)}</option>`)}</select></label></div>
      <div className="mv7-out" style=${{ textAlign: 'center' }}><span className="f">M = ${f2(tau / 1000, 5)} s × ${f2(fs, 0)} Hz = </span><span className="k" style=${{ fontSize: '1.1rem' }}>${f2(M, 2)}</span>${Math.abs(M - Mr) > 1e-9 && html`<span className="f"> → ${Mr}</span>`} samples</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 40–42: the universal comb filter (unicomb.m) ── */
  function UniComb({ ar }) {
    const [row, setRow] = useState(4), [g, setG] = useState(.5);
    const rows = [['FIR comb', 1, 0, 'g'], ['IIR comb', 1, 'g', 0], ['Allpass', 'a', '−a', 1], ['Delay', 0, 0, 1], ['unicomb.m', .5, -.5, 1]];
    const val = v => v === 'g' || v === 'a' ? g : v === '−a' ? -g : v;
    const [, BLr, FBr, FFr] = rows[row], BL = val(BLr), FB = val(FBr), FF = val(FFr), M = 10, L = 60;
    const y = []; { const D = new Array(M).fill(0); for (let n = 0; n < L; n++) { const x = n === 0 ? 1 : 0, xh = x + FB * D[M - 1]; y.push(FF * D[M - 1] + BL * xh); D.pop(); D.unshift(xh); } }
    const nz = y.map((v, n) => [n, v]).filter(([, v]) => Math.abs(v) > 1e-9).slice(0, 5);
    const Hs = 70, lo = -1.1, hi = 1.1, gg = 'var(--graphite)';
    const en = `<b>Universal comb</b>: xh(n) = x(n) + FB·xh(n − M); y(n) = FF·xh(n − M) + BL·xh(n). With <b>${rows[row][0]}</b> (BL = ${f2(BL, 2)}, FB = ${f2(FB, 2)}, FF = ${f2(FF, 2)}) and M = 10 the impulse response starts ${nz.map(([n, v]) => 'y(' + n + ') = ' + f2(v, 4)).join(', ')}${y.slice(nz.length ? nz[nz.length - 1][0] + 1 : 0).some(v => Math.abs(v) > 1e-9) ? ', …' : ''}. Tap a row.`;
    const a = `الـ <b>Universal comb</b> بيجمع الـ FIR والـ IIR:<span class="ltr">xh(n) = x(n) + FB·xh(n − M)<br>y(n) = FF·xh(n − M) + BL·xh(n)</span>مع <b>${rows[row][0]}</b> والـ M بـ 10 الـ impulse response بيبدأ كده:<span class="ltr">${nz.map(([n, v]) => 'y(' + n + ') = ' + f2(v, 4)).join(', ')}</span>دوس على أي صف.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 320 132" role="img" aria-label="Universal comb filter"><defs>${mk('mv7-uc-a', gg)}</defs>
        <text x="0" y="74" fontSize="15">x</text><path d="M12 69 H34" stroke=${gg} strokeWidth="2" markerEnd="url(#mv7-uc-a)" />
        <circle cx="46" cy="69" r="11" fill="var(--paper)" stroke=${gg} strokeWidth="2" /><text x="46" y="74" textAnchor="middle" fontSize="15">+</text>
        <path d="M57 69 H96" stroke=${gg} strokeWidth="2" markerEnd="url(#mv7-uc-a)" /><circle cx="80" cy="69" r="3.5" fill=${gg} /><text x="70" y="90" fontSize="14">xh</text>
        <rect x="98" y="53" width="48" height="32" fill="var(--paper)" stroke="var(--k-mm)" strokeWidth="2" /><text x="122" y="75" textAnchor="middle" fontSize="15">z<tspan dy="-6" fontSize="14">−M</tspan></text>
        <path d="M146 69 H196" stroke=${gg} strokeWidth="2" markerEnd="url(#mv7-uc-a)" /><circle cx="168" cy="69" r="3.5" fill=${gg} />
        <circle cx="208" cy="69" r="11" fill="var(--paper)" stroke=${gg} strokeWidth="2" /><text x="208" y="74" textAnchor="middle" fontSize="15">×</text><text x="208" y="100" textAnchor="middle" fontSize="14" style=${{ fill: 'var(--k-mm)' }}>FF</text>
        <path d="M219 69 H258" stroke=${gg} strokeWidth="2" markerEnd="url(#mv7-uc-a)" />
        <circle cx="270" cy="69" r="11" fill="var(--paper)" stroke=${gg} strokeWidth="2" /><text x="270" y="74" textAnchor="middle" fontSize="15">+</text>
        <path d="M281 69 H306" stroke=${gg} strokeWidth="2" markerEnd="url(#mv7-uc-a)" /><text x="320" y="96" textAnchor="end" fontSize="15">y</text>
        <path d="M80 69 V22 H158" stroke=${gg} strokeWidth="2" fill="none" markerEnd="url(#mv7-uc-a)" /><circle cx="170" cy="22" r="11" fill="var(--paper)" stroke=${gg} strokeWidth="2" /><text x="170" y="27" textAnchor="middle" fontSize="15">×</text><text x="196" y="16" fontSize="14" style=${{ fill: 'var(--k-mm)' }}>BL</text>
        <path d="M181 22 H270 V56" stroke=${gg} strokeWidth="2" fill="none" markerEnd="url(#mv7-uc-a)" />
        <path d="M168 69 V116 H132" stroke=${gg} strokeWidth="2" fill="none" markerEnd="url(#mv7-uc-a)" /><circle cx="120" cy="116" r="11" fill="var(--paper)" stroke=${gg} strokeWidth="2" /><text x="120" y="121" textAnchor="middle" fontSize="15">×</text><text x="86" y="130" fontSize="14" style=${{ fill: 'var(--k-mm)' }}>FB</text>
        <path d="M109 116 H46 V82" stroke=${gg} strokeWidth="2" fill="none" markerEnd="url(#mv7-uc-a)" />
      </svg>
      <table className="mv7-tbl" style=${{ marginBottom: '8px' }}><thead><tr><th className="l">Filter</th><th>BL</th><th>FB</th><th>FF</th></tr></thead>
        <tbody>${rows.map((r, k) => html`<tr key=${k} className=${'pick' + (row === k ? ' on' : '')} onClick=${() => setRow(k)}><td className="l">${r[0]}</td>${r.slice(1).map((v, j) => html`<td key=${j} className="m">${typeof v === 'number' ? f2(v, 2).replace('-', '−') : v}</td>`)}</tr>`)}</tbody></table>
      ${row < 3 && html`<${Sl} label=${row === 2 ? 'a' : 'g'} min=${-.9} max=${.9} step=${.05} v=${g} set=${setG} show=${f2(g, 2)} />`}
      <${Plot} h=${Hs} title="Impulse response, n = 0 … 59 (M = 10)"><path d=${'M0 ' + Hs / 2 + 'H300'} stroke="var(--line)" /><path d=${stems(y, Hs, lo, hi)} stroke="var(--k-mm)" strokeWidth="2.4" /><//></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 36, 39 (fircomb.m / iircomb.m): impulse responses sample by sample ── */
  function CombImpulse({ ar }) {
    const [mode, setMode] = useState('iir'), [n, setN] = useState(calm() ? 49 : 0), [run, setRun] = useState(false);
    const g = .5, M = 10, L = 50;
    const sim = useMemo(() => { const out = [], lines = []; let D = new Array(M).fill(0); for (let k = 0; k < L; k++) { const x = k === 0 ? 1 : 0, last = D[M - 1], y = x + g * last; out.push(y); lines.push({ D: D.slice(), last, x, y }); D = [mode === 'fir' ? x : y].concat(D.slice(0, M - 1)); } return { out, lines }; }, [mode]);
    useEffect(() => { if (!run) return; if (n >= L - 1) { setRun(false); return; } const t = setTimeout(() => setN(n + 1), 260); return () => clearTimeout(t); }, [run, n]);
    const s = sim.lines[n], Hs = 70;
    const echo = sim.out.map((v, k) => [k, v]).filter(([k, v]) => v && k <= n);
    const en = `${mode === 'fir' ? '<b>FIR comb</b> (fircomb.m)' : '<b>IIR comb</b> (iircomb.m, c = 1)'}, unit impulse, g = 0.5, M = 10. n = ${n}: Delayline(10) = ${f2(s.last, 4)}, so y(${n}) = x(${n}) + 0.5 × ${f2(s.last, 4)} = <b>${f2(s.y, 4)}</b>. ${mode === 'fir' ? 'The delay line is fed with the <b>input</b>: only one echo, y(10) = 0.5.' : 'The delay line is fed with the <b>output</b>: y(10) = 0.5, y(20) = 0.25, y(30) = 0.125, y(40) = 0.0625 … each pass × g.'} At fs = 8000 Hz, M = 10 samples is 10/8000 = 1.25 ms (resonator range); a 100 ms echo would need M = 800.`;
    const a = `${mode === 'fir' ? 'الـ <b>FIR comb</b> (fircomb.m)' : 'الـ <b>IIR comb</b> (iircomb.m)'} على unit impulse.<span class="ltr">g = 0.5, M = 10, n = ${n}<br>y(${n}) = x(${n}) + 0.5 × ${f2(s.last, 4)} = ${f2(s.y, 4)}</span>${mode === 'fir' ? 'الـ delay line بيتغذى من الـ <b>input</b>: echo واحد بس عند n = 10.' : 'الـ delay line بيتغذى من الـ <b>output</b>: كل لفة بتتضرب في g، فالـ echoes مالهاش آخر.'} وعند <bdi>fs = 8000 Hz</bdi> الـ 10 samples دول يساووا <bdi>1.25 ms</bdi> (مدى الـ resonator)؛ والـ echo بتاع <bdi>100 ms</bdi> محتاج 800 sample.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['fir', 'FIR comb'], ['iir', 'IIR comb']]} v=${mode} set=${m => { setMode(m); setN(calm() ? 49 : 0); setRun(false); }} />
      <div className="mv7-cells">${s.D.map((v, k) => html`<div key=${k} className=${k === M - 1 ? 'last' : ''} style=${{ background: v ? `color-mix(in srgb, var(--k-mm) ${Math.round(25 + 75 * Math.abs(v))}%, var(--paper))` : '' }}></div>`)}</div>
      <div className="mv7-cl"><span>Delayline(1)</span><span>Delayline(10) → × g</span></div>
      <${Plot} h=${Hs} title=${'y(n), n = 0 … 49'} right=${'n = ' + n}>
        <path d=${'M0 ' + Yv(0, Hs, -.1, 1.1) + 'H300'} stroke="var(--line)" />
        <path d=${stems(sim.out.map((v, k) => k <= n ? v : 0), Hs, -.1, 1.1, 300, L)} stroke="var(--k-mm)" strokeWidth="2.6" />
        <path d=${'M' + ((n + .5) * 6).toFixed(1) + ' 0V' + Hs} stroke="var(--pen)" strokeDasharray="3 3" />
      <//>
      <div className="mv7-out f">${echo.map(([k, v]) => 'y(' + k + ') = ' + f2(v, 4)).join(' · ')}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><button className="fig-btn" onClick=${() => setN(Math.max(0, n - 1))} disabled=${n === 0}>‹</button><button className="fig-btn" onClick=${() => setN(Math.min(L - 1, n + 1))} disabled=${n === L - 1}>Next sample ›</button>
        <span className="grow"></span>${!calm() && html`<button className="fig-btn solid" onClick=${() => { if (n >= L - 1) setN(0); setRun(!run); }}>${run ? '❚❚ Pause' : '▶ Play'}</button>`}<button className="fig-btn" onClick=${() => { setN(0); setRun(false); }}>↻</button></div></figure>`;
  }

  /* ── slides 43–46: vibrato = a delay line modulated by an LFO (vibrato.m) ── */
  function Vibrato({ ar }) {
    const [W, setW] = useState(5), [fm, setFm] = useState(5);
    const fs = 8000, len = 3200, f0 = 40;
    const R = useMemo(() => {
      const x = N(len, n => Math.sin(2 * Math.PI * f0 * n / fs)), DELAY = Math.round(W / 1000 * fs), WIDTH = DELAY, MF = fm / fs;
      const y = [], dl = [];
      for (let n = 0; n < len; n++) { const Z = 1 + DELAY + WIDTH * Math.sin(MF * 2 * Math.PI * (n + 1)), i = Math.floor(Z), fr = Z - i, at = j => (n - j + 1 >= 0 ? x[n - j + 1] : 0); y.push(at(i + 1) * fr + at(i) * (1 - fr)); dl.push((Z - 1) / fs * 1000); }
      const pitch = N(len, n => (1 - WIDTH * 2 * Math.PI * MF * Math.cos(MF * 2 * Math.PI * (n + 1))) * 100);
      return { x, y, dl, pitch };
    }, [W, fm]);
    const dev = 2 * Math.PI * fm * W / 1000 * 100, H = 54;
    const en = `<b>Vibrato</b>: the time delay is varied periodically by a low frequency oscillator, and <b>only the delayed signal</b> is heard (no forward or backward feed). Like the Doppler effect, a changing delay changes the pitch. vibrato.m uses a basic delay = width = ${W} ms, so the delay swings 0 to ${2 * W} ms at ${fm} Hz, and the pitch swings by about ±${f2(dev, 1)}%. Typical values: delay 5–10 ms, LFO 5–14 Hz. Fractional delays use linear interpolation.`;
    const a = `الـ <b>Vibrato</b>: الـ delay بيتغير بشكل دوري بـ low frequency oscillator، وبنسمع <b>الإشارة المتأخرة بس</b> (من غير forward أو backward feed). زي الـ Doppler effect، تغيير الـ delay بيغيّر الـ pitch. الـ vibrato.m بيخلي الـ basic delay قد الـ width، فالـ delay بيتحرك من 0 لـ ${2 * W} ms بتردد ${fm} Hz، والـ pitch بيتغير بحوالي<span class="ltr">±${f2(dev, 1)}%</span>القيم المعتادة: delay من 5 لـ 10 ms، والـ LFO من 5 لـ 14 Hz. والـ delays الكسور بتتحسب بـ linear interpolation.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Plot} h=${H} title="Delay (ms) over 0.4 s" right=${'0 … ' + 2 * W + ' ms'}><path d=${line(R.dl, H, -1, 21)} stroke="var(--graphite)" strokeWidth="1.8" fill="none" /><//>
      <${Plot} h=${H} title="Output pitch, % of the input pitch" right=${'±' + f2(dev, 1) + '%'}><path d=${'M0 ' + Yv(100, H, 0, 200) + 'H300'} stroke="var(--line)" /><path d=${line(R.pitch, H, 0, 200)} stroke="var(--pen)" strokeWidth="1.8" fill="none" /><//>
      <${Leg} items=${[['var(--faint)', 'input x (40 Hz)'], ['var(--k-mm)', 'output y']]} />
      <${Plot} h=${70} title="Waveforms over 0.4 s"><path d=${line(R.x, 70, -1.2, 1.2)} stroke="var(--faint)" strokeWidth="1.2" fill="none" /><path d=${line(R.y, 70, -1.2, 1.2)} stroke="var(--k-mm)" strokeWidth="1.6" fill="none" /><//>
      <${Sl} label="width" min=${5} max=${10} step=${1} v=${W} set=${setW} show=${W + ' ms'} />
      <${Sl} label="LFO" min=${5} max=${14} step=${1} v=${fm} set=${setFm} show=${fm + ' Hz'} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slide 47: delay ranges of the comb-filter effects ── */
  function DelayRanges({ ar }) {
    const [ms, setMs] = useState(30), max = 70, P = v => Math.min(100, v / max * 100);
    const hits = RANGES.filter(r => inRange(ms, r));
    const desc = { Resonator: ['', ''], Flanger: ['<b>Flanging</b> = a continuously varying LFO of the delay.', 'الـ <b>Flanging</b> هو LFO بيغيّر الـ delay باستمرار.'], Chorus: ['<b>Chorus</b> = multiple copies of the sound delayed by small random delays.', 'الـ <b>Chorus</b> هو كذا نسخة من الصوت متأخرة بـ delays صغيرة عشوائية.'], Slapback: ['<b>Slapback</b> (doubling) = a quick repetition of the sound.', 'الـ <b>Slapback</b> (doubling) هو تكرار سريع للصوت.'], Echo: ['<b>Echo</b>: a distinct repeat, more than 50 ms later.', 'الـ <b>Echo</b>: تكرار واضح بعد أكتر من 50 ms.'] };
    const en = `Flanger, chorus, slapback and echo all use a comb filter (FIR or IIR) plus some modulation; they differ in the <b>delay range</b>. A delay of <b>${ms} ms</b> falls in: ${hits.map(h => h[0] + ' (modulation: ' + h[3] + ')').join(', ') || 'none'}. ${hits.map(h => desc[h[0]][0]).join(' ')}`;
    const a = `الـ flanger والـ chorus والـ slapback والـ echo كلهم بيستخدموا comb filter (FIR أو IIR) مع شوية modulation؛ والفرق في <b>مدى الـ delay</b>. الـ delay بتاع <bdi>${ms} ms</bdi> بيقع في:<span class="ltr">${hits.map(h => h[0]).join(', ') || 'none'}</span>${hits.map(h => desc[h[0]][1]).join(' ')}`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <div className="mv7-gantt">${RANGES.map((r, k) => { const on = hits.includes(r); return html`<${React.Fragment} key=${k}><div className=${'nm' + (on ? ' on' : '')}>${r[0]}<small>${r[2] === Infinity ? '> 50' : r[1] + ' … ' + r[2]} ms · ${r[3]}</small></div>
        <div className=${'tr' + (on ? ' on' : '')}><i style=${{ left: P(r[1]) + '%', width: (P(r[2] === Infinity ? max : r[2]) - P(r[1])) + '%' }}></i><span className="cur" style=${{ left: 'calc(' + P(ms) + '% - 1px)' }}></span></div><//>`; })}
        <div></div><div className="mv7-ax"><span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70 ms</span></div></div>
      <${Sl} label="delay" min=${0} max=${70} step=${1} v=${ms} set=${setMs} show=${ms + ' ms'} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 48–50: flanger.m, a single FIR delay oscillating 0–3 ms at 1 Hz ── */
  function Flanger({ ar }) {
    const fs = 44100, [mx, setMx] = useState(3), [rate, setRate] = useState(1), [run, setRun] = useState(true);
    const t = useAnim(run), tt = calm() || !run ? .2 : t, msd = Math.round(mx / 1000 * fs);
    const cur = Math.ceil(Math.abs(Math.sin(2 * Math.PI * rate * tt)) * msd);
    const F = N(201, k => k * 10), resp = F.map(f => .7 * cabs([1 + Math.cos(2 * Math.PI * f * cur / fs), -Math.sin(2 * Math.PI * f * cur / fs)]));
    const n1 = cur ? fs / (2 * cur) : null, H = 90, Hd = 46;
    const curve = N(201, k => Math.abs(Math.sin(2 * Math.PI * rate * k * 2 / 200)) * msd);
    const en = `flanger.m: y(i) = 0.7·x(i) + 0.7·x(i − cur_delay), cur_delay = ceil(|sin(2π·rate·t)| × max_samp_delay). Max delay ${mx} ms → round(${mx / 1000} × 44100) = round(${f2(mx / 1000 * fs, 1)}) = <b>${msd}</b> samples. Now cur_delay = <b>${cur}</b> samples (${f2(cur / fs * 1000, 2)} ms)${n1 ? `: the comb has notches at ${f2(n1, 0)} Hz, ${f2(3 * n1, 0)} Hz, …, and they sweep up and down as the delay oscillates` : ''}.`;
    const a = `الـ flanger.m:<span class="ltr">y(i) = 0.7·x(i) + 0.7·x(i − cur_delay)<br>max_samp_delay = round(${mx / 1000} × 44100) = ${msd}</span>دلوقتي الـ cur_delay بيساوي <bdi>${cur}</bdi> sample${n1 ? `، والـ comb فيه notches عند<span class="ltr">${f2(n1, 0)} Hz, ${f2(3 * n1, 0)} Hz, …</span>وبتتحرك فوق وتحت مع تذبذب الـ delay.` : '.'}`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[[3, '0–3 ms (demo)'], [15, '0–15 ms']]} v=${mx} set=${setMx} />
      <${Plot} h=${Hd} title="cur_delay over 2 s (samples)" right=${cur + ' / ' + msd}><path d=${line(curve, Hd, -msd * .05, msd * 1.05)} stroke="var(--graphite)" strokeWidth="1.6" fill="none" />
        <circle cx=${(tt % 2) / 2 * 300} cy=${Yv(cur, Hd, -msd * .05, msd * 1.05)} r="5" fill="var(--pen)" /><//>
      <${Plot} h=${H} title="Comb response |H(f)|, 0 to 2 kHz" foot=${['0', '500', '1k', '1.5k', '2k']}><path d=${'M0 ' + Yv(1, H, 0, 1.5) + 'H300'} stroke="var(--line)" strokeDasharray="3 4" /><path d=${line(resp, H, 0, 1.5)} stroke="var(--k-mm)" strokeWidth="2" fill="none" /><//>
      <${Sl} label="rate" min=${.1} max=${5} step=${.1} v=${rate} set=${setRate} show=${rate.toFixed(1) + ' Hz'} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>${!calm() && html`<button className="fig-btn" onClick=${() => setRun(!run)}>${run ? '❚❚ Pause' : '▶ Play'}</button>`}</div></figure>`;
  }

  /* ── slides 52–57: ring modulation and amplitude modulation of two sines, with the spectrum ── */
  function ModSpec({ ar, mode0 }) {
    const [mode, setMode] = useState(mode0), [fc, setFc] = useState(440), [fxx, setFx] = useState(200), [al, setAl] = useState(1);
    const fs = 8000, L = 2000;
    const y = useMemo(() => N(L, n => { const c = Math.sin(2 * Math.PI * fc * n / fs), m = Math.sin(2 * Math.PI * fxx * n / fs); return mode === 'rm' ? m * c : (1 + al * m) * c; }), [mode, fc, fxx, al]);
    const sp = useMemo(() => N(251, k => dftMag(y, k * 4, fs)), [y]);
    const peaks = sp.map((v, k) => [k * 4, v]).filter(([f, v], k) => v > .05 && (k === 0 || v >= sp[k - 1]) && (k === 250 || v >= sp[k + 1]));
    const H = 70, Hs = 80;
    const exp = mode === 'rm' ? [fc + fxx, Math.abs(fc - fxx)] : [fc, Math.abs(fc - fxx), fc + fxx];
    const en = mode === 'rm' ? `<b>Ring modulation</b>: y(n) = x(n)·m(n), the audio x (a sine at fx = ${fxx} Hz) times the carrier m (a sine at fc = ${fc} Hz). The spectrum has <b>only the sum and difference</b>: fc + fx = ${fc + fxx} Hz and fc − fx = ${Math.abs(fc - fxx)} Hz; no ${fc} and no ${fxx} Hz. ${fc === 440 && fxx === 200 ? 'This is the notes\' example (440 and 200 Hz → 640 and 240 Hz).' : ''}`
      : `<b>Amplitude modulation</b>: y(n) = (1 + α·m(n))·x(n), the carrier x at fc = ${fc} Hz, the modulator m at fx = ${fxx} Hz (peak 1), depth α = ${f2(al, 2)}. You get <b>three</b> frequencies: fc = ${fc}, fc − fx = ${Math.abs(fc - fxx)} and fc + fx = ${fc + fxx} Hz. α = 0 turns the modulation off (only fc); α = 1 is maximum modulation.`;
    const a = mode === 'rm' ? `الـ <b>Ring modulation</b>: بنضرب الـ audio x (sine على fx) في الـ carrier m (sine على fc):<span class="ltr">y(n) = x(n)·m(n)</span>الـ spectrum فيه <b>المجموع والفرق بس</b>:<span class="ltr">fc + fx = ${fc + fxx} Hz, fc − fx = ${Math.abs(fc - fxx)} Hz</span>${fc === 440 && fxx === 200 ? 'وده مثال النوتس: 440 و200 بيطلّعوا 640 و240.' : ''}`
      : `الـ <b>Amplitude modulation</b>: الـ carrier x على fc والـ modulator m على fx:<span class="ltr">y(n) = (1 + α·m(n))·x(n), α = ${f2(al, 2)}</span>بيطلع <b>3</b> ترددات:<span class="ltr">fc = ${fc}, fc − fx = ${Math.abs(fc - fxx)}, fc + fx = ${fc + fxx} Hz</span>لو α بصفر الـ modulation بتقف (يفضل fc بس)؛ ولو α بواحد يبقى أقصى modulation.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['rm', 'Ring modulation'], ['am', 'Amplitude modulation']]} v=${mode} set=${setMode} />
      <${Plot} h=${H} title="y(n), first 50 ms"><path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" /><path d=${line(y.slice(0, 400), H, -2.1, 2.1)} stroke="var(--k-mm)" strokeWidth="1.4" fill="none" /><//>
      <${Plot} h=${Hs} title="Spectrum, 0 to 1000 Hz" right=${peaks.map(p => p[0]).join(', ') + ' Hz'} foot=${['0', '250', '500', '750', '1000']}>
        <path d=${'M0 ' + Yv(0, Hs, 0, 1.1) + 'H300'} stroke="var(--line)" />
        ${exp.map(f => html`<path key=${f} d=${'M' + ((f / 4 + .5) * 300 / 251).toFixed(1) + ' 0V' + Hs} stroke="var(--line)" strokeDasharray="2 3" />`)}
        <path d=${stems(sp.map(v => v > .02 ? v : 0), Hs, 0, 1.1, 300, 251)} stroke="var(--pen)" strokeWidth="3" />
      <//>
      <${Sl} label="fc" min=${100} max=${800} step=${20} v=${fc} set=${setFc} show=${fc + ' Hz'} />
      <${Sl} label="fx" min=${20} max=${400} step=${20} v=${fxx} set=${setFx} show=${fxx + ' Hz'} />
      ${mode === 'am' && html`<${Sl} label="α" min=${0} max=${1} step=${.05} v=${al} set=${setAl} show=${f2(al, 2)} />`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${() => { setFc(440); setFx(200); setAl(1); }}>Example from the notes</button></div></figure>`;
  }

  /* ── slides 58–61: tremolo, AM below 20 Hz (tremolo1.m) or RM with a triangle (tremolo2.m) ── */
  function Tremolo({ ar }) {
    const [kind, setKind] = useState('sin'), [fm, setFm] = useState(5), [al, setAl] = useState(.5);
    const fs = 2000, L = 2000, f0 = 40, triF = 44100 / 4000;
    const trem = n => { if (kind === 'sin') return 1 + al * Math.sin(2 * Math.PI * fm * n / fs); const p = (n / fs * triF) % 1; return p < .5 ? -.5 + 2 * p : .5 - 2 * (p - .5); };
    const y = useMemo(() => N(L, n => trem(n) * Math.sin(2 * Math.PI * f0 * n / fs)), [kind, fm, al]);
    const env = N(L, trem), H = 100, lim = 1.6;
    const en = kind === 'sin' ? `<b>Tremolo</b> = amplitude modulation with a modulation frequency <b>below 20 Hz</b>. tremolo1.m: trem = 1 + α·sin(2π·Fc·n/Fs) with Fc = ${fm} Hz and α = ${f2(al, 2)}, so the gain goes between <b>${f2(1 - al, 2)} and ${f2(1 + al, 2)}</b>; y = trem·x. ${fm === 5 && al === .5 ? '(The notes\' demo: 5 Hz, α = 0.5, gain 0.5 to 1.5.)' : ''}`
      : `<b>Tremolo via ring modulation</b> (tremolo2.m): multiply x by a <b>triangular wave</b> LFO going from −0.5 to 0.5 in steps of 5×10⁻⁴ per sample (2000 samples per ramp, so at 44.1 kHz about ${f2(triF, 1)} triangles per second). The loudness follows |trem|.`;
    const a = kind === 'sin' ? `الـ <b>Tremolo</b> هو amplitude modulation بتردد modulation <b>أقل من 20 Hz</b>. في tremolo1.m:<span class="ltr">trem = 1 + α·sin(2π·Fc·n/Fs), Fc = ${fm} Hz, α = ${f2(al, 2)}</span>فالـ gain بيتحرك بين <bdi>${f2(1 - al, 2)}</bdi> و<bdi>${f2(1 + al, 2)}</bdi>. ${fm === 5 && al === .5 ? '(ده الـ demo بتاع النوتس.)' : ''}`
      : `الـ <b>Tremolo بالـ ring modulation</b> (tremolo2.m): بنضرب x في LFO على شكل <b>مثلث</b> من −0.5 لـ 0.5، وكل sample بيزيد <bdi>5×10⁻⁴</bdi> (يعني 2000 sample في كل طلعة، فعلى <bdi>44.1 kHz</bdi> حوالي ${f2(triF, 1)} مثلث في الثانية). وعلو الصوت بيمشي مع قيمة الـ trem المطلقة.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['sin', 'tremolo1.m (AM)'], ['tri', 'tremolo2.m (RM, triangle)']]} v=${kind} set=${setKind} />
      <${Leg} items=${[['var(--k-mm)', 'y = trem · x'], ['var(--pen)', 'trem (gain)']]} />
      <${Plot} h=${H} title="1 second of a 40 Hz tone"><path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" />
        <path d=${band(y, H, -lim, lim)} stroke="var(--k-mm)" strokeWidth="1" />
        <path d=${line(env, H, -lim, lim)} stroke="var(--pen)" strokeWidth="1.8" fill="none" />
      <//>
      ${kind === 'sin' && html`<${Sl} label="Fc" min=${1} max=${20} step=${1} v=${fm} set=${setFm} show=${fm + ' Hz'} /><${Sl} label="α" min=${0} max=${1} step=${.05} v=${al} set=${setAl} show=${f2(al, 2)} />`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${() => { setKind('sin'); setFm(5); setAl(.5); }}>Example from the notes</button></div></figure>`;
  }

  /* ── slides 63–66: limiter.m on the slide's own test signal ── */
  function Limiter({ ar }) {
    const [th, setTh] = useState(.5);
    const R = useMemo(() => { const n2 = 440, x = N(n2, k => (k < 220 ? .2 : 1) * Math.sin((k + 1) / 5)), xd = [0], f = [1], y = [0];
      for (let n = 1; n < n2; n++) { let a = Math.abs(x[n]) - xd[n - 1]; if (a < 0) a = 0; xd[n] = xd[n - 1] * (1 - .01) + .4 * a; f[n] = xd[n] > th ? Math.pow(10, -1 * (Math.log10(xd[n]) - Math.log10(th))) : 1; y[n] = x[n] * f[n]; }
      return { x, xd, f, y }; }, [th]);
    const H = 56, ymax = Math.max(...R.y.map(Math.abs));
    const en = `limiter.m: a sine at 0.2 for 220 samples, then at 1. <b>xd</b> records the peaks (attack at = 0.4 reacts very quickly, release rt = 0.01 lets go slowly). When xd goes above the threshold ${f2(th, 2)}, the gain f = 10^(−slope·(log10 xd − log10 thresh)) = thresh/xd pulls the peaks down, so the output stays near ${f2(th, 2)} (max |y| = ${f2(ymax, 3)}) while the quiet part is untouched. Lowering peaks lets the overall signal be boosted.`;
    const a = `الـ limiter.m بيشتغل على sine ارتفاعها 0.2 لمدة 220 sample، وبعدين ارتفاعها 1. الـ <b>xd</b> بيسجل الـ peaks (الـ attack بـ 0.4 بيرد بسرعة جدًا، والـ release بـ 0.01 بيسيب ببطء). لما الـ xd يعدّي الـ threshold الـ gain بيوطّي الـ peaks:<span class="ltr">f = 10^(−slope·(log10 xd − log10 thresh)) = thresh / xd</span>فالـ output بيفضل قريب من الـ threshold (أقصى قيمة <bdi>${f2(ymax, 3)}</bdi>) والجزء الهادي مش بيتلمس. وتوطية الـ peaks بتخلينا نعلّي الإشارة كلها.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Plot} h=${H} title="Input signal x(n)"><path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" /><path d=${line(R.x, H, -1.1, 1.1)} stroke="var(--graphite)" strokeWidth="1.2" fill="none" /><//>
      <${Plot} h=${H} title="Peak level xd(n) and the threshold"><path d=${'M0 ' + Yv(th, H, 0, 1.1) + 'H300'} stroke="var(--pen)" strokeDasharray="4 3" /><path d=${line(R.xd, H, 0, 1.1)} stroke="var(--k-mm)" strokeWidth="1.8" fill="none" /><//>
      <${Plot} h=${H} title="Gain f(n)"><path d=${line(R.f, H, 0, 1.1)} stroke="var(--ok)" strokeWidth="1.8" fill="none" /><//>
      <${Plot} h=${H} title="Output y(n) = x(n)·f(n)" right=${'max ' + f2(ymax, 3)}><path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" /><path d=${line(R.y, H, -1.1, 1.1)} stroke="var(--k-mm)" strokeWidth="1.2" fill="none" /><//>
      <${Sl} label="threshold" min=${.1} max=${1} step=${.05} v=${th} set=${setTh} show=${f2(th, 2)} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${() => setTh(.5)}>Slide example (0.5)</button></div></figure>`;
  }

  /* ── slides 67–71: compexp.m, compressor (comp < 0) and expander (comp > 0) ── */
  function CompExp({ ar }) {
    const [comp, setComp] = useState(-.5), [a, setA] = useState(.5);
    const fs = 2000, L = 2000;
    const x = useMemo(() => N(L, n => { const t = n / fs, e = t < .3 ? .15 : t < .65 ? 1 : .4; return e * Math.sin(2 * Math.PI * 30 * t); }), []);
    const y = useMemo(() => { const h = []; let h1 = 0, h2 = 0; x.forEach(v => { const o = (1 - a) * (1 - a) * Math.abs(v) + 2 * a * h1 - a * a * h2; h2 = h1; h1 = o; h.push(o); }); const m = Math.max(...h); const g = h.map(v => Math.pow(Math.max(v / m, 1e-3), comp)); const yy = x.map((v, k) => v * g[k]); const my = Math.max(...yy.map(Math.abs)), mx = Math.max(...x.map(Math.abs)); return yy.map(v => v * mx / my); }, [comp, a]);
    const lvl = (s, a0, b0) => Math.max(...s.slice(a0 * fs, b0 * fs).map(Math.abs));
    const q = [lvl(x, 0, .3), lvl(y, .05, .3)], H = 100;
    const en = comp < 0 ? `<b>Compressor</b> (comp = ${f2(comp, 2)}): the envelope h = filter(|x|) is raised to the power comp, so loud parts are reduced and, after normalising back to the input peak, quiet parts come up: the quiet start goes from ${f2(q[0], 2)} to <b>${f2(q[1], 2)}</b>. The dynamics are reduced, used to boost overall level in mastering, often on vocals and guitar.`
      : comp > 0 ? `<b>Expander</b> (comp = ${f2(comp, 2)}): the quiet start goes from ${f2(q[0], 2)} to <b>${f2(q[1], 2)}</b>: low levels are pushed further down relative to the loud part, so the dynamics are boosted, a more lively sound.` : 'comp = 0: h⁰ = 1, the signal is unchanged.';
    const ar2 = comp < 0 ? `الـ <b>Compressor</b>: الـ envelope بيترفع لأُس comp السالب، فالأجزاء العالية بتوطى، وبعد ما نرجّع الـ peak زي الـ input الأجزاء الهادية بتعلى: البداية الهادية راحت من <bdi>${f2(q[0], 2)}</bdi> لـ <bdi>${f2(q[1], 2)}</bdi>. يعني الـ dynamics قلت، وبيستخدموه يعلّوا المستوى كله في الـ mastering، وكتير على الـ vocals والـ guitar.`
      : comp > 0 ? `الـ <b>Expander</b>: البداية الهادية راحت من <bdi>${f2(q[0], 2)}</bdi> لـ <bdi>${f2(q[1], 2)}</bdi>: المستويات الواطية بتوطى أكتر جنب الجزء العالي، فالـ dynamics بتزيد والصوت بيبقى أحيى.` : 'لما comp بصفر الإشارة مش بتتغير.';
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Leg} items=${[['var(--faint)', 'input x (quiet, loud, medium)'], ['var(--k-mm)', 'output y']]} />
      <${Plot} h=${H} title="1 s test signal (30 Hz tone)"><path d=${'M0 ' + H / 2 + 'H300'} stroke="var(--line)" />
        <path d=${band(x, H, -1.1, 1.1)} stroke="var(--faint)" strokeWidth="1" /><path d=${band(y, H, -1.1, 1.1, 300, 150)} stroke="var(--k-mm)" strokeWidth="1" /><//>
      <${Sl} label="comp" min=${-.9} max=${.9} step=${.1} v=${comp} set=${setComp} show=${(comp < 0 ? 'compress ' : comp > 0 ? 'expand ' : '') + f2(comp, 1)} />
      <${Sl} label="a" min=${.5} max=${.99} step=${.01} v=${a} set=${setA} show=${f2(a, 2)} /></div>
      <${Cap} en=${en} ar=${ar2} showAr=${ar} />
      <div className="fig-bar"><button className=${'fig-btn' + (comp === -.5 && a === .5 ? ' sel' : '')} onClick=${() => { setComp(-.5); setA(.5); }}>compression_eg.m</button><button className=${'fig-btn' + (comp === .5 && a === .5 ? ' sel' : '')} onClick=${() => { setComp(.5); setA(.5); }}>expander_eg.m</button></div></figure>`;
  }

  /* ── slides 72–78: overdrive (symclip.m) and fuzz (fuzzexp.m): curve, waveform and new harmonics ── */
  function Distort({ ar, mode0 }) {
    const [mode, setMode] = useState(mode0), [A, setA] = useState(mode0 === 'od' ? .8 : 1), [gain, setGain] = useState(5), [mix, setMix] = useState(1), [chk, setChk] = useState(null);
    const fz = (xs, mx) => { const z = xs.map(v => { const q = v * gain / mx; return Math.sign(q) * (1 - Math.exp(-Math.abs(q))); }); const mz = Math.max(...z.map(Math.abs)) || 1; let y = xs.map((v, k) => mix * z[k] * mx / mz + (1 - mix) * v); const my = Math.max(...y.map(Math.abs)) || 1; return y.map(v => v * mx / my); };
    const X = N(201, k => -1 + k / 100), curve = mode === 'od' ? X.map(symclip) : fz(X, 1);
    const P = 200, x = N(P, n => A * Math.sin(2 * Math.PI * n / P)), y = mode === 'od' ? x.map(symclip) : fz(x, A);
    const harm = N(9, k => { let re = 0, im = 0; y.forEach((v, n) => { re += v * Math.cos(2 * Math.PI * (k + 1) * n / P); im -= v * Math.sin(2 * Math.PI * (k + 1) * n / P); }); return 2 * Math.hypot(re, im) / P; });
    const H = 110, Hh = 56;
    const cv = chk == null ? null : symclip(chk);
    const en = mode === 'od' ? `<b>Overdrive</b> = symmetrical soft clipping: f(x) = 2x for 0 ≤ x &lt; 1/3 (linear ×2), (3 − (2 − 3x)²)/3 for 1/3 ≤ x &lt; 2/3 (quadratic), 1 above 2/3 (saturated)${cv != null ? `. Check: x = ${chk} → <b>${f2(cv, 3)}</b>` : ''}. A sine of amplitude ${f2(A, 2)} comes out ${A <= 1 / 3 ? 'just doubled, with no new harmonics' : 'flattened: the clipping <b>creates odd harmonics</b> (3, 5, 7…) that were not in the input'}.`
      : `<b>Distortion/Fuzz</b>: a non-linear exponential amplification. fuzzexp.m computes q = x·gain/max|x| and 1 − e^(−|q|) with the sign of x (the slide prints the exponent as αx²/|x|; |x| = x²/|x|, and the code makes it negative so the curve saturates at ±1). The gain α = ${gain} sets the amount; mix = ${f2(mix, 2)} blends the distorted and the original signal. Harder clipping, more harmonics.`;
    const a = mode === 'od' ? `الـ <b>Overdrive</b> هو symmetrical soft clipping: خطي ×2 في التلت الأول، وبعدين quadratic في التلت التاني، وبعد 2/3 بيثبت على 1.<span class="ltr">f(x) = 2x, (3 − (2 − 3x)²)/3, 1</span>${cv != null ? 'التحقق:<span class="ltr">x = ' + chk + ' → ' + f2(cv, 3) + '</span>' : ''}والـ sine اللي ارتفاعها <bdi>${f2(A, 2)}</bdi> ${A <= 1 / 3 ? 'بتطلع متضاعفة بس من غير harmonics جديدة.' : 'بتطلع مفرودة: الـ clipping <b>بيعمل odd harmonics</b> (3 و5 و7) مكانتش في الـ input.'}`
      : `الـ <b>Distortion/Fuzz</b>: تكبير non-linear أُسّي. الـ fuzzexp.m بيحسب<span class="ltr">q = x·gain/max|x|, 1 − e^(−|q|)</span>بإشارة x (الـ slide كاتبة الأُس <bdi>αx²/|x|</bdi>، والكود بيخليه سالب عشان المنحنى يثبت عند ±1). الـ gain بيحدد كمية الـ distortion، والـ mix بيخلط الإشارة المشوهة بالأصلية. كل ما الـ clipping يبقى أقوى الـ harmonics بتزيد.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['od', 'Overdrive (symclip.m)'], ['fz', 'Fuzz (fuzzexp.m)']]} v=${mode} set=${setMode} />
      <${Plot} h=${H} title="Transfer curve f(x), x from −1 to 1" right=${mode === 'od' ? 'thresholds 1/3, 2/3' : 'gain ' + gain}>
        <path d=${'M0 ' + H / 2 + 'H300 M150 0V' + H} stroke="var(--line)" />
        <path d=${line(X, H, -1.1, 1.1)} stroke="var(--faint)" strokeDasharray="3 3" fill="none" />
        ${mode === 'od' && [1 / 3, 2 / 3].map(v => html`<path key=${v} d=${'M' + (150 + v * 150) + ' 0V' + H} stroke="var(--line)" strokeDasharray="2 4" />`)}
        <path d=${line(curve, H, -1.1, 1.1)} stroke="var(--k-mm)" strokeWidth="2.6" fill="none" />
        ${cv != null && mode === 'od' && html`<circle cx=${150 + chk * 150} cy=${Yv(cv, H, -1.1, 1.1)} r="5" fill="var(--pen)" />`}
      <//>
      ${mode === 'od' && html`<div className="mv7-row">${[.2, .5, .8].map(v => html`<button key=${v} className=${'fig-btn' + (chk === v ? ' sel' : '')} onClick=${() => setChk(chk === v ? null : v)}>check x = ${v}</button>`)}</div>`}
      <${Leg} items=${[['var(--faint)', 'input sine'], ['var(--k-mm)', 'output']]} />
      <${Plot} h=${70} title="One period"><path d=${'M0 35H300'} stroke="var(--line)" /><path d=${line(x, 70, -1.1, 1.1)} stroke="var(--faint)" strokeWidth="1.4" fill="none" /><path d=${line(y, 70, -1.1, 1.1)} stroke="var(--k-mm)" strokeWidth="2" fill="none" /><//>
      <${Plot} h=${Hh} title="Harmonics 1 … 9 of the output" foot=${N(9, k => String(k + 1))}><path d=${stems(harm.map(v => Math.max(v, 0)), Hh, 0, Math.max(1.05, harm[0] * 1.05))} stroke="var(--pen)" strokeWidth="9" /><//>
      <${Sl} label="input amp." min=${.1} max=${1} step=${.05} v=${A} set=${setA} show=${f2(A, 2)} />
      ${mode === 'fz' && html`<${Sl} label="gain α" min=${1} max=${20} step=${1} v=${gain} set=${setGain} show=${String(gain)} /><${Sl} label="mix" min=${0} max=${1} step=${.05} v=${mix} set=${setMix} show=${f2(mix, 2)} />`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── slides 79–81: exciter and enhancer, block by block ── */
  function Exciter({ ar }) {
    const [kind, setKind] = useState('ex');
    const S = kind === 'ex' ? [
      { en: '<b>Exciter</b>: emphasises or de-emphasises certain frequencies to change the <b>timbre</b>; extra brightness without necessarily adding equalisation.', ar: 'الـ <b>Exciter</b>: بيبرز أو يقلل ترددات معينة عشان يغيّر الـ <b>timbre</b>؛ بيدّي لمعان زيادة من غير ما نحتاج equalisation.' },
      { en: 'The processing is done with the <b>Short-Time (windowed) Fourier Transform</b> (see the phase vocoder): subtle amounts of <b>high-frequency distortion</b> and possible phase shifting.', ar: 'المعالجة بتتعمل بالـ <b>Short-Time Fourier Transform</b> (زي الـ phase vocoder): كميات صغيرة من الـ <b>high-frequency distortion</b> وممكن phase shifting.' },
      { en: '<b>Compression</b> is often applied to the processed part before mixing it with the original signal.', ar: 'كتير بنعمل <b>Compression</b> للجزء المعالج قبل ما نخلطه بالإشارة الأصلية.' },
      { en: 'Result: more <b>presence and clarity</b> for an instrument in a mix, natural brightness for a stereo signal, better speech intelligibility. Best on signals that <b>lack high frequencies</b>.', ar: 'النتيجة: <b>presence ووضوح</b> أكتر للآلة جوه الـ mix، ولمعان طبيعي للـ stereo signal، وكلام مفهوم أكتر. وأحسن حاجة على الإشارات اللي <b>ناقصها ترددات عالية</b>.' }
    ] : [
      { en: '<b>Enhancer</b>: combines <b>equalisation</b> with <b>non-linear processing</b>, a "just noticeable" amount of distortion.', ar: 'الـ <b>Enhancer</b>: بيجمع الـ <b>equalisation</b> مع الـ <b>non-linear processing</b>، يعني distortion قد "ما يتلاحظ بالكاد".' },
      { en: 'A <b>filter network</b> of at least three bands; an equaliser boosts or cuts each band independently, so non-linearly.', ar: 'فيه <b>filter network</b> على الأقل 3 bands؛ والـ equaliser بيعلّي أو يوطّي كل band لوحدها، فالمعالجة non-linear.' },
      { en: 'A <b>harmonic generator</b> adds the subtle extra harmonics.', ar: 'وفيه <b>harmonic generator</b> بيضيف harmonics خفيفة زيادة.' },
      { en: 'The input is usually <b>mixed</b> with the enhanced signal. Used in place of equalisers on some mixing consoles, and for stereo enhancement in radio broadcast and sound reinforcement.', ar: 'الـ input غالبًا بيتـ<b>خلط</b> مع الإشارة المحسّنة. وبيستخدموه بدل الـ equalisers في بعض الـ mixing consoles، وللـ stereo enhancement في الراديو والـ sound reinforcement.' }
    ];
    const [i, ctl] = useSteps(S.length, 2600);
    const bx = (k, b, s) => html`<div className=${'bx' + (i >= k ? ' on' : '')}><b>${b}</b>${s && html`<small>${s}</small>`}</div>`, ar1 = html`<div className="ar">↓</div>`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['ex', 'Exciter'], ['en', 'Enhancer']]} v=${kind} set=${k => { setKind(k); ctl.replay(); }} />
      <div className="mv7-blk">${bx(0, 'Input')}${ar1}
        ${kind === 'ex' ? html`<div className="two">${bx(0, 'Original', 'direct')}${bx(1, 'STFT (phase vocoder)', 'subtle HF distortion, phase shift')}</div>${ar1}<div className="two"><div></div>${bx(2, 'Compression')}</div>`
          : html`<div className="two">${bx(1, 'Filter network', '≥ 3 bands, EQ boost/cut')}${bx(2, 'Harmonic generator', 'just noticeable distortion')}</div>`}
        ${ar1}${bx(3, '+ mix with the original')}${ar1}${bx(3, 'Output')}</div></div>
      <${Cap} ...${S[i]} showAr=${ar} /><${Bar} steps=${S} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 83–86: panning by 2D rotation ── */
  function Panning({ ar }) {
    const [th, setTh] = useState(0), [run, setRun] = useState(false), [seg, setSeg] = useState(0);
    useEffect(() => { if (!run) return; if (seg >= 32) { setRun(false); return; } const t = setTimeout(() => { setSeg(seg + 1); setTh(-40 + 2.5 * (seg + 1)); }, 160); return () => clearTimeout(t); }, [run, seg]);
    const r = th * Math.PI / 180, gL = Math.cos(r) + Math.sin(r), gR = Math.cos(r) - Math.sin(r);
    const sx = 150 - 110 * Math.sin(r), sy = 150 - 110 * Math.cos(r);
    const en = `Mapping a mono source across the stereo image: the gains come from a 2D rotation A<sub>θ</sub> = [cos θ, sin θ; −sin θ, cos θ] applied to the same mono x in both rows: g<sub>L</sub> = (cos θ + sin θ)x = <b>${f2(gL, 3)}x</b>, g<sub>R</sub> = (cos θ − sin θ)x = <b>${f2(gR, 3)}x</b>. ${th === 0 ? 'θ = 0: equal gains, the sound is in the centre.' : Math.abs(th) === 45 ? 'θ = ±45° (θl = 45°): one speaker gets 1.414x, the other 0.' : ''} The demo (matpan.m) sweeps −40° to 40° in 32 segments, moving the sound from R to L.`;
    const a = `بنوزّع مصدر mono على الـ stereo image: الـ gains جاية من 2D rotation على نفس الـ x في الصفين:<span class="ltr">gL = (cos θ + sin θ)x = ${f2(gL, 3)}x<br>gR = (cos θ − sin θ)x = ${f2(gR, 3)}x</span>${th === 0 ? 'لما θ بصفر الـ gains متساوية والصوت في النص.' : Math.abs(th) === 45 ? 'عند ±45 درجة سماعة بتاخد 1.414x والتانية صفر.' : ''} والـ demo (matpan.m) بيلف من −40 لـ 40 درجة على 32 segment، فالصوت بيتنقل من R لـ L.`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 300 172" role="img" aria-label="Listener between two speakers">
        <path d="M72 72 A110 110 0 0 1 228 72" stroke="var(--line)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <path d="M150 150 L72 72 M150 150 L228 72 M150 150 V40" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="58" y="52" width="28" height="34" rx="4" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" style=${{ opacity: .4 + .6 * Math.max(0, gL) / 1.42 }} /><text x="72" y="40" textAnchor="middle" fontSize="18" fontWeight="700">L</text>
        <rect x="214" y="52" width="28" height="34" rx="4" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="2" style=${{ opacity: .4 + .6 * Math.max(0, gR) / 1.42 }} /><text x="228" y="40" textAnchor="middle" fontSize="18" fontWeight="700">R</text>
        <circle cx="150" cy="150" r="12" fill="var(--graphite)" /><text x="174" y="166" fontSize="16">listener</text>
        <circle cx=${sx} cy=${sy} r="9" fill="var(--k-mm)" /><text x="150" y="112" textAnchor="middle" fontSize="16">θ = ${th}°</text>
      </svg>
      <div className="mv7-bars"><b>gL</b><div className="t"><i style=${{ width: Math.max(0, gL) / Math.SQRT2 * 100 + '%' }}></i></div><output>${f2(gL, 3)}</output>
        <b>gR</b><div className="t"><i className="r" style=${{ width: Math.max(0, gR) / Math.SQRT2 * 100 + '%' }}></i></div><output>${f2(gR, 3)}</output></div>
      <${Sl} label="θ" min=${-45} max=${45} step=${2.5} v=${th} set=${v => { setRun(false); setTh(v); }} show=${th + '°'} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${() => { if (calm()) { setTh(40); return; } setSeg(0); setTh(-40); setRun(true); }}>▶ matpan.m sweep</button></div></figure>`;
  }

  /* ── slides 87–88: reflections in a room (image sources) and the echogram they make ── */
  function images2(W, Hh, S, L, maxO) { const out = [], c = 343; for (let i = -maxO; i <= maxO; i++) for (let j = -maxO; j <= maxO; j++) { const o = Math.abs(i) + Math.abs(j); if (o > maxO) continue; const ix = i % 2 === 0 ? i * W + S[0] : (i + 1) * W - S[0], iy = j % 2 === 0 ? j * Hh + S[1] : (j + 1) * Hh - S[1], d = Math.hypot(ix - L[0], iy - L[1]); out.push({ i, j, o, ix, iy, d, t: d / c * 1000 }); } return out; }
  function Room({ ar }) {
    const [k, setK] = useState(1);
    const steps = [
      { en: 'The <b>direct sound</b> goes straight from the source to the listener.', ar: 'الـ <b>direct sound</b> بيروح على طول من المصدر للمستمع.' },
      { en: 'A <b>reflected</b> wave arrives a little <b>later</b> (it travels a longer distance) and is <b>weaker</b> (the walls absorb some of the energy). The four first reflections, one off each wall.', ar: 'الموجة <b>المنعكسة</b> بتوصل <b>متأخرة شوية</b> (لأنها بتمشي مسافة أطول) و<b>أضعف</b> (الحيطان بتمتص جزء من الطاقة). دول أول 4 انعكاسات، واحد من كل حيطة.' },
      { en: 'Reflected waves bounce off other walls again, and so on: a series of <b>delayed and attenuated</b> waves. This is <b>reverb</b>, and it creates the spaciousness of a room.', ar: 'الموجات المنعكسة بتخبط في حيطان تانية تاني، وهكذا: سلسلة موجات <b>متأخرة وضعيفة</b>. ده هو الـ <b>reverb</b>، وهو اللي بيدّي إحساس اتساع الأوضة.' },
      { en: 'Large rooms such as concert halls and cathedrals have a much more spacious reverb than a living room: try the hall (3 times bigger): reflections come later and last longer.', ar: 'الأماكن الكبيرة زي قاعات الحفلات والكاتدرائيات الـ reverb بتاعها أوسع بكتير من أوضة القعدة: جرّب الـ hall (أكبر 3 مرات): الانعكاسات بتيجي متأخر وبتستمر أطول.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const W = 10 * k, Hh = 6 * k, S = [2.5 * k, 2 * k], L = [7.5 * k, 4 * k], tmax = 100 * k;
    const imgs = useMemo(() => images2(W, Hh, S, L, 14), [k]), d0 = imgs.find(m => m.o === 0).d;
    const amp = m => Math.pow(.8, m.o) * d0 / m.d;
    const vis = imgs.filter(m => m.t <= tmax && (i >= 2 || m.o <= i));
    const cols = new Array(300).fill(0); vis.forEach(m => { const c = Math.min(299, Math.floor(m.t / tmax * 300)); cols[c] = Math.max(cols[c], amp(m)); });
    const s = 280 / W, P = (x, y) => [10 + x * s, 10 + y * s];
    const first = imgs.filter(m => m.o === 1).map(m => { const t = m.i ? ((m.i < 0 ? 0 : W) - m.ix) / (L[0] - m.ix) : ((m.j < 0 ? 0 : Hh) - m.iy) / (L[1] - m.iy); return [m.ix + t * (L[0] - m.ix), m.iy + t * (L[1] - m.iy), m]; });
    const [sx, sy] = P(...S), [lx, ly] = P(...L), Ht = 70;
    const f1 = first.map(f => Math.round(f[2].t)).sort((a, b) => a - b);
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[[1, 'Room 10 × 6 m'], [3, 'Hall 30 × 18 m']]} v=${k} set=${setK} />
      <svg viewBox="0 0 300 188" role="img" aria-label="Room with source, listener and reflections">
        <rect x="10" y="10" width="280" height="168" fill="none" stroke="var(--ink)" strokeWidth="3" />
        ${i >= 1 && first.map(([x, y], j) => { const [px, py] = P(x, y); return html`<path key=${j} d=${`M${sx} ${sy} L${px} ${py} L${lx} ${ly}`} stroke="var(--pen)" strokeWidth="1.6" fill="none" opacity=".75" />`; })}
        <path d=${`M${sx} ${sy} L${lx} ${ly}`} stroke="var(--k-mm)" strokeWidth="2.6" />
        <circle cx=${sx} cy=${sy} r="8" fill="var(--k-mm)" /><text x=${sx} y=${sy + 26} textAnchor="middle" fontSize="16">source</text>
        <circle cx=${lx} cy=${ly} r="8" fill="var(--graphite)" /><text x=${lx} y=${ly - 14} textAnchor="middle" fontSize="16">listener</text>
      </svg>
      <${Plot} h=${Ht} title=${'Echogram: arrivals over ' + tmax + ' ms'} right=${'direct ' + f2(imgs[0] && imgs.find(m => m.o === 0).t, 1) + ' ms'} foot=${['0', tmax / 2 + '', tmax + ' ms']}>
        <path d=${'M0 ' + Ht + 'H300'} stroke="var(--line)" /><path d=${stems(cols, Ht, 0, 1.05)} stroke=${i >= 2 ? 'var(--k-mm)' : 'var(--pen)'} strokeWidth="1.3" />
      <//>
      ${i === 1 && html`<div className="mv7-out f">first reflections at ${f1.join(', ')} ms</div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 89–90: reverb v. echo v. a feedback delay ── */
  let ROOM3 = null;
  const room3 = () => { if (ROOM3) return ROOM3; const D = [8, 6, 4], S = [2, 3, 1.5], L = [6, 2.5, 1.7], O = 16, out = []; const im = (i, w, s) => i % 2 === 0 ? i * w + s : (i + 1) * w - s;
    for (let i = -O; i <= O; i++) for (let j = -O; j <= O; j++) for (let k = -O; k <= O; k++) { const o = Math.abs(i) + Math.abs(j) + Math.abs(k); if (o > O) continue; const d = Math.hypot(im(i, D[0], S[0]) - L[0], im(j, D[1], S[1]) - L[1], im(k, D[2], S[2]) - L[2]); out.push({ o, d, t: d / 343 * 1000 }); }
    const d0 = out.find(m => m.o === 0).d; out.forEach(m => { m.a = Math.pow(.85, m.o) * d0 / m.d; }); out.sort((a, b) => a.t - b.t); return ROOM3 = out; };
  function ReverbDelay({ ar }) {
    const tmax = 250, H = 80;
    const steps = [
      { en: 'A <b>delay with feedback</b> (an IIR comb, here every 25 ms, × 0.7 each time) can sound similar, but it only gives reflections at a <b>fixed interval</b>.', ar: 'الـ <b>delay بالـ feedback</b> (IIR comb، هنا كل 25 ms ومضروب في 0.7 كل مرة) ممكن يطلع صوت شبهه، بس بيدّي انعكاسات على <b>فترات ثابتة</b> بس.' },
      { en: 'In a real room (an 8 × 6 × 4 m box, computed with image sources): first a few <b>early reflections</b>, well defined and directional, set by the room\'s shape and size and the positions of source and listener. __E__', ar: 'في أوضة حقيقية (صندوق <bdi>8 × 6 × 4 m</bdi>، محسوب بالـ image sources): الأول شوية <b>early reflections</b> واضحة وليها اتجاه، بتتحدد بشكل الأوضة وحجمها ومكان المصدر والمستمع. __E__' },
      { en: 'Then the rate of arriving reflections <b>increases greatly</b>: the <b>diffuse reverberation</b> (late reflections), more random, which gives the spaciousness and decays exponentially in good halls. __L__', ar: 'بعد كده معدّل وصول الانعكاسات <b>بيزيد جدًا</b>: ده الـ <b>diffuse reverberation</b> (late reflections)، عشوائي أكتر، وهو اللي بيدّي الاتساع وبيقل بشكل exponential في القاعات الكويسة. __L__' },
      { en: 'Reverb v. echo: an <b>echo</b> is a distinct delayed copy, heard with a delay of more than about one or two tenths of a second (the red line at 200 ms). In reverb each reflection arrives so quickly that we hear only the combined effect.', ar: 'الفرق بين الـ reverb والـ echo: الـ <b>echo</b> نسخة متأخرة واضحة، بتتسمع لما الـ delay يبقى أكتر من عُشر أو عُشرين من الثانية (الخط الأحمر عند 200 ms). في الـ reverb كل انعكاس بيوصل بسرعة جدًا فبنسمع الأثر المجمّع بس.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const R = useMemo(room3, []), t0 = R[0].t;
    const cnt = (a, b) => R.filter(m => m.t >= a && m.t < b).length, e1 = cnt(t0, t0 + 20), e2 = cnt(t0 + 150, t0 + 170);
    const sub = s => ({ en: s.en.replace('__E__', `${e1} reflections arrive in the first 20 ms.`).replace('__L__', `${e2} reflections arrive in 20 ms around 160 ms.`), ar: s.ar.replace('__E__', `بيوصل ${e1} انعكاس في أول 20 ms.`).replace('__L__', `بيوصل ${e2} انعكاس في 20 ms حوالين الـ 160 ms.`) });
    const cols = new Array(300).fill(0);
    if (i === 0) for (let k = 0; k * 25 <= tmax; k++) cols[Math.min(299, Math.floor(k * 25 / tmax * 300))] = Math.pow(.7, k);
    else R.forEach(m => { if (m.t <= tmax) { const c = Math.floor(m.t / tmax * 300); cols[c] = Math.max(cols[c], m.a); } });
    const xe = v => v / tmax * 300;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Plot} h=${H} title=${i === 0 ? 'Feedback delay: arrivals over 250 ms' : 'Room: arrivals over 250 ms'} foot=${['0', '125', '250 ms']}>
        ${i === 1 && html`<rect x=${xe(t0)} y="0" width=${xe(30)} height=${H} fill="color-mix(in srgb, var(--k-mm) 16%, var(--paper))" />`}
        ${i === 2 && html`<rect x=${xe(t0 + 30)} y="0" width=${300 - xe(t0 + 30)} height=${H} fill="color-mix(in srgb, var(--k-mm) 16%, var(--paper))" />`}
        <path d=${'M0 ' + H + 'H300'} stroke="var(--line)" />
        <path d=${stems(cols, H, 0, 1.05)} stroke="var(--k-mm)" strokeWidth=${i === 0 ? 2.6 : 1.2} />
        ${i === 3 && html`<path d=${'M' + xe(200) + ' ' + H + 'V' + H * .25} stroke="var(--pen)" strokeWidth="3" />`}
      <//></div>
      <${Cap} ...${sub(steps[i])} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* shared reverb building blocks (fbcomb, allpass, lpcomb), fs = 8000 */
  const RFS = 8000;
  const fbcomb = (x, g, D) => { const y = new Float64Array(x.length); for (let n = 0; n < x.length; n++) y[n] = x[n] + (n >= D ? g * y[n - D] : 0); return y; };
  const allpass = (x, g, D) => { const y = new Float64Array(x.length); for (let n = 0; n < x.length; n++) y[n] = -g * x[n] + (n >= D ? x[n - D] + g * y[n - D] : 0); return y; };
  const lpcomb = (x, g1, g2, D) => { const y = new Float64Array(x.length); let w = 0; for (let n = 0; n < x.length; n++) { w = (n >= D ? y[n - D] : 0) + g1 * w; y[n] = (n >= D ? x[n - D] : 0) + g2 * w; } return y; };
  const add = (...a) => { const y = new Float64Array(a[0].length); a.forEach(s => s.forEach((v, k) => { y[k] += v; })); return y; };
  const nrm = s => { let m = 0; s.forEach(v => { m = Math.max(m, Math.abs(v)); }); return Array.from(s, v => v / (m || 1)); };

  /* ── slides 92–101: Schroeder's reverberator, 4 parallel combs then 2 allpass in series ── */
  function Schroeder({ ar }) {
    const L = Math.round(.6 * RFS), cd = [29.7, 37.1, 41.1, 43.7].map(ms => Math.round(ms / 1000 * RFS)), ad = [5, 1.7].map(ms => Math.round(ms / 1000 * RFS));
    const S = useMemo(() => { const x = new Float64Array(L); x[0] = 1; const c = cd.map(D => fbcomb(x, .75, D)), sum = add(...c), a1 = allpass(sum, .7, ad[0]), a2 = allpass(a1, .7, ad[1]); return { c, sum, a1, a2 }; }, []);
    const steps = [
      { en: 'Schroeder (1961) used IIR filters so the output decays gradually. First a bank of <b>4 comb filters in parallel</b>, each with its own delay (here 29.7, 37.1, 41.1 and 43.7 ms, gain 0.75; example values): each gives echoes at its own fixed interval.', ar: 'الـ Schroeder (1961) استخدم IIR filters عشان الـ output يقل بالتدريج. الأول bank من <b>4 comb filters على التوازي</b>، كل واحد بـ delay مختلف (هنا 29.7 و37.1 و41.1 و43.7 ms، والـ gain بـ 0.75؛ قيم مثال): كل واحد بيدّي echoes على فترة ثابتة بتاعته.' },
      { en: 'The four comb outputs are <b>summed</b>: their echoes interleave.', ar: 'الـ outputs الأربعة بتتـ<b>جمع</b>: الـ echoes بتاعتهم بتتداخل.' },
      { en: 'Then the first <b>allpass filter</b> (5 ms, g = 0.7) in series: it spreads every echo into more reflections.', ar: 'بعدين أول <b>allpass filter</b> (5 ms و<bdi>g = 0.7</bdi>) على التوالي: بيفرّد كل echo لانعكاسات أكتر.' },
      { en: 'And the second allpass (1.7 ms): denser still. This is the classic 4 comb + 2 allpass design. It does <b>not</b> create the increasing arrival rate of reflections of a real room, so it is primitive by today\'s standards.', ar: 'وبعده الـ allpass التاني (1.7 ms): كثافة أكتر. ده التصميم الكلاسيكي 4 comb و2 allpass. بس <b>مش</b> بيعمل الزيادة في معدّل وصول الانعكاسات اللي في الأوضة الحقيقية، فبيعتبر بدائي بمقاييس النهارده.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const on = k => i >= k ? 'var(--k-mm)' : 'var(--faint)', g = 'var(--graphite)', H = 60;
    const bx = (x, y, w, t, k) => html`<g><rect x=${x} y=${y} width=${w} height="26" rx="3" fill="var(--paper)" stroke=${on(k)} strokeWidth="2" /><text x=${x + w / 2} y=${y + 19} textAnchor="middle" fontSize="15">${t}</text></g>`;
    const show = i === 0 ? S.c : [i === 1 ? S.sum : i === 2 ? S.a1 : S.a2];
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 320 140" role="img" aria-label="Four comb filters in parallel, summed, then two allpass filters"><defs>${mk('mv7-sc-a', g)}</defs>
        <text x="0" y="66" fontSize="15">x</text><path d="M12 70 H24 M24 18 V122" stroke=${g} strokeWidth="2" />
        ${[0, 1, 2, 3].map(k => html`<g key=${k}><path d=${'M24 ' + (18 + k * 34.6) + ' H34'} stroke=${g} strokeWidth="2" markerEnd="url(#mv7-sc-a)" />${bx(36, 5 + k * 34.6, 56, 'Comb', 0)}<path d=${'M92 ' + (18 + k * 34.6) + ' H110 L' + 124 + ' 70'} stroke=${on(1)} strokeWidth="2" fill="none" /></g>`)}
        <circle cx="128" cy="70" r="10" fill="var(--paper)" stroke=${on(1)} strokeWidth="2" /><text x="128" y="75" textAnchor="middle" fontSize="15">+</text>
        <path d="M138 70 H148" stroke=${on(2)} strokeWidth="2" markerEnd="url(#mv7-sc-a)" />${bx(150, 57, 74, 'Allpass', 2)}
        <path d="M224 70 H232" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-sc-a)" />${bx(234, 57, 74, 'Allpass', 3)}
        <path d="M308 70 V100" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-sc-a)" /><text x="314" y="122" textAnchor="end" fontSize="15">y</text>
      </svg>
      ${show.map((s, k) => html`<${Plot} key=${i + '-' + k} h=${i === 0 ? 34 : H} title=${i === 0 ? 'Comb ' + (k + 1) + ' (' + [29.7, 37.1, 41.1, 43.7][k] + ' ms)' : ['', 'Sum of the 4 combs', 'After allpass 1', 'After allpass 2'][i]} foot=${k === show.length - 1 ? ['0', '0.3', '0.6 s'] : null}>
        <path d=${band(nrm(s), i === 0 ? 34 : H, -1.05, 1.05)} stroke="var(--k-mm)" strokeWidth="1" /><//>`)}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 102–109: Moorer's reverberator ── */
  function Moorer({ ar }) {
    const L = Math.round(.6 * RFS), ms = v => Math.round(v / 1000 * RFS);
    const taps = [[4.3, .84], [21.5, .5], [22.5, .49], [26.8, .38], [27, .38], [29.8, .35]], cd = [50, 56, 61, 68, 72, 78].map(ms);
    const M = useMemo(() => { const x = new Float64Array(L); x[0] = 1; const early = new Float64Array(L); early[0] = 1; taps.forEach(([t, g]) => { early[ms(t)] += g; });
      const nolp = add(...cd.map(D => fbcomb(x, .84, D))), lp = add(...cd.map(D => lpcomb(x, .5, .42, D))), ap = allpass(lp, .7, ms(6)), late = new Float64Array(L), dd = ms(30); for (let n = dd; n < L; n++) late[n] = .25 * ap[n - dd];
      return { early, nolp, lp, full: add(early, late) }; }, []);
    const steps = [
      { en: '(a) A <b>tapped delay line</b> simulates the <b>early reflections</b>: a few taps, each a delayed and scaled copy (example taps up to 30 ms). They are forwarded to (b).', ar: 'الجزء (a): <b>tapped delay line</b> بيعمل الـ <b>early reflections</b>: شوية taps، كل واحد نسخة متأخرة ومتصغّرة (taps مثال لحد 30 ms). وبتتبعت للجزء (b).' },
      { en: '(b) <b>Parallel comb filters with different delay lengths</b> (here 50 to 78 ms) simulate the modes of the room and sound reflecting between parallel walls.', ar: 'الجزء (b): <b>comb filters على التوازي بأطوال delay مختلفة</b> (هنا من 50 لـ 78 ms) بتمثل الـ modes بتاعة الأوضة والصوت اللي بيترد بين الحيطان المتوازية.' },
      { en: '<b>Lowpass filters in the feedback loops</b> (g1 = 0.5 as in the demo; feedback set so g2/(1 − g1) < 1 for stability) make the reverb time shorter at high frequencies, like air absorption and wall reflectivity: the tail gets smoother.', ar: 'الـ <b>lowpass filters جوه الـ feedback loops</b> (الـ g1 بـ 0.5 زي الـ demo، والـ feedback متظبط بحيث <bdi>g2/(1 − g1) < 1</bdi> عشان الاستقرار) بتخلي الـ reverb time أقصر في الترددات العالية، زي امتصاص الهوا وانعكاس الحيطان: الذيل بيبقى أنعم.' },
      { en: 'An <b>allpass</b> increases the reflection density (diffusion), the result is delayed and added back to the early reflections. The demo uses <b>6 lowpass combs + 1 allpass</b>.', ar: 'الـ <b>allpass</b> بيزوّد كثافة الانعكاسات (diffusion)، والناتج بيتأخر ويتجمع على الـ early reflections. والـ demo بيستخدم <b>6 lowpass combs و1 allpass</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const on = k => i >= k ? 'var(--k-mm)' : 'var(--faint)', g = 'var(--graphite)', H = 70;
    const sig = [M.early, M.nolp, M.lp, M.full][i];
    return html`<figure className="fig mv7"><div className="fig-stage">
      <svg viewBox="0 0 320 150" role="img" aria-label="Moorer reverberator: tapped delay line, six lowpass combs, allpass"><defs>${mk('mv7-mo-a', g)}</defs>
        <text x="0" y="30" fontSize="15">x</text><path d="M12 26 H300" stroke=${on(0)} strokeWidth="2" />
        ${[0, 1, 2, 3, 4].map(k => html`<g key=${k}><rect x=${30 + k * 54} y="16" width="24" height="20" fill="var(--paper)" stroke=${on(0)} strokeWidth="1.6" /><path d=${'M' + (66 + k * 54) + ' 26 V48'} stroke=${on(0)} strokeWidth="1.6" markerEnd="url(#mv7-mo-a)" /></g>`)}
        <path d="M40 52 H282" stroke=${on(0)} strokeWidth="2" /><text x="318" y="56" textAnchor="end" fontSize="14">(a)</text>
        <path d="M40 52 V70" stroke=${on(1)} strokeWidth="2" />
        ${[0, 1, 2, 3, 4, 5].map(k => html`<g key=${k}><path d=${'M40 ' + (74 + k * 12) + ' H52'} stroke=${on(1)} strokeWidth="1.4" /><rect x="54" y=${68 + k * 12} width="44" height="11" rx="2" fill="var(--paper)" stroke=${on(i >= 2 ? 2 : 1)} strokeWidth="1.4" /><path d=${'M98 ' + (74 + k * 12) + ' L118 110'} stroke=${on(1)} strokeWidth="1.2" /></g>`)}
        <path d="M40 70 V134" stroke=${on(1)} strokeWidth="1.4" /><text x="76" y="148" textAnchor="middle" fontSize="14">6 LP combs</text>
        <circle cx="124" cy="110" r="9" fill="var(--paper)" stroke=${on(1)} strokeWidth="2" /><text x="124" y="115" textAnchor="middle" fontSize="14">+</text>
        <path d="M133 110 H150" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-mo-a)" /><rect x="152" y="96" width="44" height="28" rx="3" fill="var(--paper)" stroke=${on(3)} strokeWidth="2" /><text x="174" y="115" textAnchor="middle" fontSize="15">AP</text>
        <path d="M196 110 H212" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-mo-a)" /><rect x="214" y="96" width="38" height="28" rx="3" fill="var(--paper)" stroke=${on(3)} strokeWidth="2" /><text x="233" y="115" textAnchor="middle" fontSize="15">z<tspan dy="-6" fontSize="14">−d</tspan></text>
        <path d="M252 110 H272" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-mo-a)" /><circle cx="282" cy="110" r="9" fill="var(--paper)" stroke=${on(3)} strokeWidth="2" /><text x="282" y="115" textAnchor="middle" fontSize="14">+</text>
        <path d="M282 52 V99" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-mo-a)" /><path d="M291 110 H306" stroke=${on(3)} strokeWidth="2" markerEnd="url(#mv7-mo-a)" /><text x="320" y="138" textAnchor="end" fontSize="15">y</text><text x="318" y="92" textAnchor="end" fontSize="14">(b)</text>
      </svg>
      <${Plot} key=${i} h=${H} title=${['Early reflections (a)', '6 combs, no lowpass', '6 lowpass combs', 'Full impulse response'][i]} foot=${['0', '0.3', '0.6 s']}><path d=${band(nrm(sig), H, -1.05, 1.05)} stroke="var(--k-mm)" strokeWidth="1" /><//></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 110–118: convolution reverb with the FFT (fconv.m) ── */
  function ConvRev({ ar }) {
    const fs = 4000, [ir, setIr] = useState('room');
    const x = useMemo(() => { const r = rng(7), s = new Array(fs).fill(0); [.05, .4, .75].forEach(t0 => { for (let k = 0; k < .03 * fs; k++) s[Math.round(t0 * fs) + k] += (r() * 2 - 1) * Math.exp(-k / (.006 * fs)); }); return s; }, []);
    const hs = useMemo(() => { const r = rng(11), room = N(Math.round(.5 * fs), k => (k === 0 ? 1 : (r() * 2 - 1) * .45 * Math.exp(-k / (.07 * fs)))), cat = N(Math.round(3 * fs), k => (k === 0 ? 1 : k < .03 * fs ? 0 : (r() * 2 - 1) * .5 * Math.exp(-k / (.45 * fs)))); return { room, cat, rev: cat.slice().reverse() }; }, []);
    const h = hs[ir], { y, n } = useMemo(() => fconv(x, h), [ir]);
    const T = 4 * fs, pad = s => s.concat(new Array(Math.max(0, T - s.length)).fill(0)).slice(0, T), H = 46;
    const direct = x.length * h.length, fftOps = Math.round(3 * (n / 2) * Math.log2(n) + n);
    const nm = { room: 'Living room', cat: 'Cathedral', rev: 'Reverse cathedral' }[ir];
    const en = `<b>Convolution reverb</b>: convolve the input with the room's impulse response, y(n) = Σ x(k)·h(n − k), the most faithful method. Record the impulse with a gun shot, drum hit or hand clap (or simulate it; these ${nm.toLowerCase()} responses are simulated). The response is long, so a direct filter is too costly: here ${f2(x.length, 0)} × ${f2(h.length, 0)} ≈ <b>${f2(direct / 1e6, 1)} million</b> multiplications. fconv.m uses the <b>convolution theorem</b> instead: y = IFFT(FFT(x)·FFT(h)) with ${f2(n, 0)}-point FFTs, about <b>${f2(fftOps / 1e6, 2)} million</b> operations.${ir === 'rev' ? ' You can convolve with anything: a reversed cathedral makes the sound swell in before it.' : ''}`;
    const a = `الـ <b>Convolution reverb</b>: بنعمل convolution للـ input مع الـ impulse response بتاع الأوضة، ودي أدق طريقة:<span class="ltr">y(n) = Σ x(k)·h(n − k)</span>بنسجل الـ impulse بطلقة أو خبطة drum أو تصقيفة (أو نعمله simulation؛ والـ responses هنا متعملة simulation). الـ response طويل، فالـ filter المباشر مكلف: هنا حوالي <bdi>${f2(direct / 1e6, 1)}</bdi> مليون عملية ضرب. الـ fconv.m بيستخدم <b>convolution theorem</b> بدل كده:<span class="ltr">y = IFFT(FFT(x)·FFT(h))</span>وده حوالي <bdi>${f2(fftOps / 1e6, 2)}</bdi> مليون عملية بس.${ir === 'rev' ? ' وتقدر تعمل convolution مع أي حاجة: الكاتدرائية المعكوسة بتخلي الصوت يعلى قبله.' : ''}`;
    return html`<figure className="fig mv7"><div className="fig-stage">
      <${Chips} opts=${[['room', 'Living room'], ['cat', 'Cathedral'], ['rev', 'Reverse cathedral']]} v=${ir} set=${setIr} />
      <${Plot} h=${H} title="x(n): dry input (3 hits)" foot=${null}><path d=${band(pad(x), H, -1.05, 1.05)} stroke="var(--graphite)" strokeWidth="1" /><//>
      <${Plot} h=${H} title=${'h(n): ' + nm + ' impulse response'} right=${f2(h.length / fs, 1) + ' s'}><path d=${band(pad(h), H, -1.05, 1.05)} stroke="var(--pen)" strokeWidth="1" /><//>
      <${Plot} h=${H + 10} title="y = IFFT(FFT(x)·FFT(h)), normalised" foot=${['0', '1', '2', '3', '4 s']}><path d=${band(pad(y), H + 10, -1.05, 1.05)} stroke="var(--k-mm)" strokeWidth="1" /><//></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mm-fx-order': FxOrder, 'mm-fx-pedal': FxPedal, 'mm-fx-classes': FxClasses,
    'mm-eq-response': EqResponse, 'mm-eq-flow': EqFlow, 'mm-eq-db': EqDb,
    'mm-wah-flow': WahFlow, 'mm-wah-mfold': MFold, 'mm-svf-step': SvfStep, 'mm-wah-sweep': WahSweep,
    'mm-fir-comb': p => html`<${CombFlow} ...${p} kind="fir" />`, 'mm-iir-comb': p => html`<${CombFlow} ...${p} kind="iir" />`,
    'mm-delay-samples': DelayCalc, 'mm-unicomb': UniComb, 'mm-comb-impulse': CombImpulse,
    'mm-vibrato': Vibrato, 'mm-delay-ranges': DelayRanges, 'mm-flanger': Flanger,
    'mm-ring-mod': p => html`<${ModSpec} ...${p} mode0="rm" />`, 'mm-am-mod': p => html`<${ModSpec} ...${p} mode0="am" />`, 'mm-tremolo': Tremolo,
    'mm-limiter': Limiter, 'mm-compexp': CompExp,
    'mm-overdrive': p => html`<${Distort} ...${p} mode0="od" />`, 'mm-fuzz': p => html`<${Distort} ...${p} mode0="fz" />`, 'mm-exciter': Exciter,
    'mm-panning': Panning, 'mm-room-reflect': Room, 'mm-reverb-delay': ReverbDelay, 'mm-schroeder': Schroeder, 'mm-moorer': Moorer, 'mm-conv-reverb': ConvRev
  });
})();

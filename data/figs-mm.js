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
.fm4-lay .blk span{ border:1px solid var(--graphite); background:var(--paper); font:600 .86rem/1 var(--mono); padding:6px 0; color:var(--ink); }
.fm4-lay .blk span.c{ background:color-mix(in srgb, var(--k-mm) 14%, var(--paper)); }
.fm4-lay .n{ font-size:.82rem; color:var(--graphite); }
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


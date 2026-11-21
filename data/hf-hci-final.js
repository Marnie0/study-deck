// Head First final revision for Human Computer Interaction (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course in one book, built around what the finals ask: a self-rating, an animated course map, the anatomy of the
// papers and a hot list counted from them, every lecture in a few dense pages (key ideas, its most useful visual, the worst
// trap, one quick check), the written problems of the 2024/25 and 2025/26 finals as interactive worked problems with a fresh
// variant of our own for each, cross-lecture showdowns, an exam corner of the doctors' questions, an exam-day plan and the
// bullet points. Every fact comes from the lecture notes and the final summary (final/hci.js); model answers follow the site's
// worked answers; our analogies, mock-ups, scenarios, links and advice are marked as ours.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState, useEffect, useMemo } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;
  const tt = (ar, en, a) => ar ? a : en;

  if (!document.getElementById('hf-css-hciF')) {
    const s = document.createElement('style'); s.id = 'hf-css-hciF';
    s.textContent = `
.hfb{ --hciF-1:#2563EB; --hciF-2:#7C3AED; --hciF-3:#0E8F62; --hciF-4:#C26A06; }
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .hfb{ --hciF-1:#82A8FF; --hciF-2:#BC9BF7; --hciF-3:#55D3A6; --hciF-4:#F5B358; } }
:root[data-theme="dark"] .hfb{ --hciF-1:#82A8FF; --hciF-2:#BC9BF7; --hciF-3:#55D3A6; --hciF-4:#F5B358; }
.hfb .hf-hciF-tag{ align-self:flex-start; display:inline-block; font:700 13px/1 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--hf-k); border:1.5px solid var(--hf-k); border-radius:99px; padding:4px 9px; }
.hfb .hf-hciF-tag.red{ color:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-hciF-src{ font:700 13px/1.2 var(--body); color:var(--graphite); margin:0; }
/* how ready am I */
.hfb .hf-hciF-rd{ display:grid; gap:2px; }
.hfb .hf-hciF-rd .rw{ display:grid; grid-template-columns:24px 1fr auto; gap:7px; align-items:center; padding:1px 0; border-bottom:1px dotted var(--faint); }
.hfb .hf-hciF-n{ width:23px; height:23px; border-radius:50%; display:inline-grid; place-items:center; font:800 13px/1 var(--body); color:var(--paper); flex:none; }
.hfb .hf-hciF-g1{ background:var(--hciF-1); } .hfb .hf-hciF-g2{ background:var(--hciF-2); } .hfb .hf-hciF-g3{ background:var(--hciF-3); } .hfb .hf-hciF-g4{ background:var(--hciF-4); }
.hfb .hf-hciF-rd .nm{ font:600 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-hciF-rd .bt{ display:flex; gap:3px; }
.hfb .hf-hciF-rd .bt button{ font:700 13px/1 var(--body); height:24px; padding:0 7px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hciF-rd .bt button.k0[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-hciF-rd .bt button.k1[aria-pressed="true"]{ background:var(--hciF-4); border-color:var(--hciF-4); color:var(--paper); }
.hfb .hf-hciF-rd .bt button.k2[aria-pressed="true"]{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
.hfb .hf-hciF-steps{ display:grid; gap:4px; }
.hfb .hf-hciF-steps p{ margin:0; display:grid; grid-template-columns:22px 1fr; gap:7px; font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-hciF-steps p > b:first-child{ font:800 15px/1.2 var(--body); color:var(--hf-k); }
/* the course map */
.hfb .hf-hciF-map{ position:relative; height:226px; }
.hfb .hf-hciF-map svg{ position:absolute; left:0; top:0; width:100%; height:100%; overflow:visible; }
.hfb .hf-hciF-stop{ position:absolute; transform:translateX(-50%); width:80px; display:flex; flex-direction:column; align-items:center; gap:3px; background:none; border:0; padding:0; cursor:pointer; color:var(--ink); }
.hfb .hf-hciF-stop .hf-hciF-n{ width:31px; height:31px; font-size:14.5px; border:3px solid var(--paper); box-shadow:0 0 0 2px var(--hf-line); transition:transform .25s; }
.hfb .hf-hciF-stop.on .hf-hciF-n{ transform:scale(1.2); box-shadow:0 0 0 3px var(--hf-line); }
.hfb .hf-hciF-stop.on.pulse .hf-hciF-n{ animation:hf-hciF-pulse 1.3s ease-in-out infinite; }
@keyframes hf-hciF-pulse{ 50%{ box-shadow:0 0 0 7px color-mix(in srgb, var(--hf-k) 25%, transparent); } }
.hfb .hf-hciF-stop > span:last-child{ font:600 13px/1.12 var(--body); text-align:center; }
.hfb .hf-hciF-stop.on > span:last-child{ font-weight:800; }
.hfb .hf-hciF-card{ border:2px solid var(--hf-line); border-radius:9px; padding:8px 10px; height:158px; overflow:hidden; background:var(--paper); box-shadow:4px 4px 0 var(--hf-grey2); }
.hfb .hf-hciF-card .hd{ display:flex; align-items:center; gap:7px; margin:0 0 4px; font:800 15px/1.15 var(--body); color:var(--ink); }
.hfb .hf-hciF-card .lb{ font:700 13px/1.2 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--graphite); margin:0; }
.hfb .hf-hciF-card .tx{ font-size:14px; line-height:1.33; margin:2px 0 0; color:var(--ink); }
.hfb .hf-hciF-card .pp{ font:700 13px/1.2 var(--body); color:var(--hf-k); margin:4px 0 0; }
.hfb .hf-hciF-legend{ display:flex; flex-wrap:wrap; gap:4px 10px; }
.hfb .hf-hciF-legend span{ display:inline-flex; align-items:center; gap:5px; font:600 13px/1.1 var(--body); color:var(--ink); }
.hfb .hf-hciF-legend i{ width:11px; height:11px; border-radius:50%; display:inline-block; }
/* tabs, used by several widgets */
.hfb .hf-hciF-tabs{ display:flex; gap:4px; flex-wrap:wrap; }
.hfb .hf-hciF-tabs button{ flex:1 1 0; min-width:0; min-height:32px; padding:3px 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:700 13px/1.1 var(--body); cursor:pointer; }
.hfb .hf-hciF-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hciF-tabs button.dn{ border-color:var(--ok); }
/* threads */
.hfb .hf-hciF-dots{ display:flex; justify-content:space-between; gap:3px; padding:4px 2px; }
.hfb .hf-hciF-dots .hf-hciF-n{ opacity:.22; transition:opacity .3s, transform .3s; }
.hfb .hf-hciF-dots .hf-hciF-n.on{ opacity:1; transform:scale(1.12); }
.hfb .hf-hciF-chain{ display:grid; gap:5px; }
.hfb .hf-hciF-chain p{ margin:0; font-size:14px; line-height:1.32; color:var(--ink); padding:5px 9px; border-left:4px solid var(--hf-k); background:var(--hf-grey); border-radius:0 6px 6px 0; }
/* the paper */
.hfb .hf-hciF-bar{ display:flex; height:30px; border:2px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-hciF-bar span{ display:grid; place-items:center; font:800 13px/1 var(--body); color:var(--paper); border-left:2px solid var(--paper); white-space:nowrap; overflow:hidden; }
.hfb .hf-hciF-bar span:first-child{ border-left:0; }
.hfb .hf-hciF-qs{ display:grid; gap:5px; }
.hfb .hf-hciF-qs > div{ display:grid; grid-template-columns:50px 1fr; gap:8px; align-items:start; border-bottom:1px dotted var(--faint); padding-bottom:4px; }
.hfb .hf-hciF-qs b.q{ font:800 14px/1.2 var(--body); color:var(--hf-k); }
.hfb .hf-hciF-qs p{ margin:0; font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-hciF-qs p small{ display:block; font-size:13px; color:var(--graphite); line-height:1.3; }
/* hot list */
.hfb .hf-hciF-hot{ display:grid; gap:3px; }
.hfb .hf-hciF-hot > div{ display:grid; grid-template-columns:18px 1fr 118px; gap:6px; align-items:center; }
.hfb .hf-hciF-hot .r{ font:800 13px/1 var(--body); color:var(--graphite); text-align:center; }
.hfb .hf-hciF-hot .nm{ font:600 13.5px/1.15 var(--body); color:var(--ink); }
.hfb .hf-hciF-hot .nm small{ font:600 13px/1 var(--body); color:var(--graphite); margin-left:4px; }
.hfb .hf-hciF-hot .bx{ display:flex; align-items:center; gap:4px; }
.hfb .hf-hciF-hot .tr{ flex:none; width:70px; height:13px; background:var(--hf-grey2); border-radius:3px; display:flex; overflow:hidden; }
.hfb .hf-hciF-hot .tr i{ display:block; height:100%; transform-origin:0 50%; animation:hf-hciF-grow .8s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-hciF-grow{ from{ transform:scaleX(0); } }
.hfb .hf-hciF-hot .v{ font:800 13px/1 var(--body); color:var(--ink); min-width:18px; }
.hfb .hf-hciF-hot .m{ font:600 13px/1 var(--body); color:var(--graphite); white-space:nowrap; }
.hfb .hf-hciF-hot .sep{ grid-column:1 / -1; border-top:1.5px dashed var(--faint); margin:2px 0; height:0; }
.hfb .hf-hciF-c24{ background:var(--hciF-1); } .hfb .hf-hciF-c25{ background:var(--hciF-4); }
/* compact facts */
.hfb .hf-hciF-kn{ display:grid; gap:4px; }
.hfb .hf-hciF-kn p{ margin:0; font-size:14px; line-height:1.31; color:var(--ink); padding:3px 0 3px 9px; border-left:3px solid var(--hf-k); }
.hfb .hf-hciF-kn p b{ font-weight:700; }
.hfb .hf-hciF-kn p.ly{ border-left-style:dashed; }
.hfb .hf-hciF-two{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-hciF-two > div{ border:1.5px solid var(--hf-line); border-radius:7px; padding:6px 8px; background:var(--paper); }
.hfb .hf-hciF-two h5{ margin:0 0 3px; font:800 14.5px/1.15 var(--body); color:var(--hf-k); }
.hfb .hf-hciF-two p{ margin:0; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-hciF-flow{ display:flex; flex-wrap:wrap; align-items:center; gap:3px 4px; }
.hfb .hf-hciF-flow b{ font:700 13px/1.15 var(--body); border:1.5px solid var(--hf-line); border-radius:99px; padding:3px 8px; background:var(--paper); color:var(--ink); }
.hfb .hf-hciF-flow i{ font-style:normal; font:800 13px/1 var(--body); color:var(--hf-k); }
.hfb .hf-hciF-flow em{ font:700 13px/1.15 var(--body); font-style:normal; color:var(--graphite); margin-right:2px; }
.hfb .hf-hciF-stat{ display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; }
.hfb .hf-hciF-stat > div{ border:2px solid var(--hf-line); border-radius:8px; padding:5px 6px; text-align:center; background:var(--paper); }
.hfb .hf-hciF-stat b{ display:block; font:800 22px/1.05 var(--body); color:var(--hf-k); }
.hfb .hf-hciF-stat span{ display:block; font-size:13px; line-height:1.22; color:var(--ink); margin-top:2px; }
/* table fill */
.hfb .hf-hciF-tf{ display:grid; grid-template-columns:70px 1fr 1fr; border:2px solid var(--hf-line); border-radius:7px; overflow:hidden; }
.hfb .hf-hciF-tf > span{ padding:4px 6px; font:800 13px/1.2 var(--body); background:var(--hf-line); color:var(--paper); }
.hfb .hf-hciF-tf > b{ padding:5px 6px; font:700 13px/1.2 var(--body); color:var(--ink); background:var(--hf-grey); border-top:1px solid var(--hf-grey2); display:flex; align-items:center; }
.hfb .hf-hciF-tf > button{ text-align:left; padding:5px 6px; min-height:44px; font:500 13px/1.22 var(--body); color:var(--ink); background:var(--paper); border:0; border-top:1px solid var(--hf-grey2); border-left:1px solid var(--hf-grey2); cursor:pointer; }
.hfb .hf-hciF-tf > button.e{ color:var(--graphite); font-style:italic; }
.hfb .hf-hciF-tf > button.ok{ background:color-mix(in srgb, var(--ok) 13%, var(--paper)); }
.hfb .hf-hciF-tf > button.no{ background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); }
.hfb .hf-hciF-tf > button.ok::after{ content:" ✓"; color:var(--ok); font-weight:800; }
.hfb .hf-hciF-tf > button.no::after{ content:" ✗"; color:var(--hf-red); font-weight:800; }
/* evaluate survey questions */
.hfb .hf-hciF-ev{ display:grid; gap:6px; }
.hfb .hf-hciF-evq{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); min-height:64px; }
.hfb .hf-hciF-evq p{ margin:0; font:italic 15px/1.33 var(--display); color:var(--ink); }
.hfb .hf-hciF-chips{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-hciF-chips button{ font:600 13px/1.1 var(--body); min-height:30px; padding:4px 8px; border-radius:99px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hciF-chips button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hciF-chips button.ok{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
.hfb .hf-hciF-chips button.no{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-hciF-chips button.miss{ border-color:var(--ok); border-style:dashed; }
.hfb .hf-hciF-verd{ min-height:96px; margin:0; font-size:14px; line-height:1.34; color:var(--ink); padding:6px 9px; background:var(--hf-grey); border-radius:7px; }
.hfb .hf-hciF-verd b.v{ font-weight:800; }
/* build the written answer */
.hfb .hf-hciF-bl{ display:grid; gap:3px; }
.hfb .hf-hciF-bl button{ display:grid; grid-template-columns:22px 1fr; gap:7px; align-items:start; text-align:left; font:500 13.5px/1.28 var(--body); padding:5px 7px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hciF-bl button .bx{ width:18px; height:18px; border:2px solid var(--hf-line); border-radius:4px; display:grid; place-items:center; font:800 13px/1 var(--body); margin-top:1px; }
.hfb .hf-hciF-bl button[aria-pressed="true"] .bx{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-hciF-bl button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 11%, var(--paper)); }
.hfb .hf-hciF-bl button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); text-decoration:line-through; text-decoration-color:var(--hf-red); }
.hfb .hf-hciF-bl button.miss{ border-color:var(--ok); border-style:dashed; }
/* fill the blanks */
.hfb .hf-hciF-bk{ font-size:15px; line-height:2.05; color:var(--ink); margin:0; }
.hfb .hf-hciF-bk button{ font:700 14px/1.2 var(--body); padding:2px 8px; margin:0 1px; border-radius:6px; border:1.5px dashed var(--hf-hand); background:var(--paper); color:var(--hf-hand); cursor:pointer; }
.hfb .hf-hciF-bk button.ok{ border:1.5px solid var(--ok); color:var(--ok); }
.hfb .hf-hciF-bk button.no{ border:1.5px solid var(--hf-red); color:var(--hf-red); }
/* design and development lanes */
.hfb .hf-hciF-ln{ display:grid; grid-template-columns:72px repeat(6, minmax(0, 1fr)); gap:3px; align-items:center; }
.hfb .hf-hciF-ln .lb{ font:800 13px/1.1 var(--body); color:var(--ink); hyphens:manual; min-width:0; }
.hfb .hf-hciF-ln .c{ height:26px; border-radius:4px; background:var(--hf-grey); border:1.5px solid var(--hf-grey2); transition:background .3s; }
.hfb .hf-hciF-ln .c.d{ background:var(--hciF-1); border-color:var(--hciF-1); }
.hfb .hf-hciF-ln .c.v{ background:var(--hciF-4); border-color:var(--hciF-4); }
.hfb .hf-hciF-ln .ar{ text-align:center; font:800 16px/1 var(--body); color:var(--hf-red); height:18px; }
.hfb .hf-hciF-ln .tm{ text-align:center; font:600 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-hciF-cnt{ font:800 15px/1.2 var(--body); color:var(--ink); margin:0; }
.hfb .hf-hciF-cnt b{ color:var(--hf-red); font-size:19px; }
/* phone mock-ups (ours) */
.hfb .hf-hciF-ph{ position:relative; width:226px; margin:0 auto; border:3px solid var(--hf-line); border-radius:18px; padding:9px 8px 10px; background:var(--paper); font-family:var(--body); color:var(--ink); }
.hfb .hf-hciF-ph .rw{ display:flex; align-items:center; gap:5px; }
.hfb .hf-hciF-ph .el{ position:relative; border-radius:6px; transition:box-shadow .25s, background .25s; }
.hfb .hf-hciF-ph .el.on{ box-shadow:0 0 0 2.5px var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
.hfb .hf-hciF-ph .bd{ position:absolute; top:-7px; right:-7px; width:18px; height:18px; border-radius:50%; background:var(--hf-red); color:#fff; font:800 12px/18px var(--body); text-align:center; z-index:2; }
.hfb .hf-hciF-ph .logo{ font:800 13px/1 var(--body); border:1.5px solid var(--hf-line); border-radius:5px; padding:4px 5px; }
.hfb .hf-hciF-ph .tabs{ display:flex; gap:2px; flex:1; }
.hfb .hf-hciF-ph .tabs span{ flex:1; text-align:center; font:700 11.5px/1 var(--body); padding:4px 0; border-bottom:2px solid var(--faint); }
.hfb .hf-hciF-ph .tabs span.on{ border-color:var(--hciF-1); color:var(--hciF-1); }
.hfb .hf-hciF-ph .srch{ border:1.5px solid var(--hf-line); border-radius:99px; padding:6px 9px; font:600 12.5px/1 var(--body); color:var(--graphite); }
.hfb .hf-hciF-ph .ic{ display:grid; grid-template-columns:repeat(4, 1fr); gap:3px; }
.hfb .hf-hciF-ph .ic span{ display:flex; flex-direction:column; align-items:center; gap:2px; font:600 11.5px/1 var(--body); }
.hfb .hf-hciF-ph .ic i{ width:24px; height:24px; border-radius:50%; border:1.5px solid var(--hciF-1); display:grid; place-items:center; font:800 11.5px/1 var(--body); font-style:normal; color:var(--hciF-1); }
.hfb .hf-hciF-ph .crd{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 7px; font:600 12px/1.25 var(--body); }
.hfb .hf-hciF-ph .crd b{ font-weight:800; }
.hfb .hf-hciF-ph .btn{ display:inline-block; border-radius:6px; padding:5px 8px; font:800 12px/1 var(--body); border:1.5px solid var(--hf-line); }
.hfb .hf-hciF-ph .btn.p{ background:var(--hciF-1); border-color:var(--hciF-1); color:var(--paper); }
.hfb .hf-hciF-ph .btn.s{ color:var(--graphite); border-color:var(--faint); font-weight:600; }
.hfb .hf-hciF-ph .lnk{ font:600 12px/1 var(--body); color:var(--hciF-1); text-decoration:underline; }
.hfb .hf-hciF-ph .fold{ border-top:1.5px dashed var(--hf-red); margin:5px -8px 4px; position:relative; height:0; }
.hfb .hf-hciF-ph .fold em{ position:absolute; right:6px; top:-8px; background:var(--paper); padding:0 4px; font:italic 600 11.5px/1 var(--body); color:var(--hf-red); }
.hfb .hf-hciF-ph .prg{ display:flex; gap:2px; }
.hfb .hf-hciF-ph .prg span{ flex:1; text-align:center; font:700 11px/1 var(--body); padding:4px 0; border-radius:3px; background:var(--hf-grey); }
.hfb .hf-hciF-ph .prg span.dn{ background:var(--hciF-1); color:var(--paper); }
.hfb .hf-hciF-ph .prg span.nw{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-hciF-ph .fld{ display:grid; gap:2px; }
.hfb .hf-hciF-ph .fld label{ font:700 11.5px/1 var(--body); }
.hfb .hf-hciF-ph .fld span{ border:1.5px solid var(--faint); border-radius:5px; padding:4px 6px; font:500 12px/1.1 var(--body); }
.hfb .hf-hciF-ph .fld span.hint{ color:var(--graphite); font-style:italic; }
.hfb .hf-hciF-ph .fld span.err{ border-color:var(--hf-red); }
.hfb .hf-hciF-ph .fld small{ font:700 11px/1.1 var(--body); color:var(--hf-red); }
.hfb .hf-hciF-ph .top{ font:700 11.5px/1.2 var(--body); color:var(--paper); background:var(--hf-red); border-radius:4px; padding:3px 6px; }
.hfb .hf-hciF-ph button.el{ display:block; width:100%; text-align:left; border:0; padding:0; background:none; color:inherit; cursor:pointer; font:inherit; }
.hfb .hf-hciF-ph button.el.fl{ box-shadow:0 0 0 2.5px var(--hf-hand); }
.hfb .hf-hciF-ph button.el.good{ box-shadow:0 0 0 2.5px var(--ok); }
.hfb .hf-hciF-ph button.el.bad{ box-shadow:0 0 0 2.5px var(--hf-red); }
.hfb .hf-hciF-ph .nb{ position:absolute; left:-15px; top:50%; transform:translateY(-50%); width:17px; height:17px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 11.5px/17px var(--body); text-align:center; }
.hfb .hf-hciF-say{ min-height:84px; margin:0; font-size:14px; line-height:1.34; color:var(--ink); padding:6px 9px; border-left:4px solid var(--hf-red); background:var(--hf-grey); border-radius:0 7px 7px 0; }
.hfb .hf-hciF-key{ display:grid; gap:3px; }
.hfb .hf-hciF-key p{ margin:0; display:grid; grid-template-columns:20px 1fr; gap:6px; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-hciF-key p > i{ width:18px; height:18px; border-radius:50%; font:800 11.5px/18px var(--body); font-style:normal; text-align:center; color:var(--paper); margin-top:1px; }
/* true or false rapid fire, ordering */
.hfb .hf-hciF-tfq{ display:grid; gap:4px; }
.hfb .hf-hciF-tfq > div{ display:grid; grid-template-columns:1fr auto; gap:6px; align-items:center; padding:3px 0; border-bottom:1px dotted var(--faint); }
.hfb .hf-hciF-tfq .s{ font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-hciF-tfq .s small{ display:block; font:600 13px/1.28 var(--body); color:var(--hf-hand); margin-top:2px; }
.hfb .hf-hciF-tfq .ch{ display:flex; gap:3px; }
.hfb .hf-hciF-tfq .ch button{ font:800 13px/1 var(--body); width:32px; height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hciF-tfq .ch button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hciF-tfq > div.ok .s::after{ content:" ✓"; color:var(--ok); font-weight:800; }
.hfb .hf-hciF-tfq > div.no .s::after{ content:" ✗"; color:var(--hf-red); font-weight:800; }
.hfb .hf-hciF-or{ display:grid; gap:6px; }
.hfb .hf-hciF-or .slots{ display:grid; gap:4px; counter-reset:o; }
.hfb .hf-hciF-or .slots span{ min-height:32px; display:flex; align-items:center; gap:7px; border:1.5px dashed var(--faint); border-radius:7px; padding:4px 8px; font:600 13.5px/1.25 var(--body); color:var(--ink); }
.hfb .hf-hciF-or .slots span::before{ counter-increment:o; content:counter(o); flex:none; width:20px; height:20px; border-radius:50%; background:var(--hf-grey2); display:grid; place-items:center; font:800 12px/1 var(--body); }
.hfb .hf-hciF-or .slots span.f{ border-style:solid; border-color:var(--hf-line); }
.hfb .hf-hciF-or .slots span.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 11%, var(--paper)); }
.hfb .hf-hciF-or .slots span.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 9%, var(--paper)); }
.hfb .hf-hciF-meth{ border:2px solid var(--hf-k); border-radius:9px; padding:8px 10px; background:color-mix(in srgb, var(--hf-k) 6%, var(--paper)); }
.hfb .hf-hciF-meth h5{ margin:0 0 4px; font:800 14px/1.1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--hf-k); }
.hfb .hf-hciF-meth ol{ margin:0; padding-left:1.2em; }
.hfb .hf-hciF-meth li{ font-size:14px; line-height:1.32; margin:0 0 2px; color:var(--ink); }
.hfb .hf-hciF-plan{ display:grid; gap:4px; }
.hfb .hf-hciF-plan > div{ display:grid; grid-template-columns:58px 1fr; gap:8px; align-items:center; }
.hfb .hf-hciF-plan b.m{ font:800 18px/1 var(--body); color:var(--hf-k); text-align:center; border:2px solid var(--hf-k); border-radius:7px; padding:5px 0; }
.hfb .hf-hciF-plan p{ margin:0; font-size:14px; line-height:1.3; color:var(--ink); }
.hf-ar .hf-hciF-tag, .hf-ar .hf-hciF-src, .hf-ar .hf-hciF-rd .nm, .hf-ar .hf-hciF-rd .bt button, .hf-ar .hf-hciF-steps p, .hf-ar .hf-hciF-stop > span:last-child, .hf-ar .hf-hciF-card .hd, .hf-ar .hf-hciF-card .lb, .hf-ar .hf-hciF-card .tx, .hf-ar .hf-hciF-card .pp, .hf-ar .hf-hciF-legend span, .hf-ar .hf-hciF-tabs button, .hf-ar .hf-hciF-chain p, .hf-ar .hf-hciF-qs p, .hf-ar .hf-hciF-hot .nm, .hf-ar .hf-hciF-hot .m, .hf-ar .hf-hciF-kn p, .hf-ar .hf-hciF-two h5, .hf-ar .hf-hciF-two p, .hf-ar .hf-hciF-stat span, .hf-ar .hf-hciF-tf > span, .hf-ar .hf-hciF-tf > b, .hf-ar .hf-hciF-chips button, .hf-ar .hf-hciF-verd, .hf-ar .hf-hciF-bl button, .hf-ar .hf-hciF-bk, .hf-ar .hf-hciF-ln .lb, .hf-ar .hf-hciF-ln .tm, .hf-ar .hf-hciF-cnt, .hf-ar .hf-hciF-say, .hf-ar .hf-hciF-key p, .hf-ar .hf-hciF-tfq .s, .hf-ar .hf-hciF-tfq .ch button, .hf-ar .hf-hciF-or .slots span, .hf-ar .hf-hciF-meth h5, .hf-ar .hf-hciF-meth li, .hf-ar .hf-hciF-plan p{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-hciF-tfq .s small{ font-family:"Aref Ruqaa", "Caveat", cursive; font-size:15px; line-height:1.4; }
.hf-ar .hf-hciF-kn p, .hf-ar .hf-hciF-chain p, .hf-ar .hf-hciF-verd, .hf-ar .hf-hciF-say, .hf-ar .hf-hciF-card .tx, .hf-ar .hf-hciF-qs p, .hf-ar .hf-hciF-meth li, .hf-ar .hf-hciF-plan p, .hf-ar .hf-hciF-tfq .s, .hf-ar .hf-hciF-key p, .hf-ar .hf-hciF-steps p{ font-size:13.5px; line-height:1.5; }
.hf-ar .hf-hciF-two p, .hf-ar .hf-hciF-bl button{ font-size:13.5px; line-height:1.45; }
.hf-ar .hf-hciF-kn p{ border-left:0; border-right:3px solid var(--hf-k); padding:2px 9px 2px 0; }
.hf-ar .hf-hciF-chain p{ border-left:0; border-right:4px solid var(--hf-k); border-radius:6px 0 0 6px; }
.hf-ar .hf-hciF-say{ border-left:0; border-right:4px solid var(--hf-red); border-radius:7px 0 0 7px; }
.hf-ar .hf-hciF-hot .nm small{ margin-left:0; margin-right:4px; }
.hf-ar .hf-hciF-bl button, .hf-ar .hf-hciF-tf > button{ text-align:right; }
.hf-ar .hf-hciF-tf > button{ border-left:0; border-right:1px solid var(--hf-grey2); }
.hf-ar .hf-hciF-meth ol{ padding-left:0; padding-right:1.3em; }
.hf-ar .hf-hciF-bk{ line-height:2.2; font-size:14.5px; }
.hf-ar .hf-hciF-flow em{ margin-right:0; margin-left:2px; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-hciF-stop.on.pulse .hf-hciF-n, .hfb .hf-hciF-hot .tr i{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  /* ── the course: ten lectures in four groups ── */
  const GRP = [null, ['Foundations', 'الأساسيات'], ['Cognition', 'الـ cognition'], ['User research', 'الـ user research'], ['Design and prototyping', 'الـ design والـ prototyping']];
  const LEC = [
    { n: 1, g: 1, en: 'What HCI is', ar: 'يعني إيه الـ HCI', se: 'What HCI is', sa: 'الـ HCI', pp: 'F 24/25 · Mid 26/27',
      d: ['Define HCI word for word, name HMI and MMI, sort the pie into Human, Computer and Interaction, and never swap UI and UX.', 'تعرّف الـ HCI بالنص، وتقول HMI وMMI، وتوزّع الـ pie على Human وComputer وInteraction، ومتلخبطش الـ UI مع الـ UX أبداً.'] },
    { n: 2, g: 1, en: 'The design process', ar: 'الـ design process', se: 'Process', sa: 'الـ process', pp: 'F 24/25 · F 25/26 · Mid',
      d: ['List the 4 activities and the lifecycle models in order, and place research by WHEN (before, during, after) and by WHO.', 'تعدّ الـ 4 activities والـ lifecycle models بالترتيب، وتحط الـ research حسب الـ WHEN (قبل وأثناء وبعد) وحسب الـ WHO.'] },
    { n: 3, g: 2, en: 'Attention and perception', ar: 'الـ attention والـ perception', se: 'Attention, perception', sa: 'الانتباه والإدراك', pp: 'Mid 26/27',
      d: ['Name the 6 cognitive processes and the design implications, and say who found what: Tullis (spacing), Ophir, Caird, Briggs, Weller (borders).', 'تعدّ الـ 6 cognitive processes والـ design implications، وتقول مين لقى إيه: Tullis (الـ spacing) وOphir وCaird وBriggs وWeller (الـ borders).'] },
    { n: 4, g: 2, en: 'Memory, learning, language', ar: 'الـ memory والـ learning واللغة', se: 'Memory, learning', sa: 'الذاكرة والتعلّم', pp: 'Mid 26/27',
      d: ['Explain recognition over recall and Miller\'s 7 ± 2, incidental vs intentional learning, and voice UI vs speech output vs chatbots.', 'تشرح ليه الـ recognition أحسن من الـ recall وقاعدة Miller، والـ incidental قصاد الـ intentional learning، والـ voice UI والـ speech output والـ chatbots.'] },
    { n: 5, g: 3, en: 'UI vs UX, research, surveys', ar: 'الـ UI والـ UX والـ research', se: 'UI/UX, research', sa: 'الـ UX والـ research', pp: 'F 24/25 · F 25/26 · Mid',
      d: ['Keep UI and UX apart, draw the primary vs secondary table, and know qualitative vs quantitative and PII vs SPII.', 'تفصل الـ UI عن الـ UX، وترسم جدول الـ primary والـ secondary، وتعرف الـ qualitative من الـ quantitative والـ PII من الـ SPII.'] },
    { n: 6, g: 3, en: 'Good survey questions', ar: 'أسئلة الـ survey الكويسة', se: 'Surveys', sa: 'الـ surveys', pp: 'F 24/25 · F 25/26 · Mid',
      d: ['Name the six principles with an example each, and say exactly what is wrong with any survey question.', 'تعدّ الـ 6 مبادئ ومعاك مثال لكل واحد، وتقول بالظبط إيه الغلط في أي سؤال survey.'] },
    { n: 7, g: 3, en: 'Interviews', ar: 'الـ interviews', se: 'Interviews', sa: 'الـ interviews', pp: 'F 24/25 · F 25/26',
      d: ['Give the tips for a good interview, compare interviews with surveys and individuals with groups, and name the two biases.', 'تقول نصايح الـ interview الكويس، وتقارن الـ interviews بالـ surveys والأفراد بالـ groups، وتسمّي الـ 2 biases.'] },
    { n: 8, g: 4, en: 'Alternatives and prototypes', ar: 'الـ alternatives والـ prototypes', se: 'Prototypes', sa: 'الـ prototypes', pp: 'F 24/25 · F 25/26',
      d: ['State the two biggest design mistakes in the right order, and what a prototype is really for: feedback and iteration.', 'تقول أكبر غلطتين في الـ design بالترتيب الصح، والـ prototype معمول لإيه بجد: الـ feedback والـ iteration.'] },
    { n: 9, g: 4, en: 'Fidelity, wireframes, forms', ar: 'الـ fidelity والـ wireframes والـ forms', se: 'Wireframes', sa: 'الـ wireframes', pp: 'F 24/25 · F 25/26',
      d: ['Argue for lo-fi, define a wireframe with its purposes, tell handoff from handshake, and apply the form guidelines.', 'تدافع عن الـ lo-fi، وتعرّف الـ wireframe وأغراضه، وتفرّق الـ handoff من الـ handshake، وتطبّق إرشادات الـ forms.'] },
    { n: 10, g: 4, en: 'Layout and navigation', ar: 'الـ layout والـ navigation', se: 'Layout', sa: 'الـ layout', pp: 'the design question',
      d: ['Use the form, layout and navigation rules in the design question: above the fold, the logo, Close vs Cancel, error messages, red routes.', 'تستخدم إرشادات الـ forms والـ layout والـ navigation في سؤال الـ design: الـ above the fold والـ logo والـ Close والـ Cancel والـ error messages والـ red routes.'] }
  ];
  const Num = ({ n }) => { const l = LEC[n - 1]; return html`<span className=${'hf-hciF-n hf-hciF-g' + l.g}>${n}</span>`; };

  // How ready am I? One row per lecture, kept with the book's state
  const LV = [['shaky', 'مهزوز'], ['OK', 'نص نص'], ['solid', 'تمام']];
  function Ready() {
    const ar = useAr();
    const [r, setR] = H.K.useSlot('ready', {});
    return html`<div className="hf-hciF-rd hf-in" role="group" aria-label=${ar ? 'إنت جاهز قد إيه' : 'How ready am I'}>
      ${LEC.map(l => html`<div key=${l.n} className="rw"><${Num} n=${l.n} /><span className="nm">${ar ? l.ar : l.en}</span>
        <span className="bt">${[0, 1, 2].map(k => html`<button key=${k} className=${'k' + k} aria-pressed=${String(r[l.n] === k)} onClick=${() => setR(Object.assign({}, r, { [l.n]: k }))}>${LV[k][ar ? 1 : 0]}</button>`)}</span></div>`)}
    </div>`;
  }
  function ReadySum() {
    const ar = useAr();
    const [r] = H.K.useSlot('ready', {});
    const sh = LEC.filter(l => r[l.n] === 0).map(l => l.n), done = Object.keys(r).length;
    const msg = !done ? tt(ar, 'Rate every lecture. Be honest: nobody is watching.', 'قيّم كل محاضرة. خليك صريح، محدش شايفك.')
      : sh.length ? tt(ar, 'Start with the shaky ones: ' + sh.map(n => 'L' + n).join(', ') + '. Then follow the hot list.', 'ابدأ بالمهزوز: <bdi dir="ltr">' + sh.map(n => 'L' + n).join(', ') + '</bdi>. وبعدين امشي ورا الـ hot list.')
        : tt(ar, 'Nothing shaky. Go straight to the problems section and the exam corner.', 'مفيش حاجة مهزوزة. روح على طول لقسم المسائل وركن الامتحان.');
    return html`<p className="hf-hand" key=${msg}>${T(msg)}</p>`;
  }

  // The course map: ten stops on one line, in four colours; tap a stop to see what you must be able to do after it
  const POS = [[12, 0], [37, 0], [62, 0], [88, 0], [88, 1], [62, 1], [37, 1], [12, 1], [37, 2], [62, 2]];
  const ROWY = [16, 92, 168];
  function CourseMap() {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot('map', null);
    const [cur, setCur] = useState(pick == null ? 0 : pick);
    const auto = pick == null && !calm();
    useEffect(() => { if (!auto) return; const id = setInterval(() => setCur(c => (c + 1) % 10), 2600); return () => clearInterval(id); }, [auto]);
    const X = x => ar ? 100 - x : x;
    const pts = [[12, 0], [88, 0], [88, 1], [12, 1], [12, 2], [62, 2]].map(([x, r]) => X(x) + ',' + ROWY[r]).join(' ');
    const l = LEC[cur];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '8px' }}>
      <div className="hf-hciF-map">
        <svg viewBox="0 0 100 226" preserveAspectRatio="none" aria-hidden="true"><polyline points=${pts} fill="none" stroke="var(--hf-line)" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>
        ${LEC.map((s, i) => html`<button key=${s.n} className=${'hf-hciF-stop' + (i === cur ? ' on' + (auto ? ' pulse' : '') : '')} style=${{ left: X(POS[i][0]) + '%', top: (ROWY[POS[i][1]] - 15) + 'px' }} aria-pressed=${String(i === cur)} onClick=${() => { setCur(i); setPick(i); }}><${Num} n=${s.n} /><span>${ar ? s.sa : s.se}</span></button>`)}
      </div>
      <div className="hf-hciF-card" key=${cur}>
        <p className="hd"><${Num} n=${l.n} />${ar ? l.ar : l.en}</p>
        <p className="lb">${tt(ar, 'After it you must be able to', 'بعدها لازم تعرف')}</p>
        <p className="tx">${T(l.d[ar ? 1 : 0])}</p>
        <p className="pp">${tt(ar, 'Asked in: ', 'جت في: ')}<bdi dir="ltr">${l.pp === 'the design question' ? (ar ? 'design Q' : 'the design question') : l.pp}</bdi></p>
      </div>
    </div>`;
  }

  // The threads that tie the lectures together
  const THR = [
    { k: [1, 2, 5, 6, 7, 8], n: ['Users early and often', 'الـ users بدري وعلى طول'],
      t: [['<b>L1</b> user research matters: the truckers in gloves.', '<b>L2</b> user-centred design: "you need users early and often"; research by WHEN and WHO.', '<b>L5 to L7</b> the methods: surveys, good survey questions, interviews.', '<b>L8</b> prototypes exist to get feedback from users.'],
        ['في <bdi>L1</bdi> الـ user research مهم: السواقين اللي لابسين جوانتي.', 'في <bdi>L2</bdi> الـ user-centered design، يعني الـ users بدري وعلى طول، والـ research حسب الـ WHEN والـ WHO.', 'من <bdi>L5</bdi> لـ <bdi>L7</bdi> الطرق: الـ surveys وأسئلتها الكويسة والـ interviews.', 'في <bdi>L8</bdi> الـ prototype معمول عشان تاخد feedback من الـ users.']] },
    { k: [1, 2, 5], n: ['One process, three names', 'process واحدة بـ 3 أسامي'],
      t: [['The same 3 components: <b>user research → design and prototyping → evaluation (improvement)</b>.', '<b>L1</b> calls it the UI design process, <b>L2</b> the interaction design process, <b>L5</b> the UX design process.', 'Whatever the name, the order is the same. Learn it once.'],
        ['نفس الـ 3 components: <b>الـ user research ثم الـ design and prototyping ثم الـ evaluation (improvement)</b>.', 'في <bdi>L1</bdi> اسمها الـ UI design process، وفي <bdi>L2</bdi> الـ interaction design process، وفي <bdi>L5</bdi> الـ UX design process.', 'مهما كان الاسم، الترتيب واحد. احفظه مرة واحدة.']] },
    { k: [2, 8, 9], n: ['Cheap first, polish later', 'الرخيص الأول، والتلميع بعدين'],
      t: [['<b>L2</b> generating alternatives and choosing between them is key.', '<b>L8</b> as many alternatives as you can: the first Microsoft mouse had 100+ prototypes.', '<b>L9</b> lo-fi first, 5+ paper wireframes per screen, then tools like Figma, then hi-fi.'],
        ['في <bdi>L2</bdi> إنك تطلّع alternatives وتختار منهم ده الأساس.', 'في <bdi>L8</bdi> اعمل alternatives على قد ما تقدر: أول ماوس لـ Microsoft كان ليه أكتر من <bdi>100</bdi> prototype.', 'في <bdi>L9</bdi> الـ lo-fi الأول، و<bdi>5</bdi> wireframes على الورق أو أكتر لكل شاشة، وبعدين tools زي Figma، وبعدين الـ hi-fi.']] },
    { k: [3, 4, 9, 10], n: ['Why the guidelines work (our links)', 'ليه الـ guidelines بتشتغل (ربط من عندنا)'],
      t: [['<b>L3</b> spacing (Tullis) and borders (Weller) make search faster → <b>L10</b> group related fields by a frame.', '<b>L4</b> recognition beats recall → <b>L9 and L10</b> breadcrumbs, clear links, hints in fields.', 'These links are ours, not the slides\'. Use them to explain a design decision.'],
        ['في <bdi>L3</bdi> الـ spacing (Tullis) والـ borders (Weller) بيسرّعوا البحث، فـ <bdi>L10</bdi> بتقول جمّع الـ fields المرتبطة في frame.', 'في <bdi>L4</bdi> الـ recognition أسهل من الـ recall، فـ <bdi>L9</bdi> و<bdi>L10</bdi> فيهم breadcrumbs ولينكات واضحة وhints في الـ fields.', 'الربط ده من عندنا، مش من السلايدز. استخدمه وإنت بتشرح قرار في الـ design.']] }
  ];
  function Threads() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('thr', 0);
    const th = THR[k];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '8px' }}>
      <div className="hf-hciF-tabs" role="group" aria-label=${ar ? 'الخيوط' : 'Threads'} style=${{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>${THR.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${x.n[ar ? 1 : 0]}</button>`)}</div>
      <div className="hf-hciF-dots" aria-hidden="true">${LEC.map(l => html`<span key=${l.n} className=${'hf-hciF-n hf-hciF-g' + l.g + (th.k.includes(l.n) ? ' on' : '')}>${l.n}</span>`)}</div>
      <div className="hf-hciF-chain" key=${k}>${th.t[ar ? 1 : 0].map((x, j) => html`<p key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.15 + 's' }}>${T(x)}</p>`)}</div>
    </div>`;
  }

  // Anatomy of the final: the real papers' sections and marks
  const PAPERS = [
    { n: ['Final 2025/26', 'فاينل 2025/26'], meta: ['2 hours · 60 marks', 'ساعتين · 60 درجة'],
      s: [['Q1', 20, 'var(--hciF-1)', ['True or False (10) + Multiple choice (10)', 'صح وغلط (10) واختار (10)'], ['1 mark each', 'درجة لكل واحد']],
        ['Q2', 20, 'var(--hciF-3)', ['Four written questions, 5 marks each', 'أربع أسئلة مقالي، كل واحد بـ 5'], ['A compare primary vs secondary · B good survey questions with examples · C research by "When" · D types of design–development process', 'الـ A قارن الـ primary بالـ secondary · الـ B نقط أسئلة الـ survey بأمثلة · الـ C الـ research حسب الـ When · الـ D أنواع الـ design–development process']],
        ['Q3', 20, 'var(--hciF-4)', ['The design question (20)', 'سؤال الـ design (20)'], ['A mobile app for booking doctors: "think about a layout… usable and easy"', 'موبايل app لحجز الدكاترة: فكّر في layout سهل وusable']]] },
    { n: ['Final 2024/25', 'فاينل 2024/25'], meta: ['2 hours · 60 marks', 'ساعتين · 60 درجة'],
      s: [['Q1', 20, 'var(--hciF-1)', ['True or False (15) + Multiple choice (5)', 'صح وغلط (15) واختار (5)'], ['1 mark each', 'درجة لكل واحد']],
        ['Q2', 20, 'var(--hciF-3)', ['Four written questions, 5 marks each', 'أربع أسئلة مقالي، كل واحد بـ 5'], ['A primary vs secondary · B evaluate five survey questions · C tips for a good interview · D power of lo-fi', 'الـ A الـ primary والـ secondary · الـ B قيّم 5 أسئلة survey · الـ C نصايح الـ interview · الـ D قوة الـ lo-fi']],
        ['Q3', 20, 'var(--hciF-4)', ['Define (5) + design (15)', 'تعريف (5) و design (15)'], ['A define wireframes · B a mobile app for online shopping', 'الـ A عرّف الـ wireframes · الـ B موبايل app للـ online shopping']]] },
    { n: ['Midterm 2026/27', 'ميدترم 2026/27'], meta: ['online quiz · 30 marks · L1 to L6', 'كويز أونلاين · 30 درجة · من L1 لـ L6'],
      s: [['MCQ', 30, 'var(--hciF-2)', ['30 multiple-choice questions', '30 سؤال اختيار'], ['This year\'s doctors\' style: short, one idea per question', 'ستايل الدكاترة السنة دي: قصير، وفكرة واحدة في كل سؤال']]] }
  ];
  function Paper() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('paper', 0);
    const P = PAPERS[k], tot = P.s.reduce((a, x) => a + x[1], 0);
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hciF-tabs" role="group" aria-label=${ar ? 'الامتحانات' : 'Papers'}>${PAPERS.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${x.n[ar ? 1 : 0]}</button>`)}</div>
      <p className="hf-hciF-src">${P.meta[ar ? 1 : 0]}</p>
      <div className="hf-hciF-bar" dir="ltr" key=${'b' + k}>${P.s.map(x => html`<span key=${x[0]} className="hf-in" style=${{ width: (x[1] / tot * 100) + '%', background: x[2] }}>${x[0]} · ${x[1]}</span>`)}</div>
      <div className="hf-hciF-qs" key=${'q' + k}>${P.s.map(x => html`<div key=${x[0]} className="hf-in"><b className="q" style=${{ color: x[2] }}>${x[0]}</b><p>${T(x[3][ar ? 1 : 0])}<small>${T(x[4][ar ? 1 : 0])}</small></p></div>`)}</div>
    </div>`;
  }

  // the hot list, counted from the three papers (marks in each final; midterm questions)
  const HOT = [
    ['The design question', 'سؤال الـ design', 'L9–10', 15, 20, 0],
    ['Primary vs secondary research', 'الـ primary والـ secondary', 'L2, L5', 6, 8, 1],
    ['Survey questions and tips', 'أسئلة الـ survey', 'L5–6', 6, 7, 1],
    ['Interviews and scripts', 'الـ interviews والـ script', 'L5, L7', 10, 3, 0],
    ['Fidelity and prototypes', 'الـ fidelity والـ prototypes', 'L8–9', 7, 2, 0],
    ['Research by WHEN', 'الـ research حسب الـ WHEN', 'L2', 1, 6, 0],
    ['Wireframes', 'الـ wireframes', 'L9', 5, 2, 0],
    ['Qualitative vs quantitative', 'الـ qualitative والـ quantitative', 'L5', 2, 3, 0],
    ['Privacy: PII and SPII', 'الـ PII والـ SPII', 'L5', 2, 2, 0],
    ['UI vs UX', 'الـ UI قصاد الـ UX', 'L1, L5', 2, 1, 2],
    null,
    ['Handoff vs handshake', 'الـ handoff والـ handshake', 'L9', 0, 5, 0],
    ['What HCI is, its parts', 'يعني إيه HCI وأجزاؤه', 'L1', 4, 0, 9],
    ['Process, user-centred design', 'الـ process والـ UCD', 'L2', 0, 1, 8],
    null,
    ['Cognition', 'الـ cognition', 'L3–4', 0, 0, 9]
  ];
  function Hot() {
    const ar = useAr();
    let r = 0;
    return html`<div className="hf-hciF-hot hf-in">${HOT.map((h, i) => {
      if (!h) return html`<span key=${i} className="sep"></span>`;
      r++; const w = x => (x / 35 * 70) + 'px';
      return html`<div key=${i}><span className="r">${r}</span><span className="nm">${h[ar ? 1 : 0]}<small dir="ltr">${h[2]}</small></span>
        <span className="bx" dir="ltr"><span className="tr">${h[3] ? html`<i className="hf-hciF-c24" style=${{ width: w(h[3]), animationDelay: calm() ? '0s' : i * 0.05 + 's' }}></i>` : null}${h[4] ? html`<i className="hf-hciF-c25" style=${{ width: w(h[4]), animationDelay: calm() ? '0s' : i * 0.05 + 's' }}></i>` : null}</span>
          <span className="v">${h[3] + h[4]}</span>${h[5] ? html`<span className="m">${ar ? 'ميد ' : 'mid '}${h[5]}</span>` : null}</span></div>`;
    })}</div>`;
  }

  /* ── interactive worked problems ── */
  // Fill the comparison table cell by cell: each tap puts the next candidate in the cell
  function TableFill({ id, head, rows }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const right = rows.reduce((a, r, i) => a + [0, 1].filter(c => v[i + '-' + c] === r[3][c]).length, 0);
    const tap = (i, c) => { const k = i + '-' + c, cur = v[k]; setCk(false); setV(Object.assign({}, v, { [k]: cur == null ? 0 : (cur + 1) % rows[i][2].length })); };
    const show = () => { const o = {}; rows.forEach((r, i) => { o[i + '-0'] = r[3][0]; o[i + '-1'] = r[3][1]; }); setV(o); setCk(true); };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hciF-tf">
        <span>${head[0]}</span><span dir="ltr">${head[1]}</span><span dir="ltr">${head[2]}</span>
        ${rows.map((r, i) => html`<${React.Fragment} key=${i}><b>${ar ? r[1] : r[0]}</b>
          ${[0, 1].map(c => { const x = v[i + '-' + c]; const st = ck && x != null ? (x === r[3][c] ? ' ok' : ' no') : '';
            return html`<button key=${c} dir="ltr" className=${(x == null ? 'e' : '') + st} onClick=${() => tap(i, c)}>${x == null ? (ar ? 'دوس' : 'tap') : T(r[2][x])}</button>`; })}
        </${React.Fragment}>`)}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${show}>${ar ? 'اعرض الجدول' : 'Show the table'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${rows.length * 2}</bdi>` : right + ' / ' + rows.length * 2}</span>`}
      </div></div>`;
  }

  // Evaluate survey questions: pick what is wrong with each one, then see the fix
  const FLAW = [['Yes/no question', 'سؤال yes/no'], ['Leading', 'سؤال leading'], ['Loaded word', 'كلمة loaded'], ['Ambiguous scale', 'الـ scale مش واضح'],
    ['Reversed scale', 'الـ scale معكوس'], ['Changing number of options', 'عدد الـ options بيتغير'], ['Double-barrel', 'سؤال double-barrel'], ['Overlapping ranges', 'الـ ranges متداخلة']];
  function Evaluate({ id, qs, labels }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [pk, setPk] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', {});
    const Q = qs[k], mine = pk[k] || [];
    const good = s => s.length && Q.req.every(x => s.includes(x)) && s.every(x => (Q.ok || Q.req).includes(x));
    const okAt = j => { const s = pk[j] || []; return s.length && qs[j].req.every(x => s.includes(x)) && s.every(x => (qs[j].ok || qs[j].req).includes(x)); };
    const tog = f => { setCk(Object.assign({}, ck, { [k]: false })); setPk(Object.assign({}, pk, { [k]: mine.includes(f) ? mine.filter(x => x !== f) : mine.concat(f) })); };
    const done = !!ck[k];
    return html`<div className="hf-hciF-ev hf-in">
      <div className="hf-hciF-tabs" role="group" aria-label=${ar ? 'الأسئلة' : 'Questions'} dir="ltr">${qs.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${ck[j] && okAt(j) ? 'dn' : ''} onClick=${() => setK(j)}>${labels[j]}</button>`)}</div>
      <div className="hf-hciF-evq" dir="ltr" key=${'q' + k}><p>${T(Q.q)}</p></div>
      <div className="hf-hciF-chips" role="group" aria-label=${ar ? 'إيه الغلط' : 'What is wrong'}>${Q.ch.map(f => { const on = mine.includes(f);
        const st = done ? (on ? ((Q.ok || Q.req).includes(f) ? ' ok' : ' no') : (Q.req.includes(f) ? ' miss' : '')) : '';
        return html`<button key=${f} className=${st.trim()} aria-pressed=${String(on)} onClick=${() => tog(f)}>${FLAW[f][ar ? 1 : 0]}</button>`; })}</div>
      <p className="hf-hciF-verd" key=${'v' + k + done}>${done ? html`<b className="v" style=${{ color: good(mine) ? 'var(--ok)' : 'var(--hf-red)' }}>${good(mine) ? (ar ? 'صح. ' : 'Right. ') : (ar ? 'مش بالظبط. ' : 'Not quite. ')}</b>${T(Q.fix[ar ? 1 : 0])}` : T(ar ? 'اختار المشكلة (ممكن أكتر من واحدة)، وبعدين دوس صحّح.' : 'Pick the problem (there may be more than one), then press Check.')}</p>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!mine.length} onClick=${() => setCk(Object.assign({}, ck, { [k]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setPk(Object.assign({}, pk, { [k]: Q.req.slice() })); setCk(Object.assign({}, ck, { [k]: true })); }}>${ar ? 'اعرض الإجابة' : 'Show the answer'}</button>
        ${k < qs.length - 1 && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'اللي بعده ‹' : 'Next ›'}</button>`}
      </div></div>`;
  }

  // Build the written answer: tick the points that belong in it (some are traps)
  function Builder({ id, items }) {
    const ar = useAr();
    const [pk, setPk] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const nGood = items.filter(x => x[2]).length;
    const right = items.filter((x, i) => !!pk[i] === x[2]).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-hciF-bl">${items.map((x, i) => { const on = !!pk[i]; const st = ck ? (on ? (x[2] ? 'ok' : 'no') : (x[2] ? 'miss' : '')) : '';
        return html`<button key=${i} className=${st} aria-pressed=${String(on)} onClick=${() => { setCk(false); setPk(Object.assign({}, pk, { [i]: !on })); }}><span className="bx">${on ? '✓' : ''}</span><span>${T(x[ar ? 1 : 0])}</span></button>`; })}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.values(pk).some(Boolean)} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; items.forEach((x, i) => { if (x[2]) o[i] = true; }); setPk(o); setCk(true); }}>${ar ? 'اعرض الإجابة' : 'Show the answer'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${items.length}</bdi>` : right + ' / ' + items.length}</span>`}
      </div>
      ${ck && html`<p className="hf-p small hf-in">${T(ar ? 'الإجابة فيها <bdi>' + nGood + '</bdi> نقط. المشطوب فخ، والمتقطع نقطة فاتتك.' : 'The answer has ' + nGood + ' points. Crossed out = a trap; dashed = a point you missed.')}</p>`}
    </div>`;
  }

  // Fill the blanks: each tap cycles the word in a blank
  function Blanks({ id, parts }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const bl = parts.filter(p => typeof p !== 'string');
    const right = parts.reduce((a, p, i) => a + (typeof p !== 'string' && v[i] === p.a ? 1 : 0), 0);
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <p className="hf-hciF-bk">${parts.map((p, i) => typeof p === 'string' ? html`<${React.Fragment} key=${i}>${T(p)}</${React.Fragment}>`
        : html`<button key=${i} dir="ltr" className=${ck && v[i] != null ? (v[i] === p.a ? 'ok' : 'no') : ''} onClick=${() => { setCk(false); setV(Object.assign({}, v, { [i]: v[i] == null ? 0 : (v[i] + 1) % p.o.length })); }}>${v[i] == null ? '_____' : p.o[v[i]]}</button>`)}</p>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; parts.forEach((p, i) => { if (typeof p !== 'string') o[i] = p.a; }); setV(o); setCk(true); }}>${ar ? 'اعرض الإجابة' : 'Show the answer'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${bl.length}</bdi>` : right + ' / ' + bl.length}</span>`}
      </div></div>`;
  }

  // Handoff or handshake: two lanes, design and development, filling up over six time slots (our drawing of the lecture's idea)
  function Lanes() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('lanes', 0);
    const [tk, setTk] = useState(6);
    useEffect(() => { if (calm()) { setTk(6); return; } setTk(0); const id = setInterval(() => setTk(t => { if (t >= 6) { clearInterval(id); return 6; } return t + 1; }), 420); return () => clearInterval(id); }, [m]);
    const des = i => m === 0 ? i < 3 : true, dev = i => m === 0 ? i >= 3 : true;
    const mark = i => m === 0 ? (i === 3 ? '↓' : '') : (i % 2 === 1 ? '⇅' : '');
    const shown = i => i < tk;
    const n = m === 0 ? (tk > 3 ? 1 : 0) : [1, 3, 5].filter(i => i < tk).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-hciF-tabs" role="group" aria-label="Process"><button aria-pressed=${String(m === 0)} onClick=${() => setM(0)}>${ar ? 'الـ Handoff' : 'Handoff'}</button><button aria-pressed=${String(m === 1)} onClick=${() => setM(1)}>${ar ? 'الـ Handshake' : 'Handshake'}</button></div>
      <div className="hf-hciF-ln">
        <span className="lb">${ar ? 'الـ Design' : 'Design'}</span>${[0, 1, 2, 3, 4, 5].map(i => html`<span key=${'d' + i} className=${'c' + (shown(i) && des(i) ? ' d' : '')}></span>`)}
        <span></span>${[0, 1, 2, 3, 4, 5].map(i => html`<span key=${'a' + i} className="ar">${shown(i) ? mark(i) : ''}</span>`)}
        <span className="lb">${ar ? 'الـ Develop\u00ADment' : 'Develop\u00ADment'}</span>${[0, 1, 2, 3, 4, 5].map(i => html`<span key=${'v' + i} className=${'c' + (shown(i) && dev(i) ? ' v' : '')}></span>`)}
        <span></span>${[0, 1, 2, 3, 4, 5].map(i => html`<span key=${'t' + i} className="tm">${i === 0 ? (ar ? 'البداية' : 'start') : i === 5 ? (ar ? 'النهاية' : 'end') : ''}</span>`)}
      </div>
      <p className="hf-hciF-cnt">${m === 0 ? (ar ? 'نقط التسليم: ' : 'Handover points: ') : (ar ? 'نقط الـ sync: ' : 'Sync points: ')}<b>${n}</b>${m === 1 && tk >= 6 ? (ar ? ' (كتير ومتكررة)' : ' (frequent)') : ''}</p>
    </div>`;
  }

  // Worked design question (Final 2025/26 Q3A): our wireframe of the booking-doctors home screen, one decision at a time
  function Walk({ steps }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('walk', 0);
    const [all, setAll] = H.K.useSlot('walk:all', false);
    const on = i => all || k === i;
    const E = ({ i, children, style }) => html`<div className=${'el' + (on(i) ? ' on' : '')} style=${style}>${on(i) ? html`<span className="bd">${i + 1}</span>` : null}${children}</div>`;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hciF-ph" dir="ltr" aria-label="Our wireframe: booking doctors, home screen">
        <div className="rw"><${E} i=${0}><span className="logo">Logo</span></${E}><${E} i=${1} style=${{ flex: 1 }}><div className="tabs"><span className="on">Home</span><span>Doctors</span><span>Visits</span><span>Me</span></div></${E}></div>
        <div style=${{ height: '7px' }}></div>
        <${E} i=${2}><div className="srch">Search a doctor or specialty…</div></${E}>
        <div style=${{ height: '7px' }}></div>
        <${E} i=${3}><div className="ic"><span><i>H</i>Heart</span><span><i>T</i>Teeth</span><span><i>E</i>Eyes</span><span><i>K</i>Kids</span></div></${E}>
        <div style=${{ height: '7px' }}></div>
        <${E} i=${4}><div className="crd"><b>Your next visit</b><br/>Cardiology · Sun 10:00 · Clinic 3</div></${E}>
        <div className="fold"><em>the fold</em></div>
        <${E} i=${5}><div className="crd" style=${{ fontSize: '14px' }}><b>Dr. Nour</b> · Dermatology · ★ 4.8</div></${E}>
        <div style=${{ height: '6px' }}></div>
        <${E} i=${6}><div className="rw"><span className="btn p">Book now</span><span className="btn s">View profile</span></div></${E}>
      </div>
      <p className="hf-hciF-say" key=${all ? 'all' : k}>${all ? T(ar ? 'كل الـ 7 قرارات متعلّمة. في الامتحان اكتب جنب كل جزء الـ guideline بتاعه، زي ما الأرقام دي بتعمل.' : 'All 7 decisions marked. In the exam, write the guideline next to each part, just as these numbers do.') : html`<b>${k + 1}. </b>${T(steps[k][ar ? 1 : 0])}`}</p>
      <div className="hf-row">
        <button className="hf-btn" disabled=${k === 0 && !all} onClick=${() => { setAll(false); setK(Math.max(0, k - 1)); }}>${ar ? '› اللي قبله' : '‹ Back'}</button>
        <button className="hf-btn solid" disabled=${k === steps.length - 1 && !all} onClick=${() => { setAll(false); setK(Math.min(steps.length - 1, k + 1)); }}>${ar ? 'اللي بعده ‹' : 'Next ›'}</button>
        <button className="hf-btn" onClick=${() => setAll(true)}>${ar ? 'اعرض الكل' : 'Show all'}</button>
      </div></div>`;
  }

  // the booking flow screen (ours), with numbered parts for the Match exercise
  function Flow() {
    const N = ({ n }) => html`<span className="nb">${n}</span>`;
    return html`<div className="hf-hciF-ph hf-in" dir="ltr" style=${{ paddingLeft: '20px' }} aria-label="Our wireframe: booking doctors, details step">
      <div className="el" style=${{ marginBottom: '6px' }}><${N} n="1" /><div className="prg"><span className="dn">Doctor</span><span className="dn">Time</span><span className="nw">Details</span><span>Confirm</span></div></div>
      <div className="fld el"><${N} n="2" /><label>Name</label><span>Mona Adel  (saved)</span></div>
      <div style=${{ height: '5px' }}></div>
      <div className="fld el"><${N} n="3" /><label>Phone</label><span className="hint">e.g. 010 1234 5678</span></div>
      <div style=${{ height: '5px' }}></div>
      <div className="fld el"><${N} n="4" /><label>Date of birth</label><span className="err">31/02/1960</span><small>Not a real date. Use DD/MM/YYYY</small></div>
      <div style=${{ height: '7px' }}></div>
      <div className="rw el"><${N} n="5" /><span className="btn p">Confirm booking</span><span className="btn s">Back</span></div>
    </div>`;
  }

  // Spot the violations: our bad checkout for the online-shopping question (Final 2024/25 Q3B)
  const SHOPV = [true, true, true, true, false, true, true, false];
  function ShopSpot() {
    const ar = useAr();
    const [fl, setFl] = H.K.useSlot('shop', {});
    const [ck, setCk] = H.K.useSlot('shop:c', false);
    const right = SHOPV.filter((v, i) => !!fl[i] === v).length;
    const B = (i, kids, st) => html`<button className=${'el' + (fl[i] ? ' fl' : '') + (ck ? (!!fl[i] === SHOPV[i] ? ' good' : ' bad') : '')} style=${st} aria-pressed=${String(!!fl[i])} aria-label=${'Spot ' + (i + 1)} onClick=${() => { setCk(false); setFl(Object.assign({}, fl, { [i]: !fl[i] })); }}><span className="nb">${i + 1}</span>${kids}</button>`;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hciF-ph" dir="ltr" style=${{ paddingLeft: '22px', width: '250px' }} aria-label="Our bad checkout screen">
        <div className="rw" style=${{ justifyContent: 'space-between' }}><b style=${{ font: '800 13px/1 var(--body)' }}>Checkout</b>${B(0, html`<span className="logo">Logo</span>`, { width: 'auto' })}</div>
        <div style=${{ height: '6px' }}></div>
        ${B(1, html`<span style=${{ font: '600 12px/1 var(--body)', color: 'var(--hciF-1)' }}>Home › Cart › Checkout</span>`)}
        <div style=${{ height: '6px' }}></div>
        ${B(2, html`<span className="top">There were errors on this page.</span>`)}
        <div style=${{ height: '6px' }}></div>
        ${B(3, html`<div className="rw"><div className="fld" style=${{ flex: 1 }}><label>Last name</label><span>Adel</span></div><div className="fld" style=${{ flex: 1 }}><label>First name</label><span>Omar</span></div></div>`)}
        <div style=${{ height: '6px' }}></div>
        ${B(4, html`<div className="fld"><label>Card number</label><span className="hint">16 digits, no spaces</span></div>`)}
        <div style=${{ height: '7px' }}></div>
        ${B(5, html`<div className="rw" style=${{ justifyContent: 'space-between' }}><span className="lnk">pay now</span><span className="lnk">continue shopping</span></div>`)}
        <div className="fold"><em>the fold</em></div>
        ${B(6, html`<div className="crd"><b>Order total: 1,240 EGP</b></div>`)}
        <div style=${{ height: '6px' }}></div>
        ${B(7, html`<div className="rw" style=${{ justifyContent: 'flex-end' }}><span className="btn p">Place order</span><span className="btn s">Cancel</span></div>`)}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.values(fl).some(Boolean)} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check my flags'}</button>
        <button className="hf-btn" onClick=${() => { const f = {}; SHOPV.forEach((v, i) => { if (v) f[i] = true; }); setFl(f); setCk(true); }}>${ar ? 'اعرض الإجابة' : 'Show the answer'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / 8</bdi>` : right + ' / 8'}</span>`}
      </div></div>`;
  }
  const SHOPK = [
    ['The logo sits top-right here. <b>Logo in the same place on every page</b>, and it links home (L10).', 'الـ logo هنا فوق على اليمين. <b>الـ logo في نفس المكان في كل صفحة</b>، وبيودّي على الـ Home <bdi>(L10)</bdi>.'],
    ['Checkout is a fixed path: use a <b>progress bar</b> (Cart → Shipping → Payment → Confirm). Breadcrumbs are for multiple choices (L9).', 'الـ checkout طريق ثابت، فاستخدم <b>progress bar</b>. الـ breadcrumbs للأماكن اللي فيها اختيارات كتير <bdi>(L9)</bdi>.'],
    ['One vague message at the top. <b>Errors sit next to the field</b>, with a red border; say what went wrong and what to do (L9, L10).', 'رسالة واحدة مبهمة فوق. <b>الـ error جنب الـ field</b> بـ border أحمر، وقول إيه اللي حصل وتعمل إيه <bdi>(L9, L10)</bdi>.'],
    ['Last before First. <b>Related items are logically ordered</b>: First, then Last (L10).', 'الـ Last قبل الـ First. <b>العناصر المرتبطة مترتبة منطقياً</b>: الـ First وبعدين الـ Last <bdi>(L10)</bdi>.'],
    ['Fine: the field shows the <b>required format</b> (L9).', 'سليم: الـ field بيوضّح <b>الـ format المطلوب</b> <bdi>(L9)</bdi>.'],
    ['"pay now" is a plain link. <b>Important commands are buttons</b>, and the primary CTA must stand out (L9, L10).', 'الـ "pay now" لينك عادي. <b>الأوامر المهمة تبقى buttons</b>، والـ primary CTA لازم يبان <bdi>(L9, L10)</bdi>.'],
    ['The total is below the fold. <b>The most important information is above the fold</b> (L10).', 'الإجمالي تحت الـ fold. <b>أهم معلومة تبقى above the fold</b> <bdi>(L10)</bdi>.'],
    ['Fine: an action button plus a dismiss button, so the dismiss one says <b>Cancel</b>, on the right, not eye-catching (L10).', 'سليم: action button وزرار قفل، فزرار القفل اسمه <b>Cancel</b>، على اليمين ومش لافت <bdi>(L10)</bdi>.']
  ];
  function ShopKey() {
    const ar = useAr();
    const [ck, setCk] = H.K.useSlot('shop:c', false);
    const [, setFl] = H.K.useSlot('shop', {});
    if (!ck) return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}><p className="hf-p small">${ar ? 'علّم الأماكن في الصفحة اللي فاتت ودوس صحّح، أو:' : 'Flag the spots on the last page and press Check, or:'}</p>
      <div><button className="hf-btn" onClick=${() => { const f = {}; SHOPV.forEach((v, i) => { if (v) f[i] = true; }); setFl(f); setCk(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button></div></div>`;
    return html`<div className="hf-hciF-key hf-in">${SHOPK.map((x, i) => html`<p key=${i}><i style=${{ background: SHOPV[i] ? 'var(--hf-red)' : 'var(--ok)' }}>${i + 1}</i><span>${T(x[ar ? 1 : 0])}</span></p>`)}</div>`;
  }

  // True or false, fast: tap T or F for each statement, then check
  function TFq({ id, items }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const right = items.filter((x, i) => v[i] === x[2]).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-hciF-tfq">${items.map((x, i) => html`<div key=${i} className=${ck && v[i] != null ? (v[i] === x[2] ? 'ok' : 'no') : ''}>
        <span className="s">${T(x[ar ? 1 : 0])}${ck ? html`<small>${T(x[ar ? 4 : 3])}</small>` : null}</span>
        <span className="ch">${[true, false].map(b => html`<button key=${String(b)} aria-pressed=${String(v[i] === b)} onClick=${() => { setCk(false); setV(Object.assign({}, v, { [i]: b })); }}>${b ? (ar ? 'ص' : 'T') : (ar ? 'غ' : 'F')}</button>`)}</span></div>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; items.forEach((x, i) => { o[i] = x[2]; }); setV(o); setCk(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${items.length}</bdi>` : right + ' / ' + items.length}</span>`}
      </div></div>`;
  }

  // Put the steps in order: tap the pieces in the order they come
  function Order({ id, steps, mix }) {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot(id, []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const left = mix.filter(i => !seq.includes(i));
    const right = seq.filter((x, i) => x === i).length;
    return html`<div className="hf-hciF-or hf-in">
      <div className="slots">${steps.map((s, i) => { const x = seq[i]; return html`<span key=${i} className=${(x != null ? 'f' : '') + (ck && x != null ? (x === i ? ' ok' : ' no') : '')}>${x != null ? T(steps[x][ar ? 1 : 0]) : ''}</span>`; })}</div>
      <div className="hf-hciF-chips">${left.map(i => html`<button key=${i} onClick=${() => { setCk(false); setSeq(seq.concat(i)); }}>${T(steps[i][ar ? 1 : 0])}</button>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${seq.length < steps.length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(steps.map((_, i) => i)); setCk(true); }}>${ar ? 'اعرض الترتيب' : 'Show the order'}</button>
        <button className="hf-btn" disabled=${!seq.length} onClick=${() => { setSeq([]); setCk(false); }}>${ar ? 'امسح' : 'Clear'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${steps.length}</bdi>` : right + ' / ' + steps.length}</span>`}
      </div></div>`;
  }

  // small renderers for dense pages
  const Kn = ({ items }) => html`<div className="hf-hciF-kn hf-in">${items.map((x, i) => html`<p key=${i} className=${x[0] === '~' ? 'ly' : ''}>${T(x[0] === '~' ? x.slice(1) : x)}</p>`)}</div>`;
  const Two = ({ a, b }) => html`<div className="hf-hciF-two hf-in"><div><h5>${T(a[0])}</h5><p>${T(a[1])}</p></div><div><h5>${T(b[0])}</h5><p>${T(b[1])}</p></div></div>`;
  const Flw = ({ name, steps }) => html`<div className="hf-hciF-flow hf-in" dir="ltr">${name ? html`<em>${name}</em>` : null}${steps.map((s, i) => html`<${React.Fragment} key=${i}>${i ? html`<i>→</i>` : null}<b>${s}</b></${React.Fragment}>`)}</div>`;
  const Stat = ({ items }) => html`<div className="hf-hciF-stat hf-in">${items.map((x, i) => html`<div key=${i}><b dir="ltr">${x[0]}</b><span>${T(x[1])}</span></div>`)}</div>`;
  const Meth = ({ title, items }) => html`<div className="hf-hciF-meth hf-in"><h5>${title}</h5><ol>${items.map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ol></div>`;

  H.chapters.hci.final = {
    title: 'Know Your Users, Know Your Exam', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'اعرف الـ users بتوعك، واعرف امتحانك', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' questions from any lecture (quiz items with src), with the site's Arabic whys; matched on the question and its options
      const AQ = n => (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[n] && window.AR.hci.lectures[n].quiz) || [];
      const txt = x => (String(x.q) + ' || ' + x.o.map(o => o[0]).join(' | ')).replace(/<[^>]+>/g, '');
      const find = (re, prof) => { for (const l of kit.course.lectures) { const i = l.quiz.findIndex(x => (prof ? !!x.src : !x.src) && re.test(txt(x))); if (i >= 0) return { q: l.quiz[i], why: AQ(l.n)[i] }; } return {}; };
      const mq = (id, re) => { const r = find(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const Tag = ({ children, red }) => html`<span className=${'hf-hciF-tag hf-in' + (red ? ' red' : '')}>${children}</span>`;
      const LT = ({ n }) => html`<${Tag}>${t('Lecture ' + n, 'محاضرة ' + n)}${n >= 7 ? t(" · last year's slides", ' · slides السنة اللي فاتت') : ''}</${Tag}>`;
      const sec = n => t('L' + n + ' · ' + LEC[n - 1].en, 'محاضرة ' + n + ' · ' + LEC[n - 1].ar);
      return [
        // 0 · how to use this book
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تستخدم الكتاب ده')}</${H2}>
          <div className="hf-hciF-steps hf-in">
            <p><b>1</b><span>${X('<b>How ready am I?</b> One tap per lecture below.', '<b>أنا جاهز قد إيه؟</b> دوسة لكل محاضرة تحت.')}</span></p>
            <p><b>2</b><span>${X('<b>Map and hot list</b>: what the finals ask.', '<b>الخريطة والـ hot list</b>: الفاينل بيسأل في إيه.')}</span></p>
            <p><b>3</b><span>${X('<b>Lecture by lecture</b>, shaky ones first.', '<b>محاضرة محاضرة</b>، المهزوز الأول.')}</span></p>
            <p><b>4</b><span>${X('<b>Problems</b> with a pen, then the exam corner.', '<b>المسائل</b> بالقلم، وبعدين ركن الامتحان.')}</span></p>
          </div>
          <${Ready} />
          <${ReadySum} />
        `, { sec: t('How to use this book', 'إزاي تستخدم الكتاب') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">★</span><span className="t">${A ? html`المراجعة النهائية<br/>Human Computer Interaction` : html`Final revision<br/>Human Computer Interaction`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Know Your Users. Know Your Exam.', 'اعرف الـ users بتوعك. واعرف امتحانك.')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('ten lectures, built around what the final asks', 'عشر محاضرات، متبنية على اللي الفاينل بيسأله')}</p></div>
          <${Talk} who="bug">${X("Two finals, 120 marks, and I hid in the same places both years: a swapped UI and UX, <i>tactical research after design</i>, and a design question nobody planned.", 'فاينلين، و<bdi>120</bdi> درجة، وأنا استخبيت في نفس الأماكن السنتين: الـ UI والـ UX متبدلين، والـ <i>tactical research بعد الـ design</i>، وسؤال design محدش حضّر له.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Then we hunt you the HCI way: evidence first. Every page here comes from the notes and the real papers.', 'يبقى هنصطادك بطريقة الـ HCI: الدليل الأول. كل صفحة هنا من النوتس ومن الامتحانات الحقيقية.')}</${Talk}>
          <${P} small=${true}>${X("Lectures 7 to 10 come from last year's slides (the notes say so). Both past finals ask them, so they are here in full.", 'المحاضرات من <bdi>7</bdi> لـ <bdi>10</bdi> من slides السنة اللي فاتت (النوتس قايلة كده). والفاينلين اللي فاتوا سألوا فيها، فهي هنا كاملة.')}</${P}>
        `, { sec: t('Opener', 'البداية') }),

        // 2 · the course map
        page(html`
          <${H2}>${t('The big picture: one line, ten stops', 'الصورة الكبيرة: خط واحد و10 محطات')}</${H2}>
          <div className="hf-hciF-legend hf-in">${[1, 2, 3, 4].map(g => html`<span key=${g}><i className=${'hf-hciF-g' + g}></i>${GRP[g][A ? 1 : 0]}</span>`)}</div>
          <${CourseMap} />
          <${Hand} arrow="up">${t('tap a stop: what you must be able to do after it', 'دوس على محطة: تعرف تعمل إيه بعدها')}</${Hand}>
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // 3 · threads
        page(html`
          <${H2}>${t('How the ideas connect', 'الأفكار مربوطة ببعض إزاي')}</${H2}>
          <${P} small=${true}>${X('Four threads run through the course. Pick one and see which lectures light up.', 'فيه 4 خيوط ماشيين في الكورس كله. اختار واحد وشوف أنهي محاضرات بتنوّر.')}</${P}>
          <${Threads} />
          <${Grow} />
          <${Talk} who="lens">${X('In a written answer, one link to another lecture shows you understood it, not just memorised it. (Our advice.)', 'في السؤال المقالي، ربطة واحدة بمحاضرة تانية بتبيّن إنك فاهم، مش حافظ وبس. (نصيحة من عندنا.)')}</${Talk}>
        `),

        // 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الفاينل')}</${H2}>
          <${P} small=${true}>${X('Both past finals have the same shape: 2 hours, 60 marks, three questions of 20. Tap a paper.', 'الفاينلين اللي فاتوا ليهم نفس الشكل: ساعتين، و<bdi>60</bdi> درجة، و<bdi>3</bdi> أسئلة كل واحد <bdi>20</bdi>. دوس على امتحان.')}</${P}>
          <${Paper} />
        `, { sec: t('Anatomy of the final', 'تشريح الفاينل') }),

        // 4b · what repeats
        page(html`
          <${H2}>${t('What came up both times', 'اللي جه المرتين')}</${H2}>
          <${Box} kind="exam" title=${t('In both finals', 'جت في الفاينلين')}>
            <${UL} items=${A ? [
              'صح وغلط: الـ tactical research بعد الـ design (غلط)، والـ hi-fi أسرع وأرخص (غلط)، والـ individual interviews أسهل في التنسيق (صح)، والـ UX هو الشكل (غلط)، والـ qualitative رقمي (غلط).',
              'مقالي: الـ primary قصاد الـ secondary research، وسؤال عن الـ survey.',
              'السؤال التالت: design لموبايل app، بـ <bdi>15</bdi> أو <bdi>20</bdi> درجة.'
            ] : [
              'T/F: tactical research after design (False), hi-fi faster and cheaper (False), individual interviews easier to coordinate (True), UX = look and feel (False), qualitative = numeric (False).',
              'Written: primary vs secondary research, and one survey question.',
              'Q3: a mobile-app design question, 15 or 20 marks.'
            ]} />
          </${Box}>
          <${Grow} />
          <${Talk} who="lens">${X('Same shape twice, so plan for it: the problems section of this book follows these exact questions.', 'نفس الشكل مرتين، فخطط عليه: قسم المسائل في الكتاب ده ماشي على نفس الأسئلة دي بالظبط.')}</${Talk}>
        `),

        // 5 · hot list
        page(html`
          <${H2}>${t('The hot list', 'الـ hot list')}</${H2}>
          <${P} small=${true}>${X('Counted by us from the three papers: the bar is marks in each final, "mid" is midterm questions. Ranked by how many finals asked it, then by marks.', 'إحنا عدّيناها من الـ <bdi>3</bdi> امتحانات: الـ bar هو الدرجات في كل فاينل، والـ "ميد" عدد أسئلة الميدترم. مترتبة حسب كام فاينل سأل فيها، وبعدين حسب الدرجات.')}</${P}>
          <div className="hf-hciF-legend hf-in"><span><i className="hf-hciF-c24" style=${{ borderRadius: '2px' }}></i>${t('Final 2024/25', 'فاينل 2024/25')}</span><span><i className="hf-hciF-c25" style=${{ borderRadius: '2px' }}></i>${t('Final 2025/26', 'فاينل 2025/26')}</span></div>
          <${Hot} />
          <${Grow} />
          <${Hand} red=${true}>${t('Q3 alone is a third of the paper. Never leave it for the last ten minutes.', 'السؤال التالت لوحده تلت الامتحان. أوعى تسيبه لآخر عشر دقايق.')}</${Hand}>
        `),

        /* ── Lecture 1 ── */
        // 6 · must know
        page(html`
          <${LT} n=${1} />
          <${H2}>${t('What HCI is: you must know', 'يعني إيه HCI: لازم تعرف')}</${H2}>
          <${Def}>${X('<b>HCI</b>: the interaction between user and computer, OR the relationship between users and computer systems. A multidisciplinary field; it now covers almost all forms of information technology design.', 'الـ <b>HCI</b> هو التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems. مجال multidisciplinary، ودلوقتي بيغطي تقريباً كل أشكال الـ information technology design.')}</${Def}>
          <${Kn} items=${A ? [
            'بيتقال عليه كمان <b>HMI</b> و<b>MMI</b>، وبيتعامل مع الـ <b>design والـ implementation والـ evaluation</b> للـ interactive systems.',
            'بيدرس <bdi>3</bdi> حاجات: <b>البني آدمين</b> (احتياجاتهم وقدراتهم وحدودهم)، والـ <b>computer technologies</b>، و<b>طرق الـ users وتفضيلاتهم وصعوباتهم</b>.',
            'الـ <b>interaction design</b> هو الـ umbrella term، وأهدافه <b>usable products</b> (سهل تتعلمه، وeffective، وممتع) وإننا <b>نشرك الـ users</b>.'
          ] : [
            'Also called <b>HMI</b> and <b>MMI</b>. It deals with the <b>design, implementation and evaluation</b> of interactive systems.',
            'It studies 3 things: <b>humans</b> (needs, abilities, limitations), <b>computer technologies</b>, and users\' <b>ways, preferences and difficulties</b>.',
            '<b>Interaction design</b> is the umbrella term. Goals: <b>usable products</b> (easy to learn, effective, enjoyable) and <b>involving users</b>.'
          ]} />
        `, { sec: sec(1) }),

        // 6b · must know (2)
        page(html`
          <${H2}>${t('UI, UX and the process', 'الـ UI والـ UX والـ process')}</${H2}>
          <${Kn} items=${A ? [
            'الـ <b>UI</b> هو الـ interactivity والشكل. والـ <b>UX</b> التجربة الكاملة، وبيحدد الـ interactions. والـ <b>HCI</b> بيفهم الـ interactions.',
            'الـ <b>invisible interface</b>: الـ user يفكر في الـ task مش في الأداة، زي حكم الماتش اللي محدش بياخد باله منه.',
            'الـ <b>UI design process</b>: الـ user research ثم الـ design and prototyping ثم الـ evaluation. والـ software development نفسه research.',
            '~قصة الـ Office: الـ <b>bloatware</b>، والـ adaptive menus خلّت الـ scanning ياخد ضعف الوقت. والقاعدة إن الـ auto-customization لو مش perfect غالباً أوحش من مفيش.'
          ] : [
            '<b>UI</b> = interactivity, look and feel. <b>UX</b> = the overall experience; it dictates the interactions. <b>HCI</b> = understanding the interactions.',
            '<b>Invisible interface</b>: the user thinks about the task, not the tool; like a referee, a good interface goes unnoticed.',
            '<b>UI design process</b>: user research → design and prototyping → evaluation. Software development is research too.',
            '~Office: <b>bloatware</b>; adaptive menus made scanning twice as long. "Auto-customization, unless it does a perfect job, is usually worse than no customization at all."'
          ]} />
        `),

        // 7 · figure
        page(html`
          <${H2}>${t('The pie: which slice?', 'الـ pie: أنهي حتة؟')}</${H2}>
          <${Fig} name="hci-parts" />
        `),

        // 8 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Two swaps the finals love: "UI covers the overall experience" and "UX is look and feel" are both <b>False</b> (2024/25, 2025/26). And <b>communication theory</b> is in the <b>Human</b> slice: Interaction holds only interaction design (Midterm 2026/27).', 'بدلتين الفاينل بيحبهم: إن الـ UI هو التجربة الكاملة، وإن الـ UX هو الشكل، الاتنين <b>غلط</b> <bdi dir="ltr">(2024/25, 2025/26)</bdi>. والـ <b>communication theory</b> في حتة الـ <b>Human</b>، والـ Interaction فيها الـ interaction design بس <bdi dir="ltr">(Midterm 2026/27)</bdi>.')}</p></${Box}>
          <${H3}>${t('Quick check: slice the pie', 'quick check: قسّم الـ pie')}</${H3}>
          <${Sort} id="s1" bins=${[['H', 'Human'], ['C', 'Computer'], ['I', 'Interaction']]} items=${[
            [t('Communication theory', 'الـ Communication theory'), 0], [t('Operating system', 'الـ Operating system'), 1], [t('Interaction design', 'الـ Interaction design'), 2],
            [t('Cognitive psychology', 'الـ Cognitive psychology'), 0], [t('Computer graphic', 'الـ Computer graphic'), 1], [t('Human factors', 'الـ Human factors'), 0], [t('Programming language', 'الـ Programming language'), 1]]} />
        `),

        // 9 · the cases, one line each
        page(html`
          <${H2}>${t('The cases, one line each', 'الأمثلة، كل واحد في سطر')}</${H2}>
          <${Kn} items=${A ? [
            'الأسانسير: الـ labels والزراير في الصف التحتاني شكلهم واحد. والـ vending machine: تدوس زرار قبل ما تحط الفلوس، عكس المتعارف عليه.',
            'الـ marble answering machine <bdi dir="ltr">(Bishop, 1995)</bdi> زي الحاجات اليومية وبخطوة واحدة. وريموت الـ TiVo على شكل فول سوداني وزراير ملونة مختلفة.',
            'السواقين (Qualcomm): إيديهم كبيرة ولابسين جوانتي، فالحل touch screen كبيرة وstylus. يعني الـ user research مهم.',
            'الـ ICDL: الـ visual search كان <bdi>71%</bdi> من البحث. وموكابات المكتبة: الـ user research شبه مش موجود.',
            'الـ Human Factors من الـ interdisciplinary fields، والـ Psychology / Cognitive Science هي الـ discipline اللي بتدرس التفكير.'
          ] : [
            'Elevator: bottom-row labels and buttons look the same. Vending machine: push a button before inserting the bill, against the convention.',
            'Marble answering machine (Bishop, 1995): like everyday objects, one-step actions. TiVo remote: peanut shaped, colour-coded, distinctive buttons.',
            'Truckers (Qualcomm): big hands, gloves, so a large touch screen and a stylus. User research is important.',
            'ICDL: the visual search was 71% of searches. The library mock-ups: user research almost absent.',
            'Human Factors (HF) is an interdisciplinary field; Psychology / Cognitive Science is the discipline about thinking.'
          ]} />
          ${mq('m1a', /UI Design covers a user's overall/)}
        `),

        /* ── Lecture 2 ── */
        // 10 · must know
        page(html`
          <${LT} n=${2} />
          <${H2}>${t('The process: you must know', 'الـ process: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ interaction design <b>process</b>: تكتشف الـ requirements، وتصمم، وتعمل prototypes، وتقيّمها، ومركز على الـ users وأهدافهم. و<b>إنك تطلّع alternatives وتختار منهم ده الأساس</b>.',
            'الـ <b><bdi>4</bdi> basic activities</b>: الـ discovering requirements، والـ designing alternatives، والـ prototyping، والـ evaluating طول الوقت. والـ lifecycle بيدخل من الـ requirements، والـ evaluating بس اللي بيطلع للـ final product.',
            'الـ <b>user-centered design</b>: احتياجات الـ user في كل خطوة، بدل ما نصمم على functional specification.'
          ] : [
            'Interaction design is a <b>process</b>: discover requirements, design, prototype, evaluate; focused on users and their goals. <b>Generating alternatives and choosing between them is key.</b>',
            'The <b>4 basic activities</b>: discovering requirements, designing alternatives, prototyping alternative designs, evaluating throughout. The lifecycle enters at requirements; only evaluating leads out to the final product.',
            '<b>User-centred design</b>: the user\'s needs at every step (we used to design to a functional specification).'
          ]} />
          <${Flw} name="Double diamond" steps=${['Discover', 'Define', 'Develop', 'Deliver']} />
          <${Flw} name="Google Design Sprint" steps=${['Unpack', 'Sketch', 'Decide', 'Prototype', 'Test', '↺']} />
        `, { sec: sec(2) }),

        // 11 · figure
        page(html`
          <${H2}>${t('Walk the two diamonds', 'امشي في الـ 2 diamonds')}</${H2}>
          <${Fig} name="double-diamond" />
        `),

        // 12 · research types, alternatives, trap
        page(html`
          <${H2}>${t('Research by WHEN and WHO, and alternatives', 'الـ research حسب الـ WHEN والـ WHO، والـ alternatives')}</${H2}>
          <${Two} a=${[t('By WHEN', 'حسب الـ WHEN'), t('<b>Foundational</b>: before design, what to build.<br><b>Tactical</b>: during design, feedback on prototypes.<br><b>Post-launch</b>: did we succeed?', 'الـ <b>Foundational</b>: قبل الـ design، نبني إيه.<br>الـ <b>Tactical</b>: أثناء الـ design، feedback على الـ prototypes.<br>الـ <b>Post-launch</b>: نجحنا ولا لأ؟')]}
            b=${[t('By WHO', 'حسب الـ WHO'), t('<b>Primary</b>: you conduct it (interviews, focus groups, surveys, usability studies, observation).<br><b>Secondary</b>: someone else (books, journals); early facts, saves time.', 'الـ <b>Primary</b>: إنت اللي بتعمله (interviews وfocus groups وsurveys وusability studies وobservation).<br>الـ <b>Secondary</b>: حد تاني عمله (كتب وjournals)، بيوفر وقت.')]} />
          <${Kn} items=${A ? [
            'الـ users مش واضحين: فيه <bdi>382</bdi> نوع user للـ smartphone apps <bdi dir="ltr">(Sha Zhao et al., 2016)</bdi>، والـ stakeholders أكتر من الـ users المباشرين، والـ users نادراً بيعرفوا إيه الممكن.'
          ] : [
            'Users are not obvious: 382 types of smartphone app users (Sha Zhao et al., 2016); stakeholders are more than direct users; users rarely know what is possible.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Tactical research takes place after the design phase" (both finals): the lecture says <b>False</b>, it is <b>during</b> design. The 2024/25 key marks it True. Answer from the lecture.', 'جملة إن الـ tactical research بيحصل بعد الـ design (في الفاينلين): المحاضرة بتقول <b>غلط</b>، ده <b>أثناء</b> الـ design. ونموذج <bdi>2024/25</bdi> معلّمها صح. جاوب من المحاضرة.')}</p></${Box}>
        `),

        // 12b · more models and alternatives
        page(html`
          <${H2}>${t('Two more models, and alternatives', 'موديلين كمان، والـ alternatives')}</${H2}>
          <${Flw} name="Joyner" steps=${['Need finding', 'Design alternatives', 'Prototyping', 'Evaluation']} />
          <${Flw} name="Google UCD" steps=${['Understand', 'Specify', 'Design', 'Evaluate']} />
          <${Kn} items=${A ? [
            '~مفيش خطوة "user research" لوحدها عند Joyner وGoogle، لأنه جوه كل phase: الـ users بدري وعلى طول.',
            'الـ alternatives بتيجي من الـ flair and creativity، والـ cross-fertilization، والـ users، والإلهام من products شبهها أو مختلفة. وبتختار حسب سلوك ظاهر ويتقاس، والـ technical feasibility، والتقييم بـ prototypes مش documents، والـ quality thresholds.'
          ] : [
            '~No separate "user research" step in Joyner and Google: it is in every phase ("you need users early and often").',
            'Alternatives come from flair and creativity, cross-fertilization, users, and inspiration (similar or different products). Choose by visible, measurable behaviour, technical feasibility, evaluation with prototypes (not documents), and quality thresholds.'
          ]} />
        `),

        // 13 · quick check: the sprint
        page(html`
          <${H2}>${t('Quick check: run the sprint', 'quick check: شغّل الـ sprint')}</${H2}>
          <${P} small=${true}>${X('Tap the Google Design Sprint steps in order (Knapp et al., 2016).', 'دوس على خطوات الـ Google Design Sprint بالترتيب <bdi dir="ltr">(Knapp et al., 2016)</bdi>.')}</${P}>
          <${Order} id="o2" steps=${[['Unpack', 'Unpack'], ['Sketch', 'Sketch'], ['Decide', 'Decide'], ['Prototype', 'Prototype'], ['Test', 'Test']]} mix=${[3, 0, 4, 1, 2]} />
          <${Hand}>${X('Midterm 2026/27: <b>Decide</b> = select the best idea; <b>Test</b> = get feedback from users; the goal = develop and test solutions quickly. ‡ The slides only list the steps; these meanings come from Knapp et al., and the doctors confirmed them.', 'في الميدترم: الـ <b>Decide</b> تختار أحسن فكرة، والـ <b>Test</b> تاخد feedback من الـ users، والهدف تطوّر وتجرّب حلول بسرعة. ‡ السلايدز بتعدّ الخطوات بس، والمعاني دي من Knapp، والدكاترة أكدوها.')}</${Hand}>
        `),

        /* ── Lecture 3 ── */
        // 14 · must know
        page(html`
          <${LT} n=${3} />
          <${H2}>${t('Attention and perception: you must know', 'الـ attention والـ perception: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ cognition: تفكير وتذكّر وتعلّم وقرارات وقراية... وتقسيمة أعلى: <b>fast قصاد slow</b> thinking <bdi dir="ltr">(Kahneman, 2011)</bdi>.',
            'الـ <b><bdi>6</bdi> cognitive processes</b>: الـ attention، والـ perception، والـ memory، والـ learning، والقراية والكلام والسمع، والـ problem-solving والـ planning والـ reasoning والـ decision-making.',
            'الـ <b>attention</b>: تركّز على المعلومة المهمة للي بتعمله، بالسمع و/أو النظر، وفيه <b>focused</b> و<b>divided</b>. والـ implications: المعلومة تبان وقت ما تلزم، بالـ color والـ ordering والـ spacing وغيرهم، ومن غير زحمة، وتسهّل الرجوع للـ interface.'
          ] : [
            'Cognition: thinking, remembering, learning, deciding, reading… A higher-level split: <b>fast vs slow</b> thinking (Kahneman, 2011).',
            'The <b>6 cognitive processes</b>: attention · perception · memory · learning · reading, speaking and listening · problem-solving, planning, reasoning and decision-making.',
            '<b>Attention</b>: focus on what is relevant to what we are doing; audio and/or visual; <b>focused</b> and <b>divided</b>. Implications: make information salient when needed (colour, ordering, spacing, underlining, sequencing, animation), avoid clutter, support switching and returning.'
          ]} />
        `, { sec: sec(3) }),

        // 14b · numbers and perception
        page(html`
          <${H2}>${t('Attention in numbers, and perception', 'الـ attention بالأرقام، والـ perception')}</${H2}>
          <${Stat} items=${[['5.5 s', t('Tullis: bunched-up screen', 'Tullis: الشاشة المزحومة')], ['3.2 s', t('grouped in columns; same density, it is spacing', 'متقسمة أعمدة، نفس الكثافة، والسبب الـ spacing')], ['No!', t('phone while driving, hands-free too', 'الموبايل وإنت سايق، حتى الـ hands-free')]]} />
          <${Kn} items=${A ? [
            'الـ Ophir: اللي بيعملوا multitasking كتير بيتشتتوا أكتر. والـ Caird: الـ reaction أبطأ وإنت بتكلم في التليفون. والـ Briggs: رد أبطأ على المفاجآت.',
            'الـ <b>perception</b>: إزاي المعلومة بتتاخد من العالم وتتحول لتجربة. والـ Weller لقى إن الـ <b>borders</b> أحسن من الـ color contrast. والأصفر على أسود أو أزرق تمام، وعلى أخضر أو أبيض لأ.'
          ] : [
            'Ophir (2009): heavy multitaskers are more distracted. Caird (2018): longer reaction times on the phone. Briggs (2018): slower to unexpected events.',
            '<b>Perception</b>: how information is acquired and turned into experiences. Weller (2004): <b>borders</b> beat colour contrast. Yellow on black or blue: fine; on green or white: a no-no.'
          ]} />
        `),

        // 15 · figure
        page(html`
          <${H2}>${t("Tullis's two screens", 'شاشتين Tullis')}</${H2}>
          <${Fig} name="hotel-search" />
        `),

        // 16 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"Recognizing a familiar face" was answered <b>Perception</b> (Midterm 2026/27), although L4 uses a face as a memory example: memory was not an option. Hands-free phones are <b>not</b> safer.', 'سؤال "Recognizing a familiar face" إجابته كانت <b>Perception</b> في الميدترم، مع إن <bdi>L4</bdi> بتستخدم الوش مثال للـ memory، بس الـ memory مكانتش في الاختيارات. والـ hands-free <b>مش</b> أأمن.')}</p></${Box}>
          <${H3}>${t('Quick check: who found what?', 'quick check: مين لقى إيه؟')}</${H3}>
          <${Match} id="mt3" left=${['Tullis (1987)', 'Ophir et al. (2009)', 'Caird et al. (2018)', 'Briggs et al. (2018)', 'Weller (2004)']}
            right=${A ? ['رد أبطأ على الأحداث المفاجئة', 'الـ borders أحسن من الـ color contrast', 'الـ spacing: <bdi dir="ltr">5.5 s vs 3.2 s</bdi> بنفس الكثافة', 'الـ reaction أطول وإنت بتكلم في التليفون', 'اللي بيعملوا multitasking كتير بيتشتتوا أسرع']
              : ['Slower response to unexpected events', 'Borders beat colour contrast', 'Spacing: 5.5 s vs 3.2 s at the same density', 'Longer reaction times when talking on the phone', 'Heavy multitaskers are more easily distracted']}
            answer=${[2, 4, 3, 0, 1]} />
        `),

        /* ── Lecture 4 ── */
        // 17 · must know
        page(html`
          <${LT} n=${4} />
          <${H2}>${t('Memory, learning, language: you must know', 'الـ memory والـ learning واللغة: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ <b>memory</b>: تفتكر معرفة عشان تتصرف صح (وش، اسم). الأول <b>encode وبعدين retrieve</b>، وبنفلتر اللي بناخد بالنا منه، والـ <b>context</b> مهم (الجار في القطر)، و<b>الـ recognition أسهل بكتير من الـ recall</b>.',
            'الحاجات البصرية (لون، مكان، علامة) سهلة، والحاجات العشوائية (أعياد ميلاد، أرقام تليفونات) صعبة.',
            'الـ <b>Miller</b> <bdi dir="ltr">(1956)</bdi>: الـ immediate memory حوالي <b><bdi dir="ltr">7 ± 2</bdi></b> (من <bdi>5</bdi> لـ <bdi>9</bdi>). والـ slide بتسأل هل ده ينفع للـ menus والـ icons والـ tabs، ومن غير إجابة.',
            'الـ implications: قلّل الـ cognitive load، و<b>recognition بدل recall</b>، وطرق labeling (folders وcategories وألوان وflags وtime stamps).'
          ] : [
            '<b>Memory</b>: recalling knowledge to act appropriately (a face, a name). <b>Encode, then retrieve</b>; we filter what we attend to; <b>context</b> matters (the neighbour on the train); we <b>recognize much better than we recall</b>.',
            'Visual cues (colour, location, marks) are easy to remember; arbitrary material (birthdays, phone numbers) is hard.',
            '<b>Miller (1956)</b>: immediate memory holds <b>7 ± 2</b> (5 to 9 items). The slide asks whether that should limit menus, icons, bullets, items or tabs, and gives no answer.',
            'Implications: reduce cognitive load (short procedures); <b>recognition rather than recall</b>; labels: folders, categories, colour, flags, time stamps.'
          ]} />
        `, { sec: sec(4) }),

        // 17b · learning and language
        page(html`
          <${H2}>${t('Learning, language, reflection', 'الـ learning واللغة والـ reflection')}</${H2}>
          <${Kn} items=${A ? [
            'الـ <b>learning</b>: الـ incidental (الوشوش، يومك) والـ intentional (امتحان، طبخ)، والـ intentional أصعب بكتير. والناس بتحب تتعلم بالتجربة. والـ implications: شجّع الـ exploration، ووجّه المتعلم، واربط المفاهيم.',
            'الـ listening أقل مجهود، والـ reading أسرع. والـ <b>voice UI</b> زي Siri، والـ <b>speech output</b> زي الـ text-to-speech، والـ <b>natural-language</b> زي الـ chatbots. وخلّي الـ speech menus قصيرة، واسمح بتكبير الخط.',
            'الـ <b>reflective cognition</b>: الـ problem-solving والـ planning والـ reasoning والـ decision-making، يعني تفكر في الاختيارات وعواقبها.'
          ] : [
            '<b>Learning</b>: incidental (faces, your day) vs intentional (an exam, cooking); intentional is much harder. People prefer learning by doing. Implications: encourage exploration; constrain and guide; link concepts and representations.',
            'Listening = less effort; reading = quicker. <b>Voice UI</b> (Siri, Alexa), <b>speech output</b> (text-to-speech), <b>natural-language</b> (chatbots). Short speech menus, stressed intonation, large text.',
            '<b>Reflective cognition</b>: problem-solving, planning, reasoning, decision-making: thinking about options and consequences.'
          ]} />
        `),

        // 18 · figure
        page(html`
          <${H2}>${t("Miller's 7 ± 2", 'قاعدة Miller')}</${H2}>
          <${Fig} name="seven-plus-minus" />
        `),

        // 19 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"Which follows the slide\'s recommendation?" → <b>7 tabs on a website</b> (Midterm 2026/27; 15, 20 and 12 are all above 9). In a written answer say both: the limit is 7 ± 2, and the slide only asks whether it applies.', 'سؤال "Which follows the slide\'s recommendation?" إجابته <b>7 tabs on a website</b> في الميدترم (والـ <bdi>15</bdi> والـ <bdi>20</bdi> والـ <bdi>12</bdi> كلهم فوق <bdi>9</bdi>). وفي المقالي قول الاتنين: الحد <bdi dir="ltr">7 ± 2</bdi>، والـ slide بتسأل بس هل ينفع يتطبق.')}</p></${Box}>
          <${H3}>${t('Quick check: which kind of language system?', 'quick check: أنهي نوع من أنظمة اللغة؟')}</${H3}>
          <${Sort} id="s4" bins=${[['V', 'Voice UI'], ['S', 'Speech output'], ['N', 'Natural-language']]} items=${[
            [t('Siri', 'الـ Siri'), 0], [t('A text-to-speech reader for the visually impaired', 'قارئ text-to-speech لضعاف النظر'), 1], [t('A chatbot you type questions into', 'chatbot بتكتب له أسئلة'), 2],
            [t('Alexa', 'الـ Alexa'), 0], [t('Artificially generated speech reading a page aloud', 'صوت صناعي بيقرا صفحة بصوت عالي'), 1], [t('You type a question, it answers in text', 'بتكتب سؤال وبيرد عليك بكلام مكتوب'), 2]]} />
        `),

        /* ── Lecture 5 ── */
        // 20 · UI vs UX
        page(html`
          <${LT} n=${5} />
          <${H2}>${t('UI vs UX: you must know', 'الـ UI والـ UX: لازم تعرف')}</${H2}>
          <${Two} a=${[t('UI design', 'الـ UI design'), t('Interactivity, look and feel of a screen or page.<br>Wheel: colour scheme, typography, layout, images, forms, buttons, content.<br>Skills: visual design, colour theory, typography, layout, design systems.', 'الـ interactivity والشكل بتاع الشاشة أو الصفحة.<br>الـ wheel: الألوان والـ typography والـ layout والصور والـ forms والزراير والمحتوى.<br>الـ skills: visual design وcolor theory وtypography وlayout.')]}
            b=${[t('UX design', 'الـ UX design'), t('The user\'s overall experience.<br>Wheel: useful, satisfiable, convenient, credible, accessible, desirable, valuable.<br>Skills: user research, problem-solving, information architecture, flows, wireframing, usability testing.', 'التجربة الكاملة للـ user.<br>الـ wheel: useful وsatisfiable وconvenient وcredible وaccessible وdesirable وvaluable.<br>الـ skills: user research وproblem-solving وinformation architecture وflows وwireframing.')]} />
          <${Kn} items=${A ? [
            'تطبيق البيتزا: الـ UI هو الصور والألوان وشكل الزراير ومكان الكلام، والـ UX إنك تلاقي وتعدّل وتدفع وتتابع من غير لخبطة.',
            'لو حلو بس الـ navigation ملخبط يبقى UI كويس وUX وحش. وأحسن products بتجمع الاتنين، والـ Figma بيستخدموه الاتنين.'
          ] : [
            'Pizza app: UI = photos, colours, button shapes, where text sits; UX = find, customise, pay, track without confusion.',
            'Beautiful but confusing = good UI, poor UX. The best products combine both; Figma serves both.'
          ]} />
        `, { sec: sec(5) }),

        // 21 · research and surveys
        page(html`
          <${H2}>${t('User research and surveys: you must know', 'الـ user research والـ surveys: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ <b>UX design process</b>: الـ user research ثم الـ design and prototyping ثم الـ UI evaluation (improvement). والـ user research بيتعلم عن الـ users (skills وتشتيت واحتياجات خاصة) ومهامهم وأبحاث قبل كده.',
            'الـ <b>surveys</b>: ردود سريعة من users كتير (broad view)، غالباً online، و<b>من أرخص الطرق</b>. وممكن تيجي قبل أو بعد الـ interviews. والنصايح: خليه صغير على قد ما تقدر، واسأل أقل عدد، وخلّي بالك من الـ bias، وخد feedback من المشاركين.',
            '~الـ <b>quantitative</b> رقمي (مقاييس وأعداد) وأسهل للمهندسين، والـ <b>qualitative</b> عن ليه وإزاي، وغالباً من الـ interviews.',
            '~الـ <b>PII</b>: الاسم والعنوان والإيميل والتليفون. والـ <b>SPII</b>: الـ SSN والرخصة والباسبور وأرقام الحسابات وتاريخ الميلاد. اجمع اللي محتاجه بس، ومتربطوش بالـ PII، وامسحه لما تخلص.',
            '~خطط بدري (script للـ interview، بس الـ script مش كتاب مقدس)، واستخدم كذا طريقة بترتيب، واختبر وكرر، واحمي الـ privacy.'
          ] : [
            '<b>UX design process</b>: user research → design and prototyping → UI evaluation (improvement). Research learns the users (skills, distractions, special needs), their tasks, and earlier research.',
            '<b>Surveys</b>: quick answers from many users (broad view), often online, <b>one of the cheapest</b> methods; before or after interviews. Tips: keep it small, ask the minimum, beware of bias, get participants\' feedback.',
            '~<b>Quantitative</b>: numeric (measures, counts), easier for engineers. <b>Qualitative</b>: why and how, often interviews.',
            '~<b>PII</b>: names, home address, email, phone. <b>SPII</b>: SSN, driver\'s licence, passport, financial account numbers, date of birth. Collect only what you need, don\'t link it to PII/SPII, delete it when done.',
            '~Plan ahead (an interview script; "the script is not a bible"), combine methods in a relevant order, test and iterate, protect privacy.'
          ]} />
          <${Hand}>${t("dashed bar = last year's slides; both finals still ask them", "الخط المتقطع = slides السنة اللي فاتت، والفاينلين سألوا فيها")}</${Hand}>
        `),

        // 22 · figure
        page(html`
          <${H2}>${t('Primary or secondary?', 'الـ Primary ولا الـ secondary؟')}</${H2}>
          <${Fig} name="hc-primary-secondary" />
        `),

        // 23 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"Survey is more expensive than interview" → <b>False</b> (2024/25). "A well-designed survey should take a long time" → <b>False</b> (2025/26). "Qualitative research involves data of numeric nature" → <b>False</b> (both finals).', 'إن الـ survey أغلى من الـ interview <b>غلط</b> <bdi dir="ltr">(2024/25)</bdi>. وإن الـ survey الكويس ياخد وقت طويل <b>غلط</b> <bdi dir="ltr">(2025/26)</bdi>. وإن الـ qualitative research رقمي <b>غلط</b> (في الفاينلين).')}</p></${Box}>
          <${H3}>${t('Quick check: PII or SPII?', 'quick check: الـ PII ولا الـ SPII؟')}</${H3}>
          <${Sort} id="s5" bins=${[['P', 'PII'], ['S', 'SPII']]} items=${[
            [t('Home address', 'العنوان'), 0], [t('Passport number', 'رقم الباسبور'), 1], [t('Email address', 'الإيميل'), 0],
            [t('Financial account number', 'رقم الحساب في البنك'), 1], [t('Date of birth', 'تاريخ الميلاد'), 1], [t('Phone number', 'رقم التليفون'), 0]]} />
        `),

        /* ── Lecture 6 ── */
        // 24 · six principles
        page(html`
          <${LT} n=${6} />
          <${H2}>${t('Six principles: you must know', 'الـ 6 مبادئ: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ <b>Be Clear</b>: حط labels للـ scale، ومن غير ranges متداخلة، وتفاصيل زيادة لو شاكك، وإطار زمني للتكرار ("in the past seven days").',
            'الـ <b>Be Concise</b>: لغة بسيطة ("How clean was the car?").',
            'الـ <b>Be Specific</b>: مفيش super-big ideas، ولا double-barrel (الـ speed <i>و</i> الـ availability)، ولا internal conflict (قسّم الأكل لحرارة وشكل وطعم).',
            'الـ <b>Be Expressive</b>: رأي الـ user ("too high, too low, or about right?")، وranges بدل <bdi dir="ltr">yes/no</bdi>، ومستويات، وأكتر من اختيار (checkboxes).',
            'الـ <b>Be Unbiased</b>: زوّد "Other: ____"، وسيب السؤال المفتوح مفتوح، ومفيش leading ولا loaded words (الـ wasted تبقى spent).',
            'الـ <b>Be Usable</b>: progress bar، وصفحات طولها ثابت، وترتيب منطقي، وتنبيه للي متجاوبش، وpreview بنفسك.'
          ] : [
            '<b>Be Clear</b>: label numeric scales; no overlapping ranges (0-2, 3-5, 6-10, 11-19, 20+); extra detail when in doubt; timebox frequency ("in the past seven days").',
            '<b>Be Concise</b>: plain language ("How clean was the car?").',
            '<b>Be Specific</b>: no super-big ideas; no double-barrel (speed <i>and</i> availability); no internal conflict (split food into temperature, appearance, flavour).',
            '<b>Be Expressive</b>: the user\'s opinion ("too high, too low, or about right?"); ranges, not yes/no; levels of frequency or agreement; multiple selections.',
            '<b>Be Unbiased</b>: add "Other: ____"; leave open questions open; no leading questions; no loaded words ("wasted" → "spent").',
            '<b>Be Usable</b>: progress bar, consistent page lengths, logical order, alert unanswered questions, preview it yourself.'
          ]} />
          <${Hand}>${X('Our trick: Clear, Concise, Specific fix the <b>question</b>; Expressive, Unbiased fix the <b>answers</b>; Usable fixes the <b>whole survey</b>.', 'حيلة من عندنا: الـ Clear والـ Concise والـ Specific بيصلحوا <b>السؤال</b>، والـ Expressive والـ Unbiased بيصلحوا <b>الإجابات</b>، والـ Usable بيصلح <b>الـ survey كله</b>.')}</${Hand}>
        `, { sec: sec(6) }),

        // 25 · figure
        page(html`
          <${H2}>${t("Don't ask this, ask this instead", 'متسألش كده، اسأل كده')}</${H2}>
          <${Fig} name="hc-six-principles" />
        `),

        // 26 · trap
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"Be biased is an important point for a good survey" (Final 2024/25): the lecture says <b>False</b>, the principle is <b>Be Unbiased</b>. The key marks True, most likely a typo for "Be unbiased". Write False and name the principle.', 'جملة إن الـ "Be biased" نقطة مهمة <bdi dir="ltr">(Final 2024/25)</bdi>: المحاضرة بتقول <b>غلط</b>، المبدأ اسمه <b>Be Unbiased</b>. والنموذج معلّمها صح، وغالباً غلطة مطبعية. اكتب غلط وسمّي المبدأ.')}</p></${Box}>
          ${mq('m6a', /"Be biased" is an important point/)}
          <${Grow} />
          <${Talk} who="bug">${X('I love a survey that asks "how much time have you <i>wasted</i>…". One loaded word and the answers are mine.', 'أنا بموت في الـ survey اللي بيسأل "قد إيه <i>ضيّعت</i> وقت…". كلمة loaded واحدة والإجابات بقت بتاعتي.')}</${Talk}>
          <${P} small=${true}>${X('‡ The slide\'s own timebox fix offers 5-7 and 7 or more, which overlap at 7; it meant 5-6.', '‡ الـ slide نفسها في مثال الـ timebox كاتبة <bdi dir="ltr">5-7</bdi> و<bdi dir="ltr">7 or more</bdi>، وبيتداخلوا عند الـ <bdi>7</bdi>، والمقصود <bdi dir="ltr">5-6</bdi>.')}</${P}>
        `),

        /* ── Lecture 7 ── */
        // 27 · must know
        page(html`
          <${LT} n=${7} />
          <${H2}>${t('Interviews: you must know', 'الـ interviews: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ interview هو <b>أشهر research technique</b> (صح في <bdi dir="ltr">Final 2024/25</bdi>).',
            'فهم أعمق: أسئلة مفتوحة و"ليه" (Joyner والـ <bdi>6</bdi> Ws: who وwhat وwhere وwhen وwhy وhow)، وأسئلة follow-up، والأحداث النادرة. بس <b>عدد users أقل بكتير</b> من الـ survey.',
            '<b>أغلى</b> لسببين: <b>synchronous</b> (وقت مع كل واحد) و<b>incentives</b> (الناس مستنية مقابل). والـ surveys والـ interviews ممكن ورا بعض بأي ترتيب.',
            'الـ <b>نصايح</b>: خطط وحضّر الأسئلة قبلها، وجواها <b>اسمع كويس</b> (الـ user يتكلم أغلب الوقت) و<b>اكتب notes</b> (واحد يسأل وواحد يكتب، والتسجيل مش كفاية، واكتب المشاعر)، وسيب وقت بين الـ interviews.',
            'التحديات: التخطيط بياخد وقت، وتحليل الـ qualitative صعب، والـ <b>recall bias</b> (ذاكرة غلط عن اللي فات) والـ <b>reporting bias</b> (إجابات أحسن من الحقيقة). والحل تخلطه بالـ observation والـ usability studies والـ secondary research.',
            'أقدر أصمم؟ الـ Klemmer: الـ interfaces الكويسة سهلة بالـ methods الأساسية، والموهبة ميزة مش شرط.'
          ] : [
            'The interview is <b>the most common research technique</b> (True in Final 2024/25).',
            'Deeper understanding: open-ended and "why" questions (Joyner\'s 6 Ws), follow-ups, rare events. But <b>far fewer users</b> than a survey.',
            '<b>More expensive</b>, for two reasons: <b>synchronous</b> (time with each interviewee) and <b>incentives</b> (compensation). Surveys and interviews can follow each other in either order.',
            '<b>Tips</b>: plan ahead and prepare questions; during it <b>listen well</b> (the user talks most) and <b>take notes</b> (one asks, one writes; audio is not enough; note emotions and reactions); leave time between interviews.',
            'Challenges: planning takes time; qualitative analysis is hard; <b>recall bias</b> (bad memory of the past) and <b>reporting bias</b> (answers more ideal than reality). Fix: combine with observation, usability studies, secondary research.',
            'Can I design? Klemmer: pretty good UIs are easy with basic methods; talent is an advantage, not a requirement.'
          ]} />
        `, { sec: sec(7) }),

        // 28 · figure
        page(html`
          <${H2}>${t('Individuals or groups', 'أفراد ولا groups')}</${H2}>
          <${Fig} name="hc-indiv-group" />
        `),

        // 29 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('MCQ (Final 2024/25) "Tips for good interview": Listen well / <i>don\'t</i> leave some time between interviews / Take notes / <b>a & c</b>. And "Plan ahead and prepare your questions before……": the lecture says <b>Interview</b>; the 2024/25 key marks Survey.', 'سؤال الاختيار <bdi dir="ltr">(Final 2024/25)</bdi> عن نصايح الـ interview إجابته <b dir="ltr">a & c</b>، لأن الاختيار التاني عكس النصيحة. وسؤال "Plan ahead and prepare your questions before……" المحاضرة بتقول <b>Interview</b>، والنموذج معلّم Survey.')}</p></${Box}>
          <${H3}>${t('Quick check: individuals or groups?', 'quick check: أفراد ولا groups؟')}</${H3}>
          <${Sort} id="s7" bins=${[['I', t('Individuals', 'أفراد')], ['G', t('Groups', 'groups')]]} items=${[
            [t('Easier to coordinate the logistics', 'أسهل في تنسيق الـ logistics'), 0], [t('Easier to get more feedback', 'أسهل تاخد feedback أكتر'), 1], [t('More privacy for participants', 'privacy أكتر للمشاركين'), 0],
            [t("Participants' discussion can highlight assumptions", 'نقاش المشاركين بيكشف الـ assumptions'), 1], [t('"Presentation of self" issues', 'مشاكل الـ "presentation of self"'), 1],
            [t('More time and effort with each participant', 'وقت ومجهود أكتر مع كل مشارك'), 0], [t('Confounding personalities to deal with', 'شخصيات صعبة تتعامل معاها'), 1]]} />
        `),

        /* ── Lecture 8 ── */
        // 30 · must know
        page(html`
          <${LT} n=${8} />
          <${H2}>${t('Alternatives and prototypes: you must know', 'الـ alternatives والـ prototypes: لازم تعرف')}</${H2}>
          <${Two} a=${[t('The biggest mistake', 'أكبر غلطة'), t('Jumping straight to designing an interface <b>without understanding the users or the task</b>.', 'إنك تنط على تصميم الـ interface <b>من غير ما تفهم الـ users أو الـ task</b>.')]}
            b=${[t('The second biggest', 'الغلطة التانية'), t('Settling on a single design idea, or a single genre of ideas, <b>too early</b>.', 'إنك تستقر على فكرة design واحدة، أو نوع أفكار واحد، <b>بدري أوي</b>.')]} />
          <${Kn} items=${A ? [
            'الـ design alternatives phase لوحدها في دورة Joyner. وسّع، ولو بتطوّر system موجود <b>ابعد عن الحلول الموجودة</b> وإنت بتعمل brainstorming. والـ design النهائي غالباً <b>خليط</b> من الـ alternatives.',
            'كام alternative؟ <b>على قد ما تقدر</b>: أول ماوس لـ Microsoft كان ليه <b>أكتر من <bdi>100</bdi></b> prototype.',
            'الـ prototype <b>مش</b> مجرد نسخة سريعة أو صغيرة: هو approximation سريع عشان تاخد feedback بسرعة. والـ Klemmer: الـ prototypes أسئلة، اسأل كتير.',
            'الـ prototype الكويس بيجيب feedback مفيد وiteration، و<b>مش لازم يشبه</b> المنتج النهائي. واللي مبيعلّمكش جديد بيضيّع الـ process.'
          ] : [
            'Design alternatives is its own phase in Joyner\'s cycle. Go wide; when improving an existing system, <b>distance yourself from existing solutions</b> while brainstorming. The final design is often a <b>combination</b> of alternatives.',
            'How many? <b>As many as you can</b>: the first Microsoft mouse had <b>more than 100</b> prototypes.',
            'A prototype is <b>not</b> just a quick or small version: "rapidly creating an approximation of a design so that you can quickly get feedback." Klemmer: "prototypes are questions, ask a lot of them."',
            'A good prototype enables useful, constructive feedback and iteration; it <b>need not resemble</b> the final product. One that teaches nothing new wastes the process.'
          ]} />
        `, { sec: sec(8) }),

        // 31 · figure
        page(html`
          <${H2}>${t('Two mistakes, and what to do instead', 'غلطتين، والصح تعمل إيه')}</${H2}>
          <${Fig} name="hc-design-mistakes" />
        `),

        // 32 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Don\'t swap the mistakes: "the biggest mistake is settling on one idea too early" is <b>False</b>: that is the second one. The mouse had <b>more than</b> 100 prototypes, not exactly 100.', 'متبدلش الغلطتين: إن أكبر غلطة هي إنك تستقر على فكرة بدري <b>غلط</b>، دي التانية. والماوس كان ليه <b>أكتر من</b> <bdi>100</bdi> prototype.')}</p></${Box}>
          <${H3}>${t('Quick check: true or false?', 'quick check: صح ولا غلط؟')}</${H3}>
          <${TFq} id="tf8" items=${[
            ['The final design is usually a combination of alternatives explored earlier.', 'الـ design النهائي غالباً خليط من alternatives اتجربت قبل كده.', true, 'L8: often a combination.', 'المحاضرة: غالباً خليط.'],
            ['Good prototypes closely resemble the final product.', 'الـ prototypes الكويسة لازم تشبه المنتج النهائي جداً.', false, 'They need not: it is about feedback.', 'مش لازم، الموضوع عن الـ feedback.'],
            ['During brainstorming, stay close to the existing interface.', 'وإنت بتعمل brainstorming خليك قريب من الـ interface الموجود.', false, 'Distance yourself from existing solutions.', 'ابعد عن الحلول الموجودة.']]} />
        `),

        /* ── Lecture 9 ── */
        // 33 · fidelity, brainstorming, handoff
        page(html`
          <${LT} n=${9} />
          <${H2}>${t('Fidelity, brainstorming, handoff: you must know', 'الـ fidelity والـ brainstorming والـ handoff: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'الـ prototypes بتكلم الـ stakeholders، وليها <bdi>4</bdi> جماهير: <b>الزملا والـ clients والـ users وإنت نفسك</b>.',
            'الـ <b>fidelity</b>: الـ design قريب قد إيه من شكل المنتج النهائي. ابدأ <b>lo-fi</b>، واطلع لـ <b>hi-fi</b> مع الوقت.',
            '<b>قوة الـ lo-fi</b>: أسرع وأسهل وأرخص، والـ hi-fi مش ممكن في الأول (التفاصيل لسه متقررتش)، والناس بتتكلم أكتر عن sketch، والـ Konstan: الشكل اللي باين إن مجهوده قليل بيجيب feedback بنّاء أكتر، والتفاصيل الكتير بتنزّل الـ feedback لمستوى أقل، والـ Google: أفكار عامة بدري والتفاصيل بعدين.',
            'الـ <b>brainstorming</b> عند Joyner يبدأ <b>فردي</b>، لأن الـ groups بتتلم على فكرة بدري. اكتب أفكار كتير، كل واحدة كلمتين، هدفك <bdi>20</bdi>، ومتحكمش على حاجة، وخد breaks، وجلسة الفريق للإضافة مش للتضييق.',
            'الـ <b>handoff</b>: الـ design يخلص وبعدين يتسلم للـ development، ورا بعض. والـ <b>handshake</b>: الاتنين بالتوازي ومعاهم sync points كتير.'
          ] : [
            'Prototypes communicate with stakeholders; 4 audiences: <b>colleagues, clients, users and yourself</b>.',
            '<b>Fidelity</b>: how closely a design matches the look and feel of the final product. Start <b>lo-fi</b>, move to <b>hi-fi</b> as the design proceeds.',
            '<b>Power of lo-fi</b>: faster, easier, cheaper; hi-fi impossible early (details undecided); people talk more about a sketch; Konstan: a little-effort look gets more constructive feedback; too much detail drops feedback to a lower level; Google: high-level ideas early, details later.',
            '<b>Brainstorming</b> (Joyner): start <b>individually</b>, since groups coalesce on ideas too early. Many ideas, a few words each, aim for <b>20</b>, judge nothing, take breaks; team sessions add, they don\'t narrow.',
            '<b>Handoff</b>: design finishes, then goes to development (sequential). <b>Handshake</b>: both in parallel, with frequent sync points.'
          ]} />
        `, { sec: sec(9) }),

        // 34 · wireframes and forms
        page(html`
          <${H2}>${t('Wireframes and forms: you must know', 'الـ wireframes والـ forms: لازم تعرف')}</${H2}>
          <${Def}>${X('<b>Wireframe</b>: a schematic for the basic outline of a screen, built from lines and basic shapes with some text, intentionally <b>without colours or font styles</b>. A skeleton with placeholders. Not art: it organises and communicates information.', 'الـ <b>wireframe</b>: schematic للـ outline الأساسي بتاع الشاشة، معمول من خطوط وأشكال بسيطة وشوية كلام، و<b>من غير ألوان ولا font styles</b> عن قصد. هيكل فيه placeholders. مش فن: بينظّم المعلومة ويوصّلها.')}</${Def}>
          <${Kn} items=${A ? [
            'أغراضه: الهيكل قبل الألوان، والفريق كله فاهم بدري، والـ feedback في المستوى الصح، وتلقط العناصر المنسية بدري. وبيتعمل بعد الـ foundational research لما يبقى فيه site map.',
            'الـ standards: الكلام خطوط، والصور مستطيل عليه X، والـ CTAs مستطيلات أو دواير، وannotation كويسة. والـ process: ورقة وقلم، و<b><bdi>5</bdi> نسخ على الأقل لكل شاشة</b>، وكرر بالـ feedback، وبعدين Figma أو Balsamiq أو Sketch.',
            'الـ <b>forms</b>: الأوامر المهمة buttons، والـ breadcrumbs للاختيارات الكتير والـ progress bar للطريق الثابت، وconfirmation page، والـ error جنب الـ field بـ border أحمر، وhints وformats، وشيل الحاجات المتكررة، وفرّق بين الـ primary والـ secondary CTA.'
          ] : [
            'Purposes: structure before colours; the team on the same page early; feedback at the right level; catch forgotten elements early. Made after foundational research, once there is an initial site map.',
            'Standards: text as lines, images as boxes with an X, CTAs as rectangles or circles, proper annotation. Process: pen and paper, <b>at least 5 versions per screen</b>, iterate with feedback, then Figma, Adobe XD, Sketch, Balsamiq, Pencil.',
            '<b>Forms</b>: important commands are buttons (not all); breadcrumbs for multiple choices, a progress bar for a fixed path; a confirmation page; errors next to the field (red border); hints and formats; remove repetitive actions; primary vs secondary CTA ("Go Pro" over "Free Trial").'
          ]} />
        `),

        // 35 · figure
        page(html`
          <${H2}>${t('Same screen, two fidelities', 'نفس الشاشة بـ fidelity مختلفة')}</${H2}>
          <${Fig} name="hc-fidelity" />
        `),

        // 36 · trap and a doctors' question
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"High fidelity prototypes are faster, easier and cheaper to generate than low fidelity" → <b>False</b> in both finals: it is reversed. "Only one wireframe version before digital tools" → <b>False</b>: sketch at least 5 per screen.', 'جملة إن الـ hi-fi أسرع وأسهل وأرخص من الـ lo-fi <b>غلط</b> في الفاينلين، هي معكوسة. وإن نسخة wireframe واحدة كفاية قبل الـ tools <b>غلط</b>، ارسم <bdi>5</bdi> على الأقل لكل شاشة.')}</p></${Box}>
          ${mq('m9a', /primary purpose of a wireframe\?[\s\S]*outline the structure/)}
        `),

        /* ── Lecture 10 ── */
        // 37 · must know
        page(html`
          <${LT} n=${10} />
          <${H2}>${t('Forms, layout, navigation: you must know', 'الـ forms والـ layout والـ navigation: لازم تعرف')}</${H2}>
          <${Kn} items=${A ? [
            'استخدم <b>palette بسيطة من <bdi>3</bdi> ألوان</b> (أكتر من <bdi>3</bdi> ألوان أساسية بيلخبط). والـ alerts شكلها واحد في الموقع كله: نفس اللون والستايل والمكان.',
            'الـ <b>Close والـ Cancel</b>: زرار واحد يبقى "Close". ولو فيه action button وزرار قفل يبقى "Cancel"، وغالباً على اليمين ومش لافت.',
            'الـ <b>error message</b> بالترتيب: المشكلة في العنوان، وبعدين ليه حصلت باختصار، وبعدين لينك يكمّل أو يرجع، وبعدين تعمل إيه بعد كده. والـ <b>system notice</b>: الـ Action وRemind me later وDon\'t show again، ومش طويلة ولا عامة.',
            'الـ <b>layout</b>: أهم معلومة above the fold، والحاجات المرتبطة في frame أو separator أو بلون، وبترتيب منطقي (First/Middle/Last)، والـ logo في نفس المكان في كل صفحة، والخلفية بسيطة.',
            'الـ <b>navigation</b>: CTA واضح للخطوة الجاية، وواضح إنت فين (breadcrumbs)، ولينكات الـ Home والأقسام في كل صفحة، والـ tabs فوق، وتغيير واضح مع الـ hover، والـ logo بيودّي للـ Home، وارسم الـ <b>red routes</b>، يعني الصفحات اللي الناس بتستخدمها أكتر حاجة.'
          ] : [
            'A simple <b>3-colour palette</b> (more than 3 primary colours confuses). Alerts look the same across the site: colour, style, placement.',
            '<b>Close vs Cancel</b>: one button → "Close". An action button plus a dismiss button → "Cancel", usually on the right, not eye-catching.',
            '<b>Error message</b>, in order: the problem in the title → briefly why → a link to finish or go back → what to do next. <b>System notice</b>: an Action button, "Remind me later", "Don\'t show again"; not lengthy or generic.',
            '<b>Layout</b>: the most important information above the fold; related info grouped by a frame, separator or colour, in logical order (First/Middle/Last); the logo in the same place on every page; a simple background.',
            '<b>Navigation</b>: a clear CTA for the next step; clear where users are (breadcrumbs); Home and category links on every page; tabs at the top; an obvious hover change; the logo links home; map the <b>red routes</b>, the pages or actions customers use most.'
          ]} />
        `, { sec: sec(10) }),

        // 38 · figure
        page(html`
          <${H2}>${t('Label the dismiss button', 'سمّي زرار القفل')}</${H2}>
          <${Fig} name="hc-close-cancel" />
        `),

        // 39 · trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The logo has <b>two</b> rules in two groups: the same place on every page (layout) and it links to the homepage (navigation). A lone button says "Close"; "Cancel" needs an action button beside it.', 'الـ logo ليه <b>قاعدتين</b> في مجموعتين: نفس المكان في كل صفحة (layout)، وبيودّي للـ homepage (navigation). والزرار الوحيد اسمه "Close"، والـ "Cancel" لازم جنبه action button.')}</p></${Box}>
          <${H3}>${t('Quick check: build an error message', 'quick check: ابني error message')}</${H3}>
          <${Order} id="o10" steps=${[['State the problem in the title', 'قول المشكلة في العنوان'], ['Say briefly why it happened', 'قول باختصار ليه حصلت'], ['Link to finish the task or go back', 'لينك يكمّل الـ task أو يرجع'], ['Recommend the next action', 'انصح بالخطوة الجاية']]} mix=${[2, 0, 3, 1]} />
          <${Hand}>${X('Example (ours): "Payment failed" → "Your card has expired" → back to the cart → "Use another card".', 'مثال من عندنا: <bdi dir="ltr">"Payment failed" → "Your card has expired" → back to cart → "Use another card"</bdi>.')}</${Hand}>
        `),

        /* ── The problems that always come up ── */
        // 40 · the list
        page(html`
          <${H2}>${t('The problems that always come up', 'المسائل اللي بتيجي على طول')}</${H2}>
          <${P} small=${true}>${X('No numbers to crunch in HCI: the problems are the written questions, all of them from both finals. Our rule: 5 marks ≈ 5 correct points.', 'مفيش أرقام تتحسب في الـ HCI: المسائل هي الأسئلة المقالي، وكلها من الفاينلين. قاعدتنا: <bdi>5</bdi> درجات يعني حوالي <bdi>5</bdi> نقط صح.')}</${P}>
          <div className="hf-hciF-plan hf-in">${(A ? [
            ['5', 'الـ primary قصاد الـ secondary research', '<bdi dir="ltr">F 24/25 Q2A · F 25/26 Q2A</bdi>'],
            ['5', 'أسئلة الـ survey: قيّمها، أو نقطها بأمثلة', '<bdi dir="ltr">F 24/25 Q2B · F 25/26 Q2B</bdi>'],
            ['5', 'الـ user research حسب الـ "When"', '<bdi dir="ltr">F 25/26 Q2C</bdi>'],
            ['5', 'أنواع الـ process بين الـ design والـ development', '<bdi dir="ltr">F 25/26 Q2D</bdi>'],
            ['5', 'نصايح الـ interview الكويس', '<bdi dir="ltr">F 24/25 Q2C</bdi>'],
            ['5', 'قوة الـ low-fidelity prototype', '<bdi dir="ltr">F 24/25 Q2D</bdi>'],
            ['5', 'عرّف الـ wireframes', '<bdi dir="ltr">F 24/25 Q3A</bdi>'],
            ['20', 'سؤال الـ design (موبايل app)', '<bdi dir="ltr">F 24/25 Q3B (15) · F 25/26 Q3A (20)</bdi>']
          ] : [
            ['5', 'Primary vs secondary research', 'F 24/25 Q2A · F 25/26 Q2A'],
            ['5', 'Survey questions: evaluate, or the points with examples', 'F 24/25 Q2B · F 25/26 Q2B'],
            ['5', 'User research based on "When"', 'F 25/26 Q2C'],
            ['5', 'Types of design–development process', 'F 25/26 Q2D'],
            ['5', 'Tips for a good interview', 'F 24/25 Q2C'],
            ['5', 'Power of low-fidelity prototypes', 'F 24/25 Q2D'],
            ['5', 'Define wireframes', 'F 24/25 Q3A'],
            ['20', 'The design question (a mobile app)', 'F 24/25 Q3B (15) · F 25/26 Q3A (20)']
          ]).map((r, i) => html`<div key=${i}><b className="m">${r[0]}</b><p><b>${T(r[1])}</b><br/><span style=${{ color: 'var(--graphite)', fontSize: '13px' }}>${T(r[2])}</span></p></div>`)}</div>
        `, { sec: t('Problems that always come up', 'المسائل اللي بتيجي على طول') }),

        // 41 · P1 primary vs secondary (paper)
        page(html`
          <${Tag}>${t('Final 2024/25 Q2A · Final 2025/26 Q2A · 5 marks', 'فاينل 2024/25 و2025/26 · سؤال Q2A · 5 درجات')}</${Tag}>
          <${H2}>${t('Primary vs secondary: draw the table', 'الـ Primary والـ secondary: ارسم الجدول')}</${H2}>
          <${TableFill} id="tf1" head=${['', 'Primary', 'Secondary']} rows=${[
            ['Collected by', 'بيجمعها مين', ['You (or someone you hire)', 'Someone else'], [0, 1]],
            ['Examples', 'أمثلة', ['Surveys, focus groups, interviews, observations, experiments', 'Looking for existing data (books, journals)'], [0, 1]],
            ['Data type', 'نوع الـ data', ['Can be either (qual. or quant.)', 'Only qualitative', 'Only quantitative'], [0, 0]],
            ['Key benefit', 'أهم ميزة', ['Specific to your needs; you control the quality', 'Usually cheap and quick'], [0, 1]],
            ['Key drawback', 'أهم عيب', ['Usually costs more and takes longer', 'Data can be too old or not specific enough'], [0, 1]]]} />
          <${Hand}>${t('tap a cell to change it', 'دوس على الخانة تغيّرها')}</${Hand}>
        `),

        // 42 · P1 variant (ours)
        page(html`
          <${Tag}>${t('Ours: a fresh variant', 'من عندنا: variant جديد')}</${Tag}>
          <${H2}>${t('Now you: interviews vs surveys', 'دورك: الـ interviews قصاد الـ surveys')}</${H2}>
          <${TableFill} id="tf2" head=${['', 'Interview', 'Survey']} rows=${[
            ['Reach', 'الانتشار', ['Far fewer users', 'A large number of users (broad view)'], [0, 1]],
            ['Depth', 'العمق', ['Deeper: "why" questions, follow-ups, rare events', 'Quick responses in a short time'], [0, 1]],
            ['Cost', 'التكلفة', ['More expensive (synchronous, incentives)', 'One of the cheapest methods'], [0, 1]],
            ['How it runs', 'بيتعمل إزاي', ['The interviewer gives time to each person', 'Often online and easily created'], [0, 1]],
            ['Order', 'الترتيب', ['Either order: one plans the other', 'Always first', 'Always last'], [0, 0]]]} />
          <${Hand}>${t("Our method for any compare: two columns, the lecture's rows, an example per column.", 'طريقتنا لأي compare: عمودين، وصفوف المحاضرة، ومثال لكل عمود.')}</${Hand}>
        `),

        // 43 · P2 evaluate (paper)
        page(html`
          <${Tag}>${t('Final 2024/25 Q2B · 5 marks', 'فاينل 2024/25 · سؤال Q2B · 5 درجات')}</${Tag}>
          <${H2}>${t('Evaluate the survey questions', 'قيّم أسئلة الـ survey')}</${H2}>
          <${Evaluate} id="ev1" labels=${['i', 'ii', 'iii', 'iv', 'v']} qs=${[
            { q: 'Do you use social media?', ch: [0, 1, 2, 3, 4, 5, 6, 7], req: [0],
              fix: ['A <b>yes/no</b> question (Be Expressive). Use ranges: "In the past seven days, how much time have you spent on social media?" 0 hours / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours.', 'سؤال <b>yes/no</b> (Be Expressive). استخدم ranges:<span class="ltr">"In the past seven days, how much time have you spent on social media?" 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours</span>'] },
            { q: 'Why do you like to exercise?', ch: [0, 1, 2, 3, 4, 5, 6, 7], req: [1],
              fix: ['<b>Leading</b> (Be Unbiased): it assumes the person likes exercising. Ask first whether they exercise, or "How do you feel about exercising?"', 'سؤال <b>leading</b> (Be Unbiased): بيفترض إن الشخص بيحب الرياضة. اسأل الأول هو بيلعب ولا لأ، أو:<span class="ltr">"How do you feel about exercising?"</span>'] },
            { q: 'In the past seven days, how much time have you <i>wasted</i> on social media?', ch: [0, 1, 2, 3, 4, 5, 6, 7], req: [2],
              fix: ['<b>Loaded</b> (Be Unbiased): "wasted" judges the answer before it is given. Use "spent".', 'سؤال <b>loaded</b> (Be Unbiased): كلمة <bdi dir="ltr">"wasted"</bdi> بتحكم على الإجابة قبل ما تتقال. استخدم <bdi dir="ltr">"spent"</bdi>.'] },
            { q: "On a scale of 1 to 4 with 1 meaning 'a lot' and 4 meaning 'not at all', how much do you enjoy exercising?", ch: [0, 1, 2, 3, 4, 5, 6, 7], req: [3], ok: [3, 4],
              fix: ['<b>Ambiguous / reversed scale</b>: 1 = "a lot" runs against the usual low-to-high direction, and 4 points leave no neutral middle.', 'الـ <b>scale مش واضح / معكوس</b>: الـ <bdi>1</bdi> معناها "a lot" وده عكس الاتجاه المعتاد، و<bdi>4</bdi> نقط من غير نص محايد.'] },
            { q: "On a scale of 1 to 6 with 1 meaning 'not at all' and 6 meaning 'a lot', how much do you like social media?", ch: [0, 1, 2, 3, 4, 5, 6, 7], req: [5], ok: [5, 4],
              fix: ['<b>Changing number of options</b> (6 here, 4 in iv), and the direction is <b>reversed</b> compared with iv. Keep one scale length and direction in the whole survey.', 'الـ <b>عدد الـ options بيتغير</b> (<bdi>6</bdi> هنا و<bdi>4</bdi> في الـ iv)، والاتجاه <b>معكوس</b> عن الـ iv. خلّي طول واتجاه الـ scale واحد في الـ survey كله.'] }]} />
          <${Hand}>${t("No official key for this one: these are the site's answers, built on the lecture's exercise.", 'السؤال ده ملوش نموذج رسمي: دي إجابات الموقع، مبنية على تمرين المحاضرة.')}</${Hand}>
        `),

        // 44 · P2 variant (ours)
        page(html`
          <${Tag}>${t('Ours: a fresh variant', 'من عندنا: variant جديد')}</${Tag}>
          <${H2}>${t('Five more to fix', 'خمسة كمان تصلّحهم')}</${H2}>
          <${Evaluate} id="ev2" labels=${['1', '2', '3', '4', '5']} qs=${[
            { q: 'How satisfied are you with the price and delivery speed of our app?', ch: [0, 1, 2, 5, 6, 7], req: [6],
              fix: ['<b>Double-barrel</b> (Be Specific): two things in one question. Ask one about price and one about delivery speed.', 'سؤال <b>double-barrel</b> (Be Specific): حاجتين في سؤال واحد. اسأل سؤال عن السعر وسؤال عن سرعة التوصيل.'] },
            { q: 'How many hours a week do you study online? 0-5 / 5-10 / 10-20 / 20+', ch: [0, 1, 2, 5, 6, 7], req: [7],
              fix: ['<b>Overlapping ranges</b> (Be Clear): 5, 10 and 20 each fall in two ranges. Use 0-5 / 6-10 / 11-19 / 20+.', 'الـ <b>ranges متداخلة</b> (Be Clear): الـ <bdi>5</bdi> والـ <bdi>10</bdi> والـ <bdi>20</bdi> كل واحد في range ين. استخدم:<span class="ltr">0-5 / 6-10 / 11-19 / 20+</span>'] },
            { q: "Don't you agree that our new checkout is much easier?", ch: [0, 1, 2, 5, 6, 7], req: [1],
              fix: ['<b>Leading</b> (Be Unbiased): it pushes a "yes". Ask "How easy or difficult was the checkout?" with labelled levels.', 'سؤال <b>leading</b> (Be Unbiased): بيزقّك تقول آه. اسأل:<span class="ltr">"How easy or difficult was the checkout?"</span>ومعاه مستويات عليها labels.'] },
            { q: 'How much money did you <i>waste</i> on in-app purchases last month?', ch: [0, 1, 2, 5, 6, 7], req: [2],
              fix: ['<b>Loaded word</b> (Be Unbiased): "waste" judges. Use "spend".', 'كلمة <b>loaded</b> (Be Unbiased): الـ <bdi dir="ltr">"waste"</bdi> فيها حكم. استخدم <bdi dir="ltr">"spend"</bdi>.'] },
            { q: 'Do you order food online? Yes / No', ch: [0, 1, 2, 5, 6, 7], req: [0],
              fix: ['<b>Yes/no</b> (Be Expressive): use ranges with a timebox: "In the past seven days, how many times have you ordered food online?" 0 / 1-2 / 3-4 / 5 or more.', 'سؤال <b>yes/no</b> (Be Expressive): استخدم ranges بإطار زمني:<span class="ltr">"In the past seven days, how many times have you ordered food online?" 0 / 1-2 / 3-4 / 5 or more</span>'] }]} />
          <${Hand}>${t('For full marks, give three things each time: the problem, the principle, the better question.', 'عشان الدرجة كاملة، قول 3 حاجات كل مرة: المشكلة، والمبدأ، والسؤال الأحسن.')}</${Hand}>
        `),

        // 45 · P3 principles with examples (paper)
        page(html`
          <${Tag}>${t('Final 2025/26 Q2B · 5 marks', 'فاينل 2025/26 · سؤال Q2B · 5 درجات')}</${Tag}>
          <${H2}>${t('Good survey questions, with examples', 'أسئلة survey كويسة، بأمثلة')}</${H2}>
          <${P} small=${true}>${X('"Mention the points… to ask good survey questions and give examples." Match each principle to its example.', 'اذكر نقط أسئلة الـ survey الكويسة بأمثلة. وصّل كل مبدأ بمثاله.')}</${P}>
          <${Match} id="mp3" left=${['Be Clear', 'Be Concise', 'Be Specific', 'Be Expressive', 'Be Unbiased', 'Be Usable']}
            right=${A ? ['قسّم سؤال "speed and availability" لسؤالين', 'زوّد <bdi dir="ltr">"Other: ____"</bdi> لقايمة المنصات', 'حط labels للـ scale، من Highly dissatisfied لـ Highly Satisfied', 'progress bar، وتنبيه للأسئلة اللي متجاوبتش', 'اسأل ببساطة: <bdi dir="ltr">"How clean was the car?"</bdi>', 'اسأل: غالي، رخيص، ولا مظبوط؟']
              : ['Split "speed and availability" into two questions', 'Add "Other: ____" to a list of platforms', 'Label the scale: 1 - Highly dissatisfied … 5 - Highly Satisfied', 'A progress bar; alert unanswered questions', '"How clean was the car?"', '"Too high, too low, or about right?"']}
            answer=${[2, 4, 0, 5, 1, 3]} />
        `),

        // 46 · P3 model answer
        page(html`
          <${H2}>${t('The full-mark answer', 'إجابة الدرجة الكاملة')}</${H2}>
          <${P} small=${true}>${X('Name all six, each with one "don\'t ask / ask instead" example from the slides:', 'سمّي الـ <bdi>6</bdi>، وكل واحد معاه مثال "متسألش كده / اسأل كده" من السلايدز:')}</${P}>
          <${Kn} items=${A ? [
            'الـ <b>Be Clear</b>: بدل <bdi dir="ltr">"From 1 to 5, rate…"</bdi> لوحدها، حط labels لكل رقم.',
            'الـ <b>Be Concise</b>: بدل السؤال الطويل عن نضافة العربية، اسأل <bdi dir="ltr">"How clean was the car?"</bdi>.',
            'الـ <b>Be Specific</b>: قسّم الـ double-barrel لسؤالين.',
            'الـ <b>Be Expressive</b>: بدل <bdi dir="ltr">"Do you use social media?"</bdi> اسأل عن الوقت بـ ranges.',
            'الـ <b>Be Unbiased</b>: بدل <bdi dir="ltr">"wasted"</bdi> قول <bdi dir="ltr">"spent"</bdi>، وزوّد "Other".',
            'الـ <b>Be Usable</b>: progress bar، وترتيب منطقي، وpreview للـ survey.'
          ] : [
            '<b>Be Clear</b>: instead of a bare "From 1 to 5, rate…", label every number.',
            '<b>Be Concise</b>: instead of the long cleanliness question, ask "How clean was the car?"',
            '<b>Be Specific</b>: split a double-barrel question into two.',
            '<b>Be Expressive</b>: instead of "Do you use social media?", ask how much time, with ranges.',
            '<b>Be Unbiased</b>: "spent", not "wasted"; add "Other: ____".',
            '<b>Be Usable</b>: a progress bar, a logical order, preview the survey.'
          ]} />
        `),

        // 47 · P4 research by When (paper)
        page(html`
          <${Tag}>${t('Final 2025/26 Q2C · 5 marks', 'فاينل 2025/26 · سؤال Q2C · 5 درجات')}</${Tag}>
          <${H2}>${t('User research based on "When"', 'الـ user research حسب الـ "When"')}</${H2}>
          <${P} small=${true}>${X('Our clinic-app scenarios: when does each happen?', 'سيناريوهات من عندنا لـ app عيادة: كل واحد إمتى؟')}</${P}>
          <${Sort} id="sw" bins=${[['F', 'Foundational'], ['T', 'Tactical'], ['P', 'Post-launch']]} items=${[
            [t('Ask patients what annoys them about booking today', 'تسأل المرضى إيه اللي بيضايقهم في الحجز النهارده'), 0],
            [t('Watch patients try a paper prototype of the booking screen', 'تتفرج على المرضى وهم بيجربوا paper prototype لشاشة الحجز'), 1],
            [t('Three months after release: do patients book without help?', 'بعد الإطلاق بـ <bdi>3</bdi> شهور: المرضى بيحجزوا لوحدهم؟'), 2],
            [t('Decide which problem the app should solve at all', 'تقرر الـ app أصلاً هيحل أنهي مشكلة'), 0],
            [t('Ask which of two prototype layouts is clearer', 'تسأل أنهي layout من الـ 2 prototypes أوضح'), 1]]} />
          <${Box} kind="exam" title=${t('Model answer', 'الإجابة النموذجية')}><p className="hf-p small">${X('1. <b>Foundational</b>: before design; what to build. 2. <b>Tactical</b>: during design; feedback on prototypes. 3. <b>Post-launch</b>: after release; did we succeed?', '<bdi>1.</bdi> الـ <b>Foundational</b>: قبل الـ design، نبني إيه. <bdi>2.</bdi> الـ <b>Tactical</b>: أثناء الـ design، feedback على الـ prototypes. <bdi>3.</bdi> الـ <b>Post-launch</b>: بعد الإطلاق، نجحنا؟')}</p></${Box}>
        `),

        // 48 · P4 variant (ours): by WHO
        page(html`
          <${Tag}>${t('Ours: a fresh variant', 'من عندنا: variant جديد')}</${Tag}>
          <${H2}>${t('And by WHO?', 'وحسب الـ WHO؟')}</${H2}>
          <${Sort} id="sv" bins=${[['P', 'Primary'], ['S', 'Secondary']]} items=${[
            [t('Reading colour-blindness facts in a journal', 'تقرا معلومات عن عمى الألوان في journal'), 1],
            [t('Running a focus group with clinic staff', 'تعمل focus group مع موظفين العيادة'), 0],
            [t('A usability study of your own prototype', 'usability study على الـ prototype بتاعك'), 0],
            [t('Statistics from a published report on low-end phones', 'إحصائيات من تقرير منشور عن الموبايلات الضعيفة'), 1],
            [t('Participant observation in the waiting room', 'participant observation في صالة الانتظار'), 0],
            [t('A book on interface design', 'كتاب عن الـ interface design'), 1]]} />
          <${Talk} who="lens">${X('Three ways to classify research: by <b>WHEN</b> (L2: timing), by <b>WHO</b> (L2, L5: who did it), by <b>WHAT</b> (L5: numbers or why and how).', 'فيه <bdi>3</bdi> طرق تقسّم بيها الـ research: حسب الـ <b>WHEN</b> (التوقيت)، وحسب الـ <b>WHO</b> (مين عمله)، وحسب الـ <b>WHAT</b> (أرقام ولا ليه وإزاي).')}</${Talk}>
        `),

        // 49 · P5 handoff and handshake (paper)
        page(html`
          <${Tag}>${t('Final 2025/26 Q2D · 5 marks', 'فاينل 2025/26 · سؤال Q2D · 5 درجات')}</${Tag}>
          <${H2}>${t('Types of design–development process', 'أنواع الـ process بين الـ design والـ development')}</${H2}>
          <${P} small=${true}>${X('Our drawing: switch and count the meeting points.', 'رسمة من عندنا: بدّل وعدّ نقط التقابل.')}</${P}>
          <${Lanes} />
          <${Box} kind="exam" title=${t('Model answer', 'الإجابة النموذجية')}><p className="hf-p small">${X('<b>Handoff process</b>: the design phase finishes completely, then the design is handed over to development (sequential, one handover point). <b>Handshake process</b>: design and development run in parallel and synchronise at many points during the project.', 'الـ <b>Handoff process</b>: الـ design يخلص خالص، وبعدين يتسلم للـ development (ورا بعض، ونقطة تسليم واحدة). والـ <b>Handshake process</b>: الـ design والـ development بالتوازي، وبيعملوا sync في نقط كتير طول المشروع.')}</p></${Box}>
        `),

        // 50 · P5 variant (ours)
        page(html`
          <${Tag}>${t('Ours: a fresh variant', 'من عندنا: variant جديد')}</${Tag}>
          <${H2}>${t('Which process is it?', 'ده أنهي process؟')}</${H2}>
          <${Sort} id="sh" bins=${[['O', 'Handoff'], ['S', 'Handshake']]} items=${[
            [t('Designers finish every screen, then developers start', 'الـ designers يخلصوا كل الشاشات، وبعدين الـ developers يبدأوا'), 0],
            [t('Designers and developers meet every week to sync', 'الـ designers والـ developers بيتقابلوا كل أسبوع يعملوا sync'), 1],
            [t('Development starts while design is still going', 'الـ development بيبدأ والـ design لسه شغال'), 1],
            [t('There is one handover point', 'فيه نقطة تسليم واحدة'), 0],
            [t('The two run in sequence', 'الاتنين ورا بعض'), 0],
            [t('Frequent sync points', 'sync points كتير'), 1]]} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why study design at all (L9)? Some students will shine as designers; developers often design when there are no designers; and developers work better with designers when they understand the process.', 'ليه ندرس design أصلاً <bdi>(L9)</bdi>؟ فيه طلبة هيلمعوا كـ designers، والـ developers كتير بيصمموا لما مفيش designers، وبيشتغلوا أحسن مع الـ designers لما يفهموا الـ process.')}</p></${Box}>
        `),

        // 51 · P6 interview tips (paper)
        page(html`
          <${Tag}>${t('Final 2024/25 Q2C · 5 marks', 'فاينل 2024/25 · سؤال Q2C · 5 درجات')}</${Tag}>
          <${H2}>${t('What are the tips for a good interview?', 'إيه نصايح الـ interview الكويس؟')}</${H2}>
          <${P} small=${true}>${X('Tick only what belongs in the answer. Two are traps.', 'علّم على اللي ينفع في الإجابة بس. فيه فخّين.')}</${P}>
          <${Builder} id="b6" items=${[
            ['<b>Plan ahead</b>: prepare your questions (a script) before the interview.', '<b>خطط بدري</b>: حضّر أسئلتك (script) قبل الـ interview.', true],
            ['<b>Listen well</b>: the user should be talking most of the time.', '<b>اسمع كويس</b>: الـ user هو اللي يتكلم أغلب الوقت.', true],
            ['<b>Take notes</b>: one person asks, another writes.', '<b>اكتب notes</b>: واحد يسأل وواحد يكتب.', true],
            ['The interviewer should do most of the talking to guide the user.', 'الـ interviewer هو اللي يتكلم أغلب الوقت عشان يوجّه الـ user.', false],
            ['An audio recording is not enough; note emotions and reactions.', 'التسجيل الصوتي مش كفاية، واكتب المشاعر وردود الفعل.', true],
            ['Never move away from the script, whatever the user says.', 'أوعى تخرج عن الـ script مهما الـ user قال.', false],
            ['<b>Leave some time</b> between interviews.', '<b>سيب وقت</b> بين الـ interviews.', true]]} />
        `),

        // 52 · P7 power of lo-fi (paper)
        page(html`
          <${Tag}>${t('Final 2024/25 Q2D · 5 marks', 'فاينل 2024/25 · سؤال Q2D · 5 درجات')}</${Tag}>
          <${H2}>${t('What is the power of low-fidelity prototypes?', 'إيه قوة الـ low-fidelity prototype؟')}</${H2}>
          <${Builder} id="b7" items=${[
            ['Faster, easier and cheaper to make.', 'أسرع وأسهل وأرخص.', true],
            ['They give realistic animations users can test.', 'بيدّي animations واقعية الـ users يجربوها.', false],
            ['Hi-fi is not possible at the beginning: many details are not decided yet.', 'الـ hi-fi مش ممكن في الأول: تفاصيل كتير لسه متقررتش.', true],
            ['People talk more freely about a sketch than about something that looks finished.', 'الناس بتتكلم براحتها عن sketch أكتر من حاجة شكلها خلصان.', true],
            ['Konstan: a little-effort (hand-drawn) look gets more constructive feedback.', 'الـ Konstan: الشكل اللي باين إن مجهوده قليل بيجيب feedback بنّاء أكتر.', true],
            ['They remove the need for hi-fi prototypes.', 'بيلغي الحاجة للـ hi-fi prototypes.', false],
            ['Too many details push feedback to a lower level than needed.', 'التفاصيل الكتير بتنزّل الـ feedback لمستوى أقل من المطلوب.', true],
            ['Google: high-level ideas early; details and screens later.', 'الـ Google: أفكار عامة بدري، والتفاصيل والشاشات بعدين.', true]]} />
        `),

        // 53 · P7 variant (ours)
        page(html`
          <${Tag}>${t('Ours: a fresh variant', 'من عندنا: variant جديد')}</${Tag}>
          <${H2}>${t('Lo-fi or hi-fi, here?', 'الـ lo-fi ولا الـ hi-fi هنا؟')}</${H2}>
          <${P} small=${true}>${X('The rule: start lo-fi, move to hi-fi as the design proceeds. Apply it.', 'القاعدة: ابدأ lo-fi، واطلع hi-fi مع تقدم الـ design. طبّقها.')}</${P}>
          <${Sort} id="sf" bins=${[['L', 'Lo-fi'], ['H', 'Hi-fi']]} items=${[
            [t('Week one: three ideas for a clinic app, nothing decided', 'أول أسبوع: <bdi>3</bdi> أفكار لـ app عيادة، ومفيش حاجة متقررة'), 0],
            [t('You want honest, high-level feedback on the flow', 'عايز feedback صريح وعام على الـ flow'), 0],
            [t('Late stage: checking the final look and feel with the client', 'مرحلة متأخرة: بتراجع الشكل النهائي مع الـ client'), 1],
            [t('Sketching five versions of the home screen', 'بترسم <bdi>5</bdi> نسخ لشاشة الـ home'), 0],
            [t('The design is settled; you test the near-final screens', 'الـ design اتحسم، وبتجرب الشاشات القريبة من النهائي'), 1]]} />
        `),

        // 54 · P8 define wireframes (paper)
        page(html`
          <${Tag}>${t('Final 2024/25 Q3A · 5 marks', 'فاينل 2024/25 · سؤال Q3A · 5 درجات')}</${Tag}>
          <${H2}>${t('Define wireframes', 'عرّف الـ wireframes')}</${H2}>
          <${Blanks} id="bk" parts=${A ? [
            'الـ wireframe هو ', { o: ['final design', 'schematic', 'animation'], a: 1 }, ' للـ ', { o: ['basic outline', 'colour scheme', 'source code'], a: 0 },
            ' بتاع الشاشة. معمول من ', { o: ['photos and gradients', 'lines and basic shapes', 'HTML and CSS'], a: 1 }, ' وشوية كلام، ومن غير ',
            { o: ['boxes', 'text', 'colors or font styles'], a: 2 }, ' عن قصد. يعني ', { o: ['skeleton', 'painting', 'final product'], a: 0 }, ' فيه ', { o: ['final content', 'placeholders', 'animations'], a: 1 }, '.'
          ] : [
            'A wireframe is a ', { o: ['final design', 'schematic', 'animation'], a: 1 }, ' for the ', { o: ['basic outline', 'colour scheme', 'source code'], a: 0 },
            ' of a screen. It is built from ', { o: ['photos and gradients', 'lines and basic shapes', 'HTML and CSS'], a: 1 }, ' with some text, and intentionally has no ',
            { o: ['boxes', 'text', 'colors or font styles'], a: 2 }, '. Wireframe = a ', { o: ['skeleton', 'painting', 'final product'], a: 0 }, ' with ', { o: ['final content', 'placeholders', 'animations'], a: 1 }, '.'
          ]} />
          <${Box} kind="exam" title=${t('For the full 5 marks, add the purposes', 'عشان الـ 5 درجات كاملة، زوّد الأغراض')}>
            <${UL} items=${A ? ['يقرر هيكل الصفحة قبل الألوان والصور.', 'يخلّي الفريق كله فاهم بدري، فيوفر وقت وفلوس.', 'يوجّه الـ feedback للهيكل والـ function، مش الألوان.', 'يلقط العناصر المنسية أو المتلخبطة بدري.']
              : ['Decide the page structure before colours and images.', 'Get the team on the same page early, saving time and resources.', 'Direct feedback to structure and function, not colours.', 'Catch forgotten or disorganised elements early.']} />
          </${Box}>
        `),

        // 55 · P9 the design question: method
        page(html`
          <${Tag}>${t('Final 2024/25 Q3B (15) · Final 2025/26 Q3A (20)', 'فاينل 2024/25 Q3B (15) · فاينل 2025/26 Q3A (20)')}</${Tag}>
          <${H2}>${t('The design question', 'سؤال الـ design')}</${H2}>
          <${P} small=${true}>${X('"…a mobile application for online shopping" (2024/25) and "…for booking doctors" for patients of all ages, doctors and clinic admins (2025/26): "think about a layout of the interface that you consider usable and easy."', 'السؤال جه عن موبايل app للـ online shopping <bdi dir="ltr">(2024/25)</bdi>، وعن حجز الدكاترة لمرضى من كل الأعمار ودكاترة وإداريين <bdi dir="ltr">(2025/26)</bdi>، والمطلوب layout سهل وusable.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X("The site's model answers draw a bottom tab bar, common on phones. The lecture's rule is <b>navigation tabs at the top of the page</b>. Our wireframes follow the lecture; if you put tabs at the bottom, say why.", 'إجابات الموقع النموذجية راسمة tab bar تحت، وده منتشر في الموبايلات. بس قاعدة المحاضرة إن <b>الـ navigation tabs فوق</b>. الـ wireframes بتاعتنا ماشية بالمحاضرة، ولو حطيت الـ tabs تحت قول ليه.')}</p></${Box}>
        `, { sec: t('The design question', 'سؤال الـ design') }),

        // 55b · the skeleton
        page(html`
          <${Meth} title=${t('Our skeleton for a full-mark answer', 'هيكل من عندنا لإجابة الدرجة الكاملة')} items=${A ? [
            'الـ user research الأول: مين الـ users (سن، احتياجات خاصة، أجهزة) ومهامهم الأساسية، يعني الـ red routes.',
            'شاشة الـ home والأهم above the fold: الـ logo فوق، والبحث، وأهم card.',
            'الـ navigation: الـ tabs فوق، ولينكات الـ Home والأقسام، وواضح إنت فين.',
            'القوايم وصفحات التفاصيل: cards فيها primary CTA واضح.',
            'الـ flow: progress bar للطريق الثابت، وhints، والـ error جنب الـ field، وdata محفوظة، وconfirmation page.',
            'القواعد البصرية: <bdi>3</bdi> ألوان، وخلفية بسيطة، وframes، وalerts ثابتة، والـ Close والـ Cancel.',
            'الـ process: <bdi>5</bdi> wireframes على الورق أو أكتر لكل شاشة، وجرّب مع users، وكرر، وبعدين hi-fi في Figma.',
            'ارسمها، واكتب جنب كل عنصر الـ guideline بتاعه.'
          ] : [
            'User research first: who the users are (ages, special needs, devices) and their top tasks, the red routes.',
            'Home, above the fold: logo top-left, search, the most important card.',
            'Navigation: tabs at the top, Home and category links, clear where you are.',
            'Lists and detail pages: cards with a clear primary CTA.',
            'The flow: progress bar for the fixed path, hints, errors by the field, saved data, a confirmation page.',
            'Visual rules: 3 colours, simple background, frames, consistent alerts, Close vs Cancel.',
            'Process: 5+ paper wireframes per screen, test with users, iterate, then hi-fi in Figma.',
            'Draw it, and label every element with its guideline.'
          ]} />
        `),

        // 56 · P9 worked: booking doctors, home
        page(html`
          <${Tag}>${t('Final 2025/26 Q3A · worked', 'فاينل 2025/26 Q3A · محلول')}</${Tag}>
          <${H2}>${t('Worked: booking doctors, the home screen', 'محلول: حجز الدكاترة، شاشة الـ home')}</${H2}>
          <${Walk} steps=${[
            ['<b>Logo top-left</b>, in the same place on every screen, and it links to Home (L10, layout and navigation).', '<b>الـ logo فوق على الشمال</b>، في نفس المكان في كل شاشة، وبيودّي للـ Home <bdi>(L10)</bdi>.'],
            ['<b>Tabs at the top</b>: Home, Doctors, Visits, Me. Clear links to Home and categories on every screen (L10).', '<b>الـ tabs فوق</b>: الـ Home والدكاترة والزيارات وأنا. لينكات واضحة للـ Home والأقسام في كل شاشة <bdi>(L10)</bdi>.'],
            ['<b>Search above the fold</b>: finding a doctor or a specialty is the red route, so it needs no scrolling (L10).', '<b>البحث above the fold</b>: إنك تلاقي دكتور أو تخصص هو الـ red route، فمش محتاج scroll <bdi>(L10)</bdi>.'],
            ['<b>Specialty icons</b> with labels: icons users can tell apart readily (L3), recognition rather than recall (L4).', '<b>أيقونات التخصصات</b> ومعاها labels: أيقونات سهل تفرّق بينها <bdi>(L3)</bdi>، والـ recognition بدل الـ recall <bdi>(L4)</bdi>.'],
            ['<b>Your next visit</b> above the fold: the most important information first, related details grouped in one frame (L10).', '<b>الزيارة الجاية</b> above the fold: أهم معلومة الأول، والتفاصيل المرتبطة في frame واحد <bdi>(L10)</bdi>.'],
            ['<b>Large text and big targets</b> for elderly patients: user research first (L1, the truckers), and allow large text (L4).', '<b>خط كبير وزراير كبيرة</b> للمرضى الكبار في السن: الـ user research الأول <bdi>(L1)</bdi>، واسمح بتكبير الخط <bdi>(L4)</bdi>.'],
            ['<b>Book now</b> stands out, <b>View profile</b> stays plain: a clear primary vs secondary call-to-action (L9).', 'الـ <b>Book now</b> باين، والـ <b>View profile</b> عادي: فرق واضح بين الـ primary والـ secondary CTA <bdi>(L9)</bdi>.']]} />
        `),

        // 57 · P9 your turn: the booking step
        page(html`
          <${H2}>${t('Your turn: the booking step', 'دورك: خطوة الحجز')}</${H2}>
          <${Flow} />
          <${Match} id="mf" left=${A ? ['الخطوات', 'الاسم', 'مثال الرقم', 'التاريخ', 'الزرارين'] : ['Step bar', 'Saved name', 'Phone hint', 'Red date', 'Two buttons']}
            right=${A ? ['الـ error جنب الـ field', 'الـ progress bar', 'الـ primary والـ secondary CTA', 'شيل التكرار', 'الـ hints والـ formats']
              : ['Error by the field', 'Progress bar', 'Primary vs secondary CTA', 'No repeated typing', 'Hints and formats']}
            answer=${[1, 3, 4, 0, 2]} />
        `),

        // 58 · P9 your turn: spot the violations (online shopping)
        page(html`
          <${Tag}>${t('Final 2024/25 Q3B · online shopping', 'فاينل 2024/25 Q3B · الـ online shopping')}</${Tag}>
          <${H2}>${t('Your turn: what is wrong here?', 'دورك: إيه الغلط هنا؟')}</${H2}>
          <${P} small=${true}>${X('Our bad checkout. Flag every part that breaks a rule. Two parts are fine.', 'ده checkout وحش من عندنا. علّم على كل حتة بتكسر قاعدة. فيه حتتين سليمين.')}</${P}>
          <${ShopSpot} />
        `),

        // 59 · P9 the key and the outline
        page(html`
          <${H2}>${t('What was wrong, and the outline', 'إيه اللي كان غلط، والهيكل')}</${H2}>
          <${ShopKey} />
          <${Hand}>${X('Outline: research → home above the fold → list with breadcrumbs → product page, primary "Add to cart" → checkout with a progress bar → confirmation.', 'الهيكل: research، والـ home above the fold، وقايمة بـ breadcrumbs، وصفحة منتج فيها primary CTA، وcheckout بـ progress bar، وconfirmation.')}</${Hand}>
        `),

        // 60 · P9 variant (ours)
        page(html`
          <${Tag}>${t('Ours: a fresh variant', 'من عندنا: variant جديد')}</${Tag}>
          <${H2}>${t('Now you: a university library app', 'دورك: app لمكتبة الجامعة')}</${H2}>
          <${P} small=${true}>${X('Our prompt: search, reserve, renew. Tick what earns marks.', 'سؤال من عندنا: بحث وحجز وتجديد. علّم على اللي بيجيب درجات.')}</${P}>
          <${Builder} id="b9" items=${[
            ['User research first: students and staff, their top tasks (search, reserve, renew).', 'الـ user research الأول: الطلبة والموظفين ومهامهم (بحث، حجز، تجديد).', true],
            ['Six bright colours, so every section looks different.', 'ستة ألوان فاقعة، عشان كل قسم شكله مختلف.', false],
            ['Logo top-left linking home; search above the fold.', 'الـ logo فوق على الشمال وبيودّي للـ Home، والبحث above the fold.', true],
            ['Reserve flow with a progress bar and a confirmation page.', 'خطوات الحجز بـ progress bar وconfirmation page.', true],
            ['Skip research: the designer knows what students want.', 'سيبك من الـ research، الـ designer عارف الطلبة عايزين إيه.', false],
            ['5+ paper wireframes per screen, test with students, iterate, then Figma.', '<bdi>5</bdi> wireframes على الورق أو أكتر لكل شاشة، وجرّب مع الطلبة، وكرر، وبعدين Figma.', true]]} />
        `),

        /* ── Showdowns across the course ── */
        // 61 · survey vs interview
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Survey (L5) and Interview (L7)", 'سهرة النهارده: الـ Survey (L5) والـ Interview (L7)')} />
          <${Chat} names=${[t('Survey', 'الـ Survey'), t('Interview', 'الـ Interview')]} lines=${A ? [
            [0, 'أنا بوصل لعدد كبير من الـ users في وقت قصير. online، وسهل أتعمل، ومن أرخص الطرق.'],
            [1, 'وبتجيب إجابات على السطح. أنا بجيب الـ "ليه": أسئلة مفتوحة وfollow-ups وحتى الأحداث النادرة.'],
            [0, 'وإنت بتكلم عدد قليل. الـ users اللي ينفع تعملهم interview أقل بكتير.'],
            [1, 'صح، وأنا أغلى: synchronous والناس مستنية incentives. بس أنا أشهر research technique.'],
            [0, 'خلاص نبطّل خناق. نتائج واحد فينا بتخطط للتاني، بأي ترتيب.'],
            [1, 'اتفقنا. وولا واحد فينا لوحده بيحل الـ recall bias والـ reporting bias: زوّدوا observation.']
          ] : [
            [0, 'I reach a large number of users in a short time. Online, easily created, one of the cheapest methods.'],
            [1, 'And you get shallow answers. I get the "why": open-ended questions, follow-ups, even rare events.'],
            [0, 'You talk to a handful. Far fewer users can be interviewed than surveyed.'],
            [1, "True, and I'm more expensive: synchronous, and people expect incentives. But I'm the most common research technique."],
            [0, "Then let's stop fighting. The results of one plan the other, in either order."],
            [1, 'Agreed. And neither of us fixes recall or reporting bias alone: add observation.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Exam: "Survey is more expensive than interview" → False.', 'في الامتحان: الـ survey أغلى من الـ interview ← غلط.')}</${Hand}>
        `, { sec: t('Showdowns', 'المواجهات') }),

        // 62 · perception vs memory
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Perception (L3) and Memory (L4), over one familiar face", 'سهرة النهارده: الـ Perception (L3) والـ Memory (L4)، على وش مألوف')} />
          <${Chat} names=${[t('Perception', 'الـ Perception'), t('Memory', 'الـ Memory')]} lines=${A ? [
            [0, 'أنا باخد المعلومة من العالم وأحولها لتجربة. شفت وش؟ ده شغلي.'],
            [1, 'التعرف على وش حد موجود في تعريفي أنا: بفتكر المعرفة عشان الناس تتصرف صح.'],
            [0, 'الميدترم سأل "Recognizing a familiar face is an example of…" والإجابة كانت أنا.'],
            [1, 'عشان أنا مكنتش في الاختيارات أصلاً: Planning وProblem-solving وPerception وDecision-making.'],
            [0, 'يبقى اقرا الاختيارات الأول.'],
            [1, 'وافتكر أحسن حاجة عندي: الناس بتتعرف أحسن بكتير ما بتفتكر. فالـ designers: الـ recognition بدل الـ recall.']
          ] : [
            [0, 'I acquire information from the world and turn it into experiences. Seeing a face? Mine.'],
            [1, "Recognizing someone's face is in my definition: I recall knowledge so people act appropriately."],
            [0, 'The midterm asked "Recognizing a familiar face is an example of…" and the answer was me.'],
            [1, 'Only because I was not an option: Planning, Problem-solving, Perception, Decision-making.'],
            [0, 'So read the options first.'],
            [1, 'And remember my best trick: people recognize much better than they recall. Designers: recognition rather than recall.']
          ]} />
        `),

        // 63 · interview: breadcrumbs
        page(html`
          <${Interview} title=${t("This week's interview: Breadcrumbs", 'حوار الأسبوع: الـ Breadcrumbs')} sub=${t('Why do you turn up in two lectures?', 'ليه إنت موجود في محاضرتين؟')} lines=${A ? [
            ['الكتاب', 'إنت موجود في <bdi>L9</bdi> و<bdi>L10</bdi>. إنت تبع مين فيهم؟'],
            ['الـ Breadcrumbs', 'الاتنين. في إرشادات الـ forms في <bdi>L9</bdi> بوضّح الـ users فين لما يبقى فيه اختيارات كتير، وفي الـ navigation في <bdi>L10</bdi> بوضّح هما فين في الموقع.'],
            ['الكتاب', 'يعني إنت والـ progress bar بتعملوا نفس الشغلانة؟'],
            ['الـ Breadcrumbs', 'لأ. الـ progress bar للطريق الثابت زي الـ checkout، بيوريك إنت فين وفاضل إيه. وأنا للمواقع اللي فيها فروع كتير:<span class="ltr">Home › Men › Shoes</span>'],
            ['الكتاب', 'وإيه علاقتك بالـ memory؟'],
            ['الـ Breadcrumbs', 'بخلّي الـ user يتعرف هو فين بدل ما يفتكر. الربط ده بـ <bdi>L4</bdi> من عندكم، مش من السلايدز، بس بيعمل إجابة مقالي حلوة.']
          ] : [
            ['Head First', 'You turn up in L9 and L10. Which one is yours?'],
            ['Breadcrumbs', "Both. In L9's form guidelines I show where users are when there are multiple choices; in L10's navigation I make it clear where users are on the site."],
            ['Head First', 'So you and the progress bar do the same job?'],
            ['Breadcrumbs', 'No. The progress bar is for a predefined unique path, like a checkout: where you are and what is left. I am for sites with many branches: Home › Men › Shoes.'],
            ['Head First', 'And memory?'],
            ['Breadcrumbs', "I let users recognize where they are instead of recalling it. That link to L4 is yours, not the slides', but it makes a good written answer."]
          ]} />
        `),

        // 64 · who am I
        page(html`
          <${H2}>${t('Who am I? The whole course', 'أنا مين؟ الكورس كله')}</${H2}>
          <${Match} id="who" left=${["Tactical research", "Wireframe", "Red routes", "Reporting bias", "Handshake", "Miller's 7 ± 2", "SPII"]}
            right=${A ? ['لو ضعت، الـ user ممكن يتضر مالياً أو يتعرض لتمييز', 'بحصل أثناء الـ design، بالـ feedback على الـ prototypes', 'الـ immediate memory بتشيل من <bdi>5</bdi> لـ <bdi>9</bdi> حاجات', 'هيكل فيه placeholders: خطوط وأشكال من غير ألوان', 'الناس بتجاوب إجابات أحسن من الحقيقة', 'الـ design والـ development بالتوازي بـ sync كتير', 'الصفحات أو الأفعال اللي الناس بتستخدمها أكتر حاجة']
              : ['If I am lost, a user can suffer financial harm or discrimination', 'I happen during design, with feedback on prototypes', 'Immediate memory holds 5 to 9 items', 'A skeleton with placeholders: lines and shapes, no colours', 'People give answers more ideal than reality', 'Design and development in parallel, frequent sync points', 'The pages or actions customers use most to complete tasks']}
            answer=${[1, 3, 6, 4, 5, 2, 0]} />
        `),

        /* ── The exam corner ── */
        page(html`
          <${H2}>${t('Exam corner: research', 'ركن الامتحان: الـ research')}</${H2}>
          ${mq('e1', /Primary research is done by someone else/)}
          ${mq('e2', /Data that includes descriptions from interviewees/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          <${H2}>${t('Exam corner: qualitative and SPII', 'ركن الامتحان: الـ qualitative والـ SPII')}</${H2}>
          ${mq('e3', /Quantitative research is often easier/)}
          ${mq('e4', /SPII\) includes/)}
        `),
        page(html`
          <${H2}>${t('Exam corner: surveys and privacy', 'ركن الامتحان: الـ surveys والـ privacy')}</${H2}>
          ${mq('e5', /Survey is more expensive than interview/)}
          ${mq('e6', /Why is privacy and security important/)}
        `),
        page(html`
          <${H2}>${t('Exam corner: interviews', 'ركن الامتحان: الـ interviews')}</${H2}>
          ${mq('e7', /Interview is the most common research technique/)}
          ${mq('e8', /Individual interviews are easier to coordinate/)}
          <${Grow} />
          <${Talk} who="dev">${X('Two true ones in a row. The exam likes that too.', 'اتنين صح ورا بعض. والامتحان بيحب كده برضه.')}</${Talk}>
        `),
        page(html`
          <${H2}>${t('Exam corner: prototypes', 'ركن الامتحان: الـ prototypes')}</${H2}>
          ${mq('e9', /enables you to get useful feedback/)}
          ${mq('e10', /High fidelity prototypes are faster/)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Read every adjective: "faster, easier and cheaper" belongs to lo-fi.', 'اقرا كل صفة: "أسرع وأسهل وأرخص" دي بتاعة الـ lo-fi.')}</${Talk}>
        `),
        page(html`
          <${H2}>${t('Exam corner: wireframes and UX', 'ركن الامتحان: الـ wireframes والـ UX')}</${H2}>
          ${mq('e11', /tools are commonly used to create wireframes/)}
          ${mq('e12', /skill is mainly related to UX/)}
        `),
        page(html`
          <${H2}>${t('Exam corner: what HCI is', 'ركن الامتحان: يعني إيه HCI')}</${H2}>
          ${mq('e13', /HCI terms used interchangeably/)}
          ${mq('e14', /S\/W development is not just/)}
        `),
        page(html`
          <${H2}>${t('Exam corner: the process and cognition', 'ركن الامتحان: الـ process والـ cognition')}</${H2}>
          ${mq('e15', /main purpose of the Decide stage/)}
          ${mq('e16', /Recognizing a familiar face/)}
        `),
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}>
            <p className="hf-p small" style=${{ marginBottom: '6px' }}>${X("Lecture 10 has no question of its own in the papers (its rules are marked inside the design question). These are the site's practice questions, not the doctors'.", 'محاضرة <bdi>10</bdi> ملهاش سؤال لوحدها في الامتحانات (قواعدها بتتصحح جوه سؤال الـ design). دي أسئلة تدريب من الموقع، مش من الدكاترة.')}</p>
            ${pq('p1', /A good error message should FIRST/)}
          </${Box}>
        `),

        // exam day
        page(html`
          <${H2}>${t('Exam day: 120 minutes, 60 marks', 'يوم الامتحان: 120 دقيقة و60 درجة')}</${H2}>
          <${P} small=${true}>${X("Our time plan, from the real papers' structure (about 2 minutes a mark):", 'خطة وقت من عندنا، من شكل الامتحانات الحقيقية (حوالي دقيقتين للدرجة):')}</${P}>
          <div className="hf-hciF-plan hf-in">${(A ? [
            ['<bdi>0–25</bdi>', '<b>السؤال الأول (<bdi>20</bdi>)</b>: صح وغلط واختار. لفة واحدة، علّم على اللي شاكك فيه وارجعله.'],
            ['<bdi>25–65</bdi>', '<b>السؤال التاني (<bdi>4 × 5</bdi>)</b>: عشر دقايق لكل واحد، جدول أو <bdi>5</bdi> نقط.'],
            ['<bdi>65–105</bdi>', '<b>السؤال التالت (<bdi>20</bdi>)</b>: خمس دقايق research، وعشرين للـ wireframes بالـ labels، وخمستاشر للـ guidelines مكتوبة.'],
            ['<bdi>105–120</bdi>', '<b>مراجعة</b>: الصح والغلط اللي سبته، والـ UI والـ UX، والأسامي.']
          ] : [
            ['0–25', '<b>Q1 (20)</b>: T/F and MCQ. One pass; mark doubts and come back.'],
            ['25–65', '<b>Q2 (4 × 5)</b>: ten minutes each; a table or 5 points.'],
            ['65–105', '<b>Q3 (20)</b>: 5 min research notes, 20 min labelled wireframes, 15 min the written guidelines. (2024/25 split it: define 5 + design 15.)'],
            ['105–120', '<b>Review</b>: skipped T/F, UI vs UX, names spelled right.']
          ]).map((r, i) => html`<div key=${i}><b className="m" style=${{ fontSize: '14px' }}>${T(r[0])}</b><p>${T(r[1])}</p></div>`)}</div>
        `, { sec: t('Exam day', 'يوم الامتحان') }),

        // checklist
        page(html`
          <${H2}>${t('The last-minute checklist', 'الـ checklist بتاعة آخر لحظة')}</${H2}>
          <${Box} kind="watch"><p className="hf-p small">${X('Where marks go: tactical = <b>during</b>; lo-fi = cheaper; UI ≠ UX; Be <b>Un</b>biased; "a & c"; 7 ± 2 = 5 to 9; <b>100+</b> mouse prototypes; tabs at the top; one button = Close. When a key and the lecture disagree (2024/25: tactical, "Be biased", "Plan ahead… before"), our advice: answer from the lecture.', 'الدرجات بتروح فين: الـ tactical <b>أثناء</b>، والـ lo-fi أرخص، والـ UI مش الـ UX، والـ Be <b>Un</b>biased، و<bdi dir="ltr">a & c</bdi>، و<bdi dir="ltr">7 ± 2</bdi> يعني من <bdi>5</bdi> لـ <bdi>9</bdi>، و<b>أكتر من <bdi>100</bdi></b> prototype للماوس، والـ tabs فوق، والزرار الوحيد Close. ولما النموذج يختلف مع المحاضرة (في <bdi>2024/25</bdi>)، نصيحتنا: جاوب من المحاضرة.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="dev">${X('Pen, ruler for the wireframes, and two hours. Ready.', 'قلم، ومسطرة للـ wireframes، وساعتين. جاهز.')}</${Talk}>
        `),

        // bullet points (1)
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>HCI</b>: التفاعل، أو العلاقة، بين الـ users والكمبيوتر، ونفس المعنى HMI وMMI. وأجزاؤه Human وComputer وInteraction.',
            'الـ <b>UI</b> هو الشكل والـ interactivity، والـ <b>UX</b> التجربة الكاملة. متبدلهمش أبداً.',
            'الـ process: الـ research ثم الـ design and prototyping ثم الـ evaluation، والـ <bdi>4</bdi> activities، والـ double diamond، والـ sprint.',
            'الـ research حسب الـ WHEN: الـ foundational قبل، والـ tactical <b>أثناء</b>، والـ post-launch بعد. وحسب الـ WHO: الـ primary إنت، والـ secondary حد تاني.',
            'الـ <bdi>6</bdi> cognitive processes. والـ Tullis (<bdi dir="ltr">5.5 s / 3.2 s</bdi>، الـ spacing)، والـ Weller (الـ borders)، والـ hands-free مش أأمن.',
            'الـ recognition أسهل من الـ recall، والـ Miller <bdi dir="ltr">7 ± 2</bdi>، والـ intentional learning أصعب.',
            'الـ survey رخيص وواسع، والـ interview أعمق وأغلى وأشهر technique.'
          ] : [
            '<b>HCI</b>: the interaction, or relationship, between users and computers; also HMI and MMI. Parts: Human, Computer, Interaction.',
            '<b>UI</b> = look and feel, interactivity; <b>UX</b> = the overall experience. Never swap them.',
            'The process has 3 components: research → design and prototyping → evaluation. Know the 4 activities, the double diamond, the sprint, Joyner and Google UCD.',
            'Research by WHEN: foundational before, tactical <b>during</b>, post-launch after. By WHO: primary = you, secondary = someone else.',
            'The 6 cognitive processes. Tullis (5.5 s vs 3.2 s, spacing), Weller (borders), hands-free is not safer.',
            'Recognition beats recall; Miller 7 ± 2; intentional learning is harder.',
            'Surveys: cheap and broad. Interviews: deeper, dearer, the most common technique.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // bullet points (2)
        page(html`
          <${Bullets} items=${A ? [
            'الـ <bdi>6</bdi> مبادئ: Clear وConcise وSpecific وExpressive وUnbiased وUsable، ومعاك مثال لكل واحد.',
            'نصايح الـ interview: خطط، واسمع كويس، واكتب notes، وسيب وقت بين الـ interviews.',
            'أكبر غلطة: تصمم من غير ما تفهم الـ users والـ task. والتانية: تستقر على فكرة بدري.',
            'الـ prototype عشان الـ feedback والـ iteration، ومش لازم يشبه المنتج النهائي.',
            'الـ lo-fi أسرع وأسهل وأرخص. والـ wireframe هيكل من غير ألوان، وارسم <bdi>5</bdi> نسخ أو أكتر.',
            'الـ handoff ورا بعض، والـ handshake بالتوازي.',
            'سؤال الـ design: research، والـ above the fold، والـ logo، والـ tabs، والـ progress bar، والـ errors جنب الـ field، والـ confirmation، و<bdi>3</bdi> ألوان، وCTA واضح، وعلّم كل عنصر بقاعدته.'
          ] : [
            'Six principles: Clear, Concise, Specific, Expressive, Unbiased, Usable, each with an example.',
            'Interview tips: plan ahead, listen well, take notes, leave time between interviews.',
            'Biggest mistake: designing without understanding users and task. Second: settling on one idea too early.',
            'A prototype is for feedback and iteration; it need not resemble the final product.',
            'Lo-fi: faster, easier, cheaper. A wireframe: structure, no colours; sketch 5+ versions.',
            'Handoff = sequential; handshake = in parallel.',
            'The design question: research, above the fold, logo, tabs, progress bar, errors by the field, confirmation, 3 colours, clear CTA; label every element with its rule.'
          ]} />
        `),

        // the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through the whole course!', 'خلّصت الكورس كله!')}</${H1}>
            <${Talk} who="lens">${t('Now test it the way the exam will.', 'جرّب نفسك زي الامتحان.')}</${Talk}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: LEC.map(l => l.n), mock: 40, t: Date.now() } }}>${t('Timed mock final', 'فاينل تجريبي بالوقت')}</${K.Go}>
              <${K.Go} to=${{ mode: 'quiz', quizPreset: { lecs: LEC.map(l => l.n), only: 'prof', t: Date.now() } }}>${t("The doctors' questions", 'أسئلة الدكاترة')}</${K.Go}>
            </div>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} to=${{ mode: 'read', lec: 'fin', anchor: null }}>${t('The final summary', 'ملخص الفاينل')}</${K.Go}>
              <${K.Go} to=${{ mode: 'papers' }}>${t('Past papers', 'الامتحانات اللي فاتت')}</${K.Go}>
            </div>
          </div>
        `, { center: true })
      ];
    }
  };
})();

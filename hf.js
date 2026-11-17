// "Head First": a lecture retold the Head First way, as a book with hand-laid pages.
// Conversational text, pictures first, characters who talk, Brain Power questions, Fireside Chats, "Watch it!" exam traps,
// exercises you can do on the page, and the lecture's own animated visuals (figs-*.js) placed on the pages.
// This file is the book and its building blocks; each course's chapters live in hf-<course>.js (window.HF.chapters[course][lecture]).
// build.mjs copies both to data/; app.js loads them only when a Head First chapter is opened.
(function () {
  const { useState, useEffect, useRef, useLayoutEffect, useMemo, createContext, useContext } = React;
  const html = htm.bind(React.createElement);
  const calm = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  const CSS = `
.hfb{ --hf-hand:#1D4ED8; --hf-red:#C62828; --hf-grey:#EEF0F3; --hf-grey2:#E2E5EA; --hf-line:#1C2230; --hf-k:var(--k-compiler); }
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .hfb{ --hf-hand:#8FB0FF; --hf-red:#FF8A80; --hf-grey:#1E232D; --hf-grey2:#272D39; --hf-line:#C9D1DE; } }
:root[data-theme="dark"] .hfb{ --hf-hand:#8FB0FF; --hf-red:#FF8A80; --hf-grey:#1E232D; --hf-grey2:#272D39; --hf-line:#C9D1DE; }
.hfb .bpage{ font-family:"Newsreader", Georgia, serif; }
.hfp{ position:absolute; left:26px; right:26px; top:40px; bottom:42px; display:flex; flex-direction:column; gap:9px; overflow:hidden; text-align:left; }
.hfp.center{ justify-content:center; }
.hfp > *{ flex:none; }
.hfp .grow{ flex:1 1 auto; min-height:0; }
.hfrun{ position:absolute; top:15px; left:26px; right:26px; font:500 13.5px/1 var(--body); color:var(--graphite); letter-spacing:.02em; display:flex; justify-content:space-between; }
.hfrun b{ font-weight:700; color:var(--ink); }
.hfnum{ position:absolute; bottom:14px; left:26px; right:26px; font:500 13.5px/1 var(--body); color:var(--graphite); display:flex; justify-content:space-between; }
.hfnum b{ font-weight:800; color:var(--ink); }
.bpage.left .hfnum{ flex-direction:row; } .bpage.right .hfnum{ flex-direction:row-reverse; }
.hf-in{ animation:hf-up .5s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-up{ from{ opacity:0; transform:translateY(8px); } }
.hf-h1{ font:800 29px/1.02 var(--body); letter-spacing:-.025em; margin:0; color:var(--ink); }
.hf-h2{ font:800 21px/1.08 var(--body); letter-spacing:-.015em; margin:0; color:var(--ink); }
.hf-h3{ font:700 16px/1.15 var(--body); margin:0; color:var(--ink); }
.hf-p{ font-size:15.5px; line-height:1.4; margin:0; color:var(--ink); }
.hf-p.small{ font-size:14px; line-height:1.38; }
.hf-p b, .hf-li b{ font-weight:600; }
.hf-p code, .hf-li code, .hf-box code, .hf-bub code{ font-family:var(--mono); font-size:.86em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hf-ul{ margin:0; padding-left:1.1em; } .hf-li{ font-size:15px; line-height:1.36; margin:0 0 4px; }
.hf-ul li::marker{ color:var(--hf-k); }
.hf-hand{ font-family:"Caveat", "Segoe Print", "Comic Sans MS", cursive; font-weight:600; font-size:20px; line-height:1.02; color:var(--hf-hand); margin:0; }
.hf-hand.red{ color:var(--hf-red); }
.hf-hand.hf-big{ font-size:25px; }
.hf-note{ display:flex; align-items:flex-start; gap:4px; }
.hf-note svg{ flex:none; color:var(--hf-hand); }
.hf-note.red svg{ color:var(--hf-red); }
.hf-tilt{ transform:rotate(-2deg); } .hf-tilt2{ transform:rotate(1.5deg); }
.hf-def{ border:2px solid var(--hf-line); padding:9px 11px; font-size:15.5px; line-height:1.38; background:var(--paper); box-shadow:4px 4px 0 var(--hf-grey2); }
.hf-def b{ font-weight:600; }
.hf-code{ font:500 14px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:7px 10px; margin:0; white-space:pre; color:var(--ink); overflow:hidden; }
.hf-code > div{ min-height:1.5em; display:flex; gap:10px; align-items:baseline; }
.hf-code .c{ color:var(--hf-hand); font-family:"Caveat", cursive; font-size:18px; font-weight:600; white-space:normal; line-height:1; }
/* boxes */
.hf-box{ position:relative; border:1.5px solid var(--hf-line); padding:10px 12px; background:var(--paper); }
.hf-box > .hf-p + .hf-p{ margin-top:5px; }
.hf-box.grey{ background:var(--hf-grey); border-color:transparent; }
.hf-tag{ display:flex; align-items:center; gap:7px; margin:0 0 6px; font:800 15px/1 var(--body); letter-spacing:.06em; text-transform:uppercase; color:var(--ink); }
.hf-tag svg{ flex:none; }
.hf-brain{ background:var(--hf-grey); border:0; padding:11px 12px; }
.hf-watch{ border:2px solid var(--hf-red); padding:10px 12px 10px 12px; }
.hf-watch .hf-tag{ color:var(--hf-red); text-transform:none; letter-spacing:0; font-size:19px; }
.hf-relax{ border:2px dashed var(--ok); }
.hf-relax .hf-tag{ color:var(--ok); text-transform:none; letter-spacing:0; font-size:19px; }
.hf-pencil{ border:2px solid var(--hf-line); }
.hf-pencil .hf-tag{ font-family:"Caveat", cursive; font-weight:700; text-transform:none; letter-spacing:0; font-size:25px; }
.hf-dumb .hf-dumbt{ margin:0 0 6px; line-height:1; color:var(--ink); }
.hf-dumbt i{ display:block; font:italic 15px/1 var(--display); }
.hf-dumbt b{ display:block; font:800 21px/1.05 var(--body); letter-spacing:-.01em; }
.hf-q{ font:700 14.5px/1.32 var(--body); margin:7px 0 2px; } .hf-q:first-of-type{ margin-top:0; }
.hf-a{ font-size:14.5px; line-height:1.36; margin:0; }
.hf-q::before{ content:"Q: "; } .hf-a::before{ content:"A: "; font:700 14.5px var(--body); }
.hf-bullets{ background:var(--hf-grey); border:0; padding:12px 14px; }
.hf-bullets .hf-tag{ font-size:17px; }
.hf-bullets ul{ list-style:none; margin:0; padding:0; }
.hf-bullets li{ position:relative; padding-left:16px; font-size:14.5px; line-height:1.34; margin-bottom:5px; }
.hf-bullets li::before{ content:""; position:absolute; left:2px; top:.45em; width:7px; height:7px; background:var(--ink); }
/* fireside chat and interview */
.hf-fire-h{ display:flex; align-items:center; gap:10px; }
.hf-fire-h .hf-h2{ font-size:24px; }
.hf-fire-sub{ font:italic 15px/1.3 var(--display); color:var(--graphite); margin:0; }
.hf-fire{ display:grid; grid-template-columns:1fr 1fr; gap:4px 12px; }
.hf-fire .who{ font:800 14px/1 var(--body); text-transform:uppercase; letter-spacing:.05em; padding-bottom:4px; border-bottom:2px solid var(--hf-line); }
.hf-fire .ln{ font-size:14.5px; line-height:1.34; margin:0; padding:3px 0; }
.hf-fire .ln.r{ grid-column:2; } .hf-fire .ln.l{ grid-column:1; }
.hf-iv{ border-top:5px solid var(--hf-line); padding-top:6px; }
.hf-iv-t{ font:800 22px/1 var(--body); letter-spacing:-.01em; margin:0; }
.hf-iv-s{ font:italic 15px/1.25 var(--display); margin:3px 0 0; color:var(--graphite); }
.hf-iv-l{ font-size:14.5px; line-height:1.36; margin:0; }
.hf-iv-l > b:first-child{ font:800 13px var(--body); text-transform:uppercase; letter-spacing:.03em; margin-right:4px; }
/* characters and speech */
.hf-talk{ display:flex; align-items:flex-end; gap:8px; }
.hf-talk.flip{ flex-direction:row-reverse; }
.hf-talk .who-svg{ flex:none; width:58px; height:58px; color:var(--hf-line); }
.hf-bub{ position:relative; border:1.6px solid var(--hf-line); border-radius:14px; padding:7px 10px; font:500 14.5px/1.3 var(--body); background:var(--paper); margin-bottom:16px; }
.hf-bub::after{ content:""; position:absolute; bottom:-9px; left:16px; width:14px; height:14px; background:var(--paper); border-right:1.6px solid var(--hf-line); border-bottom:1.6px solid var(--hf-line); transform:skewX(30deg) rotate(45deg); }
.hf-talk.flip .hf-bub::after{ left:auto; right:16px; transform:skewX(-30deg) rotate(45deg); }
.hf-bub.think{ border-style:dashed; border-radius:22px; }
.hf-bub.think::after{ display:none; }
/* opener */
.hf-open{ border-bottom:4px solid var(--hf-line); padding-bottom:8px; }
.hf-chap{ display:flex; align-items:flex-end; gap:10px; }
.hf-chap .n{ font:800 86px/0.8 var(--body); letter-spacing:-.05em; color:transparent; -webkit-text-stroke:2px var(--hf-line); }
.hf-chap .t{ font:800 13px/1.1 var(--body); text-transform:uppercase; letter-spacing:.2em; color:var(--graphite); padding-bottom:6px; }
/* exercises */
.hf-btn{ font:600 13.5px/1 var(--body); padding:8px 12px; min-height:34px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hf-btn.solid{ background:var(--hf-line); color:var(--paper); }
.hf-btn:disabled{ opacity:.4; cursor:default; }
.hf-row{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.hf-sort{ display:grid; gap:4px; }
.hf-sort .it{ display:grid; grid-template-columns:1fr auto; gap:6px; align-items:center; font-size:14px; line-height:1.25; padding:2px 0; border-bottom:1px dotted var(--faint); }
.hf-sort .ch{ display:flex; gap:4px; }
.hf-sort .ch button{ font:700 12.5px/1 var(--body); min-width:36px; height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hf-sort .ch button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hf-sort .it.ok .txt::after{ content:" ✓"; color:var(--ok); font-weight:700; }
.hf-sort .it.no .txt::after{ content:" ✗"; color:var(--hf-red); font-weight:700; }
.hf-sort .fix{ font-family:"Caveat", cursive; font-size:17px; color:var(--hf-red); font-weight:600; }
.hf-score{ font-family:"Caveat", cursive; font-size:22px; font-weight:700; color:var(--hf-hand); }
.hf-tok{ display:flex; justify-content:center; flex-wrap:nowrap; margin:4px 0; }
.hf-tok button{ position:relative; width:25px; height:38px; border:0; padding:0; background:none; cursor:pointer; font:700 19px/38px var(--mono); color:var(--ink); }
.hf-tok button span{ display:block; border-bottom:2px solid var(--faint); margin:0 2px; }
.hf-tok button.cut::after{ content:""; position:absolute; right:-2px; top:2px; bottom:2px; width:3px; border-radius:2px; background:var(--hf-red); transform:rotate(12deg); }
.hf-tok.done button span{ border-color:var(--hf-k); }
.hf-toks{ display:flex; flex-wrap:wrap; gap:5px; }
.hf-toks span{ font:600 13.5px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:6px; padding:3px 6px; background:var(--paper); }
.hf-toks span code{ font:700 13.5px var(--mono); margin-right:4px; background:none; padding:0; }
.hf-match{ display:grid; grid-template-columns:1fr 1.45fr; gap:5px 10px; align-items:stretch; }
.hf-match button{ text-align:left; font:500 13.5px/1.22 var(--body); padding:6px 8px; min-height:34px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; display:flex; align-items:center; gap:6px; }
.hf-match button.l{ font-weight:700; }
.hf-match button.sel{ border-color:var(--hf-hand); box-shadow:0 0 0 2px var(--hf-hand); }
.hf-match .hf-mtag{ flex:none; display:inline-grid; place-items:center; width:20px; height:20px; border-radius:50%; font:800 12px/1 var(--body); background:var(--hf-grey2); color:var(--ink); }
.hf-match .hf-mtag.on{ background:var(--hf-hand); color:var(--paper); }
.hf-match button.ok{ border-color:var(--ok); } .hf-match button.no{ border-color:var(--hf-red); }
.hf-mcq .q{ font:600 14.5px/1.3 var(--body); margin:0 0 5px; }
.hf-mcq .src{ font:600 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); margin:0 0 4px; }
.hf-mcq .hf-opts{ display:grid; gap:4px; }
.hf-mcq .hf-opts button{ text-align:left; font:500 13.5px/1.25 var(--body); padding:6px 9px; min-height:32px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hf-mcq .hf-opts button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hf-mcq .hf-opts button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hf-mcq .hf-why{ font-size:13.5px; line-height:1.32; margin:5px 0 0; padding-left:9px; border-left:3px solid var(--hf-k); }
/* the lecture's visuals on a page */
.hf-fig{ position:relative; flex:1 1 auto !important; min-height:120px; display:flex; flex-direction:column; }
.hf-figbox{ position:relative; flex:1 1 auto; min-height:0; overflow:hidden; }
.hf-figbox.scroll{ overflow-y:auto; touch-action:pan-y; overscroll-behavior:contain; scrollbar-width:thin; box-shadow:inset 0 -14px 12px -12px rgba(0,0,0,.25); }
.hf-figin{ position:absolute; left:0; top:0; transform-origin:0 0; }
.hf-fig .fig{ margin:0; }
.hf-fig .fig-cap{ font-size:14px; min-height:0; }
.hf-figh{ font:800 15px/1.15 var(--body); margin:0 0 5px; }
/* machine (compiler as a translator) */
.hf-mach{ display:grid; grid-template-columns:minmax(0,1fr) 78px minmax(0,1fr); align-items:start; gap:6px; }
.hf-mach .side{ font:700 13px/1.15 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); text-align:center; margin-top:4px; }
.hf-mach .src, .hf-mach .bin{ height:84px; border:1.5px solid var(--hf-line); border-radius:6px; background:var(--paper); overflow:hidden; position:relative; }
.hf-mach .src p, .hf-mach .bin p{ margin:0; font:600 13px/1.45 var(--mono); padding:3px 6px; white-space:nowrap; }
.hf-mach .bin p{ color:var(--hf-k); font-size:13px; letter-spacing:.02em; }
.hf-mach .box{ height:84px; border:2.5px solid var(--hf-line); border-radius:10px; background:var(--hf-grey); display:grid; place-items:center; position:relative; overflow:hidden; }
.hf-mach .box b{ font:800 13px/1.1 var(--body); letter-spacing:.06em; text-transform:uppercase; text-align:center; z-index:1; }
.hf-mach .gear{ position:absolute; width:46px; height:46px; color:color-mix(in srgb, var(--hf-k) 45%, transparent); animation:hf-spin 3.2s linear infinite; }
.hf-mach .gear.b{ width:32px; height:32px; right:4px; bottom:2px; animation-direction:reverse; animation-duration:2.2s; }
@keyframes hf-spin{ to{ transform:rotate(360deg); } }
.hf-mach .feed{ animation:hf-feed 4s linear infinite; }
@keyframes hf-feed{ from{ transform:translateY(0); } to{ transform:translateY(-50%); } }
.hf-mach .bug{ position:absolute; right:4px; top:4px; font:700 10.5px/1 var(--body); color:var(--hf-red); }
/* assembly line */
.hf-line{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; }
.hf-line .stn{ display:flex; gap:4px; padding:6px; background:var(--hf-grey); }
.hf-line .stn button{ flex:1 1 0; min-width:0; font:800 14px/1 var(--body); padding:0; min-height:34px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hf-line .stn button.on{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hf-line .stn button.past{ color:var(--ink); border-color:var(--hf-line); }
.hf-line .out{ padding:9px 10px 8px; height:206px; display:flex; flex-direction:column; gap:7px; }
.hf-line .lab{ font:800 13px/1.1 var(--body); text-transform:uppercase; letter-spacing:.07em; color:var(--graphite); margin:0; }
.hf-line .lab b{ color:var(--hf-k); }
.hf-line pre{ margin:0; font:600 13.5px/1.5 var(--mono); white-space:pre; color:var(--ink); }
.hf-line .chips{ display:flex; flex-wrap:wrap; gap:4px; }
.hf-line .chips span{ font:700 13px var(--mono); border:1.5px solid var(--hf-line); border-radius:5px; padding:2px 6px; animation:hf-up .4s both; }
.hf-line .tr{ font:600 13px/1.45 var(--mono); white-space:nowrap; }
.hf-line .tr i{ font-style:normal; color:var(--ok); font-family:var(--body); font-size:13px; }
.hf-line .tr .k{ color:var(--hf-k); }
.hf-line .hf-lbar{ display:flex; gap:8px; align-items:center; padding:0 10px 10px; }
.hf-line .hf-lbar .grow{ flex:1; }
.hf-dots{ display:flex; gap:5px; } .hf-dots i{ width:8px; height:8px; border-radius:50%; background:var(--hf-grey2); } .hf-dots i.on{ background:var(--hf-k); }
.hf-chain{ display:flex; flex-direction:column; align-items:flex-start; }
.hf-chain .pr{ font:700 14.5px/1.15 var(--body); padding:5px 10px; border:1.5px solid var(--hf-line); border-radius:999px; background:var(--paper); }
.hf-chain .ph{ margin-left:18px; font:600 13.5px/1 var(--body); color:var(--graphite); padding:5px 0 5px 12px; border-left:2px solid var(--hf-line); }
.hf-chain .ph b{ color:var(--hf-k); }
.hf-end{ text-align:center; display:grid; gap:10px; justify-items:center; }
/* language switch in the book's bar */
.hf-lang{ display:inline-flex; border:1px solid var(--line); border-radius:6px; overflow:hidden; background:var(--paper); flex:none; }
.hf-lang button{ border:0; background:none; cursor:pointer; min-width:44px; height:34px; padding:0 8px; font:600 .82rem var(--body); color:var(--graphite); }
.hf-lang button[lang="ar"]{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-lang button + button{ border-left:1px solid var(--line); }
.hf-lang button[aria-pressed="true"]{ background:var(--ink); color:var(--paper); }
/* Arabic: the whole book is mirrored so it opens and turns right to left; each page's own content is mirrored back */
.hf-ar .bbook .bpage > *{ transform:scaleX(-1); }
.hf-ar .bpage{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hfp, .hf-ar .hfrun, .hf-ar .hfnum{ direction:rtl; }
.hf-ar .hf-p, .hf-ar .hf-li, .hf-ar .hf-def, .hf-ar .hf-a, .hf-ar .hf-fire .ln, .hf-ar .hf-iv-l, .hf-ar .hf-bullets li, .hf-ar .hf-howto .row{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.6; }
.hf-ar .hf-p{ font-size:15px; } .hf-ar .hf-p.small, .hf-ar .hf-a, .hf-ar .hf-li, .hf-ar .hf-fire .ln, .hf-ar .hf-iv-l, .hf-ar .hf-bullets li, .hf-ar .hf-howto .row{ font-size:14px; }
.hf-ar .hf-h1, .hf-ar .hf-h2, .hf-ar .hf-h3, .hf-ar .hf-q, .hf-ar .hf-tag, .hf-ar .hf-dumbt b, .hf-ar .hf-iv-t, .hf-ar .hf-fire .who, .hf-ar .hf-chap .t, .hf-ar .hf-bub, .hf-ar .hf-btn, .hf-ar .hf-figh, .hf-ar .hf-match button, .hf-ar .hf-sort .it, .hf-ar .hf-chain .pr, .hf-ar .hf-chain .ph, .hf-ar .hf-line .lab, .hf-ar .hf-mach .side, .hf-ar .hf-toks span{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; }
.hf-ar .hf-h1{ font-weight:600; font-size:27px; line-height:1.3; } .hf-ar .hf-h2{ font-weight:600; font-size:20px; line-height:1.3; }
.hf-ar .hf-dumbt i, .hf-ar .hf-fire-sub, .hf-ar .hf-iv-s{ font-family:"IBM Plex Sans Arabic", var(--body); font-style:normal; }
.hf-ar .hf-hand{ font-family:"Aref Ruqaa", "Caveat", cursive; font-weight:700; font-size:19px; line-height:1.5; }
.hf-ar .hf-hand.hf-big{ font-size:23px; }
.hf-ar .hf-score{ font-family:"Aref Ruqaa", "Caveat", cursive; }
.hf-ar .hf-tag, .hf-ar .hf-fire .who, .hf-ar .hf-chap .t{ text-transform:none; }
.hf-ar .hf-iv-l{ line-height:1.5; } .hf-ar .hf-iv-l > b:first-child{ margin-right:0; margin-left:5px; text-transform:none; font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ul{ padding-left:0; padding-right:1.1em; list-style:none; }
/* Chrome paints list markers on the wrong side inside the mirrored book, so Arabic lists draw their own dots */
.hf-ar .hf-ul > li{ position:relative; } .hf-ar .hf-ul > li::before{ content:""; position:absolute; right:-.85em; top:.72em; width:5px; height:5px; border-radius:50%; background:var(--hf-k); }
.hf-ar .hf-bullets li{ padding-left:0; padding-right:16px; } .hf-ar .hf-bullets li::before{ left:auto; right:2px; top:.6em; }
.hf-ar .hf-mcq .hf-why[dir="rtl"]{ font-family:"IBM Plex Sans Arabic", var(--body); padding-left:0; padding-right:9px; border-left:0; border-right:3px solid var(--hf-k); text-align:right; }
.hf-ar .hf-code, .hf-ar .hf-tok, .hf-ar .hf-line pre, .hf-ar .hf-line .tr{ direction:ltr; text-align:left; }
.hf-ar .hf-code{ border-left:3px solid var(--hf-k); }
.hf-ar .hf-toks, .hf-ar .hf-line .chips, .hf-ar .hf-mcq{ direction:ltr; }
.hf-ar .hf-code .c{ font-family:"Aref Ruqaa", "Caveat", cursive; direction:rtl; font-size:16px; }
.hf-ar code, .hf-ar bdi{ direction:ltr; unicode-bidi:isolate; }
.hf-ar .ltr{ display:block; direction:ltr; unicode-bidi:isolate; text-align:left; }
.hf-ar .hf-bub::after{ left:auto; right:16px; transform:skewX(-30deg) rotate(45deg); }
.hf-ar .hf-talk.flip .hf-bub::after{ right:auto; left:16px; transform:skewX(30deg) rotate(45deg); }
.hf-ar .hf-note svg{ transform:scaleX(-1); }
.hf-ar .bfoot{ direction:rtl; }
.hf-ar .bbar{ direction:rtl; }
.hf-ar .hf-lang, .hf-ar .bzoom{ direction:ltr; }
.hf-ar .btitle .kicker, .hf-ar .btitle b{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-howto{ display:grid; gap:7px; }
.hf-howto .row{ display:grid; grid-template-columns:30px 1fr; gap:8px; align-items:start; font-size:14.5px; line-height:1.32; }
.hf-howto .row > span:first-child{ display:grid; place-items:center; color:var(--ink); }
.hf-howto .row b{ font-weight:600; }
.hf-howto .mk{ font:800 15px/30px var(--body); text-align:center; }
`;
  if (!document.getElementById('hf-css')) { const s = document.createElement('style'); s.id = 'hf-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── small drawings: icons and the characters who talk ── */
  const ICON = {
    brain: html`<svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 6c-3 0-5 2.2-5 5-2.2.6-3.4 2.4-3 4.6.3 1.6 1.4 2.6 2.6 3-.5 2.6 1.3 5 4 5.2.8 1.6 2.4 2.4 4.4 2.2V6.4C14.4 6.1 13.3 6 12 6z"/><path d="M20 6c3 0 5 2.2 5 5 2.2.6 3.4 2.4 3 4.6-.3 1.6-1.4 2.6-2.6 3 .5 2.6-1.3 5-4 5.2-.8 1.6-2.4 2.4-4.4 2.2V6.4C17.6 6.1 18.7 6 20 6z"/><path d="M9 13c1.4 0 2.4.8 2.8 2M23 13c-1.4 0-2.4.8-2.8 2M10 20c1 .2 2-.2 2.6-1M22 20c-1 .2-2-.2-2.6-1"/></svg>`,
    pencil: html`<svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M6 28l2-7L23 6l5 5-15 15z"/><path d="M8 21l5 5M20 9l5 5"/><path d="M6 28l3.5-1-2.5-2.5z" fill="currentColor"/></svg>`,
    watch: html`<svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l14 25H2z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M16 12v8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/><circle cx="16" cy="24" r="1.7" fill="currentColor"/></svg>`,
    relax: html`<svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="16" cy="16" r="12"/><path d="M10 19c3.2 3.4 8.8 3.4 12 0M11 13h3M18 13h3"/></svg>`,
    flame: html`<svg width="34" height="40" viewBox="0 0 34 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M17 3c2 7 10 10 10 20a10 10 0 0 1-20 0c0-5 3-7 4-11 2 3 2 5 4 6 1-5 0-10 2-15z"/><path d="M17 36a4.5 4.5 0 0 1-4.5-4.5c0-3 2.5-4 3-7 2 2 6 3.5 6 7a4.5 4.5 0 0 1-4.5 4.5z"/><path d="M4 38h26"/></svg>`,
    exam: html`<svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M7 3h14l5 5v21H7z"/><path d="M21 3v5h5M11 13h11M11 18h11M11 23h6"/></svg>`,
    bullets: html`<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="5" height="5" fill="currentColor"/><rect x="3" y="15" width="5" height="5" fill="currentColor"/><path d="M11 6.5h10M11 17.5h10" stroke="currentColor" strokeWidth="2"/></svg>`
  };
  // characters: simple line drawings in the page's ink colour
  const S = { fill: 'var(--paper)', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const WHO = {
    dev: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M12 62c0-12 9-18 20-18s20 6 20 18" ...${S}/><circle cx="32" cy="26" r="15" ...${S}/><path d="M17.5 22c2-9 9-12 15-12 7 0 12 4 14 11-5-1-10-4-12-8-3 5-10 8-17 9z" fill="currentColor"/><circle cx="26" cy="28" r="4.2" ...${S} strokeWidth="1.8"/><circle cx="38" cy="28" r="4.2" ...${S} strokeWidth="1.8"/><path d="M30.2 28h3.6M28 36c2.4 1.6 5.6 1.6 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    cpu: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M20 8v6M28 8v6M36 8v6M44 8v6M20 50v6M28 50v6M36 50v6M44 50v6M8 20h6M8 28h6M8 36h6M8 44h6M50 20h6M50 28h6M50 36h6M50 44h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><rect x="14" y="14" width="36" height="36" rx="4" ...${S}/><circle cx="26" cy="29" r="3" fill="currentColor"/><circle cx="38" cy="29" r="3" fill="currentColor"/><path d="M25 39h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><text x="32" y="23" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="currentColor" fontFamily="var(--mono)">0101</text></svg>`,
    compiler: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M32 4v7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="32" cy="4" r="2.4" fill="currentColor"/><rect x="14" y="11" width="36" height="24" rx="6" ...${S}/><circle cx="25" cy="23" r="3.2" fill="currentColor"/><circle cx="39" cy="23" r="3.2" fill="currentColor"/><path d="M27 30h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="18" y="38" width="28" height="22" rx="4" ...${S}/><circle cx="32" cy="49" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2.2"/><circle cx="32" cy="49" r="2" fill="currentColor"/></svg>`,
    interp: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="14" y="11" width="36" height="24" rx="12" ...${S}/><path d="M12 24c0-10 9-17 20-17s20 7 20 17" fill="none" stroke="currentColor" strokeWidth="2.4"/><rect x="8" y="20" width="7" height="11" rx="3" fill="currentColor"/><rect x="49" y="20" width="7" height="11" rx="3" fill="currentColor"/><path d="M49 30c0 6-5 8-10 8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="25" cy="23" r="3" fill="currentColor"/><circle cx="39" cy="23" r="3" fill="currentColor"/><rect x="18" y="38" width="28" height="22" rx="4" ...${S}/><path d="M24 46h16M24 52h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    table: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="8" y="8" width="48" height="48" rx="4" ...${S}/><path d="M8 20h48M8 32h48M8 44h48M26 8v48" stroke="currentColor" strokeWidth="1.6"/><circle cx="38" cy="26" r="2.6" fill="currentColor"/><circle cx="48" cy="26" r="2.6" fill="currentColor"/><path d="M37 37c3 2.6 9 2.6 12 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    // the operating system: a window with a face and a little crown (it is in charge)
    os: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M22 12l4-7 6 5 6-5 4 7z" fill="currentColor"/><rect x="8" y="13" width="48" height="40" rx="5" ...${S}/><path d="M8 22h48" stroke="currentColor" strokeWidth="2"/><circle cx="14" cy="17.5" r="1.6" fill="currentColor"/><circle cx="19.5" cy="17.5" r="1.6" fill="currentColor"/><circle cx="25" cy="34" r="3.2" fill="currentColor"/><circle cx="39" cy="34" r="3.2" fill="currentColor"/><path d="M25 43c4 3 10 3 14 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M24 53l-3 8M40 53l3 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>`,
    // a process: a running program, drawn as a small busy box on legs
    proc: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="14" y="10" width="36" height="34" rx="8" ...${S}/><path d="M20 18h10M20 23h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="26" cy="31" r="3" fill="currentColor"/><circle cx="38" cy="31" r="3" fill="currentColor"/><path d="M28 38h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M24 44l-6 10M40 44l6 10M18 54h-5M46 54h5M14 26l-7 6M50 26l7-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/></svg>`,
    // memory: a RAM stick with a face
    mem: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="6" y="18" width="52" height="26" rx="3" ...${S}/><path d="M12 44v6M18 44v6M24 44v6M30 44v6M36 44v6M42 44v6M48 44v6M54 44v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="10" y="23" width="9" height="7" rx="1" fill="currentColor"/><rect x="45" y="23" width="9" height="7" rx="1" fill="currentColor"/><circle cx="27" cy="29" r="2.8" fill="currentColor"/><circle cx="37" cy="29" r="2.8" fill="currentColor"/><path d="M28 36c2.4 1.6 5.6 1.6 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    // multimedia: a microphone (it samples sound), a loudspeaker (it plays it back), a video camera (frames and colour)
    mic: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="20" y="4" width="24" height="36" rx="12" ...${S}/><path d="M14 30c0 10 8 17 18 17s18-7 18-17M32 47v9M22 58h20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="27" cy="20" r="2.6" fill="currentColor"/><circle cx="37" cy="20" r="2.6" fill="currentColor"/><path d="M27 29c3 2 7 2 10 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    spk: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="12" y="6" width="34" height="52" rx="5" ...${S}/><circle cx="29" cy="40" r="11" ...${S}/><circle cx="29" cy="40" r="3.5" fill="currentColor"/><circle cx="23" cy="17" r="2.6" fill="currentColor"/><circle cx="35" cy="17" r="2.6" fill="currentColor"/><path d="M24 24c3 2 7 2 10 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M52 30c3 3 3 9 0 12M56 26c5 5 5 15 0 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    cam: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><rect x="6" y="20" width="38" height="28" rx="5" ...${S}/><path d="M44 30l14-8v24l-14-8z" ...${S}/><circle cx="16" cy="13" r="7" ...${S}/><circle cx="32" cy="13" r="7" ...${S}/><circle cx="19" cy="32" r="2.6" fill="currentColor"/><circle cx="31" cy="32" r="2.6" fill="currentColor"/><path d="M20 40c3 2 7 2 10 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    // software quality: a bug (the defect) and a magnifying glass (the tester who hunts it)
    bug: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M26 14l-6-8M38 14l6-8M14 30H4M14 40l-9 5M50 30h10M50 40l9 5M16 22l-8-5M48 22l8-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><ellipse cx="32" cy="38" rx="18" ry="21" ...${S}/><path d="M32 22v37" stroke="currentColor" strokeWidth="1.6"/><circle cx="25" cy="31" r="2.6" fill="currentColor"/><circle cx="39" cy="31" r="2.6" fill="currentColor"/><path d="M26 41c3 2 9 2 12 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    lens: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M40 42l16 16" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><circle cx="27" cy="27" r="21" ...${S}/><circle cx="20" cy="24" r="2.6" fill="currentColor"/><circle cx="34" cy="24" r="2.6" fill="currentColor"/><path d="M21 33c3 3 9 3 12 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    // a disk: a cylinder with a face
    disk: html`<svg viewBox="0 0 64 64" className="who-svg" aria-hidden="true"><path d="M12 16v32c0 5 9 9 20 9s20-4 20-9V16" ...${S}/><ellipse cx="32" cy="16" rx="20" ry="8" ...${S}/><ellipse cx="32" cy="16" rx="5" ry="2" fill="currentColor"/><circle cx="25" cy="35" r="3" fill="currentColor"/><circle cx="39" cy="35" r="3" fill="currentColor"/><path d="M27 44c3 2 7 2 10 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`
  };
  const Who = ({ w }) => WHO[w] || null;
  // a hand-drawn arrow for annotations
  const ARROWS = {
    down: 'M6 3c-2 8 0 15 6 21M12 24l-1-7M12 24l-7-2',
    up: 'M6 25c-2-8 0-15 6-21M12 4l-1 7M12 4l-7 2',
    left: 'M25 6C17 4 10 6 4 12M4 12l7-1M4 12l2-7',
    right: 'M3 6c8-2 15 0 21 6M24 12l-7-1M24 12l-2-7'
  };
  const Arrow = ({ d = 'down', size = 28 }) => html`<svg width=${size} height=${size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d=${ARROWS[d] || ARROWS.down} /></svg>`;

  // the book's context: the site's FigBlock, store and navigation, the course data, and the language ('en' or 'ar')
  const Kit = createContext({});
  const useAr = () => useContext(Kit).lang === 'ar';

  /* ── per-chapter state (exercise answers) that survives turning pages and closing the book ── */
  const Slots = createContext(null);
  function useSlot(id, init) {
    const ctx = useContext(Slots);
    const v = ctx && ctx.get(id);
    return [v === undefined ? init : v, nv => ctx && ctx.set(id, nv)];
  }

  /* ── building blocks for chapter pages ── */
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;
  const K = {
    html, calm, T, Arrow, Who, ICON, useSlot, useState, useEffect, useRef,
    H1: ({ children, cls }) => html`<h2 className=${'hf-h1 hf-in' + (cls ? ' ' + cls : '')}>${children}</h2>`,
    H2: ({ children }) => html`<h3 className="hf-h2 hf-in">${children}</h3>`,
    H3: ({ children }) => html`<h4 className="hf-h3">${children}</h4>`,
    P: ({ children, small }) => html`<p className=${'hf-p hf-in' + (small ? ' small' : '')}>${children}</p>`,
    UL: ({ items }) => html`<ul className="hf-ul hf-in">${items.map((x, i) => html`<li key=${i} className="hf-li">${typeof x === 'string' ? T(x) : x}</li>`)}</ul>`,
    Hand: ({ children, red, big, tilt, arrow, after }) => html`<div className=${'hf-note hf-in' + (red ? ' red' : '') + (tilt ? ' hf-tilt' : '')}>
      ${arrow && !after && html`<${Arrow} d=${arrow} />`}<p className=${'hf-hand' + (red ? ' red' : '') + (big ? ' hf-big' : '')}>${children}</p>${arrow && after && html`<${Arrow} d=${arrow} />`}</div>`,
    Def: ({ children }) => html`<div className="hf-def hf-in">${children}</div>`,
    Code: ({ lines }) => html`<div className="hf-code hf-in">${lines.map((l, i) => { const [c, n] = [].concat(l); return html`<div key=${i}>${c}${n ? html`<span className="c">${n}</span>` : null}</div>`; })}</div>`,
    Box: ({ kind, title, children }) => {
      const ar = useAr();
      const tag = ar
        ? { brain: [ICON.brain, 'شغّل مخك'], watch: [ICON.watch, 'خلّي بالك!'], relax: [ICON.relax, 'ريّح دماغك'], pencil: [ICON.pencil, 'امسك القلم'], exam: [ICON.exam, title || 'من الامتحانات اللي فاتت'], bullets: [ICON.bullets, 'الخلاصة'] }[kind]
        : { brain: [ICON.brain, 'Brain Power'], watch: [ICON.watch, 'Watch it!'], relax: [ICON.relax, 'Relax'], pencil: [ICON.pencil, 'Sharpen your pencil'], exam: [ICON.exam, title || "From the doctor's papers"], bullets: [ICON.bullets, 'Bullet points'] }[kind];
      return html`<div className=${'hf-box hf-in hf-' + kind}>
        ${tag && html`<p className="hf-tag">${tag[0]}<span>${title && kind !== 'exam' ? title : tag[1]}</span></p>`}
        ${children}</div>`;
    },
    Dumb: ({ qa }) => html`<div className="hf-box hf-dumb hf-in">${useAr() ? html`<p className="hf-dumbt"><i>مفيش حاجة اسمها</i><b>سؤال غبي</b></p>` : html`<p className="hf-dumbt"><i>there are no</i><b>Dumb Questions</b></p>`}
      ${qa.map(([q, a], i) => html`<${React.Fragment} key=${i}><p className="hf-q">${T(q)}</p><p className="hf-a">${T(a)}</p></${React.Fragment}>`)}</div>`,
    Bullets: ({ items }) => html`<div className="hf-box hf-bullets hf-in"><p className="hf-tag">${ICON.bullets}<span>${useAr() ? 'الخلاصة' : 'Bullet points'}</span></p><ul>${items.map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ul></div>`,
    Talk: ({ who, flip, think, children }) => html`<div className=${'hf-talk hf-in' + (flip ? ' flip' : '')}><${Who} w=${who} /><div className=${'hf-bub' + (think ? ' think' : '')}>${children}</div></div>`,
    Fireside: ({ a, b, sub }) => html`<div className="hf-in"><div className="hf-fire-h"><span style=${{ color: 'var(--hf-red)' }}>${ICON.flame}</span><div><h3 className="hf-h2">${useAr() ? 'دردشة جنب الدفاية' : 'Fireside Chats'}</h3>${sub && html`<p className="hf-fire-sub">${sub}</p>`}</div></div></div>`,
    Chat: ({ names, lines, start = 0 }) => html`<div className="hf-fire">
      ${names.map((n, i) => html`<div key=${'n' + i} className="who" style=${{ gridColumn: i + 1 }}>${n}</div>`)}
      ${lines.map(([side, t], i) => html`<p key=${i} className=${'ln hf-in ' + (side ? 'r' : 'l')} style=${{ animationDelay: calm() ? '0s' : (0.15 + i * 0.22) + 's' }}>${T(t)}</p>`)}</div>`,
    Interview: ({ title, sub, lines }) => html`<div className="hf-iv hf-in"><p className="hf-iv-t">${title}</p>${sub && html`<p className="hf-iv-s">${sub}</p>`}</div>
      ${lines.map(([who, t], i) => html`<p key=${i} className="hf-iv-l hf-in" style=${{ animationDelay: calm() ? '0s' : (0.1 + i * 0.12) + 's' }}><b>${who}:</b>${T(t)}</p>`)}`,
    Gap: ({ h = 6 }) => html`<div style=${{ height: h + 'px' }}></div>`,
    Grow: () => html`<div className="grow"></div>`
  };

  // one of the lecture's own visuals (figs-*.js), with an optional headline; the book passes in the site's FigBlock
  // A visual can grow as you step through it, so it gets the rest of the page and shrinks (down to `min`) whenever it would spill over;
  // past that it scrolls inside its frame, so its text never gets too small to read.
  K.Fig = function Fig({ name, head, min = 0.8 }) {
    const kit = useContext(Kit);
    const box = useRef(null), inner = useRef(null);
    const [s, setS] = useState(1);
    const sRef = useRef(1); sRef.current = s;
    useLayoutEffect(() => {
      const b = box.current, i = inner.current; if (!b || !i || typeof ResizeObserver !== 'function') return;
      let last = 0;
      const fit = () => {
        const avail = b.clientHeight, h = i.offsetHeight; if (!avail || h < 20) return;
        let ns = Math.max(min, Math.min(1, avail / h));
        const cur = sRef.current;
        b.classList.toggle('scroll', h * Math.max(ns, cur) > avail + 2);
        if (Math.abs(ns - cur) < 0.012) return;
        if (++last > 12) ns = Math.min(ns, cur);   // never ping-pong: settle on the smaller size
        setS(Math.round(ns * 1000) / 1000);
      };
      const ro = new ResizeObserver(fit); ro.observe(b); ro.observe(i);
      return () => ro.disconnect();
    }, []);
    return html`<div className="hf-fig hf-in">${head && html`<p className="hf-figh">${head}</p>`}
      <div className="hf-figbox" ref=${box}><div className="hf-figin" ref=${inner} style=${{ width: (100 / s) + '%', transform: s < 1 ? 'scale(' + s + ')' : null }}>
        <div dir="ltr"><${kit.FigBlock} name=${name} ar=${kit.lang === 'ar'} nosave=${true} /></div></div></div></div>`;
  };

  // Sharpen your pencil: put each statement in the right bin
  K.Sort = function Sort({ id, bins, items }) {
    const [pick, setPick] = useSlot(id, {});
    const [checked, setChecked] = useSlot(id + ':c', false);
    const right = items.filter((it, i) => pick[i] === it[1]).length;
    return html`<div className="hf-sort hf-in">
      ${items.map((it, i) => { const p = pick[i], st = checked && p != null ? (p === it[1] ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'it' + st}><span className="txt">${T(it[0])}${checked && p != null && p !== it[1] ? html` <span className="fix">${useAr() ? '← ' : '→ '}${bins[it[1]][1]}</span>` : null}</span>
          <span className="ch">${bins.map((b, j) => html`<button key=${j} aria-pressed=${String(p === j)} aria-label=${b[1]} title=${b[1]} onClick=${() => { setPick(Object.assign({}, pick, { [i]: j })); }}>${b[0]}</button>`)}</span></div>`; })}
      <div className="hf-row" style=${{ marginTop: '4px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${useAr() ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        ${checked && html`<span className="hf-score">${useAr() ? html`<bdi>${right} / ${items.length}</bdi> صح${right === items.length ? '!' : ''}` : right + ' / ' + items.length + ' right' + (right === items.length ? '!' : '')}</span>`}
        ${checked && html`<button className="hf-btn" onClick=${() => { setPick({}); setChecked(false); }}>${useAr() ? 'امسح' : 'Clear'}</button>`}
      </div></div>`;
  };

  // Be the scanner: tap a character to cut after it, and see if your cuts make the right tokens
  K.Scan = function Scan({ id, src, cuts, names }) {
    const [mine, setMine] = useSlot(id, []);
    const [checked, setChecked] = useSlot(id + ':c', false);
    const chars = [...src];
    const set = new Set(mine), good = new Set(cuts);
    const ok = checked && mine.length === cuts.length && cuts.every(c => set.has(c));
    const toggle = i => { if (i >= chars.length - 1) return; setChecked(false); setMine(set.has(i) ? mine.filter(x => x !== i) : mine.concat(i)); };
    const toks = []; let s = 0; [...cuts].sort((a, b) => a - b).concat(chars.length - 1).forEach(c => { toks.push(src.slice(s, c + 1)); s = c + 1; });
    return html`<div className="hf-in">
      <div className=${'hf-tok' + (ok ? ' done' : '')} role="group" aria-label="Characters of the statement: tap one to cut after it">
        ${chars.map((ch, i) => html`<button key=${i} className=${set.has(i) ? 'cut' : ''} aria-pressed=${String(set.has(i))} aria-label=${'Cut after ' + ch} onClick=${() => toggle(i)}><span>${ch}</span></button>`)}
      </div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" onClick=${() => setChecked(true)} disabled=${!mine.length}>${useAr() ? 'صحّح القطعات' : 'Check my cuts'}</button>
        <button className="hf-btn" onClick=${() => { setMine(cuts.slice()); setChecked(true); }}>${useAr() ? 'ورّيني' : 'Show me'}</button>
      </div>
      ${checked && !ok && html`<p className="hf-hand red" style=${{ textAlign: 'center', marginTop: '6px' }}>${mine.filter(c => !good.has(c)).length ? (useAr() ? 'فيه قطعة قسمت token نصّين. ' : 'A cut splits a token. ') : ''}${cuts.filter(c => !set.has(c)).length ? (useAr() ? 'لسه فيه tokens لازقة في بعض.' : 'Some tokens are still glued together.') : ''}</p>`}
      ${ok && html`<div className="hf-toks" style=${{ marginTop: '8px' }}>${toks.map((t, i) => html`<span key=${i} className="hf-in" style=${{ animationDelay: calm() ? '0s' : i * 0.12 + 's' }}><code>${t}</code>${names[i]}</span>`)}</div>`}
    </div>`;
  };

  // Who does what? Tap an item on the left, then its job on the right
  K.Match = function Match({ id, left, right, answer }) {
    const [pairs, setPairs] = useSlot(id, {});
    const [checked, setChecked] = useSlot(id + ':c', false);
    const [sel, setSel] = useState(null);
    const usedBy = {}; Object.entries(pairs).forEach(([l, r]) => { usedBy[r] = +l; });
    const pickRight = j => {
      if (sel == null) return;
      const np = Object.assign({}, pairs);
      Object.keys(np).forEach(l => { if (np[l] === j) delete np[l]; });
      np[sel] = j; setPairs(np); setSel(null); setChecked(false);
    };
    const right_n = left.filter((_, i) => pairs[i] === answer[i]).length;
    const rows = Math.max(left.length, right.length);
    const cells = [];
    for (let i = 0; i < rows; i++) {
      const L = left[i], R = right[i];
      cells.push(L != null ? html`<button key=${'l' + i} className=${'l' + (sel === i ? ' sel' : '') + (checked && pairs[i] != null ? (pairs[i] === answer[i] ? ' ok' : ' no') : '')} onClick=${() => setSel(sel === i ? null : i)} aria-pressed=${String(sel === i)}>
        <span className=${'hf-mtag' + (pairs[i] != null ? ' on' : '')}>${i + 1}</span>${T(L)}</button>` : html`<span key=${'l' + i}></span>`);
      cells.push(R != null ? html`<button key=${'r' + i} className=${checked && usedBy[i] != null ? (answer[usedBy[i]] === i ? 'ok' : 'no') : ''} onClick=${() => pickRight(i)} disabled=${sel == null && usedBy[i] == null}>
        <span className=${'hf-mtag' + (usedBy[i] != null ? ' on' : '')}>${usedBy[i] != null ? usedBy[i] + 1 : '?'}</span>${T(R)}</button>` : html`<span key=${'r' + i}></span>`);
    }
    return html`<div className="hf-in">
      <div className="hf-match">${cells}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(pairs).length} onClick=${() => setChecked(true)}>${useAr() ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; answer.forEach((r, l) => { p[l] = r; }); setPairs(p); setChecked(true); setSel(null); }}>${useAr() ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score">${right_n} / ${left.length}</span>`}
      </div></div>`;
  };

  // one of the doctor's questions from the course data, answered on the page with the reason from the site's explanations
  K.MCQ = function MCQ({ q, id, why }) {
    const [p, setP] = useSlot(id, null);
    const ar = useAr();
    if (!q) return null;
    const strip = s => String(s).replace(/<[^>]+>/g, '');
    return html`<div className="hf-mcq hf-in" dir="ltr">
      ${q.src && html`<p className="src">${strip(q.src)}</p>`}
      <p className="q">${T(q.q)}</p>
      <div className="hf-opts">${q.o.map((o, j) => html`<button key=${j} className=${p == null ? '' : j === q.a ? 'ok' : j === p ? 'no' : ''} onClick=${() => p == null && setP(j)} aria-pressed=${String(p === j)}>${String.fromCharCode(65 + j)}. ${T(o[0])}${p != null && j === q.a ? ' ✓' : ''}</button>`)}</div>
      ${p != null && (ar && why && why[p] ? html`<p className="hf-why" dir="rtl" lang="ar">${T(why[p])}</p>` : html`<p className="hf-why" dir="ltr">${T(q.o[p][1])}</p>`)}
    </div>`;
  };

  // reveal-on-tap answer
  K.Reveal = function Reveal({ id, label, children }) {
    const [open, setOpen] = useSlot(id, false);
    return html`<div className="hf-in">${open ? children : html`<button className="hf-btn" onClick=${() => setOpen(true)}>${label || (useAr() ? 'ورّيني الإجابة' : 'Show the answer')}</button>`}</div>`;
  };

  // a button that leaves the book for another part of the site
  K.Go = function Go({ to, children, solid }) {
    const kit = useContext(Kit);
    return html`<button className=${'hf-btn' + (solid ? ' solid' : '')} onClick=${() => kit.leave(to)}>${children}</button>`;
  };
  K.useKit = () => useContext(Kit);

  /* ── the book: fixed-size pages laid out by hand, shown one at a time on a phone and as spreads on a wide screen ── */
  const PW = 380, PH = 600;
  function HFBook({ k, n, kit, lang, setLang, onClose }) {
    const ar = lang === 'ar';
    const chapter = useMemo(() => { const ch = window.HF.chapters[k][n]; const kl = Object.assign({}, kit, { lang }); return Object.assign({}, ch, ar && ch.ar ? ch.ar : {}, { pages: ch.pages(K, kl) }); }, [k, n, lang]);
    const pages = chapter.pages, total = pages.length;
    const stageRef = useRef(null);
    const [stage, setStage] = useState({ w: innerWidth, h: Math.max(300, innerHeight - 120) });
    useEffect(() => {
      const el = stageRef.current; if (!el) return;
      const ro = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }));
      ro.observe(el); return () => ro.disconnect();
    }, []);
    useEffect(() => { const r = document.documentElement, prev = r.style.overflow; r.style.overflow = 'hidden'; return () => { r.style.overflow = prev; }; }, []);

    // exercise answers, kept per chapter
    const slotKey = 'hf:' + k + ':' + n;
    const [slots, setSlots] = useState(() => kit.store.get(slotKey, {}));
    const slotApi = useMemo(() => ({ get: id => slots[id], set: (id, v) => setSlots(s => { const ns = Object.assign({}, s, { [id]: v }); kit.store.set(slotKey, ns); return ns; }) }), [slots]);

    const spread = stage.w >= 760 && stage.w > stage.h * 0.95;
    const bookW = spread ? PW * 2 : PW, bookH = PH;
    const fit = Math.max(0.2, Math.min((stage.w - 24) / (bookW + 28), (stage.h - 20) / (bookH + 24)));
    const [z, setZ] = useState(1);
    const zRef = useRef(1); zRef.current = z;
    const scale = fit * z;
    const step = spread ? 2 : 1;
    // spreads are pages [0, 1], [2, 3], …: page 0 (how to use the chapter) faces the opener
    const norm = p => { p = Math.max(0, Math.min(total - 1, p)); return spread ? p - (p % 2) : p; };
    const posKey = 'hfpos:' + k + ':' + n;
    const [p, setP] = useState(() => kit.store.get(posKey, 0));
    const [turn, setTurn] = useState(null);
    const page = norm(p);
    useEffect(() => { kit.store.set(posKey, page); }, [page]);
    const spreadOf = q => [q, q + 1];
    const here = () => turn ? turn.to : page;
    const nextOf = q => q + step;
    const prevOf = q => q - step;
    const turnTo = target => {
      const base = here(), busy = !!turn;
      if (target > total - 1 || target < 0) return;
      target = norm(target);
      if (target === base) { if (busy) { setTurn(null); setP(base); } return; }
      const adjacent = target === nextOf(base) || target === prevOf(base);
      if (busy || calm() || !adjacent) { setTurn(null); setP(target); return; }
      setTurn({ dir: target > base ? 1 : -1, from: base, to: target, go: false });
      requestAnimationFrame(() => requestAnimationFrame(() => setTurn(t => t && Object.assign({}, t, { go: true }))));
    };
    const finish = () => setTurn(t => { if (t) setP(t.to); return null; });
    useEffect(() => { if (!turn || !turn.go) return; const id = setTimeout(finish, 760); return () => clearTimeout(id); }, [turn && turn.go]);
    const next = () => { const t = nextOf(here()); if (t <= total - 1) turnTo(t); };
    const prev = () => { const t = prevOf(here()); if (t >= 0) turnTo(t); };

    const zoomAt = (nz, cx, cy) => {
      const st = stageRef.current; nz = Math.max(1, Math.min(4, nz));
      if (!st || Math.abs(nz - zRef.current) < 0.001) return;
      const r = st.getBoundingClientRect();
      if (cx == null) { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
      const ratio = nz / zRef.current, px = cx - r.left + st.scrollLeft, py = cy - r.top + st.scrollTop;
      ReactDOM.flushSync(() => setZ(nz));
      st.scrollLeft = px * ratio - (cx - r.left); st.scrollTop = py * ratio - (cy - r.top);
    };

    const keys = useRef(null);
    keys.current = e => {
      if (e.target.matches && e.target.matches('input[type="text"], textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
      const kk = e.key;
      // an Arabic book reads from right to left, so the left arrow goes forward
      if (kk === (ar ? 'ArrowLeft' : 'ArrowRight') || kk === 'PageDown') next();
      else if (kk === (ar ? 'ArrowRight' : 'ArrowLeft') || kk === 'PageUp') prev();
      else if (kk === 'Home') turnTo(0);
      else if (kk === 'End') turnTo(total - 1);
      else if (kk === '+' || kk === '=') zoomAt(zRef.current + 0.25);
      else if (kk === '-') zoomAt(zRef.current - 0.25);
      else if (kk === '0') zoomAt(1);
      else if (kk === 'Escape') onClose();
      else return;
      e.preventDefault();
    };
    useEffect(() => { const f = e => keys.current(e); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f); }, []);

    const wheelAcc = useRef({ v: 0, t: 0 });
    useEffect(() => {
      const st = stageRef.current; if (!st) return;
      const onWheel = e => {
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); zoomAt(zRef.current * Math.exp(-e.deltaY * 0.0022), e.clientX, e.clientY); return; }
        if (zRef.current > 1.02) return;
        // a tall visual scrolls inside its own frame
        const fb = e.target.closest && e.target.closest('.hf-figbox.scroll');
        if (fb && Math.abs(e.deltaY) > Math.abs(e.deltaX) && (e.deltaY > 0 ? fb.scrollTop + fb.clientHeight < fb.scrollHeight - 1 : fb.scrollTop > 0)) return;
        e.preventDefault();
        const a = wheelAcc.current, now = Date.now();
        if (now - a.t < 650) return;
        a.v += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(a.v) > 90) { a.t = now; const d = a.v; a.v = 0; keys.current({ key: d > 0 ? 'ArrowRight' : 'ArrowLeft', target: st, preventDefault() {} }); }
      };
      st.addEventListener('wheel', onWheel, { passive: false });
      return () => st.removeEventListener('wheel', onWheel);
    }, []);

    // swipe or tap a page edge to turn; taps on the page's own buttons and visuals are theirs
    const ptr = useRef({ pts: new Map(), pinch: null, start: null, lastTap: 0 });
    const onDown = e => {
      const P = ptr.current; P.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (P.pts.size === 2) { const [a, b] = [...P.pts.values()]; P.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: zRef.current }; P.start = null; }
      else if (P.pts.size === 1) P.start = { x: e.clientX, y: e.clientY, t: Date.now(), type: e.pointerType, own: !!(e.target.closest && e.target.closest('button, input, select, a, label, .fig-host, [data-int]')) };
    };
    const onMove = e => {
      const P = ptr.current; if (!P.pts.has(e.pointerId)) return;
      P.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (P.pinch && P.pts.size === 2) { const [a, b] = [...P.pts.values()]; zoomAt(P.pinch.z * Math.hypot(a.x - b.x, a.y - b.y) / P.pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2); }
    };
    const onUp = e => {
      const P = ptr.current; P.pts.delete(e.pointerId);
      if (P.pts.size < 2) P.pinch = null;
      const s0 = P.start; P.start = null;
      if (!s0 || P.pts.size) return;
      const dx = e.clientX - s0.x, dy = e.clientY - s0.y, moved = Math.hypot(dx, dy);
      if (s0.type !== 'mouse' && zRef.current <= 1.02 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) { (ar ? dx > 0 : dx < 0) ? next() : prev(); return; }
      if (s0.own || moved > 8 || (window.getSelection && String(window.getSelection()).length)) return;
      const now = Date.now();
      if (s0.type !== 'mouse' && now - P.lastTap < 300) { P.lastTap = 0; zoomAt(zRef.current > 1.3 ? 1 : 2, e.clientX, e.clientY); return; }
      P.lastTap = now;
      if (zRef.current > 1.02) return;
      const book = stageRef.current && stageRef.current.querySelector('.bbook'); if (!book) return;
      const r = book.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
      if (x > 0.86) ar ? prev() : next(); else if (x < 0.14) ar ? next() : prev();
    };

    const runL = chapter.run || chapter.title;
    const pageEl = (i, side, key) => {
      if (i == null || i < 0 || i >= total) return html`<div key=${key} className=${'bpage blank ' + side}></div>`;
      const pg = pages[i];
      return html`<div key=${key} className=${'bpage ' + side} aria-hidden=${key === 'leaf-f' || key === 'leaf-b' ? 'true' : null} data-hfpage=${i}>
        ${i > 0 && html`<div className="hfrun">${side === 'left' ? html`<span>${runL}</span><span></span>` : html`<span></span><span>${runL}</span>`}</div>`}
        <div className=${'hfp' + (pg.center ? ' center' : '')}>${pg.el}</div>
        <div className="hfnum">${ar ? (side === 'left' ? html`<span>إنت هنا ◂ <b>${i + 1}</b></span>` : html`<span><b>${i + 1}</b>  ${chapter.kicker}</span>`) : side === 'left' ? html`<span><b>${i + 1}</b>  ${chapter.kicker}</span>` : html`<span>you are here ▸ <b>${i + 1}</b></span>`}</div>
      </div>`;
    };

    let left = null, right = null, leaf = null;
    if (spread) {
      [left, right] = spreadOf(page);
      if (turn && turn.dir > 0) { const [fl, fr] = spreadOf(turn.from), [tl, tr] = spreadOf(turn.to); left = fl; right = tr; leaf = { cls: 'fwd spread', f: [fr, 'right'], b: [tl, 'left'] }; }
      if (turn && turn.dir < 0) { const [fl, fr] = spreadOf(turn.from), [tl, tr] = spreadOf(turn.to); left = tl; right = fr; leaf = { cls: 'back', f: [fl, 'left'], b: [tr, 'right'] }; }
    } else {
      right = page;
      if (turn && turn.dir > 0) { right = turn.to; leaf = { cls: 'fwd', f: [turn.from, 'right'], b: [null, 'left'] }; }
      if (turn && turn.dir < 0) { right = turn.from; leaf = { cls: 'in', f: [turn.to, 'right'], b: [null, 'left'] }; }
    }
    const shown = spread ? spreadOf(page).filter(x => x != null && x < total) : [page];
    const label = ar ? (shown.length > 1 ? 'صفحة ' + (shown[0] + 1) + '–' + (shown[1] + 1) + ' من ' + total : 'صفحة ' + (shown[0] + 1) + ' من ' + total)
      : shown.length > 1 ? 'Pages ' + (shown[0] + 1) + '–' + (shown[1] + 1) + ' of ' + total : 'Page ' + (shown[0] + 1) + ' of ' + total;
    const shortLabel = (shown[shown.length - 1] + 1) + ' / ' + total;
    const atEnd = nextOf(here()) > total - 1, atStart = here() === 0;
    const secs = pages.map((pg, i) => [pg.sec, i]).filter(x => x[0]);
    let secNow = 0; secs.forEach(([, i], j) => { if (i <= shown[shown.length - 1]) secNow = j; });
    const kitV = useMemo(() => Object.assign({}, kit, { lang, leave: to => kit.go(Object.assign({ hf: null }, to)) }), [kit, lang]);

    return html`<${Kit.Provider} value=${kitV}><${Slots.Provider} value=${slotApi}>
      <div className=${'bookmode hfb' + (ar ? ' hf-ar' : '')} dir=${ar ? 'rtl' : 'ltr'} lang=${ar ? 'ar' : 'en'} style=${{ '--hf-k': 'var(--k-' + k + ', var(--k-compiler))' }} role="dialog" aria-modal="true" aria-label=${'Head First: ' + chapter.title}>
      <header className="bbar">
        <button className="btn ghost" onClick=${onClose} aria-label=${ar ? 'اقفل الكتاب' : 'Close the book'}>✕<span className="hide-s">${ar ? ' اقفل' : ' Close'}</span></button>
        <div className="btitle"><span className="kicker">Head First<span className="hide-s"> · ${chapter.kicker}</span></span><b>${chapter.title}</b></div>
        ${setLang && html`<div className="hf-lang" role="group" aria-label="Language"><button aria-pressed=${String(!ar)} onClick=${() => setLang('en')} lang="en">EN</button><button aria-pressed=${String(ar)} onClick=${() => setLang('ar')} lang="ar">عربي</button></div>`}
        <select className="secpick bsel" aria-label="Go to a part of the chapter" value=${secNow} onChange=${e => turnTo(secs[+e.target.value][1])}>
          ${secs.map(([t], j) => html`<option key=${j} value=${j}>${t}</option>`)}
        </select>
        <div className="bzoom" role="group" aria-label="Zoom">
          <button onClick=${() => zoomAt(zRef.current - 0.25)} disabled=${z <= 1} aria-label="Zoom out">−</button>
          <button className="zv" onClick=${() => zoomAt(1)} title="Fit the page (0)">${Math.round(z * 100)}%</button>
          <button onClick=${() => zoomAt(zRef.current + 0.25)} disabled=${z >= 4} aria-label="Zoom in">+</button>
        </div>
      </header>
      <div className=${'bstage' + (z > 1.02 ? ' zoomed' : '')} ref=${stageRef} onPointerDown=${onDown} onPointerMove=${onMove} onPointerUp=${onUp} onPointerCancel=${onUp}>
        <div className="bsizer" style=${{ width: (bookW + 28) * scale + 'px', height: (bookH + 24) * scale + 'px' }}>
          <div className=${'bbook' + (spread ? ' spread' : ' single')} style=${{ width: bookW + 'px', height: bookH + 'px', left: 14 * scale + 'px', top: 12 * scale + 'px', transform: ar ? 'translateX(' + bookW * scale + 'px) scale(' + -scale + ',' + scale + ')' : 'scale(' + scale + ')', '--pw': PW + 'px', '--ph': PH + 'px', '--px': '26px' }}>
            <div className="bcover" aria-hidden="true"></div>
            ${spread && pageEl(left, 'left', 'L' + left)}
            ${pageEl(right, 'right', 'R' + right)}
            ${leaf && html`<div className=${'bleaf ' + leaf.cls + (turn.go ? ' go' : '')} onTransitionEnd=${e => { if (e.target === e.currentTarget) finish(); }}>
              <div className="bface front">${pageEl(leaf.f[0], leaf.f[1], 'leaf-f')}</div>
              <div className="bface back">${pageEl(leaf.b[0], leaf.b[1], 'leaf-b')}</div>
            </div>`}
            ${spread && html`<div className="bspine" aria-hidden="true"></div>`}
          </div>
        </div>
      </div>
      <footer className="bfoot">
        <button className="bturn" onClick=${prev} disabled=${atStart} aria-label=${ar ? 'الصفحة اللي فاتت' : 'Previous page'}>${ar ? '›' : '‹'}</button>
        <input type="range" min="0" max=${Math.max(0, total - 1)} step="1" value=${page} aria-label="Page" onInput=${e => turnTo(+e.target.value)} />
        <span className="bplabel" aria-label=${label}><span className="lf">${label}</span><span className="ls" dir="ltr">${shortLabel}</span></span>
        <button className="bturn" onClick=${next} disabled=${atEnd} aria-label=${ar ? 'الصفحة الجاية' : 'Next page'}>${ar ? '‹' : '›'}</button>
      </footer>
    </div></${Slots.Provider}></${Kit.Provider}>`;
  }

  window.HF = window.HF || {};
  window.HF.Book = HFBook;
  window.HF.K = K;
  window.HF.chapters = window.HF.chapters || {};
})();

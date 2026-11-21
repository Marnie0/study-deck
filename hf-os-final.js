// Head First final revision for Operating Systems (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course in one book, built around what the final asks: a course map, the anatomy of the five past finals with a hot
// list, every lecture's must-knows with one figure, one trap and one check, then the four problems that come every year
// (CPU scheduling, first/best/worst fit, page replacement, the banker's algorithm) on the papers' own numbers and on fresh
// numbers of ours, the essays, cross-lecture showdowns, the doctors' questions, an exam-day page and the bullet points.
// Every Gantt chart, waiting time, placement, fault count, Need matrix and safe sequence below is computed by the small
// simulators in this file (sched, fit, simulate, safety) and was checked against the site's worked answers with a node script.
// Our own analogies, time plans, advice and practice numbers are labelled as ours.
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K; const { useState, useEffect, useMemo } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-osF')) {
    const s = document.createElement('style'); s.id = 'hf-css-osF';
    s.textContent = `
.hfb .hf-osF-ar{ font-family:"IBM Plex Sans Arabic", var(--body); }
/* self-rating */
.hfb .hf-osF-rate{ display:grid; gap:2px; }
.hfb .hf-osF-rate > div{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:6px; align-items:center; border-bottom:1px dotted var(--faint); padding-bottom:2px; }
.hfb .hf-osF-rate .nm{ font:600 13.5px/1.2 var(--body); color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.hfb .hf-osF-rate .nm b{ font-weight:800; color:var(--hf-k); margin-inline-end:4px; }
.hfb .hf-osF-rate .bt{ display:flex; gap:3px; }
.hfb .hf-osF-rate .bt button{ font:700 12.5px/1 var(--body); min-width:46px; height:24px; padding:0 5px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-osF-rate .bt button[aria-pressed="true"].r0{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-osF-rate .bt button[aria-pressed="true"].r1{ background:#D97706; border-color:#D97706; color:var(--paper); }
.hfb .hf-osF-rate .bt button[aria-pressed="true"].r2{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
.hfb .hf-osF-sum{ font:600 13.5px/1.35 var(--body); color:var(--ink); margin:0; }
.hfb .hf-osF-plan{ display:grid; gap:3px; margin:0; padding:0; list-style:none; }
.hfb .hf-osF-plan li{ display:grid; grid-template-columns:24px 1fr; gap:7px; align-items:start; font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-osF-plan li > b:first-child{ display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 12.5px/1 var(--body); }
.hf-ar .hf-osF-rate .nm, .hf-ar .hf-osF-rate .bt button, .hf-ar .hf-osF-sum, .hf-ar .hf-osF-plan li, .hf-ar .hf-osF-plan li > b:first-child{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-osF-plan li{ font-size:13.5px; line-height:1.5; }
/* opener star */
.hfb .hf-osF-star{ font:800 86px/0.8 var(--body); color:transparent; -webkit-text-stroke:2px var(--hf-line); }
/* course map */
.hfb .hf-osF-map{ position:relative; display:grid; gap:4px; padding-inline-start:36px; }
.hfb .hf-osF-map::before{ content:""; position:absolute; inset-inline-start:15px; top:14px; bottom:14px; width:4px; border-radius:2px; background:var(--hf-line); transform-origin:50% 0; animation:hf-osF-draw 1.2s cubic-bezier(.3,.7,.2,1) both; }
@keyframes hf-osF-draw{ from{ transform:scaleY(0); } }
.hfb .hf-osF-map .dot{ position:absolute; inset-inline-start:11px; width:12px; height:12px; border-radius:50%; background:var(--hf-k); box-shadow:0 0 0 3px var(--paper); animation:hf-osF-ride 7s linear infinite; }
@keyframes hf-osF-ride{ 0%{ top:10px; opacity:0; } 6%{ opacity:1; } 94%{ opacity:1; } 100%{ top:calc(100% - 22px); opacity:0; } }
.hfb .hf-osF-stop{ position:relative; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:2px 6px; align-items:center; text-align:start; padding:4px 7px; border-radius:8px; border:1.5px solid var(--hf-grey2); background:var(--paper); color:var(--ink); cursor:pointer; animation:hf-up .45s both; font:inherit; }
.hfb .hf-osF-stop::before{ content:attr(data-n); position:absolute; inset-inline-start:-33px; top:50%; margin-top:-13px; width:26px; height:26px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); background:var(--paper); color:var(--ink); border:2.5px solid var(--c); }
.hfb .hf-osF-stop.r0::before{ box-shadow:0 0 0 3px color-mix(in srgb, var(--hf-red) 45%, transparent); }
.hfb .hf-osF-stop.r1::before{ box-shadow:0 0 0 3px color-mix(in srgb, #D97706 45%, transparent); }
.hfb .hf-osF-stop.r2::before{ box-shadow:0 0 0 3px color-mix(in srgb, var(--ok) 45%, transparent); }
.hfb .hf-osF-stop[aria-pressed="true"]{ border-color:var(--hf-line); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-osF-stop .t{ font:800 13.5px/1.15 var(--body); }
.hfb .hf-osF-stop .d{ grid-column:1 / -1; font:500 12.5px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-osF-stop .g{ font:800 11.5px/1 var(--body); text-transform:uppercase; letter-spacing:.04em; padding:3px 5px; border-radius:99px; color:var(--paper); background:var(--c); white-space:nowrap; }
.hfb .hf-osF-card{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--hf-grey); display:grid; gap:4px; }
.hfb .hf-osF-card p{ margin:0; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-osF-card .lk{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-osF-card .lk span{ font:600 12.5px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:99px; padding:3px 7px; background:var(--paper); }
.hf-ar .hf-osF-stop .t, .hf-ar .hf-osF-stop .d, .hf-ar .hf-osF-stop .g, .hf-ar .hf-osF-card p, .hf-ar .hf-osF-card .lk span{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-osF-stop .d{ line-height:1.45; }
/* areas */
.hfb .hf-osF-areas{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-osF-areas > div{ border:2px solid var(--c); border-radius:8px; padding:6px 8px; background:color-mix(in srgb, var(--c) 9%, var(--paper)); }
.hfb .hf-osF-areas b{ display:block; font:800 14px/1.15 var(--body); color:var(--ink); }
.hfb .hf-osF-areas span{ display:block; font-size:13px; line-height:1.3; color:var(--ink); margin-top:2px; }
.hfb .hf-osF-areas i{ font-style:normal; font:700 12.5px/1 var(--body); color:var(--c); }
.hf-ar .hf-osF-areas b, .hf-ar .hf-osF-areas span, .hf-ar .hf-osF-areas i{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-osF-areas span{ line-height:1.45; }
/* anatomy: one stacked bar per paper */
.hfb .hf-osF-pap{ display:grid; gap:7px; }
.hfb .hf-osF-pap > div{ display:grid; gap:2px; }
.hfb .hf-osF-pap .h{ display:flex; justify-content:space-between; gap:6px; font:700 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-osF-pap .h span:last-child{ color:var(--graphite); font-weight:600; }
.hfb .hf-osF-pap .bar{ display:flex; height:22px; border:1.5px solid var(--hf-line); border-radius:4px; overflow:hidden; direction:ltr; }
.hfb .hf-osF-pap .bar span{ display:grid; place-items:center; font:700 12px/1 var(--body); color:var(--ink); border-right:1.4px solid var(--hf-line); white-space:nowrap; overflow:hidden; transform-origin:0 50%; animation:hf-osF-grow .6s cubic-bezier(.2,.7,.2,1) both; }
.hfb .hf-osF-pap .bar span:last-child{ border-right:0; }
@keyframes hf-osF-grow{ from{ transform:scaleX(0); } }
.hfb .hf-osF-pap .s{ font:500 12.5px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-osF-key{ display:flex; flex-wrap:wrap; gap:4px 12px; font:600 12.5px/1.2 var(--body); color:var(--graphite); }
.hfb .hf-osF-key i{ display:inline-block; width:12px; height:12px; border-radius:3px; vertical-align:-2px; margin-inline-end:4px; border:1px solid var(--hf-line); }
.hf-ar .hf-osF-pap .h, .hf-ar .hf-osF-pap .s, .hf-ar .hf-osF-key, .hf-ar .hf-osF-pap .bar span{ font-family:"IBM Plex Sans Arabic", var(--body); }
/* hot list */
.hfb .hf-osF-hot{ display:grid; gap:4px; }
.hfb .hf-osF-hot > div{ display:grid; grid-template-columns:minmax(0,1fr) 92px 26px; gap:6px; align-items:center; }
.hfb .hf-osF-hot .n{ font:600 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-osF-hot .n small{ display:block; font:500 11.5px/1.2 var(--body); color:var(--graphite); }
.hfb .hf-osF-hot .b{ display:flex; gap:2px; direction:ltr; }
.hfb .hf-osF-hot .b i{ flex:1 1 0; height:14px; border-radius:2px; background:var(--hf-grey2); }
.hfb .hf-osF-hot .b i.on{ background:var(--c); animation:hf-osF-pop .4s both; }
@keyframes hf-osF-pop{ from{ transform:scaleY(0); } }
.hfb .hf-osF-hot .c{ font:800 13px/1 var(--mono); color:var(--ink); text-align:end; direction:ltr; }
.hf-ar .hf-osF-hot .n, .hf-ar .hf-osF-hot .n small{ font-family:"IBM Plex Sans Arabic", var(--body); }
/* compact facts grid */
.hfb .hf-osF-kv{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:4px 8px; align-items:baseline; }
.hfb .hf-osF-kv > b{ font:800 12.5px/1.25 var(--body); color:var(--hf-k); text-transform:uppercase; letter-spacing:.03em; white-space:nowrap; }
.hfb .hf-osF-kv > span{ font-size:13.5px; line-height:1.3; color:var(--ink); }
.hf-ar .hf-osF-kv > b{ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; }
.hf-ar .hf-osF-kv > span{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.5; }
.hfb .hf-osF-cards{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-osF-cards > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); box-shadow:2px 2px 0 var(--hf-grey2); }
.hfb .hf-osF-cards b{ display:block; font:800 13.5px/1.15 var(--body); color:var(--ink); margin-bottom:2px; }
.hfb .hf-osF-cards span{ display:block; font-size:13px; line-height:1.28; color:var(--ink); }
.hf-ar .hf-osF-cards b, .hf-ar .hf-osF-cards span{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-osF-cards span{ line-height:1.45; }
.hfb .hf-osF-tb{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:13px; line-height:1.25; color:var(--ink); }
.hfb .hf-osF-tb th, .hfb .hf-osF-tb td{ border:1px solid var(--hf-line); padding:3px 5px; vertical-align:top; text-align:start; }
.hfb .hf-osF-tb thead th{ background:var(--hf-line); color:var(--paper); font:800 12.5px/1.15 var(--body); text-align:center; }
.hfb .hf-osF-tb tbody th{ background:var(--hf-grey); font:700 12.5px/1.2 var(--body); }
.hf-ar .hf-osF-tb{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:12.5px; line-height:1.4; }
.hf-ar .hf-osF-tb th{ font-family:"IBM Plex Sans Arabic", var(--body) !important; }
/* steps list */
.hfb .hf-osF-steps{ display:grid; gap:5px; margin:0; padding:0; list-style:none; }
.hfb .hf-osF-steps li{ display:grid; grid-template-columns:24px 1fr; gap:7px; align-items:start; font-size:14px; line-height:1.32; color:var(--ink); }
.hfb .hf-osF-steps li > b:first-child{ display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 12.5px/1 var(--body); }
.hf-ar .hf-osF-steps li, .hf-ar .hf-osF-steps li > b:first-child{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-osF-steps li{ font-size:13.5px; line-height:1.5; }
/* T/F rapid fire */
.hfb .hf-osF-tf{ border-bottom:1px dotted var(--line); padding-bottom:5px; }
.hfb .hf-osF-tf .hf-osF-tfr{ display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; }
.hfb .hf-osF-tf .q{ margin:0; font:600 13.5px/1.28 var(--body); }
.hfb .hf-osF-tf .src{ margin:0 0 2px; }
.hfb .hf-osF-tf .hf-opts{ display:flex !important; gap:4px; }
.hfb .hf-osF-tf .hf-opts button{ min-height:30px; padding:4px 7px; font-size:13px; }
.hfb .hf-osF-tf .hf-why{ margin-top:3px; }
/* Gantt charts and process tables */
.hfb .hf-osF-gt{ direction:ltr; text-align:left; }
.hfb .hf-osF-gt .hf-osF-bars{ display:flex; height:30px; border:1.6px solid var(--hf-line); border-radius:4px; overflow:hidden; background:var(--paper); }
.hfb .hf-osF-gt .hf-osF-bars > span{ display:grid; place-items:center; font:700 13px/1 var(--mono); color:var(--ink); border-right:1.4px solid var(--hf-line); min-width:0; overflow:hidden; white-space:nowrap; background:color-mix(in srgb, var(--c) 30%, var(--paper)); transform-origin:0 50%; }
.hfb .hf-osF-gt .hf-osF-bars > span:last-child{ border-right:0; }
.hfb .hf-osF-gt .hf-osF-bars > span.gr{ animation:hf-osF-grow .4s cubic-bezier(.2,.7,.2,1) both; }
.hfb .hf-osF-gt .hf-osF-bars > i{ flex:1 1 auto; display:grid; place-items:center; font:600 13px/1.2 var(--body); color:var(--graphite); font-style:normal; background:repeating-linear-gradient(45deg, transparent 0 6px, var(--hf-grey) 6px 12px); }
.hfb .hf-osF-tk{ position:relative; height:17px; font:600 12.5px/1 var(--mono); color:var(--graphite); }
.hfb .hf-osF-tk.two{ height:30px; }
.hfb .hf-osF-tk span{ position:absolute; top:3px; transform:translateX(-50%); }
.hfb .hf-osF-tk span.lo{ top:16px; }
.hfb .hf-osF-tk.top{ height:15px; } .hfb .hf-osF-tk.top span{ top:0; }
.hfb .hf-osF-tk span.first{ transform:none; } .hfb .hf-osF-tk span.last{ transform:translateX(-100%); }
.hfb .hf-osF-pt{ border-collapse:collapse; direction:ltr; font:600 13px/1.15 var(--mono); color:var(--ink); margin:0 auto; }
.hfb .hf-osF-pt th{ font:800 12.5px/1.1 var(--body); background:var(--hf-line); color:var(--paper); padding:4px 7px; }
.hfb .hf-osF-pt td{ border:1px solid var(--hf-grey2); padding:2px 7px; text-align:center; }
.hfb .hf-osF-pt td:first-child{ font-weight:800; }
.hfb .hf-osF-pt input{ width:40px; height:24px; font:700 13.5px/1 var(--mono); border:1.5px solid var(--faint); border-radius:5px; text-align:center; background:var(--hf-grey); color:var(--ink); padding:0; margin:0; }
.hfb .hf-osF-pt input.ok{ border-color:var(--ok); color:var(--ok); } .hfb .hf-osF-pt input.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-osF-avg{ font:700 13px/1.35 var(--mono); color:var(--hf-k); text-align:center; margin:0; direction:ltr; }
.hfb .hf-osF-tabs{ display:flex; gap:4px; direction:ltr; }
.hfb .hf-osF-tabs button{ flex:1 1 0; min-width:0; font:700 13px/1.05 var(--body); min-height:30px; padding:3px 2px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-osF-tabs button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hf-ar .hf-osF-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-osF-cap{ min-height:58px; font-size:13.5px; line-height:1.32; color:var(--ink); margin:0; padding:5px 8px; border-inline-start:3px solid var(--hf-hand); background:color-mix(in srgb, var(--hf-hand) 7%, var(--paper)); }
.hf-ar .hf-osF-cap{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.5; }
.hfb .hf-osF-ctl{ display:flex; gap:5px; align-items:center; flex-wrap:wrap; }
.hfb .hf-osF-ctl .hf-btn{ padding:6px 9px; min-height:30px; }
.hfb .hf-osF-ctl .hf-osF-step{ font:700 12.5px/1 var(--mono); color:var(--graphite); margin-inline-start:auto; direction:ltr; }
.hfb .hf-osF-stmt{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); display:grid; gap:5px; box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-osF-stmt .pp{ font:800 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--hf-red); margin:0; }
.hfb .hf-osF-stmt p{ margin:0; font-size:13.5px; line-height:1.32; color:var(--ink); }
.hf-ar .hf-osF-stmt .pp{ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; font-size:13px; }
.hf-ar .hf-osF-stmt p{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.5; }
.hfb .hf-osF-ours{ color:var(--hf-hand); }
/* fits */
.hfb .hf-osF-fg{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-osF-fg th, .hfb .hf-osF-fg td{ border:1px solid var(--hf-line); text-align:center; padding:0; height:34px; }
.hfb .hf-osF-fg thead th{ background:var(--hf-grey); font-weight:800; height:26px; }
.hfb .hf-osF-fg tbody th{ background:var(--hf-grey); color:var(--hf-k); font-weight:800; }
.hfb .hf-osF-fg td button{ width:100%; height:34px; border:0; margin:0; padding:0; background:var(--paper); color:var(--hf-hand); font:800 15px/1 var(--mono); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1px; }
.hfb .hf-osF-fg td button.sel{ background:color-mix(in srgb, var(--hf-hand) 16%, var(--paper)); }
.hfb .hf-osF-fg td button.ok{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); color:var(--ink); }
.hfb .hf-osF-fg td button.no{ background:color-mix(in srgb, var(--hf-red) 20%, var(--paper)); color:var(--ink); }
.hfb .hf-osF-fg td button small{ font:700 11.5px/1 var(--mono); color:var(--graphite); }
/* page replacement */
.hfb .hf-osF-ft{ border-collapse:collapse; width:100%; table-layout:fixed; font:600 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-osF-ft th, .hfb .hf-osF-ft td{ border:1px solid var(--hf-line); height:20px; padding:0; text-align:center; }
.hfb .hf-osF-ft th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-osF-ft .lb{ width:40px; background:var(--hf-grey); font:800 12.5px/1 var(--body); }
.hfb .hf-osF-ft td.nw{ font-weight:800; color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 13%, var(--paper)); }
.hfb .hf-osF-ft td.fl{ color:var(--hf-red); font-weight:800; }
.hfb .hf-osF-ft th.cur{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-osF-ft td.cur{ background:color-mix(in srgb, var(--hf-hand) 10%, var(--paper)); }
.hfb .hf-osF-fts{ display:grid; gap:5px; }
.hfb .hf-osF-rp{ border:2px solid var(--hf-line); border-radius:8px; padding:7px; display:grid; gap:6px; }
.hfb .hf-osF-ask{ font-size:13.5px; line-height:1.3; margin:0; color:var(--ink); }
.hfb .hf-osF-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-osF-opts button{ font:700 13px/1 var(--body); min-height:30px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-osF-bad{ font-size:13px; line-height:1.3; margin:0; color:var(--hf-red); }
.hfb .hf-osF-ok{ font-size:13px; line-height:1.3; margin:0; color:var(--ink); padding:4px 8px; border-inline-start:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hf-ar .hf-osF-ask, .hf-ar .hf-osF-bad, .hf-ar .hf-osF-ok, .hf-ar .hf-osF-opts button{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
/* banker */
.hfb .hf-osF-bk{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.25 var(--mono); color:var(--ink); }
.hfb .hf-osF-bk th, .hfb .hf-osF-bk td{ border:1px solid var(--hf-line); text-align:center; padding:3px 2px; white-space:nowrap; overflow:hidden; }
.hfb .hf-osF-bk thead th{ background:var(--hf-grey); font:800 12px/1.2 var(--body); }
.hfb .hf-osF-bk tbody th{ background:var(--hf-grey); color:var(--ink); font-weight:800; }
.hfb .hf-osF-bk td.k{ color:var(--hf-hand); font-weight:800; }
.hfb .hf-osF-in{ width:22px; height:25px; border:1.5px solid var(--faint); border-radius:4px; text-align:center; font:700 13.5px/1 var(--mono); background:var(--paper); color:var(--hf-hand); padding:0; margin:0 1px; }
.hfb .hf-osF-in.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-osF-in.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 14%, var(--paper)); color:var(--ink); }
.hfb .hf-osF-bk tr.done td, .hfb .hf-osF-bk tr.done th{ background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.hfb .hf-osF-bk tr.bad td, .hfb .hf-osF-bk tr.bad th{ background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); }
.hfb .hf-osF-bk th button{ width:100%; height:28px; font:800 13px/1 var(--mono); border:1.5px solid var(--hf-line); border-radius:5px; background:var(--paper); color:var(--ink); cursor:pointer; padding:0; }
.hfb .hf-osF-bk th button:disabled{ cursor:default; border-color:transparent; background:none; }
.hfb .hf-osF-work{ display:flex; justify-content:center; align-items:baseline; gap:8px; font:700 14px/1 var(--body); color:var(--ink); margin:0 0 5px; }
.hfb .hf-osF-work b{ font:800 17px/1 var(--mono); color:var(--hf-hand); }
.hfb .hf-osF-work b.pop{ animation:hf-osF-bump .45s ease; }
@keyframes hf-osF-bump{ 40%{ transform:scale(1.18); } }
.hfb .hf-osF-seq{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; min-height:24px; margin-top:5px; }
.hfb .hf-osF-seq span{ font:700 13px/1 var(--mono); border:1.5px solid var(--hf-line); border-radius:99px; padding:4px 8px; background:var(--paper); color:var(--ink); animation:hf-up .35s both; }
.hfb .hf-osF-seq span.x{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-osF-msg{ font:600 13.5px/1.35 var(--body); margin:5px 0 0; }
.hfb .hf-osF-msg.red{ color:var(--hf-red); } .hfb .hf-osF-msg.grn{ color:var(--ok); }
.hf-ar .hf-osF-msg{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
/* address translation */
.hfb .hf-osF-xl{ display:grid; gap:3px; }
.hfb .hf-osF-xr{ display:grid; grid-template-columns:minmax(0,1fr) 74px 48px 16px; gap:2px 5px; align-items:center; padding:1px 4px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-osF-xr.ok{ border-color:var(--ok); } .hfb .hf-osF-xr.no{ border-color:var(--hf-red); }
.hfb .hf-osF-xq{ font:700 13px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-osF-xr input{ width:100%; box-sizing:border-box; height:25px; font:700 13.5px/1 var(--mono); padding:0 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); }
.hfb .hf-osF-xr .trap{ height:25px; padding:0; font:700 12.5px/1 var(--mono); border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-osF-xr .trap[aria-pressed="true"]{ border-color:var(--hf-red); background:var(--hf-red); color:var(--paper); }
.hfb .hf-osF-xr .mk{ font:800 14px/1 var(--body); }
.hfb .hf-osF-xr.ok .mk{ color:var(--ok); } .hfb .hf-osF-xr.no .mk{ color:var(--hf-red); }
.hfb .hf-osF-xr .why{ grid-column:1 / -1; font:600 12.5px/1.2 var(--mono); color:var(--hf-hand); }
/* put in order */
.hfb .hf-osF-ord{ display:grid; gap:4px; }
.hfb .hf-osF-ord button{ display:grid; grid-template-columns:24px 1fr; gap:7px; align-items:center; text-align:start; font:500 13.5px/1.25 var(--body); padding:5px 8px; min-height:34px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-osF-ord button > i{ font-style:normal; display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:var(--hf-grey2); font:800 12.5px/1 var(--body); }
.hfb .hf-osF-ord button.on > i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-osF-ord button.ok{ border-color:var(--ok); } .hfb .hf-osF-ord button.no{ border-color:var(--hf-red); }
.hf-ar .hf-osF-ord button{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.45; }
/* condition breaker */
.hfb .hf-osF-brk{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-osF-brk button{ font:700 13.5px/1.2 var(--body); padding:6px; min-height:46px; border-radius:8px; border:2px solid var(--hf-line); background:color-mix(in srgb, var(--hf-red) 13%, var(--paper)); color:var(--ink); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; }
.hfb .hf-osF-brk button i{ font:600 12px/1 var(--body); font-style:normal; color:var(--hf-red); }
.hfb .hf-osF-brk button.off{ background:var(--paper); border-style:dashed; border-color:var(--ok); color:var(--graphite); }
.hfb .hf-osF-brk button.off b{ text-decoration:line-through; }
.hfb .hf-osF-brk button.off i{ color:var(--ok); }
.hf-ar .hf-osF-brk button, .hf-ar .hf-osF-brk button i{ font-family:"IBM Plex Sans Arabic", var(--body); }
/* cover-and-recall table */
.hfb .hf-osF-cov{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:12.5px; line-height:1.25; color:var(--ink); }
.hfb .hf-osF-cov th, .hfb .hf-osF-cov td{ border:1px solid var(--hf-line); padding:3px 4px; vertical-align:top; text-align:start; }
.hfb .hf-osF-cov thead th{ background:var(--hf-line); color:var(--paper); font:800 12.5px/1.1 var(--body); text-align:center; }
.hfb .hf-osF-cov tbody th{ background:var(--hf-grey); font:700 12px/1.2 var(--body); width:70px; }
.hfb .hf-osF-cov tbody th button{ all:unset; cursor:pointer; display:block; }
.hfb .hf-osF-cov td.hid{ background:repeating-linear-gradient(45deg, transparent 0 6px, var(--hf-grey) 6px 12px); color:transparent; cursor:pointer; }
.hf-ar .hf-osF-cov, .hf-ar .hf-osF-cov th{ font-family:"IBM Plex Sans Arabic", var(--body) !important; }
.hf-ar .hf-osF-cov{ font-size:12px; line-height:1.4; }
/* DMA counter */
.hfb .hf-osF-dma{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; direction:ltr; }
.hfb .hf-osF-dma > div{ border:1.6px solid var(--hf-line); border-radius:8px; padding:5px; text-align:center; background:var(--paper); }
.hfb .hf-osF-dma small{ display:block; font:700 11.5px/1.1 var(--body); text-transform:uppercase; letter-spacing:.04em; color:var(--graphite); }
.hfb .hf-osF-dma b{ display:block; font:800 17px/1.2 var(--mono); color:var(--hf-k); }
.hfb .hf-osF-dma > div.irq{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 11%, var(--paper)); }
/* time plan */
.hfb .hf-osF-tp{ display:flex; height:40px; border:2px solid var(--hf-line); border-radius:6px; overflow:hidden; direction:ltr; }
.hfb .hf-osF-tp span{ display:grid; place-items:center; text-align:center; font:700 11.5px/1.05 var(--body); color:var(--ink); border-right:1.5px solid var(--hf-line); background:color-mix(in srgb, var(--c) 28%, var(--paper)); padding:0 2px; overflow:hidden; transform-origin:0 50%; animation:hf-osF-grow .6s both; }
.hfb .hf-osF-tp span:last-child{ border-right:0; }
.hfb .hf-osF-tpx{ display:flex; justify-content:space-between; font:600 12px/1 var(--mono); color:var(--graphite); direction:ltr; margin-top:2px; }
.hf-ar .hf-osF-tp span{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-osF-chk{ display:grid; gap:4px; margin:0; padding:0; list-style:none; }
.hfb .hf-osF-chk li{ display:grid; grid-template-columns:18px 1fr; gap:6px; align-items:start; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-osF-chk li::before{ content:""; width:13px; height:13px; margin-top:2px; border:2px solid var(--hf-line); border-radius:3px; }
.hf-ar .hf-osF-chk li{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.5; }
.hfb .hf-osF-mq .hf-mcq .q{ font-size:14px; line-height:1.24; margin-bottom:4px; }
.hfb .hf-osF-px .hf-box{ padding:6px 8px; }
.hfb .hf-osF-px .hf-tag{ margin-bottom:2px; }
.hfb .hf-osF-mq .hf-mcq .src{ margin-bottom:3px; }
.hfb .hf-osF-mq .hf-mcq .hf-opts{ gap:3px; }
.hfb .hf-osF-mq .hf-mcq .hf-opts button{ padding:3px 8px; min-height:26px; font-size:13px; line-height:1.2; }
.hfb .hf-osF-mq .hf-mcq .hf-why{ font-size:13px; line-height:1.28; margin-top:4px; }
.hf-ar .hf-osF-mq .hf-mcq .hf-why[dir="rtl"]{ line-height:1.45; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-osF-map::before, .hfb .hf-osF-stop, .hfb .hf-osF-pap .bar span, .hfb .hf-osF-hot .b i.on, .hfb .hf-osF-gt .hf-osF-bars > span.gr, .hfb .hf-osF-tp span{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  /* ── the simulators: the same rules as the lectures' worked answers ── */
  // CPU scheduling. procs: [name, arrival, burst, priority]. algo: FCFS, SJF, PRIO (non-preemptive, smaller number = higher),
  // SRTF (preemptive SJF), RR (quantum q; a process arriving at the instant a quantum expires is queued before the preempted one).
  // Ties: earlier arrival, then table order. Each block keeps what the scheduler saw when it decided.
  function sched(procs, algo, q) {
    const P = procs.map((p, i) => ({ n: p[0], at: p[1], bt: p[2], pr: p[3], rem: p[2], i }));
    const ct = {}, blocks = []; let t = 0;
    const left = () => P.filter(p => p.rem > 0);
    if (algo === 'RR') {
      const queue = [], seen = new Set();
      const admit = up => P.filter(p => p.at <= up && !seen.has(p.i)).sort((a, b) => a.at - b.at || a.i - b.i).forEach(p => { seen.add(p.i); queue.push(p); });
      admit(0);
      while (left().length) {
        if (!queue.length) { t = Math.min(...P.filter(p => !seen.has(p.i)).map(p => p.at)); admit(t); continue; }
        const ready = queue.map(p => [p.n, p.rem]);
        const p = queue.shift(), run = Math.min(q, p.rem);
        blocks.push({ n: p.n, s: t, e: t + run, ready, done: run === p.rem, left: p.rem - run });
        t += run; p.rem -= run; admit(t);
        if (p.rem > 0) queue.push(p); else ct[p.n] = t;
      }
    } else if (algo === 'SRTF') {
      while (left().length) {
        const ready = left().filter(p => p.at <= t);
        if (!ready.length) { t = Math.min(...left().map(p => p.at)); continue; }
        ready.sort((a, b) => a.rem - b.rem || a.at - b.at || a.i - b.i);
        const p = ready[0], snap = ready.map(x => [x.n, x.rem]);
        // run until it finishes or a newcomer with a shorter burst arrives
        let e = t + p.rem; const nx = P.filter(x => x.at > t && x.at < e && x.bt < p.rem - (x.at - t)).sort((a, b) => a.at - b.at)[0];
        if (nx) e = nx.at;
        blocks.push({ n: p.n, s: t, e, ready: snap, done: e - t === p.rem, left: p.rem - (e - t), by: nx ? nx.n : null });
        p.rem -= e - t; t = e; if (!p.rem) ct[p.n] = t;
      }
    } else {
      const key = algo === 'FCFS' ? (a, b) => a.at - b.at || a.i - b.i : algo === 'SJF' ? (a, b) => a.bt - b.bt || a.at - b.at || a.i - b.i : (a, b) => a.pr - b.pr || a.at - b.at || a.i - b.i;
      while (left().length) {
        const ready = left().filter(p => p.at <= t);
        if (!ready.length) { t = Math.min(...left().map(p => p.at)); continue; }
        ready.sort(key); const p = ready[0];
        blocks.push({ n: p.n, s: t, e: t + p.bt, ready: ready.map(x => [x.n, algo === 'FCFS' ? x.at : algo === 'SJF' ? x.bt : x.pr]), done: true, left: 0 });
        t += p.bt; p.rem = 0; ct[p.n] = t;
      }
    }
    const wt = {}, tat = {};
    P.forEach(p => { tat[p.n] = ct[p.n] - p.at; wt[p.n] = tat[p.n] - p.bt; });
    return { blocks, ct, wt, tat };
  }
  // consecutive slices of the same process drawn as one block, as the papers' worked answers do
  const merge = bl => bl.reduce((a, b) => { const l = a[a.length - 1]; if (l && l[0] === b.n && l[2] === b.s) l[2] = b.e; else a.push([b.n, b.s, b.e]); return a; }, []);
  const fmt = x => String(+(+x).toFixed(2));

  // first-fit / best-fit / worst-fit on partitions (holes shrink as processes are placed). Answer: partition index or -1 (must wait)
  function fit(parts, procs, algo) {
    const h = parts.slice(), at = [], left = [];
    procs.forEach(p => {
      let k = -1;
      h.forEach((x, i) => { if (x < p) return; if (k < 0 || (algo === 'best' && x < h[k]) || (algo === 'worst' && x > h[k])) k = i; });
      if (algo === 'first') k = h.findIndex(x => x >= p);
      at.push(k); left.push(k < 0 ? null : h[k] - p); if (k >= 0) h[k] -= p;
    });
    return { at, left, holes: h };
  }

  // page replacement; a victim is replaced in its own frame (as in the papers' tables)
  function simulate(refs, nf, algo) {
    const fr = Array(nf).fill(null), loaded = Array(nf).fill(-1), last = {}, out = [];
    refs.forEach((p, t) => {
      const before = fr.slice();
      let slot = fr.indexOf(p), fault = false, victim = null, kind = 'hit';
      if (slot < 0) {
        fault = true; slot = fr.indexOf(null); kind = 'empty';
        if (slot < 0) {
          kind = 'replace';
          if (algo === 'FIFO') slot = loaded.indexOf(Math.min(...loaded));
          else if (algo === 'LRU') { let b = 0; fr.forEach((x, k) => { if (last[x] < last[fr[b]]) b = k; }); slot = b; }
          else { const nx = fr.map(x => { const k = refs.indexOf(x, t + 1); return k < 0 ? Infinity : k; }); let b = 0; nx.forEach((v, k) => { if (v > nx[b]) b = k; }); slot = b; }
          victim = fr[slot];
        }
        fr[slot] = p;
      }
      const info = before.map((x, k) => x == null ? null : algo === 'FIFO' ? loaded[k] + 1 : algo === 'LRU' ? last[x] + 1 : (() => { const n = refs.indexOf(x, t + 1); return n < 0 ? 0 : n + 1; })());
      if (fault) loaded[slot] = t;
      last[p] = t;
      out.push({ t, p, before, frames: fr.slice(), fault, slot, victim, kind, info });
    });
    return out;
  }
  const faultsOf = (refs, nf, algo) => simulate(refs, nf, algo).filter(x => x.fault).length;

  // banker's safety algorithm: scan P0…Pn in order, again and again, as the worked answers do
  const add = (a, b) => a.map((x, k) => x + b[k]);
  const le = (a, b) => a.every((x, k) => x <= b[k]);
  const vs = a => '(' + a.join(',') + ')';
  const needOf = (max, alloc) => max.map((m, i) => m.map((x, j) => x - alloc[i][j]));
  function safety(alloc, need, avail) {
    let w = avail.slice(); const fin = alloc.map(() => false), seq = [];
    for (let go = true; go;) { go = false; for (let i = 0; i < alloc.length; i++) if (!fin[i] && le(need[i], w)) { w = add(w, alloc[i]); fin[i] = true; seq.push(i); go = true; } }
    return { safe: fin.every(Boolean), seq, work: w };
  }
  H.osFinalSim = { sched, fit, simulate, safety, needOf };   // exposed for the node check only

  const PC = { P0: '#0891B2', P1: '#2563EB', P2: '#D97706', P3: '#059669', P4: '#DB2777', P5: '#7C3AED' };
  const RN = ['A', 'B', 'C', 'D'];
  const num = s => String(s == null ? '' : s).replace(/[^0-9]/g, '').slice(0, 3);

  /* ── page 0: how ready am I? ── */
  const LNAMES = [
    ['Introduction', 'المقدمة'], ['Processes and IPC', 'الـ Processes والـ IPC'], ['CPU scheduling', 'الـ CPU scheduling'], ['Main memory', 'الـ Main memory'],
    ['Virtual memory', 'الـ Virtual memory'], ['Deadlocks', 'الـ Deadlocks'], ['File system', 'الـ File system'], ['I/O systems', 'الـ I/O systems']];
  function Rate() {
    const ar = useAr();
    const [r, setR] = H.K.useSlot('rate', {});
    const lab = ar ? ['ضعيف', 'تمام', 'ممتاز'] : ['shaky', 'OK', 'solid'];
    const shaky = LNAMES.map((_, i) => i + 1).filter(n => r[n] === 0);
    const rated = Object.keys(r).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '5px' }}>
      <div className="hf-osF-rate">${LNAMES.map((nm, i) => html`<div key=${i}>
        <span className="nm"><b>${ar ? 'م' : 'L'}${i + 1}</b>${ar ? nm[1] : nm[0]}</span>
        <span className="bt">${lab.map((l, j) => html`<button key=${j} className=${'r' + j} aria-pressed=${String(r[i + 1] === j)} onClick=${() => setR(Object.assign({}, r, { [i + 1]: j }))}>${l}</button>`)}</span></div>`)}</div>
      <p className="hf-osF-sum">${!rated ? (ar ? 'قيّم نفسك بصراحة؛ الخريطة في الصفحة الجاية هتلوّن كل محطة بتقييمك.' : 'Be honest: the map on the next pages colours each stop with your rating.')
        : shaky.length ? (ar ? html`ابدأ بـ: ${shaky.map(n => 'م' + n).join('، ')}. وأي محاضرة فيها مسألة (3 و4 و5 و6) ليها الأولوية.` : 'Start with: ' + shaky.map(n => 'L' + n).join(', ') + '. Lectures with a problem (3, 4, 5, 6) come first.')
        : (ar ? 'مفيش حاجة ضعيفة؟ يبقى روح على المسائل على طول وحلها من غير ما تبص.' : 'Nothing shaky? Then go straight to the problems and do them without peeking.')}</p>
    </div>`;
  }

  /* ── the course map: eight stops, what each lets you do, and how they connect ── */
  const AREA = { base: '#64748B', cpu: '#2563EB', mem: '#059669', dl: '#DC2626', io: '#7C3AED' };
  const STOPS = [
    { a: 'base', t: ['Introduction', 'المقدمة'], g: ['basics', 'أساسيات'], d: ['define the OS; trap vs interrupt; storage; DMA; dual mode', 'تعريف الـ OS؛ الـ trap والـ interrupt؛ الـ storage؛ الـ DMA؛ الـ dual mode'],
      lk: [[2, 'the OS runs processes', 'الـ OS بيشغّل الـ processes'], [8, 'interrupts and DMA come back', 'الـ interrupts والـ DMA راجعين تاني']] },
    { a: 'cpu', t: ['Processes and IPC', 'الـ Processes والـ IPC'], g: ['cpu', 'الـ CPU'], d: ['draw the 5 states; PCB; the 3 schedulers; zombie vs orphan', 'ترسم الـ 5 states؛ الـ PCB؛ الـ 3 schedulers؛ الـ zombie والـ orphan'],
      lk: [[3, 'the ready queue feeds the scheduler', 'الـ ready queue بتأكّل الـ scheduler'], [6, 'processes hold resources', 'الـ processes بتمسك resources']] },
    { a: 'cpu', t: ['CPU scheduling', 'الـ CPU scheduling'], g: ['problem', 'مسألة'], d: ['Gantt charts and waiting times: FCFS, SJF, SRTF, RR, priority', 'الـ Gantt charts والـ waiting times: الـ FCFS والـ SJF والـ SRTF والـ RR والـ priority'],
      lk: [[6, 'starvation is not deadlock', 'الـ starvation مش deadlock'], [5, 'FCFS and FIFO: same idea, two jobs', 'الـ FCFS والـ FIFO: نفس الفكرة لشغلانتين']] },
    { a: 'mem', t: ['Main memory', 'الـ Main memory'], g: ['problem', 'مسألة'], d: ['first, best, worst fit; base and limit; (s, d) → address; fragmentation', 'الـ first والـ best والـ worst fit؛ الـ base والـ limit؛ ترجمة (s, d)؛ الـ fragmentation'],
      lk: [[5, 'paging becomes demand paging', 'الـ paging بيبقى demand paging']] },
    { a: 'mem', t: ['Virtual memory', 'الـ Virtual memory'], g: ['problem', 'مسألة'], d: ['count page faults with FIFO, Optimal and LRU; Belady', 'تعدّ الـ page faults بالـ FIFO والـ Optimal والـ LRU؛ الـ Belady'],
      lk: [[4, 'the page table gets a valid bit', 'الـ page table بقى فيها valid bit'], [8, 'a page fault is a trap', 'الـ page fault ده trap']] },
    { a: 'dl', t: ['Deadlocks', 'الـ Deadlocks'], g: ['problem', 'مسألة'], d: ['the 4 conditions; Need = Max − Allocation; safe sequence', 'الـ 4 شروط؛ الـ Need؛ الـ safe sequence'],
      lk: [[2, 'who holds what', 'مين ماسك إيه'], [3, 'aging cures starvation, not deadlock', 'الـ aging بيعالج الـ starvation مش الـ deadlock']] },
    { a: 'io', t: ['File system', 'الـ File system'], g: ['essay', 'مقالي'], d: ['contiguous, linked and indexed allocation compared', 'مقارنة الـ contiguous والـ linked والـ indexed allocation'],
      lk: [[8, 'disks are block devices', 'الـ disks دي block devices']] },
    { a: 'io', t: ['I/O systems', 'الـ I/O systems'], g: ['essay', 'مقالي'], d: ['polling vs interrupts; the 6 DMA steps; DMA advantages', 'الـ polling والـ interrupts؛ الـ 6 خطوات بتوع الـ DMA؛ مميزات الـ DMA'],
      lk: [[1, 'DMA was first met in Lecture 1', 'الـ DMA قابلناه أول مرة في محاضرة 1']] }
  ];
  function CourseMap() {
    const ar = useAr();
    const [sel, setSel] = H.K.useSlot('map', 3);
    const [r] = H.K.useSlot('rate', {});
    const S = STOPS[sel - 1];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-osF-map" role="group" aria-label="Course map: eight lectures">
        ${!calm() && html`<span className="dot" aria-hidden="true"></span>`}
        ${STOPS.map((s, i) => html`<button key=${i} className=${'hf-osF-stop' + (r[i + 1] != null ? ' r' + r[i + 1] : '')} data-n=${i + 1} aria-pressed=${String(sel === i + 1)} onClick=${() => setSel(i + 1)}
          style=${{ '--c': AREA[s.a], animationDelay: calm() ? '0s' : (0.1 + i * 0.08) + 's' }}>
          <span className="t">${ar ? s.t[1] : s.t[0]}</span><span className="g">${ar ? s.g[1] : s.g[0]}</span>
          ${sel === i + 1 && html`<span className="d">${ar ? s.d[1] : s.d[0]}</span>`}</button>`)}
      </div>
      <div className="hf-osF-card" aria-live="polite">
        <p><b>${ar ? 'بيتوصل بـ:' : 'Connects to:'}</b></p>
        <div className="lk">${S.lk.map(([n, e, a], j) => html`<span key=${j}>${ar ? html`م${n}: ${a}` : 'L' + n + ': ' + e}</span>`)}</div>
      </div>
    </div>`;
  }

  /* ── anatomy of the final ── */
  const PAPERS = [
    { y: '2025/26', m: 60, segs: [['p', 20], ['t', 20], ['b', 20]], s: ['4 questions × 10 (a problem + a theory part each), then 10 MCQ + 10 T/F', '4 أسئلة كل واحد 10 (مسألة وجزء نظري)، وبعدين 10 اختيار و10 صح وغلط'] },
    { y: '2024/25', m: 60, segs: [['t', 24], ['p', 36]], s: ['theory: answer 4 of 6 (6 each); problems: 3 × 12', 'نظري: جاوب 4 من 6 (كل واحد 6)؛ ومسائل: 3 كل واحدة 12'] },
    { y: '2023/24', m: 60, segs: [['p', 36], ['t', 24]], s: ['problems: answer 3 of 4 (12 each); theory: 4 × 6', 'مسائل: جاوب 3 من 4 (كل واحدة 12)؛ ونظري: 4 كل واحد 6'] },
    { y: '2022/23', m: 50, segs: [['p', 30], ['t', 20]], s: ['problems: 3 of 4 (10 each); theory: 5 of 7 (4 each)', 'مسائل: 3 من 4 (كل واحدة 10)؛ ونظري: 5 من 7 (كل واحد 4)'] },
    { y: '2021/22', m: 50, segs: [['t', 20], ['p', 30]], s: ['theory: 5 of 8 (4 each); problems: 3 of 4 (10 each)', 'نظري: 5 من 8 (كل واحد 4)؛ ومسائل: 3 من 4 (كل واحدة 10)'] }
  ];
  const SEGC = { p: '#2563EB', t: '#D97706', b: '#059669' };
  function Anatomy() {
    const ar = useAr();
    const nm = { p: ar ? 'مسائل' : 'problems', t: ar ? 'نظري' : 'theory', b: ar ? 'اختيار وصح وغلط' : 'MCQ + T/F' };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-osF-key">${['p', 't', 'b'].map(k => html`<span key=${k}><i style=${{ background: 'color-mix(in srgb, ' + SEGC[k] + ' 35%, var(--paper))' }}></i>${nm[k]}</span>`)}</div>
      <div className="hf-osF-pap">${PAPERS.map((p, i) => html`<div key=${p.y}>
        <div className="h"><span>${ar ? html`نهائي <bdi dir="ltr">${p.y}</bdi>` : 'Final ' + p.y}</span><span>${ar ? html`ساعتين · <bdi dir="ltr">${p.m}</bdi> درجة` : '2 h · ' + p.m + ' marks'}</span></div>
        <div className="bar">${p.segs.map(([k, v], j) => html`<span key=${j} style=${{ flex: v + ' 0 0', background: 'color-mix(in srgb, ' + SEGC[k] + ' 35%, var(--paper))', animationDelay: calm() ? '0s' : (i * 0.12 + j * 0.15) + 's' }}>${v}</span>`)}</div>
        <span className="s">${ar ? p.s[1] : p.s[0]}</span></div>`)}</div>
    </div>`;
  }
  // how many of the five past finals asked each topic (counted from the papers, 2021/22 to 2025/26)
  const HOT = [
    ['CPU scheduling: Gantt + waiting times', 'الـ CPU scheduling: الـ Gantt والـ waiting', 5, 'all five + midterm 2021/22', 'الخمسة + ميدترم 2021/22', 'cpu'],
    ['Page faults: FIFO, Optimal, LRU', 'الـ page faults بالـ FIFO والـ Optimal والـ LRU', 5, 'all five', 'الخمسة', 'mem'],
    ["Banker's: Need + is it safe?", 'الـ Banker\'s: الـ Need وهل هو safe؟', 5, 'all five', 'الخمسة', 'dl'],
    ['File allocation methods (essay)', 'الـ File allocation methods (مقالي)', 5, 'all five', 'الخمسة', 'io'],
    ['First / best / worst fit', 'الـ First والـ best والـ worst fit', 4, 'all but 2024/25', 'كلهم إلا 2024/25', 'mem'],
    ['DMA: six steps or advantages', 'الـ DMA: الـ 6 خطوات أو المميزات', 4, 'all but 2022/23', 'كلهم إلا 2022/23', 'io'],
    ['Short-, medium-, long-term schedulers', 'الـ schedulers التلاتة', 3, '25/26, 23/24, 22/23', 'في 25/26 و23/24 و22/23', 'cpu'],
    ['OS definition or goals', 'تعريف الـ OS أو أهدافه', 3, '25/26, 23/24, 22/23', 'في 25/26 و23/24 و22/23', 'base'],
    ['Four deadlock conditions', 'الـ 4 شروط بتوع الـ deadlock', 3, '24/25, 22/23, 21/22', 'في 24/25 و22/23 و21/22', 'dl']
  ];
  function HotList() {
    const ar = useAr();
    return html`<div className="hf-osF-hot hf-in">${HOT.map((h, i) => html`<div key=${i}>
      <span className="n">${ar ? h[1] : h[0]}<small>${ar ? h[4] : h[3]}</small></span>
      <span className="b" aria-label=${h[2] + ' of 5 finals'}>${[0, 1, 2, 3, 4].map(k => html`<i key=${k} className=${k < h[2] ? 'on' : ''} style=${{ '--c': AREA[h[5]], animationDelay: calm() ? '0s' : (i * 0.06 + k * 0.05) + 's' }}></i>`)}</span>
      <span className="c">${h[2]}/5</span></div>`)}</div>`;
  }

  /* ── True/False rapid fire from the doctors' papers ── */
  function TFList({ id, items }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id, {});
    const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/^True or False:\s*/i, '');
    const short = s => strip(s).split(';')[0];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '5px' }}>${items.filter(x => x.q).map((x, k) => {
      const q = x.q, mine = p[k];
      return html`<div key=${k} className="hf-mcq hf-osF-tf" dir="ltr">
        <p className="src">${short(q.src)}</p>
        <div className="hf-osF-tfr"><p className="q">${strip(q.q)}</p>
          <div className="hf-opts">${q.o.map((o, j) => html`<button key=${j} className=${mine == null ? '' : j === q.a ? 'ok' : j === mine ? 'no' : ''} onClick=${() => mine == null && setP(Object.assign({}, p, { [k]: j }))} aria-pressed=${String(mine === j)}>${o[0]}${mine != null && j === q.a ? ' ✓' : ''}</button>`)}</div></div>
        ${mine != null && (ar && x.why && x.why[mine] ? html`<p className="hf-why" dir="rtl" lang="ar">${T(x.why[mine])}</p>` : html`<p className="hf-why" dir="ltr">${T(q.o[mine][1])}</p>`)}
      </div>`; })}</div>`;
  }

  /* ── Gantt chart and process table ── */
  const GW = 320;
  function Gantt({ blocks, total, empty, anim = true }) {
    const end = total || (blocks.length ? blocks[blocks.length - 1][2] : 1), ppu = GW / end;
    const ticks = []; blocks.forEach((b, j) => { if (j === 0) ticks.push(b[1]); ticks.push(b[2]); });
    // each label's span in px; a label that would touch the one before it drops to a second row, then to a row above the bars
    const edge = [-99, -99, -99];
    const tk = ticks.map((x, j) => {
      const w = String(x).length * 7.6 + 3, px = x * ppu, first = j === 0 && x === 0, lastT = x === end;
      const l = first ? px : lastT ? px - w : px - w / 2, r = l + w;
      let row = edge.findIndex(e => l >= e); if (row < 0) row = 1;
      edge[row] = r;
      return { x, row, first, last: lastT };
    });
    const used = blocks.length ? blocks[blocks.length - 1][2] : 0;
    const row = (rs, cls) => html`<div className=${'hf-osF-tk' + cls}>${blocks.length ? tk.filter(x => rs.includes(x.row)).map((x, j) => html`<span key=${j} className=${(x.row === 1 ? 'lo ' : '') + (x.first ? 'first ' : '') + (x.last ? 'last' : '')} style=${{ left: (x.x / end * 100) + '%' }}>${x.x}</span>`) : null}</div>`;
    return html`<div className="hf-osF-gt" dir="ltr" role="img" aria-label=${'Gantt chart: ' + blocks.map(b => b[0] + ' ' + b[1] + ' to ' + b[2]).join(', ')}>
      ${tk.some(x => x.row === 2) && row([2], ' top')}
      <div className="hf-osF-bars">${blocks.map((b, j) => { const w = (b[2] - b[1]) * ppu; return html`<span key=${j + b[0] + b[1]} className=${anim && !calm() ? 'gr' : ''} style=${{ flex: (b[2] - b[1]) + ' 0 0', '--c': PC[b[0]] || '#64748B', animationDelay: calm() ? '0s' : (anim === 'last' ? 0 : j * 0.1) + 's' }}>${w >= 21 ? b[0] : w >= 9 ? b[0].slice(1) : ''}</span>`; })}
        ${used < end && html`<i style=${{ flex: (end - used) + ' 0 0' }}>${empty || ''}</i>`}</div>
      ${row([0, 1], tk.some(x => x.row === 1) ? ' two' : '')}
    </div>`;
  }
  const PT = ({ head, rows }) => html`<table className="hf-osF-pt hf-in" dir="ltr"><thead><tr>${head.map((h, j) => html`<th key=${j}>${h}</th>`)}</tr></thead>
    <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => html`<td key=${j}>${c}</td>`)}</tr>`)}</tbody></table>`;

  /* ── the scheduling workbench: step through the chart, then fill in CT and WT ── */
  const ALG = { FCFS: ['FCFS', 'FCFS'], SJF: ['SJF', 'SJF'], PRIO: ['Priority', 'Priority'], SRTF: ['SRTF', 'SRTF'], RR: ['RR', 'RR'] };
  const RULE = { FCFS: ['first to arrive', 'اللي وصلت الأول'], SJF: ['shortest burst', 'أقصر burst'], PRIO: ['smallest priority number', 'أصغر رقم priority'], SRTF: ['shortest remaining time', 'أقل وقت فاضل'], RR: ['front of the queue', 'أول الطابور'] };
  function caption(algo, b, ar, q) {
    const B = x => '<bdi dir="ltr">' + x + '</bdi>';
    const list = b.ready.map(([n, v]) => algo === 'RR' ? n : algo === 'FCFS' ? n + ' (' + (ar ? 'وصلت ' : 'arr ') + v + ')' : algo === 'PRIO' ? n + ' (pr ' + v + ')' : n + ' (' + v + ')').join(', ');
    const what = algo === 'RR' ? (ar ? 'الطابور' : 'queue') : algo === 'SRTF' ? (ar ? 'الفاضل' : 'remaining') : (ar ? 'الجاهزين' : 'ready');
    let end;
    if (b.done) end = ar ? ' وتخلص.' : ', done.';
    else if (algo === 'RR') end = ar ? `؛ الـ quantum خلص وفاضل لها ${B(b.left)}، فترجع آخر الطابور.` : `; quantum over, ${b.left} left → back of the queue.`;
    else end = ar ? `؛ عند ${B(b.e)} توصل ${B(b.by)} بـ burst أقصر من الفاضل، فتتعمل preempt (فاضل ${B(b.left)}).` : `; at ${b.e} ${b.by} arrives with a shorter burst → preempted (${b.left} left).`;
    return ar ? `عند ${B('t = ' + b.s)}، ${what}: ${B(list)}. ${RULE[algo][1]} يبقى <b>${B(b.n)}</b> تشتغل ${B(b.s + '–' + b.e)}${end}`
      : `t = ${b.s} · ${what}: ${list} · ${RULE[algo][0]}${algo === 'RR' ? ' (q = ' + q + ')' : ''} → <b>${b.n}</b> runs ${b.s}–${b.e}${end}`;
  }
  function Bench({ id, procs, algos, arr, pri }) {
    const ar = useAr();
    const [tab, setTab] = H.K.useSlot(id + ':t', 0);
    const [A0, q] = algos[Math.min(tab, algos.length - 1)];
    const k = id + ':' + A0 + (q || '');
    const S = useMemo(() => sched(procs, A0, q), [A0, q]);
    const [st, setSt] = H.K.useSlot(k + ':k', 0);
    const [v, setV] = H.K.useSlot(k + ':v', {});
    const [ck, setCk] = H.K.useSlot(k + ':c', false);
    const n = S.blocks.length, shown = S.blocks.slice(0, st), total = S.blocks[n - 1].e;
    const ok = (p, f) => num(v[p + f]) === String((f === 'c' ? S.ct : S.wt)[p]);
    const right = procs.reduce((x, p) => x + (ok(p[0], 'c') ? 1 : 0) + (ok(p[0], 'w') ? 1 : 0), 0), tot = procs.length * 2;
    const inp = (p, f) => html`<input inputMode="numeric" maxLength="3" aria-label=${(f === 'c' ? 'completion time of ' : 'waiting time of ') + p} className=${ck ? (ok(p, f) ? 'ok' : 'no') : ''} value=${v[p + f] || ''} onChange=${e => { setV(Object.assign({}, v, { [p + f]: num(e.target.value) })); setCk(false); }} />`;
    const sum = procs.reduce((x, p) => x + S.wt[p[0]], 0);
    const head = ['P'].concat(arr ? ['AT'] : []).concat(['BT']).concat(pri ? ['Pr'] : []).concat(['CT', 'WT']);
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-osF-tabs" role="group" aria-label="Algorithm">${algos.map(([a, qq], j) => html`<button key=${j} aria-pressed=${String(j === tab)} onClick=${() => setTab(j)}>${ALG[a][ar ? 1 : 0]}${qq ? ' q=' + qq : ''}</button>`)}</div>
      <${Gantt} blocks=${merge(shown)} total=${total} anim="last" empty=${st ? '' : (ar ? 'دوس التالي' : 'press Next')} />
      <p className="hf-osF-cap">${st ? T(caption(A0, S.blocks[st - 1], ar, q)) : (ar ? 'امشي مع الـ scheduler قرار قرار: كل ضغطة على التالي بتحط حتة في الـ chart وبتقولك ليه.' : 'Walk with the scheduler, one decision at a time: every Next adds a slice and says why.')}</p>
      <div className="hf-osF-ctl">
        <button className="hf-btn" disabled=${!st} onClick=${() => setSt(st - 1)}>${ar ? 'رجوع' : 'Back'}</button>
        <button className="hf-btn solid" disabled=${st >= n} onClick=${() => setSt(st + 1)}>${ar ? 'التالي' : 'Next'}</button>
        <button className="hf-btn" disabled=${st >= n} onClick=${() => setSt(n)}>${ar ? 'اعرض الـ chart كله' : 'Show the whole chart'}</button>
        <span className="hf-osF-step">${st}/${n}</span>
      </div>
      <table className="hf-osF-pt" dir="ltr"><thead><tr>${head.map(h => html`<th key=${h}>${h}</th>`)}</tr></thead><tbody>
        ${procs.map(p => html`<tr key=${p[0]}><td>${p[0]}</td>${arr ? html`<td>${p[1]}</td>` : null}<td>${p[2]}</td>${pri ? html`<td>${p[3]}</td>` : null}<td>${inp(p[0], 'c')}</td><td>${inp(p[0], 'w')}</td></tr>`)}</tbody></table>
      <div className="hf-osF-ctl" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; procs.forEach(p => { o[p[0] + 'c'] = String(S.ct[p[0]]); o[p[0] + 'w'] = String(S.wt[p[0]]); }); setV(o); setCk(true); setSt(n); }}>${ar ? 'اعرض الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${tot}</bdi> صح` : right + ' / ' + tot + ' right'}</span>`}
      </div>
      ${ck && right === tot ? html`<p className="hf-osF-avg">avg WT = (${procs.map(p => S.wt[p[0]]).join(' + ')})/${procs.length} = ${sum}/${procs.length} = ${fmt(sum / procs.length)}</p>`
        : html`<p className="hf-osF-avg" style=${{ color: 'var(--graphite)' }}>${arr ? 'TAT = CT − AT · WT = TAT − BT' : 'WT = CT − BT (all arrive at 0)'}</p>`}
    </div>`;
  }

  /* ── averages only (a quick check on a paper with two versions) ── */
  function Avgs({ id, cases }) {
    const ar = useAr();
    const [ci, setCi] = H.K.useSlot(id + ':case', 0);
    const C = cases[Math.min(ci, cases.length - 1)];
    const [v, setV] = H.K.useSlot(id + ':' + ci, {});
    const [ck, setCk] = H.K.useSlot(id + ':' + ci + ':c', false);
    const R = C.algos.map(([a, q]) => { const s = sched(C.procs, a, q); const sum = C.procs.reduce((x, p) => x + s.wt[p[0]], 0); return { a, q, s, avg: fmt(sum / C.procs.length) }; });
    const good = j => { const x = String(v[j] || '').replace(',', '.').trim(); return x !== '' && Math.abs(+x - +R[j].avg) < 1e-9; };
    const right = R.filter((_, j) => good(j)).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-osF-tabs" role="group">${cases.map((c, j) => html`<button key=${j} aria-pressed=${String(j === ci)} onClick=${() => setCi(j)}>${ar ? c.ar : c.en}</button>`)}</div>
      <p className="hf-osF-avg" style=${{ color: 'var(--ink)' }}>${C.procs.map(p => p[0] + ' = ' + p[2]).join(' · ')}</p>
      ${R.map((r, j) => html`<div key=${j} style=${{ display: 'grid', gap: '2px' }}>
        <div className="hf-osF-ctl" dir="ltr"><b style=${{ font: '800 13.5px/1 var(--body)', minWidth: '86px' }}>${ALG[r.a][0]}${r.q ? ' (q = ' + r.q + ')' : ''}</b>
          <span style=${{ font: '600 13px/1 var(--mono)', color: 'var(--graphite)' }}>avg WT =</span>
          <span className="hf-osF-pt"><input style=${{ width: '58px' }} inputMode="decimal" maxLength="5" aria-label=${'average waiting time, ' + r.a} className=${ck ? (good(j) ? 'ok' : 'no') : ''} value=${v[j] || ''} onChange=${e => { setV(Object.assign({}, v, { [j]: e.target.value.replace(/[^0-9.,]/g, '').slice(0, 5) })); setCk(false); }} /></span></div>
        ${ck && good(j) && html`<${Gantt} blocks=${merge(r.s.blocks)} />`}</div>`)}
      <div className="hf-osF-ctl" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; R.forEach((r, j) => { o[j] = r.avg; }); setV(o); setCk(true); }}>${ar ? 'اعرض الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score"><bdi dir="ltr">${right} / ${R.length}</bdi></span>`}
      </div></div>`;
  }

  /* ── be the allocator: first, best, worst fit ── */
  function FitPlay({ id, parts, procs }) {
    const ar = useAr();
    const [alg, setAlg] = H.K.useSlot(id + ':alg', 'first');
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', {});
    const R = useMemo(() => ({ first: fit(parts, procs, 'first'), best: fit(parts, procs, 'best'), worst: fit(parts, procs, 'worst') }), []);
    const W = parts.length, ans = R[alg].at.map(k => k < 0 ? W : k);
    const mine = pick[alg] || {}, checked = !!chk[alg];
    const right = procs.filter((_, i) => mine[i] === ans[i]).length;
    const set = (i, j) => { setPick(Object.assign({}, pick, { [alg]: Object.assign({}, mine, { [i]: j }) })); setChk(Object.assign({}, chk, { [alg]: false })); };
    const NM = { first: 'First-fit', best: 'Best-fit', worst: 'Worst-fit' };
    const cols = parts.map((_, j) => j).concat(W);
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '5px' }}>
      <div className="hf-osF-tabs" role="group" dir="ltr">${['first', 'best', 'worst'].map(a => html`<button key=${a} aria-pressed=${String(alg === a)} onClick=${() => setAlg(a)}>${NM[a]}</button>`)}</div>
      <div dir="ltr"><table className="hf-osF-fg"><thead><tr><th>KB</th>${parts.map((p, j) => html`<th key=${j}>${p}</th>`)}<th style=${{ fontSize: '11.5px' }}>wait</th></tr></thead>
        <tbody>${procs.map((p, i) => html`<tr key=${i}><th>${p}</th>${cols.map(j => {
          const on = mine[i] === j, st = checked && on ? (j === ans[i] ? 'ok' : 'no') : (on ? 'sel' : '');
          const showLeft = checked && on && j === ans[i] && j < W;
          return html`<td key=${j}><button className=${st} aria-pressed=${String(on)} aria-label=${p + ' KB → ' + (j < W ? parts[j] + ' KB partition' : 'must wait')} onClick=${() => set(i, j)}>${on ? (j < W ? '√' : '✕') : ''}${showLeft ? html`<small>${R[alg].left[i]}</small>` : null}</button></td>`; })}</tr>`)}</tbody></table></div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(mine).length} onClick=${() => setChk(Object.assign({}, chk, { [alg]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; ans.forEach((j, i) => { m[i] = j; }); setPick(Object.assign({}, pick, { [alg]: m })); setChk(Object.assign({}, chk, { [alg]: true })); }}>${ar ? 'اعرض الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${procs.length}</bdi></span>`}
      </div>
      ${checked && html`<p className="hf-p small" style=${{ color: 'var(--graphite)' }}>${ar ? html`الرقم الصغير تحت ✓ هو الـ KB اللي فضلت في الـ hole.${R[alg].at.includes(-1) ? html` والـ holes وقت الانتظار: <bdi dir="ltr">${R[alg].holes.join(', ')}</bdi>` : ''}` : 'Small number under ✓: KB left in that hole.' + (R[alg].at.includes(-1) ? ' Holes when it must wait: ' + R[alg].holes.join(', ') + '.' : '')}</p>`}
    </div>`;
  }

  /* ── be the page replacer ── */
  function FT({ refs, nf, algo, per, upto, cur }) {
    const S = simulate(refs, nf, algo), n = refs.length, per_ = per || n;
    const chunks = []; for (let a = 0; a < n; a += per_) chunks.push([a, Math.min(n, a + per_)]);
    const shown = k => upto == null || k < upto;
    const pad = (b, a, cell) => Array.from({ length: per_ - (b - a) }, (_, j) => cell(j));
    return html`<div className="hf-osF-fts" dir="ltr">${chunks.map(([a, b]) => html`<table key=${a} className="hf-osF-ft"><tbody>
      <tr><th className="lb">Ref</th>${refs.slice(a, b).map((p, j) => html`<th key=${j} className=${a + j === cur ? 'cur' : ''}>${p}</th>`)}${pad(b, a, j => html`<th key=${'e' + j} style=${{ border: 0, background: 'none' }}></th>`)}</tr>
      ${Array.from({ length: nf }, (_, f) => html`<tr key=${f}><td className="lb">F${f + 1}</td>${S.slice(a, b).map((x, j) => { const k = a + j; const q = x.frames[f];
        return html`<td key=${j} className=${!shown(k) ? (k === cur ? 'cur' : '') : x.fault && x.slot === f ? 'nw' : ''}>${shown(k) && q != null ? q : ''}</td>`; })}${pad(b, a, j => html`<td key=${'e' + j} style=${{ border: 0 }}></td>`)}</tr>`)}
      <tr><td className="lb">Fault</td>${S.slice(a, b).map((x, j) => html`<td key=${j} className="fl">${shown(a + j) && x.fault ? 'F' : ''}</td>`)}${pad(b, a, j => html`<td key=${'e' + j} style=${{ border: 0 }}></td>`)}</tr>
    </tbody></table>`)}</div>`;
  }
  function Replacer({ id, refs, nf, per }) {
    const ar = useAr();
    const [algo, setAlgo] = H.K.useSlot(id + ':a', 'FIFO');
    const [k, setK] = H.K.useSlot(id + ':' + algo, 0);
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [algo]);
    const SIMS = useMemo(() => ({ FIFO: simulate(refs, nf, 'FIFO'), OPT: simulate(refs, nf, 'OPT'), LRU: simulate(refs, nf, 'LRU') }), []);
    const S = SIMS[algo], n = refs.length, done = k >= n, s = done ? null : S[k];
    const faults = S.slice(0, k).filter(x => x.fault).length;
    const before = s ? s.before : [];
    const never = s && algo === 'OPT' ? before.filter(x => x != null && refs.indexOf(x, k + 1) < 0) : [];
    const right = c => !s ? false : s.kind === 'hit' ? c === 'hit' : s.kind === 'empty' ? c === 'empty' : c === 'v' + s.victim || (never.length > 1 && never.some(x => c === 'v' + x));
    const lbl = { FIFO: ['loaded at', 'دخلت عند'], LRU: ['last used at', 'آخر استخدام عند'], OPT: ['next used at', 'جاية عند'] }[algo];
    const why = () => before.map((x, j) => x == null ? '' : `${x} → ${s.info[j] ? '#' + s.info[j] : (ar ? 'مش جاية تاني' : 'never')}`).filter(Boolean).join(', ');
    const pick = c => {
      if (right(c)) { setBad(null); setK(k + 1); return; }
      let m;
      if (c === 'hit') m = ar ? `الـ page ${s.p} مش في أي frame، يعني ده fault.` : `Page ${s.p} isn't in any frame, so this is a fault.`;
      else if (s.kind === 'hit') m = ar ? `الـ page ${s.p} موجودة أصلًا في frame، يعني hit ومش fault.` : `Page ${s.p} is already in a frame: a hit, not a fault.`;
      else if (s.kind === 'empty') m = ar ? `لسه فيه frame فاضي، فالـ page ${s.p} تدخل فيه (وبرضه بتتحسب fault).` : `There's still an empty frame: page ${s.p} goes there (it still counts as a fault).`;
      else if (c === 'empty') m = ar ? 'مفيش frame فاضي خلاص. اختار victim.' : 'No empty frame left: pick a victim.';
      else m = ar ? `فكّر تاني. ${{ FIFO: 'الـ FIFO بيطلّع اللي دخلت الأول', LRU: 'الـ LRU بيطلّع اللي آخر استخدام ليها أقدم', OPT: 'الـ OPT بيطلّع اللي استخدامها الجاي أبعد' }[algo]}. (${lbl[1]}: <bdi dir="ltr">${why()}</bdi>)`
        : `Not that one. ${{ FIFO: 'FIFO evicts the page loaded earliest', LRU: 'LRU evicts the page whose last use is oldest', OPT: 'OPT evicts the page whose next use is farthest away' }[algo]}. (${lbl[0]}: ${why()})`;
      setBad(m);
    };
    const key = { FIFO: faultsOf(refs, nf, 'FIFO'), OPT: faultsOf(refs, nf, 'OPT'), LRU: faultsOf(refs, nf, 'LRU') };
    const opts = s ? ['hit'].concat(before.includes(null) ? ['empty'] : []).concat(before.filter(x => x != null).map(x => 'v' + x)) : [];
    const optL = c => c === 'hit' ? (ar ? 'موجودة (hit)' : 'Hit') : c === 'empty' ? (ar ? 'في frame فاضي' : 'Empty frame') : (ar ? 'طلّع ' : 'Out: ') + c.slice(1);
    const lastTie = algo === 'OPT' && S[n - 1].kind === 'replace' && S[n - 1].before.filter(x => refs.indexOf(x, n) < 0).length > 1;
    return html`<div className="hf-osF-rp hf-in">
      <div className="hf-osF-tabs" role="group" aria-label="Algorithm">${['FIFO', 'OPT', 'LRU'].map(a => html`<button key=${a} aria-pressed=${String(algo === a)} onClick=${() => setAlgo(a)}>${a}</button>`)}</div>
      <${FT} refs=${refs} nf=${nf} algo=${algo} per=${per} upto=${k} cur=${done ? null : k} />
      ${done ? html`<p className="hf-osF-ok">${T(ar ? `<b>خلصت!</b> الـ ${algo} بيعمل <b>${faults} faults</b>. الإجابات:<span class="ltr">FIFO ${key.FIFO} · Optimal ${key.OPT} · LRU ${key.LRU}</span>${lastTie ? 'في آخر reference مفيش ولا page هتتستخدم تاني، فأي victim ينفع.' : ''}`
          : `<b>Done!</b> ${algo} makes <b>${faults} faults</b>. All three: FIFO ${key.FIFO}, Optimal ${key.OPT}, LRU ${key.LRU}.${lastTie ? ' On the last reference no page is used again, so any victim is right.' : ''}`)}</p>`
        : html`<p className="hf-osF-ask">${T(ar ? `الـ reference رقم <bdi dir="ltr">#${k + 1}</bdi> هو الـ page <b>${s.p}</b>. هيحصل إيه؟ <span style="color:var(--graphite)">(الـ faults لحد دلوقتي ${faults})</span>`
          : `Reference <b>#${k + 1}</b> is page <b>${s.p}</b>. What happens? <span style="color:var(--graphite)">(faults so far: ${faults})</span>`)}</p>
        <div className="hf-osF-opts">${opts.map(c => html`<button key=${c} onClick=${() => pick(c)}>${optL(c)}</button>`)}</div>`}
      ${bad && html`<p className="hf-osF-bad">${T(bad)}</p>`}
      <div className="hf-osF-ctl">
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(k + 1); }}>${ar ? 'اعرض الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(n); }}>${ar ? 'اعرض الكل' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(0); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓ ${faults}</span>`}
      </div>
    </div>`;
  }

  /* ── the banker: fill in Need, then run the safety algorithm ── */
  function NeedFill({ id, alloc, max }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const need = needOf(max, alloc), m = alloc[0].length, R = RN.slice(0, m).join(' ');
    const keys = []; need.forEach((r, i) => r.forEach((_, j) => keys.push([i, j])));
    const right = keys.filter(([i, j]) => v[i + ',' + j] === String(need[i][j])).length;
    const put = (k, val) => { setV(Object.assign({}, v, { [k]: val.replace(/[^0-9]/g, '').slice(0, 2) })); setChecked(false); };
    return html`<div className="hf-in">
      <div dir="ltr"><table className="hf-osF-bk"><colgroup><col style=${{ width: '32px' }} /><col /><col /><col style=${{ width: (m * 25 + 8) + 'px' }} /></colgroup>
        <thead><tr><th></th><th>Allocation<br/>${R}</th><th>Max<br/>${R}</th><th>Need<br/>${R}</th></tr></thead>
        <tbody>${alloc.map((a, i) => html`<tr key=${i}><th>P${i}</th><td>${a.join(' ')}</td><td>${max[i].join(' ')}</td>
          <td>${need[i].map((_, j) => { const k = i + ',' + j, val = v[k] || '', st = checked && val !== '' ? (val === String(need[i][j]) ? ' ok' : ' no') : '';
            return html`<input key=${j} className=${'hf-osF-in' + st} value=${val} inputMode="numeric" maxLength="2" aria-label=${'Need of P' + i + ' for ' + RN[j]} onChange=${e => put(k, e.target.value)} />`; })}</td></tr>`)}</tbody></table></div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; keys.forEach(([i, j]) => { o[i + ',' + j] = String(need[i][j]); }); setV(o); setChecked(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${keys.length}${right === keys.length ? '!' : ''}</bdi></span>`}
      </div></div>`;
  }
  // tap the next process whose Need ≤ Work; "Nobody fits" when stuck
  function RunIt({ id, cases }) {
    const ar = useAr();
    const [ci, setCi] = H.K.useSlot(id + ':case', 0);
    const C = cases[Math.min(ci, cases.length - 1)];
    const need = useMemo(() => needOf(C.max, C.alloc), [ci]);
    const ans = useMemo(() => safety(C.alloc, need, C.avail), [ci]);
    const [st, setSt] = H.K.useSlot(id + ':' + ci, { seq: [], stuck: false });
    const [miss, setMiss] = useState(null);
    const n = C.alloc.length, PS = C.alloc.map((_, i) => 'P' + i);
    const fin = C.alloc.map(() => false); st.seq.forEach(k => { fin[k] = true; });
    const work = st.seq.reduce((w, k) => add(w, C.alloc[k]), C.avail.slice());
    const fits = k => !fin[k] && le(need[k], work);
    const cands = PS.map((_, k) => k).filter(fits);
    const allDone = fin.every(Boolean), over = allDone || st.stuck;
    const tap = k => {
      if (over || fin[k]) return;
      if (fits(k)) { setMiss(null); setSt({ seq: st.seq.concat(k), stuck: false }); return; }
      const j = need[k].findIndex((x, r) => x > work[r]); setMiss({ k, j });
    };
    const stuck = () => { if (cands.length) setMiss({ fit: cands[0] }); else { setMiss(null); setSt({ seq: st.seq, stuck: true }); } };
    const seqTxt = s => '<' + s.map(k => PS[k]).join(', ') + '>';
    const same = st.seq.join() === ans.seq.join();
    const leftP = PS.filter((_, k) => !fin[k]);
    let msg;
    if (allDone) msg = ar ? html`<p className="hf-osF-msg grn">الـ state دي SAFE بالـ sequence دي:<span className="ltr">${seqTxt(st.seq)}</span>${!same ? html`وده صح كمان؛ ترتيب الإجابة المحلولة:<span className="ltr">${seqTxt(ans.seq)}</span>` : ''}</p>`
      : html`<p className="hf-osF-msg grn">SAFE, with your sequence ${seqTxt(st.seq)}.${!same ? ' That is valid too; the worked answer uses ' + seqTxt(ans.seq) + '.' : ''} Final Work ${vs(work)}.</p>`;
    else if (st.stuck) msg = ar ? html`<p className="hf-osF-msg red">مفيش حد ينفع، والـ Finish لسه false عند:<span className="ltr">${leftP.join(', ')}</span>يبقى السيستم <b>UNSAFE</b>.</p>` : html`<p className="hf-osF-msg red">Nobody fits and Finish is still false for ${leftP.join(', ')}: the system is <b>UNSAFE</b>.</p>`;
    else if (miss && miss.fit != null) msg = html`<p className="hf-hand red" style=${{ marginTop: '4px' }}>${ar ? html`لسه فيه process تنفع: بص على <bdi dir="ltr">${PS[miss.fit]}</bdi>.` : 'Someone still fits: look at ' + PS[miss.fit] + '.'}</p>`;
    else if (miss) msg = html`<p className="hf-hand red" style=${{ marginTop: '4px' }}>${ar ? html`مش دلوقتي: الـ <bdi dir="ltr">${PS[miss.k]}</bdi> محتاجة ${need[miss.k][miss.j]} من ${RN[miss.j]}، والـ Work فيه ${work[miss.j]} بس.` : `Not ${PS[miss.k]} yet: it needs ${need[miss.k][miss.j]} of ${RN[miss.j]}, and Work has only ${work[miss.j]}.`}</p>`;
    else msg = html`<p className="hf-hand" style=${{ marginTop: '4px' }}>${ar ? 'دوس على process الـ Need بتاعها أصغر من أو يساوي الـ Work. ولو مفيش، دوس "مفيش حد ينفع".' : 'Tap a process whose Need ≤ Work. If none fits, tap "Nobody fits".'}</p>`;
    return html`<div className="hf-in">
      ${cases.length > 1 && html`<div className="hf-osF-tabs" style=${{ marginBottom: '6px' }}>${cases.map((c, k) => html`<button key=${k} aria-pressed=${String(ci === k)} onClick=${() => { setCi(k); setMiss(null); }}>${ar ? c.ar : c.en}</button>`)}</div>`}
      <div dir="ltr">
        <p className="hf-osF-work">Work = <b key=${st.seq.length} className=${calm() ? '' : 'pop'}>${vs(work)}</b></p>
        <table className="hf-osF-bk"><colgroup><col style=${{ width: '52px' }} /><col /><col /><col style=${{ width: '58px' }} /></colgroup>
          <thead><tr><th></th><th>Allocation</th><th>Need</th><th>Finish</th></tr></thead>
          <tbody>${PS.map((p, k) => html`<tr key=${p} className=${fin[k] ? 'done' : st.stuck ? 'bad' : ''}>
            <th><button disabled=${over || fin[k]} onClick=${() => tap(k)} aria-label=${'Run ' + p}>${p}</button></th>
            <td>${C.alloc[k].join(' ')}</td><td className="k">${need[k].join(' ')}</td><td>${fin[k] ? 'true' : 'false'}</td></tr>`)}</tbody></table>
        <div className="hf-osF-seq">${st.seq.map(k => html`<span key=${k}>${PS[k]}</span>`)}${st.stuck ? leftP.map(p => html`<span key=${p} className="x">${p} ✗</span>`) : null}</div>
      </div>
      ${msg}
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        ${!over && html`<button className="hf-btn" onClick=${stuck}>${ar ? 'مفيش حد ينفع' : 'Nobody fits'}</button>`}
        <button className="hf-btn" onClick=${() => { setSt({ seq: ans.seq.slice(), stuck: !ans.safe }); setMiss(null); }}>${ar ? 'اعرض الحل' : 'Show me'}</button>
        ${(st.seq.length > 0 || st.stuck) && html`<button className="hf-btn" onClick=${() => { setSt({ seq: [], stuck: false }); setMiss(null); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  /* ── translate (s, d) or say trap ── */
  function Xlate({ id, rows }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const ok = i => String(v[i] == null ? '' : v[i]).replace(/[\s,]/g, '') === String(rows[i][1]);
    const right = rows.filter((_, i) => ok(i)).length;
    const put = (i, x) => { setV(Object.assign({}, v, { [i]: x })); setChecked(false); };
    return html`<div className="hf-in">
      <div className="hf-osF-xl" dir="ltr">${rows.map((r, i) => {
        const isTrap = v[i] === 'trap';
        return html`<div key=${i} className=${'hf-osF-xr' + (checked ? (ok(i) ? ' ok' : ' no') : '')}>
          <span className="hf-osF-xq">${T(r[0])}</span>
          <input type="text" inputMode="numeric" value=${isTrap ? '' : (v[i] || '')} placeholder=${isTrap ? '' : '?'} aria-label=${'Physical address for ' + String(r[0]).replace(/<[^>]+>/g, '')} onInput=${e => put(i, e.target.value)} />
          <button className="trap" aria-pressed=${String(isTrap)} onClick=${() => put(i, isTrap ? '' : 'trap')}>trap</button>
          <span className="mk">${checked ? (ok(i) ? '✓' : '✗') : ''}</span>
          ${checked ? html`<span className="why">${T(r[2])}</span>` : null}</div>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; rows.forEach((r, i) => { m[i] = String(r[1]); }); setV(m); setChecked(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  /* ── put the steps in order ── */
  function Order({ id, items, right }) {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot(id, []);
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const tap = i => { setChk(false); setSeq(seq.includes(i) ? seq.filter(x => x !== i) : seq.concat(i)); };
    const good = seq.filter((x, j) => right[j] === x).length;
    return html`<div className="hf-in"><div className="hf-osF-ord">${items.map((t, i) => { const at = seq.indexOf(i);
      return html`<button key=${i} className=${(at >= 0 ? 'on' : '') + (chk && at >= 0 ? (right[at] === i ? ' ok' : ' no') : '')} aria-pressed=${String(at >= 0)} onClick=${() => tap(i)}><i>${at >= 0 ? at + 1 : '?'}</i><span>${T(t)}</span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${seq.length < items.length} onClick=${() => setChk(true)}>${ar ? 'صحّح الترتيب' : 'Check the order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(right.slice()); setChk(true); }}>${ar ? 'اعرض الترتيب' : 'Show the order'}</button>
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setChk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
        ${chk && html`<span className="hf-score">${good} / ${items.length}</span>`}
      </div></div>`;
  }

  /* ── break one deadlock condition and see how prevention does it ── */
  function Breaker({ id, conds }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, null);
    const C = k == null ? null : conds[k];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-osF-brk">${conds.map((c, j) => html`<button key=${j} className=${k === j ? 'off' : ''} aria-pressed=${String(k === j)} onClick=${() => setK(k === j ? null : j)}>
        <b>${ar ? c.ar[0] : c.en[0]}</b><i>${k === j ? (ar ? 'اتكسر' : 'broken') : (ar ? 'متحقق' : 'holds')}</i></button>`)}</div>
      <div className=${'hf-box hf-in ' + (C ? 'hf-relax' : 'hf-watch')} style=${{ minHeight: '96px' }}>
        <p className="hf-p small">${C ? T(ar ? C.ar[1] : C.en[1]) : X0(ar, 'All four hold at the same time: deadlock <b>can</b> arise. Tap one to break it.', 'الأربعة متحققين في نفس الوقت: الـ deadlock <b>ممكن</b> يحصل. دوس على واحد عشان تكسره.')}</p>
      </div></div>`;
  }
  const X0 = (ar, en, a) => T(ar ? a : en);

  /* ── cover the comparison table and recall it row by row ── */
  function Cover({ id, head, rows }) {
    const ar = useAr();
    const [open, setOpen] = H.K.useSlot(id, []);
    const all = open.length === rows.length;
    const tog = i => setOpen(open.includes(i) ? open.filter(x => x !== i) : open.concat(i));
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <table className="hf-osF-cov"><thead><tr><th style=${{ width: '70px' }}></th>${head.map((h, j) => html`<th key=${j}>${h}</th>`)}</tr></thead>
        <tbody>${rows.map((r, i) => { const on = open.includes(i); return html`<tr key=${i}><th><button onClick=${() => tog(i)} aria-expanded=${String(on)}>${T(r[0])}</button></th>
          ${r.slice(1).map((c, j) => html`<td key=${j} className=${on ? '' : 'hid'} onClick=${() => tog(i)}>${on ? T(c) : '·'}</td>`)}</tr>`; })}</tbody></table>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${all} onClick=${() => setOpen(rows.map((_, i) => i))}>${ar ? 'اعرض الكل' : 'Show all'}</button>
        ${open.length > 0 && html`<button className="hf-btn" onClick=${() => setOpen([])}>${ar ? 'غطّي تاني' : 'Cover again'}</button>`}
        <span className="hf-score"><bdi dir="ltr">${open.length} / ${rows.length}</bdi></span>
      </div></div>`;
  }

  /* ── the DMA controller's counter: C goes down, the address goes up, one interrupt at the end (C = 2,048: the notes' example) ── */
  function DmaCount() {
    const ar = useAr();
    const [sent, setSent] = H.K.useSlot('dma', 0);
    const C0 = 2048, C = C0 - sent, irq = C === 0;
    const steps = [500, 1048, 500];
    const nextAmt = steps.find((_, j) => steps.slice(0, j).reduce((a, b) => a + b, 0) === sent) || C;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-osF-dma">
        <div><small>${ar ? 'اتبعت' : 'bytes sent'}</small><b>${sent}</b></div>
        <div><small>C</small><b>${C}</b></div>
        <div className=${irq ? 'irq' : ''}><small>${ar ? 'العنوان الجاي' : 'next address'}</small><b>${irq ? 'IRQ!' : sent ? 'X+' + sent : 'X'}</b></div>
      </div>
      <p className="hf-osF-cap" style=${{ minHeight: '0' }}>${T(irq ? (ar ? 'الـ C وصل صفر: الـ DMA controller بيعمل <b>interrupt واحد</b> للـ CPU إن النقل خلص. ده الـ interrupt الوحيد في الـ block كله.' : 'C reached 0: the DMA controller raises <b>one interrupt</b> to tell the CPU the transfer is complete. The only interrupt for the whole block.')
        : sent === 500 ? (ar ? 'بعد 500 byte: الـ <bdi dir="ltr">C = 1,548</bdi> والعنوان الجاي <bdi dir="ltr">X + 500</bdi> (مثال الـ notes). ولسه مفيش interrupt.' : 'After 500 bytes: C = 1,548 and the next address is X + 500 (the notes\' example). Still no interrupt.')
        : sent ? (ar ? 'الـ CPU شغال في حاجة تانية خالص؛ الـ controller بيسرق bus cycles بس.' : 'The CPU is busy with something else entirely; the controller only steals bus cycles.')
        : (ar ? 'الـ driver طلب <bdi dir="ltr">C = 2,048</bdi> byte لـ buffer على العنوان X. دوس "ابعت".' : 'The driver asked for C = 2,048 bytes into the buffer at X. Press Send.'))}</p>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${irq} onClick=${() => setSent(sent + nextAmt)}>${ar ? 'ابعت ' + nextAmt + ' byte' : 'Send ' + nextAmt + ' bytes'}</button>
        <button className="hf-btn" disabled=${irq} onClick=${() => setSent(C0)}>${ar ? 'اعرض النهاية' : 'Show the end'}</button>
        ${sent > 0 && html`<button className="hf-btn" onClick=${() => setSent(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  /* ── our time plan for two hours ── */
  function TimePlan({ segs }) {
    const ar = useAr();
    let t = 0; const marks = [0];
    segs.forEach(s => { t += s[0]; marks.push(t); });
    return html`<div className="hf-in"><div className="hf-osF-tp">${segs.map((s, j) => html`<span key=${j} title=${ar ? s[3] : s[2]} style=${{ flex: s[0] + ' 0 0', '--c': s[1], animationDelay: calm() ? '0s' : j * 0.12 + 's' }}>${s[0] >= 15 ? (ar ? s[3] : s[2]) : ''}</span>`)}</div>
      <div className="hf-osF-tpx">${marks.map((m, j) => html`<span key=${j}>${m}</span>`)}</div></div>`;
  }

  /* ── the papers' data (checked by the node script against the site's worked answers) ── */
  const Q24 = [['P1', 0, 8, 1], ['P2', 1, 4, 5], ['P3', 2, 9, 2], ['P4', 3, 5, 3]];               // Final 2024/25 Q2-1
  const Q22 = [['P0', 0, 10, 5], ['P1', 0, 7, 1], ['P2', 0, 3, 3], ['P3', 0, 6, 4], ['P4', 0, 5, 2]];   // Final 2022/23 Q1-a
  const Q26c = [['P1', 0, 3], ['P2', 0, 3], ['P3', 0, 2], ['P4', 0, 1]];                           // Final 2025/26 Q4-a, corrected by hand
  const Q26p = [['P1', 0, 6], ['P2', 0, 3], ['P3', 0, 5], ['P4', 0, 4]];                           // … as printed
  const OURS_S = [['P1', 0, 7, 3], ['P2', 2, 4, 1], ['P3', 3, 1, 4], ['P4', 5, 4, 2]];              // our own numbers
  const F22 = [[150, 500, 300, 600], [230, 420, 130, 450]];                                        // Final 2022/23 Q1-b
  const FSL = [[100, 500, 200, 300, 600], [212, 417, 112, 426]];                                   // slides; Finals 2025/26 Q2-a, 2023/24 Q1-b
  const FOURS = [[180, 520, 260, 400, 320], [250, 160, 300, 390]];                                 // ours
  const R26 = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1];                                          // Final 2025/26 Q3-a, 3 frames
  const R24 = [5, 7, 6, 9, 7, 3, 7, 4, 9, 3, 7, 3, 9, 6, 9, 7, 6, 5, 7, 9, 6];                     // Final 2024/25 Q2-2, 4 frames
  const ROURS = [2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2];                                              // ours, 3 frames
  const BK24 = { alloc: [[0, 0, 1, 2], [1, 0, 0, 0], [1, 3, 5, 4], [0, 6, 3, 2], [0, 0, 1, 4]], max: [[0, 0, 1, 2], [1, 7, 5, 0], [2, 3, 5, 6], [0, 6, 5, 2], [0, 6, 5, 6]], avail: [1, 5, 2, 0] };
  const BK23 = { alloc: [[0, 1, 0], [2, 0, 0], [3, 0, 3], [2, 1, 1], [0, 0, 2]], max: [[0, 1, 0], [4, 0, 2], [3, 0, 3], [3, 1, 1], [0, 0, 4]], avail: [0, 0, 0] };
  const BK25 = { alloc: BK23.alloc, max: [[0, 1, 0], [4, 0, 2], [3, 0, 4], [3, 1, 1], [0, 0, 4]], avail: [0, 0, 0] };
  const BKO = { alloc: [[1, 1, 0], [2, 0, 1], [1, 0, 2], [0, 2, 1], [2, 1, 0]], max: [[5, 3, 2], [3, 2, 2], [2, 1, 3], [4, 3, 3], [3, 1, 1]], avail: [2, 1, 2] };   // ours
  H.osFinalData = { Q24, Q22, Q26c, Q26p, OURS_S, F22, FSL, FOURS, R26, R24, ROURS, BK24, BK23, BK25, BKO };

  H.chapters.os.final = {
    title: 'Crack the OS Final', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'اكسر امتحان الـ OS', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Go, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const B = s => `<bdi dir="ltr">${s}</bdi>`;
      const L = s => `<span class="ltr">${s}</span>`;
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' questions (quiz items with src) from ANY lecture, with the Arabic "why" of that lecture; `from` narrows by paper
      const ARQ = n => (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[n] && window.AR.os.lectures[n].quiz) || [];
      const find = (re, src, from) => {
        for (const l of kit.course.lectures) {
          const i = l.quiz.findIndex(x => !!x.src === src && re.test(strip(x.q)) && (!from || from.test(strip(x.src || ''))));
          if (i >= 0) return { q: l.quiz[i], why: ARQ(l.n)[i] };
        }
        return {};
      };
      const q = (re, from) => find(re, true, from);
      const mq = (id, re, from) => { const r = q(re, from); return html`<div className="hf-osF-mq"><${MCQ} id=${id} q=${r.q} why=${r.why} /></div>`; };
      const pq = (id, re) => { const r = find(re, false); return html`<div className="hf-osF-mq"><${MCQ} id=${id} q=${r.q} why=${r.why} /></div>`; };
      const tf = (id, list) => html`<${TFList} id=${id} items=${list.map(([re, from]) => q(re, from))} />`;
      const page = (el, o) => Object.assign({ el }, o || {});
      const steps = items => html`<ol className="hf-osF-steps hf-in">${items.map((x, i) => html`<li key=${i}><b>${i + 1}</b><span>${T(x)}</span></li>`)}</ol>`;
      const kv = rows => html`<div className="hf-osF-kv hf-in">${rows.map(([k, v], i) => html`<${React.Fragment} key=${i}><b>${T(k)}</b><span>${T(v)}</span></${React.Fragment}>`)}</div>`;
      const cards = rows => html`<div className="hf-osF-cards hf-in">${rows.map(([k, v], i) => html`<div key=${i}><b>${T(k)}</b><span>${T(v)}</span></div>`)}</div>`;
      const stmt = (paper, body) => html`<div className="hf-osF-stmt hf-in"><p className="pp">${paper}</p>${body}</div>`;
      const ours = t('Ours, for practice: not from a paper', 'من عندنا للتدريب: مش من امتحان');
      const lecSec = (n, en, ar) => t('L' + n + ' · ' + en, 'م' + n + ' · ' + ar);

      return [
        // ═════════ 0 · how to use this book + how ready am I? (faces the opener)
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تذاكر الكتاب ده')}</${H2}>
          <ol className="hf-osF-plan hf-in">
            ${(A ? [
              '<b>قيّم نفسك</b> تحت، بصراحة.',
              '<b>الخريطة وشكل الامتحان</b>: بيسأل في إيه وبكام.',
              '<b>محاضرة محاضرة</b>، وابدأ بالضعيف.',
              '<b>المسائل</b> بالقلم، وبعدين أسئلة الدكاترة.'
            ] : [
              '<b>Rate yourself</b> below, honestly.',
              '<b>The map and the anatomy</b>: what the final asks.',
              '<b>Lecture by lecture</b>, shaky ones first.',
              '<b>The problems</b> with a pencil, then the doctors\' questions.'
            ]).map((x, i) => html`<li key=${i}><b>${i + 1}</b><span>${T(x)}</span></li>`)}
          </ol>
          <${Box} kind="pencil" title=${t('How ready am I?', 'أنا جاهز قد إيه؟')}><${Rate} /></${Box}>
        `, { sec: t('How to use this book', 'إزاي تذاكر الكتاب ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="hf-osF-star" aria-hidden="true">★</span><span className="t">${A ? html`المراجعة النهائية<br/>Operating Systems` : html`Final revision<br/>Operating Systems`}</span></div>
            <${H1}>${t('Eight Lectures, One Exam', 'تمان محاضرات وامتحان واحد')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('the whole course in one sitting', 'المادة كلها في قعدة واحدة')}</p></div>
          <${Talk} who="dev">${t('The final is in three days. Eight lectures. Where do I even start?', 'الفاينال بعد تلات أيام. تمان محاضرات. أبدأ منين أصلًا؟')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X('With what comes <b>every single year</b>: Gantt charts, page faults, the banker, and the allocation methods. I counted the papers.', 'باللي بييجي <b>كل سنة</b>: الـ Gantt charts، والـ page faults، والـ banker، والـ allocation methods. أنا عدّيت الامتحانات.')}</${Talk}>
          <${Talk} who="cpu">${t("And I'm in half of them. Bring a pencil.", 'وأنا موجود في نصهم. هات قلم.')}</${Talk}>
          <${Grow} />
          <${P} small=${true}>${X('Five past finals (2021/22 to 2025/26) and this year\'s midterm are inside, with every problem worked on the page.', 'جوّه الكتاب خمس امتحانات فاينال، من 2021/22 لحد 2025/26، وميدترم السنة دي، وكل مسألة محلولة على الصفحة.')}</${P}>
        `, { sec: t('The final, cracked', 'الفاينال اتفك') }),

        // ═════════ 2 · the course map
        page(html`
          <${H2}>${t('The course on one line', 'المادة كلها على خط واحد')}</${H2}>
          <${P} small=${true}>${t('Tap a stop: what you must be able to do after it, and where it connects.', 'دوس على محطة: هتشوف لازم تعرف تعمل إيه بعدها، وبتتوصل بإيه.')}</${P}>
          <${CourseMap} />
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // 3 · what the OS manages
        page(html`
          <${H2}>${t('Four things the OS manages', 'أربع حاجات الـ OS بيديرها')}</${H2}>
          <${P} small=${true}>${X('Lecture 1 says the OS is a <b>resource allocator</b>. The rest of the course is that sentence, one resource at a time:', 'الـ OS هو <b>resource allocator</b> (م1)، وباقي المادة resource ورا resource:')}</${P}>
          <div className="hf-osF-areas hf-in">
            ${[[AREA.cpu, ['The CPU', 'الـ CPU'], ['L2, L3', 'م2 وم3'], ['who runs next, for how long: the scheduler', 'مين يشتغل بعد كده ولقد إيه: الـ scheduler']],
               [AREA.mem, ['Memory', 'الـ Memory'], ['L4, L5', 'م4 وم5'], ['where a process lives, which page stays in a frame', 'الـ process تعيش فين، وأنهي page تفضل في الـ frame']],
               [AREA.dl, ['Resources', 'الـ Resources'], ['L6', 'م6'], ['give them out without anyone waiting forever', 'يوزّعها من غير ما حد يستنى للأبد']],
               [AREA.io, ['Disk and devices', 'الـ Disk والأجهزة'], ['L7, L8', 'م7 وم8'], ['where a file\'s blocks go; moving data with DMA', 'بلوكات الـ file تروح فين؛ ونقل الداتا بالـ DMA']]].map(([c, n, l, d], j) => html`<div key=${j} style=${{ '--c': c }}><b>${A ? n[1] : n[0]}</b><i>${A ? l[1] : l[0]}</i><span>${A ? d[1] : d[0]}</span></div>`)}
          </div>
          <${Box} kind="brain"><p className="hf-p small">${X('The four problems of the final are one per resource, except one. Which resource gets two problems, and which gets none?', 'كل مسألة من الأربعة على resource. أنهي resource ليه مسألتين، وأنهي ملوش؟')}</p></${Box}>
          <${Grow} />
          <${Reveal} id="areas-a" label=${t('Show the answer', 'اعرض الإجابة')}><p className="hf-hand">${t('memory gets two (fits in L4, page faults in L5); disk and devices get none: they come as essays (allocation methods, DMA)', 'الـ memory ليها مسألتين، في م4 وم5. والـ disk والأجهزة ملهمش: بييجوا مقالي')}</p></${Reveal}>
        `),

        // ═════════ 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الفاينال')}</${H2}>
          <${Anatomy} />
          <${Grow} />
          <${Hand} red=${true}>${t('problems are 1/3 to 60% of every paper, always the same four types; in 2025/26 each was only 5 marks', 'المسائل من تلت لـ 60% من أي امتحان، ودايمًا نفس الأربع أنواع؛ وفي 2025/26 كل مسألة كانت 5 درجات بس')}</${Hand}>
        `, { sec: t('Anatomy of the final', 'تشريح الفاينال') }),

        // 5 · hot list
        page(html`
          <${H2}>${t('The hot list', 'الأكتر تكرارًا')}</${H2}>
          <${HotList} />
          <${Grow} />
          <${Hand}>${t('2 of 5: process states, paging vs segmentation. 1 of 5: six more essays (see the essay pages)', 'اتنين من 5: الـ process states، والـ paging والـ segmentation. وواحد من 5: ست مقاليات تانية (في صفحات المقالي)')}</${Hand}>
        `),

        // ═════════ L1 · introduction
        page(html`
          <${H2}>${t('L1 · Introduction: you must know', 'م1 · المقدمة: لازم تعرف')}</${H2}>
          <${Def}>${X('<b>OS</b> = a program that acts as an <b>intermediary between the user and the hardware</b>. A <b>resource allocator</b> (manages all resources, decides between conflicting requests) and a <b>control program</b> (controls execution to prevent errors and improper use). No universally accepted definition.',
            'الـ <b>OS</b> برنامج بيقف <b>وسيط بين الـ user والـ hardware</b>. هو <b>resource allocator</b> (بيدير كل الـ resources ويحكم بين الطلبات المتعارضة)، و<b>control program</b> (بيتحكم في التنفيذ عشان يمنع الأخطاء والاستخدام الغلط). ومفيش تعريف واحد متفق عليه.')}</${Def}>
          ${kv(A ? [
            ['الأهداف', 'يشغّل برامج الـ user ويسهّل حل مشاكله، ويبقى convenient، ويستخدم الـ hardware بكفاءة.'],
            ['الـ Kernel', 'البرنامج الوحيد اللي شغال طول الوقت، مش كل البرامج.'],
            ['الـ Interrupt', 'غالبًا من الـ hardware (asynchronous)، والتحكم بيروح للـ ISR عن طريق الـ interrupt vector.'],
            ['الـ Trap', 'هو interrupt من الـ software: يا error (قسمة على صفر) يا system call، وهو synchronous.'],
            ['الـ Dual mode', 'فيه mode bit قيمته 0 للـ kernel و1 للـ user، والـ privileged instructions في الـ kernel بس.'],
            ['الـ Timer', 'بيعمل interrupt عشان مفيش process تحتكر الـ CPU أو تلف في loop للأبد.']
          ] : [
            ['Goals', 'execute user programs and make problems easier; convenient; use the hardware efficiently.'],
            ['Kernel', 'the one program running at all times, not all the programs.'],
            ['Interrupt', 'usually hardware, asynchronous; control goes to the ISR through the interrupt vector.'],
            ['Trap', 'a software-generated interrupt: an error (divide by zero) or a system call; synchronous.'],
            ['Dual mode', 'mode bit kernel = 0, user = 1; privileged instructions run only in kernel mode.'],
            ['Timer', 'interrupts so no process hogs the CPU or loops forever.']
          ])}
        `, { sec: lecSec(1, 'Introduction', 'المقدمة') }),
        page(html`
          <${H2}>${t('Storage, DMA, protection', 'الـ Storage والـ DMA والـ protection')}</${H2}>
          <${Code} lines=${['registers → cache → memory', '→ SSD → disk → optical → tape']} />
          ${kv(A ? [
            ['الـ Main memory', 'الـ storage الكبير الوحيد اللي الـ CPU يوصله مباشرة، وغالبًا volatile.'],
            ['الـ SSD', 'أسرع من الـ hard disk، وnonvolatile. والـ magnetic disk هو الأشهر كـ secondary storage.'],
            ['الـ DMA', 'بينقل block كامل للـ memory من غير الـ CPU، بـ interrupt واحد لكل block:' + L('16 KB / 1 KB → 16 interrupts, not 16,384')],
            ['الـ Protection', 'التحكم في الوصول للـ resources؛ والـ <b>security</b> هي الدفاع ضد الهجمات.']
          ] : [
            ['Main memory', 'the only large storage the CPU accesses directly; typically volatile.'],
            ['SSD', 'faster than a hard disk, nonvolatile. The magnetic disk is the most common secondary storage.'],
            ['DMA', 'moves a whole block to memory without the CPU: one interrupt per block (16 KB in 1 KB blocks → 16, not 16,384).'],
            ['Protection', 'controlling access to resources; <b>security</b> = defense against attacks.']
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Fastest volatile memory: <b>SRAM</b>. SSDs are <b>nonvolatile</b>. The most basic non-volatile memory: <b>ROM</b> (the textbook\'s answer).', 'أسرع memory volatile هي <b>SRAM</b>. والـ SSD <b>nonvolatile</b>. وأبسط non-volatile هي <b>ROM</b> (إجابة الكتاب).')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('The storage-device hierarchy', 'هرم أجهزة الـ storage')}</${H2}>
          <${Fig} name="os-storage-hierarchy" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Rapid fire: the doctors\' True/False', 'بسرعة: صح وغلط الدكاترة')}><p className="hf-p small">${t('Straight from Final 2025/26. Tap T or F.', 'من فاينال 2025/26 بالظبط. دوس على True أو False.')}</p></${Box}>
          ${tf('tf1', [[/kernel consists of all system/, /Exam 2026/], [/bootstrap program is in the form/], [/Interrupts may be triggered/]])}
          <${Grow} />
          <${Hand} red=${true}>${t('trap words: "all", "RAM", "not one of the activities". Read every word of a T/F.', 'كلمات فخ: "all" و"RAM" و"not one of the activities". اقرا كل كلمة في الصح والغلط.')}</${Hand}>
        `),

        // ═════════ L2 · processes
        page(html`
          <${H2}>${t('L2 · Processes: you must know', 'م2 · الـ Processes: لازم تعرف')}</${H2}>
          ${cards(A ? [
            ['الـ Program والـ process', 'الـ program ملف passive على الـ disk؛ والـ process برنامج بيتنفذ، active.'],
            ['الـ 5 states', 'الـ new والـ ready والـ running والـ waiting والـ terminated. وعلى CPU واحد، process واحدة running.'],
            ['الـ PCB', 'فيه الـ state والرقم والـ PC والـ registers والـ scheduling والـ memory والـ accounting والـ I/O info.'],
            ['الـ Schedulers', 'الـ short-term بيختار للـ CPU كل ms؛ والـ long-term بيدخّل الـ ready queue؛ والـ medium-term بيعمل swap.'],
            ['الـ Context switch', 'يحفظ حالة القديمة في الـ PCB بتاعها ويحمّل الجديدة. ده overhead خالص.'],
            ['الـ Zombie والـ orphan', 'الـ zombie خلصت والـ parent ماعملش <code>wait()</code>؛ والـ orphan الـ parent بتاعها خلص.']
          ] : [
            ['Program vs process', 'a program is a passive file on disk; a process is a program in execution, active.'],
            ['5 states', 'new, ready, running, waiting, terminated. One CPU: one running process.'],
            ['PCB', 'state, number, PC, registers, scheduling, memory, accounting, I/O info.'],
            ['Schedulers', 'short-term picks for the CPU every ms; long-term admits to the ready queue; medium-term swaps.'],
            ['Context switch', 'save the old state in its PCB, load the new one. Pure overhead.'],
            ['Zombie / orphan', 'zombie: ended, parent has not called wait(); orphan: its parent ended.']
          ])}
        `, { sec: lecSec(2, 'Processes', 'الـ Processes') }),
        page(html`
          <${H2}>${t('Draw this in the exam (2024/25, 2021/22)', 'ارسم دي في الامتحان (2024/25 و2021/22)')}</${H2}>
          <${Fig} name="os-state-diagram" />
        `),
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Zombie</b>: the child ended, the parent has not called <code>wait()</code>. <b>Orphan</b>: the parent ended first. And <code>exec()</code> does <b>not</b> create a process.', 'الـ <b>Zombie</b>: الـ child خلصت والـ parent ماعملش <code>wait()</code>. والـ <b>Orphan</b>: الـ parent خلص الأول. والـ <code>exec()</code> <b>مش</b> بتعمل process.')}</p></${Box}>
          <${H2}>${t('Fill the blank (Final 2025/26)', 'كمّل الفراغ (فاينال 2025/26)')}</${H2}>
          <${Match} id="l2m" left=${['orphan', 'zombie', 'context switch', 'program counter', 'long-term']}
            right=${A ? ['الـ scheduler اللي بيدخّل الـ ready queue', 'خلصت والـ parent ماعملش <code>wait()</code>', 'بيحفظ حالة اللي شغالة ويرجّع الجاية', 'الـ parent بتاعها اتقفل', 'عنوان الـ instruction الجاية']
              : ['brings processes into the ready queue', 'ended, parent has not called wait()', 'saves the running state, restores the next', 'its parent is terminated', 'the address of the next instruction']}
            answer=${[3, 1, 2, 4, 0]} />
        `),

        // ═════════ L3 · CPU scheduling
        page(html`
          <${H2}>${t('L3 · CPU scheduling: you must know', 'م3 · الـ CPU scheduling: لازم تعرف')}</${H2}>
          <table className="hf-osF-tb hf-in"><thead><tr><th style=${{ width: '62px' }}></th><th>${t('Picks', 'بيختار')}</th><th style=${{ width: '62px' }}>${t('Preempts?', 'Preempt؟')}</th><th>${t('Remember', 'افتكر')}</th></tr></thead><tbody>
            ${(A ? [
              ['FCFS', 'اللي وصلت الأول', 'لأ', 'الـ convoy effect؛ وبيتعب الـ time-sharing'],
              ['SJF', 'أقصر burst جاي', 'لأ', 'الـ optimal: أقل متوسط waiting؛ ممكن starvation'],
              ['SRTF', 'أقل وقت فاضل', 'أيوه', 'هو الـ SJF الـ preemptive'],
              ['RR', 'أول الطابور لمدة q', 'أيوه', 'لو q كبير يبقى FCFS؛ ومفيش انتظار أكتر من (n − 1)q'],
              ['Priority', 'أصغر رقم', 'الاتنين', 'الـ starvation وعلاجها الـ aging']
            ] : [
              ['FCFS', 'first to arrive', 'no', 'convoy effect; troublesome for time-sharing'],
              ['SJF', 'shortest next burst', 'no', 'optimal: minimum average WT; can starve'],
              ['SRTF', 'shortest remaining time', 'yes', 'preemptive SJF'],
              ['RR', 'front of queue, for q', 'yes', 'q large → FCFS; no wait beyond (n − 1)q'],
              ['Priority', 'smallest number', 'either', 'starvation, cured by aging']
            ]).map((r, i) => html`<tr key=${i}><th dir="ltr">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${T(r[3].replace('(n − 1)q', B('(n − 1)q')))}</td></tr>`)}
          </tbody></table>
          ${kv(A ? [
            ['الـ Non-preemptive', 'القرار في حالتين بس: running → waiting، أو terminate.'],
            ['الـ Preemptive', 'كمان running → ready وwaiting → ready، وممكن يعمل race conditions.'],
            ['الـ Dispatcher', 'بيبدّل الـ context ويحوّل لـ user mode وينط للمكان الصح. مش هو اللي بيختار.']
          ] : [
            ['Non-preemptive', 'decides only when a process goes running → waiting, or terminates.'],
            ['Preemptive', 'also running → ready and waiting → ready; can cause race conditions.'],
            ['Dispatcher', 'switches context, switches to user mode, jumps to the right place. It does not choose.']
          ])}
        `, { sec: lecSec(3, 'CPU scheduling', 'الـ CPU scheduling') }),
        page(html`
          <${H2}>${t('Criteria and the only formulas', 'المعايير والقوانين')}</${H2}>
          ${kv(A ? [
            ['↑ أعلى', 'الـ CPU utilization والـ throughput (عدد اللي بيخلصوا في وحدة الزمن).'],
            ['↓ أقل', 'الـ turnaround (من التقديم للنهاية)، والـ waiting (في الـ ready queue)، والـ response (لحد أول response).']
          ] : [
            ['↑ max', 'CPU utilization, throughput (processes completed per time unit).'],
            ['↓ min', 'turnaround (submission to completion), waiting (in the ready queue), response (to the first response).']
          ])}
          <${Code} lines=${[['TAT = CT − AT', t('turnaround', 'الـ turnaround')], ['WT  = TAT − BT', t('waiting', 'الـ waiting')], 'avg = (WT1 + … + WTn) / n', ['RT  = first on CPU − AT', t('response', 'الـ response')]]} />
          <${Hand} red=${true}>${t('all arrive at 0 and no preemption? WT = the start time. Nothing more to compute.', 'الكل عند 0 ومفيش preemption؟ يبقى الـ WT هو وقت البداية، خلاص.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm 2026/27: <i>"the amount of time to execute a particular process"</i> is <b>turnaround</b>, not waiting time; RR is <b>preemptive</b>; <b>very large</b> slices (not very small) turn RR into FCFS; preemptive priority-based scheduling guarantees only <b>soft</b> real-time (the textbook\'s answer).',
            'ميدترم 2026/27: الوقت اللازم لتنفيذ process معينة هو الـ <b>turnaround</b> مش الـ waiting؛ والـ RR <b>preemptive</b>؛ والـ slices <b>الكبيرة جدًا</b> (مش الصغيرة) هي اللي بتحوّل الـ RR لـ FCFS؛ والـ preemptive priority بيضمن <b>soft</b> real-time بس (إجابة الكتاب).')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Try different quanta', 'جرّب quantum مختلف')}</${H2}>
          <${Fig} name="os-rr-sim" />
        `),
        page(html`
          <${H2}>${t('Quick check: Midterm 2026/27', 'شيّك بسرعة: ميدترم 2026/27')}</${H2}>
          ${mq('l3a', /round robin scheduling algorithm in a time shared/i)}
          <${Grow} />
          <${Hand}>${t('huge quantum: RR becomes FCFS. Tiny quantum: almost all context switches', 'quantum كبير جدًا: الـ RR يبقى FCFS. وquantum صغير جدًا: كله context switches')}</${Hand}>
        `),

        // ═════════ L4 · main memory
        page(html`
          <${H2}>${t('L4 · Main memory: you must know', 'م4 · الـ Main memory: لازم تعرف')}</${H2}>
          ${kv(A ? [
            ['الـ Base والـ limit', 'العنوان legal لو:' + L('base ≤ address < base + limit') + 'وغير كده trap. مثال:' + L('300040 + 120900 → 300040 … 420939')],
            ['الـ Binding', 'في الـ compile (absolute code)، أو الـ load (relocatable)، أو الـ execution (الـ process تتنقل، ومحتاج hardware).'],
            ['الـ MMU', 'بيجمع الـ relocation register على كل عنوان:' + L('14000 + 346 = 14346')],
            ['الـ Swapping', 'أغلب الوقت transfer:' + L('100 MB at 50 MB/s → 2 s out + 2 s in = 4 s')],
            ['الـ Fits', 'الـ first: أول hole يكفي. الـ best: أصغر hole يكفي. الـ worst: أكبر hole.'],
            ['الـ External', 'المساحة الكلية تكفي بس مش contiguous؛ وعلاجها الـ compaction (لو الـ relocation dynamic).'],
            ['الـ Internal', 'الحتة المخصصة أكبر من المطلوب، والفرق جوّه الـ partition ضايع.']
          ] : [
            ['Base / limit', 'legal if base ≤ address &lt; base + limit, else trap (300040 + 120900 → 300040 … 420939).'],
            ['Binding', 'compile time (absolute code), load time (relocatable), execution time (can move; needs hardware).'],
            ['MMU', 'adds the relocation register to every address: 14000 + 346 = 14346.'],
            ['Swapping', 'mostly transfer time: 100 MB at 50 MB/s → 2 s out + 2 s in = 4 s.'],
            ['Fits', 'first: first hole big enough; best: smallest big enough; worst: largest.'],
            ['External', 'total space is enough but not contiguous; cured by compaction (needs dynamic relocation).'],
            ['Internal', 'the allocated block is bigger than asked; the difference inside it is wasted.']
          ])}
        `, { sec: lecSec(4, 'Main memory', 'الـ Main memory') }),
        page(html`
          <${H2}>${t('Segmentation and paging', 'الـ Segmentation والـ paging')}</${H2}>
          <table className="hf-osF-tb hf-in"><thead><tr><th style=${{ width: '70px' }}></th><th>Paging</th><th>Segmentation</th></tr></thead><tbody>
            ${(A ? [
              ['الحجم', 'pages وframes ثابتة (power of 2)', 'segments منطقية أطوالها متغيرة'],
              ['العنوان', '(p, d) والـ page table بتدّي frame f', '(s, d) والـ table فيها base وlimit'],
              ['الـ user', 'مش شايفه', 'بيطابق نظرة الـ user (main وstack وfunctions)'],
              ['الـ Fragmentation', 'internal بس', 'external بس']
            ] : [
              ['Size', 'fixed pages / frames (a power of 2)', 'variable-length logical segments'],
              ['Address', '(p, d); the page table gives frame f', '(s, d); table holds base + limit'],
              ['User view', 'invisible to the user', 'matches the user view (main, stack, functions)'],
              ['Fragmentation', 'internal only', 'external only']
            ]).map((r, i) => html`<tr key=${i}><th>${r[0]}</th><td>${T(r[1].replace(/\(([ps]), d\)/, (m) => B(m)))}</td><td>${T(r[2].replace(/\(([ps]), d\)/, (m) => B(m)))}</td></tr>`)}
          </tbody></table>
          <${P} small=${true}>${X('Segment hardware: if d &lt; limit, physical = base + d, else <b>trap</b>. Page number = the high m − n bits, offset = the low n bits.',
            'الـ hardware بتاع الـ segments: لو الـ d أصغر من الـ limit يبقى العنوان base + d، وغير كده <b>trap</b>. والـ page number هو الـ high bits <bdi dir="ltr">m − n</bdi>، والـ offset هو الـ low n bits.')}</${P}>
          <${Code} lines=${['72,766 = 35 × 2,048 + 1,086', ['2,048 − 1,086 = 962 B', t('internal fragmentation', 'الـ internal fragmentation')], ['worst case: 1 frame − 1 byte', t('average: ½ frame', 'المتوسط: نص frame')]]} />
          <${Grow} />
          <${Hand} red=${true}>${t('the 2024/25 essay on fragmentation: give this 962-byte example and you have the full marks', 'مقالي الـ fragmentation في 2024/25: اكتب مثال الـ 962 byte ده وخد الدرجة كاملة')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Slide 33: the wasted last frame', 'سلايد 33: آخر frame الضايع')}</${H2}>
          <${Fig} name="os-page-frag" />
        `),
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Legal only if <b>d &lt; length</b>: (2, 500) with length 100 is a <b>trap</b>, not 590.', 'لازم الـ d تبقى <b>أصغر من الـ length</b>، وإلا يبقى <b>trap</b> (مش 590 في السؤال ده).')}</p></${Box}>
          <${P} small=${true}>${X('<b>Review Q6</b>, segment table (base, length): 0: 219, 600 · 1: 2300, 14 · 2: 90, 100 · 3: 1327, 580 · 4: 1952, 96.', '<b>سؤال المراجعة 6</b>، والجدول فيه الـ base والـ length:' + L('0: 219, 600 · 1: 2300, 14 · 2: 90, 100<br/>3: 1327, 580 · 4: 1952, 96'))}</${P}>
          <${Xlate} id="xl" rows=${[['(0, 430)', 649, '430 &lt; 600 → 219 + 430'], ['(1, 10)', 2310, '10 &lt; 14 → 2300 + 10'], ['(2, 500)', 'trap', '500 ≥ 100 → trap'], ['(3, 400)', 1727, '400 &lt; 580 → 1327 + 400'], ['(4, 112)', 'trap', '112 ≥ 96 → trap']]} />
        `),

        // ═════════ L5 · virtual memory
        page(html`
          <${H2}>${t('L5 · Virtual memory: you must know', 'م5 · الـ Virtual memory: لازم تعرف')}</${H2}>
          ${kv(A ? [
            ['الـ Virtual memory', 'فصل الـ logical memory عن الـ physical: جزء من البرنامج بس في الـ memory، فالـ logical space ممكن يبقى أكبر بكتير.'],
            ['الـ Demand paging', 'الـ page تدخل لما تتطلب بس. والـ lazy swapper عمره ما يدخّل page مش هتتطلب؛ وده اسمه pager.'],
            ['الـ Valid bit', 'لو v يبقى في الـ memory، ولو i مش موجودة. ولو الـ MMU لقى i يبقى page fault، وده trap للـ OS.'],
            ['الـ Page fault', 'يشيّك (لو invalid يعمل abort)، ويلاقي frame فاضي، ويقرا الـ page من الـ disk، ويخلّي الـ bit بـ v، ويعيد الـ instruction.'],
            ['الـ FIFO', 'يطلّع اللي دخلت الأول. وفيه الـ Belady\'s anomaly: frames أكتر ممكن تعمل faults أكتر.'],
            ['الـ OPT', 'يطلّع اللي استخدامها الجاي أبعد. أقل عدد faults ممكن، بس محتاج يعرف المستقبل، فهو benchmark.'],
            ['الـ LRU', 'يطلّع اللي آخر استخدام ليها أقدم. بيتعمل بـ counters أو stack؛ والـ second chance تقريب ليه.']
          ] : [
            ['Virtual memory', 'separates logical from physical memory: only part of the program is in memory, so the logical space can be much larger.'],
            ['Demand paging', 'a page comes in only when needed. A lazy swapper never swaps in a page that will not be needed: a pager.'],
            ['Valid bit', 'v = in memory, i = not. The MMU finds i → page fault = a trap to the OS.'],
            ['Page fault', 'check (invalid → abort), find a free frame, read the page from disk, set the bit to v, restart the instruction.'],
            ['FIFO', 'evicts the page loaded earliest. Suffers Belady\'s anomaly: more frames can mean more faults.'],
            ['OPT', 'evicts the page whose next use is farthest. Lowest possible faults, needs the future: a benchmark.'],
            ['LRU', 'evicts the page whose last use is oldest. Counters or a stack; second chance approximates it.']
          ])}
        `, { sec: lecSec(5, 'Virtual memory', 'الـ Virtual memory') }),
        page(html`
          <${H2}>${t("Belady's anomaly: more frames, more faults", 'الـ Belady\'s anomaly: frames أكتر و faults أكتر')}</${H2}>
          <${Fig} name="os-belady" />
        `),
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Each paper has its <b>own</b> string and frame count: never copy the lecture\'s 15 / 9 / 12 without tracing. And filling an empty frame <b>is</b> a fault.', 'كل امتحان ليه string وعدد frames <b>خاص بيه</b>: عمرك ما تنقل 15 و9 و12 بتوع المحاضرة من غير ما تحل. وملء frame فاضي <b>بيتحسب</b> fault.')}</p></${Box}>
          <${H2}>${t('Whose rule? F, O or L', 'قاعدة مين؟ F أو O أو L')}</${H2}>
          <${Sort} id="l5s" bins=${[['F', 'FIFO'], ['O', 'Optimal'], ['L', 'LRU']]} items=${A ? [
            ['بيبص لقدام وبيطلّع الأبعد', 1], ['بيطلّع اللي دخلت الأول', 0], ['بيبص لورا وبيطلّع الأقدم استخدامًا', 2],
            ['الوحيد اللي فيه الـ Belady\'s anomaly', 0], ['أقل faults ممكنة، بس benchmark', 1], ['بيتعمل بـ counters أو stack', 2]
          ] : [
            ['looks ahead, evicts the farthest', 1], ['evicts the page loaded first', 0], ['looks back, evicts the oldest use', 2],
            ["the only one with Belady's anomaly", 0], ['fewest faults possible; a benchmark', 1], ['implemented with counters or a stack', 2]
          ]} />
        `),

        // ═════════ L6 · deadlocks
        page(html`
          <${H2}>${t('L6 · Deadlocks: you must know', 'م6 · الـ Deadlocks: لازم تعرف')}</${H2}>
          <${Def}>${X('Deadlock can arise only if <b>all four</b> hold at once: <b>mutual exclusion</b>, <b>hold and wait</b>, <b>no preemption</b>, <b>circular wait</b>.', 'الـ deadlock ممكن يحصل بس لو <b>الأربعة</b> اتحققوا مع بعض: الـ <b>mutual exclusion</b> والـ <b>hold and wait</b> والـ <b>no preemption</b> والـ <b>circular wait</b>.')}</${Def}>
          ${kv(A ? [
            ['الـ RAG', 'مفيش cycle يبقى مفيش deadlock. وcycle مع instance واحدة لكل نوع يبقى deadlock. وcycle مع كذا instance يبقى احتمال.'],
            ['التعامل', 'يا prevention أو avoidance، يا detection وrecovery، يا نتجاهل المشكلة (زي أغلب الـ OSs ومنهم الـ UNIX).'],
            ['الـ Safe state', 'فيه sequence الكل يخلص بيها. والـ safe معناه مفيش deadlock، والـ unsafe معناه <b>احتمال</b> deadlock.'],
            ['الـ Banker', 'الـ Need هي' + L('Max − Allocation') + 'وبعدين' + L('Work = Available') + 'ودوّر على process الـ Need بتاعها ≤ الـ Work، وزوّد الـ Allocation بتاعها على الـ Work.'],
          ] : [
            ['RAG', 'no cycle → no deadlock. Cycle + one instance per type → deadlock. Cycle + several instances → possible.'],
            ['Handling', 'prevent or avoid; detect and recover; or ignore it (most OSs, UNIX included).'],
            ['Safe state', 'a sequence exists in which everyone finishes. Safe → no deadlock; unsafe → <b>possible</b> deadlock.'],
            ["Banker's", 'Need = Max − Allocation; Work = Available; find Need ≤ Work, add its Allocation to Work.'],
          ])}
        `, { sec: lecSec(6, 'Deadlocks', 'الـ Deadlocks') }),
        page(html`
          <${H2}>${t('Cycle or deadlock? The RAG', 'Cycle ولا deadlock؟ الـ RAG')}</${H2}>
          <${Fig} name="os-dl-rag" />
        `),
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The condition is <b>no</b> preemption: an option that says just "Preemption" is the one that is <b>not</b> a condition. And <b>unsafe ≠ deadlocked</b>: unsafe only means a deadlock is possible.', 'الشرط اسمه <b>no</b> preemption: الاختيار اللي مكتوب فيه "Preemption" بس هو اللي <b>مش</b> شرط. والـ <b>unsafe مش معناه deadlock</b>: معناه بس إن الـ deadlock ممكن يحصل.')}</p></${Box}>
          <${H2}>${t('Break one, and there is no deadlock', 'اكسر واحد ومفيش deadlock')}</${H2}>
          <${Breaker} id="brk" conds=${[
            { en: ['Mutual exclusion', 'Generally <b>cannot</b> be denied: sharable resources (read-only files) do not need it, but non-sharable ones must have it.'], ar: ['الـ Mutual exclusion', 'غالبًا <b>مينفعش</b> يتكسر: الـ resources اللي بتتشارك (read-only files) مش محتاجاه، بس اللي مبتتشاركش لازم يبقى فيها.'] },
            { en: ['Hold and wait', 'Request <b>all</b> resources before starting, or only when holding none. Cost: low utilization, possible starvation.'], ar: ['الـ Hold and wait', 'اطلب <b>كل</b> الـ resources قبل ما تبدأ، أو اطلب وإنت مش ماسك حاجة. والتمن: utilization قليل وstarvation ممكن.'] },
            { en: ['No preemption', 'If a request cannot be granted, <b>release everything held</b>; restart when old + new are available. For resources whose state is easily saved (registers, memory).'], ar: ['الـ No preemption', 'لو الطلب مينفعش يتلبى، <b>سيب كل اللي ماسكه</b>، وابدأ تاني لما القديم والجديد يبقوا متاحين. ده للـ resources اللي حالتها سهل تتحفظ (الـ registers والـ memory).'] },
            { en: ['Circular wait', '<b>Number</b> the resource types and request in increasing order: tape 1, disk 5, printer 12, so the tape comes before the printer.'], ar: ['الـ Circular wait', '<b>رقّم</b> أنواع الـ resources واطلب بالترتيب التصاعدي: الـ tape 1 والـ disk 5 والـ printer 12، فالـ tape قبل الـ printer.'] }]} />
        `),

        // ═════════ L7 · file system
        page(html`
          <${H2}>${t('L7 · File system: you must know', 'م7 · الـ File system: لازم تعرف')}</${H2}>
          ${kv(A ? [
            ['الـ Attributes', 'الـ name (الوحيد اللي بيتقري للبني آدم)، والـ identifier، والـ type، والـ location، والـ size، والـ protection، والـ time وdate وuser.'],
            ['الـ Access', 'الـ sequential (read next وwrite next وreset)، أو الـ direct (read n حيث n هو relative block number).'],
            ['الـ Directories', 'الـ single-level فيه مشكلة naming وgrouping؛ والـ two-level فيه UFD لكل user؛ والـ tree فيه grouping وcurrent directory.'],
            ['الـ chmod', 'كل رقم octal بـ' + L('R = 4, W = 2, X = 1') + 'يعني' + L('761 → owner RWX, group RW-, public --X')],
            ['الـ Contiguous', 'الـ directory بيحفظ start وlength، والـ performance أحسن حاجة؛ بس فيه external fragmentation ولازم تعرف الحجم.'],
            ['الـ Linked', 'كل block بيشاور على اللي بعده. مفيش external fragmentation، والـ FAT تنويعة منه؛ بس الـ direct access بطيء.'],
            ['الـ Indexed', 'الـ index block فيه كل الـ pointers. فيه random access، والعيب الـ overhead بتاع الـ index block.']
          ] : [
            ['Attributes', 'name (the only human-readable one), identifier, type, location, size, protection, time/date/user.'],
            ['Access', 'sequential (read next, write next, reset) or direct (read n, n = relative block number).'],
            ['Directories', 'single-level: naming + grouping problems; two-level: a UFD per user; tree: grouping, current directory.'],
            ['chmod', 'R = 4, W = 2, X = 1 per octal digit: 761 → owner RWX, group RW-, public --X.'],
            ['Contiguous', 'directory keeps start + length; best performance; external fragmentation, size needed.'],
            ['Linked', 'each block points to the next; no external fragmentation; FAT is a variant; slow direct access.'],
            ['Indexed', 'an index block holds all the pointers; random access; index-block overhead.']
          ])}
        `, { sec: lecSec(7, 'File system', 'الـ File system') }),
        page(html`
          <${H2}>${t('Three ways to place a file', 'تلات طرق تحط بيها الـ file')}</${H2}>
          <${Fig} name="os-alloc-methods" />
        `),
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Asked in <b>all five</b> finals. A list of names gets little: compare the methods on the same rows, with the lecture\'s examples.', 'اتسأل في <b>الخمس</b> امتحانات. الأسامي لوحدها بتاخد حاجة بسيطة: قارن على نفس النقط وبأمثلة المحاضرة.')}</p></${Box}>
          <${H2}>${t('Cover and recall', 'غطّي وافتكر')}</${H2}>
          <${Cover} id="cov" head=${['Contiguous', 'Linked', 'Indexed']} rows=${A ? [
            ['الـ directory', 'الـ start والـ length' + L('tr: 14, 3'), 'الـ start والـ end' + L('jeep: 9 … 25'), 'رقم الـ index block' + L('jeep: 19')],
            ['الـ Direct access', 'أيوه وسريع', 'بطيء: لازم تمشي ورا الـ pointers', 'أيوه'],
            ['الـ External frag.', 'موجود (والـ compaction)', 'مفيش', 'مفيش'],
            ['تعرف الحجم؟', 'لازم', 'مش لازم', 'مش لازم'],
            ['العيب', 'تلاقي مكان', 'الـ pointer لو ضاع، ومساحة الـ pointers', 'الـ overhead بتاع الـ index block']
          ] : [
            ['Directory keeps', 'start + length (tr: 14, 3)', 'start + end (jeep: 9 … 25)', 'the index block (jeep: 19)'],
            ['Direct access', 'yes, fast', 'slow: follow the pointers', 'yes'],
            ['External frag.', 'yes (compaction)', 'none', 'none'],
            ['Size needed first?', 'yes', 'no', 'no'],
            ['Weak point', 'finding space', 'a lost pointer; pointer space', 'index-block overhead']
          ]} />
        `),

        // ═════════ L8 · I/O
        page(html`
          <${H2}>${t('L8 · I/O systems: you must know', 'م8 · الـ I/O systems: لازم تعرف')}</${H2}>
          ${kv(A ? [
            ['الـ Polling', 'الـ host بيقرا الـ busy bit لحد ما يبقى 0، وده busy-wait: كويس للجهاز السريع، وخسارة للبطيء.'],
            ['الـ Interrupts', 'الـ CPU بيبص على الـ Interrupt Request Line <b>بعد كل instruction</b>، ويحفظ الحالة وينط للـ handler.'],
            ['الـ Registers', 'الـ data-in والـ data-out والـ status والـ control؛ وبيتوصلوا بـ I/O instructions أو memory-mapped I/O.'],
            ['الـ Devices', 'الـ block (disk) فيها read وwrite وseek؛ والـ character (keyboard) فيها get() وput().'],
            ['الـ DMA', 'الـ OS بيكتب command block (source وdestination وmode وcount)، والـ controller بياخد الـ bus (cycle stealing).'],
            ['مميزاته', 'الـ CPU فاضي لشغل تاني، وinterrupt واحد لكل block، وسرعة قريبة من الـ memory، وinterrupts وcontext switches أقل.'],
            ['تكلفة الـ interrupt', 'حفظ حالة الـ process في الـ PCB، وتشغيل الـ ISR، ورجوع الحالة، ونسخ الداتا.']
          ] : [
            ['Polling', 'the host reads the busy bit until 0: a busy-wait. Fine for a fast device, wasteful for a slow one.'],
            ['Interrupts', 'the CPU senses the Interrupt Request Line <b>after every instruction</b>, saves state, jumps to the handler.'],
            ['Registers', 'data-in, data-out, status, control; reached by I/O instructions or memory-mapped I/O.'],
            ['Devices', 'block (disk): read, write, seek; character (keyboard): get(), put().'],
            ['DMA', 'the OS writes a command block (source, destination, mode, count); the controller grabs the bus (cycle stealing).'],
            ['Advantages', 'CPU free for other work; one interrupt per block; near-memory speed; fewer interrupts and context switches.'],
            ['Interrupt cost', 'save the process state in its PCB, run the ISR, restore the state; plus data copying.']
          ])}
        `, { sec: lecSec(8, 'I/O systems', 'الـ I/O systems') }),
        page(html`
          <${H2}>${t('The six DMA steps (2025/26, 2023/24)', 'الـ 6 خطوات بتوع الـ DMA (2025/26 و2023/24)')}</${H2}>
          <${Fig} name="os-io-dma-six" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Put the six steps in order', 'رتّب الـ 6 خطوات')}><p className="hf-p small">${t('Tap them from step 1 to step 6.', 'دوس عليهم من الخطوة 1 للخطوة 6.')}</p></${Box}>
          <${Order} id="dma6" right=${[2, 4, 0, 5, 3, 1]} items=${A ? [
            'الـ disk controller بيبدأ الـ DMA transfer.',
            'لما الـ <bdi dir="ltr">C = 0</bdi>، الـ DMA بيعمل interrupt للـ CPU إن النقل خلص.',
            'الـ device driver بيتطلب منه ينقل داتا من الـ disk لـ buffer على العنوان X.',
            'الـ DMA controller بيكتب الـ bytes في X، ويزوّد العنوان وينقّص الـ C لحد ما يبقى 0.',
            'الـ device driver بيقول للـ disk controller ينقل C bytes للـ buffer على X.',
            'الـ disk controller بيبعت كل byte للـ DMA controller.'
          ] : [
            'The disk controller initiates the DMA transfer.',
            'When C = 0, DMA interrupts the CPU to signal completion.',
            'The device driver is told to transfer disk data to the buffer at address X.',
            'The DMA controller writes the bytes to X, address + 1 and C − 1, until C = 0.',
            'The device driver tells the disk controller to transfer C bytes to the buffer at X.',
            'The disk controller sends each byte to the DMA controller.'
          ]} />
        `),
        page(html`
          <${H2}>${t('Watch C count down', 'اتفرج على الـ C وهو بينزل')}</${H2}>
          <${DmaCount} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Advantages of DMA" (2024/25, 2021/22) is not "the steps of DMA" (2025/26, 2023/24). Read which one is asked. And DMA still steals bus cycles: the advantage is <b>one interrupt per block</b>, not zero cost.', 'سؤال "مميزات الـ DMA" (2024/25 و2021/22) غير سؤال "خطوات الـ DMA" (2025/26 و2023/24). اقرا هو سايل في أنهي واحد. والـ DMA لسه بيسرق bus cycles: الميزة إنه <b>interrupt واحد لكل block</b>، مش إن مفيش تكلفة خالص.')}</p></${Box}>
        `),

        // ═════════ the problems that always come up · CPU scheduling
        page(html`
          <${H2}>${t('Problem 1 · CPU scheduling: the method', 'المسألة 1 · الـ CPU scheduling: الطريقة')}</${H2}>
          ${steps(A ? [
            'انقل الجدول، وعلّم الـ arrival times. لو الكل عند 0 والاتنين متعادلين، خد ترتيب الجدول.',
            'ارسم الـ Gantt chart، واكتب الوقت تحت كل حد، وابدأ من 0.',
            'خد الـ CT من الـ chart، وبعدين' + L('TAT = CT − AT, WT = TAT − BT'),
            'المتوسط هو المجموع على n، واكتب القسمة:' + L('26/4 = 6.5'),
            'ولو سألك "أنهي أقل متوسط"، قارن الأرقام وقول اسم الـ algorithm.'
          ] : [
            'Copy the table and mark the arrival times. All at 0 and tied? Use table order.',
            'Draw the Gantt chart, writing the time under every boundary, starting at 0.',
            'Read CT off the chart; TAT = CT − AT; WT = TAT − BT.',
            'Average = sum / n, and show the division: 26/4 = 6.5.',
            'If it asks "which is minimal", compare and name the algorithm.'
          ])}
          <${Box} kind="watch"><p className="hf-p small">${X('<b>SRTF</b>: decide again at <b>every arrival</b>, comparing the newcomer\'s burst with the running process\'s <b>remaining</b> time. <b>RR</b>: when a process arrives exactly as a quantum ends, this book (and the site\'s answers) queues the newcomer <b>first</b>. <b>Priority</b>: smallest number = highest. Nobody arrived yet? The CPU sits idle.',
            'الـ <b>SRTF</b>: قرر من الأول عند <b>كل arrival</b>، وقارن الـ burst بتاع اللي وصلت بالوقت <b>الفاضل</b> للي شغالة. والـ <b>RR</b>: لو process وصلت بالظبط لما الـ quantum خلص، الكتاب ده (وإجابات الموقع) بيحط اللي وصلت <b>الأول</b>. والـ <b>Priority</b>: أصغر رقم هو الأعلى. ولو لسه محدش وصل؟ الـ CPU يقعد idle.')}</p></${Box}>
        `, { sec: t('The problems that always come up', 'المسائل اللي بتيجي كل سنة') }),
        page(html`
          ${stmt(t('Final 2024/25 · Q2-1 (12 marks)', 'فاينال 2024/25 · س2-1 (12 درجة)'), html`
            <p>${X('Draw four Gantt charts: <b>preemptive SJF</b> (SRTF), non-preemptive <b>FCFS</b>, a <b>priority</b>, and <b>RR (q = 4)</b>. Find each waiting time and the average.', 'ارسم أربع Gantt charts: الـ <b>preemptive SJF</b> (يعني SRTF)، والـ <b>FCFS</b> الـ non-preemptive، والـ <b>priority</b>، والـ <b>RR</b> بـ <bdi dir="ltr">q = 4</bdi>. وهات الـ waiting time لكل واحدة والمتوسط.')}</p>
            <${PT} head=${['P', 'Arrival', 'Burst', 'Priority']} rows=${Q24.map(p => [p[0], p[1], p[2], p[3]])} />`)}
          <${Box} kind="watch"><p className="hf-p small">${X('The paper says "the processes are assumed preemptive" and then lists non-preemptive FCFS, priority and RR. Solve priority non-preemptively; here the preemptive version gives the <b>same chart</b>, because P1 (priority 1, the highest) arrives first.', 'الامتحان بيقول إن الـ processes "preemptive" وبعدين بيكتب FCFS وpriority وRR وهما non-preemptive. حل الـ priority على إنه non-preemptive؛ وهنا الـ preemptive بيدّي <b>نفس الـ chart</b>، عشان الـ P1 (priority 1، الأعلى) هي اللي وصلت الأول.')}</p></${Box}>
          <${Grow} />
          <${Reveal} id="q24-avg" label=${t('Show the four averages', 'اعرض المتوسطات الأربعة')}><p className="hf-osF-avg">SRTF 6.5 · FCFS 8.75 · Priority 10.25 · RR4 11.75</p>
            <p className="hf-hand" style=${{ textAlign: 'center' }}>${t('SRTF is the minimum, as preemptive SJF always is', 'الـ SRTF هو الأقل، زي ما الـ preemptive SJF دايمًا')}</p></${Reveal}>
        `),
        page(html`
          <${H2}>${t('Work it: Final 2024/25 · Q2-1', 'حلها: فاينال 2024/25 · س2-1')}</${H2}>
          <${Bench} id="b24" procs=${Q24} arr=${true} pri=${true} algos=${[['SRTF'], ['FCFS'], ['PRIO'], ['RR', 4]]} />
        `),
        page(html`
          ${stmt(t('Final 2022/23 · Q1-a (10 marks)', 'فاينال 2022/23 · س1-أ (10 درجات)'), html`
            <p>${X('Five processes, all at time 0, in the order P0 … P4. Draw <b>FCFS, SJF, priority</b> (smaller = higher) and <b>RR (q = 2)</b>; the waiting time of each; which is minimal?', 'خمس processes كلهم عند 0 بالترتيب من P0 لـ P4. ارسم <b>FCFS وSJF وpriority</b> (الأصغر أعلى) و<b>RR</b> بـ <bdi dir="ltr">q = 2</bdi>؛ وهات الـ waiting لكل واحدة؛ وأنهي الأقل؟')}</p>
            <${PT} head=${['P', 'Burst', 'Priority']} rows=${Q22.map(p => [p[0], p[2], p[3]])} />`)}
          <${Box} kind="brain"><p className="hf-p small">${X('All arrive at 0 and only RR preempts. So in FCFS, SJF and priority, <b>WT = start time</b>. Do those three in your head before you touch RR.', 'الكل عند 0، والـ RR بس هو اللي بيعمل preempt. يعني في الـ FCFS والـ SJF والـ priority الـ <b>WT هو وقت البداية</b>. احسب التلاتة دول في دماغك قبل ما تمسك الـ RR.')}</p></${Box}>
          <${Grow} />
          <${Reveal} id="q22-avg" label=${t('Show the four averages', 'اعرض المتوسطات الأربعة')}><p className="hf-osF-avg">FCFS 14.6 · SJF 9.2 · Priority 11 · RR2 19</p>
            <p className="hf-hand" style=${{ textAlign: 'center' }}>${t('SJF is minimal; RR with q = 2 is the worst here (17 slices!)', 'الـ SJF هو الأقل؛ والـ RR هو الأسوأ هنا، وفيه 17 حتة!')}</p></${Reveal}>
        `),
        page(html`
          <${H2}>${t('Work it: Final 2022/23 · Q1-a', 'حلها: فاينال 2022/23 · س1-أ')}</${H2}>
          <${Bench} id="b22" procs=${Q22} pri=${true} algos=${[['FCFS'], ['SJF'], ['PRIO'], ['RR', 2]]} />
        `),
        page(html`
          ${stmt(t('Final 2025/26 · Q4-a (5 marks)', 'فاينال 2025/26 · س4-أ (5 درجات)'), html`
            <p>${X('Four processes, all at time 0. Draw <b>FCFS, RR and SJF (quantum = 3)</b> and give the average waiting time of each. On the scanned paper the bursts were <b>corrected by hand</b> (P1 6 → 3, P3 5 → 2, P4 4 → 1). Do both versions.', 'أربع processes كلهم عند 0. ارسم <b>FCFS وRR وSJF</b> (الـ <bdi dir="ltr">quantum = 3</bdi>) وهات متوسط الـ waiting لكل واحدة. وفي ورقة الامتحان الـ bursts <b>اتصلحت بخط اليد</b> (الـ P1 من 6 لـ 3، والـ P3 من 5 لـ 2، والـ P4 من 4 لـ 1). حل النسختين.')}</p>`)}
          <${Avgs} id="a26" cases=${[{ en: 'Corrected', ar: 'المصلحة', procs: Q26c, algos: [['FCFS'], ['RR', 3], ['SJF']] }, { en: 'As printed', ar: 'المطبوعة', procs: Q26p, algos: [['FCFS'], ['RR', 3], ['SJF']] }]} />
        `),
        page(html`
          <${H2}>${t('The other papers, in one table', 'باقي الامتحانات في جدول واحد')}</${H2}>
          <${P} small=${true}>${t('All at time 0. Average waiting time per algorithm, computed by this page. Cover the table, solve, then reveal.', 'الكل عند 0. متوسط الـ waiting لكل algorithm، محسوب في الصفحة دي. غطّي الجدول وحل، وبعدين اكشف.')}</${P}>
          ${(() => { const rows = [
            [t('Final 2023/24 Q1-a', 'فاينال 2023/24'), [['P1', 0, 8, 3], ['P2', 0, 3, 1], ['P3', 0, 2, 2], ['P4', 0, 1, 4], ['P5', 0, 4, 5]], 1],
            [t('Final 2021/22 Q2-1', 'فاينال 2021/22'), [['P1', 0, 10, 3], ['P2', 0, 1, 1], ['P3', 0, 2, 3], ['P4', 0, 1, 4], ['P5', 0, 5, 2]], 1],
            [t('Midterm 2021/22', 'ميدترم 2021/22'), [['P1', 0, 10, 3], ['P2', 0, 3, 1], ['P3', 0, 2, 2], ['P4', 0, 1, 4]], 1]];
            const av = (ps, a, qq) => { const s = sched(ps, a, qq); return fmt(ps.reduce((x, p) => x + s.wt[p[0]], 0) / ps.length); };
            return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
              ${rows.map(([nm, ps], i) => html`<p key=${i} className="hf-osF-avg" style=${{ color: 'var(--ink)', textAlign: 'start' }}><b style=${{ fontFamily: 'var(--body)' }}>${nm}</b><br/>${ps.map(p => p[0] + '=' + p[2] + '(' + p[3] + ')').join(' ')}</p>`)}
              <${Reveal} id="oth" label=${t('Show the averages', 'اعرض المتوسطات')}>
                <table className="hf-osF-pt" dir="ltr"><thead><tr><th></th><th>FCFS</th><th>SJF</th><th>Prio</th><th>RR q=1</th></tr></thead><tbody>
                  ${rows.map(([nm, ps], i) => html`<tr key=${i}><td>${['23/24', '21/22', 'Mid 21/22'][i]}</td><td>${av(ps, 'FCFS')}</td><td><b>${av(ps, 'SJF')}</b></td><td>${av(ps, 'PRIO')}</td><td>${av(ps, 'RR', 1)}</td></tr>`)}</tbody></table>
                <${Gantt} blocks=${merge(sched(rows[0][1], 'SJF').blocks)} />
                <p className="hf-hand" style=${{ textAlign: 'center' }}>${t('2023/24 SJF above. SJF is minimal in every all-at-0 paper', 'فوق الـ SJF بتاع 2023/24. والـ SJF هو الأقل في كل امتحان الكل فيه عند 0')}</p>
              </${Reveal}></div>`; })()}
          <${Grow} />
          <${Hand} red=${true}>${t('2023/24 says "P1, P2, P3, P4" but the table has five processes: schedule all five', 'امتحان 2023/24 بيقول P1 لـ P4 بس الجدول فيه خمسة: جدول الخمسة')}</${Hand}>
        `),
        page(html`
          ${stmt(ours, html`
            <p>${X('Arrival times this time, so the order matters. Draw <b>FCFS, SJF, SRTF, priority</b> (non-preemptive) and <b>RR (q = 3)</b>.', 'المرة دي فيه arrival times، فالترتيب فارق. ارسم <b>FCFS وSJF وSRTF وpriority</b> (non-preemptive) و<b>RR</b> بـ <bdi dir="ltr">q = 3</bdi>.')}</p>
            <${PT} head=${['P', 'Arrival', 'Burst', 'Priority']} rows=${OURS_S.map(p => [p[0], p[1], p[2], p[3]])} />`)}
          <${Box} kind="brain"><p className="hf-p small">${X('Two places to slip. In <b>SJF</b> at t = 7, P2 and P4 both have burst 4: the tie goes to the earlier arrival. In <b>RR</b>, P3 arrives at t = 3, exactly when P1\'s first quantum ends.', 'فيه مكانين تتزحلق فيهم. في الـ <b>SJF</b> عند <bdi dir="ltr">t = 7</bdi>، الـ P2 والـ P4 الاتنين burst 4: والتعادل للي وصلت الأول. وفي الـ <b>RR</b>، الـ P3 بتوصل عند <bdi dir="ltr">t = 3</bdi> بالظبط لما الـ quantum الأول بتاع الـ P1 بيخلص.')}</p></${Box}>
          <${Grow} />
          <${Reveal} id="os-avg" label=${t('Show the five averages', 'اعرض المتوسطات الخمسة')}><p className="hf-osF-avg">FCFS 5 · SJF 4.25 · SRTF 3 · Priority 5.75 · RR3 6.5</p></${Reveal}>
        `),
        page(html`
          <${H2}>${t('Work it: our variant', 'حلها: النسخة بتاعتنا')}</${H2}>
          <${Bench} id="bo" procs=${OURS_S} arr=${true} pri=${true} algos=${[['FCFS'], ['SJF'], ['SRTF'], ['PRIO'], ['RR', 3]]} />
        `),

        // ═════════ fits
        page(html`
          <${H2}>${t('Problem 2 · First, best, worst fit', 'المسألة 2 · الـ First والـ best والـ worst fit')}</${H2}>
          ${steps(A ? [
            'خد الـ processes بالترتيب، واحدة واحدة.',
            'الـ <b>First</b>: امشي على الـ partitions من الأول، وأول واحد يكفي هو اللي تاخده.',
            'الـ <b>Best</b>: أصغر hole يكفي. والـ <b>Worst</b>: أكبر hole.',
            'اطرح: الـ hole بيصغر، والباقي ممكن تحط فيه process بعد كده.',
            'لو مفيش hole يكفي، اكتب إن الـ process <b>لازم تستنى</b>.',
            'جاوب "أنهي أكفأ": اللي حط الكل (في كل الامتحانات اللي فاتت كان الـ best-fit).'
          ] : [
            'Take the processes in order, one at a time.',
            '<b>First</b>: scan the partitions from the start; take the first one big enough.',
            '<b>Best</b>: the smallest hole that fits. <b>Worst</b>: the largest hole.',
            'Subtract: the hole shrinks, and a later process may use what is left.',
            'If no hole fits, write that the process <b>must wait</b>.',
            'Answer "most efficient": the one that placed everyone (best-fit, in every past paper).'
          ])}
          <${Box} kind="watch"><p className="hf-p small">${X('First-fit scans from the <b>beginning</b> every time (the lecture\'s rule), so a leftover early in the list is taken before a fresh partition later on. Slide numbers: 112 goes into the <b>288 KB leftover</b> of the 500, before the 200.', 'الـ first-fit بيبدأ من <b>الأول</b> كل مرة (قاعدة المحاضرة)، فالباقي اللي في أول القايمة بيتاخد قبل partition جديد بعده. أرقام السلايدز: الـ 112 بتروح في <b>الـ 288 KB الباقيين</b> من الـ 500، قبل الـ 200.')}</p></${Box}>
        `),
        page(html`
          ${stmt(t('Final 2022/23 · Q1-b (10 marks)', 'فاينال 2022/23 · س1-ب (10 درجات)'), html`
            <p>${X('Place the processes (rows, in order) into the partitions (columns, in order) with each algorithm. The last column = must wait.', 'حط الـ processes (الصفوف بالترتيب) في الـ partitions (الأعمدة بالترتيب) بكل algorithm. والعمود الأخير يعني تستنى.')}</p>`)}
          <${FitPlay} id="f22" parts=${F22[0]} procs=${F22[1]} />
          <${Grow} />
          <${Reveal} id="f22-a" label=${t('Show which is most efficient', 'اعرض أنهي الأكفأ')}><p className="hf-hand">${t('best-fit places all four; first and worst leave 450 waiting', 'الـ best-fit حط الأربعة؛ والـ first والـ worst سابوا الـ 450 تستنى')}</p></${Reveal}>
        `),
        page(html`
          ${stmt(t('Finals 2025/26 Q2-a · 2023/24 Q1-b (the slide numbers)', 'فاينال 2025/26 س2-أ و2023/24 س1-ب (أرقام السلايدز)'), html`
            <p>${X('Same task. Final 2021/22 Q2-2 is the same with <b>150</b> and <b>250</b> instead of 100 and 200.', 'نفس المطلوب. وفاينال 2021/22 س2-2 هو هو بس بـ <b>150</b> و<b>250</b> بدل 100 و200.')}</p>`)}
          <${FitPlay} id="fsl" parts=${FSL[0]} procs=${FSL[1]} />
          <${Grow} />
          <${Reveal} id="f21" label=${t('Show what changes in 2021/22', 'اعرض إيه اللي بيتغير في 2021/22')}><p className="hf-hand">${t('first-fit: 112 now fits the 150 (38 left), the first partition. best-fit: 212 → 250 (38 left). Worst-fit is unchanged. 426 still waits in first and worst', 'الـ first-fit: الـ 112 تروح الـ 150 ويفضل 38. والـ best-fit: الـ 212 تروح الـ 250 ويفضل 38. والـ worst زي ما هو، والـ 426 لسه بتستنى')}</p></${Reveal}>
        `),
        page(html`
          ${stmt(ours, html`
            <p>${X('Same task, new numbers. Watch where first-fit puts 160.', 'نفس المطلوب بأرقام جديدة. وخلّي بالك الـ first-fit هيحط الـ 160 فين.')}</p>`)}
          <${FitPlay} id="fo" parts=${FOURS[0]} procs=${FOURS[1]} />
          <${Grow} />
          <${Reveal} id="fo-a" label=${t('Show the catch', 'اعرض الفخ')}><p className="hf-hand">${t('160 goes into the 180 (the first partition), not the 270 left of the 520. Best-fit places all four', 'الـ 160 بتروح الـ 180، أول partition، مش الـ 270 الباقيين من الـ 520. والـ best-fit بيحط الأربعة')}</p></${Reveal}>
        `),

        // ═════════ page replacement
        page(html`
          <${H2}>${t('Problem 3 · Counting page faults', 'المسألة 3 · عدّ الـ page faults')}</${H2}>
          ${steps(A ? [
            'ارسم عمود لكل reference، وصف لكل frame، وصف للـ Fault تحت.',
            'الـ page موجودة؟ يبقى hit ومتعلّمش حاجة. فيه frame فاضي؟ حطها فيه، وده <b>fault</b>.',
            'الـ <b>FIFO</b>: طلّع اللي دخلت الأول (الـ page اللي رجعت تتحسب من دخولها الجديد).',
            'الـ <b>OPT</b>: بص لقدام، وطلّع اللي جاية أبعد (واللي مش جاية تاني هي الأبعد).',
            'الـ <b>LRU</b>: بص لورا، وطلّع اللي آخر استخدام ليها أقدم.',
            'عدّ الـ F واكتب التلات أرقام. والـ OPT دايمًا هو الأقل.'
          ] : [
            'One column per reference, one row per frame, a Fault row below.',
            'Page already there? A hit: mark nothing. An empty frame? Put it there: a <b>fault</b>.',
            '<b>FIFO</b>: evict the page loaded earliest (a re-loaded page counts from its new load).',
            '<b>OPT</b>: look ahead; evict the page used farthest away (never again = farthest).',
            '<b>LRU</b>: look back; evict the page whose last use is oldest.',
            'Count the Fs and write all three totals. OPT is always the lowest.'
          ])}
          <${Box} kind="watch"><p className="hf-p small">${X('Two OPT traps. If several pages are <b>never used again</b>, any of them is a right victim (state which you chose). And LRU looks at the <b>last use</b>, not at when the page was loaded: a hit refreshes LRU, but not FIFO.', 'فخّين في الـ OPT. لو فيه كذا page <b>مش هتتستخدم تاني</b>، أي واحدة فيهم victim صح (قول إنت اخترت مين). والـ LRU بيبص على <b>آخر استخدام</b>، مش على امتى الـ page دخلت: الـ hit بيجدد الـ LRU، إنما مش بيجدد الـ FIFO.')}</p></${Box}>
        `, { sec: t('Page replacement', 'الـ Page replacement') }),
        page(html`
          ${stmt(t('Final 2025/26 · Q3-a (5 marks) · 3 frames', 'فاينال 2025/26 · س3-أ (5 درجات) · 3 frames'), html`<p className="ltr" style=${{ fontFamily: 'var(--mono)', fontWeight: 700 }}>${R26.join(', ')}</p>`)}
          <${Replacer} id="r26" refs=${R26} nf=${3} />
        `),
        page(html`
          ${stmt(t('Final 2024/25 · Q2-2 (12 marks) · 4 frames', 'فاينال 2024/25 · س2-2 (12 درجة) · 4 frames'), html`<p className="ltr" style=${{ fontFamily: 'var(--mono)', fontWeight: 700 }}>${R24.join(', ')}</p>`)}
          <${Replacer} id="r24" refs=${R24} nf=${4} per=${11} />
        `),
        page(html`
          <${H2}>${t('The other strings', 'باقي الـ strings')}</${H2}>
          ${kv(A ? [
            ['فاينال 2023/24', 'نفس string الـ 2024/25 من غير الـ 9 اللي قبل الأخيرة (كانت hit)، وبـ 4 frames:' + L('FIFO 10 · OPT 8 · LRU 8')],
            ['فاينال 2022/23', 'هي string المحاضرة بأسامي تانية' + L('7→5, 0→8, 1→6') + 'وبـ 3 frames:' + L('FIFO 15 · OPT 9 · LRU 12')],
            ['فاينال 2021/22', 'أول 16 reference من string المحاضرة، وبـ 3 frames:' + L('FIFO 11 · OPT 8 · LRU 10')],
            ['المحاضرة', 'الـ 22 reference كلهم وبـ 3 frames:' + L('FIFO 15 · OPT 9 · LRU 12')]
          ] : [
            ['Final 2023/24', '2024/25\'s string without the second-to-last 9 (a hit); 4 frames → FIFO 10, OPT 8, LRU 8.'],
            ['Final 2022/23', 'the lecture string renamed (7→5, 0→8, 1→6); 3 frames → FIFO 15, OPT 9, LRU 12.'],
            ['Final 2021/22', 'the first 16 lecture references; 3 frames → FIFO 11, OPT 8, LRU 10.'],
            ['The lecture', 'all 22 references; 3 frames → FIFO 15, OPT 9, LRU 12.']
          ])}
          <${Box} kind="brain"><p className="hf-p small">${X('Belady, the one string to remember: <span class="ltr">1,2,3,4,1,2,5,1,2,3,4,5</span>. FIFO gives <b>9</b> faults with 3 frames and <b>10</b> with 4. Why can LRU and OPT never do this?', 'الـ Belady، الـ string الوحيدة اللي تحفظها:<span class="ltr">1,2,3,4,1,2,5,1,2,3,4,5</span>الـ FIFO بيدّي <b>9</b> faults بـ 3 frames و<b>10</b> بـ 4. ليه الـ LRU والـ OPT عمرهم ما يعملوا كده؟')}</p></${Box}>
          <${Grow} />
          <${Reveal} id="bel" label=${t('Show the answer', 'اعرض الإجابة')}><p className="hf-hand">${t('they are stack algorithms: the pages held with n frames are always among those held with n + 1', 'عشان هما stack algorithms: الـ pages اللي في n frames دايمًا من ضمن اللي في n + 1')}</p></${Reveal}>
        `),
        page(html`
          ${stmt(ours + ' · 3 frames', html`<p className="ltr" style=${{ fontFamily: 'var(--mono)', fontWeight: 700 }}>${ROURS.join(', ')}</p>`)}
          <${Replacer} id="ro" refs=${ROURS} nf=${3} />
          <${Grow} />
          <${Hand}>${t('OPT at reference #10: 4 and 3 are both never used again, so either is right', 'الـ OPT عند الـ reference رقم 10: الـ 4 والـ 3 الاتنين مش جايين تاني، فأي واحدة صح')}</${Hand}>
        `),

        // ═════════ banker's
        page(html`
          <${H2}>${t("Problem 4 · The banker's algorithm", 'المسألة 4 · الـ Banker\'s algorithm')}</${H2}>
          ${steps(A ? [
            'اكتب جدول الـ Need:' + L('Need = Max − Allocation') + 'خانة خانة.',
            'شيّك: الـ Available هو الإجمالي ناقص مجموع الـ Allocation.',
            'ابدأ بالـ Work هو الـ Available، وامشي من P0: أي process الـ Need بتاعها ≤ الـ Work، زوّد الـ Allocation بتاعها على الـ Work.',
            'لفّ تاني لحد ما الكل يخلص، أو لفة محدش يتحرك فيها.',
            'اكتب الـ Work بعد كل process، والـ sequence، والنتيجة: SAFE أو UNSAFE.'
          ] : [
            'Write the Need table: Need = Max − Allocation, cell by cell.',
            'Check Available: totals minus the column sums of Allocation.',
            'Work = Available. Scan P0 … Pn: if Need ≤ Work, Work += Allocation, Finish = true.',
            'Scan again until all finish, or a full pass moves nobody.',
            'Write Work after each process, the sequence, and the verdict: SAFE or UNSAFE.'
          ])}
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Available (0,0,0) is not unsafe</b> by itself: a process with Need 0 finishes first and releases. And at the end, Work must equal the <b>totals</b>: a free check on your arithmetic.', 'الـ Available لما يبقى <bdi dir="ltr">(0,0,0)</bdi> <b>مش معناه unsafe</b>: اللي الـ Need بتاعها 0 بتخلص الأول. وفي الآخر الـ Work لازم يساوي <b>الإجمالي</b>.')}</p></${Box}>
        `, { sec: t("The banker's algorithm", 'الـ Banker\'s algorithm') }),
        page(html`
          ${stmt(t('Finals 2024/25 Q2-3 = 2021/22 Q2-4', 'فاينال 2024/25 س2-3 = 2021/22 س2-4'), html`
            <p>${X('Totals A = 3, B = 14, C = 12, D = 12; Available (1, 5, 2, 0). <b>What is the content of Need? Is the system safe?</b> (2022/23 Q1-d asked the same with only A, B, C.)', 'الإجمالي <bdi dir="ltr">A = 3, B = 14, C = 12, D = 12</bdi> والـ Available هو <bdi dir="ltr">(1, 5, 2, 0)</bdi>. <b>إيه محتوى الـ Need؟ والسيستم safe؟</b> (وفاينال 2022/23 س1-د سأل نفس السؤال بـ A وB وC بس.)')}</p>`)}
          <${NeedFill} id="n24" alloc=${BK24.alloc} max=${BK24.max} />
          <${Grow} />
          <${Hand}>${t('then run it on the next page', 'وبعدين شغّلها في الصفحة الجاية')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Run the safety algorithm', 'شغّل الـ safety algorithm')}</${H2}>
          <${RunIt} id="k24" cases=${[{ en: '2024/25', ar: '2024/25', alloc: BK24.alloc, max: BK24.max, avail: BK24.avail }]} />
          <${Grow} />
          <${Hand}>${X('the worked answer: &lt;P0, P2, P3, P4, P1&gt;, final Work (3, 14, 12, 12) = the totals', 'الإجابة المحلولة <bdi dir="ltr">&lt;P0, P2, P3, P4, P1&gt;</bdi>، والـ Work في الآخر <bdi dir="ltr">(3, 14, 12, 12)</bdi> هو الإجمالي')}</${Hand}>
        `),
        page(html`
          ${stmt(t('Final 2025/26 Q1-a vs Final 2023/24 Q1-d', 'فاينال 2025/26 س1-أ قصاد 2023/24 س1-د'), html`
            <p>${X('A = 7, B = 2, C = 6; Available (0, 0, 0). The same table, except the Max of P2: <b>3 0 4</b> as printed in 2025/26, <b>3 0 3</b> in 2023/24. One digit flips the verdict. Try both tabs.', 'الإجمالي <bdi dir="ltr">A = 7, B = 2, C = 6</bdi> والـ Available هو <bdi dir="ltr">(0, 0, 0)</bdi>. نفس الجدول، إلا الـ Max بتاع الـ P2: <b><bdi dir="ltr">3 0 4</bdi></b> زي ما اتطبع في 2025/26، و<b><bdi dir="ltr">3 0 3</bdi></b> في 2023/24. رقم واحد بيقلب النتيجة. جرّب التابين.')}</p>`)}
          <${RunIt} id="k25" cases=${[{ en: '2025/26: Max P2 3 0 4', ar: 'نسخة 2025/26', alloc: BK25.alloc, max: BK25.max, avail: BK25.avail }, { en: '2023/24: 3 0 3', ar: 'نسخة 2023/24', alloc: BK23.alloc, max: BK23.max, avail: BK23.avail }]} />
        `),
        page(html`
          ${stmt(ours, html`
            <p>${X('Totals (8, 5, 6); Available (2, 1, 2). Fill Need first.', 'الإجمالي <bdi dir="ltr">(8, 5, 6)</bdi> والـ Available هو <bdi dir="ltr">(2, 1, 2)</bdi>. املا الـ Need الأول.')}</p>`)}
          <${NeedFill} id="no" alloc=${BKO.alloc} max=${BKO.max} />
          <${Box} kind="brain"><p className="hf-p small">${X('With Work (2, 1, 2) neither P0 nor P1 can start. Who can? And does the first pass already finish everyone?', 'والـ Work هو <bdi dir="ltr">(2, 1, 2)</bdi>، لا الـ P0 ولا الـ P1 يقدروا يبدأوا. مين يقدر؟ وهل اللفة الأولى بتخلّص الكل؟')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Run it: our variant', 'شغّلها: النسخة بتاعتنا')}</${H2}>
          <${RunIt} id="ko" cases=${[{ en: 'ours', ar: 'بتاعتنا', alloc: BKO.alloc, max: BKO.max, avail: BKO.avail }]} />
          <${Grow} />
          <${Hand}>${t('the first pass takes P2 and P4 only; P0, P1, P3 need a second pass', 'اللفة الأولى بتاخد الـ P2 والـ P4 بس؛ والـ P0 والـ P1 والـ P3 محتاجين لفة تانية')}</${Hand}>
        `),

        // ═════════ essays
        page(html`
          <${H2}>${t('The essays, with model answers (1)', 'الأسئلة المقالي بإجابات نموذجية (1)')}</${H2}>
          ${[
            [t('OS definition (25/26, 22/23, mid 21/22) · goals (23/24)', 'تعريف الـ OS (25/26 و22/23 وميدترم 21/22) · أهدافه (23/24)'),
              X('A program acting as an <b>intermediary</b> between user and hardware; a <b>resource allocator</b> and a <b>control program</b>; the kernel runs at all times. Goals: execute user programs and make solving problems easier; make the system <b>convenient</b>; use the hardware <b>efficiently</b>.', 'برنامج <b>وسيط</b> بين الـ user والـ hardware؛ وهو <b>resource allocator</b> و<b>control program</b>؛ والـ kernel شغال طول الوقت. وأهدافه: يشغّل برامج الـ user ويسهّل حل المشاكل، ويخلّي السيستم <b>convenient</b>، ويستخدم الـ hardware <b>بكفاءة</b>.')],
            [t('Short-, medium-, long-term schedulers (25/26, 23/24, 22/23)', 'الـ schedulers التلاتة (25/26 و23/24 و22/23)'),
              X('<b>Short-term</b> (CPU scheduler): picks the next process from the ready queue; runs very often (ms), so it must be fast. <b>Long-term</b> (job scheduler): picks which processes enter the ready queue; runs rarely (seconds, minutes); controls the <b>degree of multiprogramming</b>. <b>Medium-term</b>: swaps processes out of memory and back in to reduce the degree of multiprogramming.', 'الـ <b>Short-term</b> (الـ CPU scheduler): بيختار الجاية من الـ ready queue، وبيشتغل كل ms فلازم يبقى سريع. والـ <b>Long-term</b> (الـ job scheduler): بيختار مين يدخل الـ ready queue، ونادرًا، وبيتحكم في الـ <b>degree of multiprogramming</b>. والـ <b>Medium-term</b>: بيعمل swap برا الـ memory ويرجّع، عشان يقلل الـ degree ده.')],
            [t('Preemptive vs non-preemptive (22/23)', 'الـ Preemptive والـ non-preemptive (22/23)'),
              X('<b>Non-preemptive</b>: the CPU is taken back only when the process goes from running to waiting or terminates. <b>Preemptive</b>: also on running → ready (timer) and waiting → ready; needs a timer and can cause race conditions on shared data. Examples: FCFS / SJF vs SRTF / RR.', 'الـ <b>Non-preemptive</b>: الـ CPU بيرجع بس لما الـ process تروح من running لـ waiting أو تخلص. والـ <b>Preemptive</b>: كمان لما تروح من running لـ ready (بالـ timer) ومن waiting لـ ready؛ ومحتاج timer وممكن يعمل race conditions على الداتا المشتركة. أمثلة: الـ FCFS والـ SJF قصاد الـ SRTF والـ RR.')]
          ].map(([h, a], i) => html`<div key=${i} className="hf-in" style=${{ display: 'grid', gap: '3px' }}><p className="hf-p small"><b>${h}</b></p><${Reveal} id=${'es1-' + i} label=${t('Show the model answer', 'اعرض الإجابة النموذجية')}><p className="hf-p small">${a}</p></${Reveal}></div>`)}
        `, { sec: t('The essays', 'الأسئلة المقالي') }),
        page(html`
          <${H2}>${t('The essays, with model answers (2)', 'الأسئلة المقالي بإجابات نموذجية (2)')}</${H2}>
          ${[
            [t('Program vs process; draw the process states (24/25, 21/22)', 'الـ program والـ process؛ وارسم الـ states (24/25 و21/22)'),
              X('A <b>program</b> is passive: an executable file on disk. A <b>process</b> is active: a program in execution, with a PC, stack, heap and data. States: <b>new → ready → running → waiting / terminated</b>; running → ready on an interrupt; waiting → ready on I/O or event completion. Draw the diagram with every arrow labelled.', 'الـ <b>program</b> حاجة passive: ملف executable على الـ disk. والـ <b>process</b> حاجة active: برنامج بيتنفذ، ومعاه PC وstack وheap وdata. والـ states هي <span class="ltr">new → ready → running → waiting / terminated</span>ومن running لـ ready لو جه interrupt، ومن waiting لـ ready لما الـ I/O أو الـ event يخلص. واكتب على كل سهم.')],
            [t('Internal vs external fragmentation (24/25)', 'الـ Internal والـ external fragmentation (24/25)'),
              X('<b>External</b>: total free space is enough but not contiguous; variable partitions, segmentation; cured by compaction (dynamic relocation only). <b>Internal</b>: the block given is larger than asked; the waste is inside it; paging. Example: 72,766 B with 2,048 B pages = 35 pages + 1,086 B, so 962 B are wasted.', 'الـ <b>External</b>: المساحة الفاضية تكفي بس مش contiguous (الـ segmentation)، وعلاجه الـ compaction. والـ <b>Internal</b>: الـ block أكبر من المطلوب والضايع جوّاه (الـ paging)، زي الـ 962 B في م4.')],
            [t('Paging vs segmentation (22/23, 21/22)', 'الـ Paging والـ segmentation (22/23 و21/22)'),
              X('Paging: fixed-size pages and frames, invisible to the user, address (p, d), internal fragmentation only. Segmentation: variable-length logical segments matching the user\'s view, address (s, d) with base + limit, external fragmentation.', 'الـ Paging: pages وframes حجمها ثابت، والـ user مش شايفها، والعنوان <bdi dir="ltr">(p, d)</bdi>، وفيها internal fragmentation بس. والـ Segmentation: segments منطقية أطوالها متغيرة زي ما الـ user شايف البرنامج، والعنوان <bdi dir="ltr">(s, d)</bdi> بـ base وlimit، وفيها external fragmentation.')]
          ].map(([h, a], i) => html`<div key=${i} className="hf-in" style=${{ display: 'grid', gap: '3px' }}><p className="hf-p small"><b>${h}</b></p><${Reveal} id=${'es2-' + i} label=${t('Show the model answer', 'اعرض الإجابة النموذجية')}><p className="hf-p small">${a}</p></${Reveal}></div>`)}
        `),
        page(html`
          <${H2}>${t('The essays, with model answers (3)', 'الأسئلة المقالي بإجابات نموذجية (3)')}</${H2}>
          ${[
            [t('Deadlock conditions, and how to prevent each (24/25, 22/23, 21/22)', 'شروط الـ deadlock وإزاي تمنع كل واحد (24/25 و22/23 و21/22)'),
              X('Mutual exclusion, hold and wait, no preemption, circular wait; all four at once. Prevention: the Breaker on the L6 pages, one line each.', 'الـ mutual exclusion والـ hold and wait والـ no preemption والـ circular wait؛ والأربعة مع بعض. والمنع: لعبة "اكسر واحد" في صفحات م6، سطر لكل شرط.')],
            [t('Trap vs interrupt; three protection services (21/22)', 'الـ trap والـ interrupt؛ وتلات خدمات protection (21/22)'),
              X('An <b>interrupt</b> comes from hardware, asynchronously; a <b>trap</b> is software-generated, synchronous: an error or a system call. Protection between processes: <b>dual mode</b> with privileged instructions, <b>base and limit registers</b> for memory, and the <b>timer</b>.', 'الـ <b>interrupt</b> جاي من الـ hardware وasynchronous؛ والـ <b>trap</b> جاي من الـ software وsynchronous: يا error يا system call. والـ protection بين الـ processes: الـ <b>dual mode</b> بالـ privileged instructions، والـ <b>base والـ limit registers</b> للـ memory، والـ <b>timer</b>.')],
            [t('Shared memory vs message passing (21/22); interrupt overheads (22/23)', 'الـ shared memory والـ message passing (21/22)؛ وتكلفة الـ interrupt (22/23)'),
              X('<b>Shared memory</b>: a region both processes read and write; fast, but they must synchronize. <b>Message passing</b>: send / receive over a link, no shared variables; easier, slower. Interrupt overheads: saving the running process\'s state in its PCB, running the ISR, restoring the state, data copying.', 'الـ <b>Shared memory</b>: منطقة الاتنين بيقروا ويكتبوا فيها؛ سريعة، بس لازم يعملوا synchronization. والـ <b>Message passing</b>: send وreceive على link، من غير shared variables؛ أسهل وأبطأ. وتكلفة الـ interrupt: حفظ حالة الـ process في الـ PCB، وتشغيل الـ ISR، ورجوع الحالة، ونسخ الداتا.')]
          ].map(([h, a], i) => html`<div key=${i} className="hf-in" style=${{ display: 'grid', gap: '3px' }}><p className="hf-p small"><b>${h}</b></p><${Reveal} id=${'es3-' + i} label=${t('Show the model answer', 'اعرض الإجابة النموذجية')}><p className="hf-p small">${a}</p></${Reveal}></div>`)}
        `),

        // ═════════ cross-lecture showdowns
        page(html`
          <${Fireside} sub=${t('Tonight: FCFS (L3) and FIFO page replacement (L5), the same rule in two jobs.', 'الليلة: الـ FCFS (م3) والـ FIFO بتاع الـ pages (م5)، نفس القاعدة في شغلانتين.')} />
          <${Chat} names=${['FCFS', 'FIFO']} lines=${A ? [
            [0, 'إحنا قرايب: اللي ييجي الأول. أنا بدّي الـ CPU للي وصل الأول.'],
            [1, 'وأنا بطلّع الـ page اللي دخلت الأول. نفس الطابور، بس من الناحية التانية.'],
            [0, 'عيبي الـ <b>convoy effect</b>: burst واحد طويل في الأول والكل يستنى.'],
            [1, 'وعيبي الـ <b>Belady</b>: اديني frames أكتر وممكن أعمل faults أكتر، 9 بـ 3 frames و10 بـ 4.'],
            [0, 'واللي بيغلبني الـ SJF، بس هو محتاج يعرف طول الـ burst الجاي.'],
            [1, 'واللي بيغلبني الـ OPT، وهو محتاج يعرف المستقبل كله. إحنا الاتنين بسطا وسهل نتعمل بطابور واحد.']
          ] : [
            [0, "We're family: first come, first served. I hand the CPU to whoever arrived first."],
            [1, 'And I throw out the page that came in first. Same queue, other end.'],
            [0, 'My weakness is the <b>convoy effect</b>: one long burst up front and everyone waits.'],
            [1, "Mine is <b>Belady</b>: give me more frames and I can fault more. 9 with 3 frames, 10 with 4."],
            [0, 'SJF beats me, but it has to know the length of the next burst.'],
            [1, 'OPT beats me, and it has to know the whole future. We are both simple: one queue each.']
          ]} />
          <${Grow} />
          <${Hand}>${t('exam use: "FIFO" in L5 never means CPU scheduling, and "FCFS" never means pages', 'في الامتحان: الـ "FIFO" في م5 عمره ما يبقى CPU scheduling، والـ "FCFS" عمره ما يبقى pages')}</${Hand}>
        `, { sec: t('Showdowns', 'المواجهات') }),
        page(html`
          <${Interview} title=${t('Starvation, mistaken for Deadlock', 'الـ Starvation اللي الناس فاكراه Deadlock')} sub=${t('This week: the one who waits forever while everybody else runs.', 'ضيف الأسبوع: اللي بيستنى للأبد والكل شغال.')} lines=${A ? [
            ['المذيع', 'الناس بتقول عليك deadlock. إنت هو؟'],
            ['الـ Starvation', 'لأ خالص. في الـ deadlock كل process مستنية حاجة واحدة تانية منهم بس اللي تعملها، <b>ومحدش بيتحرك</b>. إنما معايا السيستم ماشي عادي، وprocess واحدة low-priority بس هي اللي دورها مبيجيش.'],
            ['المذيع', 'بتظهر فين؟'],
            ['الـ Starvation', 'في الـ priority والـ SJF (م3). وفي منع الـ hold and wait، وفي الـ recovery بالـ preemption لو نفس الـ victim اتختار كل مرة (م6).'],
            ['المذيع', 'وعلاجك؟'],
            ['الـ Starvation', 'الـ <b>aging</b>: زوّد الـ priority كل ما الـ process تستنى أكتر. وللـ victim: احسب عدد الـ rollbacks في الـ cost.'],
            ['المذيع', 'والـ aging ينفع للـ deadlock؟'],
            ['الـ Starvation', 'لأ. الـ deadlock محتاج تكسر شرط من الأربعة، أو الـ banker، أو detection وrecovery.']
          ] : [
            ['Interviewer', 'People call you deadlock. Are you?'],
            ['Starvation', 'Not at all. In a deadlock each process waits for something only another of them can do, and <b>nobody moves</b>. With me the system runs fine; one low-priority process just never gets its turn.'],
            ['Interviewer', 'Where do you show up?'],
            ['Starvation', 'Priority and SJF scheduling (L3). Also in hold-and-wait prevention, and in recovery by preemption if the same victim is always picked (L6).'],
            ['Interviewer', 'And your cure?'],
            ['Starvation', '<b>Aging</b>: raise the priority the longer a process waits. For victims: count the rollbacks in the cost.'],
            ['Interviewer', 'Does aging cure deadlock?'],
            ['Starvation', 'No. Deadlock needs one of the four conditions broken, the banker, or detection and recovery.']
          ]} />
        `),
        page(html`
          <${H2}>${t('Who am I? The whole course', 'أنا مين؟ المادة كلها')}</${H2}>
          <${P} small=${true}>${t('Tap a name, then its confession.', 'دوس على الاسم، وبعدين على اعترافه.')}</${P}>
          <${Match} id="who" left=${['DMA', 'Need', 'MMU', 'trap', 'aging', 'valid–invalid bit']}
            right=${A ? ['بزوّد الـ priority بتاع اللي مستني بقاله كتير', 'أنا اللي بيقلب الـ reference لـ page fault', 'بنقل block كامل وأعمل interrupt مرة واحدة', 'أنا الـ Max ناقص الـ Allocation', 'interrupt من الـ software: يا error يا system call', 'بجمع الـ relocation register على كل عنوان']
              : ["I raise a long waiter's priority", 'I turn a reference into a page fault', 'I move a whole block and interrupt once', 'I am Max − Allocation', 'a software interrupt: an error or a system call', 'I add the relocation register to every address']}
            answer=${[2, 3, 5, 4, 0, 1]} />
        `),
        page(html`
          <${H2}>${t('Which part of the course?', 'من أنهي حتة في المادة؟')}</${H2}>
          <${P} small=${true}>${t('CPU: L2–3 · Mem: L4–5 · DL: L6 · I/O: L7–8', 'الـ CPU م2 وم3، والـ Mem م4 وم5، والـ DL م6، والـ I/O م7 وم8')}</${P}>
          <${Sort} id="all" bins=${[['CPU', t('processes and scheduling', 'الـ processes والـ scheduling')], ['Mem', t('memory', 'الـ memory')], ['DL', t('deadlocks', 'الـ deadlocks')], ['I/O', t('files and I/O', 'الـ files والـ I/O')]]} items=${A ? [
            ['الـ convoy effect', 0], ['الـ compaction', 1], ['الـ safe sequence', 2], ['الـ FAT', 3], ['الـ aging', 0],
            ['الـ lazy swapper', 1], ['الـ wait-for graph', 2], ['الـ cycle stealing', 3], ['الـ Belady\'s anomaly', 1], ['الـ index block', 3]
          ] : [
            ['convoy effect', 0], ['compaction', 1], ['safe sequence', 2], ['FAT', 3], ['aging', 0],
            ['lazy swapper', 1], ['wait-for graph', 2], ['cycle stealing', 3], ["Belady's anomaly", 1], ['index block', 3]
          ]} />
        `),

        // ═════════ exam corner: the doctors' questions
        page(html`
          <${H2}>${t("Doctors' questions · L1", 'أسئلة الدكاترة · م1')}</${H2}>
          ${mq('e1', /more speed in accessing data and is volatile/)}
          ${mq('e2', /objective of multiprogramming/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e3', /one program running at all times/)}
          ${mq('e4', /whose parent is terminated/)}
        `),
        page(html`
          <${H2}>${t("Doctors' questions · L2", 'أسئلة الدكاترة · م2')}</${H2}>
          ${mq('e5', /has terminated, but whose parent has not yet called/)}
          ${mq('e6', /What is a medium-term scheduler/)}
        `),
        page(html`
          ${mq('e7', /saves the state of the currently running process/, /Exam 2026/)}
          ${mq('e8', /exec\(\) system call creates/)}
        `),
        page(html`
          <${H2}>${t("Doctors' questions · L3", 'أسئلة الدكاترة · م3')}</${H2}>
          ${mq('e9', /gives minimum average waiting time/)}
          ${mq('e10', /What is .Aging/)}
        `),
        page(html`
          ${mq('e11', /Busy waiting is good/)}
          ${mq('e12', /amount of time to execute a particular process/)}
        `),
        page(html`
          <${H2}>${t("Doctors' questions · L4, L5", 'أسئلة الدكاترة · م4 وم5')}</${H2}>
          ${mq('e13', /Under first-fit, where does/)}
          ${mq('e14', /page faults for 7,0,1,2,0,3,0,4,2,3,0,3,2,1 using FIFO/)}
        `),
        page(html`
          <div className="hf-osF-px"><${Box} kind="pencil" title=${t('Practice questions', 'أسئلة تدريب')}>${pq('p1', /NOT one of the four necessary conditions/)}${pq('p2', /If a system is in an unsafe state/)}</${Box}></div>
        `),
        page(html`
          <div className="hf-osF-px"><${Box} kind="pencil" title=${t('Practice questions', 'أسئلة تدريب')}>${pq('p3', /index blocks/)}${pq('p4', /what happens when C = 0/)}</${Box}></div>
        `),

        // ═════════ exam day
        page(html`
          <${H2}>${t('Exam day: two hours', 'يوم الامتحان: ساعتين')}</${H2}>
          <${P} small=${true}>${X('<b>Our advice</b>, built on the 2025/26 layout (60 marks, 2 hours): about <b>2 minutes a mark</b>.', '<b>نصيحة من عندنا</b> على شكل امتحان 2025/26 (60 درجة في ساعتين): تقريبًا <b>دقيقتين لكل درجة</b>.')}</${P}>
          <${TimePlan} segs=${[[5, '#64748B', 'read', 'اقرا'], [20, '#059669', 'Q5 MCQ', 'الـ MCQ'], [55, '#2563EB', '4 problems', '4 مسائل'], [30, '#D97706', '4 theory', '4 نظري'], [10, '#DC2626', 'check', 'راجع']]} />
          <p className="hf-p small hf-in" style=${{ color: 'var(--graphite)' }}>${t('0–5 read and choose · 110–120 check your sums', 'من 0 لـ 5 اقرا واختار، ومن 110 لـ 120 راجع حساباتك')}</p>
          <${H2}>${t('Where marks are lost', 'الدرجات بتضيع فين')}</${H2}>
          <ul className="hf-osF-chk hf-in">${(A ? [
            'الـ Gantt chart يبدأ من 0 وتحت كل حد رقمه؛ وفيه gap لو الـ CPU idle.',
            'احسب <bdi dir="ltr">TAT = CT − AT</bdi> و<bdi dir="ltr">WT = TAT − BT</bdi>، واكتب القسمة.',
            'الـ SRTF بيتقرر عند كل arrival؛ والـ priority أصغر رقم أعلى.',
            'الـ fits: الـ hole بيصغر، والـ first-fit بيبدأ من الأول، واكتب "تستنى".',
            'الـ page faults: ملء الـ frames الفاضية faults، وعدد الـ frames من السؤال.',
            'الـ banker: جدول الـ Need، والـ Work بعد كل process، والـ sequence، والنتيجة.',
            'الـ DMA: اقرا هو عايز الخطوات ولا المميزات.'
          ] : [
            'Gantt from 0, a number under every boundary; a gap if the CPU is idle.',
            'TAT = CT − AT, WT = TAT − BT; show the division for the average.',
            'SRTF decides at every arrival; priority: smallest number is highest.',
            'Fits: holes shrink; first-fit restarts from the beginning; write "must wait".',
            'Page faults: initial fills are faults; take the frame count from the question.',
            "Banker's: the Need table, Work after each process, the sequence, the verdict.",
            'DMA: read whether it asks for the steps or the advantages.'
          ]).map((x, i) => html`<li key=${i}><span>${T(x)}</span></li>`)}</ul>
        `, { sec: t('Exam day', 'يوم الامتحان') }),

        // ═════════ bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ OS هو <b>وسيط</b> و<b>resource allocator</b> و<b>control program</b>؛ والـ kernel بس هو اللي شغال طول الوقت.',
            'الـ trap من الـ software وsynchronous؛ والـ interrupt من الـ hardware. والـ DMA بيعمل interrupt واحد لكل block.',
            'الـ 5 states والـ PCB؛ والـ zombie الـ parent بتاعها ماعملش <code>wait()</code>، والـ orphan الـ parent بتاعها خلص.',
            'الـ long-term بيدخّل الـ ready queue، والـ short-term بيختار للـ CPU، والـ medium-term بيعمل swap.',
            'الـ SJF هو الـ optimal للـ waiting؛ والـ RR بـ q كبير يبقى FCFS؛ والـ aging بيعالج الـ starvation.',
            'القانونين <bdi dir="ltr">WT = TAT − BT</bdi> و<bdi dir="ltr">TAT = CT − AT</bdi>.'
          ] : [
            'The OS is an <b>intermediary</b>, a <b>resource allocator</b> and a <b>control program</b>; only the kernel runs at all times.',
            'Trap = software, synchronous; interrupt = hardware. DMA: one interrupt per block.',
            'Five states, the PCB, zombie (parent has not called wait) vs orphan (parent ended).',
            'Long-term admits to the ready queue, short-term picks for the CPU, medium-term swaps.',
            'SJF is optimal for waiting time; RR with a huge q is FCFS; aging cures starvation.',
            'WT = TAT − BT, TAT = CT − AT.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ first-fit أول واحد يكفي، والـ best أصغر واحد، والـ worst أكبر واحد؛ والـ best حط الكل في كل الامتحانات.',
            'الـ paging فيه internal fragmentation، والـ segmentation فيه external؛ وفي الـ (s, d) لو' + L('d ≥ limit → trap'),
            'الـ FIFO بيطلّع الأقدم دخولًا، والـ OPT الأبعد استخدامًا، والـ LRU الأقدم استخدامًا؛ والـ Belady في الـ FIFO بس.',
            'الـ deadlock محتاج الأربع شروط مع بعض؛ والـ Need هي <bdi dir="ltr">Max − Allocation</bdi>؛ والـ unsafe معناه احتمال بس.',
            'الـ allocation: الـ contiguous والـ linked والـ indexed، وقارن بينهم على نفس النقط.',
            'الـ DMA ليه 6 خطوات، والـ C بينزل لحد 0، وبعدين interrupt واحد.'
          ] : [
            'First-fit: first big enough; best: smallest; worst: largest. Best-fit placed everyone in every paper.',
            'Paging → internal fragmentation, segmentation → external; (s, d) with d ≥ limit → trap.',
            'FIFO evicts the oldest load, OPT the farthest next use, LRU the oldest last use; Belady is FIFO only.',
            'Deadlock needs all four conditions; Need = Max − Allocation; unsafe means only possible.',
            'Allocation: contiguous, linked, indexed, compared on the same rows.',
            'DMA in six steps: C counts down to 0, then one interrupt.'
          ]} />
        `),

        // ═════════ end page
        page(html`
          <div className="hf-end hf-in">
            <${H1}>${t('Now go and do it for real', 'يلا اعملها بجد')}</${H1}>
            <${P}>${t('The book is done. Four more ways to practise before the final:', 'الكتاب خلص. وقدامك أربع طرق تتمرن بيها قبل الفاينال:')}</${P}>
            <div style=${{ display: 'grid', gap: '8px' }}>
              <${Go} solid=${true} to=${{ mode: 'read', lec: 'fin', anchor: null }}>${t('Read the final summary', 'اقرا ملخص الفاينال')}</${Go}>
              <${Go} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], only: 'prof', t: Date.now() } }}>${t("All the doctors' questions", 'كل أسئلة الدكاترة')}</${Go}>
              <${Go} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], mock: 40, t: Date.now() } }}>${t('A timed 40-question mock final', 'فاينال تجريبي 40 سؤال بالوقت')}</${Go}>
              <${Go} to=${{ mode: 'papers' }}>${t('The past papers', 'الامتحانات اللي فاتت')}</${Go}>
            </div>
          </div>
          <${Grow} />
          <${Talk} who="os">${t('Pencil, a Gantt chart, a frame table, a Need matrix. You have seen them all. Good luck.', 'قلم، وGantt chart، وجدول frames، وNeed matrix. إنت شفتهم كلهم. بالتوفيق.')}</${Talk}>
        `, { sec: t('The end', 'النهاية') })
      ];
    }
  };
})();

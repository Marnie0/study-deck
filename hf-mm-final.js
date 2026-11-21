// Head First final revision for Multimedia (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course in one book: a self-rating, an animated course map, the anatomy of the final and a hot list counted from the
// 11 past papers on the site, every lecture in 3 to 5 pages, the written problems the finals always ask (Nyquist from x(t), audio
// file size, video file size and compression ratio, image compression ratio, RGB to CMYK, RGB to YIQ/YUV, MSE/MAE, the "why"
// questions) as interactive worked problems with the real papers' numbers plus our own variants, cross-lecture showdowns, the
// doctors' questions, an exam-day plan and the bullet points.
// Every number below was worked by hand and checked with a node script against the site's answers: 0.004 s, 0.0004 s, 0.001 s,
// 1/1800 s; 4,608,000,000 bits / 576,000,000 B / 562,500 KB; 5,068,800 bits / 633,600 B / 618.75 KB; 2,396,160,000 bits /
// 299,520,000 B / 292,500 KB; 691,200,000 bits / 86,400,000 B / 84,375 KB; 9,621,504,000,000 bits, 952,560,000·Q, 25,165,824 bits,
// ≈ 0.000261 %; 1,105,920,000,000·FPS, 288,000,000·Q, 3,175,200,000·Q; 55,296,000,000·FPS, 230,400,000·Q, 8,192,000 bits,
// ≈ 0.000591 %; 22,118,400,000 + 15,360,000 = 22,133,760,000 bits, 83,886,080 bits, ≈ 0.379 %; CR 4.096 %, 40.96 %, 26.67 %;
// the CMYK of all 20 pixels of the 2025/26 image; Y/I/Q/U/V of (100,200,250), (30,130,230), (60,120,180); MSE 17,943.75,
// 14,768.5625, 10 and MAE 2.2222; SNR −2.83 dB; colour MSE 7498.67 / MAE 59.73 / MAE 88 / CMY MSE 6250 (0.0961).
// Our own analogies, tricks and the time plan are marked as ours; ‡ marks what the notes flag.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState, useEffect, useMemo } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const TF = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mmF')) {
    const s = document.createElement('style'); s.id = 'hf-css-mmF';
    s.textContent = `
.hfb .hf-mmF-rate{ display:grid; gap:3px; }
.hfb .hf-mmF-rate .row{ display:grid; grid-template-columns:24px minmax(0,1fr) auto; gap:6px; align-items:center; }
.hfb .hf-mmF-rate .n{ display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 13px/1 var(--body); }
.hfb .hf-mmF-rate .t{ font:600 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-mmF-rate .ch{ display:flex; gap:3px; }
.hfb .hf-mmF-rate .ch button{ font:700 13px/1 var(--body); min-width:46px; height:28px; padding:0 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mmF-rate .ch button.c0[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-mmF-rate .ch button.c1[aria-pressed="true"]{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-mmF-rate .ch button.c2[aria-pressed="true"]{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
.hfb .hf-mmF-sum{ font:600 13px/1.3 var(--body); color:var(--graphite); margin:2px 0 0; }
/* the course map: one line, eight stops */
.hfb .hf-mmF-map{ position:relative; display:grid; gap:2px; padding-left:0; }
.hfb .hf-mmF-map .rail{ position:absolute; left:13px; top:14px; bottom:14px; width:3px; background:var(--hf-grey2); border-radius:2px; overflow:hidden; }
.hfb .hf-mmF-map .rail i{ position:absolute; left:0; width:3px; height:46px; background:var(--hf-k); border-radius:2px; animation:hf-mmF-run 6s linear infinite; }
@keyframes hf-mmF-run{ from{ top:-46px; } to{ top:100%; } }
.hfb .hf-mmF-stop{ position:relative; display:grid; grid-template-columns:30px minmax(0,1fr); gap:6px; align-items:start; text-align:left; border:0; background:none; padding:3px 4px 3px 0; border-radius:8px; cursor:pointer; color:var(--ink); }
.hfb .hf-mmF-stop .dot{ z-index:1; display:grid; place-items:center; width:28px; height:28px; border-radius:50%; border:2.5px solid var(--hf-line); background:var(--paper); font:800 13px/1 var(--body); }
.hfb .hf-mmF-stop.a .dot{ border-color:var(--hf-k); } .hfb .hf-mmF-stop.i .dot{ border-color:var(--hf-red); }
.hfb .hf-mmF-stop b{ display:block; font:800 14px/1.15 var(--body); }
.hfb .hf-mmF-stop span.d{ display:none; font:500 13px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-mmF-stop.on{ background:var(--hf-grey); } .hfb .hf-mmF-stop.on span.d{ display:block; } .hfb .hf-mmF-stop.on .dot{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-mmF-stop.lk .dot{ box-shadow:0 0 0 3px color-mix(in srgb, var(--hf-hand) 45%, transparent); }
.hfb .hf-mmF-links{ border-left:3px solid var(--hf-hand); padding:4px 8px; display:grid; gap:2px; min-height:40px; }
.hfb .hf-mmF-links p{ margin:0; font:500 13px/1.3 var(--body); color:var(--ink); }
.hfb .hf-mmF-links p b{ color:var(--hf-hand); }
/* the four threads */
.hfb .hf-mmF-thr{ display:grid; gap:7px; }
.hfb .hf-mmF-thr > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:5px 7px; background:var(--paper); }
.hfb .hf-mmF-thr h5{ margin:0 0 3px; font:800 14px/1.15 var(--body); color:var(--ink); }
.hfb .hf-mmF-thr .chain{ display:flex; flex-wrap:wrap; gap:3px 2px; align-items:center; }
.hfb .hf-mmF-thr .chain span{ font:600 13px/1.2 var(--mono); border-radius:5px; padding:2px 5px; background:var(--hf-grey); color:var(--ink); }
.hfb .hf-mmF-thr .chain span b{ font-family:var(--body); color:var(--hf-k); margin-right:3px; }
.hfb .hf-mmF-thr .chain i{ font-style:normal; color:var(--graphite); font:700 13px/1 var(--body); }
/* anatomy table and the hot list */
.hfb .hf-mmF-tab{ width:100%; border-collapse:collapse; font:500 13px/1.25 var(--body); color:var(--ink); table-layout:fixed; }
.hfb .hf-mmF-tab th, .hfb .hf-mmF-tab td{ border:1px solid var(--hf-line); padding:3px 4px; text-align:left; vertical-align:top; }
.hfb .hf-mmF-tab th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-mmF-tab td.n{ font-family:var(--mono); white-space:nowrap; font-weight:700; }
.hfb .hf-mmF-tab tr.hi td{ background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); }
.hfb .hf-mmF-bars{ display:grid; gap:4px; }
.hfb .hf-mmF-bar{ display:grid; grid-template-columns:minmax(0,1fr) 62px 80px; gap:6px; align-items:center; }
.hfb .hf-mmF-bar .l{ font:600 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-mmF-bar .l small{ font:700 13px/1 var(--mono); color:var(--hf-k); margin-left:3px; }
.hfb .hf-mmF-bar .b{ height:12px; background:var(--hf-grey); border-radius:3px; overflow:hidden; display:flex; }
.hfb .hf-mmF-bar .b i{ display:block; height:100%; background:var(--hf-k); animation:hf-mmF-grow .8s cubic-bezier(.2,.7,.2,1) both; transform-origin:0 50%; }
.hfb .hf-mmF-bar .b i.m{ background:color-mix(in srgb, var(--hf-k) 35%, var(--paper)); }
@keyframes hf-mmF-grow{ from{ transform:scaleX(0); } }
.hfb .hf-mmF-bar .c{ font:700 13px/1 var(--mono); color:var(--ink); white-space:nowrap; }
/* method and formula cards */
.hfb .hf-mmF-meth{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); display:grid; gap:3px; }
.hfb .hf-mmF-meth h5{ margin:0 0 2px; font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); }
.hfb .hf-mmF-meth .f{ font:700 13.5px/1.35 var(--mono); color:var(--hf-k); direction:ltr; text-align:left; overflow-wrap:anywhere; }
.hfb .hf-mmF-meth .s{ font:500 13.5px/1.3 var(--body); color:var(--ink); margin:0; }
.hfb .hf-mmF-meth .s b{ font-weight:700; }
.hfb .hf-mmF-ptag{ display:inline-block; font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--paper); background:var(--hf-k); border-radius:4px; padding:4px 6px; }
.hfb .hf-mmF-ptag.ours{ background:var(--hf-hand); }
/* the stepper: choose each step of a worked problem */
.hfb .hf-mmF-st{ border:2px solid var(--hf-line); border-radius:8px; padding:7px; display:grid; grid-template-columns:minmax(0,1fr); gap:6px; }
.hfb .hf-mmF-tabs{ display:flex; gap:4px; }
.hfb .hf-mmF-tabs button{ flex:1 1 0; min-width:0; padding:2px 2px; font:800 13px/1.1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mmF-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mmF-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-mmF-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-mmF-ask{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); }
.hfb .hf-mmF-work{ font:600 13px/1.45 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 7px; color:var(--ink); min-height:24px; }
.hfb .hf-mmF-work > div{ overflow-wrap:anywhere; animation:hf-up .35s both; }
.hfb .hf-mmF-work .cur{ color:var(--hf-hand); }
.hfb .hf-mmF-q{ font:700 13.5px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-mmF-opts{ display:flex; gap:4px; flex-wrap:wrap; }
.hfb .hf-mmF-opts button{ font:700 13px/1.2 var(--mono); min-height:30px; padding:3px 7px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; text-align:left; }
.hfb .hf-mmF-bad{ font-size:13px; line-height:1.3; margin:0; color:var(--hf-red); }
.hfb .hf-mmF-ok{ font-size:13px; line-height:1.3; margin:0; color:var(--ink); padding:4px 7px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-mmF-btns{ display:flex; gap:5px; flex-wrap:wrap; align-items:center; }
.hfb .hf-mmF-btns .hf-btn{ padding:6px 9px; min-height:32px; }
/* fill-in worksheets */
.hfb .hf-mmF-fill{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:5px 8px; }
.hfb .hf-mmF-fill label{ display:grid; gap:2px; font:700 13px/1.15 var(--body); color:var(--graphite); }
.hfb .hf-mmF-fill label.w{ grid-column:1 / -1; grid-template-columns:110px minmax(0,1fr); align-items:center; }
.hfb .hf-mmF-in{ width:100%; box-sizing:border-box; min-width:0; font:600 13.5px/1 var(--mono); padding:6px 5px; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); direction:ltr; text-align:left; }
.hfb .hf-mmF-in.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-mmF-in.no{ border-color:var(--hf-red); }
/* the pixel grid (RGB to CMYK) */
.hfb .hf-mmF-px{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:8px; align-items:start; }
.hfb .hf-mmF-pg{ display:grid; gap:3px; }
.hfb .hf-mmF-pg button{ position:relative; width:34px; height:25px; border-radius:5px; border:1.5px solid var(--hf-line); cursor:pointer; padding:0; font:800 13px/1 var(--body); color:#fff; text-shadow:0 0 2px #000, 0 0 2px #000; }
.hfb .hf-mmF-pg button.sel{ box-shadow:0 0 0 2.5px var(--paper), 0 0 0 4.5px var(--hf-hand); }
.hfb .hf-mmF-pin{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:4px; direction:ltr; gap:4px 5px; }
.hfb .hf-mmF-pin label{ display:grid; grid-template-columns:minmax(0,1fr); gap:1px; justify-items:center; font:800 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-mmF-rgb{ font:700 13px/1.3 var(--mono); color:var(--ink); margin:0 0 3px; }
.hfb .hf-mmF-mat{ border-collapse:collapse; font:600 13px/1 var(--mono); color:var(--ink); margin:0 auto; }
.hfb .hf-mmF-mat td{ border:1px solid var(--hf-line); padding:3px 4px; text-align:right; height:20px; }
.hfb .hf-mmF-mat td.z{ color:var(--graphite); }
.hfb .hf-mmF-mat td.k{ color:var(--hf-k); font-weight:800; }
.hfb .hf-mmF-mats{ display:flex; gap:8px; justify-content:center; align-items:flex-start; flex-wrap:wrap; }
.hfb .hf-mmF-mats > div{ display:grid; gap:2px; justify-items:center; }
.hfb .hf-mmF-mats > div > span{ font:800 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-mmF-dg{ display:grid; gap:3px; justify-content:center; }
.hfb .hf-mmF-dg input{ width:54px; text-align:center; padding:5px 2px; }
.hfb .hf-mmF-chip{ display:flex; gap:4px; flex-wrap:wrap; }
.hfb .hf-mmF-chip button{ font:800 13px/1 var(--mono); min-height:28px; padding:0 8px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mmF-chip button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
/* point picker for the written "why" questions */
.hfb .hf-mmF-pts{ display:grid; gap:4px; }
.hfb .hf-mmF-pts button{ display:grid; grid-template-columns:20px minmax(0,1fr); gap:6px; align-items:start; text-align:left; font:500 13px/1.28 var(--body); padding:5px 7px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mmF-pts button i{ font-style:normal; display:grid; place-items:center; width:18px; height:18px; border-radius:4px; border:1.5px solid var(--hf-line); font:800 13px/1 var(--body); }
.hfb .hf-mmF-pts button[aria-pressed="true"]{ border-color:var(--hf-hand); }
.hfb .hf-mmF-pts button[aria-pressed="true"] i{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-mmF-pts button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-mmF-pts button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
/* who am I? */
.hfb .hf-mmF-who{ display:grid; gap:5px; }
.hfb .hf-mmF-who .r{ display:grid; gap:3px; padding-bottom:4px; border-bottom:1px dotted var(--faint); }
.hfb .hf-mmF-who .c{ font:500 13px/1.25 var(--body); color:var(--ink); margin:0; }
.hfb .hf-mmF-who .c b{ font:800 13px/1 var(--mono); color:var(--hf-k); margin-right:4px; }
.hfb .hf-mmF-who .o{ display:flex; gap:4px; flex-wrap:wrap; }
.hfb .hf-mmF-who .o button{ font:700 13px/1 var(--body); min-height:26px; padding:0 7px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mmF-who .o button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mmF-who .o button.ok{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
.hfb .hf-mmF-who .o button.no{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
/* exam-day time plan */
.hfb .hf-mmF-plan{ display:grid; gap:4px; }
.hfb .hf-mmF-plan .r{ display:grid; grid-template-columns:52px minmax(0,1fr); gap:8px; align-items:center; }
.hfb .hf-mmF-plan .m{ font:800 14px/1 var(--mono); color:var(--hf-k); text-align:right; }
.hfb .hf-mmF-plan .x{ border-radius:6px; padding:4px 7px; background:var(--hf-grey); font:500 13px/1.25 var(--body); color:var(--ink); }
.hfb .hf-mmF-plan .x b{ font-weight:700; }
.hfb .hf-mmF-tick{ display:grid; gap:3px; }
.hfb .hf-mmF-tick button{ display:grid; grid-template-columns:20px minmax(0,1fr); gap:6px; align-items:start; text-align:left; border:0; background:none; padding:2px 0; font:500 13.5px/1.3 var(--body); color:var(--ink); cursor:pointer; }
.hfb .hf-mmF-tick button i{ font-style:normal; display:grid; place-items:center; width:18px; height:18px; border-radius:4px; border:1.5px solid var(--hf-line); font:800 13px/1 var(--body); color:var(--paper); }
.hfb .hf-mmF-tick button[aria-pressed="true"] i{ background:var(--ok); border-color:var(--ok); }
.hfb .hf-mmF-tick button[aria-pressed="true"] span{ color:var(--graphite); }
.hfb .hf-mmF-cols{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-mmF-two{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-mmF-two > div{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 7px; font:500 13px/1.3 var(--body); color:var(--ink); }
.hfb .hf-mmF-two > div b{ display:block; font:800 13.5px/1.15 var(--body); margin-bottom:2px; color:var(--hf-k); }
/* Arabic */
.hf-ar .hf-mmF-rate .t, .hf-ar .hf-mmF-rate .ch button, .hf-ar .hf-mmF-sum, .hf-ar .hf-mmF-stop b, .hf-ar .hf-mmF-stop span.d, .hf-ar .hf-mmF-links p, .hf-ar .hf-mmF-thr h5,
.hf-ar .hf-mmF-tab, .hf-ar .hf-mmF-bar .l, .hf-ar .hf-mmF-meth h5, .hf-ar .hf-mmF-meth .s, .hf-ar .hf-mmF-ptag, .hf-ar .hf-mmF-tabs button, .hf-ar .hf-mmF-ask, .hf-ar .hf-mmF-q,
.hf-ar .hf-mmF-bad, .hf-ar .hf-mmF-ok, .hf-ar .hf-mmF-fill label, .hf-ar .hf-mmF-pts button, .hf-ar .hf-mmF-who .c, .hf-ar .hf-mmF-who .o button, .hf-ar .hf-mmF-plan .x, .hf-ar .hf-mmF-tick button,
.hf-ar .hf-mmF-two > div{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-mmF-ask, .hf-ar .hf-mmF-bad, .hf-ar .hf-mmF-ok, .hf-ar .hf-mmF-meth .s, .hf-ar .hf-mmF-links p, .hf-ar .hf-mmF-pts button, .hf-ar .hf-mmF-who .c, .hf-ar .hf-mmF-plan .x, .hf-ar .hf-mmF-tick button, .hf-ar .hf-mmF-two > div, .hf-ar .hf-mmF-stop span.d{ line-height:1.45; }
.hf-ar .hf-mmF-tab th, .hf-ar .hf-mmF-tab td{ text-align:right; }
.hf-ar .hf-mmF-tab td.n{ direction:ltr; text-align:left; font-family:var(--mono); }
.hf-ar .hf-mmF-stop{ text-align:right; padding:3px 0 3px 4px; }
.hf-ar .hf-mmF-map .rail{ left:auto; right:13px; }
.hf-ar .hf-mmF-links{ border-left:0; border-right:3px solid var(--hf-hand); }
.hf-ar .hf-mmF-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-mmF-work{ direction:ltr; text-align:left; }
.hf-ar .hf-mmF-thr .chain span b{ margin-right:0; margin-left:3px; }
.hf-ar .hf-mmF-pts button, .hf-ar .hf-mmF-tick button{ text-align:right; }
.hf-ar .hf-mmF-who .c b{ margin-right:0; margin-left:4px; }
.hf-ar .hf-mmF-plan .m{ text-align:left; }
.hf-ar .hf-mmF-bar .l small{ margin-left:0; margin-right:3px; }
.hf-ar .hf-mmF-bar .b{ direction:ltr; }
.hf-ar .hf-mmF-bar .b i{ transform-origin:100% 50%; }
.hf-ar .hf-mmF-bar .b{ flex-direction:row-reverse; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-mmF-map .rail i{ display:none; } .hfb .hf-mmF-bar .b i, .hfb .hf-mmF-work > div{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  const num = s => { const x = parseFloat(String(s == null ? '' : s).replace(/[−–]/g, '-').replace(/[\s,]/g, '')); return isFinite(x) ? x : NaN; };
  const neg = s => String(s).replace(/-/g, '−');
  const f4 = x => neg((Math.abs(x) < 5e-5 ? 0 : x).toFixed(4));
  const f2 = x => neg((Math.abs(x) < 5e-3 ? 0 : x).toFixed(2));

  // How ready am I? one row per lecture, three buttons (kept with useSlot)
  function Rate({ lecs }) {
    const ar = useAr();
    const [r, setR] = H.K.useSlot('rate', {});
    const L = ar ? ['مهزوز', 'تمام', 'جامد'] : ['shaky', 'OK', 'solid'];
    const cnt = [0, 1, 2].map(j => lecs.filter(([n]) => r[n] === j).length);
    const shaky = lecs.filter(([n]) => r[n] === 0).map(([n]) => n);
    return html`<div className="hf-in"><div className="hf-mmF-rate">${lecs.map(([n, en, a]) => html`<div key=${n} className="row"><span className="n">${n}</span><span className="t">${ar ? a : en}</span>
      <span className="ch">${L.map((l, j) => html`<button key=${j} className=${'c' + j} aria-pressed=${String(r[n] === j)} onClick=${() => { const o = Object.assign({}, r); if (o[n] === j) delete o[n]; else o[n] = j; setR(o); }}>${l}</button>`)}</span></div>`)}</div>
      <p className="hf-mmF-sum">${ar ? TF(shaky.length ? `ابدأ بالمحاضرات دي: <bdi dir="ltr">${shaky.map(n => 'L' + n).join(', ')}</bdi>.` : `مهزوز <bdi>${cnt[0]}</bdi> · تمام <bdi>${cnt[1]}</bdi> · جامد <bdi>${cnt[2]}</bdi>`)
        : (shaky.length ? 'Start with: ' + shaky.map(n => 'L' + n).join(', ') + '.' : `shaky ${cnt[0]} · OK ${cnt[1]} · solid ${cnt[2]}`)}</p></div>`;
  }

  // the course map: eight stops on one line; tap a stop to see which lectures it feeds and why
  const STOPS = [
    [1, 'a0', 'Introduction', 'المقدمة', 'define it, its 4 characteristics, challenges, lossy vs lossless', 'التعريفات، الـ 4 characteristics، الـ challenges، والـ lossy والـ lossless', 'b'],
    [2, 'a1', 'DSP, filters, Fourier', 'الـ DSP والـ filters والـ Fourier', 'read f and phase from a sine, dB (10 or 20 log), FIR vs IIR', 'تطلّع الـ f والـ phase من الـ sine، والـ dB، والـ FIR ضد الـ IIR', 'a'],
    [3, 'a2', 'Multimedia data basics', 'أساسيات الـ multimedia data', 'static vs continuous media, the ADC → DAC pipeline, frame sizes', 'الـ static ضد الـ continuous، والـ pipeline، وأحجام الـ frames', 'b'],
    [4, 'a3', 'Sampling, Nyquist, file size', 'الـ Sampling والـ Nyquist وحجم الملف', 'fs ≥ 2·fmax, the interval, aliasing, t × fs × bits × ch', 'قاعدة الـ Nyquist، والـ interval، والـ aliasing، وحجم ملف الصوت', 'a'],
    [5, 'a4', 'Audio synthesis', 'الـ Audio synthesis', 'name the 7 methods, ADSR, FM sidebands, D = Fs / F1', 'تعرف الـ 7 طرق، والـ ADSR، والـ FM sidebands، والـ Karplus-Strong', 'a'],
    [6, 'a5', 'MIDI and MPEG-4 audio', 'الـ MIDI والـ MPEG-4 audio', 'decode 9C 50 7F, count bytes, GM numbers, the ports', 'تفك الـ messages، وتعد الـ bytes، وأرقام الـ GM، والـ ports', 'a'],
    [7, 'a6', 'Audio effects', 'الـ Audio effects', 'M = τ × fs, comb responses, ring mod sum and difference', 'الـ delay بالـ samples، والـ comb filters، والـ ring modulation', 'a'],
    [8, 'a7', 'Images, colour, video', 'الصور والألوان والـ video', 'RGB → CMYK, YIQ / YUV, CR, MSE / MAE, chroma subsampling', 'الـ CMYK والـ YIQ والـ YUV والـ CR والـ MSE والـ MAE', 'i']
  ];
  const LINKS = {
    1: [[3, 'the media types and their sizes come back in detail', 'أنواع الـ media وأحجامها بترجع بالتفصيل'], [6, '"compression via synthesis: MIDI" is a whole lecture', 'الـ compression via synthesis بقى محاضرة كاملة'], [8, 'lossy vs lossless returns as CR, MSE and MAE', 'الـ lossy والـ lossless بيرجعوا في الـ CR والـ MSE والـ MAE']],
    2: [[4, 'f = coefficient of t ÷ 2π is how you read x(t)', 'إزاي تقرا الـ frequency من x(t)'], [5, 'Fourier theory is the basis of additive synthesis', 'الـ Fourier هو أساس الـ additive synthesis'], [7, 'FIR and IIR come back as comb filters', 'الـ FIR والـ IIR بيرجعوا comb filters']],
    3: [[4, 'the ADC is where sampling and quantisation happen', 'الـ ADC هو اللي فيه الـ sampling والـ quantisation'], [8, 'frame = W × H × bits is every video problem', 'حجم الـ frame هو أساس كل مسائل الـ video']],
    4: [[3, 'the audio stream of every video problem', 'الـ audio stream في كل مسألة video'], [8, 'aliasing also hits images and video (wagon wheel)', 'الـ aliasing بيضرب الصور والـ video كمان']],
    5: [[6, 'MIDI drives the synthesiser; MPEG-4 SAOL describes it', 'الـ MIDI بيشغّل الـ synth، والـ SAOL بيوصفه'], [7, 'FM sidebands vs ring modulation sum and difference', 'الـ FM sidebands ضد الـ ring modulation']],
    6: [[1, 'why MIDI compresses: instructions, not samples', 'ليه الـ MIDI بيضغط: أوامر مش samples'], [4, '6000 bytes vs 10,584,000 bytes of CD audio', 'مقارنة بالـ CD audio']],
    7: [[2, 'comb filters are FIR / IIR with M delays', 'الـ comb filters هي FIR وIIR بـ M delays'], [5, 'modulation: amplitude, frequency (FM), phase', 'الـ modulation بيغيّر الـ amplitude أو الـ frequency أو الـ phase']],
    8: [[1, 'JPEG and MPEG are the lossy examples', 'الـ JPEG والـ MPEG هما أمثلة الـ lossy'], [3, 'image size = W × H × bits', 'حجم الصورة من محاضرة 3'], [4, 'aliasing in images is still Nyquist', 'الـ aliasing في الصور برضه Nyquist']]
  };
  function MetroMap() {
    const ar = useAr();
    const [sel, setSel] = H.K.useSlot('map', 4);
    const lk = (LINKS[sel] || []).map(x => x[0]);
    return html`<div className="hf-in"><div className="hf-mmF-map" role="group" aria-label=${ar ? 'خريطة الكورس' : 'Course map'}>
      <div className="rail" aria-hidden="true">${!calm() && html`<i></i>`}</div>
      ${STOPS.map(([n, , en, a, den, dar, tr], i) => html`<button key=${n} className=${'hf-mmF-stop hf-in ' + tr + (sel === n ? ' on' : '') + (lk.includes(n) ? ' lk' : '')} style=${{ animationDelay: calm() ? '0s' : (0.1 + i * 0.12) + 's' }} aria-pressed=${String(sel === n)} onClick=${() => setSel(n)}>
        <span className="dot">${n}</span><span><b>${ar ? a : en}</b><span className="d">${ar ? dar : den}</span></span></button>`)}
    </div>
    <div className="hf-mmF-links">${(LINKS[sel] || []).map(([m, en, a]) => html`<p key=${m}><b>L${sel} → L${m}</b> ${ar ? TF(a) : en}</p>`)}</div></div>`;
  }

  // Be the calculator: choose each step; every wrong option is a real mistake with its hint
  function Stepper({ id, probs }) {
    const ar = useAr();
    const [p0, setP] = H.K.useSlot(id + ':p', 0);
    const p = Math.min(p0, probs.length - 1);
    const prog = probs.map((_, j) => H.K.useSlot(id + ':' + j, 0)[0]);
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = probs[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j] || [P.hint || 'Not this one.', P.hint || 'مش دي.']); };
    const lines = P.steps.slice(0, k).reduce((a, s) => a.concat(s.w), []);
    return html`<div className="hf-mmF-st hf-in">
      ${probs.length > 1 && html`<div className="hf-mmF-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${probs.map((x, j) => html`<button key=${j} className=${prog[j] >= x.steps.length ? 'dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? x.tab[1] : x.tab[0]}</button>`)}</div>`}
      <div><span className=${'hf-mmF-ptag' + (P.ours ? ' ours' : '')}>${ar ? P.tag[1] : P.tag[0]}</span></div>
      <p className="hf-mmF-ask">${TF(ar ? P.ar : P.en)}</p>
      <div className="hf-mmF-work" dir="ltr">${lines.map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}${!done && html`<div className="cur">${st.c || '…'}</div>`}</div>
      ${done ? html`<p className="hf-mmF-ok">${TF(ar ? P.done[1] : P.done[0])}</p>`
        : html`<p className="hf-mmF-q">${TF(ar ? st.l[1] : st.l[0])}</p><div className="hf-mmF-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${o}</button>`)}</div>`}
      ${bad && html`<p className="hf-mmF-bad">${TF(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-mmF-btns">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'اعرض الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'اعرض الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div></div>`;
  }

  // a fill-in worksheet: type each value, Check marks every box, Show fills them and prints the working
  function Fill({ id, probs }) {
    const ar = useAr();
    const [p0, setP] = H.K.useSlot(id + ':p', 0);
    const p = Math.min(p0, probs.length - 1), P = probs[p];
    const [vals, setVals] = H.K.useSlot(id + ':v' + p, {});
    const [chk, setChk] = H.K.useSlot(id + ':c' + p, false);
    const [shown, setShown] = H.K.useSlot(id + ':s' + p, false);
    const okAt = f => { const x = num(vals[f.k]); return isFinite(x) && Math.abs(x - f.v) <= (f.tol != null ? f.tol : Math.max(1e-9, Math.abs(f.v) * 1e-6)); };
    const all = P.f.every(okAt);
    const firstBad = chk && !all ? P.f.find(f => !okAt(f)) : null;
    return html`<div className="hf-mmF-st hf-in">
      ${probs.length > 1 && html`<div className="hf-mmF-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${probs.map((x, j) => html`<button key=${j} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? x.tab[1] : x.tab[0]}</button>`)}</div>`}
      <div><span className=${'hf-mmF-ptag' + (P.ours ? ' ours' : '')}>${ar ? P.tag[1] : P.tag[0]}</span></div>
      <p className="hf-mmF-ask">${TF(ar ? P.ar : P.en)}</p>
      <div className="hf-mmF-fill">${P.f.map(f => html`<label key=${f.k} className=${f.wide ? 'w' : ''}><span>${TF(ar ? f.l[1] : f.l[0])}</span>
        <input className=${'hf-mmF-in' + (chk ? (okAt(f) ? ' ok' : ' no') : '')} type="text" inputMode="decimal" value=${vals[f.k] || ''} aria-label=${f.l[0]}
          onChange=${e => { setVals(Object.assign({}, vals, { [f.k]: e.target.value })); setChk(false); }} /></label>`)}</div>
      ${firstBad && html`<p className="hf-mmF-bad">${TF(ar ? firstBad.h[1] : firstBad.h[0])}</p>`}
      ${(shown || (chk && all)) && html`<div className="hf-mmF-work" dir="ltr">${P.work.map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}</div>`}
      <div className="hf-mmF-btns">
        <button className="hf-btn solid" onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const v = {}; P.f.forEach(f => { v[f.k] = f.s || String(f.v); }); setVals(v); setChk(true); setShown(true); }}>${ar ? 'اعرض الحل' : 'Show the answer'}</button>
        ${chk && html`<span className="hf-score">${all ? (ar ? 'كله صح!' : 'All right!') : html`<bdi dir="ltr">${P.f.filter(okAt).length} / ${P.f.length}</bdi>`}</span>`}
      </div></div>`;
  }

  // RGB → CMYK, pixel by pixel: tap a pixel, type its C M Y K (0–1, 4 decimals), Check; Show all prints the result matrices
  const cmykOf = (r, g, b) => { const n = [r, g, b].map(x => x / 255), c = n.map(x => 1 - x), K = Math.min(...c); return { n, c, K, out: c.map(x => x - K).concat(K) }; };
  function PixelGrid({ id, img, tag, ours, rows, cols }) {
    const ar = useAr();
    const N = rows * cols;
    const [sel, setSel] = H.K.useSlot(id + ':sel', 0);
    const [vals, setVals] = H.K.useSlot(id + ':v', {});
    const [chk, setChk] = H.K.useSlot(id + ':c', {});
    const [all, setAll] = H.K.useSlot(id + ':all', false);
    const [ch, setCh] = H.K.useSlot(id + ':ch', 0);
    const px = i => [img.R[Math.floor(i / cols)][i % cols], img.G[Math.floor(i / cols)][i % cols], img.B[Math.floor(i / cols)][i % cols]];
    const res = i => cmykOf(...px(i));
    const okAt = (i, k) => { const x = num((vals[i] || [])[k]); return isFinite(x) && Math.abs(x - res(i).out[k]) <= 0.0011; };
    const pixOk = i => [0, 1, 2, 3].every(k => okAt(i, k));
    const nOk = Array.from({ length: N }, (_, i) => i).filter(pixOk).length;
    const cur = px(sel), R = res(sel), v = vals[sel] || ['', '', '', ''];
    const showOne = () => { setVals(Object.assign({}, vals, { [sel]: R.out.map(x => f4(x).replace('−', '-')) })); setChk(Object.assign({}, chk, { [sel]: true })); };
    const showAll = () => { const nv = {}, nc = {}; for (let i = 0; i < N; i++) { nv[i] = res(i).out.map(x => f4(x).replace('−', '-')); nc[i] = true; } setVals(nv); setChk(nc); setAll(true); };
    const names = ['C', 'M', 'Y', 'K'];
    return html`<div className="hf-mmF-st hf-in">
      <div><span className=${'hf-mmF-ptag' + (ours ? ' ours' : '')}>${ar ? tag[1] : tag[0]}</span></div>
      <div className="hf-mmF-px" dir="ltr">
        <div className="hf-mmF-pg" style=${{ gridTemplateColumns: 'repeat(' + cols + ', 34px)' }} role="group" aria-label="The image's pixels">
          ${Array.from({ length: N }, (_, i) => { const q = px(i); return html`<button key=${i} className=${sel === i ? 'sel' : ''} style=${{ background: 'rgb(' + q.join(',') + ')' }} aria-label=${'pixel ' + (Math.floor(i / cols) + 1) + ',' + (i % cols + 1)} aria-pressed=${String(sel === i)} onClick=${() => setSel(i)}>${chk[i] ? (pixOk(i) ? '✓' : '✗') : ''}</button>`; })}
        </div>
        <div>
          <p className="hf-mmF-rgb">${'row ' + (Math.floor(sel / cols) + 1) + ', col ' + (sel % cols + 1)}<br/>RGB = (${cur.join(', ')})</p>
        </div>
      </div>
      <div className="hf-mmF-pin">${names.map((l, k) => html`<label key=${l}>${l}<input className=${'hf-mmF-in' + (chk[sel] ? (okAt(sel, k) ? ' ok' : ' no') : '')} type="text" inputMode="decimal" value=${v[k] || ''} aria-label=${l}
            onChange=${e => { const nv = (vals[sel] || ['', '', '', '']).slice(); nv[k] = e.target.value; setVals(Object.assign({}, vals, { [sel]: nv })); setChk(Object.assign({}, chk, { [sel]: false })); }} /></label>`)}</div>
      ${!all && chk[sel] && html`<div className="hf-mmF-work" dir="ltr"><div>÷255 → ${R.n.map(f4).join('  ')}</div><div>1 − x → ${R.c.map(f4).join('  ')}</div><div>K = min = ${f4(R.K)} → C′M′Y′K = ${R.out.map(f4).join('  ')}</div></div>`}
      <div className="hf-mmF-btns">
        <button className="hf-btn solid" onClick=${() => setChk(Object.assign({}, chk, { [sel]: true }))}>${ar ? 'صحّح الـ pixel دي' : 'Check this pixel'}</button>
        <button className="hf-btn" onClick=${showOne}>${ar ? 'اعرض الـ pixel دي' : 'Show this pixel'}</button>
        <button className="hf-btn" onClick=${showAll}>${ar ? 'اعرض الكل' : 'Show all'}</button>
        <span className="hf-score"><bdi dir="ltr">${nOk} / ${N}</bdi></span>
      </div>
      ${all && html`<div className="hf-in"><div className="hf-mmF-chip" dir="ltr" style=${{ marginBottom: '4px' }}>${["C′", "M′", "Y′", 'K'].map((l, k) => html`<button key=${l} aria-pressed=${String(ch === k)} onClick=${() => setCh(k)}>${l}</button>`)}</div>
        <div dir="ltr"><table className="hf-mmF-mat"><tbody>${Array.from({ length: rows }, (_, r) => html`<tr key=${r}>${Array.from({ length: cols }, (_, c) => { const x = res(r * cols + c).out[ch]; return html`<td key=${c} className=${Math.abs(x) < 5e-5 ? 'z' : ch === 3 ? 'k' : ''}>${f4(x)}</td>`; })}</tr>`)}</tbody></table></div></div>`}
    </div>`;
  }

  // MSE / MAE: type the difference matrix I − I″ cell by cell, then the sums and the averages
  function DiffFill({ id, probs }) {
    const ar = useAr();
    const [p0, setP] = H.K.useSlot(id + ':p', 0);
    const p = Math.min(p0, probs.length - 1), P = probs[p];
    const [vals, setVals] = H.K.useSlot(id + ':v' + p, {});
    const [chk, setChk] = H.K.useSlot(id + ':c' + p, false);
    const [shown, setShown] = H.K.useSlot(id + ':s' + p, false);
    const d = P.I.map((r, i) => r.map((x, j) => x - P.R[i][j])), fl = d.flat(), N = fl.length;
    const S2 = fl.reduce((a, x) => a + x * x, 0), S1 = fl.reduce((a, x) => a + Math.abs(x), 0);
    const fields = [['s2', 'Σ d²', S2], ['mse', 'MSE', S2 / N]].concat(P.mae ? [['s1', 'Σ |d|', S1], ['mae', 'MAE', S1 / N]] : []);
    const okD = k => num(vals['d' + k]) === fl[k];
    const okF = ([key, , v]) => { const x = num(vals[key]); return isFinite(x) && Math.abs(x - v) <= Math.max(0.006, Math.abs(v) * 1e-6); };
    const nOk = fl.filter((_, k) => okD(k)).length + fields.filter(okF).length, tot = N + fields.length;
    const cols = P.I[0].length;
    const Mx = ({ name, m }) => html`<div><span>${name}</span><table className="hf-mmF-mat"><tbody>${m.map((r, i) => html`<tr key=${i}>${r.map((x, j) => html`<td key=${j}>${x}</td>`)}</tr>`)}</tbody></table></div>`;
    return html`<div className="hf-mmF-st hf-in">
      ${probs.length > 1 && html`<div className="hf-mmF-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${probs.map((x, j) => html`<button key=${j} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? x.tab[1] : x.tab[0]}</button>`)}</div>`}
      <div><span className=${'hf-mmF-ptag' + (P.ours ? ' ours' : '')}>${ar ? P.tag[1] : P.tag[0]}</span></div>
      <div className="hf-mmF-mats" dir="ltr"><${Mx} name="I" m=${P.I} /><${Mx} name="I″" m=${P.R} /></div>
      <div className="hf-mmF-dg" dir="ltr" style=${{ gridTemplateColumns: 'auto repeat(' + cols + ', 54px)' }}>
        ${P.I.map((r, i) => html`<${React.Fragment} key=${i}><span style=${{ font: '800 13px/30px var(--mono)', color: 'var(--graphite)' }}>${i === 0 ? 'd =' : ''}</span>${r.map((_, j) => { const k = i * cols + j; return html`<input key=${j} className=${'hf-mmF-in' + (chk ? (okD(k) ? ' ok' : ' no') : '')} type="text" inputMode="numeric" value=${vals['d' + k] || ''} aria-label=${'d ' + (i + 1) + ',' + (j + 1)} onChange=${e => { setVals(Object.assign({}, vals, { ['d' + k]: e.target.value })); setChk(false); }} />`; })}</${React.Fragment}>`)}
      </div>
      <div className="hf-mmF-fill" dir="ltr" style=${{ gridTemplateColumns: '1fr 1fr' }}>${fields.map(([key, l]) => html`<label key=${key}><span>${l}</span><input className=${'hf-mmF-in' + (chk ? (okF(fields.find(f => f[0] === key)) ? ' ok' : ' no') : '')} type="text" inputMode="decimal" value=${vals[key] || ''} aria-label=${l} onChange=${e => { setVals(Object.assign({}, vals, { [key]: e.target.value })); setChk(false); }} /></label>`)}</div>
      ${shown && html`<div className="hf-mmF-work" dir="ltr"><div>Σ d² = ${S2.toLocaleString('en-US')} → MSE = ${S2.toLocaleString('en-US')} / ${N} = ${+(S2 / N).toFixed(4)}</div>${P.mae && html`<div>Σ |d| = ${S1} → MAE = ${S1} / ${N} = ${+(S1 / N).toFixed(4)}</div>`}</div>`}
      <div className="hf-mmF-btns">
        <button className="hf-btn solid" onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const v = {}; fl.forEach((x, k) => { v['d' + k] = String(x); }); fields.forEach(([key, , val]) => { v[key] = String(+val.toFixed(4)); }); setVals(v); setChk(true); setShown(true); }}>${ar ? 'اعرض الحل' : 'Show the answer'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${nOk} / ${tot}</bdi></span>`}
      </div></div>`;
  }

  // the written "why" questions: tap the points that belong in the answer, Check, then read the model answer
  function Points({ id, qs }) {
    const ar = useAr();
    const [p0, setP] = H.K.useSlot(id + ':p', 0);
    const p = Math.min(p0, qs.length - 1), Q = qs[p];
    const [pick, setPick] = H.K.useSlot(id + ':' + p, {});
    const [chk, setChk] = H.K.useSlot(id + ':c' + p, false);
    const right = Q.pts.filter((x, i) => !!pick[i] === x[2]).length;
    return html`<div className="hf-mmF-st hf-in">
      <div className="hf-mmF-tabs" role="group" aria-label=${ar ? 'الأسئلة' : 'Questions'}>${qs.map((x, j) => html`<button key=${j} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? x.tab[1] : x.tab[0]}</button>`)}</div>
      <div><span className="hf-mmF-ptag">${ar ? Q.tag[1] : Q.tag[0]}</span></div>
      <p className="hf-mmF-q" dir="ltr" style=${{ textAlign: 'left' }}>${Q.q}</p>
      <div className="hf-mmF-pts">${Q.pts.map((x, i) => html`<button key=${p + '-' + i} aria-pressed=${String(!!pick[i])} className=${chk ? (!!pick[i] === x[2] ? 'ok' : 'no') : ''} onClick=${() => { setPick(Object.assign({}, pick, { [i]: !pick[i] })); setChk(false); }}><i>${pick[i] ? '✓' : ''}</i><span>${TF(ar ? x[1] : x[0])}</span></button>`)}</div>
      ${chk && right === Q.pts.length && html`<p className="hf-mmF-ok">${TF(ar ? Q.model[1] : Q.model[0])}</p>`}
      <div className="hf-mmF-btns">
        <button className="hf-btn solid" onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; Q.pts.forEach((x, i) => { if (x[2]) o[i] = true; }); setPick(o); setChk(true); }}>${ar ? 'اعرض الإجابة النموذجية' : 'Show the model answer'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / ${Q.pts.length}</bdi></span>`}
      </div></div>`;
  }

  // Who am I? one clue per row, three names to choose from
  function WhoAmI({ id, rows }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => pick[i] === r.a).length;
    return html`<div className="hf-in"><div className="hf-mmF-who">${rows.map((r, i) => html`<div key=${i} className="r">
      <p className="c"><b>${chk ? 'L' + r.lec : '?'}</b>${TF(ar ? r.ar : r.en)}</p>
      <div className="o" dir="ltr">${r.o.map((o, j) => html`<button key=${j} aria-pressed=${String(pick[i] === j)} className=${chk && pick[i] === j ? (j === r.a ? 'ok' : 'no') : chk && j === r.a ? 'ok' : ''} onClick=${() => { setPick(Object.assign({}, pick, { [i]: j })); setChk(false); }}>${o}</button>`)}</div></div>`)}</div>
      <div className="hf-mmF-btns" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; rows.forEach((r, i) => { o[i] = r.a; }); setPick(o); setChk(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  // a checklist you can tick (kept with useSlot)
  function Tick({ id, items }) {
    const [on, setOn] = H.K.useSlot(id, {});
    return html`<div className="hf-mmF-tick hf-in">${items.map((x, i) => html`<button key=${i} aria-pressed=${String(!!on[i])} onClick=${() => setOn(Object.assign({}, on, { [i]: !on[i] }))}><i>✓</i><span>${TF(x)}</span></button>`)}</div>`;
  }

  /* ── the worked problems: real papers' numbers (checked against the site's answers) and our own variants ── */
  const b = s => '<bdi dir="ltr">' + s + '</bdi>';
  // P1 · the limiting sampling interval from x(t)
  const P_NYQ = [
    { tab: ['Final 20/21', 'نهائي 20/21'], tag: ['Final 2020/21 · Q3a · 10 marks', 'نهائي 2020/21 · س3أ · 10 درجات'],
      en: '<b>x(t) = 10A cos(100πt) + 20A sin(150πt) − 200A cos(200πt) − 2C cos(250πt)</b>, A and C &gt; 0. Find the lowest possible sampling interval without aliasing.',
      ar: 'لاقي أقل sampling interval من غير aliasing، والـ A والـ C أكبر من صفر:<span class="ltr"><b>x(t) = 10A cos(100πt) + 20A sin(150πt) − 200A cos(200πt) − 2C cos(250πt)</b></span>',
      steps: [
        { l: ['The frequency of each term?', 'الـ frequency بتاعة كل term كام؟'], c: 'f1, f2, f3, f4 = ?', o: ['100, 150, 200, 250 Hz', '50, 75, 100, 125 Hz', '314, 471, 628, 785 Hz'], a: 1, w: '100π/2π = 50 · 150π/2π = 75 · 200π/2π = 100 · 250π/2π = 125 Hz',
          h: [['That is the coefficient of πt. Each term is cos(2πf·t), so f = coefficient ÷ 2.', 'ده معامل الـ πt. كل term شكلها ' + b('cos(2πf·t)') + '، يعني نقسم المعامل على 2.'], null, ['That multiplies by π. Divide the coefficient of πt by 2.', 'ده ضرب في π. اقسم معامل الـ πt على 2.']] },
        { l: ['The highest frequency fmax?', 'أعلى frequency كام؟'], c: 'fmax = ?', o: ['125 Hz', '100 Hz', '50 Hz'], a: 0, w: 'fmax = 125 Hz (C > 0, so the term exists)',
          h: [null, ['100 Hz has the biggest amplitude (200A), but amplitudes never matter. Take the highest frequency.', 'الـ ' + b('100 Hz') + ' ليها أكبر amplitude، بس الـ amplitude ملهاش دعوة. خُد أعلى frequency.'], ['Nyquist needs the highest frequency, not the lowest.', 'الـ Nyquist عايز أعلى frequency، مش أوطى واحدة.']] },
        { l: ['The minimum sampling rate fs?', 'أقل sampling rate كام؟'], c: 'fs = ?', o: ['125 Hz', '250 Hz', '62.5 Hz'], a: 1, w: 'fs ≥ 2 × 125 = 250 Hz',
          h: [['That is fmax. Nyquist: fs ≥ 2 × fmax.', 'ده الـ fmax. الـ Nyquist بيقول ' + b('fs ≥ 2 × fmax') + '.'], null, ['That halves fmax. Double it.', 'ده قسم الـ fmax على 2. اضربه في 2.']] },
        { l: ['The limiting sampling interval T?', 'الـ sampling interval الحدّي كام؟'], c: 'T = ?', o: ['0.004 s', '0.008 s', '250 s'], a: 0, w: 'T = 1/fs = 1/250 = 0.004 s (4 ms)',
          h: [null, ['1/125 uses fmax. T = 1/fs.', 'الـ 1/125 دي استخدمت الـ fmax. الـ ' + b('T = 1/fs') + '.'], ['T is 1/fs, not fs.', 'الـ T هو ' + b('1/fs') + ' مش الـ fs.']] }
      ], done: ['<b>T = 0.004 s.</b> The amplitudes (10A, −200A, 2C) never change the answer, as long as they are not zero.', 'الإجابة ' + b('<b>T = 0.004 s</b>') + '. والـ amplitudes عمرها ما بتغيّر الإجابة طالما مش صفر.'] },
    { tab: ['Mid 21/22', 'ميدترم 21/22'], tag: ['Midterm 2021/22 · Q1', 'ميدترم 2021/22 · س1'],
      en: '<b>Y(t) = A cos(1500πt + 0.2π) − B sin(2500πt + 0.25π)</b>, A, B &gt; 0. The lowest sampling interval, and the phase of each component.',
      ar: 'هات أقل sampling interval، والـ phase بتاعة كل component:<span class="ltr"><b>Y(t) = A cos(1500πt + 0.2π) − B sin(2500πt + 0.25π)</b></span>',
      steps: [
        { l: ['The two frequencies?', 'الـ 2 frequencies كام؟'], c: 'f1, f2 = ?', o: ['1500, 2500 Hz', '750, 1250 Hz', '0.2, 0.25 Hz'], a: 1, w: '1500π/2π = 750 Hz · 2500π/2π = 1250 Hz',
          h: [['Divide the coefficient of πt by 2.', 'اقسم معامل الـ πt على 2.'], null, ['0.2π and 0.25π are the phases (the constants), not frequencies.', 'الـ 0.2π والـ 0.25π دول الـ phases (الثوابت)، مش frequencies.']] },
        { l: ['fs and the limiting interval T?', 'الـ fs والـ interval الحدّي؟'], c: 'fs, T = ?', o: ['2500 Hz, 0.0004 s', '1250 Hz, 0.0008 s', '1500 Hz, 0.00067 s'], a: 0, w: 'fmax = 1250 → fs ≥ 2500 Hz → T = 1/2500 = 0.0004 s',
          h: [null, ['1250 Hz is fmax. Double it first.', 'الـ ' + b('1250 Hz') + ' دي الـ fmax، اضربها في 2 الأول.'], ['Use the highest frequency (1250 Hz), times 2.', 'استخدم أعلى frequency وهي ' + b('1250 Hz') + '، واضربها في 2.']] },
        { l: ['The phases, read directly from the brackets?', 'الـ phases لو قريتها من جوه الأقواس على طول؟'], c: 'φ1, φ2 = ?', o: ['0.2° and 0.25°', '36° and 45°', '750° and 1250°'], a: 1, w: ['φ1 = 0.2π rad = 36° · φ2 = 0.25π rad = 45°', '(rewritten as a·sin(ωt + φ), a > 0: 126° and 225°; say which form)'],
          h: [['Those are in units of π radians: 0.2π rad = 0.2 × 180° = 36°.', 'دول بوحدة π radians: ' + b('0.2π rad = 0.2 × 180° = 36°') + '.'], null, ['Those are frequencies, not angles.', 'دول frequencies مش زوايا.']] }
      ], done: ['<b>T = 0.0004 s; phases 36° and 45°.</b> If you first rewrite both terms as a·sin(ωt + φ) with positive amplitudes you get 126° and 225°: state which form you use.', 'الإجابة ' + b('<b>T = 0.0004 s</b>') + ' والـ phases هي ' + b('36°') + ' و' + b('45°') + '. ولو كتبت الاتنين على شكل ' + b('a·sin(ωt + φ)') + ' الأول هتطلع ' + b('126°') + ' و' + b('225°') + ': قول إنت شغال بأنهي شكل.'] },
    { tab: ['Final 21/22', 'نهائي 21/22'], tag: ['Final 2021/22 T2 · Q1a', 'نهائي 2021/22 ت2 · س1أ'],
      en: '<b>f(t) = A cos(1000πt) − B sin(50πt) + C cos(200πt) − D sin(250πt)</b>, A, B &gt; 0. The lowest sampling interval?',
      ar: 'أقل sampling interval كام؟ والـ A والـ B أكبر من صفر:<span class="ltr"><b>f(t) = A cos(1000πt) − B sin(50πt) + C cos(200πt) − D sin(250πt)</b></span>',
      steps: [
        { l: ['The frequencies?', 'الـ frequencies كام؟'], c: 'f = ?', o: ['500, 25, 100, 125 Hz', '1000, 50, 200, 250 Hz'], a: 0, w: '1000π/2π = 500 · 50π/2π = 25 · 200π/2π = 100 · 250π/2π = 125 Hz',
          h: [null, ['Divide each coefficient of πt by 2.', 'اقسم كل معامل πt على 2.']] },
        { l: ['fmax?', 'الـ fmax كام؟'], c: 'fmax = ?', o: ['125 Hz', '500 Hz'], a: 1, w: 'fmax = 500 Hz (the FIRST term; A > 0, so it exists)',
          h: [['The last term is not always the highest. 500 Hz comes first here.', 'آخر term مش دايمًا الأعلى. هنا الـ ' + b('500 Hz') + ' جاية في الأول.'], null] },
        { l: ['The limiting interval T?', 'الـ interval الحدّي كام؟'], c: 'T = ?', o: ['0.001 s', '0.002 s', '0.004 s'], a: 0, w: 'fs ≥ 2 × 500 = 1000 Hz → T = 1/1000 = 0.001 s',
          h: [null, ['1/500 uses fmax. Double first: fs = 1000 Hz.', 'الـ 1/500 استخدمت الـ fmax. اضرب في 2 الأول: ' + b('fs = 1000 Hz') + '.'], ['0.004 s belongs to fmax = 125 Hz: the wrong term.', 'الـ ' + b('0.004 s') + ' دي بتاعة ' + b('125 Hz') + '، يعني term غلط.']] }
      ], done: ['<b>T = 0.001 s.</b> Phases: no constant inside any bracket, so each is 0 as written (90° for a cos and 180° for a minus sign if rewritten as a·sin).', 'الإجابة ' + b('<b>T = 0.001 s</b>') + '. والـ phases: مفيش ثابت جوه أي قوس، فكلها 0 زي ما هي مكتوبة (أو ' + b('90°') + ' للـ cos و' + b('180°') + ' لعلامة السالب لو حوّلتها لـ sin).'] },
    { tab: ['Ours', 'من عندنا'], ours: true, tag: ['Our variant · fresh numbers', 'مسألة من عندنا · أرقام جديدة'],
      en: '<b>x(t) = 3cos(600πt + π/4) + 5sin(1800πt) − 2cos(1200πt − π/3)</b>. The limiting interval and the phases as written.',
      ar: 'هات الـ interval الحدّي، والـ phases زي ما هي مكتوبة:<span class="ltr"><b>x(t) = 3cos(600πt + π/4) + 5sin(1800πt) − 2cos(1200πt − π/3)</b></span>',
      steps: [
        { l: ['The frequencies?', 'الـ frequencies كام؟'], c: 'f = ?', o: ['300, 900, 600 Hz', '600, 1800, 1200 Hz', '300, 900, 600 rad/s'], a: 0, w: '600π/2π = 300 · 1800π/2π = 900 · 1200π/2π = 600 Hz',
          h: [null, ['Divide by 2 (each term is 2πf·t).', 'اقسم على 2 (كل term شكلها ' + b('2πf·t') + ').'], ['f is in Hz (cycles per second); ω = 2πf is in rad/s.', 'الـ f بالـ Hz، أما ' + b('ω = 2πf') + ' فبالـ rad/s.']] },
        { l: ['fs and T?', 'الـ fs والـ T؟'], c: 'fs, T = ?', o: ['1800 Hz, ≈ 0.000556 s', '900 Hz, ≈ 0.00111 s', '1200 Hz, ≈ 0.000833 s'], a: 0, w: 'fmax = 900 Hz → fs ≥ 1800 Hz → T = 1/1800 ≈ 0.000556 s',
          h: [null, ['900 Hz is fmax. Double it.', 'الـ ' + b('900 Hz') + ' دي الـ fmax، اضربها في 2.'], ['That doubles 600 Hz: the highest is 900 Hz (the middle term).', 'ده ضاعف الـ ' + b('600 Hz') + '، والأعلى هو ' + b('900 Hz') + ' (الـ term اللي في النص).']] },
        { l: ['The phases as written?', 'الـ phases زي ما هي مكتوبة؟'], c: 'φ = ?', o: ['45°, 0°, −60°', '0.25°, 0°, 0.33°', '45°, 90°, 60°'], a: 0, w: 'π/4 = 45° · none = 0° · −π/3 = −60°',
          h: [null, ['π/4 rad = 180°/4 = 45°: convert from radians.', 'حوّل من الـ radians: ' + b('π/4 = 45°') + '.'], ['As written: the middle term has no constant (0°), and −π/3 keeps its sign.', 'زي ما هي مكتوبة: الـ term اللي في النص مفيهوش ثابت يعني ' + b('0°') + '، والـ ' + b('−π/3') + ' بتفضل سالبة.']] }
      ], done: ['<b>T = 1/1800 ≈ 0.000556 s; phases 45°, 0°, −60°.</b>', 'الإجابة ' + b('<b>T ≈ 0.000556 s</b>') + '، والـ phases هي ' + b('45°, 0°, −60°') + '.'] }
  ];

  // P2 · audio file size (typed worksheet)
  const H_FS = ['fs = 1 / interval (convert ms to s first), or the course constant: speech 8000 Hz, music 44,100 Hz.', 'الـ ' + b('fs = 1 / interval') + ' (حوّل الـ ms لثواني الأول)، أو ثابت الكورس: الـ speech ' + b('8000 Hz') + ' والـ music ' + b('44,100 Hz') + '.'];
  const H_T = ['Time in seconds: hours × 3600, minutes × 60.', 'الوقت بالثواني: الساعات × 3600 والدقايق × 60.'];
  const H_CH = ['Channels: mono = 1, stereo = 2.', 'الـ channels: الـ mono = 1 والـ stereo = 2.'];
  const H_BITS = ['Size in bits = t × fs × bits × channels.', 'الحجم بالـ bits هو ' + b('t × fs × bits × ch') + '.'];
  const H_B = ['Bytes = bits ÷ 8.', 'الـ bytes هي الـ bits ÷ 8.'];
  const H_KB = ['KB = bytes ÷ 1024 (the course uses 1 KB = 1024 B).', 'الـ KB هي الـ bytes ÷ 1024 (الكورس بيستخدم ' + b('1 KB = 1024 B') + ').'];
  const audioF = (fs, t, bits, ch) => { const S = t * fs * bits * ch; return [
    { k: 'fs', l: ['fs (Hz)', 'الـ fs (Hz)'], v: fs, h: H_FS, s: fs.toLocaleString('en-US') }, { k: 't', l: ['t (s)', 'الـ t (ثانية)'], v: t, h: H_T, s: t.toLocaleString('en-US') },
    { k: 'b', l: ['bits / sample', 'الـ bits'], v: bits, h: ['The sample size is given in the question.', 'الـ sample size مكتوب في السؤال.'] }, { k: 'ch', l: ['channels', 'الـ channels'], v: ch, h: H_CH },
    { k: 'S', l: ['Size (bits)', 'الحجم (bits)'], v: S, h: H_BITS, wide: true, s: S.toLocaleString('en-US') }, { k: 'B', l: ['Size (bytes)', 'الحجم (bytes)'], v: S / 8, h: H_B, wide: true, s: (S / 8).toLocaleString('en-US') },
    { k: 'KB', l: ['Size (KB)', 'الحجم (KB)'], v: S / 8192, h: H_KB, wide: true, tol: 0.006, s: (S / 8192).toLocaleString('en-US') }]; };
  const P_AUDIO = [
    { tab: ['F 22/23 S', 'نهائي 22/23'], tag: ['Final 2022/23 Summer · Q2 · 10 marks', 'نهائي 2022/23 صيفي · س2 · 10 درجات'],
      en: 'A <b>speech</b> signal, sample size <b>32 bits</b>, duration <b>2.5 hours</b>, <b>stereo</b>. (a) The sampling frequency? (b) The file size?',
      ar: 'إشارة <b>speech</b>، الـ sample size بـ ' + b('32 bits') + '، والمدة <b>ساعتين ونص</b>، و<b>stereo</b>. هات الـ sampling frequency، وبعدين حجم الملف.',
      f: audioF(8000, 9000, 32, 2), work: ['speech: fs = 8000 Hz · t = 2.5 × 3600 = 9000 s', '9000 × 8000 × 32 × 2 = 4,608,000,000 bits', '÷ 8 = 576,000,000 B · ÷ 1024 = 562,500 KB ≈ 549.32 MB'] },
    { tab: ['F 21/22', 'نهائي 21/22'], tag: ['Final 2021/22 T2 · Q1b · 5 marks', 'نهائي 2021/22 ت2 · س1ب · 5 درجات'],
      en: 'Sampling interval <b>500 milliseconds</b>, sample size <b>64 bits</b>, duration <b>5.5 hours</b>, <b>stereo</b>. The file size?',
      ar: 'الـ sampling interval ' + b('500 ms') + '، والـ sample size ' + b('64 bits') + '، والمدة <b>5 ساعات ونص</b>، و<b>stereo</b>. حجم الملف كام؟',
      f: audioF(2, 19800, 64, 2), work: ['fs = 1 / 0.5 s = 2 Hz · t = 19,800 s', '19,800 × 2 × 64 × 2 = 5,068,800 bits', '÷ 8 = 633,600 B · ÷ 1024 = 618.75 KB'] },
    { tab: ['Mid 21/22', 'ميدترم 21/22'], tag: ['Midterm 2021/22 · Q2 · 4 marks', 'ميدترم 2021/22 · س2 · 4 درجات'],
      en: 'Sampling interval <b>0.00125 second</b>, sample size <b>64 bits</b>, duration <b>6.5 hours</b>, <b>stereo</b>. The file size?',
      ar: 'الـ sampling interval ' + b('0.00125 s') + '، والـ sample size ' + b('64 bits') + '، والمدة <b>6 ساعات ونص</b>، و<b>stereo</b>. حجم الملف كام؟',
      f: audioF(800, 23400, 64, 2), work: ['fs = 1 / 0.00125 = 800 Hz · t = 23,400 s', '23,400 × 800 × 64 × 2 = 2,396,160,000 bits', '÷ 8 = 299,520,000 B · ÷ 1024 = 292,500 KB ≈ 285.64 MB'] },
    { tab: ['Ours', 'من عندنا'], ours: true, tag: ['Our variant · fresh numbers', 'مسألة من عندنا · أرقام جديدة'],
      en: 'Sampling interval <b>0.0625 ms</b>, <b>16-bit</b>, <b>mono</b>, <b>45 minutes</b>. The file size?',
      ar: 'الـ sampling interval ' + b('0.0625 ms') + '، و' + b('16‑bit') + '، و<b>mono</b>، لمدة <b>45 دقيقة</b>. حجم الملف كام؟',
      f: audioF(16000, 2700, 16, 1), work: ['fs = 1 / 0.0000625 s = 16,000 Hz · t = 2700 s', '2700 × 16,000 × 16 × 1 = 691,200,000 bits', '÷ 8 = 86,400,000 B · ÷ 1024 = 84,375 KB ≈ 82.40 MB'] }
  ];

  // P3 · video file size and compression ratio (stepper)
  const P_VIDEO = [
    { tab: ['Mid #1', 'ميدترم 1'], tag: ['Midterm #1 · Q3 a + b · 10 marks', 'ميدترم 1 · س3 أ + ب · 10 درجات'],
      en: '<b>3 hours</b> of video: a <b>stereo audio</b> stream and <b>1600 × 800 colour</b> frames at <b>29 fps</b>. (a) Total size? (b) Compressed to <b>3 MB</b>: the CR?',
      ar: 'فيديو <b>3 ساعات</b> فيه audio stream <b>stereo</b>، وframes ملونة ' + b('1600 × 800') + ' بـ ' + b('29 fps') + '. هات الحجم الكلي، وبعدين الـ CR لو اتضغط لـ ' + b('3 MB') + '.',
      steps: [
        { l: ['Time in seconds?', 'الوقت بالثواني؟'], c: 't = ?', o: ['180 s', '10,800 s', '3 s'], a: 1, w: 't = 3 × 3600 = 10,800 s', h: [['× 60 is for minutes. Hours: × 3600.', 'الـ × 60 للدقايق. الساعات × 3600.'], null, ['The formula needs seconds.', 'المعادلة عايزة ثواني.']] },
        { l: ['Bits per pixel?', 'كام bit لكل pixel؟'], c: 'depth = ?', o: ['1', '8', '24'], a: 2, w: 'colour → 24 bits / pixel', h: [['1 bit is black and white.', 'الـ 1 bit ده للأبيض والأسود.'], ['8 bits is grey scale. Colour is 24.', 'الـ 8 bits دي للـ grey scale. الملوّن 24.'], null] },
        { l: ['The video stream in bits?', 'الـ video stream بالـ bits؟'], c: 'video = ?', o: ['331,776,000,000 bits', '9,621,504,000,000 bits', '1,202,688,000,000 bits'], a: 1, w: '1600 × 800 × 24 × 29 × 10,800 = 9,621,504,000,000 bits',
          h: [['The × 29 fps is missing.', 'ناقص الـ ' + b('× 29 fps') + '.'], null, ['That is in bytes. Stay in bits until the end.', 'ده بالـ bytes. خليك بالـ bits لحد الآخر.']] },
        { l: ['The audio stream? (sample size Q is not given)', 'الـ audio stream؟ (الـ sample size Q مش مكتوب)'], c: 'audio = ?', o: ['476,280,000·Q bits', '952,560,000·Q bits', '15,240,960,000 bits'], a: 1, w: 'music: 44,100 Hz, 2 ch → 10,800 × 44,100 × Q × 2 = 952,560,000·Q bits',
          h: [['That is mono. Stereo: × 2.', 'ده mono. الـ stereo × 2.'], null, ['That plugs in Q = 16, which the paper never gave. Keep Q, or say the value you assume.', 'ده عوّض بـ ' + b('Q = 16') + ' والورقة مقالتهاش. سيب الـ Q، أو قول إنت فارض كام.']] },
        { l: ['3 MB in bits?', 'الـ 3 MB كام bit؟'], c: 'compressed = ?', o: ['3,000,000 bits', '3,145,728 bits', '25,165,824 bits'], a: 2, w: '3 × 1024 × 1024 × 8 = 25,165,824 bits',
          h: [['The course uses 1 MB = 1024 × 1024 B, and you need × 8 for bits.', 'الكورس بيستخدم ' + b('1 MB = 1024 × 1024 B') + '، ولازم × 8 عشان الـ bits.'], ['That is bytes. Multiply by 8 to compare with the original in bits.', 'ده بالـ bytes. اضرب في 8 عشان تقارنه بالأصل اللي بالـ bits.'], null] },
        { l: ['CR = compressed / original × 100 (with Q = 16)?', 'الـ CR لو Q = 16؟'], c: 'CR = ?', o: ['≈ 0.000261 %', '≈ 382,930 %', '≈ 0.0261 %'], a: 0, w: ['total = 9,621,504,000,000 + 952,560,000·Q bits', 'Q = 16: 25,165,824 / 9,636,744,960,000 × 100 ≈ 0.000261 %'],
          h: [null, ['That is original ÷ compressed (the textbook 382,930 : 1). The course writes compressed ÷ original × 100.', 'ده الأصل ÷ المضغوط (شكل الكتاب ' + b('382,930 : 1') + '). الكورس بيكتب المضغوط ÷ الأصل × 100.'], ['Redo the × 100: 25,165,824 / 9,636,744,960,000 = 0.00000261.', 'راجع الـ × 100: الناتج قبلها ' + b('0.00000261') + '.']] }
      ], done: ['<b>Total = 9,621,504,000,000 + 952,560,000·Q bits; CR = 25,165,824 / total × 100</b> (≈ 0.000261 % if you state Q = 16).', 'الإجابة: الحجم ' + b('9,621,504,000,000 + 952,560,000·Q bits') + '، والـ CR هو ' + b('25,165,824 / total × 100') + ' (يعني ' + b('≈ 0.000261 %') + ' لو قلت إن ' + b('Q = 16') + ').'] },
    { tab: ['F 23/24', 'نهائي 23/24'], tag: ['Final 2023/24 · Q2 · 2 × 15 marks', 'نهائي 2023/24 · س2 · 2 × 15 درجة'],
      en: '<b>10 hours</b> of video, <b>1600 × 800 colour</b> frames (fps not given). Total size when the audio is (a) <b>mono speech</b>, (b) <b>stereo music</b>?',
      ar: 'فيديو <b>10 ساعات</b> بـ frames ملونة ' + b('1600 × 800') + ' (الـ fps مش مكتوب). هات الحجم الكلي لو الـ audio كان <b>mono speech</b>، ولو كان <b>stereo music</b>.',
      steps: [
        { l: ['Time in seconds?', 'الوقت بالثواني؟'], c: 't = ?', o: ['36,000 s', '600 s'], a: 0, w: 't = 10 × 3600 = 36,000 s', h: [null, ['Hours: × 3600, not × 60.', 'الساعات × 3600 مش × 60.']] },
        { l: ['The video stream?', 'الـ video stream؟'], c: 'video = ?', o: ['30,720,000·FPS bits', '1,105,920,000,000·FPS bits', '27,648,000,000,000 bits'], a: 1, w: '1600 × 800 × 24 × FPS × 36,000 = 1,105,920,000,000·FPS bits',
          h: [['That is one second only: × 36,000 s is missing.', 'ده ثانية واحدة بس: ناقص ' + b('× 36,000 s') + '.'], null, ['That plugs in 25 fps, which the paper does not give. Keep FPS (or state the value you assume).', 'ده عوّض بـ ' + b('25 fps') + ' والورقة مقالتهاش. سيب الـ FPS أو قول إنت فارض كام.']] },
        { l: ['(a) Mono speech audio?', 'الـ audio في (أ) لو mono speech؟'], c: 'audio(a) = ?', o: ['288,000,000·Q bits', '576,000,000·Q bits', '1,587,600,000·Q bits'], a: 0, w: '(a) 8000 × Q × 1 × 36,000 = 288,000,000·Q bits',
          h: [null, ['That is stereo. This speech is mono.', 'ده stereo، والـ speech هنا mono.'], ['That is 44.1 kHz music. Speech: 8000 Hz.', 'ده music بـ ' + b('44.1 kHz') + '. الـ speech بـ ' + b('8000 Hz') + '.']] },
        { l: ['(b) Stereo music audio?', 'الـ audio في (ب) لو stereo music؟'], c: 'audio(b) = ?', o: ['1,587,600,000·Q bits', '3,175,200,000·Q bits', '576,000,000·Q bits'], a: 1, w: '(b) 44,100 × Q × 2 × 36,000 = 3,175,200,000·Q bits',
          h: [['That is mono music. Stereo: × 2.', 'ده music mono. الـ stereo × 2.'], null, ['That uses the speech rate. Music: 44,100 Hz.', 'ده استخدم rate الـ speech. الـ music بـ ' + b('44,100 Hz') + '.']] },
        { l: ['The total for (b)?', 'الحجم الكلي في (ب)؟'], c: 'total(b) = ?', o: ['1,105,920,000,000·FPS + 3,175,200,000·Q bits', '1,109,095,200,000·FPS·Q bits'], a: 0, w: ['(a) 1,105,920,000,000·FPS + 288,000,000·Q bits', '(b) 1,105,920,000,000·FPS + 3,175,200,000·Q bits'],
          h: [null, ['Video and audio are two streams: add them, never merge FPS and Q.', 'الـ video والـ audio دول stream‑ين: اجمعهم، ومتدمجش الـ FPS مع الـ Q.']] }
      ], done: ['<b>(a) 1,105,920,000,000·FPS + 288,000,000·Q bits; (b) 1,105,920,000,000·FPS + 3,175,200,000·Q bits.</b> With 25 fps and Q = 16, stated: (a) 27,652,608,000,000 bits.', 'الإجابة: (أ) ' + b('1,105,920,000,000·FPS + 288,000,000·Q') + '، و(ب) ' + b('1,105,920,000,000·FPS + 3,175,200,000·Q') + '. ولو قلت ' + b('25 fps') + ' و' + b('Q = 16') + ' تطلع (أ) ' + b('27,652,608,000,000 bits') + '.'] },
    { tab: ['F 22/23', 'نهائي 22/23'], tag: ['Final 2022/23 T2 · Q1 ii · 10 marks', 'نهائي 2022/23 ت2 · س1 ثانيًا · 10 درجات'],
      en: '<b>4 hours</b> of video: <b>stereo speech</b> and <b>600 × 800 grey-scale</b> frames. (a) Total size? (b) Lossy-compressed to <b>1000 KB</b>: the CR?',
      ar: 'فيديو <b>4 ساعات</b> فيه <b>stereo speech</b> وframes ' + b('600 × 800') + ' <b>grey‑scale</b>. هات الحجم الكلي، وبعدين الـ CR لو اتضغط لـ ' + b('1000 KB') + '.',
      steps: [
        { l: ['Bits per pixel?', 'كام bit لكل pixel؟'], c: 'depth = ?', o: ['8', '24'], a: 0, w: 't = 4 × 3600 = 14,400 s · grey → 8 bits / pixel', h: [null, ['24 is colour. Grey scale is 8 bits.', 'الـ 24 للملوّن. الـ grey scale بـ 8 bits.']] },
        { l: ['The video stream?', 'الـ video stream؟'], c: 'video = ?', o: ['55,296,000,000·FPS bits', '165,888,000,000·FPS bits'], a: 0, w: '600 × 800 × 8 × FPS × 14,400 = 55,296,000,000·FPS bits', h: [null, ['That uses 24 bits. Grey: 8.', 'ده استخدم 24 bit، والـ grey بـ 8.']] },
        { l: ['The audio stream (stereo speech)?', 'الـ audio stream (stereo speech)؟'], c: 'audio = ?', o: ['115,200,000·Q bits', '230,400,000·Q bits', '1,270,080,000·Q bits'], a: 1, w: '8000 × Q × 2 × 14,400 = 230,400,000·Q bits',
          h: [['That is mono.', 'ده mono.'], null, ['That uses 44.1 kHz. Speech: 8000 Hz.', 'ده استخدم ' + b('44.1 kHz') + '. الـ speech بـ ' + b('8000 Hz') + '.']] },
        { l: ['1000 KB in bits?', 'الـ 1000 KB كام bit؟'], c: 'compressed = ?', o: ['8,000,000 bits', '8,192,000 bits', '1,024,000 bits'], a: 1, w: '1000 × 1024 × 8 = 8,192,000 bits', h: [['1 KB = 1024 B in this course.', 'الـ ' + b('1 KB = 1024 B') + ' في الكورس ده.'], null, ['That is bytes. × 8.', 'ده بالـ bytes. اضرب في 8.']] },
        { l: ['The CR (stating 25 fps, Q = 16)?', 'الـ CR لو قلت 25 fps و Q = 16؟'], c: 'CR = ?', o: ['≈ 0.000591 %', '≈ 0.0591 %', '≈ 169,200 %'], a: 0, w: ['total = 55,296,000,000·FPS + 230,400,000·Q', '25 fps, Q = 16: 8,192,000 / 1,386,086,400,000 × 100 ≈ 0.000591 %'],
          h: [null, ['Recheck the × 100.', 'راجع الـ × 100.'], ['That is original ÷ compressed (textbook form). The course: compressed ÷ original × 100.', 'ده الأصل ÷ المضغوط (شكل الكتاب). الكورس: المضغوط ÷ الأصل × 100.']] }
      ], done: ['<b>CR = 8,192,000 / (55,296,000,000·FPS + 230,400,000·Q) × 100</b> ≈ 0.000591 % at 25 fps and Q = 16.', 'الإجابة ' + b('CR = 8,192,000 / (55,296,000,000·FPS + 230,400,000·Q) × 100') + '، يعني ' + b('≈ 0.000591 %') + ' عند ' + b('25 fps') + ' و' + b('Q = 16') + '.'] },
    { tab: ['Ours', 'من عندنا'], ours: true, tag: ['Our variant · fresh numbers', 'مسألة من عندنا · أرقام جديدة'],
      en: '<b>2 minutes</b> of <b>640 × 480 colour</b> video at <b>25 fps</b>, <b>mono 16-bit speech</b>. Total size? Compressed to <b>10 MB</b>: the CR?',
      ar: 'فيديو <b>دقيقتين</b> ملوّن ' + b('640 × 480') + ' بـ ' + b('25 fps') + '، وفيه <b>mono speech</b> بـ ' + b('16 bits') + '. الحجم الكلي كام؟ والـ CR لو اتضغط لـ ' + b('10 MB') + '؟',
      steps: [
        { l: ['The video stream?', 'الـ video stream؟'], c: 'video = ?', o: ['22,118,400,000 bits', '184,320,000 bits', '7,372,800,000 bits'], a: 0, w: 't = 120 s · 640 × 480 × 24 × 25 × 120 = 22,118,400,000 bits',
          h: [null, ['That is one second: × 120 s is missing.', 'ده ثانية واحدة: ناقص ' + b('× 120 s') + '.'], ['That uses 8 bits. Colour is 24.', 'ده استخدم 8 bits. الملوّن 24.']] },
        { l: ['The audio stream?', 'الـ audio stream؟'], c: 'audio = ?', o: ['15,360,000 bits', '30,720,000 bits', '84,672,000 bits'], a: 0, w: '8000 × 16 × 1 × 120 = 15,360,000 bits',
          h: [null, ['That is stereo. Mono: × 1.', 'ده stereo. الـ mono × 1.'], ['That is 44.1 kHz music. Speech: 8000 Hz.', 'ده music. الـ speech بـ ' + b('8000 Hz') + '.']] },
        { l: ['10 MB in bits?', 'الـ 10 MB كام bit؟'], c: 'compressed = ?', o: ['83,886,080 bits', '10,485,760 bits', '80,000,000 bits'], a: 0, w: ['total = 22,133,760,000 bits', '10 × 1024 × 1024 × 8 = 83,886,080 bits'],
          h: [null, ['That is bytes. × 8.', 'ده بالـ bytes. اضرب في 8.'], ['1 MB = 1024 × 1024 B in this course.', 'الـ ' + b('1 MB = 1024 × 1024 B') + ' في الكورس ده.']] },
        { l: ['CR?', 'الـ CR كام؟'], c: 'CR = ?', o: ['≈ 0.379 %', '≈ 263.85 %', '≈ 0.0474 %'], a: 0, w: '83,886,080 / 22,133,760,000 × 100 ≈ 0.379 %',
          h: [null, ['That is original ÷ compressed (263.85 : 1).', 'ده الأصل ÷ المضغوط ' + b('(263.85 : 1)') + '.'], ['That compares bytes with bits. Use bits for both.', 'ده قارن bytes بـ bits. خلّي الاتنين bits.']] }
      ], done: ['<b>Total 22,133,760,000 bits (2,766,720,000 B); CR ≈ 0.379 %</b> (textbook form ≈ 263.85 : 1).', 'الإجابة: الحجم ' + b('22,133,760,000 bits') + '، والـ CR تقريبًا ' + b('0.379 %') + ' (وبشكل الكتاب ' + b('≈ 263.85 : 1') + ').'] }
  ];

  // P4 · image compression ratio (typed worksheet)
  const crF = (orig, comp) => [
    { k: 'o', l: ['Original (bytes)', 'الأصل (bytes)'], v: orig, h: ['Original = colour depth × rows × columns: 8-bit grey = 1 byte per pixel, 24-bit = 3 bytes.', 'الأصل = الـ colour depth × الصفوف × الأعمدة: الـ grey بـ byte لكل pixel، والـ 24‑bit بـ 3 bytes.'], wide: true },
    { k: 'c', l: ['Compressed (bytes)', 'المضغوط (bytes)'], v: comp, h: ['Compressed = the KB value × 1024.', 'المضغوط = رقم الـ KB × 1024.'], wide: true, tol: 0.0006 },
    { k: 'cr', l: ['CR (%)', 'الـ CR (%)'], v: comp / orig * 100, h: ['CR = compressed / original × 100 (the course convention), lossy or lossless alike.', 'الـ ' + b('CR = compressed / original × 100') + ' (طريقة الكورس)، سواء lossy أو lossless.'], wide: true, tol: 0.006 }];
  const IMG5 = [[10, 110, 110, 210, 210], [20, 120, 120, 220, 220], [30, 130, 130, 230, 230], [40, 140, 255, 240, 240], [50, 150, 150, 250, 250]];
  const P_CR = [
    { tab: ['F 25/26', 'نهائي 25/26'], tag: ['Final 2025/26 · Q4 a, b · 12 marks', 'نهائي 2025/26 · س4 أ، ب · 12 درجة'],
      en: 'The <b>5 × 5, 8-bit grey</b> image goes through a lossy (a) or lossless (b) scheme with a final size of <b>0.001 KB</b>. The compression ratio?',
      ar: 'الصورة ' + b('5 × 5') + ' <b>grey</b> بـ ' + b('8 bits') + '، اتضغطت lossy في (أ) أو lossless في (ب) لحجم نهائي ' + b('0.001 KB') + '. الـ CR كام؟',
      f: crF(25, 1.024), work: ['original = 1 B × 5 × 5 = 25 B', 'compressed = 0.001 × 1024 = 1.024 B', 'CR = 1.024 / 25 × 100 = 4.096 % (a and b alike; textbook 25 / 1.024 ≈ 24.41 : 1)'] },
    { tab: ['F 24/25', 'نهائي 24/25'], tag: ['Final 2024/25 · Q3 a, b · 10 marks', 'نهائي 2024/25 · س3 أ، ب · 10 درجات'],
      en: 'The same <b>5 × 5 grey</b> image, compressed (lossy, then lossless) to <b>0.01 KB</b>. The compression ratio?',
      ar: 'نفس الصورة ' + b('5 × 5') + ' الـ grey، اتضغطت (lossy وبعدين lossless) لـ ' + b('0.01 KB') + '. الـ CR كام؟',
      f: crF(25, 10.24), work: ['original = 25 B', 'compressed = 0.01 × 1024 = 10.24 B', 'CR = 10.24 / 25 × 100 = 40.96 % (textbook 25 / 10.24 ≈ 2.44 : 1)'] },
    { tab: ['Ours', 'من عندنا'], ours: true, tag: ['Our variant · fresh numbers', 'مسألة من عندنا · أرقام جديدة'],
      en: 'An <b>8 × 8, 24-bit colour</b> image is compressed to <b>0.05 KB</b>. The compression ratio?',
      ar: 'صورة ' + b('8 × 8') + ' ملوّنة بـ ' + b('24 bits') + '، اتضغطت لـ ' + b('0.05 KB') + '. الـ CR كام؟',
      f: crF(192, 51.2), work: ['original = 3 B × 8 × 8 = 192 B', 'compressed = 0.05 × 1024 = 51.2 B', 'CR = 51.2 / 192 × 100 ≈ 26.67 % (textbook 192 / 51.2 = 3.75 : 1)'] }
  ];

  // P5 · RGB → CMYK: the Final 2025/26 Q3 image (the same image is Final 2024/25 Q2), and our 2 × 2 variant
  const IMG_CMYK = {
    R: [[10, 110, 60, 160], [20, 120, 70, 170], [30, 130, 80, 180], [40, 140, 90, 190], [50, 150, 100, 200]],
    G: [[10, 110, 110, 210], [20, 120, 120, 220], [30, 130, 130, 230], [40, 140, 255, 240], [50, 150, 150, 250]],
    B: [[210, 60, 160, 10], [220, 70, 170, 20], [230, 180, 180, 30], [240, 90, 190, 40], [250, 100, 250, 50]]
  };
  const IMG_OURS = { R: [[51, 153], [255, 0]], G: [[102, 51], [204, 0]], B: [[204, 102], [0, 0]] };

  // P6 · RGB → YIQ / YUV (typed worksheet, no normalising)
  const yF = (r, g, bb, keys) => { const Y = 0.299 * r + 0.587 * g + 0.114 * bb; const all = {
    Y: [['Y = 0.299R + 0.587G + 0.114B', 'الـ Y'], Y], I: [['I = 0.596R − 0.275G − 0.321B', 'الـ I'], 0.596 * r - 0.275 * g - 0.321 * bb], Q: [['Q = 0.212R − 0.528G + 0.311B', 'الـ Q'], 0.212 * r - 0.528 * g + 0.311 * bb],
    U: [['U = B − Y', 'الـ U'], bb - Y], V: [['V = R − Y', 'الـ V'], r - Y], Cb: [['Cb = (B − Y) / 1.772', 'الـ Cb'], (bb - Y) / 1.772], Cr: [['Cr = (R − Y) / 1.402', 'الـ Cr'], (r - Y) / 1.402] };
    return keys.map(k => ({ k, l: [all[k][0][0], all[k][0][1] + ' <bdi dir="ltr">(' + all[k][0][0].split(' = ')[1] + ')</bdi>'], v: all[k][1], tol: 0.011, wide: true, s: (+all[k][1].toFixed(2)).toString(),
      h: [k === 'Y' ? 'Y = 0.299R + 0.587G + 0.114B on the 0–255 values: no normalising for YIQ / YUV.' : k === 'U' || k === 'V' ? 'U = B − Y and V = R − Y: keep the minus sign.' : k === 'Cb' || k === 'Cr' ? 'Cb = (B − Y) / 1.772, Cr = (R − Y) / 1.402.' : 'Use the YIQ row with its signs; 2 decimals are enough.',
        k === 'Y' ? 'الـ Y بنحسبها على القيم من 0 لـ 255 على طول: مفيش normalising في الـ YIQ والـ YUV.' : k === 'U' || k === 'V' ? 'الـ ' + b('U = B − Y') + ' والـ ' + b('V = R − Y') + ': خلّي بالك من الإشارة السالبة.' : k === 'Cb' || k === 'Cr' ? 'الـ ' + b('Cb = (B − Y) / 1.772') + ' والـ ' + b('Cr = (R − Y) / 1.402') + '.' : 'استخدم صف الـ YIQ بإشاراته، ورقمين عشريين كفاية.'] })); };
  const P_YUV = [
    { tab: ['Mid 21/22', 'ميدترم 21/22'], tag: ['Midterm 2021/22 · Q3 a, b (first pixel)', 'ميدترم 2021/22 · س3 أ، ب (أول pixel)'],
      en: 'The first pixel of the image: <b>R = 100, G = 200, B = 250</b>. Transform it to YIQ and to YUV.',
      ar: 'أول pixel في الصورة قيمها ' + b('R = 100, G = 200, B = 250') + '. حوّلها لـ YIQ ولـ YUV.',
      f: yF(100, 200, 250, ['Y', 'I', 'Q', 'U', 'V']), work: ['Y = 29.9 + 117.4 + 28.5 = 175.8', 'I = 59.6 − 55 − 80.25 = −75.65', 'Q = 21.2 − 105.6 + 77.75 = −6.65', 'U = 250 − 175.8 = 74.2 · V = 100 − 175.8 = −75.8'] },
    { tab: ['F 22/23', 'نهائي 22/23'], tag: ['Final 2022/23 T2 · Q2 ii · 5 marks', 'نهائي 2022/23 ت2 · س2 ثانيًا · 5 درجات'],
      en: 'The underlined pixel: <b>R = 30, G = 130, B = 230</b>. Transform it from RGB to YUV.',
      ar: 'الـ pixel اللي تحتها خط قيمها ' + b('R = 30, G = 130, B = 230') + '. حوّلها من RGB لـ YUV.',
      f: yF(30, 130, 230, ['Y', 'U', 'V']), work: ['Y = 8.97 + 76.31 + 26.22 = 111.5', 'U = 230 − 111.5 = 118.5', 'V = 30 − 111.5 = −81.5'] },
    { tab: ['Ours', 'من عندنا'], ours: true, tag: ['Our variant · with YCbCr (JPEG)', 'مسألة من عندنا · ومعاها YCbCr'],
      en: 'The pixel <b>R = 60, G = 120, B = 180</b>. Find Y, I, Q, U, V, and the JPEG model\'s Cb and Cr.',
      ar: 'الـ pixel قيمها ' + b('R = 60, G = 120, B = 180') + '. هات الـ Y والـ I والـ Q والـ U والـ V، والـ Cb والـ Cr بتوع الـ JPEG.',
      f: yF(60, 120, 180, ['Y', 'I', 'Q', 'U', 'V', 'Cb', 'Cr']), work: ['Y = 17.94 + 70.44 + 20.52 = 108.9', 'I = 35.76 − 33 − 57.78 = −55.02 · Q = 12.72 − 63.36 + 55.98 = 5.34', 'U = 71.1 · V = −48.9', 'Cb = 71.1 / 1.772 ≈ 40.12 · Cr = −48.9 / 1.402 ≈ −34.88'] }
  ];

  // P7 · MSE / MAE
  const P_ERR = [
    { tab: ['F 20/21', 'نهائي 20/21'], tag: ['Final 2020/21 · Q4 a · lossy, 4 × 4', 'نهائي 2020/21 · س4 أ · lossy و 4 × 4'],
      I: [[10, 50, 90, 130], [20, 60, 100, 140], [30, 70, 110, 150], [40, 80, 120, 160]], R: [[170, 210, 250, 40], [180, 220, 10, 50], [190, 230, 20, 60], [200, 240, 30, 70]] },
    { tab: ['F 21/22', 'نهائي 21/22'], tag: ['Final 2021/22 T1 · Q4 a · lossy, 4 × 4', 'نهائي 2021/22 ت1 · س4 أ · lossy و 4 × 4'],
      I: [[255, 78, 87, 77], [255, 15, 54, 77], [25, 255, 47, 87], [60, 90, 57, 58]], R: [[15, 78, 87, 77], [255, 15, 54, 255], [25, 10, 255, 53], [100, 48, 255, 58]] },
    { tab: ['Ours', 'من عندنا'], ours: true, mae: true, tag: ['Our variant · MSE and MAE, 3 × 3', 'مسألة من عندنا · MSE و MAE و 3 × 3'],
      I: [[12, 40, 7], [100, 55, 0], [30, 30, 90]], R: [[10, 44, 7], [97, 55, 5], [30, 36, 90]] }
  ];

  // P8 · the written "why" questions
  const P_WHY = [
    { tab: ['CD 44.1', 'الـ CD'], tag: ['Finals 2024/25, 2023/24, 2021/22 T2', 'نهائي 2024/25 و2023/24 و2021/22 ت2'], q: 'Why is the CD sample rate 44.1 kHz?',
      pts: [['Human hearing reaches about 20 to 22 kHz.', 'ودن الإنسان بتسمع لحد حوالي ' + b('20–22 kHz') + '.', true],
        ['Nyquist: fs must be at least twice the highest frequency in the signal.', 'الـ Nyquist بيقول إن الـ fs لازم تبقى على الأقل ضعف أعلى frequency.', true],
        ['So fs = 2 × 22.05 kHz = 44.1 kHz captures every audible frequency without aliasing.', 'يبقى ' + b('fs = 2 × 22.05 kHz = 44.1 kHz') + ' بتلقط كل الـ frequencies المسموعة من غير aliasing.', true],
        ['Because 44.1 kHz is the Nyquist frequency of a CD.', 'عشان الـ ' + b('44.1 kHz') + ' هي الـ Nyquist frequency بتاعة الـ CD.', false],
        ['Because a higher sampling rate always improves the sound.', 'عشان الـ sampling rate الأعلى دايمًا بيحسّن الصوت.', false]],
      model: ['<b>Model answer:</b> hearing reaches about 20–22 kHz and Nyquist needs fs ≥ 2·fmax, so 2 × 22.05 = 44.1 kHz captures all audible sound without aliasing.',
        '<b>الإجابة النموذجية:</b> الودن بتسمع لحد حوالي ' + b('20–22 kHz') + '، والـ Nyquist عايز ' + b('fs ≥ 2·fmax') + '، فالـ ' + b('44.1 kHz') + ' بتلقط كل الصوت المسموع من غير aliasing.'] },
    { tab: ['CMYK', 'CMYK'], tag: ['Finals 2024/25, 2023/24, 2021/22 T2', 'نهائي 2024/25 و2023/24 و2021/22 ت2'], q: 'Why is CMYK commonly used in colour printing?',
      pts: [['Printing is subtractive: inks absorb (subtract) light and reflect the rest.', 'الطباعة subtractive: الأحبار بتمتص (بتطرح) الضوء وبتعكس الباقي.', true],
        ['C, M, Y are the subtractive primaries: C = 1 − R, M = 1 − G, Y = 1 − B.', 'الـ C والـ M والـ Y هما الـ subtractive primaries، يعني:<span class="ltr">C = 1 − R, M = 1 − G, Y = 1 − B</span>', true],
        ['Mixing C, M and Y never gives a true black (and wastes ink), so a black ink K is added.', 'خلط الـ C والـ M والـ Y عمره ما بيدّي أسود حقيقي (وبيضيّع حبر)، فبنزوّد حبر أسود K.', true],
        ['CMYK files are smaller than RGB files.', 'ملفات الـ CMYK أصغر من الـ RGB.', false],
        ['CMYK separates luminance from chrominance, like JPEG does.', 'الـ CMYK بيفصل الـ luminance عن الـ chrominance زي الـ JPEG.', false]],
      model: ['<b>Model answer:</b> printing is subtractive, so it uses C, M, Y (the complements of RGB, which is additive, for screens). C + M + Y is never a true black and wastes ink, so K is added.',
        '<b>الإجابة النموذجية:</b> الطباعة subtractive، فبتستخدم الـ C والـ M والـ Y (عكس الـ RGB اللي معمول للشاشات). وخلطهم مبيدّيش أسود حقيقي وبيضيّع حبر، فبنزوّد الـ K.'] },
    { tab: ['JPEG', 'JPEG'], tag: ['Final 2023/24 · Q1c', 'نهائي 2023/24 · س1ج'], q: 'What is the colour model that is used by the JPEG?',
      pts: [['YCbCr (YCrCb).', 'الـ YCbCr (أو YCrCb).', true],
        ['Y = 0.299R + 0.587G + 0.114B is the luminance; Cb and Cr are the chrominance.', 'الـ Y هي الـ luminance، والـ Cb والـ Cr هما الـ chrominance:<span class="ltr">Y = 0.299R + 0.587G + 0.114B</span>', true],
        ['Separating them lets JPEG subsample the chroma: the eye is less sensitive to colour detail.', 'فصلهم بيخلّي الـ JPEG يعمل chroma subsampling: العين أقل حساسية لتفاصيل اللون.', true],
        ['CMYK, because JPEG images are printed.', 'الـ CMYK، عشان صور الـ JPEG بتتطبع.', false],
        ['YIQ, the NTSC model.', 'الـ YIQ بتاع الـ NTSC.', false]],
      model: ['<b>Model answer:</b> YCbCr: Y = 0.299R + 0.587G + 0.114B, Cb = (B − Y)/1.772, Cr = (R − Y)/1.402; the chroma can then be subsampled.',
        '<b>الإجابة النموذجية:</b> الـ YCbCr، والمعادلات:<span class="ltr">Y = 0.299R + 0.587G + 0.114B · Cb = (B − Y)/1.772 · Cr = (R − Y)/1.402</span>وبعدها الـ chroma ممكن يتعمله subsampling.'] },
    { tab: ['Traits', 'الخصائص'], tag: ['Final 2022/23 Summer · Q1a', 'نهائي 2022/23 صيفي · س1أ'], q: 'What are the characteristics of a multimedia system?',
      pts: [['It must be computer controlled.', 'لازم يكون computer controlled.', true], ['It is integrated.', 'لازم يكون integrated.', true], ['The information it handles is represented digitally.', 'المعلومات اللي بيتعامل معاها متمثّلة digitally.', true],
        ['The interface to the final presentation is usually interactive.', 'الـ interface للعرض النهائي غالبًا interactive.', true], ['The information is represented in analog form.', 'المعلومات متمثّلة analog.', false], ['It needs a RAID file system.', 'لازم يكون عنده RAID file system.', false]],
      model: ['<b>Model answer:</b> the four characteristics: computer controlled, integrated, information represented digitally, and an interface to the final presentation that is usually interactive. (RAID is a desirable feature, not a characteristic.)',
        '<b>الإجابة النموذجية:</b> الـ 4 خصائص هي: computer controlled، وintegrated، والمعلومات digital، والـ interface غالبًا interactive. (والـ RAID ده desirable feature مش characteristic.)'] },
    { tab: ['Hurdles', 'التحديات'], tag: ['Final 2022/23 Summer · Q1b · Midterm #1', 'نهائي 2022/23 صيفي · س1ب · ميدترم 1'], q: 'Discuss the challenges for multimedia systems.',
      pts: [['Distributed networks.', 'الـ distributed networks.', true], ['The temporal relationship between data.', 'الـ temporal relationship بين الـ data.', true], ['Rendering different data at the same time, continuously.', 'عرض data مختلفة في نفس الوقت وبشكل مستمر.', true],
        ['Sequencing within the media and synchronisation (inter-media scheduling, e.g. lip sync).', 'الـ sequencing جوه الـ media، والـ synchronisation زي الـ lip sync.', true], ['Being computer controlled.', 'إنه computer controlled.', false]],
      model: ['<b>Model answer:</b> distributed networks, and the temporal relationship between data: rendering together continuously, sequencing within the media, and synchronisation (e.g. lip sync).',
        '<b>الإجابة النموذجية:</b> الـ distributed networks، والـ temporal relationship بين الـ data: العرض مع بعض بشكل مستمر، والـ sequencing، والـ synchronisation زي الـ lip sync.'] }
  ];

  // Final 2025/26 Q2, True (A) / False (B): the site's answers (L4)
  const TF2526 = [
    ['Nyquist frequency is half of the sampling frequency.', 0], ['Aliasing occurs when the sampling frequency is too high.', 1], ['A signal with maximum frequency 1 kHz must be sampled at 2 kHz or higher.', 0],
    ['Sampling at exactly the Nyquist rate guarantees perfect reconstruction.', 1], ['Increasing the sampling frequency always improves sound quality.', 1], ['Oversampling helps reduce aliasing.', 0]
  ];

  // the hot list: topics ranked by how many of the 8 past finals asked them (midterms in the lighter bar); counted from the site's papers
  const HOT = [
    ['Sampling, Nyquist, aliasing', 'الـ Sampling والـ Nyquist والـ aliasing', 'L4', 8, 3],
    ['RGB → CMY / CMYK', 'التحويل من RGB لـ CMYK', 'L8', 5, 1],
    ['MSE / MAE of a reconstruction', 'الـ MSE والـ MAE', 'L8', 5, 0],
    ['"Lossless → same image, error 0"', 'الـ lossless يعني نفس الصورة وerror صفر', 'L8', 5, 0],
    ['Audio and video file size', 'حجم ملف الصوت والـ video', 'L4 L3', 4, 2],
    ['Definitions, characteristics, challenges', 'التعريفات والخصائص والتحديات', 'L1', 3, 2],
    ['YIQ / YUV / the JPEG model', 'الـ YIQ والـ YUV وموديل الـ JPEG', 'L8', 3, 1],
    ['Compression ratio', 'الـ Compression ratio', 'L8', 3, 1],
    ['"Why is the CD rate 44.1 kHz?"', 'ليه الـ CD بـ <bdi dir="ltr">44.1 kHz</bdi>؟', 'L4', 3, 0],
    ['"Why CMYK for printing?"', 'ليه الطباعة بالـ CMYK؟', 'L8', 3, 0],
    ['dB, phase, FIR / IIR, SNR', 'الـ dB والـ phase والـ FIR والـ IIR', 'L2', 3, 1],
    ['Limiting interval from x(t)', 'الـ interval الحدّي من x(t)', 'L4', 2, 1]
  ];
  function Bars() {
    const ar = useAr();
    return html`<div className="hf-mmF-bars hf-in">${HOT.map(([en, a, lec, f, m], i) => html`<div key=${i} className="hf-mmF-bar">
      <span className="l">${ar ? TF(a) : en}<small dir="ltr">${lec}</small></span>
      <span className="b" aria-label=${f + ' of 8 finals, ' + m + ' of 3 midterms'}><i style=${{ width: (f / 8 * 100 * 0.75) + '%', animationDelay: calm() ? '0s' : (0.15 + i * 0.06) + 's' }}></i><i className="m" style=${{ width: (m / 3 * 100 * 0.25) + '%', animationDelay: calm() ? '0s' : (0.3 + i * 0.06) + 's' }}></i></span>
      <span className="c" dir="ltr">${f}/8 · ${m}/3</span></div>`)}</div>`;
  }

  // the four threads that run through the course
  const THREADS = [
    ['The size thread', 'خيط الأحجام', [['L1', '512×512 = ¼ MB'], ['L3', 'W × H × bits'], ['L4', 't × fs × bits × ch'], ['L8', 'CR = comp/orig × 100']]],
    ['The sampling thread', 'خيط الـ sampling', [['L2', 'ω = 2πf'], ['L4', 'fs ≥ 2·fmax'], ['L8', 'wagon wheel']]],
    ['The filter thread', 'خيط الـ filters', [['L2', 'FIR / IIR'], ['L3', 'anti-aliasing'], ['L5', 'subtractive'], ['L7', 'comb filters']]],
    ['The compression thread', 'خيط الـ compression', [['L1', 'lossy / lossless'], ['L6', 'MIDI = synthesis'], ['L8', 'chroma 4:2:0']]]
  ];
  function Threads() {
    const ar = useAr();
    return html`<div className="hf-mmF-thr">${THREADS.map(([en, a, ch], i) => html`<div key=${i} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.1 + i * 0.15) + 's' }}>
      <h5>${ar ? a : en}</h5><div className="chain" dir="ltr">${ch.map(([l, f], j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<i>→</i>`}<span><b>${l}</b>${f}</span></${React.Fragment}>`)}</div></div>`)}</div>`;
  }

  // a lecture's banner: its number, title and how often the finals asked it
  function LecHead({ n, en, ar: a, asked, fin }) {
    const ar = useAr();
    return html`<div className="hf-mmF-lh hf-in"><span className="nn">${n}</span><div><p className="k">${ar ? 'محاضرة ' + n : 'Lecture ' + n}</p><h3 className="hf-h2">${ar ? a : en}</h3>
      <p className=${'q' + (fin ? '' : ' none')}>${TF(ar ? asked[1] : asked[0])}</p></div></div>`;
  }

  // a method / formula card: rows are ['f', formula] or ['s', en, ar]
  function Meth({ h, rows }) {
    const ar = useAr();
    return html`<div className="hf-mmF-meth hf-in">${h && html`<h5>${ar ? h[1] : h[0]}</h5>`}${rows.map((r, i) => r[0] === 'f' ? html`<div key=${i} className="f">${r[1]}</div>` : html`<p key=${i} className="s">${TF(ar ? r[2] : r[1])}</p>`)}</div>`;
  }

  if (!document.getElementById('hf-css-mmF2')) {
    const s = document.createElement('style'); s.id = 'hf-css-mmF2';
    s.textContent = `
.hfb .hf-mmF-lh{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:10px; align-items:end; border-bottom:3px solid var(--hf-line); padding-bottom:5px; }
.hfb .hf-mmF-lh .nn{ font:800 58px/0.8 var(--body); letter-spacing:-.05em; color:transparent; -webkit-text-stroke:2px var(--hf-k); }
.hfb .hf-mmF-lh .k{ margin:0; font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.16em; color:var(--graphite); }
.hfb .hf-mmF-lh .q{ margin:3px 0 0; font:700 13px/1.25 var(--body); color:var(--hf-k); }
.hfb .hf-mmF-lh .q.none{ color:var(--graphite); }
.hf-ar .hf-mmF-lh .k, .hf-ar .hf-mmF-lh .q{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; line-height:1.4; }
`;
    document.head.appendChild(s);
  }

  H.chapters.mm.final = {
    title: 'Every Sample, Every Pixel', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'كل sample وكل pixel', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T, Reveal } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => (A ? ar : en);
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' questions come from any lecture: quiz items with src; the Arabic why from AR.mm.lectures[n].quiz[i]
      const ARL = (window.AR && window.AR.mm && window.AR.mm.lectures) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const findQ = (re, own, n) => { for (const l of kit.course.lectures) { if (n && l.n !== n) continue; const i = l.quiz.findIndex(x => (own ? !!x.src : !x.src) && re.test(strip(x.q))); if (i >= 0) return { q: l.quiz[i], why: ((ARL[l.n] || {}).quiz || [])[i] }; } return {}; };
      const mq = (id, re) => { const r = findQ(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, n, re) => { const r = findQ(re, false, n); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const S = (en, ar) => html`<p className="hf-p small hf-in">${X(en, ar)}</p>`;
      const LECS = [[1, 'Introduction', 'المقدمة'], [2, 'DSP, filters, Fourier', 'الـ DSP والـ filters'], [3, 'Data basics', 'أساسيات الـ data'], [4, 'Sampling & file size', 'الـ Sampling وحجم الملف'],
        [5, 'Audio synthesis', 'الـ Synthesis'], [6, 'MIDI & MPEG-4', 'الـ MIDI والـ MPEG-4'], [7, 'Audio effects', 'الـ Audio effects'], [8, 'Images, colour, video', 'الصور والألوان والـ video']];
      const NONE = ['No past paper asked it yet: likely questions', 'مفيش امتحان سأل منها لسه: أسئلة متوقعة'];
      return [
        // 0 · how to use this book + self-rating
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تستخدم الكتاب ده')}</${H2}>
          <div className="hf-howto hf-in">
            <div className="row"><span className="mk">1</span><span>${X('<b>Rate yourself</b> below, one tap per lecture. Shaky ones first.', '<b>قيّم نفسك</b> تحت، دوسة لكل محاضرة، وابدأ بالمهزوز.')}</span></div>
            <div className="row"><span className="mk">2</span><span>${X('<b>Read the map and the anatomy of the final</b>: know where the marks are.', '<b>اقرا الخريطة وتشريح الامتحان</b>: اعرف الدرجات فين.')}</span></div>
            <div className="row"><span className="mk">3</span><span>${X('<b>Go lecture by lecture</b>, then <b>do every worked problem</b> yourself: Check first, Show only after.', '<b>امشي محاضرة محاضرة</b>، وبعدين <b>حل كل مسألة بنفسك</b>: صحّح الأول، واعرض الحل بعدين.')}</span></div>
            <div className="row"><span className="mk">4</span><span>${X('<b>Finish</b> with the exam corner, exam day and the bullet points, then take the mock final.', '<b>اختم</b> بركن الامتحان ويوم الامتحان والخلاصة، وبعدين ادخل الامتحان التجريبي.')}</span></div>
          </div>
          <${H3}>${t('How ready am I?', 'أنا جاهز قد إيه؟')}</${H3}>
          <${Rate} lecs=${LECS} />
        `, { sec: t('How to use this book', 'إزاي تستخدم الكتاب') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">★</span><span className="t">${A ? html`المراجعة النهائية<br/>Multimedia` : html`Final revision<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Every Sample, Every Pixel', 'كل sample وكل pixel')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('8 lectures, 11 past papers, one sitting', 'فيه 8 محاضرات، و11 امتحان قديم، في قعدة واحدة')}</p></div>
          <${Talk} who="dev">${t('The final is in a few days. Eight lectures. Where do I even start?', 'الامتحان كمان كام يوم، و8 محاضرات. أبدأ منين أصلًا؟')}</${Talk}>
          <${Talk} who="mic" flip=${true}>${t('With me. Every one of the 8 past finals asked about sampling. Every single one.', 'مني أنا. كل امتحان من الـ 8 امتحانات اللي فاتت سأل عن الـ sampling. كلهم.')}</${Talk}>
          <${Talk} who="cam">${t('And with my colours: 5 of the 8 made you turn an RGB image into CMYK by hand.', 'ومن ألواني: 5 من الـ 8 خلّوك تحوّل صورة RGB لـ CMYK بإيدك.')}</${Talk}>
          <${P} small=${true}>${X('This book is built around <b>what the final actually asks</b>. Every number in it was checked twice.', 'الكتاب ده مبني على <b>اللي الامتحان بيسأله فعلًا</b>، وكل رقم فيه اتراجع مرتين.')}</${P}>
        `),

        // 2 · the course map
        page(html`
          <${H2}>${t('The whole course on one line', 'الكورس كله على خط واحد')}</${H2}>
          ${S('Tap a stop: it opens what you must be able to <b>do</b> there, and which lectures it feeds.', 'دوس على أي محطة: هتفتحلك لازم <b>تعرف تعمل</b> إيه فيها، وبتغذّي أنهي محاضرات.')}
          <${MetroMap} />
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // 3 · the threads
        page(html`
          <${H2}>${t('Four threads run through it', 'أربع خيوط ماشية في الكورس كله')}</${H2}>
          <${Threads} />
          <${Box} kind="brain"><${P} small=${true}>${X('Which threads carry most of the written marks?', 'أنهي خيوط شايلة أغلب درجات المسائل؟')}</${P}>
            <${Reveal} id="thr"><${P} small=${true}>${X('<b>Sampling</b> (all 8 finals) and <b>size</b> (file sizes in 4, CR in 3), plus Lecture 8\'s colour conversions (CMYK in 5).', 'الـ <b>sampling</b> (في الـ 8 امتحانات) والـ <b>أحجام</b> (حجم ملفات في 4 والـ CR في 3)، وكمان تحويلات الألوان بتاعة محاضرة 8 (الـ CMYK في 5).')}</${P}></${Reveal}></${Box}>
        `),

        // 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الامتحان النهائي')}</${H2}>
          ${S('Every past final: <b>2 hours</b>, 50 to 75 marks, short items first, then <b>written calculations</b>.', 'كل امتحان نهائي فات: <b>ساعتين</b>، ومن 50 لـ 75 درجة، أسئلة قصيرة الأول وبعدين <b>مسائل حسابية</b>.')}
          <table className="hf-mmF-tab hf-in"><thead><tr><th style=${{ width: '21%' }}>${t('Final', 'الامتحان')}</th><th style=${{ width: '16%' }}>${t('Marks', 'الدرجة')}</th><th>${t('What it asked', 'سأل في إيه')}</th></tr></thead><tbody>
            ${(A ? [
              ['25/26', '', '60', 'الـ MCQ والصح والغلط عن الـ sampling، والـ CMYK، والـ CR والـ lossless', 1],
              ['24/25', '', '50', 'ليه 44.1 وليه CMYK، والـ CMYK، والـ CR والـ lossless'],
              ['23/24', '', '75', 'تلات أسئلة "ليه"، وحجم video، والـ CMYK وحجمها'],
              ['22/23', 'ت2', '50', 'الـ intervals وحجم video والـ CR، والـ YUV، والـ MSE'],
              ['22/23', 'صيفي', '50', 'الخصائص والتحديات، وملف speech، والـ MAE والـ MSE'],
              ['21/22', 'ت2', '50', 'الـ x(t) وحجم ملف، والـ YIQ والـ CMYK، والـ MSE، و"ليه"'],
              ['21/22', 'ت1', '50', 'الـ MCQ والصح والغلط، والـ entropy ‡، والـ MSE، والـ RLE ‡'],
              ['20/21', '', '75', 'الـ MCQ والصح والغلط، والـ x(t) والـ CMYK، والـ PSNR ‡، والـ MSE']
            ] : [
              ['25/26', '', '60', 'MCQ + T/F on sampling, CMYK 16, CR + lossless 24', 1],
              ['24/25', '', '50', 'why 44.1 + why CMYK, CMYK 20, CR + lossless 20'],
              ['23/24', '', '75', 'three "why"s, video size 30, CMYK + its size'],
              ['22/23', 'T2', '50', 'intervals, video size, CR; YUV pixel; MSE in CMY'],
              ['22/23', 'Sum.', '50', 'characteristics + challenges, speech file, MAE + MSE'],
              ['21/22', 'T2', '50', 'x(t) + file size, YIQ + CMYK, MSE + MAE, two "why"s'],
              ['21/22', 'T1', '50', 'MCQ, T/F, entropy ‡, MSE + SNR, RLE ‡'],
              ['20/21', '', '75', 'MCQ, T/F, x(t) + CMYK, PSNR ‡, 1-D MSE + MAE']
            ]).map((r, i) => html`<tr key=${i} className=${r[4] ? 'hi' : ''}><td className="n"><bdi dir="ltr">${r[0]}</bdi>${r[1] && html`<br/><small>${r[1]}</small>`}</td><td className="n">${r[2]}</td><td>${r[3]}</td></tr>`)}
          </tbody></table>
          <${P} small=${true}>${X('‡ entropy, RLE and PSNR are old syllabus, not in the current notes.', '‡ الـ entropy والـ RLE والـ PSNR من المنهج القديم، ومش في الـ notes.')}</${P}>
        `, { sec: t('Anatomy of the final', 'تشريح الامتحان') }),

        // 5 · the hot list
        page(html`
          <${H2}>${t('The hot list', 'قايمة الـ hot topics')}</${H2}>
          ${S('Topics ranked by how many of the <b>8 finals</b> asked them (dark bar); the light bar counts the <b>3 midterms</b>. We counted them from the papers.', 'المواضيع مترتبة بعدد <b>الامتحانات النهائية</b> اللي سألت فيها من 8 (الشريط الغامق)، والفاتح بيعد <b>الـ 3 ميدترم</b>. عدّيناهم من الامتحانات نفسها.')}
          <${Bars} />
          <${Hand}>${t('What repeats: the two latest finals are near twins (the same CMYK image, the same 5 × 5 CR image with a new KB).', 'اللي بيتكرر: آخر امتحانين تقريبًا توأم (نفس صورة الـ CMYK، ونفس صورة الـ CR مع رقم KB جديد).')}</${Hand}>
        `),

        // ── Lecture 1 ──
        // 6 · must know
        page(html`
          <${LecHead} n=${1} en="Introduction to Multimedia" ar="مقدمة الـ Multimedia" fin=${true} asked=${['In 3 of 8 finals, both midterms that ask theory', 'في 3 من 8 امتحانات نهائية، ومتعودة في الميدترم']} />
          <${Def}>${X('<b>Multimedia</b>: computer information represented through <b>audio, video and animation</b> in addition to traditional media (text, graphics, images).', 'الـ <b>Multimedia</b>: معلومات الكمبيوتر متمثّلة بـ <b>audio وvideo وanimation</b> زيادة على الـ media التقليدية (text وgraphics وimages).')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b>application</b> بيستخدم مجموعة media sources، والـ <b>system</b> بيعالج الـ multimedia data (processing وstorage وgeneration وmanipulation وrendition).',
            'الـ <b>4 خصائص</b>: computer controlled، وintegrated، والمعلومات digital، والـ interface غالبًا interactive.',
            'الـ <b>Challenges</b>: الـ distributed networks والـ temporal relationship (عرض مع بعض، والـ sequencing، والـ synchronisation زي الـ lip sync).',
            'الـ <b>Hypertext</b> (اخترعه Ted Nelson حوالي 1965) قرايته non‑linear، والـ <b>hypermedia</b> مش text بس، زي الـ WWW والـ PowerPoint.',
            'الـ <b>Lossless</b> زي zip، والـ <b>lossy</b> زي MP3 وJPEG وMPEG، والـ <b>compression via synthesis</b> زي MIDI.'
          ] : [
            '<b>Application</b>: uses a collection of media sources. <b>System</b>: processes multimedia data (processing, storage, generation, manipulation, rendition).',
            '<b>4 characteristics</b>: computer controlled, integrated, digital, usually interactive.',
            '<b>Challenges</b>: distributed networks; temporal relationship (render together, sequencing, synchronisation e.g. lip sync).',
            '<b>Hypertext</b> (Ted Nelson, about 1965) is read non-linearly; <b>hypermedia</b> is not only text: WWW, PowerPoint, Acrobat, Flash.',
            '<b>Lossless</b> (zip), <b>lossy</b> (MP3, JPEG, MPEG), <b>compression via synthesis</b> (MIDI, vector graphics).'
          ]} />
        `, { sec: t('L1 Introduction', 'محاضرة 1: المقدمة') }),

        // 7 · figure
        page(html`
          <${H2}>${t('Lossy or lossless?', 'الـ Lossy ولا الـ lossless؟')}</${H2}>
          <${Fig} name="mm-lossy-lossless" />
        `),

        // 8 · trap + sort
        page(html`
          <${Box} kind="watch"><${P} small=${true}>${X('"MPEG video compression is lossless" → <b>False</b> (Final 2021/22 T1). And "analog" is never one of the 4 characteristics.',
            'جملة "MPEG lossless" <b>غلط</b> (نهائي 2021/22 ت1). والـ "analog" عمرها ما كانت من الـ 4 خصائص.')}</${P}></${Box}>
          <${Box} kind="pencil" title=${t('Sort them', 'صنّفهم')}>
            ${S('<b>L</b> = lossless · <b>Y</b> = lossy · <b>S</b> = compression via synthesis', 'الـ <b>L</b> يعني lossless، والـ <b>Y</b> يعني lossy، والـ <b>S</b> يعني compression via synthesis.')}
            <${Sort} id="s-l1" bins=${[['L', 'lossless'], ['Y', 'lossy'], ['S', 'via synthesis']]} items=${[['zip', 0], ['MP3', 1], ['MIDI', 2], ['MPEG video', 1], [t('vector graphics (Flash)', 'الـ vector graphics (Flash)'), 2], [t('GIF (LZW, L8)', 'الـ GIF (LZW، محاضرة 8)'), 0]]} />
          </${Box}>
        `),

        // ── Lecture 2 ──
        // 9 · must know
        page(html`
          <${LecHead} n=${2} en="DSP, Filters and Fourier" ar="الـ DSP والـ Filters والـ Fourier" fin=${true} asked=${['In 3 of 8 finals: dB, phase, FIR / IIR, SNR', 'في 3 من 8: الـ dB والـ phase والـ FIR والـ IIR']} />
          <${Meth} rows=${[
            ['f', 'T = 1/f · z(t) = a·sin(ωt + φ), ω = 2πf'],
            ['s', 'Amplitude, frequency, <b>phase</b> (the initial angle at the origin). A cosine is a sine 90° out of phase.', 'الـ amplitude والـ frequency والـ <b>phase</b> (الزاوية الابتدائية عند نقطة الأصل). والـ cos هو sine متزحلق <bdi dir="ltr">90°</bdi>.'],
            ['f', 'dB = 10·log10(P/P0) · 20·log10(A/A0)'],
            ['s', 'Power uses 10, amplitude 20. The reference is <b>0 dB</b>; the ear: 0 dB perception, <b>120 dB pain</b>; 6 dB per bit (16-bit ≈ 90 dB).', 'الـ power بـ 10 والـ amplitude بـ 20. الـ reference هو <b><bdi dir="ltr">0 dB</bdi></b>، والودن: <bdi dir="ltr">0 dB</bdi> بداية السمع و<b><bdi dir="ltr">120 dB</bdi> الألم</b>، و<bdi dir="ltr">6 dB</bdi> لكل bit.'],
            ['f', 'SNR = Ps/Pn = (As/An)²'],
            ['s', '<b>FIR</b>: no feedback, N − 1 feed-forward delays, finite impulse response. <b>IIR</b>: output fed back, the response never quite reaches 0.', 'الـ <b>FIR</b> مفيهوش feedback، وفيه <bdi dir="ltr">N − 1</bdi> feed‑forward delays. الـ <b>IIR</b> الـ output بيرجع تاني، والـ response عمره ما يوصل صفر بالظبط.'],
            ['f', 'DFT bin: fk = k·fs/N · FT(f * g) = F·G'],
            ['s', 'A low-pass filter removes noise but also blurs edges (edges are high frequencies too).', 'الـ low‑pass بيشيل الـ noise بس بيعمل blur للـ edges كمان (الـ edges برضه high frequencies).']
          ]} />
        `, { sec: t('L2 DSP and filters', 'محاضرة 2: الـ DSP') }),

        // 10 · figure
        page(html`
          <${H2}>${t('Trace a filter by hand', 'تتبّع filter بإيدك')}</${H2}>
          <${Fig} name="mm-sfg-run" />
        `),

        // 11 · trap + 10 or 20
        page(html`
          <${Box} kind="watch"><${P} small=${true}>${X('"……… is the offset from the origin where the waveform intersects the <b>x-axis</b>" → <b>Phase</b>; the same with the <b>y-axis</b> → <b>None of the above</b>. Reading a phase: take the constant in the bracket, 0.2π = 36° (Midterm 2021/22).',
            'سؤال "الـ offset من نقطة الأصل اللي الموجة بتقطع فيها الـ <b>x‑axis</b>" إجابته <b>Phase</b>، ونفس السؤال بالـ <b>y‑axis</b> إجابته <b>None of the above</b>. وعشان تقرا الـ phase خُد الثابت اللي جوه القوس، يعني <bdi dir="ltr">0.2π = 36°</bdi> (ميدترم 2021/22).')}</${P}></${Box}>
          <${Stepper} id="st-db" probs=${[{ tab: ['dB', 'dB'], tag: ['Quick check · 10 or 20?', 'مراجعة سريعة · 10 ولا 20؟'], ours: true,
            en: 'Power uses <b>10·log10</b>, amplitude uses <b>20·log10</b>. Four quick ones from the notes.', ar: 'الـ power بـ ' + b('10·log10') + '، والـ amplitude بـ ' + b('20·log10') + '. أربعة سريعين من الـ notes.',
            steps: [
              { l: ['A power ratio of 100?', 'نسبة power قدها 100؟'], c: '10·log10(100) = ?', o: ['20 dB', '40 dB', '100 dB'], a: 0, w: 'power 100 → 10·log10(100) = 20 dB', h: [null, ['40 dB is for an amplitude ratio of 100 (20·log).', 'الـ ' + b('40 dB') + ' دي لنسبة amplitude قدها 100.'], ['dB is a log scale.', 'الـ dB مقياس log.']] },
              { l: ['An amplitude ratio of 100?', 'نسبة amplitude قدها 100؟'], c: '20·log10(100) = ?', o: ['20 dB', '40 dB'], a: 1, w: 'amplitude 100 → 20·log10(100) = 40 dB', h: [['Amplitude uses 20·log10.', 'الـ amplitude بـ ' + b('20·log10') + '.'], null] },
              { l: ['A power ratio of 2?', 'نسبة power قدها 2؟'], c: '10·log10(2) = ?', o: ['≈ 3 dB', '≈ 6 dB', '2 dB'], a: 0, w: 'power 2 → ≈ 3 dB', h: [null, ['6 dB doubles an amplitude, not a power.', 'الـ ' + b('6 dB') + ' دي لمضاعفة الـ amplitude مش الـ power.'], ['Take the log: 10·log10(2) ≈ 3.01.', 'خد الـ log الأول.']] },
              { l: ['The ear\'s max/min power ratio ≈ 10¹²?', 'نسبة الـ power في الودن حوالي 10¹²؟'], c: '10·log10(10¹²) = ?', o: ['12 dB', '120 dB', '240 dB'], a: 1, w: '10¹² → 120 dB = the threshold of pain', h: [['Times 10: 10 × 12.', 'اضرب في 10.'], null, ['That uses 20·log. This is a power ratio.', 'ده استخدم ' + b('20·log') + '، ودي نسبة power.']] }
            ], done: ['<b>20, 40, 3 and 120 dB.</b> "dB reference" → 0 dB, never 10 or 60.', 'الإجابات ' + b('<b>20, 40, 3, 120 dB</b>') + '. والـ reference هو ' + b('0 dB') + '، مش 10 ولا 60.'] }]} />
        `),

        // 12 · quick check
        page(html`
          <${Box} kind="exam" title=${t('Quick check, from the papers', 'مراجعة سريعة من الامتحانات')}>
            ${mq('m-l2a', /some -+ dB reference\./)}
            <${Gap} h=${8} />
            ${mq('m-l2b', /In FIR systems there is no feedback/)}
          </${Box}>
        `),

        // ── Lecture 3 ──
        // 13 · must know
        page(html`
          <${LecHead} n=${3} en="Multimedia Data Basics" ar="أساسيات الـ Multimedia Data" asked=${NONE} />
          <div className="hf-mmF-two hf-in">
            <div><b>${t('Static (discrete)', 'الـ Static')}</b>${t('time independent: text, single images, graphics', 'مش معتمدة على الوقت: text وصورة واحدة وgraphics')}</div>
            <div><b>${t('Continuous', 'الـ Continuous')}</b>${t('time dependent: video, audio, and animation (trap)', 'معتمدة على الوقت: video وaudio، والـ animation كمان (فخ)')}</div>
          </div>
          <${UL} items=${A ? [
            'الـ <b>Transducers</b> بتحوّل اللي بتحسّه لـ electrical signal: الـ thermocouple للحرارة، والـ microphone للصوت، والكاميرا للضوء.',
            'الـ <b>ADC</b> بيعمل sampling (discrete في الوقت) وquantisation (discrete في القيم)، زي الـ sound card، والـ <b>DAC</b> بيعمل العكس للسماعة أو الشاشة.',
            'الـ <b>Pipeline</b> بيبدأ بـ analog conditioning ثم ADC ثم digital processing ثم DAC ثم analog conditioning. والـ <b>anti‑aliasing filter</b> عند الـ input، والـ low‑pass عند الـ output.',
            'الأحجام: الـ text بـ byte لكل حرف، والـ graphics primitives صغيرة وبتتعدل، والصورة <bdi dir="ltr">W × H × bits / 8</bdi>.',
            'الـ Video صور بـ 25 أو 30 fps، والـ HD حوالي 9 GB في الدقيقة.'
          ] : [
            '<b>Transducers</b> turn what they sense into electrical signals: thermocouple (heat), microphone (sound), camera (light).',
            '<b>ADC</b> = sampling (discrete in time) + quantisation (discrete values), e.g. a sound card; the <b>DAC</b> is the converse, for speakers or monitors.',
            '<b>Pipeline</b>: analog conditioning → ADC → digital processing → DAC → analog conditioning. The <b>anti-aliasing filter</b> is at the input; a low-pass filter at the output.',
            'Sizes: text 1 byte per character; graphics are primitives (small, editable); images W × H × bits / 8.',
            'Video = images at 25 or 30 fps; HD ≈ 9 GB per minute.'
          ]} />
        `, { sec: t('L3 Data basics', 'محاضرة 3: الـ data') }),

        // 14 · figure
        page(html`
          <${H2}>${t('The A-D-A pipeline', 'الـ pipeline من analog لـ digital ولـ analog')}</${H2}>
          <${Fig} name="mm-l3-pipeline" />
        `),

        // 15 · trap + practice sort
        page(html`
          <${Box} kind="watch"><${P} small=${true}>${X('No paper asked Lecture 3 by itself, but <b>every video problem uses its rule</b>: frame = W × H × bits (grey 8, colour 24). And animation is <b>continuous</b> media.',
            'مفيش امتحان سأل من محاضرة 3 لوحدها، بس <b>كل مسألة video بتستخدم قاعدتها</b>: الـ frame هو <bdi dir="ltr">W × H × bits</bdi> (الـ grey بـ 8 والملوّن بـ 24). والـ animation تعتبر <b>continuous</b> media.')}</${P}></${Box}>
          <${Box} kind="pencil" title=${t('Practice: static or continuous?', 'تدريب: static ولا continuous؟')}>
            <${Sort} id="s-l3" bins=${[['S', 'static'], ['C', 'continuous']]} items=${[[t('text', 'الـ text'), 0], [t('a single image', 'صورة واحدة'), 0], [t('graphics', 'الـ graphics'), 0], [t('audio', 'الـ audio'), 1], [t('video', 'الـ video'), 1], [t('animation (Flash tweening)', 'الـ animation (Flash tweening)'), 1]]} />
          </${Box}>
        `),

        // ── Lecture 4 ──
        // 16 · must know
        page(html`
          <${LecHead} n=${4} en="Sampling, Nyquist and File Size" ar="الـ Sampling والـ Nyquist وحجم الملف" fin=${true} asked=${['In all 8 finals and all 3 midterms: the exam\'s favourite', 'في الـ 8 امتحانات النهائية والـ 3 ميدترم: حبيبة الامتحان']} />
          <${UL} items=${A ? [
            'الـ <b>Sampling</b> إننا نقيس الإشارة على فترات منتظمة <b>T</b>، والـ ' + b('fs = 1/T') + ' بالـ <b>Hz</b>، يعني samples في الثانية.',
            'الـ rates: الـ telephone بـ 8 kHz، والـ speech بـ 11.025، والـ low‑grade بـ 22.05، والـ CD بـ <b>44.1 kHz</b>.',
            'الـ <b>Quantisation</b> هي الـ bit size: عدد الـ levels هو ' + b('2^bits') + '، والـ 8‑bit من 0 لـ 255، والـ SNR للـ 16‑bit حوالي 98 dB وللـ 8‑bit حوالي 50 dB.',
            'قاعدة الـ <b>Nyquist</b>: ' + b('fs ≥ 2·fmax') + '. الـ <b>Nyquist rate</b> هو ' + b('2·fmax') + ' (أقل fs)، والـ <b>Nyquist frequency</b> هي ' + b('fs/2') + '.',
            'الـ <b>Undersampling</b> بيعمل aliasing (frequency وهمية أوطى)، والـ <b>oversampling</b> بيقلله بس بيكبّر الـ data، وعشان كده بنحط low‑pass filter قبل الـ ADC.',
            'الـ CD بـ 44.1 kHz عشان الودن بتسمع لحد حوالي 20–22 kHz. والثوابت: الـ music ' + b('44.1 kHz') + '، والـ speech أعلى frequency فيه ' + b('4 kHz') + ' فالـ fs بتاعه ' + b('8 kHz') + '.'
          ] : [
            '<b>Sampling</b>: measure at regular intervals <b>T</b>; fs = 1/T in <b>Hz</b> (samples per second).',
            'Rates: 8 kHz telephone, 11.025 kHz speech, 22.05 kHz low-grade, <b>44.1 kHz CD</b>.',
            '<b>Quantisation</b> = bit size: levels = 2^bits (8-bit: 0–255); SNR 16-bit ≈ 98 dB, 8-bit ≈ 50 dB.',
            '<b>Nyquist</b>: fs ≥ 2·fmax. <b>Nyquist rate</b> = 2·fmax (the minimum fs); <b>Nyquist frequency</b> = fs/2.',
            '<b>Undersampling</b> → aliasing (a false lower frequency). <b>Oversampling</b> reduces it but costs data, so low-pass filter before the ADC.',
            'CD = 44.1 kHz because hearing reaches about 20–22 kHz. Constants: music 44.1 kHz; speech fmax 4 kHz → fs 8 kHz.'
          ]} />
        `, { sec: t('L4 Sampling and file size', 'محاضرة 4: الـ Sampling') }),

        // 17 · the two formulas
        page(html`
          <${H2}>${t('The two formulas worth the most marks', 'المعادلتين اللي شايلين أكتر درجات')}</${H2}>
          <${Meth} h=${['1 · Nyquist', '1 · الـ Nyquist']} rows=${[['f', 'fs ≥ 2·fmax  →  T = 1/fs'], ['f', 'cos(2πf·t): f = (coefficient of t) / 2π'],
            ['s', 'From x(t): divide each coefficient of πt by 2, take the <b>highest</b>, double it, invert it. Amplitudes never matter (if non-zero).', 'من الـ x(t): اقسم كل معامل πt على 2، وخُد <b>الأعلى</b>، واضربه في 2، واقلبه. والـ amplitudes ملهاش دعوة (طالما مش صفر).']]} />
          <${Meth} h=${['2 · Audio file size', '2 · حجم ملف الصوت']} rows=${[['f', 'Size (bits) = t × fs × bits × channels'], ['f', '÷ 8 → bytes · ÷ 1024 → KB · ÷ 1024 → MB'],
            ['s', 'Time in <b>seconds</b>; mono 1, stereo 2; interval given → fs = 1/T; nothing given → speech 8 kHz, music 44.1 kHz.', 'الوقت <b>بالثواني</b>، والـ mono بـ 1 والـ stereo بـ 2. لو الـ interval مكتوب يبقى ' + b('fs = 1/T') + '، ولو مفيش حاجة: الـ speech ' + b('8 kHz') + ' والـ music ' + b('44.1 kHz') + '.']]} />
          <${Talk} who="mic">${t('Notes\' Ex 2: T = 0.000125 s, 16-bit, stereo, 4.5 min → 8000 × 16 × 270 × 2 = 69,120,000 bits = 8437.5 KB.', 'مثال الـ notes: الـ T = 0.000125 s، و16‑bit، وstereo، و4.5 دقيقة، يبقى 69,120,000 bits يعني 8437.5 KB.')}</${Talk}>
        `),

        // 18 · figure
        page(html`
          <${H2}>${t('Aliasing: too few samples', 'الـ Aliasing لما الـ samples تقل')}</${H2}>
          <${Fig} name="mm-alias-panels" />
        `),

        // 19 · the 2025/26 T/F as a sort
        page(html`
          <${Box} kind="pencil" title=${t('Final 2025/26, Question Two', 'نهائي 2025/26، السؤال التاني')}>
            ${S('The real True/False section (10 marks). Sort 6 of its statements.', 'ده قسم الصح والغلط الحقيقي (10 درجات). صنّف 6 من جمله.')}
            <${Sort} id="s-tf" bins=${[[t('T', 'ص'), t('True', 'صح')], [t('F', 'غ'), t('False', 'غلط')]]} items=${TF2526.map(([s, a]) => [A ? '<bdi dir="ltr">' + s + '</bdi>' : s, a])} />
          </${Box}>
        `),

        // 20 · traps + doctors' questions
        page(html`
          <${Box} kind="watch"><${P} small=${true}>${X('"At <b>most</b> twice" and "twice the <b>lowest</b>" → False. Given only a <b>minimum</b> frequency → <b>None</b>. Quantisation comes <b>after</b> sampling. Telephone speech = 8 kHz, not 16 (Midterm 2026/27).',
            'جملة "على <b>الأكثر</b> الضعف" وجملة "ضعف <b>أوطى</b> frequency" غلط. ولو مدّيك <b>minimum</b> frequency بس تبقى الإجابة <b>None</b>. والـ quantisation بتيجي <b>بعد</b> الـ sampling. والـ telephone بـ <bdi dir="ltr">8 kHz</bdi> مش 16 (ميدترم 2026/27).')}</${P}></${Box}>
          ${mq('m-l4a', /MINIMUM frequency/)}
        `),
        page(html`
          <${Box} kind="exam" title=${t('One more from the papers', 'كمان سؤال من الامتحانات')}>${mq('m-l4b', /Oversampling refers to sampling/)}</${Box}>
          <${Hand}>${t('Oversampling reduces aliasing, but it costs more data.', 'الـ oversampling بيقلل الـ aliasing، بس بيكلّف data أكتر.')}</${Hand}>
        `),

        // ── Lecture 5 ──
        // 21 · must know
        page(html`
          <${LecHead} n=${5} en="Digital Audio Synthesis" ar="الـ Digital Audio Synthesis" asked=${NONE} />
          <${UL} items=${A ? [
            'الـ <b>7 طرق</b>: subtractive وadditive وFM وsample‑based وwavetable وgranular وphysical modelling.',
            'الـ <b>Subtractive</b> بيفلتر source غني، زي sawtooth متفلتر يبقى bowed string. وفي الـ <b>ADSR</b> الـ Sustain ده <b>level</b> مش وقت.',
            'الـ <b>Additive</b>: بتجمع partials (أساسه Fourier)، بس inefficient. والـ square wave فيه odd harmonics بـ amplitudes ' + b('1, 1/3, 1/5') + '.',
            'الـ <b>FM</b> (اكتشفه Chowning ورخّصه لـ Yamaha في الـ DX7): الـ sidebands عند ' + b('fc ± n·fm') + '، والـ ' + b('I = peak deviation / fm') + '. لو النسبة integer الصوت harmonic، ولو لأ يبقى bell‑like.',
            'الـ <b>wavetable</b> بيخزّن period واحدة، والـ <b>granular</b> grains من 1 لـ 50 ms.',
            'الـ <b>Karplus‑Strong</b> بيحط noise جوه delay متفلتر، والـ ' + b('D = Fs / F1') + ' (يعني ' + b('44100 / 200 = 220.5 Hz') + ')، والـ gain لازم أقل من 1.'
          ] : [
            '<b>7 approaches</b>: subtractive, additive, FM, sample-based, wavetable, granular, physical modelling.',
            '<b>Subtractive</b>: filter a rich source (low-passed sawtooth = bowed string). <b>ADSR</b>: Sustain is a <b>level</b>, not a time.',
            '<b>Additive</b>: sum partials (Fourier); inefficient. Square wave = odd harmonics at 1, 1/3, 1/5.',
            '<b>FM</b> (Chowning, licensed to Yamaha, DX7): sidebands at fc ± n·fm, I = peak deviation / fm; integer ratio → harmonic, non-integer → bell-like.',
            '<b>Wavetable</b>: one period, compact. <b>Granular</b>: 1–50 ms grains; PSOLA apart → lower pitch.',
            '<b>Karplus-Strong</b>: noise through a filtered delay; D = Fs / F1 (44100 / 200 = 220.5 Hz); gain &lt; 1.'
          ]} />
        `, { sec: t('L5 Synthesis', 'محاضرة 5: الـ Synthesis') }),

        // 22 · figure
        page(html`
          <${H2}>${t('FM: sidebands at fc ± n·fm', 'الـ FM: الـ sidebands عند fc ± n·fm')}</${H2}>
          <${Fig} name="mm-5-fm-eg" />
        `),

        // 23 · match + trap
        page(html`
          <${Box} kind="pencil" title=${t('Practice: name the method', 'تدريب: سمّي الطريقة')}>
            <${Match} id="m-l5" left=${A ? ['تفلتر sawtooth', 'تجمع partials', 'تغيّر الـ carrier', 'حبّات صغيرة جدًا', 'تحط noise في delay متفلتر', 'جداول بتتغير'] : ['filter a sawtooth', 'sum partials', 'modulate a carrier', 'grains of 1–50 ms', 'noise through a filtered delay', 'one-period tables that evolve']}
              right=${['FM', 'Karplus-Strong', 'subtractive', 'wavetable', 'additive', 'granular']} answer=${[2, 4, 0, 5, 1, 3]} />
          </${Box}>
          <${Hand} red=${true}>${t('Worst trap: bell-like FM needs a non-integer carrier : modulator ratio.', 'أكبر فخ: الـ FM اللي صوته زي الجرس محتاج نسبة مش integer.')}</${Hand}>
        `),

        // ── Lecture 6 ──
        // 24 · must know
        page(html`
          <${LecHead} n=${6} en="MIDI and MPEG-4 Structured Audio" ar="الـ MIDI والـ MPEG-4 Structured Audio" asked=${NONE} />
          <${Meth} rows=${[
            ['s', 'MIDI sends <b>instructions</b> (which note, how loud, which instrument), not samples: the client makes the sound.', 'الـ MIDI بيبعت <b>أوامر</b> (أنهي نوتة، وقد إيه عالية، وأنهي آلة) مش samples: والـ client هو اللي بيطلّع الصوت.'],
            ['f', 'status byte: 1ttt cccc (80–FF) · data: 0xxx xxxx (0–127)'],
            ['s', 'First hex digit = type, second = <b>channel − 1</b>. 8x Note Off, 9x Note On, Ax poly pressure, Bx control change, Cx program, Dx channel pressure, Ex pitch bend. Cx and Dx are 2 bytes; the rest 3.', 'أول hex digit هو النوع، والتاني هو <b>الـ channel ناقص 1</b>. والـ Cx والـ Dx بـ 2 bytes، والباقي بـ 3.'],
            ['f', '9C 50 7F = Note On · ch 13 · key 80 · vel 127'],
            ['s', 'Mode messages = Bx with 121–127. Sysex F0 … F7; real time F8–FF. Ports: IN, OUT (its own data), THRU (echoes IN).', 'الـ mode messages هي Bx بأول data byte من 121 لـ 127. والـ sysex بين F0 وF7، والـ real time من F8 لـ FF. والـ ports: الـ IN والـ OUT (بيبعت الـ data بتاعته هو) والـ THRU (بيكرر اللي جه في الـ IN).'],
            ['s', 'General MIDI: 128 instruments (16 families of 8), percussion keys 35–81 on <b>channel 10</b>, at least 24 voices. 1000 notes = 6000 bytes vs 10,584,000 B for a CD stereo minute.', 'الـ General MIDI فيه 128 آلة (16 عيلة كل واحدة 8)، والـ percussion من key 35 لـ 81 على <b>channel 10</b>، وأقل حاجة 24 voices. و1000 نوتة يعني 6000 byte قصاد 10,584,000 byte لدقيقة CD stereo.'],
            ['s', 'MPEG-4 Structured Audio: SAOL (instruments), SASL (score), SASBF (sample banks), MIDI semantics, Scheduler, AudioBIFS.', 'الـ MPEG-4 Structured Audio فيه 6 أدوات: الـ SAOL للآلات، والـ SASL للـ score، والـ SASBF، والـ MIDI semantics، والـ Scheduler، والـ AudioBIFS.']
          ]} />
        `, { sec: t('L6 MIDI', 'محاضرة 6: الـ MIDI') }),

        // 25 · figure
        page(html`
          <${H2}>${t('Decode any MIDI bytes', 'فُك أي MIDI bytes')}</${H2}>
          <${Fig} name="mm-6-decoder" />
        `),

        // 26 · be the decoder + trap
        page(html`
          <${Stepper} id="st-midi" probs=${[
            { tab: ['Decode', 'فُك'], ours: true, tag: ['Practice · the notes\' message', 'تدريب · مثال الـ notes'], en: 'Decode the message <b>80 3C 40</b>.', ar: 'فُك الـ message دي: ' + b('<b>80 3C 40</b>') + '.',
              steps: [
                { l: ['The message type?', 'نوع الـ message؟'], c: '8x = ?', o: ['Note On', 'Note Off', 'Program Change'], a: 1, w: '8 → Note Off', h: [['Note On is 9x.', 'الـ Note On هو 9x.'], null, ['Program Change is Cx.', 'الـ Program Change هو Cx.']] },
                { l: ['The channel?', 'الـ channel؟'], c: 'x0 = ?', o: ['0', '1', '16'], a: 1, w: 'channel = 0 + 1 = 1', h: [['Channels run 1–16: the digit is channel − 1.', 'الـ channels من 1 لـ 16، والـ digit هو الـ channel ناقص 1.'], null, ['F would be channel 16.', 'الـ F هي اللي channel 16.']] },
                { l: ['The key and velocity?', 'الـ key والـ velocity؟'], c: '3C, 40 = ?', o: ['60, 64', '36, 40', '3, 12'], a: 0, w: '3C = 3×16 + 12 = 60 · 40 = 4×16 = 64', h: [null, ['Those are the hex digits read as decimal. 3C = 3 × 16 + 12.', 'دي الأرقام بالـ hex متقرية decimal. الـ ' + b('3C = 3 × 16 + 12') + '.'], ['Read both hex digits together.', 'اقرا الـ 2 hex digits مع بعض.']] }
              ], done: ['<b>Note Off, channel 1, key 60 (middle C), velocity 64.</b>', 'الإجابة ' + b('<b>Note Off, ch 1, key 60, vel 64</b>') + '.'] },
            { tab: ['Encode', 'اكتب'], ours: true, tag: ['Practice · the notes\' example', 'تدريب · مثال الـ notes'], en: 'Encode <b>Note On</b>, snare key <b>38</b>, velocity <b>100</b>, on <b>channel 10</b>.', ar: 'اكتب الـ bytes بتوع <b>Note On</b> على <b>channel 10</b>، والـ key ' + b('38') + ' والـ velocity ' + b('100') + '.',
              steps: [
                { l: ['The status byte?', 'الـ status byte؟'], c: 'status = ?', o: ['9A', '99', '90'], a: 1, w: 'Note On = 9, channel 10 → 10 − 1 = 9 → 99', h: [['A = 10, but the digit is channel − 1 = 9.', 'الـ A يعني 10، بس الـ digit هو ' + b('10 − 1 = 9') + '.'], null, ['90 is channel 1.', 'الـ 90 دي channel 1.']] },
                { l: ['The data bytes?', 'الـ data bytes؟'], c: '38, 100 = ?', o: ['26 64', '38 100', '62 46'], a: 0, w: '38 = 2×16 + 6 = 26 · 100 = 6×16 + 4 = 64', h: [null, ['Write them in hex.', 'اكتبهم بالـ hex.'], ['The digits are swapped.', 'الأرقام متبدّلة.']] }
              ], done: ['<b>99 26 64.</b>', 'الإجابة ' + b('<b>99 26 64</b>') + '.'] }
          ]} />
          <${Box} kind="watch"><${P} small=${true}>${X('Likely trap: MIDI <b>OUT</b> sends the device\'s own data; <b>THRU</b> repeats what arrives at IN. Program change (Cx) and channel pressure (Dx) are only 2 bytes.', 'فخ متوقع: الـ <b>OUT</b> بيبعت الـ data بتاعة الجهاز نفسه، والـ <b>THRU</b> هو اللي بيكرر اللي جه في الـ IN. والـ Cx والـ Dx بـ 2 bytes بس.')}</${P}></${Box}>
        `),

        // ── Lecture 7 ──
        // 27 · must know
        page(html`
          <${LecHead} n=${7} en="Digital Audio Effects" ar="الـ Digital Audio Effects" asked=${NONE} />
          <${Meth} rows=${[
            ['s', 'Standard order: compression → distortion → EQ → noise redux → amp sim → modulation → delay → reverb. Six classes; <b>vibrato is in two</b> (delays and modulators).', 'الترتيب المعتاد بيبدأ بالـ compression وبيخلص بالـ delay والـ reverb. وفيه 6 classes، والـ <b>vibrato في اتنين</b> (الـ delays والـ modulators).'],
            ['f', 'FIR comb: y(n) = x(n) + g·x(n − M)'],
            ['f', 'IIR comb: y(n) = c·x(n) + g·y(n − M)'],
            ['f', 'M = τ × fs  (100 ms × 44.1 kHz = 4410)'],
            ['s', 'Impulse, g = 0.5, M = 10: FIR → one echo (1, then 0.5 at n = 10); IIR → 1, 0.5, 0.25, 0.125 … at n = 0, 10, 20, 30.', 'لو دخل impulse بـ ' + b('g = 0.5, M = 10') + ': الـ FIR بيطلّع echo واحد، والـ IIR بيطلّع ' + b('1, 0.5, 0.25, 0.125') + ' عند ' + b('n = 0, 10, 20, 30') + '.'],
            ['s', 'Ring mod: only fc + fx and fc − fx (440, 200 → 640, 240 Hz). AM keeps fc too (three lines). Tremolo = AM below 20 Hz.', 'الـ ring modulation بيطلّع ' + b('fc + fx') + ' و' + b('fc − fx') + ' بس (يعني 640 و240 Hz)، والـ AM بيسيب الـ fc كمان (3 خطوط)، والـ tremolo هو AM تحت 20 Hz.'],
            ['s', 'Wah-wah = time-varying bandpass; phaser = notch. Limiter (fast, peaks), compressor (reduces dynamics), expander (low levels). Reverb: Schroeder (4 combs + 2 allpass), Moorer, convolution via FFT.', 'الـ wah‑wah هو bandpass بيتغير، والـ phaser هو notch. والـ limiter للـ peaks، والـ compressor بيقلل الـ dynamics، والـ expander للـ levels الواطية. والـ reverb أنواعه Schroeder وMoorer والـ convolution بالـ FFT.']
          ]} />
        `, { sec: t('L7 Effects', 'محاضرة 7: الـ Effects') }),

        // 28 · figure
        page(html`
          <${H2}>${t('FIR comb vs IIR comb', 'الـ FIR comb ضد الـ IIR comb')}</${H2}>
          <${Fig} name="mm-comb-impulse" />
        `),

        // 29 · match delay ranges + trap
        page(html`
          <${Box} kind="pencil" title=${t('Practice: which delay is which?', 'تدريب: أنهي delay لأنهي effect؟')}>
            <${Match} id="m-l7" left=${['0–20 ms, none', '0–15 ms, sine', '10–25 ms, random', '25–50 ms, none', '> 50 ms, none']} right=${['echo', 'chorus', 'resonator', 'slapback', 'flanger']} answer=${[2, 4, 1, 3, 0]} />
          </${Box}>
          <${Box} kind="watch"><${P} small=${true}>${X('Likely trap: a feedback delay repeats at a <b>fixed</b> interval; a real room does not. So it is not real reverb.', 'فخ متوقع: الـ delay اللي فيه feedback بيكرر على فترات <b>ثابتة</b>، والأوضة الحقيقية لأ. عشان كده مش reverb حقيقي.')}</${P}></${Box}>
        `),

        // ── Lecture 8 ──
        // 30 · images
        page(html`
          <${LecHead} n=${8} en="Graphics, Images and Video" ar="الـ Graphics والصور والـ Video" fin=${true} asked=${['Some part of it in all 8 finals: the written marks live here', 'فيه جزء منها في الـ 8 امتحانات: درجات المسائل هنا']} />
          <${UL} items=${A ? [
            'أحجام صورة ' + b('640 × 480') + ': الـ 1‑bit بـ ' + b('37.5 KB') + '، والـ grey بـ ' + b('307.2 KB') + '، والـ 8‑bit LUT بـ ' + b('307.2 KB') + '، والـ 24‑bit بـ ' + b('921.6 KB') + '، والـ 32‑bit فيه alpha.',
            'الـ <b>LUT</b>: كل pixel بتخزّن index بس، والجدول هو اللي فيه الـ RGB.',
            'الـ <b>Dithering</b> بـ 4 × 4 بيدّي 17 level: اضرب في ' + b('17/256') + ' ونزّل، وحط نقطة لو أكبر من الخانة (الـ 200 تبقى 13 نقطة).',
            'الـ <b>GIF</b> بيستخدم LZW وlossless و256 لون بس (‡ السلايد سمّته Huffman). والـ <b>JPEG</b> lossy للصور الفوتوغرافية، والـ <b>PNG</b> فيه alpha.'
          ] : [
            '640 × 480 sizes: 1-bit 37.5 KB; grey 307.2 KB; 8-bit LUT 307.2 KB; 24-bit 921.6 KB; 32-bit adds alpha (1,228,800 B).',
            '<b>LUT</b>: each pixel stores an index; the table holds the RGB.',
            '<b>Dithering</b> (4 × 4, 17 levels): × 17/256, round down, a dot where it is &gt; the entry (200 → 13 dots).',
            '<b>GIF</b>: LZW, lossless, 256 colours (‡ the slide calls LZW Huffman). <b>JPEG</b>: lossy, photos. <b>PNG</b>: up to 48 bits, alpha. TIFF: tags.'
          ]} />
          <${Meth} h=${['Course summary formulas', 'معادلات الـ course summary']} rows=${[['f', 'size = W × H × depth (1, 8 or 24 bits)'], ['f', 'CR = compressed / original × 100 %'], ['f', 'MSE = Σ(I − I″)² / MN · MAE = Σ|I − I″| / MN'], ['s', 'Colour: divide by 3MN. Lossless: I″ = I, so MSE = MAE = 0.', 'للصور الملوّنة اقسم على ' + b('3MN') + '. ولو lossless يبقى ' + b('I″ = I') + ' والـ MSE والـ MAE بصفر.']]} />
        `, { sec: t('L8 Images, colour, video', 'محاضرة 8: الصور والألوان') }),

        // 31 · colour models
        page(html`
          <${H2}>${t('The colour models', 'الـ colour models')}</${H2}>
          <${Meth} rows=${[
            ['s', '<b>RGB</b> is additive (screens): R + G + B = white. <b>CMY</b> is subtractive (inks): C + M + Y = black in theory.', 'الـ <b>RGB</b> additive (للشاشات)، والـ <b>CMY</b> subtractive (للأحبار).'],
            ['f', 'C = 1 − R · M = 1 − G · Y = 1 − B (0 to 1)'],
            ['f', 'K = min(C, M, Y) → C − K, M − K, Y − K, K'],
            ['f', 'Y = 0.299R + 0.587G + 0.114B'],
            ['f', 'I = 0.596R − 0.275G − 0.321B · Q = 0.212R − 0.528G + 0.311B'],
            ['f', 'U = B − Y · V = R − Y'],
            ['f', 'Cb = (B − Y)/1.772 · Cr = (R − Y)/1.402'],
            ['s', '<b>YIQ</b>: NTSC TV (Y 4, I 1.5, Q 0.6 MHz). <b>YUV</b>: digital video, PAL. <b>YCbCr</b>: JPEG and MPEG (‡ the slide swaps the matrix row labels). <b>Lab</b>: L 0–100, a green→red, b blue→yellow; Photoshop.', 'الـ <b>YIQ</b> للـ NTSC، والـ <b>YUV</b> للـ digital video والـ PAL، والـ <b>YCbCr</b> للـ JPEG والـ MPEG (‡ السلايد بدّلت أسماء الصفوف). والـ <b>Lab</b> فيه L من 0 لـ 100، وa من الأخضر للأحمر، وb من الأزرق للأصفر.'],
            ['s', 'CMYK works on 0–1: <b>÷ 255 first</b>. YIQ / YUV work on 0–255 directly.', 'الـ CMYK شغال من 0 لـ 1: <b>اقسم على 255 الأول</b>. أما الـ YIQ والـ YUV فشغالين على 0–255 على طول.']
          ]} />
        `),

        // 32 · video
        page(html`
          <${H2}>${t('Video and chroma subsampling', 'الـ Video والـ chroma subsampling')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Component</b> كل لون signal لوحده (أحسن حاجة)، والـ <b>composite</b> كله في carrier واحد، والـ <b>S‑Video</b> سلكين.',
            'الـ <b>NTSC</b>: 525 سطر، و30 fps (29.97)، والـ YIQ. والـ <b>PAL</b>: 625 سطر، و25 fps، والـ YUV.',
            'الـ <b>Chroma subsampling</b>: العين حساسة للـ brightness أكتر من اللون. الـ 4:4:4 من غير subsampling، والـ 4:2:2 نص أفقي، والـ 4:1:1 ربع أفقي، والـ 4:2:0 نص في الاتجاهين (متوسط كل 2 × 2). وعدد الـ samples لكل 4 pixels: 12 و8 و6 و6.',
            'الـ <b>Aliasing</b> في الصور: الـ stair‑stepping، والـ zooming، والـ temporal (عجلة العربية بتلف بالعكس)، والـ raster scan، والـ interlacing (بيقسم الـ sampling على 2).'
          ] : [
            '<b>Component</b>: one signal per primary (best). <b>Composite</b>: all in one carrier. <b>S-Video</b>: two lines.',
            '<b>NTSC</b>: 525 lines, 30 (29.97) fps, YIQ. <b>PAL</b>: 625 lines, 25 fps, YUV.',
            '<b>Chroma subsampling</b> (the eye is more sensitive to brightness): 4:4:4 none; 4:2:2 half horizontally; 4:1:1 a quarter horizontally; 4:2:0 half both ways (average of each 2 × 2). Samples per 4 pixels: 12, 8, 6, 6.',
            '<b>Aliasing</b> in images: stair-stepping, zooming, temporal (wagon wheel), raster scan, interlacing (halves the sampling).'
          ]} />
          <${Talk} who="cam" flip=${true}>${t('Same Nyquist, new place: my wagon wheels spin backwards when my frame rate is too low.', 'نفس الـ Nyquist في مكان جديد: عجل العربية بيلف بالعكس لما الـ frame rate بتاعي يبقى قليل.')}</${Talk}>
        `),

        // 33 · figure
        page(html`
          <${H2}>${t('Additive light, subtractive ink', 'ضوء additive وحبر subtractive')}</${H2}>
          <${Fig} name="mm-add-sub" />
        `),

        // 34 · traps + doctors
        page(html`
          <${Box} kind="watch"><${P} small=${true}>${X('Monochrome = <b>one</b> value per pixel, not a triplet. JPEG is <b>lossy</b> and uses <b>YCbCr</b>. "CMYK is bigger": 4 channels, so a 5 × 5 image is 100 B against 75 B in RGB (Final 2023/24).',
            'الـ monochrome قيمة <b>واحدة</b> لكل pixel مش 3. والـ JPEG <b>lossy</b> وبيستخدم <b>YCbCr</b>. والـ CMYK أكبر: 4 channels، فصورة ' + b('5 × 5') + ' تبقى ' + b('100 B') + ' قصاد ' + b('75 B') + ' في الـ RGB (نهائي 2023/24).')}</${P}></${Box}>
          ${mq('m-l8a', /Monochrome images/)}
        `),
        page(html`
          <${Box} kind="exam" title=${t('One more from the papers', 'كمان سؤال من الامتحانات')}>${mq('m-l8b', /Given RGB = \(0\.5, 0\.25, 0\.25\)/)}</${Box}>
          <${Hand}>${t('Already 0–1? Then skip the ÷255.', 'القيم من 0 لـ 1 أصلًا؟ يبقى متقسمش على 255.')}</${Hand}>
        `),

        // ══ Problems that always come up ══
        // 35 · the map of problem types
        page(html`
          <${H2}>${t('Problems that always come up', 'المسائل اللي بتيجي على طول')}</${H2}>
          ${S('Every written problem type from the 11 papers, in the order we drill them. Each one uses the <b>real paper numbers</b>, then a fresh variant of ours.', 'كل نوع مسألة اتكتب في الـ 11 امتحان، بالترتيب اللي هنتمرّن بيه. كل واحدة بأرقام <b>الامتحان الحقيقي</b>، وبعدها مسألة جديدة من عندنا.')}
          <table className="hf-mmF-tab hf-in"><thead><tr><th style=${{ width: '9%' }}>#</th><th>${t('Problem', 'المسألة')}</th><th style=${{ width: '36%' }}>${t('Asked in', 'اتسألت في')}</th></tr></thead><tbody>
            ${(A ? [
              ['1', 'الـ interval الحدّي من x(t)', 'نهائي 20/21 و21/22، ميدترم 21/22'],
              ['2', 'حجم ملف الصوت', 'نهائي 22/23 و21/22، والميدترمين'],
              ['3', 'حجم الـ video والـ CR', 'نهائي 23/24 و22/23، ميدترم 1'],
              ['4', 'الـ CR بتاع صورة', 'نهائي 25/26 و24/25'],
              ['5', 'التحويل من RGB لـ CMYK', 'في 5 امتحانات نهائية', 1],
              ['6', 'التحويل لـ YIQ أو YUV', 'نهائي 22/23 و21/22، ميدترم 21/22'],
              ['7', 'الـ MSE والـ MAE', 'في 5 امتحانات نهائية', 1],
              ['8', 'أسئلة "ليه" المكتوبة', 'في 5 امتحانات نهائية']
            ] : [
              ['P1', 'Limiting interval from x(t)', 'F 20/21, 21/22 · Mid 21/22'],
              ['P2', 'Audio file size', 'F 22/23, 21/22 · both mids'],
              ['P3', 'Video file size + CR', 'F 23/24, 22/23 · Mid #1'],
              ['P4', 'Image compression ratio', 'F 25/26, 24/25'],
              ['P5', 'RGB → CMYK', '5 finals', 1],
              ['P6', 'RGB → YIQ / YUV', 'F 22/23, 21/22 · Mid 21/22'],
              ['P7', 'MSE / MAE', '5 finals', 1],
              ['P8', 'The written "why"s', '5 finals']
            ]).map((r, i) => html`<tr key=${i} className=${r[3] ? 'hi' : ''}><td className="n">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}
          </tbody></table>
          <${Hand}>${t('Check first, Show only when stuck: a wrong pick tells you exactly which trap you fell into.', 'صحّح الأول، واعرض الحل لما تقف بس: الاختيار الغلط بيقولك وقعت في أنهي فخ بالظبط.')}</${Hand}>
        `, { sec: t('Problems that always come up', 'المسائل اللي بتيجي على طول') }),

        // 36 · P1
        page(html`
          <${H3}>${t('P1 · The limiting interval from x(t)', 'مسألة 1 · الـ interval الحدّي من x(t)')}</${H3}>
          <${Stepper} id="p1" probs=${P_NYQ} />
        `),

        // 37 · P1 method
        page(html`
          <${Meth} h=${['P1 · the method', 'مسألة 1 · الطريقة']} rows=${[
            ['f', 'f = (coefficient of πt) / 2'],
            ['f', 'fs = 2 × fmax · T = 1 / fs'],
            ['s', '1. One frequency per term. 2. Take the <b>largest</b>, wherever it sits. 3. Double it. 4. Invert it, in seconds.', '1. هات frequency لكل term. 2. خُد <b>الأكبر</b> في أي مكان كان. 3. اضربه في 2. 4. اقلبه وهات الناتج بالثواني.'],
            ['s', 'Phase: the constant inside the bracket, converted to degrees (× 180°/π).', 'والـ phase هي الثابت اللي جوه القوس، محوّل لدرجات (× <bdi dir="ltr">180°/π</bdi>).']
          ]} />
          <${Box} kind="watch"><${P} small=${true}>${X('Three traps: dividing by 2π when the coefficient already has π (answer comes out 3.14 times too small), taking the term with the <b>biggest amplitude</b>, and answering fs when they asked for the <b>interval</b>.',
            'تلات فخاخ: إنك تقسم على 2π والمعامل فيه π أصلًا، وإنك تاخد الـ term اللي ليه <b>أكبر amplitude</b>، وإنك تجاوب بالـ fs وهو سايل على الـ <b>interval</b>.')}</${P}></${Box}>
          <${Talk} who="mic" flip=${true}>${t('A term whose amplitude is 0 does not exist. If they say "A > 0", that term counts.', 'الـ term اللي الـ amplitude بتاعه صفر مش موجود أصلًا. ولو قال "A > 0" يبقى الـ term ده محسوب.')}</${Talk}>
        `),

        // 38 · P2
        page(html`
          <${H3}>${t('P2 · Audio file size', 'مسألة 2 · حجم ملف الصوت')}</${H3}>
          <${Fill} id="p2" probs=${P_AUDIO} />
        `),

        // 39 · P2 method
        page(html`
          <${Meth} h=${['P2 · the method', 'مسألة 2 · الطريقة']} rows=${[
            ['f', 'bits = t(s) × fs × Q × ch'],
            ['f', 'bytes = bits / 8 · KB = bytes / 1024'],
            ['s', 'Interval given → fs = 1/T (500 ms → 2 Hz, 0.00125 s → 800 Hz). "Speech" → 8000 Hz; "music" → 44,100 Hz.', 'لو الـ interval مكتوب يبقى ' + b('fs = 1/T') + ' (يعني ' + b('500 ms') + ' تبقى ' + b('2 Hz') + ')، ولو كاتب speech يبقى ' + b('8000 Hz') + '، ولو music يبقى ' + b('44,100 Hz') + '.']
          ]} />
          <${Box} kind="watch"><${P} small=${true}>${X('Hours × <b>3600</b>; stereo × <b>2</b>; ms → s before inverting. Midterm #1 gave an interval of 0.00525 s: fs = 190.48 Hz is not a whole number, so the size (≈ 1,714,285.7 B) depends on rounding. Write the exact fraction or say how you round.',
            'الساعات × <b>3600</b>، والـ stereo × <b>2</b>، وحوّل الـ ms لثواني قبل ما تقلب. وفي ميدترم 1 الـ interval كان ' + b('0.00525 s') + '، فالـ fs طلعت ' + b('190.48 Hz') + ' مش رقم صحيح، والحجم (حوالي ' + b('1,714,285.7 B') + ') بيتوقف على التقريب. اكتب الكسر بالظبط أو قول قرّبت إزاي.')}</${P}></${Box}>
          <${Talk} who="disk">${t('Show the units at every line: bits, then bytes, then KB. Half the marks are the working.', 'اكتب الوحدة في كل سطر: bits وبعدين bytes وبعدين KB. نص الدرجة على الخطوات.')}</${Talk}>
        `),

        // 40 · P3
        page(html`
          <${H3}>${t('P3 · Video file size and CR', 'مسألة 3 · حجم الـ video والـ CR')}</${H3}>
          <${Stepper} id="p3" probs=${P_VIDEO} />
        `),

        // 41 · P3 method
        page(html`
          <${Meth} h=${['P3 · the method', 'مسألة 3 · الطريقة']} rows=${[
            ['f', 'video = W × H × depth × fps × t'],
            ['f', 'audio = fs × Q × ch × t'],
            ['f', 'total = video + audio (bits)'],
            ['f', 'CR = compressed(bits) / total × 100 %'],
            ['s', 'Depth: 1 (black and white), 8 (grey), 24 (colour). fps or Q missing → <b>keep the letter</b>, or state the value you assume (e.g. 25 fps, Q = 16).', 'الـ depth بـ 1 للأبيض والأسود، و8 للـ grey، و24 للملوّن. ولو الـ fps أو الـ Q مش مكتوب <b>سيب الحرف</b>، أو قول إنت فارض كام (زي ' + b('25 fps') + ' و' + b('Q = 16') + ').']
          ]} />
          <${Box} kind="watch"><${P} small=${true}>${X('Convert the compressed size <b>to bits</b> with 1024s: 3 MB = 3 × 1024 × 1024 × 8 = 25,165,824 bits. Never compare bytes with bits. And the course writes CR as compressed ÷ original × 100, so it comes out tiny.',
            'حوّل الحجم المضغوط <b>لـ bits</b> بالـ 1024: يعني ' + b('3 MB = 25,165,824 bits') + '. وعمرك ما تقارن bytes بـ bits. والكورس بيكتب الـ CR على إنه المضغوط ÷ الأصل × 100، فبيطلع رقم صغير جدًا.')}</${P}></${Box}>
        `),

        // 42 · P4
        page(html`
          <${H3}>${t('P4 · Compression ratio of an image', 'مسألة 4 · الـ CR بتاع صورة')}</${H3}>
          <${Fill} id="p4" probs=${P_CR} />
        `),

        // 43 · P4 method + lossless
        page(html`
          <${Meth} h=${['P4 · the method', 'مسألة 4 · الطريقة']} rows=${[
            ['f', 'original = bytes/pixel × rows × cols'],
            ['f', 'CR = compressed / original × 100 %'],
            ['s', 'KB → bytes: × 1024 (0.001 KB = 1.024 B). Textbooks also write original : compressed (25 / 1.024 ≈ 24.41 : 1); give the course form first.', 'من KB لـ bytes اضرب في 1024. والكتب بتكتبه كمان الأصل : المضغوط ' + b('(24.41 : 1)') + '، بس اكتب شكل الكورس الأول.']
          ]} />
          <${Box} kind="exam" title=${t('The other half of Q4 (Finals 2025/26, 2024/25)', 'النص التاني من السؤال (نهائي 2025/26 و2024/25)')}>
            <${P} small=${true}>${X('"Find the decompressed image after a <b>lossless</b> scheme" → it is <b>identical to the original 5 × 5 image</b>: write the same matrix back. Its MSE and MAE are 0.',
              'سؤال "هات الصورة بعد الـ decompression لـ scheme <b>lossless</b>" إجابته إنها <b>نفس الصورة الأصلية بالظبط</b>: اكتب نفس الـ matrix تاني، والـ MSE والـ MAE بصفر.')}</${P}>
            <div dir="ltr" style=${{ display: 'flex', justifyContent: 'center' }}><table className="hf-mmF-mat"><tbody>${IMG5.map((r, i) => html`<tr key=${i}>${r.map((x, j) => html`<td key=${j}>${x}</td>`)}</tr>`)}</tbody></table></div>
          </${Box}>
          <${Hand} red=${true}>${t('Lossy or lossless, the CR formula is the same; only the decompressed image differs.', 'سواء lossy أو lossless نفس معادلة الـ CR، اللي بيختلف هو الصورة بعد الـ decompression بس.')}</${Hand}>
        `),

        // 44 · P5 real
        page(html`
          <${H3}>${t('P5 · RGB → CMYK, the real image', 'مسألة 5 · من RGB لـ CMYK بالصورة الحقيقية')}</${H3}>
          <${PixelGrid} id="p5" img=${IMG_CMYK} rows=${5} cols=${4} tag=${['Final 2025/26 Q3 · = 2024/25 Q2', 'نهائي 2025/26 س3 · ونهائي 2024/25 س2']} />
        `),

        // 45 · P5 method
        page(html`
          <${Meth} h=${['P5 · the method, per pixel', 'مسألة 5 · الطريقة لكل pixel']} rows=${[
            ['f', "R' = R/255 · G' = G/255 · B' = B/255"],
            ['f', "C = 1 − R' · M = 1 − G' · Y = 1 − B'"],
            ['f', 'K = min(C, M, Y)'],
            ['f', "C' = C − K · M' = M − K · Y' = Y − K"],
            ['s', 'Example (10, 10, 210): ÷255 → 0.0392, 0.0392, 0.8235; CMY → 0.9608, 0.9608, 0.1765; K = 0.1765 → <b>0.7843, 0.7843, 0, 0.1765</b>.', 'مثال على ' + b('(10, 10, 210)') + ': الـ K طلعت ' + b('0.1765') + '، والنتيجة ' + b('<b>0.7843, 0.7843, 0, 0.1765</b>') + '.']
          ]} />
          <${Box} kind="exam" title=${t('Final 2023/24 Q3b: the size after CMYK', 'نهائي 2023/24 س3ب: الحجم بعد الـ CMYK')}>
            <${P} small=${true}>${X('CMYK stores <b>4 values per pixel</b> instead of 3. A 5 × 5 image at 1 byte per value: RGB 75 B → CMYK <b>100 B</b>. The 5 × 4 image above: 60 B → 80 B.',
              'الـ CMYK بيخزّن <b>4 قيم لكل pixel</b> بدل 3. صورة ' + b('5 × 5') + ' بـ byte لكل قيمة: الـ RGB بـ ' + b('75 B') + ' والـ CMYK بـ ' + b('<b>100 B</b>') + '. والصورة اللي فوق ' + b('5 × 4') + ' من ' + b('60 B') + ' لـ ' + b('80 B') + '.')}</${P}>
          </${Box}>
          <${Box} kind="watch"><${P} small=${true}>${X('Forgetting ÷255 gives C = 1 − 10 = −9. And a pure black pixel: K = 1 and C′ = M′ = Y′ = 0.', 'لو نسيت تقسم على 255 هيطلعلك ' + b('C = 1 − 10 = −9') + '. والـ pixel السودا خالص بتبقى ' + b('K = 1') + ' والباقي أصفار.')}</${P}></${Box}>
        `),

        // 46 · P5 ours + normalised
        page(html`
          <${PixelGrid} id="p5o" img=${IMG_OURS} rows=${2} cols=${2} ours=${true} tag=${['Our variant · 2 × 2, fresh numbers', 'مسألة من عندنا · 2 × 2 بأرقام جديدة']} />
          <${Box} kind="exam" title=${t('Final 2020/21 Q3b: already normalised', 'نهائي 2020/21 س3ب: القيم من 0 لـ 1 أصلًا')}>
            <${P} small=${true}>${X('RGB = (0.1, 0.5, 0.4) is already 0–1: <b>no ÷255</b>. CMY = (0.9, 0.5, 0.6), K = 0.5 → <b>(0.4, 0, 0.1, 0.5)</b>.',
              'القيم ' + b('(0.1, 0.5, 0.4)') + ' من 0 لـ 1 أصلًا: <b>متقسمش على 255</b>. والنتيجة ' + b('<b>(0.4, 0, 0.1, 0.5)</b>') + '.')}</${P}>
          </${Box}>
        `),

        // 47 · P6
        page(html`
          <${H3}>${t('P6 · RGB → YIQ / YUV', 'مسألة 6 · من RGB لـ YIQ أو YUV')}</${H3}>
          <${Fill} id="p6" probs=${P_YUV} />
        `),

        // 48 · P6 method + compare
        page(html`
          <${Meth} h=${['P6 · the method', 'مسألة 6 · الطريقة']} rows=${[
            ['f', 'Y = 0.299R + 0.587G + 0.114B'],
            ['s', 'Y first, on 0–255 directly. Then U = B − Y, V = R − Y, or the I and Q rows. Keep signs; 2 decimals.', 'هات الـ Y الأول على القيم من 0 لـ 255 على طول. وبعدين ' + b('U = B − Y') + ' و' + b('V = R − Y') + '، أو صفوف الـ I والـ Q. خلّي بالك من الإشارة، ورقمين عشريين كفاية.']
          ]} />
          <table className="hf-mmF-tab hf-in"><thead><tr><th style=${{ width: '19%' }}>${t('Model', 'الموديل')}</th><th>${t('Where', 'بيستخدم فين')}</th><th>${t('Channels', 'الـ channels')}</th></tr></thead><tbody>
            ${(A ? [['Lab', 'الـ Photoshop، وبيعتمد على الإدراك', 'الـ L من 0 لـ 100، والـ a من أخضر لأحمر، والـ b من أزرق لأصفر'], ['YIQ', 'الـ NTSC TV', 'الـ Y بـ 4 والـ I بـ 1.5 والـ Q بـ 0.6 MHz'], ['YUV', 'الـ PAL والـ digital video', 'الفرق ' + b('B − Y') + ' والفرق ' + b('R − Y')], ['YCbCr', 'الـ JPEG والـ MPEG', 'الـ Cb والـ Cr متقسومين على 1.772 و1.402']]
              : [['Lab', 'Photoshop; perceptual', 'L 0–100, a green→red, b blue→yellow'], ['YIQ', 'NTSC TV', 'Y 4, I 1.5, Q 0.6 MHz'], ['YUV', 'PAL, digital video', 'U = B − Y, V = R − Y'], ['YCbCr', 'JPEG, MPEG', 'Cb, Cr scaled by 1.772, 1.402']]).map((r, i) => html`<tr key=${i} className=${i === 3 ? 'hi' : ''}><td className="n">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}
          </tbody></table>
          <${Box} kind="watch"><${P} small=${true}>${X('Final 2022/23 T2 Q2 asked to <b>compare</b> Lab, YIQ and YUV (5 marks): all three split brightness from colour; say where each is used. ‡ The slide labels the YCbCr matrix rows the wrong way round.',
            'في نهائي 2022/23 ت2 طلب <b>مقارنة</b> بين الـ Lab والـ YIQ والـ YUV بـ 5 درجات: التلاتة بيفصلوا الإضاءة عن اللون، وقول كل واحد بيستخدم فين. ‡ والسلايد كاتبة أسماء صفوف matrix الـ YCbCr بالعكس.')}</${P}></${Box}>
        `),

        // 49 · P7
        page(html`
          <${H3}>${t('P7 · MSE and MAE', 'مسألة 7 · الـ MSE والـ MAE')}</${H3}>
          <${DiffFill} id="p7" probs=${P_ERR} />
        `),

        // 50 · P7 method
        page(html`
          <${Meth} h=${['P7 · the method', 'مسألة 7 · الطريقة']} rows=${[
            ['f', 'd = I − I″ (cell by cell)'],
            ['f', 'MSE = Σd² / MN · MAE = Σ|d| / MN'],
            ['s', 'Write the d matrix, square (or take |d|), add, divide by the number of pixels. F 2020/21: Σd² = 287,100 → MSE = 17,943.75. F 2021/22 T1: 236,297 → 14,768.5625.', 'اكتب الـ d matrix، وربّعها (أو خُد الـ |d|)، واجمع، واقسم على عدد الـ pixels. نهائي 2020/21 طلع ' + b('17,943.75') + '، ونهائي 2021/22 ت1 طلع ' + b('14,768.5625') + '.'],
            ['f', '1-D (F 2020/21 Q4b): MSE ≈ 0.2019 · MAE ≈ 0.3813']
          ]} />
          <${Box} kind="watch"><${P} small=${true}>${X('<b>Colour</b> image: divide by <b>3MN</b> (all three channels). Asked "in CMY" → convert both images first (F 2022/23 T2). <b>Lossless</b> → 0. ‡ SNR for images and PSNR are old syllabus: SNR = Σ I² / Σ d² (F 2021/22 T1 → 0.29 dB).',
            'الصورة <b>الملوّنة</b> اقسم على <b>3MN</b> (التلات channels). ولو قال "في الـ CMY" حوّل الصورتين الأول (نهائي 2022/23 ت2). والـ <b>lossless</b> بصفر. ‡ والـ SNR للصور والـ PSNR من المنهج القديم، يعني ' + b('SNR = Σ I² / Σ d²') + ' (نهائي 2021/22 ت1 طلع ' + b('0.29 dB') + ').')}</${P}></${Box}>
        `),

        // 51 · colour MSE results
        page(html`
          <${H3}>${t('The colour versions, worked on the site', 'نسخ الصور الملوّنة، محلولة على الموقع')}</${H3}>
          <table className="hf-mmF-tab hf-in"><thead><tr><th style=${{ width: '30%' }}>${t('Paper', 'الامتحان')}</th><th>${t('Asked', 'المطلوب')}</th><th style=${{ width: '30%' }}>${t('Answer', 'الإجابة')}</th></tr></thead><tbody>
            ${(A ? [['نهائي 21/22 ت2', 'الـ MSE والـ MAE لصورة RGB', 'الـ MSE حوالي 7498.67 والـ MAE حوالي 59.73'], ['نهائي 22/23 صيفي', 'الـ MAE (lossy)', 'الـ MAE بـ 88'], ['نهائي 22/23 صيفي', 'الـ MSE (lossless)', 'صفر'], ['نهائي 22/23 ت2', 'الـ MSE في الـ CMY', 'الـ 6250 (أو 0.0961 من 0 لـ 1)']]
              : [['F 21/22 T2', 'MSE + MAE, RGB', '562,400/75 = 7498.67 · 4480/75 = 59.73'], ['F 22/23 Sum.', 'MAE (lossy)', '6600/75 = 88'], ['F 22/23 Sum.', 'MSE (lossless)', '0'], ['F 22/23 T2', 'MSE in CMY', '6250 (0.0961 on 0–1)']]).map((r, i) => html`<tr key=${i}><td className="n">${r[0]}</td><td>${r[1]}</td><td className="n">${r[2]}</td></tr>`)}
          </tbody></table>
          <${Talk} who="cam">${t('A 5 × 5 colour image has 75 values, not 25. That 3 is where most students lose the mark.', 'الصورة الملوّنة اللي مقاسها 5 × 5 فيها 75 قيمة مش 25. الـ 3 دي هي اللي بتضيّع الدرجة على أغلب الطلبة.')}</${Talk}>
          <${Box} kind="relax"><${P} small=${true}>${X('In CMY the differences are the same size as in RGB (C = 255 − R flips the sign only), so the MSE does not change; on the 0–1 scale divide by 255².', 'في الـ CMY الفروق نفس حجمها في الـ RGB (الـ ' + b('C = 255 − R') + ' بيقلب الإشارة بس)، فالـ MSE مبيتغيرش. ولو على مقياس 0 لـ 1 اقسم على ' + b('255²') + '.')}</${P}></${Box}>
        `),

        // 52 · P8
        page(html`
          <${H3}>${t('P8 · The written "why" questions', 'مسألة 8 · أسئلة "ليه" المكتوبة')}</${H3}>
          <${Points} id="p8" qs=${P_WHY} />
        `),

        // ══ Showdowns ══
        // 53 · fireside: sampled audio vs MIDI
        page(html`
          <${Fireside} sub=${t('Tonight: two ways to store the same song (Lecture 4 meets Lecture 6).', 'قعدة الليلة: طريقتين نخزّن بيهم نفس الأغنية (محاضرة 4 قصاد محاضرة 6).')} />
          <${Chat} names=${A ? ['الـ Sampled audio', 'الـ MIDI'] : ['Sampled audio', 'MIDI']} lines=${A ? [
            [0, 'أنا بسجّل الموجة نفسها: ' + b('44,100') + ' sample في الثانية، والدقيقة stereo بـ ' + b('10,584,000 B') + '.'],
            [1, 'وأنا ببعت <b>أوامر</b> بس: نوتة رقم كام، وقد إيه عالية. و1000 نوتة بـ ' + b('6000 B') + ' بس.'],
            [0, 'بس أنا بسجّل أي حاجة، حتى الكلام.'],
            [1, 'صح، وأنا الصوت بتاعي بيتوقف على الـ synthesiser اللي عند الـ client.'],
            [0, 'وأنا لازم أمشي على الـ <b>Nyquist</b> وإلا يبقى aliasing.'],
            [1, 'وأنا ده <b>compression via synthesis</b>: نفس الفكرة بتاعة الـ vector graphics في محاضرة 1.']
          ] : [
            [0, 'I record the wave itself: 44,100 samples a second; a stereo minute is <b>10,584,000 B</b>.'],
            [1, 'I only send <b>instructions</b>: which note, how loud. 1000 notes take <b>6000 B</b>.'],
            [0, 'But I can record anything, even speech.'],
            [1, 'True, and how I sound depends on the client\'s synthesiser.'],
            [0, 'And I need <b>Nyquist</b>: fs ≥ 2·fmax, or I alias.'],
            [1, 'I am <b>compression via synthesis</b>: the same idea as vector graphics in Lecture 1.']
          ]} />
        `, { sec: t('Showdowns', 'المواجهات') }),

        // 54 · fireside: FM vs ring modulation
        page(html`
          <${Fireside} sub=${t('Tonight: two modulators who keep getting swapped (Lecture 5 meets Lecture 7).', 'قعدة الليلة: اتنين modulators بيتلخبطوا على طول (محاضرة 5 قصاد محاضرة 7).')} />
          <${Chat} names=${A ? ['الـ FM', 'الـ Ring modulation'] : ['FM', 'Ring modulation']} lines=${A ? [
            [0, 'أنا بغيّر الـ <b>frequency</b> بتاعة الـ carrier، فبتطلع sidebands عند ' + b('fc ± n·fm') + '.'],
            [1, 'وأنا بضرب الإشارتين في بعض، فبيطلع ' + b('fc + fx') + ' و' + b('fc − fx') + ' <b>بس</b>.'],
            [0, 'لو carrier بـ ' + b('440 Hz') + ' وmodulator بـ ' + b('30 Hz') + ': يبقى ' + b('410/470') + ' وبعدين ' + b('380/500') + ' وهكذا.'],
            [1, 'ولو ' + b('440 Hz') + ' مع ' + b('200 Hz') + ' عندي: يبقى ' + b('640') + ' و' + b('240 Hz') + '، والـ 440 نفسها بتختفي.'],
            [0, 'والـ <b>index I</b> بتاعي بيتحكم في عدد الـ sidebands المسموعة.'],
            [1, 'وابن عمي الـ <b>AM</b> بيسيب الـ carrier، فعنده 3 خطوط. ولو تحت ' + b('20 Hz') + ' يبقى اسمه tremolo.']
          ] : [
            [0, 'I vary the carrier\'s <b>frequency</b>: sidebands at fc ± n·fm.'],
            [1, 'I multiply the two signals: only fc + fx and fc − fx, <b>nothing else</b>.'],
            [0, '440 Hz carrier, 30 Hz modulator: 410/470, then 380/500, and on.'],
            [1, '440 Hz with 200 Hz in me: 640 and 240 Hz; the 440 itself disappears.'],
            [0, 'My <b>index I</b> decides how many sidebands you can hear.'],
            [1, 'My cousin <b>AM</b> keeps the carrier, so it has three lines. Below 20 Hz it is called tremolo.']
          ]} />
        `),

        // 55 · interview: the low-pass filter
        page(html`
          <${Interview} title=${t('The low-pass filter, everywhere', 'الـ Low-pass filter في كل حتة')} sub=${t('This week: the one component that turns up in five lectures.', 'حوار الأسبوع: الحتة اللي ظهرت في 5 محاضرات.')} lines=${A ? [
            ['هيد فيرست', 'شفناك في محاضرة 2. كنت بتعمل إيه؟'],
            ['الـ Low-pass', 'بشيل الـ noise. بس الـ edges برضه high frequencies، فبعملهم blur.'],
            ['هيد فيرست', 'وفي محاضرة 3 و4؟'],
            ['الـ Low-pass', 'أنا الـ <b>anti‑aliasing filter</b> قبل الـ ADC: بشيل أي حاجة فوق ' + b('fs/2') + ' قبل الـ sampling.'],
            ['هيد فيرست', 'وفي الـ synthesis؟'],
            ['الـ Low-pass', 'في محاضرة 5 بفلتر sawtooth فيطلع bowed string، وأنا جوه الـ loop بتاع الـ Karplus‑Strong.'],
            ['هيد فيرست', 'وآخر ظهور؟'],
            ['الـ Low-pass', 'في محاضرة 7: الـ Moorer حطني جوه الـ comb filters عشان الـ reverb يبقى طبيعي أكتر.']
          ] : [
            ['Head First', 'We met you in Lecture 2. What were you doing?'],
            ['Low-pass', 'Removing noise. But edges are high frequencies too, so I blur them.'],
            ['Head First', 'And in Lectures 3 and 4?'],
            ['Low-pass', 'I am the <b>anti-aliasing filter</b> before the ADC: I remove anything above fs/2 before sampling.'],
            ['Head First', 'And in synthesis?'],
            ['Low-pass', 'In Lecture 5 I filter a sawtooth into a bowed string, and I sit inside the Karplus-Strong loop.'],
            ['Head First', 'Your last appearance?'],
            ['Low-pass', 'Lecture 7: Moorer put me inside the comb filters so the reverb sounds more natural.']
          ]} />
        `),

        // 56 · who am I
        page(html`
          <${H2}>${t('Who am I?', 'أنا مين؟')}</${H2}>
          <${WhoAmI} id="who" rows=${[
            { en: 'I am the initial angle at the origin.', ar: 'أنا الزاوية الابتدائية عند نقطة الأصل.', o: ['amplitude', 'phase', 'period'], a: 1, lec: 2 },
            { en: 'I am fs / 2.', ar: 'أنا نص الـ sampling frequency.', o: ['Nyquist rate', 'Nyquist frequency', 'bit rate'], a: 1, lec: 4 },
            { en: 'I sample and quantise.', ar: 'أنا اللي بعمل sampling وquantisation.', o: ['DAC', 'ADC', 'transducer'], a: 1, lec: 3 },
            { en: 'I am a level, not a time.', ar: 'أنا level مش وقت.', o: ['Attack', 'Decay', 'Sustain'], a: 2, lec: 5 },
            { en: 'I echo whatever arrives at IN.', ar: 'أنا بكرر أي حاجة توصل للـ IN.', o: ['MIDI OUT', 'MIDI THRU', 'sysex'], a: 1, lec: 6 },
            { en: 'My delay is 10–25 ms, randomly modulated.', ar: 'الـ delay بتاعي من 10 لـ 25 ms ومتغير عشوائي.', o: ['flanger', 'chorus', 'slapback'], a: 1, lec: 7 },
            { en: 'JPEG uses me.', ar: 'الـ JPEG بيستخدمني.', o: ['CMYK', 'YIQ', 'YCbCr'], a: 2, lec: 8 }
          ]} />
        `),

        // ══ Exam corner ══ (two short questions share a page; a long four-option one gets its own)
        ...[
          [['ex1', /sampling frequency to digitize a signal with a maximum frequency equal to 11025/]],
          [['ex3', /0\.00125 s with 64-bit/], ['ex4', /Quantization Is Performed Before Sampling/]],
          [['ex5', /lowest possible \(limiting\) sampling interval/], ['ex6', /MPEG video compression/]],
          [['ex7', /colour model is used by JPEG/], ['ex8', /In IIR systems/]],
          [['ex9', /Convert RGB = \(0\.1, 0\.5, 0\.4\)/], ['ex10', /The Nyquist Frequency Is/]],
          [['ex16', /Aliasing Occurs When/], ['ex2', /must be at most twice/]],
          [['ex11', /squared-error sum/]],
          [['ex12', /1-D signal/]],
          [['ex13', /Interactivity In Multimedia/]],
          [['ex14', /intersects the x-axis/]],
          [['ex15', /power ratio between a/]]
        ].map((g, k) => page(html`
          ${k === 0 && html`<${H2}>${t('Exam corner: the doctors\' questions', 'ركن الامتحان: أسئلة الدكاترة')}</${H2}>`}
          <${Box} kind="exam" title=${t('From past exams', 'من امتحانات فاتت')}>
            ${g.map(([id, re], m) => html`<${React.Fragment} key=${id}>${mq(id, re)}</${React.Fragment}>`)}
          </${Box}>
        `, k === 0 ? { sec: t('Exam corner', 'ركن الامتحان') } : {})),

        // practice questions for the lectures no paper has asked yet (the site's own, titled as such)
        ...[
          [[3, 'pr1', /anti-aliasing filters placed/]],
          [[3, 'pr2', /uncompressed HD video/]],
          [[5, 'pr3', /second-order sidebands/]],
          [[5, 'pr4', /Karplus-Strong string uses/]],
          [[6, 'pr5', /9C 50 7F/], [6, 'pr6', /echoes the data received/]],
          [[7, 'pr7', /echo of 100 ms/]],
          [[7, 'pr8', /Ring modulating a 440/]]
        ].map((g, k) => page(html`
          ${k === 0 && S('Lectures 3, 5, 6 and 7 have no past question yet, so these are the site\'s practice questions.', 'محاضرات 3 و5 و6 و7 مفيش منها أسئلة قديمة، فدي أسئلة تدريب من الموقع.')}
          <${Box} kind="pencil" title=${t('Practice questions', 'أسئلة تدريب')}>
            ${g.map(([n, id, re], m) => html`<${React.Fragment} key=${id}>${pq(id, n, re)}</${React.Fragment}>`)}
          </${Box}>
        `)),

        // ══ Exam day ══
        page(html`
          <${H2}>${t('Exam day: a 2-hour plan', 'يوم الامتحان: خطة للساعتين')}</${H2}>
          ${S('Our plan, built on the latest final (2025/26: 60 marks, 2 hours). Roughly 2 minutes per mark.', 'دي خطة من عندنا، مبنية على آخر امتحان (2025/26: 60 درجة في ساعتين). يعني حوالي دقيقتين لكل درجة.')}
          <div className="hf-mmF-plan hf-in">
            ${(A ? [['5 د', '<b>اقرا الورقة كلها</b> وعلّم المسائل.'], ['20 د', 'السؤال 1 والسؤال 2: <b>الـ MCQ والصح والغلط</b> (20 درجة). متقفش عند سؤال.'], ['45 د', 'السؤال 3: <b>الـ CMYK</b> (16 درجة). اكتب الطريقة مرة واحدة، وبعدين جدول لكل pixel.'], ['30 د', 'السؤال 4: <b>الـ CR والـ lossless</b> (24 درجة). الوحدات في كل سطر.'], ['20 د', '<b>راجع</b>: الـ ÷255، والـ × 1024، والـ × 3600، والـ stereo × 2.']]
              : [['5 m', '<b>Read the whole paper</b>, mark the problems.'], ['20 m', 'Q1 + Q2: <b>MCQ and True/False</b> (20 marks). Do not stall on one.'], ['45 m', 'Q3: <b>RGB → CMYK</b> (16 marks). Write the method once, then a table per pixel.'], ['30 m', 'Q4: <b>CR + lossless</b> (24 marks). Units on every line.'], ['20 m', '<b>Check</b>: ÷255, × 1024, × 3600, stereo × 2.']]).map((r, i) => html`<div key=${i} className="r"><span className="m">${r[0]}</span><span className="x">${TF(r[1])}</span></div>`)}
          </div>
          <${Hand}>${t('Another layout? Same rule: about 2 minutes per mark, 15–20 minutes kept for checking.', 'لو الورقة شكلها مختلف؟ نفس القاعدة: حوالي دقيقتين لكل درجة، وسيب 15–20 دقيقة للمراجعة.')}</${Hand}>
        `, { sec: t('Exam day', 'يوم الامتحان') }),

        page(html`
          <${H2}>${t('The night-before checklist', 'الـ Checklist بتاعة ليلة الامتحان')}</${H2}>
          <${Tick} id="tick" items=${A ? [
            'أقدر أطلّع الـ T من أي x(t) في دقيقتين.',
            'حافظ ' + b('t × fs × bits × ch') + '، وعارف الـ speech بـ 8000 والـ music بـ 44,100.',
            'بحوّل KB وMB لـ bits بالـ 1024 والـ × 8.',
            'عملت pixel CMYK كاملة من غير ما أبص في الطريقة.',
            'عارف أكتب الـ Y والـ U والـ V والـ I والـ Q من الذاكرة.',
            'بحسب الـ MSE والـ MAE، وعارف الملوّن بيتقسم على 3MN.',
            'عارف إن الـ lossless يعني نفس الصورة والـ error بصفر.',
            'جاهز أكتب ليه 44.1 kHz، وليه CMYK، وموديل الـ JPEG.',
            'عارف الـ 4 خصائص والـ challenges بتوع محاضرة 1.',
            'معايا آلة حاسبة شغالة.'
          ] : [
            'I can get T from any x(t) in two minutes.',
            'I know t × fs × bits × ch, speech 8000, music 44,100.',
            'I convert KB and MB to bits with 1024 and × 8.',
            'I did a full CMYK pixel without looking at the method.',
            'I can write Y, U, V, I and Q from memory.',
            'I can do MSE and MAE, and colour divides by 3MN.',
            'Lossless means the same image and zero error.',
            'Ready to write why 44.1 kHz, why CMYK, and the JPEG model.',
            'I know the 4 characteristics and the challenges (L1).',
            'A working calculator is in my bag.'
          ]} />
        `),

        // ══ Bullet points ══
        page(html`
          <${H2}>${t('Bullet points', 'الخلاصة')}</${H2}>
          <${Bullets} items=${A ? [
            'الـ multimedia لازم يكون computer controlled، وintegrated، وdigital، وinteractive. والـ lossless زي zip، والـ lossy زي JPEG وMP3 وMPEG، والـ MIDI بالـ synthesis.',
            'الـ dB للـ power بـ 10 وللـ amplitude بـ 20. والـ reference بـ 0 dB والألم بـ 120 dB. والـ FIR مفيهوش feedback، والـ IIR فيه.',
            'الـ animation تعتبر continuous media. والـ ADC بيعمل sampling وquantisation، والـ anti‑aliasing filter قبله.',
            'الـ Nyquist: ' + b('fs ≥ 2·fmax') + '، والـ Nyquist frequency هي ' + b('fs/2') + '. والـ undersampling بيعمل aliasing، والـ oversampling بيقلله.',
            'حجم الصوت ' + b('t × fs × bits × ch') + ' بالـ bits. والـ speech بـ 8000 Hz، والـ music والـ CD بـ 44,100 Hz.',
            'الـ FM عند ' + b('fc ± n·fm') + '، والـ ring modulation عند ' + b('fc ± fx') + ' بس. والـ Sustain ده level.'
          ] : [
            'Multimedia: computer controlled, integrated, digital, interactive. Lossless (zip), lossy (JPEG, MP3, MPEG), synthesis (MIDI).',
            'dB: power 10·log, amplitude 20·log; reference 0 dB, pain 120 dB. FIR has no feedback; IIR does.',
            'Animation is continuous media. ADC = sampling + quantisation; the anti-aliasing filter goes before it.',
            'Nyquist: fs ≥ 2·fmax; the Nyquist frequency is fs/2. Undersampling aliases; oversampling reduces it.',
            'Audio size = t × fs × bits × ch (bits). Speech 8000 Hz; music and CD 44,100 Hz.',
            'FM: fc ± n·fm; ring modulation: only fc ± fx. Sustain is a level.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        page(html`
          <${Bullets} items=${A ? [
            'الـ MIDI: أول hex digit هو النوع، والتاني هو الـ channel ناقص 1. يعني ' + b('9C 50 7F') + ' معناها Note On على channel 13.',
            'الـ comb: الـ ' + b('M = τ × fs') + '، والـ FIR بيدّي echo واحد، والـ IIR echoes بتقل. والـ chorus من 10 لـ 25 ms عشوائي.',
            'الـ CMYK: اقسم على 255، وبعدين ' + b('1 − x') + '، والـ K هي الـ min، واطرحها. وحجمها 4 قيم لكل pixel.',
            'الـ YIQ والـ YUV على 0–255 على طول، والـ ' + b('Y = 0.299R + 0.587G + 0.114B') + '. والـ JPEG بيستخدم YCbCr.',
            'الـ ' + b('CR = compressed / original × 100') + ' بنفس الوحدة. والـ lossless يعني نفس الصورة.',
            'الـ MSE هو ' + b('Σd² / MN') + ' والـ MAE هو ' + b('Σ|d| / MN') + '، والملوّن بيتقسم على ' + b('3MN') + '.'
          ] : [
            'MIDI: first hex digit = type, second = channel − 1; 9C 50 7F = Note On, channel 13.',
            'Comb: M = τ × fs; FIR = one echo, IIR = decaying echoes. Chorus 10–25 ms random.',
            'CMYK: ÷255, 1 − x, K = min, subtract K. 4 values per pixel.',
            'YIQ / YUV on 0–255 directly; Y = 0.299R + 0.587G + 0.114B. JPEG uses YCbCr.',
            'CR = compressed / original × 100, same units. Lossless → the same image.',
            'MSE = Σd² / MN, MAE = Σ|d| / MN; colour divides by 3MN.'
          ]} />
        `),

        // ══ The end ══
        page(html`
          <div className="hf-end">
            <${H1}>${t('Every sample, every pixel: done.', 'كل sample وكل pixel: خلصت.')}</${H1}>
            <${Talk} who="cam">${t('Now prove it against the clock. Good luck in the final!', 'دلوقتي أثبتها قدام الساعة. بالتوفيق في الفاينال!')}</${Talk}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], mock: 40, t: Date.now() } }}>${t('Timed mock final (40)', 'فاينال تجريبي بالوقت (40)')}</${K.Go}>
              <${K.Go} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], only: 'prof', t: Date.now() } }}>${t('All the doctors\' questions', 'كل أسئلة الدكاترة')}</${K.Go}>
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

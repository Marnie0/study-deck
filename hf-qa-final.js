// Head First final revision for Software Quality Assurance (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course in one sitting, built around the real papers (Final 2025/26: 2 hours, 60 marks, Q1 20 MCQs + Q2–Q5 written,
// 10 marks each; Midterm 2026/27: 40 online MCQs). Every written problem type of the final is worked interactively with the paper's
// own numbers and then a fresh variant of ours. Every number was checked with node (scratchpad check.js):
//  · Q5(a) New Year: only (01-01-2026, 00:00:00) runs 1–7; the other 3 combinations run 1,2,5,6,7; branch 2 tests, condition 4.
//    Ours, IF Score >= 50 AND Attendance >= 75: only (65, 80) runs line 3; branch 2, condition 4.
//  · Q1 #13–15: X=2,Y=0,A=4 runs both THENs (A = 2 then 3); X=3,Y=0,A=1 first only; X=0,Y=0,A=4 second only; X=3,Y=1,A=1 none.
//    Ours, if (X<5) and (Y>0) then B=B*2; if (X=0) or (B>10) then B=B-1: (0,1,3) both, (4,1,6) both, (6,1,20) second, (1,0,4) none.
//  · Q5(c) triangle: (3,4,5) none of D F H J, (3,5,3) D, (0,1,0) D H J, (4,4,4) D F → minimal statement set (4,4,4)+(0,1,0),
//    branch adds (3,4,5). Ours (2,2,3) D, (5,6,7) –, (7,7,7) D F, (1,1,5) D H, (0,4,5) H J → (7,7,7)+(0,4,5) give statement AND branch.
//  · Q4(a) queue: MM = create, insert, delete; the 14 pairs, errors new–delete, insert(normal→full)–insert, delete(into empty)–delete.
//    Ours, a stack of size 1 (Empty, Full): 6 pairs, errors new–pop, push–push, pop–pop.
//  · V(G): foo 7 − 6 + 2 = 3; ours (three IFs in a row) 9 − 7 + 2 = 4 = 3 decisions + 1 = 3 inner + 1 outer; 8 full paths; branch 2.
//  · Six Sigma: 6 × 1.22 = 7.32, 6 × 1.07 = 6.42, 6 × 1.27 = 7.62; √0.25 × 6 = 3, √0.36 × 6 = 3.6; (100 − 99.73) × 10,000 = 2,700 ppm;
//    100 − 3.4/10⁶ × 100 = 99.99966%; DPMO 25/(500 × 10) × 10⁶ = 5,000, ours 18/(1200 × 5) × 10⁶ = 3,000.
//  · Indicators: 40 found, 30 resolved → removal rate 30, age profile 10; ours 55, 41 → 41 and 14.
//  · Hot list: 68 questions (28 in the final counting each written part once, 40 in the midterm); per lecture 6, 11, 23, 8, 1, 5, 6, 8.
//    11 of the final's 20 MCQs came back in the midterm almost word for word, 2 more with a twist (#12 invalid case, #19 queue).
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const { useState, useEffect, useMemo } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const TT = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;
  const CHK = ar => ar ? 'صحّح' : 'Check';
  const SHOW = ar => ar ? 'اعرض الحل' : 'Show me';

  if (!document.getElementById('hf-css-qaF')) {
    const s = document.createElement('style'); s.id = 'hf-css-qaF';
    s.textContent = `
.hfb .hf-qaF-tag{ display:inline-flex; align-self:flex-start; gap:6px; align-items:center; font:800 13px/1.2 var(--body); letter-spacing:.05em; text-transform:uppercase; color:var(--paper); background:var(--hf-line); padding:4px 8px; border-radius:4px; }
.hfb .hf-qaF-tag.ours{ background:var(--hf-hand); }
.hfb .hf-qaF-tag.lec{ background:var(--hf-k); }
.hfb .hf-qaF-kn{ display:grid; grid-template-columns:auto 1fr; gap:4px 9px; margin:0; }
.hfb .hf-qaF-kn dt{ font:800 13px/1.3 var(--body); color:var(--hf-k); margin:0; padding-top:1px; max-width:96px; }
.hfb .hf-qaF-kn dd{ font:500 13.5px/1.34 var(--body); color:var(--ink); margin:0; padding-bottom:4px; border-bottom:1px dotted var(--faint); }
.hfb .hf-qaF-kn dd b{ font-weight:700; }
.hfb .hf-qaF-kn dd code{ font-family:var(--mono); font-size:.9em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-qaF-meth{ border:2px dashed var(--hf-k); border-radius:8px; padding:7px 10px; background:var(--paper); }
.hfb .hf-qaF-meth > p:first-child{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.07em; color:var(--hf-k); margin:0 0 5px; }
.hfb .hf-qaF-meth ol{ margin:0; padding-left:18px; }
.hfb .hf-qaF-meth li{ font:500 13.5px/1.34 var(--body); margin:0 0 3px; color:var(--ink); }
.hfb .hf-qaF-code{ font:600 13px/1.45 var(--mono); margin:0; color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; white-space:pre; overflow:hidden; }
.hfb .hf-qaF-code b{ color:var(--hf-k); }
.hfb .hf-qaF-box{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; background:var(--paper); }
.hfb .hf-qaF-tbl{ border-collapse:collapse; width:100%; font:500 13px/1.25 var(--body); color:var(--ink); }
.hfb .hf-qaF-tbl th, .hfb .hf-qaF-tbl td{ border:1px solid var(--hf-line); padding:3px 4px; text-align:center; vertical-align:middle; }
.hfb .hf-qaF-tbl th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-qaF-tbl td.m, .hfb .hf-qaF-tbl th.m{ font:700 13px/1.2 var(--mono); }
.hfb .hf-qaF-tbl td.l{ text-align:left; }
.hfb .hf-qaF-tbl tr.hot td{ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-qaF-cell{ width:100%; min-height:30px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); font:700 13px/1.15 var(--mono); cursor:pointer; padding:2px 3px; }
.hfb .hf-qaF-cell.w{ font-family:var(--body); }
.hfb .hf-qaF-cell[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-grey2); }
.hfb .hf-qaF-cell.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); }
.hfb .hf-qaF-cell.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qaF-msg{ font:600 13.5px/1.35 var(--body); margin:0; padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); color:var(--ink); }
.hfb .hf-qaF-msg.bad{ border-left-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
.hfb .hf-qaF-msg b{ font-weight:800; }
.hfb .hf-qaF-tabs{ display:flex; gap:4px; flex-wrap:wrap; }
.hfb .hf-qaF-tabs button{ flex:1 1 0; min-width:0; font:700 13px/1.1 var(--body); min-height:30px; padding:2px 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qaF-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
/* how ready am I */
.hfb .hf-qaF-ready{ display:grid; gap:3px; }
.hfb .hf-qaF-ready .row{ display:flex; align-items:center; gap:6px; border-bottom:1px dotted var(--faint); padding-bottom:3px; }
.hfb .hf-qaF-ready .no{ flex:none; width:22px; height:22px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); background:var(--hf-k); color:var(--paper); }
.hfb .hf-qaF-ready .nm{ flex:1 1 auto; min-width:0; font:600 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qaF-ready .bt{ flex:none; display:flex; gap:3px; }
.hfb .hf-qaF-ready .bt button{ font:700 13px/1 var(--body); height:28px; min-width:46px; padding:0 5px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qaF-ready .bt button.v0[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-qaF-ready .bt button.v1[aria-pressed="true"]{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-qaF-ready .bt button.v2[aria-pressed="true"]{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
/* course map */
.hfb .hf-qaF-map{ position:relative; display:grid; gap:2px; padding-left:34px; }
.hfb .hf-qaF-map .rail{ position:absolute; left:13px; top:12px; bottom:12px; width:3px; background:var(--hf-grey2); border-radius:2px; }
.hfb .hf-qaF-map .run{ position:absolute; left:9px; top:6px; width:11px; height:11px; border-radius:50%; background:var(--hf-red); animation:hf-qaF-run 9s linear infinite; }
@keyframes hf-qaF-run{ 0%{ top:6px; opacity:0; } 6%{ opacity:1; } 94%{ opacity:1; } 100%{ top:calc(100% - 17px); opacity:0; } }
.hfb .hf-qaF-map .st{ position:relative; padding:3px 0 4px; transition:opacity .3s; }
.hfb .hf-qaF-map .st.dim{ opacity:.28; }
.hfb .hf-qaF-map .st .dot{ position:absolute; left:-30px; top:4px; width:22px; height:22px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); border:2px solid var(--hf-line); background:var(--paper); color:var(--ink); }
.hfb .hf-qaF-map .st.t1 .dot{ background:var(--hf-k); border-color:var(--hf-k); color:var(--paper); }
.hfb .hf-qaF-map .st.t2 .dot{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-qaF-map .st b{ display:block; font:800 14px/1.15 var(--body); color:var(--ink); }
.hfb .hf-qaF-map .st span{ display:block; font:500 13px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-qaF-link{ display:grid; grid-template-columns:auto 1fr; gap:8px; align-items:start; padding:4px 0; border-bottom:1px dotted var(--faint); }
.hfb .hf-qaF-link .ns{ display:flex; gap:2px; align-items:center; font:800 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-qaF-link .ns i{ font-style:normal; width:21px; height:21px; border-radius:50%; display:grid; place-items:center; background:var(--hf-k); color:var(--paper); font:800 13px/1 var(--body); }
.hfb .hf-qaF-link .ns i.q{ background:var(--hf-hand); }
.hfb .hf-qaF-link p{ margin:0; font:500 13.5px/1.34 var(--body); color:var(--ink); }
/* anatomy */
.hfb .hf-qaF-pbar{ display:flex; height:44px; border:2px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-qaF-pbar > div{ display:grid; place-items:center; text-align:center; font:800 13px/1.1 var(--body); color:var(--paper); border-right:2px solid var(--paper); transform-origin:left; animation:hf-qaF-grow .7s cubic-bezier(.2,.7,.2,1) both; }
.hfb .hf-qaF-pbar > div:last-child{ border-right:0; }
.hfb .hf-qaF-pbar small{ display:block; font:600 13px/1.1 var(--body); opacity:.9; }
@keyframes hf-qaF-grow{ from{ transform:scaleX(0); } }
.hfb .hf-qaF-pleg{ display:grid; grid-template-columns:auto 1fr; gap:2px 8px; margin:0; }
.hfb .hf-qaF-pleg dt{ font:800 13px/1.3 var(--body); color:var(--ink); margin:0; }
.hfb .hf-qaF-pleg dd{ font:500 13px/1.3 var(--body); color:var(--ink); margin:0; }
.hfb .hf-qaF-cols{ display:grid; grid-template-columns:repeat(8, 1fr); gap:5px; align-items:end; height:104px; border-bottom:2px solid var(--hf-line); padding:0 2px; }
.hfb .hf-qaF-cols > div{ display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; }
.hfb .hf-qaF-cols i{ display:block; width:100%; background:var(--hf-k); border-radius:3px 3px 0 0; transform-origin:bottom; animation:hf-qaF-up .8s cubic-bezier(.2,.7,.2,1) both; }
.hfb .hf-qaF-cols b{ font:800 13px/1 var(--body); color:var(--ink); margin-bottom:2px; }
@keyframes hf-qaF-up{ from{ transform:scaleY(0); } }
.hfb .hf-qaF-colx{ display:grid; grid-template-columns:repeat(8, 1fr); gap:5px; padding:3px 2px 0; text-align:center; font:700 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-qaF-hot{ display:grid; grid-template-columns:minmax(0, 1fr) 90px 44px; gap:3px 6px; align-items:center; }
.hfb .hf-qaF-hot .nm{ font:600 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qaF-hot .nm em{ font-style:normal; color:var(--hf-red); font-weight:800; }
.hfb .hf-qaF-hot .br{ height:13px; background:var(--hf-grey); border-radius:3px; overflow:hidden; display:flex; }
.hfb .hf-qaF-hot .br i{ display:block; height:100%; background:var(--hf-k); transform-origin:left; animation:hf-qaF-grow .8s cubic-bezier(.2,.7,.2,1) both; }
.hfb .hf-qaF-hot .br i.m{ background:var(--hf-hand); }
.hfb .hf-qaF-hot .pp{ font:800 13px/1 var(--mono); color:var(--graphite); white-space:nowrap; }
.hfb .hf-qaF-key{ display:flex; gap:10px; flex-wrap:wrap; font:600 13px/1.2 var(--body); color:var(--graphite); }
.hfb .hf-qaF-key i{ display:inline-block; width:12px; height:12px; border-radius:2px; vertical-align:-2px; margin-right:4px; background:var(--hf-k); }
.hfb .hf-qaF-key i.m{ background:var(--hf-hand); }
/* chips and lists */
.hfb .hf-qaF-chips{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-qaF-chips button{ font:700 13.5px/1 var(--body); min-height:32px; padding:0 10px; border-radius:16px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qaF-chips button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qaF-chips button.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); }
.hfb .hf-qaF-chips button.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qaF-chips button:disabled{ opacity:.35; cursor:default; }
.hfb .hf-qaF-seq{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; min-height:32px; padding:4px 6px; border:1.5px dashed var(--faint); border-radius:6px; font:700 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qaF-seq.ok{ border:1.5px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-qaF-seq.no{ border:1.5px solid var(--hf-red); }
.hfb .hf-qaF-seq span{ padding:3px 7px; border-radius:5px; background:var(--hf-grey2); }
.hfb .hf-qaF-seq em{ font-style:normal; color:var(--graphite); font-weight:500; }
.hfb .hf-qaF-fp{ display:grid; gap:2px; }
.hfb .hf-qaF-fp .r{ display:grid; grid-template-columns:22px minmax(0, 1fr) 92px; gap:5px; align-items:center; font:500 13px/1.2 var(--mono); color:var(--ink); border-bottom:1px dotted var(--faint); padding:1px 0; }
.hfb .hf-qaF-fp .r > b{ color:var(--hf-k); font-family:var(--body); }
.hfb .hf-qaF-fp .r .two{ display:flex; gap:3px; }
.hfb .hf-qaF-fp .r .two button{ flex:1 1 0; font:700 13px/1 var(--body); height:26px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; padding:0; }
.hfb .hf-qaF-fp .r .two button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qaF-fp .r.ok .two{ box-shadow:0 0 0 1.5px var(--ok); border-radius:5px; }
.hfb .hf-qaF-fp .r.no .two{ box-shadow:0 0 0 1.5px var(--hf-red); border-radius:5px; }
.hfb .hf-qaF-fp .r.err > span{ color:var(--hf-red); }
/* inputs */
.hfb .hf-qaF-in{ width:100%; box-sizing:border-box; height:34px; font:700 16px/1 var(--mono); text-align:center; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-qaF-in.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); } .hfb .hf-qaF-in.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qaF-ask{ font:600 14px/1.35 var(--body); margin:0; color:var(--ink); }
.hfb .hf-qaF-ask code{ font:700 13.5px var(--mono); background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-qaF-sol{ font:600 13px/1.45 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; margin:0; }
.hfb .hf-qaF-sol b{ color:var(--hf-k); }
.hfb .hf-qaF-fields{ display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); gap:5px; }
.hfb .hf-qaF-fields label{ display:grid; gap:3px; font:700 13px/1.1 var(--body); color:var(--graphite); text-align:center; }
/* ISO tiles and number cards */
.hfb .hf-qaF-iso{ display:grid; grid-template-columns:1fr 1fr; gap:3px; }
.hfb .hf-qaF-iso button{ display:flex; gap:5px; align-items:center; text-align:left; font:600 13px/1.15 var(--body); min-height:33px; padding:2px 5px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qaF-iso button b{ flex:none; width:21px; height:21px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); color:var(--paper); }
.hfb .hf-qaF-iso button.hide span{ color:var(--graphite); font-family:"Caveat", cursive; font-size:18px; }
.hfb .hf-qaF-iso .g0 b{ background:#7C3AED; } .hfb .hf-qaF-iso .g1 b{ background:#0E7490; } .hfb .hf-qaF-iso .g2 b{ background:#B45309; }
.hfb .hf-qaF-iso .g3 b{ background:#BE123C; } .hfb .hf-qaF-iso .g4 b{ background:#15803D; } .hfb .hf-qaF-iso .g5 b{ background:#1D4ED8; }
.hfb .hf-qaF-nums{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.hfb .hf-qaF-nums button{ display:grid; gap:2px; text-align:center; min-height:54px; padding:4px; border-radius:8px; border:2px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; font:600 13px/1.2 var(--body); }
.hfb .hf-qaF-nums button b{ font:800 21px/1 var(--body); color:var(--hf-k); }
.hfb .hf-qaF-nums button.hide b{ color:var(--graphite); font-family:"Caveat", cursive; }
/* who am I */
.hfb .hf-qaF-who{ border:2px solid var(--hf-line); border-radius:10px; padding:10px; display:grid; gap:8px; background:var(--paper); }
.hfb .hf-qaF-who .cl{ font:italic 600 16px/1.35 var(--display); margin:0; color:var(--ink); min-height:66px; }
.hfb .hf-qaF-who .op{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.hfb .hf-qaF-who .op button{ font:600 13.5px/1.2 var(--body); min-height:38px; padding:3px 6px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qaF-who .op button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-qaF-who .op button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-qaF-who .ft{ display:flex; gap:8px; align-items:center; }
.hfb .hf-qaF-who .ft .grow{ flex:1; }
.hfb .hf-qaF-who .lt{ font:700 13px/1.2 var(--body); color:var(--hf-k); margin:0; }
/* exam day */
.hfb .hf-qaF-plan{ display:flex; height:50px; border-radius:6px; overflow:hidden; border:2px solid var(--hf-line); }
.hfb .hf-qaF-plan > div{ display:grid; place-items:center; text-align:center; font:800 13px/1.1 var(--body); color:var(--paper); border-right:2px solid var(--paper); }
.hfb .hf-qaF-plan > div:last-child{ border-right:0; }
.hfb .hf-qaF-plan small{ display:block; font:600 13px/1 var(--body); }
.hfb .hf-qaF-ck{ list-style:none; margin:0; padding:0; display:grid; gap:4px; }
.hfb .hf-qaF-ck li{ position:relative; padding-left:22px; font:500 13.5px/1.34 var(--body); color:var(--ink); }
.hfb .hf-qaF-ck li::before{ content:""; position:absolute; left:2px; top:3px; width:12px; height:12px; border:2px solid var(--hf-line); border-radius:3px; }
.hfb .hf-qaF-ck li b{ font-weight:700; }
.hfb .hf-qaF-go{ display:grid; gap:7px; width:100%; }
.hfb .hf-qaF-go .hf-btn{ width:100%; min-height:40px; font-size:14.5px; }
.hfb .hf-qaF-star{ font:800 86px/0.8 var(--body); color:transparent; -webkit-text-stroke:2px var(--hf-line); }
.hfb .hf-qaF-qd{ display:block; }
.hfb .hf-qaF-svg{ display:block; color:var(--ink); }
.hfb .hf-qaF-svg text{ fill:currentColor; font-family:var(--body); }
.hfb .hf-qaF-svg .er{ fill:var(--hf-red); }
/* Arabic */
.hf-ar .hf-qaF-kn dt, .hf-ar .hf-qaF-kn dd, .hf-ar .hf-qaF-meth li, .hf-ar .hf-qaF-msg, .hf-ar .hf-qaF-ready .nm, .hf-ar .hf-qaF-ready .bt button, .hf-ar .hf-qaF-map .st b, .hf-ar .hf-qaF-map .st span, .hf-ar .hf-qaF-link p, .hf-ar .hf-qaF-pleg dt, .hf-ar .hf-qaF-pleg dd, .hf-ar .hf-qaF-hot .nm, .hf-ar .hf-qaF-key, .hf-ar .hf-qaF-ask, .hf-ar .hf-qaF-tabs button, .hf-ar .hf-qaF-fields label, .hf-ar .hf-qaF-nums button, .hf-ar .hf-qaF-who .cl, .hf-ar .hf-qaF-who .op button, .hf-ar .hf-qaF-who .lt, .hf-ar .hf-qaF-ck li, .hf-ar .hf-qaF-plan > div, .hf-ar .hf-qaF-tag, .hf-ar .hf-qaF-meth > p:first-child, .hf-ar .hf-qaF-tbl, .hf-ar .hf-qaF-cell.w, .hf-ar .hf-qaF-fp .r .two button, .hf-ar .hf-qaF-colx, .hf-ar .hf-qaF-pbar > div, .hf-ar .hf-qaF-seq, .hf-ar .hf-qaF-chips button{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-qaF-kn dd, .hf-ar .hf-qaF-meth li, .hf-ar .hf-qaF-link p, .hf-ar .hf-qaF-ck li, .hf-ar .hf-qaF-msg{ font-size:13px; line-height:1.55; }
.hf-ar .hf-qaF-kn dt{ max-width:90px; line-height:1.45; }
.hf-ar .hf-qaF-who .cl{ font-style:normal; font-size:15px; line-height:1.6; }
.hf-ar .hf-qaF-meth ol{ padding-left:0; padding-right:18px; }
.hf-ar .hf-qaF-msg{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-qaF-msg.bad{ border-right-color:var(--hf-red); }
.hf-ar .hf-qaF-map{ padding-left:0; padding-right:34px; }
.hf-ar .hf-qaF-map .rail{ left:auto; right:13px; } .hf-ar .hf-qaF-map .run{ left:auto; right:9px; }
.hf-ar .hf-qaF-map .st .dot{ left:auto; right:-30px; }
.hf-ar .hf-qaF-ck li{ padding-left:0; padding-right:22px; } .hf-ar .hf-qaF-ck li::before{ left:auto; right:2px; top:5px; }
.hf-ar .hf-qaF-pbar > div{ transform-origin:right; } .hf-ar .hf-qaF-hot .br i{ transform-origin:right; }
.hf-ar .hf-qaF-pbar > div{ border-right:0; border-left:2px solid var(--paper); } .hf-ar .hf-qaF-pbar > div:last-child{ border-left:0; }
.hf-ar .hf-qaF-plan > div{ border-right:0; border-left:2px solid var(--paper); } .hf-ar .hf-qaF-plan > div:last-child{ border-left:0; }
.hf-ar .hf-qaF-key i{ margin-right:0; margin-left:4px; }
.hf-ar .hf-qaF-tbl td.l{ text-align:right; }
.hf-ar .hf-qaF-code, .hf-ar .hf-qaF-sol{ direction:ltr; text-align:left; }
.hf-ar .hf-qaF-tag{ letter-spacing:0; }
`;
    document.head.appendChild(s);
  }

  /* ── page 0: how ready am I? one row per lecture ── */
  const LECS = [[1, 'Introduction to testing', 'مقدمة الـ testing'], [2, 'Black box testing', 'الـ Black box testing'], [3, 'White box testing', 'الـ White box testing'],
    [4, 'V(G), triangle and OOP', 'الـ V(G) والمثلث والـ OOP'], [5, 'Web site testing', 'الـ Web site testing'], [6, 'SQA, metrics, indicators', 'الـ SQA والـ metrics'],
    [7, 'CMM, ISO 9000, SPICE', 'الـ CMM والـ ISO والـ SPICE'], [8, 'Six Sigma', 'الـ Six Sigma']];
  function Ready() {
    const ar = useAr();
    const [r, setR] = H.K.useSlot('ready', {});
    const lv = ar ? ['مهزوز', 'نص نص', 'تمام'] : ['shaky', 'OK', 'solid'];
    const shaky = LECS.filter(l => r[l[0]] === 0).map(l => l[0]);
    const done = LECS.filter(l => r[l[0]] != null).length;
    return html`<div className="hf-qaF-ready hf-in">
      ${LECS.map(([n, en, a]) => html`<div key=${n} className="row"><span className="no">${n}</span><span className="nm">${ar ? a : en}</span>
        <span className="bt" role="group" aria-label=${'Lecture ' + n}>${lv.map((x, j) => html`<button key=${j} className=${'v' + j} aria-pressed=${String(r[n] === j)} onClick=${() => setR(Object.assign({}, r, { [n]: j }))}>${x}</button>`)}</span></div>`)}
      ${done > 0 && html`<p className="hf-qaF-msg">${shaky.length
        ? (ar ? html`ابدأ بالمحاضرات دي: <bdi>${shaky.join('، ')}</bdi>. كل محاضرة ليها صفحات في الجزء 4، ومسائلها في الجزء 5.` : `Start with lecture${shaky.length > 1 ? 's' : ''} ${shaky.join(', ')}: each has its pages in part 4 and its problems in part 5.`)
        : (ar ? 'مفيش حاجة مهزوزة لحد دلوقتي. روح على المسائل على طول.' : 'Nothing shaky so far: go straight to the problems.')}</p>`}
    </div>`;
  }

  /* ── the course map: eight stops on one rail, two threads ── */
  const STOPS = [
    [1, 'Introduction to testing', 'مقدمة الـ testing', 'Name the eras, bug types, reasons and models', 'تسمّي العصور وأنواع الـ bugs وأسبابها والـ models', 1],
    [2, 'Black box testing', 'الـ Black box testing', 'Pick boundary values; tell verification from validation', 'تختار الـ boundary values وتفرّق الـ verification عن الـ validation', 1],
    [3, 'White box testing', 'الـ White box testing', 'Write statement, branch and condition test cases', 'تكتب test cases للـ statement والـ branch والـ condition', 1],
    [4, 'V(G), triangle, OOP', 'الـ V(G) والمثلث والـ OOP', 'Compute V(G), trace the triangle, list MM and FP', 'تحسب الـ V(G) وتتتبع المثلث وتطلّع الـ MM والـ FP', 1],
    [5, 'Web site testing', 'الـ Web site testing', 'Sort web elements into black, white and gray box', 'تقسّم عناصر الـ web على الـ black والـ white والـ gray box', 1],
    [6, 'Software quality assurance', 'الـ Software quality assurance', 'Tell SQA from SQC; list the 9 metrics', 'تفرّق الـ SQA عن الـ SQC وتعدّ الـ 9 metrics', 2],
    [7, 'CMM, ISO 9000, SPICE', 'الـ CMM والـ ISO 9000 والـ SPICE', 'Climb the 5 CMM levels; list ISO\'s 20 elements', 'تطلع الـ 5 levels بتوع الـ CMM وتكتب الـ 20 element بتوع الـ ISO', 2],
    [8, 'Six Sigma', 'الـ Six Sigma', 'Explain DMAIC, 3.4 per million and 6 × σ', 'تشرح الـ DMAIC والـ 3.4 في المليون والـ 6 × σ', 2]
  ];
  function CourseMap() {
    const ar = useAr();
    const [th, setTh] = H.K.useSlot('map', 0);
    const names = ar ? ['الكل', 'إزاي نختبر', 'إزاي ندير الـ quality'] : ['All', 'How to test', 'How to manage quality'];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-qaF-tabs" role="group" aria-label="Threads">${names.map((n, j) => html`<button key=${j} aria-pressed=${String(th === j)} onClick=${() => setTh(j)}>${n}</button>`)}</div>
      <div className="hf-qaF-map"><span className="rail"></span>${!calm() && html`<span className="run" aria-hidden="true"></span>`}
        ${STOPS.map(([n, en, a, den, dar, t]) => html`<div key=${n} className=${'st t' + t + (th && th !== t ? ' dim' : '')}><span className="dot">${n}</span><b>${ar ? a : en}</b><span>${ar ? dar : den}</span></div>`)}
      </div></div>`;
  }

  /* ── anatomy of the final ── */
  function PaperBar() {
    const ar = useAr();
    const seg = [['Q1', 20, ar ? '20 MCQ' : '20 MCQs', 'var(--hf-line)'], ['Q2', 10, '', 'var(--hf-k)'], ['Q3', 10, '', 'var(--hf-hand)'], ['Q4', 10, '', '#0E7490'], ['Q5', 10, '', '#B45309']];
    return html`<div className="hf-qaF-pbar hf-in" dir="ltr">${seg.map(([q, m, s, c], i) => html`<div key=${q} style=${{ flex: m + ' 1 0', background: c, animationDelay: calm() ? '0s' : (i * 0.12) + 's', animationDuration: calm() ? '0s' : null }}>${q} · ${m}${s && html`<small>${s}</small>`}</div>`)}</div>`;
  }
  const LW = [6, 11, 23, 8, 1, 5, 6, 8];
  function LecCols() {
    const mx = Math.max(...LW);
    return html`<div className="hf-in" dir="ltr"><div className="hf-qaF-cols">${LW.map((v, i) => html`<div key=${i}><b>${v}</b><i style=${{ height: (v / mx * 78) + 'px', animationDelay: calm() ? '0s' : (i * 0.06) + 's', animationDuration: calm() ? '0s' : null }}></i></div>`)}</div>
      <div className="hf-qaF-colx">${LW.map((_, i) => html`<span key=${i}>L${i + 1}</span>`)}</div></div>`;
  }
  // [en, ar, questions in the final, questions in the midterm, written in the final?] counted by hand from COURSES.qa.exams
  const HOT = [
    ['Six Sigma, DMAIC', 'الـ Six Sigma والـ DMAIC', 2, 6, 1],
    ['Standards, guidelines', 'الـ standards والـ guidelines', 3, 3, 0],
    ['Maintenance types ‡', 'أنواع الـ maintenance ‡', 0, 6, 0],
    ['Statement coverage', 'الـ statement coverage', 3, 2, 0],
    ['Formal review', 'الـ formal review', 2, 3, 0],
    ['MM, function pairs', 'الـ MM والـ function pairs', 2, 3, 1],
    ['Verification, validation', 'الـ verification والـ validation', 2, 2, 0],
    ['QA, tester\'s goal', 'الـ QA وهدف الـ tester', 2, 2, 0],
    ['Coverage, integration', 'الـ coverage والـ integration', 0, 4, 0],
    ['Static vs dynamic', 'الـ static والـ dynamic', 1, 2, 0],
    ['Boundary values', 'الـ boundary values', 1, 2, 0],
    ['CMM levels', 'الـ CMM levels', 3, 0, 1],
    ['ISO 9000', 'الـ ISO 9000', 3, 0, 1],
    ['Cyclomatic complexity', 'الـ cyclomatic complexity', 0, 2, 0],
    ['Checklist errors', 'أخطاء الـ checklist', 0, 2, 0],
    ['Branch, condition', 'الـ branch والـ condition', 1, 0, 1],
    ['Triangle tests', 'اختبارات المثلث', 1, 0, 1],
    ['Web boxes', 'صناديق الـ web', 1, 0, 1],
    ['Quality metrics', 'الـ quality metrics', 1, 0, 1],
    ['Test plan', 'الـ test plan', 0, 1, 0]
  ];
  function HotList() {
    const ar = useAr();
    const mx = 8;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '5px' }}>
      <div className="hf-qaF-hot">${HOT.map(([en, a, f, m, w], i) => html`<${React.Fragment} key=${i}>
        <span className="nm">${ar ? a : en}${w ? html` <em>✎</em>` : ''}</span>
        <span className="br" dir="ltr"><i style=${{ width: (f / mx * 100) + '%', animationDelay: calm() ? '0s' : (i * 0.04) + 's', animationDuration: calm() ? '0s' : null }}></i><i className="m" style=${{ width: (m / mx * 100) + '%', animationDelay: calm() ? '0s' : (i * 0.04 + 0.1) + 's', animationDuration: calm() ? '0s' : null }}></i></span>
        <span className="pp" dir="ltr">${f + m} ${f && m ? 'F+M' : f ? 'F' : 'M'}</span></${React.Fragment}>`)}</div>
      <div className="hf-qaF-key"><span><i></i>${ar ? 'الفاينل 2025/26' : 'Final 2025/26 (F)'}</span><span><i className="m"></i>${ar ? 'الميدترم 2026/27' : 'Midterm 2026/27 (M)'}</span><span><em style=${{ fontStyle: 'normal', color: 'var(--hf-red)', fontWeight: 800 }}>✎</em> ${ar ? 'فيه سؤال مقالي' : 'a written question'}</span></div>
    </div>`;
  }

  /* ── Q5(a) and its variant: fill which lines each test runs, then build the branch suite ── */
  // rows: [first value, second value, both conditions true?]
  function Suite({ id, rows, heads, cond }) {
    const ar = useAr();
    const [ln, setLn] = H.K.useSlot(id, {});
    const [pick, setPick] = H.K.useSlot(id + ':p', []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const ALL = '1,2,3,4,5,6,7', SKIP = '1,2,5,6,7';
    const ans = i => rows[i][2] ? ALL : SKIP;
    const cyc = i => { const v = ln[i]; setLn(Object.assign({}, ln, { [i]: v == null ? ALL : v === ALL ? SKIP : null })); setCk(false); };
    const tog = i => { setPick(pick.includes(i) ? pick.filter(x => x !== i) : pick.concat(i).sort()); setCk(false); };
    const right = rows.filter((_, i) => ln[i] === ans(i)).length;
    const hasT = pick.some(i => rows[i][2]), hasF = pick.some(i => !rows[i][2]);
    const brOK = hasT && hasF && pick.length === 2;
    let msg = null, bad = true;
    if (ck) {
      if (right < rows.length) msg = ar ? html`فيه <bdi>${rows.length - right}</bdi> خانة غلط في عمود السطور. السطر 3 بيتنفذ بس لما الشرطين يبقوا true.` : `${rows.length - right} line cell${rows.length - right > 1 ? 's are' : ' is'} wrong. Line 3 runs only when both conditions are true.`;
      else if (!pick.length) msg = ar ? 'السطور تمام. دلوقتي علّم الـ tests اللي هتعمل الـ branch suite.' : 'Lines right. Now tick the tests for the branch suite.';
      else if (!hasT || !hasF) msg = ar ? 'الـ branch coverage محتاج الـ IF يبقى true مرة و false مرة.' : 'Branch coverage needs the IF true once and false once.';
      else if (pick.length > 2) msg = ar ? 'وصلت، بس 2 tests كفاية للـ branch. الـ 4 دول هما الـ condition coverage.' : 'Covered, but 2 tests are enough for branch. All 4 are the condition suite.';
      else { bad = false; msg = ar ? html`صح: الـ branch بـ <b>2</b> tests، والـ condition بالـ <b>4</b> كلهم (<bdi>2 × 2</bdi>).` : html`Right: branch = <b>2</b> tests, condition = all <b>4</b> rows (2 × 2).`; }
    }
    return html`<div className="hf-qaF-box hf-in">
      <table className="hf-qaF-tbl" dir="ltr"><thead><tr><th>${ar ? 'branch' : 'branch'}</th><th>${heads[0]}</th><th>${heads[1]}</th><th>${ar ? 'السطور' : 'lines run'}</th></tr></thead>
        <tbody>${rows.map((r, i) => html`<tr key=${i} className=${ck && right === rows.length && r[2] ? 'hot' : ''}>
          <td style=${{ width: '46px' }}><button className=${'hf-qaF-cell' + (ck && pick.includes(i) ? (brOK ? ' ok' : ' no') : '')} aria-pressed=${String(pick.includes(i))} aria-label=${'Use test ' + (i + 1) + ' in the branch suite'} onClick=${() => tog(i)}>${pick.includes(i) ? '✓' : ''}</button></td>
          <td className="m">${r[0]}</td><td className="m">${r[1]}</td>
          <td style=${{ width: '118px' }}><button className=${'hf-qaF-cell' + (ck && ln[i] != null ? (ln[i] === ans(i) ? ' ok' : ' no') : '')} aria-label=${'Lines run by test ' + (i + 1)} onClick=${() => cyc(i)}>${ln[i] || '?'}</button></td></tr>`)}</tbody></table>
      <p className="hf-qaF-ask" style=${{ fontSize: '13px' }}>${ar ? html`دوس على <b>?</b> عشان تختار السطور، وعلّم ✓ للـ tests بتاعة الـ branch suite. الشرط: <code dir="ltr">${cond}</code>` : html`Tap <b>?</b> to choose the lines; tick ✓ the branch suite. Condition: <code>${cond}</code>`}</p>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setCk(true)} disabled=${!Object.keys(ln).length && !pick.length}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; rows.forEach((_, i) => { o[i] = ans(i); }); setLn(o); const t = rows.findIndex(r => r[2]), f = rows.findIndex(r => !r[2]); setPick([f, t].sort()); setCk(true); }}>${SHOW(ar)}</button>
      </div>
      ${msg && html`<p className=${'hf-qaF-msg hf-in' + (bad ? ' bad' : '')}>${msg}</p>`}
    </div>`;
  }

  /* ── Q1 #13–15 and the variant: be the CPU, does each THEN run? ── */
  // rows: [label, first runs, second runs, trace]
  function Cpu({ id, rows, heads }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const ans = (r, j) => rows[r][1 + j] ? 'run' : 'skip';
    const flip = k => { setV(Object.assign({}, v, { [k]: v[k] === 'run' ? 'skip' : 'run' })); setCk(false); };
    let right = 0; rows.forEach((_, r) => [0, 1].forEach(j => { if (v[r + '-' + j] === ans(r, j)) right++; }));
    const all = right === rows.length * 2;
    const lab = s => s == null ? '?' : s === 'run' ? (ar ? 'بيتنفذ' : 'runs') : (ar ? 'بيتخطّى' : 'skipped');
    const both = rows.filter(r => r[1] && r[2]).map(r => r[0]);
    return html`<div className="hf-qaF-box hf-in">
      <table className="hf-qaF-tbl" dir="ltr"><thead><tr><th>${ar ? 'test case' : 'test case'}</th><th className="m">${heads[0]}</th><th className="m">${heads[1]}</th></tr></thead><tbody>
        ${rows.map((t, r) => html`<${React.Fragment} key=${r}><tr className=${ck && all && t[1] && t[2] ? 'hot' : ''}><td className="m">${t[0]}</td>
          ${[0, 1].map(j => { const k = r + '-' + j, s = v[k]; return html`<td key=${j} style=${{ width: '86px' }}><button className=${'hf-qaF-cell w' + (ck && s ? (s === ans(r, j) ? ' ok' : ' no') : '')} aria-pressed=${String(s === 'run')} aria-label=${'test ' + (r + 1) + ', statement ' + (j + 1) + ': ' + lab(s)} onClick=${() => flip(k)}>${lab(s)}</button></td>`; })}</tr>
          ${ck && all && html`<tr><td colSpan="3" className="m l" style=${{ fontWeight: 500, fontSize: '13px' }}>${t[3]}</td></tr>`}</${React.Fragment}>`)}
      </tbody></table>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; rows.forEach((_, r) => [0, 1].forEach(j => { o[r + '-' + j] = ans(r, j); })); setV(o); setCk(true); }}>${SHOW(ar)}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${rows.length * 2}</bdi> صح` : right + ' / ' + rows.length * 2 + ' right'}</span>`}
      </div>
      ${ck && (all ? html`<p className="hf-qaF-msg hf-in">${ar ? html`اللي بينفذ الاتنين: <bdi dir="ltr">${both.join(' ، ')}</bdi>. ده الـ statement coverage test case.` : html`Runs both: <b>${both.join(' and ')}</b>. That is the statement-coverage test case.`}</p>`
        : html`<p className="hf-qaF-msg bad hf-in">${ar ? 'لسه فيه خانات غلط. امشي على الكود سطر سطر، والـ A بتتغير بعد أول IF.' : 'Some cells are wrong. Walk the code line by line: A changes after the first IF.'}</p>`)}
    </div>`;
  }

  /* ── Q5(c) and the variant: which type-setting lines does each test run, and which tests make the minimal set? ── */
  const TROWS = [['D', 'isosceles'], ['F', 'equilateral'], ['H', 'not a triangle'], ['J', 'bad inputs']];
  function TriCov({ id, tests, runs, min, branch }) {
    const ar = useAr();
    const [m, setM] = H.K.useSlot(id, {});
    const [sel, setSel] = H.K.useSlot(id + ':s', []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    let right = 0; TROWS.forEach(([n]) => tests.forEach((_, j) => { if (!!m[n + j] === runs[j].includes(n)) right++; }));
    const total = TROWS.length * tests.length, cellsOK = right === total;
    const selOK = sel.length === min.length && min.every(x => sel.includes(x));
    const tog = j => { setSel(sel.includes(j) ? sel.filter(x => x !== j) : sel.concat(j).sort()); setCk(false); };
    const w = Math.floor(232 / tests.length);
    return html`<div className="hf-qaF-box hf-in">
      <table className="hf-qaF-tbl" dir="ltr" style=${{ tableLayout: 'fixed' }}><colgroup><col style=${{ width: '86px' }} />${tests.map((_, j) => html`<col key=${j} style=${{ width: w + 'px' }} />`)}</colgroup>
        <thead><tr><th style=${{ fontSize: '13px' }}>${ar ? 'line ↓  test →' : 'line ↓  test →'}</th>${tests.map((x, j) => html`<th key=${j} style=${{ padding: '2px' }}><button className=${'hf-qaF-cell' + (ck && sel.includes(j) ? (selOK ? ' ok' : ' no') : '')} style=${{ fontSize: '13px', minHeight: '28px', letterSpacing: '-.04em' }} aria-pressed=${String(sel.includes(j))} aria-label=${'Put ' + x + ' in the minimal set'} onClick=${() => tog(j)}>${sel.includes(j) ? '✓' : ''}${x}</button></th>`)}</tr></thead>
        <tbody>${TROWS.map(([n, s]) => html`<tr key=${n}><td className="l" style=${{ fontSize: '13px' }}><b style=${{ color: 'var(--hf-k)' }}>${n}</b> ${s}</td>${tests.map((_, j) => {
          const on = !!m[n + j], st = ck ? (on === runs[j].includes(n) ? ' ok' : ' no') : '';
          return html`<td key=${j} style=${{ padding: '2px' }}><button className=${'hf-qaF-cell' + st} style=${{ minHeight: '27px', fontSize: '17px' }} aria-pressed=${String(on)} aria-label=${'Line ' + n + ' runs for ' + tests[j]} onClick=${() => { setM(Object.assign({}, m, { [n + j]: !on })); setCk(false); }}>${on ? '*' : ''}</button></td>`;
        })}</tr>`)}</tbody></table>
      <p className="hf-qaF-ask" style=${{ fontSize: '13px' }}>${ar ? html`علّم <b>*</b> في كل سطر بيتنفذ، وبعدين دوس على الـ tests اللي فوق عشان تختار أقل set للـ statement coverage.` : html`Mark <b>*</b> where a line runs, then tap the tests in the header to pick the smallest statement-coverage set.`}</p>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { const n = {}; TROWS.forEach(([r]) => tests.forEach((_, j) => { if (runs[j].includes(r)) n[r + j] = true; })); setM(n); setSel(min.slice()); setCk(true); }}>${SHOW(ar)}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${total}</bdi>` : right + ' / ' + total}</span>`}
      </div>
      ${ck && html`<p className=${'hf-qaF-msg hf-in' + (cellsOK && selOK ? '' : ' bad')}>${!cellsOK ? (ar ? 'فيه خانات غلط. افتكر: كل IF بيتشيك لوحده، وآخر IF يطلع true هو اللي بيكسب.' : 'Some cells are wrong. Every IF is checked on its own; the last true IF wins.')
        : !selOK ? (ar ? html`الخانات صح. بس أقل set هو <bdi dir="ltr">${min.map(j => '(' + tests[j] + ')').join(' + ')}</bdi>: محتاجين حد بيشغّل F وحد بيشغّل J.` : html`Cells right. The smallest set is ${min.map(j => '(' + tests[j] + ')').join(' + ')}: you need a test that runs F and one that runs J.`)
        : TT(branch)}</p>`}
    </div>`;
  }

  /* ── Q4(a): the queue's state diagram as on the paper, and the method-message picker ── */
  function QueueSvg() {
    const A = 'var(--hf-line)';
    const st = (x, l) => html`<g><circle cx=${x} cy="78" r="25" fill="var(--paper)" stroke=${A} strokeWidth="2" /><text x=${x} y="83" textAnchor="middle" fontSize="13" fontWeight="700">${l}</text></g>`;
    const ar = (d, k) => html`<path d=${d} fill="none" stroke=${k ? 'var(--hf-red)' : A} strokeWidth="1.8" markerEnd=${k ? 'url(#hf-qaF-ae)' : 'url(#hf-qaF-a)'} />`;
    return html`<svg className="hf-qaF-svg" viewBox="0 0 330 160" width="100%" role="img" aria-label="Queue state diagram: new goes to Empty; insert moves Empty to Normal, Normal to Normal or Full; delete moves Full to Normal, Normal to Normal or Empty; delete on Empty and insert on Full are errors">
      <defs><marker id="hf-qaF-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--hf-line)" /></marker>
        <marker id="hf-qaF-ae" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--hf-red)" /></marker></defs>
      <circle cx="10" cy="78" r="5" fill="var(--hf-line)" />${ar('M15 78 L44 78')}<text x="28" y="70" textAnchor="middle" fontSize="13">new</text>
      ${st(72, 'Empty')}${st(165, 'Normal')}${st(258, 'Full')}
      ${ar('M88 58 Q118 34 147 58')}<text x="118" y="38" textAnchor="middle" fontSize="13">insert</text>
      ${ar('M147 98 Q118 122 90 98')}<text x="118" y="130" textAnchor="middle" fontSize="13">delete</text>
      ${ar('M183 58 Q212 34 240 58')}<text x="212" y="38" textAnchor="middle" fontSize="13">insert</text>
      ${ar('M240 98 Q212 122 184 98')}<text x="212" y="130" textAnchor="middle" fontSize="13">delete</text>
      ${ar('M156 54 C140 14, 190 14, 174 54')}<text x="165" y="14" textAnchor="middle" fontSize="13">insert</text>
      ${ar('M156 102 C140 142, 190 142, 174 102')}<text x="165" y="156" textAnchor="middle" fontSize="13">delete</text>
      ${ar('M56 59 L34 32', 1)}<text className="er" x="30" y="22" textAnchor="middle" fontSize="13" fontWeight="700">delete ✗</text>
      ${ar('M274 59 L296 32', 1)}<text className="er" x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700">insert ✗</text>
    </svg>`;
  }
  function MMPick({ id, opts, ans }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id, []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const ok = p.length === ans.length && ans.every((x, i) => p[i] === x);
    const add = o => { if (!p.includes(o)) { setP(p.concat(o)); setCk(false); } };
    return html`<div className="hf-qaF-box hf-in">
      <p className="hf-qaF-ask">${ar ? 'دوس على الـ methods بالترتيب عشان تبني أبسط sequence بتعمل method-message للـ Queue:' : 'Tap the methods in order to build the simplest method-message sequence for the Queue:'}</p>
      <div className="hf-qaF-chips" dir="ltr">${opts.map(o => html`<button key=${o} aria-pressed=${String(p.includes(o))} disabled=${p.includes(o)} onClick=${() => add(o)}>${o}</button>`)}</div>
      <div className=${'hf-qaF-seq' + (ck ? (ok ? ' ok' : ' no') : '')} dir="ltr">${p.length ? p.map((x, i) => html`<${React.Fragment} key=${i}>${i ? html`<em>→</em>` : ''}<span>${x}</span></${React.Fragment}>`) : html`<em>…</em>`}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!p.length} onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { setP(ans.slice()); setCk(true); }}>${SHOW(ar)}</button>
        ${p.length > 0 && html`<button className="hf-btn" onClick=${() => { setP([]); setCk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div>
      ${ck && html`<p className=${'hf-qaF-msg hf-in' + (ok ? '' : ' bad')}>${ok ? (ar ? html`صح: كل method اتنادت مرة على الأقل. والـ push والـ pop دول بتوع الـ stack، مش الـ queue.` : 'Right: every method is called at least once. Push and pop belong to the stack, not the queue.')
        : (ar ? 'لأ. الـ queue بيتعمل بالـ create، وبعدين بيتحط فيه عنصر وبعدين بيتشال، بأسامي الـ queue.' : 'No. The queue is created, then gets an item, then loses it, with the queue\'s own method names.')}</p>`}
    </div>`;
  }

  /* ── function pairs: is the second call of each pair fine or an error? ── */
  function Pairs({ id, rows }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => v[i] === (r[1] ? 'e' : 'k')).length;
    const set = (i, x) => { setV(Object.assign({}, v, { [i]: x })); setCk(false); };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-qaF-fp">${rows.map((r, i) => { const st = ck && v[i] ? (v[i] === (r[1] ? 'e' : 'k') ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'r' + st + (ck && r[1] && v[i] === 'e' ? ' err' : '')}><b>${i + 1}</b><span dir="ltr">${r[0]}</span>
          <span className="two">${[['k', ar ? 'تمام' : 'OK'], ['e', ar ? 'error' : 'error']].map(([x, l]) => html`<button key=${x} aria-pressed=${String(v[i] === x)} aria-label=${'Pair ' + (i + 1) + ': ' + l} onClick=${() => set(i, x)}>${l}</button>`)}</span></div>`; })}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; rows.forEach((r, i) => { o[i] = r[1] ? 'e' : 'k'; }); setV(o); setCk(true); }}>${SHOW(ar)}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${rows.length}</bdi> صح` : right + ' / ' + rows.length + ' right'}</span>`}
      </div></div>`;
  }

  /* ── put things in order (CMM levels) ── */
  function Order({ id, items, shuf, numbered }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id, []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const ok = p.length === items.length && p.every((x, i) => x === i);
    return html`<div className="hf-qaF-box hf-in">
      <div className="hf-qaF-chips">${shuf.map(i => html`<button key=${i} disabled=${p.includes(i)} onClick=${() => { setP(p.concat(i)); setCk(false); }}>${items[i]}</button>`)}</div>
      <div className=${'hf-qaF-seq' + (ck ? (ok ? ' ok' : ' no') : '')} style=${{ flexDirection: 'column', alignItems: 'stretch' }}>${p.length ? p.map((x, i) => html`<span key=${i}>${numbered ? (i + 1) + '. ' : ''}${items[x]}</span>`) : html`<em>${ar ? 'دوس بالترتيب، من تحت لفوق…' : 'Tap them in order, bottom to top…'}</em>`}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!p.length} onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { setP(items.map((_, i) => i)); setCk(true); }}>${SHOW(ar)}</button>
        ${p.length > 0 && html`<button className="hf-btn" onClick=${() => { setP(p.slice(0, -1)); setCk(false); }}>${ar ? 'رجّع خطوة' : 'Undo'}</button>`}
      </div>
      ${ck && !ok && html`<p className="hf-qaF-msg bad hf-in">${ar ? 'الترتيب مش مظبوط. ومفيش level بيتنط.' : 'Not in order yet, and no level can be skipped.'}</p>`}
    </div>`;
  }

  /* ── number problems: type the answer, check with a tolerance, show the working ── */
  function Calc({ id, probs }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, 0);
    const [a, setA] = H.K.useSlot(id + ':a' + k, '');
    const [ck, setCk] = H.K.useSlot(id + ':c' + k, false);
    const P = probs[k];
    const num = parseFloat(String(a).replace(/,/g, '').replace('%', ''));
    const ok = !isNaN(num) && Math.abs(num - P.ans) <= (P.tol || 0.001);
    return html`<div className="hf-qaF-box hf-in">
      ${probs.length > 1 && html`<div className="hf-qaF-tabs" role="group" aria-label="Problems">${probs.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${x.tab}</button>`)}</div>`}
      ${P.tag && html`<span className=${'hf-qaF-tag' + (P.ours ? ' ours' : ' lec')}>${P.tag}</span>`}
      <p className="hf-qaF-ask">${TT(ar ? P.ar : P.en)}</p>
      <div className="hf-row" style=${{ flexWrap: 'nowrap' }}>
        <input className=${'hf-qaF-in' + (ck ? (ok ? ' ok' : ' no') : '')} style=${{ flex: '1 1 auto', minWidth: 0 }} type="text" inputMode="decimal" autoComplete="off" spellCheck="false" aria-label="Your answer" value=${a} onChange=${e => { setA(e.target.value); setCk(false); }} />
        ${P.unit && html`<span className="hf-qaF-ask" style=${{ flex: 'none' }} dir="ltr">${P.unit}</span>`}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!String(a).trim()} onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { setA(String(P.show || P.ans)); setCk(true); }}>${SHOW(ar)}</button>
      </div>
      ${ck && html`<p className=${'hf-qaF-sol hf-in'} dir="ltr">${ok ? '✓ ' : '✗ '}${TT(P.sol)}</p>`}
    </div>`;
  }

  /* ── Q3(a): the 20 ISO 9000 elements, covered: recall each, then tap to check ── */
  const ISO = ['Management responsibility', 'Quality systems', 'Contract review', 'Design control', 'Documentation & data control', 'Purchasing', 'Customer-supplied product control',
    'Product identification & traceability', 'Process control', 'Inspection & testing', 'Inspection/measuring equipment', 'Inspection & test status', 'Control of non-conforming product',
    'Corrective & preventive action', 'Handling, storage, packaging, delivery', 'Quality records', 'Internal quality audits', 'Training', 'Servicing', 'Statistical techniques'];
  const ISOG = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5];
  function IsoGrid() {
    const ar = useAr();
    const [o, setO] = H.K.useSlot('iso', {});
    const n = Object.keys(o).filter(k => o[k]).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-qaF-iso" dir="ltr">${ISO.map((x, i) => html`<button key=${i} className=${'g' + ISOG[i] + (o[i] ? '' : ' hide')} aria-pressed=${String(!!o[i])} aria-label=${'Element ' + (i + 1)} onClick=${() => setO(Object.assign({}, o, { [i]: !o[i] }))}><b>${i + 1}</b><span>${o[i] ? x : '?'}</span></button>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => { const a = {}; ISO.forEach((_, i) => { a[i] = true; }); setO(a); }}>${ar ? 'اعرض الـ 20' : 'Show all 20'}</button>
        <button className="hf-btn" onClick=${() => setO({})}>${ar ? 'غطّيهم تاني' : 'Cover them again'}</button>
        <span className="hf-score">${ar ? html`<bdi>${n} / 20</bdi>` : n + ' / 20'}</span>
      </div></div>`;
  }
  // number cards for the L7 counts
  function Nums({ id, cards }) {
    const ar = useAr();
    const [o, setO] = H.K.useSlot(id, {});
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-qaF-nums">${cards.map(([en, a, v], i) => html`<button key=${i} className=${o[i] ? '' : 'hide'} aria-pressed=${String(!!o[i])} onClick=${() => setO(Object.assign({}, o, { [i]: !o[i] }))}><b>${o[i] ? v : '?'}</b><span>${ar ? a : en}</span></button>`)}</div>
      <div className="hf-row"><button className="hf-btn solid" onClick=${() => { const a = {}; cards.forEach((_, i) => { a[i] = true; }); setO(a); }}>${ar ? 'اعرض الأرقام كلها' : 'Show all the numbers'}</button>
        <button className="hf-btn" onClick=${() => setO({})}>${ar ? 'غطّيهم' : 'Cover'}</button></div></div>`;
  }

  /* ── equivalence classes and boundaries: valid or invalid? ── */
  function EP({ id, specs }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, 0);
    const [v, setV] = H.K.useSlot(id + ':v' + k, {});
    const [ck, setCk] = H.K.useSlot(id + ':c' + k, false);
    const S = specs[k];
    const right = S.vals.filter((x, i) => v[i] === x[1]).length;
    return html`<div className="hf-qaF-box hf-in">
      <div className="hf-qaF-tabs" role="group" aria-label="Fields">${specs.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${x.tab}</button>`)}</div>
      <span className=${'hf-qaF-tag' + (S.ours ? ' ours' : ' lec')}>${S.tag}</span>
      <p className="hf-qaF-ask">${TT(ar ? S.ar : S.en)}</p>
      <table className="hf-qaF-tbl" dir="ltr"><tbody>${S.vals.map(([x, ans, why, whyAr], i) => html`<tr key=${i}><td className="m" style=${{ width: '74px' }}>${x}</td>
        <td style=${{ width: '128px' }}><span style=${{ display: 'flex', gap: '3px' }}>${[['v', ar ? 'valid' : 'valid'], ['i', ar ? 'invalid' : 'invalid']].map(([c, l]) => html`<button key=${c} className=${'hf-qaF-cell w' + (ck && v[i] === c ? (c === ans ? ' ok' : ' no') : '')} style=${{ minHeight: '26px' }} aria-pressed=${String(v[i] === c)} onClick=${() => { setV(Object.assign({}, v, { [i]: c })); setCk(false); }}>${l}</button>`)}</span></td>
        <td className="l" dir=${ar ? 'rtl' : 'ltr'} style=${{ fontSize: '13px', color: 'var(--graphite)' }}>${ck ? (ar ? whyAr || why : why) : ''}</td></tr>`)}</tbody></table>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; S.vals.forEach((x, i) => { o[i] = x[1]; }); setV(o); setCk(true); }}>${SHOW(ar)}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${S.vals.length}</bdi>` : right + ' / ' + S.vals.length}</span>`}
      </div></div>`;
  }

  /* ── control flow graphs and the V(G) counter ── */
  const FOO = {
    vb: [150, 184],
    nodes: { 1: [62, 20], 2: [124, 56], 3: [62, 92], 5: [28, 132], 4: [96, 132], 6: [62, 166] },
    edges: [['1', '2', 't'], ['1', '3', 'f'], ['2', '3', 's'], ['3', '4', 't'], ['3', '5', 'f'], ['4', '6', 's'], ['5', '6', 's']],
    regions: [[94, 60, 'R1'], [62, 136, 'R2'], [140, 150, 'R3']]
  };
  const OURS = {
    vb: [300, 104],
    nodes: { 1: [20, 24], 2: [62, 80], 3: [104, 24], 4: [146, 80], 5: [188, 24], 6: [230, 80], 7: [272, 24] },
    edges: [['1', '2', 't'], ['1', '3', 'f'], ['2', '3', 's'], ['3', '4', 't'], ['3', '5', 'f'], ['4', '5', 's'], ['5', '6', 't'], ['5', '7', 'f'], ['6', '7', 's']],
    regions: [[62, 46, 'R1'], [146, 46, 'R2'], [230, 46, 'R3'], [150, 100, 'R4']]
  };
  let gid = 0;
  function Graph({ g, width, regions }) {
    const [mid] = useState(() => 'hf-qaF-m' + (++gid));
    const P = g.nodes, R = 14;
    const edge = ([a, b, k]) => {
      const [x1, y1] = P[a], [x2, y2] = P[b], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
      return html`<path key=${a + b} d=${`M${(x1 + ux * R).toFixed(1)} ${(y1 + uy * R).toFixed(1)} L${(x2 - ux * (R + 3)).toFixed(1)} ${(y2 - uy * (R + 3)).toFixed(1)}`} stroke="var(--hf-line)" strokeWidth=${k === 't' ? 2.2 : 1.5} strokeDasharray=${k === 'f' ? '3 3' : null} fill="none" markerEnd=${`url(#${mid})`} />`;
    };
    return html`<svg className="hf-qaF-svg" viewBox=${'0 0 ' + g.vb[0] + ' ' + g.vb[1]} width=${width} style=${{ maxWidth: '100%', flex: 'none' }} role="img" aria-label="Control flow graph">
      <defs><marker id=${mid} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--hf-line)" /></marker></defs>
      ${g.edges.map(edge)}${Object.keys(P).map(n => html`<g key=${n}><circle cx=${P[n][0]} cy=${P[n][1]} r=${R} fill="var(--paper)" stroke="var(--hf-line)" strokeWidth="1.8" /><text x=${P[n][0]} y=${P[n][1] + 5} textAnchor="middle" fontSize="15" fontWeight="700">${n}</text></g>`)}
      ${regions && g.regions.map(([x, y, t], i) => html`<text key=${'r' + i} x=${x} y=${y} textAnchor="middle" fontSize="13" fontWeight="800" style=${{ fill: 'var(--hf-hand)' }}>${t}</text>`)}
    </svg>`;
  }
  const VGS = {
    foo: { g: FOO, E: 7, N: 6, D: 2, R: 3, V: 3, sol: ['E − N + 2P = 7 − 6 + 2(1) = <b>3</b>', 'decisions (nodes 1, 3): 2 + 1 = <b>3</b>', 'regions: 2 inner + 1 outer = <b>3</b>'] },
    ours: { g: OURS, E: 9, N: 7, D: 3, R: 4, V: 4, sol: ['E − N + 2P = 9 − 7 + 2(1) = <b>4</b>', 'decisions (nodes 1, 3, 5): 3 + 1 = <b>4</b>', 'regions: 3 inner + 1 outer = <b>4</b>'] }
  };
  function VG() {
    const ar = useAr();
    const [w, setW] = H.K.useSlot('vg', 'foo');
    const [a, setA] = H.K.useSlot('vg:a' + w, {});
    const [c, setC] = H.K.useSlot('vg:c' + w, false);
    const S = VGS[w];
    const num = x => x != null && /^\s*\d+\s*$/.test(String(x)) ? +String(x).trim() : NaN;
    const keys = ['E', 'N', 'D', 'R', 'V'];
    const right = keys.filter(x => num(a[x]) === S[x]).length;
    const lab = { E: 'E', N: 'N', D: ar ? 'decisions' : 'decisions', R: ar ? 'regions' : 'regions', V: 'V(G)' };
    return html`<div className="hf-qaF-box hf-in">
      <div className="hf-qaF-tabs" role="group" aria-label="Graph">${[['foo', ar ? html`الـ <bdi dir="ltr">foo()</bdi> (المحاضرة)` : 'foo() (lecture)'], ['ours', ar ? 'تلات IFs (من عندنا)' : 'Three IFs (ours)']].map(([x, l]) => html`<button key=${x} aria-pressed=${String(w === x)} onClick=${() => setW(x)}>${l}</button>`)}</div>
      ${w === 'foo' ? html`<div style=${{ display: 'flex', gap: '8px', alignItems: 'center' }} dir="ltr"><${Graph} g=${FOO} width=${126} regions=${c} />
          <pre className="hf-qaF-code" style=${{ flex: '1 1 auto', fontSize: '13px' }}>${['<b>1</b> if (a>1 && b==0)', '<b>2</b>   x = x/a', '<b>3</b> if (a==2 || x>1)', '<b>4</b>   x = x+1', '<b>5</b> else x = x*a', '<b>6</b> return (a+x)'].map((l, j) => html`<div key=${j}>${TT(l)}</div>`)}</pre></div>`
        : html`<div dir="ltr" style=${{ display: 'grid', gap: '4px', justifyItems: 'center' }}><${Graph} g=${OURS} width=${300} regions=${c} />
          <pre className="hf-qaF-code" style=${{ width: '100%', boxSizing: 'border-box', fontSize: '13px' }}>${['<b>1</b> if (a>0)  <b>2</b> x=1', '<b>3</b> if (b>0)  <b>4</b> y=1', '<b>5</b> if (c>0)  <b>6</b> z=1', '<b>7</b> return'].map((l, j) => html`<div key=${j}>${TT(l)}</div>`)}</pre></div>`}
      <div className="hf-qaF-fields" dir="ltr">${keys.map(x => html`<label key=${x}><span>${lab[x]}</span><input className=${'hf-qaF-in' + (c ? (num(a[x]) === S[x] ? ' ok' : ' no') : '')} type="text" inputMode="numeric" autoComplete="off" spellCheck="false" maxLength="2" aria-label=${lab[x]} value=${a[x] == null ? '' : a[x]} onChange=${e => { setA(Object.assign({}, a, { [x]: e.target.value })); setC(false); }} /></label>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setC(true)} disabled=${!Object.keys(a).length}>${CHK(ar)}</button>
        <button className="hf-btn" onClick=${() => { const n = {}; keys.forEach(x => { n[x] = String(S[x]); }); setA(n); setC(true); }}>${SHOW(ar)}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 5</bdi> صح` : right + ' / 5 right'}</span>`}
      </div>
      ${c && html`<div className="hf-qaF-sol hf-in" dir="ltr">${S.sol.map((l, j) => html`<div key=${j}>${TT(l)}</div>`)}</div>`}
    </div>`;
  }

  /* ── who am I? one clue at a time, from any lecture ── */
  function WhoAmI({ items }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('who', 0);
    const [p, setP] = H.K.useSlot('who:p', {});
    const it = items[k], pick = p[k];
    const score = items.filter((x, i) => p[i] === x.a).length, seen = Object.keys(p).length;
    return html`<div className="hf-qaF-who hf-in">
      <p className="lt">${ar ? html`لغز <bdi>${k + 1} / ${items.length}</bdi>` : 'Clue ' + (k + 1) + ' / ' + items.length}</p>
      <p className="cl">${TT(ar ? it.ar : it.en)}</p>
      <div className="op" dir="ltr">${it.o.map((o, j) => html`<button key=${j} className=${pick == null ? '' : j === it.a ? 'ok' : j === pick ? 'no' : ''} onClick=${() => pick == null && setP(Object.assign({}, p, { [k]: j }))}>${o}</button>`)}</div>
      ${pick != null && html`<p className="lt hf-in">${ar ? html`${pick === it.a ? 'صح! ' : 'لأ. '}ده من محاضرة <bdi>${it.l}</bdi>.` : (pick === it.a ? 'Right! ' : 'No. ') + 'From Lecture ' + it.l + '.'}</p>`}
      <div className="ft"><button className="hf-btn" disabled=${k === 0} onClick=${() => setK(k - 1)}>${ar ? 'اللي قبله' : 'Back'}</button><span className="grow"></span>
        <span className="hf-score">${ar ? html`<bdi>${score} / ${seen}</bdi>` : score + ' / ' + seen}</span>
        <button className="hf-btn solid" disabled=${k === items.length - 1} onClick=${() => setK(k + 1)}>${ar ? 'اللي بعده' : 'Next'}</button></div>
    </div>`;
  }

  /* ── exam day: the time plan bar ── */
  function Plan() {
    const ar = useAr();
    const seg = [['Q1', 25, 'var(--hf-line)'], ['Q2', 20, 'var(--hf-k)'], ['Q3', 20, 'var(--hf-hand)'], ['Q4', 22, '#0E7490'], ['Q5', 25, '#B45309'], [ar ? 'مراجعة' : 'check', 8, 'var(--graphite)']];
    return html`<div className="hf-qaF-plan hf-in" dir="ltr">${seg.map(([q, m, c]) => html`<div key=${q} style=${{ flex: m + ' 1 0', background: c }}>${q}<small>${m}′</small></div>`)}</div>`;
  }

  /* ── data for the problems ── */
  const NY = [['01-01-2025', '11:11:11', false], ['01-01-2025', '00:00:00', false], ['01-01-2026', '11:11:11', false], ['01-01-2026', '00:00:00', true]];
  const SC = [['40', '60', false], ['40', '80', false], ['65', '60', false], ['65', '80', true]];
  const CPU_EX = [['X=2, Y=0, A=4', 1, 1, 'X>1, Y=0 → A = 4/2 = 2; X=2 → A = 3'], ['X=3, Y=0, A=1', 1, 0, 'A = 1/3 ≈ 0.33; X≠2 and A ≯ 1'], ['X=0, Y=0, A=4', 0, 1, 'X ≯ 1 → skip; A = 4 > 1 → A = 5'], ['X=3, Y=1, A=1', 0, 0, 'Y≠0 → skip; X≠2 and A = 1 ≯ 1']];
  const CPU_OURS = [['X=0, Y=1, B=3', 1, 1, '0<5, 1>0 → B = 6; X=0 → B = 5'], ['X=4, Y=1, B=6', 1, 1, 'B = 12; 12 > 10 → B = 11'], ['X=6, Y=1, B=20', 0, 1, '6 ≮ 5 → skip; B = 20 > 10 → B = 19'], ['X=1, Y=0, B=4', 0, 0, 'Y ≯ 0 → skip; X≠0 and B = 4 ≯ 10']];
  const QPAIRS = [['new – delete', 1], ['new – insert', 0], ['insert(E→N) – insert', 0], ['insert(E→N) – delete', 0], ['insert(N→N) – insert', 0], ['insert(N→N) – insert(→F)', 0], ['insert(N→N) – delete', 0],
    ['insert(N→F) – insert', 1], ['insert(N→F) – delete', 0], ['delete(N→N) – insert', 0], ['delete(N→N) – delete', 0], ['delete(N→N) – delete(→E)', 0], ['delete(N→E) – insert', 0], ['delete(N→E) – delete', 1]];
  const S1PAIRS = [['new – push', 0], ['new – pop', 1], ['push(E→F) – push', 1], ['push(E→F) – pop', 0], ['pop(F→E) – push', 0], ['pop(F→E) – pop', 1]];

  H.chapters.qa.final = {
    title: 'Catch Every Mark', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'امسك كل درجة', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Go, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const arL = n => (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[n]) || {};
      // the doctors' questions: quiz items from the papers (Final 2025/26, Midterm 2026/27), searched in every lecture
      const DOC = /Exam|Midterm/;
      const q = (re, src) => {
        for (const l of kit.course.lectures) {
          const i = (l.quiz || []).findIndex(x => x.src && DOC.test(x.src) && (!src || src.test(x.src)) && re.test(strip(x.q)));
          if (i >= 0) return { q: l.quiz[i], why: (arL(l.n).quiz || [])[i] };
        }
        return {};
      };
      const mq = (id, re, src) => { const r = q(re, src); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      // the site's own practice questions (not from the papers)
      const pq = (id, n, re) => {
        const l = kit.course.lectures.find(x => x.n === n), a = arL(n);
        let i = l.quiz.findIndex(x => !(x.src && DOC.test(x.src)) && re.test(strip(x.q)));
        if (i >= 0) return html`<${MCQ} id=${id} q=${l.quiz[i]} why=${(a.quiz || [])[i]} />`;
        i = (l.extra || []).findIndex(x => re.test(strip(x.q)));
        return i < 0 ? null : html`<${MCQ} id=${id} q=${l.extra[i]} why=${(a.extra || [])[i]} />`;
      };
      const page = (el, o) => Object.assign({ el }, o || {});
      const Tag = ({ children, ours, lec }) => html`<span className=${'hf-qaF-tag hf-in' + (ours ? ' ours' : lec ? ' lec' : '')}>${children}</span>`;
      const Kn = ({ rows }) => html`<dl className="hf-qaF-kn hf-in">${rows.map(([a, b], i) => html`<${React.Fragment} key=${i}><dt>${T(a)}</dt><dd>${T(b)}</dd></${React.Fragment}>`)}</dl>`;
      const Meth = ({ items, title }) => html`<div className="hf-qaF-meth hf-in"><p>${title || t('The method', 'الطريقة')}</p><ol>${items.map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ol></div>`;
      const Code = ({ lines }) => html`<pre className="hf-qaF-code hf-in" dir="ltr">${lines.map((l, i) => html`<div key=${i}>${T(l)}</div>`)}</pre>`;
      const Know = n => t('Lecture ' + n + ' · you must know', 'محاضرة ' + n + ' · لازم تعرف');
      const PRACT = t('Practice questions', 'أسئلة تدريب');

      return [
        // ═════ 0 · how to use this book (faces the opener)
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تستخدم الكتاب ده')}</${H2}>
          <div className="hf-howto hf-in">
            <div className="row"><span className="mk">1</span><span>${X('<b>Rate yourself</b> below, then start with your shaky lectures.', '<b>قيّم نفسك</b> وابدأ بالأضعف.')}</span></div>
            <div className="row"><span className="mk">2</span><span>${X('Read each lecture\'s <b>you must know</b> page and do its quick check.', 'اقرا <b>لازم تعرف</b> لكل محاضرة وحل الـ check بتاعها.')}</span></div>
            <div className="row"><span className="mk">3</span><span>${X('Work every <b>problem that always comes up</b> with a pencil, then its fresh variant.', 'حل <b>المسائل المتكررة</b> بالقلم، وبعدين نسختها الجديدة.')}</span></div>
            <div className="row"><span className="mk">4</span><span>${X('Finish with the <b>exam corner</b>, the <b>exam-day</b> page and the <b>bullet points</b>.', 'اختم بـ <b>ركن الامتحان</b> و<b>يوم الامتحان</b> و<b>الخلاصة</b>.')}</span></div>
          </div>
          <${H3}>${t('How ready am I?', 'أنا جاهز قد إيه؟')}</${H3}>
          <${Ready} />
        `, { sec: t('How to use this book', 'إزاي تستخدم الكتاب') }),

        // ═════ 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="hf-qaF-star">★</span><span className="t">${A ? html`المراجعة النهائية<br/>Software Quality` : html`Final revision<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Catch Every Mark Before It Escapes', 'امسك كل درجة قبل ما تهرب')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('The whole course in one sitting, built around what the final asks', 'الكورس كله في قعدة واحدة، ومبني على اللي الفاينل بيسأله')}</p></div>
          <${Talk} who="bug">${X('Eight lectures, one exam, and I hide in all of them. Good luck finding me in <b>two hours</b>.', 'تمن محاضرات وامتحان واحد، وأنا مستخبي فيهم كلهم. ربنا معاك تلاقيني في <b>ساعتين</b>.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('I have the past papers. <b>11</b> of the final\'s 20 MCQs came back in the midterm almost word for word. You are more predictable than you think.', 'معايا الامتحانات اللي فاتت. <b>11</b> من الـ 20 MCQ بتوع الفاينل رجعوا في الميدترم تقريبًا بالحرف. إنت متوقَّع أكتر ما إنت فاكر.')}</${Talk}>
          <${P} small=${true}>${X('This book follows the papers: what each lecture must leave in your head, the written problems worked cell by cell, the questions the doctors repeat, and a plan for exam day.',
            'الكتاب ده ماشي ورا الامتحانات: كل محاضرة لازم تسيب إيه في دماغك، والمسائل المقالي محلولة خانة خانة، والأسئلة اللي الدكاترة بيكرروها، وخطة ليوم الامتحان.')}</${P}>
        `),

        // ═════ 2 · the course map
        page(html`
          <${H2}>${t('The course on one map', 'الكورس كله في خريطة واحدة')}</${H2}>
          <${P} small=${true}>${X('Eight stops. Under each one: what you must be able to <b>do</b> when you leave it. Tap a thread to light up the stops that belong together.', 'تمن محطات. تحت كل واحدة: لازم تبقى <b>بتعرف تعمل</b> إيه لما تسيبها. دوس على خيط عشان تنوّر المحطات اللي مع بعض.')}</${P}>
          <${CourseMap} />
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // ═════ 3 · where the lectures touch
        page(html`
          <${H2}>${t('Where the lectures touch', 'المحاضرات بتتقابل فين')}</${H2}>
          ${[
            [['1', '4'], 'The <b>V-model</b> comes twice: Lecture 1 pairs each stage with its test plan; Lecture 4 adds <b>verification</b> down the left, <b>validation</b> up the right.', 'الـ <b>V-model</b> جاي مرتين: محاضرة 1 بتربط كل stage بالـ test plan بتاعها، ومحاضرة 4 بتزوّد إن الشمال النازل <b>verification</b> واليمين الطالع <b>validation</b>.'],
            [['2', '3', '5'], '<b>Black box</b> (L2) plus <b>white box</b> (L3) gives <b>gray box</b>, the web site\'s mix (L5).', 'الـ <b>black box</b> (م2) مع الـ <b>white box</b> (م3) بيدّونا الـ <b>gray box</b>، وده خليط الـ web site (م5).'],
            [['3', '4'], '<b>Code coverage</b> (L3) meets <b>basis paths</b> (L4): V(G) counts the paths, but branch coverage can need fewer tests.', 'الـ <b>code coverage</b> (م3) بيقابل الـ <b>basis paths</b> (م4): الـ V(G) بتعدّ الـ paths، بس الـ branch coverage ممكن يحتاج tests أقل.'],
            [['4', '6'], '<b>Cyclomatic complexity</b> (L4) is one of the <b>9 common metrics</b> (L6).', 'الـ <b>cyclomatic complexity</b> (م4) واحدة من الـ <b>9 common metrics</b> (م6).'],
            [['2', '6'], '<b>QA vs QC</b> (L2) grows into <b>SQA vs SQC</b> (L6): process and prevention, product and detection.', 'الـ <b>QA والـ QC</b> (م2) بيكبروا ويبقوا <b>SQA و SQC</b> (م6): process و prevention، و product و detection.'],
            [['6', '7', '8'], 'QA uses <b>ISO and CMM</b> (L6). The final\'s fill-the-blank mixes <b>CMM, ISO 9000, SPICE</b> (L7) and <b>6 Sigma</b> (L8).', 'الـ QA بيستخدم <b>الـ ISO والـ CMM</b> (م6)، والفاينل بيخلط في أسئلة التكميل <b>الـ CMM والـ ISO 9000 والـ SPICE</b> (م7) مع <b>الـ 6 Sigma</b> (م8).']
          ].map(([ns, en, a], i) => html`<div key=${i} className="hf-qaF-link hf-in"><span className="ns">${ns.map((n, j) => html`<i key=${j} className=${+n >= 6 ? 'q' : ''}>${n}</i>`)}</span><p>${T(A ? a : en)}</p></div>`)}
          <${Grow} />
          
        `),

        // ═════ 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الفاينل')}</${H2}>
          <${Tag}>${t('Final 2025/26 · 2 hours · 60 marks', 'فاينل 2025/26 · ساعتين · 60 درجة')}</${Tag}>
          <${PaperBar} />
          <dl className="hf-qaF-pleg hf-in">
            <dt>Q1</dt><dd>${X('20 MCQs, 1 mark each, from every lecture but 5', 'فيه 20 MCQ بدرجة لكل واحد، من كل المحاضرات ما عدا 5')}</dd>
            <dt>Q2</dt><dd>${X('(a) the CMM levels · (b) the 6 sigma methodology', 'الـ CMM levels، والـ 6 sigma methodology')}</dd>
            <dt>Q3</dt><dd>${X('(a) the 20 ISO 9000 elements · (b) the common metrics', 'الـ 20 element بتوع الـ ISO 9000، والـ common metrics')}</dd>
            <dt>Q4</dt><dd>${X('(a) MM and function pairs of a queue · (b) web boxes', 'الـ MM والـ function pairs لـ queue، وصناديق الـ web')}</dd>
            <dt>Q5</dt><dd>${X('(a) branch and condition coverage · (c) the triangle', 'الـ branch والـ condition coverage، والمثلث')}</dd>
          </dl>
          <${Box} kind="relax" title=${t('The midterm 2026/27', 'الميدترم 2026/27')}><p className="hf-p small">${X('Online, <b>40 MCQs</b> on all 8 lectures; keys confirmed but one.', 'أونلاين، <b>40 MCQ</b> على الـ 8 محاضرات، والإجابات متأكدة ما عدا سؤال.')}</p></${Box}>
          <p className="hf-qaF-ask hf-in" style=${{ fontSize: '13px' }}>${t('Questions per lecture, both papers (each written part counts once):', 'عدد الأسئلة لكل محاضرة في الورقتين (كل جزء مقالي بواحد):')}</p>
          <${LecCols} />
        `, { sec: t('Anatomy of the final', 'تشريح الفاينل') }),

        // ═════ 5 · the hot list
        page(html`
          <${H2}>${t('The hot list', 'الـ hot list')}</${H2}>
          <${P} small=${true}>${X('Questions per topic in both papers, counted by us: <b>68</b> (28 final, 40 midterm).', 'عدد الأسئلة لكل موضوع في الورقتين، عدّيناها بنفسنا: <b>68</b> (28 فاينل و 40 ميدترم).')}</${P}>
          <${HotList} />
        `),

        // ═════ 6–9 · Lecture 1
        page(html`
          <${Tag} lec=${true}>${Know(1)}</${Tag}>
          <${H2}>${t('Testing, bugs and what they cost', 'الـ Testing والـ bugs وتمنها')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Testing', 'هو process <b>incremental و iterative</b> بيكتشف الـ defects ويتأكد من الـ requirements، وعند Miller هدفه <b>يأكد الـ quality</b>.'],
            ['الـ 5 عصور', 'الـ Debugging لحد 1956، وبعده Demonstration، وبعده <b>Destruction</b> (أيام Myers)، وبعده Evaluation، وآخرهم <b>Prevention</b>.'],
            ['إمتى bug؟', 'لما يخالف الـ spec، أو يعمل حاجة ممنوعة أو مش مذكورة، أو مايعملش حاجة لازمة، أو يبقى صعب وبطيء.'],
            ['الـ 6 أنواع', 'الـ conceptual والـ math والـ logical والـ resource والـ co-programming والـ team working.'],
            ['الـ 7 أسباب', 'الـ human factor، وسوء التواصل، ووقت مش واقعي، و design أو coding وحش، ونقص الـ testers الشاطرين، وتغييرات آخر لحظة.'],
            ['التكلفة', 'بتكبر كل ما نلاقيه متأخر، من قليلة في الـ requirements لغالية جدًا جدًا في الـ production (صاروخ Patriot).']
          ] : [
            ['Testing', 'An <b>incremental, iterative</b> process that detects defects and verifies the requirements. Miller: <b>affirm quality</b>.'],
            ['5 eras', 'Debugging (to 1956) · Demonstration · <b>Destruction</b> (Myers, 1979–82) · Evaluation · <b>Prevention</b> (1988–2000).'],
            ['A bug when', 'It misses the spec, does what the spec forbids or never mentions, misses what it should do, or is hard or slow.'],
            ['6 types', 'Conceptual · math · logical · resource · co-programming · team working.'],
            ['7 reasons', 'Human factor · miscommunication · unrealistic time · poor design · poor coding · no skilled testing · last-minute changes.'],
            ['Cost', 'Grows the later it is found: requirement low → production extremely costly (Patriot missile, 1991).']
          ]} />
        `, { sec: t('Lecture 1: introduction', 'محاضرة 1: المقدمة') }),
        page(html`
          <${H2}>${t('The development models', 'الـ development models')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Waterfall', 'أقدم واحد وماشي بالترتيب، والـ testing قرب الآخر، فالـ errors اللي بدري بتنتقل.'],
            ['الـ Spiral', 'لفّات من الـ planning والـ risk analysis والـ engineering وتقييم العميل. بيمسك الـ risk بدري، بس بطيء ومكلف.'],
            ['الـ V-model', 'كل stage ليها test plan: الـ requirements مع الـ <b>acceptance</b>، والـ functional spec مع الـ system، والـ design مع الـ integration، والـ unit design مع الـ test cases.'],
            ['الـ RAD', 'بيستخدم cycle قصيرة جدًا بـ reusable components، وينفع للمشاريع الصغيرة بس.'],
            ['الـ Agile', 'هو incremental والأكتر استخدامًا: الـ SCRUM والـ XP والـ DSDM. والـ <b>TDD</b> بيكتب الـ test قبل الـ code.']
          ] : [
            ['Waterfall', 'Oldest and sequential, testing near the end: early errors carry over.'],
            ['Spiral', 'Cycles of planning → risk analysis → engineering → customer evaluation; risk early, but slow and costly.'],
            ['V-model', 'Every stage has its test plan: requirements ↔ <b>acceptance</b>, functional spec ↔ system, design ↔ integration, unit design ↔ test cases.'],
            ['RAD', 'A very short cycle with reusable components; small, simple projects only.'],
            ['Agile', 'Incremental, the most used: SCRUM, XP (pair programming), DSDM. <b>TDD</b> writes the test before the code.']
          ]} />
        `),
        page(html`
          <${H2}>${t('The V-model: every stage has its test', 'الـ V-model: كل stage ليها test')}</${H2}>
          <${Fig} name="qa-vmodel" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Match the maintenance type', 'وصّل نوع الـ maintenance')}><p className="hf-p small">${X('The midterm asked <b>six</b> questions on these.', 'الميدترم سأل <b>6</b> أسئلة عليهم.')}</p></${Box}>
          <${Match} id="mnt" left=${['Corrective', 'Adaptive', 'Perfective', 'Preventive']}
            right=${A ? ['يخليه يشتغل مع نسخة OS جديدة', 'يكتشف الـ latent faults ويصلحها قبل ما تبقى errors', 'يصلّح bugs اتلاقت بعد الـ release', 'يحسّن الـ performance والسرعة أو يزوّد features']
              : ['Make it work with a new OS version', 'Detect and correct latent faults before they become errors', 'Fix bugs found after the release', 'Improve performance or speed, add new features']}
            answer=${[2, 0, 3, 1]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ Not on the slides. "Maximum cost and effort?": the site says <b>Perfective</b>; the quiz key said <b>Preventive</b> (not confirmed). Know both.', 'مش على الـ slides ‡. وسؤال «أكبر cost و effort؟» الموقع بيقول <b>Perfective</b> والـ key قال <b>Preventive</b> (مش متأكد). اعرف الاتنين.')}</p></${Box}>
        `),

        // ═════ 10–13 · Lecture 2
        page(html`
          <${Tag} lec=${true}>${Know(2)}</${Tag}>
          <${H2}>${t('Terms, black box, static and dynamic', 'المصطلحات والـ black box والـ static والـ dynamic')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Verification', '«بنبني المنتج <b>صح</b>؟» يعني مطابق للـ <b>specification</b>.'],
            ['الـ Validation', '«بنبني <b>المنتج الصح</b>؟» يعني مطابق لاحتياج الـ <b>user</b> (الـ acceptance testing).'],
            ['الـ QA والـ QC', 'الـ QA على الـ process و preventive، والـ QC على الـ product و corrective.'],
            ['الـ Levels', 'الـ unit ثم الـ integration ثم الـ system ثم الـ acceptance.'],
            ['الـ Black box', 'بيشوف الـ inputs والـ outputs من غير code. بيكشف غموض الـ specs، بس مايقدرش يجرب كل الـ inputs.'],
            ['الـ Static والـ dynamic', 'الـ static من غير تشغيل (نراجع الـ spec)، والـ dynamic بتشغيل بـ data.'],
            ['الـ Pass ثم الـ fail', 'الأول test-to-pass، وبعدين test-to-fail.']
          ] : [
            ['Verification', '"Building the product <b>right</b>?": meets its <b>specification</b>.'],
            ['Validation', '"Building the <b>right product</b>?": meets the <b>user\'s requirement</b> (acceptance testing).'],
            ['QA vs QC', 'QA = process, preventive; QC = product, corrective.'],
            ['Levels', 'Unit → integration → system → acceptance.'],
            ['Black box', 'Inputs and outputs, no code; exposes spec ambiguities, cannot test every input.'],
            ['Static / dynamic', 'Static = not running (review the spec); dynamic = running it with data.'],
            ['Pass, then fail', 'Test-to-pass first, then test-to-fail.']
          ]} />
        `, { sec: t('Lecture 2: black box', 'محاضرة 2: الـ black box') }),
        page(html`
          <${H2}>${t('Classes, boundaries and states', 'الـ classes والـ boundaries والـ states')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ EP', 'الـ class هي tests بتختبر نفس الحاجة أو بتمسك نفس الـ bug، فكفاية واحد من كل class. أي range ليه valid واحدة و invalid تحت و invalid فوق (من 18 لـ 60 يبقى 3 classes).'],
            ['مثال محلول', 'من <bdi dir="ltr">10,000</bdi> لـ <bdi dir="ltr">99,999</bdi> بيدي 6 tests:<span class="ltr">00000, 09999, 10000, 50000, 99999, 100000</span>'],
            ['الـ Boundaries', 'الـ bugs بتتجمع على الحواف: جرّب كل حافة valid واللي بعدها بواحد (من 1 لـ 255 يبقى 0 و 1 و 255 و 256)، وكمان الـ sub-boundaries والـ nulls والـ bad data.'],
            ['الـ States', 'الـ transition map من عين الـ user. وعشان نقلل: كل state مرة، والـ transitions الشائعة، والـ paths النادرة، والـ error states، و transitions عشوائية.'],
            ['الـ Media player', 'فيه 4 states و 8 transitions: كل الـ states في test case واحدة، وكل الـ transitions في 2. والـ stop من الـ FAST PLAY بيرجّع لـ PLAY.']
          ] : [
            ['EP', 'A class = tests that test the same thing or catch the same bug: one per class is enough. A range gives 1 valid + invalid below + invalid above (18–60: 3 classes).'],
            ['Worked', '10,000–99,999 → 00000, 09999, 10000, 50000, 99999, 100000 (6 tests).'],
            ['Boundaries', 'Bugs gather at the edges: test each valid edge and one past it (1–255 → 0, 1, 255, 256), plus sub-boundaries, nulls and bad data.'],
            ['States', 'A transition map from the user\'s view. To reduce: every state once, common transitions, rare paths, error states, random ones.'],
            ['Media player', '4 states, 8 transitions: all states in 1 test case, all transitions in 2. Stop in FAST PLAY goes back to PLAY.']
          ]} />
        `),
        page(html`
          <${H2}>${t('Try it: partitions and boundary values', 'جرّبها: الـ partitions والـ boundary values')}</${H2}>
          <${Fig} name="qa-ep-boundary" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Which word does the paper want?', 'الورقة عايزة أنهي كلمة؟')}><p className="hf-p small">${X('The papers\' own phrases. <b>Ver</b> = verification, <b>Val</b> = validation, <b>Sta</b> = static, <b>Dyn</b> = dynamic testing.', 'دي جمل الامتحانات نفسها. الـ <b>Ver</b> يعني verification، والـ <b>Val</b> يعني validation، والـ <b>Sta</b> يعني static، والـ <b>Dyn</b> يعني dynamic testing.')}</p></${Box}>
          <${Sort} id="vvsd" bins=${[['Ver', 'Verification'], ['Val', 'Validation'], ['Sta', 'Static'], ['Dyn', 'Dynamic']]} items=${A ? [
            ['مطابق للـ specification بتاعته', 0], ['مطابق لـ requirement الـ customer', 1], ['اختبار الـ software وهو شغال', 3], ['من غير تشغيل، بالـ examining والـ reviewing', 2],
            ['«بنبني المنتج صح؟»', 0], ['الـ user acceptance testing', 1], ['مراجعة الـ user manual', 2], ['الـ exploratory testing', 3]
          ] : [
            ['"meets its specification"', 0], ['"meets the customer\'s requirement"', 1], ['"testing the running software"', 3], ['"not running, examining and reviewing it"', 2],
            ['"Are we building the product right?"', 0], ['User acceptance testing', 1], ['Reviewing the user manual', 2], ['Exploratory testing', 3]
          ]} />
        `),

        // ═════ 14–17 · Lecture 3
        page(html`
          <${Tag} lec=${true}>${Know(3)}</${Tag}>
          <${H2}>${t('White box, static side', 'الـ White box من الناحية الـ static')}</${H2}>
          <${Kn} rows=${A ? [
            ['بيختبر', 'الـ independent paths، والـ conditions وهي true و false، والـ loops عند حدودها، والـ internal data structures.'],
            ['الـ Static WB', 'له 3 أجزاء: الـ <b>formal review</b>، والـ <b>coding standards and guidelines</b>، والـ <b>code review checklist</b>.'],
            ['الـ Formal review', 'اجتماعات تفحص الـ design والـ code. عناصره الأربعة: identify problems، و follow rules، و prepare، و write a report.'],
            ['الـ Peer review', 'فيه programmer شارك في التصميم، ومعاه programmers أو testers.'],
            ['الـ Walkthrough', 'اللي <b>كتب</b> الـ code بيشرحه سطر سطر لـ 5 أو 6.'],
            ['الـ Inspection', 'اللي بيعرض <b>مش</b> اللي كتب، والـ inspectors بيبصّوا بعين الـ user والـ tester.'],
            ['الـ Standards', 'إجبارية (mandatory)، والـ guidelines مش mandatory أوي. وأسبابهم الـ reliability والـ readability أو الـ maintainability والـ portability.']
          ] : [
            ['Tests', 'Independent paths, conditions true and false, loops at their boundaries, internal data structures.'],
            ['Static WB', '3 parts: <b>formal review</b> · <b>coding standards and guidelines</b> · <b>code review checklist</b>.'],
            ['Formal review', 'Meetings that inspect design and code. 4 elements: identify problems, follow rules, prepare, write a report.'],
            ['Peer review', 'A programmer who helped design it, with other programmers or testers.'],
            ['Walkthrough', 'The <b>author</b> presents line by line to 5 or 6 people.'],
            ['Inspection', 'The presenter is <b>not</b> the author; inspectors take the user\'s and tester\'s view.'],
            ['Standards', 'Mandatory; guidelines are not really mandatory. Reasons: reliability, readability / maintainability, portability.']
          ]} />
        `, { sec: t('Lecture 3: white box', 'محاضرة 3: الـ white box') }),
        page(html`
          <${H2}>${t('White box, dynamic side', 'الـ White box من الناحية الـ dynamic')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Checklist', 'فيه الـ data reference (variable مش initialized، أو برة حدود الـ array، أو off-by-one)، والـ data declaration، والـ computation (int مع float، أو long مع short، أو overflow، أو قسمة على صفر)، والـ comparison (<bdi dir="ltr">&lt;</bdi> بدل <bdi dir="ltr">&lt;=</bdi>)، والـ control flow، والـ input/output.'],
            ['الـ Dynamic WB', 'هو validation check: بنشغّل test cases وإحنا عارفين الـ code. الـ testing بيلاقي الـ bugs، والـ debugging بيصلحها.'],
            ['الـ Integration', 'بالـ bottom-up أو الـ top-down أو الـ umbrella approach.'],
            ['الـ Data coverage', 'الـ data flow والـ sub-boundaries والـ error forcing.'],
            ['الـ Code coverage', 'الـ statement (كل سطر مرة)، والـ path أو الـ branch (كل IF في الاتجاهين)، والـ condition (كل توافيق الأجزاء).'],
            ['الكريسماس', 'شرط فيه AND بين جزئين: الـ branch محتاج 2 tests، والـ condition محتاج 4:<span class="ltr">2 × 2 = 4</span>']
          ] : [
            ['Checklist', 'Data reference (uninitialized, out of bounds, off-by-one) · data declaration · computation (int + float, long + short, overflow, ÷ 0) · comparison (&lt; for &lt;=) · control flow · input/output.'],
            ['Dynamic WB', 'A validation check: run test cases knowing the code. Testing finds bugs; debugging fixes them.'],
            ['Integration', 'Bottom-up, top-down, umbrella approach.'],
            ['Data coverage', 'Data flow, sub-boundaries, error forcing.'],
            ['Code coverage', 'Statement (every line once) · path or branch (each IF both ways) · condition (every combination of the parts).'],
            ['Christmas', 'One AND of two parts: branch needs 2 tests, condition 4 (2 × 2).']
          ]} />
        `),
        page(html`
          <${H2}>${t('Run the four tests of full condition coverage', 'شغّل الـ 4 tests بتوع الـ full condition coverage')}</${H2}>
          <${Fig} name="qa-condition-coverage" />
        `),
        page(html`
          <${Box} kind="exam" title=${t('Quick check from the papers', 'اختبار سريع من الامتحانات')}><p className="hf-p small">${t('A question the doctors asked on this lecture.', 'سؤال الدكاترة سألوه على المحاضرة دي.')}</p></${Box}>
          ${mq('l3a', /^Which of the following stages do inspections come under\?$/, /Exam/)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The slide says "in C, zero is true and non-zero false". Real C is the opposite, but if the slide\'s sentence comes, answer <b>C</b>. "Bing Bang" is not on the slides: the integration strategy to pick is <b>Bottom-up</b>.',
            'الـ slide بتقول ‡ إن في C الصفر true وغير الصفر false. الحقيقة العكس، بس لو جملة الـ slide جت اختار <b>C</b>. والـ «Bing Bang» مش على الـ slides، فالـ integration strategy اللي تختارها هي <b>Bottom-up</b>.')}</p></${Box}>
        `),

        // ═════ 18–21 · Lecture 4
        page(html`
          <${Tag} lec=${true}>${Know(4)}</${Tag}>
          <${H2}>${t('Cyclomatic complexity', 'الـ Cyclomatic complexity')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ V(G)', 'هو عدد الـ independent (basis) paths، يعني عدد الـ tests للـ basis-path testing.'],
            ['تلات طرق', 'أول طريقة<span class="ltr">V(G) = E − N + 2P</span>والـ P عدد الـ connected parts وغالبًا 1. أو الـ predicate nodes زائد 1، أو عدد الـ regions (جوه وبرة).'],
            ['الـ foo()', 'فيها 6 nodes و 7 edges:<span class="ltr">7 − 6 + 2 = 3</span>والـ predicates هما 1 و 3 فبيبقى 3، واتنين regions جوه وواحد برة يبقى 3.'],
            ['الـ Basis paths', 'هما التلاتة دول:<span class="ltr">1-2-3-4-6 (2,0,0) · 1-3-4-6 (2,1,0) · 1-3-5-6 (0,0,0)</span>'],
            ['الفخ', 'الـ V(G) بيدي 3 tests للـ basis paths، بس الـ branch coverage لـ foo() محتاج 2 بس.'],
            ['الـ V-model', 'الشمال النازل هو الـ verification، واليمين الطالع هو الـ validation.']
          ] : [
            ['V(G)', 'The number of independent (basis) paths = the tests for basis-path testing.'],
            ['3 ways', 'E − N + 2P (P = connected parts, usually 1) · predicate nodes + 1 · regions (inner + outer).'],
            ['foo()', '6 nodes, 7 edges: 7 − 6 + 2 = 3; predicates 1 and 3 → 3; 2 inner + 1 outer regions → 3.'],
            ['Basis paths', '1-2-3-4-6 (2,0,0) · 1-3-4-6 (2,1,0) · 1-3-5-6 (0,0,0).'],
            ['Trap', 'V(G) = 3 basis-path tests, but branch coverage of foo() needs only 2.'],
            ['V-model', 'Left side down = verification; right side up = validation.']
          ]} />
        `, { sec: t('Lecture 4: V(G), triangle, OOP', 'محاضرة 4: الـ V(G) والمثلث والـ OOP') }),
        page(html`
          <${H2}>${t('The triangle and OOP testing', 'المثلث والـ OOP testing')}</${H2}>
          <${Kn} rows=${A ? [
            ['المثلث', 'فيه 3 subdomains (الـ scalene والـ isosceles والـ equilateral) و 2 errors (الـ not a triangle والـ bad inputs).'],
            ['التتبع', 'الـ IFs بتتنفذ بالترتيب و<b>آخر IF يطلع true هو اللي بيكسب</b>:<span class="ltr">(0,1,0): isosceles → not a triangle → bad inputs</span>'],
            ['غلطة ‡', 'الـ slide حاطة <bdi dir="ltr">(1,2,4)</bdi> و <bdi dir="ltr">(3,2,5)</bdi> في الـ bad inputs، بس الـ code بيطبع not a triangle.'],
            ['أقل set', 'من tests الـ slide، الـ statement محتاج 2 هما <bdi dir="ltr">(4,4,4) + (0,1,0)</bdi>، والـ branch محتاج 3 بزيادة <bdi dir="ltr">(3,4,5)</bdi>.'],
            ['الـ OO testing', 'الـ functional زي ما هو، والـ structural مختلف: لازم نختبر الـ interactions بين الـ methods.'],
            ['الـ MM', 'كل method call مرة على الأقل، و<b>مش بيـ subsume</b> الـ statement coverage. والـ stack فيه create و push و pop.'],
            ['الـ Function pair', 'كل sequences الـ methods اللي طولها 2، من الـ state machine. والـ stack فيه 14 pair منهم 3 errors.']
          ] : [
            ['Triangle', '3 subdomains (scalene, isosceles, equilateral) + 2 errors (not a triangle, bad inputs).'],
            ['Trace', 'The IFs run in order; <b>the last true IF wins</b>: (0,1,0) → isosceles → not a triangle → bad inputs.'],
            ['‡ Slip', 'The slide lists (1,2,4) and (3,2,5) as bad inputs, but the code prints not a triangle.'],
            ['Minimal sets', 'From the slide\'s tests: statement 2 = (4,4,4) + (0,1,0); branch 3 = add (3,4,5).'],
            ['OO testing', 'Functional tests unchanged; structural differs: test the interactions between methods.'],
            ['MM', 'Every method call at least once; does <b>not subsume</b> statement coverage. Stack: create, push, pop.'],
            ['Function pair', 'All method sequences of length 2, from the state machine. Stack: 14 pairs, 3 errors.']
          ]} />
        `),
        page(html`
          <${H2}>${t('foo() and its flow graph', 'الـ foo() والـ flow graph بتاعها')}</${H2}>
          <${Fig} name="qa-foo-cfg" />
        `),
        page(html`
          <${Box} kind="exam" title=${t('Quick check from the papers', 'اختبار سريع من الامتحانات')}><p className="hf-p small">${t('A midterm definition people mix up.', 'تعريف من الميدترم الناس بتلخبطه.')}</p></${Box}>
          ${mq('l4a', /^Cyclomatic Complexity is used to determine$/)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Stack → <b>create, push, pop</b> (Final). Queue → <b>create, insert, delete</b> (Midterm and written Q4). Never push and pop on a queue.',
            'الـ stack ليه <b>create و push و pop</b> (الفاينل)، والـ queue ليه <b>create و insert و delete</b> (الميدترم وسؤال Q4 المقالي). أوعى تكتب push و pop للـ queue.')}</p></${Box}>
        `),

        // ═════ 22–24 · Lecture 5
        page(html`
          <${Tag} lec=${true}>${Know(5)}</${Tag}>
          <${H2}>${t('Testing a web site', 'اختبار الـ web site')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ 13 element', 'الـ UI والـ instructions والـ site map والـ content والـ colors والـ images والـ tables والـ wrap-around والـ functionality والـ links والـ forms والـ data verification والـ cookies.'],
            ['الـ Black box', 'الـ text والـ hyperlinks والـ graphics والـ forms.'],
            ['الـ White box', 'الـ dynamic content والـ database-driven والـ programmatically created pages والـ server performance and loading والـ security.'],
            ['الـ Gray box', 'خليط الاتنين، بيعزل defects الـ design أو الـ implementation الوحش.'],
            ['الـ Config (7)', 'الـ CPU والـ RAM والـ graphics والـ video capture والـ audio والـ monitors والـ network cards.'],
            ['الـ Compat (5)', 'الـ font sizes والـ browsers مع الـ CSS والـ screen resolutions والـ memory sizes والـ network environments.']
          ] : [
            ['13 elements', 'UI, instructions, site map, content, colors, images, tables, wrap-around, functionality, links, forms, data verification, cookies.'],
            ['Black box', 'Text, hyperlinks, graphics, forms.'],
            ['White box', 'Dynamic content, database-driven pages, programmatically created pages, server performance and loading, security.'],
            ['Gray box', 'A mix of both; isolates defects from bad design or bad implementation.'],
            ['Config (7)', 'CPU, RAM, graphics, video capture, audio, monitors, network cards.'],
            ['Compat (5)', 'Font sizes, browsers with CSS, screen resolutions, memory sizes, network environments.']
          ]} />
        `, { sec: t('Lecture 5: web sites', 'محاضرة 5: الـ web sites') }),
        page(html`
          <${H2}>${t('Black, white and gray on one page', 'الـ black والـ white والـ gray في صفحة واحدة')}</${H2}>
          <${Fig} name="qa-box-views" />
        `),
        page(html`
          <${H3}>${t('Hardware configuration or compatibility?', 'الـ hardware configuration ولا الـ compatibility؟')}</${H3}>
          <${Sort} id="hwco" bins=${[['HW', 'Hardware configuration'], ['Co', 'Compatibility']]} items=${A ? [
            ['الـ RAM', 0], ['الـ Memory sizes', 1], ['الـ Screen resolutions', 1], ['الـ Video capture cards', 0], ['الـ Browsers مع الـ CSS', 1], ['الـ Network cards', 0], ['الـ Network environments', 1], ['الـ Monitors', 0]
          ] : [
            ['RAM', 0], ['Memory sizes', 1], ['Screen resolutions', 1], ['Video capture cards', 0], ['Browsers with CSS', 1], ['Network cards', 0], ['Network environments', 1], ['Monitors', 0]
          ]} />
        `),

        // ═════ 25–28 · Lecture 6
        page(html`
          <${Tag} lec=${true}>${Know(6)}</${Tag}>
          <${H2}>${t('Quality, SQA and SQC', 'الـ Quality والـ SQA والـ SQC')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Quality', 'هي conformance to requirements، يعني اللي الـ end-users بيقدّروه. الـ defects بتتقاس مباشرة، والـ maintainability والـ usability بشكل غير مباشر.'],
            ['الـ 8 factors', 'الـ Reliability (بيشتغل بدقة)، والـ Efficiency (الـ resources)، والـ Integrity (الـ access والـ security)، والـ Usability (التعلم والتشغيل)، والـ Maintainability (نلاقي الـ errors ونصلحها)، والـ Flexibility (نغيّره)، والـ Portability (ننقله)، والـ Reusability (نعيد استخدام أجزاء).'],
            ['الـ SQA والـ SQC', 'الـ SQA هو prevention على الـ process (proactive)، والـ SQC هو detection على الـ product (reactive).'],
            ['الـ Testing والـ QA', 'الـ testing جزء من الـ SQA، بيكتشف الـ bugs ويعمله الـ testers. والـ QA أوسع، بيمنع الـ defects ويستخدم الـ ISO والـ CMM.'],
            ['الـ Tester', 'يلاقي الـ bugs <b>ويتأكد إنها اتصلحت</b>: يشيل مسؤوليتها ويتابعها ويقنع الـ developers.'],
          ] : [
            ['Quality', 'Conformance to requirements: what end-users value. Defects are directly measurable; maintainability and usability indirectly.'],
            ['8 factors', 'Reliability (works accurately) · Efficiency (resources) · Integrity (access, security) · Usability (learn, operate) · Maintainability (find and fix errors) · Flexibility (change it) · Portability (move it) · Reusability (reuse parts).'],
            ['SQA vs SQC', 'SQA = prevention on the process (proactive); SQC = detection on the product (reactive).'],
            ['Testing vs QA', 'Testing is part of SQA: detects bugs, done by testers. QA is broader: prevents defects, uses ISO and CMM.'],
            ['Tester', 'Finds bugs <b>and makes sure they get fixed</b>: owns them, tracks them, convinces developers.']
          ]} />
        `, { sec: t('Lecture 6: SQA', 'محاضرة 6: الـ SQA') }),
        page(html`
          <${H2}>${t('Teams, metrics and indicators', 'الـ teams والـ metrics والـ indicators')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Test teams', 'الـ small team تحت الـ dev manager، والـ independent team تحت الـ project manager، أو team بيبلّغ الـ executive management (QA مستقل).'],
            ['الـ Metrics', 'هي rules بتقيس attributes (حجم الـ code والـ complexity). الـ product metrics زي حجم الـ code، والـ process metrics زي الوقت والـ methodology.'],
            ['الـ 9 metrics', 'الـ code coverage، والـ bugs per line of code، والـ cyclomatic complexity، والـ function point analysis، وعدد الـ classes والـ interfaces، والـ cohesion، والـ coupling، والـ order of growth، والـ source lines of code.'],
            ['الـ Indicators', 'هي variables بتعكس نتايج الـ process: الـ progress والـ stability والـ process compliance والـ quality evaluation effort والـ defect detection efficiency والـ defect removal rate والـ defect age profile والـ defect density والـ complexity.'],
            ['الـ Removal والـ age', 'الـ removal rate هو اللي اتكشف <b>واتحل</b>، والـ age profile هو اللي <b>ماتحلش</b>.']
          ] : [
            ['Test teams', 'Small team under the dev manager (fast, but reports can be ignored) · independent team under the project manager (the PM decides) · reporting to executive management (independent QA).'],
            ['Metrics', 'Rules that measure attributes (code size, complexity). Product: code size, pages; process: time, methodology.'],
            ['9 metrics', 'Code coverage, bugs per line of code, cyclomatic complexity, function point analysis, number of classes and interfaces, cohesion, coupling, order of growth, source lines of code.'],
            ['Indicators', 'Variables reflecting outcomes: progress, stability, process compliance, quality evaluation effort, defect detection efficiency, defect removal rate, defect age profile, defect density, complexity.'],
            ['Removal vs age', 'Removal rate = detected <b>and resolved</b>; age profile = <b>not</b> resolved.']
          ]} />
        `),
        page(html`
          <${H2}>${t('SQA prevents, SQC detects', 'الـ SQA بيمنع، والـ SQC بيكتشف')}</${H2}>
          <${Fig} name="qa-sqa-sqc" />
        `),
        page(html`
          <${H3}>${t('Which quality factor? (our scenarios)', 'أنهي quality factor؟ (مواقف من عندنا)')}</${H3}>
          <${Match} id="fct" left=${['Reliability', 'Maintainability', 'Flexibility', 'Portability', 'Integrity']}
            right=${A ? ['ننقل الـ app من Windows لـ Linux', 'نلاقي error ونصلحه بسرعة', 'المديرين بس يفتحوا الـ payroll', 'نزوّد نوع report جديد بمجهود قليل', 'إجمالي الفاتورة بيطلع صح دايمًا']
              : ['Move the app from Windows to Linux', 'Locate and fix an error quickly', 'Only managers can open the payroll', 'Add a new report type with little effort', 'The invoice total is always right']}
            answer=${[4, 1, 3, 0, 2]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Both papers: the tester finds bugs <b>and makes sure they get fixed</b>; the best product or services → <b>Quality Assurance</b>.', 'في الورقتين: الـ tester بيلاقي الـ bugs <b>ويتأكد إنها اتصلحت</b>، وأحسن product أو services هي <b>Quality Assurance</b>.')}</p></${Box}>
        `),

        // ═════ 29–32 · Lecture 7
        page(html`
          <${Tag} lec=${true}>${Know(7)}</${Tag}>
          <${H2}>${t('The Capability Maturity Model', 'الـ Capability Maturity Model')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ CMM', 'هو framework بيقيّم ويحسّن الـ maturity بتاعة الـ software process في الشركة، من الـ SEI و Carnegie Mellon للـ U.S. Department of Defense.'],
            ['الطلوع', 'فيه 5 levels بتطلعهم واحدة واحدة <b>من غير ما تنط</b>، وبيتستخدم للتقييم وللتحسين.'],
            ['الـ 6 components', 'الـ maturity levels، والـ process capability، والـ key process areas (KPA)، والـ goals، والـ common features، والـ key practices.'],
            ['الـ 5 levels', 'الأول <b>Initial</b> (ad-hoc و reactive)، والتاني <b>Repeatable</b> (project management)، والتالت <b>Defined</b> (process موحد و training)، والرابع <b>Quantitatively Managed</b> (تحكم إحصائي)، والخامس <b>Optimizing</b> (تحسين مستمر).'],
            ['الأسهم', 'من 1 لـ 2 basic management control، ومن 2 لـ 3 process definition، ومن 3 لـ 4 process measurement، ومن 4 لـ 5 process control.']
          ] : [
            ['CMM', 'A framework to assess and improve the maturity of a company\'s software process; SEI and Carnegie Mellon, for the U.S. Department of Defense.'],
            ['The climb', '5 incremental levels, <b>no skipping</b>; used for evaluation and improvement.'],
            ['6 components', 'Maturity levels · process capability · key process areas (KPA) · goals · common features · key practices.'],
            ['5 levels', '1 <b>Initial</b> (ad-hoc, reactive) · 2 <b>Repeatable</b> (project management) · 3 <b>Defined</b> (one standard process, training) · 4 <b>Quantitatively Managed</b> (statistical control) · 5 <b>Optimizing</b> (continuous improvement).'],
            ['Arrows', '1→2 basic management control · 2→3 process definition · 3→4 process measurement · 4→5 process control.']
          ]} />
        `, { sec: t('Lecture 7: CMM, ISO, SPICE', 'محاضرة 7: الـ CMM والـ ISO') }),
        page(html`
          <${H2}>${t('ISO 9000, IEEE and SPICE', 'الـ ISO 9000 والـ IEEE والـ SPICE')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ ISO 9000', 'هي standards دولية و generic جدًا (لأي organization). كلمة ISO من اليوناني isos يعني متساوي. فيه <b>20 element</b> كل واحد موثّق.'],
            ['الـ 8 principles', 'الـ customer focus، والـ leadership، والـ involvement of people، والـ process approach، والـ system approach to management، والـ continuous improvement، والـ factual decision making، والـ mutually beneficial supplier relationships.'],
            ['الـ IEEE', 'بيعمل standards من سنة <bdi dir="ltr">1976</bdi>.'],
            ['الـ SPICE', 'اختصار Software Process Improvement for Capability Determination، وهو الـ <bdi dir="ltr">ISO/IEC 15504</bdi> من الـ ISO والـ IEC سنة <bdi dir="ltr">1993</bdi>، وليه 3 objectives.'],
            ['الأربعة', 'الـ CMM هو طريقة التقييم المفضلة، والـ ISO 9000 فيه 20 element، والـ 6 Sigma فيه zero defects و 3.4 في المليون، والـ SPICE هو <bdi dir="ltr">ISO/IEC 15504</bdi>.']
          ] : [
            ['ISO 9000', 'International, highly generic standards (any organization). ISO from Greek isos = equal. <b>20 elements</b>, each documented.'],
            ['8 principles', 'Customer focus, leadership, involvement of people, process approach, system approach to management, continuous improvement, factual decision making, mutually beneficial supplier relationships.'],
            ['IEEE', 'Standards since 1976.'],
            ['SPICE', 'Software Process Improvement for Capability Determination: ISO/IEC 15504, from ISO and IEC, 1993; 3 objectives.'],
            ['The four', 'CMM = the preferred evaluation method · ISO 9000 = 20 elements · 6 Sigma = zero defects, 3.4 per million · SPICE = ISO/IEC 15504.']
          ]} />
        `),
        page(html`
          <${H2}>${t('The five levels of CMM', 'الـ 5 levels بتوع الـ CMM')}</${H2}>
          <${Fig} name="qa-cmm-levels" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Say the number, then tap', 'قول الرقم، وبعدين دوس')}><p className="hf-p small">${t('Every count this lecture can ask.', 'كل الأعداد اللي المحاضرة دي ممكن تسأل فيها.')}</p></${Box}>
          <${Nums} id="nums" cards=${[['CMM levels', 'الـ levels بتوع الـ CMM', 5], ['CMM components', 'الـ components بتوع الـ CMM', 6], ['KPA aspects', 'الـ aspects بتوع الـ KPA', 5], ['ISO 9000 elements', 'الـ elements بتوع الـ ISO', 20],
            ['ISO principles', 'الـ principles بتوع الـ ISO', 8], ['SPICE objectives', 'الـ objectives بتوع الـ SPICE', 3], ['IEEE standards since', 'الـ IEEE شغال من سنة', 1976], ['SPICE introduced', 'الـ SPICE اتقدم سنة', 1993]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Fill the blank: "preferred software method of evaluation" → <b>CMM</b>; "20 crucial elements" → <b>ISO 9000</b>.', 'كمّل الفراغ: «طريقة التقييم المفضلة» هي الـ <b>CMM</b>، و«20 element» هي الـ <b>ISO 9000</b>.')}</p></${Box}>
        `),

        // ═════ 33–36 · Lecture 8
        page(html`
          <${Tag} lec=${true}>${Know(8)}</${Tag}>
          <${H2}>${t('Six Sigma and σ', 'الـ Six Sigma والـ σ')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ Six Sigma', 'مفهوم في الـ total quality management من أواخر السبعينات وأوائل التمانينات: method منظم و statistical management system.'],
            ['الهدف', 'بيقلل الـ process variation لحد <b>3.4 defects في المليون</b> أو أقل، والهدف zero defects (الـ slide والامتحان كاتبين <bdi dir="ltr">"zero default"</bdi>).'],
            ['الـ σ', 'الـ standard deviation، يعني التشتت عن الهدف:<span class="ltr">σ = √variance</span>'],
            ['المنحنى', 'النسبة اللي جوه الحدود:<span class="ltr">±1σ 68.27% · ±2σ 95.45% · ±3σ 99.73% (2,700 ppm) · ±6σ 99.9999998%</span>'],
            ['قيمة الـ six sigma', 'هي 6 في الـ σ:<span class="ltr">X1: 6 × 1.22 = 7.32 · overall: 6 × 1.07 = 6.42</span>'],
            ['الدقة', 'دقة الـ six sigma process (الميدترم):<span class="ltr">100% − 3.4 per million = 99.99966%</span>']
          ] : [
            ['Six Sigma', 'A TQM concept from the late 1970s and early 1980s: a systematic method and a statistical management system.'],
            ['Target', 'Cuts process variation to <b>3.4 defects per million</b> or less; aim zero defects ("zero default" on the slide and the paper).'],
            ['σ', 'Standard deviation, the dispersion from the target: σ = √variance.'],
            ['The curve', '±1σ 68.27% · ±2σ 95.45% · ±3σ 99.73% (2,700 ppm out) · ±6σ 99.9999998%.'],
            ['Six sigma value', '6 × σ: X1 6 × 1.22 = 7.32; overall 6 × 1.07 = 6.42.'],
            ['Accuracy', '100% − 3.4 per million = <b>99.99966%</b> (midterm).']
          ]} />
        `, { sec: t('Lecture 8: Six Sigma', 'محاضرة 8: الـ Six Sigma') }),
        page(html`
          <${H2}>${t('DMAIC, belts and tools', 'الـ DMAIC والـ belts والأدوات')}</${H2}>
          <${Kn} rows=${A ? [
            ['الـ DMAIC', 'الـ <b>Define</b> (المشكلة بالـ level والمكان والفلوس، و team)، وبعدين الـ <b>Measure</b> (مقارنة باحتياج العميل)، وبعدين الـ <b>Analyze</b> (الـ root causes)، وبعدين الـ <b>Improve</b> (نغيّر ونجرب على sample)، وبعدين الـ <b>Control</b> (نراقب ومنبطلش).'],
            ['الـ DMADV', 'هو Define و Measure و Analyze و Design و Verify، للـ processes الجديدة (‡ مش على الـ slides).'],
            ['المبادئ', 'العملاء، والحقايق والـ data، والعمليات الداخلية، والتخطيط المسبق، و teamwork من غير منافسة.'],
            ['المراحل', 'نختار المشاريع، ونحط ناس عندهم خبرة، ونكتب document، ونعمل training، وننفذ، ونقدّم الحلول.'],
            ['الـ Belts', 'من الـ White للـ Yellow (كل الموظفين) للـ Green (الـ executives) للـ Black (الإدارة الوسطى والعليا) للـ Master Black (الإدارة العليا).'],
            ['الأدوات', 'الـ 5S والـ Seven Wastes والـ value stream mapping والـ visual workspace والـ VOC والـ Kaizen والـ Kanban والـ regression analysis.']
          ] : [
            ['DMAIC', '<b>Define</b> (problem: level, location, money; a team) → <b>Measure</b> (vs customer needs) → <b>Analyze</b> (root causes) → <b>Improve</b> (change, test on a sample) → <b>Control</b> (monitor, never stop).'],
            ['DMADV', 'Define, Measure, Analyze, Design, Verify: for new processes (‡ not on the slides).'],
            ['Principles', 'Customers, facts and data, internal operations, advance planning, teamwork without competition.'],
            ['Phases', 'Select projects · assign experienced staff · written document · training · implement · submit solutions.'],
            ['Belts', 'White → Yellow (all employees) → Green (executives) → Black (middle and senior) → Master Black (senior management).'],
            ['Tools', '5S, Seven Wastes, value stream mapping, visual workspace, VOC, Kaizen, Kanban, regression analysis.']
          ]} />
        `),
        page(html`
          <${H2}>${t('DMAIC step by step', 'الـ DMAIC خطوة بخطوة')}</${H2}>
          <${Fig} name="qa-dmaic" />
        `),
        page(html`
          <${H3}>${t('Six Sigma tool or not?', 'أداة Six Sigma ولا لأ؟')}</${H3}>
          <${Sort} id="tools" bins=${[['6σ', 'Six Sigma tool'], ['No', 'Not a Six Sigma tool']]} items=${A ? [
            ['الـ Kaizen', 0], ['الـ Selenium (من م5)', 1], ['الـ Kanban', 0], ['الـ Peer review (من م3)', 1], ['الـ Voice of Customer', 0], ['الـ Function pair (من م4)', 1], ['الـ 5S', 0], ['الـ SPICE (من م7)', 1]
          ] : [
            ['Kaizen', 0], ['Selenium (L5)', 1], ['Kanban', 0], ['Peer review (L3)', 1], ['Voice of Customer', 0], ['Function pair (L4)', 1], ['5S', 0], ['SPICE (L7)', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('‡ The lecture says Seven Wastes, not 8.', 'الأداة اسمها Seven Wastes مش 8 ‡.')}</${Hand}>
        `),

        // ═════ 37 · the problems that always come up
        page(html`
          <${H1}>${t('The problems that always come up', 'المسائل اللي بتيجي كل مرة')}</${H1}>
          <${P} small=${true}>${X('Every written question of the Final 2025/26, plus the MCQs you have to calculate. Each one: the paper\'s numbers first, then a fresh variant of ours.', 'كل سؤال مقالي في فاينل 2025/26، ومعاهم الـ MCQ اللي محتاجة حساب. كل واحدة: أرقام الورقة الأول، وبعدين نسخة جديدة من عندنا.')}</${P}>
          <dl className="hf-qaF-pleg hf-in">
            <dt>Q5(a)</dt><dd>${t('Branch and condition coverage', 'الـ Branch والـ condition coverage')}</dd>
            <dt>Q1</dt><dd>${t('Statement coverage: pick the input (#13–15)', 'الـ Statement coverage: اختار الـ input (من 13 لـ 15)')}</dd>
            <dt>Q5(c)</dt><dd>${t('The triangle: function tests and statement coverage', 'المثلث: الـ function tests والـ statement coverage')}</dd>
            <dt>Q4(a)</dt><dd>${t('Method message and function pairs of a queue', 'الـ Method message والـ function pairs لـ queue')}</dd>
            <dt>Q4(b)</dt><dd>${t('Web elements: black, gray and white box', 'عناصر الـ web: الـ black والـ gray والـ white box')}</dd>
            <dt>Q2(a)</dt><dd>${t('The levels of CMM', 'الـ levels بتوع الـ CMM')}</dd>
            <dt>Q2(b)</dt><dd>${t('The 6 sigma methodology, and its numbers', 'الـ 6 sigma methodology وأرقامها')}</dd>
            <dt>Q3(a)</dt><dd>${t('The 20 elements of ISO 9000', 'الـ 20 element بتوع الـ ISO 9000')}</dd>
            <dt>Q3(b)</dt><dd>${t('The common quality metrics', 'الـ common quality metrics')}</dd>
            <dt>Q1</dt><dd>${t('Boundary values (#12, and the midterm)', 'الـ Boundary values (رقم 12، والميدترم)')}</dd>
            <dt>${t('Mid', 'ميد')}</dt><dd>${t('Cyclomatic complexity', 'الـ Cyclomatic complexity')}</dd>
          </dl>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Pencil out. Fill each table <b>before</b> you press Show.', 'طلّع القلم. املا كل جدول <b>قبل</b> ما تدوس اعرض الحل.')}</${Talk}>
        `, { sec: t('The problems', 'المسائل') }),

        // ═════ 38–40 · Q5(a)
        page(html`
          <${Tag}>${t('Final 2025/26 · Q5(a) · Q5 = 10 marks', 'فاينل 2025/26 · Q5(a) · السؤال بـ 10 درجات')}</${Tag}>
          <${H2}>${t('Branch and condition coverage', 'الـ Branch والـ condition coverage')}</${H2}>
          <${P} small=${true}>${X('"Write all test cases to achieve Branch and Condition coverage of the next code."', 'المطلوب:<span class="ltr">"Write all test cases to achieve Branch and Condition coverage of the next code."</span>')}</${P}>
          <${Code} lines=${['<b>1</b>: PRINT "Hello World"', '<b>2</b>: IF Date$ = "01-01-2026" AND', '       Time$ = "00:00:00" THEN', '<b>3</b>: PRINT "Happy New Year"', '<b>4</b>: END IF', '<b>5</b>: PRINT "The date is: "; Date$', '<b>6</b>: PRINT "The time is: "; Time$', '<b>7</b>: END']} />
          <${Meth} items=${A ? [
            'قسّم شرط الـ IF لجزئين: الـ Date$ والـ Time$، وبينهم AND.',
            'الـ <b>Branch</b>: test يخلي الـ IF يبقى true و test يخليه false، يعني <b>2</b>.',
            'الـ <b>Condition</b> (زي المحاضرة): كل توافيق الجزئين، <bdi dir="ltr">2 × 2</bdi> يعني <b>4</b>.',
            'لكل test اكتب السطور: بس الـ true/true بيشغّل 3 و 4.'
          ] : [
            'Split the IF into its two parts, Date$ and Time$, joined by AND.',
            '<b>Branch</b>: one test makes the IF true, one makes it false → <b>2</b>.',
            '<b>Condition</b> (the lecture\'s way): every combination of the parts, 2 × 2 → <b>4</b>.',
            'For each test write the lines it runs: only true/true runs 3 and 4.'
          ]} />
        `, { sec: t('Q5(a) branch and condition', 'سؤال Q5(a) الـ branch والـ condition') }),
        page(html`
          <${H2}>${t('Your turn: the New Year table', 'دورك: جدول رأس السنة')}</${H2}>
          <${Suite} id="ny" rows=${NY} heads=${['Date$', 'Time$']} cond='Date$ = "01-01-2026" AND Time$ = "00:00:00"' />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Condition coverage = <b>all 4 combinations</b>, as in the lecture\'s Christmas table.', 'الـ condition coverage هنا هي <b>الـ 4 توافيق كلهم</b> زي جدول الكريسماس.')}</p></${Box}>
        `),
        page(html`
          <${Tag} ours=${true}>${t('Variant · ours', 'نسخة تانية · من عندنا')}</${Tag}>
          <${Code} lines=${['<b>1</b>: PRINT "Result"', '<b>2</b>: IF Score>=50 AND Att>=75 THEN', '<b>3</b>:   PRINT "Pass"   <b>4</b>: END IF', '<b>5</b>: PRINT Score  <b>6</b>: PRINT Att  <b>7</b>: END']} />
          <${Suite} id="sc" rows=${SC} heads=${['Score', 'Att']} cond="Score >= 50 AND Att >= 75" />
        `),

        // ═════ 41–43 · Q1 #13–15 statement coverage
        page(html`
          <${Tag}>${t('Final 2025/26 · Q1 #13–15 · Midterm 2026/27', 'فاينل 2025/26 · Q1 من 13 لـ 15 · ميدترم 2026/27')}</${Tag}>
          <${Code} lines=${['if (X>1) and (Y=0) then <b>A=A/X</b>;', 'if (X=2) or (A>1) then <b>A=A+1</b>;']} />
          <${P} small=${true}>${X('Be the CPU: Q1 #15\'s three inputs, plus X=3, Y=1, A=1 of ours. Does each THEN run?', 'إنت الـ CPU: الـ inputs بتوع رقم 15 وواحد زيادة.')}</${P}>
          <${Cpu} id="cpu" rows=${CPU_EX} heads=${['A=A/X', 'A=A+1']} />
        `, { sec: t('Q1 statement coverage', 'سؤال Q1 الـ statement coverage') }),
        page(html`
          <${Meth} items=${A ? [
            'الـ statement coverage معناها إن <b>كل</b> statement بعد THEN تتنفذ مرة على الأقل.',
            'مع الـ <b>AND</b> لازم الجزئين يبقوا true، ومع الـ <b>OR</b> واحد كفاية، فغالبًا الإجابة <b>All answers</b>.',
            'لو فيه IF-ين امشي بالترتيب: أول IF ممكن يغيّر الـ A قبل ما التاني يتشيك.'
          ] : [
            'Statement coverage: <b>every</b> THEN statement runs at least once.',
            'With <b>AND</b> both parts must be true; with <b>OR</b> one is enough, so the answer is often <b>All answers</b>.',
            'With two IFs, trace in order: the first IF can change A before the second is tested.'
          ]} />
          ${mq('sc1', /^if \(X=2\) or \(y&gt;1\) then A=A\+1; the statement-coverage test cases are:$/)}
          <${Grow} />
          <${Hand} red=${true}>${t('X=2 or y>1: (2,0), (2,2) and (1,2) all make it true.', 'الـ X=2 or y>1: الـ (2,0) والـ (2,2) والـ (1,2) كلهم بيخلّوه true.')}</${Hand}>
        `),
        page(html`
          <${Tag} ours=${true}>${t('Variant · ours', 'نسخة تانية · من عندنا')}</${Tag}>
          <${Code} lines=${['if (X<5) and (Y>0) then <b>B=B*2</b>;', 'if (X=0) or (B>10) then <b>B=B-1</b>;']} />
          <${Cpu} id="cpu2" rows=${CPU_OURS} heads=${['B=B*2', 'B=B-1']} />
        `),

        // ═════ 44–47 · Q5(c) triangle
        page(html`
          <${Tag}>${t('Final 2025/26 · Q5(c)', 'فاينل 2025/26 · Q5(c)')}</${Tag}>
          <${H2}>${t('The triangle: function tests and statement coverage', 'المثلث: الـ function tests والـ statement coverage')}</${H2}>
          <${Code} lines=${['<b>A</b> read a,b,c;', '<b>B</b> type = "scalene";', '<b>C</b> if (a==b or a==c or b==c)', '<b>D</b>    type = "isosceles";', '<b>E</b> if (a==b and a==c)', '<b>F</b>    type = "equilateral";', '<b>G</b> if (a>=b+c or b>=a+c or c>=a+b)', '<b>H</b>    type = "not a triangle";', '<b>I</b> if (a<=0 or b<=0 or c<=0)', '<b>J</b>    type = "bad inputs";', '<b>K</b> print type;']} />
          <${Meth} items=${A ? [
            'الـ <b>Function testing</b> (black box): test لكل subdomain من الخمسة، ومعاه الـ expected output.',
            'الـ <b>Statement coverage</b> (white box): كل سطر من A لـ K يتنفذ. السطور اللي ممكن تتخطّى هي D و F و H و J بس.',
            'آخر IF يطلع true هو اللي بيحدد الـ output.'
          ] : [
            '<b>Function testing</b> (black box): one test per subdomain, five in all, each with its expected output.',
            '<b>Statement coverage</b> (white box): every line A–K runs. Only D, F, H and J can be skipped.',
            'The last true IF decides the output.'
          ]} />
        `, { sec: t('Q5(c) the triangle', 'سؤال Q5(c) المثلث') }),
        page(html`
          <${Box} kind="pencil" title=${t('Be the tester: which subdomain?', 'إنت الـ tester: أنهي subdomain؟')}><p className="hf-p small">${X('Run the pseudocode in your head. <b>S</b> scalene, <b>I</b> isosceles, <b>E</b> equilateral, <b>N</b> not a triangle, <b>B</b> bad inputs.', 'شغّل الـ pseudocode في دماغك. الـ <b>S</b> يعني scalene، والـ <b>I</b> isosceles، والـ <b>E</b> equilateral، والـ <b>N</b> not a triangle، والـ <b>B</b> bad inputs.')}</p></${Box}>
          <${Sort} id="tri" bins=${[['S', 'scalene'], ['I', 'isosceles'], ['E', 'equilateral'], ['N', 'not a triangle'], ['B', 'bad inputs']]} items=${[
            ['(3,4,5)', 0], ['(5,8,5)', 1], ['(5,5,5)', 2], ['(6,4,2)', 3], ['(0,0,0)', 4], ['(1,2,4)', 3], ['(8,8,5)', 1], ['(−1,2,4)', 4]
          ]} />
        `),
        page(html`
          <${H2}>${t('Statement coverage from the lecture\'s table', 'الـ Statement coverage من جدول المحاضرة')}</${H2}>
          <${TriCov} id="tc1" tests=${['3,4,5', '3,5,3', '0,1,0', '4,4,4']} runs=${['', 'D', 'DHJ', 'DF']} min=${[2, 3]}
            branch=${t('Right: <b>(4,4,4) + (0,1,0)</b> run every line A–K. For <b>branch</b> coverage add (3,4,5), the only test that makes the first IF false: 3 tests.', 'صح: <bdi dir="ltr"><b>(4,4,4) + (0,1,0)</b></bdi> بيشغّلوا كل السطور من A لـ K. وللـ <b>branch</b> coverage زوّد <bdi dir="ltr">(3,4,5)</bdi>، لأنها الوحيدة اللي بتخلي أول IF يبقى false: يعني 3 tests.')} />
          <${Grow} />
          <${Hand}>${t('With any inputs allowed, (0,0,0) alone runs every statement.', 'ولو أي input مسموح، الـ (0,0,0) لوحدها بتشغّل كل الـ statements.')}</${Hand}>
        `),
        page(html`
          <${Tag} ours=${true}>${t('Variant · ours', 'نسخة تانية · من عندنا')}</${Tag}>
          <${P} small=${true}>${X('A new test table for the same pseudocode. Same two jobs.', 'جدول tests جديد لنفس الـ pseudocode، ونفس المطلوب.')}</${P}>
          <${TriCov} id="tc2" tests=${['2,2,3', '5,6,7', '7,7,7', '1,1,5', '0,4,5']} runs=${['D', '', 'DF', 'DH', 'HJ']} min=${[2, 4]}
            branch=${t('Right, and a bonus: <b>(7,7,7) + (0,4,5)</b> also give <b>branch</b> coverage. Every IF is true in one of them and false in the other.', 'صح، وكمان: <bdi dir="ltr"><b>(7,7,7) + (0,4,5)</b></bdi> بيعملوا <b>branch</b> coverage برضه، لأن كل IF بيبقى true في واحدة و false في التانية.')} />
        `),

        // ═════ 48–51 · Q4(a) the queue
        page(html`
          <${Tag}>${t('Final 2025/26 · Q4(a) · Q4 = 10 marks', 'فاينل 2025/26 · Q4(a) · السؤال بـ 10 درجات')}</${Tag}>
          <${H2}>${t('Method message and function pairs of the Queue', 'الـ Method message والـ function pairs للـ Queue')}</${H2}>
          <div className="hf-in" dir="ltr"><${QueueSvg} /></div>
          <${MMPick} id="mm" opts=${['push', 'create', 'delete', 'pop', 'insert']} ans=${['create', 'insert', 'delete']} />
        `, { sec: t('Q4(a) the queue', 'سؤال Q4(a) الـ queue') }),
        page(html`
          <${P} small=${true}>${X('E empty · N normal · F full. Second call OK?', 'الـ E يعني empty والـ N normal والـ F full.')}</${P}>
          <${Pairs} id="qp" rows=${QPAIRS} />
        `),
        page(html`
          <${Tag} ours=${true}>${t('Variant · ours', 'نسخة تانية · من عندنا')}</${Tag}>
          <${P} small=${true}>${X('A stack that holds <b>one</b> item: states Empty and Full only. Push: Empty → Full, error on Full. Pop: Full → Empty, error on Empty. It has 6 pairs.', 'فيه stack بيشيل عنصر <b>واحد</b> بس: فيه state الـ Empty والـ Full بس. الـ push بيودّي من Empty لـ Full، و error لو Full. والـ pop بيودّي من Full لـ Empty، و error لو Empty. فيه 6 pairs.')}</${P}>
          <${Pairs} id="sp" rows=${S1PAIRS} />
        `),
        page(html`
          ${mq('qmm', /in Queue testing/)}
          <${Grow} />
          <${Hand} red=${true}>${t('Queue: create, insert, delete. Stack: create, push, pop.', 'الـ queue ليه create و insert و delete، والـ stack ليه create و push و pop.')}</${Hand}>
        `),

        // ═════ 52–53 · Q4(b) the web
        page(html`
          <${Tag}>${t('Final 2025/26 · Q4(b)', 'فاينل 2025/26 · Q4(b)')}</${Tag}>
          <${P} small=${true}>${t('Which box tests each element most easily?', 'أنهي box بيختبر كل element بسهولة؟')}</${P}>
          <${Sort} id="bw" bins=${[['BB', 'black box'], ['WB', 'white box']]} items=${A ? [
            ['الـ Text', 0], ['الـ Dynamic content', 1], ['الـ Hyperlinks', 0], ['الـ Database-driven pages', 1], ['الـ Graphics', 0], ['الـ Programmatically created pages', 1], ['الـ Forms', 0], ['الـ Server performance and loading', 1], ['الـ Security', 1]
          ] : [
            ['Text', 0], ['Dynamic content', 1], ['Hyperlinks', 0], ['Database-driven pages', 1], ['Graphics', 0], ['Programmatically created pages', 1], ['Forms', 0], ['Server performance and loading', 1], ['Security', 1]
          ]} />
        `, { sec: t('Q4(b) web boxes', 'سؤال Q4(b) الـ web') }),
        page(html`
          <${Reveal} id="gray" label=${t('Show the answer to part 2 (why gray box?)', 'اعرض إجابة الجزء 2 (ليه gray box؟)')}>
            <div className="hf-def">${X('Web pages are built from <b>HTML and scripts</b> the tester can see while still testing from the user\'s side, so black box and white box mix. The purpose: to <b>isolate defects related to bad design or bad implementation</b> of the web.',
              'الـ web pages معمولة بـ <b>HTML و scripts</b> الـ tester يقدر يشوفها وهو بيختبر من ناحية الـ user، فالـ black box والـ white box بيتخلطوا. والهدف إنه <b>يعزل الـ defects اللي جاية من design أو implementation وحش</b> للـ web.')}</div>
          </${Reveal}>
          <${Tag} ours=${true}>${t('Variant · ours: black, white or gray?', 'نسخة تانية · من عندنا: black ولا white ولا gray؟')}</${Tag}>
          <${Sort} id="bwg" bins=${[['BB', 'black box'], ['WB', 'white box'], ['GB', 'gray box']]} items=${A ? [
            ['الـ form يرفض password من 5 حروف', 0], ['نعمل simulation لملايين زوار في نفس الوقت', 1],
            ['نفتح الـ HTML source نشوف ليه صورة مش بتظهر، ونجرب تاني من ناحية الـ user', 2], ['الـ banner بيتغير مع وقت اليوم', 1]
          ] : [
            ['The form rejects a 5-character password', 0], ['Simulate millions of visitors at once', 1],
            ['Read the HTML source to see why a picture fails, then retest from the user\'s side', 2], ['The banner changes with the time of day', 1]
          ]} />
        `),

        // ═════ 54–55 · Q2(a) CMM
        page(html`
          <${Tag}>${t('Final 2025/26 · Q2(a) · Q2 = 10 marks', 'فاينل 2025/26 · Q2(a) · السؤال بـ 10 درجات')}</${Tag}>
          <${H2}>${t('Briefly discuss the levels of CMM', 'اشرح باختصار الـ levels بتوع الـ CMM')}</${H2}>
          <${P} small=${true}>${X('Step one: the names in order, from Level 1 up.', 'أول خطوة: الأسامي بالترتيب، من Level 1 لفوق.')}</${P}>
          <${Order} id="cmm" items=${['Initial', 'Repeatable', 'Defined', 'Quantitatively Managed', 'Optimizing']} shuf=${[3, 0, 4, 2, 1]} numbered=${true} />
          <${Grow} />
          <${Hand} red=${true}>${t('One line per level; no level can be skipped. Level 4 is Quantitatively Managed (the figure says just "Managed").', 'سطر لكل level، ومفيش level بيتنط. والـ Level 4 اسمه Quantitatively Managed (الشكل بيقول Managed بس).')}</${Hand}>
        `, { sec: t('Q2(a) CMM levels', 'سؤال Q2(a) الـ CMM') }),
        page(html`
          <${H3}>${t('Step two: which level is this?', 'تاني خطوة: ده أنهي level؟')}</${H3}>
          <${Sort} id="lvl" bins=${[['1', 'Initial'], ['2', 'Repeatable'], ['3', 'Defined'], ['4', 'Quantitatively Managed'], ['5', 'Optimizing']]} items=${A ? [
            ['الـ processes بتبقى ad-hoc و reactive', 0], ['بنعمل plan و track للمشاريع وندير الـ suppliers', 1], ['فيه process واحد standard للشركة كلها و training', 2], ['تحكم إحصائي و capability baselines', 3], ['تحسين مستمر وبنشيل أسباب الـ defects', 4],
            ['اسمه في الشكل: process management', 2], ['اسمه في الشكل: change management', 4]
          ] : [
            ['Processes are ad-hoc and reactive', 0], ['Projects planned and tracked; suppliers managed', 1], ['One standard process, organization-wide training', 2], ['Statistical control, capability baselines', 3], ['Continuous improvement; remove causes of defects', 4],
            ['Figure label: process management', 2], ['Figure label: change management', 4]
          ]} />
        `),

        // ═════ 56–57 · Q2(b) Six Sigma
        page(html`
          <${Tag}>${t('Final 2025/26 · Q2(b)', 'فاينل 2025/26 · Q2(b)')}</${Tag}>
          <${H2}>${t('Discuss 6 sigma methodology', 'اشرح الـ 6 sigma methodology')}</${H2}>
          <${Def}>${X('Open with: cuts variation to <b>3.4 per million</b> using <b>DMAIC</b>.', 'ابدأ بإنها بتقلل الـ variation لـ <b>3.4 في المليون</b> بالـ <b>DMAIC</b>.')}</${Def}>
          <${Match} id="dmaic" left=${['Define', 'Measure', 'Analyze', 'Improve', 'Control']}
            right=${A ? ['نلاقي الـ root causes ونرتبها بالتأثير', 'نراقب ومنبطلش، ونصحح الانحراف في وقته', 'نحدد المشكلة (الـ level والمكان والفلوس) ونعمل team', 'نغيّر الـ process ونجرب الحل على sample', 'نقيس الأداء مقارنة باحتياج العميل']
              : ['Find the root causes, rank them by impact', 'Monitor, never stop; correct deviations on time', 'State the problem (level, location, money); form a team', 'Change the process; test the solution on a sample', 'Measure performance against customer requirements']}
            answer=${[2, 4, 0, 3, 1]} />
        `, { sec: t('Q2(b) Six Sigma', 'سؤال Q2(b) الـ Six Sigma') }),
        page(html`
          <${H2}>${t('The Six Sigma numbers', 'أرقام الـ Six Sigma')}</${H2}>
          <${Calc} id="sig" probs=${[
            { tab: 'X7', tag: t('Lecture 8 table', 'جدول محاضرة 8'), en: 'Subject X7 has standard deviation <b>1.27</b>. Its six sigma value?', ar: 'المادة X7 الـ standard deviation بتاعها <bdi dir="ltr"><b>1.27</b></bdi>. قيمة الـ six sigma كام؟', ans: 7.62, tol: 0.005, sol: '6 × σ = 6 × 1.27 = <b>7.62</b>' },
            { tab: 'σ²', tag: t('Ours', 'من عندنا'), ours: true, en: 'A process has variance <b>0.36</b>. Its six sigma value?', ar: 'فيه process الـ variance بتاعها <bdi dir="ltr"><b>0.36</b></bdi>. قيمة الـ six sigma كام؟', ans: 3.6, tol: 0.005, sol: 'σ = √0.36 = 0.6 → 6 × 0.6 = <b>3.6</b>' },
            { tab: 'ppm', tag: t('Lecture 8 table', 'جدول محاضرة 8'), en: '±3σ keeps <b>99.73%</b> inside. Parts per million outside?', ar: 'الـ ±3σ بتسيب <bdi dir="ltr"><b>99.73%</b></bdi> جوه. كام ppm برة؟', ans: 2700, tol: 0.5, unit: 'ppm', sol: '(100 − 99.73) × 10,000 = <b>2,700 ppm</b>' },
            { tab: '%', tag: t('Midterm 2026/27', 'ميدترم 2026/27'), en: 'Accuracy of a six sigma process (3.4 defects per million)?', ar: 'دقة الـ six sigma process كام (3.4 defects في المليون)؟', ans: 99.99966, tol: 0.000005, unit: '%', sol: '100 − 3.4 / 1,000,000 × 100 = 100 − 0.00034 = <b>99.99966%</b>' },
            { tab: 'DPMO', tag: t('Ours · background formula', 'من عندنا · formula خلفية'), ours: true, en: '18 defects in 1,200 units, 5 opportunities each. DPMO?', ar: 'فيه 18 defect في 1,200 unit، وكل unit فيها 5 opportunities. الـ DPMO كام؟', ans: 3000, tol: 0.5, sol: '18 ÷ (1,200 × 5) × 10⁶ = <b>3,000</b> (not on the slides)' }
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('From a variance, take the <b>square root first</b>, then multiply by 6. The overall row of the lecture\'s table: 6 × 1.07 = 6.42.',
            'لو معاك variance خد <b>الجذر الأول</b>، وبعدين اضرب في 6. والصف الكلي في جدول المحاضرة:<span class="ltr">6 × 1.07 = 6.42</span>')}</p></${Box}>
        `),

        // ═════ 58–59 · Q3(a) ISO 9000
        page(html`
          <${Tag}>${t('Final 2025/26 · Q3(a) · Q3 = 10 marks', 'فاينل 2025/26 · Q3(a) · السؤال بـ 10 درجات')}</${Tag}>
          <${H2}>${t('List the 20 elements of ISO 9000', 'اكتب الـ 20 element بتوع الـ ISO 9000')}</${H2}>
          <${IsoGrid} />
        `, { sec: t('Q3(a) ISO 9000', 'سؤال Q3(a) الـ ISO 9000') }),
        page(html`
          <${H3}>${t('The elements the summary stresses', 'الـ elements اللي الملخص بيركز عليها')}</${H3}>
          <${Match} id="isom" left=${['Management responsibility', 'Contract review', 'Inspection/measuring equipment', 'Corrective &amp; preventive action', 'Statistical techniques']}
            right=${A ? ['الـ control charts', 'احتياجات العميل', 'الـ root causes', 'الـ calibration', 'الـ quality policy والـ resources'] : ['Control charts', 'Customer needs', 'Root causes', 'Calibration', 'Quality policy, resources']}
            answer=${[4, 1, 3, 2, 0]} />
        `),

        // ═════ 60–61 · Q3(b) metrics
        page(html`
          <${Tag}>${t('Final 2025/26 · Q3(b)', 'فاينل 2025/26 · Q3(b)')}</${Tag}>
          <${H2}>${t('Metric or indicator?', 'دي metric ولا indicator؟')}</${H2}>
          <${P} small=${true}>${X('Q3(b) wants the <b>9 metrics</b>, not the indicators. Cyclomatic complexity is a metric.', 'سؤال Q3(b) عايز الـ <b>9 metrics</b> مش الـ indicators، والـ cyclomatic complexity دي metric.')}</${P}>
          <${Sort} id="met" bins=${[['M', 'metric'], ['I', 'indicator']]} items=${A ? [
            ['الـ Code coverage', 0], ['الـ Defect density', 1], ['الـ Cohesion', 0], ['الـ Defect removal rate', 1], ['الـ Cyclomatic complexity', 0], ['الـ Stability', 1], ['الـ Order of growth', 0], ['الـ Defect age profile', 1]
          ] : [
            ['Code coverage', 0], ['Defect density', 1], ['Cohesion', 0], ['Defect removal rate', 1], ['Cyclomatic complexity', 0], ['Stability', 1], ['Order of growth', 0], ['Defect age profile', 1]
          ]} />
        `, { sec: t('Q3(b) metrics', 'سؤال Q3(b) الـ metrics') }),
        page(html`
          <${Def}>${X('<b>The 9 metrics</b>: code coverage, bugs per line of code, cyclomatic complexity, function point analysis, number of classes and interfaces, cohesion, coupling, order of growth, source lines of code.',
            '<b>الـ 9 metrics</b> هما:<span class="ltr">code coverage, bugs per line of code, cyclomatic complexity, function point analysis, number of classes and interfaces, cohesion, coupling, order of growth, source lines of code</span>')}</${Def}>
          <${Calc} id="def" probs=${[
            { tab: t('removal', 'الـ removal'), tag: t('Lecture 6', 'محاضرة 6'), en: '40 defects detected, 30 resolved. What does the <b>defect removal rate</b> count?', ar: 'اتكشف 40 defect واتحل 30. الـ <b>defect removal rate</b> بيعدّ كام؟', ans: 30, tol: 0, sol: 'detected AND resolved = <b>30</b>' },
            { tab: t('age', 'الـ age'), tag: t('Lecture 6', 'محاضرة 6'), en: 'Same project. What does the <b>defect age profile</b> count?', ar: 'نفس المشروع. الـ <b>defect age profile</b> بيعدّ كام؟', ans: 10, tol: 0, sol: 'detected, NOT resolved = 40 − 30 = <b>10</b>' },
            { tab: t('ours', 'من عندنا'), tag: t('Ours', 'من عندنا'), ours: true, en: '55 detected, 41 resolved. The <b>age profile</b>?', ar: 'اتكشف 55 واتحل 41. الـ <b>age profile</b> كام؟', ans: 14, tol: 0, sol: '55 − 41 = <b>14</b> (and the removal rate counts 41)' }
          ]} />
        `),

        // ═════ 62 · boundary values
        page(html`
          <${H2}>${t('Boundary values: valid or invalid?', 'قيم الحدود: valid ولا invalid؟')}</${H2}>
          <${EP} id="ep" specs=${[
            { tab: t('> 9000', 'أكبر من 9000'), tag: t('Final 2025/26 Q1 #12 · Midterm', 'فاينل 2025/26 رقم 12 · ميدترم'), en: 'The program accepts an integer <b>&gt; 9000</b>.', ar: 'البرنامج بيقبل أي integer <b>أكبر من 9000</b>.',
              vals: [['8999', 'i', 'below', 'تحت'], ['9000', 'i', 'the boundary: not > 9000', 'الحافة، مش أكبر من 9000'], ['9001', 'v', 'just inside', 'جوه بواحد'], ['9999', 'v', 'a valid value', 'قيمة valid']] },
            { tab: '\u206610,000–99,999\u2069', tag: t('Lecture 2', 'محاضرة 2'), en: 'A field accepts <b>10,000 to 99,999</b>: the lecture\'s 6 tests.', ar: 'فيه field بيقبل من <bdi dir="ltr"><b>10,000</b></bdi> لـ <bdi dir="ltr"><b>99,999</b></bdi>، ودي الـ 6 tests بتوع المحاضرة.',
              vals: [['00000', 'i', 'special value', 'قيمة خاصة'], ['09999', 'i', 'left edge − 1', 'الحافة الشمال − 1'], ['10000', 'v', 'left edge', 'الحافة الشمال'], ['50000', 'v', 'middle', 'النص'], ['99999', 'v', 'right edge', 'الحافة اليمين'], ['100000', 'i', 'right edge + 1', 'الحافة اليمين + 1']] },
            { tab: t('Day', 'اليوم'), tag: t('Ours · the midterm asked 28 to 31', 'من عندنا · الميدترم سأل من 28 لـ 31'), ours: true, en: 'The field Day in DD/MM/YYYY accepts <b>1 to 31</b>.', ar: 'الـ field بتاع اليوم في <bdi dir="ltr">DD/MM/YYYY</bdi> بيقبل من <b>1</b> لـ <b>31</b>.',
              vals: [['0', 'i', 'below the first day', 'قبل أول يوم'], ['1', 'v', 'first day', 'أول يوم'], ['28', 'v', 'end of February', 'آخر فبراير'], ['31', 'v', 'end of the longest months', 'آخر أطول شهور'], ['32', 'i', 'past the last day', 'بعد آخر يوم']] }
          ]} />
          <${Grow} />
          <${Hand}>${t('Midterm: the Day boundaries are 28, 29, 30, 31 (all answers): the month ends.', 'الميدترم: حدود اليوم هي 28 و 29 و 30 و 31 لأنها نهايات الشهور، والإجابة all answers.')}</${Hand}>
        `, { sec: t('Boundary values', 'الـ Boundary values') }),

        // ═════ 63–64 · cyclomatic complexity
        page(html`
          <${Tag}>${t('Midterm 2026/27 · Lecture 4', 'ميدترم 2026/27 · محاضرة 4')}</${Tag}>
          <${H2}>${t('V(G) three ways', 'الـ V(G) بتلات طرق')}</${H2}>
          <${VG} />
        `, { sec: t('Cyclomatic complexity', 'الـ Cyclomatic complexity') }),
        page(html`
          <${Tag} ours=${true}>${t('Variant · ours: three IFs in a row', 'نسخة تانية · من عندنا: تلات IFs ورا بعض')}</${Tag}>
          <${Calc} id="paths" probs=${[
            { tab: 'basis', en: 'How many <b>basis-path</b> tests does V(G) ask for?', ar: 'الـ V(G) بتطلب كام test للـ <b>basis paths</b>؟', ans: 4, tol: 0, sol: 'V(G) = 4: 1-3-5-7 (0,0,0) · 1-2-3-5-7 (1,0,0) · 1-3-4-5-7 (0,1,0) · 1-3-5-6-7 (0,0,1)' },
            { tab: 'branch', en: 'How many tests give <b>branch</b> coverage?', ar: 'كام test بيعملوا <b>branch</b> coverage؟', ans: 2, tol: 0, sol: '(1,1,1) makes every IF true, (0,0,0) every IF false: <b>2</b>' },
            { tab: t('all paths', 'كل الـ paths'), en: 'How many <b>complete paths</b> from 1 to 7?', ar: 'فيه كام <b>path كامل</b> من 1 لـ 7؟', ans: 8, tol: 0, sol: 'each IF doubles the routes: 2 × 2 × 2 = <b>8</b>, more than V(G)' }
          ]} />
          ${mq('vg1', /^Cyclomatic Complexity equals$/)}
        `),

        // ═════ 65–68 · showdowns
        page(html`
          <${Fireside} sub=${t('Tonight: Black Box (Lecture 2) and White Box (Lecture 3)', 'الليلة: الـ Black Box (م2) والـ White Box (م3)')} />
          <${Chat} names=${A ? ['الـ Black Box', 'الـ White Box'] : ['Black Box', 'White Box']} lines=${A ? [
            [0, 'أنا بختبر من برة: input يدخل و output يطلع، ومش محتاج أقرا سطر code.'],
            [1, 'وعشان كده بتفوّت حاجات. أنا بفتح الصندوق: الـ paths والـ conditions والـ loops عند حدودها.'],
            [0, 'أنا اللي بكشف الغموض في الـ specification. إنت بتتأكد إن الـ code بيعمل اللي الـ code بيقوله.'],
            [1, 'أنا بشغّل كل statement وكل branch وكل توافيق الـ conditions. جرّب تعملها وإنت مغمّض.'],
            [0, 'مقدرش أجرب كل الـ inputs، معترف. بس الـ classes والـ boundaries بيقللوا الـ tests من غير ما يقللوا الـ quality.'],
            [1, 'والناحية الـ static بتاعتي بتراجع الـ code قبل ما يشتغل: formal review و standards و checklist.'],
            [0, 'وفي الـ web site إحنا الاتنين بنسلّم للـ Gray Box، اللي بيخلطنا عشان يعزل الـ design أو الـ implementation الوحش.'],
            [1, 'ماشي. حاجة واحدة متفقين عليها: الـ static من غير تشغيل، والـ dynamic بتشغيل.']
          ] : [
            [0, 'I test from the outside: inputs in, outputs out. I never read a line of code.'],
            [1, 'Which is why you miss things. I open the box: paths, conditions, loops at their boundaries.'],
            [0, 'I expose ambiguities in the specification. You only check the code does what the code says.'],
            [1, 'I run every statement, every branch, every combination of conditions. Try that blindfolded.'],
            [0, 'I can\'t test every input, I admit. But classes and boundaries cut the tests without cutting quality.'],
            [1, 'And my static side reviews code before it even runs: formal review, standards, checklist.'],
            [0, 'On a web site we both hand over to Gray Box, who mixes us to isolate bad design or implementation.'],
            [1, 'Fine. One thing we agree on: static means not running, dynamic means running.']
          ]} />
        `, { sec: t('Showdowns', 'المواجهات') }),
        page(html`
          <${Fireside} sub=${t('CMM (Lecture 7) and Six Sigma (Lecture 8), with ISO 9000 listening', 'الـ CMM (م7) والـ Six Sigma (م8)، والـ ISO 9000 سامع')} />
          <${Chat} names=${A ? ['الـ CMM', 'الـ Six Sigma'] : ['CMM', 'Six Sigma']} lines=${A ? [
            [0, 'أنا بقيس الـ software process كلها ناضجة قد إيه: 5 levels بتطلعهم واحدة واحدة.'],
            [1, 'وأنا بقيس الـ process بتتغير قد إيه. هدفي 3.4 defects في المليون.'],
            [0, 'الفاينل سمّاني الطريقة الأكتر استخدامًا والمفضلة لتقييم الـ software.'],
            [1, 'وقال عني إني بقلل الـ variation لحد «zero default». الإملا بتاعتهم، مش بتاعتي.'],
            [0, 'في الـ level 5 عندي، الـ Optimizing، بنشيل أسباب الـ defects. شبه شغلك.'],
            [1, 'أنا بوصل لده بالـ DMAIC: الـ Define والـ Measure والـ Analyze والـ Improve والـ Control، وبالإحصاء.'],
            [0, 'والـ level 4 إحصاء برضه: Quantitatively Managed.'],
            [1, 'خلاص نقسمها: إنت السلم وأنا المازورة. والـ ISO 9000 يخلّيه في الـ 20 element الموثقين بتوعه.']
          ] : [
            [0, 'I measure how mature your whole software process is: five levels, climbed one at a time.'],
            [1, 'I measure how much your process varies. My target: 3.4 defects per million.'],
            [0, 'The final calls me the widely used and preferred software method of evaluation.'],
            [1, 'And says I reduce process variation to reach "zero default". Their spelling, not mine.'],
            [0, 'At my Level 5, Optimizing, you remove the causes of defects. Sounds like your job.'],
            [1, 'I get there with DMAIC: Define, Measure, Analyze, Improve, Control. And statistics.'],
            [0, 'Level 4 is statistics too: Quantitatively Managed.'],
            [1, 'Then let\'s split it: you are the staircase, I am the measuring tape. ISO 9000 keeps its 20 documented elements.']
          ]} />
        `),
        page(html`
          <${Interview} title=${t('This week\'s interview', 'حوار الأسبوع')} sub=${t('Cyclomatic Complexity, the number that lives in two lectures', 'الـ Cyclomatic Complexity، الرقم اللي عايش في محاضرتين')} lines=${A ? [
            ['هيد فيرست', 'بتظهر في محاضرة 4 وتاني في محاضرة 6. مين فيهم إنت الحقيقي؟'],
            ['الـ CC', 'الاتنين. في محاضرة 4 بعدّ الـ independent paths في الـ flow graph، وفي محاضرة 6 أنا واحدة من الـ 9 common metrics.'],
            ['هيد فيرست', 'الناس بتحسبك إزاي؟'],
            ['الـ CC', 'بتلات طرق لازم يطلعوا نفس الرقم: الـ <bdi dir="ltr">E − N + 2P</bdi>، أو الـ predicate nodes زائد 1، أو الـ regions مع اللي برة.'],
            ['هيد فيرست', 'والـ P دي إيه؟'],
            ['الـ CC', 'عدد الـ connected components. برنامج واحد يعني graph واحد، فالـ P بواحد، والميدترم كتبني edges ناقص nodes زائد 2.'],
            ['هيد فيرست', 'يعني لو الـ V(G) بتلاتة، يبقى 3 tests لأي coverage؟'],
            ['الـ CC', 'يعني 3 tests للـ basis paths. الـ branch coverage لـ <code>foo()</code> محتاجة 2 بس. ماتخلطش بيننا.']
          ] : [
            ['Head First', 'You appear in Lecture 4 and again in Lecture 6. Which is the real you?'],
            ['CC', 'Both. In Lecture 4 I count the independent paths of a flow graph; in Lecture 6 I am one of the 9 common metrics.'],
            ['Head First', 'How do people compute you?'],
            ['CC', 'Three ways that must agree: E − N + 2P, predicate nodes + 1, or the regions, counting the outside one.'],
            ['Head First', 'What is P?'],
            ['CC', 'The number of connected components. One program, one graph, P = 1, so the midterm wrote me as edges − nodes + 2.'],
            ['Head First', 'So V(G) = 3 means 3 tests for any coverage?'],
            ['CC', 'It means 3 basis-path tests. Branch coverage of foo() needs only 2. Don\'t mix us up.']
          ]} />
        `),
        page(html`
          <${H2}>${t('Who am I? The whole course', 'أنا مين؟ الكورس كله')}</${H2}>
          <${P} small=${true}>${t('Eight clues from eight lectures. Pick the speaker.', 'تمن ألغاز من تمن محاضرات. اختار مين اللي بيتكلم.')}</${P}>
          <${WhoAmI} items=${[
            { en: 'I am the oldest model and I go strictly in sequence; my early errors carry over.', ar: 'أنا أقدم model وماشي بالترتيب بالظبط، والـ errors بتاعتي اللي بدري بتنتقل لقدام.', o: ['Spiral', 'Waterfall', 'V-model', 'Agile'], a: 1, l: 1 },
            { en: 'I ask: are we building the right product? I check the user\'s requirement.', ar: 'أنا بسأل: هل بنبني المنتج الصح؟ وبتأكد من احتياج الـ user.', o: ['Verification', 'Validation', 'Static testing', 'Debugging'], a: 1, l: 2 },
            { en: 'I wrote the code, and I present it line by line to 5 or 6 programmers and testers.', ar: 'أنا اللي كتبت الـ code، وبعرضه سطر سطر على 5 أو 6 programmers و testers.', o: ['Inspection', 'Peer review', 'Walkthrough', 'Formal review'], a: 2, l: 3 },
            { en: 'I am E − N + 2P, and I count paths, not lines.', ar: 'أنا <bdi dir="ltr">E − N + 2P</bdi>، وبعدّ paths مش سطور.', o: ['Function pair', 'Cyclomatic complexity', 'Statement coverage', 'Defect density'], a: 1, l: 4 },
            { en: 'I mix the outside and the inside to isolate bad design or bad implementation of a web site.', ar: 'أنا بخلط البرة مع الجوة عشان أعزل الـ design أو الـ implementation الوحش في الـ web site.', o: ['Black box', 'Gray box', 'White box', 'Compatibility testing'], a: 1, l: 5 },
            { en: 'I count the defects that were detected and resolved.', ar: 'أنا بعدّ الـ defects اللي اتكشفت واتحلت.', o: ['Defect age profile', 'Defect density', 'Defect removal rate', 'Stability'], a: 2, l: 6 },
            { en: 'At my level, processes are controlled with statistics and capability baselines.', ar: 'في الـ level بتاعي الـ processes بتتحكم بالإحصاء والـ capability baselines.', o: ['Defined', 'Repeatable', 'Optimizing', 'Quantitatively Managed'], a: 3, l: 7 },
            { en: 'I am the last phase: I monitor the solution for long-term stability and never stop.', ar: 'أنا آخر phase: بتابع الحل عشان يفضل stable على المدى الطويل ومبطلش.', o: ['Improve', 'Measure', 'Control', 'Define'], a: 2, l: 8 }
          ]} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Missed one? The lecture number tells you which pages to reread.', 'غلطت في واحد؟ رقم المحاضرة بيقولك ترجع لأنهي صفحات.')}</${Talk}>
        `),

        // ═════ exam corner
        page(html`
          <${Box} kind="exam" title=${t("The doctors' questions", 'أسئلة الدكاترة')}><p className="hf-p small">${t('From the Final 2025/26 and the Midterm 2026/27, mixed from every lecture. The paper is above each question.', 'من فاينل 2025/26 وميدترم 2026/27، من كل المحاضرات. اسم الورقة فوق كل سؤال.')}</p></${Box}>
          ${mq('e1', /^Which stage of SDLC typically consumes the maximum cost and effort\?$/)}
          <${Grow} />
          <${Hand} red=${true}>${t('‡ The site answers Perfective; the quiz\'s key said Preventive (not confirmed by the doctors). Know both.', 'الموقع بيجاوب Perfective، والـ key بتاع الـ quiz قال Preventive (والدكاترة ما أكدوهوش) ‡. اعرف الاتنين.')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e2', /^Identify the boundary tests in order to test the field Day/)}
          ${mq('e3', /^Document with test objectives and scope is called$/)}
        `),
        page(html`
          ${mq('e4', /^Formal review, coding standards and guidelines, and code review are phases of:$/)}
          ${mq('e5', /^From the following, select the choice which is appropriate to standards and guidelines\.$/)}
        `),
        page(html`
          ${mq('e6', /^The reason for adhering to standards and guidelines are$/)}
        `),
        page(html`
          ${mq('e8', /^The errors that caused due to the variables, constants, and strings/)}
        `),
        page(html`
          ${mq('e10', /achieves method-message coverage in stack/)}
          ${mq('e11', /^The goal of a software tester is to find:$/)}
        `),
        page(html`
          ${mq('e12', /is the widely used and preferred software method of evaluation/)}
          ${mq('e13', /There are 20 crucial elements in the/)}
        `),
        page(html`
          ${mq('e14', /baseline of the problem determined/)}
          <${Grow} />
          <${Hand} red=${true}>${t('‡ "Baseline" is not a word the lecture uses: Measure is where the problem is first measured.', 'كلمة «baseline» مش في المحاضرة، والـ Measure هي اللي بنقيس فيها المشكلة أول مرة ‡.')}</${Hand}>
        `),
        page(html`
          ${mq('e15', /solution monitored for long-term stability/)}
        `),
        page(html`
          ${mq('e16', /^Which of the following is true about variation\?$/)}
        `),
        page(html`
          <${Box} kind="exam" title=${PRACT}><p className="hf-p small">${t("Lecture 5 has no doctors' MCQ yet, so these three are the site's own practice questions, not the doctors'.", 'محاضرة 5 مالهاش MCQ من الدكاترة لحد دلوقتي، فالـ 3 دول تدريب من الموقع، مش من امتحانات الدكاترة.')}</p></${Box}>
          ${pq('p1', 5, /^The purpose of gray-box web site testing is to:$/)}
        `, { sec: PRACT }),
        page(html`
          ${pq('p2', 5, /^Which of the following is NOT one of the white-box elements of a web site\?$/)}
          ${pq('p3', 5, /^Which is NOT in the lecture's compatibility testing list\?$/)}
        `),

        // ═════ 79 · exam day
        page(html`
          <${H2}>${t('Exam day', 'يوم الامتحان')}</${H2}>
          <${Tag} ours=${true}>${t('Our time plan, not the doctors\' · 120 minutes', 'خطة وقت من عندنا، مش من الدكاترة · 120 دقيقة')}</${Tag}>
          <${Plan} />
          <${P} small=${true}>${X('Q1 first: 20 marks, many of them repeats. Leave 8 minutes to check.', 'ابدأ بالسؤال الأول، فيه 20 درجة وكتير منهم متكرر، وسيب 8 دقايق للمراجعة.')}</${P}>
          <${H3}>${t('Where marks get lost', 'الدرجات بتضيع فين')}</${H3}>
          <ul className="hf-qaF-ck hf-in">${(A ? [
            'الـ statement coverage: امشي على الـ IFs بالترتيب.',
            'الـ condition coverage هي كل التوافيق، في جدول.',
            'المثلث: آخر IF يطلع true بيكسب، والـ <bdi dir="ltr">(1,2,4)</bdi> بتطبع not a triangle.',
            'الـ queue ليه create و insert و delete (مش push و pop)، و 14 pair منهم 3 errors.',
            'الـ CMM: الـ 5 levels بالترتيب من غير نط، والرابع اسمه Quantitatively Managed.',
            'الـ DMAIC بالترتيب بسطر لكل phase، و 3.4 في المليون، والهدف zero defects.',
            'الـ σ هي جذر الـ variance الأول، وبعدين اضرب في 6.',
            'اكتب الـ 20 element بتوع الـ ISO والـ 9 metrics كاملين، من غير indicators.'
          ] : [
            'Statement coverage: trace both IFs in order; A changes after the first.',
            'Condition coverage = every combination (2 × 2 = 4), in a table with the lines run.',
            'Triangle: the last true IF wins; (1,2,4) prints not a triangle.',
            'Queue: create, insert, delete (never push and pop); 14 pairs, 3 errors.',
            'CMM: 5 levels in order, no skipping; Level 4 is Quantitatively Managed.',
            'DMAIC in order, one line each; 3.4 per million, aim zero defects.',
            'σ = √variance first, then × 6.',
            'All 20 ISO elements and all 9 metrics, no indicators mixed in.'
          ]).map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ul>
        `, { sec: t('Exam day', 'يوم الامتحان') }),

        // ═════ bullet points
        page(html`
          <${Bullets} items=${A ? [
            'هدف الـ tester إنه يلاقي الـ bugs <b>ويتأكد إنها اتصلحت</b>.',
            'الـ <b>Verification</b> مطابق للـ spec، والـ <b>validation</b> لاحتياج الـ user. والـ <b>static</b> من غير تشغيل.',
            'الـ EP test من كل class، والـ boundaries كل حافة واللي بعدها. وفي <bdi dir="ltr">&gt; 9000</bdi> الـ 9000 invalid.',
            'الـ <b>Static white box</b>: الـ formal review والـ standards (mandatory) والـ checklist.',
            'الـ coverage: الـ statement ثم الـ branch ثم الـ condition (كل التوافيق).',
            'الـ <b>V(G)</b>:<span class="ltr">E − N + 2P = decisions + 1 = regions</span>',
            'المثلث: آخر IF بيكسب، والـ statement هي <bdi dir="ltr">(4,4,4) + (0,1,0)</bdi>.',
            'الـ <b>MM</b> مش بيـ subsume الـ statement، والـ <b>FP</b> فيه 14 pair منهم 3 errors.'
          ] : [
            'The tester\'s goal: find bugs <b>and make sure they get fixed</b>.',
            '<b>Verification</b> = meets the spec; <b>validation</b> = meets the user\'s need; <b>static</b> = not running.',
            'EP: one test per class. Boundaries: each edge and one past it; for &gt; 9000, 9000 is invalid.',
            '<b>Static white box</b>: formal review, standards (mandatory) and guidelines, checklist.',
            'Coverage: statement, then branch, then condition (every combination).',
            '<b>V(G)</b> = E − N + 2P = decisions + 1 = regions.',
            'Triangle: the last true IF wins; statement = (4,4,4) + (0,1,0).',
            '<b>MM</b> does not subsume statement; <b>FP</b>: 14 pairs, 3 errors.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ web: الـ black للـ text والـ links، والـ white للـ dynamic والـ DB، والـ gray بيعزل الـ design الوحش.',
            'الـ <b>SQA</b> process و prevention، والـ <b>SQC</b> product و detection.',
            'الـ 9 metrics غير الـ 9 indicators. والـ removal rate للي اتحل، والـ age profile للي ماتحلش.',
            'الـ <b>CMM</b>: Initial ثم Repeatable ثم Defined ثم Quantitatively Managed ثم Optimizing.',
            'الـ <b>ISO 9000</b> فيه 20 element و 8 principles، والـ <b>SPICE</b> هو <bdi dir="ltr">ISO/IEC 15504</bdi>.',
            'الـ <b>Six Sigma</b>: 3.4 في المليون، و<span class="ltr">six sigma = 6 × √variance</span>',
            'الـ <b>DMAIC</b>: Define ثم Measure ثم Analyze ثم Improve ثم Control.'
          ] : [
            'Web: black = text, links, graphics, forms; white = dynamic, DB, load, security; gray isolates bad design.',
            '<b>SQA</b> = process, prevention; <b>SQC</b> = product, detection.',
            'The 9 metrics are not the 9 indicators. Removal rate = resolved; age profile = not resolved.',
            '<b>CMM</b>: Initial, Repeatable, Defined, Quantitatively Managed, Optimizing; no skipping.',
            '<b>ISO 9000</b>: 20 elements, 8 principles. <b>SPICE</b> = ISO/IEC 15504.',
            '<b>Six Sigma</b>: 3.4 per million; six sigma value = 6 × √variance.',
            '<b>DMAIC</b>: Define, Measure, Analyze, Improve, Control.'
          ]} />
        `),

        // ═════ 82 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You covered the whole course!', 'خلّصت الكورس كله!')}</${H1}>
            <${Talk} who="bug">${t('Fine. You found me. See you in the exam hall.', 'ماشي، لقيتني. نتقابل في لجنة الامتحان.')}</${Talk}>
            <${P}>${t('One last push before the final:', 'آخر دفعة قبل الفاينل:')}</${P}>
            <div className="hf-qaF-go">
              <${Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], mock: 40, t: Date.now() } }}>${t('Take a timed mock final (40 questions)', 'امتحان تجريبي بوقت (40 سؤال)')}</${Go}>
              <${Go} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], only: 'prof', t: Date.now() } }}>${t("All the doctors' questions", 'كل أسئلة الدكاترة')}</${Go}>
              <${Go} to=${{ mode: 'read', lec: 'fin', anchor: null }}>${t('Read the final summary', 'اقرا ملخص الفاينل')}</${Go}>
              <${Go} to=${{ mode: 'papers' }}>${t('The past papers', 'الامتحانات اللي فاتت')}</${Go}>
            </div>
          </div>
        `, { center: true })
      ];
    }
  };
})();

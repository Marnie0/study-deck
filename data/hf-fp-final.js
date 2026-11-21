// Head First final revision for File Processing (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course (Lectures 1–5) in one sitting, built around what the papers ask. This course has no past finals on the site:
// the anatomy and the hot list come from the three Midterm 2022/23 models and the Midterm 2026/27 (counted with a node script
// from COURSES.fp.exams), and from the lectures. The worked problems use the papers' own numbers (labelled with the paper) and a
// fresh variant of ours for each. Every number was worked by hand and checked with node:
// Model A: rev 12, latency 6, track 10,240, block 3060, ⌊3.35⌋ = 3 blocks, 60 records/track, cylinder 122,880, capacity 61,440,000 B
//   (≈ 58.6 MB), transfer 3 × 12 / 20 = 1.8, total 14.8 ms; BF 10: 1780 B, ⌊5.75⌋ = 5, 50 records.
// Ours (P1): rev 10, latency 5, track 20,480, block 5400, ⌊3.79⌋ = 3 → 75 records, capacity 163,840,000 B, transfer 1.25, total 15.25 ms.
// Models B/C: track 15,360, cylinder 153,600 (150 KB), 1200 records/cylinder, file 1,280,000 B, 83.33 → 84 tracks, 2500 sectors,
//   disk 153,600,000 B ≈ 146.5 MB, rev 60, 2 sectors 10 + 5 + 4 = 19 ms, 4 sectors 10 + 5 + 8 = 23 ms (the given 5 ms delay is used).
// Ours (P2): track 16,384, cylinder 98,304, 384 records/cylinder, 7,680,000 B, 78.125 → 79 cylinders, disk 196,608,000 B = 187.5 MB,
//   latency 10, transfer 1.875, total 23.875 ms.
// Costs (ours, B 1024, R 16, D 10, C 1, H 2): heap eq 13,312, heap insert 21, sorted eq 104, sorted insert 26,728, hashed scan 33,280, hashed eq 20.
// Hash: ZZZZZZ 24,300 → 4363 → 363 (the summary's); ours with 100 addresses: Yara 19691 → 91, Samy 21240 → 1303 → 3, Zaki 19965 → 28,
//   Hassan 30879 → 10942 → 42, Reem 19291 → 91, Ali 7020 → 20 (Yara and Reem are synonyms).
// RRN (ours, 64-byte records): 448, 15, 32 records, last RRN 31, −64, 640. Bytes (ours): fixed 19, length indicators 18, delimiters 15,
//   keyword 27, method 3 indicator 14.
// Arabic follows the site's rules (see hf-compiler.js). Analogies, time plans, practice numbers and advice marked as ours.
// lectures: [1, 2, 3, 4, 5]
(function () {
  const H = window.HF; H.chapters.fp = H.chapters.fp || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const T = H.K.T;
  const useAr = () => H.K.useKit().lang === 'ar';
  const AR_F = '"IBM Plex Sans Arabic", var(--body)';

  if (!document.getElementById('hf-css-fpF')) {
    const s = document.createElement('style'); s.id = 'hf-css-fpF';
    s.textContent = `
.hfb .hf-fpF-rate{ display:grid; gap:3px; }
.hfb .hf-fpF-rr{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:6px; align-items:center; padding:2px 0; border-bottom:1px dotted var(--faint); }
.hfb .hf-fpF-rr > span{ font:600 14px/1.22 var(--body); color:var(--ink); }
.hfb .hf-fpF-rr > span i{ font:800 12.5px/1 var(--mono); font-style:normal; color:var(--hf-k); margin-inline-end:5px; }
.hfb .hf-fpF-rb{ display:flex; gap:3px; }
.hfb .hf-fpF-rb button{ font:700 12.5px/1 var(--body); min-width:46px; height:30px; padding:0 5px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fpF-rb button.hf-fpF-s0[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); color:#fff; }
.hfb .hf-fpF-rb button.hf-fpF-s1[aria-pressed="true"]{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-fpF-rb button.hf-fpF-s2[aria-pressed="true"]{ background:var(--ok); border-color:var(--ok); color:#fff; }
.hfb .hf-fpF-rnote{ font:600 13.5px/1.35 var(--body); color:var(--ink); margin:3px 0 0; min-height:2.7em; }
.hfb .hf-fpF-rnote b{ color:var(--hf-red); }
.hfb .hf-fpF-map{ position:relative; }
.hfb .hf-fpF-stops{ position:relative; display:grid; gap:6px; }
.hfb .hf-fpF-rail{ position:absolute; inset-inline-start:14px; top:33px; height:288px; width:3px; background:var(--hf-grey2); border-radius:2px; }
.hfb .hf-fpF-ring{ position:absolute; inset-inline-start:-5px; top:12px; width:42px; height:42px; box-sizing:border-box; border-radius:50%; border:3px solid var(--hf-k); transition:transform .6s cubic-bezier(.3,.7,.2,1); pointer-events:none; z-index:2; }
.hfb .hf-fpF-ring.calm{ transition:none; }
.hfb .hf-fpF-stop{ position:relative; z-index:1; height:66px; display:grid; grid-template-columns:32px minmax(0,1fr); gap:7px; align-items:center; text-align:start; padding:0; margin:0; padding-inline-end:40px; border:0; background:none; cursor:pointer; color:var(--ink); font:inherit; }
.hfb .hf-fpF-stop > b{ width:32px; height:32px; box-sizing:border-box; border-radius:50%; display:grid; place-items:center; font:800 14px/1 var(--mono); background:var(--paper); border:2px solid var(--hf-line); color:var(--ink); transition:background .4s, color .4s; }
.hfb .hf-fpF-stop.hf-fpF-on > b{ background:var(--hf-k); border-color:var(--hf-k); color:#fff; }
.hfb .hf-fpF-stop > span{ display:block; height:62px; box-sizing:border-box; overflow:hidden; border:1.5px solid var(--faint); border-radius:8px; padding:4px 8px; background:var(--paper); transition:border-color .4s, box-shadow .4s; }
.hfb .hf-fpF-stop.hf-fpF-on > span{ border-color:var(--hf-k); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-fpF-stop > span strong{ display:block; font:800 14px/1.2 var(--body); color:var(--ink); }
.hfb .hf-fpF-stop > span em{ display:block; font:500 13px/1.25 var(--body); font-style:normal; color:var(--graphite); margin-top:1px; }
.hfb .hf-fpF-links{ position:absolute; inset-inline-end:0; top:0; width:40px; height:354px; overflow:visible; }
.hfb.hf-ar .hf-fpF-links{ transform:scaleX(-1); }
.hfb .hf-fpF-links path{ fill:none; stroke:var(--faint); stroke-width:2; transition:stroke .4s; }
.hfb .hf-fpF-links path.hf-fpF-hot{ stroke:var(--hf-k); stroke-width:2.6; }
.hfb .hf-fpF-uses{ font:600 13.5px/1.35 var(--body); color:var(--ink); margin:0; padding:5px 9px; border-inline-start:3px solid var(--hf-k); background:var(--hf-grey); min-height:4.1em; }
.hfb .hf-fpF-bars{ display:grid; gap:4px; }
.hfb .hf-fpF-bar{ display:grid; grid-template-columns:minmax(0,1fr) 64px 30px; gap:6px; align-items:center; padding:2px 0; border-bottom:1px dotted var(--faint); }
.hfb .hf-fpF-bar > span{ font:600 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-fpF-bar > span small{ font:700 12px/1 var(--mono); color:var(--hf-k); margin-inline-start:4px; white-space:nowrap; }
.hfb .hf-fpF-bar > i{ display:block; height:12px; background:var(--hf-grey2); border-radius:3px; overflow:hidden; direction:ltr; }
.hfb .hf-fpF-bar > i > u{ display:block; height:100%; background:var(--hf-k); border-radius:3px; transform-origin:0 50%; animation:hf-fpF-grow .9s cubic-bezier(.2,.7,.2,1) both; }
.hfb .hf-fpF-bar > b{ font:800 13px/1 var(--mono); color:var(--ink); text-align:end; direction:ltr; }
.hfb .hf-fpF-bh{ display:grid; grid-template-columns:minmax(0,1fr) 64px 30px; gap:6px; font:800 12px/1.1 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.04em; }
.hfb.hf-ar .hf-fpF-bh{ text-transform:none; letter-spacing:0; font-family:${AR_F}; font-size:12.5px; }
@keyframes hf-fpF-grow{ from{ transform:scaleX(0); } }
@media (prefers-reduced-motion: reduce){ .hfb .hf-fpF-bar > i > u{ animation:none; } .hfb .hf-fpF-ring{ transition:none; } }
.hfb .hf-fpF-tb{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:13px; line-height:1.28; color:var(--ink); }
.hfb .hf-fpF-tb th, .hfb .hf-fpF-tb td{ border:1px solid var(--hf-line); padding:3px 5px; vertical-align:top; text-align:start; }
.hfb .hf-fpF-tb thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-fpF-tb tbody th{ font-weight:700; }
.hfb .hf-fpF-tb td.m, .hfb .hf-fpF-tb td code{ font:600 12.5px/1.3 var(--mono); color:var(--hf-k); background:none; padding:0; }
.hfb.hf-ar .hf-fpF-tb{ font-family:${AR_F}; font-size:12.5px; line-height:1.45; }
.hfb.hf-ar .hf-fpF-tb td.m{ direction:ltr; text-align:right; }
.hfb .hf-fpF-giv{ font:700 12px/1.4 var(--mono); color:var(--ink); background:var(--hf-grey); border-radius:6px; padding:4px 8px; direction:ltr; text-align:left; margin:0; }
.hfb .hf-fpF-giv i{ font-style:normal; color:var(--hf-k); }
.hfb .hf-fpF-desk{ display:grid; gap:2px; }
.hfb .hf-fpF-dr{ display:grid; grid-template-columns:minmax(0,1fr) 112px 14px; gap:0 6px; align-items:center; padding:1px 4px; border:1.5px solid transparent; border-radius:6px; }
.hfb .hf-fpF-dr.hf-fpF-ok{ border-color:var(--ok); } .hfb .hf-fpF-dr.hf-fpF-no{ border-color:var(--hf-red); }
.hfb .hf-fpF-dl{ font:600 13.5px/1.22 var(--body); color:var(--ink); }
.hfb .hf-fpF-dl small{ display:block; font:600 12.5px/1.2 var(--mono); color:var(--hf-k); direction:ltr; text-align:start; }
.hfb.hf-ar .hf-fpF-dl small{ text-align:right; }
.hfb .hf-fpF-in{ width:100%; box-sizing:border-box; height:30px; font:700 13px/1 var(--mono); text-align:center; padding:0 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); }
.hfb .hf-fpF-in:focus{ outline:2px solid var(--hf-hand); outline-offset:0; }
.hfb .hf-fpF-mk{ font:800 14px/1 var(--body); text-align:center; }
.hfb .hf-fpF-ok .hf-fpF-mk{ color:var(--ok); } .hfb .hf-fpF-no .hf-fpF-mk{ color:var(--hf-red); }
.hfb .hf-fpF-wk{ grid-column:1 / -1; font:600 12.5px/1.3 var(--mono); color:var(--hf-hand); direction:ltr; text-align:left; }
.hfb .hf-fpF-wk b{ color:var(--ink); }
.hfb .hf-fpF-tr{ grid-column:1 / -1; font:600 13px/1.3 var(--body); color:var(--hf-red); margin:0; }
.hfb .hf-fpF-bytes{ grid-column:1 / -1; font:600 13px/1.4 var(--mono); background:var(--hf-grey); border-inline-start:3px solid var(--hf-k); padding:2px 7px; margin:0; color:var(--ink); white-space:pre-wrap; word-break:break-all; direction:ltr; text-align:left; }
.hfb .hf-fpF-bytes i{ font-style:normal; color:var(--graphite); }
.hfb .hf-fpF-bytes u{ text-decoration:none; color:var(--hf-k); font-weight:800; }
.hfb .hf-fpF-bytes s{ text-decoration:none; color:var(--hf-red); font-weight:800; }
.hfb .hf-fpF-after{ margin:4px 0 0; }
.hfb .hf-fpF-drw{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 8px; display:grid; grid-template-columns:minmax(0,1fr); gap:6px; }
.hfb .hf-fpF-tabs{ display:flex; gap:5px; }
.hfb .hf-fpF-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fpF-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-fpF-tabs button.hf-fpF-dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-fpF-tabs button.hf-fpF-dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-fpF-ask{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); }
.hfb .hf-fpF-work{ font:600 12px/1.45 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 8px; color:var(--ink); min-height:40px; direction:ltr; text-align:left; }
.hfb .hf-fpF-work > div{ white-space:pre-wrap; overflow-wrap:anywhere; padding-left:2ch; text-indent:-2ch; animation:hf-up .35s both; }
.hfb .hf-fpF-work .hf-fpF-cur{ color:var(--hf-hand); }
.hfb .hf-fpF-q{ font:700 14px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-fpF-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-fpF-opts button{ font:700 13.5px/1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-fpF-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-fpF-good{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:4px 8px; border-inline-start:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-fpF-legend{ display:grid; grid-template-columns:1fr 1fr; gap:4px; }
.hfb .hf-fpF-legend button{ display:flex; align-items:center; gap:5px; text-align:left; min-height:30px; padding:2px 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; font:600 12.5px/1.15 var(--mono); }
.hfb .hf-fpF-legend button[aria-pressed="true"]{ border-color:var(--hf-hand); box-shadow:0 0 0 2px var(--hf-hand); }
.hfb .hf-fpF-legend button b, .hfb .hf-fpF-cg td button b{ flex:none; display:inline-grid; place-items:center; width:20px; height:20px; border-radius:50%; background:var(--hf-k); color:#fff; font:800 12px/1 var(--body); }
.hfb .hf-fpF-cg{ width:100%; border-collapse:collapse; table-layout:fixed; }
.hfb .hf-fpF-cg th, .hfb .hf-fpF-cg td{ border:1px solid var(--hf-line); padding:0; height:32px; text-align:center; font:700 13px/1.1 var(--body); color:var(--ink); }
.hfb .hf-fpF-cg thead th{ background:var(--hf-grey); }
.hfb .hf-fpF-cg tbody th{ background:var(--hf-grey); text-align:start; padding:0 6px; font-size:13px; }
.hfb.hf-ar .hf-fpF-cg th{ font-family:${AR_F}; }
.hfb .hf-fpF-cg td button{ width:100%; height:32px; border:0; margin:0; padding:0; background:var(--paper); color:var(--graphite); cursor:pointer; display:grid; place-items:center; font:800 15px/1 var(--mono); }
.hfb .hf-fpF-cg td button.hf-fpF-ok{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); }
.hfb .hf-fpF-cg td button.hf-fpF-no{ background:color-mix(in srgb, var(--hf-red) 22%, var(--paper)); }
.hfb .hf-fpF-ht{ display:grid; grid-template-columns:repeat(6, minmax(0,1fr)); gap:3px; direction:ltr; }
.hfb .hf-fpF-ht > div{ border:1.5px solid var(--hf-line); border-radius:6px; padding:3px 2px; text-align:center; background:var(--paper); min-height:62px; display:grid; align-content:start; gap:2px; }
.hfb .hf-fpF-ht > div.hf-fpF-hon{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); }
.hfb .hf-fpF-ht i{ font:700 11.5px/1 var(--mono); font-style:normal; color:var(--graphite); }
.hfb .hf-fpF-ht b{ font:800 14px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-fpF-ht span{ font:600 12px/1.1 var(--mono); color:var(--hf-k); }
.hfb .hf-fpF-ht u{ text-decoration:none; font:800 13px/1.1 var(--mono); color:var(--hf-hand); animation:hf-up .35s both; }
.hfb .hf-fpF-hs{ font:600 13.5px/1.55 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 9px; color:var(--ink); direction:ltr; text-align:left; min-height:66px; }
.hfb .hf-fpF-hs > div{ animation:hf-up .35s both; } .hfb .hf-fpF-hs b{ color:var(--hf-k); }
.hfb .hf-fpF-cf .hf-code{ font-size:13px; line-height:1.45; padding:6px 8px; }
.hfb .hf-fpF-cf .hf-code > div{ min-height:1.45em; white-space:pre; }
.hfb .hf-fpF-bl{ display:inline-block; font:700 13px/1.2 var(--mono); min-width:26px; padding:1px 4px; margin:0 1px; border:1.5px dashed var(--hf-hand); border-radius:4px; background:var(--paper); color:var(--hf-hand); cursor:pointer; }
.hfb .hf-fpF-bl.hf-fpF-ok{ border-style:solid; border-color:var(--ok); color:var(--ink); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.hfb .hf-fpF-bl.hf-fpF-no{ border-style:solid; border-color:var(--hf-red); color:var(--ink); background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); }
.hfb .hf-fpF-pick{ display:grid; gap:3px; }
.hfb .hf-fpF-pr{ border:1.5px solid transparent; border-radius:7px; padding:2px 5px; display:flex; flex-wrap:wrap; align-items:center; gap:3px 8px; }
.hfb .hf-fpF-pr.hf-fpF-ok{ border-color:var(--ok); } .hfb .hf-fpF-pr.hf-fpF-no{ border-color:var(--hf-red); }
.hfb .hf-fpF-pq{ flex:1 1 100%; font-size:13.5px; line-height:1.28; color:var(--ink); margin:0; }
.hfb .hf-fpF-pq code{ font-family:var(--mono); font-size:.9em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-fpF-po{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-fpF-po button{ font:700 12.5px/1.1 var(--body); min-width:34px; min-height:28px; padding:2px 7px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fpF-po.hf-fpF-mono button{ font-family:var(--mono); }
.hfb .hf-fpF-po button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-fpF-po button.hf-fpF-ok{ border-color:var(--ok); background:var(--ok); color:#fff; }
.hfb .hf-fpF-po button.hf-fpF-no{ border-color:var(--hf-red); background:var(--hf-red); color:#fff; }
.hfb .hf-fpF-po button.hf-fpF-right{ border-color:var(--ok); color:var(--ok); border-style:dashed; }
.hfb .hf-fpF-pn{ flex:1 1 100%; font:600 12.5px/1.3 var(--body); color:var(--hf-hand); margin:1px 0 0; }
.hfb .hf-fpF-step{ border:2px solid var(--hf-line); border-radius:8px; padding:8px 10px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); display:grid; gap:7px; }
.hfb .hf-fpF-lab{ font:800 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); margin:0; }
.hfb .hf-fpF-task{ font-size:14.5px; line-height:1.36; color:var(--ink); margin:0; min-height:60px; }
.hfb .hf-fpF-res{ font:700 13.5px/1.35 var(--body); margin:0; min-height:38px; }
.hfb .hf-fpF-res.hf-fpF-ok{ color:var(--ok); } .hfb .hf-fpF-res.hf-fpF-no{ color:var(--hf-red); }
.hfb .hf-fpF-res code{ font:700 13px var(--mono); color:var(--ink); }
.hfb .hf-fpF-big button{ min-width:44px; height:36px; font-size:15px; }
.hfb .hf-fpF-sheet{ border:1.5px solid var(--hf-line); border-radius:4px; background:repeating-linear-gradient(var(--paper) 0 23px, var(--hf-grey2) 23px 24px); padding:2px 10px 4px; direction:ltr; text-align:left; }
.hfb .hf-fpF-sheet p{ margin:0; font:600 13px/24px var(--mono); color:var(--ink); white-space:pre; }
.hfb .hf-fpF-sheet p b{ color:var(--hf-k); }
.hfb .hf-fpF-sheet p i{ font:600 17px/24px "Caveat", cursive; font-style:normal; color:var(--hf-hand); }
.hfb .hf-fpF-types{ display:grid; gap:4px; }
.hfb .hf-fpF-types > div{ display:grid; grid-template-columns:24px minmax(0,1fr); gap:7px; align-items:start; }
.hfb .hf-fpF-types > div > b{ width:24px; height:24px; border-radius:50%; display:grid; place-items:center; background:var(--hf-line); color:var(--paper); font:800 12.5px/1 var(--mono); }
.hfb .hf-fpF-types > div > span{ font:600 13.5px/1.28 var(--body); color:var(--ink); }
.hfb .hf-fpF-types > div > span small{ display:block; font:600 12px/1.25 var(--mono); color:var(--hf-k); }
.hfb .hf-fpF-cards{ display:grid; gap:5px; }
.hfb .hf-fpF-cards > div{ border:1.5px solid var(--hf-line); border-radius:7px; padding:4px 8px; background:var(--paper); }
.hfb .hf-fpF-cards > div > b{ display:block; font:800 14px/1.2 var(--body); color:var(--hf-k); margin:0 0 1px; }
.hfb .hf-fpF-cards > div > p{ margin:0; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-fpF-quote{ font:italic 600 13.5px/1.32 var(--body); color:var(--ink); margin:0; direction:ltr; text-align:left; }
.hfb .hf-fpF-ladder{ display:grid; gap:4px; }
.hfb .hf-fpF-ladder > div{ display:grid; grid-template-columns:44px minmax(0,1fr); gap:8px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:4px 8px; background:var(--paper); }
.hfb .hf-fpF-ladder > div > b{ font:800 13px/1.1 var(--mono); color:var(--hf-k); text-align:center; }
.hfb .hf-fpF-ladder > div > span{ font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-fpF-ladder > div.hf-fpF-best{ border-width:2.5px; border-color:var(--hf-k); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-fpF-check{ display:grid; gap:3px; }
.hfb .hf-fpF-check > div{ display:grid; grid-template-columns:18px minmax(0,1fr); gap:6px; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-fpF-check > div::before{ content:""; width:12px; height:12px; margin-top:3px; border:2px solid var(--hf-line); border-radius:2px; }
.hf-ar .hf-fpF-rr > span, .hf-ar .hf-fpF-rnote, .hf-ar .hf-fpF-uses, .hf-ar .hf-fpF-bar > span, .hf-ar .hf-fpF-dl, .hf-ar .hf-fpF-tr, .hf-ar .hf-fpF-ask, .hf-ar .hf-fpF-bad, .hf-ar .hf-fpF-good, .hf-ar .hf-fpF-q, .hf-ar .hf-fpF-pq, .hf-ar .hf-fpF-pn, .hf-ar .hf-fpF-task, .hf-ar .hf-fpF-res, .hf-ar .hf-fpF-types > div > span, .hf-ar .hf-fpF-cards > div > p, .hf-ar .hf-fpF-ladder > div > span, .hf-ar .hf-fpF-check > div{ font-family:${AR_F}; line-height:1.48; }
.hf-ar .hf-fpF-rb button, .hf-ar .hf-fpF-tabs button, .hf-ar .hf-fpF-po button, .hf-ar .hf-fpF-lab, .hf-ar .hf-fpF-stop > span strong, .hf-ar .hf-fpF-stop > span em, .hf-ar .hf-fpF-cards > div > b{ font-family:${AR_F}; letter-spacing:0; text-transform:none; }
.hf-ar .hf-fpF-stop > span em{ line-height:1.4; font-size:12.5px; }
.hf-ar .hf-fpF-stop > span strong{ font-size:13.5px; }
.hf-ar .hf-fpF-po.hf-fpF-mono button{ font-family:var(--mono); }
.hf-ar .hf-fpF-legend{ direction:ltr; }
.hf-ar .hf-fpF-dl, .hf-ar .hf-fpF-pq, .hf-ar .hf-fpF-task{ font-size:13px; }
.hf-ar .hf-fpF-task{ font-size:13.5px; }
`;
    document.head.appendChild(s);
  }

  const num = s => { const x = String(s == null ? '' : s).replace(/[\s,]/g, '').replace(/(ms|bytes|b|kb|mb)$/i, '').replace(/^−/, '-'); return /^-?\d*\.?\d+$/.test(x) ? parseFloat(x) : NaN; };
  const L2 = (x, ar) => Array.isArray(x) ? (ar ? x[1] : x[0]) : x;

  /* ── page 0: how ready am I? one row per lecture, kept with useSlot ── */
  const LECS = [
    [1, 'Files and C/C++ file I/O', 'الـ files والـ I/O في C/C++'],
    [2, 'The hard disk', 'الـ hard disk'],
    [3, 'Fields and records', 'الـ fields والـ records'],
    [4, 'Heap and sorted files', 'الـ heap والـ sorted files'],
    [5, 'Hashing', 'الـ hashing']
  ];
  function Rate({ at }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('rate', {});
    const lab = ar ? ['مهزوز', 'نص نص', 'جامد'] : ['shaky', 'OK', 'solid'];
    const shaky = LECS.filter(l => v[l[0]] === 0);
    const done = LECS.filter(l => v[l[0]] != null).length;
    return html`<div className="hf-in">
      <div className="hf-fpF-rate">${LECS.map(([n, en, a]) => html`<div key=${n} className="hf-fpF-rr">
        <span><i>L${n}</i>${ar ? a : en}</span>
        <span className="hf-fpF-rb" role="group" aria-label=${'Lecture ' + n}>${lab.map((x, j) => html`<button key=${j} className=${'hf-fpF-s' + j} aria-pressed=${String(v[n] === j)} onClick=${() => setV(Object.assign({}, v, { [n]: j }))}>${x}</button>`)}</span>
      </div>`)}</div>
      <p className="hf-fpF-rnote">${!done ? (ar ? 'قيّم نفسك بصراحة، وهنقولك تبدأ منين.' : 'Rate yourself honestly, and we will tell you where to start.')
        : shaky.length ? T((ar ? 'ابدأ بـ: ' : 'Start with: ') + shaky.map(l => '<b>L' + l[0] + '</b>' + (at[l[0]] != null ? (ar ? ' (صفحة <bdi dir="ltr">' : ' (page ') + (at[l[0]] + 1) + (ar ? '</bdi>)' : ')') : '')).join(ar ? '، ' : ', ') + (ar ? '، وبعدين على طول للمسائل.' : ', then go straight to the problems.'))
        : (ar ? 'مفيش حاجة مهزوزة؟ يبقى روح على المسائل على طول، وبعدين ركن الامتحان.' : 'Nothing shaky? Then go straight to the problems, then the exam corner.')}</p>
    </div>`;
  }

  /* ── the course map: every lecture a stop, a ring that travels along them, arcs for the ideas that connect ── */
  const STOPS = [
    { t: ['Files & C/C++ I/O', 'الـ Files والـ I/O في C/C++‎'], d: ['Tell physical from logical files; open, read, write, close; pick the mode.', 'تفرّق بين الـ physical والـ logical file، وتفتح وتقرا وتكتب وتقفل، وتختار الـ mode.'],
      u: ['Comes back in L3 (fseek, seekg, the copy and update code) and in L2 (the OS works with sectors, the DBMS with blocks).', 'بيرجع في L3 (الـ fseek والـ seekg وكود الـ copy والـ update)، وفي L2 (الـ OS بيشتغل بالـ sectors، والـ DBMS بالـ blocks).'] },
    { t: ['The hard disk', 'الـ hard disk'], d: ['Name the parts; compute capacity, records per track and access time.', 'تعرف الأجزاء، وتحسب الـ capacity والـ records في الـ track والـ access time.'],
      u: ['One disk access = seek + rotational delay + transfer. L4 prices every operation in page reads and writes (D).', 'الـ disk access الواحد فيه seek وrotational delay وtransfer. وL4 بيحسب كل operation بقرايات وكتابات الـ pages (D).'] },
    { t: ['Fields & records', 'الـ fields والـ records'], d: ['Count a record\'s bytes in each structure; jump with RRN × size and fseek.', 'تعد bytes الـ record في كل structure، وتنط بـ <bdi dir="ltr">RRN × size</bdi> والـ fseek.'],
      u: ['Sequential search O(n) against direct access O(1): L4 and L5 turn these into costs.', 'الـ sequential search بـ <bdi dir="ltr">O(n)</bdi> قصاد الـ direct access بـ <bdi dir="ltr">O(1)</bdi>، وL4 وL5 بيحوّلوهم لتكاليف.'] },
    { t: ['Heap & sorted files', 'الـ heap والـ sorted files'], d: ['Write every cost in the table and say where it comes from.', 'تكتب كل تكلفة في الجدول، وتقول جاية منين.'],
      u: ['Uses L2\'s page reads and L3\'s searches; L5 adds the hashed column.', 'بيستخدم قرايات الـ pages من L2 والـ searches من L3، وL5 بيزوّد عمود الـ hashed.'] },
    { t: ['Hashing', 'الـ hashing'], d: ['Run the hash function by hand; spot synonyms; price a hashed file.', 'تشغّل الـ hash function بإيدك، وتطلّع الـ synonyms، وتحسب تكلفة الـ hashed file.'],
      u: ['Finishes L4\'s table: one address computation, one page read, O(1).', 'بيكمّل جدول L4: حسبة address واحدة وقراية page واحدة، يعني <bdi dir="ltr">O(1)</bdi>.'] }
  ];
  const LINKS = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
  const RH = 66, RG = 6, cy = i => i * (RH + RG) + RH / 2;
  function CourseMap() {
    const ar = useAr();
    const [a, setA] = useState(0);
    const [pin, setPin] = useState(false);
    useEffect(() => { if (calm() || pin) return; const id = setInterval(() => setA(x => (x + 1) % STOPS.length), 2800); return () => clearInterval(id); }, [pin]);
    const st = STOPS[a];
    return html`<div className="hf-fpF-map hf-in">
      <div className="hf-fpF-stops">
        <i className="hf-fpF-rail"></i>
        <i className=${'hf-fpF-ring' + (calm() ? ' calm' : '')} style=${{ transform: 'translateY(' + a * (RH + RG) + 'px)' }}></i>
        ${STOPS.map((s, i) => html`<button key=${i} className=${'hf-fpF-stop' + (i === a ? ' hf-fpF-on' : '')} aria-pressed=${String(i === a)} onClick=${() => { setA(i); setPin(true); }}>
          <b>${i + 1}</b><span><strong>${ar ? s.t[1] : s.t[0]}</strong><em>${T(ar ? s.d[1] : s.d[0])}</em></span></button>`)}
        <svg className="hf-fpF-links" viewBox="0 0 40 354" aria-hidden="true">${LINKS.map(([p, q], k) => { const r = 9 + 8 * (q - p); return html`<path key=${k} className=${p === a || q === a ? 'hf-fpF-hot' : ''} d=${'M2 ' + cy(p) + ' C' + (2 + r * 1.6) + ' ' + cy(p) + ' ' + (2 + r * 1.6) + ' ' + cy(q) + ' 2 ' + cy(q)} />`; })}</svg>
      </div>
      <p className="hf-fpF-uses" key=${a}>${T((ar ? '<b>اللي بيربطه:</b> ' : '<b>How it connects:</b> ') + (ar ? st.u[1] : st.u[0]))}</p>
    </div>`;
  }

  /* ── the hot list: topics ranked by the number of papers that asked them (of the 4 on the site), then by questions ── */
  const HOT = [
    ['The cost table (heap, sorted, hashed)', 'جدول التكلفة', 'L4–5', 4, 15],
    ['The disk problem: capacity, records, time', 'مسألة الـ disk', 'L2', 3, 13],
    ['Disk components by definition', 'أجزاء الـ disk', 'L2', 3, 8],
    ['C/C++ file I/O and code', 'الـ I/O والكود', 'L1·3', 3, 7],
    ['Access time: seek, rotation, transfer', 'الـ access time', 'L2', 3, 6],
    ['Field structures, stream files', 'الـ field structures', 'L3', 3, 6],
    ['Hashing: function, hashed, bucket', 'الـ hashing', 'L5', 3, 3],
    ['Access complexity O(1), O(n), O(log n)', 'الـ complexity', 'L3–4', 3, 3],
    ['File basics: managers, organization', 'أساسيات الـ files', 'L1', 3, 3],
    ['Disk bottleneck techniques', 'الـ disk bottleneck', 'L2', 2, 2]
  ];
  function Hot() {
    const ar = useAr();
    return html`<div className="hf-fpF-bars hf-in">
      <div className="hf-fpF-bh"><span>${ar ? 'الموضوع' : 'topic'}</span><span>${ar ? 'الأسئلة' : 'questions'}</span><span style=${{ textAlign: 'end' }}>${ar ? 'ورق' : 'papers'}</span></div>
      ${HOT.map((h, i) => html`<div key=${i} className="hf-fpF-bar"><span>${ar ? h[1] : h[0]}<small>${h[2]}</small></span>
        <i><u style=${{ width: Math.round(h[4] / 15 * 100) + '%', animationDelay: calm() ? '0s' : (0.1 + i * 0.08) + 's' }}></u></i><b>${h[3]}/4</b></div>`)}
    </div>`;
  }

  /* ── the desk: fill in a worked problem cell by cell; Check marks each row, shows the working and the trap; Show fills it in ── */
  function Desk({ id, rows, giv, after }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const ok = i => { const n = num(v[i]); return !isNaN(n) && Math.abs(n - rows[i].a) <= (rows[i].tol || 1e-6); };
    const right = rows.filter((_, i) => ok(i)).length;
    return html`<div className="hf-fpF-desk hf-in">
      ${giv && html`<p className="hf-fpF-giv">${T(giv)}</p>`}
      ${rows.map((r, i) => { const st = chk ? (ok(i) ? ' hf-fpF-ok' : ' hf-fpF-no') : '';
        return html`<div key=${i} className=${'hf-fpF-dr' + st}>
          ${r.b ? html`<p className="hf-fpF-bytes">${T(r.b)}</p>` : null}
          <span className="hf-fpF-dl">${T(L2(r.l, ar))}${r.f && !chk ? html`<small>${T(r.f)}</small>` : null}</span>
          <input className="hf-fpF-in" type="text" inputMode="decimal" dir="ltr" value=${v[i] == null ? '' : v[i]} placeholder=${r.u || '?'} aria-label=${String(L2(r.l, false)).replace(/<[^>]+>/g, '')}
            onInput=${e => { setV(Object.assign({}, v, { [i]: e.target.value })); setChk(false); }} />
          <span className="hf-fpF-mk">${chk ? (ok(i) ? '✓' : '✗') : ''}</span>
          ${chk ? html`<span className="hf-fpF-wk">${T(r.w)}</span>` : null}
          ${chk && !ok(i) && r.h ? html`<p className="hf-fpF-tr">${T(L2(r.h, ar))}</p>` : null}
        </div>`; })}
      <div className="hf-row" style=${{ marginTop: '3px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; rows.forEach((r, i) => { m[i] = r.s || String(r.a); }); setV(m); setChk(true); }}>${ar ? 'اعرض الحل' : 'Show me'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div>
      ${chk && right === rows.length && after ? html`<div className="hf-fpF-after">${after}</div>` : null}
    </div>`;
  }

  /* ── the step-through: pick each step's value; a wrong pick says which real mistake it is (built on Lecture 2's drill) ── */
  function Drill({ id, probs }) {
    const ar = useAr();
    const [p0, setP] = H.K.useSlot(id + ':p', 0);
    const p = p0 >= 0 && p0 < probs.length ? p0 : 0;
    const prog = probs.map((_, j) => H.K.useSlot(id + ':' + j, 0)[0]);
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = probs[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    return html`<div className="hf-fpF-drw hf-in">
      <div className="hf-fpF-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${probs.map((q, j) => html`<button key=${j} className=${prog[j] >= q.steps.length ? 'hf-fpF-dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? q.tab[1] : q.tab[0]}</button>`)}</div>
      <p className="hf-fpF-ask">${T(ar ? P.ar : P.en)}</p>
      <div className="hf-fpF-work">${P.steps.slice(0, k).reduce((a, s) => a.concat(s.w), []).map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}${!done && html`<div className="hf-fpF-cur">${st.l[0].replace('?', ' = ?')}</div>`}</div>
      ${done ? html`<p className="hf-fpF-good">${T(ar ? '<b>خلصت!</b> ' + P.done[1] : '<b>Done!</b> ' + P.done[0])}</p>`
        : html`<p className="hf-fpF-q">${ar ? st.l[1] : st.l[0]}</p><div className="hf-fpF-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${o}</button>`)}</div>`}
      ${bad && html`<p className="hf-fpF-bad">${T(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'اعرض الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'اعرض الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div>
    </div>`;
  }

  /* ── pick the right chip in each row (used for rounding, exam spellings, synonyms and "who am I?") ── */
  function Pick({ id, items, opts, mono }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const right = items.filter((it, i) => pick[i] === it.a).length;
    return html`<div className="hf-fpF-pick hf-in">
      ${items.map((it, i) => {
        const o = it.o || opts, p = pick[i], st = checked && p != null ? (p === it.a ? ' hf-fpF-ok' : ' hf-fpF-no') : '';
        return html`<div key=${i} className=${'hf-fpF-pr' + st}>
          <p className="hf-fpF-pq">${T(L2(it.q, ar))}</p>
          <div className=${'hf-fpF-po' + (mono ? ' hf-fpF-mono' : '')} dir=${ar && !mono ? 'rtl' : 'ltr'}>${o.map((x, j) => {
            const cls = checked && p === j ? (j === it.a ? 'hf-fpF-ok' : 'hf-fpF-no') : checked && p != null && j === it.a ? 'hf-fpF-right' : '';
            return html`<button key=${j} className=${cls} aria-pressed=${String(p === j)} onClick=${() => { setPick(Object.assign({}, pick, { [i]: j })); setChecked(false); }}>${T(L2(x, ar))}</button>`; })}</div>
          ${checked && p != null && p !== it.a && it.n ? html`<p className="hf-fpF-pn">${T(L2(it.n, ar))}</p>` : null}
        </div>`; })}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; items.forEach((it, i) => { m[i] = it.a; }); setPick(m); setChecked(true); }}>${ar ? 'اعرض الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${items.length}</bdi></span>`}
      </div>
    </div>`;
  }

  /* ── fill the cost table: pick a formula, then tap the cells it belongs to ── */
  const FORM = ['B(D + RC)', '0.5B(D + RC)', '2D + C', 'search + C + D', 'D·log₂B + C·log₂R', 'search + B(D + RC)', 'search + matches', '1.25B(D + RC)', 'H + D + 0.5RC'];
  const OPS = [['Scan', 'Scan'], ['Equality', 'Equality'], ['Range', 'Range'], ['Insert', 'Insert'], ['Delete', 'Delete']];
  const CKEY = [[0, 0, 7], [1, 4, 8], [0, 6, 7], [2, 5, 3], [3, 5, 3]];
  function CostGrid({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const [sel, setSel] = useState(null);
    const cells = []; CKEY.forEach((r, i) => r.forEach((a, j) => cells.push([i, j, a])));
    const right = cells.filter(([i, j, a]) => v[i + '-' + j] === a).length;
    const put = (i, j) => { if (sel == null) return; setV(Object.assign({}, v, { [i + '-' + j]: sel })); setChk(false); };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-fpF-legend" role="group" aria-label="Formulas">${FORM.map((f, k) => html`<button key=${k} aria-pressed=${String(sel === k)} onClick=${() => setSel(sel === k ? null : k)}><b>${k + 1}</b>${f}</button>`)}</div>
      <div dir="ltr"><table className="hf-fpF-cg"><colgroup><col style=${{ width: '28%' }} /><col /><col /><col /></colgroup>
        <thead><tr><th></th><th>Heap</th><th>Sorted</th><th>Hashed</th></tr></thead>
        <tbody>${OPS.map((o, i) => html`<tr key=${i}><th>${o[0]}</th>${[0, 1, 2].map(j => { const x = v[i + '-' + j], st = chk && x != null ? (x === CKEY[i][j] ? 'hf-fpF-ok' : 'hf-fpF-no') : '';
          return html`<td key=${j}><button className=${st} aria-label=${o[0] + ', ' + ['heap', 'sorted', 'hashed'][j]} onClick=${() => put(i, j)}>${x != null ? html`<b>${x + 1}</b>` : '·'}</button></td>`; })}</tr>`)}</tbody></table></div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; cells.forEach(([i, j, a]) => { m[i + '-' + j] = a; }); setV(m); setChk(true); setSel(null); }}>${ar ? 'اعرض الجدول' : 'Show the table'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / 15</bdi></span>`}
      </div>
    </div>`;
  }

  /* ── trace the notes' hash function on the summary's key ZZZZZZ, one step at a time ── */
  const HKEY = 'ZZZZZZ', HMAX = 1000;
  const hcodes = k => Array.from({ length: 12 }, (_, i) => i < k.length ? k.charCodeAt(i) : 0);
  const hashOf = (k, max) => { const c = hcodes(k); let sum = 0; const pr = []; for (let j = 0; j < 12; j += 2) { pr.push(c[j] * c[j + 1]); sum += c[j] * c[j + 1]; } const s2 = sum % 19937; return { c, pr, sum, s2, h: s2 % max }; };
  function HashTrace({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, 0);
    const R = hashOf(HKEY, HMAX), N = 4;
    const ch = i => i < HKEY.length ? HKEY[i] : '\\0';
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-fpF-ht">${[0, 1, 2, 3, 4, 5].map(p => html`<div key=${p} className=${k >= 1 && R.pr[p] ? 'hf-fpF-hon' : ''}>
        <i>j = ${2 * p}</i><b>${ch(2 * p)} ${ch(2 * p + 1)}</b><span>${R.c[2 * p]}×${R.c[2 * p + 1]}</span>${k >= 1 ? html`<u>${R.pr[p]}</u>` : null}</div>`)}</div>
      <div className="hf-fpF-hs">
        ${k >= 1 && html`<div>pairs: 8100 + 8100 + 8100 + 0 + 0 + 0</div>`}
        ${k >= 2 && html`<div>sum = <b>${R.sum}</b> ${ar ? '' : ''}(≥ 19937)</div>`}
        ${k >= 3 && html`<div>${R.sum} % 19937 = <b>${R.s2}</b></div>`}
        ${k >= 4 && html`<div>${R.s2} % ${HMAX} = <b>${R.h}</b>  ← home address</div>`}
        ${k === 0 && html`<div>key[12] = "ZZZZZZ", Z = 90, the rest '\\0' = 0</div>`}
      </div>
      <div className="hf-row">
        <button className="hf-btn" disabled=${k === 0} onClick=${() => setK(k - 1)} aria-label=${ar ? 'اللي فات' : 'Back'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" disabled=${k >= N} onClick=${() => setK(k + 1)}>${ar ? 'الخطوة الجاية' : 'Next step'}</button>
        <button className="hf-btn" onClick=${() => setK(N)}>${ar ? 'اعرض الكل' : 'Show all'}</button>
        <span className="hf-dots">${[1, 2, 3, 4].map(j => html`<i key=${j} className=${k >= j ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  /* ── code with blanks: tap a blank to cycle its choices; Check marks them; Show fills them in ── */
  function CodeFill({ id, lines }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const blanks = []; lines.forEach(l => l.forEach(p => { if (Array.isArray(p)) blanks.push(p); }));
    const right = blanks.filter((b, i) => v[i] === b[1]).length;
    let bi = -1;
    return html`<div className="hf-fpF-cf hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-code" dir="ltr">${lines.map((l, li) => html`<div key=${li}>${l.map((p, pi) => {
        if (!Array.isArray(p)) return p;
        bi++; const b = bi, x = v[b], st = chk && x != null ? (x === p[1] ? ' hf-fpF-ok' : ' hf-fpF-no') : '';
        return html`<button key=${pi} className=${'hf-fpF-bl' + st} aria-label=${'Blank ' + (b + 1)} onClick=${() => { setV(Object.assign({}, v, { [b]: x == null ? 0 : (x + 1) % p[0].length })); setChk(false); }}>${x == null ? '?' : p[0][x]}</button>`; })}</div>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; blanks.forEach((b, i) => { m[i] = b[1]; }); setV(m); setChk(true); }}>${ar ? 'اعرض الكود' : 'Show the code'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / ${blanks.length}</bdi></span>`}
      </div>
    </div>`;
  }

  /* ── be the C runtime: one program's need at a time; pick the fopen mode and see its C++ flags (built on Lecture 1's) ── */
  const MODES = ['r', 'w', 'a', 'r+', 'w+', 'a+'];
  const FLAGS = ['ios::in', 'ios::out | ios::trunc', 'ios::out | ios::app', 'ios::out | ios::in', 'ios::out | ios::in | ios::trunc', 'ios::out | ios::in | ios::app'];
  const TASKS = [
    { q: ['Show a settings file that must already exist. Never change it.', 'اعرض ملف إعدادات لازم يكون موجود أصلًا، ومتغيّرش فيه حاجة.'], a: 0 },
    { q: ['Start today\'s report. Yesterday\'s contents must go.', 'ابدأ تقرير النهارده، واللي كان فيه من امبارح لازم يتمسح.'], a: 1 },
    { q: ['Add a line to the end of an existing log and keep the old lines.', 'زوّد سطر في آخر log موجود، والسطور القديمة تفضل.'], a: 2 },
    { q: ['Fix one record of an existing file in place: read it, then write it back.', 'صلّح record واحد في file موجود في مكانه: تقراه وبعدين تكتبه تاني.'], a: 3 },
    { q: ['Create a fresh scratch file, write to it, then read it back.', 'اعمل file جديد خالص، اكتب فيه، وبعدين اقراه تاني.'], a: 4 },
    { q: ['Read an existing log and also add lines to its end.', 'اقرا log موجود، وكمان زوّد سطور في آخره.'], a: 5 }
  ];
  const MDO = [['open existing, read', 'يفتح file موجود للقراية'], ['create or truncate, write', 'يعمل file جديد أو يمسح القديم، للكتابة'], ['create or append, write', 'يعمل file جديد أو يكمّل في آخره، للكتابة'], ['existing, read and write', 'file موجود، قراية وكتابة'], ['create or truncate, read and write', 'جديد أو يمسح القديم، قراية وكتابة'], ['create or append, read and write', 'جديد أو يكمّل في آخره، قراية وكتابة']];
  function ModeStep({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', {});
    const tk = TASKS[k], p = pick[k], c = !!chk[k];
    const right = TASKS.filter((x, i) => chk[i] && pick[i] === x.a).length;
    const set = j => { setPick(Object.assign({}, pick, { [k]: j })); setChk(Object.assign({}, chk, { [k]: false })); };
    const res = c ? (p === tk.a
      ? (ar ? 'صح. الـ <code>"' + MODES[p] + '"</code> معناها ' + MDO[p][1] + '، وفي الـ C++‎ هي:<span class="ltr"><code>' + FLAGS[p] + '</code></span>' : 'Right. <code>"' + MODES[p] + '"</code> = ' + MDO[p][0] + '. In C++: <code>' + FLAGS[p] + '</code>')
      : (ar ? 'لأ. الـ <code>"' + MODES[p] + '"</code> معناها ' + MDO[p][1] + '. فكّر تاني: الـ file موجود؟ هيتمسح؟ هتقرا ولا هتكتب؟' : 'No. <code>"' + MODES[p] + '"</code> = ' + MDO[p][0] + '. Think again: must the file exist, may it be wiped, do you read or write?')) : '';
    return html`<div className="hf-fpF-step hf-in">
      <div className="hf-row"><span className="hf-fpF-lab">${ar ? html`البرنامج <bdi dir="ltr">${k + 1} / ${TASKS.length}</bdi>` : 'Program ' + (k + 1) + ' of ' + TASKS.length}</span><span style=${{ flex: 1 }}></span>
        <span className="hf-dots">${TASKS.map((x, j) => html`<i key=${j} className=${chk[j] && pick[j] === x.a ? 'on' : ''}></i>`)}</span></div>
      <p className="hf-fpF-task" key=${k}>${ar ? tk.q[1] : tk.q[0]}</p>
      <div className="hf-fpF-po hf-fpF-mono hf-fpF-big" dir="ltr">${MODES.map((x, j) => html`<button key=${j} className=${c && p === j ? (j === tk.a ? 'hf-fpF-ok' : 'hf-fpF-no') : ''} aria-pressed=${String(p === j)} onClick=${() => set(j)}>${x}</button>`)}</div>
      <p className=${'hf-fpF-res' + (c ? (p === tk.a ? ' hf-fpF-ok' : ' hf-fpF-no') : '')}>${c ? T(res) : ''}</p>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => setK(Math.max(0, k - 1))} disabled=${k === 0} aria-label=${ar ? 'اللي فات' : 'Previous program'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" disabled=${p == null} onClick=${() => setChk(Object.assign({}, chk, { [k]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setPick(Object.assign({}, pick, { [k]: tk.a })); setChk(Object.assign({}, chk, { [k]: true })); }}>${ar ? 'اعرض' : 'Show me'}</button>
        <button className="hf-btn" onClick=${() => setK(Math.min(TASKS.length - 1, k + 1))} disabled=${k === TASKS.length - 1} aria-label=${ar ? 'اللي بعده' : 'Next program'}>${ar ? '‹' : '›'}</button>
        <span className="hf-score"><bdi dir="ltr">${right} / ${TASKS.length}</bdi></span>
      </div>
    </div>`;
  }

  /* ── the worked problems' data (every number checked with node, see the top of this file) ── */
  const GIV_A = 'Model A: 10,000 records × 128 B · 512 B/sector · 20 sectors/track · cylinder height 12 · 500 tracks/surface · overhead 500 B/block · 5000 rpm · seek 7 ms';
  const DESK_A1 = [
    { l: ['Revolution time', 'وقت اللفة'], f: '60 × 1000 / rpm', a: 12, u: 'ms', w: '60,000 / 5000 = <b>12 ms</b>', h: ['0.012 is in seconds. × 1000 for ms.', 'الـ 0.012 دي بالثواني، اضرب في 1000.'] },
    { l: ['(i) Average latency', '(i) الـ average latency'], f: '½ × revolution', a: 6, u: 'ms', w: '½ × 12 = <b>6 ms</b>', h: ['A full turn (12 ms) is the maximum latency, not the average.', 'اللفة الكاملة (12) دي أكبر latency، مش المتوسط.'] },
    { l: ['Track capacity', 'الـ track capacity'], f: 'sectors/track × bytes/sector', a: 10240, s: '10,240', u: 'B', w: '20 × 512 = <b>10,240 B</b>', h: ['Track = sectors per track × bytes per sector.', 'الـ track بيساوي عدد الـ sectors في الـ track مضروب في حجم الـ sector.'] },
    { l: ['Block size, BF 20', 'حجم الـ block لما الـ BF بـ 20'], f: 'BF × record + overhead', a: 3060, s: '3060', u: 'B', w: '20 × 128 + 500 = <b>3060 B</b>', h: ['Add the 500 B overhead to the 20 records.', 'ضيف الـ 500 B overhead على الـ 20 record.'] },
    { l: ['Blocks per track', 'عدد الـ blocks في الـ track'], f: '⌊track / block⌋', a: 3, w: '⌊10,240 / 3060⌋ = ⌊3.35⌋ = <b>3</b>', h: ['Floor it: a block cannot be split across tracks.', 'خد الـ floor: الـ block مينفعش يتقسم على 2 tracks.'] },
    { l: ['(ii) Records per track', '(ii) عدد الـ records في الـ track'], f: 'blocks × BF', a: 60, w: '3 × 20 = <b>60 records</b>', h: ['10,240 / 128 = 80 ignores the blocks and their overhead.', 'الـ 80 دي <bdi dir="ltr">10,240 / 128</bdi>، يعني نسيت الـ blocks والـ overhead.'] }
  ];
  const DESK_A2 = [
    { l: ['Cylinder size', 'حجم الـ cylinder'], f: 'height × track', a: 122880, s: '122,880', u: 'B', w: '12 × 10,240 = <b>122,880 B</b>', h: ['A cylinder holds one track per surface: 12 of them.', 'الـ cylinder فيه track على كل surface، يعني 12.'] },
    { l: ['(iii) Disk capacity', '(iii) الـ disk capacity'], f: 'cylinder × tracks/surface', a: 61440000, s: '61,440,000', u: 'B', w: '122,880 × 500 = <b>61,440,000 B</b> ≈ 58.6 MB', h: ['Cylinders = tracks per surface = 500.', 'عدد الـ cylinders هو عدد الـ tracks في الـ surface، يعني 500.'] },
    { l: ['Transfer, 3 sectors', 'الـ transfer لـ 3 sectors'], f: 'n × revolution / sectors per track', a: 1.8, u: 'ms', w: '3 × 12 / 20 = <b>1.8 ms</b>', h: ['Three sectors are 3/20 of one revolution.', 'التلات sectors دول <bdi dir="ltr">3/20</bdi> من لفة واحدة.'] },
    { l: ['(iv) Average access time', '(iv) الـ average access time'], f: 'seek + latency + transfer', a: 14.8, u: 'ms', w: '7 + 6 + 1.8 = <b>14.8 ms</b>', h: ['All three parts: seek 7, latency 6, transfer 1.8.', 'التلات أجزاء: الـ seek بـ 7، والـ latency بـ 6، والـ transfer بـ 1.8.'] }
  ];
  const GIV_V = '200 B/record · 512 B/sector · 40 sectors/track · height 8 · 1000 tracks/surface · overhead 400 B · BF 25 · 6000 rpm · seek 9 ms · 5 sectors';
  const DESK_V = [
    { l: ['Average latency', 'الـ average latency'], f: '½ × 60,000 / rpm', a: 5, u: 'ms', w: 'rev = 60,000 / 6000 = 10 ms → ½ × 10 = <b>5 ms</b>', h: ['Half of one revolution (10 ms).', 'نص لفة واحدة (10 ms).'] },
    { l: ['Block size', 'حجم الـ block'], f: 'BF × record + overhead', a: 5400, s: '5400', u: 'B', w: '25 × 200 + 400 = <b>5400 B</b>', h: ['25 records plus the 400 B overhead.', 'الـ 25 record وفوقهم الـ 400 B overhead.'] },
    { l: ['Records per track', 'عدد الـ records في الـ track'], f: '⌊track / block⌋ × BF', a: 75, w: 'track = 40 × 512 = 20,480 → ⌊20,480 / 5400⌋ = ⌊3.79⌋ = 3 → <b>75</b>', h: ['100 rounds 3.79 up, or forgets the overhead. Only whole blocks fit.', 'الـ 100 دي قرّبت 3.79 لفوق أو نسيت الـ overhead. الـ blocks الكاملة بس هي اللي بتدخل.'] },
    { l: ['Disk capacity', 'الـ disk capacity'], f: 'track × height × tracks/surface', a: 163840000, s: '163,840,000', u: 'B', w: '20,480 × 8 × 1000 = <b>163,840,000 B</b> = 156.25 MB', h: ['Track × cylinder height × number of cylinders.', 'الـ track في الـ cylinder height في عدد الـ cylinders.'] },
    { l: ['Transfer, 5 sectors', 'الـ transfer لـ 5 sectors'], f: 'n × revolution / sectors per track', a: 1.25, u: 'ms', w: '5 × 10 / 40 = <b>1.25 ms</b>', h: ['Five sectors are 5/40 of a 10 ms revolution.', 'الخمس sectors دول <bdi dir="ltr">5/40</bdi> من لفة الـ 10 ms.'] },
    { l: ['Average access time', 'الـ average access time'], f: 'seek + latency + transfer', a: 15.25, u: 'ms', w: '9 + 5 + 1.25 = <b>15.25 ms</b>', h: ['Seek 9 + latency 5 + transfer 1.25.', 'الـ seek بـ 9 والـ latency بـ 5 والـ transfer بـ 1.25.'] }
  ];
  const DRILL_B = [
    { tab: ['Model B', 'Model B'], done: ['153,600 B · 1200 records · 84 tracks · 153,600,000 B · 19 ms.', '<bdi dir="ltr">153,600 B · 1200 · 84 · 153,600,000 B · 19 ms</bdi>'],
      en: '<b>Model B</b>: 10,000 × 128 B · 512 B/sector · 30 sectors/track · height 10 · 1000 tracks/surface · 1000 rpm · seek 10 ms · rotational delay <b>5 ms</b>. Cylinder size, records per cylinder, tracks for the file, disk size, time to read 2 sectors.',
      ar: 'الـ <b><bdi dir="ltr">Model B</bdi></b>: الأرقام دي:<span class="ltr">10,000 × 128 B · 512 B/sector · 30 sectors/track · height 10 · 1000 tracks/surface · 1000 rpm · seek 10 ms · delay 5 ms</span>احسب الـ cylinder والـ records فيه، والـ tracks للـ file، وحجم الـ disk، ووقت قراية 2 sectors.',
      steps: [
        { l: ['Track size?', 'حجم الـ track كام؟'], o: ['2048 B', '15,360 B', '5120 B'], a: 1, w: 'track = 30 × 512 = 15,360 B',
          h: [['2048 = 4 × 512 is a cluster, not a track.', 'الـ 2048 دي <bdi dir="ltr">4 × 512</bdi> يعني cluster، مش track.'], null, ['5120 = 10 × 512 uses the cylinder height.', 'الـ 5120 دي استخدمت الـ cylinder height.']] },
        { l: ['Cylinder size?', 'حجم الـ cylinder كام؟'], o: ['153,600 B', '15,360,000 B', '76,800 B'], a: 0, w: 'cyl = 10 × 15,360 = 153,600 B (150 KB)',
          h: [null, ['1000 × 15,360 is one whole surface.', 'ده surface كامل.'], ['76,800 uses 5 platters. A cylinder has one track per surface: 10.', 'ده استخدم الـ 5 platters، والـ cylinder فيه track على كل surface يعني 10.']] },
        { l: ['Records per cylinder?', 'كام record في الـ cylinder؟'], o: ['120', '1200', '300'], a: 1, w: 'records/cyl = 153,600 / 128 = 1200',
          h: [['120 is per track (15,360 / 128).', 'الـ 120 دي في الـ track الواحد.'], null, ['300 is the sectors per cylinder (153,600 / 512).', 'الـ 300 دي عدد الـ sectors في الـ cylinder.']] },
        { l: ['Tracks for the file?', 'الـ file محتاج كام track؟'], o: ['83', '84', '2500'], a: 1, w: ['file = 10,000 × 128 = 1,280,000 B', 'tracks = 1,280,000 / 15,360 = 83.33 → 84'],
          h: [['Rounding down leaves the last third of a track with nowhere to go.', 'لو قرّبت لتحت، آخر تلت track من الـ file مش هيلاقي مكان.'], null, ['2500 is the number of sectors.', 'الـ 2500 دي عدد الـ sectors.']] },
        { l: ['Total disk size?', 'حجم الـ disk كله كام؟'], o: ['153,600,000 B', '15,360,000 B', '1,536,000,000 B'], a: 0, w: 'disk = 153,600 × 1000 = 153,600,000 B ≈ 146.5 MB',
          h: [null, ['That is one surface.', 'ده surface واحد بس.'], ['That multiplies by the height (10) a second time.', 'ده ضرب في الـ height مرة تانية.']] },
        { l: ['Time to read 2 sectors?', 'وقت قراية 2 sectors كام؟'], o: ['19 ms', '44 ms', '75 ms'], a: 0, w: ['rev = 60,000 / 1000 = 60 ms', 'transfer = 2 × 60 / 30 = 4 ms', 'total = 10 + 5 + 4 = 19 ms'],
          h: [null, ['44 = 10 + 30 + 4 uses half a revolution. The paper GIVES the rotational delay: 5 ms.', 'الـ 44 استخدمت نص لفة (30). الورقة <b>مدّياك</b> الـ rotational delay: 5 ms.'], ['75 = 10 + 5 + 60 takes a full revolution as the transfer.', 'الـ 75 حسبت لفة كاملة كـ transfer.']] }
      ] },
    { tab: ['Model C', 'Model C'], done: ['1200 records · 2500 sectors · 153,600,000 B · 23 ms.', '<bdi dir="ltr">1200 · 2500 sectors · 153,600,000 B · 23 ms</bdi>'],
      en: '<b>Model C</b>, the same disk as Model B: records per cylinder, sectors to save the file, total disk size, time to read <b>4</b> sectors.',
      ar: 'الـ <b><bdi dir="ltr">Model C</bdi></b>، نفس الـ disk بتاع الـ <bdi dir="ltr">Model B</bdi>: الـ records في الـ cylinder، والـ sectors للـ file، وحجم الـ disk، ووقت قراية <b>4</b> sectors.',
      steps: [
        { l: ['Records per cylinder?', 'كام record في الـ cylinder؟'], o: ['1200', '120', '300'], a: 0, w: 'cyl = 30 × 512 × 10 = 153,600 → / 128 = 1200',
          h: [null, ['120 is per track.', 'الـ 120 دي في الـ track.'], ['300 is sectors per cylinder.', 'الـ 300 دي sectors في الـ cylinder.']] },
        { l: ['Sectors for the file?', 'الـ file محتاج كام sector؟'], o: ['2500', '10,000', '84'], a: 0, w: 'sectors = 1,280,000 / 512 = 2500',
          h: [null, ['10,000 gives each record a whole sector. A 512 B sector holds 4 records of 128 B.', 'الـ 10,000 دي إدّت كل record sector لوحده، والـ sector بيشيل 4 records.'], ['84 is the number of tracks.', 'الـ 84 دي عدد الـ tracks.']] },
        { l: ['Total disk size?', 'حجم الـ disk كله كام؟'], o: ['153,600,000 B', '15,360,000 B', '153,600 B'], a: 0, w: '153,600 × 1000 = 153,600,000 B ≈ 146.5 MB',
          h: [null, ['That is one surface.', 'ده surface واحد.'], ['That is one cylinder.', 'ده cylinder واحد.']] },
        { l: ['Time to read 4 sectors?', 'وقت قراية 4 sectors كام؟'], o: ['23 ms', '8 ms', '48 ms'], a: 0, w: ['transfer = 4 × 60 / 30 = 8 ms', 'total = 10 + 5 + 8 = 23 ms'],
          h: [null, ['8 ms is only the transfer.', 'الـ 8 دي الـ transfer بس.'], ['48 = 10 + 30 + 8 uses half a revolution instead of the given 5 ms.', 'الـ 48 استخدمت نص لفة بدل الـ 5 ms اللي في الورقة.']] }
      ] },
    { tab: ['Ours', 'من عندنا'], done: ['98,304 B · 384 · 79 cylinders · 196,608,000 B · 10 ms · 23.875 ms.', '<bdi dir="ltr">98,304 B · 384 · 79 · 196,608,000 B · 10 ms · 23.875 ms</bdi>'],
      en: '<b>Ours</b>: 30,000 × 256 B · 512 B/sector · 32 sectors/track · height 6 · 2000 tracks/surface · 3000 rpm · seek 12 ms · <b>no</b> rotational delay given. Read 3 sectors.',
      ar: 'الأرقام دي <b>من عندنا</b>:<span class="ltr">30,000 × 256 B · 512 B/sector · 32 sectors/track · height 6 · 2000 tracks/surface · 3000 rpm · seek 12 ms</span>ومفيش rotational delay في السؤال. هنقرا 3 sectors.',
      steps: [
        { l: ['Cylinder size?', 'حجم الـ cylinder كام؟'], o: ['98,304 B', '16,384 B', '49,152 B'], a: 0, w: ['track = 32 × 512 = 16,384 B', 'cyl = 6 × 16,384 = 98,304 B'],
          h: [null, ['16,384 is one track.', 'ده track واحد.'], ['49,152 uses 3 platters. One track per surface: 6.', 'ده استخدم الـ 3 platters، والصح track على كل surface يعني 6.']] },
        { l: ['Records per cylinder?', 'كام record في الـ cylinder؟'], o: ['384', '64', '192'], a: 0, w: 'records/cyl = 98,304 / 256 = 384',
          h: [null, ['64 is per track.', 'الـ 64 دي في الـ track.'], ['192 is sectors per cylinder.', 'الـ 192 دي sectors في الـ cylinder.']] },
        { l: ['Cylinders for the file?', 'الـ file محتاج كام cylinder؟'], o: ['78', '79', '469'], a: 1, w: ['file = 30,000 × 256 = 7,680,000 B', 'cyls = 7,680,000 / 98,304 = 78.125 → 79'],
          h: [['78 leaves the last 0.125 of a cylinder with nowhere to go.', 'الـ 78 سابت آخر حتة من الـ file من غير مكان.'], null, ['469 is the tracks (468.75 → 469).', 'الـ 469 دي عدد الـ tracks.']] },
        { l: ['Disk size?', 'حجم الـ disk كام؟'], o: ['196,608,000 B', '32,768,000 B', '589,824 B'], a: 0, w: 'disk = 98,304 × 2000 = 196,608,000 B = 187.5 MB',
          h: [null, ['That is one surface.', 'ده surface واحد.'], ['That multiplies the cylinder by the height again.', 'ده ضرب الـ cylinder في الـ height تاني.']] },
        { l: ['Average rotational delay?', 'الـ average rotational delay كام؟'], o: ['20 ms', '10 ms', '0 ms'], a: 1, w: 'rev = 60,000 / 3000 = 20 ms → ½ × 20 = 10 ms',
          h: [['20 ms is a full revolution: the maximum.', 'الـ 20 دي لفة كاملة، يعني أكبر قيمة.'], null, ['0 is the minimum.', 'الصفر ده أقل قيمة.']] },
        { l: ['Time to read 3 sectors?', 'وقت قراية 3 sectors كام؟'], o: ['23.875 ms', '22 ms', '33.875 ms'], a: 0, w: ['transfer = 3 × 20 / 32 = 1.875 ms', 'total = 12 + 10 + 1.875 = 23.875 ms'],
          h: [null, ['22 forgets the transfer.', 'الـ 22 نسيت الـ transfer.'], ['33.875 takes a full revolution as the delay.', 'الـ 33.875 حسبت لفة كاملة كـ delay.']] }
      ] }
  ];
  const GIV_C = 'Ours: B = 1024 pages · R = 16 · D = 10 ms · C = 1 ms · H = 2 ms   (log₂1024 = 10, log₂16 = 4)';
  const DESK_C = [
    { l: ['Heap equality search', 'الـ equality search في الـ heap'], f: '0.5B(D + RC)', a: 13312, s: '13,312', u: 'ms', w: '0.5 × 1024 × (10 + 16) = <b>13,312 ms</b>', h: ['Half the pages, each costing D + RC = 26 ms.', 'نص الـ pages، وكل واحدة بـ <bdi dir="ltr">D + RC = 26</bdi>.'] },
    { l: ['Heap insert', 'الـ insert في الـ heap'], f: '2D + C', a: 21, u: 'ms', w: '2 × 10 + 1 = <b>21 ms</b>', h: ['Read the last page, add, write it back: no search.', 'تقرا آخر page وتضيف وتكتبها تاني، من غير search.'] },
    { l: ['Sorted equality search', 'الـ equality search في الـ sorted'], f: 'D·log₂B + C·log₂R', a: 104, u: 'ms', w: '10 × 10 + 1 × 4 = <b>104 ms</b>', h: ['Binary search over the pages, then inside the page.', 'binary search على الـ pages، وبعدين جوه الـ page.'] },
    { l: ['Sorted insert', 'الـ insert في الـ sorted'], f: 'search + B(D + RC)', a: 26728, s: '26,728', u: 'ms', w: '104 + 1024 × 26 = 104 + 26,624 = <b>26,728 ms</b>', h: ['Search, then half the file read AND written: 2 × 0.5B(D + RC).', 'الـ search، وبعدين نص الـ file بيتقري وبيتكتب: <bdi dir="ltr">2 × 0.5B(D + RC)</bdi>.'] },
    { l: ['Hashed scan', 'الـ scan في الـ hashed'], f: '1.25B(D + RC)', a: 33280, s: '33,280', u: 'ms', w: '1.25 × 1024 × 26 = 1280 × 26 = <b>33,280 ms</b>', h: ['Buckets about 80% full: 1.25 × the pages.', 'الـ buckets مليانة حوالي 80%، فالـ pages بتبقى 1.25 مرة.'] },
    { l: ['Hashed equality search', 'الـ equality search في الـ hashed'], f: 'H + D + 0.5RC', a: 20, u: 'ms', w: '2 + 10 + 0.5 × 16 × 1 = <b>20 ms</b>', h: ['One hash, one page, half its records.', 'hash واحد، وpage واحدة، ونص الـ records بتاعتها.'] }
  ];
  const HK = [['Yara', 91], ['Samy', 3], ['Zaki', 28], ['Hassan', 42], ['Reem', 91], ['Ali', 20]];
  const DESK_H = HK.map(([k, a]) => { const r = hashOf(k, 100), n = Math.ceil(k.length / 2);
    return { l: '<b style="font-family:var(--mono)">' + k + '</b>', f: Array.from({ length: n }, (_, p) => r.c[2 * p] + '×' + r.c[2 * p + 1]).join(' + '), a, w: 'sum ' + r.sum + ' → % 19937 = ' + r.s2 + ' → % 100 = <b>' + r.h + '</b>',
      h: r.sum >= 19937 ? ['Here the sum passed 19937: take % 19937 first (skipping it gives ' + (r.sum % 100) + ').', 'هنا الـ sum عدّى 19937، فلازم الباقي على 19937 الأول (لو نطيته هيطلع ' + (r.sum % 100) + ').'] : ['Multiply each pair, add, % 19937, then % 100.', 'اضرب كل pair واجمع، وبعدين الباقي على 19937، وبعدين على 100.'] }; });
  const GIV_R = 'Ours: fixed-length records of 64 B · first record = RRN 0';
  const DESK_R = [
    { l: ['Byte offset of RRN 7', 'الـ byte offset بتاع الـ RRN 7'], f: 'RRN × size', a: 448, w: '7 × 64 = <b>448</b>', h: ['8 × 64 = 512 counts RRNs from 1.', 'الـ 512 دي عدّت من 1.'] },
    { l: ['RRN of the record at byte 960', 'الـ RRN بتاع الـ record اللي عند byte 960'], f: 'offset / size', a: 15, w: '960 / 64 = <b>15</b>', h: ['It is the 16th record, but its RRN is 15.', 'ده الـ record رقم 16، بس الـ RRN بتاعه 15.'] },
    { l: ['<code>tellg()</code> after <code>seekg(0, ios::end)</code> says 2048. Records?', 'الـ <code>tellg()</code> بعد <code>seekg(0, ios::end)</code> قال 2048. كام record؟'], f: 'size / record', a: 32, w: '2048 / 64 = <b>32 records</b>', h: ['File size ÷ record size.', 'حجم الـ file على حجم الـ record.'] },
    { l: ['Last RRN', 'آخر RRN'], a: 31, w: 'RRN 0 … <b>31</b>', h: ['32 records are RRN 0 to 31.', 'الـ 32 record أرقامهم من 0 لـ 31.'] },
    { l: ['Offset for <code>fseek(fp, ?, 2)</code> to the start of the last record', 'الـ offset في <code>fseek(fp, ?, 2)</code> عشان تروح لأول آخر record'], a: -64, s: '-64', w: 'origin 2 = end: 2048 − 64 = 1984 = 31 × 64 → <b>-64L</b>', h: ['From the end you go back: a negative offset.', 'من الآخر بترجع لورا، فالـ offset سالب.'] },
    { l: ['<code>seekp</code> position to update RRN 10', 'مكان الـ <code>seekp</code> عشان تعدّل الـ RRN 10'], f: 'RRN × sizeof(record)', a: 640, w: '10 × 64 = <b>640</b> (ios::beg)', h: ['Same formula as reading: RRN × size.', 'نفس الـ formula: <bdi dir="ltr">RRN × size</bdi>.'] }
  ];
  const DESK_B = [
    { l: ['Fixed length (5, 10, 4)', 'الـ Fixed length (5 و10 و4)'], b: '20431SALMA<i>·····</i>CS<i>··</i>', a: 19, w: '5 + 10 + 4 = <b>19</b> (7 bytes of padding)', h: ['Fixed fields always take their full length, padding included.', 'الـ fixed fields بتاخد طولها كله، بالـ padding.'] },
    { l: ['Length indicator (2 digits)', 'الـ Length indicator (رقمين)'], b: '<u>05</u>20431<u>05</u>SALMA<u>02</u>CS', a: 18, w: '2+5 + 2+5 + 2+2 = <b>18</b>', h: ['Count the two digits of every length too.', 'عدّ الرقمين بتوع كل طول كمان.'] },
    { l: ['Delimiter after each field', 'الـ Delimiter بعد كل field'], b: '20431<s>|</s>SALMA<s>|</s>CS<s>|</s>', a: 15, w: '6 + 6 + 3 = <b>15</b>', h: ['One | after each of the 3 fields.', 'علامة | بعد كل field من التلاتة.'] },
    { l: ['keyword = value', 'الـ <bdi dir="ltr">keyword = value</bdi>'], b: '<u>ID=</u>20431 <u>NAME=</u>SALMA <u>DEPT=</u>CS', a: 27, w: '8 + 1 + 10 + 1 + 7 = <b>27</b>', h: ['The keywords and the two spaces count too.', 'الـ keywords والمسافتين بيتعدّوا كمان.'] },
    { l: ['Method 3: the record\'s length indicator', 'الطريقة 3: الـ length indicator بتاع الـ record'], b: '<u>??</u>20431|SALMA|CS', a: 14, w: '5 + 1 + 5 + 1 + 2 = <b>14</b> → 1420431|SALMA|CS', h: ['As in the notes\' 33: the bytes after the indicator, delimiters included.', 'زي الـ 33 بتاعة النوتس: الـ bytes اللي بعد الـ indicator، والـ delimiters معاهم.'] }
  ];
  const CODE_COPY = [
    ['#include <fstream>'], ['using namespace std;'], ['int main() {'],
    ['  ifstream infile("d:\\\\src.txt",'], ['                  ios::binary);'], ['  ofstream outfile("d:\\\\dest.txt",'], ['                   ios::binary);'],
    ['  infile.seekg(0, ', [['infile.beg', 'infile.end', 'infile.cur'], 1], ');'],
    ['  long size = infile.', [['tellg', 'tellp', 'seekg'], 0], '();'],
    ['  infile.seekg(', [['0', 'size'], 0], ');'],
    ['  char* buffer = new char[size];'],
    ['  infile.', [['read', 'write'], 0], '(buffer, size);'],
    ['  outfile.', [['read', 'write'], 1], '(buffer, size);'],
    ['  delete[] buffer;'], ['  outfile.close();'], ['  infile.close();'], ['}']
  ];
  const CODE_UPD = [
    ['struct Item {'], ['  char desc[31];'], ['  int qty;'], ['  float price;'], ['};'],
    ['void UpdateRecord(fstream &file,'], ['     Item &newItem, int RRN)'], ['{'],
    ['  file.', [['seekg', 'seekp'], 1], '('],
    ['    RRN * ', [['sizeof(newItem)', 'RRN', '1'], 0], ','],
    ['    ios::', [['beg', 'cur', 'end'], 0], ');'],
    ['  file.', [['read', 'write'], 1], '('],
    ['    (char *) &newItem,'],
    ['    sizeof(newItem));'], ['}']
  ];

  H.chapters.fp.final = {
    title: 'Fewer Trips to the Disk', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'مشاوير أقل للـ disk', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    data: { DESK_A1, DESK_A2, DESK_V, DRILL_B, DESK_C, DESK_H, DESK_R, DESK_B, CKEY, FORM, HK, hashOf, CODE_COPY, CODE_UPD },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Match, MCQ, Reveal, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' questions from any lecture (quiz items with src), with the site's Egyptian Arabic "why" of that lecture;
      // sre narrows by the paper when the same question was asked twice. pq takes the site's practice questions (no src).
      const arQ = n => ((window.AR && window.AR.fp && window.AR.fp.lectures && window.AR.fp.lectures[n]) || {}).quiz || [];
      const find = (re, sre, prof) => { for (const l of kit.course.lectures) { const qs = l.quiz || []; for (let i = 0; i < qs.length; i++) { const x = qs[i];
        if (re.test(strip(x.q)) && (prof ? !!x.src && (!sre || sre.test(x.src)) : !x.src)) return { q: x, why: arQ(l.n)[i] }; } } return {}; };
      const mq = (id, re, sre) => { const r = find(re, sre, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, null, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const LT = s => '<span class="ltr">' + s + '</span>';
      const B = s => '<bdi dir="ltr">' + s + '</bdi>';
      const tb = (head, rows, cols) => html`<table className="hf-fpF-tb hf-in">${cols ? html`<colgroup>${cols.map((w, i) => html`<col key=${i} style=${{ width: w }} />`)}</colgroup>` : null}
        <thead><tr>${head.map((h, i) => html`<th key=${i}>${T(h)}</th>`)}</tr></thead>
        <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => j === 0 ? html`<th key=${j}>${T(c)}</th>` : html`<td key=${j} className=${/^[\dA-Z(½⌊]|^search|^0\.5|^1\.25|^2D/.test(c) && !/[\u0600-\u06FF]/.test(c) ? 'm' : ''}>${T(c)}</td>`)}</tr>`)}</tbody></table>`;
      const at = {};   // the first page of each lecture, filled in below, for the self-rating's advice
      const lecSec = n => t('Lecture ' + n, 'محاضرة ' + n);
      const ecBox = (first) => html`<p className="hf-p small hf-in">${first ? X("The doctors' own questions, mixed from every lecture, more from what the papers ask most. Tap an answer to see why.", 'أسئلة الدكاترة نفسها، من كل المحاضرات، والأكتر من اللي الامتحانات بتسأل فيه. دوس على إجابة عشان تعرف السبب.') : ''}</p>`;

      const pages = [
        // 0 · how to use this book + how ready am I?
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تستخدم الكتاب ده')}</${H2}>
          <div className="hf-howto hf-in">
            <div className="row"><span className="mk">1</span><span>${X('<b>Rate yourself</b> below, honestly. Shaky lectures first.', '<b>قيّم نفسك</b> تحت بصراحة. المحاضرات المهزوزة الأول.')}</span></div>
            <div className="row"><span className="mk">2</span><span>${X('<b>The big picture</b> and <b>what the exam asks</b>: four pages.', '<b>الصورة الكبيرة</b> و<b>الامتحان بيسأل في إيه</b>: أربع صفحات.')}</span></div>
            <div className="row"><span className="mk">3</span><span>${X('<b>Each lecture</b> in 3 or 4 pages: must-know, its figure, its trap, a quick check.', '<b>كل محاضرة</b> في 3 أو 4 صفحات: اللي لازم تعرفه، والرسمة، والفخ، وتمرين سريع.')}</span></div>
            <div className="row"><span className="mk">4</span><span>${X('<b>The problems that always come up</b>, pen in hand. Then the exam corner, exam day, and the bullet points the night before.', '<b>المسائل اللي بتيجي كل مرة</b>، والقلم في إيدك. وبعدين ركن الامتحان، ويوم الامتحان، والخلاصة بليل قبلها.')}</span></div>
          </div>
          <${H2}>${t('How ready am I?', 'أنا جاهز قد إيه؟')}</${H2}>
          <${Rate} at=${at} />
        `, { sec: t('Start here', 'ابدأ من هنا') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">★</span><span className="t">${A ? html`المراجعة النهائية<br/>File Processing` : html`Final revision<br/>File Processing`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Fewer Trips to the Disk', 'مشاوير أقل للـ Disk')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('the whole course, the way the exam asks it', 'الكورس كله، بالطريقة اللي الامتحان بيسأل بيها')}</p></div>
          <${Talk} who="dev">${t('Five lectures, one final, a few days left. Where do I even start?', 'خمس محاضرات وامتحان واحد وكام يوم. أبدأ منين أصلًا؟')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X('With me. The course\'s goal is to get your data with <b>as few disk accesses as possible</b>. Every lecture is a way to make me move less.', 'معايا أنا. هدف الكورس إنك تجيب الداتا بـ <b>أقل عدد disk accesses ممكن</b>. وكل محاضرة طريقة تخليني أتحرك أقل.')}</${Talk}>
          <${Talk} who="table">${t('And every question on the paper is about where I sit and what it costs to reach me.', 'وكل سؤال في الورقة عن أنا قاعد فين، والوصول ليّا بيكلّف قد إيه.')}</${Talk}>
        `),

        // 2 · the course map
        page(html`
          <${H2}>${t('The course on one map', 'الكورس كله في خريطة واحدة')}</${H2}>
          <${CourseMap} />
          <${Hand}>${t('tap a stop to hold it; the arcs are the links (our map)', 'دوس على محطة تثبّتها، والأقواس هي الروابط (من عندنا)')}</${Hand}>
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // 3 · one question, five answers
        page(html`
          <${H2}>${t('One question, five answers', 'سؤال واحد وخمس إجابات')}</${H2}>
          <${P} small=${true}>${X('<b>How do I reach my record?</b> Each lecture answers it a little better. Read the ladder from top to bottom:', '<b>أوصل للـ record بتاعي إزاي؟</b> كل محاضرة بتجاوب أحسن من اللي قبلها. اقرا السلم من فوق لتحت:')}</${P}>
          <div className="hf-fpF-ladder hf-in">
            <div><b>L1</b><span>${X('Open the file: the <b>logical</b> name meets the <b>physical</b> file. Read, write, close.', 'تفتح الـ file: الـ <b>logical</b> name بيتربط بالـ <b>physical</b> file. وتقرا وتكتب وتقفل.')}</span></div>
            <div><b>L2</b><span>${X('One access = <b>seek + rotational delay + transfer</b>. Seek (moving the arm) costs the most.', 'الـ access الواحد = <b>seek + rotational delay + transfer</b>. والـ seek (تحريك الـ arm) هو الأغلى.')}</span></div>
            <div><b>O(n)</b><span>${X('L3: <b>sequential search</b>, read in order until a match.', 'في L3: الـ <b>sequential search</b>، تقرا بالترتيب لحد ما تلاقيه.')}</span></div>
            <div><b>log₂</b><span>${X('L4: a <b>sorted file</b>, binary search: D·log₂B + C·log₂R.', 'في L4: الـ <b>sorted file</b> بـ binary search:' + LT('D·log₂B + C·log₂R'))}</span></div>
            <div className="hf-fpF-best"><b>O(1)</b><span>${X('L3 <b>direct access</b> by RRN, and L5 <b>hashing</b>: compute the address, read one page.', 'الـ <b>direct access</b> بالـ RRN في L3، والـ <b>hashing</b> في L5: تحسب الـ address وتقرا page واحدة.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('A heap file of B pages: how many pages does an equality search read on average? And a hashed file? Keep your answers; page 20 tells you.', 'heap file فيه B pages: الـ equality search بيقرا كام page في المتوسط؟ والـ hashed file؟ خلّي إجابتك معاك، وصفحة 20 هتقولك.')}</p></${Box}>
        `),

        // 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الامتحان النهائي')}</${H2}>
          <${Box} kind="watch" title=${t('No past finals here', 'مفيش finals قديمة هنا')}><p className="hf-p small">${X('The site has <b>no past final papers</b> for this course. These two pages are built from the <b>four midterms</b> it has and from the lectures. The final covers <b>all 5 lectures</b>; the 2026/27 midterm stopped at Lecture 4, so expect <b>hashing</b> too.', 'الموقع <b>مفيهوش امتحانات final قديمة</b> للكورس ده. الصفحتين دول مبنيين على <b>الأربع midterms</b> اللي عندنا وعلى المحاضرات. والـ final بييجي على <b>الخمس محاضرات</b>، والـ midterm بتاع <bdi dir="ltr">2026/27</bdi> وقف عند محاضرة 4، فاستنى <b>الـ hashing</b> كمان.')}</p></${Box}>
          ${tb(A ? ['الورقة', 'الشكل'] : ['Paper', 'What it looked like'], [
            ['<bdi dir="ltr">Midterm 2022/23 A</bdi>', A ? 'ساعة، 20 درجة: 7 MCQ، وكود hash (2)، وfield structures (2)، ومسألة disk' : '1 h, 20 marks: 7 MCQ · hash function code (2) · field structures (2) · disk problem'],
            ['<bdi dir="ltr">Midterm 2022/23 B</bdi>', A ? 'ساعة، 20 درجة: 6 MCQ، وcopy من غير loops (3)، وbottleneck (2)، ومسألة disk' : '1 h, 20 marks: 6 MCQ · copy program, no loops (3) · bottleneck techniques (2) · disk problem'],
            ['<bdi dir="ltr">Midterm 2022/23 C</bdi>', A ? 'ساعة، 20 درجة: 7 MCQ، وUpdateRecord (3)، وفروق (4)، ومسألة disk' : '1 h, 20 marks: 7 MCQ · UpdateRecord by RRN (3) · differences (4) · disk problem'],
            ['<bdi dir="ltr">Midterm 2026/27</bdi>', A ? 'أونلاين، 30 دقيقة، 20 درجة: 30 MCQ على محاضرات 1 لـ 4' : 'online, 30 min, 20 marks: 30 MCQs on Lectures 1–4']
          ], ['30%', '70%'])}
          <${Hand} red=${true}>${t('every 2022/23 model: cost MCQs, code or theory, the disk problem', 'كل نماذج 2022/23: MCQ تكلفة، وكود أو نظري، ومسألة disk')}</${Hand}>
        `, { sec: t('Anatomy of the final', 'تشريح الامتحان') }),

        // 5 · the hot list
        page(html`
          <${H2}>${t('The hot list', 'الأكتر تكرارًا')}</${H2}>
          <${P} small=${true}>${X('Counted from the four papers: how many of them asked each topic, and the bar shows how many questions (15 at most).', 'متعدّين من الأربع ورقات: كام ورقة سألت في كل موضوع، والشريط بيوضح عدد الأسئلة (أكبرها 15).')}</${P}>
          <${Hot} />
          <${Hand} red=${true}>${t('cost table: every paper. disk problem: every 2022/23 model', 'جدول التكلفة في كل ورقة، ومسألة الـ disk في كل نماذج 2022/23')}</${Hand}>
        `),

        // 6 · L1 must know
        page(html`
          <${H2}>${t('Lecture 1: you must know', 'محاضرة 1: لازم تعرف')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>data structures</b> في الـ main memory، والـ <b>file structures</b> على الـ secondary storage، والـ file بطيء عشان <b>أجزاء كتير بتتحرك</b>.',
            'الـ <b>logical</b> هو شكل الـ file عند الـ programmer، والـ <b>physical</b> متخزن إزاي. والـ logical organization: heap وindexing وhashing، والـ physical: sectors أو blocks.',
            'الـ organization لازم تدي <b>fast access time و good space utilization</b>. والـ management: تجهيز الـ media، وتوزيع المساحة، وإدارة الفاضي. والـ managers: <b>الـ OS والـ DBMS</b>.',
            'الـ <b>physical file</b> هو bytes على الـ disk باسم زي <code>A.txt</code> وبيتستخدم <b>مرة واحدة</b> وقت الفتح. والـ <b>logical file</b> قناة اسمها variable زي <code>fp</code> وبتتستخدم <b>مرات كتير</b>.',
            'الـ <code>fread</code> بياخد العنوان، وحجم العنصر، والعدد، والـ logical file. ولو رجّع <b>0</b> يبقى الـ file خلص.'
          ] : [
            '<b>Data structures</b>: data in main memory. <b>File structures</b>: data in secondary storage. Files are slow: <b>many moving parts</b>.',
            '<b>Logical structure</b>: how programmers see the file; <b>physical</b>: how it is stored. Logical organization: heap, indexing, hashing; physical: sectors or blocks.',
            'Organization must provide <b>fast access time and good space utilization</b>. Management: format media, allocate space and addressing, manage free space. Managers: <b>OS and DBMS</b>.',
            '<b>Physical file</b>: bytes on disk, a name like <code>A.txt</code>, used <b>once</b> at opening. <b>Logical file</b>: a channel, a variable like <code>fp</code>, used <b>many times</b>.',
            '<code>fread(address, size, count, file)</code>; it returns <b>0</b> at end of file.'
          ]} />
          <${Code} lines=${['FILE *fp = fopen("A.txt", "w");', 'fstream f; f.open("A.txt", ios::out);']} />
        `, { sec: lecSec(1) }),

        // 7 · L1 figure
        page(html`
          <${H2}>${t('Every mode, tried on one file', 'كل mode متجرّب على file واحد')}</${H2}>
          <${Fig} name="fp-modes" />
        `),

        // 8 · L1 trap + functions
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Three numbers the 2026/27 midterm loves to mix: <b>EOF = −1</b> (an int in stdio.h), <b>NULL</b> is what <code>fopen</code> returns when it fails, and <b>0</b> is what <code>fread</code> returns at end of file. ‡ The notes use EOF in the readASCII loop but don\'t print its value: −1 is the C standard value.',
            'تلات أرقام الـ midterm بتاع <bdi dir="ltr">2026/27</bdi> بيحب يلخبطهم: الـ <b><bdi dir="ltr">EOF = −1</bdi></b> (int في stdio.h)، والـ <b>NULL</b> هو اللي <code>fopen</code> بترجعه لو فشلت، والـ <b>0</b> هو اللي <code>fread</code> بترجعه آخر الـ file. ‡ النوتس بتستخدم الـ EOF في loop الـ readASCII ومش بتكتب قيمته، والـ −1 هي القيمة في الـ C standard.')}</p></${Box}>
          ${tb(A ? ['اقرا', 'اكتب'] : ['Read', 'Write'], [
            ['<code>fgetc</code> ' + t('a char', 'حرف'), '<code>fputc</code> ' + t('a char', 'حرف')],
            ['<code>fgets</code> ' + t('a line (n−1 chars ‡)', 'سطر (n−1 حرف ‡)'), '<code>fputs</code> ' + t('a line', 'سطر')],
            ['<code>fscanf</code> ' + t('formatted', 'بـ format'), '<code>fprintf</code> ' + t('formatted', 'بـ format')],
            ['<code>fread</code> ' + t('a record', 'record'), '<code>fwrite</code> ' + t('a record', 'record')]
          ], ['50%', '50%'])}
          <${P} small=${true}>${X('Repositioning: <code>fseek</code> in C, <code>seekg</code> (get, read) and <code>seekp</code> (put, write) in C++. Opening syntax: <code>FILE *fopen(const char *filename, const char *mode)</code>.', 'تغيير المكان: <code>fseek</code> في C، و<code>seekg</code> (get للقراية) و<code>seekp</code> (put للكتابة) في C++‎. وصيغة الفتح:' + LT('<code>FILE *fopen(const char *filename, const char *mode)</code>'))}</${P}>
          <${Hand} red=${true}>${t('"not used as a file opening mode" → ios::trunc (the confirmed key)', '"not used as a file opening mode" إجابتها ios::trunc (الـ key المؤكد)')}</${Hand}>
        `),

        // 9 · L1 quick check: mode → C++ flags
        page(html`
          <${Box} kind="pencil" title=${t('Match each C mode to its C++ flags', 'وصّل كل C mode بالـ C++ flags بتاعته')}><p className="hf-p small">${X('From the notes\' table (ios:: left out). Pair them, then Check.', 'من جدول النوتس (من غير الـ ios::). وصّلهم، وبعدين صحّح.')}</p></${Box}>
          <${Match} id="l1modes" left=${['"r"', '"w"', '"a"', '"r+"', '"w+"', '"a+"']}
            right=${['in | out | app', 'in', 'out | trunc', 'in | out', 'out | app', 'in | out | trunc']} answer=${[1, 2, 4, 3, 5, 0]} />
          <${Hand}>${X('and a <b>b</b> after the letter (rb, wb…) = … | binary', 'ولو فيه <b>b</b> بعد الحرف (rb وwb…) يبقى معاها binary')}</${Hand}>
        `),

        // 10 · L2 must know: parts
        page(html`
          <${H2}>${t('Lecture 2: you must know', 'محاضرة 2: لازم تعرف')}</${H2}>
          <${P} small=${true}>${X('<b>DASD</b> (direct access): magnetic disks (hard, floppy) and optical disks (CD-ROM, CD-R, CD-RW, DVD). <b>SASD</b> (serial access): <b>magnetic tape</b>.', 'الـ <b>DASD</b> (direct access): الـ magnetic disks (hard وfloppy) والـ optical disks (CD-ROM وCD-R وCD-RW وDVD). والـ <b>SASD</b> (serial access): الـ <b>magnetic tape</b>.')}</${P}>
          <div className="hf-fpF-cards hf-in">
            <div><b>${t('By definition (the exam asks it this way)', 'بالتعريف (الامتحان بيسأل كده)')}</b><p>${X('<b>Platter</b>: the circular disk the data is stored on (both surfaces). <b>R/W head</b>: the small part that moves above the platter, one per surface. <b>Arm assembly</b>: the internal set holding the arms; if it fails, the drive fails. <b>Spindle</b>: holds and <b>rotates</b> the platters. <b>Arms</b>: carry, guide and move the heads (seeking).',
              'الـ <b>Platter</b>: الـ disk الدايري اللي الداتا متخزنة عليه (على الوشين). والـ <b>R/W head</b>: الجزء الصغير اللي بيتحرك فوق الـ platter، واحد لكل surface. والـ <b>Arm assembly</b>: المجموعة اللي جواها الـ arms، ولو وقفت الـ drive بيبوظ. والـ <b>Spindle</b>: بيمسك الـ platters و<b>يلفّها</b>. والـ <b>Arms</b>: بتشيل الـ heads وتوجهها وتحركها (seeking).')}</p></div>
            <div><b>${t('On the platter', 'على الـ platter')}</b><p>${X('<b>Track</b>: a ring. <b>Sector</b>: smallest addressable part, usually 512 B. <b>Cluster</b>: contiguous sectors, the OS view. <b>Cylinder</b>: the tracks above each other, read <b>without moving the arm</b>. Cylinders = tracks per surface; cylinder height = surfaces = 2 × platters.',
              'الـ <b>Track</b>: حلقة. والـ <b>Sector</b>: أصغر جزء ليه address، غالبًا 512 B. والـ <b>Cluster</b>: sectors جنب بعض، وده منظور الـ OS. والـ <b>Cylinder</b>: الـ tracks اللي فوق بعض، بتتقري <b>من غير ما الـ arm يتحرك</b>. وعدد الـ cylinders هو عدد الـ tracks في الـ surface، والـ height هو عدد الـ surfaces يعني ضعف الـ platters.')}</p></div>
          </div>
        `, { sec: lecSec(2) }),

        // 11 · L2 formulas
        page(html`
          <${H2}>${t('Lecture 2: the formulas', 'محاضرة 2: الـ formulas')}</${H2}>
          <div className="hf-fpF-sheet hf-in">
            <p><b>track</b>    = sectors/track × bytes/sector</p>
            <p><b>cylinder</b> = height × track</p>
            <p><b>disk</b>     = cylinder × tracks/surface</p>
            <p><b>block</b>    = BF × record + overhead</p>
            <p><b>blocks</b>   = ⌊track / block⌋   <i>${t('floor', 'لتحت')}</i></p>
            <p><b>file</b>     = records × size → ÷ track ⌈ ⌉ <i>${t('round up', 'لفوق')}</i></p>
            <p><b>rev</b>      = 60,000 / rpm  ms</p>
            <p><b>latency</b>  = ½ rev  <i>${t('unless given', 'إلا لو مدّيهولك')}</i></p>
            <p><b>transfer</b> = n × rev / sectors per track</p>
            <p><b>access</b>   = seek + latency + transfer</p>
          </div>
          <${P} small=${true}>${X('<b>Seek</b> moves the arm to the cylinder: the largest cost (5 ms track to track, 30 ms average, 50 ms max). The disk bottleneck: <b>multiprocessing, disk striping, RAID, RAM disk, disk cache</b>. The OS organizes tracks by <b>sectors</b> (fragmentation); the DBMS by <b>blocks</b> (more overhead: count, key and data sub-blocks, gaps).',
            'الـ <b>Seek</b> بيحرك الـ arm للـ cylinder وده أكبر تكلفة (5 ms من track للي جنبه، و30 في المتوسط، و50 أقصى حاجة). وحلول الـ bottleneck: <b>multiprocessing وdisk striping وRAID وRAM disk وdisk cache</b>. والـ OS بينظم الـ tracks بالـ <b>sectors</b> (فيها fragmentation)، والـ DBMS بالـ <b>blocks</b> (overhead أكتر: الـ count والـ key والـ data sub-blocks والـ gaps).')}</${P}>
        `),

        // 12 · L2 figure
        page(html`
          <${Fig} name="fp-access-time" head=${t('Change the disk and watch the total', 'غيّر الـ disk واتفرج على الـ total')} />
        `),

        // 13 · L2 trap + quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Heads = surfaces</b>: 20 surfaces → 20 heads (10 is the platters). The <b>cluster</b> is sectors per cluster × 512, not the track (Model A: 4 × 512 = 2048, the 64 × 512 = 32,768 is a trap). And Model A wrote "move the arm to the correct <b>sector</b>": the notes say cylinder, the answer is still <b>seek time</b>.',
            'الـ <b>heads بعدد الـ surfaces</b>: 20 surface يعني 20 head (والـ 10 دي الـ platters). والـ <b>cluster</b> هو عدد الـ sectors في الـ cluster في 512، مش الـ track (في الـ <bdi dir="ltr">Model A</bdi> الإجابة <bdi dir="ltr">4 × 512 = 2048</bdi>، والـ <bdi dir="ltr">64 × 512 = 32,768</bdi> فخ). والـ <bdi dir="ltr">Model A</bdi> كتب "correct <b>sector</b>" والنوتس بتقول cylinder، والإجابة برضه <b>seek time</b>.')}</p></${Box}>
          ${mq('l2head', /small part of the disk, that move above/)}
        `),

        // 14 · L3 must know
        page(html`
          <${H2}>${t('Lecture 3: you must know', 'محاضرة 3: لازم تعرف')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>field</b> أصغر وحدة داتا ليها معنى، والـ <b>record</b> مجموعة fields بتعمل وحدة. وفيه 3 structures: <b>stream</b> و<b>field</b> و<b>record</b>.',
            'الـ <b>stream file</b> هو bytes من غير أي <b>معلومة زيادة</b>، فمفيش طريقة ترجّع الـ records تاني.',
            'الـ field structures أربعة: الـ <b>fixed</b>، والـ <b>length indicator</b>، والـ <b>delimiter</b>، والـ <b><bdi dir="ltr">keyword = value</bdi></b>.',
            'الـ records بتلات طرق: fixed بـ fixed fields، وfixed بـ variable fields، وكل record بيبدأ بـ length indicator. والـ fixed سهل تنط للـ record رقم i، والـ variable محتاج <b>index file</b>.',
            'الـ <b>primary key</b> بيميّز الـ record ومبيتغيرش، والـ <b>secondary key</b> للبحث. والـ sequential بـ <bdi dir="ltr">O(n)</bdi>، والـ direct بـ <bdi dir="ltr">O(1)</bdi> بالـ <b>RRN</b> (أول record رقمه 0):' + LT('byte offset = RRN × record size'),
            'الـ <code>fseek(fp, offset, origin)</code> والـ origin يا 0 البداية، يا 1 المكان الحالي، يا 2 النهاية. والـ <code>tellg</code> بعد <code>seekg(0, ios::end)</code> بيدّيك حجم الـ file.'
          ] : [
            '<b>Field</b>: the smallest unit of data with logical meaning. <b>Record</b>: a group of fields forming a logical unit. Three structures: <b>stream</b>, <b>field</b>, <b>record</b>.',
            '<b>Stream file</b>: bytes with <b>no added information</b>; no way to get the records back.',
            'Four field structures: <b>fixed</b>, <b>length indicator</b>, <b>delimiter</b>, <b>keyword = value</b>.',
            'Three record methods: fixed with fixed fields, fixed with variable fields, each record begins with a length indicator. Fixed: easy to jump to record i; variable: needs an <b>index file</b>.',
            '<b>Primary key</b>: unique, never changes; <b>secondary</b>: for searching. Sequential O(n); direct O(1) by <b>RRN</b> (first = 0): offset = RRN × record size.',
            '<code>fseek(fp, offset, origin)</code>, origin 0 start, 1 current, 2 end. <code>tellg</code> after <code>seekg(0, ios::end)</code> = the file size.'
          ]} />
        `, { sec: lecSec(3) }),

        // 15 · L3 figure
        page(html`
          <${Fig} name="fp-field-structs" />
        `),

        // 16 · L3 trap + match
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The 2026/27 midterm turned the pros-and-cons table into four MCQs. Learn each phrase with <b>its</b> structure, and remember <b>RRN starts at 0</b>.', 'الـ midterm بتاع <bdi dir="ltr">2026/27</bdi> حوّل جدول المميزات والعيوب لأربع MCQs. احفظ كل جملة مع الـ structure <b>بتاعها</b>، وافتكر إن <b>الـ RRN بيبدأ من 0</b>.')}</p></${Box}>
          <${Match} id="l3m" left=${A ? ['الـ Fixed', 'الـ Length indicator', 'الـ Delimiter', 'الـ Keyword'] : ['Fixed', 'Length indicator', 'Delimiter', 'Keyword']}
            right=${A ? ['لازم تشيّك كل byte في الـ field', 'سهل تنط لآخر الـ field', 'بيضيّع مساحة في الـ padding', 'الـ fields بتوصف نفسها وبتسمح بـ fields ناقصة']
              : ['Have to check every byte of the field', 'Easy to jump ahead to the end of the field', 'Wastes space with padding', 'Self-describing; allows missing fields']}
            answer=${[2, 1, 0, 3]} />
          <${Grow} />
          <${Hand}>${t('the other halves: fixed is easy to read; delimiters may waste less space; keywords waste space; long fields need more than 1 length byte', 'والنص التاني: الـ fixed سهل في القراية، والـ delimiter ممكن يضيّع أقل، والـ keyword بيضيّع مساحة، والـ fields الطويلة محتاجة أكتر من byte للطول')}</${Hand}>
        `),

        // 17 · L4 must know + the cost table
        page(html`
          <${H2}>${t('Lecture 4: you must know', 'محاضرة 4: لازم تعرف')}</${H2}>
          <${P} small=${true}>${X('<b>Heap (pile) file</b>: records in order of entry; linear search only; insert at the end; <b>allows duplicates</b>. <b>Sorted (sequential) file</b>: records in key order; an insert moves every greater key one place towards the end. Efficiency = <b>number of disk accesses</b>.',
            'الـ <b>heap (pile) file</b>: الـ records بترتيب دخولها، والبحث linear بس، والـ insert في الآخر، و<b>بيسمح بالتكرار</b>. والـ <b>sorted (sequential) file</b>: الـ records بترتيب الـ key، والـ insert بيزق كل key أكبر خطوة لآخر الـ file. والكفاءة بـ <b>عدد الـ disk accesses</b>.')}</${P}>
          <${P} small=${true}>${X('<b>B</b> pages · <b>R</b> records per page · <b>D</b> read/write a page · <b>C</b> process a record · <b>H</b> compute the hash.', 'الـ <b>B</b> عدد الـ pages، والـ <b>R</b> الـ records في الـ page، والـ <b>D</b> قراية أو كتابة page، والـ <b>C</b> معالجة record، والـ <b>H</b> حساب الـ hash.')}</${P}>
          ${tb(['', 'Heap', 'Sorted', 'Hashed'], [
            ['Scan', 'B(D+RC)', 'B(D+RC)', '1.25B(D+RC)'],
            ['Equality', '0.5B(D+RC)', 'Dlog₂B + Clog₂R', 'H + D + 0.5RC'],
            ['Range', 'B(D+RC)', 'search + matches', '1.25B(D+RC)'],
            ['Insert', '2D + C', 'search + B(D+RC)', 'search + C + D'],
            ['Delete', 'search + C + D', 'search + B(D+RC)', 'search + C + D']
          ], ['20%', '24%', '30%', '26%'])}
          <${Hand} red=${true}>${t('sorted insert/delete: search + 2 × 0.5B(D + RC), half the file read AND written', 'الـ sorted insert/delete: الـ search وفوقه نص الـ file بيتقري وبيتكتب')}</${Hand}>
        `, { sec: lecSec(4) }),

        // 18 · L4 figure
        page(html`
          <${H2}>${t('Try the formulas on any numbers', 'جرّب الـ formulas على أي أرقام')}</${H2}>
          <${Fig} name="fp-cost-calc" />
        `),

        // 19 · L4 trap + check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The papers <b>spell "search +" out</b>. Sorted delete: <b>Dlog2B + Clog2R + B(D + RC)</b> (Model B), written <b>Dlog2B + Clog2R + 2*(0.5B(D + RC))</b> in 2026/27: the same thing. Hashed delete in the Model C answer: <b>1.25B(D + RC) + C + D</b>. The answer to page 4: heap 0.5B pages, hashed one page.',
            'الورق <b>بيكتب الـ search بالتفصيل</b>. مثلًا الـ sorted delete في الـ Model B كده:' + LT('Dlog2B + Clog2R + B(D + RC)') + 'وفي ميدترم <bdi dir="ltr">2026/27</bdi> اتكتب بشكل تاني بس هو هو. والـ hashed delete في إجابة الـ Model C كده:' + LT('1.25B(D + RC) + C + D') + 'وإجابة صفحة 4: الـ heap نص الصفحات، والـ hashed صفحة واحدة.')}</p></${Box}>
          ${mq('l4scan', /SCAN process of the hashed file/)}
        `),

        // 20 · L5 must know
        page(html`
          <${H2}>${t('Lecture 5: you must know', 'محاضرة 5: لازم تعرف')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>hashing</b> تقنية بحث لعمل الـ indexes، وهدفها <b>تحسين وقت البحث</b>: <bdi dir="ltr">O(1)</bdi>، قصاد <bdi dir="ltr">O(log N)</bdi> للـ binary search و<bdi dir="ltr">O(log<sub>k</sub> N)</bdi> للـ B-tree.',
            'الـ <b>hash function</b> <bdi dir="ltr">h(k)</bdi> بتحوّل الـ <b>key</b> لـ <b>address</b> في address space متحدد من الأول (1000 address يعني من 0 لـ 999)، ومفيش علاقة واضحة بين الـ key والمكان.',
            'لما الـ address يتحدد بـ <b>algorithm رياضي</b> يبقى ده <b>hashed</b> organization. والـ <b>bucket</b> بيشيل <b>record واحد أو أكتر</b>.',
            'الـ <b>collision</b> هو الحدث: 2 keys مختلفين بنفس الـ address. والـ <b>synonyms</b> هما الـ keys دول.',
            'الـ function: اضرب الـ <b>pairs</b> واجمع، والباقي على <b>19937</b> (عشان الـ overflow)، والباقي على الـ <b>maxAddress</b> هو الـ home address.',
            'الـ buckets مليانة حوالي <b>80%</b>، فالـ scan بـ <bdi dir="ltr">1.25B(D + RC)</bdi>. والـ hashing <b>بيبوّظ الترتيب</b>، فالـ range search بيعمل scan.'
          ] : [
            '<b>Hashing</b>: a searching technique for implementing indexes; it <b>improves search time</b>: O(1), against O(log N) binary search and O(log<sub>k</sub> N) B-tree.',
            'A <b>hash function h(k)</b> turns a <b>key</b> into an <b>address</b> in an address space chosen beforehand (1000 addresses = 0 to 999). No obvious connection between key and location.',
            'Address determined by a <b>mathematical algorithm</b> = <b>hashed</b> organization. A <b>bucket</b> holds <b>one or more records</b>.',
            '<b>Collision</b>: the event, two different keys with the same address. <b>Synonyms</b>: those keys.',
            'The function: multiply <b>pairs</b> and add, <b>% 19937</b> (prevents overflow), <b>% maxAddress</b> = the home address.',
            'Buckets about <b>80% full</b>, so a scan is 1.25B(D + RC). Hashing <b>destroys key order</b>: a range search scans.'
          ]} />
        `, { sec: lecSec(5) }),

        // 21 · L5 figure
        page(html`
          <${H2}>${t('Watch it run: Ahmed lands on 769', 'اتفرج عليها: الـ Ahmed بيروح 769')}</${H2}>
          <${Fig} name="fp-hash-fn" />
        `),

        // 22 · L5 trap + quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Collision is the <b>event</b>, synonyms are the <b>keys</b>. And the notes don\'t teach ways to resolve collisions: a bucket simply holds one or more records. Don\'t write overflow methods that aren\'t in the course.', 'الـ collision هو <b>الحدث</b>، والـ synonyms هما <b>الـ keys</b>. والنوتس مش بتشرح طرق حل الـ collisions: الـ bucket ببساطة بيشيل record واحد أو أكتر. متكتبش طرق overflow مش في الكورس.')}</p></${Box}>
          <${P} small=${true}>${X('The summary\'s check, with <code>h(k) = k mod 10</code>:', 'تمرين الـ summary، والـ function هنا:' + LT('h(k) = k mod 10'))}</${P}>
          <${Pick} id="l5syn" items=${[
            { q: '<code>h(25)</code>', o: ['2', '5', '25'], a: 1 }, { q: '<code>h(45)</code>', o: ['4', '5', '45'], a: 1 }, { q: '<code>h(26)</code>', o: ['6', '2', '5'], a: 0 },
            { q: ['25 and 45 are…', 'الـ 25 والـ 45 اسمهم…'], o: [['a collision', 'collision'], ['synonyms', 'synonyms'], ['buckets', 'buckets']], a: 1, n: ['The keys are synonyms; their meeting is the collision.', 'الـ keys هما الـ synonyms، ووقوعهم في نفس المكان هو الـ collision.'] }
          ]} />
        `),

        // 23 · the problems that always come up
        page(html`
          <${H1}>${t('The problems that always come up', 'المسائل اللي بتيجي كل مرة')}</${H1}>
          <div className="hf-fpF-types hf-in">
            ${(A ? [
              ['مسألة الـ disk: الـ capacity والـ records والـ tracks والوقت', 'Q2-b · Models A, B, C'],
              ['formulas التكلفة للـ heap والـ sorted والـ hashed', 'MCQ · all four papers'],
              ['الـ simple hash function: اكتبها وشغّلها', 'Model A Q1-b'],
              ['برنامج copy من غير loops', 'Model B Q1-b · Quiz 3'],
              ['الـ UpdateRecord بالـ RRN، والـ offsets', 'Model C Q1-b · Quiz 3'],
              ['الـ field structures وعدد الـ bytes', 'Model A Q2-a · 2026/27'],
              ['الـ file modes ودوال الـ I/O', '2026/27 MCQ'],
              ['أسئلة الكتابة: الفروق والحلول', 'Model C Q2-a · Model B Q2-a']
            ] : [
              ['The disk problem: capacity, records, tracks, time', 'Q2-b · Models A, B, C'],
              ['The cost formulas of heap, sorted and hashed files', 'MCQ · all four papers'],
              ['The simple hash function: write it and run it', 'Model A Q1-b'],
              ['Copy a file with no loops', 'Model B Q1-b · Quiz 3'],
              ['UpdateRecord by RRN, and offsets', 'Model C Q1-b · Quiz 3'],
              ['Field structures and byte counts', 'Model A Q2-a · 2026/27'],
              ['File modes and I/O functions', '2026/27 MCQ'],
              ['Written answers: differences and techniques', 'Model C Q2-a · Model B Q2-a']
            ]).map(([x, s], i) => html`<div key=${i}><b>${i + 1}</b><span>${x}<small dir="ltr">${s}</small></span></div>`)}
          </div>
          <${Grow} />
          <${Hand} red=${true}>${t('the papers\' numbers first, then a fresh variant of ours: do both with a pen', 'أرقام الورق الأول، وبعدين نسخة جديدة من عندنا: حل الاتنين بالقلم')}</${Hand}>
        `, { sec: t('Problems: the disk', 'المسائل: الـ disk') }),

        // 24 · P1 Model A: method
        page(html`
          <${H2}>${t('Problem 1 · Midterm 2022/23 Model A Q2-b', 'المسألة 1 · Model A Q2-b')}</${H2}>
          <p className="hf-fpF-giv hf-in">${GIV_A}</p>
          <${P} small=${true}>${X('Find: (i) the average latency, (ii) records per track with blocking factor 20, (iii) the disk capacity, (iv) the average time to read three sectors.', 'المطلوب: (i) الـ average latency، و(ii) الـ records في الـ track لو الـ blocking factor بـ 20، و(iii) الـ disk capacity، و(iv) متوسط وقت قراية 3 sectors.')}</${P}>
          <${Box} kind="pencil" title=${t('The method', 'الطريقة')}><p className="hf-p small">${X('Write the given as a list with units. Revolution first, everything with time uses it. For blocks: block size, then <b>floor</b>, then × BF. Capacity: track × height × tracks per surface.', 'اكتب المعطيات في list بالوحدات. ابدأ بوقت اللفة، لأن أي حاجة فيها وقت بتستخدمه. وفي الـ blocks: حجم الـ block، وبعدين <b>floor</b>، وبعدين في الـ BF. والـ capacity هي الـ track في الـ height في الـ tracks per surface.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('The 10,000 records and the 128 B are a <b>trap</b> for (ii) if you skip the blocks: 10,240 / 128 = 80 is wrong. With overhead, only 3 whole blocks fit.', 'الـ 10,000 record والـ 128 B <b>فخ</b> في (ii) لو نسيت الـ blocks: <bdi dir="ltr">10,240 / 128 = 80</bdi> غلط. بالـ overhead، 3 blocks كاملين بس هما اللي بيدخلوا.')}</p></${Box}>
        `),

        // 25 · P1 desk (i), (ii)
        page(html`
          <${H2}>${t('Fill it in: (i) and (ii)', 'املاها: (i) و(ii)')}</${H2}>
          <${Desk} id="pA1" rows=${DESK_A1} giv=${'5000 rpm · 20 × 512 B · record 128 B · overhead 500 B · <i>BF 20</i>'} />
        `),

        // 26 · P1 desk (iii), (iv)
        page(html`
          <${H2}>${t('Fill it in: (iii) and (iv)', 'املاها: (iii) و(iv)')}</${H2}>
          <${Desk} id="pA2" rows=${DESK_A2} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Same disk, blocking factor <b>10</b>. Records per track?', 'نفس الـ disk، والـ blocking factor بـ <b>10</b>. كام record في الـ track؟')}</p>
            <${Reveal} id="bf10" label=${t('Show the answer', 'اعرض الإجابة')}><p className="hf-p small">${X('Block = 10 × 128 + 500 = 1780 B; ⌊10,240 / 1780⌋ = ⌊5.75⌋ = 5 blocks → <b>50 records</b>. A smaller BF wastes more of the track on overhead.', 'الإجابة <b>50 record</b>:' + LT('1780 B → ⌊5.75⌋ = 5 blocks → 50') + 'والـ BF الصغير بيضيّع أكتر في الـ overhead.')}</p></${Reveal}></${Box}>
        `),

        // 27 · P1 variant, ours
        page(html`
          <${H2}>${t('Your turn: a fresh disk (ours)', 'دورك: disk جديد (من عندنا)')}</${H2}>
          <${Desk} id="pV" rows=${DESK_V} giv=${GIV_V} />
        `),

        // 28 · P2 Models B and C: method
        page(html`
          <${H2}>${t('Problem 2 · Models B and C, Q2-b', 'المسألة 2 · الـ Models B وC، Q2-b')}</${H2}>
          <${P} small=${true}>${X('Same disk in both models: 10,000 records × 128 B · 512 B/sector · 30 sectors/track · height 10 · 1000 tracks/surface · 4 sectors/cluster · 1000 rpm · seek 10 ms · average rotational delay 5 ms.', 'نفس الـ disk في النموذجين:' + LT('10,000 × 128 B · 512 B/sector · 30 sectors/track · height 10 · 1000 tracks/surface · 4 sectors/cluster · 1000 rpm · seek 10 ms · delay 5 ms'))}</${P}>
          ${tb(A ? ['المطلوب', 'الـ formula'] : ['Asked', 'Formula'], [
            [t('Cylinder size', 'حجم الـ cylinder'), 'sectors × 512 × height'],
            [t('Records per cylinder', 'الـ records في الـ cylinder'), 'cylinder / record'],
            [t('Tracks / sectors for the file', 'الـ tracks أو الـ sectors للـ file'), '⌈records × size / unit⌉'],
            [t('Total disk size', 'حجم الـ disk'), 'cylinder × tracks/surface'],
            [t('Time to read n sectors', 'وقت قراية n sectors'), 'seek + delay + n × rev / 30']
          ], ['46%', '54%'])}
          <${Box} kind="watch"><p className="hf-p small">${X('At 1000 rpm half a revolution is <b>30 ms</b>, but the paper <b>gives</b> an average rotational delay of 5 ms. Use the given value, as the model answer does. And the answers use <b>1 KB = 1024 B</b>: 153,600 B = 150 KB, 153,600,000 B ≈ 146.5 MB.', 'عند 1000 rpm نص اللفة <b>30 ms</b>، بس الورقة <b>مدّياك</b> rotational delay بـ 5 ms. استخدم اللي في الورقة زي الـ model answer. والإجابات بتستخدم <bdi dir="ltr">1 KB = 1024 B</bdi>: يعني <bdi dir="ltr">153,600 B = 150 KB</bdi> و<bdi dir="ltr">153,600,000 B ≈ 146.5 MB</bdi>.')}</p></${Box}>
        `),

        // 29 · P2 step-through
        page(html`
          <${Drill} id="pB" probs=${DRILL_B} />
        `),

        // 30 · units and rounding
        page(html`
          <${H2}>${t('Round up, round down, or keep it?', 'تقرّب لفوق ولا لتحت ولا تسيبه؟')}</${H2}>
          <${P} small=${true}>${X('Half the marks lost in the disk problem are rounding. Decide for each result from the papers and the slides:', 'نص الدرجات اللي بتضيع في مسألة الـ disk من التقريب. قرّر لكل نتيجة من الورق والسلايدز:')}</${P}>
          <${Pick} id="round" opts=${[['round up', 'لفوق'], ['round down', 'لتحت'], ['keep it', 'سيبه']]} items=${[
            { q: ['Model B (ii): tracks for the file, 1,280,000 / 15,360 = 83.33', 'الـ tracks للـ file في <bdi dir="ltr">Model B</bdi>:' + LT('1,280,000 / 15,360 = 83.33')], a: 0, n: ['A part-used track still counts: 84.', 'الـ track اللي اتملى جزء منه بيتحسب: 84.'] },
            { q: ['Model A (ii): blocks per track, 10,240 / 3060 = 3.35', 'الـ blocks في الـ track في <bdi dir="ltr">Model A</bdi>:' + LT('10,240 / 3060 = 3.35')], a: 1, n: ['A block cannot be split: 3.', 'الـ block مينفعش يتقسم: 3.'] },
            { q: ['Slides: cylinders for the file, 23,040,000 / 430,080 = 53.57', 'الـ cylinders للـ file في السلايدز:' + LT('23,040,000 / 430,080 = 53.57')], a: 0, n: ['54 whole cylinders (‡ the slide prints 53.57).', '54 cylinder كاملين (‡ السلايد كاتب 53.57).'] },
            { q: ['Model A (iv): access time 7 + 6 + 1.8', 'الـ access time في <bdi dir="ltr">Model A</bdi>:' + LT('7 + 6 + 1.8 = 14.8 ms')], a: 2, n: ['A time is a time: 14.8 ms.', 'الوقت بيتساب زي ما هو: 14.8 ms.'] },
            { q: ['Example 1: transfer for one sector, 6 / 170', 'الـ transfer لـ sector واحد في مثال 1:' + LT('6 / 170 = 0.0353 ms')], a: 2, n: ['Keep it: ≈ 0.035 ms (total 11.035 ms).', 'سيبه: حوالي 0.035 ms.'] }
          ]} />
        `),

        // 31 · write it like the model answer
        page(html`
          <${H2}>${t('Write it the way that gets the marks', 'اكتبها بالطريقة اللي بتجيب الدرجة')}</${H2}>
          <${P} small=${true}>${t('Model A, as it should look on your answer sheet: formula, numbers, result with its unit.', 'الـ Model A بالشكل اللي المفروض يبقى عليه في ورقة إجابتك: الـ formula والأرقام والنتيجة بالوحدة.')}</${P}>
          <div className="hf-fpF-sheet hf-in">
            <p>rev = 60×1000/5000 = <b>12 ms</b></p>
            <p>(i)  latency = ½ rev = <b>6 ms</b></p>
            <p>track = 20×512 = 10,240 B</p>
            <p>block = 20×128+500 = 3060 B</p>
            <p>(ii) ⌊10,240/3060⌋ = 3 → 3×20 = <b>60</b></p>
            <p>(iii) 10,240×12×500 = <b>61,440,000 B</b></p>
            <p>(iv) transfer = 3×12/20 = 1.8 ms</p>
            <p>     7 + 6 + 1.8 = <b>14.8 ms</b>  <i>${t('done', 'خلصت')}</i></p>
          </div>
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('Write the formula before the numbers. If an arithmetic slip happens, the method still earns marks (our advice).', 'اكتب الـ formula قبل الأرقام. لو غلطت في الحساب، الطريقة برضه بتاخد درجة (نصيحة من عندنا).')}</${Talk}>
        `),

        // 32 · costs: the method
        page(html`
          <${H2}>${t('Problem 3 · the cost table, rebuilt', 'المسألة 3 · جدول التكلفة من الأول')}</${H2}>
          <${P} small=${true}>${X('In every paper. Don\'t memorize fifteen cells: rebuild them from three files\' habits (our way of remembering, the formulas are the notes\').', 'في كل ورقة. متحفظش 15 خانة: ابنيهم من عادات التلات files (طريقة تذكّر من عندنا، والـ formulas من النوتس).')}</${P}>
          <div className="hf-fpF-cards hf-in">
            <div><b>${t('Heap: no order', 'الـ Heap: مفيش ترتيب')}</b><p>${X('Search reads half the file on average: 0.5B(D + RC). Insert just goes to the end: read the last page, add, write: <b>2D + C</b>. Delete: search + C + D.', 'الـ search بيقرا نص الـ file في المتوسط:' + LT('0.5B(D + RC)') + 'والـ insert بيروح للآخر على طول: تقرا آخر page وتضيف وتكتب:' + LT('2D + C') + 'والـ delete هو الـ search وفوقه C + D.')}</p></div>
            <div><b>${t('Sorted: key order', 'الـ Sorted: بترتيب الـ key')}</b><p>${X('Binary search: <b>D·log₂B + C·log₂R</b>. But an insert or delete shifts the rest: half the file read and written, <b>+ B(D + RC)</b>.', 'الـ binary search:' + LT('D·log₂B + C·log₂R') + 'بس الـ insert والـ delete بيزقوا الباقي: نص الـ file بيتقري وبيتكتب:' + LT('+ B(D + RC)'))}</p></div>
            <div><b>${t('Hashed: one address, no order', 'الـ Hashed: address واحد ومفيش ترتيب')}</b><p>${X('One page: <b>H + D + 0.5RC</b>. Buckets 80% full: scan and range <b>1.25B(D + RC)</b>. Insert and delete: search + C + D.', 'page واحدة:' + LT('H + D + 0.5RC') + 'والـ buckets مليانة 80%، فالـ scan والـ range:' + LT('1.25B(D + RC)') + 'والـ insert والـ delete هما الـ search وفوقه C + D.')}</p></div>
          </div>
        `, { sec: t('Problems: costs', 'المسائل: التكلفة') }),

        // 33 · costs: fill the table
        page(html`
          <${Box} kind="pencil" title=${t('Fill the cost table', 'املا جدول التكلفة')}><p className="hf-p small">${t('Tap a formula, then every cell it belongs to.', 'دوس على formula، وبعدين على كل خانة بتاعتها.')}</p></${Box}>
          <${CostGrid} id="cgrid" />
        `),

        // 34 · costs: read the exam's spelling
        page(html`
          <${H2}>${t('Which operation is this exam choice?', 'اختيار الامتحان ده بتاع أنهي operation؟')}</${H2}>
          <${P} small=${true}>${t('Every wrong choice in the papers is another row of the table, or nothing at all.', 'كل اختيار غلط في الورق هو صف تاني من الجدول، أو ملوش أي معنى.')}</${P}>
          <${Pick} id="spell" items=${[
            { q: '<code>Dlog2B + Clog2R + 2*( 0.5B(D + RC) )</code>', o: [['Sorted insert/delete', 'الـ sorted insert/delete'], ['Heap insert', 'الـ heap insert'], ['Hashed delete', 'الـ hashed delete']], a: 0 },
            { q: '<code>Dlog2B + Clog2R + B(D + RC)</code>', o: [['Sorted equality', 'الـ sorted equality'], ['Sorted delete', 'الـ sorted delete'], ['Heap scan', 'الـ heap scan']], a: 1, n: ['B(D + RC) = 2 × 0.5B(D + RC): the same as the line above.', 'الـ <bdi dir="ltr">B(D + RC)</bdi> هي <bdi dir="ltr">2 × 0.5B(D + RC)</bdi>: زي اللي فوق.'] },
            { q: '<code>1.25B(D + RC) + C + D</code>', o: [['Hashed scan', 'الـ hashed scan'], ['Hashed delete (model answer)', 'الـ hashed delete (الـ model answer)'], ['Heap delete', 'الـ heap delete']], a: 1 },
            { q: '<code>B(D + RC) + C + D</code>', o: [['Heap delete with a full scan', 'الـ heap delete بـ scan كامل'], ['Sorted delete', 'الـ sorted delete'], ['Hashed insert', 'الـ hashed insert']], a: 0 },
            { q: '<code>Dlog2B + Clog2R + 2D + C</code>', o: [['Sorted insert', 'الـ sorted insert'], ['Heap insert', 'الـ heap insert'], ['No operation at all', 'ولا operation']], a: 2, n: ['Sorted search glued to the heap insert: no row of the table.', 'الـ sorted search لازق في الـ heap insert: مش صف في الجدول.'] }
          ]} />
        `),

        // 35 · costs: numbers (ours)
        page(html`
          <${H2}>${t('Put numbers in (ours)', 'حط أرقام (من عندنا)')}</${H2}>
          <${Desk} id="pC" rows=${DESK_C} giv=${GIV_C} />
        `),

        // 36 · hashing: the method
        page(html`
          <${H2}>${t('Problem 4 · Model A Q1-b, 2 marks', 'المسألة 4 · Model A Q1-b، درجتين')}</${H2}>
          <p className="hf-fpF-quote hf-in">"Write a C++ function to implement a simple hashing algorithm."</p>
          <${Code} lines=${['int Hash(char key[12],', '         int maxAddress)', '{', '  int sum = 0;', '  for (int j = 0; j < 12; j = j + 2)', '    sum = sum + key[j] * key[j+1];', '  sum = sum % 19937;', '  return sum % maxAddress;', '}']} />
          <${UL} items=${A ? ['الخطوة 1: نمثّل الـ key كرقم بـ <b>pairs</b> من الـ characters (الـ ASCII).', 'الخطوة 2: fold and add، والباقي على الـ prime <b>19937</b> عشان <b>نمنع الـ overflow</b>.', 'الخطوة 3: الباقي على حجم الـ address space هو الـ <b>home address</b>.']
            : ['Step 1: represent the key numerically, <b>pairs</b> of characters (ASCII).', 'Step 2: fold and add, <b>% 19937</b>, a prime, to <b>prevent overflow</b>.', 'Step 3: the remainder by the address-space size is the <b>home address</b>.']} />
          <${Hand} red=${true}>${t('a 5-letter key? key[5] … key[11] are \\0 = 0, so those pairs add 0', 'key فيه 5 حروف؟ من key[5] لـ key[11] كلهم \\0 يعني 0، فالـ pairs دي بتضيف 0')}</${Hand}>
        `, { sec: t('Problems: hashing', 'المسائل: الـ hashing') }),

        // 37 · hashing: trace ZZZZZZ
        page(html`
          <${H2}>${t('Trace it: ZZZZZZ, 1000 addresses', 'امشي وراها: ZZZZZZ، و1000 address')}</${H2}>
          <${P} small=${true}>${t('The final summary\'s worked key. Step through with Next.', 'الـ key المحلول في الـ final summary. امشي خطوة خطوة.')}</${P}>
          <${HashTrace} id="htrace" />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Skip <code>% 19937</code> and you get 24,300 % 1000 = <b>300</b>: wrong. Skip <code>% maxAddress</code> and 4363 isn\'t even in 0..999. Hashing does <b>not</b> sort or encrypt the keys.', 'لو نطيت <code>% 19937</code> هيطلعلك' + LT('24,300 % 1000 = 300') + 'وده غلط. ولو نطيت <code>% maxAddress</code> الـ 4363 أصلًا برا <bdi dir="ltr">0..999</bdi>. والـ hashing <b>مش</b> بيرتب الـ keys ولا بيشفّرها.')}</p></${Box}>
        `),

        // 38 · hashing: be the function (ours)
        page(html`
          <${H2}>${t('Be the hash function (ours): 100 addresses', 'خليك إنت الـ hash function (من عندنا): 100 address')}</${H2}>
          <${Desk} id="pH" rows=${DESK_H} after=${html`<p className="hf-hand red" style=${{ fontSize: A ? '18px' : '20px' }}>${t('Yara and Reem both land on 91: a collision, and they are synonyms. Samy, Zaki and Hassan are where % 19937 matters.', 'الـ Yara والـ Reem الاتنين راحوا 91: ده collision، وهما synonyms. والـ Samy والـ Zaki والـ Hassan هما اللي الباقي على 19937 فرق معاهم.')}</p>`} />
        `),

        // 39 · RRN offsets (ours)
        page(html`
          <${H2}>${t('Offsets, by RRN (ours)', 'الـ offsets بالـ RRN (من عندنا)')}</${H2}>
          <${Desk} id="pR" rows=${DESK_R} giv=${GIV_R} />
        `, { sec: t('Problems: code and bytes', 'المسائل: الكود والـ bytes') }),

        // 40 · copy with no loops
        page(html`
          <${Box} kind="exam" title=${t('Model B Q1-b, 3 marks', 'سؤال Q1-b من Model B (3 درجات)')}><p className="hf-fpF-quote">"Write a C++ program, with no loops, to copy the contents of d:\\src.txt to d:\\dest.txt (destination is empty)."</p></${Box}>
          <${CodeFill} id="ccopy" lines=${CODE_COPY} />
        `),

        // 41 · UpdateRecord
        page(html`
          <${Box} kind="exam" title=${t('Model C Q1-b, 3 marks', 'سؤال Q1-b من Model C (3 درجات)')}><p className="hf-fpF-quote">"Consider a (fixed-length field, fixed-length record) file. Write the full body of UpdateRecord given the Relative Record Number (RRN)."</p></${Box}>
          <${CodeFill} id="cupd" lines=${CODE_UPD} />
          <${Hand} red=${true}>${t('you write, so seekp from ios::beg; every record has the same size, so RRN × size', 'بتكتب يبقى seekp من الأول، والـ offset هو RRN × size')}</${Hand}>
        `),

        // 42 · byte counts (ours)
        page(html`
          <${H2}>${t('Count the bytes (ours)', 'عدّ الـ bytes (من عندنا)')}</${H2}>
          <${P} small=${true}>${X('One record, ID 20431, name SALMA, dept CS. · = padding.', 'نفس الـ record في كل structure، والـ · يعني padding.')}</${P}>
          <${Desk} id="pBy" rows=${DESK_B} />
        `),

        // 43 · modes
        page(html`
          <${H2}>${t('Be the C runtime (ours)', 'خليك إنت الـ C runtime (من عندنا)')}</${H2}>
          <${P} small=${true}>${t('Six programs, six needs. Pick the fopen mode for each.', 'ست برامج وست احتياجات. اختار الـ fopen mode لكل واحد.')}</${P}>
          <${ModeStep} id="modes" />
          <${Grow} />
          <${Hand} red=${true}>${t('w and w+ wipe the file; a and a+ never do; r and r+ need it to exist', 'الـ w والـ w+ بيمسحوا الـ file، والـ a والـ a+ عمرهم ما بيمسحوا، والـ r والـ r+ محتاجين الـ file يكون موجود')}</${Hand}>
        `),

        // 44 · written answers 1
        page(html`
          <${Box} kind="exam" title=${t('Model C Q2-a, 4 marks', 'سؤال Q2-a من Model C (4 درجات)')}><p className="hf-fpF-quote">"Mention the main differences between: (i) physical file and logical file; (ii) seek time, rotational delay and transfer time."</p></${Box}>
          <${P} small=${true}>${t('Write your answer first. Then compare.', 'اكتب إجابتك الأول، وبعدين قارن.')}</${P}>
          <${Reveal} id="w1" label=${t('Show the model answer', 'اعرض الإجابة النموذجية')}>
            ${tb(A ? ['', 'الإجابة'] : ['', 'Model answer'], A ? [
              ['الـ Physical', 'bytes على الـ disk باسم physical زي A.txt، بيتستخدم مرة واحدة وقت الفتح.'],
              ['الـ Logical', 'قناة بين البرنامج والـ physical file، اسمها variable زي infile، بتتستخدم مرات كتير.'],
              ['الـ Seek', 'وقت تحريك الـ arm للـ cylinder الصح.'],
              ['الـ Rotational', 'وقت لف الـ disk لحد ما الـ sector ييجي تحت الـ head.'],
              ['الـ Transfer', 'بعد ما الـ head يوصل، وقت نقل الداتا (مروره على الـ block).']
            ] : [
              ['Physical', 'bytes on disk, a physical name (A.txt); used once, when opening.'],
              ['Logical', 'a channel from the program to the physical file; a variable (infile); used many times.'],
              ['Seek', 'time to move the arm to the correct cylinder.'],
              ['Rotational', 'time for the disk to rotate the sector under the head.'],
              ['Transfer', 'once positioned, the time to transfer the data (pass over the block).']
            ], ['30%', '70%'])}
          </${Reveal}>
        `),

        // 45 · written answers 2
        page(html`
          <${Box} kind="exam" title=${t('Model B Q2-a, 2 marks', 'سؤال Q2-a من Model B (درجتين)')}><p className="hf-fpF-quote">"Network and CPU have to wait a long time for the disk to transmit data. Give four techniques to solve this problem."</p></${Box}>
          <${Reveal} id="w2" label=${t('Show the model answer', 'اعرض الإجابة النموذجية')}><${UL} items=${A ? ['الـ <b>Multiprocessing</b>: الـ CPU يشتغل في حاجة تانية وهو مستني.', 'الـ <b>Disk striping</b>: blocks الـ file على drives مختلفة بالتوازي.', 'الـ <b>RAID</b>: Redundant Array of Independent Disks.', 'الـ <b>RAM disk</b>: memory بتعمل نفسها disk.', 'الـ <b>Disk cache</b>: الـ cache الأول، ولو miss نروح للـ disk.']
            : ['<b>Multiprocessing</b>: the CPU works on other jobs while waiting.', '<b>Disk striping</b>: blocks of the file on different drives, in parallel.', '<b>RAID</b>: Redundant Array of Independent Disks.', '<b>RAM disk</b>: memory simulates a disk (speed vs volatility).', '<b>Disk cache</b>: check the cache first; a miss goes to the disk.']} /></${Reveal}>
          <${Box} kind="exam" title=${t('Model A Q2-a, 2 marks', 'سؤال Q2-a من Model A (درجتين)')}><p className="hf-fpF-quote">"There are many ways of adding structure to files to maintain the identity of fields. Mention these ways and show the advantages and disadvantages for each way."</p></${Box}>
          <${Hand} red=${true}>${t('answer: page 17, four structures, a + and a − each', 'الإجابة في صفحة 17: أربع structures، لكل واحد ميزة وعيب')}</${Hand}>
        `),

        // 46 · fireside: block vs bucket
        page(html`
          <${Fireside} sub=${t('Tonight: a Block (Lecture 2) and a Bucket (Lecture 5), whom the exam keeps mixing up.', 'قعدة الليلة: Block من محاضرة 2 وBucket من محاضرة 5، والامتحان بيلخبط بينهم.')} />
          <${Chat} names=${[t('Block', 'الـ Block'), t('Bucket', 'الـ Bucket')]} lines=${A ? [
            [0, 'أنا حتة من الـ track الـ user بيحددها. الـ DBMS شايف الـ file كسلسلة مننا، وكل واحد فيّا فيه عدد صحيح من الـ records: الـ <b>blocking factor</b>.'],
            [1, 'وأنا وحدة تخزين في الـ <b>hash file</b> بتشيل <b>record واحد أو أكتر</b>. الـ hash function بتبعت الـ key للـ address بتاعي.'],
            [0, 'في محاضرة 4 اسمي <b>page</b>: الـ B بتعدّنا، والـ D وقت قراية واحد مننا. وجايلي sub-blocks: الـ count والـ key والـ data.'],
            [1, 'ولما 2 synonyms يعملوا collision، بيقعدوا عندي سوا. وبيسيبوني مليان حوالي 80%، فالـ hashed scan بيقرا <bdi dir="ltr">1.25B</bdi> pages.'],
            [0, 'وفي <bdi dir="ltr">Model C</bdi> أنا كنت اختيار غلط: "unit of storage… in a hash file" إجابتها إنت، مش أنا ولا الـ disk page ولا الـ node.']
          ] : [
            [0, "I'm a user-defined piece of a track. The DBMS sees a file as a series of us, each holding a whole number of records: the <b>blocking factor</b>."],
            [1, "I'm a unit of storage in a <b>hash file</b> that holds <b>one or more records</b>. The hash function sends a key to my address."],
            [0, 'In Lecture 4 they call me a <b>page</b>: B counts us, D is the time to read one. I come with sub-blocks: count, key, data.'],
            [1, 'When two synonyms collide, they sit with me. And I\'m kept about 80% full, so a hashed scan reads <b>1.25B</b> pages.'],
            [0, 'In Model C I was a wrong choice: "a unit of storage… in a hash file" is you, not me, not a disk page, not a node.']
          ]} />
        `, { sec: t('Showdowns', 'المواجهات') }),

        // 47 · interview: seek
        page(html`
          <${Interview} title=${t('This week\'s interview: Seek', 'حوار الأسبوع: الـ Seek')} sub=${t('works in Lecture 2 and Lecture 3, and gets blamed for both', 'بيشتغل في محاضرة 2 ومحاضرة 3، وبيتلام على الاتنين')} lines=${A ? [
            ['Head First', 'إنت في محاضرتين. نفس الشغلانة؟'],
            ['Seek', 'لأ. في L2 الـ <b>seek time</b> هو وقت تحريك الـ arm للـ cylinder الصح، وده أكبر جزء من الـ access time (30 ms في المتوسط).'],
            ['Head First', 'وفي L3؟'],
            ['Seek', 'هناك أنا الـ <code>Seek(infile, 3030)</code> والـ <code>fseek</code>: بحرّك الـ file pointer لـ byte offset، بـ origin يا 0 يا 1 يا 2.'],
            ['Head First', 'والامتحان بيعرف إنت أنهي واحد إزاي؟'],
            ['Seek', 'لو "move the arm to the correct cylinder" يبقى <b>Seek time</b>. ولو "reposition the file pointer" يبقى <b><code>seekg()</code></b>.'],
            ['Head First', 'والـ seekg والـ seekp؟'],
            ['Seek', 'الـ g يعني get للقراية، والـ p يعني put للكتابة. والـ <code>tellg</code> بعد ما أروح للآخر بيقولك حجم الـ file.']
          ] : [
            ['Head First', "You're in two lectures. Same job?"],
            ['Seek', 'No. In L2, <b>seek time</b> is the time to move the arm to the correct cylinder: the largest part of the access time (30 ms average).'],
            ['Head First', 'And in L3?'],
            ['Seek', "There I'm <code>Seek(infile, 3030)</code> and <code>fseek</code>: I move the file pointer to a byte offset, origin 0, 1 or 2."],
            ['Head First', 'How does the exam tell which one it means?'],
            ['Seek', '"Move the arm to the correct cylinder" → <b>seek time</b>. "Reposition the file pointer" → <b><code>seekg()</code></b>.'],
            ['Head First', 'And seekg against seekp?'],
            ['Seek', 'g = get, for reading; p = put, for writing. And <code>tellg</code> after I jump to the end gives the file size.']
          ]} />
        `),

        // 48 · interview: sequential
        page(html`
          <${Interview} title=${t('And the word Sequential', 'وكلمة Sequential')} sub=${t('turns up in three lectures with three meanings', 'بتظهر في تلات محاضرات بتلات معاني')} lines=${A ? [
            ['Head First', 'إنت في كل حتة. ابدأ بالـ L1.'],
            ['Sequential', 'في L1 الـ access يا <b>sequential</b> يا <b>direct</b>. وفي L3 الـ <b>sequential search</b>: تقرا بالترتيب لحد ما تلاقي، يعني <bdi dir="ltr">O(n)</bdi>.'],
            ['Head First', 'وفي L4؟'],
            ['Sequential', 'الـ <b>sequential file</b> هو الـ <b>ordered</b> file، بترتيب الـ key. والـ heap اسمه كمان <b>unordered sequential file</b> أو pile.'],
            ['Head First', 'يعني الـ sequential file بيتدوّر فيه sequential؟'],
            ['Sequential', 'مش لازم: الـ sorted file بيعمل binary search:' + LT('D·log₂B + C·log₂R') + 'الـ heap هو اللي البحث فيه linear بس.'],
            ['Head First', 'وفي الامتحان؟'],
            ['Sequential', 'الـ "Sequential access" بـ <bdi dir="ltr">O(n)</bdi>، والـ "Direct access" بـ <bdi dir="ltr">O(1)</bdi>، والـ binary search بـ <bdi dir="ltr">O(log₂ n)</bdi>.']
          ] : [
            ['Head First', "You're everywhere. Start with L1."],
            ['Sequential', 'In L1, access is either <b>sequential</b> or <b>direct</b>. In L3, <b>sequential search</b>: read in order until a match, O(n).'],
            ['Head First', 'And in L4?'],
            ['Sequential', 'A <b>sequential file</b> is the <b>ordered</b> file, in key order. And the heap is also called an <b>unordered sequential file</b>, or pile.'],
            ['Head First', 'So a sequential file is searched sequentially?'],
            ['Sequential', 'Not necessarily: the sorted file uses binary search, D·log₂B + C·log₂R. The heap is the one searched only linearly.'],
            ['Head First', 'And on the paper?'],
            ['Sequential', '"Sequential access" → O(n); "Direct access" → O(1); binary search → O(log₂ n).']
          ]} />
        `),

        // 49 · who am I?
        page(html`
          <${Box} kind="pencil" title=${t('Who am I, and which lecture?', 'أنا مين، ومن أنهي محاضرة؟')}><p className="hf-p small">${t('Tap the lecture each one comes from.', 'دوس على المحاضرة اللي كل واحد جاي منها.')}</p></${Box}>
          <${Pick} id="who" mono=${true} opts=${['L1', 'L2', 'L3', 'L4', 'L5']} items=${[
            { q: ['I return NULL when the file won\'t open.', 'برجّع NULL لما الـ file ميرضاش يتفتح.'], a: 0, n: ['fopen, Lecture 1.', 'الـ fopen، محاضرة 1.'] },
            { q: ['I am the time for the head to pass over a block.', 'أنا الوقت اللي الـ head بياخده عشان يعدّي على block.'], a: 1, n: ['Transfer time, Lecture 2.', 'الـ transfer time، محاضرة 2.'] },
            { q: ['I am the smallest unit of data with logical meaning.', 'أنا أصغر وحدة داتا ليها معنى.'], a: 2, n: ['The field, Lecture 3.', 'الـ field، محاضرة 3.'] },
            { q: ['I am 2D + C.', 'أنا <bdi dir="ltr">2D + C</bdi>.'], a: 3, n: ['The heap insert, Lecture 4.', 'الـ heap insert، محاضرة 4.'] },
            { q: ['I hold one or more records in a hash file.', 'بشيل record واحد أو أكتر في الـ hash file.'], a: 4, n: ['The bucket, Lecture 5.', 'الـ bucket، محاضرة 5.'] },
            { q: ['I free the logical name, like hanging up the telephone.', 'بحرّر الـ logical name، زي ما تقفل التليفون.'], a: 0, n: ['Closing a file, Lecture 1.', 'قفل الـ file، محاضرة 1.'] }
          ]} />
        `),

        // 50–58 · the exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}>${ecBox(true)}</${Box}>
          ${mq('e1', /DELETE process of the sorted file/, /Model B/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e2', /EQUALITY SEARCH in the heap file/)}
          ${mq('e11', /managed by system software/)}
        `),
        page(html`
          ${mq('e3', /DELETE process of the hash file/)}
          ${mq('e7', /20 surfaces will have/)}
        `),
        page(html`
          ${mq('e4', /insert process of the sorted file/)}
          <${Grow} />
          <${Hand} red=${true}>${t('same cost as the sorted delete: search + B(D + RC)', 'نفس تكلفة الـ sorted delete: الـ search وفوقه B(D + RC)')}</${Hand}>
        `),
        page(html`
          ${mq('e5', /4 sectors per cluster, 64 sectors per track/)}
          <${Grow} />
          <${Hand} red=${true}>${t('cluster = sectors per cluster × 512, not the track', 'الـ cluster هو sectors الـ cluster في 512، مش الـ track')}</${Hand}>
        `),
        page(html`
          ${mq('e6', /spinning at 5000 rpm/)}
          <${Grow} />
          <${Hand} red=${true}>${t('½ × 60,000 / 5000 = 6 ms', 'نص لفة: 6 ms')}</${Hand}>
        `),
        page(html`
          ${mq('e8', /DBMS views the file/)}
          ${mq('e9', /not used as a file opening mode/)}
        `),
        page(html`
          ${mq('e10', /EOF is an integer/)}
          ${mq('e13', /stream of bytes containing/)}
        `),
        page(html`
          ${mq('e12', /correct syntax for opening a file\.$/)}
          <${Grow} />
          <${Hand} red=${true}>${t('fopen returns FILE *, and both arguments are strings', 'الـ fopen بترجع FILE *، والاتنين strings')}</${Hand}>
        `),
        page(html`
          ${mq('e14', /jump ahead to the end of the field/)}
          ${mq('e15', /determined by a mathematical algorithm/)}
        `),
        page(html`
          ${mq('e16', /one or more records in a hash file/)}
          <${Grow} />
          <${Talk} who="table" flip=${true}>${t('Sixteen of the doctors\' questions. The quiz button at the end has all of them.', 'ستاشر سؤال من أسئلة الدكاترة. وزرار الـ quiz في الآخر فيه كلهم.')}</${Talk}>
        `),

        // 59 · practice questions (hashing has only two of the doctors')
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("Hashing has only two of the doctors' questions, so here are two of the site's own. Not from the papers.", 'الـ hashing ليه سؤالين بس من الدكاترة، فدول سؤالين تدريب من الموقع، مش من الامتحانات.')}</p></${Box}>
          ${pq('p1', /two different keys produce the same address/)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /why is sum % 19937 applied/)}
          <${Grow} />
          <${Hand} red=${true}>${t('% 19937 keeps the sum small; % maxAddress makes it an address', 'الـ % 19937 بيصغّر الـ sum، والـ % maxAddress بيخليه address')}</${Hand}>
        `),

        // 60 · exam day
        page(html`
          <${H2}>${t('Exam day', 'يوم الامتحان')}</${H2}>
          <${Box} kind="relax" title=${t('A time plan (ours)', 'خطة وقت (من عندنا)')}><p className="hf-p small">${X('No past final, so this follows the 2022/23 midterms (about a third MCQ, a sixth code, half the disk problem and theory): <b>read everything</b> first, MCQs fast, then the disk problem, then the code, and keep the <b>last 10%</b> for checking.',
            'مفيش final قديم، فدي ماشية على midterms 2022/23 (حوالي تلت MCQ، وسدس كود، ونص مسألة الـ disk والنظري): <b>اقرا الورقة كلها</b> الأول، والـ MCQ بسرعة، وبعدين الـ disk، وبعدين الكود، وسيب <b>آخر 10%</b> للمراجعة.')}</p></${Box}>
          <p className="hf-fpF-lab hf-in">${t('Where the marks go', 'الدرجات بتضيع فين')}</p>
          <div className="hf-fpF-check hf-in">${(A ? [
            'الـ revolution هي <bdi dir="ltr">60,000 / rpm</bdi> بالـ ms، والـ latency نصها، <b>إلا لو مدّيهالك</b>.',
            'الـ transfer هو <bdi dir="ltr">n × rev / sectors per track</bdi>.',
            'الـ blocks في الـ track: <b>لتحت</b>. والـ tracks والـ cylinders للـ file: <b>لفوق</b>.',
            'الـ RRN بيبدأ من 0. والـ seekp للكتابة، والـ seekg للقراية.',
            'الـ hash: الباقي على 19937 الأول، وبعدين على الـ maxAddress.',
            'الـ EOF بـ −1، والـ fopen بترجع NULL، والـ fread بترجع 0.'
          ] : [
            'Revolution = 60,000 / rpm ms; latency is half of it <b>unless given</b>.',
            'Transfer = n × rev / sectors per track.',
            'Blocks per track: <b>floor</b>. Tracks or cylinders for a file: <b>round up</b>.',
            'RRN starts at 0. seekp to write, seekg to read.',
            'Hash: % 19937 first, then % maxAddress.',
            'EOF = −1; fopen fails with NULL; fread returns 0 at the end.'
          ]).map((x, i) => html`<div key=${i}><span>${T(x)}</span></div>`)}</div>
        `, { sec: t('Exam day', 'يوم الامتحان') }),

        // 61–62 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>L1</b>: الـ physical file بيتستخدم مرة وقت الفتح، والـ logical file مرات كتير. والـ managers هما الـ OS والـ DBMS، والـ organization لازم تدي fast access و good space utilization.',
            'الـ modes: الـ r للقراية، والـ w بيمسح، والـ a بيكمّل في الآخر، والـ + للاتنين، والـ b للـ binary. والـ EOF بـ −1.',
            'الـ <b>L2</b>: الأجزاء الخمسة بالتعريف. والـ cylinder بيتقري من غير ما الـ arm يتحرك، والـ heads بعدد الـ surfaces.',
            'الـ capacity: الـ track في الـ height في الـ tracks per surface. والـ blocks بالـ floor، والـ file بالتقريب لفوق.',
            'الـ access time هو seek وlatency (نص لفة إلا لو مدّيهالك) وtransfer <bdi dir="ltr">(n × rev / sectors)</bdi>.',
            'الـ <b>L3</b>: أربع field structures، لكل واحد ميزة وعيب. والـ offset هو <bdi dir="ltr">RRN × size</bdi>، والـ RRN بيبدأ من 0.'
          ] : [
            '<b>L1</b>: physical file used once at opening, logical file many times. Managers: OS and DBMS. Organization: fast access, good space utilization.',
            'Modes: r reads, w truncates, a appends, + both ways, b binary. EOF = −1.',
            '<b>L2</b>: the five parts by definition. A cylinder is read without moving the arm; heads = surfaces.',
            'Capacity = track × height × tracks per surface. Blocks: floor. A file: round up.',
            'Access time = seek + latency (half a turn unless given) + transfer (n × rev / sectors).',
            '<b>L3</b>: four field structures, a + and a − each. Offset = RRN × size, RRN from 0.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ seekg للقراية والـ seekp للكتابة. والـ copy من غير loops: seekg للآخر، وtellg، وread واحدة، وwrite واحدة.',
            'الـ <b>L4</b>: الـ heap بترتيب الدخول وبيسمح بالتكرار، والـ sorted بترتيب الـ key والـ insert بيزق.',
            'الجدول: الـ scan بـ <bdi dir="ltr">B(D + RC)</bdi>، والـ heap equality بـ <bdi dir="ltr">0.5B(D + RC)</bdi>، والـ heap insert بـ <bdi dir="ltr">2D + C</bdi>، والـ sorted equality بـ <bdi dir="ltr">Dlog₂B + Clog₂R</bdi>، والـ sorted insert/delete هو الـ search وفوقه <bdi dir="ltr">B(D + RC)</bdi>.',
            'الـ <b>L5</b>: الـ hashed بـ <bdi dir="ltr">1.25B(D + RC)</bdi> للـ scan، و<bdi dir="ltr">H + D + 0.5RC</bdi> للـ equality. والـ delete في الـ model answer هو <bdi dir="ltr">1.25B(D + RC) + C + D</bdi>.',
            'الـ function: الـ pairs، وبعدين الباقي على 19937، وبعدين على الـ maxAddress. والـ collision هو الحدث، والـ synonyms هما الـ keys، والـ bucket بيشيل record أو أكتر.',
            'الهدف من الكورس كله: <b>أقل عدد disk accesses</b>.'
          ] : [
            'seekg reads, seekp writes. Copy with no loops: seekg to the end, tellg, one read, one write.',
            '<b>L4</b>: heap in entry order, allows duplicates; sorted in key order, an insert shifts.',
            'The table: scan B(D + RC); heap equality 0.5B(D + RC); heap insert 2D + C; sorted equality Dlog₂B + Clog₂R; sorted insert/delete search + B(D + RC).',
            '<b>L5</b>: hashed scan 1.25B(D + RC), equality H + D + 0.5RC; the model answer\'s delete 1.25B(D + RC) + C + D.',
            'The function: pairs, % 19937, % maxAddress. Collision = the event, synonyms = the keys, a bucket holds one or more records.',
            'The point of the whole course: <b>as few disk accesses as possible</b>.'
          ]} />
        `),

        // 63 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through the whole course!', 'خلّصت الكورس كله!')}</${H1}>
            <${Talk} who="disk">${t('Five lectures, one idea: fewer trips to me. Go and show them.', 'خمس محاضرات وفكرة واحدة: مشاوير أقل ليّا. يلا ورّيهم.')}</${Talk}>
            <${P}>${t('Now test it for real:', 'دلوقتي اختبر نفسك بجد:')}</${P}>
            <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5], mock: 40, t: Date.now() } }}>${t('Timed mock final (40 questions)', 'امتحان تجريبي بالوقت (40 سؤال)')}</${K.Go}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5], only: 'prof', t: Date.now() } }}>${t("All the doctors' questions", 'كل أسئلة الدكاترة')}</${K.Go}>
              <${K.Go} to=${{ mode: 'papers' }}>${t('Past papers', 'الامتحانات القديمة')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 'fin', anchor: null }}>${t('The final summary', 'الـ final summary')}</${K.Go}>
          </div>
        `, { center: true })
      ];
      pages.forEach((pg, i) => { const m = /^(?:Lecture|محاضرة) (\d)$/.exec(pg.sec || ''); if (m) at[+m[1]] = i; });
      return pages;
    }
  };
})();

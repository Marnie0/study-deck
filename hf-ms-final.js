// Head First final revision for Modeling & Simulation (built on hf.js), English + Egyptian Arabic, same pages in both.
// The whole course (8 lectures) in one book, built around what the two past finals (2025/26 and 2024/25) ask: a course map,
// the anatomy of the paper and a hot list counted from the papers, every lecture in 3–4 fast pages, then the heart of the book:
// every written problem type of the finals worked interactively with the paper's own numbers (LCG sequences and periods, runs up
// and down, autocorrelation, Poisson and geometric probabilities, lognormal estimation, the cake shop with goodwill, the weekly
// inventory) plus a fresh variant of each labelled as ours, and the likely ones (K-S, chi-square and poker, a queue table,
// random variates). Then cross-lecture Fireside Chats, an exam corner of the doctors' questions, an exam-day plan and bullet points.
// Every fact comes from the notes and the final summary (final/ms.js); analogies, time plans and advice are labelled as ours.
// Numbers checked with node (scratchpad check.js): LCG 13,0,64,X0=4 → 52 36 20 4 52 (P 4, best 16 with odd seeds);
// 21,17,64,X0=1 → 38 47 44 45 2 (P 64); 5,13,64: X0=1 → 18 39 16 29 30, X0=3 → 28 25 10 63 8 (P 64 both); ours 29,0,64,X0=3 →
// 23 27 15 51 7 (P 16), 13,7,64,X0=5 → 8 47 42 41 28 (P 64). Runs (30 numbers): a = 16, μ 19.667, σ² 5.0111, σ 2.2386, Z0 −1.638;
// ours (25 numbers): a = 16, μ 16.333, σ² 4.1222, Z0 −0.164. Autocorrelation i=3 m=5: M 4, Σ 0.2774, ρ̂ −0.1945, σ̂ 0.1280,
// Z0 −1.5195 (critical 2.576 at α = 0.01); ours i=2 m=4: M 6, Σ 1.6325, ρ̂ −0.0168, σ̂ 0.1098, Z0 −0.153. Poisson α=2: p(3) 0.1804,
// F(1) 0.406, P(X≥2) 0.594; α=3: p(2) 0.2240, P(X≥2) 0.8009; geometric 0.4²·0.6 = 0.096, ours 0.3³·0.7 = 0.0189. Lognormal:
// ln rounded Σ 22.5, Σ² 62.29, μ̂ 2.25, σ̂² 1.296 (unrounded 2.2725, 1.3169); ours μ̂ 2, σ̂² 2.5; cov 8.664, ρ̂ 0.855.
// Cake 25/26: demands 80 20 40 40 70 40 50 30 60 60, x=60 → 950, x=80 → 850 (other boundary reading 850, 750); ours (P 6, C 4,
// S 2, u 3): demands 10 50 60 30 80 50 20 50 40 70, x=40 → 200, x=60 → 430 (other reading 230, 460). Inventory 24/25: ending
// 9 8 7 3 0 13 9 5 19 16 (Σ 89 → holding 445), 2 orders 400, 1 short 20, total 865; ours: ending 5 3 0 0 7 6 → 105 + 200 + 20 = 325.
// K-S lecture D+ 0.26 D− 0.21; ours D+ 0.05 D− 0.23. Poker 2.2222 + 44.1 + 1.337 = 47.66; ours χ² 1.333. Queue slide 11-12 and
// ours (begins 0 4 9 13 15 18, waits 0 0 4 2 2 0, idle 1). Variates: −ln(0.4)/4 = 0.229, 5 + 10(0.42) = 9.2, √0.36 = 0.6,
// 2 − √0.64 = 1.2, ⌈3.36⌉ = 4, geometric R = 0.8 → 3. Hot list: both papers total 60 marks (L1 13+14, L3 2+4 MCQ/TF, …).
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const TF = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-msF')) {
    const s = document.createElement('style'); s.id = 'hf-css-msF';
    s.textContent = `
.hfb .hf-msF-ol{ margin:0; padding:0; list-style:none; display:grid; gap:4px; counter-reset:hfmsf; }
.hfb .hf-msF-ol li{ counter-increment:hfmsf; display:grid; grid-template-columns:22px minmax(0,1fr); gap:6px; font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-msF-ol li::before{ content:counter(hfmsf); font:800 13px/20px var(--body); width:20px; height:20px; border-radius:50%; background:var(--hf-line); color:var(--paper); text-align:center; }
.hf-ar .hf-msF-ol li{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.45; }
/* how ready am I */
.hfb .hf-msF-rd{ display:grid; gap:3px; }
.hfb .hf-msF-rd .r{ display:grid; grid-template-columns:28px minmax(0,1fr) auto; gap:6px; align-items:center; }
.hfb .hf-msF-rd .n{ font:800 13px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-msF-rd .t{ font:600 13.5px/1.15 var(--body); color:var(--ink); }
.hfb .hf-msF-rd .b{ display:flex; gap:3px; }
.hfb .hf-msF-rd button{ font:700 12.5px/1 var(--body); min-width:44px; height:28px; padding:0 5px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-msF-rd button.k0[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); color:var(--paper); }
.hfb .hf-msF-rd button.k1[aria-pressed="true"]{ background:var(--hf-hand); border-color:var(--hf-hand); color:var(--paper); }
.hfb .hf-msF-rd button.k2[aria-pressed="true"]{ background:var(--ok); border-color:var(--ok); color:var(--paper); }
.hfb .hf-msF-rd .sum{ font:600 13.5px/1.3 var(--body); color:var(--ink); margin:3px 0 0; min-height:18px; }
.hf-ar .hf-msF-rd .t, .hf-ar .hf-msF-rd button, .hf-ar .hf-msF-rd .sum{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-msF-rd .t{ font-size:13px; line-height:1.3; }
/* the course map: a metro line through the eight lectures */
.hfb .hf-msF-map{ position:relative; display:grid; gap:2px; }
.hfb .hf-msF-map::before{ content:""; position:absolute; inset-inline-start:15px; top:16px; bottom:16px; width:4px; border-radius:2px; background:var(--hf-grey2); }
.hfb .hf-msF-map .st{ position:relative; display:grid; grid-template-columns:34px minmax(0,1fr); gap:8px; align-items:center; text-align:start; padding:3px 4px 3px 0; border:1.5px solid transparent; border-radius:8px; background:none; color:var(--ink); cursor:pointer; min-height:44px; }
.hfb .hf-msF-map .dot{ width:30px; height:30px; border-radius:50%; display:grid; place-items:center; font:800 14px/1 var(--mono); background:var(--paper); border:2.5px solid var(--hf-line); color:var(--ink); transition:background .35s, color .35s, transform .35s; z-index:1; }
.hfb .hf-msF-map .tx{ display:grid; gap:1px; }
.hfb .hf-msF-map .tx b{ font:800 14px/1.15 var(--body); }
.hfb .hf-msF-map .tx span{ font:500 13px/1.25 var(--body); color:var(--graphite); }
.hfb .hf-msF-map .st.past .dot{ border-color:var(--hf-k); }
.hfb .hf-msF-map .st.on{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); }
.hfb .hf-msF-map .st.on .dot{ background:var(--hf-k); border-color:var(--hf-k); color:var(--paper); transform:scale(1.08); }
.hfb .hf-msF-map .st.on .tx span{ color:var(--ink); }
.hf-ar .hf-msF-map .tx b, .hf-ar .hf-msF-map .tx span{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-msF-map .tx span{ font-size:12.5px; line-height:1.4; }
.hf-ar .hf-msF-map .st{ padding:3px 0 3px 4px; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-msF-map .dot{ transition:none; } }
/* how the ideas connect */
.hfb .hf-msF-flow{ direction:ltr; display:block; width:100%; height:auto; }
.hfb .hf-msF-flow rect{ fill:var(--paper); stroke:var(--hf-line); stroke-width:1.8; }
.hfb .hf-msF-flow rect.k{ fill:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); stroke:var(--hf-k); }
.hfb .hf-msF-flow text{ fill:var(--ink); font-family:var(--body); overflow:visible; }
.hfb .hf-msF-flow text.l{ font:800 12.5px var(--mono); fill:var(--hf-k); }
.hfb .hf-msF-flow text.fa{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-msF-flow .e{ fill:none; stroke:var(--hf-line); stroke-width:1.8; }
.hfb .hf-msF-flow .p{ fill:none; stroke:var(--hf-k); stroke-width:3.2; stroke-linecap:round; stroke-dasharray:5 15; animation:hf-msF-run 1.4s linear infinite; }
@keyframes hf-msF-run{ to{ stroke-dashoffset:-20; } }
@media (prefers-reduced-motion: reduce){ .hfb .hf-msF-flow .p{ animation:none; stroke-dasharray:none; opacity:.35; } }
/* small tables */
.hfb .hf-msF-tb{ width:100%; border-collapse:collapse; font:500 13px/1.25 var(--body); color:var(--ink); }
.hfb .hf-msF-tb th, .hfb .hf-msF-tb td{ border:1px solid var(--hf-line); padding:3px 5px; text-align:start; vertical-align:top; }
.hfb .hf-msF-tb th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-msF-tb td.m, .hfb .hf-msF-tb th.m{ font-family:var(--mono); font-weight:600; text-align:center; white-space:nowrap; }
.hfb .hf-msF-tb b{ font-weight:700; }
.hfb .hf-msF-tb code{ font:600 12.5px var(--mono); }
.hf-ar .hf-msF-tb{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.4; font-size:12.5px; }
.hfb .hf-msF-tb.num th, .hfb .hf-msF-tb.num td{ text-align:center; font-family:var(--mono); padding:3px 1px; font-size:13px; }
/* cards */
.hfb .hf-msF-cards{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-msF-cards.one{ grid-template-columns:1fr; }
.hfb .hf-msF-card{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 7px; background:var(--paper); display:grid; gap:2px; align-content:start; box-shadow:2px 2px 0 var(--hf-grey2); }
.hfb .hf-msF-card > b{ font:800 13.5px/1.15 var(--body); color:var(--hf-k); }
.hfb .hf-msF-card > span{ font-size:13px; line-height:1.3; color:var(--ink); }
.hfb .hf-msF-card > span b{ font-weight:700; }
.hfb .hf-msF-card.w{ grid-column:1 / -1; }
.hf-ar .hf-msF-card > b, .hf-ar .hf-msF-card > span{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-msF-card > span{ font-size:12.5px; line-height:1.45; }
.hfb .hf-msF-card code, .hfb .hf-msF-kv code{ font:600 12.5px var(--mono); background:var(--hf-grey); padding:0 2px; border-radius:3px; }
/* key–value formula rows */
.hfb .hf-msF-kv{ display:grid; grid-template-columns:auto minmax(0,1fr); border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-msF-kv > span{ padding:3px 7px; font-size:13px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-msF-kv > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-msF-kv > span.k{ font:800 13px/1.3 var(--body); color:var(--hf-k); background:var(--hf-grey); }
.hfb .hf-msF-kv > span.f{ font-family:var(--mono); font-weight:600; font-size:12.5px; }
.hf-ar .hf-msF-kv > span{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:12.5px; line-height:1.45; }
.hf-ar .hf-msF-kv > span.f{ font-family:var(--mono); direction:ltr; text-align:left; }
/* hot list */
.hfb .hf-msF-hot{ display:grid; gap:4px; }
.hfb .hf-msF-hot .r{ display:grid; grid-template-columns:minmax(0,1fr) 92px 30px 22px; gap:6px; align-items:center; }
.hfb .hf-msF-hot .t{ font:600 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-msF-hot .t small{ font:700 11.5px var(--mono); color:var(--hf-k); }
.hfb .hf-msF-hot .bar{ height:13px; background:var(--hf-grey); border-radius:3px; overflow:hidden; }
.hfb .hf-msF-hot .bar i{ display:block; height:100%; background:var(--hf-k); border-radius:3px; transform-origin:0 50%; animation:hf-msF-grow .9s cubic-bezier(.2,.7,.2,1) both; }
.hf-ar .hfb .hf-msF-hot .bar i, .hf-ar .hf-msF-hot .bar i{ transform-origin:100% 50%; }
@keyframes hf-msF-grow{ from{ transform:scaleX(0); } }
@media (prefers-reduced-motion: reduce){ .hfb .hf-msF-hot .bar i{ animation:none; } }
.hfb .hf-msF-hot .mk{ font:800 13px/1 var(--mono); color:var(--ink); text-align:end; }
.hfb .hf-msF-hot .pp{ display:flex; gap:3px; }
.hfb .hf-msF-hot .pp i{ width:8px; height:8px; border-radius:50%; border:1.5px solid var(--hf-line); }
.hfb .hf-msF-hot .pp i.on{ background:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-msF-hot .hd{ font:800 12px/1 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.04em; }
.hf-ar .hf-msF-hot .t, .hf-ar .hf-msF-hot .hd{ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; }
.hf-ar .hf-msF-hot .t{ font-size:12.5px; line-height:1.35; }
/* table fill (grid) */
.hfb .hf-msF-g{ display:grid; gap:6px; }
.hfb .hf-msF-tabs{ display:flex; gap:4px; }
.hfb .hf-msF-tabs button{ flex:1 1 0; min-width:0; font:700 12.5px/1.1 var(--body); min-height:30px; padding:2px 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-msF-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-msF-tabs button.dn{ border-color:var(--ok); color:var(--ok); }
.hfb .hf-msF-tabs button.dn[aria-pressed="true"]{ background:var(--ok); color:var(--paper); }
.hf-ar .hf-msF-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-msF-gt{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-msF-gt th, .hfb .hf-msF-gt td{ border:1px solid var(--hf-line); text-align:center; padding:0 1px; height:27px; }
.hfb .hf-msF-gt thead th{ background:var(--hf-grey); font:800 12.5px/1.05 var(--body); padding:3px 1px; height:auto; }
.hfb .hf-msF-gt td.g{ color:var(--graphite); background:color-mix(in srgb, var(--hf-grey) 55%, var(--paper)); }
.hfb .hf-msF-gt tr.tot td{ border-top:2px solid var(--hf-line); font-weight:800; }
.hfb .hf-msF-gt td.i{ padding:0; }
.hfb .hf-msF-gt input{ width:100%; height:27px; box-sizing:border-box; border:0; margin:0; padding:0 1px; text-align:center; background:var(--paper); color:var(--hf-hand); font:800 13.5px/1 var(--mono); }
.hfb .hf-msF-gt input:focus{ outline:2px solid var(--hf-hand); outline-offset:-2px; }
.hfb .hf-msF-gt td.ok input, .hfb .hf-msF-x .ok input{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); color:var(--ink); }
.hfb .hf-msF-gt td.no input, .hfb .hf-msF-x .no input{ background:color-mix(in srgb, var(--hf-red) 18%, var(--paper)); color:var(--ink); }
.hfb .hf-msF-x{ display:grid; gap:3px; }
.hfb .hf-msF-x .r{ display:grid; grid-template-columns:minmax(0,1fr) 74px 14px; gap:6px; align-items:center; padding:1px 3px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-msF-x .r.ok{ border-color:var(--ok); } .hfb .hf-msF-x .r.no{ border-color:var(--hf-red); }
.hfb .hf-msF-x .lb{ font:600 13.5px/1.22 var(--body); color:var(--ink); }
.hfb .hf-msF-x .lb code{ font:700 13px var(--mono); background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hf-ar .hf-msF-x .lb{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.4; }
.hfb .hf-msF-x input{ width:100%; box-sizing:border-box; height:28px; font:800 14px/1 var(--mono); text-align:center; padding:0 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--hf-hand); }
.hfb .hf-msF-x .mk{ font:800 14px/1 var(--body); }
.hfb .hf-msF-x .r.ok .mk{ color:var(--ok); } .hfb .hf-msF-x .r.no .mk{ color:var(--hf-red); }
.hfb .hf-msF-x .why{ grid-column:1 / -1; font:600 12.5px/1.25 var(--mono); color:var(--hf-hand); }
.hfb .hf-msF-x .r.no .why{ color:var(--hf-red); }
.hfb .hf-msF-res{ font:600 13px/1.4 var(--body); color:var(--ink); background:color-mix(in srgb, var(--ok) 10%, var(--paper)); border-inline-start:3px solid var(--ok); padding:4px 8px; margin:0; }
.hf-ar .hf-msF-res{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; font-size:12.5px; }
/* pick drills */
.hfb .hf-msF-dr{ display:grid; gap:6px; }
.hfb .hf-msF-dr .dq{ font-size:13.5px; line-height:1.28; margin:0 0 3px; color:var(--ink); }
.hfb .hf-msF-dr .dops{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-msF-dr .dops button{ font:700 13px/1 var(--mono); min-height:29px; min-width:46px; padding:0 8px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-msF-dr .dops button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-msF-dr .dops button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-msF-dr .dops button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); color:var(--ink); }
.hfb .hf-msF-dr .dw{ font-size:12.5px; line-height:1.28; margin:3px 0 0; color:var(--hf-red); }
.hf-ar .hf-msF-dr .dq, .hf-ar .hf-msF-dr .dw{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.45; }
.hf-ar .hf-msF-dr .dq{ font-size:13px; }
/* step drills */
.hfb .hf-msF-sd{ border:2px solid var(--hf-line); border-radius:8px; padding:7px; display:grid; grid-template-columns:minmax(0,1fr); gap:5px; }
.hfb .hf-msF-ask{ font-size:13.5px; line-height:1.3; margin:0; color:var(--ink); }
.hfb .hf-msF-work{ font:600 12.5px/1.5 var(--mono); background:var(--hf-grey); border-inline-start:3px solid var(--hf-k); padding:3px 7px; color:var(--ink); min-height:40px; direction:ltr; text-align:left; }
.hfb .hf-msF-work > div{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:hf-up .35s both; }
.hfb .hf-msF-work .cur{ color:var(--hf-hand); }
.hfb .hf-msF-q{ font:700 13.5px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-msF-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-msF-dr .dops button.a, .hfb .hf-msF-opts button.a{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; font-weight:600; }
.hfb .hf-msF-gt td.g.a, .hfb .hf-msF-gt th.a{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; }
.hfb .hf-msF-opts button{ font:700 13px/1.1 var(--mono); min-height:30px; padding:0 8px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-msF-bad{ font-size:13px; line-height:1.28; margin:0; color:var(--hf-red); }
.hfb .hf-msF-ok{ font-size:13px; line-height:1.3; margin:0; color:var(--ink); padding:4px 8px; border-inline-start:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-msF-row{ display:flex; gap:5px; flex-wrap:wrap; align-items:center; }
.hfb .hf-msF-row .hf-btn{ padding:6px 9px; min-height:31px; }
.hf-ar .hf-msF-ask, .hf-ar .hf-msF-bad, .hf-ar .hf-msF-ok, .hf-ar .hf-msF-q{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.45; }
.hf-ar .hf-msF-ask, .hf-ar .hf-msF-q{ font-size:13px; }
/* runs: tap the signs */
.hfb .hf-msF-sg{ display:grid; gap:6px; }
.hfb .hf-msF-sg .nums{ display:grid; grid-template-columns:repeat(10, minmax(0,1fr)); gap:5px 2px; direction:ltr; }
.hfb .hf-msF-sg .c{ display:grid; justify-items:center; gap:2px; }
.hfb .hf-msF-sg .c > span{ font:700 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-msF-sg .c button{ width:100%; max-width:30px; height:26px; padding:0; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); font:800 15px/1 var(--mono); color:var(--graphite); cursor:pointer; }
.hfb .hf-msF-sg .c button.p{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-msF-sg .c button.m{ color:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-msF-sg .c button.ok{ background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.hfb .hf-msF-sg .c button.no{ background:var(--hf-red); color:var(--paper); }
.hfb .hf-msF-sg .c i{ display:block; height:26px; }
.hfb .hf-msF-runs{ font:700 13px/1.4 var(--mono); color:var(--ink); background:var(--hf-grey); border-radius:6px; padding:3px 7px; margin:0; direction:ltr; text-align:left; word-break:break-all; }
/* inventory: be the warehouse */
.hfb .hf-msF-iv{ border:2px solid var(--hf-line); border-radius:8px; padding:6px; display:grid; gap:5px; }
.hfb .hf-msF-iv table{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-msF-iv th, .hfb .hf-msF-iv td{ border:1px solid var(--hf-line); text-align:center; height:22px; padding:0 1px; }
.hfb .hf-msF-iv th{ background:var(--hf-grey); font:800 12.5px/1.05 var(--body); padding:2px 0; }
.hfb .hf-msF-iv tr.cur td{ background:color-mix(in srgb, var(--hf-hand) 12%, var(--paper)); }
.hfb .hf-msF-iv td.sh{ color:var(--hf-red); font-weight:800; }
.hfb .hf-msF-iv td.od{ color:var(--hf-k); font-weight:800; }
.hfb .hf-msF-iv td.q{ color:var(--hf-hand); }
.hfb .hf-msF-plan{ display:flex; gap:2px; margin:4px 0 8px; height:28px; }
.hfb .hf-msF-plan span{ display:flex; align-items:center; justify-content:center; font:700 11.5px var(--mono); background:var(--hf-grey); color:var(--ink); border-radius:5px; white-space:nowrap; overflow:hidden; }
.hfb .hf-msF-plan span.k{ background:var(--hf-k); color:#fff; }
.hfb .hf-msF-iv .tot{ font:700 13px/1.4 var(--mono); color:var(--ink); background:var(--hf-grey); padding:3px 7px; border-radius:6px; margin:0; direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // numbers typed by the reader: "0.8125", ".81", "−1.64", "13/16"
  const isAr = x => /[\u0600-\u06FF]/.test(String(x));
  const num = s => { const m = String(s == null ? '' : s).trim().replace(',', '.').replace(/[−–]/g, '-'); if (!m) return NaN; const f = m.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/); return f ? +f[1] / +f[2] : (/^-?\d*\.?\d+$/.test(m) ? +m : NaN); };
  const Btns = ({ ar, onCheck, onShow, dis, score }) => html`<div className="hf-msF-row">
    <button className="hf-btn solid" disabled=${dis} onClick=${onCheck}>${ar ? 'صحّح' : 'Check'}</button>
    <button className="hf-btn" onClick=${onShow}>${ar ? 'اعرض الحل' : 'Show me'}</button>
    ${score != null && html`<span className="hf-score"><bdi dir="ltr">${score}</bdi></span>`}</div>`;

  // How ready am I? one row per lecture: shaky / OK / solid, kept with the book's slots
  function Ready({ lecs }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('ready', {});
    const lab = ar ? ['مهزوز', 'نص نص', 'تمام'] : ['shaky', 'OK', 'solid'];
    const shaky = lecs.filter(l => v[l[0]] === 0).map(l => 'L' + l[0]), ok = lecs.filter(l => v[l[0]] === 1).map(l => 'L' + l[0]);
    const first = shaky.concat(ok);
    return html`<div className="hf-msF-rd hf-in">
      ${lecs.map(([n, en, a]) => html`<div key=${n} className="r"><span className="n">L${n}</span><span className="t">${ar ? a : en}</span>
        <span className="b">${[0, 1, 2].map(j => html`<button key=${j} className=${'k' + j} aria-pressed=${String(v[n] === j)} onClick=${() => setV(Object.assign({}, v, { [n]: v[n] === j ? null : j }))}>${lab[j]}</button>`)}</span></div>`)}
      <p className="sum">${first.length ? (ar ? html`ابدأ بـ <bdi dir="ltr">${first.join(', ')}</bdi>: اقرا صفحاتها وحل مسايلها الأول.` : 'Start with ' + first.join(', ') + ': read their pages and do their problems first.')
        : (ar ? 'دوس على زرار في كل صف، وهنقولك تبدأ بأنهي محاضرة.' : 'Tap one button per row and we will tell you where to start.')}</p>
    </div>`;
  }

  // the big picture: a metro line through the eight lectures; the light walks from stop to stop (tap a stop to hold it)
  function CourseMap({ stops }) {
    const ar = useAr();
    const [k, setK] = useState(calm() ? -1 : 0);
    const [sel, setSel] = useState(null);
    useEffect(() => { if (calm() || sel != null) return; const id = setInterval(() => setK(x => (x + 1) % stops.length), 1600); return () => clearInterval(id); }, [sel]);
    const on = sel != null ? sel : k;
    return html`<div className="hf-msF-map hf-in" role="list">${stops.map((s, i) => html`<button key=${i} role="listitem" className=${'st' + (i === on ? ' on' : '') + (on >= 0 && i < on ? ' past' : '')} aria-pressed=${String(sel === i)} onClick=${() => setSel(sel === i ? null : i)}>
      <span className="dot">${s.n}</span><span className="tx"><b>${ar ? s.ar[0] : s.en[0]}</b><span>${TF(ar ? s.ar[1] : s.en[1])}</span></span></button>`)}</div>`;
  }

  // how the ideas connect: random numbers → variates → tables → V&V, fed by distributions and input models
  function Flow() {
    const ar = useAr();
    const N = [ // x, y, lecture, English label, Arabic label, accent
      [8, 8, 'L4', 'random numbers', 'الأرقام العشوائية', 1], [176, 8, 'L3', 'distributions', 'التوزيعات', 0],
      [8, 74, 'L5', 'random variates', 'قيم من التوزيع', 1], [176, 74, 'L6', 'input models', 'نماذج المدخلات', 0],
      [92, 140, 'L2 · L8', 'simulation tables', 'جداول الـ simulation', 1], [92, 206, 'L7', 'verification & validation', 'نتأكد من الـ model', 0]
    ];
    const W = 144, Hh = 46;
    const c = i => [N[i][0] + W / 2, N[i][1] + Hh / 2];
    const E = [['M80 54 V74'], ['M176 46 C150 60 150 70 152 82'], ['M248 54 V74'], ['M80 120 C80 136 110 136 120 140'], ['M248 120 C248 136 220 136 210 140'], ['M164 186 V206']];
    return html`<svg className="hf-msF-flow hf-in" viewBox="0 0 328 300" role="img" aria-label="Lecture 4 random numbers feed Lecture 5 random variates; Lecture 3 distributions feed Lectures 5 and 6; variates and input models drive the simulation tables of Lectures 2 and 8; Lecture 7 checks the model; all inside the 12 steps of Lecture 1" dir="ltr">
      <rect x="2" y="2" width="324" height="296" rx="12" style=${{ fill: 'none', strokeDasharray: '5 5', stroke: 'var(--graphite)' }} />
      ${E.map((e, i) => html`<g key=${i}><path className="e" d=${e[0]} /><path className="p" d=${e[0]} style=${{ animationDelay: (i * 0.23) + 's' }} /></g>`)}
      ${N.map((n, i) => html`<g key=${i}><rect className=${n[5] ? 'k' : ''} x=${n[0]} y=${n[1]} width=${W} height=${Hh} rx="8" />
        <text className="l" x=${n[0] + 9} y=${n[1] + 18}>${n[2]}</text>
        <text className=${ar ? 'fa' : ''} x=${n[0] + W / 2} y=${n[1] + 36} textAnchor="middle" fontSize="13" fontWeight="700">${ar ? n[4] : n[3]}</text></g>`)}
      <text x="164" y="282" textAnchor="middle" fontSize="13" fontWeight="700" className=${ar ? 'fa' : ''} style=${{ fill: 'var(--graphite)' }}>${ar ? 'المحاضرة 1: الـ 12 خطوة' : 'L1: the 12 steps of a study, around it all'}</text>
    </svg>`;
  }

  // the hot list: marks per topic over both finals (120 marks), dots = papers that asked it
  function Hot({ rows }) {
    const ar = useAr();
    const mx = Math.max(...rows.map(r => r[2]));
    return html`<div className="hf-msF-hot hf-in">
      <div className="r"><span className="hd">${ar ? 'الموضوع' : 'Topic'}</span><span className="hd">${ar ? 'الدرجات' : 'Marks'}</span><span></span><span className="hd"></span></div>
      ${rows.map((r, i) => html`<div key=${i} className="r"><span className="t">${TF(ar ? r[1] : r[0])}</span>
        <span className="bar"><i style=${{ width: Math.max(2, r[2] / mx * 100) + '%', animationDelay: calm() ? '0s' : (0.1 + i * 0.08) + 's' }}></i></span>
        <span className="mk">${r[2]}</span><span className="pp">${[0, 1].map(j => html`<i key=${j} className=${j < r[3] ? 'on' : ''}></i>`)}</span></div>`)}</div>`;
  }

  // Sharpen your pencil with a table: given cells and cells to fill; tabs for the paper's version and ours.
  // set = { tab, head, cols, rows: [[cell…]], x: [[label, answer, tol]], done } ; cell = given value | { a, tol, s }
  function Grid({ id, sets, tol = 0.006 }) {
    const ar = useAr();
    const [tab, setTab] = H.K.useSlot(id + ':t', 0);
    const [all, setAll] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', {});
    const S = sets[Math.min(tab, sets.length - 1)], v = all[tab] || {}, c = !!chk[tab];
    const cells = []; S.rows.forEach((r, i) => r.forEach((x, j) => { if (x && typeof x === 'object') cells.push([i + ':' + j, x]); }));
    (S.x || []).forEach((x, k) => cells.push(['x' + k, { a: x[1], tol: x[2] }]));
    const good = (k, x) => Math.abs(num(v[k]) - x.a) <= (x.tol != null ? x.tol : tol) + 1e-9;
    const right = cells.filter(([k, x]) => good(k, x)).length, done = right === cells.length;
    const doneOf = j => { const vv = all[j] || {}; const cs = []; sets[j].rows.forEach((r, i) => r.forEach((x, jj) => { if (x && typeof x === 'object') cs.push([i + ':' + jj, x]); })); (sets[j].x || []).forEach((x, k) => cs.push(['x' + k, { a: x[1], tol: x[2] }])); return cs.every(([k, x]) => Math.abs(num(vv[k]) - x.a) <= (x.tol != null ? x.tol : tol) + 1e-9); };
    const set = (k, val) => { setAll(Object.assign({}, all, { [tab]: Object.assign({}, v, { [k]: val }) })); setChk(Object.assign({}, chk, { [tab]: false })); };
    const show = () => { const o = {}; cells.forEach(([k, x]) => { o[k] = x.s != null ? x.s : String(x.a); }); setAll(Object.assign({}, all, { [tab]: o })); setChk(Object.assign({}, chk, { [tab]: true })); };
    const st = k => c && v[k] != null && v[k] !== '' ? (cells.find(z => z[0] === k) && good(k, cells.find(z => z[0] === k)[1]) ? ' ok' : ' no') : '';
    return html`<div className="hf-msF-g hf-in">
      ${sets.length > 1 && html`<div className="hf-msF-tabs" role="group">${sets.map((s, j) => html`<button key=${j} className=${doneOf(j) ? 'dn' : ''} aria-pressed=${String(tab === j)} onClick=${() => setTab(j)}>${s.tab}</button>`)}</div>`}
      ${S.ask && html`<p className="hf-msF-ask">${TF(S.ask)}</p>`}
      <div dir="ltr"><table className="hf-msF-gt">${S.cols && html`<colgroup>${S.cols.map((w, j) => html`<col key=${j} style=${w ? { width: w } : null} />`)}</colgroup>`}
        <thead><tr>${S.head.map((h, j) => html`<th key=${j} className=${isAr(h) ? 'a' : ''}>${TF(h)}</th>`)}</tr></thead>
        <tbody>${S.rows.map((r, i) => html`<tr key=${tab + '-' + i} className=${S.tot && i === S.rows.length - 1 ? 'tot' : ''}>${r.map((x, j) => {
          const k = i + ':' + j;
          if (x && typeof x === 'object') return html`<td key=${j} className=${'i' + st(k)}><input inputMode="decimal" value=${v[k] || ''} aria-label=${'row ' + (i + 1) + ' ' + String(S.head[j]).replace(/<[^>]+>/g, '')} onChange=${e => set(k, e.target.value)} /></td>`;
          return html`<td key=${j} className=${'g' + (isAr(x) ? ' a' : '')}>${TF(String(x == null ? '' : x))}</td>`; })}</tr>`)}</tbody></table></div>
      ${S.x && html`<div className="hf-msF-x">${S.x.map((x, k) => { const kk = 'x' + k, has = v[kk] != null && v[kk] !== '';
        return html`<div key=${tab + '-' + k} className=${'r' + (c && has ? (good(kk, { a: x[1], tol: x[2] }) ? ' ok' : ' no') : '')}><span className="lb">${TF(x[0])}</span>
          <input inputMode="decimal" dir="ltr" value=${v[kk] || ''} aria-label=${String(x[0]).replace(/<[^>]+>/g, '')} onChange=${e => set(kk, e.target.value)} />
          <span className="mk">${c && has ? (good(kk, { a: x[1], tol: x[2] }) ? '✓' : '✗') : ''}</span>${c && has && x[3] ? html`<span className="why" dir="ltr">${TF(x[3])}</span>` : null}</div>`; })}</div>`}
      <${Btns} ar=${ar} dis=${!Object.keys(v).length} onCheck=${() => setChk(Object.assign({}, chk, { [tab]: true }))} onShow=${show} score=${c ? right + ' / ' + cells.length : null} />
      ${c && done && S.done && html`<p className="hf-msF-res">${TF(S.done)}</p>`}
    </div>`;
  }

  // a list of number questions, one input each: rows [label (html), answer, working shown after checking, tol]
  function Fill({ id, rows, tol = 0.006 }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const good = i => Math.abs(num(v[i]) - rows[i][1]) <= (rows[i][3] != null ? rows[i][3] : tol) + 1e-9;
    const right = rows.filter((_, i) => good(i)).length;
    return html`<div className="hf-msF-g hf-in">
      <div className="hf-msF-x">${rows.map((r, i) => { const has = v[i] != null && v[i] !== '', st = chk && has ? (good(i) ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'r' + st}><span className="lb">${TF(r[0])}</span>
          <input inputMode="decimal" dir="ltr" value=${v[i] || ''} aria-label=${String(r[0]).replace(/<[^>]+>/g, '')} onChange=${e => { setV(Object.assign({}, v, { [i]: e.target.value })); setChk(false); }} />
          <span className="mk">${chk && has ? (good(i) ? '✓' : '✗') : ''}</span>
          ${chk && has && r[2] ? html`<span className="why" dir="ltr">${TF(r[2])}</span>` : null}</div>`; })}</div>
      <${Btns} ar=${ar} dis=${!Object.keys(v).length} onCheck=${() => setChk(true)} onShow=${() => { const o = {}; rows.forEach((r, i) => { o[i] = r[4] != null ? r[4] : String(r[1]); }); setV(o); setChk(true); }} score=${chk ? right + ' / ' + rows.length : null} />
    </div>`;
  }

  // tap-an-answer rows: { q, o: [...], a, w (why the usual slip is wrong) }
  function Pick({ id, rows }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => pick[i] === r.a).length;
    return html`<div className="hf-msF-dr hf-in">
      ${rows.map((r, i) => { const p = pick[i]; return html`<div key=${i}>
        <p className="dq">${TF(r.q)}</p>
        <div className="dops" dir="ltr">${r.o.map((o, j) => html`<button key=${j} aria-pressed=${String(p === j && !chk)} className=${(chk && p != null ? (j === r.a ? 'ok' : j === p ? 'no' : '') : '') + (isAr(o) ? ' a' : '')} onClick=${() => { setChk(false); setPick(Object.assign({}, pick, { [i]: j })); }}>${TF(o)}</button>`)}</div>
        ${chk && p != null && p !== r.a && r.w ? html`<p className="dw">${TF(r.w)}</p>` : null}</div>`; })}
      <div className="hf-msF-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChk(true)}>${ar ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; rows.forEach((r, i) => { p[i] = r.a; }); setPick(p); setChk(true); }}>${ar ? 'اعرض الإجابات' : 'Show the answers'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  // "Be the tester": a problem worked one step at a time; every wrong option is a real slip and says which (after hf-ms-4's drill)
  function Steps({ id, data }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id + ':p', 0);
    const [prog, setProg] = H.K.useSlot(id + ':k', {});
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = data[p], n = P.steps.length, k = Math.min(prog[p] || 0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = x => { setBad(null); setProg(Object.assign({}, prog, { [p]: x })); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    return html`<div className="hf-msF-sd hf-in">
      ${data.length > 1 && html`<div className="hf-msF-tabs" role="group">${data.map((d, j) => html`<button key=${j} className=${(prog[j] || 0) >= d.steps.length ? 'dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? d.tab[1] : d.tab[0]}</button>`)}</div>`}
      <p className="hf-msF-ask">${TF(ar ? P.ar : P.en)}</p>
      <div className="hf-msF-work">${P.steps.slice(0, k).map((s, j) => html`<div key=${p + '-' + j}>${s.w}</div>`)}${!done && html`<div className="cur">${st.l[0]}</div>`}</div>
      ${done ? html`<p className="hf-msF-ok">${TF(ar ? '<b>خلصت!</b> ' + P.res[1] : '<b>Done!</b> ' + P.res[0])}</p>`
        : html`<p className="hf-msF-q">${TF(ar ? st.l[1] : st.l[0])}</p><div className="hf-msF-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} className=${Array.isArray(o) && ar ? 'a' : ''} onClick=${() => pick(j)}>${Array.isArray(o) ? (ar ? o[1] : o[0]) : o}</button>`)}</div>`}
      ${bad && html`<p className="hf-msF-bad">${TF(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-msF-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'اعرض الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'اعرض الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div></div>`;
  }

  // runs up and down: tap the box under each number for the sign to the next one (+ larger, − smaller), then count the runs
  function Signs({ id, nums }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const ans = nums.slice(1).map((x, i) => x > nums[i] ? '+' : '−');
    let runs = 1; for (let i = 1; i < ans.length; i++) if (ans[i] !== ans[i - 1]) runs++;
    const right = ans.filter((s, i) => v[i] === s).length;
    const aOk = num(v.a) === runs, all = right === ans.length && aOk;
    const cyc = i => { const cur = v[i]; setV(Object.assign({}, v, { [i]: cur === '+' ? '−' : cur === '−' ? undefined : '+' })); setChk(false); };
    const groups = []; ans.forEach((s, i) => { if (!i || s !== ans[i - 1]) groups.push(s); else groups[groups.length - 1] += s; });
    return html`<div className="hf-msF-sg hf-in">
      <div className="nums">${nums.map((x, i) => html`<div key=${i} className="c"><span>${String(x.toFixed(2)).replace(/^0/, '')}</span>
        ${i < nums.length - 1 ? html`<button className=${(v[i] === '+' ? 'p' : v[i] === '−' ? 'm' : '') + (chk && v[i] ? (v[i] === ans[i] ? ' ok' : ' no') : '')} aria-label=${'sign from number ' + (i + 1) + ' to ' + (i + 2)} onClick=${() => cyc(i)}>${v[i] || '·'}</button>` : html`<i></i>`}</div>`)}</div>
      <div className="hf-msF-x"><div className=${'r' + (chk && v.a ? (aOk ? ' ok' : ' no') : '')}><span className="lb">${ar ? html`عدد الـ runs <bdi dir="ltr">a</bdi> =` : html`Number of runs <code>a</code> =`}</span>
        <input inputMode="numeric" dir="ltr" value=${v.a || ''} aria-label="number of runs" onChange=${e => { setV(Object.assign({}, v, { a: e.target.value })); setChk(false); }} />
        <span className="mk">${chk && v.a ? (aOk ? '✓' : '✗') : ''}</span></div></div>
      <${Btns} ar=${ar} dis=${!Object.keys(v).length} onCheck=${() => setChk(true)} onShow=${() => { const o = { a: String(runs) }; ans.forEach((s, i) => { o[i] = s; }); setV(o); setChk(true); }} score=${chk ? right + ' / ' + ans.length + (aOk ? ' + a' : '') : null} />
      ${chk && all && html`<p className="hf-msF-runs">${groups.map(g => '|' + g).join('') + '|'}  a = ${runs}</p>`}
    </div>`;
  }

  // be the warehouse: a weekly (M-style) inventory run week by week. Each week: read the demand, then decide whether to order.
  function InvStep({ id, d }) {
    const ar = useAr();
    const cum = ps => { let s = 0; return ps.map(p => +(s += p).toFixed(4)); };
    const dc = cum(d.dp), lc = cum(d.lp), look = (c, R) => c.findIndex(x => R < x);
    const rows = []; { let I = d.I0, due = null, li = 0; d.dRN.forEach((R, k) => { const w = k + 1; let rec = 0; if (due === w) { I += d.Q; rec = d.Q; due = null; } const beg = I, dem = d.dv[look(dc, R)]; let sh = 0; if (I >= dem) I -= dem; else { sh = dem - I; I = 0; }
      let L = 0, lr = null; if (I <= d.r && due === null) { lr = d.lRN[li++]; L = d.lv[look(lc, lr)]; due = w + L; } rows.push({ w, rec, beg, R, dem, end: I, sh, L, lr }); }); }
    const [k0, setK0] = H.K.useSlot(id + ':k', 0);   // weeks done
    const [s0, setS0] = H.K.useSlot(id + ':s', 0);   // step inside the week: 0 demand, 1 order?, 2 lead time
    const [bad, setBad] = useState(null);
    const k = Math.min(k0, rows.length), done = k >= rows.length, cur = done ? null : rows[k];
    const next = () => { setBad(null); if (s0 === 0) setS0(1); else if (s0 === 1 && cur.L) setS0(2); else { setS0(0); setK0(k + 1); } };
    const pickD = x => { if (x === cur.dem) next(); else setBad(ar ? 'بص تاني على الفترات: الرقم ' + cur.R + ' بيقع في فترة الطلب ' + cur.dem + ' (الطرف الصغير داخل).' : 'Look again: ' + cur.R + ' falls in the interval of demand ' + cur.dem + ' (lower end included).'); };
    const pickO = yes => { if (yes === !!cur.L) next(); else setBad(cur.L ? (ar ? 'المخزون في الآخر ' + cur.end + ' وده ≤ ' + d.r + ' ومفيش طلبية مستنية: لازم تطلب.' : 'Ending inventory ' + cur.end + ' ≤ ' + d.r + ' and no order is outstanding: you must order.') : (cur.end <= d.r ? (ar ? 'فيه طلبية لسه موصلتش: مينفعش طلبيتين في نفس الوقت.' : 'An order is still outstanding: never two orders at once.') : (ar ? 'المخزون ' + cur.end + ' أكبر من الـ reorder point ' + d.r + '.' : 'Inventory ' + cur.end + ' is above the reorder point ' + d.r + '.'))); };
    const pickL = x => { if (x === cur.L) next(); else setBad(ar ? 'رقم الـ lead time ' + cur.lr + ' بيدّي ' + cur.L + '.' : 'Lead-time RN ' + cur.lr + ' gives L = ' + cur.L + '.'); };
    const shown = rows.slice(0, done ? rows.length : k + 1);
    const holdU = rows.reduce((a, r) => a + r.end, 0), nOrd = rows.filter(r => r.L).length, nSh = rows.reduce((a, r) => a + r.sh, 0);
    const btn = (lab, f, key) => html`<button key=${key} className=${isAr(lab) ? 'a' : ''} onClick=${f}>${lab}</button>`;
    return html`<div className="hf-msF-iv hf-in">
      <div dir="ltr"><table><colgroup><col style=${{ width: '30px' }} /><col /><col /><col style=${{ width: '52px' }} /><col /><col /><col /><col /></colgroup>
        <thead><tr><th>Wk</th><th>Rec</th><th>Beg</th><th>RN</th><th>D</th><th>End</th><th>Short</th><th>Order</th></tr></thead>
        <tbody>${shown.map((r, i) => { const live = !done && i === k; const sd = !live || s0 > 0, so = !live;
          return html`<tr key=${i} className=${live ? 'cur' : ''}><td>${r.w}</td><td>${r.rec || ''}</td><td>${r.beg}</td><td>${String(r.R).replace(/^0/, '')}</td>
            <td className=${sd ? '' : 'q'}>${sd ? r.dem : '?'}</td><td>${sd ? r.end : ''}</td><td className=${sd && r.sh ? 'sh' : ''}>${sd && r.sh ? r.sh : ''}</td>
            <td className=${so && r.L ? 'od' : live ? 'q' : ''}>${so ? (r.L ? 'L=' + r.L : '') : (s0 > 0 ? '?' : '')}</td></tr>`; })}</tbody></table></div>
      ${done ? html`<p className="tot">Holding ${d.h} × ${holdU} = ${d.h * holdU}  Orders ${nOrd} × ${d.oc} = ${nOrd * d.oc}<br/>Shortage ${nSh} × ${d.sc} = ${nSh * d.sc}  Total = $${d.h * holdU + nOrd * d.oc + nSh * d.sc}</p>`
        : html`<p className="hf-msF-q">${s0 === 0 ? (ar ? html`أسبوع ${cur.w}: الرقم <bdi dir="ltr">${cur.R}</bdi> معناه طلب كام؟` : html`Week ${cur.w}: RN ${cur.R} means a demand of?`)
            : s0 === 1 ? (ar ? html`الأسبوع خلص بـ ${cur.end}. تطلب طلبية؟` : html`Week ends with ${cur.end}. Place an order?`)
            : (ar ? html`رقم الـ lead time <bdi dir="ltr">${cur.lr}</bdi> معناه كام أسبوع؟` : html`Lead-time RN ${cur.lr}: L = ?`)}</p>
          <div className="hf-msF-opts" dir="ltr">${s0 === 0 ? d.dv.map((x, j) => btn(String(x), () => pickD(x), j)) : s0 === 1 ? [btn(ar ? 'لأ' : 'No', () => pickO(false), 'n'), btn(ar ? 'أيوه' : 'Yes', () => pickO(true), 'y')] : d.lv.map((x, j) => btn(String(x), () => pickL(x), j))}</div>`}
      ${bad && html`<p className="hf-msF-bad">${bad}</p>`}
      <div className="hf-msF-row">
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setS0(0); setK0(k + 1); }}>${ar ? 'اعرض الأسبوع ده' : 'Show this week'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setS0(0); setK0(rows.length); }}>${ar ? 'اعرض الكل' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => { setBad(null); setS0(0); setK0(0); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div></div>`;
  }

  // autocorrelation drills: the Final 2024/25 Q2-b numbers and our own (checked with node)
  const B_ = s => '<bdi dir="ltr">' + s + '</bdi>';
  const AUTO = [
    { tab: ['Final 2024/25 Q2-b', 'Final 2024/25'], en: 'The 3rd, 8th, 13th, … of the 30 numbers, α = 0.01.', ar: 'الرقم التالت والتامن والـ 13 و… من الـ 30 رقم، و' + B_('α = 0.01') + '.',
      steps: [
        { l: ['i and m?', 'الـ i والـ m كام؟'], o: ['i = 3, m = 5', 'i = 3, m = 8', 'i = 5, m = 3'], a: 0, w: 'start i = 3, lag m = 5',
          h: [null, ['8 is the second number tested, not the lag: 8 − 3 = 5.', 'الـ 8 دي تاني رقم بنختبره، مش الـ lag: ' + B_('8 − 3 = 5') + '.'], ['Swapped: i is where you start (3), m the gap (5).', 'إنت قلبتهم: الـ i هي البداية (3) والـ m المسافة (5).']] },
        { l: ['M? (largest with i + (M+1)m ≤ N)', 'الـ M كام؟ (أكبر رقم يحقق ' + B_('i + (M+1)m ≤ N') + ')'], o: ['4', '5', '6'], a: 0, w: '3 + 5(M + 1) ≤ 30 → M = 4',
          h: [null, ['M = 5 gives 3 + 6·5 = 33 > 30.', 'الـ ' + B_('M = 5') + ' بتدّي ' + B_('3 + 6·5 = 33') + '، أكبر من 30.'], ['M = 6 runs past N = 30.', 'الـ ' + B_('M = 6') + ' بتعدّي الـ 30.']] },
        { l: ['Σ of the products of neighbours?', 'مجموع حواصل ضرب الجيران كام؟'], o: ['0.2774', '1.52', '0.0644'], a: 0, w: '.23 .28 .33 .27 .05 .36 → Σ RR = 0.2774',
          h: [null, ['1.52 adds the six numbers: multiply neighbours, then add.', 'الـ 1.52 دي مجموع الـ 6 أرقام نفسهم: اضرب كل اتنين جنب بعض وبعدين اجمع.'], ['0.0644 is only the first product (0.23 × 0.28).', 'الـ 0.0644 دي أول حاصل ضرب بس ' + B_('(0.23 × 0.28)') + '.']] },
        { l: ['ρ̂ = Σ/(M + 1) − 0.25?', 'الـ ρ̂ كام؟'], o: ['−0.1945', '0.0555', '−0.1807'], a: 0, w: 'ρ̂ = 0.2774/5 − 0.25 = −0.1945',
          h: [null, ['0.0555 forgets the − 0.25.', 'الـ 0.0555 ناسية الـ ' + B_('− 0.25') + '.'], ['−0.1807 divides by M = 4 instead of M + 1 = 5.', 'الـ ' + B_('−0.1807') + ' قسمت على 4 بدل ' + B_('M + 1 = 5') + '.']] },
        { l: ['σ̂ = √(13M + 7)/[12(M + 1)]?', 'الـ σ̂ كام؟'], o: ['0.1280', '0.1536', '0.0128'], a: 0, w: 'σ̂ = √59/60 = 0.1280',
          h: [null, ['0.1536 = √59/50: the bottom is 12(M + 1) = 60.', 'الـ 0.1536 دي ' + B_('√59/50') + '، والمقام ' + B_('12(M+1) = 60') + '.'], ['0.0128 slips a decimal place.', 'الـ 0.0128 فيها العلامة العشرية متزحزحة.']] },
        { l: ['Z₀ = ρ̂/σ̂?', 'الـ Z₀ كام؟'], o: ['−1.52', '−15.2', '1.52'], a: 0, w: 'Z₀ = −0.1945/0.1280 = −1.52',
          h: [null, ['That divides by 0.0128.', 'ده قسم على 0.0128.'], ['ρ̂ is negative, so Z₀ is negative.', 'الـ ρ̂ سالبة، فالـ Z₀ سالب.']] },
        { l: ['z(α/2) for α = 0.01?', 'الـ ' + B_('z(α/2)') + ' عند ' + B_('α = 0.01') + ' كام؟'], o: ['2.576', '1.30', '1.96'], a: 0, w: 'z0.005 = 2.576 (not the hint)',
          h: [null, ['1.30 is the paper\'s misprint: z0.01 = 2.326, and two-sided needs z0.005.', 'الـ 1.30 غلطة مطبعية في الورقة: ' + B_('z0.01 = 2.326') + '، والطرفين محتاجين z0.005.'], ['1.96 is for α = 0.05.', 'الـ 1.96 دي لـ ' + B_('α = 0.05') + '.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: [['do not reject H₀', 'منرفضش H₀'], ['reject H₀', 'نرفض H₀']], a: 0, w: '|−1.52| ≤ 2.576 → do not reject',
          h: [null, ['−1.52 is inside ±2.576.', 'الـ ' + B_('−1.52') + ' جوه الـ ' + B_('±2.576') + '.']] }],
      res: ['Z₀ = −1.52 is inside ±2.576: <b>independence is not rejected</b>.', 'الـ ' + B_('Z₀ = −1.52') + ' جوه الـ ' + B_('±2.576') + '، يعني <b>مش بنرفض الـ independence</b>.'] },
    { tab: ['Ours: i = 2, m = 4', 'من عندنا'], en: 'Ours: the 2nd, 6th, 10th, … of the same 30 numbers, α = 0.05.', ar: 'من عندنا: الرقم التاني والسادس والعاشر و… من نفس الـ 30 رقم، و' + B_('α = 0.05') + '.',
      steps: [
        { l: ['M? (largest with i + (M+1)m ≤ N)', 'الـ M كام؟'], o: ['6', '7', '5'], a: 0, w: '2 + 4(M + 1) ≤ 30 → M = 6',
          h: [null, ['M = 7 gives 2 + 8·4 = 34 > 30.', 'الـ ' + B_('M = 7') + ' بتدّي ' + B_('2 + 8·4 = 34') + '، أكبر من 30.'], ['Not the largest: M = 6 still fits (2 + 7·4 = 30).', 'مش أكبر واحد: الـ ' + B_('M = 6') + ' لسه بتنفع ' + B_('(2 + 7·4 = 30)') + '.']] },
        { l: ['Σ of the products of neighbours?', 'مجموع حواصل ضرب الجيران كام؟'], o: ['1.6325', '3.81', '0.2883'], a: 0, w: '.01 .31 .93 .35 .27 .49 .58 .87 → Σ RR = 1.6325',
          h: [null, ['3.81 adds the eight numbers.', 'الـ 3.81 دي مجموع الـ 8 أرقام نفسهم.'], ['0.2883 is one product (0.31 × 0.93).', 'الـ 0.2883 حاصل ضرب واحد بس ' + B_('(0.31 × 0.93)') + '.']] },
        { l: ['ρ̂ = Σ/(M + 1) − 0.25?', 'الـ ρ̂ كام؟'], o: ['−0.0168', '0.2332', '0.0221'], a: 0, w: 'ρ̂ = 1.6325/7 − 0.25 = −0.0168',
          h: [null, ['0.2332 forgets the − 0.25.', 'الـ 0.2332 ناسية الـ ' + B_('− 0.25') + '.'], ['0.0221 divides by M = 6 instead of 7.', 'الـ 0.0221 قسمت على 6 بدل 7.']] },
        { l: ['σ̂ = √(13M + 7)/[12(M + 1)]?', 'الـ σ̂ كام؟'], o: ['0.1098', '0.1281', '0.0110'], a: 0, w: 'σ̂ = √85/84 = 0.1098',
          h: [null, ['0.1281 = √85/72: the bottom is 12(M + 1) = 84.', 'الـ 0.1281 دي ' + B_('√85/72') + '، والمقام ' + B_('12(M+1) = 84') + '.'], ['0.0110 slips a decimal place.', 'الـ 0.0110 فيها العلامة العشرية متزحزحة.']] },
        { l: ['Z₀ = ρ̂/σ̂?', 'الـ Z₀ كام؟'], o: ['−0.15', '−1.53', '0.15'], a: 0, w: 'Z₀ = −0.0168/0.1098 = −0.15',
          h: [null, ['That divides by 0.0110.', 'ده قسم على 0.0110.'], ['ρ̂ is negative, so Z₀ is negative.', 'الـ ρ̂ سالبة، فالـ Z₀ سالب.']] },
        { l: ['Decision at α = 0.05?', 'القرار عند ' + B_('α = 0.05') + '؟'], o: [['do not reject H₀', 'منرفضش H₀'], ['reject H₀', 'نرفض H₀']], a: 0, w: '|−0.15| ≤ 1.96 → do not reject',
          h: [null, ['−0.15 is well inside ±1.96.', 'الـ ' + B_('−0.15') + ' جوه الـ ' + B_('±1.96') + ' بكتير.']] }],
      res: ['Z₀ = −0.15: not rejected. A tiny ρ̂ is just noise.', 'الـ ' + B_('Z₀ = −0.15') + ': مش مرفوضة، والـ ρ̂ الصغيرة دي مجرد noise.'] }
  ];
  const R30 = [0.12, 0.01, 0.23, 0.28, 0.89, 0.31, 0.64, 0.28, 0.83, 0.93, 0.99, 0.15, 0.33, 0.35, 0.91, 0.41, 0.60, 0.27, 0.75, 0.88, 0.68, 0.49, 0.05, 0.43, 0.95, 0.58, 0.19, 0.36, 0.69, 0.87];
  const R25 = [0.41, 0.68, 0.89, 0.94, 0.74, 0.91, 0.55, 0.62, 0.36, 0.27, 0.19, 0.72, 0.75, 0.08, 0.54, 0.02, 0.01, 0.36, 0.16, 0.28, 0.18, 0.01, 0.95, 0.69, 0.18];
  const INV_P = { dp: [0.10, 0.30, 0.20, 0.30, 0.05, 0.05], dv: [0, 1, 2, 3, 4, 5], lp: [0.20, 0.15, 0.60, 0.05], lv: [1, 2, 3, 4], h: 5, oc: 200, sc: 20 };
  const INV_A = Object.assign({ I0: 10, Q: 15, r: 5, dRN: [0.356, 0.132, 0.185, 0.946, 0.921, 0.438, 0.941, 0.938, 0.382, 0.611], lRN: [0.248, 0.116, 0.893, 0.231, 0.619] }, INV_P);
  const INV_B = Object.assign({ I0: 8, Q: 10, r: 4, dRN: [0.72, 0.45, 0.93, 0.08, 0.61, 0.39], lRN: [0.41, 0.17] }, INV_P);

  H.chapters.ms.final = {
    title: 'Simulate Your Final Before It Happens', kicker: 'Final revision', run: 'final revision',
    ar: { title: 'اعمل simulation للامتحان قبل ما ييجي', kicker: 'المراجعة النهائية', run: 'المراجعة النهائية' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const B = s => '<bdi dir="ltr">' + s + '</bdi>';
      const L = s => '<span class="ltr">' + s + '</span>';
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' questions can come from any lecture: quiz items with src, Arabic why from AR.ms.lectures[n].quiz[i]
      const ARL = (window.AR && window.AR.ms && window.AR.ms.lectures) || {};
      const ALL = []; (kit.course.lectures || []).forEach(l => (l.quiz || []).forEach((q, i) => ALL.push({ n: l.n, i, q })));
      const find = (re, sre, doc) => ALL.find(x => (doc ? !!x.q.src : !x.q.src) && re.test(strip(x.q.q)) && (!sre || sre.test(x.q.src || '')));
      const mq = (id, re, sre) => { const r = find(re, sre, true); return r ? html`<${MCQ} id=${id} q=${r.q} why=${((ARL[r.n] || {}).quiz || [])[r.i]} />` : null; };
      const pq = (id, re) => { const r = find(re, null, false); return r ? html`<${MCQ} id=${id} q=${r.q} why=${((ARL[r.n] || {}).quiz || [])[r.i]} />` : null; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const cards = (items, one) => html`<div className=${'hf-msF-cards hf-in' + (one ? ' one' : '')}>${items.map(([h, b, w], i) => html`<div key=${i} className=${'hf-msF-card' + (w ? ' w' : '')}><b>${T(h)}</b><span>${T(b)}</span></div>`)}</div>`;
      const kv = rows => html`<div className="hf-msF-kv hf-in">${rows.map(([k, v, f], i) => html`<${React.Fragment} key=${i}><span className="k">${T(k)}</span><span className=${f ? 'f' : ''}>${T(v)}</span></${React.Fragment}>`)}</div>`;
      const tb = (head, rows, cls, mcols) => html`<table className=${'hf-msF-tb hf-in' + (cls ? ' ' + cls : '')}><thead><tr>${head.map((h, i) => html`<th key=${i} className=${mcols && mcols.includes(i) && !isAr(h) ? 'm' : ''}>${T(h)}</th>`)}</tr></thead>
        <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => html`<td key=${j} className=${mcols && mcols.includes(j) ? 'm' : ''}>${T(String(c))}</td>`)}</tr>`)}</tbody></table>`;
      const OL = items => html`<ol className="hf-msF-ol hf-in">${items.map((x, i) => html`<li key=${i}><span>${T(x)}</span></li>`)}</ol>`;
      const lecSec = (n, en, ar) => t('Lecture ' + n + ' · ' + en, 'المحاضرة ' + n + ' · ' + ar);
      return [
        // 0 · how to use this book, and how ready am I
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تستخدم الكتاب ده')}</${H2}>
          ${OL(A ? ['<b>قيّم نفسك</b> تحت وهتعرف تبدأ منين.', '<b>اقرا كل محاضرة بسرعة</b>: اللي لازم تعرفه، وأحسن figure، وأخطر فخ، وسؤال سريع.', '<b>حل المسايل اللي بتيجي كل سنة</b> بالقلم: من الورق الأول، وبعدين نسخة من عندنا.', '<b>اختم</b> بأسئلة الدكاترة ويوم الامتحان.']
            : ['<b>Rate yourself</b> below: it tells you where to start.', '<b>Read each lecture fast</b>: must-know, its best figure, its worst trap, a quick check.', '<b>Do the problems that always come up</b> with a pencil: the paper\'s first, then ours.', '<b>Finish</b> with the doctors\' questions and exam day.'])}
          <${H3}>${t('How ready am I?', 'أنا جاهز قد إيه؟')}</${H3}>
          <${Ready} lecs=${[[1, 'Introduction', 'المقدمة'], [2, 'Queues & inventory', 'الـ queues والـ inventory'], [3, 'Statistical models', 'الـ statistical models'], [4, 'Random numbers', 'الـ random numbers'], [5, 'Random variates', 'الـ random variates'], [6, 'Input modeling', 'الـ input modeling'], [7, 'Verification & validation', 'الـ V&V'], [8, 'Case studies', 'الـ case studies']]} />
        `, { sec: t('How to use this book', 'إزاي تستخدم الكتاب ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">★</span><span className="t">${A ? html`المراجعة النهائية<br/>Modeling & Simulation` : html`Final revision<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Simulate Your Final Before It Happens', 'اعمل simulation للامتحان قبل ما ييجي')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('all 8 lectures, built on the two past finals', 'الـ 8 محاضرات كلهم، مبنيين على الـ 2 finals اللي فاتوا')}</p></div>
          <${Talk} who="dev">${X('Eight lectures, two hours, sixty marks. Where do I even start?', 'تمن محاضرات، وساعتين، وستين درجة. أبدأ منين أصلًا؟')}</${Talk}>
          <${Talk} who="clock" flip=${true}>${X('Where every simulation starts: at time zero, with an <b>event list</b>. I\'ll advance you event by event: the map, the paper, each lecture, then the problems that always come up.', 'من حيث ما أي simulation بتبدأ: من الزمن صفر ومعاها <b>event list</b>. هنقدّم حدث ورا حدث: الخريطة، والورقة، وكل محاضرة، وبعدين المسايل اللي بتيجي كل سنة.')}</${Talk}>
          <${P} small=${true}>${X('Every number in a worked problem was recomputed. ‡ marks a slip in the slides or a paper; "ours" marks our own advice.', 'كل رقم في المسايل المحلولة اتحسب تاني. وعلامة ‡ معناها غلطة في السلايدز أو الورقة، و"من عندنا" معناها نصيحة مننا.')}</${P}>
        `, { sec: t('Opener', 'البداية') }),

        // 2 · the big picture: the course map
        page(html`
          <${H2}>${t('The big picture: one line, eight stops', 'الصورة الكبيرة: خط واحد وتمن محطات')}</${H2}>
          <${CourseMap} stops=${[
            { n: 1, en: ['Introduction', 'MCQ, T/F: systems, models, 12 steps, tools'], ar: ['المقدمة', 'اختياري وصح وغلط: الـ system والـ models والـ 12 خطوة'] },
            { n: 2, en: ['Queues & inventory', 'Fill queue, inventory, newspaper tables'], ar: ['الـ queues والـ inventory', 'تملا جدول queue وتشغّل أيام مخزون وجرايد'] },
            { n: 3, en: ['Statistical models', 'pmf, cdf, mean, variance, the families'], ar: ['الـ statistical models', 'الـ pmf والـ cdf والـ mean والـ variance والتوزيعات'] },
            { n: 4, en: ['Random numbers', 'LCG and period; KS, χ², runs, autocorr.'], ar: ['الـ random numbers', 'تشغّل LCG وتطلّع الـ period، وتعمل الاختبارات'] },
            { n: 5, en: ['Random variates', 'Turn R into X: inverse transform, lookup'], ar: ['الـ random variates', 'تحوّل R لـ X بالـ inverse transform والـ lookup'] },
            { n: 6, en: ['Input modeling', 'Pick a family, estimate, test the fit'], ar: ['الـ input modeling', 'تختار distribution وتقدّر الـ parameters وتختبر الـ fit'] },
            { n: 7, en: ['Verification & validation', 'Model right vs right model; trace'], ar: ['الـ verification والـ validation', 'الـ model صح قصاد الـ model الصح، والـ trace'] },
            { n: 8, en: ['Case studies', 'Gift shop, cake shop, inventory, pursuit'], ar: ['الـ case studies', 'الـ gift shop والـ cake shop والمخزون والـ pursuit'] }]} />
        `, { sec: t('The big picture', 'الصورة الكبيرة') }),

        // 3 · how the ideas connect
        page(html`
          <${H2}>${t('How the ideas connect', 'الأفكار بتتوصّل ببعض إزاي')}</${H2}>
          <${Flow} />
          <${P} small=${true}>${X('Read it like one simulation run: <b>random numbers</b> (L4) become <b>values</b> of a distribution (L5); which distribution comes from the data (L6) and the families of L3; those values drive the <b>tables</b> you fill by hand (L2, L8); L7 checks the model is built right and is the right one.',
            'اقراها كأنها run واحد: الـ <b>random numbers</b> (المحاضرة 4) بتتحول لـ <b>قيم</b> من distribution (المحاضرة 5)، وأنهي distribution بتيجي من الداتا (المحاضرة 6) ومن عيلات المحاضرة 3، والقيم دي بتشغّل <b>الجداول</b> اللي بتملاها بإيدك (2 و8)، والمحاضرة 7 بتتأكد إن الـ model متبني صح وإنه الـ model الصح.')}</${P}>
          <${Hand}>${t('Lecture 1 is the frame: its 12 steps contain all of it.', 'المحاضرة 1 هي البرواز اللي شايل الكل.')}</${Hand}>
        `),

        // 4 · anatomy of the final
        page(html`
          <${H2}>${t('Anatomy of the final', 'تشريح الـ final')}</${H2}>
          <${P} small=${true}>${X('Both past finals (2025/26 and 2024/25) have the same skeleton: <b>2 hours, 60 marks</b>, four parts.', 'الـ 2 finals اللي فاتوا (' + B('2025/26') + ' و' + B('2024/25') + ') ليهم نفس الهيكل: <b>ساعتين و60 درجة</b>، وأربع أجزاء.')}</${P}>
          ${tb(A ? ['الجزء', 'فيه إيه', 'الدرجة'] : ['Part', 'What', 'Marks'], A ? [
            [B('Q1-a'), '10 أسئلة اختياري، كل واحد بدرجة (أغلبها من المحاضرة 1، وبعدها 3 و6)', '10'],
            [B('Q1-b'), '10 صح وغلط (أغلبها من المحاضرة 1)', '10'],
            [B('Q2'), 'الـ random numbers: (a) تسلسل LCG والـ period، (b) اختبار independence', '20'],
            [B('Q3'), '(a) مسألة احتمالات أو تقدير (3 و6)، (b) جدول simulation (cake shop أو مخزون)', '20']]
            : [['Q1-a', '10 MCQs, 1 mark each (mostly L1, then L3, L6)', '10'], ['Q1-b', '10 True/False (mostly L1)', '10'], ['Q2', 'Random numbers (L4): (a) LCG sequences and period, (b) an independence test', '20'], ['Q3', '(a) a probability or estimation problem (L3, L6), (b) a simulation table (cake shop or inventory)', '20']], '', [0, 2])}
          <${Grow} />
          <${Hand}>${t('No midterm paper for this course on the site; the revision sheets (L1 T/F, Ch3 MCQ, the general sheet) are the doctors\' too.', 'مفيش ورقة midterm للمادة دي على الموقع، والـ revision sheets (صح وغلط المحاضرة 1، واختياري الـ Ch3، والشيت العام) برضه من الدكاترة.')}</${Hand}>
        `, { sec: t('Anatomy of the final', 'تشريح الـ final') }),

        // 4b · what repeats
        page(html`
          <${H2}>${t('What repeats every year', 'إيه اللي بيتكرر كل سنة')}</${H2}>
          <${UL} items=${A ? ['سؤال 2-a: <b>LCG</b> بـ ' + B('m = 64') + '، تسلسلين من 5 أرقام والـ period بتاعهم.', 'سؤال 2-b: اختبار على <b>نفس الـ 30 رقم</b> (بتوع سلايد 51): الـ runs في ' + B('2025/26') + ' والـ autocorrelation في ' + B('2024/25') + '، وبنفس الـ hint الغلط ' + B('Z0.01 = 1.30') + '.', 'سؤال 3-a: احتمالات من المحاضرة 3 (الـ Poisson أو الـ geometric)، و' + B('2024/25') + ' زوّدت تقدير lognormal.', 'سؤال 3-b: جدول case study بـ 10 لـ 15 درجة.', 'حوالي تلتين الـ 20 سؤال من المحاضرة 1، والـ GPSS/H جت في الورقتين.']
            : ['Q2-a: an <b>LCG</b> with <b>m = 64</b>, two sequences of 5 numbers and their periods.', 'Q2-b: a test on the <b>same 30 numbers</b> (slide 51\'s): runs (2025/26), autocorrelation (2024/25), with the same <b>wrong hint</b> Z0.01 = 1.30.', 'Q3-a: a Lecture 3 probability (Poisson or geometric); 2024/25 adds a lognormal estimate.', 'Q3-b: a case-study table worth 10 to 15 marks.', 'About 2/3 of the 20 Q1 items are Lecture 1; GPSS/H was in both papers.']} />
          <${Grow} />
          <${Talk} who="dice">${X('Same 30 numbers twice in a row. Learn the method, not just the answers.', 'نفس الـ 30 رقم مرتين ورا بعض. اتعلم الطريقة، مش الإجابات بس.')}</${Talk}>
        `),

        // 5 · the hot list
        page(html`
          <${H2}>${t('The hot list', 'المواضيع اللي بتتسأل أكتر')}</${H2}>
          <${P} small=${true}>${X('Marks per topic over <b>both finals</b> (120 in all). Dots: how many of the two papers asked it.', 'الدرجات لكل موضوع في <b>الـ 2 finals</b> مع بعض (120 درجة). والنقط: كام ورقة سألت فيه.')}</${P}>
          <${Hot} rows=${[
            ['Lecture 1 concepts (MCQ and T/F) <small>L1</small>', 'مفاهيم المحاضرة 1 <small>L1</small>', 27, 2],
            ['LCG sequences and period <small>L4</small>', 'تسلسل الـ LCG والـ period <small>L4</small>', 20, 2],
            ['Runs or autocorrelation test <small>L4</small>', 'اختبار الـ runs أو الـ autocorrelation <small>L4</small>', 20, 2],
            ['Cake shop with goodwill <small>L8</small>', 'الـ cake shop بالـ goodwill <small>L8</small>', 15, 1],
            ['Poisson or geometric problem <small>L3</small>', 'مسألة Poisson أو geometric <small>L3</small>', 10, 2],
            ['Weekly inventory table <small>L2 · L8</small>', 'جدول المخزون الأسبوعي <small>L2 · L8</small>', 10, 1],
            ['Distribution MCQ and T/F <small>L3</small>', 'اختياري وصح وغلط على التوزيعات <small>L3</small>', 6, 2],
            ['Lognormal estimate <small>L6</small>', 'تقدير الـ lognormal <small>L6</small>', 5, 1],
            ['Input-modeling MCQ <small>L6</small>', 'اختياري الـ input modeling <small>L6</small>', 4, 2],
            ['One-mark items <small>L2 · L4 · L5</small>', 'أسئلة بدرجة واحدة <small>L2 · L4 · L5</small>', 3, 2],
            ['Verification and validation <small>L7</small>', 'الـ verification والـ validation <small>L7</small>', 0, 0]]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Lecture 4 alone is 41 of the 120 marks. Lecture 7 has never been asked: read its pages once anyway.', 'المحاضرة 4 لوحدها 41 درجة من 120. والمحاضرة 7 عمرها ما اتسألت، بس اقراها مرة.')}</${Hand}>
        `),

        // 6 · L1 must-know (1): what simulation is, and when
        page(html`
          <${H2}>${t('Lecture 1 · what simulation is, and when', 'المحاضرة 1 · يعني إيه simulation وإمتى')}</${H2}>
          ${cards(A ? [
            ['3 طرق للتقييم', 'الـ <b>Measurements</b> على نسخة موجودة، والـ <b>Analysis</b> بـ formulas رياضية وبينفع مع البسيط بس، والـ <b>Simulation</b> برنامج بينفّذ model، وعيبها الـ GIGO.', 1],
            ['الـ Simulation', 'تقليد لشغل system حقيقي <b>على مدار الوقت</b>: تعمل <b>artificial history</b> وتطلّع منه استنتاجات.'],
            ['مش مناسبة لما', 'الـ common sense أو الرياضة تحلها، أو التجربة أسهل، أو التكلفة أكبر، أو مفيش وقت، أو <b>مفيش input data</b>، أو مينفعش verify أو validate.'],
            ['المميزات', 'تجرّب policies من غير ما تعطّل الـ system، وتختبر designs من غير ما تصرف، و<b>تضغط أو تمط الوقت</b>، والـ bottlenecks، و"what if".'],
            ['العيوب', 'بناء الـ model محتاج <b>training</b> (فن)، والنتايج صعب تتفهم، ووقت وفلوس.'],
            ['مجالات التطبيق', 'الـ manufacturing والـ semiconductors والـ military والـ logistics والـ health care والـ networks والـ games. <b>مش</b> الـ food industry.', 1]]
            : [['Three ways to evaluate', '<b>Measurements</b> on an existing instance · <b>Analysis</b>: math formulas, only for simple systems · <b>Simulation</b>: a program implementing a model; its curse is GIGO.', 1],
            ['Simulation', 'imitating a real system\'s operation <b>over time</b>: generate an <b>artificial history</b>, then draw inferences.'],
            ['Not appropriate', 'common sense or maths solves it; a direct experiment is easier; cost &gt; savings; no time; <b>no input data</b>; can\'t verify or validate.'],
            ['Advantages', 'explore policies without disrupting; test designs without committing resources; <b>compress or expand time</b>; bottlenecks; "what if".'],
            ['Disadvantages', 'model building needs <b>training</b> (an art); results are hard to interpret; time and money.'],
            ['Application areas', 'manufacturing, semiconductors, military, logistics, health care, networks, games. <b>Not</b> food industry.', 1]])}
        `, { sec: lecSec(1, 'Introduction', 'المقدمة') }),

        // 7 · L1 must-know (2): systems and models
        page(html`
          <${H2}>${t('Lecture 1 · systems and models', 'المحاضرة 1 · الـ systems والـ models')}</${H2}>
          <${Def}>${X('<b>System</b> = objects joined in regular interaction toward a purpose. <b>Environment</b> = everything outside it that affects it; the boundary depends on the <b>purpose of the study</b>.', 'الـ <b>System</b> هو objects مرتبطة ببعض في تفاعل منتظم عشان هدف. والـ <b>Environment</b> كل حاجة برّاه وبتأثر فيه، والحد بينهم بيعتمد على <b>هدف الدراسة</b>.')}</${Def}>
          ${kv(A ? [
            ['المكوّنات', 'الـ entity (الحاجة نفسها)، والـ attribute (صفة فيها)، والـ activity (فترة زمنية)، والـ state (المتغيرات في أي لحظة)، والـ event (لحظة ممكن تغيّر الـ state)'],
            ['جوه وبرّه', 'الـ <b>endogenous</b> جوه الـ system، والـ <b>exogenous</b> في الـ environment (والـ open system فيه exogenous)'],
            ['النوع', 'الـ discrete بيتغير عند نقط (بنك، router)، والـ continuous بيتغير على طول (مية ورا سد، حرارة)'],
            ['الـ models', 'الـ static (لحظة) قصاد الـ dynamic (على وقت)، والـ deterministic (<b>مفيهوش</b> random variables) قصاد الـ stochastic'],
            ['الشجرة', 'الـ static مع stochastic هو <b>Monte Carlo</b>، والـ dynamic مع stochastic مع discrete هو <b>discrete-event</b>، وبيتعمله run مش solve']]
            : [['Components', 'entity (object) · attribute (its property) · activity (a time period) · state (variables at any time) · event (an instant that may change the state)'],
            ['Inside / out', '<b>endogenous</b> = within the system · <b>exogenous</b> = in the environment (an open system has exogenous activity)'],
            ['Kind', 'discrete: the state changes at points (bank, router) · continuous: water behind a dam, temperature'],
            ['Models', 'static (a point in time) vs dynamic (over time) · deterministic (<b>no</b> random variables) vs stochastic · discrete vs continuous'],
            ['The tree', 'static + stochastic = <b>Monte Carlo</b>; dynamic + stochastic + discrete = <b>discrete-event</b>, "run" rather than "solved"']])}
        `),

        // 8 · L1 must-know (3): metrics, the 12 steps, tools
        page(html`
          <${H2}>${t('Lecture 1 · metrics, steps, tools', 'المحاضرة 1 · الـ metrics والخطوات والأدوات')}</${H2}>
          ${kv(A ? [
            ['الـ metrics', 'لو اتعمل صح: response time و throughput و utilization. لو غلط: احتمال الغلط والوقت بين الأغلاط. لو معرفش (server down): مدة الحدث والوقت بين الأحداث'],
            ['الأوقات', 'الـ reaction من ما الـ user يخلّص طلبه لحد ما الـ system <b>يبدأ execution</b>، والـ response لحد ما <b>يبدأ</b> (أو يخلّص) الرد، والـ think من ما <b>يخلّص</b> الرد لحد الطلب الجاي'],
            ['مثال', 'خلّص 2، بدأ execution 3، رد من 5 لـ 7، الطلب الجاي 12: الـ reaction 1، والـ response 3 أو 5، والـ think 5'],
            ['الـ 12 خطوة', 'أولها الـ problem formulation، والـ verified؟ (لأ ترجع للـ 5)، والـ validated؟ (لأ ترجع للـ 3 و4)، و<b>4 phases</b>، والـ validation أهم خطوة'],
            ['الأدوات (3)', 'الـ general purpose languages زي FORTRAN و PASCAL و MODULA و ADA و C++، والـ simulation languages زي GPSS و SIMSCRIPT و SIMULA و SLAM، والـ packages زي OPNET و NETWORK II.5']]
            : [['Metrics', 'done correctly: response time, throughput, utilization · error: its probability, time between errors · can\'t do (server down): duration, time between events'],
            ['Times', 'reaction = user finishes request → system <b>starts execution</b>; response → system <b>starts</b> (or completes) its response; think = system <b>completes</b> response → next request'],
            ['Example', 'finish 2, execution 3, response 5 to 7, next request 12 → reaction 1, response 3 or 5, think 5'],
            ['12 steps', '1 problem formulation … 6 verified? (no → 5) · 7 validated? (no → 3, 4) · <b>4 phases</b> · validation is the most crucial step'],
            ['3 tools', 'general purpose languages (FORTRAN, PASCAL, MODULA, ADA, C/C++) · simulation languages (GPSS, SIMSCRIPT II.5, SIMULA, SLAM, CSIM) · packages (OPNET, NETWORK II.5, COMNET III, SIMFACTORY)']])}
        `),

        // 9 · L1 figure
        page(html`
          <${H2}>${t('Pick a path down the tree (slide 50)', 'امشي في الشجرة (سلايد 50)')}</${H2}>
          <${Fig} name="ms-taxonomy" />
        `),

        // 10 · L1 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"Special-purpose simulation languages include" → <b>GPSS/H</b> (both papers): the only simulation language beside C++, Visual Basic, Fortran. <b>Modula and ADA</b> are general purpose languages, so "general simulation language" is False (the revision sheet marks it True).',
            'سؤال الـ special-purpose languages إجابته <b>GPSS/H</b> (في الورقتين)، لأنها اللغة الوحيدة للـ simulation وسط الاختيارات. والـ <b>Modula والـ ADA</b> دول general purpose languages، يعني False (مع إن الـ revision sheet معلّمها True).')}</p></${Box}>
          <${H3}>${t('True or false? (from the papers)', 'صح ولا غلط؟ (من الورق)')}</${H3}>
          <${Sort} id="l1tf" bins=${A ? [['صح', 'صح'], ['غلط', 'غلط']] : [['T', 'True'], ['F', 'False']]} items=${A ? [
            ['الـ simulation مش مناسبة لما مفيش input data.', 0], ['بنستخدم الـ simulation لما بناء الـ model يحتاج training.', 1], ['الـ endogenous هي events في الـ environment.', 1],
            ['الـ models اللي مفيهاش random variables اسمها stochastic.', 1], ['الـ Monte Carlo نوعه static و stochastic.', 0], ['الـ think time بيبدأ لما الـ system يبدأ الرد.', 1]]
            : [['Simulation is not appropriate when no input data is available.', 0], ['We use simulation when model building requires training.', 1], ['Endogenous = activities and events in the environment.', 1],
            ['Models without random variables are called stochastic.', 1], ['Monte Carlo simulation is static-stochastic.', 0], ['Think time starts when the system starts its response.', 1]]} />
        `),

        // 11 · L2 must-know (1): the queue table
        page(html`
          <${H2}>${t('Lecture 2 · the queue table', 'المحاضرة 2 · جدول الـ queue')}</${H2}>
          <${Def}>${X('A queueing system is described by its <b>calling population</b>, <b>arrival rate</b>, <b>service mechanism</b>, <b>system capacity</b> and <b>queueing discipline</b>. Notation A/B/c/N/K (M exponential, D constant, Eₖ Erlang, GI general).', 'الـ queueing system بيتوصف بالـ <b>calling population</b> والـ <b>arrival rate</b> والـ <b>service mechanism</b> والـ <b>system capacity</b> والـ <b>queueing discipline</b>. والرموز ' + B('A/B/c/N/K') + ' (الـ M exponential والـ D constant).')}</${Def}>
          <${Code} lines=${[['arr(i) = arr(i−1) + IA(i)', t('first at 0', 'الأول عند 0')], ['begin = max(arr, prev end)'], ['end   = begin + service'], ['wait  = begin − arr'], ['in system = end − arr'], ['idle  = arr − prev end', t('if > 0', 'لو موجب')]]} />
          ${kv(A ? [['الـ w̄', 'مجموع الانتظار ÷ N'], ['الـ p(wait)', 'عدد اللي استنوا ÷ N'], ['الـ p(idle)', 'وقت الـ idle ÷ وقت الـ run'], ['الـ IA̅', 'مجموع الـ IA ÷ <bdi dir="ltr">(N − 1)</bdi>'], ['الـ t̄', 'الوقت في الـ system ÷ N، ويساوي <bdi dir="ltr">w̄ + s̄</bdi>']]
            : [['w̄', 'Σ wait / N'], ['p(wait)', 'number who waited / N'], ['p(idle)', 'idle time / run time'], ['IA̅', 'Σ IA / (N − 1)'], ['t̄', 'Σ time in system / N = w̄ + s̄']])}
        `, { sec: lecSec(2, 'Queues and inventory', 'الـ queues والـ inventory') }),

        // 12 · L2 must-know (2): digits, newspaper, inventory
        page(html`
          <${H2}>${t('Lecture 2 · digits, papers and stock', 'المحاضرة 2 · الأرقام والجرايد والمخزون')}</${H2}>
          ${cards(A ? [
            ['الـ random digits', 'بتتوزع على حسب الـ <b>cumulative</b>: الـ service من 01 لـ 10 يبقى 1، ومن 11 لـ 30 يبقى 2، وهكذا. و20 زبون محتاجين 19 رقم وصول بس.'],
            ['الـ Able و Baker', 'اتنين servers: الـ Able (الأسرع) ياخد العربية لو الاتنين فاضيين، وتقرا أرقام الخدمة من جدول اللي بيخدم.'],
            ['الجرايد', 'تشتري بـ 33¢ وتبيع بـ 50¢ والـ scrap بـ 5¢. الربح = الـ revenue − التكلفة − الـ lost profit (17¢ لكل جرنال ناقص) + الـ salvage.', 1],
            ['المخزون', 'الـ Tc = holding + ordering + shortage. اليوم: استلم → demand → اصرف أو عجز → لو ' + B('I ≤ r') + ' ومفيش طلبية، اطلب.'],
            ['الفترات', 'فترات الـ random numbers <b>بتشمل طرفها الصغير</b>: الـ demand من 0.00 لـ 0.49999 يبقى 0، يعني 0.866 يبقى 2.']]
            : [['Random digits', 'assigned by the <b>cumulative</b> probabilities: service 01–10 → 1, 11–30 → 2, …; 20 customers need only 19 arrival numbers.'],
            ['Able and Baker', 'two servers: Able (faster) takes the car when both are idle; read the service digits of whoever serves.'],
            ['Newspaper', 'buy 33¢, sell 50¢, scrap 5¢. Profit = revenue − cost − lost profit (17¢ per paper demanded but missing) + salvage.', 1],
            ['Inventory', 'Tc = holding + ordering + shortage. A day: receive → demand → ship or short → if I ≤ r and none outstanding, order.'],
            ['Intervals', 'random-number intervals <b>include their lower end</b>: demand 0.00–0.49999 → 0, so 0.866 → 2.']])}
          <${Def}>${X('Example 2.4 (70 papers cost $23.10): demand 60 → 30.00 − 23.10 + 10 × 0.05 = <b>$7.40</b>; demand 90 → 35.00 − 23.10 − 20 × 0.17 = <b>$8.50</b>.', 'مثال 2.4 (70 جرنال تكلفتهم 23.10$): لو الطلب 60' + L('30.00 − 23.10 + 10 × 0.05 = $7.40') + 'ولو الطلب 90' + L('35.00 − 23.10 − 20 × 0.17 = $8.50'))}</${Def}>
        `),

        // 13 · L2 figure
        page(html`
          <${H2}>${t('Arrival and departure: which cells are impossible?', 'الـ arrival والـ departure: أنهي خانة مستحيلة؟')}</${H2}>
          <${Fig} name="ms-event-grids" />
        `),

        // 14 · L2 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Final 2025/26 T/F: "the arrival rate must be less than the service rate to say the system is <b>unstable</b>" → <b>False</b>: arrival &lt; service means <b>stable</b>. And the average time between arrivals divides by <b>N − 1</b>: the first customer arrives at 0.',
            'صح وغلط Final ' + B('2025/26') + ': "الـ arrival rate لازم يبقى أقل من الـ service rate عشان نقول <b>unstable</b>"، والإجابة <b>False</b>: لما الوصول أقل من الخدمة يبقى <b>stable</b>. ومتوسط الوقت بين الوصول بنقسمه على <bdi dir="ltr">N − 1</bdi> لأن أول زبون بيوصل عند 0.')}</p></${Box}>
          <${P} small=${true}>${X('The grocery (slides 15–16): 100 customers, Σ IA 415, Σ service 317, Σ wait 174, Σ in system 491, idle 101, the run ends at 418, 46 waited.', 'البقالة (سلايد 15 و16): 100 زبون، ومجموع الـ IA بـ 415، والخدمة 317، والانتظار 174، والوقت في الـ system بـ 491، والـ idle بـ 101، والـ run بيخلص عند 418، و46 استنوا.')}</${P}>
          <${Pick} id="l2g" rows=${[
            { q: t('w̄, the average wait?', 'الـ w̄ (متوسط الانتظار) كام؟'), o: ['1.74', '3.78', '4.91'], a: 0, w: t('174/100. 3.78 is the wait of those who waited (174/46).', 'هو 174 على 100. والـ 3.78 دي انتظار اللي استنوا بس (174 على 46).') },
            { q: t('p(idle)?', 'الـ p(idle) كام؟'), o: ['0.24', '0.76', '1.01'], a: 0, w: t('101/418, idle over run time. 0.76 is the busy share.', 'هو 101 على 418. والـ 0.76 دي نسبة الشغل.') },
            { q: t('Average time between arrivals?', 'متوسط الوقت بين الوصول؟'), o: ['4.19', '4.15', '4.5'], a: 0, w: t('415/99: divide by N − 1. 4.5 is E(τ), the expected value.', 'هو 415 على 99. والـ 4.5 دي القيمة المتوقعة E(τ).') },
            { q: t('t̄, the average time in the system?', 'الـ t̄ (الوقت في الـ system) كام؟'), o: ['4.91', '1.74', '3.17'], a: 0, w: t('491/100 = w̄ + s̄ = 1.74 + 3.17.', 'هو 491 على 100، ويساوي ' + B('1.74 + 3.17') + '.') }]} />
        `),
        // 15 · L3 must-know (1): random variables
        page(html`
          <${H2}>${t('Lecture 3 · random variables', 'المحاضرة 3 · الـ random variables')}</${H2}>
          ${kv(A ? [
            ['الـ discrete', 'الـ PMF فيه <bdi dir="ltr">p(x) ≥ 0</bdi> ومجموعه 1 (الزهر المغشوش ' + B('p(x) = x/21') + ')'],
            ['الـ continuous', 'الـ PDF فيه <bdi dir="ltr">f ≥ 0</bdi> والتكامل 1، والاحتمال مساحة، و' + B('P(X = x₀) = 0')],
            ['الـ CDF', B('F(x) = P(X ≤ x)') + ' بيزيد من 0 لـ 1، و' + B('P(a < X ≤ b) = F(b) − F(a)')],
            ['الـ mean', B('E(X) = Σ x p(x)') + ' أو تكامل ' + B('x f(x)')],
            ['الـ variance', B('V(X) = E(X²) − [E(X)]²') + '، والـ σ هو الجذر (بنفس وحدة الـ mean)'],
            ['الجمع', 'الـ E بتتجمع دايمًا، والـ V بتتجمع بـ ' + B('aᵢ²') + ' بس لو الـ variables مستقلة'],
            ['المنتصف', 'الـ median هو الـ 0.5-quantile، والـ <b>mode</b> القيمة الأكتر احتمالًا. الـ categorical ليه mode، والـ skewed ليه median'],
            ['الشكل', 'المتماثل فيه ' + B('mean = median = mode') + '، ولو الديل يمين ' + B('mode < median < mean')]]
            : [['Discrete', 'PMF p(x) ≥ 0, Σ p(x) = 1 (loaded die p(x) = x/21)'],
            ['Continuous', 'PDF f ≥ 0, ∫ f = 1, probability = area, P(X = x₀) = 0'],
            ['CDF', 'F(x) = P(X ≤ x), nondecreasing 0 → 1; P(a &lt; X ≤ b) = F(b) − F(a)'],
            ['Mean', 'E(X) = Σ x p(x) or ∫ x f(x) dx'],
            ['Variance', 'V(X) = E(X²) − [E(X)]²; σ = √V, in the mean\'s units'],
            ['Sums', 'E always adds; V(Σ aᵢXᵢ) = Σ aᵢ²V(Xᵢ) only if independent'],
            ['Centre', 'median = 0.5-quantile; <b>mode</b> = most likely value; categorical → mode; skewed → median'],
            ['Shape', 'symmetric: mean = median = mode; right tail: mode &lt; median &lt; mean']])}
          <${Def}>${X('Inspection device, f(x) = ½e^(−x/2): F(x) = 1 − e^(−x/2), P(X ≤ 2) = 1 − e⁻¹ = 0.632, E(X) = 2, V(X) = 8 − 4 = 4.', 'جهاز الفحص، ' + B('f(x) = ½e^(−x/2)') + ':' + L('F(x) = 1 − e^(−x/2),  P(X ≤ 2) = 0.632,  E = 2,  V = 8 − 4 = 4'))}</${Def}>
        `, { sec: lecSec(3, 'Statistical models', 'الـ statistical models') }),

        // 16 · L3 must-know (2): the distributions
        page(html`
          <${H2}>${t('Lecture 3 · the distribution sheet', 'المحاضرة 3 · ورقة التوزيعات')}</${H2}>
          <div dir="ltr">${tb(['', 'p(x) or f(x)', 'E', 'V'], [
            ['Bernoulli', 'p, q = 1 − p', 'p', 'pq'], ['Binomial', 'C(n,x) pˣ qⁿ⁻ˣ', 'np', 'npq'], ['Geometric', 'qˣ⁻¹p, x = 1, 2, …', '1/p', 'q/p²'],
            ['Poisson', 'e^(−α) αˣ / x!', 'α', 'α'], ['Uniform', '1/(b − a)', '(a+b)/2', '(b−a)²/12'], ['Exponential', 'λe^(−λx)', '1/λ', '1/λ²'], ['Normal', 'N(μ, σ²)', 'μ', 'σ²']], '', [1, 2, 3])}</div>
          <${UL} items=${A ? ['الـ Normal: ' + B('Z = (X − μ)/σ') + ' و' + B('Φ(−x) = 1 − Φ(x)') + '، و' + B('N(12, 4)') + ' يعني σ = 2 و' + B('F(10) = Φ(−1) = 0.1587') + '.', 'الـ exponential: الـ mean بيساوي الـ σ، والـ PDF بيقطع المحور عند λ، وهو memoryless.', 'الـ Poisson process بمعدل λ: ' + B('N(t) ~ Poisson(λt)') + '، والوقت بين الوصول exponential بـ mean ' + B('1/λ') + '.', 'الـ empirical: مفيهوش أي افتراض غير الداتا، بس العينة ممكن متغطيش كل الـ range.']
            : ['Normal: Z = (X − μ)/σ, Φ(−x) = 1 − Φ(x); N(12, 4) has σ = 2, F(10) = Φ(−1) = 0.1587.', 'Exponential: mean = standard deviation, PDF intercept = λ, memoryless.', 'Poisson process (rate λ): N(t) ~ Poisson(λt); interarrival times exponential with mean 1/λ.', 'Empirical: no assumption beyond the data, but the sample may not cover the whole range.']} />
        `),

        // 17 · L3 figure
        page(html`
          <${H2}>${t('Poisson PMF and CDF, with the beeps', 'الـ PMF والـ CDF بتوع الـ Poisson مع الـ beeps')}</${H2}>
          <${Fig} name="ms-poisson" />
        `),

        // 18 · L3 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('N(10, 1/2): the second number is the <b>variance</b>; the mean is 10. The <b>median</b> is not the most likely value, the <b>mode</b> is (Final 2024/25 T/F → False). Categorical data → mode, never the mean.',
            'في ' + B('N(10, 1/2)') + ' الرقم التاني هو الـ <b>variance</b>، والـ mean بـ 10. والـ <b>median</b> مش القيمة الأكتر احتمالًا، ده الـ <b>mode</b> (صح وغلط ' + B('2024/25') + ' والإجابة False). والداتا الـ categorical ليها mode، عمرها ما تاخد mean.')}</p></${Box}>
          <${H3}>${t('Who am I? Match each distribution', 'أنا مين؟ وصّل كل distribution')}</${H3}>
          <${Match} id="l3m" left=${['Binomial', 'Geometric', 'Poisson', 'Exponential', 'Normal']}
            right=${A ? ['الوقت بين أحداث مستقلة، memoryless', 'عدد الـ successes في n trials', 'مجموع حاجات كتير صغيرة، متماثل حوالين μ', 'عدد الـ trials لحد أول success', 'أحداث مستقلة في وقت ثابت']
              : ['time between independent events, memoryless', 'successes in n independent trials', 'sum of many small effects, symmetric about μ', 'trials until the first success', 'independent events in a fixed time']}
            answer=${[1, 3, 4, 0, 2]} />
        `),

        // 19 · L4 must-know (1): making random numbers
        page(html`
          <${H2}>${t('Lecture 4 · making random numbers', 'المحاضرة 4 · بنعمل الـ random numbers إزاي')}</${H2}>
          ${kv(A ? [['الخصايص', 'الـ <b>uniformity</b> والـ <b>independence</b>. والـ R من ' + B('U[0, 1]') + ': الـ E بـ ½ والـ V بـ 1/12'], ['الـ pseudo', 'بتتحسب بمعادلة، فالـ generator العادي بيدّي <b>pseudorandom</b> sequence'], ['الـ midsquare', 'تربّع 4 خانات وتكمّل لـ 8 وتاخد الـ 4 اللي في النص ' + B('(7182² = 51581124 → 5811)') + '، وبتقع لـ 0'], ['الـ LCG', 'الـ c لو مش صفر يبقى mixed، ولو صفر يبقى multiplicative']]
            : [['Properties', '<b>uniformity</b> and <b>independence</b>; R ~ U[0, 1]: E = 1/2, V = 1/12'], ['Pseudo', 'computed by a formula, so a typical generator gives a <b>pseudorandom</b> sequence'], ['Midsquare', 'square 4 digits, pad to 8, keep the middle 4 (7182² = 51581124 → 5811); tends to 0'], ['LCG', 'c ≠ 0: mixed; c = 0: multiplicative']])}
          <${Code} lines=${['Xᵢ₊₁ = (a·Xᵢ + c) mod m', 'Rᵢ = Xᵢ / m']} />
          <${H3}>${t('The period rules (slide 21)', 'قواعد الـ period (سلايد 21)')}</${H3}>
          ${kv(A ? [[B('m = 2ᵇ, c ≠ 0'), 'الـ period بيبقى ' + B('P = m') + ' لو الـ c و الـ m مالهمش عامل مشترك و' + B('a = 1 + 4k')], [B('m = 2ᵇ, c = 0'), 'الـ period بيبقى ' + B('P = m/4') + ' لو الـ seed فردي و' + B('a = 3 + 8k') + ' أو ' + B('5 + 8k')], [B('m prime, c = 0'), 'الـ period بيبقى ' + B('P = m − 1') + ' لو أصغر k يخلّي m يقسم ' + B('aᵏ − 1') + ' هو ' + B('m − 1')]]
            : [['m = 2ᵇ, c ≠ 0', 'P = m if c is relatively prime to m and a = 1 + 4k'], ['m = 2ᵇ, c = 0', 'P = m/4 if X₀ is odd and a = 3 + 8k or 5 + 8k'], ['m prime, c = 0', 'P = m − 1 if the smallest k with m | aᵏ − 1 is m − 1']])}
        `, { sec: lecSec(4, 'Random numbers', 'الـ random numbers') }),

        // 20 · L4 must-know (2): the tests
        page(html`
          <${H2}>${t('Lecture 4 · the five tests', 'المحاضرة 4 · الخمس اختبارات')}</${H2}>
          ${kv(A ? [
            ['الـ KS', 'رتّب الأول. ' + B('D⁺ = max(i/N − R(i))') + ' و' + B('D⁻ = max(R(i) − (i−1)/N)') + '، ونرفض لو ' + B('D > Dα') + ' (عند ' + B('N = 5') + ' هي 0.565، وفوق 35 هي ' + B('1.36/√N') + ')'],
            ['الـ χ²', B('χ₀² = Σ(O − E)²/E') + ' و' + B('E = N/n') + ' و' + B('df = n − 1') + '، ومحتاج ' + B('N ≥ 50') + ' وكل E على الأقل 5'],
            ['الـ runs', B('μa = (2N − 1)/3') + ' و' + B('σa² = (16N − 29)/90') + ' و' + B('Z₀ = (a − μa)/σa')],
            ['الـ autocorr.', 'الـ M هو أكبر رقم يحقق ' + B('i + (M+1)m ≤ N') + '، و' + B('ρ̂ = ΣRR/(M+1) − 0.25') + ' و' + B('σ̂ = √(13M+7)/[12(M+1)]')],
            ['الـ gap', B('P(gap = x) = 0.9ˣ(0.1)') + ' و' + B('F(x) = 1 − 0.9ˣ⁺¹') + '، وبعدين KS'],
            ['الـ poker', 'تلات خانات: 0.72 كلهم مختلفين، و0.27 pair واحد، و0.01 الـ 3 زي بعض، وبعدين χ² بـ ' + B('df = 2')]]
            : [['KS', 'sort first; D⁺ = max(i/N − R(i)), D⁻ = max(R(i) − (i−1)/N); reject if D &gt; Dα (N = 5: 0.565; N &gt; 35: 1.36/√N)'],
            ['χ²', 'χ₀² = Σ(O − E)²/E, E = N/n, df = n − 1; needs N ≥ 50 and every E ≥ 5'],
            ['Runs', 'μa = (2N − 1)/3, σa² = (16N − 29)/90, Z₀ = (a − μa)/σa'],
            ['Autocorr.', 'M = largest with i + (M+1)m ≤ N; ρ̂ = ΣRR/(M+1) − 0.25; σ̂ = √(13M+7)/[12(M+1)]'],
            ['Gap', 'P(gap = x) = 0.9ˣ(0.1), F(x) = 1 − 0.9ˣ⁺¹, then KS'],
            ['Poker', '3 digits: 0.72 all different, 0.27 one pair, 0.01 three alike; χ² with df = 2']])}
          <${Def}>${X('Two-sided z tests: do not reject if −z(α/2) ≤ Z₀ ≤ z(α/2): <b>1.96</b> at α = 0.05, <b>2.576</b> at α = 0.01. χ² table: 3.84 (df 1), 5.99 (2), 7.81 (3), 9.49 (4), 11.07 (5), 12.6 (6), 16.9 (9).', 'اختبارات الـ z ذات الطرفين: منرفضش لو ' + B('|Z₀| ≤ z(α/2)') + '، يعني <b>1.96</b> عند ' + B('α = 0.05') + ' و<b>2.576</b> عند ' + B('α = 0.01') + '. وجدول الـ χ²:' + L('3.84 (df 1), 5.99 (2), 7.81 (3), 9.49 (4), 11.07 (5), 12.6 (6), 16.9 (9)'))}</${Def}>
        `),

        // 21 · L4 figure
        page(html`
          <${H2}>${t('One generator, four seeds (a = 13, c = 0, m = 64)', 'نفس الـ generator بأربع seeds')}</${H2}>
          <${Fig} name="ms-lcg-seeds" />
        `),

        // 22 · L4 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Both papers print the hint <b>Z0.01 = 1.30</b>: it is wrong (z0.01 = 2.326; two-sided α = 0.01 needs z0.005 = 2.576). With c = 0 the best period m/4 needs an <b>odd</b> seed. And "not rejected" means no evidence against H₀ was found, not proof.',
            'الورقتين كاتبين الـ hint ده ' + B('Z0.01 = 1.30') + ' وهو <b>غلط</b>: الصح ' + B('z0.01 = 2.326') + '، والاختبار ذو الطرفين عند 0.01 محتاج ' + B('z0.005 = 2.576') + '. ومع ' + B('c = 0') + ' أحسن period هو m/4 ومحتاج seed <b>فردي</b>. و"مش مرفوضة" معناها ملقيناش دليل ضد الـ H₀، مش إثبات.')}</p></${Box}>
          <${H3}>${t('Which period rule applies?', 'أنهي قاعدة period؟')}</${H3}>
          <${Sort} id="l4p" bins=${A ? [['m', 'P = m'], ['m/4', 'P = m/4'], ['m−1', 'P = m − 1'], ['✗', 'ولا قاعدة']] : [['m', 'P = m'], ['m/4', 'P = m/4'], ['m−1', 'P = m − 1'], ['✗', 'none of the rules']]} items=${A ? [
            ['لو ' + B('a = 13, c = 0, m = 64') + ' والـ seed فردي', 1], ['لو ' + B('a = 21, c = 17, m = 64'), 0], ['لو ' + B('a = 5, c = 13, m = 64'), 0],
            ['لو ' + B('a = 11, c = 0, m = 32') + ' والـ seed فردي', 1], ['لو ' + B('m = 31') + ' أولي و' + B('c = 0') + ' وأصغر k هو 30', 2], ['لو ' + B('a = 17, c = 43, m = 100') + ' (سلايد 18)', 3]]
            : [['a = 13, c = 0, m = 64, odd seed', 1], ['a = 21, c = 17, m = 64', 0], ['a = 5, c = 13, m = 64', 0], ['a = 11, c = 0, m = 32, odd seed', 1], ['m = 31 (prime), c = 0, smallest k = 30', 2], ['a = 17, c = 43, m = 100 (slide 18)', 3]]} />
        `),

        // 23 · L5 must-know
        page(html`
          <${H2}>${t('Lecture 5 · from R to X', 'المحاضرة 5 · من R لـ X')}</${H2}>
          <${Def}>${X('Inverse transform: (1) the cdf F(x); (2) set F(X) = R; (3) solve X = F⁻¹(R); (4) generate R₁, R₂, … and compute Xᵢ. It works because F(X) of any continuous X is <b>uniform on (0, 1)</b>.', 'الـ inverse transform: (1) هات الـ cdf، (2) حط ' + B('F(X) = R') + '، (3) حل ' + B('X = F⁻¹(R)') + '، (4) ولّد R₁ و R₂ واحسب Xᵢ. وبتنفع لأن ' + B('F(X)') + ' لأي continuous X بيبقى <b>uniform على (0, 1)</b>.')}</${Def}>
          ${kv(A ? [['الـ exponential', B('X = −(1/λ) ln(1 − R)') + ' أو ' + B('−(1/λ) ln R')], ['الـ uniform', B('X = a + (b − a)R')], ['الـ triangular', 'لو ' + B('R ≤ ½') + ' يبقى ' + B('X = √(2R)') + '، غير كده ' + B('X = 2 − √(2(1 − R))')], ['الـ discrete', B('X = xᵢ') + ' لما ' + B('F(xᵢ₋₁) < R ≤ F(xᵢ)')], ['الـ disc. uniform', B('X = ⌈Rk⌉')], ['الـ geometric', B('X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉') + '، والـ q أول قيمة (غالبًا 1)'], ['الـ accept–reject', 'على ' + B('[1/4, 1]') + ': اقبل R لو ' + B('R ≥ 1/4') + '، غير كده ولّد تاني'], ['الـ Poisson', 'ابدأ ' + B('n = 0, P = 1') + '، واضرب ' + B('P = P·R') + '، واقبل ' + B('N = n') + ' أول ما ' + B('P < e^(−α)')]]
            : [['Exponential', 'X = −(1/λ) ln(1 − R)  or  −(1/λ) ln R'], ['Uniform [a,b]', 'X = a + (b − a)R'], ['Triangular', 'R ≤ ½: X = √(2R); R &gt; ½: X = 2 − √(2(1 − R))'], ['Discrete', 'X = xᵢ when F(xᵢ₋₁) &lt; R ≤ F(xᵢ)'], ['Disc. uniform', 'X = ⌈Rk⌉'], ['Geometric', 'X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉, q = first value (usually 1)'], ['Accept–reject', 'U[1/4, 1]: accept R if R ≥ 1/4, else draw again'], ['Poisson', 'n = 0, P = 1; P = P·R; accept N = n once P &lt; e^(−α)']])}
        `, { sec: lecSec(5, 'Random variates', 'الـ random variates') }),

        // 24 · L5 figure
        page(html`
          <${H2}>${t('Slide R across the half-way line', 'حرّك الـ R وعدّي خط النص')}</${H2}>
          <${Fig} name="ms-tri-inv" />
        `),

        // 25 · L5 trap and the doctors' question
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('F⁻¹ solves R = F(X); it is not 1/f or 1/F. The triangular branch is picked by <b>R ≤ 1/2</b>, not by X. An R equal to F(xᵢ) gives xᵢ (Example 5.2: R = 0.80 → 1). The Poisson trick compares the product P with <b>e^(−α)</b>, not with α.',
            'الـ F⁻¹ هو حل ' + B('R = F(X)') + '، مش 1/f ولا 1/F. وفرع الـ triangular بيتحدد بـ ' + B('R ≤ 1/2') + ' مش بالـ X. والـ R اللي بتساوي ' + B('F(xᵢ)') + ' بتدّي xᵢ (مثال 5.2: الـ 0.80 بتدّي 1). وحيلة الـ Poisson بتقارن حاصل الضرب P بـ ' + B('e^(−α)') + ' مش بـ α.')}</p></${Box}>
          ${mq('l5q', /If X be a random variable of any continuous/)}
        `),

        // 26 · L6 must-know (1)
        page(html`
          <${H2}>${t('Lecture 6 · input modeling', 'المحاضرة 6 · الـ input modeling')}</${H2}>
          ${OL(A ? ['<b>اجمع data</b> من الـ system الحقيقي.', '<b>حدّد distribution</b> تمثّل الـ input process.', '<b>اختار الـ parameters</b> بتاعتها.', '<b>قيّم الـ goodness of fit</b>.'] : ['<b>Collect data</b> from the real system.', '<b>Identify a distribution</b> for the input process.', '<b>Choose its parameters</b>.', '<b>Evaluate the goodness of fit</b>.'])}
          ${cards(A ? [
            ['الـ GIGO', 'الـ output مش أحسن من الـ inputs: داتا متجمعة غلط، أو متحللة غلط، أو مش ممثلة للـ environment بتضلّل حتى الـ model الـ valid.', 1],
            ['7 نصايح', 'خطّط بدري، وحلّل وأنت بتجمع، وادمج الـ sets المتجانسة (نفس الـ means)، وخلّي بالك من الـ censoring، وشوف العلاقات (scatter diagram)، والـ autocorrelation، واجمع <b>input</b> مش performance data.', 1],
            ['الـ histogram', 'عدد الفترات حوالي ' + B('√n') + ' (64 يبقى 8)، العريض أوي بيطلع blocky والضيق ragged.'],
            ['الـ Q-Q plot', 'الـ yⱼ المترتبة قصاد ' + B('F⁻¹[(j − ½)/n]') + ': خط مستقيم يبقى الـ family صح، وميل 1 يبقى الـ parameters كمان.']]
            : [['GIGO', 'the output is no better than the inputs: data inaccurately collected, inappropriately analyzed or not representative mislead even a valid model.', 1],
            ['7 suggestions', 'plan ahead; analyze while collecting; combine homogeneous sets (same means); beware censoring; check relationships (scatter diagram) and autocorrelation; collect <b>input</b>, not performance data.', 1],
            ['Histogram', 'about √n intervals (n = 64 → 8); too wide → blocky, too narrow → ragged.'],
            ['Q-Q plot', 'sorted yⱼ against F⁻¹[(j − ½)/n]: a straight line → right family; slope 1 → right parameters too.']])}
        `, { sec: lecSec(6, 'Input modeling', 'الـ input modeling') }),

        // 27 · L6 must-know (2): estimate, then test
        page(html`
          <${H2}>${t('Lecture 6 · estimate, then test the fit', 'المحاضرة 6 · قدّر وبعدين اختبر الـ fit')}</${H2}>
          ${kv(A ? [
            ['الداتا الخام', B('X̄ = ΣXᵢ/n') + ' و' + B('S² = (ΣXᵢ² − nX̄²)/(n − 1)')],
            ['المجمّعة', B('X̄ = Σfⱼxⱼ/n') + ' و' + B('S² = (Σfⱼxⱼ² − nX̄²)/(n − 1)')],
            ['الـ estimators', 'الـ Poisson ' + B('α̂ = X̄') + '، والـ exponential ' + B('λ̂ = 1/X̄') + '، والـ normal ' + B('μ̂ = X̄, σ̂² = S²') + '، والـ lognormal نفس الكلام بعد ما تاخد ln'],
            ['الـ χ² fit', B('Eᵢ = n·pᵢ ≥ 5') + ' (ادمج الصغيرة)، و' + B('df = k − s − 1') + '، ونرفض لو ' + B('χ₀² > χ²α,df')],
            ['الـ K-S fit', B('D = max|F(x) − Sɴ(x)|') + '، للعينات الصغيرة ومن غير parameters متقدّرة، وفوق 35 بيبقى ' + B('1.36/√N')],
            ['الأخطاء', 'الـ Type I (α) إنك ترفض H₀ صح، والـ Type II (β) إنك تسيب H₀ غلط'],
            ['الاعتماد', B('ρ = cov/(σ₁σ₂)') + ' بين −1 و 1، والـ AR(1) والـ EAR(1) فيهم ' + B('ρₕ = φʰ')]]
            : [['Raw data', 'X̄ = ΣXᵢ/n, S² = (ΣXᵢ² − nX̄²)/(n − 1)'], ['Grouped', 'X̄ = Σfⱼxⱼ/n, S² = (Σfⱼxⱼ² − nX̄²)/(n − 1)'],
            ['Estimators', 'Poisson α̂ = X̄; exponential λ̂ = 1/X̄; normal μ̂ = X̄, σ̂² = S²; lognormal: the same after taking ln'],
            ['χ² fit', 'Eᵢ = n·pᵢ ≥ 5 (merge small cells); df = k − s − 1; reject if χ₀² &gt; χ²α,df'],
            ['K-S fit', 'D = max|F(x) − Sɴ(x)|; small samples, no estimated parameters; N &gt; 35: D0.05 = 1.36/√N'],
            ['Errors', 'Type I (α): reject a true H₀ · Type II (β): keep a false H₀'],
            ['Dependence', 'ρ = cov/(σ₁σ₂) between −1 and 1; AR(1), EAR(1): ρₕ = φʰ']])}
          <${Def}>${X('Vehicles (n = 100): X̄ = 3.64, S² = 7.63; χ₀² = 27.68 &gt; χ²0.05,5 = 11.07 → not Poisson.', 'العربيات (' + B('n = 100') + '):' + L('X̄ = 3.64, S² = 7.63;  χ₀² = 27.68 > χ²0.05,5 = 11.07') + 'يعني مش Poisson.')}</${Def}>
        `),

        // 28 · L6 figure
        page(html`
          <${H2}>${t('Are the cars Poisson? (slide 30)', 'العربيات Poisson؟ (سلايد 30)')}</${H2}>
          <${Fig} name="ms-in-chisq-poisson" />
        `),

        // 29 · L6 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Random numbers (L4): df = n − 1; a fitted distribution (L6): df = k − s − 1. Merge a cell with Eᵢ &lt; 5 <b>with its Oᵢ</b>. ‡ Example 6.6: the third cell is 1.69, not 0.81, so χ₀² = 39.60, not 38.72 (same decision).',
            'الأرقام العشوائية (المحاضرة 4) ' + B('df = n − 1') + '، والـ distribution المتركّبة (المحاضرة 6) ' + B('df = k − s − 1') + '. وادمج الخانة اللي ' + B('Eᵢ < 5') + ' <b>ومعاها الـ Oᵢ</b>. ‡ مثال 6.6: الخانة التالتة 1.69 مش 0.81، فالـ ' + B('χ₀² = 39.60') + ' مش 38.72.')}</p></${Box}>
          <${H3}>${t('Physical basis: what am I for?', 'أنا بتاع إيه؟')}</${H3}>
          <${Match} id="l6m" left=${['Lognormal', 'Weibull', 'Triangular', 'Uniform', 'Empirical', 'Neg. binomial']}
            right=${A ? ['معروف بس الـ min والأكتر احتمالًا والـ max', 'الوقت لحد الـ failure', 'بيعيد سحب الداتا الحقيقية', 'حاصل ضرب component processes', 'عدد الـ trials لحد k successes', 'جهل تام، مفيش داتا']
              : ['only min, most likely and max known', 'time to failure', 'resamples the actual data', 'product of component processes', 'trials needed for k successes', 'complete uncertainty, no data']}
            answer=${[3, 1, 0, 5, 2, 4]} />
        `),

        // 30 · L7 must-know
        page(html`
          <${H2}>${t('Lecture 7 · verification and validation', 'المحاضرة 7 · الـ verification والـ validation')}</${H2}>
          <${Def}>${X('<b>Verification</b> = building the model <b>right</b>: the conceptual model vs the computer program. <b>Validation</b> = building the <b>right model</b>: the model vs the real system, through <b>calibration</b> (compare, adjust, compare again).', 'الـ <b>Verification</b> يعني تبني الـ model <b>صح</b>: الـ conceptual model قصاد البرنامج. والـ <b>Validation</b> يعني تبني <b>الـ model الصح</b>: الـ model قصاد الـ system الحقيقي، بالـ <b>calibration</b> (قارن وعدّل وقارن تاني).')}</${Def}>
          ${cards(A ? [
            ['3 خطوات للبناء', 'تراقب الـ system، وبعدين conceptual model (افتراضات وفرضيات على الـ inputs)، وبعدين computerized model. ومش خط مستقيم.'],
            ['3 techniques', 'الـ common sense (توقّع range)، والـ documentation، والـ <b>trace</b>. وأول اتنين دايمًا.'],
            ['Naylor و Finger', '(1) face validity عالية، (2) validate للافتراضات (structural و data)، (3) قارن الـ input-output.'],
            ['الـ Turing test', '5 تقارير حقيقية و5 مزيفة لمهندس: لو معرفش يفرّق يبقى الـ model adequate.'],
]
            : [['3 steps of building', 'observe the real system → conceptual model (assumptions, input hypotheses) → computerized model; not a linear process.'],
            ['3 techniques', 'common sense (forecast a range), documentation, <b>trace</b>; the first two always.'],
            ['Naylor & Finger', '(1) high face validity, (2) validate assumptions (structural, data), (3) compare input-output transformations.'],
            ['Turing test', '5 real and 5 fake reports to an engineer: can\'t tell them apart → the model is adequate.'],
])}
        `, { sec: lecSec(7, 'Verification and validation', 'الـ verification والـ validation') }),

        // 31 · L7 figure
        page(html`
          <${H2}>${t('Fig 7.1: which arrow is which?', 'الشكل 7.1: أنهي سهم إيه؟')}</${H2}>
          <${Fig} name="ms-vv-build" />
        `),

        // 32 · L7 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Example 7.1: at CLOCK = 3 the trace shows NCUST = 1 with STATUS = 0, a customer in the system while the server is idle: wrong logic. L̂Q = 7/16 = 0.4375 is right arithmetic on wrong values. ‡ The same slip is at CLOCK = 11; with the right STATUS, L̂Q = 4/16 = 0.25.',
            'مثال 7.1: عند ' + B('CLOCK = 3') + ' الـ trace بيقول ' + B('NCUST = 1') + ' و' + B('STATUS = 0') + '، يعني زبون جوه والـ server فاضي، وده منطق غلط. والـ ' + B('L̂Q = 7/16 = 0.4375') + ' حسابها صح بس على قيم غلط. ‡ نفس الغلطة عند ' + B('CLOCK = 11') + '، ولو الـ STATUS صح يبقى ' + B('L̂Q = 4/16 = 0.25') + '.')}</p></${Box}>
          <${H3}>${t('Verification or validation?', 'الـ verification ولا الـ validation؟')}</${H3}>
          <${Sort} id="l7s" bins=${[['Ver', 'verification'], ['Val', 'validation']]} items=${A ? [
            ['البرنامج بيعمل اللي الـ model بيوصفه؟', 0], ['النتايج زي الواقع؟', 1], ['الـ trace بنراجعه بحسابات بإيدنا', 0], ['الـ calibration على data set تانية', 1], ['الـ Turing test مع مهندس', 1], ['نطبع الـ input parameters في آخر الـ run', 0]]
            : [['Does the program do what the model describes?', 0], ['Do the results match reality?', 1], ['A trace checked by hand calculations', 0], ['Calibration on a second data set', 1], ['The Turing test with an engineer', 1], ['Printing the input parameters at the end of the run', 0]]} />
        `),

        // 33 · L8 must-know
        page(html`
          <${H2}>${t('Lecture 8 · the case studies', 'المحاضرة 8 · الـ case studies')}</${H2}>
          ${cards(A ? [
            ['الـ Gift shop', 'الـ ' + B('Serv_begin = max(Ar_Clk, prev Serv_end)') + '، والـ WT هو النهاية ناقص الوصول (الوقت في الـ system)، والـ idle هو الوصول ناقص النهاية اللي قبله. والـ ' + B('Ar = ΣWT/n') + ' و' + B('P = ΣIdle/t × 100') + '.', 1],
            ['الـ Monte Carlo area', 'لو K من N نقطة تحت المنحنى في مستطيل ' + B('h × (c − b)') + ' يبقى ' + B('A = K h (c − b)/N') + '، والـ ' + B('√(1 − x²)') + ' بتدّي π/4.'],
            ['الـ Pursuit', 'الـ fighter بـ 20 كم/دقيقة بيلف ناحية الـ bomber كل دقيقة، ويمسكه لو المسافة 10 كم (عند ' + B('t = 9') + ')، ويهرب بعد 12.'],
            ['الـ Drunk', '10 بلوكات، والـ RN من 00 لـ 24 شرق، و25 لـ 49 غرب، و50 لـ 74 شمال، و75 لـ 99 جنوب. ينجح لو ' + B('|X| + |Y| ≤ 2') + '.'],
            ['لعبة العملة', 'ترمي لحد ' + B('|H − T| = 3') + '، بتدفع 1$ للرمية وتكسب 8$، يعني الصافي ' + B('8 − flips') + '، ودايمًا عدد فردي.'],
            ['الـ cake shop', 'لو ' + B('x ≤ d') + ' يبقى ' + B('z = (P − C)x') + '، ولو ' + B('x > d') + ' يبقى ' + B('z = (P − S)d + (S − C)x') + '. ومع الـ goodwill u بيتطرح ' + B('u(d − x)') + ' في الحالة الأولى بس.', 1]]
            : [['Gift shop', 'Serv_begin = max(Ar_Clk, previous Serv_end); WT = end − arrival (time in the system); idle = arrival − previous end; Ar = ΣWT/n, P = ΣIdle/t × 100.', 1],
            ['Monte Carlo area', 'K of N points under y = f(x) in a box h × (c − b): A = K h (c − b)/N; √(1 − x²) on [0, 1] → π/4.'],
            ['Pursuit', 'fighter at 20 km/min turns to the bomber each minute; caught within 10 km (t = 9), escape after 12 min.'],
            ['Drunk', '10 blocks; RN 00–24 E, 25–49 W, 50–74 N, 75–99 S; success if |X| + |Y| ≤ 2.'],
            ['Coin game', 'flip until |H − T| = 3; pay $1 a flip, get $8: net = 8 − flips, always an odd number of flips.'],
            ['Cake shop', 'x ≤ d: z = (P − C)x; x &gt; d: z = (P − S)d + (S − C)x. Goodwill u subtracts u(d − x), only when x ≤ d.', 1]])}
          <${Hand}>${t('Newspaper (Quiz 5): best Q = 60 papers, $74.40 over 10 days.', 'الجرايد (Quiz 5): أحسن Q هو 60 جرنال، بـ 74.40$ في 10 أيام.')}</${Hand}>
        `, { sec: lecSec(8, 'Case studies', 'الـ case studies') }),

        // 34 · L8 figure
        page(html`
          <${Fig} name="ms-cake-model" head=${t('Figure 8-6: set x and d', 'الشكل 8-6: غيّر الـ x والـ d')} />
        `),

        // 35 · L8 trap and quick check
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Random-number intervals <b>include their lower end</b> (0.45–0.74999 → 50), so in the cake-shop paper 0.15 → 20 and 0.75 → 60. The Lecture 5 rule F(xᵢ₋₁) &lt; R ≤ F(xᵢ) gives the lower value: state the convention you use. Goodwill only enters when x ≤ d.',
            'فترات الـ random numbers <b>بتشمل طرفها الصغير</b> (من 0.45 لـ 0.74999 يبقى 50)، فـ في ورقة الـ cake shop الـ 0.15 بتدّي 20 والـ 0.75 بتدّي 60. وقاعدة المحاضرة 5 ' + B('F(xᵢ₋₁) < R ≤ F(xᵢ)') + ' بتدّي القيمة الأصغر، فاكتب أنهي طريقة استخدمت. والـ goodwill بيدخل بس لما ' + B('x ≤ d') + '.')}</p></${Box}>
          <${Pick} id="l8p" rows=${[
            { q: t('Gift shop: customer 3 arrives at 17, customer 2 left at 14. Idle time?', 'الـ gift shop: الزبون 3 وصل 17، واللي قبله مشي 14. الـ idle كام؟'), o: ['3', '0', '17'], a: 0, w: t('idle = arrival − previous end = 17 − 14.', 'الـ idle هو الوصول ناقص النهاية اللي قبله، يعني ' + B('17 − 14') + '.') },
            { q: t('Coin game that ends after 13 flips: net gain?', 'لعبة العملة خلصت بعد 13 رمية: الصافي كام؟'), o: ['−$5', '+$5', '−$13'], a: 0, w: t('net = 8 − 13 = −5.', 'الصافي ' + B('8 − 13 = −5') + '.') },
            { q: t('Drunk: RN 62 moves him…', 'الـ drunk: الـ RN بـ 62 بيوديه فين؟'), o: ['N', 'E', 'S'], a: 0, w: t('50–74 is north (Y + 1).', 'من 50 لـ 74 يبقى شمال ' + B('(Y + 1)') + '.') },
            { q: t('Newspaper: Q = 70, demand 50. Profit?', 'الجرايد: ' + B('Q = 70') + ' والطلب 50. الربح كام؟'), o: ['$2.90', '$5.70', '$11.90'], a: 0, w: t('25.00 − 23.10 + 20 × 0.05 = 2.90.', 'الحساب ' + B('25.00 − 23.10 + 20 × 0.05 = 2.90') + '.') }]} />
        `),
        // 36 · the problems that always come up: the map
        page(html`
          <${H1}>${t('The problems that always come up', 'المسايل اللي بتيجي كل سنة')}</${H1}>
          <${P} small=${true}>${X('Q2 and Q3 are <b>40 of the 60 marks</b>, all written problems. Each one below starts with a real paper\'s numbers (labelled with the paper), then a fresh variant of ours. Fill the cells, press Check, and read the trap beside it.', 'سؤال 2 وسؤال 3 هما <b>40 درجة من الـ 60</b>، وكلهم مسايل. كل مسألة هنا بتبدأ بأرقام ورقة حقيقية (ومكتوب عليها أنهي ورقة)، وبعدين نسخة جديدة من عندنا. املا الخانات، ودوس صحّح، واقرا الفخ اللي جنبها.')}</${P}>
          ${tb(A ? ['المسألة', 'الورقة', 'الدرجة'] : ['Problem', 'Paper', 'Marks'], [
            [t('LCG sequences and period', 'تسلسل الـ LCG والـ period'), B('2025/26 Q2-a · 2024/25 Q2-a'), '10 + 10'],
            [t('Runs up and down', 'الـ runs up and down'), B('2025/26 Q2-b'), '10'],
            [t('Autocorrelation', 'الـ autocorrelation'), B('2024/25 Q2-b'), '10'],
            [t('Poisson, geometric', 'الـ Poisson والـ geometric'), B('2025/26 Q3-a · 2024/25 Q3-a(i)'), '5 + 5'],
            [t('Lognormal estimate', 'تقدير الـ lognormal'), B('2024/25 Q3-a(ii)'), '5'],
            [t('Cake shop with goodwill', 'الـ cake shop بالـ goodwill'), B('2025/26 Q3-b'), '15'],
            [t('Weekly inventory', 'المخزون الأسبوعي'), B('2024/25 Q3-b'), '10'],
            [t('Likely: K-S, χ², a queue table, variates', 'متوقع: الـ K-S والـ χ² وجدول queue والـ variates'), t('not yet on a final', 'لسه ماجاتش'), '–']], '', [2])}
        `, { sec: t('The problems that always come up', 'المسايل اللي بتيجي كل سنة') }),

        // 37 · LCG: method and trap
        page(html`
          <${H2}>${t('Problem 1 · the LCG (Q2-a, both finals)', 'المسألة 1 · الـ LCG (سؤال 2-a في الورقتين)')}</${H2}>
          <${Code} lines=${[['Xᵢ₊₁ = (a·Xᵢ + c) mod m', t('the generator', 'الـ generator')], ['Rᵢ = Xᵢ / m', t('the number you hand in', 'الرقم اللي بتسلّمه')], ['period = steps until X₀ returns']]} />
          ${kv(A ? [[B('c ≠ 0'), 'الـ ' + B('P = m') + ' لو الـ c فردي (مالوش عامل مشترك مع ' + B('m = 2ᵇ') + ') و' + B('a = 1 + 4k')], [B('c = 0'), 'الـ ' + B('P = m/4') + ' بس لو الـ seed فردي و' + B('a = 3 + 8k') + ' أو ' + B('5 + 8k')]]
            : [['c ≠ 0', 'P = m if c is odd (relatively prime to m = 2ᵇ) and a = 1 + 4k'], ['c = 0', 'P = m/4 only if the seed is odd and a = 3 + 8k or 5 + 8k']])}
          <${Box} kind="watch"><p className="hf-p small">${X('Hand in <b>R = X/m</b> for every number, not just X. "Maximum period" asks for the rule <b>and</b> whether this seed reaches it: a = 13, c = 0, X₀ = 4 is even, so it cycles after 4 (4 → 52 → 36 → 20 → 4), not 16. For mod 64, subtract multiples of 64: 676 = 10 × 64 + 36.',
            'سلّم <b>' + B('R = X/m') + '</b> لكل رقم، مش X بس. و"maximum period" عايزة القاعدة <b>وكمان</b> هل الـ seed ده بيوصلها: ' + B('a = 13, c = 0, X₀ = 4') + ' زوجي، فبيلف بعد 4 ' + B('(4 → 52 → 36 → 20 → 4)') + ' مش 16. وعشان الـ mod 64 اطرح مضاعفات 64:' + L('676 = 10 × 64 + 36'))}</p></${Box}>
          <${Talk} who="dice" flip=${true}>${X('Give me c = 0 and an even seed, and I run in a tiny circle.', 'إدّيني ' + B('c = 0') + ' و seed زوجي، وأنا ألف في دايرة صغيرة.')}</${Talk}>
        `),

        // 38 · LCG: the two papers
        page(html`
          <${H2}>${t('Your turn: the two papers', 'دورك: الورقتين')}</${H2}>
          <${Grid} id="lcgP" sets=${[
            { tab: 'Final 2025/26', ask: A ? 'الأول والتاني، و' + B('m = 64') + ':' + L('1: a = 13, c = 0, X₀ = 4   2: a = 21, c = 17, X₀ = 1') : 'Seq 1: a = 13, c = 0, X₀ = 4 · Seq 2: a = 21, c = 17, X₀ = 1 · m = 64',
              head: ['i', 'X (1)', 'R', 'X (2)', 'R'], cols: ['26px', null, null, null, null],
              rows: [52, 36, 20, 4, 52].map((x, i) => { const y = [38, 47, 44, 45, 2][i]; return [i + 1, { a: x }, { a: x / 64, s: String(x / 64) }, { a: y }, { a: y / 64, s: String(y / 64) }]; }),
              x: [[t('Seq 1: longest possible period (rule)', 'الأول: أطول period ممكن (القاعدة)'), 16, 0], [t('Seq 1: period of this seed', 'الأول: الـ period بالـ seed ده'), 4, 0], [t('Seq 2: maximum period', 'التاني: أقصى period'), 64, 0]],
              done: t('Seq 1 repeats after 4 because X₀ = 4 is even (m/4 = 16 needs an odd seed). Seq 2: c = 17 is odd and 21 = 1 + 4·5, so P = m = 64.', 'الأول بيتكرر بعد 4 لأن الـ seed زوجي (الـ 16 محتاجة seed فردي). والتاني: الـ c فردي و' + B('21 = 1 + 4·5') + '، يعني ' + B('P = 64') + '.') },
            { tab: 'Final 2024/25', ask: A ? B('a = 5, c = 13, m = 64') + ' بـ seedين: ' + B('X₀ = 1') + ' و' + B('X₀ = 3') + '.' : 'a = 5, c = 13, m = 64 · seeds X₀ = 1 and X₀ = 3',
              head: ['i', 'X (X₀=1)', 'R', 'X (X₀=3)', 'R'], cols: ['26px', null, null, null, null],
              rows: [18, 39, 16, 29, 30].map((x, i) => { const y = [28, 25, 10, 63, 8][i]; return [i + 1, { a: x }, { a: x / 64, s: String(x / 64) }, { a: y }, { a: y / 64, s: String(y / 64) }]; }),
              x: [[t('Period with X₀ = 1', 'الـ period بالـ seed 1'), 64, 0], [t('Period with X₀ = 3', 'الـ period بالـ seed 3'), 64, 0]],
              done: t('13 is odd and 5 = 1 + 4·1, so P = m = 64 for <b>every</b> seed: with c ≠ 0 the seed does not matter.', 'الـ 13 فردي و' + B('5 = 1 + 4·1') + '، يعني ' + B('P = 64') + ' لـ <b>أي</b> seed: لما الـ c مش صفر الـ seed مايفرقش.') }]} />
        `),

        // 39 · LCG: ours
        page(html`
          <${H2}>${t('A fresh pair (ours)', 'نسخة جديدة (من عندنا)')}</${H2}>
          <${Grid} id="lcgO" sets=${[{ tab: 'ours', ask: A ? 'الأول والتاني، و' + B('m = 64') + ':' + L('A: a = 29, c = 0, X₀ = 3   B: a = 13, c = 7, X₀ = 5') : 'A: a = 29, c = 0, X₀ = 3 · B: a = 13, c = 7, X₀ = 5 · m = 64',
            head: ['i', 'X (A)', 'R', 'X (B)', 'R'], cols: ['26px', null, null, null, null],
            rows: [23, 27, 15, 51, 7].map((x, i) => { const y = [8, 47, 42, 41, 28][i]; return [i + 1, { a: x }, { a: x / 64, s: String(x / 64) }, { a: y }, { a: y / 64, s: String(y / 64) }]; }),
            x: [[t('A: maximum period', 'الأول: أقصى period'), 16, 0], [t('B: maximum period', 'التاني: أقصى period'), 64, 0]],
            done: t('A: c = 0, 29 = 5 + 8·3 and the seed is odd → m/4 = 16. B: c = 7 is odd and 13 = 1 + 4·3 → m = 64.', 'الأول: ' + B('c = 0') + ' و' + B('29 = 5 + 8·3') + ' والـ seed فردي، يعني 16. والتاني: الـ c فردي و' + B('13 = 1 + 4·3') + '، يعني 64.') }]} />
        `),

        // 40 · runs: the signs
        page(html`
          <${H2}>${t('Problem 2 · runs up and down (Final 2025/26 Q2-b)', 'المسألة 2 · الـ runs up and down (سؤال 2-b في 2025/26)')}</${H2}>
          <${Code} lines=${[['+  next number larger', t('− if smaller', '− لو أصغر')], ['a  = number of runs', t('blocks of equal signs', 'بلوكات نفس الإشارة')], ['μa  = (2N − 1)/3'], ['σa² = (16N − 29)/90'], ['Z₀  = (a − μa)/σa']]} />
          <${P} small=${true}>${X('Tap the box under each number for the sign to the next one, then count the runs (α = 0.05).', 'دوس على المربع تحت كل رقم عشان تحط إشارته للرقم اللي بعده، وبعدين عدّ الـ runs ' + B('(α = 0.05)') + '.')}</${P}>
          <${Signs} id="runsP" nums=${R30} />
        `),

        // 41 · runs: the statistic
        page(html`
          <${H2}>${t('Now the statistic', 'دلوقتي الـ statistic')}</${H2}>
          <${Fill} id="runsPf" rows=${[
            [t('μa = (2N − 1)/3, N = 30', 'الـ μa، و' + B('N = 30')), 19.67, '59/3 = 19.67', 0.01],
            [t('σa² = (16N − 29)/90', 'الـ σa²'), 5.011, '451/90 = 5.011 → σa = 2.239', 0.006],
            [t('Z₀ = (a − μa)/σa with a = 16', 'الـ Z₀ لما ' + B('a = 16')), -1.64, '(16 − 19.67)/2.239 = −1.64', 0.01, '-1.64']]} />
          <${Pick} id="runsPd" rows=${[
            { q: t('Two-sided, α = 0.05: the critical value?', 'الـ critical value كام لطرفين عند ' + B('α = 0.05') + '؟'), o: ['1.96', '1.65', '1.30'], a: 0, w: t('1.65 is one-sided z0.05; 1.30 is the paper\'s misprint.', 'الـ 1.65 لطرف واحد، والـ 1.30 غلطة الورقة.') },
            { q: t('Decision?', 'القرار؟'), o: [t('do not reject', 'منرفضش'), t('reject', 'نرفض')], a: 0, w: t('−1.96 ≤ −1.64 ≤ 1.96.', 'لأن ' + B('−1.96 ≤ −1.64 ≤ 1.96') + '.') }]} />
        `),

        // 42 · runs: ours
        page(html`
          <${H2}>${t('A fresh one (ours): 25 numbers', 'نسخة جديدة من عندنا: 25 رقم')}</${H2}>
          <${Signs} id="runsO" nums=${R25} />
        `),

        // 42b · runs: ours, the statistic
        page(html`
          <${H2}>${t('Ours: the statistic (a = 16)', 'من عندنا: الـ statistic')}</${H2}>
          <${Fill} id="runsOf" rows=${[[t('μa (N = 25)', 'الـ μa ' + B('(N = 25)')), 16.33, '49/3 = 16.33', 0.01], [t('σa²', 'الـ σa²'), 4.122, '371/90 = 4.122 → σa = 2.030', 0.006], [t('Z₀ (then decide with ±1.96)', 'الـ Z₀ (وبعدين قرّر بالـ ±1.96)'), -0.16, '(16 − 16.33)/2.030 = −0.16: not rejected', 0.01, '-0.16']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Count <b>runs</b>, not signs: here 24 signs make 16 runs (the paper: 29 signs, 16 runs). N is the number of <b>numbers</b> (25 here, 30 in the paper). In the paper, dividing by σa² instead of σa gives −0.73.', 'عدّ الـ <b>runs</b> مش الإشارات: هنا 24 إشارة عاملين 16 run (وفي الورقة 29 إشارة و16 run). والـ N هو عدد <b>الأرقام</b> (25 هنا و30 في الورقة). وفي الورقة لو قسمت على σa² بدل σa هيطلع ' + B('−0.73') + '.')}</p></${Box}>
        `),

        // 43 · autocorrelation: method and trap
        page(html`
          <${H2}>${t('Problem 3 · autocorrelation (Final 2024/25 Q2-b)', 'المسألة 3 · الـ autocorrelation (سؤال 2-b في 2024/25)')}</${H2}>
          <${P} small=${true}>${X('Test the 3rd, 8th, 13th, … of the same 30 numbers at α = 0.01: start <b>i = 3</b>, lag <b>m = 5</b>.', 'اختبر الرقم التالت والتامن والـ 13 و… من نفس الـ 30 رقم عند ' + B('α = 0.01') + ': البداية ' + B('i = 3') + ' والـ lag ' + B('m = 5') + '.')}</${P}>
          <${Code} lines=${[['M: largest, i + (M+1)m ≤ N'], ['ρ̂ = Σ RR/(M + 1) − 0.25', t('neighbour products', 'ضرب الجيران')], ['σ̂ = √(13M + 7)/[12(M + 1)]'], ['Z₀ = ρ̂ / σ̂']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('The hint says <b>Z0.01 = 1.30</b>: wrong (z0.01 = 2.326; 1.30 is near z0.10 = 1.282). For α = 0.01 two-sided use <b>z0.005 = 2.576</b>. Comparing −1.52 with ±1.30 would wrongly reject; write the right value and one line on why.',
            'الـ hint بيقول ' + B('Z0.01 = 1.30') + ' وده <b>غلط</b> (الصح ' + B('z0.01 = 2.326') + '، والـ 1.30 قريبة من ' + B('z0.10 = 1.282') + '). وعند 0.01 بطرفين استخدم ' + B('z0.005 = 2.576') + '. لو قارنت الـ −1.52 بالـ 1.30 هترفض غلط، فاكتب القيمة الصح وسطر بيقول ليه.')}</p></${Box}>
        `),

        // 44 · autocorrelation: be the tester
        page(html`
          <${H2}>${t('Be the tester', 'اعمل إنت الاختبار')}</${H2}>
          <${Steps} id="auto" data=${AUTO} />
        `),

        // 45 · Poisson and geometric: the papers
        page(html`
          <${H2}>${t('Problem 4 · Poisson and geometric (Q3-a)', 'المسألة 4 · الـ Poisson والـ geometric')}</${H2}>
          <${P} small=${true}>${X('<b>Final 2025/26 Q3-a</b>: beeps are Poisson, α = 2 per hour. <b>Final 2024/25 Q3-a(i)</b>: 40% of bubble-jet printers are rejected; the first acceptable one is the third inspected.', 'في <b>سؤال 3-a</b> من ' + B('Final 2025/26') + ' الـ beeps بـ ' + B('α = 2') + ' في الساعة. وفي <b>سؤال ' + B('3-a(i)') + '</b> من ' + B('2024/25') + ' أول طابعة مقبولة هي التالتة (40% بيترفضوا).')}</${P}>
          <${Fill} id="poisP" rows=${[
            [t('(i) P(exactly 3 beeps)', 'احتمال 3 beeps بالظبط (i)'), 0.1804, '2³e⁻²/3! = 8(0.1353)/6 = 0.18', 0.003, '0.18'],
            [t('(ii) P(2 or more beeps)', 'احتمال 2 أو أكتر (ii)'), 0.594, '1 − F(1) = 1 − (0.135 + 0.271) = 0.594', 0.003],
            [t('Printers: P(first good is the 3rd)', 'الطابعات: احتمال أول مقبولة تبقى التالتة'), 0.096, 'q²p = (0.4)²(0.6) = 0.096', 0.0015]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('P(two or more) = 1 − F(<b>1</b>), not 1 − F(2). In the printers, success = acceptable, so p = 0.6 and q = 0.4, not the other way round: (0.6)²(0.4) = 0.144 is the classic slip.', 'احتمال 2 أو أكتر هو ' + B('1 − F(1)') + ' مش ' + B('1 − F(2)') + '. وفي الطابعات الـ success هو المقبولة، يعني ' + B('p = 0.6') + ' مش 0.4.')}</p></${Box}>
        `),

        // 46 · Poisson and geometric: ours
        page(html`
          <${H2}>${t('Fresh ones (ours), and the notes\' chips', 'نسخ جديدة من عندنا، وشرايح الـ notes')}</${H2}>
          <${Fill} id="poisO" rows=${[
            [t('Calls are Poisson, α = 3 per hour. P(exactly 2)?', 'المكالمات Poisson بـ ' + B('α = 3') + ' في الساعة. احتمال 2 بالظبط؟'), 0.224, '3²e⁻³/2! = 9(0.0498)/2 = 0.224', 0.003],
            [t('Same: P(2 or more)?', 'نفس الحكاية: احتمال 2 أو أكتر؟'), 0.801, '1 − e⁻³(1 + 3) = 1 − 0.199 = 0.801', 0.003],
            [t('30% of parts rejected. P(first good is the 4th)?', 'لو 30% من القطع بتترفض، احتمال أول سليمة تبقى الرابعة؟'), 0.0189, 'q³p = (0.3)³(0.7) = 0.0189', 0.0006],
            [t('Chips (Example 3.5): n = 50, p = 0.02. P(X &gt; 2)?', 'الشرايح (مثال 3.5): ' + B('n = 50, p = 0.02') + '. احتمال ' + B('X > 2') + '؟'), 0.08, '1 − (0.364 + 0.372 + 0.186) = 0.08', 0.003]]} />
          <${Grow} />
          <${Talk} who="cust" flip=${true}>${X('Binomial from a mean and a variance: q = V/E, then n = E/p. If n is not a whole number, the answer is "none of these".', 'عشان تجيب الـ binomial من الـ mean والـ variance، احسب ' + B('q = V/E') + ' وبعدين ' + B('n = E/p') + '. ولو الـ n مش عدد صحيح، الإجابة "none of these".')}</${Talk}>
        `),

        // 47 · lognormal: the paper
        page(html`
          <${H2}>${t('Problem 5 · lognormal estimate (Final 2024/25 Q3-a(ii))', 'المسألة 5 · تقدير الـ lognormal (سؤال 3-a(ii) في 2024/25)')}</${H2}>
          <${P} small=${true}>${X('Take ln of each return, <b>rounded to 1 decimal</b> like the notes; then μ̂ = the mean of the logs and σ̂² = their S².', 'خد الـ ln لكل return و<b>قرّبه لرقم عشري واحد</b> زي الـ notes، وبعدين الـ μ̂ هو متوسط الـ logs والـ σ̂² هو الـ S² بتاعهم.')}</${P}>
          <${Grid} id="logP" sets=${[{ tab: 'p', head: ['X', 'ln X', '(ln X)²', 'X', 'ln X', '(ln X)²'],
            rows: [[18.8, 2.9, 37.4, 3.6], [27.9, 3.3, 5.0, 1.6], [21.0, 3.0, 22.9, 3.1], [6.1, 1.8, 1.0, 0.0], [3.1, 1.1, 8.3, 2.1]].map(([x1, l1, x2, l2]) => [x1.toFixed(1), { a: l1, tol: 0.051, s: l1.toFixed(1) }, { a: +(l1 * l1).toFixed(2), tol: 0.06 }, x2.toFixed(1), { a: l2, tol: 0.051, s: l2.toFixed(1) }, { a: +(l2 * l2).toFixed(2), tol: 0.06 }]),
            x: [['Σ ln X', 22.5, 0.06], ['Σ (ln X)²', 62.29, 0.12], [t('μ̂ = Σ ln X / n', 'الـ μ̂'), 2.25, 0.006], [t('σ̂² = (Σ(ln X)² − nμ̂²)/(n − 1)', 'الـ σ̂²'), 1.30, 0.011]],
            done: t('μ̂ = 22.5/10 = 2.25; σ̂² = (62.29 − 10 × 2.25²)/9 = 11.665/9 = 1.30 (unrounded logs give 2.27 and 1.32).', 'الـ ' + B('μ̂ = 22.5/10 = 2.25') + ' والـ ' + B('σ̂² = (62.29 − 50.625)/9 = 1.30') + ' (ولو الـ logs من غير تقريب يطلعوا 2.27 و 1.32).') }]} />
        `),

        // 48 · lognormal: ours, and the correlation
        page(html`
          <${H2}>${t('Ours, and the correlation (revision sheet Q31)', 'نسخة من عندنا، والـ correlation (الشيت سؤال 31)')}</${H2}>
          <${Fill} id="logO" rows=${[
            [t('Ours: X = 2.7, 7.4, 20.1, 1.0, 54.6 (lognormal). μ̂?', 'من عندنا: الـ X هي ' + B('2.7, 7.4, 20.1, 1.0, 54.6') + ' (lognormal). الـ μ̂؟'), 2.0, 'ln X ≈ 1.0, 2.0, 3.0, 0.0, 4.0 → 10/5 = 2.0', 0.006],
            [t('Same data: σ̂²?', 'نفس الداتا: الـ σ̂²؟'), 2.5, '(30 − 5 × 2²)/4 = 2.5', 0.011],
            [t('Example 6.9: ΣX₁X₂ = 6328.5, X̄₁ = 6.14, X̄₂ = 101.80, n = 10. cov?', 'مثال 6.9:' + L('ΣX₁X₂ = 6328.5, X̄₁ = 6.14, X̄₂ = 101.80, n = 10') + 'الـ cov كام؟'), 8.66, '[6328.5 − 10(6.14)(101.80)]/9 = 8.66', 0.011],
            [t('Same: σ̂₁ = 1.02, σ̂₂ = 9.93. ρ̂?', 'ولو ' + B('σ̂₁ = 1.02, σ̂₂ = 9.93') + '، الـ ρ̂ كام؟'), 0.86, '8.66/(1.02 × 9.93) = 0.86: strongly dependent', 0.006]]} />
        `),
        // 49 · cake shop: the model
        page(html`
          <${H2}>${t('Problem 6 · the cake shop with goodwill (Final 2025/26 Q3-b)', 'المسألة 6 · الـ cake shop بالـ goodwill (سؤال 3-b في 2025/26)')}</${H2}>
          <${P} small=${true}>${X('<b>i) [5 marks]</b> the profit model, with P = $8, C = $5, scrap S = $3 and goodwill u = $5 per unsatisfied order.', 'في الجزء <b>i</b> (5 درجات) اكتب الـ profit model، والسعر ' + B('P = $8') + ' والتكلفة ' + B('C = $5') + ' والـ scrap ' + B('S = $3') + ' والـ goodwill ' + B('u = $5') + ' لكل طلب ماتلبّاش.')}</${P}>
          <${Pick} id="cakeM" rows=${[
            { q: t('x ≤ d (you run out): z = ?', 'لو ' + B('x ≤ d') + ' (البضاعة خلصت): الـ z كام؟'), o: ['8x − 5d', '3x', '5d − 2x'], a: 0, w: t('3x forgets the goodwill: (P − C)x − u(d − x) = 3x − 5d + 5x.', 'الـ 3x ناسية الـ goodwill:' + L('(P − C)x − u(d − x) = 3x − 5d + 5x')) },
            { q: t('x &gt; d (leftovers go as scrap): z = ?', 'لو ' + B('x > d') + ' (الباقي بيتباع scrap): الـ z كام؟'), o: ['5d − 2x', '8x − 5d', '3d'], a: 0, w: t('(P − S)d + (S − C)x = 5d − 2x; no goodwill, every order is met.', 'الحساب' + L('(P − S)d + (S − C)x = 5d − 2x') + 'ومفيش goodwill لأن كل الطلبات اتلبّت.') }]} />
          <div dir="ltr">${tb(['d', '0', '10', '20', '30', '40', '50', '60', '70', '80'], [['p', '.05', '.10', '.05', '.10', '.15', '.30', '.15', '.05', '.05'], ['cum', '.05', '.15', '.20', '.30', '.45', '.75', '.90', '.95', '1']], 'num')}</div>
          <${Hand} red=${true}>${t('Lower end included: 0.15 → 20, 0.75 → 60. If you read R = F(x) as x itself (0.15 → 10), say so: totals become 850 and 750, and 60 still wins.', 'الطرف الصغير داخل: الـ 0.15 بتدّي 20 والـ 0.75 بتدّي 60. ولو قريتها بالطريقة التانية (0.15 بتدّي 10) اكتب ده: المجاميع تبقى 850 و750، والـ 60 برضه الأحسن.')}</${Hand}>
        `),

        // 50 · cake shop: the paper's 10 days
        page(html`
          <${H2}>${t('ii) Ten days at x = 60 and x = 80', 'الجزء ii: عشر أيام بإنتاج 60 و80')}</${H2}>
          <${Grid} id="cakeP" sets=${[{ tab: 'p', ask: A ? 'الـ RNs من الورقة. لو ' + B('x ≤ d') + ' يبقى ' + B('z = 8x − 5d') + '، غير كده ' + B('z = 5d − 2x') + '.' : 'RNs from the paper. x ≤ d: z = 8x − 5d; x &gt; d: z = 5d − 2x.',
            head: ['Day', 'RN', 'd', 'z (60)', 'z (80)'], cols: ['34px', '46px', null, null, null], tot: true,
            rows: [[0.99, 80], [0.15, 20], [0.33, 40], [0.35, 40], [0.91, 70], [0.41, 40], [0.60, 50], [0.27, 30], [0.75, 60], [0.88, 60]].map(([R, d], i) => {
              const z = x => x <= d ? 8 * x - 5 * d : 5 * d - 2 * x; return [i + 1, R.toFixed(2).replace(/^0/, ''), { a: d, tol: 0 }, { a: z(60), tol: 0 }, { a: z(80), tol: 0 }]; }).concat([['Σ', '', '', { a: 950, tol: 0 }, { a: 850, tol: 0 }]]),
            done: t('iii) <b>x = 60</b> is best: $950 against $850. Producing 80 leaves too many cakes sold as scrap at C − S = $2 loss each.', 'في الجزء iii الـ <b>' + B('x = 60') + '</b> هي الأحسن: 950$ قصاد 850$. إنتاج 80 بيسيب تورت كتير بتتباع scrap وبنخسر ' + B('C − S = $2') + ' في الواحدة.') }]} />
        `),

        // 51 · cake shop: ours
        page(html`
          <${H2}>${t('A fresh shop (ours)', 'محل جديد (من عندنا)')}</${H2}>
          <${Grid} id="cakeO" sets=${[{ tab: 'o', ask: A ? 'من عندنا: ' + B('P = 6, C = 4, S = 2, u = 3') + '، ونفس جدول الطلب، والإنتاج 40 و60.' : 'Ours: P = 6, C = 4, S = 2, u = 3, the same demand table; try x = 40 and x = 60.',
            head: ['Day', 'RN', 'd', 'z (40)', 'z (60)'], cols: ['34px', '46px', null, null, null], tot: true,
            rows: [[0.07, 10], [0.52, 50], [0.81, 60], [0.24, 30], [0.96, 80], [0.46, 50], [0.18, 20], [0.67, 50], [0.33, 40], [0.90, 70]].map(([R, d], i) => {
              const z = x => x <= d ? 5 * x - 3 * d : 4 * d - 2 * x; return [i + 1, R.toFixed(2).replace(/^0/, ''), { a: d, tol: 0 }, { a: z(40), tol: 0 }, { a: z(60), tol: 0 }]; }).concat([['Σ', '', '', { a: 200, tol: 0 }, { a: 430, tol: 0 }]]),
            done: t('Model: x ≤ d → (6 − 4)x − 3(d − x) = 5x − 3d; x &gt; d → (6 − 2)d + (2 − 4)x = 4d − 2x. <b>x = 60</b> wins, $430 against $200 (other reading of 0.90: 460 and 230).', 'الـ model: لو ' + B('x ≤ d') + ' يبقى ' + B('5x − 3d') + '، ولو ' + B('x > d') + ' يبقى ' + B('4d − 2x') + '. والـ <b>' + B('x = 60') + '</b> بتكسب: 430$ قصاد 200$ (ولو قريت الـ 0.90 بالطريقة التانية: 460 و230).') }]} />
        `),

        // 52 · inventory: the method
        page(html`
          <${H2}>${t('Problem 7 · the weekly inventory (Final 2024/25 Q3-b)', 'المسألة 7 · المخزون الأسبوعي (سؤال 3-b في 2024/25)')}</${H2}>
          <${P} small=${true}>${X('Q = 15, reorder point r = 5, start with 10. Holding $5 per unit per week (on the ending stock), $200 per order, $20 per unit short. Lead time L in weeks.', 'الـ ' + B('Q = 15') + ' ونقطة الطلب ' + B('r = 5') + ' ونبدأ بـ 10. التخزين 5$ للوحدة في الأسبوع (على آخر الأسبوع)، و200$ للطلبية، و20$ لكل وحدة ناقصة. والـ lead time بالأسابيع.')}</${P}>
          <div dir="ltr">${tb(['D', '0', '1', '2', '3', '4', '5'], [['p', '.10', '.30', '.20', '.30', '.05', '.05'], ['cum', '.10', '.40', '.60', '.90', '.95', '1']], 'num')}
          ${tb(['L', '1', '2', '3', '4'], [['p', '.20', '.15', '.60', '.05'], ['cum', '.20', '.35', '.95', '1']], 'num')}</div>
          <${Box} kind="watch"><p className="hf-p small">${X('Never place a <b>second order</b> while one is outstanding (week 5: stock 0, but the week 4 order is on its way). An order placed in week t with L = 2 arrives at the <b>start of week t + 2</b>. Shortages are lost, not back-ordered.', 'متطلبش <b>طلبية تانية</b> وفيه واحدة لسه في الطريق (أسبوع 5: المخزون صفر، بس طلبية أسبوع 4 جاية). والطلبية اللي اتطلبت أسبوع t بـ ' + B('L = 2') + ' بتوصل <b>أول أسبوع ' + B('t + 2') + '</b>. والعجز بيضيع، مش بيتأجل.')}</p></${Box}>
        `),

        // 53 · inventory: the paper
        page(html`
          <${H2}>${t('Be the warehouse: the paper\'s 10 weeks', 'اشتغل إنت المخزن: العشر أسابيع بتوع الورقة')}</${H2}>
          <${InvStep} id="invP" d=${INV_A} />
          <${Grow} />
          <${Hand}>${t('Paper\'s answer: 445 + 400 + 20 = $865. The orders come in weeks 4 (L = 2) and 8 (L = 1).', 'الإجابة: ' + B('445 + 400 + 20 = $865') + '، وطلبيتين في أسبوع 4 و8.')}</${Hand}>
        `),

        // 54 · inventory: ours
        page(html`
          <${H2}>${t('A fresh run (ours): 6 weeks', 'تشغيلة جديدة من عندنا: 6 أسابيع')}</${H2}>
          <${P} small=${true}>${X('Ours: the same tables and costs, but Q = 10, r = 4, start with 8.', 'من عندنا: نفس الجداول والتكاليف، بس ' + B('Q = 10') + ' و' + B('r = 4') + ' ونبدأ بـ 8.')}</${P}>
          <${InvStep} id="invO" d=${INV_B} />
          <${Grow} />
          <${Talk} who="disk">${X('Week 4: shelf empty and still <b>no</b> order. The one from week 2 is on the road (L = 3, arrives in week 5).', 'أسبوع 4: الرف فاضي ومع ذلك <b>مفيش</b> طلبية. طلبية أسبوع 2 لسه في الطريق ' + B('(L = 3)') + '، هتوصل أسبوع 5.')}</${Talk}>
        `),

        // 55 · likely: K-S
        page(html`
          <${H2}>${t('Likely 1 · the K-S test (L4)', 'متوقع 1 · اختبار الـ K-S (المحاضرة 4)')}</${H2}>
          <${P} small=${true}>${X('Not yet on a final, but it is the lecture\'s first test and the gap test ends with it. Sort first; N = 5, α = 0.05, Dα = 0.565.', 'لسه ماجاش في final، بس ده أول اختبار في المحاضرة والـ gap test بيخلص بيه. رتّب الأول، و' + B('N = 5, α = 0.05, Dα = 0.565') + '.')}</${P}>
          <${Grid} id="ks" sets=${[
            { tab: t('Lecture: .44 .81 .14 .05 .93', 'المحاضرة'), head: ['i', 'R(i)', 'i/N', 'i/N − R', 'R − (i−1)/N'], cols: ['24px', null, '40px', null, null],
              rows: [0.05, 0.14, 0.44, 0.81, 0.93].map((r, i) => [i + 1, { a: r, s: String(r) }, ((i + 1) / 5).toFixed(1), { a: +((i + 1) / 5 - r).toFixed(2), tol: 0.0051 }, { a: +(r - i / 5).toFixed(2), tol: 0.0051 }]),
              x: [['D⁺', 0.26, 0.0051], ['D⁻', 0.21, 0.0051], ['D', 0.26, 0.0051]], done: t('D = 0.26 &lt; 0.565: uniformity is <b>not rejected</b>.', 'الـ ' + B('D = 0.26 < 0.565') + '، يعني الـ uniformity <b>مش مرفوضة</b>.') },
            { tab: t('Ours: .62 .17 .83 .39 .95', 'من عندنا'), head: ['i', 'R(i)', 'i/N', 'i/N − R', 'R − (i−1)/N'], cols: ['24px', null, '40px', null, null],
              rows: [0.17, 0.39, 0.62, 0.83, 0.95].map((r, i) => [i + 1, { a: r, s: String(r) }, ((i + 1) / 5).toFixed(1), { a: +((i + 1) / 5 - r).toFixed(2), tol: 0.0051 }, { a: +(r - i / 5).toFixed(2), tol: 0.0051 }]),
              x: [['D⁺', 0.05, 0.0051], ['D⁻', 0.23, 0.0051], ['D', 0.23, 0.0051]], done: t('D = 0.23 &lt; 0.565: not rejected. Negative differences are fine; only the maximum counts.', 'الـ ' + B('D = 0.23 < 0.565') + '، مش مرفوضة. والفروق السالبة عادي، المهم الـ max بس.') }]} />
        `),

        // 56 · likely: chi-square
        page(html`
          <${H2}>${t('Likely 2 · chi-square for uniformity or poker', 'متوقع 2 · الـ χ² للـ uniformity أو الـ poker')}</${H2}>
          <${Grid} id="chi" sets=${[
            { tab: t('Lecture: poker, 1000 numbers', 'المحاضرة: الـ poker'), ask: t('3-digit numbers: all different 0.72, one pair 0.27, three alike 0.01. df = 2, χ²0.05 = 5.99.', 'أرقام من 3 خانات: كلهم مختلفين 0.72، و pair واحد 0.27، والتلاتة زي بعض 0.01. و' + B('df = 2, χ²0.05 = 5.99') + '.'),
              head: [t('class', 'الفئة'), 'O', 'E', '(O − E)²/E'], cols: [null, '44px', null, null],
              rows: [[t('all differ', 'مختلفين'), 680, { a: 720, tol: 0 }, { a: 2.222, tol: 0.006 }], [t('one pair', 'زوج'), 289, { a: 270, tol: 0 }, { a: 1.337, tol: 0.006 }], [t('three alike', 'تلاتة'), 31, { a: 10, tol: 0 }, { a: 44.1, tol: 0.006 }]],
              x: [['χ₀²', 47.66, 0.011]], done: t('47.66 &gt; 5.99: independence is <b>rejected</b> (the slide prints 47.65).', 'الـ ' + B('47.66 > 5.99') + '، يعني الـ independence <b>مرفوضة</b> (السلايد كاتبة 47.65).') },
            { tab: t('Ours: 60 numbers, 4 cells', 'من عندنا: 60 رقم'), ask: t('Ours: 60 numbers in 4 equal intervals. df = 3, χ²0.05 = 7.81.', 'من عندنا: 60 رقم في 4 فترات متساوية. و' + B('df = 3, χ²0.05 = 7.81') + '.'),
              head: [t('interval', 'الفترة'), 'O', 'E', '(O − E)²/E'], cols: [null, '44px', null, null],
              rows: [['0–.25', 12, { a: 15, tol: 0 }, { a: 0.6, tol: 0.006 }], ['.25–.5', 18, { a: 15, tol: 0 }, { a: 0.6, tol: 0.006 }], ['.5–.75', 14, { a: 15, tol: 0 }, { a: 0.0667, tol: 0.006 }], ['.75–1', 16, { a: 15, tol: 0 }, { a: 0.0667, tol: 0.006 }]],
              x: [['χ₀²', 1.333, 0.011]], done: t('1.33 &lt; 7.81: uniformity is not rejected. E = N/n = 60/4 = 15 ≥ 5, and N ≥ 50.', 'الـ ' + B('1.33 < 7.81') + '، يعني الـ uniformity مش مرفوضة. والـ ' + B('E = 60/4 = 15 ≥ 5') + ' والـ ' + B('N ≥ 50') + '.') }]} />
        `),

        // 57 · likely: the queue table
        page(html`
          <${H2}>${t('Likely 3 · a single-server queue table (L2)', 'متوقع 3 · جدول queue بـ server واحد (المحاضرة 2)')}</${H2}>
          <${Grid} id="que" sets=${[
            { tab: t('Lecture: 6 customers', 'المحاضرة'), head: ['#', 'arr', 'serv', 'begin', 'end', 'wait', 'idle'], cols: ['22px', '34px', '34px', null, null, null, null],
              rows: [[0, 2], [2, 1], [6, 3], [7, 2], [9, 1], [15, 4]].map(([a, s], i) => { const B0 = [0, 2, 6, 9, 11, 15][i], E0 = [2, 3, 9, 11, 12, 19][i], W = [0, 0, 0, 2, 2, 0][i], I = [0, 0, 3, 0, 0, 3][i]; return [i + 1, a, s, { a: B0, tol: 0 }, { a: E0, tol: 0 }, { a: W, tol: 0 }, { a: I, tol: 0 }]; }),
              x: [[t('Σ wait', 'مجموع الانتظار'), 4, 0], [t('Σ idle', 'مجموع الـ idle'), 6, 0]], done: t('w̄ = 4/6 = 0.67; the server is idle 6 of 19 minutes.', 'الـ ' + B('w̄ = 4/6 = 0.67') + '، والـ server فاضي 6 من 19 دقيقة.') },
            { tab: t('Ours', 'من عندنا'), head: ['#', 'arr', 'serv', 'begin', 'end', 'wait', 'idle'], cols: ['22px', '34px', '34px', null, null, null, null],
              rows: [[0, 3], [4, 5], [5, 4], [11, 2], [13, 3], [18, 2]].map(([a, s], i) => { const B0 = [0, 4, 9, 13, 15, 18][i], E0 = [3, 9, 13, 15, 18, 20][i], W = [0, 0, 4, 2, 2, 0][i], I = [0, 1, 0, 0, 0, 0][i]; return [i + 1, a, s, { a: B0, tol: 0 }, { a: E0, tol: 0 }, { a: W, tol: 0 }, { a: I, tol: 0 }]; }),
              x: [[t('Σ wait', 'مجموع الانتظار'), 8, 0], [t('Σ time in system', 'مجموع الوقت في الـ system'), 27, 0]], done: t('w̄ = 8/6 = 1.33; t̄ = 27/6 = 4.5 = w̄ + s̄ (19/6 = 3.17). Customer 6 arrives at 18 just as 5 leaves: no idle.', 'الـ ' + B('w̄ = 8/6 = 1.33') + ' والـ ' + B('t̄ = 27/6 = 4.5 = w̄ + s̄') + '. والزبون 6 وصل 18 في نفس لحظة ما الخامس مشي، فمفيش idle.') }]} />
          <${Hand}>${t('begin = max(arrival, previous end). Wait and idle can\'t both be positive for one customer.', 'الـ begin هو الأكبر من الوصول والنهاية اللي قبله. والـ wait والـ idle مينفعش الاتنين يبقوا موجبين لنفس الزبون.')}</${Hand}>
        `),

        // 58 · likely: random variates
        page(html`
          <${H2}>${t('Likely 4 · generate the variate (L5)', 'متوقع 4 · طلّع الـ variate (المحاضرة 5)')}</${H2}>
          <${P} small=${true}>${X('Past finals have no written L5 problem; the final summary lists these as likely. Ours, each from one R:', 'الـ finals اللي فاتت مفيهاش مسألة من المحاضرة 5، والـ final summary بيقول دول متوقعين. من عندنا، كل واحدة من R واحد:')}</${P}>
          <${Fill} id="var" rows=${[
            [t('Exponential, λ = 4, R = 0.6: X = −(1/λ) ln(1 − R)', 'الـ exponential بـ ' + B('λ = 4') + ' و' + B('R = 0.6')), 0.229, '−0.25 ln 0.4 = 0.229', 0.002],
            [t('Uniform [5, 15], R = 0.42', 'الـ uniform على ' + B('[5, 15]') + ' و' + B('R = 0.42')), 9.2, '5 + 10(0.42) = 9.2', 0.006],
            [t('Triangular (0, 1, 2), R = 0.18', 'الـ triangular و' + B('R = 0.18')), 0.6, 'R ≤ ½: √(2 × 0.18) = √0.36 = 0.6', 0.006],
            [t('Triangular (0, 1, 2), R = 0.68', 'الـ triangular و' + B('R = 0.68')), 1.2, 'R &gt; ½: 2 − √(2 × 0.32) = 2 − 0.8 = 1.2', 0.006]]} />
        `),

        // 58b · variates (2)
        page(html`
          <${H2}>${t('Discrete ones, and the Poisson', 'الـ discrete، والـ Poisson')}</${H2}>
          <${Fill} id="var2" rows=${[
            [t('Discrete uniform 1..8, R = 0.42', 'الـ discrete uniform من 1 لـ 8 و' + B('R = 0.42')), 4, '⌈0.42 × 8⌉ = ⌈3.36⌉ = 4', 0],
            [t('Geometric on {1, 2, …}, p = 0.5, R = 0.8', 'الـ geometric من 1 و' + B('p = 0.5, R = 0.8')), 3, '1 + ⌈ln 0.2/ln 0.5 − 1⌉ = 1 + ⌈1.32⌉ = 3', 0]]} />
          <${Hand}>${t('Poisson by products (Example 5.7, α = 0.2): stop when P &lt; e^(−0.2) = 0.8187. ‡ 0.8353 × 0.9952 = 0.8313; the notes print 0.8312 (same result).', 'الـ Poisson بالضرب (مثال 5.7): وقّف لما ' + B('P < e^(−0.2) = 0.8187') + '. ‡ الـ ' + B('0.8353 × 0.9952 = 0.8313') + '، والـ notes كاتبة 0.8312 (نفس النتيجة).')}</${Hand}>
        `),
        // 59 · fireside: the two chi-squares
        page(html`
          <${Fireside} sub=${t('Tonight\'s talk: the chi-square from Lecture 4 meets the chi-square from Lecture 6.', 'قعدة الليلة: الـ χ² بتاع المحاضرة 4 قاعد مع الـ χ² بتاع المحاضرة 6.')} />
          <${Chat} names=${[t('χ² (L4)', 'الـ χ² (4)'), t('χ² (L6)', 'الـ χ² (6)')]} lines=${A ? [
            [0, 'أنا بختبر الـ <b>random numbers</b>: هل هي uniform على (0, 1)؟ فتراتي متساوية و' + B('E = N/n') + '.'],
            [1, 'وأنا بختبر <b>الداتا الحقيقية</b>: هل هي جاية من الـ distribution اللي اخترناها؟ والـ ' + B('Eᵢ = n·pᵢ') + ' من الـ distribution دي.'],
            [0, 'الـ df بتاعي سهل: ' + B('n − 1') + '. وفي الـ poker عندي 3 فئات فيبقى 2.'],
            [1, 'أنا بدفع تمن كل parameter قدّرته: ' + B('df = k − s − 1') + '. الـ Poisson بـ α متقدّرة يبقى ' + B('s = 1') + '.'],
            [0, 'وأنا محتاج ' + B('N ≥ 50') + ' وكل E على الأقل 5.'],
            [1, 'نفس الكلام، ولو خانة طلعت أقل من 5 بدمجها مع جارتها، ومعاها الـ O بتاعها.'],
            [0, 'يعني إحنا نفس المعادلة؟'],
            [1, 'نفس ' + B('Σ(O − E)²/E') + '، بس سؤال مختلف. اقرا الكلام الأول قبل ما تختار الـ df.']
          ] : [
            [0, 'I test <b>random numbers</b>: are they uniform on (0, 1)? My intervals are equal, E = N/n.'],
            [1, 'I test <b>real data</b>: does it come from the distribution we picked? My Eᵢ = n·pᵢ come from that distribution.'],
            [0, 'My df is easy: n − 1. In the poker test, 3 classes → 2.'],
            [1, 'I pay for every parameter I estimate: df = k − s − 1. A Poisson with α estimated has s = 1.'],
            [0, 'I need N ≥ 50 and every E ≥ 5.'],
            [1, 'Same here; a cell under 5 is merged into its neighbour, its O with it.'],
            [0, 'So we are the same formula?'],
            [1, 'The same Σ(O − E)²/E, a different question. Read the words before you pick the df.']]} />
        `, { sec: t('Across the lectures', 'بين المحاضرات') }),

        // 60 · interview: the Poisson, in three lectures
        page(html`
          <${Interview} title=${t('The Poisson, in three lectures', 'الـ Poisson في تلات محاضرات')} sub=${t('This week: the distribution the doctors ask about every year.', 'حوار الأسبوع: الـ distribution اللي الدكاترة بيسألوا عليها كل سنة.')} lines=${A ? [
            ['المذيع', 'إنتي فين في المادة؟'],
            ['الـ Poisson', 'في المحاضرة 3 أنا ' + B('p(x) = e^(−α)αˣ/x!') + '، والـ mean والـ variance الاتنين α. وده سؤال 3-a في ' + B('2025/26') + '.'],
            ['المذيع', 'وفي المحاضرة 5؟'],
            ['الـ Poisson', 'بتطلّعني بضرب R ورا R لحد ما الحاصل يبقى أقل من ' + B('e^(−α)') + '. والـ ' + B('N = n') + ' بتاخد ' + B('n + 1') + ' أرقام.'],
            ['المذيع', 'وفي المحاضرة 6؟'],
            ['الـ Poisson', 'هناك بيقدّروا الـ ' + B('α̂ = X̄') + ' وبيختبروني بالـ χ². والعربيات ماعدّتش: ' + B('27.68 > 11.07') + '.'],
            ['المذيع', 'وإيه علاقتك بالـ exponential؟'],
            ['الـ Poisson', 'لو العدد في الوقت Poisson بمعدل λ، يبقى الوقت بين الوصول exponential بـ mean ' + B('1/λ') + '. وأنا السؤال اللي بيقول "number of independent events in a fixed time".']
          ] : [
            ['Head First', 'Where are you in this course?'],
            ['Poisson', 'In Lecture 3 I am p(x) = e^(−α)αˣ/x!, with mean and variance both α. That was Q3-a in 2025/26.'],
            ['Head First', 'And Lecture 5?'],
            ['Poisson', 'You generate me by multiplying R after R until the product drops below e^(−α). N = n uses n + 1 numbers.'],
            ['Head First', 'And Lecture 6?'],
            ['Poisson', 'There you estimate α̂ = X̄ and test me with χ². The vehicles failed: 27.68 &gt; 11.07.'],
            ['Head First', 'And the exponential?'],
            ['Poisson', 'If counts per time are Poisson with rate λ, the times between arrivals are exponential with mean 1/λ. I am the answer to "number of independent events in a fixed time".']]} />
        `),

        // 61 · who am I? course-wide
        page(html`
          <${H2}>${t('Who am I? The whole course', 'أنا مين؟ المادة كلها')}</${H2}>
          <${P} small=${true}>${X('Seven formulas and rules, seven owners.', 'سبع قوانين وقواعد، ولكل واحد صاحبه.')}</${P}>
          <${Match} id="who" left=${A ? ['الـ LCG', 'اختبار الـ runs', 'الـ inverse transform', 'الـ Q-Q plot', 'الـ trace', 'الـ cake shop', 'جدول الـ queue']
            : ['LCG', 'Runs test', 'Inverse transform', 'Q-Q plot', 'Trace', 'Cake shop', 'Queue table']}
            right=${A ? ['الـ begin هو max الوصول والنهاية اللي قبله', B('Xᵢ₊₁ = (aXᵢ + c) mod m'), B('z = (P − S)d + (S − C)x'), 'خط مستقيم يبقى الـ family صح', 'بنراجعه بحسابات بإيدنا', B('X = F⁻¹(R)'), B('μa = (2N − 1)/3')]
              : ['begin = max(arrival, previous end)', 'Xᵢ₊₁ = (aXᵢ + c) mod m', 'z = (P − S)d + (S − C)x', 'a straight line → right family', 'checked by hand calculations', 'X = F⁻¹(R)', 'μa = (2N − 1)/3']}
            answer=${[1, 6, 5, 3, 4, 2, 0]} />
        `),

        // exam corner (1)
        page(html`
          <${H2}>${t('Exam corner · the doctors\' questions', 'ركن الامتحان · أسئلة الدكاترة')}</${H2}>
          ${mq('e1', /Step 1 for Performing Simulation/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        // exam corner (2)
        page(html`
          ${mq('e2', /special-purpose simulation languages include/)}
        `),
        // exam corner (3)
        page(html`
          ${mq('e3', /think time is the time between system starting/)}
        `),
        // exam corner (4)
        page(html`
          ${mq('e4', /Modula and ADA/, /^Exam/)}
        `),
        // exam corner (5)
        page(html`
          ${mq('e5', /System Endogenous are activities/)}
        `),
        // exam corner (6)
        page(html`
          ${mq('e6', /not an Application Areas/)}
        `),
        // exam corner (7)
        page(html`
          ${mq('e7', /most common form of dynamic simulation/)}
        `),
        // exam corner (8)
        page(html`
          ${mq('e8', /normal \(10,1\/2\)/)}
        `),
        // exam corner (9)
        page(html`
          ${mq('e9', /mean 80 and variance 4 are ---/)}
        `),
        // exam corner (10)
        page(html`
          ${mq('e10', /median parameter is the most likely/)}
        `),
        // exam corner (11)
        page(html`
          ${mq('e11', /^Number of independent events that occur/)}
        `),
        // exam corner (12)
        page(html`
          ${mq('e12', /Y = \(X \+ 1\)\/2/)}
        `),
        // practice question (not the doctors')
        page(html`
          <${Box} kind="pencil" title=${t('Practice questions', 'أسئلة تدريب')}>
            ${pq('p2', /cake shop model with P = \$4\.50/)}
          </${Box}>
          <${P} small=${true}>${t('This one is a site practice question, not the doctors\'.', 'السؤال ده سؤال تدريب من الموقع، مش من الدكاترة.')}</${P}>
        `),

        // 70 · exam day: the time plan
        page(html`
          <${H2}>${t('Exam day: a time plan (ours)', 'يوم الامتحان: خطة وقت (من عندنا)')}</${H2}>
          <${P} small=${true}>${X('Our suggestion for 120 minutes and 60 marks: about 2 minutes a mark, with a buffer at the end.', 'اقتراح من عندنا لـ 120 دقيقة و60 درجة: حوالي دقيقتين للدرجة، ومعاهم وقت احتياطي في الآخر.')}</${P}>
          <div className="hf-msF-plan hf-in">${[[25, 'Q2', 'k'], [15, 'Q3-a', ''], [30, 'Q3-b', 'k'], [20, 'Q1-a', ''], [20, 'Q1-b', 'k'], [10, '✓', '']].map(([m, l, c], i) => html`<span key=${i} className=${c} style=${{ flex: m }}>${l}</span>`)}</div>
          ${tb(A ? ['الدقايق', 'تعمل إيه'] : ['Minutes', 'Do'], A ? [
            ['25', 'سؤال 2: الـ LCG (اكتب X و R والـ period والقاعدة)، وبعدين الاختبار بالـ critical value الصح'],
            ['15', 'سؤال 3-a: اكتب القانون الأول، ودايمًا ' + B('1 − F(1)') + ' لـ "2 أو أكتر"'],
            ['30', 'سؤال 3-b: الفترات، وبعدين جدول صف بصف، وبعدين المجموع والقرار'],
            ['20', 'سؤال 1-a: الـ 10 اختياري، وسيب اللي محتار فيه'],
            ['20', 'سؤال 1-b: الـ 10 صح وغلط، ودوّر على الكلمة اللي بتقلب المعنى'],
            ['10', 'راجع الحسابات، والـ R = X/m، والـ df، ورجّع للأسئلة اللي سبتها']]
            : [['25', 'Q2: the LCG (X, R, period and the rule), then the test with the right critical value'],
            ['15', 'Q3-a: formula first; "two or more" is 1 − F(1)'],
            ['30', 'Q3-b: the intervals, the table row by row, the totals and the decision'],
            ['20', 'Q1-a: the 10 MCQs; skip what you are unsure of'],
            ['20', 'Q1-b: the 10 T/F; look for the one word that flips it'],
            ['10', 'recheck arithmetic, R = X/m, the df, and the skipped items']], '', [0])}
          <${Grow} />
          <${Hand}>${t('Ours: start with the 40 marks of problems while your head is fresh; the T/F go fast at the end.', 'من عندنا: ابدأ بالـ 40 درجة بتوع المسايل ودماغك لسه فايقة، والصح والغلط بيخلصوا بسرعة في الآخر.')}</${Hand}>
        `, { sec: t('Exam day', 'يوم الامتحان') }),

        // 71 · exam day: the checklist
        page(html`
          <${H2}>${t('The night before and the morning of', 'الليلة اللي قبلها والصبح')}</${H2}>
          <${UL} items=${A ? ['معاك <b>calculator</b> فيها ln و √ و e^x، وجرّبت ' + B('mod 64') + ' عليها.', 'حافظ الـ critical values: ' + B('1.96') + ' و' + B('2.576') + ' و' + B('0.565 (N = 5)') + ' و' + B('3.84, 5.99, 7.81, 11.07') + '.', 'حافظ قواعد الـ period التلاتة، وإن الـ seed الزوجي مع ' + B('c = 0') + ' بيقصّر الـ period.', 'حافظ ' + B('μa') + ' و' + B('σa²') + ' والـ M والـ ' + B('σ̂') + ' بتوع الـ autocorrelation.', 'عارف موديل الـ cake shop بالـ goodwill من غير ما تبص.', 'عارف ترتيب أسبوع المخزون: استلم، طلب، اصرف، اطلب.', 'قريت الـ 12 خطوة والـ GPSS/H والأوقات التلاتة (reaction و response و think) مرة أخيرة.', 'نمت كويس: الحسابات الطويلة محتاجة دماغ فايقة (من عندنا).']
            : ['A <b>calculator</b> with ln, √ and eˣ; you have tried mod 64 on it.', 'Critical values by heart: 1.96, 2.576, 0.565 (N = 5), 3.84, 5.99, 7.81, 11.07.', 'The three period rules, and that an even seed with c = 0 cuts the period.', 'μa, σa², and the autocorrelation M and σ̂.', 'The cake-shop model with goodwill, without looking.', 'The inventory week order: receive, demand, ship, order.', 'One last read of the 12 steps, GPSS/H and the three times (reaction, response, think).', 'Sleep: long tables need a fresh head (ours).']} />
          <${Grow} />
          <${Talk} who="clock">${X('Time zero is when the paper lands. Advance event by event, and don\'t stop the clock on one cell.', 'الزمن صفر هو لما الورقة تنزل قدامك. اتقدّم حدث ورا حدث، ومتوقفش الساعة على خانة واحدة.')}</${Talk}>
        `),

        // 72 · bullet points (1)
        page(html`
          <${Bullets} items=${A ? ['المحاضرة 1 بتجيب حوالي تلتين الـ 20 سؤال الأولانيين: الـ components والـ models والـ 3 أوقات والـ 12 خطوة والأدوات، والـ GPSS/H هي الـ simulation language.', 'المحاضرة 2: ' + B('begin = max(arr, prev end)') + '، والـ IA̅ على ' + B('N − 1') + '، والـ stable لما الوصول أقل من الخدمة.', 'المحاضرة 3: الـ geometric بيبدأ من 1، و' + B('1 − F(1)') + ' لـ "2 أو أكتر"، والـ ' + B('N(μ, σ²)') + ' تاني رقم فيها variance، والـ mode هو الأكتر احتمالًا.', 'المحاضرة 4: الـ LCG بيدّي ' + B('R = X/m') + '، وقاعدة الـ period على حسب الـ c، والاختبارات بـ ' + B('1.96') + ' أو ' + B('2.576') + '، والـ 1.30 غلط.']
            : ['Lecture 1 gives about 2/3 of the first 20 items: components, models, the 3 times, the 12 steps, the tools; GPSS/H is the simulation language.', 'Lecture 2: begin = max(arr, prev end); average IA over N − 1; stable when arrival &lt; service.', 'Lecture 3: geometric starts at 1; "two or more" = 1 − F(1); N(μ, σ²) gives the variance second; the mode is the most likely value.', 'Lecture 4: an LCG hands in R = X/m; the period rule depends on c; tests use 1.96 or 2.576, never the 1.30 hint.']} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 73 · bullet points (2)
        page(html`
          <${Bullets} items=${A ? ['المحاضرة 5: الـ 4 خطوات بتوع الـ inverse transform، والـ triangular بيتحدد بـ ' + B('R ≤ ½') + '، والـ Poisson بالضرب لحد ' + B('e^(−α)') + '.', 'المحاضرة 6: الـ 4 خطوات، و' + B('S²') + ' على ' + B('n − 1') + '، والـ lognormal بعد الـ ln، و' + B('df = k − s − 1') + '.', 'المحاضرة 7: الـ verification هو الـ model صح، والـ validation هو الـ model الصح، والـ calibration والـ Turing test للـ validation.', 'المحاضرة 8: الـ cake shop ' + B('x ≤ d → (P − C)x − u(d − x)') + '، والمخزون مفيش طلبية تانية وفيه واحدة في الطريق، والفترات بتشمل طرفها الصغير.']
            : ['Lecture 5: the 4 steps of the inverse transform; the triangular branch by R ≤ ½; Poisson by products down to e^(−α).', 'Lecture 6: the 4 steps; S² over n − 1; lognormal after taking ln; df = k − s − 1.', 'Lecture 7: verification = the model right, validation = the right model; calibration and the Turing test are validation.', 'Lecture 8: cake shop x ≤ d → (P − C)x − u(d − x); inventory: no second order while one is outstanding; intervals include their lower end.']} />
          <${Grow} />
          <${Talk} who="dice" flip=${true}>${X('Every R has a job. You know them all now.', 'كل R ليه شغلانة. وإنت دلوقتي عارفهم كلهم.')}</${Talk}>
        `),

        // 74 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('The run is over. Now the real one.', 'الـ run خلص. دلوقتي الحقيقي.')}</${H1}>
            <${Talk} who="clock">${t('You have simulated the final event by event. Go do it for real.', 'عملت simulation للـ final حدث ورا حدث. روح اعمله بجد.')}</${Talk}>
            <${P}>${t('One more pass before the paper lands:', 'لفة كمان قبل ما الورقة تنزل:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], only: 'prof', t: Date.now() } }}>${t('The doctors\' questions', 'أسئلة الدكاترة')}</${K.Go}>
              <${K.Go} to=${{ mode: 'quiz', quizPreset: { lecs: [1, 2, 3, 4, 5, 6, 7, 8], mock: 40, t: Date.now() } }}>${t('Mock final (40)', 'امتحان تجريبي (40)')}</${K.Go}>
            </div>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} to=${{ mode: 'read', lec: 'fin', anchor: null }}>${t('The final summary', 'الـ final summary')}</${K.Go}>
              <${K.Go} to=${{ mode: 'papers' }}>${t('Past papers', 'الورق اللي فات')}</${K.Go}>
            </div>
          </div>
        `, { center: true })

      ];
    }
  };
})();

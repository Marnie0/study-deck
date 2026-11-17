// Head First chapter for Modeling & Simulation Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Random-number generation and tests for random numbers: random and pseudo-random numbers, the properties of a good routine,
// uniformity and independence, the midsquare method, the linear congruential method (examples, seeds, the spreadsheet, density,
// period, the three maximum-period rules), Java, general congruential generators, combined LCGs (L'Ecuyer), Excel 2003,
// hypotheses and α, the five tests: frequency (KS, chi-square), runs (up/down, above/below the mean, length of runs),
// autocorrelation, gap and poker; real random numbers.
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks the slide issues the notes flag.
// Every number was recomputed with node: midsquare 7182 → 5811, 7677, 9363, 6657, 3156, 9603, 2176, 7349, 78, 60, 36, 12, 1, 0 and
// 1234 → 5227, 3215, 3362; LCG (17, 43, 100, 27) → 2, 77, 52, 27; (13, 0, 64) periods 16, 8, 16, 4 for seeds 1-4; (13, 0, 32) seeds 2, 6
// period 4; (9, 3, 32, 7) → 2, 21, 0, 3, period 32; (11, 0, 32) seed 5 → period 8, seed 2 → 4; (3, 0, 7, 1) → 3, 2, 6, 4, 5, 1;
// (2, 0, 7, 1) → 2, 4, 1; (21, 17, 64, 1) → 38, 47, 44, 45, 2, period 64; L'Ecuyer with seeds 111, 222 (all 10 rows of the notes);
// KS on the 5 numbers D+ 0.26, D- 0.21; KS on 0.4375 … 0.1875 D+ 0.0625, D- 0.1875; slide 40 chi-square 11.2 (column sum 112);
// Example 4.5 counts and 3.4 (3.6 with 0.60); gap counts per digit, the 17 gaps of digit 3, the class table and D = 0.0224;
// autocorrelation i = 3 (−0.1945, 0.1280, −1.519) and i = 2 (−0.1341, −1.05); runs: a = 26, Z −0.13; b = 17, n1 18, n2 22, Z −1.07;
// the exam's 30 numbers a = 16, Z −1.64; slide 53 a = 7; Example 4.9 (40 runs, 26/9/5, E 25.08/10.77/3.04/0.78, χ² 0.057);
// Example 4.10 (n1 28, n2 32, 31 runs, 17/8/1/5, χ² 0.69); the 60 numbers a = 40, Z 0.10; poker 47.66 and 10.93.
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T4 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-ms4')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms4';
    s.textContent = `
.hfb .hf-ms4-tb{ display:grid; grid-template-columns:auto 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-ms4-tb > span{ padding:4px 8px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-ms4-tb > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-ms4-tb > span.r{ font:800 13.5px/1.3 var(--mono); color:var(--hf-k); background:var(--hf-grey); white-space:nowrap; }
.hfb .hf-ms4-cyc{ display:block; width:100%; height:auto; }
.hfb .hf-ms4-cyc .nd rect{ fill:var(--paper); stroke:var(--hf-line); stroke-width:2; transition:fill .3s; }
.hfb .hf-ms4-cyc .nd.on rect{ fill:color-mix(in srgb, var(--hf-k) 22%, var(--paper)); stroke:var(--hf-k); }
.hfb .hf-ms4-cyc text{ font-family:var(--mono); fill:var(--ink); }
.hfb .hf-ms4-cyc .back{ stroke:var(--faint); transition:stroke .3s; }
.hfb .hf-ms4-cyc .back.on{ stroke:var(--hf-red); }
.hfb .hf-ms4-dr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:6px; }
.hfb .hf-ms4-tabs{ display:flex; gap:5px; }
.hfb .hf-ms4-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms4-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-ms4-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-ms4-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-ms4-ask{ font-size:14px; line-height:1.32; margin:0; color:var(--ink); }
.hfb .hf-ms4-work{ font:600 13px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 8px; color:var(--ink); min-height:46px; }
.hfb .hf-ms4-work > div{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:hf-up .35s both; }
.hfb .hf-ms4-work .cur{ color:var(--hf-hand); }
.hfb .hf-ms4-q{ font:700 14px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-ms4-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-ms4-opts button{ font:700 13.5px/1.1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-ms4-bad{ font-size:13.5px; line-height:1.3; margin:0; color:var(--hf-red); }
.hfb .hf-ms4-ok{ font-size:13.5px; line-height:1.3; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-ms4-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-ms4-row .hf-btn{ padding:7px 9px; }
.hf-ar .hf-ms4-tb > span, .hf-ar .hf-ms4-ask, .hf-ar .hf-ms4-bad, .hf-ar .hf-ms4-ok, .hf-ar .hf-ms4-q{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.45; }
.hf-ar .hf-ms4-tb > span.r{ font-family:var(--mono); direction:ltr; text-align:left; }
.hf-ar .hf-ms4-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ms4-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-ms4-work{ direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: the LCG of slide 18 going round its cycle, 27 → 2 → 77 → 52 → 27
  function Cycle() {
    const xs = [27, 2, 77, 52];
    const [k, setK] = useState(calm() ? 4 : 0);
    useEffect(() => { if (calm()) return; const id = setInterval(() => setK(v => (v + 1) % 5), 950); return () => clearInterval(id); }, []);
    const X = i => 6 + i * 82;
    return html`<svg className="hf-ms4-cyc hf-in" viewBox="0 0 328 128" role="img" aria-label="X0 = 27, X1 = 2, X2 = 77, X3 = 52, and X4 = 27 again: the seed returns after 4 numbers" dir="ltr">
      <defs><marker id="hf-ms4-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--hf-line)" /></marker>
        <marker id="hf-ms4-ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill=${k === 4 ? 'var(--hf-red)' : 'var(--faint)'} /></marker></defs>
      <text x="164" y="15" textAnchor="middle" fontSize="13.5" fontWeight="700">X(i+1) = (17·X(i) + 43) mod 100</text>
      ${xs.map((x, i) => html`<g key=${i} className=${'nd' + (k === i || (k === 4 && i === 0) ? ' on' : '')}>
        <text x=${X(i) + 29} y="36" textAnchor="middle" fontSize="13">X${'₀₁₂₃'[i]}</text>
        <rect x=${X(i)} y="42" width="58" height="36" rx="7" />
        <text x=${X(i) + 29} y="66" textAnchor="middle" fontSize="18" fontWeight="800">${x}</text></g>`)}
      ${[0, 1, 2].map(i => html`<path key=${'a' + i} d=${`M${X(i) + 60} 60 H${X(i + 1) - 3}`} stroke="var(--hf-line)" strokeWidth="2" markerEnd="url(#hf-ms4-ar)" />`)}
      <path className=${'back' + (k === 4 ? ' on' : '')} d=${`M${X(3) + 29} 80 C${X(3) + 29} 112, ${X(0) + 29} 112, ${X(0) + 29} 82`} fill="none" strokeWidth="2.4" markerEnd="url(#hf-ms4-ar2)" />
      <text x="164" y="122" textAnchor="middle" fontSize="13" fill=${k === 4 ? 'var(--hf-red)' : 'var(--graphite)'} style=${{ fill: k === 4 ? 'var(--hf-red)' : 'var(--graphite)' }}>X₄ = 27 = X₀ → period 4</text>
    </svg>`;
  }

  // "Be the …" drills: problems worked one step at a time; every wrong option is a real slip and says which.
  function Drill({ id, data, ans }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id + ':p', 0);
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const [d0] = H.K.useSlot(id + ':0', 0), [d1] = H.K.useSlot(id + ':1', 0), [d2] = H.K.useSlot(id + ':2', 0), [d3] = H.K.useSlot(id + ':3', 0);
    const prog = [d0, d1, d2, d3];
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = data[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    const last = data.length - 1;
    return html`<div className="hf-ms4-dr hf-in">
      <div className="hf-ms4-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${data.map((_, j) => html`<button key=${j} className=${prog[j] >= data[j].steps.length ? 'dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? 'مسألة ' : 'Problem '}${j + 1}</button>`)}</div>
      <p className="hf-ms4-ask">${T4(ar ? P.ar : P.en)}</p>
      <div className="hf-ms4-work" dir="ltr">${P.steps.slice(0, k).map((s, j) => html`<div key=${p + '-' + j}>${s.w}</div>`)}${!done && html`<div className="cur">${st.l[0]}</div>`}</div>
      ${done ? html`<p className="hf-ms4-ok">${T4(ar ? `<b>خلصت!</b> النتيجة: <bdi dir="ltr"><b>${ans[p]}</b></bdi>.${p < last ? ' جرّب المسألة اللي بعدها.' : ''}` : `<b>Done!</b> Result: <b>${ans[p]}</b>.${p < last ? ' Try the next problem.' : ''}`)}</p>`
        : html`<p className="hf-ms4-q">${T4(ar ? st.l[1] : st.l[0])}</p><div className="hf-ms4-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${o}</button>`)}</div>`}
      ${bad && html`<p className="hf-ms4-bad">${T4(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-ms4-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'ورّيني الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div>
    </div>`;
  }

  // Be the generator: midsquare and LCG steps (checked with node)
  const GEN = [
    {
      en: '<b>Midsquare</b> with Z₀ = <b>1234</b>. Find Z₁, Z₂, Z₃.',
      ar: 'الـ <b>Midsquare</b> بـ seed قيمته <bdi dir="ltr">Z₀ = <b>1234</b></bdi>. هات Z₁ و Z₂ و Z₃.',
      steps: [
        { l: ['Z₀² as 8 digits?', 'مربع الـ Z₀ على 8 خانات كام؟'], o: ['1522756', '01522756', '15227560'], a: 1, w: '1234² = 01522756',
          h: [['That has only 7 digits: pad to 8 with a leading zero.', 'ده 7 خانات بس: كمّله لـ 8 بصفر من الشمال.'], null, ['Pad on the left, not the right.', 'الصفر بيتحط من الشمال، مش من اليمين.']] },
        { l: ['Z₁ = middle four digits?', 'الـ Z₁ (الـ 4 خانات اللي في النص) كام؟'], o: ['0152', '5227', '2275'], a: 1, w: 'Z₁ = 5227, U₁ = 0.5227',
          h: [['0152 are the first four digits.', 'الـ 0152 دول أول 4 خانات.'], null, ['Shifted one place: the middle four are digits 3 to 6.', 'ده متزحزح خانة: الـ 4 اللي في النص هما من الخانة 3 للـ 6.']] },
        { l: ['Z₂? (5227² = 27321529)', 'الـ Z₂ كام؟ <bdi dir="ltr">(5227² = 27321529)</bdi>'], o: ['2732', '3215', '1529'], a: 1, w: '5227² = 27321529 → Z₂ = 3215',
          h: [['2732 are the first four digits.', 'الـ 2732 دول أول 4 خانات.'], null, ['1529 are the last four digits.', 'الـ 1529 دول آخر 4 خانات.']] },
        { l: ['Z₃? (3215² = 10336225)', 'الـ Z₃ كام؟ <bdi dir="ltr">(3215² = 10336225)</bdi>'], o: ['3362', '1033', '6225'], a: 0, w: '3215² = 10336225 → Z₃ = 3362',
          h: [null, ['1033 are the first four digits.', 'الـ 1033 دول أول 4 خانات.'], ['6225 are the last four digits.', 'الـ 6225 دول آخر 4 خانات.']] }
      ]
    },
    {
      en: '<b>LCG</b>: a = 9, c = 3, m = 32, X₀ = 7. Find X₁ to X₃ and the longest possible period.',
      ar: 'الـ <b>LCG</b> ده: <bdi dir="ltr">a = 9, c = 3, m = 32, X₀ = 7</bdi>. هات من X₁ لـ X₃، وأطول period ممكن.',
      steps: [
        { l: ['X₁ = (9·7 + 3) mod 32?', 'الـ X₁ كام؟ <bdi dir="ltr">(9·7 + 3) mod 32</bdi>'], o: ['66', '2', '31'], a: 1, w: '9·7 + 3 = 66 mod 32 → X₁ = 2',
          h: [['66 still needs mod 32.', 'الـ 66 لسه محتاجة <bdi dir="ltr">mod 32</bdi>.'], null, ['31 = 63 mod 32: the + c was forgotten.', 'الـ 31 دي <bdi dir="ltr">63 mod 32</bdi>: نسيت الـ <bdi dir="ltr">+ c</bdi>.']] },
        { l: ['X₂ = (9·2 + 3) mod 32?', 'الـ X₂ كام؟ <bdi dir="ltr">(9·2 + 3) mod 32</bdi>'], o: ['18', '21', '0.65625'], a: 1, w: '9·2 + 3 = 21 → X₂ = 21',
          h: [['18 forgets the + c.', 'الـ 18 ناسية الـ <bdi dir="ltr">+ c</bdi>.'], null, ['0.65625 is R₂ = 21/32, not X₂.', 'الـ 0.65625 دي R₂ يعني <bdi dir="ltr">21/32</bdi>، مش X₂.']] },
        { l: ['X₃ = (9·21 + 3) mod 32?', 'الـ X₃ كام؟ <bdi dir="ltr">(9·21 + 3) mod 32</bdi>'], o: ['0', '192', '29'], a: 0, w: '9·21 + 3 = 192 mod 32 → X₃ = 0',
          h: [null, ['192 still needs mod 32: 192 = 6 × 32.', 'الـ 192 لسه محتاجة mod: هي <bdi dir="ltr">6 × 32</bdi>.'], ['29 = 189 mod 32: the + c was forgotten.', 'الـ 29 دي <bdi dir="ltr">189 mod 32</bdi>: نسيت الـ <bdi dir="ltr">+ c</bdi>.']] },
        { l: ['Longest possible period?', 'أطول period ممكن كام؟'], o: ['8', '32', '31'], a: 1, w: 'c odd, a = 1 + 4·2 → P = m = 32',
          h: [['m/4 = 8 is the c = 0 rule. Here c = 3.', 'الـ <bdi dir="ltr">m/4 = 8</bdi> دي قاعدة الـ <bdi dir="ltr">c = 0</bdi>، وهنا <bdi dir="ltr">c = 3</bdi>.'], null, ['m − 1 is the rule for a prime m with c = 0.', 'الـ <bdi dir="ltr">m − 1</bdi> دي قاعدة الـ m الأولي مع <bdi dir="ltr">c = 0</bdi>.']] }
      ]
    },
    {
      en: '<b>Multiplicative LCG</b>: a = 11, c = 0, m = 32. Seed X₀ = 5, then X₀ = 2.',
      ar: 'الـ <b>Multiplicative LCG</b> ده: <bdi dir="ltr">a = 11, c = 0, m = 32</bdi>. بالـ seed 5، وبعدين بالـ seed 2.',
      steps: [
        { l: ['X₁ = (11·5) mod 32?', 'الـ X₁ كام؟ <bdi dir="ltr">(11·5) mod 32</bdi>'], o: ['55', '23', '0.71875'], a: 1, w: '11·5 = 55 mod 32 → X₁ = 23',
          h: [['55 still needs mod 32.', 'الـ 55 لسه محتاجة <bdi dir="ltr">mod 32</bdi>.'], null, ['0.71875 is R₁ = 23/32, not X₁.', 'الـ 0.71875 دي R₁، مش X₁.']] },
        { l: ['Longest possible period?', 'أطول period ممكن كام؟'], o: ['32', '8', '31'], a: 1, w: 'c = 0, a = 3 + 8, X₀ odd → P = 8',
          h: [['Period m needs c ≠ 0. With c = 0 the best is m/4.', 'الـ period بـ m محتاج <bdi dir="ltr">c ≠ 0</bdi>. ومع <bdi dir="ltr">c = 0</bdi> أحسن حاجة m/4.'], null, ['m = 32 is not prime.', 'الـ 32 مش عدد أولي.']] },
        { l: ['Period with X₀ = 2?', 'الـ period بالـ seed 2 كام؟'], o: ['8', '4', '16'], a: 1, w: 'X₀ = 2: 22, 18, 6, 2 → P = 4',
          h: [['8 needs an odd seed. 2 is even: 22, 18, 6, 2.', 'الـ 8 محتاجة seed فردي، والـ 2 زوجي: <bdi dir="ltr">22, 18, 6, 2</bdi>.'], null, ['16 is more than the maximum m/4 = 8.', 'الـ 16 أكبر من الحد الأقصى <bdi dir="ltr">m/4 = 8</bdi>.']] }
      ]
    },
    {
      en: '<b>From the Final 2025/26</b>: a = 21, c = 17, m = 64, X₀ = 1. Find X₁, X₂ and the maximum period.',
      ar: '<b>من امتحان الـ Final <bdi dir="ltr">2025/26</bdi></b>: <bdi dir="ltr">a = 21, c = 17, m = 64, X₀ = 1</bdi>. هات X₁ و X₂ وأقصى period.',
      steps: [
        { l: ['X₁ = (21·1 + 17) mod 64?', 'الـ X₁ كام؟ <bdi dir="ltr">(21·1 + 17) mod 64</bdi>'], o: ['21', '38', '0.59375'], a: 1, w: '21 + 17 = 38 → X₁ = 38',
          h: [['21 forgets the + c.', 'الـ 21 ناسية الـ <bdi dir="ltr">+ c</bdi>.'], null, ['0.59375 is R₁ = 38/64, not X₁.', 'الـ 0.59375 دي R₁، مش X₁.']] },
        { l: ['X₂ = (21·38 + 17) mod 64?', 'الـ X₂ كام؟ <bdi dir="ltr">(21·38 + 17) mod 64</bdi>'], o: ['47', '815', '30'], a: 0, w: '815 mod 64 → X₂ = 47',
          h: [null, ['815 still needs mod 64.', 'الـ 815 لسه محتاجة <bdi dir="ltr">mod 64</bdi>.'], ['30 = 798 mod 64: the + c was forgotten.', 'الـ 30 دي <bdi dir="ltr">798 mod 64</bdi>: نسيت الـ <bdi dir="ltr">+ c</bdi>.']] },
        { l: ['Maximum period?', 'أقصى period كام؟'], o: ['16', '64', '63'], a: 1, w: 'c odd, a = 1 + 4·5 → P = m = 64',
          h: [['16 = m/4 is the c = 0 rule.', 'الـ <bdi dir="ltr">16 = m/4</bdi> دي قاعدة الـ <bdi dir="ltr">c = 0</bdi>.'], null, ['m − 1 is the prime-modulus rule; 64 is not prime.', 'الـ <bdi dir="ltr">m − 1</bdi> قاعدة الـ m الأولي، والـ 64 مش أولي.']] }
      ]
    }
  ];
  const GEN_ANS = ['5227, 3215, 3362', '2, 21, 0; P = 32', 'P = 8 (X₀ = 5), P = 4 (X₀ = 2)', '38, 47; P = 64'];

  // Be the tester: four tests on the lecture's own data and the site's practice problems (checked with node)
  const TEST = [
    {
      en: '<b>KS</b> on the spreadsheet\'s R = 0.4375, 0.6875, 0.9375, 0.1875 (N = 4), α = 0.05.',
      ar: 'اختبار <b>KS</b> على أرقام الـ spreadsheet دي، و<bdi dir="ltr">α = 0.05</bdi>:<span class="ltr">R = 0.4375, 0.6875, 0.9375, 0.1875 (N = 4)</span>',
      steps: [
        { l: ['D⁺ = max{i/N − R(i)}?', 'الـ D⁺ كام؟'], o: ['0.0625', '0.8125', '0.1875'], a: 0, w: 'sort first → D⁺ = 0.0625',
          h: [null, ['0.8125 comes from the unsorted order. Step 1: sort!', 'الـ 0.8125 جاية من الترتيب الأصلي. الخطوة الأولى: رتّب!'], ['0.1875 is D⁻.', 'الـ 0.1875 دي الـ D⁻.']] },
        { l: ['D⁻ = max{R(i) − (i−1)/N}?', 'الـ D⁻ كام؟'], o: ['0.4375', '0.1875', '0.0625'], a: 1, w: 'D⁻ = 0.1875, so D = 0.1875',
          h: [['0.4375 comes from the unsorted order.', 'الـ 0.4375 جاية من الترتيب الأصلي.'], null, ['0.0625 is D⁺.', 'الـ 0.0625 دي الـ D⁺.']] },
        { l: ['Critical D(0.05) for N = 4?', 'الـ critical value عند <bdi dir="ltr">N = 4</bdi> كام؟'], o: ['0.565', '0.624', '0.564'], a: 1, w: 'D(0.05), N = 4 = 0.624',
          h: [['0.565 is the row N = 5.', 'الـ 0.565 دي صف <bdi dir="ltr">N = 5</bdi>.'], null, ['0.564 is the α = 0.10 column.', 'الـ 0.564 دي عمود <bdi dir="ltr">α = 0.10</bdi>.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: ['reject H₀', 'do not reject H₀'], a: 1, w: '0.1875 ≤ 0.624 → do not reject',
          h: [['Reject only if D > Dα. Here 0.1875 ≤ 0.624.', 'بنرفض بس لو D أكبر من Dα، وهنا <bdi dir="ltr">0.1875 ≤ 0.624</bdi>.'], null] }
      ]
    },
    {
      en: '<b>Poker</b>: 1000 three-digit numbers: 700 all different, 280 exactly one pair, 20 three alike. α = 0.05.',
      ar: 'اختبار <b>Poker</b>: 1000 رقم من 3 خانات، منهم 700 كلهم مختلفين، و 280 فيهم pair واحد، و 20 الـ 3 زي بعض. و<bdi dir="ltr">α = 0.05</bdi>.',
      steps: [
        { l: ['Expected counts?', 'الأعداد المتوقعة كام؟'], o: ['700, 280, 20', '720, 270, 10', '333, 333, 333'], a: 1, w: 'E = 1000 × (0.72, 0.27, 0.01)',
          h: [['Those are the observed counts.', 'دي الأعداد اللي اتشافت فعلًا (observed).'], null, ['The three hands are not equally likely: 0.72, 0.27, 0.01.', 'الـ 3 حالات مش بنفس الاحتمال: 0.72 و 0.27 و 0.01.']] },
        { l: ['χ₀² = Σ (O − E)²/E?', 'الـ χ₀² كام؟'], o: ['0.93', '10.93', '5.93'], a: 1, w: '0.56 + 0.37 + 10 = 10.93',
          h: [['0.93 leaves out the three-alike term (20 − 10)²/10 = 10.', 'الـ 0.93 ناسية term الـ 3 زي بعض، وهو 10.'], null, ['5.93 divides by O. Divide by E.', 'الـ 5.93 قسمت على O. اقسم على E.']] },
        { l: ['Critical value?', 'الـ critical value كام؟'], o: ['χ²(0.05,2) = 5.99', 'χ²(0.05,3) = 7.81', 'χ²(0.05,1) = 3.84'], a: 0, w: 'df = 3 − 1 = 2 → 5.99',
          h: [null, ['3 classes give df = 3 − 1 = 2, not 3.', 'الـ 3 classes بيدّوا <bdi dir="ltr">df = 3 − 1 = 2</bdi>.'], ['df = number of classes − 1 = 2.', 'الـ df هو عدد الـ classes ناقص 1، يعني 2.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: ['reject independence', 'do not reject'], a: 0, w: '10.93 > 5.99 → reject',
          h: [null, ['χ₀² = 10.93 is above 5.99: reject.', 'الـ 10.93 أكبر من 5.99: ارفض.']] }
      ]
    },
    {
      en: '<b>Autocorrelation</b> of the 2nd, 7th, 12th, … of the slide\'s 30 numbers (i = 2, m = 5), α = 0.05.',
      ar: 'اختبار <b>Autocorrelation</b> للرقم التاني والسابع والـ 12 و… من الـ 30 رقم بتوع السلايد <bdi dir="ltr">(i = 2, m = 5)</bdi>، و<bdi dir="ltr">α = 0.05</bdi>.',
      steps: [
        { l: ['M? (i + (M+1)m ≤ N)', 'الـ M كام؟'], o: ['4', '5', '6'], a: 0, w: '2 + (M+1)·5 ≤ 30 → M = 4',
          h: [null, ['M = 5 gives 2 + 6·5 = 32 > 30.', 'الـ <bdi dir="ltr">M = 5</bdi> بتدّي <bdi dir="ltr">2 + 6·5 = 32</bdi>، أكبر من 30.'], ['M = 6 runs past N = 30.', 'الـ <bdi dir="ltr">M = 6</bdi> بتعدّي الـ 30.']] },
        { l: ['Products sum to 0.5795. ρ̂?', 'مجموع حواصل الضرب 0.5795. الـ ρ̂ كام؟'], o: ['0.1159', '−0.1341', '0.3295'], a: 1, w: 'ρ̂ = 0.5795/5 − 0.25 = −0.1341',
          h: [['0.1159 forgets the − 0.25.', 'الـ 0.1159 ناسية الـ <bdi dir="ltr">− 0.25</bdi>.'], null, ['0.3295 forgets to divide by M + 1 = 5.', 'الـ 0.3295 ناسية القسمة على <bdi dir="ltr">M + 1 = 5</bdi>.']] },
        { l: ['σ̂ = √(13M + 7)/[12(M+1)]?', 'الـ σ̂ كام؟'], o: ['0.1280', '0.1536', '0.0128'], a: 0, w: 'σ̂ = √59/60 = 0.1280',
          h: [null, ['0.1536 = √59/50: the bottom is 12(M + 1) = 60.', 'الـ 0.1536 دي <bdi dir="ltr">√59/50</bdi>، والمقام <bdi dir="ltr">12(M+1) = 60</bdi>.'], ['0.0128 slips a decimal place.', 'الـ 0.0128 فيها العلامة العشرية متزحزحة.']] },
        { l: ['Z₀ = ρ̂/σ̂?', 'الـ Z₀ كام؟'], o: ['−10.48', '−1.05', '−0.13'], a: 1, w: 'Z₀ = −0.1341/0.1280 = −1.05',
          h: [['That divides by 0.0128.', 'ده قسم على 0.0128.'], null, ['−0.13 is the runs example\'s Z₀, not this one.', 'الـ <bdi dir="ltr">−0.13</bdi> دي Z₀ بتاعة مثال الـ runs.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: ['reject H₀', 'do not reject H₀'], a: 1, w: '|−1.05| ≤ 1.96 → do not reject',
          h: [['−1.05 is inside ±1.96.', 'الـ <bdi dir="ltr">−1.05</bdi> جوه الـ <bdi dir="ltr">±1.96</bdi>.'], null] }
      ]
    },
    {
      en: '<b>Runs up and down</b>: the notes\' 60 numbers (Example 4.9) have a = 40 runs. α = 0.05.',
      ar: 'اختبار <b>Runs up and down</b>: الـ 60 رقم بتوع الـ notes (مثال 4.9) فيهم <bdi dir="ltr">a = 40</bdi> run. و<bdi dir="ltr">α = 0.05</bdi>.',
      steps: [
        { l: ['μa = (2N − 1)/3?', 'الـ μa كام؟'], o: ['39.67', '40', '19.67'], a: 0, w: 'μa = (120 − 1)/3 = 39.67',
          h: [null, ['40 is the observed a, not its mean.', 'الـ 40 دي الـ a اللي اتشافت، مش الـ mean.'], ['19.67 uses N = 30.', 'الـ 19.67 استخدمت <bdi dir="ltr">N = 30</bdi>.']] },
        { l: ['σa² = (16N − 29)/90?', 'الـ σa² كام؟'], o: ['3.22', '6.79', '10.34'], a: 2, w: 'σa² = 931/90 = 10.34, σa = 3.22',
          h: [['3.22 is σa, the square root.', 'الـ 3.22 دي σa، الجذر.'], ['6.79 is for N = 40.', 'الـ 6.79 دي لـ <bdi dir="ltr">N = 40</bdi>.'], null] },
        { l: ['Z₀ = (a − μa)/σa?', 'الـ Z₀ كام؟'], o: ['0.10', '0.03', '−0.10'], a: 0, w: 'Z₀ = (40 − 39.67)/3.22 = 0.10',
          h: [null, ['0.03 divides by σa² instead of σa.', 'الـ 0.03 قسمت على σa² بدل σa.'], ['a = 40 is above μa = 39.67: Z₀ is positive.', 'الـ 40 أكبر من 39.67، فالـ Z₀ موجب.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: ['reject H₀', 'do not reject H₀'], a: 1, w: '|0.10| ≤ 1.96 → do not reject',
          h: [['0.10 is inside ±1.96.', 'الـ 0.10 جوه الـ <bdi dir="ltr">±1.96</bdi>.'], null] }
      ]
    }
  ];
  const TEST_ANS = ['D = 0.1875 ≤ 0.624: not rejected', 'χ₀² = 10.93 > 5.99: rejected', 'Z₀ = −1.05: not rejected', 'Z₀ = 0.10: not rejected'];

  H.chapters.ms[4] = {
    title: 'Random-Number Generation and Tests for Random Numbers', kicker: 'Chapter 4', run: 'random numbers',
    ar: { title: 'توليد الـ Random Numbers واختباراتها', kicker: 'الفصل 4', run: 'الـ random numbers' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own question on this lecture (quiz items with src) and the site's practice questions, with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arQuiz = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[4] && window.AR.ms.lectures[4].quiz) || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const find = (re, doc) => { const i = lec.quiz.findIndex(x => re.test(strip(x.q)) && (doc ? !!x.src : !x.src)); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = find(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const RT = rows => html`<div className="hf-ms4-tb hf-in">${rows.map(([r, u], i) => html`<${React.Fragment} key=${i}><span className="r">${T(r)}</span><span>${T(u)}</span></${React.Fragment}>`)}</div>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X('Every simulation runs on random numbers. This chapter shows how a computer <b>makes</b> them with a formula, and how we <b>test</b> that they behave. Lots of arithmetic: you will do it yourself, and every number on these pages was re-checked.',
            'كل simulation شغالة على random numbers. الفصل ده بيورّيك الكمبيوتر <b>بيعملها</b> إزاي بمعادلة، وإزاي <b>بنختبر</b> إنها ماشية صح. فيه حسابات كتير هتعملها بنفسك، وكل رقم في الصفحات دي اتراجع تاني.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> Two drills check every step of a generator and of a test.', '<b>حل التمارين.</b> فيه تمرينين بيصحّحوا كل خطوة في الـ generator وفي الاختبار.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps and slide slips.', '<b>خلّي بالك!</b> دي فخاخ الامتحان وغلطات السلايدز.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers what you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slide that says something odd (and what was meant), or a fact from the lecture notes rather than the slides.', 'معناها سلايد فيها حاجة غريبة (وبنقولك المقصود)، أو معلومة من الـ lecture notes مش من السلايدز.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the slides\'.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>Modeling & Simulation` : html`Chapter four<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Random on Purpose', 'عشوائي بالقصد')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('making random numbers, then testing them', 'إزاي نعمل random numbers ونختبرها')}</p></div>
          <${Talk} who="dice">${t('Nine. Nine. Nine. Nine. Nine. Nine.', 'تسعة. تسعة. تسعة. تسعة. تسعة. تسعة.')}</${Talk}>
          <${Talk} who="dev" flip=${true}>${t('Are you sure that\'s random?', 'إنت متأكد إن ده عشوائي؟')}</${Talk}>
          <${P} small=${true}>${X('The slide\'s cartoon ends: <i>"That\'s the problem with randomness: you can never be sure."</i> So we <b>test</b>. And the numbers? A formula makes them, and it always comes back around:',
            'كارتون السلايد آخره: <b>"دي مشكلة العشوائية: عمرك ما تقدر تتأكد"</b>. عشان كده بنعمل <b>اختبارات</b>. والأرقام نفسها؟ بتطلع من معادلة، وبترجع تلف تاني:')}</${P}>
          <${Cycle} />
        `, { sec: t('Random numbers', 'الـ Random numbers') }),

        // 2 · random and pseudo-random
        page(html`
          <${H2}>${t('Random… or just pretending?', 'عشوائي… ولا بيمثّل؟')}</${H2}>
          <${Def}>${X('A <b>random number</b> is generated by a process whose outcome is <b>unpredictable</b> and which cannot be reliably reproduced afterwards. Random numbers are the <b>basic building blocks of all simulation algorithms</b>. ‡ (lecture notes)',
            'الـ <b>random number</b> رقم بيطلع من عملية نتيجتها <b>مش متوقعة</b>، ومتقدرش تعيد إنتاجها بثقة بعد كده. والـ random numbers هي <b>حجر الأساس لكل الـ simulation algorithms</b>. ‡ (من الـ lecture notes)')}</${Def}>
          <${Talk} who="cpu">${t('I can\'t roll dice. I can only calculate.', 'أنا مبعرفش أرمي زهر. أنا بعرف أحسب بس.')}</${Talk}>
          <${UL} items=${A ? [
            '<b>الطريقة</b>: بنولّد الأرقام <b>حسابيًا</b>، يعني بمعادلة.',
            '<b>ليه "pseudo"</b>: لما بنولّدها بطريقة معروفة، إمكانية العشوائية الحقيقية بتروح. السلسلة deterministic، فالأرقام اسمها <b>pseudo‑random</b>.',
            '<b>الهدف</b>: سلسلة أرقام في الفترة <bdi dir="ltr">[0,1]</bdi> بتقلّد (simulate) الخصائص المثالية للـ random numbers.'
          ] : [
            '<b>Approach</b>: generate them <b>arithmetically</b>, by calculation.',
            '<b>"Pseudo"</b>: a known method removes the potential for true randomness. The sequence is deterministic, so the numbers are <b>pseudo-random</b>.',
            '<b>Goal</b>: a sequence of numbers in [0,1] that <b>simulates</b> the ideal properties of random numbers.'
          ]} />
        `),

        // 3 · a good routine
        page(html`
          <${H2}>${t('What makes a good generator routine?', 'إيه اللي يخلّي الـ routine كويسة؟')}</${H2}>
          <${UL} items=${A ? [
            '<b>سريعة (Fast)</b>.',
            '<b>Portable</b>: تشتغل على كمبيوترات مختلفة.',
            'ليها <b>cycle طويلة</b> كفاية.',
            '<b>Replicable</b>: تقدر تعيد نفس الأرقام، عشان الـ verification والـ debugging، وعشان تستخدم نفس الـ stream مع systems مختلفة.',
            'تقرّب جدًا من الخصائص الإحصائية المثالية: الـ <b>uniformity</b> والـ <b>independence</b>.'
          ] : [
            '<b>Fast</b>.',
            '<b>Portable</b> to different computers.',
            'A sufficiently <b>long cycle</b>.',
            '<b>Replicable</b>: for verification and debugging, and to use an identical stream of random numbers for different systems.',
            'Closely approximate the ideal statistical properties of <b>uniformity</b> and <b>independence</b>.'
          ]} />
          <${Box} kind="brain"><p className="hf-p small">${t('Hang on: a "random" generator that gives the same numbers again is a good thing? When would you WANT the same stream twice?',
            'استنى: generator "عشوائي" بيطلّع نفس الأرقام تاني يبقى حاجة كويسة؟ إمتى تحب تاخد نفس الـ stream مرتين؟')}</p></${Box}>
          <${Hand} tilt=${true}>${t('Ours: to rerun a buggy simulation and see the same bug, or to compare two system designs on the exact same customers.', 'من عندنا: عشان تعيد simulation فيها bug وتشوف نفس الـ bug، أو تقارن تصميمين على نفس الزباين بالظبط.')}</${Hand}>
        `),

        // 4 · uniformity and independence
        page(html`
          <${H2}>${t('The two properties: uniform and independent', 'الخاصيتين: uniform و independent')}</${H2}>
          <${Def}>${X('Each random number R<sub>i</sub> must be <b>independently</b> drawn from a <b>uniform</b> distribution on [0,1].',
            'كل random number اسمه R<sub>i</sub> لازم يتسحب <b>بشكل مستقل (independent)</b> من <b>uniform</b> distribution على الفترة <bdi dir="ltr">[0,1]</bdi>.')}</${Def}>
          <${Code} lines=${['f(x) = 1,  0 ≤ x ≤ 1 (else 0)', 'E(R) = ∫ x dx = 1/2', ['V(R) = 1/3 − 1/4 = 1/12', t('‡ lecture notes', '‡ من الـ notes')]]} />
          <${UL} items=${A ? [
            'لو قسمنا الفترة لـ n classes متساوية، كل class متوقع يجيلها <bdi dir="ltr"><b>N/n</b></bdi> من الـ N observations.',
            'احتمال إنك تلاقي قيمة في فترة معينة <b>ملوش علاقة</b> بالقيم اللي اتسحبت قبلها. ‡'
          ] : [
            'Divide [0,1] into n equal classes: each class expects <b>N/n</b> of the N observations.',
            'The probability of a value in an interval is <b>independent of the previous values</b> drawn. ‡'
          ]} />
        `, { sec: t('Uniformity and independence', 'الـ Uniformity والـ independence') }),

        // 5 · the PDF figure
        page(html`
          <${Fig} name="ms-rn-uniform" />
        `),

        // 6 · what goes wrong
        page(html`
          <${H2}>${t('How pseudo-random numbers go wrong', 'الـ pseudo‑random numbers بتبوظ إزاي')}</${H2}>
          <${P} small=${true}>${t('Departures from ideal randomness (slide 9):', 'البعد عن العشوائية المثالية (سلايد 9):')}</${P}>
          <${UL} items=${A ? [
            'ممكن الأرقام متكونش <b>uniformly distributed</b>.',
            'ممكن تكون <b>discrete</b> بدل ما تكون continuous.',
            'الـ <b>mean</b> ممكن يطلع عالي أوي أو واطي أوي.',
            'والـ <b>variance</b> كمان ممكن يطلع عالي أوي أو واطي أوي.'
          ] : [
            'Not <b>uniformly distributed</b>.',
            '<b>Discrete-valued</b> instead of continuous-valued.',
            'The <b>mean</b> too high or too low.',
            'The <b>variance</b> too high or too low.'
          ]} />
          <${P} small=${true}>${X('And there might be <b>dependence</b>:', 'وممكن يكون فيه <b>dependence</b>:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Autocorrelation</b> بين الأرقام.',
            'أرقام كل واحد فيها أعلى (أو أوطى) من اللي جنبه على طول.',
            'كذا رقم فوق الـ mean وبعدهم كذا رقم تحته.'
          ] : [
            '<b>Autocorrelation</b> between numbers.',
            'Numbers successively higher or lower than adjacent numbers.',
            'Several numbers above the mean followed by several below it.'
          ]} />
          <${Talk} who="lens" flip=${true}>${t('Remember these. Each one gets its own test later.', 'افتكر دول. كل واحد فيهم هيبقى ليه اختبار بعدين.')}</${Talk}>
        `),

        // 7 · methods and history
        page(html`
          <${H2}>${t('Three methods, seventy years', 'تلات طرق، وسبعين سنة')}</${H2}>
          <${P} small=${true}>${X('The lecture covers the <b>midsquare method</b>, the <b>linear congruential method (LCM)</b> and <b>combined linear congruential generators (CLCG)</b>. The history (slide 11):',
            'المحاضرة بتشرح الـ <b>midsquare method</b>، والـ <b>linear congruential method (LCM)</b>، والـ <b>combined linear congruential generators (CLCG)</b>. والتاريخ (سلايد 11):')}</${P}>
          <${Code} lines=${[['1949       Middle-Square', ''], ['1951–1958  LCG', ''], ['1998       Mersenne Twister', ''], ['2011       Philox', ''], ['2018       64-bit MELG', ''], ['2020       Squares RNG', '']]} />
          <${P} small=${true}>${X('The LCM was first proposed by <b>Lehmer [1951]</b> and is the <b>most widely used</b> technique. ‡ (lecture notes) Many more are on Wikipedia\'s "List of random number generators".',
            'الـ LCM اقترحه <b>Lehmer سنة 1951</b>، وهو <b>أكتر طريقة مستخدمة</b>. ‡ (من الـ lecture notes) وفيه طرق تانية كتير في صفحة Wikipedia اللي اسمها:<span class="ltr">"List of random number generators"</span>')}</${P}>
        `, { sec: t('Generating random numbers', 'توليد الـ random numbers') }),

        // 8 · midsquare
        page(html`
          <${H2}>${t('The midsquare method', 'الـ Midsquare method')}</${H2}>
          <${Def}>${X('The <b>first arithmetic generator</b>, by <b>von Neumann and Metropolis</b> in the 1940s. (1) Start with a four-digit Z₀. (2) Square it, padding to <b>8 digits</b>. (3) Take the <b>middle four digits</b> as the next number; U<sub>i</sub> = Z<sub>i</sub>/10000.',
            'ده <b>أول generator حسابي</b>، عملوه <b>von Neumann و Metropolis</b> في الأربعينات. (1) ابدأ برقم Z₀ من 4 خانات. (2) ربّعه وكمّله لـ <b>8 خانات</b>. (3) خد <b>الـ 4 خانات اللي في النص</b> وده الرقم الجاي، والـ U<sub>i</sub> بيساوي Z<sub>i</sub> على 10000.')}</${Def}>
          <${Code} lines=${['7182² = 51581124 → 5811', '5811² = 33767721 → 7677', '7677² = 58936329 → 9363', ['…', ''], ['7349² = 54007801 → 0078', t('trouble', 'المشكلة')], '78 → 60 → 36 → 12 → 1 → 0 → 0']} />
          <${Hand} red=${true} arrow="up">${t('The problem: the numbers tend to 0, and once at 0 it stays there forever.', 'المشكلة: الأرقام بتميل للصفر، ولما توصل للصفر بتفضل عليه على طول.')}</${Hand}>
          <${P} small=${true}>${X('‡ The slide writes decimals with commas (0,5811 = 0.5811) and shows U₁₀ as 0.006 (= 0.0060).', '‡ السلايد كاتب الكسور بفاصلة (يعني <bdi dir="ltr">0,5811</bdi> هي 0.5811)، وكاتب U₁₀ على إنها 0.006 (يعني 0.0060).')}</${P}>
        `, { sec: t('Midsquare method', 'الـ Midsquare method') }),

        // 9 · midsquare figure
        page(html`
          <${Fig} name="ms-midsquare" />
        `),

        // 10 · interview with the midsquare method
        page(html`
          <${Interview} title=${t('The Midsquare Method, exposed', 'الـ Midsquare على المكشوف')} sub=${t('This week\'s interview: the first generator, and why it retired.', 'حوار الأسبوع: أول generator، وليه طلع على المعاش.')} lines=${A ? [
            ['هيد فيرست', 'عرّفنا بنفسك.'],
            ['الـ Midsquare', 'أنا <b>أول generator حسابي</b>. عملني von Neumann و Metropolis في الأربعينات.'],
            ['هيد فيرست', 'الوصفة؟'],
            ['الـ Midsquare', 'رقم من 4 خانات، أربّعه، أكمّله لـ 8 خانات، وآخد <b>الـ 4 اللي في النص</b>. وبعدين أقسم على 10000.'],
            ['هيد فيرست', 'ورّينا.'],
            ['الـ Midsquare', 'من 7182 أطلّع 5811 وبعدين 7677 وبعدين 9363… كله تمام.'],
            ['هيد فيرست', 'أمال إيه اللي باظ؟'],
            ['الـ Midsquare', 'أرقامي <b>بتميل للصفر</b>. من i بـ 9 بقيت <bdi dir="ltr">78, 60, 36, 12, 1</bdi> وبعدين صفر. ومربع الصفر صفر، فاتلزقت فيه.'],
            ['هيد فيرست', 'ومين خد مكانك؟'],
            ['الـ Midsquare', 'الـ <b>linear congruential method</b>، بتاع Lehmer سنة 1951. ‡ (من الـ notes)']
          ] : [
            ['Head First', 'Introduce yourself.'],
            ['Midsquare', 'The <b>first arithmetic generator</b>. Von Neumann and Metropolis built me in the 1940s.'],
            ['Head First', 'Your recipe?'],
            ['Midsquare', 'A four-digit number: square it, pad to 8 digits, keep the <b>middle four</b>. Divide by 10000.'],
            ['Head First', 'Show us.'],
            ['Midsquare', '7182 gives 5811, then 7677, then 9363… all fine.'],
            ['Head First', 'So what went wrong?'],
            ['Midsquare', 'My numbers <b>tend to 0</b>. From i = 9: 78, 60, 36, 12, 1, then 0. And 0² = 0, so I\'m stuck.'],
            ['Head First', 'Who replaced you?'],
            ['Midsquare', 'The <b>linear congruential method</b>, Lehmer\'s, from 1951. ‡ (lecture notes)']
          ]} />
        `),

        // 11 · the LCM
        page(html`
          <${H2}>${t('The linear congruential method', 'الـ Linear congruential method')}</${H2}>
          <${Code} lines=${[['X(i+1) = (a·X(i) + c) mod m', ''], ['R(i)   = X(i) / m', '']]} />
          <${UL} items=${A ? [
            'الـ <b>a</b> هو الـ <b>multiplier</b>، والـ <b>c</b> هو الـ <b>increment</b>، والـ <b>m</b> هو الـ <b>modulus</b>، والقيمة الابتدائية X₀ اسمها الـ <b>seed</b>. ‡',
            'الافتراض:<span class="ltr">m > 0,  a < m,  c < m,  X₀ < m</span>',
            'الأرقام X<sub>i</sub> بتطلع من 0 لـ <bdi dir="ltr">m−1</bdi>، فالـ R<sub>i</sub> بتطلع من 0 لـ <bdi dir="ltr">(m−1)/m</bdi>.',
            'اختيار a و c و m و X₀ <b>بيأثر جامد جدًا</b> على الخصائص الإحصائية وطول الـ cycle.',
            'لو <bdi dir="ltr">c ≠ 0</bdi> اسمها <b>mixed congruential method</b>، ولو <bdi dir="ltr">c = 0</bdi> اسمها <b>multiplicative congruential method</b>. ‡'
          ] : [
            '<b>a</b> = the <b>multiplier</b>, <b>c</b> = the <b>increment</b>, <b>m</b> = the <b>modulus</b>; the initial value X₀ is the <b>seed</b>. ‡',
            'Assumption: m > 0 and a < m, c < m, X₀ < m.',
            'X<sub>i</sub> ∈ {0, 1, …, m−1}, so R<sub>i</sub> ∈ [0, (m−1)/m].',
            'The choice of a, c, m and X₀ <b>drastically affects</b> the statistical properties and the cycle length.',
            'c ≠ 0: the <b>mixed congruential method</b>; c = 0: the <b>multiplicative congruential method</b>. ‡'
          ]} />
        `, { sec: t('Linear congruential method', 'الـ Linear congruential method') }),

        // 12 · example 1
        page(html`
          <${H2}>${t('Example 1: X₀ = 27, a = 17, c = 43, m = 100', 'مثال 1: الـ seed بـ 27')}</${H2}>
          <${P} small=${true}>${X('Multiply, add, keep the remainder after dividing by 100:', 'القيم:<span class="ltr">X₀ = 27,  a = 17,  c = 43,  m = 100</span>اضرب، وزوّد، وخد باقي القسمة على 100:')}</${P}>
          <${Code} lines=${[['17·27 + 43 = 502  → X₁ = 2', 'R₁ = 0.02'], ['17·2  + 43 = 77   → X₂ = 77', 'R₂ = 0.77'], ['17·77 + 43 = 1352 → X₃ = 52', 'R₃ = 0.52'], ['17·52 + 43 = 927  → X₄ = 27', 'R₄ = 0.27']]} />
          <${Hand} red=${true} arrow="up">${t('X₄ = 27 is the seed again: from here it repeats. The period is only 4.', 'الـ X₄ رجعت 27، يعني الـ seed تاني: من هنا بتعيد نفسها. الـ period بـ 4 بس.')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The slide labels the last line <b>"R₃ = 0.27"</b>. It is <b>R₄ = 0.27</b> (R₃ is 0.52).', '‡ السلايد كاتب آخر سطر على إنه <bdi dir="ltr"><b>R₃ = 0.27</b></bdi>، والصح <bdi dir="ltr"><b>R₄ = 0.27</b></bdi> (لأن R₃ هي 0.52).')}</p></${Box}>
          <${Talk} who="dice" flip=${true}>${t('Four numbers and I\'m already repeating myself. Embarrassing.', 'أربع أرقام وبدأت أعيد نفسي. فضيحة.')}</${Talk}>
        `),

        // 13 · LCG figure
        page(html`
          <${Fig} name="ms-lcg" />
        `),

        // 14 · the seed matters
        page(html`
          <${H2}>${t('Example 2: the seed matters', 'مثال 2: الـ seed بيفرق')}</${H2}>
          <${P} small=${true}>${X('Same generator, <b>a = 13, c = 0, m = 64</b>, four different seeds. The period is very low, and the seed <b>changes</b> it:',
            'نفس الـ generator، بالقيم <bdi dir="ltr"><b>a = 13, c = 0, m = 64</b></bdi>، بأربع seeds مختلفة. الـ period قليل جدًا، والـ seed <b>بيغيّره</b>:')}</${P}>
          <${Code} lines=${[['X₀ = 1 → 13, 41, 21, … → 1', 'P = 16'], ['X₀ = 2 → 26, 18, 42, … → 2', 'P = 8'], ['X₀ = 3 → 39, 59, 63, … → 3', 'P = 16'], ['X₀ = 4 → 52, 36, 20, 4', 'P = 4']]} />
          <${Box} kind="brain"><p className="hf-p small">${t('The two winners, 1 and 3, have something in common that 2 and 4 don\'t. What is it? (The rule is three pages on.)',
            'الـ 2 اللي كسبوا (1 و 3) فيهم حاجة مشتركة مش موجودة في الـ 2 و 4. هي إيه؟ (القاعدة بعد 3 صفحات.)')}</p></${Box}>
          <${Hand}>${X('The Final 2025/26 asked for seed 4 exactly: 52, 36, 20, 4, 52.', 'امتحان الـ Final <bdi dir="ltr">2025/26</bdi> سأل عن الـ seed 4 بالظبط:<span class="ltr">52, 36, 20, 4, 52</span>')}</${Hand}>
          <${P} small=${true}>${X('‡ The notes\' worked line for X₀ = 1 labels the first value "X₂"; it is X₁ = 13 (the table is right).', '‡ في الـ notes أول قيمة للـ seed 1 مكتوبة "X₂"، والصح إنها <bdi dir="ltr">X₁ = 13</bdi> (الجدول صح).')}</${P}>
        `),

        // 15 · seeds figure
        page(html`
          <${Fig} name="ms-lcg-seeds" />
        `),

        // 16 · the spreadsheet
        page(html`
          <${Fig} name="ms-lcg-sheet" head=${t('The spreadsheet (m = 32): even seeds 2 and 6, both period 4', 'الـ spreadsheet: الـ seeds 2 و 6 زوجي، والاتنين period بـ 4')} />
        `),

        // 17 · a good generator
        page(html`
          <${H2}>${t('Characteristics of a good generator', 'مواصفات الـ generator الكويس')}</${H2}>
          <${Def}>${X('<b>Maximum density</b>: the values R<sub>i</sub> leave <b>no large gaps</b> on [0,1]. Problem: each R<sub>i</sub> is discrete, not continuous. Solution: a <b>very large modulus m</b>, so the approximation is of little consequence.',
            'الـ <b>Maximum density</b>: قيم الـ R<sub>i</sub> <b>متسيبش فجوات كبيرة</b> في <bdi dir="ltr">[0,1]</bdi>. المشكلة إن كل R<sub>i</sub> discrete مش continuous، والحل <b>modulus m كبير جدًا</b>، فالتقريب يبقى تأثيره بسيط.')}</${Def}>
          <${Def}>${X('<b>Maximum period</b>: to achieve maximum density and <b>avoid cycling</b>. Achieved by the proper choice of a, c, m and X₀.',
            'الـ <b>Maximum period</b>: عشان نوصل لأقصى density و<b>نتجنب الـ cycling</b>، وده بيتحقق باختيار a و c و m و X₀ صح.')}</${Def}>
          <${P} small=${true}>${X('Computers work in binary, so speed and efficiency are aided by a modulus that is (or is close to) a <b>power of 2</b>.',
            'الكمبيوتر بيشتغل binary، فالسرعة والكفاءة بيتحسنوا لما الـ modulus يكون <b>power of 2</b> (أو قريب منه).')}</${P}>
          <${Talk} who="cpu" flip=${true}>${t('mod 2ᵇ? I just drop the high bits. Fast!', 'الـ mod على 2ᵇ؟ أنا بشيل الـ bits العالية وخلاص. سريع!')}</${Talk}>
        `, { sec: t('A good generator', 'الـ generator الكويس') }),

        // 18 · lattice
        page(html`
          <${Fig} name="ms-lcg-lattice" head=${t('Neat lines mean dependence; an even cloud is good', 'الخطوط المنتظمة معناها dependence، والسحابة هي الكويسة')} />
        `),

        // 19 · max period rules
        page(html`
          <${H2}>${t('How to get the longest period', 'إزاي تاخد أطول period')}</${H2}>
          ${RT(A ? [
            ['m = 2ᵇ, c ≠ 0', 'أطول period <bdi dir="ltr"><b>P = m</b></bdi>، لو الـ c والـ m <b>relatively prime</b> والـ a على شكل <bdi dir="ltr"><b>1 + 4k</b></bdi>.'],
            ['m = 2ᵇ, c = 0', 'أطول period <bdi dir="ltr"><b>P = m/4</b></bdi>، لو الـ X₀ <b>فردي</b> والـ a على شكل <bdi dir="ltr"><b>3 + 8k</b></bdi> أو <bdi dir="ltr"><b>5 + 8k</b></bdi>.'],
            ['m prime, c = 0', 'أطول period <bdi dir="ltr"><b>P = m − 1</b></bdi>، لو أصغر k يخلّي <bdi dir="ltr">aᵏ − 1</bdi> يقبل القسمة على m هو <bdi dir="ltr">k = m − 1</bdi>.']
          ] : [
            ['m = 2ᵇ, c ≠ 0', '<b>P = m</b> if c is <b>relatively prime</b> to m and <b>a = 1 + 4k</b>.'],
            ['m = 2ᵇ, c = 0', '<b>P = m/4 = 2ᵇ⁻²</b> if X₀ is <b>odd</b> and <b>a = 3 + 8k or 5 + 8k</b>.'],
            ['m prime, c = 0', '<b>P = m − 1</b> if the smallest k such that aᵏ − 1 is divisible by m is k = m − 1.']
          ])}
          <${P} small=${true}>${X('Back to the Brain Power: a = 13 = 5 + 8(1), m = 64 = 2⁶, c = 0, so P = 64/4 = <b>16</b>, reached only for the <b>odd</b> seeds 1 and 3. ‡ (lecture notes)',
            'نرجع لـ شغّل مخك:<span class="ltr">a = 13 = 5 + 8(1),  m = 64 = 2⁶,  c = 0</span>يعني الـ P بـ <b>16</b>، وبيتحقق بس للـ seeds <b>الفردية</b> 1 و 3. ‡ (من الـ notes)')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('c = 0 never reaches m: its best is <b>m/4</b>, and only with an odd seed. Period m needs <b>c ≠ 0</b>. And m − 1 is for a <b>prime</b> modulus only.',
            'الـ <bdi dir="ltr">c = 0</bdi> عمرها ما توصل لـ m: أقصاها <b>m/4</b>، وبـ seed فردي بس. الـ period بـ m محتاج <bdi dir="ltr"><b>c ≠ 0</b></bdi>. والـ <bdi dir="ltr">m − 1</bdi> للـ modulus <b>الأولي (prime)</b> بس.')}</p></${Box}>
        `, { sec: t('Maximum period rules', 'قواعد أطول period') }),

        // 20 · rules figure
        page(html`
          <${Fig} name="ms-lcg-rules" />
        `),

        // 21 · match: what period?
        page(html`
          <${Box} kind="pencil" title=${t('What period?', 'الـ period كام؟')}><p className="hf-p small">${t('Tap a generator, then the period it really gets. (Every answer was run, not guessed.)', 'دوس على generator، وبعدين على الـ period اللي بياخده فعلًا. (كل إجابة اتشغّلت مش اتخمّنت.)')}</p></${Box}>
          <${Match} id="per" left=${['a = 9, c = 3, m = 32', 'a = 11, c = 0, m = 32, X₀ = 5', 'a = 11, c = 0, m = 32, X₀ = 2', 'a = 3, c = 0, m = 7, X₀ = 1', 'a = 2, c = 0, m = 7, X₀ = 1']} right=${A ? [
            '6: يعني <bdi dir="ltr">m − 1</bdi>، أطول حاجة ممكنة',
            '32: الـ m كلها',
            '4: الـ seed زوجي، أقل من الأقصى',
            '3: أقل من <bdi dir="ltr">m − 1</bdi>، لأن <bdi dir="ltr">2³ − 1 = 7</bdi> بيقبل القسمة على 7',
            '8: يعني m/4، أقصى حاجة مع <bdi dir="ltr">c = 0</bdi>'
          ] : ['6: m − 1, the longest possible', '32: the full m', '4: even seed, below the maximum', '3: below m − 1, since 2³ − 1 = 7 is divisible by 7', '8: m/4, the c = 0 maximum']} answer=${[1, 4, 2, 0, 3]} />
          <${Hand}>${X('Check: 3, 2, 6, 4, 5, 1 for a = 3; but 2, 4, 1 for a = 2.', 'اتأكد: مع <bdi dir="ltr">a = 3</bdi> بتطلع <bdi dir="ltr">3, 2, 6, 4, 5, 1</bdi>، ومع <bdi dir="ltr">a = 2</bdi> بتطلع <bdi dir="ltr">2, 4, 1</bdi> بس.')}</${Hand}>
        `, { sec: t('Exercise: what period?', 'تمرين: الـ period كام؟') }),

        // 22 · be the generator
        page(html`
          <${Box} kind="pencil" title=${t('Be the generator', 'خليك إنت الـ generator')}><p className="hf-p small">${t('Four problems, one step at a time. A wrong option tells you which slip it is.', 'أربع مسائل خطوة بخطوة. الاختيار الغلط بيقولك إنت غلطت فين.')}</p></${Box}>
          <${Drill} id="gen" data=${GEN} ans=${GEN_ANS} />
        `, { sec: t('Exercise: be the generator', 'تمرين: خليك الـ generator') }),

        // 23 · Java and general congruential generators
        page(html`
          <${H2}>${t('Inside Java, and beyond the LCG', 'جوه الـ Java، وأبعد من الـ LCG')}</${H2}>
          <${P} small=${true}>${X('<code>java.util.Random</code> is an LCG with m = 2⁴⁸:', 'الـ <code>java.util.Random</code> هو LCG والـ m بتاعه 2⁴⁸:')}</${P}>
          <${Code} lines=${[['multiplier = 0x5DEECE66D', '25214903917'], ['addend     = 0xB', '11'], ['mask = (1 << 48) − 1', '2⁴⁸ − 1'], 'next = (old·mult + add) & mask', 'return next >>> (48 − bits)']} />
          <${P} small=${true}>${X('LCGs are a special case of <b>X<sub>i+1</sub> = g(X<sub>i</sub>, X<sub>i−1</sub>, …) mod m</b>. Three more choices of g():', 'الـ LCG حالة خاصة من شكل عام، والـ g فيه دالة في الـ X اللي قبل:<span class="ltr">X<sub>i+1</sub> = g(X<sub>i</sub>, X<sub>i−1</sub>, …) mod m</span>وفيه 3 أمثلة تانية للـ g:')}</${P}>
          <${Code} lines=${[['a·X(i)² + b·X(i−1) + c', t('quadratic', 'quadratic')], ['a₁X(i) + a₂X(i−1) + … + aₖX(i−k)', ''], ['', t('multiple recursive', 'multiple recursive')], ['X(i) + X(i−1)', t('Fibonacci', 'Fibonacci')]]} />
        `, { sec: t('Java and general generators', 'الـ Java والـ generators العامة') }),

        // 24 · CLCG
        page(html`
          <${H2}>${t('Combined generators (CLCG)', 'الـ Combined generators (CLCG)')}</${H2}>
          <${P} small=${true}>${X('<b>Reason</b>: simulated systems keep getting more complex, so we need a <b>longer period</b>. <b>Approach</b>: combine two or more <b>multiplicative</b> congruential generators. The j-th one has a <b>prime modulus m<sub>j</sub></b>, multiplier a<sub>j</sub> and period m<sub>j</sub> − 1.',
            '<b>السبب</b>: الـ systems اللي بنعملها simulation بقت معقدة أكتر، فمحتاجين <b>period أطول</b>. <b>الطريقة</b>: نجمع 2 أو أكتر من الـ generators الـ <b>multiplicative</b>. والـ generator رقم j ليه <b>modulus أولي</b> اسمه m<sub>j</sub>، و multiplier اسمه a<sub>j</sub>، والـ period بتاعه <bdi dir="ltr">m<sub>j</sub> − 1</bdi>.')}</${P}>
          <${Code} lines=${['X(i) = ( Σ (−1)^(j−1) X(i,j) )', '        mod (m₁ − 1)', ['R(i) = X(i)/m₁   if X(i) > 0', ''], ['R(i) = (m₁−1)/m₁ if X(i) = 0', ''], ['P = (m₁−1)(m₂−1)…(mₖ−1)', ''], ['      / 2^(k−1)', t('max period', 'أقصى period')]]} />
          <${P} small=${true}>${X('<b>Theorem</b> ‡ (lecture notes): if the W<sub>i,j</sub> = X<sub>i,j</sub> − 1 are independent and W<sub>i,1</sub> is uniform on 0 to m₁ − 2, then (Σ W<sub>i,j</sub>) mod (m₁ − 1) is uniform on 0 to m₁ − 2.',
            '<b>النظرية</b> ‡ (من الـ notes): لو الـ W<sub>i,j</sub> (يعني <bdi dir="ltr">X<sub>i,j</sub> − 1</bdi>) مستقلين، والـ W<sub>i,1</sub> uniform من 0 لـ <bdi dir="ltr">m₁ − 2</bdi>، يبقى مجموعهم <bdi dir="ltr">mod (m₁ − 1)</bdi> برضه uniform من 0 لـ <bdi dir="ltr">m₁ − 2</bdi>.')}</${P}>
        `, { sec: t('Combined generators', 'الـ Combined generators') }),

        // 25 · L'Ecuyer
        page(html`
          <${H2}>${t('L\'Ecuyer\'s generator for 32-bit computers', 'الـ generator بتاع L\'Ecuyer للـ 32‑bit')}</${H2}>
          <${P} small=${true}>${X('k = 2 generators (L\'Ecuyer [1988] ‡). Step 2 runs both, step 3 subtracts, step 4 divides. With the spreadsheet\'s seeds 111 and 222:',
            'بنجمع 2 generators (اقترحه L\'Ecuyer سنة 1988 ‡). الخطوة 2 بتشغّل الاتنين، والـ 3 بتطرح، والـ 4 بتقسم. وبالـ seeds بتوع الـ spreadsheet (111 و 222):')}</${P}>
          <${Code} lines=${[['m₁ = 2147483563, a₁ = 40014', ''], ['m₂ = 2147483399, a₂ = 40692', ''], '40014·111 mod m₁ = 4441554', '40692·222 mod m₂ = 9033624', '(4441554 − 9033624)', ['  mod 2147483562 = 2142891492', ''], ['R₁ = X₁/m₁ = 0.997862', '']]} />
          <${P} small=${true}>${X('Period (m₁ − 1)(m₂ − 1)/2 ≈ 2 × 10¹⁸ (slide 28; exactly about 2.3 × 10¹⁸).', 'الـ period بيساوي <bdi dir="ltr">(m₁ − 1)(m₂ − 1)/2 ≈ 2 × 10¹⁸</bdi> (سلايد 28، وبالظبط حوالي <bdi dir="ltr">2.3 × 10¹⁸</bdi>).')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('‡ Slide 26 writes the j-th generator as (a<sub>j</sub>X<sub>i</sub> + c<sub>j</sub>) mod m<sub>j</sub>. For a multiplicative generator c<sub>j</sub> = 0 and it uses its own X<sub>i,j</sub>: X<sub>i+1,j</sub> = a<sub>j</sub>X<sub>i,j</sub> mod m<sub>j</sub>, as slide 28 does.',
            '‡ سلايد 26 كاتب الـ generator رقم j بـ <bdi dir="ltr">+ c<sub>j</sub></bdi>. بس الـ multiplicative يعني <bdi dir="ltr">c<sub>j</sub> = 0</bdi>، وكل واحد بيستخدم الـ X بتاعه هو، زي سلايد 28:<span class="ltr">X<sub>i+1,j</sub> = a<sub>j</sub>X<sub>i,j</sub> mod m<sub>j</sub></span>')}</p></${Box}>
        `),

        // 26 · CLCG figure
        page(html`
          <${Fig} name="ms-clcg" />
        `),

        // 27 · Excel and dumb questions
        page(html`
          <${H2}>${t('Excel 2003: three generators in one', 'الـ Excel 2003: تلات generators في واحد')}</${H2}>
          <${Code} lines=${['X = X·171 mod 30269', 'Y = Y·172 mod 30307', 'Z = Z·170 mod 30323', 'R = (X/30269 + Y/30307', ['     + Z/30323) mod 1.0', t('seeds ≤ 30000', 'الـ seeds لحد 30000')]]} />
          <${P} small=${true}>${X('It is stated to produce more than <b>10¹³</b> numbers (slide 29).', 'ومكتوب إنه بيطلّع أكتر من <b>10¹³</b> رقم (سلايد 29).')}</${P}>
          <${Dumb} qa=${A ? [
            ['ليه الـ <bdi dir="ltr">(−1)<sup>j−1</sup></bdi> في الـ CLCG؟', 'الـ notes بتقول إنها بتعمل الطرح <bdi dir="ltr">X<sub>i,1</sub> − 1</bdi> بشكل ضمني. ‡ ومع <bdi dir="ltr">k = 2</bdi> بتبقى الطرح ده بالظبط:<span class="ltr">X<sub>i,1</sub> − X<sub>i,2</sub></span>'],
            ['ليه X بـ صفر ليها R مختلفة؟', 'عشان <bdi dir="ltr">X/m₁</bdi> كانت هتطلع صفر، فالسلايد بترجّع بدالها <bdi dir="ltr">(m₁ − 1)/m₁</bdi>.']
          ] : [
            ['Why the (−1)<sup>j−1</sup> in the CLCG?', 'The notes say it implicitly performs the subtraction X<sub>i,1</sub> − 1. ‡ With k = 2 it is exactly X<sub>i,1</sub> − X<sub>i,2</sub>.'],
            ['Why does X = 0 get a different R?', 'X/m₁ would be 0, so the slide returns (m₁ − 1)/m₁ instead.']
          ]} />
        `),

        // 28 · hypotheses
        page(html`
          <${H2}>${t('Testing: what H₀ really means', 'الاختبارات: الـ H₀ معناها إيه بجد')}</${H2}>
          <${P} small=${true}>${X('Two categories of tests: <b>uniformity</b> and <b>independence</b>.', 'فيه نوعين اختبارات: <b>uniformity</b> و<b>independence</b>.')}</${P}>
          <${Code} lines=${[['H₀: Rᵢ ~ U[0,1]', t('uniformity', 'uniformity')], ['H₀: Rᵢ ~ independent', t('independence', 'independence')], ['α = P(reject H₀ | H₀ true)', '']]} />
          <${Def}>${X('<b>Failure to reject H₀</b> means that evidence of non-uniformity (or of dependence) <b>has not been detected</b>. The level of significance α is frequently set to <b>0.01 or 0.05</b>. ‡',
            'إننا <b>منرفضش الـ H₀</b> معناها إننا <b>ملقيناش دليل</b> على إن الأرقام مش uniform (أو إنها dependent). والـ α غالبًا بنخليها <b>0.01 أو 0.05</b>. ‡')}</${Def}>
          <${Dumb} qa=${A ? [
            ['يعني لو الاختبار معداش رفض، الأرقام عشوائية؟', 'لأ. ده بس معناه إن مفيش دليل ضدها اتشاف. ومعناهوش إننا خلاص مش محتاجين نختبر الـ independence تاني. ‡'],
            ['والـ <bdi dir="ltr">α = 0.05</bdi> معناها إيه؟', 'احتمال <bdi dir="ltr">5%</bdi> إننا نرفض الـ H₀ وهي صح.']
          ] : [
            ['So if a test doesn\'t reject, the numbers are random?', 'No. Only that no evidence against them was found. It does not mean further testing for independence is unnecessary. ‡'],
            ['What does α = 0.05 mean?', 'A 5% chance of rejecting H₀ when it is true.']
          ]} />
        `, { sec: t('Testing random numbers', 'اختبار الـ random numbers') }),

        // 29 · five tests figure
        page(html`
          <${Fig} name="ms-rn-tests" head=${t('Five tests: one for uniformity, four for independence', 'خمس اختبارات: واحد للـ uniformity، وأربعة للـ independence')} />
        `),

        // 30 · sort: U or I
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Uniformity or independence? Tap <b>U</b> or <b>I</b>. Careful: the statistic a test uses doesn\'t tell you what it tests.',
            'uniformity ولا independence؟ دوس <b>U</b> أو <b>I</b>. خد بالك: الـ statistic اللي الاختبار بيستخدمه مش بيقولك هو بيختبر إيه.')}</p></${Box}>
          <${Sort} id="ui" bins=${A ? [['U', 'الـ uniformity'], ['I', 'الـ independence']] : [['U', 'Uniformity'], ['I', 'Independence']]} items=${A ? [
            ['الـ KS على الأرقام نفسها، قصاد <bdi dir="ltr">F(x) = x</bdi>', 0],
            ['الـ chi‑square على 10 فترات متساوية', 0],
            ['الـ runs up and down', 1],
            ['الـ runs above and below the mean', 1],
            ['الـ autocorrelation test', 1],
            ['الـ KS على أطوال الـ gaps', 1],
            ['الـ chi‑square على الـ poker hands', 1],
            ['الـ frequency test', 0]
          ] : [
            ['KS on the numbers against F(x) = x', 0],
            ['Chi-square on 10 equal intervals', 0],
            ['Runs up and down', 1],
            ['Runs above and below the mean', 1],
            ['Autocorrelation test', 1],
            ['KS on the gap lengths', 1],
            ['Chi-square on poker hands', 1],
            ['The frequency test', 0]
          ]} />
        `, { sec: t('Exercise: U or I?', 'تمرين: U ولا I؟') }),

        // 31 · KS
        page(html`
          <${H2}>${t('Frequency test 1: Kolmogorov-Smirnov', 'الـ Frequency test الأول: الـ KS')}</${H2}>
          <${P} small=${true}>${X('Compare the uniform CDF <b>F(x) = x</b> with the <b>empirical CDF S<sub>N</sub>(x)</b> = (number of R<sub>i</sub> ≤ x)/N, a staircase. D⁺ is the largest deviation of S<sub>N</sub> <b>above</b> F, D⁻ the largest <b>below</b>. ‡',
            'بنقارن الـ CDF بتاعة الـ uniform، يعني <bdi dir="ltr"><b>F(x) = x</b></bdi>، بالـ <b>empirical CDF</b> اللي اسمها <bdi dir="ltr">S<sub>N</sub>(x)</bdi>، وهي سلّم: عدد الـ R<sub>i</sub> اللي أقل من أو بتساوي x على N. الـ D⁺ أكبر انحراف <b>فوق</b> الـ F، والـ D⁻ أكبر انحراف <b>تحتها</b>. ‡')}</${P}>
          <${Code} lines=${[['1. sort: R(1) ≤ … ≤ R(N)', ''], ['2. D⁺ = max{ i/N − R(i) }', ''], ['   D⁻ = max{ R(i) − (i−1)/N }', ''], ['3. D  = max(D⁺, D⁻)', ''], ['4. Dα from Table A.8', ''], ['5. D ≤ Dα → do not reject', '']]} />
          <${P} small=${true}>${X('For N over 35: D<sub>α</sub> = 1.22/√N, <b>1.36/√N</b>, 1.63/√N for α = 0.10, 0.05, 0.01.', 'ولما N أكبر من 35:<span class="ltr">Dα = 1.22/√N, 1.36/√N, 1.63/√N  (α = 0.10, 0.05, 0.01)</span>')}</${P}>
        `, { sec: t('Kolmogorov-Smirnov test', 'اختبار الـ KS') }),

        // 32 · KS CDF figure
        page(html`
          <${Fig} name="ms-ks-cdf" />
        `),

        // 33 · KS example
        page(html`
          <${H2}>${t('KS on five numbers', 'الـ KS على خمس أرقام')}</${H2}>
          <${P} small=${true}>${X('Data: 0.44, 0.81, 0.14, 0.05, 0.93; α = 0.05. Sort first:', 'الداتا:<span class="ltr">0.44, 0.81, 0.14, 0.05, 0.93   (α = 0.05)</span>رتّب الأول:')}</${P}>
          <${Code} lines=${['R(i)        .05 .14 .44 .81 .93', 'i/N         .20 .40 .60 .80 1.0', 'i/N − R     .15 .26 .16  -  .07', 'R − (i−1)/N .05  -  .04 .21 .13']} />
          <${P} small=${true}>${X('D = max(0.26, 0.21) = <b>0.26</b>. For N = 5, D<sub>0.05</sub> = 0.565 > 0.26: <b>H₀ is not rejected</b>. ("-" marks a negative value, which can\'t be the max.)',
            'الـ D هي الأكبر، يعني <b>0.26</b>. ومع <bdi dir="ltr">N = 5</bdi> الـ critical value هي 0.565، أكبر من 0.26: <b>منرفضش الـ H₀</b>. (العلامة "-" معناها قيمة سالبة، مينفعش تبقى الـ max.)')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Sort first.</b> ‡ The lecture spreadsheet\'s "KSTest" sheet applies the D⁺/D⁻ formulas to the numbers <b>unsorted</b>, so its values (0.75, 0.61) are not KS statistics. The right answer is D = 0.26, as on slide 37.',
            '<b>رتّب الأول.</b> ‡ شيت "KSTest" في الـ spreadsheet بيطبّق معادلات الـ D⁺ والـ D⁻ على الأرقام <b>من غير ترتيب</b>، فالقيم بتاعته (0.75 و 0.61) مش الـ KS statistics. والصح <bdi dir="ltr">D = 0.26</bdi> زي سلايد 37.')}</p></${Box}>
        `),

        // 34 · KS figure
        page(html`
          <${Fig} name="ms-ks" />
        `),

        // 35 · chi-square
        page(html`
          <${H2}>${t('Frequency test 2: chi-square', 'الـ Frequency test التاني: الـ chi‑square')}</${H2}>
          <${Code} lines=${[['χ₀² = Σ (Oᵢ − Eᵢ)² / Eᵢ', ''], ['Eᵢ = N / n', t('uniform', 'للـ uniform')], ['df = n − 1', t('n = classes', 'الـ n عدد الـ classes')]]} />
          <${UL} items=${A ? [
            'الـ O<sub>i</sub> اللي اتشاف في الـ class رقم i، والـ E<sub>i</sub> المتوقع فيها.',
            '<b>بيشتغل بس مع العينات الكبيرة</b>، زي <bdi dir="ltr">N ≥ 50</bdi>. واختار n بحيث كل <bdi dir="ltr">E<sub>i</sub> ≥ 5</bdi>. ‡',
            'ارفض الـ H₀ لو الـ χ₀² أكبر من <bdi dir="ltr">χ²<sub>α,n−1</sub></bdi>. ‡',
            'الـ KS <b>أقوى</b> لأنه بينفع مع العينات الصغيرة. ‡ (من الـ notes)'
          ] : [
            'O<sub>i</sub> = observed in class i, E<sub>i</sub> = expected in class i.',
            '<b>Valid only for large samples</b>, e.g. N ≥ 50. Choose n so that each E<sub>i</sub> ≥ 5. ‡',
            'Reject H₀ if χ₀² > χ²<sub>α,n−1</sub>. ‡',
            'KS is <b>more powerful</b>: it works on small samples. ‡ (lecture notes)'
          ]} />
          <${Code} lines=${[['df     1     2     3     4     9', ''], ['χ²  3.84  5.99  7.81  9.49  16.9', '']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Degrees of freedom: <b>n − 1</b>, with n the number of <b>classes</b>. Not N − 1 (N is the number of observations), and not N/n (that\'s E<sub>i</sub>).',
            'الـ degrees of freedom هي <bdi dir="ltr"><b>n − 1</b></bdi>، والـ n عدد الـ <b>classes</b>. مش <bdi dir="ltr">N − 1</bdi> (الـ N عدد الـ observations)، ومش <bdi dir="ltr">N/n</bdi> (دي الـ E<sub>i</sub>).')}</p></${Box}>
        `, { sec: t('Chi-square test', 'اختبار الـ chi‑square') }),

        // 36 · chi-square slide figure
        page(html`
          <${Fig} name="ms-chisq-slide" head=${t('Slide 40, interval by interval (the figure notes the slide\'s ‡ Sum-row slip)', 'سلايد 40، فترة فترة (والرسمة بتوضّح غلطة صف الـ Sum ‡)')} />
        `),

        // 37 · Example 4.5 figure
        page(html`
          <${Fig} name="ms-chisq-data" />
        `),

        // 38 · fireside chat: KS vs chi-square
        page(html`
          <${Fireside} sub=${t('Tonight: the two frequency tests argue about who is better.', 'قعدة الليلة: اختبارين الـ frequency بيتخانقوا مين الأحسن.')} />
          <${Chat} names=${A ? ['الـ KS', 'الـ Chi‑square'] : ['KS', 'Chi-square']} lines=${A ? [
            [0, 'إديني 5 أرقام بس، وأنا أقارن السلّم بتاعهم بالخط <bdi dir="ltr">F(x) = x</bdi>.'],
            [1, 'أنا محتاج زحمة: <bdi dir="ltr">N ≥ 50</bdi>، وكل class متوقع فيها 5 على الأقل.'],
            [0, 'عشان كده الـ notes بتقول إني <b>أقوى</b>: بشتغل مع العينات الصغيرة. ‡'],
            [1, 'بس أنا بعدّ: بحط الأرقام في n classes، وأقارن O بـ E.'],
            [0, 'وأنا بقيس: أكبر فرق رأسي D بين F و S<sub>N</sub>.'],
            [1, 'بارفض لو الـ χ₀² أكبر من <bdi dir="ltr">χ²<sub>α,n−1</sub></bdi>.'],
            [0, 'وأنا لو D أكبر من Dα في Table A.8.'],
            [1, 'وفي الآخر إحنا الاتنين بنختبر الـ <b>uniformity</b> بس. لستة مترتبة هتعدّي من عندنا إحنا الاتنين.'],
            [0, 'صح. الـ independence دي شغلانة الـ runs test.']
          ] : [
            [0, 'Give me just five numbers and I\'ll compare their staircase with the line F(x) = x.'],
            [1, 'I need a crowd: N ≥ 50, and every class expecting at least 5.'],
            [0, 'That\'s why the notes call me <b>more powerful</b>: I work on small samples. ‡'],
            [1, 'But I count: drop the numbers into n classes, compare O with E.'],
            [0, 'And I measure: the biggest vertical gap D between F and S<sub>N</sub>.'],
            [1, 'I reject if χ₀² > χ²<sub>α,n−1</sub>.'],
            [0, 'I reject if D > D<sub>α</sub> from Table A.8.'],
            [1, 'And we both only check <b>uniformity</b>. A sorted list would pass us both.'],
            [0, 'True. Independence is the runs test\'s job.']
          ]} />
        `),

        // 39 · why runs
        page(html`
          <${Fig} name="ms-runs-why" head=${t('Brain Power: KS and chi-square both call these 40 numbers uniform. Are they random?', 'شغّل مخك: الـ KS والـ chi‑square بيقولوا إن الـ 40 رقم دول uniform. طب هما random؟')} />
        `, { sec: t('Runs tests', 'الـ Runs tests') }),

        // 40 · runs up and down
        page(html`
          <${H2}>${t('Runs up and down', 'الـ Runs up and down')}</${H2}>
          <${Def}>${X('A <b>run</b> is a succession of similar events preceded and followed by a different event; its <b>length</b> is the number of events in it. ‡ Coin: H T T H H T T T H T has 6 runs (1, 2, 2, 3, 1, 1).',
            'الـ <b>run</b> سلسلة أحداث شبه بعض، قبلها وبعدها حدث مختلف، والـ <b>length</b> عدد الأحداث اللي فيها. ‡ مثال العملة فيه 6 runs أطوالهم <bdi dir="ltr">1, 2, 2, 3, 1, 1</bdi>:<span class="ltr">H T T H H T T T H T</span>')}</${Def}>
          <${P} small=${true}>${X('Write <b>+</b> if a number is followed by a larger one, <b>−</b> if by a smaller one. N numbers give N − 1 signs, so at most <b>N − 1</b> runs and at least <b>one</b>.',
            'اكتب <b>+</b> لو الرقم جه بعده رقم أكبر، و <b>−</b> لو أصغر. الـ N رقم بيدّوا <bdi dir="ltr">N − 1</bdi> إشارة، فأقصى عدد runs هو <bdi dir="ltr"><b>N − 1</b></bdi> وأقل عدد <b>واحد</b>.')}</${P}>
          <${Code} lines=${[['μa  = (2N − 1)/3', ''], ['σa² = (16N − 29)/90', ''], ['Z₀  = (a − μa)/σa', t('N > 20', 'لما N > 20')], ['|Z₀| ≤ z(α/2) → do not reject', '']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('The <b>number</b> of runs uses Z; the <b>length</b> of runs uses chi-square. ‡ Slide 32 says chi-square for both. And ‡ slide 55 writes μ<sub>a</sub> = (2n − 1)/3 with a small n: it is the same N.',
            'الـ <b>عدد</b> الـ runs بيستخدم Z، و<b>طول</b> الـ runs بيستخدم chi‑square. ‡ سلايد 32 بيقول chi‑square للاتنين. و‡ سلايد 55 كاتب الـ μa بـ n صغيرة، وهي نفس الـ N.')}</p></${Box}>
        `),

        // 41 · runs up and down figure
        page(html`
          <${Fig} name="ms-runs-ud" />
        `),

        // 42 · from the exam: runs on 30 numbers
        page(html`
          <${H2}>${t('From the Final 2025/26: runs on 30 numbers', 'من امتحان الـ Final: الـ runs على 30 رقم')}</${H2}>
          <${P} small=${true}>${X('The exam gave the 30 numbers of slide 48 (0.12 0.01 0.23 … 0.69 0.87), α = 0.05. Our worked answer:',
            'الامتحان إدّى الـ 30 رقم بتوع سلايد 48، و<bdi dir="ltr">α = 0.05</bdi>. والحل بتاعنا:')}</${P}>
          <${Code} lines=${['−+++−+−+++−+++−+−++−−−++−−+++', ['a = 16 runs', t('29 signs', '29 إشارة')], 'μa  = (60 − 1)/3 = 19.67', 'σa² = (480 − 29)/90 = 5.011', 'Z₀ = (16 − 19.67)/2.239', ['   = −1.64', ''], ['−1.96 ≤ −1.64 ≤ 1.96', '']]} />
          <${P} small=${true}>${X('Inside the acceptance region: the hypothesis of independence <b>cannot be rejected</b>.', 'جوه منطقة القبول: الـ independence <b>مينفعش نرفضها</b>.')}</${P}>
          <${Hand} red=${true}>${X('Count carefully across the line breaks: 0.93 → 0.99 is +, 0.88 → 0.68 is −.', 'عدّ كويس عند آخر كل سطر: الـ <bdi dir="ltr">0.93 → 0.99</bdi> تبقى +، والـ <bdi dir="ltr">0.88 → 0.68</bdi> تبقى −.')}</${Hand}>
        `),

        // 43 · acceptance region
        page(html`
          <${Fig} name="ms-z-region" />
        `),

        // 44 · runs above and below the mean
        page(html`
          <${H2}>${t('Runs above and below the mean', 'الـ Runs above and below the mean')}</${H2}>
          <${P} small=${true}>${X('<b>+</b> = above the mean, <b>−</b> = below. For uniform two-digit numbers the mean is (0.99 + 0.00)/2 = <b>0.495</b>. n₁ = number above, n₂ = below, N = n₁ + n₂, b = number of runs. ‡',
            'الـ <b>+</b> يعني فوق الـ mean، والـ <b>−</b> تحته. وللأرقام الـ uniform اللي من خانتين الـ mean بـ <b>0.495</b>. والـ n₁ عدد اللي فوق، والـ n₂ اللي تحت، والـ b عدد الـ runs. ‡')}</${P}>
          <${Code} lines=${[['μb  = 2n₁n₂/N + 1/2', ''], ['σb² = 2n₁n₂(2n₁n₂ − N)', ''], ['      / [N²(N − 1)]', t('n₁ or n₂ > 20', 'لما n₁ أو n₂ > 20')]]} />
          <${P} small=${true}>${X('<b>Example 4.8</b> (the 40 numbers of slide 57): n₁ = 18, n₂ = 22, b = 17.', '<b>مثال 4.8</b> (نفس الـ 40 رقم بتوع سلايد 57):<span class="ltr">n₁ = 18,  n₂ = 22,  N = 40,  b = 17</span>')}</${P}>
          <${Code} lines=${['μb = 2(18)(22)/40 + 1/2 = 20.3', 'σb² = 9.54', ['Z₀ = (17 − 20.3)/√9.54 = −1.07', t('not rejected', 'منرفضش')]]} />
          <${P} small=${true}>${X('Disadvantage ‡: numbers alternating in a pattern (two below, two above, …) are dependent, which this count may not reveal.', 'العيب ‡: لو الأرقام ماشية بنمط (اتنين تحت، اتنين فوق، …) تبقى dependent، والعدّ ده ممكن ميكشفهاش.')}</${P}>
        `),

        // 45 · runs above/below figure
        page(html`
          <${Fig} name="ms-runs-ab" />
        `),

        // 46 · length of runs
        page(html`
          <${H2}>${t('Length of runs', 'طول الـ runs')}</${H2}>
          <${P} small=${true}>${X('Y<sub>i</sub> = number of runs of length i. Compare observed O<sub>i</sub> with E(Y<sub>i</sub>) by <b>chi-square</b>, L − 1 degrees of freedom after combining small classes. ‡ For runs up and down:',
            'الـ Y<sub>i</sub> عدد الـ runs اللي طولها i. بنقارن الـ O<sub>i</sub> بالـ E(Y<sub>i</sub>) بالـ <b>chi‑square</b>، بـ <bdi dir="ltr">L − 1</bdi> degrees of freedom بعد ما نجمع الـ classes الصغيرة. ‡ وللـ runs up and down:')}</${P}>
          <${Code} lines=${['E(Yᵢ) = 2/(i+3)! ·', '  [N(i²+3i+1) − (i³+3i²−i−4)]']} />
          <${P} small=${true}>${X('<b>Example 4.9</b> (60 numbers, 40 runs) ‡:', '<b>مثال 4.9</b> (60 رقم، 40 run) ‡:')}</${P}>
          <${Code} lines=${[['O: 26, 9, 5, 0', t('i = 1, 2, 3, ≥4', 'i = 1, 2, 3, ≥4')], 'E: 25.08, 10.77, 3.04, 0.78', ['≥4 = μa − sum = 39.67 − 38.89', ''], ['join 2..≥4: O = 14, E = 14.59', ''], ['χ₀² ≈ 0.05 < χ²(0.05,1) = 3.84', '']]} />
          <${P} small=${true}>${X('‡ Table 4.3 lists E(Y₃) = 3.82; the formula gives 3.04. Example 4.10 (above/below, n₁ = 28, n₂ = 32): χ₀² = 0.68 < 5.99. Both: not rejected.',
            '‡ جدول 4.3 كاتب الـ E(Y₃) بـ 3.82، والمعادلة بتدّي 3.04. ومثال 4.10 (فوق وتحت الـ mean) بيطلّع <bdi dir="ltr">χ₀² = 0.68 < 5.99</bdi>. والاتنين: منرفضش.')}</${P}>
        `),

        // 47 · run length figure
        page(html`
          <${Fig} name="ms-runs-len" />
        `),

        // 48 · autocorrelation
        page(html`
          <${H2}>${t('The autocorrelation test', 'الـ Autocorrelation test')}</${H2}>
          <${P} small=${true}>${X('In slide 48\'s 30 numbers, the 5th, 10th, 15th, … are all large. A sequence can pass the other tests and still be dependent. ‡ So test every <b>m</b>-th number (m = the <b>lag</b>) starting at the i-th: R<sub>i</sub>, R<sub>i+m</sub>, R<sub>i+2m</sub>, …',
            'في الـ 30 رقم بتوع سلايد 48، الأرقام الخامس والعاشر والـ 15 و… كلهم كبار. السلسلة ممكن تعدّي الاختبارات التانية وبرضه تبقى dependent. ‡ فبنختبر كل رقم رقم <b>m</b> (والـ m اسمه الـ <b>lag</b>) من أول الرقم رقم i.')}</${P}>
          <${Code} lines=${[['M: largest with i + (M+1)m ≤ N', ''], ['ρ̂ = Σ R(i+km)·R(i+(k+1)m)', ''], ['      / (M+1)  − 0.25', t('k = 0..M', 'k = 0..M')], ['σ̂ = √(13M + 7) / [12(M+1)]', ''], ['Z₀ = ρ̂ / σ̂ ~ N(0,1)', '']]} />
          <${UL} items=${A ? [
            'الـ H₀ إن الـ ρ<sub>im</sub> بصفر (independent)، والـ H₁ إنها مش صفر.',
            'لو <bdi dir="ltr">ρ > 0</bdi>: <b>positive autocorrelation</b>، الأرقام العالية بييجي بعدها عالية، والعكس.',
            'لو <bdi dir="ltr">ρ < 0</bdi>: <b>negative autocorrelation</b>، الواطية بييجي بعدها عالية، والعكس.'
          ] : [
            'H₀: ρ<sub>im</sub> = 0 (independent); H₁: ρ<sub>im</sub> ≠ 0.',
            'ρ > 0: <b>positive autocorrelation</b>: high numbers tend to be followed by high ones, and vice versa.',
            'ρ < 0: <b>negative autocorrelation</b>: low numbers tend to be followed by high ones, and vice versa.'
          ]} />
        `, { sec: t('Autocorrelation test', 'الـ Autocorrelation test') }),

        // 49 · autocorrelation example
        page(html`
          <${H2}>${t('The 3rd, 8th, 13th, … numbers', 'الرقم التالت والتامن والـ 13 و…')}</${H2}>
          <${Code} lines=${[['i = 3, m = 5, N = 30, α = 0.05', ''], ['3 + (M+1)·5 ≤ 30 → M = 4', ''], 'R: .23 .28 .33 .27 .05 .36', ['Σ products = 0.2774', ''], 'ρ̂ = 0.2774/5 − 0.25 = −0.1945', 'σ̂ = √59/60 = 0.1280', ['Z₀ = −0.1945/0.1280 = −1.519', ''], ['−1.96 ≤ Z₀ ≤ 1.96', t('not rejected', 'منرفضش')]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ Slide 51 prints Z₀ = −1.516; exact division gives <b>−1.519</b> (the notes\' value). ‡ The Final 2024/25 asked the same at <b>α = 0.01</b>, with the hint "Z<sub>0.01</sub> = 1.30". That hint is wrong: use z<sub>0.005</sub> = <b>2.576</b>. Still not rejected.',
            '‡ سلايد 51 كاتب <bdi dir="ltr">Z₀ = −1.516</bdi>، والقسمة بالظبط بتدّي <bdi dir="ltr"><b>−1.519</b></bdi> (قيمة الـ notes). ‡ والـ Final <bdi dir="ltr">2024/25</bdi> سأل نفس السؤال بـ <bdi dir="ltr"><b>α = 0.01</b></bdi> وإدّى hint غلط:<span class="ltr">"Z<sub>0.01</sub> = 1.30"</span>الصح <bdi dir="ltr">z<sub>0.005</sub> = <b>2.576</b></bdi>، وبرضه منرفضش.')}</p></${Box}>
        `),

        // 50 · autocorrelation figure
        page(html`
          <${Fig} name="ms-autocorr" />
        `),

        // 51 · gap test
        page(html`
          <${H2}>${t('The gap test', 'الـ Gap test')}</${H2}>
          <${Def}>${X('The gap test measures the <b>number of digits between successive occurrences of the same digit</b>.', 'الـ gap test بيقيس <b>عدد الـ digits اللي ما بين كل ظهور والظهور اللي بعده لنفس الـ digit</b>.')}</${Def}>
          <${UL} items=${A ? [
            'في الـ 110 digit فيه <b>18 مرة</b> ظهرت فيها الـ 3، يعني <b>17 gap</b>، وأوّلهم طوله 10.',
            'عدد الـ gaps بيساوي حجم الداتا ناقص عدد الـ digits:<span class="ltr">110 − 10 = 100 gaps</span>'
          ] : [
            'In the 110 digits the digit 3 appears <b>18 times</b>: <b>17 gaps</b>, the first of length 10.',
            'Number of gaps = N − number of digits = 110 − 10 = <b>100</b>.'
          ]} />
          <${Code} lines=${['P(gap = x) = (0.9)ˣ(0.1)', ['F(x) = 1 − 0.9^(x+1)', t('CDF', 'الـ CDF')], 'F(3) = 1 − 0.9⁴ = 0.3439', ['D = max|F(x) − S_N(x)|', t('KS', 'KS')]]} />
          <${P} small=${true}>${X('A gap of 10 = ten "not 3" (0.9 each) then a 3 (0.1). Reject independence if D > D<sub>α</sub>. ‡ Slide 43 writes "F(x) = 0.1 − Σ(0.9)<sup>n</sup>": it is a product, 0.1 × Σ<sub>n=0..x</sub>(0.9)<sup>n</sup> = 1 − 0.9<sup>x+1</sup>.',
            'الـ gap اللي طوله 10 يعني عشر مرات "مش 3" (كل واحدة 0.9) وبعدين 3 (0.1). ارفض الـ independence لو D أكبر من Dα. ‡ سلايد 43 كاتب طرح بدل ضرب، والصح:<span class="ltr">F(x) = 0.1 × Σ(0.9)ⁿ = 1 − 0.9^(x+1)</span>')}</${P}>
        `, { sec: t('Gap test', 'الـ Gap test') }),

        // 52 · gap digits figure
        page(html`
          <${Fig} name="ms-gap-digits" />
        `),

        // 53 · gap KS
        page(html`
          <${H2}>${t('The gap test\'s verdict', 'حكم الـ gap test')}</${H2}>
          <${P} small=${true}>${X('Gaps per digit: 7, 8, 8, 17, 10, 13, 7, 8, 9, 13 (digits 0 to 9, total 100). Group the lengths in classes of width 4 and compare the cumulative S<sub>N</sub>(x) with F(x) at each class\'s upper end:',
            'الـ gaps لكل digit من 0 لـ 9، والمجموع 100:<span class="ltr">7, 8, 8, 17, 10, 13, 7, 8, 9, 13</span>بنجمّع الأطوال في classes عرضها 4، ونقارن الـ S<sub>N</sub> التراكمية بالـ F عند آخر كل class:')}</${P}>
          <${Code} lines=${['class  S_N    F(x)    |F−S|', '0-3    0.35  0.3439  0.0061', '4-7    0.57  0.5695  0.0005', ['8-11   0.74  0.7176  0.0224', t('max', 'الأكبر')], '12-15  0.83  0.8147  0.0153']} />
          <${P} small=${true}>${X('D = <b>0.0224</b> < D<sub>0.05</sub> = 1.36/√100 = <b>0.136</b>: do <b>not</b> reject independence.', 'الـ D بـ <b>0.0224</b>، أقل من <bdi dir="ltr">1.36/√100 = <b>0.136</b></bdi>: <b>منرفضش</b> الـ independence.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('‡ Slide 45: F(27) is 1 − 0.9²⁸ = <b>0.9477</b>, not 0.9497. Re-counting the printed digits gives 1 gap in 36-39 and 2 in 44-47 (the slide has 2 and 1). D = 0.0224 and the verdict don\'t change.',
            '‡ سلايد 45: الـ F(27) بتساوي <bdi dir="ltr"><b>0.9477</b></bdi> مش 0.9497. ولو عدّينا الـ digits تاني بنلاقي gap واحد في <bdi dir="ltr">36-39</bdi> واتنين في <bdi dir="ltr">44-47</bdi> (السلايد عكسهم). والـ D والحكم زي ما هما.')}</p></${Box}>
        `),

        // 54 · gap KS figure
        page(html`
          <${Fig} name="ms-gap-ks" />
        `),

        // 55 · poker
        page(html`
          <${H2}>${t('The poker test', 'الـ Poker test')}</${H2}>
          <${P} small=${true}>${X('Based on how often digits <b>repeat</b> inside a number. Slide 60: 0.255 0.577 0.331 0.414 0.828 0.909: a pair in <b>every</b> number. Suspicious! Three-digit numbers have only three possibilities:',
            'مبني على قد إيه الـ digits <b>بتتكرر</b> جوه الرقم. سلايد 60 فيه الأرقام دي، وكل رقم فيهم فيه pair. ده يشكّك!<span class="ltr">0.255 0.577 0.331 0.414 0.828 0.909</span>والأرقام اللي من 3 خانات ليها 3 احتمالات بس:')}</${P}>
          <${Code} lines=${['all different = 0.9·0.8 = 0.72', 'three alike   = 0.1·0.1 = 0.01', 'one pair = 1 − 0.72 − 0.01 = 0.27']} />
          <${P} small=${true}>${X('1000 numbers, α = 0.05: observed 680, 31, 289; expected 720, 10, 270.', 'فيه 1000 رقم و<bdi dir="ltr">α = 0.05</bdi>:<span class="ltr">observed 680, 31, 289;  expected 720, 10, 270</span>')}</${P}>
          <${Code} lines=${['χ₀² = 2.22 + 44.10 + 1.34', '    = 47.66 > χ²(0.05,2) = 5.99']} />
          <${P} small=${true}>${X('‡ Slide 63 prints 2.24, 1.33 and 47.65; exactly 1600/720 = 2.22, 361/270 = 1.337, total 47.66. Independence is <b>rejected</b> either way.',
            '‡ سلايد 63 كاتب 2.24 و 1.33 و 47.65، والحساب بالظبط بيدّي 2.22 و 1.337 والمجموع 47.66. وفي الحالتين الـ independence <b>اترفضت</b>.')}</${P}>
        `, { sec: t('Poker test', 'الـ Poker test') }),

        // 56 · poker figure
        page(html`
          <${Fig} name="ms-poker" />
        `),

        // 57 · be the tester
        page(html`
          <${Box} kind="pencil" title=${t('Be the tester', 'خليك إنت الـ tester')}><p className="hf-p small">${t('Four tests on the lecture\'s data, step by step. (These are the site\'s practice problems.)', 'أربع اختبارات على داتا المحاضرة، خطوة بخطوة. (دي مسائل تدريب من الموقع.)')}</p></${Box}>
          <${Drill} id="tst" data=${TEST} ans=${TEST_ANS} />
        `, { sec: t('Exercise: be the tester', 'تمرين: خليك الـ tester') }),

        // 58 · real random numbers
        page(html`
          <${H2}>${t('And if you want the real thing?', 'ولو عايز العشوائي الحقيقي؟')}</${H2}>
          <${UL} items=${A ? [
            'موقع <b>random.org</b>: random numbers حقيقية لأي حد على الإنترنت، العشوائية فيها جاية من الـ <b>atmospheric noise</b>، وده أحسن من الـ pseudo‑random algorithms لحاجات كتير، زي اليانصيب والسحوبات والألعاب.',
            'موقع <b>randomnumbers.info</b>: أرقام من <b>quantum random number generator</b>.',
            'وفيه توليد <b>hardware</b>: جهاز خارجي أو كارت PCI.'
          ] : [
            '<b>random.org</b>: true random numbers from <b>atmospheric noise</b>, for many purposes better than pseudo-random algorithms; used for lotteries, draws, games.',
            '<b>randomnumbers.info</b>: numbers from a <b>quantum random number generator</b>.',
            '<b>Hardware</b>-based generators: an external box or a PCI card.'
          ]} />
          <${Talk} who="dice" flip=${true}>${t('Atmospheric noise, quantum physics… finally, some real competition.', 'الـ noise اللي في الجو، وفيزياء الكم… أخيرًا فيه منافسة بجد.')}</${Talk}>
        `, { sec: t('Real random numbers', 'الـ Random numbers الحقيقية') }),
        page(html`
          <${Fig} name="ms-rn-bitmap" />
        `),

        // 59 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("This lecture has one of the doctors' questions so far. Tap an answer to see why it's right or wrong.", 'المحاضرة دي ليها سؤال واحد من امتحانات الدكاترة لحد دلوقتي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /typical computer random number generator/)}
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${t('Hint: I calculate my numbers. What does that make them?', 'تلميح: أنا بحسب الأرقام بتاعتي. يبقى اسمها إيه؟')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),

        // 60 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions, not the doctors'. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /main problem of the midsquare/)}
          <${Gap} h=${2} />
          ${pq('p2', /maximum number of runs is N/)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p3', /and c = 0, the longest possible period/)}
          <${Gap} h=${4} />
          ${pq('p4', /exactly one pair/)}
        `),

        // 62 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Pseudo‑random</b> يعني أرقام محسوبة بمعادلة، بتقلّد الـ <b>uniformity</b> والـ <b>independence</b>. والـ <bdi dir="ltr">E(R) = 1/2</bdi> والـ <bdi dir="ltr">V(R) = 1/12</bdi>.',
            'الـ <b>Midsquare</b>: ربّع وخد الـ 4 اللي في النص، ومشكلته إن الأرقام بتميل للصفر.',
            'الـ <b>LCG</b>:<span class="ltr">X(i+1) = (aX(i) + c) mod m,  R = X/m</span>',
            'أطول period: الـ <b>m</b> لو <bdi dir="ltr">c ≠ 0</bdi>، والـ <b>m/4</b> لو <bdi dir="ltr">c = 0</bdi> بـ seed فردي، والـ <bdi dir="ltr"><b>m − 1</b></bdi> لو m أولي.',
            'الـ <b>CLCG</b> بيجمع multiplicative generators، والـ period بتاع L\'Ecuyer حوالي <bdi dir="ltr">2 × 10¹⁸</bdi>.',
            'الـ <b>Uniformity</b> بيتختبر بالـ KS أو الـ chi‑square <bdi dir="ltr">(df = n − 1)</bdi>.',
            'الـ <b>Independence</b> بيتختبر بالـ runs (Z للعدد، chi‑square للطول) والـ autocorrelation والـ gap (KS) والـ poker (chi‑square).',
            'منرفضش لو <bdi dir="ltr">−1.96 ≤ Z₀ ≤ 1.96</bdi> عند <bdi dir="ltr">α = 0.05</bdi>. وده معناه إن مفيش دليل، مش إثبات.'
          ] : [
            '<b>Pseudo-random</b>: computed by a formula, imitating <b>uniformity</b> and <b>independence</b>. E(R) = 1/2, V(R) = 1/12.',
            '<b>Midsquare</b>: square, keep the middle four; its numbers tend to 0.',
            '<b>LCG</b>: X<sub>i+1</sub> = (aX<sub>i</sub> + c) mod m, R<sub>i</sub> = X<sub>i</sub>/m.',
            'Longest period: <b>m</b> (c ≠ 0), <b>m/4</b> (c = 0, odd seed), <b>m − 1</b> (m prime).',
            '<b>CLCG</b> combines multiplicative generators; L\'Ecuyer\'s period ≈ 2 × 10¹⁸.',
            '<b>Uniformity</b>: KS or chi-square (df = n − 1).',
            '<b>Independence</b>: runs (Z for the number, chi-square for the length), autocorrelation, gap (KS), poker (chi-square).',
            'Do not reject if −1.96 ≤ Z₀ ≤ 1.96 at α = 0.05: "no evidence", not "proved".'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 63 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="dice">${t('Next time: turning my R\'s into arrival times and demands. Random-variate generation!', 'المرة الجاية: هنحوّل الـ R بتاعتي لأوقات وصول وطلبات. الـ Random‑variate generation!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [4], t: Date.now() } }}>${t('Quiz me on Lecture 4', 'امتحنّي في محاضرة 4')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 4, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 4, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

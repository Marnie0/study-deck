// Head First chapter for Modeling & Simulation Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Statistical models in simulation: random variables (discrete, continuous), PMF, PDF, CDF, expected value, variance and
// standard deviation, sums, C.O.V., covariance and correlation, quantiles, mean, median and mode, useful statistical models,
// Bernoulli, binomial, geometric, Poisson, uniform, exponential, normal (plus Weibull, triangular and lognormal from the notes),
// the Poisson process and its interarrival times, empirical distributions and the slides' worked discrete example.
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks the slide or notes errors the notes flag.
// Every number was worked by hand and checked with node: die E = 91/21 = 4.33, E(X²) = 21, V = 2.22, σ = 1.49; device
// P(2 ≤ X ≤ 3) = e⁻¹ − e^(−1.5) = 0.145, F(2) = 0.632, E = 2, E(X²) = 8, V = 4; chips 0.364 + 0.372 + 0.186 = 0.92, P(X > 2) = 0.0784;
// printers (0.4)²(0.6) = 0.096; Poisson(2) p = 0.135, 0.271, 0.271, 0.180, F = 0.135, 0.406, 0.677, 0.857, P(X ≥ 2) = 0.594;
// bus 5/6; lamp e⁻¹ = 0.368, F(2) = 0.487, 0.513 − 0.368 = 0.145 (0.1455); Φ(1) = 0.8413 → 0.1587, Φ(2) = 0.9772,
// Φ(0.667) − Φ(−0.333) = 0.378; Weibull ((1.5 − 1.34)/0.04)^0.5 = 2 → e⁻² = 0.135; triangular 1 − 16/34.83 = 0.541;
// discrete example E = 6.5, E(X²) = 49.9, V = 7.65, σ = 2.77; binomial mean 8 var 4 → q = 1/2, n = 16; mean 80 var 4 → n = 84.2.
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T3 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-ms3')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms3';
    s.textContent = `
.hfb .hf-ms3-tb{ display:grid; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-ms3-tb > span{ padding:4px 3px; font:600 13.5px/1.3 var(--mono); text-align:center; border-top:1px solid var(--hf-grey2); border-left:1px solid var(--hf-grey2); color:var(--ink); white-space:nowrap; }
.hfb .hf-ms3-tb > span.h{ background:var(--hf-grey); font-weight:800; border-top:0; }
.hfb .hf-ms3-tb > span.l{ border-left:0; color:var(--hf-k); font-weight:800; text-align:left; padding-left:7px; }
.hfb .hf-ms3-duo{ display:block; width:100%; height:auto; color:var(--hf-k); direction:ltr; }
.hfb .hf-ms3-duo text{ direction:ltr; unicode-bidi:isolate; }
.hfb .hf-ms3-dr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:7px; }
.hfb .hf-ms3-tabs{ display:flex; gap:5px; }
.hfb .hf-ms3-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms3-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-ms3-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-ms3-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-ms3-ask{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); }
.hfb .hf-ms3-work{ font:600 13px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; color:var(--ink); min-height:48px; }
.hfb .hf-ms3-work > div{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:hf-up .35s both; }
.hfb .hf-ms3-work .cur{ color:var(--hf-hand); }
.hfb .hf-ms3-q{ font:700 14px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-ms3-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-ms3-opts button{ font:700 13.5px/1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-ms3-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-ms3-ok{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-ms3-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-ms3-row .hf-btn{ padding:7px 9px; }
.hf-ar .hf-ms3-ask, .hf-ar .hf-ms3-bad, .hf-ar .hf-ms3-ok, .hf-ar .hf-ms3-q{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-ms3-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ms3-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-ms3-work{ direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: a discrete variable's bars (the loaded die, p(x) = x/21) next to a continuous variable's curve
  // (the inspection device, f(x) = ½e^(−x/2)) with the area between 2 and 3 shaded
  function Duo() {
    const Y0 = 96, bw = 15;
    const bars = [1, 2, 3, 4, 5, 6].map(x => ({ x, h: x / 21 / (6 / 21) * 70 }));
    const X = x => 186 + x * 17, Yc = x => Y0 - 0.5 * Math.exp(-x / 2) / 0.5 * 70;
    const d = Array.from({ length: 81 }, (_, k) => { const x = k / 10; return (k ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Yc(x).toFixed(1); }).join(' ');
    let a = 'M' + X(2) + ' ' + Y0; for (let k = 0; k <= 10; k++) { const x = 2 + k / 10; a += ' L' + X(x).toFixed(1) + ' ' + Yc(x).toFixed(1); } a += ' L' + X(3) + ' ' + Y0 + ' Z';
    return html`<svg className="hf-ms3-duo hf-in" viewBox="0 0 328 118" role="img" aria-label="Left: bars of a PMF for a loaded die. Right: a PDF curve with the area between 2 and 3 shaded." dir="ltr">
      <path d=${'M10 ' + Y0 + ' H150 M178 ' + Y0 + ' H322'} stroke="var(--graphite)" strokeWidth="1.4" />
      ${bars.map((b, j) => html`<g key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.2 + j * 0.1) + 's' }}><rect x=${14 + j * 22} y=${Y0 - b.h} width=${bw} height=${b.h} fill="currentColor" opacity=".85" /><text x=${14 + j * 22 + bw / 2} y=${Y0 + 15} textAnchor="middle" fontSize="13" fill="var(--ink)">${b.x}</text></g>`)}
      <path d=${a} fill="var(--hf-red)" opacity=".35" />
      <path d=${d} fill="none" stroke="currentColor" strokeWidth="2.6" />
      ${[0, 2, 4, 6, 8].map(x => html`<text key=${x} x=${X(x)} y=${Y0 + 15} textAnchor="middle" fontSize="13" fill="var(--ink)">${x}</text>`)}
      <text x="12" y="13" fontSize="13.5" fontWeight="700" fill="var(--ink)">PMF p(x) = x/21</text>
      <text x="196" y="13" fontSize="13.5" fontWeight="700" fill="var(--ink)">PDF f(x) = ½e^(−x/2)</text>
      <text x=${X(3) + 8} y=${Y0 - 22} textAnchor="start" fontSize="13" fontWeight="700" fill="var(--hf-red)">0.145</text>
    </svg>`;
  }

  // Be the calculator: five of the lecture's own problems, one step at a time. Every option is a real mistake; every answer was checked with node.
  const DRILL = [
    {
      en: '<b>Poisson</b> (final exam, January 2026): beeps per hour ~ Poisson(α = 2). Probability of <b>two or more</b> beeps in an hour?',
      ar: 'سؤال <b>Poisson</b> (امتحان يناير 2026): عدد الـ beeps في الساعة <bdi dir="ltr">Poisson(α = 2)</bdi>. احتمال <b>اتنين أو أكتر</b> في ساعة؟',
      steps: [
        { l: ['Which expression?', 'أنهي تعبير؟'], o: ['1 − F(2)', '1 − F(1)', 'F(2)'], a: 1, w: 'P(X ≥ 2) = 1 − F(1)',
          h: [['1 − F(2) is P(X ≥ 3): it throws X = 2 away.', 'الـ <bdi dir="ltr">1 − F(2)</bdi> دي <bdi dir="ltr">P(X ≥ 3)</bdi>: رمت الـ <bdi dir="ltr">X = 2</bdi>.'], null,
            ['F(2) is P(X ≤ 2): the other side.', 'الـ <bdi dir="ltr">F(2)</bdi> دي <bdi dir="ltr">P(X ≤ 2)</bdi>: الناحية التانية.']] },
        { l: ['p(0)?', 'قيمة p(0)؟'], o: ['0.135', '0.271', '0'], a: 0, w: 'p(0) = 2⁰e⁻²/0! = e⁻² = 0.135',
          h: [null, ['That is p(1) = 2e⁻².', 'دي <bdi dir="ltr">p(1) = 2e⁻²</bdi>.'], ['2⁰ = 1 and 0! = 1, so p(0) = e⁻², not 0.', 'الـ <bdi dir="ltr">2⁰ = 1</bdi> والـ <bdi dir="ltr">0! = 1</bdi>، يبقى <bdi dir="ltr">p(0) = e⁻²</bdi> مش صفر.']] },
        { l: ['p(1)?', 'قيمة p(1)؟'], o: ['0.135', '0.271', '0.541'], a: 1, w: 'p(1) = 2¹e⁻²/1! = 0.271',
          h: [['That is p(0).', 'دي <bdi dir="ltr">p(0)</bdi>.'], null, ['That is 2²e⁻²: the power is x = 1.', 'دي <bdi dir="ltr">2²e⁻²</bdi>: الأس هو <bdi dir="ltr">x = 1</bdi>.']] },
        { l: ['P(X ≥ 2)?', 'قيمة P(X ≥ 2)؟'], o: ['0.406', '0.594', '0.323'], a: 1, w: '1 − 0.406 = 0.594',
          h: [['0.406 is F(1) itself: subtract it from 1.', 'الـ 0.406 دي <bdi dir="ltr">F(1)</bdi> نفسها: اطرحها من 1.'], null, ['0.323 = 1 − F(2), which is P(X ≥ 3).', 'الـ 0.323 دي <bdi dir="ltr">1 − F(2)</bdi>، يعني <bdi dir="ltr">P(X ≥ 3)</bdi>.']] }
      ]
    },
    {
      en: '<b>Binomial</b> (Example 3.5): 2% of chips are non-conforming. A sample of <b>50</b>; the process stops if <b>more than two</b> are non-conforming. P(stopped)?',
      ar: 'سؤال <b>Binomial</b> (مثال 3.5): 2% من الـ chips مش مطابقة. بناخد sample فيها <b>50</b>، والـ process تقف لو <b>أكتر من اتنين</b> مش مطابقين. احتمال إنها تقف؟',
      steps: [
        { l: ['Distribution and parameters?', 'الـ distribution والـ parameters؟'], o: ['n = 50, p = 0.02', 'n = 50, p = 0.98', 'n = 2, p = 0.02'], a: 0, w: 'n = 50, p = 0.02, q = 0.98',
          h: [null, ['X counts non-conforming chips: p = 0.02 is the "success".', 'الـ X بيعد الـ chips اللي مش مطابقة: الـ "success" هنا <bdi dir="ltr">p = 0.02</bdi>.'], ['n is the sample size, 50. The 2 is the limit.', 'الـ n هي حجم الـ sample يعني 50. الـ 2 دي الحد.']] },
        { l: ['P(X = 0)?', 'قيمة P(X = 0)؟'], o: ['0.364', '0.98', '0.02'], a: 0, w: 'p(0) = (0.98)⁵⁰ = 0.364',
          h: [null, ['That is one chip conforming. All 50 must: (0.98)⁵⁰.', 'ده chip واحدة مطابقة. لازم الـ 50: <bdi dir="ltr">(0.98)⁵⁰</bdi>.'], ['That is one chip failing. X = 0 means none fails.', 'دي chip واحدة بايظة. والـ <bdi dir="ltr">X = 0</bdi> معناها ولا واحدة.']] },
        { l: ['P(X ≤ 2)?', 'قيمة P(X ≤ 2)؟'], o: ['0.92', '0.736', '0.186'], a: 0, w: ['p(1) = 50(0.02)(0.98)⁴⁹ = 0.372', 'p(2) = 1225(0.02)²(0.98)⁴⁸ = 0.186', '0.364 + 0.372 + 0.186 = 0.92'],
          h: [null, ['0.736 = 0.364 + 0.372: p(2) is missing.', 'الـ 0.736 دي <bdi dir="ltr">0.364 + 0.372</bdi>: ناقص <bdi dir="ltr">p(2)</bdi>.'], ['0.186 is p(2) alone: add p(0) and p(1).', 'الـ 0.186 دي <bdi dir="ltr">p(2)</bdi> لوحدها: زوّد <bdi dir="ltr">p(0)</bdi> و<bdi dir="ltr">p(1)</bdi>.']] },
        { l: ['P(process stopped)?', 'احتمال إن الـ process تقف؟'], o: ['0.92', '0.08', '0.186'], a: 1, w: 'P(X > 2) = 1 − 0.92 = 0.08',
          h: [['0.92 is P(X ≤ 2): the process keeps running.', 'الـ 0.92 دي <bdi dir="ltr">P(X ≤ 2)</bdi>: الـ process شغالة عادي.'], null, ['"More than two" is X > 2, not X = 2.', 'كلمة "أكتر من اتنين" معناها <bdi dir="ltr">X > 2</bdi> مش <bdi dir="ltr">X = 2</bdi>.']] }
      ]
    },
    {
      en: '<b>Geometric</b> (Example 3.6): 40% of printers are rejected. P(the first acceptable printer is the <b>third</b> one inspected)?',
      ar: 'سؤال <b>Geometric</b> (مثال 3.6): 40% من الطابعات بتترفض. احتمال إن أول طابعة مقبولة تكون <b>التالتة</b>؟',
      steps: [
        { l: ['p and q?', 'قيمة p و q؟'], o: ['p = 0.4, q = 0.6', 'p = 0.6, q = 0.4'], a: 1, w: 'p = 0.6 (accept), q = 0.4',
          h: [['A "success" is an accepted printer: p = 1 − 0.4 = 0.6.', 'الـ "success" هنا طابعة مقبولة: <bdi dir="ltr">p = 1 − 0.4 = 0.6</bdi>.'], null] },
        { l: ['p(3)?', 'قيمة p(3)؟'], o: ['0.144', '0.096', '0.216'], a: 1, w: 'p(3) = q²p = (0.4)²(0.6) = 0.096',
          h: [['0.144 = (0.6)²(0.4): p and q swapped.', 'الـ 0.144 دي <bdi dir="ltr">(0.6)²(0.4)</bdi>: بدّلت p و q.'], null, ['0.216 = (0.6)³: two failures come first.', 'الـ 0.216 دي <bdi dir="ltr">(0.6)³</bdi>: لازم اتنين fail الأول.']] }
      ]
    },
    {
      en: '<b>Exponential</b> (Example 3.9): lamp life in thousands of hours, λ = 1/3. P(it lasts between <b>2000 and 3000</b> hours)?',
      ar: 'سؤال <b>Exponential</b> (مثال 3.9): عمر اللمبة بالألف ساعة، و<bdi dir="ltr">λ = 1/3</bdi>. احتمال إنها تعيش بين <b>2000 و3000</b> ساعة؟',
      steps: [
        { l: ['The CDF F(x)?', 'الـ CDF؟'], o: ['1 − e^(−x/3)', 'e^(−x/3)', '(1/3)e^(−x/3)'], a: 0, w: 'F(x) = 1 − e^(−x/3)',
          h: [null, ['e^(−x/3) is 1 − F(x) = P(X > x).', 'الـ <bdi dir="ltr">e^(−x/3)</bdi> دي <bdi dir="ltr">P(X > x)</bdi>.'], ['That is the PDF f(x), not the CDF.', 'دي الـ PDF مش الـ CDF.']] },
        { l: ['F(3)?', 'قيمة F(3)؟'], o: ['0.632', '0.368', '0.513'], a: 0, w: 'F(3) = 1 − e⁻¹ = 0.632',
          h: [null, ['0.368 = e⁻¹ = P(X > 3).', 'الـ 0.368 دي <bdi dir="ltr">e⁻¹ = P(X > 3)</bdi>.'], ['0.513 = e^(−2/3): that belongs to x = 2.', 'الـ 0.513 دي <bdi dir="ltr">e^(−2/3)</bdi>: دي بتاعة <bdi dir="ltr">x = 2</bdi>.']] },
        { l: ['F(2)?', 'قيمة F(2)؟'], o: ['0.487', '0.513', '0.667'], a: 0, w: 'F(2) = 1 − e^(−2/3) = 0.487',
          h: [null, ['0.513 = e^(−2/3) = P(X > 2): subtract it from 1.', 'الـ 0.513 دي <bdi dir="ltr">P(X > 2)</bdi>: اطرحها من 1.'], ['2/3 is the exponent, not a probability.', 'الـ <bdi dir="ltr">2/3</bdi> ده الأس، مش احتمال.']] },
        { l: ['P(2 ≤ X ≤ 3)?', 'قيمة P(2 ≤ X ≤ 3)؟'], o: ['0.145', '1.119', '0.368'], a: 0, w: '0.632 − 0.487 = 0.145',
          h: [null, ['That adds F(3) + F(2). Subtract.', 'ده جمع <bdi dir="ltr">F(3) + F(2)</bdi>. اطرح.'], ['0.368 = P(X > 3), a different question.', 'الـ 0.368 دي <bdi dir="ltr">P(X > 3)</bdi>، سؤال تاني.']] }
      ]
    },
    {
      en: '<b>Normal</b> (slide 39): vessel loading time X ~ N(12, 4). P(loaded in <b>less than 10</b> hours)?',
      ar: 'سؤال <b>Normal</b> (سلايد 39): وقت تحميل السفينة <bdi dir="ltr">X ~ N(12, 4)</bdi>. احتمال إنها تتحمّل في <b>أقل من 10</b> ساعات؟',
      steps: [
        { l: ['σ?', 'قيمة σ؟'], o: ['4', '2', '16'], a: 1, w: 'σ² = 4, so σ = 2',
          h: [['4 is σ²: N(μ, σ²) puts the variance second.', 'الـ 4 دي σ²: الـ <bdi dir="ltr">N(μ, σ²)</bdi> بيحط الـ variance تاني.'], null, ['16 = 4²: take the square root.', 'الـ 16 دي <bdi dir="ltr">4²</bdi>: خد الجذر.']] },
        { l: ['z?', 'قيمة z؟'], o: ['−1', '−0.5', '1'], a: 0, w: 'z = (10 − 12)/2 = −1',
          h: [null, ['−0.5 divides by σ² = 4. Divide by σ = 2.', 'الـ −0.5 دي قسمة على σ² يعني 4. اقسم على <bdi dir="ltr">σ = 2</bdi>.'], ['The sign matters: 10 is below the mean.', 'الإشارة مهمة: الـ 10 تحت الـ mean.']] },
        { l: ['Φ(−1)?', 'قيمة Φ(−1)؟'], o: ['0.8413', '0.1587', '−0.8413'], a: 1, w: 'Φ(−1) = 1 − 0.8413 = 0.1587',
          h: [['0.8413 is Φ(1). Use Φ(−x) = 1 − Φ(x).', 'الـ 0.8413 دي <bdi dir="ltr">Φ(1)</bdi>. استخدم <bdi dir="ltr">Φ(−x) = 1 − Φ(x)</bdi>.'], null, ['A probability is never negative.', 'الاحتمال عمره ما يبقى سالب.']] }
      ]
    }
  ];
  const ANS = ['0.594', '0.08 (exactly 0.0784)', '0.096', '0.145', '0.1587'];
  const ANSAR = ['0.594', '0.08 (بالظبط 0.0784)', '0.096', '0.145', '0.1587'];
  function Drill({ id }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id + ':p', 0);
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const prog = [H.K.useSlot(id + ':0', 0)[0], H.K.useSlot(id + ':1', 0)[0], H.K.useSlot(id + ':2', 0)[0], H.K.useSlot(id + ':3', 0)[0], H.K.useSlot(id + ':4', 0)[0]];
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = DRILL[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    return html`<div className="hf-ms3-dr hf-in">
      <div className="hf-ms3-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${DRILL.map((_, j) => html`<button key=${j} className=${prog[j] >= DRILL[j].steps.length ? 'dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)} aria-label=${(ar ? 'مسألة ' : 'Problem ') + (j + 1)}>${j + 1}</button>`)}</div>
      <p className="hf-ms3-ask">${T3(ar ? P.ar : P.en)}</p>
      <div className="hf-ms3-work" dir="ltr">${P.steps.slice(0, k).reduce((a, s) => a.concat(s.w), []).map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}${!done && html`<div className="cur">${st.l[0].replace('?', ' = ?')}</div>`}</div>
      ${done ? html`<p className="hf-ms3-ok">${T3(ar ? `<b>خلصت!</b> الإجابة <bdi dir="ltr"><b>${ANSAR[p]}</b></bdi>.${p < DRILL.length - 1 ? ' جرّب المسألة اللي بعدها.' : ''}` : `<b>Done!</b> The answer is <b>${ANS[p]}</b>.${p < DRILL.length - 1 ? ' Try the next problem.' : ''}`)}</p>`
        : html`<p className="hf-ms3-q">${ar ? st.l[1] : st.l[0]}</p><div className="hf-ms3-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${o}</button>`)}</div>`}
      ${bad && html`<p className="hf-ms3-bad">${T3(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-ms3-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'ورّيني الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div>
    </div>`;
  }

  H.chapters.ms[3] = {
    title: 'Statistical Models in Simulation', kicker: 'Chapter 3', run: 'statistical models in simulation',
    ar: { title: 'الـ Statistical Models في الـ Simulation', kicker: 'الفصل 3', run: 'الـ statistical models' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (quiz items with src), with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arQuiz = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[3] && window.AR.ms.lectures[3].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const TB = ({ rows, cols }) => html`<div className="hf-ms3-tb hf-in" dir="ltr" style=${{ gridTemplateColumns: cols || ('auto repeat(' + (rows[0].length - 1) + ', 1fr)') }}>${rows.map((r, i) => r.map((c, j) => html`<span key=${i + '-' + j} className=${(i === 0 ? 'h' : '') + (j === 0 ? ' l' : '')}>${T(c)}</span>`))}</div>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("In Chapter 2 you ran simulation tables by hand, drawing interarrival and service times from tables of probabilities. <b>Where do those probabilities come from?</b> From statistical models, and that's this chapter. It's the course's maths lecture, so we drew it, and you'll calculate right on the page. Every fact is from the slides and the lecture notes.",
            'في الفصل 2 سحبت الـ interarrival والـ service times من جداول احتمالات. <b>طب الاحتمالات دي جاية منين؟</b> من الـ statistical models، وده الفصل ده. رسمناه، وهتحسب على الصفحة، وكل المعلومات من السلايدز والنوتس.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> The calculator drill checks every step you take.', '<b>حل التمارين.</b> تمرين الحسابات بيصحّحلك كل خطوة.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers what you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake on the slides or in the notes, and what was meant.', 'معناها غلطة في السلايد أو في النوتس، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t("Handwritten notes marked \"ours\" are our own tricks, not the slides'.", 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي حيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>Modeling & Simulation` : html`Chapter three<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Taming Randomness', 'ترويض العشوائية')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('statistical models in simulation', 'الـ statistical models في الـ simulation')}</p></div>
          <${Duo} />
          <${P} small=${true}>${X('The world a model-builder sees is <b>probabilistic rather than deterministic</b>, and a statistical model describes the variation. You build one by <b>sampling the phenomenon of interest</b>:',
            'العالم اللي بيشوفه اللي بيبني الـ model عالم <b>probabilistic مش deterministic</b>، والـ statistical model بيوصف التغيّرات دي. وبتبنيه إنك <b>تاخد samples من الظاهرة اللي بتدرسها</b>:')}</${P}>
          <${UL} items=${A ? ['تختار <b>distribution معروف</b> بتخمين مبني على فهم (educated guesses).', 'تعمل <b>estimate للـ parameters</b> بتاعته.', 'تعمل <b>test للـ goodness of fit</b>.']
            : ['Select a <b>known distribution</b> through educated guesses.', 'Make an <b>estimate of the parameters</b>.', '<b>Test for goodness of fit</b>.']} />
        `, { sec: t('Why statistical models', 'ليه statistical models') }),

        // 2 · random variables, discrete, PMF
        page(html`
          <${H1}>${t('Meet the random variable', 'اتعرّف على الـ random variable')}</${H1}>
          <${Def}>${X('A <b>random variable</b> is a rule that assigns a <b>number</b> to each outcome of an experiment: rolling a die gives a value from 1 to 6.',
            'الـ <b>random variable</b> قاعدة بتدّي <b>رقم</b> لكل نتيجة تجربة: الزهر بيطلّع من 1 لـ 6.')}</${Def}>
          <${P} small=${true}>${X('X is <b>discrete</b> if the number of its possible values is <b>finite, or countably infinite</b>:', 'الـ X بيبقى <b>discrete</b> لو عدد قيمه الممكنة <b>محدود (finite) أو countably infinite</b>:')}</${P}>
          <${UL} items=${A ? ['عدد الـ heads في 3 رميات عملة: <bdi dir="ltr">{0, 1, 2, 3}</bdi> (محدود).', 'عدد الشركات في محفظة mutual fund، وقيمه <bdi dir="ltr">{2, 3, 4, …}</bdi> (مفيش حد أعلى).', 'الـ packets اللي بتوصل الـ router في الثانية:<span class="ltr">R<sub>X</sub> = {0, 1, 2, …}</span>']
            : ['Heads in three coin flips: {0, 1, 2, 3} (finite).', 'Companies in a mutual fund portfolio: {2, 3, 4, …} (no stated upper limit).', 'Packets arriving each second at a router (the slide): R<sub>X</sub> = {0, 1, 2, …}, the <b>range space</b>.']} />
          <${P} small=${true}>${X('<b>p(xᵢ) = P(X = xᵢ)</b> is the <b>probability mass function (PMF)</b>; the pairs (xᵢ, p(xᵢ)) are the <b>probability distribution</b> of X. A PMF must satisfy:',
            'الـ <b>probability mass function (PMF)</b> هي الاحتمال عند كل قيمة، والأزواج هي الـ <b>probability distribution</b>:<span class="ltr"><b>p(xᵢ) = P(X = xᵢ)</b>,  (xᵢ, p(xᵢ))</span>')}</${P}>
          <${Code} lines=${[['p(xᵢ) ≥ 0, for all i', t('never negative', 'مفيش سالب')], ['Σ p(xᵢ) = 1', t('all of it adds to 1', 'المجموع 1')]]} />
        `, { sec: t('Random variables', 'الـ Random variables') }),

        // 3 · the loaded die
        page(html`
          <${H2}>${t('Example 3.1: a loaded die', 'مثال 3.1: زهر متلاعب فيه')}</${H2}>
          <${P} small=${true}>${X('From the lecture notes: X = spots on the up face, and p(x) is proportional to x. The total is 1 + 2 + … + 6 = 21 (the notes write "N = 21"), so <b>p(x) = x/21</b>, and both conditions hold: 21/21 = 1.',
            'من النوتس: الاحتمال متناسب مع عدد النقط x، والمجموع 21:<span class="ltr">1 + 2 + … + 6 = 21,  <b>p(x) = x/21</b></span>')}</${P}>
          <${Fig} name="ms-die" />
        `),

        // 4 · continuous random variables, PDF
        page(html`
          <${H1}>${t('Continuous: probability is area', 'الـ continuous: الاحتمال مساحة')}</${H1}>
          <${P} small=${true}>${X('X is <b>continuous</b> if its range space R<sub>X</sub> is an <b>interval or a collection of intervals</b>, like the length of an object in centimetres. Now there are no bars: <b>f(x)</b>, the <b>probability density function (PDF)</b>, and probability is the area under it:',
            'الـ X بيبقى <b>continuous</b> لو الـ range space بتاعه <b>interval أو مجموعة intervals</b>، زي طول حاجة بالسنتيمتر. هنا مفيش أعمدة: فيه <bdi dir="ltr"><b>f(x)</b></bdi> اسمها الـ <b>probability density function (PDF)</b>، والاحتمال هو المساحة تحتها:')}</${P}>
          <${Code} lines=${['P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx']} />
          <${UL} items=${A ? ['الشرط الأول: <bdi dir="ltr">f(x) ≥ 0</bdi> لكل x في الـ R<sub>X</sub>.', 'الشرط التاني: التكامل على الـ R<sub>X</sub> كله بيساوي 1.', 'الشرط التالت: <bdi dir="ltr">f(x) = 0</bdi> برّه الـ R<sub>X</sub>.']
            : ['f(x) ≥ 0 for all x in R<sub>X</sub>.', '∫ f(x) dx over R<sub>X</sub> = 1.', 'f(x) = 0 if x is not in R<sub>X</sub>.']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>P(X = x₀) = 0</b> for a continuous X, because ∫ from x₀ to x₀ is 0. So the interval\'s ends don\'t matter:<br/>P(a ≤ X ≤ b) = P(a < X ≤ b) = P(a ≤ X < b) = P(a < X < b).',
            'في الـ continuous الاحتمال عند نقطة واحدة صفر، لأن التكامل من x₀ لـ x₀ بصفر:<span class="ltr">P(X = x₀) = 0</span>فأطراف الـ interval مش فارقة:<span class="ltr">P(a ≤ X ≤ b) = P(a < X < b)</span>')}</p></${Box}>
        `),

        // 5 · probability as area
        page(html`
          <${H2}>${t('Probability as the area between a and b', 'الاحتمال هو المساحة بين a و b')}</${H2}>
          <${Fig} name="ms-pdf-area" />
        `),

        // 6 · the inspection device: PDF
        page(html`
          <${H2}>${t('Example: how long does the inspection device live?', 'مثال: جهاز الـ inspection بيعيش قد إيه؟')}</${H2}>
          <${P} small=${true}>${X('Its life X (years) has PDF <b>f(x) = ½e^(−x/2)</b> for x ≥ 0, and 0 otherwise: an <b>exponential distribution with mean 2 years</b>. (In the notes it\'s a laser device that inspects cracks in aircraft wings, Example 3.2.) What\'s P(2 ≤ X ≤ 3)?',
            'عمره X بالسنين، والـ PDF بتاعه (وصفر لو x سالبة):<span class="ltr"><b>f(x) = ½e^(−x/2)</b>,  x ≥ 0</span>يعني <b>exponential distribution والـ mean بتاعه سنتين</b>. (في النوتس ده جهاز ليزر بيكشف الشروخ في أجنحة الطيارات، مثال 3.2.) طب احتمال إنه يعيش بين 2 و3 سنين كام؟')}</${P}>
          <${Code} lines=${['P(2 ≤ X ≤ 3) = ½∫₂³ e^(−x/2) dx', '  = ½[−2e^(−x/2)] from 2 to 3', '  = −e^(−3/2) + e^(−1)', ['  = −0.223 + 0.368 = 0.145', '✓']]} />
          <${Talk} who="dev">${t("So f(0) = 0.5 is the chance it dies at time 0?", 'يعني <bdi dir="ltr">f(0) = 0.5</bdi> ده احتمال إنه يموت عند صفر؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("No: that's a <b>height</b>. Probability is the <b>area</b> between a and b, and one point has area 0.", 'لأ: ده <b>ارتفاع</b>. الاحتمال هو <b>المساحة</b> بين a و b، والنقطة الواحدة مساحتها صفر.')}</${Talk}>
        `),

        // 7 · device PDF figure
        page(html`
          <${H2}>${t('The shaded area is the answer', 'المساحة المتظللة هي الإجابة')}</${H2}>
          <${Fig} name="ms-device-pdf" />
        `),

        // 8 · CDF
        page(html`
          <${H1}>${t('The CDF: everything up to x', 'الـ CDF: كل حاجة لحد x')}</${H1}>
          <${Def}>${X('The <b>cumulative distribution function</b> is <b>F(x) = P(X ≤ x)</b>.', 'الـ <b>cumulative distribution function</b> هي:<span class="ltr"><b>F(x) = P(X ≤ x)</b></span>')}</${Def}>
          <${Code} lines=${[['F(x) = Σ p(xᵢ), xᵢ ≤ x', t('discrete', 'discrete')], ['F(x) = ∫₋∞ˣ f(t) dt', t('continuous', 'continuous')], ['P(a < X ≤ b) = F(b) − F(a)', '']]} />
          <${UL} items=${A ? ['الـ F <b>nondecreasing</b>: لو <bdi dir="ltr">a ≤ b</bdi> يبقى <bdi dir="ltr">F(a) ≤ F(b)</bdi>.', 'بتروح لـ <b>1</b> لما x تروح لـ ∞، ولـ <b>0</b> لما x تروح لـ −∞.', 'أي سؤال احتمال عن X تقدر تجاوبه بالـ CDF.']
            : ['F is <b>nondecreasing</b>: if a ≤ b then F(a) ≤ F(b).', 'F(x) → <b>1</b> as x → ∞, and → <b>0</b> as x → −∞.', 'Every probability question about X can be answered with the CDF.']} />
          <${P} small=${true}>${X('The device: F(x) = 1 − e^(−x/2). Less than 2 years: F(2) = 1 − e⁻¹ = <b>0.632</b>. Between 2 and 3: F(3) − F(2) = <b>0.145</b>, the same as the integral.',
            'الجهاز:<span class="ltr">F(x) = 1 − e^(−x/2)</span>إنه يعيش أقل من سنتين:<span class="ltr">F(2) = 1 − e⁻¹ = <b>0.632</b></span>وبين 2 و3، نفس نتيجة التكامل:<span class="ltr">F(3) − F(2) = <b>0.145</b></span>')}</${P}>
          <${P} small=${true}>${X('‡ The notes (Example 3.3) write −0.233 + 0.368. e^(−3/2) is 0.223, as in Example 3.2.', '‡ النوتس في مثال 3.3 كاتبة 0.233، والصح 0.223 زي مثال 3.2.')}</${P}>
        `, { sec: t('The CDF', 'الـ CDF') }),

        // 9 · CDF properties figure
        page(html`
          <${H2}>${t("The CDF's properties on its S-curve", 'خصايص الـ CDF على منحنى الـ S')}</${H2}>
          <${Fig} name="ms-cdf-props" />
        `),

        // 10 · device CDF figure
        page(html`
          <${H2}>${t('Reading the device off its CDF', 'نقرا الجهاز من الـ CDF بتاعته')}</${H2}>
          <${Fig} name="ms-device-cdf" />
        `),

        // 11 · expected value and variance
        page(html`
          <${H1}>${t('Where is the middle, and how wide is the spread?', 'فين النص، والانتشار قد إيه؟')}</${H1}>
          <${P} small=${true}>${X('The <b>expected value E(X)</b>, a.k.a. the <b>mean</b>, m, μ or the <b>1st moment</b>, is a <b>measure of central tendency</b>. The <b>variance</b> V(X), Var(X) or σ² measures the <b>spread</b> of the values around the mean.',
            'الـ <b>expected value</b> واسمه كمان الـ <b>mean</b> أو m أو μ أو الـ <b>1st moment</b>، وده <b>مقياس للـ central tendency</b>. والـ <b>variance</b> (ورموزه <bdi dir="ltr">V(X), Var(X), σ²</bdi>) بيقيس <b>الانتشار</b> حوالين الـ mean.')}</${P}>
          <${Code} lines=${[['E(X) = Σ xᵢ p(xᵢ)', t('discrete', 'discrete')], ['E(X) = ∫ x f(x) dx', t('continuous', 'continuous')], ['E(Xⁿ) = Σ xᵢⁿ p(xᵢ)', t('n-th moment', 'الـ moment رقم n')], ['V(X) = E((X − E[X])²)', t('definition', 'التعريف')], ['V(X) = E(X²) − (E(X))²', t('shortcut', 'الاختصار')], ['σ = √V(X)', '']]} />
          <${P} small=${true}>${X('<b>σ</b> is in the <b>same units as the mean</b>: read it with the mean.', 'الـ <b>σ</b> بتبقى <b>بنفس وحدة الـ mean</b>: اقراها معاه.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Two machines both average 10 minutes per job. Are they equally predictable?', 'مكنتين الاتنين متوسطهم 10 دقايق للـ job. هل الاتنين متوقّعين بنفس الدرجة؟')}</p></${Box}>
          <${Hand}>${t('Our trick: "mean of the squares minus square of the mean".', 'حيلة من عندنا: "متوسط المربعات ناقص مربع المتوسط".')}</${Hand}>
        `, { sec: t('Mean and variance', 'الـ Mean والـ variance') }),

        // 12 · variance figure
        page(html`
          <${H2}>${t('Same mean, different spread', 'نفس الـ mean، انتشار مختلف')}</${H2}>
          <${Fig} name="ms-variance" />
        `),

        // 13 · device mean and variance
        page(html`
          <${H2}>${t("The device's mean and variance", 'الـ mean والـ variance بتوع الجهاز')}</${H2}>
          <${P} small=${true}>${X('Slide 15 uses <b>partial integration</b> (integration by parts) with u(x) = x and v′(x) = e^(−x/2), so u′(x) = 1 and v(x) = −2e^(−x/2):',
            'السلايد 15 بتستخدم <b>partial integration</b> (التكامل بالتجزيء):<span class="ltr">u = x, v′ = e^(−x/2)  →  u′ = 1, v = −2e^(−x/2)</span>')}</${P}>
          <${Code} lines=${['∫ u v′ dx = u v − ∫ u′ v dx', 'E(X) = ½∫₀^∞ x e^(−x/2) dx', '     = ½[(−2x e^(−x/2))₀^∞', '        + ∫₀^∞ 2e^(−x/2) dx]', ['     = ½(0 + 4) = 2 years', '✓']]} />
          <${Code} lines=${[['E(X²) = ½∫₀^∞ x² e^(−x/2) dx = 8', ''], ['V(X) = 8 − 2² = 4', ''], ['σ = √4 = 2 years', '']]} />
          <${P} small=${true}>${X('E(X²) uses the same trick: ∫₀^∞ x e^(−x/2) dx = 2E(X) = 4, so E(X²) = 0 + 2(4) = 8.', 'وتاني moment بنفس الحركة:<span class="ltr">∫₀^∞ x e^(−x/2) dx = 2E(X) = 4  →  E(X²) = 0 + 2(4) = 8</span>')}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${t('mean = σ = 2: for an exponential, the mean and the standard deviation are equal', 'في الـ exponential الـ mean والـ standard deviation متساويين: هنا الاتنين 2')}</${Hand}>
        `),

        // 14 · die moments figure
        page(html`
          <${H2}>${t("Example 3.4: the loaded die's moments", 'مثال 3.4: الـ moments بتوع الزهر المتلاعب فيه')}</${H2}>
          <${Fig} name="ms-die-moments" />
        `),

        // 15 · sums, COV, covariance, correlation
        page(html`
          <${H2}>${t('Sums, C.O.V., covariance, correlation', 'المجموع والـ C.O.V. والـ covariance والـ correlation')}</${H2}>
          <${Code} lines=${[['E(Σ aᵢxᵢ) = Σ aᵢE(xᵢ)', t('any X', 'لأي X')], ['Var(Σ aᵢxᵢ) = Σ aᵢ²Var(xᵢ)', t('independent', 'independent')], ['C.O.V. = σ/μ, μ > 0', ''], ['Cov = E(xy) − E(x)E(y)', ''], ['ρ = Cov(x, y)/(σx σy)', '\u2066−1 ≤ ρ ≤ 1\u2069']]} />
          <${UL} items=${A ? ['الـ mean بتاع المجموع = مجموع الـ means، لأي random variables. أما الـ variance فمحتاج <b>independence</b>، والـ constants بتتربّع.', 'الـ <b>C.O.V.</b> هو <bdi dir="ltr">σ/μ</bdi>: <b>ملوش وحدات (dimensionless)</b>، فبنقارن بيه data sets الـ standard deviations بتاعتها صعب تتقارن.', 'الـ <b>covariance</b> بيقيس x و y بيتغيّروا مع بعض إزاي. لو <b>independent</b> يبقى <b>صفر</b>، لأن <bdi dir="ltr">E(xy) = E(x)E(y)</bdi>.', 'الـ <b>correlation</b> هو الـ covariance بعد الـ normalization، وبيبقى بين −1 و+1.']
            : ['The mean of a sum is the sum of the means, for <b>any</b> random variables. The variance rule needs <b>independence</b>, and the constants get squared.', '<b>C.O.V.</b> = σ/μ is <b>dimensionless</b> (normalized dispersion), so it compares data sets whose SDs are hard to compare.', '<b>Covariance</b> measures how x and y vary together. For <b>independent</b> variables it is <b>zero</b>, since E(xy) = E(x)E(y).', '<b>Correlation</b> is the normalized covariance; it lies between <b>−1 and +1</b>.']} />
          <${Grow} />
          <${Hand}>${t('For the exam corner: divide X by 2 and its variance divides by 2² = 4.', 'لركن الامتحان: لو قسمت X على 2، الـ variance بيتقسم على 4.')}</${Hand}>
        `),

        // 16 · quantile, mean, median, mode
        page(html`
          <${H1}>${t('Three ways to say "typical"', 'تلات طرق تقول بيها "القيمة العادية"')}</${H1}>
          <${Def}>${X('The <b>α-quantile</b> x<sub>α</sub> is the x where the CDF reaches α: <b>F(x<sub>α</sub>) = P(X ≤ x<sub>α</sub>) = α</b>, α ∈ [0, 1]. The <b>median</b> is the <b>0.5-quantile</b>.',
            'الـ <b>α-quantile</b> هو قيمة x اللي الـ CDF بتوصل عندها لـ α:<span class="ltr"><b>F(x<sub>α</sub>) = P(X ≤ x<sub>α</sub>) = α</b>, α ∈ [0, 1]</span>والـ <b>median</b> هو الـ <bdi dir="ltr"><b>0.5-quantile</b></bdi>.')}</${Def}>
          <${UL} items=${A ? ['الـ <b>mean</b>: الـ <bdi dir="ltr">E(X) = μ</bdi>.', 'الـ <b>median</b>: نص القيم أصغر منه ونصها أكبر.', 'الـ <b>mode</b>: <b>القيمة الأكثر احتمالًا</b>: الـ xᵢ اللي ليها أعلى pᵢ، أو الـ x اللي الـ PDF أعلى حاجة عندها.']
            : ['<b>Mean</b>: E(X) = μ.', '<b>Median</b>: half of the values are smaller, half larger.', '<b>Mode</b>: the <b>most likely value</b>, the xᵢ with the highest pᵢ, or the x where the PDF is maximum.']} />
          <${P} small=${true}>${X('On the slide\'s five PDFs: one symmetric peak puts all three together; a long <b>right</b> tail gives mode < median < mean; a long <b>left</b> tail gives mean < median < mode; two peaks give two modes; a flat (uniform) PDF has <b>no mode</b>.',
            'في الخمس PDFs بتوع السلايد: قمة واحدة متماثلة بتجمع التلاتة في نقطة واحدة. الـ tail الطويل على <b>اليمين</b> بيدّي <bdi dir="ltr">mode < median < mean</bdi>، وعلى <b>الشمال</b> بيدّي <bdi dir="ltr">mean < median < mode</bdi>. قمتين يعني اتنين mode، والـ PDF المفرود (uniform) <b>ملوش mode</b>.')}</${P}>
        `, { sec: t('Mean, median, mode', 'الـ Mean والـ median والـ mode') }),

        // 17 · quantile figure
        page(html`
          <${H2}>${t('Reading the α-quantile off the CDF', 'نقرا الـ α-quantile من الـ CDF')}</${H2}>
          <${Fig} name="ms-quantile" />
        `),

        // 18 · mean, median, mode on five shapes
        page(html`
          <${H2}>${t('Mean, median and mode on the five shapes', 'الـ mean والـ median والـ mode على الخمس أشكال')}</${H2}>
          <${Fig} name="ms-mmm" />
        `),

        // 19 · which one to use: the flowchart
        page(html`
          <${H2}>${t('Mean, median or mode? Walk the flowchart', 'mean ولا median ولا mode؟ امشي على الـ flowchart')}</${H2}>
          <${Fig} name="ms-central-flow" />
        `),

        // 20 · sort: mean, median or mode
        page(html`
          <${Box} kind="pencil" title=${t('Mean, median or mode?', 'mean ولا median ولا mode؟')}><p className="hf-p small">${t('Tap the measure each line describes, then check.', 'دوس على المقياس اللي كل سطر بيوصفه، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="mmm" bins=${[['Mn', 'Mean'], ['Md', 'Median'], ['Mo', 'Mode']]} items=${A ? [
            ['القيمة الأكثر احتمالًا', 2],
            ['الـ <bdi dir="ltr">0.5-quantile</bdi>', 1],
            ['اسمه كمان الـ 1st moment', 0],
            ['استخدمه لو الـ data categorical', 2],
            ['استخدمه لو الـ total هو اللي يهمّك', 0],
            ['استخدمه لو الـ distribution skewed', 1],
            ['الـ x اللي الـ PDF أعلى حاجة عندها', 2],
            ['الأكبر فيهم لما الـ tail يمين', 0],
            ['الـ PDF المفرود (uniform) ملوش', 2]
          ] : [
            ['The most likely value', 2],
            ['The 0.5-quantile', 1],
            ['Also called the 1st moment', 0],
            ['Use it for categorical data', 2],
            ['Use it when the total is of interest', 0],
            ['Use it when the distribution is skewed', 1],
            ['The x where the PDF is maximum', 2],
            ['The largest of the three on a long right tail', 0],
            ['A flat (uniform) PDF has none', 2]
          ]} />
        `),

        // 21 · useful statistical models: match
        page(html`
          <${H2}>${t('Which model for which job?', 'أنهي model لأنهي شغلانة؟')}</${H2}>
          <${P} small=${true}>${X('The notes pick distributions for <b>queueing</b>, <b>inventory</b>, <b>reliability</b> and <b>limited data</b> (random but nothing else known: uniform). Tap a distribution, then its job.',
            'النوتس بتختار distributions للـ <b>queueing</b> والـ <b>inventory</b> والـ <b>reliability</b>، ولما الـ <b>data قليلة</b> (عشوائية ومش عارف غير كده: uniform). دوس على distribution وبعدين شغلانته.')}</${P}>
          <${Match} id="models" left=${['Exponential', 'Normal', 'Weibull', 'Negative binomial', 'Poisson', 'Triangular']}
            right=${A ? ['معروف بس الـ minimum والـ maximum والـ mode', 'service times عشوائية تمامًا، أو failures عشوائية بس', 'الطلب في الـ inventory، في الأغلب', 'service ثابت بتذبذب صغير، أو failures من الاستهلاك', 'طلب الـ tail بتاعه طويل', 'components كتير بتبوظ من عيوب خطيرة']
              : ['Only a minimum, maximum and modal value are known', 'Completely random service times; only random failures', 'Inventory demand, most often', 'Constant service with small fluctuations; failures due to wear', 'Long-tailed demand', 'Many components failing from serious defects']}
            answer=${[1, 3, 5, 4, 2, 0]} />
        `, { sec: t('Which distribution where?', 'أنهي distribution فين؟') }),

        // 22 · Bernoulli
        page(html`
          <${H1}>${t('Success or failure: Bernoulli', 'يا نجاح يا فشل: الـ Bernoulli')}</${H1}>
          <${P} small=${true}>${X('Discrete distributions describe phenomena where <b>only integer values</b> occur. The simplest: <b>Bernoulli trials</b>, n trials each a <b>success</b> (Xⱼ = 1) or a <b>failure</b> (Xⱼ = 0).',
            'الـ discrete distributions بتوصف ظواهر مفيهاش غير <b>قيم صحيحة</b>. أبسطهم الـ <b>Bernoulli trials</b>: عدد n من المحاولات، كل واحدة يا <b>success</b> يا <b>failure</b>:<span class="ltr">Xⱼ = 1 (success), Xⱼ = 0 (failure)</span>')}</${P}>
          <${Code} lines=${[['p(xⱼ) = p,     xⱼ = 1', t('success', 'نجاح')], ['p(xⱼ) = 1 − p, xⱼ = 0', t('q, failure', 'q، فشل')], ['E(Xⱼ) = 0·q + 1·p = p', ''], ['V(Xⱼ) = [0²q + 1²p] − p²', ''], ['      = p(1 − p) = pq', '']]} />
          <${Def}>${X('A <b>Bernoulli process</b>: n Bernoulli trials that are <b>independent</b>, so p(x₁, …, xₙ) = p₁(x₁)p₂(x₂)…pₙ(xₙ). The notes add: only two outcomes, and p stays constant from trial to trial.',
            'الـ <b>Bernoulli process</b>: عدد n من الـ Bernoulli trials <b>independent</b>، فالاحتمال المشترك حاصل ضرب الاحتمالات:<span class="ltr">p(x₁, …, xₙ) = p₁(x₁)p₂(x₂)…pₙ(xₙ)</span>والنوتس بتزوّد: نتيجتين بس، والـ p ثابتة.')}</${Def}>
          <${Grow} />
          <${Talk} who="dice">${t("Same p every time, and I never remember the last trial.", 'نفس الـ p كل مرة، وعمري ما بفتكر المحاولة اللي فاتت.')}</${Talk}>
        `, { sec: t('Discrete distributions', 'الـ Discrete distributions') }),

        // 23 · Bernoulli figure
        page(html`
          <${H2}>${t('Run some Bernoulli trials', 'شغّل شوية Bernoulli trials')}</${H2}>
          <${Fig} name="ms-bernoulli" />
        `),

        // 24 · binomial
        page(html`
          <${H2}>${t('Binomial: count the successes', 'الـ Binomial: عِدّ النجاحات')}</${H2}>
          <${P} small=${true}>${X('X = the <b>number of successes in n Bernoulli trials</b>. C(n, x) counts the outcomes with x successes; pˣqⁿ⁻ˣ is the probability of each.',
            'الـ X هو <b>عدد الـ successes في n Bernoulli trials</b>. الـ <bdi dir="ltr">C(n, x)</bdi> بيعد النتايج اللي فيها x نجاح، والـ <bdi dir="ltr">pˣqⁿ⁻ˣ</bdi> احتمال كل واحدة منهم.')}</${P}>
          <${Code} lines=${[['p(x) = C(n, x) pˣ qⁿ⁻ˣ', '\u2066x = 0…n\u2069'], ['C(n, x) = n!/(x!(n − x)!)', ''], ['E(X) = p + … + p = np', ''], ['V(X) = pq + … + pq = npq', '']]} />
          <${P} small=${true}>${X('Why so simple? Because X = X₁ + X₂ + … + Xₙ, a sum of n <b>independent</b> Bernoulli variables, each with mean p and variance pq. The sum rules do the rest.',
            'ليه بالبساطة دي؟ لأن X مجموع n من الـ Bernoulli variables <b>المستقلين</b>، كل واحد الـ mean بتاعه p والـ variance بتاعه pq، وقواعد المجموع بتكمّل الباقي:<span class="ltr">X = X₁ + X₂ + … + Xₙ</span>')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The mean of Binomial(10, 1/2)" is <b>np = 5</b>, not 10 (that\'s n). And when the exam gives you the mean and the variance, divide them: <b>q = npq/np</b>. If n doesn\'t come out a whole number, no binomial fits.',
            'سؤال الـ mean بتاع <bdi dir="ltr">Binomial(10, 1/2)</bdi> إجابته <bdi dir="ltr"><b>np = 5</b></bdi> مش 10 (دي n). ولما الامتحان يدّيك الـ mean والـ variance اقسمهم على بعض:<span class="ltr"><b>q = npq/np</b></span>ولو الـ n طلعت مش رقم صحيح، يبقى مفيش binomial ينفع.')}</p></${Box}>
        `),

        // 25 · binomial figure, Example 3.5
        page(html`
          <${H2}>${t('Example 3.5: when to stop the chip line', 'مثال 3.5: إمتى نوقّف خط الـ chips')}</${H2}>
          <${Fig} name="ms-binomial" />
        `),

        // 26 · geometric
        page(html`
          <${H2}>${t('Geometric: wait for the first success', 'الـ Geometric: استنى أول نجاح')}</${H2}>
          <${P} small=${true}>${X('X = the <b>number of trials to achieve the 1st success</b>. {X = x} means x − 1 failures followed by a success: P(FF…FS) = qˣ⁻¹p.',
            'الـ X هو <b>عدد المحاولات لحد أول success</b>. والحدث إن X تساوي x معناه فشل x − 1 مرة وبعدين نجاح:<span class="ltr">{X = x}:  P(FF…FS) = qˣ⁻¹p</span>')}</${P}>
          <${Code} lines=${[['p(x) = qˣ⁻¹ p', '\u2066x = 1, 2, …\u2069'], ['E(X) = 1/p', ''], ['V(X) = q/p²', '']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ The slide writes the range as x = 0, 1, 2, …, n. Correct: <b>x = 1, 2, …</b> (you need at least one trial, and there is no upper limit).<br/>‡ The notes say "each failure has an associated probability p". Each failure has probability <b>q</b>; the success has p.',
            '‡ السلايد كاتبة الـ range من 0 لحد n، والصح (لازم محاولة واحدة على الأقل، ومفيش حد أعلى):<span class="ltr"><b>x = 1, 2, …</b></span>‡ والنوتس بتقول إن كل failure احتماله p، والصح إن كل failure احتماله <b>q</b>، والـ success احتماله p.')}</p></${Box}>
          <${P} small=${true}>${X('<b>Example 3.6</b>: 40% of printers are rejected, so q = 0.4 and p = 0.6. The first acceptable one is the third: p(3) = (0.4)²(0.6) = <b>0.096</b>, about 10% of cases.',
            '<b>مثال 3.6</b>: 40% من الطابعات بتترفض. احتمال إن أول طابعة مقبولة تبقى التالتة:<span class="ltr">q = 0.4, p = 0.6:  p(3) = (0.4)²(0.6) = <b>0.096</b></span>يعني حوالي 10% من الحالات.')}</${P}>
        `),

        // 27 · geometric figure
        page(html`
          <${H2}>${t('Failures, failures, success', 'فشل، فشل، نجاح')}</${H2}>
          <${Fig} name="ms-geometric" />
        `),

        // 28 · Poisson
        page(html`
          <${H2}>${t('Poisson: counting events in a fixed time', 'الـ Poisson: بنعد أحداث في وقت ثابت')}</${H2}>
          <${P} small=${true}>${X('The Poisson distribution describes many random processes quite well and is mathematically simple. It gives the probability of a number of events in a fixed period, when they occur at a known average rate and independently of the time since the last event. Most queueing <b>arrival and departure</b> processes are described by it.',
            'الـ Poisson distribution بيوصف processes عشوائية كتير كويس جدًا، والرياضة بتاعته بسيطة. بيدّيك احتمال عدد معيّن من الأحداث في فترة ثابتة، لما بتحصل بمعدل متوسط معروف ومش معتمدة على الوقت من آخر حدث. ومعظم الـ <b>arrival والـ departure</b> processes في الـ queueing بتتوصف بيه.')}</${P}>
          <${Code} lines=${[['p(x) = αˣ e^(−α) / x!', '\u2066x = 0, 1, …\u2069'], ['F(x) = Σᵢ₌₀ˣ αⁱ e^(−α) / i!', ''], ['E(X) = α = V(X)', t('α > 0', 'α > 0')]]} />
          <${Hand} red=${true}>${t('mean = variance: the Poisson signature', 'الـ mean بيساوي الـ variance: دي بصمة الـ Poisson')}</${Hand}>
          <${Grow} />
          <${Dumb} qa=${A ? [['السلايد بتقول على <bdi dir="ltr">p(x)</bdi> بتاعة الـ Poisson "PDF". صح كده؟', '‡ لأ. الـ Poisson discrete، فالـ <bdi dir="ltr">p(x)</bdi> دي <b>PMF</b>.']]
            : [['The slide calls the Poisson p(x) a "PDF". Is that right?', '‡ No. The Poisson is discrete, so p(x) is a <b>PMF</b>.']]} />
        `),

        // 29 · the exam problem: beeps
        page(html`
          <${Box} kind="exam" title=${t('From the January 2026 final (Q3-a)', 'من امتحان يناير 2026 (سؤال 3-a)')}><p className="hf-p small">${X('A computer repair person is beeped each time there is a call for service; beeps per hour ~ <b>Poisson(α = 2)</b> (slide 31). (i) Three beeps in the next hour? (ii) Two or more in an hour?',
            'فنّي تصليح كمبيوتر بيجيله beep مع كل طلب service، وعدد الـ beeps في الساعة <bdi dir="ltr"><b>Poisson(α = 2)</b></bdi> (سلايد 31). (i) احتمال 3 beeps في الساعة الجاية؟ (ii) احتمال اتنين أو أكتر في ساعة؟')}</p></${Box}>
          <${TB} rows=${[['x', '0', '1', '2', '3'], ['p(x)', '0.135', '0.271', '0.271', '0.180'], ['F(x)', '0.135', '0.406', '0.677', '0.857']]} />
          <${Code} lines=${['(i)  p(3) = 2³e⁻²/3!', '        = (8)(0.135)/6 = 0.18', ['     = F(3) − F(2) = 0.857 − 0.677', ''], '(ii) P(X ≥ 2) = 1 − F(1)', ['        = 1 − 0.406 = 0.594', '✓']]} />
          <${Grow} />
          <${Talk} who="clock">${X('"Two <b>or more</b>": don\'t add p(2) + p(3) + … forever. Take 1 − F(1).', 'كلمة "اتنين <b>أو أكتر</b>": متفضلش تجمع لحد ما لا نهاية. خد <bdi dir="ltr">1 − F(1)</bdi>.')}</${Talk}>
        `),

        // 30 · Poisson figure
        page(html`
          <${H2}>${t('Poisson PMF and CDF, with the beeps', 'الـ PMF والـ CDF بتوع الـ Poisson مع الـ beeps')}</${H2}>
          <${Fig} name="ms-poisson" />
        `),

        // 31 · uniform
        page(html`
          <${H1}>${t('Uniform: every value equally likely', 'الـ Uniform: كل القيم ليها نفس الفرصة')}</${H1}>
          <${P} small=${true}>${X('Continuous distributions: the variable can take any value in an interval. The slides study three: uniform, exponential and normal. X ~ <b>U(a, b)</b>:',
            'في الـ continuous distributions المتغيّر ياخد أي قيمة في interval. السلايدز بتدرس تلاتة: الـ uniform والـ exponential والـ normal. والـ X ليه <bdi dir="ltr"><b>U(a, b)</b></bdi>:')}</${P}>
          <${Code} lines=${[['f(x) = 1/(b − a)', 'a ≤ x ≤ b'], ['F(x) = (x − a)/(b − a)', 'a ≤ x < b'], ['E(X) = (a + b)/2', ''], ['V(X) = (b − a)²/12', '']]} />
          <${UL} items=${A ? ['الـ F بتبقى 0 قبل a، و1 من b وطالع.', 'الاحتمال <b>متناسب مع طول الـ interval</b>:<span class="ltr">F(x₂) − F(x₁) = (x₂ − x₁)/(b − a)</span>', 'الـ <bdi dir="ltr"><b>U(0, 1)</b></bdi> هو اللي بنطلّع بيه الـ random numbers، ومنها الـ random variates.']
            : ['F(x) = 0 below a and 1 from b on.', 'P(x₁ < X < x₂) is <b>proportional to the length of the interval</b>: (x₂ − x₁)/(b − a).', '<b>U(0, 1)</b> is how we generate random numbers, and from them random variates.']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The mean of uniform (0, 2)" came up in the exam <b>and</b> the revision sheet: (0 + 2)/2 = <b>1</b>.', 'سؤال الـ mean بتاع <bdi dir="ltr">uniform (0, 2)</bdi> جه في الامتحان والـ revision sheet، وإجابته <bdi dir="ltr">(0 + 2)/2 = <b>1</b></bdi>.')}</p></${Box}>
        `, { sec: t('Continuous distributions', 'الـ Continuous distributions') }),

        // 32 · uniform figure
        page(html`
          <${H2}>${t('U(1, 6): a flat line and a ramp', 'الـ \u2066U(1, 6)\u2069: خط مفرود ومنحدر')}</${H2}>
          <${Fig} name="ms-uniform" />
        `),

        // 33 · bus example
        page(html`
          <${H2}>${t('Example 3.8: waiting for the bus', 'مثال 3.8: مستني الأتوبيس')}</${H2}>
          <${P} small=${true}>${X('A bus comes every 20 minutes from 6:40 to 8:40 am. A passenger arrives uniformly between 7:00 and 7:30. P(waits more than 5 minutes)? Buses at 7:00, 7:20, 7:40; X = minutes past 7, X ~ U(0, 30):',
            'فيه أتوبيس كل 20 دقيقة من 6:40 لـ 8:40 الصبح، وراكب بيوصل uniformly بين 7:00 و7:30. احتمال إنه يستنى أكتر من 5 دقايق؟ الأتوبيسات 7:00 و7:20 و7:40، والـ X الدقايق بعد 7:')}</${P}>
          <${Fig} name="ms-bus" />
        `),

        // 34 · exponential
        page(html`
          <${H1}>${t('Exponential: the time between', 'الـ Exponential: الوقت اللي بين')}</${H1}>
          <${Code} lines=${[['f(x) = λe^(−λx)', 'x ≥ 0'], ['F(x) = 1 − e^(−λx)', 'x ≥ 0'], ['E(X) = 1/λ', ''], ['V(X) = 1/λ²', '']]} />
          <${UL} items=${A ? ['بيوصف الـ <b>interarrival times لما الوصول عشوائي تمامًا</b>، والـ <b>service times اللي متغيّرة جدًا</b>.', 'الـ <bdi dir="ltr">λ > 0</bdi> معدّل (وصولات في الساعة، services في الدقيقة)، وفي عمر الـ components هي الـ failure rate.', 'الـ mean والـ standard deviation <b>متساويين</b>، الاتنين <bdi dir="ltr">1/λ</bdi>.', 'وهو <b>memoryless</b>: ملوش ذاكرة.']
            : ['Models <b>interarrival times when arrivals are completely random</b>, and <b>service times that are highly variable</b>.', 'λ > 0 is a rate (arrivals per hour, services per minute); for component lifetimes it is the failure rate.', 'Mean and standard deviation are <b>equal</b>: both 1/λ.', 'It is <b>memoryless</b>.']} />
          <${Grow} />
          <${P} small=${true}>${X('<b>Example 3.9</b>: lamp life (thousands of hours), λ = 1/3. Longer than its mean life: P(X > 3) = e⁻¹ = <b>0.368</b>. Between 2000 and 3000 hours: F(3) − F(2) = 0.513 − 0.368 = <b>0.145</b> (more precisely 0.1455).',
            '<b>مثال 3.9</b>: عمر لمبة بالألف ساعة و<bdi dir="ltr">λ = 1/3</bdi>. إنها تعيش أكتر من متوسط عمرها، وبين 2000 و3000 ساعة:<span class="ltr">P(X > 3) = e⁻¹ = <b>0.368</b>;  F(3) − F(2) = <b>0.145</b></span>')}</${P}>
        `),

        // 35 · exponential figure: lamp
        page(html`
          <${H2}>${t('Example 3.9: the industrial lamp', 'مثال 3.9: اللمبة الصناعية')}</${H2}>
          <${Fig} name="ms-exponential" />
        `),

        // 36 · exponential family
        page(html`
          <${H2}>${t('Four lambdas, one family', 'أربع قيم λ، عيلة واحدة')}</${H2}>
          <${Fig} name="ms-exp-family" />
        `),

        // 37 · normal
        page(html`
          <${H1}>${t('Normal: the bell', 'الـ Normal: الجرس')}</${H1}>
          <${P} small=${true}>${X('X ~ <b>N(μ, σ²)</b>: mean μ (−∞ < μ < ∞), variance σ² > 0. Its PDF:', 'بنكتبه <bdi dir="ltr"><b>X ~ N(μ, σ²)</b></bdi>، والـ mean μ والـ variance σ². والـ PDF:')}</${P}>
          <${Code} lines=${['f(x) = e^(−½((x − μ)/σ)²) / (σ√(2π))', ['Z = (X − μ)/σ ~ N(0, 1)', t('standardize', 'standardize')], ['F(x) = Φ((x − μ)/σ)', ''], ['Φ(−x) = 1 − Φ(x)', t('symmetry', 'التماثل')]]} />
          <${UL} items=${A ? ['الـ <bdi dir="ltr">f(x)</bdi> بتروح لصفر من الناحيتين.', 'متماثل حوالين μ:<span class="ltr">f(μ − x) = f(μ + x)</span>', 'أعلى قيمة عند μ، يعني <b>الـ mean بيساوي الـ mode</b>.', '<b>مالوش closed form</b>، فبنحسبه numerically، وبالـ Z النتايج مش معتمدة على μ و σ. ‡ النوتس غلطت وقالت إنه closed form.']
            : ['f(x) → 0 as x → −∞ and as x → ∞.', '<b>Symmetric about μ</b>: f(μ − x) = f(μ + x).', 'The maximum is at x = μ, so <b>the mean and mode are equal</b>.', '<b>No closed form</b> (‡ the notes say "in closed form"): use numerical methods; with Z the results don\'t depend on μ and σ.']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The mean of normal (10, 1/2)" is <b>10</b>: the <b>second</b> number is the variance σ², not σ. And "for normal distribution": <b>mean = median</b>, by the symmetry.',
            'سؤال الـ mean بتاع <bdi dir="ltr">normal (10, 1/2)</bdi> إجابته <b>10</b>، لأن الرقم <b>التاني</b> هو الـ variance. والـ normal فيه <b>الـ mean بيساوي الـ median</b>.')}</p></${Box}>
        `, { sec: t('The normal distribution', 'الـ Normal distribution') }),

        // 38 · normal shape figure
        page(html`
          <${H2}>${t("The bell's properties and the Z transformation", 'خصايص الجرس وتحويل الـ Z')}</${H2}>
          <${Fig} name="ms-normal-shape" />
        `),

        // 39 · normal examples
        page(html`
          <${H2}>${t('Normal, by the numbers', 'الـ Normal بالأرقام')}</${H2}>
          <${P} small=${true}>${X('<b>Vessel loading</b> (slide 39): X ~ N(12, 4), so μ = 12 and σ = 2. Loaded in less than 10 hours:', '<b>تحميل السفينة</b> (سلايد 39). احتمال إنها تتحمّل في أقل من 10 ساعات:<span class="ltr">X ~ N(12, 4):  μ = 12, σ = 2</span>')}</${P}>
          <${Code} lines=${['F(10) = Φ((10 − 12)/2) = Φ(−1)', ['      = 1 − Φ(1) = 1 − 0.8413', ''], ['      = 0.1587', '✓']]} />
          <${P} small=${true}>${X('<b>Example 3.10</b>: X ~ N(50, 9), σ = 3. F(56) = Φ((56 − 50)/3) = Φ(2) = <b>0.9772</b>: 56 is 2σ above the mean.', '<b>مثال 3.10</b>: الـ 56 أعلى من الـ mean بـ 2σ:<span class="ltr">N(50, 9):  F(56) = Φ((56 − 50)/3) = Φ(2) = <b>0.9772</b></span>')}</${P}>
          <${P} small=${true}>${X('<b>Example 3.12</b>: cafeteria queue time ~ N(15, 9). P(14 ≤ X ≤ 17) = Φ(0.667) − Φ(−0.333) = <b>0.3780</b>. ‡ The notes\' Fig 3.8(a) labels the mean μ = 10; it should be 15.', '<b>مثال 3.12</b>: وقت طابور الكافيتريا <bdi dir="ltr">N(15, 9)</bdi>:<span class="ltr">P(14 ≤ X ≤ 17) = Φ(0.667) − Φ(−0.333) = <b>0.3780</b></span>‡ الرسمة 3.8(a) في النوتس كاتبة إن الـ mean بـ 10، والصح 15.')}</${P}>
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('<b>Why the normal matters</b> (slide 40): it\'s the most used distribution in data analysis; a sum of n independent normals is normal; and a sum of many independent observations from <b>any</b> distribution is normal.',
            '<b>الـ normal مهم ليه</b> (سلايد 40): أكتر distribution مستخدم في تحليل الـ data، ومجموع n من الـ normals المستقلين normal، ومجموع observations كتير مستقلة من <b>أي</b> distribution بيبقى normal.')}</p></${Box}>
        `),

        // 40 · normal figure
        page(html`
          <${H2}>${t('Shade it, standardize it, look it up', 'ظلّل، اعمل standardize، وبص في الجدول')}</${H2}>
          <${Fig} name="ms-normal" />
        `),

        // 41 · Weibull, triangular, lognormal
        page(html`
          <${H2}>${t('Three more, from the lecture notes', 'تلاتة كمان، من الـ lecture notes')}</${H2}>
          <${P} small=${true}>${t('Only in the notes and the revision sheet:', 'في النوتس والـ revision sheet بس:')}</${P}>
          <${UL} items=${A ? ['الـ <b>Weibull</b> ليه تلات parameters، وبيبقى exponential لما ν بصفر وβ بواحد:<span class="ltr">ν = location, α = scale, β = shape;  λ = 1/α</span>', 'الـ <b>triangular</b> الـ mode بتاعه عند b، وده ارتفاع القمة والـ mean:<span class="ltr">a ≤ b ≤ c,  peak = 2/(c − a),  E(X) = (a + b + c)/3</span>', 'الـ <b>lognormal</b> هو e أس متغيّر normal، والـ μ و σ² <b>مش</b> الـ mean والـ variance بتوع X:<span class="ltr">Y ~ N(μ, σ²),  X = e^Y,  E(X) = e^(μ + σ²/2)</span>']
            : ['<b>Weibull</b>: ν = location, α = scale, β = shape. With ν = 0 and β = 1 it is the exponential with λ = 1/α.', '<b>Triangular</b> with a ≤ b ≤ c: the mode is at b, the peak height is 2/(c − a), and E(X) = (a + b + c)/3.', '<b>Lognormal</b>: if Y ~ N(μ, σ²) then X = e^Y is lognormal. μ and σ² are <b>not</b> the mean and variance of X: E(X) = e^(μ + σ²/2).']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ <b>Example 3.13</b> (aircraft clearing time, Weibull ν = 1.34, β = 0.5, α = 0.04): ((1.5 − 1.34)/0.04)^0.5 = √4 = 2. The notes get P(X > 1.5) = 1 − e⁻² = 0.865, but with F(x) = 1 − exp[−((x − ν)/α)^β], <b>P(X > 1.5) = e⁻² = 0.135</b>; 0.865 is F(1.5).',
            '‡ <b>مثال 3.13</b> (وقت الطيارة على الممر، Weibull):<span class="ltr">((1.5 − 1.34)/0.04)^0.5 = √4 = 2</span>النوتس طلّعت 0.865 لاحتمال إنه أكتر من 1.5، بس بالـ CDF بتاعة الـ Weibull الصح:<span class="ltr"><b>P(X > 1.5) = e⁻² = 0.135</b></span>والـ 0.865 دي <bdi dir="ltr">F(1.5)</bdi>.')}</p></${Box}>
        `),

        // 42 · more distributions figure
        page(html`
          <${H2}>${t('Weibull, triangular, lognormal', 'الـ Weibull والـ triangular والـ lognormal')}</${H2}>
          <${Fig} name="ms-more-dists" />
        `),

        // 43 · Poisson process
        page(html`
          <${H1}>${t('The Poisson process', 'الـ Poisson process')}</${H1}>
          <${P} small=${true}>${X('<b>N(t)</b> counts the events in [0, t]: jobs at a job shop, aircraft at a runway, calls at a switchboard. {N(t), t ≥ 0} is a <b>Poisson process with mean rate λ</b> if:',
            'الـ <bdi dir="ltr"><b>N(t)</b></bdi> بتعد الأحداث في الفترة من 0 لـ t: jobs في ورشة، طيارات على ممر، مكالمات على سنترال. وده <b>Poisson process بمعدل λ</b> لو:')}</${P}>
          <${UL} items=${A ? ['الوصول بيحصل <b>واحد واحد</b>.', 'فيه <b>stationary increments</b>: عدد الوصولات في <bdi dir="ltr">[t, t + s]</bdi> معتمد على s بس، مش على t.', 'فيه <b>independent increments</b>: أعداد الوصولات في فترات مش متداخلة مستقلة عن بعض.']
            : ['Arrivals occur <b>one at a time</b>.', '<b>Stationary increments</b>: the number of arrivals in [t, t + s] depends only on s, not on the start t.', '<b>Independent increments</b>: counts in non-overlapping intervals are independent.']} />
          <${Code} lines=${['P[N(t) = n] = (λt)ⁿ e^(−λt) / n!', ['E[N(t)] = V[N(t)] = λt', t('α = λt', 'α = λt')], ['N(t) − N(s) ~ Poisson(λ(t − s))', '']]} />
          <${Grow} />
          <${Talk} who="clock">${X('So the count in any window is Poisson, with mean <b>λ × the window\'s length</b>.', 'يعني العدد في أي فترة Poisson، والـ mean بتاعه <b>λ مضروبة في طول الفترة</b>.')}</${Talk}>
        `, { sec: t('The Poisson process', 'الـ Poisson process') }),

        // 44 · Poisson process simulation
        page(html`
          <${H2}>${t('Simulate a Poisson process', 'اعمل simulation لـ Poisson process')}</${H2}>
          <${Fig} name="ms-pp-sim" />
        `),

        // 45 · interarrival times
        page(html`
          <${H2}>${t('The gaps between arrivals: exponential, mean 1/λ', 'المسافات بين الوصولات: exponential بـ mean 1/λ')}</${H2}>
          <${Fig} name="ms-pp-times" />
        `),

        // 46 · fireside chat: Poisson vs Exponential
        page(html`
          <${Fireside} sub=${t("Tonight: the Poisson and the Exponential argue about who really describes the queue.", 'قعدة الليلة: الـ Poisson والـ Exponential بيتخانقوا مين فيهم اللي بيوصف الطابور بجد.')} />
          <${Chat} names=${[t('Poisson', 'الـ Poisson'), t('Exponential', 'الـ Exponential')]} lines=${A ? [
            [0, 'أنا اللي <b>بعدّ</b>: كام وصول في الفترة <bdi dir="ltr">[0, t]</bdi>. والـ mean بتاعي بيساوي الـ variance، الاتنين λt.'],
            [1, 'وأنا اللي <b>بقيس الوقت</b> بين كل وصول واللي بعده. والـ mean بتاعي بيساوي الـ standard deviation، الاتنين <bdi dir="ltr">1/λ</bdi>.'],
            [0, 'من غيري مكنتش هتعرف تيجي: أول وصول بعد t معناه إن عندي <bdi dir="ltr">N(t) = 0</bdi>.'],
            [1, 'واحتمال ده بالظبط <bdi dir="ltr">e^(−λt)</bdi>. وأنا <b>memoryless</b> كمان.'],
            [0, 'وأنا لو قسّمتني عشوائي باحتمال p، بطلع اتنين Poisson بالمعدلات دي:<span class="ltr">λp,  λ(1 − p)</span>'],
            [0, 'ولو دمجت اتنين مني مستقلين، بطلع Poisson بمعدل <bdi dir="ltr">λ₁ + λ₂</bdi>.'],
            [1, 'يعني إحنا وشّين لنفس الـ process: إنت الـ counts وأنا الـ gaps.']
          ] : [
            [0, "I <b>count</b>: how many arrivals in [0, t]. My mean equals my variance, both λt."],
            [1, "I <b>time</b> the gap from one arrival to the next. My mean equals my standard deviation, both 1/λ."],
            [0, "You only exist because of me: a 1st arrival after t means my N(t) = 0."],
            [1, "Which is exactly e^(−λt), my survival. And I'm <b>memoryless</b>."],
            [0, "Split me at random with probability p and you get two Poissons, rates λp and λ(1 − p)."],
            [0, "Pool two independent ones of me and you get a Poisson with rate λ₁ + λ₂."],
            [1, "So we're two faces of one process: you're the counts, I'm the gaps."]
          ]} />
          <${Grow} />
          <${Hand}>${t('splitting and pooling are from the lecture notes', 'الـ splitting والـ pooling من الـ lecture notes')}</${Hand}>
        `),

        // 47 · empirical distributions
        page(html`
          <${H1}>${t('No formula? Use the data', 'مفيش معادلة؟ استخدم الـ data')}</${H1}>
          <${Def}>${X('An <b>empirical distribution</b> is one whose parameters are the <b>observed values in a sample of data</b>. Use it when it is impossible or unnecessary to establish that a random variable has a particular parametric distribution.',
            'الـ <b>empirical distribution</b> هو اللي الـ parameters بتاعته هي <b>القيم اللي اتشافت في sample من الـ data</b>. بنستخدمه لما يبقى مستحيل أو مش لازم نثبت إن الـ random variable ليه parametric distribution معيّن.')}</${Def}>
          <${UL} items=${A ? ['<b>الميزة</b>: مفيش أي افتراض غير القيم اللي اتشافت.', '<b>العيب</b>: الـ sample ممكن متغطيش كل القيم الممكنة.', 'ممكن يبقى <b>discrete أو continuous</b> (النوتس).']
            : ['<b>Advantage</b>: no assumption beyond the observed values.', '<b>Disadvantage</b>: the sample might not cover the entire range of possible values.', 'It can be <b>discrete or continuous</b> (the notes).']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t('Your sample of 300 restaurant groups never had more than 8 people. Can the empirical model ever produce a group of 9?', 'الـ sample بتاعتك فيها 300 group في مطعم، وعمر ما جه أكتر من 8 أشخاص. ينفع الـ empirical model يطلّع group فيها 9؟')}</p></${Box}>
        `, { sec: t('Empirical distributions', 'الـ Empirical distributions') }),

        // 48 · group sizes figure
        page(html`
          <${H2}>${t('Discrete: 300 lunch groups', 'الـ discrete: 300 group وقت الغدا')}</${H2}>
          <${Fig} name="ms-groups" />
        `),

        // 49 · conveyor figure
        page(html`
          <${H2}>${t('Continuous: conveyor repair times (Example 3.16)', 'الـ continuous: أوقات تصليح الـ conveyor (مثال 3.16)')}</${H2}>
          <${Fig} name="ms-conveyor" />
        `),

        // 50 · worked example: discrete distribution
        page(html`
          <${H2}>${t('Worked example: from a table to random numbers', 'مثال محلول: من جدول لـ random numbers')}</${H2}>
          <${P} small=${true}>${X('Slide 49: X takes 2, 5, 7, 9, 10. (a) Plot the CDF. (b) Which X goes with the uniform variate 0.78 on [0, 1]? (c) Mean, variance, σ.', 'السلايد 49: الـ X بياخد 2 و5 و7 و9 و10. (a) ارسم الـ CDF. (b) أنهي X بيقابل الـ uniform variate 0.78؟ (c) الـ mean والـ variance والـ σ.')}</${P}>
          <${TB} rows=${[['X', '2', '5', '7', '9', '10'], ['P(X)', '0.2', '0.2', '0.2', '0.3', '0.1'], ['CDF', '0.2', '0.4', '0.6', '0.9', '1.00']]} />
          <${P} small=${true}>${X('(a) Add the probabilities as you go. Each R then falls on one step of the CDF:', '(a) اجمع الاحتمالات وإنت ماشي. وبعدين كل R بتقع على سلّمة من سلالم الـ CDF:')}</${P}>
          <${Code} lines=${[['0   ≤ R ≤ 0.2', 'x = 2'], ['0.2 < R ≤ 0.4', 'x = 5'], ['0.4 < R ≤ 0.6', 'x = 7'], ['0.6 < R ≤ 0.9', 'x = 9'], ['0.9 < R ≤ 1.0', 'x = 10']]} />
          <${P} small=${true}>${X('(b) 0.6 < 0.78 ≤ 0.9, so <b>x = 9</b>. (c) The slide says "Try to compute": E(X) = <b>6.5</b>, V(X) = 49.9 − 6.5² = <b>7.65</b>, σ = <b>2.77</b>.', '(b) الـ 0.78 بين 0.6 و0.9، يبقى <bdi dir="ltr"><b>x = 9</b></bdi>. (c) السلايد بتقول "Try to compute":<span class="ltr">E(X) = <b>6.5</b>,  V(X) = 49.9 − 6.5² = <b>7.65</b>,  σ = <b>2.77</b></span>')}</${P}>
        `),

        // 51 · discrete CDF figure
        page(html`
          <${H2}>${t('From R to X on the step CDF', 'من الـ R للـ X على الـ CDF السلالم')}</${H2}>
          <${Fig} name="ms-disc-cdf" />
        `),

        // 52 · be the mapper
        page(html`
          <${Box} kind="pencil" title=${t('Be the random-number mapper', 'خليك إنت اللي بيحوّل الـ random numbers')}><p className="hf-p small">${t('Which X does each R give? Watch the edges: each range includes its top end, so R = 0.20 is still x = 2.', 'كل R بتدّي أنهي X؟ خلّي بالك من الأطراف: كل range بياخد الطرف اللي فوق، يعني <bdi dir="ltr">R = 0.20</bdi> لسه x = 2.')}</p></${Box}>
          <${Sort} id="map" bins=${[['2', 'x = 2'], ['5', 'x = 5'], ['7', 'x = 7'], ['9', 'x = 9'], ['10', 'x = 10']]} items=${[
            ['<bdi dir="ltr">R = 0.78</bdi>', 3],
            ['<bdi dir="ltr">R = 0.20</bdi>', 0],
            ['<bdi dir="ltr">R = 0.41</bdi>', 2],
            ['<bdi dir="ltr">R = 0.95</bdi>', 4],
            ['<bdi dir="ltr">R = 0.60</bdi>', 2],
            ['<bdi dir="ltr">R = 0.33</bdi>', 1]
          ]} />
          <${Grow} />
        `),

        // 53 · part (c) figure
        page(html`
          <${H2}>${t('Part (c): mean, variance and σ', 'الجزء (c): الـ mean والـ variance والـ σ')}</${H2}>
          <${Fig} name="ms-disc-moments" />
        `),

        // 54 · be the calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the calculator', 'خليك إنت الآلة الحاسبة')}><p className="hf-p small">${t("Five of the lecture's own problems, one step at a time. Pick the right number; a wrong one tells you which mistake it is.", 'خمس مسائل من المحاضرة نفسها، خطوة خطوة. اختار الرقم الصح، والغلط بيقولك إنت غلطت فين.')}</p></${Box}>
          <${Drill} id="calc" />
        `, { sec: t('Exercises', 'التمارين') }),

        // 55–57 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers and the revision sheet. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة والـ revision sheet. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('e2', /median parameter is the most likely/i)}
          <${Gap} h=${4} />
          ${mq('e4', /mean if the data is categorial/i)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e1', /mean 80 and variance 4 are ---/)}
          <${Grow} />
          <${Talk} who="dev">${X('Mean and variance given? Divide: <b>q = npq/np</b>, then check that n is a whole number.', 'الـ mean والـ variance مديهوملك؟ اقسم: <bdi dir="ltr"><b>q = npq/np</b></bdi>، وبعدين اتأكد إن n رقم صحيح.')}</${Talk}>
        `),
        page(html`
          ${mq('e5', /Y = \(X − 1\)\/2/)}
          <${Grow} />
          <${Hand} red=${true}>${t('(X − μ)/σ is the Z transformation: σ = √4 = 2', 'الـ <bdi dir="ltr">(X − μ)/σ</bdi> هو تحويل الـ Z، و<bdi dir="ltr">σ = √4 = 2</bdi>')}</${Hand}>
        `),
        page(html`
          ${mq('e6', /Y = \(X \+ 1\)\/2/)}
          <${Grow} />
          <${Hand}>${t('V(aX) = a²V(X): dividing by 2 divides the variance by 4', 'الـ <bdi dir="ltr">V(aX) = a²V(X)</bdi>: القسمة على 2 بتقسم الـ variance على 4')}</${Hand}>
        `),

        // 58 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>PMF</b> للـ discrete والـ <b>PDF</b> للـ continuous، وفي الـ continuous الاحتمال مساحة.',
            'الـ <b>CDF</b> بتطلع من 0 لـ 1 ومش بتقل أبدًا:<span class="ltr">F(x) = P(X ≤ x),  P(a < X ≤ b) = F(b) − F(a)</span>',
            'الـ <b>mode</b> القيمة الأكثر احتمالًا، والـ <b>median</b> الـ 0.5-quantile، والـ data الـ categorical بتاخد الـ mode.',
            'الـ means والـ variances:<span class="ltr">binomial np, npq;  geometric 1/p, q/p²;  Poisson α, α</span>',
            'والـ continuous، والـ exponential memoryless:<span class="ltr">uniform (a + b)/2, (b − a)²/12;  exp 1/λ, 1/λ²</span>',
            'الـ normal بنحوّله لـ Z ونقرا Φ من الجدول:<span class="ltr">Z = (X − μ)/σ,  Φ(−x) = 1 − Φ(x)</span>',
            'في الـ Poisson process العدد Poisson بـ mean هو λt، والـ gaps بينهم exponential.',
            'الـ empirical الـ parameters بتاعته هي الـ data نفسها: مفيش افتراضات، بس ممكن متغطيش كل القيم.'
          ] : [
            '<b>PMF</b> (discrete) and <b>PDF</b> (continuous): never negative, sum or integrate to 1. Continuous probability is area, and P(X = x₀) = 0.',
            '<b>CDF</b> F(x) = P(X ≤ x): nondecreasing from 0 to 1; P(a < X ≤ b) = F(b) − F(a).',
            'V(X) = E(X²) − (E(X))², σ = √V(X), in the units of the mean.',
            '<b>Mode</b> = most likely value, <b>median</b> = 0.5-quantile; categorical data → mode.',
            'Binomial: np, npq. Geometric: qˣ⁻¹p, mean 1/p. Poisson: mean = variance = α.',
            'Uniform: (a + b)/2, (b − a)²/12. Exponential: 1/λ, 1/λ², memoryless. Normal N(μ, σ²): Z = (X − μ)/σ.',
            'Poisson process: counts are Poisson(λt), gaps are exponential with mean 1/λ.',
            'Empirical: the data are the parameters; no assumptions, but it may miss part of the range.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 59 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="dice">${t('Next time: how a computer fakes me. Random-number generation!', 'المرة الجاية: الكمبيوتر بيقلّدني إزاي. الـ Random-number generation!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [3], t: Date.now() } }}>${t('Quiz me on Lecture 3', 'امتحنّي في محاضرة 3')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 3, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 3, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

// Head First chapter for Modeling & Simulation Lecture 6 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Input modeling: the 4 steps, GIGO, data collection, histograms (interval width, vehicle and chip-life examples), scatter
// diagrams, choosing a family (physical basis), Q-Q plots, parameter estimation (sample mean/variance, grouped data, class
// intervals, MLE table, lognormal), goodness of fit (Type I/II errors, chi-square, equal-probability intervals, K-S), p-values,
// input models without data, multivariate inputs (covariance, correlation, bivariate normal) and time series (AR(1), EAR(1)).
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks the slide/notes errors the notes flag.
// Every number was recomputed with node: vehicle n = 100, Σ fX = 364, Σ fX² = 2080, X̄ = 3.64, S² = 7.6267; Poisson p(x) and
// E = 2.6 … 0.1; χ₀² terms 7.87, 0.15, 0.80, 4.41, 2.57, 0.26, 11.63 (slide 11.62), total 27.69 (slide 27.68); χ²0.05,4/5/6 =
// 9.488 / 11.070 / 12.592; chips X̄ = 11.893, λ̂ = 0.0841, 3-day counts 24, 9, 5, 1, 1, 1, 1, 1, 1, 0, 1, 1, …; equal-probability
// endpoints 1.590 … 24.755, O = 19, 10, 3, 6, 1, 1, 4, 6, χ₀² = 39.60; Q-Q mean 99.9865, s = 0.2832; lognormal 2.25 / 1.296
// (unrounded 2.2725 / 1.3169); K-S D⁺ = 0.1054 (i = 24), D⁻ = 0.0080 (i = 49), 1.36/√50 = 0.1923; lead time/demand X̄ = 6.14,
// 101.8, σ̂ = 1.0244, 9.9309, cov = 8.664, ρ̂ = 0.852 (0.855 with the rounded σ's); order gaps X̄ = 5.194, σ̂² = 26.69,
// Σ XₜXₜ₊₁ = 924.1, cov = 21.6, ρ̂ = 0.81.
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T6 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-ms6')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms6';
    s.textContent = `
.hfb .hf-ms6-steps{ display:grid; gap:5px; }
.hfb .hf-ms6-steps > div{ display:grid; grid-template-columns:34px 1fr; gap:9px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 9px; background:var(--paper); }
.hfb .hf-ms6-steps > div > b{ display:grid; place-items:center; width:30px; height:30px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 15px/1 var(--body); }
.hfb .hf-ms6-steps > div > span{ font-size:14.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-ms6-steps > i{ display:block; height:10px; width:2px; margin-left:24px; background:var(--hf-line); }
.hfb .hf-ms6-mini{ display:block; width:100%; height:auto; }
.hfb .hf-ms6-mini rect{ fill:var(--hf-k); transform-box:fill-box; transform-origin:50% 100%; animation:hf-ms6-grow .7s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-ms6-grow{ from{ transform:scaleY(0); } }
.hfb .hf-ms6-mini text{ font:600 13px var(--mono); fill:var(--graphite); }
.hfb .hf-ms6-tb{ display:grid; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-ms6-tb > span{ padding:4px 7px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-ms6-tb > span.h{ font-weight:800; background:var(--hf-grey); border-top:0; }
.hfb .hf-ms6-tb > span.m{ font-family:var(--mono); font-size:13px; }
.hfb .hf-ms6-pb{ display:grid; gap:3px; }
.hfb .hf-ms6-pb > div{ display:grid; grid-template-columns:108px 1fr; gap:8px; font-size:13.5px; line-height:1.28; padding:2px 0; border-bottom:1px dotted var(--faint); color:var(--ink); }
.hfb .hf-ms6-pb > div > b{ font-weight:800; color:var(--hf-k); }
.hfb .hf-ms6-rb{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-ms6-tabs{ display:flex; gap:5px; }
.hfb .hf-ms6-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms6-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-ms6-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-ms6-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-ms6-svg{ display:block; width:100%; height:auto; }
.hfb .hf-ms6-svg text{ font:600 13px var(--mono); fill:var(--graphite); }
.hfb .hf-ms6-svg text.c{ fill:var(--ink); font-weight:700; }
.hfb .hf-ms6-cap{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); min-height:76px; }
.hfb .hf-ms6-ask{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); }
.hfb .hf-ms6-work{ font:600 13px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; color:var(--ink); min-height:48px; }
.hfb .hf-ms6-work > div{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:hf-up .35s both; }
.hfb .hf-ms6-work .cur{ color:var(--hf-hand); }
.hfb .hf-ms6-q{ font:700 14px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-ms6-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-ms6-opts button{ font:700 13.5px/1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-ms6-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-ms6-ok{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-ms6-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-ms6-row .hf-btn{ padding:7px 9px; }
.hf-ar .hf-ms6-steps > div > span, .hf-ar .hf-ms6-tb > span, .hf-ar .hf-ms6-pb > div, .hf-ar .hf-ms6-cap, .hf-ar .hf-ms6-ask, .hf-ar .hf-ms6-bad, .hf-ar .hf-ms6-ok, .hf-ar .hf-ms6-q{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-ms6-steps > i{ margin-left:0; margin-right:24px; }
.hf-ar .hf-ms6-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-ms6-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-ms6-work{ direction:ltr; text-align:left; }
.hf-ar .hf-ms6-opts button{ font-family:var(--mono), "IBM Plex Sans Arabic"; }
.hf-ar .hf-ms6-tb.ltr{ direction:ltr; text-align:left; }
.hf-ar .hf-ms6-tb.ltr > span{ font-family:var(--body); }
.hf-ar .hf-ms6-tb.ltr > span.m{ font-family:var(--mono); }
.hf-ar .hf-ms6-pb > div > b{ font-family:var(--body); }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: the vehicle-arrival histogram (slide 10), bars growing one by one
  const VF = [12, 10, 19, 17, 10, 8, 7, 5, 5, 3, 3, 1];
  function MiniHist() {
    const W = 328, Hh = 112, bw = 24, x0 = 12, base = 92, k = 4;
    return html`<svg className="hf-ms6-mini hf-in" viewBox=${'0 0 ' + W + ' ' + Hh} role="img" aria-label="Histogram of vehicle arrivals per period, values 0 to 11" dir="ltr">
      <path d=${'M6 ' + base + ' H' + (W - 6)} stroke="var(--hf-line)" strokeWidth="1.5" />
      ${VF.map((f, i) => html`<g key=${i}><rect x=${x0 + i * (bw + 2.5)} y=${base - f * k} width=${bw} height=${f * k} style=${{ animationDelay: calm() ? '0s' : (0.2 + i * 0.09) + 's' }} />
        <text x=${x0 + i * (bw + 2.5) + bw / 2} y=${base + 16} textAnchor="middle">${i}</text></g>`)}
    </svg>`;
  }

  // the four steps of input model development (slide 3)
  function Steps() {
    const ar = useAr();
    const S = ar ? ['<b>اجمع data</b> من الـ system الحقيقي', '<b>حدّد probability distribution</b> تمثّل الـ input process', '<b>اختار الـ parameters</b> بتاعة الـ distribution', '<b>قيّم</b> الـ distribution والـ parameters اللي اخترتها بـ <b>goodness of fit</b>']
      : ['<b>Collect data</b> from the real system', '<b>Identify a probability distribution</b> to represent the input process', '<b>Choose parameters</b> for the distribution', '<b>Evaluate</b> the chosen distribution and parameters for <b>goodness of fit</b>'];
    return html`<div className="hf-ms6-steps">${S.map((x, i) => html`<${React.Fragment} key=${i}>${i > 0 && html`<i aria-hidden="true"></i>`}<div className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.15 + i * 0.25) + 's' }}><b>${i + 1}</b><span>${T6(x)}</span></div></${React.Fragment}>`)}</div>`;
  }

  // re-bin it: the 50 chip lifetimes (the notes' data for slide 11) with five interval widths; every count is computed from the data
  const LIFE = [79.919, 3.081, 0.062, 1.961, 5.845, 3.027, 6.505, 0.021, 0.013, 0.123, 6.769, 59.899, 1.192, 34.760, 5.009, 18.387, 0.141, 43.565, 24.420, 0.433, 144.695, 2.663, 17.967, 0.091, 9.003, 0.941, 0.878, 3.371, 2.157, 7.579, 0.624, 5.380, 3.148, 7.078, 23.960, 0.590, 1.928, 0.300, 0.002, 0.543, 7.004, 31.764, 1.005, 1.147, 0.219, 3.217, 14.382, 1.008, 2.336, 4.562];
  const WIDTHS = [1, 3, 10, 21, 50];
  const RB_TXT = {
    1: ['Width <b>1 day</b>: 145 cells, and only 20 of them have anything in them. Ragged and full of holes: <b>too narrow</b>.',
      'العرض <b>يوم واحد</b>: 145 cell، و20 بس منهم فيهم حاجة. مسنن ومليان فراغات: <b>ضيق زيادة</b>.'],
    3: ['Width <b>3 days</b>, as on slide 11: 24, 9, 5, then single chips out to 147 days. A tall first bar and a long right tail: the <b>exponential</b> shape. (The slide\'s table says 23 and 10 ‡.)',
      'العرض <b>3 أيام</b> زي سلايد 11: 24 و9 و5، وبعدين chip واحدة هنا وهناك لحد 147 يوم. أول bar طويل وذيل طويل ناحية اليمين: ده شكل الـ <b>exponential</b>. (جدول السلايد كاتب 23 و10 ‡.)'],
    10: ['Width <b>10 days</b>: 39, 3, 2, 2, 1, 1, … The first bar towers over everything and the tail is a few lonely 1s.',
      'العرض <b>10 أيام</b>: 39 و3 و2 و2 و1 و1 … أول bar عالي جدًا عن الباقي، والذيل شوية 1 لوحدهم.'],
    21: ['About <b>√50 ≈ 7 intervals</b>, so width ≈ 147 / 7 = 21: 42, 4, 2, 1, 0, 0, 1. Already blocky. The slides say the number of intervals also depends on the <b>dispersion</b> of the data, and this tail is very spread out.',
      'حوالي <b><bdi dir="ltr">√50 ≈ 7</bdi> intervals</b>، يعني العرض تقريبًا <bdi dir="ltr">147 / 7 = 21</bdi>: الأعداد 42 و4 و2 و1 و0 و0 و1. بقى مكعبات خلاص. السلايدز بتقول إن عدد الـ intervals بيعتمد كمان على الـ <b>dispersion</b> بتاع الـ data، والذيل ده منتشر جدًا.'],
    50: ['Width <b>50 days</b>: 47, 2, 1. Three blocks that tell you almost nothing: <b>too coarse</b>.',
      'العرض <b>50 يوم</b>: 47 و2 و1. تلات مكعبات مش بيقولولك أي حاجة تقريبًا: <b>خشن (coarse) زيادة</b>.']
  };
  function Rebin() {
    const ar = useAr();
    const [w, setW] = H.K.useSlot('rebin', 3);
    const nb = Math.ceil(145 / w), c = Array(nb).fill(0); LIFE.forEach(x => { c[Math.floor(x / w)]++; });
    const W = 328, Hh = 150, L = 28, R = 8, Tp = 18, B = 24, pw = W - L - R, ph = Hh - Tp - B, mx = Math.max(...c);
    const X = d => L + d / 150 * pw, Y = v => Tp + ph - v / mx * ph;
    return html`<div className="hf-ms6-rb hf-in">
      <div className="hf-ms6-tabs" role="group" aria-label=${ar ? 'عرض الـ interval' : 'Interval width'}>${WIDTHS.map(v => html`<button key=${v} aria-pressed=${String(w === v)} onClick=${() => setW(v)}>${v}${ar ? ' يوم' : ' d'}</button>`)}</div>
      <svg className="hf-ms6-svg" viewBox=${'0 0 ' + W + ' ' + Hh} role="img" aria-label=${'Histogram of 50 chip lifetimes with interval width ' + w + ' days: ' + c.join(', ')} dir="ltr">
        ${[0, 50, 100, 150].map(d => html`<g key=${d}><path d=${'M' + X(d) + ' ' + (Tp + ph) + ' v4'} stroke="var(--hf-line)" /><text x=${X(d)} y=${Hh - 6} textAnchor="middle">${d}</text></g>`)}
        <text x=${L - 5} y=${Tp + 4} textAnchor="end">${mx}</text><text x=${L - 5} y=${Tp + ph} textAnchor="end">0</text>
        ${c.map((v, i) => v ? html`<rect key=${w + '-' + i} x=${X(i * w) + (nb > 60 ? 0 : 0.6)} y=${Y(v)} width=${Math.max(1, X(w) - X(0) - (nb > 60 ? 0 : 1.2))} height=${Tp + ph - Y(v)} fill="var(--hf-k)" />` : null)}
        ${nb <= 16 && c.map((v, i) => v ? html`<text key=${'t' + i} className="c" x=${X(i * w + w / 2)} y=${Y(v) - 4} textAnchor="middle">${v}</text>` : null)}
        <path d=${'M' + L + ' ' + (Tp + ph) + ' H' + (W - R)} stroke="var(--hf-line)" strokeWidth="1.5" />
        <text x=${W - R} y=${Tp - 4} textAnchor="end">${ar ? '' : 'days'}</text>
      </svg>
      <p className="hf-ms6-cap" key=${w}>${T6(RB_TXT[w][ar ? 1 : 0])}</p>
    </div>`;
  }

  // Be the estimator / Be the tester: problems solved one step at a time; every wrong option is a real mistake, every right one was checked
  const EST = [
    {
      en: '<b>Vehicle arrivals</b> (slide 22): n = 100 periods, Σ fⱼXⱼ = 364, Σ fⱼXⱼ² = 2080. Fit the Poisson.',
      ar: 'الـ <b>vehicle arrivals</b> (سلايد 22): عندنا 100 period، والمجاميع دي. اعمل fit للـ Poisson.<span class="ltr">Σ fⱼXⱼ = 364,   Σ fⱼXⱼ² = 2080</span>',
      steps: [
        { l: ['Sample mean X̄?', 'الـ sample mean كام؟'], o: ['30.33', '3.64', '0.364'], a: 1, w: 'X̄ = 364 / 100 = 3.64',
          h: [['That divides by the 12 cells. Divide by n = 100 observations.', 'ده قسمة على الـ 12 cell. اقسم على الـ 100 observation.'], null, ['364 / 100 is 3.64, not 0.364.', 'القسمة دي تطلع 3.64 مش 0.364.']] },
        { l: ['n X̄²?', 'قيمة الـ <bdi dir="ltr">n X̄²</bdi> كام؟'], o: ['13.25', '364', '1324.96'], a: 2, w: 'n X̄² = 100 × 3.64² = 1324.96',
          h: [['That is X̄² alone: multiply by n = 100.', 'ده الـ <bdi dir="ltr">X̄²</bdi> بس: اضرب في 100.'], ['That is Σ fⱼXⱼ, not n X̄².', 'ده الـ <bdi dir="ltr">Σ fⱼXⱼ</bdi> مش الـ <bdi dir="ltr">n X̄²</bdi>.'], null] },
        { l: ['Sample variance S²?', 'الـ sample variance كام؟'], o: ['7.55', '7.63', '20.80'], a: 1, w: ['S² = (2080 − 1324.96) / 99', '   = 755.04 / 99 = 7.63'],
          h: [['That divides by n = 100. S² divides by n − 1 = 99.', 'ده قسمة على 100، والـ <bdi dir="ltr">S²</bdi> بنقسمه على <bdi dir="ltr">n − 1 = 99</bdi>.'], null, ['That is Σ fⱼXⱼ² / n: n X̄² was never subtracted.', 'ده <bdi dir="ltr">Σ fⱼXⱼ² / n</bdi>: نسيت تطرح الـ <bdi dir="ltr">n X̄²</bdi>.']] },
        { l: ['Poisson estimate α̂?', 'الـ estimate بتاع الـ Poisson كام؟'], o: ['α̂ = 7.63', 'α̂ = 3.64', 'α̂ = 0.275'], a: 1, w: 'α̂ = X̄ = 3.64 (MLE)',
          h: [['The MLE for the Poisson uses the mean: α̂ = X̄.', 'الـ MLE بتاع الـ Poisson بيستخدم الـ mean.'], null, ['That is 1/X̄, the exponential\'s λ̂.', 'ده <bdi dir="ltr">1/X̄</bdi>، يعني الـ λ̂ بتاع الـ exponential.']] }
      ]
    },
    {
      en: 'A discrete sample of <b>n = 20</b>: the values 0, 1, 2, 3 occur 5, 10, 3 and 2 times.',
      ar: 'عينة discrete فيها <b>20</b> قيمة: القيم 0 و1 و2 و3 اتكرروا 5 و10 و3 و2 مرة.',
      steps: [
        { l: ['Σ fⱼXⱼ?', 'المجموع <bdi dir="ltr">Σ fⱼXⱼ</bdi> كام؟'], o: ['6', '22', '20'], a: 1, w: 'Σ fⱼXⱼ = 0 + 10 + 6 + 6 = 22',
          h: [['6 is 0 + 1 + 2 + 3: weight each value by its frequency.', 'الـ 6 دي <bdi dir="ltr">0 + 1 + 2 + 3</bdi>: اضرب كل قيمة في الـ frequency بتاعتها.'], null, ['20 is n = Σ fⱼ.', 'الـ 20 دي الـ n نفسها.']] },
        { l: ['X̄?', 'الـ X̄ كام؟'], o: ['1.5', '1.1', '5.5'], a: 1, w: 'X̄ = 22 / 20 = 1.1',
          h: [['1.5 is the plain average of 0 to 3, ignoring the frequencies.', 'الـ 1.5 دي متوسط 0 لـ 3 من غير الـ frequencies.'], null, ['22 / 4 divides by the 4 distinct values. Divide by n = 20.', 'ده قسمة على الـ 4 قيم المختلفة. اقسم على الـ 20.']] },
        { l: ['Σ fⱼXⱼ²?', 'المجموع <bdi dir="ltr">Σ fⱼXⱼ²</bdi> كام؟'], o: ['40', '14', '22'], a: 0, w: 'Σ fⱼXⱼ² = 0 + 10 + 12 + 18 = 40',
          h: [null, ['14 is 0 + 1 + 4 + 9: the frequencies are missing.', 'الـ 14 دي <bdi dir="ltr">0 + 1 + 4 + 9</bdi>: الـ frequencies ناقصة.'], ['22 is Σ fⱼXⱼ: square each value first.', 'الـ 22 دي <bdi dir="ltr">Σ fⱼXⱼ</bdi>: ربّع القيم الأول.']] },
        { l: ['S²?', 'الـ S² كام؟'], o: ['0.79', '0.83', '2.00'], a: 1, w: ['S² = (40 − 20 × 1.1²) / 19', '   = 15.8 / 19 = 0.83'],
          h: [['That divides by n = 20 instead of n − 1 = 19.', 'ده قسمة على 20 بدل <bdi dir="ltr">n − 1 = 19</bdi>.'], null, ['That is 40 / 20 without subtracting n X̄².', 'ده <bdi dir="ltr">40 / 20</bdi> من غير ما تطرح الـ <bdi dir="ltr">n X̄²</bdi>.']] }
      ]
    },
    {
      en: 'The raw data are lost. Only class intervals are left: [0, 2) f = 4, [2, 4) f = 6, [4, 6) f = 10, so n = 20.',
      ar: 'الـ raw data ضاعت، وفاضل الـ class intervals بس، يعني <bdi dir="ltr">n = 20</bdi>:<span class="ltr">[0, 2) f = 4,   [2, 4) f = 6,   [4, 6) f = 10</span>',
      steps: [
        { l: ['Midpoints mⱼ?', 'الـ midpoints كام؟'], o: ['0, 2, 4', '1, 3, 5', '2, 4, 6'], a: 1, w: 'm = 1, 3, 5',
          h: [['Those are the lower endpoints.', 'دول الأطراف الصغيرة.'], null, ['Those are the upper endpoints.', 'دول الأطراف الكبيرة.']] },
        { l: ['X̄ ≈ ?', 'الـ X̄ تقريبًا كام؟'], o: ['2.6', '3.6', '24'], a: 1, w: ['X̄ ≈ (4·1 + 6·3 + 10·5) / 20', '  = 72 / 20 = 3.6'],
          h: [['2.6 uses the lower endpoints. The rule uses the midpoints mⱼ.', 'الـ 2.6 دي بالأطراف الصغيرة، والقاعدة بالـ midpoints.'], null, ['72 / 3 divides by c = 3 intervals. Divide by n = 20.', 'ده قسمة على الـ 3 intervals. اقسم على الـ 20.']] },
        { l: ['Σ fⱼmⱼ²?', 'المجموع <bdi dir="ltr">Σ fⱼmⱼ²</bdi> كام؟'], o: ['308', '72', '35'], a: 0, w: 'Σ fⱼmⱼ² = 4 + 54 + 250 = 308',
          h: [null, ['72 is Σ fⱼmⱼ: square the midpoints.', 'الـ 72 دي <bdi dir="ltr">Σ fⱼmⱼ</bdi>: ربّع الـ midpoints.'], ['35 is 1 + 9 + 25: the frequencies are missing.', 'الـ 35 دي <bdi dir="ltr">1 + 9 + 25</bdi>: الـ frequencies ناقصة.']] },
        { l: ['S² ≈ ?', 'الـ S² تقريبًا كام؟'], o: ['2.44', '2.57', '15.4'], a: 1, w: ['S² ≈ (308 − 20 × 3.6²) / 19', '   = 48.8 / 19 = 2.57'],
          h: [['That divides by n = 20. Use n − 1 = 19.', 'ده قسمة على 20. استخدم 19.'], null, ['That is 308 / 20 without subtracting n X̄².', 'ده <bdi dir="ltr">308 / 20</bdi> من غير ما تطرح الـ <bdi dir="ltr">n X̄²</bdi>.']] }
      ]
    }
  ];
  const EST_ANS = [['α̂ = 3.64 (and S² = 7.63)', 'الـ <bdi dir="ltr">α̂ = 3.64</bdi> (والـ <bdi dir="ltr">S² = 7.63</bdi>)'], ['X̄ = 1.1, S² = 0.83', 'الـ <bdi dir="ltr">X̄ = 1.1</bdi> والـ <bdi dir="ltr">S² = 0.83</bdi>'], ['X̄ ≈ 3.6, S² ≈ 2.57', 'الـ <bdi dir="ltr">X̄ ≈ 3.6</bdi> والـ <bdi dir="ltr">S² ≈ 2.57</bdi>']];
  const REJ = ['Reject H₀', 'نرفض H₀'], ACC = ['Accept H₀', 'نقبل H₀'], NREJ = ['Do not reject H₀', 'منرفضش H₀'];
  const TEST = [
    {
      en: '<b>Vehicle arrivals vs Poisson</b> (slide 30): n = 100, α̂ = 3.64, χ₀² = 27.68 after combining, α = 0.05.',
      ar: 'الـ <b>vehicle arrivals</b> قصاد الـ Poisson (سلايد 30)، عند مستوى 0.05:<span class="ltr">n = 100,   α̂ = 3.64,   χ₀² = 27.68 after combining</span>',
      steps: [
        { l: ['Expected E for x = 0?', 'الـ E عند <bdi dir="ltr">x = 0</bdi> كام؟'], o: ['0.026', '2.6', '12'], a: 1, w: 'E₀ = n·p(0) = 100 × 0.026 = 2.6',
          h: [['0.026 is the probability p(0). E = n · p.', 'الـ 0.026 دي الـ probability. الـ <bdi dir="ltr">E = n · p</bdi>.'], null, ['12 is the observed O₀, not the expected.', 'الـ 12 دي الـ O المتشافة، مش الـ E.']] },
        { l: ['Cells k after combining?', 'كام cell فاضلين بعد الدمج؟'], o: ['12', '8', '7'], a: 2, w: ['x = 0, 1 → one cell (E = 12.2)', 'x = 7 … ≥ 11 → one cell (E = 7.6)', 'k = 7'],
          h: [['12 is before combining: E = 2.6, 4.4, 2.0, … are below 5.', 'الـ 12 دي قبل الدمج: فيه E أقل من 5 زي 2.6 و4.4 و2.0.'], ['With 8 cells one cell still has E < 5. Combine at both ends.', 'بـ 8 cells لسه فيه cell الـ E بتاعها أقل من 5. ادمج من الناحيتين.'], null] },
        { l: ['Degrees of freedom?', 'الـ degrees of freedom كام؟'], o: ['6', '5', '4'], a: 1, w: 'df = k − s − 1 = 7 − 1 − 1 = 5',
          h: [['6 = k − 1 forgets the estimated parameter (s = 1).', 'الـ 6 دي <bdi dir="ltr">k − 1</bdi>: نسيت الـ parameter اللي اتقدّر.'], null, ['4 subtracts two parameters. The Poisson has one, α.', 'الـ 4 دي طرحت اتنين parameters، والـ Poisson ليه واحد بس.']] },
        { l: ['Critical value χ²0.05,5?', 'الـ critical value كام؟'], o: ['11.07', '12.59', '9.49'], a: 0, w: 'χ²0.05,5 = 11.07',
          h: [null, ['12.59 is for 6 degrees of freedom.', 'الـ 12.59 دي لـ 6 degrees of freedom.'], ['9.49 is for 4 degrees of freedom.', 'الـ 9.49 دي لـ 4 degrees of freedom.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: [ACC, REJ], a: 1, w: '27.68 > 11.07 → reject H₀',
          h: [['27.68 is larger than 11.07. Reject when χ₀² > the critical value.', 'الـ 27.68 أكبر من 11.07، وبنرفض لما الـ χ₀² تبقى أكبر من الـ critical value.'], null] }
      ]
    },
    {
      en: 'A Poisson test ends with <b>6 cells</b> after combining (α estimated from the data) and χ₀² = 10.2, at α = 0.05.',
      ar: 'test للـ Poisson فاضل فيه <b>6 cells</b> بعد الدمج، والـ α متقدّر من الـ data، عند مستوى 0.05:<span class="ltr">χ₀² = 10.2</span>',
      steps: [
        { l: ['Degrees of freedom?', 'الـ degrees of freedom كام؟'], o: ['5', '4', '3'], a: 1, w: 'df = 6 − 1 − 1 = 4',
          h: [['5 = k − 1 forgets the estimated α.', 'الـ 5 دي <bdi dir="ltr">k − 1</bdi>: نسيت الـ α اللي اتقدّر.'], null, ['3 subtracts two parameters. Only α was estimated.', 'الـ 3 دي طرحت اتنين، وإحنا قدّرنا الـ α بس.']] },
        { l: ['Critical value?', 'الـ critical value كام؟'], o: ['11.07', '9.49'], a: 1, w: 'χ²0.05,4 = 9.49',
          h: [['11.07 is for 5 degrees of freedom.', 'الـ 11.07 دي لـ 5 degrees of freedom.'], null] },
        { l: ['Decision?', 'القرار إيه؟'], o: [REJ, ACC], a: 0, w: '10.2 > 9.49 → reject H₀',
          h: [null, ['10.2 is above 9.49. (Accepting would use 11.07, the 5-df value.)', 'الـ 10.2 أكبر من 9.49. (القبول ده جاي من 11.07 بتاعة الـ 5 df.)']] }
      ]
    },
    {
      en: '<b>Chip lifetimes vs exponential</b> (Example 6.6): n = 50, λ̂ = 0.084, equal-probability intervals, χ₀² = 39.60.',
      ar: 'الـ <b>chip lifetimes</b> قصاد الـ exponential (مثال 6.6)، بـ intervals متساوية في الـ probability:<span class="ltr">n = 50,   λ̂ = 0.084,   χ₀² = 39.60</span>',
      steps: [
        { l: ['Largest k allowed?', 'أكبر k مسموح كام؟'], o: ['7', '10', '25'], a: 1, w: 'Eᵢ = n/k ≥ 5 → k ≤ 50/5 = 10',
          h: [['√50 ≈ 7 is the histogram rule, not this limit.', 'الـ <bdi dir="ltr">√50 ≈ 7</bdi> دي قاعدة الـ histogram، مش الحد ده.'], null, ['k = 25 gives Eᵢ = 2, below 5.', 'لو k بـ 25 الـ E هتبقى 2، أقل من 5.']] },
        { l: ['With k = 8, each Eᵢ?', 'لو <bdi dir="ltr">k = 8</bdi>، كل E كام؟'], o: ['0.125', '6.25', '5'], a: 1, w: 'Eᵢ = 50 / 8 = 6.25',
          h: [['0.125 is pᵢ = 1/8. Eᵢ = n pᵢ.', 'الـ 0.125 دي الـ <bdi dir="ltr">pᵢ = 1/8</bdi>، والـ <bdi dir="ltr">Eᵢ = n pᵢ</bdi>.'], null, ['5 is the minimum; you get exactly 5 only with k = 10.', 'الـ 5 دي الحد الأدنى، وبتطلع 5 بالظبط لو k بـ 10 بس.']] },
        { l: ['Endpoint a₃?', 'الـ endpoint رقم 3 كام؟'], o: ['3.425', '5.595', '8.252'], a: 1, w: ['a₃ = −(1/0.084) ln(1 − 3 × 0.125)', '   = 5.595'],
          h: [['3.425 is a₂ = −(1/0.084) ln(0.75).', 'الـ 3.425 دي الـ a₂.'], null, ['8.252 is a₄ = −(1/0.084) ln(0.5).', 'الـ 8.252 دي الـ a₄.']] },
        { l: ['Degrees of freedom?', 'الـ degrees of freedom كام؟'], o: ['7', '6'], a: 1, w: 'df = 8 − 1 − 1 = 6',
          h: [['7 = k − 1 forgets the estimated λ.', 'الـ 7 دي <bdi dir="ltr">k − 1</bdi>: نسيت الـ λ اللي اتقدّرت.'], null] },
        { l: ['Decision (χ²0.05,6 = 12.59)?', 'القرار إيه؟ (الـ critical بـ 12.59)'], o: [ACC, REJ], a: 1, w: '39.60 > 12.59 → reject H₀',
          h: [['39.60 is far above 12.59.', 'الـ 39.60 أكبر بكتير من 12.59.'], null] }
      ]
    },
    {
      en: '<b>K-S test</b> (Example 6.7): N = 50 normalized arrival times, D⁺ = 0.1054, D⁻ = 0.0080, α = 0.05.',
      ar: 'الـ <b>K‑S test</b> (مثال 6.7) على 50 arrival time متعملهم normalize، عند مستوى 0.05:<span class="ltr">N = 50,   D⁺ = 0.1054,   D⁻ = 0.0080</span>',
      steps: [
        { l: ['D?', 'الـ D كام؟'], o: ['0.0080', '0.1054', '0.1134'], a: 1, w: 'D = max(D⁺, D⁻) = 0.1054',
          h: [['D is the larger of the two, not the smaller.', 'الـ D هي الأكبر فيهم، مش الأصغر.'], null, ['D is the maximum of D⁺ and D⁻, not their sum.', 'الـ D هي الـ max، مش المجموع.']] },
        { l: ['Critical value D0.05?', 'الـ critical value كام؟'], o: ['0.1923', '0.0272', '0.410'], a: 0, w: 'D0.05 = 1.36 / √50 = 0.1923',
          h: [null, ['1.36 / 50 forgets the square root.', 'ده <bdi dir="ltr">1.36 / 50</bdi>: نسيت الجذر.'], ['0.410 is the table value for N = 10. For N > 35 use 1.36/√N.', 'الـ 0.410 دي للـ N بـ 10. لو N أكبر من 35 استخدم <bdi dir="ltr">1.36/√N</bdi>.']] },
        { l: ['Decision?', 'القرار إيه؟'], o: [REJ, NREJ], a: 1, w: '0.1054 < 0.1923 → do not reject H₀',
          h: [['D = 0.1054 is below the critical value 0.1923.', 'الـ D أصغر من الـ critical value.'], null] }
      ]
    }
  ];
  const TEST_ANS = [['Reject H₀: not Poisson with α = 3.64', 'نرفض H₀: مش Poisson بـ <bdi dir="ltr">α = 3.64</bdi>'], ['Reject H₀ (10.2 > 9.49)', 'نرفض H₀ لأن <bdi dir="ltr">10.2 > 9.49</bdi>'],
    ['Reject H₀: not exponential with λ = 0.084', 'نرفض H₀: مش exponential بـ <bdi dir="ltr">λ = 0.084</bdi>'], ['Do not reject H₀: exponential interarrival times', 'منرفضش H₀: الـ interarrival times نعتبرها exponential']];
  function Drill({ id, probs, ans }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id + ':p', 0);
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const d = [H.K.useSlot(id + ':0', 0)[0], H.K.useSlot(id + ':1', 0)[0], H.K.useSlot(id + ':2', 0)[0], H.K.useSlot(id + ':3', 0)[0]];
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = probs[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    const lab = o => Array.isArray(o) ? o[ar ? 1 : 0] : o;
    return html`<div className="hf-ms6-rb hf-in">
      <div className="hf-ms6-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${probs.map((_, j) => html`<button key=${j} className=${d[j] >= probs[j].steps.length ? 'dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? 'مسألة ' : 'Problem '}${j + 1}</button>`)}</div>
      <p className="hf-ms6-ask">${T6(ar ? P.ar : P.en)}</p>
      <div className="hf-ms6-work" dir="ltr">${P.steps.slice(0, k).reduce((a, s) => a.concat(s.w), []).map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}${!done && html`<div className="cur">${st.l[0].replace('?', ' = ?')}</div>`}</div>
      ${done ? html`<p className="hf-ms6-ok">${T6(ar ? `<b>خلصت!</b> النتيجة: <b>${ans[p][1]}</b>.${p < probs.length - 1 ? ' جرّب المسألة اللي بعدها.' : ''}` : `<b>Done!</b> <b>${ans[p][0]}</b>.${p < probs.length - 1 ? ' Try the next problem.' : ''}`)}</p>`
        : html`<p className="hf-ms6-q">${T6(ar ? st.l[1] : st.l[0])}</p><div className="hf-ms6-opts" dir=${ar && st.o.some(Array.isArray) ? 'rtl' : 'ltr'}>${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${T6(lab(o))}</button>`)}</div>`}
      ${bad && html`<p className="hf-ms6-bad">${T6(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-ms6-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'ورّيني الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div>
    </div>`;
  }

  H.chapters.ms[6] = {
    title: 'Input Modeling', kicker: 'Chapter 6', run: 'input modeling',
    ar: { title: 'الـ Input Modeling', kicker: 'الفصل 6', run: 'الـ input modeling' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (quiz items with src), with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 6);
      const arQuiz = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[6] && window.AR.ms.lectures[6].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      // a small table: cols = CSS grid columns, rows[0] is the header; ltr keeps notation tables left to right in the Arabic book
      const TB = (cols, rows, ltr) => html`<div className=${'hf-ms6-tb hf-in' + (ltr ? ' ltr' : '')} style=${{ gridTemplateColumns: cols }} dir=${ltr ? 'ltr' : null}>${rows.map((r, i) => r.map((c, j) => html`<span key=${i + '-' + j} className=${i === 0 ? 'h' : (typeof c === 'string' && /^[α-ωλμσθβχΣD0-9]/.test(c) && j > 0 ? 'm' : '')}>${T(String(c))}</span>`))}</div>`;
      const LI = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X('Last chapter you turned random numbers into values of a distribution somebody <i>handed</i> you. This chapter asks the question nobody asked: <b>where does that distribution come from?</b> Every fact is from the lecture; the numbers were all re-checked.',
            'في الفصل اللي فات حوّلت random numbers لقيم من distribution حد <i>إداهالك</i> جاهزة. الفصل ده بيسأل السؤال اللي محدش سأله: <b>الـ distribution دي جاية منين أصلًا؟</b> كل المعلومات من المحاضرة، وكل الأرقام اتراجعت تاني.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You re-bin a histogram, estimate parameters and run the tests yourself, one checked step at a time.', '<b>حل التمارين.</b> هتعيد تقسيم histogram، وتقدّر parameters، وتعمل الـ tests بنفسك، خطوة خطوة وكل خطوة بتتصحح.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers what you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake in the slides or the notes, and what was meant.', 'معناها غلطة في السلايدز أو الـ notes، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the lecture\'s.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات مننا، مش من المحاضرة.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">6</span><span className="t">${A ? html`الفصل السادس<br/>Modeling & Simulation` : html`Chapter six<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Garbage In, Garbage Out', 'اللي يدخل زبالة، يطلع زبالة')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('input modeling', 'الـ input modeling')}</p></div>
          <${MiniHist} />
          <${Talk} who="table">${X('100 mornings of cars at one crossing. That\'s all I am: <b>numbers</b>.', 'أنا 100 صباحية عربيات عند تقاطع واحد. ده كل اللي فيّا: <b>أرقام</b>.')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('And I need a <b>distribution</b> with <b>parameters</b>. Who turns one into the other?', 'وأنا عايز <b>distribution</b> ليها <b>parameters</b>. مين بيحوّل ده لده؟')}</${Talk}>
          <${P} small=${true}>${X('You do. That job is <b>input modeling</b>, and if you do it badly, the best model in the world gives you rubbish.', 'إنت. الشغلانة دي اسمها <b>input modeling</b>، ولو عملتها وحش، أحسن model في الدنيا هيطلّعلك كلام فاضي.')}</${P}>
        `, { sec: t('Garbage in, garbage out', 'اللي يدخل زبالة يطلع زبالة') }),

        // 2 · why and the four steps
        page(html`
          <${H2}>${t('The driving force of every simulation', 'الـ driving force بتاعة أي simulation')}</${H2}>
          <${Def}>${X('<b>Input models provide the driving force for a simulation model.</b> The quality of the output is <b>no better</b> than the quality of the inputs.', '<b>الـ input models هي الـ driving force بتاعة الـ simulation model.</b> وجودة الـ output <b>عمرها ما هتبقى أحسن</b> من جودة الـ inputs.')}</${Def}>
          <${P} small=${true}>${X('Inputs like the <b>time between arrivals</b> and <b>service times</b> in a queue, or <b>demand</b> and <b>lead time</b> in an inventory system. Building a model for each takes <b>4 steps</b>:',
            'inputs زي الـ <b>time between arrivals</b> والـ <b>service times</b> في الـ queue، أو الـ <b>demand</b> والـ <b>lead time</b> في الـ inventory system. وبناء model لكل واحد بياخد <b>4 خطوات</b>:')}</${P}>
          <${Steps} />
        `, { sec: t('The four steps', 'الأربع خطوات') }),

        // 3 · GIGO figure
        page(html`
          <${H2}>${t('From raw data to output', 'من الـ raw data للـ output')}</${H2}>
          <${Fig} name="ms-in-gigo" />
        `),

        // 4 · step 1
        page(html`
          <${H1}>${t('Step 1: collect the data', 'الخطوة 1: اجمع الـ data')}</${H1}>
          <${P} small=${true}>${X('Data collection is <b>one of the biggest tasks</b> in solving a real problem, and it takes a lot of time and resources. Seven suggestions make it easier; first, the trap behind all of them:',
            'جمع الـ data <b>من أكبر المهام</b> في حل أي مشكلة حقيقية، وبياخد وقت وموارد كتير. فيه 7 اقتراحات بتسهّله، بس الأول الفخ اللي وراهم كلهم:')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('GIGO stands for <b>Garbage-In-Garbage-Out</b> (not "Good-Input-Good-Output"). Even a <b>valid</b> model misleads if its input data are <b>inaccurately collected</b>, <b>inappropriately analyzed</b> or <b>not representative</b> of the environment.',
            'الـ GIGO معناها <b><bdi dir="ltr">Garbage-In-Garbage-Out</bdi></b> (مش <bdi dir="ltr">Good-Input-Good-Output</bdi>). حتى الـ model الـ <b>valid</b> بيضلّلك لو الـ input data <b>اتجمعت غلط</b>، أو <b>اتحللت بطريقة مش مناسبة</b>، أو <b>مش ممثلة</b> للبيئة.')}</p></${Box}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('If you speed up the server, which of these numbers change? Those are the ones you must <b>not</b> feed into the model as inputs.', 'لو سرّعت الـ server، أنهي أرقام من دول هتتغير؟ دي بالظبط اللي <b>متدخلهاش</b> للـ model كـ inputs.')}</p></${Box}>
        `, { sec: t('Data collection', 'جمع الـ data') }),

        // 4b · seven suggestions
        page(html`
          <${H2}>${t('Seven suggestions (slide 6)', 'سبع اقتراحات (سلايد 6)')}</${H2}>
          <${UL} items=${A ? [
            '<b>خطط بدري</b>: ابدأ بـ session تجريبية، وخلّي بالك من الظروف الغريبة.',
            '<b>حلل الـ data وإنت بتجمعها</b>: اتأكد إنها كافية (adequacy).',
            '<b>ادمج الـ data sets المتجانسة (homogeneous)</b>: فترات ورا بعض، أو نفس الفترة في أيام ورا بعض.',
            '<b>خلّي بالك من الـ data censoring</b>: الكمية مش متشافة كلها، وممكن الـ process times الطويلة تقع منك.',
            '<b>دوّر على علاقة بين الـ variables</b> (بالـ scatter diagram).',
            '<b>دوّر على الـ autocorrelation</b>.',
            '<b>اجمع input data، مش performance data</b>.'
          ] : [
            '<b>Plan ahead</b>: begin with a practice or pre-observing session; watch for unusual circumstances.',
            '<b>Analyze the data as it is being collected</b>: check adequacy.',
            '<b>Combine homogeneous data sets</b>: successive time periods, or the same period on successive days.',
            '<b>Be aware of data censoring</b>: the quantity is not observed in its entirety; long process times may be left out.',
            '<b>Check for relationships between variables</b> (scatter diagram).',
            '<b>Check for autocorrelation</b>.',
            '<b>Collect input data, not performance data</b>.'
          ]} />
          <${Grow} />
          <${Hand}>${t('No data at all? Expert opinion and knowledge of the process: educated guesses.', 'مفيش data خالص؟ رأي الخبراء ومعرفتنا بالـ process: تخمينات مدروسة.')}</${Hand}>
        `),

        // 5 · the suggestions in more detail
        page(html`
          <${H2}>${t('Three suggestions, up close', 'تلات اقتراحات عن قرب')}</${H2}>
          <${P} small=${true}>${X('<b>Plan ahead</b> means devising the data-collection forms before you observe (they usually get modified several times), deciding how to handle unusual circumstances, and allowing plenty of time to convert existing data into a usable format.',
            '<b>التخطيط بدري</b> يعني تجهّز الـ data‑collection forms قبل ما تلاحظ (وغالبًا بتتعدل كذا مرة)، وتقرر هتتعامل إزاي مع الظروف الغريبة، وتسيب وقت كفاية تحوّل فيه الـ data الموجودة لشكل ينفع يتستخدم.')}</${P}>
          <${P} small=${true}>${X('<b>Combining</b> sets: a first test is whether the <b>means</b> of the distributions are the same.', 'قبل ما <b>تدمج</b> data sets: أول test إنك تشوف الـ <b>means</b> بتاعة الـ distributions زي بعض ولا لأ.')}</${P}>
          <${Def}>${X('<b>Autocorrelation</b>: the service time of the i-th customer affects the (i + n)-th customer.', 'الـ <b>autocorrelation</b>: لما الـ service time بتاع الـ customer رقم <bdi dir="ltr">i</bdi> يأثر على الـ customer رقم <bdi dir="ltr">(i + n)</bdi>.')}</${Def}>
          <${Talk} who="cust">${X('My long service made the next customer wait longer, and slower too? That\'s us being <b>autocorrelated</b>.', 'الخدمة الطويلة بتاعتي خلّت اللي بعدي يستنى أكتر؟ ده إحنا كده <b>autocorrelated</b>.')}</${Talk}>
          <${Def}>${X('<b>Input data</b> are uncertain quantities largely beyond the system\'s control that <b>won\'t change</b> when you improve the system (e.g. arrival times). <b>Performance data</b> are its outputs (e.g. delays).',
            'الـ <b>input data</b> كميات مش مؤكدة، أغلبها برّه سيطرة الـ system، و<b>مش هتتغير</b> لما تحسّن الـ system (زي الـ arrival times). أما الـ <b>performance data</b> فهي الـ outputs بتاعته (زي الـ delays).')}</${Def}>
        `),

        // 6 · sort input vs performance
        page(html`
          <${Box} kind="pencil" title=${t('Input or performance?', 'input ولا performance؟')}><p className="hf-p small">${X('Our exercise, built from the lecture\'s examples. Tap <b>I</b> for input data you should collect, or <b>P</b> for performance data (an output of the model).', 'تمرين من عندنا من أمثلة المحاضرة. دوس <b>I</b> لو دي input data المفروض تجمعها، أو <b>P</b> لو performance data (output من الـ model).')}</p></${Box}>
          <${Sort} id="ip" bins=${A ? [['I', 'الـ input data'], ['P', 'الـ performance data']] : [['I', 'Input data'], ['P', 'Performance data']]} items=${A ? [
            ['الـ time between arrivals في الـ queue', 0],
            ['الـ delay بتاع كل customer في الـ queue', 1],
            ['الـ service times', 0],
            ['الـ demand في الـ inventory system', 0],
            ['متوسط الـ waiting time اللي الـ simulation حسبته', 1],
            ['الـ lead time بتاع الـ orders', 0],
            ['الـ arrival times', 0]
          ] : [
            ['Time between arrivals at the queue', 0],
            ['Each customer\'s delay in the queue', 1],
            ['Service times', 0],
            ['Demand in the inventory system', 0],
            ['The average waiting time the simulation reports', 1],
            ['Lead time of the orders', 0],
            ['Arrival times', 0]
          ]} />
        `),

        // 7 · histograms
        page(html`
          <${H1}>${t('Step 2: what shape is it?', 'الخطوة 2: شكلها إيه؟')}</${H1}>
          <${Def}>${X('A <b>frequency distribution</b> or <b>histogram</b> is useful in determining the <b>shape</b> of a distribution.', 'الـ <b>frequency distribution</b> أو الـ <b>histogram</b> مفيد إننا نعرف بيه <b>شكل</b> الـ distribution.')}</${Def}>
          <${UL} items=${A ? [
            'عدد الـ class intervals بيعتمد على <b>عدد الـ observations</b> و<b>الـ dispersion</b> بتاع الـ data. العدد المقترح: <b>الجذر التربيعي لحجم الـ sample</b>، يعني <bdi dir="ltr">√n</bdi>.',
            'في الـ <b>continuous</b> data الـ histogram بيقابل الـ <b>PDF</b>، وفي الـ <b>discrete</b> بيقابل الـ <b>PMF</b>.',
            'لو الـ data points قليلة، <b>ادمج الـ cells اللي جنب بعض</b> عشان تشيل الشكل المسنن.',
            'الرسم: intervals عرضها متساوي (ومسموح مش متساوي)، وعدّ الـ frequency في كل واحد، وارسمها.'
          ] : [
            'The number of class intervals depends on the <b>number of observations</b> and the <b>dispersion</b> of the data. Suggested number: <b>the square root of the sample size</b>, √n.',
            'For <b>continuous</b> data the histogram corresponds to the <b>PDF</b>; for <b>discrete</b> data, to the <b>PMF</b>.',
            'With few data points, <b>combine adjacent cells</b> to remove the ragged look.',
            'To draw one: equal-width intervals (unequal is allowed), count the frequency in each, plot.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Too wide</b>: <b>coarse</b>. <b>Too narrow</b>: <b>ragged</b>. A sample of 64 suggests √64 = <b>8</b> intervals, not 64/5 or 32.', 'الـ intervals <b>الواسعة زيادة</b> بتدّي <b>coarse</b>، و<b>الضيقة زيادة</b> بتدّي <b>ragged</b>. وعينة فيها 64 قيمة يتقترح لها <bdi dir="ltr">√64 = 8</bdi> intervals، مش 32 ولا <bdi dir="ltr">64/5</bdi>.')}</p></${Box}>
        `, { sec: t('Histograms', 'الـ Histograms') }),

        // 8 · same data, three widths
        page(html`
          <${H2}>${t('Same data, three different stories', 'نفس الـ data، تلات حكايات مختلفة')}</${H2}>
          <${Fig} name="ms-in-hist-widths" />
          <${Hand} arrow="up">${t('the shape you see depends on the interval width', 'الشكل اللي بتشوفه بيعتمد على عرض الـ interval')}</${Hand}>
        `),

        // 9 · ragged, coarse, appropriate
        page(html`
          <${H2}>${t('Ragged, coarse, just right', 'مسنن، خشن، مظبوط')}</${H2}>
          <${Fig} name="ms-in-hist-cells" />
        `),

        // 10 · two examples
        page(html`
          <${H2}>${t('Two examples from the slides', 'مثالين من السلايدز')}</${H2}>
          <${H3c} en="1 · Cars at a crossing (slide 10)" ar="1 · عربيات عند تقاطع (سلايد 10)" A=${A} />
          <${P} small=${true}>${X('The number of vehicles arriving at an intersection between 7:00 and 7:05 am was counted on <b>100 random workdays</b>. The variable is <b>discrete</b>, and with ample data the histogram can have <b>a cell for each possible value</b>.',
            'اتعدّ عدد العربيات اللي بتوصل لتقاطع ما بين 7:00 و7:05 الصبح في <b>100 يوم شغل عشوائي</b>. الـ variable ده <b>discrete</b>، ولأن الـ data كتير ينفع الـ histogram يبقى فيه <b>cell لكل قيمة ممكنة</b>.')}</${P}>
          <${P} small=${true}>${X('(The notes say five working days over 20 weeks: also 100 periods.)', '(الـ notes بتقول 5 أيام شغل على مدار 20 أسبوع: برضه 100 period.)')}</${P}>
          <${H3c} en="2 · How long does a chip live? (slide 11)" ar="2 · الـ chip بتعيش قد إيه؟ (سلايد 11)" A=${A} />
          <${P} small=${true}>${X('Electronic components were life-tested at <b>1.5 times the nominal voltage</b>. Lifetime is <b>continuous</b>, so it is grouped in intervals of <b>3 days</b>.',
            'اتعمل life test لـ electronic components على <b>1.5 مرة الـ nominal voltage</b>. الـ lifetime ده <b>continuous</b>، فاتجمّع في intervals عرضها <b>3 أيام</b>.')}</${P}>
          <${P} small=${true}>${X('‡ Counting the 50 lifetimes in the notes gives <b>24, 9</b> in the first two cells (the table says 23, 10) and one chip each in 15–18 and 18–21 (table: 2 and 0). Same exponential-like shape.',
            '‡ لو عدّينا الـ 50 lifetime اللي في الـ notes، أول cellين فيهم <b>24 و9</b> (الجدول كاتب 23 و10)، وفيه chip واحدة في كل واحد من <bdi dir="ltr">15–18</bdi> و<bdi dir="ltr">18–21</bdi> (الجدول كاتب 2 و0). نفس الشكل الـ exponential.')}</${P}>
        `, { sec: t('Histogram examples', 'أمثلة الـ histogram') }),

        page(html`
          <${H2}>${t('Example 1: one cell for each value', 'مثال 1: cell لكل قيمة')}</${H2}>
          <${Fig} name="ms-in-vehicle-hist" />
        `),

        // 11 · chip figure
        page(html`
          <${H2}>${t('Example 2: chip life in 3-day intervals', 'مثال 2: عمر الـ chip في intervals كل 3 أيام')}</${H2}>
          <${Fig} name="ms-in-chip-hist" />
        `),

        // 12 · bins on normal data
        page(html`
          <${H2}>${t('One normal sample, six bin counts', 'عينة normal واحدة، ست أعداد bins')}</${H2}>
          <${Fig} name="ms-in-hist-bins" />
        `),

        // 13 · re-bin exercise
        page(html`
          <${Box} kind="pencil" title=${t('Re-bin it yourself', 'قسّمها إنت بنفسك')}><p className="hf-p small">${X('The 50 chip lifetimes from the notes. Pick an interval width and watch the histogram\'s story change. Every bar is counted from the data.', 'الـ 50 chip lifetime بتوع الـ notes. اختار عرض الـ interval واتفرج الحكاية بتتغير إزاي. كل bar متعدّ من الـ data نفسها.')}</p></${Box}>
          <${Rebin} />
        `),

        // 14 · scatter diagrams
        page(html`
          <${H1}>${t('Do two inputs move together?', 'الـ inputs بيتحركوا مع بعض؟')}</${H1}>
          <${Def}>${X('A <b>scatter diagram</b> is a <b>quality tool</b> that shows the <b>relationship between paired data</b>: random variable X = data 1 on the x-axis, Y = data 2 on the y-axis.',
            'الـ <b>scatter diagram</b> ده <b>quality tool</b> بيوري <b>العلاقة بين data متزوّجة (paired)</b>: الـ random variable اللي هو X يعني data 1 على الـ x‑axis، والـ Y يعني data 2 على الـ y‑axis.')}</${Def}>
          <${P} small=${true}>${X('For a <b>linear relationship</b>: <b>correlation</b> (how well the data line up), <b>slope</b> (the steepness), <b>direction</b> and the <b>Y intercept</b>.', 'في الـ <b>linear relationship</b>: الـ <b>correlation</b> (الـ data متصفّة قد إيه)، والـ <b>slope</b> (الميل)، والـ <b>direction</b>، والـ <b>Y intercept</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"A scatter diagram is…" <b>a graph showing x and y values</b>. Not a statistical test (those are chi-square and K-S), and "linear" or "curvilinear" are patterns it can show, not what it is.',
            'سؤال "الـ scatter diagram هو…" إجابته <b>graph بيوري قيم x وy</b>. مش statistical test (دول الـ chi‑square والـ K‑S)، وكلمة linear أو curvilinear دي patterns ممكن يوريها، مش تعريفه.')}</p></${Box}>
        `, { sec: t('Scatter diagrams', 'الـ Scatter diagrams') }),

        page(html`
          <${H2}>${t('Strong, moderate, none', 'قوي، متوسط، مفيش')}</${H2}>
          <${Fig} name="ms-in-scatter-corr" />
        `),

        // 15 · direction
        page(html`
          <${H2}>${t('Up or down: the direction', 'طالع ولا نازل: الـ direction')}</${H2}>
          <${Fig} name="ms-in-scatter-dir" />
        `),

        // 16 · families
        page(html`
          <${H1}>${t('Pick a family', 'اختار family')}</${H1}>
          <${P} small=${true}>${X('A family of distributions is selected from the <b>context</b> of the input variable and the <b>shape of the histogram</b>. Frequently met ones: <b>easier to analyze</b>: exponential, normal, Poisson; <b>difficult</b>: beta, gamma, Weibull.',
            'الـ family بتاعة الـ distributions بنختارها من <b>الـ context</b> بتاع الـ input variable ومن <b>شكل الـ histogram</b>. المشهورين: <b>الأسهل في التحليل</b> هما exponential وnormal وPoisson، و<b>الأصعب</b> هما beta وgamma وWeibull.')}</${P}>
          <${Hand} red=${true}>${t('gamma and Weibull give a wide array of shapes: that is why they are harder', 'الـ gamma والـ Weibull بيدّوا أشكال كتير جدًا: وعشان كده أصعب')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Number</b> of independent events in a fixed time: <b>Poisson</b>. <b>Time between</b> them: <b>exponential</b>. The exams love swapping the two.', 'الـ <b>عدد</b> بتاع events مستقلة في وقت ثابت يبقى <b>Poisson</b>، و<b>الوقت بينهم</b> يبقى <b>exponential</b>. الامتحانات بتحب تبدّلهم.')}</p></${Box}>
        `, { sec: t('Choosing a family', 'اختيار الـ family') }),

        page(html`
          <${H2}>${t('Easier and harder families', 'families أسهل وأصعب')}</${H2}>
          <${Fig} name="ms-in-families" />
        `),

        // 17 · physical basis
        page(html`
          <${H2}>${t('Let the physics choose (slide 18)', 'خلّي طبيعة الـ process تختار (سلايد 18)')}</${H2}>
          <${P} small=${true}>${t('Use the physical basis of a distribution as a guide:', 'استخدم الـ physical basis بتاع كل distribution كدليل:')}</${P}>
          <div className="hf-ms6-pb hf-in">${(A ? [
            ['Binomial', 'عدد النجاحات في n trials'],
            ['Neg. binomial', 'عدد الـ trials لحد ما نوصل لـ k نجاحات (وكمان الـ geometric)'],
            ['Poisson', 'عدد الـ events المستقلة في وقت أو مكان ثابت'],
            ['Normal', 'process عبارة عن <b>مجموع</b> component processes'],
            ['Lognormal', 'process عبارة عن <b>حاصل ضرب</b> component processes'],
            ['Exponential', 'الوقت <b>بين</b> events مستقلة، أو process time من غير ذاكرة (memoryless)'],
            ['Weibull', 'الـ time to failure بتاع الـ components'],
            ['Uniform', 'عدم يقين كامل (discrete أو continuous)'],
            ['Triangular', 'معروف بس الـ minimum والـ most likely والـ maximum'],
            ['Empirical', 'بيعيد الـ sampling من الـ data الحقيقية']
          ] : [
            ['Binomial', 'number of successes in n trials'],
            ['Neg. binomial', 'number of trials to achieve k successes (also geometric)'],
            ['Poisson', 'number of independent events in a fixed amount of time or space'],
            ['Normal', 'a process that is the <b>sum</b> of component processes'],
            ['Lognormal', 'a process that is the <b>product</b> of component processes'],
            ['Exponential', 'time <b>between</b> independent events, or a memoryless process time'],
            ['Weibull', 'time to failure for components'],
            ['Uniform', 'complete uncertainty (discrete or continuous)'],
            ['Triangular', 'only the minimum, most likely and maximum are known'],
            ['Empirical', 'resamples from the actual data collected']
          ]).map(([d, b], i) => html`<div key=${i}><b>${d}</b><span>${T(b)}</span></div>`)}</div>
        `),

        // 18 · match examples
        page(html`
          <${H2}>${t('Who models what? (the notes\' examples)', 'مين بيمثّل إيه؟ (أمثلة الـ notes)')}</${H2}>
          <${Match} id="fam" left=${['Binomial', 'Negative binomial', 'Poisson', 'Normal', 'Lognormal', 'Exponential', 'Weibull']}
            right=${A ? ['عمر الـ disk drive لحد ما يبوظ', 'الـ customers اللي بيوصلوا مطعم في ساعة', 'الـ chips البايظة في n chips', 'عائد استثمار', 'وقت التجميع: مجموع أوقات العمليات', 'الأوقات بين وصول customers كتير', 'الـ chips اللي نفحصها لحد 4 بايظين']
              : ['Time to failure of a disk drive', 'Customers arriving at a restaurant in 1 hour', 'Defective chips found in n chips', 'Rate of return on an investment', 'Assembly time: sum of the operation times', 'Times between arrivals of many customers', 'Chips inspected to find 4 defective']}
            answer=${[2, 6, 1, 4, 3, 5, 0]} />
        `),

        // 18b · other notes on families
        page(html`
          <${Dumb} qa=${A ? [
            ['والـ gamma بتاخد أنهي قيم؟', 'الـ gamma بتمثّل random variables <b>مش سالبة</b>، وتقدر تزحزحها بعيد عن الـ 0 بإنك <b>تزوّد constant</b>.'],
            ['الـ exponential والـ Weibull ليهم علاقة ببعض؟', 'آه: الـ <b>exponential حالة خاصة من الـ Weibull</b>.'],
            ['ولو مفيش data خالص؟', 'الـ <b>uniform</b> بيتستخدم كتير لما مفيش data، لأنه بيمثّل عدم يقين كامل.'],
            ['ولو مفيش ولا distribution نظرية لايقة؟', 'استخدم الـ <b>empirical</b>: بيعيد الـ sampling من الـ data الحقيقية.'],
            ['ليه الـ gamma والـ Weibull اسمهم "أصعب"؟', 'لأنهم بيدّوا <b>أشكال كتير جدًا</b> حسب الـ shape parameter، زي الـ β في الرسمة.']
          ] : [
            ['What values does the gamma take?', 'The gamma models <b>nonnegative</b> random variables; it can be shifted away from 0 by <b>adding a constant</b>.'],
            ['Are the exponential and the Weibull related?', 'Yes: the <b>exponential is a special case of the Weibull</b>.'],
            ['And with no data at all?', 'The <b>uniform</b> is often used when there are no data: it models complete uncertainty.'],
            ['And when no theoretical distribution fits?', 'Use the <b>empirical</b> distribution: it resamples the actual data.'],
            ['Why are gamma and Weibull the "difficult" ones?', 'They give a <b>wide array of shapes</b>, depending on the shape parameter (the β in the figure).']
          ]} />
        `),

        // 19 · Q-Q plots
        page(html`
          <${H1}>${t('Q-Q plots: a straight-line test', 'الـ Q‑Q plot: اختبار الخط المستقيم')}</${H1}>
          <${P} small=${true}>${X('A histogram suggests a family, but it is <b>not preferred</b> for judging the fit of a chosen distribution. The notes\' tool for that is the <b>quantile-quantile (Q-Q) plot</b>.',
            'الـ histogram بيقترح family، بس <b>مش هو المفضّل</b> عشان نحكم على الـ fit بتاع distribution اخترناها. الأداة اللي في الـ notes لكده هي الـ <b>quantile‑quantile (Q‑Q) plot</b>.')}</${P}>
          <${Def}>${X('If X has CDF F, the <b>q-quantile</b> of X is the γ with F(γ) = P(X ≤ γ) = q, 0 < q < 1, so γ = F⁻¹(q).', 'لو X الـ CDF بتاعه F، يبقى الـ <b>q‑quantile</b> هو الـ γ اللي:<span class="ltr">F(γ) = P(X ≤ γ) = q,   0 < q < 1,   γ = F⁻¹(q)</span>')}</${Def}>
          <${P} small=${true}>${X('Sort the sample y₁ ≤ y₂ ≤ … ≤ yₙ (rank j). Then yⱼ estimates the <b>(j − ½)/n quantile</b>:', 'رتّب العينة من الصغير للكبير، والـ rank هو j. يبقى الـ yⱼ بيقدّر الـ <b>quantile</b> رقم <bdi dir="ltr">(j − ½)/n</bdi>:')}</${P}>
          <${Code} lines=${['yⱼ ≈ F⁻¹[(j − ½) / n]', ['plot yⱼ against F⁻¹[(j − ½) / n]', t('← the Q-Q plot', 'ده الـ Q‑Q plot')]]} />
          <${UL} items=${A ? ['لو F من family مناسبة، النقط تقريبًا على <b>خط مستقيم</b>.', 'ولو الـ parameters كمان مناسبة، الخط ده <b>slope بتاعه 1</b>.', 'لو الـ distribution مش مناسبة، النقط <b>بتبعد عن الخط المستقيم</b>.']
            : ['If F is from an appropriate family, the points lie roughly on a <b>straight line</b>.', 'If its parameters fit too, the line has <b>slope 1</b>.', 'If the distribution is wrong, the points <b>deviate from a straight line</b>.']} />
        `, { sec: t('Q-Q plots', 'الـ Q-Q plots') }),

        // 20 · Q-Q figure
        page(html`
          <${H2}>${t('Example 6.3: the door-installing robot', 'مثال 6.3: الروبوت اللي بيركّب أبواب')}</${H2}>
          <${Fig} name="ms-in-qq" />
        `),

        // 21 · reading the plot
        page(html`
          <${H2}>${t('How straight is straight?', 'مستقيم يعني قد إيه؟')}</${H2}>
          <${UL} items=${A ? [
            'النقط <b>عمرها ما هتيجي بالظبط</b> على خط مستقيم.',
            'القيم المرتبة <b>مش independent</b> (لأنها متترتبة)، فالنقط بتتبعتر حوالين الخط.',
            'الـ variance عند الأطراف أكبر من النص، فالفروق الكبيرة عند الأطراف مقبولة: <b>المهم إن النص يبقى مستقيم</b>.'
          ] : [
            'The points will <b>never</b> fall exactly on a straight line.',
            'The ordered values are <b>not independent</b> (they are ranked), so the points scatter about the line.',
            'The extremes have higher variance than the middle, so bigger gaps there are acceptable: <b>linearity in the middle matters more</b>.'
          ]} />
          <${P} small=${true}>${X('In Example 6.3 the 20 times have sample mean <b>99.99 s</b> and sample variance <b>(0.2832)² s²</b>; the plot is close to a straight line, supporting a <b>normal</b> model.', 'في مثال 6.3 الـ 20 وقت الـ sample mean بتاعهم <b>99.99 ثانية</b> والـ sample variance <bdi dir="ltr">(0.2832)² s²</bdi>، والـ plot قريب من خط مستقيم، فده بيدعم model <b>normal</b>.')}</${P}>
          <${P} small=${true}>${X('‡ In the notes\' Table 6.3 the column headed F⁻¹((j − ½)/20) actually lists (j − ½)/20 rounded (0.03, 0.08, …, 0.98). The real normal quantiles are about 99.43, 99.58, 99.66, …, 100.40, 100.55.',
            '‡ في Table 6.3 في الـ notes، العمود اللي عنوانه الـ quantile فيه في الحقيقة الـ <bdi dir="ltr">(j − ½)/20</bdi> متقرّبة (0.03 و0.08 لحد 0.98). الـ normal quantiles الحقيقية تقريبًا:<span class="ltr">99.43, 99.58, 99.66, …, 100.40, 100.55</span>')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Your Q-Q plot is a perfect straight line, but its slope is 2. Is the family wrong, or the parameters?', 'الـ Q‑Q plot بتاعك خط مستقيم مظبوط، بس الـ slope بتاعه 2. الغلط في الـ family ولا في الـ parameters؟')}</p></${Box}>
        `),

        // 22 · parameter estimation formulas
        page(html`
          <${H1}>${t('Step 3: put numbers on it', 'الخطوة 3: حط أرقام')}</${H1}>
          <${P} small=${true}>${X('After choosing a family comes <b>parameter estimation</b>, using the <b>sample mean</b> and <b>sample variance</b>:', 'بعد ما تختار الـ family ييجي الـ <b>parameter estimation</b>، بالـ <b>sample mean</b> والـ <b>sample variance</b>:')}</${P}>
          <${Code} lines=${[['X̄ = Σ Xᵢ / n', t('← raw data', 'الـ raw data')], 'S² = (Σ Xᵢ² − n X̄²) / (n − 1)', ['X̄ = Σ fⱼXⱼ / n', t('← grouped discrete', 'الـ grouped discrete')], 'S² = (Σ fⱼXⱼ² − n X̄²) / (n − 1)', ['X̄ ≈ Σ fⱼmⱼ / n', t('← class intervals', 'الـ class intervals')], 'S² ≈ (Σ fⱼmⱼ² − n X̄²) / (n − 1)']} />
          <${P} small=${true}>${X('‡ Slide 20 sums the grouped data from j = 1 to n; it should run over the <b>k distinct values</b> (Σfⱼ = n). Slide 21 sums S² to n; it should run over the <b>c class intervals</b>.', '‡ سلايد 20 بيجمع الـ grouped data من 1 لـ n، والصح على الـ <b>k قيم المختلفة</b> (ومجموع الـ fⱼ هو n). وسلايد 21 بيجمع الـ S² لحد n، والصح على الـ <b>c class intervals</b>.')}</${P}>
          <${Grow} />
          <${Def}>${X('A <b>parameter</b> is an unknown <b>constant</b>; an <b>estimator</b> is a <b>statistic</b>.', 'الـ <b>parameter</b> ده <b>constant</b> مش معروف، أما الـ <b>estimator</b> فهو <b>statistic</b>.')}</${Def}>
        `, { sec: t('Parameter estimation', 'تقدير الـ parameters') }),

        // 23 · vehicle estimates figure
        page(html`
          <${H2}>${t('The cars, in numbers (slide 22)', 'العربيات بالأرقام (سلايد 22)')}</${H2}>
          <${Fig} name="ms-in-vehicle-est" />
        `),

        // 24 · estimator drill
        page(html`
          <${Box} kind="pencil" title=${t('Be the estimator', 'خليك إنت الـ estimator')}><p className="hf-p small">${t('Pick each step\'s value; a wrong pick names the mistake.', 'اختار قيمة كل خطوة، ولو غلطت هيقولك الغلطة إيه.')}</p></${Box}>
          <${Drill} id="est" probs=${EST} ans=${EST_ANS} />
        `, { sec: t('Exercises: estimation', 'تمرين: التقدير') }),

        // 25 · MLE table
        page(html`
          <${H2}>${t('The suggested estimators (slide 23)', 'الـ estimators المقترحة (سلايد 23)')}</${H2}>
          <${P} small=${true}>${X('For the distributions used most in simulation, the suggested estimators are <b>maximum-likelihood estimators</b> (MLE):', 'للـ distributions اللي بتتستخدم كتير في الـ simulation، الـ estimators المقترحة هي <b>maximum‑likelihood estimators</b> (MLE):')}</${P}>
          ${TB('1.1fr .7fr 1.6fr', [['Distribution', 'Parameter', 'Estimator'], ['Poisson', 'α', 'α̂ = X̄'], ['Exponential', 'λ', 'λ̂ = 1 / X̄'], ['Gamma', 'β, θ', 'θ̂ = 1 / X̄'], ['Normal', 'μ, σ²', 'μ̂ = X̄, σ̂² = S²'], ['Lognormal', 'μ, σ²', 'μ̂ = X̄, σ̂² = S² of ln X']], true)}
          <${Hand} red=${true}>${X('lognormal: take <b>ln</b> of the data first, then the mean and variance of the logs', 'الـ lognormal: خد الـ <b>ln</b> للـ data الأول، وبعدين الـ mean والـ variance بتوع الـ logs')}</${Hand}>
          <${P} small=${true}>${X('The notes mark σ̂² = S² for the normal as the <b>unbiased</b> estimator. ‡ For the gamma the slide gives only θ̂ = 1/X̄; the notes\' Table 6.4 also lists the shape β̂, with no formula.', 'الـ notes بتقول إن <bdi dir="ltr">σ̂² = S²</bdi> في الـ normal هو الـ <b>unbiased</b> estimator. ‡ في الـ gamma السلايد بتدي <bdi dir="ltr">θ̂ = 1/X̄</bdi> بس، والـ Table 6.4 في الـ notes بتذكر كمان الـ shape اللي هو β̂، من غير معادلة.')}</${P}>
        `, { sec: t('Suggested estimators', 'الـ estimators المقترحة') }),

        // 25b · traps
        page(html`
          <${Dumb} qa=${A ? [['لو ده Poisson، مش المفروض الـ mean يساوي الـ variance؟', 'نظريًا آه، <bdi dir="ltr">μ = σ² = λ</bdi>. بس الـ 3.64 والـ 7.63 مش زي بعض لأن <b>كل estimator هو random variable</b>، ومش مثالي. ‡ السلايد بتقول الجدول في سلايد 11، وهو في سلايد 10.']]
            : [['If it\'s Poisson, shouldn\'t the mean equal the variance?', 'In theory, μ = σ² = λ. But 3.64 ≠ 7.63 because <b>each estimator is a random variable</b>: it is not perfect. ‡ Slide 22 says the table is on slide 11; it is on slide 10.']]} />
          <${Talk} who="dice">${X('Exponential trap: λ̂ is <b>1/X̄</b>. Chips with X̄ = 11.89 days give λ̂ = <b>0.084</b>, not 11.89.', 'فخ الـ exponential: الـ λ̂ هي <b><bdi dir="ltr">1/X̄</bdi></b>. الـ chips اللي الـ X̄ بتاعها 11.89 يوم تدّي <bdi dir="ltr">λ̂ = 0.084</bdi>، مش 11.89.')}</${Talk}>
          <${Grow} />
          <${Box} kind="exam"><p className="hf-p small">${X('Asked as a 5-mark written question on the <b>2024/25 final</b>: "Estimate the parameters of a lognormal model of this data." Answer: μ̂ = 2.25, σ̂² ≈ 1.3, the mean and variance of <b>ln X</b>, not of X.',
            'السؤال ده جه written بـ 5 درجات في <b>فاينال 2024/25</b>، والمطلوب تقدّر الـ parameters بتاعة lognormal model. الإجابة <bdi dir="ltr">μ̂ = 2.25</bdi> و<bdi dir="ltr">σ̂² ≈ 1.3</bdi>، ودول الـ mean والـ variance بتوع الـ <b>ln X</b> مش الـ X.')}</p></${Box}>
        `),

        // 26 · lognormal example
        page(html`
          <${H2}>${t('Example 6.4: a lognormal portfolio', 'مثال 6.4: محفظة lognormal')}</${H2}>
          <${Fig} name="ms-in-lognormal" />
        `),

        // 27 · goodness of fit
        page(html`
          <${H1}>${t('Step 4: does it really fit?', 'الخطوة 4: هي فعلًا لايقة؟')}</${H1}>
          <${P} small=${true}>${X('Run a <b>hypothesis test</b> on the input distribution: the <b>Kolmogorov-Smirnov test</b> or the <b>chi-square test</b>. But remember: <b>no single correct distribution exists</b> in a real application.',
            'اعمل <b>hypothesis test</b> على الـ distribution بتاعة الـ input: إما الـ <b>Kolmogorov‑Smirnov test</b> أو الـ <b>chi‑square test</b>. بس افتكر إن <b>مفيش distribution واحدة صح</b> في أي تطبيق حقيقي.')}</${P}>
          <${Talk} who="lens">${X('Hand me <b>very little data</b> and I\'m unlikely to reject <b>any</b> candidate.', 'لو إديتني <b>data قليلة جدًا</b> غالبًا مش هرفض <b>ولا</b> candidate.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Hand me <b>a lot of data</b> and I\'ll probably reject <b>all</b> of them.', 'ولو إديتني <b>data كتير</b> غالبًا هرفضهم <b>كلهم</b>.')}</${Talk}>
          <${P} small=${true}>${X('And be aware of the two ways a decision can go wrong:', 'وخلّي بالك من الطريقتين اللي القرار ممكن يغلط بيهم:')}</${P}>
          ${TB('1fr 1.3fr 1.3fr', A ? [['القرار', 'H₀ صح', 'H₀ غلط'], ['نقبل H₀', 'صح', 'خطأ <b>Type II</b> (β)، يعني false negative'], ['نرفض H₀', 'خطأ <b>Type I</b> (α)، يعني false positive', 'صح']]
            : [['Decision', 'H₀ true', 'H₀ false'], ['Accept H₀', 'Correct', '<b>Type II</b> (β): false negative'], ['Reject H₀', '<b>Type I</b> (α): false positive', 'Correct']])}
        `, { sec: t('Goodness of fit', 'الـ Goodness of fit') }),

        // 28 · errors figure
        page(html`
          <${H2}>${t('Tap a decision', 'دوس على قرار')}</${H2}>
          <${Fig} name="ms-in-errors" />
          <${Box} kind="watch"><p className="hf-p small">${X('Type <b>I</b> = error of the <b>first</b> kind = <b>α</b> = rejecting a <b>true</b> H₀. Type <b>II</b> = second kind = <b>β</b> = keeping a <b>false</b> H₀.', 'الـ Type <b>I</b> هو خطأ النوع <b>الأول</b>، يعني <b>α</b>، يعني نرفض H₀ وهي <b>صح</b>. والـ Type <b>II</b> هو النوع التاني، يعني <b>β</b>، يعني نحتفظ بـ H₀ وهي <b>غلط</b>.')}</p></${Box}>
        `),

        // 29 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: the Chi-square test and the K-S test argue about who judges a fit better.', 'قعدة الليلة: الـ Chi‑square test والـ K‑S test بيتخانقوا مين بيحكم على الـ fit أحسن.')} />
          <${Chat} names=${[t('Chi-square', 'الـ Chi‑square'), t('K-S', 'الـ K‑S')]} lines=${A ? [
            [0, 'أنا بسيطة: <b>بقارن الـ histogram</b> بشكل الـ density أو الـ mass function المرشّحة.'],
            [1, 'وأنا <b>بحوّل فكرة الـ Q‑Q plot لـ test رسمي</b>: بقارن الـ CDF بالـ <b>empirical CDF</b>، وباخد <b>أكبر فرق</b>.'],
            [0, 'وأنا بشتغل مع الـ <b>discrete والـ continuous</b> الاتنين.'],
            [1, 'وأنا مع أي continuous. والـ discrete؟ ليه الـ gap test.'],
            [0, 'أنا <b>valid في الـ samples الكبيرة</b> لما الـ parameters تتقدّر بالـ <b>maximum likelihood</b>.']
          ] : [
            [0, "I keep it simple: I <b>compare the histogram</b> with the shape of the candidate density or mass function."],
            [1, "I <b>formalize the idea behind a Q-Q plot</b>: I compare the CDF with the <b>empirical CDF</b> and take the <b>maximum difference</b>."],
            [0, "I work for <b>discrete and continuous</b> assumptions."],
            [1, "I take any continuous one. Discrete ones? That's the gap test's job."],
            [0, "I'm <b>valid for large samples</b> when the parameters are estimated by <b>maximum likelihood</b>."]
          ]} />
        `, { sec: t('Chi-square vs K-S', 'الـ Chi-square والـ K-S') }),

        // 29b · fireside, part 2
        page(html`
          <${Chat} names=${[t('Chi-square', 'الـ Chi‑square'), t('K-S', 'الـ K‑S')]} start=${1} lines=${A ? [
            [1, 'وأنا <b>أقوى (more powerful)</b>، خصوصًا لما الـ <b>sample صغيرة</b> و<b>مفيش parameters</b> اتقدّرت.'],
            [0, 'ولو اتقدّرت؟ الـ critical values بتاعتك بتبقى <b>biased وكبيرة زيادة</b>.'],
            [1, 'فبابقى <b>more conservative</b>: الـ Type I error أصغر من المحدد. وإنتي؟ غيّري الـ grouping وممكن تقبلي اللي كنتي رفضتيه.'],
            [0, 'عشان كده بطلب كل <bdi dir="ltr">Eᵢ ≥ 5</bdi> وجدول للـ k. ماشي، مفيش حد كامل.']
          ] : [
            [1, "And I'm <b>more powerful</b>, especially when the <b>sample is small</b> and <b>no parameters</b> were estimated."],
            [0, "And when they were? Your critical values come out <b>biased, too large</b>."],
            [1, "So I'm <b>more conservative</b>: a smaller Type I error than specified. And you? Group the data another way and you may accept what you rejected."],
            [0, "That's why I insist on every Eᵢ ≥ 5 and a table for k. Fine, nobody's perfect."]
          ]} />
          <${Grow} />
          <${Talk} who="lens">${X('Both of them agree on one thing: with lots of data, every candidate gets rejected.', 'الاتنين متفقين على حاجة واحدة: لو الـ data كتير، كل الـ candidates هتترفض.')}</${Talk}>
        `),

        // 30 · chi-square test
        page(html`
          <${H1}>${t('The chi-square test', 'الـ chi-square test')}</${H1}>
          <${P} small=${true}>${X('Arrange the n observations into <b>k class intervals</b>. Oᵢ is the observed count in class i, Eᵢ = n·pᵢ the expected one (pᵢ = the theoretical probability of class i).', 'رتّب الـ n observations في <b>k class intervals</b>. الـ Oᵢ هو العدد المتشاف في الـ class رقم i، والـ Eᵢ هو المتوقع ويساوي <bdi dir="ltr">n·pᵢ</bdi> (والـ pᵢ هي الـ probability النظرية بتاعة الـ class).')}</${P}>
          <${Code} lines=${['χ₀² = Σ (Oᵢ − Eᵢ)² / Eᵢ,   Eᵢ = n·pᵢ', ['df = k − s − 1', t('← s = parameters estimated', 'الـ s هو عدد الـ parameters المتقدّرة')], ['minimum Eᵢ = 5', t('← suggested', 'المقترح')]]} />
          <${UL} items=${A ? [
            'الـ <b>H₀</b>: الـ X ماشي على الـ distribution المفترضة بالـ parameters المتقدّرة. والـ <b>H₁</b>: مش ماشي عليها.',
            'نقبل H₀ لو <bdi dir="ltr">χ₀² ≤ χ²α,k−s−1</bdi>، ونرفضها لو <bdi dir="ltr">χ₀² > χ²α,k−s−1</bdi>.',
            'الـ critical values من Table A.6، مثلًا:<span class="ltr">χ²0.05,4 = 9.49,   χ²0.05,5 = 11.07,   χ²0.05,6 = 12.59</span>'
          ] : [
            '<b>H₀</b>: X conforms to the assumed distribution with the estimated parameter(s). <b>H₁</b>: it does not.',
            'Accept H₀ if χ₀² ≤ χ²α,k−s−1; reject if χ₀² > χ²α,k−s−1.',
            'Critical values (Table A.6): χ²0.05,4 = 9.49, χ²0.05,5 = 11.07, χ²0.05,6 = 12.59.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A normal with μ and σ² <b>both</b> estimated and k = 10 cells has df = 10 − <b>2</b> − 1 = <b>7</b>, not 9.', 'الـ normal اللي الـ μ والـ σ² <b>الاتنين</b> متقدّرين ومعاه 10 cells يبقى الـ df بتاعه <bdi dir="ltr">10 − 2 − 1 = 7</bdi>، مش 9.')}</p></${Box}>
        `, { sec: t('Chi-square test', 'الـ Chi-square test') }),

        // 31 · discrete vs continuous, k
        page(html`
          <${H2}>${t('Where pᵢ comes from, and how many cells', 'الـ pᵢ جاية منين، وكام cell')}</${H2}>
          <${UL} items=${A ? [
            'في الـ <b>discrete</b>: كل قيمة class لوحدها إلا لو محتاجين ندمج، و:<span class="ltr">pᵢ = p(xᵢ) = P(X = xᵢ)</span>',
            'لو فيه Eᵢ صغيرة: ادمجها مع اللي جنبها، وادمج الـ Oᵢ كمان، و<b>قلّل k بواحد مع كل cell بتدمجها</b>.',
            'في الـ <b>continuous</b> (و aᵢ₋₁ و aᵢ أطراف الـ interval):<span class="ltr">pᵢ = ∫ f(x) dx over [aᵢ₋₁, aᵢ) = F(aᵢ) − F(aᵢ₋₁)</span>'
          ] : [
            '<b>Discrete</b>: each value is its own class unless combining is needed, with pᵢ = p(xᵢ) = P(X = xᵢ).',
            'An Eᵢ too small? Combine it with its neighbours, combine their Oᵢ too, and <b>reduce k by one for each cell combined</b>.',
            '<b>Continuous</b>: pᵢ = ∫ f(x) dx over [aᵢ₋₁, aᵢ) = F(aᵢ) − F(aᵢ₋₁), with aᵢ₋₁ and aᵢ the interval\'s endpoints.'
          ]} />
          <${P} small=${true}>${t('For continuous data, k must be chosen (slide 29):', 'في الـ continuous لازم تختار الـ k (سلايد 29):')}</${P}>
          ${TB('1fr 1.8fr', A ? [['حجم الـ sample', 'عدد الـ class intervals'], ['20', 'متستخدمش الـ chi‑square'], ['50', 'من 5 لـ 10'], ['100', 'من 10 لـ 20'], ['<bdi dir="ltr">> 100</bdi>', 'من <bdi dir="ltr">√n</bdi> لـ <bdi dir="ltr">n/5</bdi>']]
            : [['Sample size n', 'Class intervals k'], ['20', 'Do not use the chi-square test'], ['50', '5 to 10'], ['100', '10 to 20'], ['> 100', '√n to n/5']])}
          <${Hand} red=${true}>${t('Caution (slide 29): a different grouping, i.e. k, can change the result.', 'تحذير (سلايد 29): لو غيّرت الـ grouping، يعني الـ k، النتيجة ممكن تتغير.')}</${Hand}>
        `),

        // 32 · chi-square Poisson figure
        page(html`
          <${H2}>${t('Are the cars Poisson? (slide 30)', 'العربيات Poisson؟ (سلايد 30)')}</${H2}>
          <${Fig} name="ms-in-chisq-poisson" />
        `),

        // 33 · rounding note + dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه دمجنا x بـ 0 مع 1، ومن 7 لحد آخر الجدول؟', 'لأن الحد الأدنى المقترح <bdi dir="ltr">Eᵢ = 5</bdi>. الـ E عند الـ 0 بـ 2.6، ومن 7 وطالع 4.4 و2.0 و0.8 و0.3 و0.1. بعد الدمج بقوا <b>7 cells</b>.'],
            ['جمعت الأرقام وطلعت 27.69 مش 27.68!', 'عندك حق. ‡ آخر خانة <bdi dir="ltr">(17 − 7.6)²/7.6 = 88.36/7.6 = 11.63</bdi> مش 11.62، فالمجموع 27.69. والقرار هو هو: أكبر بكتير من 11.07، فنرفض.'],
            ['الـ O عند x بـ 4 و5 مكتوبة 19 و6!', '‡ دي غلطة في سلايد 30. الـ data بتقول <b>10 و8</b>، ودول بس اللي مجموعهم 100 وبيدّوا الـ 4.41 والـ 2.57 اللي في السلايد. والسلايد بتكتب الـ critical بـ 11.1، يعني 11.07 متقرّبة.'],
            ['يعني العربيات مش Poisson خالص؟', 'يعني مش Poisson <b>بـ <bdi dir="ltr">α = 3.64</bdi></b> عند <bdi dir="ltr">α = 0.05</bdi>. ده اللي الـ H₀ كانت بتقوله.']
          ] : [
            ['Why combine x = 0 with 1, and 7 with everything above?', 'The suggested minimum is Eᵢ = 5. E is 2.6 at 0, and 4.4, 2.0, 0.8, 0.3, 0.1 from 7 up. After combining there are <b>7 cells</b>.'],
            ['I added the terms and got 27.69, not 27.68!', 'You\'re right. ‡ The last term is (17 − 7.6)²/7.6 = 88.36/7.6 = <b>11.63</b>, not 11.62, so the total is 27.69. The decision is the same: far above 11.07, reject.'],
            ['The O column says 19 and 6 for x = 4 and 5!', '‡ A slip on slide 30. The data give <b>10 and 8</b>, the only values that total 100 and give the slide\'s 4.41 and 2.57. (Its 11.1 is 11.07 rounded.)'],
            ['So the cars are not Poisson at all?', 'They are not Poisson <b>with α = 3.64</b> at the 0.05 level. That is exactly what H₀ claimed.']
          ]} />
        `),

        // 34 · equal probabilities
        page(html`
          <${H1}>${t('Equal probability, not equal width', 'probability متساوية، مش عرض متساوي')}</${H1}>
          <${P} small=${true}>${X('For a <b>continuous</b> assumption the notes use class intervals <b>equal in probability</b>: pᵢ = 1/k, so Eᵢ = n/k ≥ 5, which means <b>k ≤ n/5</b>. (Easy for normal, exponential, Weibull; the gamma needs numerical integration.)',
            'في الافتراض الـ <b>continuous</b> الـ notes بتستخدم class intervals <b>متساوية في الـ probability</b>: يعني <bdi dir="ltr">pᵢ = 1/k</bdi>، فالـ <bdi dir="ltr">Eᵢ = n/k ≥ 5</bdi>، يعني <b><bdi dir="ltr">k ≤ n/5</bdi></b>. (سهلة في الـ normal والـ exponential والـ Weibull، والـ gamma محتاجة numerical integration.)')}</${P}>
          <${Def}>${X('<b>Example 6.6</b>: the 50 chip lifetimes. λ̂ = 1/X̄ = 1/11.89 = <b>0.084</b>. k ≤ 10; choose <b>k = 8</b>, p = 0.125, Eᵢ = 50/8 = <b>6.25</b>.', 'الـ <b>مثال 6.6</b>: الـ 50 chip lifetime. الـ <bdi dir="ltr">λ̂ = 1/11.89 = 0.084</bdi>، والـ k لازم تبقى 10 أو أقل، فاخترنا <b><bdi dir="ltr">k = 8</bdi></b> و<bdi dir="ltr">p = 0.125</bdi>، والـ <bdi dir="ltr">Eᵢ = 50/8 = 6.25</bdi>.')}</${Def}>
        `, { sec: t('Equal-probability intervals', 'intervals متساوية في الـ probability') }),

        // 34b · endpoints
        page(html`
          <${H2}>${t('Where the 8 intervals start and end', 'الـ 8 intervals بيبدأوا ويخلصوا فين')}</${H2}>
          <${P} small=${true}>${X('The endpoints solve F(aᵢ) = 1 − e^(−λaᵢ) = i·p:', 'الأطراف بتطلع من حل المعادلة دي:<span class="ltr">F(aᵢ) = 1 − e^(−λaᵢ) = i·p</span>')}</${P}>
          <${Code} lines=${['aᵢ = −(1/λ) ln(1 − i·p),  i = 0 … k', 'a₁ = −(1/0.084) ln(0.875) = 1.590', 'a₂ = −(1/0.084) ln(0.750) = 3.425', 'a₃ … a₇ = 5.595, 8.252, 11.677,', '          16.503, 24.755', ['a₀ = 0, a₈ = ∞']]} />
          <${P} small=${true}>${X('‡ Table 6.7 gives the third cell (3 − 6.25)²/6.25 as 0.81 and the total as 38.72. Correct: <b>1.69</b> and <b>39.60</b>. Still far above 12.6: the exponential with λ = 0.084 is <b>rejected</b>.', '‡ Table 6.7 كاتب الخانة التالتة 0.81 والمجموع 38.72. الصح <b>1.69</b> و<b>39.60</b>. ولسه أكبر بكتير من 12.6، فالـ exponential بـ <bdi dir="ltr">λ = 0.084</bdi> <b>مرفوض</b>.')}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${t('df = 8 − 1 − 1 = 6, and χ²0.05,6 = 12.6', 'الـ df بـ 6، والـ critical بـ 12.6')}</${Hand}>
        `),

        // 35 · equal-probability figure
        page(html`
          <${H2}>${t('Count, compare, reject', 'عِدّ، قارن، ارفض')}</${H2}>
          <${Fig} name="ms-in-chisq-exp" />
        `),

        // 36 · test drill
        page(html`
          <${Box} kind="pencil" title=${t('Be the tester', 'خليك إنت الـ tester')}><p className="hf-p small">${t('Two chi-square tests from the lecture, one practice case and the K-S example. Step by step to a decision at α = 0.05.', 'اتنين chi‑square tests من المحاضرة، وحالة تدريب، ومثال الـ K‑S. خطوة خطوة لحد القرار عند 0.05.')}</p></${Box}>
          <${Drill} id="tst" probs=${TEST} ans=${TEST_ANS} />
        `, { sec: t('Exercises: testing', 'تمرين: الـ tests') }),

        // 37 · K-S test
        page(html`
          <${H1}>${t('The Kolmogorov-Smirnov test', 'الـ Kolmogorov-Smirnov test')}</${H1}>
          <${P} small=${true}>${X('It compares the hypothesized continuous CDF F(x) with the <b>empirical CDF</b> Sɴ(x) of the N observations, through the <b>maximum difference</b>:', 'بيقارن الـ CDF الـ continuous المفترضة <bdi dir="ltr">F(x)</bdi> بالـ <b>empirical CDF</b> بتاعة الـ N observations، عن طريق <b>أكبر فرق</b>:')}</${P}>
          <${Code} lines=${['D = max | F(x) − Sɴ(x) |', 'D⁺ = max (i/N − R₍ᵢ₎)', 'D⁻ = max (R₍ᵢ₎ − (i − 1)/N)', ['D = max(D⁺, D⁻)', t('← do not reject H₀ if D < Dα', 'منرفضش H₀ لو D أصغر من Dα')]]} />
          <${UL} items=${A ? ['أي افتراض <b>continuous</b> ينفع يتختبر بالـ K‑S، والـ discrete بالـ gap test.', 'الـ K‑S <b>أقوى (more powerful)</b>، ومفيد خصوصًا لما الـ <b>sample صغيرة</b> و<b>مفيش parameters</b> اتقدّرت من الـ data.'] : ['Any <b>continuous</b> assumption can be tested with K-S; discrete ones with the gap test.', 'It is <b>more powerful</b>, particularly useful when <b>samples are small</b> and <b>no parameters</b> were estimated from the data.']} />
        `, { sec: t('K-S test', 'الـ K-S test') }),

        // 37b · critical values
        page(html`
          <${H2}>${t('Critical values (Table A.8)', 'الـ critical values (Table A.8)')}</${H2}>
          ${TB('1fr 1fr 1fr 1.3fr', [['N', '5', '10', '20'], ['D0.05', '0.565', '0.410', '0.294']], true)}
          ${TB('1fr 1fr 1fr 1fr', [['N > 35', 'D0.10', 'D0.05', 'D0.01'], ['', '1.22/√N', '1.36/√N', '1.63/√N']], true)}
          <${Box} kind="watch"><p className="hf-p small">${X('With <b>estimated parameters</b> the critical values are biased, <b>too large</b>, so the test is <b>more conservative</b>: a <b>smaller</b> Type I error than specified. And 1.36/√N is only for N > 35: for N = 10 use the table\'s 0.410, not 0.430.',
            'لو فيه <b>parameters متقدّرة</b>، الـ critical values بتبقى biased و<b>كبيرة زيادة</b>، فالـ test بيبقى <b>more conservative</b>: الـ Type I error <b>أصغر</b> من المحدد. والـ <bdi dir="ltr">1.36/√N</bdi> للـ N الأكبر من 35 بس: لو N بـ 10 استخدم 0.410 بتاعة الجدول، مش 0.430.')}</p></${Box}>
          <${Grow} />
          <${Dumb} qa=${A ? [['الـ K‑S فيه test شبهه؟', 'آه، الـ <b>Anderson‑Darling test</b>، وبرضه مبني على الفرق بين الـ empirical CDF والـ fitted CDF.']]
            : [['Is there a test like K-S?', 'Yes, the <b>Anderson-Darling test</b>, also based on the difference between the empirical CDF and the fitted CDF.']]} />
        `),

        // 38 · Example 6.7 setup
        page(html`
          <${H2}>${t('Example 6.7: a clever trick', 'مثال 6.7: حركة ذكية')}</${H2}>
          <${P} small=${true}>${X('Interarrival times were collected over <b>T = 100</b> minutes. H₀: they are <b>exponential</b>; H₁: they are not.', 'اتجمعت interarrival times على مدار <bdi dir="ltr">T = 100</bdi> دقيقة. الـ H₀: هي <b>exponential</b>، والـ H₁: مش كده.')}</${P}>
          <${Talk} who="clock">${X('If the gaps between arrivals are exponential, the <b>arrival times</b> themselves are <b>uniform on (0, T)</b>.', 'لو الفواصل بين الوصول exponential، يبقى الـ <b>arrival times</b> نفسها <b>uniform على <bdi dir="ltr">(0, T)</bdi></b>.')}</${Talk}>
          <${UL} items=${A ? ['اجمع الـ interarrival times عشان تطلع الـ arrival times: <bdi dir="ltr">T₁, T₁ + T₂, …</bdi>', 'اقسم على T عشان تبقى على <bdi dir="ltr">(0, 1)</bdi>: يعني 0.0044 و0.0097 و0.0301 لحد 0.9744.', 'اعمل K‑S test للـ uniformity على الـ 50 نقطة.']
            : ['Add the interarrival times to get arrival times T₁, T₁ + T₂, …', 'Divide by T to normalize them to (0, 1): 0.0044, 0.0097, 0.0301, …, 0.9744.', 'Apply the K-S test for uniformity to the 50 points.']} />
          <${Def}>${X('D⁺ = <b>0.1054</b> (at i = 24: 0.48 − 0.3746), D⁻ = 0.0080, so D = <b>0.1054</b> < D0.05 = 1.36/√50 = <b>0.1923</b>: H₀ is <b>not rejected</b>.', 'الـ <bdi dir="ltr">D⁺ = 0.1054</bdi> (عند <bdi dir="ltr">i = 24</bdi>)، والـ <bdi dir="ltr">D⁻ = 0.0080</bdi>، يبقى الـ D بـ <b>0.1054</b> أصغر من<span class="ltr">D0.05 = 1.36/√50 = 0.1923</span>يعني <b>منرفضش</b> H₀.')}</${Def}>
          <${P} small=${true}>${X('‡ The notes print only 48 interarrival times for the 50 points; the gaps 0.7880 → 0.7982 → 0.8206 imply two more (1.02 and 2.24).', '‡ الـ notes طابعة 48 interarrival time بس للـ 50 نقطة، والفواصل اللي بين 0.7880 و0.7982 و0.8206 معناها إن فيه قيمتين كمان (1.02 و2.24).')}</${P}>
        `),

        // 39 · K-S figure
        page(html`
          <${Fig} name="ms-in-ks" head=${t('The empirical CDF against F(x) = x', 'الـ empirical CDF قصاد الـ F(x) = x')} />
        `),

        // 40 · p-values
        page(html`
          <${H2}>${t('p-values and the "best fit" button', 'الـ p-values وزرار الـ "best fit"')}</${H2}>
          <${Def}>${X('The <b>p-value</b> is the significance level at which you would <b>just</b> reject H₀ for the observed test statistic. A <b>large p-value</b> means a <b>good fit</b>; a small one, a poor fit.', 'الـ <b>p‑value</b> هو الـ significance level اللي عنده <b>بالكاد</b> هنرفض H₀ لقيمة الـ test statistic اللي عندنا. الـ <b>p‑value الكبير</b> معناه <b>fit كويس</b>، والصغير معناه fit وحش.')}</${Def}>
          <${P} small=${true}>${X('So why not fit every distribution and keep the largest p-value?', 'طب ليه منعملش fit لكل الـ distributions وناخد أكبر p‑value؟')}</${P}>
          <${UL} items=${A ? ['الـ software <b>ميعرفش حاجة عن الـ physical basis</b> بتاع الـ data، واللي ممكن يقترح families مناسبة.', 'الـ best‑fit الأوتوماتيك بيميل للـ distributions <b>المرنة</b> (الـ notes بتذكر gamma وWeibull وexponential)، لأن المرونة بتقرّب الـ fit، ومش دايمًا ده الـ model الأنسب.', 'الـ p‑value ده <b>مجرد ملخّص</b>.']
            : ['The software <b>knows nothing about the physical basis</b> of the data, which can suggest the right families.', 'Automated best-fit tends to pick <b>flexible</b> distributions (the notes name gamma, Weibull and exponential): flexibility fits closer, but is not always the most appropriate model.', 'A p-value is <b>just a summary measure</b>.']} />
        `),

        // 41 · no data interview
        page(html`
          <${Interview} title=${t('Expert Opinion, exposed', 'الـ Expert Opinion على المكشوف')} sub=${t('This week: what a modeller does when there are no data at all.', 'حوار الأسبوع: الـ modeller بيعمل إيه لما مفيش data خالص.')} lines=${A ? [
            ['المذيع', 'إمتى بيحتاجوك؟'],
            ['الـ Expert', 'في <b>demonstration</b> أو <b>دراسة مبدئية</b> قبل ما يبقى فيه أي process data. والـ modeler لازم <b>يشيّك على الـ sensitivity</b> بتاعة النتايج للـ models اللي اختارها.'],
            ['المذيع', 'وإنت بتدّي إيه؟'],
            ['الـ Expert', 'قيمة <b>optimistic</b> و<b>pessimistic</b> و<b>most likely</b>. ومعايا الـ <b>engineering data</b>: أرقام المصنّع بتدّي قيمة مركزية نبدأ منها.'],
            ['المذيع', 'وغير كده؟'],
            ['الـ Expert', 'الـ <b>physical أو conventional limits</b>: حدود واضحة بتضيّق الـ range. وكمان <b>طبيعة الـ process</b>: افهمها الأول وبعدين اختار.'],
            ['المذيع', 'وتختار أنهي distribution؟'],
            ['الـ Expert', 'الـ <b>uniform</b> أو الـ <b>triangular</b> أو الـ <b>beta</b>. وأحسن: minimum وmaximum و<b>breakpoints</b>، يعني قيمة في النص والـ probability إن الـ X أقل من أو يساوي القيمة دي.']
          ] : [
            ['Head First', 'When do they call you?'],
            ['Expert', 'For a <b>demonstration</b> or a <b>preliminary study</b>, before any process data exist. The modeller must then <b>check the sensitivity</b> of the results to the models chosen.'],
            ['Head First', 'And what do you give?'],
            ['Expert', 'An <b>optimistic</b>, a <b>pessimistic</b> and a <b>most-likely</b> value. <b>Engineering data</b> help too: manufacturers\' values give a central value to start from.'],
            ['Head First', 'Anything else?'],
            ['Expert', '<b>Physical or conventional limits</b>: obvious bounds that narrow the range. And <b>the nature of the process</b>: understand it, then choose.'],
            ['Head First', 'Which distributions?'],
            ['Expert', '<b>Uniform</b>, <b>triangular</b> or <b>beta</b>. Better still: the minimum, the maximum and <b>breakpoints</b>, an intermediate value and the probability of being ≤ it.']
          ]} />
        `, { sec: t('No data', 'من غير data') }),

        // 42 · Example 6.8
        page(html`
          <${H2}>${t('Example 6.8: sales of product XYZ', 'مثال 6.8: مبيعات المنتج XYZ')}</${H2}>
          <${Fig} name="ms-in-nodata" />
        `),

        // 42b · no-data questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ notes كاتبة "25% = 0.24". إيه ده؟', '‡ المقصود احتمال <b>0.24</b> إننا نبيع <b>ما بين 3500 و4500</b>: الـ 25% اللي فوق 3500 ناقص الـ 1% اللي فوق 4500.'],
            ['وعنوان الجدول بيقول hours؟', '‡ المفروض <b>units</b>: دي وحدات مبيعات، مش ساعات.'],
            ['أعرف منين إن التخمين ده كويس؟', 'مش هتعرف بالظبط. عشان كده الـ modeler <b>بيشيّك على الـ sensitivity</b> بتاعة النتايج للـ input models اللي اختارها.']
          ] : [
            ['The notes say "25% = 0.24". What?', '‡ They mean a <b>0.24</b> chance of selling <b>between 3500 and 4500</b>: the 25% above 3500 minus the 1% above 4500.'],
            ['And the table heading says hours?', '‡ It should say <b>units</b>: these are sales, not times.'],
            ['How do I know the guess is any good?', 'You don\'t, exactly. That\'s why the modeller <b>checks the sensitivity</b> of the results to the input models chosen.']
          ]} />
          <${Grow} />
          <${Talk} who="disk">${X('Our example, not the notes\': my stock levels depend on demand. Guess demand badly and my shelves are wrong.', 'مثال من عندنا: الـ stock بتاعي معتمد على الـ demand. لو خمّنت الـ demand غلط، الرفوف بتاعتي هتبقى غلط.')}</${Talk}>
        `),

        // 43 · multivariate: covariance and correlation
        page(html`
          <${H1}>${t('When inputs depend on each other', 'لما الـ inputs تعتمد على بعض')}</${H1}>
          <${P} small=${true}>${X('Dependent inputs need a <b>multivariate input model</b> (e.g. lead time and annual demand in an inventory system); a sequence of dependent inputs needs a <b>time-series model</b> (e.g. successive times between orders).',
            'الـ inputs اللي بتعتمد على بعض محتاجة <b>multivariate input model</b> (زي الـ lead time والـ annual demand في الـ inventory system)، والـ sequence من inputs dependent محتاجة <b>time‑series model</b> (زي الأوقات بين الـ orders ورا بعض).')}</${P}>
          <${P} small=${true}>${X('Covariance and correlation measure <b>linear dependence</b>: how well (X₁ − μ₁) = β(X₂ − μ₂) + ε describes the pair (ε: mean 0, independent of X₂).', 'الـ covariance والـ correlation بيقيسوا الـ <b>linear dependence</b>: يعني المعادلة دي بتوصف الاتنين كويس قد إيه (والـ ε الـ mean بتاعه 0 ومستقل عن X₂):<span class="ltr">(X₁ − μ₁) = β(X₂ − μ₂) + ε</span>')}</${P}>
          <${Code} lines=${['cov(X₁, X₂) = E(X₁X₂) − μ₁μ₂', ['ρ = cov / (σ₁σ₂)', t('← between −1 and 1', 'بين −1 و1')], 'côv = (Σ X₁ⱼX₂ⱼ − n X̄₁X̄₂) / (n − 1)']} />
          <${UL} items=${A ? ['الـ cov بـ 0 يبقى الـ β بـ 0 (independent يدّي β بـ 0). والـ cov الموجب يبقى β موجب: الاتنين <b>في نفس الناحية</b> من الـ means. والسالب: <b>عكس بعض</b>.', 'الـ covariance من <bdi dir="ltr">−∞</bdi> لـ <bdi dir="ltr">∞</bdi>، والـ correlation بيعمله standardize. وكل ما ρ تقرّب من 1 أو −1 العلاقة أقوى.']
            : ['cov = 0 means β = 0 (independence gives β = 0); cov > 0 means β > 0: the two tend to sit on the <b>same side</b> of their means; cov < 0, <b>opposite sides</b>.', 'Covariance runs from −∞ to ∞; correlation standardizes it. The closer ρ is to −1 or 1, the stronger the linear relationship.']} />
        `, { sec: t('Multivariate inputs', 'الـ Multivariate inputs') }),

        // 44 · Example 6.9
        page(html`
          <${H2}>${t('Example 6.9: lead time and demand', 'مثال 6.9: الـ lead time والـ demand')}</${H2}>
          <${Fig} name="ms-in-corr" />
        `),

        // 45 · bivariate normal
        page(html`
          <${H2}>${t('Making correlated pairs', 'إزاي نعمل أزواج correlated')}</${H2}>
          <${P} small=${true}>${X('If X₁ and X₂ are normal, model them with a <b>bivariate normal</b>: parameters μ₁, μ₂, σ₁², σ₂² and ρ = corr(X₁, X₂). To generate a pair:', 'لو X₁ وX₂ الاتنين normal، مثّلهم بـ <b>bivariate normal</b>، والـ parameters هي الخمسة دول. وعشان تولّد زوج:<span class="ltr">μ₁, μ₂, σ₁², σ₂², ρ = corr(X₁, X₂)</span>')}</${P}>
          <${Code} lines=${[['Z₁ = (−2 ln R₁)^½ cos(2πR₂)', t('← step 1', 'الخطوة 1')], 'Z₂ = (−2 ln R₁)^½ sin(2πR₂)', ['X₁ = μ₁ + σ₁Z₁', t('← step 2', 'الخطوة 2')], ['X₂ = μ₂ + σ₂(ρZ₁ + √(1 − ρ²) Z₂)', t('← step 3', 'الخطوة 3')]]} />
          <${P} small=${true}>${X('‡ Unrounded: σ̂₁² = 9.444/9 = 1.049, σ̂₁ = 1.024, σ̂₂ = 9.931, ρ̂ = <b>0.85</b>. Same conclusion: <b>strong positive dependence</b>.', '‡ من غير تقريب:<span class="ltr">σ̂₁² = 9.444/9 = 1.049,  σ̂₁ = 1.024,  σ̂₂ = 9.931,  ρ̂ = 0.85</span>ونفس النتيجة: <b>dependence موجبة وقوية</b>.')}</${P}>
        `),

        page(html`
          <${H2}>${t('Generate correlated pairs', 'ولّد أزواج correlated')}</${H2}>
          <${Fig} name="ms-in-bivar" />
        `),

        // 46 · time series: definitions + AR(1)
        page(html`
          <${H1}>${t('Inputs with a memory', 'inputs عندها ذاكرة')}</${H1}>
          <${Def}>${X('A <b>time series</b> X₁, X₂, … is identically distributed but may be dependent. cov(Xₜ, Xₜ₊ₕ) is the <b>lag-h autocovariance</b>, corr(Xₜ, Xₜ₊ₕ) the <b>lag-h autocorrelation</b>. If it depends only on h, not t, the series is <b>covariance stationary</b>.',
            'الـ <b>time series</b> هي sequence كلها identically distributed بس ممكن تبقى dependent. الـ <bdi dir="ltr">cov(Xₜ, Xₜ₊ₕ)</bdi> اسمه الـ <b>lag‑h autocovariance</b>، والـ <bdi dir="ltr">corr(Xₜ, Xₜ₊ₕ)</bdi> اسمه الـ <b>lag‑h autocorrelation</b>. ولو بيعتمد على h بس مش على t، تبقى الـ series <b>covariance stationary</b>.')}</${Def}>
          <${H3c} en="AR(1): autoregressive, order 1" ar='نموذج الـ <bdi dir="ltr">AR(1)</bdi> (الـ autoregressive من الدرجة الأولى)' A=${A} />
          <${Code} lines=${['Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ', ['εₜ ~ normal(0, σε²)', t('← i.i.d.', 'مستقلين')], '−1 < φ < 1,  ρₕ = φʰ', 'Var(Xₜ) = σε² / (1 − φ²)', 'μ̂ = X̄,  σ̂ε² = σ̂²(1 − φ̂²)', 'φ̂ = côv(Xₜ, Xₜ₊₁) / σ̂²']} />
          <${P} small=${true}>${X('Xₜ is normal with mean μ, and φ = ρ₁ is the lag-1 autocorrelation. To generate: X₁ from a normal (μ, σε²/(1 − φ²)), then repeat Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ with a fresh normal εₜ.',
            'الـ Xₜ بيبقى normal والـ mean بتاعه μ، والـ φ هي الـ lag‑1 autocorrelation. للتوليد: طلّع X₁ من normal الـ variance بتاعه <bdi dir="ltr">σε²/(1 − φ²)</bdi>، وبعدين كرّر المعادلة بـ εₜ normal جديدة كل مرة.')}</${P}>
        `, { sec: t('Time series', 'الـ Time series') }),

        // 47 · EAR(1)
        page(html`
          <${H2}>${t('EAR(1): the exponential cousin', 'الـ EAR(1): القريب الـ exponential')}</${H2}>
          <${Code} lines=${[['Xₜ = φXₜ₋₁', t('← with probability φ', 'باحتمال φ')], ['Xₜ = φXₜ₋₁ + εₜ', t('← with probability 1 − φ', 'باحتمال 1 − φ')], 'εₜ ~ exponential(mean 1/λ)', '0 ≤ φ < 1,  ρₕ = φʰ', 'φ̂ = ρ̂ (lag 1),  λ̂ = 1/X̄']} />
          <${UL} items=${A ? ['كل الـ Xₜ بيبقوا <b>exponential</b> والـ mean بتاعهم <bdi dir="ltr">1/λ</bdi>.', 'بيمثّل <b>positive autocorrelation بس</b> (لأن φ مش سالبة).', 'التوليد: X₁ exponential، وبعدين طلّع U من uniform على <bdi dir="ltr">[0, 1]</bdi>: لو <bdi dir="ltr">U ≤ φ</bdi> يبقى <bdi dir="ltr">Xₜ = φXₜ₋₁</bdi>، غير كده زوّد εₜ exponential جديدة.']
            : ['Every Xₜ is <b>exponential</b> with mean 1/λ.', 'Only <b>positive autocorrelation</b> can be represented (φ is never negative).', 'To generate: X₁ exponential; then draw U ~ uniform[0, 1]: if U ≤ φ, Xₜ = φXₜ₋₁; otherwise add a fresh exponential εₜ.']} />
          <${Grow} />
          <${Talk} who="dice">${X('I decide each step: with probability φ the next gap is just φ times the last one.', 'أنا اللي بقرر كل خطوة: باحتمال φ الفاصل الجاي بيبقى φ مضروبة في اللي قبله وخلاص.')}</${Talk}>
        `),

        page(html`
          <${H2}>${t('Watch a series grow', 'اتفرج على الـ series وهي بتطلع')}</${H2}>
          <${Fig} name="ms-in-ts-gen" />
        `),

        // 48 · Example 6.10
        page(html`
          <${H2}>${t('Example 6.10: gaps between orders', 'مثال 6.10: الفواصل بين الـ orders')}</${H2}>
          <${Fig} name="ms-in-ear-ex" />
        `),

        // 49 · sort AR / EAR / both
        page(html`
          <${Box} kind="pencil" title=${t('AR(1), EAR(1), or both?', 'الـ AR(1) ولا الـ EAR(1) ولا الاتنين؟')}><p className="hf-p small">${t('Tap the model each property belongs to, then check.', 'دوس على الـ model اللي الخاصية دي بتاعته، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="ar" bins=${A ? [['AR', 'الـ AR(1)'], ['EAR', 'الـ EAR(1)'], ['2', 'الاتنين']] : [['AR', 'AR(1)'], ['EAR', 'EAR(1)'], ['Both', 'Both']]} items=${A ? [
            ['الـ εₜ ماشية normal', 0],
            ['الـ εₜ ماشية exponential', 1],
            ['الـ φ ما بين <bdi dir="ltr">−1</bdi> و1', 0],
            ['بيمثّل positive autocorrelation بس', 1],
            ['الـ autocorrelation عند lag h بيساوي <bdi dir="ltr">φʰ</bdi>', 2],
            ['الـ Xₜ ممكن تبقى <bdi dir="ltr">φXₜ₋₁</bdi> بالظبط باحتمال φ', 1],
            ['الـ variance بتاع Xₜ هو <bdi dir="ltr">σε²/(1 − φ²)</bdi>', 0],
            ['الـ φ̂ هي الـ lag‑1 autocorrelation', 2]
          ] : [
            ['εₜ is normal', 0],
            ['εₜ is exponential', 1],
            ['−1 < φ < 1', 0],
            ['Only positive autocorrelation', 1],
            ['Lag-h autocorrelation ρₕ = φʰ', 2],
            ['Xₜ = φXₜ₋₁ exactly, with probability φ', 1],
            ['Var(Xₜ) = σε²/(1 − φ²)', 0],
            ['φ̂ is the lag-1 autocorrelation', 2]
          ]} />
        `),

        // 50 · exam corner 1
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t('The doctors\' own questions on this lecture, from the 2025/26 and 2024/25 finals. Tap an answer to see why.', 'أسئلة الدكاترة نفسهم على المحاضرة دي، من فاينال 2025/26 و2024/25. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m1', /number of successes in n trials/i)}
          <${Grow} />
          <${Talk} who="dice">${t('Our hint: roll me n times and count the sixes. Successes in n trials.', 'تلميح من عندنا: ارميني n مرة وعِدّ كام مرة جت 6. نجاحات في n trials.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),

        page(html`
          ${mq('m2', /^Number of independent events/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('number of events: Poisson · time between them: exponential', 'عدد الـ events يبقى Poisson · الوقت بينهم exponential')}</${Hand}>
        `),

        // 51 · exam corner 2
        page(html`
          ${mq('m3', /scatter diagram is/i)}
          <${Grow} />
          <${Talk} who="table">${X('Paired data, X on the x-axis, Y on the y-axis: that is all a scatter diagram is.', 'أزواج data، والـ X على الـ x‑axis والـ Y على الـ y‑axis. هو ده كل الـ scatter diagram.')}</${Talk}>
        `),

        page(html`
          ${mq('m4', /^Distribution with the number of independent events/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('the same idea on two finals in a row: number of events = Poisson', 'نفس الفكرة في فاينالين ورا بعض: عدد الـ events يبقى Poisson')}</${Hand}>
        `),

        // 52 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ input models هي الـ driving force للـ simulation، والـ output عمره ما هيبقى أحسن من الـ inputs (<bdi dir="ltr">GIGO</bdi>).',
            'الأربع خطوات: اجمع data، حدد distribution، اختار الـ parameters، قيّم الـ goodness of fit.',
            'الـ histogram بيوري الشكل: حوالي <bdi dir="ltr">√n</bdi> intervals؛ الواسع زيادة coarse، والضيق زيادة ragged. الـ continuous يقابل PDF والـ discrete يقابل PMF.',
            'الـ physical basis بيختار الـ family: عدد events يبقى Poisson، والوقت بينهم exponential، والمجموع normal، والضرب lognormal.',
            'الـ Q‑Q plot: لو خط مستقيم يبقى الـ family صح، ولو الـ slope بـ 1 يبقى الـ parameters كمان صح.'
          ] : [
            'Input models are the driving force of a simulation; output is no better than input (<b>GIGO</b>).',
            'Four steps: collect data, identify a distribution, choose parameters, test goodness of fit.',
            'A histogram shows the shape: about √n intervals; too wide is coarse, too narrow ragged. Continuous ↔ PDF, discrete ↔ PMF.',
            'The physical basis picks the family: number of events Poisson, time between them exponential, sum normal, product lognormal.',
            'Q-Q plot: a straight line means the right family; slope 1 means the right parameters too.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        page(html`
          <${Bullets} items=${A ? [
            'الـ <bdi dir="ltr">S²</bdi> بنقسمه على <bdi dir="ltr">n − 1</bdi>. والـ MLE بتاع الـ Poisson هو <bdi dir="ltr">α̂ = X̄</bdi> وبتاع الـ exponential <bdi dir="ltr">λ̂ = 1/X̄</bdi>، والـ lognormal بيتحسب على الـ ln.',
            'الـ chi‑square: لازم <bdi dir="ltr">Eᵢ ≥ 5</bdi> و<bdi dir="ltr">df = k − s − 1</bdi>، ونرفض لو الـ χ₀² أكبر من الـ critical.',
            'الـ K‑S بيحسب <bdi dir="ltr">D = max|F − Sɴ|</bdi>، وهو أقوى في الـ samples الصغيرة لما مفيش parameters متقدّرة.',
            'لو مفيش data استخدم uniform أو triangular أو beta. والـ dependence بنقيسه بالـ ρ، والـ time series بنمثّلها بالـ <bdi dir="ltr">AR(1)</bdi> أو الـ <bdi dir="ltr">EAR(1)</bdi>.'
          ] : [
            'S² divides by n − 1. MLEs: α̂ = X̄, λ̂ = 1/X̄; lognormal on the logs.',
            'Chi-square: Eᵢ ≥ 5, df = k − s − 1, reject if χ₀² > χ²α,k−s−1.',
            'K-S: D = max|F − Sɴ|; more powerful for small samples with no estimated parameters.',
            'No data: uniform, triangular, beta. Dependence: ρ. Time series: AR(1) and EAR(1).'
          ]} />
        `),

        // 53 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 6!', 'خلّصت الفصل السادس!')}</${H1}>
            <${Talk} who="lens">${t('Next time: is the model itself right? Verification and validation.', 'المرة الجاية: هل الـ model نفسه صح؟ الـ verification والـ validation.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [6], t: Date.now() } }}>${t('Quiz me on Lecture 6', 'امتحنّي في محاضرة 6')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 6, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 6, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };

  // a small heading for a sub-part of a page
  function H3c({ en, ar, A }) { return html`<h4 className="hf-h3 hf-in">${T6(A ? ar : en)}</h4>`; }
})();

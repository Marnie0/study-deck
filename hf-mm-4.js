// Head First chapter for Multimedia Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Digital audio: sound and digitising it, sampling, sample rate, bit size (quantisation), Nyquist's theorem, Nyquist rate and
// Nyquist frequency, aliasing, oversampling and the low-pass filter, why CDs use 44.1 kHz, quality (dB, SNR), file size and the
// course's worked examples, audio file formats, ADPCM, synthetic sounds and synthesis methods.
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks the slide issues the notes flag.
// Every number in the "Be the calculator" drill was worked by hand and checked with node (Size = t × fs × bits × channels;
// ÷ 8 for bytes, ÷ 1024 for KB, as the notes do): 254,016,000 bits / 31,752,000 B / 31,007.8125 KB; 4000 Hz, 320,000 bits /
// 40,000 B / 39.0625 KB; 1,382,400,000 bits / 172,800,000 B; 600 Hz → 1200 Hz, 4,608,000 bits / 576,000 B / 562.5 KB.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T4 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mm4')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm4';
    s.textContent = `
.hfb .hf-mm4-tb{ display:grid; grid-template-columns:auto 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-mm4-tb > span{ padding:4px 9px; font-size:14px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-mm4-tb > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-mm4-tb > span.r{ font:800 14px/1.3 var(--mono); color:var(--hf-k); background:var(--hf-grey); white-space:nowrap; }
.hfb .hf-mm4-tb > span.hi{ font-weight:700; }
.hfb .hf-mm4-dr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:7px; }
.hfb .hf-mm4-tabs{ display:flex; gap:5px; }
.hfb .hf-mm4-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mm4-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm4-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-mm4-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-mm4-ask{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); }
.hfb .hf-mm4-work{ font:600 13px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; color:var(--ink); min-height:48px; }
.hfb .hf-mm4-work > div{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:hf-up .35s both; }
.hfb .hf-mm4-work .cur{ color:var(--hf-hand); }
.hfb .hf-mm4-q{ font:700 14px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-mm4-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-mm4-opts button{ font:700 13.5px/1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mm4-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-mm4-ok{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-mm4-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-mm4-row .hf-btn{ padding:7px 9px; }
.hfb .hf-mm4-wv{ display:block; width:100%; height:auto; color:var(--hf-k); }
.hf-ar .hf-mm4-tb > span, .hf-ar .hf-mm4-ask, .hf-ar .hf-mm4-bad, .hf-ar .hf-mm4-ok, .hf-ar .hf-mm4-q{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-mm4-tb > span.r{ font-family:var(--mono); direction:ltr; text-align:left; }
.hf-ar .hf-mm4-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm4-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-mm4-work{ direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: a smooth wave (what the microphone hears) and the dots the computer keeps
  function Wave() {
    const W = 328, Hh = 92, n = 17, f = t => Math.sin(2 * Math.PI * 1.5 * t) * 0.8 + Math.sin(2 * Math.PI * 4 * t) * 0.15;
    const X = t => 8 + t * (W - 16), Y = v => Hh / 2 - v * 38;
    const d = Array.from({ length: 161 }, (_, k) => { const t = k / 160; return (k ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1); }).join(' ');
    return html`<svg className="hf-mm4-wv hf-in" viewBox=${'0 0 ' + W + ' ' + Hh} role="img" aria-label="A smooth sound wave with samples taken at regular intervals" dir="ltr">
      <path d=${'M8 ' + Hh / 2 + ' H' + (W - 8)} stroke="var(--faint)" strokeWidth="1" />
      <path d=${d} stroke="currentColor" strokeWidth="2.5" fill="none" />
      ${Array.from({ length: n }, (_, k) => { const t = k / (n - 1); return html`<g key=${k} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.3 + k * 0.08) + 's' }}><path d=${`M${X(t)} ${Hh / 2} V${Y(f(t))}`} stroke="var(--ink)" strokeWidth="1.6" /><circle cx=${X(t)} cy=${Y(f(t))} r="3.6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.8" /></g>`; })}
    </svg>`;
  }

  // Be the calculator: four file-size problems, one step at a time. Every option is a real mistake; every right answer was checked.
  const DRILL = [
    {
      en: 'A song at <b>CD quality</b> (music, no rate given), <b>16-bit</b>, <b>stereo</b>, <b>3 minutes</b>. Size in KB? (1 KB = 1024 B)',
      ar: 'أغنية بجودة <b>CD</b> (music ومفيش rate مكتوب)، و<bdi dir="ltr">16‑bit</bdi> و<b>stereo</b>، لمدة <b>3 دقايق</b>. حجمها كام KB؟ <bdi dir="ltr">(1 KB = 1024 B)</bdi>',
      steps: [
        { l: ['Sample rate fs?', 'الـ sample rate كام؟'], o: ['22,050 Hz', '44,100 Hz', '8000 Hz', '88,200 Hz'], a: 1, w: 'fs = 44,100 Hz (music)',
          h: [['22,050 Hz is the CD rate\'s Nyquist frequency, not the rate itself.', 'الـ <bdi dir="ltr">22,050 Hz</bdi> دي الـ Nyquist frequency بتاعة الـ CD، مش الـ rate نفسه.'], null,
            ['8000 Hz is the speech constant. This is music.', 'الـ <bdi dir="ltr">8000 Hz</bdi> ده ثابت الـ speech، وده music.'],
            ['44.1 kHz already includes Nyquist\'s × 2. Don\'t double it again.', 'الـ <bdi dir="ltr">44.1 kHz</bdi> فيه الـ × 2 بتاع Nyquist أصلًا، متضاعفوش تاني.']] },
        { l: ['Time in seconds?', 'الوقت بالثواني كام؟'], o: ['3 s', '10,800 s', '180 s'], a: 2, w: 't = 3 × 60 = 180 s',
          h: [['The formula needs seconds: 3 minutes × 60.', 'المعادلة عايزة ثواني: 3 دقايق × 60.'], ['× 3600 is for hours. These are minutes.', 'الـ × 3600 ده للساعات، ودي دقايق.'], null] },
        { l: ['Size in bits?', 'الحجم بالـ bits كام؟'], o: ['254,016,000 bits', '127,008,000 bits', '1,411,200 bits'], a: 0, w: '44,100×16×180×2 = 254,016,000 bits',
          h: [null, ['That\'s mono (1 channel). Stereo has 2.', 'ده mono (channel واحدة)، والـ stereo فيه 2.'], ['That\'s one second of audio: the time is missing.', 'ده ثانية واحدة بس: الوقت ناقص.']] },
        { l: ['Size in bytes?', 'الحجم بالـ bytes كام؟'], o: ['2,032,128,000 B', '31,752,000 B', '248,062.5 B'], a: 1, w: '÷ 8 = 31,752,000 B',
          h: [['That multiplies by 8. Bits → bytes is ÷ 8.', 'ده ضرب في 8. من bits لـ bytes بنقسم على 8.'], null, ['That\'s bits ÷ 1024: the ÷ 8 was skipped.', 'ده الـ bits ÷ 1024: نسيت تقسم على 8.']] },
        { l: ['Size in KB?', 'الحجم بالـ KB كام؟'], o: ['31,752 KB', '3,875.98 KB', '31,007.8125 KB'], a: 2, w: '÷ 1024 = 31,007.8125 KB',
          h: [['That divides by 1000. The course uses 1 KB = 1024 B.', 'ده قسمة على 1000، والكورس بيستخدم <bdi dir="ltr">1 KB = 1024 B</bdi>.'], ['That divides by 8 twice.', 'ده قسم على 8 مرتين.'], null] }
      ]
    },
    {
      en: 'A signal sampled <b>every 0.25 ms</b>, <b>8-bit</b>, <b>mono</b>, for <b>10 seconds</b>. Size in KB?',
      ar: 'إشارة متعملها sampling <b>كل <bdi dir="ltr">0.25 ms</bdi></b>، و<bdi dir="ltr">8‑bit</bdi> و<b>mono</b>، لمدة <b>10 ثواني</b>. حجمها كام KB؟',
      steps: [
        { l: ['Sample rate fs?', 'الـ sample rate كام؟'], o: ['4 Hz', '8000 Hz', '4000 Hz'], a: 2, w: 'fs = 1/0.00025 s = 4000 Hz',
          h: [['1/0.25 treats milliseconds as seconds. 0.25 ms = 0.00025 s.', 'الـ 1/0.25 دي اعتبرت الـ ms ثواني. الـ <bdi dir="ltr">0.25 ms = 0.00025 s</bdi>.'], ['The interval is given, so fs = 1 / interval: no constant needed.', 'الـ interval مكتوب، يبقى <bdi dir="ltr">fs = 1 / interval</bdi> ومش محتاج ثابت.'], null] },
        { l: ['Time in seconds?', 'الوقت بالثواني كام؟'], o: ['600 s', '10 s', '36,000 s'], a: 1, w: 't = 10 s',
          h: [['It\'s already in seconds: no × 60.', 'هو بالثواني أصلًا: مفيش × 60.'], null, ['It\'s already in seconds: no × 3600.', 'هو بالثواني أصلًا: مفيش × 3600.']] },
        { l: ['Size in bits?', 'الحجم بالـ bits كام؟'], o: ['320,000 bits', '640,000 bits', '32,000 bits'], a: 0, w: '4000×8×10×1 = 320,000 bits',
          h: [null, ['That\'s stereo. This one is mono: × 1.', 'ده stereo، والإشارة دي mono: × 1.'], ['That\'s one second: × 10 s is missing.', 'ده ثانية واحدة: ناقص <bdi dir="ltr">× 10 s</bdi>.']] },
        { l: ['Size in bytes?', 'الحجم بالـ bytes كام؟'], o: ['312.5 B', '40,000 B', '2,560,000 B'], a: 1, w: '÷ 8 = 40,000 B',
          h: [['That\'s bits ÷ 1024: the ÷ 8 was skipped.', 'ده الـ bits ÷ 1024: نسيت تقسم على 8.'], null, ['That multiplies by 8. Bits → bytes is ÷ 8.', 'ده ضرب في 8. من bits لـ bytes بنقسم على 8.']] },
        { l: ['Size in KB?', 'الحجم بالـ KB كام؟'], o: ['39.0625 KB', '40 KB', '4.88 KB'], a: 0, w: '÷ 1024 = 39.0625 KB',
          h: [null, ['That divides by 1000. The course uses 1 KB = 1024 B.', 'ده قسمة على 1000، والكورس بيستخدم <bdi dir="ltr">1 KB = 1024 B</bdi>.'], ['That divides by 8 twice.', 'ده قسم على 8 مرتين.']] }
      ]
    },
    {
      en: 'A <b>speech</b> recording, <b>16-bit</b>, <b>stereo</b>, <b>1.5 hours</b>, no rate given. Size in bytes?',
      ar: 'تسجيل <b>speech</b> بـ <bdi dir="ltr">16‑bit</bdi> و<b>stereo</b>، لمدة <b>ساعة ونص</b>، ومفيش rate مكتوب. حجمه كام byte؟',
      steps: [
        { l: ['Sample rate fs?', 'الـ sample rate كام؟'], o: ['4000 Hz', '8000 Hz', '44,100 Hz', '11,025 Hz'], a: 1, w: 'fs = 2 × 4000 = 8000 Hz (speech)',
          h: [['4 kHz is speech\'s fmax. Nyquist needs twice it.', 'الـ <bdi dir="ltr">4 kHz</bdi> دي الـ fmax بتاعة الـ speech، والـ Nyquist عايز ضعفها.'], null, ['44.1 kHz is the music constant. This is speech.', 'الـ <bdi dir="ltr">44.1 kHz</bdi> ده ثابت الـ music، وده speech.'],
            ['11.025 kHz is on the slide\'s rate list, but calculations use the course constant: 2 × 4 kHz = 8 kHz.', 'الـ <bdi dir="ltr">11.025 kHz</bdi> موجود في لستة السلايد، بس في الحسابات بنستخدم ثابت الكورس: <bdi dir="ltr">2 × 4 kHz = 8 kHz</bdi>.']] },
        { l: ['Time in seconds?', 'الوقت بالثواني كام؟'], o: ['90 s', '5400 s', '1.5 s'], a: 1, w: 't = 1.5 × 3600 = 5400 s',
          h: [['1.5 × 60 turns minutes into seconds. These are hours: × 3600.', 'الـ <bdi dir="ltr">1.5 × 60</bdi> دي للدقايق. دي ساعات: × 3600.'], null, ['The formula needs seconds: × 3600.', 'المعادلة عايزة ثواني: × 3600.']] },
        { l: ['Size in bits?', 'الحجم بالـ bits كام؟'], o: ['691,200,000 bits', '23,040,000 bits', '1,382,400,000 bits'], a: 2, w: '8000×16×5400×2 = 1,382,400,000 bits',
          h: [['That\'s mono (1 channel). Stereo has 2.', 'ده mono (channel واحدة)، والـ stereo فيه 2.'], ['That uses 90 s. 1.5 hours is 5400 s.', 'ده استخدم <bdi dir="ltr">90 s</bdi>، والساعة ونص يعني <bdi dir="ltr">5400 s</bdi>.'], null] },
        { l: ['Size in bytes?', 'الحجم بالـ bytes كام؟'], o: ['172,800,000 B', '1,382,400,000 B', '86,400,000 B'], a: 0, w: '÷ 8 = 172,800,000 B',
          h: [null, ['That\'s the bits number. Divide by 8.', 'ده رقم الـ bits. اقسم على 8.'], ['That\'s the mono size.', 'ده حجم الـ mono.']] }
      ]
    },
    {
      en: '<b>x(t) = 4·cos(400πt) + sin(1200πt + π/2)</b>, sampled at its <b>Nyquist rate</b>, <b>32-bit</b>, <b>mono</b>, <b>2 minutes</b>. Size in KB?',
      ar: 'الإشارة دي متعملها sampling بالـ <b>Nyquist rate</b> بتاعها، و<bdi dir="ltr">32‑bit</bdi> و<b>mono</b>، لمدة <b>دقيقتين</b>. حجمها كام KB؟<span class="ltr"><b>x(t) = 4·cos(400πt) + sin(1200πt + π/2)</b></span>',
      steps: [
        { l: ['Highest frequency fmax?', 'أعلى frequency كام؟'], o: ['1200 Hz', '200 Hz', '600 Hz'], a: 2, w: ['400π/2π = 200 Hz, 1200π/2π = 600 Hz', 'fmax = 600 Hz'],
          h: [['1200π is 2πf, not f. Divide by 2π.', 'الـ 1200π دي 2πf مش f. اقسم على 2π.'], ['200 Hz is the lower component. Nyquist uses the highest.', 'الـ <bdi dir="ltr">200 Hz</bdi> دي الـ component الأوطى، والـ Nyquist بيستخدم الأعلى.'], null] },
        { l: ['Sample rate fs?', 'الـ sample rate كام؟'], o: ['1200 Hz', '600 Hz', '2400 Hz'], a: 0, w: 'fs = 2 × 600 = 1200 Hz',
          h: [null, ['That\'s fmax. The Nyquist rate is 2 × fmax.', 'ده الـ fmax. الـ Nyquist rate هو <bdi dir="ltr">2 × fmax</bdi>.'], ['That doubles twice: 2 × 600 is enough.', 'ده ضاعف مرتين: <bdi dir="ltr">2 × 600</bdi> كفاية.']] },
        { l: ['Time in seconds?', 'الوقت بالثواني كام؟'], o: ['2 s', '120 s'], a: 1, w: 't = 2 × 60 = 120 s',
          h: [['The formula needs seconds: 2 × 60.', 'المعادلة عايزة ثواني: <bdi dir="ltr">2 × 60</bdi>.'], null] },
        { l: ['Size in bits?', 'الحجم بالـ bits كام؟'], o: ['9,216,000 bits', '4,608,000 bits', '2,304,000 bits'], a: 1, w: '1200×32×120×1 = 4,608,000 bits',
          h: [['That\'s stereo. This one is mono.', 'ده stereo، والإشارة دي mono.'], null, ['That uses fs = 600 Hz.', 'ده استخدم <bdi dir="ltr">fs = 600 Hz</bdi>.']] },
        { l: ['Size in bytes?', 'الحجم بالـ bytes كام؟'], o: ['4,608,000 B', '576,000 B'], a: 1, w: '÷ 8 = 576,000 B',
          h: [['That\'s the bits number. Divide by 8.', 'ده رقم الـ bits. اقسم على 8.'], null] },
        { l: ['Size in KB?', 'الحجم بالـ KB كام؟'], o: ['562.5 KB', '576 KB'], a: 0, w: '÷ 1024 = 562.5 KB',
          h: [null, ['That divides by 1000. The course uses 1 KB = 1024 B.', 'ده قسمة على 1000، والكورس بيستخدم <bdi dir="ltr">1 KB = 1024 B</bdi>.']] }
      ]
    }
  ];
  const ANS = ['31,007.8125 KB', '39.0625 KB', '172,800,000 B', '562.5 KB'];
  function Drill({ id }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id + ':p', 0);
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const [d0] = H.K.useSlot(id + ':0', 0), [d1] = H.K.useSlot(id + ':1', 0), [d2] = H.K.useSlot(id + ':2', 0), [d3] = H.K.useSlot(id + ':3', 0);
    const prog = [d0, d1, d2, d3];
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = DRILL[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    return html`<div className="hf-mm4-dr hf-in">
      <div className="hf-mm4-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${DRILL.map((_, j) => html`<button key=${j} className=${prog[j] >= DRILL[j].steps.length ? 'dn' : ''} aria-pressed=${String(p === j)} onClick=${() => setP(j)}>${ar ? 'مسألة ' : 'Problem '}${j + 1}</button>`)}</div>
      <p className="hf-mm4-ask">${T4(ar ? P.ar : P.en)}</p>
      <div className="hf-mm4-work" dir="ltr">${P.steps.slice(0, k).reduce((a, s) => a.concat(s.w), []).map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}${!done && html`<div className="cur">${st.l[0].replace('?', ' = ?')}</div>`}</div>
      ${done ? html`<p className="hf-mm4-ok">${T4(ar ? `<b>خلصت!</b> الإجابة <bdi dir="ltr"><b>${ANS[p]}</b></bdi>.${p < 3 ? ' جرّب المسألة اللي بعدها.' : ''}` : `<b>Done!</b> The answer is <b>${ANS[p]}</b>.${p < 3 ? ' Try the next problem.' : ''}`)}</p>`
        : html`<p className="hf-mm4-q">${ar ? st.l[1] : st.l[0]}</p><div className="hf-mm4-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${o}</button>`)}</div>`}
      ${bad && html`<p className="hf-mm4-bad">${T4(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-mm4-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'ورّيني الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div>
    </div>`;
  }

  H.chapters.mm[4] = {
    title: 'Digital Audio: Sampling, Nyquist and File Size', kicker: 'Chapter 4', run: 'digital audio',
    ar: { title: 'الصوت الرقمي: الـ Sampling والـ Nyquist وحجم الملف', kicker: 'الفصل 4', run: 'الصوت الرقمي' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (quiz items with src), with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arQuiz = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[4] && window.AR.mm.lectures[4].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const RT = rows => html`<div className="hf-mm4-tb hf-in">${rows.map(([r, u, hi], i) => html`<${React.Fragment} key=${i}><span className="r">${r}</span><span className=${hi ? 'hi' : ''}>${T(u)}</span></${React.Fragment}>`)}</div>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X('This is <b>the exam\'s favourite lecture</b>: more of the doctors\' questions come from it than from any other. So this chapter drills it: pictures first, then the traps, then calculations you do yourself. Every fact is from the slides.',
            'دي <b>المحاضرة اللي الامتحان بيحبها أكتر حاجة</b>: أسئلة الدكاترة منها أكتر من أي محاضرة تانية. عشان كده الفصل ده بيذاكرها كويس: الصور الأول، وبعدين الفخاخ، وبعدين حسابات بتحلها بنفسك. وكل المعلومات من السلايدز.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You answer right on the page, and the calculator drill checks every step.', '<b>حل التمارين.</b> بتجاوب على الصفحة نفسها، وتمرين الحسابات بيصحّح كل خطوة.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers what you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slide that says something odd, and what was meant.', 'معناها سلايد فيها حاجة غريبة، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the slides\'.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>Multimedia` : html`Chapter four<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Every Sample Counts', 'كل sample بتفرق')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('digital audio: sampling, Nyquist and file size', 'الصوت الرقمي: الـ sampling والـ Nyquist وحجم الملف')}</p></div>
          <${Wave} />
          <${Talk} who="mic">${t('I hear one smooth wave of air pressure. No gaps, no steps.', 'أنا بسمع موجة ضغط هوا واحدة ناعمة. مفيهاش فراغات ولا سلالم.')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${t('And I can only store numbers. A fixed number of them every second, please.', 'وأنا مبعرفش أخزّن غير أرقام. عدد ثابت منهم كل ثانية، لو سمحت.')}</${Talk}>
          <${P} small=${true}>${X('How often do we measure? How precisely? Measure too rarely and you hear <b>ghost frequencies</b>; measure too much and the <b>file explodes</b>. This chapter is about getting it just right.',
            'نقيس كل قد إيه؟ وبدقة قد إيه؟ لو قست قليل هتسمع <b>frequencies وهمية</b>، ولو قست كتير <b>الملف هيتنفخ</b>. الفصل ده عن إزاي تظبطها صح.')}</${P}>
        `, { sec: t('Sound and digitising it', 'الصوت وتحويله لـ digital') }),

        // 2 · what is sound
        page(html`
          <${H1}>${t('First: what is sound?', 'الأول: يعني إيه صوت؟')}</${H1}>
          <${Def}>${X('<b>Sound generation</b>: a source generates sound as <b>air pressure changes</b>, either <b>electrically</b> (a loudspeaker) or <b>acoustically</b> (direct pressure variations).',
            'الـ <b>Sound generation</b>: المصدر بيطلّع صوت على شكل <b>تغيرات في ضغط الهوا</b>، يا إما <b>electrically</b> (السماعة loudspeaker) يا إما <b>acoustically</b> (تغيرات ضغط مباشرة).')}</${Def}>
          <${Talk} who="spk">${t('Me: electric signal in, air pressure out.', 'أنا: electric signal داخلة، وضغط هوا طالع.')}</${Talk}>
          <${Def}>${X('<b>Sound reception</b>: <b>electrically</b> (a <b>microphone</b> produces an electric signal) or by <b>ears</b>, which respond to pressure.',
            'الـ <b>Sound reception</b>: يا إما <b>electrically</b> (الـ <b>microphone</b> بيطلّع electric signal) يا إما بـ <b>الودان</b>، اللي بتستجيب للضغط.')}</${Def}>
          <${Talk} who="mic" flip=${true}>${t('And me the other way round: air pressure in, electric signal out.', 'وأنا بالعكس: ضغط هوا داخل، وelectric signal طالعة.')}</${Talk}>
          <${Hand} arrow="up" red=${true}>${t('Ears respond to pressure, and MPEG audio exploits this fact.', 'الودان بتستجيب للضغط، والـ MPEG audio بيستغل الحقيقة دي.')}</${Hand}>
        `),

        // 3 · digitising
        page(html`
          <${H2}>${t('From air to numbers', 'من الهوا للأرقام')}</${H2}>
          <${P} small=${true}>${X('A microphone turns sound into an <b>analog signal</b>. But computers like <b>discrete</b> entities, so something must convert it:',
            'الـ microphone بيحوّل الصوت لـ <b>analog signal</b>. بس الكمبيوتر بيحب الحاجات الـ <b>discrete</b>، فلازم حاجة تحوّلها:')}</${P}>
          <${Fig} name="mm-digitise" />
          <${Def}>${X('<b>Analog-to-digital</b> conversion is done by dedicated hardware, e.g. a <b>sound card</b>. It is also known as <b>digital sampling</b>.',
            'تحويل الـ <b>analog-to-digital</b> بيعمله hardware مخصوص، زي الـ <b>sound card</b>. وده اسمه برضه <b>digital sampling</b>.')}</${Def}>
        `),

        // 4 · sampling
        page(html`
          <${H2}>${t('Sampling: measure, record, repeat', 'الـ Sampling: قيس، سجّل، كرّر')}</${H2}>
          <${Def}>${X('<b>Sampling</b> = measuring the analog signal at <b>regular discrete intervals</b> (the sampling interval <b>T</b>) and recording the value there.',
            'الـ <b>Sampling</b> إننا نقيس الـ analog signal على <b>فترات منتظمة</b> (الـ interval <b>T</b>) ونسجّل القيمة.')}</${Def}>
          <${Fig} name="mm-sampling-1" />
        `, { sec: t('Sampling', 'الـ Sampling') }),

        // 5 · sampling (2)
        page(html`
          <${Fig} name="mm-sampling-2" head=${t('One sample every interval T', 'sample واحدة كل interval T')} />
          <${Hand}>${t('Ours: a camera flash every T seconds. Between flashes, the computer sees nothing.', 'من عندنا: فلاش بيضرب كل T ثانية، وبينهم الكمبيوتر مش شايف حاجة.')}</${Hand}>
        `),

        // 6 · sample rate
        page(html`
          <${H2}>${t('Sample rate: how many per second?', 'الـ Sample rate: كام واحدة في الثانية؟')}</${H2}>
          <${Def}>${X('<b>Sample rate</b> (sampling frequency) = how many samples we take <b>per second</b> = <b>1 / sampling interval</b>. Unit: <b>Hertz (Hz)</b>.',
            'الـ <b>Sample rate</b> (أو الـ sampling frequency) هو عدد الـ samples اللي بناخدها <b>في الثانية</b>، وبيساوي:<span class="ltr"><b>1 / sampling interval</b></span>والوحدة: <b>Hertz (Hz)</b>.')}</${Def}>
          <${Code} lines=${[['fs = 1 / T', t('T in seconds', 'الـ T بالثواني')]]} />
          ${RT(A ? [['8 kHz', 'التليفون'], ['11.025 kHz', 'الكلام (speech)'], ['22.05 kHz', 'صوت جودة ضعيفة: الـ WWW audio وراديو AM'], ['44.1 kHz', 'جودة CD', true]]
            : [['8 kHz', 'telephone'], ['11.025 kHz', 'speech'], ['22.05 kHz', 'low-grade audio (WWW audio, AM radio)'], ['44.1 kHz', 'CD quality', true]])}
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"Sampling frequency refers to"</i>: the number of samples per <b>second</b> (not per hour, not the duration, not the amplitude). Its standard unit: <b>Hertz</b>, not joule, newton or ampere.',
            'سؤال:<span class="ltr"><i>"Sampling frequency refers to"</i></span>إجابته عدد الـ samples في <b>الثانية</b>. والوحدة <b>Hertz</b>، مش joule ولا newton ولا ampere.')}</p></${Box}>
        `, { sec: t('Sample rate and bit size', 'الـ Sample rate والـ bit size') }),

        // 7 · bit size
        page(html`
          <${H2}>${t('Bit size: how precisely?', 'الـ Bit size: بدقة قد إيه؟')}</${H2}>
          <${Def}>${X('<b>Bit size = quantisation</b>: how do we store each sample value? An <b>8-bit</b> value: 0–255. A <b>16-bit</b> value (integer): 0–65535.',
            'الـ <b>Bit size</b> هو الـ <b>quantisation</b>: هنخزّن قيمة كل sample إزاي؟ قيمة <bdi dir="ltr"><b>8‑bit</b></bdi> من 0 لـ 255، وقيمة <bdi dir="ltr"><b>16‑bit</b></bdi> (integer) من 0 لـ 65535.')}</${Def}>
          <${Code} lines=${['Levels = 2^bits', ['8 bit  →    256 levels', ''], ['16 bit → 65,536 levels', '']]} />
          <${Hand} tilt=${true}>${t('Ours: the sample rate chops up time; the bit size chops up the height of the wave.', 'من عندنا: الـ sample rate بيقطّع الوقت، والـ bit size بيقطّع ارتفاع الموجة.')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm True/False, all <b>True</b>: <i>quantization converts continuous amplitudes into discrete levels</i>; <i>more bits per sample decrease quantization error</i>. And more quantization levels <b>decrease</b> quantization noise. A higher sampling frequency does <b>not</b> eliminate quantization error: that\'s the bits\' job.',
            'أسئلة صح وغلط من الميدترم، كلها <b>True</b>: الـ quantization بتحوّل الـ amplitudes المتصلة لـ levels منفصلة؛ والـ bits الأكتر في الـ sample بتقلّل الـ quantization error. والـ levels الأكتر <b>بتقلّل</b> الـ quantization noise. لكن الـ sampling frequency الأعلى <b>مش</b> بتلغي الـ quantization error: دي شغلانة الـ bits.')}</p></${Box}>
        `),

        // 8 · try it
        page(html`
          <${Fig} name="mm-bit-rate" />
        `),

        // 9 · sort: sampling or quantisation
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Sampling or quantisation? Tap <b>S</b> for sampling (the time axis) or <b>Q</b> for quantisation (the value of each sample), then check.',
            'ده sampling ولا quantisation؟ دوس <b>S</b> للـ sampling (محور الوقت) أو <b>Q</b> للـ quantisation (قيمة كل sample)، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="sq" bins=${A ? [['S', 'الـ sampling'], ['Q', 'الـ quantisation']] : [['S', 'Sampling'], ['Q', 'Quantisation']]} items=${A ? [
            ['بيقيس الإشارة كل فترة زمنية ثابتة', 0],
            ['بيخزّن كل قيمة كواحدة من 256 level', 1],
            ['رقم زي <bdi dir="ltr">16 bits</bdi> لكل sample', 1],
            ['بيتقاس بالـ Hertz', 0],
            ['بيحوّل الـ amplitudes المتصلة لـ levels منفصلة', 1],
            ['بيحصل الأول', 0],
            ['لو زوّدته الـ noise بتقل', 1],
            ['التليفون بيستخدم منه <bdi dir="ltr">8 kHz</bdi>', 0]
          ] : [
            ['Measures the signal at regular time intervals', 0],
            ['Stores each value as one of 256 levels', 1],
            ['A number like 16 bits per sample', 1],
            ['Measured in Hertz', 0],
            ['Converts continuous amplitudes into discrete levels', 1],
            ['Happens first', 0],
            ['More of it means less quantisation noise', 1],
            ['The telephone uses 8 kHz of it', 0]
          ]} />
        `, { sec: t('Exercise: S or Q?', 'تمرين: S ولا Q؟') }),

        // 10 · Nyquist
        page(html`
          <${Box} kind="brain"><p className="hf-p small">${t('A sine wave goes up and down 1000 times a second. What is the fewest samples per second that could still capture it? 1000? 2000? More?', 'موجة sine بتطلع وتنزل 1000 مرة في الثانية. أقل عدد samples في الثانية يقدر يمسكها كام؟ 1000؟ 2000؟ أكتر؟')}</p></${Box}>
          <${H2}>${t('Nyquist\'s sampling theorem', 'نظرية Nyquist للـ sampling')}</${H2}>
          <${Def}>${X('The sampling frequency for a signal must be <b>at least twice the highest frequency component</b> in the signal.',
            'الـ sampling frequency للإشارة لازم تكون <b>على الأقل ضعف أعلى frequency component</b> فيها.')}</${Def}>
          <${Code} lines=${[['fs ≥ 2 × fmax', t('at least, highest', 'على الأقل، الأعلى')]]} />
          <${UL} items=${A ? [
            'الـ <b>Nyquist rate</b> هو <bdi dir="ltr">2·fmax</bdi>: أقل sample rate ينفع لإشارة معيّنة.',
            'الـ <b>Nyquist frequency</b> هي <bdi dir="ltr">fs / 2</bdi>: أعلى frequency يقدر sample rate معيّن يمثلها، زي <bdi dir="ltr">44.1 kHz → 22.05 kHz</bdi>.',
            'الـ sampling frequency <b>حاسمة</b> عشان نطلّع نسخة digital دقيقة من الـ analog waveform.'
          ] : [
            '<b>Nyquist rate</b> = 2·fmax: the minimum sample rate for a signal.',
            '<b>Nyquist frequency</b> = fs / 2: the highest frequency a given sample rate can represent (44.1 kHz → 22.05 kHz).',
            'The sampling frequency is <b>critical</b> to the accurate reproduction of a digital version of an analog waveform.'
          ]} />
        `, { sec: t('Nyquist\'s theorem', 'نظرية Nyquist') }),

        // 11 · the three demos
        page(html`
          <${Fig} name="mm-nyquist-3" />
          <${P} small=${true}>${X('‡ The middle slide is titled "Twice Nyquist Frequency", but its samples come at twice the <b>signal\'s</b> frequency: the Nyquist rate 2·fmax.',
            '‡ عنوان السلايد اللي في النص:<span class="ltr">"Twice Nyquist Frequency"</span>بس الـ samples فيها بضعف frequency <b>الإشارة</b>: الـ Nyquist rate.')}</${P}>
        `),

        // 12 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: two names that sound alike and keep getting swapped in the exam.', 'قعدة الليلة: اسمين شبه بعض، وبيتبدّلوا على طول في الامتحان.')} />
          <${Chat} names=${A ? ['الـ Nyquist Rate', 'الـ Nyquist Frequency'] : ['Nyquist Rate', 'Nyquist Frequency']} lines=${A ? [
            [0, 'أنا <bdi dir="ltr"><b>2·fmax</b></bdi>. قولّي أعلى frequency في الإشارة، أقولك أبطأ sample rate مسموح.'],
            [1, 'وأنا <bdi dir="ltr"><b>fs / 2</b></bdi>. قولّي الـ sample rate، أقولك أعلى frequency يقدر يمثلها.'],
            [0, 'كلام لحد <bdi dir="ltr">4 kHz</bdi>؟ أنا <bdi dir="ltr"><b>8 kHz</b></bdi>. أبطأ من كده يبقى aliasing.'],
            [1, 'سي دي بـ <bdi dir="ltr">44.1 kHz</bdi>؟ أنا <bdi dir="ltr"><b>22.05 kHz</b></bdi>، فوق آخر السمع بشوية.'],
            [0, 'يعني أنا بابدأ من <b>الإشارة</b>…'],
            [1, '…وأنا بابدأ من <b>الـ sample rate</b>. نفس المعادلة من الناحيتين.'],
            [0, 'أمال الطلبة بيلخبطونا ليه؟'],
            [1, 'عشان الامتحان بيسأل الاتنين: الـ Nyquist frequency هي <b>نص الـ sampling rate</b>، والـ Nyquist rate هو <b>ضعف أعلى frequency</b>.']
          ] : [
            [0, "I'm <b>2·fmax</b>. Tell me the highest frequency in a signal and I'll tell you the slowest sample rate allowed."],
            [1, "I'm <b>fs / 2</b>. Tell me a sample rate and I'll tell you the highest frequency it can represent."],
            [0, 'Speech up to 4 kHz? I say <b>8 kHz</b>. Any slower is aliasing.'],
            [1, 'A CD at 44.1 kHz? I say <b>22.05 kHz</b>, just above the top of human hearing.'],
            [0, 'So I start from the <b>signal</b>…'],
            [1, '…and I start from the <b>sample rate</b>. Same equation, opposite ends.'],
            [0, 'Then why do students swap us?'],
            [1, 'Because the exam asks both: the Nyquist frequency is <b>half the sampling rate</b>; the Nyquist rate is <b>twice the highest frequency</b>.']
          ]} />
        `),

        // 13 · traps
        page(html`
          <${H2}>${t('The exam\'s favourite traps', 'الفخاخ المفضّلة في الامتحان')}</${H2}>
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"…must be <b>at most</b> twice the highest frequency"</i>: <b>False</b>. <i>"…at least twice the <b>lowest</b> frequency"</i>: <b>False</b>. The theorem is <b>at least</b>, <b>highest</b>. And <i>"the sampling frequency is not critical"</i>: <b>False</b>.',
            'الجمل دي كلها <b>غلط (False)</b>:<span class="ltr">"…at most twice the highest frequency…"</span><span class="ltr">"…at least twice the lowest frequency…"</span><span class="ltr">"…sampling frequency is not critical…"</span>النظرية: <b>على الأقل</b> ضعف <b>أعلى</b> frequency.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"Sampling frequency to digitize a signal with a maximum frequency of 11025 Hz?"</i> <b>22.05 kHz</b>: just double it. 44.1 kHz is sitting there as the decoy (it\'s the CD rate). Same for 3000 Hz → <b>6000 Hz</b>, 9000 Hz → <b>18 kHz</b>: the 11.025 kHz and 22.05 kHz options are decoys.',
            'سؤال:<span class="ltr">"…a maximum frequency equal to 11025 Hz?"</span>إجابته <b><bdi dir="ltr">22.05 kHz</bdi></b>: ضاعف وبس. والـ <bdi dir="ltr">44.1 kHz</bdi> فخ (ده الـ rate بتاع الـ CD). ونفس الكلام هنا:<span class="ltr">3000 Hz → <b>6000 Hz</b>,   9000 Hz → <b>18 kHz</b></span>والاختيارات اللي فيها <bdi dir="ltr">11.025 kHz</bdi> أو <bdi dir="ltr">22.05 kHz</bdi> فخ.')}</p></${Box}>
          <${P} small=${true}>${X('One more from the demos: the slides mark red samples at the <b>zero crossings</b>: at twice the frequency, if the samples land there, every sample is 0 and the sine is lost too.',
            'وكمان من الديمو: السلايدز معلّمة samples حمرا عند <b>نقط الصفر</b>: لو بضعف الـ frequency والـ samples وقعت هناك، كل الـ samples هتبقى 0 والـ sine هيضيع برضه.')}</${P}>
        `),

        // 14 · try it
        page(html`
          <${Fig} name="mm-nyquist-calc" />
        `),

        // 15 · sort: meets Nyquist or aliasing
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Does it meet Nyquist (fs ≥ 2·fmax)? Tap <b>✓</b> if it does, <b>✗</b> if it\'s undersampled and will alias. Turn intervals into rates first.',
            'هل بيحقق Nyquist؟ دوس <b>✓</b> لو آه، و<b>✗</b> لو undersampled وهيعمل aliasing. لو فيه interval حوّله لـ rate الأول.')}</p></${Box}>
          <${Sort} id="nyq" bins=${A ? [['✓', 'يحقق Nyquist'], ['✗', 'aliasing']] : [['✓', 'meets Nyquist'], ['✗', 'aliasing']]} items=${A ? [
            ['كلام لحد <bdi dir="ltr">4 kHz</bdi>، متسجل بـ <bdi dir="ltr">8 kHz</bdi>', 0],
            ['نغمة <bdi dir="ltr">5 kHz</bdi>، متسجلة بـ <bdi dir="ltr">8 kHz</bdi>', 1],
            ['مزيكا لحد <bdi dir="ltr">22.05 kHz</bdi>، متسجلة بـ <bdi dir="ltr">44.1 kHz</bdi>', 0],
            ['مزيكا لحد <bdi dir="ltr">20 kHz</bdi>، متسجلة بـ <bdi dir="ltr">22.05 kHz</bdi>', 1],
            ['إشارة <bdi dir="ltr">3 kHz</bdi>، متسجلة بـ <bdi dir="ltr">11.025 kHz</bdi>', 0],
            ['إشارة <bdi dir="ltr">9 kHz</bdi>، متسجلة بـ <bdi dir="ltr">16 kHz</bdi>', 1],
            ['إشارة لحد <bdi dir="ltr">4 kHz</bdi>، بـ sample كل <bdi dir="ltr">0.0001 s</bdi>', 0],
            ['إشارة لحد <bdi dir="ltr">1.5 kHz</bdi>، بـ sample كل <bdi dir="ltr">0.5 ms</bdi>', 1]
          ] : [
            ['Speech up to 4 kHz, sampled at 8 kHz', 0],
            ['A 5 kHz tone, sampled at 8 kHz', 1],
            ['Music up to 22.05 kHz, sampled at 44.1 kHz', 0],
            ['Music up to 20 kHz, sampled at 22.05 kHz', 1],
            ['A 3 kHz signal, sampled at 11.025 kHz', 0],
            ['A 9 kHz signal, sampled at 16 kHz', 1],
            ['Up to 4 kHz, one sample every 0.0001 s', 0],
            ['Up to 1.5 kHz, one sample every 0.5 ms', 1]
          ]} />
          
        `, { sec: t('Exercise: Nyquist or not?', 'تمرين: Nyquist ولا لأ؟') }),

        // 16 · aliasing
        page(html`
          <${H2}>${t('Get it wrong, and you get aliasing', 'لو غلطت، هيطلعلك aliasing')}</${H2}>
          <${Def}>${X('<b>Undersampling</b> creates <b>digital sampling artefacts</b> called <b>aliasing</b>: a <b>false lower frequency</b> appears. Aliasing affects <b>audio, imagery and video</b>.',
            'الـ <b>Undersampling</b> بيطلّع artefacts اسمها <b>aliasing</b>، يعني <b>frequency وهمية أوطى</b>، في <b>الـ audio والصور والـ video</b>.')}</${Def}>
          <${Fig} name="mm-alias-panels" />
        `, { sec: t('Aliasing', 'الـ Aliasing') }),

        // 17 · same samples
        page(html`
          <${Fig} name="mm-same-samples" />
          <${Hand} red=${true}>${t('Same dots, three different waves. From the samples alone, nobody can tell which one was recorded.', 'نفس النقط، وتلات موجات مختلفة. من الـ samples لوحدها محدش يقدر يعرف أنهي واحدة اللي اتسجلت.')}</${Hand}>
        `),

        // 18 · hear it
        page(html`
          <${Fig} name="mm-alias-sound" head=${t('What does aliasing sound like?', 'الـ aliasing صوته عامل إزاي؟')} />
        `),

        // 19 · interview
        page(html`
          <${Interview} title=${t('Aliasing, exposed', 'الـ Aliasing على المكشوف')} sub=${t('This week\'s interview: the frequency nobody invited.', 'حوار الأسبوع: الـ frequency اللي محدش عزمها.')} lines=${A ? [
            ['هيد فيرست', 'إنت مين بالظبط؟'],
            ['الـ Aliasing', 'أنا <b>digital sampling artefact</b>. لما حد يعمل <b>undersampling</b> باظهر كـ <b>frequency وهمية أوطى</b>، في الـ audio والصور والـ video.'],
            ['هيد فيرست', 'نغمة <bdi dir="ltr">5 kHz</bdi> متسجلة بـ <bdi dir="ltr">8 kHz</bdi>، صوتها هيبقى إيه؟'],
            ['الـ Aliasing', 'هتطلع <bdi dir="ltr">3 kHz</bdi>، لأن <bdi dir="ltr">fs − f = 8 − 5</bdi>. دي قاعدة معروفة، بس مش في السلايدز.'],
            ['هيد فيرست', 'نمنعك إزاي؟'],
            ['الـ Aliasing', 'اعمل sampling <b>على الأقل <bdi dir="ltr">2·fmax</bdi></b>، وحط <b>low-pass filter قبل الـ A/D converter</b>. والـ oversampling بيقلّلني، بس بيكلّف data أكتر.'],
            ['هيد فيرست', 'آخر سؤال: عمرك حسّنت الإشارة؟'],
            ['الـ Aliasing', 'أبدًا. الجملة دي:<span class="ltr">"Aliasing improves the quality of the signal"</span>إجابتها <b>False</b>.']
          ] : [
            ['Head First', 'So who are you, exactly?'],
            ['Aliasing', 'A <b>digital sampling artefact</b>. When someone <b>undersamples</b>, I show up as a <b>false lower frequency</b>, in audio, imagery and video.'],
            ['Head First', 'What does a 5 kHz tone sound like at an 8 kHz sample rate?'],
            ['Aliasing', 'Like 3 kHz: <b>fs − f = 8 − 5</b>. That\'s a standard result, not on the slides.'],
            ['Head First', 'How do we keep you out?'],
            ['Aliasing', 'Sample at <b>at least 2·fmax</b>, and put a <b>low-pass filter before the A/D converter</b>. Oversampling makes me rarer, but costs more data.'],
            ['Head First', 'Last one: do you ever improve the signal?'],
            ['Aliasing', 'Never. <i>"Aliasing improves the quality of the signal"</i> is <b>False</b>.']
          ]} />
        `),

        // 20 · oversampling and the filter
        page(html`
          <${H2}>${t('Keeping aliasing out', 'إزاي تمنع الـ aliasing')}</${H2}>
          <${Def}>${X('<b>Oversampling</b> = sampling <b>above the Nyquist rate</b>. It reduces aliasing but costs more data.',
            'الـ <b>Oversampling</b> يعني sampling <b>أعلى من الـ Nyquist rate</b>. بيقلّل الـ aliasing بس بيكلّف data أكتر.')}</${Def}>
          <${P} small=${true}>${X('The practical implication: the signal must be <b>low-pass filtered before sampling</b>. Otherwise frequencies above the Nyquist limit appear as strange artefacts.',
            'المعنى العملي: لازم الإشارة تعدي على <b>low-pass filter قبل الـ sampling</b>. وإلا الـ frequencies اللي فوق الـ Nyquist limit هتظهر كـ artefacts غريبة.')}</${P}>
          <${Code} lines=${['Input Signal (Analog)', '  → Low Pass Filter', '  → Filtered Signal (Analog)', '  → A/D Converter', '  → Sampled Signal (Digital)']} />
          <${Box} kind="watch"><p className="hf-p small">${X('Oversampling helps to <b>reduce aliasing</b> (not SNR, not bandwidth). Increasing the sampling frequency <b>reduces aliasing</b>; it does not shrink the data. A higher rate captures <b>high-frequency components</b> accurately.',
            'الـ oversampling بيساعد إنه <b>يقلّل الـ aliasing</b> (مش الـ SNR ولا الـ bandwidth). وزيادة الـ sampling frequency <b>بتقلّل الـ aliasing</b> ومش بتصغّر الـ data. والـ rate الأعلى بيمسك الـ <b>high-frequency components</b> بدقة.')}</p></${Box}>
        `, { sec: t('Oversampling and filtering', 'الـ Oversampling والـ filter') }),

        // 21 · low-pass figure
        page(html`
          <${Fig} name="mm-lowpass" />
        `),

        // 22 · why 44.1 kHz
        page(html`
          <${H2}>${X('Why are CDs sampled at 44.1 kHz?', 'ليه الـ CD بـ <bdi dir="ltr">44.1 kHz</bdi>؟')}</${H2}>
          <${Fig} name="mm-cd-rate" />
          <${Code} lines=${[['music:  2 × 22.05 kHz = 44.1 kHz', ''], ['speech: 2 × 4 kHz    = 8 kHz', ''], ['mono = 1 channel, stereo = 2', t('constants', 'ثوابت')]]} />
        `, { sec: t('Why 44.1 kHz?', 'ليه 44.1 kHz؟') }),

        // 23 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ CD بـ <bdi dir="ltr">44.1 kHz</bdi> ولا <bdi dir="ltr">22.05 kHz</bdi>؟', 'الـ rate بتاع الـ CD هو <b><bdi dir="ltr">44.1 kHz</bdi></b>، والـ <bdi dir="ltr">22.05 kHz</bdi> هي الـ Nyquist frequency بتاعته.'],
            ['الكلام <bdi dir="ltr">11.025 kHz</bdi> ولا <bdi dir="ltr">8 kHz</bdi>؟', 'السلايد حاطة الـ speech عند <bdi dir="ltr">11.025 kHz</bdi> والتليفون عند <bdi dir="ltr">8 kHz</bdi>. بس في الحسابات والامتحان:<span class="ltr">2 × 4 kHz = <b>8 kHz</b></span>'],
            ['يعني كل ما أزوّد الـ sampling أحسن؟', 'لو اتسألت عن الزيادة فوق الـ Nyquist rate، إجابة الميدترم <b>Improves Accuracy</b>. بس ده بيكلّف data، ومش "دايمًا" بيحسّن الجودة بعد اللي السمع محتاجه.']
          ] : [
            ['Is the CD rate 44.1 kHz or 22.05 kHz?', '<b>44.1 kHz</b> is the CD sample rate; 22.05 kHz is its Nyquist frequency.'],
            ['Is speech 11.025 kHz or 8 kHz?', 'The slide lists speech at 11.025 kHz and telephone at 8 kHz. In calculations and the exam: 2 × 4 kHz = <b>8 kHz</b>.'],
            ['So is faster sampling always better?', 'The midterm\'s key for "beyond Nyquist rate" is <b>Improves Accuracy</b>. But it costs data, and past what hearing needs it does not <i>always</i> improve quality.']
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"Main reason for 8 kHz sampling in telephony"</i>: <b>Both (A) and (B)</b>, speech bandwidth (about 4 kHz) <b>and</b> avoiding aliasing (2 × 4 = 8 kHz).',
            'سبب الـ <bdi dir="ltr">8 kHz</bdi> في التليفون: <b>Both (A) and (B)</b>، يعني الـ bandwidth بتاع الكلام (حوالي <bdi dir="ltr">4 kHz</bdi>) <b>و</b>منع الـ aliasing <bdi dir="ltr">(2 × 4 = 8 kHz)</bdi>.')}</p></${Box}>
        `),

        // 24 · quality
        page(html`
          <${H2}>${t('Quality: decibels and noise', 'الجودة: الـ decibels والـ noise')}</${H2}>
          <${UL} items=${A ? [
            'الودان مش بتستجيب بشكل linear، فبنستخدم الـ <b>decibel (dB)</b>، وده مقياس logarithmic.',
            'الـ <bdi dir="ltr"><b>16‑bit</b></bdi> الـ SNR بتاعه <b><bdi dir="ltr">98 dB</bdi></b> (تقريبًا مش مسموع)، والـ <bdi dir="ltr"><b>8‑bit</b></bdi> بتاعه <b><bdi dir="ltr">50 dB</bdi></b>، فالـ <bdi dir="ltr">8‑bit</bdi> noisy أكتر <b>بحوالي 8 مرات</b>.',
            'زيادة <b><bdi dir="ltr">6 dB</bdi></b> معناها <b>الضعف في العلو</b>.'
          ] : [
            'Ears do not respond linearly, so we use the <b>decibel (dB)</b>, a logarithmic measure.',
            '<b>16-bit</b>: signal-to-noise ratio <b>98 dB</b> (virtually inaudible). <b>8-bit</b>: <b>50 dB</b>. So 8-bit is <b>roughly 8 times as noisy</b>.',
            'A <b>6 dB</b> increment is <b>twice as loud</b>.'
          ]} />
          <${Hand} red=${true}>${X('‡ "Roughly 8 times" is the slide\'s own statement. It isn\'t 48 ÷ 6: by the 6 dB rule a 48 dB gap would be 2⁸ = 256 times.',
            '‡ "حوالي 8 مرات" دي جملة السلايد نفسها، ومش جاية من <bdi dir="ltr">48 ÷ 6</bdi>: بقاعدة الـ <bdi dir="ltr">6 dB</bdi> الفرق ده يبقى <bdi dir="ltr">2⁸ = 256</bdi> مرة.')}</${Hand}>
          <${P} small=${true}>${X('Higher sample rate or bit size = better quality but <b>bigger files</b>. Hear it, then see the price:',
            'الـ sample rate أو الـ bit size الأعلى يعني جودة أحسن بس <b>ملفات أكبر</b>. اسمع الفرق، وبعدين شوف التمن:')}</${P}>
        `, { sec: t('Quality and size', 'الجودة والحجم') }),
        page(html`
          <${Fig} name="mm-quality-play" />
        `),

        // 25 · size table
        page(html`
          <${Fig} name="mm-size-table" />
        `),

        // 26 · the formula
        page(html`
          <${H2}>${t('The one formula the exam loves', 'المعادلة اللي الامتحان بيموت فيها')}</${H2}>
          <${Def}>${X('<b>Size (bits) = time (s) × sample rate (Hz) × sample size (bits) × channels.</b> Divide by 8 for bytes, by 1024 for KB, by 1024 again for MB.',
            '<b>الحجم بالـ bits</b> بيساوي:<span class="ltr"><b>time (s) × sample rate (Hz) × sample size (bits) × channels</b></span>اقسم على 8 للـ bytes، وعلى 1024 للـ KB، وعلى 1024 تاني للـ MB.')}</${Def}>
          <${UL} items=${A ? [
            'لو إداك الـ <b>sampling interval</b> بس:<span class="ltr">fs = 1 / interval</span>',
            'لو مفيش لا rate ولا interval: استخدم الثوابت، <b>الـ speech <bdi dir="ltr">8 kHz</bdi></b> والـ <b>audio <bdi dir="ltr">44.1 kHz</bdi></b>.',
            'لو الـ sample size مش مكتوب: شيت الـ Final Rules بيسيبه متغيّر (Q)، وشيت الميدترم استخدم <bdi dir="ltr">16 bits</bdi>.'
          ] : [
            'Only the <b>sampling interval</b> given? fs = 1 / interval.',
            'Neither given? Use the constants: <b>speech 8 kHz</b>, <b>audio 44.1 kHz</b>.',
            'Sample size not given? The Final Rules sheet keeps it as a variable (Q); the midterm sheet used 16 bits.'
          ]} />
          <${Code} lines=${[['Ex 1: 44.1 kHz, 16-bit, 60 s, stereo', ''], '44,100×16×60×2 = 84,672,000 bits', '÷ 8    = 10,584,000 B', '÷ 1024 = 10,335.94 KB', ['÷ 1024 ≈ 10.09 MB', t('table: 10.1 MB', 'الجدول: 10.1 MB')]]} />
        `, { sec: t('File size', 'حجم الملف') }),

        // 27 · worked example 2 + unit traps
        page(html`
          <${H2}>${t('When they give you the interval', 'لما يدّيك الـ interval')}</${H2}>
          <${P} small=${true}>${X('<b>Ex 2</b>: sampled every <b>0.000125 s</b>, 16-bit, <b>4.5 min</b>, stereo.', '<b>مثال 2</b>: فيه sample كل <bdi dir="ltr"><b>0.000125 s</b></bdi>، و<bdi dir="ltr">16‑bit</bdi>، لمدة <b>4.5 دقيقة</b>، stereo.')}</${P}>
          <${Code} lines=${['fs = 1 / 0.000125 = 8000 Hz', 't  = 4.5 × 60 = 270 s', '8000×16×270×2 = 69,120,000 bits', '÷ 8    = 8,640,000 B', ['÷ 1024 = 8437.5 KB', '✓']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Every wrong option is a unit slip. <b>500 ms</b> is 0.5 s, so fs = 1/0.5 = <b>2 Hz</b>, not 500 Hz (Ex 3: 633,600 bytes). Minutes × 60, <b>hours × 3600</b>. Bits ≠ bytes: the bits number (5,068,800) is always among the options. And mono is exactly half of stereo.',
            'كل اختيار غلط هو غلطة في الوحدات. الـ <bdi dir="ltr"><b>500 ms</b></bdi> يعني <bdi dir="ltr">0.5 s</bdi>، فالـ fs تبقى <bdi dir="ltr">1/0.5 = <b>2 Hz</b></bdi> مش <bdi dir="ltr">500 Hz</bdi> (مثال 3: <bdi dir="ltr">633,600 bytes</bdi>). الدقايق × 60، و<b>الساعات × 3600</b>. والـ bits غير الـ bytes: رقم الـ bits <bdi dir="ltr">(5,068,800)</bdi> دايمًا موجود في الاختيارات. والـ mono نص الـ stereo بالظبط.')}</p></${Box}>
        `),

        // 28 · from the signal's equation
        page(html`
          <${H2}>${t('When they give you the signal', 'لما يدّيك معادلة الإشارة')}</${H2}>
          <${P} small=${true}>${X('Each term is cos or sin of <b>2πf·t</b>: divide the number in front of t by 2π to get f in Hz. Amplitudes and phases don\'t matter.',
            'كل term هو cos أو sin لـ <bdi dir="ltr"><b>2πf·t</b></bdi>: اقسم الرقم اللي قدام الـ t على 2π تطلع الـ f بالـ Hz. الـ amplitudes والـ phases ملهاش دعوة.')}</${P}>
          <${Code} lines=${['x(t) = 2A·cos(200πt + π/3)', '     + 3A·sin(100πt − π/6)', 'f1 = 200π/2π = 100 Hz', 'f2 = 100π/2π =  50 Hz', 'fmax = 100 Hz → fs ≥ 200 Hz', ['T ≤ 1/200 = 0.005 s', t('largest interval', 'أكبر interval')]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Exam 2020/21: 10A·cos(100πt) + 20A·sin(150πt) − 200A·cos(200πt) − 2C·cos(250πt) → fmax = <b>125 Hz</b>, fs = 250 Hz, <b>T = 0.004 s</b>. The decoys: 0.01 s uses the <b>lowest</b> term, 0.008 s forgets the × 2, 0.002 s reads 250π as 250 Hz. The biggest amplitude (200A) is irrelevant.',
            'في امتحان <bdi dir="ltr">2020/21</bdi> أعلى term فيه <bdi dir="ltr">250πt</bdi>، يعني:<span class="ltr">fmax = <b>125 Hz</b> → fs = 250 Hz → <b>T = 0.004 s</b></span> الفخاخ: الـ <bdi dir="ltr">0.01 s</bdi> استخدمت <b>أوطى</b> term، والـ <bdi dir="ltr">0.008 s</bdi> نسيت الـ × 2، والـ <bdi dir="ltr">0.002 s</bdi> اعتبرت <bdi dir="ltr">250π</bdi> هي <bdi dir="ltr">250 Hz</bdi>. وأكبر amplitude <bdi dir="ltr">(200A)</bdi> ملوش دعوة.')}</p></${Box}>
        `),

        // 29 · be the calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the calculator', 'خليك إنت الآلة الحاسبة')}><p className="hf-p small">${X('Four problems, one step at a time. Every wrong option is a mistake students really make, and it tells you which.',
            'أربع مسائل، خطوة بخطوة. كل اختيار غلط هو غلطة الطلبة بيعملوها فعلًا، وهيقولك هي إيه.')}</p></${Box}>
          <${Drill} id="drill" />
        `, { sec: t('Exercise: be the calculator', 'تمرين: خليك الآلة الحاسبة') }),

        // 30 · file formats
        page(html`
          <${H2}>${t('Audio file formats', 'الـ Audio file formats')}</${H2}>
          <${P} small=${true}>${X('Popular formats: <b>.au</b>, <b>.aiff</b>, <b>.wav</b>. Compression can be used in <b>some</b> of them but is <b>not mandatory</b>. Other formats, most with compression: .voc, .sd2 (Pro Tools/Sound Designer), .ra (RealAudio), .ogg (Ogg Vorbis), AAC/Apple/mp4, .flac, Dolby AC, MPEG audio (MP3, MPEG-4).',
            'الـ formats المشهورة: <bdi dir="ltr"><b>.au</b></bdi> و<bdi dir="ltr"><b>.aiff</b></bdi> و<bdi dir="ltr"><b>.wav</b></bdi>. ينفع نستخدم compression في <b>بعضهم</b> بس <b>مش إجباري</b>. وفيه formats تانية، أغلبها بـ compression:<span class="ltr">.voc, .sd2 (Pro Tools/Sound Designer), .ra (RealAudio), .ogg (Ogg Vorbis), AAC/Apple/mp4, .flac, Dolby AC, MPEG audio (MP3, MPEG-4)</span>')}</${P}>
          <${P} small=${true}>${t('Match each one to where it comes from or what it does:', 'وصّل كل واحد بأصله أو بشغلانته:')}</${P}>
          <${Match} id="fmt" left=${['<bdi dir="ltr">.au</bdi>', '<bdi dir="ltr">.aiff</bdi>', '<bdi dir="ltr">.wav</bdi>', '<bdi dir="ltr">.voc</bdi>', 'ADPCM']} right=${A ? [
            'من الـ Mac والـ SGI',
            'بيتوقع الـ sample الجاية ويعمل encode للفرق',
            'من الـ Unix والـ Sun',
            'بتاع الـ Sound Blaster، وممكن يعمل silence deletion',
            'من الـ PC والـ DEC'
          ] : ['Mac, SGI', 'Predicts the next sample, encodes the difference', 'Unix, Sun', 'Sound Blaster; can use silence deletion', 'PC, DEC']} answer=${[2, 0, 4, 3, 1]} />
        `, { sec: t('Formats and ADPCM', 'الـ Formats والـ ADPCM') }),

        // 31 · ADPCM
        page(html`
          <${Fig} name="mm-adpcm" head=${t('ADPCM (Adaptive Delta Pulse Code Modulation): from past samples, predict the next one and encode only the difference', 'الـ ADPCM: من الـ samples اللي فاتت بيتوقع الجاية، ويعمل encode للفرق بس')} />
        `),

        // 32 · synthetic sounds
        page(html`
          <${H2}>${t('Synthetic sounds: send the recipe, not the cake', 'الأصوات الـ synthetic: ابعت الوصفة مش التورتة')}</${H2}>
          <${Hand}>${t('(the title\'s analogy is ours)', '(التشبيه في العنوان من عندنا)')}</${Hand}>
          <${UL} items=${A ? [
            'الـ synthetic sounds بتستخدم أوصاف <b>high-level</b> أكتر عشان تمثل الإشارة، وده بيقلّل الـ bandwidth.',
            'الـ <b>Synthesis pipeline</b>: بنعمل synthesise للصوت بالـ hardware أو الـ software. الـ <b>client هو اللي بيطلّع الصوت</b>، فبنبعت بس <b>الـ parameters</b> اللي بتتحكم فيه <bdi dir="ltr">(MIDI/MP4/HTML5)</bdi>.',
            'الصوت المتسجل زي الـ <b>bitmap</b>: فيه sampling منتظم، كبير، صعب تعدّله. والـ synthetic زي الـ <b>vector graphics</b>: وصف high-level، صغير، سهل تعدّله، ومحتاج تحويل قبل التشغيل. الفرق: <bdi dir="ltr">1D vs 2D</bdi>.'
          ] : [
            'Synthetic sounds use more <b>high-level</b> descriptions to represent signals, reducing bandwidth.',
            '<b>Synthesis pipeline</b>: synthesise sounds in hardware or software. The <b>client produces the sound</b>, so only <b>parameters</b> to control it are sent (MIDI/MP4/HTML5).',
            'Recorded sound ≈ a <b>bitmap</b>: regular sampling, large, hard to modify. Synthetic sound ≈ <b>vector graphics</b>: high-level, small, easy to edit, needs conversion before playback. Difference: 1D vs 2D.'
          ]} />
          <${Talk} who="spk" flip=${true}>${t('Just send me the notes. I\'ll make the sound myself.', 'ابعتلي النوت بس، وأنا هطلّع الصوت بنفسي.')}</${Talk}>
        `, { sec: t('Synthetic sounds', 'الأصوات الـ synthetic') }),

        // 33 · synthesis methods
        page(html`
          <${Fig} name="mm-synth-methods" head=${t('Seven ways to synthesise', 'سبع طرق للـ synthesis')} />
        `),

        // the doctors' questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /Maximum Frequency Equal To 5000 Hz/i)}
          <${Grow} />
          <${Talk} who="mic" flip=${true}>${t('Hint: the maximum frequency is given. You know what to do with it.', 'تلميح: الـ maximum frequency مكتوبة. إنت عارف هتعمل فيها إيه.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /Quantization Is Performed Before Sampling/i)}
          <${Gap} h=${4} />
          ${mq('m3', /MINIMUM frequency equal to 1000 Hz/)}
        `),
        page(html`
          ${mq('m4', /^The Nyquist Frequency Is:/i)}
          <${Gap} h=${4} />
          ${mq('m5', /1500πt/)}
        `),
        page(html`
          ${mq('m6', /every 0\.00125 s/)}
          <${Grow} />
          <${Hand} red=${true}>${X('Hint: fs = 1/0.00125 = 800 Hz; 6.5 h = 23,400 s. Then the formula, then ÷ 8.', 'تلميح: الـ <bdi dir="ltr">fs = 1/0.00125 = 800 Hz</bdi>، والـ 6.5 ساعة يعني <bdi dir="ltr">23,400 s</bdi>. وبعدين المعادلة، وبعدين ÷ 8.')}</${Hand}>
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Sampling</b>: نقيس الإشارة كل <b>T</b> ثابتة، و<bdi dir="ltr">fs = 1/T</bdi> بالـ <b>Hz</b>.',
            'الـ <b>Bit size</b> هو الـ quantisation. الـ <bdi dir="ltr">8‑bit</bdi> من 0 لـ 255 وبـ <bdi dir="ltr">50 dB</bdi>، والـ <bdi dir="ltr">16‑bit</bdi> من 0 لـ 65535 وبـ <bdi dir="ltr">98 dB</bdi>.',
            'نظرية <b>Nyquist</b> بتقول إن <bdi dir="ltr">fs ≥ 2·fmax</bdi>. الـ rate هو <bdi dir="ltr">2·fmax</bdi>، والـ frequency هي <bdi dir="ltr">fs/2</bdi>.',
            'الـ <b>Undersampling</b> بيعمل <b>aliasing</b>. والـ oversampling والـ low-pass filter قبل الـ A/D بيمنعوه.',
            'الـ <b>CD</b> بـ <bdi dir="ltr">44.1 kHz</bdi>، والـ <b>speech</b> بـ <bdi dir="ltr">8 kHz</bdi>.',
            'الحجم بالـ bits هو <bdi dir="ltr"><b>t × fs × bits × channels</b></bdi>، وبعدين ÷ 8 ÷ 1024.',
            'الـ <b>ADPCM</b> بيخزّن الفرق عن التوقع. والـ synthetic sound بيبعت parameters بس.'
          ] : [
            '<b>Sampling</b>: measure the signal every <b>T</b>; fs = 1/T, in <b>Hz</b>.',
            '<b>Bit size</b> = quantisation: 8-bit (0–255, 50 dB SNR), 16-bit (0–65535, 98 dB).',
            '<b>Nyquist</b>: fs ≥ 2·fmax. Nyquist rate = 2·fmax; Nyquist frequency = fs/2.',
            '<b>Undersampling</b> → <b>aliasing</b>. Oversampling and a low-pass filter before the A/D keep it out.',
            '<b>CD</b>: 44.1 kHz. <b>Speech</b>: 8 kHz.',
            'Size in bits = <b>t × fs × bits × channels</b>; ÷ 8 for bytes, ÷ 1024 for KB.',
            '<b>ADPCM</b> stores the difference from a prediction. Synthetic sound sends only parameters.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="mic">${t('Next time: making sounds from scratch. Digital audio synthesis!', 'المرة الجاية: إزاي نعمل أصوات من الصفر. الـ Digital audio synthesis!')}</${Talk}>
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

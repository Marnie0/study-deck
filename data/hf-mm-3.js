// Head First chapter for Multimedia Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Multimedia data basics: what MM systems deal with, static vs continuous media, analog and digital signals, transducers,
// ADC and DAC, digital = sampling + quantisation, the A-D-A pipeline and its two filters, capturing and storing text, graphics,
// animation, images, audio and video, the size formulas and the lecture's worked sums, and the course roadmap.
// Every fact comes from the lecture's notes; analogies and memory tricks are marked as ours. Every size below was worked by hand
// and checked with node against the notes' own answers (1/4 MB, 3/4 MB, 28.6 MB, 5,292,000 B, 6.25 MB/s, 1,244,160 B,
// 6,220,800 B, 155,520,000 B/s, 9,331,200,000 B). The lecture has none of the doctors' questions, so the exam corner uses the
// site's practice questions and says so.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T3 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mm3')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm3';
    s.textContent = `
.hfb .hf-mm3-verbs{ display:grid; gap:3px; }
.hfb .hf-mm3-verbs > div{ display:grid; grid-template-columns:26px 1fr auto; gap:9px; align-items:center; padding:2px 8px 2px 3px; border:1.5px solid var(--hf-line); border-radius:8px; background:var(--paper); }
.hfb .hf-mm3-verbs > div > b{ display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 14px/1 var(--body); }
.hfb .hf-mm3-verbs > div > span{ font:700 15px/1.1 var(--body); color:var(--ink); }
.hfb .hf-mm3-verbs > div > i{ font:500 13px/1.1 var(--body); font-style:normal; color:var(--graphite); }
.hfb .hf-mm3-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-mm3-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:8px 9px; background:var(--paper); display:grid; gap:4px; align-content:start; }
.hfb .hf-mm3-card > b{ font:800 15px/1.15 var(--body); color:var(--ink); }
.hfb .hf-mm3-card > span{ font-size:13.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-mm3-card.hf-mm3-kc{ border-color:var(--hf-k); box-shadow:3px 3px 0 color-mix(in srgb, var(--hf-k) 25%, transparent); }
/* the A-D-A pipeline as a chain */
.hfb .hf-mm3-chain{ display:grid; gap:0; justify-items:stretch; }
.hfb .hf-mm3-chain .hf-mm3-st{ display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:4px 10px; border:1.5px solid var(--hf-line); border-radius:8px; background:var(--paper); }
.hfb .hf-mm3-chain .hf-mm3-st.hf-mm3-dg{ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); border-color:var(--hf-k); }
.hfb .hf-mm3-chain .hf-mm3-st b{ font:800 14.5px/1.15 var(--body); color:var(--ink); }
.hfb .hf-mm3-chain .hf-mm3-st small{ display:block; font:500 13px/1.2 var(--body); color:var(--graphite); margin-top:1px; }
.hfb .hf-mm3-chain .hf-mm3-st em{ font:800 13px/1 var(--mono); font-style:normal; color:var(--hf-k); }
.hfb .hf-mm3-chain .hf-mm3-arw{ text-align:center; font:700 14px/1 var(--body); color:var(--graphite); height:15px; }
/* put the pipeline in order */
.hfb .hf-mm3-ord{ display:grid; gap:5px; }
.hfb .hf-mm3-ord button{ display:grid; grid-template-columns:26px 1fr; gap:8px; align-items:center; text-align:left; font:500 14px/1.25 var(--body); padding:5px 8px; min-height:36px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mm3-ord button > i{ font-style:normal; display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--hf-grey2); font:800 13px/1 var(--body); color:var(--ink); }
.hfb .hf-mm3-ord button.hf-mm3-on > i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-mm3-ord button b{ font-weight:700; }
.hfb .hf-mm3-ord button small{ font-size:13px; color:var(--graphite); }
.hfb .hf-mm3-ord button.hf-mm3-ok{ border-color:var(--ok); } .hfb .hf-mm3-ord button.hf-mm3-no{ border-color:var(--hf-red); }
.hfb .hf-mm3-msg{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-mm3-msg.hf-mm3-bad{ border-left-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
/* the size drill */
.hfb .hf-mm3-dr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-mm3-tabs{ display:flex; gap:5px; }
.hfb .hf-mm3-tabs button{ flex:1 1 0; font:800 14px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; position:relative; }
.hfb .hf-mm3-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm3-tabs button.hf-mm3-done::after{ content:""; position:absolute; top:3px; right:3px; width:6px; height:6px; border-radius:50%; background:var(--ok); }
.hfb .hf-mm3-ask{ font:600 14.5px/1.32 var(--body); margin:0; color:var(--ink); min-height:38px; }
.hfb .hf-mm3-in{ display:flex; gap:6px; align-items:center; }
.hfb .hf-mm3-in input{ flex:1 1 auto; min-width:0; font:700 16px/1 var(--mono); padding:7px 9px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); }
.hfb .hf-mm3-in span{ font:700 15px/1 var(--mono); color:var(--graphite); }
.hfb .hf-mm3-work{ font:500 13.5px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 9px; margin:0; color:var(--ink); }
.hfb .hf-mm3-work > div{ white-space:nowrap; }
.hfb .hf-mm3-work > div.hf-mm3-kw{ color:var(--hf-k); font-weight:700; }
.hfb .hf-mm3-hint{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-mm3-hint.hf-mm3-good{ color:var(--ok); font-weight:700; }
.hfb .hf-mm3-units{ display:grid; grid-template-columns:auto 1fr; gap:3px 10px; font-size:14px; line-height:1.3; }
.hfb .hf-mm3-units code{ font:700 13.5px var(--mono); }
.hf-ar .hf-mm3-verbs > div > i, .hf-ar .hf-mm3-card > span, .hf-ar .hf-mm3-ord button, .hf-ar .hf-mm3-msg, .hf-ar .hf-mm3-ask, .hf-ar .hf-mm3-hint, .hf-ar .hf-mm3-chain .hf-mm3-st small, .hf-ar .hf-mm3-units{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.45; }
.hf-ar .hf-mm3-card > b, .hf-ar .hf-mm3-chain .hf-mm3-st b, .hf-ar .hf-mm3-ord button > i, .hf-ar .hf-mm3-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm3-ord button{ text-align:right; font-size:13.5px; }
.hf-ar .hf-mm3-chain .hf-mm3-st, .hf-ar .hf-mm3-card{ text-align:right; }
.hf-ar .hf-mm3-msg{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-mm3-msg.hf-mm3-bad{ border-right-color:var(--hf-red); }
.hf-ar .hf-mm3-work{ direction:ltr; text-align:left; }
.hf-ar .hf-mm3-tabs button.hf-mm3-done::after{ right:auto; left:3px; }
.hf-ar .hf-mm3-ask{ font-size:14px; }
`;
    document.head.appendChild(s);
  }

  // the five things a multimedia system does with data
  function Verbs() {
    const ar = useAr();
    const V = [['G', 'Generation', 'بيولّدها'], ['M', 'Manipulation', 'بيعدّل فيها'], ['S', 'Storage', 'بيخزّنها'], ['P', 'Presentation', 'بيعرضها'], ['C', 'Communication', 'بيبعتها']];
    return html`<div className="hf-mm3-verbs" dir="ltr">${V.map(([l, w, g], k) => html`<div key=${k} className="hf-in" style=${{ animationDelay: calm() ? '0s' : k * 0.12 + 's' }}><b>${l}</b><span>${w}</span>${ar ? html`<i lang="ar">${g}</i>` : html`<i></i>`}</div>`)}</div>`;
  }

  // the analog → digital → analog pipeline, stage by stage
  const PIPE = [
    ['Analog conditioning', 'anti-aliasing filter', 'الـ anti-aliasing filter', 'a'],
    ['ADC', 'sampling + quantisation', 'الـ sampling والـ quantisation', 'd'],
    ['Digital processing', 'e.g. volume change, equalisation', 'زي تغيير الـ volume أو الـ equalisation', 'd'],
    ['DAC', 'discrete levels → continuous voltages', 'من discrete levels لـ voltages متصلة', 'd'],
    ['Analog conditioning', 'low-pass filter', 'الـ low-pass filter', 'a']
  ];
  function PipeChain() {
    const ar = useAr();
    return html`<div className="hf-mm3-chain">${PIPE.map(([n, en, a, k], j) => html`<${React.Fragment} key=${j}>
      ${j > 0 && html`<div className="hf-mm3-arw hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.16 + 's' }}>↓</div>`}
      <div className=${'hf-mm3-st hf-in' + (k === 'd' ? ' hf-mm3-dg' : '')} style=${{ animationDelay: calm() ? '0s' : j * 0.16 + 's' }}><div><b><bdi>${n}</bdi></b><small>${ar ? T3(a) : en}</small></div><em>${k === 'd' ? 'D' : 'A'}</em></div></${React.Fragment}>`)}</div>`;
  }

  // put the pipeline in order: tap the stages from first to last
  const SHUF = [3, 0, 4, 2, 1];
  function PipeOrder({ id }) {
    const ar = useAr();
    const [ord, setOrd] = H.K.useSlot(id, []);
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const tap = s => { setChk(false); const at = ord.indexOf(s); setOrd(at >= 0 ? ord.slice(0, at) : ord.concat(s)); };
    const good = chk && ord.length === 5 && ord.every((s, k) => s === k);
    return html`<div className="hf-in">
      <div className="hf-mm3-ord">${SHUF.map(s => { const at = ord.indexOf(s), st = chk && at >= 0 ? (at === s ? ' hf-mm3-ok' : ' hf-mm3-no') : '';
        return html`<button key=${s} className=${(at >= 0 ? 'hf-mm3-on' : '') + st} onClick=${() => tap(s)} aria-pressed=${String(at >= 0)}><i>${at >= 0 ? at + 1 : ''}</i><span><b><bdi>${PIPE[s][0]}</bdi></b> <small>· ${ar ? T3(PIPE[s][2]) : PIPE[s][1]}</small></span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${ord.length < 5} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setOrd([0, 1, 2, 3, 4]); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${ord.length > 0 && html`<button className="hf-btn" onClick=${() => { setOrd([]); setChk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div>
      ${chk && html`<p className=${'hf-mm3-msg' + (good ? '' : ' hf-mm3-bad')} style=${{ marginTop: '7px' }}>${good
        ? (ar ? 'تمام! كل مرحلة في مكانها.' : 'Right! Every stage is in its place.')
        : (ar ? 'لسه. الأحمر مكانه غلط: مفيش digital قبل الـ ADC.' : 'Not yet: the red ones are misplaced. Nothing digital before the ADC.')}</p>`}
    </div>`;
  }

  // Sharpen your pencil: work out the uncompressed size, in bytes
  const MB = 1048576;
  const DRILL = [
    { en: 'A 512 × 512 <b>grey-scale</b> image (8 bits per pixel)', ar: 'صورة <b>grey scale</b> مقاسها <bdi dir="ltr">512 × 512</bdi>، بـ 8 bits لكل pixel', a: 262144,
      work: ['512 × 512 = 262,144 pixels', '× 8 bits ÷ 8 = 262,144 B', ['÷ 1,048,576 = 0.25 MB = 1/4 MB']],
      trap: [[786432, 'That uses 3 bytes per pixel. Grey scale is 8 bits = 1 byte.', 'كده إنت حاسب 3 bytes لكل pixel. الـ grey scale بـ 8 bits يعني byte واحدة.']] },
    { en: 'The same 512 × 512 image in <b>true colour</b> (24 bits per pixel)', ar: 'نفس الصورة <bdi dir="ltr">512 × 512</bdi> بس <b>true colour</b>، بـ 24 bits لكل pixel', a: 786432,
      work: ['512 × 512 = 262,144 pixels', '× 24 bits ÷ 8 = 786,432 B', ['÷ 1,048,576 = 0.75 MB = 3/4 MB']],
      trap: [[262144, 'That is 1 byte per pixel (grey). True colour is 24 bits = 3 bytes.', 'ده byte واحدة لكل pixel (grey). الـ true colour بـ 24 bits يعني 3 bytes.']] },
    { en: 'One <b>PAL</b> frame: 720 × 576 pixels in colour (3 bytes per pixel)', ar: 'frame واحد <b>PAL</b>، يعني <bdi dir="ltr">720 × 576</bdi> pixel ملوّن (3 bytes لكل pixel)', a: 1244160,
      work: ['720 × 576 = 414,720 pixels', '× 3 B = 1,244,160 B', ['≈ 1.2 MB per frame']],
      trap: [[414720, 'That is the number of pixels. Each colour pixel takes 3 bytes.', 'ده عدد الـ pixels بس. كل pixel ملوّن بياخد 3 bytes.']] },
    { en: '<b>One second</b> of 512 × 512 monochrome video (1 byte per pixel) at 25 fps', ar: '<b>ثانية واحدة</b> video monochrome مقاسه <bdi dir="ltr">512 × 512</bdi> (byte لكل pixel) عند <bdi dir="ltr">25 fps</bdi>', a: 6553600,
      work: ['one frame = 512 × 512 × 1 B = 262,144 B', '× 25 frames = 6,553,600 B', ['= 0.25 MB × 25 = 6.25 MB per second']],
      trap: [[262144, 'That is one frame. A second has 25 of them.', 'ده frame واحد بس. الثانية فيها 25 frame.']] },
    { en: '<b>One minute</b> of <b>mono</b> CD audio (16-bit samples at 44.1 kHz)', ar: '<b>دقيقة</b> CD audio <b>mono</b>، يعني samples بـ <bdi dir="ltr">16-bit</bdi> عند <bdi dir="ltr">44.1 kHz</bdi>', a: 5292000,
      work: ['44,100 × 16 bits × 1 × 60 = 42,336,000 bits', '÷ 8 = 5,292,000 B', ['÷ 1,048,576 ≈ 5.05 MB ≈ 5 MB']],
      trap: [[10584000, 'That is stereo (2 channels). Mono is 1 channel.', 'ده stereo (2 channels). الـ mono channel واحدة.'], [2646000, 'That uses 8-bit samples. CD quality is 16-bit.', 'كده إنت حاسب الـ sample بـ 8 bits. الـ CD quality بـ 16 bits.']] },
    { en: '<b>One minute</b> of <b>stereo</b> CD audio', ar: '<b>دقيقة</b> CD audio بس <b>stereo</b>', a: 10584000,
      work: ['44,100 × 16 bits × 2 × 60 = 84,672,000 bits', '÷ 8 = 10,584,000 B', ['≈ 10.09 MB ≈ 10 MB']],
      trap: [[5292000, 'That is mono. Stereo has 2 channels.', 'ده mono. الـ stereo فيه 2 channels.']] }
  ];
  function SizeDrill({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [val, setVal] = H.K.useSlot(id + ':v' + k, '');
    const [st, setSt] = H.K.useSlot(id + ':s' + k, null);
    const [done, setDone] = H.K.useSlot(id + ':d', {});
    const d = DRILL[k];
    const n = Number(String(val).replace(/[,\s_]/g, ''));
    const hint = () => {
      if (!String(val).trim() || isNaN(n)) return [ar ? 'اكتب رقم بالـ bytes الأول.' : 'Type a number of bytes first.', false];
      if (n === d.a) return [ar ? 'مظبوط!' : 'Exactly right!', true];
      const tr = d.trap.find(x => x[0] === n); if (tr) return [ar ? tr[2] : tr[1], false];
      if (n === d.a * 8) return [ar ? 'ده الحجم بالـ bits. اقسم على 8 عشان يبقى bytes.' : 'That is the size in bits. Divide by 8 to get bytes.', false];
      if (n * 8 === d.a) return [ar ? 'شكلك قسمت على 8 مرة زيادة.' : 'Looks like you divided by 8 one time too many.', false];
      if (Math.abs(n - d.a / MB) < 0.06 || Math.abs(n - d.a / 1e6) < 0.06) return [ar ? 'ده بالـ MB. اكتب الإجابة بالـ bytes.' : 'That is in MB. Type the answer in bytes.', false];
      return [ar ? 'مش مظبوط. اضرب خطوة خطوة، أو بص على الحل.' : 'Not quite. Multiply it out step by step, or show the working.', false];
    };
    const [msg, ok] = st === 'chk' ? hint() : [null, false];
    const check = () => { setSt('chk'); if (n === d.a) setDone(Object.assign({}, done, { [k]: true })); };
    return html`<div className="hf-mm3-dr hf-in">
      <div className="hf-mm3-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${DRILL.map((_, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${done[j] ? 'hf-mm3-done' : ''} onClick=${() => setK(j)}>${j + 1}</button>`)}</div>
      <p className="hf-mm3-ask">${T3(ar ? d.ar : d.en)}</p>
      <div className="hf-mm3-in" dir="ltr"><input type="text" inputMode="numeric" value=${val} placeholder="e.g. 1,000,000" aria-label=${ar ? 'الحجم بالـ bytes' : 'Size in bytes'} onInput=${e => { setVal(e.target.value); if (st === 'chk') setSt(null); }} onKeyDown=${e => { if (e.key === 'Enter') check(); }} /><span>B</span></div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${check}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => setSt('show')}>${ar ? 'ورّيني الحل' : 'Show the working'}</button>
      </div>
      ${msg && html`<p className=${'hf-mm3-hint' + (ok ? ' hf-mm3-good' : '')}>${msg}</p>`}
      ${(st === 'show' || ok) && html`<div className="hf-mm3-work hf-in">${d.work.map((w, j) => html`<div key=${j} className=${Array.isArray(w) ? 'hf-mm3-kw' : ''}>${[].concat(w)[0]}</div>`)}</div>`}
    </div>`;
  }

  H.chapters.mm[3] = {
    title: 'Multimedia Data Basics', kicker: 'Chapter 3', run: 'multimedia data basics',
    ar: { title: 'أساسيات الـ Multimedia Data', kicker: 'الفصل 3', run: 'أساسيات الـ multimedia data' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // this lecture has none of the doctors' questions, so the exam corner uses the site's own practice questions (quiz and extra),
      // with the site's Egyptian Arabic explanation for each choice
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arL = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[3]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const q = re => {
        let i = (lec.quiz || []).findIndex(x => re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: (arL.quiz || [])[i] };
        i = (lec.extra || []).findIndex(x => re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: (arL.extra || [])[i] };
      };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · where we left off (faces the opener)
        page(html`
          <${H2}>${t('Where we left off', 'إحنا وقفنا فين')}</${H2}>
          <${P} small=${true}>${X('In Chapter 2 you met waves, decibels, filters and the Fourier transform. Now we step back and ask three questions: <b>what kinds of data</b> does a multimedia system juggle, <b>how does an analog wave get into</b> a computer, and <b>how big</b> does it all get?',
            'في الفصل التاني اتعرّفت على الـ waves والـ decibels والـ filters والـ Fourier transform. دلوقتي هنرجع خطوة لورا ونسأل تلات أسئلة: الـ multimedia system بيتعامل مع <b>أنواع data إيه</b>؟ والـ analog wave <b>بتدخل الكمبيوتر إزاي</b>؟ وكل ده <b>حجمه قد إيه</b>؟')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You answer right on the page, and your answers stay when you switch language.', '<b>حل التمارين.</b> بتجاوب على الصفحة نفسها، وإجاباتك بتفضل لو غيّرت اللغة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are traps: things that are easy to mix up, especially units.', '<b>خلّي بالك!</b> دي فخاخ: حاجات سهل تتلخبط فيها، وخصوصًا الوحدات.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t("Notes marked \"ours\" are our own analogies and tricks, not the slides'.", 'الحاجات اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('One minute of CD-quality <b>mono</b> sound. Before any compression, how many numbers does the computer store for it? A thousand? A million? More? Keep your guess; the answer is on page 31.',
            'دقيقة صوت <b>mono</b> بجودة الـ CD. قبل أي compression، الكمبيوتر بيخزّن لها كام رقم؟ ألف؟ مليون؟ أكتر؟ احتفظ بتخمينك، الإجابة في صفحة 31.')}</p></${Box}>
        `, { sec: t('Where we left off', 'إحنا وقفنا فين') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>Multimedia` : html`Chapter three<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('The World, in Numbers', 'العالم لما يبقى أرقام')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('multimedia data basics', 'أساسيات الـ multimedia data')}</p></div>
          <${Talk} who="mic">${X('I hear your voice as one smooth, <b>continuous</b> wave.', 'أنا بسمع صوتك موجة واحدة ناعمة و<b>متصلة</b>.')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('And I can only keep <b>numbers</b>. Separate ones. Lots of them.', 'وأنا مبعرفش أشيل غير <b>أرقام</b>. أرقام منفصلة. وكتير كمان.')}</${Talk}>
          <${P}>${X("Somewhere between the two, a wave turns into a list of numbers, and that list is <b>big</b>. In this chapter you'll sort media by whether they care about time, follow a signal through the <b>analog → digital → analog</b> pipeline, and learn to work out exactly how many bytes an image, a song or a minute of HD video takes.",
            'في النص بين الاتنين، الموجة بتتحول لقايمة أرقام، والقايمة دي <b>كبيرة</b>. في الفصل ده هتقسّم الـ media حسب هي فارق معاها الوقت ولا لأ، وتمشي ورا الـ signal في الـ pipeline من <b>analog لـ digital لـ analog</b>، وتتعلم تحسب بالظبط صورة أو أغنية أو دقيقة video بالـ HD بتاخد كام byte.')}</${P}>
        `, { sec: t('The world, in numbers', 'العالم لما يبقى أرقام') }),

        // 2 · what multimedia systems deal with
        page(html`
          <${H2}>${t('Five things a multimedia system does', 'خمس حاجات بيعملها الـ multimedia system')}</${H2}>
          <${P} small=${true}>${X('Multimedia systems and applications deal with information in five ways:', 'الـ multimedia systems والـ applications بتتعامل مع المعلومات بخمس طرق:')}</${P}>
          <${Verbs} />
          <${Hand} tilt=${true}>${A ? html`حيلة للحفظ (من عندنا): <bdi dir="ltr"><b>G</b>et <b>M</b>e <b>S</b>ome <b>P</b>izza, <b>C</b>hef</bdi>` : html`Memory trick (ours): <b>G</b>et <b>M</b>e <b>S</b>ome <b>P</b>izza, <b>C</b>hef`}</${Hand}>
          <${P} small=${true}>${X('All of it must be <b>digital</b> (text, graphics, images, audio, video), most of it is <b>large</b>, and the media may need <b>synchronisation</b>: the data usually has <b>temporal relationships</b> as an integral property.',
            'كل الـ data دي لازم تبقى <b>digital</b>، وأغلبها <b>حجمه كبير</b>، والـ media ممكن تحتاج <b>synchronisation</b> لأن الـ data غالبًا فيها <b>temporal relationships</b> كجزء أساسي منها.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The fifth is <b>communication</b>, not compression or synchronisation.', 'الخامسة هي الـ <b>communication</b>، مش الـ compression ولا الـ synchronisation.')}</p></${Box}>
        `, { sec: t('What MM systems deal with', 'الـ MM systems بتعمل إيه') }),

        // 3 · static vs continuous
        page(html`
          <${H1}>${t('Does it care what time it is?', 'هو فارق معاه الوقت؟')}</${H1}>
          <div className="hf-mm3-two hf-in">
            <div className="hf-mm3-card"><b>${t('Static (discrete) media', 'الـ Static (discrete) media')}</b><span>${X('<b>Time independent.</b> Normal data, text, single images, graphics.', '<b>مش معتمدة على الزمن.</b> data عادية، وtext، وصورة واحدة، وgraphics.')}</span></div>
            <div className="hf-mm3-card hf-mm3-kc"><b>${t('Continuous media', 'الـ Continuous media')}</b><span>${X('<b>Time dependent.</b> Video, animation and audio.', '<b>معتمدة على الزمن.</b> الـ video والـ animation والـ audio.')}</span></div>
          </div>
          <${P} small=${true}>${X('A page of text at noon or at midnight: same page. A song at second 10 and at second 40: different sounds.',
            'بص على صفحة text الضهر أو نص الليل: هي هي. أغنية في الثانية 10 وفي الثانية 40: صوتين مختلفين. ده الفرق كله.')}</${P}>
          <${Talk} who="dev">${t('So continuous media are the ones that need synchronisation?', 'يعني الـ continuous media هي اللي محتاجة synchronisation؟')}</${Talk}>
          <${Talk} who="cam" flip=${true}>${X('Yes. My pictures and the soundtrack run on <b>one clock</b>. If they drift apart, lips stop matching words.', 'أيوه. الصور بتاعتي والصوت ماشيين على <b>ساعة واحدة</b>. لو بعدوا عن بعض، الشفايف مش هتمشي مع الكلام.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Animation is made of graphics, and graphics are static. So why is animation listed as <b>continuous</b>?', 'الـ animation معمولة من graphics، والـ graphics static. أمال ليه الـ animation متصنفة <b>continuous</b>؟')}</p></${Box}>
        `, { sec: t('Static vs continuous', 'الـ Static والـ continuous') }),

        // 4 · the figure
        page(html`
          <${H2}>${t('Drag the clock', 'حرّك الساعة')}</${H2}>
          <${Fig} name="mm-l3-media-time" />
        `),

        // 5 · sort static / continuous
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Static or continuous? Tap <b>S</b> or <b>C</b> for each one, then check.', 'static ولا continuous؟ دوس <b>S</b> أو <b>C</b> لكل واحدة، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="sc" bins=${[['S', t('Static (discrete)', 'Static (discrete)')], ['C', t('Continuous', 'Continuous')]]} items=${A ? [
            ['مقالة text', 0],
            ['أغنية (audio)', 1],
            ['صورة واحدة من الكاميرا', 0],
            ['رسمة graphics في Illustrator', 0],
            ['فيلم video', 1],
            ['إعلان animation معمول في Flash', 1],
            ['جدول أرقام (data عادية)', 0],
            ['تسجيل صوت من الـ microphone', 1]
          ] : [
            ['A text article', 0],
            ['A song (audio)', 1],
            ['A single photo', 0],
            ['A drawing (graphics) in Illustrator', 0],
            ['A film (video)', 1],
            ['A Flash animation', 1],
            ['A table of numbers (normal data)', 0],
            ['A voice recording from a microphone', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('animation = graphics + time, so it is continuous', 'الـ animation يعني graphics + زمن، فهي continuous')}</${Hand}>
        `),

        // 6 · analog vs digital, transducers
        page(html`
          <${H1}>${t('The world is analog', 'الدنيا analog')}</${H1}>
          <${P} small=${true}>${X('Everything we sense varies smoothly. <b>Electrical sensors</b>, called <b>transducers</b>, convert what they sense into electrical signals:', 'كل حاجة بنحسها بتتغير بنعومة. الـ <b>sensors الكهربائية</b>، واسمها <b>transducers</b>، بتحوّل اللي بتحسه لـ electrical signals:')}</${P}>
          <${UL} items=${A ? ['الـ <b>thermocouple</b> بيحس بالحرارة', 'الـ <b>microphone</b> بيحس بالصوت (acoustic)', 'الـ <b>camera</b> بتحس بالضوء'] : ['<b>Thermocouple</b>: temperature', '<b>Microphone</b>: acoustic (sound)', '<b>Camera</b>: light']} />
          <${Def}>${X('<b>Analog</b>: continuous signals, which must be converted (digitised) for computer processing.<br/><b>Digital</b>: discrete signals, which a computer can readily deal with.',
            'الـ <b>Analog</b> هي signals متصلة (continuous)، ولازم تتحول (digitise) عشان الكمبيوتر يعالجها.<br/>الـ <b>Digital</b> هي signals متقطعة (discrete)، والكمبيوتر بيتعامل معاها على طول.')}</${Def}>
          <${Grow} />
          <${Talk} who="mic">${X("I'm a transducer: sound in, electrical signal out. But my signal is still <b>analog</b>. Somebody has to digitise it.", 'أنا transducer: صوت داخل وelectrical signal طالعة. بس الـ signal بتاعتي لسه <b>analog</b>. لازم حد يعملها digitise.')}</${Talk}>
        `, { sec: t('Analog and digital', 'الـ Analog والـ digital') }),

        // 7 · sensors figure
        page(html`
          <${H2}>${t('Three transducers, three signals', 'تلات transducers وتلات signals')}</${H2}>
          <${Fig} name="mm-l3-sensors" />
        `),

        // 8 · ADC and DAC
        page(html`
          <${H2}>${t('Two converters, opposite directions', 'اتنين converters، عكس بعض')}</${H2}>
          <${Def}>${X('<b>ADC (Analog-to-Digital Converter)</b>: special hardware that takes analog signals from an analog sensor (e.g. a microphone) and digitally samples them. Example: a <b>sound card</b>.',
            'الـ <b>ADC (Analog-to-Digital Converter)</b>: hardware خاص بياخد الـ analog signals من analog sensor (زي الـ microphone) ويعملها sampling بشكل digital. مثال: الـ <b>sound card</b>.')}</${Def}>
          <${Def}>${X('<b>DAC (Digital-to-Analog Converter)</b>: the converse, used for <b>playback</b>. Takes a digital signal, possibly modified (volume change, equalisation), and outputs an analog signal for an analog output device: a <b>loudspeaker</b> or an <b>RGB monitor</b>.',
            'الـ <b>DAC (Digital-to-Analog Converter)</b>: العكس، وبيُستخدم في الـ <b>playback</b>. بياخد digital signal يمكن تكون اتعدلت (تغيير الـ volume أو الـ equalisation)، ويطلّع analog signal لـ analog output device زي الـ <b>loudspeaker</b> أو الـ <b>RGB monitor</b>.')}</${Def}>
          <${Talk} who="mic">${X('I feed the <b>ADC</b>.', 'أنا بغذّي الـ <b>ADC</b>.')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${X('And the <b>DAC</b> feeds me.', 'والـ <b>DAC</b> هو اللي بيغذّيني.')}</${Talk}>
        `, { sec: t('ADC and DAC', 'الـ ADC والـ DAC') }),

        // 9 · ADC/DAC figure
        page(html`
          <${H2}>${t('Record, change the numbers, play back', 'سجّل، غيّر الأرقام، شغّل')}</${H2}>
          <${Fig} name="mm-l3-adc-dac" />
        `),

        // 10 · digital = sampling + quantisation
        page(html`
          <${H1}>${t('Digital = sampling + quantisation', 'الـ Digital يعني sampling + quantisation')}</${H1}>
          <${P} small=${true}>${X('The course boils the ADC down to two steps:', 'الكورس بيلخّص شغل الـ ADC في خطوتين:')}</${P}>
          <${Code} lines=${[['sampling', t('continuous → discrete in time', 'من متصل لمتقطع في الزمن')], ['quantisation', t('discrete → digital values', 'من متقطع لقيم digital')], ['digital = sampling + quantisation']]} />
          <${UL} items=${A ? ['الـ <b>sampling</b> بيختار <b>امتى</b> نقيس: لحظات منتظمة.', 'الـ <b>quantisation</b> بيختار <b>القيمة</b>: كل sample بتتقرّب لأقرب level مسموح.', 'الاتنين بيحصلوا جوّه الـ <b>ADC</b>.']
            : ['<b>Sampling</b> decides <b>when</b> we measure: at regular instants.', '<b>Quantisation</b> decides <b>what value</b> we keep: each sample snaps to the nearest allowed level.', 'Both happen inside the <b>ADC</b>.']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Quantisation makes a signal discrete in time": <b>False</b>. <i>Time</i> is sampling\'s job; quantisation makes the <i>values</i> discrete. And the DAC does neither: it goes the other way.',
            'دي <b>غلط</b>:<span class="ltr">"Quantisation makes a signal discrete in time"</span>الـ <i>زمن</i> ده شغل الـ sampling؛ الـ quantisation بيخلّي <i>القيم</i> discrete. والـ DAC مش بيعمل ولا واحدة فيهم، ده ماشي في الاتجاه العكس.')}</p></${Box}>
        `, { sec: t('Sampling + quantisation', 'الـ Sampling والـ quantisation') }),

        // 11 · digital figure
        page(html`
          <${H2}>${t('Step through it, then play with the sliders', 'امشي خطوة خطوة، وبعدين العب بالـ sliders')}</${H2}>
          <${Fig} name="mm-l3-digital" />
        `),

        // 12 · the pipeline
        page(html`
          <${H1}>${t('The round trip', 'رحلة الذهاب والعودة')}</${H1}>
          <${P} small=${true}>${X('Sound goes in analog, gets worked on as numbers, and comes out analog again. The lecture\'s pipeline:', 'الصوت بيدخل analog، ويتشغل عليه كأرقام، ويطلع analog تاني. الـ pipeline بتاعة المحاضرة:')}</${P}>
          <${PipeChain} />
          <${Hand} red=${true}>${t('A = analog, D = digital. Two filters guard the two analog ends.', 'الـ A يعني analog والـ D يعني digital. فيه اتنين filters حارسين الطرفين الـ analog.')}</${Hand}>
        `, { sec: t('The A-D-A pipeline', 'الـ A-D-A pipeline') }),

        // 13 · pipeline figure (tall)
        page(html`
          <${H2}>${t('Step through it, then skip a filter', 'امشي خطوة خطوة، وبعدين شيل filter')}</${H2}>
          <${Fig} name="mm-l3-pipeline" />
        `),

        // 14 · interview with the anti-aliasing filter
        page(html`
          <${Interview} title=${t('Anti-Aliasing Filter, exposed', 'الـ Anti-Aliasing Filter على المكشوف')} sub=${t("This week's interview: the bouncer at the ADC's door (the bouncer is our image, not the slides').", 'حوار الأسبوع: البودي جارد اللي على باب الـ ADC (البودي جارد ده تشبيه من عندنا).')} lines=${A ? [
            ['المذيع', 'إنت واقف فين بالظبط؟'],
            ['الـ Filter', 'عند الـ <b>input</b>، قبل الـ ADC. أنا <b>جزء أساسي من الـ analog conditioning</b>.'],
            ['المذيع', 'وبتعمل إيه؟'],
            ['الـ Filter', 'بشيل الـ <b>frequencies اللي فوق حد الـ sampling</b>، اللي لو دخلت هتعمل <b>aliasing</b>.'],
            ['المذيع', 'وبعدك؟'],
            ['الـ Filter', 'الـ ADC بيعمل <b>quantise</b> للـ input المتصل ويحوّله لـ discrete levels.'],
            ['المذيع', 'ليك قرايب؟'],
            ['الـ Filter', 'ابن عمي الـ <b>low-pass filter</b> عند الـ <b>output</b> بعد الـ DAC، بيشيل الـ <b>aliases (images)</b> اللي جت من الـ sampling.']
          ] : [
            ['Head First', 'Where exactly do you stand?'],
            ['Filter', 'At the <b>input</b>, before the ADC. I am a <b>major part of analog conditioning</b>.'],
            ['Head First', 'And your job?'],
            ['Filter', 'I remove the <b>frequencies above the sampling limit</b>, the ones that would cause <b>aliasing</b>.'],
            ['Head First', 'Who comes after you?'],
            ['Filter', 'The ADC. It <b>quantises</b> the continuous input into discrete levels.'],
            ['Head First', 'Any family in the business?'],
            ['Filter', 'My cousin, the <b>low-pass filter</b> at the <b>output</b>, after the DAC. It removes the <b>aliases (images)</b> left by the sampling.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('aliasing: you will meet it properly in Chapter 4', 'الـ aliasing: هتقابله بالتفصيل في الفصل الرابع')}</${Hand}>
        `),

        // 15 · put the pipeline in order
        page(html`
          <${H2}>${t('Rebuild the pipeline', 'ركّب الـ pipeline تاني')}</${H2}>
          <${P} small=${true}>${t('Tap the five stages in order, first to last.', 'دوس على الخمس مراحل بالترتيب، من الأول للآخر.')}</${P}>
          <${PipeOrder} id="pipe" />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Anti-aliasing at the <b>input</b>, <i>before</i> sampling: once sampled, the aliases are already in the numbers. The low-pass filter at the <b>output</b> removes the aliases (images) <i>after</i> the DAC.',
            'الـ anti-aliasing عند الـ <b>input</b> <i>قبل</i> الـ sampling، لأن بعده الـ aliases بتبقى في الأرقام خلاص. والـ low-pass عند الـ <b>output</b> <i>بعد</i> الـ DAC بيشيل الـ aliases (images).')}</p></${Box}>
        `),

        // 16 · capturing: does it need digitising?
        page(html`
          <${H1}>${t('Does it even need digitising?', 'هو محتاج digitising أصلًا؟')}</${H1}>
          <${P} small=${true}>${X('Not everything starts analog. <b>Text, graphics and some images</b> are generated directly by a computer or device (e.g. a drawing program) in a binary format, so they <b>do not require digitising</b>. Printed (and some handwritten) text is scanned via <b>OCR</b>, handwriting can be digitised by <b>electronic pen sensing</b>, and printed images are <b>flatbed scanned</b>.',
            'مش كل حاجة بتبدأ analog. الـ <b>text والـ graphics وبعض الـ images</b> بتتعمل على طول بالكمبيوتر أو الجهاز (زي برنامج رسم) في binary format، فـ <b>مش محتاجة digitising</b>. الـ text المطبوع (وشوية من المكتوب بخط الإيد) بيتعمله scan بالـ <b>OCR</b>، والخط اليدوي بالـ <b>electronic pen sensing</b>، والصور المطبوعة بـ <b>flatbed scan</b>.')}</${P}>
          <${Talk} who="cpu" flip=${true}>${X('Typed text and drawings reach me <b>already in binary</b>. Paper and sound have to be digitised first.', 'الـ text المكتوب والرسومات بيوصلولي <b>binary أصلًا</b>. الورق والصوت لازم يتعملهم digitise الأول.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('OCR is for <b>text</b>; flatbed scanning is for <b>printed images</b>; pen sensing is for <b>handwriting</b>. The exam swaps them.', 'الـ OCR للـ <b>text</b>، والـ flatbed scan للـ <b>صور المطبوعة</b>، والـ pen sensing لـ <b>الخط اليدوي</b>. الامتحان بيبدّلهم.')}</p></${Box}>
        `, { sec: t('Capturing each medium', 'التقاط كل medium') }),
        page(html`
          <${H2}>${t('How each source gets in', 'كل مصدر بيدخل إزاي')}</${H2}>
          <${Fig} name="mm-l3-capture" />
        `),

        // 17 · sort: needs digitising?
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Does it need digitising? Tap <b>Y</b> (yes) or <b>N</b> (no).', 'محتاج digitising؟ دوس <b>Y</b> (أيوه) أو <b>N</b> (لأ).')}</p></${Box}>
          <${Sort} id="dig" bins=${[['Y', t('Needs digitising', 'محتاج digitising')], ['N', t('No digitising', 'مش محتاج digitising')]]} items=${A ? [
            ['text اتكتب بالـ keyboard', 1],
            ['رسمة اتعملت في برنامج رسم', 1],
            ['صوتك من الـ microphone', 0],
            ['صورة مطبوعة في ألبوم قديم', 0],
            ['صفحة كتاب مطبوعة', 0],
            ['ملاحظة بخط الإيد', 0],
            ['video من analog camera', 0]
          ] : [
            ['Text typed on a keyboard', 1],
            ['A drawing made in a drawing program', 1],
            ['Your voice from a microphone', 0],
            ['A printed photo in an old album', 0],
            ['A printed book page', 0],
            ['A handwritten note', 0],
            ['Video from an analog camera', 0]
          ]} />
          <${Grow} />
          <${Hand}>${t('made by a computer = already binary; came from the real world = digitise it', 'اتعمل بالكمبيوتر يبقى binary أصلًا؛ جاي من الدنيا الحقيقية يبقى لازم digitise')}</${Hand}>
        `),

        // 18 · text
        page(html`
          <${H2}>${t('Text: the lightweight', 'الـ Text: الوزن الخفيف')}</${H2}>
          <${UL} items=${A ? [
            'بييجي من الـ <b>keyboard</b>، والـ <b>speech input</b>، والـ <b>OCR</b>، والـ <b>disk</b>.',
            'بيتخزن <b>byte واحدة لكل حرف</b> في الـ ASCII، و<b>أكتر</b> في الـ Unicode.',
            'الـ spreadsheets ممكن تبقى <b>text (CSV)</b> أو <b>binary</b>.',
            'الـ formatted text زي الـ HTML والـ RTF والـ Word والـ program source.',
            'مش <b>temporal</b>، بس ممكن يبقى ليه <b>sequence ضمني</b>. والحجم <b>مش مهم</b>.'
          ] : [
            'Input: <b>keyboard</b>, <b>speech input</b>, <b>OCR</b>, <b>disk</b>.',
            'Stored at <b>1 byte per character</b> (ASCII), <b>more</b> for Unicode.',
            'Spreadsheets may be <b>text (CSV)</b> or <b>binary</b>.',
            'Formatted text: HTML, RTF, Word, program source.',
            'Not <b>temporal</b>, but may have an <b>implied sequence</b>. Size is <b>not significant</b>.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Compression like <b>zip, RAR, 7-zip</b> is convenient for <b>archiving</b> text, but general-purpose compressors <b>may not work well for audio, images or video</b>. "They are the best choice for video" is the trap.',
            'الـ compression زي <b>zip وRAR و7-zip</b> مريح لـ <b>أرشفة</b> الـ text، بس الـ general-purpose compressors <b>ممكن ما تشتغلش كويس مع الـ audio والـ images والـ video</b>. الفخ إنهم يقولولك إنها أحسن اختيار للـ video.')}</p></${Box}>
          <${Grow} />
          <${Hand}>${X('3,000 ASCII characters = <b>3,000 bytes</b>. Not 24,000: that is bits.', 'تلات آلاف حرف ASCII يعني <b><bdi dir="ltr">3,000 B</bdi></b>. مش <bdi dir="ltr">24,000</bdi>، دي bits.')}</${Hand}>
        `),

        // 19 · text bytes figure
        page(html`
          <${H2}>${t('Type something and count the bytes', 'اكتب أي حاجة وعدّ الـ bytes')}</${H2}>
          <${Fig} name="mm-l3-text-bytes" />
        `),

        // 20 · graphics
        page(html`
          <${H1}>${t('Graphics: drawings you can grab', 'الـ Graphics: رسومات تقدر تمسكها')}</${H1}>
          <${UL} items=${A ? [
            'متكونة من <b>primitives</b>: الـ lines والـ polygons والـ circles والـ curves والـ arcs.',
            'بتتعمل بـ editors زي <b>Illustrator</b> و<b>Freehand</b>، أو ببرامج زي <b>PostScript</b>.',
            'الـ input بالـ keyboard والـ mouse والـ trackball والـ tablet.',
            '<b>ينفع تتختار وتتعدل</b>، عكس الـ images.',
            'الـ storage بتاعها <b>قليل</b>.'
          ] : [
            'Composed of <b>primitives</b>: lines, polygons, circles, curves, arcs.',
            'Made by editors (<b>Illustrator</b>, <b>Freehand</b>) or programs (<b>PostScript</b>).',
            'Input by keyboard, mouse, trackball, tablet.',
            '<b>Selectable and editable</b>, unlike images.',
            '<b>Low</b> storage.'
          ]} />
          <${Def}>${X('<b>OpenGL</b> is the graphics standard: a <b>cross-language, cross-platform API</b> for 2D and 3D graphics.', 'الـ <b>OpenGL</b> هو الـ standard بتاع الـ graphics: <b>API</b> للـ <bdi dir="ltr">2D/3D</bdi> graphics شغال مع لغات ومنصات مختلفة (<bdi dir="ltr">cross-language, cross-platform</bdi>).')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Not a graphics primitive: <b>pixels</b>. They belong to images.', 'أنهي مش graphics primitive؟ <b>الـ pixels</b>، دي بتاعة الـ images.')}</p></${Box}>
        `, { sec: t('Graphics vs images', 'الـ Graphics والـ images') }),

        // 21–22 · fireside chat: graphics vs image
        page(html`
          <${Fireside} sub=${t("Tonight: a Graphic and a Bitmap Image argue about who's the better picture.", 'قعدة الليلة: Graphic وBitmap Image بيتخانقوا مين فيهم الصورة الأحسن.')} />
          <${Chat} names=${[t('Graphic', 'الـ Graphic'), t('Bitmap Image', 'الـ Image')]} lines=${A ? [
            [0, 'أنا معمول من <b>primitives</b>: خطوط وpolygons ودواير وcurves وarcs.'],
            [1, 'وأنا <b>grid من الـ pixels</b>، كل pixel رقم. byte واحدة للـ grey، و3 للـ true colour.'],
            [0, 'دوس على النجمة بتاعتي وحرّكها. أنا <b>بتختار وبتعدل</b>.'],
            [1, 'عندي غالبًا تقدر تعدّل <b>pixels لوحدها أو مجموعات pixels</b> بس، زي في الـ Photoshop.'],
            [0, 'والـ <b>storage بتاعي قليل</b>. بشيل وصف الأشكال وبس.']
          ] : [
            [0, "I'm made of <b>primitives</b>: lines, polygons, circles, curves and arcs."],
            [1, "I'm a <b>grid of pixels</b>, each one a number. 1 byte each in grey, 3 in true colour."],
            [0, 'Tap my star and drag it. I am <b>selectable and editable</b>.'],
            [1, 'With me you can usually edit only <b>individual pixels or groups of pixels</b>, like in Photoshop.'],
            [0, 'And my <b>storage is low</b>. I only keep the description of the shapes.']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Graphic', 'الـ Graphic'), t('Bitmap Image', 'الـ Image')]} start=${1} lines=${A ? [
            [1, 'وأنا ممكن آجي من <b>scanner</b> أو <b>digital camera</b>، أو برنامج يولّدني.'],
            [1, 'بس نسختي <bdi dir="ltr">512 × 512</bdi> بالـ true colour حجمها <bdi dir="ltr">3/4 MB</bdi>. معترفة.'],
            [0, 'ولما أتحرك شوية شوية ببقى <b>animation</b>، و<b>compact</b> كفاية للـ network.'],
            [1, 'جرّب ترسم صورة غروب الشمس بدواير وخطوط بس.'],
            [0, 'ماشي. كل واحد فينا ليه شغلانته.']
          ] : [
            [1, 'And I come from a <b>scanner</b> or a <b>digital camera</b>, or a program generates me.'],
            [1, 'I admit a 512 × 512 true-colour me takes <b>3/4 MB</b>.'],
            [0, 'When I change a little at a time, I become <b>animation</b>, and I stay <b>compact</b> enough for networks.'],
            [1, 'Try drawing a photo of a sunset out of circles and lines.'],
            [0, 'Fine. We each have our job.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('the sunset jab is ours; everything else is from the slides', 'حكاية غروب الشمس من عندنا؛ الباقي كله من السلايدز')}</${Hand}>
        `),

        // 23 · vector vs bitmap figure
        page(html`
          <${Fig} name="mm-l3-vector-bitmap" />
        `),

        // 24 · animation
        page(html`
          <${H1}>${t('Animation: graphics that move', 'الـ Animation: graphics بتتحرك')}</${H1}>
          <${Def}>${X('<b>Animation</b> is a sequence of slightly changed graphics.', 'الـ <b>Animation</b> سلسلة graphics، كل واحدة متغيرة شوية عن اللي قبلها.')}</${Def}>
          <div className="hf-mm3-two hf-in">
            <div className="hf-mm3-card"><b>${t('2D, e.g. Flash', 'الـ 2D، زي Flash')}</b><span>${X('<b>Key-frame interpolation</b>, called <b>tweening</b>, of motion and shape.', 'الـ <b>key-frame interpolation</b>، واسمها <b>tweening</b>، للحركة والشكل.')}</span></div>
            <div className="hf-mm3-card"><b>${t('3D, e.g. Maya', 'الـ 3D، زي Maya')}</b><span>${X('Changes of shape, texture, position, lighting and camera.', 'تغييرات في الشكل والـ texture والمكان والإضاءة والكاميرا.')}</span></div>
          </div>
          <${P} small=${true}>${X('Graphics animation is <b>compact</b>, so it suits <b>network transmission</b>: you send the key frames and the primitives, and the in-betweens are computed.',
            'الـ graphics animation <b>compact</b>، فمناسبة للـ <b>network transmission</b>: بتبعت الـ key frames والـ primitives، والـ frames اللي في النص بتتحسب.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Two key frames, 13 frames shown. How many of them did nobody have to draw or store? Count them on the next page.', 'اتنين key frames و13 frame بيتعرضوا. كام واحد فيهم محدش رسمه ولا خزّنه؟ عدّهم في الصفحة الجاية.')}</p></${Box}>
        `, { sec: t('Animation', 'الـ Animation') }),

        // 25 · tween figure
        page(html`
          <${H2}>${t('Tweening, frame by frame', 'الـ Tweening، frame frame')}</${H2}>
          <${Fig} name="mm-l3-tween" />
        `),

        // 26 · match the tools
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Every name in the lecture has one job. Tap a name, then its job.', 'كل اسم في المحاضرة ليه شغلانة واحدة. دوس على الاسم، وبعدين على شغلانته.')}</${P}>
          <${Match} id="tools" left=${['OpenGL', 'Flash', 'Maya', 'Photoshop', 'Illustrator', 'OCR', 'zip / 7-zip']}
            right=${A ? ['بيعدّل pixels أو مجموعات pixels في الـ images', 'بيحوّل الـ text المطبوع لـ text digital', 'الـ 2D animation بالـ tweening', 'مريح لأرشفة الـ files', 'محرر (editor) للـ graphics primitives', 'الـ API الـ standard للـ <bdi dir="ltr">2D/3D</bdi> graphics', 'الـ 3D animation: شكل وإضاءة وكاميرا']
              : ['Edits pixels or groups of pixels in images', 'Turns printed text into digital text', '2D animation by tweening', 'Convenient for archiving', 'An editor for graphics primitives', 'Cross-platform API standard for 2D/3D graphics', '3D animation: shape, lighting, camera']}
            answer=${[5, 2, 6, 0, 4, 1, 3]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 27 · images and their size
        page(html`
          <${H1}>${t('How big is a picture?', 'الصورة حجمها قد إيه؟')}</${H1}>
          <${P} small=${true}>${X('An image is a <b>bitmap</b>: a grid of pixels (the slide shows a 10 × 10 grid of grey values from 35 to 132). It comes from a scanner or a digital camera, or a program. Each pixel costs:',
            'الـ image عبارة عن <b>bitmap</b>: grid من الـ pixels (السلايد بتورّي grid <bdi dir="ltr">10 × 10</bdi> فيها قيم grey من 35 لـ 132). بتيجي من scanner أو digital camera، أو برنامج. كل pixel بياخد:')}</${P}>
          <${Code} lines=${[['1 bit', t('B/W', 'أبيض وأسود')], ['8 bits', t('grey scale, colour map', 'grey scale أو colour map')], ['24 bits', t('true colour', 'true colour')]]} />
          <${Code} lines=${['size (B) = width × height × bits / 8']} />
          <${UL} items=${A ? ['صورة grey بمقاس <bdi dir="ltr">512 × 512</bdi> حجمها <bdi dir="ltr"><b>1/4 MB</b></bdi>.', 'ونفس المقاس بـ <bdi dir="ltr">24-bit</bdi> حجمه <bdi dir="ltr"><b>3/4 MB</b></bdi>.', 'وكاميرا <bdi dir="ltr">10+ megapixel</bdi> بتطلّع حوالي <bdi dir="ltr"><b>29 MB</b></bdi> من غير compression.']
            : ['512 × 512 grey = <b>1/4 MB</b>', '512 × 512 at 24-bit = <b>3/4 MB</b>', '10+ megapixel camera ≈ <b>29 MB</b> uncompressed']} />
          <${Grow} />
          <${Hand} red=${true}>${X('here 1 MB = 1,048,576 B: 262,144 B is exactly 1/4 of it', 'هنا الـ MB بيساوي <bdi dir="ltr">1,048,576 B</bdi>، و<bdi dir="ltr">262,144 B</bdi> هي ربعه بالظبط')}</${Hand}>
        `, { sec: t('How big is it?', 'حجمها قد إيه؟') }),

        // 28 · bitmap figure
        page(html`
          <${Fig} name="mm-l3-bitmap" />
        `),

        // 29 · audio
        page(html`
          <${H2}>${t('Audio: 44,100 numbers a second', 'الـ Audio: كل ثانية فيها 44,100 رقم')}</${H2}>
          <${P} small=${true}>${X('Audio is continuous analog, from microphones, then digitised. <b>CD quality = 16-bit at 44.1 kHz</b>: 44,100 samples every second, 16 bits each. Audiophile: 24-bit, 96 kHz.',
            'الـ Audio عبارة عن analog متصل جاي من الـ microphones، وبعدين بيتعمله digitise. الـ <b>CD quality</b> معناها <bdi dir="ltr"><b>16-bit at 44.1 kHz</b></bdi>، يعني 44,100 sample كل ثانية وكل واحدة 16 bits. والـ audiophile بيبقى <bdi dir="ltr">24-bit</bdi> و<bdi dir="ltr">96 kHz</bdi>.')}</${P}>
          <${Code} lines=${[['size = rate × bits × channels × s', t('bits', 'بالـ bits')], ['44,100 × 16 × 1 × 60', t('one mono minute', 'دقيقة mono')], '= 42,336,000 bits', '= 5,292,000 B ≈ 5 MB']} />
          <${UL} items=${A ? ['دقيقة <b>mono</b> بجودة CD حوالي <bdi dir="ltr"><b>5 MB</b></bdi>، والـ <b>stereo</b> حوالي <bdi dir="ltr"><b>10 MB</b></bdi>.', 'وعشان كده غالبًا بيتعمله compression: زي MP3 وAAC وFLAC وOgg Vorbis.']
            : ['1 min <b>mono</b> CD ≈ <b>5 MB</b>; <b>stereo</b> ≈ <b>10 MB</b>.', 'So audio is usually compressed: MP3, AAC, FLAC, Ogg Vorbis.']} />
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('Remember the Brain Power on page 1? One mono CD minute is <b>44,100 × 60 = 2,646,000 numbers</b>, each 2 bytes. You do not need sampling theory yet: why 44.1 kHz is enough is Chapter 4.',
            'فاكر شغّل مخك اللي في صفحة 1؟ دقيقة CD mono فيها <bdi dir="ltr"><b>44,100 × 60 = 2,646,000</b></bdi> رقم، وكل رقم 2 bytes. ومش محتاج نظرية الـ sampling دلوقتي: ليه <bdi dir="ltr">44.1 kHz</bdi> كفاية ده في الفصل الرابع.')}</p></${Box}>
        `),

        // 30 · video
        page(html`
          <${H2}>${t('Video: a flip book of images', 'الـ Video: كشكول صور بيتقلب')}</${H2}>
          <${P} small=${true}>${X('Video is captured by a camera (digital cameras now digitise too). Raw video is a series of images at <b>25, 30 or 50 fps</b>:', 'الـ Video بيتصوّر بكاميرا (والكاميرات الـ digital دلوقتي بتعمل digitise كمان). الـ raw video سلسلة صور بـ <b>25 أو 30 أو <bdi dir="ltr">50 fps</bdi></b>:')}</${P}>
          <${Code} lines=${['rate = frame size × fps', ['0.25 MB × 25 = 6.25 MB/s', t('512×512 mono', 'الـ mono')], ['1.2 MB × 25 = 30 MB/s', t('PAL 720×576', 'الـ PAL')], ['6 MB × 25 = 150 MB/s', t('HD 1920×1080', 'الـ HD')]]} />
          <${P} small=${true}>${X('HD Blu-ray (1920 × 1080, about 2 megapixels) at 150 MB a second is about <b>9 GB per minute</b>.', 'الـ HD Blu-ray (<bdi dir="ltr">1920 × 1080</bdi>، حوالي 2 megapixels) بـ <bdi dir="ltr">150 MB</bdi> في الثانية يعني حوالي <b><bdi dir="ltr">9 GB</bdi> في الدقيقة</b>.')}</${P}>
          <${Grow} />
          <${Talk} who="cam">${X('Nine gigabytes for one minute of me. Now you see why everyone keeps saying <b>compression</b>.', 'تسعة جيجا لدقيقة واحدة مني. دلوقتي فهمت ليه الكل بيقول <b>compression</b>.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('150 MB is <b>one second</b> of HD; a minute is 150 × 60 = 9000 MB ≈ <b>9 GB</b>. 6.25 MB is a second of 512 × 512 mono; <b>0.25 MB</b> is just one frame.',
            'الـ <bdi dir="ltr">150 MB</bdi> دي <b>ثانية واحدة</b> HD، والدقيقة <bdi dir="ltr">150 × 60 = 9000 MB ≈ 9 GB</bdi>. والـ <bdi dir="ltr">6.25 MB</bdi> ثانية <bdi dir="ltr">512 × 512</bdi> mono، والـ <bdi dir="ltr">0.25 MB</bdi> frame واحد بس.')}</p></${Box}>
        `),

        // 31 · video rate figure
        page(html`
          <${H2}>${t('Change the frame rate', 'غيّر الـ frame rate')}</${H2}>
          <${Fig} name="mm-l3-video-rate" />
        `),

        // 32 · worked figure
        page(html`
          <${H2}>${t("The lecture's four worked sums", 'الأربع حسابات المحلولة في المحاضرة')}</${H2}>
          <${Fig} name="mm-l3-worked" />
        `),

        // 33 · size drill
        page(html`
          <${Box} kind="pencil" title=${t('Be the calculator', 'خليك إنت الآلة الحاسبة')}><p className="hf-p small">${t('Work out each uncompressed size in bytes, exactly, no rounding. Commas are fine.', 'احسب كل حجم من غير compression بالـ bytes، بالظبط ومن غير تقريب. الفواصل مسموحة.')}</p></${Box}>
          <${SizeDrill} id="drill" />
          <${Grow} />
          <${Hand}>${X('pixels × bytes per pixel × frames; or rate × bits × channels × seconds ÷ 8', 'القاعدتين:<span class="ltr">pixels × bytes × frames</span><span class="ltr">rate × bits × channels × s ÷ 8</span>')}</${Hand}>
        `),

        // 34 · which MB?
        page(html`
          <${Box} kind="watch" title=${t('Watch it: which MB?', 'خلّي بالك: أنهي MB؟')}>
            <p className="hf-p small">${X('The same frame gives two answers depending on what "MB" means:', 'نفس الـ frame بيدّي إجابتين حسب الـ MB معناه إيه:')}</p>
            <div className="hf-mm3-units" dir="ltr" style=${{ marginTop: '5px' }}>
              <code>1,244,160 B</code><span>÷ 1,048,576 ≈ <b>1.19</b> → 1.2 MB</span>
              <code>1,244,160 B</code><span>÷ 1,000,000 ≈ <b>1.24</b> MB</span>
              <code>6,220,800 B</code><span>÷ 1,048,576 ≈ <b>5.93</b> → 6 MB</span>
              <code>6,220,800 B</code><span>÷ 1,000,000 ≈ <b>6.2</b> MB</span>
            </div></${Box}>
          <${Dumb} qa=${A ? [
            ['المحاضرة الأولى قالت <bdi dir="ltr">31 MB</bdi> و<bdi dir="ltr">155 MB</bdi> في الثانية، ودي بتقول 30 و150. مين الصح؟', 'الاتنين، بس بتقريب مختلف. هنا السلايد بتستخدم <bdi dir="ltr">1.2</bdi> و<bdi dir="ltr">6 MB</bdi> لكل frame، والمحاضرة الأولى <bdi dir="ltr">1.24</bdi> و<bdi dir="ltr">6.2</bdi>. الحسبة بالظبط <bdi dir="ltr">155,520,000 B/s</bdi> للـ HD. (شرح الوحدتين من عندنا.)'],
            ['ودقيقة الـ HD: <bdi dir="ltr">9 GB</bdi> ولا <bdi dir="ltr">9.3 GB</bdi>؟', 'بالظبط <bdi dir="ltr">9,331,200,000 B ≈ 9.3 GB</bdi>. السلايد بتقرّب <bdi dir="ltr">150 MB/s × 60 = 9 GB</bdi>. في الامتحان قول "حوالي <bdi dir="ltr">9 GB</bdi>" واكتب الحسبة.']
          ] : [
            ['Lecture 1 said 31 MB and 155 MB a second; this one says 30 and 150. Which is right?', 'Both, rounded differently. Here the slide uses 1.2 and 6 MB per frame; Lecture 1 uses 1.24 and 6.2. The exact HD sum is 155,520,000 B/s. (The two-units explanation is ours.)'],
            ['And the HD minute: 9 GB or 9.3 GB?', 'Exactly 9,331,200,000 B ≈ 9.3 GB. The slide rounds 150 MB/s × 60 = 9 GB. In an exam, say "about 9 GB" and show the sum.']
          ]} />
        `),

        // 35 · roadmap
        page(html`
          <${H2}>${t('Where the course goes from here', 'الكورس رايح على فين')}</${H2}>
          <${P} small=${true}>${X('Coming up: <b>digital audio, audio synthesis, MIDI, audio effects, graphics/image formats, colour representation and perception, digital video, chroma subsampling</b>.',
            'المواضيع الجاية: الـ <b>digital audio</b> والـ <b>audio synthesis</b> والـ <b>MIDI</b> والـ <b>audio effects</b> والـ <b><bdi dir="ltr">graphics/image</bdi> formats</b>، وتمثيل الألوان وإدراك الإنسان للألوان، والـ <b>digital video</b> والـ <b>chroma subsampling</b>.')}</${P}>
          <${Box} kind="bullets" title=${t('The general themes', 'المواضيع العامة')}>
            <ul className="hf-ul" style=${{ marginTop: '2px' }}>${(A ? [
              'الـ <b>sampling</b> والـ digitisation.',
              'عيوب الـ sampling، يعني الـ <b>aliasing</b>.',
              'متطلبات الـ <b>compression</b>.',
              'الـ data formats، وخصوصًا <b>الحجم</b>.',
              'من <b>إدراك الإنسان</b> بنطلع بأفكار للـ compression.',
              'ونبني لحد ما نوصل لـ multimedia compression algorithms كاملة.'
            ] : [
              '<b>Sampling</b> and digitisation.',
              'Sampling artefacts: <b>aliasing</b>.',
              '<b>Compression</b> requirements.',
              'Data formats, especially <b>size</b>.',
              '<b>Human perception → compression ideas</b>.',
              'Building up to full multimedia compression algorithms.'
            ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
          <${Grow} />
          <${Hand}>${t('you just did the "size" theme: hence compression', 'إنت لسه مخلّص موضوع "الحجم": ومن هنا الـ compression')}</${Hand}>
        `, { sec: t('Roadmap', 'الـ Roadmap') }),

        // 36–38 · exam corner: the site's practice questions (the lecture has none of the doctors')
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("These are the site's own practice questions: there are no questions from the doctors' papers on this lecture. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، لأن مفيش أسئلة من امتحانات الدكاترة على المحاضرة دي. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /Where are anti-aliasing filters placed/i)}
          <${Grow} />
          <${Talk} who="mic" flip=${true}>${t('Filter first, then sample. Never the other way round.', 'الـ filter الأول، وبعدين الـ sampling. عمرها ما تبقى بالعكس.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${mq('m2', /1 minute of uncompressed HD video/i)}
          ${mq('m3', /monochrome video at 25 fps/i)}
        `),
        page(html`
          ${mq('m4', /800 × 600 grey-scale/i)}
          ${mq('m5', /10 seconds of uncompressed mono CD/i)}
        `),

        // 39 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ MM systems: الـ <b>generation والـ manipulation والـ storage والـ presentation والـ communication</b>.',
            'الـ <b>static</b> مش معتمدة على الزمن (text وimages وgraphics)، والـ <b>continuous</b> معتمدة عليه (video وanimation وaudio).',
            'الـ <b>ADC</b> بيعمل sampling + quantisation، والـ <b>DAC</b> بيرجّعها analog للـ playback.',
            'الـ pipeline:<span class="ltr">conditioning → ADC → processing → DAC → conditioning</span>',
            'الـ anti-aliasing عند الـ input، والـ low-pass عند الـ output.',
            'الـ text بـ byte لكل حرف ASCII، والـ graphics بتتعدل، والـ animation بالـ tweening.',
            'الأحجام:<span class="ltr">w × h × bits / 8 ; rate × bits × ch × s ; frame × fps</span>'
          ] : [
            'MM systems deal with the <b>generation, manipulation, storage, presentation and communication</b> of data.',
            '<b>Static</b> media are time independent (text, images, graphics); <b>continuous</b> media are time dependent (video, animation, audio).',
            'Transducers turn temperature, sound and light into analog signals; the <b>ADC</b> digitises, the <b>DAC</b> plays back.',
            '<b>Digital = sampling + quantisation</b>, both in the ADC.',
            'Pipeline: conditioning → ADC → processing → DAC → conditioning; anti-aliasing at the input, low-pass at the output.',
            'Text: 1 byte per ASCII character. Graphics: editable primitives. Animation: tweening, compact.',
            'Image = w × h × bits / 8. Audio = rate × bits × channels × s. Video = frame size × fps.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 40 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="mic">${t('Next time: exactly how fast you must sample me, and what goes wrong if you don\'t. Nyquist!', 'المرة الجاية: لازم تعملي sampling بسرعة قد إيه بالظبط، وإيه اللي بيبوظ لو معملتش كده. الـ Nyquist!')}</${Talk}>
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

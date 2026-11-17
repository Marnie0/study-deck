// Head First chapter for Multimedia Lecture 5, Digital Audio Synthesis (built on hf.js), English + Egyptian Arabic, same pages in both.
// Subtractive synthesis and the ADSR envelope, additive synthesis, FM (with the fm_eg.m sideband example), sample-based synthesis,
// beat slicing, wavetable, granular (and PSOLA), physical modelling and Karplus-Strong.
// Every fact comes from the lecture's notes; analogies, and the envelope numbers in the ADSR toy, are ours and marked as ours.
// This lecture has none of the doctors' questions, so the exam corner uses the site's practice questions, titled as such.
// Worked numbers (checked by hand and in node): 440 ± n·30 → 410/470, 380/500, 350/530; 1000 ± n·150 → 850/1150, 700/1300, 550/1450;
// 0.04 × 11025 = 441 Hz; 22050/440 ≈ 50.1; 0.05 × 44100 = 2205; 44100/200 = 220.5; 44100/441 = 100; 44100/294 = 150; 44100/400 = 110.25.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T5 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mm5')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm5';
    s.textContent = `
.hfb .hf-mm5-menu{ display:grid; gap:6px; margin:0; padding:0; list-style:none; }
.hfb .hf-mm5-menu li{ display:grid; grid-template-columns:28px 1fr; gap:9px; align-items:start; font-size:14.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-mm5-menu li > b:first-child{ display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 13.5px/1 var(--body); }
.hfb .hf-mm5-menu li > span b{ font-weight:700; }
.hfb .hf-mm5-menu.sq li > b:first-child{ border-radius:6px; background:var(--hf-line); font-size:15px; }
.hfb .hf-mm5-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-mm5-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); display:grid; gap:3px; align-content:start; }
.hfb .hf-mm5-card > b{ font:800 14.5px/1.15 var(--body); color:var(--ink); }
.hfb .hf-mm5-card > span{ font-size:13.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-mm5-card.pro{ border-color:var(--ok); } .hfb .hf-mm5-card.pro > b{ color:var(--ok); }
.hfb .hf-mm5-card.con{ border-color:var(--hf-red); } .hfb .hf-mm5-card.con > b{ color:var(--hf-red); }
.hfb .hf-mm5-eq{ font:700 17px/1.3 var(--mono); text-align:center; color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:8px 6px; margin:0; }
.hfb .hf-mm5-eq.sm{ font-size:13.5px; line-height:1.5; text-align:left; padding:6px 9px; }
/* the ADSR key */
.hfb .hf-mm5-adsr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-mm5-tabs{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.hfb .hf-mm5-tabs button{ font:700 13px/1.15 var(--body); min-height:32px; padding:3px 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mm5-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm5-adsr svg{ display:block; width:100%; height:auto; }
.hfb .hf-mm5-adsr svg text{ font:700 13px var(--body); fill:var(--graphite); }
.hfb .hf-mm5-adsr svg text.on{ fill:var(--hf-k); }
.hfb .hf-mm5-st{ display:grid; grid-template-columns:44px 1fr; gap:8px; align-items:center; min-height:44px; }
.hfb .hf-mm5-st > b{ display:grid; place-items:center; width:42px; height:42px; border-radius:8px; background:var(--hf-k); color:var(--paper); font:800 21px/1 var(--body); }
.hfb .hf-mm5-st > b.off{ background:var(--hf-grey2); color:var(--graphite); }
.hfb .hf-mm5-st > span{ font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-mm5-key{ width:100%; min-height:38px; font-size:14.5px; }
/* spectrum */
.hfb .hf-mm5-spec svg{ display:block; width:100%; height:auto; }
.hfb .hf-mm5-spec text{ font:700 13px var(--mono); fill:var(--ink); }
.hfb .hf-mm5-spec text.j{ font:700 13px var(--body); fill:var(--graphite); }
.hfb .hf-mm5-spec .stem{ transform-box:fill-box; transform-origin:50% 100%; animation:hf-mm5-grow .6s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-mm5-grow{ from{ transform:scaleY(0); } }
@media (prefers-reduced-motion: reduce){ .hfb .hf-mm5-spec .stem{ animation:none; } }
/* fill-in tables */
.hfb .hf-mm5-fill{ border-collapse:collapse; width:100%; font:600 14px/1.2 var(--body); color:var(--ink); }
.hfb .hf-mm5-fill th{ font:800 13px/1.15 var(--body); color:var(--graphite); text-align:center; padding:0 0 5px; }
.hfb .hf-mm5-fill td{ padding:3px 2px; border-top:1px dotted var(--faint); vertical-align:middle; }
.hfb .hf-mm5-fill td.lb{ font:600 13.5px/1.25 var(--mono); }
.hfb .hf-mm5-fill td.in{ text-align:center; white-space:nowrap; }
.hfb .hf-mm5-fill input{ width:62px; height:28px; font:700 14px/1 var(--mono); border:1.5px solid var(--faint); border-radius:5px; text-align:center; background:var(--hf-grey); color:var(--ink); padding:0; margin:0; }
.hfb .hf-mm5-fill input.ok{ border-color:var(--ok); color:var(--ok); } .hfb .hf-mm5-fill input.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-mm5-fill small{ font:600 13px var(--body); color:var(--graphite); margin-left:3px; }
.hf-ar .hf-mm5-menu li, .hf-ar .hf-mm5-card > span, .hf-ar .hf-mm5-st > span{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-mm5-menu li{ font-size:13.5px; }
.hf-ar .hf-mm5-card > b, .hf-ar .hf-mm5-tabs button, .hf-ar .hf-mm5-fill th, .hf-ar .hf-mm5-menu li > b:first-child{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm5-eq{ direction:ltr; border-left:3px solid var(--hf-k); }
.hf-ar .hf-mm5-fill{ direction:ltr; }
`;
    document.head.appendChild(s);
  }

  // Press the key: the ADSR envelope as you play it. The four instruments' envelope numbers are ours; their shapes follow the slides
  // (organ: constant, dies quickly on release; guitar: loudest just after plucking, then fades; bell / piano with pedal: long release;
  // bowed strings and pads: slow attack).
  const INSTR = [
    { k: 'organ', en: 'Pipe organ', ar: 'الـ pipe organ', A: 0.03, D: 0, S: 1, R: 0.08 },
    { k: 'guitar', en: 'Guitar', ar: 'الجيتار', A: 0.01, D: 2.2, S: 0, R: 0.15 },
    { k: 'bell', en: 'Bell, or piano + pedal', ar: 'جرس، أو بيانو بالـ pedal', A: 0.01, D: 0.6, S: 0.45, R: 2.4 },
    { k: 'pad', en: 'Bowed strings / pad', ar: 'وتر بالقوس أو pad', A: 1.2, D: 0.4, S: 0.75, R: 0.9 }
  ];
  const level = (p, down, up, now) => {
    if (down == null) return { L: 0, s: '' };
    const lvAt = d => d < p.A ? d / p.A : d < p.A + p.D ? 1 - (1 - p.S) * (d - p.A) / p.D : p.S;
    if (up == null || now < up) { const d = now - down; return { L: lvAt(d), s: d < p.A ? 'A' : d < p.A + p.D ? 'D' : 'S' }; }
    const l0 = lvAt(up - down), r = now - up;
    return r < p.R ? { L: l0 * (1 - r / p.R), s: 'R' } : { L: 0, s: '' };
  };
  function AdsrKey() {
    const ar = useAr();
    const [ik, setIk] = H.K.useSlot('adsr:i', 0);
    const p = INSTR[ik];
    const [ev, setEv] = useState({ down: null, up: null });
    const [now, setNow] = useState(0);
    const clock = () => performance.now() / 1000;
    const active = ev.down != null && (ev.up == null || now - ev.up < p.R);
    useEffect(() => {
      if (!active || calm()) return;
      let raf; const f = () => { setNow(clock()); raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f);
      return () => cancelAnimationFrame(raf);
    }, [active, ev.down, ev.up]);
    useEffect(() => { setEv({ down: null, up: null }); }, [ik]);
    const press = () => { const c = clock(); setEv({ down: c, up: null }); setNow(calm() ? c + p.A + p.D + 0.6 : c); };
    const release = () => { const c = calm() ? ev.down + p.A + p.D + 0.6 : clock(); setEv({ down: ev.down, up: c }); setNow(calm() ? c + p.R + 0.01 : c); };
    const held = ev.down != null && ev.up == null;
    const cur = level(p, ev.down, ev.up, now);
    // the plot: the dashed template holds the key for 0.6 s after the decay; while you hold longer, the dot waits at the end of the
    // sustain, and after release it runs down the release segment
    const hold = p.A + p.D + 0.6, W = hold + p.R + 0.3;
    const X = t => 12 + Math.min(t, W) / W * 300, Y = L => 96 - L * 80;
    const tpl = [[0, 0], [p.A, 1], [p.A + p.D, p.S], [hold, p.S], [hold + p.R, 0]].map(([t, L]) => X(t) + ' ' + Y(L)).join(' L');
    let trace = '', dotX = X(0);
    if (ev.down != null) {
      const heldFor = (ev.up == null ? now : ev.up) - ev.down, h = Math.min(heldFor, hold), pts = [];
      const step = W / 150;
      for (let s = 0; s <= h + 1e-9; s += step) pts.push(X(s) + ' ' + Y(level(p, ev.down, null, ev.down + s).L));
      pts.push(X(h) + ' ' + Y(level(p, ev.down, null, ev.down + heldFor).L));
      dotX = X(h);
      if (ev.up != null) {
        const r = Math.min(now - ev.up, p.R);
        for (let s = 0; s <= r + 1e-9; s += step) pts.push(X(h + s) + ' ' + Y(level(p, ev.down, ev.up, ev.up + s).L));
        pts.push(X(h + r) + ' ' + Y(cur.L));
        dotX = X(h + r);
      }
      trace = 'M' + pts.join(' L');
    }
    const mid = (a, b) => X((a + b) / 2);
    const tags = [['A', mid(0, p.A)], ['D', mid(p.A, p.A + p.D)], ['S', mid(p.A + p.D, hold)], ['R', mid(hold, hold + p.R)]];
    // spread the stage letters so they never sit on top of each other
    for (let i = 1; i < tags.length; i++) if (tags[i][1] < tags[i - 1][1] + 16) tags[i][1] = tags[i - 1][1] + 16;
    const say = {
      A: ['Attack: rising to full volume', 'الـ Attack: الصوت طالع لأعلى volume'],
      D: ['Decay: dropping to the sustain level', 'الـ Decay: نازل للـ sustain level'],
      S: [p.S === 0 ? 'Sustain: the level is 0, so even holding the key it has faded' : 'Sustain: held at this level while the key is down', p.S === 0 ? 'الـ Sustain: الـ level هنا صفر، فحتى وإنت ماسك الزرار الصوت خفت' : 'الـ Sustain: ثابت على الـ level ده طول ما الزرار مداس'],
      R: ['Release: fading after you let go', 'الـ Release: بيخفت بعد ما سبت الزرار'],
      '': ['Silent. Press the key.', 'ساكت. دوس على الزرار.']
    }[cur.s];
    return html`<div className="hf-mm5-adsr hf-in">
      <div className="hf-mm5-tabs" role="group" aria-label=${ar ? 'الآلة' : 'Instrument'}>${INSTR.map((x, j) => html`<button key=${x.k} aria-pressed=${String(j === ik)} onClick=${() => setIk(j)}>${ar ? x.ar : x.en}</button>`)}</div>
      <div dir="ltr"><svg viewBox="0 0 324 118" role="img" aria-label="Envelope: volume against time, 5 seconds">
        <path d="M12 96 H316 M12 12 V96" stroke="var(--faint)" fill="none" />
        <path d=${'M' + tpl} stroke="var(--faint)" strokeWidth="2" strokeDasharray="5 4" fill="none" />
        ${trace && html`<path d=${trace} stroke="var(--hf-k)" strokeWidth="3" fill="none" strokeLinejoin="round" />`}
        ${ev.down != null && html`<circle cx=${dotX} cy=${Y(cur.L)} r="5" fill="var(--hf-k)" />`}
        ${tags.map(([s, x]) => html`<text key=${s} x=${x} y="113" textAnchor="middle" className=${cur.s === s ? 'on' : ''}>${s}</text>`)}
      </svg></div>
      <div className="hf-mm5-st"><b className=${cur.s ? '' : 'off'}>${cur.s || '·'}</b><span>${ar ? say[1] : say[0]}</span></div>
      <button className=${'hf-btn hf-mm5-key' + (held ? '' : ' solid')} onClick=${held ? release : press}>${held ? (ar ? 'سيب الزرار' : 'Release the key') : (ar ? 'دوس على الزرار' : 'Press the key')}</button>
    </div>`;
  }

  // a spectrum: the carrier at 440 Hz and the sidebands 440 ± n·30 (fm_eg.m); heights are schematic, J0 … J3 at some index I
  function Spectrum() {
    const lines = [[350, 3], [380, 2], [410, 1], [440, 0], [470, 1], [500, 2], [530, 3]];
    const X = f => 14 + (f - 335) / 210 * 296, Hh = [78, 60, 44, 30];
    return html`<div className="hf-mm5-spec hf-in" dir="ltr"><svg viewBox="0 0 324 126" role="img" aria-label="Carrier at 440 Hz with sidebands at 410 and 470, 380 and 500, 350 and 530 Hz">
      <path d="M8 100 H318" stroke="var(--hf-line)" strokeWidth="1.5" />
      ${lines.map(([f, n], k) => html`<g key=${f}>
        <rect className="stem" x=${X(f) - 4} y=${100 - Hh[n]} width="8" height=${Hh[n]} fill=${n ? 'var(--hf-hand)' : 'var(--hf-k)'} style=${{ animationDelay: calm() ? '0s' : (n * 0.25) + 's' }} />
        <text className="j" x=${X(f)} y=${100 - Hh[n] - 5} textAnchor="middle">J${n}</text>
        <text x=${X(f)} y="117" textAnchor="middle">${f}</text></g>`)}
    </svg></div>`;
  }

  // Sharpen your pencil: type the numbers, check them, or show them
  const num = s => { const v = String(s == null ? '' : s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[,\s]/g, '').replace('٫', '.'); return v === '' ? NaN : +v; };
  function Fill({ id, head, rows, tol = 0.06 }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const cells = []; rows.forEach((r, i) => r[1].forEach((c, j) => cells.push([i + '-' + j, c[0]])));
    const ok = key => { const c = cells.find(x => x[0] === key); return Math.abs(num(v[key]) - c[1]) <= tol; };
    const right = cells.filter(c => ok(c[0])).length;
    return html`<div className="hf-in">
      <table className="hf-mm5-fill"><thead><tr>${head.map((h, i) => html`<th key=${i}>${h}</th>`)}</tr></thead><tbody>
        ${rows.map((r, i) => html`<tr key=${i}><td className="lb">${T5(r[0])}</td>${r[1].map((c, j) => { const key = i + '-' + j;
          return html`<td key=${j} className="in"><input type="text" inputMode="decimal" value=${v[key] == null ? '' : v[key]} aria-label=${r[0].replace(/<[^>]+>/g, '') + ' ' + (head[j + 1] || '')}
            className=${checked && v[key] != null && v[key] !== '' ? (ok(key) ? 'ok' : 'no') : ''} onChange=${e => { setChecked(false); setV(Object.assign({}, v, { [key]: e.target.value })); }} /><small>${c[1]}</small></td>`; })}</tr>`)}
      </tbody></table>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const nv = {}; cells.forEach(([k, a]) => { nv[k] = String(a); }); setV(nv); setChecked(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${checked && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${cells.length}</bdi> صح` : right + ' / ' + cells.length + ' right'}</span>`}
      </div></div>`;
  }

  H.chapters.mm[5] = {
    title: 'Digital Audio Synthesis', kicker: 'Chapter 5', run: 'digital audio synthesis',
    ar: { title: 'الـ Digital Audio Synthesis', kicker: 'الفصل 5', run: 'الـ digital audio synthesis' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the site's practice questions on this lecture (it has none of the doctors' questions), with the Arabic "why" for each choice
      const lec = kit.course.lectures.find(l => l.n === 5);
      const arQuiz = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[5] && window.AR.mm.lectures[5].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && !x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const menu = (items, sq) => html`<ul className=${'hf-mm5-menu hf-in' + (sq ? ' sq' : '')}>${items.map(([k, x], i) => html`<li key=${i}><b>${k}</b><span>${T(x)}</span></li>`)}</ul>`;
      const two = (pro, con, h) => html`<div className="hf-mm5-two hf-in"><div className="hf-mm5-card pro"><b>${h ? h[0] : t('Advantage', 'الميزة')}</b><span>${T(pro)}</span></div><div className="hf-mm5-card con"><b>${h ? h[1] : t('Disadvantage', 'العيب')}</b><span>${T(con)}</span></div></div>`;
      const fig = (name, en, ar, after) => page(html`<${H2}>${t(en, ar)}</${H2}><${Fig} name=${name} />${after || null}`);
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("This chapter makes sound out of nothing: seven ways a computer can <b>synthesise</b> audio. Your brain remembers what's surprising, visual and a bit emotional, so that's how it's written. The facts are all from the lecture's slides.",
            'الفصل ده بيعمل صوت من مفيش: سبع طرق الكمبيوتر بيعمل بيها <b>synthesis</b> للصوت. مخك بيفتكر الحاجة اللي بتفاجئه واللي فيها صور وشوية مشاعر، فالفصل مكتوب كده. بس كل المعلومات من سلايدز المحاضرة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" and the matching games are not optional. You answer right on the page.', '<b>حل التمارين.</b> "امسك القلم" وألعاب التوصيل مش اختياري. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are traps, things that are easy to mix up. This lecture has none of the doctors' questions yet, so they come from the notes and the site's practice questions.", '<b>خلّي بالك!</b> دي فخاخ، حاجات سهل تتلخبط فيها. المحاضرة دي ملهاش أسئلة من الدكاترة لسه، فالفخاخ من النوتس ومن أسئلة التدريب بتاعة الموقع.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">5</span><span className="t">${A ? html`الفصل الخامس<br/>Multimedia` : html`Chapter five<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Seven Ways to Make a Sound', 'سبع طرق تعمل بيهم صوت')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('digital audio synthesis', 'الـ digital audio synthesis')}</p></div>
          <${Talk} who="mic">${t("No recording today? Then where does the sound come from?", 'مفيش تسجيل النهارده؟ أمال الصوت جاي منين؟')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${t('From maths: oscillators, filters, envelopes, samples, grains, even a model of a guitar string. I play whatever they hand me.', 'من الرياضة: oscillators وfilters وenvelopes وsamples وgrains، وكمان model لوتر جيتار. أنا بشغّل أي حاجة يدوهالي.')}</${Talk}>
          <${P} small=${true}>${X('The lecture opens the practical digital audio applications: <b>Digital Audio Synthesis</b> (making sounds), <b>Digital Audio Effects</b> (changing sounds) and <b>MIDI</b> (synthesis and effect control, and compression). This chapter is the first one: <b>making sounds</b>.',
            'المحاضرة بتفتح الـ digital audio applications العملية: الـ <b>Digital Audio Synthesis</b> (إنك تعمل أصوات)، والـ <b>Digital Audio Effects</b> (إنك تغيّر الأصوات)، والـ <b>MIDI</b> (للتحكم في الـ synthesis والـ effects، وللـ compression). الفصل ده عن الأولانية: <b>إنك تعمل أصوات</b>.')}</${P}>
        `, { sec: t('Seven ways', 'سبع طرق') }),

        // 2 · the seven approaches
        page(html`
          <${H2}>${t('The menu: seven synthesis approaches', 'المنيو: سبع طرق للـ synthesis')}</${H2}>
          ${menu(A ? [
            ['1', 'الـ <b>Subtractive</b>: ابدأ بصوت غني وشيل منه بـ filter.'],
            ['2', 'الـ <b>Additive</b>: ابني الصوت بجمع tones أبسط.'],
            ['3', 'الـ <b>FM</b>: فيه oscillator بيعمل modulate لـ frequency بتاع oscillator تاني.'],
            ['4', 'الـ <b>Sample-based</b>: ابدأ من أصوات متسجلة.'],
            ['5', 'الـ <b>Wavetable</b>: فيه tables كل واحد فيه period واحد، بتتقري وتتخلط.'],
            ['6', 'الـ <b>Granular</b>: حبّات grains صغيرة جدًا بتعمل cloud من الصوت.'],
            ['7', 'الـ <b>Physical Modelling</b>: بيعمل mathematical model للآلة نفسها.']
          ] : [
            ['1', '<b>Subtractive</b>: start rich, filter some away.'],
            ['2', '<b>Additive</b>: build the sound by adding simpler tones.'],
            ['3', '<b>FM</b> (Frequency Modulation): one oscillator modulates the frequency of another.'],
            ['4', '<b>Sample-based</b>: start from recorded sounds.'],
            ['5', '<b>Wavetable</b>: tables holding one period each, read and mixed.'],
            ['6', '<b>Granular</b>: tiny grains layered into a cloud of sound.'],
            ['7', '<b>Physical Modelling</b>: a mathematical model of the instrument.']
          ])}
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Why would anyone need seven ways to make one sound? As you read, keep asking of each one: how much data does it store, and how much does it compute in real time?', 'ليه حد يحتاج سبع طرق عشان يعمل صوت واحد؟ وإنت بتقرا، اسأل عن كل واحدة: بتخزّن data قد إيه، وبتحسب قد إيه في real time؟')}</p></${Box}>
        `),

        // 3 · subtractive
        page(html`
          <${H1}>${t('Subtractive: start rich, take away', 'الـ Subtractive: ابدأ غني وشيل')}</${H1}>
          <${Def}>${X('<b>Subtractive synthesis</b>: subtract overtones from a <b>harmonically rich</b> sound by applying an <b>audio filter</b> to an audio signal.', 'الـ <b>Subtractive synthesis</b>: بنشيل overtones من صوت <b>غني بالـ harmonics</b> عن طريق إننا نطبّق <b>audio filter</b> على الـ audio signal.')}</${Def}>
          <${P} small=${true}>${X('First example: the <b>Vocoder</b> ("talking robot", 1939). Popularised by <b>Moog</b> synthesisers in the 1960s and 1970s.', 'أول مثال: الـ <b>Vocoder</b> ("الروبوت اللي بيتكلم"، سنة 1939). واشتهر مع الـ <b>Moog</b> synthesisers في الستينات والسبعينات.')}</${P}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': a sculptor starts with a big block of marble and chips away everything that isn't the statue.", 'تشبيه من عندنا: النحّات بيبدأ بحتة رخام كبيرة ويكسّر كل حاجة مش من التمثال.')}</${Hand}>
          <${P} small=${true}>${X('The simple example is a <b>bowed string</b>: take a <b>sawtooth</b> generator and <b>low-pass filter</b> it to dampen the higher partials. It sounds more natural than the raw sawtooth.',
            'المثال البسيط هو <b>وتر بالقوس</b> (bowed string): خد <b>sawtooth</b> generator واعمله <b>low-pass filter</b> عشان تهدّي الـ partials العالية. صوته بيطلع طبيعي أكتر من الـ sawtooth الخام.')}</${P}>
          <${Grow} />
          <${Talk} who="spk" flip=${true}>${t('A raw sawtooth is harsh. Filtered, it starts to sound like a violin.', 'الـ sawtooth الخام صوته حاد. بعد الـ filter بيبتدي يبقى شبه الكمنجة.')}</${Talk}>
        `, { sec: t('Subtractive synthesis', 'الـ Subtractive synthesis') }),
        fig('mm-5-bowed', 'A bowed string in three steps', 'الوتر بالقوس في تلات خطوات'),

        // 5 · the voice and noise
        page(html`
          <${H2}>${t('You are a subtractive synthesiser', 'إنت نفسك subtractive synthesiser')}</${H2}>
          <${P} small=${true}>${X('Your <b>vocal cords</b> are the <b>oscillator</b> (the source). Your <b>mouth and throat</b> are the <b>filter</b>.', 'الأحبال الصوتية بتاعتك هي الـ <b>oscillator</b> (المصدر)، والبُق والزور هما الـ <b>filter</b>.')}</${P}>
          ${menu(A ? [
            ['ooh', 'الـ "ooh" بتشيل (بتقلل) معظم الـ harmonics.'],
            ['aah', 'الـ "aah" بتسيب معظم الـ harmonics موجودة.'],
            ['↔', 'لما تلف <bdi dir="ltr">ooh → aah → ooh</bdi> ده <b>sweeping filter</b>، أساس الـ <b>wah-wah</b> effect بتاع الجيتار.']
          ] : [
            ['ooh', '"ooh" removes (reduces) most of the harmonics.'],
            ['aah', '"aah" keeps most of the harmonics.'],
            ['↔', 'Sweep ooh → aah → ooh and you have a <b>sweeping filter</b>, the basis of the <b>wah-wah</b> guitar effect.']
          ], true)}
          <${Box} kind="brain"><p className="hf-p small">${X('Say <b>"ssh"</b>: that is <b>white noise</b>. Now shape your mouth to remove the high frequencies. What do you hear? The slides call it <b>pink noise</b>: a jet landing.',
            'قول <b>"ssh"</b>: ده <b>white noise</b>. دلوقتي شكّل بُقك عشان تشيل الـ frequencies العالية. سامع إيه؟ السلايدز بتسميه <b>pink noise</b>: صوت طيارة jet بتنزل.')}</p></${Box}>
          <${P} small=${true}>${X('Filtered white noise also makes <b>ocean waves</b>, <b>wind</b>, and the <b>snare and percussion</b> of early drum machines.', 'والـ white noise بعد الـ filtering بيعمل كمان صوت <b>الموج</b> و<b>الريح</b>، والـ <b>snare والـ percussion</b> في الـ drum machines القديمة.')}</${P}>
        `),

        // 6 · three elements of control
        page(html`
          <${H2}>${t('Three elements of electronic control', 'التلات عناصر الأساسية للتحكم')}</${H2}>
          ${menu(A ? [
            ['1', 'الـ <b>Source signal</b>: موجات square وpulse وsawtooth وtriangle؛ والـ synths الحديثة بتسمح بأي waveform.'],
            ['2', 'الـ <b>Filtering</b>: بنتحكم في الـ <b>cut-off frequency</b> والـ <b>resonance</b> عشان نقلّد الـ timbre بتاع آلة.'],
            ['3', 'الـ <b>Amplitude envelope</b>: بيشكّل الـ volume بتاع الـ note مع الوقت.']
          ] : [
            ['1', '<b>Source signal</b>: square, pulse, sawtooth and triangle waves; modern synths allow arbitrary waveforms.'],
            ['2', '<b>Filtering</b>: the <b>cut-off frequency</b> and <b>resonance</b> are controlled to simulate an instrument\'s timbre.'],
            ['3', '<b>Amplitude envelope</b>: shapes the note\'s volume over time.']
          ])}
          <${Box} kind="watch"><p className="hf-p small">${X('The amplitude envelope is <b>strictly not subtractive</b> synthesis. It is just used with it all the time, and with the other techniques too.', 'الـ amplitude envelope <b>بالظبط هو مش subtractive</b> synthesis. هو بس بيتستخدم معاه كتير، ومع التقنيات التانية كمان.')}</p></${Box}>
          <${P} small=${true}>${X("Why an envelope at all? Every real instrument's volume changes over time <b>in its own way</b>. A <b>pipe organ</b> plays at constant volume and dies quickly when you let go. A <b>guitar</b> is loudest right after you pluck it, then fades.",
            'ليه محتاجين envelope أصلًا؟ كل آلة حقيقية الـ volume بتاعها بيتغير مع الوقت <b>بطريقتها</b>. الـ <b>pipe organ</b> بيعزف بـ volume ثابت وبيموت بسرعة لما تسيب الزرار. والـ <b>جيتار</b> بيبقى أعلى حاجة بعد ما تشد الوتر على طول، وبعدين بيخفت.')}</${P}>
        `, { sec: t('The ADSR envelope', 'الـ ADSR envelope') }),

        // 7 · ADSR definitions
        page(html`
          <${H1}>${t('Four letters: A, D, S, R', 'أربع حروف: A وD وS وR')}</${H1}>
          <${P} small=${true}>${X('The <b>ADSR envelope</b> modulates some aspect of the sound over time: usually the <b>volume</b>, but also a filter frequency or an oscillator pitch.', 'الـ <b>ADSR envelope</b> بيعمل modulate لجانب من الصوت مع الوقت: غالبًا الـ <b>volume</b>، وممكن الـ filter frequency أو الـ pitch بتاع الـ oscillator.')}</${P}>
          ${menu(A ? [
            ['A', 'الـ <b>Attack</b>: بيوصل لأعلى volume بسرعة قد إيه بعد ما تدوس الزرار. تقريبًا فوري في الآلات الميكانيكية، وبطيء في الـ bowed strings والـ pads.'],
            ['D', 'الـ <b>Decay</b>: بينزل من الـ peak للـ sustain level بسرعة قد إيه.'],
            ['S', 'الـ <b>Sustain</b>: الـ volume الثابت اللي بيفضل لحد ما تسيب الزرار.'],
            ['R', 'الـ <b>Release</b>: بيخفت بسرعة قد إيه بعد ما تسيب الزرار. قصير جدًا في الـ organ، وطويل في الجرس أو البيانو بالـ sustain pedal.']
          ] : [
            ['A', '<b>Attack</b>: how quickly the sound reaches full volume after the key is pressed. Almost instant for most mechanical instruments; slow for bowed strings and "pads".'],
            ['D', '<b>Decay</b>: how quickly it drops from the peak to the sustain level.'],
            ['S', '<b>Sustain</b>: the constant volume held until the key is released.'],
            ['R', '<b>Release</b>: how quickly it fades after the key is released. Very short for an organ; long for a bell or a piano with the sustain pedal.']
          ], true)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Three of the four are <b>times</b> (how quickly). <b>Sustain is a level, not a time.</b>', 'تلاتة من الأربعة <b>أوقات</b> (بسرعة قد إيه). <b>الـ Sustain ده level مش وقت.</b>')}</p></${Box}>
        `),

        // 8 · the ADSR key
        page(html`
          <${H2}>${t('Press the key', 'دوس على الزرار')}</${H2}>
          <${P} small=${true}>${t('Pick an instrument, press the key, hold it, then release it. Watch which stage you are in.', 'اختار آلة، دوس على الزرار، استنى شوية، وبعدين سيبه. اتفرج إنت في أنهي مرحلة.')}</${P}>
          <${AdsrKey} />
          <${Grow} />
          <${Hand} red=${true}>${t("The shapes are the slides'; the exact numbers are ours. Try the guitar: it fades even while you hold the key.", 'الأشكال من السلايدز، والأرقام بالظبط من عندنا. جرّب الجيتار: بيخفت حتى وإنت ماسك الزرار.')}</${Hand}>
        `),

        // 9 · sort ADSR
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which stage is it? Tap <b>A</b>, <b>D</b>, <b>S</b> or <b>R</b> for each line, then check.', 'دي أنهي مرحلة؟ دوس <b>A</b> أو <b>D</b> أو <b>S</b> أو <b>R</b> لكل سطر، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="adsr" bins=${[['A', 'Attack'], ['D', 'Decay'], ['S', 'Sustain'], ['R', 'Release']]} items=${A ? [
            ['بيوصل لأعلى volume بعد ما تدوس', 0],
            ['ثابت لحد ما تسيب الزرار', 2],
            ['بيخفت بعد ما تسيب الزرار', 3],
            ['بينزل من الـ peak للـ sustain level', 1],
            ['بطيء في الـ bowed strings والـ pads', 0],
            ['طويل في الجرس', 3],
            ['ده level مش وقت', 2]
          ] : [
            ['Reaching full volume after the key is pressed', 0],
            ['Held constant until the key is released', 2],
            ['Fading after the key is released', 3],
            ['Dropping from the peak to the sustain level', 1],
            ['Slow for bowed strings and pads', 0],
            ['Long for a bell', 3],
            ['A level, not a time', 2]
          ]} />
        `),

        // 10 · MATLAB
        page(html`
          <${H2}>${t('In MATLAB: subtract_synth.m', 'في الـ MATLAB: الملف subtract_synth.m')}</${H2}>
          <${Code} lines=${["y = synth(440,2,0.9,22050,'saw');", "[B, A] = butter(1, 0.04, 'low');", "[B, A] = butter(4, 0.04, 'low');", 'yf = filter(B, A, y);']} />
          <${P} small=${true}>${X('A 440 Hz sawtooth at Fs = 22050. The cut-off <code>0.04</code> is <b>relative to Nyquist</b> (22050 / 2 = 11025):', 'فيه sawtooth عند <bdi dir="ltr">440 Hz</bdi> و<bdi dir="ltr">Fs = 22050</bdi>. الـ cut-off اللي هو <code>0.04</code> ده <b>نسبة من الـ Nyquist</b>:')}</${P}>
          <p className="hf-mm5-eq hf-in">0.04 × 11025 = 441 Hz</p>
          <${Box} kind="watch"><p className="hf-p small">${X('Not 0.04 Hz, and not 0.04 × 22050 = 882 Hz. Multiply by the <b>Nyquist</b> frequency, Fs / 2.', 'مش <bdi dir="ltr">0.04 Hz</bdi>، ومش <bdi dir="ltr">0.04 × 22050 = 882 Hz</bdi>. اضرب في الـ <b>Nyquist</b> frequency اللي هي <bdi dir="ltr">Fs / 2</bdi>.')}</p></${Box}>
          <${P} small=${true}>${X("The <b>4th-order</b> filter removes more of the high partials. And <code>synth.m</code> builds its sawtooth with <code>ramp - fix(ramp)</code> and a period of T = Fs / freq = 22050 / 440 ≈ <b>50.1 samples</b>; its non-linear up slope sounds slightly less harsh.",
            'الـ filter الـ <b>4th-order</b> بيشيل من الـ partials العالية أكتر. والـ <code>synth.m</code> بيبني الـ sawtooth بـ <code>ramp - fix(ramp)</code> وperiod طوله:<span class="ltr">T = Fs / freq = 22050 / 440 ≈ 50.1 samples</span>والـ up slope بتاعه non-linear فصوته أقل حدة شوية.')}</${P}>
        `),

        // 11 · additive
        page(html`
          <${H1}>${t('Additive: build it up from sines', 'الـ Additive: ابنيه من sines')}</${H1}>
          <${Def}>${X('<b>Additive synthesis</b>: complex tones are created by the <b>summation (addition) of simpler ones</b>. <b>Frequency mixing</b> is its essence.', 'الـ <b>Additive synthesis</b>: الـ tones المعقدة بتتعمل عن طريق <b>جمع tones أبسط</b>. الـ <b>Frequency mixing</b> هو جوهرها.')}</${Def}>
          <${UL} items=${A ? [
            'كل <b>partial</b> ليه الـ <b>amplitude envelope بتاعه</b>، فالـ partials بتتصرف مستقلة عن بعض. والمصادر ممكن تكون synthesis تاني أو samples.',
            'الأساس هو الـ <b>Fourier theory</b>: أي timbre بعد ما تحلله لـ sinusoids تقدر تبنيه تاني بإنك تجمعهم.',
            'أمثلة: الـ pipe والـ Hammond organs، والـ <b>Telharmonium</b> (synthesiser كهربائي عملاق من أوائل القرن العشرين)، والـ Fairlight CMI والـ Synclavier.'
          ] : [
            'Each frequency component (<b>partial</b>) has <b>its own amplitude envelope</b>, so the partials behave independently. Sources can be other synthesis forms or samples.',
            'Its basis is <b>Fourier theory</b>: a timbre analysed into sinusoids can be rebuilt by adding them.',
            'Examples: pipe and Hammond organs, the <b>Telharmonium</b> (a giant 1900s electrical synthesiser), the Fairlight CMI, Synclavier, Kawai K5000.'
          ]} />
          ${two(t('Recreates the <b>micro-variations</b> of each partial that make natural sounds rich and lively.', 'بيعيد عمل الـ <b>micro-variations</b> بتاعة كل partial، اللي بتخلي الصوت الطبيعي غني وفيه حياة.'),
            t('<b>Inefficient</b>: a detailed sound needs a great deal of data.', 'مش <b>efficient</b>: الصوت المفصّل محتاج data كتير جدًا.'))}
        `, { sec: t('Additive synthesis', 'الـ Additive synthesis') }),
        fig('mm-5-square', 'A square wave: 100, 300, 500 Hz …', 'موجة square من الـ odd harmonics'),

        // 13 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Subtractive and Additive argue about the right way to make a sound.", 'قعدة الليلة: الـ Subtractive والـ Additive بيتخانقوا على الطريقة الصح لعمل صوت.')} />
          <${Chat} names=${[t('Subtractive', 'الـ Subtractive'), t('Additive', 'الـ Additive')]} lines=${A ? [
            [0, 'أنا بابدأ بصوت <b>غني أصلًا</b>، sawtooth أو noise، وبشيل اللي مش عايزه بـ <b>filter</b>.'],
            [1, 'وأنا بابدأ من الصفر. بجمع sines، كل <b>partial</b> وليه <b>envelope</b> بتاعه.'],
            [1, 'معترف إني <b>مش efficient</b>. بس بقدر أعمل الـ <b>micro-variations</b> اللي بتدّي الصوت الطبيعي حياة.'],
            [0, 'أنا عندي الـ <b>Vocoder</b> والـ <b>Moog</b>.'],
            [1, 'وأنا عندي الـ organs والـ <b>Telharmonium</b>. والـ <b>Fourier</b> في صفي.']
          ] : [
            [0, 'I start with a sound that\'s <b>already rich</b>, a sawtooth or noise, and <b>filter</b> away what I don\'t want.'],
            [1, 'I start from nothing. I add sines, each <b>partial</b> with <b>its own envelope</b>.'],
            [1, 'I admit I\'m <b>inefficient</b>. But I can recreate the <b>micro-variations</b> that make natural sounds lively.'],
            [0, 'I gave you the <b>Vocoder</b> and the <b>Moog</b>.'],
            [1, 'I gave you organs and the <b>Telharmonium</b>. And <b>Fourier</b> is on my side.']
          ]} />
          <${Grow} />
          <${Hand}>${X('From the slides: the <b>Aphex Twin spectrogram</b> "paints" sinusoids from image intensity and pixel location.', 'من السلايدز: الـ <b>Aphex Twin spectrogram</b> بي"رسم" sinusoids من شدة الصورة ومكان الـ pixel.')}</${Hand}>
        `),

        // 14 · FM intro
        page(html`
          <${H1}>${t('FM: one oscillator bends another', 'الـ FM: واحد بيلوي التاني')}</${H1}>
          <${P} small=${true}>${X('The timbre of a simple waveform changes when you <b>frequency-modulate</b> it: you get a more complex waveform.', 'الـ timbre بتاع waveform بسيطة بيتغير لما تعملها <b>frequency modulation</b>: بتطلع waveform أعقد.')}</${P}>
          <${Talk} who="dev">${t('Who thought of that?', 'مين اللي فكّر في كده؟')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${X('<b>John Chowning</b>, at Stanford, 1967–68. He sped up a vibrato until it made audible <b>sidebands</b> (a timbre change) instead of a warble (a pitch change).', 'ده <b>John Chowning</b> في Stanford سنة <bdi dir="ltr">1967–68</bdi>. سرّع الـ vibrato لحد ما عمل <b>sidebands</b> مسموعة (تغيير في الـ timbre) بدل التموّج (تغيير في الـ pitch).')}</${Talk}>
          <${P} small=${true}>${X('Patented in 1975 and licensed to <b>Yamaha</b> (the <b>DX7</b>; also Casio CZ) in the 1980s. It is done <b>digitally</b>, because analog oscillators are unstable, and the DX synths use <b>sine waves</b> for both oscillators.',
            'اتعملها patent سنة 1975 واترخصت لـ <b>Yamaha</b> (الـ <b>DX7</b>، وكمان الـ Casio CZ) في الثمانينات. بتتعمل <b>digitally</b> لأن الـ analog oscillators مش stable، والـ DX synths بتستخدم <b>sine waves</b> للـ oscillators الاتنين.')}</${P}>
          <${Def}>${X('<b>Oscillator</b>: a device that generates waveforms. <b>Carrier</b>: the oscillator being modulated. <b>Modulator</b>: the oscillator doing the modulating.', 'الـ <b>Oscillator</b> جهاز بيطلّع waveforms. والـ <b>Carrier</b> هو اللي بيتعمله modulation. والـ <b>Modulator</b> هو اللي بيعمل الـ modulation.')}</${Def}>
        `, { sec: t('FM synthesis', 'الـ FM synthesis') }),

        // 15 · the equation and Bessel
        page(html`
          <${H2}>${t('The FM equation', 'معادلة الـ FM')}</${H2}>
          <p className="hf-mm5-eq hf-in">e = A sin(αt + I sin βt)</p>
          <${UL} items=${A ? [
            'الـ <b>A</b> هو الـ peak amplitude، والـ <b>e</b> هو الـ instantaneous amplitude.',
            'الـ <b>α</b> هو frequency الـ carrier، والـ <b>β</b> هو frequency الـ modulator.',
            'الـ <b>I</b> هو الـ <b>modulation index</b>:<span class="ltr">I = peak deviation / modulator frequency</span>'
          ] : [
            '<b>A</b> = peak amplitude, <b>e</b> = instantaneous amplitude.',
            '<b>α</b> = carrier frequency, <b>β</b> = modulator frequency.',
            '<b>I</b> = <b>modulation index</b> = peak deviation / modulator frequency.'
          ]} />
          <${P} small=${true}>${X('Expand it with <b>Bessel functions</b> and the side frequencies appear:', 'لو فكّيتها بالـ <b>Bessel functions</b> الـ side frequencies بتظهر:')}</${P}>
          <p className="hf-mm5-eq sm hf-in">e = A{ J0 sin αt<br/>  + J1[sin(α+β)t − sin(α−β)t]<br/>  + J2[ … (α ± 2β)t … ] + … }</p>
          <${UL} items=${A ? [
            'يعني الـ sidebands عند <bdi dir="ltr"><b>α ± nβ</b></bdi>.',
            'الـ <bdi dir="ltr">J0(I)</bdi> بيحدد amplitude الـ <b>carrier</b>، والـ <bdi dir="ltr">Jn(I)</bdi> بيحدد الـ sidebands رقم n فوق وتحت.',
            'الـ sidebands العالية بيبقى فيها energy بس لما I تبقى <b>كبيرة</b>، والـ bandwidth بيكبر مع I. ولو <bdi dir="ltr">I > 1</bdi> الـ energy بتتسرق من الـ carrier أكتر وأكتر.'
          ] : [
            'So the sidebands sit at <b>α ± nβ</b>.',
            '<b>J0(I)</b> sets the <b>carrier</b> amplitude; <b>Jn(I)</b> sets the n-th upper and lower sidebands.',
            'Higher-order sidebands only get significant energy when I is <b>large</b>; the bandwidth grows with I; if I &gt; 1, energy is increasingly stolen from the carrier.'
          ]} />
        `),

        // 16 · worked example
        page(html`
          <${H2}>${t('Worked example: fm_eg.m', 'مثال محلول: الملف fm_eg.m')}</${H2}>
          <${P} small=${true}>${X('Carrier <b>fc = 440 Hz</b>, modulator <b>fm = 30 Hz</b>, and I rises from 0 to 20 over 2 s. The sidebands sit at <b>fc ± n·fm</b>:', 'الـ carrier <bdi dir="ltr"><b>fc = 440 Hz</b></bdi> والـ modulator <bdi dir="ltr"><b>fm = 30 Hz</b></bdi>، والـ I بيطلع من 0 لـ 20 في ثانيتين. الـ sidebands عند <bdi dir="ltr"><b>fc ± n·fm</b></bdi>:')}</${P}>
          <${Code} lines=${[['n = 1: 440 ± 30 = 410, 470 Hz', 'J1'], ['n = 2: 440 ± 60 = 380, 500 Hz', 'J2'], ['n = 3: 440 ± 90 = 350, 530 Hz', 'J3']]} />
          <${Spectrum} />
          <${Hand} arrow="up">${X('heights sketched. As I grows during the note, more sidebands gain energy: a brighter, more complex sound.', 'الأطوال تقريبية. وكل ما I تكبر، sidebands أكتر بتاخد energy والصوت يبقى أنصع وأعقد.')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>n multiplies the modulator</b>, not the carrier. 880 and 1320 Hz (2 × 440, 3 × 440) are not FM sidebands.', 'الـ <b>n بيضرب في الـ modulator</b> مش الـ carrier، فالـ <bdi dir="ltr">880 Hz</bdi> والـ <bdi dir="ltr">1320 Hz</bdi> مش sidebands.')}</p></${Box}>
        `, { sec: t('Worked example: sidebands', 'مثال محلول: الـ sidebands') }),
        fig('mm-5-fm-eg', 'Let I rise and watch the sidebands', 'سيب I تكبر واتفرج على الـ sidebands'),

        // 18 · your turn
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Your turn. A <b>1000 Hz</b> carrier, a <b>150 Hz</b> modulator. Type the lower and upper sideband for each n.', 'دورك. الـ carrier <bdi dir="ltr"><b>1000 Hz</b></bdi> والـ modulator <bdi dir="ltr"><b>150 Hz</b></bdi>. اكتب الـ sideband اللي تحت واللي فوق لكل n.')}</p></${Box}>
          <${Fill} id="fm" head=${['', t('lower', 'تحت'), t('upper', 'فوق')]} rows=${[['n = 1', [[850, 'Hz'], [1150, 'Hz']]], ['n = 2', [[700, 'Hz'], [1300, 'Hz']]], ['n = 3', [[550, 'Hz'], [1450, 'Hz']]]]} tol=${0} />
          <${Hand} red=${true}>${A ? html`القاعدة: <bdi dir="ltr">1000 ± n × 150</bdi>` : 'the rule: 1000 ± n × 150'}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Which pair needs a large modulation index before you can really hear it?', 'أنهي اتنين محتاجين modulation index كبير قبل ما تسمعهم بجد؟')}</p>
            <${K.Reveal} id="fm-br"><p className="hf-p small">${X('The <b>n = 3</b> pair (550 and 1450 Hz): higher-order sidebands only get significant energy when I is large.', 'الاتنين بتوع <bdi dir="ltr"><b>n = 3</b></bdi> اللي هما <bdi dir="ltr">550 Hz</bdi> و<bdi dir="ltr">1450 Hz</bdi>، لأن الـ sidebands العالية مبتاخدش energy ملحوظة غير لما I تبقى كبيرة.')}</p></${K.Reveal}></${Box}>
        `, { sec: t('Exercises', 'التمارين') }),

        // 19 · harmonic or bell
        page(html`
          <${H2}>${t('Harmonic, or a bell?', 'صوت harmonic ولا جرس؟')}</${H2}>
          <${P} small=${true}>${X('FM is good at both <b>harmonic</b> and <b>inharmonic</b> sounds ("clang", "twang", "bong"). Harmonic sounds need the modulator to have a <b>harmonic relationship</b> to the carrier; <b>non-integer</b> ratios give bell-like, dissonant, percussive sounds. More modulation, more complex sound.',
            'الـ FM كويسة في الأصوات الـ <b>harmonic</b> والـ <b>inharmonic</b> ("clang" و"twang" و"bong"). الـ harmonic محتاجة الـ modulator يكون ليه <b>harmonic relationship</b> مع الـ carrier، والنسب الـ <b>non-integer</b> بتدّي أصوات زي الجرس، dissonant وpercussive. وكل ما الـ modulation يزيد، الصوت يبقى أعقد.')}</${P}>
          ${two(A ? 'لو <bdi dir="ltr">fc = 200</bdi> و<bdi dir="ltr">fm = 200</bdi> (نسبة <bdi dir="ltr">1:1</bdi>) بيدّي:<span class="ltr">200 ± 200n → 0, 400, 600 …</span>كلهم مضاعفات <bdi dir="ltr">200 Hz</bdi>، فالصوت harmonic.'
            : 'fc = 200, fm = 200 (ratio 1:1): 200 ± 200n → 0, 400, 600 … All multiples of 200 Hz: <b>harmonic</b>.',
            A ? 'لو <bdi dir="ltr">fm = 141 Hz</bdi> (نسبة non-integer) الـ sidebands بتبقى:<span class="ltr">59, 341, 482 …</span>مش مضاعفات لـ fundamental مشترك، فبيطلع صوت زي الجرس.'
            : 'fc = 200, fm = 141 (non-integer ratio): 59, 341, 482 … Not multiples of a common fundamental: <b>bell-like</b>, inharmonic.',
            [t('Harmonic (1 : 1)', 'الـ harmonic (واحد لواحد)'), t('Bell (200 : 141)', 'الجرس (200 لـ 141)')])}
          <${Hand} tilt=${true}>${A ? html`اتأكد بنفسك: <bdi dir="ltr">200 − 141 = 59</bdi> و<bdi dir="ltr">200 + 141 = 341</bdi> و<bdi dir="ltr">200 + 282 = 482</bdi>` : 'check them: 200 − 141 = 59, 200 + 141 = 341, 200 + 282 = 482'}</${Hand}>
        `),
        fig('mm-5-fm-ratio', 'Hear the difference a ratio makes', 'اسمع الفرق اللي النسبة بتعمله'),

        // 21 · operators and algorithms
        page(html`
          <${H2}>${t('Operators and algorithms', 'الـ operators والـ algorithms')}</${H2}>
          <${P} small=${true}>${X('In FM terminology oscillators are called <b>operators</b>. FM synths have <b>4 or 6</b> of them, because one carrier and one modulator are not complex enough. <b>Algorithms</b> are the preset routings:',
            'في مصطلحات الـ FM الـ oscillators اسمها <b>operators</b>. الـ FM synths فيها <b>4 أو 6</b>، لأن carrier واحد وmodulator واحد مش معقدين كفاية. والـ <b>algorithms</b> هي التوصيلات الجاهزة:')}</${P}>
          ${menu(A ? [
            ['1', 'الـ <b>Multiple carriers</b>: فيه oscillator واحد بيعمل modulate لـ <b>2 carriers أو أكتر</b> في نفس الوقت.'],
            ['2', 'الـ <b>Multiple modulators</b>: فيه <b>2 oscillators أو أكتر</b> بيعملوا modulate لـ carrier واحد.'],
            ['3', 'الـ <b>Feedback</b>: الـ output بتاع oscillator بيعمل modulate <b>لنفسه</b>.']
          ] : [
            ['1', '<b>Multiple carriers</b>: one oscillator modulates <b>two or more carriers</b> at once.'],
            ['2', '<b>Multiple modulators</b>: <b>two or more oscillators</b> modulate a single carrier.'],
            ['3', '<b>Feedback</b>: an oscillator\'s output modulates <b>itself</b>.']
          ], true)}
          <${Grow} />
          <${Talk} who="spk" flip=${true}>${t('The slides play more FM sounds: a compressing and uncompressing sine, periodic modulation, a bell, a wood block, brass.', 'السلايدز فيها أصوات FM تانية: sine بيتضغط ويتفك، وperiodic modulation، وجرس، وwood block، وbrass.')}</${Talk}>
        `),

        // 22 · sample-based
        page(html`
          <${H1}>${t('Sample-based: start from a recording', 'الـ Sample-based: ابدأ من تسجيل')}</${H1}>
          <${Def}>${X('Like subtractive or additive synthesis, but the seed waveforms are <b>sampled sounds or instruments</b> instead of saw or sine waves.', 'زي الـ subtractive أو الـ additive، بس الـ seed waveforms بتبقى <b>أصوات أو آلات متسجلة</b> بدل موجات saw أو sine.')}</${Def}>
          <${P} small=${true}>${X('Samplers plus <b>Foley artists</b> are the mainstay of sound-effects production, and hip-hop, trip-hop, dance, jungle and trance were invented because of samplers.', 'الـ samplers مع الـ <b>Foley artists</b> أساس الـ sound effects، والـ hip-hop والـ trip-hop والـ dance والـ jungle والـ trance اتخلقوا بسببهم.')}</${P}>
          ${two(t('Much <b>lower processing power</b> than physical modelling or additive: the nuances are in the pre-recorded samples, not calculated in real time.', 'الـ <b>processing power أقل بكتير</b> من الـ physical modelling أو الـ additive: التفاصيل في الـ samples المتسجلة، مش بتتحسب في real time.'),
            t('More detail needs several samples at once (a trumpet: breath noise, growl, looping wave), which <b>reduces polyphony</b>.', 'تفاصيل أكتر محتاجة كذا sample شغالين مع بعض (الـ trumpet: النَفَس والـ growl والـ loop)، وده <b>بيقلل الـ polyphony</b>.'))}
          <${Hand} tilt=${true}>${X('Mellotron (tape, 1962) · Fairlight CMI (1979, about £20,000, now an iPad app) · Korg M1 (1988, introduced the "workstation") · Kontakt, Halion', 'الـ Mellotron (1962) · الـ Fairlight CMI (1979، حوالي <bdi dir="ltr">£20,000</bdi>، ودلوقتي app) · الـ Korg M1 (1988، قدّم الـ "workstation") · الـ Kontakt')}</${Hand}>
        `, { sec: t('Sample-based synthesis', 'الـ Sample-based synthesis') }),

        // 23 · looping, pitch, multisampling
        page(html`
          <${H2}>${t("The sampler's tricks", 'حركات الـ sampler')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Looping</b>: في أواخر الثمانينات الـ memory كانت غالية، فالـ samples قصيرة وجزء منها بيتعمله loop. ولسه بيوفر memory النهارده (الـ drum tracks والـ effects).',
            'الـ <b>loop points</b>: دوّر على <b>silence points</b> (الـ zero crossings) زي ضربات الدرامز، أو على أجزاء فيها <b>نفس الـ audio content</b> (الـ pattern matching) زي الآلات الممتدة.',
            'الـ <b>Pitch control</b>: لو سرّعت أو بطّأت الـ sample الـ pitch بيتغير، بس بيفضل واقعي في <b>كام semitone</b> بس.',
            'إنهاء الـ loop: زمان volume envelope بيخفّته، والنهارده <b>tail-off sample</b> بيشتغل مع الـ note-off.',
            'الـ <b>Multisampling</b>: سجّل الآلة على فترات منتظمة تغطي مناطق notes جنب بعض (<b>splits</b>) أو كل note. والـ <b>drum mapping</b> هو المثال اللي مالوش pitch.'
          ] : [
            '<b>Looping</b>: in the late 1980s memory was expensive, so samples were short and part of each was looped. It still saves memory today (drum tracks, effects).',
            '<b>Loop points</b>: find <b>silence points</b> (zero crossings), e.g. drum beats, or portions with the <b>same audio content</b> (pattern matching), e.g. sustaining instruments.',
            '<b>Pitch control</b>: speeding up or slowing down a sample changes its pitch, but it is realistic only over a <b>few semitones</b>.',
            'Ending the loop: early on a volume envelope faded it out; today a <b>tail-off sample</b> is triggered by note-off.',
            '<b>Multisampling</b>: sample the instrument at regular intervals covering regions of adjacent notes (<b>splits</b>) or every note. <b>Drum mapping</b> is the non-pitched example.'
          ]} />
        `),

        // 24 · velocity and keyswitching
        page(html`
          <${H2}>${t('How hard, and how it is played', 'ضربت جامد قد إيه، وبتعزف إزاي')}</${H2}>
          <${P} small=${true}>${X('<b>Velocity layers</b>: the sound depends on how hard the key, string or drum is hit.', 'الـ <b>Velocity layers</b>: الصوت بيعتمد على قد إيه ضربت الزرار أو الوتر أو الدرام جامد.')}</${P}>
          ${menu(A ? [
            ['1', 'الـ <b>Single layer</b>: الـ volume بس اللي بيتغير، مفيش تغيير في الـ timbre.'],
            ['2', 'الـ <b>Dual layer</b>: صوت 1 عند velocity أقل، وصوت 2 عند velocity أعلى.'],
            ['3', 'الـ <b>Triple layer</b>: تلات أصوات حسب الـ velocity.']
          ] : [
            ['1', '<b>Single layer</b>: only the volume changes; no timbre change.'],
            ['2', '<b>Dual layer</b>: sound 1 at lower velocity, sound 2 at higher.'],
            ['3', '<b>Triple layer</b>: three sounds, by velocity.']
          ], true)}
          <${Box} kind="watch"><p className="hf-p small">${X('In the key map, multisamples are laid out <b>vertically</b> and velocity layers <b>horizontally</b>. Most instruments combine both.', 'في الـ keymap الـ multisamples بتترتب <b>رأسيًا</b> والـ velocity layers <b>أفقيًا</b>. ومعظم الآلات بتجمع الاتنين.')}</p></${Box}>
          <${P} small=${true}>${X('<b>Keyswitching</b>: keys, usually low ones outside the instrument\'s range, choose the playing style (muted or open trumpet, plucked or bowed violin). Advanced samplers have full orchestras, choirs that sing words, and script control (Kontakt 2+).',
            'الـ <b>Keyswitching</b>: زراير، غالبًا واطية برا مدى الآلة، بتختار طريقة العزف (trumpet مكتوم أو مفتوح، كمنجة بالنقر أو بالقوس). والـ samplers المتقدمة فيها أوركسترا كاملة، وكورال بيغني كلام، وتحكم بالـ script.')}</${P}>
        `),
        fig('mm-5-velocity', 'Velocity layers on a key map', 'الـ velocity layers على الـ key map'),

        // 26 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه مسجّلش note واحدة وأغيّر الـ pitch بتاعها على الكيبورد كله؟', 'لأن تغيير السرعة بيبقى واقعي في <b>كام semitone</b> بس. عشان كده بنعمل <b>multisampling</b>، يعني samples على طول الكيبورد.'],
            ['لو بيستخدم memory كتير، إزاي الـ sample-based "رخيص"؟', 'رخيص في الـ <b>processing</b>: التفاصيل في التسجيل ومش بتتحسب في real time. التمن بيبان في الـ <b>polyphony</b>، لأن كذا sample بيشتغلوا مع بعض.'],
            ['في الـ single layer، الضرب الجامد مش بيغيّر الصوت؟', 'بيغيّر الـ <b>volume</b> بس، مش الـ timbre. عشان تغيّر الـ timbre محتاج dual أو triple layer.'],
            ['الـ keyswitches ليه على الزراير الواطية؟', 'لأنها غالبًا <b>برا مدى الآلة</b>، فمبتعزفش notes.']
          ] : [
            ['Why not record one note and pitch-shift it across the whole keyboard?', 'Speed changes are realistic only over a <b>few semitones</b>. So we <b>multisample</b>: samples across the keyboard.'],
            ['If it uses all that memory, how is sample-based "cheap"?', 'Cheap in <b>processing</b>: the nuances are in the recording, not computed in real time. The cost shows in <b>polyphony</b>, since several samples play at once.'],
            ['With a single layer, doesn\'t hitting harder change the sound?', 'Only its <b>volume</b>, not its timbre. For a timbre change you need dual or triple layers.'],
            ['Why are keyswitches on the low keys?', 'They are usually <b>outside the instrument\'s range</b>, so they don\'t play notes.']
          ]} />
        `),

        // 27 · beat slicing
        page(html`
          <${H1}>${t('Beat slicing: find the hits', 'الـ Beat slicing: لاقي الضربات')}</${H1}>
          <${P} small=${true}>${X('Joining audio at <b>silence points</b> avoids clicks, but it is too simple to find the right loop points. So: how does the ear find a beat?', 'إنك تلزق الـ audio عند الـ <b>silence points</b> بيمنع الـ clicks، بس دي طريقة بسيطة زيادة عشان تلاقي الـ loop points الصح. طب الودن بتلاقي الـ beat إزاي؟')}</${P}>
          <${Def}>${X('<b>Beat perception</b>: the ear finds rhythm from a pseudo-periodic succession of beats. A sound is heard as a beat only if its energy is <b>largely superior to the energy history</b>.', 'الـ <b>Beat perception</b>: الودن بتلاقي الـ rhythm من تتابع شبه دوري للـ beats. والصوت بيتسمع كـ beat بس لو الـ energy بتاعته <b>أعلى بكتير من الـ energy history</b>.')}</${Def}>
          ${menu(A ? [
            ['1', 'الـ <b>Simple sound energy</b>: الـ <b>average</b> energy على حوالي <b>ثانية</b> والـ <b>instant</b> energy على حوالي <bdi dir="ltr">5/100</bdi> ثانية. فيه beat لما الـ instant أكبر من الـ local average. عند <bdi dir="ltr">44.1 kHz</bdi> ده:<span class="ltr">44,100 vs 0.05 × 44,100 = 2,205 samples</span>'],
            ['2', 'الـ <b>Frequency selected</b>: بنعمل Fourier transform على <b>1024 sample</b>، اتقسم لحوالي <b>32 sub-band</b>، وكل sub-band بيتقارن بالـ average بتاعه. لو واحد أو أكتر عدّى، يبقى فيه beat.']
          ] : [
            ['1', '<b>Simple sound energy</b>: the <b>average</b> energy over about <b>1 s</b> against the <b>instant</b> energy over about <b>5/100 s</b>. A beat when instant &gt; local average. At 44.1 kHz: 44,100 samples against 0.05 × 44,100 = <b>2,205</b>.'],
            ['2', '<b>Frequency selected</b>: a Fourier transform over <b>1024 samples</b>, split into about <b>32 sub-bands</b>; each band\'s energy is compared with its own recent average. One or more above it: a beat.']
          ])}
        `, { sec: t('Beat slicing', 'الـ Beat slicing') }),
        fig('mm-5-beat', 'Instant energy against the 1 s average', 'الـ instant energy قصاد متوسط الثانية'),

        // 29 · tools and tempo
        page(html`
          <${H2}>${t('Slice it, then change the tempo', 'قطّعه، وبعدين غيّر الـ tempo')}</${H2}>
          <${UL} items=${A ? [
            'الأدوات: الـ <b>ReCycle</b> (الـ Sensitivity slider بيعمل slices)، والـ <b>Cubase</b> Sample Editor (الـ Hitpoints والـ Threshold وبعدين Create Slices)، والـ <b>Groove Agent One</b> (الـ slices بتروح على pads ورا بعض).',
            'الـ MIDI chromatic scale بيشغّل كل slice في وقتها الصح، فبيعيد عمل الـ audio.'
          ] : [
            'Tools: <b>ReCycle</b> (a Sensitivity slider creates slices), <b>Cubase</b> Sample Editor (Hitpoints + Threshold, then Create Slices), <b>Groove Agent One</b> (slices go to consecutive pads).',
            'A MIDI chromatic scale triggers each slice at the right time to recreate the audio.'
          ]} />
          ${two(t('Extra time appears as <b>silent gaps</b> between the slices.', 'الوقت الزيادة بيظهر كـ <b>فراغات صامتة</b> بين الـ slices.'), t('The slices\' <b>tails overlap</b>, which reduces the playing time.', 'الـ <b>tails بتاعة الـ slices بتتداخل</b>، وده بيقلل وقت التشغيل.'), [t('Slower tempo', 'الـ tempo أبطأ'), t('Faster tempo', 'الـ tempo أسرع')])}
          <${P} small=${true}>${X('Either way the <b>attacks stay artefact-free</b>, and the attack is the most important part of percussion. The fixes: an <b>envelope</b> that fades each slice to silence before the gap or overlap, and for gaps, <b>looping the end of the tail</b> to extend it through the gap.',
            'وفي الحالتين الـ <b>attacks بتفضل من غير artefacts</b>، والـ attack أهم حتة في الـ percussion. والحلول: <b>envelope</b> يخفّت كل slice لحد الصمت قبل الـ gap أو الـ overlap، وللـ gaps <b>loop لآخر الـ tail</b> عشان يمدّه ويملا الفراغ.')}</${P}>
        `),
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Slower or faster tempo? Tap <b>S</b> or <b>F</b> for each line.', 'الـ tempo أبطأ ولا أسرع؟ دوس <b>S</b> للأبطأ أو <b>F</b> للأسرع لكل سطر.')}</p></${Box}>
          <${Sort} id="tempo" bins=${[['S', t('Slower tempo', 'الـ tempo أبطأ')], ['F', t('Faster tempo', 'الـ tempo أسرع')]]} items=${A ? [
            ['فيه صمت بين الـ slices', 0],
            ['الـ tails بتدخل في الـ slice اللي بعدها', 1],
            ['وقت التشغيل الكلي بيقل', 1],
            ['الحل: loop لآخر الـ tail', 0],
            ['كل slice بتبدأ بعد ما اللي قبلها تخلص بفترة', 0],
            ['الـ slice بتبدأ قبل ما اللي قبلها تخلص', 1]
          ] : [
            ['Silence between the slices', 0],
            ['The tails run into the next slice', 1],
            ['The total playing time is reduced', 1],
            ['Fix: loop the end of the tail', 0],
            ['Each slice starts a while after the last one ends', 0],
            ['A slice starts before the last one has ended', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('the envelope fade fixes both, so it is not on the list', 'الـ envelope fade بيحل الاتنين، فمش في القايمة')}</${Hand}>
        `),

        // 31 · wavetable
        page(html`
          <${H1}>${t('Wavetable: one period at a time', 'الـ Wavetable: كل مرة period واحد')}</${H1}>
          <${Def}>${X('The lookup table holds <b>one period of a general waveshape</b> (not just a sine), and the waveshape can <b>change dynamically</b> as the note evolves, giving a <b>quasi-periodic</b> output.', 'الـ lookup table بيشيل <b>period واحد من waveshape عامة</b> (مش sine بس)، والـ waveshape ممكن <b>تتغير dynamically</b> مع تطور الـ note، فيطلع output <b>quasi-periodic</b>.')}</${Def}>
          <${Box} kind="watch"><p className="hf-p small">${t('Not to be confused with plain PCM sample playback on sound cards.', 'ماتلخبطهاش مع الـ PCM sample playback العادي في الـ sound cards.')}</p></${Box}>
          <${UL} items=${A ? [
            'صناعة الموجات: note متسجلة بتتقسم لـ <b>circular sequence من الـ wavetables</b>، كل واحد period واحد (أو بتتولد رياضيًا).',
            'الـ playback بيجيب الـ samples بالـ <b>table lookup</b>، والـ output بيتطور لما table يتخلط مع التاني، مع ADSR enveloping. والـ looping ممكن يبطّأ التطور أو يعكسه.'
          ] : [
            'Making waves: a sampled note is parsed into a <b>circular sequence of wavetables</b>, one period each (or the tables are generated mathematically).',
            'Playback fetches samples by <b>table lookup</b>; the output evolves as one table is mixed with the next, with ADSR enveloping. Looping can slow or reverse the evolution.'
          ]} />
        `, { sec: t('Wavetable synthesis', 'الـ Wavetable synthesis') }),

        // 32 · interview
        page(html`
          <${Interview} title=${t('Wavetable, exposed', 'الـ Wavetable على المكشوف')} sub=${t("This week's interview: the synth that remembers only one period.", 'حوار الأسبوع: الـ synth اللي فاكر period واحد بس.')} lines=${A ? [
            ['المذيع', 'إنت مجرد sampler صغير، صح؟'],
            ['الـ Wavetable', 'لأ. الـ output بتاعي بيتولد <b>في real time</b> دايمًا، والموجات في الـ tables بتاعتي نادرًا ما تبقى أطول من <b>period أو اتنين</b>.'],
            ['المذيع', 'بتخزن إيه بالظبط؟'],
            ['الـ Wavetable', 'حاجتين: <b>attack sample</b> بيشتغل مرة واحدة (زي المطرقة وهي بتخبط وتر البيانو)، وبعدين <b>sustain segment بيتكرر</b> وعليه envelope عشان يخفت طبيعي.'],
            ['المذيع', 'وإيه اللي يميزك؟'],
            ['الـ Wavetable', 'عندي <b>storage صغير</b>، data أقل بكتير من الـ PCM sample لنفس الصوت. عام زي الـ additive بحسابات real-time أقل بكتير، لأن الـ <b>inverse DFT بيتحسب قبل الـ playback</b>.']
          ] : [
            ['Head First', "You're just a tiny sampler, right?"],
            ['Wavetable', 'No. My output is always generated <b>in real time</b>, and the waves in my tables are rarely more than <b>1 or 2 periods</b> long.'],
            ['Head First', 'So what do you store?'],
            ['Wavetable', 'Two parts: an <b>attack sample</b> played once (a hammer hitting a piano string), then a <b>looped sustain segment</b>, enveloped to decay naturally.'],
            ['Head First', 'And your selling point?'],
            ['Wavetable', '<b>Compact storage</b>: far less data than the PCM sample of the same sound. As general as additive with much less real-time work, because the <b>inverse DFT is precomputed</b> before playback.']
          ]} />
        `),

        // 33 · dynamic waveshaping
        page(html`
          <${H2}>${t('Moving from one table to the next', 'إزاي ننقل من table للتاني')}</${H2}>
          ${menu(A ? [
            ['1', 'الـ <b>Linear crossfading</b>: بنعمل crossfade بالترتيب من table للي بعده بـ envelope. وهو حالة خاصة من اللي جاي، الـ envelopes فيها <b>overlapping triangular pulses</b>.'],
            ['2', 'الـ <b>Sequential enveloping</b>: فيه tables بتتخلط في أي لحظة بـ envelopes بتتحرك.']
          ] : [
            ['1', '<b>Linear crossfading</b>: crossfade sequentially from one table to the next with an envelope. It is the subclass of the next one whose envelopes are <b>overlapping triangular pulses</b>.'],
            ['2', '<b>Sequential enveloping</b>: the tables are mixed at any instant by moving envelopes.']
          ])}
          <${P} small=${true}>${X('Demo <code>wavetable_synth.m</code> (Fs = 22050) crossfades one 440 Hz sine period (≈ 50 samples) into one 500 Hz saw period (44.1 samples).', 'الـ demo اللي اسمه <code>wavetable_synth.m</code> بيعمل crossfade من period sine عند <bdi dir="ltr">440 Hz</bdi> لـ period saw عند <bdi dir="ltr">500 Hz</bdi>:<span class="ltr">22050 / 440 ≈ 50 · 22050 / 500 = 44.1 samples</span>')}</${P}>
          <${Grow} />
          <${Hand}>${t('Real ones: PPG Wave (64 pointers to single-cycle waves) · Roland D-50 "Linear Arithmetic" · Korg Wavestation ("vector synthesis" on a 2-D grid)', 'أمثلة حقيقية: الـ PPG Wave (64 pointer لموجات single-cycle) · الـ Roland D-50 بالـ "Linear Arithmetic" · الـ Korg Wavestation (الـ "vector synthesis" على grid ثنائي الأبعاد)')}</${Hand}>
        `),
        fig('mm-5-seq-env', 'Crossfading against sequential enveloping', 'الـ crossfading قصاد الـ sequential enveloping'),

        // 34 · granular
        page(html`
          <${H1}>${t('Granular: sound as grains of sand', 'الـ Granular: الصوت حبّات رمل')}</${H1}>
          <${Hand} big=${true} tilt=${true}>${t('"All sound is an integration of grains … of sonic quanta." Iannis Xenakis, 1971', '"كل الصوت تجميع لـ grains … من الـ sonic quanta." كلام Iannis Xenakis سنة 1971')}</${Hand}>
          <${UL} items=${A ? [
            'بيشتغل على الـ time scale بتاع الـ <b>microsound</b>، وليه علاقة بالـ sampling والـ wavetable.',
            'الـ samples بتتقسم لـ <b>grains</b> حوالي <bdi dir="ltr"><b>1–50 ms</b></bdi> (غالبًا <bdi dir="ltr">10–50 ms</bdi>). grains كتير فوق بعض، كل واحد بسرعة وphase وvolume مختلفين، فيطلع <b>soundscape أو cloud</b> مش tone واحد.',
            'غيّر الـ waveform والـ envelope والـ duration والمكان والكثافة بتوع الـ grains، تطلع أصوات كتير.',
            'الاستخدامات: الـ soundscapes والـ sound effects، وتغيير سرعة الـ sample <b>مع الحفاظ على الـ pitch والـ tempo</b>، ومادة خام للـ DSP.'
          ] : [
            'It works on the <b>microsound</b> time scale and is related to sampling and wavetable synthesis.',
            'Samples are split into <b>grains</b> of about <b>1–50 ms</b> (usually ≈ 10–50 ms). Many grains are layered, each at a different speed, phase and volume: a <b>soundscape or cloud</b>, not a single tone.',
            'Vary the grains\' waveform, envelope, duration, spatial position and density and you get many sounds.',
            'Uses: soundscapes, sound effects, changing a sample\'s speed while <b>preserving pitch and tempo</b>, raw material for further DSP.'
          ]} />
        `, { sec: t('Granular synthesis', 'الـ Granular synthesis') }),

        // 35 · grain parts and modes
        page(html`
          <${H2}>${t('Inside a grain, and three ways to pour them', 'جوّه الـ grain، وتلات طرق تصبّهم')}</${H2}>
          ${two(t('Prevents clicks and distortion at the edges. Its slope shapes the spectrum: <b>sharper attacks give broader bandwidths</b>, like very short grains.', 'بيمنع الـ clicks والـ distortion عند الأطراف. والـ slope بتاعه بيشكّل الـ spectrum: <b>الـ attacks الحادة بتدّي bandwidth أعرض</b>، زي الـ grains القصيرة جدًا.'),
            t('Any waveform, or a sample.', 'أي waveform، أو sample.'), [t('Envelope', 'الـ Envelope'), t('Contents', 'الـ Contents')])}
          ${menu(A ? [
            ['Q', 'الـ <b>Quasi-synchronous</b>: فيه stream من grains ليهم نفس المدة. لو أقل من <bdi dir="ltr">50 ms</bdi> بيدّي <b>amplitude modulation</b>.'],
            ['A', 'الـ <b>Asynchronous</b>: الـ grains متوزعة <b>stochastically</b> (عشوائيًا).'],
            ['P', 'الـ <b>Pitch/Tempo-synchronous</b>: بيحافظ على الـ pitch أو الـ tempo وهو بيغيّر سرعة التشغيل. envelopes متداخلة ومتزامنة مع frequency الـ grain، وartefacts أقل.']
          ] : [
            ['Q', '<b>Quasi-synchronous</b>: a stream of equal-duration grains; with grains under 50 ms it gives <b>amplitude modulation</b>.'],
            ['A', '<b>Asynchronous</b>: grains distributed <b>stochastically</b>.'],
            ['P', '<b>Pitch/Tempo-synchronous</b>: preserves pitch or tempo while changing playback speed; overlapping envelopes synchronous with the grain\'s frequency, fewer artefacts.']
          ], true)}
          <${Hand} tilt=${true}>${t('Beeckman 1618 · Gabor 1947 · Xenakis 1971 (tape and razor blade) · Roads 1988 (digital) · Truax 1990 (real-time)', 'الـ Beeckman سنة 1618 · الـ Gabor سنة 1947 · الـ Xenakis سنة 1971 (شريط وموس) · الـ Roads سنة 1988 (digital) · الـ Truax سنة 1990 (real-time)')}</${Hand}>
        `),
        fig('mm-5-grain-modes', 'Three ways to combine grains', 'تلات طرق لتجميع الـ grains'),

        // 37 · granulation and PSOLA
        page(html`
          <${H2}>${t('granulation.m, then PSOLA', 'الملف granulation.m، وبعدين الـ PSOLA')}</${H2}>
          <${P} small=${true}>${X('The demo makes <b>400 grains</b> of 10–20 ms with a 10 ms Hanning fade-in and fade-out. At 44.1 kHz that is fs × 0.01 to fs × 0.02 = <b>441 to 882 samples</b> per grain. Regularly spaced grains act like a <b>filtered pulse train</b>.',
            'الـ demo بيعمل <b>400 grain</b> كل واحد <bdi dir="ltr">10–20 ms</bdi> بـ Hanning fade-in وfade-out مدته <bdi dir="ltr">10 ms</bdi>. عند <bdi dir="ltr">44.1 kHz</bdi> ده:<span class="ltr">fs × 0.01 … fs × 0.02 = 441 … 882 samples</span>والـ grains المتباعدة بانتظام بتتصرف زي <b>filtered pulse train</b>.')}</${P}>
          <${Def}>${X('<b>PSOLA</b> (Pitch Synchronous Overlap-Add), from speech processing, divides the waveform into small <b>overlapping segments</b> and recombines them by overlap-add.', 'الـ <b>PSOLA</b> (Pitch Synchronous Overlap-Add) جاي من الـ speech processing: بيقسم الـ waveform لـ <b>segments صغيرة متداخلة</b> وبيجمّعهم تاني بالـ overlap-add.')}</${Def}>
          <${P} small=${true}>${X('Grains far apart are separated by silences; many short overlapping grains make a texture.', 'الـ grains البعيدة عن بعض بيبقى بينهم صمت، والـ grains القصيرة الكتير المتداخلة بتعمل texture.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Unlike the phase vocoder, there is <b>no STFT</b> in PSOLA (it predates the phase vocoder).', 'عكس الـ phase vocoder، <b>مفيش STFT</b> في الـ PSOLA (هو أقدم من الـ phase vocoder).')}</p></${Box}>
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Be PSOLA', 'خليك إنت الـ PSOLA')}><p className="hf-p small">${t('Each move does one thing to the sound. Tap a move, then what it does.', 'كل حركة بتعمل حاجة واحدة في الصوت. دوس على الحركة، وبعدين على اللي بتعمله.')}</p></${Box}>
          <${Match} id="psola" left=${A ? ['بعّد الـ segments', 'قرّب الـ segments', 'كرر segments', 'شيل segments'] : ['Move segments further apart', 'Move segments closer', 'Repeat segments', 'Eliminate some segments']}
            right=${A ? ['الصوت أقصر', 'الـ pitch أوطى', 'الصوت أطول', 'الـ pitch أعلى'] : ['Shorter sound', 'Lower pitch', 'Longer sound', 'Higher pitch']} answer=${[1, 3, 2, 0]} />
          <${Grow} />
          <${Hand}>${t('Trick (ours): spread them out, the waves get longer, the pitch drops.', 'حيلة من عندنا: بعّدهم، الموجة تطول، الـ pitch ينزل.')}</${Hand}>
        `),
        fig('mm-5-psola', 'PSOLA: move, repeat or drop segments', 'الـ PSOLA: حرّك أو كرر أو شيل الـ segments'),

        // 39 · physical modelling
        page(html`
          <${H1}>${t('Physical modelling: the instrument in maths', 'الـ Physical modelling: الآلة بالرياضة')}</${H1}>
          <${Def}>${X('Sound generated by a <b>mathematical model</b> (equations and algorithms) of a physical source. Parameters describe the materials and the player\'s interaction: plucking or bowing a string, covering a flute\'s toneholes, striking a drum membrane.',
            'الصوت بيتولد من <b>mathematical model</b> (معادلات وalgorithms) لمصدر فيزيائي، والـ parameters بتوصف المواد وطريقة العازف (نقر أو قوس، خُرم فلوت، ضرب درام).')}</${Def}>
          <${P} small=${true}>${X('Examples: Yamaha VL1 (1994), Roland COSM, Arturia Moog, PianoTeq. Algorithms: <b>Karplus-Strong</b> (1971), <b>digital waveguide</b> (1980s), <b>formant synthesis</b> (1950s).', 'أمثلة: الـ Yamaha VL1 (1994) والـ Roland COSM والـ PianoTeq. والـ algorithms: الـ <b>Karplus-Strong</b> (1971)، والـ <b>digital waveguide</b> (الثمانينات)، والـ <b>formant synthesis</b> (الخمسينات).')}</${P}>
          <${P} small=${true}>${X('<b>Karplus-Strong</b> loops a short <b>white-noise burst</b> (L samples) through a <b>filtered delay line</b>, and out comes a plucked or hammered string, or percussion. It is essentially <b>subtractive</b>, with a feedback loop like a <b>comb filter</b>.', 'الـ <b>Karplus-Strong</b> بيعمل loop لـ <b>white-noise burst</b> قصير (L sample) جوه <b>filtered delay line</b>، فيطلع وتر بيتنقر أو بيتخبط، أو percussion. وهو في الأساس <b>subtractive</b> فيه feedback loop زي الـ <b>comb filter</b>.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('The filter\'s gain must be <b>less than 1 at all frequencies</b> (usually a first-order low-pass).', 'الـ gain بتاع الـ filter لازم يبقى <b>أقل من 1 عند كل الـ frequencies</b> (غالبًا first-order low-pass).')}</p></${Box}>
        `, { sec: t('Physical modelling', 'الـ Physical modelling') }),
        fig('mm-5-ks-diagram', 'The Karplus-Strong loop', 'الـ Karplus-Strong loop'),

        // 41 · tuning
        page(html`
          <${H2}>${t('Tuning the string', 'ظبط الوتر')}</${H2}>
          <${P} small=${true}>${X('The period is the delay-line length plus the filter\'s average group delay, and the fundamental is 1 / period. So:', 'الـ period بيساوي طول الـ delay line زائد الـ average group delay بتاع الـ filter، والـ fundamental هو <bdi dir="ltr">1 / period</bdi>. يعني:')}</${P}>
          <p className="hf-mm5-eq hf-in">D = Fs / F1</p>
          <${P} small=${true}>${X('<code>karplus.m</code>: fs = 44100 and D = 200, so F1 = 44100 / 200 = <b>220.5 Hz</b>. For A = 441 Hz you need D = 44100 / 441 = <b>100 samples</b>. Its filter, b = −0.99 × [0.5 0.5], averages two samples with gain 0.99.',
            'الـ <code>karplus.m</code> فيه <bdi dir="ltr">fs = 44100</bdi> و<bdi dir="ltr">D = 200</bdi>، يعني:<span class="ltr">F1 = 44100 / 200 = <b>220.5 Hz</b></span>ولو عايز <bdi dir="ltr">A = 441 Hz</bdi> محتاج:<span class="ltr">D = 44100 / 441 = <b>100 samples</b></span>')}</${P}>
          <${Hand} red=${true}>${X('Your turn, with Fs = 44100 Hz: fill in the missing number.', 'دورك، والـ <bdi dir="ltr">Fs = 44100 Hz</bdi>: اكتب الرقم الناقص.')}</${Hand}>
          <${Fill} id="ks" head=${['', t('answer', 'الإجابة')]} rows=${[['F1 = 294 Hz → D', [[150, 'samples']]], ['F1 = 441 Hz → D', [[100, 'samples']]], ['D = 400 → F1', [[110.25, 'Hz']]]]} />
        `),

        // 42 · drum variant
        page(html`
          <${H2}>${t('The drum variant', 'نسخة الدرام')}</${H2}>
          <${Code} lines=${[['X(t) = +½(X(t−p) + X(t−p+1))', t('prob. b', 'باحتمال b')], ['X(t) = −½(X(t−p) + X(t−p+1))', t('otherwise', 'غير كده')]]} />
          ${menu(A ? [
            ['p', 'الـ <b>p</b> طول الـ wavetable (حوالي <bdi dir="ltr">150–500</bdi>): بيحدد الـ decay (كبير يبقى أطول) والـ pitch (كبير يبقى أوطى).'],
            ['b', 'الـ <b>b</b> هو الـ blend factor من 0 لـ 1: لما <bdi dir="ltr">b = ½</bdi> أحسن <b>snare</b>، وقريب من 0 صوت زي الـ <b>string</b>، وقريب من 1 <b>crash cymbal</b> كهربائي غريب.']
          ] : [
            ['p', '<b>p</b>, the wavetable length (about 150–500), sets the decay (big = long) and the pitch (big = low).'],
            ['b', '<b>b</b>, the blend factor (0 to 1): b = ½ gives the best <b>snare</b>; b near 0 is <b>string</b>-like; b near 1 is a weird electric <b>crash cymbal</b>.']
          ], true)}
          <${Code} lines=${[['b > 0.98  p = 200–800', t('crash cymbal', 'الـ crash cymbal')], ['b > 0.98  p = 5–50', t('metallic plink', 'الـ metallic plink')], ['b < 0.05  p = 20–400', t('string', 'الـ string')]]} />
          <${Grow} />
          <${Talk} who="spk" flip=${true}>${t('One loop of noise, a delay and a filter, and I can play a guitar, a snare or a cymbal.', 'بـ loop واحد من noise وdelay وfilter، وأقدر أعزف جيتار أو snare أو cymbal.')}</${Talk}>
        `),

        // 43 · match the seven
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Match each approach to how it makes sound. Tap an approach, then its description.', 'وصّل كل طريقة بإزاي بتعمل الصوت. دوس على الطريقة، وبعدين على الوصف بتاعها.')}</${P}>
          <${Match} id="seven" left=${['Subtractive', 'Additive', 'FM', 'Sample-based', 'Wavetable', 'Granular', 'Physical modelling']}
            right=${A ? ['بيكوّم grains من <bdi dir="ltr">1–50 ms</bdi> في cloud', 'بيشيل overtones من صوت غني بـ filter', 'بيقرا ويخلط tables كل واحد period واحد', 'الـ modulator بيلوي frequency الـ carrier فتطلع sidebands', 'بيحسب mathematical model للآلة', 'بيجمع partials، كل واحد بالـ envelope بتاعه', 'الـ seed waveforms أصوات متسجلة']
              : ['Layers grains of 1–50 ms into a cloud', 'Filters overtones out of a rich sound', 'Reads and mixes tables of one period each', 'A modulator bends the carrier\'s frequency into sidebands', 'Computes a mathematical model of the instrument', 'Sums partials, each with its own envelope', 'Its seed waveforms are recorded sounds']}
            answer=${[1, 5, 3, 6, 2, 0, 4]} />
        `),

        // 44–45 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("This lecture has none of the doctors' questions yet, so here are the site's own practice questions. Tap an answer to see why.", 'المحاضرة دي ملهاش أسئلة من الدكاترة لسه، فدي أسئلة التدريب بتاعة الموقع. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('p1', /second-order sidebands/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Do the sum on paper before you tap.', 'احسبها في ورقة الأول قبل ما تدوس.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${mq('p2', /LEVEL rather than a time/i)}
          <${Gap} h=${8} />
          ${mq('p3', /moving the overlapping segments further apart/i)}
        `),
        page(html`
          ${mq('p4', /D = 200 samples/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('More in the quiz: wavetable, additive, FM history and more.', 'فيه أكتر في الكويز: الـ wavetable والـ additive وتاريخ الـ FM وغيرهم.')}</${Hand}>
        `),

        // 46 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Subtractive</b>: صوت غني + <b>filter</b>. الـ source والـ filter (الـ cut-off والـ resonance) والـ amplitude envelope.',
            'الـ <b>ADSR</b>: الـ Attack والـ Decay والـ Release أوقات، والـ <b>Sustain level مش وقت</b>.',
            'الـ <b>Additive</b>: جمع partials كل واحد بالـ envelope بتاعه (Fourier). غني بس <b>مش efficient</b>.',
            'الـ <b>FM</b> (بتاع Chowning والـ Yamaha DX7) بيدّي sidebands عند <bdi dir="ltr">fc ± n·fm</bdi> بـ amplitude <bdi dir="ltr">Jn(I)</bdi>:<span class="ltr">440 ± 30, 60, 90 → 410/470, 380/500, 350/530</span>',
            'الـ <b>Sample-based</b>: بيحتاج processing قليل بس الـ polyphony أقل. الـ looping والـ multisampling والـ velocity layers والـ keyswitching.'
          ] : [
            '<b>Subtractive</b>: a rich source + a <b>filter</b>. Source, filtering (cut-off, resonance), amplitude envelope.',
            '<b>ADSR</b>: Attack, Decay and Release are times; <b>Sustain is a level</b>.',
            '<b>Additive</b>: sum partials, each with its own envelope (Fourier). Rich but <b>inefficient</b>.',
            '<b>FM</b> (Chowning, Yamaha DX7): sidebands at <b>fc ± n·fm</b> with amplitude Jn(I). 440 ± 30, 60, 90 → 410/470, 380/500, 350/530 Hz.',
            '<b>Sample-based</b>: low processing, less polyphony. Looping, multisampling, velocity layers, keyswitching.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Beat slicing</b>: فيه beat لما الـ instant energy (<bdi dir="ltr">0.05 s</bdi>) أكبر من الـ average (ثانية). الأبطأ بيعمل gaps والأسرع بيعمل overlap.',
            'الـ <b>Wavetable</b>: كل table فيه period واحد، وبنستخدم الـ crossfading أو الـ sequential enveloping، والـ inverse DFT متحسوب مسبقًا.',
            'الـ <b>Granular</b>: حبّات grains <bdi dir="ltr">1–50 ms</bdi>. والـ <b>PSOLA</b>: بعّد يبقى أوطى، كرر يبقى أطول، ومفيش STFT.',
            'الـ <b>Karplus-Strong</b>: بيدخّل noise جوه filtered delay line بـ gain أقل من 1:<span class="ltr">D = Fs / F1 → 44100 / 200 = 220.5 Hz</span>'
          ] : [
            '<b>Beat slicing</b>: a beat when instant energy (0.05 s) &gt; average (1 s). Slower tempo → gaps, faster → overlap.',
            '<b>Wavetable</b>: one period per table, crossfading or sequential enveloping; inverse DFT precomputed.',
            '<b>Granular</b>: grains of 1–50 ms. <b>PSOLA</b>: further apart = lower pitch, repeat = longer, no STFT.',
            '<b>Karplus-Strong</b>: noise through a filtered delay line, gain &lt; 1; D = Fs / F1 (44100 / 200 = 220.5 Hz).'
          ]} />
          <${Grow} />
          <${Talk} who="mic" flip=${true}>${t('And if anyone says synthesis never needs a microphone, remind them who records the samples.', 'ولو حد قالك إن الـ synthesis مش محتاج microphone خالص، فكّره مين اللي بيسجّل الـ samples.')}</${Talk}>
        `),

        // 47 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 5!', 'خلّصت الفصل الخامس!')}</${H1}>
            <${Talk} who="spk">${t('Seven ways to make me sing. Next: MIDI, which controls synthesis and effects.', 'سبع طرق تخليني أغني. الجاي: الـ MIDI، اللي بيتحكم في الـ synthesis والـ effects.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [5], t: Date.now() } }}>${t('Quiz me on Lecture 5', 'امتحنّي في محاضرة 5')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 5, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 5, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

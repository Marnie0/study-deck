// Head First chapter for Operating Systems Lecture 1 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Introduction: what an OS is, startup, interrupts, I/O, storage, caching, DMA, architecture, multiprogramming,
// dual mode, the timer, and the OS's management jobs. Every fact comes from the lecture's notes; analogies and tricks are
// marked as ours. Questions marked "beyond the slides" are the doctor's, answered from the standard textbook as the site does.
// Arabic follows the site's rules: Egyptian colloquial, English technical terms, code in <code>, chains in <span class="ltr">,
// short English pieces with symbols in <bdi dir="ltr">.
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K;
  const { useState, useEffect } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-os1')) {
    const s = document.createElement('style'); s.id = 'hf-css-os1';
    s.textContent = `
.hfb .hf-os1-boot{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; background:var(--paper); }
.hfb .hf-os1-boot .hf-os1-stn{ display:flex; gap:4px; padding:6px; background:var(--hf-grey); }
.hfb .hf-os1-boot .hf-os1-stn button{ flex:1 1 0; min-width:0; font:800 14px/1 var(--body); padding:0; min-height:34px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os1-boot .hf-os1-stn button.hf-os1-on{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-os1-boot .hf-os1-stn button.hf-os1-past{ color:var(--ink); border-color:var(--hf-line); }
.hfb .hf-os1-scr{ height:150px; margin:8px 10px 0; border:2px solid var(--hf-line); border-radius:8px; background:var(--hf-grey); display:grid; place-items:center; position:relative; overflow:hidden; }
.hfb .hf-os1-scr .hf-os1-pw{ width:64px; height:64px; color:var(--hf-k); }
.hfb .hf-os1-scr .hf-os1-pw.hf-os1-glow{ animation:hf-os1-pulse 1.4s ease-in-out infinite; }
@keyframes hf-os1-pulse{ 50%{ opacity:.45; transform:scale(.93); } }
.hfb .hf-os1-chip{ border:2px solid var(--hf-line); border-radius:6px; padding:8px 12px; background:var(--paper); text-align:center; display:grid; gap:4px; }
.hfb .hf-os1-chip small{ font:700 12.5px/1.1 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.06em; }
.hfb .hf-os1-chip b{ font:800 15px/1.1 var(--body); color:var(--ink); }
.hfb .hf-os1-chip.hf-os1-hot{ border-color:var(--hf-k); box-shadow:0 0 0 3px color-mix(in srgb, var(--hf-k) 25%, transparent); }
.hfb .hf-os1-chip code{ font:700 13px/1.2 var(--mono); color:var(--hf-k); }
.hfb .hf-os1-trio{ display:flex; gap:8px; }
.hfb .hf-os1-trio .hf-os1-chip{ padding:8px 8px; }
.hfb .hf-os1-trio .hf-os1-chip i{ font-style:normal; font:800 16px/1 var(--body); color:var(--ok); }
.hfb .hf-os1-flow{ display:flex; align-items:center; gap:8px; }
.hfb .hf-os1-flow svg{ color:var(--hf-k); flex:none; }
.hfb .hf-os1-run{ display:inline-flex; align-items:center; gap:6px; font:700 13px/1 var(--body); color:var(--ok); justify-content:center; }
.hfb .hf-os1-run::before{ content:""; width:9px; height:9px; border-radius:50%; background:var(--ok); animation:hf-os1-pulse 1.1s ease-in-out infinite; }
.hfb .hf-os1-cap{ margin:8px 10px 0; min-height:62px; font:500 14px/1.36 var(--body); color:var(--ink); }
.hfb .hf-os1-cap b{ font-weight:700; }
.hfb .hf-os1-bar{ display:flex; gap:8px; align-items:center; padding:8px 10px 10px; }
.hfb .hf-os1-bar .grow{ flex:1; }
.hfb.hf-ar .hf-os1-cap{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.55; }
.hfb.hf-ar .hf-os1-chip small, .hfb.hf-ar .hf-os1-run{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
/* stack the storage pyramid */
.hfb .hf-os1-pyr{ display:grid; gap:2px; justify-items:center; padding:2px 0; }
.hfb .hf-os1-pyr > div{ height:25px; border:1.5px dashed var(--faint); border-radius:4px; display:grid; place-items:center; font:700 13.5px/1 var(--body); color:var(--ink); }
.hfb .hf-os1-pyr > div.hf-os1-full{ border:1.5px solid var(--hf-line); background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); animation:hf-up .35s both; }
.hfb .hf-os1-ends{ display:flex; justify-content:space-between; font:700 12.5px/1.1 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.05em; }
.hfb .hf-os1-picks{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; }
.hfb .hf-os1-picks button{ font:600 13.5px/1 var(--body); padding:7px 10px; min-height:34px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-os1-picks button.hf-os1-no{ border-color:var(--hf-red); color:var(--hf-red); animation:hf-os1-shake .35s; }
@keyframes hf-os1-shake{ 25%{ transform:translateX(-3px); } 75%{ transform:translateX(3px); } }
.hfb .hf-os1-fb{ font:500 13.5px/1.35 var(--body); margin:0; min-height:2.7em; color:var(--ink); text-align:center; }
.hfb .hf-os1-fb.hf-os1-bad{ color:var(--hf-red); } .hfb .hf-os1-fb.hf-os1-good{ color:var(--ok); font-weight:600; }
.hfb.hf-ar .hf-os1-fb{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hfb.hf-ar .hf-os1-ends{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
/* true or false, rapid fire: each row is one of the doctor's questions */
.hfb .hf-os1-tf{ border-bottom:1px dotted var(--line); padding-bottom:6px; }
.hfb .hf-os1-tf .hf-os1-tfr{ display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; }
.hfb .hf-os1-tf .q{ margin:0; font:600 14px/1.3 var(--body); }
.hfb .hf-os1-tf .src{ margin:0 0 2px; }
.hfb .hf-os1-tf .hf-opts{ display:flex !important; gap:4px; }
.hfb .hf-os1-tf .hf-opts button{ min-height:32px; padding:5px 8px; font-size:13px; }
.hfb .hf-os1-tf .hf-why{ margin-top:4px; }
/* side-by-side comparison */
.hfb .hf-os1-vs{ display:grid; grid-template-columns:1fr 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-os1-vs > span{ font:500 13.5px/1.3 var(--body); padding:5px 7px; border-bottom:1px dotted var(--line); color:var(--ink); }
.hfb .hf-os1-vs > span:nth-child(odd){ border-right:1.5px solid var(--hf-line); }
.hfb .hf-os1-vs > span.hf-os1-h{ font-weight:800; background:var(--hf-grey); border-bottom:1.5px solid var(--hf-line); }
.hfb .hf-os1-vs > span b{ font-weight:700; }
.hfb.hf-ar .hf-os1-vs > span{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.45; }
.hfb.hf-ar .hf-os1-vs > span:nth-child(odd){ border-right:0; border-left:1.5px solid var(--hf-line); }
.hfb .hf-os1-vs code{ font-family:var(--mono); font-size:.88em; }
.hfb .hf-os1-g2 .hf-opts{ grid-template-columns:1fr 1fr; }
.hfb .hf-os1-st{ width:100%; border-collapse:collapse; color:var(--ink); }
.hfb .hf-os1-st th{ font:800 12.5px/1.1 var(--body); text-transform:uppercase; letter-spacing:.04em; color:var(--graphite); text-align:left; padding:0 5px 5px; border-bottom:2px solid var(--hf-line); }
.hfb .hf-os1-st td{ font:500 13.5px/1.2 var(--body); padding:5px 5px; border-bottom:1px dotted var(--line); text-align:left; }
.hfb .hf-os1-st td:nth-child(2){ font-family:var(--mono); font-size:13px; white-space:nowrap; }
.hfb .hf-os1-st td b{ font-weight:700; color:var(--hf-k); }
.hfb.hf-ar .hf-os1-st th{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
`;
    document.head.appendChild(s);
  }

  const ARW = html`<svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true"><path d="M1 8h18M13 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>`;
  const POWER = html`<svg className="hf-os1-pw" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true"><path d="M24 6v16"/><path d="M14 11a15 15 0 1 0 20 0"/></svg>`;

  // boot the computer: power-up → bootstrap (ROM/EPROM firmware) → initialize → load the kernel → the kernel runs (lecture slide 9)
  const BOOT = [
    ['Power-up or reboot. The machine wakes up knowing nothing.', 'الجهاز بيعمل <b>power-up</b> أو reboot، وصاحي مش فاكر أي حاجة.'],
    ['The <b>bootstrap program</b> is loaded. It is stored in <b>ROM or EPROM</b>, generally known as <b>firmware</b>.', 'الـ <b>bootstrap program</b> بيتحمّل. متخزن في <b>ROM أو EPROM</b>، واسمها <b>firmware</b>.'],
    ['The bootstrap program <b>initializes all aspects of the system</b>.', 'الـ bootstrap بيعمل <b>initialize لكل حاجة في السيستم</b>.'],
    ['It <b>loads the operating system kernel</b> and starts its execution.', 'بعدها <b>بيحمّل الـ OS kernel</b> ويبدأ تشغيله.'],
    ['The <b>kernel</b> is now "the one program running at all times". From here on, the OS is <b>interrupt driven</b>.', 'الـ <b>kernel</b> بقى "البرنامج الوحيد اللي شغال طول الوقت". ومن هنا الـ OS بقى <b>interrupt driven</b>.']
  ];
  function BootScreen({ i }) {
    const ar = useAr();
    if (i === 0) return html`<div className="hf-in">${POWER}</div>`;
    if (i === 1) return html`<div className="hf-os1-chip hf-os1-hot hf-in"><small>${ar ? 'الـ firmware' : 'firmware'}</small><b>ROM / EPROM</b><code>bootstrap program</code></div>`;
    if (i === 2) return html`<div className="hf-os1-trio">${['CPU', 'memory', 'I/O devices'].map((n, j) => html`<div key=${j} className="hf-os1-chip hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.25 + 's' }}><b>${n}</b><i>✓</i></div>`)}</div>`;
    if (i === 3) return html`<div className="hf-os1-flow hf-in"><div className="hf-os1-chip"><small>${ar ? 'من الـ firmware' : 'from firmware'}</small><b>bootstrap</b></div>${ARW}<div className="hf-os1-chip hf-os1-hot"><small>${ar ? 'اتحمّل واشتغل' : 'loaded + started'}</small><b>OS kernel</b></div></div>`;
    return html`<div className="hf-os1-chip hf-os1-hot hf-in"><b>kernel</b><span className="hf-os1-run">${ar ? 'شغال طول الوقت' : 'running at all times'}</span></div>`;
  }
  function BootUp() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('boot', 0);
    const [play, setPlay] = useState(false);
    useEffect(() => { if (!play) return; if (i >= BOOT.length - 1) { setPlay(false); return; } const t = setTimeout(() => setI(i + 1), 2300); return () => clearTimeout(t); }, [play, i]);
    const last = BOOT.length - 1;
    const names = ['Power-up', 'Bootstrap', 'Initialize', 'Load kernel', 'Kernel runs'];
    return html`<div className="hf-os1-boot hf-in">
      <div className="hf-os1-stn" role="group" aria-label="Boot steps">${BOOT.map((_, j) => html`<button key=${j} className=${j === i ? 'hf-os1-on' : j < i ? 'hf-os1-past' : ''} onClick=${() => { setPlay(false); setI(j); }} aria-pressed=${String(j === i)} aria-label=${names[j]} title=${names[j]}>${j + 1}</button>`)}</div>
      <div className="hf-os1-scr" dir="ltr" key=${i}><${BootScreen} i=${i} /></div>
      <p className="hf-os1-cap">${T(BOOT[i][ar ? 1 : 0])}</p>
      <div className="hf-os1-bar">
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.max(0, i - 1)); }} disabled=${i === 0} aria-label=${ar ? 'الخطوة اللي فاتت' : 'Back one step'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" onClick=${() => { if (i >= last) setI(0); setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= last ? (ar ? 'شغّله تاني' : 'Boot again') : (ar ? 'شغّل الجهاز' : 'Power on')}</button>
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.min(last, i + 1)); }} disabled=${i === last} aria-label=${ar ? 'الخطوة الجاية' : 'Next step'}>${ar ? '‹' : '›'}</button>
        <span className="grow"></span>
        <span className="hf-dots">${BOOT.map((_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  // stack the storage-device hierarchy (slide 18): tap the levels from fastest to slowest
  const LEVELS = ['registers', 'cache', 'main memory', 'solid-state disk', 'hard disk', 'optical disk', 'magnetic tapes'];
  const SHUF = [4, 1, 6, 2, 0, 5, 3];
  function Pyramid() {
    const ar = useAr();
    const [n, setN] = H.K.useSlot('pyr', 0);
    const [bad, setBad] = useState(null);
    const done = n >= LEVELS.length;
    const tap = j => { if (done) return; if (j === n) { setN(n + 1); setBad(null); } else setBad(j); };
    const fb = done ? ['hf-os1-good', ar ? 'تمام! فوق: سريع وصغير وغالي. تحت: بطيء وكبير ورخيص.' : 'Stacked! Top: fast, small, expensive. Bottom: slow, large, cheap.']
      : bad != null ? ['hf-os1-bad', ar ? `لسه بدري على الـ ${LEVELS[bad]}: فيه مستوى أسرع منه لسه مستني.` : `Not yet: something faster than the ${LEVELS[bad]} is still waiting.`]
      : ['', ar ? (n ? 'كمّل: المستوى الجاي اللي أبطأ شوية.' : 'ابدأ بالأسرع، اللي فوق خالص.') : (n ? 'Keep going: the next, slightly slower level.' : 'Start with the fastest, at the very top.')];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-os1-ends" dir="ltr"><span>${ar ? 'أسرع' : 'faster'} ↑</span><span>↓ ${ar ? 'أكبر وأرخص' : 'larger, cheaper'}</span></div>
      <div className="hf-os1-pyr" dir="ltr">${LEVELS.map((l, j) => html`<div key=${j} className=${j < n ? 'hf-os1-full' : ''} style=${{ width: (34 + j * 11) + '%' }}>${j < n ? l : ''}</div>`)}</div>
      <p className=${'hf-os1-fb ' + fb[0]}>${fb[1]}</p>
      <div className="hf-os1-picks" dir="ltr">${SHUF.filter(j => j >= n).map(j => html`<button key=${j} className=${bad === j ? 'hf-os1-no' : ''} onClick=${() => tap(j)}>${LEVELS[j]}</button>`)}</div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn" onClick=${() => { setN(LEVELS.length); setBad(null); }} disabled=${done}>${ar ? 'ورّيني' : 'Show me'}</button>
        <button className="hf-btn" onClick=${() => { setN(0); setBad(null); }} disabled=${!n}>${ar ? 'من الأول' : 'Start over'}</button>
      </div>
    </div>`;
  }

  // rapid fire: the doctor's True/False questions as compact rows, each with the site's reason for the answer you picked
  function TF({ id, items }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id, {});
    const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/^True or False:\s*/i, '');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>${items.filter(x => x.q).map((x, k) => {
      const q = x.q, mine = p[k];
      return html`<div key=${k} className="hf-mcq hf-os1-tf" dir="ltr">
        <p className="src">${strip(q.src)}</p>
        <div className="hf-os1-tfr"><p className="q">${strip(q.q)}</p>
          <div className="hf-opts">${q.o.map((o, j) => html`<button key=${j} className=${mine == null ? '' : j === q.a ? 'ok' : j === mine ? 'no' : ''} onClick=${() => mine == null && setP(Object.assign({}, p, { [k]: j }))} aria-pressed=${String(mine === j)}>${o[0]}${mine != null && j === q.a ? ' ✓' : ''}</button>`)}</div></div>
        ${mine != null && (ar && x.why && x.why[mine] ? html`<p className="hf-why" dir="rtl" lang="ar">${T(x.why[mine])}</p>` : html`<p className="hf-why" dir="ltr">${T(q.o[mine][1])}</p>`)}
      </div>`; })}</div>`;
  }

  H.chapters.os[1] = {
    title: 'Introduction to Operating Systems',
    kicker: 'Chapter 1',
    run: 'introduction to operating systems',
    ar: { title: 'مقدمة عن الـ Operating Systems', kicker: 'الفصل 1', run: 'مقدمة عن الـ operating systems' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctor's own questions on this lecture (Exam 2026, Midterm 2026/27), with the site's Egyptian Arabic reasons
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[1] && window.AR.os.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const mq2 = (id, re) => html`<div className="hf-os1-g2">${mq(id, re)}</div>`;
      const tf = (id, res) => html`<${TF} id=${id} items=${res.map(q)} />`;
      const page = (el, o) => Object.assign({ el }, o || {});
      const exam = t("From the doctor's papers", 'من امتحانات الدكتور');
      return [
        // 0 · how to use this book (faces the opener)
        page(html`
          <${H2}>${t('How to use this book', 'إزاي تذاكر الكتاب ده')}</${H2}>
          <${P} small=${true}>${X(`We know what you're thinking: <i>"How can this be a serious operating systems book?"</i> Your brain remembers what's surprising, visual and a bit emotional, so that's how this book is written. Every fact is from the doctor's slides.`,
            `عارفين إنت بتفكر في إيه: <i>"هو ده كتاب operating systems بجد؟"</i> مخك بيفتكر الحاجة اللي بتفاجئه واللي فيها صور ومشاعر، فالكتاب مكتوب كده. بس كل معلومة فيه من سلايدز الدكتور.`)}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" is not optional. You answer right on the page.', '<b>حل التمارين.</b> "امسك القلم" مش اختياري. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, taken from the doctor's own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكتور نفسه.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slip on the slides, or a word that is not on them, and what was meant.', 'غلطة في السلايد أو كلمة مش فيها، وبنقولك المقصود.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات المكتوبة بخط الإيد واللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this book', 'إزاي تذاكر الكتاب ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>Operating Systems` : html`Chapter one<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("Who's in Charge Here?", 'مين الكبير هنا؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('introduction to operating systems', 'مقدمة عن الـ operating systems')}</p></div>
          <${P}>${X("Your laptop has a CPU, memory, a disk, a keyboard and a screen, and they all want something at the same time. <b>Somebody has to run the show.</b>", 'اللابتوب بتاعك فيه CPU وmemory وdisk وkeyboard وشاشة، وكلهم عايزين حاجة في نفس اللحظة. <b>لازم حد يدير الليلة.</b>')}</${P}>
          <${Talk} who="dev">${t('I just pressed the power button and opened my browser. Nobody was in charge.', 'أنا دوست على زرار الـ power وفتحت الـ browser. محدش كان بيدير حاجة.')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X("Oh, <i>somebody</i> was. You're welcome.", 'لأ، كان فيه <i>حد</i>. العفو.')}</${Talk}>
          <${P}>${X("That somebody is the <b>operating system</b>. In this chapter you'll boot a computer, catch interrupts, climb the storage pyramid, and flip the mode bit.", 'الحد ده هو الـ <b>operating system</b>. في الفصل ده هتعمل boot لكمبيوتر، وتمسك interrupts، وتطلع هرم الـ storage، وتقلب الـ mode bit.')}</${P}>
        `, { sec: t('Meet the OS', 'اتعرّف على الـ OS') }),

        // 2 · what is an OS
        page(html`
          <${H1}>${A ? 'يعني إيه operating system؟' : html`So what <i>is</i> an operating system?`}</${H1}>
          <${Def}>${X('An <b>operating system</b> is a program that acts as an <b>intermediary between the user</b> of a computer <b>and the computer hardware</b>.',
            'الـ <b>operating system</b> برنامج بيقف <b>وسيط بين الـ user</b> بتاع الكمبيوتر <b>وبين الـ hardware</b>.')}</${Def}>
          <${P} small=${true}>${t('It has three goals:', 'وليه تلات أهداف:')}</${P}>
          <${UL} items=${A ? ['إنه <b>يشغّل برامج الـ user</b> ويسهّل حل مشاكله.', 'إنه يخلّي الكمبيوتر <b>convenient</b>، يعني مريح في الاستخدام.', 'إنه يستخدم الـ hardware بطريقة <b>efficient</b>.']
            : ['<b>Execute user programs</b> and make solving user problems easier.', 'Make the computer system <b>convenient</b> to use.', 'Use the computer hardware in an <b>efficient</b> manner.']} />
          <${Hand} tilt=${true}>${t('Our trick: Run it, make it Comfy, make it Cheap on hardware. Execute, convenient, efficient.', 'حيلة من عندنا: شغّل، ريّح، وفّر. يعني execute وconvenient وefficient.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Convenient and efficient can pull in opposite directions. Who cares more about each one: you on your own laptop, or a computer shared by hundreds of users?', 'الـ convenient والـ efficient ممكن يشدّوا في اتجاهين عكس بعض. مين يهمه أنهي واحد أكتر: إنت على اللابتوب بتاعك، ولا كمبيوتر مشترك بين مية user؟')}</p></${Box}>
        `, { sec: t('What is an OS?', 'يعني إيه OS؟') }),

        // 3 · the four components figure
        page(html`
          <${H2}>${t('Four components of a computer system', 'الـ 4 components بتوع الـ computer system')}</${H2}>
          <${Fig} name="os-four-components" />
        `),

        // 4 · sort the four components
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which layer is it? <b>HW</b> hardware, <b>OS</b> operating system, <b>App</b> application programs, <b>U</b> users.', 'ده في أنهي طبقة؟ اختار الاختصار، من تحت لفوق:<span class="ltr"><b>HW</b> hardware · <b>OS</b> operating system · <b>App</b> application programs · <b>U</b> users</span>')}</p></${Box}>
          <${Sort} id="four" bins=${A ? [['HW', 'الـ hardware'], ['OS', 'الـ OS'], ['App', 'الـ applications'], ['U', 'الـ users']] : [['HW', 'Hardware'], ['OS', 'Operating system'], ['App', 'Application programs'], ['U', 'Users']]} items=${A ? [
            ['الـ CPU والـ memory والـ <bdi dir="ltr">I/O devices</bdi>', 0],
            ['نظامي <bdi dir="ltr">Windows</bdi> و<bdi dir="ltr">Linux</bdi>', 1],
            ['بيتحكم في الـ hardware وينسّقه بين الـ applications والـ users', 1],
            ['الـ compilers والـ browsers والـ video games', 2],
            ['بيحددوا إزاي الـ resources بتتستخدم لحل مشاكل الـ users', 2],
            ['ناس، أجهزة، وكمبيوترات تانية', 3]
          ] : [
            ['CPU, memory, I/O devices', 0],
            ['Windows, Linux', 1],
            ['Controls and coordinates the hardware among applications and users', 1],
            ['Compilers, web browsers, video games', 2],
            ['Define how system resources solve the users\' computing problems', 2],
            ['People, machines, other computers', 3]
          ]} />
        `),

        // 5 · point of view
        page(html`
          <${H2}>${t('What an OS does depends on who you ask', 'الـ OS بيعمل إيه؟ حسب إنت مين')}</${H2}>
          <${P} small=${true}>${t('Match each kind of computer to what its OS has to care about.', 'وصّل كل نوع كمبيوتر باللي الـ OS بتاعه لازم يهتم بيه.')}</${P}>
          <${Match} id="pov" left=${['Your own PC', 'Mainframe', 'Workstation', 'Handheld', 'Embedded']}
            right=${A ? ['ليه resources خاصة، بس غالبًا بيستخدم resources مشتركة من الـ servers', 'جوّه الأجهزة والعربيات، وواجهته قليلة أو مفيش', 'الـ user عايز سهولة وperformance كويس، ومش فارق معاه الـ resource utilization', 'فقير في الـ resources، ومتظبط للـ usability وعمر البطارية', 'كمبيوتر مشترك: لازم يرضّي كل الـ users']
              : ['Dedicated resources, but often uses shared resources from servers', 'Inside devices and automobiles: little or no user interface', 'Convenience, ease of use and good performance; resource utilization is not your problem', 'Resource-poor, optimized for usability and battery life', 'A shared computer: must keep all users happy']}
            answer=${[2, 4, 0, 3, 1]} />
        `, { sec: t('Points of view', 'وجهات النظر') }),

        // 6 · watch it: mainframe
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X("A computer shared by many users (a <b>mainframe</b> or minicomputer) has to keep <b>all</b> of them happy, so its OS cares about using every resource well. Your own PC's OS cares about <b>you</b>: ease of use and performance.",
            'الكمبيوتر اللي بيشاركه users كتير (زي الـ <b>mainframe</b> أو الـ minicomputer) لازم يرضّيهم <b>كلهم</b>، فالـ OS بتاعه بيهتم إنه يستخدم كل resource صح. أما الـ OS بتاع الـ PC بتاعك فبيهتم <b>بيك إنت</b>: سهولة الاستخدام والـ performance.')}</p></${Box}>
          ${mq2('m-main', /maximize resource utilization/i)}
          <${Grow} />
          <${Talk} who="os" flip=${true}>${t('Same me, different priorities. It depends on the point of view.', 'أنا نفس الشخص، بس الأولويات بتختلف. حسب وجهة النظر.')}</${Talk}>
        `),

        // 7 · interview
        page(html`
          <${Interview} title=${t('The Operating System, exposed', 'الـ Operating System على المكشوف')} sub=${t("This week's interview: is it a resource allocator or a control program?", 'حوار الأسبوع: هو resource allocator ولا control program؟')} lines=${A ? [
            ['المذيع', 'إنت مين بالظبط؟'],
            ['الـ OS', 'بصراحة؟ <b>مفيش تعريف واحد متفق عليه</b> ليّا.'],
            ['المذيع', 'إنت resource allocator ولا control program؟'],
            ['الـ OS', 'الاتنين. كـ <b>resource allocator</b> بدير كل الـ resources، وبحكم بين الطلبات اللي بتتعارض عشان الاستخدام يبقى efficient وعادل.'],
            ['الـ OS', 'وكـ <b>control program</b> بتحكم في تنفيذ البرامج عشان أمنع الأخطاء والاستخدام الغلط للكمبيوتر.'],
            ['المذيع', 'الشركة بتقول إنك كل حاجة بتبعتها لما تطلب OS.'],
            ['الـ OS', 'ده <b>تقريب كويس</b>، بس بيختلف جدًا من شركة للتانية.'],
            ['المذيع', 'وإيه الجزء منك اللي مبينامش؟'],
            ['الـ OS', 'الـ <b>kernel</b>: البرنامج الوحيد اللي شغال طول الوقت. وأي حاجة تانية يا <b>system program</b> يا <b>application program</b>.']
          ] : [
            ['Head First', 'So who are you, really?'],
            ['OS', 'Honestly? There is <b>no universally accepted definition</b> of me.'],
            ['Head First', 'Resource allocator or control program?'],
            ['OS', 'Both. As a <b>resource allocator</b> I manage all resources and decide between conflicting requests, for efficient and fair use.'],
            ['OS', 'As a <b>control program</b> I control the execution of programs, to prevent errors and improper use of the computer.'],
            ['Head First', 'Your vendor says you are everything they ship.'],
            ['OS', 'A <b>good approximation</b>. But it varies wildly.'],
            ['Head First', 'And the part of you that never sleeps?'],
            ['OS', 'The <b>kernel</b>: the one program running at all times. Everything else is a <b>system program</b> or an <b>application program</b>.']
          ]} />
        `, { sec: t('Definition and kernel', 'التعريف والـ kernel') }),

        // 8 · the kernel
        page(html`
          <${H2}>${t('The kernel and everybody else', 'الـ kernel وكل اللي حواليه')}</${H2}>
          <${Def}>${X('The <b>kernel</b> is "the one program running at all times on the computer". Everything else is either a <b>system program</b> (ships with the OS) or an <b>application program</b>.',
            'الـ <b>kernel</b> هو "البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر". أي حاجة تانية يا إما <b>system program</b> (جاي مع الـ OS) يا إما <b>application program</b>.')}</${Def}>
          <${Talk} who="os" flip=${true}>${X('Whatever ships with me: <b>system programs</b>. Your browser and games: <b>application programs</b>. Me, always on: the <b>kernel</b>.', 'اللي جاي معايا اسمه <b>system programs</b>، والـ browser والألعاب بتوعك <b>application programs</b>، وأنا اللي شغال على طول اسمي الـ <b>kernel</b>.')}</${Talk}>
          <${Grow} />
          ${tf('tf-kern', [/kernel consists of all system/i])}
          <${Hand} red=${true}>${t('The kernel is ONE program, not all of them. False on two of the doctor\'s papers.', 'الـ kernel برنامج واحد، مش كلهم. الجملة دي جت غلط في امتحانين للدكتور.')}</${Hand}>
        `),

        // 9 · boot the computer
        page(html`
          <${H1}>${t('Rise and shine: booting up', 'صباح الخير: الـ boot')}</${H1}>
          <${P} small=${true}>${t('When you press power, the kernel is not running yet. Something tiny has to start it. Press "Power on".', 'لما بتدوس power، الـ kernel لسه مش شغال. لازم حاجة صغيرة تشغّله. دوس "شغّل الجهاز".')}</${P}>
          <${BootUp} />
          <${Hand} arrow="up">${t('tap a number to jump to that step', 'دوس على أي رقم عشان تروح للخطوة دي')}</${Hand}>
        `, { sec: t('Computer startup', 'تشغيل الكمبيوتر') }),

        // 10 · startup figure
        page(html`
          <${H2}>${t('Computer startup, the slide\'s way', 'الـ startup زي ما السلايد بتقول')}</${H2}>
          <${Fig} name="os-startup" />
        `),

        // 11 · watch it: bootstrap is not in RAM
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The bootstrap lives in <b>ROM or EPROM</b> (<b>firmware</b>). Not in RAM: main memory is typically <b>volatile</b>, so at power-up it holds nothing.',
            'الـ bootstrap ساكن في <b>ROM أو EPROM</b> (الـ <b>firmware</b>). مش في الـ RAM: الـ main memory غالبًا <b>volatile</b>، فأول ما الجهاز يشتغل بتبقى فاضية.')}</p></${Box}>
          ${tf('tf-boot', [/bootstrap program is in the form of random/i])}
          <${Grow} />
          <${Talk} who="mem" flip=${true}>${t("At power-up I'm empty. Don't look at me.", 'أول ما الجهاز يشتغل بكون فاضية. متبصّليش.')}</${Talk}>
          <${Hand}>${t("Our analogy: the bootstrap is the alarm clock. It just gets the kernel out of bed.", 'تشبيه من عندنا: الـ bootstrap زي المنبّه، بس بيصحّي الـ kernel.')}</${Hand}>
        `),

        // 12 · system organization
        page(html`
          <${H1}>${t('Everybody on the bus', 'كله راكب الـ bus')}</${H1}>
          <${P} small=${true}>${X('One or more <b>CPUs</b> and <b>device controllers</b> connect through a <b>common bus</b> to <b>shared memory</b>. They all run <b>concurrently</b>, competing for memory cycles.',
            'فيه CPU واحد أو أكتر و<b>device controllers</b> متوصلين بـ <b>common bus</b> بيوصّلهم لـ <b>shared memory</b>. كلهم شغالين <b>concurrently</b> وبيتنافسوا على الـ memory cycles.')}</${P}>
          <${Talk} who="mem" flip=${true}>${t('Everybody wants a piece of me. CPUs and devices all compete for my memory cycles.', 'الكل عايز حتة مني. الـ CPUs والأجهزة كلهم بيتخانقوا على الـ memory cycles بتاعتي.')}</${Talk}>
          <${Talk} who="cpu">${X('Each device has its own <b>controller</b>: the disk controller, the USB controller for mouse, keyboard and printer, the graphics adapter for the monitor.', 'كل جهاز ليه <b>controller</b>: الـ disk controller، والـ USB controller للـ mouse والـ keyboard والـ printer، والـ graphics adapter للشاشة.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('The CPU and the devices work at the same time. So when a device finishes its job, how does the busy CPU find out?', 'الـ CPU والأجهزة شغالين في نفس الوقت. طب لما جهاز يخلّص شغله، الـ CPU المشغول هيعرف إزاي؟')}</p></${Box}>
        `, { sec: t('System organization', 'تنظيم السيستم') }),
        page(html`
          <${H2}>${t('Computer-system operation', 'تشغيل الـ computer system')}</${H2}>
          <${Fig} name="os-sys-org" />
        `),

        // 13 · interrupts
        page(html`
          <${H1}>${t('"Excuse me, I\'m done!"', '"لو سمحت، أنا خلّصت!"')}</${H1}>
          <${P} small=${true}>${X('Each <b>device controller</b> is in charge of one device type and has a <b>local buffer</b>. I/O goes from the device to that buffer; the CPU moves data between main memory and the buffers.',
            'كل <b>device controller</b> مسؤول عن نوع واحد من الأجهزة وعنده <b>local buffer</b>. الـ <bdi dir="ltr">I/O</bdi> بيروح من الجهاز للـ buffer ده، والـ CPU بينقل الداتا بين الـ main memory والـ buffers.')}</${P}>
          <${Talk} who="disk">${X('I finished my operation. How do I tell the CPU? I cause an <b>interrupt</b>.', 'أنا خلّصت شغلي. أقول للـ CPU إزاي؟ أعمل <b>interrupt</b>.')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('And I jump to the <b>interrupt service routine</b>, through the <b>interrupt vector</b>: it holds the addresses of all the service routines.', 'وأنا أنط على الـ <b>interrupt service routine</b> عن طريق الـ <b>interrupt vector</b>، اللي فيه عناوين كل الـ service routines.')}</${Talk}>
          <${Hand} red=${true}>${t('…after saving the address of the instruction it interrupted, so it can come back.', '…بعد ما يحفظ عنوان الـ instruction اللي اتقاطعت، عشان يعرف يرجع.')}</${Hand}>
          <${Grow} />
          <${Def}>${X('A <b>trap</b> (or <b>exception</b>) is a <b>software-generated interrupt</b>, caused either by an <b>error</b> or a <b>user request</b>. An OS is <b>interrupt driven</b>.',
            'الـ <b>trap</b> (أو الـ <b>exception</b>) هو <b>interrupt جاي من الـ software</b>، سببه يا <b>error</b> يا <b>طلب من الـ user</b>. والـ OS هو <b>interrupt driven</b>.')}</${Def}>
        `, { sec: t('Interrupts', 'الـ Interrupts') }),

        // 14 · interrupts figure
        page(html`
          <${H2}>${t('Watch an interrupt get handled', 'اتفرج على interrupt وهو بيتعالج')}</${H2}>
          <${Fig} name="os-interrupts" />
        `),

        // 15 · fireside chat: interrupt vs trap
        page(html`
          <${Fireside} sub=${t("Tonight's talk: a hardware Interrupt and a Trap argue about who really runs the OS.", 'قعدة الليلة: Interrupt جاي من الـ hardware وTrap بيتخانقوا مين بيشغّل الـ OS بجد.')} />
          <${Chat} names=${[t('Interrupt', 'الـ Interrupt'), t('Trap', 'الـ Trap')]} lines=${A ? [
            [0, 'أنا غالبًا <b>جاي من الـ hardware</b>. الـ device controller بيبعتني للـ CPU لما يخلّص.'],
            [1, 'وأنا <b>جاي من الـ software</b>. البرنامج نفسه هو اللي بيعملني.'],
            [0, 'أنا بوصل <b>asynchronous</b>، وقت ما يحصل event زي إن الـ <bdi dir="ltr">I/O</bdi> يخلص.'],
            [1, 'وأنا <b>synchronous</b> مع البرنامج اللي شغال.'],
            [0, 'وبتيجي ليه أصلًا؟'],
            [1, 'يا <b>error</b> زي القسمة على صفر، يا البرنامج <b>بيطلب service من الـ OS</b>، يعني system call.'],
            [0, 'وفيه ناس بتسميك exception.'],
            [1, 'نفس الحاجة: trap أو exception.'],
            [0, 'المهم إن الـ OS <b>interrupt driven</b>، فإحنا الاتنين اللي بنحرّكه.']
          ] : [
            [0, "I'm <b>usually generated by hardware</b>. A device controller sends me to the CPU when it's finished."],
            [1, "I'm <b>software-generated</b>. The running program itself causes me."],
            [0, 'I arrive <b>asynchronously</b>, whenever an event such as I/O completion happens.'],
            [1, "I'm <b>synchronous</b> with the running program."],
            [0, 'And why would a program cause you?'],
            [1, 'An <b>error</b>, like division by zero, or a <b>request for an OS service</b>: a system call.'],
            [0, 'Some people call you an exception.'],
            [1, 'Same thing. Trap or exception.'],
            [0, 'Either way, the OS is <b>interrupt driven</b>. It moves when we tell it to.']
          ]} />
        `),

        // 16 · sort: interrupt or trap
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Tap <b>I</b> for a hardware interrupt, <b>T</b> for a trap (exception).', 'ده interrupt ولا trap؟ دوس <b>I</b> للـ hardware interrupt و<b>T</b> للـ trap (الـ exception).')}</p></${Box}>
          <${Sort} id="irq" bins=${A ? [['I', 'الـ interrupt'], ['T', 'الـ trap']] : [['I', 'Interrupt'], ['T', 'Trap']]} items=${A ? [
            ['الـ disk controller خلّص الـ operation بتاعته', 0],
            ['برنامج قسم على صفر', 1],
            ['برنامج طلب service من الـ OS (system call)', 1],
            ['حصل event زي إن الـ <bdi dir="ltr">I/O</bdi> خلص', 0],
            ['بيوصل asynchronous', 0],
            ['synchronous مع البرنامج اللي شغال', 1]
          ] : [
            ['The disk controller finished its operation', 0],
            ['A program divides by zero', 1],
            ['A program asks the OS for a service (system call)', 1],
            ['An event such as I/O completion', 0],
            ['Arrives asynchronously', 0],
            ['Synchronous with the running program', 1]
          ]} />
          <${Grow} />
          ${tf('tf-irq', [/Interrupts may be triggered/i])}
        `),

        // 17 · interrupt handling
        page(html`
          <${H2}>${t('Handling an interrupt, step by step', 'التعامل مع الـ interrupt خطوة خطوة')}</${H2}>
          <${UL} items=${A ? [
            'الـ OS <b>بيحفظ حالة الـ CPU</b>: بيخزّن الـ <b>registers</b> والـ <b>program counter</b>.',
            'بيعرف نوع الـ interrupt اللي حصل: يا بالـ <b>polling</b>، يا بـ <b>vectored interrupt system</b>.',
            'فيه <b>أجزاء code منفصلة</b> بتقرر هيتعمل إيه لكل نوع interrupt.'
          ] : [
            'The OS <b>preserves the state of the CPU</b> by storing the <b>registers</b> and the <b>program counter</b>.',
            'It works out which type of interrupt occurred: by <b>polling</b>, or by a <b>vectored interrupt system</b>.',
            '<b>Separate segments of code</b> decide what action to take for each type of interrupt.'
          ]} />
          <${Dumb} qa=${A ? [
            ['يعني إيه polling ويعني إيه vectored؟', 'الاتنين طريقتين عشان الـ OS يعرف <b>مين</b> اللي عمل الـ interrupt. في الـ vectored، الـ <b>interrupt vector</b> فيه عناوين الـ service routines، فبينط على الـ routine الصح على طول. في الـ polling الـ OS هو اللي بيدوّر.'],
            ['ليه لازم يحفظ الـ program counter؟', 'عشان الـ interrupt architecture لازم <b>تحفظ عنوان الـ instruction اللي اتقاطعت</b>. من غيره البرنامج مش هيعرف يكمّل منين.']
          ] : [
            ['Polling or vectored: what\'s the difference?', 'Both answer <b>who</b> caused the interrupt. With a vectored system the <b>interrupt vector</b> holds the service routines\' addresses, so control goes straight to the right routine. With polling, the OS goes and finds out.'],
            ['Why save the program counter?', 'Because the interrupt architecture must <b>save the address of the interrupted instruction</b>. Without it, the program wouldn\'t know where to carry on.']
          ]} />
        `),

        // 18 · I/O structure
        page(html`
          <${H1}>${t('Wait for it… or don\'t', 'تستنى… ولا متستناش؟')}</${H1}>
          <${P} small=${true}>${X('Your program starts some I/O. When does it get control back?', 'البرنامج بتاعك بدأ <bdi dir="ltr">I/O</bdi>. الـ control بيرجعله إمتى؟')}</${P}>
          <div className="hf-os1-vs hf-in">
            <span className="hf-os1-h">${t('Synchronous I/O', 'الـ synchronous')}</span><span className="hf-os1-h">${t('Asynchronous I/O', 'الـ asynchronous')}</span>
            <span>${X('Control returns <b>only upon I/O completion</b>', 'الـ control بيرجع <b>بس لما الـ <bdi dir="ltr">I/O</bdi> يخلص</b>')}</span><span>${X('Control returns <b>without waiting</b> for completion', 'الـ control بيرجع <b>من غير ما يستنى</b>')}</span>
            <span>${X('A <b>wait instruction</b> idles the CPU until the next interrupt, or a <b>wait loop</b> (contention for memory access)', 'يا <b>wait instruction</b> تخلّي الـ CPU idle لحد الـ interrupt الجاي، يا <b>wait loop</b> (تنافس على الـ memory)')}</span><span>${X('A <b>system call</b> lets the user wait for I/O completion if it wants to', 'لو عايز تستنى، فيه <b>system call</b> تطلب بيها من الـ OS إنك تستنى')}</span>
            <span>${X('<b>At most one</b> I/O request outstanding: no simultaneous I/O', '<b>طلب واحد بالكتير</b> مستني: مفيش <bdi dir="ltr">I/O</bdi> في نفس الوقت')}</span><span>${X('A <b>device-status table</b>: one entry per device, with its type, address and state', 'فيه <b>device-status table</b>: entry لكل جهاز فيها نوعه وعنوانه وحالته')}</span>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('With asynchronous I/O, several devices can be busy at once. When one of them interrupts, what must the OS look up and update?', 'في الـ asynchronous ممكن كذا جهاز يبقوا شغالين مع بعض. لما واحد فيهم يعمل interrupt، الـ OS لازم يدوّر ويعدّل في إيه؟')}</p></${Box}>
        `, { sec: t('I/O structure', 'الـ I/O structure') }),

        // 19 · I/O figure
        page(html`
          <${Hand}>${X('Answer: the OS indexes into the <b>I/O device table</b> to find the device\'s status and modifies its entry to include the interrupt. Try both modes:', 'الإجابة: الـ OS بيدوّر في الـ <b>device table</b> عشان يعرف حالة الجهاز، ويعدّل الـ entry بتاعته عشان يضيف فيها الـ interrupt. جرّب الطريقتين:')}</${Hand}>
          <${Fig} name="os-io-structure" />
        `),

        // 20 · storage units
        page(html`
          <${H1}>${t('Bits, bytes and words', 'الـ bits والـ bytes والـ words')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>bit</b> هو الوحدة الأساسية للـ storage: قيمة من اتنين، 0 أو 1. وكل storage تاني مبني على مجموعات bits.',
            'الـ <b>byte</b> فيه <b>8 bits</b>، وهو أصغر حتة مريحة: أغلب الكمبيوترات مفيهاش instruction تنقل bit، بس فيها واحدة تنقل byte.',
            'الـ <b>word</b> هي الوحدة الأصلية للداتا في الـ architecture، byte أو أكتر. مع registers وaddressing <bdi dir="ltr">64-bit</bdi> الـ word بتبقى <bdi dir="ltr">64-bit</bdi>، يعني 8 bytes.'
          ] : [
            'The <b>bit</b> is the basic unit of storage: one of two values, 0 or 1. All other storage is collections of bits.',
            'A <b>byte</b> is <b>8 bits</b>, the smallest convenient chunk: most computers have no instruction to move a bit, but do have one to move a byte.',
            'A <b>word</b> is the architecture\'s native unit of data, one or more bytes. With 64-bit registers and addressing: <b>64-bit (8-byte) words</b>.'
          ]} />
          <${Code} lines=${[['KB = 1,024 B', ''], ['MB = 1,024² B', ''], ['GB = 1,024³ B', ''], ['TB = 1,024⁴ B', ''], ['PB = 1,024⁵ B', t('manufacturers round: 1 MB ≈ a million', 'الشركات بتقرّب: الـ MB مليون')]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Storage is measured in <b>bytes</b>. <b>Networking</b> is the exception: it is measured in <b>bits</b>, because networks move data a bit at a time.',
            'الـ storage بيتقاس بالـ <b>bytes</b>. الاستثناء هو الـ <b>networking</b>: بيتقاس بالـ <b>bits</b>، عشان الـ networks بتنقل الداتا bit bit.')}</p></${Box}>
        `, { sec: t('Storage', 'الـ Storage') }),


        // 22 · main memory and secondary storage
        page(html`
                    <${Talk} who="mem">${X('I\'m <b>main memory</b>: the only large storage the CPU can access <b>directly</b>. Random access, typically <b>volatile</b>.', 'أنا الـ <b>main memory</b>: الـ storage الكبير الوحيد اللي الـ CPU يوصله <b>مباشرة</b>. random access، وغالبًا <b>volatile</b>.')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X('I\'m <b>secondary storage</b>, your extension: large and <b>nonvolatile</b>. My surface: <b>tracks</b>, split into <b>sectors</b>.', 'وأنا الـ <b>secondary storage</b>، امتدادك: كبير و<b>nonvolatile</b>. سطحي <b>tracks</b> متقسمة <b>sectors</b>.')}</${Talk}>
          <${P} small=${true}>${X('<b>Solid-state disks</b>: faster than hard disks, nonvolatile, various technologies, becoming more popular.',
            'الـ <b>SSDs</b>: أسرع من الـ hard disks، وnonvolatile، وفيها technologies مختلفة، وبتنتشر.')}</${P}>
          <${Grow} />
          ${tf('tf-ssd', [/Solid state disks are generally faster/i, /Solid state disks are considered volatile/i])}
        `),

        // 23 · hierarchy figure
        page(html`
          <${H2}>${t('The storage-device hierarchy', 'هرم أجهزة الـ storage')}</${H2}>
          <${Fig} name="os-storage-hierarchy" />
        `),

        // 24 · stack the pyramid
        page(html`
          <${Box} kind="pencil" title=${t('Stack the pyramid', 'ابني الهرم')}><p className="hf-p small">${X('Ordered by <b>speed, cost and volatility</b>. Tap the seven levels from the fastest to the slowest.', 'مترتب حسب <b>السرعة والتكلفة والـ volatility</b>. دوس على السبع مستويات من الأسرع للأبطأ.')}</p></${Box}>
          <${Pyramid} />
          <${Grow} />
          <${Hand}>${A ? html`حيلة من عندنا: <bdi dir="ltr"><b>R</b>eal <b>C</b>oders <b>M</b>ake <b>S</b>ome <b>H</b>uge <b>O</b>ld <b>M</b>achines</bdi>` : html`Our trick: <b>R</b>eal <b>C</b>oders <b>M</b>ake <b>S</b>ome <b>H</b>uge <b>O</b>ld <b>M</b>achines`}</${Hand}>
        `),

        // 25 · caching
        page(html`
          <${H1}>${t('Caching: keep it close', 'الـ Caching: خلّيها قريبة')}</${H1}>
          <${P} small=${true}>${X('Caching is an <b>important principle, performed at many levels</b> (hardware, operating system, software): data in use is copied from slower to faster storage, temporarily.',
            'الـ caching <b>مبدأ مهم بيتعمل على مستويات كتير</b> (الـ hardware والـ OS والـ software): الداتا اللي بتستخدم بتتنسخ مؤقتًا من storage أبطأ لـ storage أسرع.')}</${P}>
          <${UL} items=${A ? ['الـ storage الأسرع (الـ cache) <b>بيتشاف الأول</b>.', 'لو الداتا فيه: بتستخدمها منه على طول (سريع).', 'لو مش فيه: بتتنسخ للـ cache وتستخدمها من هناك.']
            : ['The faster storage (the cache) is <b>checked first</b>.', 'If the data is there, it is used directly from the cache (fast).', 'If not, it is copied to the cache and used there.']} />
          <${Hand} tilt=${true}>${t('Our analogy: the cache is your desk, main memory is the bookshelf. You check the desk first.', 'تشبيه من عندنا: الـ cache هو المكتب بتاعك، والـ main memory هي المكتبة. بتبص على المكتب الأول.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('The cache is smaller than the storage it caches. So what happens when it is full and new data arrives?', 'الـ cache أصغر من الـ storage اللي بيعمله cache. طب لو اتملى وجت داتا جديدة، يحصل إيه؟')}</p></${Box}>
        `, { sec: t('Caching', 'الـ Caching') }),

        // 26 · caching figure
        page(html`
          <${H2}>${t('Try the cache yourself', 'جرّب الـ cache بنفسك')}</${H2}>
          <${Fig} name="os-caching" />
        `),

        // 27 · fireside: cache vs main memory
        page(html`
          <${Fireside} sub=${t("Tonight's talk: the Cache and Main Memory argue about who matters more.", 'قعدة الليلة: الـ Cache والـ Main Memory بيتخانقوا مين الأهم.')} />
          <${Chat} names=${[t('Cache', 'الـ Cache'), t('Main memory', 'الـ Main memory')]} lines=${A ? [
            [0, 'أنا <b>أسرع</b>. الداتا اللي بتستخدم بتتنسخ عندي مؤقتًا.'],
            [1, 'أسرع، بس <b>أصغر</b>. مش هتشيل كل اللي أنا شايلاه.'],
            [0, 'وعشان كده <b>بيبصوا عليّا الأول</b>. لو الداتا عندي، بتتاخد مني على طول.'],
            [1, 'ولو مش عندك؟'],
            [0, 'بتتنسخ عندي وتتستخدم من هنا. ولو أنا مليان، حد لازم يمشي: دي الـ <b>replacement policy</b>.'],
            [1, 'حجم الـ cache والـ replacement policy… يعني الـ <b>cache management مشكلة design مهمة</b>.'],
            [1, 'ومتنساش: أنا كمان cache. الـ <b>main memory ممكن تعتبرها cache للـ secondary storage</b>.'],
            [0, 'إحنا الاتنين بنعمل نفس الحيلة، كل واحد في مستواه.']
          ] : [
            [0, "I'm <b>faster</b>. Data in use gets copied into me, temporarily."],
            [1, "Faster, but <b>smaller</b>. You can't hold everything I hold."],
            [0, "That's why I'm <b>checked first</b>. If the data is in me, it's used straight from me."],
            [1, 'And if it isn\'t?'],
            [0, "Then it's copied into me and used here. If I'm full, somebody has to leave: that's the <b>replacement policy</b>."],
            [1, 'Cache size, replacement policy… <b>cache management is an important design problem</b>.'],
            [1, "And don't forget: I'm a cache too. <b>Main memory can be viewed as a cache for secondary storage.</b>"],
            [0, 'Same trick, different level.']
          ]} />
        `),

        // 28 · storage levels table
        page(html`
          <${H2}>${t('Performance of the levels (slide 33)', 'أداء المستويات (سلايد 33)')}</${H2}>
          <table className="hf-os1-st hf-in" dir="ltr"><thead><tr><th>${t('Level', 'المستوى')}</th><th>${t('Access (ns)', 'الـ access (ns)')}</th><th>${t('Managed by', 'بيديره')}</th></tr></thead><tbody>
            ${[['registers', '0.25–0.5', 'compiler'], ['cache', '0.5–25', 'hardware'], ['main memory', '80–250', 'OS'], ['solid-state disk', '25,000–50,000', 'OS'], ['magnetic disk', '5,000,000', 'OS']].map((r, j) => html`<tr key=${j}><td><bdi>${r[0]}</bdi></td><td dir="ltr">${r[1]}</td><td>${j < 2 ? html`<b>${r[2]}</b>` : r[2]}</td></tr>`)}
          </tbody></table>
          <${P} small=${true}>${X('Movement between levels can be <b>explicit or implicit</b>.', 'النقل بين المستويات ممكن يبقى <b>explicit أو implicit</b>.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Who manages each level? <b>Registers: the compiler. Cache: the hardware.</b> Main memory, SSD and disk: the <b>operating system</b>. ‡ The slide lists main memory\'s technology as CMOS SRAM; real main memory is DRAM.',
            'مين بيدير كل مستوى؟ الـ <b>compiler</b> بيدير الـ registers، والـ <b>hardware</b> بيدير الـ cache، والـ <b>OS</b> بيدير الباقي. ‡ السلايد كاتبة إن تكنولوجيا الـ main memory هي <bdi dir="ltr">CMOS SRAM</bdi>، والحقيقة إنها DRAM.')}</p></${Box}>
        `, { sec: t('Levels of storage', 'مستويات الـ storage') }),
        page(html`
          <${H2}>${t('All five levels, compared', 'المستويات الخمسة جنب بعض')}</${H2}>
          <${Fig} name="os-storage-levels" />
        `),

        // 29 · migration and coherency
        page(html`
          <${H2}>${t('Data "A" climbs up, and copies pile up', 'الداتا "A" طالعة لفوق، والنسخ بتكتر')}</${H2}>
          <${Fig} name="os-migrate" />
        `),

        // 30 · device drivers and DMA
        page(html`
          <${H1}>${t('DMA: skip the middleman', 'الـ DMA: من غير وسيط')}</${H1}>
          <${P} small=${true}>${X('Each device controller has a <b>device driver</b> to manage I/O: a uniform interface between the controller and the kernel.',
            'كل device controller ليه <b>device driver</b> بيدير الـ <bdi dir="ltr">I/O</bdi>، وبيدّي interface موحد بين الـ controller والـ kernel.')}</${P}>
          <${Def}>${X('<b>Direct Memory Access (DMA)</b> is used for <b>high-speed I/O devices</b> able to transmit at close to memory speeds. The device controller transfers <b>blocks</b> of data from buffer storage <b>directly to main memory without CPU intervention</b>. <b>Only one interrupt per block</b>, rather than one per byte.',
            'الـ <b>DMA</b> بيستخدم مع <b>الأجهزة السريعة</b> اللي بتنقل بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل <b>blocks</b> من الـ buffer <b>للـ main memory على طول من غير تدخل الـ CPU</b>. و<b>interrupt واحد بس لكل block</b> بدل واحد لكل byte.')}</${Def}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Our numbers, not the slides\': a device sends one <b>4 KB</b> block. How many interrupts without DMA (one per byte)? How many with DMA?', 'أرقام من عندنا: جهاز بيبعت block واحد حجمه <b>4 KB</b>. كام interrupt من غير DMA (واحد لكل byte)؟ وكام مع الـ DMA؟')}</p></${Box}>
          <${K.Reveal} id="dma-ans"><p className="hf-hand">${t('4 KB = 4 × 1,024 = 4,096 bytes → 4,096 interrupts without DMA, just 1 with it.', 'الـ 4 KB يعني 4 × 1,024 = 4,096 byte، يعني 4,096 interrupt من غير DMA، وواحد بس معاه.')}</p></${K.Reveal}>
        `, { sec: t('DMA', 'الـ DMA') }),

        // 31 · DMA structure figure
        page(html`
          <${H2}>${t('The DMA structure', 'تركيبة الـ DMA')}</${H2}>
          <${Fig} name="os-dma" />
        `),

        // 32 · interrupts per byte vs per block
        page(html`
          <${H2}>${t('Count the interrupts', 'عِد الـ interrupts')}</${H2}>
          <${Fig} name="os-dma-irq" />
        `),

        // 33 · architecture
        page(html`
          <${H1}>${t('More than one brain', 'أكتر من مخ')}</${H1}>
          <${P} small=${true}>${X('Most systems use a <b>single general-purpose processor</b> (plus special-purpose ones). <b>Multiprocessor</b> systems, also called <b>parallel</b> or <b>tightly-coupled</b> systems, are growing in use and importance. Three advantages:',
            'أغلب الأنظمة بتستخدم <b>general-purpose processor واحد</b> (ومعاه special-purpose processors). وأنظمة الـ <b>multiprocessors</b>، واسمها كمان <b>parallel</b> أو <b>tightly-coupled</b>، استخدامها بيزيد. ليها 3 مميزات:')}</${P}>
          <${UL} items=${A ? ['الـ <b>increased throughput</b>', 'الـ <b>economy of scale</b>', 'الـ <b>increased reliability</b>'] : ['<b>Increased throughput</b>', '<b>Economy of scale</b>', '<b>Increased reliability</b>']} />
          <div className="hf-os1-vs hf-in">
            <span className="hf-os1-h">${t('Asymmetric multiprocessing', 'الـ asymmetric')}</span><span className="hf-os1-h">${t('Symmetric (SMP)', 'الـ symmetric (SMP)')}</span>
            <span>${X('Each processor is assigned a <b>specific task</b>', 'كل processor متخصصله <b>task معينة</b>')}</span><span>${X('Each processor performs <b>all tasks</b>', 'كل processor بيعمل <b>كل الـ tasks</b>')}</span>
          </div>
          <${Hand} tilt=${true}>${t('Our trick: Symmetric = Same jobs for everyone.', 'حيلة من عندنا: الـ symmetric يعني متماثل، كلهم نفس الشغل.')}</${Hand}>
        `, { sec: t('Architecture', 'الـ Architecture') }),

        // 34 · dual core figure
        page(html`
          <${H2}>${t('A dual-core design', 'تصميم الـ dual-core')}</${H2}>
          <${Fig} name="os-dualcore" />
        `),

        // 35 · multiprogramming vs timesharing
        page(html`
          <${H2}>${t('Never let the CPU sit idle', 'متسيبش الـ CPU قاعد فاضي')}</${H2}>
          <div className="hf-os1-vs hf-in">
            <span className="hf-os1-h">${t('Multiprogramming (batch)', 'الـ multiprogramming (batch)')}</span><span className="hf-os1-h">${t('Timesharing (multitasking)', 'الـ timesharing (multitasking)')}</span>
            <span>${X('Needed for <b>efficiency</b>: one user can\'t keep the CPU and I/O busy all the time', 'محتاجينه عشان الـ <b>efficiency</b>: user واحد مش هيشغّل الـ CPU والـ <bdi dir="ltr">I/O</bdi> طول الوقت')}</span><span>${X('Logical extension: the CPU switches jobs so often that users can <b>interact</b> with each running job', 'امتداد منطقي: الـ CPU بيبدّل بين الـ jobs بسرعة لدرجة إن الـ users <b>يتعاملوا</b> مع كل job وهي شغالة')}</span>
            <span>${X('A subset of jobs (code and data) is kept in memory; one is picked by <b>job scheduling</b>', 'جزء من الـ jobs (code وdata) بيتشال في الـ memory، وواحدة بتتختار بالـ <b>job scheduling</b>')}</span><span>${X('Response time <b>&lt; 1 second</b>; each user has at least one program in memory: a <b>process</b>', 'الـ response time <b>أقل من ثانية</b>، وكل user ليه برنامج واحد على الأقل في الـ memory، اسمه <b>process</b>')}</span>
            <span>${X('A job has to wait (for I/O)? The OS <b>switches to another job</b>', 'لو job استنت (<bdi dir="ltr">I/O</bdi> مثلًا)، الـ OS <b>بيبدّل لـ job تانية</b>')}</span><span>${X('Several jobs ready → <b>CPU scheduling</b>; too big for memory → <b>swapping</b>; <b>virtual memory</b>', 'كذا job جاهزين ← <b>CPU scheduling</b>؛ مش مكفية الـ memory ← <b>swapping</b>؛ وكمان <b>virtual memory</b>')}</span>
          </div>
        `, { sec: t('Multiprogramming', 'الـ Multiprogramming') }),

        // 36 · multiprogramming figure
        page(html`
          <${H2}>${t('Keep the CPU busy', 'خلّي الـ CPU شغال')}</${H2}>
          <${Fig} name="os-multiprog" />
        `),

        // 37 · sort: multiprogramming or timesharing
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('<b>M</b> for multiprogramming (batch), <b>T</b> for timesharing (multitasking).', 'اختار <b>M</b> لو multiprogramming (batch)، أو <b>T</b> لو timesharing (multitasking).')}</p></${Box}>
          <${Sort} id="mt" bins=${A ? [['M', 'الـ multiprogramming'], ['T', 'الـ timesharing']] : [['M', 'Multiprogramming'], ['T', 'Timesharing']]} items=${A ? [
            ['اسمه كمان batch system', 0],
            ['اسمه كمان multitasking', 1],
            ['الـ response time أقل من ثانية', 1],
            ['الـ job scheduling بيختار job', 0],
            ['الـ users بيتعاملوا مع كل job وهي شغالة', 1],
            ['لو job استنت <bdi dir="ltr">I/O</bdi>، الـ OS بيبدّل لـ job تانية', 0],
            ['محتاج swapping وvirtual memory', 1],
            ['الـ CPU دايمًا عنده job ينفذها', 0]
          ] : [
            ['Also called a batch system', 0],
            ['Also called multitasking', 1],
            ['Response time under 1 second', 1],
            ['Job scheduling picks a job', 0],
            ['Users interact with each job while it runs', 1],
            ['A job waits for I/O, the OS switches to another', 0],
            ['Needs swapping and virtual memory', 1],
            ['The CPU always has a job to execute', 0]
          ]} />
        `),

        // 38 · dual mode
        page(html`
          <${H1}>${t('Two hats: user mode and kernel mode', 'طاقيتين: الـ user mode والـ kernel mode')}</${H1}>
          <${P} small=${true}>${X('Other problems besides errors: <b>infinite loops</b>, and <b>processes modifying each other</b>. <b>Dual-mode operation</b> lets the OS protect itself and other system components.',
            'غير الأخطاء فيه الـ <b>infinite loops</b> والـ <b>processes اللي بتعدّل في بعض</b>. والـ <b>dual-mode operation</b> بتخلّي الـ OS يحمي نفسه وباقي السيستم.')}</${P}>
          <${Def}>${X('The <b>mode bit</b>, provided by hardware, tells whether the system is running user code or kernel code: <b>kernel = 0, user = 1</b>. Some instructions are <b>privileged</b>: only executable in kernel mode.',
            'الـ <b>mode bit</b> جاي من الـ hardware، وبيفرّق بين الـ user code والـ kernel code: قيمته <b>صفر للـ kernel</b> و<b>واحد للـ user</b>. وفيه instructions <b>privileged</b>: متتنفذش غير في الـ kernel mode.')}</${Def}>
          <${Talk} who="proc">${X('I need the OS to do something for me. I make a <b>system call</b>: a trap, mode bit goes to 0.', 'أنا محتاج الـ OS يعملّي حاجة. أعمل <b>system call</b>: يعني trap، والـ mode bit يبقى 0.')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X('I do the job in kernel mode, then <b>return</b>: mode bit back to 1.', 'وأنا أعمل الشغل في الـ kernel mode، وبعدين <b>return</b>: والـ mode bit يرجع 1.')}</${Talk}>
          <${Grow} />
          <${P} small=${true}>${X('CPUs increasingly support <b>multi-mode</b> operation, e.g. a <b>virtual machine manager (VMM)</b> mode for guest VMs.', 'والـ CPUs بقت بتدعم <b>multi-mode</b> أكتر، زي mode للـ <b>virtual machine manager (VMM)</b> عشان الـ guest VMs.')}</${P}>
        `, { sec: t('Dual mode', 'الـ Dual mode') }),

        // 39 · modes figure
        page(html`
          <${H2}>${t('From user to kernel mode and back', 'من الـ user للـ kernel ورجوع')}</${H2}>
          <${Fig} name="os-modes" />
        `),

        // 40 · sort: mode bit
        page(html`
          <${Box} kind="pencil" title=${t('Be the mode bit', 'خليك إنت الـ mode bit')}><p className="hf-p small">${X('The mode bit at each moment? <b>1</b> user, <b>0</b> kernel.', 'الـ mode bit قيمته كام في كل لحظة؟ اختار <b>1</b> لو user mode، أو <b>0</b> لو kernel mode.')}</p></${Box}>
          <${Sort} id="bit" bins=${A ? [['1', 'الـ user mode'], ['0', 'الـ kernel mode']] : [['1', 'User mode'], ['0', 'Kernel mode']]} items=${A ? [
            ['الـ user process شغالة', 0],
            ['الـ process بتنادي system call', 0],
            ['الـ kernel بينفذ الـ system call', 1],
            ['رجعنا من الـ system call والـ process كمّلت', 0],
            ['الـ OS بيظبط الـ timer', 1],
            ['حتة code بتنفذ privileged instruction', 1],
            ['الـ process واقعة في infinite loop', 0],
            ['الـ timer وصل صفر والـ OS رجع ياخد التحكم', 1]
          ] : [
            ['A user process is executing', 0],
            ['The process calls a system call', 0],
            ['The kernel executes the system call', 1],
            ['Back from the call, the process carries on', 0],
            ['The OS loads the timer', 1],
            ['Code runs a privileged instruction', 1],
            ['The process is stuck in an infinite loop', 0],
            ['The timer hits zero; the OS regains control', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Exam trap: kernel is 0, user is 1. Not the other way round.', 'فخ امتحان: صفر للـ kernel وواحد للـ user. مش العكس.')}</${Hand}>
        `),

        // 41 · the doctor's mode questions
        page(html`
          ${mq2('m-modes', /two separate modes of operating/i)}
          <${Gap} h=${6} />
          ${mq2('m-names', /other terms for kernel mode/i)}
          <${Grow} />
          <${Hand}>${t('The other names (privileged, supervisor, system mode) come from the textbook, not the slides.', 'الأسامي التانية (privileged وsupervisor وsystem mode) من الكتاب، مش من السلايدز.')}</${Hand}>
        `),

        // 42 · timer
        page(html`
          <${H1}>${t('The timer: no hogging', 'الـ timer: ممنوع الاستحواذ')}</${H1}>
          <${P} small=${true}>${X('A <b>timer</b> prevents an infinite loop or a process hogging resources. The OS sets it (a <b>privileged instruction</b>) <b>before scheduling a process</b>; a counter is decremented by the physical clock; at zero, an <b>interrupt</b> hands control back to the OS, which can terminate a program that exceeds its time.',
            'الـ <b>timer</b> بيمنع الـ infinite loop وإن process تستحوذ على الـ resources. الـ OS بيظبطه (<b>privileged instruction</b>) <b>قبل ما يعمل schedule للـ process</b>؛ وفيه counter بيقل مع الـ physical clock؛ ولما يوصل صفر بيحصل <b>interrupt</b> يرجّع التحكم للـ OS، اللي ممكن يقفل البرنامج اللي عدّى وقته.')}</${P}>
          <${Fig} name="os-timer" />
        `, { sec: t('Timer', 'الـ Timer') }),

        // 43 · process management
        page(html`
          <${H1}>${t('The OS\'s day job: managing processes', 'شغل الـ OS: إدارة الـ processes')}</${H1}>
          <${Def}>${X('A <b>process</b> is a program in execution, a unit of work within the system. The <b>program is passive</b>, the <b>process is active</b>.', 'الـ <b>process</b> هي برنامج شغال، وحدة شغل جوّه السيستم. الـ <b>program حاجة passive</b>، والـ <b>process حاجة active</b>.')}</${Def}>
          <${UL} items=${A ? [
            'محتاجة resources (CPU وmemory و<bdi dir="ltr">I/O</bdi> وfiles وinitialization data)، ولما تخلص بترجّع اللي ينفع يتستخدم تاني.',
            'الـ <b>single-threaded</b> ليها <b>program counter واحد</b> بيشاور على الـ instruction الجاية؛ الـ <b>multi-threaded</b> ليها <b>program counter لكل thread</b>.',
            'الـ OS بيعمل ويمسح الـ processes، ويعمل suspend وresume، وبيوفر <b>synchronization</b> و<b>communication</b> والتعامل مع الـ <b>deadlock</b>.'
          ] : [
            'Needs resources (CPU, memory, I/O, files, initialization data); termination reuses the reusable ones.',
            '<b>Single-threaded</b>: <b>one program counter</b> pointing at the next instruction. <b>Multi-threaded</b>: <b>one program counter per thread</b>.',
            'OS activities: creating and deleting processes, suspending and resuming them, and mechanisms for <b>synchronization</b>, <b>communication</b> and <b>deadlock handling</b>.'
          ]} />
          <${Grow} />
          <${Talk} who="proc" flip=${true}>${t("That's me. The whole next chapter is about me.", 'ده أنا. الفصل الجاي كله عني.')}</${Talk}>
        `, { sec: t('OS management jobs', 'إدارات الـ OS') }),

        // 44 · memory and storage management
        page(html`
          <${H2}>${t('Memory and storage management', 'إدارة الـ memory والـ storage')}</${H2}>
          <${P} small=${true}>${X('To run, a program\'s instructions and data (all or part) must be in memory. <b>Memory management</b> decides what is in memory and when. Its activities:', 'عشان البرنامج يشتغل، الـ instructions والداتا بتاعته (كلها أو جزء) لازم يبقوا في الـ memory. والـ <b>memory management</b> بيحدد إيه اللي في الـ memory وإمتى. وأنشطته:')}</${P}>
          <${UL} items=${A ? ['يتابع أنهي أجزاء مستخدمة <b>ومين</b> بيستخدمها.', 'يقرر أنهي processes وداتا تدخل الـ memory أو تخرج.', 'يعمل <b>allocate وdeallocate</b> لمساحة الـ memory حسب الحاجة.'] : ['Keep track of which parts are used and <b>by whom</b>.', 'Decide which processes and data move into and out of memory.', '<b>Allocate and deallocate</b> memory space as needed.']} />
          <${P} small=${true}>${X('<b>Storage management</b>: the OS hides physical details behind one logical unit, the <b>file</b>. It creates and deletes files and directories, maps files onto secondary storage, and backs them up onto stable (nonvolatile) media.', 'الـ <b>storage management</b>: الـ OS بيخبّي التفاصيل الفيزيائية ورا وحدة منطقية واحدة، الـ <b>file</b>. وبيعمل ويمسح الـ files والـ directories، ويعمل mapping للـ files على الـ secondary storage، وbackup على media ثابتة (nonvolatile).')}</${P}>
          <${Grow} />
          ${tf('tf-mem', [/Allocating and deallocating memory/i])}
        `),

        // 45 · mass storage and the I/O subsystem
        page(html`
          <${H2}>${t('Disks and the I/O subsystem', 'الـ disks والـ I/O subsystem')}</${H2}>
          <${P} small=${true}>${X('<b>Mass-storage management</b>: the whole speed of the computer hinges on the disk subsystem. OS activities: <b>free-space management, storage allocation, disk scheduling</b>. Slow storage (optical, magnetic tape; ‡ the word "tertiary" is not on the slide) still needs managing, and is <b>WORM</b> (write-once, read-many-times) or <b>RW</b> (read-write).',
            'الـ <b>mass-storage management</b>: سرعة الكمبيوتر كلها متوقفة على الـ disk subsystem. أنشطة الـ OS: <b>الـ free-space management والـ storage allocation والـ disk scheduling</b>. والـ storage البطيء (الـ optical والـ magnetic tape؛ ‡ كلمة tertiary مش في السلايد) برضه محتاج إدارة، ويا إما <b>WORM</b> (يعني <bdi dir="ltr">write-once, read-many-times</bdi>) يا <b>RW</b> (يعني read-write).')}</${P}>
          <${P} small=${true}>${X('One purpose of the OS is to <b>hide the attributes of hardware devices</b> from the user. The <b>I/O subsystem</b> does it with buffering, caching and spooling, a general device-driver interface, and drivers for specific devices.',
            'من أغراض الـ OS إنه <b>يخبّي تفاصيل الـ hardware devices</b> عن الـ user. والـ <b><bdi dir="ltr">I/O</bdi> subsystem</b> بيعمل ده بالـ buffering والـ caching والـ spooling، وinterface عام للـ device drivers، وdrivers لأجهزة معينة.')}</${P}>
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('The entire speed of computer operation hinges on me. No pressure.', 'سرعة الكمبيوتر كلها متعلقة بيّا. ولا ضغط خالص.')}</${Talk}>
        `),

        // 46 · match the I/O words
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a word, then tap what it means.', 'دوس على الكلمة، وبعدين دوس على معناها.')}</${P}>
          <${Match} id="io" left=${['Buffering', 'Caching', 'Spooling', 'Device driver', 'DMA', 'Device-status table']}
            right=${A ? ['فيها entry لكل جهاز: نوعه وعنوانه وحالته', 'بيدّي interface موحد بين الـ controller والـ kernel', 'تخزين الداتا مؤقتًا وهي بتتنقل', 'إن output بتاع job يتداخل مع input بتاع jobs تانية', 'بينقل blocks للـ memory على طول من غير الـ CPU', 'تخزين أجزاء من الداتا في storage أسرع عشان الـ performance']
              : ['One entry per device: its type, address and state', 'A uniform interface between controller and kernel', 'Storing data temporarily while it is being transferred', 'Overlapping the output of one job with the input of other jobs', 'Moves blocks straight to memory without the CPU', 'Storing parts of data in faster storage for performance']}
            answer=${[2, 5, 3, 1, 4, 0]} />
        `),

        // 47 · protection and security
        page(html`
          <${H2}>${t('Protection or security?', 'الـ protection ولا الـ security؟')}</${H2}>
          <${P} small=${true}>${X('<b>Protection</b>: any mechanism for <b>controlling access</b> of processes or users to resources defined by the OS. <b>Security</b>: <b>defense</b> of the system against internal and external <b>attacks</b>.', 'الـ <b>protection</b>: أي mechanism <b>بيتحكم في access</b> الـ processes أو الـ users للـ resources اللي الـ OS معرّفها. الـ <b>security</b>: <b>دفاع</b> السيستم ضد <b>الهجمات</b> الداخلية والخارجية.')}</${P}>
          <${Sort} id="ps" bins=${A ? [['P', 'الـ protection'], ['S', 'الـ security']] : [['P', 'Protection'], ['S', 'Security']]} items=${A ? [
            ['هجوم denial-of-service', 1],
            ['الـ viruses', 1],
            ['الـ identity theft والـ theft of service', 1],
            ['مين يقدر يوصل لأنهي resource', 0],
            ['الـ user ID مربوط بكل files وprocesses الـ user عشان الـ access control', 0],
            ['الـ group ID بيعرّف مجموعة users ويدير الـ controls بتاعتهم', 0]
          ] : [
            ['A denial-of-service attack', 1],
            ['Viruses', 1],
            ['Identity theft, theft of service', 1],
            ['Who may access which resource', 0],
            ['User IDs attached to a user\'s files and processes for access control', 0],
            ['A group ID defines a set of users and manages their controls', 0]
          ]} />
          <${Grow} />
          <${Hand}>${X('<b>Privilege escalation</b> lets a user change to an effective ID with more rights.', 'والـ <b>privilege escalation</b> بتخلّي الـ user يتحول لـ effective ID بصلاحيات أكتر.')}</${Hand}>
        `, { sec: t('Protection and security', 'الـ Protection والـ Security') }),

        // exam corner: on the slides
        page(html`
          <${Box} kind="exam" title=${exam}><p className="hf-p small">${t("Real questions from the doctor's exam and midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحان الدكتور والميدترم. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-what', /^What is an operating system\?/i)}
          <${Grow} />
          <${Hand}>${t('Hint: page 2 and the interview.', 'تلميح: صفحة 2 والحوار.')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq2('m-kern', /one program running at all times/i)}
          <${Gap} h=${6} />
          ${mq('m-mp', /objective of multiprogramming/i)}
        `),
        page(html`
          ${mq2('m-disk', /most common secondary storage device/i)}
          <${Gap} h=${6} />
          ${tf('tf-ex', [/no universally accepted definition/i, /Flash memory is slower than DRAM/i])}
        `),
        page(html`
          ${mq2('m-proc', /is the unit of work in a system/i)}
          <${Grow} />
          <${Talk} who="proc" flip=${true}>${t('A program just sits there. I run. Remember that for Chapter 2.', 'الـ program قاعد مكانه. أنا اللي بجري. افتكر ده للفصل التاني.')}</${Talk}>
        `),

        // beyond the slides
        page(html`
          <${Box} kind="exam" title=${t('Beyond the slides', 'برّه السلايدز')}><p className="hf-p small">${t("Also the doctor's questions, but the answers are not on the slides. The reasons come from the standard textbook.", 'دي برضه أسئلة الدكتور، بس إجاباتها مش في السلايدز. الشرح من الكتاب الأساسي.')}</p></${Box}>
          ${mq2('m-sram', /has more speed in accessing data and is volatile/i)}
          <${Gap} h=${6} />
          ${mq2('m-rom', /most basic non-volatile memory/i)}
        `, { sec: t('Beyond the slides', 'برّه السلايدز') }),
        page(html`
          ${mq('m-boot', /A boot block/i)}
          <${Gap} h=${6} />
          ${tf('tf-api', [/use an API rather than/i])}
        `),
        page(html`
          ${mq2('m-sys', /provide\(s\) an interface to the services/i)}
          <${Gap} h=${6} />
          ${mq('m-rt', /In real time operating system/i)}
        `),
        page(html`
          ${mq2('m-rt2', /without any delay is called/i)}
          <${Gap} h=${6} />
          ${mq2('m-emb', /Embedded computers typically run/i)}
        `),

        // 54 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>OS</b> وسيط بين الـ user والـ hardware: يشغّل البرامج، ويبقى convenient وefficient.',
            'الـ 4 components من تحت لفوق:<span class="ltr">hardware → OS → application programs → users</span>',
            'الـ OS هو <b>resource allocator</b> و<b>control program</b>، ومفيش تعريف واحد متفق عليه.',
            'الـ <b>kernel</b> شغال طول الوقت، والـ <b>bootstrap</b> اللي في الـ firmware هو اللي بيحمّله.',
            'الـ <b>interrupt</b> من الـ hardware، والـ <b>trap</b> من الـ software (error أو system call).',
            'الترتيب من الأسرع:<span class="ltr">registers → cache → main memory → SSD → hard disk → optical → tapes</span>',
            'الـ <b>DMA</b>: blocks للـ memory من غير الـ CPU، وinterrupt واحد لكل block.',
            'الـ <b>mode bit</b> قيمته صفر للـ kernel وواحد للـ user. والـ timer بيتظبط بـ privileged instruction.'
          ] : [
            'The <b>OS</b> is an intermediary between user and hardware. Goals: execute programs, be convenient, be efficient.',
            'Four components, bottom up: hardware → OS → application programs → users.',
            'The OS is a <b>resource allocator</b> and a <b>control program</b>; there is no universally accepted definition.',
            'The <b>kernel</b> is the one program running at all times. The <b>bootstrap</b> in ROM/EPROM (firmware) loads it.',
            'An <b>interrupt</b> comes from hardware, a <b>trap</b> from software (error or system call). The OS is <b>interrupt driven</b>.',
            'Fastest to slowest: registers → cache → main memory → SSD → hard disk → optical disk → tapes.',
            '<b>DMA</b>: blocks go straight to memory without the CPU, one interrupt per block.',
            '<b>Mode bit</b>: kernel = 0, user = 1. Setting the timer is a privileged instruction.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 55 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="proc">${t("Next time: me. What a process is, and how the OS juggles us.", 'المرة الجاية: أنا. يعني إيه process، والـ OS بيلاعبنا إزاي.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1], t: Date.now() } }}>${t('Quiz me on Lecture 1', 'امتحنّي في محاضرة 1')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 1, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 1, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

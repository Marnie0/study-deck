// Head First chapter for Modeling & Simulation Lecture 1 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Introduction to Modeling and Simulation: three ways to evaluate a system, simulation examples (network, Internet, MANET,
// mobility), what a simulation is, when it is and isn't appropriate, advantages and disadvantages, application areas, system and
// environment, system components (entity, attribute, activity, state, event, endogenous/exogenous), discrete vs continuous systems,
// models (physical, mathematical) and example models, principles of modeling and a good model, types of simulation models and
// discrete-event simulation, performance metrics (response, reaction and think time, utility classes), the 12 steps of a
// simulation study in 4 phases, and the simulation tools (general purpose languages, general simulation languages, packages).
// Every fact comes from the lecture's notes; analogies and jokes are ours and marked as ours. ‡ marks a slide error or a point the
// lecture notes add, as the site's notes mark it. Numbers checked: 50/10 = 5 servers; 300 msec = 0.3 s; 30 min = 1800 s;
// 1 hour = 3600 s; 1 day = 86400 s; 8420 queries/min ≈ 140.3 queries/s. Arabic follows the site's rules (see hf-compiler.js).
// lectures: [1]
(function () {
  const H = window.HF; H.chapters.ms = H.chapters.ms || {};
  const { html } = H.K;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-ms1')) {
    const s = document.createElement('style'); s.id = 'hf-css-ms1';
    s.textContent = `
.hfb .hf-ms1-sw{ border:2px solid var(--hf-line); border-radius:8px; padding:7px; display:grid; gap:6px; background:var(--paper); }
.hfb .hf-ms1-tabs{ display:grid; grid-template-columns:1fr 1fr; gap:4px; }
.hfb .hf-ms1-tabs button{ min-width:0; font:700 13px/1.1 var(--body); min-height:30px; padding:2px 4px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-ms1-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-ms1-tabs button.ok{ border-color:var(--ok); color:var(--ok); }
.hfb .hf-ms1-tabs button[aria-pressed="true"].ok{ background:var(--ok); color:var(--paper); }
.hfb .hf-ms1-ev{ display:grid; gap:3px; position:relative; }
.hfb .hf-ms1-ev button{ display:grid; grid-template-columns:22px minmax(0,1fr) auto; align-items:center; gap:6px; text-align:left; font:600 13.5px/1.15 var(--body); min-height:31px; padding:2px 6px; border-radius:6px; border:1.5px solid transparent; background:none; color:var(--ink); cursor:pointer; }
.hfb .hf-ms1-ev button i{ width:13px; height:13px; border-radius:50%; border:2px solid var(--hf-line); background:var(--paper); justify-self:center; }
.hfb .hf-ms1-ev button.in{ background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-ms1-ev button.end i{ background:var(--hf-k); border-color:var(--hf-k); }
.hfb .hf-ms1-ev button.end{ border-color:var(--hf-k); }
.hfb .hf-ms1-ev button small{ font:700 12px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-ms1-ev::before{ content:""; position:absolute; left:16px; top:14px; bottom:14px; width:2px; background:var(--hf-grey2); }
.hfb .hf-ms1-ok .hf-ms1-ev button.end{ border-color:var(--ok); } .hfb .hf-ms1-ok .hf-ms1-ev button.end i{ background:var(--ok); border-color:var(--ok); }
.hfb .hf-ms1-no .hf-ms1-ev button.end{ border-color:var(--hf-red); } .hfb .hf-ms1-no .hf-ms1-ev button.end i{ background:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-ms1-fb{ margin:0; font-size:13.5px; line-height:1.32; color:var(--ink); min-height:18px; }
.hf-ar .hf-ms1-fb, .hf-ar .hf-ms1-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.45; }
.hfb .hf-ms1-card{ border:1.6px solid var(--hf-line); border-radius:8px; padding:6px 9px; background:var(--paper); display:grid; gap:3px; box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-ms1-card > b{ font:800 15px/1.2 var(--body); color:var(--hf-k); }
.hf-ar .hf-ms1-card > b{ font-family:"IBM Plex Sans Arabic", var(--body); font-weight:700; }
.hfb .hf-ms1-pc{ display:grid; grid-template-columns:18px minmax(0,1fr); gap:1px 4px; font-size:13.5px; line-height:1.28; color:var(--ink); margin:0; }
.hfb .hf-ms1-pc > span:nth-child(odd){ font:800 14px/1.28 var(--mono); text-align:center; }
.hfb .hf-ms1-pc > span.p{ color:var(--ok); } .hfb .hf-ms1-pc > span.m{ color:var(--hf-red); }
.hf-ar .hf-ms1-pc{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.48; }
.hfb .hf-ms1-tb{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:13px; line-height:1.22; color:var(--ink); }
.hfb .hf-ms1-tb th, .hfb .hf-ms1-tb td{ border:1px solid var(--hf-line); padding:3px 5px; vertical-align:top; text-align:start; }
.hf-ar .hf-ms1-tb{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.4; }
.hfb .hf-ms1-tb[dir="ltr"]{ font-family:var(--body); line-height:1.22; }
.hfb .hf-ms1-tb thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-ms1-tb tbody th{ color:var(--hf-k); font:800 13px/1.22 var(--mono); }
.hfb .hf-ms1-chips{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-ms1-chips span{ font:700 13.5px/1.15 var(--body); border:1.6px solid var(--hf-line); border-radius:999px; padding:4px 10px; background:var(--paper); color:var(--ink); }
.hfb .hf-ms1-chips span b{ color:var(--hf-k); font-weight:800; }
.hf-ar .hf-ms1-chips span{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-ms1-ol{ display:grid; gap:2px; margin:0; padding:0; list-style:none; counter-reset:m1; }
.hfb .hf-ms1-ol li{ position:relative; padding-left:24px; font-size:14px; line-height:1.3; color:var(--ink); counter-increment:m1; }
.hfb .hf-ms1-ol li::before{ content:counter(m1); position:absolute; left:0; top:1px; width:18px; height:18px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 11.5px/18px var(--body); text-align:center; }
.hfb .hf-ms1-ol li b{ font-weight:600; }
.hf-ar .hf-ms1-ol li{ padding-left:0; padding-right:24px; font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.5; }
.hf-ar .hf-ms1-ol li::before{ left:auto; right:0; top:3px; }
.hfb .hf-ms1-ol.no li::before{ background:var(--hf-red); }
.hfb .hf-ms1-ol.tight li{ font-size:13.5px; line-height:1.26; }
.hf-ar .hf-ms1-ol.tight li{ font-size:13px; line-height:1.45; }
`;
    document.head.appendChild(s);
  }

  // the slide 56 time line: tap where each span starts and ends. Answers from the notes (indices into EV):
  // reaction = user finishes request → system starts execution; response (1) → system starts response;
  // response (2) → system completes response; think = system completes response → user starts next request
  const EV = ['User starts request', 'User finishes request', 'System starts execution', 'System starts response', 'System completes response', 'User starts next request'];
  const SPANS = [
    ['Reaction time', 'الـ Reaction time', [1, 2]],
    ['Think time', 'الـ Think time', [4, 5]],
    ['Response time (def. 1)', 'الـ Response time (1)', [1, 3]],
    ['Response time (def. 2)', 'الـ Response time (2)', [1, 4]]
  ];
  function Stopwatch() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('sw:k', 0);
    const [pick, setPick] = H.K.useSlot('sw', {});
    const [chk, setChk] = H.K.useSlot('sw:c', {});
    const mine = pick[k] || [], ans = SPANS[k][2], checked = !!chk[k];
    const ok = mine.length === 2 && mine[0] === ans[0] && mine[1] === ans[1];
    const tap = i => {
      let m;
      if (mine.length !== 1) m = [i];
      else if (i === mine[0]) m = [];
      else m = i < mine[0] ? [i, mine[0]] : [mine[0], i];
      setPick(Object.assign({}, pick, { [k]: m })); setChk(Object.assign({}, chk, { [k]: false }));
    };
    const done = j => { const m = pick[j] || [], a = SPANS[j][2]; return chk[j] && m.length === 2 && m[0] === a[0] && m[1] === a[1]; };
    const fb = !checked ? (mine.length === 0 ? (ar ? 'دوس على اللحظة اللي الفترة بتبدأ عندها.' : 'Tap the moment where this span starts.') : mine.length === 1 ? (ar ? 'دلوقتي دوس على اللحظة اللي بتخلص عندها.' : 'Now tap the moment where it ends.') : (ar ? 'دوس صحّح.' : 'Press Check.'))
      : ok ? (ar ? 'مظبوط! كده الفترة دي متثبتة.' : 'Right! That span is pinned down.')
      : (ar ? 'مش دي. جرّب تاني أو دوس ورّيني.' : 'Not that one. Try again, or press Show me.');
    return html`<div className=${'hf-ms1-sw hf-in' + (checked ? (ok ? ' hf-ms1-ok' : ' hf-ms1-no') : '')}>
      <div className="hf-ms1-tabs" role="group">${SPANS.map((s, j) => html`<button key=${j} className=${done(j) ? 'ok' : ''} aria-pressed=${String(k === j)} onClick=${() => setK(j)}>${ar ? s[1] : s[0]}${done(j) ? ' ✓' : ''}</button>`)}</div>
      <div className="hf-ms1-ev" dir="ltr">${EV.map((e, i) => {
        const inn = mine.length === 2 && i >= mine[0] && i <= mine[1], end = mine.includes(i);
        return html`<button key=${i} className=${(inn ? 'in' : '') + (end ? ' end' : '')} aria-pressed=${String(end)} onClick=${() => tap(i)}><i></i><span>${e}</span><small>${end ? (i === mine[0] ? 'start' : 'end') : ''}</small></button>`; })}</div>
      <p className="hf-ms1-fb">${fb}</p>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${mine.length !== 2} onClick=${() => setChk(Object.assign({}, chk, { [k]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setPick(Object.assign({}, pick, { [k]: ans.slice() })); setChk(Object.assign({}, chk, { [k]: true })); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        <span className="grow" style=${{ flex: 1 }}></span>
        <span className="hf-score"><bdi dir="ltr">${SPANS.filter((_, j) => done(j)).length} / 4</bdi></span>
      </div>
    </div>`;
  }

  // a card with + and − lines (advantages and disadvantages of a simulation tool)
  function ProCon({ title, pros, cons }) {
    return html`<div className="hf-ms1-card hf-in"><b>${title}</b>
      <p className="hf-ms1-pc">${pros.map((x, i) => html`<${React.Fragment} key=${'p' + i}><span className="p">+</span><span>${T(x)}</span></${React.Fragment}>`)}${cons.map((x, i) => html`<${React.Fragment} key=${'m' + i}><span className="m">−</span><span>${T(x)}</span></${React.Fragment}>`)}</p></div>`;
  }
  const OL = ({ items, cls }) => html`<ol className=${'hf-ms1-ol hf-in' + (cls ? ' ' + cls : '')}>${items.map((x, i) => html`<li key=${i}>${T(x)}</li>`)}</ol>`;

  H.chapters.ms[1] = {
    title: 'Introduction to Modeling and Simulation',
    kicker: 'Chapter 1',
    run: 'introduction to modeling and simulation',
    ar: { title: 'مقدمة عن الـ Modeling والـ Simulation', kicker: 'الفصل 1', run: 'مقدمة عن الـ modeling والـ simulation' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (past finals, the revision sheet), with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.ms && window.AR.ms.lectures && window.AR.ms.lectures[1] && window.AR.ms.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X(`Your brain remembers what's surprising, visual and a bit emotional, so that's how this chapter is written. The facts all come from the lecture's slides and the lecture notes.`,
            'مخك بيفتكر الحاجة اللي بتفاجئه، واللي فيها صور، واللي فيها شوية مشاعر، فالفصل مكتوب كده. بس كل المعلومات من سلايدز المحاضرة والـ lecture notes.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You answer right on the page, and your answers stay when you turn pages.', '<b>حل التمارين.</b> بتجاوب على الصفحة نفسها، وإجاباتك بتفضل لما تقلّب.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, taken from the doctors' own papers and revision sheet.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة والـ revision sheet.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slide error, or a point that only the lecture notes add.', 'معناها غلطة في السلايد، أو حاجة الـ lecture notes بس هي اللي بتضيفها.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات وحيل مننا.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>Modeling & Simulation` : html`Chapter one<br/>Modeling & Simulation`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Rehearse Reality', 'بروفة للواقع')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('introduction to modeling and simulation', 'مقدمة عن الـ modeling والـ simulation')}</p></div>
          <${P}>${X('In World War 1, soldiers trained on a <b>wooden mechanical horse</b> (slide 8). Nobody got kicked, and nobody lost a real horse.',
            'في الحرب العالمية الأولى، العساكر كانوا بيتدربوا على <b>حصان خشب ميكانيكي</b> (سلايد 8). محدش اترفس، ومحدش خسر حصان حقيقي.')}</${P}>
          <${Talk} who="dev">${t('So simulation is just… pretending?', 'يعني الـ simulation مجرد… تمثيل؟')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('Pretending with a plan. I <b>imitate a real system over time</b>, and you learn from what happens.', 'تمثيل بخطة. أنا <b>بقلّد system حقيقي على مدار الوقت</b>، وإنت بتتعلم من اللي بيحصل.')}</${Talk}>
          <${P} small=${true}>${X("In this chapter you'll learn what a <b>system</b>, a <b>model</b> and a <b>simulation</b> are, when simulating is smart and when it's silly, how to measure performance, and the <b>12 steps</b> of a real simulation study.",
            'في الفصل ده هتعرف يعني إيه <b>system</b> و<b>model</b> و<b>simulation</b>، وإمتى الـ simulation تبقى فكرة ذكية وإمتى تبقى عبط، وإزاي تقيس الـ performance، والـ <b>12 خطوة</b> بتوع أي simulation study بجد.')}</${P}>
        `, { sec: t('Rehearse reality', 'بروفة للواقع') }),

        // 2 · three ways to evaluate
        page(html`
          <${H1}>${t('Three ways to judge a system', 'تلات طرق تحكم بيها على system')}</${H1}>
          <${P} small=${true}>${t('Someone hands you a system (a web server, a factory, a network) and asks: how well does it perform? Slide 4 gives three ways:', 'حد اداك system (web server، مصنع، network) وسألك: الـ performance بتاعه عامل إزاي؟ سلايد 4 بيديك تلات طرق:')}</${P}>
          <${OL} items=${A ? [
            'الـ <b>Measurements</b>: تستخدم نسخة موجودة فعلًا (existing instance) من الـ system وتقيس عليها.',
            'الـ <b>Analysis</b>: تعمل mathematical abstraction للـ system وتطلّع formulas بتوصف الـ performance.',
            'الـ <b>Simulation</b>: تكتب computer program بيعمل implement لـ model للـ system، وتعمل experiments بإنك تشغّله.'
          ] : [
            '<b>Measurements</b>: use an existing instance of the system and measure its performance.',
            '<b>Analysis</b>: develop a mathematical abstraction of the system and derive formulas that describe its performance.',
            '<b>Simulation</b>: develop a computer program that implements a model of the system, and run experiments with it.'
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t("A factory that hasn't been built yet, and it's far too complex for a neat formula. Which of the three ways are out straight away?", 'مصنع لسه متبناش، ومعقد جدًا على أي formula حلوة. أنهي طريقتين من التلاتة خرجوا من الحسبة على طول؟')}</p></${Box}>
          <${Talk} who="dice" flip=${true}>${t('Guess who is left standing.', 'خمّن مين اللي فاضل.')}</${Talk}>
        `, { sec: t('Three ways to evaluate', 'تلات طرق للتقييم') }),

        // 3 · figure
        page(html`
          <${H2}>${t('Each way has a catch (slide 5)', 'كل طريقة ليها مشكلة (سلايد 5)')}</${H2}>
          <${Fig} name="ms-evaluate" />
        `),

        // 4 · simulation is old; Elmaghraby
        page(html`
          <${H1}>${t('Simulation is older than you think', 'الـ simulation أقدم مما تتخيل')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>training</b>: حصان الحرب العالمية الأولى، وعسكري في simulator لسواقة عربية تقيلة (سلايد 8).',
            'الـ <b>Entertainment games</b> زي الـ flight simulator، والـ <b>Serious games</b> زي أوضة تدريب قدام شاشات simulation (سلايد 9).'
          ] : [
            '<b>Training</b>: the WW1 wooden mechanical horse, and a soldier in a heavy-wheeled-vehicle driver simulator (slide 8).',
            '<b>Entertainment games</b> such as a flight-simulator cockpit, and <b>serious games</b>: a training room of workers at simulation screens (slide 9).'
          ]} />
          <${P} small=${true}>${X('Simulation is used to <b>imitate the real world</b>. Its uses according to <b>Elmaghraby [1968]</b> (slide 14):', 'الـ simulation بنستخدمها عشان <b>نقلّد العالم الحقيقي</b>. واستخداماتها حسب <b>Elmaghraby [1968]</b> (سلايد 14):')}</${P}>
          <div className="hf-ms1-chips hf-in">${(A ? ['التفكير <b>Aid to thought</b>', 'التواصل <b>Communication</b>', 'التدريب <b>Training/Education</b>', 'التجريب <b>Experimentation</b>', 'التنبؤ <b>Predicting</b>'] : ['<b>1</b> Aid to thought', '<b>2</b> Communication', '<b>3</b> Training/Education', '<b>4</b> Experimentation', '<b>5</b> Predicting']).map((x, i) => html`<span key=${i}>${T(x)}</span>`)}</div>
          <${P} small=${true}>${X('…plus a new application: <b>Entertainment</b> (video games, serious games).', '…وفيه تطبيق جديد كمان: الـ <b>Entertainment</b> (الـ video games والـ serious games).')}</${P}>
          <${Hand} tilt=${true}>${X('Homework H1: the WW1 horse is <b>Training/Education</b>.', 'في الـ Homework H1: حصان الحرب تبع الـ <b>Training/Education</b>.')}</${Hand}>
        `, { sec: t('Simulation examples', 'أمثلة على الـ simulation') }),

        // 5 · network example
        page(html`
          <${H2}>${t('Example: clients, a network and a server', 'مثال: clients وnetwork وserver')}</${H2}>
          <${P} small=${true}>${t('Clients request some service from a server over a network (slide 10):', 'الـ clients بيطلبوا service من server عن طريق network (سلايد 10):')}</${P}>
          ${A ? html`<div className="hf-in">${li(['الـ Client هو الـ user ومعاه الـ web browser', 'الـ Service هي صفحة الويب (web page)', 'الـ Server هو الـ web server', 'الـ Network واحدة من دول:<span class="ltr">{local network, Internet, wireless network}</span>'])}</div>`
            : html`<${Code} lines=${['Client  = user and web browser', 'Service = web page', 'Server  = web server', 'Network = {local network, Internet,', '           wireless network}']} />`}
          <${P} small=${true}>${X('We analyze the performance of the <b>server</b> and of the <b>network</b>. Attention: here both are drawn <b>very simply</b>.', 'بنحلل الـ performance بتاع الـ <b>server</b> وبتاع الـ <b>network</b>. خد بالك: الاتنين هنا مرسومين <b>ببساطة جدًا</b>.')}</${P}>
          <${Grow} />
          <${Talk} who="cust" flip=${true}>${t('In the queueing model I wait in a queue (the boxes) for a server (the circle). Turn the page.', 'في الـ queueing model أنا بستنى في queue (المربعات) قدام server (الدايرة). قلّب الصفحة.')}</${Talk}>
        `),
        page(html`
          <${H2}>${t('The same picture as a queueing model', 'نفس الصورة كـ queueing model')}</${H2}>
          <${Fig} name="ms-netqueue" />
        `),

        // 6 · Internet and MANET
        page(html`
          <${H2}>${t('Bigger: the Internet and a MANET', 'أكبر: الـ Internet والـ MANET')}</${H2}>
          <${P} small=${true}>${X('A large network like the <b>Internet</b> (slide 11): you must model its <b>topology</b>, <b>routing</b>, <b>traffic</b> and <b>background traffic</b>.', 'في network كبيرة زي الـ <b>Internet</b> (سلايد 11) لازم تعمل model للـ <b>topology</b> والـ <b>routing</b> والـ <b>traffic</b> والـ <b>background traffic</b>.')}</${P}>
          <${Def}>${X('A <b>mobile multi-hop ad-hoc network (MANET)</b> is a wireless network of mobile nodes (slide 12):', 'الـ <b>MANET</b> (<bdi dir="ltr">mobile multi-hop ad-hoc network</bdi>) هي wireless network من mobile nodes (سلايد 12):')}</${Def}>
          <${UL} items=${A ? [
            '<b>مفيهاش infrastructure</b>: لا Access Points ولا Base Stations.',
            'أي 2 nodes يتكلموا لو جوه الـ <b>communication range</b> بتاع بعض.',
            'الـ source والـ destination عادةً بينهم <b>كذا hop</b>.',
            'فـ<b>كل الـ nodes لازم تعمل forward</b> لداتا غيرها.'
          ] : [
            '<b>No infrastructure</b>: no Access Points or Base Stations.',
            'Two nodes can talk if they are in their mutual <b>communication range</b>.',
            'The source and destination are typically <b>several hops</b> apart.',
            'So <b>all nodes have to forward</b> data for others.'
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('A node keeps moving to random points on a 1000 × 1000 area. Is it equally likely to be <b>anywhere</b>? Think, then run it two pages on (slide 13).', 'فيه node بتفضل تتحرك لنقط عشوائية على مساحة <bdi dir="ltr">1000 × 1000</bdi>. هل احتمال إنها تبقى في <b>أي حتة</b> واحد؟ فكّر، وبعدين شغّلها بعد صفحتين (سلايد 13).')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Watch the data hop', 'اتفرج على الداتا وهي بتنط')}</${H2}>
          <${Fig} name="ms-manet" />
        `),

        // 8 · waypoint
        page(html`
          <${H2}>${t('Where does the moving node spend its time?', 'الـ node اللي بتتحرك بتقضي وقتها فين؟')}</${H2}>
          <${Fig} name="ms-waypoint" />
          <${Hand} red=${true}>${X('The density is a hill, highest in the <b>middle</b>: not uniform. Easy to describe, but no closed-form <i>f(x, y)</i>, <b>so we simulate</b>.', 'الكثافة شكلها تل، أعلى حاجة في <b>النص</b>: يعني مش uniform. سهل توصفه، بس مفيش closed-form للـ <bdi dir="ltr">f(x, y)</bdi>، <b>فبنعمل simulation</b>.')}</${Hand}>
        `),

        // 9 · what is a simulation
        page(html`
          <${H1}>${t('So what is a simulation?', 'طب يعني إيه simulation؟')}</${H1}>
          <${Def}>${X('A <b>simulation</b> is the <b>imitation</b> of the operation of a real-world system <b>over time</b> (slide 16).', 'الـ <b>simulation</b> هي <b>تقليد (imitation)</b> لطريقة شغل system حقيقي <b>على مدار الوقت</b> (سلايد 16).')}</${Def}>
          <${OL} items=${A ? ['ولّد <b>artificial history</b> (تاريخ صناعي) للـ system.', 'طلّع <b>inferences</b> (استنتاجات) من التاريخ ده عن خصائص الـ system.'] : ['Generate an <b>artificial history</b> of the system.', 'Draw <b>inferences</b> from it about the characteristics of the system.']} />
          <${P} small=${true}>${X('How: develop a <b>model</b>, made of <b>entities</b> (objects). ‡ The lecture notes add: you <b>observe</b> the artificial history, and both <b>existing and conceptual</b> systems can be simulated.', 'إزاي؟ بتبني <b>model</b> متكون من <b>entities</b> (objects). ‡ الـ lecture notes بتضيف إنك <b>بتراقب</b> الـ artificial history، وإن الـ systems <b>الموجودة واللي لسه فكرة (conceptual)</b> الاتنين ينفع يتعملهم simulation.')}</${P}>
          <${Grow} />
          <${Talk} who="clock" flip=${true}>${t('I move the system from state to state. You watch, and write down what you see.', 'أنا بنقل الـ system من state لـ state، وإنت بتتفرج وتكتب اللي بتشوفه.')}</${Talk}>
        `, { sec: t('What is a simulation?', 'يعني إيه simulation؟') }),
        page(html`
          <${H2}>${t('An artificial history, state by state', 'تاريخ صناعي، state ورا state')}</${H2}>
          <${Fig} name="ms-statetime" />
        `),

        // 10 · appropriate
        page(html`
          <${H2}>${t('When simulation is the right tool (slide 17)', 'إمتى الـ simulation تبقى الأداة الصح (سلايد 17)')}</${H2}>
          <${OL} items=${A ? [
            'بتخليك <b>تدرس experiments</b> فيها internal interactions.',
            'تقدر تعمل simulation للتغييرات الـ informational والـ organizational والـ environmental وتشوف <b>behavior</b> الـ model.',
            'المعرفة اللي بتطلع منها ممكن <b>تحسّن</b> الـ system.',
            'النتايج بتديك <b>insight</b> عن أنهي variables هي الأهم.',
            'تنفع كـ <b>pedagogical device</b> تثبّت بيها المادة.',
            'تقدر <b>تعمل verify للنتايج التحليلية</b>، زي الـ queueing systems.',
            'الـ animation بتوريك الـ system شغال، فالخطة <b>تبقى visualized</b>.'
          ] : [
            'It enables the <b>study of experiments</b> with internal interactions.',
            'Informational, organizational and environmental changes can be simulated to see the model\'s <b>behavior</b>.',
            'Knowledge from simulations can <b>improve</b> the system.',
            'Results give <b>insight</b> into which variables are most important.',
            'It works as a <b>pedagogical device</b> to reinforce learning material.',
            'It can <b>verify analytical results</b>, e.g. queueing systems.',
            'Animation shows the system in action, so the plan can be <b>visualized</b>.'
          ]} />
          <${Grow} />
          <${P} small=${true}>${X('‡ The lecture notes add: test new designs and policies before implementing them, and train without the cost of on-the-job learning; a factory or a wafer fabrication plant is so complex that only simulation can treat its internal interactions.', '‡ الـ lecture notes بتضيف: تجرّب designs وpolicies جديدة قبل ما تنفذها، وتدرّب من غير تكلفة التعلّم في الشغل؛ والمصنع أو الـ wafer fabrication plant معقد لدرجة إن الـ simulation بس هي اللي تقدر تتعامل مع التفاعلات الداخلية فيه.')}</${P}>
        `, { sec: t('When to simulate', 'إمتى نعمل simulation') }),

        // 11 · not appropriate
        page(html`
          <${H2}>${t('When it is NOT (slide 18)', 'وإمتى لأ (سلايد 18)')}</${H2}>
          <${OL} cls="no" items=${A ? [
            'لما المشكلة تتحل بالـ <b>common sense</b>.',
            'لما المشكلة <b>تتحل رياضيًا</b>.',
            'لما <b>التجربة المباشرة أسهل</b>.',
            'لما <b>تكلفة الـ simulation أكتر من اللي هتوفره</b>.',
            'لما الـ simulation تحتاج <b>وقت مش متاح</b>.',
            'لما <b>مفيش input data</b>، والـ simulation محتاجة data.',
            'لما الـ simulation <b>مينفعش يتعملها verify أو validate</b>.',
            'لما سلوك الـ system <b>معقد جدًا أو مش معروف</b>، زي سلوك البني آدمين.'
          ] : [
            'The problem is solvable by <b>common sense</b>.',
            'The problem can be <b>solved mathematically</b>.',
            '<b>Direct experiments are easier</b>.',
            'Simulation <b>costs exceed the savings</b>.',
            'It needs <b>time that is not available</b>.',
            '<b>No (input) data</b> is available, but simulations need data.',
            'It <b>cannot be verified or validated</b>.',
            'System behavior is <b>too complex or unknown</b>, e.g. human behavior.'
          ]} />
          <${Grow} />
          <${P} small=${true}>${X('‡ The lecture notes credit this list to <b>Banks and Gibson [1997]</b>: no data means <b>not even estimates</b>; and add <b>unreasonable manager expectations</b> (too much, too soon).', '‡ الـ lecture notes بتنسب الليستة دي لـ <b>Banks and Gibson [1997]</b>: مفيش data يعني <b>ولا حتى estimates</b>؛ وبتضيف <b>توقعات المديرين اللي مش منطقية</b> (حاجات كتير بسرعة أوي).')}</${P}>
        `),

        // 12 · common sense
        page(html`
          <${H2}>${t('Rule 1 in action: common sense', 'القاعدة 1 قدامك: الـ common sense')}</${H2}>
          <${P} small=${true}>${X('‡ The lecture notes\' example: customers arrive at <b>50/hour</b>, one server serves <b>10/hour</b>. Minimum servers = 50 / 10 = <b>5</b>. No simulation needed.', '‡ مثال الـ lecture notes: الزباين بييجوا <b>50 في الساعة</b>، والـ server الواحد بيخدم <b>10 في الساعة</b>. أقل عدد servers هو <b>5</b> لأن<span class="ltr">50 / 10 = 5</span>من غير أي simulation.')}</${P}>
          <${Fig} name="ms-commonsense" />
        `),

        // 13 · sort: simulate or not
        page(html`
          <${Box} kind="pencil" title=${t('Simulate or not?', 'نعمل simulation ولا لأ؟')}><p className="hf-p small">${X('Tap <b>✓</b> if simulation is appropriate, <b>✗</b> if it is not, then check.', 'دوس <b>✓</b> لو الـ simulation مناسبة، و<b>✗</b> لو مش مناسبة، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="simnot" bins=${[['✓', t('Appropriate', 'مناسبة')], ['✗', t('Not appropriate', 'مش مناسبة')]]} items=${A ? [
            ['المشكلة ممكن تتحل رياضيًا', 1],
            ['عايز تعمل verify لنتايج تحليلية لـ queueing system', 0],
            ['مفيش data خالص، ولا حتى estimates', 1],
            ['الـ model مينفعش يتعمله verify أو validate', 1],
            ['عايز تعرف أنهي variables هي الأهم', 0],
            ['عايز animation يوريك الخطة شغالة', 0],
            ['لازم تعمل model لسلوك البني آدمين', 1],
            ['الـ 50 في الساعة على 10 في الساعة لكل server', 1]
          ] : [
            ['The problem can be solved mathematically', 1],
            ['You want to verify analytical results for a queueing system', 0],
            ['There is no data at all, not even estimates', 1],
            ['The model cannot be verified or validated', 1],
            ['You want insight into which variables matter most', 0],
            ['You want an animation that shows the plan in action', 0],
            ['You must model human behavior', 1],
            ['50 arrivals/hour, 10/hour per server: how many servers?', 1]
          ]} />
        `, { sec: t('Exercise: simulate or not?', 'تمرين: نعمل simulation ولا لأ؟') }),

        // 14 · watch it
        page(html`
          <${Box} kind="watch" title=${t('Watch it: "too complex"', 'خلّي بالك: "معقد جدًا"')}>
            <p className="hf-p small">${X('Real systems (a factory, a network) are too complex for <b>analysis</b>: that is <b>why</b> we simulate. But when the system\'s <b>behavior is too complex or unknown</b> (like human behavior), simulation is <b>not</b> appropriate.',
              'الـ systems الحقيقية (مصنع، network) معقدة على الـ <b>analysis</b>، وعشان كده بنعملها simulation. بس لو <b>سلوك</b> الـ system <b>معقد جدًا أو مش معروف</b> (زي البني آدمين)، الـ simulation <b>مش</b> مناسبة.')}</p></${Box}>
          ${mq('m-cx', /system behavior is too complex or unknown/i)}
          <${Box} kind="watch"><p className="hf-p small">${X('Revision sheet: "Simulation is appropriate when <b>no (input) data</b> is available…" is <b>False</b>; "…when the simulation <b>can be</b> verified or validated" is <b>True</b>.',
            'في الـ revision sheet الـ <b>no (input) data</b> مع "appropriate" تبقى <b>غلط</b>، والـ <b>can be verified or validated</b> تبقى <b>صح</b>.')}</p></${Box}>
        `),

        // 15 · advantages
        page(html`
          <${H1}>${t('Why simulation wins (slide 19)', 'ليه الـ simulation بتكسب (سلايد 19)')}</${H1}>
          <${OL} cls="tight" items=${A ? [
            'تستكشف الـ policies والـ decision rules والـ information flows <b>من غير ما تلخبط الـ system الحقيقي</b>.',
            'تختبر hardware designs وlayouts وprotocols وnetwork architectures <b>من غير ما تحجز resources</b>.',
            'تختبر الـ hypotheses عن ليه ظاهرة بتحصل <b>من ناحية الـ feasibility</b>.',
            '<b>الوقت يتضغط أو يتمط</b> (تسرّعه أو تبطّأه).',
            'تفهم <b>التفاعل</b> بين الـ variables.',
            'تفهم <b>أهمية</b> كل variable للـ performance.',
            'تعمل <b>bottleneck analysis</b> وتكتشف المشاكل.',
            'تفهم الـ system <b>شغال إزاي فعلًا</b>، مش الناس فاكرينه شغال إزاي.',
            'تجاوب على أسئلة <b><bdi dir="ltr">"What if …"</bdi></b>.'
          ] : [
            'Explore policies, procedures, decision rules and information flows <b>without disrupting the real system</b>.',
            'Test new hardware designs, layouts, transportation systems, protocols and network architectures <b>without committing resources</b>.',
            'Test hypotheses about how or why a phenomenon occurs <b>for feasibility</b>.',
            '<b>Compress or expand time</b> (speed up or slow down).',
            'Gain insight into the <b>interaction</b> of variables.',
            'Gain insight into the <b>importance</b> of variables to performance.',
            'Perform <b>bottleneck analysis</b> to detect problems.',
            'Understand how the system <b>really operates</b>, not how people think it does.',
            'Answer <b>"What if …"</b> questions.'
          ]} />
          <${Grow} />
          <${Talk} who="clock" flip=${true}>${t('Ten years of a factory before lunch? Easy. I compress time.', 'عشر سنين من عمر مصنع قبل الغدا؟ سهلة. أنا بضغط الوقت.')}</${Talk}>
        `, { sec: t('Advantages and disadvantages', 'المميزات والعيوب') }),

        // 16 · disadvantages
        page(html`
          <${H2}>${t('…and where it hurts (slide 20)', '…وفين بتوجع (سلايد 20)')}</${H2}>
          <${OL} cls="no" items=${A ? [
            'بناء الـ model <b>محتاج تدريب</b>، وهو <b>زي الفن</b>.',
            'النتايج ممكن تبقى <b>صعب تفسيرها</b>: أغلب الـ outputs <b>random variables</b>، فصعب تفرق بين العشوائية وسلوك الـ system.',
            'ممكن <b>تاخد وقت وتبقى غالية</b>، ولو بخلت عليها النتايج تطلع غلط.'
          ] : [
            'Model building <b>requires training</b>; it is <b>like an art</b>.',
            'Results can be <b>difficult to interpret</b>: most outputs are <b>random variables</b>, so is it randomness or system behavior?',
            'It can be <b>time consuming and expensive</b>; skimping leads to useless or wrong results.'
          ]} />
          <${P} small=${true}>${X('These are <b>offset</b>: packages need only input data and have output analysis built in, faster computers cut simulation times, and most real problems have <b>no closed-form solution</b> anyway.', 'العيوب دي <b>بتتعوّض</b>: الـ packages محتاجة input data بس وفيها output analysis جاهز، والكمبيوترات الأسرع بتقلل وقت الـ simulation، وأغلب المشاكل الحقيقية <b>ملهاش closed-form solution</b> أصلًا.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('"We use the simulation when model building requires training": <b>False</b>. "Simulation is useful when its results are difficult to interpret": <b>False</b>. Both are <b>disadvantages</b>, not reasons to simulate.',
            'الجملتين دول <b>غلط</b>، لأنهم <b>عيوب</b> مش أسباب نعمل simulation:<span class="ltr">"We use the simulation when model building requires training"</span><span class="ltr">"Simulation is useful when its results are difficult to interpret"</span>')}</p></${Box}>
        `),

        // 17–18 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Analysis and Simulation argue over who should study your system.", 'قعدة الليلة: الـ Analysis والـ Simulation بيتخانقوا مين فيهم يدرس الـ system بتاعك.')} />
          <${Chat} names=${[t('Analysis', 'الـ Analysis'), t('Simulation', 'الـ Simulation')]} lines=${A ? [
            [0, 'أنا بعمل <b>mathematical abstraction</b> وبطلّع <b>formulas</b> للـ performance. حلول نضيفة وحلوة.'],
            [1, 'حلول حلوة فعلًا، بس <b>للـ simple systems بس</b>. المصنع والكمبيوتر والـ network معقدين عليك.'],
            [0, 'وإنت؟ أغلب الـ outputs بتوعك <b>random variables</b>. ده سلوك الـ system ولا عشوائية؟'],
            [1, 'ماشي، دي عليّ. وكمان <b>GIGO</b>: لو اديتني داتا زبالة، هديك نتايج زبالة.'],
            [0, 'خد عندك node بتتحرك لنقط عشوائية. سهلة: هطلّعلك formula لمكانها.'],
            [1, 'سهلة توصفها، بس <b>صعب تطلّع لها closed-form</b> <bdi dir="ltr" style="white-space:nowrap">f(x, y)</bdi>. عشان كده بيشغّلوني أنا.']
          ] : [
            [0, 'I build a <b>mathematical abstraction</b> and derive <b>formulas</b> for the performance. Good, clean solutions.'],
            [1, 'Good solutions, for <b>simple systems only</b>. A factory, a computer, a network: too complex for you.'],
            [0, 'And you? Most of your outputs are <b>random variables</b>. Is that system behavior, or just randomness?'],
            [1, "Fair. And <b>GIGO</b>: feed me garbage data and I'll hand you garbage results."],
            [0, 'A node moves to random points. Easy, I\'ll give you a formula for where it is.'],
            [1, 'Easy to describe, but <b>hard to get a closed-form</b> f(x, y). That\'s why they run me.']
          ]} />
        `, { sec: t('Fireside: Analysis vs Simulation', 'دردشة: الـ Analysis والـ Simulation') }),
        page(html`
          <${Chat} names=${[t('Analysis', 'الـ Analysis'), t('Simulation', 'الـ Simulation')]} start=${1} lines=${A ? [
            [0, 'بس لو المشكلة <b>تتحل رياضيًا</b>، محدش المفروض يعمل simulation.'],
            [1, 'متفقين، دي قاعدة في سلايد 18. ولما formulas بتاعتك تبقى موجودة، أنا أقدر <b>أعمل verify</b> للنتايج بتاعتك، زي الـ queueing systems.'],
            [0, 'بيقولوا عليك model <b>بيتشغّل مش بيتحل</b>.'],
            [1, 'صح. الـ discrete-event model بيتحلل بـ <b>numerical methods</b>: <b>"run"</b> أكتر ما هو <b>"solved"</b>.'],
            [0, 'وفي الآخر إحنا الاتنين شغالين على <b>mathematical model</b>.'],
            [1, 'بالظبط. نفس الـ model، وكل واحد وطريقته.']
          ] : [
            [0, 'Still, if a problem can be <b>solved mathematically</b>, nobody should simulate it.'],
            [1, 'Agreed, that\'s a slide 18 rule. And when your formulas exist, I can <b>verify your analytical results</b>, e.g. for queueing systems.'],
            [0, 'People say you are a model that is <b>run, not solved</b>.'],
            [1, 'True. A discrete-event model is analyzed by <b>numerical methods</b>: "run" rather than "solved".'],
            [0, 'In the end we both study a <b>mathematical model</b>.'],
            [1, 'Exactly. Same model, different style.']
          ]} />
          <${Grow} />
          <${Hand} arrow="down">${t('the slide 37 tree, a few pages on: a mathematical model is studied by an analytical model or by simulation', 'شجرة سلايد 37 بعد كام صفحة: الـ mathematical model بيتدرس بـ analytical model أو بالـ simulation')}</${Hand}>
          <${Talk} who="cpu">${t("Which is why I don't do formulas. I do runs.", 'وعشان كده أنا معنديش formulas. عندي runs.')}</${Talk}>
        `),

        // 19 · application areas
        page(html`
          <${H2}>${t('Where simulation is used (slide 21)', 'الـ simulation بتتستخدم فين (سلايد 21)')}</${H2}>
          <div className="hf-ms1-chips hf-in" dir="ltr">${['Manufacturing', 'Semiconductor manufacturing', 'Construction engineering & project management', 'Military', 'Logistics, supply chain & distribution', 'Transportation & traffic', 'Business processes', 'Health care', 'Call-center', 'Computers & Networks', 'Games, Entertainment', '…'].map((x, i) => html`<span key=${i}>${x}</span>`)}</div>
          <${P} small=${true}>${X('‡ The lecture notes also list <b>Automated Material Handling Systems (AMHS)</b>.', '‡ الـ lecture notes بتضيف كمان الـ <b><bdi dir="ltr">Automated Material Handling Systems (AMHS)</bdi></b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Application areas of simulation is related to health care and military only": <b>False</b>, the list is long. And in Exam 2024/25 the odd one out was <b>Food industry</b>: it is not on the list.',
            'دي <b>غلط</b>، الليستة طويلة:<span class="ltr">"Application areas of simulation is related to health care and military only"</span>وفي امتحان 2024/25 الاختيار اللي مش في الليستة كان الـ <b>Food industry</b>.')}</p></${Box}>
        `, { sec: t('Application areas', 'مجالات التطبيق') }),

        // 20 · system and environment
        page(html`
          <${H1}>${t('What is a system?', 'يعني إيه system؟')}</${H1}>
          <${Def}>${X('A <b>system</b> is a <b>group of objects</b> joined together in some regular interaction or interdependence toward the <b>accomplishment of some purpose</b> (slide 23).', 'الـ <b>system</b> هو <b>مجموعة objects</b> مربوطة ببعض في تفاعل أو اعتماد متبادل منتظم عشان <b>تحقق هدف معين</b> (سلايد 23).')}</${Def}>
          <${UL} items=${A ? ['الـ <b>Automobile factory</b>: المكن والقطع والعمال بيشتغلوا مع بعض عشان يطلّعوا عربية.', 'الـ <b>Computer network</b>: الـ users والـ hosts والـ routers والـ lines بيكوّنوا network.'] : ['<b>Automobile factory</b>: machines, parts and workers operate jointly to produce a vehicle.', '<b>Computer network</b>: users, hosts, routers and lines establish a network.']} />
          <${Def}>${X('The <b>system environment</b> is everything <b>outside</b> the system that <b>affects</b> the system (slide 24).', 'الـ <b>system environment</b> هو كل حاجة <b>برّه</b> الـ system بس <b>بتأثر</b> عليه (سلايد 24).')}</${Def}>
          <${Hand} red=${true} arrow="up">${X('Attention: you must <b>decide on the boundary</b>, and that depends on the <b>purpose of the study</b>.', 'خد بالك: لازم <b>تحدد الحدود (boundary)</b>، والقرار ده بيعتمد على <b>هدف الدراسة</b>.')}</${Hand}>
        `, { sec: t('System and environment', 'الـ System والـ environment') }),
        page(html`
          <${H2}>${t('Where does the system end?', 'الـ system بيخلص فين؟')}</${H2}>
          <${Fig} name="ms-sysenv" />
        `),
        page(html`
          <${H2}>${t('‡ The lecture notes\' factory (Fig 1.1)', '‡ مصنع الـ lecture notes (Fig 1.1)')}</${H2}>
          <${Fig} name="ms-factory" />
        `),

        // 23 · components
        page(html`
          <${H1}>${t('The parts of a system (slide 25)', 'مكونات الـ system (سلايد 25)')}</${H1}>
          <div className="hf-in" style=${{ display: 'grid', gap: '2px' }}>${(A ? [
            ['Entity', 'الـ object اللي يهمنا في الـ system.'],
            ['Attribute', 'خاصية (property) للـ entity.'],
            ['Activity', 'فترة زمنية طولها محدد.'],
            ['System state', 'الـ variables اللي محتاجها عشان توصف الـ system في أي لحظة.'],
            ['Event', 'حاجة بتحصل في لحظة وممكن تغيّر الـ state.'],
            ['Endogenous', 'الـ activities والـ events اللي بتحصل <b>جوه</b> الـ system.'],
            ['Exogenous', 'الـ activities والـ events اللي في الـ <b>environment</b> وبتأثر على الـ system.']
          ] : [
            ['Entity', 'object of interest in the system.'],
            ['Attribute', 'property of an entity.'],
            ['Activity', 'a time period of specified length.'],
            ['System state', 'collection of variables required to describe the system at any time.'],
            ['Event', 'an instantaneous occurrence that might change the state.'],
            ['Endogenous', 'activities and events occurring <b>within</b> the system.'],
            ['Exogenous', 'activities and events in the <b>environment</b> (outside) that affect the system.']
          ]).map(([k, v], i) => html`<p key=${i} className="hf-p small" style=${{ margin: 0 }}><b style=${{ color: 'var(--hf-k)', fontWeight: 800 }}>${A ? 'الـ ' : ''}${k}</b>${A ? ' هو ' : ': '}${T(v)}</p>`)}</div>
          <${P} small=${true}>${X('‡ The lecture notes add: an <b>open system</b> has exogenous activity; a <b>closed system</b> has <b>none</b>.', '‡ الـ lecture notes بتضيف: الـ <b>open system</b> فيه exogenous activity، والـ <b>closed system</b> <b>مفيهوش</b> خالص.')}</${P}>
        `, { sec: t('Components of a system', 'مكونات الـ system') }),

        // 24 · router
        page(html`
          <${H2}>${t('A router with two interfaces (slide 26)', 'router بـ 2 interfaces (سلايد 26)')}</${H2}>
          <${Fig} name="ms-router" />
        `),

        // 25 · match
        page(html`
          <${H2}>${t('Who is who?', 'مين مين؟')}</${H2}>
          <${P} small=${true}>${t('Tap a term, then tap its meaning.', 'دوس على المصطلح، وبعدين دوس على معناه.')}</${P}>
          <${Match} id="terms" left=${A ? ['الـ Entity', 'الـ Attribute', 'الـ Activity', 'الـ System state', 'الـ Event', 'الـ Endogenous', 'الـ Exogenous'] : ['Entity', 'Attribute', 'Activity', 'System state', 'Event', 'Endogenous', 'Exogenous']}
            right=${A ? ['فترة زمنية طولها محدد', 'حاجات في الـ environment بتأثر على الـ system', 'الـ object اللي يهمنا', 'حاجة لحظية ممكن تغيّر الـ state', 'خاصية للـ entity', 'حاجات بتحصل جوه الـ system', 'الـ variables اللي بتوصف الـ system في أي لحظة']
              : ['A time period of specified length', 'Happens in the environment, affects the system', 'Object of interest in the system', 'Instantaneous; might change the state', 'Property of an entity', 'Happens within the system', 'Variables that describe the system at any time']}
            answer=${[2, 4, 0, 6, 3, 5, 1]} />
          <${P} small=${true}>${X('‡ Router slide: "Transmit IF2 → IF2, 15 µs" most likely means <b>IF2 → IF1</b>.', '‡ في سلايد الـ router المكتوب <bdi dir="ltr">IF2 → IF2</bdi>، والأغلب إن المقصود <bdi dir="ltr"><b>IF2 → IF1</b></bdi>.')}</${P}>
        `, { sec: t('Exercise: who is who?', 'تمرين: مين مين؟') }),

        // 26 · watch it endo/exo
        page(html`
          <${Box} kind="watch" title=${t('Watch it: inside or outside?', 'خلّي بالك: جوه ولا برّه؟')}><p className="hf-p small">${X('The papers swap the two words. <b>Endogenous = within</b> the system, <b>exogenous = in the environment</b>. A swapped sentence is <b>False</b>. Trick (ours): <b>ex</b>ogenous = <b>ex</b>it, outside.',
            'الامتحانات بتبدّل الكلمتين: الـ <b>Endogenous</b> يعني <b>جوه</b> الـ system، والـ <b>Exogenous</b> يعني <b>في الـ environment</b>. لو اتبدّلوا تبقى <b>غلط</b>. حيلة من عندنا: الـ <b>ex</b>ogenous زي <bdi dir="ltr"><b>ex</b>it</bdi> يعني برّه.')}</p></${Box}>
          ${mq('m-endo', /System Endogenous are activities and events in the environment/i)}
        `),

        // 27 · systable
        page(html`
          <${H2}>${t('Six more systems (slide 27)', 'ست systems كمان (سلايد 27)')}</${H2}>
          <${Fig} name="ms-systable" />
        `),

        // 28 · discrete vs continuous
        page(html`
          <${H1}>${t('Jumps or flow? (slide 28)', 'نطّات ولا انسياب؟ (سلايد 28)')}</${H1}>
          <${Def}>${X('<b>Discrete system</b>: the state variables change only at a <b>discrete set of points</b> in time. Bank, gift shop; router, host; jobs in a queue.', 'الـ <b>Discrete system</b>: الـ state variables بتتغير بس عند <b>نقط منفصلة</b> في الزمن. البنك ومحل الهدايا؛ الـ router والـ host؛ الـ jobs في الـ queue.')}</${Def}>
          <${Def}>${X('<b>Continuous system</b>: the state variables change <b>continuously over time</b>. The head of water behind a dam; temperature.', 'الـ <b>Continuous system</b>: الـ state variables بتتغير <b>بشكل مستمر مع الوقت</b>. ارتفاع المية ورا السد؛ ودرجة الحرارة.')}</${Def}>
          <${Dumb} qa=${A ? [
            ['ليه البنك discrete؟', '‡ <b>عدد</b> الزباين بيتغير بس لما زبون <b>يوصل</b> أو <b>خدمته تخلص</b>، وبينهم ثابت: step function.']
          ] : [
            ['Why is a bank discrete?', '‡ The <b>number</b> of customers changes only when one <b>arrives</b> or a <b>service ends</b>: a step function.']
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ A dam fills and drains <b>all the time</b>. "Head of water behind a dam and temperature are examples of discrete systems": <b>False</b>.', '‡ السد بيتملا بعد المطر وبيتسحب منه، فبيتغير <b>على طول</b>. فجملة إن السد والحرارة <b>discrete</b> <b>غلط</b>.')}</p></${Box}>
        `, { sec: t('Discrete and continuous', 'الـ Discrete والـ continuous') }),
        page(html`
          <${H2}>${t('Step function vs smooth curve', 'step function قصاد منحنى ناعم')}</${H2}>
          <${Fig} name="ms-discont" />
        `),

        // 30 · model
        page(html`
          <${H1}>${t('What is a model?', 'يعني إيه model؟')}</${H1}>
          <${Def}>${X('A <b>model</b> is a <b>representation of a system</b> for the purpose of <b>studying the system</b> (slide 34).', 'الـ <b>model</b> هو <b>تمثيل لـ system</b> بهدف إننا <b>ندرس الـ system ده</b> (سلايد 34).')}</${Def}>
          <${UL} items=${A ? ['الطريقة: خد في الاعتبار <b>بس الجوانب</b> اللي بتأثر على المشكلة اللي بتدرسها.', 'المشاكل: الـ <b>granularity of details</b> (تحط تفاصيل قد إيه)، والـ <b>models مش unique</b>.', '‡ الـ lecture notes: الـ model هو <b>simplification of reality</b>.'] : ['Approach: consider <b>only those aspects</b> that affect the problem under investigation.', 'Problems: the <b>granularity of details</b>, and <b>models are not unique</b>.', '‡ The lecture notes: a model is a <b>simplification of reality</b>.']} />
          <${UL} items=${A ? [
            'الـ <b>Physical model</b>: <b>prototype</b> للـ system عشان ندرسه، زي الـ molecular model البلاستيك اللي في سلايد 35.',
            'الـ <b>Mathematical model</b>: بيستخدم <b>symbolic notation ومعادلات رياضية</b>، زي الـ differential equations بتاعة المكنة الكهربا في سلايد 36.'
          ] : [
            '<b>Physical model</b>: a <b>prototype</b> of a system for the purpose of study, like slide 35\'s plastic molecular model.',
            '<b>Mathematical model</b>: uses <b>symbolic notation and mathematical equations</b>, like slide 36\'s differential equations of an electrical machine.'
          ]} />
        `, { sec: t('Models', 'الـ Models') }),
        page(html`
          <${H2}>${t('From system to model (slide 34)', 'من الـ system للـ model (سلايد 34)')}</${H2}>
          <${Fig} name="ms-sysmodel" />
        `),
        page(html`
          <${Fig} name="ms-howstudy" />
          <${P} small=${true}>${X('‡ The lecture notes split mathematical models into <b>static</b> (equilibrium, e.g. supply and demand) and <b>dynamic</b> (attributes as a function of time).', '‡ الـ lecture notes بتقسم الـ mathematical models لـ <b>static</b> (حالة اتزان، زي العرض والطلب) و<b>dynamic</b> (الـ attributes كـ function في الوقت).')}</${P}>
        `),

        // 32 · gallery of models
        page(html`
          <${H2}>${t('A gallery of models (slides 38–45)', 'معرض models (سلايد 38–45)')}</${H2}>
          <div className="hf-in" style=${{ display: 'grid', gap: '5px' }}>
            <${ProCon} title=${t('Mobility: d = v · t', 'الـ Mobility')} pros=${A ? ['المسافة <bdi dir="ltr">d = v · t</bdi> على فرض إن الـ velocity ثابتة. بسيط وسهل نفهمه.'] : ['Assumes constant velocity v over the whole time t. Simple formulae, intuitive.']} cons=${A ? ['<b>نادرًا ما بيكون صح</b> لرحلة كاملة (بني آدم، عربية، طيارة).'] : ['<b>Seldom valid</b> for a whole travel (human, car, planes).']} />
            <${ProCon} title=${t('Radio propagation: free space', 'الـ Radio propagation: الـ free space')} pros=${A ? ['المعادلة <code style="white-space:nowrap">PL_dB(d) = −10 lg(GtGrλ²/((4π)²d²))</code> على فرض إن فيه <b>line of sight</b> ومفيش obstacles. بسيطة للـ open space.'] : ['<code style="white-space:nowrap">PL_dB(d) = −10 lg(GtGrλ²/((4π)²d²))</code>. Assumes <b>line of sight</b>, no obstacles; simple formulae for open space.']} cons=${A ? ['مش مفيد أوي <b>جوه المباني وفي المدن</b>.'] : ['Not really useful <b>indoors and in cities</b>.']} />
          </div>
          <${P} small=${true}>${X('Then the network and computer models: <b>ISO/OSI</b>, <b>TCP/IP</b>, the <b>six-level computer</b>, the <b>communication link</b> delays, the <b>cellular system</b> (hexagonal cells, for cellular networks, WLAN, WIMAX and mesh networks), and <b>user behavior</b> at user, object and packet level.',
            'وبعدين: الـ <b>ISO/OSI</b> والـ <b>TCP/IP</b>، والـ <b>six-level computer</b>، والـ delays بتاعة الـ <b>link</b>، والـ <b>cellular system</b> (خلايا سداسية، للـ cellular والـ WLAN والـ WIMAX والـ mesh)، والـ <b>user behavior</b> على مستوى الـ user والـ object والـ packet.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Radio propagation is an example of system model": <b>True</b> (revision sheet).', 'دي <b>صح</b> (من الـ revision sheet):<span class="ltr">"Radio propagation is an example of system model"</span>')}</p></${Box}>
        `, { sec: t('Example models', 'أمثلة على الـ models') }),
        page(html`
          <${H2}>${t('Drive the mobility model', 'سوق الـ mobility model')}</${H2}>
          <${Fig} name="ms-mobility" />
        `),
        page(html`
          <${H2}>${t('Free space: theory vs measurement', 'الـ Free space: النظرية قصاد القياس')}</${H2}>
          <${Fig} name="ms-freespace" />
        `),
        page(html`
          <${H2}>${t('ISO/OSI vs TCP/IP (slides 40–41)', 'الـ ISO/OSI والـ TCP/IP (سلايد 40–41)')}</${H2}>
          <${Fig} name="ms-tcpip" />
          <${Hand} red=${true}>${X('Presentation and Session <b>don\'t exist</b> in TCP/IP. Network ↔ <b>Internet</b>; Data Link + Physical ↔ <b>Host-to-Network</b>.', 'الـ Presentation والـ Session <b>مش موجودين</b> في الـ TCP/IP. والـ Network بتقابلها الـ <b>Internet</b>، والـ Data Link مع الـ Physical بتقابلهم الـ <b>Host-to-Network</b>.')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('The six-level computer (slide 42)', 'الكمبيوتر بست مستويات (سلايد 42)')}</${H2}>
          <${Fig} name="ms-sixlevel" />
        `),
        page(html`
          <${H2}>${t('Four delays on a link (slide 43)', 'أربع delays على الـ link (سلايد 43)')}</${H2}>
          <${Fig} name="ms-linkdelay" />
          <${Hand}>${t('processing, queueing, transmission (all bits onto the medium), propagation (A to B)', 'الـ processing والـ queueing والـ transmission (كل الـ bits على الـ medium) والـ propagation (من A لـ B)')}</${Hand}>
        `),

        // 39–40 · principles interview
        page(html`
          <${Interview} title=${t('The Modeler, exposed', 'الـ Modeler على المكشوف')} sub=${t("This week: nine principles of modeling (slide 46, Pritsker et al., WSC 1991).", 'حوار الأسبوع: تسع مبادئ للـ modeling (سلايد 46، Pritsker وزمايله، WSC 1991).')} lines=${A ? [
            ['المذيع', 'تحتاج إيه عشان تتصور model؟'],
            ['الـ Modeler', '<b>معرفة بالـ system</b>، وengineering judgment، وأدوات لبناء الـ model.'],
            ['المذيع', 'وإيه سر الـ modeler الشاطر؟'],
            ['الـ Modeler', 'إنه يعرف إمتى محتاج، ويقدر، <b>يعمل remodel</b>. والعملية <b>evolutionary</b>، لأن الـ modeling بيكشف المعلومات المهمة حتة حتة.'],
            ['المذيع', 'مين اللي ماسك الدفة؟'],
            ['الـ Modeler', 'الـ <b>problem statement</b>. هو العنصر الأساسي اللي بيتحكم في حل المشكلة.'],
            ['المذيع', 'وsystem فيه جزء continuous وجزء discrete؟'],
            ['الـ Modeler', 'الـ <b>continuous الأول</b>، وبعدين الـ discrete.']
          ] : [
            ['Head First', 'What does it take to conceptualize a model?'],
            ['Modeler', '<b>System knowledge</b>, engineering judgment and model-building tools.'],
            ['Head First', 'And the secret of a good modeler?'],
            ['Modeler', 'Recognizing the need, and having the ability, to <b>remodel</b>. The process is <b>evolutionary</b>: modeling reveals important information piecemeal.'],
            ['Head First', 'Who is in charge?'],
            ['Modeler', 'The <b>problem statement</b>. It is the primary controlling element in model-based problem solving.'],
            ['Head First', 'A system that is part continuous, part discrete?'],
            ['Modeler', '<b>Continuous aspects first</b>, then the discrete ones.']
          ]} />
        `, { sec: t('Principles and a good model', 'المبادئ والـ model الكويس') }),
        page(html`
          ${(A ? [
            ['المذيع', 'الـ model بتاعك كويس؟'],
            ['الـ Modeler', 'بقيّمه حسب <b>فايدته (usefulness)</b>. بشكل مطلق الـ model لا كويس ولا وحش، ولا حتى محايد.'],
            ['المذيع', 'يعني الهدف model حلو؟'],
            ['الـ Modeler', 'لأ. الهدف <b>المعرفة والفهم</b>، مش الـ models.'],
            ['المذيع', 'وتشتغل top-down ولا bottom-up؟'],
            ['الـ Modeler', 'اعرف إمتى تعمل ده وإمتى ده. والأهم من التقنيات إنك توازن الـ <b>tradeoffs</b> بينها.']
          ] : [
            ['Head First', 'Is your model good?'],
            ['Modeler', 'Judge it by its <b>usefulness</b>. In absolute terms a model is neither good nor bad, nor is it neutral.'],
            ['Head First', 'So the goal is a great model?'],
            ['Modeler', 'No. The purpose is <b>knowledge and understanding</b>, not models.'],
            ['Head First', 'Top-down or bottom-up?'],
            ['Modeler', 'Know when to do each. And more than techniques, learn the <b>tradeoffs</b> among them.']
          ]).map(([w, x], i) => html`<p key=${i} className="hf-iv-l hf-in"><b>${w}:</b>${T(x)}</p>`)}
          <${Grow} />
          <${H2}>${t('What is a good model? (slide 47)', 'إيه هو الـ model الكويس؟ (سلايد 47)')}</${H2}>
          <div className="hf-ms1-chips hf-in" dir="ltr">${['Simplicity', 'Credibility', 'Efficiency', 'Availability', 'Verified', 'Code quality', 'Documentation'].map((x, i) => html`<span key=${i}><b>${i + 1}</b> ${x}</span>`)}</div>
          <${Box} kind="watch"><p className="hf-p small">${X('"The problem statement is the primary controlling element in model-based problem solving": <b>True</b>. The list of seven good-model qualities: <b>True</b> too.', 'الجملة دي <b>صح</b>، وليستة الصفات السبعة <b>صح</b> برضه:<span class="ltr">"The problem statement is the primary controlling element in model-based problem solving"</span>')}</p></${Box}>
        `),

        // 41 · simulation model types
        page(html`
          <${H1}>${t('Six words for a simulation model', 'ست كلمات توصف بيهم الـ simulation model')}</${H1}>
          <${P} small=${true}>${X('A <b>simulation model</b> is a particular type of <b>mathematical model</b> of a system (slide 48). It comes in three pairs:', 'الـ <b>simulation model</b> نوع معين من الـ <b>mathematical model</b> لـ system (سلايد 48). وأنواعه تلات أزواج:')}</${P}>
          <table className="hf-ms1-tb hf-in"><tbody>${(A ? [
            ['Static', 'الـ system في <b>لحظة معينة</b>', 'Dynamic', 'على <b>فترة زمنية</b>'],
            ['Deterministic', '<b>من غير</b> random variables', 'Stochastic', '<b>فيه</b> random variables'],
            ['Discrete', 'الـ state بيتغير عند <b>نقط منفصلة</b>', 'Continuous', 'الـ state بيتغير <b>على طول</b>']
          ] : [
            ['Static', 'the system at a particular <b>point in time</b>', 'Dynamic', 'the system over a <b>time interval</b>'],
            ['Deterministic', '<b>without</b> random variables', 'Stochastic', '<b>with</b> random variables'],
            ['Discrete', 'state changes only at <b>discrete time points</b>', 'Continuous', 'state changes <b>continuously</b>']
          ]).map((r, i) => html`<tr key=${i}><th style=${{ fontFamily: 'var(--body)' }}>${r[0]}</th><td>${T(r[1])}</td><th style=${{ fontFamily: 'var(--body)' }}>${r[2]}</th><td>${T(r[3])}</td></tr>`)}</tbody></table>
          <${P} small=${true}>${X('‡ Lecture notes: deterministic, classes at a fixed time (a <b>unique</b> output); stochastic, customers arriving at a bank (<b>random outputs</b>).', '‡ أمثلة الـ lecture notes: الـ deterministic زي محاضرات الكلية في وقت ثابت (output <b>وحيد</b>)، والـ stochastic زي وصول الزباين للبنك (<b>outputs عشوائية</b>).')}</${P}>
          <${Grow} />
          <${Talk} who="dice">${X('Slide 49: this class focuses on <b>discrete, dynamic, stochastic</b> models. That\'s me.', 'سلايد 49: الكورس بيركز على الـ <b>discrete و dynamic و stochastic</b>. يعني أنا.')}</${Talk}>
        `, { sec: t('Types of simulation models', 'أنواع الـ simulation models') }),
        page(html`
          <${H2}>${t('Pick a path down the tree (slide 50)', 'امشي في الشجرة (سلايد 50)')}</${H2}>
          <${Fig} name="ms-taxonomy" />
        `),

        // 43 · DES
        page(html`
          <${H2}>${t('Discrete-event simulation (slide 51)', 'الـ Discrete-event simulation (سلايد 51)')}</${H2}>
          <${UL} items=${A ? ['بيتحلل بـ <b>numerical methods</b> (computational procedures)، فالـ model بيتعمله <b>"run"</b> أكتر ما بيتعمله <b>"solve"</b>.'] : ['It is analyzed by <b>numerical methods</b> (computational procedures), so the model is rather <b>"run"</b> than <b>"solved"</b>.']} />
          <${Box} kind="watch" title=${t('Watch it: the two famous leaves', 'خلّي بالك: الورقتين المشهورين')}>
            ${A ? li(['الـ <b>Monte Carlo</b> هي الـ static والـ stochastic.', 'الـ <b>Discrete-event</b> هي الـ dynamic والـ stochastic والـ discrete.', 'اللي <b>من غير</b> random variables اسمها <b>deterministic</b>.'])
              : li(['<b>Monte Carlo</b> = static + stochastic.', '<b>Discrete-event</b> = dynamic + stochastic + discrete.', 'Models <b>without</b> random variables are <b>deterministic</b>, not stochastic.'])}</${Box}>
          ${mq('m-mc', /Monte Carlo simulation is a static/i)}
        `),

        // 44 · metrics
        page(html`
          <${H2}>${t('How good is "good"? Performance metrics', 'يعني إيه "كويس"؟ الـ performance metrics')}</${H2}>
          <${Fig} name="ms-metrics" />
        `, { sec: t('Performance metrics', 'الـ Performance metrics') }),
        page(html`
          <${P} small=${true}>${X('A <b>request for service i</b> is done correctly, done incorrectly, or cannot be done; each outcome has its own metrics. The web server\'s values (slide 54), converted:', 'الـ <b>request for service i</b> يا إما يتعمل صح، يا إما غلط، يا إما مينفعش يتعمل، وكل نتيجة ليها metrics. قيم الـ web server (سلايد 54) بعد التحويل:')}</${P}>
          <table className="hf-ms1-tb hf-in" dir="ltr"><tbody>${[['Response time', '300 msec = 300 / 1000 = 0.3 sec'], ['Throughput', '8420 queries/min = 12.5 MB/sec (≈ 140.3 queries/sec)'], ['Utilization', '48.4% load'], ['Error probability', 'p = 0.3'], ['Time between errors', '30 min × 60 = 1800 sec'], ['Server down, duration', '1 hour = 60 × 60 = 3600 sec'], ['Time between events', '1 day = 24 × 3600 = 86400 sec']].map((r, i) => html`<tr key=${i}><th style=${{ fontFamily: 'var(--body)', width: '38%' }}>${r[0]}</th><td style=${{ fontFamily: 'var(--mono)', fontSize: '12.5px' }}>${r[1]}</td></tr>`)}</tbody></table>
          <${Box} kind="watch"><p className="hf-p small">${X('Revision sheet, all <b>True</b>: response time, throughput and utilization are for <b>correct</b> service; probability and time between errors for <b>incorrect</b> service; duration of the event and time between events when the system is <b>down</b>.',
            'في الـ revision sheet دول كلهم <b>صح</b>: الـ response time والـ throughput والـ utilization للـ service <b>الصح</b>؛ والـ probability والـ time between errors للـ service <b>الغلط</b>؛ والـ duration of the event والـ time between events لما الـ system <b>يقع</b>.')}</p></${Box}>
        `),

        // 46 · response time
        page(html`
          <${H2}>${t('Reaction, response and think time (slides 55–56)', 'الـ Reaction والـ response والـ think time (سلايد 55–56)')}</${H2}>
          <${Fig} name="ms-resptime" />
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Be the stopwatch', 'خليك إنت الـ stopwatch')}><p className="hf-p small">${t('Pick a span, then tap the moment it starts and the moment it ends on the slide 56 time line.', 'اختار فترة، وبعدين دوس على اللحظة اللي بتبدأ عندها واللحظة اللي بتخلص عندها على خط زمن سلايد 56.')}</p></${Box}>
          <${Stopwatch} />
        `, { sec: t('Exercise: be the stopwatch', 'تمرين: خليك الـ stopwatch') }),
        page(html`
          <${Box} kind="watch" title=${t('Watch it: execution or response?', 'خلّي بالك: execution ولا response؟')}><p className="hf-p small">${X('"The <b>reaction</b> time is the time between user finishes request and system starts <b>response</b>": <b>False</b>; reaction ends at system starts <b>execution</b>. The same sentence with <b>response</b> time is <b>True</b>.',
            'دي <b>غلط</b>، لأن الـ reaction بيخلص عند الـ <b>execution</b>:<span class="ltr">"The reaction time is the time between user finishes request and system starts response"</span>ونفس الجملة بالـ <b>response</b> time تبقى <b>صح</b>.')}</p></${Box}>
          ${mq('m-think', /think time is the time between system starting/i)}
        `),
        page(html`
          <${H2}>${t('Lower, higher or nominal? (slide 57)', 'أقل ولا أعلى ولا في النص؟ (سلايد 57)')}</${H2}>
          <${Fig} name="ms-utility" />
        `),

        // 49 · steps
        page(html`
          <${H1}>${t('A simulation study in 12 steps (slide 59)', 'الـ simulation study في 12 خطوة (سلايد 59)')}</${H1}>
          <${OL} cls="tight" items=${A ? [
            'الـ <b>Problem formulation</b>: افهم المشكلة كويس، وأعد صياغتها.',
            'الـ <b>Setting of objectives and overall project plan</b>: أسئلة إيه؟ الـ simulation مناسبة؟ التكلفة؟',
            'الـ <b>Model conceptualization</b>: مفيش دليل عام، وفيه أدوات زي الـ UML.',
            'الـ <b>Data collection</b>: نجيب الـ data إزاي؟ الـ distributions مناسبة؟',
            'الـ <b>Model translation</b>: برنامج بيشتغل على الكمبيوتر.',
            'الـ <b>Verified?</b> البرنامج بيعمل اللي الـ model بيوصفه؟',
            'الـ <b>Validated?</b> النتايج مطابقة للواقع؟ الـ calibration؟',
            'الـ <b>Experimental design</b>: أنهي alternatives وأنهي parameters؟',
            'الـ <b>Production runs and analysis</b>',
            'الـ <b>More runs?</b>',
            'الـ <b>Documentation and reporting</b>: الـ program والـ progress.',
            'الـ <b>Implementation</b>'
          ] : [
            '<b>Problem formulation</b>: clearly understand the problem; reformulate it.',
            '<b>Setting of objectives and overall project plan</b>: which questions? is simulation appropriate? costs?',
            '<b>Model conceptualization</b>: no general guide; research tools such as UML.',
            '<b>Data collection</b>: how to get data? are the random distributions appropriate?',
            '<b>Model translation</b>: a program that runs on a computer.',
            '<b>Verified?</b> Does the program do what the model describes?',
            '<b>Validated?</b> Do the results match reality? Calibration?',
            '<b>Experimental design</b>: which alternatives to run, which parameters to vary?',
            '<b>Production runs and analysis</b>',
            '<b>More runs?</b>',
            '<b>Documentation and reporting</b>: program and progress documentation.',
            '<b>Implementation</b>'
          ]} />
          <${P} small=${true}>${X('‡ Step 6 on slide 59 reads "Does the program <b>that</b>, what…"; <b>do</b> is meant.', '‡ الخطوة 6 في سلايد 59 مكتوب فيها <bdi dir="ltr">"that"</bdi> والمقصود <bdi dir="ltr">"do"</bdi>.')}</${P}>
        `, { sec: t('Steps of a simulation study', 'خطوات الـ simulation study') }),
        page(html`
          <${H2}>${t('Walk the flowchart and its loops', 'امشي في الـ flowchart واللفّات بتاعته')}</${H2}>
          <${Fig} name="ms-steps" />
        `),
        page(html`
          <${H2}>${t('Four phases (slide 60)', 'أربع phases (سلايد 60)')}</${H2}>
          <table className="hf-ms1-tb hf-in" dir="ltr"><tbody>${[['1', 'Discovery and Orientation', '1–2'], ['2', 'Model building and data collection', '3–7'], ['3', 'Run the model', '8–10'], ['4', 'Implementation', '11–12']].map((r, i) => html`<tr key=${i}><th>${r[0]}</th><td>${r[1]}</td><td style=${{ width: '52px', fontFamily: 'var(--mono)' }}>${r[2]}</td></tr>`)}</tbody></table>
          <${Hand} red=${true}>${X('The <b>most crucial</b> step: <b>validation</b>. An invalid model means dangerous, expensive decisions.', '<b>أهم خطوة</b> هي الـ <b>validation</b>: الـ model اللي مش valid بيوصّل لقرارات خطيرة وغالية.')}</${Hand}>
          <${Dumb} qa=${A ? [
            ['هو الـ verification هو الـ validation؟', '‡ لأ. الـ <b>verification</b>: البرنامج مطابق للـ model؟ والـ <b>validation</b>: الـ model مطابق للواقع (بالـ <b>calibration</b>)؟ لو الأول فشل ترجع لـ 5، ولو التاني فشل ترجع لـ 3 و 4.'],
          ] : [
            ['Verification = validation?', '‡ No. <b>Verification</b>: does the program match the model? <b>Validation</b>: does the model match the real system (by <b>calibration</b>)? Failed verification: back to step 5; failed validation: back to 3 and 4.'],
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('"…three phases: discovery and orientation, model building and data collection, and run the model": <b>False</b>. There are <b>four</b>.', 'جملة الـ revision sheet اللي بتقول إنهم <b>تلات</b> phases <b>غلط</b>: هما <b>أربعة</b>، والـ implementation ناقصة.')}</p></${Box}>
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Which phase?', 'أنهي phase؟')}><p className="hf-p small">${t('Tap the phase (1–4) each step belongs to.', 'دوس على رقم الـ phase (1–4) اللي كل خطوة تبعها.')}</p></${Box}>
          <${Sort} id="phase" bins=${[['1', 'Phase 1'], ['2', 'Phase 2'], ['3', 'Phase 3'], ['4', 'Phase 4']]} items=${A ? [
            ['الـ Validated?', 1], ['الـ Problem formulation', 0], ['الـ More runs?', 2], ['الـ Documentation and reporting', 3], ['الـ Data collection', 1], ['الـ Experimental design', 2],
            ['الـ Setting of objectives', 0], ['الـ Model translation', 1], ['الـ Implementation', 3]
          ] : [
            ['Validated?', 1], ['Problem formulation', 0], ['More runs?', 2], ['Documentation and reporting', 3], ['Data collection', 1], ['Experimental design', 2],
            ['Setting of objectives', 0], ['Model translation', 1], ['Implementation', 3]
          ]} />
        `, { sec: t('Exercise: which phase?', 'تمرين: أنهي phase؟') }),

        // 53 · tools
        page(html`
          <${H1}>${t('Pick your tool (Simulation Tools)', 'اختار أداتك (Simulation Tools)')}</${H1}>
          <${P} small=${true}>${X('Once simulation is the appropriate means, there are <b>three alternatives</b> (tools slide 2):', 'لو الـ simulation هي الوسيلة المناسبة، فيه <b>3 بدائل</b> (سلايد 2 في الـ tools):')}</${P}>
          <${OL} items=${A ? ['تبني الـ model بـ <b>General Purpose Language</b>.', 'تبنيه بـ <b>General Simulation Language</b>.', 'تستخدم <b>Special Purpose Simulation Package</b>.'] : ['Build the model in a <b>General Purpose Language</b>.', 'Build it in a <b>General Simulation Language</b>.', 'Use a <b>Special Purpose Simulation Package</b>.']} />
          <${ProCon} title=${t('1 · General purpose language', '1 · الـ General purpose language')}
            pros=${A ? ['تكلفة software إضافية قليلة أو مفيش', 'متاحة في كل حتة (portable)', 'مش محتاج تدريب إضافي'] : ['Little or no additional software cost', 'Universally available (portable)', 'No additional training']}
            cons=${A ? ['كل model بيبدأ من الصفر', 'كود قليل جدًا يتعاد استخدامه', 'الـ development cycle طويل لكل model', 'الـ verification صعب'] : ['Every model starts from scratch', 'Very little reusable code', 'Long development cycle for each model', 'Difficult verification phase']} />
          <${Hand}>${X('FORTRAN (probably more models than any other), PASCAL, MODULA, ADA (a Department of Defense standardization attempt), C, C++', 'الـ FORTRAN (غالبًا أكتر لغة اتعمل بيها models)، والـ PASCAL، والـ MODULA، والـ ADA (محاولة standardization من الـ Department of Defense)، والـ <bdi dir="ltr">C, C++</bdi>')}</${Hand}>
        `, { sec: t('Simulation tools', 'أدوات الـ simulation') }),
        page(html`
          <${ProCon} title=${t('2 · General simulation language', '2 · الـ General simulation language')}
            pros=${A ? ['features متوحدة بتحتاجها كتير في الـ modeling', 'development cycle أقصر لكل model', 'مساعدة كبيرة في الـ verification', 'كود سهل القراية جدًا'] : ['Standardized features often needed in modeling', 'Shorter development cycle for each model', 'Much assistance in model verification', 'Very readable code']}
            cons=${A ? ['تكلفة software أعلى في الأول', 'محتاج تدريب إضافي', 'الـ portability محدودة'] : ['Higher (up-front) software cost', 'Additional training required', 'Limited portability']} />
          <${ProCon} title=${t('3 · Special purpose package', '3 · الـ Special purpose package')}
            pros=${A ? ['development سريع جدًا للـ models المعقدة', 'الـ learning cycle قصير', 'مفيش برمجة، فالأخطاء قليلة جدًا'] : ['Very quick development of complex models', 'Short learning cycle', 'No programming, so minimal errors in usage']}
            cons=${A ? ['الـ software غالي', 'مجال الاستخدام محدود', 'الـ flexibility محدودة (ممكن ميناسبش الـ application بتاعتك)'] : ['High cost of software', 'Limited scope of applicability', 'Limited flexibility (may not fit your application)']} />
          <${Hand}>${X('Packages (tools slide 10): <b>NETWORK II.5</b> (computer systems), <b>OPNET</b> (communication networks, incl. wireless), <b>COMNET III</b> (communications networks), <b>SIMFACTORY</b> (manufacturing).', 'الـ packages (سلايد 10): الـ <b><bdi dir="ltr">NETWORK II.5</bdi></b> للـ computer systems، والـ <b>OPNET</b> للـ communication networks ومنها الـ wireless، والـ <b>COMNET III</b> للـ communications networks، والـ <b>SIMFACTORY</b> للتصنيع.')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('The general simulation languages (tools slides 6–8)', 'الـ general simulation languages (سلايد 6–8)')}</${H2}>
          <table className="hf-ms1-tb hf-in" dir="ltr"><thead><tr><th style=${{ width: '27%' }}>Language</th><th>Description</th><th style=${{ width: '28%' }}>World-view</th></tr></thead><tbody>${[
            ['GPSS', 'Block-structured; interpretive; FORTRAN-based (Help blocks)', 'Transactions / Facilities'],
            ['SIMSCRIPT II.5', 'English-like; compiled; complete language', 'Processes / Resources / Continuous'],
            ['MODSIM III', 'Object-oriented; modular; compiled; based on Modula2 (compiles into C)', 'Processes'],
            ['SIMULA', 'ALGOL-based; compiled', 'Processes'],
            ['SLAM', 'Block-structured; interpretive; FORTRAN-based (and extended)', 'Network / event / continuous'],
            ['CSIM', 'Process-oriented; C-based (C++ based)', 'Processes']
          ].map((r, i) => html`<tr key=${i}><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table>
          <${Hand} red=${true}>${t('MODSIM is a simulation language; MODULA is a general purpose one', 'الـ MODSIM هي الـ simulation language، والـ MODULA لغة عامة')}</${Hand}>
        `),
        page(html`
          <${Box} kind="pencil" title=${t('Which box?', 'أنهي خانة؟')}><p className="hf-p small">${X('<b>L</b> = general purpose language, <b>S</b> = general simulation language, <b>P</b> = special purpose package.', 'الحرف <b>L</b> للـ general purpose language، و<b>S</b> للـ general simulation language، و<b>P</b> للـ package.')}</p></${Box}>
          <${Sort} id="tools" bins=${[['L', t('General purpose language', 'General purpose language')], ['S', t('General simulation language', 'General simulation language')], ['P', t('Special purpose package', 'Special purpose package')]]} items=${[
            ['MODULA', 0], ['GPSS', 1], ['OPNET', 2], ['ADA', 0], ['SIMULA', 1], ['SIMFACTORY', 2], ['FORTRAN', 0], ['CSIM', 1], ['NETWORK II.5', 2]
          ].map(([n, b]) => [A ? 'الـ <bdi dir="ltr">' + n + '</bdi>' : n, b])} />
        `, { sec: t('Exercise: which box?', 'تمرين: أنهي خانة؟') }),
        page(html`
          <${Box} kind="watch" title=${t('Watch it: MODULA and ADA', 'خلّي بالك: الـ MODULA والـ ADA')}><p className="hf-p small">${X('"The Modula and ADA are two examples for general simulation language." The slides list them as <b>general purpose languages</b> (tools slide 4), so the site says <b>False</b>; the solved revision sheet marks it <b>True</b>. Go by the slides, and know both.',
            'في سلايد 4 الـ MODULA والـ ADA <b>general purpose languages</b>، فالموقع بيقول إن جملة إنهم general simulation languages <b>غلط</b>. بس الـ revision sheet المحلولة معلّماها <b>صح</b>. امشي بالسلايدز، واعرف الاتنين.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('Revision sheet, both <b>False</b>: "two alternatives" (there are <b>three</b>), and portability and no extra cost or training as <b>disadvantages</b> of general purpose languages (they are <b>advantages</b>).',
            'في الـ revision sheet دول <b>غلط</b>: إن البدائل <b>اتنين</b> (هما <b>تلاتة</b>)، وإن الـ portability وقلة التكلفة <b>عيوب</b> للـ general purpose languages (دي <b>مميزات</b>).')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('And the trick in both finals: "special-purpose simulation languages include… C++ / Visual Basic / <b>GPSS/H</b> / Fortran". Pick <b>GPSS/H</b>, the only simulation language there. ‡ On the slides GPSS is a <b>general</b> simulation language; the exam uses "special-purpose" to mean "made for simulation".',
            'وفخ الامتحانين: سؤال الـ <bdi dir="ltr">special-purpose simulation languages</bdi>، اختار الـ <bdi dir="ltr"><b>GPSS/H</b></bdi> لأنها الـ simulation language الوحيدة في الاختيارات. ‡ في السلايدز الـ GPSS <b>general</b> simulation language، والامتحان قصده إنها معمولة للـ simulation.')}</p></${Box}>
        `),

        // 58–60 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' finals (2024/25 and 2025/26). Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة (2024/25 و2025/26). دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('x1', /Step 1 for Performing/i)}
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${t('Step 1? The steps start with the problem.', 'الخطوة 1؟ الخطوات بتبدأ بالمشكلة.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('x2', /not an Application Areas/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('the slide 21 list: which one is missing?', 'ليستة سلايد 21: مين اللي مش فيها؟')}</${Hand}>
        `),
        page(html`
          ${mq('x3', /most common form of dynamic/i)}
          <${Grow} />
          <${Hand}>${t('dynamic + stochastic + discrete: the course\'s favourite leaf', 'الـ dynamic والـ stochastic والـ discrete: الورقة المفضلة في الكورس')}</${Hand}>
        `),
        page(html`
          ${mq('x4', /disadvantages of using Modelling/i)}
          <${Grow} />
          <${Hand}>${t('slide 20 has three disadvantages: training, interpretation, time and money', 'سلايد 20 فيه تلات عيوب: التدريب، والتفسير، والوقت والفلوس')}</${Hand}>
        `),
        page(html`
          ${mq('x5', /special-purpose simulation languages include/i)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Remember the Watch it! a few pages back before you tap.', 'افتكر الـ "خلّي بالك!" اللي فات قبل ما تدوس.')}</${Talk}>
        `),

        // 61–62 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'تلات طرق نقيّم بيها الـ system: الـ <b>measurements</b> والـ <b>analysis</b> (للـ simple systems بس) والـ <b>simulation</b> (وخد بالك من الـ randomness والـ GIGO).',
            'الـ <b>simulation</b> هي تقليد لشغل system حقيقي <b>على مدار الوقت</b>: تولّد artificial history وتطلّع منه inferences.',
            'مش مناسبة لما: الـ common sense يكفي، أو تتحل رياضيًا، أو التجربة أسهل، أو التكلفة أكتر من التوفير، أو مفيش وقت أو data، أو مينفعش verify/validate، أو السلوك معقد أو مش معروف.',
            'العيوب: محتاجة تدريب (زي الفن)، والنتايج صعب تفسيرها، ووقت وفلوس.',
            'الـ <b>system</b> مجموعة objects بتتفاعل لهدف؛ والـ <b>environment</b> برّه بس بيأثر؛ والحدود بتعتمد على هدف الدراسة.',
            'الـ entity والـ attribute والـ activity والـ state والـ event؛ الـ <b>endogenous جوه</b> والـ <b>exogenous برّه</b>.'
          ] : [
            'Three ways to evaluate: <b>measurements</b>, <b>analysis</b> (simple systems only), <b>simulation</b> (beware randomness and GIGO).',
            'A <b>simulation</b> imitates a real system <b>over time</b>: generate an artificial history, draw inferences from it.',
            'Not appropriate when: common sense or maths solves it, direct experiments are easier, costs exceed savings, no time or data, no verification/validation, behavior too complex or unknown.',
            'Disadvantages: needs training (an art), results hard to interpret, time and money.',
            'A <b>system</b> is objects interacting toward a purpose; the <b>environment</b> is outside but affects it; the boundary depends on the purpose of the study.',
            'Entity, attribute, activity, state, event; <b>endogenous = within</b>, <b>exogenous = environment</b>.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>discrete</b> بينط عند لحظات (البنك)، والـ <b>continuous</b> بيتغير على طول (السد، الحرارة).',
            'الـ <b>model</b> تمثيل للـ system عشان ندرسه: physical أو mathematical، والـ mathematical بيتدرس analytically أو بالـ simulation.',
            'الـ Monte Carlo هي static وstochastic، والـ discrete-event هي dynamic وstochastic وdiscrete، وبيتعملها <b>run مش solve</b>.',
            'الـ metrics: response time وthroughput وutilization لو صح؛ probability ووقت بين الـ errors لو غلط؛ مدة ووقت بين الـ events لو واقع.',
            'الـ think time بيبدأ عند <b>completes response</b>، والـ reaction بيخلص عند <b>starts execution</b>.',
            'فيه <b>12 خطوة</b> في <b>4 phases</b>؛ وأهم خطوة الـ <b>validation</b>.'
          ] : [
            '<b>Discrete</b> state jumps at instants (bank); <b>continuous</b> changes all the time (dam, temperature).',
            'A <b>model</b> represents a system to study it; physical (prototype) or mathematical (equations); a mathematical one is studied analytically or by simulation.',
            'Monte Carlo = static + stochastic; discrete-event = dynamic + stochastic + discrete, <b>run, not solved</b>.',
            'Metrics: response time, throughput, utilization (correct); probability, time between errors (incorrect); duration, time between events (down).',
            'Think time starts at <b>system completes response</b>; reaction time ends at <b>system starts execution</b>.',
            '<b>12 steps</b> in <b>4 phases</b>; the most crucial step is <b>validation</b>.'
          ]} />
        `),

        // the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="clock">${t('Next time: you run a simulation by hand, table and all. I\'ll keep the time.', 'المرة الجاية: هتعمل simulation بإيدك، بالجدول وكل حاجة. وأنا هظبط الوقت.')}</${Talk}>
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

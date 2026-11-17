// Head First chapter for Human Computer Interaction Lecture 7 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Interviews and starting design (last year's slides): interviews as the most common research technique (deeper understanding,
// the 6 Ws, follow-ups, rare events; fewer users; more expensive: synchronous and incentives; surveys and interviews in sequence in
// either order), tips for a good interview (plan ahead; listen well and take notes; leave time between interviews), interviewing
// individuals vs groups (the notes' table), the challenges of data gathered by asking questions (planning, qualitative analysis,
// recall bias, reporting bias, and the solution: combine with participant observation, usability studies and secondary research),
// and "Design: can I?" (Klemmer, Joyner, "we are not artists", keep creativity on).
// Every fact comes from the lecture's notes; the example questions, scenarios and analogies are our own and are labelled as such.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T7 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci7')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci7';
    s.textContent = `
.hfb .hf-hci7-ws{ display:grid; grid-template-columns:minmax(0,1fr); gap:5px; }
.hfb .hf-hci7-ws > div{ display:grid; grid-template-columns:62px minmax(0,1fr); gap:8px; align-items:center; padding-bottom:4px; border-bottom:1px dotted var(--faint); }
.hfb .hf-hci7-ws > div:last-child{ border-bottom:0; }
.hfb .hf-hci7-ws .w{ display:grid; place-items:center; height:28px; border-radius:6px; background:var(--hf-k); color:var(--paper); font:800 14px/1 var(--body); }
.hfb .hf-hci7-ws .w.y{ background:var(--hf-red); }
.hfb .hf-hci7-ws .e{ font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-hci7-tbl{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci7-col{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 8px; background:var(--paper); display:flex; flex-direction:column; gap:5px; }
.hfb .hf-hci7-col h5{ margin:0 0 2px; font:800 14px/1.1 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--hf-k); }
.hfb .hf-hci7-col p{ margin:0; font-size:14px; line-height:1.28; color:var(--ink); padding:4px 6px; border-radius:5px; background:var(--hf-grey); border-left:3px solid var(--hf-k); }
.hfb .hf-hci7-col p.bad{ border-left-color:var(--hf-red); }
.hfb .hf-hci7-ppl{ display:flex; justify-content:center; align-items:flex-end; gap:4px; height:34px; }
.hfb .hf-hci7-ppl i{ display:block; width:13px; height:22px; border-radius:7px 7px 2px 2px; background:var(--hf-k); opacity:.75; }
.hfb .hf-hci7-ppl i.me{ height:27px; background:var(--hf-line); opacity:1; margin-right:6px; }
.hfb .hf-hci7-q{ border-left:4px solid var(--hf-k); padding:6px 10px; background:var(--hf-grey); }
.hfb .hf-hci7-q p{ margin:0; font:italic 15px/1.35 var(--display); color:var(--ink); }
.hfb .hf-hci7-q .by{ display:block; margin-top:3px; font:700 13px/1 var(--body); font-style:normal; color:var(--graphite); text-transform:uppercase; letter-spacing:.05em; }
.hfb .hf-hci7-co{ border:2px solid var(--hf-line); border-radius:8px; padding:9px; display:grid; grid-template-columns:minmax(0,1fr); gap:8px; }
.hfb .hf-hci7-tabs{ display:flex; gap:5px; }
.hfb .hf-hci7-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13.5px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hci7-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hci7-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-hci7-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-hci7-ask{ font-size:14.5px; line-height:1.36; margin:0; color:var(--ink); min-height:78px; }
.hfb .hf-hci7-opts{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-hci7-opts button{ font:600 13.5px/1.2 var(--body); min-height:38px; padding:4px 6px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci7-opts button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.hfb .hf-hci7-opts button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-hci7-fb{ min-height:76px; }
.hfb .hf-hci7-bad{ font-size:14px; line-height:1.34; margin:0; color:var(--hf-red); }
.hfb .hf-hci7-ok{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); padding:6px 9px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-hci7-hint{ font-size:14px; line-height:1.3; margin:0; color:var(--graphite); }
.hfb .hf-hci7-flow{ display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:wrap; }
.hfb .hf-hci7-flow span{ font:700 14px/1.1 var(--body); padding:6px 9px; border:1.5px solid var(--hf-line); border-radius:7px; background:var(--paper); color:var(--ink); }
.hfb .hf-hci7-flow span.k{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-hci7-flow i{ font-style:normal; font:700 13.5px/1 var(--body); color:var(--hf-k); white-space:nowrap; }
.hf-ar .hf-hci7-flow i{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-hci7-ws .e, .hf-ar .hf-hci7-col p, .hf-ar .hf-hci7-ask, .hf-ar .hf-hci7-bad, .hf-ar .hf-hci7-ok, .hf-ar .hf-hci7-hint, .hf-ar .hf-hci7-q p{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; font-style:normal; }
.hf-ar .hf-hci7-col p, .hf-ar .hf-hci7-ask, .hf-ar .hf-hci7-bad, .hf-ar .hf-hci7-ok, .hf-ar .hf-hci7-hint, .hf-ar .hf-hci7-ws .e{ font-size:13.5px; }
.hf-ar .hf-hci7-col h5, .hf-ar .hf-hci7-tabs button, .hf-ar .hf-hci7-opts button, .hf-ar .hf-hci7-q .by, .hf-ar .hf-hci7-flow span{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-hci7-col p{ border-left:0; border-right:3px solid var(--hf-k); }
.hf-ar .hf-hci7-col p.bad{ border-right-color:var(--hf-red); }
.hf-ar .hf-hci7-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-hci7-q{ border-left:0; border-right:4px solid var(--hf-k); }
.hf-ar .hf-hci7-ppl i.me{ margin-right:0; margin-left:6px; }
`;
    document.head.appendChild(s);
  }

  // Joyner's 6 Ws, each with one example interview question of our own (a course-registration app; the students are the users)
  const WS = [
    ['who', 'Who do you ask for help when registration goes wrong?', 'مين اللي بتلجأله لما التسجيل يبوظ؟'],
    ['what', 'What is the first thing you do when registration opens?', 'إيه أول حاجة بتعملها لما التسجيل يفتح؟'],
    ['where', 'Where are you when you register: at home, on campus, on your phone?', 'بتسجّل وإنت فين: في البيت ولا في الكلية ولا من الموبايل؟'],
    ['when', 'When did registration last go badly for you? What happened?', 'آخر مرة التسجيل باظ معاك كانت إمتى؟ وحصل إيه؟'],
    ['why', 'Why did you give up on the website that day?', 'ليه سيبت الـ website في اليوم ده؟'],
    ['how', 'How do you choose which sections to take?', 'بتختار الـ sections اللي هتاخدها إزاي؟']
  ];
  function SixWs() {
    const ar = useAr();
    return html`<div className="hf-hci7-ws hf-in">${WS.map((w, j) => html`<div key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.08 + 's' }}>
      <span className=${'w' + (w[0] === 'why' ? ' y' : '')} dir="ltr">${w[0]}</span><span className="e">${ar ? w[2] : w[1]}</span></div>`)}</div>`;
  }

  // the notes' table: interviewing individuals vs groups (Arabic as the site's figure words it)
  const IND = [['More time/effort spent with each participant', 'وقت ومجهود أكتر مع كل participant'], ['Easier to coordinate the logistics', 'تنسيق الـ logistics أسهل'], ['More privacy for participants', 'فيه privacy أكتر للـ participants']];
  const GRP = [['Easier to get more feedback', 'أسهل تاخد feedback أكتر'], ["Participants' discussion can highlight assumptions", 'النقاش بين الـ participants ممكن يبيّن الـ assumptions'], ['May need to deal with confounding personalities', 'ممكن تحتاج تتعامل مع confounding personalities', 1], ['"Presentation of self" issues', 'مشاكل الـ <bdi dir="ltr">"presentation of self"</bdi>', 1]];
  function IGTable() {
    const ar = useAr();
    const col = (h, n, list) => html`<div className="hf-hci7-col">
      <h5>${h}</h5>
      <div className="hf-hci7-ppl" aria-hidden="true"><i className="me"></i>${Array.from({ length: n }, (_, j) => html`<i key=${j}></i>`)}</div>
      ${list.map((r, j) => html`<p key=${j} className=${r[2] ? 'bad' : ''}>${T7(ar ? r[1] : r[0])}</p>`)}</div>`;
    return html`<div className="hf-hci7-tbl hf-in">${col(ar ? 'أفراد' : 'Individuals', 1, IND)}${col(ar ? 'الـ Groups' : 'Groups', 4, GRP)}</div>`;
  }

  // Be the interview coach: our own scenarios; each breaks exactly one of the lecture's tips
  const TIPS = [['Plan ahead', 'خطط من بدري'], ['Listen well', 'اسمع كويس'], ['Take notes', 'اكتب notes'], ['Leave time between', 'سيب وقت بينهم']];
  const CO = [
    { en: 'Ten minutes before the interview, the interviewer still has not written a single question. "We\'ll just chat."',
      ar: 'فاضل عشر دقايق على الـ interview، واللي هيعمله لسه ماكتبش ولا سؤال. "هندردش وخلاص."', a: 0,
      ok: ['Plan ahead and prepare the questions <b>before</b> the interview.', 'خطط من بدري وجهّز الأسئلة <b>قبل</b> الـ interview.'],
      no: ['Look at what is missing before anyone even sits down.', 'بص على الحاجة الناقصة قبل ما حد يقعد أصلاً.'] },
    { en: 'The interviewer spends most of the hour explaining how great the new app is. The user nods.',
      ar: 'اللي بيعمل الـ interview قضّى أغلب الساعة بيشرح الـ app الجديد حلو إزاي، والـ user بيهز راسه.', a: 1,
      ok: ['Listen well: the <b>user</b> should talk most of the time.', 'اسمع كويس: الـ <b>user</b> هو اللي المفروض يتكلم أغلب الوقت.'],
      no: ['Who is doing the talking here?', 'مين اللي بيتكلم هنا؟'] },
    { en: 'The team records the audio and writes nothing down. Later, nobody remembers that the user frowned at the checkout screen.',
      ar: 'الفريق سجّل الـ audio وماكتبش أي حاجة. وبعدين محدش فاكر إن الـ user كشّر قدام شاشة الدفع.', a: 2,
      ok: ['Take notes: an audio recording is not enough, and you note <b>emotions and reactions</b> too.', 'اكتب notes: الـ audio recording مش كفاية، وبتكتب كمان <b>المشاعر وردود الفعل</b>.'],
      no: ['What did the recording fail to keep?', 'إيه اللي التسجيل ماعرفش يحتفظ بيه؟'] },
    { en: 'Six interviews are booked back to back, from 9 to 3, with no break between them.',
      ar: 'فيه ست interviews ورا بعض من 9 لـ 3، من غير ولا break بينهم.', a: 3,
      ok: ['Leave some time between interviews.', 'سيب شوية وقت بين الـ interviews.'],
      no: ['Look at the schedule, not at the questions.', 'بص على المواعيد، مش على الأسئلة.'] },
    { en: 'The user starts describing a clever workaround, and the interviewer cuts in with the next question on the list.',
      ar: 'الـ user بدأ يحكي عن طريقة ذكية بيلف بيها على المشكلة، واللي بيعمل الـ interview قاطعه بالسؤال اللي بعده في اللستة.', a: 1,
      ok: ['Listen well: let the user talk. (Ours: that workaround was exactly what a follow-up question is for.)', 'اسمع كويس: سيب الـ user يتكلم. (من عندنا: الطريقة دي بالظبط هي اللي الـ follow-up question معمول عشانها.)'],
      no: ['The questions were prepared. What went wrong in the room?', 'الأسئلة كانت متجهزة. إيه اللي باظ جوه الأوضة؟'] },
    { en: 'One person asks and one writes, but the note-taker writes only the words, not that the user laughed nervously at the settings page.',
      ar: 'واحد بيسأل وواحد بيكتب، بس اللي بيكتب بيسجّل الكلام بس، مش إن الـ user ضحك بتوتر قدام صفحة الـ settings.', a: 2,
      ok: ['Take notes, including the user\'s <b>emotions and reactions</b>.', 'اكتب notes، ومعاها <b>المشاعر وردود الفعل</b> بتاعة الـ user.'],
      no: ['Something is missing from the notes.', 'فيه حاجة ناقصة من الـ notes.'] }
  ];
  function Coach({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [picks, setPicks] = H.K.useSlot(id + ':p', {});
    const P = CO[k], p = picks[k];
    const done = j => picks[j] === CO[j].a;
    const n = CO.filter((_, j) => done(j)).length;
    const pick = j => setPicks(Object.assign({}, picks, { [k]: j }));
    return html`<div className="hf-hci7-co hf-in">
      <div className="hf-hci7-tabs" dir="ltr" role="group" aria-label=${ar ? 'المواقف' : 'Scenes'}>${CO.map((_, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${done(j) ? 'dn' : ''} onClick=${() => setK(j)}>${j + 1}${done(j) ? ' ✓' : ''}</button>`)}</div>
      <p className="hf-hci7-ask" key=${'q' + k}>${T7(ar ? P.ar : P.en)}</p>
      <div className="hf-hci7-opts">${TIPS.map((tp, j) => html`<button key=${k + '-' + j} className=${p === j ? (j === P.a ? 'ok' : 'no') : ''} aria-pressed=${String(p === j)} onClick=${() => pick(j)}>${ar ? tp[1] : tp[0]}</button>`)}</div>
      <div className="hf-hci7-fb">
        ${p == null && html`<p className="hf-hci7-hint">${ar ? 'أنهي نصيحة اتكسرت؟ اختار واحدة.' : 'Which tip is broken? Pick one.'}</p>`}
        ${p != null && p !== P.a && html`<p className="hf-hci7-bad hf-in">${T7(ar ? 'مش دي. ' + P.no[1] : 'Not that one. ' + P.no[0])}</p>`}
        ${p === P.a && html`<p className="hf-hci7-ok hf-in">${T7(ar ? P.ok[1] : P.ok[0])}</p>`}
      </div>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => pick(P.a)}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${k < CO.length - 1 && html`<button className="hf-btn solid" onClick=${() => setK(k + 1)}>${ar ? 'الموقف اللي بعده' : 'Next scene'}</button>`}
        <span className="hf-score">${ar ? html`<bdi dir="ltr">${n} / ${CO.length}</bdi>` : n + ' / ' + CO.length}</span>
      </div>
    </div>`;
  }

  H.chapters.hci[7] = {
    title: 'Interviews and Starting Design', kicker: 'Chapter 7', run: 'interviews and starting design',
    ar: { title: 'الـ Interviews وبداية الـ Design', kicker: 'الفصل 7', run: 'الـ interviews وبداية الـ design' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 7);
      const arL = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[7]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src): this lecture has three
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      // the site's own practice questions (no src), from the quiz and the extra list
      const find = re => {
        let i = lec.quiz.findIndex(x => !x.src && re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: arQuiz[i] };
        i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: arExtra[i] };
      };
      const pq = (id, re) => { const r = find(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · before we start (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter you learned to write survey questions that are <b>clear, concise, specific, expressive, unbiased and usable</b>. A survey is research method number 1. This chapter is method number 2: <b>the interview</b>. Then we take the first step into <b>design</b>.',
            'الفصل اللي فات اتعلمت تكتب أسئلة survey تبقى <b>clear و concise و specific و expressive و unbiased و usable</b>. الـ survey هو الـ research method رقم 1، والفصل ده عن رقم 2: <b>الـ interview</b>. وبعدين ناخد أول خطوة في الـ <b>design</b>.')}</${P}>
          <${Hand} red=${true}>${t("Lectures 7 to 10 come from last year's slides.", 'المحاضرات من 7 لـ 10 من سلايدز السنة اللي فاتت.')}</${Hand}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises</b> on the page: match, sort, and coach a bad interview.', '<b>حل التمارين</b> على الصفحة: توصيل وتصنيف، وكمان هتدرّب interviewer بيغلط.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, from the doctors' papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes, questions and scenes marked "ours" are our own examples, not the slides\'.', 'الملاحظات والأسئلة والمواقف اللي عليها "من عندنا" دي أمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('500 users answered your survey: 70% say the app is "hard to use". What can you learn by sitting with <b>one</b> of them for an hour that the 500 answers can\'t tell you?',
            'فيه 500 user جاوبوا الـ survey بتاعك، و70% منهم قالوا الـ app "صعب في الاستخدام". إيه اللي ممكن تعرفه لو قعدت ساعة مع <b>واحد</b> بس منهم، والـ 500 إجابة مش هيقولوهولك؟')}</p></${Box}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">7</span><span className="t">${A ? html`الفصل السابع<br/>Human Computer Interaction` : html`Chapter seven<br/>Human Computer Interaction`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Just Ask Them. Properly.', 'اسألهم. بس صح.')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('interviews and starting design', 'الـ interviews وبداية الـ design')}</p></div>
          <${P}>${X('The survey told you <b>what</b> users think. It can\'t ask "why?" twice, and it can\'t lean in when someone says something surprising.',
            'الـ survey قالّك الـ users بيفكروا في <b>إيه</b>. بس مايقدرش يسأل "ليه؟" مرتين، ومايقدرش يركّز أكتر لما حد يقول حاجة غريبة.')}</${P}>
          <${Talk} who="dev">${t('So I just sit down with a user and chat?', 'يعني أقعد مع user وندردش وخلاص؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('You sit down <b>prepared</b>, you <b>listen</b> more than you talk, and someone <b>takes notes</b>. Then you watch out for two biases.',
            'تقعد وإنت <b>مجهّز</b>، و<b>تسمع</b> أكتر ما تتكلم، وحد <b>يكتب notes</b>. وبعدين تاخد بالك من اتنين biases.')}</${Talk}>
          <${P} small=${true}>${X('Today: <b>interviews</b> vs surveys, the <b>tips</b> for a good interview, <b>individuals vs groups</b>, the <b>challenges</b> of asking questions, and the big question: <b>can I design?</b>',
            'النهارده: الـ <b>interviews</b> قصاد الـ surveys، و<b>نصايح</b> الـ interview الكويس، والـ <b>أفراد قصاد الـ groups</b>، و<b>تحديات</b> الأسئلة، والسؤال الكبير: <b>أقدر أعمل design؟</b>')}</${P}>
        `, { sec: t('Meet the interview', 'اتعرّف على الـ interview') }),

        // 2 · interviews: the most common technique
        page(html`
          <${H1}>${t('Research method no. 2', 'الـ research method رقم 2')}</${H1}>
          <${Def}>${X('The <b>interview</b> is the <b>most common</b> research technique.', 'الـ <b>interview</b> هو الـ research technique <b>الأكتر انتشاراً</b>.')}</${Def}>
          <${P}>${X('Why is it so popular? It gives a <b>deeper, more thorough understanding</b> of users:', 'ليه منتشر كده؟ لأنه بيدّي <b>فهم أعمق وأشمل</b> للـ users:')}</${P}>
          <${UL} items=${A ? [
            'أسئلة <b>مفتوحة</b> وأسئلة <b>"ليه"</b> أكتر (وJoyner بيقول ركّز على الـ <b>6 Ws</b>).',
            'فيه <b>مساحة لـ follow-up questions</b>: تقدر تسأل عن الإجابة نفسها.',
            'الـ user بيقدر <b>يفكّر في الأحداث النادرة</b>.'
          ] : [
            'More <b>open-ended</b> and <b>"why"</b> questions (Joyner: focus on the <b>6 Ws</b>).',
            '<b>Room for follow-up questions</b>: you can ask about the answer itself.',
            '<b>Reflection on rare events.</b>'
          ]} />
          <${Hand} tilt=${true} arrow="up">${t('ours: a rare event = "the one time the app crashed during payment". A survey rarely asks about it.', 'من عندنا: الحدث النادر زي "المرة اللي الـ app وقع فيها وأنا بدفع". والـ survey نادراً لما يسأل عنه.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Interview is the most common research technique." <b>True.</b> Not the survey: the interview.', 'الجملة دي <b>صح</b>، والمقصود الـ interview مش الـ survey:<span class="ltr">"Interview is the most common research technique."</span>')}</p></${Box}>
        `, { sec: t('Interviews', 'الـ Interviews') }),

        // 3 · the 6 Ws
        page(html`
          <${H2}>${t("Joyner's 6 Ws", 'الـ 6 Ws بتوع Joyner')}</${H2}>
          <${P} small=${true}>${X('Joyner says an interview should focus on six question words. One example question each, ours, for a course-registration app:',
            'بيقول Joyner إن الـ interview يركّز على ست كلمات أسئلة. وده سؤال مثال على كل واحدة، من عندنا، لـ app تسجيل المواد:')}</${P}>
          <${SixWs} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>How</b> is one of the 6 Ws even though it doesn\'t start with W. <b>Which</b> is not one of them: who, what, where, when, why, how.',
            'الـ <b>how</b> واحدة من الـ 6 Ws مع إنها مش بتبدأ بـ W، والـ <b>which</b> مش منهم. اللستة هي:<span class="ltr">who, what, where, when, why, how</span>')}</p></${Box}>
        `),

        // 4 · match: which W?
        page(html`
          <${Box} kind="pencil" title=${t('Which W is it?', 'أنهي W دي؟')}><p className="hf-p small">${t('Our own questions for a gym app. Tap a W, then the question that uses it.', 'أسئلة من عندنا لـ app جيم. دوس على الـ W، وبعدين على السؤال اللي بيستخدمها.')}</p></${Box}>
          <${Match} id="ws" left=${['who', 'what', 'where', 'when', 'why', 'how']}
            right=${A ? ['بتسجّل الـ set إزاي وإنت شايل الأوزان؟', 'آخر مرة فوّت تمرين كانت إمتى؟', 'ليه بطّلت تستخدم الـ tracker القديم؟', 'بتتمرن مع مين عادةً؟', 'بتفتح الـ app فين: في البيت ولا في الجيم؟', 'بتبص على إيه في الـ app قبل التمرين؟']
              : ['How do you log a set while holding the weights?', 'When did you last skip a workout?', 'Why did you stop using the old tracker?', 'Who do you usually train with?', 'Where do you open the app: at home or at the gym?', 'What do you check on the app before a workout?']}
            answer=${[3, 5, 4, 1, 2, 0]} />
        `, { sec: t('Exercise: which W?', 'تمرين: أنهي W؟') }),

        // 5 · the price of depth
        page(html`
          <${H2}>${t('Depth has a price', 'العمق ليه تمن')}</${H2}>
          <${P}>${X('<b>Far fewer users</b> can be interviewed than surveyed. And each interview is <b>more expensive</b>, for two reasons:',
            'عدد الـ users اللي تقدر تعملهم interview <b>أقل بكتير</b> من اللي تعملهم survey. وكل interview <b>أغلى</b>، لسببين:')}</${P}>
          <${Def}>${X('<b>1. Synchronous.</b> The interviewer devotes time to each interviewee: you are both there at the same time.<br/><b>2. Incentives.</b> Interviewees often expect compensation.',
            '<b>1. الـ synchronous.</b> اللي بيعمل الـ interview بيدّي وقت لكل شخص، وإنتوا الاتنين موجودين في نفس الوقت.<br/><b>2. الـ incentives.</b> اللي بيتعملهم interview غالباً مستنيين مقابل.')}</${Def}>
          <${Talk} who="dev">${t('So 20 interviews = 20 hours of my time, plus 20 gifts? (ours)', 'يعني 20 interview يبقوا 20 ساعة من وقتي، و20 هدية؟ (من عندنا)')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Why more expensive? <b>Synchronous + incentives.</b> Not special software, not "must be online", not "they collect numbers".',
            'ليه أغلى؟ <b>الـ synchronous والـ incentives.</b> مش special software، ولا "لازم online"، ولا "بتجمع أرقام".')}</p></${Box}>
        `),

        // 6 · in sequence, either order
        page(html`
          <${H2}>${t('Better together, in either order', 'مع بعض أحسن، وبأي ترتيب')}</${H2}>
          <${P}>${X('You don\'t have to choose. Interviews and surveys can be done <b>in sequence in either order</b>, using the results of one to plan the other.',
            'مش لازم تختار. الـ interviews والـ surveys ممكن يتعملوا <b>ورا بعض بأي ترتيب</b>، وتستخدم نتايج واحد عشان تخطط للتاني.')}</${P}>
          <div className="hf-hci7-flow hf-in" dir=${A ? 'rtl' : 'ltr'}><span className="k">${t('Survey', 'الـ Survey')}</span><i>${A ? 'نتايجه بتخطط ←' : 'results plan →'}</i><span className="k">${t('Interviews', 'الـ Interviews')}</span></div>
          <div className="hf-hci7-flow hf-in" dir=${A ? 'rtl' : 'ltr'}><span className="k">${t('Interviews', 'الـ Interviews')}</span><i>${A ? 'نتايجها بتخطط ←' : 'results plan →'}</i><span className="k">${t('Survey', 'الـ Survey')}</span></div>
          <${Hand} tilt=${true}>${t('ours: the survey finds the 70% who struggle; interviews ask them why. Or: interviews find the questions worth asking 500 people.', 'من عندنا: الـ survey يلاقي الـ 70% اللي بيتعبوا، والـ interviews تسألهم ليه. أو العكس: الـ interviews تلاقي الأسئلة اللي تستاهل تتسأل لـ 500 واحد.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Remember the 500 survey answers from the first page? Which order would you use there, and what would you ask in the interviews?',
            'فاكر الـ 500 إجابة بتوع الـ survey في أول صفحة؟ هتستخدم أنهي ترتيب هناك، وهتسأل إيه في الـ interviews؟')}</p></${Box}>
        `),

        // 7 · figure: interview vs survey
        page(html`
          <${H2}>${t('Interview or survey: depth, reach, cost', 'الـ Interview ولا الـ survey: العمق والانتشار والتكلفة')}</${H2}>
          <${Fig} name="hc-interview-vs-survey" />
        `),

        // 8 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: the Interview and the Survey argue over who understands users better.', 'قعدة الليلة: الـ Interview والـ Survey بيتخانقوا مين فيهم فاهم الـ users أكتر.')} />
          <${Chat} names=${[t('Interview', 'الـ Interview'), t('Survey', 'الـ Survey')]} lines=${A ? [
            [0, 'أنا الـ research technique <b>الأكتر انتشاراً</b>. اسأل أي حد.'],
            [1, 'وأنا بوصل لـ users <b>أكتر بكتير</b> منك، بسرعة وبرخص.'],
            [0, 'بس إنت مش بتقدر تسأل "ليه؟". أنا عندي أسئلة <b>"why"</b> ومساحة لـ <b>follow-up</b>، والناس بتحكيلي عن <b>الأحداث النادرة</b>.'],
            [1, 'وإنت <b>synchronous</b>: لازم حد يقعد مع كل واحد. وكمان الناس <b>مستنية incentives</b> منك.'],
            [0, 'العمق ليه تمن. وعموماً، الـ data اللي بتيجي بالأسئلة عندنا فيها نفس المشكلة.'],
            [1, 'قصدك الـ <b>recall bias</b> والـ <b>reporting bias</b>؟ آه، دي مشكلتنا إحنا الاتنين.'],
            [0, 'يبقى نشتغل مع بعض؟ واحد فينا يخطط للتاني، <b>بأي ترتيب</b>.']
          ] : [
            [0, "I'm the <b>most common</b> research technique. Ask anyone."],
            [1, 'And I reach <b>far more users</b> than you, quickly and cheaply.'],
            [0, 'But you can\'t ask "why?". I have <b>"why" questions</b>, room for <b>follow-ups</b>, and people tell me about <b>rare events</b>.'],
            [1, "And you're <b>synchronous</b>: someone has to sit with every single person. And they <b>expect incentives</b>."],
            [0, 'Depth has a price. Anyway, we both gather data by asking questions, so we share the same problem.'],
            [1, 'You mean <b>recall bias</b> and <b>reporting bias</b>? Yes, those are ours, both of us.'],
            [0, 'So we work together? One of us plans the other, <b>in either order</b>.']
          ]} />
        `),

        // 9 · sort: interview or survey?
        page(html`
          <${Box} kind="pencil" title=${t('Interview or survey?', 'الـ Interview ولا الـ survey؟')}><p className="hf-p small">${X('Which method does each line describe? <b>I</b> = interview, <b>S</b> = survey.', 'كل سطر بيوصف أنهي method؟ الـ <b>I</b> يعني interview، والـ <b>S</b> يعني survey.')}</p></${Box}>
          <${Sort} id="ivs" bins=${[['I', t('Interview', 'الـ Interview')], ['S', t('Survey', 'الـ Survey')]]} items=${A ? [
            ['بيوصل لـ users أكتر بكتير', 1],
            ['فيه مساحة لـ follow-up questions', 0],
            ['الـ synchronous: وقت لكل شخص', 0],
            ['الناس غالباً مستنية incentives', 0],
            ['أرخص وأسرع لكل user', 1],
            ['الـ research technique الأكتر انتشاراً', 0],
            ['بيخلّي الـ user يفكر في الأحداث النادرة', 0],
            ['نظرة عامة واسعة، بس عمق أقل', 1]
          ] : [
            ['Reaches far more users', 1],
            ['Room for follow-up questions', 0],
            ['Synchronous: time devoted to each person', 0],
            ['People often expect incentives', 0],
            ['Cheaper and quicker per user', 1],
            ['The most common research technique', 0],
            ['Reflection on rare events', 0],
            ['A broad view, but less depth', 1]
          ]} />
        `, { sec: t('Exercise: interview or survey?', 'تمرين: الـ interview ولا الـ survey؟') }),

        // 10 · tips for a good interview
        page(html`
          <${H1}>${t('How to run a good interview', 'إزاي تعمل interview كويس')}</${H1}>
          <${P} small=${true}>${t('The lecture gives tips for three moments: before, during, and between interviews.', 'المحاضرة بتدّي نصايح لتلات أوقات: قبل الـ interview، وأثناءه، وبين الـ interviews.')}</${P}>
          <${Def}>${X('<b>Before:</b> <b>plan ahead</b> and prepare questions before the interview.', '<b>قبله:</b> <b>خطط من بدري</b> وجهّز الأسئلة قبل الـ interview.')}</${Def}>
          <${Def}>${X('<b>During:</b> two keys.<br/>• <b>Listen well</b>: the user should talk most of the time.<br/>• <b>Take notes</b>: one person asks and one takes notes; audio recording is not enough; note emotions and reactions.',
            '<b>أثناءه:</b> فيه مفتاحين.<br/>• <b>اسمع كويس</b>: الـ user هو اللي المفروض يتكلم أغلب الوقت.<br/>• <b>اكتب notes</b>: واحد يسأل وواحد يكتب، والـ audio recording مش كفاية، واكتب المشاعر وردود الفعل.')}</${Def}>
          <${Def}>${X('<b>Between:</b> <b>leave some time between interviews.</b>', '<b>بينهم:</b> <b>سيب شوية وقت بين الـ interviews.</b>')}</${Def}>
        `, { sec: t('Tips for a good interview', 'نصايح الـ interview الكويس') }),

        // 11 · the two keys
        page(html`
          <${H2}>${t('The two keys, up close', 'المفتاحين عن قرب')}</${H2}>
          <${Talk} who="dev">${t("Why can't I just record it and listen later?", 'ليه ماسجّلش وأسمع بعدين وخلاص؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Because the lecture says <b>audio is not enough</b>. A recording keeps the words, not the frown, the sigh or the nervous laugh. You note <b>emotions and reactions</b>.',
            'لأن المحاضرة بتقول الـ <b>audio مش كفاية</b>. التسجيل بيحفظ الكلام، مش التكشيرة ولا التنهيدة ولا الضحكة المتوترة. لازم تكتب <b>المشاعر وردود الفعل</b>.')}</${Talk}>
          <${Hand} tilt=${true}>${t('one person asks, one takes notes; the asker mostly listens', 'واحد يسأل وواحد يكتب، واللي بيسأل أغلب وقته بيسمع')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Exam: "Tips for a good interview" with (a) Listen well, (b) Don\'t leave some time..., (c) Take notes, (d) a &amp; c. Answer: <b>d</b>, both keys. (b) is the real tip upside down.',
            'في الامتحان، الإجابة الصح لنصايح الـ interview هي <bdi dir="ltr">(d)</bdi>، يعني المفتاحين مع بعض:<span class="ltr">d) a &amp; c</span>واختيار <bdi dir="ltr">(b)</bdi> ده النصيحة بالمقلوب:<span class="ltr">b) Don\'t leave some time between interviews</span>')}</p></${Box}>
        `),

        // 12 · figure: a good interview
        page(html`
          <${H2}>${t('A good interview, step by step', 'الـ interview الكويس خطوة بخطوة')}</${H2}>
          <${Fig} name="hc-good-interview" />
        `),

        // 13 · interview with the note-taker
        page(html`
          <${Interview} title=${t('The Note-taker, exposed', 'الـ Note-taker على المكشوف')} sub=${t("This week's interview: the quiet one in the corner.", 'حوار الأسبوع: الهادي اللي قاعد في الركن.')} lines=${A ? [
            ['المذيع', 'إنت مابتسألش ولا سؤال. إنت بتعمل إيه هنا أصلاً؟'],
            ['الـ Note-taker', 'المحاضرة بتقول <b>واحد يسأل وواحد يكتب</b>. أنا الواحد التاني.'],
            ['المذيع', 'ما الموبايل بيسجّل الصوت.'],
            ['الـ Note-taker', 'والـ <b>audio recording مش كفاية</b>. أنا بكتب <b>المشاعر وردود الفعل</b>: التوتر، والسكوت، والضحكة.'],
            ['المذيع', 'وزميلك اللي بيسأل؟'],
            ['الـ Note-taker', 'شغلته إنه <b>يسمع كويس</b>. الـ user هو اللي يتكلم أغلب الوقت.'],
            ['المذيع', 'وبعد ما الـ user يمشي؟'],
            ['الـ Note-taker', 'المحاضرة بتقول <b>سيب شوية وقت بين الـ interviews</b>. (من عندنا: وقت أرتّب فيه الـ notes وأنا لسه فاكر.)']
          ] : [
            ['Head First', "You don't ask a single question. What are you even doing here?"],
            ['Note-taker', 'The lecture says <b>one person asks and one takes notes</b>. I\'m the one.'],
            ['Head First', 'The phone records the audio.'],
            ['Note-taker', 'And <b>audio recording is not enough</b>. I note <b>emotions and reactions</b>: the hesitation, the silence, the laugh.'],
            ['Head First', 'And your partner who asks?'],
            ['Note-taker', 'Their job is to <b>listen well</b>. The user talks most of the time.'],
            ['Head First', 'And after the user leaves?'],
            ['Note-taker', 'The lecture says <b>leave some time between interviews</b>. (Ours: time to tidy my notes while I still remember.)']
          ]} />
        `),

        // 14 · be the interview coach
        page(html`
          <${Box} kind="pencil" title=${t('Be the interview coach', 'خليك إنت المدرّب')}><p className="hf-p small">${t('Six scenes from bad interviews (ours). Each one breaks one of the lecture\'s tips. Which?', 'ست مواقف من interviews وحشة (من عندنا). كل موقف بيكسر نصيحة من نصايح المحاضرة. أنهي واحدة؟')}</p></${Box}>
          <${Coach} id="co" />
        `, { sec: t('Exercise: be the coach', 'تمرين: خليك المدرّب') }),

        // 15 · individuals vs groups
        page(html`
          <${H1}>${t('One at a time, or all at once?', 'واحد واحد، ولا كلهم مرة واحدة؟')}</${H1}>
          <${P} small=${true}>${t("The lecture's table:", 'ده جدول المحاضرة:')}</${P}>
          <${IGTable} />
          <${Hand} red=${true}>${t('red = what you may have to deal with', 'الأحمر = اللي ممكن تضطر تتعامل معاه')}</${Hand}>
        `, { sec: t('Individuals vs groups', 'أفراد قصاد groups') }),

        // 16 · groups up close
        page(html`
          <${H2}>${t('What happens in a group', 'إيه اللي بيحصل في الـ group')}</${H2}>
          <${P}>${X('A group gives you <b>more feedback</b> in one sitting, and when participants discuss, their talk can <b>highlight assumptions</b>.',
            'الـ group بيدّيك <b>feedback أكتر</b> في قعدة واحدة، ولما الـ participants يتناقشوا، كلامهم ممكن <b>يبيّن الـ assumptions</b>.')}</${P}>
          <${Hand} tilt=${true}>${t('ours: one says "everyone uses the search bar", another says "I never noticed it". There\'s an assumption, exposed.', 'من عندنا: واحد يقول "كله بيستخدم الـ search bar"، والتاني يقول "أنا عمري ما خدت بالي منه". أهو assumption اتكشف.')}</${Hand}>
          <${P}>${X('But you may need to deal with <b>confounding personalities</b> and <b>"presentation of self"</b> issues.', 'بس ممكن تحتاج تتعامل مع <b>confounding personalities</b> ومع مشاكل الـ <b><bdi dir="ltr">"presentation of self"</bdi></b>.')}</${P}>
          <${Hand} tilt=${true}>${X('ours: a loud member steers everyone (confounding personality); people say what makes them look good in front of the others (presentation of self).', 'من عندنا: عضو صوته عالي بيسحب الكل وراه، ودي <bdi dir="ltr">confounding personality</bdi>. والناس بتقول اللي يخليهم يبانوا كويسين قدام الباقيين، ودي <bdi dir="ltr">presentation of self</bdi>.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Easier" is on both sides! Individuals: <b>easier to coordinate the logistics</b>. Groups: <b>easier to get more feedback</b>. Don\'t swap them.',
            'كلمة "أسهل" في الناحيتين! الأفراد: <b>تنسيق الـ logistics أسهل</b>. والـ groups: <b>أسهل تاخد feedback أكتر</b>. ماتبدّلهمش.')}</p></${Box}>
        `),

        // 17 · figure: individuals vs groups
        page(html`
          <${H2}>${t('Individuals or groups: what each gives you', 'أفراد ولا groups: كل واحد بيدّيك إيه')}</${H2}>
          <${Fig} name="hc-indiv-group" />
        `),

        // 18 · sort: individuals or groups
        page(html`
          <${Box} kind="pencil" title=${t('Individuals or groups?', 'أفراد ولا groups؟')}><p className="hf-p small">${t('Which kind of interview does each row of the table belong to?', 'كل سطر من الجدول تبع أنهي نوع interview؟')}</p></${Box}>
          <${Sort} id="ig" bins=${[['Ind', t('Individuals', 'أفراد')], ['Grp', t('Groups', 'الـ Groups')]]} items=${A ? [
            ['فيه privacy أكتر للـ participants', 0],
            ['ممكن تتعامل مع confounding personalities', 1],
            ['تنسيق الـ logistics أسهل', 0],
            ['أسهل تاخد feedback أكتر', 1],
            ['وقت ومجهود أكتر مع كل participant', 0],
            ['مشاكل الـ <bdi dir="ltr">"presentation of self"</bdi>', 1],
            ['النقاش ممكن يبيّن الـ assumptions', 1]
          ] : [
            ['More privacy for participants', 0],
            ['May need to deal with confounding personalities', 1],
            ['Easier to coordinate the logistics', 0],
            ['Easier to get more feedback', 1],
            ['More time/effort spent with each participant', 0],
            ['"Presentation of self" issues', 1],
            ["Participants' discussion can highlight assumptions", 1]
          ]} />
        `, { sec: t('Exercise: individuals or groups?', 'تمرين: أفراد ولا groups؟') }),

        // 19 · challenges of asking questions
        page(html`
          <${H1}>${t('The trouble with asking', 'مشكلة الأسئلة')}</${H1}>
          <${P}>${X('Surveys and interviews both gather data <b>by asking questions</b>. That data has four challenges:', 'الـ surveys والـ interviews الاتنين بيجمعوا data <b>عن طريق الأسئلة</b>. والـ data دي ليها أربع تحديات:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>التخطيط</b> بياخد وقت ومجهود أكتر من اللي ممكن يكون عند الفريق.',
            'الـ <b>تحليل الـ qualitative data</b> مش سهل.',
            'الـ <b>Recall bias</b>: إجابات مش دقيقة عن حاجات حصلت زمان.',
            'الـ <b>Reporting bias</b>: الناس بتدّي إجابات مثالية أكتر من الواقع.'
          ] : [
            '<b>Planning</b> takes more time and effort than the team may have.',
            '<b>Analysis of qualitative data</b> is not easy.',
            '<b>Recall bias</b>: inaccurate answers about things in the past.',
            '<b>Reporting bias</b>: people give answers more ideal than reality.'
          ]} />
          <${Talk} who="bug">${X('I hide in the answers. The user <b>forgot</b> me, or was too <b>polite</b> to mention me.', 'أنا بستخبى في الإجابات. الـ user <b>نسيني</b>، أو كان <b>مؤدب</b> زيادة فماجابش سيرتي.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('ours: Recall = memory fails. Reporting = the answer is polished.', 'من عندنا: الـ Recall يعني الذاكرة خانت. والـ Reporting يعني الإجابة متلمّعة.')}</${Hand}>
        `, { sec: t('Challenges of asking', 'تحديات الأسئلة') }),

        // 20 · the two biases
        page(html`
          <${H2}>${t('Two biases, side by side', 'اتنين biases جنب بعض')}</${H2}>
          <${Def}>${X('<b>Recall bias</b>: inaccurate answers about things in the past.', 'الـ <b>Recall bias</b>: إجابات مش دقيقة عن حاجات حصلت زمان.')}</${Def}>
          <${Talk} who="dev">${t('"How many times did you use the app last March?" "Uh... twenty?" (ours)', '"استخدمت الـ app كام مرة في مارس اللي فات؟" "اممم... عشرين؟" (من عندنا)')}</${Talk}>
          <${Def}>${X('<b>Reporting bias</b>: people give answers more ideal than reality.', 'الـ <b>Reporting bias</b>: الناس بتدّي إجابات مثالية أكتر من الواقع.')}</${Def}>
          <${Talk} who="dev" flip=${true}>${t('"Do you read the terms before you tap Agree?" "Always!" (ours)', '"بتقرا الشروط قبل ما تدوس Agree؟" "دايماً طبعاً!" (من عندنا)')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Answers more ideal than reality" is <b>reporting</b> bias, not recall. Selection bias and confirmation bias are not in this lecture at all.',
            'الإجابات "المثالية أكتر من الواقع" دي <b>reporting</b> bias، مش recall. والـ selection bias والـ confirmation bias مش في المحاضرة دي خالص.')}</p></${Box}>
        `),

        // 21 · figure: challenges
        page(html`
          <${H2}>${t('The challenges, the biases, the fix', 'التحديات، والـ biases، والحل')}</${H2}>
          <${Fig} name="hc-ask-challenges" />
        `),

        // 22 · sort: name that bias
        page(html`
          <${Box} kind="pencil" title=${t('Name that bias', 'سمّي الـ bias')}><p className="hf-p small">${X('Our own interview moments. <b>Rc</b> = recall bias (memory), <b>Rp</b> = reporting bias (too ideal).', 'لحظات من interviews، من عندنا. الـ <b>Rc</b> يعني recall bias (الذاكرة)، والـ <b>Rp</b> يعني reporting bias (مثالية زيادة).')}</p></${Box}>
          <${Sort} id="bias" bins=${[['Rc', t('Recall bias', 'الـ Recall bias')], ['Rp', t('Reporting bias', 'الـ Reporting bias')]]} items=${A ? [
            ['الـ user مش فاكر الـ error message اللي ظهرتله الشهر اللي فات، فبيخمّن', 0],
            ['"بعمل backup لملفاتي كل يوم." (هو مابيعملش)', 1],
            ['"بتمرن كل يوم." (الحقيقة مرة في الأسبوع)', 1],
            ['الـ user بيوصف شكل الـ menu القديم غلط', 0],
            ['"عمري ما بستخدم الموبايل وأنا سايق."', 1],
            ['الـ user قال إنه اشترك من سنتين، والحقيقة من أربع سنين', 0]
          ] : [
            ["The user can't remember last month's error message, so they guess", 0],
            ['"I back up my files every day." (They don\'t.)', 1],
            ['"I exercise every day." (Really once a week.)', 1],
            ['The user describes the old menu wrongly', 0],
            ['"I never use my phone while driving."', 1],
            ['The user says they joined two years ago; it was four', 0]
          ]} />
        `, { sec: t('Exercise: name that bias', 'تمرين: سمّي الـ bias') }),

        // 23 · the solution + dumb questions
        page(html`
          <${H2}>${t("So don't only ask", 'يبقى ماتعتمدش على الأسئلة بس')}</${H2}>
          <${Def}>${X('<b>Solution:</b> combine asking with other techniques, such as <b>participant observation</b>, <b>usability studies</b> and <b>secondary research</b>.',
            '<b>الحل:</b> اعمل combination بين الأسئلة و techniques تانية، زي الـ <b>participant observation</b> والـ <b>usability studies</b> والـ <b>secondary research</b>.')}</${Def}>
          <${Dumb} qa=${A ? [
            ['يعني لو بطّلت interviews وعملت surveys بس، الـ biases تختفي؟', 'لأ. الـ surveys برضه بتسأل، فعندها نفس الـ biases. الحل إنك <b>تضيف</b> techniques تانية.'],
            ['طب ما أسأل leading questions عشان الإجابة تبقى أوضح؟', 'الـ leading questions بتزوّد الـ bias بدل ما تقلله (فاكر الـ "be unbiased" من الفصل اللي فات؟).'],
            ['التحليل صعب. ممكن أتخطاه؟', 'صعب فعلاً، بس تخطيه مش حل. الحل في الـ combination.']
          ] : [
            ['If I drop interviews and only run surveys, do the biases go away?', 'No. Surveys also gather data by asking questions, so they have the same biases. The fix is to <b>add</b> other techniques, not swap one kind of asking for another.'],
            ['Can I ask leading questions to get clearer answers?', 'Leading questions add bias instead of reducing it (remember "be unbiased" from last chapter?).'],
            ['Analysis is hard. Can I skip it?', 'Qualitative analysis is hard, yes, but skipping it is not the solution. Combining techniques is.']
          ]} />
        `),

        // 24 · design: can I?
        page(html`
          <${H1}>${t('Design: can I?', 'الـ Design: أقدر أعمله؟')}</${H1}>
          <${P} small=${true}>${t('You have researched your users. Now you have to design for them. Two famous voices:', 'إنت عملت research على الـ users بتوعك. دلوقتي لازم تعمل design ليهم. واتنين أصحاب كلام مشهور:')}</${P}>
          <div className="hf-hci7-q hf-in" dir="ltr"><p>"Designing great user interfaces requires enormous creativity and a lot of hard work…"<span className="by">Scott Klemmer</span></p></div>
          <${P} small=${true}>${X('…but <b>pretty good</b> interfaces are <b>easy</b> if you know the basic <b>methods, techniques and principles</b>.', 'يعني الـ interfaces العظيمة محتاجة إبداع ضخم وشغل كتير، بس الـ interfaces <b>الكويسة</b> <b>سهلة</b> لو عارف الأساسيات: الـ <b>methods</b>، والـ <b>techniques</b>، والـ <b>principles</b>.')}</${P}>
          <div className="hf-hci7-q hf-in" dir="ltr"><p>"design is very hard"<span className="by">Joyner</span></p></div>
          <${Talk} who="dev">${t('Great. One says easy, one says very hard.', 'حلو. واحد بيقول سهل، والتاني بيقول صعب جداً.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Read Klemmer again: <b>great</b> is hard, <b>pretty good</b> is easy with the basics. That\'s what the rest of the course gives you.', 'اقرا كلام Klemmer تاني: الـ <b>great</b> صعب، والـ <b>pretty good</b> سهل بالأساسيات. وده اللي باقي الكورس هيدّيهولك.')}</${Talk}>
        `, { sec: t('Design: can I?', 'الـ Design: أقدر أعمله؟') }),

        // 25 · we are not artists
        page(html`
          <${H2}>${t('"We are not artists"', '"إحنا مش فنانين"')}</${H2}>
          <${P}>${X('Designers say: <i>"we are not artists; in most cases we are not even talented in drawing."</i> Design does not produce wall-hanging artwork.',
            'الـ designers بيقولوا: "إحنا مش فنانين، وفي أغلب الحالات مش موهوبين في الرسم كمان." والـ design مش بيطلّع لوحات تتعلق على الحيطة.')}</${P}>
          <${P}>${X('<b>Talent and creativity are an advantage.</b> So: do <b>not</b> turn off creativity; follow tips, and avoid the biggest design mistakes.',
            '<b>الموهبة والإبداع ميزة.</b> يعني: <b>ماتقفلش</b> الإبداع، وامشي على النصايح، وتجنّب أكبر أخطاء الـ design.')}</${P}>
          <${Hand} tilt=${true} arrow="right" after=${true}>${t('next chapter: the biggest mistakes a designer can make', 'الفصل الجاي: أكبر الأخطاء اللي ممكن designer يعملها')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Joyner says design is very easy if you follow a few principles." <b>False.</b> Joyner: "design is very hard". The "easy if you know the basics" part is Klemmer\'s, and only for <b>pretty good</b> interfaces.',
            'لو جالك إن Joyner بيقول الـ design سهل جداً لو مشيت على شوية principles، تبقى <b>غلط</b>. جملة Joyner هي <bdi dir="ltr">"design is very hard"</bdi>. والـ "سهل لو عارف الأساسيات" دي بتاعة Klemmer، وللـ interfaces <b>الكويسة</b> بس.')}</p></${Box}>
          <${Box} kind="relax"><p className="hf-p small">${t("Can't draw? Neither can most designers, by their own words.", 'مابتعرفش ترسم؟ ولا أغلب الـ designers، بكلامهم هما.')}</p></${Box}>
        `),

        // 26–27 · exam corner: the doctors' questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("This lecture has three questions from the doctors' papers, and here they all are. Tap an answer to see why.", 'المحاضرة دي ليها تلات أسئلة من امتحانات الدكاترة، وكلهم هنا. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /Interview is the most common research technique/)}
          <${Gap} h=${6} />
          ${mq('m3', /Individual interviews are easier to coordinate/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /^Tips for a good interview/)}
          <${Grow} />
          <${Hand} red=${true}>${t('two keys during the interview: listen well AND take notes', 'مفتاحين أثناء الـ interview: اسمع كويس واكتب notes، الاتنين مع بعض')}</${Hand}>
          <${Talk} who="lens" flip=${true}>${X('And "don\'t leave some time" is the tip upside down.', 'واختيار <bdi dir="ltr">"don\'t leave some time"</bdi> ده النصيحة بالمقلوب.')}</${Talk}>
        `),

        // 28–30 · practice questions (the site's own)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("These are the site's own practice questions, not the doctors'. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /Why are interviews more expensive than surveys/)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /answers that are more ideal than reality/)}
          <${Gap} h=${4} />
          ${pq('p3', /Which is an advantage of GROUP interviews/)}
        `),
        page(html`
          ${pq('p4', /Which of these is NOT one of them/)}
          <${Gap} h=${4} />
          ${pq('p5', /lecture's solution to the challenges/)}
        `),

        // 31 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>interview</b> هو الـ technique <b>الأكتر انتشاراً</b>: فهم أعمق، وأسئلة "why" (الـ <b>6 Ws</b>)، و follow-ups، وأحداث نادرة.',
            'الـ users <b>أقل بكتير</b>، وهو <b>أغلى</b>: <b>synchronous</b> و <b>incentives</b>. ومع الـ surveys <b>بأي ترتيب</b>.',
            'النصايح: <b>خطط من بدري</b>، و<b>اسمع كويس</b>، و<b>اكتب notes</b> (الـ audio مش كفاية)، و<b>سيب وقت بينهم</b>.',
            'الأفراد: <b>logistics أسهل</b> و<b>privacy أكتر</b>. والـ groups بيدّوا <b>feedback أكتر</b> وبيبيّنوا الـ assumptions، بس فيهم confounding personalities ومشاكل الـ <bdi dir="ltr">"presentation of self"</bdi>.',
            'التحديات: التخطيط، والتحليل، والـ <b>recall bias</b> (الماضي)، والـ <b>reporting bias</b> (مثالية). والحل: نضيف techniques تانية.',
            'الـ Design: الـ great صعب، والـ pretty good سهل بالأساسيات. إحنا مش فنانين، بس ماتقفلش الإبداع.'
          ] : [
            'The <b>interview</b> is the <b>most common</b> technique: deeper understanding, "why" questions (the <b>6 Ws</b>), follow-ups, rare events.',
            '<b>Far fewer</b> users, <b>more expensive</b>: <b>synchronous</b>, <b>incentives</b>. Pairs with surveys <b>in either order</b>.',
            'Tips: <b>plan ahead</b>, <b>listen well</b>, <b>take notes</b> (audio is not enough), <b>leave time between</b>.',
            'Individuals: <b>easier logistics</b>, <b>more privacy</b>. Groups: <b>more feedback</b>, assumptions surface, but confounding personalities and "presentation of self".',
            'Challenges: planning, analysis, <b>recall bias</b> (the past), <b>reporting bias</b> (too ideal). Fix: combine with other techniques.',
            'Design: great is hard, pretty good is easy with the basics; Joyner: "very hard". Not artists, but keep creativity on.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 32 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 7!', 'خلّصت الفصل السابع!')}</${H1}>
            <${Talk} who="lens">${t('Next time: design alternatives, prototyping, and the biggest mistakes a designer can make.', 'المرة الجاية: الـ design alternatives والـ prototyping، وأكبر الأخطاء اللي ممكن designer يعملها.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [7], t: Date.now() } }}>${t('Quiz me on Lecture 7', 'امتحنّي في محاضرة 7')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 7, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 7, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

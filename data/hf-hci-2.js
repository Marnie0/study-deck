// Head First chapter for Human Computer Interaction Lecture 2 (built on hf.js), English + Egyptian Arabic, same pages in both.
// The process of interaction design: what it involves and its three components, user-centered design, the double diamond,
// the four basic activities and the simple lifecycle model, Google Design Sprints, Joyner's design life cycle, Google's UCD
// process, where user research sits, who does UI/UX design, the practical issues (users and stakeholders, needs, research by
// when and by who, generating and choosing alternatives) and the football app activity.
// Every fact comes from the lecture's notes; parts the notes mark as last year's slides carry a badge; analogies, scenarios
// and tricks are marked as ours.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci2')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci2';
    s.textContent = `
.hfb .hf-hci2-ly{ align-self:flex-start; font:700 12.5px/1 var(--body); letter-spacing:.05em; text-transform:uppercase; color:var(--hf-k); border:1.5px solid var(--hf-k); border-radius:99px; padding:4px 9px; }
.hfb .hf-hci2-three{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; }
.hfb .hf-hci2-three > div{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 6px; text-align:center; background:var(--paper); }
.hfb .hf-hci2-three > div:nth-child(2){ border-color:var(--hf-k); }
.hfb .hf-hci2-three > div:nth-child(3){ border-color:var(--hf-red); }
.hfb .hf-hci2-three > div > b{ display:block; font:800 22px/1 var(--body); color:var(--hf-k); }
.hfb .hf-hci2-three > div > span{ display:block; font:700 13.5px/1.2 var(--body); color:var(--ink); margin-top:4px; }
.hfb .hf-hci2-dd{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:4px; }
.hfb .hf-hci2-dd > div{ border-top:5px solid var(--hf-k); background:var(--hf-grey); padding:6px 5px; border-radius:0 0 6px 6px; }
.hfb .hf-hci2-dd > div:nth-child(n+3){ border-top-color:var(--hf-red); }
.hfb .hf-hci2-dd > div > b{ display:block; font:800 14px/1.1 var(--body); color:var(--ink); }
.hfb .hf-hci2-dd span{ display:block; font:500 13px/1.25 var(--body); color:var(--ink); margin-top:3px; }
.hfb .hf-hci2-dd i{ display:block; font:italic 600 13px/1 var(--body); color:var(--graphite); margin-top:4px; }
.hfb .hf-hci2-tabs{ display:flex; gap:5px; }
.hfb .hf-hci2-tabs button{ flex:1 1 0; min-width:0; min-height:34px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:800 13.5px/1 var(--body); cursor:pointer; padding:0 2px; }
.hfb .hf-hci2-tabs button.done{ border-color:var(--ok); color:var(--ink); }
.hfb .hf-hci2-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hci2-ord{ display:grid; gap:5px; margin-top:7px; min-height:252px; align-content:start; }
.hfb .hf-hci2-ord button{ display:flex; align-items:center; gap:9px; text-align:start; font:500 13.5px/1.25 var(--body); padding:5px 9px; min-height:44px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci2-ord button i{ flex:none; width:24px; height:24px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); font-style:normal; background:var(--hf-grey2); color:var(--ink); }
.hfb .hf-hci2-ord button.n i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-hci2-ord button.ok{ border-color:var(--ok); } .hfb .hf-hci2-ord button.no{ border-color:var(--hf-red); }
.hfb .hf-hci2-ord button.ok i{ background:var(--ok); } .hfb .hf-hci2-ord button.no i{ background:var(--hf-red); color:var(--paper); }
.hfb .hf-hci2-ord button b{ font:800 14.5px/1.1 var(--body); }
.hfb .hf-hci2-ord button small{ display:block; font-size:13px; color:var(--graphite); }
.hfb .hf-hci2-chain{ font:700 13.5px/1.35 var(--body); color:var(--hf-k); margin:4px 0 0; }
.hfb .hf-hci2-who{ display:grid; gap:7px; }
.hfb .hf-hci2-who > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); }
.hfb .hf-hci2-who p{ margin:0; font-size:14px; line-height:1.32; color:var(--ink); }
.hfb .hf-hci2-who .ppl{ display:flex; flex-wrap:wrap; gap:4px; margin-top:5px; }
.hfb .hf-hci2-who .ppl span{ font:700 13px/1.2 var(--body); border:1.5px solid var(--hf-k); color:var(--ink); border-radius:99px; padding:2px 8px; background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); }
.hfb .hf-hci2-iss{ display:grid; gap:6px; }
.hfb .hf-hci2-iss > div{ display:flex; align-items:center; gap:10px; border-bottom:1.5px dashed var(--hf-grey2); padding-bottom:5px; }
.hfb .hf-hci2-iss > div > b{ flex:none; width:34px; font:800 34px/1 var(--body); color:transparent; -webkit-text-stroke:1.6px var(--hf-line); text-align:center; }
.hfb .hf-hci2-iss span{ font:600 15px/1.3 var(--body); color:var(--ink); }
.hfb .hf-hci2-when{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; }
.hfb .hf-hci2-when > div{ border:2px solid var(--hf-line); border-radius:8px; padding:6px 6px 7px; background:var(--paper); display:flex; flex-direction:column; gap:3px; }
.hfb .hf-hci2-when > div.mid{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 9%, var(--paper)); }
.hfb .hf-hci2-when .wh{ font:800 13px/1.1 var(--body); text-transform:uppercase; letter-spacing:.04em; color:var(--graphite); }
.hfb .hf-hci2-when .nm{ font:800 15px/1.1 var(--body); color:var(--hf-k); }
.hfb .hf-hci2-when .al{ font:500 13px/1.1 var(--body); color:var(--graphite); }
.hfb .hf-hci2-when .gl{ font:500 13px/1.28 var(--body); color:var(--ink); }
.hfb .hf-hci2-pd{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; margin-top:-2px; }
.hfb .hf-hci2-pd span{ height:8px; border-radius:4px; }
.hfb .hf-hci2-pd span:nth-child(2){ background:var(--hf-k); }
.hfb .hf-hci2-pdl{ text-align:center; font:700 13px/1 var(--body); color:var(--hf-k); margin:0; }
.hfb .hf-hci2-src{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-hci2-src > div{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 8px; }
.hfb .hf-hci2-src > div + div{ border-color:var(--hf-k); }
.hfb .hf-hci2-src > div > b{ display:block; font:800 15px/1.1 var(--body); color:var(--ink); }
.hfb .hf-hci2-src > div > p{ margin:3px 0 0; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hf-ar .hf-hci2-ly, .hf-ar .hf-hci2-three span, .hf-ar .hf-hci2-dd span, .hf-ar .hf-hci2-dd i, .hf-ar .hf-hci2-tabs button, .hf-ar .hf-hci2-ord button, .hf-ar .hf-hci2-who p, .hf-ar .hf-hci2-iss span, .hf-ar .hf-hci2-when .wh, .hf-ar .hf-hci2-when .gl, .hf-ar .hf-hci2-pdl, .hf-ar .hf-hci2-src p, .hf-ar .hf-hci2-chain{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; font-style:normal; }
.hf-ar .hf-hci2-who p, .hf-ar .hf-hci2-src p, .hf-ar .hf-hci2-when .gl{ line-height:1.5; font-size:13px; }
.hf-ar .hf-hci2-iss span{ font-weight:500; font-size:14.5px; line-height:1.45; }
.hf-ar .hf-hci2-ord button{ line-height:1.4; }
`;
    document.head.appendChild(s);
  }

  // a badge for the parts the notes mark as last year's slides
  function Ly() {
    return html`<span className="hf-hci2-ly hf-in">${useAr() ? 'من سلايدز السنة اللي فاتت' : "From last year's slides"}</span>`;
  }

  // put the steps of each process model in order: tap them first to last
  const MODELS = [
    { tab: ['Diamond', 'الـ Diamond'], shuf: [2, 0, 3, 1], steps: [
      ['Discover', 'insight into the problem', 'فهم للمشكلة'], ['Define', 'the area to focus upon', 'المنطقة اللي هنركز عليها'],
      ['Develop', 'potential solutions', 'حلول محتملة'], ['Deliver', 'solutions that work', 'حلول شغالة فعلًا']] },
    { tab: ['Sprint', 'الـ Sprint'], shuf: [3, 0, 4, 2, 1], steps: [['Unpack'], ['Sketch'], ['Decide'], ['Prototype'], ['Test']] },
    { tab: ['Joyner', 'الـ Joyner'], shuf: [2, 3, 0, 1], steps: [['Need finding'], ['Design alternative'], ['Prototyping'], ['Evaluation']] },
    { tab: ['Google', 'الـ Google'], shuf: [1, 3, 0, 2], steps: [
      ['Understand', 'how users experience the product', 'الـ users بيجرّبوا المنتج إزاي'], ['Specify', 'the most important user problem to solve', 'أهم user problem نحلها'],
      ['Design', 'solutions, then start building', 'حلول، وبعدين نبدأ نبني'], ['Evaluate', 'test with real users', 'نختبر مع users حقيقيين']] }
  ];
  function ModelOrder() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('ord:m', 0);
    const [all, setAll] = H.K.useSlot('ord', {});
    const [chk, setChk] = H.K.useSlot('ord:c', {});
    const M = MODELS[m], seq = all[m] || [], n = M.steps.length, checked = !!chk[m];
    const setSeq = v => setAll(Object.assign({}, all, { [m]: v }));
    const setC = v => setChk(Object.assign({}, chk, { [m]: v }));
    const tap = k => { setC(false); setSeq(seq.includes(k) ? seq.filter(x => x !== k) : seq.concat(k)); };
    const right = seq.filter((k, j) => k === j).length;
    const solved = j => { const s = all[j] || []; return chk[j] && s.length === MODELS[j].steps.length && s.every((k, i) => k === i); };
    return html`<div className="hf-in">
      <div className="hf-hci2-tabs" role="group" aria-label="Process model">${MODELS.map((x, j) => html`<button key=${j} className=${solved(j) ? 'done' : ''} aria-pressed=${String(j === m)} onClick=${() => setM(j)}>${ar ? x.tab[1] : x.tab[0]}</button>`)}</div>
      <div className="hf-hci2-ord" key=${m}>${M.shuf.map(k => { const r = seq.indexOf(k), st = checked && r >= 0 ? (r === k ? ' ok' : ' no') : '', s = M.steps[k];
        return html`<button key=${k} className=${(r >= 0 ? 'n' : '') + st} aria-pressed=${String(r >= 0)} onClick=${() => tap(k)}><i>${r >= 0 ? r + 1 : ''}</i><span><b dir="ltr">${s[0]}</b>${s[1] && html`<small>${ar ? s[2] : s[1]}</small>`}</span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${seq.length < n} onClick=${() => setC(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(M.steps.map((_, i) => i)); setC(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${checked && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${n}</bdi> صح` : right + ' / ' + n + ' right'}</span>`}
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setC(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div></div>`;
  }

  H.chapters.hci[2] = {
    title: 'The Process of Interaction Design', kicker: 'Chapter 2', run: 'the process of interaction design',
    ar: { title: 'الـ Process بتاعة الـ Interaction Design', kicker: 'الفصل 2', run: 'الـ process بتاعة الـ interaction design' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (exams, the 2026/27 midterm, the student summaries' midterm questions),
      // with the site's Egyptian Arabic explanations for each choice when the book is in Arabic
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arQuiz = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[2] && window.AR.hci.lectures[2].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X(`Last chapter you met HCI and the bad designs that happen when nobody asks the users. This one answers the obvious follow-up: <i>"So how do you design the right way?"</i> The facts are all from the doctors' slides.`,
            `الفصل اللي فات شفت الـ designs الوحشة اللي بتحصل لما محدش يسأل الـ users. الفصل ده بيجاوب على السؤال اللي بعده: <i>"طب نصمم صح إزاي؟"</i> وكل المعلومات من سلايدز الدكاترة.`)}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You put steps in order and sort activities right on the page.', '<b>حل التمارين.</b> هترتّب خطوات وتقسّم activities على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, many from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، وكتير منها من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk" style=${{ fontSize: '13px', color: 'var(--hf-k)' }}>${t('LY', 'قديم')}</span><span>${X("A <b>From last year's slides</b> badge marks parts that are in last year's slides, not this term's.", 'علامة <b>من سلايدز السنة اللي فاتت</b>: الجزء ده مش في سلايدز الترم ده.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes and scenarios marked "ours" are our own analogies and examples.', 'اللي عليه "من عندنا" ده تشبيهات وأمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة أو اسحب عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>Human Computer Interaction` : html`Chapter two<br/>Human Computer Interaction`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("Don't Guess. Ask.", 'متخمّنش. اسأل.')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('the process of interaction design', 'الـ process بتاعة الـ interaction design')}</p></div>
          <${Talk} who="dev">${t("I already know what users want. I'll just build it.", 'أنا عارف الـ users عايزين إيه. هبنيه على طول.')}</${Talk}>
          <${Talk} who="bug" flip=${true}>${t('Perfect. That is exactly how I get born.', 'حلو أوي. هو ده بالظبط اللي بيخلّيني أتولد.')}</${Talk}>
          <${Talk} who="lens">${X('Or you could <b>work with the users rather than guessing</b>, and follow a <b>process</b>.', 'أو ممكن <b>تشتغل مع الـ users بدل ما تخمّن</b>، وتمشي على <b>process</b>.')}</${Talk}>
          <${P} small=${true}>${X("In this chapter: what the process involves, <b>five process models</b> (one diamond-shaped, a few round), where user research hides, and how to come up with alternatives and pick one.",
            'في الفصل ده: الـ process فيها إيه، و<b>خمس process models</b> (واحد على شكل diamond وكام واحد على شكل دايرة)، والـ user research مستخبي فين، وإزاي تطلّع alternatives وتختار منهم.')}</${P}>
        `, { sec: t('Meet the process', 'اتعرّف على الـ process') }),

        // 2 · what is involved
        page(html`
          <${H1}>${t("What's involved in interaction design?", 'الـ interaction design فيه إيه؟')}</${H1}>
          <${Def}>${X('Interaction design <b>is a process</b>.', 'الـ interaction design <b>عبارة عن process</b>.')}</${Def}>
          <${UL} items=${A ? [
            'بيركز على <b>اكتشاف الـ requirements</b>، و<b>التصميم</b> اللي يحققها، و<b>عمل prototypes</b>، و<b>تقييمها (evaluating)</b>.',
            'بيركز على <b>الـ users وأهدافهم (goals)</b>.',
            'بيشمل إزاي <b>توازن بين الـ requirements اللي بتتعارض مع بعض</b>.'
          ] : [
            'It is focused on <b>discovering requirements</b>, <b>designing</b> to fulfil requirements, <b>producing prototypes</b> and <b>evaluating</b> them.',
            'It is focused on <b>users and their goals</b>.',
            'It involves how to <b>balance conflicting requirements</b>.'
          ]} />
          <${Hand} red=${true} big=${true} tilt=${true}>${t('Generating alternatives and choosing between them is key.', 'إنك تطلّع alternatives وتختار من بينهم، ده المفتاح.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('A football app: fans want <b>every statistic</b> on the match screen, and they also want it <b>clean and fast</b>. Which line above is this?',
            'تطبيق كورة: الجمهور عايز <b>كل الإحصائيات</b> على شاشة الماتش، وعايزها كمان <b>نضيفة وسريعة</b>. ده أنهي سطر من اللي فوق؟')}</p>
            <p className="hf-hand" style=${{ fontSize: '17px', marginTop: '4px' }}>${t('(our example)', '(مثال من عندنا)')}</p></${Box}>
        `),

        // 3 · three components
        page(html`
          <${H2}>${t('Remember: three components', 'افتكر: تلات components')}</${H2}>
          <div className="hf-hci2-three hf-in">
            <div><b>1</b><span>User research</span></div>
            <div><b>2</b><span>Design and prototyping</span></div>
            <div><b>3</b><span>Evaluation (improvement)</span></div>
          </div>
          <${P} small=${true}>${X('<b>User research</b> means <b>working with users rather than guessing</b>: <b>user-centric design</b>. Ignoring user research is <b>common</b>. Involve users so your decisions are based on <b>reality, not guesses</b>.',
            'الـ <b>User research</b> معناه <b>إنك تشتغل مع الـ users بدل ما تخمّن</b>، وده الـ <b>user-centric design</b>. تجاهل الـ user research حاجة <b>منتشرة</b>. دخّل الـ users عشان قراراتك تبقى مبنية على <b>الواقع مش التخمين</b>.')}</${P}>
          <${P} small=${true}>${X('The slides also tie user research to <b>invisible interfaces</b> (<b>task-oriented design</b>): you can only make an interface disappear behind the task once you know the task.',
            'والسلايدز بتربط الـ user research بالـ <b>invisible interfaces</b> (الـ <b>task-oriented design</b>): مش هتعرف تخلّي الـ interface تختفي ورا الـ task غير لما تعرف الـ task دي أصلًا.')}</${P}>
          <${Hand} arrow="up">${t('the second half of that last line is ours: the slide only names the link', 'نص السطر الأخير التاني من عندنا: السلايد بتذكر الربط بس')}</${Hand}>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t("That's me: number 1. And, spoiler, I sneak into the other two as well.", 'ده أنا: رقم 1. وهحرق لك حاجة: أنا بتسلل للاتنين التانيين كمان.')}</${Talk}>
        `, { sec: t('Three components', 'التلات components') }),

        // 4 · user-centered design (last year)
        page(html`
          <${Ly} />
          <${H1}>${t('User-centered design', 'الـ User-centered design')}</${H1}>
          <div className="hf-hci2-src hf-in">
            <div><b>${t('We used to…', 'زمان…')}</b><p>${X('design systems to meet some <b>functional specification</b>.', 'كنا بنصمم الـ systems عشان تحقق <b>functional specification</b> معينة.')}</p></div>
            <div><b>${t('User-centered design', 'الـ User-centered')}</b><p>${X("takes the <b>user's needs</b> into consideration at <b>every step</b>.", 'بياخد <b>احتياجات الـ user</b> في الاعتبار في <b>كل خطوة</b>.')}</p></div>
          </div>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': a tailor who sews to the pattern on the paper vs. a tailor who keeps measuring you at every fitting.", 'تشبيه من عندنا: ترزي بيخيّط على الباترون اللي على الورق، وترزي بيقيسك تاني في كل بروفة.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Designing a system to meet a functional specification" is how systems <b>used to</b> be designed. It is <b>not</b> the definition of user-centered design.',
            'دي الطريقة اللي الـ systems <b>كانت</b> بتتصمم بيها زمان، و<b>مش</b> تعريف الـ user-centered design:<span class="ltr">"Designing a system to meet a functional specification"</span>')}</p></${Box}>
        `),

        // 5 · the double diamond
        page(html`
          <${H1}>${t('Two diamonds, four D’s', 'اتنين diamonds، وأربع D')}</${H1}>
          <${P} small=${true}>${X('The <b>double diamond of design</b> has four phases. Each diamond first <b>widens</b>, then <b>narrows</b>:', 'الـ <b>double diamond of design</b> فيه 4 phases. كل diamond <b>بيوسع</b> الأول وبعدين <b>بيضيق</b>:')}</${P}>
          <div className="hf-hci2-dd hf-in" dir="ltr">
            ${[['Discover', 'insight into the problem', 'فهم للمشكلة', 'widens', 'بيوسع'], ['Define', 'the area to focus upon', 'المنطقة اللي هنركز عليها', 'narrows', 'بيضيق'], ['Develop', 'potential solutions', 'حلول محتملة', 'widens', 'بيوسع'], ['Deliver', 'solutions that work', 'حلول شغالة فعلًا', 'narrows', 'بيضيق']].map(([n, e, a, w, wa], k) => html`<div key=${k}><b>${n}</b><span dir=${A ? 'rtl' : 'ltr'}>${A ? a : e}</span><i dir=${A ? 'rtl' : 'ltr'}>${A ? wa : w}</i></div>`)}
          </div>
          <${P} small=${true}>${X('The first diamond goes from the <b>Problem</b> to the <b>Problem Definition / Design Brief</b>. The second goes from there to the <b>Solution</b>.',
            'الـ diamond الأولانية بتبدأ من الـ <b>Problem</b> لحد الـ <b><bdi dir="ltr">Problem Definition / Design Brief</bdi></b>، والتانية من النقطة دي لحد الـ <b>Solution</b>.')}</${P}>
          <${Hand} tilt=${true}>${A ? html`حيلة للحفظ (من عندنا): البدايات ماشية بالترتيب الأبجدي:<span className="ltr">Dis · Def · Dev · Del</span>` : html`Memory trick (ours): Dis, Def, Dev, Del run in alphabetical order.`}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('Why would a design process deliberately make the problem "wider" before it narrows it down?', 'ليه process تصميم تقصد "توسّع" المشكلة الأول قبل ما تضيّقها؟')}</p></${Box}>
        `, { sec: t('The double diamond', 'الـ double diamond') }),

        // 6 · the figure
        page(html`
          <${H2}>${t('Walk the diamonds', 'امشي في الـ diamonds')}</${H2}>
          <${Fig} name="double-diamond" />
        `),

        // 7 · sort: which D?
        page(html`
          <${Box} kind="pencil" title=${t('Which D is it?', 'أنهي D؟')}><p className="hf-p small">${X('Our football app again (our scenarios, not the slides\'). Put each activity in its phase: <b>1</b> Discover, <b>2</b> Define, <b>3</b> Develop, <b>4</b> Deliver.',
            'تاني تطبيق الكورة (أمثلة من عندنا). حط كل activity في الـ phase بتاعتها: <b>1</b> للـ Discover، و<b>2</b> للـ Define، و<b>3</b> للـ Develop، و<b>4</b> للـ Deliver.')}</p></${Box}>
          <${Sort} id="dd" bins=${[['1', 'Discover'], ['2', 'Define'], ['3', 'Develop'], ['4', 'Deliver']]} items=${A ? [
            ['بتكلّم مشجعين عن اللي بيضايقهم في التطبيقات الحالية', 0],
            ['بتكتب الـ design brief: المشكلة اللي هنحلها', 1],
            ['بترسم تلات layouts مختلفة لشاشة النتايج', 2],
            ['بتنزّل للناس النسخة اللي اشتغلت', 3],
            ['بتختار مشكلة واحدة تركز عليها: متابعة النتايج لايف', 1],
            ['بتطلّع أفكار كتير لعرض الإحصائيات', 2]
          ] : [
            ["Talking to fans about what annoys them in today's apps", 0],
            ['Writing the design brief: the problem we will solve', 1],
            ['Sketching three different layouts for the results screen', 2],
            ['Releasing the version that works to everyone', 3],
            ['Choosing one problem to focus on: following live results', 1],
            ['Coming up with many ideas for showing statistics', 2]
          ]} />
        `),

        // 8 · four activities and the simple lifecycle
        page(html`
          <${H1}>${t('Four basic activities', 'الـ 4 basic activities')}</${H1}>
          <${P} small=${true}>${t('Under every model in this chapter sit the same four basic activities of interaction design:', 'تحت كل model في الفصل ده نفس الـ 4 basic activities بتوع الـ interaction design:')}</${P}>
          <div className="hf-hci2-iss hf-in">
            ${['Discovering requirements', 'Designing alternatives', 'Prototyping alternative designs', 'Evaluating product and its user experience throughout'].map((x, k) => html`<div key=${k}><b>${k + 1}</b><span dir="ltr">${x}</span></div>`)}
          </div>
          <${Hand} red=${true} arrow="up">${X('"throughout": evaluation is not only at the end', 'كلمة "throughout" معناها إن الـ evaluation مش في الآخر بس')}</${Hand}>
          <${P} small=${true}>${X('Join them with arrows and you get <b>a simple interaction design lifecycle model</b>. It <b>exemplifies a user-centered design approach</b>.',
            'وصّلهم بأسهم يطلع لك <b>simple interaction design lifecycle model</b>. وهو <b>مثال على الـ user-centered design approach</b>.')}</${P}>
        `, { sec: t('Lifecycle models', 'الـ lifecycle models') }),

        // 9 · the lifecycle figure
        page(html`
          <${H2}>${t('Walk the lifecycle yourself', 'امشي في الـ lifecycle')}</${H2}>
          <${Fig} name="id-lifecycle" />
        `),

        // 10 · dumb questions on the lifecycle
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني الـ lifecycle ده خطوات بالترتيب ورا بعض؟', 'لأ. بين الـ Discovering requirements والـ Designing alternatives فيه <b>أسهم في الاتجاهين</b>، والـ Prototyping ليه سهم <b>راجع</b> للـ Designing alternatives.'],
            ['منين بخرج للـ Final product؟', 'من الـ <b>Evaluating</b> بس. وهو كمان ليه أسهم راجعة للـ Discovering requirements وللـ Designing alternatives.'],
            ['والـ process بتبدأ منين؟', 'بتدخل من الـ <b>Discovering requirements</b>.'],
            ['هو ده الـ model الوحيد؟', 'لأ، ده model بسيط. الصفحات الجاية فيها Google Design Sprints وJoyner والـ process بتاعة Google.']
          ] : [
            ['So is the lifecycle a straight line of steps?', 'No. Discovering requirements and Designing alternatives have <b>arrows both ways</b>, and Prototyping has an arrow <b>back</b> to Designing alternatives.'],
            ['Where do I leave for the Final product?', 'Only from <b>Evaluating</b>. It also has arrows back to Discovering requirements and to Designing alternatives.'],
            ['And where does the process start?', 'It enters at <b>Discovering requirements</b>.'],
            ['Is this the only model?', "No, it's a simple one. Next come Google Design Sprints, Joyner's life cycle and Google's own process."]
          ]} />
          <${Grow} />
          <${Talk} who="bug" flip=${true}>${t('Every arrow back is one more chance to catch me before the final product. I hate this diagram.', 'كل سهم راجع ده فرصة زيادة يمسكوني قبل الـ final product. أنا بكره الرسمة دي.')}</${Talk}>
        `),

        // 11 · google design sprints
        page(html`
          <${H1}>${t('Google Design Sprints', 'الـ Google Design Sprints')}</${H1}>
          <${P} small=${true}>${X('Another lifecycle model: <b>Google Design Sprints</b> (<b>Knapp et al., 2016</b>). Five steps:', 'فيه lifecycle model تاني: الـ <b>Google Design Sprints</b> (<bdi dir="ltr"><b>Knapp et al., 2016</b></bdi>). خمس steps:')}</${P}>
          <p className="hf-hci2-chain hf-in" dir="ltr">1 Unpack → 2 Sketch → 3 Decide → 4 Prototype → 5 Test</p>
          <${P} small=${true}>${X('The steps form a cycle labelled <b>Iterate</b>: after Test you go back to Unpack.', 'الـ steps بتعمل cycle اسمها <b>Iterate</b>: بعد الـ Test بترجع للـ Unpack تاني.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X("The 2026/27 midterm asked what two of the steps are for:", 'الميدترم بتاع <bdi dir="ltr">2026/27</bdi> سأل عن الهدف من خطوتين منهم:')}</p>
            ${li(A ? ['الـ <b>Decide</b>: <b>نختار أحسن فكرة</b>.', 'الـ <b>Test</b>: <b>ناخد feedback من الـ users</b>.', 'والهدف من الـ sprints كلها: <b>نطوّر حلول ونختبرها بسرعة</b>.']
              : ['<b>Decide</b>: <b>select the best idea</b>.', '<b>Test</b>: <b>get feedback from users</b>.', 'And the main goal of the sprints: <b>to develop and test solutions quickly</b>.'])}</${Box}>
          <${Grow} />
          <${Talk} who="dev">${t('So a sprint is just the lifecycle, but in a hurry?', 'يعني الـ sprint ده الـ lifecycle بس مستعجل؟')}</${Talk}>
        `),

        // 12 · sprint figure
        page(html`
          <${H2}>${t('Five steps in a cycle', 'خمس خطوات في دايرة')}</${H2}>
          <${Fig} name="design-sprint" />
        `),

        // 13 · Joyner
        page(html`
          <${H2}>${t("Joyner's design life cycle", 'الـ design life cycle بتاع Joyner')}</${H2}>
          <${P} small=${true}>${X('An <b>iterative process with four phases</b>; after Evaluation you go back to Need finding.', 'هو <b>iterative process فيه 4 phases</b>، وبعد الـ Evaluation بترجع للـ Need finding.')}</${P}>
          <${Fig} name="joyner-cycle" />
        `),

        // 14 · Google UCD (last year)
        page(html`
          <${Ly} />
          <${H2}>${t("Google's user-centered design process", 'الـ user-centered design process بتاعة Google')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Understand</b>: الـ users بيجرّبوا المنتج إزاي (research كتير).',
            'الـ <b>Specify</b>: أهم user problem محتاجين نحلها.',
            'الـ <b>Design</b>: حلول، وبعدين نبدأ نبني.',
            'الـ <b>Evaluate</b>: نختبر مع users حقيقيين.'
          ] : [
            '<b>Understand</b>: how users experience the product (a lot of research).',
            '<b>Specify</b>: the most important user problem to solve.',
            '<b>Design</b>: solutions, then start building.',
            '<b>Evaluate</b>: test with real users.'
          ]} />
          <${Fig} name="google-ucd" />
          <${Hand} red=${true}>${t('Iteration is key.', 'الـ iteration هي الأساس.')}</${Hand}>
        `),

        // 15 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Google's Design Sprint and Joyner's life cycle compare notes.", 'قعدة الليلة: الـ Design Sprint بتاع Google والـ life cycle بتاع Joyner بيقارنوا نفسهم ببعض.')} />
          <${Chat} names=${[t('Design Sprint', 'الـ Design Sprint'), t("Joyner's cycle", 'الـ cycle بتاع Joyner')]} lines=${A ? [
            [0, 'أنا عندي <b>خمس steps</b>: الـ Unpack والـ Sketch والـ Decide والـ Prototype والـ Test.'],
            [1, 'وأنا <b>أربعة بس</b>: الـ Need finding والـ Design alternative والـ Prototyping والـ Evaluation.'],
            [0, 'في الـ Decide <b>بنختار أحسن فكرة</b>، وفي الـ Test <b>بناخد feedback من الـ users</b>.'],
            [1, 'وأنا <b>iterative</b>: بعد الـ Evaluation برجع للـ Need finding.'],
            [0, 'وأنا كمان، الدايرة بتاعتي اسمها <b>Iterate</b>. بعد الـ Test برجع للـ Unpack.'],
            [1, 'بس فين الـ user research عندك؟ مش شايفاه خطوة.'],
            [0, 'وإنت كمان مش عامله خطوة!'],
            [1, 'بقصد. هو <b>جوّه كل phase</b>. زي ما بقول:<span class="ltr"><b>"you need users early and often"</b></span>']
          ] : [
            [0, 'I have <b>five steps</b>: Unpack, Sketch, Decide, Prototype, Test.'],
            [1, 'I keep it to <b>four</b>: Need finding, Design alternative, Prototyping, Evaluation.'],
            [0, 'In Decide we <b>select the best idea</b>. In Test we <b>get feedback from users</b>.'],
            [1, "I'm <b>iterative</b>: after Evaluation I go back to Need finding."],
            [0, 'So am I. My cycle is literally labelled <b>Iterate</b>: Test leads back to Unpack.'],
            [1, "But where's user research in you? I don't see a step for it."],
            [0, "You don't have one either!"],
            [1, 'On purpose. It is <b>in every phase</b>. As I say: <b>"you need users early and often"</b>.']
          ]} />
        `),

        // 16 · put them in order
        page(html`
          <${Box} kind="pencil" title=${t('Put them in order', 'رتّبهم')}><p className="hf-p small">${X('Pick a model, then tap its steps <b>from first to last</b>. Solve all four tabs.', 'اختار model، وبعدين دوس على الخطوات بتاعته <b>من الأولى للأخيرة</b>. حل التابات الأربعة كلهم.')}</p></${Box}>
          <${ModelOrder} />
        `, { sec: t('Exercises: the models', 'تمارين: الـ models') }),

        // 17 · match the model to its fingerprint
        page(html`
          <${H2}>${t('Whose fingerprint is this?', 'دي بصمة مين؟')}</${H2}>
          <${P} small=${true}>${t('Tap a model, then the detail that belongs only to it.', 'دوس على الـ model، وبعدين على التفصيلة اللي بتاعته هو بس.')}</${P}>
          <${Match} id="fp" left=${['Double diamond', 'Simple lifecycle', 'Design Sprints', "Joyner's cycle", 'Google UCD']}
            right=${A ? [
              'بيبدأ بالـ Need finding، والـ users لازم ييجوا بدري وكتير',
              'فيه خطوة اسمها Specify، لأهم user problem',
              'من الـ Problem للـ Design Brief للـ Solution',
              'خمس خطوات في دايرة اسمها Iterate',
              'الـ Evaluating بس اللي ليه سهم للـ Final product'
            ] : [
              'Starts at Need finding; "you need users early and often"',
              'Has a Specify step: the most important user problem',
              'From the Problem, to the Design Brief, to the Solution',
              'Five steps in a cycle labelled Iterate (Knapp et al.)',
              'Only Evaluating has an arrow out to the Final product'
            ]}
            answer=${[2, 4, 3, 0, 1]} />
        `),

        // 18 · where is user research (last year)
        page(html`
          <${Ly} />
          <${H1}>${t('Where is "user research"?', 'فين الـ "user research"؟')}</${H1}>
          <${P} small=${true}>${X('Joyner and Google <b>do not give it a separate step</b>, because it is <b>integral to every phase</b>, and to avoid seeing it as a <b>one-time step at the beginning</b>.',
            'الـ Joyner والـ Google <b>مش بيدّوه خطوة لوحده</b>، لأنه <b>جزء أساسي من كل phase</b>، وعشان محدش يفتكره <b>خطوة بتتعمل مرة واحدة في الأول</b>.')}</${P}>
          ${li(A ? ['الـ Joyner بيقول:<span class="ltr"><b>"you need users early and often"</b></span>', 'الـ Google: الـ user research مستمر، وبيحصل <b>قبل وأثناء وبعد</b> مرحلة الـ design.']
            : ['Joyner: <b>"you need users early and often"</b>.', 'Google: user research is continuous and happens <b>before, during and after</b> the design phase.'])}
          <${P} small=${true}>${X('So why did our process list it as component 1? Making it <b>explicit still helps</b>: it avoids <b>underestimating</b> it, and it is increasingly a role for <b>specialized professionals</b>.',
            'طب ليه الـ process بتاعتنا حطّاه component رقم 1؟ إنك تخليه <b>واضح لوحده برضه مفيد</b>: بيمنع إنك <b>تستهون بيه</b>، وكمان بقى أكتر وأكتر وظيفة لناس <b>متخصصين</b>.')}</${P}>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t("I'm not missing from the diagrams. I'm in all of them at once.", 'أنا مش ناقص من الرسومات. أنا موجود فيهم كلهم في نفس الوقت.')}</${Talk}>
        `, { sec: t('User research', 'الـ User research') }),

        // 19 · who does UI/UX (last year)
        page(html`
          <${Ly} />
          <${H2}>${t('Who does UI/UX design?', 'مين بيعمل الـ UI/UX design؟')}</${H2}>
          <div className="hf-hci2-who hf-in">
            <div><p>${X('A <b>software engineer</b> designing the whole system, often knowing <b>little about HCI</b>.', 'الـ <b>software engineer</b> بيصمم الـ system كله، وغالبًا يعرف <b>حاجة بسيطة عن الـ HCI</b>.')}</p><div className="ppl"><span>software engineer</span></div></div>
            <div><p>${X('A <b>UI/UX designer</b> on the development team: increasingly common in <b>small and medium</b> companies.', 'أو <b>designer</b> للـ <bdi dir="ltr">UI/UX</bdi> في فريق الـ development، وده بقى منتشر أكتر في الشركات <b>الصغيرة والمتوسطة</b>.')}</p><div className="ppl"><span>UI/UX designer</span></div></div>
            <div><p>${X('<b>Specialists</b> for each role in <b>big companies</b> like Google:', 'أو <b>specialists</b> لكل دور في <b>الشركات الكبيرة</b> زي Google:')}</p><div className="ppl"><span>UX researcher</span><span>UX designer</span><span>visual designer</span><span>UX engineer</span></div></div>
          </div>
          <${Hand} tilt=${true}>${t('Notice the first specialist on the list: the UX researcher. That is user research becoming a job of its own.', 'لاحظ أول specialist في الليستة: الـ UX researcher. ده الـ user research وهو بيبقى وظيفة لوحده.')}</${Hand}>
        `),

        // 20 · practical issues
        page(html`
          <${H1}>${t('Some practical issues', 'شوية practical issues')}</${H1}>
          <${P} small=${true}>${t('Knowing the models is one thing. Doing it, you hit five questions:', 'إنك تعرف الـ models حاجة، وإنك تشتغل بيهم حاجة تانية. هتقابلك خمس أسئلة:')}</${P}>
          <div className="hf-hci2-iss hf-in">
            ${(A ? ['مين الـ users؟', 'إيه احتياجات الـ users؟', 'إزاي نطلّع alternative designs؟', 'إزاي نختار من بين الـ alternatives؟', 'إزاي ندمج الـ interaction design activities مع الـ lifecycle models التانية؟']
              : ['Who are the users?', "What are the users' needs?", 'How to generate alternative designs?', 'How to choose among alternatives?', 'How to integrate interaction design activities with other lifecycle models?']).map((x, k) => html`<div key=${k}><b>?</b><span>${x}</span></div>`)}
          </div>
          <${Grow} />
          <${Hand} arrow="up">${t('the next pages take them one at a time', 'الصفحات الجاية بتاخدهم واحد واحد')}</${Hand}>
        `, { sec: t('Practical issues', 'الـ practical issues') }),

        // 21 · who are the users
        page(html`
          <${H2}>${t('Who are the users / stakeholders?', 'مين الـ users / الـ stakeholders؟')}</${H2}>
          <${P} small=${true}>${X('Who the users are is <b>not obvious</b>.', 'مين هم الـ users ده <b>مش حاجة واضحة</b>.')}</${P}>
          <div className="hf-hci2-three hf-in" style=${{ gridTemplateColumns: '1fr' }}>
            <div><b>382</b><span>${X('distinct types of users for <b>smartphone apps</b> (Sha Zhao et al, 2016)', 'نوع مختلف من الـ users للـ <b>smartphone apps</b> (<bdi dir="ltr">Sha Zhao et al, 2016</bdi>)')}</span></div>
          </div>
          ${li(A ? [
            'منتجات كتير معمولة لقطاعات كبيرة من الناس، فالـ <b>user بيبقى "everybody"</b>.',
            'الـ <b>Stakeholders</b> مجموعة <b>أكبر من الـ direct users</b>.',
            'إنك <b>تحدد الـ stakeholders</b> بيساعدك تعرف مين تدخّله في الـ interaction design activities.'
          ] : [
            'Many products are meant for large sections of the population, so the <b>user is "everybody"</b>.',
            '<b>Stakeholders</b> are a group <b>larger than the direct users</b>.',
            '<b>Identifying stakeholders</b> helps identify the groups to include in interaction design activities.'
          ])}
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('The football app: the fans are the direct users. Who else is a stakeholder?', 'تطبيق الكورة: المشجعين هم الـ direct users. مين كمان stakeholder؟')}</p></${Box}>
        `),

        // 22 · users' needs
        page(html`
          <${H2}>${t("What are the users' needs?", 'إيه احتياجات الـ users؟')}</${H2}>
          <${Talk} who="dev">${t("Easy. I'll just ask them what they want.", 'سهلة. هسألهم عايزين إيه وخلاص.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Careful: <b>users rarely know what is possible.</b>', 'خلّي بالك: <b>الـ users نادرًا ما بيعرفوا إيه الممكن.</b>')}</${Talk}>
          <${P} small=${true}>${t('Instead:', 'بدل كده:')}</${P}>
          ${li(A ? ['<b>استكشف الـ problem space</b>.', '<b>ادرس مين الـ users</b>.', '<b>ادرس الـ user activities</b> عشان تشوف إيه اللي ممكن يتحسن.']
            : ['<b>Explore the problem space</b>.', '<b>Investigate who the users are</b>.', '<b>Investigate user activities</b> to see what can be improved.'])}
          <${Hand} red=${true}>${X("Focus on people's goals, usability, and user experience goals.", 'ركّز على أهداف الناس (goals)، والـ usability، والـ user experience goals.')}</${Hand}>
        `),

        // 23 · research by WHEN (last year)
        page(html`
          <${Ly} />
          <${H2}>${t('Types of user research by WHEN', 'أنواع الـ user research حسب إمتى')}</${H2}>
          <div className="hf-hci2-when hf-in">
            <div><span className="wh">${t('before', 'قبل')}</span><span className="nm">Foundational</span><span className="al">strategic / generative</span><span className="gl">${t('before anything is designed: find user problems and what to build; talk about pain points', 'قبل أي تصميم: مشاكل الـ users وإيه اللي هنبنيه، والـ pain points')}</span></div>
            <div className="mid"><span className="wh">${t('during', 'أثناء')}</span><span className="nm">Tactical</span><span className="al">design</span><span className="gl">${t('during the design phase: how to build it, with user feedback on prototypes', 'أثناء الـ design: هنبنيه إزاي، بـ feedback على الـ prototypes')}</span></div>
            <div><span className="wh">${t('after', 'بعد')}</span><span className="nm">Post-launch</span><span className="al">${'\u00a0'}</span><span className="gl">${t('did we succeed? does the system meet user needs?', 'هل نجحنا؟ هل الـ system بيلبّي احتياجات الـ users؟')}</span></div>
          </div>
          <div className="hf-hci2-pd hf-in"><span></span><span></span><span></span></div>
          <p className="hf-hci2-pdl hf-in">${t('the design phase', 'مرحلة الـ design')}</p>
          <${P} small=${true}>${X('Foundational research also <b>reveals opportunities the team would not think of</b>.', 'والـ foundational research كمان <b>بيطلّعلك فرص الفريق مكانش هيفكر فيها</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('In the 2025/26 and 2024/25 exams: "Tactical research takes place <b>after</b> the design phase" is <b>False</b>. Tactical is <b>during</b>; after launch is post-launch.',
            'في امتحانات <bdi dir="ltr">2025/26</bdi> و<bdi dir="ltr">2024/25</bdi> الجملة دي <b>غلط</b>:<span class="ltr">"Tactical research takes place after the design phase"</span>الـ tactical <b>أثناء</b> الـ design، واللي بعد الـ launch اسمه post-launch.')}</p></${Box}>
        `, { sec: t('Research by when and who', 'الـ research حسب إمتى ومين') }),

        // 24 · sort by WHEN
        page(html`
          <${Box} kind="pencil" title=${t('When does it happen?', 'بيحصل إمتى؟')}><p className="hf-p small">${X('Our football-app research plan (ours). Tap <b>F</b> Foundational, <b>T</b> Tactical or <b>P</b> Post-launch.', 'خطة research لتطبيق الكورة (من عندنا). دوس <b>F</b> للـ Foundational، أو <b>T</b> للـ Tactical، أو <b>P</b> للـ Post-launch.')}</p></${Box}>
          <${Sort} id="when" bins=${[['F', 'Foundational'], ['T', 'Tactical'], ['P', 'Post-launch']]} items=${A ? [
            ['بنسأل المشجعين عن الـ pain points قبل ما نصمم أي حاجة', 0],
            ['بنوري المشجعين prototype لشاشة الماتش وناخد رأيهم', 1],
            ['بعد ما نزل: هل نجحنا؟', 2],
            ['بندوّر على فرص الفريق مكانش هيفكر فيها', 0],
            ['بنقرر صفحة الإحصائيات هتتبني إزاي، بـ feedback على الـ prototypes', 1],
            ['بعد الـ launch: هل التطبيق بيلبّي احتياجات المشجعين؟', 2]
          ] : [
            ['Asking fans about their pain points before anything is designed', 0],
            ['Showing fans a prototype of the match screen for feedback', 1],
            ['After release: did we succeed?', 2],
            ['Looking for opportunities the team would not think of', 0],
            ['Deciding how the statistics page should be built, from prototype feedback', 1],
            ['After launch: does the app meet the fans\' needs?', 2]
          ]} />
        `),

        // 25 · research by WHO (last year)
        page(html`
          <${Ly} />
          <${H2}>${t('Types of user research by WHO', 'أنواع الـ user research حسب مين')}</${H2}>
          <div className="hf-hci2-src hf-in">
            <div><b>Primary</b><p>${X('research <b>you conduct yourself</b>: interviews, focus groups, surveys, usability studies, participant observations.', 'research <b>إنت بتعمله بنفسك</b>: الـ interviews والـ focus groups والـ surveys والـ usability studies والـ participant observations.')}</p></div>
            <div><b>Secondary</b><p>${X('research <b>done by someone else</b>: books, journals and similar.', 'research <b>حد تاني عمله</b>: الكتب والـ journals وحاجات شبه كده.')}</p></div>
          </div>
          <${P} small=${true}>${X('Secondary research is important <b>early</b>, to gather <b>statistics, facts and figures</b>. It <b>saves effort and time</b> and <b>backs up primary findings</b>.',
            'الـ secondary research مهم <b>في الأول</b> عشان تجمع <b>statistics وحقائق وأرقام</b>. بيوفّر <b>مجهود ووقت</b> وبيدعم الـ <b>primary findings</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('From the exams: "Primary research is done by someone else": <b>False</b>. An <b>interview</b> is <b>not</b> a source of secondary research, and observing users in usability testing is <b>not</b> secondary either. Both are primary.',
            'من الامتحانات: الجملة دي <b>غلط</b>:<span class="ltr">"Primary research is done by someone else"</span>والـ <b>interview</b> <b>مش</b> مصدر للـ secondary research، ومراقبة الـ users في الـ usability testing <b>مش</b> secondary برضه. الاتنين primary.')}</p></${Box}>
        `),

        // 26 · sort primary vs secondary
        page(html`
          <${Box} kind="pencil" title=${t('Yourself or someone else?', 'إنت ولا حد تاني؟')}><p className="hf-p small">${X('Tap <b>P</b> for primary or <b>S</b> for secondary research.', 'دوس <b>P</b> للـ primary أو <b>S</b> للـ secondary research.')}</p></${Box}>
          <${Sort} id="who" bins=${[['P', 'Primary'], ['S', 'Secondary']]} items=${A ? [
            ['الـ Interviews مع الـ users', 0], ['قراية research papers قديمة عن الـ UX', 1], ['الـ Focus groups', 0], ['الكتب عن تصميم الـ interfaces', 1],
            ['الـ Surveys', 0], ['الـ Academic journals', 1], ['الـ Usability studies', 0], ['الـ Participant observations', 0], ['أرقام من دراسات اتعملت قبل كده', 1]
          ] : [
            ['Interviews with users', 0], ['Reading previous research papers on UX', 1], ['Focus groups', 0], ['Books on interface design', 1],
            ['Surveys', 0], ['Academic journals', 1], ['Usability studies', 0], ['Participant observations', 0], ['Figures from past studies', 1]
          ]} />
        `),

        // 27 · interview: secondary research
        page(html`
          <${Interview} title=${t('Secondary Research, exposed', 'الـ Secondary Research على المكشوف')} sub=${t("This week's interview: the research nobody on the team had to do.", 'حوار الأسبوع: الـ research اللي محدش في الفريق اضطر يعمله.')} lines=${A ? [
            ['المذيع', 'إنت مش research بجد، صح؟ حد تاني عملك.'],
            ['الـ Secondary', 'وده بالظبط تعريفي: <b>research حد تاني عمله</b>، في كتب وjournals وحاجات شبه كده.'],
            ['المذيع', 'وإمتى الفريق محتاجك؟'],
            ['الـ Secondary', '<b>في الأول</b>، عشان يجمع <b>statistics وحقائق وأرقام</b>. وبوفّر <b>مجهود ووقت</b>.'],
            ['المذيع', 'يعني نستغنى بيك عن الـ primary research؟'],
            ['الـ Secondary', 'لأ! أنا <b>بدعم الـ primary findings</b>، مش بلغيها.'],
            ['المذيع', 'وإيه اللي مميزك؟'],
            ['الـ Secondary', 'غالبًا بيعملني <b>researchers عندهم خبرة في organizations موثوقة</b>، وده صعب تكرره.'],
            ['المذيع', 'ومشكلتك؟'],
            ['الـ Secondary', 'ناس كتير <b>مش عارفين يستخدموني</b>. الكورسات (psychology وcognition) ومجتمعات الـ <bdi dir="ltr">HCI/UX</bdi> بتساعد.']
          ] : [
            ['Head First', "You're not real research, are you? Someone else did you."],
            ['Secondary', "That's my definition: <b>research done by someone else</b>, in books, journals and similar."],
            ['Head First', 'When does a team need you?'],
            ['Secondary', '<b>Early</b>, to gather <b>statistics, facts and figures</b>. I <b>save effort and time</b>.'],
            ['Head First', 'So you replace primary research?'],
            ['Secondary', 'No! I <b>back up primary findings</b>; I don\'t cancel them.'],
            ['Head First', "What's special about you?"],
            ['Secondary', "I'm often done by <b>experienced researchers at credible organizations</b>. That's hard to replicate."],
            ['Head First', 'Any weakness?'],
            ['Secondary', 'Many practitioners <b>don\'t know how to use me</b>. Courses (psychology, cognition) and HCI/UX communities help.']
          ]} />
        `),

        // 28 · generating alternatives
        page(html`
          <${H1}>${t('How to generate alternatives', 'إزاي تطلّع alternatives')}</${H1}>
          <${Talk} who="dev">${t('My first design works. Why would I make three more?', 'أول design عملته شغال. هعمل تلاتة كمان ليه؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('<b>Humans tend to stick with something that works.</b> But <b>considering alternatives helps identify better designs.</b>', '<b>البني آدمين بيميلوا يفضلوا ماسكين في الحاجة اللي شغالة.</b> بس <b>إنك تفكر في alternatives بيساعدك تلاقي designs أحسن.</b>')}</${Talk}>
          <${P} small=${true}>${t('Where do alternative designs come from?', 'الـ alternative designs بتيجي منين؟')}</${P}>
          ${li(A ? [
            'الـ <b>"Flair and creativity"</b>، يعني research وsynthesis.',
            'الـ <b>Cross-fertilization of ideas</b>: أفكار من وجهات نظر مختلفة.',
            '<b>الـ users نفسهم</b> ممكن يطلّعوا designs مختلفة.',
            '<b>دوّر على inspiration</b>: منتجات وdomain شبه بعض، أو منتجات وdomain مختلفين.'
          ] : [
            '<b>"Flair and creativity"</b>: research and synthesis.',
            '<b>Cross-fertilization of ideas</b> from different perspectives.',
            '<b>Users</b> can generate different designs.',
            '<b>Seek inspiration</b>: similar products and domain, or different products and domain.'
          ])}
        `, { sec: t('Alternatives', 'الـ Alternatives') }),

        // 29 · choosing
        page(html`
          <${H1}>${t('How to choose among alternatives', 'إزاي تختار من بين الـ alternatives')}</${H1}>
          <${P} small=${true}>${X('Interaction design focuses on <b>externally-visible and measurable behavior</b>. So judge alternatives on:', 'الـ interaction design بيركز على <b>الـ behavior اللي باين من برّه واللي يتقاس (externally-visible and measurable)</b>. فقيّم الـ alternatives على:')}</${P}>
          ${li(A ? [
            'الـ <b>Technical feasibility</b>: ينفع يتنفّذ تقنيًا؟',
            'الـ <b>Evaluation مع الـ users أو الـ peers</b>: استخدم <b>prototypes مش static documentation</b>، لأن <b>الـ behavior هو المفتاح</b>.',
            'الـ <b>Quality thresholds</b>: <b>كل مجموعة stakeholders ليها thresholds مختلفة</b>، والـ <b>usability والـ UX goals</b> بيوصلوك للـ criteria المناسبة.'
          ] : [
            '<b>Technical feasibility</b>.',
            '<b>Evaluation with users or peers</b>: use <b>prototypes, not static documentation</b>, because <b>behavior is key</b>.',
            '<b>Quality thresholds</b>: <b>different stakeholder groups have different quality thresholds</b>; <b>usability and user experience goals</b> lead to relevant criteria.'
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("The 2026/27 midterm: several ideas, limited time and resources? <b>Select the most suitable ideas based on requirements</b>, not \"develop every idea\". And when a prototype gets negative feedback: <b>improve it based on the feedback</b>.",
            'في ميدترم <bdi dir="ltr">2026/27</bdi>: عندك أفكار كتير ووقت وموارد قليلة؟ <b>اختار الأفكار الأنسب حسب الـ requirements</b>، مش تطوّر كل الأفكار. ولو الـ prototype جاله feedback وحش: <b>حسّنه على أساس الـ feedback</b>.')}</p></${Box}>
        `),

        // 30 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه prototypes ومش document كويس بيوصف الـ design؟', 'لأن <b>الـ behavior هو المفتاح</b>. الـ document ثابت (static) مش بيوريك الـ design بيتصرف إزاي، والـ prototype بيوريك.'],
            ['يعني إيه quality threshold مختلف لكل stakeholder group؟', 'كل مجموعة ليها حد أدنى للجودة يرضيها، ومش لازم يبقى زي التانية. والـ usability والـ UX goals بيدّوك الـ criteria اللي تقيس بيها.'],
            ['الـ users ممكن يصمموا بجد؟', 'السلايد بتقول آه: <b>الـ users ممكن يطلّعوا designs مختلفة</b>. بس افتكر برضه إنهم نادرًا ما بيعرفوا إيه الممكن.'],
            ['هو الـ design الحلو كفاية لو مينفعش يتنفّذ؟', 'لأ. الـ <b>technical feasibility</b> واحدة من حاجات الاختيار.']
          ] : [
            ['Why prototypes and not a good document describing the design?', 'Because <b>behavior is key</b>. A static document cannot show how the design behaves; a prototype can.'],
            ['What does "different quality thresholds" mean?', 'Each stakeholder group has its own bar for "good enough", and they need not match. Usability and user experience goals give you the criteria to measure against.'],
            ['Can users really design?', 'The slide says yes: <b>users can generate different designs</b>. Just remember they also rarely know what is possible.'],
            ['Is a great design enough if it cannot be built?', 'No. <b>Technical feasibility</b> is one of the ways to choose.']
          ]} />
        `),

        // 31 · the activity
        page(html`
          <${H2}>${t('Activity: a mobile app for football lovers', 'نشاط: mobile app لمحبين الكورة')}</${H2}>
          <${P} small=${true}>${X('From the slides: you are designing a <b>mobile app for football lovers</b> to watch matches and know results and statistics.', 'من السلايدز: إنت بتصمم <b>mobile app لمحبين الكورة</b> يتفرجوا فيه على الماتشات ويعرفوا النتايج والإحصائيات.')}</${P}>
          <${Box} kind="brain">${li(A ? ['فكّر في layout للـ interface تشوفه usable وسهل.', 'تقدر تعمل <b>plan للـ user research</b>؟ هتعمله إزاي عشان تفهم احتياجاتهم وتفضيلاتهم؟', 'إزاي <b>تجمع usage data</b> زي ما <b>Microsoft عملت في الـ Office 2007</b>؟ إيه الـ data المفيدة، وإزاي تحسّن الـ UI؟']
            : ['Think of an interface layout you would consider usable and easy.', 'Can you make a <b>plan of user research</b>? How would you run it to understand user needs and preferences?', 'How could you <b>gather usage data</b> the way <b>Microsoft did for Office 2007</b>? What data helps, and how does it improve the UI?'])}</${Box}>
          <${Hand}>${X('From Lecture 1: Microsoft\'s <b>CEIP</b> collected <b>anonymous</b> usage data: <b>1.3+ billion sessions</b>.', 'من محاضرة 1: الـ <b>CEIP</b> بتاع Microsoft جمع usage data <b>anonymous</b>: أكتر من <b><bdi dir="ltr">1.3 billion</bdi> sessions</b>.')}</${Hand}>
          <${Grow} />
          <${Reveal} id="plan" label=${t('Show our sketch of a plan', 'ورّيني خطة من عندنا')}>
            <p className="hf-p small">${X('<b>Ours, not the slides\' (they give no answer):</b> secondary research first for statistics; foundational interviews with fans; tactical prototype tests of the match screen; post-launch usage data (which screens and features fans use most) to improve the UI.',
              '<b>من عندنا، السلايدز مش بتدي إجابة:</b> secondary research الأول للأرقام، وبعدين foundational interviews مع المشجعين، وtactical tests على prototype لشاشة الماتش، وبعد الـ launch نجمع usage data (أنهي شاشات ومميزات بيستخدموها أكتر) عشان نحسّن الـ UI.')}</p>
          </${Reveal}>
        `, { sec: t('Activity', 'النشاط') }),

        // 32–34 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' exams and midterm. Tap an answer to see why.", 'أسئلة حقيقية من امتحانات الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /main purpose of the Decide stage/i)}
          ${mq('m2', /Tactical research takes place after/i)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m3', /Primary research is done by someone else/i)}
          <${Gap} h=${6} />
          ${mq('m4', /NOT a source of secondary research/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('rule of thumb: if you talk to the user yourself, it is primary', 'قاعدة بسيطة: لو إنت اللي بتكلّم الـ user بنفسك، يبقى primary')}</${Hand}>
        `),
        page(html`
          ${mq('m5', /main goal of Google Design Sprints/i)}
          <${Gap} h=${6} />
          ${mq('m7', /Focus groups and interviews are examples/i)}
        `),
        page(html`
          ${mq('m6', /several ideas but limited time/i)}
          <${Gap} h=${6} />
          ${mq('m8', /Analyzing academic papers/i)}
        `),

        // 35 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ interaction design <b>process</b> حوالين الـ users وأهدافهم، والمفتاح إنك تطلّع alternatives وتختار منهم.',
            'التلات components: الـ <b>user research</b>، والـ <b>design and prototyping</b>، والـ <b>evaluation</b>.',
            'الـ UCD: احتياجات الـ user في <b>كل خطوة</b>، مش functional specification.',
            'الـ double diamond:<span class="ltr"><b>Discover → Define → Develop → Deliver</b></span>',
            'الـ Sprint خمس خطوات تبدأ بالـ Unpack، والـ Joyner بيبدأ بالـ Need finding، والـ Google:<span class="ltr">Understand → Specify → Design → Evaluate</span>',
            'الـ user research جوّه <b>كل phase</b>: <bdi dir="ltr">"users early and often"</bdi>.',
            'حسب إمتى: الـ <b>foundational</b> قبل، والـ <b>tactical</b> أثناء، والـ <b>post-launch</b> بعد. حسب مين: الـ <b>primary</b> بنفسك، والـ <b>secondary</b> حد تاني.',
            'الاختيار: <b>technical feasibility</b>، و<b>prototypes مش documents</b>، و<b>quality thresholds</b>.'
          ] : [
            'Interaction design is a <b>process</b>: requirements, design, prototypes, evaluation, around users and their goals. Generating and choosing alternatives is key.',
            'Three components: <b>user research</b>, <b>design and prototyping</b>, <b>evaluation</b>.',
            "UCD: the user's needs at <b>every step</b>, not a functional specification.",
            'Double diamond: <b>Discover → Define → Develop → Deliver</b>.',
            'Sprint: five steps from Unpack to Test. Joyner: four phases from Need finding. Google: Understand → Specify → Design → Evaluate.',
            'User research is in <b>every phase</b>: "users early and often".',
            'By when: <b>foundational</b> before, <b>tactical</b> during, <b>post-launch</b> after. By who: <b>primary</b> yourself, <b>secondary</b> someone else.',
            'Choosing: <b>technical feasibility</b>, <b>prototypes not documents</b>, <b>quality thresholds</b>.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 36 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="lens">${X('Next time: <b>cognition</b>, attention and perception. Bring your brain, literally.', 'المرة الجاية: الـ <b>cognition</b>، الـ attention والـ perception. هات مخك معاك، بجد.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [2], t: Date.now() } }}>${t('Quiz me on Lecture 2', 'امتحنّي في محاضرة 2')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 2, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 2, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

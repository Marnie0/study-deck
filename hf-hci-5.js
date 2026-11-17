// Head First chapter for Human Computer Interaction Lecture 5 (built on hf.js), English + Egyptian Arabic, same pages in both.
// UI vs UX (definitions, the two wheels, what each designer focuses on, the pizza app, skills and Figma), the invisible interface
// (pointer to L1), the UX design process (three components and the slide's cycle), user research (users, tasks, earlier research),
// surveys (what they are, where they fit, tips), and from last year's slides: secondary research benefits, quantitative vs
// qualitative, primary vs secondary, general tips for research methods, privacy and security (PII vs SPII).
// Every fact comes from the lecture's notes; scenarios in the exercises and analogies are marked as ours.
// ‡ the survey-tips slide prints "response rate reliability of data" with the "and" missing (the notes flag it).
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T5 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci5')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci5';
    s.textContent = `
.hfb .hf-hci5-split{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci5-split > div{ border:2px solid var(--hf-line); border-radius:10px; padding:7px 8px 8px; background:var(--paper); display:flex; flex-direction:column; gap:5px; min-width:0; }
.hfb .hf-hci5-split .hd{ font:800 18px/1 var(--body); color:var(--ink); margin:0; }
.hfb .hf-hci5-split .hd small{ display:block; font:600 13px/1.2 var(--body); color:var(--graphite); margin-top:3px; }
.hfb .hf-hci5-sw{ display:flex; gap:4px; }
.hfb .hf-hci5-sw i{ flex:1 1 0; height:16px; border-radius:4px; border:1.5px solid var(--hf-line); }
.hfb .hf-hci5-aa{ font:800 26px/1 var(--display); color:var(--ink); margin:0; }
.hfb .hf-hci5-aa span{ font:400 15px/1 var(--mono); color:var(--graphite); margin-inline-start:6px; }
.hfb .hf-hci5-pill{ align-self:flex-start; font:700 13px/1 var(--body); padding:6px 12px; border-radius:999px; background:var(--hf-k); color:var(--paper); }
.hfb .hf-hci5-flow{ display:grid; gap:3px; }
.hfb .hf-hci5-flow span{ font:600 13px/1.15 var(--body); padding:3px 6px; border-radius:5px; border:1.5px solid var(--faint); color:var(--graphite); transition:all .35s; }
.hfb .hf-hci5-flow span.on{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-hci5-flow span.done{ color:var(--ink); border-color:var(--hf-line); }
.hfb .hf-hci5-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci5-two > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 8px; background:var(--paper); min-width:0; }
.hfb .hf-hci5-two .hd{ font:800 15px/1.15 var(--body); margin:0 0 2px; color:var(--ink); }
.hfb .hf-hci5-two .sub{ font:600 13px/1.2 var(--body); margin:0 0 5px; color:var(--hf-k); }
.hfb .hf-hci5-two ul{ list-style:none; margin:0; padding:0; display:grid; gap:4px; }
.hfb .hf-hci5-two li{ font:500 13.5px/1.25 var(--body); padding-inline-start:9px; border-inline-start:3px solid var(--hf-k); color:var(--ink); }
.hfb .hf-hci5-tbl{ border-collapse:collapse; width:100%; font:500 13.5px/1.22 var(--body); color:var(--ink); }
.hfb .hf-hci5-tbl th, .hfb .hf-hci5-tbl td{ border:1px solid var(--hf-line); padding:4px 6px; text-align:start; vertical-align:top; }
.hfb .hf-hci5-tbl th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-hci5-tbl td.k{ font-weight:700; background:var(--hf-grey); }
.hfb .hf-hci5-tbl tr.hi td{ background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); font-weight:700; }
.hfb .hf-hci5-chips{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-hci5-chips span{ font:700 13.5px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:999px; padding:4px 9px; background:var(--paper); color:var(--ink); }
.hfb .hf-hci5-chips span:nth-child(odd){ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-hci5-rules{ display:grid; gap:5px; }
.hfb .hf-hci5-rules > span{ font:600 14px/1.3 var(--body); color:var(--ink); border:1.5px solid var(--hf-line); border-inline-start:5px solid var(--hf-k); border-radius:7px; padding:5px 9px; background:color-mix(in srgb, var(--hf-k) 8%, var(--paper)); }
.hf-ar .hf-hci5-rules > span{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.45; }
.hfb .hf-hci5-three{ display:grid; gap:5px; counter-reset:c; }
.hfb .hf-hci5-three > div{ display:flex; gap:8px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); font:600 14px/1.25 var(--body); color:var(--ink); }
.hfb .hf-hci5-three > div b{ flex:none; display:inline-grid; place-items:center; width:26px; height:26px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 14px/1 var(--body); }
.hfb .hf-hci5-ord{ display:grid; gap:5px; }
.hfb .hf-hci5-ord button{ display:flex; align-items:center; gap:8px; text-align:start; font:500 14px/1.25 var(--body); padding:6px 8px; min-height:38px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci5-ord button i{ flex:none; display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; font:800 13px/1 var(--body); font-style:normal; background:var(--hf-grey2); color:var(--ink); }
.hfb .hf-hci5-ord button.on i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-hci5-ord button.ok{ border-color:var(--ok); } .hfb .hf-hci5-ord button.no{ border-color:var(--hf-red); }
.hfb .hf-hci5-ed{ border:2px solid var(--hf-line); border-radius:10px; padding:7px 8px; background:var(--paper); display:grid; gap:4px; }
.hfb .hf-hci5-ed .ttl{ font:800 14px/1.2 var(--body); margin:0 0 2px; color:var(--ink); }
.hfb .hf-hci5-ed button.q{ display:flex; align-items:center; gap:7px; text-align:start; font:500 13.5px/1.22 var(--body); padding:3px 7px; min-height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci5-ed button.q i{ flex:none; font:800 13px/1 var(--body); font-style:normal; width:18px; text-align:center; color:var(--graphite); }
.hfb .hf-hci5-ed button.q.cut span{ text-decoration:line-through; text-decoration-color:var(--hf-red); text-decoration-thickness:2px; color:var(--graphite); }
.hfb .hf-hci5-ed button.q.cut i{ color:var(--hf-red); }
.hfb .hf-hci5-ed button.q.ok{ border-color:var(--ok); } .hfb .hf-hci5-ed button.q.no{ border-color:var(--hf-red); }
.hfb .hf-hci5-ed button.q em{ font-style:normal; font:600 13px/1.1 var(--body); color:var(--hf-red); margin-inline-start:auto; flex:none; }
.hfb .hf-hci5-len{ display:flex; align-items:center; gap:8px; font:600 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-hci5-len .bar{ flex:1; height:10px; border-radius:5px; background:var(--hf-grey2); overflow:hidden; }
.hfb .hf-hci5-len .bar i{ display:block; height:100%; background:var(--hf-k); transition:width .4s; }
.hf-ar .hf-hci5-split .hd, .hf-ar .hf-hci5-split .hd small, .hf-ar .hf-hci5-flow span, .hf-ar .hf-hci5-two .hd, .hf-ar .hf-hci5-two .sub, .hf-ar .hf-hci5-two li, .hf-ar .hf-hci5-tbl, .hf-ar .hf-hci5-chips span, .hf-ar .hf-hci5-three > div, .hf-ar .hf-hci5-ord button, .hf-ar .hf-hci5-ed .ttl, .hf-ar .hf-hci5-ed button.q, .hf-ar .hf-hci5-ed button.q em, .hf-ar .hf-hci5-len, .hf-ar .hf-hci5-pill{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-hci5-two li, .hf-ar .hf-hci5-ed button.q{ font-size:13px; line-height:1.32; }
.hf-ar .hf-hci5-tbl{ font-size:13px; line-height:1.35; }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: UI is how the screen looks, UX is whether you get through the job (the slide's pizza steps)
  function Split() {
    const ar = useAr();
    const steps = ar ? ['تلاقي البيتزا', 'تظبط الأوردر', 'تدفع بسهولة', 'تتابع الـ delivery'] : ['Find a pizza', 'Customize it', 'Pay easily', 'Track delivery'];
    const [k, setK] = useState(calm() ? steps.length : 0);
    useEffect(() => {
      if (calm()) return;
      const id = setInterval(() => setK(x => (x + 1) % (steps.length + 2)), 1100);
      return () => clearInterval(id);
    }, []);
    return html`<div className="hf-hci5-split hf-in" aria-label=${ar ? 'الـ UI شكل الشاشة، والـ UX التجربة كلها' : 'UI is how the screen looks; UX is the whole experience'}>
      <div><p className="hd">UI<small>${ar ? 'الشكل والـ look and feel' : 'look and feel'}</small></p>
        <div className="hf-hci5-sw" aria-hidden="true"><i style=${{ background: 'var(--hf-k)' }}></i><i style=${{ background: '#f59e0b' }}></i><i style=${{ background: 'var(--hf-red)' }}></i><i style=${{ background: 'var(--paper)' }}></i></div>
        <p className="hf-hci5-aa" dir="ltr">Aa<span>Typography</span></p>
        <span className="hf-hci5-pill">${ar ? 'زرار الأوردر' : 'Order'}</span></div>
      <div><p className="hd">UX<small>${ar ? 'التجربة كلها' : 'the overall experience'}</small></p>
        <div className="hf-hci5-flow">${steps.map((s, j) => html`<span key=${j} className=${j === k ? 'on' : j < k ? 'done' : ''}>${j < k ? '✓ ' : ''}${s}</span>`)}</div></div>
    </div>`;
  }

  // Edit the survey: tap a question to cut it; keep only what the team needs and will use
  const SQ = [
    ['How often do you use search in the app?', 'بتستخدم الـ search في الـ app كل قد إيه؟', 0],
    ['What is your full name?', 'اسمك بالكامل إيه؟', 1],
    ['What do you search for most often?', 'أكتر حاجة بتدوّر عليها إيه؟', 0],
    ["Don't you just love our new search?", 'مش الـ search الجديد بتاعنا تحفة؟', 2],
    ['What is your home address?', 'عنوان بيتك إيه؟', 1],
    ['How easy is it to find a note with search?', 'سهل قد إيه تلاقي note بالـ search؟', 0],
    ['What is your phone number?', 'رقم تليفونك كام؟', 1],
    ['What would make search better for you?', 'إيه اللي يخلّي الـ search أحسن بالنسبالك؟', 0]
  ];
  function Editor() {
    const ar = useAr();
    const [cut, setCut] = H.K.useSlot('ed', []);
    const [c, setC] = H.K.useSlot('ed:c', false);
    const set = new Set(cut);
    const tap = j => { setC(false); setCut(set.has(j) ? cut.filter(x => x !== j) : cut.concat(j)); };
    const right = SQ.filter((q, j) => set.has(j) === (q[2] > 0)).length;
    const kept = SQ.length - cut.length;
    const why = r => r === 1 ? (ar ? 'دي PII مش هتستخدمها' : 'PII, never used') : (ar ? 'فيها bias' : 'bias');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-hci5-ed">
        <p className="ttl">${ar ? 'الـ survey عن الـ search في app الـ notes' : 'Survey: the notes app search'}</p>
        ${SQ.map((q, j) => { const st = c ? (set.has(j) === (q[2] > 0) ? ' ok' : ' no') : '';
          return html`<button key=${j} className=${'q' + (set.has(j) ? ' cut' : '') + st} aria-pressed=${String(set.has(j))} onClick=${() => tap(j)}><i>${set.has(j) ? '✗' : j + 1}</i><span>${ar ? q[1] : q[0]}</span>${c && q[2] > 0 ? html`<em>${why(q[2])}</em>` : null}</button>`; })}
        <div className="hf-hci5-len" aria-live="polite"><span>${ar ? html`الطول: <bdi>${kept}</bdi> أسئلة` : 'Length: ' + kept + ' questions'}</span><span className="bar"><i style=${{ width: (kept / SQ.length * 100) + '%' }}></i></span></div>
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!cut.length} onClick=${() => setC(true)}>${ar ? 'صحّح الـ survey' : 'Check my survey'}</button>
        <button className="hf-btn" onClick=${() => { setCut(SQ.map((q, j) => q[2] > 0 ? j : -1).filter(j => j >= 0)); setC(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${SQ.length}</bdi> صح` : right + ' / ' + SQ.length + ' right'}</span>`}
      </div></div>`;
  }

  // Put the slide's cycle back together: tap the five pieces from first to last
  const CY = [
    ['User Research', 'الـ User Research'],
    ['"Iterate to validate your ideas"', 'لفّة <bdi dir="ltr">"Iterate to validate your ideas"</bdi>'],
    ['Design', 'الـ Design'],
    ['"Iterate to design around constraints"', 'لفّة <bdi dir="ltr">"Iterate to design around constraints"</bdi>'],
    ['Build', 'الـ Build']
  ];
  const CSH = [2, 4, 0, 3, 1];
  function Cycle() {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot('cy', []);
    const [c, setC] = H.K.useSlot('cy:c', false);
    const tap = j => { setC(false); const at = seq.indexOf(j); setSeq(at >= 0 ? seq.slice(0, at) : seq.concat(j)); };
    const right = seq.filter((j, pos) => CSH[j] === pos).length;
    return html`<div className="hf-in">
      <div className="hf-hci5-ord">${CSH.map((st, j) => { const pos = seq.indexOf(j); const cls = (pos >= 0 ? 'on' : '') + (c && pos >= 0 ? (st === pos ? ' ok' : ' no') : '');
        return html`<button key=${j} className=${cls} onClick=${() => tap(j)} aria-pressed=${String(pos >= 0)}><i>${pos >= 0 ? pos + 1 : '?'}</i><span>${T5(ar ? CY[st][1] : CY[st][0])}</span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${seq.length < 5} onClick=${() => setC(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq([0, 1, 2, 3, 4].map(n => CSH.indexOf(n))); setC(true); }}>${ar ? 'ورّيني الترتيب' : 'Show the order'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 5</bdi> صح` : right + ' / 5 right'}</span>`}
      </div></div>`;
  }

  H.chapters.hci[5] = {
    title: 'UI vs UX, User Research and Surveys', kicker: 'Chapter 5', run: 'ui vs ux and user research',
    ar: { title: 'الـ UI والـ UX والـ User Research', kicker: 'الفصل 5', run: 'الـ ui والـ ux والـ user research' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 5);
      const arL = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[5]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src), with the site's Arabic why for each choice
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const exam = t('Exam corner', 'ركن الامتحان');
      const ly = t("from last year's slides", 'من سلايدز السنة اللي فاتت');

      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter lived inside the user\'s head: <b>memory</b>, <b>learning</b>, reading, speaking and listening. This one steps back and asks two questions: what is the difference between <b>UI</b> and <b>UX</b>, and how do you find out about your users <b>before</b> you design?',
            'الفصل اللي فات كان جوّه دماغ الـ user، في الـ <b>memory</b> والـ <b>learning</b> والقراية والكلام. الفصل ده بيسأل: إيه الفرق بين الـ <b>UI</b> والـ <b>UX</b>؟ وإزاي تعرف الـ users بتوعك <b>قبل</b> ما تصمم؟')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will sort, match, order and edit a survey right on the page.', '<b>حل التمارين.</b> هتصنّف وتوصّل وترتّب وتعدّل survey على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps, many from the doctors\' own papers.', '<b>خلّي بالك!</b> دي فخاخ الامتحان، وكتير منها من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slip on the slides; we say what was meant.', 'معناها غلطة في السلايدز، وبنقول المقصود.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes and exercise scenarios marked "ours" are our own, not the slides\'.', 'الملاحظات بخط الإيد والأمثلة اللي عليها "من عندنا" مننا، مش من السلايدز.')}</span></div>
          </div>
          <${P} small=${true}>${X('The second half (secondary research, quantitative vs qualitative, primary vs secondary, general tips, privacy) is <b>from last year\'s slides</b>.',
            'النص التاني (الـ secondary research، والـ quantitative والـ qualitative، والـ primary والـ secondary، والنصايح العامة، والـ privacy) <b>من سلايدز السنة اللي فاتت</b>.')}</${P}>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">5</span><span className="t">${A ? html`الفصل الخامس<br/>HCI` : html`Chapter five<br/>HCI`}</span></div>
            <${Gap} h=${4} /><${H1}>${t('Pretty Is Not Enough', 'الشكل الحلو مش كفاية')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('ui vs ux, user research and surveys', 'الـ ui والـ ux والـ user research والـ surveys')}</p></div>
          <${Split} />
          <${Talk} who="dev">${t('Lovely colours, round buttons. My app is done!', 'ألوان حلوة وزراير مدوّرة. الـ app بتاعي خلص!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('That is the <b>UI</b>. Can a hungry customer find a pizza, pay and track it? That is the <b>UX</b>. How would you know? <b>Ask the users.</b>',
            'ده الـ <b>UI</b>. طب الزبون الجعان يقدر يلاقي البيتزا ويدفع ويتابعها؟ ده الـ <b>UX</b>. وهتعرف إزاي؟ <b>اسأل الـ users.</b>')}</${Talk}>
        `, { sec: t('UI vs UX', 'الـ UI والـ UX') }),

        // 2 · two definitions
        page(html`
          <${H1}>${t('Two letters apart', 'الفرق حرف واحد')}</${H1}>
          <${Def}>${X('<b>UI Design</b> (User Interface) refers to the <b>interactivity, look and feel</b> of a product screen or web page.', 'الـ <b>UI Design</b> (User Interface) بيتكلم عن الـ <b>interactivity والـ look and feel</b> بتاع شاشة المنتج أو صفحة الويب.')}</${Def}>
          <${Def}>${X('<b>UX Design</b> (User Experience) covers a user\'s <b>overall experience</b> with the product or website.', 'الـ <b>UX Design</b> (User Experience) بيغطي <b>التجربة الكاملة</b> بتاعة الـ user مع المنتج أو الموقع.')}</${Def}>
          <${P} small=${true}>${X('In two words: UI is the <b>visual appearance</b>; UX is the <b>user experience</b>. How both differ from HCI was in Lecture 1.', 'بكلمتين: الـ UI هو الـ <b>visual appearance</b> (الشكل)، والـ UX هو الـ <b>user experience</b> (التجربة). والفرق بينهم وبين الـ HCI اتشرح في المحاضرة الأولى.')}</${P}>
          <${Hand} tilt=${true}>${t('Our analogy, not the slides\': UI is the restaurant\'s menu card and plates; UX is the whole evening, from booking a table to paying the bill.', 'تشبيه من عندنا: الـ UI هو منيو المطعم وشكل الأطباق، والـ UX هو السهرة كلها، من حجز الترابيزة لحد ما تدفع الحساب.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The midterm asked which is <b>NOT</b> a key factor in HCI. Answer: <b>machine learning</b>. User interface (UI), user experience (UX) and usability all are.',
            'الميدترم سأل أنهي واحد <b>مش</b> key factor في الـ HCI. الإجابة: الـ <b>machine learning</b>. أما الـ UI والـ UX والـ usability فكلهم key factors.')}</p></${Box}>
        `),

        // 3 · the wheels
        page(html`
          <${H2}>${t('Two wheels, fourteen words', 'عجلتين، و14 كلمة')}</${H2}>
          <${P} small=${true}>${t('The slide draws each one as a wheel. Switch between UX and UI.', 'السلايد راسمة كل واحد فيهم على شكل عجلة. بدّل بين الـ UX والـ UI.')}</${P}>
          <${Fig} name="hc-ux-ui-wheels" />
        `),

        // 4 · wheel traps + sort
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The wheels share <b>no word</b>. <b>Accessible</b> sounds like screen work: it is <b>UX</b>. <b>Content</b> sounds like experience: it is <b>UI</b>.',
            'مفيش <b>ولا كلمة</b> مشتركة بين العجلتين. الـ <b>Accessible</b> شكلها شغل شاشة، بس هي <b>UX</b>. والـ <b>Content</b> شكلها تجربة، بس هي <b>UI</b>.')}</p></${Box}>
          <${Box} kind="pencil" title=${t('Which wheel, which list?', 'أنهي عجلة، وأنهي لستة؟')}><p className="hf-p small">${t('Wheels, focus lists and skills, mixed up. Tap UI or UX.', 'كلمات من العجلتين واللستات والـ skills. دوس UI أو UX.')}</p></${Box}>
          <${Sort} id="uiux" bins=${[['UI', 'UI'], ['UX', 'UX']]} items=${A ? [
            ['الـ Typography', 0], ['الـ Credible', 1], ['الـ wireframes والـ prototypes', 1],
            ['الـ consistency بين الشاشات', 0], ['مهارة الـ color theory', 0], ['مهارة الـ information architecture', 1]
          ] : [
            ['Typography', 0], ['Credible', 1], ['Wireframes and prototypes', 1],
            ['Consistency across screens', 0], ['Color theory (a skill)', 0], ['Information architecture (a skill)', 1]
          ]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 5 · what each designer focuses on
        page(html`
          <${H2}>${t('Who works on what?', 'مين بيشتغل على إيه؟')}</${H2}>
          <div className="hf-hci5-two hf-in">
            <div><p className="hd">${t('UI designers', 'الـ UI designers')}</p><p className="sub">${t('visual appearance', 'الـ visual appearance')}</p>
              <ul>${(A ? ['الألوان والـ typography', 'الزراير والـ icons', 'الـ layout والـ spacing', 'الصور والـ visual style', 'الـ consistency بين الشاشات'] : ['Colors and typography', 'Buttons and icons', 'Layout and spacing', 'Images and visual style', 'Consistency across screens']).map((x, j) => html`<li key=${j}>${x}</li>`)}</ul></div>
            <div><p className="hd">${t('UX designers', 'الـ UX designers')}</p><p className="sub">${t('user experience', 'الـ user experience')}</p>
              <ul>${(A ? ['احتياجات الـ user والـ research', 'الـ user journeys والـ flows', 'الـ wireframes والـ prototypes', 'سهولة الاستخدام', 'الـ usability testing'] : ['User needs and research', 'User journeys and flows', 'Wireframes and prototypes', 'Ease of use', 'Usability testing']).map((x, j) => html`<li key=${j}>${x}</li>`)}</ul></div>
          </div>
          <${Talk} who="dev">${t('Wireframes are drawings. Shouldn\'t they be UI?', 'الـ wireframes دي رسومات. مش المفروض تبقى UI؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Not on this slide. <b>Wireframes and prototypes</b> are on the <b>UX</b> list: they plan the flow, not the colours.', 'مش في السلايد دي. الـ <b>wireframes والـ prototypes</b> في لستة الـ <b>UX</b>: بيخططوا للـ flow، مش للألوان.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('screens and how they look → UI · the user\'s path through them → UX', 'الشاشات وشكلها يبقى UI، وطريق الـ user جوّاها يبقى UX')}</${Hand}>
        `),

        // 6 · focus figure
        page(html`
          <${Fig} name="hc-ui-ux-focus" />
        `),

        // 7 · the pizza app
        page(html`
          <${H1}>${t('Let\'s order a pizza', 'يلا نطلب بيتزا')}</${H1}>
          <${P} small=${true}>${t('The slide\'s example: you are designing an app to order pizza. Who does what?', 'مثال السلايد: إنت بتصمم app لطلب البيتزا. مين بيعمل إيه؟')}</${P}>
          <${Def}>${X('<b>UI designer</b>: decides how the <b>pizza photos</b> look, which <b>colors</b> the app uses, the <b>shape of the buttons</b>, and <b>where the text appears</b>.',
            'الـ <b>UI designer</b>: بيقرر شكل <b>صور البيتزا</b>، و<b>الألوان</b> اللي الـ app هيستخدمها، و<b>شكل الزراير</b>، و<b>الكلام هيظهر فين</b>.')}</${Def}>
          <${Def}>${X('<b>UX designer</b>: makes sure customers can <b>find a pizza</b>, <b>customize their order</b>, <b>pay easily</b>, and <b>track delivery</b> without confusion.',
            'الـ <b>UX designer</b>: بيتأكد إن الزبون يقدر <b>يلاقي البيتزا</b>، و<b>يظبط الأوردر</b>، و<b>يدفع بسهولة</b>، و<b>يتابع الـ delivery</b> من غير ما يتلخبط.')}</${Def}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Can a <b>beautiful</b> app be bad? Can an <b>ugly</b> one be good? Decide, then turn the page.',
            'ينفع app <b>جميل</b> يبقى وحش؟ وينفع app <b>شكله وحش</b> يبقى كويس؟ قرّر، واقلب الصفحة.')}</p></${Box}>
        `, { sec: t('The pizza app', 'الـ pizza app') }),

        // 8 · pizza figure
        page(html`
          <${Fig} name="hc-pizza-app" />
        `),

        // 9 · the rule + sort
        page(html`
          <div className="hf-hci5-rules hf-in">
            <span>${X('Beautiful app + confusing navigation = <b>good UI, poor UX</b>', 'لو الـ app جميل والـ navigation ملخبط، يبقى <b>UI كويس بس UX وحش</b>')}</span>
            <span>${X('Easy to use + unattractive visuals = may be <b>good UX, poor UI</b>', 'سهل في الاستخدام وشكله مش حلو، ممكن يبقى <b>UX كويس بس UI وحش</b>')}</span>
          </div>
          <${Box} kind="pencil"><p className="hf-p small">${X('Which one is <b>good</b> here, UI or UX? (Our examples.)', 'مين اللي <b>كويس</b> هنا، الـ UI ولا الـ UX؟ (أمثلة من عندنا.)')}</p></${Box}>
          <${Sort} id="pizza" bins=${[['UI', t('Good UI, poor UX', 'الـ UI كويس والـ UX وحش')], ['UX', t('Good UX, poor UI', 'الـ UX كويس والـ UI وحش')]]} items=${A ? [
            ['صور بيتزا تجنن، بس زرار الدفع مستخبي بعد تلات شاشات', 0],
            ['شاشات رمادي باهتة، بس الأوردر بيخلص في تلات دوسات سهلة', 1],
            ['ألوان حلوة وزراير مدوّرة، بس مش لاقي إزاي تتابع الـ delivery', 0],
            ['خطوط وحشة، بس بتظبط البيتزا من غير أي لخبطة', 1],
            ['تصميم يخطف العين، والزباين بيتوهوا في القوايم', 0],
            ['صور باهتة، بس الدفع سريع وسهل', 1]
          ] : [
            ['Gorgeous pizza photos, but the pay button hides three screens deep', 0],
            ['Plain grey screens, but ordering takes three easy taps', 1],
            ['Lovely colours and round buttons, but no way to find delivery tracking', 0],
            ['Ugly fonts, but you customize your pizza without any confusion', 1],
            ['A stunning layout, and customers keep getting lost in the menus', 0],
            ['Dull images, but paying is quick and easy', 1]
          ]} />
        `),

        // 10 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: UI and UX, about who really makes an app good.', 'قعدة الليلة: الـ UI والـ UX، مين فيهم بجد اللي بيخلّي الـ app كويس.')} />
          <${Chat} names=${A ? ['الـ UI', 'الـ UX'] : ['UI', 'UX']} lines=${A ? [
            [0, 'أنا الـ <b>look and feel</b> والـ interactivity بتاعة الشاشة: الألوان والـ typography والزراير والـ layout.'],
            [1, 'وأنا <b>التجربة الكاملة</b> بتاعة الـ user مع المنتج كله.'],
            [0, 'الناس بتشوفني أنا الأول. صور البيتزا اللي بتجوّعك؟ دي بتاعتي.'],
            [1, 'وبعدين يحاولوا يدفعوا ومش لاقيين الزرار. دي عليّا أنا، وعشان كده app حلو ممكن يفشل.'],
            [0, 'ماشي، الـ app الجميل اللي الـ navigation بتاعه ملخبط يبقى UI كويس و UX وحش.'],
            [1, 'والـ app السهل اللي شكله عادي يبقى UX كويس و UI وحش.'],
            [0, 'على الأقل بنشترك في حاجة: الـ Figma.'],
            [1, 'وآخر كلمة في السلايد: أحسن المنتجات بتجمعنا إحنا الاتنين.']
          ] : [
            [0, "I'm the <b>look and feel</b>, the interactivity of the screen: colours, typography, buttons, layout."],
            [1, "And I'm the user's <b>overall experience</b> with the whole product."],
            [0, 'People see me first. Pizza photos that make you hungry? Mine.'],
            [1, "Then they try to pay and can't find the button. That's on me, and it's why a pretty app can still fail."],
            [0, 'Fine: a beautiful app with confusing navigation is good UI, poor UX.'],
            [1, 'And an easy app that looks plain is good UX, poor UI.'],
            [0, 'At least we share one thing: Figma.'],
            [1, "And the slide's last word: the best products combine both of us."]
          ]} />
        `),

        // 11 · skills
        page(html`
          <${H2}>${t('What skills do you need?', 'محتاج إيه من skills؟')}</${H2}>
          <table className="hf-hci5-tbl hf-in"><thead><tr><th>${t('UI design', 'الـ UI design')}</th><th>${t('UX design', 'الـ UX design')}</th></tr></thead>
            <tbody>${[
              ['Visual design', 'User research'], ['Color theory', 'Problem-solving'], ['Typography', 'Information architecture'],
              ['Layout and composition', 'User flows and journey maps'], ['Design systems', 'Wireframing and usability testing'],
              ['Tools like Figma', 'Tools like Figma, research and testing tools']
            ].map((r, j) => html`<tr key=${j} className=${j === 5 ? 'hi' : ''}><td>${r[0]}</td><td>${r[1]}</td></tr>`)}</tbody></table>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Figma</b> is on <b>both</b> sides: it is used for UI and UX design. "Figma is used only for UI" is false.',
            'الـ <b>Figma</b> موجود في <b>الناحيتين</b>: بيتستخدم للـ UI والـ UX الاتنين. ولو لقيت جملة إن الـ Figma للـ UI بس، تبقى غلط.')}</p></${Box}>
          <${Hand} tilt=${true}>${t('Trick (ours): the UI column is about how things look; the UX column starts with research and ends with testing.', 'حيلة من عندنا: عمود الـ UI كله عن شكل الحاجات، وعمود الـ UX بيبدأ بالـ research وبيخلص بالـ testing.')}</${Hand}>
        `, { sec: t('Skills', 'الـ Skills') }),

        // 12 · dumb questions on UI/UX
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني الـ UX هو "UI معمول كويس"؟', 'لأ. الـ UI هو الشكل (الـ look and feel والـ interactivity بتاعة الشاشة)، والـ UX هو التجربة الكاملة مع المنتج. الـ app ممكن يبقى جميل (UI كويس) وملخبط (UX وحش).'],
            ['والـ "invisible interface" بيعمل إيه في المحاضرة دي؟', 'السلايد بتفكّرك بيه: الـ interface لازم يبقى <b>خفي على قد ما نقدر</b>، عشان الـ user يفكر في الـ <b>task</b> مش في الأداة. والقصة كاملة في المحاضرة الأولى.'],
            ['مين بيستخدم الـ Figma؟', 'الاتنين. جدول الـ skills حاطه في العمودين، والـ UX بيزوّد عليه research and testing tools.'],
            ['والـ wireframes تبع مين؟', 'تبع الـ <b>UX</b>، في لستة التركيز (wireframes and prototypes) وفي الـ skills (wireframing and usability testing).']
          ] : [
            ['So UX is just "UI done well"?', 'No. UI is the visual appearance (the look and feel and interactivity of a screen); UX is the overall experience with the product. An app can be beautiful (good UI) and confusing (poor UX).'],
            ['What is the "invisible interface" doing in this lecture?', 'The slide reminds you: the interface should be <b>as invisible as possible</b>, so the user thinks about the <b>task</b> rather than the tool. The full story is in Lecture 1.'],
            ['Who uses Figma?', 'Both. The skills table puts it in both columns; UX adds research and testing tools.'],
            ['Whose are wireframes?', '<b>UX</b>\'s: on the focus list (wireframes and prototypes) and in the skills (wireframing and usability testing).']
          ]} />
        `),

        // 13 · the UX design process
        page(html`
          <${H1}>${t('The UX Design Process', 'الـ UX Design Process')}</${H1}>
          <${P} small=${true}>${t('Three components are recommended:', 'فيه تلات components موصى بيهم:')}</${P}>
          <div className="hf-hci5-three hf-in">
            <div><b>1</b><span>${t('User research', 'الـ user research')}</span></div>
            <div><b>2</b><span>${t('Design and prototyping of the interface', 'الـ design and prototyping بتاع الـ interface')}</span></div>
            <div><b>3</b><span>${t('User interface evaluation (improvement)', 'الـ user interface evaluation (improvement)')}</span></div>
          </div>
          <${P} small=${true}>${X('The slide\'s figure draws it as a <b>cycle</b>: User Research → Design → Build → back to User Research, and round again.',
            'والرسمة اللي في السلايد عاملاها <b>cycle</b> بترجع لأولها وتلف تاني:<span class="ltr">User Research → Design → Build → User Research</span>')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The figure\'s third stage is <b>Build</b>; the list\'s third component is <b>evaluation (improvement)</b>. Both are on the slide, so know both. If the exam asks for the three <i>components</i>, give the list.',
            'المرحلة التالتة في الرسمة هي الـ <b>Build</b>، والـ component التالت في اللستة هو الـ <b>evaluation (improvement)</b>. الاتنين في السلايد، فاعرفهم الاتنين. ولو الامتحان سأل عن التلات <i>components</i>، اكتب اللي في اللستة.')}</p></${Box}>
        `, { sec: t('The UX process', 'الـ UX process') }),

        // 14 · process figure
        page(html`
          <${H2}>${t('Around and around', 'لفّة ورا لفّة')}</${H2}>
          <${Fig} name="hc-ux-process" />
        `),

        // 15 · put the cycle back together
        page(html`
          <${Box} kind="pencil" title=${t('Rebuild the cycle', 'ركّب الـ cycle تاني')}><p className="hf-p small">${X('Inside the cycle, two phrases sit between the stages. Tap all five pieces in order, starting from <b>User Research</b>.',
            'جوّه الـ cycle فيه جملتين قاعدين بين المراحل. دوس على الخمس حتت بالترتيب، وابدأ من الـ <b>User Research</b>.')}</p></${Box}>
          <${Cycle} />
          <${Grow} />
          <${Hand} arrow="up">${X('validate ideas, design around constraints, back to research', 'تتأكد من أفكارك، وتصمم حوالين الـ constraints، وترجع للـ research')}</${Hand}>
        `),

        // 16 · user research: what you learn
        page(html`
          <${H1}>${t('1- User research', 'الخطوة الأولى: الـ User research')}</${H1}>
          <${P} small=${true}>${t('What do you have to learn?', 'لازم تتعلم إيه؟')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Users</b> اللي هيستخدموا الـ system بتاعك: مهاراتهم، والحاجات اللي ممكن تشتتهم، والاحتياجات الخاصة زي الأطفال وكبار السن وذوي الإعاقة.',
            'الـ <b>Tasks</b> اللي الـ users بيحاولوا يخلصوها من خلال الـ system.',
            'ومش بس من الـ users: كمان من <b>الأبحاث اللي اتعملت قبل كده</b> عن قدرات الإنسان وحدوده وإزاي الناس بتدرك الحاجات.'
          ] : [
            'The <b>users</b> who will use your system: their skills, possible distractions, special needs such as kids, elderly, people with disabilities.',
            'The <b>tasks</b> that users try to complete through the system.',
            'Not just learning from users, but from <b>research done before</b> about human capabilities, limitations and how people perceive things.'
          ]} />
          <${Talk} who="lens">${t('Users, tasks, and what others already found out. My three hunting grounds.', 'الـ users، والـ tasks، واللي غيرنا لقاه قبل كده. دول التلات أماكن اللي بدوّر فيهم.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"In user research you learn <b>only</b> from the users of your system." <b>False</b>: also from research done before.', 'لو لقيت إن الـ user research بتتعلم فيه من الـ users <b>بس</b>، يبقى <b>غلط</b>: كمان من الأبحاث اللي اتعملت قبل كده.')}</p></${Box}>
        `, { sec: t('User research', 'الـ User research') }),

        // 17 · surveys
        page(html`
          <${H1}>${t('1) Surveys', 'الطريقة الأولى: الـ Surveys')}</${H1}>
          <${Def}>${X('A <b>survey</b> is a powerful way to gather <b>quick responses</b> in a short time from a <b>large number of users</b>: a broad view.',
            'الـ <b>survey</b> طريقة قوية تجمع بيها <b>ردود سريعة</b> في وقت قصير من <b>عدد كبير من الـ users</b>، يعني نظرة واسعة (broad view).')}</${Def}>
          <div className="hf-hci5-chips hf-in"><span>${t('often online', 'غالبًا online')}</span><span>${t('easily created', 'سهل تتعمل')}</span><span>${t('one of the cheapest', 'من أرخص الـ methods')}</span><span>${t('many users, short time', 'عدد كبير من الـ users')}</span></div>
          <${P} small=${true}>${X('It can be an <b>initial step</b>, to gather general insights about users\' motivations, preferences, priorities and pain points; the findings help plan later activities such as <b>interviews</b>.',
            'ممكن يبقى <b>خطوة أولى</b> تجمع بيها insights عن دوافع الـ users وتفضيلاتهم وأولوياتهم والـ pain points، والنتايج بتساعد تخطط لأنشطة بعدها زي الـ <b>interviews</b>.')}</${P}>
          <${P} small=${true}>${X('Or it can <b>follow</b> an activity (an interview or a usability study), planned from that method\'s findings.',
            'أو ممكن <b>ييجي بعد</b> activity تانية (interview أو usability study)، وتخطط له من نتايج الـ method اللي قبله.')}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${t('before OR after an interview: both on the slide', 'قبل الـ interview أو بعده، الاتنين في السلايد')}</${Hand}>
        `, { sec: t('Surveys', 'الـ Surveys') }),

        // 18 · survey-fit figure
        page(html`
          <${H2}>${t('Where surveys fit', 'الـ surveys مكانها فين')}</${H2}>
          <${Fig} name="hc-survey-fit" />
        `),

        // 19 · interview with the survey
        page(html`
          <${Interview} title=${t('The Survey, exposed', 'الـ Survey على المكشوف')} sub=${t("This week's interview: the cheapest way to hear from a crowd.", 'حوار الأسبوع: أرخص طريقة تسمع بيها رأي ناس كتير.')} lines=${A ? [
            ['المذيع', 'إنت مين؟'],
            ['الـ Survey', 'أسرع طريقة تجيب ردود من <b>عدد كبير من الـ users</b> في وقت قصير. نظرة واسعة.'],
            ['المذيع', 'وغالي؟'],
            ['الـ Survey', 'بالعكس، أنا من <b>أرخص</b> methods الـ user research. غالبًا online، وسهل تعملني.'],
            ['المذيع', 'بيستدعوك إمتى؟'],
            ['الـ Survey', 'كـ <b>خطوة أولى</b>: الدوافع والتفضيلات والأولويات والـ pain points. ونتايجي بتساعد يخططوا للـ interviews.'],
            ['المذيع', 'يعني في الأول بس؟'],
            ['الـ Survey', 'لأ. ممكن كمان <b>آجي بعد</b> interview أو usability study، ويخططوني من نتايجهم.'],
            ['المذيع', 'وسرّك عشان تفضل كويس؟'],
            ['الـ Survey', 'أفضل <b>صغير</b>. الأسئلة الكتير بتأثر على الـ response rate وعلى الـ reliability بتاعة الـ data.']
          ] : [
            ['Head First', 'Who are you?'],
            ['Survey', 'The quickest way to get responses from a <b>large number of users</b> in a short time. A broad view.'],
            ['Head First', 'Expensive?'],
            ['Survey', 'The opposite: one of the <b>cheapest</b> methods of user research. Often online, easily created.'],
            ['Head First', 'When do they call you in?'],
            ['Survey', 'As an <b>initial step</b>: motivations, preferences, priorities, pain points. My findings help plan the interviews.'],
            ['Head First', 'So only at the start?'],
            ['Survey', 'No. I can also <b>follow</b> an interview or a usability study, planned from what they found.'],
            ['Head First', 'Your secret for staying good?'],
            ['Survey', 'Stay <b>small</b>. Too many questions affect the response rate and the reliability of data.']
          ]} />
        `),

        // 20 · survey tips
        page(html`
          <${H2}>${t('Tips for a good survey design', 'نصايح لتصميم survey كويس')}</${H2}>
          <${UL} items=${A ? [
            '<b>خليه صغير على قد ما تقدر.</b> الأسئلة الكتير بتأثر على الـ <b>response rate</b> وعلى الـ <b>reliability بتاعة الـ data</b>.',
            'اسأل <b>أقل عدد من الأسئلة</b> يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها.',
            '<b>خلي بالك من الـ bias.</b>',
            'خد <b>feedback من المشاركين</b> عن الـ survey نفسه.'
          ] : [
            '<b>Keep it as small as possible.</b> Too many questions affect the <b>response rate</b> and the <b>reliability of data</b>.',
            'Ask the <b>minimum number of questions</b> to get the data you need and know you will use.',
            '<b>Be aware of bias.</b>',
            'Get <b>feedback from participants</b> about the survey.'
          ]} />
          <${P} small=${true}>${X('‡ The slide prints "response rate reliability of data" with the <b>and</b> missing: it means the response rate <i>and</i> the reliability of data.',
            '‡ السلايد ناقصها كلمة <bdi dir="ltr">"and"</bdi> في الجملة دي:<span class="ltr">"response rate reliability of data"</span>والمقصود الـ response rate <i>و</i> الـ reliability بتاعة الـ data.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Why should a survey be <b>short and focused</b>? To <b>increase the response rate and accuracy</b>. "Longer means more detailed, so better" is the trap; the exam has used it.',
            'الـ survey لازم يبقى <b>قصير ومركّز</b> ليه؟ عشان <b>يزوّد الـ response rate والدقة</b>. والفخ إن "الأطول يعني تفاصيل أكتر، يبقى أحسن"، والامتحان استخدمه قبل كده.')}</p></${Box}>
        `),

        // 21 · edit the survey
        page(html`
          <${Box} kind="pencil" title=${t('Be the survey editor', 'خليك إنت محرر الـ survey')}><p className="hf-p small">${t('A team asks about its notes app\'s search. Tap every question that should go, then check. (Ours.)', 'فيه team بيسأل عن الـ search في app الـ notes. دوس على كل سؤال لازم يتشال، وصحّح. (من عندنا.)')}</p></${Box}>
          <${Editor} />
        `),

        // 22 · brain power + survey traps
        page(html`
          <${Box} kind="brain"><p className="hf-p small">${X('You cut the name, address and phone questions (ask only what you need and will use). Two different rules told you to. One is a survey tip. Which rule from the <b>end</b> of this chapter is the other?',
            'شلت أسئلة الاسم والعنوان والتليفون (اسأل اللي محتاجه وهتستخدمه بس). فيه قاعدتين مختلفتين قالولك كده. واحدة من نصايح الـ survey. طب التانية أنهي قاعدة من <b>آخر</b> الفصل ده؟')}</p></${Box}>
          <${K.Reveal} id="bp-pii" label=${t('Show the answer', 'ورّيني الإجابة')}>
            <${P} small=${true}>${X('<b>Privacy and security</b>: only collect the data you need. Names, home address and phone number are <b>PII</b>.', 'الـ <b>Privacy والـ security</b>: اجمع بس الـ data اللي محتاجها. والأسامي وعنوان البيت ورقم التليفون كلهم <b>PII</b>.')}</${P}>
          </${K.Reveal}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The <b>primary benefit</b> of surveys, as the students\' summaries ask it: they let you collect data from a <b>large number of users</b>. Not "they always provide exact answers", and not "they eliminate the need for further testing".',
            'الـ <b>ميزة الأساسية</b> للـ surveys، زي ما ملخصات الطلبة بتسألها، إنها بتخليك تجمع data من <b>عدد كبير من الـ users</b>. مش إنها "دايمًا بتدي إجابات مظبوطة"، ولا إنها "بتلغي الحاجة لـ testing بعد كده".')}</p></${Box}>
        `),

        // 23 · secondary research benefits
        page(html`
          <${H1}>${t('Someone already found out', 'فيه حد عرف قبلك')}</${H1}>
          <p className="hf-hand hf-in">${ly}</p>
          <${P} small=${true}>${X('Remember the third thing user research learns from: <b>research done before</b>. That is <b>secondary research</b>, and it answers two kinds of question:',
            'فاكر الحاجة التالتة اللي الـ user research بيتعلم منها؟ <b>الأبحاث اللي اتعملت قبل كده</b>. ده الـ <b>secondary research</b>، وبيجاوب على نوعين من الأسئلة:')}</${P}>
          <${Def}>${X('<b>Human abilities and limitations.</b> Example: designing for <b>color-blind</b> users using color-blindness facts.', '<b>قدرات الإنسان وحدوده.</b> مثال: تصمم لـ users عندهم <b>color-blindness</b> باستخدام حقائق عن عمى الألوان.')}</${Def}>
          <${Def}>${X('<b>User groups with common issues.</b> Example: an app for a poor country, where users likely have <b>low-end devices</b>.', '<b>مجموعات users عندهم مشاكل مشتركة.</b> مثال: app لبلد فقير، والـ users فيه غالبًا معاهم <b>أجهزة low-end</b>.')}</${Def}>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('No need to test colour blindness yourself. Read what is already known.', 'مش محتاج تختبر عمى الألوان بنفسك. اقرا اللي معروف أصلًا.')}</${Talk}>
        `, { sec: t('Secondary research', 'الـ Secondary research') }),

        // 24 · quantitative vs qualitative
        page(html`
          <${H1}>${t('Numbers or reasons?', 'أرقام ولا أسباب؟')}</${H1}>
          <p className="hf-hand hf-in">${t('types of user research by WHAT · ', 'أنواع الـ user research حسب إيه (WHAT)، ')}${ly}</p>
          <${Def}>${X('<b>Quantitative</b>: data of a <b>numeric</b> nature (measures, counts). Easier for <b>engineers and technical people</b>.', 'الـ <b>Quantitative</b> يعني data طبيعتها <b>أرقام</b> (measures و counts). أسهل للـ <b>engineers والناس الـ technical</b>.')}</${Def}>
          <${Def}>${X('<b>Qualitative</b>: observations about <b>why and how</b> things happen, often based on <b>interviews</b>. Harder for technical people, but it is what we need for <b>real understanding</b>.', 'الـ <b>Qualitative</b> يعني ملاحظات عن <b>ليه وإزاي</b> الحاجات بتحصل، وغالبًا مبنية على <b>interviews</b>. أصعب على الناس الـ technical، بس هي اللي محتاجينها عشان <b>نفهم بجد</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Exam 2024/25: data that includes <b>descriptions from interviewees</b> is <b>qualitative</b>. Exam 2025/26: quantitative research is often easier for <b>engineers and technical people</b>.',
            'امتحان 2024/25: الـ data اللي فيها <b>أوصاف من اللي اتعملهم interview</b> تبقى <b>qualitative</b>. وامتحان 2025/26: الـ quantitative أسهل للـ <b>engineers والناس الـ technical</b>.')}</p></${Box}>
        `, { sec: t('Quantitative or qualitative', 'الـ Quantitative والـ qualitative') }),

        // 25 · qual-quant figure
        page(html`
          <${H2}>${t('Sort the kinds of data', 'صنّف أنواع الـ data')}</${H2}>
          <${Fig} name="hc-qual-quant" />
        `),

        // 26 · sort scenarios
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Back at the pizza app. Is each finding <b>QN</b> (quantitative) or <b>QL</b> (qualitative)? (Our examples.)', 'رجعنا للـ pizza app. كل نتيجة دي <b>QN</b> (quantitative) ولا <b>QL</b> (qualitative)؟ (الأمثلة من عندنا.)')}</p></${Box}>
          <${Sort} id="qq" bins=${[['QN', 'Quantitative'], ['QL', 'Qualitative']]} items=${A ? [
            ['عدد الـ users اللي كمّلوا الدفع', 0],
            ['واحدة بتحكي في الـ interview ليه سابت الـ app', 1],
            ['متوسط الوقت عشان تلاقي البيتزا، بالثواني', 0],
            ['ملاحظات عن إزاي الـ user بيدوّر على زرار الدفع', 1],
            ['عدد الدوسات لحد ما الأوردر يتبعت', 0],
            ['حكايات الـ users عن إيه اللي بيلخبطهم', 1]
          ] : [
            ['How many users finished paying', 0],
            ['An interviewee explains why she gave up on the app', 1],
            ['Average time to find a pizza, in seconds', 0],
            ['Notes on how a user hunts for the pay button', 1],
            ['Number of taps to place an order', 0],
            ["Users' stories about what confuses them", 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('a number → QN · a why or a how → QL', 'رقم يبقى QN، و"ليه" أو "إزاي" يبقى QL')}</${Hand}>
        `),

        // 27 · primary vs secondary
        page(html`
          <${H2}>${t('Primary vs secondary research', 'الـ Primary والـ secondary research')}</${H2}>
          <p className="hf-hand hf-in">${ly}</p>
          <table className="hf-hci5-tbl hf-in"><thead><tr><th></th><th>${t('Primary', 'الـ Primary')}</th><th>${t('Secondary', 'الـ Secondary')}</th></tr></thead>
            <tbody>${(A ? [
              ['مين بيجمع الـ data', 'إنت (أو حد بتأجره)', 'حد تاني'],
              ['أمثلة', 'الـ surveys والـ focus groups والـ interviews والـ observations والـ experiments', 'تدوّر على data موجودة'],
              ['نوعه (qual أو quant)', 'ينفع الاتنين', 'ينفع الاتنين'],
              ['أهم ميزة', 'مخصوص لاحتياجاتك، وإنت متحكم في الـ quality', 'عادةً رخيص وسريع'],
              ['أهم عيب', 'عادةً أغلى وبياخد وقت أطول', 'الـ data ممكن تبقى قديمة أو مش محددة كفاية']
            ] : [
              ['Data collected by', 'You (or someone you hire)', 'Someone else'],
              ['Examples', 'Surveys, focus groups, interviews, observations, experiments', 'Looking for existing data'],
              ['Qualitative or quantitative?', 'Can be either', 'Can be either'],
              ['Key benefits', 'Specific to your needs, and you control the quality', 'Usually cheap and quick'],
              ['Key disadvantages', 'Usually costs more and takes longer', 'Data can be too old and/or not specific enough']
            ]).map((r, j) => html`<tr key=${j}><td className="k">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table>
        `, { sec: t('Primary or secondary', 'الـ Primary والـ secondary') }),

        // 28 · primary-secondary figure
        page(html`
          <${Fig} name="hc-primary-secondary" />
        `),

        // 29 · match the table
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${t('Cover the table. Tap a row on the left, then what the table says.', 'غطّي الجدول. دوس على صف من اللي على اليمين، وبعدين على اللي الجدول بيقوله.')}</p></${Box}>
          <${Match} id="ps" left=${A ? ['ميزة الـ primary', 'ميزة الـ secondary', 'عيب الـ primary', 'عيب الـ secondary', 'كمّي ولا نوعي؟'] : ['Primary: benefit', 'Secondary: benefit', 'Primary: drawback', 'Secondary: drawback', 'Qual or quant?']}
            right=${A ? ['الـ data ممكن تبقى قديمة أو مش محددة كفاية', 'عادةً رخيص وسريع', 'الاتنين ينفع يبقوا أي واحد فيهم', 'مخصوص لاحتياجاتك وإنت متحكم في الـ quality', 'عادةً أغلى وبياخد وقت أطول']
              : ['Data can be too old and/or not specific enough', 'Usually cheap and quick', 'Both can be either', 'Specific to your needs, and you control the quality', 'Usually costs more and takes longer']}
            answer=${[3, 1, 4, 0, 2]} />
          <${Grow} />
          <${Hand} red=${true} arrow="up">${t('who collected it? everything else follows', 'مين جمعها؟ كل الباقي بييجي من هنا')}</${Hand}>
        `),

        // 30 · traps on primary and secondary
        page(html`
          <${H2}>${t('Traps: primary or secondary?', 'فخاخ الـ primary والـ secondary')}</${H2}>
          <${Box} kind="watch"><p className="hf-p small">${X('A past question asked for a <b>quantitative primary</b> method: <b>collecting and testing data of numeric nature</b>. A focus group or interviewing experts is qualitative; reading published usability reports is secondary.',
            'سؤال قديم طلب method تكون <b>primary و quantitative</b>، والإجابة <b>تجميع واختبار data طبيعتها أرقام</b>. أما الـ focus group والـ interview مع الخبراء فـ qualitative، وقراية تقارير usability منشورة تبقى secondary.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('Don\'t swap the drawbacks. Primary: <b>costs more and takes longer</b>. "Outdated information" is <b>secondary</b>\'s drawback (data too old or not specific enough).',
            'متبدّلش العيوب. عيب الـ primary إنه <b>أغلى وبياخد وقت أطول</b>. أما "معلومات قديمة" فده عيب الـ <b>secondary</b> (data قديمة أو مش محددة كفاية).')}</p></${Box}>
          <${Talk} who="dev">${t('So why would anyone pay more for primary?', 'أمال حد هيدفع أكتر في الـ primary ليه؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('It is <b>specific to your needs</b> and you <b>control the quality</b>: new data, straight from your own users.', 'عشان هو <b>مخصوص لاحتياجاتك</b> وإنت <b>متحكم في الـ quality</b>. ودي data جديدة من الـ users بتوعك على طول.')}</${Talk}>
        `),

        // 30 · general tips
        page(html`
          <${H1}>${t('The script is not a bible', 'الـ script مش كتاب مقدس')}</${H1}>
          <p className="hf-hand hf-in">${t('general tips for research methods · ', 'نصايح عامة للـ research methods، ')}${ly}</p>
          <${UL} items=${A ? [
            'الـ user research لازم <b>يتخطط له من بدري</b>. لو interview، اكتب <b>script</b> بالأسئلة قبلها بدل ما تسأل أسئلة عشوائية.',
            'التخطيط مش معناه إنك تبقى ناشف: خليك flexible أثناء الـ activity، لأن <b>الـ script مش كتاب مقدس</b>.',
            'الـ methods <b>مش بدايل</b> لبعض. استخدم <b>combination</b> منهم بترتيب مناسب.',
            'الـ <b>testing والـ iteration</b> بيحسّنوا أي technique.',
            'الـ <b>privacy والـ security</b> بتوع data الـ users حاجة أساسية.'
          ] : [
            'User research should be <b>planned ahead</b>. For an interview, write a <b>script</b> of questions beforehand instead of asking random questions.',
            'Planning is not strictness: be flexible during the activity (<b>the script is not a bible</b>).',
            'Methods are <b>not alternatives</b>. Use a <b>combination</b> in a relevant order.',
            '<b>Testing and iteration</b> improve any technique.',
            '<b>Privacy and security</b> of user data are essential.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Exam 2025/26: before a user interview, <b>write a script of questions</b> to guide it. Never "ask random questions without preparation".',
            'امتحان 2025/26: قبل الـ interview <b>اكتب script بالأسئلة</b> يمشّيك. عمرك ما "تسأل أسئلة عشوائية من غير تحضير".')}</p></${Box}>
        `, { sec: t('General tips', 'نصايح عامة') }),

        // 31 · good or bad practice
        page(html`
          <${Box} kind="pencil" title=${t('Good practice or not?', 'صح ولا غلط؟')}><p className="hf-p small">${X('Tap <b>✓</b> for good research practice, <b>✗</b> for bad.', 'دوس <b>✓</b> لو ده شغل research صح، و<b>✗</b> لو غلط.')}</p></${Box}>
          <${Sort} id="tips" bins=${[['✓', t('Good practice', 'صح')], ['✗', t('Bad practice', 'غلط')]]} items=${A ? [
            ['تكتب script بالأسئلة قبل الـ interview', 0],
            ['متخرجش عن الـ script أبدًا مهما الـ user قال', 1],
            ['تختار method واحدة وتستخدمها لوحدها', 1],
            ['تجمع methods بترتيب مناسب', 0],
            ['تجرّب وتعمل iteration على الـ technique بتاعك', 0],
            ['تحتفظ بكل الـ data على طول، يمكن تنفع', 1],
            ['تجمع الـ data اللي محتاجها بس', 0],
            ['تسأل أي أسئلة تيجي في دماغك ساعتها', 1]
          ] : [
            ['Write a script of questions before an interview', 0],
            ['Never leave the script, whatever the user says', 1],
            ['Pick one method and use it alone', 1],
            ['Combine methods in a relevant order', 0],
            ['Test and iterate on your technique', 0],
            ['Keep all the data forever, just in case', 1],
            ['Collect only the data you need', 0],
            ['Ask random questions as they come to you', 1]
          ]} />
        `),

        // 32 · privacy and security
        page(html`
          <${H1}>${t('Guard the data', 'احمي الـ data')}</${H1}>
          <p className="hf-hand hf-in">${t('privacy and security · ', 'الـ privacy والـ security، ')}${ly}</p>
          <div className="hf-hci5-three hf-in">
            <div><b>1</b><span>${t('Only collect the data you need.', 'اجمع بس الـ data اللي محتاجها.')}</span></div>
            <div><b>2</b><span>${t('Do not associate collected data with PII or SPII.', 'متربطش الـ data اللي جمعتها بـ PII أو SPII.')}</span></div>
            <div><b>3</b><span>${t('Do not keep data after you no longer need it.', 'متحتفظش بالـ data بعد ما متبقاش محتاجها.')}</span></div>
          </div>
          <${Def}>${X('<b>PII</b> (Personally Identifiable Information): details that could identify a user: <b>names, home address, email address, phone number</b>.', 'الـ <b>PII</b> (Personally Identifiable Information) هي تفاصيل ممكن تعرّف بيها الـ user، زي <b>الأسامي وعنوان البيت والـ email ورقم التليفون</b>.')}</${Def}>
          <${Def}>${X('<b>SPII</b> (Sensitive PII): data that could cause <b>financial harm, embarrassment or discrimination</b> if lost or stolen: <b>social security number, driver\'s license, passport numbers, financial account numbers, date of birth</b>.', 'الـ <b>SPII</b> (Sensitive PII) هي data لو ضاعت أو اتسرقت ممكن تعمل <b>ضرر مالي أو إحراج أو تمييز</b>، زي <b>الـ social security number ورخصة السواقة وأرقام الباسبور وأرقام الحسابات المالية وتاريخ الميلاد</b>.')}</${Def}>
        `, { sec: t('Privacy: PII and SPII', 'الـ Privacy والـ PII والـ SPII') }),

        // 33 · PII figure
        page(html`
          <${Fig} name="hc-pii-spii" />
        `),

        // 34 · PII traps
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Email address</b> and <b>home address</b> are plain <b>PII</b>, not SPII. <b>Date of birth</b> looks harmless, but it is on the <b>SPII</b> list.',
            'الـ <b>email</b> و<b>عنوان البيت</b> <b>PII</b> عادي، مش SPII. و<b>تاريخ الميلاد</b> شكله بريء، بس هو في لستة الـ <b>SPII</b>.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('Exam 2025/26: why is privacy and security important in user research? The key: <b>it ensures compliance and protects user data</b>. Not "faster research", not "sharing all data publicly".',
            'امتحان 2025/26 سأل الـ privacy والـ security مهمين ليه في الـ user research؟ الإجابة: <b>بيضمنوا الـ compliance وبيحموا data الـ users</b>. مش "research أسرع"، ولا "ننشر كل الـ data".')}</p></${Box}>
          <${Talk} who="bug">${t('A survey that asks for a passport number it never uses? That is my favourite kind of leak.', 'فيه survey بيطلب رقم باسبور ومش هيستخدمه؟ ده نوع التسريب اللي بحبه.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Rule 1: don\'t collect it. And the students\' summaries add: SPII needs <b>additional security measures</b> because it is sensitive.', 'القاعدة الأولى: متجمعهاش أصلًا. وملخصات الطلبة بتزوّد إن الـ SPII محتاجة <b>إجراءات security زيادة</b> عشان هي حساسة.')}</${Talk}>
        `),

        // 35 · dumb questions on research
        page(html`
          <${Dumb} qa=${A ? [
            ['ينفع الـ primary research يبقى qualitative؟', 'أيوه. الجدول بيقول الاتنين ينفع يبقوا qualitative أو quantitative. الـ interviews مثلًا primary و qualitative.'],
            ['معايا script. ينفع أخرج عنه؟', 'أيوه. خطط من بدري، بس خليك flexible، لأن الـ script مش كتاب مقدس.'],
            ['ليه منسألش كل حاجة في الـ survey، يمكن تنفع؟', 'لأن الأسئلة الكتير بتأثر على الـ response rate والـ reliability، والـ privacy بتقول اجمع اللي محتاجه بس.'],
            ['هو الـ survey لازم ييجي الأول؟', 'لأ. ممكن يبقى خطوة أولى قبل الـ interviews، أو ييجي بعد interview أو usability study.']
          ] : [
            ['Can primary research be qualitative?', 'Yes. The table says both can be qualitative or quantitative. Interviews, for example, are primary and qualitative.'],
            ['I have a script. May I leave it?', 'Yes. Plan ahead, but be flexible: the script is not a bible.'],
            ['Why not ask everything in the survey, just in case?', 'Too many questions affect the response rate and reliability, and privacy says collect only the data you need.'],
            ['Must the survey come first?', 'No. It can be an initial step before interviews, or follow an interview or a usability study.']
          ]} />
        `),

        // 36–40 · exam corner: the doctors' questions
        page(html`
          <${Box} kind="exam" title=${exam}><p className="hf-p small">${t("Real questions from the doctors' exams and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-spii', /Sensitive Personally Identifiable Information \(SPII\) includes/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('names, address, email → PII · money, IDs, birth date → SPII', 'الأسامي والعنوان والـ email تبقى PII، والفلوس والـ IDs وتاريخ الميلاد تبقى SPII')}</${Hand}>
        `, { sec: exam }),
        page(html`
          ${mq('m-qual', /Qualitative research involves data of numeric/i)}
          <${Gap} h=${4} />
          ${mq('m-cost', /Survey is more expensive than interview/i)}
        `),
        page(html`
          ${mq('m-long', /well-designed survey should take a long time/i)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('A long survey loses people halfway. Keep it as small as possible.', 'الـ survey الطويل بيخسر الناس في نصّه. خليه صغير على قد ما تقدر.')}</${Talk}>
        `),
        page(html`
          ${mq('m-skill', /skill is mainly related to UX design/i)}
          <${Grow} />
          <${Hand}>${t('visual design, color theory, layout and composition sit in the UI column', 'الـ visual design والـ color theory والـ layout and composition في عمود الـ UI')}</${Hand}>
        `),
        page(html`
          ${mq('m-flex', /reflects good practice in user research/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Plan ahead, then adapt. The script is not a bible.', 'خطط من بدري، وبعدين اتصرّف. الـ script مش كتاب مقدس.')}</${Talk}>
        `),

        // 41 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>UI</b> هو الـ interactivity والـ look and feel (الـ visual appearance)، والـ <b>UX</b> هو التجربة الكاملة. وأحسن المنتجات بتجمع الاتنين.',
            'الـ app الجميل الملخبط يبقى UI كويس و UX وحش. والـ Figma للاتنين.',
            'الـ <b>UX Design Process</b> فيه الـ research والـ design والـ evaluation، ورسمته cycle فيها الـ Build.',
            'في الـ user research بتتعلم عن الـ users والـ tasks والأبحاث القديمة.',
            'الـ <b>Surveys</b> سريعة ولـ users كتير ومن أرخص الـ methods. خليها صغيرة وخلي بالك من الـ bias.',
            'الـ <b>Quantitative</b> أرقام (أسهل للـ engineers)، والـ <b>Qualitative</b> ليه وإزاي (غالبًا interviews).',
            'الـ <b>Primary</b> إنت اللي بتجمعه (مخصوص بس أغلى)، والـ <b>Secondary</b> data موجودة (رخيص بس ممكن قديم).',
            'الـ <b>PII</b> زي الاسم والعنوان والـ email والتليفون، والـ <b>SPII</b> زي الـ SSN والباسبور والحسابات وتاريخ الميلاد.'
          ] : [
            '<b>UI</b>: interactivity, look and feel (visual appearance). <b>UX</b>: the overall experience. The best products combine both.',
            'Beautiful but confusing navigation = good UI, poor UX. Figma serves both.',
            '<b>UX Design Process</b>: user research, design and prototyping, evaluation (improvement); the figure cycles Research → Design → Build.',
            'User research learns about the users, their tasks, and research done before.',
            '<b>Surveys</b>: quick, many users, online, one of the cheapest. Keep them small; be aware of bias.',
            '<b>Quantitative</b> = numbers (easier for engineers); <b>qualitative</b> = why and how (often interviews).',
            '<b>Primary</b>: you collect it (specific, costs more); <b>secondary</b>: existing data (cheap, may be old).',
            '<b>PII</b>: name, address, email, phone. <b>SPII</b>: SSN, license, passport, accounts, date of birth.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 42 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 5!', 'خلّصت الفصل الخامس!')}</${H1}>
            <${Talk} who="lens">${t('Next time, more ways of asking users, done well.', 'المرة الجاية، طرق تانية تسأل بيها الـ users، وصح.')}</${Talk}>
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

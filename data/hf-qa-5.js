// Head First chapter for Software Quality Assurance Lecture 5 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Web site testing: what a web site is and why it is tested on every browser and platform, the three web page fundamentals
// (home page, links and their four uses, content and its seven forms), the 13 elements of web site testing, black-box testing of a
// page (text, hyperlinks, graphics, forms: Figures 8.5 and 8.6), white-box testing (dynamic content, database-driven pages,
// programmatically created pages, server performance and loading, security), gray-box testing, configuration and compatibility
// testing, and automatic web testing tools (Selenium, Cypress).
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks the gray-box reason the notes flag as not on the slides.
// The configuration counts in "Be the calculator" are our own examples (the lecture lists the factors, not numbers); every number
// was worked by hand and checked with node: 3×2×4 = 24; 2×4×3×2 = 48; 48×3×2 = 288; 2^12 = 4096 (2^7 = 128 hardware × 2^5 = 32);
// 3×2×3×2×2 = 72 (the compatibility figure's own choices). The wrong options are real slips: adding (9, 11, 53, 12), a missing
// factor (12, 24, 144, 36, 6), one factor too many (48, 96, 144), 12 × 2 and 12 × 12 for 2^12, hardware only (128).
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T5 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-qa5')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa5';
    s.textContent = `
.hfb .hf-qa5-el{ display:grid; grid-template-columns:minmax(0,1fr); gap:5px; }
.hfb .hf-qa5-el > div{ display:grid; grid-template-columns:28px minmax(0,1fr); gap:8px; align-items:start; padding-bottom:5px; border-bottom:1px dotted var(--faint); }
.hfb .hf-qa5-el > div:last-child{ border-bottom:0; padding-bottom:0; }
.hfb .hf-qa5-el .n{ display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 13.5px/1 var(--body); }
.hfb .hf-qa5-el .nm{ display:block; font:700 15px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qa5-el .ck{ display:block; font-size:14px; line-height:1.3; color:var(--ink); margin-top:1px; }
.hfb .hf-qa5-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-qa5-col{ border:1.5px solid var(--hf-line); border-radius:7px; padding:7px 9px; background:var(--paper); }
.hfb .hf-qa5-col h5{ margin:0 0 5px; font:800 13.5px/1.15 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--hf-k); }
.hfb .hf-qa5-col ol{ list-style:none; margin:0; padding:0; }
.hfb .hf-qa5-col li{ font-size:14px; line-height:1.3; margin:0 0 3px; color:var(--ink); }
.hfb .hf-qa5-col li b{ font-weight:700; color:var(--hf-k); margin-right:4px; }
.hfb .hf-qa5-cd{ border:2px solid var(--hf-line); border-radius:8px; padding:9px; display:grid; grid-template-columns:minmax(0,1fr); gap:8px; }
.hfb .hf-qa5-tabs{ display:flex; gap:5px; }
.hfb .hf-qa5-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13.5px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa5-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qa5-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-qa5-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-qa5-ask{ font-size:14.5px; line-height:1.36; margin:0; color:var(--ink); min-height:80px; }
.hfb .hf-qa5-opts{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:6px; }
.hfb .hf-qa5-opts button{ font:700 15px/1 var(--mono); min-height:36px; padding:0 4px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-qa5-opts button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.hfb .hf-qa5-opts button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-qa5-fb{ min-height:84px; }
.hfb .hf-qa5-bad{ font-size:14px; line-height:1.34; margin:0; color:var(--hf-red); }
.hfb .hf-qa5-ok{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); padding:6px 9px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-qa5-ok code{ display:block; font:700 15px/1.4 var(--mono); color:var(--hf-k); background:none; padding:0; margin-bottom:2px; }
.hfb .hf-qa5-hint{ font-size:14px; line-height:1.3; margin:0; color:var(--graphite); }
.hfb .hf-qa5-tag{ display:inline-block; font:700 12.5px/1 var(--body); letter-spacing:.04em; text-transform:uppercase; padding:4px 7px; border-radius:4px; background:var(--hf-k); color:var(--paper); }
.hf-ar .hf-qa5-el .ck, .hf-ar .hf-qa5-el .nm, .hf-ar .hf-qa5-col li, .hf-ar .hf-qa5-ask, .hf-ar .hf-qa5-bad, .hf-ar .hf-qa5-ok, .hf-ar .hf-qa5-hint{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-qa5-el .ck, .hf-ar .hf-qa5-col li, .hf-ar .hf-qa5-ask, .hf-ar .hf-qa5-bad, .hf-ar .hf-qa5-ok, .hf-ar .hf-qa5-hint{ font-size:13.5px; }
.hf-ar .hf-qa5-col h5, .hf-ar .hf-qa5-tag, .hf-ar .hf-qa5-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-qa5-col li b{ margin-right:0; margin-left:4px; }
.hf-ar .hf-qa5-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-qa5-ok code{ direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // the 13 elements of web site testing, as the lecture's table gives them
  const EL = [
    ['User interface', 'The site is simple to use.', 'الـ site سهل في الاستخدام.'],
    ['Instructions', 'All relevant instructions are present: many people use web sites, and some need clarification.', 'كل الـ instructions المهمة موجودة، لأن ناس كتير بتستخدم الـ sites وفيه منهم اللي محتاج توضيح.'],
    ['Site map / navigational map', 'A map exists and is appropriate; every link on it exists and works; a navigation bar on every page.', 'فيه map ومناسب، وكل link عليه موجود وشغال، والـ navigation bar موجود في كل صفحة.'],
    ['Content', 'Professional: no plagiarism; minimal bold, big fonts, blinking text; web references are hyperlinked.', 'محتوى professional: مفيش plagiarism، وأقل bold و big fonts و blinking text، والـ web references عليها hyperlink.'],
    ['Colors / backgrounds', 'Content remains easy to read.', 'الـ content يفضل سهل في القراية.'],
    ['Images', '"A picture is worth a thousand words": use them to convey messages.', 'الصورة بألف كلمة، فاستخدمها عشان توصّل رسالة.'],
    ['Tables', 'Positioned so users do not keep scrolling.', 'متحطة بحيث الـ users مايفضلوش يعملوا scroll.'],
    ['Wrap-around', 'Text wraps correctly around images.', 'الـ text بيلف صح حوالين الصور.'],
    ['Functionality', 'All links, the database connection and the forms.', 'كل الـ links والـ database connection والـ forms.'],
    ['Links', 'The vehicle that navigates from page to page.', 'العربية اللي بتنقل الـ user من صفحة لصفحة.'],
    ['Forms', 'Information is accepted and the submit button works.', 'المعلومات بتتقبل وزرار الـ submit شغال.'],
    ['Data verification', 'Input matches the defined business rules.', 'الـ input مطابق للـ business rules المتحددة للـ system.'],
    ['Cookies', 'Cookies work; login information in cookies is encrypted.', 'الـ cookies شغالة، والـ login information اللي فيها encrypted.']
  ];
  function Elements({ from, to }) {
    const ar = useAr();
    return html`<div className="hf-qa5-el hf-in">${EL.slice(from, to).map((e, j) => html`<div key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.07 + 's' }}>
      <span className="n">${from + j + 1}</span><span><span className="nm">${ar ? 'الـ ' + e[0] : e[0]}</span><span className="ck">${ar ? e[2] : e[1]}</span></span></div>`)}</div>`;
  }

  // Be the calculator: how many configurations? Our own examples; every option is a real slip and every right answer was checked.
  const CD = [
    { en: '<b>Our example.</b> A page is tested in <b>3 browsers</b> (with CSS), at <b>2 font sizes</b> and at <b>4 screen resolutions</b>. How many configurations?',
      ar: '<b>مثال من عندنا.</b> صفحة بنختبرها على <bdi dir="ltr">3 browsers</bdi> (مع الـ CSS)، وبـ <bdi dir="ltr">2 font sizes</bdi>، وعلى <bdi dir="ltr">4 screen resolutions</bdi>. كام configuration؟',
      o: [9, 24, 12, 48], a: 1, w: '3 × 2 × 4 = 24',
      ok: ['Each browser meets each font size, and each pair meets each resolution: multiply.', 'كل browser مع كل font size، وكل اتنين منهم مع كل resolution، يبقى بنضرب.'],
      h: [['9 = 3 + 2 + 4: you added. Every choice combines with every other choice, so multiply.', 'الـ 9 دي جمع. كل اختيار بيتقابل مع كل اختيار تاني، فلازم نضرب.'], null,
        ['12 = 3 × 4: the 2 font sizes are missing.', 'الـ 12 دي <bdi dir="ltr">3 × 4</bdi> بس، ونسيت الـ 2 font sizes.'],
        ['48 multiplies by 2 one time too many.', 'الـ 48 دي ضربت في 2 مرة زيادة.']] },
    { en: '<b>Our example.</b> The hardware: <b>2 CPU types</b>, <b>4 RAM sizes</b>, <b>3 graphics cards</b> and <b>2 monitors</b>. How many hardware configurations?',
      ar: '<b>مثال من عندنا.</b> الـ hardware فيه <bdi dir="ltr">2 CPU types</bdi>، و<bdi dir="ltr">4 RAM sizes</bdi>، و<bdi dir="ltr">3 graphics cards</bdi>، و<bdi dir="ltr">2 monitors</bdi>. كام hardware configuration؟',
      o: [11, 24, 48, 96], a: 2, w: '2 × 4 × 3 × 2 = 48',
      ok: ['Four factors, four numbers multiplied.', 'أربع factors، يبقى أربع أرقام مضروبين في بعض.'],
      h: [['11 = 2 + 4 + 3 + 2: you added. Multiply.', 'الـ 11 دي جمع. اضرب.'],
        ['24 = 2 × 4 × 3: the 2 monitors are missing.', 'الـ 24 دي <bdi dir="ltr">2 × 4 × 3</bdi>، ونسيت الـ 2 monitors.'], null,
        ['96 multiplies by 2 one time too many.', 'الـ 96 دي ضربت في 2 مرة زيادة.']] },
    { en: '<b>Our example.</b> Each of those <b>48 hardware configurations</b> is tested in <b>3 browsers</b> and <b>2 network environments</b>. How many configurations now?',
      ar: '<b>مثال من عندنا.</b> كل واحد من الـ <bdi dir="ltr">48 hardware configurations</bdi> دول بنختبره على <bdi dir="ltr">3 browsers</bdi> وفي <bdi dir="ltr">2 network environments</bdi>. بقوا كام؟',
      o: [53, 144, 288, 6], a: 2, w: '48 × 3 × 2 = 288',
      ok: ['Compatibility multiplies on top of the hardware count.', 'الـ compatibility بتضرب فوق عدد الـ hardware.'],
      h: [['53 = 48 + 3 + 2: you added. Multiply.', 'الـ 53 دي جمع. اضرب.'],
        ['144 = 48 × 3: the 2 network environments are missing.', 'الـ 144 دي <bdi dir="ltr">48 × 3</bdi>، ونسيت الـ 2 network environments.'], null,
        ['6 = 3 × 2 only: the 48 hardware configurations are missing.', 'الـ 6 دي <bdi dir="ltr">3 × 2</bdi> بس، ونسيت الـ 48 hardware configuration.']] },
    { en: '<b>Our example.</b> All <b>12 factors</b> of the lecture (the 7 hardware and the 5 compatibility ones), with <b>2 variants each</b>. How many configurations?',
      ar: '<b>مثال من عندنا.</b> كل الـ <bdi dir="ltr">12 factors</bdi> اللي في المحاضرة (الـ 7 بتوع الـ hardware والـ 5 بتوع الـ compatibility)، وكل واحد ليه <bdi dir="ltr">2 variants</bdi>. كام configuration؟',
      o: [24, 128, 144, 4096], a: 3, w: '2¹² = 2⁷ × 2⁵ = 128 × 32 = 4096',
      ok: ['Twelve 2s multiplied together. The configuration figure starts at exactly this: 128 and 4096.', 'تناشر 2 مضروبين في بعض. ورسمة الـ configurations بتبدأ بالظبط من هنا: 128 و 4096.'],
      h: [['24 = 12 × 2. Multiply 2 by itself 12 times instead: 2¹².', 'الـ 24 دي <bdi dir="ltr">12 × 2</bdi>. المفروض تضرب الـ 2 في نفسها 12 مرة.'],
        ['128 = 2⁷ is the hardware only. Add the 5 compatibility factors: × 2⁵.', 'الـ 128 دي <bdi dir="ltr">2⁷</bdi>، يعني الـ hardware بس. زوّد الـ 5 بتوع الـ compatibility: <bdi dir="ltr">× 2⁵</bdi>.'],
        ['144 = 12 × 12. The variants multiply, not the number of factors.', 'الـ 144 دي <bdi dir="ltr">12 × 12</bdi>. اللي بيتضرب هو الـ variants، مش عدد الـ factors.'], null] },
    { en: 'The compatibility figure\'s own choices: <b>3 font sizes</b>, <b>with or without CSS</b>, <b>3 screen resolutions</b>, <b>2 memory sizes</b>, <b>2 networks</b>. How many test cases?',
      ar: 'اختيارات رسمة الـ compatibility نفسها: <bdi dir="ltr">3 font sizes</bdi>، والـ CSS موجودة أو لأ، و<bdi dir="ltr">3 screen resolutions</bdi>، و<bdi dir="ltr">2 memory sizes</bdi>، و<bdi dir="ltr">2 networks</bdi>. كام test case؟',
      o: [12, 36, 72, 144], a: 2, w: '3 × 2 × 3 × 2 × 2 = 72',
      ok: ['The same 72 the figure counts: every test case is one combination.', 'نفس الـ 72 اللي الرسمة بتعدّهم: كل test case هو combination واحد.'],
      h: [['12 = 3 + 2 + 3 + 2 + 2: you added. Multiply.', 'الـ 12 دي جمع. اضرب.'],
        ['36 is one × 2 short: five factors, five numbers.', 'الـ 36 ناقصها <bdi dir="ltr">× 2</bdi>: خمس factors يعني خمس أرقام.'], null,
        ['144 multiplies by 2 one time too many.', 'الـ 144 دي ضربت في 2 مرة زيادة.']] }
  ];
  function CountDrill({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [picks, setPicks] = H.K.useSlot(id + ':p', {});
    const P = CD[k], p = picks[k];
    const done = j => picks[j] === CD[j].a;
    const n = CD.filter((_, j) => done(j)).length;
    const pick = j => setPicks(Object.assign({}, picks, { [k]: j }));
    return html`<div className="hf-qa5-cd hf-in">
      <div className="hf-qa5-tabs" dir="ltr" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${CD.map((_, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${done(j) ? 'dn' : ''} onClick=${() => setK(j)}>${j + 1}${done(j) ? ' ✓' : ''}</button>`)}</div>
      <p className="hf-qa5-ask" key=${'q' + k}>${T5(ar ? P.ar : P.en)}</p>
      <div className="hf-qa5-opts" dir="ltr">${P.o.map((v, j) => html`<button key=${k + '-' + j} className=${p === j ? (j === P.a ? 'ok' : 'no') : ''} aria-pressed=${String(p === j)} onClick=${() => pick(j)}>${v.toLocaleString('en-US')}</button>`)}</div>
      <div className="hf-qa5-fb">
        ${p == null && html`<p className="hf-qa5-hint">${ar ? 'اختار رقم. لو غلط، هنقولك غلطت فين.' : "Pick a number. If it's wrong, we'll tell you which slip it is."}</p>`}
        ${p != null && p !== P.a && html`<p className="hf-qa5-bad hf-in">${T5(ar ? P.h[p][1] : P.h[p][0])}</p>`}
        ${p === P.a && html`<div className="hf-qa5-ok hf-in"><code>${P.w}</code>${T5(ar ? P.ok[1] : P.ok[0])}</div>`}
      </div>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => pick(P.a)}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${k < CD.length - 1 && html`<button className="hf-btn solid" onClick=${() => setK(k + 1)}>${ar ? 'المسألة اللي بعدها' : 'Next problem'}</button>`}
        <span className="hf-score">${ar ? html`<bdi dir="ltr">${n} / ${CD.length}</bdi>` : n + ' / ' + CD.length}</span>
      </div>
    </div>`;
  }

  H.chapters.qa[5] = {
    title: 'Web Site Testing', kicker: 'Chapter 5', run: 'web site testing',
    ar: { title: 'الـ Web Site Testing', kicker: 'الفصل 5', run: 'الـ web site testing' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 5);
      const arL = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[5]) || {};
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
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · before we start (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X("Lecture 2 gave you <b>black-box</b> testing, Lecture 3 gave you <b>white-box</b>. This chapter points both of them at one thing you use every day: <b>a web site</b>. All the facts are from the doctors' slides.",
            'محاضرة 2 علّمتك الـ <b>black-box</b> testing، ومحاضرة 3 علّمتك الـ <b>white-box</b>. الفصل ده بيوجّه الاتنين لحاجة بتستخدمها كل يوم: <b>الـ web site</b>. وكل المعلومات من سلايدز الدكاترة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises</b> right on the page: sorting, matching, and a calculator for configurations.', '<b>حل التمارين</b> على الصفحة نفسها: ترتيب وتوصيل وآلة حاسبة للـ configurations.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks something the notes add that is not on the slides.', 'معناها حاجة النوتس زوّدتها ومش موجودة في السلايدز.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes marked "ours" are our own analogies and examples.', 'الملاحظات اللي عليها "من عندنا" دي تشبيهات وأمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('You build a site and try it in <b>your</b> browser. It works. Name three things that could still go wrong for a stranger opening it on <b>their</b> computer.',
            'إنت عملت site وجرّبته على الـ browser <b>بتاعك</b> واشتغل. قول تلات حاجات ممكن تبوظ لما حد غريب يفتحه على الكمبيوتر <b>بتاعه</b>.')}</p></${Box}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">5</span><span className="t">${A ? html`الفصل الخامس<br/>Software Quality` : html`Chapter five<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Click Every Link', 'دوس على كل link')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('web site testing', 'الـ web site testing')}</p></div>
          <${P}>${X("A web site has a nasty habit: it looks perfect on the computer that built it, and breaks on everyone else's.", 'الـ web site عنده عادة وحشة: بيبان تمام على الكمبيوتر اللي اتعمل عليه، ويبوظ عند كل الناس التانية.')}</${P}>
          <${Talk} who="dev">${t('It works on my machine!', 'بس ده شغال عندي!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Your machine is not the customer\'s. I test the <b>text, links, graphics and forms</b>, then the code behind them, then every <b>browser and platform</b>.', 'جهازك مش جهاز الـ customer. أنا بختبر الـ <b>text والـ links والـ graphics والـ forms</b>، وبعدين الـ code اللي وراهم، وبعدين كل <b>browser وكل platform</b>.')}</${Talk}>
          <${P} small=${true}>${X("Today's plan, from the lecture's objectives: the <b>fundamentals</b> of web pages, <b>black-box</b> testing of a page, <b>white-box and gray-box</b> testing, and <b>configuration and compatibility</b> testing.",
            'خطة النهارده من أهداف المحاضرة: <b>أساسيات</b> الـ web pages، والـ <b>black-box</b> testing للصفحة، والـ <b>white-box والـ gray-box</b>، والـ <b>configuration والـ compatibility</b> testing.')}</${P}>
        `, { sec: t('Meet web site testing', 'اتعرّف على الـ web testing') }),

        // 2 · what a web site is
        page(html`
          <${H1}>${t('So what is a web site?', 'يعني إيه web site؟')}</${H1}>
          <${Def}>${X('A <b>web site</b> is a collection of one or more <b>web pages</b> (text, graphics, links, sounds…) grouped under the <b>same domain</b>. It must have a <b>domain name</b> and a <b>web host</b>.',
            'الـ <b>web site</b> هو مجموعة من <b>web page</b> واحدة أو أكتر (text و graphics و links وأصوات…) متجمعين تحت <b>نفس الـ domain</b>. ولازم يكون ليه <b>domain name</b> و<b>web host</b>.')}</${Def}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': the domain name is the shop's address, the web host is the building the shop stands in.", 'تشبيه من عندنا: الـ domain name هو عنوان المحل، والـ web host هو المبنى اللي المحل فيه.')}</${Hand}>
          <${Grow} />
          <${Talk} who="dev">${X('So one page on its own domain is already a web site?', 'يعني صفحة واحدة على domain لوحدها تبقى web site؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Yes: <b>one or more</b> pages. Pages, a domain name, a host. That\'s the whole recipe.', 'أيوه: <b>واحدة أو أكتر</b>. صفحات و domain name و host، دي الوصفة كلها.')}</${Talk}>
        `, { sec: t('What a web site is', 'يعني إيه web site') }),
        page(html`
          <${H2}>${t('Pages, one domain, one host', 'صفحات، domain واحد، host واحد')}</${H2}>
          <${Fig} name="qa-web-site" />
        `),

        // 3 · why test it
        page(html`
          <${H2}>${t('Why bother? Ask Internet Explorer', 'ليه نتعب نفسنا؟ اسأل الـ Internet Explorer')}</${H2}>
          <${P} small=${true}>${X('A site built for <b>Internet Explorer</b> may fail in <b>Mozilla</b>, <b>Chrome</b> or on <b>Linux</b>. Testing makes sure it works on <b>every browser and platform</b>.',
            'الـ site اللي معمول لـ <b>Internet Explorer</b> ممكن يبوظ على <b>Mozilla</b> أو <b>Chrome</b> أو على <b>Linux</b>. والـ testing بيتأكد إنه شغال على <b>كل browser وكل platform</b>.')}</${P}>
          <${Fig} name="qa-browsers" />
          <${Talk} who="bug">${t("I live in the browsers nobody tried.", 'أنا ساكن في الـ browsers اللي محدش جرّبها.')}</${Talk}>
        `),

        // 4 · web page fundamentals
        page(html`
          <${H1}>${t('Three parts of every page', 'تلات أجزاء في كل صفحة')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>Home page</b>: الصفحة الـ <b>default</b>. غالبًا فيها <b>header فوق</b> فيه الـ <b>source name</b> بتاع الـ site (text بس، أو designs بـ graphics).',
            'الـ <b>Links</b>: بتربط الصفحات الـ <b>local والـ remote</b> بالـ home page.',
            'الـ <b>Content</b>: وده <b>أهم جزء</b> في الـ site.'
          ] : [
            '<b>Home page</b>: the <b>default</b> page. It usually has a <b>header at the top</b> with the <b>source name</b> of the site (text only, or designs with graphics).',
            '<b>Links</b>: connect <b>local and remote</b> pages to the home page.',
            '<b>Content</b>: the <b>most important</b> part.'
          ]} />
          <${Fig} name="qa-page-parts" />
        `, { sec: t('Web page fundamentals', 'أساسيات الـ web page') }),

        // 5 · links and content
        page(html`
          <${H2}>${t('What links do, what content looks like', 'الـ links بتعمل إيه، والـ content شكله إيه')}</${H2}>
          <div className="hf-qa5-two hf-in">
            <div className="hf-qa5-col"><h5>${t('4 uses of links', '4 استخدامات للـ links')}</h5><ol>${(A ? ['التنقل لصفحات تانية', 'توجيه الـ user لمكان مختلف', 'تنزيل files', 'فتح Internet tools تانية زي الـ e-mail client (مثلًا Outlook)'] : ['Navigate to other pages', 'Direct the user to a different location', 'Download files', 'Open other Internet tools, e.g. the default e-mail client (Outlook)']).map((x, i) => html`<li key=${i}><b>${i + 1}</b>${x}</li>`)}</ol></div>
            <div className="hf-qa5-col"><h5>${t('7 forms of content', '7 أشكال للـ content')}</h5><ol>${(A ? ['الـ text documents', 'الـ graphics', 'الأصوات', 'الـ movie clips اللي بتتنزل', 'الـ fields لبيانات الـ user', 'الإعلانات اللي بتلف (rotating)', 'الـ text اللي بيتغير dynamically'] : ['Text documents', 'Graphics', 'Sounds', 'Downloadable movie clips', 'Fields for user data', 'Rotating advertisements', 'Dynamically changing text']).map((x, i) => html`<li key=${i}><b>${i + 1}</b>${x}</li>`)}</ol></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which is the <b>MOST important</b> part of a web site?" Not the home page, not the links: <b>content</b>. And "downloadable movie clips" is a form of <b>content</b>, even though links are what download files.',
            'لو اتسألت عن <b>أهم</b> جزء في الـ web site، مش الـ home page ولا الـ links، ده الـ <b>content</b>. والـ movie clips اللي بتتنزل دي شكل من أشكال الـ <b>content</b>، مع إن الـ links هي اللي بتنزّل الـ files.')}</p></${Box}>
        `),

        // 6 · sort: link use or content form
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Tap <b>L</b> for a use of links, <b>C</b> for a form of content, or <b>N</b> for neither (it belongs somewhere else in the lecture). Then check.',
            'دوس <b>L</b> لو ده استخدام للـ links، و<b>C</b> لو ده شكل من أشكال الـ content، و<b>N</b> لو مش ده ولا ده (مكانه حتة تانية في المحاضرة). وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="lc" bins=${[['L', t('Use of links', 'استخدام للـ links')], ['C', t('Form of content', 'شكل للـ content')], ['N', t('Neither', 'ولا ده ولا ده')]]} items=${A ? [
            ['تنزيل files', 0], ['الإعلانات اللي بتلف', 1], ['فتح الـ default e-mail client', 0], ['الـ movie clips اللي بتتنزل', 1],
            ['توجيه الـ user لمكان مختلف', 0], ['تشفير الـ login information', 2], ['الـ text اللي بيتغير dynamically', 1], ['الـ buffer overflow attacks', 2]
          ] : [
            ['Download files', 0], ['Rotating advertisements', 1], ['Open the default e-mail client', 0], ['Downloadable movie clips', 1],
            ['Direct the user to a different location', 0], ['Encrypt the login information', 2], ['Dynamically changing text', 1], ['Buffer overflow attacks', 2]
          ]} />
        `),

        // 7 · the 13 elements, 1–7
        page(html`
          <${H2}>${t('The 13 elements of web site testing', 'الـ 13 element بتوع الـ web site testing')}</${H2}>
          <${P} small=${true}>${t('The lecture\'s checklist. First, how the site looks and reads:', 'دي الـ checklist بتاعة المحاضرة. الأول، شكل الـ site وقرايته:')}</${P}>
          <${Elements} from=${0} to=${6} />
        `, { sec: t('The 13 elements', 'الـ 13 element') }),

        // 8 · the 13 elements, 8–13
        page(html`
          <${P} small=${true}>${t('…then tables, layout, and whether it all works:', '…وبعدين الـ tables والشكل، وهل كله شغال:')}</${P}>
          <${Elements} from=${6} to=${13} />
        `),

        // 9 · the 13 elements figure
        page(html`
          <${H2}>${t('Fail it, then pass it', 'خلّيه يفشل، وبعدين يعدّي')}</${H2}>
          <${Hand} red=${true}>${t('Our tip: 9 to 11 overlap. Functionality covers links and forms, then Links and Forms get rows of their own.', 'نصيحة من عندنا: من 9 لـ 11 متداخلين. الـ Functionality فيها الـ links والـ forms، وبعدين الـ Links والـ Forms ليهم سطر لوحدهم.')}</${Hand}>
          <${Fig} name="qa-13-elements" />
        `),

        // 10 · site map, instructions, content
        page(html`
          <${H2}>${t('Three elements with a story', 'تلات elements وراهم حكاية')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Instructions</b>: ناس كتير بتستخدم الـ web sites، وفيه منهم اللي محتاج توضيح.',
            'الـ <b>Site map</b>: الـ users اللي عندهم خبرة <b>عارفين بالظبط عايزين يروحوا فين</b> وبيتجنبوا الـ instructions الطويلة. ومثال السلايد هو الـ site map بتاع Apple:<span class="ltr">http://www.apple.com/sitemap/</span>',
            'الـ <b>Content</b>: الـ bold والـ big fonts والـ blinking text ممكن ماتعجبش الـ customer، و<b>ممكن مايرجعش للـ site تاني</b>.'
          ] : [
            '<b>Instructions</b>: many people use web sites, and some may require clarification.',
            '<b>Site map</b>: experienced users <b>know exactly where they want to go</b> and avoid lengthy instructions. The slide\'s example is Apple\'s: http://www.apple.com/sitemap/',
            '<b>Content</b>: bold text, big fonts and blinking text may not appeal to the customer, <b>who might not revisit the site</b>.'
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Instructions help the beginner; the site map helps the expert. Which of the two would <b>you</b> use on a site you visit every day?',
            'الـ instructions بتساعد اللي لسه جديد، والـ site map بيساعد الخبير. إنت <b>نفسك</b> هتستخدم أنهي واحد فيهم في site بتفتحه كل يوم؟')}</p></${Box}>
        `),

        // 11 · site map figure
        page(html`
          <${H2}>${t('Site map testing: checks (a) to (d)', 'الـ site map testing: الـ checks من (a) لـ (d)')}</${H2}>
          <${Fig} name="qa-site-map" />
        `),

        // 12 · match: which element
        page(html`
          <${H2}>${t('Which element is it?', 'أنهي element ده؟')}</${H2}>
          <${P} small=${true}>${t('Tap an element, then the check that belongs to it.', 'دوس على الـ element، وبعدين على الـ check بتاعه.')}</${P}>
          <${Match} id="el" left=${['Wrap-around', 'Data verification', 'Tables', 'Colors / backgrounds', 'Cookies', 'Site map']}
            right=${A ? ['لستة أسعار طويلة متحطة بحيث الـ user مايفضلش يعمل scroll', 'الـ login information اللي الـ site بيحفظها متشفرة', 'الفقرات بتلف حوالين صورة المنتج ومش بتعدّي تحتها', 'كل صفحة فيها الـ navigation bar، وكل الـ links اللي على الـ map شغالة', 'تاريخ الميلاد اللي اتكتب ماشي على الـ business rules', 'كلام رمادي على خلفية زحمة صعب يتقري']
              : ['A long price list placed so users don\'t keep scrolling', 'Saved login information is encrypted', 'Paragraphs flow around a photo, never under it', 'Every page has the nav bar; every map link works', 'A date of birth follows the business rules', 'Grey text on a busy background is hard to read']}
            answer=${[2, 4, 0, 5, 1, 3]} />
        `, { sec: t('Exercise: which element?', 'تمرين: أنهي element؟') }),

        // 13 · interview with a cookie
        page(html`
          <${Interview} title=${t('A Cookie, exposed', 'الـ Cookie على المكشوف')} sub=${t("This week's interview: element number 13 of 13.", 'حوار الأسبوع: الـ element رقم 13 من 13.')} lines=${A ? [
            ['المذيع', 'إنت آخر واحد في اللستة.'],
            ['الـ Cookie', 'آخر واحد بس مش أقل واحد. الـ sites بتستخدمني أشيل حاجات، زي الـ <b>login information</b> بتاعتك.'],
            ['المذيع', 'والـ tester بيشيّك على إيه فيك؟'],
            ['الـ Cookie', 'حاجتين: إني <b>شغال</b>، وإن الـ login information اللي جوايا <b>encrypted</b>.'],
            ['المذيع', 'وليه encrypted؟'],
            ['الـ Cookie', 'من عندنا: من غير تشفير، أي حد يفتح الـ cookie file يقرا الـ password بتاعك. الرسمة اللي فاتت ورّتك ده.'],
            ['المذيع', 'ناس بتقول إن التشفير ده من استخدامات الـ links.'],
            ['الـ Cookie', 'لأ خالص! تشفير الـ login info ده <b>الـ check بتاعي أنا</b>، مش استخدام للـ links.']
          ] : [
            ['Head First', "You're last on the list."],
            ['Cookie', 'Last, not least. Sites use me to keep things, like your <b>login information</b>.'],
            ['Head First', 'What does the tester check on you?'],
            ['Cookie', 'Two things: that I <b>work</b>, and that the login information inside me is <b>encrypted</b>.'],
            ['Head First', 'Why encrypted?'],
            ['Cookie', 'Ours, not the slides\': without it, anyone who opens the cookie file reads your password. The figure showed you.'],
            ['Head First', 'Some say encrypting is a use of links.'],
            ['Cookie', 'Not at all! Encrypting login info is <b>my</b> check, not a use of links.']
          ]} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Works <b>and</b> encrypted. One without the other fails.', 'شغال <b>و</b> encrypted. واحدة من غير التانية يبقى فشل.')}</${Talk}>
        `),

        // 14 · black-box: text and hyperlinks
        page(html`
          <${H1}>${t('Black-box: test what the user sees', 'الـ Black-box: اختبر اللي الـ user شايفه')}</${H1}>
          <${P} small=${true}>${X('The Infosys home page (Figure 8.5) shows the fundamental elements: <b>text, graphics and hyperlinks</b>, plus forms. What to check in each:',
            'الـ home page بتاعة Infosys (<bdi dir="ltr">Figure 8.5</bdi>) فيها العناصر الأساسية: <b>الـ text والـ graphics والـ hyperlinks</b>، وكمان الـ forms. نشيّك على إيه في كل واحد:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Text</b>: مستوى الـ audience المستهدف، الـ terminology، عمق المحتوى، الموضوع، الدقة، الـ spelling، الـ punctuation، وبيانات التواصل الصح (تليفونات وعناوين).',
            'الـ <b>Hyperlinks</b>: كل واحد بيروح للـ <b>destination الصح</b>، وبيفتح في نفس الـ tab أو window جديدة حسب الـ spec (لو مفيش spec، اتأكد إنه شغال). ولازم يبقى <b>واضح</b>: text عليه underline، ومؤشر الماوس بيتغير.',
            'ولو <b>e-mail link</b>: ابعت e-mail واتأكد إن جالك رد.'
          ] : [
            '<b>Text</b>: target audience level, terminology, depth of content, subject matter, accuracy, spelling, punctuation, correct contact info (phones, addresses).',
            '<b>Hyperlinks</b>: each goes to the <b>correct destination</b> and opens in the same tab or a new window as specified (no spec: check that it works). Links must be <b>obvious</b>: underlined text, the mouse pointer changes.',
            'An <b>e-mail link</b>: send an e-mail and verify you get a response.'
          ]} />
        `, { sec: t('Black-box testing', 'الـ Black-box testing') }),

        // 15 · figure 8.5
        page(html`
          <${H2}>${t('Figure 8.5, tested part by part', 'الـ Figure 8.5، جزء جزء')}</${H2}>
          <${Fig} name="qa-web-parts" />
        `),

        // 16 · graphics and forms
        page(html`
          <${H2}>${t('Graphics and forms', 'الـ Graphics والـ forms')}</${H2}>
          <${P} small=${true}>${X('<b>Graphics</b>: all load and display properly. A <b>missing or wrongly named</b> graphic will not load, and the page shows an <b>error</b> in its place.',
            'الـ <b>Graphics</b>: كلها بتتحمل وبتظهر صح. أي graphic <b>ناقصة أو اسمها غلط</b> مش هتتحمل، والصفحة هتطلّع <b>error</b> مكانها.')}</${P}>
          <${Def}>${X('<b>Forms</b> are text boxes, list boxes and other fields that allow a user to <b>enter or select information</b> on a web page.',
            'الـ <b>Forms</b> هي text boxes و list boxes و fields تانية بتخلّي الـ user <b>يدخّل أو يختار معلومات</b> على الـ web page.')}</${Def}>
          <${P} small=${true}>${t('The four checks for form fields:', 'الـ 4 checks بتوع الـ form fields:')}</${P}>
          <${UL} items=${A ? ['الـ fields متحطة في <b>مكانها الصح</b>؟', '<b>حجمها</b> صح؟', 'بتقبل الـ data <b>الصح</b>؟', 'بترفض الـ data <b>الغلط</b>؟'] : ['Are the fields <b>positioned</b> properly?', 'Are they the <b>correct size</b>?', 'Do they <b>accept correct</b> data?', 'Do they <b>reject bad</b> data?']} />
          <${Grow} />
          <${Hand} arrow="down">${t("the lecture's example: Google's Gmail sign-up form", 'مثال المحاضرة: الـ sign-up form بتاع Gmail')}</${Hand}>
        `),

        // 17 · figure 8.6
        page(html`
          <${H2}>${t("Figure 8.6: Google's form", 'الـ Figure 8.6: الـ form بتاع Google')}</${H2}>
          <${Fig} name="qa-gmail-form" />
        `),

        // 18 · dumb questions on black-box
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ spec مش قايل الـ link يفتح في نفس الـ tab ولا window جديدة. أختبر إيه؟', 'إنه <b>شغال</b>. ده اللي المحاضرة بتقوله لما مفيش spec.'],
            ['إمتى الـ link يبقى "obvious"؟', 'لما الـ text يبقى عليه <b>underline</b> و<b>مؤشر الماوس يتغير</b>. مش لما يبقى bold وكبير، دول المفروض يبقوا أقل حاجة.'],
            ['الـ e-mail link، كفاية إنه يبان link؟', 'لأ. <b>ابعت e-mail من خلاله واتأكد إن جالك رد</b>.'],
            ['الـ password اللي 5 حروف في فورم Gmail، ده أنهي check؟', 'الفورم بيقول <bdi dir="ltr">"Minimum of 8 characters"</bdi>، فإنك تتأكد إنه اترفض ده check إن الـ fields <b>بترفض الـ data الغلط</b>.']
          ] : [
            ["The spec doesn't say same tab or new window. What do I test?", 'That it <b>works</b>. That is the lecture\'s rule when there is no spec.'],
            ['When is a link "obvious"?', 'When the text is <b>underlined</b> and the <b>mouse pointer changes</b>. Not when it\'s bold and big: those should be kept minimal.'],
            ['An e-mail link: is looking like a link enough?', 'No. <b>Send an e-mail through it and verify you get a response.</b>'],
            ['A 5-character password on the Gmail form: which check is that?', 'The form says "Minimum of 8 characters", so checking that it is refused tests that the fields <b>reject bad data</b>.']
          ]} />
        `),

        // 19 · white-box intro
        page(html`
          <${H1}>${t('White-box: open the hood', 'الـ White-box: افتح الكبوت')}</${H1}>
          <${P}>${X('In <b>white-box</b> web testing the tester <b>knows the internal design</b>. The lecture names five elements to test:', 'في الـ <b>white-box</b> web testing الـ tester <b>عارف الـ internal design</b>. المحاضرة بتسمّي خمس elements نختبرهم:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Dynamic content</b>: يعني graphics و text بيتغيروا حسب الظروف (وقت اليوم، الطقس، الـ stock tickers).',
            'الـ <b>Database-driven pages</b>: زي الـ catalogs والـ inventories (الـ e-commerce).',
            'الـ <b>Programmatically created pages</b>: الـ designer بيكتب entries في database، ويعمل drag and drop في layout program، ويدوس زرار يطلّع الـ HTML.',
            'الـ <b>Server performance and loading</b>: المواقع المشهورة بيجيلها ملايين hits في اليوم، فنعمل simulation لملايين connections و downloads.',
            'الـ <b>Security</b>: هجمات الـ denial of service والـ buffer overflow.'
          ] : [
            '<b>Dynamic content</b>: graphics and text that vary with conditions (time of day, weather, stock tickers).',
            '<b>Database-driven pages</b>: catalogs and inventories (e-commerce).',
            '<b>Programmatically created pages</b>: the designer types entries in a database, drags and drops elements in a layout program and presses a button to generate the HTML.',
            '<b>Server performance and loading</b>: popular sites get millions of hits per day, so simulate millions of connections and downloads.',
            '<b>Security</b>: denial of service and buffer overflow attacks.'
          ]} />
        `, { sec: t('White-box testing', 'الـ White-box testing') }),

        // 20 · dynamic content
        page(html`
          <${H2}>${t('Dynamic content: cover every branch', 'الـ Dynamic content: غطّي كل branch')}</${H2}>
          <${Fig} name="qa-dynamic" />
        `),

        // 21 · database-driven and programmatic pages
        page(html`
          <${H2}>${t('From database rows to a catalog page', 'من الـ rows في الـ database لصفحة الـ catalog')}</${H2}>
          <${Fig} name="qa-db-pages" />
        `),

        // 22 · watch it: which white-box element
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Three white-box elements sound alike. Keep them apart by the lecture\'s own examples:', 'فيه تلات white-box elements شبه بعض. افصل بينهم بأمثلة المحاضرة نفسها:')}</p>
            ${li(A ? [
              'بيتغير مع <b>الوقت أو الطقس أو الـ stock tickers</b>؟ ده الـ <b>dynamic content</b>.',
              'صفحات فيها <b>catalogs و inventories</b> جاية من database؟ دي الـ <b>database-driven pages</b>.',
              'فيه <b>layout program</b> وزرار بيطلّع الـ HTML؟ دي الـ <b>programmatically created pages</b>.'
            ] : [
              'Changes with <b>time of day, weather, stock tickers</b>? <b>Dynamic content</b>.',
              '<b>Catalogs and inventories</b> from a database? <b>Database-driven pages</b>.',
              'A <b>layout program</b> and a button that generates the HTML? <b>Programmatically created pages</b>.'
            ])}</${Box}>
          <${Talk} who="bug">${X('And I love it when nobody simulates <b>millions</b> of users. I wait for the first busy day.', 'وأنا بحب أوي لما محدش يعمل simulation لـ <b>ملايين</b> الـ users. بستنى أول يوم زحمة.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('That\'s <b>server performance and loading</b>. I simulate millions of connections before the busy day does.', 'ده الـ <b>server performance and loading</b>. أنا بعمل simulation لملايين الـ connections قبل ما اليوم الزحمة ييجي.')}</${Talk}>
        `),

        // 23 · security
        page(html`
          <${H2}>${t('Security: the two attacks', 'الـ Security: الهجمتين')}</${H2}>
          <${P} small=${true}>${X('The lecture names two: <b>denial of service</b> and <b>buffer overflow</b>. Try both.', 'المحاضرة بتسمّي اتنين: الـ <b>denial of service</b> والـ <b>buffer overflow</b>. جرّب الاتنين.')}</${P}>
          <${Fig} name="qa-security" />
        `),

        // 24 · gray-box
        page(html`
          <${H1}>${t('Gray-box: a bit of both', 'الـ Gray-box: شوية من ده وشوية من ده')}</${H1}>
          <${Def}>${X('<b>Gray-box testing</b> is a mix of black-box and white-box. Its purpose is to <b>isolate defects related to bad design or bad implementation</b> of the web.',
            'الـ <b>Gray-box testing</b> خليط من الـ black-box والـ white-box. والهدف منه إنه <b>يعزل الـ defects اللي ليها علاقة بـ design وحش أو implementation وحش</b> للـ web.')}</${Def}>
          <${P} small=${true}>${X('‡ Why is it possible for web sites? That reason is <b>not on the slides</b>; the notes add it: the tester works from the <b>user\'s view</b> but can also <b>see the page\'s HTML and scripts</b> (view source).',
            '‡ ليه ينفع مع الـ web sites؟ السبب ده <b>مش في السلايدز</b>، النوتس هي اللي زوّدته: الـ tester بيشتغل من <b>وجهة نظر الـ user</b>، بس كمان <b>يقدر يشوف الـ HTML والـ scripts</b> بتوع الصفحة (view source).')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Gray-box does <b>not</b> replace black-box tests, and it is <b>not</b> "only test the server load". Its purpose: isolate design or implementation defects.',
            'الـ Gray-box <b>مش</b> بيستبدل الـ black-box tests، و<b>مش</b> بيختبر الـ server load بس. هدفه إنه يعزل defects الـ design أو الـ implementation.')}</p></${Box}>
        `, { sec: t('Gray-box testing', 'الـ Gray-box testing') }),

        // 25 · box views figure
        page(html`
          <${H2}>${t('Same page, three views', 'نفس الصفحة، تلات نظرات')}</${H2}>
          <${Fig} name="qa-box-views" />
        `),

        // 26–27 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Black-box and White-box argue over who tests a web site better.", 'قعدة الليلة: الـ Black-box والـ White-box بيتخانقوا مين بيختبر الـ web site أحسن.')} />
          <${Chat} names=${[t('Black-box', 'الـ Black-box'), t('White-box', 'الـ White-box')]} lines=${A ? [
            [0, 'أنا بختبر الـ site زي ما الـ user بيشوفه: الـ <b>text</b> والـ <b>hyperlinks</b> والـ <b>graphics</b> والـ <b>forms</b>. عمري ما ببص جوه.'],
            [1, 'أنا <b>عارف الـ internal design</b>. بختبر اللي إنت مش شايفه: الـ <b>dynamic content</b> والـ <b>database-driven pages</b>.'],
            [0, 'أنا بدوس على كل link وأتأكد إنه وصل لـ <b>الـ destination الصح</b>، وبكتب data غلط في الـ forms وأتأكد إنها <b>اترفضت</b>.'],
            [1, 'لطيف. أنا بعمل simulation لـ <b>ملايين الـ connections</b>، وبجرّب الـ <b>denial of service</b> والـ <b>buffer overflow</b>.']
          ] : [
            [0, 'I test the site the way a user meets it: the <b>text</b>, the <b>hyperlinks</b>, the <b>graphics</b> and the <b>forms</b>. I never look inside.'],
            [1, 'I <b>know the internal design</b>. I test what you can\'t see: <b>dynamic content</b>, <b>database-driven pages</b>.'],
            [0, 'I click every link and check it reaches the <b>correct destination</b>. I type bad data into forms and make sure it\'s <b>rejected</b>.'],
            [1, 'Cute. I simulate <b>millions of connections</b>, and I try <b>denial of service</b> and <b>buffer overflow</b>.']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Black-box', 'الـ Black-box'), t('White-box', 'الـ White-box')]} start=${1} lines=${A ? [
            [0, 'الصورة طلّعت error. أنا شايف الـ error، بس مش شايف السبب.'],
            [1, 'وأنا شايف الـ server والـ database، بس مش شايف الصفحة زي الـ user.'],
            [0, 'يبقى محتاجين حد في النص.'],
            [1, 'ده الـ <b>gray-box</b>: خليط مننا إحنا الاتنين، وشغلته إنه <b>يعزل الـ defects</b> اللي سببها design وحش أو implementation وحش.']
          ] : [
            [0, 'The graphic shows an error. I can see the error, but not why.'],
            [1, 'And I can see the server and the database, but not the page the way the user does.'],
            [0, 'So we need someone in between.'],
            [1, 'That\'s <b>gray-box</b>: a mix of us both. Its job is to <b>isolate defects</b> caused by bad design or bad implementation.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('in the figure, gray-box reads the HTML: the image is incorrectly named, a bad implementation', 'في الرسمة الـ gray-box قرا الـ HTML ولقى إن الصورة اسمها غلط، يعني implementation وحش')}</${Hand}>
        `),

        // 28 · sort: black, white or gray
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which approach does it? <b>B</b> black-box, <b>W</b> white-box, <b>G</b> gray-box.', 'مين بيعمل كده؟ <b>B</b> للـ black-box، و<b>W</b> للـ white-box، و<b>G</b> للـ gray-box.')}</p></${Box}>
          <${Sort} id="bwg" bins=${[['B', t('Black-box', 'الـ Black-box')], ['W', t('White-box', 'الـ White-box')], ['G', t('Gray-box', 'الـ Gray-box')]]} items=${A ? [
            ['تشيّك على الـ spelling والـ punctuation', 0], ['عمل simulation لملايين الـ connections', 1], ['كل hyperlink بيوصل للـ destination الصح', 0],
            ['كل branch في رسالة الصبح والمسا', 1],
            ['الـ denial of service والـ buffer overflow', 1], ['عزل defects الـ design أو الـ implementation الوحش', 2], ['الـ form fields بترفض الـ data الغلط', 0], ['خليط الاتنين: من عين الـ user ومعاه الـ HTML', 2]
          ] : [
            ['Check spelling and punctuation', 0], ['Simulate millions of connections', 1], ['Each hyperlink reaches the correct destination', 0],
            ['Every branch of the time-of-day greeting', 1],
            ['Denial of service and buffer overflow', 1], ['Isolate bad design or implementation defects', 2], ['Form fields reject bad data', 0], ["A mix: the user's view plus the HTML", 2]
          ]} />
        `, { sec: t('Exercise: black, white or gray?', 'تمرين: black ولا white ولا gray؟') }),

        // 29 · configuration and compatibility
        page(html`
          <${H1}>${t('Configuration and compatibility', 'الـ Configuration والـ compatibility')}</${H1}>
          <div className="hf-qa5-two hf-in">
            <div className="hf-qa5-col"><h5>${t('Hardware configurations', 'الـ Hardware configurations')}</h5><ol>${(A ? ['أنواع الـ CPU', 'الـ RAM', 'الـ graphics cards', 'الـ video capture cards', 'الـ audio cards', 'الـ monitors والـ display devices', 'الـ network cards'] : ['CPU types', 'RAM', 'Graphics cards', 'Video capture cards', 'Audio cards', 'Monitors / display devices', 'Network cards']).map((x, i) => html`<li key=${i}><b>${i + 1}</b>${x}</li>`)}</ol></div>
            <div className="hf-qa5-col"><h5>${t('Compatibility', 'الـ Compatibility')}</h5><ol>${(A ? ['الـ font sizes المختلفة', 'الـ browsers مع الـ CSS', 'الـ screen resolutions المختلفة', 'الـ memory sizes المختلفة', 'الـ network environments المختلفة'] : ['Various font sizes', 'Browsers with CSS', 'Various screen resolutions', 'Various memory sizes', 'Different network environments']).map((x, i) => html`<li key=${i}><b>${i + 1}</b>${x}</li>`)}</ol></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>RAM</b> is in the hardware list; <b>memory sizes</b> is in the compatibility list. <b>Keyboard layout</b> and <b>printer models</b> are in neither: classic "which is NOT" options.',
            'الـ <b>RAM</b> في لستة الـ hardware، والـ <b>memory sizes</b> في الـ compatibility. والـ <b>keyboard layout</b> والـ <b>printer models</b> مش في ولا واحدة، ودول اختيارات "which is NOT" المشهورة.')}</p></${Box}>
        `, { sec: t('Configuration and compatibility', 'الـ Configuration والـ compatibility') }),

        // 30 · config count figure
        page(html`
          <${H2}>${t('How the configurations multiply', 'الـ configurations بتتضرب في بعض إزاي')}</${H2}>
          <${Fig} name="qa-config-count" />
        `),

        // 31 · compat view figure
        page(html`
          <${H2}>${t('One page, many settings', 'صفحة واحدة، إعدادات كتير')}</${H2}>
          <${Fig} name="qa-compat-view" />
        `),

        // 32 · be the calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the calculator', 'خليك إنت الآلة الحاسبة')}><p className="hf-p small">${X('Every variant of one factor meets every variant of the others, so the counts <b>multiply</b> (that is how the figures count). The numbers are our own examples; the factors are the lecture\'s.',
            'كل variant في factor بيتقابل مع كل variant في الـ factors التانية، فالأعداد <b>بتتضرب</b> (وكده الرسمتين بيعدّوا). الأرقام أمثلة من عندنا، بس الـ factors من المحاضرة.')}</p></${Box}>
          <${CountDrill} id="cd" />
        `, { sec: t('Exercise: count the configurations', 'تمرين: عِد الـ configurations') }),

        // 33 · tools
        page(html`
          <${H1}>${t('Let the robots click', 'سيب الـ robots تدوس')}</${H1}>
          <${P} small=${true}>${X('<b>Automatic web testing tools</b> check ten things:', 'الـ <b>Automatic web testing tools</b> بتختبر عشر حاجات:')}</${P}>
          <div className="hf-qa5-two hf-in">
            <div className="hf-qa5-col"><ol>${(A ? ['الـ browser compatibility', 'الـ load والـ stress والـ performance', 'الـ hyperlinks المكسورة', 'الـ web functional والـ GUI testing', 'الـ spelling'] : ['Browser compatibility', 'Load, stress and performance', 'Broken hyperlinks', 'Web functional / GUI testing', 'Spelling']).map((x, i) => html`<li key=${i}><b>${i + 1}</b>${x}</li>`)}</ol></div>
            <div className="hf-qa5-col"><ol>${(A ? ['الـ security', 'الـ database', 'الـ OOP', 'الـ network', 'الـ web applications'] : ['Security', 'Database', 'OOP', 'Network', 'Web applications']).map((x, i) => html`<li key=${i}><b>${i + 6}</b>${x}</li>`)}</ol></div>
          </div>
          <${Talk} who="lens">${X('For <b>web applications</b> the lecture names two tools: <b>Selenium</b> and <b>Cypress</b>.', 'للـ <b>web applications</b> المحاضرة بتسمّي tools اتنين: الـ <b>Selenium</b> والـ <b>Cypress</b>.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Excel, Word, Git, Docker, Figma, Balsamiq: none of them. And "domain name registration" is not on the tools list.',
            'الـ Excel والـ Word والـ Git والـ Docker والـ Figma والـ Balsamiq: ولا واحد فيهم. وكمان الـ "domain name registration" مش في لستة الـ tools.')}</p></${Box}>
        `, { sec: t('Automatic tools', 'الـ Automatic tools') }),

        // 34 · tools figure
        page(html`
          <${H2}>${t('Ten checks and a Cypress test', 'عشر checks و Cypress test')}</${H2}>
          <${Fig} name="qa-web-tools" />
        `),

        // 35 · exam corner: the doctors' questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("This lecture has three questions from the doctors' papers, and here they all are. Tap an answer to see why.", 'المحاضرة دي ليها تلات أسئلة من امتحانات الدكاترة، وكلهم هنا. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /works properly across different hardware and software environments/)}
          <${Grow} />
          <${Hand} red=${true}>${t("not black box: running across environments is compatibility testing", 'مش الـ black box، لأن التجربة على environments مختلفة اسمها compatibility testing')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /Dynamic content is graphics and text that vary/)}
          <${Gap} h=${8} />
          ${mq('m3', /navigational map helps the user/)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Both true, both word for word from the lecture.', 'الاتنين صح، والاتنين من المحاضرة حرف بحرف.')}</${Talk}>
        `),

        // 37–40 · practice questions (the site's own)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("These are the site's own practice questions, not the doctors'. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /MOST important part of a web site/)}
          <${Grow} />
          <${Talk} who="dev">${t('Not the home page. Got it.', 'مش الـ home page. فهمت.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /Security testing of a web site/)}
          <${Gap} h=${4} />
          ${pq('p3', /purpose of gray-box web site testing/)}
        `),
        page(html`
          ${pq('p4', /NOT in the lecture's list of hardware configuration checks/)}
          <${Gap} h=${4} />
          ${pq('p5', /When testing cookies used for storing login/)}
        `),
        page(html`
          ${pq('p6', /tools are named for testing web applications/)}
          <${Gap} h=${4} />
          ${pq('p7', /When black-box testing an e-mail link/)}
        `),

        // 41 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>web site</b> هو web pages تحت <b>نفس الـ domain</b>، وليه <b>domain name و web host</b>. وبنختبره على <b>كل browser وكل platform</b>.',
            'أساسيات الصفحة: الـ <b>home page</b> والـ <b>links</b> (4 استخدامات) والـ <b>content</b> (7 أشكال، و<b>أهم جزء</b>).',
            'الـ <b>13 elements</b>: من الـ user interface لحد الـ cookies (شغالة و encrypted).',
            'الـ <b>Black-box</b>: الـ text والـ hyperlinks والـ graphics والـ forms.',
            'الـ <b>White-box</b>: الـ dynamic content، والـ database-driven والـ programmatic pages، والـ server load، والـ security.',
            'الـ <b>Gray-box</b>: خليط، وبيعزل defects الـ design أو الـ implementation الوحش.',
            'الـ <b>Configuration</b> فيه 7 hardware factors، والـ <b>compatibility</b> فيه 5، والأعداد بتتضرب.',
            'الـ <b>Tools</b>: عشر checks، والـ <b>Selenium و Cypress</b> للـ web applications.'
          ] : [
            'A <b>web site</b> is web pages under the <b>same domain</b>, with a <b>domain name and a web host</b>. Test it on <b>every browser and platform</b>.',
            'Page fundamentals: <b>home page</b>, <b>links</b> (4 uses), <b>content</b> (7 forms, the <b>most important</b> part).',
            'The <b>13 elements</b>: user interface through cookies (they work and are encrypted).',
            '<b>Black-box</b>: text, hyperlinks, graphics, forms (positioned, size, accept good, reject bad).',
            '<b>White-box</b>: dynamic content, database-driven and programmatic pages, server load, security (DoS, buffer overflow).',
            '<b>Gray-box</b>: a mix; it isolates bad design or bad implementation defects.',
            '<b>Configuration</b>: 7 hardware factors; <b>compatibility</b>: 5. The counts multiply.',
            '<b>Tools</b>: ten checks; <b>Selenium and Cypress</b> for web applications.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 42 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 5!', 'خلّصت الفصل الخامس!')}</${H1}>
            <${Talk} who="lens">${t('Next time: from testing one site to assuring the quality of the whole process. SQA!', 'المرة الجاية: من اختبار site واحد لضمان جودة العملية كلها. الـ SQA!')}</${Talk}>
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

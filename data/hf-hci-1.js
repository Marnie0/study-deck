// Head First chapter for Human Computer Interaction Lecture 1 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Introduction to HCI and interaction design: what the course studies, what HCI is (and HMI, MMI), the three parts of HCI,
// the objectives of HCI, interaction design and its goals, the invisible interface, the gallery of bad and good designs
// (elevator, vending machine, marble answering machine, TiVo, smart TV), user research (the truckers), the UI design process,
// the Office story (bloatware, adaptive menus, rafted toolbars, CEIP), the two library searches, the doctor's office form,
// design considerations, interaction design as the umbrella term, UI vs UX vs HCI, and the fields around interaction design.
// Every fact comes from the lecture's notes; sections the notes take from last year's slides are tagged as such;
// analogies, mock-ups and scenarios of our own are marked as ours.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci1')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci1';
    s.textContent = `
.hfb .hf-hci1-ly{ align-self:flex-start; display:inline-block; font:700 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--hf-k); border:1.5px solid var(--hf-k); border-radius:99px; padding:4px 9px; }
.hfb .hf-hci1-chips{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-hci1-chips span{ font:600 13.5px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:99px; padding:3px 9px; background:var(--paper); color:var(--ink); }
.hfb .hf-hci1-chips span.k{ border-color:var(--hf-k); color:var(--hf-k); font-weight:800; }
.hfb .hf-hci1-ph{ display:grid; gap:4px; }
.hfb .hf-hci1-ph p{ margin:0; font-size:14px; line-height:1.32; color:var(--ink); padding:4px 9px; border-radius:6px; background:var(--hf-grey); }
.hfb .hf-hci1-ph p b{ color:var(--hf-k); font-weight:800; }
.hfb .hf-hci1-quote{ border-left:5px solid var(--hf-k); padding:3px 0 3px 11px; font:italic 15.5px/1.38 var(--display); color:var(--ink); margin:0; }
.hfb .hf-hci1-quote small{ display:block; font:700 13px/1.2 var(--body); font-style:normal; color:var(--graphite); margin-top:3px; }
.hfb .hf-hci1-tb{ display:grid; grid-template-columns:1fr 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-hci1-tb > span{ padding:4px 9px; font-size:14px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-hci1-tb > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-hci1-tb > span.h{ font:800 13px/1.3 var(--body); text-transform:uppercase; letter-spacing:.05em; background:var(--hf-line); color:var(--paper); }
.hfb .hf-hci1-tb > span:nth-child(odd){ border-right:1px solid var(--hf-grey2); }
.hfb .hf-hci1-uxh{ display:grid; gap:6px; }
.hfb .hf-hci1-uxh > div{ display:grid; grid-template-columns:56px 1fr; gap:9px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 9px; background:var(--paper); }
.hfb .hf-hci1-uxh b.n{ font:800 19px/1 var(--body); color:var(--hf-k); text-align:center; }
.hfb .hf-hci1-uxh p{ margin:0; font-size:14px; line-height:1.32; color:var(--ink); }
/* the adaptive menu, our mock-up */
.hfb .hf-hci1-app{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; background:var(--paper); }
.hfb .hf-hci1-mbar{ display:flex; gap:12px; padding:5px 10px; background:var(--hf-grey); font:600 13px/1.25 var(--body); color:var(--ink); border-bottom:1.5px solid var(--hf-line); }
.hfb .hf-hci1-mbar b{ background:var(--hf-line); color:var(--paper); padding:0 6px; border-radius:3px; }
.hfb .hf-hci1-mw{ display:flex; gap:10px; height:224px; padding:0 8px 0 40px; }
.hfb .hf-hci1-menu{ flex:none; width:168px; align-self:flex-start; border:1.5px solid var(--hf-line); border-top:0; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-hci1-menu button{ display:block; width:100%; text-align:left; font:500 13.5px/21px var(--body); height:22px; padding:0 9px; border:0; background:none; color:var(--ink); cursor:pointer; }
.hfb .hf-hci1-menu button.nw{ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-hci1-menu button.miss{ color:var(--hf-red); text-decoration:line-through; }
.hfb .hf-hci1-menu button.hit{ background:var(--ok); color:var(--paper); font-weight:700; }
.hfb .hf-hci1-menu button.chev{ text-align:center; font-weight:800; color:var(--hf-k); border-top:1px dotted var(--faint); letter-spacing:-.1em; }
.hfb .hf-hci1-menu button.chev.pulse{ animation:hf-hci1-pulse 1.2s ease-in-out infinite; }
@keyframes hf-hci1-pulse{ 50%{ background:color-mix(in srgb, var(--hf-k) 22%, var(--paper)); } }
.hfb .hf-hci1-side{ flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:6px; padding-top:8px; }
.hfb .hf-hci1-side .lb{ font:800 12.5px/1.15 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); margin:0; }
.hfb .hf-hci1-side .vl{ font:800 15px/1.15 var(--body); color:var(--ink); margin:0; }
.hfb .hf-hci1-side .sc{ font:800 34px/1 var(--body); color:var(--hf-k); margin:0; }
.hfb .hf-hci1-side .sc.two{ color:var(--hf-red); }
.hfb .hf-hci1-msg{ min-height:64px; margin:0; }
.hfb .hf-hci1-tabs{ display:flex; gap:5px; }
.hfb .hf-hci1-tabs button{ flex:1 1 0; min-width:0; min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:700 13.5px/1.1 var(--body); cursor:pointer; }
.hfb .hf-hci1-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
/* the hierarchy of fields */
.hfb .hf-hci1-tree{ display:flex; flex-direction:column; align-items:center; gap:3px; }
.hfb .hf-hci1-tree .rw{ display:flex; gap:6px; justify-content:center; align-items:center; }
.hfb .hf-hci1-tree .nd{ font:700 13.5px/1.15 var(--body); border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 8px; background:var(--paper); color:var(--ink); text-align:center; }
.hfb .hf-hci1-tree .nd.k{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-hci1-tree .nd.h{ border-color:var(--hf-k); box-shadow:0 0 0 2px var(--hf-k); }
.hfb .hf-hci1-tree .pl{ font:800 16px/1 var(--body); color:var(--graphite); }
.hfb .hf-hci1-tree .dn{ font:800 17px/1 var(--body); color:var(--hf-k); }
.hf-ar .hf-hci1-ly, .hf-ar .hf-hci1-chips span, .hf-ar .hf-hci1-ph p, .hf-ar .hf-hci1-tb > span, .hf-ar .hf-hci1-uxh p, .hf-ar .hf-hci1-side .lb, .hf-ar .hf-hci1-side .vl, .hf-ar .hf-hci1-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-hci1-ph p, .hf-ar .hf-hci1-uxh p{ line-height:1.5; font-size:13.5px; }
.hf-ar .hf-hci1-tb > span{ line-height:1.4; }
.hf-ar .hf-hci1-tb > span:nth-child(odd){ border-right:0; border-left:1px solid var(--hf-grey2); }
.hf-ar .hf-hci1-quote{ border-left:0; border-right:5px solid var(--hf-k); padding:3px 11px 3px 0; font-family:"IBM Plex Sans Arabic", var(--body); font-style:normal; font-size:14.5px; line-height:1.55; }
.hf-ar .hf-hci1-quote .ltr{ font-family:var(--display); font-style:italic; }
.hf-ar .hf-hci1-quote small{ font-family:"IBM Plex Sans Arabic", var(--body); }
@media (prefers-reduced-motion: reduce){ .hfb .hf-hci1-menu button.chev.pulse{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // Office 2000's adaptive (personalized) menu, as our own mock-up: find a command with the short menu on, then with it off
  const FULL = ['Font…', 'Paragraph…', 'Bullets and Numbering…', 'Borders and Shading…', 'Columns…', 'Tabs…', 'Drop Cap…', 'Change Case…', 'Background', 'Styles…'];
  const SHORT = [0, 1, 2];
  const GOAL = 4;
  function AdaptiveMenu() {
    const ar = useAr();
    const [st, setSt] = H.K.useSlot('menu', { on: true, exp: false, scans: 1, found: false, miss: null });
    const start = on => setSt({ on, exp: !on, scans: 1, found: false, miss: null });
    const tap = k => { if (st.found) return; setSt(Object.assign({}, st, k === GOAL ? { found: true, miss: null } : { miss: k })); };
    const chev = () => setSt(Object.assign({}, st, { exp: true, scans: 2, miss: null }));
    const shown = st.exp ? FULL.map((_, k) => k) : SHORT;
    const msg = st.found
      ? (st.scans > 1
        ? t2(ar, 'Found it, but only after scanning the short menu, opening the chevron, and <b>scanning the full menu again</b>. That extra scan is why scanning took <b>twice as long</b>.', 'لقيته، بس بعد ما عملت scan للـ menu القصيرة، وفتحت الـ chevron، و<b>عملت scan تاني للـ menu الكاملة</b>. الـ scan الزيادة ده هو اللي خلّى الـ scanning ياخد <b>ضعف الوقت</b>.')
        : t2(ar, 'Found it in <b>one scan</b> of the full menu. Office later turned the adaptive menus <b>off by default</b>.', 'لقيته في <b>scan واحد</b> للـ menu الكاملة. والـ Office بعد كده قفل الـ adaptive menus <b>by default</b>.'))
      : st.miss != null
        ? t2(ar, 'Not that one. Keep looking.', 'مش ده. دوّر تاني.')
        : st.exp
          ? t2(ar, 'The full menu. The commands the short menu hid are <b>shaded</b>. Now find it.', 'دي الـ menu الكاملة. الـ commands اللي الـ menu القصيرة كانت مخبياها <b>متلونة</b>. دوّر عليه دلوقتي.')
          : t2(ar, 'Find <b>Columns…</b> in the Format menu. The adaptive menu shows only the commands it <b>predicts</b> you use; the chevron <b>▾▾</b> expands the rest.', 'دوّر على <b>Columns…</b> في الـ Format menu. الـ adaptive menu بتعرض بس الـ commands اللي <b>متوقعة</b> إنك بتستخدمها، والـ chevron <bdi>▾▾</bdi> بيفتح الباقي.');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hci1-tabs" role="group" aria-label="Adaptive menus">
        <button aria-pressed=${String(st.on)} onClick=${() => start(true)}>${ar ? 'الـ adaptive menus شغالة' : 'Adaptive menus on'}</button>
        <button aria-pressed=${String(!st.on)} onClick=${() => start(false)}>${ar ? 'الـ adaptive menus مقفولة' : 'Adaptive menus off'}</button>
      </div>
      <div className="hf-hci1-app" dir="ltr">
        <div className="hf-hci1-mbar" aria-hidden="true"><span>File</span><span>Edit</span><span>View</span><b>Format</b><span>Tools</span></div>
        <div className="hf-hci1-mw">
          <div className="hf-hci1-menu" role="menu" aria-label="Format menu">
            ${shown.map(k => html`<button key=${k} role="menuitem" className=${(st.exp && st.on && !SHORT.includes(k) ? 'nw' : '') + (st.miss === k ? ' miss' : '') + (st.found && k === GOAL ? ' hit' : '')} onClick=${() => tap(k)}>${FULL[k]}</button>`)}
            ${!st.exp && html`<button className=${'chev' + (st.miss != null && !calm() ? ' pulse' : '')} aria-label="Expand the menu" onClick=${chev}>▾▾</button>`}
          </div>
          <div className="hf-hci1-side" dir=${ar ? 'rtl' : 'ltr'}>
            <p className="lb">${ar ? 'المطلوب' : 'Task'}</p><p className="vl" dir="ltr">Columns…</p>
            <p className="lb" style=${{ marginTop: '8px' }}>${ar ? 'عدد مرات الـ scan' : 'Menu scans'}</p>
            <p className=${'sc' + (st.scans > 1 ? ' two' : '')}>${st.scans}</p>
          </div>
        </div>
      </div>
      <p className="hf-p small hf-hci1-msg" key=${String(st.found) + st.scans + st.miss}>${T(msg)}</p>
      <div className="hf-row"><button className="hf-btn" onClick=${() => start(st.on)}>${ar ? 'من الأول' : 'Start over'}</button></div>
    </div>`;
  }
  function t2(ar, en, a) { return ar ? a : en; }

  // last year's hierarchy of fields, drawn as a little tree
  function Tree() {
    const d = i => ({ animationDelay: calm() ? '0s' : (0.15 + i * 0.25) + 's' });
    return html`<div className="hf-hci1-tree" dir="ltr">
      <div className="rw hf-in" style=${d(0)}><span className="nd">Engineering</span><span className="pl">+</span><span className="nd">Psychology</span></div>
      <span className="dn hf-in" style=${d(1)}>↓</span>
      <div className="rw hf-in" style=${d(1)}><span className="nd k">Human Factors Engineering</span></div>
      <span className="dn hf-in" style=${d(2)}>↙ ↓ ↘</span>
      <div className="rw hf-in" style=${d(2)}><span className="nd">Industrial Design</span><span className="nd h">HCI</span><span className="nd">Product Design</span></div>
      <span className="dn hf-in" style=${d(3)}>↙ ↓ ↘</span>
      <div className="rw hf-in" style=${d(3)}><span className="nd">UI Design</span><span className="nd">UX Design</span><span className="nd">Interaction</span></div>
    </div>`;
  }

  H.chapters.hci[1] = {
    title: 'Introduction to HCI and Interaction Design', kicker: 'Chapter 1', run: 'introduction to hci',
    ar: { title: 'مقدمة عن الـ HCI والـ Interaction Design', kicker: 'الفصل 1', run: 'مقدمة عن الـ hci' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (the 2024/25 exam and the 2026/27 midterm), with the site's Arabic whys
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[1] && window.AR.hci.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const LY = () => html`<span className="hf-hci1-ly hf-in">${t("last year's slides", 'من slides السنة اللي فاتت')}</span>`;
      const ph = items => html`<div className="hf-hci1-ph hf-in">${items.map((x, i) => html`<p key=${i} className="hf-in" style=${{ animationDelay: calm() ? '0s' : (0.1 + i * 0.1) + 's' }}>${T(x)}</p>`)}</div>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X(`We know what you're thinking: <i>"A whole course about buttons?"</i> Your brain keeps what's surprising, visual and a bit emotional, so that's how this chapter is written. The facts are all from the doctors' slides.`,
            'عارفين إنت بتفكر في إيه: <i>"كورس كامل عن الزراير؟"</i> مخك بيفتكر الحاجة اللي بتفاجئه واللي فيها صور ومشاعر، فالفصل مكتوب كده. بس كل المعلومات من سلايدز الدكاترة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" and the matching games are not optional. You answer right on the page.', '<b>حل التمارين.</b> "امسك القلم" وألعاب التوصيل مش اختياري. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, many taken from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، وكتير منها من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk" style=${{ fontSize: '12px', color: 'var(--hf-k)' }}>LY</span><span>${X("A <b>last year's slides</b> tag marks parts the notes keep from last year's slides. Study them too.", 'علامة <b>من slides السنة اللي فاتت</b> على جزء النوتس واخداه منها. ذاكره برضه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, mock-ups and tricks.', 'الملاحظات المكتوبة بخط الإيد واللي عليها "من عندنا" دي تشبيهات ورسومات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>Human Computer Interaction` : html`Chapter one<br/>Human Computer Interaction`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('The Interface That Disappears', 'الـ Interface اللي بيختفي')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('introduction to HCI and interaction design', 'مقدمة عن الـ HCI والـ interaction design')}</p></div>
          <${P}>${X("You've pushed a door that said <i>pull</i>. You've pressed the wrong button in a lift. That wasn't your fault. That was <b>design</b>.", 'أكيد زقّيت باب مكتوب عليه <i>اسحب</i>. وأكيد دوست زرار غلط في أسانسير. ده مش ذنبك. ده ذنب الـ <b>design</b>.')}</${P}>
          <${Talk} who="bug">${X("I'm a usability problem. I live in <b>buttons that all look the same</b> and in forms that crash at the end.", 'أنا usability problem. ساكن في <b>الزراير اللي شكلها كلها واحد</b>، وفي الفورمز اللي بتضرب في الآخر.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("And I'm user research. I find you by <b>watching real users</b>, not by guessing.", 'وأنا الـ user research. بلاقيك عن طريق إني <b>أراقب users حقيقيين</b>، مش بالتخمين.')}</${Talk}>
          <${P} small=${true}>${X('In this chapter: what HCI is, interaction design, the invisible interface, a gallery of bad and good designs, user research, the Office story, UI vs UX vs HCI, and the fields around interaction design.',
            'في الفصل ده: يعني إيه HCI وأجزاؤه التلاتة، والـ interaction design وأهدافه، والـ invisible interface، ومعرض لتصميمات وحشة وكويسة، وليه الـ user research مهم، وقصة الـ Office، والفرق بين الـ UI والـ UX والـ HCI، والمجالات اللي حوالين الـ interaction design.')}</${P}>
        `, { sec: t('Meet HCI', 'اتعرّف على الـ HCI') }),

        // 2 · what you will learn
        page(html`
          <${H2}>${t('What this course is about', 'الكورس ده عن إيه')}</${H2}>
          <${Def}>${X('What we need to know in order to design computerized systems whose users can get the <b>maximum benefit</b> from the system <b>with ease</b>.',
            'إيه اللي محتاجين نعرفه عشان نصمم computerized systems الـ users بتوعها ياخدوا منها <b>أقصى استفادة</b> <b>بسهولة</b>.')}</${Def}>
          <${P} small=${true}>${t('So HCI involves the study of three things:', 'فالـ HCI بيشمل دراسة 3 حاجات:')}</${P}>
          ${ph(A ? [
            '<b>البني آدمين</b>، يعني احتياجاتهم، وقدراتهم، وحدودهم، ...',
            'الـ <b>computer technologies</b> اللي ممكن تحسّن التفاعل بين الـ users والكمبيوتر.',
            '<b>الطرق والتفضيلات والصعوبات</b> اللي بتقابل الـ users بتوع الأنظمة الحالية أو القديمة.'
          ] : [
            '<b>Humans</b>: their needs, abilities, limitations, ...',
            '<b>Computer technologies</b> that can enhance the interaction between users and computers.',
            'The <b>ways, preferences and difficulties</b> faced by users of current or past systems.'
          ])}
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X("The slides say you may already have a sense of some of this material, since you are <b>humans</b>, <b>technology users</b> and <b>computer students</b>. Think of one app that annoyed you this week. What exactly went wrong?",
            'السلايدز بتقول إنك غالبًا حاسس إنك عارف حاجات من المادة دي، عشان إنت <b>بني آدم</b>، وبتستخدم <b>التكنولوجيا</b>، و<b>طالب كمبيوتر</b>. افتكر app ضايقك الأسبوع ده. إيه بالظبط اللي غلط؟')}</p></${Box}>
        `),

        // 3 · what is HCI + figure
        page(html`
          <${H1}>${t('So what is HCI?', 'يعني إيه HCI؟')}</${H1}>
          <${Def}>${X('<b>HCI</b> is the interaction between user and computer, OR the relationship between users and computer systems.',
            'الـ <b>HCI</b> هو التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems.')}</${Def}>
          <${P} small=${true}>${X('A <b>multidisciplinary field of study</b> focusing on the design of computer technology, in particular the interaction between humans (the users) and computers. Initially concerned with computers, it has expanded to cover <b>almost all forms of information technology design</b>.',
            'وهو <b>multidisciplinary field of study</b> بيركز على تصميم الـ computer technology، وبالذات التفاعل بين الـ users والكمبيوتر. كان مهتم بالكمبيوتر بس، وبعدين اتوسع وبقى بيغطي <b>تقريبًا كل أشكال الـ information technology design</b>.')}</${P}>
          <${Fig} name="user-computer" />
        `, { sec: t('What is HCI?', 'يعني إيه HCI؟') }),

        // 4 · last year's: HMI, MMI, D-I-E, three parts
        page(html`
          <${LY} />
          <${H2}>${t('Three names, three jobs, three parts', '3 أسامي، و3 شغلانات، و3 أجزاء')}</${H2}>
          <${P} small=${true}>${t('Terms used interchangeably:', 'مصطلحات بتتقال بنفس المعنى:')}</${P}>
          <div className="hf-hci1-chips hf-in" dir="ltr"><span><b style=${{ color: 'var(--hf-k)' }}>HCI</b> Human Computer Interaction</span><span><b style=${{ color: 'var(--hf-k)' }}>HMI</b> Human Machine Interaction</span><span><b style=${{ color: 'var(--hf-k)' }}>MMI</b> Man Machine Interaction</span></div>
          <${P} small=${true}>${X('HCI deals with the <b>Design</b>, <b>Implementation</b> and <b>Evaluation</b> of interactive systems. Three parts meet in it:',
            'الـ HCI بيتعامل مع الـ <b>Design</b> والـ <b>Implementation</b> والـ <b>Evaluation</b> بتاع الـ interactive systems. وفيه 3 أجزاء بيتقابلوا:')}</${P}>
          ${ph(A ? [
            'الـ <b>User</b>، بقدراته العقلية والجسدية.',
            'الـ <b>Computer أو الـ Machine</b>، بأجهزة الـ <bdi dir="ltr">input/output</bdi>.',
            'الـ <b>Interaction</b>، يعني الـ interfaces والـ patterns والـ design والـ usability evaluation.'
          ] : [
            'The <b>User</b>: mental and physical capabilities.',
            'The <b>Computer / Machine</b>: input/output devices.',
            'The <b>Interaction</b>: interfaces, HCI patterns, design, usability evaluation.'
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"HCI terms used interchangeably are…": pick <b>All the above</b>. HCI, HMI and MMI all name the same field.',
            'لو السؤال جاب الـ 3 أسامي واختيار <b>All the above</b>، اختاره. التلاتة اسم لنفس المجال.')}</p></${Box}>
        `),

        // 5 · figure: the three parts (pie)
        page(html`
          <${Fig} name="hci-parts" head=${t('The three parts of HCI, slice by slice', 'الـ 3 أجزاء بتوع الـ HCI، جزء جزء')} />
        `, { sec: t('The three parts of HCI', 'الـ 3 أجزاء بتوع الـ HCI') }),

        // 6 · sort the pie
        page(html`
          <${Box} kind="pencil" title=${t('Which slice?', 'أنهي جزء؟')}><p className="hf-p small">${X('Put each field in its slice of the pie: <b>H</b>uman, <b>C</b>omputer or <b>I</b>nteraction.', 'حط كل مجال في الجزء بتاعه من الـ pie: اختار <b>H</b> للـ Human، و<b>C</b> للـ Computer، و<b>I</b> للـ Interaction.')}</p></${Box}>
          <${Sort} id="pie" bins=${[['H', 'Human'], ['C', 'Computer'], ['I', 'Interaction']]} items=${[
            ['Communication theory', 0], ['Operating system', 1], ['Interaction design', 2], ['Cognitive psychology', 0], ['Computer graphic', 1],
            ['Industrial design', 0], ['Programming language', 1], ['Social science', 0], ['Human factors', 0]
          ]} />
        `),

        // 7 · a trap, and a midterm question
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Industrial design</b> and <b>human factors</b> sit in the <b>Human</b> slice of this pie. In the interaction-design diagram later, Industrial Design is a <b>design practice</b> and Human Factors an <b>interdisciplinary field</b>. Read which diagram the question means.',
            'الـ <b>Industrial design</b> والـ <b>human factors</b> هنا في جزء الـ <b>Human</b> من الـ pie. بس في رسمة الـ interaction design اللي جاية، الـ Industrial Design بقى <b>design practice</b>، والـ Human Factors بقى <b>interdisciplinary field</b>. اقرا السؤال بيتكلم عن أنهي رسمة.')}</p></${Box}>
          ${mq('m-comm', /Communication theory belongs/i)}
        `),

        // 7 · objectives of HCI (last year)
        page(html`
          <${LY} />
          <${H2}>${t('What HCI is trying to do', 'الـ HCI عايز يعمل إيه')}</${H2}>
          <${UL} items=${A ? [
            'نصمم عشان <b>الناس</b> و<b>الـ tasks</b> و<b>البيئات</b> اللي الـ users عايشين وشغالين فيها (زي organization).',
            'نخلّي التفاعل أسهل: نصمم systems <b>سهلة وطبيعية وintuitive</b> عشان <b>نوفّر وقت</b> و<b>نقلّل التكلفة</b>.',
            'نصمم الـ GUIs (إزاي نتعلمها، ونستخدمها بكفاءة، ونقيّمها ونقارن بينها)، وكمان الـ web interfaces.',
            'نستكشف <bdi dir="ltr">paradigms/prototypes</bdi> جديدة للتفاعل، ونطوّر models وtheories للتفاعل.'
          ] : [
            'Design for <b>people</b>, for <b>tasks</b>, and for the <b>environments</b> users live and work in (e.g. an organization).',
            'Make interaction easier: design <b>easy, natural and intuitive</b> systems to <b>save time</b> and <b>reduce costs</b>.',
            'Design GUIs (learning them, using them efficiently, evaluating and comparing them) and web interfaces.',
            'Explore new paradigms/prototypes of interaction, and develop models and theories of interaction.'
          ]} />
          <${Grow} />
          <${Talk} who="dev">${X('So "HCI wants systems <b>as complex as possible</b>" or "it <b>does not apply to web design</b>"…', 'يعني لو قالوا الـ HCI عايز systems <b>معقدة جدًا</b>، أو <b>مالوش دعوة بالـ web design</b>…')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('…both are <b>False</b>. Easy, natural, intuitive. And web interfaces are right there in the list.', '…الاتنين <b>False</b>. سهل وطبيعي وintuitive. والـ web interfaces موجودة في الـ list أهي.')}</${Talk}>
        `, { sec: t('Objectives and interaction design', 'الأهداف والـ interaction design') }),

        // 8 · interaction design: definitions and goals
        page(html`
          <${H1}>${t('What is interaction design?', 'يعني إيه interaction design؟')}</${H1}>
          <p className="hf-hci1-quote hf-in">${A ? html`<span class="ltr">"Designing interactive products to support the way people communicate and interact in their everyday and working lives."</span><small>تعريف Sharp وRogers وPreece <bdi dir="ltr">(2019)</bdi></small>` : html`"Designing interactive products to support the way people communicate and interact in their everyday and working lives."<small>Sharp, Rogers, and Preece (2019)</small>`}</p>
          <p className="hf-hci1-quote hf-in">${A ? html`<span class="ltr">"The design of spaces for human communication and interaction."</span><small>تعريف Winograd <bdi dir="ltr">(1997)</bdi></small>` : html`"The design of spaces for human communication and interaction."<small>Winograd (1997)</small>`}</p>
          <${H2}>${t('Its two goals', 'وليه هدفين')}</${H2}>
          ${ph(A ? [
            'إننا <b>نطوّر products تبقى usable</b>، والـ usability معناها <b>سهل تتعلمه، وeffective في الاستخدام، وبيدّي تجربة ممتعة</b>.',
            'إننا <b>نشرك الـ users في الـ design process</b>.'
          ] : [
            '<b>Develop usable products</b>. Usability means <b>easy to learn, effective to use, and provides an enjoyable experience</b>.',
            '<b>Involve users in the design process</b>.'
          ])}
          <${Grow} />
          <${Hand} red=${true}>${t('trick (ours): three authors, the long "everyday and working lives" one, 2019. One author, "spaces", 1997.', 'حيلة من عندنا: التعريف اللي فيه 3 مؤلفين هو الطويل وسنته 2019، واللي فيه مؤلف واحد هو بتاع الـ spaces وسنته 1997.')}</${Hand}>
        `),

        // 9 · the invisible interface
        page(html`
          <${H1}>${t('The best interface is the one you forget', 'أحسن interface هو اللي بتنساه')}</${H1}>
          <${P} small=${true}>${X('<b>Invisible Interface</b> (the idle concept): we want the interface <b>as invisible as possible</b>, so users spend little time focusing on it and instead focus on the <b>task</b> they are trying to accomplish.',
            'فكرة الـ <b>Invisible Interface</b> (الـ idle concept): عايزين الـ interface يبقى <b>invisible على قد ما نقدر</b>، عشان الـ users يقضّوا وقت قليل مركزين فيه، ويركزوا بدل كده في الـ <b>task</b> اللي بيحاولوا يخلصوها.')}</${P}>
          <${P} small=${true}>${X('Our goal as designers: help the humans feel they are <b>interacting directly with the task</b>, while our interface <b>vanishes</b> in the middle of that interaction.',
            'هدفنا كـ designers إننا نخلّي البني آدمين يحسّوا إنهم <b>بيتفاعلوا مع الـ task على طول</b>، والـ interface بتاعنا <b>يختفي</b> في نص التفاعل ده.')}</${P}>
          <${Def}>${X('The user should <b>think about the task rather than thinking about the tool</b>.', 'الـ user المفروض <b>يفكر في الـ task مش في الأداة (tool)</b>.')}</${Def}>
          <${Grow} />
          <${Hand}>${t("our analogy: you think about the sentence, not the pen. Until the pen runs out of ink.", 'تشبيه من عندنا: بتفكر في الجملة اللي بتكتبها، مش في القلم. لحد ما القلم يخلص حبره.')}</${Hand}>
        `, { sec: t('The invisible interface', 'الـ invisible interface') }),

        // 10 · figure: invisible interface
        page(html`
          <${Fig} name="invisible-interface" head=${t('Watch the interface fade out', 'اتفرج على الـ interface وهو بيختفي')} />
          <${Hand} red=${true} arrow="up">${t('USER on one side, TASK on the other, the INTERFACE in the middle', 'الـ USER في ناحية، والـ TASK في الناحية التانية، والـ INTERFACE في النص')}</${Hand}>
        `),

        // 11 · human-task interaction (last year)
        page(html`
          <${LY} />
          <${H2}>${t('You never really talk to the computer', 'إنت عمرك ما بتكلم الكمبيوتر بجد')}</${H2}>
          <${P} small=${true}>${X('The user is really trying to achieve a <b>task</b>: buy online, watch a video, translate a text. The system is only the means, so in reality the user interacts with the <b>task</b>.',
            'الـ user في الحقيقة عايز يخلّص <b>task</b>، زي إنه يشتري أونلاين، أو يتفرج على فيديو، أو يترجم نص. الـ system مجرد وسيلة، فالـ user في الحقيقة بيتفاعل مع الـ <b>task</b>.')}</${P}>
          ${ph(A ? [
            'في محاضرة أونلاين على <b>Zoom</b>، الدكتور بيتفاعل مع <b>الطلبة</b>، مش مع الكمبيوتر.',
            'زي <b>حكم الماتش</b> بالظبط، الـ interface بيبقى ناجح لما <b>محدش ياخد باله منه</b>.'
          ] : [
            'In an online <b>Zoom</b> lecture, the instructor interacts with the <b>students</b>, not with the computer.',
            'Like a <b>sports referee</b>, an interface is successful when it goes <b>unnoticed</b>.'
          ])}
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X("Think of the last match you watched. Do you remember the referee's name? If not, he probably did a good job. Which app on your phone is like that referee?",
            'افتكر آخر ماتش اتفرجت عليه. فاكر اسم الحكم؟ لو مش فاكر، غالبًا كان حكم كويس. أنهي app على موبايلك شبه الحكم ده؟')}</p></${Box}>
        `),

        // 12 · interview with the invisible interface
        page(html`
          <${Interview} title=${t('The Invisible Interface, seen at last', 'الـ Invisible Interface، أخيرًا ظهر')} sub=${t("This week's interview: a guest you've used a thousand times and never noticed.", 'حوار الأسبوع: ضيف استخدمته ألف مرة وعمرك ما خدت بالك منه.')} lines=${A ? [
            ['المذيع', 'صعب أشوفك النهارده.'],
            ['الـ Interface', 'ده الهدف. لما أشتغل صح الـ users <b>بيقضّوا وقت قليل مركزين فيّا</b> وبيركزوا في الـ task.'],
            ['المذيع', 'يعني إيه الـ task دي؟'],
            ['الـ Interface', 'اللي الـ user جه عشانه أصلًا، زي إنه يشتري أونلاين أو يتفرج على فيديو أو يترجم نص. أنا مجرد وسيلة.'],
            ['المذيع', 'وإيه أكتر حاجة بتضايقك؟'],
            ['الـ Interface', 'الـ features الكتير. كل ما يتزوّد فيّا، الـ user <b>يركّز في الأداة أكتر من الـ task</b>.'],
            ['المذيع', 'تحب الناس توصفك إزاي؟'],
            ['الـ Interface', 'زي حكم الماتش. محدش افتكرني، يبقى عملت شغلي.']
          ] : [
            ['Head First', "It's hard to see you today."],
            ['Interface', "That's the point. When I work, users <b>spend little time focusing on me</b> and focus on the task."],
            ['Head First', 'What do you mean, "the task"?'],
            ['Interface', 'Whatever they came for: buying online, watching a video, translating a text. I am only the means.'],
            ['Head First', 'What ruins your day?'],
            ['Interface', 'Feature piles. The more they add to me, the more users <b>focus on the tool than the task</b>.'],
            ['Head First', 'How would you like to be remembered?'],
            ['Interface', "Like a referee. If nobody remembers me, I did my job."]
          ]} />
        `),

        // 13 · figure: elevator
        page(html`
          <${H2}>${t('A gallery of bad and good design', 'معرض للـ design الوحش والكويس')}</${H2}>
          <${Fig} name="elevator" head=${t('Try to open the door', 'جرّب تفتح الباب')} />
        `, { sec: t('Bad and good design', 'الـ design الوحش والكويس') }),

        // 14 · elevator and vending explained
        page(html`
          <${H3}>${t('The elevator', 'الأسانسير')}</${H3}>
          <${P} small=${true}>${X('The controls and labels on the <b>bottom row all look the same</b>, so it is easy to push a label by mistake instead of a control button. People do not make the same mistake on the <b>top row</b>.',
            'الـ controls والـ labels في <b>الصف اللي تحت شكلهم كلهم واحد</b>، فسهل تدوس على label بالغلط بدل زرار الـ control. والناس مش بتغلط نفس الغلطة في <b>الصف اللي فوق</b>.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('Why not on the top row? The slide leaves it for discussion and gives no answer. Look at the figure again: how do the floor numbers and their buttons differ?',
            'ليه مش بيغلطوا في الصف اللي فوق؟ الـ slide سايباه للمناقشة ومش بتدّي إجابة. بص على الرسمة تاني: أرقام الأدوار مختلفة عن زرايرها إزاي؟')}</p></${Box}>
          <${H3}>${t('The vending machine', 'ماكينة البيع')}</${H3}>
          <${P} small=${true}>${X('You <b>need to push a button first to activate the reader</b>. <b>Normally</b> you insert the bill first, before making a selection. So the machine <b>contravenes a well-known convention</b>.',
            'لازم <b>تدوس على زرار الأول عشان تشغّل الـ reader</b>. و<b>في العادي</b> بتحط الفلوس الأول قبل ما تختار. فالمكنة <b>بتخالف convention معروف</b>.')}</${P}>
          <${Grow} />
          <${Talk} who="bug">${t("Same trick both times: I look like something you already know, and I behave differently.", 'نفس الحركة في المرتين: ببان زي حاجة إنت عارفها، وبتصرف بشكل مختلف.')}</${Talk}>
        `),

        // 15 · figure: vending
        page(html`
          <${Fig} name="vending" head=${t('Pay the usual way, and see what happens', 'ادفع بالطريقة المعتادة، وشوف إيه اللي هيحصل')} />
          <${Hand} red=${true}>${t('the bad part is the order: button first, bill second', 'الغلط في الترتيب: الزرار الأول، والفلوس بعدين')}</${Hand}>
        `),

        // 16 · marble answering machine
        page(html`
          <${H2}>${t('Good design: marbles for messages', 'تصميم كويس: بلي بدل الرسايل')}</${H2}>
          <${P} small=${true}>${X('The <b>marble answering machine (Bishop, 1995)</b>: it is based on <b>how everyday objects behave</b>. It is <b>easy, intuitive, and a pleasure to use</b>, and it only requires <b>one-step actions</b> to perform core tasks.',
            'الـ <b>marble answering machine (Bishop, 1995)</b> مبنية على <b>تصرف الحاجات اليومية</b>. <b>سهلة، وintuitive، وممتعة في الاستخدام</b>، ومحتاجة بس <b>one-step actions</b> للـ core tasks.')}</${P}>
          <${Fig} name="marble" />
        `),

        // 17 · TiVo
        page(html`
          <${Fig} name="tivo" head=${t('Good design: the TiVo remote', 'تصميم كويس: ريموت الـ TiVo')} />
          ${ph(A ? [
            'على <b>شكل فول سوداني (peanut)</b> عشان يتمسك في الإيد.',
            'الـ <b>layout منطقي</b>، وزراير <b>color-coded ومميزة</b>.',
            'الزراير <b>سهل تلاقيها</b>.'
          ] : [
            '<b>Peanut shaped</b> to fit in the hand.',
            '<b>Logical layout</b>, and <b>color-coded, distinctive buttons</b>.',
            '<b>Easy-to-locate</b> buttons.'
          ])}
        `),

        // 18 · match: what makes each one good or bad
        page(html`
          <${Box} kind="pencil" title=${t('Good or bad, and why?', 'كويس ولا وحش، وليه؟')}><p className="hf-p small">${t('Tap a design, then the reason the lecture gives for it.', 'دوس على التصميم، وبعدين على السبب اللي المحاضرة قالته عنه.')}</p></${Box}>
          <${Match} id="designs" left=${A ? ['الأسانسير', 'ماكينة البيع', 'الـ marble machine', 'ريموت الـ TiVo', 'أول جهاز Qualcomm للسواقين'] : ['Elevator controls', 'Vending machine', 'Marble answering machine', 'TiVo remote', "Qualcomm's early trucker device"]}
            right=${A ? ['زراير صغيرة لإيدين كبيرة لابسة جوانتي', 'شكل فول سوداني، وزراير بألوان وسهل تلاقيها', 'الـ labels والزراير في الصف اللي تحت شبه بعض', 'مبنية على تصرف الحاجات اليومية، وخطوة واحدة', 'لازم تدوس زرار قبل ما تحط الفلوس']
              : ['Small buttons for big, gloved hands', 'Peanut shaped, color-coded, easy to locate', 'Bottom-row labels and buttons look the same', 'Behaves like everyday objects; one-step actions', 'You must push a button before inserting the bill']}
            answer=${[2, 4, 3, 1, 0]} />
          <${Grow} />
          <${Hand}>${t('two bad, two good, and one that research fixed', 'اتنين وحشين، واتنين كويسين، وواحد الـ research صلّحه')}</${Hand}>
        `),

        // 19 · smart TV dilemma
        page(html`
          <${H2}>${t('Dilemma: typing on a smart TV', 'مشكلة: الكتابة على الـ smart TV')}</${H2}>
          <${P} small=${true}>${t('Which is the best way to interact with a smart TV, and why? The lecture offers three:', 'إيه أحسن طريقة تتفاعل بيها مع الـ smart TV، وليه؟ المحاضرة بتعرض 3 طرق:')}</${P}>
          ${ph(A ? [
            'الـ <b>Pecking</b>، باستخدام grid keyboard عن طريق الريموت.',
            'الـ <b>Swiping</b>، على صفين alphanumeric باستخدام touchpad على الريموت.',
            'الـ <b>Voice control</b>، باستخدام الريموت أو smart speaker.'
          ] : [
            '1) <b>Pecking</b> using a grid keyboard via a remote control.',
            '2) <b>Swiping</b> across two alphanumeric rows using a touchpad on a remote control.',
            '3) <b>Voice control</b> using a remote or smart speaker.'
          ])}
          <${Box} kind="brain"><p className="hf-p small">${X('The slide gives <b>no answer</b>: it is a question for discussion. Try typing your e-mail address in your head with each one. Which one would you pick for a password? For a film title?',
            'الـ slide <b>مش بتدّي إجابة</b>، ده سؤال للمناقشة. جرّب تكتب الإيميل بتاعك في دماغك بكل طريقة. أنهي واحدة هتختارها عشان password؟ وعشان اسم فيلم؟')}</p></${Box}>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t("There's no one right answer here. That's exactly why we ask real users.", 'مفيش إجابة واحدة صح هنا. وده بالظبط السبب إننا بنسأل users حقيقيين.')}</${Talk}>
        `),

        // 20 · figure: smart TV
        page(html`
          <${Fig} name="smart-tv" head=${t('Three ways to type, side by side', '3 طرق للكتابة')} />
        `),

        // 21 · user research: truckers
        page(html`
          <${H1}>${t('Who is actually holding it?', 'مين اللي ماسكه فعلًا؟')}</${H1}>
          <${P} small=${true}>${X('<b>User research is important</b>. The <b>Qualcomm device for truckers</b>: the early version had <b>small buttons</b>.',
            'الـ <b>User research مهم</b>. خد مثال <b>جهاز Qualcomm لسواقين التريلات</b>: النسخة الأولى كان فيها <b>زراير صغيرة</b>.')}</${P}>
          <${P} small=${true}>${X('Then came the surprising findings: truckers often have <b>big hands</b> and often <b>wear gloves</b>. The better design: a <b>large touch screen</b> and a <b>stylus pen</b>.',
            'وبعدين طلعت findings مفاجئة: السواقين غالبًا <b>إيديهم كبيرة</b> وغالبًا <b>لابسين جوانتي</b>. والـ design الأحسن كان <b>touch screen كبيرة</b> و<b>stylus pen</b>.')}</${P}>
          <${Talk} who="dev">${t('The buttons looked fine on my desk.', 'الزراير كانت شكلها تمام على مكتبي.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("Your desk isn't a truck, and your hands aren't in gloves. You have to <b>meet the users</b>.", 'مكتبك مش تريلا، وإيديك مش لابسة جوانتي. لازم <b>تقابل الـ users</b>.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('the slide words it as "user interface discovered surprising findings"; its heading says user research is what found them', 'الـ slide كاتبة "user interface discovered surprising findings"، بس عنوانها بيقول إن الـ user research هو اللي لقاها')}</${Hand}>
        `, { sec: t('User research', 'الـ user research') }),

        // 22 · figure: truckers
        page(html`
          <${Fig} name="truckers" head=${t('Before and after the research', 'قبل الـ research وبعده')} />
          <${Hand} arrow="up">${t('the glove covers several small buttons at once', 'الجوانتي بيغطي كذا زرار صغير مرة واحدة')}</${Hand}>
        `),

        // 23 · UI design process; software development is research
        page(html`
          <${H2}>${t('The UI design process: three components', 'الـ UI design process: 3 components')}</${H2}>
          <div className="hf-hci1-uxh hf-in">
            <div><b className="n">1</b><p>${X('<b>User research</b>: the users, the tasks they try to complete, and earlier research.', 'الـ <b>User research</b>، يعني الـ users، والـ tasks اللي بيحاولوا يخلّصوها، والأبحاث اللي اتعملت قبل كده.')}</p></div>
            <div><b className="n">2</b><p>${X('<b>Design and prototyping</b> of the interface.', 'الـ <b>Design and prototyping</b> بتاع الـ interface.')}</p></div>
            <div><b className="n">3</b><p>${X('<b>User interface evaluation</b> (improvement).', 'الـ <b>User interface evaluation</b> (يعني الـ improvement).')}</p></div>
          </div>
          <${Hand}>${t("this term's Lecture 5 teaches these three as the UX Design Process", 'المحاضرة 5 بتاعة السنة دي بتشرح الـ 3 دول باسم الـ UX Design Process')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('What comes <b>after user research</b>? <b>Design and prototyping</b>, not coding or marketing. And the <b>third</b> component is <b>evaluation (improvement)</b>.',
            'إيه اللي بييجي <b>بعد الـ user research</b>؟ الـ <b>design and prototyping</b>، مش الـ coding ولا الـ marketing. والـ component <b>التالت</b> هو الـ <b>evaluation (improvement)</b>.')}</p></${Box}>
        `, { sec: t('The design process', 'الـ design process') }),

        // software development is research
        page(html`
          <${LY} />
          <${H2}>${t('Building software is research', 'بناء الـ software هو research')}</${H2}>
          <${Def}>${X('<b>Software development is research</b>: it is not just creating software, but also <b>learning how to create the software best suited for its purpose</b>. (One of the 12 characteristics studied in Software Engineering.)',
            'الـ <b>Software development هو research</b>: مش بس إنك تعمل software، ده كمان <b>إنك تتعلم إزاي تعمل الـ software الأنسب لهدفه</b>. (دي واحدة من الـ 12 characteristics اللي اتدرست في Software Engineering.)')}</${Def}>
          <${Talk} who="dev">${t('So every project teaches me how to build that kind of software better.', 'يعني كل مشروع بيعلّمني إزاي أبني النوع ده من الـ software أحسن.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Exactly. And the 2024/25 exam asked it as True/False: it is <b>True</b>.', 'بالظبط. وامتحان <bdi dir="ltr">2024/25</bdi> سأل عليها صح ولا غلط، والإجابة <b>True</b>.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t('you will meet the full question in the Exam corner', 'هتقابل السؤال كامل في ركن الامتحان')}</${Hand}>
        `),

        // 24 · full-featured systems (last year)
        page(html`
          <${LY} />
          <${H1}>${t('When more features make it worse', 'لما الـ features الزيادة تبوّظ الدنيا')}</${H1}>
          <${P} small=${true}>${X('Full-featured productivity apps (MS Office) include many features to meet all possible needs. More features lead to:', 'برامج الـ productivity الكاملة (زي MS Office) فيها features كتير عشان تغطي كل الاحتياجات الممكنة. والـ features الأكتر بتأدي لـ:')}</${P}>
          ${ph(A ? ['البرنامج <b>يحسّسك إنه معقد</b>', 'الحاجات <b>أصعب تلاقيها أو تتعلمها</b>', 'التركيز يبقى <b>على الأداة أكتر من الـ task</b>'] : ['the app <b>feels complicated</b>', 'things are <b>harder to find or learn</b>', '<b>more focus on the tool than the task</b>'])}
          <${Def}>${X('<b>Bloatware</b>: a product with too many features, too many megabytes, too slow, too difficult to use, or simply <b>too much</b>.', 'الـ <b>Bloatware</b> هو منتج فيه features كتير أوي، أو megabytes كتير أوي، أو بطيء أوي، أو صعب أوي في الاستخدام، أو ببساطة <b>كتير أوي</b>.')}</${Def}>
          <${P} small=${true}>${X('<b>Office 97–2003</b>: the press called it "bloated"; a miles-long list of feature requests; people felt <b>less in control</b>; menus and toolbars were full and <b>not scalable</b>; people did not notice or use new features.',
            'في <b>Office <bdi dir="ltr">97–2003</bdi></b>: الصحافة سمّته "bloated"، وكان فيه list طويلة جدًا من الـ feature requests، والناس حسّت إنها <b>متحكمة أقل</b>، والـ menus والـ toolbars كانت مليانة و<b>مش scalable</b>، والناس مكانتش بتاخد بالها من الـ features الجديدة ولا بتستخدمها.')}</${P}>
        `, { sec: t('The Office story', 'قصة الـ Office') }),

        // 25 · Office 2000 mechanisms
        page(html`
          <${LY} />
          <${H2}>${t("Office 2000's fix, and why it failed", 'حل Office 2000، وليه فشل')}</${H2}>
          ${ph(A ? [
            'الـ <b>Adaptive (personalized) menus</b>: الـ menu الرئيسية بتعرض list قصيرة بالـ commands الأكتر احتمال تستخدمها، وفيه <b>chevron</b> في الآخر بيفتح الـ menu كاملة.',
            'الـ <b>Rafted toolbars</b>: اتنين toolbars أو أكتر بيتشاركوا سطر واحد، وفيه algorithm بيتوقع الزراير الأقل استخدامًا وبينقلها لـ <b>overflow</b> area.'
          ] : [
            '<b>Adaptive (personalized) menus</b>: a top-level menu shows a short list of the most likely used commands; a <b>chevron</b> at the end expands the full menu.',
            '<b>Rafted toolbars</b>: two or more toolbars share one line; an algorithm predicts the least-used buttons and moves them to an <b>overflow</b> area.'
          ])}
          <${P} small=${true}>${X('Why they failed: customization was <b>not easy or accurate</b>. A wrong short menu forced an <b>extra scan</b> of the full menu, so <b>scanning took twice as long</b>. They were later <b>turned off by default</b>.',
            'فشلوا ليه؟ الـ customization <b>مكانش سهل ولا دقيق</b>. الـ short menu الغلط كانت بتجبرك تعمل <b>scan زيادة</b> للـ menu الكاملة، فالـ <b>scanning خد ضعف الوقت</b>. وبعدين <b>اتقفلوا by default</b>.')}</${P}>
          <p className="hf-hci1-quote hf-in">${A ? html`<span class="ltr">"Auto-customization, unless it does a perfect job, is usually worse than no customization at all."</span><small>يعني الـ auto-customization لو مش perfect، غالبًا أوحش من مفيش customization خالص.</small>` : '"Auto-customization, unless it does a perfect job, is usually worse than no customization at all."'}</p>
        `),

        // 26 · try the adaptive menu
        page(html`
          <${H2}>${t('Try it: find the command', 'جرّب: دوّر على الـ command')}</${H2}>
          <${AdaptiveMenu} />
          <${Grow} />
          <${Hand}>${t('our mock-up: the slides show no menu', 'رسمة من عندنا: السلايدز مفيهاش menu')}</${Hand}>
        `),

        // 27 · from guesswork to data
        page(html`
          <${LY} />
          <${H1}>${t('From guesswork to data', 'من التخمين للـ data')}</${H1}>
          <${P} small=${true}>${X('Before 2003, decisions were mostly guesswork: "based on feel, estimation, and guess work".', 'قبل 2003 القرارات كانت في الغالب تخمين، يعني بالإحساس والتقدير:<span class="ltr">"based on feel, estimation, and guess work"</span>')}</${P}>
          <${P} small=${true}>${X('<b>Office 2003</b> introduced the <b>CEIP</b> (Customer Experience Improvement Program): a balloon, "Help make Office better", enrols users and collects <b>anonymous</b> usage and hardware data.',
            'الـ <b>Office 2003</b> قدّم الـ <b>CEIP</b> (Customer Experience Improvement Program)، وهي balloon مكتوب فيها <bdi dir="ltr">"Help make Office better"</bdi> بتسجّل الـ users وبتجمع usage data وhardware data <b>anonymous</b>.')}</${P}>
          <${P} small=${true}>${X('For <b>Office 2007</b> the team had <b>1.3+ billion sessions</b> of data. So much Word and Outlook data came in that <b>70% was thrown away</b>. They learned:',
            'ولـ <b>Office 2007</b> الفريق كان عنده data لأكتر من <b>1.3 billion sessions</b>. وجالهم data من Word وOutlook كتير لدرجة إن <b>70% منها اترمى</b>. واتعلموا:')}</${P}>
          <${UL} items=${A ? ['أنهي commands بتتستخدم كتير، وأنهي بتتستخدم ورا بعض', 'أنهي بتتستخدم <b>7x أكتر بالـ keyboard</b> من الماوس', 'الناس بتفتح كام document في نفس الوقت، والشاشات حجمها قد إيه'] : ['which commands are used often, and which in sequence', 'which are used <b>7x more with the keyboard</b> than the mouse', 'how many documents people open at once, and how big screens are']} />
        `),

        // 28 · a doctors' question and the numbers
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Keep the numbers straight: <b>2003</b> brought CEIP; <b>2007</b> was built on <b>1.3+ billion sessions</b>; <b>70%</b> of the Word and Outlook data was thrown away; some commands are used <b>7x</b> more with the keyboard.',
            'ركّز في الأرقام: سنة <b>2003</b> جه الـ CEIP، وسنة <b>2007</b> اتبنى على <b>1.3+ billion sessions</b>، و<b>70%</b> من data الـ Word والـ Outlook اترمت، وفيه commands بتتستخدم بالـ keyboard <b>7x</b> أكتر.')}</p></${Box}>
          <${P} small=${true}>${t('The 2026/27 midterm asked about short menus like this:', 'ميدترم 2026/27 سأل عن الـ menus القصيرة كده:')}</${P}>
          ${mq('m-menu', /limiting the number of menu options/i)}
        `),

        // 29 · online book library search
        page(html`
          <${H1}>${t('Two library searches', 'مكتبتين وطريقتين للبحث')}</${H1}>
          <${P} small=${true}>${X('Case one: designing the search feature for an <b>online book library</b>.', 'أول مثال: تصميم الـ search feature لـ <b>مكتبة كتب أونلاين</b>.')}</${P}>
          ${ph(A ? [
            'أول <b>mock-up</b>: فيه header وmenus فوق، وبعدين search box وdrop-down بـ <bdi dir="ltr">[by Title]</bdi> وزرار Go، وبعدين 4 مربعات كتب.',
            'تاني <b>mock-up</b>: نفس الـ layout بألوان فاقعة، و3 كتب، ووش smiley كارتون بيقول <bdi dir="ltr">"Reading Rox"</bdi>.'
          ] : [
            'First <b>mock-up</b>: header and menus on top, then a search box, a <i>by Title</i> drop-down and a Go button, then four book boxes.',
            'Second <b>mock-up</b>: the same layout in bright colors, three books, and a cartoon smiley saying "Reading Rox".'
          ])}
          <${Def}>${X('<b>Bad design</b>: the <b>user research component is almost absent</b>.', 'ده <b>design وحش</b>، لأن <b>الـ user research component تقريبًا مش موجود</b>.')}</${Def}>
          <${Grow} />
          <${Talk} who="bug">${t('New paint, same me. Colours were never the problem.', 'دهان جديد وأنا زي ما أنا. الألوان عمرها ما كانت المشكلة.')}</${Talk}>
        `, { sec: t('Two library searches', 'مكتبتين للبحث') }),

        // 30 · figure: book mockups
        page(html`
          <${Fig} name="book-mockups" head=${t('The two mock-ups', 'الـ 2 mock-ups')} />
        `),

        // 31 · ICDL
        page(html`
          <${H2}>${t("Case two: the International Children's Digital Library", 'تاني مثال: الـ International Children\'s Digital Library')}</${H2}>
          <${P} small=${true}>${X('<b>HCIL</b> (the Human-Computer Interaction Lab at the University of Maryland) designed the <b>ICDL</b>. Its Simple Search page searches with <b>big picture buttons</b>: by cover color, by age (three to five, six to nine, ten to thirteen), by kind of book, plus a keywords box.',
            'الـ <b>HCIL</b> (الـ Human-Computer Interaction Lab في University of Maryland) هي اللي صممت الـ <b>ICDL</b>. صفحة الـ Simple Search فيها بتدوّر بـ <b>زراير كبيرة بالصور</b>: حسب لون الغلاف، وحسب السن (من 3 لـ 5، ومن 6 لـ 9، ومن 10 لـ 13)، وحسب نوع الكتاب، وكمان فيه search box للـ keywords.')}</${P}>
          <${Def}>${X('A <b>good design</b>: <b>more than 3 million unique visitors</b>, and users preferred the <b>visual search</b> (<b>71% of searches</b>).', 'ده <b>design كويس</b>: <b>أكتر من 3 مليون unique visitors</b>، والـ users فضّلوا الـ <b>visual search</b> (<b>71% من عمليات البحث</b>).')}</${Def}>
          <${LY} />
          <${P} small=${true}>${X('The lesson: a good designer understands issues from the <b>user\'s point of view</b> and <b>works with users rather than guessing</b>.', 'الدرس: الـ designer الشاطر بيفهم المشاكل من <b>وجهة نظر الـ user</b>، و<b>بيشتغل مع الـ users بدل ما يخمّن</b>.')}</${P}>
        `),

        // 32 · figure: ICDL
        page(html`
          <${Fig} name="icdl-search" head=${t('Search like a six-year-old', 'دوّر زي طفل عنده 6 سنين')} />
        `),

        // 33–34 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Guesswork and User Research argue about who should design.", 'قعدة الليلة: التخمين والـ User Research بيتخانقوا مين اللي المفروض يصمم.')} />
          <${Chat} names=${[t('Guesswork', 'التخمين'), t('User Research', 'الـ User Research')]} lines=${A ? [
            [0, 'قبل 2003، قرارات الـ Office كانت مبنية عليّا: بالإحساس والتقدير.'],
            [1, 'وبعدين جه الـ <b>CEIP</b>، وبقى فيه usage data <b>anonymous</b>. والـ Office 2007 اتبنى على أكتر من <b>1.3 billion sessions</b>.'],
            [0, 'أنا اللي صممت بحث مكتبة الكتب: search box وزرار Go، وبعدين ألوان فاقعة ووش smiley.'],
            [1, 'والـ <b>user research component كان تقريبًا مش موجود</b>. Design وحش.'],
            [0, 'الأطفال مش بيدوّروا زي بعض؟'],
            [1, 'الـ HCIL سألتهم. الـ <b>visual search</b> بقى <b>71% من عمليات البحث</b>، وأكتر من 3 مليون unique visitors.']
          ] : [
            [0, "Before 2003, Office decisions ran on me: feel and estimation."],
            [1, 'Then came <b>CEIP</b> and <b>anonymous</b> usage data. Office 2007 was built on <b>1.3+ billion sessions</b>.'],
            [0, 'I designed the book library search: a search box, a Go button, then bright colors and a smiley.'],
            [1, 'And the <b>user research component was almost absent</b>. Bad design.'],
            [0, "Don't all kids search the same way?"],
            [1, 'HCIL asked them. <b>Visual search</b> took <b>71% of searches</b>, with more than 3 million unique visitors.']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('Guesswork', 'التخمين'), t('User Research', 'الـ User Research')]} lines=${A ? [
            [0, 'جهاز Qualcomm للسواقين كان فيه زراير صغيرة. شكلها كان حلو.'],
            [1, 'لحد ما عرفنا إن السواقين <b>إيديهم كبيرة</b> و<b>لابسين جوانتي</b>. فبقى <b>touch screen كبيرة</b> و<b>stylus</b>.'],
            [0, 'طب الـ adaptive menus بتاعة Office 2000؟ algorithm بيتوقع إنت بتستخدم إيه.'],
            [1, 'ده تخمين برضه، بس بالـ code. مكانش دقيق، والـ <b>scanning خد ضعف الوقت</b>، واتقفلوا by default.'],
            [1, 'الدرس إنك تفهم المشكلة من <b>وجهة نظر الـ user</b> و<b>تشتغل مع الـ users بدل ما تخمّن</b>.'],
            [0, '…طب أنا هروح أخمّن في حتة تانية.']
          ] : [
            [0, "Qualcomm's trucker device had small buttons. They looked neat."],
            [1, 'Until we learned truckers have <b>big hands</b> and <b>wear gloves</b>. Hence a <b>large touch screen</b> and a <b>stylus</b>.'],
            [0, "What about Office 2000's adaptive menus? An algorithm predicts what you use."],
            [1, "That's you again, in code. It wasn't accurate, <b>scanning took twice as long</b>, and they were turned off by default."],
            [1, "The lesson: understand issues from the <b>user's point of view</b> and <b>work with users rather than guessing</b>."],
            [0, '…I guess I\'ll go guess somewhere else.']
          ]} />
          <${Grow} />
          <${Hand}>${t('the dialogue is ours; every fact in it is from the lecture', 'الحوار من عندنا، بس كل معلومة فيه من المحاضرة')}</${Hand}>
        `),

        // 35 · the doctor's office form
        page(html`
          <${H2}>${t("A bad user experience: the doctor's office form", 'تجربة وحشة: فورم عيادة الدكتور')}</${H2}>
          <${P} small=${true}>${X("Someone spent <b>at least 30 minutes</b> filling out a <b>doctor's office form</b>. It asked for the address, phone number, email address and social security number an <b>average of 3 times</b> for <b>at least 10 different people and organizations</b>: the son (the patient), himself, his wife, the doctors, dentists, pharmacies, insurance companies, emergency contacts and responsible parties…",
            'واحد قعد <b>30 دقيقة على الأقل</b> بيملا <b>فورم عيادة دكتور</b>. الفورم طلب العنوان ورقم التليفون والإيميل ورقم الـ social security <b>في المتوسط 3 مرات</b>، لـ <b>10 أشخاص وجهات مختلفة على الأقل</b>، زي ابنه (المريض)، وهو نفسه، ومراته، والدكاترة، ودكاترة الأسنان، والصيدليات، وشركات التأمين، وأرقام الطوارئ، والمسؤولين عنه…')}</${P}>
          <${P} small=${true}>${X('After completing and submitting, he got: <b>"Internal server error"</b>.', 'وبعد ما خلّص وبعت، جاله:<span class="ltr"><b>"Internal server error"</b></span>')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('How could a better design avoid this? The slide leaves it for <b>discussion</b>, with no answer. List what you would change, starting with what happens to 30 minutes of typing when the server fails.',
            'إزاي design أحسن كان يمنع ده؟ الـ slide سايباه <b>للمناقشة</b> من غير إجابة. اكتب إنت هتغيّر إيه، وابدأ بـ: إيه اللي بيحصل لـ 30 دقيقة كتابة لما الـ server يقع؟')}</p></${Box}>
          <${Grow} />
          <${Talk} who="bug">${t('Thirty minutes of work, and I ate it in one second. My finest moment.', '30 دقيقة شغل، وأنا كلتهم في ثانية. أحلى لحظة في حياتي.')}</${Talk}>
        `, { sec: t('A bad user experience', 'تجربة استخدام وحشة') }),

        // 36 · figure: doctor's form
        page(html`
          <${Fig} name="doctor-form" head=${t('Watch the form fill up, and then…', 'اتفرج على الفورم وهو بيتملا، وبعدين…')} />
        `),

        // 37 · design considerations + sort
        page(html`
          <${H2}>${t('Who, what, where', 'مين، وإيه، وفين')}</${H2}>
          <${P} small=${true}>${X('Design considerations: take into account <b>who the users are</b>, <b>what activities are being carried out</b>, and <b>where the interaction is taking place</b>. Then <b>optimize the interactions</b> so they <b>match the users\' activities and needs</b>.',
            'الـ design considerations: لازم نحسب حساب <b>مين الـ users</b>، و<b>إيه الـ activities اللي بتحصل</b>، و<b>التفاعل بيحصل فين</b>. وبعدين <b>نعمل optimize للتفاعلات</b> عشان <b>تناسب الـ activities والاحتياجات بتاعة الـ users</b>.')}</${P}>
          <${Box} kind="pencil" title=${t('Who, what or where?', 'مين ولا إيه ولا فين؟')}><p className="hf-p small">${t("Each fact comes from the lecture's examples. Which consideration does it feed?", 'كل معلومة من أمثلة المحاضرة. بتخدم أنهي consideration؟')}</p></${Box}>
          <${Sort} id="www" bins=${A ? [['مين', 'الـ users'], ['إيه', 'الـ activity'], ['فين', 'المكان']] : [['Who', 'the users'], ['What', 'the activity'], ['Where', 'the place']]} items=${A ? [
            ['السواقين إيديهم كبيرة ولابسين جوانتي', 0],
            ['الكتابة في search على الـ smart TV', 1],
            ['الجهاز متركّب جنب الدركسيون في التريلا', 2],
            ['أطفال من 3 لـ 5 سنين', 0],
            ['ملو فورم لـ 10 أشخاص وجهات', 1]
          ] : [
            ['Truckers have big hands and wear gloves', 0],
            ['Typing a search on a smart TV', 1],
            ["The device sits beside a truck's steering wheel", 2],
            ['Children aged three to five', 0],
            ['Filling in a form for 10 people and organizations', 1]
          ]} />
        `, { sec: t('Design considerations', 'الـ design considerations') }),

        // 38 · which kind of design?
        page(html`
          <${H1}>${t('One umbrella over them all', 'شمسية واحدة فوقهم كلهم')}</${H1}>
          <${P} small=${true}>${t('Many other terms are used, each emphasizing what is being designed:', 'فيه مصطلحات تانية كتير، كل واحد بيركّز على الحاجة اللي بتتصمم:')}</${P}>
          <div className="hf-hci1-chips hf-in" dir="ltr">${['user interface design', 'software design', 'user-centered design', 'product design', 'web design', 'experience design (UX)'].map(w => html`<span key=${w}>${w}</span>`)}</div>
          <${Def}>${X('<b>Interaction design is the umbrella term</b> covering all of these aspects. It is <b>fundamental to all disciplines, fields, and approaches</b> concerned with researching and designing computer-based systems for people.',
            'الـ <b>Interaction design هو الـ umbrella term</b> اللي بيغطي كل الجوانب دي. وهو <b>أساسي لكل الـ disciplines والـ fields والـ approaches</b> اللي بتعمل research وتصمم computer-based systems للناس.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The umbrella is <b>interaction design</b>. UX (experience design) is one of the terms <b>under</b> it, not the umbrella itself.', 'الشمسية هي الـ <b>interaction design</b>. والـ UX (experience design) واحد من المصطلحات اللي <b>تحتها</b>، مش هو الشمسية.')}</p></${Box}>
        `, { sec: t('UI, UX and HCI', 'الـ UI والـ UX والـ HCI') }),

        // 39 · UI vs UX vs HCI
        page(html`
          <${H2}>${t('UI vs UX vs HCI', 'الـ UI والـ UX والـ HCI')}</${H2}>
          <div className="hf-hci1-uxh hf-in">
            <div><b className="n">UI</b><p>${X('<b>User Interface</b> design: the <b>interactivity, look and feel</b> of a product screen or web page. Designing things nicely for a screen.', 'تصميم الـ <b>User Interface</b>، يعني <b>الـ interactivity والـ look and feel</b> بتاع شاشة منتج أو web page. تصميم حلو للشاشة.')}</p></div>
            <div><b className="n">UX</b><p>${X('<b>User Experience</b> design: the user\'s <b>overall experience</b> with the product or website. UX is about <b>dictating</b> the interactions.', 'تصميم الـ <b>User Experience</b>، يعني <b>التجربة الكاملة (overall experience)</b> للـ user مع المنتج أو الـ website. والـ UX بيـ<b>حدد (dictate)</b> التفاعلات.')}</p></div>
            <div><b className="n">HCI</b><p>${X('Largely about <b>understanding</b> the interactions between humans and computers.', 'في الأساس بيـ<b>فهم (understand)</b> التفاعلات بين البني آدمين والكمبيوتر.')}</p></div>
          </div>
          <${Hand}>${t('the "dictating" and "understanding" lines are from last year\'s slides', 'الجملتين بتوع الـ dictating والـ understanding من slides السنة اللي فاتت')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"UI Design covers a user\'s overall experience with the product or website." <b>False</b> (Exam 2024/25): that is <b>UX</b>. UI is look, feel and interactivity.', 'دي <b>False</b> في امتحان <bdi dir="ltr">2024/25</bdi>، لأن ده تعريف الـ <b>UX</b>، والـ UI هو الشكل والإحساس والـ interactivity:<span class="ltr">"UI Design covers a user\'s overall experience with the product or website."</span>')}</p></${Box}>
        `),

        // 40 · dumb questions
        page(html`
          <${LY} />
          <${P} small=${true}>${X('Early systems ran on <b>expensive machines</b>, so engineers focused on efficient software and <b>ignored usability</b>. Today success requires <b>user-centric</b> design focused on usability and a pleasant, smooth experience.',
            'الأنظمة الأولانية كانت شغالة على <b>أجهزة غالية</b>، فالـ engineers ركزوا على software كفء و<b>تجاهلوا الـ usability</b>. النهارده النجاح محتاج design <b>user-centric</b> مركّز على الـ usability وتجربة سلسة وحلوة.')}</${P}>
          <${Dumb} qa=${A ? [
            ['يعني الـ UX أحسن من الـ UI؟', 'لأ. هما بيغطوا حاجات مختلفة. الـ UI هو شاشة المنتج نفسها، والـ UX هو التجربة كلها مع المنتج.'],
            ['والـ HCI؟ هو مجرد اسم تالت لنفس الحاجة؟', 'لأ. في slides السنة اللي فاتت الـ HCI <b>بيفهم</b> التفاعلات، والـ UX <b>بيحددها</b>، والـ UI بيصمم الشاشة. وفي شجرة المجالات الـ UI والـ UX فروع من الـ HCI.'],
            ['هو إيه الهدف الأساسي للـ HCI؟', 'إنه <b>يحسّن الـ usability والـ user experience</b>، مش إنه يسرّع الكمبيوتر ولا يزوّد الـ security.']
          ] : [
            ['So is UX better than UI?', 'No. They cover different things: UI is the product screen itself, UX the whole experience with the product.'],
            ['And HCI? Just a third name for the same thing?', "No. In last year's slides HCI <b>understands</b> the interactions, UX <b>dictates</b> them, UI designs the screen. In the tree of fields, UI and UX branch from HCI."],
            ["What is HCI's primary goal, then?", 'To <b>improve usability and user experience</b>, not to make computers faster or more secure.']
          ]} />
        `),

        // 41 · figure: id umbrella
        page(html`
          <${Fig} name="id-umbrella" head=${t('Interaction design and the fields around it', 'الـ interaction design والمجالات اللي حواليه')} />
        `, { sec: t('Fields around interaction design', 'المجالات حوالين الـ ID') }),

        // 42 · relationship table
        page(html`
          <${H2}>${t('Who feeds interaction design?', 'مين بيغذّي الـ interaction design؟')}</${H2}>
          <div className="hf-hci1-tb hf-in" dir="ltr">
            <span className="h">Academic disciplines</span><span className="h">Design practices</span>
            ${[['Psychology', 'Graphic design'], ['Social Sciences', 'Product design'], ['Computing Sciences', 'Artist-design'], ['Engineering', 'Industrial design'], ['Ergonomics', 'Film industry'], ['Informatics', '']].map(([a, b], i) => html`<${React.Fragment} key=${i}><span>${a}</span><span>${b}</span></${React.Fragment}>`)}
          </div>
          <${P} small=${true}>${X('Both groups point <b>into</b> interaction design (one-way arrows). The third group, the <b>interdisciplinary fields</b> (Human Factors, Cognitive Engineering, HCI, Cognitive Ergonomics, CSCW, Information Systems), works with it <b>both ways</b>.',
            'المجموعتين دول أسهمهم رايحة <b>للـ</b> interaction design في اتجاه واحد. والتالتة، الـ <b>interdisciplinary fields</b> (زي الـ HF والـ HCI والـ CSCW)، أسهمها <b>في الاتجاهين</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Ergonomics</b> is an academic discipline; <b>Cognitive Ergonomics</b> is an interdisciplinary field. <b>Psychology / Cognitive Science</b> is the discipline that studies human thinking. (<b>CSCW</b>: Computer-Supported Cooperative Work.)',
            'الـ <b>Ergonomics</b> من الـ academic disciplines، لكن الـ <b>Cognitive Ergonomics</b> من الـ interdisciplinary fields. والـ <b>Psychology / Cognitive Science</b> هو اللي بيدرس تفكير الإنسان.')}</p></${Box}>
        `),

        // 43 · sort the fields
        page(html`
          <${Box} kind="pencil" title=${t('Which group?', 'أنهي مجموعة؟')}><p className="hf-p small">${X('<b>A</b>cademic discipline, <b>D</b>esign practice, or <b>I</b>nterdisciplinary field?', 'اختار <b>A</b> للـ academic discipline، و<b>D</b> للـ design practice، و<b>I</b> للـ interdisciplinary field.')}</p></${Box}>
          <${Sort} id="fields" bins=${[['A', 'Academic discipline'], ['D', 'Design practice'], ['I', 'Interdisciplinary field']]} items=${[
            ['Psychology / Cognitive Science', 0], ['Human Factors (HF)', 2], ['Film Industry', 1], ['Ergonomics', 0], ['Cognitive Ergonomics', 2],
            ['Industrial Design', 1], ['CSCW', 2]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('the midterm asked where Human Factors (HF) goes. Did you get it?', 'الميدترم سأل الـ Human Factors (HF) مكانه فين. جبتها صح؟')}</${Hand}>
        `),

        // 44 · hierarchy of fields (last year)
        page(html`
          <${LY} />
          <${H2}>${t('HCI in the family tree', 'الـ HCI في شجرة العيلة')}</${H2}>
          <${Tree} />
          <${P} small=${true}>${X('<b>Engineering + Psychology</b> make <b>Human Factors Engineering</b>: designing interactions between people and products, systems or devices. It branches into Industrial Design, HCI and Product Design; HCI branches into UI, UX and Interaction design.',
            'الـ <b><bdi>Engineering + Psychology</bdi></b> بيطلّعوا الـ <b><bdi>Human Factors Engineering</bdi></b>، يعني تصميم التفاعل بين الناس والـ products والـ systems والـ devices. ومنه الـ HCI، ومن الـ HCI الـ UI والـ UX والـ Interaction design.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A human limit: we can distinguish <b>millions of colors</b> but only about <b>30 shades of gray</b>. And the gap between HCI and human factors engineering is <b>shrinking</b>, because <b>more</b> devices are becoming computerized.',
            'حدود الإنسان: بنقدر نفرّق بين <b>ملايين الألوان</b>، بس حوالي <b>30 درجة رمادي</b> بس. والـ gap بين الـ HCI والـ human factors engineering <b>بيقل</b>، لأن أجهزة <b>أكتر</b> بتبقى computerized.')}</p></${Box}>
        `),

        // 45–49 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' 2024/25 exam and 2026/27 midterm. Tap an answer to see why.", 'أسئلة حقيقية من امتحان الدكاترة 2024/25 وميدترم 2026/27. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m-terms', /HCI terms used interchangeably/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Three names, one field. I pick all of them.', '3 أسامي ومجال واحد. هختارهم كلهم.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-sdr', /S\/W development is not just/i)}
          ${mq('m-ui', /UI Design covers a user/i)}
        `),
        page(html`
          ${mq('m-graph', /Which component includes computer graphics/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('Computer slice: computer graphic, operating system, programming language.', 'في جزء الـ Computer تلاتة بس: الـ graphics والـ OS والـ programming language.')}</${Hand}>
        `),
        page(html`
          ${mq('m-hf', /Human Factors \(HF\) belongs/i)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t("In the fields diagram, HF has two-way arrows with interaction design. That's the interdisciplinary group.", 'في رسمة المجالات، الـ HF بينه وبين الـ interaction design أسهم في الاتجاهين. يبقى من الـ interdisciplinary.')}</${Talk}>
        `),
        page(html`
          ${mq('m-psy', /human thinking and mental processes/i)}
          <${Grow} />
          <${Hand}>${t('how people think (attention, memory, perception) is a whole lecture of its own: Lecture 3', 'الناس بتفكر إزاي (attention وmemory وperception) ليها محاضرة لوحدها: المحاضرة 3')}</${Hand}>
        `),

        // 50 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>HCI</b> هو التفاعل بين الـ users والكمبيوتر، وبيتقال عليه <b>HMI</b> و<b>MMI</b>.',
            'الـ 3 أجزاء هما <b>Human وComputer وInteraction</b>، والـ computer graphics والـ OS والـ programming language تحت الـ Computer.',
            'الـ interaction design هدفه <b>usable products</b> (سهل تتعلمه، وeffective، وممتع)، وإننا <b>نشرك الـ users</b>.',
            'الـ <b>invisible interface</b> معناه إن الـ user يفكر في الـ task مش في الأداة، زي حكم الماتش.',
            'الـ <b>user research</b> مهم (السواقين والجوانتي)، والـ process هي research ثم design and prototyping ثم evaluation.',
            'الـ auto-customization لو مش perfect أوحش من مفيش، والـ CEIP خلّى الـ Office يتبني على data.',
            'الـ <b>interaction design هو الـ umbrella term</b>. والـ UI هو الشكل، والـ UX هو التجربة الكاملة، والـ HCI بيفهم التفاعلات.'
          ] : [
            '<b>HCI</b> is the interaction, or relationship, between users and computers; multidisciplinary; also called <b>HMI</b> and <b>MMI</b>.',
            'Three parts: <b>Human, Computer, Interaction</b>; computer graphics, OS and programming language sit under Computer.',
            'Interaction design aims for <b>usable products</b> (easy to learn, effective, enjoyable) and to <b>involve users</b>.',
            'The <b>invisible interface</b>: the user thinks about the task, not the tool. Like a referee.',
            '<b>User research</b> matters (truckers in gloves); the process: research, design and prototyping, evaluation.',
            'Auto-customization that is not perfect is worse than none; CEIP moved Office from guesswork to data.',
            '<b>Interaction design is the umbrella term</b>. UI is look and feel, UX the overall experience, HCI understands the interactions.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 51 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="lens">${t('Next time: the design process itself. Fewer guesses, more users.', 'المرة الجاية: الـ design process نفسها. تخمين أقل، وusers أكتر.')}</${Talk}>
            <${Talk} who="bug" flip=${true}>${t("I'll be in the bottom row of the elevator.", 'وأنا هستناك في الصف اللي تحت في الأسانسير.')}</${Talk}>
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

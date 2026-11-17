// Head First chapter for Human Computer Interaction Lecture 8 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Design alternatives and prototyping (last year's slides): Joyner's two biggest design mistakes, the design alternatives phase
// (captured by the current interface, distance yourself during brainstorming, as many as you can, the first Microsoft mouse's
// 100+ prototypes, the final design as a combination), and prototyping (the designers' definition, Klemmer's two lines, Joyner's
// iterative process, what makes a good prototype, prototypes that teach nothing waste the process).
// Every fact comes from the lecture's notes (and, where the doctors' questions quote the slides, from those quotes); our examples,
// analogies and pictures are marked as ours. Joyner's four-phase cycle is from Lecture 2's notes.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T8 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci8')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci8';
    s.textContent = `
.hfb .hf-hci8-cyc{ position:relative; height:206px; border:2px solid var(--hf-line); border-radius:10px; background:var(--paper); }
.hfb .hf-hci8-cyc svg{ position:absolute; inset:0; width:100%; height:100%; }
.hfb .hf-hci8-cyc button{ position:absolute; width:118px; min-height:38px; padding:4px 6px; border-radius:8px; border:2px solid var(--hf-line); background:var(--paper); color:var(--ink); font:700 13.5px/1.15 var(--body); cursor:pointer; }
.hfb .hf-hci8-cyc button.hot{ background:color-mix(in srgb, var(--hf-k) 22%, var(--paper)); border-color:var(--hf-k); }
.hfb .hf-hci8-cyc button[aria-pressed="true"]{ box-shadow:0 0 0 3px var(--hf-hand); }
.hfb .hf-hci8-cyc .p0{ left:50%; top:8px; transform:translateX(-50%); }
.hfb .hf-hci8-cyc .p1{ right:6px; top:50%; transform:translateY(-50%); width:104px; }
.hfb .hf-hci8-cyc .p2{ left:50%; bottom:8px; transform:translateX(-50%); }
.hfb .hf-hci8-cyc .p3{ left:6px; top:50%; transform:translateY(-50%); width:104px; }
.hfb .hf-hci8-cap{ font:500 14.5px/1.36 var(--body); margin:0; color:var(--ink); min-height:3.9em; padding:6px 9px; background:var(--hf-grey); border-left:3px solid var(--hf-k); }
.hfb .hf-hci8-cap b{ font-weight:700; }
.hfb .hf-hci8-alt{ display:grid; gap:5px; }
.hfb .hf-hci8-card{ display:flex; gap:7px; align-items:stretch; border:1.5px solid var(--hf-line); border-radius:8px; padding:5px 6px; background:var(--paper); }
.hfb .hf-hci8-card .lt{ flex:none; width:28px; display:grid; place-items:center; border-radius:6px; font:800 17px/1 var(--body); color:var(--paper); background:var(--hf-line); }
.hfb .hf-hci8-card.c1 .lt{ background:var(--hf-k); } .hfb .hf-hci8-card.c2 .lt{ background:var(--hf-hand); }
.hfb .hf-hci8-card .bd{ flex:1; min-width:0; display:grid; gap:4px; }
.hfb .hf-hci8-card .nm{ font:800 13.5px/1.1 var(--body); color:var(--ink); margin:0; }
.hfb .hf-hci8-card .fs{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-hci8-card .fs button{ font:500 13px/1.2 var(--body); padding:4px 7px; min-height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; text-align:start; }
.hfb .hf-hci8-card .fs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-hci8-fin{ border:2px dashed var(--hf-k); border-radius:8px; padding:6px 8px; min-height:58px; background:var(--paper); }
.hfb .hf-hci8-fin .hd{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); margin:0 0 5px; }
.hfb .hf-hci8-fin .ch{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-hci8-fin .ch span{ font:600 13px/1.2 var(--body); border-radius:999px; padding:3px 8px; border:1.5px solid var(--hf-line); color:var(--ink); background:var(--hf-grey); animation:hf-up .35s both; }
.hfb .hf-hci8-fin .ch span i{ font-style:normal; font-weight:800; color:var(--hf-k); margin-inline-end:4px; }
.hfb .hf-hci8-fin .em{ font:italic 13.5px/1.3 var(--body); color:var(--graphite); margin:0; }
.hfb .hf-hci8-ws{ border:2px solid var(--hf-line); border-radius:10px; padding:8px; display:grid; gap:8px; background:var(--paper); }
.hfb .hf-hci8-verbs{ display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; }
.hfb .hf-hci8-verbs button{ flex:1 1 0; min-width:0; font:700 13.5px/1.1 var(--body); padding:4px 2px; min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hci8-verbs button.past{ color:var(--ink); border-color:var(--hf-line); }
.hfb .hf-hci8-verbs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hci8-tiles{ display:flex; justify-content:center; gap:7px; min-height:50px; align-items:center; flex-wrap:wrap; }
.hfb .hf-hci8-tiles span{ position:relative; min-width:46px; height:44px; padding:0 8px; display:grid; place-items:center; border:2px solid var(--hf-line); border-radius:8px; font:800 18px/1 var(--body); color:var(--ink); background:var(--paper); animation:hf-up .4s both; }
.hfb .hf-hci8-tiles span.new{ background:color-mix(in srgb, var(--hf-hand) 14%, var(--paper)); }
.hfb .hf-hci8-tiles span.mix{ background:color-mix(in srgb, var(--hf-k) 22%, var(--paper)); border-color:var(--hf-k); }
.hfb .hf-hci8-tiles span.gone{ opacity:.4; border-style:dashed; }
.hfb .hf-hci8-tiles span.gone::after{ content:""; position:absolute; left:4px; right:4px; top:50%; height:3px; background:var(--hf-red); transform:rotate(-24deg); border-radius:2px; }
.hfb .hf-hci8-tiles span.rev{ border-color:var(--hf-hand); }
.hfb .hf-hci8-tiles span.up{ border-color:var(--ok); box-shadow:0 0 0 2px color-mix(in srgb, var(--ok) 40%, transparent); }
.hfb .hf-hci8-stat{ display:flex; align-items:center; gap:12px; border:2px solid var(--hf-line); border-radius:10px; padding:8px 12px; background:var(--paper); }
.hfb .hf-hci8-stat > b{ font:800 46px/1 var(--body); color:var(--hf-k); letter-spacing:-.03em; }
.hfb .hf-hci8-stat span{ font:600 14.5px/1.3 var(--body); color:var(--ink); }
.hfb .hf-hci8-mice{ display:grid; grid-template-columns:repeat(26, 1fr); gap:2px; }
.hfb .hf-hci8-mice i{ display:block; aspect-ratio:3/4; border:1.5px solid var(--hf-line); border-radius:50% 50% 45% 45%; animation:hf-up .3s both; }
.hfb .hf-hci8-mice i.last{ border-color:var(--hf-k); background:var(--hf-k); }
.hfb .hf-hci8-vs{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci8-vs > div{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 8px; font:500 14px/1.32 var(--body); color:var(--ink); background:var(--paper); }
.hfb .hf-hci8-vs > div.no{ border-color:var(--hf-red); }
.hfb .hf-hci8-vs > div.ok{ border-color:var(--ok); }
.hfb .hf-hci8-vs > div > b{ display:block; font:800 13px/1.1 var(--body); text-transform:uppercase; letter-spacing:.05em; margin-bottom:4px; }
.hfb .hf-hci8-vs > div.no > b{ color:var(--hf-red); } .hfb .hf-hci8-vs > div.ok > b{ color:var(--ok); }
.hfb .hf-hci8-q{ font:italic 600 17px/1.32 var(--display); color:var(--ink); margin:0; padding:6px 0 6px 12px; border-left:4px solid var(--hf-k); }
.hfb .hf-hci8-q small{ display:block; font:700 13px/1.2 var(--body); font-style:normal; color:var(--graphite); margin-top:4px; }
.hf-ar .hf-hci8-cap, .hf-ar .hf-hci8-card .nm, .hf-ar .hf-hci8-card .fs button, .hf-ar .hf-hci8-fin .ch span, .hf-ar .hf-hci8-fin .em, .hf-ar .hf-hci8-verbs button, .hf-ar .hf-hci8-stat span, .hf-ar .hf-hci8-vs > div, .hf-ar .hf-hci8-fin .hd, .hf-ar .hf-hci8-cyc button{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-hci8-cap{ border-left:0; border-right:3px solid var(--hf-k); font-size:14px; line-height:1.55; }
.hf-ar .hf-hci8-fin .em{ font-style:normal; }
.hf-ar .hf-hci8-vs > div{ font-size:13.5px; line-height:1.5; } .hf-ar .hf-hci8-vs > div > b{ text-transform:none; letter-spacing:0; font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-hci8-q{ font-style:normal; }
`;
    document.head.appendChild(s);
  }

  // Joyner's design life cycle (Lecture 2): four phases in a loop; this chapter lives in two of them. Tap a phase to read it.
  const PH = [
    ['Need finding', '<b>Need finding</b>: the first phase, and where the cycle comes back to after evaluation.', 'الـ <b>need finding</b>: أول مرحلة، واللي الـ cycle بيرجعلها بعد الـ evaluation.'],
    ['Design alternatives', '<b>Design alternatives</b>: the first half of this chapter. Explore many ideas, not one.', 'الـ <b>design alternatives</b>: النص الأول من الفصل ده. استكشف أفكار كتير، مش فكرة واحدة.'],
    ['Prototyping', '<b>Prototyping</b>: the second half. Quick approximations, made to get feedback.', 'الـ <b>prototyping</b>: النص التاني. نسخ تقريبية سريعة، معمولة عشان تجيب feedback.'],
    ['Evaluation', '<b>Evaluation</b>, and then round again: the cycle is <b>iterative</b>.', 'الـ <b>evaluation</b>، وبعدين نلف تاني: الـ cycle ده <b>iterative</b>.']
  ];
  function Cycle() {
    const ar = useAr();
    const [on, setOn] = H.K.useSlot('cyc', 1);
    const arrow = (x, y, r) => html`<path d="M-6,-5 L4,0 L-6,5" fill="none" style=${{ stroke: 'var(--hf-line)' }} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" transform=${'translate(' + x + ',' + y + ') rotate(' + r + ')'} />`;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hci8-cyc" dir="ltr">
        <svg viewBox="0 0 328 206" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="164" cy="103" rx="112" ry="74" fill="none" style=${{ stroke: 'var(--hf-line)' }} strokeWidth="2" strokeDasharray="6 5" />
          ${arrow(243, 51, 33)}${arrow(243, 155, 147)}${arrow(85, 155, 213)}${arrow(85, 51, 327)}
          ${!calm() && html`<circle r="6" style=${{ fill: 'var(--hf-k)' }}><animateMotion dur="9s" repeatCount="indefinite" path="M164,29 A112,74 0 1 1 164,177 A112,74 0 1 1 164,29" /></circle>`}
          <text x="164" y="108" textAnchor="middle" fontSize="13" fontWeight="700" style=${{ fill: 'var(--graphite)' }}>Joyner</text>
        </svg>
        ${PH.map((p, j) => html`<button key=${j} className=${'p' + j + (j === 1 || j === 2 ? ' hot' : '')} aria-pressed=${String(on === j)} onClick=${() => setOn(j)}>${p[0]}</button>`)}
      </div>
      <p className="hf-hci8-cap">${T8(ar ? PH[on][2] : PH[on][1])}</p>
    </div>`;
  }

  // Build the final design: three alternatives (our toy example), tap features from any of them
  const ALT = [
    ['Weekly calendar', 'تقويم الأسبوع', [['drag courses onto a week grid', 'تسحب المواد على جدول الأسبوع'], ['clashes shown in red', 'التعارضات بتبان بالأحمر']]],
    ['Search first', 'البحث الأول', [['one search box for any course', 'خانة بحث واحدة لأي مادة'], ['filters by day and time', 'فلتر باليوم والساعة']]],
    ['Step by step', 'خطوة بخطوة', [['one question per screen', 'سؤال واحد في كل شاشة'], ['a summary before you confirm', 'ملخص قبل ما تأكّد']]]
  ];
  const LT = 'ABC';
  function Combo() {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot('combo', []);
    const tog = id => setPick(pick.includes(id) ? pick.filter(x => x !== id) : pick.concat(id));
    const from = [...new Set(pick.map(id => id[0]))];
    const msg = !pick.length ? '' : from.length > 1
      ? (ar ? 'ده <b>combination</b>، وده اللي المحاضرة بتقول إنه <b>الأشهر</b>.' : 'That is a <b>combination</b>: the lecture says this is <b>the more common</b> ending.')
      : (ar ? 'ممكن تختار alternative واحد وتكمّله، بس الأشهر إنك تجمع.' : 'You may pick one alternative and finalize it, but combining is more common.');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-hci8-alt">${ALT.map((a, j) => html`<div key=${j} className=${'hf-hci8-card c' + j}>
        <span className="lt" dir="ltr">${LT[j]}</span>
        <div className="bd"><p className="nm">${ar ? a[1] : a[0]}</p>
          <div className="fs">${a[2].map((f, k) => { const id = LT[j] + k; return html`<button key=${k} aria-pressed=${String(pick.includes(id))} onClick=${() => tog(id)}>${ar ? f[1] : f[0]}</button>`; })}</div></div>
      </div>`)}</div>
      <div className="hf-hci8-fin"><p className="hd">${ar ? 'الـ design النهائي' : 'Final design'}</p>
        ${pick.length ? html`<div className="ch">${pick.map(id => { const f = ALT[LT.indexOf(id[0])][2][+id[1]]; return html`<span key=${id}><i dir="ltr">${id[0]}</i>${ar ? f[1] : f[0]}</span>`; })}</div>`
          : html`<p className="em">${ar ? 'دوس على features من أي alternative.' : 'Tap features from any alternative.'}</p>`}</div>
      ${msg && html`<p className="hf-hci8-cap" style=${{ minHeight: 0 }}>${T8(msg)}</p>`}
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setPick(['A0', 'A1', 'B0', 'C1'])}>${ar ? 'اجمعلي واحد' : 'Mix one for me'}</button>
        ${pick.length > 0 && html`<button className="hf-btn" onClick=${() => setPick([])}>${ar ? 'امسح' : 'Clear'}</button>`}
      </div>
    </div>`;
  }

  // Joyner's iterative process, five verbs on four ideas (our picture of his sentence)
  const VERBS = [
    ['Brainstorm', 'فكّر', [['A', 'new'], ['B', 'new'], ['C', 'new'], ['D', 'new']],
      '<b>Brainstorming</b>: get the ideas out. Four alternatives on the table.', 'الـ <b>brainstorming</b>: طلّع الأفكار. أربع alternatives على الترابيزة.'],
    ['Combine', 'اجمع', [['A+C', 'mix'], ['B', ''], ['D', '']],
      '<b>Combining</b>: the best of A and C become one design.', 'الـ <b>combining</b>: أحسن ما في A وC بقوا design واحد.'],
    ['Abandon', 'اسيب', [['A+C', ''], ['B', ''], ['D', 'gone']],
      '<b>Abandoning</b>: D is dropped.', 'الـ <b>abandoning</b>: الـ D اتساب.'],
    ['Revise', 'عدّل', [['A+C', ''], ['B′', 'rev']],
      '<b>Revising</b>: B is changed into B′.', 'الـ <b>revising</b>: الـ B اتعدّل وبقى <bdi dir="ltr">B′</bdi>.'],
    ['Improve', 'حسّن', [['A+C v2', 'up'], ['B′', '']],
      '<b>Improving</b>: A+C gets a better version 2. Then round you go again.', 'الـ <b>improving</b>: الـ <bdi dir="ltr">A+C</bdi> بقى ليه نسخة 2 أحسن. وبعدين تلف تاني.']
  ];
  function Workshop() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('ws', 0);
    const [play, setPlay] = useState(false);
    useEffect(() => { if (!play) return; if (i >= VERBS.length - 1) { setPlay(false); return; } const tm = setTimeout(() => setI(i + 1), 1900); return () => clearTimeout(tm); }, [play, i]);
    const v = VERBS[i], last = VERBS.length - 1;
    return html`<div className="hf-hci8-ws hf-in">
      <div className="hf-hci8-verbs" role="group">${VERBS.map((x, j) => html`<button key=${j} className=${j < i ? 'past' : ''} aria-pressed=${String(j === i)} onClick=${() => { setPlay(false); setI(j); }}>${ar ? x[1] : x[0]}</button>`)}</div>
      <div className="hf-hci8-tiles" dir="ltr" key=${i}>${v[2].map(([n, c], j) => html`<span key=${n + j} className=${c} style=${{ animationDelay: calm() ? '0s' : j * 0.08 + 's' }}>${n}</span>`)}</div>
      <p className="hf-hci8-cap" style=${{ minHeight: '2.8em' }}>${T8(ar ? v[4] : v[3])}</p>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.max(0, i - 1)); }} disabled=${i === 0} aria-label=${ar ? 'اللي فات' : 'Back'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" onClick=${() => { if (i >= last) setI(0); setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= last ? (ar ? 'من الأول' : 'Again') : (ar ? 'شغّل' : 'Play')}</button>
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.min(last, i + 1)); }} disabled=${i === last} aria-label=${ar ? 'اللي بعده' : 'Next'}>${ar ? '‹' : '›'}</button>
        <span style=${{ flex: 1 }}></span>
        <span className="hf-dots">${VERBS.map((_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  // 101 little mice: "more than 100"
  function Mice() {
    return html`<div className="hf-hci8-mice hf-in" dir="ltr" role="img" aria-label="More than 100 prototypes">${Array.from({ length: 102 }, (_, k) => html`<i key=${k} className=${k >= 100 ? 'last' : ''} style=${{ animationDelay: calm() ? '0s' : (k * 0.012) + 's' }}></i>`)}</div>`;
  }

  H.chapters.hci[8] = {
    title: 'Design Alternatives and Prototyping', kicker: 'Chapter 8', run: 'design alternatives and prototyping',
    ar: { title: 'الـ Design Alternatives والـ Prototyping', kicker: 'الفصل 8', run: 'الـ alternatives والـ prototyping' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 8);
      const arL = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[8]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src), with the site's Arabic why for each choice
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const exam = t('Exam corner', 'ركن الامتحان');
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;

      return [
        // 0 · before we start: where Lecture 7 left off
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter ended with <i>"Design: can I?"</i> Great interfaces take enormous creativity and hard work (Klemmer), but pretty good ones are easy if you know the basic methods. The advice was: keep your creativity, follow the tips, and <b>avoid the biggest design mistakes</b>. This chapter names those mistakes, then shows the two cures: <b>design alternatives</b> and <b>prototyping</b>.',
            'الفصل اللي فات خلص بسؤال <bdi dir="ltr"><i>"Design: can I?"</i></bdi>. بيقول Klemmer إن الـ interfaces العظيمة محتاجة creativity وشغل كتير، بس الكويسة سهلة لو عارف الـ methods الأساسية. والنصيحة كانت: متطفيش الـ creativity، امشي على النصايح، و<b>ابعد عن أكبر أخطاء الـ design</b>. الفصل ده بيسمّي الأخطاء دي، وبعدين يوريك علاجها: الـ <b>design alternatives</b> والـ <b>prototyping</b>.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You sort, match and build right on the page.', '<b>حل التمارين.</b> هتصنّف وتوصّل وتبني على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, from the doctors' questions.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من أسئلة الدكاترة.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes and examples marked "ours" are our own, not the slides\'.', 'الملاحظات والأمثلة اللي عليها "من عندنا" مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand} red=${true}>${t("Lectures 7 to 10 come from last year's slides.", 'المحاضرات من 7 لـ 10 من سلايدز السنة اللي فاتت.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">8</span><span className="t">${A ? html`الفصل التامن<br/>HCI` : html`Chapter eight<br/>HCI`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("Don't Marry Your First Idea", 'متتجوزش أول فكرة')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('design alternatives and prototyping', 'الـ design alternatives والـ prototyping')}</p></div>
          <${Talk} who="dev">${t('I already know what the app should look like. Can I start drawing screens?', 'أنا عارف الـ app هيبقى شكله إيه. أبدأ أرسم الشاشات؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Do you know <b>who</b> will use it, and <b>what task</b> they are trying to do?', 'إنت عارف <b>مين</b> هيستخدمه، و<b>إيه الـ task</b> اللي عايزين يعملوها؟')}</${Talk}>
          <${Talk} who="dev">${t('…not yet.', '…لسه.')}</${Talk}>
          <${P} small=${true}>${X("Then you're one step away from Joyner's <b>biggest</b> mistake. And if your answer was \"I already know what it should look like\", you're flirting with his <b>second</b> one too.",
            'يبقى إنت على بعد خطوة من <b>أكبر</b> غلطة عند Joyner. ولو ردّك كان "أنا عارف شكله"، فإنت كمان بتقرّب من غلطته <b>التانية</b>.')}</${P}>
        `, { sec: t('Meet the chapter', 'اتعرّف على الفصل') }),

        // 2 · where this sits: Joyner's design life cycle
        page(html`
          <${H2}>${t('Where are we in the cycle?', 'إحنا فين في الـ cycle؟')}</${H2}>
          <${P} small=${true}>${X("Remember Joyner's design life cycle from Lecture 2: an iterative process with <b>four phases</b>. This chapter is the two lit ones. Tap a phase.",
            'فاكر الـ design life cycle بتاع Joyner من محاضرة 2؟ process iterative فيها <b>أربع مراحل</b>. الفصل ده هو المرحلتين المنوّرين. دوس على أي مرحلة.')}</${P}>
          <${Cycle} />
          <${Grow} />
          <${Hand}>${X('Also from Lecture 2: user research is part of every phase, not a step. Joyner: <i>"you need users early and often."</i>',
            'ومن محاضرة 2: الـ user research جزء من كل مرحلة، مش خطوة لوحدها. بيقول Joyner:<span class="ltr"><i>"you need users early and often."</i></span>')}</${Hand}>
        `, { sec: t('The cycle', 'الـ cycle') }),

        // 3 · mistake 1
        page(html`
          <${Box} kind="brain"><p className="hf-p">${t("You're asked to design a new app for a pharmacy. What is the very first thing you do?", 'طلبوا منك تصمم app جديد لصيدلية. إيه أول حاجة خالص هتعملها؟')}</p></${Box}>
          <${H1}>${t('Mistake #1: designing blind', 'الغلطة رقم 1: تصمم وإنت مغمّض')}</${H1}>
          <${Def}>${X("Joyner's <b>biggest mistake</b>: jumping straight to designing an interface <b>without understanding the users or the task</b>.",
            '<b>أكبر غلطة</b> عند Joyner: إنك تنط على طول تصمم interface <b>من غير ما تفهم الـ users أو الـ task</b>.')}</${Def}>
          <${P} small=${true}>${X('Two things to understand, and the mistake is skipping <b>either</b> one: who the users are, and what they need to do.',
            'لازم تفهم حاجتين، والغلطة إنك تفوّت <b>أي واحدة</b>: الـ users مين، وعايزين يعملوا إيه.')}</${P}>
          <${Grow} />
          <${Talk} who="bug" flip=${true}>${t("An interface built on guesses? That's where I grow best.", 'interface مبني على تخمين؟ ده أحسن مكان أكبر فيه.')}</${Talk}>
        `, { sec: t('Mistake #1', 'الغلطة رقم 1') }),

        // 4 · figure: the two mistakes
        page(html`
          <${H2}>${t('Two mistakes, and what to do instead', 'غلطتين، والصح تعمل إيه')}</${H2}>
          <${Fig} name="hc-design-mistakes" />
          <${Hand} arrow="up">${t('switch between the two mistakes, then press "Show what to do instead"', 'بدّل بين الغلطتين، وبعدين دوس "Show what to do instead"')}</${Hand}>
        `),

        // 5 · mistake 2
        page(html`
          <${H1}>${t('Mistake #2: settling too early', 'الغلطة رقم 2: تثبت بدري')}</${H1}>
          <${Def}>${X("Joyner's <b>second biggest mistake</b>: settling on a <b>single design idea</b>, or a <b>single genre</b> of design ideas, <b>too early</b>.",
            '<b>تاني أكبر غلطة</b> عند Joyner: إنك تثبت على <b>فكرة design واحدة</b>، أو <b>نوع واحد</b> من الأفكار، <b>بدري أوي</b>.')}</${Def}>
          <${P} small=${true}>${X('Notice the "or". Three sketches can still be <b>one</b> idea: three versions of the same hamburger-menu layout are one genre, chosen too early.',
            'خد بالك من "أو". تلات sketches ممكن يبقوا فكرة <b>واحدة</b>: تلات نسخ من نفس الـ hamburger-menu layout هما نوع واحد من الأفكار، واتختار بدري.')}</${P}>
          <${Hand} tilt=${true}>${t('Our analogy, not the slides\': the first idea is a first date. Lovely, but you don\'t sign the marriage contract that evening.', 'تشبيه من عندنا: أول فكرة زي أول مقابلة. حلوة، بس مش هتكتب الكتاب في نفس الليلة.')}</${Hand}>
          <${Grow} />
          <${Talk} who="dev">${t('So the cure for #2 is… more ideas?', 'يعني علاج الغلطة 2… أفكار أكتر؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Exactly. It even has its own phase: <b>design alternatives</b>.', 'بالظبط. وليها مرحلة لوحدها كمان: الـ <b>design alternatives</b>.')}</${Talk}>
        `, { sec: t('Mistake #2', 'الغلطة رقم 2') }),

        // 6 · watch it: which is which
        page(html`
          <${Box} kind="watch" title=${t('Watch it: #1 or #2?', 'خلّي بالك: رقم 1 ولا 2؟')}>
            <p className="hf-p small">${t('Questions swap the two mistakes, or flip one word. Pin them down:', 'الأسئلة بتبدّل الغلطتين، أو بتغيّر كلمة واحدة. ثبّتهم:')}</p>
            ${li(A ? ['<b>الأكبر</b>: تصمم من غير ما تفهم الـ users أو الـ task.', '<b>التانية</b>: تثبت على فكرة واحدة (أو نوع واحد) <b>بدري</b>، مش "متأخر".', 'لو السؤال قال إن الـ settling على فكرة واحدة هو <b>الأكبر</b>، يبقى <b>False</b>.']
              : ['<b>Biggest</b>: designing without understanding the users or the task.', '<b>Second</b>: settling on one idea (or genre) too <b>early</b>, never "too late".', 'If a statement calls settling on one idea the <b>biggest</b> mistake, it is <b>False</b>.'])}
          </${Box}>
          ${mq('m-big', /^The biggest mistake a designer can make is jumping/i)}
        `),

        // 7 · exercise: name that mistake
        page(html`
          <${Box} kind="pencil" title=${t('Name that mistake', 'سمّي الغلطة')}><p className="hf-p small">${t('Our scenarios. For each: 1 = biggest mistake, 2 = second biggest, ✓ = no mistake.', 'مواقف من عندنا. لكل واحد: 1 = أكبر غلطة، 2 = تاني أكبر غلطة، ✓ = مفيش غلطة.')}</p></${Box}>
          <${Sort} id="mist" bins=${[['1', t('Biggest mistake', 'أكبر غلطة')], ['2', t('Second biggest', 'تاني أكبر غلطة')], ['✓', t('No mistake', 'مفيش غلطة')]]} items=${A ? [
            ['فريق بيرسم شاشات من أول يوم من غير ما يكلّم ولا user.', 0],
            ['بعد research كويس، الفريق رسم تلات نسخ من نفس الـ menu ومسك في واحدة.', 1],
            ['مصمم فتح Figma قبل ما يعرف الـ users عايزين يعملوا إيه.', 0],
            ['فريق استكشف ييجي 12 فكرة مختلفة جدًا قبل ما يختار.', 2],
            ['الفريق خد أول فكرة اتقالت في الميتنج وفضل يلمّعها أسابيع.', 1],
            ['فريق فهم الـ users والـ task، وبعدين رسم alternatives كتير مختلفة.', 2]
          ] : [
            ['A team draws screens on day one without talking to a single user.', 0],
            ['After good research, a team sketches three versions of the same menu and commits to one.', 1],
            ['A designer opens Figma before knowing what task the users need to do.', 0],
            ['A team explores a dozen very different ideas before choosing.', 2],
            ['A team takes the first idea from the meeting and polishes it for weeks.', 1],
            ['A team studies the users and the task, then sketches many different alternatives.', 2]
          ]} />
        `, { sec: t('Exercise: name that mistake', 'تمرين: سمّي الغلطة') }),

        // 8 · design alternatives
        page(html`
          <${H1}>${t('Design alternatives: its own phase', 'الـ Design alternatives: مرحلة لوحدها')}</${H1}>
          <${P}>${X("Design alternatives is a <b>separate phase</b> in Joyner's cycle. To reach a good design, <b>explore a wider range</b> of possible alternatives instead of focusing on one from the start.",
            'الـ design alternatives <b>مرحلة لوحدها</b> في الـ cycle بتاع Joyner. عشان توصل لـ design كويس، <b>استكشف alternatives أكتر وأوسع</b> بدل ما تركز على واحد من الأول.')}</${P}>
          ${li(A ? ['إنك تركز <b>جامد على alternative واحد من الأول خالص</b> ده غلطة كبيرة.', 'إن يبقى عندك كذا alternative <b>مهم في المراحل الأولى</b> من الـ design.']
            : ['Focusing <b>too strongly on one alternative from the very beginning</b> is a big mistake.', 'Having several alternatives <b>is important in the early stages</b> of the design.'])}
          <${Grow} />
          <${Hand} red=${true} arrow="up">${t('both lines are straight from the slides, and both came up in last term\'s final', 'السطرين دول من السلايدز بالنص، والاتنين جم في فاينل الترم اللي فات')}</${Hand}>
        `, { sec: t('Design alternatives', 'الـ Design alternatives') }),

        // 9 · captured by the current interface
        page(html`
          <${H2}>${t('The trap: the system you already have', 'الفخ: الـ system اللي عندك أصلًا')}</${H2}>
          <${P} small=${true}>${X('Focusing on one alternative is <b>very common when you enhance an existing system</b>, because you get <b>captured by its current interface</b>. Every new sketch quietly turns back into the old screen.',
            'التركيز على alternative واحد <b>منتشر جدًا لما تكون بتحسّن system موجود</b>، لأنك بتبقى <b>محبوس في الـ interface الحالي بتاعه</b>. وكل sketch جديد بيرجع من غير ما تاخد بالك شبه الشاشة القديمة.')}</${P}>
          <${Talk} who="dev">${t('Every version of the new portal I draw looks like the old portal.', 'كل نسخة برسمها للـ portal الجديد طالعة شبه القديم.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("That's the trap. The advice: <b>distance yourself from existing solutions</b>, at least initially, during the <b>brainstorming</b> sessions.",
            'ده الفخ بالظبط. والنصيحة: <b>ابعد نفسك عن الحلول الموجودة</b>، على الأقل في الأول، وقت الـ <b>brainstorming</b>.')}</${Talk}>
        `),

        // 10 · figure: alternatives
        page(html`
          <${H2}>${t('Play with alternatives', 'العب بالـ alternatives')}</${H2}>
          <${Fig} name="hc-alternatives" />
          <${Hand} arrow="up">${t('add alternatives, tick "Captured…", tap two to combine them, then press "How many alternatives?"', 'زوّد alternatives، وعلّم على "Captured…"، ودوس على اتنين عشان تجمعهم، وبعدين دوس "How many alternatives?"')}</${Hand}>
        `),

        // 11 · how many: as many as you can
        page(html`
          <${H2}>${t('How many alternatives?', 'كام alternative؟')}</${H2}>
          <p className="hf-hci8-q hf-in">${t('As many as you can.', 'أكتر ما تقدر.')}<small>${t("the lecture's whole answer", 'دي إجابة المحاضرة كلها')}</small></p>
          <div className="hf-hci8-stat hf-in"><b dir="ltr">100+</b><span>${X('prototypes for the <b>first Microsoft mouse</b>: the lecture\'s example.', 'prototype اتعملوا لـ <b>أول ماوس من Microsoft</b>: ده مثال المحاضرة.')}</span></div>
          <${Mice} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>More than</b> 100, not "100" and not "a few". If both "100" and "More than 100" are options, pick <b>More than 100</b>. And no fixed number like "exactly three": the answer is <b>as many as you can</b>.',
            '<b>أكتر من</b> 100، مش 100 بالظبط ومش "شوية". لو الاختيارات فيها <bdi dir="ltr">100</bdi> و<bdi dir="ltr">More than 100</bdi>، اختار التانية. ومفيش رقم ثابت زي "تلاتة بالظبط": الإجابة <b>أكتر ما تقدر</b>.')}</p></${Box}>
        `),

        // 12 · two of the doctors' questions on alternatives
        page(html`
          ${mq('m-mouse', /only a few prototypes/i)}
          <${Gap} h=${6} />
          ${mq('m-sev', /several design alternatives is not important/i)}
        `),

        // 13 · the final design is a combination
        page(html`
          <${H2}>${t('And at the end? Usually a mix', 'وفي الآخر؟ غالبًا خلطة')}</${H2}>
          <${P} small=${true}>${X('You <i>may</i> choose one alternative and finalize it, but it is <b>more common</b> that the final design is a <b>combination</b> of alternatives explored earlier. Try it with our toy example, a course-registration portal:',
            '<i>ممكن</i> تختار alternative واحد وتكمّله، بس <b>الأشهر</b> إن الـ design النهائي يبقى <b>combination</b> من alternatives اتستكشفت قبل كده. جرّب على مثال من عندنا، portal لتسجيل المواد:')}</${P}>
          <${Combo} />
        `, { sec: t('Combining alternatives', 'جمع الـ alternatives') }),

        // 14–15 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: an Existing Interface and a New Alternative argue about the redesign.", 'قعدة الليلة: الـ Interface الموجود والـ Alternative الجديد بيتخانقوا على الـ redesign.')} />
          <${Chat} names=${[t('Existing Interface', 'الـ Interface الموجود'), t('New Alternative', 'الـ Alternative الجديد')]} lines=${A ? [
            [0, 'إيه الدوشة دي كلها؟ إنتو بتحسّنوني <b>أنا</b>. ظبّطوا الزراير وخلاص.'],
            [1, 'ده الفخ بالظبط. لما حد بيحسّن system موجود، بيبقى <b>محبوس في الـ interface الحالي</b>، وكل sketch بيطلع شبهك.'],
            [0, 'بس الناس متعودة عليا. ده مش حاجة كويسة؟'],
            [1, 'يمكن. بس النصيحة واضحة: <b>ابعد عن الحلول الموجودة</b>، على الأقل وقت الـ brainstorming.'],
            [0, 'ماشي. يعني هتحطوا مكاني فكرة واحدة جديدة لامعة؟']
          ] : [
            [0, "What's all the fuss? You're enhancing <b>me</b>. Just tweak my buttons."],
            [1, "That's the trap. When you enhance an existing system, you get <b>captured by its current interface</b>, and every sketch looks like you."],
            [0, "But people know me. Isn't that a good thing?"],
            [1, 'Maybe. But the advice is clear: <b>distance yourself from existing solutions</b>, at least during brainstorming.'],
            [0, 'Fine. So you\'ll replace me with one shiny new idea?']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('Existing Interface', 'الـ Interface الموجود'), t('New Alternative', 'الـ Alternative الجديد')]} start=${1} lines=${A ? [
            [1, 'واحدة؟ لأ. التركيز على <b>alternative واحد من الأول</b> غلطة كبيرة برضه. أنا جاي ومعايا صحابي: <b>أكتر ما نقدر</b>.'],
            [0, 'وده يطلع كام في الحقيقة؟'],
            [1, 'أول ماوس من Microsoft عدّى على <b>أكتر من 100 prototype</b>.'],
            [0, 'وفي الآخر؟ مين فيكم بيكسب؟'],
            [1, 'غالبًا مش واحد لوحده: الـ design النهائي بيبقى <b>combination</b> من الـ alternatives اللي اتستكشفت.']
          ] : [
            [1, "One? No. Focusing on <b>one alternative from the very beginning</b> is a big mistake too. I come with friends: <b>as many as we can</b>."],
            [0, 'How many is that, really?'],
            [1, 'The first Microsoft mouse went through <b>more than 100 prototypes</b>.'],
            [0, 'And at the end, which one of you wins?'],
            [1, 'Often no one alone: the final design is usually a <b>combination</b> of the alternatives explored earlier.']
          ]} />
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${t('So: brainstorm far from the old screen first, decide later.', 'يعني: اعمل brainstorming بعيد عن الشاشة القديمة الأول، وقرّر بعدين.')}</${Talk}>
        `),

        // 16 · dumb questions on alternatives
        page(html`
          <${Dumb} qa=${A ? [
            ['مش استكشاف alternatives كتير تضييع وقت لو هنختار واحد في الآخر؟', 'المحاضرة بتقول العكس: إن يبقى عندك كذا alternative <b>مهم في المراحل الأولى</b>، والـ design النهائي غالبًا <b>combination</b>، مش اختيار واحد.'],
            ['"ابعد عن الحلول الموجودة" يعني أتجاهل الـ system القديم على طول؟', 'لأ: <b>"على الأقل في الأول، وقت الـ brainstorming"</b>. الفكرة إنك متبقاش محبوس في الـ interface الحالي وإنت بتطلّع أفكار.'],
            ['يعني إيه "نوع واحد" من الأفكار (genre)؟', 'شرح من عندنا: مجموعة أفكار هي في الحقيقة نفس الفكرة بلبس مختلف، زي تلات نسخ من نفس الـ menu. الثبات عليها بدري برضه هو الغلطة التانية.']
          ] : [
            ["Isn't exploring lots of alternatives a waste if we pick one anyway?", 'The lecture says the opposite: several alternatives <b>are important in the early stages</b>, and the final design is more often a <b>combination</b> than a single pick.'],
            ['Does "distance yourself" mean ignore the old system forever?', 'No: <b>"at least initially, during the brainstorming sessions."</b> The point is not to be captured by the current interface while ideas are being generated.'],
            ['What is a "genre" of ideas?', 'Our explanation: a family of ideas that are really the same idea in different clothes, like three versions of one menu. Settling on it early is still the second biggest mistake.']
          ]} />
        `),

        // 17 · prototyping: what it is not, and what it is
        page(html`
          <${H1}>${t('Prototyping: not a mini product', 'الـ Prototyping: مش منتج صغير')}</${H1}>
          <div className="hf-hci8-vs hf-in">
            <div className="no"><b>${t('Most people', 'أغلب الناس')}</b>${X('"A quick or small version of the real thing." The lecture: <b>not a useful understanding</b>.', 'فاكرينه "نسخة سريعة أو صغيرة من الحاجة الحقيقية". والمحاضرة بتقول: <b>فهم مش مفيد</b>.')}</div>
            <div className="ok"><b>${t('Designers', 'الـ designers')}</b>${X('Rapidly creating an <b>approximation</b> of a design so you can quickly get <b>feedback</b>.', 'إنك تعمل بسرعة <b>نسخة تقريبية</b> من الـ design عشان تاخد <b>feedback</b> بسرعة.')}</div>
          </div>
          <${Def}>${A ? html`تعريف الـ designers بالنص:<span class="ltr"><b>"Rapidly creating an approximation of a design so that you can quickly get feedback."</b></span>` : html`<b>"Rapidly creating an approximation of a design so that you can quickly get feedback."</b>`}</${Def}>
          <${Hand} arrow="up" red=${true}>${t('three key words: rapidly, approximation, feedback', 'تلات كلمات مهمين: بسرعة، وتقريبي، والـ feedback')}</${Hand}>
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t("It's not a smaller product. It's a faster way to hear what people think.", 'هو مش منتج أصغر. هو طريقة أسرع تسمع بيها الناس رأيها إيه.')}</${Talk}>
        `, { sec: t('Prototyping', 'الـ Prototyping') }),

        // 18 · Klemmer
        page(html`
          <${H2}>${t('Klemmer, line one', 'الجملة الأولى بتاعة Klemmer')}</${H2}>
          <p className="hf-hci8-q hf-in" dir="ltr" style=${A ? { textAlign: 'left' } : null}>"A prototype is not about the artifact, it's about feedback and iteration."<small>Scott Klemmer</small></p>
          <${P} small=${true}>${X("The artifact, the thing you made, is not the point. What it gets you is: <b>feedback</b> from people, and the chance to <b>iterate</b>, change the design and try again.",
            'الـ artifact، يعني الحاجة اللي عملتها نفسها، مش هي المهمة. المهم اللي بتجيبهولك: <b>feedback</b> من الناس، وفرصة تعمل <b>iteration</b>، تغيّر الـ design وتجرّب تاني.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('So prototypes are <b>not</b> "artifacts to showcase", and <b>not</b> "final products". Both are distractors on the Klemmer question.',
            'يبقى الـ prototypes <b>مش</b> حاجة تتعرض عشان تتباهى بيها، و<b>مش</b> منتج نهائي. الاتنين دول اختيارات غلط في سؤال Klemmer.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="dev">${t('So a gorgeous prototype that nobody comments on…', 'يعني prototype تحفة ومحدش علّق عليه…')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('…missed its whole job. Hold that thought for two pages.', '…فاتته شغلانته كلها. استنى الفكرة دي صفحتين.')}</${Talk}>
        `),

        // 19 · figure: prototype loop
        page(html`
          <${H2}>${t('The prototyping loop', 'لفّة الـ prototyping')}</${H2}>
          <${Fig} name="hc-prototype-loop" />
        `),

        // 20 · Joyner's iterative process
        page(html`
          <${H2}>${t("Joyner: design is iterative", 'بيقول Joyner: الـ design بيلف')}</${H2}>
          <${P} small=${true}>${X('Design is an iterative process of <b>brainstorming, combining, abandoning, revising and improving</b> ideas, which <b>requires several ideas to start with</b>. Our picture of it:',
            'الـ design process iterative فيها <b>brainstorming وتجميع وسيب وتعديل وتحسين</b> للأفكار، وده <b>محتاج كذا فكرة تبدأ بيهم</b>. الصورة دي من عندنا:')}</${P}>
          <${Workshop} />
          <${Grow} />
          <${Hand}>${t('With a single idea there is nothing to combine or abandon.', 'بفكرة واحدة مفيش حاجة تجمعها ولا تسيبها.')}</${Hand}>
        `, { sec: t('Iteration', 'الـ Iteration') }),

        // 21 · what makes a good prototype
        page(html`
          <${H1}>${t('What makes a prototype good?', 'إيه اللي يخلّي الـ prototype كويس؟')}</${H1}>
          <${Def}>${X('A good prototype enables you to get <b>useful (constructive) feedback</b> and <b>iterate</b> on your design. It does <b>not</b> need to resemble your final product.',
            'الـ prototype الكويس هو اللي بيخليك تاخد <b>feedback مفيد (constructive)</b> وتعمل <b>iteration</b> على الـ design. و<b>مش لازم</b> يشبه المنتج النهائي.')}</${Def}>
          <${Box} kind="watch" title=${t('Watch it: three wrong descriptions', 'خلّي بالك: تلات أوصاف غلط')}>
            ${li(A ? ['"يشبه المنتج النهائي جدًا": <b>غلط</b>، مش لازم يشبهه.', '"نسخة سريعة من الـ design النهائي": ده الفهم <b>المش مفيد</b>.', '"شكله polished": الـ polish مش هو الهدف.']
              : ['"Resembles the final product closely": <b>wrong</b>, it need not.', '"A quick version of the final design": the <b>not useful</b> view.', '"A polished appearance": polish is not the goal.'])}
          </${Box}>
          <${Grow} />
          <${Hand} red=${true}>${t('right answer, every time: useful feedback + iteration', 'الإجابة الصح كل مرة: feedback مفيد + iteration')}</${Hand}>
        `, { sec: t('A good prototype', 'الـ prototype الكويس') }),

        // 22 · doctors' questions on good prototypes
        page(html`
          ${mq('m-res', /Good prototypes are those that closely resemble/i)}
          <${Gap} h=${6} />
          ${mq('m-def', /enables you to get useful feedback and iterate/i)}
        `),

        // 23 · prototypes are questions
        page(html`
          <${H2}>${t('Klemmer, line two', 'الجملة التانية بتاعة Klemmer')}</${H2}>
          <p className="hf-hci8-q hf-in" dir="ltr" style=${A ? { textAlign: 'left' } : null}>"Prototypes are questions, ask a lot of them."<small>Scott Klemmer</small></p>
          <${P} small=${true}>${X('A prototype that gives you <b>no new knowledge</b> wastes the design process. Each one should ask something you don\'t know yet, and you should ask <b>a lot</b>.',
            'الـ prototype اللي <b>مش بيدّيك معرفة جديدة</b> بيضيّع الـ design process. كل واحد لازم يسأل حاجة إنت لسه متعرفهاش، ولازم تسأل <b>كتير</b>.')}</${P}>
          <${Box} kind="brain"><p className="hf-p">${t('A team spends weeks on a polished prototype, shows it to users, and learns nothing new. By the lecture\'s rules, what went wrong?', 'فريق قعد أسابيع على prototype polished، وراه للـ users، ومتعلموش أي حاجة جديدة. بقواعد المحاضرة، إيه اللي باظ؟')}</p></${Box}>
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${t('It never asked a question, so it got no feedback worth having.', 'عمره ما سأل سؤال، فمجابش feedback يفيد.')}</${Talk}>
        `, { sec: t('Prototypes are questions', 'الـ Prototypes أسئلة') }),

        // 24 · match: what is this prototype asking?
        page(html`
          <${H2}>${t('What is this prototype asking?', 'الـ prototype ده بيسأل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Our examples. Tap a prototype, then the question it is built to answer.', 'أمثلة من عندنا. دوس على prototype، وبعدين على السؤال بتاعه.')}</${P}>
          <${Match} id="ask" left=${A ? ['اسكتشين ورق للشاشة الرئيسية', 'موبايل كرتون عليه زرار "ادفع"', 'نموذج <bdi dir="ltr">mock-up</bdi> للـ sign-up بيتداس عليه', 'ماوس من فوم']
            : ['Two paper home-screen sketches', "A cardboard phone with a 'Pay' button", 'A clickable sign-up mock-up', 'A foam mouse']}
            right=${A ? ['هل الشكل ده مريح في الإيد؟', 'الـ users بيتلخبطوا فين في الـ sign-up؟', 'أنهي layout الـ users بيفضّلوه؟', 'الـ users بيلاقوا مكان الدفع؟']
              : ['Does this shape feel comfortable in the hand?', 'Where do users get stuck signing up?', 'Which of the two layouts do users prefer?', 'Do users find where to pay?']}
            answer=${[2, 3, 1, 0]} />
          <${Grow} />
          <${Hand}>${t('none of them looks finished; each one asks something', 'ولا واحد شكله خلصان، وكل واحد بيسأل حاجة')}</${Hand}>
        `, { sec: t('Exercises', 'التمارين') }),

        // 25 · interview: the prototype
        page(html`
          <${Interview} title=${t('The Prototype, exposed', 'الـ Prototype على المكشوف')} sub=${t("This week's interview: the most misunderstood thing in the design studio.", 'حوار الأسبوع: أكتر حاجة الناس فاهماها غلط في الـ design.')} lines=${A ? [
            ['المذيع', 'إنت يعني نسخة صغيرة من المنتج الحقيقي؟'],
            ['الـ Prototype', 'ده اللي أغلب الناس فاكراه، والمحاضرة بتقول إنه <b>فهم مش مفيد</b>. أنا <b>نسخة تقريبية بتتعمل بسرعة</b> عشان الـ designer ياخد <b>feedback</b> بسرعة.'],
            ['المذيع', 'طب على الأقل شبه المنتج النهائي؟'],
            ['الـ Prototype', '<b>مش لازم</b>. الكويس فينا اللي بيجيب <b>feedback مفيد</b> ويخليك تعمل iteration.'],
            ['المذيع', 'وإيه أكتر حاجة بتخوّفك؟'],
            ['الـ Prototype', 'إني معلّمش حد حاجة. الـ prototype اللي <b>مش بيدّي معرفة جديدة</b> بيضيّع الـ design process.']
          ] : [
            ['Head First', "So you're a small version of the real product?"],
            ['Prototype', "That's what most people think, and the lecture calls it <b>not a useful understanding</b>. I'm a <b>rapidly created approximation</b>, so the designer can <b>quickly get feedback</b>."],
            ['Head First', 'Do you at least look like the final product?'],
            ['Prototype', "I <b>don't need to</b>. A good one of us gets <b>useful, constructive feedback</b> and lets you iterate."],
            ['Head First', "What's your worst nightmare?"],
            ['Prototype', 'Teaching nobody anything. A prototype that gives <b>no new knowledge</b> wastes the design process.']
          ]} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Ask me something. That is what I am for.', 'اسألني حاجة. أنا معمول لكده.')}</${Talk}>
        `, { sec: t('Interview', 'الحوار') }),

        // 26 · sort: true or false
        page(html`
          <${Box} kind="pencil" title=${t('True or false?', 'صح ولا غلط؟')}><p className="hf-p small">${t('Everything from this half of the chapter. Mark each one.', 'كل حاجة من النص ده من الفصل. علّم على كل واحدة.')}</p></${Box}>
          <${Sort} id="tf" bins=${[[t('T', 'ص'), t('True', 'صح')], [t('F', 'غ'), t('False', 'غلط')]]} items=${A ? [
            ['الـ prototype مجرد نسخة صغيرة من الحاجة الحقيقية.', 1],
            ['الـ prototype موجود عشان تاخد feedback بسرعة.', 0],
            ['الـ prototype الكويس لازم يشبه المنتج النهائي.', 1],
            ['الـ prototype اللي مش بيعلّمك جديد بيضيّع الـ process.', 0],
            ['بيقول Klemmer إن الـ prototype عن الـ artifact نفسه.', 1],
            ['الـ prototype الكويس بيجيب feedback مفيد وبيسمح بالـ iteration.', 0],
            ['الـ process الـ iterative محتاجة كذا فكرة في الأول.', 0]
          ] : [
            ['A prototype is simply a small version of the real thing.', 1],
            ['A prototype exists so you can get feedback quickly.', 0],
            ['A good prototype must resemble the final product.', 1],
            ['A prototype that teaches nothing new wastes the process.', 0],
            ['Klemmer: a prototype is about the artifact.', 1],
            ['A good prototype gets useful feedback and allows iteration.', 0],
            ['The iterative process needs several ideas to start with.', 0]
          ]} />
        `),

        // 27 · dumb questions on prototyping
        page(html`
          <${Dumb} qa=${A ? [
            ['لو الـ prototype مش لازم يشبه المنتج، ينفع رسمة على ورق تبقى prototype؟', 'قراءتنا: آه، أي نسخة تقريبية سريعة بتجيبلك feedback داخلة في التعريف. والمحاضرة الجاية عن الـ fidelity والـ low-fidelity prototypes بالظبط.'],
            ['مين قال إيه؟ Klemmer ولا Joyner؟', 'من <b>Klemmer</b> جملة الـ artifact وجملة إن الـ prototypes أسئلة. ومن <b>Joyner</b> أكبر غلطتين، والـ design كـ process iterative محتاجة كذا فكرة.'],
            ['ليه "rapidly"؟', 'لأن الهدف feedback <b>سريع</b>. التعريف بيقول تعمله بسرعة عشان:<span class="ltr"><b>"so that you can quickly get feedback"</b></span>']
          ] : [
            ["If it needn't look like the product, can a paper sketch be a prototype?", "Our reading: yes. Any quick approximation that gets you feedback fits the definition. Next lecture's fidelity and low-fidelity prototypes pick this up."],
            ['Who said what: Klemmer or Joyner?', '<b>Klemmer</b>: "not about the artifact" and "prototypes are questions". <b>Joyner</b>: the two biggest mistakes, and design as an iterative process needing several ideas.'],
            ['Why "rapidly"?', 'Because the point is <b>quick</b> feedback: you create it rapidly <b>"so that you can quickly get feedback"</b>.']
          ]} />
        `),

        // 28–30 · exam corner
        page(html`
          <${Box} kind="exam" title=${exam}><p className="hf-p small">${X("The doctors' questions on this lecture: one from the 2024/25 exam (you met it earlier), the rest from last term's final as a student summary lists them. Tap an answer to see why.",
            'أسئلة الدكاترة على المحاضرة دي: واحد من امتحان <bdi dir="ltr">2024/25</bdi> (قابلته قبل كده)، والباقي من فاينل الترم اللي فات زي ما ملخص طلبة جمعهم. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m-pur', /purpose of prototyping according to designers/i)}
        `, { sec: exam }),
        page(html`
          ${mq('m-brain', /What should designers do during brainstorming/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Hint: think of the old system that keeps sneaking back into your sketches.', 'تلميح: افتكر الـ system القديم اللي بيتسحّب لجوّه الـ sketches بتاعتك.')}</${Talk}>
        `),
        page(html`
          ${mq('m-dist', /beneficial to distance yourself/i)}
          <${Gap} h=${6} />
          ${mq('m-comb', /final design is usually a combination/i)}
        `),
        page(html`
          ${mq('m-quick', /simply a quick or small version/i)}
          <${Gap} h=${6} />
          ${mq('m-ask', /considered questions that should be asked/i)}
        `),

        // 31 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            '<b>أكبر غلطة</b> عند Joyner: تصمم من غير ما تفهم الـ users أو الـ task.',
            '<b>تاني أكبر غلطة</b>: تثبت على فكرة واحدة (أو نوع واحد) <b>بدري</b>.',
            'الـ <b>design alternatives</b> مرحلة لوحدها في الـ cycle بتاع Joyner: استكشف كتير.',
            'لو بتحسّن system موجود، <b>ابعد عن الحلول الموجودة</b> وقت الـ brainstorming.',
            'كام alternative؟ <b>أكتر ما تقدر</b> (أول ماوس من Microsoft: أكتر من 100 prototype). والنهائي غالبًا <b>combination</b>.',
            'الـ <b>prototyping</b>: نسخة تقريبية سريعة عشان feedback سريع، مش منتج صغير.',
            'بيقول Klemmer: الموضوع <b>feedback وiteration</b>، والـ <b>prototypes أسئلة</b>.',
            'الـ prototype الكويس: <b>feedback مفيد</b> + iteration، ومش لازم يشبه المنتج.'
          ] : [
            "Joyner's <b>biggest mistake</b>: designing without understanding the users or the task.",
            '<b>Second biggest</b>: settling on one idea (or one genre) <b>too early</b>.',
            "<b>Design alternatives</b> is its own phase in Joyner's cycle: explore widely.",
            'Enhancing an existing system? <b>Distance yourself</b> from it during brainstorming.',
            'How many? <b>As many as you can</b> (first Microsoft mouse: 100+ prototypes). The final design is often a <b>combination</b>.',
            '<b>Prototyping</b>: a rapid approximation of a design, to get feedback quickly.',
            'Klemmer: it is about <b>feedback and iteration</b>; <b>prototypes are questions</b>.',
            "A good prototype: <b>useful feedback</b> + iteration; it needn't resemble the product."
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 32 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 8!', 'خلّصت الفصل التامن!')}</${H1}>
            <${Talk} who="lens">${t('Next time: how rough can a prototype be? Fidelity, brainstorming and wireframes.', 'المرة الجاية: الـ prototype ممكن يبقى بسيط لدرجة إيه؟ الـ fidelity والـ brainstorming والـ wireframes.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [8], t: Date.now() } }}>${t('Quiz me on Lecture 8', 'امتحنّي في محاضرة 8')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 8, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 8, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

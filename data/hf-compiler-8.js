// Head First chapter for Compiler Design Lecture 8 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Semantic Analysis Part 2: scoping, binding and symbol tables. Every fact comes from the lecture's notes; our analogies and
// tricks are marked as ours. "Dynamic" in the scoping exercises follows the course's convention, as the notes state it.
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-cc8')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc8';
    s.textContent = `
.hfb .hf-c8-wx{ display:grid; grid-template-columns:auto 1fr 1fr; gap:5px 6px; align-items:center; }
.hfb .hf-c8-wx .hd{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--graphite); text-align:center; }
.hfb .hf-c8-wx .lb{ font:700 13.5px/1.1 var(--body); color:var(--ink); white-space:nowrap; }
.hfb .hf-c8-cell{ display:flex; gap:3px; justify-content:center; border-radius:7px; padding:2px; border:1.5px solid transparent; }
.hfb .hf-c8-cell.ok{ border-color:var(--ok); } .hfb .hf-c8-cell.no{ border-color:var(--hf-red); }
.hfb .hf-c8-cell button{ font:700 13px/1 var(--mono); min-width:27px; height:30px; padding:0 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-c8-cell button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-c8-ops{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-c8-ops > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); }
.hfb .hf-c8-ops > div.lo{ background:var(--hf-grey); border-color:transparent; }
.hfb .hf-c8-ops h5{ margin:0 0 5px; font:800 13.5px/1.1 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--hf-k); }
.hfb .hf-c8-ops p{ margin:0 0 4px; font:500 14px/1.3 var(--body); color:var(--ink); }
.hfb .hf-c8-ops code{ font:600 13px var(--mono); }
.hfb .hf-c8-ll{ border:1.5px solid var(--hf-line); border-radius:8px; padding:8px 9px; background:var(--paper); display:grid; gap:6px; }
.hfb .hf-c8-lrow{ display:flex; align-items:center; gap:5px; flex-wrap:wrap; }
.hfb .hf-c8-lrow > b{ font:800 16px var(--mono); color:var(--hf-k); min-width:14px; }
.hfb .hf-c8-lrow > i{ font:600 14px var(--mono); font-style:normal; color:var(--graphite); }
.hfb .hf-c8-rec{ display:inline-flex; border:1.5px solid var(--hf-line); border-radius:5px; overflow:hidden; font:700 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-c8-rec span{ padding:4px 6px; border-left:1px solid var(--faint); } .hfb .hf-c8-rec span:first-child{ border-left:0; }
.hfb .hf-c8-rec.new{ box-shadow:0 0 0 2px var(--ok); }
.hfb .hf-c8-rec.fr{ animation:hf-c8-in .7s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-c8-in{ from{ opacity:0; transform:translateX(-14px); } }
.hfb .hf-c8-keys{ display:flex; flex-wrap:wrap; gap:6px; }
.hfb .hf-c8-keys code{ font:700 13.5px var(--mono); border:1.5px solid var(--hf-line); border-radius:6px; padding:3px 7px; background:var(--paper); }
.hfb .hf-c8-keys code.hit{ background:color-mix(in srgb, var(--ok) 18%, var(--paper)); border-color:var(--ok); }
.hfb .hf-c8-keys code.miss{ text-decoration:line-through; border-style:dashed; color:var(--graphite); }
@media (prefers-reduced-motion: reduce){ .hfb .hf-c8-rec.fr{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // "Which x?": for each use of x, pick the declaration it is bound to under static and under dynamic binding (course convention),
  // then what cout prints. Program: { int x = 5; int y = 0; y += x; { int x = 2; y += x; } y += x; cout << y; }
  // use 1 → A in both; use 2 → B in both; use 3 → A (static), B (dynamic). y: 5, 7, then 12 (static) or 9 (dynamic).
  const WX_ANS = { u0s: 'A', u0d: 'A', u1s: 'B', u1d: 'B', u2s: 'A', u2d: 'B', os: 12, od: 9 };
  function WhichX() {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot('wx', {});
    const [chk, setChk] = H.K.useSlot('wx:c', false);
    const keys = Object.keys(WX_ANS), right = keys.filter(k => pick[k] === WX_ANS[k]).length;
    const set = (k, v) => { setPick(Object.assign({}, pick, { [k]: v })); setChk(false); };
    const cell = (k, opts) => html`<div className=${'hf-c8-cell' + (chk && pick[k] != null ? (pick[k] === WX_ANS[k] ? ' ok' : ' no') : '')} dir="ltr">
      ${opts.map(v => html`<button key=${v} aria-pressed=${String(pick[k] === v)} onClick=${() => set(k, v)}>${v}</button>`)}</div>`;
    const rows = [0, 1, 2].map(i => html`<${React.Fragment} key=${i}><span className="lb">${ar ? 'استخدام ' + (i + 1) : 'use ' + (i + 1)}</span>${cell('u' + i + 's', ['A', 'B'])}${cell('u' + i + 'd', ['A', 'B'])}</${React.Fragment}>`);
    return html`<div className="hf-in">
      <div className="hf-c8-wx">
        <span></span><span className="hd">Static</span><span className="hd">Dynamic</span>
        ${rows}
        <span className="lb">cout</span>${cell('os', [7, 9, 12, 14])}${cell('od', [7, 9, 12, 14])}
      </div>
      <div className="hf-row" style=${{ marginTop: '8px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setPick(Object.assign({}, WX_ANS)); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / ${keys.length}</bdi></span>`}
      </div>
    </div>`;
  }

  // Solution 2 drawn as records: identifier → linked list [scope | init | next], newest declaration in front
  const Rec = ({ s, last, cls }) => html`<span className=${'hf-c8-rec' + (cls ? ' ' + cls : '')}><span>${s}</span><span>YES</span><span>${last ? 'NULL' : 'next'}</span></span>`;
  function Lists() {
    return html`<div className="hf-c8-ll hf-in" dir="ltr" aria-label="x maps to the scope 1 record then the scope 0 record; y maps to the scope 0 record">
      <div className="hf-c8-lrow"><b>x</b><i>→</i><${Rec} s="1" cls=${calm() ? 'new' : 'new fr'} /><i>→</i><${Rec} s="0" last=${true} /></div>
      <div className="hf-c8-lrow"><b>y</b><i>→</i><${Rec} s="0" last=${true} /></div>
    </div>`;
  }

  H.chapters.compiler[8] = {
    title: 'Scoping, Binding and Symbol Tables',
    kicker: 'Chapter 8',
    run: 'scoping, binding and symbol tables',
    ar: { title: 'الـ Scoping والـ Binding والـ Symbol Tables', kicker: 'الفصل 8', run: 'الـ scoping والـ binding والـ symbol tables' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 8);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[8] && window.AR.compiler.lectures[8].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const LEC = ['{ int x = 1; int y = 2;', '  { double x = 3.14159…;', ['    y += (int)x; }', t('y = 2 + 3 = 5', 'الـ y بقت 5')], ['  y += (int)x;', t('static 6, dynamic 8', 'الـ y بقت 6 أو 8')], '}'];
      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter the <b>semantic analyzer</b> learned to compute attributes (attribute grammars and SDT). This chapter answers the question it asks about every single name it meets: <i>which declaration do you mean?</i>',
            'في الفصل اللي فات الـ <b>semantic analyzer</b> اتعلّم يحسب الـ attributes (الـ attribute grammars والـ SDT). الفصل ده بيجاوب على السؤال اللي بيسأله لكل اسم بيقابله: <i>إنت قصدك أنهي declaration؟</i>')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('Two variables called <code>x</code> live in this program. Before you turn the page, decide which one the last line adds to <code>y</code>. Then ask yourself: could there be a second, different answer?',
            'البرنامج ده فيه اتنين variables اسمهم <code>x</code>. قبل ما تقلب الصفحة، قرّر السطر الأخير بيزوّد أنهي واحد على الـ <code>y</code>. وبعدين اسأل نفسك: ممكن يبقى فيه إجابة تانية مختلفة؟')}</p></${Box}>
          <${Code} lines=${['{ int x = 1; int y = 2;', '  { double x = 3.14159…;', '    y += (int)x; }', ['  y += (int)x;', t('← which x?', 'أنهي x؟')], '}']} />
          <${Grow} />
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Exercises</b> are answered right on the page.', '<b>التمارين</b> بتتحل على الصفحة نفسها.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are traps from the doctor's own papers.", '<b>خلّي بالك!</b> دي فخاخ من امتحانات الدكتورة نفسها.')}</span></div>
          </div>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">8</span><span className="t">${A ? html`الفصل التامن<br/>Compiler Design` : html`Chapter eight<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Will the Real x Please Stand Up?', 'مين فيكم x الحقيقي؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('scoping, binding and symbol tables', 'الـ scoping والـ binding والـ symbol tables')}</p></div>
          <${Talk} who="dev">${X('I declared <code>x</code> twice, once inside a block. Is that even legal?', 'أنا عامل declare لـ <code>x</code> مرتين، مرة جوه block. هو ده ينفع أصلًا؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('In different scopes, sure. My job is to tie every <b>use</b> of <code>x</code> to the right <b>declaration</b>.', 'في scopes مختلفة، أكيد. شغلتي إني أربط كل <b>use</b> للـ <code>x</code> بالـ <b>declaration</b> الصح.')}</${Talk}>
          <${P}>${X("In this chapter you'll learn what <b>binding</b> and <b>scope</b> mean, watch <b>static</b> and <b>dynamic</b> binding give two different answers for the same program, and open up the <b>symbol table</b> to see how it keeps many scopes apart.",
            'في الفصل ده هتعرف يعني إيه <b>binding</b> و<b>scope</b>، وتتفرج على الـ <b>static</b> والـ <b>dynamic</b> binding وهم بيدّوا إجابتين مختلفتين لنفس البرنامج، وتفتح الـ <b>symbol table</b> عشان تشوف إزاي بيفصل بين scopes كتير.')}</${P}>
        `, { sec: t('Binding and scope', 'الـ binding والـ scope') }),

        // 2 · binding and scope
        page(html`
          <${H1}>${t('Binding: who belongs to whom', 'الـ binding: مين تبع مين')}</${H1}>
          <${Def}>${X('<b>Binding</b> connects a <b>declaration</b> and its <b>uses</b>.', 'الـ <b>binding</b> بيربط الـ <b>declaration</b> بالـ <b>uses</b> بتوعه.')}</${Def}>
          <${Def}>${X('The <b>scope</b> of an identifier is the portion of the program where it is <b>accessible</b>.', 'الـ <b>scope</b> بتاع الـ identifier هو الجزء من البرنامج اللي تقدر <b>توصله</b> فيه.')}</${Def}>
          <${UL} items=${A ? [
            'نفس الـ identifier ممكن <b>يشاور على حاجات مختلفة</b> في أجزاء مختلفة من البرنامج.',
            'الـ scopes المختلفة لنفس الاسم <b>مش بتتداخل</b>.',
            'الـ identifier ممكن يكون الـ scope بتاعه <b>محدود</b> (restricted scope).'
          ] : [
            'The same identifier may <b>refer to different things</b> in different parts of the program.',
            'Different scopes for the same name <b>do not overlap</b>.',
            'An identifier may have <b>restricted scope</b>.'
          ]} />
          <${Grow} />
          <${Hand}>${t("Our analogy, not the slides': two students named Ahmed in two classrooms. \"Ahmed\" in room 2 means room 2's Ahmed.", 'تشبيه من عندنا: طالبين اسمهم أحمد في فصلين. "أحمد" في فصل 2 يعني أحمد بتاع فصل 2.')}</${Hand}>
        `),

        // 3 · figure
        page(html`
          <${H2}>${t('Where each x lives', 'كل x عايش فين')}</${H2}>
          <${Fig} name="cc-binding-scope" />
          <${Hand} arrow="up">${t('the inner x hides the outer x until the inner closing brace', 'الـ x اللي جوه بيخبّي اللي برّه لحد قوس القفل الداخلي')}</${Hand}>
        `),

        // 4 · static vs dynamic
        page(html`
          <${H1}>${t('Two rules for finding x', 'قاعدتين عشان تلاقي الـ x')}</${H1}>
          <${P} small=${true}>${X('When a name is used, the compiler (or interpreter) must decide which declaration it is bound to. There are two ways to decide:', 'لما اسم يتستخدم، الـ compiler (أو الـ interpreter) لازم يقرّر هو مربوط بأنهي declaration. فيه طريقتين:')}</${P}>
          <${Def}>${X('<b>Static binding</b>: scoping based on the <b>structure of the syntax tree</b> (braces, blocks). It depends only on the <b>program text</b>, so it is resolved at <b>compile time</b>.',
            'الـ <b>static binding</b>: الـ scoping معتمد على <b>structure الـ syntax tree</b> (الأقواس والـ blocks). معتمد على <b>نص البرنامج</b> بس، فبيتحدد وقت الـ <b>compile</b>.')}</${Def}>
          <${Def}>${X('<b>Dynamic binding</b>: the declaration <b>most recently encountered during execution</b> defines the current use. It depends on the <b>execution</b>, so it <b>cannot</b> be resolved at compile time.',
            'الـ <b>dynamic binding</b>: <b>آخر declaration اتقابل وقت التنفيذ</b> هو اللي بيحدد الـ use الحالي. معتمد على <b>التنفيذ</b>، فـ<b>مينفعش</b> يتحدد وقت الـ compile.')}</${Def}>
          <${Grow} />
          <${Hand} red=${true}>${t('static = look at the braces · dynamic = look at what ran last', 'الـ static بص على الأقواس، والـ dynamic بص على آخر حاجة اتنفّذت')}</${Hand}>
        `, { sec: t('Static vs dynamic', 'الـ static والـ dynamic') }),

        // 5 · figure
        page(html`
          <${H2}>${t('Same line, two answers', 'نفس السطر، إجابتين')}</${H2}>
          <${Fig} name="cc-static-dynamic" />
        `),

        // 6–7 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Static Binding and Dynamic Binding argue over who gets to say which x you meant.", 'قعدة الليلة: الـ Static Binding والـ Dynamic Binding بيتخانقوا مين فيهم اللي يقول إنت قصدك أنهي x.')} />
          <${Chat} names=${[t('Static', 'الـ Static'), t('Dynamic', 'الـ Dynamic')]} lines=${A ? [
            [0, 'أنا بقرا <b>الأقواس</b>. الـ scoping عندي معتمد على <b>structure الـ syntax tree</b>.'],
            [1, 'أنا ميهمنيش إنت كتبته فين. باخد <b>آخر declaration اتقابل وقت التنفيذ</b>.'],
            [0, 'أنا معتمد على <b>نص البرنامج</b> بس، فالـ compiler بيحسمني <b>وقت الـ compile</b>.'],
            [1, 'ومحدش يقدر يحسمني وقت الـ compile. أنا معتمد على <b>التنفيذ</b>: بطلع في الـ <b>symbol-table stack</b> لحد ما ألاقي النسخة الصح.']
          ] : [
            [0, 'I read the <b>braces</b>. My scoping is based on the <b>structure of the syntax tree</b>.'],
            [1, "I don't care where you wrote it. I use the declaration <b>most recently encountered during execution</b>."],
            [0, 'I depend only on the <b>program text</b>, so the compiler settles me at <b>compile time</b>.'],
            [1, 'Nobody settles me at compile time. I depend on the <b>execution</b>: I walk up the <b>symbol-table stack</b> to find the right instance.']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Static', 'الـ Static'), t('Dynamic', 'الـ Dynamic')]} start=${1} lines=${A ? [
            [0, 'و<b>معظم اللغات</b> بتستخدمني: <b>Java وC</b>.'],
            [1, 'أنا عندي <b>Lisp وSNOBOL</b>، و<b>Perl</b> من خلال keywords معينة.'],
            [0, 'في آخر سطر في المحاضرة باخد الـ x اللي برّه، فالـ y بتبقى <b>6</b>.'],
            [1, 'وأنا باخد آخر x اتنفّذ، اللي هو <bdi dir="ltr">3.14…</bdi>، فالـ y بتبقى <b>8</b>.']
          ] : [
            [0, '<b>Most languages</b> use me: <b>Java, C</b>.'],
            [1, 'I have <b>Lisp, SNOBOL</b>, and <b>Perl</b> through certain keywords.'],
            [0, 'On the lecture\'s last line I take the outer <code>x = 1</code>, so y ends as <b>6</b>.'],
            [1, 'I take the x that ran last, <code>3.14…</code>, so y ends as <b>8</b>.']
          ]} />
          <${Grow} />
          <${Hand} red=${true} arrow="down" after=${false}>${t('exam trap: braces = static, never dynamic', 'فخ امتحان: الأقواس يعني static، عمرها ما تبقى dynamic')}</${Hand}>
          ${mq('m-dyn', /Dynamic object binding is done based/i)}
        `),

        // 8 · sort exercise
        page(html`
          <${Box} kind="pencil" title=${t('Static or dynamic?', 'static ولا dynamic؟')}><p className="hf-p small">${X('Tap <b>S</b> for static or <b>D</b> for dynamic binding, then check.', 'دوس <b>S</b> للـ static أو <b>D</b> للـ dynamic، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="sd" bins=${[['S', 'Static'], ['D', 'Dynamic']]} items=${A ? [
            ['بيمشي ورا الأقواس (structure الـ syntax tree)', 0],
            ['بياخد آخر declaration اتقابل وقت التشغيل', 1],
            ['معتمد على نص البرنامج بس', 0],
            ['بيطلع في الـ symbol-table stack وقت التشغيل', 1],
            ['بتستخدمه Java وC', 0],
            ['بتستخدمه Lisp وSNOBOL وPerl', 1],
            ['بيتحدد وقت الـ compile', 0],
            ['مينفعش يتحدد وقت الـ compile', 1],
            ['معظم اللغات بتستخدمه', 0]
          ] : [
            ['Follows the braces (the structure of the syntax tree)', 0],
            ['Uses the declaration most recently met while running', 1],
            ['Depends only on the program text', 0],
            ['Walks up the symbol-table stack at run time', 1],
            ['Used by Java and C', 0],
            ['Used by Lisp, SNOBOL and Perl', 1],
            ['Resolved at compile time', 0],
            ['Cannot be resolved at compile time', 1],
            ['Used by most languages', 0]
          ]} />
        `),

        // 9 · the lecture's example
        page(html`
          <${H1}>${t("Run the lecture's program", 'شغّل برنامج المحاضرة')}</${H1}>
          <${Code} lines=${LEC} />
          <${UL} items=${A ? [
            'جوه الـ block الـ x اللي جوه بيخبّي اللي برّه، والـ <code>(int)</code> بتقطع الـ <code>3.14159…</code> لـ 3، فالـ y بقت 5 <b>في الاتنين</b>.',
            'في الـ <b>static</b> بعد قوس القفل الـ x اللي برّه بيرجع:<span class="ltr">y = 5 + 1 = 6</span>',
            'في الـ <b>dynamic</b> (اتفاقية الكورس) آخر declaration اتنفّذ هو الـ x اللي جوه، وبيفضل مستخدم بعد الـ block:<span class="ltr">y = 5 + 3 = 8</span>'
          ] : [
            'Inside the block the inner x hides the outer one; <code>(int)</code> cuts <code>3.14159…</code> to 3, so y = 5 <b>in both</b>.',
            '<b>Static</b>: after the closing brace the outer x is back, so y = 5 + 1 = <b>6</b>.',
            '<b>Dynamic</b> (course convention): the most recently executed declaration, the inner x, is still used after the block, so y = 5 + 3 = <b>8</b>.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The revision sheet version uses <code>int x = 3</code> inside and prints y after each <code>+=</code>: static prints <b>5, 6</b>; dynamic prints <b>5, 8</b>.', 'نسخة الـ revision sheet فيها <code>int x = 3</code> جوه وبتطبع الـ y بعد كل <code>+=</code>. والـ output في الـ static وبعده الـ dynamic:<span class="ltr"><b>5, 6</b>  |  <b>5, 8</b></span>')}</p></${Box}>
        `, { sec: t('Run the programs', 'شغّل البرامج') }),

        // 10 · figure
        page(html`
          <${H2}>${t("Step through the course's programs", 'امشي في برامج الكورس خطوة خطوة')}</${H2}>
          <${Fig} name="cc-scope-run" />
        `),

        // 11 · which x? (own exercise)
        page(html`
          <${Box} kind="pencil" title=${t('Which x does this refer to?', 'ده أنهي x؟')}><p className="hf-p small">${X('For each use, pick the declaration it is bound to, <b>A</b> or <b>B</b>, under each rule (dynamic: the course convention). Then pick what <code>cout</code> prints.', 'لكل استخدام، اختار هو مربوط بأنهي declaration، الـ <b>A</b> ولا الـ <b>B</b>، في كل قاعدة (الـ dynamic باتفاقية الكورس). وبعدين اختار الـ <code>cout</code> هيطبع إيه.')}</p></${Box}>
          <${Code} lines=${[['{ int x = 5; int y = 0;', 'A'], ['  y += x;', t('use 1', 'استخدام 1')], ['  { int x = 2;', 'B'], ['    y += x; }', t('use 2', 'استخدام 2')], ['  y += x;', t('use 3', 'استخدام 3')], '  cout << y; }']} />
          <${WhichX} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 12 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['مش الـ x اللي جوه المفروض يموت عند قوس القفل؟', 'في الـ <b>static</b> أيوه، والـ x اللي برّه بيرجع. في تمارين الـ <b>dynamic</b> اتفاقية الكورس إن آخر declaration اتنفّذ (اللي جوه) بيفضل مستخدم بعد الـ block. جاوب الامتحان كده.'],
            ['الاتنين بيتفقوا إمتى؟', 'جوه الـ block الداخلي الاتنين بيستخدموا الـ x اللي جوه، فأول output واحد في الاتنين. الفرق بيبان <b>بعد</b> الـ block بس.'],
            ['ليه الـ dynamic مينفعش يتحدد وقت الـ compile؟', 'لأنه معتمد على <b>التنفيذ</b>: مين اتنفّذ آخر حاجة. والـ compiler شايف نص البرنامج بس.'],
            ['هي Perl كلها dynamic؟', 'السلايدز بتقول Perl <b>من خلال keywords معينة</b>. والـ dynamic في Lisp وSNOBOL كمان.']
          ] : [
            ["Doesn't the inner x die at its closing brace?", 'With <b>static</b> binding, yes: the outer x comes back. For <b>dynamic</b> binding in these exercises, the course\'s convention is that the most recently executed declaration (the inner one) is still used after the block. Answer the exam that way.'],
            ['When do the two rules agree?', 'Inside the inner block both use the inner x, so the first output is the same in both. They only differ <b>after</b> the block.'],
            ["Why can't dynamic binding be resolved at compile time?", 'It depends on the <b>execution</b>: which declaration ran last. The compiler only sees the program text.'],
            ['Is all of Perl dynamic?', 'The slides say Perl <b>through certain keywords</b>. Lisp and SNOBOL are the other dynamic examples.']
          ]} />
        `),

        // 13 · an exam program
        page(html`
          <${Box} kind="exam" title=${t('Your turn, exam style', 'دورك، بطريقة الامتحان')}><p className="hf-p small">${X('Trace it line by line in both columns before you tap. Inner block first, then after the brace.', 'تتبّعه سطر سطر في العمودين قبل ما تدوس. الـ block الداخلي الأول، وبعدين اللي بعد القوس.')}</p></${Box}>
          ${mq('m-iw', /prints, for static and dynamic binding/i)}
          <${Grow} />
          <${Hand}>${t('inside the block both rules use the inner i, so the first number is the same in both', 'جوه الـ block القاعدتين بيستخدموا الـ i اللي جوه، فأول رقم واحد في الاتنين')}</${Hand}>
        `),

        // 14 · symbol tables
        page(html`
          <${H1}>${t('Meet the bookkeeper: the symbol table', 'اتعرّف على الدفتر: الـ symbol table')}</${H1}>
          <${Def}>${X('A <b>symbol table</b> is a data structure in a compiler/interpreter where each identifier is associated with information about its declaration or appearance: its <b>type</b>, its <b>scope level</b> and sometimes its <b>location</b>.',
            'الـ <b>symbol table</b> دي data structure جوه الـ compiler أو الـ interpreter، كل identifier فيها مربوط بمعلومات عن الـ declaration أو الظهور بتاعه: الـ <b>type</b> والـ <b>scope level</b> وأحيانًا الـ <b>location</b>.')}</${Def}>
          <${Talk} who="table">${X('Every time the compiler meets a name, it asks me. And every scope is a chapter in my book.', 'كل ما الـ compiler يقابل اسم بيسألني. وكل scope ده فصل في الدفتر بتاعي.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"The data structure responsible for managing information about variables and their attributes": the <b>symbol table</b>, not the semantic stack, the parser table or the AST.', 'الـ data structure المسؤولة عن معلومات الـ variables والـ attributes بتاعتها هي الـ <b>symbol table</b>، مش الـ semantic stack ولا الـ parser table ولا الـ AST.')}</p></${Box}>
        `, { sec: t('Symbol tables', 'الـ Symbol tables') }),

        // 15 · operations
        page(html`
          <${H2}>${t('What you can ask a symbol table', 'تقدر تطلب إيه من الـ symbol table')}</${H2}>
          <${P} small=${true}>${t('The slides list the operations at two levels:', 'السلايدز بتقسّم العمليات لمستويين:')}</${P}>
          <div className="hf-c8-ops hf-in">
            <div><h5>High level</h5>${['enter scope', 'process a declaration', 'process a use', 'exit scope'].map((x, i) => html`<p key=${i}>${x}</p>`)}</div>
            <div className="lo"><h5>Low level</h5>${['enter_scope()', 'insert_symbol(x)', 'local_lookup(x)', 'look_up(x)', 'exit_scope()'].map((x, i) => html`<p key=${i} dir="ltr"><code>${x}</code></p>`)}</div>
          </div>
          <${UL} items=${A ? [
            'الـ <code>enter_scope()</code> بتبدأ scope جديد nested، والـ <code>exit_scope()</code> بتخرج من الـ scope الحالي.',
            'الـ <code>insert_symbol(x)</code> بتضيف الـ symbol ده للـ table.',
            'الـ <code>local_lookup(x)</code> بتسأل: الـ x ده في الـ scope <b>المحلي</b>؟',
            'الـ <code>look_up(x)</code> بتلاقي الـ x <b>الحالي</b> بالـ scoping rules.'
          ] : [
            '<code>enter_scope()</code> starts a new nested scope; <code>exit_scope()</code> exits the current scope.',
            '<code>insert_symbol(x)</code> adds symbol x to the table.',
            '<code>local_lookup(x)</code> asks: is x in the <b>local</b> scope?',
            '<code>look_up(x)</code> finds the <b>current</b> x via the scoping rules.'
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('local_lookup = this scope only · look_up = follow the scoping rules outward', 'الـ local_lookup للـ scope ده بس، والـ look_up بيمشي بالـ scoping rules لبرّه')}</${Hand}>
        `),

        // 16 · figure
        page(html`
          <${H2}>${t('The operations at work', 'العمليات وهي شغالة')}</${H2}>
          <${Fig} name="cc-symtab-ops" />
        `),

        // 17 · match
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Match each low-level operation to its job. Tap an operation, then tap its job.', 'وصّل كل low-level operation بشغلانتها. دوس على الـ operation، وبعدين على الشغلانة.')}</${P}>
          <${Match} id="ops" left=${['<code>enter_scope()</code>', '<code>insert_symbol(x)</code>', '<code>local_lookup(x)</code>', '<code>look_up(x)</code>', '<code>exit_scope()</code>']}
            right=${A ? ['بتلاقي الـ x الحالي بالـ scoping rules', 'بتبدأ scope جديد nested', 'بتخرج من الـ scope الحالي', 'بتسأل: الـ x في الـ scope المحلي؟', 'بتضيف الـ symbol للـ table']
              : ['Finds the current x via the scoping rules', 'Starts a new nested scope', 'Exits the current scope', 'Is x in the local scope?', 'Adds symbol x to the table']}
            answer=${[1, 4, 3, 0, 2]} />
          <${Grow} />
          <${Hand}>${t('hint: a declaration is a local_lookup then an insert_symbol (see the figure)', 'تلميح: الـ declaration بيبقى local_lookup وبعده insert_symbol (بص على الرسمة)')}</${Hand}>
        `),

        // 18 · interview
        page(html`
          <${Interview} title=${t('Symbol Table, part two', 'الـ Symbol Table، الجزء التاني')} sub=${t('Back by popular demand. This time we ask about scopes.', 'رجع بناءً على طلب الجماهير. المرة دي بنسأله عن الـ scopes.')} lines=${A ? [
            ['المذيع', 'إيه اللي بيحصل لما الـ compiler يشوف <code>{</code>؟'],
            ['الـ Symbol Table', 'ده <b>enter scope</b>. الـ <code>enter_scope()</code> بتفتح scope جديد nested فوق اللي قبله.'],
            ['المذيع', 'وتعريف <code>int x</code> جوّاه؟'],
            ['الـ Symbol Table', 'بعمل <code>local_lookup(x)</code> في الـ scope المحلي بس. الـ x اللي برّه مش بيتحسب، فبضيف الجديد بـ <code>insert_symbol(x)</code>.'],
            ['المذيع', 'ولما حد يستخدم الـ x؟'],
            ['الـ Symbol Table', 'الـ <code>look_up(x)</code> بتلاقي الـ x الحالي بالـ scoping rules: الأقرب الأول.'],
            ['المذيع', 'وعند <code>}</code>؟'],
            ['الـ Symbol Table', 'الـ <code>exit_scope()</code>، والـ names بتوعه مبقوش visible.']
          ] : [
            ['Head First', 'What happens when the compiler sees <code>{</code>?'],
            ['Symbol Table', 'That\'s <b>enter scope</b>. <code>enter_scope()</code> opens a new nested scope on top of the last one.'],
            ['Head First', 'And a declaration <code>int x</code> inside it?'],
            ['Symbol Table', 'I run <code>local_lookup(x)</code> on the local scope only. The outer x doesn\'t count, so the new one goes in with <code>insert_symbol(x)</code>.'],
            ['Head First', 'And when somebody uses x?'],
            ['Symbol Table', '<code>look_up(x)</code> finds the current x via the scoping rules: nearest scope first.'],
            ['Head First', 'And at <code>}</code>?'],
            ['Symbol Table', '<code>exit_scope()</code>. Its names are no longer visible.']
          ]} />
          <${Grow} />
          <${Talk} who="table" flip=${true}>${X('Open, insert, look up, close. That\'s my whole day.', 'افتح، ضيف، دوّر، اقفل. ده يومي كله.')}</${Talk}>
        `),

        // 19 · implementation
        page(html`
          <${H1}>${t('How to build one', 'تبنيه إزاي')}</${H1}>
          <${P} small=${true}>${t('Four implementation techniques on the slides:', 'أربع طرق تنفيذ في السلايدز:')}</${P}>
          <${UL} items=${A ? ['الـ <b>unordered list</b>', 'الـ <b>ordered list</b>', 'الـ <b>binary search trees</b>', 'الـ <b>hash tables</b>: <b>الأشهر</b>'] : ['<b>Unordered list</b>', '<b>Ordered list</b>', '<b>Binary search trees</b>', '<b>Hash tables</b>: the <b>most common</b>']} />
          <${P} small=${true}>${t('And two approaches to scopes:', 'واتنين approaches للـ scopes:')}</${P}>
          <${UL} items=${A ? ['<b>symbol table لكل scope</b>', '<b>symbol table واحدة لكل الـ scopes</b>'] : ['<b>One symbol table per scope</b>', '<b>One symbol table for all scopes</b>']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"There is only one approach to implement symbol tables": <b>False</b>. There are two approaches (and four mechanisms).', 'الجملة دي <b>غلط</b>، فيه اتنين approaches (وأربع طرق تنفيذ):<span class="ltr">"There is only one approach to implement symbol tables"</span>')}</p></${Box}>
        `, { sec: t('Implementations', 'طرق التنفيذ') }),

        // 20 · figure
        page(html`
          <${H2}>${t('Race the four look-ups', 'سابق الأربع look-ups')}</${H2}>
          <${Fig} name="cc-symtab-impl" />
        `),

        // 21 · one table per scope
        page(html`
          <${H1}>${t('One table per scope', 'table لكل scope')}</${H1}>
          <${P} small=${true}>${t("The slides' walkthrough. Each block gets its own table with the columns Symb, Token, Dtype, Init?.", 'شرح السلايدز. كل block بياخد table لوحده بالأعمدة Symb و Token و Dtype و Init?.')}</${P}>
          <${Code} lines=${[['{ int a, b, c;', 'Block 1'], '  a = 0; b = 0; c = 0;', ['  { int c, d;', 'Block 2'], '    c = a + 1;', '    d = c; }', ['  { string a; int c;', 'Block 3'], '    print c; }', '  print d', '}']} />
          <${UL} items=${A ? [
            'ندخل الـ block فنعمل table جديدة: <b>ST1</b> وبعدها <b>ST2</b> و<b>ST3</b>.',
            'كل declaration بيتضاف للـ table الحالية والـ Init? بتاعه No، وكل assignment بيعلّمه initiated.',
            'في <bdi dir="ltr">c = a + 1</bdi> الـ a مش في ST2، فبندوّر في الـ <b>parent</b> اللي هي ST1: لقيناه وهو initiated.',
            'آخر <code>print d</code> برّه block 2، فالـ d <b>مش visible</b> (out-of-scope access).'
          ] : [
            'Entering a block creates a new table: <b>ST1</b>, then <b>ST2</b> and <b>ST3</b>.',
            'Each declaration is added to the current table with Init? = No; each assignment marks it initiated.',
            '<code>c = a + 1</code>: a is not in ST2, so look in the <b>parent</b> ST1: found and initiated.',
            'The final <code>print d</code> is outside block 2, so d is <b>not visible</b> (an out-of-scope access).'
          ]} />
        `, { sec: t('One table per scope', 'table لكل scope') }),

        // 22 · figure (tall: own page)
        page(html`
          <${Fig} name="cc-st-per-scope" />
        `),

        // 23 · sort: where is it found?
        page(html`
          <${Box} kind="pencil" title=${t('Where is it found?', 'بيتلاقي فين؟')}><p className="hf-p small">${X("Same program. For each name, tap the table where the lookup finds it, or <b>✗</b> if it is not visible. Search the current table first, then its parent.", 'نفس البرنامج. لكل اسم، دوس على الـ table اللي الـ lookup بيلاقيه فيها، أو <b>✗</b> لو مش visible. دوّر في الـ table الحالية الأول، وبعدين الـ parent.')}</p></${Box}>
          <${Sort} id="st" bins=${[['ST1', 'ST1'], ['ST2', 'ST2'], ['ST3', 'ST3'], ['✗', t('not visible', 'مش visible')]]} items=${A ? [
            ['الـ <code>a</code> في <code>a = 0</code>', 0],
            ['الـ <code>c</code> في <code>c = a + 1</code>', 1],
            ['الـ <code>a</code> في <code>c = a + 1</code>', 0],
            ['الـ <code>c</code> في <code>d = c</code>', 1],
            ['الـ <code>c</code> في <code>print c</code>', 2],
            ['الـ <code>d</code> في <code>print d</code>', 3]
          ] : [
            ['<code>a</code> in <code>a = 0</code>', 0],
            ['<code>c</code> in <code>c = a + 1</code>', 1],
            ['<code>a</code> in <code>c = a + 1</code>', 0],
            ['<code>c</code> in <code>d = c</code>', 1],
            ['<code>c</code> in <code>print c</code>', 2],
            ['<code>d</code> in <code>print d</code>', 3]
          ]} />
          <${Grow} />
          <${Hand}>${t("hint: a closed table is nobody's parent", 'تلميح: الـ table اللي اتقفلت مبقتش parent لحد')}</${Hand}>
        `),

        // 24 · the problem
        page(html`
          <${H1}>${t("What's wrong with a table per scope?", 'إيه مشكلة الـ table لكل scope؟')}</${H1}>
          <${UL} items=${A ? [
            'كل hash table ليها <b>memory overhead</b>، فـ table لكل scope <b>مش موفّرة في الـ memory</b>.',
            'وممكن نحتاج <b>ندوّر في كذا table</b>، وده أبطأ.'
          ] : [
            'Each hash table has <b>memory overhead</b>, so a table per scope is <b>memory inefficient</b>.',
            'We may also need to <b>search several tables</b>, which is slower.'
          ]} />
          <${Def}>${X('<b>Solution</b>: a <b>single hash table for all scopes</b>. Less memory overhead, and only one search.', 'الـ <b>حل</b>: <b>hash table واحدة لكل الـ scopes</b>. memory overhead أقل، وبحث واحد بس.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Memory overhead is the problem of one table <b>per scope</b>. The single table is the <b>solution</b>, not the problem.', 'الـ memory overhead مشكلة الـ table <b>لكل scope</b>. الـ table الواحدة هي <b>الحل</b>، مش المشكلة.')}</p></${Box}>
        `, { sec: t('One table for all scopes', 'table واحدة لكل الـ scopes') }),

        // 25 · figure
        page(html`
          <${H2}>${t('Count the slots and the searches', 'عِد الـ slots وعدد مرات البحث')}</${H2}>
          <${Fig} name="cc-st-one-vs-all" />
        `),

        // 26 · solution 1
        page(html`
          <${H2}>${t('Solution 1: put the scope in the key', 'الحل الأول: حط الـ scope في الـ key')}</${H2}>
          <${UL} items=${A ? [
            'كل scope بياخد رقم unique: الـ global بياخد صفر، وبنزوّد واحد مع كل scope جديد.',
            'الـ identifier بيدخل الـ table بالـ key ده:<span class="ltr">"identifier,scope_id"</span>',
            'عشان ندوّر، بنلزّق الـ scope_id الحالي في الـ identifier.'
          ] : [
            'Give each scope a unique number: global <code>scope_id = 0</code>, and increment it for each new scope.',
            'Enter an identifier with the key <code>"identifier,scope_id"</code>.',
            'To look up, append the current scope_id to the identifier.'
          ]} />
          <${P} small=${true}>${X('For <code>int x=1; int y=2; { int x=3; y += x; }</code>, inside the block:', 'للبرنامج ده، وإحنا جوه الـ block:<span class="ltr"><code>int x=1; int y=2; { int x=3; y += x; }</code></span>')}</${P}>
          <div className="hf-c8-keys hf-in" dir="ltr"><code>"x,0"</code><code>"y,0"</code><code className="hit">"x,1"</code><code className="miss">"y,1"</code><code className="hit">"y,0"</code></div>
          <${P} small=${true}>${X('x is found as "x,1" at once. y is not under "y,1", so we retry with the enclosing scope, "y,0": <b>two searches</b>.', 'الـ x بيتلاقي على طول كـ <bdi dir="ltr">"x,1"</bdi>. أما الـ y مش موجود كـ <bdi dir="ltr">"y,1"</bdi>، فبنجرّب الـ scope اللي برّه <bdi dir="ltr">"y,0"</bdi>، يعني <b>بحثين</b>.')}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${t('Solution 1 may still need multiple searches!', 'الحل الأول لسه ممكن يحتاج كذا بحث!')}</${Hand}>
        `, { sec: t('Solutions 1 and 2', 'الحل الأول والتاني') }),

        // 27 · figure
        page(html`
          <${H2}>${t('Solution 1, search by search', 'الحل الأول، بحث ورا بحث')}</${H2}>
          <${Fig} name="cc-st-sol1" />
        `),

        // 28 · solution 2
        page(html`
          <${H2}>${t('Solution 2: a list per name, newest in front', 'الحل التاني: list لكل اسم، والأحدث في الأول')}</${H2}>
          <${UL} items=${A ? [
            'الـ key هو الـ identifier بس، والـ value هي <b>linked list</b> من pointers لـ records، record لكل declaration.',
            'في الـ <b>single-pass compiler</b> كل insertion جديد بيتحط في <b>أول</b> الـ list.',
            'فيه structure منفصلة بتتابع الـ identifiers المعرّفة في الـ scope الحالي، عشان نمسحهم لما نخرج منه.'
          ] : [
            'Key = the identifier; value = a <b>linked list</b> of pointers to records, one per declaration.',
            'In a <b>single-pass compiler</b> each new insertion goes at the <b>front</b> of the list.',
            'A separate structure tracks the identifiers defined in the current scope, to delete them on scope exit.'
          ]} />
          <${P} small=${true}>${X('For <code>int x=1; int y=2; { int x=3; … }</code>, inside the block:', 'للبرنامج ده، وإحنا جوه الـ block:<span class="ltr"><code>int x=1; int y=2; { int x=3; … }</code></span>')}</${P}>
          <${Lists} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('All entries are in open scopes, so the <b>front item is always the right one</b> for the current scope. Is this structure time consuming?', 'كل الـ entries في scopes مفتوحة، فـ<b>أول item دايمًا هو الصح</b> للـ scope الحالي. يبقى الـ structure ده بياخد وقت؟')}</p></${Box}>
        `),

        // 29 · figure
        page(html`
          <${H2}>${t('Watch the front of the list', 'خلّي عينك على أول الـ list')}</${H2}>
          <${Fig} name="cc-st-sol2" />
        `),

        // 30 · dumb questions on the solutions
        page(html`
          <${Dumb} qa=${A ? [
            ['أنهي حل لسه ممكن يحتاج كذا بحث؟', 'الحل <b>الأول</b>: لو الـ x مش موجود بالـ scope_id الحالي، بنعيد بالـ ids بتوع الـ scopes اللي برّه.'],
            ['والحل التاني بياخد وقت؟', '<b>لأ</b>. أول item في الـ list دايمًا هو الصح للـ scope الحالي. إجابة الـ revision sheet: <b>False</b>.'],
            ['بعد ما نخرج من الـ block، أول الـ list بيبقى إيه؟', 'الـ structure المنفصلة بتقول إن الـ scope ده عرّف x، فالـ record بتاع scope 1 بيتمسح، وأول الـ list يبقى الـ <b>record بتاع scope 0</b>.'],
            ['الـ x اللي برّه بيتمسح لما ندخل الـ block؟', '<b>لأ</b>. هو لسه في scope مفتوح، فبيفضل في الـ list ورا الجديد.']
          ] : [
            ['Which solution may still need several searches?', '<b>Solution 1</b>: if x is not under the current scope_id, the lookup is retried with the enclosing scopes\' ids.'],
            ['Is Solution 2 time consuming?', '<b>No</b>. The front item of the list is always the right one for the current scope. The revision sheet\'s key: <b>False</b>.'],
            ['After the block exits, what is at the front of the list?', 'The separate structure says that scope defined x, so the scope 1 record is deleted and the <b>scope 0 record</b> is at the front.'],
            ['Is the outer x deleted when we enter the block?', '<b>No</b>. It is still in an open scope, so it stays in the list behind the new one.']
          ]} />
        `),

        // exam corner: the doctor's questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctor's papers and revision sheet. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكتورة والـ revision sheet. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /major problem when creating a symbol table per scope/i)}
          <${Grow} />
          <${Talk} who="table" flip=${true}>${t('One table per scope? Count my slots.', 'table لكل scope؟ عِد الـ slots بتاعتي.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-single', /single hash table as a symbol table/i)}
          ${mq('m2', /parsing tree, such as braces/i)}
        `),
        page(html`
          ${mq('m3', /responsible for managing information about variables/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('type, scope level, sometimes location: all kept in the symbol table', 'الـ type والـ scope level وأحيانًا الـ location: كلهم في الـ symbol table')}</${Hand}>
        `),
        page(html`
          ${mq('m4', /time consuming when an identifier returns/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('the front item is always the right one', 'أول item دايمًا هو الصح')}</${Hand}>
        `),
        page(html`
          ${mq('m5', /LAST print show with dynamic/i)}
          <${Grow} />
          <${Hand}>${t('trace both prints: the one inside the block, then the one after it', 'تتبّع الـ print الاتنين: اللي جوه الـ block واللي بعده')}</${Hand}>
        `),
        page(html`
          <${P} small=${true}>${X('This one says "same code": it means the exam program from the scoping pages,', 'السؤال ده بيقول "same code"، وقصده برنامج الامتحان اللي في صفحات الـ scoping:')}</${P}>
          <${Code} lines=${['{ int i=10, w=20;', '  { int i=3; w+=i; cout<<w; }', '  w+=i; cout<<w; }']} />
          ${mq('m6', /the list for i is/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('newest declaration in front: scope 1 before scope 0', 'أحدث declaration في الأول: scope 1 قبل scope 0')}</${Hand}>
        `),

        // 34 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>binding</b> بيربط الـ declaration بالـ uses، والـ <b>scope</b> هو مكان الـ identifier المتاح.',
            'الـ <b>static</b> معتمد على الأقواس ونص البرنامج وبيتحدد وقت الـ compile، وبتستخدمه Java وC ومعظم اللغات.',
            'الـ <b>dynamic</b> بياخد آخر declaration اتقابل وقت التنفيذ ومينفعش يتحدد وقت الـ compile، وبتستخدمه Lisp وSNOBOL وPerl.',
            'مثال المحاضرة: الـ y النهائي <b>6</b> في الـ static و<b>8</b> في الـ dynamic (اتفاقية الكورس).',
            'الـ symbol table بتشيل الـ type والـ scope level وأحيانًا الـ location لكل identifier.',
            'العمليات: <code>enter_scope</code> و<code>insert_symbol</code> و<code>local_lookup</code> و<code>look_up</code> و<code>exit_scope</code>.',
            'الـ hash table هي الأشهر. الـ table لكل scope مشكلتها الـ <b>memory overhead</b>، والحل table واحدة.',
            'الحل الأول key فيه الـ scope_id (ممكن كذا بحث)، والتاني linked list والأحدث في الأول.'
          ] : [
            '<b>Binding</b> connects a declaration and its uses; <b>scope</b> is where an identifier is accessible.',
            '<b>Static</b>: follows the braces and the program text, resolved at compile time (Java, C, most languages).',
            '<b>Dynamic</b>: the declaration most recently met during execution; cannot be resolved at compile time (Lisp, SNOBOL, Perl).',
            'Lecture example: final y = <b>6</b> static, <b>8</b> dynamic (course convention).',
            'A symbol table keeps each identifier\'s type, scope level and sometimes location.',
            'Operations: <code>enter_scope()</code>, <code>insert_symbol(x)</code>, <code>local_lookup(x)</code>, <code>look_up(x)</code>, <code>exit_scope()</code>.',
            'Hash tables are the most common. A table per scope costs <b>memory overhead</b>; the fix is one table.',
            'Solution 1: key "identifier,scope_id" (may need several searches). Solution 2: linked list, newest in front.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 35 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 8!', 'خلّصت الفصل التامن!')}</${H1}>
            <${Talk} who="table">${t('Next time: what happens when the program actually runs. The runtime environment!', 'المرة الجاية: إيه اللي بيحصل لما البرنامج يشتغل بجد. الـ runtime environment!')}</${Talk}>
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

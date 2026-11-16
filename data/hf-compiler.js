// Head First chapters for Compiler Design (built on hf.js), in English and Egyptian Arabic (same pages, so the place you stopped
// and your exercise answers carry over when you switch). Every fact comes from the lecture's slides as the site's notes give them;
// analogies and jokes are marked as ours where they could be mistaken for slide content. ‡ marks a slide error the notes also flag.
// Arabic follows the site's rules: Egyptian colloquial, English technical terms, code in <code>, chains in <span class="ltr">,
// short English pieces with symbols in <bdi dir="ltr">.
// lectures: [1]
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K;
  const { useState, useEffect } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  // the compiler as a translator: human-friendly code goes in, machine language comes out
  function Machine() {
    const ar = useAr();
    const src = ['x = 4 + 2;', 'if (x > 0)', '  y = x;', 'print(y);'];
    const bin = ['10110000', '01100001', '00000100', '10001001', '11101011', '00110001'];
    const twice = a => a.concat(a);
    const gear = cls => html`<svg className=${'gear' + (cls ? ' ' + cls : '')} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>`;
    return html`<div className="hf-mach hf-in" dir="ltr" aria-label="High-level code goes into the compiler and machine language comes out">
      <div><div className="src"><div className=${calm() ? '' : 'feed'}>${twice(src).map((l, i) => html`<p key=${i}>${l}</p>`)}</div></div><p className="side">${ar ? 'للبني آدمين' : 'for humans'}</p></div>
      <div className="box">${gear()}${gear('b')}<b>Compiler</b></div>
      <div><div className="bin"><div className=${calm() ? '' : 'feed'} style=${{ animationDelay: '-1.3s' }}>${twice(bin).map((l, i) => html`<p key=${i}>${l}</p>`)}</div></div><p className="side">${ar ? 'للمكنة' : 'for machines'}</p></div>
    </div>`;
  }

  // one statement down the assembly line: what each phase hands to the next (the lecture's own example, slides 5–17)
  const STATIONS = [
    ['Source code', 'Source code', 'what you typed', 'اللي إنت كتبته'],
    ['Phase 1: scanner', 'Tokens', 'from phase 1, the scanner', 'من phase 1، الـ scanner'],
    ['Phase 2: parser', 'Syntax tree', 'from phase 2, the parser', 'من phase 2، الـ parser'],
    ['Phase 3: semantic analyzer', 'Annotated tree', 'from phase 3, the semantic analyzer', 'من phase 3، الـ semantic analyzer'],
    ['Phase 4: source code optimizer', 'Intermediate code', 'from phase 4, the source code optimizer', 'من phase 4، الـ source code optimizer'],
    ['Phase 5: code generator', 'Target code', 'from phase 5, the code generator', 'من phase 5، الـ code generator'],
    ['Phase 6: target code optimizer', 'Optimized target code', 'from phase 6, the target code optimizer', 'من phase 6، الـ target code optimizer']
  ];
  function Station({ i }) {
    const ar = useAr();
    if (i === 0) return html`<pre>a[index] = 4 + 2</pre>`;
    if (i === 1) return html`<div className="chips">${['a', '[', 'index', ']', '=', '4', '+', '2'].map((t, j) => html`<span key=${j} style=${{ animationDelay: calm() ? '0s' : j * 0.08 + 's' }}>${t}</span>`)}</div>`;
    if (i === 2) return html`<div className="tr">assign-expression<br/>├─ subscript-expression<br/>│   ├─ identifier <span className="k">a</span><br/>│   └─ identifier <span className="k">index</span><br/>└─ additive-expression<br/>    ├─ number <span className="k">4</span><br/>    └─ number <span className="k">2</span></div>`;
    if (i === 3) return html`<div className="tr">assign-expression<br/>├─ subscript-expr <i>integer</i><br/>│   ├─ <span className="k">a</span> <i>array of integer</i><br/>│   └─ <span className="k">index</span> <i>integer</i><br/>└─ additive-expr <i>integer</i><br/>    ├─ <span className="k">4</span> <i>integer</i><br/>    └─ <span className="k">2</span> <i>integer</i></div>`;
    if (i === 4) return html`<pre>t = 4 + 2${'\n'}a[index] = t</pre><p className="hf-hand" style=${{ fontSize: '19px' }}>${ar ? html`الـ constant folding: <bdi dir="ltr">4 + 2 → 6</bdi>` : 'constant folding: 4 + 2 → 6'}</p><pre>a[index] = 6</pre>`;
    if (i === 5) return html`<pre>${['MOV R0, index', 'MUL R0, 2', 'MOV R1, &a', 'ADD R1, R0', 'MOV *R1, 6'].join('\n')}</pre>`;
    return html`<pre>${['MOV R0, index', 'SHL R0', 'MOV &a[R0], 6'].join('\n')}</pre><p className="hf-hand" style=${{ fontSize: '19px' }}>${ar ? 'الضرب في 2 بقى shift (SHL)، والـ 5 سطور بقوا 3' : 'MUL by 2 became a shift (SHL), and 5 lines became 3'}</p>`;
  }
  function AssemblyLine() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('line', 0);
    const [play, setPlay] = useState(false);
    useEffect(() => { if (!play) return; if (i >= STATIONS.length - 1) { setPlay(false); return; } const t = setTimeout(() => setI(i + 1), 2200); return () => clearTimeout(t); }, [play, i]);
    const st = STATIONS[i], last = STATIONS.length - 1;
    return html`<div className="hf-line hf-in">
      <div className="stn" role="group" aria-label="Stations">${STATIONS.map((s, j) => html`<button key=${j} className=${j === i ? 'on' : j < i ? 'past' : ''} onClick=${() => { setPlay(false); setI(j); }} aria-pressed=${String(j === i)} aria-label=${s[0]} title=${s[0]}>${j === 0 ? '✎' : j}</button>`)}</div>
      <div className="out" key=${i}>
        <p className="lab"><b>${st[1]}</b> ${ar ? st[3] : st[2]}</p>
        <div className="hf-in"><${Station} i=${i} /></div>
      </div>
      <div className="hf-lbar">
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.max(0, i - 1)); }} disabled=${i === 0} aria-label=${ar ? 'المحطة اللي فاتت' : 'Back one station'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" onClick=${() => { if (i >= last) setI(0); setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= last ? (ar ? 'شغّلها تاني' : 'Run it again') : (ar ? 'شغّل' : 'Play')}</button>
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.min(last, i + 1)); }} disabled=${i === last} aria-label=${ar ? 'المحطة الجاية' : 'Next station'}>${ar ? '‹' : '›'}</button>
        <span className="grow"></span>
        <span className="hf-dots">${STATIONS.map((_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  // the chain of products, with the phase that makes each one
  function Chain() {
    const ar = useAr();
    const rows = [['Source code'], ['Tokens', '1 Scanner'], ['Syntax tree', '2 Parser'], ['Annotated tree', '3 Semantic analyzer'], ['Intermediate code', '4 Source code optimizer'], ['Target code', '5 Code generator'], ['(Optimized) target code', '6 Target code optimizer']];
    const d = j => ({ animationDelay: calm() ? '0s' : j * 0.14 + 's' });
    return html`<div className="hf-chain">${rows.map(([pr, ph], j) => html`<${React.Fragment} key=${j}>
      ${ph && html`<span className="ph hf-in" style=${d(j)}>${ar ? 'بيعمله ' : 'made by '}<b><bdi>${ph}</bdi></b></span>`}
      <span className="pr hf-in" style=${d(j)}><bdi>${pr}</bdi></span></${React.Fragment}>`)}</div>`;
  }

  H.chapters.compiler[1] = {
    title: 'Introduction to Compilers',
    kicker: 'Chapter 1',
    run: 'introduction to compilers',
    ar: { title: 'مقدمة عن الـ Compilers', kicker: 'الفصل 1', run: 'مقدمة عن الـ compilers' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Scan, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;        // a plain string in the book's language
      const X = (en, ar) => T(A ? ar : en);     // the same, as HTML
      // the doctor's own questions on this lecture, from the course data (past papers, the revision sheet, this year's midterm),
      // with the site's Egyptian Arabic explanations for each choice when the book is in Arabic
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[1] && window.AR.compiler.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · how to use this chapter (faces the opener in a spread)
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X(`We know what you're thinking: <i>"How can this be a serious compiler lecture?"</i> Your brain remembers what's surprising, visual and a bit emotional, so that's how this chapter is written. The facts are all from the doctor's slides.`,
            `عارفين إنت بتفكر في إيه: <i>"هي دي محاضرة compiler بجد؟"</i> مخك بيفتكر الحاجة اللي بتفاجئه، اللي فيها صور، واللي فيها شوية مشاعر، فالفصل مكتوب كده. بس كل المعلومات من سلايدز الدكتورة.`)}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" and "Who does what?" are not optional. You answer right on the page.', '<b>حل التمارين.</b> "امسك القلم" و"مين بيعمل إيه؟" مش اختياري. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, taken from the doctor's own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكتورة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake on the slides, and what was meant.', 'معناها فيه غلطة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات المكتوبة بخط الإيد واللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>Compiler Design` : html`Chapter one<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Lost in Translation', 'تايه في الترجمة')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('introduction to compilers', 'مقدمة عن الـ compilers')}</p></div>
          <${P}>${X("Here's a secret: <b>your computer has never read a single line of your code.</b> Not one. It only understands machine language.", 'هقولك سر: <b>الكمبيوتر عمره ما قرا سطر واحد من الكود بتاعك.</b> ولا سطر. هو فاهم الـ machine language بس.')}</${P}>
          <${Talk} who="dev">${X('But I wrote <code>a[index] = 4 + 2</code> and it worked!', 'بس أنا كاتب <code>a[index] = 4 + 2</code> واشتغل!')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('Somebody translated it for me. I only speak <b>0</b>s and <b>1</b>s.', 'حد ترجمهولي. أنا مبتكلمش غير <b>0</b> و<b>1</b>.')}</${Talk}>
          <${P}>${X("That somebody is the <b>compiler</b>. In this chapter you'll meet it, watch it argue with its rival, and follow one tiny statement through all <b>six phases</b>, from your editor all the way down to the machine.",
            'الحد ده هو الـ <b>compiler</b>. في الفصل ده هتتعرف عليه، وتتفرج عليه وهو بيتخانق مع منافسه، وتمشي ورا statement صغيرة في الـ <b>six phases</b> كلهم، من الـ editor بتاعك لحد المكنة.')}</${P}>
        `, { sec: t('Meet the compiler', 'اتعرّف على الـ compiler') }),

        // 2 · what is a compiler
        page(html`
          <${H1}>${A ? 'يعني إيه compiler أصلًا؟' : html`So what <i>is</i> a compiler?`}</${H1}>
          <${P}>${t('You write code that reads a bit like English. The machine needs instructions. Something sits in between:', 'إنت بتكتب كود شبه الإنجليزي، والمكنة عايزة instructions. وفي النص:')}</${P}>
          <${Machine} />
          <${Def}>${X('A <b>compiler</b> translates (compiles) a program written in a <b>high-level language</b> that suits human programmers into the <b>low-level machine language</b> that computers need.',
            'الـ <b>compiler</b> بيترجم برنامج مكتوب بلغة <b>high-level</b> تناسب المبرمجين لـ <b>low-level machine language</b> اللي الكمبيوتر محتاجها.')}</${Def}>
          <${Hand} arrow="up" red=${true}>${X("…and while it's at it, it tries to <b>spot and report obvious programmer mistakes.</b>", '…وكمان بيحاول <b>يمسك أخطاء المبرمج الواضحة.</b>')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X(`Exam question: <i>"Compiler translates the source code to…"</i> The doctor's key is <b>both machine code and binary code</b>: machine language <i>is</i> binary.`,
            'سؤال امتحان:<span class="ltr"><i>"Compiler translates the source code to…"</i></span>الإجابة <b><bdi dir="ltr">both machine code and binary code</bdi></b>، لأن الـ machine language هي نفسها binary.')}</p></${Box}>
        `),

        // 3 · the interpreter
        page(html`
          <${Box} kind="brain"><p className="hf-p">${t('When you run a Python file, you never see a compiled program appear. So who translated it for the computer?', 'لما بتشغّل ملف Python، عمرك ما بتشوف برنامج متعمله compile بيطلع. أمال مين اللي ترجمه للكمبيوتر؟')}</p></${Box}>
          <${H2}>${t('Meet the other translator: the interpreter', 'المترجم التاني: الـ interpreter')}</${H2}>
          <${Def}>${X('An <b>interpreter</b> is another way of implementing a programming language. Interpretation shares many aspects with compiling.', 'الـ <b>interpreter</b> طريقة تانية لتنفيذ لغة البرمجة. الـ interpretation فيها حاجات كتير شبه الـ compiling.')}</${Def}>
          <${P}>${X('The big difference: <b>how much they translate at once</b>.', 'الفرق الكبير: <b>بيترجموا قد إيه في المرة الواحدة</b>.')}</${P}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': a compiler translates the whole book before anyone reads it. An interpreter translates live, sentence by sentence.", 'تشبيه من عندنا، مش من السلايدز: الـ compiler بيترجم الكتاب كله قبل ما حد يقراه. الـ interpreter بيترجم لايف، جملة جملة.')}</${Hand}>
          <${Talk} who="interp" flip=${true}>${t("I'll take it from here, one statement at a time.", 'سيبهالي أنا، statement statement.')}</${Talk}>
        `, { sec: t('Compiler vs interpreter', 'الـ compiler والـ interpreter') }),

        // 4 · the slide's comparison as a visual
        page(html`
          <${H2}>${t('Watch them work', 'اتفرج عليهم وهم شغالين')}</${H2}>
          <${Fig} name="cc-comp-vs-interp" />
        `),

        // 5–6 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: a Compiler and an Interpreter argue about who's the better translator.", 'قعدة الليلة: Compiler وInterpreter بيتخانقوا مين فيهم المترجم الأحسن.')} />
          <${Chat} names=${[t('Compiler', 'الـ Compiler'), t('Interpreter', 'الـ Interpreter')]} lines=${A ? [
            [0, 'أنا بحب أشوف <b>الصورة كاملة</b>. بعمل scan لـ <b>البرنامج كله</b> وبترجمه مرة واحدة لـ machine code.'],
            [1, 'البرنامج كله؟ ده استنا كتير أوي. أنا بترجم <b>statement واحدة في المرة</b>.'],
            [0, 'ماشي، أنا باخد <b>وقت كبير في الـ analysis</b> للـ source code. بس لما أخلّص، الـ <b>execution بيبقى أسرع</b>.'],
            [1, 'أنا باخد <b>وقت أقل في الـ analysis</b>. هعترف، الـ <b>execution معايا أبطأ</b>.'],
            [0, 'وأنا كمان بسيب حاجة مفيدة وراي: <b>intermediate object code</b>.']
          ] : [
            [0, "I like to see the <b>whole picture</b>. I scan your <b>entire program</b> and translate it as a whole into machine code."],
            [1, "Whole programs? Way too much waiting. I translate <b>one statement at a time</b>."],
            [0, "Fine, I take a <b>large amount of time to analyze</b> the source code. But once I'm done, the overall <b>execution is faster</b>."],
            [1, "I take <b>less time to analyze</b>. I'll admit it, overall <b>execution is slower</b> with me."],
            [0, "I also leave something useful behind: <b>intermediate object code</b>."]
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Compiler', 'الـ Compiler'), t('Interpreter', 'الـ Interpreter')]} start=${1} lines=${A ? [
            [1, 'حاجة <b>محتاجة linking</b> بعد كده، وعشان كده إنت <b>محتاج memory أكتر</b>.'],
            [1, 'أنا <b>مبطلّعش intermediate object code</b>، فأنا <b>موفّر في الـ memory</b>.'],
            [0, 'memory إيه بس. <b>C و<bdi dir="ltr">C++</bdi> وJava</b> كلهم بيستخدموني.'],
            [1, 'و<b>JavaScript وPython وRuby</b> بيستخدموني أنا.'],
            [1, 'إحنا شبه بعض في حاجات كتير أصلًا. نفس الشغلانة، بس كل واحد وطريقته.']
          ] : [
            [1, "Something that then <b>needs linking</b>, and that's why you <b>need more memory</b>."],
            [1, "I generate <b>no intermediate object code</b>, so I'm <b>memory efficient</b>."],
            [0, "Memory, shmemory. <b>C, C++ and Java</b> all use me."],
            [1, "And <b>JavaScript, Python and Ruby</b> use me."],
            [0, "We'll have to agree to disagree."],
            [1, "We share many aspects anyway. Same job, different style."]
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Interpreters take long time to execute source code": <b>True</b> (execution is slower).<br/>"Compilers take long time to execute source code": <b>False</b>. A compiler takes long to <b>analyze</b>; its execution is <b>faster</b>.',
            'دي <b>صح</b> (الـ execution أبطأ):<span class="ltr">"Interpreters take long time to execute source code"</span>ودي <b>غلط</b> (البطء في الـ <b>analysis</b> بس):<span class="ltr">"Compilers take long time to execute source code"</span>')}</p></${Box}>
        `),

        // 7 · sharpen your pencil
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Who says it? Tap <b>C</b> for Compiler or <b>I</b> for Interpreter, then check.', 'مين اللي بيقول كده؟ دوس <b>C</b> للـ Compiler أو <b>I</b> للـ Interpreter، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="ci" bins=${[['C', 'Compiler'], ['I', 'Interpreter']]} items=${A ? [
            ['بيترجم statement واحدة في المرة', 1],
            ['بيعمل scan للبرنامج كله الأول', 0],
            ['بيطلّع intermediate object code', 0],
            ['موفّر في الـ memory', 1],
            ['الـ execution بتاعه أسرع', 0],
            ['بياخد وقت أقل في الـ analysis', 1],
            ['الناتج بتاعه محتاج linking', 0],
            ['بتستخدمه Python وRuby', 1],
            ['بتستخدمه C و<bdi dir="ltr">C++</bdi>', 0]
          ] : [
            ['Translates one statement at a time', 1],
            ['Scans the entire program first', 0],
            ['Generates intermediate object code', 0],
            ['Memory efficient', 1],
            ['Overall execution is faster', 0],
            ['Less time to analyze the source code', 1],
            ['Its output needs linking', 0],
            ['Used by Python and Ruby', 1],
            ['Used by C and C++', 0]
          ]} />
        `),

        // 8 · no dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['لو الـ compiler بياخد وقت طويل كده، إزاي هو الـ "أسرع"؟', 'دول وقتين مختلفين. بياخد <b>وقت طويل في الـ analysis</b> مرة واحدة، وبعدها البرنامج <b>بيتنفّذ أسرع</b>. الـ interpreter بيبدأ بسرعة بس بيشتغل أبطأ.'],
            ['هي Java بتتعمل compile ولا interpret؟', 'في السلايدز بتاعتنا Java مكتوبة مع <b>C و<bdi dir="ltr">C++</bdi> تحت الـ compilers</b>. جاوب في الامتحان زي السلايدز.'],
            ['الـ compiler هيمسك كل أخطائي؟', 'الأخطاء <b>الواضحة</b> بس. إجابة الدكتورة إن الـ compiler بيبيّن الـ <b>syntax</b> errors، وده <b>غلط</b>:<span class="ltr">"Indicates the syntax and runtime errors"</span>'],
            ['طب لو كتبت * وأنا قصدي /؟', 'ده لسه كود سليم، فمحدش هيمسكه. إجابة الميدترم: <b>none of the mentioned</b>.']
          ] : [
            ['If a compiler takes so long, why is it the "faster" one?', 'Two different times. It spends a <b>long time analyzing</b> the program once, and then the program <b>executes faster</b>. The interpreter is quick to start but slower to run.'],
            ['Is Java compiled or interpreted?', 'On our slides Java is listed with <b>C and C++ under compilers</b>. Answer the exam by the slides.'],
            ['Will the compiler catch all my mistakes?', 'Only the <b>obvious</b> ones. The doctor\'s key: a compiler indicates <b>syntax</b> errors. "Indicates the syntax and runtime errors" is <b>False</b>.'],
            ['And if I typed * where I meant /?', 'That\'s still valid code, so nothing catches it. The midterm\'s answer: <b>none of the mentioned</b>.']
          ]} />
        `),

        // 9 · inside the compiler
        page(html`
          <${H1}>${t('Inside the compiler: an assembly line', 'جوّه الـ compiler: خط إنتاج')}</${H1}>
          <${P} small=${true}>${X('Not one giant step: <b>six phases</b>, each passing its product to the next.', 'مش خطوة واحدة كبيرة، دي <b>six phases</b>، كل واحدة بتسلّم الناتج بتاعها للي بعدها.')}</${P}>
          <${Chain} />
          <${Hand} tilt=${true}>${A ? html`حيلة للحفظ (من عندنا): <bdi dir="ltr"><b>S</b>ix <b>P</b>andas <b>S</b>it <b>S</b>ilently <b>C</b>ooking <b>T</b>ea</bdi>` : html`Memory trick (ours): <b>S</b>ix <b>P</b>andas <b>S</b>it <b>S</b>ilently <b>C</b>ooking <b>T</b>ea`}</${Hand}>
        `, { sec: t('The six phases', 'الـ six phases') }),

        // 10 · the slide's figure
        page(html`
          <${H2}>${t('The figure to draw in the exam', 'الرسمة اللي هترسمها في الامتحان')}</${H2}>
          <${Fig} name="cc-phases" />
        `),

        // 11 · not a phase
        page(html`
          <${Box} kind="watch"><p className="hf-p">${X('All six phases talk to three helpers: the <b>literal table</b>, the <b>symbol table</b> and the <b>error handler</b>. They are data structures and helpers, <b>not phases</b>.',
            'الـ six phases كلهم بيتعاملوا مع تلات helpers: الـ <b>literal table</b> والـ <b>symbol table</b> والـ <b>error handler</b>. دول data structures وأدوات مساعدة، <b>مش phases</b>.')}</p>
            <p className="hf-p small" style=${{ marginTop: '5px' }}>${X('And <b>"testing"</b> is not a phase either. The exams love both.', 'والـ <b>"testing"</b> برضه مش phase. الامتحانات بتحب الاتنين دول.')}</p></${Box}>
          <${Fig} name="cc-is-phase" />
        `),

        // 12 · follow one statement
        page(html`
          <${H2}>${t('Follow one statement down the line', 'امشي ورا statement واحدة على الخط')}</${H2}>
          <${P} small=${true}>${X("Our hero is <code>a[index] = 4 + 2</code>, the lecture's own example. Press play and watch what each phase hands to the next.", 'البطل بتاعنا هو <code>a[index] = 4 + 2</code>، مثال المحاضرة نفسه. دوس شغّل واتفرج كل phase بتسلّم إيه للي بعدها.')}</${P}>
          <${AssemblyLine} />
          <${Hand} arrow="up">${t('the next pages slow down at each station', 'الصفحات الجاية بتقف عند كل محطة')}</${Hand}>
        `, { sec: t('Follow a[index] = 4 + 2', 'امشي ورا a[index] = 4 + 2') }),

        // 13 · scanner
        page(html`
          <${H1}>${t('Phase 1: the scanner', 'الـ phase الأولى: الـ scanner')}</${H1}>
          <p className="hf-hand">${t('a.k.a. lexical analysis', 'واسمه التاني lexical analysis')}</p>
          <${P}>${X('To the scanner, your program is just a stream of characters. Its job: <b>collect sequences of characters into meaningful units called tokens</b>.', 'البرنامج بتاعك بالنسبة للـ scanner مجرد characters ورا بعض. شغلانته إنه <b>يجمّع الـ characters في وحدات ليها معنى اسمها tokens</b>.')}</${P}>
          <${Talk} who="dev">${X("So <code>index</code> isn't five letters to it?", 'يعني <code>index</code> مش خمس حروف بالنسباله؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X("Nope. It's <b>one token</b>: an identifier. Same for <code>4</code>, a number, and <code>=</code>, an assignment.", 'لأ. دي <b>token واحدة</b> نوعها identifier. ونفس الكلام لـ <code>4</code> وهي number، ولـ <code>=</code> وهي assignment.')}</${Talk}>
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X("You don't need to know <i>how</i> a scanner finds tokens yet. That's the next lecture, lexical analysis. For now: <b>characters in, tokens out.</b>", 'مش محتاج تعرف دلوقتي الـ scanner بيلاقي الـ tokens <i>إزاي</i>. ده في المحاضرة الجاية، الـ lexical analysis. دلوقتي احفظ: <b>characters داخلة، tokens طالعة.</b>')}</p></${Box}>
        `, { sec: t('Phase 1 · Scanner', 'الـ phase 1 · الـ Scanner') }),
        page(html`
          <${H2}>${t('Watch the scanner collect tokens', 'اتفرج على الـ scanner وهو بيجمّع الـ tokens')}</${H2}>
          <${Fig} name="cc-scanner" />
        `),

        // be the scanner
        page(html`
          <${Box} kind="pencil" title=${t('Be the scanner', 'خليك إنت الـ scanner')}><p className="hf-p small">${t('Your job is to play the scanner. Tap a character to cut the statement after it. Make one cut between every two tokens.', 'إنت دلوقتي الـ scanner. دوس على أي character عشان تقطع الـ statement بعده. اعمل قطعة واحدة بين كل token والتانية.')}</p></${Box}>
          <${Scan} id="scan" src="a[index]=4+2" cuts=${[0, 1, 6, 7, 8, 9, 10]} names=${['identifier', 'left bracket', 'identifier', 'right bracket', 'assignment', 'number', 'plus sign', 'number']} />
          <${Grow} />
          <${Hand} arrow="up" red=${true}>${t("eight tokens, the same as the slide's list", 'تمن tokens، نفس اللي في السلايد بالظبط')}</${Hand}>
        `),

        // 15 · parser
        page(html`
          <${H1}>${t('Phase 2: the parser', 'الـ phase التانية: الـ parser')}</${H1}>
          <p className="hf-hand">${t('a.k.a. syntax analysis', 'واسمه التاني syntax analysis')}</p>
          <${P}>${X('Eight tokens in a row tell you nothing about what belongs to what. The parser <b>determines the structure</b> of the program. Its result is a <b>parse tree</b> or a <b>syntax tree</b> (abstract syntax tree).',
            'تمن tokens ورا بعض مش بيقولولك إيه تبع إيه. الـ parser <b>بيحدد الـ structure</b> بتاع البرنامج، والناتج بتاعه <b>parse tree</b> أو <b>syntax tree</b> (abstract syntax tree).')}</${P}>
          <${Grow} />
          <${Dumb} qa=${A ? [['الـ parse tree والـ syntax tree، إيه الفرق؟', 'الـ parse tree بيحتفظ <b>بكل node في الـ grammar</b>. الـ <b>syntax tree</b> (AST) هو <b>النسخة المختصرة</b>: assign-expression ومعاه subscript-expression للـ a والـ index، وadditive-expression للـ 4 والـ 2.'], ['أنهي واحدة بتروح للـ phase اللي بعدها؟', 'الـ <b>syntax tree</b>. هو الـ input بتاع الـ semantic analysis.']]
            : [['Parse tree or syntax tree: what\'s the difference?', 'The parse tree keeps <b>every grammar node</b>. The <b>syntax tree</b> (AST) is the <b>condensed version</b>: just assign-expression, subscript-expression(a, index) and additive-expression(4, 2).'], ['Which one does the next phase get?', 'The <b>syntax tree</b>. It is the input to semantic analysis.']]} />
        `, { sec: t('Phase 2 · Parser', 'الـ phase 2 · الـ Parser') }),
        page(html`
          <${H2}>${t('The parse tree (slide 7)', 'الـ parse tree (سلايد 7)')}</${H2}>
          <${Fig} name="cc-parse-tree" />
        `),
        page(html`
          <${H2}>${t('Same structure, fewer nodes', 'نفس الـ structure، nodes أقل')}</${H2}>
          <${Fig} name="cc-syntax-tree" />
          <${Hand} arrow="up">${t('the syntax tree (slide 8): the condensed version', 'الـ syntax tree (سلايد 8): النسخة المختصرة')}</${Hand}>
        `),

        // 17 · semantic analyzer
        page(html`
          <${H1}>${t('Phase 3: the semantic analyzer', 'الـ phase التالتة: الـ semantic analyzer')}</${H1}>
          <${P}>${X("The parser knows the <b>structure</b> (syntax). The semantic analyzer works out the <b>meaning</b> (semantics), which decides some of the program's running-time behaviour <b>before</b> it runs.",
            'الـ parser عارف الـ <b>structure</b> (الـ syntax). الـ semantic analyzer بيفهم <b>المعنى</b> (الـ semantics)، واللي بيحدد جزء من سلوك البرنامج وقت التشغيل <b>قبل</b> ما يشتغل.')}</${P}>
          <${UL} items=${A ? ['الـ <b>static semantics</b>: الـ declarations والـ type checking.', 'الـ <b>attributes</b>: المعلومات الزيادة اللي بيحسبها، زي الـ type بتاع كل node.', 'الناتج بتاعه: الـ <b>annotated syntax tree</b>.']
            : ['<b>Static semantics</b>: declarations and type checking.', '<b>Attributes</b>: the extra pieces of information it computes, like each node\'s type.', 'Its result: the <b>annotated syntax tree</b>.']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Look at <code>a[index] = 4 + 2</code> again. Every token is fine and the structure is fine. What would still be wrong if <code>a</code> had never been declared, and which phase checks declarations?',
            'بص على <code>a[index] = 4 + 2</code> تاني. كل الـ tokens سليمة والـ structure سليم. إيه اللي هيبقى غلط لو <code>a</code> عمرها ما اتعملها declare؟ وأنهي phase بتشيّك على الـ declarations؟')}</p></${Box}>
        `, { sec: t('Phase 3 · Semantic analyzer', 'الـ phase 3 · الـ Semantic analyzer') }),
        page(html`
          <${H2}>${t('Same tree, now with attributes', 'نفس الشجرة، بس دلوقتي بالـ attributes')}</${H2}>
          <${Fig} name="cc-annotated-tree" />
          <${Hand} arrow="up">${t('the types under each node are the attributes', 'الـ types اللي تحت كل node هي الـ attributes')}</${Hand}>
        `),

        // 18 · watch it: inputs and outputs
        page(html`
          <${Box} kind="watch" title=${t('Watch it: who gets which tree?', 'خلّي بالك: مين بياخد أنهي شجرة؟')}>
            <p className="hf-p small">${t('The exams swap inputs and outputs. Get these straight:', 'الامتحانات بتبدّل الـ inputs والـ outputs. ثبّت دول:')}</p>
            <ul className="hf-ul" style=${{ marginTop: '4px' }}>${(A ? [
              'الـ semantic analysis بياخد الـ <b>syntax tree</b> ويطلّع الـ <b>annotated syntax tree</b>.',
              'دي <b>غلط</b>:<span class="ltr">"Annotated syntax tree is the output of syntax analysis"</span>',
              'الـ annotated tree بيدخل على الـ <b>code optimizer</b>.'
            ] : [
              'Input to semantic analysis: the <b>syntax tree</b>.',
              'Output of semantic analysis: the <b>annotated syntax tree</b>.',
              '"Annotated syntax tree is the output of syntax analysis": <b>False</b>.',
              'The annotated tree is the input to the <b>code optimizer</b> (the source code optimizer).'
            ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
          ${mq('m-ann', /annotated syntax tree is the input/i)}
        `),

        // 19 · source code optimizer
        page(html`
          <${H1}>${t('Phase 4: the source code optimizer', 'الـ phase الرابعة: الـ source code optimizer')}</${H1}>
          <${P}>${X('Why should the program work out <code>4 + 2</code> every time it runs, when the compiler can do it once? The <b>earliest point</b> for most optimization steps is <b>just after semantic analysis</b>.',
            'ليه البرنامج يحسب <code>4 + 2</code> كل مرة يشتغل، والـ compiler يقدر يحسبها مرة واحدة؟ <b>أبدر نقطة</b> لمعظم خطوات الـ optimization هي <b>بعد الـ semantic analysis على طول</b>.')}</${P}>
          <${Fig} name="cc-fold-tree" />
        `, { sec: t('Phase 4 · Source optimizer', 'الـ phase 4 · الـ Source optimizer') }),

        page(html`
          <${P} small=${true}>${X('This improvement depends <b>only on the source code</b>, and it is a separate phase. Compilers vary widely in the kinds of optimization they do and where they place them. It can also run on <b>intermediate code</b> (three-address code, p-code):',
            'التحسين ده معتمد <b>على الـ source code بس</b>، وهو phase لوحده. الـ compilers بتختلف جدًا في نوع الـ optimization اللي بتعمله وفين. وممكن يتعمل كمان على الـ <b>intermediate code</b> (الـ three-address code والـ p-code):')}</${P}>
          <${Fig} name="cc-fold-ir" />
        `),

        // 21 · code generator + target optimizer
        page(html`
          <${H1}>${t('Phases 5 and 6: down to the metal', 'الـ phase الخامسة والسادسة: نازلين للمكنة')}</${H1}>
          <${P} small=${true}>${X('The <b>code generator</b> takes the intermediate code and generates code for the <b>target machine</b>. Now the <b>properties of the target machine</b> are the major factor: its instructions and how it represents data.',
            'الـ <b>code generator</b> بياخد الـ intermediate code ويطلّع كود للـ <b>target machine</b>. هنا <b>خصائص الـ target machine</b> هي العامل الأساسي، يعني الـ instructions بتاعتها وطريقة تمثيلها للـ data.')}</${P}>
          <${Fig} name="cc-codegen" />
        `, { sec: t('Phases 5–6 · Code generation', 'الـ phase 5–6 · الـ Code generation') }),

        page(html`
          <${H2}>${t("The target code optimizer's three tricks", 'تلات حركات بيعملهم الـ target code optimizer')}</${H2}>
          <${Code} lines=${['MOV R0, index', ['MUL R0, 2', t('← × 2: an integer is 2 bytes here ‡', 'الضرب في 2 لأن الـ integer هنا 2 bytes ‡')], 'MOV R1, &a', 'ADD R1, R0', 'MOV *R1, 6']} />
          <${Hand} arrow="down" red=${true}>${t('after the target code optimizer', 'بعد الـ target code optimizer')}</${Hand}>
          <${Code} lines=${['MOV R0, index', ['SHL R0', t('← shift left = × 2', 'الـ shift left يعني ضرب في 2')], ['MOV &a[R0], 6', t('← slide prints &a[R1] ‡', 'السلايد كاتبة R1 ‡')]]} />
          <${UL} items=${A ? ['<b>اختيار الـ address modes</b> (سطر <code>&a[R0]</code>)', '<b>تبديل الـ instructions</b> (الـ <code>MUL</code> في 2 بقت <code>SHL</code>)', '<b>شيل الـ instructions الزيادة</b> (الـ 5 سطور بقوا 3)']
            : ['<b>Choosing address modes</b> (the <code>&a[R0]</code> line)', '<b>Replacing instructions</b> (<code>MUL</code> by 2 becomes <code>SHL</code>)', '<b>Eliminating redundant</b> instructions (5 lines became 3)']} />
          <${P} small=${true}>${X("‡ The slide doesn't say why it multiplies by 2, and its last line reads <code>&a[R1]</code> where <code>R0</code> is meant.", '‡ السلايد مش بتقول ليه بيضرب في 2، وآخر سطر فيها مكتوب <code>&a[R1]</code> والمقصود <code>R0</code>.')}</${P}>
        `),

        // 23 · who does what
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Match each phase to its job. Tap a phase, then tap the job it does.', 'وصّل كل phase بشغلانتها. دوس على الـ phase، وبعدين دوس على الشغلانة بتاعتها.')}</${P}>
          <${Match} id="who" left=${['Scanner', 'Parser', 'Semantic analyzer', 'Source code optimizer', 'Code generator', 'Target code optimizer']}
            right=${A ? ['بيحسب الـ attributes زي الـ types ويطلّع الـ annotated tree', 'بيحوّل <bdi dir="ltr">4 + 2</bdi> لـ 6 قبل ما البرنامج يشتغل أصلًا', 'بيجمّع الـ characters في tokens', 'بيختار الـ address modes ويبدّل الـ MUL بـ SHL', 'بيحدد الـ structure ويبني الـ syntax tree', 'بيكتب كود للـ target machine من الـ intermediate code']
              : ['Computes attributes such as types and makes the annotated tree', 'Turns 4 + 2 into 6 before the program ever runs', 'Collects characters into tokens', 'Picks address modes and swaps MUL for SHL', 'Determines the structure: builds the syntax tree', 'Writes code for the target machine from the intermediate code']}
            answer=${[2, 4, 0, 1, 5, 3]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 24 · symbol table exposed
        page(html`
          <${Interview} title=${t('Symbol Table, exposed', 'الـ Symbol Table على المكشوف')} sub=${t("This week's interview: the helper everyone mistakes for a phase.", 'حوار الأسبوع: الـ helper اللي الكل فاكره phase.')} lines=${A ? [
            ['المذيع', 'الكل بيقول عليك phase.'],
            ['الـ Symbol Table', 'لأ! أنا <b>data structure</b> بشيل معلومات الـ <b>identifiers</b>: الـ functions والـ variables والـ constants والـ data types.'],
            ['المذيع', 'بتشتغل مع أنهي phases؟'],
            ['الـ Symbol Table', '<b>تقريبًا كل الـ phases</b>. كله بيدوّر عندي.'],
            ['المذيع', 'ده شغل متعب.'],
            ['الـ Symbol Table', 'عشان كده الـ access لازم يبقى <b>constant-time</b>، وغالبًا معمول من <b>hash table</b> أو أكتر.'],
            ['المذيع', 'ليك قرايب في المجال؟'],
            ['الـ Symbol Table', 'بنت عمي الـ <b>Literal Table</b> بتشيل الـ <b>constants والـ strings</b> فبتصغّر حجم البرنامج، وهي كمان محتاجة insertion وlookup سريعين.']
          ] : [
            ['Head First', 'People keep calling you a phase.'],
            ['Symbol Table', "I'm not! I'm a <b>data structure</b>. I keep information about <b>identifiers</b>: functions, variables, constants and data types."],
            ['Head First', 'Which phases do you work with?'],
            ['Symbol Table', '<b>Almost every phase</b>. Everyone needs to look things up in me.'],
            ['Head First', 'Sounds exhausting.'],
            ['Symbol Table', "That's why my access must be <b>constant-time</b>. I'm usually built from one or several <b>hash tables</b>."],
            ['Head First', 'Any family in the business?'],
            ['Symbol Table', 'My cousin the <b>Literal Table</b> stores <b>constants and strings</b>, which reduces program size. Quick insertion and lookup matter to her too.']
          ]} />
          <${Grow} />
          <${Talk} who="table" flip=${true}>${X('Say it with me: I am <b>not</b> a phase.', 'قولها ورايا: أنا <b>مش</b> phase.')}</${Talk}>
        `, { sec: t('Data structures', 'الـ Data structures') }),

        // 25 · the other data structures
        page(html`
          <${H2}>${t('How the phases pass things along', 'الـ phases بتسلّم الحاجات لبعض إزاي')}</${H2}>
          <${P} small=${true}>${X("The lecture's <b>principal data structures for communication among phases</b>:", 'الـ <b>data structures الأساسية اللي الـ phases بتتواصل بيها</b> في المحاضرة:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>tokens</b>: قيمة من <b>enumerated data type</b>، ويمكن معاها الـ string أو قيمة الرقم. بتتشال في <b>global variable واحد</b> أو في <b>array</b>.',
            'الـ <b>syntax tree</b>: <b>pointer-based structure</b> بيعمله الـ parser. الـ nodes ممكن تتعمل dynamically allocated أو تتشال في الـ symbol table، وغالبًا كـ <b>variable record</b>.',
            'الـ <b>symbol table</b> والـ <b>literal table</b>: لسه متعرّف عليهم.',
            'الـ <b>intermediate code</b>: array of text strings، أو temporary text، أو linked list of structures. لازم يبقى <b>سهل نعيد ترتيبه</b>.',
            'الـ <b>temporary files</b>: بتشيل نواتج الخطوات اللي في النص. بتحل مشكلة <b>الـ memory constraints</b> وبتسمح بالـ <b>back-patching</b> للـ addresses.'
          ] : [
            '<b>Tokens</b>: a value of an <b>enumerated data type</b>, maybe with the string or number value. Kept in a <b>single global variable</b> or an <b>array</b>.',
            '<b>Syntax tree</b>: a <b>pointer-based structure</b> from the parser; nodes may be dynamically allocated or stored in the symbol table, often as a <b>variable record</b>.',
            '<b>Symbol table</b> and <b>literal table</b>: you just met them.',
            '<b>Intermediate code</b>: an array of text strings, a temporary text, or a linked list of structures. It should be <b>easy to reorganize</b>.',
            '<b>Temporary files</b>: hold intermediate products. They solve <b>memory constraints</b> and allow <b>back-patching</b> of addresses.'
          ]} />
        `),
        page(html`
          <${Fig} name="cc-data-structs" />
        `),

        // 27–29 · the doctor's questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctor's papers and revision sheet. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكتورة والـ revision sheet. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /is not a phase of a compiler\.$/i)}
          <${Grow} />
          <${Talk} who="table" flip=${true}>${t("You know this one. Hint: it's me.", 'إنت عارف دي. تلميح: أنا.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /not a characteristic of the compiler/i)}
          <${Hand} red=${true}>${t('remember the Fireside Chat: slow to analyze, fast to execute', 'بطيء في الـ analysis، سريع في الـ execution')}</${Hand}>
          <${Grow} />
          <${Box} kind="exam"><p className="hf-p small">${X('"Code optimization is done twice, on ___ code and ___ code": <b>source</b> and <b>assembly</b> (target). The phase that aims at <b>minimizing memory and maximizing speed</b>: code optimization.',
            'في سؤال<span class="ltr">"Code optimization is done twice, on ___ code and ___ code"</span>الإجابة <b>source</b> و<b>assembly</b>. والـ phase اللي <b>بتقلّل الـ memory وتزوّد السرعة</b> هي الـ code optimization.')}</p></${Box}>
        `),
        page(html`
          ${mq('m3', /purpose of intermediate code generation/i)}
          <${Gap} h=${10} />
          ${mq('m4', /symbol table is a data structure which is used/i)}
        `),

        // 30 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>compiler</b> بيترجم برنامج high-level لـ low-level machine language، وبيبلّغ عن الأخطاء الواضحة.',
            'الـ <b>interpreter</b> بيمشي statement statement: أسرع في الـ analysis، أبطأ في الـ execution، مفيش object code، memory أقل.',
            'الـ compiler بيعمل scan للبرنامج كله: بطيء في الـ analysis، <b>سريع في الـ execution</b>، وبيطلّع object code محتاج linking.',
            'الـ six phases بالترتيب:<span class="ltr"><b>scanner → parser → semantic analyzer → source code optimizer → code generator → target code optimizer</b></span>',
            'النواتج بالترتيب:<span class="ltr">tokens → syntax tree → annotated tree → intermediate code → target code</span>',
            'الـ symbol table والـ literal table والـ error handler <b>مش phases</b>. ولا الـ testing.',
            'الـ symbol table محتاج access <b>constant-time</b>، فبيستخدم hash tables.'
          ] : [
            'A <b>compiler</b> translates a high-level program into low-level machine language and reports obvious mistakes.',
            'An <b>interpreter</b> goes one statement at a time: quicker to analyze, slower to execute, no object code, less memory.',
            'A compiler scans the whole program: slow to analyze, <b>fast to execute</b>, makes object code that needs linking.',
            'Six phases: <b>scanner → parser → semantic analyzer → source code optimizer → code generator → target code optimizer</b>.',
            'Products: tokens → syntax tree → annotated tree → intermediate code → target code.',
            'Symbol table, literal table and error handler are <b>not phases</b>. Neither is testing.',
            'The symbol table needs <b>constant-time</b> access, so it uses hash tables.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 31 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="compiler">${t('Next time: how I actually find those tokens. Lexical analysis!', 'المرة الجاية: أنا بلاقي الـ tokens دي إزاي بجد. الـ Lexical analysis!')}</${Talk}>
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

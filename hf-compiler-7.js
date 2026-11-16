// Head First chapter for Compiler Design Lecture 7 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Semantic analysis: what it checks, the six semantic errors, attribute grammars, SDT, the 2 + 3 * 4 example,
// synthesized vs inherited attributes and definite assignment analysis. Every fact comes from the lecture's notes;
// our own analogies and code snippets are marked as ours.
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-cc7')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc7';
    s.textContent = `
.hfb .hf-c7-tree{ position:relative; width:320px; height:262px; margin:0 auto; }
.hfb .hf-c7-tree svg{ position:absolute; left:0; top:0; }
.hfb .hf-c7-tree line{ stroke:var(--hf-line); stroke-width:1.5; }
.hfb .hf-c7-nd{ position:absolute; transform:translate(-50%,-50%); display:flex; align-items:center; gap:4px; border:1.6px solid var(--hf-line); border-radius:7px; background:var(--paper); padding:2px 3px 2px 6px; font:700 15px/1 var(--mono); color:var(--ink); white-space:nowrap; }
.hfb .hf-c7-nd input{ width:32px; height:24px; font:700 14px/1 var(--mono); border:1.5px solid var(--faint); border-radius:5px; text-align:center; background:var(--hf-grey); color:var(--ink); padding:0; margin:0; }
.hfb .hf-c7-nd.ok{ border-color:var(--ok); } .hfb .hf-c7-nd.ok input{ border-color:var(--ok); color:var(--ok); }
.hfb .hf-c7-nd.no{ border-color:var(--hf-red); } .hfb .hf-c7-nd.no input{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-c7-lf{ position:absolute; transform:translate(-50%,-50%); font:700 15px/1 var(--mono); color:var(--hf-k); border:1.5px dashed var(--hf-k); border-radius:6px; padding:4px 7px; background:var(--paper); }
.hfb .hf-c7-op{ position:absolute; transform:translate(-50%,-50%); font:700 17px/1 var(--mono); color:var(--graphite); }
.hfb .hf-c7-rules{ display:grid; grid-template-columns:auto auto 1fr; gap:3px 7px; font:600 13px/1.45 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:6px 8px; color:var(--ink); direction:ltr; text-align:left; }
.hfb .hf-c7-rules .no{ font-weight:800; color:var(--hf-k); }
.hfb .hf-c7-rules .ac{ color:var(--hf-hand); }
.hfb .hf-c7-vs{ display:grid; grid-template-columns:1fr 1fr; border:2px solid var(--hf-line); }
.hfb .hf-c7-vs > div{ padding:6px 8px; font-size:14px; line-height:1.32; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-c7-vs > div:nth-child(odd){ border-inline-end:2px solid var(--hf-line); }
.hfb .hf-c7-vs > .hd{ font:800 15px/1.1 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; text-align:center; }
.hfb .hf-c7-vs b{ font-weight:700; }
.hfb .hf-c7-eq{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:6px; font:700 14px/1.2 var(--body); color:var(--ink); }
.hfb .hf-c7-eq span{ border:1.6px solid var(--hf-line); border-radius:8px; padding:6px 9px; background:var(--paper); }
.hfb .hf-c7-eq span.k{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-c7-eq i{ font-style:normal; color:var(--hf-k); font-size:18px; }
.hfb .hf-c7-up{ display:flex; flex-direction:column; align-items:center; gap:2px; }
.hfb .hf-c7-up span{ font:700 14px/1.2 var(--mono); border:1.5px solid var(--hf-line); border-radius:6px; padding:3px 8px; background:var(--paper); }
.hfb .hf-c7-up span.on{ border-color:var(--hf-k); box-shadow:0 0 0 2px color-mix(in srgb, var(--hf-k) 35%, transparent); }
.hfb .hf-c7-up .hf-c7-arw{ color:var(--hf-k); font:700 16px/1 var(--body); }
.hfb .hf-c7-up span.hf-c7-pop{ animation:hf-c7-pop 4.8s ease-in-out infinite both; }
@keyframes hf-c7-pop{ 0%,8%{ opacity:.25; transform:translateY(6px); } 20%,85%{ opacity:1; transform:none; } 100%{ opacity:.25; } }
.hfb .hf-c7-snip{ display:grid; gap:6px; }
.hfb .hf-c7-snip > div{ display:grid; grid-template-columns:142px 1fr; gap:8px; align-items:center; border-bottom:1px dotted var(--faint); padding-bottom:5px; }
.hfb .hf-c7-snip pre{ margin:0; font:600 13.5px/1.4 var(--mono); color:var(--ink); white-space:pre; direction:ltr; text-align:left; padding:5px 7px; overflow:visible; }
.hfb .hf-c7-ans{ font:700 13.5px/1.2 var(--body); color:var(--hf-k); }
`;
    document.head.appendChild(s);
  }

  // Be the evaluator: the parse tree of 3 * 2 + 4 under the lecture's grammar; type each node's val, then check.
  // columns follow the leaves 3 * 2 + 4; each parent sits halfway between its first and last child (as in the site's figure)
  const TREE = [
    { id: 'E0', s: 'E', c: 2.5, d: 0, v: 10 },
    { id: 'E1', s: 'E', c: 1, d: 1, v: 6, p: 'E0' },
    { id: 'pl', op: '+', c: 3, d: 1, p: 'E0' },
    { id: 'T5', s: 'T', c: 4, d: 1, v: 4, p: 'E0' },
    { id: 'T2', s: 'T', c: 1, d: 2, v: 6, p: 'E1' },
    { id: 'F6', s: 'F', c: 4, d: 2, v: 4, p: 'T5' },
    { id: 'n4', lf: '4', c: 4, d: 3, p: 'F6' },
    { id: 'T3', s: 'T', c: 0, d: 3, v: 3, p: 'T2' },
    { id: 'ti', op: '*', c: 1, d: 3, p: 'T2' },
    { id: 'F7', s: 'F', c: 2, d: 3, v: 2, p: 'T2' },
    { id: 'n2', lf: '2', c: 2, d: 4, p: 'F7' },
    { id: 'F4', s: 'F', c: 0, d: 4, v: 3, p: 'T3' },
    { id: 'n3', lf: '3', c: 0, d: 5, p: 'F4' }
  ];
  const TX = n => 32 + n.c * 64, TY = n => 18 + n.d * 45;
  function EvalTree() {
    const ar = useAr();
    const [vals, setVals] = H.K.useSlot('ev', {});
    const [checked, setChecked] = H.K.useSlot('ev:c', false);
    const nodes = TREE.filter(n => n.s);
    const right = nodes.filter(n => String(vals[n.id] || '').trim() === String(n.v)).length;
    const byId = {}; TREE.forEach(n => { byId[n.id] = n; });
    return html`<div className="hf-in">
      <div className="hf-c7-tree" dir="ltr" role="group" aria-label="Parse tree of 3 * 2 + 4: type the val of each node">
        <svg width="320" height="262" aria-hidden="true">${TREE.filter(n => n.p).map(n => { const p = byId[n.p]; return html`<line key=${n.id} x1=${TX(p)} y1=${TY(p) + 14} x2=${TX(n)} y2=${TY(n) - 13} />`; })}</svg>
        ${TREE.map(n => {
          const st = { left: TX(n) + 'px', top: TY(n) + 'px' };
          if (n.op) return html`<span key=${n.id} className="hf-c7-op" style=${st}>${n.op}</span>`;
          if (n.lf) return html`<span key=${n.id} className="hf-c7-lf" style=${st}>${n.lf}</span>`;
          const v = vals[n.id] || '', ok = String(v).trim() === String(n.v);
          return html`<label key=${n.id} className=${'hf-c7-nd' + (checked ? (ok ? ' ok' : ' no') : '')} style=${st}>${n.s}<input value=${v} inputMode="numeric" maxLength="3" aria-label=${n.s + '.val'}
            onChange=${e => { setVals(Object.assign({}, vals, { [n.id]: e.target.value.replace(/[^0-9]/g, '') })); if (checked) setChecked(false); }} /></label>`;
        })}
      </div>
      <div className="hf-row" style=${{ justifyContent: 'center', marginTop: '6px' }}>
        <button className="hf-btn solid" onClick=${() => setChecked(true)} disabled=${!Object.keys(vals).length}>${ar ? 'صحّح الـ values' : 'Check my values'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; nodes.forEach(n => { o[n.id] = String(n.v); }); setVals(o); setChecked(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${nodes.length}</bdi> صح` : right + ' / ' + nodes.length + ' right'}</span>`}
      </div>
    </div>`;
  }

  // values travel up: the 2 + 3 * 4 trace as a little elevator, bottom to top
  function Elevator() {
    const ar = useAr();
    const rows = ['E.val = 2 + 12 = 14', 'T.val = 3 * 4 = 12', 'F.val = 4', 'F.val = 3 → T.val = 3', 'F.val = 2 → T.val = 2 → E.val = 2'];
    return html`<div className="hf-c7-up hf-in" dir="ltr" aria-label="The values computed bottom-up, from the leaves to the root">
      ${rows.map((r, j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<span className="hf-c7-arw" aria-hidden="true" style=${{ border: 0, padding: 0, background: 'none' }}>↑</span>`}<span className=${(j === 0 ? 'on ' : '') + (calm() ? '' : 'hf-c7-pop')} style=${{ animationDelay: calm() ? '0s' : (4 - j) * 0.6 + 's' }}>${r}</span></${React.Fragment}>`)}
      <p className="hf-hand" style=${{ marginTop: '3px', textAlign: 'center' }}>${ar ? 'من الـ leaves (تحت) للـ root (فوق)' : 'from the leaves (bottom) to the root (top)'}</p>
    </div>`;
  }

  H.chapters.compiler[7] = {
    title: 'Semantic Analysis: Attribute Grammars and SDT', kicker: 'Chapter 7', run: 'attribute grammars and sdt',
    ar: { title: 'التحليل الدلالي: الـ Attribute Grammars والـ SDT', kicker: 'الفصل 7', run: 'الـ attribute grammars والـ SDT' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap, T, Reveal } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 7);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[7] && window.AR.compiler.lectures[7].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const RULES = [['PR#1', 'E → E + T', '{E.val = E.val + T.val}'], ['PR#2', 'E → T', '{E.val = T.val}'], ['PR#3', 'T → T * F', '{T.val = T.val * F.val}'], ['PR#4', 'T → F', '{T.val = F.val}'], ['PR#5', 'F → INT', '{F.val = INT.lexval}']];
      const Rules = () => html`<div className="hf-c7-rules hf-in">${RULES.map(([n, p, a]) => html`<${React.Fragment} key=${n}><span className="no">${n}</span><span>${p}</span><span className="ac">${a}</span></${React.Fragment}>`)}</div>`;
      return [
        // 0 · where we left off (faces the opener)
        page(html`
          <${H2}>${t('Where we left off', 'إحنا وقفنا فين')}</${H2}>
          <${P} small=${true}>${X('In Chapter 1 you met the six phases. Since then the <b>scanner</b> learned to cut tokens, and the <b>parser</b> learned to check the structure with a CFG and build the <b>syntax tree</b>.',
            'في الفصل الأول اتعرّفت على الـ six phases. ومن ساعتها الـ <b>scanner</b> اتعلّم يقطّع الـ tokens، والـ <b>parser</b> اتعلّم يشيّك على الـ structure بالـ CFG ويبني الـ <b>syntax tree</b>.')}</${P}>
          <${P} small=${true}>${X('Now the tree moves on to <b>phase 3: the semantic analyzer</b>. Same tools as always: Brain Power, Watch it! traps from the doctor\'s papers, and exercises right on the page.',
            'دلوقتي الشجرة رايحة للـ <b>phase التالتة: الـ semantic analyzer</b>. ونفس الأدوات: شغّل مخك، وفخاخ خلّي بالك من امتحانات الدكتورة، وتمارين على الصفحة نفسها.')}</${P}>
          <${Box} kind="brain"><p className="hf-p">${X('A warm-up. Every token here is fine, and the shape <i>type name = value;</i> is a perfectly good declaration:',
            'تسخين. كل الـ tokens هنا سليمة، وشكل الـ declaration مظبوط خالص:')}</p>
            <${Code} lines=${['int age = "twenty";']} />
            <p className="hf-p">${t('So the parser is happy. Is the compiler? What is wrong, and who should notice?', 'يعني الـ parser مبسوط. طب الـ compiler مبسوط؟ إيه الغلط، ومين المفروض ياخد باله؟')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t('the snippet is ours, not the slides\'', 'المثال ده من عندنا، مش من السلايدز')}</${Hand}>
        `, { sec: t('Where we left off', 'إحنا وقفنا فين') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">7</span><span className="t">${A ? html`الفصل السابع<br/>Compiler Design` : html`Chapter seven<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('It Parses. But Does It Mean Anything?', 'اتعمله parse... بس هل ليه معنى؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('semantic analysis: attribute grammars and SDT', 'الـ semantic analysis: الـ attribute grammars والـ SDT')}</p></div>
          <${Talk} who="dev">${X('The parser accepted <code>int age = "twenty";</code> So it\'s correct, right?', 'الـ parser قبل <code>int age = "twenty";</code> يبقى صح، مش كده؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('The <b>shape</b> is right. But a string in an <code>int</code>? That\'s a <b>type mismatch</b>, and catching it is phase 3\'s job.', 'الـ <b>شكل</b> صح. بس string جوّه <code>int</code>؟ ده <b>type mismatch</b>، ومسكه ده شغل الـ phase التالتة.')}</${Talk}>
          <${P}>${X('In this chapter you\'ll see what the semantic analyzer checks, how a grammar learns to carry <b>meaning</b> (attribute grammars and <b>SDT</b>), and you\'ll compute <code>2 + 3 * 4</code> by climbing a parse tree.',
            'في الفصل ده هتشوف الـ semantic analyzer بيشيّك على إيه، وإزاي الـ grammar بتتعلّم تشيل <b>معنى</b> (الـ attribute grammars والـ <b>SDT</b>)، وهتحسب <code>2 + 3 * 4</code> وإنت طالع على الـ parse tree.')}</${P}>
        `, { sec: t('Meet meaning', 'اتعرّف على المعنى') }),

        // 2 · what semantic analysis does
        page(html`
          <${H1}>${t('Phase 3: what does it check?', 'الـ phase التالتة: بتشيّك على إيه؟')}</${H1}>
          <${Def}>${X('<b>Semantic analysis</b> makes sure that the declarations and statements of a program are <b>semantically correct</b>.',
            'الـ <b>Semantic analysis</b> بيتأكد إن الـ declarations والـ statements بتاعة البرنامج <b>صح من ناحية المعنى (semantically correct)</b>.')}</${Def}>
          <${UL} items=${A ? [
            'بيستخدم <b>الـ syntax tree والـ symbol table</b> عشان يشوف البرنامج ماشي مع <b>تعريف اللغة</b> ولا لأ.',
            'بيجمع <b>type information</b> ويخزنها في الـ syntax tree أو الـ symbol table.',
            'والـ compiler بيستخدم المعلومات دي بعدين في الـ <b>intermediate-code generation</b>.',
            'الـ <b>type checking</b> بيتعمل هنا، يعني أثناء الـ <b>syntax-directed translation</b>.'
          ] : [
            'It uses the <b>syntax tree and the symbol table</b> to check whether the program is consistent with the <b>language definition</b>.',
            'It gathers <b>type information</b> and stores it in the syntax tree or the symbol table.',
            'The compiler later uses that information during <b>intermediate-code generation</b>.',
            '<b>Type checking</b> is done here, i.e. during <b>syntax-directed translation</b>.'
          ]} />
          <${Grow} />
          <${Hand}>${t('Our analogy: "The table drank Tuesday" has perfect grammar and no meaning. The parser checks grammar; this phase checks meaning.',
            'تشبيه من عندنا: "الترابيزة شربت التلات" جملة نحوها سليم ومالهاش معنى. الـ parser بيشيّك على النحو، والـ phase دي على المعنى.')}</${Hand}>
        `, { sec: t('Semantic analysis', 'الـ Semantic analysis') }),

        // 3 · the pipeline figure
        page(html`
          <${H2}>${t('What goes in, what comes out', 'إيه اللي داخل وإيه اللي طالع')}</${H2}>
          <${Fig} name="cc-sem-pipeline" />
        `),

        // 4 · watch it: inputs, outputs, type checking
        page(html`
          <${Box} kind="watch" title=${t('Watch it: get the trees straight', 'خلّي بالك: ثبّت الشجرتين')}>
            <ul className="hf-ul">${(A ? [
              'الـ <b>input</b> هو الـ <b>syntax tree</b> (من الـ parser).',
              'الـ <b>output</b> هو الـ <b>annotated syntax tree</b>، يعني parse tree بيبيّن <b>قيم الـ attributes عند كل node</b>.',
              'الـ type checking بيتعمل أثناء الـ <b>syntax directed translation</b>، مش في الـ lexical analysis ولا الـ syntax analysis ولا الـ code optimization.'
            ] : [
              'Input: the <b>syntax tree</b> (from the parser).',
              'Output: the <b>annotated syntax tree</b>, a parse tree showing the <b>attribute values at each node</b>.',
              'Type checking is done during <b>syntax directed translation</b>: not lexical analysis, not syntax analysis, not code optimization.'
            ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
          <${Dumb} qa=${A ? [
            ['الـ type information بتتخزن فين؟', 'في الـ <b>syntax tree</b> أو الـ <b>symbol table</b>، وبعدين بتتستخدم في الـ intermediate-code generation.'],
            ['هو الـ parser مش بيشيّك على الـ types؟', 'لأ. الـ syntax analysis بيشيّك على الـ structure بس ضد الـ CFG ويبني الـ syntax tree. الـ types بتتشيّك بعده، في الـ semantic analysis.'],
            ['يعني إيه "annotated"؟', 'يعني الشجرة متعلّم عليها: كل node جنبها قيم الـ attributes بتاعتها، زي الـ type أو الـ value.']
          ] : [
            ['Where does the type information go?', 'Into the <b>syntax tree</b> or the <b>symbol table</b>. It is used later in intermediate-code generation.'],
            ['Doesn\'t the parser check types?', 'No. Syntax analysis only checks the structure against the CFG and builds the syntax tree. Types are checked afterwards, in semantic analysis.'],
            ['What does "annotated" mean?', 'The tree is written on: each node carries its attribute values, like a type or a value.']
          ]} />
        `),

        // 5 · six semantic errors
        page(html`
          <${H1}>${t('Six ways to make no sense', 'ست طرق عشان الكود ميبقاش ليه معنى')}</${H1}>
          <${P} small=${true}>${t('The lecture lists the semantic errors the analyzer should recognize. Learn all six by name:', 'المحاضرة بتعدّ الـ semantic errors اللي الـ analyzer لازم يكتشفها. احفظ الست بأساميهم:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Type mismatch</b>.',
            'الـ <b>Undeclared variable</b> (متغير مش متعرّف).',
            'الـ <b>Reserved identifier misuse</b> (استخدام كلمة محجوزة غلط).',
            'الـ <b>Multiple declaration</b> لمتغير في نفس الـ scope.',
            'الوصول لمتغير <b>out-of-scope</b>.',
            'الـ <b>Actual and formal parameter mismatch</b>.'
          ] : [
            '<b>Type mismatch</b>.',
            '<b>Undeclared variable</b>.',
            '<b>Reserved identifier misuse</b>.',
            '<b>Multiple declaration</b> of a variable in one scope.',
            'Accessing an <b>out-of-scope</b> variable.',
            '<b>Actual and formal parameter mismatch</b>.'
          ]} />
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${X('Every one of these <b>parses fine</b>. Only meaning gives them away.', 'كل دول <b>بيتعملهم parse عادي</b>. المعنى بس هو اللي بيفضحهم.')}</${Talk}>
          <${Hand}>${X('memory trick (ours): first letters in order, T U R M O P', 'حيلة من عندنا: أول حرف من كل واحدة بالترتيب <bdi dir="ltr">T U R M O P</bdi>')}</${Hand}>
        `, { sec: t('Semantic errors', 'الـ Semantic errors') }),

        // 6 · match: name that error
        page(html`
          <${Box} kind="pencil" title=${t('Name that error', 'سمّي الغلطة')}><p className="hf-p small">${t('Tap an error, then the snippet that commits it. (The snippets are ours, not the slides\'.)', 'دوس على الغلطة، وبعدين على الكود اللي فيه الغلطة دي. (الأكواد من عندنا، مش من السلايدز.)')}</p></${Box}>
          <${Match} id="err" left=${A ? ['الـ Type mismatch', 'الـ Undeclared variable', 'الـ Reserved identifier misuse', 'الـ Multiple declaration', 'الـ Out-of-scope access', 'الـ Parameter mismatch']
            : ['Type mismatch', 'Undeclared variable', 'Reserved identifier misuse', 'Multiple declaration', 'Out-of-scope access', 'Actual/formal parameter mismatch']}
            right=${['<code>{ int t; } t = 1;</code>', '<code>f(int p, int q)</code><br/><code>f(5);</code>', '<code>int x = "hello";</code>', '<code>{ int a; int a; }</code>', '<code>int x; y = 5;</code>', '<code>int while = 3;</code>']}
            answer=${[2, 4, 5, 3, 0, 1]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 7 · not a semantic error
        page(html`
          <${Box} kind="watch"><p className="hf-p">${X('A <b>missing closing parenthesis</b> is <b>not</b> on the list. Unbalanced parentheses break the <b>structure</b>, so that is a <b>syntax error</b>, caught earlier by the parser with the CFG.',
            'الـ <b>قوس اللي ناقص</b> <b>مش</b> في الليستة. الأقواس اللي مش متقفلة بتبوّظ الـ <b>structure</b>، يبقى دي <b>syntax error</b>، والـ parser بيمسكها قبل كده بالـ CFG.')}</p></${Box}>
          <${Box} kind="brain"><p className="hf-p">${X('Look again at <code>{ int t; } t = 1;</code> To call this "out of scope", the analyzer must remember <b>where</b> <code>t</code> was declared. What data structure would you keep that in?',
            'بص تاني على <code>{ int t; } t = 1;</code> عشان يقول إنها "out of scope"، الـ analyzer لازم يفتكر <code>t</code> اتعملها declare <b>فين</b>. هتشيل المعلومة دي في أنهي data structure؟')}</p></${Box}>
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('<b>How</b> scopes and symbol tables do this is the next chapter (scoping, binding and symbol tables). Today: <b>name</b> the six errors, and learn how a grammar carries meaning.',
            'الـ scopes والـ symbol tables بيعملوا ده <b>إزاي</b>، ده في الفصل الجاي (الـ scoping والـ binding والـ symbol tables). النهارده: <b>سمّي</b> الست أخطاء، واعرف الـ grammar بتشيل المعنى إزاي.')}</p></${Box}>
        `),

        // 8 · attribute grammar
        page(html`
          <${H1}>${t('Attribute grammar: a CFG with luggage', 'الـ attribute grammar يعني CFG شايل شنطة')}</${H1}>
          <${Def}>${X('An <b>attribute grammar</b> is a special form of CFG where additional information (<b>attributes</b>) is appended to one or more of its <b>non-terminals</b> to provide <b>context-sensitive</b> information.',
            'الـ <b>attribute grammar</b> نوع خاص من الـ CFG بنزوّد فيه معلومات إضافية (<b>attributes</b>) على واحد أو أكتر من الـ <b>non-terminals</b> بتوعه، عشان يدّي معلومات <b>context-sensitive</b>.')}</${Def}>
          <${Code} lines=${['E → E + T', '  { E.value = E.value + T.value }']} />
          <${Hand} arrow="up" red=${true}>${X('"value" is the <b>attribute</b> here', 'الـ "value" هنا هي الـ <b>attribute</b>')}</${Hand}>
          <${UL} items=${A ? [
            'كل attribute ليه <b>domain</b> واضح: integer و float و character و string و expressions.',
            'بيدّي <b>semantics</b> للـ CFG، ويقدر يوصف الـ syntax والـ semantics مع بعض.',
            'ولو بصّينا عليه كـ parse tree، يقدر <b>ينقل قيم بين الـ nodes</b>.'
          ] : [
            'Each attribute has a well-defined <b>domain</b>: integer, float, character, string, expressions.',
            'It gives <b>semantics</b> to the CFG: it can specify both syntax and semantics.',
            'Viewed as a parse tree, it can <b>pass values among the nodes</b>.'
          ]} />
          <${Hand} tilt=${true}>${t('Our analogy: the CFG is the skeleton; the attributes are the luggage each non-terminal carries.', 'تشبيه من عندنا: الـ CFG هو الهيكل، والـ attributes هي الشنطة اللي كل non-terminal شايلها.')}</${Hand}>
        `, { sec: t('Attribute grammar', 'الـ Attribute grammar') }),

        // 9 · figure
        page(html`
          <${H2}>${t('Watch a production get its attributes', 'اتفرّج على production وهي بتاخد الـ attributes')}</${H2}>
          <${Fig} name="cc-attr-grammar" />
        `),

        // 10 · the two equations
        page(html`
          <${H2}>${t('Two lines to learn by heart', 'سطرين تحفظهم صمّ')}</${H2}>
          <div className="hf-c7-eq hf-in" dir="ltr"><span>CFG</span><i>+</i><span>attributes on each non-terminal</span><i>=</i><span className="k">attribute grammar</span></div>
          <div className="hf-c7-eq hf-in" dir="ltr" style=${{ animationDelay: calm() ? '0s' : '.25s' }}><span>syntax tree</span><i>→ attribute grammar →</i><span className="k">annotated syntax tree</span></div>
          <${Hand} red=${true}>${X('the parser uses the plain CFG; attributes sit on the <b>non-terminals</b>, not the terminals', 'الـ parser بيستخدم الـ CFG العادي، والـ attributes على الـ <b>non-terminals</b> مش الـ terminals')}</${Hand}>
          ${mq('m-model', /modeled on the basis of/i)}
        `),

        // 11 · SDT
        page(html`
          <${H1}>${t('SDT: rules that ride on the grammar', 'الـ SDT: قواعد راكبة على الـ grammar')}</${H1}>
          <${Def}>${X('<b>Syntax Directed Translation (SDT)</b>: <b>augmented rules added to the grammar that facilitate semantic analysis</b>.',
            'الـ <b>Syntax Directed Translation (SDT)</b> هي <b>augmented rules بنضيفها للـ grammar عشان تسهّل الـ semantic analysis</b>.')}</${Def}>
          <${P}>${X('Information is passed <b>bottom-up and/or top-down</b> the parse tree, in the form of attributes attached to the nodes.',
            'المعلومات بتتنقل <b>bottom-up و/أو top-down</b> في الـ parse tree، على شكل attributes متعلّقة بالـ nodes.')}</${P}>
          <${Box} kind="watch"><p className="hf-p">${X('The <b>S</b> is <b>Syntax</b>, not Semantic. The rules are attached to the grammar\'s productions, so the <i>syntax</i> directs the translation. "Semantic Directed Translation" is the trap option.',
            'الـ <b>S</b> معناها <b>Syntax</b> مش Semantic. القواعد متعلّقة في الـ productions بتاعة الـ grammar، فالـ <i>syntax</i> هو اللي بيوجّه الـ translation. والـ "Semantic Directed Translation" دي الإجابة الفخ.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="compiler">${X('Each production gets a little rule in braces. I run the rules, the tree fills with values.', 'كل production بتاخد قاعدة صغيرة بين أقواس. أنا بشغّل القواعد، والشجرة بتتملي قيم.')}</${Talk}>
        `, { sec: t('SDT', 'الـ SDT') }),

        // 12 · figure: the augmented grammar
        page(html`
          <${H2}>${t('The grammar, augmented', 'الـ grammar بعد ما اتزوّدت')}</${H2}>
          <${Fig} name="cc-sdt-augment" />
        `),

        // 13 · three ingredients
        page(html`
          <${H2}>${t('What may a rule use? Three things', 'القاعدة تستخدم إيه؟ تلات حاجات')}</${H2}>
          <${Rules} />
          <${UL} items=${A ? [
            'الـ <b>lexical values</b> بتاعة الـ nodes، زي <code>INT.lexval</code> في الـ PR#5.',
            'الـ <b>constants</b>. الخمس قواعد دول مفيهمش ولا constant.',
            'الـ <b>attributes</b> بتاعة الـ non-terminals، وهنا اسمه <code>val</code> على الـ E والـ T والـ F.'
          ] : [
            '<b>Lexical values</b> of nodes, like <code>INT.lexval</code> in PR#5.',
            '<b>Constants</b>. These five rules use none.',
            '<b>Attributes</b> of non-terminals: here <code>val</code>, on E, T and F.'
          ]} />
          <${Box} kind="bullets" title=${t('In general', 'بشكل عام')}><p className="hf-p small">${X('SDT associates 1) a <b>set of attributes to every node</b> of the grammar and 2) a <b>set of translation rules to every production</b>. The result is the <b>annotated syntax tree</b>.',
            'الـ SDT بيربط حاجتين: <b>مجموعة attributes بكل node</b> في الـ grammar، و<b>مجموعة translation rules بكل production</b>. والنتيجة هي الـ <b>annotated syntax tree</b>.')}</p></${Box}>
        `),

        // 14 · general approach figure
        page(html`
          <${H2}>${t('The general approach', 'الطريقة العامة')}</${H2}>
          <${Fig} name="cc-sdt-approach" />
        `),

        // 15 · 2 + 3 * 4: predict
        page(html`
          <${H1}>${t('Let\'s do the math: 2 + 3 * 4', 'يلا نحسب: 2 + 3 * 4')}</${H1}>
          <${P} small=${true}>${t('The lecture\'s own example: a grammar for + and *, each production with its rule.', 'مثال المحاضرة نفسها: grammar للجمع والضرب، وكل production معاها قاعدتها.')}</${P}>
          <${Rules} />
          <${Box} kind="brain"><p className="hf-p">${X('Before you turn the page: what will the root\'s <code>E.val</code> be, <b>20</b> or <b>14</b>? Look at <b>where</b> <code>*</code> sits in the grammar compared with <code>+</code>.',
            'قبل ما تقلب الصفحة: الـ <code>E.val</code> اللي عند الـ root هتطلع كام، <b>20</b> ولا <b>14</b>؟ بص الـ <code>*</code> قاعدة <b>فين</b> في الـ grammar مقارنة بالـ <code>+</code>.')}</p></${Box}>
          <${Grow} />
          <${Hand}>${X('2, 3 and 4 at the leaves are the <b>lexical values</b>', 'الـ 2 و3 و4 اللي في الأوراق اسمهم <b>lexical values</b>')}</${Hand}>
        `, { sec: t('Example: 2 + 3 * 4', 'المثال: 2 + 3 * 4') }),

        // 16 · the evaluation figure
        page(html`
          <${Fig} name="cc-sdt-eval" head=${t('Step through it, rule by rule (or try your own)', 'امشي فيه قاعدة قاعدة (أو جرّب expression بتاعك)')} />
        `),

        // 17 · the trace
        page(html`
          <${H2}>${t('One trip, bottom-up', 'لفّة واحدة، من تحت لفوق')}</${H2}>
          <${Elevator} />
          <${UL} items=${A ? [
            'بنحسب بـ <b>depth-first traversal واحد</b>، من الشمال لليمين.',
            'المعلومة بتمشي <b>bottom-up</b>: كل attributes الـ children بتتحسب <b>قبل</b> الـ parent.',
            'الـ child اللي ليه نفس اسم الـ parent ساعات بيتكتب بـ subscript 1 زي كده<span class="ltr">E → E1 + T</span>'
          ] : [
            'Evaluate with <b>one depth-first traversal</b>, left to right.',
            'Information flows <b>bottom-up</b>: all children\'s attributes are computed <b>before</b> the parent\'s.',
            'A child with its parent\'s name is sometimes written with subscript 1: E → E1 + T.'
          ]} />
          <${Hand} red=${true}>${X('20 would be (2 + 3) * 4. The grammar puts * deeper in the tree, so 3 * 4 = 12 comes first.', 'الـ 20 دي معناها <bdi dir="ltr">(2 + 3) * 4</bdi>. الـ grammar حاطة الضرب أعمق في الشجرة، فالـ <bdi dir="ltr">3 * 4 = 12</bdi> بتتحسب الأول.')}</${Hand}>
        `),

        // 18 · be the evaluator
        page(html`
          <${Box} kind="pencil" title=${t('Be the evaluator', 'خليك إنت الـ evaluator')}><p className="hf-p small">${X('Same grammar, new input: <code>3 * 2 + 4</code>. Type the <code>val</code> of every node, children first, then check.',
            'نفس الـ grammar بس input جديد: <code>3 * 2 + 4</code>. اكتب الـ <code>val</code> بتاع كل node، الـ children الأول، وبعدين صحّح.')}</p></${Box}>
          <${EvalTree} />
          <${Grow} />
          <${Hand} arrow="up">${t('hint: start at the bottom-left F, right above the 3', 'تلميح: ابدأ من الـ F اللي تحت على الشمال، فوق الـ 3 على طول')}</${Hand}>
        `),

        // 19 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه 14 مش 20؟', 'لأن الـ grammar حاطة الـ <b>*</b> <b>أعمق في الشجرة</b>: الـ <bdi dir="ltr">T → T * F</bdi> تحت الـ <bdi dir="ltr">E → E + T</bdi>. فالـ <bdi dir="ltr">T.val = 3 * 4 = 12</bdi> بيتحسب الأول، وبعدين الـ E بيزوّد 2.'],
            ['هو 2 و3 و4 دول constants؟', 'لأ، دول <b>lexical values</b>: قيم الـ tokens اللي عند الـ leaves. الـ <b>constants</b> نوع تاني من القيم بيتكتب جوّه قواعد الـ SDT، والخمس قواعد دول مفيهمش ولا واحد.'],
            ['لازم أبني الشجرة كلها الأول؟', 'الطريقة العامة: نبني الشجرة ونزور الـ nodes. بس <b>غالبًا</b> ده بيتعمل <b>أثناء الـ parsing</b> من غير tree صريحة.'],
            ['وإجابة <bdi dir="ltr">3 * 2 + 4</bdi> كام؟', 'الـ <bdi dir="ltr">T.val = 3 * 2 = 6</bdi>، وبعدين <bdi dir="ltr">E.val = 6 + 4 = 10</bdi>.']
          ] : [
            ['Why 14 and not 20?', 'The grammar puts <b>*</b> <b>deeper in the tree</b>: T → T * F sits under E → E + T. So T.val = 3 * 4 = 12 is computed first, then E adds 2.'],
            ['Are 2, 3 and 4 constants?', 'No, they are <b>lexical values</b>: the token values at the leaves. <b>Constants</b> are a separate kind of value written inside SDT rules, and these five rules use none.'],
            ['Must I build the whole tree first?', 'The general approach builds the tree and visits its nodes. But <b>often</b> it can be done <b>during parsing</b>, without an explicit tree.'],
            ['And 3 * 2 + 4?', 'T.val = 3 * 2 = 6, then E.val = 6 + 4 = 10.']
          ]} />
        `),

        // 20 · synthesized vs inherited
        page(html`
          <${H1}>${t('Which way do values travel?', 'القيم ماشية في أنهي اتجاه؟')}</${H1}>
          <${P} small=${true}>${X('Attributes come in two kinds. The question is always: <b>where does it get its value from?</b>', 'الـ attributes نوعين. والسؤال دايمًا: <b>بتاخد قيمتها منين؟</b>')}</${P}>
          <div className="hf-c7-vs hf-in">
            <div className="hd">${A ? 'الـ Synthesized ↑' : 'Synthesized ↑'}</div><div className="hd">${A ? 'الـ Inherited ↓' : 'Inherited ↓'}</div>
            ${(A ? [
              ['بياخد قيمته من الـ <b>child nodes</b> بتاعته.', 'بياخد قيمته من الـ <b>parent و/أو الـ siblings</b>.'],
              ['في <bdi dir="ltr">S → ABC</bdi> الـ S بياخد من A وB وC.', 'في <bdi dir="ltr">S → ABC</bdi> الـ A بياخد من S وB وC، والـ B من S وA وC، والـ C من S وA وB.'],
              ['<b>عمره ما</b> بياخد من الـ parent أو الـ siblings.', 'المعلومة بتنزل <b>لتحت</b> (وللجنب) في الشجرة.'],
              ['بيطلع <b>لفوق</b> من الـ leaves للـ root، زي <bdi dir="ltr">E → E + T</bdi>.', 'مثال: الـ symbol table بيتعمله <b>synthesized</b> من الـ declaration و<b>inherited</b> للـ scope بتاعه.']
            ] : [
              ['Gets its value from its <b>child nodes</b>.', 'Gets its value from its <b>parent and/or siblings</b>.'],
              ['S → ABC: S takes values from A, B, C.', 'S → ABC: A takes from S, B, C; B from S, A, C; C from S, A, B.'],
              ['<b>Never</b> takes values from parent or siblings.', 'Information passes <b>downwards</b> (and sideways).'],
              ['Passed <b>upwards</b>, leaves → root, e.g. E → E + T.', 'Example: a symbol table is <b>synthesized</b> by a declaration and <b>inherited</b> by its scope.']
            ]).map((r, i) => html`<${React.Fragment} key=${i}><div>${T(r[0])}</div><div>${T(r[1])}</div></${React.Fragment}>`)}
          </div>
          <${Grow} />
          <${Hand}>${t('Our trick: an inheritance comes down from your parents. A synthesized value is built up from the kids.', 'حيلة من عندنا: الـ inherited زي الورث، بييجي من الأهل والإخوات. والـ synthesized بيتركّب من العيال.')}</${Hand}>
        `, { sec: t('Synthesized vs inherited', 'الـ Synthesized والـ inherited') }),

        // 21 · figure
        page(html`
          <${H2}>${t('Tap a node: where does it take from?', 'دوس على node: بتاخد منين؟')}</${H2}>
          <${Fig} name="cc-syn-inh" />
        `),

        // 22–23 · fireside chat
        page(html`
          <${Fireside} sub=${t('Tonight: a Synthesized and an Inherited attribute argue about who does the real work.', 'قعدة الليلة: attribute من نوع Synthesized وواحد Inherited بيتخانقوا مين فيهم بيشتغل بجد.')} />
          <${Chat} names=${[t('Synthesized', 'الـ Synthesized'), t('Inherited', 'الـ Inherited')]} lines=${A ? [
            [0, 'أنا بعتمد على <b>العيال</b>. قيمتي جاية من الـ <b>child nodes</b> بتوعي.'],
            [1, 'وأنا ببص <b>لفوق</b> على الـ parent، و<b>للجنب</b> على الـ siblings.'],
            [0, 'أنا <b>عمري ما</b> باخد حاجة من الـ parent أو الـ siblings. القيم عندي بتطلع <b>لفوق</b>، من الـ leaves للـ root.'],
            [1, 'المعلومة عندي بتنزل <b>لتحت</b>. لو أنا على الـ B في الـ production دي، أقدر آخد من S وA وC:<span class="ltr">S → ABC</span>'],
            [0, 'وفي نفس الـ production الـ S بياخد من A وB وC. ده أنا.'],
            [0, 'وكل مثال <bdi dir="ltr">2 + 3 * 4</bdi> كان أنا: كل <code>val</code> اتحسب من الـ children.']
          ] : [
            [0, 'I rely on the <b>kids</b>. My value comes from my <b>child nodes</b>.'],
            [1, 'I look <b>up</b> at my parent, and <b>sideways</b> at my siblings.'],
            [0, 'I <b>never</b> take anything from parent or siblings. My values go <b>up</b>, from the leaves to the root.'],
            [1, 'Mine come <b>down</b>. If I\'m on B in S → ABC, I can take from S, A and C.'],
            [0, 'And in that same S → ABC, S takes from A, B and C. That\'s me.'],
            [0, 'The whole 2 + 3 * 4 example was me: every <code>val</code> computed from the children.']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Synthesized', 'الـ Synthesized'), t('Inherited', 'الـ Inherited')]} start=${1} lines=${A ? [
            [1, 'ماشي، بس إحنا بنشتغل مع بعض. الـ <b>symbol table</b> بيتعمله synthesized من الـ <b>declaration</b>...'],
            [0, '...ويتعمله <b>inherited</b> للـ <b>scope</b> بتاع الـ declaration ده. شغل فريق.']
          ] : [
            [1, 'Fine, but we work together. A <b>symbol table</b> is synthesized by a <b>declaration</b>...'],
            [0, '...and <b>inherited</b> by the <b>scope</b> of that declaration. Teamwork.']
          ]} />
          <${Grow} />
          ${mq('m-inh', /^Inherited attributes get their attribute values from/)}
        `),

        // 24 · sort
        page(html`
          <${Box} kind="pencil" title=${t('Synthesized or inherited?', 'يا ترى synthesized ولا inherited؟')}><p className="hf-p small">${X('Tap <b>S</b> for synthesized or <b>I</b> for inherited, then check.', 'دوس <b>S</b> للـ synthesized أو <b>I</b> للـ inherited، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="si" bins=${[['S', 'Synthesized'], ['I', 'Inherited']]} items=${A ? [
            ['بياخد قيمته من الـ child nodes', 0],
            ['بياخد قيمته من الـ parent و/أو الـ siblings', 1],
            ['في <bdi dir="ltr">S → ABC</bdi> الـ S بياخد من A وB وC', 0],
            ['في <bdi dir="ltr">S → ABC</bdi> الـ B بياخد من S وA وC', 1],
            ['المعلومة بتنزل لتحت (وللجنب)', 1],
            ['قيمة <bdi dir="ltr">E.val</bdi> في <bdi dir="ltr">E → E + T</bdi>', 0],
            ['الـ symbol table اللي الـ declaration بيعمله', 0],
            ['الـ symbol table بالنسبة للـ scope بتاع الـ declaration', 1]
          ] : [
            ['Gets its value from its child nodes', 0],
            ['Gets its value from its parent and/or siblings', 1],
            ['In S → ABC: S takes values from A, B and C', 0],
            ['In S → ABC: B takes values from S, A and C', 1],
            ['Information passes downwards (and sideways)', 1],
            ['E.val in E → E + T', 0],
            ['The symbol table, as a declaration makes it', 0],
            ['The symbol table, as the declaration\'s scope gets it', 1]
          ]} />
        `),

        // 25 · definite assignment
        page(html`
          <${H1}>${t('Was x ever given a value?', 'هو x خد قيمة أصلًا؟')}</${H1}>
          <${Def}>${X('<b>Definite assignment analysis</b> is a <b>data-flow analysis</b> that ensures a variable is <b>always assigned before it is used</b>.',
            'الـ <b>Definite assignment analysis</b> ده <b>data-flow analysis</b> بيتأكد إن المتغير <b>دايمًا بياخد قيمة قبل ما يتستخدم</b>.')}</${Def}>
          <${P} small=${true}>${t('At any point, a variable is in one of three states:', 'المتغير في أي نقطة بيبقى في حالة من تلات حالات:')}</${P}>
          <${UL} items=${A ? [
            'الحالة <b>Definitely assigned</b>: متأكدين إنه أخد قيمة.',
            'الحالة <b>Definitely unassigned</b>: متأكدين إنه ماخدش قيمة.',
            'الحالة <b>Unknown</b>: ممكن يكون أخد قيمة وممكن لأ.'
          ] : [
            '<b>Definitely assigned</b>: known with certainty to be assigned.',
            '<b>Definitely unassigned</b>: known with certainty to be unassigned.',
            '<b>Unknown</b>: may or may not be assigned.'
          ]} />
          <${Grow} />
          <${Talk} who="table" flip=${true}>${X('"Definitely known" and "indefinitely assigned" are <b>not</b> states. Only these three.', 'الـ "definitely known" والـ "indefinitely assigned" <b>مش</b> حالات. التلاتة دول بس.')}</${Talk}>
        `, { sec: t('Definite assignment', 'الـ Definite assignment') }),

        // 26 · figure
        page(html`
          <${H2}>${t('Flip the paths, watch the state', 'غيّر المسارات واتفرّج على الحالة')}</${H2}>
          <${Fig} name="cc-def-assign" />
        `),

        // 27 · which state? + the doctor's question
        page(html`
          <${Box} kind="pencil" title=${t('Which state is x in at print(x)?', 'الـ x في أنهي حالة لما نوصل للـ print؟')}><p className="hf-p small">${t('Three snippets (ours, not the slides\'):', 'تلات أكواد (من عندنا، مش من السلايدز):')}</p>
            <${Gap} h=${4} />
            <div className="hf-c7-snip">${[
              ['int x = 1;\nprint(x);', t('definitely assigned', 'الحالة definitely assigned')],
              ['int x;\nprint(x);', t('definitely unassigned', 'الحالة definitely unassigned')],
              ['int x;\nif (c) x = 1;\nprint(x);', t('unknown: only one path assigns x', 'الحالة unknown: مسار واحد بس بيدّي x قيمة')]
            ].map(([c, a], i) => html`<div key=${i}><pre>${c}</pre><${Reveal} id=${'da' + i} label=${t('Show', 'ورّيني')}><span className="hf-c7-ans">${a}</span></${Reveal}></div>`)}</div></${Box}>
          <${Grow} />
          <${Hand}>${t('the third one is the figure\'s "one path assigns x" case', 'التالت هو نفس حالة "مسار واحد بس" اللي في الرسمة')}</${Hand}>
        `),

        // 28–30 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctor's papers and revision sheet. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكتورة والـ revision sheet. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('e1', /Semantic analysis uses .* grammar in order to transform/)}
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${t('Hint: the two lines you learned by heart.', 'تلميح: السطرين اللي حفظتهم صمّ.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e2', /SDT is an abbreviation/)}
          <${Gap} h=${2} />
          ${mq('e3', /Attaching attributes to each non-terminal/)}
        `),
        page(html`
          ${mq('e4', /Type checking is normally done during/)}
          <${Gap} h=${2} />
          ${mq('e5', /parse tree showing the value of attributes/i)}
        `),
        page(html`
          ${mq('e6', /known with certainty to be assigned/i)}
          <${Gap} h=${4} />
          <${Hand} red=${true}>${t('three states only: definitely assigned, definitely unassigned, unknown', 'تلات حالات بس: الـ definitely assigned والـ definitely unassigned والـ unknown')}</${Hand}>
          <${Grow} />
          <${Talk} who="dev">${t('Exam corner done. Bring on the bullet points.', 'خلّصنا ركن الامتحان. هات الخلاصة.')}</${Talk}>
        `),

        // 31 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>semantic analysis</b> بيشيّك على المعنى بالـ syntax tree والـ symbol table، وبيجمع الـ type information.',
            'بياخد الـ <b>syntax tree</b> ويطلّع الـ <b>annotated syntax tree</b>، والـ type checking أثناء الـ SDT.',
            'فيه ست semantic errors، أولهم الـ type mismatch والـ undeclared variable.',
            'الـ <b>attribute grammar</b> هو CFG متعلّق على الـ <b>non-terminals</b> بتوعه attributes.',
            'الـ <b>SDT</b> اختصار <b>Syntax</b> Directed Translation، وقواعده بتستخدم lexical values وconstants وattributes.',
            'في <bdi dir="ltr">2 + 3 * 4</bdi> الـ root بيطلع <b>14</b>، بـ depth-first traversal واحد bottom-up.',
            'الـ <b>synthesized</b> من الـ children لفوق، والـ <b>inherited</b> من الـ parent والـ siblings لتحت.',
            'التلات حالات هي الـ definitely assigned والـ definitely unassigned والـ unknown.'
          ] : [
            '<b>Semantic analysis</b> checks the program makes sense, using the syntax tree and symbol table, and gathers type information.',
            'Input: the <b>syntax tree</b>. Output: the <b>annotated syntax tree</b>. Type checking happens during SDT.',
            'Six errors: type mismatch, undeclared variable, reserved identifier misuse, multiple declaration, out-of-scope access, parameter mismatch.',
            'An <b>attribute grammar</b> is a CFG with attributes attached to its <b>non-terminals</b>.',
            '<b>SDT</b> = <b>Syntax</b> Directed Translation: rules using lexical values, constants and attributes.',
            'In 2 + 3 * 4 the root gets <b>14</b>, in one depth-first, bottom-up traversal.',
            '<b>Synthesized</b>: from the children, upwards. <b>Inherited</b>: from parent and siblings, downwards.',
            'Three states: definitely assigned, definitely unassigned, unknown.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 32 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 7!', 'خلّصت الفصل السابع!')}</${H1}>
            <${Talk} who="table">${t('Next time it\'s my turn: scoping, binding and symbol tables.', 'المرة الجاية دوري أنا: الـ scoping والـ binding والـ symbol tables.')}</${Talk}>
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

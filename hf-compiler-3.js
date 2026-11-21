// Head First chapter for Compiler Design Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// NFA vs DFA, transition tables and the lecture's 3-step NFA → DFA conversion (subset construction).
// Every fact comes from the lecture's notes; analogies are marked as ours. ‡ marks a slide error or a point the notes add beyond the slides.
// Subset-construction results were worked by hand twice and are also recomputed here by the Builder from the edges.
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-cc3')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc3';
    s.textContent = `
.hfb .hf-c3-tt{ border-collapse:collapse; font:600 14px/1.2 var(--mono); color:var(--ink); margin:0 auto; }
.hfb .hf-c3-tt th, .hfb .hf-c3-tt td{ border:1.5px solid var(--hf-line); padding:5px 10px; text-align:center; min-width:46px; }
.hfb .hf-c3-tt th{ background:var(--hf-grey); font:800 13.5px/1.2 var(--body); }
.hfb .hf-c3-tt td:first-child{ font-weight:800; text-align:left; background:var(--hf-grey); }
.hfb .hf-c3-tt td.hf-c3-hot{ color:var(--hf-red); font-weight:800; background:color-mix(in srgb, var(--hf-red) 9%, var(--paper)); }
.hfb .hf-c3-leg{ font:500 13px/1.2 var(--body); color:var(--graphite); text-align:center; margin:4px 0 0; }
.hfb .hf-c3-signs{ display:grid; gap:6px; }
.hfb .hf-c3-sign{ display:grid; grid-template-columns:34px 1fr; gap:8px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 9px; background:var(--paper); }
.hfb .hf-c3-sign > b{ display:grid; place-items:center; width:30px; height:30px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 16px/1 var(--body); }
.hfb .hf-c3-sign > span{ font-size:14.5px; line-height:1.3; }
.hfb .hf-c3-not{ border-style:dashed; border-color:var(--faint); }
.hfb .hf-c3-not > b{ background:var(--hf-red); }
.hfb .hf-c3-steps{ display:grid; gap:7px; }
.hfb .hf-c3-step{ display:grid; grid-template-columns:auto 1fr; gap:9px; align-items:start; }
.hfb .hf-c3-step > b{ font:800 13px/1 var(--body); background:var(--hf-line); color:var(--paper); border-radius:5px; padding:6px 7px; white-space:nowrap; }
.hfb .hf-c3-step > span{ font-size:14.5px; line-height:1.34; }
/* the subset-construction builder */
.hfb .hf-c3-bld{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-c3-bld table{ border-collapse:collapse; width:100%; font:600 13.5px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-c3-bld th, .hfb .hf-c3-bld td{ border:1.5px solid var(--hf-line); padding:4px 5px; text-align:center; height:34px; }
.hfb .hf-c3-bld th{ background:var(--hf-grey); font:800 13.5px/1 var(--mono); }
.hfb .hf-c3-bld td.hf-c3-lab{ font-weight:800; white-space:nowrap; background:var(--hf-grey); text-align:left; width:84px; }
.hfb .hf-c3-bld td.hf-c3-wait{ color:var(--graphite); font-weight:500; }
.hfb .hf-c3-bld td.hf-c3-nw{ color:var(--hf-k); font-weight:800; }
.hfb .hf-c3-bld td.hf-c3-bad{ background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); }
.hfb .hf-c3-bld tr.hf-c3-cur td.hf-c3-lab{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-c3-chips{ display:inline-flex; gap:3px; }
.hfb .hf-c3-chips button{ width:25px; height:26px; padding:0; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:700 13px/1 var(--mono); cursor:pointer; }
.hfb .hf-c3-chips button[aria-pressed="true"]{ background:var(--hf-k); border-color:var(--hf-k); color:var(--paper); }
.hfb .hf-c3-eps{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; font:700 14px/1 var(--mono); }
.hfb .hf-c3-msg{ font-size:14px; line-height:1.3; margin:0; }
.hfb .hf-c3-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-c3-row .hf-btn{ padding:7px 9px; }
.hfb .hf-c3-done{ animation:hf-c3-pop .6s ease-out both; }
@keyframes hf-c3-pop{ from{ background:color-mix(in srgb, var(--ok) 30%, var(--paper)); } }
@media (prefers-reduced-motion: reduce){ .hfb .hf-c3-done{ animation:none; } }
.hf-ar .hf-c3-sign > span, .hf-ar .hf-c3-step > span, .hf-ar .hf-c3-msg, .hf-ar .hf-c3-leg{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.5; }
.hf-ar .hf-c3-step > b{ font-family:"IBM Plex Sans Arabic", var(--body); }
`;
    document.head.appendChild(s);
  }

  // a static transition table; hot = [[row, col]] cells to mark in red
  function TT({ head, rows, hot, leg }) {
    const isHot = (r, c) => (hot || []).some(([a, b]) => a === r && b === c);
    return html`<div className="hf-in"><table className="hf-c3-tt" dir="ltr"><thead><tr>${head.map((h, i) => html`<th key=${i}>${h}</th>`)}</tr></thead>
      <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => html`<td key=${j} className=${isHot(i, j) ? 'hf-c3-hot' : ''}>${c}</td>`)}</tr>`)}</tbody></table>
      ${leg && html`<p className="hf-c3-leg">${leg}</p>`}</div>`;
  }

  // the two exam NFAs from the notes, as edges; the Builder works the subset construction out from these
  const NFA = {
    ex1: { states: ['1', '2', '3'], syms: ['0', '1'], start: '1', fin: ['3'], edges: [['1', '0', '3'], ['3', '0', '1'], ['3', '1', '3'], ['3', '1', '2'], ['2', '0', '3']] },
    ex2: { states: ['1', '2', '3'], syms: ['a', 'b'], start: '1', fin: ['1'], edges: [['1', 'b', '2'], ['1', 'ε', '3'], ['2', 'a', '2'], ['2', 'a', '3'], ['2', 'b', '3'], ['3', 'a', '1']] }
  };
  function solve(M) {
    const srt = a => M.states.filter(q => a.includes(q));
    const nx = (q, x) => M.edges.filter(e => e[0] === q && e[1] === x).map(e => e[2]);
    const clo = a => { const r = a.slice(); for (let i = 0; i < r.length; i++) nx(r[i], 'ε').forEach(t => { if (!r.includes(t)) r.push(t); }); return srt(r); };
    const mv = (a, x) => clo([].concat(...a.map(q => nx(q, x))));
    const key = a => a.join(',');
    const start = clo([M.start]);
    const rows = [start], res = [], born = {};
    for (let i = 0; i < rows.length; i++) {
      const r = {};
      M.syms.forEach(x => { const t = mv(rows[i], x); r[x] = t; if (t.length && !rows.some(z => key(z) === key(t))) { rows.push(t); born[i + ':' + x] = true; } });
      res.push(r);
    }
    return { start, rows, res, born, eps: M.edges.some(e => e[1] === 'ε'), key, fin: a => a.some(q => M.fin.includes(q)) };
  }
  const setL = a => a.length ? '{' + a.join(',') + '}' : '∅';

  // Be the subset construction: fill one DFA row at a time; each new set you find gets its own row
  function Builder({ id, nfa }) {
    const ar = useAr();
    const M = NFA[nfa], S = solve(M);
    const [st, setSt] = H.K.useSlot(id, { e: S.eps ? 0 : 1, k: 0, p: {}, c: [] });
    const [bad, setBad] = useState(null);
    const k = st.k, done = k >= S.rows.length;
    const has = (a, q) => (a || []).includes(q);
    const tog = (arr, q) => M.states.filter(z => z === q ? !has(arr, z) : has(arr, z));
    // rows found so far: the start set plus every new set produced by the rows already filled
    let found = 1; for (let i = 0; i < k && i < S.rows.length; i++) M.syms.forEach(x => { if (S.born[i + ':' + x]) found++; });
    const chips = (arr, on) => html`<span className="hf-c3-chips">${M.states.map(q => html`<button key=${q} aria-pressed=${String(has(arr, q))} aria-label=${'state ' + q} onClick=${() => on(tog(arr, q))}>${q}</button>`)}</span>`;
    const same = (a, b) => S.key(M.states.filter(q => has(a, q))) === S.key(b);
    const checkRow = () => { const wrong = M.syms.filter(x => !same(st.p[x], S.res[k][x])); if (wrong.length) setBad(wrong); else { setBad(null); setSt(Object.assign({}, st, { k: k + 1, p: {} })); } };
    const showRow = () => { setBad(null); setSt(Object.assign({}, st, { e: 1, k: Math.min(S.rows.length, (st.e ? k : 0) + 1), p: {} })); };
    const showAll = () => { setBad(null); setSt({ e: 1, k: S.rows.length, p: {}, c: S.start }); };
    const reset = () => { setBad(null); setSt({ e: S.eps ? 0 : 1, k: 0, p: {}, c: [] }); };
    const finals = S.rows.filter(S.fin).length;
    return html`<div className="hf-c3-bld hf-in">
      ${S.eps && html`<div className="hf-c3-eps" dir="ltr"><span>E(${M.start}) =</span>${st.e ? html`<b style=${{ color: 'var(--hf-k)' }}>${setL(S.start)}</b>` : chips(st.c, c => setSt(Object.assign({}, st, { c })))}</div>`}
      ${!st.e ? html`<div className="hf-c3-row">
          <button className="hf-btn solid" onClick=${() => { if (same(st.c, S.start)) { setBad(null); setSt(Object.assign({}, st, { e: 1 })); } else setBad(['e']); }}>${ar ? 'صحّح الـ closure' : 'Check the closure'}</button>
          <button className="hf-btn" onClick=${() => { setBad(null); setSt(Object.assign({}, st, { e: 1, c: S.start })); }}>${ar ? 'ورّيني الـ closure' : 'Show the closure'}</button></div>
        ${bad && html`<p className="hf-hand red">${ar ? 'الـ closure فيها الـ state نفسها، وكل state توصلها بالـ ε من غير ما تقرا input.' : 'The closure holds the state itself plus every state its ε edges reach without input.'}</p>`}` : html`
      <table dir="ltr"><thead><tr><th>DFA</th>${M.syms.map(x => html`<th key=${x}>${x}</th>`)}</tr></thead><tbody>
        ${S.rows.slice(0, Math.max(found, done ? S.rows.length : 0)).map((r, i) => {
          const cur = i === k && !done, mk = (i === 0 ? '→' : '') + (done && S.fin(r) ? '*' : '');
          return html`<tr key=${i} className=${cur ? 'hf-c3-cur' : ''}><td className="hf-c3-lab">${mk ? mk + ' ' : ''}${setL(r)}</td>
            ${M.syms.map(x => i < k ? html`<td key=${x} className=${'hf-c3-done' + (S.born[i + ':' + x] ? ' hf-c3-nw' : '')}>${setL(S.res[i][x])}</td>`
              : cur ? html`<td key=${x} className=${bad && bad.includes(x) ? 'hf-c3-bad' : ''}>${chips(st.p[x], v => { setBad(null); setSt(Object.assign({}, st, { p: Object.assign({}, st.p, { [x]: v }) })); })}</td>`
              : html`<td key=${x} className="hf-c3-wait">…</td>`)}</tr>`; })}
      </tbody></table>
      ${done ? html`<p className="hf-c3-msg">${T3(ar ? `<b>خلصت!</b> <bdi dir="ltr">${S.rows.length}</bdi> DFA states، والـ final منهم <bdi dir="ltr">${finals}</bdi>: كل set فيها <bdi dir="ltr">${M.fin.join(',')}</bdi>. الملوّن set جديدة، فبقالها row.`
          : `<b>Done!</b> ${S.rows.length} DFA states, ${finals} of them final: every set containing ${M.fin.join(',')}. Coloured = a new set, so it got its own row.`)}</p>`
        : bad ? html`<p className="hf-hand red">${ar ? (S.eps ? 'خد الـ union لـ moves كل state في الـ set، وبعدين الـ ε-closure بتاعته.' : 'خد الـ union لـ moves كل state في الـ set.') : S.eps ? "Take the union of every member's moves, then its ε-closure." : "Take the union of every member's moves."}</p>`
        : html`<p className="hf-c3-msg">${T3(ar ? `املا صف <bdi dir="ltr">${setL(S.rows[k])}</bdi>: دوس على الـ states اللي بتوصلها، ولو مفيش يبقى <bdi dir="ltr">∅</bdi>.` : `Fill the row for ${setL(S.rows[k])}: tap the states it reaches (none = ∅).`)}</p>`}
      <div className="hf-c3-row">
        ${!done && html`<button className="hf-btn solid" onClick=${checkRow}>${ar ? 'صحّح الصف' : 'Check the row'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${showRow}>${ar ? 'ورّيني الصف' : 'Show the row'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${showAll}>${ar ? 'ورّيني الكل' : 'Show all'}</button>`}
        ${(done || k > 0) && html`<button className="hf-btn" onClick=${reset}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div>`}
    </div>`;
  }
  const T3 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  H.chapters.compiler[3] = {
    title: 'NFA vs DFA and NFA → DFA', kicker: 'Chapter 3', run: 'nfa vs dfa',
    ar: { title: 'الـ NFA والـ DFA والتحويل بينهم', kicker: 'الفصل 3', run: 'الـ NFA والـ DFA' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T, Reveal } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[3] && window.AR.compiler.lectures[3].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const L = s => `<span class="ltr">${s}</span>`;   // an LTR line inside Arabic text
      const B = s => `<bdi dir="ltr">${s}</bdi>`;        // a short LTR piece inside Arabic text
      return [
        // 0 · warm-up (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter you met <b>finite automata</b>: circles for states, arrows for transitions, a double circle for a final state. You also heard two names: <b>NFA</b> and <b>DFA</b>. This chapter is about telling them apart, and turning one into the other.',
            'في الفصل اللي فات اتعرفت على الـ <b>finite automata</b>: دواير للـ states، أسهم للـ transitions، ودايرة مزدوجة للـ final state. وسمعت اسمين: <b>NFA</b> و<b>DFA</b>. الفصل ده عن إزاي تفرّق بينهم، وإزاي تحوّل واحد للتاني.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('A state <b>q0</b> has a loop on <b>0</b>, and also an arrow <b>q0 –0→ q1</b>. You are in q0 and you read a 0. Where do you go?',
            'فيه state اسمها <b>q0</b> عليها loop على <b>0</b>، وكمان سهم:' + L('q0 –0→ q1') + 'إنت واقف في q0 وقريت 0. هتروح فين؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You fill the DFA tables right on the page.', '<b>حل التمارين.</b> هتملا جداول الـ DFA على الصفحة نفسها.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are traps from the doctors' papers.", '<b>خلّي بالك!</b> دي فخاخ من امتحانات الدكاترة.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slide error, or a point the notes add beyond the slides.', 'معناها غلطة في السلايد، أو حاجة النوتس زوّدتها على السلايدز.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا.')}</span></div>
          </div>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>Compiler Design` : html`Chapter three<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("The Machine That Can't Make Up Its Mind", 'الماكينة اللي مش عارفة تقرر')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('NFA vs DFA, and NFA → DFA', 'الـ NFA والـ DFA، والتحويل من NFA لـ DFA')}</p></div>
          <${P}>${X('Back to the warm-up: from q0 on a 0 you can <b>stay in q0</b> or <b>go to q1</b>. Both. The machine has a choice, and that makes it <b>non-deterministic</b>.',
            'نرجع لسؤال البداية: من q0 على 0 تقدر <b>تفضل في q0</b> أو <b>تروح q1</b>. الاتنين. الماكينة قدامها اختيار، وده اللي بيخليها <b>non-deterministic</b>.')}</${P}>
          <${Talk} who="dev">${X('A machine with choices? How does the computer pick one?', 'ماكينة قدامها اختيارات؟ والكمبيوتر هيختار إزاي؟')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X("It doesn't have to. You'll turn that <b>NFA</b> into a <b>DFA</b> with exactly one next state every time.", 'مش محتاج يختار. إنت هتحوّل الـ <b>NFA</b> ده لـ <b>DFA</b> فيه next state واحدة بس كل مرة.')}</${Talk}>
          <${P} small=${true}>${X("In this chapter: the <b>three signs</b> of an NFA, the <b>NFA vs DFA</b> table, <b>transition tables</b>, and the lecture's <b>3-step conversion</b> on the doctors' own exam NFAs.",
            'في الفصل ده: <b>العلامات التلاتة</b> بتاعة الـ NFA، وجدول الـ <b>NFA مقابل الـ DFA</b>، والـ <b>transition tables</b>، وطريقة المحاضرة <b>في 3 خطوات</b> للتحويل على الـ NFAs بتاعة امتحانات الدكاترة.')}</${P}>
        `, { sec: t('Meet the NFA', 'اتعرّف على الـ NFA') }),

        // 2 · what makes an NFA
        page(html`
          <${H1}>${t('What makes a machine an NFA?', 'إيه اللي يخلّي الماكينة NFA؟')}</${H1}>
          <${Def}>${X('An <b>NFA</b> (Non-Deterministic Finite Automaton) has <b>one or more</b> of these characteristics:', 'الـ <b>NFA</b> (Non-Deterministic Finite Automaton) بيبقى فيه <b>واحدة أو أكتر</b> من الصفات دي:')}</${Def}>
          <div className="hf-c3-signs hf-in">
            <div className="hf-c3-sign"><b>1</b><span>${X('It <b>contains ε</b>, an empty-string transition.', 'فيه <b>' + B('ε') + '</b>، يعني transition بالـ empty string.')}</span></div>
            <div className="hf-c3-sign"><b>2</b><span>${X('It contains a <b>loop with an input symbol</b> followed by a <b>transition with the same input symbol</b>.', 'فيه <b>loop على input symbol</b> وبعده <b>transition بنفس الـ symbol</b>.')}</span></div>
            <div className="hf-c3-sign"><b>3</b><span>${X('It has <b>multiple paths</b> with the same input string that it can recognize.', 'فيه <b>أكتر من path</b> لنفس الـ input string يقدر يتعرّف عليها.')}</span></div>
          </div>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': a DFA is a train on one track. An NFA is a traveller at a fork who takes every road at once.", 'تشبيه من عندنا: الـ DFA قطر ماشي على قضيب واحد. الـ NFA مسافر عند مفترق طرق وبيمشي في كل الطرق مرة واحدة.')}</${Hand}>
          <${Grow} />
          <${P} small=${true}>${t("One sign is enough. The next three pages take them one at a time, on the slides' own drawings.", 'علامة واحدة كفاية. الصفحات الجاية بتاخدهم واحدة واحدة، على رسومات السلايدز نفسها.')}</${P}>
        `, { sec: t('The three signs', 'العلامات التلاتة') }),

        // 3 · sign 1
        page(html`
          <${H2}>${t('Sign 1: it contains ε', 'العلامة 1: فيه ε')}</${H2}>
          <${P} small=${true}>${X("The slide's machine: <b>a</b> is the start state and also final. Its edges:", 'ماكينة السلايد: الـ <b>a</b> هي الـ start state وكمان final. والـ edges بتاعتها:')}</${P}>
          <${Code} lines=${[['a –ε→ b', t('no input read!', 'من غير ما يقرا حاجة!')], 'b –0→ a', 'a –1→ c', ['c –0→ c', t('a loop', 'loop')], 'c –0,1→ b']} />
          <${P} small=${true}>${X('The ε edge is taken <b>without reading any input</b>. So before reading anything, the machine is already in <b>{a, b}</b>, the ε-closure of a.',
            'الـ ' + B('ε') + ' edge بيتاخد <b>من غير ما يقرا أي input</b>. يعني قبل ما يقرا أي حاجة، الماكينة بتبقى في <b>' + B('{a, b}') + '</b>، وده الـ ' + B('ε-closure') + ' بتاع a.')}</${P}>
          <${Talk} who="compiler" flip=${true}>${X("A DFA is <b>not capable</b> of using an empty-string transition. See an ε, say NFA.", 'الـ DFA <b>مش قادر</b> يستخدم empty-string transition. شفت ' + B('ε') + '؟ قول NFA.')}</${Talk}>
          <${Hand} red=${true} arrow="up">${X('so the exam\'s "automaton with ε symbol is said to be…" is an <b>NFA</b>', 'فسؤال الامتحان عن الـ automaton اللي فيه ' + B('ε') + ' إجابته <b>NFA</b>')}</${Hand}>
        `),

        // 4 · sign 2
        page(html`
          <${H2}>${t('Sign 2: a loop plus the same symbol', 'العلامة 2: loop ومعاه نفس الـ symbol')}</${H2}>
          <${P} small=${true}>${X("The slide's machine: <b>q0</b> is the start state with a loop on <b>0,1</b>; <b>q2</b> is final.", 'ماكينة السلايد: الـ <b>q0</b> هي الـ start state وعليها loop على <b>0,1</b>، والـ <b>q2</b> هي الـ final.')}</${P}>
          <${Code} lines=${[['q0 –0,1→ q0', t('the loop reads 0', 'الـ loop بيقرا 0')], ['q0 –0→ q1', t('…and so does this', '…وده كمان بيقرا 0')], 'q1 –1→ q2']} />
          <${P} small=${true}>${X('On a <b>0</b>, q0 can <b>stay</b> in q0 or <b>move</b> to q1. One (state, symbol) pair, two next states.', 'على <b>0</b>، الـ q0 ممكن <b>تفضل</b> في q0 أو <b>تروح</b> q1. زوج (state, symbol) واحد، وليه اتنين next states.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('The loop is <b>not</b> the problem. The problem is the loop <b>plus another edge on the same symbol</b>. A loop by itself does NOT make an automaton non-deterministic: <b>a DFA may contain loops</b>.',
            'الـ loop نفسه <b>مش</b> المشكلة. المشكلة إن الـ loop <b>ومعاه edge تاني بنفس الـ symbol</b>. الـ loop لوحده مش بيخلّي الـ automaton non-deterministic: <b>الـ DFA ممكن يبقى فيه loops</b>.')}</p></${Box}>
          <${Hand} red=${true} tilt=${true}>${t('the exam says "Any loop causes the automaton to be nondeterministic": False', 'الامتحان بيقول إن أي loop بيخليه nondeterministic: غلط')}</${Hand}>
        `),

        // 5 · sign 3
        page(html`
          <${H2}>${t('Sign 3: many paths, one string', 'العلامة 3: paths كتير لـ string واحدة')}</${H2}>
          <${P} small=${true}>${X("Slide 3's machine: <b>A</b> loops on 0,1; <b>A –0→ C</b>; <b>A –1→ B</b>; <b>B –1→ C</b>; <b>C</b> loops on 0,1. <b>B</b> and <b>C</b> are final. The slide says: try <b>001</b>.",
            'ماكينة slide 3: الـ <b>A</b> عليها loop على 0,1، والـ <b>C</b> كمان، والـ edges:' + L('A –0→ C; A –1→ B; B –1→ C') + 'والـ <b>B</b> والـ <b>C</b> final. السلايد بتقول: جرّب <b>001</b>.')}</${P}>
          <${Code} lines=${[['A –0→ A –0→ A –1→ B', t('final', 'final')], ['A –0→ A –0→ C –1→ C', t('final', 'final')], ['A –0→ C –0→ C –1→ C', t('final', 'final')]]} />
          <${P} small=${true}>${X('Three different paths read the same <b>001</b>, and all three end in a final state. A DFA could never do that: it has exactly one path for each string.',
            'تلات paths مختلفين بيقروا نفس الـ <b>001</b>، والتلاتة بيخلصوا في final state. الـ DFA عمره ما يعمل كده: ليه path واحد بس لكل string.')}</${P}>
          <${P} small=${true}>${X('‡ The slide only says "try 001"; the three paths are worked out in the notes.', '‡ السلايد بتقول "جرّب 001" بس، والتلات paths دول النوتس هي اللي طلّعتهم.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('B and C are <b>both</b> final. Is having two final states another sign of an NFA?', 'الـ B والـ C <b>الاتنين</b> final. هل إن يكون فيه two final states علامة تانية للـ NFA؟')}</p></${Box}>
        `),

        // 6 · the figure
        page(html`
          <${H2}>${t('Feed them a string and watch', 'اديهم string واتفرج')}</${H2}>
          <${Fig} name="cc-nfa-signs" />
        `),

        // 7 · not signs
        page(html`
          <${Box} kind="watch" title=${t('Watch it: what does NOT make an NFA', 'خلّي بالك: إيه اللي مش بيخلّيه NFA')}>
            <div className="hf-c3-signs" style=${{ marginTop: '2px' }}>
              <div className="hf-c3-sign hf-c3-not"><b>✗</b><span>${X('<b>Loops.</b> A DFA may contain a loop or more.', '<b>الـ loops.</b> الـ DFA ممكن يبقى فيه loop أو أكتر.')}</span></div>
              <div className="hf-c3-sign hf-c3-not"><b>✗</b><span>${X('<b>Several accept states.</b> The answer to the Brain Power: no.', '<b>أكتر من accept state.</b> وده جواب سؤال "شغّل مخك": لأ.')}</span></div>
            </div>
            <p className="hf-p small" style=${{ marginTop: '6px' }}>${X('And the other way round: an NFA does <b>not need a loop</b>. ε alone is enough.', 'والعكس كمان: الـ NFA <b>مش محتاج loop</b>. الـ ' + B('ε') + ' لوحدها كفاية.')}</p></${Box}>
          ${mq('m-cond', /condition will cause any automaton/)}
        `),

        // 8 · sort
        page(html`
          <${Box} kind="pencil" title=${t('NFA or DFA?', 'NFA ولا DFA؟')}><p className="hf-p small">${X('Tap <b>N</b> if it describes an NFA, <b>D</b> if it describes a DFA. Then check.', 'دوس <b>N</b> لو الكلام عن NFA، و<b>D</b> لو عن DFA. وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="nd" bins=${[['N', 'NFA'], ['D', 'DFA']]} items=${A ? [
            ['فيه edge ' + B('a –ε→ b'), 0],
            ['الـ q0 عليها loop على 0، وكمان ' + B('q0 –0→ q1'), 0],
            ['فيه loops، بس لكل (state, symbol) next state واحدة', 1],
            ['فيه تلات final states، وكل move ليها next state واحدة', 1],
            ['الـ Q على a ممكن تروح Q أو T', 0],
            ['الـ string ' + B('001') + ' ليها تلات paths', 0],
            ['الـ next state محددة بوضوح', 1],
            ['أي input string بياخد وقت أقل', 1],
            ['يقدر يستخدم empty-string transition', 0]
          ] : [
            ['Has an edge a –ε→ b', 0],
            ['q0 loops on 0 and also has q0 –0→ q1', 0],
            ['Has loops, but one next state per (state, symbol)', 1],
            ['Has three final states, one next state per move', 1],
            ['On a, Q can go to Q or to T', 0],
            ['The string 001 has three paths', 0],
            ['The next possible state is clearly set', 1],
            ['Runs any input string in less total time', 1],
            ['Can use an empty string transition', 0]
          ]} />
        `, { sec: t('Exercise: NFA or DFA?', 'تمرين: NFA ولا DFA؟') }),

        // 9–10 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: a DFA and an NFA go through slide 4's comparison table, row by row.", 'قعدة الليلة: DFA وNFA بيعدّوا على جدول المقارنة بتاع slide 4، صف صف.')} />
          <${Chat} names=${['DFA', 'NFA']} lines=${A ? [
            [0, 'أنا <b>مش قادر</b> أستخدم empty-string transition. خالص.'],
            [1, 'وأنا <b>أقدر</b>. الـ ' + B('ε') + ' edge بيخليني أتنقل من غير ما أقرا حاجة.'],
            [0, 'عندي لكل state وsymbol، <b>عدد الـ next state واحد</b>. الـ next state بتاعتي <b>محددة بوضوح</b>.'],
            [1, 'السلايد بتقول إن عندي «<b>صفر أو واحدة</b>» ‡…'],
            [1, '…بس بصراحة، كل زوج input symbol وstate ممكن يبقى ليه <b>next states كتير</b>.']
          ] : [
            [0, "I'm <b>not capable</b> of using an empty string transition. Ever."],
            [1, 'I <b>can</b>. An ε edge lets me move without reading a thing.'],
            [0, 'For each state and symbol, the <b>number related to the next state is one</b>. My next state is <b>clearly set</b>.'],
            [1, 'The slide says mine is "<b>either zero or one</b>" ‡…'],
            [1, '…but honestly, every pair of input symbol and state may give me <b>many possible next states</b>.']
          ]} />
        `, { sec: t('NFA vs DFA', 'الـ NFA مقابل الـ DFA') }),
        page(html`
          <${Chat} names=${['DFA', 'NFA']} lines=${A ? [
            [0, 'وعشان كده <b>الوقت الكلي</b> لتشغيل أي input string <b>أقل</b> معايا.'],
            [1, 'ماشي، الوقت عندي <b>أكبر</b>. بس أنا بلف في كذا state مع بعض.'],
            [0, 'وعلى فكرة، عندي <b>loops</b> أنا كمان. محدش يقولك إن الـ loop بيعمل NFA.'],
            [1, 'وأي حاجة أنا بقبلها، إنت تقدر تقبلها: فيه <b>DFA ليّا دايمًا</b>، بالـ subset construction.'],
            [0, 'يعني إحنا نفس القوة. بس أنا أسرع.']
          ] : [
            [0, 'Which is why the <b>total time</b> to run any input string is <b>less</b> with me.'],
            [1, 'Fine, my running time is <b>larger</b>. But I get to be in several states at once.'],
            [0, "By the way, I have <b>loops</b> too. Don't let anyone tell you a loop makes an NFA."],
            [1, 'And whatever I accept, you can accept too: there is <b>always a DFA</b> for me, by the subset construction.'],
            [0, 'Same power, then. I just run faster.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('‡ Slide 4\'s table says the NFA\'s number of next states is "either zero or one". In fact an NFA may have <b>zero, one or more</b> next states for a (state, symbol) pair, as the table\'s own last row says ("many possible next states").',
            '‡ جدول slide 4 بيقول إن عدد الـ next states في الـ NFA «صفر أو واحدة». بس في الحقيقة الـ NFA ممكن يبقى ليه <b>صفر أو واحدة أو أكتر</b> لكل (state, symbol)، زي ما آخر صف في الجدول نفسه بيقول:' + L('"many possible next states"'))}</p></${Box}>
        `),

        // 11 · the figure
        page(html`
          <${H2}>${t("Slide 4's two machines, side by side", 'ماكينتين slide 4 جنب بعض')}</${H2}>
          <${Fig} name="cc-nfa-vs-dfa" />
        `),

        // 12 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني الـ DFA مينفعش يبقى فيه loops؟', 'لأ، ينفع. الـ DFA ممكن يبقى فيه loop أو أكتر (سؤال صح وغلط في امتحان <bdi dir="ltr">2023/24</bdi>: <b>صح</b>). الممنوع إن يبقى فيه اتنين next states لنفس الـ (state, symbol).'],
            ['والـ NFA لازم يبقى فيه loop؟', 'لأ. الـ ' + B('ε') + ' لوحدها كفاية.'],
            ['الـ ' + B('ε') + ' بتغيّر الـ language اللي الماكينة بتقبلها؟', 'لأ. الـ ' + B('ε') + ' مش بتستهلك input، و' + B('sε = s') + '. وإجابة الميدترم <b>False</b>.'],
            ['الـ NFA أقوى من الـ DFA؟', 'لأ، هما نفس القوة. لكل NFA فيه DFA بيقبل نفس الـ language، بالـ subset construction. والاتنين بيتعرّفوا على الـ regular expressions بس.']
          ] : [
            ['So a DFA can\'t have loops?', 'It can. "A DFA may contain a loop or more" is <b>True</b> (2023/24 paper). What it can\'t have is two next states for the same (state, symbol).'],
            ['Must an NFA contain a loop?', 'No. ε alone is enough.'],
            ['Does ε change the language the machine accepts?', 'No. ε consumes no input, and sε = s. The midterm\'s answer: <b>False</b>.'],
            ['Is an NFA more powerful than a DFA?', 'No, they are equally powerful. For every NFA there is a DFA accepting the same language, by the subset construction. Both recognize only regular expressions.']
          ]} />
        `),

        // 13 · transition tables
        page(html`
          <${H1}>${t('Drawings are nice. Tables are faster.', 'الرسم حلو. بس الجدول أسرع.')}</${H1}>
          <${Def}>${X('A <b>transition table</b> is a tabular representation of an automaton: <b>rows = states</b>, <b>columns = input symbols</b>, each cell = the next state(s), and <b>"-"</b> = no transition.',
            'الـ <b>transition table</b> طريقة نكتب بيها الـ automaton في جدول: <b>الصفوف = الـ states</b>، و<b>الأعمدة = الـ input symbols</b>، وكل خانة = الـ next state أو الـ states، و<b>"-"</b> = مفيش transition.')}</${Def}>
          <${P} small=${true}>${X("Slide 5's automaton: <b>S</b> is the start state, <b>F</b> is final, and the edges are:", 'الـ automaton بتاع slide 5: الـ <b>S</b> هي الـ start state، والـ <b>F</b> final، والـ edges:')}</${P}>
          <${Code} lines=${['S –a→ P    S –b→ Q', 'P –b→ R    R –b→ F', ['Q –a→ Q', t('a loop', 'loop')], 'Q –a→ T', ['T –b→ T', t('a loop', 'loop')], 'T –a→ F']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Before you turn the page: which cell of this table will hold <b>two</b> states?', 'قبل ما تقلب: أنهي خانة في الجدول ده هيبقى فيها <b>اتنين</b> states؟')}</p></${Box}>
        `, { sec: t('Transition tables', 'الـ Transition tables') }),

        // 14 · the figure
        page(html`
          <${H2}>${t('Watch it fill, row by row', 'اتفرج عليه وهو بيتملا صف صف')}</${H2}>
          <${Fig} name="cc-trans-table" />
        `),

        // 15 · match the cells
        page(html`
          <${Box} kind="pencil" title=${t('Fill the cells', 'املا الخانات')}><p className="hf-p small">${t("Use slide 5's edges from two pages back. Tap a cell, then tap what goes in it.", 'دوس على الخانة، وبعدين على اللي فيها (من edges بتاعة slide 5).')}</p></${Box}>
          <${Match} id="cells" left=${['(S, a)', '(S, b)', '(P, a)', '(Q, a)', '(R, b)', '(T, b)']} right=${['T', 'Q, T', 'P', '-', 'F', 'Q']} answer=${[2, 5, 3, 1, 4, 0]} />
          <${Grow} />
          <${Hand} red=${true} arrow="up">${X('(Q, a) = Q, T is the only cell with two next states: that makes it an NFA. And "-" just means no transition.', 'خانة ' + B('(Q, a) = Q, T') + ' هي الوحيدة اللي فيها اتنين next states، وده اللي بيخليه NFA. والـ "-" يعني مفيش transition.')}</${Hand}>
        `),

        // 16 · NFA → DFA, the plan
        page(html`
          <${H1}>${t('Turning an NFA into a DFA', 'تحويل الـ NFA لـ DFA')}</${H1}>
          <${Talk} who="dev">${X('Can <b>every</b> NFA become a DFA? Even one with ε?', 'ينفع <b>أي</b> NFA يتحوّل لـ DFA؟ حتى لو فيه ' + B('ε') + '؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('Every one. It is called the <b>subset construction</b>, and the lecture does it in three steps.', 'أيوه، أي واحد. اسمها الـ <b>subset construction</b>، والمحاضرة بتعملها في تلات خطوات.')}</${Talk}>
          <div className="hf-c3-steps hf-in">
            <div className="hf-c3-step"><b>${t('Step 1', 'الخطوة 1')}</b><span>${X('Build the first transition table <b>with an ε column</b>: every state reaches itself by ε.', 'اعمل أول transition table <b>وفيه عمود ' + B('ε') + '</b>: كل state بتوصل لنفسها بالـ ' + B('ε') + '.')}</span></div>
            <div className="hf-c3-step"><b>${t('Step 2', 'الخطوة 2')}</b><span>${X('Build the second table <b>without ε</b>: start from the start state (its ε-closure). Every new <b>SET</b> of states in a cell becomes a new row. Repeat until no new sets appear.', 'اعمل تاني table <b>من غير ' + B('ε') + '</b>: ابدأ من الـ start state (الـ ' + B('ε-closure') + ' بتاعها). أي <b>set</b> جديدة تظهر في خانة تبقى row جديد. كرّر لحد ما مفيش sets جديدة.')}</span></div>
            <div className="hf-c3-step"><b>${t('Step 3', 'الخطوة 3')}</b><span>${X('Draw the DFA. Every set containing an original final state is <b>final</b>. An empty cell is a <b>dead state</b>, or simply no transition.', 'ارسم الـ DFA. أي set فيها final state من الأصل تبقى <b>final</b>. والخانة الفاضية <b>dead state</b>، أو ببساطة مفيش transition.')}</span></div>
          </div>
          <${Hand} tilt=${true}>${t('Our trick: each DFA state is a team of NFA states that travel together.', 'حيلة من عندنا: كل DFA state عبارة عن فريق من الـ NFA states ماشيين مع بعض.')}</${Hand}>
        `, { sec: t('NFA → DFA in 3 steps', 'التحويل في 3 خطوات') }),

        // 17 · step 1
        page(html`
          <${H2}>${t("Step 1 on slide 6's NFA", 'الخطوة 1 على الـ NFA بتاع slide 6')}</${H2}>
          <${P} small=${true}>${X('<b>A</b> is the start state with a loop on <b>0,1</b>, and <b>A –0→ B</b>. <b>B</b> is final. (Sign 2 again: on 0, A can stay or go to B.)', 'الـ <b>A</b> هي الـ start state وعليها loop على <b>0,1</b>، والـ <b>B</b> final، وفيه:' + L('A –0→ B') + ' (العلامة 2 تاني: على 0، الـ A ممكن تفضل أو تروح B.)')}</${P}>
          <${TT} head=${['State', '0', '1', 'ε']} rows=${[['→ A', 'A,B', 'A', 'A'], ['* B', '-', '-', 'B']]} hot=${[[0, 3], [1, 3]]} leg=${t('→ start   * final', 'الـ → يعني start، والـ * يعني final')} />
          <${UL} items=${A ? [
            'خانة ' + B('(A, 0)') + ': الـ A ممكن ترجع لنفسها <b>أو</b> تروح B، فهي <b>' + B('A,B') + '</b>.',
            'خانة ' + B('(A, 1)') + ': الـ loop بس هو اللي بيقرا 1، فهي <b>A</b>.',
            'الـ B مفيش edges طالعة منها، فخاناتها <b>-</b>.',
            'عمود الـ ' + B('ε') + ': مفيش ' + B('ε') + ' edges خالص، بس <b>كل state بتوصل لنفسها بالـ ' + B('ε') + '</b>.'
          ] : [
            '(A, 0): A can loop back to A <b>or</b> go to B, so the cell is <b>A,B</b>.',
            '(A, 1): only the loop reads 1, so the cell is <b>A</b>.',
            'No edge leaves B, so its 0 and 1 cells are <b>-</b>.',
            'The ε column: there are no ε edges at all, but <b>every state reaches itself by ε</b>.'
          ]} />
          <${Hand} red=${true} arrow="up">${t("B's ε cell is B, never \"-\"", 'خانة الـ ε بتاعة B هي B، مش "-"')}</${Hand}>
        `),

        // 18 · figure
        page(html`
          <${H2}>${t('The first table, cell by cell', 'أول جدول، خانة خانة')}</${H2}>
          <${Fig} name="cc-first-table" />
        `),

        // 19 · step 2
        page(html`
          <${H2}>${t('Step 2: the table without ε', 'الخطوة 2: الجدول من غير ε')}</${H2}>
          <${P} small=${true}>${X("Start from A (no ε edges, so its ε-closure is just A). For a set, a cell is the <b>union</b> of every member's moves.", 'ابدأ من A (مفيش ' + B('ε') + ' edges، فالـ ' + B('ε-closure') + ' بتاعها A بس). ولأي set، الخانة هي <b>الـ union</b> لـ moves كل state فيها.')}</${P}>
          <${Code} lines=${[['A     0 → {A,B}', t('new set: new row', 'set جديدة يعني row جديد')], 'A     1 → A', ['{A,B} 0 → {A,B}', t('A gives A,B; B gives -', 'الـ A بتدّي A,B والـ B ولا حاجة')], ['{A,B} 1 → A', t('no new sets: stop', 'مفيش sets جديدة: خلاص')]]} />
          <${TT} head=${['State', '0', '1']} rows=${[['→ A', '{A,B}', 'A'], ['* {A,B}', '{A,B}', 'A']]} leg=${t('the second transition table (without empty transition)', 'تاني transition table (من غير empty transition)')} />
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('No new set, no new row. That stopping rule is the whole of step 2.', 'مفيش set جديدة، يبقى مفيش row جديد. قاعدة الوقوف دي هي الخطوة 2 كلها.')}</p></${Box}>
        `),

        // 20 · step 3
        page(html`
          <${H2}>${t('Step 3: draw the DFA', 'الخطوة 3: ارسم الـ DFA')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>A</b> هي الـ start state وعليها loop على 1.',
            'فيه ' + B('A –0→ {A,B}') + '، والـ ' + B('{A,B}') + ' عليها loop على 0.',
            'فيه ' + B('{A,B} –1→ A') + '.',
            'الـ ' + B('{A,B}') + ' هي الـ <b>final</b> state، لأنها فيها الـ B، والـ B كانت final في الـ NFA.'
          ] : [
            '<b>A</b> is the start state, with a loop on 1.',
            'A –0→ {A,B}, and {A,B} has a loop on 0.',
            '{A,B} –1→ A.',
            '{A,B} is the <b>final</b> state, because it contains B, and B was final in the NFA.'
          ]} />
          <${P} small=${true}>${X('Every cell now holds exactly <b>one</b> state. No ε, no choices: a DFA.', 'كل خانة دلوقتي فيها state <b>واحدة</b> بس. مفيش ' + B('ε') + '، ومفيش اختيارات: ده DFA.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('Feed the DFA <b>0110</b>, then <b>01</b>. Which one ends in {A,B}? What do all the accepted strings have in common?', 'ادّي الـ DFA الـ string ' + B('0110') + '، وبعدين ' + B('01') + '. أنهي واحدة بتخلص في ' + B('{A,B}') + '؟ وإيه المشترك بين كل الـ strings المقبولة؟')}</p></${Box}>
          <${Reveal} id="r-end0"><p className="hf-hand">${X('0110 is accepted (it ends in {A,B}); 01 is not: the last 1 sends you back to A. It accepts the strings that end in 0.', 'الـ ' + B('0110') + ' مقبولة (بتخلص في ' + B('{A,B}') + ')، والـ ' + B('01') + ' لأ: آخر 1 بيرجّعك لـ A. يعني بيقبل الـ strings اللي بتخلص بـ 0.')}</p></${Reveal}>
        `),

        // 21 · figure
        page(html`
          <${H2}>${t('All three steps, animated', 'التلات خطوات، متحركين')}</${H2}>
          <${Fig} name="cc-subset" />
        `),

        // 22 · interview: ε-closure
        page(html`
          <${Interview} title=${t('ε-closure, exposed', 'الـ ε-closure على المكشوف')} sub=${t('This week: the quiet helper that decides where every DFA starts.', 'حوار الأسبوع: الـ helper الهادي اللي بيحدد كل DFA هيبدأ منين.')} lines=${A ? [
            ['المذيع', 'عرّفنا بنفسك.'],
            ['الـ ε-closure', 'أنا الـ state نفسها، ومعاها كل state توصلها بالـ ' + B('ε') + ' edges بس، <b>من غير ما تقرا أي input</b>. ومن غير الـ state نفسها عمري ما أبقى كامل.'],
            ['المذيع', 'بتشتغل فين؟'],
            ['الـ ε-closure', 'في حتتين. الـ <b>start state بتاعة الـ DFA</b> هي الـ closure بتاعة الـ start state بتاعة الـ NFA. و<b>بعد كل move</b>، الخانة بتاخد الـ closure بتاعة الناتج.'],
            ['المذيع', 'ولو مفيش ' + B('ε') + ' خالص؟'],
            ['الـ ε-closure', 'ببقى الـ state لوحدها، زي ' + B('E(2) = {2}') + ' في الامتحان. وعشان كده الخطوة 1 بتكتب كل state في خانة الـ ' + B('ε') + ' بتاعتها.'],
            ['المذيع', 'وبتغيّر الـ language؟'],
            ['الـ ε-closure', 'أبدًا. الـ ' + B('ε') + ' مش بتستهلك input، و' + B('sε = s') + '.']
          ] : [
            ['Head First', 'Introduce yourself.'],
            ['ε-closure', 'I am a state <b>plus every state its ε edges reach</b>, without reading any input. And I always contain the state itself.'],
            ['Head First', 'Where do you work?'],
            ['ε-closure', 'Two places. The <b>DFA start state</b> is the ε-closure of the NFA start state. And <b>after every move</b>, the cell takes the ε-closure of the result.'],
            ['Head First', 'And when there is no ε at all?'],
            ['ε-closure', "Then I'm just the state itself, like E(2) = {2} in the exam. That's why step 1 writes each state into its own ε cell."],
            ['Head First', 'Do you change the language?'],
            ['ε-closure', 'Never. ε consumes no input: sε = s.']
          ]} />
        `, { sec: t('ε-closure', 'الـ ε-closure') }),

        // 23 · exam NFA 1
        page(html`
          <${H1}>${t("The doctors' favourite NFA", 'الـ NFA المفضّل عند الدكاترة')}</${H1}>
          <${P} small=${true}>${X('It appears in the <b>2021–2025</b> papers (sometimes drawn with states S, R, M). Start <b>1</b>, final <b>3</b>:', 'جه في امتحانات <b>' + B('2021–2025') + '</b> (ساعات بيترسم بـ states اسمها S و R و M). الـ start هو <b>1</b>، والـ final هو <b>3</b>:')}</${P}>
          <${Code} lines=${['1 –0→ 3', '3 –0→ 1', ['3 –1→ 3', t('a loop on 1…', 'loop على 1…')], ['3 –1→ 2', t('…and another 1!', '…و1 تانية!')], '2 –0→ 3']} />
          <${Box} kind="exam" title=${t('Why is it non-deterministic?', 'ليه non-deterministic؟')}><p className="hf-p small">${X('State 3 has a <b>loop on 1</b> AND a <b>transition on the same symbol 1</b> to state 2, so (3, 1) has two next states. Sign 2.',
            'الـ state 3 عليها <b>loop على 1</b> وكمان <b>transition بنفس الـ symbol 1</b> للـ state 2، فالـ ' + B('(3, 1)') + ' ليها اتنين next states. العلامة 2.')}</p></${Box}>
          <${Grow} />
          <${Hand} red=${true}>${X('No ε here, so the DFA starts at {1} itself.', 'مفيش ' + B('ε') + ' هنا، فالـ DFA بيبدأ من ' + B('{1}') + ' نفسها.')}</${Hand}>
        `, { sec: t('Exam NFA 1', 'NFA الامتحان 1') }),

        // 24 · builder 1
        page(html`
          <${Box} kind="pencil" title=${t('Be the subset construction', 'خليك إنت الـ subset construction')}><p className="hf-p small">${X('Fill each row: which states does the set reach on <b>0</b>, and on <b>1</b>? A new set gets its own row.', 'املا كل صف: الـ set دي بتوصل لأنهي states على <b>0</b>، وعلى <b>1</b>؟ أي set جديدة بيبقالها row.')}</p></${Box}>
          <${Builder} id="b1" nfa="ex1" />
        `),

        // 25 · figure
        page(html`
          <${H2}>${t('The same conversion, step by step', 'نفس التحويل، خطوة خطوة')}</${H2}>
          <${Fig} name="cc-subset-exam1" />
        `),

        // 26 · watch it on exam 1
        page(html`
          <${Box} kind="watch"><ul className="hf-ul">${(A ? [
            'الـ ' + B('{1}') + ' على 1 بتروح <b>' + B('∅') + '</b>، يعني dead state: الـ state 1 مفيش عليها edge بـ 1.',
            'الـ final هي كل set فيها 3: <b>' + B('{3}') + ' و' + B('{2,3}') + ' و' + B('{1,3}') + '</b>.',
            'الـ start ' + B('{1}') + ' <b>مش</b> final. وعمرك ما هتشوف ' + B('{2}') + ' لوحدها.'
          ] : [
            '{1} on 1 = <b>∅</b>, a dead state: state 1 has no edge labelled 1.',
            'Final = every set containing 3: <b>{3}, {2,3}, {1,3}</b>.',
            'The start {1} is <b>not</b> final. And {2} alone never appears.'
          ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
          ${mq('m-31', /from \{3\} on input 1/)}
        `),

        // 27 · exam NFA 2 (with ε)
        page(html`
          <${H1}>${t('Now with ε', 'ودلوقتي بالـ ε')}</${H1}>
          <${P} small=${true}>${X('From the <b>2024/25</b> paper. State <b>1</b> is both start and final:', 'من امتحان <b>' + B('2024/25') + '</b>. الـ state <b>1</b> هي الـ start والـ final مع بعض:')}</${P}>
          <${Code} lines=${['1 –b→ 2', ['1 –ε→ 3', t('free move', 'move ببلاش')], '2 –a→ 2', '2 –a,b→ 3', '3 –a→ 1']} />
          <${Code} lines=${[['E(1) = {1,3}', t('ε-closures; 1 –ε→ 3', 'بسبب الـ ε edge')], 'E(2) = {2}', 'E(3) = {3}']} />
          <${P} small=${true}>${X('So the DFA starts at <b>{1,3}</b>, and the final DFA states are the sets containing <b>1</b>. The start set is final too (→*).', 'يبقى الـ DFA بيبدأ من <b>' + B('{1,3}') + '</b>، والـ final states في الـ DFA هي الـ sets اللي فيها <b>1</b>. والـ start نفسها final كمان (' + B('→*') + ').')}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${X('After every move, take the ε-closure: landing on 1 means landing on {1,3}.', 'بعد كل move خد الـ ' + B('ε-closure') + ': لو وصلت 1 يبقى وصلت ' + B('{1,3}') + '.')}</${Hand}>
        `, { sec: t('Exam NFA 2 (with ε)', 'NFA الامتحان 2 (بالـ ε)') }),

        // 28 · builder 2
        page(html`
          <${Box} kind="pencil" title=${t('Your turn, with ε', 'دورك، بالـ ε')}><p className="hf-p small">${X('First the ε-closure of the start state. Then fill the rows: for each set, the moves on <b>a</b> and <b>b</b>, then their ε-closure.', 'الأول الـ ' + B('ε-closure') + ' بتاعة الـ start state. وبعدين املا الصفوف: لكل set، الـ moves على <b>a</b> و<b>b</b>، وبعدين الـ ' + B('ε-closure') + ' بتاعتهم.')}</p></${Box}>
          <${Builder} id="b2" nfa="ex2" />
        `),

        // 29 · figure
        page(html`
          <${H2}>${t('ε-closures first, then the table', 'الـ ε-closures الأول، وبعدين الجدول')}</${H2}>
          <${Fig} name="cc-subset-exam2" />
        `),

        // 30 · watch it on exam 2
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>{2,3} on a</b>: 2 gives {2,3}; 3 gives 1, whose ε-closure is {1,3}. Union = <b>{1,2,3}</b>.',
            '<b>' + B('{2,3}') + ' على a</b>: الـ 2 بتدّي ' + B('{2,3}') + '، والـ 3 بتدّي 1، والـ closure بتاعتها ' + B('{1,3}') + '. والـ union بتاعهم <b>' + B('{1,2,3}') + '</b>.')}</p>
            <p className="hf-p small" style=${{ marginTop: '4px' }}>${X('Five DFA states, two final: <b>{1,3}</b> and <b>{1,2,3}</b>.', 'خمس DFA states، منهم اتنين final: <b>' + B('{1,3}') + '</b> و<b>' + B('{1,2,3}') + '</b>.')}</p></${Box}>
          ${mq('m-start', /The DFA start state is/)}
        `),

        // 31–34 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers and this year's midterm. Tap an answer to see why.", 'أسئلة حقيقية من امتحانات الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m-said', /automaton with ε symbol is said/)}
          <${Gap} h=${4} />
          ${mq('m-epsdfa', /can exist in DFA/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-loop', /nondeterministic"$/)}
          <${Gap} h=${6} />
          ${mq('m-every', /For every NFA a deterministic/)}
        `),
        page(html`
          <${Hand} red=${true}>${X('"Same NFA" = the doctors\' favourite: 1 –0→ 3, 3 –0→ 1, 3 –1→ 3, 3 –1→ 2, 2 –0→ 3', 'يقصد بـ "Same NFA" الـ NFA المفضّل:' + L('1 –0→ 3, 3 –0→ 1, 3 –1→ 3, 3 –1→ 2, 2 –0→ 3'))}</${Hand}>
          ${mq('m-230', /from \{2,3\} on input 0/)}
          <${Grow} />
          <${Talk} who="dev">${X('So that is where the <b>{1,3}</b> row in my table came from!', 'آه، هو ده بقى اللي جاب صف <b>' + B('{1,3}') + '</b> في الجدول بتاعي!')}</${Talk}>
        `),
        page(html`
          ${mq('m-epsch', /accepted by an automaton"$/)}
          <${Gap} h=${6} />
          ${mq('m-acc', /^Any NFA accepts/)}
        `),

        // 34 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>NFA</b> فيه واحدة أو أكتر من دول: ' + B('ε') + '، أو loop على symbol ومعاه transition بنفس الـ symbol، أو أكتر من path لنفس الـ string.',
            'الـ loop لوحده، أو أكتر من final state، <b>مش</b> بيعملوا NFA. والـ NFA مش محتاج loop.',
            'الـ DFA: مفيش ' + B('ε') + '، وnext state واحدة محددة، ووقت أقل. الـ NFA: ممكن next states كتير ‡.',
            'الـ <b>transition table</b>: الصفوف states، والأعمدة symbols، و"-" يعني مفيش transition.',
            'الخطوة 1: جدول بعمود ' + B('ε') + '. الخطوة 2: جدول من غير ' + B('ε') + '، وكل set جديدة تبقى row. الخطوة 3: ارسم.',
            'الـ DFA بيبدأ من الـ ' + B('ε-closure') + ' بتاعة الـ start، وبعد كل move خد الـ closure.',
            'أي set فيها final state من الأصل تبقى final، والـ ' + B('∅') + ' يعني dead state.',
            'التحويل ممكن دايمًا، والـ ' + B('ε') + ' مش بتغيّر الـ language.'
          ] : [
            'An <b>NFA</b> has one or more of: ε; a loop on a symbol plus a transition on the same symbol; multiple paths for the same string.',
            'A loop alone, or several final states, do <b>not</b> make an NFA. An NFA needs no loop.',
            'DFA: no ε, one clearly set next state, less running time. NFA: many possible next states ‡.',
            'A <b>transition table</b>: rows = states, columns = symbols, "-" = no transition.',
            'Step 1: table with an ε column. Step 2: table without ε, every new set = a new row. Step 3: draw the DFA.',
            'The DFA starts at the ε-closure of the NFA start; after every move, take the ε-closure.',
            'Every set containing an original final state is final; ∅ = dead state.',
            'The conversion is always possible, and ε does not change the language.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 35 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="cpu">${t('One next state at a time. Just how I like it.', 'next state واحدة كل مرة. زي ما بحب بالظبط.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [3], t: Date.now() } }}>${t('Quiz me on Lecture 3', 'امتحنّي في محاضرة 3')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 3, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 3, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

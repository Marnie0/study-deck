// Head First chapter for Compiler Design Lecture 6 (built on hf.js), English + Egyptian Arabic, same pages in both.
// LL(1) parsing: FIRST, FOLLOW, the LL(1) conditions, the predictive parsing table M and the stack/input parse.
// Every fact, set, table cell and parse move comes from the lecture's notes (Example 1, Example 2 and the exam grammar);
// our own analogies and tricks are marked as ours. Arabic follows the site's rules (see hf-compiler.js).
// lectures: [6]
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K;
  const { useState } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-cc6')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc6';
    s.textContent = `
.hfb .hf-c6-ll{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:8px; }
.hfb .hf-c6-ll > div{ border:2px solid var(--hf-line); border-radius:8px; padding:6px 6px 8px; text-align:center; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-c6-ll b{ display:block; font:800 40px/1 var(--body); color:var(--hf-k); }
.hfb .hf-c6-ll span{ display:block; font:600 13.5px/1.25 var(--body); color:var(--ink); margin-top:4px; }
.hfb.hf-ar .hf-c6-ll span{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.4; }
.hfb .hf-c6-spg{ display:grid; gap:4px; }
.hfb .hf-c6-spr{ display:grid; grid-template-columns:82px minmax(0,1fr) 13px; gap:4px; align-items:center; padding:3px 4px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-c6-spr.hf-c6-ok{ border-color:var(--ok); }
.hfb .hf-c6-spr.hf-c6-no{ border-color:var(--hf-red); }
.hfb .hf-c6-spl{ font:700 13px/1.1 var(--mono); color:var(--ink); white-space:nowrap; }
.hfb .hf-c6-chips{ display:flex; flex-wrap:wrap; gap:2px; }
.hfb .hf-c6-chips button{ font:700 13.5px/1 var(--mono); min-width:24px; height:28px; padding:0 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-c6-chips button.hf-c6-on{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-c6-mk{ font:800 14px/1 var(--body); }
.hfb .hf-c6-ok .hf-c6-mk{ color:var(--ok); } .hfb .hf-c6-no .hf-c6-mk{ color:var(--hf-red); }
.hfb .hf-c6-fix{ grid-column:1 / -1; font:600 13px/1.2 var(--mono); color:var(--hf-red); padding-left:86px; }
.hfb .hf-c6-tf table, .hfb .hf-c6-tb, .hfb .hf-c6-tr{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.25 var(--mono); color:var(--ink); }
.hfb .hf-c6-tf th, .hfb .hf-c6-tf td, .hfb .hf-c6-tb th, .hfb .hf-c6-tb td, .hfb .hf-c6-tr th, .hfb .hf-c6-tr td{ border:1px solid var(--hf-line); text-align:center; padding:3px 2px; white-space:nowrap; overflow:hidden; }
.hfb .hf-c6-tf thead th, .hfb .hf-c6-tb thead th, .hfb .hf-c6-tr thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-c6-tf tbody th, .hfb .hf-c6-tb tbody th{ background:var(--hf-grey); color:var(--hf-k); font-weight:800; }
.hfb .hf-c6-tf td{ height:30px; padding:0; }
.hfb .hf-c6-tf td button{ width:100%; height:30px; border:0; margin:0; padding:0; font:700 13px/1 var(--mono); color:var(--hf-hand); background:color-mix(in srgb, var(--hf-hand) 13%, var(--paper)); cursor:pointer; }
.hfb .hf-c6-tf td button.hf-c6-sel{ box-shadow:inset 0 0 0 2.5px var(--hf-hand); }
.hfb .hf-c6-tf td button.hf-c6-ok{ color:var(--ink); background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.hfb .hf-c6-tf td button.hf-c6-no{ color:var(--ink); background:color-mix(in srgb, var(--hf-red) 20%, var(--paper)); }
.hfb .hf-c6-cbar{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; min-height:36px; margin-top:7px; }
.hfb .hf-c6-cbar .hf-c6-q{ font:700 13.5px/1 var(--mono); color:var(--hf-hand); }
.hfb .hf-c6-cbar .hf-btn{ font-family:var(--mono); min-width:44px; }
.hfb .hf-c6-tb td.hf-c6-l, .hfb .hf-c6-tr td{ text-align:left; padding-left:5px; }
.hfb .hf-c6-tr td.hf-c6-act{ color:var(--hf-k); }
.hfb .hf-c6-tr tr.hf-c6-cur td{ background:color-mix(in srgb, var(--hf-hand) 12%, var(--paper)); }
.hfb .hf-c6-tr td.hf-c6-qm{ color:var(--hf-hand); font-weight:800; }
.hfb .hf-c6-opts{ display:flex; flex-wrap:wrap; gap:5px; margin-top:7px; }
.hfb .hf-c6-opts .hf-btn{ font:600 13px/1 var(--mono); padding:6px 8px; min-height:32px; }
.hfb .hf-c6-shake{ animation:hf-c6-shake .35s; }
@keyframes hf-c6-shake{ 20%{ transform:translateX(-4px); } 50%{ transform:translateX(4px); } 80%{ transform:translateX(-2px); } }
`;
    document.head.appendChild(s);
  }

  // the three letters of LL(1)
  function Letters() {
    const ar = useAr();
    const L = ar ? [['L', 'الـ input بيتقري من الشمال لليمين'], ['L', 'بيبني leftmost derivation'], ['1', 'بيبص على input symbol واحد قدّام']]
      : [['L', 'scan the input Left to right'], ['L', 'build a Leftmost derivation'], ['1', 'one input symbol of lookahead']];
    return html`<div className="hf-c6-ll" dir="ltr">${L.map(([b, s], i) => html`<div key=${i} className="hf-in" style=${{ animationDelay: calm() ? '0s' : i * 0.18 + 's' }}><b>${b}</b><span dir=${ar ? 'rtl' : null}>${s}</span></div>`)}</div>`;
  }

  // tap the members of each set, then check: rows are [label, answer]
  function SetPick({ id, rows, syms }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const has = (i, s) => (pick[i] || []).includes(s);
    const tog = (i, s) => { const cur = pick[i] || []; setChecked(false); setPick(Object.assign({}, pick, { [i]: cur.includes(s) ? cur.filter(x => x !== s) : cur.concat(s) })); };
    const same = i => { const a = pick[i] || [], b = rows[i][1]; return a.length === b.length && b.every(x => a.includes(x)); };
    const right = rows.filter((_, i) => same(i)).length;
    const setOf = a => '{' + syms.filter(s => a.includes(s)).join(', ') + '}';
    return html`<div className="hf-in">
      <div className="hf-c6-spg" dir="ltr">${rows.map((r, i) => html`<div key=${i} className=${'hf-c6-spr' + (checked ? (same(i) ? ' hf-c6-ok' : ' hf-c6-no') : '')}>
        <span className="hf-c6-spl">${r[0]}</span>
        <span className="hf-c6-chips">${syms.map(s => html`<button key=${s} className=${has(i, s) ? 'hf-c6-on' : ''} aria-pressed=${String(has(i, s))} aria-label=${r[0] + ' contains ' + s} onClick=${() => tog(i, s)}>${s}</button>`)}</span>
        <span className="hf-c6-mk">${checked ? (same(i) ? '✓' : '✗') : ''}</span>
        ${checked && !same(i) ? html`<span className="hf-c6-fix">= ${setOf(r[1])}</span>` : null}</div>`)}</div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح إجاباتي' : 'Check my sets'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; rows.forEach((r, i) => { p[i] = r[1].slice(); }); setPick(p); setChecked(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}${right === rows.length ? '!' : ''}</bdi></span>`}
      </div></div>`;
  }

  // fill the missing cells of a table M: tap a ? cell, then pick its entry ('—' = empty = error)
  function TableFill({ id, nts, ts, M, blanks, opts }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const [sel, setSel] = useState(null);
    const key = (N, t) => N + '|' + t;
    const isBlank = (N, t) => blanks.some(([a, b]) => a === N && b === t);
    const ans = (N, t) => M[N][t] || '—';
    const right = blanks.filter(([N, t]) => pick[key(N, t)] === ans(N, t)).length;
    const selN = sel && sel.split('|')[0], selT = sel && sel.split('|')[1];
    return html`<div className="hf-c6-tf hf-in" dir="ltr">
      <table><thead><tr><th style=${{ width: '36px' }}>M</th>${ts.map(t => html`<th key=${t}>${t}</th>`)}</tr></thead>
        <tbody>${nts.map(N => html`<tr key=${N}><th>${N}</th>${ts.map(t => {
          if (!isBlank(N, t)) return html`<td key=${t}>${M[N][t] || ''}</td>`;
          const k = key(N, t), v = pick[k], st = checked && v != null ? (v === ans(N, t) ? ' hf-c6-ok' : ' hf-c6-no') : '';
          return html`<td key=${t}><button className=${(sel === k ? 'hf-c6-sel' : '') + st} aria-label=${'M[' + N + ', ' + t + ']'} onClick=${() => setSel(sel === k ? null : k)}>${v || '?'}</button></td>`;
        })}</tr>`)}</tbody></table>
      <div className="hf-c6-cbar">${sel ? html`<span className="hf-c6-q">M[${selN}, ${selT}] =</span>${opts[selN].map(o => html`<button key=${o} className="hf-btn" onClick=${() => { setPick(Object.assign({}, pick, { [sel]: o })); setChecked(false); setSel(null); }}>${o}</button>`)}`
        : html`<span className="hf-hand" dir=${ar ? 'rtl' : null}>${ar ? 'دوس على خانة فيها علامة استفهام، واختار الـ entry بتاعها' : 'tap a ? cell, then pick its entry'}</span>`}</div>
      <div className="hf-row" style=${{ marginTop: '4px' }} dir=${ar ? 'rtl' : null}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => { setChecked(true); setSel(null); }}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; blanks.forEach(([N, t]) => { p[key(N, t)] = ans(N, t); }); setPick(p); setChecked(true); setSel(null); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${blanks.length}</bdi></span>`}
      </div></div>`;
  }

  // be the parser: choose each action of Example 1's parse of abd (the notes' table, row by row)
  const ABD = [['S$', 'abd$', 'S → A'], ['A$', 'abd$', "A → aBA'"], ["aBA'$", 'abd$', 'match a'], ["BA'$", 'bd$', 'B → b'], ["bA'$", 'bd$', 'match b'],
    ["A'$", 'd$', "A' → dA'"], ["dA'$", 'd$', 'match d'], ["A'$", '$', "A' → ε"], ['$', '$', 'accept']];
  const ABD_OPTS = ['S → A', "A → aBA'", "A' → dA'", "A' → ε", 'B → b', 'match', 'accept'];
  function BeParser({ id }) {
    const ar = useAr();
    const [done, setDone] = H.K.useSlot(id, 0);
    const [miss, setMiss] = useState(null);
    const rows = ABD, n = rows.length;
    const cur = done < n ? rows[done] : null;
    const topOf = st => st.startsWith("A'") ? "A'" : st[0];
    const want = r => r[2].startsWith('match') ? 'match' : r[2];
    const tap = o => {
      if (!cur) return;
      if (o === want(cur)) { setMiss(null); setDone(done + 1); return; }
      const t = topOf(cur[0]), a = cur[1][0];
      const hint = t === '$' ? (ar ? 'الـ top هو $ والـ input كمان $.' : 'The top is $ and the input is $ too.')
        : /^[a-z]$/.test(t) ? (ar ? html`الـ top هو الـ terminal <bdi dir="ltr">${t}</bdi> وبيساوي الـ input.` : html`The top is the terminal ${t}, equal to the input.`)
        : (ar ? html`الـ top هو non-terminal، فبص في <bdi dir="ltr">M[${t}, ${a}]</bdi>.` : html`The top is a non-terminal: look up M[${t}, ${a}].`);
      setMiss({ o, hint, k: Date.now() });
    };
    return html`<div className="hf-in">
      <div dir="ltr"><table className="hf-c6-tr"><thead><tr><th>Stack</th><th>Input</th><th>Action</th></tr></thead><tbody>
        ${rows.slice(0, Math.min(n, done + 1)).map((r, k) => html`<tr key=${k} className=${k === done ? 'hf-c6-cur' : ''}><td>${r[0]}</td><td>${r[1]}</td>
          ${k < done ? html`<td className="hf-c6-act">${r[2]}</td>` : html`<td className="hf-c6-qm">?</td>`}</tr>`)}</tbody></table></div>
      ${cur ? html`<div key=${miss ? miss.k : 'o'} className=${'hf-c6-opts' + (miss && !calm() ? ' hf-c6-shake' : '')} dir="ltr">${ABD_OPTS.map(o => html`<button key=${o} className="hf-btn" onClick=${() => tap(o)}>${o}</button>`)}</div>`
        : html`<p className="hf-hand" style=${{ marginTop: '6px' }}>${ar ? 'اتعمل accept! والـ productions اللي اخترتها بالترتيب هي الـ leftmost derivation.' : 'Accept! The productions you picked, in order, are the leftmost derivation.'}</p>`}
      ${miss && cur && html`<p className="hf-hand red" style=${{ marginTop: '5px' }}>${ar ? html`مش <bdi dir="ltr">${miss.o}</bdi>. ` : 'Not ' + miss.o + '. '}${miss.hint}</p>`}
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn" onClick=${() => { setDone(n); setMiss(null); }}>${ar ? 'ورّيني الحل كله' : 'Show the whole parse'}</button>
        ${done > 0 && html`<button className="hf-btn" onClick=${() => { setDone(0); setMiss(null); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  // Example 2's table M (the notes' table), right sides only
  const M2 = {
    E: { id: "TE'", '(': "TE'" }, "E'": { '+': "+TE'", ')': 'ε', $: 'ε' }, T: { id: "FT'", '(': "FT'" },
    "T'": { '+': 'ε', '*': "*FT'", ')': 'ε', $: 'ε' }, F: { id: 'id', '(': '(E)' }
  };
  const M2_OPTS = { E: ["TE'", '—'], "E'": ["+TE'", 'ε', '—'], T: ["FT'", '—'], "T'": ["*FT'", 'ε', '—'], F: ['(E)', 'id', '—'] };

  H.chapters.compiler[6] = {
    title: 'LL(1) Parsing: FIRST, FOLLOW and Predictive Parsing Tables',
    kicker: 'Chapter 6',
    run: 'LL(1) parsing',
    ar: { title: 'الـ FIRST والـ FOLLOW وجدول الـ LL(1)', kicker: 'الفصل 6', run: 'الـ LL(1) parsing' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 6);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[6] && window.AR.compiler.lectures[6].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const G2s = ["E → TE'     E' → +TE' | ε", "T → FT'     T' → *FT' | ε", 'F → (E) | id'];
      const GXs = ['S → UVW     U → (S) | aSb | d', 'V → aV | ε  W → cW | ε'];
      return [
        // 0 · how this chapter works + where we left off
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter you met <b>top-down parsing</b>: start at the start symbol and grow the tree down to the input. You also learned to remove <b>left recursion</b>:',
            'في الفصل اللي فات اتعرّفت على الـ <b>top-down parsing</b>: بنبدأ من الـ start symbol ونكبّر الشجرة لتحت لحد الـ input. واتعلمت كمان تشيل الـ <b>left recursion</b>:')}</${P}>
          <${Code} lines=${["A → Aα | β", ["A → βA'", t('becomes', 'بتبقى')], "A' → αA' | ε"]} />
          <${Box} kind="brain"><p className="hf-p small">${X("You are a top-down parser. A is on top of your stack, the next input symbol is <code>a</code>, and the grammar says <code>A → aB | Ad</code>. Which production do you pick? Can you even tell?",
            'إنت top-down parser. الـ A فوق الـ stack، والـ input symbol اللي جاي هو <code>a</code>، والـ grammar بيقول:<span class="ltr">A → aB | Ad</span>هتختار أنهي production؟ وهل أصلًا تقدر تعرف؟')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t('Same rules as always: do the pencil exercises, think at Brain Power, and the red Watch it! boxes are exam traps from the doctors\' papers.', 'نفس القواعد: حل تمارين القلم، وفكّر عند شغّل مخك، وصناديق خلّي بالك الحمرا دي فخاخ من امتحانات الدكاترة.')}</${Hand}>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">6</span><span className="t">${A ? html`الفصل السادس<br/>Compiler Design` : html`Chapter six<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('One Peek Is Enough', 'بصّة واحدة كفاية')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('LL(1) parsing: FIRST, FOLLOW and table M', 'الـ LL(1) parsing والـ FIRST والـ FOLLOW والجدول M')}</p></div>
          <${P}>${X('Imagine a parser that <b>never guesses</b>. It looks at <b>one</b> input symbol, checks a table, and knows exactly which production to use. No going back, ever.',
            'تخيّل parser <b>عمره ما بيخمّن</b>. بيبص على input symbol <b>واحد</b>، يبص في جدول، ويعرف بالظبط يستخدم أنهي production. ومفيش رجوع لورا خالص.')}</${P}>
          <${Talk} who="dev">${X('A parser that reads my mind? What does it need?', 'parser بيقرا أفكاري؟ ده محتاج إيه؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('Two sets per non-terminal, <b>FIRST</b> and <b>FOLLOW</b>, and one table, <b>M</b>. Build those and I never backtrack.', 'مجموعتين لكل non-terminal، الـ <b>FIRST</b> والـ <b>FOLLOW</b>، وجدول واحد اسمه <b>M</b>. ابنيهم وأنا عمري ما هعمل backtracking.')}</${Talk}>
          <${P} small=${true}>${X("By the end of this chapter you'll compute both sets, fill table M, run the parser by hand, and solve the doctors' 12-mark exam question.", 'في آخر الفصل ده هتحسب المجموعتين، وتملا الجدول M، وتشغّل الـ parser بإيدك، وتحل سؤال الدكاترة اللي عليه 12 درجة.')}</${P}>
        `, { sec: t('Meet the predictive parser', 'اتعرّف على الـ predictive parser') }),

        // 2 · the dilemma
        page(html`
          <${H1}>${t("The parser's dilemma", 'حيرة الـ parser')}</${H1}>
          <${P}>${X('A top-down parser keeps replacing the non-terminal on top with one of its productions. When a non-terminal has two, <code>A → α | β</code>, it must <b>choose</b>.',
            'الـ top-down parser طول الوقت بيبدّل الـ non-terminal اللي فوق بـ production من بتوعه. ولما الـ non-terminal يبقى ليه اتنين، <code>A → α | β</code>، لازم <b>يختار</b>.')}</${P}>
          <${Def}>${X('In <b>predictive parsing</b>, if <b>FIRST(α)</b> and <b>FIRST(β)</b> are <b>disjoint</b>, we pick the right A-production just by looking at the <b>next input symbol</b>.',
            'في الـ <b>predictive parsing</b>، لو <b><bdi dir="ltr">FIRST(α)</bdi></b> و<b><bdi dir="ltr">FIRST(β)</bdi></b> مفيش بينهم حاجة مشتركة (<b>disjoint</b>)، بنختار الـ A-production الصح بإننا نبص على <b>الـ input symbol اللي جاي</b> بس.')}</${Def}>
          <${Talk} who="compiler">${X('With <code>F → (E) | id</code>: next symbol <code>(</code>? Then it\'s <code>F → (E)</code>. Next is <code>id</code>? Then <code>F → id</code>. Easy.', 'مع <code>F → (E) | id</code>: الـ symbol اللي جاي <code>(</code>؟ يبقى <code>F → (E)</code>. ولو <code>id</code>؟ يبقى <code>F → id</code>. سهلة.')}</${Talk}>
          <${Grow} />
          <${Hand} arrow="down">${t('try both grammars on the next page, including the Brain Power one', 'جرّب الـ grammar-ين في الصفحة الجاية، ومنهم بتاع شغّل مخك')}</${Hand}>
        `),

        // 3 · first-pick figure
        page(html`
          <${H2}>${t('One symbol picks the production', 'symbol واحد بيختار الـ production')}</${H2}>
          <${Fig} name="cc-first-pick" />
          <${Hand} red=${true}>${A ? html`في <bdi dir="ltr">A → aB | Ad</bdi> الاتنين بيبدأوا بـ a، فبصّة واحدة مش كفاية، ولازم نشيل الـ left recursion الأول.` : 'A → aB | Ad: both start with a. One peek is not enough, so the left recursion has to go first.'}</${Hand}>
        `),

        // 4 · FIRST
        page(html`
          <${H1}>${t('FIRST: who can stand at the front?', 'الـ FIRST: مين ممكن يقف في الأول؟')}</${H1}>
          <${Def}>${X('<b>FIRST(α)</b> is the set of <b>terminals that begin strings derived from α</b>. If <b>α ⇒* ε</b>, then <b>ε</b> is also in FIRST(α).',
            'الـ <b><bdi dir="ltr">FIRST(α)</bdi></b> هي مجموعة الـ <b>terminals اللي ممكن تبدأ بيها أي strings طالعة من α</b>. ولو <b><bdi dir="ltr">α ⇒* ε</bdi></b> يبقى <b>ε</b> كمان بتدخل فيها.')}</${Def}>
          <${UL} items=${A ? [
            'القاعدة <b>1</b>: لو X عبارة عن terminal، يبقى <bdi dir="ltr">FIRST(X) = {X}</bdi>.',
            'القاعدة <b>2</b>: لو <bdi dir="ltr">X → Y1Y2…Yk</bdi>، حط a في <bdi dir="ltr">FIRST(X)</bdi> لو <bdi dir="ltr">a ∈ FIRST(Yi)</bdi> وε في الـ FIRST بتاع كل اللي قبل <bdi dir="ltr">Yi</bdi>. ولو ε في كلهم، ضيف ε.',
            'القاعدة <b>3</b>: لو فيه production <bdi dir="ltr">X → ε</bdi>، ضيف ε لـ <bdi dir="ltr">FIRST(X)</bdi>.'
          ] : [
            '<b>Rule 1</b>: if X is a terminal, FIRST(X) = {X}.',
            '<b>Rule 2</b>: if X → Y1Y2…Yk, put a in FIRST(X) if a ∈ FIRST(Yi) and ε is in all of FIRST(Y1)…FIRST(Yi-1). If ε is in every FIRST(Yj), add ε to FIRST(X).',
            '<b>Rule 3</b>: if X → ε is a production, add ε to FIRST(X).'
          ]} />
          <${Hand} tilt=${true}>${t("Rule 2, our way: if the first symbol can vanish, look through it to the next.", 'القاعدة 2 بطريقتنا: لو أول symbol ممكن يختفي، بص من وراه على اللي بعده.')}</${Hand}>
        `, { sec: t('FIRST', 'الـ FIRST') }),

        // 5 · FIRST figure
        page(html`
          <${H2}>${t('FIRST, production by production', 'الـ FIRST، production ورا production')}</${H2}>
          <${Fig} name="cc-first-sets" />
        `),

        // 6 · Example 2 FIRST worked
        page(html`
          <${H2}>${t('Example 2: the expression grammar', 'مثال 2: الـ expression grammar')}</${H2}>
          <${Code} lines=${G2s} />
          <${UL} items=${A ? [
            'الـ F: الـ <code>(E)</code> بتبدأ بـ <bdi dir="ltr">(</bdi> والـ <code>id</code> terminal، يبقى:<span class="ltr">FIRST(F) = {(, id}</span>',
            'والـ T، لأن F مش بتختفي:<span class="ltr">FIRST(T) = FIRST(F) = {(, id}</span>',
            'والـ E بنفس الطريقة:<span class="ltr">FIRST(E) = FIRST(T) = {(, id}</span>',
            'القاعدة 3 بتدخّل ε في الاتنين دول:<span class="ltr">FIRST(E\') = {+, ε}</span><span class="ltr">FIRST(T\') = {*, ε}</span>'
          ] : [
            'F: <code>(E)</code> begins with ( and <code>id</code> is a terminal, so FIRST(F) = {(, id}.',
            'T → FT\' and F cannot vanish, so FIRST(T) = FIRST(F) = {(, id}.',
            'Same for E: FIRST(E) = FIRST(T) = {(, id}.',
            'Rule 3 puts ε in both: FIRST(E\') = {+, ε} and FIRST(T\') = {*, ε}.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Work bottom up: E starts with T, T starts with F. And ε belongs in FIRST when the symbol can vanish: exactly what the <b>next</b> set forbids.',
            'اشتغل من تحت لفوق: E بتبدأ بـ T وT بـ F. والـ ε بتدخل الـ FIRST لما الـ symbol يقدر يختفي، وده الممنوع في المجموعة <b>الجاية</b>.')}</p></${Box}>
        `),

        // 7 · FOLLOW definition + sentential form figure
        page(html`
          <${H1}>${t('FOLLOW: who comes right after?', 'الـ FOLLOW: مين بييجي بعده؟')}</${H1}>
          <${Def}>${X('<b>FOLLOW(A)</b> is the set of terminals <b>a</b> that can appear <b>immediately to the right of A</b> in some sentential form (S ⇒* αAaβ). If A can be the rightmost symbol, <b>$</b> is in FOLLOW(A). FOLLOW <b>never contains ε</b>.',
            'الـ <b><bdi dir="ltr">FOLLOW(A)</bdi></b> هي الـ terminals اللي ممكن تيجي <b>على يمين A على طول</b> في أي sentential form:<span class="ltr">S ⇒* αAaβ</span>ولو A ممكن تبقى آخر symbol يبقى <b>$</b> فيها. و<b>عمرها ما فيها ε</b>.')}</${Def}>
          <${Fig} name="cc-follow-form" />
        `, { sec: t('FOLLOW', 'الـ FOLLOW') }),

        // 8 · FOLLOW rules
        page(html`
          <${H2}>${t('The three rules for FOLLOW', 'القواعد التلاتة بتاعة الـ FOLLOW')}</${H2}>
          <${UL} items=${A ? [
            'القاعدة <b>1</b>: حط <b>$</b> في <bdi dir="ltr">FOLLOW(S)</bdi>، وS هنا الـ start symbol.',
            'القاعدة <b>2</b>: لو <bdi dir="ltr">A → αBβ</bdi>، كل اللي في <bdi dir="ltr">FIRST(β)</bdi> <b>ما عدا ε</b> بيدخل في <bdi dir="ltr">FOLLOW(B)</bdi>.',
            'القاعدة <b>3</b>: لو <bdi dir="ltr">A → αB</bdi>، أو <bdi dir="ltr">A → αBβ</bdi> و<bdi dir="ltr">FIRST(β)</bdi> فيها ε، يبقى كل اللي في <bdi dir="ltr">FOLLOW(A)</bdi> بيدخل في <bdi dir="ltr">FOLLOW(B)</bdi>.'
          ] : [
            '<b>Rule 1</b>: put <b>$</b> in FOLLOW(S), where S is the start symbol.',
            '<b>Rule 2</b>: if A → αBβ, everything in FIRST(β) <b>except ε</b> is in FOLLOW(B).',
            '<b>Rule 3</b>: if A → αB, or A → αBβ where FIRST(β) contains ε, then everything in FOLLOW(A) is in FOLLOW(B).'
          ]} />
          <${Hand} tilt=${true}>${t("Ours: rule 2 borrows the neighbour's FIRST; rule 3 borrows the parent's FOLLOW.", 'من عندنا: القاعدة 2 بتستلف FIRST الجار، والقاعدة 3 بتستلف FOLLOW الأب.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('When β can vanish you <b>don\'t write ε</b> into FOLLOW(B). You copy <b>FOLLOW(A)</b> instead. "FOLLOW(A) may contain ε" is <b>False</b>.',
            'لما β تقدر تختفي <b>مش بتكتب ε</b> في <bdi dir="ltr">FOLLOW(B)</bdi>، إنت بتنقل <b><bdi dir="ltr">FOLLOW(A)</bdi></b> بدالها. ودي <b>غلط</b>:<span class="ltr">"FOLLOW(A) may contain ε"</span>')}</p></${Box}>
          <${Box} kind="brain"><p className="hf-p small">${X("<code>E' → +TE'</code> tells rule 3 to copy FOLLOW(E') into… FOLLOW(E'). Does that ever add anything?", 'الـ <code>E\' → +TE\'</code> بتقول للقاعدة 3 تنقل <bdi dir="ltr">FOLLOW(E\')</bdi> لـ… <bdi dir="ltr">FOLLOW(E\')</bdi> نفسها. ده بيضيف حاجة أصلًا؟')}</p></${Box}>
        `),

        // 9 · exercise: FOLLOW for Example 2
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Your turn. Use the three rules on Example 2 (E is the start symbol). Tap the members of each FOLLOW set, then check.',
            'دورك. طبّق القواعد التلاتة على مثال 2، والـ start symbol هو E. دوس على العناصر اللي في كل FOLLOW set، وبعدين صحّح.')}</p></${Box}>
          <${Code} lines=${G2s} />
          <${SetPick} id="fo2" syms=${['id', '+', '*', '(', ')', '$', 'ε']} rows=${[
            ['FOLLOW(E)', [')', '$']], ["FOLLOW(E')", [')', '$']], ['FOLLOW(T)', ['+', ')', '$']], ["FOLLOW(T')", ['+', ')', '$']], ['FOLLOW(F)', ['+', '*', ')', '$']]
          ]} />
        `, { sec: t('FOLLOW exercise', 'تمرين الـ FOLLOW') }),

        // 10 · worked answer
        page(html`
          <${H2}>${t('FOLLOW for Example 2, worked', 'الـ FOLLOW بتاع مثال 2، محلول')}</${H2}>
          <${UL} items=${A ? [
            'الـ E: فيها $ (القاعدة 1) و<bdi dir="ltr">)</bdi> من <bdi dir="ltr">F → (E)</bdi> (القاعدة 2):<span class="ltr">FOLLOW(E) = {), $}</span>',
            'الـ E\': في آخر <bdi dir="ltr">E → TE\'</bdi>، فالقاعدة 3 بتنقل <bdi dir="ltr">FOLLOW(E)</bdi>:<span class="ltr">FOLLOW(E\') = {), $}</span>',
            'الـ T: بعدها E\'، والقاعدة 2 بتدّي <bdi dir="ltr">FIRST(E\') − ε = {+}</bdi>، وE\' ممكن تختفي فبنضيف <bdi dir="ltr">FOLLOW(E)</bdi>:<span class="ltr">FOLLOW(T) = {+, ), $}</span>',
            'الـ T\': في آخر <bdi dir="ltr">T → FT\'</bdi>، فبتاخد <bdi dir="ltr">FOLLOW(T)</bdi>:<span class="ltr">FOLLOW(T\') = {+, ), $}</span>',
            'الـ F: بعدها T\'، فبتاخد <bdi dir="ltr">FIRST(T\') − ε = {*}</bdi>، وT\' ممكن تختفي فبنضيف <bdi dir="ltr">FOLLOW(T)</bdi>:<span class="ltr">FOLLOW(F) = {+, *, ), $}</span>'
          ] : [
            'E: $ by rule 1, and ) from F → (E) by rule 2. <b>FOLLOW(E) = {), $}</b>.',
            "E': last in E → TE', so rule 3 copies FOLLOW(E). <b>FOLLOW(E') = {), $}</b>.",
            "T: E' comes after it. Rule 2 gives FIRST(E') − ε = {+}; E' can vanish, so add FOLLOW(E). <b>FOLLOW(T) = {+, ), $}</b>.",
            "T': last in T → FT', so copy FOLLOW(T). <b>FOLLOW(T') = {+, ), $}</b>.",
            "F: T' comes after it. FIRST(T') − ε = {*}; T' can vanish, so add FOLLOW(T). <b>FOLLOW(F) = {+, *, ), $}</b>."
          ]} />
          <${Grow} />
          <${Hand} tilt=${true}>${t("Ours: F sits deepest, so everything that can follow its parents can follow F too. That's why its FOLLOW is the biggest.", 'من عندنا: الـ F قاعدة في أعمق مكان، فأي حاجة ممكن تيجي بعد أهاليها ممكن تيجي بعدها هي كمان. عشان كده الـ FOLLOW بتاعها هو الأكبر.')}</${Hand}>
          <${Hand} red=${true}>${A ? html`وإجابة شغّل مخك: نقل <bdi dir="ltr">FOLLOW(E')</bdi> لنفسها مش بيضيف أي جديد.` : "And the Brain Power: FOLLOW(E') into FOLLOW(E') adds nothing new."}</${Hand}>
        `),

        // 11 · FOLLOW figure
        page(html`
          <${H2}>${t('Watch the rules fire, occurrence by occurrence', 'اتفرج على القواعد وهي شغالة، مكان ورا مكان')}</${H2}>
          <${Fig} name="cc-follow-sets" />
        `),

        // 12–13 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: FIRST and FOLLOW, two sets who swear they don't need each other.", 'قعدة الليلة: الـ FIRST والـ FOLLOW، مجموعتين حالفين إنهم مش محتاجين بعض.')} />
          <${Chat} names=${[t('FIRST', 'الـ FIRST'), t('FOLLOW', 'الـ FOLLOW')]} lines=${A ? [
            [0, 'أنا بقف على <b>الباب الأمامي</b>: الـ terminals اللي ممكن <b>تبدأ</b> بيها الـ strings الطالعة من α.'],
            [1, 'وأنا بقف <b>ورا</b>: الـ terminals اللي ممكن تيجي <b>على يمين A على طول</b>.'],
            [0, 'ولو α تقدر تختفي، بشيل <b>ε</b> في شنطتي.'],
            [1, 'في شنطتي أنا لأ. أنا <b>terminals و$ بس</b>. والـ start symbol دايمًا بياخد <b>$</b> مني.'],
            [0, 'والـ terminal سهل معايا:<span class="ltr">FIRST(a) = {a}</span>'],
            [1, 'بصراحة أنا محتاجك. في <bdi dir="ltr">A → αBβ</bdi> كل اللي في <bdi dir="ltr">FIRST(β)</bdi> ما عدا ε بيدخل في <bdi dir="ltr">FOLLOW(B)</bdi>.'],
            [0, 'هاها! يعني إنت معتمد عليّ.']
          ] : [
            [0, 'I guard the <b>front door</b>: the terminals that can <b>begin</b> strings derived from α.'],
            [1, 'I stand <b>right behind</b>: the terminals that can appear <b>immediately to the right</b> of A.'],
            [0, 'And if α can vanish, I keep <b>ε</b> in my bag.'],
            [1, 'Not in mine. I hold <b>terminals and $ only</b>. And the start symbol always gets its <b>$</b> from me.'],
            [0, 'Terminals are easy for me: FIRST(a) = {a}.'],
            [1, 'Fine, I need you sometimes. In A → αBβ, everything in FIRST(β) except ε goes into FOLLOW(B).'],
            [0, 'Ha! So you depend on me.']
          ]} />
        `, { sec: t('FIRST vs FOLLOW', 'الـ FIRST والـ FOLLOW') }),
        page(html`
          <${Chat} names=${[t('FIRST', 'الـ FIRST'), t('FOLLOW', 'الـ FOLLOW')]} start=${1} lines=${A ? [
            [1, 'وأنا معتمد على نفسي كمان: لما B تبقى في الآخر، أو β تقدر تختفي، بنقل <bdi dir="ltr">FOLLOW(A)</bdi> لـ <bdi dir="ltr">FOLLOW(B)</bdi>.'],
            [0, 'في الجدول أنا اللي بشيل معظم الشغل: لكل a في <bdi dir="ltr">FIRST(α)</bdi> بنحط <bdi dir="ltr">A → α</bdi> في <bdi dir="ltr">M[A, a]</bdi>.'],
            [1, 'ولما <bdi dir="ltr">ε ∈ FIRST(α)</bdi>، مين بيقرر <bdi dir="ltr">A → α</bdi> تروح فين؟ أنا: تحت كل b في <bdi dir="ltr">FOLLOW(A)</bdi>، ومعاهم $.'],
            [0, 'من غيري الـ parser مش هيعرف يختار بين <bdi dir="ltr">α</bdi> و<bdi dir="ltr">β</bdi>.'],
            [1, 'ومن غيري مش هيعرف إمتى يخلّي non-terminal يختفي.'],
            [0, 'طب خلاص، نتصالح. إحنا الاتنين بنعمل الجدول.']
          ] : [
            [1, 'And I depend on myself: when B is last, or β can vanish, I copy FOLLOW(A) into FOLLOW(B).'],
            [0, 'In the table I do most of the work: for each a in FIRST(α), A → α goes in M[A, a].'],
            [1, 'But when ε ∈ FIRST(α), who decides where A → α goes? Me: under every b in FOLLOW(A), $ included.'],
            [0, 'Without me, the parser couldn\'t choose between α and β.'],
            [1, 'And without me, it would never know when to let a non-terminal vanish.'],
            [0, 'Truce, then. Together we make the table.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("The doctors' wrong options are usually the <b>other</b> set: for FOLLOW(T) the trap answer is {(, id}, which is <b>FIRST(T)</b>. For FOLLOW(B) in Example 1 the trap is {b}, which is <b>FIRST(B)</b>.",
            'الاختيارات الغلط بتاعة الدكاترة غالبًا بتبقى <b>المجموعة التانية</b>: في <bdi dir="ltr">FOLLOW(T)</bdi> الفخ هو <bdi dir="ltr">{(, id}</bdi> وده <b><bdi dir="ltr">FIRST(T)</bdi></b>. وفي <bdi dir="ltr">FOLLOW(B)</bdi> بتاع مثال 1 الفخ <bdi dir="ltr">{b}</bdi> وده <b><bdi dir="ltr">FIRST(B)</bdi></b>.')}</p></${Box}>
        `),

        // 14 · sort exercise
        page(html`
          <${Box} kind="pencil" title=${t('FIRST or FOLLOW?', 'مين فيهم؟')}><p className="hf-p small">${X('Which set is each line about? Tap <b>FI</b> for FIRST or <b>FO</b> for FOLLOW, then check.', 'كل سطر عن أنهي مجموعة؟ دوس <b>FI</b> للـ FIRST أو <b>FO</b> للـ FOLLOW.')}</p></${Box}>
          <${Sort} id="fifo" bins=${[['FI', 'FIRST'], ['FO', 'FOLLOW']]} items=${A ? [
            ['ممكن يبقى فيها ε', 0],
            ['ممكن يبقى فيها $', 1],
            ['الـ start symbol دايمًا فيها $', 1],
            ['للـ terminal بتبقى هو نفسه', 0],
            ['أول terminal في الـ strings الطالعة من α', 0],
            ['اللي بييجي على يمين A على طول', 1],
            ['الـ production <bdi dir="ltr">X → ε</bdi> بتدخّل فيها ε', 0],
            ['الـ <bdi dir="ltr">A → αBβ</bdi> بتحط فيها <bdi dir="ltr">FIRST(β) − ε</bdi>', 1],
            ['بتحدد مكان الـ ε-productions في الجدول', 1]
          ] : [
            ['Can contain ε', 0],
            ['Can contain $', 1],
            ['Always has $ for the start symbol', 1],
            ['For a terminal X it is just {X}', 0],
            ['Terminals that begin strings derived from α', 0],
            ['Terminals that appear right after A', 1],
            ['X → ε puts ε into it', 0],
            ['A → αBβ puts FIRST(β) − ε into it', 1],
            ['Decides where ε-productions go in the table', 1]
          ]} />
        `),

        // 15 · no dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['إيه حكاية الـ $ دي؟', 'الـ input بيتكتب <bdi dir="ltr">w$</bdi>، فالـ $ هي اللي بتيجي بعد آخر symbol. لو A ممكن تبقى آخر symbol على اليمين يبقى $ في <bdi dir="ltr">FOLLOW(A)</bdi>، والـ start symbol بياخدها دايمًا (القاعدة 1).'],
            ['في مثال 1 الـ <bdi dir="ltr">FOLLOW(C)</bdi> مكتوبة {-}. ليه؟', 'الـ C مش موجودة في أي right side، فمفيش حاجة ممكن تيجي بعدها. الـ FOLLOW بتاعها فاضي، والسلايد بتكتبه {-}. بس <bdi dir="ltr">C → g</bdi> لسه بتتحط في <bdi dir="ltr">M[C, g]</bdi>.'],
            ['أنا محتاج الـ FOLLOW لكل production؟', 'في الجدول لأ: القاعدة 2 بس هي اللي بتستخدمه، للـ productions اللي <bdi dir="ltr">ε ∈ FIRST(α)</bdi>. بس الـ FOLLOW داخل كمان في الشرط التالت بتاع الـ <bdi dir="ltr">LL(1)</bdi>.']
          ] : [
            ['What is this $ about?', 'The input is written w$, so $ is what comes after the last symbol. If A can be the rightmost symbol, $ ∈ FOLLOW(A), and the start symbol always gets it (rule 1).'],
            ['In Example 1, FOLLOW(C) is written {-}. Why?', 'C never appears on any right side, so nothing can follow it. Its FOLLOW is empty, which the slide writes {-}. C → g still goes in M[C, g].'],
            ['Do I need FOLLOW for every production?', 'Not for the table: only rule 2 uses it, for productions with ε ∈ FIRST(α). But FOLLOW also appears in the third LL(1) condition.']
          ]} />
        `),

        // 16 · LL(1): the name
        page(html`
          <${H1}>${t("LL(1): what's in a name?", 'الـ LL(1): الاسم معناه إيه؟')}</${H1}>
          <${Def}>${X('<b>Predictive parsers</b> are recursive-descent parsers that need <b>no backtracking</b>. Grammars for which we can build them are called <b>LL(1)</b>.',
            'الـ <b>predictive parsers</b> هي recursive-descent parsers <b>من غير backtracking</b>. والـ grammars اللي نقدر نبني لها النوع ده اسمها <b><bdi dir="ltr">LL(1)</bdi></b>.')}</${Def}>
          <${Letters} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A top-down parser always expands the leftmost non-terminal, so it generates a <b>leftmost derivation</b>. A rightmost derivation in reverse is bottom-up (LR). And the first L is the scan, <b>not</b> left recursion.',
            'الـ top-down parser دايمًا بيفك الـ non-terminal اللي على الشمال، فبيطلّع <b>leftmost derivation</b>. أما الـ rightmost derivation بالعكس فده بتاع الـ bottom-up (LR). وأول L هي الـ scan، <b>مش</b> الـ left recursion.')}</p></${Box}>
        `, { sec: t('LL(1) grammars', 'الـ LL(1) grammars') }),

        // 17 · letters figure
        page(html`
          <${H2}>${t('L, L and 1 on the input abd', 'الـ L والـ L والـ 1 على الـ input abd')}</${H2}>
          <${Fig} name="cc-ll1-letters" />
        `),

        // 18 · the conditions
        page(html`
          <${H2}>${t('When is a grammar LL(1)?', 'إمتى الـ grammar يبقى LL(1)؟')}</${H2}>
          <${P} small=${true}>${X('G is LL(1) <b>if and only if</b>, for every pair of productions <code>A → α | β</code>:', 'الـ G تبقى <bdi dir="ltr">LL(1)</bdi> <b>لو وبس لو</b> لكل زوج productions <code>A → α | β</code>:')}</${P}>
          <${UL} items=${A ? [
            '<b>(1)</b> الـ α والـ β مايطلّعوش الاتنين strings بتبدأ بنفس الـ terminal.',
            '<b>(2)</b> واحد بس منهم على الأكتر ممكن يطلّع ε.',
            '<b>(3)</b> لو <bdi dir="ltr">α ⇒* ε</bdi>، يبقى β مايطلّعش أي string بيبدأ بـ terminal موجود في <bdi dir="ltr">FOLLOW(A)</bdi>.'
          ] : [
            '<b>(1)</b> α and β do not both derive strings beginning with the same terminal.',
            '<b>(2)</b> At most one of them can derive ε.',
            '<b>(3)</b> If α ⇒* ε, then β derives no string beginning with a terminal in FOLLOW(A).'
          ]} />
          <${Def}>${X('So: <b>no left recursion</b>, <b>no ambiguity</b>, and <b>no two entries in one table cell</b>.', 'يعني باختصار: <b>مفيش left recursion</b>، و<b>مفيش ambiguity</b>، و<b>مفيش خانة في الجدول فيها entry-ين</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('<code>A → aB | aC</code>, <code>B → b</code>, <code>C → c</code>. Which condition breaks, and which cell of M gets two entries?', 'الـ grammar ده: <code>A → aB | aC</code> و<code>B → b</code> و<code>C → c</code>. أنهي شرط بيتكسر، وأنهي خانة في M هيبقى فيها entry-ين؟')}</p></${Box}>
          <${Hand} red=${true}>${A ? html`الإجابة: الشرط (1)، الاتنين بيبدأوا بـ a، فالخانة <bdi dir="ltr">M[A, a]</bdi> فيها entry-ين` : 'answer: condition (1), both begin with a, so M[A, a] holds two entries'}</${Hand}>
        `),

        // 19 · check figure
        page(html`
          <${H2}>${t('The three conditions, pair by pair', 'الـ 3 شروط، زوج ورا زوج')}</${H2}>
          <${Fig} name="cc-ll1-check" />
        `),

        // 20 · building M
        page(html`
          <${H1}>${t('Building table M', 'بناء الجدول M')}</${H1}>
          <${P} small=${true}>${X('One <b>row per non-terminal</b>, one <b>column per terminal</b>, plus $. Then, for each production <code>A → α</code>:', 'فيه <b>صف لكل non-terminal</b>، و<b>عمود لكل terminal</b>، ومعاهم $. وبعدين، لكل production <code>A → α</code>:')}</${P}>
          <${Def}>${X('<b>1.</b> For each terminal <b>a</b> in <b>FIRST(α)</b>, add A → α to <b>M[A, a]</b>.<br/><b>2.</b> If <b>ε ∈ FIRST(α)</b>, add A → α to <b>M[A, b]</b> for each <b>b in FOLLOW(A)</b> (including $).',
            '<b>1.</b> لكل terminal a في <b><bdi dir="ltr">FIRST(α)</bdi></b>، ضيف <bdi dir="ltr">A → α</bdi> في <b><bdi dir="ltr">M[A, a]</bdi></b>.<br/><b>2.</b> لو <b><bdi dir="ltr">ε ∈ FIRST(α)</bdi></b>، ضيف <bdi dir="ltr">A → α</bdi> في <b><bdi dir="ltr">M[A, b]</bdi></b> لكل b في <b><bdi dir="ltr">FOLLOW(A)</bdi></b> (ومعاهم $).')}</${Def}>
          <${Hand} red=${true} big=${true}>${t('Empty entries are errors.', 'الخانات الفاضية معناها errors.')}</${Hand}>
          <${Talk} who="table" flip=${true}>${X('FIRST fills most of me. FOLLOW only places the productions that can vanish. And row A only ever holds <b>A</b>-productions.', 'الـ FIRST بيملاني معظمي. والـ FOLLOW بيحط بس الـ productions اللي ممكن تختفي. والصف بتاع A مفيهوش غير productions بتاعة <b>A</b>.')}</${Talk}>
        `, { sec: t('Table M', 'الجدول M') }),

        // 21 · table exercise
        page(html`
          <${Box} kind="pencil" title=${t('Fill in table M', 'املا الجدول M')}><p className="hf-p small">${X("Example 2's table with eight cells missing. Each cell shows the right side of its row's production; — means empty (error).",
            'جدول مثال 2 وناقصه تمن خانات. كل خانة فيها الـ right side بتاع production الصف، والـ — معناها فاضية (error).')}</p></${Box}>
          <${TableFill} id="tf2" nts=${['E', "E'", 'T', "T'", 'F']} ts=${['id', '+', '*', '(', ')', '$']} M=${M2} opts=${M2_OPTS}
            blanks=${[['E', '('], ["E'", ')'], ["E'", '*'], ['T', '+'], ["T'", '+'], ["T'", '*'], ['F', 'id'], ['F', '(']]} />
        `),

        // 22 · table figure
        page(html`
          <${H2}>${t('Example 2, cell by cell', 'مثال 2، خانة خانة')}</${H2}>
          <${Fig} name="cc-table-expr" />
        `),

        // 23 · the parser's moves
        page(html`
          <${H1}>${t('The parser at work', 'الـ parser وهو شغال')}</${H1}>
          <${P} small=${true}>${X('The stack starts as <b>S$</b> and the input as <b>w$</b>. Then, again and again:', 'الـ stack بيبدأ <b><bdi dir="ltr">S$</bdi></b> والـ input بيبقى <b><bdi dir="ltr">w$</bdi></b>. وبعدين، تاني وتالت:')}</${P}>
          <${UL} items=${A ? [
            'الـ top <b>terminal</b> بيساوي الـ input symbol: <b>match</b>، يعني pop ونقدّم في الـ input.',
            'الـ top <b>non-terminal</b> A: بنبدّله بالـ right side بتاع <bdi dir="ltr">M[A, a]</bdi>، ونعمله push بحيث <b>أول symbol يبقى فوق</b>.',
            'الاتنين بقوا $: <b>accept</b>.',
            'خانة فاضية: <b>error</b>.'
          ] : [
            'Top is a <b>terminal</b> equal to the input symbol: <b>match</b> (pop and advance).',
            'Top is a <b>non-terminal</b> A: replace it with the right side of M[A, a], pushed so the <b>first symbol is on top</b>.',
            'Both are $: <b>accept</b>.',
            'An empty entry: <b>error</b>.'
          ]} />
          <${Code} lines=${["A$      abd$   A → aBA'", ["aBA'$   abd$", t('a on top', 'الـ a فوق')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Reduce" is <b>not</b> an LL(1) move. Reduce belongs to bottom-up (shift-reduce, LR) parsing. LL(1) only expands, matches, accepts or reports an error.',
            'الـ "reduce" <b>مش</b> حركة من حركات الـ <bdi dir="ltr">LL(1)</bdi>. الـ reduce ده بتاع الـ bottom-up (shift-reduce, LR) parsing. الـ <bdi dir="ltr">LL(1)</bdi> بيعمل expand أو match أو accept أو error بس.')}</p></${Box}>
        `, { sec: t('Parsing with M', 'الـ parsing بالجدول M') }),

        // 24 · moves figure
        page(html`
          <${H2}>${t('Expand, match, accept, error', 'الـ expand والـ match والـ accept والـ error')}</${H2}>
          <${Fig} name="cc-ll1-moves" />
        `),

        // 25 · Example 1: left recursion
        page(html`
          <${H2}>${t('Example 1: fix the grammar first', 'مثال 1: صلّح الـ grammar الأول')}</${H2}>
          <${Code} lines=${['S → A   A → aB | Ad   B → b   C → g']} />
          <${Fig} name="cc-leftrec-ex1" />
        `, { sec: t('Example 1: abd', 'مثال 1: abd') }),

        // 26 · Example 1 sets and table
        page(html`
          <${H2}>${t("Example 1's sets and table", 'المجموعات والجدول بتوع مثال 1')}</${H2}>
          <div className="hf-in" dir="ltr"><table className="hf-c6-tb"><thead><tr><th style=${{ width: '40px' }}>NT</th><th>FIRST</th><th>FOLLOW</th></tr></thead><tbody>
            ${[['S', '{a}', '{$}'], ['A', '{a}', '{$}'], ["A'", '{d, ε}', '{$}'], ['B', '{b}', '{d, $}'], ['C', '{g}', '{-}']].map(r => html`<tr key=${r[0]}><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table></div>
          <div className="hf-in" dir="ltr"><table className="hf-c6-tb"><thead><tr><th style=${{ width: '40px' }}>M</th>${['a', 'b', 'd', 'g', '$'].map(x => html`<th key=${x}>${x}</th>`)}</tr></thead><tbody>
            ${[['S', ['A', '', '', '', '']], ['A', ["aBA'", '', '', '', '']], ["A'", ['', '', "dA'", '', 'ε']], ['B', ['', 'b', '', '', '']], ['C', ['', '', '', 'g', '']]].map(([N, cs]) => html`<tr key=${N}><th>${N}</th>${cs.map((c, k) => html`<td key=${k}>${c}</td>`)}</tr>`)}</tbody></table></div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("FOLLOW(B) = <b>{d, $}</b>: FIRST(A') − ε = {d}, and A' can vanish, so FOLLOW(A) = {$} joins. M[A', $] = A' → ε (the revision sheet misprints it \"A→ε\").",
            'الـ <bdi dir="ltr">FOLLOW(B) = {d, $}</bdi>: فيها <bdi dir="ltr">FIRST(A\') − ε = {d}</bdi>، وA\' ممكن تختفي فبنضيف <bdi dir="ltr">FOLLOW(A) = {$}</bdi>. والخانة دي:<span class="ltr">M[A\', $] = A\' → ε</span>والـ revision sheet كاتبها غلط <bdi dir="ltr">"A→ε"</bdi>.')}</p></${Box}>
        `),

        // 27 · Example 1 table figure
        page(html`
          <${H2}>${t("Example 1's table, production by production", 'جدول مثال 1، production ورا production')}</${H2}>
          <${Fig} name="cc-table-ex1" />
        `),

        // 28 · be the parser
        page(html`
          <${Box} kind="pencil" title=${t('Be the parser', 'خليك إنت الـ parser')}><p className="hf-p small">${X("Parse <b>abd</b> with Example 1's table. For each row, tap the action: a production to expand, match, or accept.",
            'اعمل parse لـ <b>abd</b> بجدول مثال 1. في كل صف دوس على الـ action: production للـ expand، أو match، أو accept.')}</p></${Box}>
          <${BeParser} id="abd" />
        `),

        // 29 · parse figure
        page(html`
          <${H2}>${t('Parsing abd, with the tree growing', 'الـ parse بتاع abd، والشجرة بتكبر')}</${H2}>
          <${Fig} name="cc-parse-abd" />
        `),

        // 30 · exam grammar exercise
        page(html`
          <${Box} kind="exam" title=${t("The doctors' 12-mark question", 'سؤال الدكاترة اللي عليه 12 درجة')}><p className="hf-p small">${X('From the 2024/25 final: <i>"Construct its LL(1) predictive parser, then give the parsing actions for (dc)ac."</i> No left recursion here, so no transformation is needed. Start with the sets:',
            'من امتحان <bdi dir="ltr">2024/25</bdi>:<span class="ltr">"Construct its LL(1) predictive parser, then give the parsing actions for (dc)ac."</span>مفيش left recursion هنا، فمش محتاجين نغيّر حاجة. ابدأ بالمجموعات:')}</p></${Box}>
          <${Code} lines=${GXs} />
          <${SetPick} id="fox" syms=${['(', 'a', 'd', 'c', 'b', ')', '$', 'ε']} rows=${[
            ['FIRST(S)', ['(', 'a', 'd']], ['FOLLOW(S)', ['$', ')', 'b']], ['FOLLOW(U)', ['a', 'c', '$', ')', 'b']], ['FOLLOW(V)', ['c', '$', ')', 'b']], ['FOLLOW(W)', ['$', ')', 'b']]
          ]} />
        `, { sec: t('The exam grammar', 'جرامر الامتحان') }),

        // 31 · exam grammar worked
        page(html`
          <${H2}>${t('The exam grammar, worked', 'جرامر الامتحان، محلول')}</${H2}>
          <${UL} items=${A ? [
            'الـ U مش بتختفي، فـ S بتبدأ زي U:<span class="ltr">FIRST(S) = FIRST(U) = {(, a, d}</span>',
            'الـ <bdi dir="ltr">FOLLOW(S)</bdi>: فيها $ (الـ start)، و<bdi dir="ltr">)</bdi> من <bdi dir="ltr">U → (S)</bdi>، وb من <bdi dir="ltr">U → aSb</bdi>:<span class="ltr">FOLLOW(S) = {$, ), b}</span>',
            'الـ <bdi dir="ltr">FOLLOW(U)</bdi>: بتاخد <bdi dir="ltr">FIRST(VW) − ε = {a, c}</bdi>، وVW ممكن تختفي فبنضيف <bdi dir="ltr">FOLLOW(S)</bdi>:<span class="ltr">FOLLOW(U) = {a, c, $, ), b}</span>',
            'الـ <bdi dir="ltr">FOLLOW(V)</bdi>: بتاخد <bdi dir="ltr">FIRST(W) − ε = {c}</bdi>، وكمان <bdi dir="ltr">FOLLOW(S)</bdi> عشان W هي nullable:<span class="ltr">FOLLOW(V) = {c, $, ), b}</span>',
            'والـ W في الآخر خالص:<span class="ltr">FOLLOW(W) = FOLLOW(S) = {$, ), b}</span>'
          ] : [
            'U cannot vanish, so S begins like U: <b>FIRST(S) = FIRST(U) = {(, a, d}</b>.',
            'FOLLOW(S): $ (start), ) from U → (S), b from U → aSb. <b>{$, ), b}</b>.',
            'FOLLOW(U): FIRST(VW) − ε = {a, c}; VW can vanish, so add FOLLOW(S). <b>{a, c, $, ), b}</b>.',
            'FOLLOW(V): FIRST(W) − ε = {c}, plus FOLLOW(S) because W is nullable. <b>{c, $, ), b}</b>.',
            'FOLLOW(W) = FOLLOW(S) = <b>{$, ), b}</b>: W is last in S → UVW.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('In FOLLOW(U), don\'t stop at FIRST(V) = {a}: V can vanish, so W\'s <b>c</b> counts, and VW can vanish, so FOLLOW(S) joins. The wrong options {a} and {a, c} stop early.',
            'في <bdi dir="ltr">FOLLOW(U)</bdi> متقفش عند <bdi dir="ltr">FIRST(V) = {a}</bdi>: الـ V ممكن تختفي فالـ <b>c</b> بتدخل، والـ VW ممكن تختفي فبنضيف <bdi dir="ltr">FOLLOW(S)</bdi>. الاختيارات الغلط وقفت بدري.')}</p></${Box}>
        `),

        // 32 · exam follow figure
        page(html`
          <${H2}>${t("The exam grammar's FOLLOW sets, step by step", 'الـ FOLLOW sets بتاعة جرامر الامتحان، خطوة خطوة')}</${H2}>
          <${Fig} name="cc-exam-follow" />
        `),

        // 33 · exam table figure
        page(html`
          <${H2}>${t('Its table M: no cell with two entries', 'الجدول M بتاعه: مفيش خانة فيها entry-ين')}</${H2}>
          <${Fig} name="cc-exam-table" />
        `),

        // 34 · exam parse figure
        page(html`
          <${H2}>${A ? html`الـ parsing actions بتاعة <bdi dir="ltr">(dc)ac</bdi>` : 'The parsing actions for (dc)ac'}</${H2}>
          <${Hand} red=${true}>${A ? html`في الامتحان 18 صف: الـ S اللي جوه بتتعمل parse جوه القوسين، وبعدين <bdi dir="ltr">V → aV</bdi> و<bdi dir="ltr">W → cW</bdi> بيخلّصوا <bdi dir="ltr">ac</bdi>` : '18 rows in the exam: the inner S is parsed inside the brackets, then V → aV and W → cW finish "ac"'}</${Hand}>
          <${Fig} name="cc-exam-parse" />
        `),

        // 35–37 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers and revision sheets. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة والـ revision sheets. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /FOLLOW\(T\) is/)}
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${X('Trap check: {(, id} is <b>FIRST(T)</b>. You want what comes <b>after</b> T.', 'خلّي بالك: <bdi dir="ltr">{(, id}</bdi> ده <b><bdi dir="ltr">FIRST(T)</bdi></b>. إنت عايز اللي بييجي <b>بعد</b> T.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m3', /FOLLOW\(S\) is/)}
          ${mq('m4', /FOLLOW\(U\) is/)}
        `),
        page(html`
          ${mq('m5', /M\[V, \)\]/)}
          <${Gap} h=${4} />
          ${mq('m6', /M\[A', \$\] is/)}
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>FIRST(α)</b>: الـ terminals اللي بتبدأ بيها strings طالعة من α، ومعاها ε لو α ممكن تختفي.',
            'الـ <b>FOLLOW(A)</b>: الـ terminals اللي بتيجي على يمين A على طول، و$ لو A ممكن تبقى آخر حاجة. <b>عمرها ما فيها ε</b>.',
            'قواعد الـ FOLLOW: $ للـ start، و<bdi dir="ltr">FIRST(β) − ε</bdi> للي قبل β، و<bdi dir="ltr">FOLLOW(A)</bdi> للي في الآخر أو اللي بعده nullable.',
            'الـ <bdi dir="ltr">LL(1)</bdi>: scan من الشمال لليمين، وleftmost derivation، وlookahead واحد. predictive يعني من غير backtracking.',
            'الـ <bdi dir="ltr">LL(1)</bdi> يعني مفيش left recursion ولا ambiguity، ومفيش خانة فيها entry-ين.',
            'الجدول M: الـ FIRST بيحط <bdi dir="ltr">A → α</bdi> تحت كل a، ولو α ممكن تختفي الـ FOLLOW بيحطها تحت كل b. والفاضي error.',
            'الـ parsing: الـ stack <bdi dir="ltr">S$</bdi> والـ input <bdi dir="ltr">w$</bdi>، وmatch أو expand (أول symbol فوق)، وaccept لما الاتنين $.'
          ] : [
            '<b>FIRST(α)</b>: terminals that begin strings derived from α, plus ε if α ⇒* ε.',
            '<b>FOLLOW(A)</b>: terminals that can appear right after A, plus $ if A can be rightmost. <b>Never ε.</b>',
            'FOLLOW rules: $ for the start symbol; FIRST(β) − ε for the B before β; FOLLOW(A) when B is last or β is nullable.',
            '<b>LL(1)</b>: Left-to-right scan, Leftmost derivation, 1 lookahead symbol. Predictive = no backtracking.',
            'LL(1) means no left recursion, no ambiguity, no two entries in one cell.',
            'Table M: A → α under each a in FIRST(α); if ε ∈ FIRST(α), also under each b in FOLLOW(A). Empty = error.',
            'Parsing: stack S$, input w$; match, or expand with the first symbol on top; accept when both are $.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 6!', 'خلّصت الفصل السادس!')}</${H1}>
            <${Talk} who="compiler">${t("The tree is built and the syntax is right. Next: does the program actually mean anything? Semantic analysis!", 'الشجرة اتبنت والـ syntax سليم. الجاي: هو البرنامج ده ليه معنى أصلًا؟ الـ Semantic analysis!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [6], t: Date.now() } }}>${t('Quiz me on Lecture 6', 'امتحنّي في محاضرة 6')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 6, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 6, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

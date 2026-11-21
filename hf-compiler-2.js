// Head First chapter for Compiler Design Lecture 2 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Lexical analysis, regular expressions and finite automata. Every fact comes from the lecture's notes; analogies, jokes and
// memory tricks are marked as ours. ‡ marks a slide error or slide wording that the notes also flag.
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-cc2')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc2';
    s.textContent = `
.hfb .hf-c2-prec{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; }
.hfb .hf-c2-pick{ display:flex; gap:5px; padding:6px; background:var(--hf-grey); }
.hfb .hf-c2-pick button{ flex:1 1 0; min-width:0; font:700 14px/1 var(--mono); min-height:34px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-c2-pick button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-c2-stage{ padding:10px 10px 6px; min-height:128px; display:flex; flex-direction:column; gap:6px; }
.hfb .hf-c2-re{ font:700 26px/1.2 var(--mono); text-align:center; color:var(--ink); letter-spacing:.02em; direction:ltr; }
.hfb .hf-c2-re .nw{ color:var(--hf-red); display:inline-block; animation:hf-c2-pop .45s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hf-c2-pop{ from{ transform:scale(1.9); opacity:0; } }
.hfb .hf-c2-lang{ font:700 15px/1.3 var(--mono); text-align:center; color:var(--hf-k); direction:ltr; }
.hfb .hf-c2-say{ font-size:14px; line-height:1.35; margin:0; text-align:center; color:var(--ink); }
.hfb .hf-c2-bar{ display:flex; gap:8px; align-items:center; padding:0 10px 10px; }
.hfb .hf-c2-bar .grow{ flex:1; }
.hfb .hf-c2-tbl{ border-collapse:collapse; width:100%; font:500 13.5px/1.25 var(--body); }
.hfb .hf-c2-tbl.law td{ padding:1px 5px; font-size:13px; }
.hfb .hf-c2-tbl.law .m{ font-size:13px; }
.hfb .hf-c2-tbl th, .hfb .hf-c2-tbl td{ border:1px solid var(--hf-line); padding:3px 6px; text-align:left; vertical-align:middle; }
.hfb .hf-c2-tbl thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-c2-tbl .m{ font:700 13.5px/1.25 var(--mono); white-space:nowrap; }
.hfb .hf-c2-tbl.ctr td, .hfb .hf-c2-tbl.ctr th{ text-align:center; }
.hfb .hf-c2-tbl.ctr tbody th{ text-align:left; font-family:var(--mono); }
.hfb .hf-c2-fill td{ padding:2px; }
.hfb .hf-c2-fill td button{ width:100%; min-height:32px; font:700 14px/1 var(--mono); border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-c2-fill td button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-c2-fill td button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-c2-k{ white-space:nowrap; font-variant-ligatures:none; }
.hfb .hf-c2-nl .hf-code{ font-variant-ligatures:none; }
.hfb .hf-c2-fa{ direction:ltr; display:block; width:100%; height:auto; color:var(--ink); }
.hfb .hf-c2-fa text{ fill:var(--ink); font-family:var(--mono); }
.hfb .hf-c2-fa .st{ fill:var(--paper); stroke:var(--hf-line); stroke-width:2; }
.hfb .hf-c2-fa .ed{ fill:none; stroke:var(--hf-k); stroke-width:2; }
.hfb .hf-c2-cmp{ display:grid; grid-template-columns:0.8fr 1fr 1fr; border:1.5px solid var(--hf-line); }
.hfb .hf-c2-cmp > div{ padding:5px 7px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-line); }
.hfb .hf-c2-cmp > div:nth-child(-n+3){ border-top:0; background:var(--hf-grey); font-weight:800; }
.hfb .hf-c2-cmp > div.h{ font-weight:700; }
.hfb .hf-c2-cmp > div + div{ border-left:1px solid var(--hf-line); }
.hfb .hf-c2-cmp > div:nth-child(3n+1){ border-left:0; }
.hfb .hf-c2-steps{ display:grid; gap:5px; }
.hfb .hf-c2-steps > div{ display:grid; grid-template-columns:96px 1fr; gap:8px; align-items:center; border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 8px; background:var(--paper); }
.hfb .hf-c2-steps code{ font:700 15px/1.2 var(--mono); color:var(--hf-k); background:none; padding:0; }
.hfb .hf-c2-steps span{ font-size:14px; line-height:1.3; }
.hfb.hf-ar .hf-c2-say, .hfb.hf-ar .hf-c2-cmp > div, .hfb.hf-ar .hf-c2-steps span, .hfb.hf-ar .hf-c2-tbl{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb.hf-ar .hf-c2-cmp > div + div{ border-left:0; border-right:1px solid var(--hf-line); }
.hfb.hf-ar .hf-c2-cmp > div:nth-child(3n+1){ border-right:0; }
.hfb.hf-ar .hf-c2-tbl:not(.ctr) th, .hfb.hf-ar .hf-c2-tbl:not(.ctr) td{ text-align:right; }
.hfb.hf-ar .hf-c2-tbl .m{ direction:ltr; text-align:left; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-c2-re .nw{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // precedence, step by step: * binds first, then concatenation, then |  (marks in [x] are the brackets that step adds)
  const PREC = [
    { re: 'a|ab*', steps: ['a|ab*', 'a|a[(]b*[)]', 'a|[(]a(b*)[)]'], lang: '{a, ab, abb, abbb, …}', cat: true },
    { re: 'ab|c*', steps: ['ab|c*', 'ab|[(]c*[)]', '[(]ab[)]|(c*)'], lang: '{ab, ε, c, cc, …}', cat: true },
    { re: 'a|b|c*', steps: ['a|b|c*', 'a|b|[(]c*[)]', 'a|b|(c*)'], lang: '{a, b, ε, c, cc, …}', cat: false }
  ];
  const marks = s => s.split(/(\[.\])/).filter(Boolean).map((p, i) => /^\[.\]$/.test(p) ? html`<span key=${i} className="nw">${p[1]}</span>` : html`<span key=${i}>${p}</span>`);
  function Precedence() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('prec', 0);
    const [i, setI] = H.K.useSlot('prec:i', 0);
    const [play, setPlay] = useState(false);
    useEffect(() => { if (!play) return; if (i >= 3) { setPlay(false); return; } const t = setTimeout(() => setI(i + 1), 1500); return () => clearTimeout(t); }, [play, i]);
    const P = PREC[k];
    const say = [
      ar ? 'اقراها زي الـ compiler: مين بيمسك الأول؟' : 'Read it the way the compiler does: who grabs first?',
      ar ? 'الأول الـ <code>*</code>، وهي الأقوى: بتمسك الـ symbol اللي قبلها بس.' : 'First <code>*</code>, the tightest: it grabs only the symbol right before it.',
      P.cat ? (ar ? 'بعدها الـ concatenation: بيلزق اللي جنب بعض.' : 'Then concatenation glues neighbours together.') : (ar ? 'بعدها الـ concatenation، بس هنا مفيش حاجة تتلزق.' : 'Then concatenation, but here there is nothing to glue.'),
      ar ? 'وآخر حاجة الـ <code>|</code>: بيختار بين الأجزاء. والـ language:' : 'Last, <code>|</code> chooses between the parts. The language:'
    ][i];
    return html`<div className="hf-c2-prec hf-in">
      <div className="hf-c2-pick" dir="ltr">${PREC.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => { setPlay(false); setK(j); setI(0); }}>${x.re}</button>`)}</div>
      <div className="hf-c2-stage">
        <p className="hf-c2-say">${H.K.T(say)}</p>
        <div className="hf-c2-re" key=${k + ':' + i}>${marks(P.steps[Math.min(i, 2)])}</div>
        ${i === 3 && html`<div className="hf-c2-lang hf-in">= ${P.lang}</div>`}
      </div>
      <div className="hf-c2-bar">
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.max(0, i - 1)); }} disabled=${i === 0} aria-label=${ar ? 'الخطوة اللي فاتت' : 'Back one step'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" onClick=${() => { if (i >= 3) setI(0); setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= 3 ? (ar ? 'تاني' : 'Again') : (ar ? 'شغّل' : 'Play')}</button>
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.min(3, i + 1)); }} disabled=${i === 3} aria-label=${ar ? 'الخطوة الجاية' : 'Next step'}>${ar ? '‹' : '›'}</button>
        <span className="grow"></span>
        <span className="hf-dots">${[0, 1, 2, 3].map(j => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  // the finite automaton for b*a+(c|d) (Sheet One), drawn after the reader fills its table
  const FaBAD = () => html`<svg className="hf-c2-fa hf-in" viewBox="0 0 330 112" role="img" aria-label="q0 loops on b, goes to q1 on a; q1 loops on a, goes to final q2 on c or d" dir="ltr">
    <defs><marker id="hf-c2-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--hf-k)" /></marker></defs>
    <text x="2" y="70" fontSize="14">start</text><path d="M4 78 H44" className="ed" markerEnd="url(#hf-c2-ah)" />
    <path d="M59 58 C40 14 100 14 81 58" className="ed" markerEnd="url(#hf-c2-ah)" /><text x="70" y="22" fontSize="17" textAnchor="middle">b</text>
    <circle cx="70" cy="80" r="22" className="st" /><text x="70" y="86" fontSize="16" textAnchor="middle">q0</text>
    <path d="M92 80 H156" className="ed" markerEnd="url(#hf-c2-ah)" /><text x="124" y="72" fontSize="17" textAnchor="middle">a</text>
    <path d="M169 58 C150 14 210 14 191 58" className="ed" markerEnd="url(#hf-c2-ah)" /><text x="180" y="22" fontSize="17" textAnchor="middle">a</text>
    <circle cx="180" cy="80" r="22" className="st" /><text x="180" y="86" fontSize="16" textAnchor="middle">q1</text>
    <path d="M202 80 H266" className="ed" markerEnd="url(#hf-c2-ah)" /><text x="234" y="72" fontSize="17" textAnchor="middle">c, d</text>
    <circle cx="290" cy="80" r="22" className="st" /><circle cx="290" cy="80" r="17" className="st" /><text x="290" y="86" fontSize="16" textAnchor="middle">q2</text>
  </svg>`;

  // fill the transition table yourself: tap a cell to cycle through –, q0, q1, q2
  const OPTS = ['–', 'q0', 'q1', 'q2'];
  const TF_ROWS = ['→ q0', 'q1', '* q2'], TF_SYM = ['a', 'b', 'c', 'd'];
  const TF_ANS = [['q1', 'q0', '–', '–'], ['q1', '–', 'q2', 'q2'], ['–', '–', '–', '–']];
  function TableFill() {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('tf', {});
    const [checked, setChecked] = H.K.useSlot('tf:c', false);
    const tap = key => { const cur = v[key]; const nx = cur == null ? OPTS[0] : OPTS[(OPTS.indexOf(cur) + 1) % OPTS.length]; setV(Object.assign({}, v, { [key]: nx })); setChecked(false); };
    const right = TF_ANS.flat().filter((a, n) => v[Math.floor(n / 4) + ':' + (n % 4)] === a).length;
    const shown = checked && right === 12;
    return html`<div className="hf-in">
      <table className="hf-c2-tbl ctr hf-c2-fill" dir="ltr"><thead><tr><th>${ar ? 'State' : 'State'}</th>${TF_SYM.map(s => html`<th key=${s} className="m">${s}</th>`)}</tr></thead>
        <tbody>${TF_ROWS.map((r, i) => html`<tr key=${r}><th className="m">${r}</th>${TF_SYM.map((s, j) => { const key = i + ':' + j, x = v[key];
          return html`<td key=${s}><button className=${checked && x != null ? (x === TF_ANS[i][j] ? 'ok' : 'no') : ''} onClick=${() => tap(key)} aria-label=${r + ' on ' + s}>${x == null ? '?' : x}</button></td>`; })}</tr>`)}</tbody></table>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح الجدول' : 'Check my table'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; TF_ANS.forEach((row, i) => row.forEach((a, j) => { o[i + ':' + j] = a; })); setV(o); setChecked(true); }}>${ar ? 'ورّيني الإجابة' : 'Show the answer'}</button>
        ${checked && html`<span className="hf-score"><bdi>${right} / 12</bdi></span>`}
      </div>
      ${shown && html`<${FaBAD} />`}
    </div>`;
  }

  H.chapters.compiler[2] = {
    title: 'Chop, Label, Repeat', kicker: 'Chapter 2', run: 'lexical analysis',
    ar: { title: 'قطّع، سمّي، كرّر', kicker: 'الفصل 2', run: 'الـ lexical analysis' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap, T, Reveal } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const C = h => String(h).replace(/<code>/g, '<code class="hf-c2-k">');
      const X = (en, ar) => T(C(A ? ar : en));
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[2] && window.AR.compiler.lectures[2].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const nt = s => html`<bdi dir="ltr">${s}</bdi>`;
      const page = (el, o) => Object.assign({ el }, o || {});
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(C(x))}</li>`)}</ul>`;
      const LAWS = [
        ['(r|s)|t = r|s|t = r|(s|t)', '| is associative', 'الـ <code>|</code> associative'],
        ['s|t = t|s', '| is commutative', 'الـ <code>|</code> commutative'],
        ['s|s = s', '| is idempotent', 'الـ <code>|</code> idempotent'],
        ['s? = s|ε', 'by definition', 'بالتعريف'],
        ['(rs)t = rst = r(st)', 'concatenation is associative', 'الـ concatenation associative'],
        ['sε = s = εs', 'ε is a neutral element for concatenation', 'الـ ε عنصر محايد للـ concatenation'],
        ['r(s|t) = rs|rt', 'concatenation distributes over |', 'الـ concatenation بيتوزّع على الـ <code>|</code>'],
        ['(r|s)t = rt|st', 'concatenation distributes over |', 'الـ concatenation بيتوزّع على الـ <code>|</code>'],
        ['(s*)* = s*', '* is idempotent', 'الـ <code>*</code> idempotent'],
        ['s*s* = s*', '0 or more twice is still 0 or more', 'صفر أو أكتر مرتين لسه صفر أو أكتر'],
        ['ss* = s+ = s*s', 'by definition', 'بالتعريف']
      ];
      const CMP = A ? [
        ['الـ empty string', 'مينفعش يستخدم <bdi>ε</bdi> transition', 'ينفع يستخدم <bdi>ε</bdi> transitions'],
        ['الـ transition functions', 'الـ next state واحدة بالظبط', 'السلايد بتقول: صفر أو واحدة ‡'],
        ['الوقت (complexity)', 'وقت أقل لأي input string', 'وقت أكتر من الـ DFA'],
        ['الـ next state', 'محددة بوضوح', 'كل pair من state وinput ممكن يبقى ليه next states كتير']
      ] : [
        ['Empty-string transition', 'Cannot use an ε transition', 'Can use ε transitions'],
        ['Transition functions', 'Exactly one next state', 'Slide: zero or one next state ‡'],
        ['Complexities of time', 'Less time to run any input string', 'More time than a DFA'],
        ['Setting of the next possible set', 'Clearly set', 'Each (state, input) pair may have many possible next states']
      ];
      return [
        // 0 · recap and how to read (faces the opener)
        page(html`
          <${H2}>${t('Previously, on Compiler Design', 'في الحلقة اللي فاتت')}</${H2}>
          <${P} small=${true}>${X('Chapter 1 sent one statement through six phases. Phase 1, the scanner, chopped <code>a[index] = 4 + 2</code> into eight tokens, and we promised to show you <i>how</i>. This is that chapter.',
            'في الفصل الأول مشّينا statement واحدة على الـ six phases. الـ phase الأولى، الـ scanner، قطّعت <code>a[index] = 4 + 2</code> لتمن tokens، ووعدناك نوريك <i>إزاي</i>. أهو ده الفصل.')}</${P}>
          <${Box} kind="brain"><p className="hf-p">${t('How would you explain to a machine what a "number" looks like, without listing every number in the world?', 'إزاي تشرح لمكنة يعني إيه "number"، من غير ما تكتبلها كل الأرقام اللي في الدنيا؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You answer right on the page, and your answers stay when you switch language.', '<b>حل التمارين.</b> بتجاوب على الصفحة نفسها، وإجاباتك بتفضل لو غيّرت اللغة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ من امتحانات الدكاترة نفسهم.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake or odd wording on the slides, and what was meant.', 'معناها غلطة أو صياغة غريبة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Keep your answer to the Brain Power in mind. The real one is a few pages on.', 'افتكر إجابتك على "شغّل مخك". الإجابة الحقيقية بعد كام صفحة.')}</${Hand}>
        `, { sec: t('Before you start', 'قبل ما تبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>Compiler Design` : html`Chapter two<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Chop, Label, Repeat', 'قطّع، سمّي، كرّر')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('lexical analysis, regular expressions and finite automata', 'الـ lexical analysis والـ regular expressions والـ finite automata')}</p></div>
          <${P}>${X('Your program arrives as one long ribbon of characters: spaces, tabs, comments and all. Before anyone can understand it, somebody has to <b>chop it into words</b> and <b>put a label on each one</b>.',
            'البرنامج بتاعك بيوصل شريط طويل من الـ characters، بالمسافات والـ tabs والـ comments. وقبل ما حد يفهمه، لازم حد <b>يقطّعه لكلمات</b> و<b>يحط على كل كلمة label</b>.')}</${P}>
          <${Talk} who="dev">${t("Can't the parser just read my characters?", 'ما الـ parser يقرا الـ characters بتوعي على طول؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('The parser wants <b>tokens</b>. Chopping is the job of the <b>lexical analyzer</b>.', 'الـ parser عايز <b>tokens</b>. التقطيع ده شغلانة الـ <b>lexical analyzer</b>.')}</${Talk}>
          <${P} small=${true}>${X('You\'ll meet the chopper, the little language used to <b>describe</b> tokens (regular expressions) and the machines that <b>recognize</b> them (finite automata).',
            'هتتعرّف على اللي بيقطّع، وعلى اللغة الصغيرة اللي <b>بنوصف</b> بيها الـ tokens (الـ regular expressions)، وعلى المكن اللي <b>بيتعرّف</b> عليها (الـ finite automata).')}</${P}>
        `, { sec: t('Chop, label, repeat', 'قطّع، سمّي، كرّر') }),

        // 2 · the lexical analyzer
        page(html`
          <${H1}>${t('Meet the lexical analyzer', 'اتعرّف على الـ lexical analyzer')}</${H1}>
          <${Def}>${X('The <b>lexical analysis</b> phase is the <b>first phase</b> of the compiler. It reads the input characters and produces a <b>sequence of tokens</b> that the <b>parser</b> uses for syntax analysis.',
            'الـ <b>lexical analysis</b> هي <b>أول phase</b> في الـ compiler. بتقرا الـ input characters وتطلّع <b>sequence من الـ tokens</b> الـ <b>parser</b> بيستخدمها في الـ syntax analysis.')}</${Def}>
          <${P} small=${true}>${t('While it is at it, it also:', 'وهي شغالة كمان:')}</${P}>
          <${UL} items=${(A ? [
            'بتشيل الـ <b>comments</b> والـ <b>white space</b>: الـ blank والـ tab والـ newline.',
            'بتربط رسايل الأخطاء بتاعة الـ compiler بالـ <b>source program</b>، مثلًا بأرقام السطور ‡.',
            'بتتعرّف على الـ <b>keywords</b> هنا.',
            'اسمها كمان <b>scanning</b>: الـ characters بتتقري <b>من الشمال لليمين</b> وتتجمّع في tokens.'
          ] : [
            'removes <b>comments</b> and <b>white space</b>: blank, tab and newline.',
            'correlates the compiler\'s error messages with the <b>source program</b>, e.g. by line numbers ‡.',
            'recognizes <b>keywords</b>.',
            'is also called <b>scanning</b>: characters are read <b>left to right</b> and grouped into tokens.'
          ]).map(C)} />
          <${Grow} />
          <${Hand} tilt=${true}>${t("Our analogy: a butcher who cuts the meat and bins the bones before the cook (the parser) sees it.", 'تشبيه من عندنا: جزار بيقطّع اللحمة ويرمي العضم قبل ما الطباخ (الـ parser) يشوفها.')}</${Hand}>
          <${P} small=${true}>${X('‡ The slide only says "correlates"; attaching line numbers to error messages is the notes\' example of it.', '‡ السلايد بتقول "بتربط" بس؛ أرقام السطور مثال من النوتس.')}</${P}>
        `, { sec: t('The lexical analyzer', 'الـ lexical analyzer') }),

        // 3 · figure
        page(html`
          <${H2}>${t('Watch the scanner work', 'اتفرج على الـ scanner وهو شغال')}</${H2}>
          <${Fig} name="cc-lexer" />
        `),

        // 4 · token vs lexeme
        page(html`
          <${H1}>${t('Token or lexeme?', 'الـ token ولا الـ lexeme؟')}</${H1}>
          <${P} small=${true}>${t("The lecture's own example goes in:", 'مثال المحاضرة نفسه داخل:')}</${P}>
          <div className="hf-c2-nl hf-in"><${Code} lines=${['if distance >= rate * (time1 – time0)', '   then distance := maxdist;']} /></div>
          <${Hand} arrow="down" red=${true}>${t('and this comes out', 'وده اللي طالع')}</${Hand}>
          <div className="hf-c2-nl hf-in"><${Code} lines=${['if id relop id * ( id – id )', '   then id := id ;']} /></div>
          <${Def}>${X('A <b>token</b> is a logical category: <b>id</b>, <b>relop</b>, <b>number</b>.<br/>A <b>lexeme</b> is the actual string instance: <code>distance</code>.',
            'الـ <b>token</b> هو category منطقية: <b>id</b> و<b>relop</b> و<b>number</b>.<br/>والـ <b>lexeme</b> هو الـ string الحقيقي نفسه: <code>distance</code>.')}</${Def}>
          <${Hand}>${X('keywords (<code>if</code>, <code>then</code>) and the other symbols stay as themselves', 'الـ keywords (<code>if</code> و<code>then</code>) وباقي الرموز بيفضلوا زي ما هم')}</${Hand}>
        `, { sec: t('Token vs lexeme', 'الـ token والـ lexeme') }),

        // 5 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: a Token and a Lexeme argue about who really matters.", html`قعدة الليلة: <bdi>Token</bdi> و<bdi>Lexeme</bdi> بيتخانقوا مين فيهم المهم بجد.`)} />
          <${Chat} names=${[t('Lexeme', 'الـ Lexeme'), t('Token', 'الـ Token')]} lines=${A ? [
            [0, 'أنا الحاجة الأصلية. أنا <b>بالظبط</b> اللي المبرمج كتبه: <code>distance</code> و<code>rate</code> و<code>maxdist</code>.'],
            [1, 'وأنا <b>نوعك</b>. بالنسبة للـ parser إنتوا التلاتة <b>id</b> وخلاص.'],
            [0, 'id بس؟ أنا ليا اسم!'],
            [1, 'الـ parser بيهمه الـ category، واللي زي <code>&gt;=</code> ده <b>relop</b>.'],
            [0, 'طب و<code>distance</code> اللي ظاهرة مرتين؟'],
            [1, 'يبقوا <b>two id tokens</b>. والمسافات والـ comments اللي بينكم؟ اتشالت خلاص.']
          ] : [
            [0, "I'm the real thing. I'm <b>exactly</b> what the programmer typed: <code>distance</code>, <code>rate</code>, <code>maxdist</code>."],
            [1, "And I'm what you <b>are</b>. To the parser, all three of you are just <b>id</b>."],
            [0, 'Just id? I have a name!'],
            [1, 'The parser cares about categories. <code>&gt;=</code>, for one, is a <b>relop</b>.'],
            [0, 'And <code>distance</code>, which shows up twice?'],
            [1, "That's <b>two id tokens</b>. And the spaces and comments between you? Gone."]
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"distance is a ___ and id is a ___"</i>: <b>lexeme</b>, then <b>token</b>. The example has <b>6 id tokens</b> but only 5 different lexemes.',
            'لو اتسألت<span class="ltr"><i>"distance is a ___ and id is a ___"</i></span>الإجابة <b>lexeme</b> وبعدين <b>token</b>. والمثال فيه <b>6 id tokens</b> بس 5 lexemes مختلفين.')}</p></${Box}>
        `),

        // 6 · be the lexer
        page(html`
          <${Box} kind="pencil" title=${t('Be the lexer', 'خليك إنت الـ lexer')}><p className="hf-p small">${X('Here is a line of source. Give each piece its token, or <b>✗</b> if the scanner throws it away.', 'ده سطر source. ادّي كل حتة الـ token بتاعها، أو <b>✗</b> لو الـ scanner بيرميها.')}</p></${Box}>
          <div className="hf-c2-nl hf-in"><${Code} lines=${['if rate >= 60 then  // too fast', '   rate := maxdist;']} /></div>
          <${Sort} id="lexer" bins=${[['kw', t('keyword', 'keyword')], ['id', 'id'], ['rel', 'relop'], ['num', 'number'], ['✗', t('removed', 'بيتشال')]]} items=${A ? [
            ['<code>if</code>', 0], ['<code class="hf-c2-k">&gt;=</code>', 2], ['<code>60</code>', 3], ['المسافات (blank)', 4],
            ['<code>// too fast</code>', 4], ['الـ newline', 4], ['<code>maxdist</code>', 1]
          ] : [
            ['<code>if</code>', 0], ['<code class="hf-c2-k">&gt;=</code>', 2], ['<code>60</code>', 3], ['the blanks', 4],
            ['<code>// too fast</code>', 4], ['the newline', 4], ['<code>maxdist</code>', 1]
          ]} />
        `, { sec: t('Exercise: be the lexer', 'تمرين: خليك الـ lexer') }),

        // 7 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ scanner والـ lexical analyzer نفس الحاجة؟', 'أيوه. الـ lexical analysis اسمها كمان <b>scanning</b>. جرّب السؤال اللي تحت.'],
            ['الـ keywords بتتعرف إمتى؟', 'في الـ <b>lexical analysis</b>. مش في الـ parsing ولا الـ code generation.'],
            ['الـ scanner بيبني الـ parse tree؟', 'لأ، دي شغلانة الـ <b>parser</b>. الـ scanner بيطلّع tokens بس.']
          ] : [
            ['Are "scanner" and "lexical analyzer" the same thing?', 'Yes. Lexical analysis is also called <b>scanning</b>. Try the question below.'],
            ['When are keywords recognized?', 'During <b>lexical analysis</b>. Not in parsing, not in code generation.'],
            ['Does the scanner build the parse tree?', "No, that's the <b>parser</b>. The scanner only produces tokens."]
          ]} />
          ${mq('m-grp', /grouping of characters into tokens/i)}
        `),

        // 8 · describe, then recognize
        page(html`
          <${H1}>${t('Describe it, then recognize it', 'اوصفها، وبعدين اتعرّف عليها')}</${H1}>
          <${P}>${X('How does the scanner know that <code>rate</code> is an id and <code>60</code> is a number? Two tools work as a team:',
            'الـ scanner عرف منين إن <code>rate</code> ده id و<code>60</code> ده number؟ فيه أداتين شغالين مع بعض:')}</${P}>
          <${UL} items=${(A ? ['الـ <b>regular expressions</b> بتوصف شكل الـ tokens.', 'الـ <b>finite automata</b> بتتعرّف على الـ tokens دي، وممكن تتحوّل لـ algorithm بيعمل matching. وهي <bdi dir="ltr">modeling criterion</bdi> للـ phase دي.']
            : ['<b>Regular expressions</b> describe what the tokens look like.', '<b>Finite automata</b> recognize those tokens and can be converted into an algorithm for matching input strings. They are a "modeling criterion" of this phase.']).map(C)} />
          ${mq('m-desc', /typically described using/i)}
        `, { sec: t('Alphabets and strings', 'الـ alphabets والـ strings') }),

        // 9 · alphabets and strings
        page(html`
          <${H1}>${t('Start small: alphabets and strings', 'نبدأ صغيّر: الـ alphabets والـ strings')}</${H1}>
          <${Def}>${X('An <b>alphabet (Σ)</b> is a <b>finite, non-empty, ordered</b> set of symbols, letters or characters.', 'الـ <b>alphabet (Σ)</b> هي set <b>محدودة، مش فاضية، ومرتّبة</b> من الـ symbols أو الحروف أو الـ characters.')}</${Def}>
          <${Def}>${X('A <b>string</b> (also called a word or token) is a <b>finite sequence</b> of symbols from an alphabet.', 'الـ <b>string</b> (وبيتقال لها word أو token) هي <b>sequence محدودة</b> من symbols من alphabet.')}</${Def}>
          <${UL} items=${(A ? ['الـ <code>011</code> string طولها 3 على <bdi dir="ltr">Σ = {0,1}</bdi>.', 'الـ <code>0101</code> طولها 4.', 'الـ <code>for</code> string طولها 3 على الـ alphabet بتاع <bdi dir="ltr">C++</bdi>.']
            : ['<code>011</code> is a string of length 3 over Σ = {0,1}.', '<code>0101</code> has length 4.', '<code>for</code> is a string of length 3 over the C++ alphabet.']).map(C)} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"An alphabet Σ is a ___ set"</i>: <b>finite, non-empty, ordered</b>. Not infinite, not "possibly empty". And the length of a string is its number of symbols.',
            'لو اتسألت<span class="ltr"><i>"An alphabet Σ is a ___ set"</i></span>الإجابة <b><bdi dir="ltr">finite, non-empty, ordered</bdi></b>. وطول الـ string هو عدد الـ symbols اللي فيها.')}</p></${Box}>
        `),

        // 10 · languages + figure
        page(html`
          <${P} small=${true}>${X('A set of strings is called a <b>language</b>. All integer constants: alphabet = the digits 0–9. All variable names: letters and digits (and perhaps a few others, like underscore).',
            'الـ set من الـ strings اسمها <b>language</b>. كل الـ integer constants: الـ alphabet هي الأرقام من 0 لـ 9. وكل أسماء الـ variables: حروف وأرقام (وممكن كام character تاني، زي الـ underscore).')}</${P}>
          <${Hand} red=${true}>${t('Brain Power answer: a number is a string over the alphabet 0–9!', 'إجابة "شغّل مخك": الـ number هو string على الـ alphabet من 0 لـ 9!')}</${Hand}>
          <${Fig} name="cc-strings" />
        `),

        // 11 · union and concatenation
        page(html`
          <${H1}>${t('Mixing languages: union and concatenation', 'نخلط الـ languages: الـ union والـ concatenation')}</${H1}>
          <${P} small=${true}>${X('<b>Union</b>: everything in either set, nothing else, and no duplicates.', 'الـ <b>Union</b>: كل حاجة في أي set من الاتنين، ومفيش حاجة تانية، ومن غير تكرار.')}</${P}>
          <${Code} lines=${['{abc, ab, ba} ∪ {ba, bb}', ['  = {abc, ab, ba, bb}', t('ba once', 'الـ ba مرة واحدة')]]} />
          <${P} small=${true}>${X('Union is <b>commutative</b>: L1 ∪ L2 = L2 ∪ L1. <b>Concatenation</b> joins each string of one language with each string of the other:', 'الـ union <b>commutative</b>، يعني الترتيب مش فارق. أما الـ <b>Concatenation</b> فبتلزق كل string في language مع كل string في التانية:')}</${P}>
          <${Code} lines=${['{ab, c}{d, ef} = {abd, abef, cd, cef}', 'L1 = {a,b}, L2 = {0,11}', ['L1L2 = {a0, a11, b0, b11}', ''], ['L2L1 = {0a, 0b, 11a, 11b}', nt('≠ L1L2!')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Order matters in concatenation.</b> "Order is not important in concatenation" turned up in three of the doctors\' papers. It is <b>False</b> every time.',
            '<b>الترتيب فارق في الـ concatenation.</b> جملة إن الترتيب مش مهم في الـ concatenation جت في تلات امتحانات للدكتورة، وكل مرة إجابتها <b>False</b>.')}</p></${Box}>
        `, { sec: t('Operations on languages', 'العمليات على الـ languages') }),

        // 12 · closures, ε, or
        page(html`
          <${H2}>${t('Star, plus, and nothing at all', 'النجمة، والزائد، واللاشيء')}</${H2}>
          <${UL} items=${(A ? [
            'الـ <b>Kleene closure</b>: الـ <bdi dir="ltr">Σ*</bdi> هي كل الـ strings من <b>صفر أو أكتر</b> من strings الـ Σ.<span class="ltr">{a}* = {ε, a, aa, aaa, …}</span>',
            'الـ <b>Positive closure</b>: الـ <bdi dir="ltr">Σ+</bdi> هي <b>واحد أو أكتر</b>.<span class="ltr">{a}+ = {a, aa, aaa, …}</span>',
            'الـ <b>Or operator</b>:<span class="ltr">a|b|c = {a, b, c}</span>'
          ] : [
            '<b>Kleene closure</b> Σ*: all strings made of <b>zero or more</b> strings in Σ. <code>{a}* = {ε, a, aa, aaa, …}</code>',
            '<b>Positive closure</b> Σ+: <b>one or more</b>. <code>{a}+ = {a, aa, aaa, …}</code>',
            '<b>Or operator</b>: <code>a|b|c = {a, b, c}</code>'
          ]).map(C)} />
          <${Talk} who="dev">${t("So what's the only difference between * and +?", 'يعني الفرق الوحيد بين * و+ إيه؟')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X('<b>ε</b>, the empty string. Zero copies are allowed in <code>*</code>, not in <code>+</code>.', 'الـ <b>ε</b>، الـ empty string. صفر نسخ مسموح في <code>*</code>، ومش مسموح في <code>+</code>.')}</${Talk}>
          <${P} small=${true}>${X('<b>ε</b> is the string of length 0, so <b>{ε}</b> is a set of <b>one</b> element. ‡ The slide calls ε "a notation of an empty string, such as Φ", but Φ normally names the empty set, which has <b>no</b> elements: {ε} ≠ Φ.',
            'الـ <b>ε</b> هي الـ string اللي طولها 0، فالـ <b>{ε}</b> set فيها element <b>واحد</b>. ‡ السلايد بتقول عن ε إنها رمز للـ empty string "زي Φ"، بس الـ Φ عادةً اسم الـ empty set اللي <b>مفيهاش</b> elements، فالاتنين مش زي بعض.')}</${P}>
        `),

        // 13 · figure
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"Regular expression a|b denotes": <b>{a, b}</b>. Not {ab}, not {ε, a, b}. Try every operation below.', 'لو اتسألت الـ <bdi dir="ltr">a|b</bdi> بتدّي إيه، الإجابة <b><bdi dir="ltr">{a, b}</bdi></b>، مش <bdi dir="ltr">{ab}</bdi> ولا <bdi dir="ltr">{ε, a, b}</bdi>. جرّب كل عملية تحت.')}</p></${Box}>
          <${Fig} name="cc-lang-ops" />
        `),

        // 14 · regular expressions and precedence
        page(html`
          <${H1}>${t('Regular expressions', 'الـ Regular expressions')}</${H1}>
          <${P} small=${true}>${X('A tiny language for describing languages: over X = {a,b,c}, <code>ab*</code> and <code>a|b|c*</code> are regular expressions. Which operator grabs first?',
            'لغة صغيرة بنوصف بيها الـ languages: على <bdi dir="ltr">X = {a,b,c}</bdi>، الـ <code>ab*</code> والـ <code>a|b|c*</code> regular expressions. مين بيمسك الأول؟')}</${P}>
          <${Def}>${X('<b>*</b> binds tightest, then <b>concatenation</b>, then <b>|</b>.', 'الـ <b>*</b> الأقوى، بعدها الـ <b>concatenation</b>، وبعدها الـ <b>|</b>.')}</${Def}>
          <${Precedence} />
          <${Grow} />
          <${Hand}>${X('Memory trick (ours): <b>S</b>tar, <b>S</b>tick, <b>S</b>plit', 'حيلة للحفظ (من عندنا): نجمة، لزق، اختيار')}</${Hand}>
        `, { sec: t('Regular expressions', 'الـ Regular expressions') }),

        // 15 · the lecture's examples
        page(html`
          <${H2}>${t("The lecture's examples", 'أمثلة المحاضرة')}</${H2}>
          <${Code} lines=${[['0|1', nt('= {0, 1}')], ['0*', nt('= {ε, 0, 00, …}')], ['(0|1)(0|1)', nt('= {00, 01, 10, 11}')], ['0|0*1', nt('= {0, 1, 01, 001, …}')], ['(a|c)*b(a|c)*', t('exactly one b over {a,b,c}', 'حرف b واحد بالظبط')]]} />
          <${P} small=${true}>${X('Read the last one out loud: "anything without a b, then <b>one</b> b, then anything without a b". The b-free parts can be empty, so <code>b</code> alone is in.',
            'اقرا الأخير بصوت عالي: "أي حاجة من غير b، وبعدين b <b>واحدة</b>، وبعدين أي حاجة من غير b". والأجزاء اللي من غير b ممكن تبقى فاضية، فالـ <code>b</code> لوحدها مقبولة.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('Now write <b>exactly two a\'s</b> over {a,b}. Then compare with <code>(a|b)*a(a|b)*a(a|b)*</code>. Why is that one <i>wrong</i> for "exactly"?',
            'اكتب دلوقتي <b>حرفين a بالظبط</b> على <bdi dir="ltr">{a,b}</bdi>. وبعدين قارن بـ <code>(a|b)*a(a|b)*a(a|b)*</code>. ليه دي <i>غلط</i> لكلمة "بالظبط"؟')}</p></${Box}>
          <${Reveal} id="two-a"><${P} small=${true}>${X('<code>b*ab*ab*</code> (Sheet One). The other one lets the <code>(a|b)*</code> parts hold more a\'s, so it means <b>at least</b> two a\'s.',
            'الإجابة <code>b*ab*ab*</code> (الـ Sheet One). التانية بتسمح للـ <code>(a|b)*</code> يبقى فيها a زيادة، فمعناها <b>على الأقل</b> حرفين a.')}</${P}></${Reveal}>
        `),

        // 16 · figure
        page(html`
          <${H2}>${t('Test strings against them', 'اختبر strings عليهم')}</${H2}>
          <${Fig} name="cc-regex-test" />
        `),

        // 17 · match exercise
        page(html`
          <${H2}>${t('Which language is it?', 'أنهي language؟')}</${H2}>
          <${P} small=${true}>${t('Tap an expression, then tap the language it describes.', 'دوس على الـ expression، وبعدين دوس على الـ language اللي بيوصفها.')}</${P}>
          <${Match} id="re-lang" left=${['<code>0|1</code>', '<code>0*</code>', '<code>(0|1)(0|1)</code>', '<code>0|0*1</code>', '<code>a|b|c</code>', '<code>b*ab*ab*</code>']}
            right=${['<bdi dir="ltr">{00, 01, 10, 11}</bdi>', A ? 'حرفين a بالظبط على <bdi dir="ltr">{a,b}</bdi>' : "exactly two a's over {a,b}", '<bdi dir="ltr">{0, 1}</bdi>', '<bdi dir="ltr">{a, b, c}</bdi>', '<bdi dir="ltr">{ε, 0, 00, 000, …}</bdi>', '<bdi dir="ltr">{0, 1, 01, 001, …}</bdi>']}
            answer=${[2, 4, 0, 5, 3, 1]} />
        `, { sec: t('Exercises: regular expressions', 'تمارين: الـ regular expressions') }),

        // 18 · write your own (Sheet One)
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('From the doctors\' Sheet One. Over Σ = {a,b}, write a regular expression for each. Use the margin, then reveal.', 'من الـ Sheet One بتاع الدكاترة. على <bdi dir="ltr">Σ = {a,b}</bdi>، اكتب regular expression لكل واحدة. اكتب في الهامش وبعدين اكشف.')}</p></${Box}>
          <${UL} items=${(A ? ['على الأقل حرفين a', 'كل الـ strings', 'فيها aa أو bb', 'حروف b بس، أو a وبعدها b\'s', 'بالظبط اتنين أو تلاتة b']
            : ["at least two a's", 'all strings', 'containing aa or bb', "b's only, or an a followed by b's", "exactly two or three b's"]).map(C)} />
          <${Reveal} id="sheet1"><${Code} lines=${[['(a|b)*a(a|b)*a(a|b)*', t('at least two a', 'على الأقل اتنين')], ['(a|b)*', t('all strings', 'الكل')], ['(a|b)*(aa|bb)(a|b)*', t('aa or bb', 'فيها aa أو bb')], ['b* | ab*', t('b\'s, or a b\'s', 'يا b بس يا a وبعدها b')], ['a*ba*ba* | a*ba*ba*ba*', t('2 or 3 b', 'اتنين أو تلاتة b')]]} /></${Reveal}>
          <${Grow} />
          <${Hand} red=${true}>${X('"b\'s only or a then b\'s" is the same shape as the midterm\'s <code>ab* | ba*</code> question. You\'ll meet it in the Exam corner.', 'شكل "b بس أو a وبعدها b" هو نفس شكل سؤال الميدترم <code>ab* | ba*</code>. هتقابله في ركن الامتحان.')}</${Hand}>
        `),

        // 19 · algebra table
        page(html`
          <${H2}>${t('The algebra of regular expressions', 'جبر الـ regular expressions')}</${H2}>
          <table className="hf-c2-tbl law hf-in"><thead><tr><th>${t('Law', 'القانون')}</th><th>${t('Meaning', 'المعنى')}</th></tr></thead>
            <tbody>${LAWS.map(([l, m, ma], i) => html`<tr key=${i}><td className="m" dir="ltr">${l}</td><td>${T(A ? ma : m)}</td></tr>`)}</tbody></table>
          <${Grow} />
          <${Hand}>${X('Ours: | acts like +, concatenation like ×, ε like 1.', 'من عندنا: الـ <code>|</code> زي الجمع، واللزق زي الضرب، والـ ε زي الواحد.')}</${Hand}>
        `, { sec: t('Algebraic properties', 'الخواص الجبرية') }),

        // 20 · traps
        page(html`
          <${Box} kind="watch" title=${t("Watch it: the doctors' favourite traps", 'خلّي بالك: الفخاخ المفضلة للدكتورة')}>
            ${li(A ? [
              'الـ ε عنصر محايد، فالإجابة a مش ε:<span class="ltr"><b>aε = εa = a</b></span>',
              'ودي برضه صح، فالـ "≠" غلط:<span class="ltr"><b>Yε = εY</b></span>',
              'الـ <bdi dir="ltr">(X|Y)*</bdi> فيها XY والـ <bdi dir="ltr">X*|Y*</bdi> مفيهاش، فدي <b>False</b>:<span class="ltr">"(X | Y)* is equivalent to X* | Y*"</span>',
              'الـ concatenation بيتوزّع على الـ <code>|</code>، فدي <b>False</b>:<span class="ltr">"a(b|c) is not equal to ab|ac"</span>',
              'الأقواس حوالين symbol واحد مش بتغيّر حاجة، فدي <b>True</b>:<span class="ltr">"ab(c) is equivalent to (a)bc"</span>',
              'والـ <code>|</code> commutative، فدول متساويين:<span class="ltr">a | (b*c) = b*c | a</span>'
            ] : [
              '<b>aε = εa = a</b>, not ε. ε is the neutral element.',
              '<b>Yε = εY</b>, so "Yε ≠ εY" is false.',
              '"(X | Y)* is equivalent to X* | Y*": <b>False</b>. (X|Y)* contains XY; X*|Y* does not.',
              '"a(b|c) is not equal to ab|ac": <b>False</b>. Concatenation distributes over |.',
              '"ab(c) is equivalent to (a)bc": <b>True</b>. Brackets round one symbol change nothing.',
              'a | (b*c) is equivalent to b*c | a: | is commutative.'
            ])}</${Box}>
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${X('When in doubt, plug in tiny strings: take X = a, Y = b and look for <code>ab</code>.', 'لو محتار، جرّب strings صغيرة: خلّي <bdi dir="ltr">X = a</bdi> و<bdi dir="ltr">Y = b</bdi> ودوّر على <code>ab</code>.')}</${Talk}>
        `),

        // 21 · figure
        page(html`
          <${H2}>${t('Check each law with real strings', 'اتأكد من كل قانون بـ strings حقيقية')}</${H2}>
          <${Fig} name="cc-re-algebra" />
        `),

        // 22 · finite automata
        page(html`
          <${H1}>${t('Finite automata: machines that say yes or no', 'الـ Finite automata: مكن بيقول آه أو لأ')}</${H1}>
          <${Def}>${X('A <b>finite automaton</b> is a machine with a <b>finite number of states</b> and a <b>finite number of transitions</b> between them. It recognizes the tokens a regular expression specifies.',
            'الـ <b>finite automaton</b> هو machine فيها <b>عدد محدود من الـ states</b> و<b>عدد محدود من الـ transitions</b> بينهم. بيتعرّف على الـ tokens اللي الـ regular expression بيوصفها.')}</${Def}>
          <${UL} items=${(A ? ['الـ <b>state</b>: دايرة واسمها جوّاها (q1).', 'الـ <b>transition</b>: سهم عليه input token.', 'الـ <b>start state</b>: داخل عليها سهم "start".', 'الـ <b>final (accept) state</b>: دايرة دبل.']
            : ['A <b>state</b>: a circle with its name inside (q1).', 'A <b>transition</b>: an arrow labelled with an input token.', 'The <b>start state</b>: has an incoming "start" arrow.', 'A <b>final (accept) state</b>: a double circle.']).map(C)} />
          <${Grow} />
          <${Hand}>${t("Our analogy: a board game. Each symbol moves your piece along an arrow; end on a double circle and the string is accepted.", 'تشبيه من عندنا: لعبة سلم وتعبان. كل symbol بيحرّك العسكري على سهم، ولو وقفت على دايرة دبل الـ string مقبولة.')}</${Hand}>
        `, { sec: t('Finite automata', 'الـ Finite automata') }),

        // 23 · figure
        page(html`
          <${Fig} name="cc-state-transition" />
        `),

        // 24 · FA for 01
        page(html`
          <${H2}>${t('The first machine: 01', 'أول machine: الـ 01')}</${H2}>
          <${Fig} name="cc-fa-01" />
        `),

        // 25 · a*, a+, (a|b)*
        page(html`
          <${H2}>${t('Three tiny machines: a*, a+ and (a|b)*', 'تلات مكنات صغيرين')}</${H2}>
          <${UL} items=${(A ? [
            'الـ <b><bdi dir="ltr">a*</bdi></b>: state <b>واحدة</b> عليها سهم start، ودايرة دبل (start وfinal في نفس الوقت)، وعليها loop بـ a. فالـ ε مقبولة.',
            'الـ <b><bdi dir="ltr">a+</bdi></b>: start state عليها loop بـ a، وطالع منها edge بـ a لـ state تانية دايرة دبل.',
            'الـ <b><bdi dir="ltr">(a|b)*</bdi></b>: state واحدة q2، start وfinal، وعليها loop بـ <bdi dir="ltr">a,b</bdi>.'
          ] : [
            '<b>a*</b>: <b>one</b> state with the start arrow, drawn as a double circle (start <i>and</i> final), with a loop on a. So ε is accepted.',
            '<b>a+</b>: a start state with a loop on a, and an a-edge to a second state, the double circle.',
            '<b>(a|b)*</b>: one state, q2, start and final, with a loop labelled a,b.'
          ]).map(C)} />
          <${Box} kind="watch"><p className="hf-p small">${X('"In the FA for a+, the start state is also a final state": <b>False</b>. If it were, ε would be accepted, but a+ needs at least one a. Notice the start state of a+ has <b>two</b> edges on a: its loop and the edge to the final state.',
            'جملة إن الـ start state في <bdi dir="ltr">a+</bdi> final برضه: <b>False</b>. لو كانت final كانت الـ ε هتتقبل، و<bdi dir="ltr">a+</bdi> محتاجة a واحدة على الأقل. ولاحظ إن الـ start state فيها طالع منها <b>two edges</b> بـ a: الـ loop والـ edge اللي رايحة للـ final.')}</p></${Box}>
          <${P} small=${true}>${X('‡ The slide leaves the states of a* and a+ unnamed; S, S0 and S1 in the next figure are names the notes give them.', '‡ السلايد مسمّتش الـ states بتاعة <bdi dir="ltr">a*</bdi> و<bdi dir="ltr">a+</bdi>؛ الأسامي S وS0 وS1 في الرسمة الجاية من النوتس.')}</${P}>
        `),

        // 26 · figure
        page(html`
          <${Fig} name="cc-fa-closures" />
        `),

        // 27 · building 1*01(0|1)*
        page(html`
          <${H1}>${t('Build one: 1*01(0|1)*', 'ابنيها بنفسك')}</${H1}>
          <${P} small=${true}>${X('Slide 11 asks you to construct a finite automaton for <code>1*01(0|1)*</code>. Take the expression one piece at a time:', 'سلايد 11 بتطلب finite automaton للـ <code>1*01(0|1)*</code>. خد الـ expression حتة حتة:')}</${P}>
          <div className="hf-c2-steps hf-in">
            <div><code dir="ltr">1*</code><span>${X('a <b>loop on 1</b> at the start state q0', 'الـ <b>loop بـ 1</b> على الـ start state q0')}</span></div>
            <div><code dir="ltr">0</code><span>${X('an edge <b>q0 –0→ q1</b>', 'سهم من q0 لـ q1 بـ <b>0</b>')}</span></div>
            <div><code dir="ltr">1</code><span>${X('an edge <b>q1 –1→ q2</b>', 'سهم من q1 لـ q2 بـ <b>1</b>')}</span></div>
            <div><code dir="ltr">(0|1)*</code><span>${X('q2 is the <b>final state</b>, with a <b>loop on 0,1</b>', 'الـ q2 هي الـ <b>final state</b>، وعليها <b>loop بـ 0 و1</b>')}</span></div>
          </div>
          <${P} small=${true}>${X('In a transition table, <b>→</b> marks the start state, <b>*</b> a final state, <b>–</b> no transition:', 'في الـ transition table: السهم <bdi dir="ltr">→</bdi> للـ start state، والـ <bdi dir="ltr">*</bdi> للـ final state، والـ <bdi dir="ltr">–</bdi> يعني مفيش transition:')}</${P}>
          <table className="hf-c2-tbl ctr hf-in" dir="ltr"><thead><tr><th>State</th><th className="m">0</th><th className="m">1</th></tr></thead>
            <tbody>${[['→ q0', 'q1', 'q0'], ['q1', '–', 'q2'], ['* q2', 'q2', 'q2']].map(r => html`<tr key=${r[0]}><th className="m">${r[0]}</th><td className="m">${r[1]}</td><td className="m">${r[2]}</td></tr>`)}</tbody></table>
          <${Grow} />
          <${Hand} red=${true}>${X('q1 has <b>no</b> move on 0. Read a 0 there and the string is rejected.', 'الـ q1 <b>مفيهاش</b> حركة على 0. لو قريت 0 وإنت فيها، الـ string مرفوضة.')}</${Hand}>
        `, { sec: t('Building an automaton', 'نبني automaton') }),

        // 28 · figure
        page(html`
          <${Fig} name="cc-fa-1s01" />
        `),

        // 29 · accept or reject
        page(html`
          <${Box} kind="pencil" title=${t('Accept or reject?', 'مقبولة ولا مرفوضة؟')}><p className="hf-p small">${X('Run each string through the machine for <code>1*01(0|1)*</code> in your head. Tap <b>✓</b> if it ends on q2, <b>✗</b> if not.', 'شغّل كل string في دماغك على الـ machine بتاعة <code>1*01(0|1)*</code>. دوس <b>✓</b> لو خلصت على q2، و<b>✗</b> لو لأ.')}</p></${Box}>
          <${Sort} id="acc" bins=${[['✓', t('accepted', 'مقبولة')], ['✗', t('rejected', 'مرفوضة')]]} items=${[
            ['<code>1101</code>', 0], ['<code>100</code>', 1], ['<code>0</code>', 1], ['<code>01</code>', 0], ['<code>111</code>', 1], ['<code>0110</code>', 0], ['<code>1001</code>', 1], ['<code>10101</code>', 0]
          ]} />
        `, { sec: t('Exercises: automata', 'تمارين: الـ automata') }),

        // 30 · fireside: RE vs FA
        page(html`
          <${Fireside} sub=${t('Tonight: a Regular Expression and a Finite Automaton, partners who never stop competing.', html`قعدة الليلة: <bdi>Regular\u00a0Expression</bdi> و<bdi>Finite\u00a0Automaton</bdi>، شركا بيتنافسوا على طول.`)} />
          <${Chat} names=${[t('Regular expression', 'الـ Regular expression'), t('Finite automaton', 'الـ Finite automaton')]} lines=${A ? [
            [0, 'أنا <b>بوصف</b> الـ tokens. سطر واحد زي <code>(a|c)*b(a|c)*</code> وخلاص، دي كل الـ strings اللي فيها b واحدة.'],
            [1, 'الوصف حلو. بس أنا اللي <b>بتعرّف</b> عليها. ادّيني string وأقولك آه أو لأ.'],
            [0, 'وإنت محتاج رسمة كاملة: دواير وأسهم ودواير دبل.'],
            [1, '<b>عدد محدود</b> من الـ states والـ transitions. وأتحوّل لـ <b>algorithm</b> بيعمل matching للـ input strings.'],
            [0, 'ماشي، بس مين اللي بيقولك تقبل إيه؟'],
            [1, 'إنت. أنا بتعرّف على الـ tokens اللي <b>إنت</b> بتوصفها. عشان كده في الامتحان الإجابة "a and b".']
          ] : [
            [0, 'I <b>describe</b> tokens. One line, <code>(a|c)*b(a|c)*</code>, and that\'s every string with exactly one b.'],
            [1, 'Describing is nice. I actually <b>recognize</b> them. Give me a string and I say yes or no.'],
            [0, 'You need a whole drawing: circles, arrows, double circles.'],
            [1, 'A <b>finite number</b> of states and transitions. And I convert into an <b>algorithm</b> for matching input strings.'],
            [0, 'Fine. But who tells you what to accept?'],
            [1, 'You do. I recognize the tokens <b>you</b> specify. That\'s why the exam\'s answer is "a and b".']
          ]} />
        `),

        // 31 · fill the table
        page(html`
          <${Box} kind="pencil" title=${t('Build the machine', 'ابني الـ machine')}><p className="hf-p small">${X('Sheet One: draw a finite automaton for <code>b*a+(c|d)</code>. Fill its transition table: tap a cell to cycle through –, q0, q1, q2.', 'من الـ Sheet One: ارسم finite automaton للـ <code>b*a+(c|d)</code>. املا الـ transition table: دوس على الخانة عشان تلف على <bdi dir="ltr">–, q0, q1, q2</bdi>.')}</p></${Box}>
          <${Hand}>${X('think piece by piece, like 1*01(0|1)*: <code>b*</code> loops, <code>a+</code> is "a, then any more a\'s"', 'فكّر حتة حتة زي اللي فات: الـ <code>b*</code> loop، والـ <code>a+</code> يعني a وبعدها أي عدد a')}</${Hand}>
          <${TableFill} />
        `),

        // 32 · NFA vs DFA
        page(html`
          <${H1}>${t('Two kinds of machine: DFA and NFA', 'نوعين مكن: الـ DFA والـ NFA')}</${H1}>
          <div className="hf-c2-cmp hf-in">
            <div></div><div>DFA</div><div>NFA</div>
            ${CMP.map((r, i) => html`<${React.Fragment} key=${i}><div className="h">${T(r[0])}</div><div>${T(r[1])}</div><div>${T(r[2])}</div></${React.Fragment}>`)}
          </div>
          <${P} small=${true}>${X('‡ The slide says an NFA\'s next state count is "either zero or one". In general an NFA can have zero, one or <b>several</b> next states, as the last row says.',
            '‡ السلايد بتقول إن الـ NFA عدد الـ next states بتاعه "صفر أو واحد". بس عمومًا الـ NFA ممكن يبقى ليه صفر أو واحدة أو <b>كذا</b> next state، زي ما آخر صف بيقول.')}</${P}>
          <${Grow} />
          <${Talk} who="cpu">${X('A DFA never has to guess: one next state, so it runs faster.', 'الـ DFA عمره ما بيخمّن: next state واحدة، فبيخلص أسرع.')}</${Talk}>
        `, { sec: t('NFA vs DFA', 'الـ NFA والـ DFA') }),

        // 33 · figure
        page(html`
          <${Fig} name="cc-nfa-dfa" />
        `),

        // 34 · sort DFA / NFA
        page(html`
          <${Box} kind="pencil" title=${t('DFA or NFA?', 'الـ DFA ولا الـ NFA؟')}><p className="hf-p small">${X('Tap <b>D</b> for DFA or <b>N</b> for NFA, then check.', 'دوس <b>D</b> للـ DFA أو <b>N</b> للـ NFA، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="dn" bins=${[['D', 'DFA'], ['N', 'NFA']]} items=${A ? [
            ['مينفعش يستخدم <bdi>ε</bdi> transition', 0], ['ينفع يستخدم الـ <bdi>ε</bdi> transitions', 1], ['ليه next state واحدة بالظبط', 0], ['بياخد وقت أكتر عشان يشغّل input string', 1],
            ['بياخد وقت أقل لأي input string', 0], ['كل pair من state وinput ممكن يبقى ليه next states كتير', 1], ['الـ next state محددة بوضوح', 0]
          ] : [
            ['Cannot use an ε transition', 0], ['Can use ε transitions', 1], ['Exactly one next state', 0], ['Takes more time to run an input string', 1],
            ['Takes less time to run any input string', 0], ['Each (state, input) pair may have many next states', 1], ['The next possible state is clearly set', 0]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('"A DFA needs more time than an NFA": False. It\'s the other way round.', 'جملة إن الـ DFA محتاج وقت أكتر من الـ NFA: False. العكس هو الصح.')}</${Hand}>
        `),

        // 35–37 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers and this year's midterm. Tap an answer to see why.", 'أسئلة حقيقية من امتحانات الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m-io', /takes \.{5} as input/i)}
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${t('Input and output: the exams love to swap them.', 'الـ input والـ output: الامتحانات بتحب تبدّلهم.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-ab', /single 'a' is followed by any number/i)}
          <${Gap} h=${4} />
          ${mq('m-ord', /strings produced by L1L2/i)}
        `),
        page(html`
          ${mq('m-eps', /aε = εa/)}
          <${Gap} h=${4} />
          ${mq('m-two', /exaclty two a's/i)}
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>lexical analysis</b> هي أول phase. بتاخد characters وتطلّع tokens للـ parser، وبتشيل الـ comments والـ white space، وبتتعرّف على الـ keywords، واسمها كمان scanning.',
            'الـ <b>token</b> هو الـ category (id و relop و number)، والـ <b>lexeme</b> هو الـ string الحقيقي (<code>distance</code>).',
            'الـ <b>alphabet</b> هي set محدودة، مش فاضية، ومرتّبة. والـ <b>string</b> sequence محدودة من symbols. والـ <b>language</b> هي set من الـ strings.',
            'الـ union commutative، لكن في الـ concatenation <b>الترتيب فارق</b>:<span class="ltr">L1L2 ≠ L2L1</span>',
            'الـ <bdi dir="ltr">*</bdi> صفر أو أكتر (فيها ε)، والـ <bdi dir="ltr">+</bdi> واحد أو أكتر. والأولوية: الـ <bdi dir="ltr">*</bdi> وبعدها الـ concatenation وبعدها الـ <bdi dir="ltr">|</bdi>.',
            'دي فخاخ:<span class="ltr">aε = a,  (X|Y)* ≠ X*|Y*,  a(b|c) = ab|ac</span>',
            'الـ <b>regular expressions</b> بتوصف الـ tokens والـ <b>finite automata</b> بتتعرّف عليها. والـ DFA مفيهوش ε، وليه next state واحدة، وأسرع.'
          ] : [
            '<b>Lexical analysis</b> is phase 1: characters in, tokens out to the parser. It removes comments and white space, recognizes keywords, and is also called scanning.',
            'A <b>token</b> is the category (id, relop, number); a <b>lexeme</b> is the actual string (<code>distance</code>).',
            'An <b>alphabet</b> is finite, non-empty and ordered; a <b>string</b> is a finite sequence of its symbols; a <b>language</b> is a set of strings.',
            'Union is commutative; in concatenation <b>order matters</b>: L1L2 ≠ L2L1.',
            '* is zero or more (includes ε), + is one or more. Precedence: *, then concatenation, then |.',
            'Traps: aε = a, (X|Y)* ≠ X*|Y*, a(b|c) = ab|ac.',
            '<b>Regular expressions</b> describe tokens; <b>finite automata</b> recognize them. A DFA has no ε moves, exactly one next state, and runs faster.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="compiler">${t('Next time: how to turn an NFA into a DFA.', 'المرة الجاية: إزاي نحوّل الـ NFA لـ DFA.')}</${Talk}>
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

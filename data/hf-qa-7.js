// Head First chapter for Software Quality Assurance Lecture 7 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Maturity models and quality standards: why organizations need them, the CMM (who made it, five incremental levels that
// cannot be skipped, where it applies), its 6 structure components, the five levels and the slide's figure (arrows and
// management labels), Table 1 (the improvements implemented at each level), Key Process Areas and their 5 aspects, the
// benefits of CMM, ISO 9000 (generic, isos = equal, 20 documented elements), the 8 ISO principles, software engineering
// standards (local to international, IEEE since 1976) and SPICE (ISO/IEC 15504, 1993, 3 objectives).
// Every fact comes from the lecture's notes; analogies, jokes and memory tricks are marked as ours. The "Which CMM level?"
// exercises use the slide text and Table 1 word for word (checked item by item against the notes).
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T7 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-qa7')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa7';
    s.textContent = `
.hfb .hf-qa7-stairs{ display:flex; align-items:flex-end; gap:6px; height:92px; padding:0 4px; }
.hfb .hf-qa7-stairs .hf-qa7-st{ flex:1 1 0; min-width:0; border:2px solid var(--hf-line); border-bottom-width:3px; border-radius:6px 6px 0 0; background:var(--hf-grey); display:flex; flex-direction:column; align-items:center; padding-top:4px; animation:hf-qa7-lit 6s ease-in-out infinite both; }
.hfb .hf-qa7-stairs .hf-qa7-st b{ font:800 19px/1 var(--body); color:var(--ink); }
.hfb .hf-qa7-stairs .hf-qa7-st.still{ animation:none; background:color-mix(in srgb, var(--hf-k) 40%, var(--paper)); }
@keyframes hf-qa7-lit{ 0%,6%{ background:var(--hf-grey); } 14%,78%{ background:color-mix(in srgb, var(--hf-k) 55%, var(--paper)); } 90%,100%{ background:var(--hf-grey); } }
.hfb .hf-qa7-nl{ display:grid; gap:6px; }
.hfb .hf-qa7-nl .hf-qa7-r{ display:grid; grid-template-columns:24px minmax(0,1fr); gap:8px; align-items:start; }
.hfb .hf-qa7-nl .hf-qa7-n{ width:24px; height:24px; border-radius:50%; display:grid; place-items:center; font:800 13px/1 var(--body); background:var(--hf-line); color:var(--paper); }
.hfb .hf-qa7-nl.lv .hf-qa7-n{ border-radius:6px; border:1.5px solid var(--hf-line); background:color-mix(in srgb, var(--hf-k) var(--p), var(--paper)); color:var(--ink); }
.hfb .hf-qa7-nl .hf-qa7-d{ font-size:14px; line-height:1.33; color:var(--ink); }
.hfb .hf-qa7-nl.tight{ gap:4px; } .hfb .hf-qa7-nl.tight .hf-qa7-d{ font-size:13.5px; line-height:1.28; }
.hfb .hf-qa7-nl .hf-qa7-d b{ font-weight:700; }
.hfb .hf-qa7-t1{ display:grid; gap:6px; }
.hfb .hf-qa7-t1 .hf-qa7-row{ font:500 14px/1.4 var(--body); color:var(--ink); padding:5px 8px; border-radius:7px; border-left:6px solid color-mix(in srgb, var(--hf-k) var(--p), var(--paper)); background:var(--hf-grey); }
.hfb .hf-qa7-t1 .hf-qa7-lvl{ font:800 14px/1.25 var(--body); color:var(--ink); margin-right:6px; }
.hfb .hf-qa7-t1 .hf-qa7-i{ animation:hf-qa7-fade .6s both; }
.hfb .hf-qa7-t1 .hf-qa7-i.none{ color:var(--graphite); font-style:italic; }
.hfb .hf-qa7-t1 .hf-qa7-sep{ font-style:normal; font-weight:800; color:var(--hf-k); margin:0 5px; }
@keyframes hf-qa7-fade{ from{ opacity:0; } }
.hfb .hf-qa7-pick{ display:grid; gap:2px; }
.hfb .hf-qa7-pick .hf-qa7-it{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:6px; align-items:center; font:500 13.5px/1.25 var(--body); color:var(--ink); padding:2px 0; border-bottom:1px dotted var(--faint); }
.hfb .hf-qa7-pick .hf-qa7-lvb{ display:flex; gap:3px; }
.hfb .hf-qa7-pick .hf-qa7-lvb button{ width:25px; height:29px; padding:0; font:800 13.5px/1 var(--body); border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa7-pick .hf-qa7-lvb button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-qa7-pick .hf-qa7-it.ok .hf-qa7-txt::after{ content:" ✓"; color:var(--ok); font-weight:700; }
.hfb .hf-qa7-pick .hf-qa7-it.no .hf-qa7-txt::after{ content:" ✗"; color:var(--hf-red); font-weight:700; }
.hfb .hf-qa7-pick .hf-qa7-fix{ display:block; font-family:"Caveat", cursive; font-size:17px; line-height:1; color:var(--hf-red); font-weight:600; }
.hfb .hf-qa7-key{ display:flex; flex-wrap:wrap; gap:3px 10px; font:600 13px/1.2 var(--body); color:var(--graphite); }
.hfb .hf-qa7-key b{ color:var(--ink); font-weight:800; }
.hfb .hf-qa7-lad{ display:flex; flex-direction:column; align-items:flex-start; }
.hfb .hf-qa7-lad .hf-qa7-lr{ display:flex; flex-wrap:wrap; gap:0 6px; align-items:baseline; padding:4px 10px; border:1.5px solid var(--hf-line); border-radius:999px; background:color-mix(in srgb, var(--hf-k) var(--p), var(--paper)); animation:hf-up .5s both; }
.hfb .hf-qa7-lad .hf-qa7-lr b{ font:800 14px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qa7-lad .hf-qa7-lr span{ font:500 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-qa7-lad .hf-qa7-arw{ margin-left:22px; padding:2px 0 2px 10px; border-left:2px solid var(--hf-line); font:600 13.5px/1.2 var(--body); color:var(--hf-hand); }
.hfb .hf-qa7-lad .hf-qa7-arw i{ font-style:normal; margin-right:5px; color:var(--ink); }
.hf-ar .hf-qa7-nl .hf-qa7-d, .hf-ar .hf-qa7-pick .hf-qa7-it{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-qa7-nl .hf-qa7-d{ font-size:13.5px; line-height:1.5; }
.hf-ar .hf-qa7-nl.tight .hf-qa7-d{ font-size:13px; line-height:1.42; }
.hf-ar .hf-qa7-pick .hf-qa7-it{ font-size:13.5px; line-height:1.4; }
.hf-ar .hf-qa7-pick .hf-qa7-fix{ font-family:"Aref Ruqaa", "Caveat", cursive; font-size:15px; line-height:1.4; }
`;
    document.head.appendChild(s);
  }

  const LV = ['Initial', 'Repeatable', 'Defined', 'Quantitatively Managed', 'Optimizing'];

  // the opener's staircase: five levels lighting up one after another, like a climb
  function Stairs() {
    const still = calm();
    return html`<div className="hf-in" dir="ltr" role="img" aria-label="The five CMM levels as a staircase, Level 1 at the bottom">
      <div className="hf-qa7-stairs">${[1, 2, 3, 4, 5].map(k => html`<div key=${k} className=${'hf-qa7-st' + (still ? ' still' : '')} style=${{ height: (20 + k * 14) + 'px', animationDelay: (k - 1) * 0.7 + 's' }}><b>${k}</b></div>`)}</div>
    </div>`;
  }

  // the slide's figure in words: each level's management label and the name of each arrow up (top level first)
  function FigLadder() {
    const rows = [[5, 'Optimizing', 'Change Management'], [4, 'Managed', 'Capability Management'], [3, 'Defined', 'Process Management'], [2, 'Repeatable', 'Project Management'], [1, 'Initial', 'Inconsistent Management']];
    const arrows = ['Process Control', 'Process Measurement', 'Process Definition', 'Basic Management Control'];
    return html`<div className="hf-qa7-lad hf-in" dir="ltr">${rows.map(([k, n, m], j) => html`<${React.Fragment} key=${k}>
      <div className="hf-qa7-lr" style=${{ '--p': (10 + k * 14) + '%', animationDelay: calm() ? '0s' : (4 - j) * 0.25 + 's' }}><b>Level ${k}: ${n}</b><span>(${m})</span></div>
      ${j < 4 && html`<div className="hf-qa7-arw"><i>↑</i>${arrows[j]}</div>`}</${React.Fragment}>`)}</div>`;
  }

  // a numbered list drawn by hand (no ::marker, so it also reads right in the mirrored Arabic book)
  function NumList({ items, lv, tight }) {
    return html`<div className=${'hf-qa7-nl hf-in' + (lv ? ' lv' : '') + (tight ? ' tight' : '')}>${items.map(([n, s], i) => html`<div key=${i} className="hf-qa7-r">
      <span className="hf-qa7-n" style=${lv ? { '--p': (10 + n * 14) + '%' } : null}>${n}</span><span className="hf-qa7-d">${T7(s)}</span></div>`)}</div>`;
  }

  // Table 1 of the slides: the improvements implemented at each maturity level, top level first
  const T1 = {
    5: ['Develop change infrastructure', 'Assess and organize improvements', 'Remove causes of defects'],
    4: ['Supervise processes quantitatively', 'Create capability baselines'],
    3: ['Create enhancement infrastructure', 'Identify required software processes', 'Organize and manage processes', 'Collect process-level data', 'Provide organization-wide training', 'Manage with non-software groups'],
    2: ['Plan and track projects', 'Manage suppliers', 'Manage product configurations', 'Measure projects', 'Assist and assure policy compliance'],
    1: []
  };
  function Table1() {
    const d = (r, j) => ({ animationDelay: calm() ? '0s' : (r * 0.3 + j * 0.1) + 's' });
    return html`<div className="hf-qa7-t1 hf-in" dir="ltr">${[5, 4, 3, 2, 1].map((k, r) => html`<div key=${k} className="hf-qa7-row" style=${{ '--p': (10 + k * 14) + '%' }}>
      <b className="hf-qa7-lvl">${k}. ${LV[k - 1]}:</b>
      ${T1[k].length ? T1[k].map((c, j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<i className="hf-qa7-sep">·</i>`}<span className="hf-qa7-i" style=${d(r, j)}>${c}</span></${React.Fragment}>`)
        : html`<span className="hf-qa7-i none" style=${d(r, 0)}>No required processes</span>`}</div>`)}</div>`;
  }

  // Which CMM level? Tap 1–5 for each line, then check (or show the answers)
  function LevelPick({ id, items }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const right = items.filter((it, i) => pick[i] === it[1]).length;
    return html`<div className="hf-qa7-pick hf-in">
      ${items.map((it, i) => { const p = pick[i], st = checked && p != null ? (p === it[1] ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'hf-qa7-it' + st}>
          <span className="hf-qa7-txt">${T7(it[0])}${checked && p != null && p !== it[1] ? html`<span className="hf-qa7-fix">${ar ? html`الصح: <bdi dir="ltr">Level ${it[1]} (${LV[it[1] - 1]})</bdi>` : '→ Level ' + it[1] + ' (' + LV[it[1] - 1] + ')'}</span>` : null}</span>
          <span className="hf-qa7-lvb" dir="ltr">${[1, 2, 3, 4, 5].map(k => html`<button key=${k} aria-pressed=${String(p === k)} aria-label=${'Level ' + k + ' ' + LV[k - 1]} title=${'Level ' + k + ': ' + LV[k - 1]}
            onClick=${() => { setPick(Object.assign({}, pick, { [i]: k })); if (checked) setChecked(false); }}>${k}</button>`)}</span></div>`; })}
      <div className="hf-row" style=${{ marginTop: '5px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; items.forEach((it, i) => { p[i] = it[1]; }); setPick(p); setChecked(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${checked && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${items.length}</bdi> صح${right === items.length ? '!' : ''}` : right + ' / ' + items.length + ' right' + (right === items.length ? '!' : '')}</span>`}
      </div></div>`;
  }

  H.chapters.qa[7] = {
    title: 'Maturity Model (CMM) and Quality Standards', kicker: 'Chapter 7', run: 'cmm, iso 9000 and spice',
    ar: { title: 'الـ Maturity Model (CMM) والـ Quality Standards', kicker: 'الفصل 7', run: 'الـ CMM والـ ISO 9000 والـ SPICE' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 7);
      const arL = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[7]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src), with the site's Arabic "why" for each choice
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      // the site's practice questions (no src), shown under a "Practice questions" title
      const pfind = re => { const i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.extra[i], why: arExtra[i] }; };
      const pq = (id, re) => { const r = pfind(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const wl = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;

      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('How this chapter works', 'الفصل ده ماشي إزاي')}</${H2}>
          <${P} small=${true}>${X('Last chapter was about quality and SQA inside a project. This one zooms out to the <b>whole organization</b>: how mature is its process, and which standards does it follow? Same rules as before:',
            'الفصل اللي فات كان عن الـ quality والـ SQA جوه المشروع. الفصل ده بيبص على الـ <b>organization كلها</b>: الـ process بتاعتها ناضجة قد إيه، وماشية على أنهي standards؟ ونفس القواعد:')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises</b>, right on the page. The "Which CMM level?" ones are the heart of this chapter.', '<b>حل التمارين</b> على الصفحة نفسها. تمارين "أنهي CMM level؟" هي قلب الفصل ده.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and memory tricks, not the slides.', 'الملاحظات المكتوبة بخط الإيد واللي عليها "من عندنا" دي تشبيهات وحيل للحفظ مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Two companies both ship working software. One delivers every project on time; the other gets lucky now and then. If you had to pick a supplier, how would you tell them apart <i>before</i> signing?',
            'شركتين الاتنين بيسلّموا software شغال. واحدة بتسلّم كل مشروع في ميعاده، والتانية الحظ بيحالفها ساعات. لو هتختار supplier، هتفرّق بينهم إزاي <i>قبل</i> ما تمضي؟')}</p></${Box}>
        `, { sec: t('How this chapter works', 'الفصل ده ماشي إزاي') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">7</span><span className="t">${A ? html`الفصل السابع<br/>Software Quality` : html`Chapter seven<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('How Grown-Up Is Your Process?', 'الـ process بتاعتك كبرت ولا لسه؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('maturity models (CMM) and quality standards', 'الـ maturity models والـ quality standards')}</p></div>
          <${Stairs} />
          <${Talk} who="dev">${t('Our projects finish on time. Well… sometimes.', 'المشاريع بتاعتنا بتخلص في ميعادها. يعني… ساعات.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('"Sometimes" is what a maturity model looks at. Which step are you on?', 'كلمة "ساعات" دي اللي الـ maturity model بيبص عليها. إنت على أنهي درجة؟')}</${Talk}>
          <${P} small=${true}>${X('Coming up: the <b>CMM</b> and its five levels, the <b>20 elements</b> and <b>8 principles</b> of ISO, and <b>SPICE</b>.', 'اللي جاي: الـ <b>CMM</b> والـ 5 levels بتوعه، والـ <b>20 element</b> والـ <b>8 principles</b> بتوع الـ ISO، والـ <b>SPICE</b>.')}</${P}>
        `, { sec: t('Why maturity models?', 'ليه الـ maturity models؟') }),

        // 2 · why organizations need this
        page(html`
          <${H2}>${t('Why do organizations need this?', 'ليه الـ organizations محتاجة ده؟')}</${H2}>
          <${P}>${X('Organizations seek <b>sustainable excellence</b> in their IT operations, and that needs a <b>flexible framework</b> to meet evolving business needs. But three challenges obstruct progress:',
            'الـ organizations عايزة <b>تميّز مستدام</b> في شغل الـ IT، وده محتاج <b>framework مرن</b> يواكب احتياجات الـ business اللي بتتغير. بس فيه تلات challenges بيعطّلوا التقدم:')}</${P}>
          <${UL} items=${A ? ['الـ <b>design الوحش</b> للـ IT applications', 'الـ <b>تكاليف العالية</b>', 'الـ <b>مشاريع المتأخرة</b>'] : ['<b>Poor IT application design</b>', '<b>High costs</b>', '<b>Delayed projects</b>']} />
          <${P}>${X('<b>Quality assurance</b>, through <b>maturity models</b> and systematic procedures, helps define organizational structures and improve performance. Three tools in this chapter:',
            'الـ <b>quality assurance</b>، عن طريق الـ <b>maturity models</b> والـ procedures المنظمة، بيساعد يحدد الـ organizational structures ويحسّن الأداء. وعندنا تلات أدوات في الفصل ده:')}</${P}>
          <${NumList} items=${A ? [
            [1, 'الـ <b>CMM</b>: بيساعد في إدارة الـ IT systems المعقدة بكفاءة.'],
            [2, 'الـ <b>QMS</b> (quality management system): طريقة منظمة لتحسين الـ process capability، وإدارة الـ risk، وضمان رضا العميل.'],
            [3, 'الـ <b>ISO 9000</b>: بيشجع الـ continuous improvement والـ product reliability والاعتراف الدولي.']
          ] : [
            [1, '<b>CMM</b> helps manage complex IT systems efficiently.'],
            [2, 'A <b>QMS</b> (quality management system) gives a structured way to improve process capability, manage risk and ensure customer satisfaction.'],
            [3, '<b>ISO 9000</b> promotes continuous improvement, product reliability and international recognition.']
          ]} />
        `),

        // 3 · the intro figure
        page(html`
          <${H2}>${t('From IT problems to quality tools', 'من مشاكل الـ IT لأدوات الـ quality')}</${H2}>
          <${Fig} name="qa-qm-intro" />
        `),

        // 4 · meet the CMM
        page(html`
          <${H1}>${t('Meet the CMM', 'اتعرّف على الـ CMM')}</${H1}>
          <${Def}>${X('The <b>Capability Maturity Model (CMM)</b> is a <b>standard framework for assessing and improving the maturity</b> of a software company\'s development process.',
            'الـ <b>Capability Maturity Model (CMM)</b> هو <b>standard framework لتقييم وتحسين الـ maturity</b> بتاعة الـ development process في شركة الـ software.')}</${Def}>
          <${P} small=${true}>${X('It was developed by the <b>Software Engineering Institute (SEI)</b> and <b>Carnegie Mellon University</b> under the <b>U.S. Department of Defense</b>, and it gives <b>structured guidance for enhancing software quality</b>.',
            'اتعمل بواسطة الـ <b>Software Engineering Institute (SEI)</b> و<b>Carnegie Mellon University</b> تحت الـ <b>U.S. Department of Defense</b>، وبيدي <b>توجيه منظم لتحسين الـ software quality</b>.')}</${P}>
          <${Talk} who="lens">${X('A <b>maturity model</b> in general: structured levels showing how well <b>processes and behaviors</b> achieve desired outcomes.', 'والـ <b>maturity model</b> عمومًا: levels منظمة بتوضح الـ <b>processes والـ behaviors</b> بتحقق النتايج لحد فين.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('Exam T/F: <i>"A maturity model can be utilized as a model for evaluation."</i> <b>True</b>: it can be used for <b>both evaluation and improvement</b>.',
            'سؤال صح وغلط:<span class="ltr">"A maturity model can be utilized as a model for evaluation."</span>الإجابة <b>True</b>: بيتستخدم <b>للتقييم وللتحسين الاتنين</b>.')}</p></${Box}>
        `, { sec: t('The CMM', 'الـ CMM') }),

        // 5 · CMM at a glance
        page(html`
          <${Fig} name="qa-cmm-glance" />
        `),

        // 6 · five levels, no skipping
        page(html`
          <${H2}>${t('Five steps, no shortcuts', 'خمس درجات، من غير اختصارات')}</${H2}>
          <${P}>${X('CMM is a <b>five-level incremental</b> approach: organizations progress gradually in process maturity <b>without skipping levels</b>. This structured growth helps companies <b>adapt to changes efficiently</b>.',
            'الـ CMM هو approach <b>incremental من خمس levels</b>: الـ organizations بتتقدم في الـ process maturity واحدة واحدة <b>من غير ما تنط levels</b>. النمو المنظم ده بيساعد الشركات <b>تتأقلم مع التغييرات بكفاءة</b>.')}</${P}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': like school years. Brilliant or not, you don't go from year 1 straight to year 4.", 'تشبيه من عندنا: زي سنين الدراسة. مهما كنت شاطر، مش هتنط من سنة أولى لسنة رابعة على طول.')}</${Hand}>
          <${P} small=${true}>${X('Who is it for? It was designed <b>mainly</b> for software development organizations, but it also applies to software/system engineering, project management, IT, risk management and personnel management.',
            'معمول لمين؟ متصمم <b>أساسًا</b> لـ organizations الـ software development، بس كمان بيتطبق على الـ <bdi dir="ltr">software/system</bdi> engineering والـ project management والـ IT والـ risk management والـ personnel management.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"CMM is designed <b>only</b> for software development organizations": <b>False</b> (mainly, not only).<br/>"A Level 2 company can jump to Level 4 if it starts using statistics": <b>False</b>. No skipping.',
            'الجملة دي <b>غلط</b> (أساسًا، مش بس):<span class="ltr">"CMM is designed only for software development organizations"</span>وكمان شركة في الـ Level 2 مينفعش تنط للـ Level 4 حتى لو بدأت تستخدم statistics: <b>غلط</b>، مفيش تنطيط.')}</p></${Box}>
        `),

        // 7 · try to skip a level
        page(html`
          <${H2}>${t('Go on, try to cheat the stairs', 'يلا، جرّب تغش في السلم')}</${H2}>
          <${Fig} name="qa-cmm-climb" />
        `),

        // 8 · the 6 components
        page(html`
          <${H1}>${t('What a CMM is made of', 'الـ CMM معمول من إيه')}</${H1}>
          <${P} small=${true}>${t('The CMM structure has six components:', 'الـ CMM structure فيه 6 components:')}</${P}>
          <${NumList} tight=${true} items=${A ? [
            [1, 'الـ <b>Maturity levels</b>: بتحدد الـ process capability. خمسة، من الـ Level 1 (ad-hoc و structure قليل) لحد الـ Level 5 (الحالة المثالية: systematic و optimized وبيتحسن باستمرار).'],
            [2, 'الـ <b>Process capability</b>: قدرة الـ organization تحقق توقعات الـ quality بالـ processes الحالية؛ وبتساعد <b>نتوقع</b> نتايج المشاريع الجاية.'],
            [3, 'الـ <b>Key Process Areas (KPA)</b>: مجموعات أنشطة مرتبطة بتحقق goals لما تتعمل مع بعض، وبتحدد الـ capability في كل level. مثال: الـ software project delivery planning.'],
            [4, 'الـ <b>Goals</b>: بتقيّم الـ practices الأساسية جوه الـ process area عشان نعرف الـ organization أو الـ project طبّقها بنجاح ولا لأ.'],
            [5, 'الـ <b>Common features</b>: خصائص بتوضح هل تطبيق الـ KPA ناجح و<b>مستدام</b>.'],
            [6, 'الـ <b>Key practices</b>: الأفعال والـ infrastructure اللي بتدعم الـ KPA. مثال: الـ delivery schedule ماشي على procedure موثق.']
          ] : [
            [1, '<b>Maturity levels</b> define process capability. Five of them, from Level 1 (ad-hoc, minimal structure) to Level 5 (the ideal: systematically managed, optimized, continuously improved).'],
            [2, '<b>Process capability</b>: the ability to meet quality expectations through current processes; it helps <b>predict</b> the outcomes of future projects.'],
            [3, '<b>Key Process Areas (KPA)</b>: groups of related activities that achieve goals when performed together; they define capability at each level. Example: software project delivery planning.'],
            [4, '<b>Goals</b> evaluate essential practices within a process area to determine if an organization or project has successfully implemented it.'],
            [5, '<b>Common features</b>: characteristics showing whether a KPA\'s implementation is successful and <b>sustainable</b>.'],
            [6, '<b>Key practices</b>: the actions and infrastructure that support a KPA. Example: a software delivery schedule follows a documented procedure.']
          ]} />
        `, { sec: t('CMM structure', 'الـ CMM structure') }),

        // 9 · structure figure
        page(html`
          <${H2}>${t('How the six fit together', 'الـ 6 دول مترابطين إزاي')}</${H2}>
          <${Fig} name="qa-cmm-structure" />
        `),

        // 10 · match the components
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a component, then the description that fits it.', 'دوس على الـ component، وبعدين على الوصف اللي يناسبه.')}</${P}>
          <${Match} id="comp" left=${A ? ['الـ Maturity levels', 'الـ Process capability', 'الـ Key Process Areas', 'الـ Goals', 'الـ Common features', 'الـ Key practices']
            : ['Maturity levels', 'Process capability', 'Key Process Areas', 'Goals', 'Common features', 'Key practices']}
            right=${A ? ['بتوضح تطبيق الـ KPA ناجح ومستدام ولا لأ', 'الخمس مراحل', 'مثال: الـ schedule ماشي على procedure موثق', 'نحقق توقعات الـ quality بالـ processes الحالية', 'مثال: الـ delivery planning', 'بتقيّم الـ practices الأساسية في الـ process area']
              : ["Show if a KPA's implementation is successful and sustainable", 'The five stages', 'e.g. the schedule follows a documented procedure', 'Meet quality expectations with current processes', 'e.g. software project delivery planning', 'Evaluate essential practices in a process area']}
            answer=${[1, 3, 4, 5, 0, 2]} />
        `),

        // 11 · levels 1 to 3
        page(html`
          <${H1}>${t('The five levels, bottom to top', 'الـ 5 levels من تحت لفوق')}</${H1}>
          <${NumList} lv=${true} items=${A ? [
            [1, 'الـ <b>Initial</b>: الـ processes بتبقى unstructured و reactive ومش ثابتة، فالـ project management مش مستقر. الـ organizations هنا بتعاني عشان تحقق الـ goals بشكل مضمون.'],
            [2, 'الـ <b>Repeatable</b>: بيتطبق basic project management، فالنجاح بيتكرر. بنعمل <b>project planning و requirement control و product modifications</b>، فالتكلفة والـ schedule بيتداروا أحسن.'],
            [3, 'الـ <b>Defined</b>: فيه processes standard <b>بتتعمل وبتتحسن مع الوقت</b>. الـ management بيضمن إنها ثابتة <b>على مستوى الـ organization كلها</b>، والـ project teams بتعدّلها على مقاسها بناءً على الـ standards دي.']
          ] : [
            [1, '<b>Initial</b>: processes are unstructured, reactive and inconsistent, leading to unstable project management. Organizations here struggle to meet goals reliably.'],
            [2, '<b>Repeatable</b>: basic project management practices allow repeatable success. Organizations establish <b>project planning, requirement control and product modifications</b>, for better cost and schedule management.'],
            [3, '<b>Defined</b>: standardized processes are <b>developed and refined over time</b>. Management ensures process consistency <b>across the organization</b>, and project teams tailor processes based on these standards.']
          ]} />
          <${Grow} />
          <${Talk} who="bug">${t('Level 1 is my favourite neighbourhood. Nobody plans, nobody notices me.', 'الـ Level 1 ده أحلى حتة أعيش فيها. محدش بيخطط، ومحدش واخد باله مني.')}</${Talk}>
        `, { sec: t('The five levels', 'الـ 5 levels') }),

        // 12 · levels 4 and 5
        page(html`
          <${NumList} lv=${true} items=${A ? [
            [4, 'الـ <b>Quantitatively Managed</b>: الـ processes متحكم فيها بـ <b>statistical و quantitative techniques</b>، فبنقدر <b>نتوقع وندير أداء المشروع بدقة</b>. وده بيضمن software quality و maintenance مستقرين مع تقليل الـ variations.'],
            [5, 'الـ <b>Optimizing</b>: التركيز على الـ <b>continuous process improvement</b> بتطويرات incremental و innovative. والـ processes بتتحسن بـ <b>quantitative goals</b> عشان business objectives طويلة المدى.']
          ] : [
            [4, '<b>Quantitatively Managed</b>: processes are controlled through <b>statistical and quantitative techniques</b>, so organizations can <b>predict and manage project performance accurately</b>. Stable software quality and maintenance, minimal variation.'],
            [5, '<b>Optimizing</b>: <b>continuous process improvement</b> through incremental and innovative advancements. Processes are systematically refined, using <b>quantitative goals</b> to achieve long-term business objectives.']
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Controlled through <b>statistical and quantitative techniques</b>" is <b>Level 4</b>. Level 5 uses quantitative <i>goals</i>, but its focus is continuous improvement.',
            'الـ statistical و quantitative techniques دي بتاعة الـ <b>Level 4</b>. الـ Level 5 بيستخدم quantitative <i>goals</i>، بس تركيزه الـ continuous improvement.')}</p></${Box}>
          <${Grow} />
          <${Hand}>${A ? html`حيلة للحفظ (من عندنا): <bdi dir="ltr"><b>I</b> <b>R</b>ide <b>D</b>onkeys <b>Q</b>uite <b>O</b>ften</bdi>` : html`Memory trick (ours): <b>I</b> <b>R</b>ide <b>D</b>onkeys <b>Q</b>uite <b>O</b>ften = Initial, Repeatable, Defined, Quantitatively managed, Optimizing`}</${Hand}>
        `),

        // 13 · the levels figure
        page(html`
          <${H2}>${t("The slide's figure: even the arrows have names", 'رسمة السلايد: حتى الأسهم ليها أسامي')}</${H2}>
          <${Fig} name="qa-cmm-levels" />
        `),

        // 14 · arrows and labels
        page(html`
          <${H2}>${t('Read the figure like the exam does', 'اقرا الرسمة زي ما الامتحان بيقراها')}</${H2}>
          <${P} small=${true}>${t('Each level has a management label, and each arrow up has a name:', 'كل level ليه management label، وكل سهم طالع ليه اسم:')}</${P}>
          <${FigLadder} />
          <${Hand} red=${true} arrow="up">${X('the figure says just "Managed" for Level 4; the slide text and Table 1 say "Quantitatively Managed"', 'الرسمة كاتبة <bdi dir="ltr">"Managed"</bdi> بس للـ Level 4، والـ slide والـ Table 1 بيقولوا <bdi dir="ltr">"Quantitatively Managed"</bdi>')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Read the arrows as a sentence: <b>control</b> the basics, <b>define</b> the process, <b>measure</b> it, then <b>control</b> it. Why can\'t you measure a process you haven\'t defined?',
            'اقرا الأسهم كجملة: الأساسيات، وبعدين <b>تعرّف</b> الـ process، وبعدين <b>تقيسها</b>، وبعدين <b>تتحكم</b> فيها. ليه مينفعش تقيس process لسه ماعرّفتهاش؟')}</p></${Box}>
        `),

        // 15 · Table 1
        page(html`
          <${H2}>${t('Table 1: what each level implements', 'الـ Table 1: كل level بيطبّق إيه')}</${H2}>
          <${Table1} />
          <${Grow} />
          <${Hand} red=${true}>${X('Trap: "measure projects" is Level 2, not 4!', 'فخ: الـ <bdi dir="ltr">"Measure projects"</bdi> ده Level 2، مش 4!')}</${Hand}>
        `, { sec: t('Table 1', 'الـ Table 1') }),

        // 16 · assess figure
        page(html`
          <${H2}>${t('Assess an organization yourself', 'قيّم organization بنفسك')}</${H2}>
          <${Fig} name="qa-cmm-assess" />
        `),

        // 17 · which level, slide text
        page(html`
          <${H2}>${t('Sharpen your pencil: which CMM level?', 'امسك القلم: أنهي CMM level؟')}</${H2}>
          <${P} small=${true}>${t('Each line is from the slides. Tap its level (1–5), then check.', 'كل سطر من كلام السلايدز. دوس على الـ level بتاعه (من 1 لـ 5)، وبعدين صحّح.')}</${P}>
          <${LevelPick} id="lvA" items=${A ? [
            ['الـ processes بتبقى ثابتة على مستوى الـ organization كلها', 3],
            ['الـ processes متحكم فيها بـ statistical techniques', 4],
            ['الـ processes بتبقى unstructured و reactive', 1],
            ['فيه project planning و requirement control', 2],
            ['فيه continuous process improvement', 5],
            ['الـ project teams بتعدّل الـ standard processes على مقاسها', 3],
            ['بتتوقع أداء المشروع بدقة', 4],
            ['تطويرات incremental و innovative', 5]
          ] : [
            ['Process consistency across the whole organization', 3],
            ['Processes controlled through statistical techniques', 4],
            ['Unstructured, reactive processes', 1],
            ['Project planning and requirement control', 2],
            ['Continuous process improvement', 5],
            ['Project teams tailor the standard processes', 3],
            ['Predicts project performance accurately', 4],
            ['Incremental and innovative advancements', 5]
          ]} />
        `, { sec: t('Which CMM level?', 'أنهي CMM level؟') }),

        // 18 · which level, Table 1
        page(html`
          <${H2}>${t('Which level? Table 1 edition', 'أنهي level؟ نسخة الـ Table 1')}</${H2}>
          <${P} small=${true}>${t('Now Table 1, word for word. Careful with the measuring ones.', 'دلوقتي الـ Table 1 بالنص. خلّي بالك من بتوع القياس.')}</${P}>
          <${LevelPick} id="lvB" items=${A ? [
            ['الـ <bdi dir="ltr">"Measure projects"</bdi>', 2],
            ['الـ <bdi dir="ltr">"Create capability baselines"</bdi>', 4],
            ['الـ <bdi dir="ltr">"Remove causes of defects"</bdi>', 5],
            ['الـ <bdi dir="ltr">"Collect process-level data"</bdi>', 3],
            ['الـ <bdi dir="ltr">"No required processes"</bdi>', 1],
            ['الـ <bdi dir="ltr">"Manage suppliers"</bdi>', 2],
            ['الـ <bdi dir="ltr">"Develop change infrastructure"</bdi>', 5],
            ['الـ <bdi dir="ltr">"Create enhancement infrastructure"</bdi>', 3],
            ['الـ <bdi dir="ltr">"Supervise processes quantitatively"</bdi>', 4]
          ] : [
            ['Measure projects', 2],
            ['Create capability baselines', 4],
            ['Remove causes of defects', 5],
            ['Collect process-level data', 3],
            ['No required processes', 1],
            ['Manage suppliers', 2],
            ['Develop change infrastructure', 5],
            ['Create enhancement infrastructure', 3],
            ['Supervise processes quantitatively', 4]
          ]} />
        `),

        // 19 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions (not from the doctors' papers).", 'أسئلة تدريب من الموقع (مش من امتحانات الدكاترة).')}</p></${Box}>
          ${pq('p-l2', /plans and tracks each project, manages its suppliers/i)}
        `),

        // 20 · key process areas
        page(html`
          <${H1}>${t('Inside every level: Key Process Areas', 'جوه كل level: الـ Key Process Areas')}</${H1}>
          <${P} small=${true}>${X('They explain about their level. Each KPA has <b>5 aspects</b>:', 'بيشرحوا الـ level بتاعهم. وكل KPA ليه <b>5 aspects</b>:')}</${P}>
          <${NumList} items=${A ? [
            [1, 'الـ <b>Goals</b>: objectives بتساعد الـ organization <b>تطلع للـ CMM level اللي بعده</b>.'],
            [2, 'الـ <b>Commitment</b>: متطلبات لازم تتحقق عشان نوصل للـ goals.'],
            [3, 'الـ <b>Ability</b>: الأنشطة اللي بتخلّي الـ organization تقدر تحقق الـ commitments.'],
            [4, 'الـ <b>Measurement</b>: الأنشطة اللي بتتعمل <b>لازم تتراقب</b>.'],
            [5, 'الـ <b>Verification</b>: methods بتحدد الـ verification.']
          ] : [
            [1, '<b>Goals</b>: objectives that help the organization <b>climb to the next CMM level</b>.'],
            [2, '<b>Commitment</b>: requirements that must be met to achieve the goals.'],
            [3, '<b>Ability</b>: the activities that enable the organization to meet the commitments.'],
            [4, '<b>Measurement</b>: the activities performed <b>should be monitored</b>.'],
            [5, '<b>Verification</b>: methods that define the verification.']
          ]} />
          <${Grow} />
          <${Hand}>${A ? html`حيلة للحفظ (من عندنا): <bdi dir="ltr"><b>G</b>o <b>C</b>limb <b>A</b> <b>M</b>ountain, <b>V</b>ictor</bdi>` : html`Memory trick (ours): <b>G</b>o <b>C</b>limb <b>A</b> <b>M</b>ountain, <b>V</b>ictor`}</${Hand}>
        `, { sec: t('Key Process Areas', 'الـ Key Process Areas') }),

        // 21 · KPA aspects figure
        page(html`
          <${Fig} name="qa-kpa-aspects" />
        `),

        // 22 · interview with a KPA
        page(html`
          <${Interview} title=${t('Key Process Area, exposed', 'الـ Key Process Area على المكشوف')} sub=${t("This week's interview: the part of CMM that does the actual work.", 'حوار الأسبوع: الجزء من الـ CMM اللي بيشتغل بجد.')} lines=${A ? [
            ['المذيع', 'إنت مين بالظبط؟'],
            ['الـ KPA', 'مجموعة <b>أنشطة مرتبطة ببعض</b> بتحقق goals لما تتعمل مع بعض. أنا اللي بحدد الـ capability في كل level.'],
            ['المذيع', 'مثال؟'],
            ['الـ KPA', 'الـ <b>software project delivery planning</b>.'],
            ['المذيع', 'وساكن فين؟'],
            ['الـ KPA', '<b>جوه كل maturity level</b>، وبشرح الـ level ده.'],
            ['المذيع', 'حد بيتلخبط بينك وبين حد؟'],
            ['الـ KPA', 'الـ <b>key practices</b>. هما الأفعال والـ infrastructure اللي <b>بتدعمني</b>، زي إن الـ delivery schedule ماشي على procedure موثق.'],
            ['المذيع', 'وفيه حد بيدّعي إنه من الـ aspects بتوعك؟'],
            ['الـ KPA', 'الـ <b>Marketing</b>. هو مش منهم. الـ 5 هما الـ goals والـ commitment والـ ability والـ measurement والـ verification.']
          ] : [
            ['Head First', 'So who are you, exactly?'],
            ['KPA', 'A group of <b>related activities</b> that achieve goals when performed together. I define capability at each level.'],
            ['Head First', 'An example?'],
            ['KPA', '<b>Software project delivery planning</b>.'],
            ['Head First', 'Where do you live?'],
            ['KPA', '<b>Within each maturity level</b>. I explain about that level.'],
            ['Head First', 'Ever mistaken for someone else?'],
            ['KPA', '<b>Key practices</b>. They are the actions and infrastructure that <b>support me</b>, like a delivery schedule that follows a documented procedure.'],
            ['Head First', 'Anyone pretending to be one of your aspects?'],
            ['KPA', '<b>Marketing</b>. It is not one. My five are goals, commitment, ability, measurement and verification.']
          ]} />
        `),

        // 23 · benefits of CMM
        page(html`
          <${H2}>${t('Why executives like the CMM', 'ليه الـ executives بيحبوا الـ CMM')}</${H2}>
          <${P} small=${true}>${t('The five benefits of CMM:', 'الـ 5 benefits بتوع الـ CMM:')}</${P}>
          <${NumList} items=${A ? [
            [1, 'بسيط و<b>سهل يتحلل</b>.'],
            [2, 'فيه <b>executives كتير عارفينه</b> أصلًا.'],
            [3, 'بيتستخدم عشان نشرح <b>مشاكل الـ IT الكبيرة</b> للـ senior executives.'],
            [4, 'بيساعد نجيب <b>funding</b> للمشاريع (زي الـ enterprise data asset management والـ metadata repository).'],
            [5, 'الشركات الكبيرة والحكومات بيستخدموه عشان <b>يقارنوا نفسهم بغيرهم</b>.']
          ] : [
            [1, 'Simple and <b>easy to analyze</b>.'],
            [2, '<b>Many executives already know it</b>.'],
            [3, 'Used to explain <b>major IT issues</b> to senior executives.'],
            [4, 'Helps get <b>project funding</b> (e.g. enterprise data asset management, metadata repository).'],
            [5, 'Large companies and governments use it to <b>compare themselves</b> with others.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Fill the blank: <i>"……… is the widely used and preferred software method of evaluation."</i> The key is <b>CMM</b>. Not ISO 9000 (a generic standard), not Six Sigma, not SPICE.',
            'كمّل الفراغ:<span class="ltr">"……… is the widely used and preferred software method of evaluation."</span>الإجابة <b>CMM</b>. مش الـ ISO 9000 (ده standard عام)، ولا الـ Six Sigma، ولا الـ SPICE.')}</p></${Box}>
        `, { sec: t('Benefits of CMM', 'فوايد الـ CMM') }),

        // 24 · no dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ Level 4 اسمه <bdi dir="ltr">"Managed"</bdi> ولا <bdi dir="ltr">"Quantitatively Managed"</bdi>؟', 'الاتنين موجودين: الرسمة كاتبة <b>Managed (Capability Management)</b>، والـ slide والـ Table 1 بيقولوا <b>Quantitatively Managed</b>. اكتب الاسم الكامل.'],
            ['الـ Level 5 بيستخدم quantitative goals، يبقى هو مش Level 4؟', 'لأ. الـ Level 4 هو <b>التحكم</b> بالـ statistics. الـ Level 5 هو الـ <b>continuous improvement</b>، والـ quantitative goals بتحرّك التحسينات.'],
            ['هو الـ <bdi dir="ltr">"Measure projects"</bdi> مش المفروض يبقى Level 4؟', 'لأ. في الـ Table 1 هو <b>Level 2</b>. اللي في الـ Level 4 هو الـ <b>supervise processes quantitatively</b> والـ capability baselines.'],
            ['مين اللي عمل الـ CMM؟ الـ ISO؟', 'لأ. الـ <b>SEI و Carnegie Mellon</b> تحت الـ U.S. DoD. الـ ISO والـ IEC عملوا الـ <b>SPICE</b>، والـ IEEE عمل الـ Standard Collection.']
          ] : [
            ['Is Level 4 "Managed" or "Quantitatively Managed"?', 'Both appear: the figure labels it <b>Managed (Capability Management)</b>; the slide text and Table 1 say <b>Quantitatively Managed</b>. Write the full name.'],
            ['Level 5 uses quantitative goals. Isn\'t that Level 4?', 'No. Level 4 is <b>control</b> through statistics. Level 5 is <b>continuous improvement</b>, with quantitative goals driving the enhancements.'],
            ['Shouldn\'t "measure projects" be Level 4?', 'No. In Table 1 it is <b>Level 2</b>. Level 4 is <b>supervise processes quantitatively</b> and create capability baselines.'],
            ['Who made the CMM? ISO?', 'No: <b>SEI and Carnegie Mellon</b>, under the U.S. DoD. ISO and IEC made <b>SPICE</b>; IEEE made the Standard Collection.']
          ]} />
        `),

        // 25 · ISO 9000
        page(html`
          <${H1}>${t('ISO 9000: one standard for everybody', 'الـ ISO 9000 بيمشي على الكل')}</${H1}>
          <${Def}>${X('<b>ISO 9000</b> is a set of internationally recognized standards published by the <b>International Organization for Standardization (ISO)</b>, defining universal best practices so organizations meet quality requirements and client expectations.',
            'الـ <b>ISO 9000</b> مجموعة standards معترف بيها دوليًا، نشرتها الـ <b>ISO</b>، وفيها best practices عالمية عشان نحقق الـ quality requirements وتوقعات العملاء.')}</${Def}>
          <${UL} items=${A ? [
            'هو <b>generic جدًا</b>: لـ <b>أي organization</b> بتقدم products أو services.',
            'كلمة "ISO" من اليوناني <b><bdi dir="ltr">isos</bdi></b> يعني <b>متساوي</b>.',
            'فيه <b>20 key elements</b>، كل واحد <b>موثق بوضوح وبالتفصيل</b>.'
          ] : [
            '<b>Highly generic</b>: it applies to <b>any organization</b> providing products or services.',
            '"ISO" comes from the Greek word <b>isos</b> = <b>"equal"</b>.',
            '<b>20 key elements</b>, each <b>clearly and thoroughly documented</b> to demonstrate adherence.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"ISO stands for…": <b>International Organization for Standardization</b>. Not "International Software Organization": ISO 9000 is for <b>any</b> organization, not only software.',
            'الـ ISO معناها:<span class="ltr"><b>International Organization for Standardization</b></span>ومش <bdi dir="ltr">International Software Organization</bdi>، لأن الـ ISO 9000 لأي organization.')}</p></${Box}>
        `, { sec: t('ISO 9000', 'الـ ISO 9000') }),

        // 26 · ISO overview figure
        page(html`
          <${H2}>${t('ISO 9000 at a glance', 'الـ ISO 9000 باختصار')}</${H2}>
          <${Fig} name="qa-iso-overview" />
        `),

        // 27 · elements 1–10
        page(html`
          <${H2}>${t('The 20 elements, part 1', 'الـ 20 element، الجزء الأول')}</${H2}>
          <${NumList} tight=${true} items=${(A ? [
            ['Management Responsibility', 'الـ management يحط الـ quality policy ويوفر الـ resources.'],
            ['Quality Systems', 'نحافظ على quality manual و procedures موثقين.'],
            ['Contract Review', 'نحدد احتياجات العميل بوضوح ونتأكد منها.'],
            ['Design Control', 'نوثق ونتحكم في تغييرات الـ design والـ engineering.'],
            ['Documentation &amp; Data Control', 'تحكم صارم في إنشاء الـ documents وتعديلها.'],
            ['Purchasing', 'نحدد متطلبات الـ suppliers و processes الـ compliance.'],
            ['Customer Supplied Product Control', 'نتعامل مع المواد اللي العميل بيوفرها ونحميها.'],
            ['Product Identification &amp; Traceability', 'نتابع الـ products من البداية للنهاية.'],
            ['Process Control', 'نستخدم work instructions و quality plans و standards.'],
            ['Inspection &amp; Testing', 'نعمل inspections عند الاستلام، وأثناء الـ process، وفي الآخر.']
          ] : [
            ['Management Responsibility', 'management sets the quality policy and provides resources.'],
            ['Quality Systems', 'maintain a documented quality manual and procedures.'],
            ['Contract Review', 'clearly state and verify customer needs.'],
            ['Design Control', 'document and control design and engineering changes.'],
            ['Documentation &amp; Data Control', 'strict control of document creation and modification.'],
            ['Purchasing', 'define supplier requirements and compliance processes.'],
            ['Customer Supplied Product Control', 'handle and protect customer-provided materials.'],
            ['Product Identification &amp; Traceability', 'track products from start to finish.'],
            ['Process Control', 'use work instructions, quality plans and standards.'],
            ['Inspection &amp; Testing', 'receiving, in-process and final inspections.']
          ]).map(([n, d], i) => [i + 1, A ? `الـ <b><bdi dir="ltr">${n}</bdi></b>: ${d}` : `<b>${n}</b>: ${d}`])} />
        `, { sec: t('The 20 elements', 'الـ 20 element') }),

        // 28 · elements 11–20
        page(html`
          <${H2}>${t('The 20 elements, part 2', 'الـ 20 element، الجزء التاني')}</${H2}>
          <${NumList} tight=${true} items=${(A ? [
            ['Inspection/Measuring Equipment', 'نعمل calibration للأجهزة بانتظام.'],
            ['Inspection &amp; Test Status', 'نحدد بوضوح الـ products اللي اتعملها inspection.'],
            ['Control of Non-Conforming Product', 'نفصل الحاجات المرفوضة وندير أمرها.'],
            ['Corrective &amp; Preventive Action', 'نحدد الـ root causes ونمنع defects في المستقبل.'],
            ['Handling/Storage/Packaging/Delivery', 'نحمي الـ products طول الإنتاج والشحن.'],
            ['Quality Records', 'نحتفظ بـ records للـ audit trails.'],
            ['Internal Quality Audits', 'نعمل audits دورية ونشارك النتايج.'],
            ['Training', 'نحتفظ بـ training records و qualifications لكل الموظفين.'],
            ['Servicing', 'الدعم بعد التسليم يحقق المتطلبات (لو موجود).'],
            ['Statistical Techniques', 'نستخدم data و control charts وتحليل لتحسين الـ quality.']
          ] : [
            ['Inspection/Measuring Equipment', 'calibrate instruments regularly.'],
            ['Inspection &amp; Test Status', 'clearly identify inspected products.'],
            ['Control of Non-Conforming Product', 'separate and manage rejected items.'],
            ['Corrective &amp; Preventive Action', 'identify root causes and prevent future defects.'],
            ['Handling/Storage/Packaging/Delivery', 'protect products throughout production and shipping.'],
            ['Quality Records', 'maintain records for audit trails.'],
            ['Internal Quality Audits', 'conduct periodic audits and share results.'],
            ['Training', 'maintain training records and qualifications of all employees.'],
            ['Servicing', 'after-delivery support meets requirements (if applicable).'],
            ['Statistical Techniques', 'data, control charts and analysis for quality improvement.']
          ]).map(([n, d], i) => [i + 11, A ? `الـ <b><bdi dir="ltr">${n}</bdi></b>: ${d}` : `<b>${n}</b>: ${d}`])} />
        `),

        // 29 · elements figure
        page(html`
          <${Fig} name="qa-iso-elements" />
        `),

        // 30 · which element?
        page(html`
          <${H2}>${t('Which element covers it?', 'أنهي element بيغطيها؟')}</${H2}>
          <${Match} id="elem" left=${A ? ['رقم 7: <bdi dir="ltr">Customer Supplied Product Control</bdi>', 'رقم 11: <bdi dir="ltr">Inspection/<wbr>Measuring Equipment</bdi>', 'رقم 13: <bdi dir="ltr">Control of Non-Conforming Product</bdi>', 'رقم 14: <bdi dir="ltr">Corrective &amp; Preventive Action</bdi>', 'رقم 16: <bdi dir="ltr">Quality Records</bdi>']
            : ['(7) Customer Supplied Product Control', '(11) Inspection/<wbr>Measuring Equipment', '(13) Control of Non-Conforming Product', '(14) Corrective &amp; Preventive Action', '(16) Quality Records']}
            right=${A ? ['نلاقي الـ root cause بتاع defect بيتكرر', 'نعمل calibration للأجهزة بانتظام', 'نحتفظ بالسجلات للـ audit trail', 'نعمل procedures للـ materials المرفوضة', 'نحمي المواد اللي العميل اداهالنا']
              : ['Find the root cause of a recurring defect', 'Calibrate the instruments regularly', 'Keep records for the audit trail', 'Develop procedures for rejected materials', 'Protect the materials the customer gave you']}
            answer=${[4, 1, 3, 0, 2]} />
        `),

        // 31 · watch it: look-alike elements
        page(html`
          <${Box} kind="watch" title=${t('Watch it: the look-alikes', 'خلّي بالك: العناصر اللي شبه بعض')}>
            <p className="hf-p small">${X('Three elements start with "Inspection":', 'تلات elements بيبدأوا بكلمة <bdi dir="ltr">"Inspection"</bdi>:')}</p>
            ${wl(A ? [
              'رقم 10 هو <b><bdi dir="ltr">Inspection &amp; Testing</bdi></b>: بنعمل الـ inspections نفسها، عند الاستلام وأثناء الشغل وفي الآخر.',
              'رقم 11 هو <b><bdi dir="ltr">Inspection/Measuring Equipment</bdi></b>: الأجهزة والـ calibration بتاعها.',
              'رقم 12 هو <b><bdi dir="ltr">Inspection &amp; Test Status</bdi></b>: نعلّم على الـ products اللي اتعملها inspection.'
            ] : [
              '(10) <b>Inspection &amp; Testing</b>: doing the inspections (receiving, in-process, final).',
              '(11) <b>Inspection/Measuring Equipment</b>: the instruments, calibrated regularly.',
              '(12) <b>Inspection &amp; Test Status</b>: clearly identifying inspected products.'
            ])}
            <p className="hf-p small" style=${{ marginTop: '6px' }}>${X('And two that deal with bad output: (13) <b>Control of Non-Conforming Product</b> handles the <b>rejected items</b> already found; (14) <b>Corrective &amp; Preventive Action</b> goes after the <b>root cause</b> so it doesn\'t happen again.',
              'واتنين للحاجة البايظة: رقم 13 هو <b><bdi dir="ltr">Control of Non-Conforming Product</bdi></b> وده للـ <b>rejected items</b> اللي اتلاقت، ورقم 14 هو <b><bdi dir="ltr">Corrective &amp; Preventive Action</bdi></b> وده للـ <b>root cause</b> عشان ماتتكررش.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="bug">${t('Element 13 locks up the things I broke. Element 14 comes looking for me.', 'الـ element 13 بيحبس الحاجات اللي أنا بوّظتها. والـ element 14 بييجي يدوّر عليّا أنا.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('And element 20 draws the control charts that spot you.', 'والـ element 20 بيرسم الـ control charts اللي بتكشفك.')}</${Talk}>
        `),

        // 32 · 8 principles
        page(html`
          <${H1}>${t("ISO's 8 principles", 'الـ 8 principles بتوع الـ ISO')}</${H1}>
          <${NumList} tight=${true} items=${(A ? [
            ['Customer Focus', 'نفهم احتياجات العميل ونتخطاها عشان نكسب ولاءه.'],
            ['Leadership', 'الـ leaders بيعملوا بيئة الناس فيها مشاركة بالكامل.'],
            ['Involvement of People', 'الموظفين في كل المستويات بيساهموا في النجاح.'],
            ['Process Approach', 'ندير الأنشطة كـ processes عشان نتايج ثابتة.'],
            ['System Approach to Management', 'نظبط الـ processes المترابطة كأنها system واحد.'],
            ['Continuous Improvement', 'التحسين المستمر هدف دايم.'],
            ['Factual Decision Making', 'القرارات تتبني على data وتحليل موثوق.'],
            ['Mutually Beneficial Supplier Relationships', 'علاقات قوية مع الـ suppliers بتعمل value.']
          ] : [
            ['Customer Focus', 'understand and exceed customer needs to gain loyalty.'],
            ['Leadership', 'leaders create an environment where people are fully involved.'],
            ['Involvement of People', 'employees at all levels contribute to success.'],
            ['Process Approach', 'manage activities as processes for consistent results.'],
            ['System Approach to Management', 'align interconnected processes as one system.'],
            ['Continuous Improvement', 'ongoing improvement is a permanent objective.'],
            ['Factual Decision Making', 'base decisions on reliable data and analysis.'],
            ['Mutually Beneficial Supplier Relationships', 'strong, value-creating relationships with suppliers.']
          ]).map(([n, d], i) => [i + 1, A ? `الـ <b>${n}</b>: ${d}` : `<b>${n}</b>: ${d}`])} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Process approach</b> = manage activities as processes. <b>System approach</b> = align the interconnected processes as one system. Don\'t swap them.',
            'الـ <b>Process approach</b> يعني ندير الأنشطة كـ processes. والـ <b>System approach</b> يعني نظبط الـ processes المترابطة كأنها system واحد. ماتبدّلهمش.')}</p></${Box}>
        `, { sec: t('The 8 principles', 'الـ 8 principles') }),

        // 33 · principles figure
        page(html`
          <${H2}>${t('Tour the principles, then quiz yourself', 'لف على الـ principles، وبعدين اختبر نفسك')}</${H2}>
          <${Fig} name="qa-iso-principles" />
        `),

        // 34–35 · fireside chat: CMM vs ISO 9000
        page(html`
          <${Fireside} sub=${t("Tonight's talk: the CMM and ISO 9000 argue about who an organization really needs.", 'قعدة الليلة: الـ CMM والـ ISO 9000 بيتخانقوا الـ organization محتاجة مين فيهم بجد.')} />
          <${Chat} names=${A ? ['الـ CMM', 'الـ ISO 9000'] : ['CMM', 'ISO 9000']} lines=${A ? [
            [0, 'أنا framework <b>لتقييم وتحسين الـ maturity</b> بتاعة الـ development process في شركة الـ software.'],
            [1, 'وأنا مجموعة <b>standards معترف بيها دوليًا</b>: best practices عالمية عشان الـ quality requirements وتوقعات العملاء.'],
            [0, 'أنا معمول <b>أساسًا</b> لشركات الـ software development، والـ project management والـ IT والـ risk management بيستخدموني كمان.'],
            [1, 'أساسًا؟ أنا <b>generic جدًا</b>: <b>أي</b> organization بتقدم products أو services.'],
            [0, 'أنا جاي من الـ <b>SEI و Carnegie Mellon</b>، تحت الـ U.S. Department of Defense.'],
            [1, 'وأنا من الـ <b>International Organization for Standardization</b>. واسمي من <bdi dir="ltr">isos</bdi> يعني "متساوي".']
          ] : [
            [0, "I'm a framework for <b>assessing and improving the maturity</b> of a software company's development process."],
            [1, "I'm a set of <b>internationally recognized standards</b>: universal best practices for quality requirements and client expectations."],
            [0, 'I was made <b>mainly</b> for software development organizations. Project management, IT and risk management use me too.'],
            [1, "Mainly? I'm <b>highly generic</b>: <b>any</b> organization providing products or services."],
            [0, 'I come from the <b>SEI and Carnegie Mellon</b>, under the U.S. Department of Defense.'],
            [1, 'I come from the <b>International Organization for Standardization</b>. My name is Greek: <i>isos</i>, equal.']
          ]} />
        `, { sec: t('CMM vs ISO 9000', 'الـ CMM والـ ISO 9000') }),
        page(html`
          <${Chat} names=${A ? ['الـ CMM', 'الـ ISO 9000'] : ['CMM', 'ISO 9000']} start=${1} lines=${A ? [
            [0, 'عندي <b>5 levels</b>، ومحدش بينط ولا واحد.'],
            [1, 'وعندي <b>20 element</b>، وكل واحد لازم يبقى <b>موثق بوضوح وبالتفصيل</b>.'],
            [0, 'الشركات الكبيرة والحكومات بيستخدموني عشان <b>يقارنوا نفسهم</b> بغيرهم.'],
            [1, 'وأنا بشجع الـ continuous improvement والـ product reliability و<b>الاعتراف الدولي</b>.'],
            [0, 'في الـ Level 5 بتاعي، الموضوع كله <b>continuous process improvement</b>.'],
            [1, 'وواحد من الـ 8 principles بتوعي اسمه <b>continuous improvement</b>. يمكن متفقين في الآخر.']
          ] : [
            [0, 'I have <b>five levels</b>, and nobody skips one.'],
            [1, 'I have <b>20 elements</b>, and every one must be <b>clearly and thoroughly documented</b>.'],
            [0, 'Large companies and governments use me to <b>compare themselves</b> with others.'],
            [1, 'I promote continuous improvement, product reliability and <b>international recognition</b>.'],
            [0, 'At my Level 5 it is all about <b>continuous process improvement</b>.'],
            [1, 'One of my 8 principles is <b>continuous improvement</b> too. Maybe we agree after all.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t("CMM counts levels (5). ISO 9000 counts elements (20) and principles (8). Don't swap the numbers.", 'الـ CMM بيعد levels (5). والـ ISO 9000 بيعد elements (20) و principles (8). ماتلخبطش الأرقام.')}</${Hand}>
        `),

        // 36 · software engineering standards
        page(html`
          <${H1}>${t('Standards go international', 'الـ standards بقت دولية')}</${H1}>
          <${P}>${X('<b>Software engineering standards</b> ensure proper development, testing and maintenance of software <b>by following specific guidelines</b>.', 'الـ <b>Software engineering standards</b> بتضمن إن الـ development والـ testing والـ maintenance يتعملوا صح <b>بـ guidelines محددة</b>.')}</${P}>
          <${UL} items=${A ? [
            'فيه <b>جهات دولية ومحلية</b> بتعمل الـ SQA standards وبتفرض تطبيقها.',
            'الـ organizations بتتحول أكتر وأكتر <b>من standards محلية لـ دولية</b>.',
            'الـ <b>IEEE والـ IEEE Computer Society</b> في مقدمة الحركة دي، والـ IEEE بيساهم في الـ standardization من سنة <b>1976</b>.',
            'وده وصّل لـ <b>IEEE Software Engineering Standard Collection</b>: أساس لـ international project process standards كتير.'
          ] : [
            'Various organizations, including <b>international and national bodies</b>, establish and enforce SQA standards.',
            'Organizations are increasingly shifting <b>from local to international</b> standards.',
            'The <b>IEEE and IEEE Computer Society</b> lead this movement; since <b>1976</b> IEEE has contributed significantly to standardization.',
            'That led to the <b>IEEE Software Engineering Standard Collection</b>, a <b>foundation for many international project process standards</b>.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Organizations are shifting from international to local standards": <b>False</b>, it\'s local → international.<br/>Two years to keep apart: <b>1976</b> IEEE, <b>1993</b> SPICE.',
            'التحول من الدولي للمحلي؟ <b>غلط</b>، العكس.<br/>وماتلخبطش: <b>1976</b> للـ IEEE، و<b>1993</b> للـ SPICE.')}</p></${Box}>
        `, { sec: t('Standards and SPICE', 'الـ Standards والـ SPICE') }),

        // 37 · timeline figure
        page(html`
          <${Fig} name="qa-std-timeline" />
        `),

        // 38 · SPICE
        page(html`
          <${H1}>${t('SPICE: a recipe for assessment', 'الـ SPICE: وصفة للتقييم')}</${H1}>
          <${Def}>${X('<b>SPICE</b> = <b>S</b>oftware <b>P</b>rocess <b>I</b>mprovement for <b>C</b>apability d<b>E</b>termination.', 'الـ <b>SPICE</b> اختصار لـ:<span class="ltr"><b>S</b>oftware <b>P</b>rocess <b>I</b>mprovement for <b>C</b>apability d<b>E</b>termination</span>')}</${Def}>
          <${P} small=${true}>${X('The SPICE project and <b>ISO/IEC 15504</b> are joint initiatives by <b>ISO and IEC</b> to establish a standard software process assessment methodology. Introduced in <b>1993</b>, SPICE aims to improve international software process standards. Its <b>3 objectives</b>:',
            'الـ SPICE project والـ <b><bdi dir="ltr">ISO/IEC 15504</bdi></b> مبادرات مشتركة بين الـ <b>ISO والـ IEC</b> لـ methodology standard لتقييم الـ software process. اتقدم سنة <b>1993</b> عشان يحسّن الـ international software process standards. والـ <b>3 objectives</b>:')}</${P}>
          <${NumList} items=${A ? [
            [1, 'نعمل <b>standard framework</b> لتقييم الـ software process.'],
            [2, 'نعمل <b>organizational assessments</b> للـ standards الجديدة.'],
            [3, 'نسهّل <b>تبنّي تقييم الـ process عالميًا</b> في الصناعة.']
          ] : [
            [1, 'Establish a <b>standard framework</b> for software process assessment.'],
            [2, 'Conduct <b>organizational assessments</b> for emerging standards.'],
            [3, 'Facilitate <b>global adoption</b> of software process assessment in industry.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('It\'s <b>Process</b>, not Procedure, and <b>Capability Determination</b>, not Evaluation. It\'s <b>ISO and IEC</b>, not IEEE.', 'الكلمة <b>Process</b> مش Procedure، و<b>Determination</b> مش Evaluation. ومن الـ <b>ISO والـ IEC</b>، مش الـ IEEE.')}</p></${Box}>
        `),

        // 39 · SPICE figure
        page(html`
          <${Fig} name="qa-spice" />
        `),

        // 40 · the numbers game
        page(html`
          <${H2}>${t('The numbers game', 'لعبة الأرقام')}</${H2}>
          <${P} small=${true}>${t('Counts and years: the exams love them. Tap a number, then what it counts.', 'أعداد وسنين، والامتحانات بتحبهم. دوس على رقم، وبعدين على الحاجة اللي بيعدّها.')}</${P}>
          <${Match} id="nums" left=${['5', '6', '8', '20', '3', '1976', '1993']}
            right=${A ? ['الـ objectives بتوع الـ SPICE', 'سنة ما الـ SPICE اتقدم', 'الـ maturity levels بتوع الـ CMM', 'الـ key elements بتوع الـ ISO 9000', 'من السنة دي الـ IEEE بيساهم في الـ standardization', 'الـ components بتوع الـ CMM structure', 'الـ principles بتوع الـ ISO']
              : ['SPICE objectives', 'The year SPICE was introduced', 'CMM maturity levels', 'ISO 9000 key elements', 'IEEE has contributed to standardization since…', 'CMM structure components', 'ISO quality management principles']}
            answer=${[2, 5, 6, 3, 0, 4, 1]} />
        `, { sec: t('Numbers game', 'لعبة الأرقام') }),

        // 41–43 · the doctors' questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' exam and summary sheet. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحان الدكاترة والـ summary. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /widely used and preferred software method/i)}
          <${Grow} />
          <${Hand}>${t('hint: the one you climb level by level', 'تلميح: اللي بتطلعه level ورا level')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /are maturity levels in the CMM/i)}
          <${Gap} h=${8} />
          ${mq('m3', /20 crucial elements/i)}
        `),
        page(html`
          ${mq('m4', /^ISO stands for/i)}
          <${Gap} h=${4} />
          ${mq('m6', /When was the SPICE project introduced/i)}
        `),
        page(html`
          ${mq('m5', /^SPICE stands for/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('Process, not procedure. Determination, not evaluation.', 'قول Process مش procedure، وقول Determination مش evaluation')}</${Hand}>
        `),

        // 44 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>CMM</b> بيقيّم ويحسّن الـ maturity بتاعة الـ development process؛ من الـ SEI و Carnegie Mellon.',
            'فيه <b>5 levels</b> incremental من غير تنطيط:<span class="ltr">Initial → Repeatable → Defined → Quantitatively Managed → Optimizing</span>',
            'الـ Level 2 بتاع project management، والـ 3 بتاع standards للـ organization، والـ 4 بتاع statistics، والـ 5 بتاع continuous improvement.',
            'فيه <b>6 components</b>، والـ KPA ليه 5 aspects:<span class="ltr">goals, commitment, ability, measurement, verification</span>',
            'الـ <b>ISO 9000</b> لأي organization، والـ <bdi dir="ltr">isos</bdi> يعني equal، وفيه 20 element موثقين و 8 principles.',
            'الـ <b>SPICE</b> هو الـ <bdi dir="ltr">ISO/IEC 15504</bdi>، اتقدم سنة 1993 وليه 3 objectives. والـ IEEE من 1976.'
          ] : [
            '<b>CMM</b>: a standard framework for assessing and improving the maturity of a software development process; from SEI and Carnegie Mellon under the U.S. DoD.',
            '<b>5 incremental levels</b>, no skipping: Initial → Repeatable → Defined → Quantitatively Managed → Optimizing.',
            'Level 2 basic project management; 3 organization-wide standard processes; 4 statistical control; 5 continuous improvement.',
            '<b>6 components</b>: maturity levels, process capability, KPA, goals, common features, key practices.',
            'KPA aspects: goals, commitment, ability, measurement, verification.',
            '<b>ISO 9000</b>: generic, for any organization; isos = equal; 20 documented elements; 8 principles.',
            '<b>SPICE</b>: Software Process Improvement for Capability Determination; ISO/IEC 15504; 1993; 3 objectives. IEEE since 1976.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 45 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 7!', 'خلّصت الفصل السابع!')}</${H1}>
            <${Talk} who="lens">${t('Next time: Six Sigma, where defects are counted per million.', 'المرة الجاية: الـ Six Sigma، اللي الـ defects فيها بتتعد في المليون.')}</${Talk}>
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

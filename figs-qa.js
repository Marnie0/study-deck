// Visuals for the Software Quality Assurance notes (names 'qa-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fq-accent')) { const s = document.createElement('style'); s.id = 'fq-accent'; s.textContent = '[data-fig^="qa-"]{ --fig-k: var(--k-qa); --fig-s: var(--s-qa); }'; document.head.appendChild(s); } })();
/* ── part 1 ── */
// Software Quality Assurance visuals, part 1: L1 Figures 1.1 to 1.4, L6 test-team org charts, L7 CMM levels.
// Every label and caption comes from the slide or the site's notes for that slide.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fq1 .fig-dots i.on{ background:var(--k-qa); } .fq1 .fig-btn:hover{ border-color:var(--k-qa); } .fq1 .fig-btn.solid{ background:var(--s-qa); }
.fq1-draw{ stroke-dasharray:2600; stroke-dashoffset:0; animation:fq1draw 2.6s ease-out; }
@keyframes fq1draw{ from{ stroke-dashoffset:2600; } to{ stroke-dashoffset:0; } }
.fq1-in{ animation:fq1in .5s ease both; }
@keyframes fq1in{ from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:none; } }
.fq1-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:10px auto 0; max-width:560px; min-height:30px; }
.fq1-chips span{ border:1px solid var(--k-qa); background:var(--paper); color:var(--ink); border-radius:99px; padding:3px 10px; font-size:.84rem; line-height:1.3; }
.fq1-chips em{ font-style:normal; font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.fq1-click{ cursor:pointer; }
.fq1 .fig-stage{ padding-left:4px; padding-right:4px; } .fq1 .fig-stage svg.fq1-n{ max-width:400px; }
@media (prefers-reduced-motion: reduce){ .fq1-draw, .fq1-in{ animation:none; } }`;
  if (!document.getElementById('fq1-css')) { const s = document.createElement('style'); s.id = 'fq1-css'; s.textContent = CSS; document.head.appendChild(s); }

  const ON = 'var(--s-qa)', DONE = 'color-mix(in srgb, var(--k-qa) 16%, var(--paper))';
  const white = { fill: '#fff' }, HALO = { paintOrder: 'stroke', stroke: 'var(--paper-2)', strokeWidth: 5, strokeLinejoin: 'round' };
  const arrowDef = (id, col, sz) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth=${sz || 7} markerHeight=${sz || 7} orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${col || 'var(--graphite)'} /></marker>`;
  // two-line or one-line centred label
  const label = (x, y, lines, on, size, weight) => lines.map((t, j) => html`<text key=${j} x=${x} y=${y + (j - (lines.length - 1) / 2) * ((size || 14) + 3) + 5} textAnchor="middle" fontSize=${size || 14} fontWeight=${weight || 600} style=${on ? white : null}>${t}</text>`);
  // a replay that also restarts the CSS entrance animations
  function useRun(ctl) { const [run, setRun] = useState(0); return [run, Object.assign({}, ctl, { replay: () => { setRun(r => r + 1); ctl.replay(); } })]; }

  /* ── L1 slide 7: Figure 1.1 Waterfall Model ── */
  function Waterfall({ ar }) {
    const P = [['System', 'Engineering'], ['Analysis'], ['Design'], ['Coding'], ['Testing'], ['Maintenance']];
    const steps = [
      { en: '<b>Figure 1.1 Waterfall Model</b>: one of the oldest software lifecycle models. The process starts at the system level and is followed by phases like analysis, design, coding, testing and maintenance.', ar: '<b>Figure 1.1 Waterfall Model</b>: من أقدم الـ software lifecycle models. الـ process بتبدأ من <b>الـ system level</b> وبعدها phases زي الـ analysis والـ design والـ coding والـ testing والـ maintenance.' },
      { en: '1. <b>System Engineering</b>: defines both software and hardware requirements necessary for development.', ar: '1. الـ <b>System Engineering</b>: بيحدد الـ software requirements والـ hardware requirements الاتنين اللي محتاجينهم للتطوير.' },
      { en: '2. <b>Analysis</b>: involves feasibility studies and setting the goals, performance, and interface requirements.', ar: '2. الـ <b>Analysis</b>: فيه feasibility studies وتحديد الـ goals والـ performance والـ interface requirements.' },
      { en: '3. <b>Design</b>: translates requirements into software structure, such as database design, to guide coding and ensure quality.', ar: '3. الـ <b>Design</b>: بيحوّل الـ requirements لـ software structure، زي الـ database design، عشان يوجّه الـ coding ويضمن الـ quality.' },
      { en: '4. <b>Coding</b>: developers write the program code based on the design specifications.', ar: '4. الـ <b>Coding</b>: الـ developers بيكتبوا الـ program code على أساس الـ design specifications.' },
      { en: '5. <b>Testing</b>: the software is tested to detect bugs and verify that it meets the stated requirements.', ar: '5. الـ <b>Testing</b>: بنختبر الـ software عشان نكتشف الـ bugs ونتأكد إنه ماشي على الـ requirements المذكورة.' },
      { en: '6. <b>Maintenance</b>: fixes issues and updates the software as new needs arise.', ar: '6. الـ <b>Maintenance</b>: بيصلّح المشاكل ويعمل update للـ software لما تظهر احتياجات جديدة.' },
      { en: 'A vertical line rises from Maintenance and is joined by <b>two-headed arrows</b> to every earlier phase, so each later phase can feed back to the earlier ones.', ar: 'فيه خط رأسي طالع من الـ Maintenance ومتوصل بـ <b>أسهم بوشين (two-headed)</b> بكل الـ phases اللي قبله، يعني كل phase متأخرة ممكن ترجع feedback للـ phases اللي قبلها.' },
      { en: '<b>Advantages</b>: simple, structured, clear documentation, early requirements, easy management. <b>Drawback</b>: errors made in early phases can carry over to later stages, causing delays and increased costs since problems must be fixed at multiple points.', ar: '<b>المميزات</b>: بسيط، structured، documentation واضحة، الـ requirements بدري، وإدارته سهلة. <b>العيب</b>: الـ errors اللي بتحصل في الـ phases الأولانية ممكن تنتقل للمراحل اللي بعدها، وده بيعمل تأخير وتكلفة أكتر لأن المشاكل لازم تتصلح في أكتر من مكان.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const W = 112, H = 40, X = k => 4 + k * 38, Y = k => 6 + k * 48, LX = 290;
    const hex = (x, y) => `${x},${y + H / 2} ${x + 10},${y} ${x + W - 10},${y} ${x + W},${y + H / 2} ${x + W - 10},${y + H} ${x + 10},${y + H}`;
    const err = i === 8;
    return html`<figure className="fig fq1"><div className="fig-stage">
      <svg className="fq1-n" viewBox="0 0 312 292" role="img" aria-label="Figure 1.1 Waterfall Model: System Engineering, Analysis, Design, Coding, Testing, Maintenance">
        <defs>${arrowDef('fq1-wf-a')}${arrowDef('fq1-wf-r', 'var(--pen)')}${arrowDef('fq1-wf-k', 'var(--k-qa)', 5)}</defs>
        <g className=${pop(i >= 7)} stroke="var(--k-qa)" strokeWidth="1.5" fill="none">
          <path d=${`M${LX} ${Y(0) + H / 2} V${Y(5)}`} className=${i === 7 && !calm() ? 'flow' : ''} />
          ${[0, 1, 2, 3, 4].map(k => html`<path key=${k} d=${`M${X(k) + W + 2} ${Y(k) + H / 2} H${LX - 2}`} markerStart="url(#fq1-wf-k)" markerEnd="url(#fq1-wf-k)" />`)}
        </g>
        ${[0, 1, 2, 3, 4].map(k => html`<path key=${k} d=${`M${X(k) + 22} ${Y(k) + H} V${Y(k + 1) + H / 2} H${X(k + 1) - 1}`} fill="none" stroke=${err ? 'var(--pen)' : 'var(--graphite)'} strokeWidth=${err ? 2.5 : 1.6} markerEnd=${err ? 'url(#fq1-wf-r)' : 'url(#fq1-wf-a)'} className=${(err && !calm() ? 'flow ' : '') + pop(i >= k + 2)} />`)}
        ${P.map((t, k) => { const on = i === k + 1, seen = i >= k + 1;
          return html`<g key=${k} className="fade" style=${{ opacity: seen ? 1 : .22 }}>
            <polygon points=${hex(X(k), Y(k))} fill=${on ? ON : seen ? DONE : 'var(--paper)'} stroke=${seen ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${on ? 2.5 : 1.4} />
            ${label(X(k) + W / 2, Y(k) + H / 2, t, on, 14)}</g>`; })}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 9: Figure 1.2 Spiral Model ── */
  const SP = 'M187 218 A27.5 21 0 0 1 242 218 A54.5 42 0 0 1 133 218 A82 63 0 0 1 297 218 A109.5 84 0 0 1 78 218 A137 105 0 0 1 352 218 A164.5 125 0 0 1 23 218 A192 148 0 0 1 407 218 A220 169 0 0 1 187 387';
  function Spiral({ ar }) {
    const steps = [
      { en: '<b>Figure 1.2 Spiral Model</b>: two axes split the figure into four quadrants. The vertical axis points up to <b>Cumulative cost</b>, the horizontal axis points left to <b>Review</b>, and the <b>Progress</b> arrow shows the spiral turning clockwise and widening outward.', ar: '<b>Figure 1.2 Spiral Model</b>: فيه محورين بيقسموا الشكل لـ 4 أرباع. المحور الرأسي سهمه لفوق لـ <b>Cumulative cost</b>، والأفقي سهمه للشمال لـ <b>Review</b>، وسهم الـ <b>Progress</b> بيوضح إن الـ spiral بيلف مع عقارب الساعة وبيوسع لبره.', q: -1, chips: [] },
      { en: '<b>Planning</b> (Plan): defines specifications, objectives, constraints, and strategies. All the alternatives that are helpful in developing a cost effective project are analyzed and all possible risks involved in the project development are identified.', ar: 'الـ <b>Planning</b> (Plan): بيحدد الـ specifications والـ objectives والـ constraints والـ strategies. بنحلل كل البدائل اللي تساعد نعمل مشروع cost effective، ونحدد كل الـ risks المحتملة في تطوير المشروع.', q: 0, chips: ['Requirements plan'] },
      { en: '<b>Risk Analysis</b>: identifies possible risks and evaluates cost-effective solutions. On each loop there is a <b>Risk analysis</b>, and the shaded wedge widens into <b>Prototype 1</b>, <b>Prototype 2</b> and <b>Operational Prototype</b>.', ar: 'الـ <b>Risk Analysis</b>: بيحدد الـ risks المحتملة ويقيّم الحلول الـ cost-effective. في كل لفة فيه <b>Risk analysis</b>، والجزء المتظلل بيوسع لـ <b>Prototype 1</b> و<b>Prototype 2</b> و<b>Operational Prototype</b>.', q: 1, chips: ['Risk analysis (on each loop)', 'Prototype 1', 'Prototype 2', 'Operational Prototype'] },
      { en: '<b>Design Engineering</b> (Design): the actual software is developed iteratively.', ar: 'الـ <b>Design Engineering</b> (Design): الـ software الحقيقي بيتعمل بشكل iterative.', q: 2, chips: ['Concept of requirements', 'Requirements', 'Draft', 'Detailed design', 'Code', 'Integration', 'Test', 'Verification & Validation (twice)', 'Implementation'] },
      { en: '<b>Testing & Evaluation</b> (Testing): customers test the product and provide feedback to improve it. All the phases concentrate on the feedback received from the customer and the testing team to resolve the drawbacks and bugs found in each prototype. The spiral ends with an arrow at <b>Release</b>.', ar: 'الـ <b>Testing & Evaluation</b> (Testing): العملاء بيختبروا المنتج ويدّوا feedback عشان يتحسن. كل الـ phases بتركز على الـ feedback اللي جاي من العميل والـ testing team عشان تحل العيوب والـ bugs اللي اتلاقت في كل prototype. والـ spiral بيخلص بسهم عند <b>Release</b>.', q: 3, chips: ['Concept of operation', 'Development plan', 'Test plan', 'Release'] },
      { en: 'The four phases are <b>repeated in cycles</b> until all issues are resolved. Two or three prototypes are typically created before delivering the final product; each prototype goes through the full cycle to identify and fix problems.', ar: 'الـ 4 phases <b>بيتكرروا في cycles</b> لحد ما كل المشاكل تتحل. عادةً بيتعمل 2 أو 3 prototypes قبل الـ final product، وكل prototype بيعدي على الـ cycle كلها عشان نلاقي المشاكل ونصلحها.', q: -1, chips: [] },
      { en: '<b>Drawback</b>: the main drawback of the model is the amount of time taken to complete the iterations, which can increase costs.', ar: '<b>العيب</b>: العيب الأساسي للـ model هو الوقت اللي بتاخده الـ iterations عشان تخلص، وده ممكن يزود التكلفة.', q: -1, chips: [] }
    ];
    const [i, ctl0] = useSteps(steps.length, 3200);
    const [run, ctl] = useRun(ctl0);
    const s = steps[i], Q = [[0, 0], [187, 0], [187, 218], [0, 218]], QW = [187, 253, 253, 187], QH = [218, 218, 212, 212];
    const big = (x, y, t, k, anchor) => html`<text x=${x} y=${y} fontSize="22" fontWeight="700" textAnchor=${anchor || 'start'} style=${s.q === k ? { fill: 'var(--k-qa)' } : null}>${t}</text>`;
    const cost = i === 6;
    return html`<figure className="fig fq1"><div className="fig-stage">
      <svg viewBox="0 0 440 430" style=${{ maxWidth: '470px' }} role="img" aria-label="Figure 1.2 Spiral Model: Plan, Risk Analysis, Design and Testing quadrants">
        <defs>${arrowDef('fq1-sp-a', 'var(--ink)')}${arrowDef('fq1-sp-c', 'var(--pen)')}</defs>
        ${Q.map((p, k) => html`<rect key=${k} x=${p[0]} y=${p[1]} width=${QW[k]} height=${QH[k]} fill="color-mix(in srgb, var(--k-qa) 15%, transparent)" className="fade" style=${{ opacity: s.q === k ? 1 : 0 }} />`)}
        <path d="M187 218 L407 168 L407 218 Z" fill="color-mix(in srgb, var(--graphite) 28%, transparent)" className="fade" style=${{ opacity: s.q === 1 ? 1 : .45 }} />
        <path d="M4 218 H436" stroke="var(--ink)" strokeWidth="1.3" markerStart="url(#fq1-sp-a)" fill="none" />
        <path d="M187 426 V24" stroke=${cost ? 'var(--pen)' : 'var(--ink)'} strokeWidth=${cost ? 2.5 : 1.3} markerEnd=${cost ? 'url(#fq1-sp-c)' : 'url(#fq1-sp-a)'} fill="none" />
        <text x="195" y="20" fontSize="18" fontWeight=${cost ? 700 : 500} style=${cost ? { fill: 'var(--pen)' } : null}>Cumulative cost</text>
        <text x="4" y="208" fontSize="18" style=${HALO}>Review</text>
        <path d="M146 74 Q200 58 270 64" stroke="var(--ink)" strokeWidth="1.3" fill="none" markerEnd="url(#fq1-sp-a)" />
        <text x="234" y="44" fontSize="18" textAnchor="middle">Progress</text>
        ${big(8, 44, 'Plan', 0)}
        <g>${big(434, 30, 'Risk', 1, 'end')}${big(434, 56, 'Analysis', 1, 'end')}</g>
        ${big(434, 422, 'Design', 2, 'end')}
        ${big(6, 374, 'Testing', 3)}
        <path key=${'sp' + run} d=${SP} fill="none" stroke="var(--k-qa)" strokeWidth="2.2" markerEnd="url(#fq1-sp-a)" className=${calm() ? '' : 'fq1-draw'} />
        <text x="178" y="412" fontSize="18" textAnchor="end" className=${pop(i >= 4)} style=${HALO}>Release</text>
        ${i === 5 && !calm() && html`<circle r="7" fill=${ON} stroke="var(--paper)" strokeWidth="2"><animateMotion dur="9s" repeatCount="indefinite" path=${SP} /></circle>`}
      </svg>
      <div className="fq1-chips" aria-live="polite">${s.chips.length > 0 && html`<em>Labels on the spiral in this quadrant:</em>`}${s.chips.map(c => html`<span key=${c}>${c}</span>`)}</div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 11: Figure 1.3 V Model ── */
  function VModel({ ar }) {
    const L = [['Requirements', 'Specifications'], ['Functional', 'Specifications'], ['System Design'], ['Unit Design']];
    const R = [['Acceptance', 'Test'], ['System Test'], ['Integration', 'Test'], ['Unit Test']];
    const steps = [
      { en: '<b>Figure 1.3 V Model</b>: the V-Model integrates testing into every stage of the software development life cycle. It emphasizes early testing, starting from the requirements phase, ensuring continuous quality checks throughout the process.', ar: '<b>Figure 1.3 V Model</b>: الـ V-Model بيدخّل الـ testing في كل stage من الـ software development life cycle. بيركز على الـ testing بدري، من أول الـ requirements phase، وده بيضمن quality checks مستمرة طول الـ process.' },
      { en: '<b>Left side</b> (arrows pointing down): development activities, from business requirements to detailed design. Development moves from the high level to the low level design.', ar: '<b>الناحية الشمال</b> (الأسهم نازلة): الـ development activities، من الـ business requirements لحد الـ detailed design. الـ development بيمشي من الـ high level للـ low level design.' },
      { en: '<b>Code</b> sits at the bottom of the V.', ar: 'الـ <b>Code</b> في قاع الـ V.' },
      { en: '<b>Right side</b> (arrows pointing up): the corresponding testing phases, from unit testing to acceptance testing. The testing cycle moves from the low level to the higher level.', ar: '<b>الناحية اليمين</b> (الأسهم طالعة): الـ testing phases المقابلة، من الـ unit testing لحد الـ acceptance testing. الـ testing cycle بيمشي من الـ low level للـ higher level.' },
      { en: 'Unit Design and Unit Test, joined by <b>Test Cases</b>: during the unit design stage the individual programs or modules are specified, and the test cases for unit testing are developed based on them. <b>Unit Testing</b> verifies individual modules or code units.', ar: 'الـ Unit Design والـ Unit Test وبينهم <b>Test Cases</b>: في الـ unit design stage بنحدد الـ programs أو الـ modules كل واحد لوحده، وعلى أساسها بنعمل الـ test cases بتاعة الـ unit testing. الـ <b>Unit Testing</b> بيتأكد من كل module أو code unit لوحده.', p: 3 },
      { en: 'System Design to Integration Test: the <b>Integration Test Plan</b>. <b>Integration Testing</b> checks interactions between modules.', ar: 'من الـ System Design للـ Integration Test: الـ <b>Integration Test Plan</b>. الـ <b>Integration Testing</b> بيختبر التفاعل بين الـ modules.', p: 2 },
      { en: 'Functional Specifications to System Test: the <b>System Test Plan</b>. <b>System Testing</b> ensures the entire system meets design and performance expectations.', ar: 'من الـ Functional Specifications للـ System Test: الـ <b>System Test Plan</b>. الـ <b>System Testing</b> بيتأكد إن الـ system كله ماشي على توقعات الـ design والـ performance.', p: 1 },
      { en: 'Requirements Specifications to Acceptance Test: the <b>Acceptance Test Plan</b>. <b>Acceptance Testing</b> is conducted by the customer to confirm business requirements are met.', ar: 'من الـ Requirements Specifications للـ Acceptance Test: الـ <b>Acceptance Test Plan</b>. الـ <b>Acceptance Testing</b> بيعمله العميل عشان يتأكد إن الـ business requirements اتحققت.', p: 0 },
      { en: '<b>Advantage</b>: early verification and validation reduce defects and improve quality. <b>Drawback</b>: less effective when requirements are incomplete or badly documented; not suitable for every project.', ar: '<b>الميزة</b>: الـ verification والـ validation بدري بيقللوا الـ defects ويحسنوا الـ quality. <b>العيب</b>: أقل فاعلية لما الـ requirements تبقى ناقصة أو متوثقة وحش، ومش مناسب لكل المشاريع.' }
    ];
    const [i, ctl0] = useSteps(steps.length, 2800);
    const [run, ctl] = useRun(ctl0);
    // narrow layout (325 wide, text 13) so labels stay legible on phones; boxes step inward to keep the V
    const H = 44, Y = r => 4 + r * 62, LB = [[2, 106], [12, 106], [22, 102], [36, 88]], RB = [[217, 106], [207, 106], [203, 98], [201, 88]], CB = [113, 262, 99];
    const pair = steps[i].p, plansOn = r => i >= 4 + (3 - r) || i === 8;
    const box = (x, w, y, t, seen, on, k) => html`<g key=${k} className="fade" style=${{ opacity: seen ? 1 : .2 }}>
      <rect x=${x} y=${y} width=${w} height=${H} rx="3" fill=${on ? ON : seen ? DONE : 'var(--paper)'} stroke=${on ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${on ? 2.5 : 1.3} />
      ${label(x + w / 2, y + H / 2, t, on, 13)}</g>`;
    const line = (d, seen, k) => html`<path key=${k} d=${d} stroke="var(--graphite)" strokeWidth="1.5" fill="none" markerEnd="url(#fq1-v-a)" className=${pop(seen)} />`;
    const PL = [['Acceptance', 'Test Plan'], ['System', 'Test Plan'], ['Integration', 'Test Plan'], ['Test', 'Cases']];
    const lc = r => LB[r][0] + LB[r][1] / 2, rc = r => RB[r][0] + RB[r][1] / 2;
    return html`<figure className="fig fq1"><div className="fig-stage">
      <svg key=${run} className="fq1-n" viewBox="0 0 325 308" role="img" aria-label="Figure 1.3 V Model: development on the left, testing on the right, test plans across">
        <defs>${arrowDef('fq1-v-a')}${arrowDef('fq1-v-k', 'var(--k-qa)')}</defs>
        ${[0, 1, 2].map(r => line(`M${lc(r) + 8} ${Y(r) + H} L${lc(r + 1) + 14} ${Y(r + 1) - 1}`, i >= 1, 'l' + r))}
        ${line(`M${lc(3) + 10} ${Y(3) + H} L${CB[0] + 30} ${CB[1] - 1}`, i >= 2, 'lc')}
        ${line(`M${CB[0] + CB[2] - 30} ${CB[1]} L${rc(3) - 10} ${Y(3) + H + 1}`, i >= 3, 'rc')}
        ${[3, 2, 1].map(r => line(`M${rc(r) - 8} ${Y(r)} L${rc(r - 1) - 14} ${Y(r - 1) + H + 1}`, i >= 3, 'r' + r))}
        ${PL.map((t, r) => { const on = pair === r, seen = plansOn(r), x1 = LB[r][0] + LB[r][1], x2 = RB[r][0], mid = (x1 + x2) / 2;
          return html`<g key=${'p' + r} className=${pop(seen)}>
            ${r < 3 && html`<path d=${`M${x1 + 2} ${Y(r) + 36} H${x2 - 2}`} stroke=${on ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${on ? 2.2 : 1.3} strokeDasharray="4 4" fill="none" markerEnd=${on ? 'url(#fq1-v-k)' : 'url(#fq1-v-a)'} className=${on && !calm() ? 'flow' : ''} />`}
            ${t.map((s, j) => html`<text key=${j} x=${mid} y=${Y(r) + (r === 3 ? 19 : 12) + j * 15} textAnchor="middle" fontSize="13" fontWeight=${on ? 700 : 500} style=${on ? { fill: 'var(--k-qa)' } : null}>${s}</text>`)}</g>`; })}
        ${L.map((t, r) => box(LB[r][0], LB[r][1], Y(r), t, i >= 1, pair === r || (i === 1), 'L' + r))}
        ${box(CB[0], CB[2], CB[1], ['Code'], i >= 2, i === 2, 'C')}
        ${R.map((t, r) => box(RB[r][0], RB[r][1], Y(r), t, i >= 3, pair === r || i === 3, 'R' + r))}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 14: Figure 1.4 Agile Model (TDD) ── */
  function Tdd({ ar }) {
    const B = ['Create the test code', 'Write or modify the function code', 'Create additional tests', 'Test the functional code', 'Refactor the code'];
    const steps = [
      { en: '<b>Test-driven development (TDD)</b>, a main XP practice, involves writing test cases before coding to ensure quality and reduce errors. <b>Figure 1.4 Agile Model</b> shows its five steps.', ar: 'الـ <b>Test-driven development (TDD)</b>، وهو practice أساسي في الـ XP، بيكتب الـ test cases قبل الـ coding عشان يضمن الـ quality ويقلل الـ errors. <b>Figure 1.4 Agile Model</b> بيوضح الـ 5 steps بتوعه.', b: -1 },
      { en: '1. <b>Create the test code</b>: the developer writes automated test scripts before writing the actual program code. These tests define what the software should do.', ar: '1. <b>Create the test code</b>: الـ developer بيكتب automated test scripts قبل ما يكتب الـ program code الحقيقي. الـ tests دي بتحدد الـ software المفروض يعمل إيه.', b: 0 },
      { en: '2. <b>Write or modify the functional code</b>: the developer then writes the actual code to pass the predefined test cases. The code is adjusted until it meets all test requirements.', ar: '2. <b>Write or modify the functional code</b>: بعدها الـ developer بيكتب الـ code الحقيقي عشان يعدّي الـ test cases المحددة مسبقًا، وبيتعدل لحد ما يحقق كل الـ test requirements.', b: 1 },
      { en: '3. <b>Create additional tests</b>: the tester adds more tests with different inputs based on the complexity of the module.', ar: '3. <b>Create additional tests</b>: الـ tester بيزود tests تانية بـ inputs مختلفة على حسب تعقيد الـ module.', b: 2 },
      { en: '4. <b>Test the functional code</b>: the functional code is tested repeatedly using the created test cases until all tests pass successfully.', ar: '4. <b>Test the functional code</b>: الـ functional code بيتختبر أكتر من مرة بالـ test cases اللي اتعملت لحد ما كل الـ tests تعدّي بنجاح.', b: 3 },
      { en: 'The <b>loop arrow</b> goes from Test the functional code back up to Write or modify the function code: the code is adjusted and tested again until all tests pass.', ar: '<b>السهم الراجع (loop)</b> بيروح من Test the functional code لفوق لـ Write or modify the function code: الـ code بيتعدل ويتختبر تاني لحد ما كل الـ tests تعدّي.', b: 5 },
      { en: '5. <b>Refactor the code</b>: the developer improves the code to make it easier to maintain, extend, and update. This step removes duplicate or unused code and reduces complexity.', ar: '5. <b>Refactor the code</b>: الـ developer بيحسّن الـ code عشان يبقى أسهل في الـ maintenance والتوسيع والـ update. الخطوة دي بتشيل الـ code المتكرر أو اللي مش مستخدم وبتقلل التعقيد.', b: 4 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const b = steps[i].b, X = 6, W = 272, H = 36, Y = k => 6 + k * 56, seenB = k => k < 4 ? i >= k + 1 : i >= 6;
    const loop = i >= 5, onB = k => b === k || (b === 5 && (k === 1 || k === 3));
    return html`<figure className="fig fq1"><div className="fig-stage">
      <svg className="fq1-n" viewBox="0 0 330 270" role="img" aria-label="Figure 1.4 Agile Model: the five TDD steps with a loop back">
        <defs>${arrowDef('fq1-td-a')}${arrowDef('fq1-td-k', 'var(--k-qa)')}</defs>
        ${[0, 1, 2, 3].map(k => html`<path key=${k} d=${`M${X + W / 2} ${Y(k) + H} V${Y(k + 1) - 1}`} stroke="var(--graphite)" strokeWidth="1.5" markerEnd="url(#fq1-td-a)" className=${pop(seenB(k + 1))} />`)}
        <path d=${`M${X + W} ${Y(3) + H / 2} H${X + W + 36} V${Y(1) + H / 2} H${X + W + 2}`} fill="none" stroke=${b === 5 ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${b === 5 ? 2.5 : 1.5} markerEnd=${b === 5 ? 'url(#fq1-td-k)' : 'url(#fq1-td-a)'} className=${pop(loop) + (b === 5 && !calm() ? ' flow' : '')} />
        ${B.map((t, k) => { const on = onB(k), seen = seenB(k);
          return html`<g key=${k} className="fade" style=${{ opacity: seen ? 1 : .2 }}>
            <rect x=${X} y=${Y(k)} width=${W} height=${H} fill=${on ? ON : seen ? DONE : 'var(--paper)'} stroke=${on ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${on ? 2.5 : 1.3} />
            ${label(X + W / 2, Y(k) + H / 2, [t], on, 14)}</g>`; })}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L6 slides 10 to 12: test management and organization structures ── */
  function TestOrgs({ ar }) {
    const steps = [
      { en: '<b>1. Small Team Structure</b>: the Development Manager is at the top, with the Testers and the Programmers under him.<br><b>Pros</b>: fast communication between developers and testers.<br><b>Cons</b>: if the development manager is not experienced he/she may ignore bug reports to motivate the team to deliver.', ar: '<b>1. الـ Small Team Structure</b>: الـ Development Manager فوق خالص، وتحته الـ Testers والـ Programmers.<br><b>المميزات</b>: تواصل سريع بين الـ developers والـ testers.<br><b>العيوب</b>: لو الـ development manager مش experienced ممكن يطنّش الـ bug reports عشان يحمّس الـ team إنه يسلّم.' },
      { en: '<b>2. Organizational Structure for an Independent Team</b>: the Project Manager is at the top, with two branches: the Test Manager/Test Lead, with the Testers under him, and the Development Manager, with the Programmers under him.<br><b>Pros</b>: the testing team\'s feedback is considered in decision-making.<br><b>Cons</b>: the final decision lies with the project manager, which may affect quality in critical projects.', ar: '<b>2. الـ Organizational Structure for an Independent Team</b>: الـ Project Manager فوق خالص، وتحته فرعين: الـ Test Manager/Test Lead وتحته الـ Testers، والـ Development Manager وتحته الـ Programmers.<br><b>المميزات</b>: الـ feedback بتاع الـ testing team بيتاخد في الاعتبار في القرارات.<br><b>العيوب</b>: القرار الأخير في إيد الـ project manager، وده ممكن يأثر على الـ quality في المشاريع الـ critical.' },
      { en: '<b>3. Test Group Reporting to Executive Management</b>: the Executive Manager is at the top, with the QA/Test Managers, the Development Managers and the Project Managers under him.<br><b>Pros</b>: independence of the quality team; quality reports reach senior management directly.', ar: '<b>3. الـ Test Group Reporting to Executive Management</b>: الـ Executive Manager فوق خالص، وتحته الـ QA/Test Managers والـ Development Managers والـ Project Managers.<br><b>المميزات</b>: الـ quality team مستقل؛ والـ quality reports بتوصل للـ senior management على طول.' }
    ];
    const [i, ctl0] = useSteps(steps.length, 6000);
    const [run, ctl] = useRun(ctl0);
    const anim = calm() ? '' : 'fq1-in';
    const box = (x, y, w, h, t, d, test) => html`<g className=${anim} style=${{ animationDelay: d + 's' }}>
      <rect x=${x} y=${y} width=${w} height=${h} rx="10" fill=${test ? DONE : 'var(--paper)'} stroke=${test ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${test ? 2.2 : 1.4} />
      ${label(x + w / 2, y + h / 2, t, false, 14, test ? 700 : 600)}</g>`;
    const ln = (d, delay) => html`<path d=${d} stroke="var(--graphite)" strokeWidth="1.5" fill="none" className=${anim} style=${{ animationDelay: delay + 's' }} />`;
    const charts = [
      html`<g key=${'c0' + run}>${box(75, 8, 160, 44, ['Development Manager'], 0)}${ln('M155 52 V88 M70 88 H240 M70 88 V126 M240 88 V126', .3)}${box(10, 126, 120, 44, ['Testers'], .6, true)}${box(180, 126, 120, 44, ['Programmers'], .6)}</g>`,
      html`<g key=${'c1' + run}>${box(85, 4, 140, 40, ['Project Manager'], 0)}${ln('M155 44 V62 M77 62 H233 M77 62 V80 M233 62 V80', .3)}${box(4, 80, 146, 46, ['Test Manager/', 'Test Lead'], .6, true)}${box(160, 80, 146, 46, ['Development', 'Manager'], .6)}${ln('M77 126 V150 M233 126 V150', .9)}${box(4, 150, 146, 40, ['Testers'], 1.2, true)}${box(160, 150, 146, 40, ['Programmers'], 1.2)}</g>`,
      html`<g key=${'c2' + run}>${box(83, 8, 150, 44, ['Executive Manager'], 0)}${ln('M158 52 V88 M54 88 H262 M54 88 V126 M158 88 V126 M262 88 V126', .3)}${box(3, 126, 102, 52, ['QA/Test', 'Managers'], .6, true)}${box(107, 126, 102, 52, ['Development', 'Managers'], .6)}${box(211, 126, 102, 52, ['Project', 'Managers'], .6)}</g>`
    ];
    return html`<figure className="fig fq1"><div className="fig-stage">
      <svg className="fq1-n" viewBox="0 0 316 194" role="img" aria-label=${['Small team structure', 'Independent test team', 'Test group reporting to executive management'][i] + ' org chart'}>${charts[i]}</svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L7 slide 7: the five levels of CMM ── */
  function CmmLevels({ ar }) {
    const LV = [['Level 1: Initial', '(Inconsistent Management)'], ['Level 2: Repeatable', '(Project Management)'], ['Level 3: Defined', '(Process Management)'], ['Level 4: Managed', '(Capability Management)'], ['Level 5: Optimizing', '(Change Management)']];
    const AR = ['Basic Management Control', 'Process Definition', 'Process Measurement', 'Process Control'];
    const steps = [
      { en: '<b>Level 1 (Initial)</b>: processes are unstructured, reactive and inconsistent, leading to unstable project management. Organizations at this level struggle to meet goals reliably.', ar: '<b>الـ Level 1 (Initial)</b>: الـ processes بتبقى unstructured و reactive ومش ثابتة، وده بيخلي الـ project management مش مستقر. الـ organizations في الـ level ده بتعاني عشان تحقق الـ goals بشكل مضمون.' },
      { en: 'Arrow <b>Basic Management Control</b> to <b>Level 2 (Repeatable)</b>: basic project management practices are implemented, allowing for repeatable success. Organizations establish project planning, requirement control and product modifications, ensuring better cost and schedule management.', ar: 'سهم <b>Basic Management Control</b> لـ <b>الـ Level 2 (Repeatable)</b>: بيتطبق basic project management practices، وده بيدي نجاح بيتكرر. الـ organizations بتعمل project planning و requirement control و product modifications، وده بيضمن إدارة أحسن للتكلفة والـ schedule.' },
      { en: 'Arrow <b>Process Definition</b> to <b>Level 3 (Defined)</b>: standardized processes are developed and refined over time. Management ensures process consistency across the organization, and project teams tailor processes based on these standards.', ar: 'سهم <b>Process Definition</b> لـ <b>الـ Level 3 (Defined)</b>: processes standard بتتعمل وبتتحسن مع الوقت. الـ management بيضمن إن الـ processes ثابتة على مستوى الـ organization كلها، والـ project teams بتعدل الـ processes على مقاسها بناءً على الـ standards دي.' },
      { en: 'Arrow <b>Process Measurement</b> to <b>Level 4</b>, labelled <b>Managed (Capability Management)</b> in the figure (the slide text and Table 1 call it <b>Quantitatively Managed</b>): processes are controlled through statistical and quantitative techniques, allowing organizations to predict and manage project performance accurately. This ensures stable software quality and maintenance while minimizing variations.', ar: 'سهم <b>Process Measurement</b> لـ <b>الـ Level 4</b>، ومكتوب عليه في الشكل <b>Managed (Capability Management)</b> (والـ slide والـ Table 1 بيسموه <b>Quantitatively Managed</b>): الـ processes متحكم فيها بـ statistical و quantitative techniques، وده بيخلي الـ organizations تتوقع وتدير أداء المشروع بدقة، وبيضمن software quality و maintenance مستقرين مع تقليل الـ variations.' },
      { en: 'Arrow <b>Process Control</b> to <b>Level 5 (Optimizing)</b>: focuses on continuous process improvement through incremental and innovative advancements. Organizations at this level systematically refine their processes, using quantitative goals to drive enhancements and achieve long-term business objectives.', ar: 'سهم <b>Process Control</b> لـ <b>الـ Level 5 (Optimizing)</b>: بيركز على الـ continuous process improvement عن طريق تطويرات incremental و innovative. الـ organizations في الـ level ده بتحسّن الـ processes بتاعتها بشكل systematic، وبتستخدم quantitative goals عشان تحرك التحسينات وتحقق business objectives على المدى الطويل.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const CX = 112, RX = 108, RY = 30, Y = k => 436 - k * 94;
    return html`<figure className="fig fq1"><div className="fig-stage">
      <svg className="fq1-n" viewBox="0 0 310 470" role="img" aria-label="The five levels of CMM, from Level 1 Initial at the bottom to Level 5 Optimizing at the top">
        <defs>${arrowDef('fq1-cm-a', 'var(--ink)')}</defs>
        ${AR.map((t, k) => html`<g key=${'a' + k} className=${pop(i >= k + 1)}>
          <path d=${`M${CX} ${Y(k) - RY} V${Y(k + 1) + RY + 1}`} stroke="var(--ink)" strokeWidth=${i === k + 1 ? 2.6 : 1.6} markerEnd="url(#fq1-cm-a)" />
          <text x=${CX + 10} y=${(Y(k) + Y(k + 1)) / 2 + 5} fontSize="14" fontWeight=${i === k + 1 ? 700 : 500} style=${i === k + 1 ? { fill: 'var(--k-qa)' } : null}>${t}</text></g>`)}
        ${LV.map((t, k) => { const on = i === k, seen = i >= k;
          return html`<g key=${k} className=${'fade fq1-click'} style=${{ opacity: seen ? 1 : .2 }} onClick=${() => ctl.go(k)} role="button" tabIndex="0" aria-label=${t.join(' ')} onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctl.go(k); } }}>
            <ellipse cx=${CX} cy=${Y(k)} rx=${RX} ry=${RY} fill=${on ? ON : seen ? DONE : 'var(--paper)'} stroke=${on ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${on ? 2.5 : 1.4} />
            ${label(CX, Y(k), t, on, 14)}</g>`; })}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'qa-waterfall': Waterfall, 'qa-spiral': Spiral, 'qa-vmodel': VModel, 'qa-tdd': Tdd, 'qa-test-orgs': TestOrgs, 'qa-cmm-levels': CmmLevels });
})();

/* ── part 2 ── */
// QA Lecture 2 (Black Box Testing) visuals: slides 6, 12, 14, 21, 24, 29, 31, 33, 35. Every label comes from the slide or the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fq2 .fig-dots i.on{ background:var(--k-qa); }
.fq2 .fig-btn:hover{ border-color:var(--k-qa); } .fq2 .fig-btn.solid{ background:var(--s-qa); color:#fff; border-color:transparent; }
.fq2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fq2 svg text.fq2-red{ fill:var(--pen); } .fq2 svg text.fq2-k{ fill:var(--k-qa); } .fq2 svg text.fq2-mut{ fill:var(--graphite); } .fq2 svg text.fq2-w{ fill:#fff; }
.fq2 .fq2-fade{ transition:opacity .5s ease; }
.fq2 .fq2-bob{ animation:fq2bob 1.2s ease-in-out infinite; }
@keyframes fq2bob{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-2px); } }
.fq2 .fq2-shake{ animation:fq2shake .35s linear infinite; }
@keyframes fq2shake{ 0%,100%{ transform:translate(0,0); } 25%{ transform:translate(-2px,1px); } 50%{ transform:translate(1px,-1px); } 75%{ transform:translate(2px,1px); } }
.fq2 .fq2-puff{ animation:fq2puff 1.4s ease-out infinite; transform-box:fill-box; transform-origin:center; }
@keyframes fq2puff{ 0%{ opacity:.9; transform:scale(.6); } 100%{ opacity:0; transform:scale(1.5) translateX(8px); } }
.fq2 .fq2-walk{ transition:transform 2.6s ease-in-out; }
.fq2-chips{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; justify-content:center; margin-top:8px; }
.fq2-chip{ font:600 .88rem var(--mono); padding:5px 10px; min-height:32px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.fq2-chip:hover{ border-color:var(--k-qa); } .fq2-chip.on{ background:var(--s-qa); color:#fff; border-color:transparent; }
.fq2-in{ font:600 .9rem var(--mono); width:8.6em; padding:5px 8px; min-height:32px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); }
.fq2-in:focus{ outline:2px solid var(--k-qa); outline-offset:1px; }
.fq2-blk + .fq2-blk{ margin-top:16px; padding-top:12px; border-top:1px dashed var(--line); }
.fq2-bt{ margin:2px 0 0; font-size:.88rem; color:var(--graphite); }
.fq2-cars{ display:grid; grid-template-columns:1fr 1fr; gap:8px; max-width:560px; margin:0 auto; } .fq2-cars > div{ min-width:0; }
.fq2-carlbl{ text-align:center; font-weight:700; font-size:.95rem; margin-top:4px; transition:color .4s; }
.fq2-hd{ text-align:center; font-weight:600; font-size:.92rem; margin:0 0 4px; color:var(--ink); }
.fq2-spec{ text-align:center; font-size:.9rem; color:var(--graphite); margin:0 0 10px; }
.fq2-cases{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:6px; }
.fq2-cases span{ font:500 .82rem var(--mono); padding:3px 8px; border-radius:6px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.fq2-cases span.on{ border-color:var(--k-qa); box-shadow:0 0 0 1px var(--k-qa); }
.fq2-two{ display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 270px), 1fr)); gap:10px; align-items:start; } .fq2-two > div{ min-width:0; }
.fq2-two .lbl{ text-align:center; font-size:.85rem; color:var(--graphite); margin-top:2px; }
.fq2-paint{ max-width:460px; margin:0 auto; border:1px solid #808080; background:#d4d0c8; color:#000; font:13px/1.3 Tahoma, Verdana, sans-serif; user-select:none; -webkit-user-select:none; }
.fq2-paint .tt{ background:linear-gradient(90deg, #0a246a, #3a6ea5); color:#fff; font-weight:700; padding:3px 6px; }
.fq2-paint .mn{ padding:2px 6px; display:flex; gap:10px; }
.fq2-paint .bd{ display:grid; grid-template-columns:auto 1fr; gap:4px; padding:4px; }
.fq2-paint .tools{ display:grid; gap:3px; align-content:start; }
.fq2-paint .tools button{ width:30px; height:30px; padding:0; border:1px solid; border-color:#fff #404040 #404040 #fff; background:#d4d0c8; cursor:pointer; display:grid; place-items:center; }
.fq2-paint .tools button.sel{ border-color:#404040 #fff #fff #404040; background:#e8e6e0; }
.fq2-paint canvas{ width:100%; height:auto; display:block; background:#fff; border:1px solid #808080; touch-action:none; cursor:crosshair; }
.fq2-paint .cl{ display:flex; gap:6px; align-items:center; padding:2px 6px 4px; }
.fq2-paint .cl .fb{ position:relative; width:24px; height:22px; } .fq2-paint .cl .fb i{ position:absolute; width:12px; height:12px; border:1px solid #808080; }
.fq2-paint .cl .pal{ display:grid; grid-template-columns:repeat(8, 12px); gap:1px; } .fq2-paint .cl .pal i{ width:12px; height:10px; border:1px solid #808080; }
.fq2-paint .st{ border-top:1px solid #808080; padding:2px 6px; font-size:12px; }
.fq2 ul.fq2-vars{ display:block; max-width:460px; margin:10px auto 0; padding:0; gap:0; list-style:none; font-size:.86rem; line-height:1.4; color:var(--ink); }
.fq2 .fq2-vars li{ display:flex; gap:8px; padding:2px 0; list-style:none; background:none; } .fq2 .fq2-vars li::marker{ content:none; } .fq2 .fq2-vars li::before{ content:none; display:none; }
.fq2 .fq2-vars .mk{ width:1.1em; flex:none; text-align:center; font-weight:700; background:none; } .fq2 .fq2-vars li.y .mk{ color:var(--ok); } .fq2 .fq2-vars li.n .mk{ color:var(--pen); } .fq2 .fq2-vars li.n{ color:var(--graphite); }
.fq2-vars .sum{ font-weight:600; margin-top:4px; }
.fq2-mp{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:8px; }
.fq2-mp .fig-btn{ font-weight:600; }
.fq2-log{ font:500 .84rem/1.45 var(--mono); color:var(--ink); text-align:center; margin-top:8px; word-break:break-word; }
.fq2-cov{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; font-size:.86rem; color:var(--graphite); margin-top:6px; } .fq2-cov b{ color:var(--ink); }
@media (prefers-reduced-motion: reduce){ .fq2 .fq2-bob, .fq2 .fq2-shake, .fq2 .fq2-puff{ animation:none; } .fq2 .fq2-walk, .fq2 .fq2-fade{ transition:none; } }`;
  if (!document.getElementById('fq2-css')) { const s = document.createElement('style'); s.id = 'fq2-css'; s.textContent = CSS; document.head.appendChild(s); }
  const moving = () => calm() ? '' : 'flow';

  /* ── L2 slide 6: black-box (functional) testing ── */
  function BlackBox({ ar }) {
    const steps = [
      { en: 'The tester gives the software an <b>Input</b>.', ar: 'الـ tester بيدّي الـ software <b>Input</b>.' },
      { en: 'The <b>Software</b> is a closed box: black-box testing <b>focuses on functionality without knowing the internal logic</b>.', ar: 'الـ <b>Software</b> صندوق مقفول: الـ black-box testing <b>بيركز على الـ functionality من غير ما يعرف الـ internal logic</b>.' },
      { en: 'Out comes the <b>output</b>. The tester <b>analyzes inputs and expected outputs</b>.', ar: 'بيطلع الـ <b>output</b>. الـ tester <b>بيحلل الـ inputs والـ expected outputs</b>.' },
      { en: 'It <b>ensures the software meets requirements</b>. Black-box (functional) testing is also called <b>behavioral testing</b>.', ar: 'بيتأكد إن <b>الـ software ماشي على الـ requirements</b>. الـ black-box (functional) testing اسمه كمان <b>behavioral testing</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    return html`<figure className="fig fq2"><div className="fig-stage">
      <svg viewBox="0 0 360 240" style=${{ maxWidth: '380px' }} role="img" aria-label="Input arrow into a closed box labelled Software, output arrow out of it">
        <defs><marker id="fq2-bb-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker></defs>
        <g className=${pop(i >= 0)}>
          <path d="M160 6 V62" stroke="var(--ink)" strokeWidth="7" markerEnd="url(#fq2-bb-ah)" />
          <path d="M160 6 V56" stroke="var(--k-qa)" strokeWidth="3" fill="none" className=${moving()} />
          <text x="178" y="38" fontSize="17" fontWeight="700" className="fq2-k">Input</text></g>
        <g className=${'fq2-fade'} style=${{ opacity: i >= 1 ? 1 : .35 }}>
          <path d="M90 92 L114 72 L264 72 L240 92 Z" fill="#9aa1a9" stroke="#2b2f36" strokeWidth="1.5" />
          <path d="M240 92 L264 72 L264 138 L240 158 Z" fill="#5e646c" stroke="#2b2f36" strokeWidth="1.5" />
          <rect x="90" y="92" width="150" height="66" fill="#7d838b" stroke="#2b2f36" strokeWidth="1.5" />
          <text x="165" y="131" textAnchor="middle" fontSize="18" fontWeight="700" className="fq2-w">Software</text></g>
        <g className=${pop(i >= 2)}>
          <path d="M160 166 V226" stroke="var(--ink)" strokeWidth="7" markerEnd="url(#fq2-bb-ah)" />
          <path d="M160 166 V220" stroke="var(--k-qa)" strokeWidth="3" fill="none" className=${moving()} />
          <text x="178" y="200" fontSize="17" fontWeight="700" className="fq2-k">output</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 12–13: dynamic black-box testing ── */
  const CALC = [['0+0', '0'], ['0+1', '1'], ['254+1', '255'], ['255+1', '256'], ['256+1', '257']];
  function DynamicBB({ ar }) {
    const steps = [
      { en: '<b>Dynamic black-box testing</b>: testing software <b>without knowing details of inside code</b> and <b>while the program is running</b> (customer view). You <b>should</b> have the software’s documents or specifications.', ar: '<b>الـ Dynamic black-box testing</b>: بنختبر الـ software <b>من غير ما نعرف تفاصيل الـ code اللي جوه</b> و<b>والبرنامج شغال</b> (من وجهة نظر العميل). <b>لازم</b> يبقى معاك الـ documents أو الـ specifications بتاعة الـ software.' },
      { en: 'You only see what goes in and what comes out: this is <b>Exploratory Testing</b>, also called <b>behavioral testing</b>.', ar: 'انت شايف بس اللي داخل واللي طالع: ده <b>Exploratory Testing</b>، واسمه كمان <b>behavioral testing</b>.' },
      { en: 'Steps to begin DBB testing: (1) have the documents or specifications, (2) define test cases. Example: the addition function of the Windows Calculator. Tap a test case.', ar: 'خطوات البداية في الـ DBB testing: (1) يبقى معاك الـ documents أو الـ specifications، (2) تحدد الـ test cases. مثال: عملية الجمع في الـ Windows Calculator. دوس على test case.' },
      { en: 'Start with <b>test-to-pass</b> (confirm it works normally with standard input), then <b>test-to-fail</b> (push it to its limits with extreme inputs).', ar: 'ابدأ بـ <b>test-to-pass</b> (اتأكد إنه شغال عادي بـ standard input)، وبعدين <b>test-to-fail</b> (اضغط عليه لحد أقصى حدوده بـ extreme inputs).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3400);
    const [k, setK] = useState(2);
    useEffect(() => { if (i < 2 || calm()) return; const t = setInterval(() => setK(x => (x + 1) % CALC.length), 1600); return () => clearInterval(t); }, [i]);
    const c = CALC[k];
    return html`<figure className="fig fq2"><div className="fig-stage">
      <svg viewBox="0 0 330 208" style=${{ maxWidth: '440px' }} role="img" aria-label="Inputs into a dark box marked with a question mark labelled Software, then Outputs; a callout says Exploratory Testing; caption behavioral testing">
        <defs><marker id="fq2-dbb-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker></defs>
        <g className=${pop(i >= 1)}>
          <polygon points="204,44 228,56 58,110" fill="color-mix(in srgb, var(--k-qa) 22%, var(--paper))" stroke="var(--graphite)" strokeWidth="1" />
          <rect x="194" y="2" width="134" height="54" fill="color-mix(in srgb, var(--k-qa) 22%, var(--paper))" stroke="var(--graphite)" strokeWidth="1" />
          <text x="261" y="24" textAnchor="middle" fontSize="15" fontWeight="700">Exploratory</text>
          <text x="261" y="45" textAnchor="middle" fontSize="15" fontWeight="700">Testing</text></g>
        <text x="2" y="124" fontSize="15" fontWeight="700">Inputs</text>
        <path d="M54 119 H100" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#fq2-dbb-ah)" />
        <path d="M54 119 H96" stroke="var(--k-qa)" strokeWidth="3" fill="none" className=${moving()} />
        <rect x="104" y="86" width="118" height="66" fill="#0f2f57" />
        <text x="163" y="132" textAnchor="middle" fontSize="36" className="fq2-w">?</text>
        <path d="M222 119 H266" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#fq2-dbb-ah)" />
        <path d="M222 119 H262" stroke="var(--k-qa)" strokeWidth="3" fill="none" className=${moving()} />
        <text x="270" y="124" fontSize="14.5" fontWeight="700">Outputs</text>
        <text x="163" y="172" textAnchor="middle" fontSize="15" fontWeight="700">Software</text>
        <text x="163" y="199" textAnchor="middle" fontSize="18" fontWeight="700" fontStyle="italic" className=${'fq2-k ' + pop(i >= 1)}>behavioral testing</text>
        <g className=${pop(i >= 2)}>
          <text x="78" y="142" textAnchor="middle" fontSize="14.5" fontWeight="700" fontFamily="var(--mono)" className="fq2-k">${c[0]}</text>
          <text x="244" y="142" textAnchor="middle" fontSize="14.5" fontWeight="700" fontFamily="var(--mono)" className="fq2-k">${c[1]}</text></g>
      </svg>
      ${i >= 2 && html`<div className="fq2-cases" role="group" aria-label="Calculator test cases">${CALC.map(([a, b], j) => html`<span key=${j} className=${j === k ? 'on' : ''} onClick=${() => setK(j)}>${a} should equal ${b}</span>`)}</div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 14–15: test-to-pass vs test-to-fail (the car example) ── */
  function Car({ x, broken, on }) {
    const body = 'M8 58 Q8 46 30 42 L64 38 L80 18 L88 20 L80 38 L118 36 Q140 26 160 34 Q172 40 170 54 L168 64 Q164 70 154 70 L22 70 Q8 70 8 58 Z';
    return html`<g transform=${`translate(${x},4)`} className="fq2-fade" style=${{ opacity: on ? 1 : .3 }}>
      <g className=${calm() ? '' : broken ? 'fq2-shake' : 'fq2-bob'}>
        ${broken && html`<g>${[[184, 40, 9], [200, 30, 12], [214, 44, 10]].map(([cx, cy, r], j) => html`<circle key=${j} cx=${cx} cy=${cy} r=${r} fill="var(--graphite)" className=${calm() ? '' : 'fq2-puff'} style=${{ animationDelay: j * .35 + 's' }} />`)}
          <path d="M176 22 H214 M180 58 H212" stroke="var(--graphite)" strokeWidth="2" /></g>`}
        <circle cx="108" cy="22" r="9" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M100 30 L96 40 M116 30 L120 40" stroke="var(--ink)" strokeWidth="2" />
        ${!broken && html`<path d="M100 30 L88 6" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />`}
        <path d=${body} fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M30 52 H60 M120 50 H150" stroke="var(--graphite)" strokeWidth="2" />
        ${broken && html`<path d="M24 46 L32 52 L26 56 L34 62 L28 68" stroke="var(--ink)" strokeWidth="2" fill="none" /><path d="M78 26 l4 4 m0 -6 l-4 10 m-2 -6 l8 2" stroke="var(--pen)" strokeWidth="2" />`}
        <circle cx="42" cy="70" r="14" fill="var(--ink)" /><circle cx="42" cy="70" r="5" fill="var(--paper)" />
        <circle cx="140" cy="70" r="14" fill="var(--ink)" /><circle cx="140" cy="70" r="5" fill="var(--paper)" />
      </g></g>`;
  }
  function PassFail({ ar }) {
    const steps = [
      { en: 'Car example: <b>use test-to-pass to reveal bugs before you test-to-fail</b>.', ar: 'مثال العربية: <b>استخدم test-to-pass عشان تطلّع الـ bugs قبل ما تعمل test-to-fail</b>.' },
      { en: '<b>Test-to-pass</b>: assure that the software minimally works (<i>kindness dealing</i>). Test in normal cases, using boundaries, sub-boundaries and default data, like driving the car normally first.', ar: '<b>الـ Test-to-pass</b>: نتأكد إن الـ software شغال على الأقل (<i>kindness dealing</i>). نختبر في الحالات العادية، بالـ boundaries والـ sub-boundaries والـ default data، زي ما تسوق العربية عادي الأول.' },
      { en: '<b>Test-to-fail</b>: try to find weaknesses in the software by using abnormal cases (<b>forcing an error</b>), like crash-testing the car.', ar: '<b>الـ Test-to-fail</b>: بنحاول نلاقي نقط الضعف في الـ software بحالات مش طبيعية (<b>بنجبره يطلع error</b>)، زي الـ crash-test للعربية.' },
      { en: 'Note: don’t be surprised if you find bugs even in test-to-pass.', ar: 'ملحوظة: متتفاجئش لو لقيت bugs حتى في الـ test-to-pass.' },
      { en: 'Error message: saving a file to a disk with none inserted. The specification says it should show an error, so it looks like test-to-pass; but you are also forcing an error, so it could be test-to-fail. In the end, it’s probably <b>both</b>.', ar: 'الـ Error message: تحفظ file على disk ومفيش disk في الـ drive. الـ specification بتقول لازم يطلع error، فشكلها test-to-pass؛ بس انت كمان بتجبره يطلع error، فممكن تبقى test-to-fail. في الآخر، غالباً هي <b>الاتنين</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    return html`<figure className="fig fq2"><div className="fig-stage">
      <p className="fq2-hd">Use test-to-pass to reveal bugs before you test-to-fail.</p>
      <div className="fq2-cars">
        <div><svg viewBox="0 0 226 92" role="img" aria-label="A car driven normally, the driver waving"><${Car} x=${4} broken=${false} on=${i !== 2} /></svg>
          <div className="fq2-carlbl" style=${{ color: i === 1 ? 'var(--k-qa)' : 'var(--ink)' }}>Test-to-pass</div></div>
        <div><svg viewBox="0 0 226 92" role="img" aria-label="A dented car with a cracked windscreen speeding off with smoke"><${Car} x=${0} broken=${true} on=${i !== 1} /></svg>
          <div className="fq2-carlbl" style=${{ color: i === 2 ? 'var(--pen)' : 'var(--ink)' }}>Test-to-fail</div></div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 19–21: equivalence partitions and boundary values, try it ── */
  const D1 = 94, D2 = 206;
  const EPB = [
    { key: 'n', title: 'Number of input values', titleAr: 'عدد الـ input values', lo: 4, hi: 10, parts: ['Less than 4', 'Between 4 and 10', 'More than 10'], parts2: [['Less than', '4'], ['Between 4', 'and 10'], ['More than', '10']], picks: [3, 4, 7, 10, 11] },
    { key: 'v', title: 'Input values', titleAr: 'الـ input values', lo: 10000, hi: 99999, parts: ['Less than 10000', 'Between 10000 and 99999', 'More than 99999'], parts2: [['Less than', '10000'], ['Between 10000', 'and 99999'], ['More than', '99999']], picks: [9999, 10000, 50000, 99999, 100000] }
  ];
  const epX = (b, v) => v === b.lo - 1 ? D1 - 7 : v === b.lo ? D1 + 7 : v === b.hi ? D2 - 7 : v === b.hi + 1 ? D2 + 7 : v < b.lo ? 47 : v > b.hi ? 253 : (b.key === 'v' && v === 50000) || (b.key === 'n' && v === 7) ? 150 : D1 + 14 + (v - b.lo) / (b.hi - b.lo) * (D2 - D1 - 28);
  function epSay(b, v) {
    const part = v < b.lo ? 0 : v > b.hi ? 2 : 1, valid = part === 1, P = b.parts[part];
    let en, a;
    if (v === b.lo - 1) { en = 'the invalid value just outside the left boundary' + (b.key === 'v' ? ' (marked <b>BV</b> on the slide; the notes call 09999 the invalid left boundary)' : ''); a = 'الـ invalid value اللي بره الـ boundary الشمال على طول' + (b.key === 'v' ? ' (مكتوب عليها <b>BV</b> في الـ slide؛ والـ notes بتسمي 09999 الـ invalid left boundary)' : ''); }
    else if (v === b.lo) { en = 'the valid value at the left boundary'; a = 'الـ valid value اللي على الـ boundary الشمال'; }
    else if (v === b.hi) { en = 'the valid value at the right boundary'; a = 'الـ valid value اللي على الـ boundary اليمين'; }
    else if (v === b.hi + 1) { en = 'the invalid value just outside the right boundary' + (b.key === 'v' ? ' (marked <b>BV</b> on the slide)' : ''); a = 'الـ invalid value اللي بره الـ boundary اليمين على طول' + (b.key === 'v' ? ' (مكتوب عليها <b>BV</b> في الـ slide)' : ''); }
    else if (b.key === 'v' && v === 50000) { en = 'the <b>Mid-point</b> of the valid partition'; a = 'الـ <b>Mid-point</b> بتاعة الـ valid partition'; }
    else if (b.key === 'v' && v === 0) { en = '00000 is the notes’ <b>invalid special value</b>, not a boundary value'; a = 'الـ 00000 هي الـ <b>invalid special value</b> في الـ notes، مش boundary value'; }
    else if (b.key === 'n' && v === 7) { en = 'a value from inside the valid partition, not a boundary value'; a = 'قيمة من جوه الـ valid partition، مش boundary value'; }
    else { en = 'not a boundary value: every value in this partition tests the same thing, so one test from it is enough'; a = 'مش boundary value: كل القيم اللي في الـ partition دي بتختبر نفس الحاجة، فـ test واحد منها كفاية'; }
    return { en: `<b>${v}</b> (${b.title.toLowerCase()}) is in <b>${P}</b>, an <b>${valid ? 'valid' : 'invalid'}</b> partition: ${en}.`.replace('an <b>valid', 'a <b>valid'), ar: `<b>${v}</b> (${b.titleAr}) في <b>${P}</b>، وده <b>${valid ? 'valid' : 'invalid'}</b> partition: ${a}.` };
  }
  function EpBar({ b, sel, onPick }) {
    const v = sel && sel.b === b.key ? sel.v : null;
    const part = v == null ? -1 : v < b.lo ? 0 : v > b.hi ? 2 : 1;
    const [txt, setTxt] = useState('');
    const isV = b.key === 'v', P = b.picks;
    const fills = [[2, D1], [D1, D2], [D2, 298]];
    const arrow = (val, top, j) => { const x = epX(b, val), hit = v === val; return html`<path key=${'a' + j} d=${`M${x} ${top} V104`} stroke=${hit ? 'var(--k-qa)' : 'var(--ink)'} strokeWidth=${hit ? 3 : 1.3} markerEnd=${`url(#fq2-ep-ah${hit ? 'k' : ''})`} />`; };
    const lbl = (val, x, y, anchor) => html`<text x=${x} y=${y} textAnchor=${anchor} fontSize="13" fontWeight=${v === val ? 700 : 400} className=${v === val ? 'fq2-k' : ''} style=${{ cursor: 'pointer' }} onClick=${() => onPick(b.key, val)}>${val}</text>`;
    const red = (x, y, anchor, t) => html`<text x=${x} y=${y} textAnchor=${anchor} fontSize="13" className="fq2-red">${t}</text>`;
    const free = v != null && !P.includes(v), fx = free ? epX(b, v) : 0;
    const submit = e => { e.preventDefault(); const n = Number(txt); if (txt.trim() !== '' && Number.isInteger(n)) onPick(b.key, n); };
    return html`<div className="fq2-blk">
      <svg viewBox="0 0 300 174" style=${{ maxWidth: '440px' }} role="img" aria-label=${b.title + ': ' + b.parts.join(', ') + '; test values ' + P.join(', ')}>
        <defs><marker id="fq2-ep-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 L3 5 z" fill="var(--ink)" /></marker>
          <marker id="fq2-ep-ahk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 L3 5 z" fill="var(--k-qa)" /></marker></defs>
        ${red(150, 13, 'middle', 'Valid')}
        <path d=${`M${D1 + 7} 20 H${D2 - 7}`} stroke="var(--pen)" strokeWidth="3" />
        ${lbl(P[0], D1 - 3, 36, 'end')}${lbl(P[4], D2 + 3, 36, 'start')}
        ${lbl(P[1], D1 + 3, 56, 'start')}${lbl(P[3], D2 - 3, 56, 'end')}${lbl(P[2], 150, 74, 'middle')}
        ${isV ? html`${red(D1 - 11, 56, 'end', 'BV')}${red(D2 + 11, 56, 'start', 'BV')}${red(150, 90, 'middle', 'Mid-point')}` : null}
        ${red(40, 74, 'middle', 'Invalid')}${red(260, 74, 'middle', 'Invalid')}
        ${arrow(P[0], 41, 0)}${arrow(P[4], 41, 4)}${arrow(P[1], 61, 1)}${arrow(P[2], isV ? 95 : 79, 2)}${arrow(P[3], 61, 3)}
        <rect x="8" y="110" width="292" height="40" fill="var(--line)" />
        ${fills.map(([x0, x1], j) => html`<rect key=${j} x=${x0} y="104" width=${x1 - x0} height="40" fill=${part === j ? (j === 1 ? 'color-mix(in srgb, var(--ok) 30%, var(--paper))' : 'color-mix(in srgb, var(--pen) 26%, var(--paper))') : 'color-mix(in srgb, var(--k-qa) 8%, var(--paper))'} stroke="var(--ink)" strokeWidth="1.4" />`)}
        ${b.parts2.map((t, j) => html`<text key=${j} x=${(fills[j][0] + fills[j][1]) / 2} y="121" textAnchor="middle" fontSize="13" fontWeight=${part === j ? 700 : 400}><tspan x=${(fills[j][0] + fills[j][1]) / 2}>${t[0]}</tspan><tspan x=${(fills[j][0] + fills[j][1]) / 2} dy="15">${t[1]}</tspan></text>`)}
        ${free && html`<g><path d=${`M${fx} 148 l-6 9 h12 z`} fill="var(--k-qa)" /><text x=${Math.min(270, Math.max(30, fx))} y="171" textAnchor="middle" fontSize="13" fontWeight="700" className="fq2-k">${v}</text></g>`}
      </svg>
      <p className="fq2-bt">${b.title}</p>
      <div className="fq2-chips">${P.map(val => html`<button key=${val} className=${'fq2-chip' + (v === val ? ' on' : '')} onClick=${() => onPick(b.key, val)}>${val}</button>`)}
        <form onSubmit=${submit} style=${{ display: 'flex', gap: '6px' }}><input className="fq2-in" type="number" step="1" inputMode="numeric" placeholder="any value" aria-label=${'Type a value for ' + b.title} value=${txt} onInput=${e => setTxt(e.target.value)} /><button className="fig-btn" type="submit">Check</button></form></div></div>`;
  }
  function EpTry({ ar }) {
    const [sel, setSel] = useState(null);
    const pick = (b, v) => setSel({ b, v });
    const intro = { en: '<b>Try it:</b> pick or type a value on either bar to see its partition (valid or invalid) and whether it is a boundary value.', ar: '<b>جرّب:</b> اختار أو اكتب قيمة على أي bar عشان تشوف هي في أنهي partition (valid ولا invalid) وهل هي boundary value.' };
    const m = sel ? epSay(EPB.find(b => b.key === sel.b), sel.v) : intro;
    return html`<figure className="fig fq2"><div className="fig-stage">
      <p className="fq2-spec">Program spec: accepts <b>4 to 10 inputs</b>, each a <b>5-digit integer ≥ 10,000</b>.</p>
      ${EPB.map(b => html`<${EpBar} key=${b.key} b=${b} sel=${sel} onPick=${pick} />`)}</div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="muted small">Test one value from each partition, plus the values at and just outside each boundary.</span><span className="grow"></span>${sel && html`<button className="fig-btn" onClick=${() => setSel(null)}>↻ Clear</button>`}</div></figure>`;
  }

  /* ── L2 slide 24: a software boundary is like the edge of a cliff ── */
  function Cliff({ ar }) {
    const steps = [
      { en: '<b>Boundary conditions</b>: situations at the <b>edge of the planned operational limitations</b> of the software.', ar: '<b>الـ Boundary conditions</b>: المواقف اللي على <b>حافة الحدود المخططة لتشغيل</b> الـ software.' },
      { en: 'Programming is <b>susceptible to problems at its edges</b>. Figure 5.5: a software boundary is much like the edge of a cliff.', ar: 'البرمجة <b>معرضة للمشاكل عند الحواف بتاعتها</b>. Figure 5.5: الـ boundary بتاعة الـ software شبه حافة الجرف بالظبط.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    return html`<figure className="fig fq2"><div className="fig-stage">
      <p className=${'fq2-hd ' + pop(i >= 1)}>A software boundary is much like the edge of a cliff.</p>
      <svg viewBox="0 30 400 190" style=${{ maxWidth: '440px' }} role="img" aria-label="A person walking a dog towards the edge of a cliff">
        <path d="M0 132 H262 Q272 134 270 146 L262 220 H0 Z" fill="color-mix(in srgb, var(--graphite) 30%, var(--paper))" stroke="var(--ink)" strokeWidth="2" />
        <path d="M228 150 L222 220 M246 146 L242 220 M200 160 L196 220" stroke="var(--graphite)" strokeWidth="1.5" />
        <g className="fq2-walk" style=${{ transform: `translateX(${i >= 1 ? 180 : 0}px)` }}>
          <circle cx="60" cy="58" r="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M60 68 V100 M60 100 L50 131 M60 100 L70 131 M60 76 L46 92 M60 76 L74 88" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M46 92 Q36 106 30 114" stroke="var(--graphite)" strokeWidth="1.5" fill="none" />
          <ellipse cx="22" cy="118" rx="12" ry="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" /><circle cx="34" cy="112" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          <path d="M14 122 L12 131 M28 122 L30 131 M10 116 L4 110" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" /></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 28–29 and 33: Paint's pencil state, airbrush state and startup state, try it ── */
  const PencilIco = html`<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 15 L5 10 L13 2 L16 5 L8 13 Z" fill="#f0c040" stroke="#000" /><path d="M3 15 L5 10 L8 13 Z" fill="#000" /></svg>`;
  const AirIco = html`<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><rect x="7" y="6" width="7" height="11" rx="1.5" fill="#3050c0" stroke="#000" /><rect x="9" y="3" width="3" height="3" fill="#000" />${[[4, 2], [2, 5], [5, 5], [3, 8], [1, 2]].map(([x, y], j) => html`<circle key=${j} cx=${x} cy=${y} r=".9" fill="#000" />`)}</svg>`;
  function PaintStates({ ar }) {
    const [tool, setTool] = useState('pencil'), [drawn, setDrawn] = useState(false);
    const cv = useRef(null), last = useRef(null), spray = useRef(null);
    const ctx = () => cv.current.getContext('2d');
    const pt = e => { const r = cv.current.getBoundingClientRect(); return [(e.clientX - r.left) * cv.current.width / r.width, (e.clientY - r.top) * cv.current.height / r.height]; };
    const dots = ([x, y]) => { const c = ctx(); c.fillStyle = '#000'; for (let k = 0; k < 14; k++) { const a = Math.random() * 6.283, d = Math.random() * 9; c.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d, 1, 1); } };
    const down = e => { e.preventDefault(); cv.current.setPointerCapture(e.pointerId); const p = pt(e); last.current = p; setDrawn(true);
      if (tool === 'air') { dots(p); clearInterval(spray.current); spray.current = setInterval(() => last.current && dots(last.current), 40); } else { const c = ctx(); c.fillStyle = '#000'; c.fillRect(p[0], p[1], 1, 1); } };
    const move = e => { if (!last.current) return; const p = pt(e);
      if (tool === 'air') dots(p); else { const c = ctx(); c.strokeStyle = '#000'; c.lineWidth = 1; c.beginPath(); c.moveTo(last.current[0], last.current[1]); c.lineTo(p[0], p[1]); c.stroke(); }
      last.current = p; };
    const up = () => { last.current = null; clearInterval(spray.current); };
    useEffect(() => () => clearInterval(spray.current), []);
    const startup = () => { const c = ctx(); c.clearRect(0, 0, cv.current.width, cv.current.height); setTool('pencil'); setDrawn(false); };
    const isStart = !drawn && tool === 'pencil';
    const V = [
      ['The window looks as shown in the figure (Figure 5.11).', isStart], ['The window size is set to what it was the last time Paint was used.', true], ['The drawing area is blank.', !drawn],
      ['The tool box, color box, and status bar are displayed.', true], ['The pencil tool is selected. All the others are not.', tool === 'pencil'], ['The default colors are black foreground on a white background.', true], ['The document name is untitled.', true]];
    const cap = tool === 'pencil'
      ? { en: '<b>Pencil state</b>: drag on the drawing area and the mouse draws a thin line. Now pick the <b>airbrush</b> and drag again. A <b>software state</b> is the condition or mode the software is currently in.', ar: '<b>الـ Pencil state</b>: اسحب على مساحة الرسم والماوس هيرسم خط رفيع. دلوقتي اختار الـ <b>airbrush</b> واسحب تاني. الـ <b>software state</b> هي الحالة أو الـ mode اللي الـ software فيه دلوقتي.' }
      : { en: '<b>Airbrush state</b>: the same drag now sprays dots. The same input gives a different output in a different state, so a tester must test a program’s states and the transitions between them.', ar: '<b>الـ Airbrush state</b>: نفس السحبة دلوقتي بترش نقط. نفس الـ input بيطلع output مختلف في state مختلفة، عشان كده الـ tester لازم يختبر الـ states بتاعة البرنامج والـ transitions بينها.' };
    const capS = isStart ? { en: ' Paint is in its <b>startup state</b>: every state variable above has its startup value.', ar: ' الـ Paint في الـ <b>startup state</b> بتاعته: كل الـ state variables اللي فوق على قيمة البداية بتاعتها.' } : { en: ' Paint has left its <b>startup state</b> (see the state variables above). Press <b>Startup state</b> to go back.', ar: ' الـ Paint خرج من الـ <b>startup state</b> (بص على الـ state variables اللي فوق). دوس <b>Startup state</b> عشان ترجع.' };
    const PAL = ['#000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#fff', '#c0c0c0', '#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f'];
    return html`<figure className="fig fq2"><div className="fig-stage">
      <div className="fq2-paint">
        <div className="tt">untitled - Paint</div>
        <div className="mn"><span>File</span><span>Edit</span><span>View</span><span>Image</span><span>Colors</span><span>Help</span></div>
        <div className="bd"><div className="tools" role="group" aria-label="Tools">
            <button className=${tool === 'pencil' ? 'sel' : ''} onClick=${() => setTool('pencil')} aria-label="Pencil" aria-pressed=${tool === 'pencil'} title="Pencil">${PencilIco}</button>
            <button className=${tool === 'air' ? 'sel' : ''} onClick=${() => setTool('air')} aria-label="Airbrush" aria-pressed=${tool === 'air'} title="Airbrush">${AirIco}</button></div>
          <canvas ref=${cv} width="400" height="210" aria-label="Drawing area" onPointerDown=${down} onPointerMove=${move} onPointerUp=${up} onPointerCancel=${up}></canvas></div>
        <div className="cl"><div className="fb"><i style=${{ left: '7px', top: '7px', background: '#fff' }}></i><i style=${{ left: 0, top: 0, background: '#000' }}></i></div>
          <div className="pal">${PAL.map((c, j) => html`<i key=${j} style=${{ background: c }}></i>`)}</div></div>
        <div className="st">For Help, click Help Topics on the Help Menu.</div></div>
      <ul className="fq2-vars" aria-label="State variables of Paint's startup state">
        <li style=${{ fontWeight: 600 }}>Paint’s startup state (partial list of state variables):</li>
        ${V.map(([t, ok], j) => html`<li key=${j} className=${ok ? 'y' : 'n'}><span className="mk" aria-label=${ok ? 'yes' : 'no'}>${ok ? '✓' : '✗'}</span><span>${t}</span></li>`)}
        <li className=${'sum ' + (isStart ? 'y' : 'n')}><span className="mk">${isStart ? '✓' : '✗'}</span><span>${isStart ? 'In the startup state' : 'Not in the startup state'}</span></li></ul></div>
      <${Cap} en=${cap.en + capS.en} ar=${cap.ar + capS.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${startup}>↻ Startup state</button></div></figure>`;
  }

  /* ── L2 slides 30–31: Figure 5.10, one password state diagram drawn two ways ── */
  function PasswordStates({ ar }) {
    const steps = [
      { en: 'Both drawings start in <b>Idle</b> (in the circles style, the double circle).', ar: 'الرسمتين بيبدأوا من <b>Idle</b> (في رسمة الدواير، الدايرة المزدوجة).' },
      { en: 'Input <b>Esc Key Pressed</b> moves to <b>Waiting for password</b>. In the boxes style the output is written under the line: <b>Display Password Box</b>.', ar: 'الـ input <b>Esc Key Pressed</b> بيودّي على <b>Waiting for password</b>. في رسمة البوكسات الـ output مكتوب تحت الخط: <b>Display Password Box</b>.' },
      { en: '<b>Incorrect Password</b> loops back to the same state; the output is <b>Clear the field</b>.', ar: '<b>Incorrect Password</b> بيرجع لنفس الـ state؛ والـ output هو <b>Clear the field</b>.' },
      { en: '<b>Correct Password</b> leaves the state; the output is <b>Initiate Destruct</b>.', ar: '<b>Correct Password</b> بيخرج من الـ state؛ والـ output هو <b>Initiate Destruct</b>.' },
      { en: 'State transition diagrams can be drawn using different techniques (boxes, arrows, circles), as long as the team accepts them. Remember: create your map from the <b>user’s view</b> of the software.', ar: 'الـ State transition diagrams ممكن تترسم بطرق مختلفة (boxes و arrows و circles)، طالما الـ team موافق عليها. افتكر: اعمل الـ map بتاعتك من <b>وجهة نظر الـ user</b> للـ software.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const st = i === 0 ? 'idle' : i === 1 || i === 2 ? 'wait' : null, tr = [null, 'esc', 'bad', 'ok', null][i];
    const fillS = s => st === s ? 'color-mix(in srgb, var(--k-qa) 24%, var(--paper))' : 'var(--paper)';
    const strokeT = t => tr === t ? 'var(--k-qa)' : 'var(--ink)', wT = t => tr === t ? 3 : 1.6, mk = t => `url(#fq2-pw-ah${tr === t ? 'k' : ''})`, cl = t => tr === t ? 'fq2-k' : '';
    const fw = t => tr === t ? 700 : 400;
    const defs = html`<defs><marker id="fq2-pw-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker>
      <marker id="fq2-pw-ahk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--k-qa)" /></marker></defs>`;
    return html`<figure className="fig fq2"><div className="fig-stage"><div className="fq2-two">
      <div><svg viewBox="0 0 270 222" role="img" aria-label="Boxes and arrows: Idle, Esc Key Pressed over Display Password Box, to Waiting for password; Incorrect Password over Clear the field loops back; Correct Password over Initiate Destruct leaves">${defs}
        <rect x="8" y="6" width="94" height="38" fill=${fillS('idle')} stroke="var(--ink)" strokeWidth="2" /><text x="55" y="30" textAnchor="middle" fontSize="13">Idle</text>
        <path d="M55 44 V86" stroke=${strokeT('esc')} strokeWidth=${wT('esc')} markerEnd=${mk('esc')} />
        <text x="68" y="61" fontSize="12.5" fontWeight=${fw('esc')} className=${cl('esc')}>Esc Key Pressed</text><path d="M66 67 H236" stroke="var(--ink)" /><text x="68" y="82" fontSize="12.5" fontWeight=${fw('esc')} className=${cl('esc')}>Display Password Box</text>
        <rect x="8" y="90" width="94" height="46" fill=${fillS('wait')} stroke="var(--ink)" strokeWidth="2" /><text x="55" y="110" textAnchor="middle" fontSize="13">Waiting for</text><text x="55" y="127" textAnchor="middle" fontSize="13">password</text>
        <path d="M86 136 V154 H122 V104 H106" fill="none" stroke=${strokeT('bad')} strokeWidth=${wT('bad')} markerEnd=${mk('bad')} />
        <text x="132" y="113" fontSize="12.5" fontWeight=${fw('bad')} className=${cl('bad')}>Incorrect Password</text><path d="M130 119 H266" stroke="var(--ink)" /><text x="132" y="134" fontSize="12.5" fontWeight=${fw('bad')} className=${cl('bad')}>Clear the field</text>
        <path d="M30 136 V216" stroke=${strokeT('ok')} strokeWidth=${wT('ok')} markerEnd=${mk('ok')} />
        <text x="42" y="184" fontSize="12.5" fontWeight=${fw('ok')} className=${cl('ok')}>Correct Password</text><path d="M40 190 H166" stroke="var(--ink)" /><text x="42" y="205" fontSize="12.5" fontWeight=${fw('ok')} className=${cl('ok')}>Initiate Destruct</text>
      </svg><div className="lbl">boxes and arrows</div></div>
      <div><svg viewBox="0 0 280 226" role="img" aria-label="Circles: Idle (double circle), Esc Key Pressed to Wait for Password; Incorrect Password loops back; Correct Password leaves">${defs}
        <circle cx="38" cy="110" r="33" fill=${fillS('idle')} stroke="var(--ink)" strokeWidth="2" /><circle cx="38" cy="110" r="27" fill="none" stroke="var(--ink)" strokeWidth="2" /><text x="38" y="115" textAnchor="middle" fontSize="13">Idle</text>
        <path d="M62 86 Q90 62 116 82" fill="none" stroke=${strokeT('esc')} strokeWidth=${wT('esc')} markerEnd=${mk('esc')} />
        <text x="88" y="34" textAnchor="middle" fontSize="12.5" fontWeight=${fw('esc')} className=${cl('esc')}>Esc Key</text><text x="88" y="50" textAnchor="middle" fontSize="12.5" fontWeight=${fw('esc')} className=${cl('esc')}>Pressed</text>
        <circle cx="152" cy="110" r="40" fill=${fillS('wait')} stroke="var(--ink)" strokeWidth="2" /><text x="152" y="106" textAnchor="middle" fontSize="13">Wait for</text><text x="152" y="123" textAnchor="middle" fontSize="13">Password</text>
        <path d="M182 82 Q216 60 262 76" fill="none" stroke=${strokeT('ok')} strokeWidth=${wT('ok')} markerEnd=${mk('ok')} />
        <text x="226" y="34" textAnchor="middle" fontSize="12.5" fontWeight=${fw('ok')} className=${cl('ok')}>Correct</text><text x="226" y="50" textAnchor="middle" fontSize="12.5" fontWeight=${fw('ok')} className=${cl('ok')}>Password</text>
        <path d="M186 132 Q228 146 210 184 Q192 212 162 152" fill="none" stroke=${strokeT('bad')} strokeWidth=${wT('bad')} markerEnd=${mk('bad')} />
        <text x="220" y="196" fontSize="12.5" fontWeight=${fw('bad')} className=${cl('bad')}>Incorrect</text><text x="220" y="212" fontSize="12.5" fontWeight=${fw('bad')} className=${cl('bad')}>Password</text>
      </svg><div className="lbl">circles</div></div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slide 35: the media player state machine, try it ── */
  const MS = { OFF: [170, 54, ['OFF']], PLAY: [44, 190, ['PLAY']], FF: [296, 190, ['FAST', 'FORWARD']], FP: [170, 326, ['FAST', 'PLAY']] };
  const MNAME = { OFF: 'OFF', PLAY: 'PLAY', FF: 'FAST FORWARD', FP: 'FAST PLAY' };
  const BTN = { play: 'play', ff: 'fast forward', stop: 'stop' };
  // the slide's 8 transitions: [from, input, to, path, label x, label y, anchor]
  const MT = [
    ['OFF', 'play', 'PLAY', 'M128 46 Q52 52 34 164', 4, 28, 'start'],
    ['OFF', 'ff', 'FF', 'M212 46 Q288 52 306 164', 336, 28, 'end'],
    ['PLAY', 'stop', 'OFF', 'M58 164 Q88 100 126 66', 100, 122, 'start'],
    ['PLAY', 'ff', 'FP', 'M34 216 Q52 320 126 334', 2, 374, 'start'],
    ['FF', 'stop', 'OFF', 'M282 164 Q252 100 214 66', 240, 122, 'end'],
    ['FF', 'play', 'PLAY', 'M252 190 H90', 170, 180, 'middle'],
    ['FP', 'stop', 'PLAY', 'M126 314 Q88 288 58 218', 100, 266, 'start'],
    ['FP', 'ff', 'FF', 'M214 334 Q288 320 306 216', 338, 374, 'end']
  ];
  const DEMO = { states: ['play', 'ff', 'ff'], all: ['play', 'ff', 'ff', 'stop', 'new', 'ff', 'play', 'ff', 'stop', 'stop'] };
  function MediaPlayer({ ar }) {
    const fresh = () => ({ s: 'OFF', last: null, log: [['<Off>']], seen: ['OFF'], done: [], msg: null });
    const [g, setG] = useState(fresh), [queue, setQueue] = useState([]);
    const step = (g, a) => {
      if (a === 'new') return { ...g, s: 'OFF', last: null, log: g.log.concat([['<Off>']]), seen: g.seen, msg: { en: 'New test case: back to <b>OFF</b>.', ar: 'test case جديدة: رجعنا لـ <b>OFF</b>.' } };
      const k = MT.findIndex(t => t[0] === g.s && t[1] === a), log = g.log.slice(0, -1).concat([g.log[g.log.length - 1].concat(BTN[a])]);
      if (k < 0) return { ...g, last: null, log, msg: { en: `The diagram has no <b>${BTN[a]}</b> arrow out of <b>${MNAME[g.s]}</b>, so there is no transition to follow.`, ar: `الـ diagram مفيهوش سهم <b>${BTN[a]}</b> طالع من <b>${MNAME[g.s]}</b>، فمفيش transition نمشي فيها.` } };
      const to = MT[k][2];
      return { s: to, last: k, log, seen: g.seen.includes(to) ? g.seen : g.seen.concat(to), done: g.done.includes(k) ? g.done : g.done.concat(k),
        msg: { en: `<b>${MNAME[g.s]}</b> + <b>${BTN[a]}</b> → <b>${MNAME[to]}</b>.`, ar: `<b>${MNAME[g.s]}</b> + <b>${BTN[a]}</b> → <b>${MNAME[to]}</b>.` } };
    };
    const press = a => { setQueue([]); setG(x => step(x, a)); };
    const run = list => { const s0 = fresh(); if (calm()) { setQueue([]); setG(list.reduce(step, s0)); } else { setG(s0); setQueue(list); } };
    useEffect(() => { if (!queue.length) return; const t = setTimeout(() => { setG(x => step(x, queue[0])); setQueue(q => q.slice(1)); }, 1000); return () => clearTimeout(t); }, [queue]);
    const intro = { en: '<b>Try it:</b> the player starts in <b>OFF</b>. Press the buttons and follow the slide’s state transition diagram. Can you visit every state, then exercise all 8 transitions?', ar: '<b>جرّب:</b> الـ player بيبدأ من <b>OFF</b>. دوس على الزراير وامشي على الـ state transition diagram بتاع الـ slide. تقدر تزور كل الـ states، وبعدين تجرب الـ 8 transitions كلهم؟' };
    let m = g.msg || intro;
    if (g.seen.length === 4 && g.done.length < 8 && g.msg) m = { en: m.en + ' All 4 states visited. The slide does it in <b>1 test case</b>: &lt;Off&gt; play => fast forward => fast forward.', ar: m.ar + ' زرت الـ 4 states كلهم. الـ slide بتعملها في <b>test case واحدة</b>: &lt;Off&gt; play => fast forward => fast forward.' };
    if (g.done.length === 8 && g.msg) m = { en: m.en + ' All 8 transitions exercised. The slide does it with <b>2 test cases</b>.', ar: m.ar + ' جربت الـ 8 transitions كلهم. الـ slide بتعملها بـ <b>2 test cases</b>.' };
    const tc = g.log.filter(l => l.length > 1).length || 1;
    return html`<figure className="fig fq2"><div className="fig-stage">
      <svg viewBox="0 0 340 380" style=${{ maxWidth: '460px' }} role="img" aria-label=${'Media player state transition diagram; current state ' + MNAME[g.s]}>
        <defs><marker id="fq2-mp-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker>
          <marker id="fq2-mp-ahk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--k-qa)" /></marker></defs>
        ${MT.map(([f, a, t, d, lx, ly, an], k) => { const on = g.last === k, was = g.done.includes(k); return html`<g key=${k}>
          <path d=${d} fill="none" stroke=${on ? 'var(--k-qa)' : 'var(--ink)'} strokeWidth=${on ? 4 : 2} strokeOpacity=${on || was ? 1 : .7} markerEnd=${`url(#fq2-mp-ah${on ? 'k' : ''})`} />
          <text x=${lx} y=${ly} textAnchor=${an} fontSize="14.5" fontWeight=${on ? 700 : 600} className=${on ? 'fq2-k' : 'fq2-mut'}>${BTN[a]}${was ? ' ✓' : ''}</text></g>`; })}
        ${Object.entries(MS).map(([k, [x, y, L]]) => { const on = g.s === k; return html`<g key=${k}>
          <rect x=${x - 42} y=${y - 25} width="84" height="50" rx="10" fill=${on ? 'var(--s-qa)' : 'var(--paper)'} stroke=${on ? 'var(--s-qa)' : 'var(--ink)'} strokeWidth="2" />
          ${L.map((w, j) => html`<text key=${j} x=${x} y=${y + 5 + (j - (L.length - 1) / 2) * 17} textAnchor="middle" fontSize="14.5" fontWeight="700" className=${on ? 'fq2-w' : ''}>${w}</text>`)}</g>`; })}
      </svg>
      <div className="fq2-mp" role="group" aria-label="Media player buttons">
        <button className="fig-btn solid" onClick=${() => press('play')}>▶ play</button>
        <button className="fig-btn solid" onClick=${() => press('ff')}>⏩ fast forward</button>
        <button className="fig-btn solid" onClick=${() => press('stop')}>■ stop</button></div>
      <div className="fq2-log">${g.log.map((l, j) => html`<div key=${j}>Test case ${j + 1}: ${l[0]} ${l.slice(1).join(' => ')}</div>`)}</div>
      <div className="fq2-cov"><span>States visited: <b>${g.seen.length} / 4</b></span><span>Transitions exercised: <b>${g.done.length} / 8</b></span><span>Test cases: <b>${tc}</b></span></div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><button className="fig-btn" onClick=${() => press('new')} disabled=${g.log[g.log.length - 1].length < 2}>New test case</button>
        <button className="fig-btn" onClick=${() => run(DEMO.states)}>Slide: all states</button><button className="fig-btn" onClick=${() => run(DEMO.all)}>Slide: all transitions</button>
        <span className="grow"></span><button className="fig-btn" onClick=${() => { setQueue([]); setG(fresh()); }}>↻ Reset</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'qa-blackbox': BlackBox, 'qa-dynamic-bb': DynamicBB, 'qa-pass-fail': PassFail, 'qa-ep-boundary': EpTry, 'qa-cliff': Cliff, 'qa-paint-states': PaintStates, 'qa-password-states': PasswordStates, 'qa-media-player': MediaPlayer });
})();

/* ── part 3 ── */
// Software Quality Assurance visuals, part 3: Lecture 3 (white box) and Lecture 4 (cyclomatic complexity, triangle, stack).
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.fq3-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; max-width:560px; margin:10px auto 0; }
.fq3-chips span{ border:1px solid var(--line); background:var(--paper); border-radius:99px; padding:4px 10px; font-size:.86rem; color:var(--ink); }
.fq3-chips span b{ color:var(--k-qa); margin-right:4px; }
.fq3-code{ font:500 .86rem/1.55 var(--mono); background:var(--paper); color:var(--ink); border:1px solid var(--line); border-radius:8px; padding:8px 6px; max-width:560px; margin:10px auto 0; overflow:hidden; }
.fq3-code > div{ padding:0 6px; border-radius:4px; white-space:pre; transition:background .35s, opacity .35s; }
.fq3-code > div.run{ background:color-mix(in srgb, var(--k-qa) 22%, var(--paper)); }
.fq3-code > div.skip{ opacity:.42; }
.fq3-t, .fq3-f{ border-radius:3px; padding:0 2px; }
.fq3-t{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); box-shadow:inset 0 -2px 0 var(--ok); }
.fq3-f{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); box-shadow:inset 0 -2px 0 var(--pen); }
.fq3-tbl{ border-collapse:collapse; width:100%; max-width:560px; margin:0 auto; font-size:.88em; color:var(--ink); }
.fq3-tbl th, .fq3-tbl td{ border:1px solid var(--line); padding:5px 6px; text-align:left; vertical-align:middle; }
.fq3-tbl th{ background:var(--paper-2); font-weight:600; }
.fq3-tbl td{ background:var(--paper); }
.fq3-tbl .mono{ font-family:var(--mono); font-size:.92em; white-space:nowrap; }
.fq3-tbl tr.pick{ cursor:pointer; } .fq3-tbl tr.pick:hover td{ background:color-mix(in srgb, var(--k-qa) 10%, var(--paper)); }
.fq3-tbl tr.sel td{ background:color-mix(in srgb, var(--k-qa) 20%, var(--paper)); }
.fq3-tbl tr.off td{ opacity:.45; }
.fq3-tbl .star{ text-align:center; font-weight:700; color:var(--k-qa); }
.fq3-tag{ display:inline-block; font:600 .8em/1 var(--body); padding:3px 6px; border-radius:99px; margin-left:4px; vertical-align:middle; }
.fq3-tag.t{ color:var(--ok); border:1px solid var(--ok); } .fq3-tag.f{ color:var(--pen); border:1px solid var(--pen); }
.fq3-verd{ display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; max-width:560px; margin:10px auto 0; }
.fq3-verd div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px; text-align:center; font-size:.82rem; color:var(--graphite); }
.fq3-verd div b{ display:block; font-size:1rem; margin-top:2px; }
.fq3-verd .t b{ color:var(--ok); } .fq3-verd .f b{ color:var(--pen); }
.fq3-res{ max-width:560px; margin:10px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 12px; font-size:.92rem; line-height:1.5; color:var(--ink); }
.fq3-res b{ color:var(--k-qa); }
.fq3-res .on{ background:color-mix(in srgb, var(--k-qa) 18%, var(--paper)); border-radius:4px; padding:0 4px; }
.fq3-in{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; margin:0 0 10px; }
.fq3-in label{ display:inline-flex; gap:4px; align-items:center; font-weight:600; color:var(--ink); }
.fq3-in input{ width:64px; font:inherit; font-size:.95rem; padding:5px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.fq3-in input:focus{ outline:2px solid var(--k-qa); outline-offset:1px; }
.fq3-pre{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fq3-pre .fig-btn{ font-family:var(--mono); font-size:.8rem; padding:4px 10px; min-height:30px; }
.fq3-pre .fig-btn.sel{ border-color:var(--k-qa); box-shadow:0 0 0 1px var(--k-qa); }
.fq3-v{ display:grid; grid-template-columns:minmax(0, 1fr) 68px minmax(0, 1fr); column-gap:4px; max-width:480px; margin:0 auto; }
.fq3-v .band{ border-radius:10px; }
.fq3-v .band.l{ background:linear-gradient(to bottom, transparent, color-mix(in srgb, var(--k-qa) 24%, transparent)); }
.fq3-v .band.r{ background:linear-gradient(to top, transparent, color-mix(in srgb, var(--k-qa) 24%, transparent)); }
.fq3-vh{ font-weight:700; color:var(--k-qa); font-size:.82rem; padding:0 0 6px; white-space:nowrap; }
.fq3-vb{ position:relative; z-index:1; border:1.5px solid var(--graphite); border-radius:5px; background:var(--paper); color:var(--ink); padding:5px 3px; text-align:center; font:600 .75rem/1.2 var(--body); align-self:center; }
.fq3-vb span{ display:block; } .fq3-vb.hot{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 18%, var(--paper)); }
.fq3-vp{ position:relative; z-index:1; align-self:center; text-align:center; font:600 .72rem/1.15 var(--body); color:var(--ink); }
.fq3-vp i{ display:block; height:0; border-top:2px dashed var(--k-qa); margin:4px 7px 0 0; position:relative; }
.fq3-vp i::after{ content:""; position:absolute; right:-7px; top:-6px; border-left:8px solid var(--k-qa); border-top:5px solid transparent; border-bottom:5px solid transparent; }
.fq3-vc{ position:relative; z-index:1; color:var(--graphite); font-size:.95rem; line-height:1.15; }
.fq3-leg{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.82rem; color:var(--ink); margin:0 0 6px; }
.fq3-leg span{ display:inline-flex; align-items:center; gap:6px; }
.fig-stage .fq3-leg svg{ width:30px; height:10px; display:inline-block; margin:0; }
.fq3-tri-tbl{ font-size:13px; } .fq3-tri-tbl th, .fq3-tri-tbl td{ padding:4px 3px; } .fq3-tri-tbl .mono{ font-size:11.5px; white-space:normal; overflow-wrap:anywhere; } .fq3-tri-tbl .fq3-tag{ font-size:11.5px; }
.fq3-tri{ display:grid; grid-template-columns:minmax(0, 1.5fr) minmax(0, 1fr); gap:12px; align-items:start; max-width:640px; margin:0 auto; }
.fq3-tri svg{ max-width:300px; }
@media (max-width:620px){ .fq3-tri{ grid-template-columns:1fr; } }
.fq3-out{ text-align:center; margin:10px 0 0; font-size:1rem; color:var(--ink); } .fq3-out b{ font-family:var(--mono); color:var(--k-qa); }
.fq3-fp{ list-style:none; margin:10px auto 0; padding:0; max-width:620px; display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:3px 12px; font-size:.8rem; line-height:1.35; color:var(--graphite); }
.fq3-fp li{ padding:2px 6px; border-radius:4px; } .fq3-fp li.done{ color:var(--ink); } .fq3-fp li.done::before{ content:"✓ "; color:var(--ok); font-weight:700; }
.fq3-fp li.now{ background:color-mix(in srgb, var(--k-qa) 20%, var(--paper)); }
@media (max-width:560px){ .fq3-fp{ grid-template-columns:1fr; } }
.fq3-mm{ text-align:center; font-size:.86rem; color:var(--graphite); margin:8px 0 0; } .fq3-mm span{ margin:0 6px; } .fq3-mm span.on{ color:var(--ok); font-weight:700; }
.fq3-seq{ text-align:center; font:500 .82rem/1.4 var(--mono); color:var(--graphite); margin:6px 0 0; word-break:break-word; }
`;
  if (!document.getElementById('fq3-css')) { const s = document.createElement('style'); s.id = 'fq3-css'; s.textContent = CSS; document.head.appendChild(s); }

  const tint = 'color-mix(in srgb, var(--k-qa) 18%, var(--paper))';
  const arrowDef = (id, color) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill=${color} /></marker>`;
  // a labelled box for the tree figures
  const Bx = (x, y, w, h, lines, on, hot, fs, fw) => { const f = fs || 15, lh = Math.round(f * 1.2); return html`<g className=${pop(on)}>
    <rect x=${x} y=${y} width=${w} height=${h} rx="4" fill=${hot ? tint : 'var(--paper)'} stroke=${hot ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${hot ? 2.5 : 1.5} className="fade" />
    ${lines.map((t, j) => html`<text key=${j} x=${x + w / 2} y=${y + h / 2 + f * .35 + (j - (lines.length - 1) / 2) * lh} textAnchor="middle" fontSize=${f} fontWeight=${fw || 600}>${t}</text>`)}</g>`; };
  const Ln = (d, on, mk) => html`<path d=${d} stroke="var(--graphite)" strokeWidth="1.8" fill="none" markerEnd=${mk ? `url(#${mk})` : null} className=${pop(on)} />`;

  /* ── L3 slide 3: the static white box testing tree ── */
  function StaticTree({ ar }) {
    const steps = [
      { en: '<b>Static white box testing</b>: examining the design and code.', ar: 'الـ <b>Static white box testing</b>: فحص الـ design والـ code.' },
      { en: 'It has 3 parts: <b>Formal Review</b>, <b>Coding Standards and Guidelines</b> and <b>Code Review Checklist</b>.', ar: 'ليه 3 أجزاء: <b>Formal Review</b> و<b>Coding Standards and Guidelines</b> و<b>Code Review Checklist</b>.' },
      { en: 'Formal review has 3 types: <b>Peer Review</b>, <b>Walkthrough</b> and <b>Inspection</b>.', ar: 'الـ Formal review ليه 3 أنواع: <b>Peer Review</b> و<b>Walkthrough</b> و<b>Inspection</b>.' },
      { en: 'For a successful formal review, <b>4 essential elements</b> are required: 1- Identify Problems 2- Follow Rules 3- Prepare 4- Write a Report.', ar: 'عشان الـ formal review ينجح، لازم <b>4 حاجات أساسية</b> (essential elements): 1- Identify Problems 2- Follow Rules 3- Prepare 4- Write a Report' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 320 300" role="img" aria-label="Static White Box Testing tree: Formal Review (Peer Review, Walkthrough, Inspection), Coding Standards and Guidelines, Code Review Checklist" style=${{ maxWidth: '460px' }}>
        <defs>${arrowDef('fq3-sw-a', 'var(--graphite)')}</defs>
        <text x="160" y="15" textAnchor="middle" fontSize="14" fontWeight="700" style=${{ fill: 'var(--pen)' }}>Examining the Design and Code</text>
        ${Bx(50, 26, 220, 36, ['Static White Box Testing'], true, i === 0, 14)}
        ${Ln('M160 62 V76 M52 76 H268', i >= 1)}
        ${[52, 160, 268].map(x => html`<g key=${x}>${Ln(`M${x} 76 V92`, i >= 1, 'fq3-sw-a')}</g>`)}
        ${Bx(1, 94, 102, 62, ['Formal', 'Review'], i >= 1, i === 1 || i >= 2, 14)}
        ${Bx(109, 94, 102, 62, ['Coding', 'Standards and', 'Guidelines'], i >= 1, i === 1, 14, 500)}
        ${Bx(217, 94, 102, 62, ['Code Review', 'Checklist'], i >= 1, i === 1, 14)}
        ${Ln('M20 156 V266', i >= 2)}
        ${[182, 224, 266].map((y, k) => html`<g key=${k}>${Ln(`M20 ${y} H42`, i >= 2, 'fq3-sw-a')}${Bx(44, y - 17, 160, 34, [['Peer Review', 'Walkthrough', 'Inspection'][k]], i >= 2, i === 2, 14)}</g>`)}
      </svg>
      <div className=${'fq3-chips ' + pop(i >= 3)}>${['Identify Problems', 'Follow Rules', 'Prepare', 'Write a Report'].map((t, k) => html`<span key=${k}><b>${k + 1}-</b>${t}</span>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L3 slide 15: unit and integration testing ── */
  function IntegrationTree({ ar }) {
    const steps = [
      { en: 'Testing the pieces: unit and integration testing. <b>Integration testing</b> splits into three strategies.', ar: 'الـ Testing the pieces: الـ unit والـ integration testing. الـ <b>Integration testing</b> بيتقسم لـ 3 strategies.' },
      { en: '1) <b>Bottom Up Testing</b>', ar: 'الأولى: <b>Bottom Up Testing</b>' },
      { en: '2) <b>Top Down Testing</b>', ar: 'التانية: <b>Top Down Testing</b>' },
      { en: '3) <b>Umbrella Approach Testing</b>', ar: 'التالتة: <b>Umbrella Approach Testing</b>' }
    ];
    const [i, ctl] = useSteps(steps.length, 1700);
    const X = [52, 160, 268];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 320 160" role="img" aria-label="Integration testing splits into Bottom Up Testing, Top Down Testing and Umbrella Approach Testing" style=${{ maxWidth: '460px' }}>
        <defs>${arrowDef('fq3-it-a', 'var(--graphite)')}</defs>
        ${Bx(70, 6, 180, 40, ['Integration testing'], true, i === 0, 14)}
        ${Ln('M160 46 V70 M52 70 H268', i >= 1)}
        ${X.map((x, k) => html`<g key=${k}>${Ln(`M${x} 70 V92`, i >= k + 1, 'fq3-it-a')}${Bx(x - 51, 94, 102, 62, [['Bottom Up', 'Testing'], ['Top Down', 'Testing'], ['Umbrella', 'Approach', 'Testing']][k], i >= k + 1, i === k + 1, 14)}</g>`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L3 slide 17: code coverage ── */
  function CoverageTree({ ar }) {
    const steps = [
      { en: '<b>Code coverage</b> has 3 types.', ar: 'الـ <b>Code coverage</b> ليه 3 أنواع.' },
      { en: '<b>Statement Coverage</b>: every statement runs at least once.', ar: 'الـ <b>Statement Coverage</b>: كل statement يتنفذ مرة واحدة على الأقل.' },
      { en: '<b>Path Coverage</b> (branch): every path, both branches of every IF.', ar: 'الـ <b>Path Coverage</b> (branch): كل path، يعني الفرعين بتوع كل IF.' },
      { en: '<b>Condition Coverage</b>: each sub-condition of an IF is made true and false.', ar: 'الـ <b>Condition Coverage</b>: كل sub-condition جوه الـ IF نخليه true ومرة false.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    const Y = [28, 98, 168];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 320 196" role="img" aria-label="Code Coverage splits into Statement Coverage, Path Coverage and Condition Coverage" style=${{ maxWidth: '460px' }}>
        <defs>${arrowDef('fq3-cc-a', 'var(--graphite)')}</defs>
        ${Bx(2, 58, 84, 80, ['Code', 'Coverage'], true, i === 0, 14)}
        ${Ln('M86 98 H104', true, 'fq3-cc-a')}${Ln('M106 28 V168', i >= 1)}
        ${Y.map((y, k) => html`<g key=${k}>${Ln(`M106 ${y} H118`, i >= k + 1, 'fq3-cc-a')}${Bx(120, y - 22, 198, 44, [['Statement Coverage', 'Path Coverage', 'Condition Coverage'][k]], i >= k + 1, i === k + 1, 14)}</g>`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L3 slides 18–19: condition coverage, pick a test case ── */
  const CC_ROWS = [['25-12-2007', '11:11:11', [1, 2, 5, 6, 7]], ['25-12-2007', '00:00:00', [1, 2, 5, 6, 7]], ['25-12-2008', '11:11:11', [1, 2, 5, 6, 7]], ['25-12-2008', '00:00:00', [1, 2, 3, 4, 5, 6, 7]]];
  function ConditionCoverage({ ar }) {
    const [sel, setSel] = useState(null), [seen, setSeen] = useState([]);
    const fit = useFit(sel), fit2 = useFit(sel);
    const r = sel == null ? null : CC_ROWS[sel];
    const dT = r && r[0] === '25-12-2008', tT = r && r[1] === '00:00:00', both = dT && tT;
    const runs = n => !r ? '' : r[2].includes(n) ? 'run' : 'skip';
    const part = (txt, v) => r ? html`<span className=${v ? 'fq3-t' : 'fq3-f'}>${txt}</span>` : txt;
    const pick = k => { setSel(k); setSeen(s => s.includes(k) ? s : s.concat(k)); };
    const tf = v => v ? 'true' : 'false';
    let en, a;
    if (!r) { en = '<b>Try it:</b> pick a test case from the slide’s table to see which part of the condition is true or false and which lines run.'; a = '<b>جرّب:</b> اختار test case من جدول الـ slide عشان تشوف أنهي جزء من الـ condition بقى true أو false وأنهي سطور اتنفذت.'; }
    else {
      en = `Date$ = "${r[0]}" makes the Date part <b>${tf(dT)}</b>; Time$ = "${r[1]}" makes the Time part <b>${tf(tT)}</b>. With AND the IF is <b>${tf(both)}</b>, so lines <b>${r[2].join(', ')}</b> run${both ? '' : ' (3 and 4 are skipped)'}.`;
      a = `الـ <bdi>Date$ = "${r[0]}"</bdi> بيخلي جزء الـ Date <b>${tf(dT)}</b>؛ والـ <bdi>Time$ = "${r[1]}"</bdi> بيخلي جزء الـ Time <b>${tf(tT)}</b>. مع الـ AND الـ IF بيبقى <b>${tf(both)}</b>، فالسطور <b><bdi>${r[2].join(', ')}</bdi></b> بتتنفذ${both ? '' : ' (السطرين 3 و 4 بيتخطوا)'}.`;
      if (seen.length === 4) { en += ' You have tried all 4 rows: each part has been true and false, which is <b>full condition coverage</b>.'; a += ' جربت الـ 4 rows: كل جزء بقى true ومرة false، وده <b>full condition coverage</b>.'; }
    }
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fq3-code" ref=${fit} aria-label="Condition coverage code">
        <div className=${runs(1)}>${'1: PRINT "Good Morning"'}</div>
        <div className=${runs(2)}>${'2: IF '}${part('Date$ = "25-12-2008"', dT)}${' AND'}</div>
        <div className=${runs(2)}>${'   '}${part('Time$ = "00:00:00"', tT)}${' THEN'}</div>
        <div className=${runs(3)}>${'3:    PRINT "MERRY CHRISTMAS"'}</div>
        <div className=${runs(4)}>${'4: END IF'}</div>
        <div className=${runs(5)}>${'5: PRINT "The date is: "; Date$'}</div>
        <div className=${runs(6)}>${'6: PRINT "The time is: "; Time$'}</div>
        <div className=${runs(7)}>${'7: END'}</div>
      </div>
      ${r && html`<div className="fq3-verd"><div className=${dT ? 't' : 'f'}>Date part<b>${tf(dT)}</b></div><div className=${tT ? 't' : 'f'}>Time part<b>${tf(tT)}</b></div><div className=${both ? 't' : 'f'}>Whole IF (AND)<b>${tf(both)}</b></div></div>`}
      <p style=${{ textAlign: 'center', fontWeight: 600, margin: '12px 0 6px' }}>Test cases for a Full Condition Coverage</p>
      <div ref=${fit2} style=${{ overflow: 'hidden' }}><table className="fq3-tbl"><thead><tr><th>Date$</th><th>Time$</th><th>Line # Execution</th></tr></thead><tbody>
        ${CC_ROWS.map((row, k) => html`<tr key=${k} className=${'pick' + (sel === k ? ' sel' : '')} onClick=${() => pick(k)} tabIndex="0" role="button" aria-pressed=${sel === k} onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(k); } }}>
          <td className="mono">${row[0]}</td><td className="mono">${row[1]}</td><td className="mono">${row[2].join(',')}${seen.includes(k) ? ' ✓' : ''}</td></tr>`)}
      </tbody></table></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="muted small">Tried ${seen.length} of 4</span><span className="grow"></span>
        ${seen.length > 0 && html`<button className="fig-btn" onClick=${() => { setSel(null); setSeen([]); }}>↻ Start over</button>`}</div></figure>`;
  }

  /* ── L4 slide 2: the V model, verification and validation ── */
  function VModel({ ar }) {
    const steps = [
      { en: 'Figure 1.3, V Model. The left side goes down: Requirements Specifications → Functional Specifications → System Design → Unit Design → Code. This side is <b>Verification</b>.', ar: 'الـ Figure 1.3، الـ V Model. الجنب الشمال نازل: <bdi>Requirements Specifications → Functional Specifications → System Design → Unit Design → Code</bdi>. الجنب ده هو الـ <b>Verification</b>.' },
      { en: 'From Code the right side goes up: Unit Test → Integration Test → System Test → Acceptance Test. This side is <b>Validation</b>.', ar: 'من الـ Code الجنب اليمين طالع: <bdi>Unit Test → Integration Test → System Test → Acceptance Test</bdi>. الجنب ده هو الـ <b>Validation</b>.' },
      { en: 'Dotted arrows link the two sides: <b>Acceptance Test Plan</b>, <b>System Test Plan</b>, <b>Integration Test Plan</b>, and <b>Test Cases</b> between Unit Design and Unit Test.', ar: 'أسهم منقطة بتربط الجنبين: <b>Acceptance Test Plan</b> و<b>System Test Plan</b> و<b>Integration Test Plan</b>، و<b>Test Cases</b> بين الـ Unit Design والـ Unit Test.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const LL = [['Requirements', 'Specifications'], ['Functional', 'Specifications'], ['System Design'], ['Unit Design']];
    const RL = [['Acceptance Test'], ['System Test'], ['Integration Test'], ['Unit Test']];
    const PL = ['Acceptance Test Plan', 'System Test Plan', 'Integration Test Plan', 'Test Cases'];
    const box = (l, hot, on, st, k) => html`<div key=${k} className=${'fq3-vb' + (hot ? ' hot' : '') + ' ' + pop(on)} style=${st}>${l.map((t, j) => html`<span key=${j}>${t}</span>`)}</div>`;
    const at = (c, r) => ({ gridColumn: c, gridRow: r });
    return html`<figure className="fig"><div className="fig-stage">
      <p style=${{ textAlign: 'center', fontWeight: 600, margin: '0 0 8px', fontSize: '.9rem' }}>Figure 1.3: V Model</p>
      <div className="fq3-v" role="img" aria-label="The V model with Verification going down the left side and Validation going up the right side">
        <div className="band l" style=${at(1, '2 / 11')}></div>
        <div className=${'band r ' + pop(i >= 1)} style=${at(3, '2 / 10')}></div>
        <div className="fq3-vh" style=${at(1, 1)}>Verification ↓</div>
        <div className=${'fq3-vh ' + pop(i >= 1)} style=${{ ...at(3, 1), textAlign: 'right' }}>Validation ↑</div>
        ${LL.map((l, k) => box(l, i === 0, true, { ...at(1, 2 + 2 * k), marginLeft: k * 4 + 'px' }, 'l' + k))}
        ${RL.map((l, k) => box(l, i === 1, i >= 1, { ...at(3, 2 + 2 * k), marginRight: k * 4 + 'px' }, 'r' + k))}
        ${PL.map((t, k) => html`<div key=${'p' + k} className=${'fq3-vp ' + pop(i >= 2)} style=${at(2, 2 + 2 * k)}>${t}${k < 3 && html`<i></i>`}</div>`)}
        ${[0, 1, 2, 3].map(k => html`<div key=${'cl' + k} className="fq3-vc" style=${{ ...at(1, 3 + 2 * k), paddingLeft: (k * 4 + 34) + 'px' }}>↘</div>`)}
        ${[0, 1, 2, 3].map(k => html`<div key=${'cr' + k} className=${'fq3-vc ' + pop(i >= 1)} style=${{ ...at(3, 3 + 2 * k), textAlign: 'right', paddingRight: (k * 4 + 34) + 'px' }}>↗</div>`)}
        ${box(['Code'], i === 0, true, { ...at('1 / 4', 10), justifySelf: 'center', minWidth: '92px' }, 'code')}
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slides 3–4: foo(), its control flow graph, cyclomatic complexity and basis paths ── */
  const FOO_N = { 1: [290, 40], 2: [372, 104], 3: [290, 166], 5: [222, 238], 4: [358, 238], 6: [290, 310] };
  const FOO_E = [['1-2', 't'], ['3-4', 't'], ['1-3', 'f'], ['3-5', 'f'], ['2-3', 's'], ['4-6', 's'], ['5-6', 's']];
  const FOO_CODE = [['public float foo(int a, int b,', 0], ['                 float x) {', 0], ['1.  if (a>1 && b==0) {', 1], ['2.     x=x/a;', 2], ['    }', 0], ['3.  if (a==2 || x>1) {', 3], ['4.     x=x+1;', 4], ['    }', 0], ['    else', 0], ['5.     x=x*a;', 5], ['6.  return (a+x);', 6], ['}', 0]];
  const FOO_P = [[[1, 2, 3, 4, 6], 'a=2, b=0, x= 0 &lt;any suitable value&gt;'], [[1, 3, 4, 6], 'a=2, b=1, x= 0 &lt;any suitable value&gt;'], [[1, 3, 5, 6], 'a=0, b=0, x= 0']];
  function FooCfg({ ar }) {
    const steps = [
      { en: 'Consider foo(). Each numbered statement is a node of the <b>control flow graph</b>: 6 nodes.', ar: 'خد الـ foo(). كل statement عليه رقم بيبقى node في الـ <b>control flow graph</b>: 6 nodes.' },
      { en: '<b>True Branch</b> (thick arrows): 1 → 2 when (a>1 && b==0) is true, and 3 → 4 when (a==2 || x>1) is true.', ar: 'الـ <b>True Branch</b> (الأسهم التقيلة): <bdi>1 → 2</bdi> لما <bdi>(a>1 && b==0)</bdi> تبقى true، و <bdi>3 → 4</bdi> لما <bdi>(a==2 || x>1)</bdi> تبقى true.' },
      { en: '<b>False Branch</b> (dotted arrows): 1 → 3 skips line 2, and 3 → 5 goes to the else.', ar: 'الـ <b>False Branch</b> (الأسهم المنقطة): <bdi>1 → 3</bdi> بيتخطى سطر 2، و <bdi>3 → 5</bdi> بيروح للـ else.' },
      { en: '<b>Sequential Branch</b> (thin arrows): 2 → 3, 4 → 6 and 5 → 6. That makes <b>7 edges</b>.', ar: 'الـ <b>Sequential Branch</b> (الأسهم الرفيعة): <bdi>2 → 3</bdi> و <bdi>4 → 6</bdi> و <bdi>5 → 6</bdi>. كده بقوا <b><bdi>7 edges</bdi></b>.' },
      { en: 'Cyclomatic Complexity: <b>E(G) − N(G) + 2 = 7 − 6 + 2 = 3</b>. So there are 3 basis paths.', ar: 'الـ Cyclomatic Complexity: <b><bdi>E(G) − N(G) + 2 = 7 − 6 + 2 = 3</bdi></b>. يبقى فيه 3 basis paths.' },
      ...FOO_P.map(([p, t], k) => ({ en: `Basis path ${k + 1}: <b>${p.join(',')}</b>. Test case: ${t}.`, ar: `الـ Basis path رقم ${k + 1}: <b><bdi>${p.join(',')}</bdi></b>. والـ test case بتاعه: <bdi>${t}</bdi>.` }))
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const fit = useFit(i);
    const path = i >= 5 ? FOO_P[i - 5][0] : null;
    const onPath = key => { if (!path) return false; const [a, b] = key.split('-').map(Number); const j = path.indexOf(a); return j >= 0 && path[j + 1] === b; };
    const shown = t => (t === 't' && i >= 1) || (t === 'f' && i >= 2) || (t === 's' && i >= 3);
    const R = 22;
    const edge = ([key, t]) => { const [a, b] = key.split('-'); const [x1, y1] = FOO_N[a], [x2, y2] = FOO_N[b], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
      const hot = onPath(key), col = t === 'f' ? 'var(--pen)' : 'var(--k-qa)';
      return html`<path key=${key} d=${`M${x1 + ux * R} ${y1 + uy * R} L${x2 - ux * (R + 2)} ${y2 - uy * (R + 2)}`} stroke=${hot ? 'var(--ok)' : col} strokeWidth=${hot ? 5 : t === 't' ? 3.5 : t === 'f' ? 2.2 : 1.6} strokeDasharray=${t === 'f' && !hot ? '3 4' : null} fill="none"
        markerEnd=${`url(#${hot ? 'fq3-foo-o' : t === 'f' ? 'fq3-foo-f' : 'fq3-foo-t'})`} className=${pop(shown(t))} style=${{ opacity: path && !hot ? .3 : null }} />`; };
    const lineCls = n => !n ? (path ? 'skip' : '') : path ? (path.includes(n) ? 'run' : 'skip') : i === 0 ? 'run' : '';
    const leg = (t, label) => html`<span key=${t}><svg viewBox="0 0 30 10" aria-hidden="true"><path d="M1 5 H21" stroke=${t === 'f' ? 'var(--pen)' : 'var(--k-qa)'} strokeWidth=${t === 't' ? 3.5 : t === 'f' ? 2.2 : 1.6} strokeDasharray=${t === 'f' ? '3 3' : null} /><path d="M20 1 L29 5 L20 9 z" fill=${t === 'f' ? 'var(--pen)' : 'var(--k-qa)'} /></svg>${label}</span>`;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fq3-leg">${leg('t', 'True Branch')}${leg('s', 'Sequential Branch')}${leg('f', 'False Branch')}</div>
      <svg viewBox="192 12 216 342" role="img" aria-label="Control flow graph of foo with nodes 1 to 6" style=${{ maxWidth: '250px' }}>
        <defs>${arrowDef('fq3-foo-t', 'var(--k-qa)')}${arrowDef('fq3-foo-f', 'var(--pen)')}${arrowDef('fq3-foo-o', 'var(--ok)')}</defs>
        ${FOO_E.map(edge)}
        ${Object.keys(FOO_N).map(n => { const [x, y] = FOO_N[n], hot = path && path.includes(+n);
          return html`<g key=${n}><circle cx=${x} cy=${y} r=${R} fill=${hot ? 'var(--s-qa)' : 'var(--paper)'} stroke="var(--k-qa)" strokeWidth="2" className="fade" />
            <text x=${x} y=${y + 6} textAnchor="middle" fontSize="17" fontWeight="700" style=${hot ? { fill: '#fff' } : null}>${n}</text></g>`; })}
        <text x="290" y="346" textAnchor="middle" fontSize="15" fontWeight="700" style=${{ fill: 'var(--k-qa)' }}>control flow graph</text>
      </svg>
      <div className="fq3-code" ref=${fit} aria-label="The code of foo">${FOO_CODE.map(([t, n], k) => html`<div key=${k} className=${lineCls(n)}>${t}</div>`)}</div>
      <div className=${'fq3-res ' + pop(i >= 4)}>
        <div>Cyclomatic Complexity: <b>E(G) − N(G) + 2 = 7 − 6 + 2 = 3</b></div>
        <div>Basis Paths: ${FOO_P.map(([p], k) => html`<span key=${k} className=${i === k + 5 ? 'on' : ''}>${p.join(',')}</span>`).reduce((acc, x, k) => k ? acc.concat(' · ', x) : [x], [])}</div>
        <div>Test cases: ${FOO_P.map(([, t], k) => html`<span key=${k} className=${i === k + 5 ? 'on' : ''}>${k + 1}. <span dangerouslySetInnerHTML=${{ __html: t }}></span></span>`).reduce((acc, x, k) => k ? acc.concat(' ', x) : [x], [])}</div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* triangle control flow graph (L4 slide 9), drawn by both triangle visuals */
  function TriCfg({ mid, vis, path }) {
    const CX = 60, CY = j => 30 + j * 80, SX = 228, SY = j => 70 + j * 80;
    const names = ['a', 'c', 'e', 'g', 'i'], side = [['isosceles'], ['equilateral'], ['not a', 'triangle'], ['bad inputs']];
    const hotE = (j, kind) => path && (kind === 'down' ? !path[j] : path[j]);
    const E = (d, on, hot) => html`<path d=${d} stroke=${hot ? 'var(--ok)' : 'var(--graphite)'} strokeWidth=${hot ? 4 : 1.8} fill="none" markerEnd=${`url(#${mid}${hot ? '-o' : ''})`} className=${pop(on)} style=${{ opacity: path && !hot ? .35 : null }} />`;
    return html`<svg viewBox="0 0 310 400" role="img" aria-label="Control flow graph for triangle program: chain a, c, e, g, i with side nodes isosceles, equilateral, not a triangle, bad inputs">
      <defs>${arrowDef(mid, 'var(--graphite)')}${arrowDef(mid + '-o', 'var(--ok)')}</defs>
      ${[0, 1, 2, 3].map(j => html`<g key=${'d' + j}>${E(`M${CX} ${CY(j) + 18} V${CY(j + 1) - 20}`, true, hotE(j, 'down'))}</g>`)}
      ${[0, 1, 2, 3].map(j => html`<g key=${'s' + j}>${E(`M${CX + 22} ${CY(j) + 10} L${SX - 64} ${SY(j) - 14}`, vis > j, hotE(j, 'side'))}${E(`M${SX - 66} ${SY(j) + 14} L${CX + 26} ${CY(j + 1) - 8}`, vis > j, hotE(j, 'side'))}</g>`)}
      ${names.map((n, j) => html`<g key=${n}><ellipse cx=${CX} cy=${CY(j)} rx="26" ry="18" fill=${path ? 'var(--s-qa)' : 'var(--paper)'} stroke="var(--graphite)" strokeWidth="1.8" />
        <text x=${CX} y=${CY(j) + 5} textAnchor="middle" fontSize="16" fontWeight="600" style=${path ? { fill: '#fff' } : null}>${n}</text></g>`)}
      ${side.map((l, j) => { const hot = path && path[j]; return html`<g key=${j} className=${pop(vis > j)}><ellipse cx=${SX} cy=${SY(j)} rx="72" ry="26" fill=${hot ? 'var(--s-qa)' : 'var(--paper)'} stroke=${hot ? 'var(--s-qa)' : 'var(--graphite)'} strokeWidth="1.8" className="fade" />
        ${l.map((t, k) => html`<text key=${k} x=${SX} y=${SY(j) + 5 + (k - (l.length - 1) / 2) * 17} textAnchor="middle" fontSize="15" style=${hot ? { fill: '#fff' } : null}>${t}</text>`)}</g>`; })}
      <text x="155" y="394" textAnchor="middle" fontSize="14">Control flow graph for triangle program.</text>
    </svg>`;
  }

  /* ── L4 slides 5 and 8: run the triangle pseudocode ── */
  const TRI = [['A', 'read a,b,c'], ['B', 'type=“scalene”'], ['C', 'if(a==b||b==c||a==c)'], ['D', 'type=“isosceles”'], ['E', 'if(a==b&&b==c)'], ['F', 'type=“equilateral”'], ['G', 'if(a>=b+c||b>=a+c||c>=a+b)'], ['H', 'type=“not a triangle”'], ['I', 'if(a<=0||b<=0||c<=0)'], ['J', 'type=“bad inputs”'], ['K', 'print type']];
  const TRI_PRE = [[3, 4, 5], [3, 5, 3], [0, 1, 0], [4, 4, 4], [0, 0, 0]];
  function triRun(a, b, c) {
    const C = a == b || b == c || a == c, E = a == b && b == c, G = a >= b + c || b >= a + c || c >= a + b, I = a <= 0 || b <= 0 || c <= 0;
    let type = 'scalene'; if (C) type = 'isosceles'; if (E) type = 'equilateral'; if (G) type = 'not a triangle'; if (I) type = 'bad inputs';
    const run = { A: 1, B: 1, C: 1, D: C, E: 1, F: E, G: 1, H: G, I: 1, J: I, K: 1 };
    return { conds: { C, E, G, I }, path: [C, E, G, I], run, type };
  }
  function Triangle({ ar }) {
    const [v, setV] = useState(['3', '4', '5']);
    const nums = v.map(s => s.trim() === '' ? NaN : Number(s)), ok = nums.every(isFinite);
    const res = ok ? triRun(nums[0], nums[1], nums[2]) : null;
    const set = (k, s) => setV(o => o.map((x, j) => j === k ? s : x));
    const key = nums.join(',');
    const col = ['3,4,5', '3,5,3', '0,1,0', '4,4,4'].includes(key);
    let en, a;
    if (!res) { en = 'Enter a number for each of a, b and c.'; a = 'اكتب رقم لكل واحد من a و b و c.'; }
    else {
      const lines = TRI.filter(([n]) => res.run[n]).map(([n]) => n);
      const sideEn = ['isosceles', 'equilateral', 'not a triangle', 'bad inputs'].filter((_, j) => res.path[j]);
      en = `(${key}): lines <b>${lines.join(', ')}</b> run and it prints <b>${res.type}</b>. On the control flow graph the run goes down a → c → e → g → i${sideEn.length ? ', passing through ' + sideEn.join(', ') : ' without any side node'}.`;
      a = `مع <bdi>(${key})</bdi>: السطور <b><bdi>${lines.join(', ')}</bdi></b> بتتنفذ وبيطبع <b>${res.type}</b>. على الـ control flow graph التنفيذ بينزل <bdi>a → c → e → g → i</bdi>${sideEn.length ? '، وبيعدي على ' + sideEn.join('، ') : ' من غير ما يعدي على أي side node'}.`;
      if (lines.length === 11) { en += ' This one input runs <b>every line A to K</b>.'; a += ' الـ input ده لوحده بينفذ <b>كل السطور من A لـ K</b>.'; }
      if (col) { en += ' (A column of the slide’s table.)'; a += ' (ده column من جدول الـ slide.)'; }
    }
    const tag = n => res && res.conds[n] !== undefined ? html`<span className=${'fq3-tag ' + (res.conds[n] ? 't' : 'f')}>${res.conds[n] ? 'true' : 'false'}</span>` : null;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fq3-in">${['a', 'b', 'c'].map((n, k) => html`<label key=${n}>${n} =<input type="number" step="any" inputMode="decimal" value=${v[k]} onInput=${e => set(k, e.target.value)} onChange=${e => set(k, e.target.value)} aria-label=${'side ' + n} /></label>`)}</div>
      <div className="fq3-pre">${TRI_PRE.map(p => html`<button key=${p.join()} className=${'fig-btn' + (key === p.join(',') ? ' sel' : '')} onClick=${() => setV(p.map(String))}>${p.join(',')}</button>`)}</div>
      <div className="fq3-tri">
        <div><table className="fq3-tbl fq3-tri-tbl"><thead><tr><th>Node</th><th>Source Line</th><th>Runs</th></tr></thead><tbody>
          ${TRI.map(([n, src]) => html`<tr key=${n} className=${res && !res.run[n] ? 'off' : ''}><td>${n}</td><td className="mono">${src}</td><td className="star">${res && res.run[n] ? '*' : ''}${tag(n)}</td></tr>`)}
        </tbody></table></div>
        <div><${TriCfg} mid="fq3-tri-a" vis=${4} path=${res ? res.path : null} /></div>
      </div>
      ${res && html`<p className="fq3-out">print type → <b>${res.type}</b></p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="muted small">The buttons are the slide’s four columns and (0,0,0).</span></div></figure>`;
  }

  /* ── L4 slide 9: the control flow graph for the triangle program ── */
  function TriangleCfg({ ar }) {
    const steps = [
      { en: 'Control flow graph for triangle program: a chain of nodes <b>a → c → e → g → i</b>.', ar: 'الـ Control flow graph بتاع الـ triangle program: سلسلة nodes <b><bdi>a → c → e → g → i</bdi></b>.' },
      { en: '<b>a</b> also branches to <b>isosceles</b>, which leads back into c.', ar: 'الـ <b>a</b> كمان بيتفرع لـ <b>isosceles</b>، وده بيرجع يدخل في c.' },
      { en: '<b>c</b> branches to <b>equilateral</b>, which leads back into e.', ar: 'الـ <b>c</b> بيتفرع لـ <b>equilateral</b>، وده بيرجع يدخل في e.' },
      { en: '<b>e</b> branches to <b>not a triangle</b>, which leads back into g.', ar: 'الـ <b>e</b> بيتفرع لـ <b>not a triangle</b>، وده بيرجع يدخل في g.' },
      { en: '<b>g</b> branches to <b>bad inputs</b>, which leads back into i. Find the minimal set of test cases that would achieve statement and branch coverage.', ar: 'الـ <b>g</b> بيتفرع لـ <b>bad inputs</b>، وده بيرجع يدخل في i. لاقي أقل set من الـ test cases يحقق statement و branch coverage.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    return html`<figure className="fig"><div className="fig-stage" style=${{ display: 'flex', justifyContent: 'center' }}><div style=${{ width: '100%', maxWidth: '340px' }}><${TriCfg} mid="fq3-tc-a" vis=${i} path=${null} /></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L4 slide 14: the stack state machine, with MM and function pairs ── */
  const FP_LIST = ['new pop (on empty – error)', 'new push', 'push (from empty) push', 'push (from empty) pop', 'push (from normal to normal) push (still in normal)', 'push (from normal to normal) push (into full)', 'push (from normal to normal) pop', 'push (from normal to full) push (error)', 'push (from normal to full) pop', 'pop (from normal to normal) push (still in normal)', 'pop (from normal to normal) pop (still in normal)', 'pop (from normal to normal) pop (into empty)', 'pop (into empty) push', 'pop (into empty) pop (error)'];
  const FP_MAP = { 'new>popE': 1, 'new>pushE': 2, 'pushE>pushNN': 3, 'pushE>pushNF': 3, 'pushE>popNN': 4, 'pushE>popNE': 4, 'pushNN>pushNN': 5, 'pushNN>pushNF': 6, 'pushNN>popNN': 7, 'pushNN>popNE': 7, 'pushNF>pushF': 8, 'pushNF>popF': 9, 'popNN>pushNN': 10, 'popNN>popNN': 11, 'popNN>popNE': 12, 'popNE>pushE': 13, 'popNE>popE': 14 };
  // op: [method, from, to]; to null = error (the arrow points to no state)
  const OPS = { new: ['new', null, 'Empty'], pushE: ['push', 'Empty', 'Normal'], popE: ['pop', 'Empty', null], pushNN: ['push', 'Normal', 'Normal'], pushNF: ['push', 'Normal', 'Full'], popNN: ['pop', 'Normal', 'Normal'], popNE: ['pop', 'Normal', 'Empty'], pushF: ['push', 'Full', null], popF: ['pop', 'Full', 'Normal'] };
  function Stack({ ar }) {
    const [st, setSt] = useState(null), [hist, setHist] = useState([]), [done, setDone] = useState([]), [last, setLast] = useState(null), [mm, setMm] = useState([]);
    const run = op => {
      const [m, , to] = OPS[op];
      const h = op === 'new' ? ['new'] : hist.concat(op);
      const prev = op === 'new' ? null : hist[hist.length - 1];
      const fp = prev ? FP_MAP[prev + '>' + op] || 0 : null;
      setHist(h); setSt(to === null ? 'error' : to); setLast({ op, fp });
      if (fp) setDone(d => d.includes(fp) ? d : d.concat(fp));
      setMm(x => x.includes(m) ? x : x.concat(m));
    };
    const reset = () => { setSt(null); setHist([]); setDone([]); setLast(null); setMm([]); };
    const lastOp = last && last.op;
    const hotT = id => lastOp === id || (id === 'loop' && (lastOp === 'pushNN' || lastOp === 'popNN'));
    const S = { Empty: [70, 118], Normal: [170, 118], Full: [270, 118] };
    const T = (id, d, lx, ly, label, anchor) => { const hot = hotT(id), err = id === 'popE' || id === 'pushF';
      return html`<g key=${id}><path d=${d} stroke=${hot ? (err ? 'var(--pen)' : 'var(--ok)') : 'var(--ink)'} strokeWidth=${hot ? 3.5 : 1.8} fill="none" markerEnd=${`url(#${hot ? (err ? 'fq3-st-e' : 'fq3-st-o') : 'fq3-st-a'})`} />
        <text x=${lx} y=${ly} fontSize="14" textAnchor=${anchor || 'middle'} fontWeight=${hot ? 700 : 400}>${label}</text></g>`; };
    const opName = op => { const [m, f, t] = OPS[op]; return m === 'new' ? 'New' : (m === 'push' ? 'Push' : 'Pop') + (t === null ? ' (error)' : f === t ? ' (stay ' + t + ')' : ' (into ' + t + ')'); };
    const btns = st === null || st === 'error' ? [] : st === 'Empty' ? ['pushE', 'popE'] : st === 'Normal' ? ['pushNN', 'pushNF', 'popNN', 'popNE'] : ['pushF', 'popF'];
    const label = op => { const [m, f, t] = OPS[op]; if (st === 'Normal') return (m === 'push' ? 'Push' : 'Pop') + (f === t ? ' (stay in Normal)' : ' (into ' + t + ')'); return m === 'push' ? 'Push' : 'Pop'; };
    let en, a;
    if (!last) { en = '<b>Try it:</b> press <b>New</b> to create the stack, then Push and Pop. Every pair of two calls in a row is checked against the slide’s 14 function pairs.'; a = '<b>جرّب:</b> دوس <b>New</b> عشان تعمل الـ stack، وبعدين Push و Pop. كل اتنين calls ورا بعض بنقارنهم بالـ 14 function pairs اللي في الـ slide.'; }
    else {
      const [m, f, t] = OPS[last.op];
      if (m === 'new') { en = '<b>New</b>: the start dot goes to <b>Empty</b>.'; a = 'الـ <b>New</b>: النقطة السودا بتروح لـ <b>Empty</b>.'; }
      else if (t === null) { en = `<b>${m === 'pop' ? 'Pop' : 'Push'}</b> on <b>${f}</b> is an <b>error</b>: on the figure this arrow points to no state. Press New to start again.`; a = `الـ <b>${m}</b> على <b>${f}</b> ده <b>error</b>: في الرسمة السهم ده مش رايح لأي state. دوس New عشان تبدأ تاني.`; }
      else { en = `<b>${m === 'push' ? 'Push' : 'Pop'}</b>: ${f} → <b>${t}</b>.`; a = `الـ <b>${m}</b>: <bdi>${f} → ${t}</bdi>.`; }
      if (last.fp) { en += ` The last two calls are function pair <b>${last.fp}</b>: ${FP_LIST[last.fp - 1]}.`; a += ` آخر اتنين calls هما الـ function pair رقم <b>${last.fp}</b>: <bdi>${FP_LIST[last.fp - 1]}</bdi>.`; }
      else if (last.fp === 0) { en += ' These last two calls are not one of the 14 pairs listed on the slide.'; a += ' آخر اتنين calls دول مش من الـ 14 pair اللي في الـ slide.'; }
      if (mm.length === 3 && m !== 'new') { en += ' New, push and pop have all been called: that sequence achieves <b>MM</b> testing.'; a += ' اتعمل call لـ new و push و pop: الـ sequence دي بتحقق الـ <b>MM</b> testing.'; }
    }
    if (st === 'Normal' && last && OPS[last.op][2] !== null) { en += ' From Normal the figure has two Push arrows and two Pop arrows, so you choose which one.'; a += ' من Normal الرسمة فيها سهمين Push وسهمين Pop، فانت اللي تختار.'; }
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 320 222" role="img" aria-label="Stack state machine with states Empty, Normal and Full" style=${{ maxWidth: '460px' }}>
        <defs>${arrowDef('fq3-st-a', 'var(--ink)')}${arrowDef('fq3-st-o', 'var(--ok)')}${arrowDef('fq3-st-e', 'var(--pen)')}</defs>
        <circle cx="12" cy="26" r="9" fill="var(--ink)" />
        ${T('new', 'M17 34 L45 92', 32, 50, 'New', 'start')}
        ${T('pushE', 'M92 92 L120 56 L148 92', 120, 48, 'Push')}
        ${T('popNE', 'M146 144 L120 164 L96 146', 120, 182, 'Pop')}
        ${T('pushNF', 'M192 92 L220 56 L248 92', 220, 48, 'Push')}
        ${T('popF', 'M246 144 L220 164 L196 146', 220, 182, 'Pop')}
        ${T('loop', 'M160 151 L150 196 L194 196', 172, 216, 'Push pop')}
        <path d="M194 196 L182 154" stroke=${hotT('loop') ? 'var(--ok)' : 'var(--ink)'} strokeWidth=${hotT('loop') ? 3.5 : 1.8} fill="none" markerEnd=${`url(#${hotT('loop') ? 'fq3-st-o' : 'fq3-st-a'})`} />
        ${T('popE', 'M48 144 L22 184', 38, 196, 'Pop', 'start')}
        ${T('pushF', 'M292 144 L314 184', 318, 206, 'Push', 'end')}
        ${Object.keys(S).map(n => { const [x, y] = S[n], on = st === n; return html`<g key=${n}><circle cx=${x} cy=${y} r="34" fill=${on ? 'var(--s-qa)' : 'var(--paper)'} stroke=${on ? 'var(--s-qa)' : 'var(--ink)'} strokeWidth="2" className="fade" />
          <text x=${x} y=${y + 5} textAnchor="middle" fontSize="15" fontWeight="600" style=${on ? { fill: '#fff' } : null}>${n}</text></g>`; })}
        ${st === 'error' && html`<text x="170" y="18" textAnchor="middle" fontSize="16" fontWeight="700" style=${{ fill: 'var(--pen)' }}>error</text>`}
      </svg>
      <p className="fq3-seq">${hist.length ? hist.map(opName).join(' → ') : 'No calls yet'}</p>
      <p className="fq3-mm">MM: ${['new', 'push', 'pop'].map(m => html`<span key=${m} className=${mm.includes(m) ? 'on' : ''}>${mm.includes(m) ? '✓ ' : ''}${m}</span>`)}</p>
      <ol className="fq3-fp" aria-label="Function pairs from the slide">${FP_LIST.map((t, k) => html`<li key=${k} className=${(done.includes(k + 1) ? 'done' : '') + (last && last.fp === k + 1 ? ' now' : '')}>${k + 1}. ${t}</li>`)}</ol>
      <p className="fq3-mm">Function pairs covered: <b>${done.length} of 14</b></p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar">
        <button className="fig-btn solid" onClick=${() => run('new')}>New</button>
        ${btns.map(op => html`<button key=${op} className="fig-btn" onClick=${() => run(op)}>${label(op)}</button>`)}
        <span className="grow"></span>${last && html`<button className="fig-btn" onClick=${reset}>↻ Start over</button>`}</div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'qa-static-wb': StaticTree, 'qa-integration': IntegrationTree, 'qa-code-coverage': CoverageTree, 'qa-condition-coverage': ConditionCoverage,
    'qa-v-verify': VModel, 'qa-foo-cfg': FooCfg, 'qa-triangle-run': Triangle, 'qa-triangle-cfg': TriangleCfg, 'qa-stack-fp': Stack
  });
})();

/* ── part 4 ── */
// QA visuals, part 4: L5 (Web site Testing, figures 8.5 and 8.6) and L8 (Six Sigma).
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fq4-web{ max-width:560px; margin:0 auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); font:.8rem/1.3 Arial, var(--body); overflow:hidden; }
.fq4-web .hd{ display:flex; flex-wrap:wrap; gap:8px 12px; align-items:center; justify-content:space-between; padding:8px 10px; }
.fq4-web .brand{ display:flex; gap:10px; align-items:center; }
.fq4-web .logo{ font:400 1.7rem/1 Arial, var(--body); color:#1f6fb2; letter-spacing:-.02em; padding:2px 4px; border-radius:4px; }
.fq4-web .logo sup{ font-size:.72rem; }
.fq4-web .sl{ display:grid; gap:1px; justify-items:start; } .fq4-web .slogan{ font-size:.86rem; color:var(--k-qa); padding:2px 4px; border-radius:4px; }
.fq4-web .stripes{ display:inline-flex; gap:2px; vertical-align:middle; margin-left:4px; padding:2px; border-radius:3px; } .fq4-web .stripes i{ width:9px; height:7px; transform:skewX(-20deg); display:block; }
.fq4-web .tr{ display:grid; gap:5px; justify-items:end; margin-left:auto; }
.fq4-web .links{ font-size:.72rem; padding:2px 4px; border-radius:4px; text-align:right; }
.fq4-web .links a, .fq4-web .nav a{ color:var(--k-qa); text-decoration:none; } .fq4-web.ul .links a, .fq4-web.ul .nav a{ text-decoration:underline; cursor:pointer; }
.fq4-web .search{ border:1px solid var(--line); border-radius:3px; padding:3px 6px; width:140px; display:flex; justify-content:space-between; color:var(--graphite); font-size:.74rem; }
.fq4-web .nav{ display:flex; flex-wrap:wrap; gap:2px 10px; padding:6px 10px; background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); font-size:.74rem; }
.fq4-web .banner{ display:grid; grid-template-columns:1fr 1.2fr; gap:8px; align-items:center; background:#0b0b0d; padding:12px 10px; min-height:110px; }
.fq4-web .pic{ height:92px; border-radius:4px; display:grid; place-items:center; text-align:center; padding:6px; font-size:.72rem; color:#d1d5db; background:linear-gradient(135deg,#4b5563,#1f2937); }
.fq4-web .pic.err{ background:#fff; color:#b91c1c; border:2px dashed #b91c1c; font-weight:700; }
.fq4-web .bt{ color:#f3f4f6; font-size:.82rem; padding:2px 4px; border-radius:4px; } .fq4-web .bt b{ display:block; font:400 1.5rem/1.1 Arial, var(--body); color:#38bdf8; letter-spacing:.02em; }
.fq4-web .on{ outline:3px solid var(--k-qa); outline-offset:2px; } .fq4-web .dim{ opacity:.35; } .fq4-web .on, .fq4-web .dim{ transition:opacity .4s, outline-color .4s; }
.fq4-web .bt.on, .fq4-web .pic.on{ outline-color:#5fd3d8; }
.fq4-tag{ display:inline-block; margin:8px auto 0; padding:3px 10px; border-radius:99px; background:var(--s-qa); color:#fff; font-weight:600; font-size:.85rem; }
.fq4-form{ max-width:520px; margin:0 auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:10px 12px; font:.82rem/1.3 Verdana, var(--body); }
.fq4-form h4{ margin:0 0 8px; font:400 .95rem Arial, var(--body); color:#1f6fb2; }
.fq4-form .row{ display:grid; grid-template-columns:minmax(92px, 34%) 1fr; gap:4px 8px; align-items:start; padding:4px; border-radius:6px; }
.fq4-form .row > b{ font-size:.74rem; padding-top:5px; }
.fq4-form .fld{ display:flex; flex-wrap:wrap; align-items:center; gap:4px 6px; min-width:0; }
.fq4-form input[type=text], .fq4-form input[type=password], .fq4-form .box{ font:inherit; font-size:.8rem; width:150px; max-width:100%; min-height:24px; box-sizing:border-box; border:1px solid #9bb7d6; border-radius:2px; padding:2px 5px; background:var(--paper); color:var(--ink); }
.fq4-form .hint{ width:100%; font-size:.72rem; color:var(--graphite); }
.fq4-form .lnk{ font-size:.72rem; color:var(--k-qa); text-decoration:underline; }
.fq4-form .ck{ font-size:.74rem; display:flex; gap:6px; align-items:center; padding:2px 4px; }
.fq4-form .ck i{ width:15px; height:15px; border:1px solid var(--graphite); border-radius:2px; display:inline-grid; place-items:center; font-style:normal; font-size:.72rem; }
.fq4-form .avail{ font-size:.72rem; border:1px solid var(--graphite); border-radius:3px; padding:1px 6px; background:var(--paper-2); }
.fq4-form .row.hl{ box-shadow:0 0 0 2px var(--k-qa); background:color-mix(in srgb, var(--k-qa) 8%, var(--paper)); }
.fq4-form.sz input[type=text], .fq4-form.sz input[type=password], .fq4-form.sz .box{ outline:2px solid var(--k-qa); outline-offset:1px; }
.fq4-form .ok{ color:var(--ok); font-weight:700; } .fq4-form .bad{ color:var(--pen); font-weight:700; }
.fq4-form .bad-in{ border-color:var(--pen) !important; box-shadow:0 0 0 1px var(--pen); }
.fq4-qs{ display:grid; grid-template-columns:repeat(2, 1fr); gap:6px; max-width:520px; margin:10px auto 0; } .fq4-qs div{ border:1px solid var(--line); border-radius:8px; padding:6px; font-size:.8rem; text-align:center; background:var(--paper); opacity:.45; transition:opacity .4s, box-shadow .4s; } .fq4-qs div.on{ opacity:1; box-shadow:0 0 0 2px var(--k-qa); }
.fq4-sig{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; padding:0 12px 12px; }
.fq4-sig .fig-btn.solid{ background:var(--s-qa); } .fq4-sig .fig-btn:hover{ border-color:var(--k-qa); }
.fq4-cq{ container-type:inline-size; } .fq4-sd{ text-align:center; margin:6px 0 0; font-size:.9rem; } .fq4-read{ display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; max-width:440px; margin:8px auto 0; } .fq4-read div{ border:1px solid var(--line); border-radius:10px; padding:8px; text-align:center; background:var(--paper); font-size:.82rem; color:var(--graphite); } .fq4-read b{ display:block; font:700 1.15rem var(--mono); color:var(--ink); }
.fq4-case{ max-width:560px; margin:0 auto; } .fq4-case table{ border-collapse:collapse; width:100%; font-size:.86rem; background:var(--paper); color:var(--ink); }
.fq4-case th, .fq4-case td{ border:1px solid var(--line); padding:4px 5px; text-align:center; } .fq4-case th{ font-size:.78rem; line-height:1.25; background:var(--paper-2); } .fq4-case th span{ display:block; font-weight:500; color:var(--graphite); font-family:"IBM Plex Sans Arabic", var(--body); }
.fq4-case th .sh{ display:none; } .fq4-case .ar1{ font-family:"IBM Plex Sans Arabic", var(--body); }
.fq4-case tr.cur td{ background:color-mix(in srgb, var(--k-qa) 16%, var(--paper)); } .fq4-case tr.tot td{ font-weight:700; } .fq4-case td.cur{ color:var(--k-qa); font-weight:700; }
.fq4-case td.six{ font-family:var(--mono); }
.fq4-calc{ text-align:center; font:700 1rem/1.3 var(--mono); color:var(--k-qa); min-height:1.4em; margin:0 0 8px; }
@container (max-width:420px){ .fq4-case th .lg, .fq4-case th span{ display:none; } .fq4-case th .sh{ display:inline; } }
.fq4-belts{ position:relative; max-width:480px; margin:0 auto; --w:14%; --r:40px; height:calc(5 * var(--r) + 34px); }
.fq4-belts .col{ position:absolute; bottom:0; width:var(--w); border:1px solid var(--line); border-bottom:0; box-sizing:border-box; }
.fq4-belts .band{ position:absolute; width:var(--w); height:34px; border-radius:3px; display:flex; align-items:center; justify-content:center; text-align:center; font:800 .72rem/1.05 var(--body); padding:0 2px; box-sizing:border-box; transition:opacity .9s; }
.fq4-belts .lbl{ position:absolute; height:34px; display:flex; align-items:center; justify-content:flex-end; text-align:right; font-size:.8rem; line-height:1.15; color:var(--ink); transition:opacity .9s; }
.fq4-belts .dot{ position:absolute; width:16px; height:16px; border-radius:50%; background:var(--k-qa); border:2px solid var(--paper); transition:right .8s ease, bottom .8s ease; }
.fq4-belts-t{ text-align:center; font-weight:700; font-size:1rem; margin:0 0 10px; }
.fq4-dm{ max-width:560px; margin:10px auto 0; font-size:.84rem; text-align:center; color:var(--graphite); }
@container (max-width:420px){ .fq4-web .banner{ grid-template-columns:1fr; } .fq4-web .tr{ justify-items:start; } .fq4-web .links{ text-align:left; } .fq4-qs{ grid-template-columns:1fr; } }
@media (prefers-reduced-motion: reduce){ .fq4-belts .dot, .fq4-belts .band, .fq4-belts .lbl{ transition:none; } }`;
  if (!document.getElementById('fq4-css')) { const s = document.createElement('style'); s.id = 'fq4-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── L5 slide 13: Figure 8.5, a web site with texts, hyperlinks and graphics ── */
  function WebParts({ ar }) {
    const steps = [
      { k: '', en: '<b>Figure 8.5: Website with Texts, Hyperlinks, and Graphics.</b> A screen image of the Infosys Web site: we can see all the fundamental elements such as texts, graphics, and hyperlinks.', ar: '<b>Figure 8.5</b>: صورة شاشة من موقع Infosys، وفيها كل الـ fundamental elements زي الـ texts والـ graphics والـ hyperlinks.' },
      { k: 'T', en: '<b>Text</b>: consider the targeted audience level, the terminology used, the depth of content, the subject matter, the accuracy of the information, and the routine aspects of spellings, punctuations and correct contact information (phone numbers, addresses).', ar: '<b>الـ Text</b>: بص على مستوى الـ audience المستهدف، والـ terminology المستخدمة، وعمق الـ content، والـ subject matter، ودقة المعلومات، وكمان الحاجات الروتينية زي الـ spelling والـ punctuation وصحة بيانات التواصل (أرقام التليفونات والعناوين).' },
      { k: 'H', en: '<b>Hyperlinks</b>: test each link takes the user to the correct destination and opens in the same tab or in a new window (no specification: test that it works). Links must be obvious: underlined text, mouse pointer changes. An e-mail link: send an e-mail and verify you get a response.', ar: '<b>الـ Hyperlinks</b>: اختبر إن كل link بيودي الـ user للمكان الصح وبيفتح في نفس الـ tab أو في window جديدة (لو مفيش specification، اختبر إنه شغال). الـ links لازم تبقى واضحة: text عليه خط، والـ mouse pointer بيتغير. لو الـ link بيفتح e-mail: ابعت e-mail واتأكد إن جالك رد.' },
      { k: 'G', en: '<b>Graphics</b>: check that all the graphics are loaded and display properly.', ar: '<b>الـ Graphics</b>: اتأكد إن كل الـ graphics اتحملت وبتظهر صح.' },
      { k: 'G', err: true, en: 'If a graphic is <b>missing or incorrectly named</b>, it will not load and the Web page will display an <b>error</b> where the graphic was meant to be.', ar: 'لو فيه graphic <b>ناقصة أو اسمها غلط</b>، مش هتتحمل والصفحة هتعرض <b>error</b> مكان الـ graphic.' },
      { k: 'F', en: 'The <b>Search</b> box is a text box, one of the <b>form</b> fields (8.2.4 Forms, Figure 8.6).', ar: 'الـ <b>Search</b> box ده text box، يعني field من الـ <b>forms</b> (8.2.4 Forms، Figure 8.6).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const st = steps[i];
    const c = k => (st.k === '' ? '' : st.k === k ? ' on' : ' dim');
    const tags = { T: 'Text', H: 'Hyperlinks', G: 'Graphics', F: 'Forms' };
    const links = ['Global [ Change ]', 'Contact Us', 'Careers', 'Investors', 'Blogs', 'Microsites'];
    const nav = ['Home', 'Building Tomorrow’s Enterprise', 'Offerings', 'Global Sourcing', 'Infosys Labs', 'Sustainability', 'Newsroom', 'About Us'];
    const stripe = ['#7c3aed', '#2563eb', '#0ea5e9', '#22c55e', '#facc15', '#f97316', '#ef4444'];
    return html`<figure className="fig"><div className="fig-stage fq4-cq">
      <div className=${'fq4-web' + (st.k === 'H' ? ' ul' : '')} role="img" aria-label="Simplified mock-up of Figure 8.5, the Infosys home page">
        <div className="hd">
          <div className="brand"><span className=${'logo' + c('G')}>Infosys<sup>®</sup></span>
            <span className="sl"><span><span className=${'slogan' + c('T')}>Building</span><span className=${'stripes' + c('G')}>${stripe.map(s => html`<i key=${s} style=${{ background: s }}></i>`)}</span></span><span className=${'slogan' + c('T')}>Tomorrow’s Enterprise</span></span></div>
          <div className="tr"><span className=${'links' + c('H')}>${links.map((l, j) => html`<span key=${j}>${j ? ' | ' : ''}<a>${l}</a></span>`)}</span>
            <span className=${'search' + c('F')}>Search <span aria-hidden="true">🔍</span></span></div>
        </div>
        <div className=${'nav' + c('H')}>${nav.map(n => html`<a key=${n}>${n}</a>`)}</div>
        <div className="banner">
          <div className=${'pic' + c('G') + (st.err ? ' err' : '')}>${st.err ? '⚠ error: graphic missing or incorrectly named' : '[picture: hands shaping a clay pot]'}</div>
          <div className=${'bt' + c('T')}><b>TRANSFORM.</b>Build Tomorrow’s Enterprise Today</div>
        </div>
      </div>
      <div style=${{ textAlign: 'center' }}><span className=${'fq4-tag ' + pop(st.k !== '')}>${tags[st.k] || 'Texts, hyperlinks, graphics'}</span></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L5 slide 17: Figure 8.6, Google's form ── */
  function GmailForm({ ar }) {
    const Q = ['Are the form fields positioned properly?', 'Are the fields the correct size?', 'Do they accept correct data?', 'Do they reject bad data?'];
    const steps = [
      { en: '<b>Forms</b> are text boxes, list boxes, and other fields that allow a user to enter or select information on a Web page. Figure 8.6: Google’s form, "Get started with Gmail".', ar: 'الـ <b>Forms</b> هي text boxes و list boxes و fields تانية بتخلي الـ user يدخل أو يختار معلومات في صفحة الويب. Figure 8.6: الـ form بتاع Google، "Get started with Gmail".' },
      { en: '1) <b>Are the form fields positioned properly?</b> Each label should sit next to its own field.', ar: '1) <b>هل الـ form fields في مكانها الصح؟</b> كل label المفروض يبقى جنب الـ field بتاعه.' },
      { en: '2) <b>Are the fields the correct size?</b>', ar: '2) <b>هل الـ fields مقاسها صح؟</b>' },
      { en: '3) <b>Do they accept correct data?</b> A login name like the form’s own example (JSmith) and a password of at least 8 characters should be accepted.', ar: '3) <b>هل بتقبل الـ data الصح؟</b> login name زي المثال اللي في الـ form نفسه (JSmith) و password فيه 8 حروف على الأقل المفروض يتقبلوا.' },
      { en: '4) <b>Do they reject bad data?</b> A password shorter than the form’s "Minimum of 8 characters in length" should be rejected. <b>Try it:</b> type in the password field.', ar: '4) <b>هل بترفض الـ data الغلط؟</b> password أقصر من "Minimum of 8 characters in length" اللي في الـ form المفروض يترفض. <b>جرّب:</b> اكتب في خانة الـ password.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const [pw, setPw] = useState(null);
    const fill = i >= 3;
    const pass = pw != null ? pw : i === 3 ? 'abcd1234' : i === 4 ? 'abc12' : '';
    const pwOk = pass.length >= 8, judged = pass.length > 0 && (pw != null || i >= 3);
    const hl = i === 1 ? ' hl' : '';
    const row = (label, body) => html`<div className=${'row' + hl}><b>${label}</b><div className="fld">${body}</div></div>`;
    const box = v => html`<span className="box">${fill ? v : ' '}</span>`;
    let en = steps[i].en, a = steps[i].ar;
    if (pw) { en = pass.length + ' characters: ' + (pwOk ? '<b>accepted</b> (at least 8).' : '<b>rejected</b>: Minimum of 8 characters in length.'); a = pass.length + ' حروف: ' + (pwOk ? '<b>اتقبل</b> (8 أو أكتر).' : '<b>اترفض</b>: Minimum of 8 characters in length.'); }
    return html`<figure className="fig"><div className="fig-stage fq4-cq">
      <div className=${'fq4-form' + (i === 2 ? ' sz' : '')}>
        <h4>Get started with Gmail</h4>
        ${row('First name:', box('John'))}
        ${row('Last name:', box('Smith'))}
        ${row('Desired Login Name:', html`${box('JSmith')}<span>@gmail.com</span>${fill && html`<span className="ok">✓</span>`}<span className="hint">Examples: JSmith, John.Smith</span><span className="avail">check availability!</span>`)}
        ${row('Choose a password:', html`<input type="password" value=${pass} aria-label="Choose a password" className=${judged && !pwOk ? 'bad-in' : ''} onChange=${e => setPw(e.target.value)} /><span className="lnk">Password strength:</span>${judged && html`<span className=${pwOk ? 'ok' : 'bad'}>${pwOk ? '✓' : '✕'}</span>`}<span className=${'hint' + (judged && !pwOk ? ' bad' : '')}>Minimum of 8 characters in length.</span>`)}
        ${row('Re-enter password:', html`<span className="box">${fill && pw == null ? '•'.repeat(pass.length) : ' '}</span>`)}
        <div className="ck"><i>✓</i>Stay signed in</div>
        <div className="ck"><i>✓</i>Enable Web History <span className="lnk">Learn More</span></div>
      </div>
      <div className="fq4-qs">${Q.map((q, k) => html`<div key=${k} className=${i === k + 1 || (i === 0) ? 'on' : ''}>${q}</div>`)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <${Bar} steps=${steps} i=${i} ctl=${{ go: j => { setPw(null); ctl.go(j); }, replay: () => { setPw(null); ctl.replay(); } }} /></figure>`;
  }

  /* ── L8 slide 4: the normal distribution, pick ±1σ to ±6σ ── */
  const SIG = [['68.27%', '317,300'], ['95.45%', '45,500'], ['99.73%', '2,700'], ['99.9937%', '63'], ['99.999943%', '0.57'], ['99.9999998%', '0.002']];
  function SigmaCurve({ ar }) {
    const [k, setK] = useState(calm() ? 3 : 1), [auto, setAuto] = useState(!calm());
    const [v, setV] = useState(k);
    useEffect(() => { if (!auto) return; if (k >= 6) { setAuto(false); return; } const t = setTimeout(() => setK(x => x + 1), 1700); return () => clearTimeout(t); }, [k, auto]);
    useEffect(() => {
      if (calm()) { setV(k); return; }
      let raf, from = v, t0 = performance.now();
      const tick = now => { const p = Math.min(1, (now - t0) / 500); setV(from + (k - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
    }, [k]);
    const cx = 180, s = 28, base = 196, H = 150;
    const X = z => cx + z * s, Y = z => base - H * Math.exp(-z * z / 2);
    const area = (a, b) => { let d = `M${X(a)},${base}`; const n = 60; for (let j = 0; j <= n; j++) { const z = a + (b - a) * j / n; d += ` L${X(z).toFixed(1)},${Y(z).toFixed(1)}`; } return d + ` L${X(b)},${base} Z`; };
    let curve = ''; for (let j = 0; j <= 240; j++) { const z = -6 + j / 20; curve += (j ? ' L' : 'M') + X(z).toFixed(1) + ',' + Y(z).toFixed(1); }
    const [pct, ppm] = SIG[k - 1];
    const pick = n => { setAuto(false); setK(n); };
    const en = `Between <b>\u00b1${k}\u03c3</b>: <b>${pct}</b> of the results lie inside; <b>${ppm} ppm</b> are out of spec. The wider the band in sigmas, the fewer parts per million fall outside it.`;
    const a = `بين <b>\u00b1${k}\u03c3</b>: <b>${pct}</b> من النتايج جوه؛ و<b>${ppm} ppm</b> برّه الـ spec. كل ما الـ band يوسع بعدد sigmas أكتر، كل ما الـ parts per million اللي برّه تقل.`;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 360 272" role="img" aria-label=${'Normal distribution, Gaussian curve, shaded between plus and minus ' + k + ' sigma'}>
        <text x="180" y="20" textAnchor="middle" fontSize="16" fontWeight="700">Normal Distribution - Gaussian Curve</text>
        <path d=${area(-6, -v)} style=${{ fill: 'color-mix(in srgb, var(--pen) 45%, var(--paper))' }} />
        <path d=${area(v, 6)} style=${{ fill: 'color-mix(in srgb, var(--pen) 45%, var(--paper))' }} />
        <path d=${area(-v, v)} style=${{ fill: 'color-mix(in srgb, var(--k-qa) 35%, var(--paper))' }} />
        <path d=${curve} fill="none" style=${{ stroke: 'var(--ink)' }} strokeWidth="3" />
        <line x1=${cx} y1=${base} x2=${cx} y2=${Y(0)} stroke="#84cc16" strokeWidth="3" />
        <line x1=${X(1)} y1=${base} x2=${X(1)} y2=${Y(1)} style=${{ stroke: 'var(--ink)' }} strokeWidth="1.5" />
        <line x1=${cx} y1=${Y(1)} x2=${X(1)} y2=${Y(1)} style=${{ stroke: 'var(--ink)' }} strokeWidth="1.5" />
        <text x=${(cx + X(1)) / 2} y=${Y(1) - 6} textAnchor="middle" fontSize="16" style=${{ fill: 'var(--pen)' }}>σ</text>
        <line x1="6" y1=${base} x2="354" y2=${base} style=${{ stroke: 'var(--ink)' }} strokeWidth="2.5" />
        ${[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(z => html`<g key=${z}><line x1=${X(z)} y1=${base} x2=${X(z)} y2=${base + (z % 2 ? 22 : 5)} style=${{ stroke: 'var(--line)' }} /><line x1=${X(z)} y1=${base} x2=${X(z)} y2=${base + 5} style=${{ stroke: 'var(--ink)' }} /><text x=${X(z)} y=${base + (z % 2 ? 37 : 20)} textAnchor="middle" fontSize="15" style=${{ fontWeight: Math.abs(z) === k ? 700 : 400, fill: Math.abs(z) === k ? 'var(--k-qa)' : 'var(--ink)' }}>${z === 0 ? '0' : (z > 0 ? '+' : '\u2212') + Math.abs(z) + 'σ'}</text></g>`)}
        <line x1=${X(-v)} y1="262" x2=${X(v)} y2="262" style=${{ stroke: 'var(--k-qa)' }} strokeWidth="2" />
        <path d=${`M${X(-v)},262 l8,-5 v10 z M${X(v)},262 l-8,-5 v10 z`} style=${{ fill: 'var(--k-qa)' }} />
        <text x="180" y="255" textAnchor="middle" fontSize="15" fontWeight="700">between +/\u2212 ${k}σ</text>
      </svg>
      <p className="fq4-sd">Sigma = σ = Deviation (Square root of variance)</p>
      <div className="fq4-read"><div><b>${pct}</b>inside ±${k}σ</div><div><b>${ppm} ppm</b>out of spec</div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fq4-sig">${[1, 2, 3, 4, 5, 6].map(n => html`<button key=${n} className=${'fig-btn' + (n === k ? ' solid' : '')} aria-pressed=${n === k} onClick=${() => pick(n)}>±${n}σ</button>`)}</div></figure>`;
  }

  /* shared: a cycle of five arrows around a circle (L8 slide 5 style) */
  const HUE = ['#43a047', '#d9539a', '#d4a514', '#5b7fd1', '#e0735a'];
  function Cycle({ ar, id, center, names, steps, ms }) {
    const [i, ctl] = useSteps(steps.length, ms);
    const cx = 220, cy = 190, r = 140, D = Math.PI / 180;
    const P = (a, rr) => (cx + rr * Math.sin(a * D)).toFixed(1) + ',' + (cy - rr * Math.cos(a * D)).toFixed(1);
    const R1 = r - 20, R2 = r + 20, h = 9;
    const band = (a0, a1) => `M${P(a0, R2)} A${R2},${R2} 0 0 1 ${P(a1 - h, R2)} L${P(a1 - h, R2 + 9)} L${P(a1, r)} L${P(a1 - h, R1 - 9)} L${P(a1 - h, R1)} A${R1},${R1} 0 0 0 ${P(a0, R1)} L${P(a0 + 7, r)} Z`;
    const last = steps.length - 1, on = j => i === 0 || i === last || i === j + 1;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="40 0 360 380" role="img" aria-label=${center + ' cycle: ' + names.join(', ')}>
        <defs>${names.map((n, j) => { const c = 36 + 72 * j, rev = c > 90 && c < 270; return html`<path key=${j} id=${id + '-t' + j} d=${rev ? `M${P(c + 30, r)} A${r},${r} 0 0 0 ${P(c - 30, r)}` : `M${P(c - 30, r)} A${r},${r} 0 0 1 ${P(c + 30, r)}`} />`; })}</defs>
        ${names.map((n, j) => { const c = 36 + 72 * j; return html`<g key=${j} className="fade" style=${{ opacity: on(j) ? 1 : .28 }}>
          <path d=${band(c - 33, c + 33)} style=${{ fill: `color-mix(in srgb, ${HUE[j]} ${i === j + 1 ? 60 : 38}%, var(--paper))`, stroke: HUE[j] }} strokeWidth="2" />
          <text fontSize="16" fontWeight="700" letterSpacing="1" dominantBaseline="central"><textPath href=${'#' + id + '-t' + j} startOffset="50%" textAnchor="middle">${n.toUpperCase()}</textPath></text></g>`; })}
        <circle cx=${cx} cy=${cy} r="72" fill="none" style=${{ stroke: 'var(--ink)' }} strokeWidth="5" />
        <text x=${cx} y=${cy + 10} textAnchor="middle" fontSize="28" fontWeight="800">${center}</text>
        ${i === last && !calm() && html`<circle cx=${cx} cy=${cy - r} r="7" style=${{ fill: 'var(--ink)' }}><animateTransform attributeName="transform" type="rotate" from=${'0 ' + cx + ' ' + cy} to=${'360 ' + cx + ' ' + cy} dur="6s" repeatCount="indefinite" /></circle>`}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 slide 5: the DMADV Methodology figure ── */
  function Dmadv({ ar }) {
    const names = ['Define', 'Measure', 'Analyze', 'Design', 'Verify'];
    const steps = [
      { en: 'The <b>DMADV Methodology</b> figure: five arrows in a cycle around DMADV.', ar: 'شكل الـ <b>DMADV Methodology</b>: 5 أسهم في دايرة حوالين DMADV.' },
      ...names.map((n, j) => ({ en: (j + 1) + ') <b>' + n + '</b>' + (j ? ', after ' + names[j - 1] + '.' : '.'), ar: (j + 1) + ') <b>' + n + '</b>' + (j ? '، بعد ' + names[j - 1] + '.' : '.') })),
      { en: 'Verify leads back to Define: the arrows form a closed cycle. (The figure names the phases only.)', ar: 'الـ Verify بيرجع للـ Define: الأسهم بتعمل دايرة مقفولة. (الشكل بيكتب أسماء الـ phases بس.)' }
    ];
    return html`<${Cycle} ar=${ar} id="fq4-dmadv" center="DMADV" names=${names} steps=${steps} ms=${1700} />`;
  }

  /* ── L8 slides 5 to 7: the DMAIC steps ── */
  function Dmaic({ ar }) {
    const names = ['Define', 'Measure', 'Analyze', 'Improve', 'Control'];
    const steps = [
      { en: 'The 6 Sigma methodology is <b>DMAIC</b>: Define, Measure, Analyze, Improve, Control.', ar: 'الـ methodology بتاعة 6 Sigma هي <b>DMAIC</b>: Define و Measure و Analyze و Improve و Control.' },
      { en: '<b>Define</b>: identify what needs to be improved through the precise identification of the problems that obstacle this improvement. The problem statement includes the level of the problem, its location and its financial impact. Form a team to solve the problem.', ar: '<b>Define</b>: حدد إيه اللي محتاج يتحسن عن طريق تحديد دقيق للمشاكل اللي معطلة التحسين ده. الـ problem statement بيشمل مستوى المشكلة ومكانها والـ financial impact بتاعها. وكوّن team يحل المشكلة.' },
      { en: '<b>Measure</b>: plan and implement performance measurement against the requirements and expectations of customers, with criteria for measuring defects using statistical control tools.', ar: '<b>Measure</b>: خطط ونفذ قياس للـ performance قصاد requirements وتوقعات العملاء، بـ criteria لقياس الـ defects باستخدام أدوات الـ statistical control.' },
      { en: '<b>Analyze</b>: analyze the collected data to determine the root causes of all problems: analyze the chain of failure causes, rank them by impact, categorize them, then control and manage them.', ar: '<b>Analyze</b>: حلل الـ data اللي اتجمعت عشان تحدد الـ root causes لكل المشاكل: حلل سلسلة أسباب الـ failure، ورتبها حسب تأثيرها، وصنفها، وبعدين اتحكم فيها وأدرها.' },
      { en: '<b>Improve</b>: change the processes to eliminate product defects, excessive costs and waste. Study the causes of failure, find solutions, test them on a sample of products, determine the results and make the necessary corrections.', ar: '<b>Improve</b>: غيّر في الـ processes عشان تشيل الـ defects والتكاليف الزيادة والـ waste. ادرس أسباب الـ failure، لاقي حلول، جربها على sample من المنتجات، شوف النتايج واعمل التصحيحات اللازمة.' },
      { en: '<b>Control</b>: keep monitoring all of these processes and do not stop: continuously measure performance standards, conduct measurement processes, and correct any deviations at the specified time.', ar: '<b>Control</b>: فضل راقب كل الـ processes دي ومتوقفش: قيس الـ performance standards باستمرار، واعمل عمليات القياس، وصحح أي deviations في وقتها.' },
      { en: 'Control does not stop, as there are <b>always areas in need of improvement</b>.', ar: 'الـ Control مبيقفش، لأن <b>دايماً فيه حاجات محتاجة تتحسن</b>.' }
    ];
    return html`<${Cycle} ar=${ar} id="fq4-dmaic" center="DMAIC" names=${names} steps=${steps} ms=${3600} />`;
  }

  /* ── L8 slide 10: Six sigma = 6 × standard deviation, row by row ── */
  const CASE = [['X1', '2.08', '1.22', '7.32'], ['X2', '3.00', '0.98', '5.88'], ['X3', '3.30', '1.04', '6.24'], ['X4', '2.87', '0.96', '5.76'], ['X5', '3.37', '1.17', '7.02'], ['X6', '3.00', '1.05', '6.30'], ['X7', '3.06', '1.27', '7.62'], ['X8', '3.00', '1.06', '6.36'], ['X9', '3.11', '0.91', '5.46'], ['X10', '2.51', '1.03', '6.18']];
  const TOT = ['Overall indicator', '2.99', '1.07', '6.42'];
  function SigmaCase({ ar }) {
    const rows = CASE.concat([TOT]);
    const steps = [
      { en: '<b>Six Sigma for failure cases in the preparatory certificate</b>: for each subject, the mean and the standard deviation. The Six sigma column is <b>6 × standard deviation</b>.', ar: '<b>Six Sigma لحالات الرسوب في الشهادة الإعدادية</b>: لكل مادة، المتوسط الحسابي والانحراف المعياري. عمود الـ Six sigma هو <b>6 × الانحراف المعياري</b>.' },
      ...rows.map(r => ({ en: (r === TOT ? '<b>Overall indicator</b> (المؤشر الكلي)' : '<b>' + r[0] + '</b>') + ': 6 × ' + r[2] + ' = <b>' + r[3] + '</b>' + (r === TOT ? ' (overall mean ' + r[1] + ').' : '.'), ar: (r === TOT ? '<b>المؤشر الكلي</b>' : '<b>' + r[0] + '</b>') + ': 6 × ' + r[2] + ' = <b>' + r[3] + '</b>' + (r === TOT ? ' (المتوسط الكلي ' + r[1] + ').' : '.') })),
      { en: 'Applying DMAIC: <b>Define</b> these causes; <b>Measure</b> the impact of their magnitude; <b>Analyze</b> the sources and elements; <b>Improve</b>: derive solutions, reducing failure cases and increasing the level of success; <b>Control</b>: continuously monitor the improvement processes.', ar: 'تطبيق الـ DMAIC: <b>Define</b> الأسباب دي؛ <b>Measure</b> حجم تأثيرها؛ <b>Analyze</b> المصادر والعناصر؛ <b>Improve</b>: طلّع حلول تقلل حالات الرسوب وتزود مستوى النجاح؛ <b>Control</b>: راقب عمليات التحسين باستمرار.' }
    ];
    const [i, ctl] = useSteps(steps.length, 1500);
    const cr = i >= 1 && i <= rows.length ? rows[i - 1] : null;
    return html`<figure className="fig"><div className="fig-stage fq4-cq"><div className="fq4-case">
      <p className="fq4-calc" aria-live="polite">${cr ? (cr === TOT ? 'Overall' : cr[0]) + ': 6 × ' + cr[2] + ' = ' + cr[3] : 'Six sigma = 6 × SD'}</p>
      <table><thead><tr><th><b className="lg">Subject</b><b className="sh">Subject</b><span>المواد</span></th><th><b className="lg">Mean</b><b className="sh">Mean</b><span>المتوسط الحسابي</span></th><th><b className="lg">Std. deviation</b><b className="sh">SD</b><span>الإنحراف المعياري</span></th><th><b className="lg">Six sigma</b><b className="sh">Six sigma</b><span>6 × SD</span></th></tr></thead>
      <tbody>${rows.map((r, j) => { const cur = i === j + 1, shown = i >= j + 1; return html`<tr key=${j} className=${(cur ? 'cur' : '') + (r === TOT ? ' tot' : '')}>
        <td>${r === TOT ? html`${r[0]}<br /><span className="ar1">المؤشر الكلي</span>` : r[0]}</td><td>${r[1]}</td><td className=${cur ? 'cur' : ''}>${r[2]}</td>
        <td className=${'six' + (cur ? ' cur' : '')}><span className=${pop(shown)}>${r[3]}</span></td></tr>`; })}</tbody></table></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 slide 11: Levels of Six Sigma Certification ── */
  function Belts({ ar }) {
    const B = [['White Belt', '#6b4ea2', '#fff'], ['Yellow Belt', '#2b9fd8', '#fff'], ['Green Belt', '#2f9a72', '#fff'], ['Black Belt', '#f2a81d', '#111'], ['Master Black Belt', '#e2412f', '#fff']];
    const steps = [
      { en: '<b>Levels of Six Sigma Certification</b>: a staircase of five steps.', ar: '<b>مستويات الـ Six Sigma Certification</b>: سلم فيه 5 درجات.' },
      { en: '<b>Step 1: White Belt</b>, the bottom step.', ar: '<b>Step 1: White Belt</b>، أول درجة تحت.' },
      { en: '<b>Step 2: Yellow Belt</b>, applied to all employees.', ar: '<b>Step 2: Yellow Belt</b>، بيتطبق على كل الموظفين.' },
      { en: '<b>Step 3: Green Belt</b>, applied to executive employees.', ar: '<b>Step 3: Green Belt</b>، بيتطبق على الـ executive employees.' },
      { en: '<b>Step 4: Black Belt</b>, applied to middle management and senior management.', ar: '<b>Step 4: Black Belt</b>، بيتطبق على الـ middle management والـ senior management.' },
      { en: '<b>Step 5: Master Black Belt</b>, the top step, applied to senior management.', ar: '<b>Step 5: Master Black Belt</b>، آخر درجة فوق، بيتطبق على الـ senior management.' }
    ];
    const [i, ctl] = useSteps(steps.length, 1900);
    const R = (k, add) => `calc(${k - 1} * var(--w)${add ? ' + ' + add : ''})`, Up = k => `calc(${k - 1} * var(--r))`;
    const dk = i;
    return html`<figure className="fig"><div className="fig-stage">
      <p className="fq4-belts-t">Levels of Six Sigma Certification</p>
      <div className="fq4-belts" role="img" aria-label="Levels of Six Sigma Certification, steps 1 to 5">
        ${[5, 4, 3, 2, 1].map(k => html`<div key=${'c' + k} className="col" style=${{ right: R(k), height: `calc(${k - 1} * var(--r) + 34px)`, background: `color-mix(in srgb, var(--ink) ${4 + k * 2}%, var(--paper))` }}></div>`)}
        ${B.map(([n, c, t], j) => { const k = j + 1, reached = i === 0 || i >= k; return html`<div key=${k}>
          <div className="band" style=${{ right: R(k), bottom: Up(k), background: c, color: t, opacity: reached ? 1 : .3 }}>STEP ${k}</div>
          <div className="lbl" style=${{ right: R(k, 'var(--w) + 6px'), bottom: Up(k), maxWidth: `calc(100% - ${k} * var(--w) - 6px)`, fontWeight: i === k ? 700 : 400, opacity: reached ? 1 : .3 }}>${n}</div></div>`; })}
        <div className="dot" style=${{ right: R(dk || 1, 'var(--w) / 2 - 8px'), bottom: `calc(${(dk || 1) - 1} * var(--r) + 38px)`, opacity: dk ? 1 : 0 }}></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'qa-web-parts': WebParts, 'qa-gmail-form': GmailForm, 'qa-sigma-curve': SigmaCurve, 'qa-dmadv': Dmadv, 'qa-dmaic': Dmaic, 'qa-sigma-case': SigmaCase, 'qa-belts': Belts });
})();


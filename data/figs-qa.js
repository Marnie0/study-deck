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
      { en: '<b>Figure 1.1 Waterfall Model</b>: one of the oldest software lifecycle models. The process starts at the system level and is followed by phases like analysis, design, coding, testing and maintenance.', ar: 'شكل <b>Figure 1.1 Waterfall Model</b>: من أقدم الـ software lifecycle models. الـ process بتبدأ من <b>الـ system level</b> وبعدها phases زي الـ analysis والـ design والـ coding والـ testing والـ maintenance.' },
      { en: '1. <b>System Engineering</b>: defines both software and hardware requirements necessary for development.', ar: '<bdi dir="ltr">1.</bdi> الـ <b>System Engineering</b>: بيحدد الـ software requirements والـ hardware requirements الاتنين اللي محتاجينهم للتطوير.' },
      { en: '2. <b>Analysis</b>: involves feasibility studies and setting the goals, performance, and interface requirements.', ar: '<bdi dir="ltr">2.</bdi> الـ <b>Analysis</b>: فيه feasibility studies وتحديد الـ goals والـ performance والـ interface requirements.' },
      { en: '3. <b>Design</b>: translates requirements into software structure, such as database design, to guide coding and ensure quality.', ar: '<bdi dir="ltr">3.</bdi> الـ <b>Design</b>: بيحوّل الـ requirements لـ software structure، زي الـ database design، عشان يوجّه الـ coding ويضمن الـ quality.' },
      { en: '4. <b>Coding</b>: developers write the program code based on the design specifications.', ar: '<bdi dir="ltr">4.</bdi> الـ <b>Coding</b>: الـ developers بيكتبوا الـ program code على أساس الـ design specifications.' },
      { en: '5. <b>Testing</b>: the software is tested to detect bugs and verify that it meets the stated requirements.', ar: '<bdi dir="ltr">5.</bdi> الـ <b>Testing</b>: بنختبر الـ software عشان نكتشف الـ bugs ونتأكد إنه ماشي على الـ requirements المذكورة.' },
      { en: '6. <b>Maintenance</b>: fixes issues and updates the software as new needs arise.', ar: '<bdi dir="ltr">6.</bdi> الـ <b>Maintenance</b>: بيصلّح المشاكل ويعمل update للـ software لما تظهر احتياجات جديدة.' },
      { en: 'A vertical line rises from Maintenance and is joined by <b>two-headed arrows</b> to every earlier phase, so each later phase can feed back to the earlier ones.', ar: 'فيه خط رأسي طالع من الـ Maintenance ومتوصل بـ <b>أسهم بوشين (two-headed)</b> بكل الـ phases اللي قبله، يعني كل phase متأخرة ممكن ترجع feedback للـ phases اللي قبلها.' },
      { en: '<b>Advantages</b>: simple, structured, clear documentation, early requirements, easy management. <b>Drawback</b>: errors made in early phases can carry over to later stages, causing delays and increased costs since problems must be fixed at multiple points.', ar: '<b>المميزات</b>: بسيط، و structured، والـ documentation واضحة، والـ requirements بدري، وإدارته سهلة. <b>العيب</b>: الـ errors اللي بتحصل في الـ phases الأولانية ممكن تنتقل للمراحل اللي بعدها، وده بيعمل تأخير وتكلفة أكتر لأن المشاكل لازم تتصلح في أكتر من مكان.' }
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
      { en: '<b>Figure 1.2 Spiral Model</b>: two axes split the figure into four quadrants. The vertical axis points up to <b>Cumulative cost</b>, the horizontal axis points left to <b>Review</b>, and the <b>Progress</b> arrow shows the spiral turning clockwise and widening outward.', ar: 'شكل <b>Figure 1.2 Spiral Model</b>: فيه محورين بيقسموا الشكل لـ 4 أرباع. المحور الرأسي سهمه لفوق لـ <b>Cumulative cost</b>، والأفقي سهمه للشمال لـ <b>Review</b>، وسهم الـ <b>Progress</b> بيوضح إن الـ spiral بيلف مع عقارب الساعة وبيوسع لبره.', q: -1, chips: [] },
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
      { en: '<b>Figure 1.3 V Model</b>: the V-Model integrates testing into every stage of the software development life cycle. It emphasizes early testing, starting from the requirements phase, ensuring continuous quality checks throughout the process.', ar: 'شكل <b>Figure 1.3 V Model</b>: الـ V-Model بيدخّل الـ testing في كل stage من الـ software development life cycle. بيركز على الـ testing بدري، من أول الـ requirements phase، وده بيضمن quality checks مستمرة طول الـ process.' },
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
      ${label(x + w / 2, y + H / 2, t, on, 13.4)}</g>`;
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
            ${t.map((s, j) => html`<text key=${j} x=${mid} y=${Y(r) + (r === 3 ? 19 : 12) + j * 15} textAnchor="middle" fontSize="13.4" fontWeight=${on ? 700 : 500} style=${on ? { fill: 'var(--k-qa)' } : null}>${s}</text>`)}</g>`; })}
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
      { en: '1. <b>Create the test code</b>: the developer writes automated test scripts before writing the actual program code. These tests define what the software should do.', ar: '<bdi dir="ltr">1.</bdi> خطوة <b>Create the test code</b>: الـ developer بيكتب automated test scripts قبل ما يكتب الـ program code الحقيقي. الـ tests دي بتحدد الـ software المفروض يعمل إيه.', b: 0 },
      { en: '2. <b>Write or modify the functional code</b>: the developer then writes the actual code to pass the predefined test cases. The code is adjusted until it meets all test requirements.', ar: '<bdi dir="ltr">2.</bdi> خطوة <b>Write or modify the functional code</b>: بعدها الـ developer بيكتب الـ code الحقيقي عشان يعدّي الـ test cases المحددة مسبقًا، وبيتعدل لحد ما يحقق كل الـ test requirements.', b: 1 },
      { en: '3. <b>Create additional tests</b>: the tester adds more tests with different inputs based on the complexity of the module.', ar: '<bdi dir="ltr">3.</bdi> خطوة <b>Create additional tests</b>: الـ tester بيزود tests تانية بـ inputs مختلفة على حسب تعقيد الـ module.', b: 2 },
      { en: '4. <b>Test the functional code</b>: the functional code is tested repeatedly using the created test cases until all tests pass successfully.', ar: '<bdi dir="ltr">4.</bdi> خطوة <b>Test the functional code</b>: الـ functional code بيتختبر أكتر من مرة بالـ test cases اللي اتعملت لحد ما كل الـ tests تعدّي بنجاح.', b: 3 },
      { en: 'The <b>loop arrow</b> goes from Test the functional code back up to Write or modify the function code: the code is adjusted and tested again until all tests pass.', ar: '<b>السهم الراجع (loop)</b> بيروح من Test the functional code لفوق لـ Write or modify the function code: الـ code بيتعدل ويتختبر تاني لحد ما كل الـ tests تعدّي.', b: 5 },
      { en: '5. <b>Refactor the code</b>: the developer improves the code to make it easier to maintain, extend, and update. This step removes duplicate or unused code and reduces complexity.', ar: '<bdi dir="ltr">5.</bdi> خطوة <b>Refactor the code</b>: الـ developer بيحسّن الـ code عشان يبقى أسهل في الـ maintenance والتوسيع والـ update. الخطوة دي بتشيل الـ code المتكرر أو اللي مش مستخدم وبتقلل التعقيد.', b: 4 }
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
      { en: '<b>1. Small Team Structure</b>: the Development Manager is at the top, with the Testers and the Programmers under him.<br><b>Pros</b>: fast communication between developers and testers.<br><b>Cons</b>: if the development manager is not experienced he/she may ignore bug reports to motivate the team to deliver.', ar: '<b><bdi dir="ltr">1.</bdi> الـ Small Team Structure</b>: الـ Development Manager فوق خالص، وتحته الـ Testers والـ Programmers.<br><b>المميزات</b>: تواصل سريع بين الـ developers والـ testers.<br><b>العيوب</b>: لو الـ development manager مش experienced ممكن يطنّش الـ bug reports عشان يحمّس الـ team إنه يسلّم.' },
      { en: '<b>2. Organizational Structure for an Independent Team</b>: the Project Manager is at the top, with two branches: the Test Manager/Test Lead, with the Testers under him, and the Development Manager, with the Programmers under him.<br><b>Pros</b>: the testing team\'s feedback is considered in decision-making.<br><b>Cons</b>: the final decision lies with the project manager, which may affect quality in critical projects.', ar: '<b><bdi dir="ltr">2.</bdi> الـ Organizational Structure for an Independent Team</b>: الـ Project Manager فوق خالص، وتحته فرعين: الـ <bdi dir="ltr">Test Manager/Test Lead</bdi> وتحته الـ Testers، والـ Development Manager وتحته الـ Programmers.<br><b>المميزات</b>: الـ feedback بتاع الـ testing team بيتاخد في الاعتبار في القرارات.<br><b>العيوب</b>: القرار الأخير في إيد الـ project manager، وده ممكن يأثر على الـ quality في المشاريع الـ critical.' },
      { en: '<b>3. Test Group Reporting to Executive Management</b>: the Executive Manager is at the top, with the QA/Test Managers, the Development Managers and the Project Managers under him.<br><b>Pros</b>: independence of the quality team; quality reports reach senior management directly.', ar: '<b><bdi dir="ltr">3.</bdi> الـ Test Group Reporting to Executive Management</b>: الـ Executive Manager فوق خالص، وتحته الـ <bdi dir="ltr">QA/Test Managers</bdi> والـ Development Managers والـ Project Managers.<br><b>المميزات</b>: الـ quality team مستقل؛ والـ quality reports بتوصل للـ senior management على طول.' }
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
      { en: 'Arrow <b>Process Definition</b> to <b>Level 3 (Defined)</b>: standardized processes are developed and refined over time. Management ensures process consistency across the organization, and project teams tailor processes based on these standards.', ar: 'سهم <b>Process Definition</b> لـ <b>الـ Level 3 (Defined)</b>: الـ processes الـ standard بتتعمل وبتتحسن مع الوقت. الـ management بيضمن إن الـ processes ثابتة على مستوى الـ organization كلها، والـ project teams بتعدل الـ processes على مقاسها بناءً على الـ standards دي.' },
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
      { en: 'Steps to begin DBB testing: (1) have the documents or specifications, (2) define test cases. Example: the addition function of the Windows Calculator. Tap a test case.', ar: 'خطوات البداية في الـ DBB testing: أولاً يبقى معاك الـ documents أو الـ specifications، وتانيًا تحدد الـ test cases. مثال: عملية الجمع في الـ Windows Calculator. دوس على test case.' },
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
    return { en: `<b>${v}</b> (${b.title.toLowerCase()}) is in <b>${P}</b>, an <b>${valid ? 'valid' : 'invalid'}</b> partition: ${en}.`.replace('an <b>valid', 'a <b>valid'), ar: `القيمة <b>${v}</b> (${b.titleAr}) في <b>${P}</b>، وده <b>${valid ? 'valid' : 'invalid'}</b> partition: ${a}.` };
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
      { en: '<b>Incorrect Password</b> loops back to the same state; the output is <b>Clear the field</b>.', ar: 'الـ input <b>Incorrect Password</b> بيرجع لنفس الـ state؛ والـ output هو <b>Clear the field</b>.' },
      { en: '<b>Correct Password</b> leaves the state; the output is <b>Initiate Destruct</b>.', ar: 'الـ input <b>Correct Password</b> بيخرج من الـ state؛ والـ output هو <b>Initiate Destruct</b>.' },
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
      if (a === 'new') return { ...g, s: 'OFF', last: null, log: g.log.concat([['<Off>']]), seen: g.seen, msg: { en: 'New test case: back to <b>OFF</b>.', ar: 'بدأنا test case جديدة، فرجعنا لـ <b>OFF</b>.' } };
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
    if (g.seen.length === 4 && g.done.length < 8 && g.msg) m = { en: m.en + ' All 4 states visited. The slide does it in <b>1 test case</b>: &lt;Off&gt; play => fast forward => fast forward.', ar: m.ar + ' زرت الـ 4 states كلهم. الـ slide بتعملها في <b>test case واحدة</b>:<span class="ltr">&lt;Off&gt; play => fast forward => fast forward</span>' };
    if (g.done.length === 8 && g.msg) m = { en: m.en + ' All 8 transitions exercised. The slide does it with <b>2 test cases</b>.', ar: m.ar + ' جربت الـ 8 transitions كلهم. الـ slide بتعملها بـ <b>2 test cases</b>.' };
    const tc = g.log.filter(l => l.length > 1).length || 1;
    return html`<figure className="fig fq2"><div className="fig-stage">
      <svg viewBox="0 0 340 380" style=${{ maxWidth: '460px' }} role="img" aria-label=${'Media player state transition diagram; current state ' + MNAME[g.s]}>
        <defs><marker id="fq2-mp-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" /></marker>
          <marker id="fq2-mp-ahk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--k-qa)" /></marker></defs>
        ${MT.map(([f, a, t, d, lx, ly, an], k) => { const on = g.last === k, was = g.done.includes(k); return html`<g key=${k}>
          <path d=${d} fill="none" stroke=${on ? 'var(--k-qa)' : 'var(--ink)'} strokeWidth=${on ? 4 : 2} strokeOpacity=${on || was ? 1 : .7} markerEnd=${`url(#fq2-mp-ah${on ? 'k' : ''})`} />
          <text x=${lx} y=${ly} textAnchor=${an} fontSize="15" fontWeight=${on ? 700 : 600} className=${on ? 'fq2-k' : 'fq2-mut'}>${BTN[a]}${was ? ' ✓' : ''}</text></g>`; })}
        ${Object.entries(MS).map(([k, [x, y, L]]) => { const on = g.s === k; return html`<g key=${k}>
          <rect x=${x - 42} y=${y - 25} width="84" height="50" rx="10" fill=${on ? 'var(--s-qa)' : 'var(--paper)'} stroke=${on ? 'var(--s-qa)' : 'var(--ink)'} strokeWidth="2" />
          ${L.map((w, j) => html`<text key=${j} x=${x} y=${y + 5 + (j - (L.length - 1) / 2) * 17} textAnchor="middle" fontSize="15" fontWeight="700" className=${on ? 'fq2-w' : ''}>${w}</text>`)}</g>`; })}
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
      { en: 'For a successful formal review, <b>4 essential elements</b> are required: 1- Identify Problems 2- Follow Rules 3- Prepare 4- Write a Report.', ar: 'عشان الـ formal review ينجح، لازم <b>4 حاجات أساسية</b> (essential elements):<span class="ltr">1- Identify Problems 2- Follow Rules 3- Prepare 4- Write a Report</span>' }
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
      a = `الـ <bdi dir="ltr">Date$ = "${r[0]}"</bdi> بيخلي جزء الـ Date <b>${tf(dT)}</b>؛ والـ <bdi dir="ltr">Time$ = "${r[1]}"</bdi> بيخلي جزء الـ Time <b>${tf(tT)}</b>. مع الـ AND الـ IF بيبقى <b>${tf(both)}</b>، فالسطور <b><bdi dir="ltr">${r[2].join(', ')}</bdi></b> بتتنفذ${both ? '' : ' (السطرين 3 و 4 بيتخطوا)'}.`;
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
      { en: 'Figure 1.3, V Model. The left side goes down: Requirements Specifications → Functional Specifications → System Design → Unit Design → Code. This side is <b>Verification</b>.', ar: 'الـ Figure 1.3، الـ V Model. الجنب الشمال نازل:<span class="ltr">Requirements Specifications → Functional Specifications → System Design → Unit Design → Code</span>الجنب ده هو الـ <b>Verification</b>.' },
      { en: 'From Code the right side goes up: Unit Test → Integration Test → System Test → Acceptance Test. This side is <b>Validation</b>.', ar: 'من الـ Code الجنب اليمين طالع:<span class="ltr">Unit Test → Integration Test → System Test → Acceptance Test</span>الجنب ده هو الـ <b>Validation</b>.' },
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
      { en: 'Consider foo(). Each numbered statement is a node of the <b>control flow graph</b>: 6 nodes.', ar: 'خد الـ <bdi dir="ltr">foo()</bdi>. كل statement عليه رقم بيبقى node في الـ <b>control flow graph</b>، يعني 6 nodes.' },
      { en: '<b>True Branch</b> (thick arrows): 1 → 2 when (a>1 && b==0) is true, and 3 → 4 when (a==2 || x>1) is true.', ar: 'الـ <b>True Branch</b> (الأسهم التقيلة): <bdi dir="ltr">1&nbsp;→&nbsp;2</bdi> لما <bdi dir="ltr">(a>1&nbsp;&amp;&amp;&nbsp;b==0)</bdi> تبقى true، و <bdi dir="ltr">3&nbsp;→&nbsp;4</bdi> لما <bdi dir="ltr">(a==2&nbsp;||&nbsp;x>1)</bdi> تبقى true.' },
      { en: '<b>False Branch</b> (dotted arrows): 1 → 3 skips line 2, and 3 → 5 goes to the else.', ar: 'الـ <b>False Branch</b> (الأسهم المنقطة): <bdi dir="ltr">1&nbsp;→&nbsp;3</bdi> بيتخطى سطر 2، و <bdi dir="ltr">3&nbsp;→&nbsp;5</bdi> بيروح للـ else.' },
      { en: '<b>Sequential Branch</b> (thin arrows): 2 → 3, 4 → 6 and 5 → 6. That makes <b>7 edges</b>.', ar: 'الـ <b>Sequential Branch</b> (الأسهم الرفيعة): <bdi dir="ltr">2&nbsp;→&nbsp;3</bdi> و <bdi dir="ltr">4&nbsp;→&nbsp;6</bdi> و <bdi dir="ltr">5&nbsp;→&nbsp;6</bdi>. كده بقوا <b><bdi dir="ltr">7&nbsp;edges</bdi></b>.' },
      { en: 'Cyclomatic Complexity: <b>E(G) − N(G) + 2 = 7 − 6 + 2 = 3</b>. So there are 3 basis paths.', ar: 'الـ Cyclomatic Complexity:<span class="ltr"><b>E(G) − N(G) + 2 = 7 − 6 + 2 = 3</b></span>يبقى فيه 3 basis paths.' },
      ...FOO_P.map(([p, t], k) => ({ en: `Basis path ${k + 1}: <b>${p.join(',')}</b>. Test case: ${t}.`, ar: `الـ Basis path رقم ${k + 1}: <b><bdi dir="ltr">${p.join(',')}</bdi></b>. والـ test case بتاعه:<span class="ltr">${t}</span>` }))
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
      a = `مع <bdi dir="ltr">(${key})</bdi>: السطور <b><bdi dir="ltr">${lines.join(', ')}</bdi></b> بتتنفذ وبيطبع <b>${res.type}</b>. على الـ control flow graph التنفيذ بينزل:<span class="ltr">a → c → e → g → i</span>${sideEn.length ? 'وبيعدي على ' + sideEn.map(x => 'الـ ' + x).join(' و') : 'من غير ما يعدي على أي side node'}.`;
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
      { en: 'Control flow graph for triangle program: a chain of nodes <b>a → c → e → g → i</b>.', ar: 'الـ Control flow graph بتاع الـ triangle program: سلسلة nodes:<span class="ltr"><b>a → c → e → g → i</b></span>' },
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
      else { en = `<b>${m === 'push' ? 'Push' : 'Pop'}</b>: ${f} → <b>${t}</b>.`; a = `الـ <b>${m}</b>: <bdi dir="ltr">${f} → ${t}</bdi>.`; }
      if (last.fp) { en += ` The last two calls are function pair <b>${last.fp}</b>: ${FP_LIST[last.fp - 1]}.`; a += ` آخر اتنين calls هما الـ function pair رقم <b>${last.fp}</b>:<span class="ltr">${FP_LIST[last.fp - 1]}</span>`; }
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
      { k: '', en: '<b>Figure 8.5: Website with Texts, Hyperlinks, and Graphics.</b> A screen image of the Infosys Web site: we can see all the fundamental elements such as texts, graphics, and hyperlinks.', ar: 'شكل <b>Figure 8.5</b>: صورة شاشة من موقع Infosys، وفيها كل الـ fundamental elements زي الـ texts والـ graphics والـ hyperlinks.' },
      { k: 'T', en: '<b>Text</b>: consider the targeted audience level, the terminology used, the depth of content, the subject matter, the accuracy of the information, and the routine aspects of spellings, punctuations and correct contact information (phone numbers, addresses).', ar: '<b>الـ Text</b>: بص على مستوى الـ audience المستهدف، والـ terminology المستخدمة، وعمق الـ content، والـ subject matter، ودقة المعلومات، وكمان الحاجات الروتينية زي الـ spelling والـ punctuation وصحة بيانات التواصل (أرقام التليفونات والعناوين).' },
      { k: 'H', en: '<b>Hyperlinks</b>: test each link takes the user to the correct destination and opens in the same tab or in a new window (no specification: test that it works). Links must be obvious: underlined text, mouse pointer changes. An e-mail link: send an e-mail and verify you get a response.', ar: '<b>الـ Hyperlinks</b>: اختبر إن كل link بيودي الـ user للمكان الصح وبيفتح في نفس الـ tab أو في window جديدة (لو مفيش specification، اختبر إنه شغال). الـ links لازم تبقى واضحة: text عليه خط، والـ mouse pointer بيتغير. لو الـ link بيفتح e-mail: ابعت e-mail واتأكد إن جالك رد.' },
      { k: 'G', en: '<b>Graphics</b>: check that all the graphics are loaded and display properly.', ar: '<b>الـ Graphics</b>: اتأكد إن كل الـ graphics اتحملت وبتظهر صح.' },
      { k: 'G', err: true, en: 'If a graphic is <b>missing or incorrectly named</b>, it will not load and the Web page will display an <b>error</b> where the graphic was meant to be.', ar: 'لو فيه graphic <b>ناقصة أو اسمها غلط</b>، مش هتتحمل والصفحة هتعرض <b>error</b> مكان الـ graphic.' },
      { k: 'F', en: 'The <b>Search</b> box is a text box, one of the <b>form</b> fields (8.2.4 Forms, Figure 8.6).', ar: 'الـ <b>Search</b> box ده text box، يعني field من الـ <b>forms</b> (<bdi dir="ltr">8.2.4 Forms, Figure 8.6</bdi>).' }
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
      { en: '<b>Forms</b> are text boxes, list boxes, and other fields that allow a user to enter or select information on a Web page. Figure 8.6: Google’s form, "Get started with Gmail".', ar: 'الـ <b>Forms</b> هي text boxes و list boxes و fields تانية بتخلي الـ user يدخل أو يختار معلومات في صفحة الويب. Figure 8.6: الـ form بتاع Google اللي اسمه "Get started with Gmail".' },
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
    const a = `بين <b><bdi dir="ltr">\u00b1${k}\u03c3</bdi></b> فيه <b><bdi dir="ltr">${pct}</bdi></b> من النتايج جوه؛ و<b><bdi dir="ltr">${ppm}&nbsp;ppm</bdi></b> برّه الـ spec. كل ما الـ band يوسع بعدد sigmas أكتر، كل ما الـ parts per million اللي برّه تقل.`;
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
        ${[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(z => html`<g key=${z}><line x1=${X(z)} y1=${base} x2=${X(z)} y2=${base + (z % 2 ? 22 : 5)} style=${{ stroke: 'var(--line)' }} /><line x1=${X(z)} y1=${base} x2=${X(z)} y2=${base + 5} style=${{ stroke: 'var(--ink)' }} /><text x=${X(z)} y=${base + (z % 2 ? 37 : 20)} textAnchor="middle" fontSize="15.8" style=${{ fontWeight: Math.abs(z) === k ? 700 : 400, fill: Math.abs(z) === k ? 'var(--k-qa)' : 'var(--ink)' }}>${z === 0 ? '0' : (z > 0 ? '+' : '\u2212') + Math.abs(z) + 'σ'}</text></g>`)}
        <line x1=${X(-v)} y1="262" x2=${X(v)} y2="262" style=${{ stroke: 'var(--k-qa)' }} strokeWidth="2" />
        <path d=${`M${X(-v)},262 l8,-5 v10 z M${X(v)},262 l-8,-5 v10 z`} style=${{ fill: 'var(--k-qa)' }} />
        <text x="180" y="255" textAnchor="middle" fontSize="15.8" fontWeight="700">between +/\u2212 ${k}σ</text>
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
      { en: 'The <b>DMADV Methodology</b> figure: five arrows in a cycle around DMADV.', ar: 'شكل الـ <b>DMADV Methodology</b> فيه 5 أسهم في دايرة حوالين DMADV.' },
      ...names.map((n, j) => ({ en: (j + 1) + ') <b>' + n + '</b>' + (j ? ', after ' + names[j - 1] + '.' : '.'), ar: (j + 1) + ') الـ <b>' + n + '</b>' + (j ? '، بعد الـ ' + names[j - 1] + '.' : '.') })),
      { en: 'Verify leads back to Define: the arrows form a closed cycle. (The figure names the phases only.)', ar: 'الـ Verify بيرجع للـ Define: الأسهم بتعمل دايرة مقفولة. (الشكل بيكتب أسماء الـ phases بس.)' }
    ];
    return html`<${Cycle} ar=${ar} id="fq4-dmadv" center="DMADV" names=${names} steps=${steps} ms=${1700} />`;
  }

  /* ── L8 slides 5 to 7: the DMAIC steps ── */
  function Dmaic({ ar }) {
    const names = ['Define', 'Measure', 'Analyze', 'Improve', 'Control'];
    const steps = [
      { en: 'The 6 Sigma methodology is <b>DMAIC</b>: Define, Measure, Analyze, Improve, Control.', ar: 'الـ methodology بتاعة 6 Sigma هي <b>DMAIC</b>: يعني الـ Define والـ Measure والـ Analyze والـ Improve والـ Control.' },
      { en: '<b>Define</b>: identify what needs to be improved through the precise identification of the problems that obstacle this improvement. The problem statement includes the level of the problem, its location and its financial impact. Form a team to solve the problem.', ar: 'الـ <b>Define</b>: حدد إيه اللي محتاج يتحسن عن طريق تحديد دقيق للمشاكل اللي معطلة التحسين ده. الـ problem statement بيشمل مستوى المشكلة ومكانها والـ financial impact بتاعها. وكوّن team يحل المشكلة.' },
      { en: '<b>Measure</b>: plan and implement performance measurement against the requirements and expectations of customers, with criteria for measuring defects using statistical control tools.', ar: 'الـ <b>Measure</b>: خطط ونفذ قياس للـ performance قصاد requirements وتوقعات العملاء، بـ criteria لقياس الـ defects باستخدام أدوات الـ statistical control.' },
      { en: '<b>Analyze</b>: analyze the collected data to determine the root causes of all problems: analyze the chain of failure causes, rank them by impact, categorize them, then control and manage them.', ar: 'الـ <b>Analyze</b>: حلل الـ data اللي اتجمعت عشان تحدد الـ root causes لكل المشاكل: حلل سلسلة أسباب الـ failure، ورتبها حسب تأثيرها، وصنفها، وبعدين اتحكم فيها وأدرها.' },
      { en: '<b>Improve</b>: change the processes to eliminate product defects, excessive costs and waste. Study the causes of failure, find solutions, test them on a sample of products, determine the results and make the necessary corrections.', ar: 'الـ <b>Improve</b>: غيّر في الـ processes عشان تشيل الـ defects والتكاليف الزيادة والـ waste. ادرس أسباب الـ failure، لاقي حلول، جربها على sample من المنتجات، شوف النتايج واعمل التصحيحات اللازمة.' },
      { en: '<b>Control</b>: keep monitoring all of these processes and do not stop: continuously measure performance standards, conduct measurement processes, and correct any deviations at the specified time.', ar: 'الـ <b>Control</b>: فضل راقب كل الـ processes دي ومتوقفش: قيس الـ performance standards باستمرار، واعمل عمليات القياس، وصحح أي deviations في وقتها.' },
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
      { en: '<b>Six Sigma for failure cases in the preparatory certificate</b>: for each subject, the mean and the standard deviation. The Six sigma column is <b>6 × standard deviation</b>.', ar: '<b>الـ Six Sigma لحالات الرسوب في الشهادة الإعدادية</b>: لكل مادة، المتوسط الحسابي والانحراف المعياري. عمود الـ Six sigma هو <b>6 × الانحراف المعياري</b>.' },
      ...rows.map(r => ({ en: (r === TOT ? '<b>Overall indicator</b> (المؤشر الكلي)' : '<b>' + r[0] + '</b>') + ': 6 × ' + r[2] + ' = <b>' + r[3] + '</b>' + (r === TOT ? ' (overall mean ' + r[1] + ').' : '.'), ar: (r === TOT ? '<b>المؤشر الكلي</b>' : 'الـ <b>' + r[0] + '</b>') + ':<span class="ltr">6 × ' + r[2] + ' = <b>' + r[3] + '</b></span>' + (r === TOT ? '(المتوسط الكلي ' + r[1] + ').' : '') })),
      { en: 'Applying DMAIC: <b>Define</b> these causes; <b>Measure</b> the impact of their magnitude; <b>Analyze</b> the sources and elements; <b>Improve</b>: derive solutions, reducing failure cases and increasing the level of success; <b>Control</b>: continuously monitor the improvement processes.', ar: 'تطبيق الـ DMAIC: الـ <b>Define</b> للأسباب دي؛ والـ <b>Measure</b> لحجم تأثيرها؛ والـ <b>Analyze</b> للمصادر والعناصر؛ والـ <b>Improve</b>: طلّع حلول تقلل حالات الرسوب وتزود مستوى النجاح؛ والـ <b>Control</b>: راقب عمليات التحسين باستمرار.' }
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
      { en: '<b>Step 1: White Belt</b>, the bottom step.', ar: 'الـ <b><bdi dir="ltr">Step 1: White Belt</bdi></b>، أول درجة تحت.' },
      { en: '<b>Step 2: Yellow Belt</b>, applied to all employees.', ar: 'الـ <b><bdi dir="ltr">Step 2: Yellow Belt</bdi></b>، بيتطبق على كل الموظفين.' },
      { en: '<b>Step 3: Green Belt</b>, applied to executive employees.', ar: 'الـ <b><bdi dir="ltr">Step 3: Green Belt</bdi></b>، بيتطبق على الـ executive employees.' },
      { en: '<b>Step 4: Black Belt</b>, applied to middle management and senior management.', ar: 'الـ <b><bdi dir="ltr">Step 4: Black Belt</bdi></b>، بيتطبق على الـ middle management والـ senior management.' },
      { en: '<b>Step 5: Master Black Belt</b>, the top step, applied to senior management.', ar: 'الـ <b><bdi dir="ltr">Step 5: Master Black Belt</bdi></b>، آخر درجة فوق، بيتطبق على الـ senior management.' }
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

/* ── part 5 ── */
// Software Quality Assurance visuals, part 5: L1 section 1.3, the software development models in motion
// (Waterfall, RAD, Agile, and where testing sits in each model). Every label and caption comes from the site's notes for L1.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fq5 .fig-dots i.on{ background:var(--k-qa); } .fq5 .fig-btn:hover{ border-color:var(--k-qa); } .fq5 .fig-btn.solid{ background:var(--s-qa); }
.fq5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 12px; }
.fq5-modes .fig-btn[aria-pressed="true"]{ background:var(--s-qa); color:#fff; border-color:transparent; }
.fq5-cas{ display:flex; flex-direction:column; gap:7px; max-width:420px; margin:0 auto; }
.fq5-ph{ position:relative; border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:8px; padding:6px 10px; font-size:.86rem; line-height:1.35; font-weight:600; transition:background .5s ease, border-color .5s ease, opacity .5s ease, color .5s ease; }
.fq5-ph small{ display:block; font-weight:400; font-size:.8rem; color:var(--graphite); }
.fq5-ph.done{ background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); border-color:var(--k-qa); }
.fq5-ph.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .fq5-ph.on small{ color:rgba(255,255,255,.9); }
.fq5-ph.wait{ opacity:.35; }
.fq5-ph.bad{ border-color:var(--pen); box-shadow:inset 4px 0 0 var(--pen); }
.fq5-ph.fix{ background:color-mix(in srgb, var(--pen) 14%, var(--paper)); border-color:var(--pen); }
.fq5-tag{ display:inline-block; margin-left:6px; vertical-align:1px; font-size:.76rem; font-weight:700; color:var(--pen); background:var(--paper); border:1px solid var(--pen); border-radius:99px; padding:1px 7px; }
.fq5-ph.on .fq5-tag{ color:var(--pen); }
.fq5-drop{ position:absolute; left:-15px; top:50%; width:11px; height:11px; margin-top:-5.5px; border-radius:50%; background:var(--k-qa); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-qa) 30%, transparent); animation:fq5pulse 1.2s ease-in-out infinite; }
@keyframes fq5pulse{ 50%{ transform:scale(1.35); } }
.fq5-meters{ display:grid; grid-template-columns:auto 1fr; gap:5px 8px; align-items:center; max-width:420px; margin:12px auto 0; font-size:.82rem; color:var(--ink); }
.fq5-meter{ height:10px; border-radius:99px; background:var(--paper); border:1px solid var(--line); overflow:hidden; }
.fq5-meter i{ display:block; height:100%; background:var(--pen); transition:width .9s ease; }
.fq5-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:6px 0; }
.fq5-chip{ border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:3px 10px; font-size:.82rem; line-height:1.3; transition:all .5s ease; }
.fq5-chip.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.fq5-chip.gap{ border-color:var(--pen); border-style:dashed; color:var(--pen); }
.fq5-chip.k{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); }
.fq5-arrow{ text-align:center; color:var(--graphite); font-size:1rem; line-height:1; margin:2px 0; }
.fq5-box{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; max-width:420px; margin:0 auto; font-size:.84rem; color:var(--ink); transition:all .5s ease; }
.fq5-box.on{ border-color:var(--k-qa); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-qa) 22%, transparent); }
.fq5-box.wait{ opacity:.35; }
.fq5-box b.t{ display:block; font-size:.88rem; margin-bottom:4px; }
.fq5-bar{ position:relative; height:16px; border-radius:4px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin-top:4px; }
.fq5-bar i{ position:absolute; left:0; top:0; bottom:0; transition:width 1s ease; }
.fq5-spin{ display:inline-block; animation:fq5spin 1.6s linear infinite; }
@keyframes fq5spin{ to{ transform:rotate(360deg); } }
.fq5-fail{ text-align:center; color:var(--pen); font-weight:700; font-size:.86rem; margin-top:6px; }
.fq5-stack{ display:flex; flex-direction:column-reverse; gap:4px; min-height:118px; justify-content:flex-start; }
.fq5-rel{ border-radius:6px; padding:4px 8px; font-size:.82rem; font-weight:600; color:#fff; background:var(--s-qa); animation:fq5in .6s ease both; }
.fq5-rel.k2{ background:color-mix(in srgb, var(--s-qa) 82%, var(--ink)); } .fq5-rel.k3{ background:color-mix(in srgb, var(--s-qa) 64%, var(--ink)); }
@keyframes fq5in{ from{ opacity:0; transform:translateY(-10px); } to{ opacity:1; transform:none; } }
.fq5-ag{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.1fr); gap:10px; max-width:440px; margin:0 auto; align-items:start; }
.fq5-cyc{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.fq5-cyc span{ border:1.3px solid var(--line); border-radius:6px; padding:4px 4px; font-size:.8rem; text-align:center; background:var(--paper); color:var(--ink); transition:all .4s ease; }
.fq5-cyc span.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; }
.fq5-h{ font-size:.8rem; color:var(--graphite); margin:0 0 4px; text-align:center; }
.fq5-roles{ display:flex; gap:5px; justify-content:center; flex-wrap:wrap; margin-top:10px; }
.fq5-tl{ max-width:440px; margin:0 auto; display:grid; grid-template-columns:minmax(0,1.25fr) minmax(0,1fr); gap:4px 8px; font-size:.8rem; }
.fq5-tl .hd{ font-size:.78rem; color:var(--graphite); text-align:center; font-weight:600; }
.fq5-tl .d, .fq5-tl .t{ border-radius:6px; padding:3px 7px; line-height:1.3; min-height:22px; animation:fq5in .45s ease both; }
.fq5-tl .d{ border:1.3px solid var(--line); background:var(--paper); color:var(--ink); }
.fq5-tl .t.y{ border:1.3px solid var(--k-qa); background:color-mix(in srgb, var(--k-qa) 18%, var(--paper)); color:var(--ink); font-weight:600; }
.fq5-tl .t.p{ border:1.3px dashed var(--k-qa); background:var(--paper); color:var(--ink); }
.fq5-tl .t.n{ border:1px dashed var(--line); opacity:.5; }
.fq5-tl .cy{ grid-column:1 / -1; font-size:.76rem; color:var(--graphite); font-weight:700; margin-top:3px; animation:fq5in .45s ease both; }
.fq5-key{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; font-size:.76rem; color:var(--graphite); margin-top:8px; }
.fq5-key i{ display:inline-block; width:12px; height:10px; border-radius:3px; margin-right:4px; vertical-align:-1px; }
@media (prefers-reduced-motion: reduce){ .fq5-drop, .fq5-spin, .fq5-rel, .fq5-tl .d, .fq5-tl .t, .fq5-tl .cy{ animation:none; } }`;
  if (!document.getElementById('fq5-css')) { const s = document.createElement('style'); s.id = 'fq5-css'; s.textContent = CSS; document.head.appendChild(s); }

  const Modes = ({ list, mode, setMode }) => html`<div className="fq5-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => setMode(k)}>${t}</button>`)}</div>`;

  /* ── Waterfall in motion: one phase at a time, and what happens to an early error ── */
  const WF = [['System Engineering', 'software and hardware requirements'], ['Analysis', 'feasibility, goals, performance, interfaces'], ['Design', 'software structure, e.g. database design'], ['Coding', 'program code from the design'], ['Testing', 'detect bugs, verify the requirements'], ['Maintenance', 'fix issues, update for new needs']];
  const WF_CLEAN = [
    { en: '<b>Waterfall</b> is sequential: the process starts at the system level and each phase is finished before the next one starts, like water falling down steps.', ar: 'الـ <b>Waterfall</b> sequential: الـ process بتبدأ من الـ system level، وكل phase بتخلص قبل ما اللي بعدها تبدأ، زي الميه وهي نازلة على سلم.', at: -1 },
    ...WF.map(([n, d], k) => ({ en: `${k + 1}. <b>${n}</b>: ${d}.`, ar: `<bdi dir="ltr">${k + 1}.</bdi> الـ <b>${n}</b>: ${['بيحدد الـ software requirements والـ hardware requirements', 'feasibility study والـ goals والـ performance والـ interface requirements', 'بيحوّل الـ requirements لـ software structure، زي الـ database design', 'الـ developers بيكتبوا الـ program code على أساس الـ design', 'بنكتشف الـ bugs ونتأكد إن الـ software ماشي على الـ requirements', 'بنصلّح المشاكل ونعمل update لما تظهر احتياجات جديدة'][k]}.`, at: k })),
    { en: '<b>Advantages</b>: simple, structured, clear documentation, early requirements, easy management.<br>Notice that testing comes only once, after coding.', ar: '<b>المميزات</b>: بسيط، ومنظم (structured)، والـ documentation واضحة، والـ requirements بدري، وإدارته سهلة.<br>لاحظ إن الـ testing بييجي مرة واحدة بس، بعد الـ coding.', at: 6 }
  ];
  const WF_ERR = [
    { en: 'Now suppose an <b>error is made in an early phase</b>, here in Analysis.', ar: 'افترض دلوقتي إن فيه <b>error حصل في phase بدري</b>، هنا في الـ Analysis.', at: 1, bad: [1] },
    { en: 'Design is built on the analysis, so the error <b>carries over</b> into the design.', ar: 'الـ Design متبني على الـ analysis، فالـ error <b>بينتقل</b> للـ design.', at: 2, bad: [1, 2] },
    { en: 'Coding follows the design, so the error carries over into the code too.', ar: 'والـ Coding ماشي ورا الـ design، فالـ error بينتقل للـ code كمان.', at: 3, bad: [1, 2, 3] },
    { en: 'Only in <b>Testing</b> is the bug detected, several phases after it was made.', ar: 'الـ bug بيتكشف بس في الـ <b>Testing</b>، بعد ما حصل بكذا phase.', at: 4, bad: [1, 2, 3], found: 1 },
    { en: 'The problem <b>must be fixed at multiple points</b>: in Analysis, Design and Coding, then tested again.', ar: 'المشكلة <b>لازم تتصلح في أكتر من مكان</b>: في الـ Analysis والـ Design والـ Coding، وبعدين تتختبر تاني.', at: 4, fix: [1, 2, 3], found: 1 },
    { en: '<b>Drawback</b>: errors made in early phases can carry over to later stages, causing <b>delays and increased costs</b>, since problems must be fixed at multiple points.', ar: '<b>العيب</b>: الـ errors اللي بتحصل في الـ phases الأولانية ممكن تنتقل للمراحل اللي بعدها، وده بيعمل <b>تأخير وتكلفة أعلى</b>، لأن المشاكل لازم تتصلح في أكتر من مكان.', at: 4, fix: [1, 2, 3], found: 1, cost: 1 }
  ];
  function WaterfallFlow({ ar }) {
    const [mode, setMode0] = useState('clean');
    const steps = mode === 'clean' ? WF_CLEAN : WF_ERR;
    const [i, ctl] = useSteps(steps.length, 2400);
    const setMode = m => { setMode0(m); ctl.go(0); if (!calm()) setTimeout(ctl.replay, 0); };
    const s = steps[i] || steps[0], bad = s.bad || [], fix = s.fix || [];
    const fixing = fix.length > 0, delay = s.cost ? 90 : fixing ? 60 : s.found ? 25 : 0;
    return html`<figure className="fig fq5"><div className="fig-stage">
      <${Modes} list=${[['clean', 'Run the phases'], ['err', 'An early error']]} mode=${mode} setMode=${setMode} />
      <div className="fq5-cas" role="img" aria-label="Waterfall phases in order: System Engineering, Analysis, Design, Coding, Testing, Maintenance">
        ${WF.map(([n, d], k) => { const on = s.at === k && !fix.includes(k), done = mode === 'err' ? k <= s.at : k < s.at || (s.at === 6), wait = !on && !done && !fix.includes(k);
          return html`<div key=${k} className=${'fq5-ph' + (on ? ' on' : done ? ' done' : '') + (wait ? ' wait' : '') + (bad.includes(k) && !fixing ? ' bad' : '') + (fix.includes(k) ? ' fix' : '')} style=${{ marginLeft: `calc(${k} * min(4.4%, 16px) + 14px)` }}>
            ${s.at === k && html`<span className="fq5-drop"></span>`}
            ${n}${bad.includes(k) && !fixing && html`<span className="fq5-tag">${k === 1 ? 'error' : 'carried'}</span>`}
            ${k === 4 && s.found && !fixing && html`<span className="fq5-tag">bug found</span>`}
            ${fix.includes(k) && html`<span className="fq5-tag"><span className=${calm() ? '' : 'fq5-spin'}>↻</span> fix</span>`}<small>${d}</small></div>`; })}
      </div>
      ${mode === 'err' && html`<div className="fq5-meters" aria-label="Delay and cost">
        <span>Delay</span><div className="fq5-meter"><i style=${{ width: delay + '%' }}></i></div>
        <span>Cost</span><div className="fq5-meter"><i style=${{ width: delay + '%' }}></i></div></div>`}
      </div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── RAD: prototype against the requirements, construction until the customer is satisfied, quick handover ── */
  const RAD = [
    { en: '<b>RAD</b> (Rapid Application Development) is built from <b>business</b>, <b>project-management</b> and <b>SRS</b> requirements. It is linear sequential with an <b>extremely short cycle</b> and reusable components.', ar: 'الـ <b>RAD</b> (Rapid Application Development) بيتبني من الـ <b>business</b> والـ <b>project-management</b> والـ <b>SRS</b> requirements. هو linear sequential بـ <b>cycle قصيرة جدًا</b> و reusable components.', p: -1 },
    { en: '1. <b>Requirements planning</b>: collecting the project requirements and creating an outline.', ar: '<bdi dir="ltr">1.</bdi> الـ <b>Requirements planning</b>: بنجمع الـ requirements بتاعة المشروع ونعمل outline.', p: 0 },
    { en: '2. <b>Design</b>: a prototype is built and <b>matched against the requirements</b>. Here it misses one: there is a <b>gap</b>.', ar: '<bdi dir="ltr">2.</bdi> الـ <b>Design</b>: بنبني prototype و<b>نقارنه بالـ requirements</b>. هنا فيه requirement ناقص: يعني فيه <b>gap</b>.', p: 1, proto: 1 },
    { en: 'Because of the gap, <b>another prototype</b> is built. Prototype 2 includes all the requirements and necessary changes.', ar: 'عشان الـ gap، بنبني <b>prototype تاني</b>. الـ Prototype 2 فيه كل الـ requirements والتغييرات اللازمة.', p: 1, proto: 2 },
    { en: '3. <b>Construction</b>: the prototype is developed and improved using <b>RAD tools</b> until <b>the customer is satisfied</b>.', ar: '<bdi dir="ltr">3.</bdi> الـ <b>Construction</b>: بنطور ونحسّن الـ prototype بالـ <b>RAD tools</b> لحد ما <b>العميل يبقى راضي</b>.', p: 2, proto: 2, loop: 1 },
    { en: '4. <b>Testing &amp; handover</b>: <b>reusable components</b> are already tested, so testing time is reduced before delivering the final product.', ar: '<bdi dir="ltr">4.</bdi> الـ <b>Testing &amp; handover</b>: الـ <b>reusable components</b> متختبرة قبل كده، فوقت الـ testing بيقل قبل ما نسلّم الـ final product.', p: 3, proto: 2, reuse: 1 },
    { en: '<b>Advantages</b>: fast development with prototypes, flexible to changes, customer feedback, reduced risk, high quality.<br><b>Disadvantages</b>: only for small, simple projects; and a missing reusable component can make the project fail (try the button).', ar: '<b>المميزات</b>: development سريع بالـ prototypes، ومرن (flexible) مع التغييرات، وفيه customer feedback، والـ risk أقل، والـ quality عالية.<br><b>العيوب</b>: مناسب بس للمشاريع الصغيرة والبسيطة؛ ولو reusable component ناقص ممكن المشروع يفشل (جرّب الزرار).', p: 3, proto: 2, reuse: 1, end: 1 }
  ];
  function Rad({ ar }) {
    const [i, ctl] = useSteps(RAD.length, 2800);
    const [missing, setMissing] = useState(false);
    const s = RAD[i], PH = ['Requirements planning', 'Design (prototype)', 'Construction (RAD tools)', 'Testing & handover'];
    const reqs = ['Req 1', 'Req 2', 'Req 3', 'Req 4'], covered = s.proto === 1 ? 3 : s.proto === 2 ? 4 : 0;
    const box = k => 'fq5-box' + (s.p === k ? ' on' : s.p < k ? ' wait' : '');
    const fail = s.end && missing;
    return html`<figure className="fig fq5"><div className="fig-stage">
      <div className="fq5-row">${['Business', 'Project management', 'SRS'].map(t => html`<span key=${t} className=${'fq5-chip' + (s.p >= 0 ? ' k' : '')}>${t}</span>`)}</div>
      <div className="fq5-arrow">↓</div>
      <div className=${box(0)}><b className="t">${PH[0]}</b>collect the requirements, create an outline</div>
      <div className="fq5-arrow">↓</div>
      <div className=${box(1)}><b className="t">${PH[1]}${s.proto ? `: Prototype ${s.proto}` : ''}</b>
        <div className="fq5-row" style=${{ justifyContent: 'flex-start' }}>${reqs.map((r, k) => html`<span key=${r} className=${'fq5-chip' + (!s.proto ? '' : k < covered ? ' ok' : ' gap')}>${!s.proto ? r : k < covered ? '✓ ' + r : '✗ ' + r + ' (gap)'}</span>`)}</div>
        ${s.proto === 1 && html`<div style=${{ color: 'var(--pen)', fontWeight: 700 }}>Gap → build another prototype</div>`}</div>
      <div className="fq5-arrow">↓</div>
      <div className=${box(2)}><b className="t">${PH[2]}</b>
        ${s.loop ? html`<span><span className=${calm() ? '' : 'fq5-spin'}>↻</span> develop and improve → customer satisfied? → yes</span>` : 'develop and improve until the customer is satisfied'}</div>
      <div className="fq5-arrow">↓</div>
      <div className=${box(3)}><b className="t">${PH[3]}</b>
        <div style=${{ fontSize: '.8rem', color: 'var(--graphite)' }}>Testing time</div>
        <div className="fq5-bar"><i style=${{ width: s.reuse ? '38%' : '100%', background: 'color-mix(in srgb, var(--k-qa) 45%, var(--paper))' }}></i></div>
        ${s.reuse && html`<div style=${{ fontSize: '.8rem', marginTop: '3px' }}>shorter: reusable components are already tested</div>`}
        ${s.end && html`<div style=${{ marginTop: '8px', textAlign: 'center' }}><button className="fig-btn" aria-pressed=${String(missing)} onClick=${() => setMissing(m => !m)}>${missing ? 'Put the component back' : 'Remove a reusable component'}</button></div>`}
        ${fail && html`<div className="fq5-fail">A missing reusable component can make the project fail.</div>`}</div>
      </div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${RAD} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── Agile: small testable parts, short cycles, each release builds on the previous one ── */
  const AG = [
    { en: '<b>Agile</b> is incremental: the work is divided into <b>small, testable parts</b>, delivered in short cycles and small releases.', ar: 'الـ <b>Agile</b> incremental: الشغل بيتقسم لـ <b>أجزاء صغيرة ينفع تتختبر</b>، وبتتسلم في cycles قصيرة و releases صغيرة.', r: 0, c: -1, cy: 0, on: [] },
    { en: 'Cycle 1: the first part is built and <b>thoroughly tested</b>, so bugs are fixed early.', ar: 'الـ Cycle 1: أول جزء بيتعمل و<b>بيتختبر كويس</b>، فالـ bugs بتتصلح بدري.', r: 0, c: 0, cy: 1, on: [0, 1] },
    { en: '<b>Release 1</b> goes out, and the customer gives <b>feedback</b>.', ar: 'الـ <b>Release 1</b> بيطلع، والعميل بيدي <b>feedback</b>.', r: 1, c: 1, cy: 1, on: [2, 3] },
    { en: 'Cycle 2: the next part is refined based on that user input. <b>Release 2 builds on Release 1</b> and is tested again.', ar: 'الـ Cycle 2: الجزء اللي بعده بيتحسن على حسب الـ input بتاع الـ user. <b>Release 2 بيتبني على Release 1</b> وبيتختبر تاني.', r: 2, c: 1, cy: 2, on: [0, 1, 2] },
    { en: 'The customer <b>changes a requirement</b>. Agile is designed for continuous changes: the next short cycle simply takes it in.', ar: 'العميل <b>غيّر requirement</b>. الـ Agile معمول للتغييرات المستمرة: الـ cycle القصيرة اللي بعدها بتاخده وخلاص.', r: 2, c: 2, cy: 3, on: [3, 0], change: 1 },
    { en: 'Cycle 3 → <b>Release 3</b>. The <b>continuous collaboration</b> of customers, developers and testers ensures that requirements are met accurately.', ar: 'وبعدها:<span class="ltr">Cycle 3 → <b>Release 3</b></span>الـ <b>continuous collaboration</b> بين العملاء والـ developers والـ testers بيضمن إن الـ requirements تتحقق بدقة.', r: 3, c: 3, cy: 3, on: [1, 2], roles: 1 },
    { en: 'Approaches: <b>DSDM</b>, <b>SCRUM</b>, <b>XP</b> (the most popular; it uses TDD, Figure 1.4).<br><b>Advantages</b>: flexible, feedback, fast delivery, better quality.<br><b>Disadvantages</b>: needs active customer involvement, hard for large teams, scope creep.', ar: 'الـ approaches هي <b>DSDM</b> و<b>SCRUM</b> و<b>XP</b> (الأشهر، وبيستخدم الـ TDD في Figure 1.4).<br><b>المميزات</b>: مرن (flexible)، وفيه feedback، وتسليم سريع، والـ quality أحسن.<br><b>العيوب</b>: محتاج العميل يشارك بشكل فعّال، صعب مع الـ teams الكبيرة، والـ scope creep.', r: 3, c: 3, cy: 3, on: [], roles: 1, apps: 1 }
  ];
  function Agile({ ar }) {
    const [i, ctl] = useSteps(AG.length, 2600);
    const s = AG[i], parts = ['Part 1', 'Part 2', 'Part 3'];
    const CYC = ['Build a small part', 'Test it', 'Release', 'Feedback'];
    return html`<figure className="fig fq5"><div className="fig-stage">
      <div className="fq5-row">${parts.map((p, k) => html`<span key=${p} className=${'fq5-chip' + (s.r > k ? ' ok' : s.c >= 0 && s.r === k ? ' k' : '')}>${s.r > k ? '✓ ' : ''}${p}</span>`)}
        ${s.change && html`<span className="fq5-chip gap">changed requirement</span>`}</div>
      <div className="fq5-ag" style=${{ marginTop: '8px' }}>
        <div><p className="fq5-h">Each short cycle${s.cy ? ` (cycle ${s.cy})` : ''}</p>
          <div className="fq5-cyc">${CYC.map((t, k) => html`<span key=${t} className=${s.on.includes(k) ? 'on' : ''}>${t}</span>`)}</div>
          ${s.on.length > 0 && !calm() && html`<div className="fq5-arrow" style=${{ marginTop: '6px' }}><span className="fq5-spin">↻</span></div>`}</div>
        <div><p className="fq5-h">Releases</p>
          <div className="fq5-stack">${[1, 2, 3].filter(k => s.r >= k).map(k => html`<div key=${k} className=${'fq5-rel k' + k}>Release ${k}${k > 1 ? ` (builds on ${k - 1})` : ''}</div>`)}</div></div>
      </div>
      <div className="fq5-roles">${['Customers', 'Developers', 'Testers'].map(t => html`<span key=${t} className=${'fq5-chip' + (s.roles ? ' k' : '')}>${t}</span>`)}</div>
      ${s.apps && html`<div className="fq5-row">${['DSDM', 'SCRUM', 'XP → TDD'].map(t => html`<span key=${t} className="fq5-chip ok">${t}</span>`)}</div>`}
      </div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${AG} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── Where testing sits in each model (from the notes and the summary) ── */
  // rows: [development activity, testing activity, kind] kind y = testing done, p = test planned, n = none; 'cy' rows are cycle headings
  const CMP = {
    Waterfall: { rows: [['System Engineering', '', 'n'], ['Analysis', '', 'n'], ['Design', '', 'n'], ['Coding', '', 'n'], ['', 'Testing', 'y'], ['Maintenance', '', 'n']],
      en: '<b>Waterfall</b> is sequential: testing happens <b>once</b>, after coding, so errors from early phases are found late.', ar: 'الـ <b>Waterfall</b> sequential: الـ testing بيحصل <b>مرة واحدة</b> بعد الـ coding، فالـ errors اللي في الـ phases الأولى بتتكشف متأخر.' },
    V: { rows: [['Requirements Specifications', 'Acceptance Test Plan', 'p'], ['Functional Specifications', 'System Test Plan', 'p'], ['System Design', 'Integration Test Plan', 'p'], ['Unit Design', 'Test Cases', 'p'], ['Code', '', 'n'], ['', 'Unit Test', 'y'], ['', 'Integration Test', 'y'], ['', 'System Test', 'y'], ['', 'Acceptance Test', 'y']],
      en: '<b>V-Model</b>: testing is an integral part. Each development stage already produces its test plan (early testing from the requirements phase), and the tests then run from low level to high level.', ar: 'الـ <b>V-Model</b>: الـ testing جزء أساسي. كل development stage بتطلّع الـ test plan بتاعها من الأول، يعني الـ testing بيبدأ بدري من الـ requirements phase. وبعدين الـ tests بتشتغل من الـ low level للـ high level.' },
    Spiral: { rows: [['cy', 'Prototype 1'], ['Planning, Risk analysis', '', 'n'], ['Design engineering', '', 'n'], ['', 'Testing & evaluation (customer)', 'y'], ['cy', 'Prototype 2'], ['Planning, Risk analysis', '', 'n'], ['Design engineering', '', 'n'], ['', 'Testing & evaluation (customer)', 'y'], ['cy', 'Operational prototype → Release'], ['Planning, Risk analysis', '', 'n'], ['Design engineering', '', 'n'], ['', 'Testing & evaluation (customer)', 'y']],
      en: '<b>Spiral</b>: testing is an integral part. Every cycle ends with testing and evaluation, so each prototype (usually 2 or 3) is checked before the next one; the cost is the time the iterations take.', ar: 'الـ <b>Spiral</b>: الـ testing جزء أساسي. كل cycle بتخلص بـ testing و evaluation، فكل prototype (عادةً 2 أو 3) بيتشيك قبل اللي بعده؛ والتمن هو الوقت اللي بتاخده الـ iterations.' },
    RAD: { rows: [['Requirements planning', '', 'n'], ['Design (prototype)', 'match against requirements', 'p'], ['Construction (RAD tools)', 'customer feedback', 'p'], ['', 'Testing & handover (short: reusable components)', 'y']],
      en: '<b>RAD</b>: each prototype is matched against the requirements, the customer judges the construction, and the final testing is short because reusable components are already tested.', ar: 'الـ <b>RAD</b>: كل prototype بيتقارن بالـ requirements، والعميل بيحكم على الـ construction، والـ testing الأخير قصير لأن الـ reusable components متختبرة قبل كده.' },
    Agile: { rows: [['cy', 'Release 1'], ['Build a small part', 'Test it thoroughly', 'y'], ['cy', 'Release 2'], ['Build the next part', 'Test it thoroughly', 'y'], ['cy', 'Release 3'], ['Build the next part', 'Test it thoroughly', 'y']],
      en: '<b>Agile</b>: every small release is thoroughly tested, so bugs are fixed early. The summary calls Agile the <b>most advanced and efficient</b> model; XP builds on it with TDD.', ar: 'الـ <b>Agile</b>: كل release صغير بيتختبر كويس، فالـ bugs بتتصلح بدري. الخلاصة بتقول إن الـ Agile هو <b>أكتر model متطور وكفء</b>؛ والـ XP مبني عليه وبيستخدم الـ TDD.' }
  };
  function Compare({ ar }) {
    const [m, setM] = useState('Waterfall');
    const c = CMP[m];
    let d = 0;
    return html`<figure className="fig fq5"><div className="fig-stage">
      <${Modes} list=${Object.keys(CMP).map(k => [k, k])} mode=${m} setMode=${setM} />
      <div key=${m} className="fq5-tl" role="table" aria-label=${'Development and testing in the ' + m + ' model, top to bottom in time'}>
        <span className="hd">Development ↓ time</span><span className="hd">Testing</span>
        ${c.rows.map((r, k) => { const delay = { animationDelay: calm() ? '0s' : (d++ * 0.22) + 's' };
          if (r[0] === 'cy') return html`<span key=${k} className="cy" style=${delay}>${r[1]}</span>`;
          return [html`<span key=${k + 'd'} className=${r[0] ? 'd' : 't n'} style=${delay}>${r[0]}</span>`,
            html`<span key=${k + 't'} className=${'t ' + r[2]} style=${delay}>${r[1]}</span>`]; })}
      </div>
      <div className="fq5-key"><span><i style=${{ background: 'color-mix(in srgb, var(--k-qa) 18%, var(--paper))', border: '1.3px solid var(--k-qa)' }}></i>testing done</span><span><i style=${{ border: '1.3px dashed var(--k-qa)' }}></i>test planned or checked early</span></div>
      </div>
      <${Cap} en=${c.en + ' <b>Summary</b>: waterfall is sequential; V and Spiral use testing as an integral part, so they are more efficient than waterfall.'} ar=${c.ar + ' <b>الخلاصة</b>: الـ waterfall sequential؛ والـ V والـ Spiral بيستخدموا الـ testing كجزء أساسي، فهما أكفأ من الـ waterfall.'} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'qa-waterfall-flow': WaterfallFlow, 'qa-rad': Rad, 'qa-agile': Agile, 'qa-models-compare': Compare });
})();
/* ── part L5 ── */
// Software Quality Assurance visuals, Lecture 5 (Web Site Testing): the web site and its pages, the three page components, the 13 testing
// elements and site-map checks, white-box elements (dynamic content, database-driven and generated pages, load, security), gray-box,
// configuration and compatibility, and the automatic tools (slides 3 to 21). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.qv5 .fig-dots i.on{ background:var(--k-qa); } .qv5 .fig-btn:hover{ border-color:var(--k-qa); } .qv5 .fig-btn.solid{ background:var(--s-qa); }
.qv5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 12px; }
.qv5-modes .fig-btn[aria-pressed="true"]{ background:var(--s-qa); color:#fff; border-color:transparent; }
.qv5-in{ animation:qv5in .5s ease both; } @keyframes qv5in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.qv5-chip{ display:inline-block; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:2px 9px; font-size:.78rem; line-height:1.35; transition:all .4s ease; }
.qv5-chip.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; }
.qv5-chip.k{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); }
.qv5-chip.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.qv5-chip.bad{ border-color:var(--pen); color:var(--pen); background:color-mix(in srgb, var(--pen) 10%, var(--paper)); font-weight:700; }
.qv5-chip.dim{ opacity:.4; }
.qv5-ok{ color:var(--ok); font-weight:700; } .qv5-bad{ color:var(--pen); font-weight:700; }
.qv5-note{ text-align:center; font-size:.82rem; color:var(--graphite); margin:8px 0 0; }
.qv5-page{ max-width:460px; margin:0 auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); font-size:.82rem; line-height:1.35; overflow:hidden; }
.qv5-addr{ display:flex; gap:6px; align-items:center; padding:5px 8px; background:var(--paper-2); border-bottom:1px solid var(--line); font:.78rem/1.3 var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
.qv5-addr i{ font-style:normal; display:inline-flex; gap:3px; } .qv5-addr i b{ width:8px; height:8px; border-radius:50%; background:var(--line); display:inline-block; }
.qv5-hl{ box-shadow:0 0 0 2.5px var(--k-qa); border-radius:6px; transition:box-shadow .4s, opacity .4s; } .qv5-lo{ opacity:.35; transition:opacity .4s; }
/* web site */
.qv5-dom{ max-width:440px; margin:0 auto; border:2px dashed transparent; border-radius:12px; padding:8px; transition:border-color .5s, background .5s; }
.qv5-dom.on{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 6%, transparent); }
.qv5-domtag{ text-align:center; margin:0 0 8px; } .qv5-domtag span{ display:inline-block; background:var(--s-qa); color:#fff; border-radius:8px; padding:4px 10px; font:600 .84rem/1.3 var(--mono); }
.qv5-domtag small{ display:block; font:.76rem var(--body); color:var(--graphite); margin-top:3px; }
.qv5-pages{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; }
.qv5-pg{ border:1.3px solid var(--line); border-radius:6px; background:var(--paper); padding:5px; display:flex; flex-direction:column; gap:3px; align-items:stretch; }
.qv5-pg > b{ font-size:.8rem; text-align:center; border-bottom:1px solid var(--line); padding-bottom:3px; }
.qv5-pg .qv5-chip{ text-align:center; padding:1px 4px; font-size:.75rem; }
.qv5-host{ max-width:260px; margin:6px auto 0; border:1.4px solid var(--k-qa); border-radius:8px; padding:6px 10px; text-align:center; font-weight:600; font-size:.86rem; background:var(--paper); color:var(--ink); }
.qv5-host small{ display:block; font-weight:400; font-size:.76rem; color:var(--graphite); }
.qv5-up{ text-align:center; color:var(--k-qa); font-size:.8rem; margin-top:4px; }
/* browsers */
.qv5-br{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; max-width:420px; margin:0 auto; }
.qv5-br div{ border:1.4px solid var(--line); border-radius:10px; padding:10px 6px; text-align:center; background:var(--paper); color:var(--ink); font-weight:600; font-size:.88rem; transition:all .5s ease; }
.qv5-br div small{ display:block; font-weight:500; font-size:.78rem; margin-top:4px; color:var(--graphite); }
.qv5-br div.ok{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 12%, var(--paper)); }
.qv5-br div.warn{ border-color:var(--pen); border-style:dashed; } .qv5-br div.warn small{ color:var(--pen); font-weight:700; }
.qv5-br div.test{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); } .qv5-br div.test small{ color:var(--ok); font-weight:700; }
.qv5-br div.dim{ opacity:.35; }
/* page parts */
.qv5-hd{ padding:8px 10px; border-bottom:1px solid var(--line); }
.qv5-hd.gfx{ background:linear-gradient(120deg, color-mix(in srgb, var(--k-qa) 40%, var(--paper)), var(--paper)); display:flex; gap:8px; align-items:center; }
.qv5-hd .nm{ font-weight:700; font-size:1rem; } .qv5-logo{ width:30px; height:30px; border-radius:50%; background:var(--s-qa); color:#fff; display:grid; place-items:center; font-weight:800; font-size:.9rem; flex:none; }
.qv5-lk{ display:flex; flex-wrap:wrap; gap:4px 12px; padding:6px 10px; border-bottom:1px solid var(--line); }
.qv5-lk a{ color:var(--k-qa); text-decoration:underline; cursor:pointer; font-size:.8rem; }
.qv5-ct{ padding:8px 10px; display:grid; grid-template-columns:minmax(0,1fr) 70px; gap:8px; align-items:start; }
.qv5-lines i{ display:block; height:6px; border-radius:3px; background:var(--line); margin:4px 0; } .qv5-pic{ height:52px; border-radius:6px; background:color-mix(in srgb, var(--k-qa) 30%, var(--paper-2)); display:grid; place-items:center; font-size:.75rem; color:var(--ink); }
.qv5-legend{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:10px; }
/* link uses */
.qv5-view{ min-height:92px; padding:10px; display:grid; place-items:center; text-align:center; }
.qv5-prog{ width:180px; max-width:100%; height:10px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin:6px auto 0; } .qv5-prog i{ display:block; height:100%; background:var(--k-qa); transition:width .2s linear; }
.qv5-mail{ width:100%; max-width:300px; border:1px solid var(--line); border-radius:6px; text-align:left; overflow:hidden; } .qv5-mail .t{ background:#1f5fbf; color:#fff; padding:3px 8px; font-size:.78rem; font-weight:600; } .qv5-mail div{ padding:3px 8px; border-bottom:1px solid var(--line); font-size:.78rem; }
.qv5-links{ display:flex; flex-wrap:wrap; gap:6px 12px; padding:8px 10px; border-bottom:1px solid var(--line); justify-content:center; }
.qv5-links button{ font:inherit; font-size:.8rem; background:none; border:0; padding:3px 4px; color:var(--k-qa); text-decoration:underline; cursor:pointer; border-radius:4px; }
.qv5-links button.on{ background:color-mix(in srgb, var(--k-qa) 16%, var(--paper)); font-weight:700; }
/* content forms */
.qv5-cg{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; padding:8px; }
.qv5-cg > div{ border:1.3px solid var(--line); border-radius:8px; padding:6px; min-height:58px; display:flex; flex-direction:column; gap:4px; align-items:center; justify-content:center; text-align:center; font-size:.78rem; transition:opacity .4s, box-shadow .4s; background:var(--paper); }
.qv5-cg > div > b{ font-size:.78rem; }
.qv5-cg .wide{ grid-column:1 / -1; }
.qv5-wave{ display:flex; gap:2px; align-items:center; height:22px; } .qv5-wave i{ width:3px; background:var(--k-qa); border-radius:2px; animation:qv5w 1s ease-in-out infinite; } @keyframes qv5w{ 50%{ transform:scaleY(.35); } }
.qv5-cg input{ font:inherit; font-size:.8rem; width:100%; max-width:130px; box-sizing:border-box; border:1px solid var(--line); border-radius:4px; padding:2px 5px; background:var(--paper); color:var(--ink); }
.qv5-ad{ background:var(--s-qa); color:#fff; border-radius:6px; padding:3px 8px; font-weight:700; animation:qv5in .5s ease both; }
/* 13 elements */
.qv5-nums{ display:grid; grid-template-columns:repeat(7, minmax(0,1fr)); gap:5px; max-width:400px; margin:0 auto 10px; }
.qv5-nums button{ font:600 .86rem var(--body); min-height:32px; border-radius:8px; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; padding:0; }
.qv5-nums button.on{ background:var(--s-qa); color:#fff; border-color:transparent; }
.qv5-elh{ text-align:center; font-weight:700; font-size:.95rem; margin:0 0 2px; } .qv5-elc{ text-align:center; font-size:.82rem; color:var(--graphite); margin:0 0 8px; }
.qv5-mini{ max-width:380px; margin:0 auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:10px; font-size:.82rem; line-height:1.4; min-height:96px; position:relative; }
.qv5-mini.fail{ box-shadow:inset 4px 0 0 var(--pen); } .qv5-mini.pass{ box-shadow:inset 4px 0 0 var(--ok); }
.qv5-verdict{ text-align:center; font-weight:700; font-size:.86rem; margin:8px 0 0; }
.qv5-tiny{ display:flex; gap:3px; flex-wrap:wrap; } .qv5-tiny i{ width:22px; height:22px; border:1px solid var(--line); border-radius:3px; display:grid; place-items:center; font-style:normal; font-size:.75rem; color:var(--graphite); }
.qv5-big{ display:inline-block; background:var(--s-qa); color:#fff; border-radius:8px; padding:6px 16px; font-weight:700; }
.qv5-blink{ font-size:1.25rem; font-weight:900; color:var(--pen); animation:qv5blink 1s steps(2, start) infinite; } @keyframes qv5blink{ to{ visibility:hidden; } }
.qv5-a{ color:var(--k-qa); text-decoration:underline; }
.qv5-busy{ padding:8px; border-radius:6px; color:#9ca3af; background:repeating-linear-gradient(45deg,#a3a9b8 0 8px,#b9bfcc 8px 16px); font-weight:600; }
.qv5-clean{ padding:8px; border-radius:6px; color:#111; background:#f8fafc; border:1px solid #cbd5e1; }
.qv5-bars{ display:flex; gap:6px; align-items:flex-end; height:60px; justify-content:center; } .qv5-bars i{ width:26px; background:var(--k-qa); border-radius:3px 3px 0 0; display:block; }
.qv5-tbl{ border-collapse:collapse; font-size:.78rem; } .qv5-tbl td, .qv5-tbl th{ border:1px solid var(--line); padding:2px 6px; }
.qv5-sb{ height:8px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); margin-top:5px; position:relative; } .qv5-sb i{ position:absolute; left:0; top:0; bottom:0; width:30%; border-radius:99px; background:var(--graphite); }
.qv5-wrap .im{ width:64px; height:52px; border-radius:6px; background:color-mix(in srgb, var(--k-qa) 45%, var(--paper-2)); display:grid; place-items:center; font-size:.75rem; color:var(--ink); }
.qv5-wrap.pass .im{ float:left; margin:0 8px 4px 0; } .qv5-wrap.fail .im{ position:absolute; left:40px; top:14px; opacity:.92; }
.qv5-code{ font:.78rem/1.45 var(--mono); background:var(--paper-2); border:1px solid var(--line); border-radius:6px; padding:6px 8px; white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.qv5-code .on{ background:color-mix(in srgb, var(--k-qa) 26%, transparent); border-radius:3px; }
/* site map */
.qv5-sm{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:440px; margin:0 auto; }
.qv5-map{ border:1.4px solid var(--k-qa); border-radius:8px; padding:6px 8px; background:var(--paper); }
.qv5-map > b{ display:block; font-size:.82rem; margin-bottom:4px; } .qv5-map .row{ display:flex; flex-wrap:wrap; gap:5px; }
.qv5-pgs{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; }
.qv5-pgs > div{ border:1.3px solid var(--line); border-radius:8px; padding:5px; background:var(--paper); transition:box-shadow .4s; }
.qv5-pgs > div > b{ display:block; font-size:.82rem; margin-bottom:3px; } .qv5-pgs .nav{ display:flex; flex-wrap:wrap; gap:3px; min-height:22px; }
.qv5-pgs .nav .qv5-chip{ font-size:.75rem; padding:1px 5px; } .qv5-pgs .none{ font-size:.76rem; color:var(--pen); font-weight:700; }
.qv5-pgs > div.cur{ box-shadow:0 0 0 2.5px var(--k-qa); }
/* dynamic content */
.qv5-dyn .sky{ height:64px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; transition:background .6s; color:#fff; font-weight:700; }
.qv5-dyn .sky .ic{ font-size:1.6rem; } .qv5-ticker{ display:flex; flex-wrap:wrap; gap:0 14px; background:#0b0b0d; color:#e5e7eb; font:.8rem/1.8 var(--mono); padding:0 8px; }
.qv5-ticker span{ white-space:nowrap; } .qv5-up2{ color:#4ade80; } .qv5-dn2{ color:#f87171; }
.qv5-ctl{ display:grid; gap:6px; max-width:420px; margin:10px auto 0; font-size:.82rem; } .qv5-ctl label{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; } .qv5-ctl input[type=range]{ flex:1; min-width:120px; accent-color:var(--k-qa); }
.qv5-cov{ display:grid; grid-template-columns:auto repeat(3, minmax(0,1fr)); gap:3px; max-width:340px; margin:8px auto 0; font-size:.76rem; text-align:center; }
.qv5-cov span{ border:1px solid var(--line); border-radius:4px; padding:2px; background:var(--paper); } .qv5-cov span.hd{ border:0; background:none; color:var(--graphite); font-weight:600; } .qv5-cov span.y{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); border-color:var(--ok); }
/* database pages */
.qv5-db{ display:grid; grid-template-columns:minmax(0,1fr); gap:6px; max-width:440px; margin:0 auto; }
.qv5-box{ border:1.4px solid var(--line); border-radius:8px; padding:6px 8px; background:var(--paper); transition:opacity .4s, box-shadow .4s; } .qv5-box > b{ display:block; font-size:.8rem; color:var(--graphite); margin-bottom:4px; }
.qv5-box.on{ box-shadow:0 0 0 2.5px var(--k-qa); } .qv5-box.off{ opacity:.35; }
.qv5-box table{ border-collapse:collapse; width:100%; font-size:.8rem; } .qv5-box td, .qv5-box th{ border:1px solid var(--line); padding:2px 5px; text-align:left; } .qv5-box tr.new td{ background:color-mix(in srgb, var(--k-qa) 18%, var(--paper)); }
.qv5-slots{ display:flex; gap:5px; flex-wrap:wrap; align-items:center; } .qv5-slot{ border:1.4px dashed var(--line); border-radius:6px; min-width:62px; min-height:24px; display:grid; place-items:center; font-size:.78rem; }
.qv5-cat{ display:grid; grid-template-columns:repeat(auto-fill, minmax(78px, 1fr)); gap:5px; } .qv5-cat div{ border:1px solid var(--line); border-radius:6px; padding:4px; text-align:center; font-size:.78rem; } .qv5-cat div b{ display:block; } .qv5-cat .out{ color:var(--pen); font-weight:700; }
.qv5-add{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:8px 0 0; font-size:.8rem; } .qv5-add input{ font:inherit; font-size:.82rem; width:96px; border:1px solid var(--line); border-radius:6px; padding:3px 6px; background:var(--paper); color:var(--ink); }
.qv5-btnpress{ animation:qv5press .6s ease 2; } @keyframes qv5press{ 50%{ transform:scale(.92); } }
/* load */
.qv5-ld{ display:grid; grid-template-columns:minmax(0,1fr) 92px; gap:8px; align-items:center; max-width:420px; margin:0 auto; }
.qv5-users{ container-type:inline-size; position:relative; height:110px; border:1px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; }
.qv5-users i{ position:absolute; width:7px; height:7px; border-radius:50%; background:var(--k-qa); animation:qv5go var(--d) linear infinite; animation-delay:var(--dl); left:0; }
.qv5-users i.x{ background:var(--pen); }
@keyframes qv5go{ from{ transform:translateX(0); opacity:0; } 10%{ opacity:1; } to{ transform:translateX(var(--w)); opacity:.9; } }
.qv5-srv{ border:2px solid var(--k-qa); border-radius:8px; padding:6px; text-align:center; font-size:.8rem; font-weight:600; background:var(--paper); }
.qv5-srv.hot{ border-color:var(--pen); }
.qv5-meter{ height:10px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin-top:5px; } .qv5-meter i{ display:block; height:100%; background:var(--k-qa); transition:width .5s ease; } .qv5-srv.hot .qv5-meter i{ background:var(--pen); }
.qv5-nums2{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:8px auto 0; } .qv5-nums2 div{ border:1px solid var(--line); border-radius:8px; padding:5px; text-align:center; background:var(--paper); font-size:.78rem; color:var(--graphite); } .qv5-nums2 b{ display:block; font:700 .95rem var(--mono); color:var(--ink); }
/* security */
.qv5-q{ display:grid; grid-template-columns:repeat(10, minmax(0,1fr)); gap:3px; max-width:340px; margin:6px auto; } .qv5-q i{ height:22px; border-radius:4px; border:1px solid var(--line); background:var(--paper); transition:background .3s; } .qv5-q i.a{ background:var(--pen); border-color:var(--pen); } .qv5-q i.u{ background:var(--ok); border-color:var(--ok); }
.qv5-who{ display:flex; justify-content:space-between; gap:8px; max-width:340px; margin:0 auto; font-size:.8rem; }
.qv5-buf{ display:grid; grid-template-columns:repeat(12, minmax(0,1fr)); gap:2px; max-width:380px; margin:8px auto 2px; }
.qv5-buf i{ height:28px; border:1.4px solid var(--k-qa); background:var(--paper); display:grid; place-items:center; font:700 .8rem var(--mono); font-style:normal; border-radius:3px; }
.qv5-buf i.nx{ border-color:var(--line); border-style:dashed; color:var(--graphite); } .qv5-buf i.ov{ background:var(--pen); color:#fff; border-color:var(--pen); border-style:solid; }
.qv5-bufl{ display:grid; grid-template-columns:2fr 1fr; max-width:380px; margin:0 auto; font-size:.76rem; color:var(--graphite); text-align:center; }
.qv5-inrow{ display:flex; gap:6px; justify-content:center; align-items:center; flex-wrap:wrap; font-size:.82rem; } .qv5-inrow input[type=text]{ font:.86rem var(--mono); width:150px; border:1px solid var(--line); border-radius:6px; padding:3px 6px; background:var(--paper); color:var(--ink); }
/* box views */
.qv5-bx{ display:grid; grid-template-columns:minmax(0,1fr); gap:6px; max-width:440px; margin:0 auto; }
.qv5-pane{ border:1.4px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; transition:opacity .5s, box-shadow .5s; } .qv5-pane > b{ display:block; font-size:.8rem; color:var(--graphite); margin-bottom:4px; }
.qv5-pane.on{ box-shadow:0 0 0 2.5px var(--k-qa); } .qv5-pane.off{ opacity:.25; filter:grayscale(1); }
.qv5-err{ border:2px dashed var(--pen); color:var(--pen); font-weight:700; border-radius:6px; padding:6px; text-align:center; font-size:.8rem; }
.qv5-files{ display:flex; gap:5px; flex-wrap:wrap; font:.78rem var(--mono); }
/* config */
.qv5-fac{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:4px 8px; align-items:center; max-width:400px; margin:0 auto; font-size:.82rem; }
.qv5-fac h5{ grid-column:1 / -1; margin:6px 0 0; font-size:.8rem; color:var(--graphite); }
.qv5-step{ display:inline-flex; align-items:center; gap:4px; } .qv5-step button{ width:28px; height:28px; border-radius:50%; border:1px solid var(--line); background:var(--paper); color:var(--ink); font:700 .95rem var(--body); cursor:pointer; padding:0; } .qv5-step b{ min-width:18px; text-align:center; font-family:var(--mono); }
.qv5-total{ text-align:center; margin:10px 0 0; } .qv5-total b{ display:block; font:800 1.4rem var(--mono); color:var(--k-qa); } .qv5-total code{ font:.78rem var(--mono); color:var(--graphite); overflow-wrap:anywhere; direction:ltr; display:block; }
.qv5-sw{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; } .qv5-sw > span{ width:100%; font-size:.78rem; color:var(--graphite); }
.qv5-sw button{ font:inherit; font-size:.78rem; padding:3px 8px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; min-height:28px; } .qv5-sw button[aria-pressed="true"]{ background:var(--s-qa); color:#fff; border-color:transparent; }
.qv5-ctrls{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px 10px; max-width:440px; margin:0 auto 10px; }
.qv5-scr{ margin:0 auto; border:3px solid var(--graphite); border-radius:6px; background:var(--paper); transition:width .5s ease; overflow:hidden; }
.qv5-site{ color:var(--ink); } .qv5-site .h{ background:var(--s-qa); color:#fff; padding:5px 8px; font-weight:700; } .qv5-site .n{ display:flex; flex-wrap:wrap; gap:2px 10px; padding:4px 8px; background:var(--paper-2); } .qv5-site .n span{ color:var(--k-qa); }
.qv5-site .c{ display:flex; flex-wrap:wrap; gap:6px; padding:6px 8px; } .qv5-site .c p{ margin:0; flex:1 1 120px; } .qv5-site .im{ flex:0 0 70px; height:50px; border-radius:4px; background:color-mix(in srgb, var(--k-qa) 40%, var(--paper-2)); display:grid; place-items:center; font-size:.75rem; }
.qv5-site.nocss{ font-family:"Times New Roman", serif; } .qv5-site.nocss .h{ background:none; color:var(--ink); font-size:1.2em; padding:4px 6px; } .qv5-site.nocss .n{ display:block; background:none; padding:0 6px; } .qv5-site.nocss .n span{ display:block; text-decoration:underline; color:#2563eb; }
.qv5-site.nocss .c{ display:block; padding:4px 6px; } .qv5-site.nocss .im{ border-radius:0; background:none; border:1px solid var(--graphite); width:70px; }
.qv5-site .im.load{ background:var(--paper-2); color:var(--graphite); }
.qv5-tc{ text-align:center; font:.78rem var(--mono); color:var(--graphite); margin:8px auto 0; max-width:420px; overflow-wrap:anywhere; }
/* tools */
.qv5-tools{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:5px; max-width:420px; margin:0 auto; }
.qv5-tools div{ border:1.3px solid var(--line); border-radius:8px; padding:5px 6px; font-size:.8rem; line-height:1.3; background:var(--paper); display:flex; gap:6px; align-items:center; transition:all .4s; }
.qv5-tools div i{ font-style:normal; width:16px; flex:none; text-align:center; } .qv5-tools div.done{ border-color:var(--ok); } .qv5-tools div.done i{ color:var(--ok); }
.qv5-tools div.on{ background:var(--s-qa); color:#fff; border-color:var(--s-qa); }
.qv5-scan{ display:inline-block; animation:qv5spin 1.4s linear infinite; } @keyframes qv5spin{ to{ transform:rotate(360deg); } }
.qv5-script{ max-width:420px; margin:10px auto 0; }
.qv5-script .qv5-code div{ transition:opacity .4s; } .qv5-script .qv5-code div.w{ opacity:.35; }
@media (prefers-reduced-motion: reduce){ .qv5-in, .qv5-wave i, .qv5-blink, .qv5-users i, .qv5-scan, .qv5-ad, .qv5-btnpress{ animation:none; } }`;
  if (!document.getElementById('qv5-css')) { const s = document.createElement('style'); s.id = 'qv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  const Fig = ({ children, cls }) => html`<figure className=${'fig qv5' + (cls ? ' ' + cls : '')}>${children}</figure>`;
  const Addr = ({ url }) => html`<div className="qv5-addr"><i><b></b><b></b><b></b></i><span>${url}</span></div>`;
  // a ticking counter (stops under reduced motion)
  function useTick(ms, on) { const [t, setT] = useState(0); useEffect(() => { if (calm() || on === false) return; const id = setInterval(() => setT(x => x + 1), ms); return () => clearInterval(id); }, [ms, on]); return t; }

  /* ── [0.1] slide 3: a web site = pages under one domain, with a domain name and a web host ── */
  function WebSite({ ar }) {
    const steps = [
      { en: 'A <b>Web site</b> is a collection of a number of <b>Web pages</b>.', ar: 'الـ <b>Web site</b> هو مجموعة من الـ <b>Web pages</b>.' },
      { en: 'The pages include <b>texts, graphic images, links, sounds</b> and other elements.', ar: 'الصفحات دي فيها <b>texts و graphic images و links و sounds</b> وعناصر تانية.' },
      { en: 'It is one or more Web pages <b>grouped under the same domain</b>.', ar: 'يعني web page واحدة أو أكتر <b>متجمعين تحت نفس الـ domain</b>.' },
      { en: 'It must contain a <b>domain name</b>…', ar: 'ولازم يكون ليه <b>domain name</b>…' },
      { en: '…and a <b>Web host</b>, the server the pages are stored on and served from.', ar: 'و<b>Web host</b> كمان، وده الـ server اللي الصفحات متخزنة عليه وبتتبعت منه.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const P = ['Home page', 'Page 2', 'Page 3'], E = ['Text', 'Graphics', 'Links', 'Sounds'];
    return html`<${Fig}><div className="fig-stage">
      <div className=${'qv5-dom' + (i >= 2 ? ' on' : '')}>
        <div className=${'qv5-domtag ' + pop(i >= 3)}><span>www.yoursite.com</span><small>domain name</small></div>
        <div className="qv5-pages">${P.map((p, j) => html`<div key=${p} className="qv5-pg qv5-in" style=${{ animationDelay: j * .25 + 's' }}><b>${p}</b>
          ${E.map(e => html`<span key=${e} className=${'qv5-chip k ' + pop(i >= 1)}>${e}</span>`)}</div>`)}</div>
        ${i >= 2 && html`<p className="qv5-note">same domain</p>`}
      </div>
      <div className=${pop(i >= 4)}><div className="qv5-up">▲ stored on ▲</div><div className="qv5-host">Web host<small>the server</small></div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [0.2] slide 4: a site built for Internet Explorer, then tested on every browser and platform ── */
  function Browsers({ ar }) {
    const B = ['Internet Explorer', 'Mozilla', 'Chrome', 'Linux'];
    const S = [['ok', 'dim', 'dim', 'dim'], ['ok', 'warn', 'dim', 'dim'], ['ok', 'warn', 'warn', 'warn'], ['test', 'test', 'test', 'test']];
    const L = { ok: 'designed for it', warn: 'may not work?', dim: 'not checked', test: '✓ tested, works' };
    const steps = [
      { en: 'You designed a Web site for your company that can be accessed using the browser <b>Internet Explorer</b>.', ar: 'إنت عملت Web site لشركتك بيشتغل على الـ browser اللي اسمه <b>Internet Explorer</b>.' },
      { en: 'How would the customer access the Web site while using another browser like <b>Mozilla</b>?', ar: 'طب الـ customer هيفتح الـ Web site إزاي لو بيستخدم browser تاني زي <b>Mozilla</b>؟' },
      { en: '…or <b>Chrome</b>, or on <b>Linux</b>? Nobody has checked, so the site may fail there.', ar: 'أو <b>Chrome</b>، أو على <b>Linux</b>؟ محدش اتأكد، فالـ site ممكن يبوظ هناك.' },
      { en: 'Thus <b>Web site testing</b> is essential to ensure that your Web site is operational <b>on every browser and across all platforms</b>.', ar: 'عشان كده الـ <b>Web site testing</b> ضروري عشان نضمن إن الـ Web site شغال <b>على كل browser وعلى كل الـ platforms</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    return html`<${Fig}><div className="fig-stage"><div className="qv5-br">${B.map((b, j) => html`<div key=${b} className=${S[i][j]}>${b}<small>${L[S[i][j]]}</small></div>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [1.0] slides 4 and 5: the three components of a web page ── */
  function PageParts({ ar }) {
    const steps = [
      { k: '', en: 'Web page fundamentals: three components, <b>1. Home page</b>, <b>2. Links</b>, <b>3. Content</b>.', ar: 'أساسيات الـ Web page فيها 3 components هما الـ <b>Home page</b> والـ <b>Links</b> والـ <b>Content</b>.' },
      { k: 'H', en: '<b>Home page</b>: the default page in the Web site. Usually it includes a <b>header on the top</b> representing the source name of the site. Some simple headers include <b>only text</b>…', ar: 'الـ <b>Home page</b> هي الصفحة الـ default في الـ Web site. عادةً فيها <b>header فوق</b> بيمثل الـ source name بتاع الـ site. فيه headers بسيطة فيها <b>text بس</b>…' },
      { k: 'H', g: 1, en: '…while others include <b>designs along with graphic images</b>.', ar: 'وفيه headers تانية فيها <b>designs ومعاها graphic images</b>.' },
      { k: 'L', g: 1, en: '<b>Links</b> link all local and remotely stored Web pages to the home page.', ar: 'الـ <b>Links</b> بتربط كل الـ Web pages الـ local والـ remote بالـ home page.' },
      { k: 'C', g: 1, en: '<b>Content</b>: texts, graphic images and sounds. It is the <b>most important part</b> of a Web site.', ar: 'الـ <b>Content</b> زي الـ texts والـ graphic images والـ sounds. وده <b>أهم جزء</b> في الـ Web site.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const st = steps[i], c = k => (st.k === '' ? '' : st.k === k ? ' qv5-hl' : ' qv5-lo');
    return html`<${Fig}><div className="fig-stage">
      <div className="qv5-page"><${Addr} url="www.yoursite.com  (default page)" />
        <div className=${(st.g ? 'qv5-hd gfx' : 'qv5-hd') + c('H')}>${st.g ? html`<span className="qv5-logo">Y</span>` : null}<span className="nm">Your Site Name</span></div>
        <div className=${'qv5-lk' + c('L')}><a>About us</a><a>Products</a><a>Partner site ↗</a></div>
        <div className=${'qv5-ct' + c('C')}><div className="qv5-lines"><i style=${{ width: '90%' }}></i><i></i><i style=${{ width: '75%' }}></i><i style=${{ width: '85%' }}></i><span>♪ sound</span></div><div className="qv5-pic">graphic</div></div>
      </div>
      <div className="qv5-legend">${[['H', '1. Home page'], ['L', '2. Links'], ['C', '3. Content']].map(([k, t]) => html`<span key=${k} className=${'qv5-chip' + (st.k === k || st.k === '' ? ' on' : '')}>${t}</span>`)}</div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [1.1] slide 5: what links are used for, click each ── */
  function LinkUses({ ar }) {
    const U = [
      { t: 'Products', url: 'www.yoursite.com/products.html', en: '1. <b>Navigate users to other Web pages</b>: a local page of the same site opens.', ar: 'الاستخدام الأول إنها <b>توديك لـ Web pages تانية</b>: صفحة local من نفس الـ site بتفتح.' },
      { t: 'Partner site ↗', url: 'www.othersite.com', en: '2. <b>Direct the user to a different location</b>: here a remotely stored page on another site.', ar: 'الاستخدام التاني إنها <b>توجّه الـ user لمكان مختلف</b>: هنا صفحة remote على site تاني.' },
      { t: 'brochure.pdf ⤓', url: 'www.yoursite.com', en: '3. <b>Download files</b> from the Web site.', ar: 'الاستخدام التالت إنها <b>تنزّل files</b> من الـ Web site.' },
      { t: 'E-mail us ✉', url: 'www.yoursite.com', en: '4. <b>Access other Internet tools</b>, such as the default e-mail client like Microsoft Outlook. Tester: send an e-mail and verify that you get a response.', ar: 'الاستخدام الرابع إنها <b>تفتح Internet tools تانية</b> زي الـ default e-mail client مثلًا Microsoft Outlook. والـ tester يبعت e-mail ويتأكد إن فيه رد بيوصله.' }
    ];
    const steps = [{ en: 'Links on a Web site are used to access local and remotely stored Web pages. <b>Click a link</b>, or press Next.', ar: 'الـ Links في الـ Web site بنوصل بيها للـ Web pages الـ local والـ remote. <b>دوس على link</b> أو دوس Next.' }].concat(U);
    const [i, ctl] = useSteps(steps.length, 2800);
    const [p, setP] = useState(0);
    useEffect(() => { if (i !== 3) return; if (calm()) { setP(100); return; } setP(0); const id = setInterval(() => setP(x => { if (x >= 100) { clearInterval(id); return 100; } return x + 10; }), 160); return () => clearInterval(id); }, [i]);
    let view;
    if (i === 0) view = html`<div><b>Home page</b><div className="qv5-note">four links above</div></div>`;
    else if (i === 1) view = html`<div className="qv5-in"><b>Products</b><div className="qv5-note">another page of this site (local)</div></div>`;
    else if (i === 2) view = html`<div className="qv5-in"><b>Other Site</b><div className="qv5-note">a different location (remote)</div></div>`;
    else if (i === 3) view = html`<div style=${{ width: '100%' }}><b>${p < 100 ? 'Downloading brochure.pdf…' : '✓ brochure.pdf downloaded'}</b><div className="qv5-prog"><i style=${{ width: p + '%' }}></i></div></div>`;
    else view = html`<div className="qv5-mail qv5-in"><div className="t">Microsoft Outlook · New message</div><div>To: info@yoursite.com</div><div>Subject:</div><div style=${{ minHeight: '22px', borderBottom: 0 }}></div></div>`;
    return html`<${Fig}><div className="fig-stage"><div className="qv5-page">
      <${Addr} url=${i === 0 ? 'www.yoursite.com' : U[i - 1].url} />
      <div className="qv5-links">${U.map((u, j) => html`<button key=${j} className=${i === j + 1 ? 'on' : ''} onClick=${() => ctl.go(j + 1)}>${u.t}</button>`)}</div>
      <div className="qv5-view">${view}</div></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [1.2] slide 6: the seven forms content takes, live ── */
  function ContentForms({ ar }) {
    const F = [
      ['Text documents', 'الـ text documents'], ['Graphics', 'الـ graphics'], ['Sounds', 'الأصوات (sounds)'], ['Movie clips (that can be downloaded)', 'الـ movie clips (اللي ممكن تتنزل)'],
      ['Fields (that enable the users to enter the data)', 'الـ fields (اللي بتخلي الـ users يدخلوا data)'], ['Advertisements (that keep rotating)', 'الإعلانات (اللي بتلف على طول)'], ['Text (that change dynamically)', 'الـ text (اللي بيتغير dynamically)']
    ];
    const steps = [{ en: '<b>Content is the most important part of a Web site.</b> It can take many forms.', ar: '<b>الـ Content هو أهم جزء في الـ Web site.</b> وليه أشكال كتير.' }]
      .concat(F.map(([e, a], j) => ({ en: `${j + 1}. <b>${e}</b>`, ar: `الشكل رقم ${j + 1} هو <b>${a}</b>` })));
    const [i, ctl] = useSteps(steps.length, 1900);
    const t = useTick(1000), ads = ['Ad 1 of 3', 'Ad 2 of 3', 'Ad 3 of 3'], ad = Math.floor(t / 2) % 3;
    const now = new Date(), hh = String(now.getHours()).padStart(2, '0'), mm = String(now.getMinutes()).padStart(2, '0'), ss = String(now.getSeconds()).padStart(2, '0');
    const c = j => (i === 0 ? '' : i === j + 1 ? ' qv5-hl' : ' qv5-lo');
    return html`<${Fig}><div className="fig-stage"><div className="qv5-page"><${Addr} url="www.yoursite.com" />
      <div className="qv5-cg">
        <div className=${c(0)}><b>📄 Text</b><div className="qv5-lines" style=${{ width: '80%' }}><i></i><i style=${{ width: '70%' }}></i></div></div>
        <div className=${c(1)}><b>Graphics</b><svg viewBox="0 0 60 30" width="60" height="30" aria-hidden="true"><path d="M0 30 L18 10 L30 22 L42 6 L60 30 Z" style=${{ fill: 'var(--k-qa)' }} /><circle cx="50" cy="8" r="4" style=${{ fill: 'var(--pen)' }} /></svg></div>
        <div className=${c(2)}><b>Sound</b><div className="qv5-wave">${[10, 18, 8, 22, 14, 20, 9, 16].map((h, k) => html`<i key=${k} style=${{ height: h + 'px', animationDelay: k * .1 + 's' }}></i>`)}</div></div>
        <div className=${c(3)}><b>▶ clip.mp4</b><span className="qv5-a">Download ⤓</span></div>
        <div className=${c(4)}><b>Your name:</b><input type="text" aria-label="Your name" placeholder="type here" /></div>
        <div className=${c(5)}><b>Advertisement</b><span key=${ad} className="qv5-ad">${ads[ad]}</span></div>
        <div className=${'wide' + c(6)}><b>Text that changes dynamically</b><span style=${{ fontFamily: 'var(--mono)' }}>Last updated ${hh}:${mm}:${ss}</span></div>
      </div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [2] slides 7 to 12: the 13 elements, each as a failing and a passing page ── */
  const xorHex = (s, k) => [...s].map((ch, j) => ((ch.charCodeAt(0) ^ k.charCodeAt(j % k.length)) & 255).toString(16).padStart(2, '0')).join('');
  const EL = [
    { n: 'User Interface', c: 'Verify that the Web site is simple to use.', ca: 'اتأكد إن الـ Web site سهل في الاستخدام.',
      s: ok => ok ? html`<div style=${{ textAlign: 'center' }}><span className="qv5-big">Sign in</span><div className="qv5-note">one clear action, labelled</div></div>`
        : html`<div><div className="qv5-tiny">${'?????????'.split('').map((q, k) => html`<i key=${k}>${q}</i>`)}</div><div className="qv5-note">nine unlabelled buttons: which one signs you in?</div></div>` },
    { n: 'Instructions', c: 'Make sure the Web site contains all relevant instructions; some people may require some clarification.', ca: 'اتأكد إن الـ Web site فيه كل الـ instructions المهمة، لأن فيه ناس ممكن تحتاج توضيح.',
      s: ok => html`<div><b>Choose a password:</b><div style=${{ border: '1px solid var(--line)', borderRadius: '3px', height: '22px', maxWidth: '170px', margin: '4px 0' }}></div>${ok ? html`<div className="qv5-note" style=${{ textAlign: 'left' }}>Minimum of 8 characters in length</div>` : html`<div className="qv5-bad">no instruction: how long? which characters?</div>`}</div>` },
    { n: 'Site map / navigational map', c: 'The map exists and is appropriate, every link on it exists and works, the navigation bar is on every page.', ca: 'الـ map موجود ومناسب، وكل link فيه موجود وشغال، والـ navigation bar موجود في كل صفحة.',
      s: ok => html`<div>${ok ? html`<div style=${{ display: 'flex', gap: '4px 10px', flexWrap: 'wrap', borderBottom: '1px solid var(--line)', paddingBottom: '4px' }}>${['Home', 'Products', 'Support', 'Site map'].map(t => html`<span key=${t} className="qv5-a">${t}</span>`)}</div>` : html`<div className="qv5-bad">no navigation bar, no site map</div>`}<p style=${{ margin: '6px 0 0' }}><b>Support</b> page: how do you get back to Products?</p></div>` },
    { n: 'Content', c: 'Professional: no plagiarism, minimal bold text, big fonts and blinking text; all Web references are hyperlinked.', ca: 'محتوى professional: مفيش plagiarism، وأقل bold text و big fonts و blinking text، وكل الـ Web references عليها hyperlink.',
      s: ok => ok ? html`<p style=${{ margin: 0 }}>Our new courses start in October. Read more in the <span className="qv5-a">course guide</span>.</p>`
        : html`<div><span className="qv5-blink">BEST COURSES!!!</span><p style=${{ margin: '4px 0 0' }}><b>OUR NEW COURSES START IN OCTOBER.</b> Read more at www.yoursite.com/guide (not a link)</p></div>` },
    { n: 'Colors / backgrounds', c: 'Colors and backgrounds must not make the content difficult to read.', ca: 'الـ colors والـ backgrounds لازم ماتخليش قراية الـ content صعبة.',
      s: ok => html`<div className=${ok ? 'qv5-clean' : 'qv5-busy'}>Opening hours: 9:00 to 17:00, Sunday to Thursday.</div>` },
    { n: 'Images', c: '"A picture is worth a thousand words": use it to convey messages to the users.', ca: 'الصورة بألف كلمة، فاستخدمها عشان توصّل الرسالة للـ users.',
      s: ok => ok ? html`<div><div className="qv5-bars">${[20, 34, 48, 58].map((h, k) => html`<i key=${k} style=${{ height: h + 'px' }}></i>`)}</div><div className="qv5-note">Sales, Q1 to Q4</div></div>`
        : html`<p style=${{ margin: 0 }}>Sales in the first quarter were low, in the second quarter they were higher than the first, in the third quarter higher again, and in the fourth quarter they were the highest of the year…</p>` },
    { n: 'Tables', c: 'Position tables so users do not need to keep scrolling to access the information.', ca: 'حط الـ tables في مكان مريح عشان الـ users مايفضلوش يعملوا scroll عشان يوصلوا للمعلومة.',
      s: ok => ok ? html`<table className="qv5-tbl"><tbody>${[['Course', 'SQA'], ['Lecture', '5'], ['Topic', 'Web site testing'], ['Room', 'Hall 2']].map(([a, b]) => html`<tr key=${a}><th>${a}</th><td>${b}</td></tr>`)}</tbody></table>`
        : html`<div><table className="qv5-tbl"><thead><tr><th>Course</th><th>Lecture</th><th>Topic</th><th>…</th></tr></thead><tbody><tr><td>SQA</td><td>5</td><td>Web site…</td><td>…</td></tr></tbody></table><div className="qv5-sb"><i></i></div><div className="qv5-bad" style=${{ fontSize: '.78rem', marginTop: '4px' }}>→ keep scrolling sideways to see the other columns</div></div>` },
    { n: 'Wrap-around', c: 'When there are images on the Web site, ensure the correct wrap-around of those images.', ca: 'لو فيه images في الـ Web site، اتأكد إن الـ text بيلف حواليها صح (wrap-around).',
      s: ok => html`<div className=${'qv5-wrap ' + (ok ? 'pass' : 'fail')}><div className="im">image</div><p style=${{ margin: 0 }}>The text of this paragraph should flow around the image beside it and never run underneath it, so every word stays readable on the page.</p></div>` },
    { n: 'Functionality', c: 'Test all the links, the database connection, and the forms used to acquire information from the users.', ca: 'اختبر كل الـ links والـ database connection والـ forms اللي بتاخد معلومات من الـ users.',
      s: ok => html`<div style=${{ display: 'grid', gap: '4px' }}>${[['Links', 1], ['Database connection', ok], ['Forms', 1]].map(([t, g]) => html`<div key=${t}><span className=${g ? 'qv5-ok' : 'qv5-bad'}>${g ? '✓' : '✕'}</span> ${t}${g ? '' : ': could not connect'}</div>`)}</div>` },
    { n: 'Links', c: 'A link acts as a vehicle that navigates the user from one page to another.', ca: 'الـ link هو العربية اللي بتنقل الـ user من صفحة لصفحة.',
      s: ok => html`<div><span className="qv5-a">Products</span> → ${ok ? html`<b>Products page</b> <span className="qv5-ok">✓</span>` : html`<span className="qv5-bad">404 Page not found</span>`}</div>` },
    { n: 'Forms', c: 'When a user fills up a form, the information should be accepted and the submit button should work properly.', ca: 'لما الـ user يملا form، المعلومات لازم تتقبل وزرار الـ submit يشتغل صح.',
      s: ok => html`<div><div>Name: <b>John Smith</b></div><div style=${{ margin: '6px 0' }}><span className="qv5-big" style=${{ padding: '3px 12px' }}>Submit</span></div>${ok ? html`<span className="qv5-ok">✓ Information accepted</span>` : html`<span className="qv5-bad">pressed… nothing happens</span>`}</div>` },
    { n: 'Data verification', c: 'The data entered as user input should match the business rules defined for the system.', ca: 'الـ data اللي الـ user بيدخلها لازم تطابق الـ business rules المتحددة للـ system.',
      s: ok => html`<div><div>Rule: password, <b>minimum of 8 characters</b></div><div style=${{ margin: '6px 0', fontFamily: 'var(--mono)' }}>input: abc12 (5 characters)</div>${ok ? html`<span className="qv5-ok">✓ rejected: minimum of 8 characters</span>` : html`<span className="qv5-bad">✕ accepted, although it breaks the rule</span>`}</div>` },
    { n: 'Cookies', c: 'If the site uses cookies, check them; for login information, the cookies work and the information is encrypted in the cookie file.', ca: 'لو الـ site بيستخدم cookies اختبرها، ولو فيها login information اتأكد إن الـ cookies شغالة والمعلومات متشفرة (encrypted) في الـ cookie file.',
      s: ok => html`<div><b>cookie file</b><div className="qv5-code">login=JSmith; password=${ok ? xorHex('abcd1234', 'k3y') : 'abcd1234'}</div><div style=${{ marginTop: '4px' }}>${ok ? html`<span className="qv5-ok">✓ works (stays signed in), password encrypted</span>` : html`<span className="qv5-bad">✕ password readable by anyone with the file</span>`}</div></div>` }
  ];
  function Elements13({ ar }) {
    const [k, setK] = useState(0), [ok, setOk] = useState(false);
    const e = EL[k];
    const en = `<b>${k + 1}. ${e.n}</b>: ${e.c} ${ok ? 'This page <b>passes</b> the check.' : 'This page <b>fails</b> the check.'}`;
    const a = `العنصر رقم ${k + 1} هو الـ <b>${e.n}</b>: ${e.ca} ${ok ? 'الصفحة دي <b>بتعدّي</b> الـ check.' : 'الصفحة دي <b>بتفشل</b> في الـ check.'}`;
    return html`<${Fig}><div className="fig-stage">
      <div className="qv5-nums" role="group" aria-label="Pick an element">${EL.map((x, j) => html`<button key=${j} className=${j === k ? 'on' : ''} aria-pressed=${j === k} onClick=${() => { setK(j); setOk(false); }}>${j + 1}</button>`)}</div>
      <p className="qv5-elh">${k + 1}. ${e.n}</p>
      <div className="qv5-modes"><button className="fig-btn" aria-pressed=${!ok} onClick=${() => setOk(false)}>✕ Fails the check</button><button className="fig-btn" aria-pressed=${ok} onClick=${() => setOk(true)}>✓ Passes the check</button></div>
      <div key=${k + '' + ok} className=${'qv5-mini qv5-in ' + (ok ? 'pass' : 'fail')}>${e.s(ok)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [2.1] slide 8: site map testing, points (a) to (d), run on a small site ── */
  function SiteMap({ ar }) {
    const PG = ['Home', 'Products', 'Support', 'About'], MAP = ['Home', 'Products', 'Support', 'About', 'Downloads'];
    const [fixed, setFixed] = useState(false);
    const steps = [
      { en: 'Experienced users generally know where exactly they want to go and avoid lengthy instructions, so the site needs a <b>site map</b> (like http://www.apple.com/sitemap/). Here: a small site with four pages and its map.', ar: 'الـ users اللي عندهم خبرة غالبًا عارفين بالظبط عايزين يروحوا فين وبيتجنبوا الـ instructions الطويلة، فالـ site محتاج <b>site map</b> زي اللي في الـ slide. وهنا site صغير فيه 4 صفحات ومعاه الـ map بتاعه.' },
      { en: '<b>(a) Is the site map appropriate?</b> Every page of the site appears on the map.', ar: 'السؤال الأول: <b>هل الـ site map مناسب؟</b> كل صفحة في الـ site موجودة على الـ map.' },
      { en: '<b>(b) Does each link on the map really exist?</b> ' + (fixed ? 'Every map entry is a real page.' : '"Downloads" is on the map, but <b>no such page exists</b>.'), ar: 'السؤال التاني: <b>هل كل link على الـ map موجود فعلًا؟</b> ' + (fixed ? 'كل حاجة على الـ map صفحة حقيقية.' : 'الـ "Downloads" موجود على الـ map، بس <b>مفيش صفحة بالاسم ده</b>.') },
      { en: '<b>(c) Is the navigational bar present on every page of the site?</b> ' + (fixed ? 'Yes, on all four pages.' : 'The <b>About</b> page has <b>no navigation bar</b>.'), ar: 'السؤال التالت: <b>هل الـ navigational bar موجود في كل صفحة؟</b> ' + (fixed ? 'أيوه، في الـ 4 صفحات.' : 'صفحة الـ <b>About</b> <b>مفيهاش navigation bar</b>.') },
      { en: '<b>(d) Does each link work on each page?</b> ' + (fixed ? 'Every link works on every page.' : 'On the <b>Support</b> page, the "Products" link is <b>broken</b>.'), ar: 'السؤال الرابع: <b>هل كل link شغال في كل صفحة؟</b> ' + (fixed ? 'كل الـ links شغالة في كل الصفحات.' : 'في صفحة الـ <b>Support</b>، الـ link بتاع "Products" <b>بايظ</b>.') },
      { en: fixed ? 'Re-test: <b>all four checks pass</b>.' : '<b>3 defects found</b> by the four site-map checks. Press "Fix and re-test".', ar: fixed ? 'إعادة الـ test: <b>الـ 4 checks عدّوا كلهم</b>.' : 'الـ 4 checks بتوع الـ site map لقوا <b>3 defects</b>. دوس "Fix and re-test".' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const mapCls = m => { if (i < 1) return 'qv5-chip'; if (m === 'Downloads') { if (fixed) return 'qv5-chip dim'; return i >= 2 ? 'qv5-chip bad' : 'qv5-chip'; } return 'qv5-chip ok'; };
    const navOf = p => (p === 'About' && !fixed ? null : PG);
    const linkCls = (p, l) => (i >= 4 && p === 'Support' && l === 'Products' && !fixed ? 'qv5-chip bad' : i >= 4 ? 'qv5-chip ok' : 'qv5-chip');
    const cur = p => (i === 3 && p === 'About') || (i === 4 && p === 'Support');
    return html`<${Fig}><div className="fig-stage"><div className="qv5-sm">
      <div className=${'qv5-map' + (i === 1 || i === 2 ? ' qv5-hl' : '')}><b>Site map</b><div className="row">${MAP.filter(m => !(fixed && m === 'Downloads')).map(m => html`<span key=${m} className=${mapCls(m)}>${m}${i >= 2 && m === 'Downloads' && !fixed ? ' ✕' : ''}</span>`)}</div></div>
      <div className="qv5-pgs">${PG.map(p => { const nav = navOf(p); return html`<div key=${p} className=${cur(p) ? 'cur' : ''}><b>${p}</b>
        ${nav ? html`<div className="nav">${nav.filter(l => l !== p).map(l => html`<span key=${l} className=${linkCls(p, l)}>${l}${linkCls(p, l).includes('bad') ? ' ✕' : ''}</span>`)}</div>` : html`<div className=${i >= 3 ? 'none' : 'qv5-note'} style=${{ textAlign: 'left', margin: 0 }}>${i >= 3 ? '✕ no navigation bar' : 'page text…'}</div>`}</div>`; })}</div>
    </div>${i === steps.length - 1 && html`<div className="qv5-modes" style=${{ marginTop: '10px' }}><button className="fig-btn solid" onClick=${() => { setFixed(f => !f); ctl.replay(); }}>${fixed ? '↺ Put the defects back' : 'Fix and re-test'}</button></div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [4.1] slide 18: dynamic content, varied by time of day, weather, stock tickers ── */
  function Dynamic({ ar }) {
    const W = [['Sunny', '☀', '#f59e0b'], ['Rainy', '🌧', '#64748b'], ['Snowy', '❄', '#60a5fa']];
    const [h, setH] = useState(9), [w, setW] = useState(0), [seen, setSeen] = useState({ '0-0': 1 });
    const br = h < 12 ? 0 : h < 18 ? 1 : 2, G = ['Good morning', 'Good afternoon', 'Good evening'];
    useEffect(() => { setSeen(s => Object.assign({}, s, { [br + '-' + w]: 1 })); }, [br, w]);
    const t = useTick(1500);
    const px = (b, k) => (b + 3 * Math.sin((t + k) * 1.7) + 1.5 * Math.cos((t + k * 2) * .9)).toFixed(2);
    const stocks = [['STOCK A', 101.2, 0], ['STOCK B', 48.75, 3], ['STOCK C', 230.1, 5]];
    const n = Object.keys(seen).length;
    const sky = h < 6 || h >= 19 ? '#1e293b' : W[w][2];
    const en = `<b>Dynamic content</b>: graphics and text that vary depending on some conditions, e.g. time of day, weather, stock tickers. White-box: you know the conditions in the code, so test every branch with every weather: <b>${n} of 9</b> combinations seen. Move the hour and pick the weather.`;
    const a = `الـ <b>Dynamic content</b> هو graphics و text بيتغيروا حسب ظروف معينة، زي وقت اليوم والطقس والـ stock tickers. في الـ white-box إنت عارف الشروط اللي في الـ code، فاختبر كل branch مع كل طقس. شفت <b><bdi dir="ltr">${n}</bdi> من <bdi dir="ltr">9</bdi></b> combinations. حرّك الساعة واختار الطقس.`;
    return html`<${Fig}><div className="fig-stage">
      <div className="qv5-page qv5-dyn"><${Addr} url="www.yoursite.com" />
        <div className="sky" style=${{ background: sky }}><span>${G[br]}!</span><span className="ic" aria-hidden="true">${W[w][1]}</span></div>
        <div className="qv5-ticker">${stocks.map(([s, b, k]) => { const v = px(b, k), up = Math.sin((t + k) * 1.7) >= 0; return html`<span key=${s}>${s} ${v} <b className=${up ? 'qv5-up2' : 'qv5-dn2'}>${up ? '▲' : '▼'}</b></span>`; })}</div>
      </div>
      <div className="qv5-ctl"><label>Hour <input type="range" min="0" max="23" value=${h} onInput=${e => setH(+e.target.value)} onChange=${e => setH(+e.target.value)} aria-label="Hour of day" /><b style=${{ fontFamily: 'var(--mono)' }}>${String(h).padStart(2, '0')}:00</b></label>
        <div className="qv5-sw">${W.map(([x], j) => html`<button key=${x} aria-pressed=${j === w} onClick=${() => setW(j)}>${x}</button>`)}</div></div>
      <div className="qv5-script"><div className="qv5-code">${[['if (hour < 12)', 'greet = "Good morning"'], ['else if (hour < 18)', 'greet = "Good afternoon"'], ['else', 'greet = "Good evening"']].map(([c, g], j) => html`<div key=${j} className=${j === br ? 'on' : ''}>${c}<br />${'    ' + g}</div>`)}</div></div>
      <div className="qv5-cov"><span className="hd"></span>${W.map(([x]) => html`<span key=${x} className="hd">${x}</span>`)}${G.map((g, b) => html`<${React.Fragment} key=${g}><span className="hd">${g.split(' ')[1]}</span>${W.map(([x], j) => html`<span key=${x} className=${seen[b + '-' + j] ? 'y' : ''}>${seen[b + '-' + j] ? '✓' : ''}</span>`)}<//>`)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [4.3] slides 18 and 19: database-driven pages and programmatically created pages ── */
  function DbPages({ ar }) {
    const ROWS = [['Pen', 2, 120], ['Notebook', 5, 40], ['Bag', 25, 0]];
    const [mine, setMine] = useState(null), [nm, setNm] = useState('Lamp'), [pr, setPr] = useState('15');
    const steps = [
      { en: '<b>Database-driven Web pages</b>: pages that display <b>catalogs or inventories</b> (e.g. e-commerce) are built from the rows of a database.', ar: 'الـ <b>Database-driven Web pages</b>: الصفحات اللي بتعرض <b>catalogs أو inventories</b> (زي الـ e-commerce) بتتبني من الـ rows اللي في الـ database.' },
      { en: '<b>Programmatically created pages</b>: a Web page designer may <b>type entries in a database</b>…', ar: 'الـ <b>Programmatically created pages</b>: الـ designer ممكن <b>يكتب entries في database</b>…' },
      { en: '…<b>drag and drop elements in a layout program</b>…', ar: 'و<b>يعمل drag and drop للعناصر في layout program</b>…' },
      { en: '…<b>press a button, and generate the HTML</b>…', ar: 'و<b>يدوس زرار فيطلّع الـ HTML</b>…' },
      { en: '…that <b>displays the Web page</b>. White-box testing checks this inner path: does every database row reach the page correctly ("Bag" with 0 in stock shows "out of stock")? Type your own entry.', ar: 'اللي <b>بيعرض الـ Web page</b>. الـ white-box testing بيختبر الطريق ده من جوه: هل كل row في الـ database بيوصل للصفحة صح؟ (الـ "Bag" اللي الـ stock بتاعه صفر بيظهر "out of stock"). اكتب entry بتاعك.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const extra = i >= 1 ? (mine || ['Lamp', 15, 4]) : null;
    const rows = extra ? ROWS.concat([extra]) : ROWS;
    const typed = i === 1 && !calm() ? 'Lamp' : null;
    const shown = i === 0 || i >= 4 ? rows : ROWS;
    const lay = i >= 2, gen = i >= 3;
    return html`<${Fig}><div className="fig-stage"><div className="qv5-db">
      <div className=${'qv5-box' + (i <= 1 ? ' on' : '')}><b>database: inventory</b><table><thead><tr><th>item</th><th>price</th><th>stock</th></tr></thead>
        <tbody>${rows.map((r, j) => html`<tr key=${j} className=${j === 3 ? 'new' : ''}><td>${j === 3 && typed ? html`<span className="qv5-in">${r[0]}</span>` : r[0]}</td><td>$${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table></div>
      <div className=${'qv5-box' + (i === 2 ? ' on' : i < 2 ? ' off' : '')}><b>layout program</b><div className="qv5-slots">${['item', 'price', 'stock'].map((s, j) => html`<span key=${s} className="qv5-slot">${lay ? html`<span className="qv5-chip k qv5-in" style=${{ animationDelay: j * .3 + 's' }}>[${s}]</span>` : ''}</span>`)}
        <span className=${'qv5-chip' + (gen ? ' on' : '') + (i === 3 ? ' qv5-btnpress' : '')}>Generate HTML</span></div></div>
      <div className=${'qv5-box' + (i === 3 ? ' on' : i < 3 ? ' off' : '')}><b>generated HTML</b><div className="qv5-code">${gen ? rows.map((r, j) => html`<div key=${j}>${'<div class="item">' + r[0] + ' $' + r[1] + '</div>'}</div>`) : '…'}</div></div>
      <div className=${'qv5-box' + (i === 0 || i === 4 ? ' on' : ' off')}><b>Web page: catalog</b><div className="qv5-cat">${shown.map((r, j) => html`<div key=${j}><b>${r[0]}</b>$${r[1]}${r[2] ? '' : html`<span className="out"> out of stock</span>`}</div>`)}</div></div>
    </div>
    ${i === 4 && html`<div className="qv5-add"><input type="text" value=${nm} aria-label="Item name" onInput=${e => setNm(e.target.value)} /><input type="number" min="0" value=${pr} aria-label="Price" style=${{ width: '64px' }} onInput=${e => setPr(e.target.value)} /><button className="fig-btn solid" onClick=${() => setMine([nm.trim() || 'Item', Math.max(0, +pr || 0), 4])}>Add and generate</button></div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${{ go: ctl.go, replay: () => { setMine(null); ctl.replay(); } }} /><//>`;
  }

  /* ── [4.4] slide 19: server performance and loading, simulate up to millions of connections ── */
  function Load({ ar }) {
    const [k, setK] = useState(calm() ? 6 : 2);
    const N = Math.pow(10, k), CAP = 100000, served = Math.min(N, CAP), failed = N - served, pct = Math.min(100, N / CAP * 100);
    const f = x => x.toLocaleString('en-US');
    const dots = Math.min(28, 3 + k * 4);
    const en = `Popular Web sites might receive <b>millions of hits per day</b>, so we simulate millions of connections and downloads to test performance. Simulating <b>${f(N)}</b> connection${N > 1 ? 's' : ''}: ${failed ? `<b>${f(failed)}</b> fail, the server is past its limit.` : 'all are served.'} (This demo server is assumed to handle ${f(CAP)} at once.)`;
    const a = `المواقع المشهورة ممكن يجيلها <b>ملايين hits في اليوم</b>، فبنعمل simulation لملايين connections و downloads عشان نختبر الـ performance. عاملين simulation لـ <b><bdi dir="ltr">${f(N)}</bdi></b> connection: ${failed ? `فيه <b><bdi dir="ltr">${f(failed)}</bdi></b> فشلوا، الـ server عدّى الحد بتاعه.` : 'كلهم اتخدموا.'} وافترضنا إن الـ server ده بيستحمل <bdi dir="ltr">${f(CAP)}</bdi> في نفس الوقت.`;
    return html`<${Fig}><div className="fig-stage">
      <div className="qv5-ld"><div className="qv5-users" aria-hidden="true">${Array.from({ length: dots }, (_, j) => html`<i key=${k + '-' + j} className=${failed && j % 3 === 0 ? 'x' : ''} style=${{ top: (6 + (j * 37) % 96) + 'px', '--d': (2.4 - k * .25) + 's', '--dl': (-(j * .37) % 2) + 's', '--w': 'calc(100cqw - 10px)' }}></i>`)}</div>
        <div className=${'qv5-srv' + (failed ? ' hot' : '')}>Web server<div className="qv5-meter"><i style=${{ width: pct + '%' }}></i></div><div style=${{ fontWeight: 400, fontSize: '.78rem', marginTop: '3px' }}>load ${pct >= 100 ? '100%+' : pct.toFixed(pct < 1 ? 3 : 0) + '%'}</div></div></div>
      <div className="qv5-ctl"><label>Simulated connections <input type="range" min="0" max="7" value=${k} onInput=${e => setK(+e.target.value)} onChange=${e => setK(+e.target.value)} aria-label="Simulated connections, power of ten" /></label></div>
      <div className="qv5-nums2"><div><b>${f(N)}</b>simulated</div><div><b>${f(served)}</b>served</div><div><b style=${{ color: failed ? 'var(--pen)' : 'var(--ink)' }}>${f(failed)}</b>failed</div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [4.5] slide 19: security tests, denial of service and buffer overflow ── */
  function Security({ ar }) {
    const [m, setM] = useState(0), [flood, setFlood] = useState(false), [inp, setInp] = useState('AAAAAAAAAAAA'), [chk, setChk] = useState(false);
    const t = useTick(350, flood);
    const fill = flood ? (calm() ? 10 : Math.min(10, t + 1)) : 0;
    let body, en, a;
    if (m === 0) {
      const full = fill >= 10;
      body = html`<div className="qv5-who"><span className="qv5-bad">attacker</span><span>server: 10 request slots</span><span className="qv5-ok">real user</span></div>
        <div className="qv5-q">${Array.from({ length: 10 }, (_, j) => html`<i key=${j} className=${j < fill ? 'a' : !flood && j === 0 ? 'u' : ''}></i>`)}</div>
        <p className="qv5-note">${!flood ? 'normal day: the real user’s request is served' : full ? html`<span className="qv5-bad">all slots busy: the real user’s request is denied</span>` : 'flooding…'}</p>
        <div className="qv5-modes"><button className="fig-btn solid" onClick=${() => setFlood(f => !f)}>${flood ? 'Stop the flood' : 'Start a flood of requests'}</button></div>`;
      en = '<b>Denial of service</b>: an attacker floods the server with requests until real users are denied service. The security test sends such a flood and checks whether the site keeps serving its users.';
      a = 'الـ <b>Denial of service</b>: الـ attacker بيغرق الـ server بـ requests لحد ما الـ users الحقيقيين مايتخدموش. الـ security test بيبعت flood زي ده ويشوف الـ site لسه بيخدم الـ users ولا لأ.';
    } else {
      const s = chk ? inp.slice(0, 8) : inp, over = Math.max(0, inp.length - 8);
      body = html`<div className="qv5-inrow"><label>Input <input type="text" value=${inp} maxLength="12" aria-label="Input" onInput=${e => setInp(e.target.value)} /></label><span>${inp.length} chars</span></div>
        <div className="qv5-buf">${Array.from({ length: 12 }, (_, j) => html`<i key=${j} className=${j >= 8 ? (j < s.length ? 'ov' : 'nx') : ''}>${s[j] || ''}</i>`)}</div>
        <div className="qv5-bufl"><span>buffer: 8 characters</span><span>next data in memory</span></div>
        <div className="qv5-modes" style=${{ marginTop: '8px' }}><button className="fig-btn" aria-pressed=${!chk} onClick=${() => setChk(false)}>No length check</button><button className="fig-btn" aria-pressed=${chk} onClick=${() => setChk(true)}>Checks the length</button></div>
        <p className="qv5-note">${over ? (chk ? html`<span className="qv5-ok">extra ${over} characters rejected</span>` : html`<span className="qv5-bad">${over} characters overwrite the next data</span>`) : 'fits in the buffer'}</p>`;
      en = '<b>Buffer overflow</b>: input longer than the space reserved for it spills over and overwrites the data next to it in memory. The security test types over-long input and checks that the site rejects it.';
      a = 'الـ <b>Buffer overflow</b>: الـ input اللي أطول من المساحة المحجوزة ليه بيطفح ويكتب فوق الـ data اللي جنبه في الـ memory. الـ security test بيدخّل input طويل زيادة ويتأكد إن الـ site بيرفضه.';
    }
    return html`<${Fig}><div className="fig-stage">
      <div className="qv5-modes">${['Denial of service', 'Buffer overflow'].map((x, j) => html`<button key=${x} className="fig-btn" aria-pressed=${j === m} onClick=${() => { setM(j); setFlood(false); }}>${x}</button>`)}</div>${body}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [4.6] slides 18 and 20: black, white and gray box on the same page; gray box isolates the defect ── */
  function BoxView({ ar }) {
    const steps = [
      { v: [1, 0, 0], en: '<b>Black-box</b>: the tester sees only the page, as the user does. The graphic shows an <b>error</b>, but why?', ar: 'الـ <b>Black-box</b>: الـ tester شايف الصفحة بس زي الـ user. الـ graphic بيطلّع <b>error</b>، بس ليه؟' },
      { v: [0, 0, 1], en: '<b>White-box</b>: the tester knows the internal design and working of the system: server code, database, files.', ar: 'الـ <b>White-box</b>: الـ tester عارف الـ internal design وطريقة شغل الـ system من جوه: الـ server code والـ database والـ files.' },
      { v: [1, 1, 0], en: '<b>Gray-box</b>: a mix of black-box and white-box. The tester works from the user’s view but can also see the page’s HTML and scripts (‡ not on the slides).', ar: 'الـ <b>Gray-box</b>: خليط من الـ black-box والـ white-box. الـ tester بيشتغل من وجهة نظر الـ user بس كمان يقدر يشوف الـ HTML والـ scripts بتوع الصفحة (‡ مش في الـ slides).' },
      { v: [1, 1, 0], hit: 1, en: 'Its purpose: <b>isolate defects</b> related to bad design or bad implementation. The HTML asks for <b>logo.jpg</b>: the graphic is <b>incorrectly named</b>, a bad implementation, not a bad design.', ar: 'الهدف منه إنه <b>يعزل الـ defects</b> اللي سببها design وحش أو implementation وحش. الـ HTML بيطلب <b>logo.jpg</b>، يعني الـ graphic <b>اسمها غلط</b>، وده implementation وحش مش design وحش.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const st = steps[i], cls = j => 'qv5-pane' + (st.v[j] ? ' on' : ' off');
    return html`<${Fig}><div className="fig-stage"><div className="qv5-bx">
      <div className=${cls(0)}><b>what the user sees</b><div style=${{ display: 'flex', gap: '8px', alignItems: 'center' }}><div className="qv5-err" style=${{ flex: 'none', width: '84px' }}>⚠ image error</div><div>Welcome to our site</div></div></div>
      <div className=${cls(1)}><b>page HTML and scripts</b><div className="qv5-code"><div className=${st.hit ? 'on' : ''}>${'<img src="images/logo.jpg">'}</div><div>${'<p>Welcome to our site</p>'}</div></div></div>
      <div className=${cls(2)}><b>internal design</b><div className="qv5-files"><span className="qv5-chip">server code</span><span className="qv5-chip">database</span><span className="qv5-chip">images/Logo-new.jpg</span></div></div>
    </div><div className="qv5-legend">${['Black-box', 'Gray-box', 'White-box'].map((x, j) => html`<span key=${x} className=${'qv5-chip' + ((i === 0 && j === 0) || (i === 1 && j === 2) || (i >= 2 && j === 1) ? ' on' : '')}>${x}</span>`)}</div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [5.0] slide 20: hardware configurations and compatibility factors multiply ── */
  const HW = ['CPU types', 'RAM', 'Graphics cards', 'Video capture cards', 'Audio cards', 'Monitors/Display devices', 'Network cards'];
  const CO = ['Font sizes', 'Browsers with CSS', 'Screen resolutions', 'Memory sizes', 'Network environments'];
  function ConfigCount({ ar }) {
    const [n, setN] = useState(HW.concat(CO).map(() => 2));
    const set = (j, d) => setN(a => a.map((v, k) => (k === j ? Math.max(1, Math.min(5, v + d)) : v)));
    const hw = n.slice(0, 7).reduce((p, v) => p * v, 1), all = n.reduce((p, v) => p * v, 1), f = x => x.toLocaleString('en-US');
    const row = (name, j) => html`<${React.Fragment} key=${name}><span>${j < 7 ? '(' + (j + 1) + ')' : '(' + (j - 6) + ')'} ${name}</span><span className="qv5-step"><button aria-label=${'Fewer ' + name} onClick=${() => set(j, -1)}>−</button><b>${n[j]}</b><button aria-label=${'More ' + name} onClick=${() => set(j, 1)}>+</button></span><//>`;
    const en = `Configuration testing checks <b>variances</b> in each piece of hardware; compatibility checking adds font sizes, browsers with CSS, screen resolutions, memory sizes and network environments. Every choice multiplies: <b>${f(hw)}</b> hardware configurations, <b>${f(all)}</b> with the compatibility factors. Change how many variants each factor has.`;
    const a = `الـ configuration testing بيشوف الـ <b>variances</b> في كل قطعة hardware، والـ compatibility بيزوّد عليها font sizes و browsers with CSS و screen resolutions و memory sizes و network environments. كل اختيار بيضرب في اللي قبله، فبقى عندنا <b><bdi dir="ltr">${f(hw)}</bdi></b> hardware configuration، و <b><bdi dir="ltr">${f(all)}</bdi></b> لما نضيف الـ compatibility. غيّر عدد الـ variants لكل factor.`;
    return html`<${Fig}><div className="fig-stage"><div className="qv5-fac">
      <h5>Hardware configurations</h5>${HW.map((x, j) => row(x, j))}
      <h5>Compatibility</h5>${CO.map((x, j) => row(x, j + 7))}</div>
      <div className="qv5-total"><code>${n.slice(0, 7).join(' × ')} = ${f(hw)}</code>hardware configurations<b>${f(hw)}</b><code>${f(hw)} × ${n.slice(7).join(' × ')} = ${f(all)}</code>with compatibility<b>${f(all)}</b></div>
      <div className="qv5-modes" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${() => setN(n.map(() => 2))}>↻ 2 variants each</button></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [5.1] slide 20: compatibility, one page under different font sizes, CSS, resolutions, memory, networks ── */
  function CompatView({ ar }) {
    const FS = [['Small', .8], ['Normal', 1], ['Large', 1.3]], RS = [['800×600', 62], ['1024×768', 80], ['1920×1080', 100]], CS = ['With CSS', 'No CSS'], MS = ['Low memory', 'High memory'], NS = ['Slow network', 'Fast network'];
    const [fs, setFs] = useState(1), [rs, setRs] = useState(2), [cs, setCs] = useState(0), [ms, setMs] = useState(1), [ns, setNs] = useState(1), [loaded, setLoaded] = useState(true);
    useEffect(() => { if (ns === 1 || calm()) { setLoaded(true); return; } setLoaded(false); const t = setTimeout(() => setLoaded(true), 2500); return () => clearTimeout(t); }, [ns, fs, rs, cs, ms]);
    const sw = (label, opts, v, set) => html`<div className="qv5-sw"><span>${label}</span>${opts.map((o, j) => html`<button key=${j} aria-pressed=${j === v} onClick=${() => set(j)}>${Array.isArray(o) ? o[0] : o}</button>`)}</div>`;
    const tc = [FS[fs][0] + ' font', CS[cs], RS[rs][0], MS[ms], NS[ns]].join(' · ');
    const en = 'Compatibility checking: <b>various font sizes</b>, <b>browsers with CSS</b>, <b>various screen resolutions</b>, <b>various memory sizes</b> and <b>different network environments</b>. Every test case is one combination: ' + `<b>${3 * 2 * 3 * 2 * 2}</b> here. Low memory slows the page (the meter shows what is left).`;
    const a = 'الـ compatibility بيختبر <b>font sizes مختلفة</b> و <b>browsers مع الـ CSS</b> و <b>screen resolutions مختلفة</b> و <b>memory sizes مختلفة</b> و <b>network environments مختلفة</b>. كل test case هو combination واحد، وهنا عندنا ' + `<b><bdi dir="ltr">${3 * 2 * 3 * 2 * 2}</bdi></b>. والـ memory القليلة بتبطّأ الصفحة (الـ meter بيوري الباقي).`;
    return html`<${Fig}><div className="fig-stage">
      <div className="qv5-ctrls">${sw('Font size', FS, fs, setFs)}${sw('Browser', CS, cs, setCs)}${sw('Screen resolution', RS, rs, setRs)}${sw('Network', NS, ns, setNs)}${sw('Memory', MS, ms, setMs)}
        <div className="qv5-sw"><span>Memory left</span><div className="qv5-meter" style=${{ width: '100%' }}><i style=${{ width: ms ? '70%' : '12%', background: ms ? 'var(--k-qa)' : 'var(--pen)' }}></i></div></div></div>
      <div className="qv5-scr" style=${{ width: RS[rs][1] + '%' }}><div className=${'qv5-site' + (cs ? ' nocss' : '')} style=${{ fontSize: Math.max(.75, .82 * FS[fs][1]) + 'rem' }}>
        <div className="h">Your Site Name</div><div className="n"><span>Home</span><span>Products</span><span>Contact</span></div>
        <div className="c"><div className=${'im' + (loaded ? '' : ' load')}>${loaded ? 'graphic' : 'loading…'}</div><p>Web site testing makes sure this page works on every browser and platform.</p></div></div></div>
      <p className="qv5-tc">test case: ${tc}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [6.0] slide 21: what automatic web testing tools check, and a Cypress-style web application test ── */
  function Tools({ ar }) {
    const T = [
      ['Browser compatibility', 'الـ Browser compatibility', 'the same pages opened in many browsers.', 'نفس الصفحات بتتفتح على browsers كتير.'],
      ['Load, stress and performance', 'الـ Load والـ stress والـ performance', 'many simulated users at once.', 'فيه users كتير متعملهم simulation في نفس الوقت.'],
      ['Broken hyperlinks', 'الـ hyperlinks المكسورة', 'every link followed, broken ones reported.', 'كل link بيتمشي عليه، والمكسور بيتسجّل.'],
      ['Web functional, GUI testing', 'الـ Web functional والـ GUI testing', 'clicks and typing replayed like a user.', 'الضغطات والكتابة بتتعاد زي الـ user.'],
      ['Spelling on text', 'الـ Spelling في الـ text', 'every word of the text checked.', 'كل كلمة في الـ text بتتراجع.'],
      ['Security', 'الـ Security', 'attacks tried against the site.', 'هجمات بتتجرب على الـ site.'],
      ['Database', 'الـ Database', 'the data behind the pages.', 'الـ data اللي ورا الصفحات.'],
      ['OOP', 'الـ OOP', 'the object-oriented code.', 'الـ object-oriented code.'],
      ['Network', 'الـ Network', 'the connection between users and the server.', 'الاتصال بين الـ users والـ server.'],
      ['Web application (Selenium and Cypress)', 'الـ Web application (Selenium و Cypress)', 'a script drives the browser through the form.', 'فيه script بيسوق الـ browser خطوة بخطوة في الـ form.']
    ];
    const steps = [{ en: '<b>Tools that automatically check websites</b> for ten kinds of problems.', ar: 'فيه <b>tools بتختبر الـ websites أوتوماتيك</b> في 10 أنواع مشاكل.' }]
      .concat(T.map(([e, ea, d, da]) => ({ en: `<b>${e}</b>: ${d}`, ar: `الـ tool بتختبر <b>${ea}</b>: ${da}` })));
    const [i, ctl] = useSteps(steps.length, 1800);
    const S = ["cy.visit('/signup')", "cy.get('#login').type('JSmith')", "cy.get('#password').type('abc12')", "cy.contains('Submit').click()", "cy.contains('Minimum of 8 characters')"];
    const [ln, setLn] = useState(0);
    useEffect(() => { if (i !== T.length) return; if (calm()) { setLn(S.length); return; } setLn(0); const id = setInterval(() => setLn(x => (x >= S.length ? x : x + 1)), 650); return () => clearInterval(id); }, [i]);
    return html`<${Fig}><div className="fig-stage"><div className="qv5-tools">${T.map(([e], j) => html`<div key=${j} className=${i === j + 1 ? 'on' : i > j + 1 ? 'done' : ''}><i>${i === j + 1 ? html`<span className="qv5-scan">◌</span>` : i > j + 1 ? '✓' : '·'}</i>${e}</div>`)}</div>
      ${i === T.length && html`<div className="qv5-script"><div className="qv5-code">${S.map((l, j) => html`<div key=${j} className=${j < ln ? '' : 'w'}>${j < ln ? '✓ ' : '  '}${l}</div>`)}</div><p className="qv5-note">a Cypress test on the Gmail-style form: the short password must be rejected</p></div>`}</div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'qa-web-site': WebSite, 'qa-browsers': Browsers, 'qa-page-parts': PageParts, 'qa-link-uses': LinkUses, 'qa-content-forms': ContentForms,
    'qa-13-elements': Elements13, 'qa-site-map': SiteMap, 'qa-dynamic': Dynamic, 'qa-db-pages': DbPages, 'qa-load': Load, 'qa-security': Security,
    'qa-box-views': BoxView, 'qa-config-count': ConfigCount, 'qa-compat-view': CompatView, 'qa-web-tools': Tools
  });
})();
/* ── part L6 ── */
// Software Quality Assurance visuals, Lecture 6 (Software Quality Assurance, SQA): quality factors, SQA vs SQC, testing inside QA,
// tester and QA duties, ITSM, where a bug report goes in each test organization, metrics vs indicators and the quality indicators (slides 2 to 15).
// Every label and number comes from the site's notes.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.qv6 .fig-stage{ padding-left:8px; padding-right:8px; }
.qv6-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 12px; }
.qv6-modes .fig-btn[aria-pressed="true"]{ background:var(--s-qa); color:#fff; border-color:transparent; }
.qv6-def{ max-width:440px; margin:0 auto 12px; border:1.4px solid var(--k-qa); border-radius:10px; background:var(--paper); color:var(--ink); padding:8px 10px; font-size:.88rem; line-height:1.4; text-align:center; }
.qv6-def b{ color:var(--ink); }
.qv6-card{ max-width:440px; margin:0 auto 10px; border:1.6px dashed var(--k-qa); border-radius:10px; background:var(--paper); color:var(--ink); padding:10px; text-align:center; font-weight:600; font-size:.95rem; line-height:1.35; min-height:46px; }
.qv6-card small{ display:block; font-weight:400; font-size:.78rem; color:var(--graphite); margin-bottom:3px; }
.qv6-card.done{ border-style:solid; border-color:var(--ok); }
.qv6-bins{ display:grid; gap:6px; max-width:460px; margin:0 auto; }
.qv6-grp{ text-align:center; font-size:.78rem; color:var(--graphite); border-bottom:2px solid var(--k-qa); padding-bottom:3px; line-height:1.3; }
.qv6-bin{ font:inherit; text-align:left; border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:10px; padding:7px 6px; cursor:pointer; min-height:92px; display:flex; flex-direction:column; gap:4px; transition:border-color .3s, box-shadow .3s, background .3s; min-width:0; }
.qv6-bin:hover{ border-color:var(--k-qa); }
.qv6-bin > b{ font-size:.84rem; line-height:1.25; text-align:center; display:block; }
.qv6-bin > span.sub{ font-size:.76rem; line-height:1.25; color:var(--graphite); text-align:center; display:block; }
.qv6-bin.hit{ border-color:var(--ok); box-shadow:0 0 0 3px color-mix(in srgb, var(--ok) 25%, transparent); }
.qv6-bin.miss{ border-color:var(--pen); box-shadow:0 0 0 3px color-mix(in srgb, var(--pen) 25%, transparent); }
.qv6-bin i{ font-style:normal; display:block; font-size:.78rem; line-height:1.25; border-radius:6px; padding:2px 5px; background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); border:1px solid var(--k-qa); animation:qv6in .4s ease both; overflow-wrap:anywhere; }
.qv6-score{ text-align:center; font-size:.82rem; color:var(--graphite); margin-top:8px; }
@keyframes qv6in{ from{ opacity:0; transform:translateY(-6px); } to{ opacity:1; transform:none; } }
.qv6-in{ animation:qv6in .45s ease both; }
.qv6-grid8{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; max-width:440px; margin:0 auto; }
.qv6-grid8 button{ font:inherit; font-size:.86rem; font-weight:600; border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:10px; padding:8px 4px; cursor:pointer; min-height:40px; transition:all .3s; }
.qv6-grid8 button small{ display:block; font-weight:400; font-size:.76rem; color:var(--graphite); }
.qv6-grid8 button.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .qv6-grid8 button.on small{ color:rgba(255,255,255,.9); }
.qv6-grid8 button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.qv6-grid8 button.no{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.qv6-grid8 button.eff{ box-shadow:inset 0 -3px 0 var(--k-qa); }
.qv6-svg{ max-width:330px !important; }
.qv6-dot{ animation:qv6flowA 3s ease-in infinite; }
.qv6-dot.go{ animation-name:qv6flowB; } .qv6-dot.out{ animation-name:qv6flowC; }
@keyframes qv6flowA{ 0%{ transform:translate(0,0); opacity:0; } 12%{ opacity:1; } 80%{ transform:translate(0,64px); opacity:1; } 100%{ transform:translate(0,68px); opacity:0; } }
@keyframes qv6flowB{ 0%{ transform:translate(0,0); opacity:0; } 8%{ opacity:1; } 88%{ transform:translate(0,196px); opacity:1; } 100%{ transform:translate(0,200px); opacity:0; } }
@keyframes qv6flowC{ 0%{ transform:translate(0,0); opacity:0; } 8%{ opacity:1; } 55%{ transform:translate(0,138px); } 88%{ transform:translate(130px,214px); opacity:1; } 100%{ transform:translate(132px,218px); opacity:0; } }
.qv6-nest{ max-width:440px; margin:0 auto; border:2px solid var(--k-qa); border-radius:14px; padding:8px; background:color-mix(in srgb, var(--k-qa) 8%, var(--paper)); }
.qv6-nest > b, .qv6-inner > b{ display:block; text-align:center; font-size:.9rem; margin-bottom:6px; color:var(--ink); }
.qv6-inner{ border:2px dashed var(--s-qa); border-radius:12px; padding:8px; background:var(--paper); margin-top:8px; transition:box-shadow .4s, opacity .4s; }
.qv6-inner.on, .qv6-nest.on{ box-shadow:0 0 0 3px color-mix(in srgb, var(--k-qa) 30%, transparent); }
.qv6-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; }
.qv6-chips span{ border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:3px 9px; font-size:.8rem; line-height:1.3; }
.qv6-chips span.k{ border-color:var(--k-qa); font-weight:600; }
.qv6-chips span.p{ border-color:var(--pen); color:var(--pen); font-weight:700; }
.qv6-tree{ max-width:440px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:0; }
.qv6-node{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); color:var(--ink); padding:7px 10px; font-size:.86rem; line-height:1.35; text-align:center; transition:opacity .45s, transform .45s, border-color .45s, box-shadow .45s; }
.qv6-node b{ display:block; font-size:.9rem; }
.qv6-node.root{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .qv6-node.root b{ color:#fff; }
.qv6-node.on{ border-color:var(--k-qa); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-qa) 25%, transparent); }
.qv6-node.off{ opacity:0; transform:translateY(6px); }
.qv6-stem{ width:2px; height:14px; background:var(--graphite); }
.qv6-two{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; width:100%; position:relative; padding-top:14px; }
.qv6-two::before{ content:""; position:absolute; top:0; left:25%; right:25%; height:14px; border:2px solid var(--graphite); border-bottom:0; border-radius:6px 6px 0 0; }
.qv6-goal{ margin:6px 0 0; font-size:.82rem; color:var(--ink); border:1px dashed var(--k-qa); border-radius:99px; padding:3px 10px; text-align:center; }
.qv6-umb{ max-width:440px; margin:0 auto; }
.qv6-pill{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; margin-top:8px; }
.qv6-pill div{ border:1.4px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:7px 6px; font-size:.82rem; line-height:1.3; text-align:center; transition:opacity .45s, border-color .45s, background .45s; }
.qv6-pill div.on{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); }
.qv6-pill div.off{ opacity:.25; }
.qv6-roof{ text-align:center; padding:10px 6px; border-radius:60px 60px 8px 8px; background:var(--s-qa); color:#fff; font-weight:700; font-size:.95rem; }
.qv6-roof small{ display:block; font-weight:400; font-size:.8rem; color:rgba(255,255,255,.92); }
.qv6-meter{ margin-top:10px; border:1.4px solid var(--line); border-radius:10px; padding:8px; background:var(--paper); font-size:.82rem; text-align:center; color:var(--ink); }
.qv6-meter .tr{ height:12px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin-top:6px; position:relative; }
.qv6-meter .tr i{ position:absolute; top:0; bottom:0; left:0; background:var(--k-qa); animation:qv6meter 3.2s ease-in-out infinite alternate; }
@keyframes qv6meter{ from{ width:15%; } to{ width:90%; } }
.qv6-chain{ max-width:400px; margin:0 auto; display:flex; flex-direction:column; align-items:stretch; gap:0; }
.qv6-hop{ display:flex; gap:6px; align-items:stretch; }
.qv6-box{ flex:1; border:1.4px solid var(--line); border-radius:10px; background:var(--paper); color:var(--ink); padding:7px 8px; font-size:.86rem; font-weight:600; text-align:center; line-height:1.3; transition:all .4s; position:relative; min-width:0; }
.qv6-box small{ display:block; font-weight:400; font-size:.76rem; color:var(--graphite); }
.qv6-box.test{ border-color:var(--k-qa); }
.qv6-box.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .qv6-box.on small{ color:rgba(255,255,255,.9); }
.qv6-box.dec::after{ content:"decides"; position:absolute; top:-9px; right:8px; font-size:.72rem; font-weight:700; background:var(--paper); color:var(--pen); border:1px solid var(--pen); border-radius:99px; padding:0 6px; line-height:1.5; }
.qv6-side{ flex:0 0 36%; border:1px dashed var(--line); border-radius:10px; padding:6px 4px; font-size:.78rem; color:var(--graphite); text-align:center; line-height:1.3; display:flex; align-items:center; justify-content:center; }
.qv6-up{ text-align:center; color:var(--graphite); font-size:1rem; line-height:1; padding:3px 0; width:64%; }
.qv6-tok{ display:inline-block; margin-top:4px; font-size:.74rem; font-weight:700; background:var(--paper); color:var(--ink); border:1.3px solid var(--pen); border-radius:6px; padding:1px 6px; animation:qv6in .4s ease both; }
.qv6-out{ max-width:400px; margin:10px auto 0; display:grid; gap:6px; }
.qv6-out div{ border-radius:8px; padding:6px 8px; font-size:.82rem; line-height:1.35; color:var(--ink); animation:qv6in .45s ease both; }
.qv6-out .pro{ border:1.3px solid var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.qv6-out .con{ border:1.3px solid var(--pen); background:color-mix(in srgb, var(--pen) 10%, var(--paper)); }
.qv6-pool{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; max-width:460px; margin:0 auto; }
.qv6-pool button{ font:inherit; font-size:.8rem; line-height:1.25; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:5px 10px; cursor:pointer; min-height:32px; transition:all .3s; }
.qv6-pool button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); font-weight:600; }
.qv6-pool button.no{ border-color:var(--pen); color:var(--pen); text-decoration:line-through; }
.qv6-pool button.shown{ border-color:var(--k-qa); border-style:dashed; }
.qv6-map{ max-width:460px; margin:0 auto; display:grid; gap:8px; }
.qv6-zone{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:7px; transition:opacity .45s, border-color .45s, box-shadow .45s; }
.qv6-zone.on{ border-color:var(--k-qa); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-qa) 22%, transparent); }
.qv6-zone.dim{ opacity:.4; }
.qv6-zone > b{ display:block; font-size:.8rem; color:var(--graphite); margin-bottom:5px; text-align:center; font-weight:600; }
.qv6-phases{ display:flex; align-items:stretch; gap:0; }
.qv6-ph{ flex:1; border:1.3px solid var(--k-qa); border-radius:8px; padding:4px 2px; text-align:center; font-size:.8rem; color:var(--ink); background:color-mix(in srgb, var(--k-qa) 10%, var(--paper)); min-width:0; }
.qv6-gate{ flex:0 0 18px; display:flex; align-items:center; justify-content:center; color:var(--pen); font-weight:700; font-size:.9rem; }
.qv6-tags{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-top:6px; }
.qv6-tags span{ font-size:.78rem; border-radius:6px; padding:2px 7px; background:var(--s-qa); color:#fff; font-weight:600; line-height:1.35; }
.qv6-tags span.o{ background:var(--paper); color:var(--ink); border:1.3px solid var(--k-qa); }
.qv6-board{ max-width:460px; margin:0 auto; }
.qv6-row{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; justify-content:center; margin-bottom:6px; font-size:.8rem; color:var(--graphite); }
.qv6-row .fig-btn{ padding:4px 10px; font-size:.82rem; }
.qv6-row .fig-btn[aria-pressed="true"]{ background:var(--s-qa); color:#fff; border-color:transparent; }
.qv6-parts{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; }
.qv6-part{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:5px; min-height:84px; transition:border-color .4s, box-shadow .4s; min-width:0; }
.qv6-part > b{ display:block; text-align:center; font-size:.82rem; color:var(--ink); }
.qv6-part.hot{ border-color:var(--pen); box-shadow:0 0 0 3px color-mix(in srgb, var(--pen) 20%, transparent); }
.qv6-bugs{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin-top:4px; }
.qv6-bug{ font:inherit; font-size:.76rem; font-weight:700; border-radius:6px; border:1.3px solid var(--pen); background:var(--paper); color:var(--pen); padding:1px 5px; cursor:pointer; min-height:26px; animation:qv6in .35s ease both; }
.qv6-bug.fixed{ border-color:var(--ok); color:var(--ink); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.qv6-ind{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; margin-top:10px; }
.qv6-ind div{ border:1.3px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 6px; font-size:.78rem; line-height:1.3; color:var(--ink); text-align:center; }
.qv6-ind div b{ display:block; font:700 1.05rem var(--mono); color:var(--ink); }
.qv6-ind div.w{ grid-column:1 / -1; }
@media (prefers-reduced-motion: reduce){ .qv6-in, .qv6-bin i, .qv6-tok, .qv6-out div, .qv6-bug{ animation:none; } .qv6-dot{ animation:none; opacity:0; } .qv6-meter .tr i{ animation:none; width:60%; } }`;
  if (!document.getElementById('qv6-css')) { const s = document.createElement('style'); s.id = 'qv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* shared: sort each card into the right box */
  function Sorter({ ar, items, bins, intro, top, groups, done }) {
    const [k, setK] = useState(0), [placed, setPlaced] = useState({}), [fb, setFb] = useState(null), [flash, setFlash] = useState(null), [miss, setMiss] = useState(0);
    const cur = items[k];
    const pick = b => {
      if (!cur) return;
      if (b === cur.bin) {
        setPlaced(p => Object.assign({}, p, { [b]: (p[b] || []).concat(cur.t) }));
        setFb({ en: 'Right. ' + cur.why, ar: 'صح. ' + cur.whyAr }); setFlash([b, 'hit']); setK(k + 1);
      } else {
        const B = bins.find(x => x.k === b); setMiss(m => m + 1);
        setFb({ en: 'Not <b>' + B.en + '</b>. Try again.', ar: 'مش في <b>' + B.en + '</b>. جرّب تاني.' }); setFlash([b, 'miss']);
      }
    };
    const reset = () => { setK(0); setPlaced({}); setFb(null); setFlash(null); setMiss(0); };
    const fin = k >= items.length;
    const cap = fin ? { en: (fb ? fb.en + '<br>' : '') + done.en, ar: (fb ? fb.ar + '<br>' : '') + done.ar } : (fb || intro);
    return html`<figure className="fig qv6"><div className="fig-stage">
      ${top}
      <div className=${'qv6-card' + (fin ? ' done' : '')}>${fin ? html`<span>All ${items.length} sorted${miss ? ', ' + miss + ' slip' + (miss > 1 ? 's' : '') : ''}.</span>` : html`<span key=${k} className=${calm() ? '' : 'qv6-in'}><small>Card ${k + 1} of ${items.length}: tap the box it belongs in</small>${cur.t}</span>`}</div>
      <div className="qv6-bins" style=${{ gridTemplateColumns: `repeat(${bins.length}, minmax(0,1fr))` }}>
        ${groups && groups.map((g, j) => html`<div key=${'g' + j} className="qv6-grp" style=${{ gridColumn: 'span ' + g.span, visibility: g.en ? 'visible' : 'hidden' }} dangerouslySetInnerHTML=${{ __html: g.en || '.' }}></div>`)}
        ${bins.map(b => html`<button key=${b.k} className=${'qv6-bin' + (flash && flash[0] === b.k ? ' ' + flash[1] : '')} onClick=${() => pick(b.k)}>
          <b>${b.en}</b>${b.sub && html`<span className="sub">${b.sub}</span>`}${(placed[b.k] || []).map((t, j) => html`<i key=${j}>${t}</i>`)}</button>`)}
      </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${reset}>↻ Start over</button></div></figure>`;
  }

  /* ── [0] quality: directly vs indirectly measurable factors ── */
  function Measurable({ ar }) {
    const items = [
      { t: 'Defects', bin: 'd', why: '<b>Defects</b> are the slide\'s example of a <b>directly measurable</b> factor.', whyAr: 'الـ <b>Defects</b> هي مثال الـ slide على factor <b>directly measurable</b>.' },
      { t: 'Maintainability', bin: 'i', why: '<b>Maintainability</b> is an <b>indirectly measurable</b> factor.', whyAr: 'الـ <b>Maintainability</b> هي factor <b>indirectly measurable</b>.' },
      { t: 'Usability', bin: 'i', why: '<b>Usability</b> is an <b>indirectly measurable</b> factor.', whyAr: 'الـ <b>Usability</b> هي كمان factor <b>indirectly measurable</b>.' }
    ];
    const bins = [{ k: 'd', en: 'Directly measurable', sub: 'factors' }, { k: 'i', en: 'Indirectly measurable', sub: 'factors' }];
    const top = html`<div className="qv6-def"><b>Quality</b> = conformance to requirements<br />= the set of attributes valued by end-users</div>`;
    return html`<${Sorter} ar=${ar} items=${items} bins=${bins} top=${top}
      intro=${{ en: 'Quality is affected by two kinds of factors. <b>Sort the slide\'s three examples.</b>', ar: 'الـ quality بتتأثر بنوعين من الـ factors. <b>رتّب أمثلة الـ slide التلاتة.</b>' }}
      done=${{ en: 'Directly measurable: <b>defects</b>. Indirectly measurable: <b>maintainability</b> and <b>usability</b>.', ar: 'الـ directly measurable زي الـ <b>defects</b>، والـ indirectly measurable زي الـ <b>maintainability</b> والـ <b>usability</b>.' }} />`;
  }

  /* ── [1] the 8 software quality factors: explore, then quiz ── */
  const F8 = [
    ['Reliability', 'Performs its intended function accurately.', 'بيأدي الـ function المطلوبة منه بدقة.'],
    ['Efficiency', 'Optimal use of computing resources.', 'استخدام أمثل للـ computing resources.'],
    ['Integrity', 'Control over access and security.', 'تحكم في الـ access والـ security.'],
    ['Usability', 'Effort required to learn and operate the program.', 'المجهود المطلوب عشان تتعلم البرنامج وتشغّله.'],
    ['Maintainability', 'Effort required to locate and fix errors.', 'المجهود المطلوب عشان تلاقي الـ errors وتصلّحها.'],
    ['Flexibility', 'Effort required to change the program.', 'المجهود المطلوب عشان تغيّر البرنامج.'],
    ['Portability', 'Effort required to transfer the program to another system.', 'المجهود المطلوب عشان تنقل البرنامج لـ system تاني.'],
    ['Reusability', 'Which parts can be used in other applications.', 'أنهي أجزاء ممكن تتستخدم في applications تانية.']
  ];
  const ORDER = [4, 0, 6, 2, 5, 1, 7, 3];
  function EightFactors({ ar }) {
    const [mode, setMode] = useState('look'), [sel, setSel] = useState(null), [q, setQ] = useState(0), [got, setGot] = useState({}), [wrong, setWrong] = useState(null), [tries, setTries] = useState(0);
    const switchMode = m => { setMode(m); setSel(null); setQ(0); setGot({}); setWrong(null); setTries(0); };
    const target = ORDER[q];
    const answer = j => {
      if (mode === 'look') { setSel(j); return; }
      if (q >= 8) return; setTries(t => t + 1);
      if (j === target) { setGot(g => Object.assign({}, g, { [j]: 1 })); setWrong(null); setQ(q + 1); } else setWrong(j);
    };
    let en, a;
    if (mode === 'look') {
      if (sel == null) { en = 'Tap a factor to see what it means. The four marked ones all start with <b>"Effort required to…"</b>: they differ only in <i>what</i> the effort is for.'; a = 'دوس على أي factor عشان تشوف معناه. الأربعة اللي عليهم علامة كلهم بيبدأوا بنفس الجملة:<br><span class="ltr"><b>Effort required to…</b></span><br>والفرق بينهم بس في المجهود ده عشان إيه.'; }
      else { en = `<b>${sel + 1}. ${F8[sel][0]}</b>: ${F8[sel][1]}`; a = `الـ <b>${F8[sel][0]}</b> معناها: ${F8[sel][2]}`; }
    } else if (q < 8) {
      en = (wrong != null ? `No, that is <b>${F8[wrong][0]}</b> (${F8[wrong][1].replace(/\.$/, '')}). ` : '') + `Which factor is this? <b>"${F8[target][1]}"</b>`;
      a = (wrong != null ? `لأ، ده الـ <b>${F8[wrong][0]}</b>. ` : '') + `أنهي factor ده؟ <b>${F8[target][2]}</b>`;
    } else { en = `All 8 matched in ${tries} taps.`; a = `طابقت الـ 8 كلهم في <bdi dir="ltr">${tries}</bdi> ضغطة.`; }
    return html`<figure className="fig qv6"><div className="fig-stage">
      <div className="qv6-modes">
        <button className="fig-btn" aria-pressed=${mode === 'look'} onClick=${() => switchMode('look')}>Explore</button>
        <button className="fig-btn" aria-pressed=${mode === 'quiz'} onClick=${() => switchMode('quiz')}>Quiz me</button>
      </div>
      ${mode === 'quiz' && html`<div className="qv6-card">${q < 8 ? html`<span key=${q}><small>Meaning ${q + 1} of 8</small>${F8[target][1]}</span>` : html`<span>Done: 8 of 8</span>`}</div>`}
      <div className="qv6-grid8">${F8.map((f, j) => html`<button key=${j} onClick=${() => answer(j)}
        className=${[mode === 'look' && sel === j ? 'on' : '', mode === 'quiz' && got[j] ? 'ok' : '', mode === 'quiz' && wrong === j ? 'no' : '', mode === 'look' && j >= 3 && j <= 6 ? 'eff' : ''].join(' ')}>
        ${j + 1}. ${f[0]}${mode === 'look' && j >= 3 && j <= 6 ? html`<small>Effort required to…</small>` : null}</button>`)}</div>
      </div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [2] SQA vs SQC: prevention on the process, detection on the product ── */
  function SqaSqc({ ar }) {
    const steps = [
      { en: 'Software is built by a <b>process</b> (following standards and procedures) and comes out as a <b>product</b>.', ar: 'الـ software بيتبني عن طريق <b>process</b> (ماشية على standards و procedures) وبيطلع في الآخر <b>product</b>.' },
      { en: '<b>SQA (Assurance)</b> watches the <b>process</b>: <b>prevention</b>, proactive. Goal: ensure standards and procedures are applied correctly.', ar: 'الـ <b>SQA (Assurance)</b> بتراقب الـ <b>process</b>: يعني <b>prevention</b> وهي proactive. الهدف إن الـ standards والـ procedures تتطبق صح.' },
      { en: '<b>SQC (Control)</b> checks the <b>product</b>: <b>detection</b>, reactive. Goal: evaluate product quality and <b>screen out non-compliant items</b>.', ar: 'الـ <b>SQC (Control)</b> بتفحص الـ <b>product</b>: يعني <b>detection</b> وهي reactive. الهدف نقيّم الـ quality بتاعة الـ product و<b>نشيل الـ items اللي مش مطابقة</b>.' },
      { en: '<b>SQA vs SQC = prevention vs detection</b>: SQA works on <i>how</i> it is made, SQC on <i>what</i> was made. QA is not the same as QC.', ar: 'الفرق <b>prevention vs detection</b>: الـ SQA بتشتغل على الطريقة اللي بنعمل بيها، والـ SQC على اللي اتعمل فعلًا. يعني الـ QA مش هي الـ QC.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3800);
    const gate = i >= 2, still = calm();
    const dots = [0, 1, 2, 3, 4, 5].map(j => { const bad = j === 1 || j === 4; return { bad, cls: 'qv6-dot' + (gate ? (bad ? ' out' : ' go') : ''), d: j * 0.5 }; });
    const A = i === 1 || i === 3, C = i >= 2;
    return html`<figure className="fig qv6"><div className="fig-stage">
      <svg className="qv6-svg" viewBox="0 0 300 336" role="img" aria-label="SQA guards the process, SQC screens the product">
        <defs><marker id="qv6-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--graphite)" /></marker></defs>
        <rect x="14" y="10" width="172" height="70" rx="10" fill=${A ? 'color-mix(in srgb, var(--k-qa) 16%, var(--paper))' : 'var(--paper)'} stroke=${A ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${A ? 2.4 : 1.4} />
        <text x="100" y="38" textAnchor="middle" fontSize="18" fontWeight="700">Process</text>
        <text x="100" y="62" textAnchor="middle" fontSize="14.5">standards, procedures</text>
        <path d="M100 82 V116" stroke="var(--graphite)" strokeWidth="1.6" markerEnd="url(#qv6-ar)" />
        ${!still && dots.map((o, j) => html`<circle key=${'d' + j + (gate ? 'g' : '')} cx="100" cy="86" r="7" className=${o.cls} style=${{ animationDelay: o.d + 's', fill: gate && o.bad ? 'var(--pen)' : 'var(--k-qa)' }} />`)}
        <rect x="14" y="120" width="172" height="52" rx="10" fill=${C ? 'color-mix(in srgb, var(--k-qa) 16%, var(--paper))' : 'var(--paper)'} stroke=${C ? 'var(--k-qa)' : 'var(--graphite)'} strokeWidth=${C ? 2.4 : 1.4} />
        <text x="100" y="152" textAnchor="middle" fontSize="18" fontWeight="700">Product</text>
        <g className=${pop(gate)}>
          <path d="M100 174 V214" stroke="var(--graphite)" strokeWidth="1.6" />
          <path d="M14 222 H186" stroke="var(--pen)" strokeWidth="3" strokeDasharray="8 6" />
          <path d="M100 226 V270" stroke="var(--graphite)" strokeWidth="1.6" markerEnd="url(#qv6-ar)" />
          <rect x="14" y="274" width="172" height="48" rx="10" fill="color-mix(in srgb, var(--ok) 14%, var(--paper))" stroke="var(--ok)" strokeWidth="1.6" />
          <text x="100" y="303" textAnchor="middle" fontSize="15">compliant items</text>
          <text x="240" y="322" textAnchor="middle" fontSize="14" fill="var(--pen)">screened out</text>
        </g>
        <g className=${pop(i >= 1)}>
          <rect x="198" y="10" width="96" height="70" rx="10" fill="var(--s-qa)" />
          <text x="246" y="32" textAnchor="middle" fontSize="17" fontWeight="700" style=${{ fill: '#fff' }}>SQA</text>
          <text x="246" y="51" textAnchor="middle" fontSize="13.5" style=${{ fill: '#fff' }}>prevention</text>
          <text x="246" y="69" textAnchor="middle" fontSize="13.5" style=${{ fill: '#fff' }}>proactive</text>
          <path d="M198 45 H190" stroke="var(--s-qa)" strokeWidth="3" />
        </g>
        <g className=${pop(gate)}>
          <rect x="198" y="186" width="96" height="70" rx="10" fill="var(--s-qa)" />
          <text x="246" y="208" textAnchor="middle" fontSize="17" fontWeight="700" style=${{ fill: '#fff' }}>SQC</text>
          <text x="246" y="227" textAnchor="middle" fontSize="13.5" style=${{ fill: '#fff' }}>detection</text>
          <text x="246" y="245" textAnchor="middle" fontSize="13.5" style=${{ fill: '#fff' }}>reactive</text>
          <path d="M198 222 H190" stroke="var(--s-qa)" strokeWidth="3" />
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] software testing sits inside QA ── */
  function TestInQa({ ar }) {
    const steps = [
      { en: 'Software testing is <b>part of SQA</b>: QA is the broader box, testing sits inside it.', ar: 'الـ Software testing <b>جزء من الـ SQA</b>: الـ QA هي الصندوق الأكبر والـ testing جوّاه.' },
      { en: '<b>Testing</b>: detection-oriented; evaluates spec, design and coding under specified (normal and abnormal) conditions; main goal is to <b>find and report bugs</b>; done by testers.', ar: 'الـ <b>Testing</b> هدفه الاكتشاف (detection-oriented)، بيقيّم الـ spec والـ design والـ coding تحت conditions متحددة (normal و abnormal)، وهدفه الأساسي <b>يلاقي الـ bugs ويبلّغ عنها</b>، والـ testers هما اللي بيعملوه.' },
      { en: '<b>QA</b>: broader than testing; <b>prevents defects</b>; ensures correct processes, standards and methodologies; uses <b>ISO / CMM</b> models.', ar: 'الـ <b>QA</b> أوسع من الـ testing، و<b>بيمنع الـ defects</b>، وبيضمن إن الـ processes والـ standards والـ methodologies صح، وبيستخدم موديلات <b><bdi dir="ltr">ISO&nbsp;/&nbsp;CMM</bdi></b>.' },
      { en: 'In one line: testing <b>detects</b> bugs in the product, QA <b>prevents</b> them through the process.', ar: 'في سطر واحد: الـ testing <b>بيكتشف</b> الـ bugs في الـ product، والـ QA <b>بيمنعها</b> عن طريق الـ process.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3800);
    const T = ['Evaluates spec, design, coding', 'Normal and abnormal conditions', 'Find and report bugs', 'Done by testers'];
    const Q = ['Broader than testing', 'Correct processes, standards, methodologies', 'ISO / CMM models'];
    return html`<figure className="fig qv6"><div className="fig-stage">
      <div className=${'qv6-nest' + (i === 2 ? ' on' : '')}>
        <b>Software Quality Assurance (QA)</b>
        <div className=${'qv6-chips ' + pop(i >= 2)}><span className=${'k' + (i === 3 ? ' p' : '')}>Prevents defects</span>${Q.map(t => html`<span key=${t}>${t}</span>`)}</div>
        <div className=${'qv6-inner' + (i === 1 ? ' on' : '')}>
          <b>Software testing <span style=${{ fontWeight: 400, color: 'var(--graphite)' }}>(part of SQA)</span></b>
          <div className=${'qv6-chips ' + pop(i >= 1)}><span className=${'k' + (i === 3 ? ' p' : '')}>Detection-oriented</span>${T.map(t => html`<span key=${t}>${t}</span>`)}</div>
        </div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] who does it: testing or QA? ── */
  function WhoDoesIt({ ar }) {
    const t = (x, w, wa) => ({ t: x, bin: 't', why: w, whyAr: wa }), q = (x, w, wa) => ({ t: x, bin: 'q', why: w, whyAr: wa });
    const items = [
      t('Execute tests to find bugs', 'It is task (2) of <b>testing</b>.', 'دي مهمة (2) من مهام الـ <b>testing</b>.'),
      q('Develop standard processes', 'It is a <b>QA</b> task example.', 'ده مثال لمهام الـ <b>QA</b>.'),
      t('Track bugs through their life cycle', 'It is the <b>tester\'s</b> role.', 'ده دور الـ <b>tester</b>.'),
      q('Inspect the development process', 'It is a <b>QA</b> responsibility.', 'دي مسؤولية من مسؤوليات الـ <b>QA</b>.'),
      t('Choose the test implementation approach', 'It is task (1) of <b>testing</b> (the quiz\'s "NOT performed under SQA" answer).', 'دي مهمة (1) من مهام الـ <b>testing</b> (وهي إجابة سؤال الـ quiz بتاع "NOT performed under SQA").'),
      q('Create guidelines (requirements, design, coding)', 'It is a <b>QA</b> task example.', 'ده مثال لمهام الـ <b>QA</b>.'),
      t('Convince the development team to fix bugs', 'It is the <b>tester\'s</b> role.', 'ده دور الـ <b>tester</b>.'),
      q('Find improvements that prevent bugs', 'It is a <b>QA</b> responsibility: prevention.', 'دي مسؤولية الـ <b>QA</b>: الـ prevention.'),
      t('Prepare verification and validation reports', 'It is task (3) of <b>testing</b>.', 'دي مهمة (3) من مهام الـ <b>testing</b>.'),
      q('Use checklists for each stage', 'It is a <b>QA</b> task example.', 'ده مثال لمهام الـ <b>QA</b>.'),
      t('Take responsibility for bugs found', 'It is the <b>tester\'s</b> role.', 'ده دور الـ <b>tester</b>.'),
      q('Monitor and evaluate processes and testing activities', 'It is a <b>QA</b> responsibility: its scope is larger than the testing team.', 'دي مسؤولية الـ <b>QA</b>: الـ scope بتاعه أكبر من الـ testing team.'),
      t('Attend project and design review meetings', 'It is task (4) of <b>testing</b>.', 'دي مهمة (4) من مهام الـ <b>testing</b>.'),
      q('Define quality metrics and criteria', 'It is a <b>QA</b> task example.', 'ده مثال لمهام الـ <b>QA</b>.')
    ];
    const bins = [{ k: 't', en: 'Testing / tester', sub: 'tasks and role' }, { k: 'q', en: 'QA', sub: 'responsibilities and tasks' }];
    return html`<${Sorter} ar=${ar} items=${items} bins=${bins}
      intro=${{ en: 'Each card is a task, role or responsibility from the slides. <b>Does it belong to testing (the tester) or to QA?</b>', ar: 'كل كارت مهمة أو دور أو مسؤولية من الـ slides. <b>ده تبع الـ testing (الـ tester) ولا تبع الـ QA؟</b>' }}
      done=${{ en: 'Testing finds, reports and tracks bugs. QA shapes the process: standards, guidelines, checklists, metrics.', ar: 'الـ testing بيلاقي الـ bugs ويبلّغ عنها ويتابعها. والـ QA بيظبط الـ process نفسها: standards و guidelines و checklists و metrics.' }} />`;
  }

  /* ── [4] ITSM and its two categories ── */
  function Itsm({ ar }) {
    const steps = [
      { en: 'Quality management in IT is often called <b>ITSM</b> (IT Service Management).', ar: 'الـ Quality management في الـ IT غالبًا اسمه <b>ITSM</b> (IT Service Management).' },
      { en: 'Goal: deliver IT services at an <b>agreed-upon level of quality</b>.', ar: 'الهدف إننا نقدم IT services بـ <b>مستوى quality متفق عليه</b>.' },
      { en: '<b>IT Service Support</b>: processes for the <b>efficient delivery</b> of IT operational services.', ar: 'الـ <b>IT Service Support</b> هي الـ processes الخاصة بـ <b>التقديم الكفء</b> للـ IT operational services.' },
      { en: '<b>IT Service Delivery</b>: processes for the <b>long-term planning, control and management</b> of IT services. (Careful: the "delivery" category is the long-term one.)', ar: 'الـ <b>IT Service Delivery</b> هي الـ processes الخاصة بـ <b>الـ planning والـ control والـ management على المدى الطويل</b>. (خلي بالك: الـ category اللي اسمها delivery هي بتاعة المدى الطويل.)' }
    ];
    const [i, ctl] = useSteps(steps.length, 3400);
    return html`<figure className="fig qv6"><div className="fig-stage"><div className="qv6-tree">
      <div className="qv6-node root"><b>ITSM</b>IT Service Management</div>
      <div className=${'qv6-goal ' + pop(i >= 1)}>goal: an agreed-upon level of quality</div>
      <div className=${'qv6-two ' + pop(i >= 2)}>
        <div className=${'qv6-node' + (i === 2 ? ' on' : '')}><b>IT Service Support</b>efficient delivery of IT operational services</div>
        <div className=${'qv6-node' + (i === 3 ? ' on' : '') + (i >= 3 ? '' : ' off')}><b>IT Service Delivery</b>long-term planning, control and management of IT services</div>
      </div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] SQA is not just testing ── */
  function NotJustTesting({ ar }) {
    const steps = [
      { en: 'Software quality assurance is <b>not just testing</b>.', ar: 'الـ Software quality assurance <b>مش testing وبس</b>.' },
      { en: 'It includes <b>establishing standards and software development methodologies</b>.', ar: 'بيشمل إننا <b>نحط standards و software development methodologies</b>.' },
      { en: 'It includes <b>monitoring and evaluating the development process</b>.', ar: 'وبيشمل إننا <b>نراقب ونقيّم الـ development process</b>.' },
      { en: 'It includes <b>correcting errors during development and preventing their recurrence</b>.', ar: 'وبيشمل إننا <b>نصلّح الـ errors أثناء الـ development ونمنع إنها تتكرر</b>.' },
      { en: '<b>Software quality metrics</b> assess the extent to which quality requirements are met.', ar: 'والـ <b>Software quality metrics</b> بتقيس إحنا حققنا الـ quality requirements لحد فين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const P = ['Testing', 'Standards and development methodologies', 'Monitor and evaluate the development process', 'Correct errors and prevent recurrence'];
    return html`<figure className="fig qv6"><div className="fig-stage"><div className="qv6-umb">
      <div className="qv6-roof">Software Quality Assurance<small>in an organization</small></div>
      <div className="qv6-pill">${P.map((t, j) => html`<div key=${j} className=${j === 0 ? (i === 0 ? 'on' : '') : (i === j ? 'on' : i > j ? '' : 'off')}>${t}</div>`)}</div>
      <div className=${'qv6-meter ' + pop(i >= 4)}><b>Software quality metrics</b>: to what extent are the quality requirements met?<div className="tr"><i></i></div></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] where a bug report goes in each test organization ── */
  const PATHS = [
    { name: '1. Small team', nodes: [['Testers', '', true], ['Development Manager', 'also manages the Programmers', false, true]],
      hops: [{ en: '<b>Small team</b>: the testers find a bug and write a bug report.', ar: 'في الـ <b>Small team</b>: الـ testers لقوا bug وكتبوا bug report.' },
        { en: 'The report goes straight to the <b>Development Manager</b>, who also runs the programmers: <b>fast communication</b> between developers and testers.', ar: 'الـ report بيروح على طول للـ <b>Development Manager</b> اللي هو كمان مدير الـ programmers، فالتواصل بين الـ developers والـ testers <b>سريع</b>.' },
        { en: 'He decides. If he is not experienced, he <b>may ignore the bug report</b> to push the team to deliver.', ar: 'هو اللي بيقرر. ولو مش experienced ممكن <b>يطنّش الـ bug report</b> عشان يخلي الـ team يسلّم.' }],
      pro: 'Fast communication between developers and testers.', con: 'An inexperienced development manager may ignore bug reports to push delivery.' },
    { name: '2. Independent team', nodes: [['Testers', '', true], ['Test Manager / Test Lead', '', true], ['Project Manager', 'also hears the Development Manager', false, true]],
      hops: [{ en: '<b>Independent test team</b>: the testers find a bug and write a bug report.', ar: 'في الـ <b>Independent test team</b>: الـ testers لقوا bug وكتبوا bug report.' },
        { en: 'It goes to their own <b>Test Manager / Test Lead</b>, not to the development manager.', ar: 'الـ report بيروح للـ <b><bdi dir="ltr">Test Manager / Test Lead</bdi></b> بتاعهم، مش للـ development manager.' },
        { en: 'The test manager takes it to the <b>Project Manager</b>: the testing team\'s <b>feedback is considered</b> in decision-making.', ar: 'الـ test manager بيوصّله للـ <b>Project Manager</b>، فالـ feedback بتاع الـ testing team <b>بيتاخد في الاعتبار</b> في القرارات.' },
        { en: 'But the <b>final decision lies with the project manager</b>, which may affect quality in critical projects.', ar: 'بس <b>القرار الأخير في إيد الـ project manager</b>، وده ممكن يأثر على الـ quality في المشاريع الـ critical.' }],
      pro: 'The testing team\'s feedback is considered in decision-making.', con: 'The final decision lies with the project manager; may affect quality in critical projects.' },
    { name: '3. Reports to executive', nodes: [['QA / Test Managers', 'beside the Development and Project Managers', true], ['Executive Manager', 'senior management', false, true]],
      hops: [{ en: '<b>Test group reporting to executive management</b>: the QA/Test Managers sit beside the development and project managers, not under them (<b>independence of the quality team</b>).', ar: 'في الـ <b>Test group reporting to executive management</b>: الـ <bdi dir="ltr">QA/Test Managers</bdi> جنب الـ development والـ project managers مش تحتهم، يعني <b>الـ quality team مستقل</b>.' },
        { en: 'Their <b>quality reports reach senior management directly</b>: the Executive Manager.', ar: 'والـ <b>quality reports بتاعتهم بتوصل للـ senior management على طول</b>، يعني للـ Executive Manager.' }],
      pro: 'Independence of the quality team; quality reports reach senior management directly.', con: null }
  ];
  function BugPathRun({ ar, p }) {
    const P = PATHS[p], last = P.nodes.length;
    const steps = P.hops;
    const [i, ctl] = useSteps(steps.length, 3000);
    const at = Math.min(i, last - 1), end = i === steps.length - 1;
    const rows = P.nodes.map((n, j) => ({ n, j })).reverse();
    return html`<div>
      <div className="fig-stage"><div className="qv6-chain">
        ${rows.map(({ n, j }) => html`<div key=${j}>
          <div className="qv6-hop">
            <div className=${'qv6-box' + (n[2] ? ' test' : '') + (j === at ? ' on' : '') + (n[3] && end ? ' dec' : '')}>${n[0]}${j === at ? html`<br /><span className="qv6-tok" key=${'t' + i}>bug report</span>` : null}</div>
            ${n[1] ? html`<div className="qv6-side">${n[1]}</div>` : null}
          </div>
          ${j > 0 ? html`<div className="qv6-up" aria-hidden="true">↑</div>` : null}
        </div>`)}
      </div>
      ${end && html`<div className="qv6-out"><div className="pro"><b>Pros</b>: ${P.pro}</div>${P.con && html`<div className="con"><b>Cons</b>: ${P.con}</div>`}</div>`}
      </div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function BugPath({ ar }) {
    const [p, setP] = useState(0);
    return html`<figure className="fig qv6"><div className="fig-stage" style=${{ paddingBottom: 0 }}><div className="qv6-modes" style=${{ marginBottom: 0 }}>
      ${PATHS.map((x, j) => html`<button key=${j} className="fig-btn" aria-pressed=${p === j} onClick=${() => setP(j)}>${x.name}</button>`)}</div></div>
      <${BugPathRun} key=${p} ar=${ar} p=${p} /></figure>`;
  }

  /* ── [6] metrics (product / process) vs indicators: sort the slide's examples ── */
  function MetricTree({ ar }) {
    const items = [
      { t: 'Code size', bin: 'pd', why: '<b>Code size</b> is a product metric: it measures the final product.', whyAr: 'الـ <b>Code size</b> هي product metric: بتقيس الـ final product.' },
      { t: 'Number of detected bugs', bin: 'in', why: '<b>Number of detected bugs</b> is an indicator: a variable reflecting the process outcome.', whyAr: 'الـ <b>Number of detected bugs</b> ده indicator: يعني variable بيعكس نتيجة الـ process.' },
      { t: 'Time taken', bin: 'pc', why: '<b>Time taken</b> is a process metric: it measures the development process.', whyAr: 'الـ <b>Time taken</b> هي process metric: بتقيس الـ development process.' },
      { t: 'Number of documented pages', bin: 'pd', why: '<b>Number of documented pages</b> is a product metric.', whyAr: 'الـ <b>Number of documented pages</b> هي product metric.' },
      { t: 'Development methodology', bin: 'pc', why: '<b>Development methodology</b> is a process metric.', whyAr: 'الـ <b>Development methodology</b> هي process metric.' }
    ];
    const bins = [{ k: 'pd', en: 'Product metrics', sub: 'the final product' }, { k: 'pc', en: 'Process metrics', sub: 'the development process' }, { k: 'in', en: 'Indicators', sub: 'process outcomes' }];
    const groups = [{ span: 2, en: '<b>Metrics</b>: rules for measuring software attributes' }, { span: 1, en: '<b>Indicators</b>: variables' }];
    return html`<${Sorter} ar=${ar} items=${items} bins=${bins} groups=${groups}
      intro=${{ en: 'Metrics are <b>rules</b> for measuring software attributes (code size, complexity); indicators are <b>variables</b> reflecting process outcomes. <b>Sort the slide\'s examples.</b>', ar: 'الـ metrics هي <b>rules</b> لقياس الـ software attributes (زي حجم الـ code والـ complexity)، والـ indicators هي <b>variables</b> بتعكس نتايج الـ process. <b>رتّب أمثلة الـ slide.</b>' }}
      done=${{ en: 'Product metrics: code size, documented pages. Process metrics: time taken, methodology. Indicator: number of detected bugs.', ar: 'الـ product metrics فيها حجم الـ code وعدد الصفحات الموثقة، والـ process metrics فيها الوقت والـ methodology، والـ indicator هو عدد الـ bugs اللي اتكشفت.' }} />`;
  }

  /* ── [6] pick the 9 common metrics out of the metrics + indicators ── */
  const METRICS = ['Code coverage', 'Bugs per line of code', 'Cyclomatic complexity', 'Function point analysis', 'Number of classes and interfaces', 'Cohesion', 'Coupling', 'Order of growth', 'Source lines of code'];
  const INDIC = [['Progress', 'work done by the developer in each phase'], ['Stability', 'whether each phase\'s products are stable enough to proceed'], ['Process compliance', 'obedience to the procedures approved at project start'], ['Quality evaluation effort', 'effort spent on internal quality evaluation'], ['Defect detection efficiency', 'how many defects were detected in a phase'], ['Defect removal rate', 'defects detected AND resolved over a period'], ['Defect age profile', 'defects NOT resolved over a period'], ['Defect density', 'identifies defect-prone parts of the system'], ['Complexity', 'complexity of the code in a program']];
  const CHIPS = (() => { const out = [], mi = [0, 2, 4, 6, 8, 1, 3, 5, 7], ii = [8, 0, 4, 2, 6, 1, 7, 3, 5]; for (let j = 0; j < 9; j++) { out.push({ t: METRICS[mi[j]], m: true }); out.push({ t: INDIC[ii[j]][0], m: false, d: INDIC[ii[j]][1] }); } return out; })();
  function PickMetrics({ ar }) {
    const [st, setSt] = useState({}), [msg, setMsg] = useState(null), [show, setShow] = useState(false);
    const found = CHIPS.filter((c, j) => c.m && st[j]).length;
    const tap = j => { const c = CHIPS[j]; if (st[j]) return; setSt(s => Object.assign({}, s, { [j]: c.m ? 'ok' : 'no' }));
      setMsg(c.m ? { en: `Yes: <b>${c.t}</b> is one of the 9 common metrics.`, ar: `أيوه: الـ <b>${c.t}</b> واحدة من الـ 9 metrics المشهورين.` }
        : { en: `No: <b>${c.t}</b> is a quality <b>indicator</b> (${c.d}).` + (c.t === 'Complexity' ? ' Watch out: the metric is <b>cyclomatic</b> complexity.' : ''), ar: `لأ: الـ <b>${c.t}</b> ده <b>indicator</b> مش metric.` + (c.t === 'Complexity' ? ' خلي بالك: الـ metric اسمها <b>cyclomatic</b> complexity.' : '') }); };
    const reset = () => { setSt({}); setMsg(null); setShow(false); };
    const m = found === 9 ? { en: 'All <b>9 metrics</b> found. The rest are the 9 software quality indicators of the next section.', ar: 'لقيت الـ <b>9 metrics</b> كلهم. والباقيين هما الـ 9 software quality indicators بتوع الـ section اللي جاي.' } : msg || { en: 'The slides list <b>9 common metrics</b> and <b>9 quality indicators</b>. They are mixed here: <b>tap only the 9 metrics</b>.', ar: 'الـ slides فيها <b>9 metrics مشهورين</b> و<b>9 quality indicators</b>. هنا متلخبطين مع بعض: <b>دوس على الـ 9 metrics بس</b>.' };
    return html`<figure className="fig qv6"><div className="fig-stage">
      <div className="qv6-pool">${CHIPS.map((c, j) => html`<button key=${j} className=${st[j] || (show && c.m ? 'shown' : '')} onClick=${() => tap(j)}>${c.t}</button>`)}</div>
      <p className="qv6-score">Metrics found: <b>${found}</b> / 9</p></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>
        <button className="fig-btn" onClick=${() => setShow(true)} disabled=${show}>Show the 9</button>
        <button className="fig-btn" onClick=${reset}>↻ Start over</button></div></figure>`;
  }

  /* ── [7] the 9 software quality indicators, placed on the project ── */
  function IndicatorMap({ ar }) {
    const steps = [
      { en: 'The slide lists <b>9 software quality indicators</b>. Each one looks at a different part of the project.', ar: 'الـ slide فيها <b>9 software quality indicators</b>. كل واحد بيبص على جزء مختلف من المشروع.' },
      { en: '<b>Per phase</b>: <b>Progress</b> measures the work done by the developer in each phase; <b>Defect detection efficiency</b> measures how many defects were detected in a phase.', ar: '<b>في كل phase</b>: الـ <b>Progress</b> بيقيس الشغل اللي الـ developer عمله في كل phase، والـ <b>Defect detection efficiency</b> بيقيس كام defect اتكشف في الـ phase.' },
      { en: '<b>Between phases</b>: <b>Stability</b> evaluates whether the products of each phase are stable enough to proceed to the next phase.', ar: '<b>بين الـ phases</b>: الـ <b>Stability</b> بيقيّم هل الـ products بتاعة كل phase مستقرة كفاية إننا نكمّل للـ phase اللي بعدها.' },
      { en: '<b>The developer\'s way of working</b>: <b>Process compliance</b> (obedience to the procedures approved at the start of the project) and <b>Quality evaluation effort</b> (effort spent on internal quality evaluation).', ar: '<b>طريقة شغل الـ developer</b>: الـ <b>Process compliance</b> (الالتزام بالـ procedures اللي اتوافق عليها في أول المشروع) والـ <b>Quality evaluation effort</b> (المجهود اللي بيتصرف على الـ internal quality evaluation).' },
      { en: '<b>Over a period of time</b>: <b>Defect removal rate</b> counts defects detected <b>and resolved</b>; <b>Defect age profile</b> counts defects <b>not resolved</b>.', ar: '<b>على مدة زمنية</b>: الـ <b>Defect removal rate</b> بيعد الـ defects اللي اتكشفت <b>واتحلت</b>، والـ <b>Defect age profile</b> بيعد الـ defects اللي <b>لسه ماتحلتش</b>.' },
      { en: '<b>In the code and the system</b>: <b>Defect density</b> identifies the defect-prone parts of the system; <b>Complexity</b> measures the complexity of the code in a program.', ar: '<b>في الـ code والـ system</b>: الـ <b>Defect density</b> بيحدد الأجزاء اللي فيها defects كتير، والـ <b>Complexity</b> بيقيس الـ complexity بتاعة الـ code في البرنامج.' }
    ];
    const [i, ctl] = useSteps(steps.length, 4200);
    const z = k => 'qv6-zone' + (i === k ? ' on' : i > 0 && i < k ? ' dim' : '');
    const zp = 'qv6-zone' + (i === 1 || i === 2 ? ' on' : '');
    return html`<figure className="fig qv6"><div className="fig-stage"><div className="qv6-map">
      <div className=${zp}><b>The phases</b>
        <div className="qv6-phases"><div className="qv6-ph">Phase</div><div className="qv6-gate" style=${{ opacity: i >= 2 ? 1 : .3 }}>▸</div><div className="qv6-ph">Phase</div><div className="qv6-gate" style=${{ opacity: i >= 2 ? 1 : .3 }}>▸</div><div className="qv6-ph">Phase</div></div>
        <div className=${'qv6-tags ' + pop(i >= 1)}><span>Progress</span><span>Defect detection efficiency</span></div>
        <div className=${'qv6-tags ' + pop(i >= 2)}><span className="o">▸ Stability (ready for the next phase?)</span></div></div>
      <div className=${z(3)}><b>The developer's process</b><div className=${'qv6-tags ' + pop(i >= 3)}><span>Process compliance</span><span>Quality evaluation effort</span></div></div>
      <div className=${z(4)}><b>Over a period of time</b><div className=${'qv6-tags ' + pop(i >= 4)}><span>Defect removal rate: resolved</span><span className="o">Defect age profile: not resolved</span></div></div>
      <div className=${z(5)}><b>The code and the system</b><div className=${'qv6-tags ' + pop(i >= 5)}><span>Defect density</span><span>Complexity</span></div></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [7] try your own defect log: the defect indicators computed from it ── */
  const PARTS = ['Part A', 'Part B', 'Part C'];
  function DefectBoard({ ar }) {
    const [log, setLog] = useState([]), [ph, setPh] = useState(1);
    const add = p => { setLog(l => l.concat({ id: l.length + 1, p, ph, fixed: false })); };
    const flip = id => { setLog(l => l.map(d => d.id === id ? Object.assign({}, d, { fixed: !d.fixed }) : d)); };
    const resolved = log.filter(d => d.fixed).length, open = log.length - resolved;
    const per = PARTS.map((_, j) => log.filter(d => d.p === j).length), top = Math.max(0, ...per);
    const hot = top > 0 && per.filter(x => x === top).length === 1 ? per.indexOf(top) : -1;
    const inPh = log.filter(d => d.ph === ph).length;
    let en, a;
    if (!log.length) { en = '<b>Try your own:</b> pick a phase, then tap <b>+ bug</b> under a part of the system to log a detected defect. Tap a logged bug to mark it resolved.'; a = '<b>جرّب بنفسك:</b> اختار phase، وبعدين دوس على زرار الـ <b>bug</b> اللي عليه علامة زائد تحت جزء من الـ system عشان تسجّل defect اتكشف. ودوس على أي bug عشان تعلّمه إنه اتحل.'; }
    else { en = `Defect removal rate counts the <b>${resolved}</b> detected and resolved; defect age profile counts the <b>${open}</b> not resolved. Defect detection efficiency for phase ${ph}: <b>${inPh}</b> detected.` + (hot >= 0 ? ` Defect density points at <b>${PARTS[hot]}</b> as the defect-prone part.` : '');
      a = `الـ Defect removal rate بيعد الـ defects اللي اتكشفت واتحلت وعددهم <bdi dir="ltr">${resolved}</bdi>، والـ Defect age profile بيعد اللي ماتحلتش وعددهم <bdi dir="ltr">${open}</bdi>. والـ Defect detection efficiency في الـ phase رقم <bdi dir="ltr">${ph}</bdi> عدده <bdi dir="ltr">${inPh}</bdi>.` + (hot >= 0 ? ` والـ Defect density بيشاور على <bdi dir="ltr">${PARTS[hot]}</bdi> إنه الجزء اللي فيه defects كتير.` : ''); }
    return html`<figure className="fig qv6"><div className="fig-stage"><div className="qv6-board">
      <div className="qv6-row">Detected in: ${[1, 2, 3].map(n => html`<button key=${n} className="fig-btn" aria-pressed=${ph === n} onClick=${() => setPh(n)}>Phase ${n}</button>`)}</div>
      <div className="qv6-parts">${PARTS.map((t, j) => html`<div key=${j} className=${'qv6-part' + (hot === j ? ' hot' : '')}><b>${t}</b>
        <div className="qv6-bugs">${log.filter(d => d.p === j).map(d => html`<button key=${d.id} className=${'qv6-bug' + (d.fixed ? ' fixed' : '')} onClick=${() => flip(d.id)} aria-label=${'bug ' + d.id + (d.fixed ? ' resolved' : ' open')}>${d.fixed ? '✓' : '✕'}P${d.ph}</button>`)}</div>
        <div style=${{ textAlign: 'center', marginTop: '5px' }}><button className="fig-btn" style=${{ padding: '2px 8px' }} onClick=${() => add(j)}>+ bug</button></div></div>`)}</div>
      <div className="qv6-ind">
        <div>Defect removal rate<b>${resolved}</b>detected and resolved</div>
        <div>Defect age profile<b>${open}</b>not resolved</div>
        <div>Detection efficiency<b>${inPh}</b>detected in phase ${ph}</div>
        <div>Defect density<b>${hot >= 0 ? PARTS[hot] : '–'}</b>most defect-prone part</div>
      </div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setLog([]); }} disabled=${!log.length}>↻ Clear</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'qa-measurable': Measurable, 'qa-eight-factors': EightFactors, 'qa-sqa-sqc': SqaSqc, 'qa-test-in-qa': TestInQa, 'qa-who-does-it': WhoDoesIt,
    'qa-itsm': Itsm, 'qa-not-just-testing': NotJustTesting, 'qa-bug-path': BugPath, 'qa-metric-tree': MetricTree, 'qa-pick-metrics': PickMetrics,
    'qa-indicator-map': IndicatorMap, 'qa-defect-board': DefectBoard
  });
})();
/* ── part L7 ── */
// Software Quality Assurance visuals, Lecture 7 (Maturity Model and Quality Standards): the why of maturity models, CMM origin and uses, no-skipping climb,
// the 6 CMM components, Table 1 as a self-assessment, the 5 KPA aspects, CMM benefits, ISO 9000 overview, the 20 elements and 8 principles (tour and quiz),
// software engineering standards over time and SPICE (slides 2 to 15). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.qv7 .fig-dots i.on{ background:var(--k-qa); } .qv7 .fig-btn:hover{ border-color:var(--k-qa); } .qv7 .fig-btn.solid{ background:var(--s-qa); color:#fff; }
.qv7-many .fig-dots{ flex-wrap:wrap; row-gap:5px; min-width:0; flex:1 1 120px; }
.qv7 .fig-stage{ padding-left:8px; padding-right:8px; }
.qv7-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.qv7-modes .fig-btn[aria-pressed="true"]{ background:var(--s-qa); color:#fff; border-color:transparent; }
.qv7-col{ display:flex; flex-direction:column; gap:6px; max-width:460px; margin:0 auto; }
.qv7-box{ border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:9px; padding:7px 10px; font-size:.86rem; line-height:1.35; transition:background .5s ease, border-color .5s ease, opacity .5s ease, color .5s ease, box-shadow .5s ease; overflow-wrap:anywhere; min-width:0; }
.qv7-box b.t{ display:block; font-size:.9rem; }
.qv7-box small{ display:block; font-size:.8rem; line-height:1.35; color:var(--graphite); margin-top:2px; }
.qv7-box.done{ background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); border-color:var(--k-qa); }
.qv7-box.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .qv7-box.on small{ color:rgba(255,255,255,.92); }
.qv7-box.wait{ opacity:.3; }
.qv7-box.bad{ border:1.6px dashed var(--pen); color:var(--pen); font-weight:600; }
.qv7-box.c{ text-align:center; }
.qv7-arr{ text-align:center; color:var(--graphite); font-size:.8rem; line-height:1.25; transition:opacity .5s ease; }
.qv7-arr i{ font-style:normal; font-size:1rem; color:var(--k-qa); display:block; line-height:1; }
.qv7-arr.wait{ opacity:.25; }
.qv7-row{ display:grid; grid-template-columns:repeat(var(--qv7n, 3), minmax(0, 1fr)); gap:6px; }
.qv7-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; }
.qv7-chip{ border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:3px 9px; font-size:.8rem; line-height:1.3; transition:all .45s ease; }
.qv7-chip.k{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); }
.qv7-chip.bad{ border-color:var(--pen); border-style:dashed; color:var(--pen); }
.qv7-chip.wait{ opacity:.3; }
.qv7-in{ animation:qv7in .5s ease both; }
@keyframes qv7in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.qv7-shake{ animation:qv7shake .45s ease; }
@keyframes qv7shake{ 20%{ transform:translateX(-6px); } 40%{ transform:translateX(6px); } 60%{ transform:translateX(-4px); } 80%{ transform:translateX(3px); } }
/* staircase */
.qv7-stairs{ display:flex; flex-direction:column; gap:5px; max-width:420px; margin:0 auto; }
.qv7-st{ font:inherit; text-align:left; cursor:pointer; border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:8px; padding:6px 9px; font-size:.84rem; line-height:1.3; min-height:40px; transition:background .45s ease, border-color .45s ease, opacity .45s ease, color .45s ease; }
.qv7-st small{ display:block; font-size:.78rem; color:var(--graphite); }
.qv7-st.done{ background:color-mix(in srgb, var(--k-qa) 14%, var(--paper)); border-color:var(--k-qa); }
.qv7-st.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .qv7-st.on small{ color:rgba(255,255,255,.92); }
.qv7-st.up{ opacity:.6; } .qv7-st.no{ border-color:var(--pen); border-style:dashed; opacity:1; }
.qv7-here{ float:right; font-size:.78rem; font-weight:700; border-radius:99px; padding:0 7px; background:var(--paper); color:var(--s-qa); margin-left:6px; }
/* Table 1 checklist */
.qv7-res{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:3px; max-width:420px; margin:0 auto 4px; }
.qv7-res span{ height:10px; border-radius:3px; background:var(--paper); border:1px solid var(--line); transition:background .45s ease; }
.qv7-res span.on{ background:var(--s-qa); border-color:var(--s-qa); }
.qv7-lvtxt{ text-align:center; font-weight:700; font-size:.92rem; color:var(--ink); margin-bottom:8px; }
.qv7-lv{ border:1.4px solid var(--line); border-radius:9px; background:var(--paper); padding:6px 8px; transition:border-color .45s ease, background .45s ease; }
.qv7-lv.ok{ border-color:var(--k-qa); background:color-mix(in srgb, var(--k-qa) 10%, var(--paper)); }
.qv7-lv.blk{ border-color:var(--pen); border-style:dashed; }
.qv7-lv h5{ margin:0 0 5px; font-size:.84rem; line-height:1.3; color:var(--ink); display:flex; gap:6px; flex-wrap:wrap; align-items:baseline; }
.qv7-tag{ font-size:.76rem; font-weight:700; border-radius:99px; padding:0 7px; border:1px solid var(--line); color:var(--graphite); }
.qv7-tag.ok{ border-color:var(--ok); color:var(--ok); } .qv7-tag.blk{ border-color:var(--pen); color:var(--pen); }
.qv7-tog{ font:inherit; font-size:.8rem; line-height:1.3; text-align:left; cursor:pointer; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:7px; padding:4px 8px; min-height:30px; transition:all .3s ease; }
.qv7-tog[aria-pressed="true"]{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; }
.qv7-tog[aria-pressed="true"]::before{ content:"✓ "; }
.qv7-togs{ display:flex; flex-wrap:wrap; gap:4px; }
/* tiles (20 elements, 8 principles) */
.qv7-tiles{ display:grid; grid-template-columns:repeat(var(--qv7c, 4), minmax(0,1fr)); gap:5px; max-width:560px; margin:0 auto; }
@media (max-width:520px){ .qv7-tiles{ grid-template-columns:repeat(2, minmax(0,1fr)); } }
.qv7-tile{ font:inherit; font-size:.8rem; line-height:1.25; text-align:left; cursor:pointer; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:7px; padding:5px 6px; display:flex; gap:5px; align-items:flex-start; min-width:0; overflow-wrap:anywhere; transition:background .4s ease, border-color .4s ease, color .4s ease; }
.qv7-tile .n{ flex:none; min-width:20px; height:20px; border-radius:99px; display:grid; place-items:center; font-size:.78rem; font-weight:700; background:color-mix(in srgb, var(--k-qa) 20%, var(--paper)); color:var(--ink); }
.qv7-tile.done{ border-color:var(--k-qa); }
.qv7-tile.on{ background:var(--s-qa); border-color:var(--s-qa); color:#fff; } .qv7-tile.on .n{ background:rgba(255,255,255,.25); color:#fff; }
.qv7-tile.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.qv7-tile.no{ border-color:var(--pen); border-style:dashed; }
.qv7-score{ font-size:.84rem; color:var(--graphite); }
.qv7-q{ max-width:560px; margin:0 auto 8px; border:1.4px solid var(--k-qa); border-radius:9px; background:var(--paper); padding:7px 10px; font-size:.86rem; line-height:1.4; color:var(--ink); }
.qv7-q b{ display:block; font-size:.8rem; color:var(--graphite); }
/* SPICE letters */
.qv7-ac{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:4px 8px; align-items:center; max-width:360px; margin:0 auto; }
.qv7-ac .L{ width:34px; height:34px; border-radius:8px; display:grid; place-items:center; font-weight:800; font-size:1.1rem; background:var(--s-qa); color:#fff; }
.qv7-ac .w{ font-size:.92rem; font-weight:600; color:var(--ink); transition:opacity .5s ease, transform .5s ease; }
.qv7-ac .w.off{ opacity:0; transform:translateX(-8px); }
.qv7-ac .w u{ text-decoration:none; color:var(--k-qa); font-weight:800; }
.qv7-ac .for{ grid-column:2; font-size:.8rem; color:var(--graphite); font-style:italic; }
/* timeline */
.qv7-tl{ position:relative; max-width:440px; margin:0 auto; padding-left:64px; display:flex; flex-direction:column; gap:7px; }
.qv7-tl::before{ content:""; position:absolute; left:51px; top:4px; bottom:4px; width:2px; background:var(--line); }
.qv7-yr{ position:absolute; left:-64px; width:38px; text-align:right; font-weight:800; font-size:.86rem; color:var(--k-qa); top:7px; }
.qv7-tl .qv7-box{ position:relative; }
.qv7-tl .qv7-box::before{ content:""; position:absolute; left:-19px; top:11px; width:10px; height:10px; border-radius:50%; background:var(--paper); border:2px solid var(--line); }
.qv7-tl .qv7-box.on::before, .qv7-tl .qv7-box.done::before{ background:var(--k-qa); border-color:var(--k-qa); }
.qv7-shift{ display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr); gap:6px; align-items:center; }
.qv7-shift .mv{ font-size:1.2rem; color:var(--k-qa); }
.qv7-shift .mv.go{ animation:qv7go 1.4s ease-in-out infinite; }
@keyframes qv7go{ 0%,100%{ transform:translateX(-3px); } 50%{ transform:translateX(4px); } }
.qv7-sq{ display:grid; grid-template-columns:repeat(10, minmax(0,1fr)); gap:3px; margin-top:5px; }
.qv7-sq span{ aspect-ratio:1; border-radius:3px; border:1px solid var(--line); background:var(--paper); display:grid; place-items:center; font-size:.72rem; color:#fff; transition:background .4s ease; }
.qv7-sq span.doc{ background:var(--s-qa); border-color:var(--s-qa); }
.qv7-check{ text-align:center; font-size:.84rem; margin-top:8px; color:var(--ink); }
.qv7-check .qv7-chips{ margin-top:5px; }
.qv7-chipbtn{ font:inherit; cursor:pointer; }
.qv7-chipbtn.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.qv7-chipbtn.no{ border-color:var(--pen); border-style:dashed; }
.qv7-fb{ min-height:1.4em; font-size:.82rem; margin-top:5px; color:var(--graphite); }
@media (prefers-reduced-motion: reduce){ .qv7-in, .qv7-shake, .qv7-shift .mv.go{ animation:none; } .qv7-ac .w{ transition:none; } }`;
  if (!document.getElementById('qv7-css')) { const s = document.createElement('style'); s.id = 'qv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const st = (i, k) => i === k ? ' on' : i > k ? ' done' : ' wait';
  const Arr = ({ show, t }) => html`<div className=${'qv7-arr' + (show ? '' : ' wait')}><i>↓</i>${t}</div>`;
  const Modes = ({ list, mode, setMode }) => html`<div className="qv7-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => setMode(k)}>${t}</button>`)}</div>`;

  /* ── slide 2: why maturity models (introduction) ── */
  const INTRO = [
    { en: 'Organizations seek <b>sustainable excellence</b> in their IT operations, and need a <b>flexible framework</b> to meet evolving business needs.', ar: 'الـ organizations عايزة <b>تميّز مستدام</b> في شغل الـ IT، ومحتاجة <b>framework مرن</b> يواكب احتياجات الـ business اللي بتتغير.' },
    { en: 'But challenges like <b>poor IT application design</b>, <b>high costs</b> and <b>delayed projects</b> obstruct progress.', ar: 'بس فيه challenges زي الـ <b>design الوحش للـ IT applications</b> و<b>التكاليف العالية</b> و<b>المشاريع المتأخرة</b> بتعطّل التقدم.' },
    { en: '<b>Quality assurance</b>, through <b>maturity models</b> and <b>systematic procedures</b>, helps define organizational structures and improve performance.', ar: 'الـ <b>quality assurance</b>، عن طريق الـ <b>maturity models</b> والـ <b>procedures المنظمة</b>، بيساعد يحدد الـ organizational structures وبيحسّن الأداء.' },
    { en: '<b>CMM</b> helps manage complex IT systems efficiently.', ar: 'الـ <b>CMM</b> بيساعد في إدارة الـ IT systems المعقدة بكفاءة.' },
    { en: 'A <b>QMS</b> (quality management system) gives a structured way to improve process capability, manage risk and ensure customer satisfaction.', ar: 'الـ <b>QMS</b> (quality management system) بيدي طريقة منظمة لتحسين الـ process capability، وإدارة الـ risk، وضمان رضا العميل.' },
    { en: '<b>ISO 9000</b> promotes continuous improvement, product reliability and international recognition.', ar: 'الـ <b>ISO 9000</b> بيشجع الـ continuous improvement، والـ product reliability، والاعتراف الدولي.' }
  ];
  function Intro({ ar }) {
    const [i, ctl] = useSteps(INTRO.length, 3000);
    const tool = (k, n, d) => html`<div className=${'qv7-box' + st(i, k)}><b className="t">${n}</b><small>${d}</small></div>`;
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className=${'qv7-box c' + (i === 0 ? ' on' : ' done')}><b className="t">Sustainable excellence in IT operations</b><small>a flexible framework for evolving business needs</small></div>
      <div className=${'qv7-arr' + (i >= 1 ? '' : ' wait')}>obstruct progress</div>
      <div className="qv7-chips">${['Poor IT application design', 'High costs', 'Delayed projects'].map(t => html`<span key=${t} className=${'qv7-chip bad' + (i >= 1 ? '' : ' wait')}>✕ ${t}</span>`)}</div>
      <${Arr} show=${i >= 2} t="help" />
      <div className=${'qv7-box c' + st(i, 2)}><b className="t">Quality assurance</b><small>maturity models + systematic procedures: define organizational structures, improve performance</small></div>
      <${Arr} show=${i >= 3} t="for example" />
      ${tool(3, 'CMM', 'manage complex IT systems efficiently')}
      ${tool(4, 'QMS (quality management system)', 'improve process capability, manage risk, ensure customer satisfaction')}
      ${tool(5, 'ISO 9000', 'continuous improvement, product reliability, international recognition')}
    </div></div><${Cap} ...${INTRO[i]} showAr=${ar} /><${Bar} steps=${INTRO} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 3: CMM, who made it, what it is, what it is for, where it applies ── */
  const GL = [
    { en: 'CMM was developed by the <b>Software Engineering Institute (SEI)</b> and <b>Carnegie Mellon University</b> under the <b>U.S. Department of Defense</b>.', ar: 'الـ CMM اتعمل بواسطة الـ <b>Software Engineering Institute (SEI)</b> و<b>Carnegie Mellon University</b> تحت <b>U.S. Department of Defense</b>.' },
    { en: 'CMM is a <b>standard framework for assessing and improving the maturity</b> of a software company’s development process, giving structured guidance for enhancing software quality.', ar: 'الـ CMM هو <b>standard framework لتقييم وتحسين الـ maturity</b> بتاعة الـ development process في شركة الـ software، وبيدي توجيه منظم لتحسين الـ software quality.' },
    { en: 'A maturity model gives <b>structured levels</b> showing how well processes and behaviors achieve desired outcomes. It can be used for both <b>evaluation</b> and <b>improvement</b>.', ar: 'الـ maturity model بيدي <b>levels منظمة</b> بتوضح الـ processes والـ behaviors بتحقق النتايج المطلوبة لحد فين. ينفع يتستخدم للـ <b>evaluation</b> وللـ <b>improvement</b> الاتنين.' },
    { en: 'Designed mainly for <b>software development organizations</b>, but it also applies to software/system engineering, project management, IT, risk management and personnel management.', ar: 'متصمم أساسًا لـ <b>organizations الـ software development</b>، بس كمان بيتطبق على الـ <bdi dir="ltr">software/system engineering</bdi> والـ project management والـ IT والـ risk management والـ personnel management.' }
  ];
  function CmmGlance({ ar }) {
    const [i, ctl] = useSteps(GL.length, 3400);
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className=${'qv7-box c' + (i === 0 ? ' on' : ' done')}><small style=${{ marginTop: 0 }}>under the</small><b className="t">U.S. Department of Defense</b></div>
      <div className="qv7-row" style=${{ '--qv7n': 2 }}>
        <div className=${'qv7-box c' + (i === 0 ? ' on' : ' done')}><b className="t">SEI</b><small>Software Engineering Institute</small></div>
        <div className=${'qv7-box c' + (i === 0 ? ' on' : ' done')}><b className="t">Carnegie Mellon University</b></div></div>
      <${Arr} show=${true} t="developed" />
      <div className=${'qv7-box c' + st(i, 1)}><b className="t">CMM: Capability Maturity Model</b><small>standard framework for assessing and improving the maturity of a software company’s development process</small></div>
      <${Arr} show=${i >= 2} t="used for" />
      <div className="qv7-row" style=${{ '--qv7n': 2 }}>
        <div className=${'qv7-box c' + st(i, 2)}><b className="t">Evaluation</b><small>how well processes and behaviors achieve desired outcomes</small></div>
        <div className=${'qv7-box c' + st(i, 2)}><b className="t">Improvement</b><small>structured guidance for enhancing software quality</small></div></div>
      <${Arr} show=${i >= 3} t="applies to" />
      <div className="qv7-chips">
        <span className=${'qv7-chip' + (i >= 3 ? ' k' : ' wait')}><b>Software development organizations</b> (mainly)</span>
        ${['Software/system engineering', 'Project management', 'IT', 'Risk management', 'Personnel management'].map(t => html`<span key=${t} className=${'qv7-chip' + (i >= 3 ? '' : ' wait')}>${t}</span>`)}</div>
    </div></div><${Cap} ...${GL[i]} showAr=${ar} /><${Bar} steps=${GL} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 3: five-level incremental approach, no skipping (try it) ── */
  const LV = ['Initial', 'Repeatable', 'Defined', 'Quantitatively Managed', 'Optimizing'];
  const LVD = ['ad-hoc processes, minimal structure', 'basic project management', 'standardized processes', 'statistical and quantitative control', 'continuous process improvement'];
  const VIA = [null, 'Basic Management Control', 'Process Definition', 'Process Measurement', 'Process Control'];
  function CmmClimb({ ar }) {
    const [cur, setCur] = useState(1), [msg, setMsg] = useState(null), [bad, setBad] = useState(0), [tick, setTick] = useState(0);
    const go = k => {
      setTick(t => t + 1);
      if (k === cur + 1) { setCur(k); setBad(0); setMsg({ en: `Climbed to <b><bdi>Level ${k} (${LV[k - 1]})</bdi></b>, through <b>${VIA[k - 1]}</b>.${k === 5 ? ' This is the top level: processes are systematically managed, optimized and continuously improved.' : ''}`, ar: `طلعت للـ <b><bdi dir="ltr">Level ${k} (${LV[k - 1]})</bdi></b> عن طريق الـ <b>${VIA[k - 1]}</b>.${k === 5 ? ' ده الـ top level: الـ processes بتتدار بشكل systematic، و optimized، وبتتحسن باستمرار.' : ''}` }); }
      else if (k > cur + 1) { setBad(k); setMsg({ en: `<b>Not allowed.</b> CMM is a five-level <b>incremental</b> approach: organizations progress gradually <b>without skipping levels</b>. Reach <b><bdi>Level ${cur + 1} (${LV[cur]})</bdi></b> first.`, ar: `<b>مينفعش.</b> الـ CMM هو approach <b>incremental</b> من خمس levels: الـ organizations بتتقدم واحدة واحدة <b>من غير ما تنط levels</b>. لازم توصل للـ <b><bdi dir="ltr">Level ${cur + 1} (${LV[cur]})</bdi></b> الأول.` }); }
      else { setBad(0); setMsg({ en: `Level ${k} is already reached: you are at <b><bdi>Level ${cur} (${LV[cur - 1]})</bdi></b>.`, ar: `الـ Level ${k} انت وصلته خلاص: انت دلوقتي في الـ <b><bdi dir="ltr">Level ${cur} (${LV[cur - 1]})</bdi></b>.` }); }
    };
    const m = msg || { en: '<b>Try it:</b> your organization starts at <b>Level 1 (Initial)</b>. Tap a level to move there. Try jumping straight to Level 5.', ar: '<b>جرّب:</b> الـ organization بتاعتك بادئة من الـ <b><bdi dir="ltr">Level 1 (Initial)</bdi></b>. دوس على level عشان تروحله. وجرّب تنط على طول للـ Level 5.' };
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-stairs" role="group" aria-label="CMM levels, Level 5 at the top">
      ${[5, 4, 3, 2, 1].map(k => html`<button key=${k + '-' + (bad === k ? tick : 0)} className=${'qv7-st' + (k === cur ? ' on' : k < cur ? ' done' : ' up') + (bad === k ? ' no' + (calm() ? '' : ' qv7-shake') : '')}
        style=${{ marginLeft: `calc(${k - 1} * min(7%, 26px))` }} onClick=${() => go(k)}>
        ${k === cur && html`<span className="qv7-here">you are here</span>`}<b>Level ${k}: ${LV[k - 1]}</b><small>${LVD[k - 1]}</small></button>`)}
    </div></div><${Cap} ...${m} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>
        <button className="fig-btn solid" disabled=${cur === 5} onClick=${() => go(cur + 1)}>Climb one level ↑</button>
        <button className="fig-btn" onClick=${() => { setCur(1); setMsg(null); setBad(0); }}>↻ Start again</button></div></figure>`;
  }

  /* ── slides 4 and 5: the 6 components of the CMM structure ── */
  const STR = [
    { en: '(1) <b>Maturity levels</b> define an organization’s process capability. There are five: Level 1 has ad-hoc processes with minimal structure; Level 5 is the ideal state where processes are systematically managed, optimized and continuously improved.', ar: '(1) الـ <b>Maturity levels</b> بتحدد الـ process capability بتاعة الـ organization. وهما خمسة: الـ Level 1 فيه processes ad-hoc و structure قليل جدًا؛ والـ Level 5 هو الحالة المثالية اللي الـ processes فيها بتتدار بشكل systematic، و optimized، وبتتحسن باستمرار.' },
    { en: '(2) <b>Process capability</b>: the organization’s ability to meet quality expectations through its current processes. It helps predict the outcomes of future software projects, ensuring consistency and reliability.', ar: '(2) الـ <b>Process capability</b>: قدرة الـ organization إنها تحقق توقعات الـ quality بالـ processes الحالية بتاعتها؛ وبتساعد إننا نتوقع نتايج مشاريع الـ software الجاية، وده بيضمن الـ consistency والـ reliability.' },
    { en: '(3) <b>Key Process Areas (KPA)</b>: groups of related activities that achieve goals when performed together; they define capability at each level. Example: software project delivery planning.', ar: '(3) الـ <b>Key Process Areas (KPA)</b>: مجموعات أنشطة مرتبطة ببعض بتحقق goals لما تتعمل مع بعض؛ وبتحدد الـ capability في كل level. مثال: الـ software project delivery planning.' },
    { en: '(4) <b>Goals</b>: evaluate essential practices within a process area to determine if an organization or project has successfully implemented it, highlighting its importance and purpose.', ar: '(4) الـ <b>Goals</b>: بتقيّم الـ practices الأساسية جوه الـ process area عشان نعرف هل الـ organization أو الـ project طبّقها بنجاح، وبتوضح أهميتها والغرض منها.' },
    { en: '(5) <b>Common features</b>: characteristics showing whether a KPA’s implementation is successful and sustainable.', ar: '(5) الـ <b>Common features</b>: خصائص بتوضح هل تطبيق الـ KPA ناجح ومستدام.' },
    { en: '(6) <b>Key practices</b>: define the necessary actions and infrastructure to support a KPA, ensuring effective application. Example: a software delivery schedule follows a documented procedure.', ar: '(6) الـ <b>Key practices</b>: بتحدد الأفعال والـ infrastructure المطلوبين عشان يدعموا الـ KPA، وده بيضمن إنها تتطبق بفعالية. مثال: الـ software delivery schedule ماشي على procedure موثق.' }
  ];
  function CmmStructure({ ar }) {
    const [i, ctl] = useSteps(STR.length, 3400);
    const B = (k, t, d) => html`<div className=${'qv7-box c' + st(i, k)} onClick=${() => ctl.go(k)} style=${{ cursor: 'pointer' }}><b className="t">${t}</b>${d && html`<small>${d}</small>`}</div>`;
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div style=${{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', gap: '6px', alignItems: 'center' }}>
        ${B(0, '(1) Maturity levels', 'five levels, 1 to 5')}
        <div className=${'qv7-arr' + (i >= 1 ? '' : ' wait')}><i>→</i>define</div>
        ${B(1, '(2) Process capability', 'predicts future project outcomes')}</div>
      <${Arr} show=${i >= 2} t="at each level" />
      ${B(2, '(3) Key Process Areas (KPA)', 'e.g. software project delivery planning')}
      <${Arr} show=${i >= 3} t="for each KPA" />
      <div className="qv7-row" style=${{ '--qv7n': 3 }}>${B(3, '(4) Goals')}${B(4, '(5) Common features')}${B(5, '(6) Key practices')}</div>
      <div className=${'qv7-box c' + (i >= 5 ? ' done qv7-in' : ' wait')}><small style=${{ marginTop: 0 }}>key practice example: a software delivery schedule follows a documented procedure</small></div>
    </div></div><${Cap} ...${STR[i]} showAr=${ar} /><${Bar} steps=${STR} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 8: Table 1 as a self-assessment (try it) ── */
  const T1 = {
    2: ['Plan and track projects', 'Manage suppliers', 'Manage product configurations', 'Measure projects', 'Assist and assure policy compliance'],
    3: ['Create enhancement infrastructure', 'Identify required software processes', 'Organize and manage processes', 'Collect process-level data', 'Provide organization-wide training', 'Manage with non-software groups'],
    4: ['Supervise processes quantitatively', 'Create capability baselines'],
    5: ['Develop change infrastructure', 'Assess and organize improvements', 'Remove causes of defects']
  };
  const full = k => T1[k].map(() => true);
  function CmmAssess({ ar }) {
    const empty = () => ({ 2: T1[2].map(() => false), 3: T1[3].map(() => false), 4: T1[4].map(() => false), 5: T1[5].map(() => false) });
    const [has, setHas] = useState(empty), [touched, setTouched] = useState(false);
    const flip = (k, j) => { setTouched(true); setHas(h => Object.assign({}, h, { [k]: h[k].map((v, x) => x === j ? !v : v) })); };
    const preset = p => { setTouched(true); setHas(p === 'none' ? empty() : p === 'skip' ? Object.assign(empty(), { 2: full(2), 4: full(4) }) : { 2: full(2), 3: full(3), 4: full(4), 5: full(5) }); };
    const all = k => has[k].every(Boolean);
    let lvl = 1; for (let k = 2; k <= 5; k++) { if (all(k) && lvl === k - 1) lvl = k; }
    const blocked = [2, 3, 4, 5].filter(k => k > lvl + 1 && all(k));
    const missing = lvl < 5 ? T1[lvl + 1].filter((_, j) => !has[lvl + 1][j]) : [];
    let en, a;
    if (!touched) { en = '<b>Try it:</b> tick the improvements your organization has implemented (Table 1). The maturity level is the highest level whose improvements are all in place, with every level below it complete too.'; a = '<b>جرّب:</b> علّم على الـ improvements اللي الـ organization بتاعتك طبقتها (الـ Table 1). الـ maturity level هو أعلى level كل الـ improvements بتاعته متطبقة، وكل الـ levels اللي تحته كاملة كمان.'; }
    else {
      en = `Maturity level: <b><bdi>Level ${lvl} (${LV[lvl - 1]})</bdi></b>.` + (lvl === 1 ? ' Level 1 has no required processes.' : '');
      a = `الـ maturity level: <b>الـ <bdi dir="ltr">Level ${lvl} (${LV[lvl - 1]})</bdi></b>.` + (lvl === 1 ? ' الـ Level 1 مفيهوش processes مطلوبة.' : '');
      if (lvl < 5) { en += ` To reach Level ${lvl + 1}, still implement: ${missing.join('; ')}.`; a += ` عشان توصل للـ Level ${lvl + 1} لسه محتاج تطبق:<br><span class="ltr">${missing.join('; ')}</span>`; }
      else { en += ' All of Table 1 is implemented.'; a += ' كل الـ Table 1 متطبق.'; }
      if (blocked.length) { en += `<br>Level ${blocked.join(' and ')} improvements are all ticked, but they do not count yet: <b>levels cannot be skipped</b>.`; a += `<br>كل الـ improvements بتاعة الـ Level ${blocked.join(' والـ Level ')} متعلّم عليها، بس لسه مبتتحسبش: <b>مينفعش ننط levels</b>.`; }
    }
    const lvBox = k => { const ok = k <= lvl, blk = blocked.includes(k); const n = has[k].filter(Boolean).length;
      return html`<div key=${k} className=${'qv7-lv' + (ok ? ' ok' : blk ? ' blk' : '')}>
        <h5>Level ${k}: ${LV[k - 1]} <span className=${'qv7-tag' + (ok ? ' ok' : blk ? ' blk' : '')}>${ok ? 'reached' : blk ? 'blocked: lower level missing' : n + ' / ' + T1[k].length}</span></h5>
        <div className="qv7-togs">${T1[k].map((t, j) => html`<button key=${j} className="qv7-tog" aria-pressed=${String(has[k][j])} onClick=${() => flip(k, j)}>${t}</button>`)}</div></div>`; };
    return html`<figure className="fig qv7"><div className="fig-stage">
      <div className="qv7-res" aria-hidden="true">${[1, 2, 3, 4, 5].map(k => html`<span key=${k} className=${k <= lvl ? 'on' : ''}></span>`)}</div>
      <div className="qv7-lvtxt" aria-live="polite">Level ${lvl}: ${LV[lvl - 1]}</div>
      <div className="qv7-col">${[5, 4, 3, 2].map(lvBox)}
        <div className="qv7-lv ok"><h5>Level 1: Initial <span className="qv7-tag ok">reached</span></h5><span style=${{ fontSize: '.8rem', color: 'var(--graphite)' }}>No required processes</span></div></div>
    </div><${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>
        <button className="fig-btn" onClick=${() => preset('none')}>Clear</button>
        <button className="fig-btn" onClick=${() => preset('skip')}>Levels 2 and 4 only</button>
        <button className="fig-btn" onClick=${() => preset('all')}>Tick all</button></div></figure>`;
  }

  /* ── slide 9: the five aspects of a KPA ── */
  const KPA = [
    { en: 'Within each maturity level are <b>Key Process Areas (KPA)</b> which explain about that level, and each KPA has <b>5 aspects</b>.', ar: 'جوه كل maturity level فيه <b>Key Process Areas (KPA)</b> بتشرح الـ level ده، وكل KPA ليه <b>5 aspects</b>.' },
    { en: '(1) <b>Goals</b>: each KPA sets several goals, which include the different objectives that help the organization <b>climb to the next CMM level</b>.', ar: '(1) الـ <b>Goals</b>: كل KPA بيحط كذا goal فيهم الـ objectives المختلفة اللي بتساعد الـ organization <b>تطلع للـ CMM level اللي بعده</b>.' },
    { en: '(2) <b>Commitment</b>: various requirements that must be met to achieve the specified goals.', ar: '(2) الـ <b>Commitment</b>: متطلبات مختلفة لازم تتحقق عشان نوصل للـ goals المحددة.' },
    { en: '(3) <b>Ability</b>: the activities carried out to enable the organization to meet the commitments.', ar: '(3) الـ <b>Ability</b>: الأنشطة اللي بتتعمل عشان الـ organization تقدر تحقق الـ commitments.' },
    { en: '(4) <b>Measurement</b>: the activities performed should be monitored, so there are methods that have to be followed to do it.', ar: '(4) الـ <b>Measurement</b>: الأنشطة اللي بتتعمل لازم تتراقب، وعشان كده فيه methods لازم نمشي عليها عشان ننفذ ده.' },
    { en: '(5) <b>Verification</b>: various methods that need to be followed that define the verification.', ar: '(5) الـ <b>Verification</b>: فيه methods مختلفة لازم نمشي عليها بتحدد الـ verification.' }
  ];
  const ASP = [['Goals', 'objectives that help climb to the next CMM level'], ['Commitment', 'requirements that must be met to achieve the goals'], ['Ability', 'activities that enable meeting the commitments'], ['Measurement', 'methods to monitor the activities performed'], ['Verification', 'methods that define the verification']];
  function KpaAspects({ ar }) {
    const [i, ctl] = useSteps(KPA.length, 3000);
    const [pick, setPick] = useState(null);
    const opts = ['Goals', 'Commitment', 'Marketing', 'Ability', 'Measurement', 'Verification'];
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className="qv7-row" style=${{ '--qv7n': 2 }}>
        <div className="qv7-box c done"><b className="t">Maturity level</b></div>
        <div className=${'qv7-box c' + (i === 0 ? ' on' : ' done')}><b className="t">Key Process Areas</b><small>explain the level</small></div></div>
      <div className="qv7-arr"><i>↓</i>each KPA has 5 aspects</div>
      ${ASP.map(([n, d], k) => html`<div key=${n} className=${'qv7-box' + st(i, k + 1)} onClick=${() => ctl.go(k + 1)} style=${{ cursor: 'pointer' }}><b className="t">(${k + 1}) ${n}${k === 0 && i >= 1 ? ' ↑ next CMM level' : ''}</b><small>${d}</small></div>`)}
      <div className="qv7-check">Quick check: which one is <b>not</b> an aspect of a KPA?
        <div className="qv7-chips">${opts.map(o => html`<button key=${o} className=${'qv7-chip qv7-chipbtn' + (pick === o ? (o === 'Marketing' ? ' ok' : ' no') : '')} onClick=${() => setPick(o)}>${o}</button>`)}</div>
        <div className="qv7-fb" aria-live="polite">${pick == null ? '' : pick === 'Marketing' ? 'Right: Marketing is not one of the five aspects.' : pick + ' is one of the five aspects. Try again.'}
          ${pick != null && ar && html`<span style=${{ display: 'block', direction: 'rtl' }}>${pick === 'Marketing' ? 'صح: الـ Marketing مش من الـ 5 aspects.' : 'لأ، الـ ' + pick + ' واحد من الـ 5 aspects. جرّب تاني.'}</span>`}</div></div>
    </div></div><${Cap} ...${KPA[i]} showAr=${ar} /><${Bar} steps=${KPA} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 10: benefits of CMM ── */
  const BEN = [
    ['Analysts', 'Simple and easy to analyze', 'الـ CMM بسيط وسهل يتحلل.'],
    ['Executives', 'Many corporate executives already know the model', 'فيه executives كتير في الشركات عارفين الـ model ده أصلًا.'],
    ['Senior executives', 'Used to explain major IT issues and concepts to them', 'شركات كتير بتستخدمه بنجاح عشان تشرح مشاكل ومفاهيم الـ IT الكبيرة للـ senior executives.'],
    ['Project funding', 'Helps get funding for key initiatives, e.g. enterprise data asset management, metadata repository', 'أداة مفيدة عشان نجيب funding للمشاريع المهمة، زي الـ enterprise data asset management والـ metadata repository.'],
    ['Companies and governments', 'Large companies and governments use it to compare themselves with others', 'الشركات الكبيرة والحكومات بيستخدموه عشان يقارنوا نفسهم بغيرهم.']
  ];
  const BENS = [{ en: 'The <b>benefits of CMM</b>: five ways it helps, and who it helps.', ar: 'الـ <b>benefits بتوع الـ CMM</b>: خمس طرق بيساعد بيها، وبيساعد مين.' },
    ...BEN.map(([w, en, a], k) => ({ en: `(${k + 1}) <b>${en}</b>.`, ar: `(${k + 1}) <b>${a}</b>` }))];
  function CmmBenefits({ ar }) {
    const [i, ctl] = useSteps(BENS.length, 2800);
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className="qv7-box c on" style=${{ maxWidth: '200px', margin: '0 auto', borderRadius: '99px' }}><b className="t">CMM</b></div>
      <div className="qv7-arr"><i>↓</i>helps</div>
      ${BEN.map(([w, d], k) => html`<div key=${w} className=${'qv7-box' + (i === k + 1 ? ' on' : i > k + 1 || i === 0 ? ' done' : ' wait')} onClick=${() => ctl.go(k + 1)} style=${{ cursor: 'pointer' }}><b className="t">(${k + 1}) ${w}</b><small>${d}</small></div>`)}
    </div></div><${Cap} ...${BENS[i]} showAr=${ar} /><${Bar} steps=${BENS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 11: ISO 9000 at a glance ── */
  const ISO = [
    { en: 'The <b>International Organization for Standardization (ISO)</b> publishes <b>ISO 9000</b>: a set of internationally recognized standards.', ar: 'الـ <b>International Organization for Standardization (ISO)</b> بتنشر الـ <b>ISO 9000</b>: مجموعة standards معترف بيها دوليًا.' },
    { en: 'It defines <b>universal best practices</b> so organizations meet <b>quality requirements</b> and <b>client expectations</b>.', ar: 'بتحدد <b>best practices عالمية</b> عشان الـ organizations تحقق الـ <b>quality requirements</b> و<b>توقعات العملاء</b>.' },
    { en: 'It is <b>highly generic</b>: it applies to any organization providing <b>products</b> or <b>services</b>.', ar: 'هو <b>generic جدًا</b>: بيتطبق على أي organization بتقدم <b>products</b> أو <b>services</b>.' },
    { en: 'The name <b>ISO</b> comes from the Greek word <b>isos</b> = “equal”, reflecting a global standard for quality assurance.', ar: 'كلمة <b>ISO</b> جاية من الكلمة اليونانية <b>isos</b> ومعناها «متساوي»، وده بيعكس إنه standard عالمي للـ quality assurance.' },
    { en: 'ISO 9000 consists of <b>20 key elements</b> that outline the measures an organization needs to comply with its quality assurance guidelines.', ar: 'الـ ISO 9000 فيه <b>20 key elements</b> بتحدد الإجراءات اللازمة عشان الـ organizations تلتزم بالـ quality assurance guidelines بتاعته.' },
    { en: 'Each element must be <b>clearly and thoroughly documented</b> to demonstrate adherence to ISO 9000.', ar: 'وكل element لازم <b>يكون موثق بوضوح وبالتفصيل</b> عشان نثبت الالتزام بالـ ISO 9000.' }
  ];
  function IsoOverview({ ar }) {
    const [i, ctl] = useSteps(ISO.length, 3000);
    const [n, setN] = useState(0);
    useEffect(() => { if (i < 5) { setN(0); return; } if (calm()) { setN(20); return; } setN(0); let x = 0; const t = setInterval(() => { x++; setN(x); if (x >= 20) clearInterval(t); }, 90); return () => clearInterval(t); }, [i]);
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className=${'qv7-box c' + (i === 0 ? ' on' : ' done')}><b className="t">ISO</b><small>International Organization for Standardization</small></div>
      <${Arr} show=${true} t="publishes" />
      <div className=${'qv7-box c' + st(i, 1)}><b className="t">ISO 9000</b><small>universal best practices: quality requirements and client expectations</small></div>
      <div className="qv7-row" style=${{ '--qv7n': 2 }}>
        <div className=${'qv7-box c' + st(i, 2)}><b className="t">Products</b><small>any organization</small></div>
        <div className=${'qv7-box c' + st(i, 2)}><b className="t">Services</b><small>any organization</small></div></div>
      <div className=${'qv7-box c' + st(i, 3)}><b className="t">ISO ← isos (Greek) = equal</b><small>a global standard for quality assurance</small></div>
      <div className=${'qv7-box' + st(i, 4)}><b className="t">20 key elements${i >= 5 ? ', each documented' : ''}</b>
        <div className="qv7-sq" aria-hidden="true">${Array.from({ length: 20 }, (_, k) => html`<span key=${k} className=${k < n ? 'doc' : ''}>${k < n ? '✓' : ''}</span>`)}</div></div>
    </div></div><${Cap} ...${ISO[i]} showAr=${ar} /><${Bar} steps=${ISO} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── tiles: tour each item, or quiz yourself (20 elements, 8 principles) ── */
  const shuffle = a => { const b = a.slice(); for (let k = b.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [b[k], b[j]] = [b[j], b[k]]; } return b; };
  function Tiles({ ar, items, cols, what, whatAr, intro, quiz, ms, num }) {
    const W = t => t.replace(/\//g, '/<wbr>');
    const steps = [intro, ...items.map((it, k) => ({ en: `${num ? '(' + (k + 1) + ') ' : ''}<b>${W(it.n)}</b>: ${it.d}`, ar: `${num ? 'العنصر (' + (k + 1) + ') ' : 'الـ principle '}<b>${W(it.n)}</b>: ${it.a}` }))];
    const [i, ctl] = useSteps(steps.length, ms);
    const [mode, setMode] = useState('tour');
    const [order, setOrder] = useState(() => shuffle(quiz.map((_, k) => k)));
    const [q, setQ] = useState(0), [pick, setPick] = useState(null), [score, setScore] = useState([0, 0]);
    const Q = quiz[order[q]];
    const tap = k => {
      if (mode === 'tour') return ctl.go(k + 1);
      if (pick != null) return;
      setPick(k); setScore(([r, t]) => [r + (k === Q.k ? 1 : 0), t + 1]);
    };
    const next = () => { if (q + 1 >= order.length) { setOrder(shuffle(quiz.map((_, k) => k))); setQ(0); setScore([0, 0]); } else setQ(q + 1); setPick(null); };
    const label = (k) => `${num ? '(' + (k + 1) + ') ' : ''}${W(items[k].n)}`;
    let cap;
    if (mode === 'tour') cap = steps[i];
    else if (pick == null) cap = { en: `<b>Which ${what}?</b> Tap the tile that matches the description above.`, ar: `<b>أنهي ${whatAr}؟</b> دوس على المربع اللي بيطابق الوصف اللي فوق.` };
    else if (pick === Q.k) cap = { en: `<b>Right:</b> ${label(Q.k)}. ${items[Q.k].d}`, ar: `<b>صح:</b> <bdi dir="ltr">${label(Q.k)}</bdi>. ${items[Q.k].a}` };
    else cap = { en: `<b>Not quite:</b> you picked ${label(pick)} (${items[pick].d}). The answer is <b>${label(Q.k)}</b>.`, ar: `<b>مش بالظبط:</b> انت اخترت <bdi dir="ltr">${label(pick)}</bdi>، ودي معناها «${items[pick].a}». والإجابة هي <b><bdi dir="ltr">${label(Q.k)}</bdi></b>.` };
    const cls = k => mode === 'tour' ? (i === k + 1 ? ' on' : i > k + 1 ? ' done' : '') : pick == null ? '' : k === Q.k ? ' ok' : k === pick ? ' no' : '';
    return html`<figure className="fig qv7 qv7-many"><div className="fig-stage">
      <${Modes} list=${[['tour', 'Tour'], ['quiz', 'Quiz yourself']]} mode=${mode} setMode=${m => { setMode(m); setPick(null); if (m === 'tour') ctl.go(0); }} />
      ${mode === 'quiz' && html`<div className="qv7-q"><b>Question ${q + 1} of ${order.length}</b>${Q.en}${ar && html`<span style=${{ display: 'block', direction: 'rtl', textAlign: 'right', color: 'var(--graphite)', marginTop: '3px' }} dangerouslySetInnerHTML=${{ __html: Q.ar }}></span>`}</div>`}
      <div className="qv7-tiles" style=${{ '--qv7c': cols }}>${items.map((it, k) => html`<button key=${k} className=${'qv7-tile' + cls(k)} onClick=${() => tap(k)}>${num && html`<span className="n">${k + 1}</span>`}<span dangerouslySetInnerHTML=${{ __html: W(it.n) }}></span></button>`)}</div>
    </div><${Cap} ...${cap} showAr=${ar} />
      ${mode === 'tour' ? html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />` : html`<div className="fig-bar"><span className="qv7-score">Score ${score[0]} / ${score[1]}</span><span className="grow"></span><button className="fig-btn solid" disabled=${pick == null} onClick=${next}>${q + 1 >= order.length ? '↻ New round' : 'Next ›'}</button></div>`}</figure>`;
  }

  /* ── slides 12 and 13: the 20 elements of ISO 9000 ── */
  const EL = [
    ['Management Responsibility', 'management must set the quality policy and provide resources.', 'الـ management لازم يحط الـ quality policy ويوفر الـ resources.'],
    ['Quality Systems', 'maintain a documented quality manual and procedures.', 'نحافظ على quality manual و procedures موثقين.'],
    ['Contract Review', 'clearly state and verify customer needs.', 'نحدد احتياجات العميل بوضوح ونتأكد منها.'],
    ['Design Control', 'document and control design and engineering changes.', 'نوثق ونتحكم في تغييرات الـ design والـ engineering.'],
    ['Documentation & Data Control', 'strict control of document creation and modification.', 'تحكم صارم في إنشاء الـ documents وتعديلها.'],
    ['Purchasing', 'define supplier requirements and compliance processes.', 'نحدد متطلبات الـ suppliers و processes الـ compliance.'],
    ['Customer Supplied Product Control', 'handle and protect customer-provided materials.', 'نتعامل مع المواد اللي العميل بيوفرها ونحميها.'],
    ['Product Identification & Traceability', 'track products from start to finish.', 'نتابع الـ products من البداية للنهاية.'],
    ['Process Control', 'use work instructions, quality plans and standards.', 'نستخدم work instructions و quality plans و standards.'],
    ['Inspection & Testing', 'perform receiving, in-process and final inspections.', 'نعمل inspections عند الاستلام (receiving)، وأثناء الـ process (in-process)، وفي الآخر (final).'],
    ['Inspection/Measuring Equipment', 'calibrate instruments regularly.', 'نعمل calibration للأجهزة بانتظام.'],
    ['Inspection & Test Status', 'clearly identify inspected products.', 'نحدد بوضوح الـ products اللي اتعملها inspection.'],
    ['Control of Non-Conforming Product', 'separate and manage rejected items.', 'نفصل الحاجات المرفوضة وندير أمرها.'],
    ['Corrective & Preventive Action', 'identify root causes and prevent future defects.', 'نحدد الـ root causes ونمنع defects في المستقبل.'],
    ['Handling/Storage/Packaging/Delivery', 'protect products throughout production and shipping.', 'نحمي الـ products طول الإنتاج والشحن.'],
    ['Quality Records', 'maintain records for audit trails.', 'نحتفظ بـ records للـ audit trails.'],
    ['Internal Quality Audits', 'conduct periodic audits and share results.', 'نعمل audits دورية ونشارك النتايج.'],
    ['Training', 'maintain training records and qualifications of all employees.', 'نحتفظ بـ training records و qualifications لكل الموظفين.'],
    ['Servicing', 'ensure after-delivery support meets requirements (if applicable).', 'نتأكد إن الدعم بعد التسليم بيحقق المتطلبات (لو موجود).'],
    ['Statistical Techniques', 'use data, control charts and analysis for quality improvement.', 'نستخدم data و control charts وتحليل عشان نحسّن الـ quality.']
  ].map(([n, d, a]) => ({ n, d: d.charAt(0).toUpperCase() + d.slice(1), a }));
  const EL_Q = EL.map((e, k) => ({ k, en: e.d, ar: e.a }));
  EL_Q.push({ k: 12, en: 'You must develop procedures for <b>rejected materials</b>.', ar: 'لازم تعمل procedures للـ <b>materials المرفوضة</b>.' });
  function IsoElements({ ar }) {
    return html`<${Tiles} ar=${ar} items=${EL} cols=${4} num=${true} ms=${2600} what="element" whatAr="element"
      intro=${{ en: 'ISO 9000 has <b>20 key elements</b>; each must be clearly and thoroughly documented. Tap a tile, or let the tour walk through all 20.', ar: 'الـ ISO 9000 فيه <b>20 key elements</b>؛ وكل element لازم يكون موثق بوضوح وبالتفصيل. دوس على أي مربع، أو سيب الـ tour يمشي على الـ 20.' }}
      quiz=${EL_Q} />`;
  }

  /* ── slide 14: the 8 quality management principles ── */
  const PR = [
    ['Customer Focus', 'Understand and exceed customer needs to gain loyalty.', 'نفهم احتياجات العميل ونتخطاها عشان نكسب ولاءه.'],
    ['Leadership', 'Leaders create an environment where people are fully involved.', 'الـ leaders بيعملوا بيئة الناس فيها مشاركة بالكامل.'],
    ['Involvement of People', 'Employees at all levels contribute to the organization’s success.', 'الموظفين في كل المستويات بيساهموا في نجاح الـ organization.'],
    ['Process Approach', 'Manage activities as processes for consistent results.', 'ندير الأنشطة كـ processes عشان نوصل لنتايج ثابتة.'],
    ['System Approach to Management', 'Align interconnected processes as one system.', 'نظبط الـ processes المترابطة مع بعض كأنها system واحد.'],
    ['Continuous Improvement', 'Ongoing improvement is a permanent objective.', 'التحسين المستمر هدف دايم.'],
    ['Factual Decision Making', 'Base decisions on reliable data and analysis.', 'القرارات تتبني على data وتحليل موثوق.'],
    ['Mutually Beneficial Supplier Relationships', 'Build strong, value-creating relationships with suppliers.', 'نبني علاقات قوية مع الـ suppliers بتعمل value للطرفين.']
  ].map(([n, d, a]) => ({ n, d, a }));
  function IsoPrinciples({ ar }) {
    return html`<${Tiles} ar=${ar} items=${PR} cols=${2} num=${false} ms=${2800} what="principle" whatAr="principle"
      intro=${{ en: 'ISO is built on <b>8 key principles</b> that guide organizations toward high-quality performance. Tap one, or let the tour walk through them.', ar: 'الـ ISO مبني على <b>8 key principles</b> بيوجهوا الـ organizations لأداء عالي الـ quality. دوس على واحد، أو سيب الـ tour يمشي عليهم.' }}
      quiz=${PR.map((p, k) => ({ k, en: p.d, ar: p.a }))} />`;
  }

  /* ── slide 15: software engineering standards over time ── */
  const SES = [
    { en: '<b>Software engineering standards</b> ensure proper development, testing and maintenance of software by following specific guidelines.', ar: 'الـ <b>Software engineering standards</b> بتضمن إن الـ development والـ testing والـ maintenance بتوع الـ software بيتعملوا صح عن طريق إننا نمشي على guidelines محددة.' },
    { en: 'Various organizations, including <b>international and national bodies</b>, establish and enforce <b>SQA standards</b>.', ar: 'فيه organizations مختلفة، منها <b>جهات دولية ومحلية</b>، بتعمل الـ <b>SQA standards</b> وبتفرض تطبيقها.' },
    { en: 'Organizations are increasingly shifting <b>from local to international standards</b>.', ar: 'الـ organizations بتتحول أكتر وأكتر <b>من standards محلية لـ دولية</b>.' },
    { en: '<b>1976</b>: the <b>IEEE</b> and the <b>IEEE Computer Society</b> lead this movement; since 1976 IEEE has contributed significantly to standardization.', ar: 'سنة <b>1976</b>: الـ <b>IEEE</b> والـ <b>IEEE Computer Society</b> في مقدمة الحركة دي؛ ومن 1976 الـ IEEE ساهم جامد في الـ standardization.' },
    { en: 'This led to the <b>IEEE Software Engineering Standard Collection</b>, a foundation for many international project process standards.', ar: 'وده وصّل لـ <b>IEEE Software Engineering Standard Collection</b>، اللي بقت أساس لـ international project process standards كتير.' },
    { en: '<b>1993</b>: <b>SPICE</b> is introduced. The SPICE project and <b>ISO/IEC 15504</b> are joint initiatives by <b>ISO</b> and <b>IEC</b> to establish a standard software process assessment methodology.', ar: 'سنة <b>1993</b>: اتقدم الـ <b>SPICE</b>. والـ SPICE project والـ <b><bdi dir="ltr">ISO/IEC 15504</bdi></b> مبادرات مشتركة بين الـ <b>ISO</b> والـ <b>IEC</b> عشان يعملوا methodology standard لتقييم الـ software process.' }
  ];
  function StdTimeline({ ar }) {
    const [i, ctl] = useSteps(SES.length, 3200);
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className=${'qv7-box c' + st(i, 0)}><b className="t">Software engineering standards</b><small>proper development, testing and maintenance, by following guidelines</small></div>
      <div className="qv7-row" style=${{ '--qv7n': 2 }}>
        <div className=${'qv7-box c' + st(i, 1)}><b className="t">International bodies</b></div>
        <div className=${'qv7-box c' + st(i, 1)}><b className="t">National bodies</b></div></div>
      <div className=${'qv7-arr' + (i >= 1 ? '' : ' wait')}>establish and enforce SQA standards</div>
      <div className=${'qv7-box' + st(i, 2)}><div className="qv7-shift"><span style=${{ textAlign: 'center' }}>Local standards</span><span className=${'mv' + (i >= 2 && !calm() ? ' go' : '')}>→</span><b style=${{ textAlign: 'center' }}>International standards</b></div></div>
      <div className="qv7-tl" style=${{ marginTop: '6px' }}>
        <div className=${'qv7-box' + st(i, 3)}><span className="qv7-yr">1976</span><b className="t">IEEE + IEEE Computer Society</b><small>lead standardization</small></div>
        <div className=${'qv7-box' + st(i, 4)}><b className="t">IEEE Software Engineering Standard Collection</b><small>foundation for many international project process standards</small></div>
        <div className=${'qv7-box' + st(i, 5)}><span className="qv7-yr">1993</span><b className="t">SPICE project (ISO + IEC)</b><small>ISO/IEC 15504: standard software process assessment methodology</small></div>
      </div>
    </div></div><${Cap} ...${SES[i]} showAr=${ar} /><${Bar} steps=${SES} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 15: SPICE, the acronym and its 3 objectives ── */
  const SP = [
    { en: '<b>SPICE</b> = <b>S</b>oftware <b>P</b>rocess <b>I</b>mprovement for <b>C</b>apability d<b>E</b>termination.', ar: 'الـ <b>SPICE</b> اختصار لـ:<br><span class="ltr">Software Process Improvement for Capability Determination</span>' },
    { en: 'The SPICE project and <b>ISO/IEC 15504</b> are joint initiatives by <b>ISO</b> and <b>IEC</b>. Introduced in <b>1993</b>, SPICE aims to improve international software process standards.', ar: 'الـ SPICE project والـ <b><bdi dir="ltr">ISO/IEC 15504</bdi></b> مبادرات مشتركة بين الـ <b>ISO</b> والـ <b>IEC</b>. اتقدم سنة <b>1993</b>، وهدفه يحسّن الـ international software process standards.' },
    { en: 'Objective (1): <b>establish a standard framework</b> for software process assessment.', ar: 'الـ objective الأول: <b>نعمل standard framework</b> لتقييم الـ software process.' },
    { en: 'Objective (2): <b>conduct organizational assessments</b> for emerging standards.', ar: 'الـ objective التاني: <b>نعمل organizational assessments</b> للـ standards الجديدة.' },
    { en: 'Objective (3): <b>facilitate global adoption</b> of software process assessment in industry.', ar: 'الـ objective التالت: <b>نسهّل تبني</b> تقييم الـ software process عالميًا في الصناعة.' }
  ];
  function Spice({ ar }) {
    const [i, ctl] = useSteps(SP.length, 3200);
    const W = [['S', 'oftware'], ['P', 'rocess'], ['I', 'mprovement'], ['C', 'apability'], ['E', 'Determination']];
    const OB = ['Establish a standard framework for software process assessment', 'Conduct organizational assessments for emerging standards', 'Facilitate global adoption of software process assessment in industry'];
    return html`<figure className="fig qv7"><div className="fig-stage"><div className="qv7-col">
      <div className="qv7-ac" role="img" aria-label="SPICE: Software Process Improvement for Capability Determination">
        ${W.map(([L, w], k) => [
          k === 3 && html`<span key="for" className="for">for</span>`,
          html`<span key=${'L' + k} className="L">${L}</span>`,
          html`<span key=${'w' + k} className=${'w' + (calm() ? '' : ' qv7-in')} style=${{ animationDelay: k * .3 + 's' }}>${k === 4 ? html`<span>D<u>e</u>termination</span>` : html`<span><u>${L}</u>${w}</span>`}</span>`])}
      </div>
      <div className=${'qv7-box c' + st(i, 1)} style=${{ marginTop: '6px' }}><b className="t">1993 · ISO + IEC · ISO/IEC 15504</b><small>aims to improve international software process standards</small></div>
      <${Arr} show=${i >= 2} t="3 objectives" />
      ${OB.map((o, k) => html`<div key=${k} className=${'qv7-box' + st(i, k + 2)}><b className="t">(${k + 1}) ${o}</b></div>`)}
    </div></div><${Cap} ...${SP[i]} showAr=${ar} /><${Bar} steps=${SP} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'qa-qm-intro': Intro, 'qa-cmm-glance': CmmGlance, 'qa-cmm-climb': CmmClimb, 'qa-cmm-structure': CmmStructure, 'qa-cmm-assess': CmmAssess,
    'qa-kpa-aspects': KpaAspects, 'qa-cmm-benefits': CmmBenefits, 'qa-iso-overview': IsoOverview, 'qa-iso-elements': IsoElements,
    'qa-iso-principles': IsoPrinciples, 'qa-std-timeline': StdTimeline, 'qa-spice': Spice
  });
})();

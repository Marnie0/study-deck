// Midterm scope and exam-focused summary for qa: English and Egyptian Arabic per point. Merged by build.mjs.
window.MIDTERM = window.MIDTERM || {};
MIDTERM.qa = {
 "lecs": [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
 ],
 "scope": "Up to Six Sigma (L1–L8)",
 "scope_ar": "لحد الـ Six Sigma، من المحاضرة 1 لـ 8",
 "sections": [
  {
   "lec": 1,
   "h": "Testing: definition, aim, objectives and evolution",
   "ar_h": "الـ Testing: التعريف والهدف والـ objectives والتطور",
   "pts": [
    [
     "<b>Software testing</b> is an <b>incremental and iterative</b> process for detecting defects and verifying that a system meets its specified requirements; it is an <b>integral part of the SDLC</b>.",
     "الـ <b>Software testing</b> هو process <b>incremental و iterative</b> بنكتشف بيها الـ defects ونتأكد إن الـ system ماشي على الـ requirements المحددة، وهو <b>جزء أساسي من الـ SDLC</b>."
    ],
    [
     "<b>Miller's aim</b>: to <b>affirm the quality</b> of software systems by <b>systematically exercising</b> the software in <b>carefully controlled circumstances</b>.",
     "هدف <b>Miller</b> إننا <b>نأكد الـ quality</b> بتاعة الـ software systems بإننا <b>نشغّل الـ software بشكل منظم (systematically)</b> في <b>ظروف متحكم فيها بعناية</b>."
    ],
    [
     "<b>6 objectives</b>: meet the business requirements (customer confidence), catch bugs, ensure the system is stable and ready, identify areas of weakness, establish the degree of quality, determine user acceptability.",
     "الـ <b>6 objectives</b> هما إننا نحقق الـ business requirements (ثقة العميل)، ونمسك الـ bugs، ونتأكد إن الـ system stable وجاهز، ونحدد نقط الضعف، ونحدد درجة الـ quality، ونحدد الـ user acceptability."
    ],
    [
     "<b>Gelperin &amp; Hetzel</b> (by goals and phases): until 1956 <b>Debugging</b>-oriented; 1957–1978 <b>Demonstration</b> (meets specifications); 1979–1982 <b>Destruction</b> (find errors, Myers); 1983–1987 <b>Evaluation</b> (introduced V&amp;V); 1988–2000 <b>Prevention</b> (early test design and planning).",
     "تقسيم <b>Gelperin و Hetzel</b> (على حسب الـ goals والـ phases):<br>لحد <bdi dir=\"ltr\">1956</bdi> كان <b>Debugging</b>-oriented.<br>من <bdi dir=\"ltr\">1957–1978</bdi> كان <b>Demonstration</b> (يطابق الـ specifications).<br>من <bdi dir=\"ltr\">1979–1982</bdi> كان <b>Destruction</b> (نلاقي errors، عصر Myers).<br>من <bdi dir=\"ltr\">1983–1987</bdi> كان <b>Evaluation</b> (دخّل الـ verification والـ validation).<br>من <bdi dir=\"ltr\">1988–2000</bdi> كان <b>Prevention</b> (test design و planning بدري)."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Bugs: conditions, types, reasons, cost",
   "ar_h": "الـ Bugs: الـ conditions والأنواع والأسباب والتكلفة",
   "pts": [
    [
     "A <b>bug</b> is anything that affects quality. <b>5 conditions</b> (calculator): (1) does not do what the spec says (+ key fails); (2) does what the spec says it should not (crash/freeze); (3) does something the spec does not mention (extra \"square\"); (4) does not do something it should although unmentioned (weak battery → wrong answers); (5) hard to understand, cumbersome or slow (buttons too small): the <b>customer perspective</b>.",
     "الـ <b>bug</b> هو أي حاجة بتأثر على الـ quality. والـ <b>5 conditions</b> (مثال الـ calculator):<br>(1) مش بيعمل اللي الـ spec بتقوله (زرار الـ + مش شغال).<br>(2) بيعمل حاجة الـ spec بتقول مايعملهاش (crash أو freeze).<br>(3) بيعمل حاجة الـ spec ماذكرتهاش (function زيادة اسمها <bdi dir=\"ltr\">\"square\"</bdi>).<br>(4) مش بيعمل حاجة لازم يعملها حتى لو مش مذكورة (بطارية ضعيفة ← إجابات غلط).<br>(5) صعب يتفهم أو خطواته معقدة أو بطيء (زراير صغيرة)، ودي <b>وجهة نظر العميل</b>."
    ],
    [
     "<b>6 bug types</b>: <b>Conceptual</b> (wrong syntax, misspelled keywords), <b>Math</b> (divide-by-zero, overflow, rounding), <b>Logical</b> (infinite loops, wrong conditions), <b>Resource</b> (buffer overflow, access violations, uninitialized variables), <b>Co-programming</b> (deadlocks, race conditions), <b>Team working</b> (outdated documentation, mismatched files, incorrect linking).",
     "الـ <b>6 أنواع</b> هما:<br>الـ <b>Conceptual</b> (syntax غلط، keywords متهجية غلط).<br>الـ <b>Math</b> (القسمة على صفر، والـ overflow، والـ rounding).<br>الـ <b>Logical</b> (الـ infinite loops، والـ conditions الغلط).<br>الـ <b>Resource</b> (الـ buffer overflow، والـ access violations، والـ variables اللي مش initialized).<br>الـ <b>Co-programming</b> (الـ deadlocks والـ race conditions).<br>الـ <b>Team working</b> (documentation قديمة، وملفات مش متطابقة، و linking غلط)."
    ],
    [
     "<b>7 reasons</b>: human factor (logic/syntax mistakes), communication failure, unrealistic timeframe, poor design logic, poor coding practices (incl. faulty tools), lack of skilled testing, last-minute change requests.",
     "الـ <b>7 أسباب</b> هما الـ human factor (غلط في الـ logic أو الـ syntax)، والـ communication failure، والـ timeframe اللي مش واقعي، والـ poor design logic، والـ poor coding practices (ومنها الـ tools اللي فيها مشاكل)، ونقص الـ skilled testing، والـ change requests في آخر لحظة."
    ],
    [
     "<b>Cost by stage found</b>: Requirement <b>low</b> → Coding <b>moderate</b> → Integration <b>higher</b> → Testing <b>very costly</b> → Production <b>extremely costly</b>. Example: <b>Patriot missile, 1991</b>, a <b>timing bug</b>, 28 soldiers died.",
     "التكلفة على حسب إمتى لقينا الـ bug:<span class=\"ltr\">Requirement (low) → Coding (moderate) → Integration (higher) → Testing (very costly) → Production (extremely costly)</span>ومثال على كده الـ <b>Patriot missile</b> سنة <bdi dir=\"ltr\">1991</bdi>، كان <b>timing bug</b> ومات بسببه 28 عسكري."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Development models and their testing",
   "ar_h": "الـ Development models والـ testing فيها",
   "pts": [
    [
     "<b>Waterfall</b> (oldest, sequential): System Engineering (software <i>and</i> hardware requirements) → Analysis (feasibility) → Design (e.g. database design) → Coding → Testing → Maintenance. Drawback: early errors carry over and must be <b>fixed at multiple points</b>.",
     "الـ <b>Waterfall</b> أقدم واحد وهو sequential:<span class=\"ltr\">System Engineering → Analysis → Design → Coding → Testing → Maintenance</span>الـ System Engineering بيحدد الـ software والـ hardware requirements، والـ Analysis فيه الـ feasibility، والـ Design زي الـ database design. وعيبه إن الـ errors اللي بدري بتنتقل ولازم <b>تتصلح في أكتر من مكان</b>."
    ],
    [
     "<b>Spiral</b> (iterative): Planning → Risk analysis → Design engineering → Customer evaluation, repeated in cycles; usually <b>2 or 3 prototypes</b>. Manages risk early; drawback: time of iterations → <b>time-consuming and costly</b>.",
     "الـ <b>Spiral</b> بيمشي iterative:<span class=\"ltr\">Planning → Risk analysis → Design engineering → Customer evaluation</span>والـ phases دي بتتكرر في cycles، وعادةً فيه <b>2 أو 3 prototypes</b>. بيتعامل مع الـ risks بدري، وعيبه إن الـ iterations بتاخد وقت، فبيبقى <b>بياخد وقت ومكلف</b>."
    ],
    [
     "<b>V-model</b>: testing in every stage; left side goes down (high → low level), right side goes up (low → high). Pairs: Requirements specs → <b>Acceptance</b> test plan; Functional specs → <b>System</b> test plan; System design → <b>Integration</b> test plan; Unit design → <b>Test cases</b> (unit test); Code at the bottom. Acceptance testing is done by the <b>customer</b>.",
     "الـ <b>V-model</b> فيه testing في كل stage. الجنب الشمال نازل من الـ high level للـ low level، والجنب اليمين طالع من الـ low level للـ high level. الأزواج هي:<span class=\"ltr\">Requirements specs → Acceptance test plan</span><span class=\"ltr\">Functional specs → System test plan</span><span class=\"ltr\">System design → Integration test plan</span><span class=\"ltr\">Unit design → Test cases (unit test)</span>والـ Code في قاع الـ V، والـ Acceptance testing بيعمله <b>العميل</b>."
    ],
    [
     "<b>RAD</b>: linear sequential, <b>extremely short cycle</b>, <b>reusable components</b>; phases Requirements planning → Design (prototype) → Construction → Testing &amp; handover. Fails if a reusable component is missing; only small, simple projects.",
     "الـ <b>RAD</b> هو linear sequential بـ <b>cycle قصيرة جدًا</b> و<b>reusable components</b>:<span class=\"ltr\">Requirements planning → Design (prototype) → Construction → Testing &amp; handover</span>وبيفشل لو reusable component ناقص، ومناسب بس للمشاريع الصغيرة والبسيطة."
    ],
    [
     "<b>Agile</b>: incremental, most widely used, continuous collaboration; approaches <b>DSDM</b> (Dynamic Systems Development Method), <b>SCRUM</b>, <b>XP</b> (Extreme Programming, most popular, pair programming). <b>TDD</b> writes tests <b>before</b> code: Create test code → Write/modify functional code → Create additional tests → Test functional code (loop back) → Refactor.",
     "الـ <b>Agile</b> هو incremental وأكتر model مستخدم، وفيه تعاون مستمر. الـ approaches بتاعته هي الـ <b>DSDM</b> (Dynamic Systems Development Method) والـ <b>SCRUM</b> والـ <b>XP</b> (Extreme Programming، الأشهر، والـ programmers بيشتغلوا pairs). والـ <b>TDD</b> بيكتب الـ tests <b>قبل</b> الـ code:<span class=\"ltr\">Create test code → Write/modify functional code → Create additional tests → Test functional code → Refactor</span>وفيه loop من الـ Test functional code راجع للـ Write."
    ],
    [
     "Summary: Waterfall is sequential; <b>V and Spiral</b> use testing as an integral part, so they are more efficient than waterfall; <b>Agile</b> is the most advanced and efficient.",
     "الخلاصة إن الـ Waterfall sequential، والـ <b>V والـ Spiral</b> بيستخدموا الـ testing كجزء أساسي فأكفأ من الـ waterfall، والـ <b>Agile</b> هو الأكثر تطورًا وكفاءة."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the questions ask (chapter summary MCQs on the site)",
   "ar_h": "الأسئلة بتسأل في إيه (أسئلة الـ Summary MCQ اللي على الموقع)",
   "pts": [
    [
     "No past-exam question on this lecture is on the site yet; the summary MCQs ask: <i>period → orientation</i> (\"Demonstration-oriented was followed during…\" → 1957–1978), True/False on a period (\"1988–2000 prevention-oriented\" → True).",
     "لسه مفيش سؤال امتحان قديم على المحاضرة دي في الموقع؛ وأسئلة الـ summary بتسأل عن الفترة والـ orientation بتاعتها (الـ Demonstration-oriented كان إمتى؟ والإجابة <bdi dir=\"ltr\">1957–1978</bdi>)، وصح وغلط على فترة (الـ <bdi dir=\"ltr\">1988–2000</bdi> كانت prevention-oriented، والإجابة صح)."
    ],
    [
     "<i>Reason for bugs from a description</i> (logic or syntax mistakes → Human factor) and <i>V-model stage → test plan</i> (acceptance test plan → Requirements specifications).",
     "وبتسأل كمان عن سبب الـ bug من وصفه (غلط في الـ logic أو الـ syntax يبقى الـ Human factor)، وعن الـ stage في الـ V-model والـ test plan بتاعها (الـ acceptance test plan بيتعمل في الـ Requirements specifications)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Terms, black-box, static vs dynamic, pass vs fail",
   "ar_h": "المصطلحات والـ black-box والـ static والـ dynamic والـ pass والـ fail",
   "pts": [
    [
     "<b>Verification</b>: \"Are we building the product <i>right</i>?\" (meets its specification; code reviews, design checks). <b>Validation</b>: \"Are we building the <i>right</i> product?\" (meets the user's requirement; user acceptance testing).",
     "الـ <b>Verification</b> بيسأل «إحنا بنبني المنتج <i>صح</i>؟» يعني مطابق للـ specification (زي الـ code reviews والـ design checks). والـ <b>Validation</b> بيسأل «إحنا بنبني المنتج <i>الصح</i>؟» يعني مطابق لاحتياج الـ user (زي الـ user acceptance testing)."
    ],
    [
     "<b>QA</b>: process-focused, preventive (audits, checklists). <b>QC</b>: product-focused, corrective (unit and system testing). <b>Test plan</b> = objectives and scope; <b>test case</b> = input, conditions, expected output. Unit = smallest component; Integration = interfaces between modules; System = complete system; Acceptance = by user/customer.",
     "الـ <b>QA</b> مركز على الـ process وهو preventive (زي الـ audits والـ checklists)، والـ <b>QC</b> مركز على الـ product وهو corrective (زي الـ unit والـ system testing). والـ <b>Test plan</b> فيه الـ objectives والـ scope، والـ <b>test case</b> فيها الـ input والـ conditions والـ expected output. والـ Unit هو أصغر component، والـ Integration بيختبر الـ interfaces بين الـ modules، والـ System بيختبر الـ system كله، والـ Acceptance بيعمله الـ user أو العميل."
    ],
    [
     "<b>Black-box</b> (behavioral) testing: functionality from inputs and expected outputs <b>without knowing internal logic</b> (ATM via the GUI). Advantages: no code knowledge, quick cases, <b>exposes ambiguities in specs</b>, GUI view. Disadvantages: cannot test all inputs, hard if requirements unclear, bugs in complex areas missed.",
     "الـ <b>Black-box</b> (behavioral) testing بيختبر الـ functionality من الـ inputs والـ expected outputs <b>من غير ما نعرف الـ internal logic</b> (زي الـ ATM من الـ GUI). مميزاته إنك مش محتاج تفهم الـ code، والـ cases بتتعمل بسرعة، و<b>بيكشف الغموض في الـ specs</b>، ومناسب للـ GUI. وعيوبه إنه مايقدرش يختبر كل الـ inputs، وصعب لو الـ requirements مش واضحة، والـ bugs في الأجزاء المعقدة ممكن تفوت."
    ],
    [
     "<b>Static</b> = testing something <b>not running</b> (static black-box reviews the <b>specification</b>, e.g. user manual). <b>Dynamic</b> = running the software with data (dynamic black-box = <b>exploratory</b>/behavioral). Start with <b>test-to-pass</b> (normal cases, \"kindness dealing\", boundaries, sub-boundaries, default data), <b>then test-to-fail</b> (abnormal cases, force errors). Error-message test (save, no disk) is <b>probably both</b>.",
     "الـ <b>Static</b> معناه إنك تختبر حاجة <b>مش شغالة</b> (والـ static black-box بيراجع الـ <b>specification</b> زي الـ user manual). والـ <b>Dynamic</b> معناه إنك تشغّل الـ software بـ data (والـ dynamic black-box اسمه كمان <b>exploratory</b> أو behavioral). ابدأ بالـ <b>test-to-pass</b> (حالات عادية، «kindness dealing»، والـ boundaries والـ sub-boundaries والـ default data)، <b>وبعدين الـ test-to-fail</b> (حالات مش طبيعية بتجبره على error). واختبار الـ error message (save من غير disk) <b>غالبًا الاتنين</b>."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Equivalence partitioning and boundaries (method)",
   "ar_h": "الـ Equivalence partitioning والـ boundaries (الطريقة)",
   "pts": [
    [
     "<b>Equivalence class (partition)</b>: a set of test cases that tests the same thing or reveals the same bug, so <b>one case per class</b> is enough. EP <b>reduces the number of test cases without lowering quality</b>. Classes are <b>valid</b> and <b>invalid</b>.",
     "الـ <b>Equivalence class (partition)</b> هي مجموعة test cases بتختبر نفس الحاجة أو بتكشف نفس الـ bug، فكفاية <b>case واحدة من كل class</b>. والـ EP <b>بيقلل عدد الـ test cases من غير ما يقلل الـ quality</b>، والـ classes نوعين <b>valid</b> و<b>invalid</b>."
    ],
    [
     "Method for a range: one valid class + invalid below + invalid above (driving license 18 to 60 → <b>3 classes</b>). For a count 4 to 10 inputs, test <b>3</b> (invalid), <b>4, 7, 10</b> (valid), <b>11</b> (invalid).",
     "الطريقة مع أي range إن فيه class واحدة valid وواحدة invalid تحت وواحدة invalid فوق (رخصة السواقة من 18 لـ 60 تبقى <b>3 classes</b>). ولو العدد من 4 لـ 10 inputs، بنختبر الـ 3 (invalid)، والـ <bdi dir=\"ltr\">4,&nbsp;7,&nbsp;10</bdi> (valid)، والـ 11 (invalid)."
    ],
    [
     "Worked example 10,000 to 99,999 → <b>6 test cases</b>: 00000 (invalid special value), 09999 (invalid left boundary), 10000 (valid left boundary), 50000 (valid mid), 99999 (valid right boundary), 100000 (invalid right boundary).",
     "مثال محلول من <bdi dir=\"ltr\">10,000–99,999</bdi> بيطلّع <b>6 test cases</b>:<span class=\"ltr\">00000 (invalid special), 09999 (invalid left boundary), 10000 (valid left boundary), 50000 (valid mid), 99999 (valid right boundary), 100000 (invalid right boundary)</span>"
    ],
    [
     "<b>Boundary conditions</b>: situations at the <b>edge of the planned operational limits</b> (edge of a cliff); <b>bugs increase at boundaries</b>. Test valid edges and one past them: text field 1 to 255 → 1, 255 (254) valid, <b>0 and 256</b> invalid; pages per sheet → 1, max, 0, max+1. Software = <b>data</b> + <b>program</b>; data partitions use boundary, sub-boundary, nulls and bad data.",
     "الـ <b>Boundary conditions</b> هي المواقف اللي على <b>حافة الحدود التشغيلية المخططة</b> (زي حافة الجرف)، و<b>الـ bugs بتزيد عند الـ boundaries</b>. اختبر الأطراف الـ valid واللي بعدها بواحد. الـ text field من <bdi dir=\"ltr\">1–255</bdi> يبقى الـ valid هو 1 و 255 (و 254)، والـ invalid هو <b>0 و 256</b>. وفي عدد الصفحات في الورقة بنختبر 1 والـ max و 0 و <bdi dir=\"ltr\">max+1</bdi>. والـ software هو <b>data</b> و<b>program</b>، والـ partitions بتاعة الـ data مبنية على الـ boundary والـ sub-boundary والـ nulls والـ bad data."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "State testing and the media player",
   "ar_h": "الـ State testing ومثال الـ media player",
   "pts": [
    [
     "<b>Software state</b>: the condition or mode the software is in (Paint pencil vs airbrush). A <b>state transition map</b> shows each unique state, the input/condition that moves between states, and conditions/output on entry or exit; draw it from the <b>user's view</b>. Check all <b>state variables</b> (Paint startup: pencil selected, black on white, \"untitled\").",
     "الـ <b>Software state</b> هي الحالة أو الـ mode اللي الـ software فيه (الـ pencil مقابل الـ airbrush في Paint). والـ <b>state transition map</b> بتوضح كل state، والـ input اللي بينقل بين الـ states، والـ conditions والـ output عند الدخول أو الخروج، وبنرسمها <b>من وجهة نظر الـ user</b>. واتأكد من كل الـ <b>state variables</b> (الـ startup بتاع Paint فيه الـ pencil متختار، وأسود على أبيض، والاسم <bdi dir=\"ltr\">\"untitled\"</bdi>)."
    ],
    [
     "<b>5 ways to reduce</b>: visit each state at least once; most common transitions; least common paths; all error states and returning from them; random transitions.",
     "الـ <b>5 طرق</b> عشان نقلل هما إننا نزور كل state مرة على الأقل، ونختبر الـ transitions الأكتر شيوعًا، والـ paths الأقل شيوعًا، وكل الـ error states والرجوع منها، و transitions عشوائية."
    ],
    [
     "Media player (8 transitions): OFF→play→PLAY, OFF→ff→FAST FORWARD, PLAY→stop→OFF, PLAY→ff→FAST PLAY, FAST FORWARD→stop→OFF, FAST FORWARD→play→PLAY, <b>FAST PLAY→stop→PLAY</b>, FAST PLAY→ff→FAST FORWARD. All states: <b>1</b> test case; all 8 transitions: <b>2</b> test cases.",
     "الـ media player فيه 8 transitions:<span class=\"ltr\">OFF -play→ PLAY, OFF -ff→ FAST FORWARD, PLAY -stop→ OFF, PLAY -ff→ FAST PLAY</span><span class=\"ltr\">FAST FORWARD -stop→ OFF, FAST FORWARD -play→ PLAY, FAST PLAY -stop→ PLAY, FAST PLAY -ff→ FAST FORWARD</span>خد بالك إن الـ stop من FAST PLAY بيرجع لـ <b>PLAY</b> مش OFF. كل الـ states محتاجة <b>1</b> test case، وكل الـ 8 transitions محتاجين <b>2</b> test cases."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "Exam 2025/26: \"The process that confirms software meets its <b>specification</b> is ………\" → Verification; \"… meets the <b>user's requirement</b>\" → Validation; \"testing the <b>running</b> software\" → Dynamic testing.",
     "في امتحان <bdi dir=\"ltr\">2025/26</bdi> سأل إن الـ process اللي بتتأكد إن الـ software مطابق للـ <b>specification</b> هي الـ Verification، واللي مطابق لاحتياج الـ <b>user</b> هي الـ Validation، واختبار الـ software وهو <b>شغال</b> هو الـ Dynamic testing."
    ],
    [
     "Exam 2025/26 boundary: \"accept an integer &gt; 9000, determine the test case\" with options 9000, 9001, 9999 → <b>All answers</b> (boundary, just inside, and a valid value). Summary MCQs: Day boundary tests in DD/MM/YYYY → all the above (28, 29, 30, 31); which technique pushes limits → test-to-fail; exposes ambiguities in specs → black box.",
     "وفي نفس الامتحان سأل عن الـ boundary: البرنامج بيقبل integer أكبر من 9000، حدد الـ test case، والاختيارات 9000 و 9001 و 9999، والإجابة <b>All answers</b> (الـ boundary نفسه، واللي جوه بواحد، وقيمة valid). وأسئلة الـ summary سألت عن الـ boundary tests لليوم في <bdi dir=\"ltr\">DD/MM/YYYY</bdi> (الإجابة كلهم، يعني 28 و 29 و 30 و 31)، وعن الـ technique اللي بتضغط على الحدود (الـ test-to-fail)، واللي بتكشف الغموض في الـ specs (الـ black box)."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "White-box testing and static white-box (formal review)",
   "ar_h": "الـ White-box testing والـ static white-box (الـ formal review)",
   "pts": [
    [
     "<b>White-box testing</b> is also called <b>glass box</b>, <b>structural</b>, <b>open box</b> or <b>clear box</b> testing, because it examines internal workings. It tests: independent paths in a unit/module, <b>logical correctness</b> (true and false conditions), <b>loops at their boundaries</b> (operational boundary correctness) and <b>internal data structures</b>.",
     "الـ <b>White-box testing</b> اسمه كمان <b>glass box</b> أو <b>structural</b> أو <b>open box</b> أو <b>clear box</b> testing، عشان بيبص على الشغل الداخلي. بيختبر الـ independent paths جوه الـ unit أو الـ module، والـ <b>logical correctness</b> (الـ conditions وهي true ووهي false)، والـ <b>loops عند الـ boundaries</b> بتاعتها (الـ operational boundary correctness)، والـ <b>internal data structures</b>."
    ],
    [
     "<b>Static white-box</b> = examining the design and code, 3 parts: <b>Formal Review</b>, <b>Coding Standards and Guidelines</b>, <b>Code Review Checklist</b>. Formal review has 3 types: <b>peer review</b>, <b>walkthrough</b>, <b>inspection</b>.",
     "الـ <b>Static white-box</b> معناه فحص الـ design والـ code، وليه 3 أجزاء: الـ <b>Formal Review</b>، والـ <b>Coding Standards and Guidelines</b>، والـ <b>Code Review Checklist</b>. والـ Formal review ليه 3 أنواع: الـ <b>peer review</b> والـ <b>walkthrough</b> والـ <b>inspection</b>."
    ],
    [
     "<b>Formal review</b>: formal meetings between programmers and testers to inspect design and code. <b>4 essential elements</b>: (1) <b>Identify problems</b>, (2) <b>Follow rules</b> (e.g. lines of code reviewed per day, time spent), (3) <b>Prepare</b> (every participant prepares and contributes), (4) <b>Write a report</b> available to the development team.",
     "الـ <b>Formal review</b> هو اجتماعات رسمية بين الـ programmers والـ testers عشان يفحصوا الـ design والـ code. ليه <b>4 عناصر أساسية</b>: (1) الـ <b>Identify problems</b>، و(2) الـ <b>Follow rules</b> (زي عدد سطور الـ code اللي بتتراجع في اليوم والوقت المستهلك)، و(3) الـ <b>Prepare</b> (كل مشارك بيحضّر ويساهم)، و(4) الـ <b>Write a report</b> يبقى متاح للـ development team."
    ],
    [
     "<b>Peer review</b>: a programmer who helped design the architecture/code, with other programmers or testers as reviewers.<br><b>Walkthrough</b>: the programmer who <b>wrote</b> the code presents it line by line (or function by function) to a group of <b>5 or 6</b> programmers and testers and explains it.<br><b>Inspection</b>: the presenter is <b>not the real programmer</b>; inspectors review from the <b>user's and tester's perspective</b>.",
     "الـ <b>Peer review</b> فيه programmer شارك في تصميم الـ architecture أو الـ code، ومعاه programmers أو testers تانيين بيعملوا review.<br>الـ <b>Walkthrough</b>: الـ programmer اللي <b>كتب</b> الـ code بيعرضه سطر سطر (أو function بـ function) على مجموعة من <b>5 أو 6</b> programmers و testers ويشرحه.<br>الـ <b>Inspection</b>: اللي بيعرض <b>مش هو الـ programmer الحقيقي</b>، والـ inspectors بيراجعوا من <b>وجهة نظر الـ user والـ tester</b>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Standards, guidelines and the code review checklist",
   "ar_h": "الـ Standards والـ guidelines والـ code review checklist",
   "pts": [
    [
     "<b>Standards</b> = rules that <b>must be adhered to</b> (mandatory). <b>Guidelines</b> = instructions that help follow the standards, <b>not really mandatory</b>. <b>3 reasons</b> to follow them: <b>Reliability</b> (more reliable and secure), <b>Readability / Maintainability</b>, <b>Portability</b> (runs on different hardware and compilers).",
     "الـ <b>Standards</b> هي rules <b>لازم نلتزم بيها</b> (mandatory). والـ <b>Guidelines</b> هي تعليمات بتساعدنا نمشي على الـ standards، و<b>مش mandatory أوي</b>. فيه <b>3 أسباب</b> نمشي عليهم: الـ <b>Reliability</b> (أكتر reliable و secure)، والـ <b><bdi dir=\"ltr\">Readability / Maintainability</bdi></b>، والـ <b>Portability</b> (يشتغل على hardware و compilers مختلفة)."
    ],
    [
     "Checklist classes 1 and 2: <b>Data reference</b> = un-initialized variables referenced, subscripts outside the array bounds, <b>off-by-one</b> indexing, a variable used where a constant is better (array boundary).<br><b>Data declaration</b> = wrong length/type/storage class, initialization at declaration and consistent with type, <b>variables with similar names</b>, declared but never used or used once (should be a constant).",
     "أول نوعين في الـ checklist: الـ <b>Data reference</b> زي variable مش متعمله initialize واتعمله reference، أو subscript برة حدود الـ array، أو <b>off-by-one</b> في الـ indexing، أو variable مستخدم مكان constant كان أحسن (حدود الـ array).<br>والـ <b>Data declaration</b> زي الـ length أو الـ type أو الـ storage class الغلط، والـ initialization وقت الـ declaration ومتوافق مع الـ type، و<b>variables أساميها شبه بعض</b>، و variable متعرّف ومش مستخدم أو مستخدم مرة واحدة (المفروض يبقى constant)."
    ],
    [
     "<b>Computation</b> = mixed data types (int + float), same type different size (<b>long + short</b>), <b>overflow</b> mid-calculation, <b>divisor can be zero</b>.<br><b>Comparison</b> = boundary conditions, e.g. <code>&lt;</code> instead of <code>&lt;=</code>, wrong operands of a Boolean operator (an integer used in a Boolean calculation).<br><b>Control flow</b> = improper behaviour of loops and control structures.<br><b>Input/output</b> = reading files, keyboard/mouse input, writing to a file or screen.",
     "الـ <b>Computation</b> زي data types مختلفة (int مع float)، أو نفس الـ type بحجم مختلف (<b>long مع short</b>)، أو <b>overflow</b> في نص الحساب، أو <b>divisor ممكن يبقى صفر</b>.<br>والـ <b>Comparison</b> بيبقى عند الـ boundary conditions، زي استخدام <bdi dir=\"ltr\">&lt;</bdi> بدل <bdi dir=\"ltr\">&lt;=</bdi>، أو operands غلط للـ Boolean operator (integer مستخدم في Boolean calculation).<br>والـ <b>Control flow</b> سببه سلوك غلط للـ loops والـ control structures.<br>والـ <b><bdi dir=\"ltr\">Input/output</bdi></b> زي القراية من file، أو input من الكيبورد والماوس، أو الكتابة على file أو الشاشة."
    ],
    [
     "<b>Trap</b>: the comparison-errors slide says \"In the C language, zero is considered as true and non-zero as false\". Real C is the opposite, but if the exam repeats the slide sentence, answer <b>the C language</b>.",
     "خلي بالك من <b>فخ</b>: الـ slide بتاعة الـ comparison errors بتقول إن في لغة C الصفر true وغير الصفر false. الحقيقة في C العكس، بس لو الامتحان كرر جملة الـ slide اختار <b>لغة C</b>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Dynamic white-box: data coverage and code coverage",
   "ar_h": "الـ Dynamic white-box والـ data coverage والـ code coverage",
   "pts": [
    [
     "<b>Dynamic white-box testing</b> = a <b>validation check</b>: running test cases with input values to make sure the application works by the spec. Testing <b>finds</b> bugs, <b>debugging fixes</b> them. <b>Testing the pieces</b> = unit and integration testing; integration strategies: <b>bottom-up</b>, <b>top-down</b>, <b>umbrella approach</b>.",
     "الـ <b>Dynamic white-box testing</b> هو <b>validation check</b>، يعني بنشغّل test cases بقيم input عشان نتأكد إن الـ application شغال حسب الـ spec. الـ testing <b>بيلاقي</b> الـ bugs، والـ <b>debugging بيصلّحها</b>. والـ <b>Testing the pieces</b> معناه الـ unit والـ integration testing، واستراتيجيات الـ integration هي الـ <b>bottom-up</b> والـ <b>top-down</b> والـ <b>umbrella approach</b>."
    ],
    [
     "<b>Data coverage</b> types: <b>data flow</b>, <b>sub-boundaries</b>, <b>error forcing</b> (code divided into data and states, like black-box). <b>Code coverage</b> types: <b>statement</b>, <b>path (branch)</b>, <b>condition</b>.",
     "أنواع الـ <b>Data coverage</b> هي الـ <b>data flow</b> والـ <b>sub-boundaries</b> والـ <b>error forcing</b> (الـ code بيتقسم لـ data و states زي الـ black-box). وأنواع الـ <b>Code coverage</b> هي الـ <b>statement</b> والـ <b>path (branch)</b> والـ <b>condition</b>."
    ],
    [
     "<b>Statement coverage</b>: every statement runs at least once (4 sequential PRINTs → 1 test).<br><b>Path (branch) coverage</b>: both branches of every IF. Christmas example: Date = 25-12-2008 runs <code>1,2,3,4,5,6,7</code>; any other date runs <code>1,2,5,6,7</code> → <b>2 tests</b>.",
     "الـ <b>Statement coverage</b> معناه كل statement تتنفذ مرة على الأقل (4 سطور PRINT ورا بعض يكفيهم test واحد).<br>والـ <b>Path (branch) coverage</b> معناه الـ branch-ين بتوع كل IF. في مثال الكريسماس لو التاريخ <bdi dir=\"ltr\">25-12-2008</bdi> بيشغّل:<span class=\"ltr\">1,2,3,4,5,6,7</span>وأي تاريخ تاني بيشغّل:<span class=\"ltr\">1,2,5,6,7</span>يعني <b>2 tests</b>."
    ],
    [
     "<b>Condition coverage</b> (<code>Date$ = \"25-12-2008\" AND Time$ = \"00:00:00\"</code>): test <b>every combination</b> of the sub-conditions (2 × 2) → <b>4 test cases</b>; only (25-12-2008, 00:00:00) runs line 3, the other 3 run <code>1,2,5,6,7</code>.",
     "الـ <b>Condition coverage</b> للشرط ده:<span class=\"ltr\">Date$ = \"25-12-2008\" AND Time$ = \"00:00:00\"</span>بنجرب <b>كل التوافيق</b> بتاعة الـ sub-conditions، يعني<span class=\"ltr\">2 × 2 = 4 test cases</span>وبس الحالة <bdi dir=\"ltr\">(25-12-2008, 00:00:00)</bdi> هي اللي بتشغّل سطر 3، والـ 3 التانيين بيشغّلوا <bdi dir=\"ltr\">1,2,5,6,7</bdi>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctor asks (Lecture 3)",
   "ar_h": "الدكتور بيسأل إيه (Lecture 3)",
   "pts": [
    [
     "<b>Which stage / which phase</b>: \"inspections come under?\" → <b>Formal review</b>; \"Formal review, coding standards and guidelines, and code review are phases of:\" → <b>Static white box</b>.",
     "أسئلة <b>المرحلة</b>: الـ inspections تبع إيه؟ الإجابة <b>Formal review</b>. والـ Formal review والـ coding standards and guidelines والـ code review مراحل في إيه؟ الإجابة <b>Static white box</b>."
    ],
    [
     "<b>Standards vs guidelines</b>: \"mandatory\" → <b>Standards</b>; \"not really mandatory\" → <b>Guidelines</b>; \"appropriate to standards and guidelines\" → <b>Reliability</b> (not scalability, usability, compatibility).",
     "أسئلة <b>الـ Standards والـ guidelines</b>: اللي mandatory هي الـ <b>Standards</b>، واللي مش mandatory أوي هي الـ <b>Guidelines</b>، واللي يناسب الـ standards and guidelines هو الـ <b>Reliability</b> (مش الـ scalability ولا الـ usability ولا الـ compatibility)."
    ],
    [
     "<b>Statement-coverage test case</b>: given <code>if (X&gt;1) and (Y=0) then A=A/X;</code>, choose the input that runs the THEN statement (<b>X=2, y=0</b>). With <code>or</code>, several inputs work → <b>All answers</b>. With two IFs, the input must make <b>both</b> true (X=2, Y=0, A=4).",
     "سؤال <b>الـ Statement-coverage test case</b>: يديك شرط زي ده:<span class=\"ltr\">if (X&gt;1) and (Y=0) then A=A/X;</span>وتختار الـ input اللي بيشغّل الـ THEN، والإجابة <bdi dir=\"ltr\">X=2, y=0</bdi>. ولو الشرط فيه <code>or</code> ممكن أكتر من input يشتغل، فالإجابة <b>All answers</b>. ولو فيه IF-ين لازم الـ input يخلي <b>الاتنين</b> true، زي <bdi dir=\"ltr\">X=2, Y=0, A=4</bdi>."
    ],
    [
     "Also on the site, from <b>student summaries</b> (not the doctor): fixing bugs → <b>Debugging</b>; long + short integers → <b>Computation errors</b>; umbrella approach → <b>Integration testing</b>; validation check with code knowledge → <b>Dynamic white box</b>; \"zero is true\" → <b>C</b>.",
     "وفيه كمان أسئلة من <b>ملخصات الطلبة</b> (مش من الدكتور): تصليح الـ bugs اسمه <b>Debugging</b>، وجمع long على short يعمل <b>Computation errors</b>، والـ umbrella approach نوع من الـ <b>Integration testing</b>، والـ validation check بمعرفة الـ code هو <b>Dynamic white box</b>، وجملة إن الصفر true منسوبة لـ <b>لغة C</b>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "V-model and cyclomatic complexity",
   "ar_h": "الـ V-model والـ cyclomatic complexity",
   "pts": [
    [
     "<b>V-model</b>: the left side going <b>down</b> (requirements spec → functional spec → system design → unit design → code) is <b>verification</b>; the right side going <b>up</b> (unit → integration → system → acceptance test) is <b>validation</b>. Dotted links: requirements ↔ <b>Acceptance Test Plan</b>, functional spec ↔ <b>System Test Plan</b>, system design ↔ <b>Integration Test Plan</b>, \"Test Cases\" between unit design and unit test.",
     "في الـ <b>V-model</b> الجنب الشمال وهو <b>نازل</b> هو الـ <b>verification</b>:<span class=\"ltr\">requirements spec → functional spec → system design → unit design → code</span>والجنب اليمين وهو <b>طالع</b> هو الـ <b>validation</b>:<span class=\"ltr\">unit → integration → system → acceptance test</span>والأسهم الـ dotted بتربط الـ requirements بالـ <b>Acceptance Test Plan</b>، والـ functional spec بالـ <b>System Test Plan</b>، والـ system design بالـ <b>Integration Test Plan</b>، وكلمة Test Cases بين الـ unit design والـ unit test."
    ],
    [
     "<b>Cyclomatic complexity</b> V(G) = the <b>number of independent (basis) paths</b>. 3 ways to compute it:<br><code>V(G) = E − N + 2P</code> (P = connected components, usually 1)<br><code>V(G) = predicate nodes + 1</code><br><code>V(G) = number of regions</code> (inner + outer).",
     "الـ <b>Cyclomatic complexity</b> هو <b>عدد الـ independent (basis) paths</b>، وبيتحسب بـ 3 طرق:<span class=\"ltr\">V(G) = E − N + 2P</span>والـ P هنا عدد الـ connected components (غالباً 1).<span class=\"ltr\">V(G) = predicate nodes + 1</span><span class=\"ltr\">V(G) = number of regions (inner + outer)</span>"
    ],
    [
     "Worked example <code>foo()</code>: nodes 1 to 6, edges 1-2, 1-3, 2-3, 3-4, 3-5, 4-6, 5-6 → <code>V(G) = 7 − 6 + 2(1) = 3</code>; predicates are nodes 1 and 3 → 2 + 1 = 3; regions 2 inner + 1 outer = 3.",
     "مثال <code>foo()</code>: الـ nodes من 1 لـ 6، والـ edges هي:<span class=\"ltr\">1-2, 1-3, 2-3, 3-4, 3-5, 4-6, 5-6</span>فبيبقى:<span class=\"ltr\">V(G) = 7 − 6 + 2(1) = 3</span>والـ predicate nodes هما 1 و 3:<span class=\"ltr\">2 + 1 = 3</span>والـ regions اتنين جوه وواحد برة:<span class=\"ltr\">2 + 1 = 3</span>"
    ],
    [
     "Basis paths of <code>foo()</code> with one test case each: <code>1,2,3,4,6</code> (a=2, b=0, x=0), <code>1,3,4,6</code> (a=2, b=1, x=0), <code>1,3,5,6</code> (a=0, b=0, x=0). <b>Trap</b>: V(G) = 3 basis-path tests, but branch coverage of foo() needs only 2 tests.",
     "الـ basis paths بتوع <code>foo()</code> وكل واحد ليه test case:<span class=\"ltr\">1,2,3,4,6 → a=2, b=0, x=0</span><span class=\"ltr\">1,3,4,6 → a=2, b=1, x=0</span><span class=\"ltr\">1,3,5,6 → a=0, b=0, x=0</span>خلي بالك من <b>فخ</b>: الـ <bdi dir=\"ltr\">V(G)</bdi> بيدي 3 tests للـ basis paths، بس الـ branch coverage لـ <code>foo()</code> محتاج 2 tests بس."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Triangle problem and functional tests",
   "ar_h": "الـ Triangle problem والـ functional tests",
   "pts": [
    [
     "Triangle domain: 3 subdomains <b>scalene</b> (no sides equal), <b>isosceles</b> (two equal), <b>equilateral</b> (all equal), plus 2 error subdomains <b>bad inputs</b> and <b>not a triangle</b>. Every test case states its expected output, e.g. (3,4,5) scalene, (5,5,8) isosceles, (5,5,5) equilateral, (6,4,2) not a triangle, (0,0,0) bad inputs.",
     "الـ domain بتاع الـ triangle بيتقسم لـ 3 subdomains: الـ <b>scalene</b> (مفيش أضلاع متساوية)، والـ <b>isosceles</b> (ضلعين متساويين)، والـ <b>equilateral</b> (كلهم متساويين)، وزيادة عليهم 2 error subdomains هما الـ <b>bad inputs</b> والـ <b>not a triangle</b>. وكل test case بتقول الـ expected output، زي:<span class=\"ltr\">(3,4,5) scalene, (5,5,8) isosceles, (5,5,5) equilateral, (6,4,2) not a triangle, (0,0,0) bad inputs</span>"
    ],
    [
     "Tracing the pseudocode: the IFs run in order and the <b>last true IF wins</b>. (0,1,0): isosceles (a==c) → not a triangle (1 ≥ 0+0) → <b>bad inputs</b> (a ≤ 0). <b>Slide error</b>: (1,2,4) and (3,2,5) are listed as bad inputs but the code prints <b>not a triangle</b>.",
     "وإحنا بنتتبع الـ pseudocode، الـ IFs بتتنفذ بالترتيب و<b>آخر IF يطلع true هو اللي بيكسب</b>. مثلاً:<span class=\"ltr\">(0,1,0): isosceles (a==c) → not a triangle (1 ≥ 0+0) → bad inputs (a ≤ 0)</span>وفيه <b>غلطة في الـ slide</b>: الحالتين <bdi dir=\"ltr\">(1,2,4)</bdi> و <bdi dir=\"ltr\">(3,2,5)</bdi> مكتوبين bad inputs، بس الـ code بيطلّع <b>not a triangle</b>."
    ],
    [
     "Minimal sets (using the slide table's tests 3,4,5 / 3,5,3 / 0,1,0 / 4,4,4): <b>statement coverage = 2</b> → (4,4,4) + (0,1,0); <b>branch coverage = 3</b> → add (3,4,5), the only one making the first IF false. With any input: (0,0,0) alone gives statement coverage; (0,0,0) + (3,4,5) give branch coverage.",
     "أقل set (من tests جدول الـ slide):<span class=\"ltr\">3,4,5 / 3,5,3 / 0,1,0 / 4,4,4</span>الـ <b>statement coverage محتاج 2</b>، وهما <bdi dir=\"ltr\">(4,4,4)</bdi> و <bdi dir=\"ltr\">(0,1,0)</bdi>. والـ <b>branch coverage محتاج 3</b>، بنزود <bdi dir=\"ltr\">(3,4,5)</bdi> عشان هي الوحيدة اللي بتخلي أول IF يبقى false. ولو أي input مسموح، فالـ <bdi dir=\"ltr\">(0,0,0)</bdi> لوحدها بتعمل statement coverage، ومعاها <bdi dir=\"ltr\">(3,4,5)</bdi> بيعملوا branch coverage."
    ],
    [
     "Area of a triangle from 3 points (functional tests): (1,1),(1,5),(5,1) → <b>8</b>; (1,1),(1,5),(1,10) → <b>not a triangle</b> (collinear, x = 1); (10,10),(0,10),(10,0) → <b>50</b>; (0,0),(0,10),(10,10) → <b>50</b>.",
     "مثال مساحة triangle من 3 نقط (functional tests):<span class=\"ltr\">(1,1),(1,5),(5,1) → 8</span><span class=\"ltr\">(1,1),(1,5),(1,10) → not a triangle (collinear, x = 1)</span><span class=\"ltr\">(10,10),(0,10),(10,0) → 50</span><span class=\"ltr\">(0,0),(0,10),(10,10) → 50</span>"
    ]
   ]
  },
  {
   "lec": 4,
   "h": "OOP testing: MM and function pair",
   "ar_h": "الـ OOP testing والـ MM والـ function pair",
   "pts": [
    [
     "OO testing brings <b>some new challenges</b>, but <b>many conventional techniques are still appropriate</b>. <b>Functional</b> testing of OO is <b>no different</b> (tests from the requirements document); <b>structural</b> testing is very different. Statement and branch coverage can be applied but <b>do not seem appropriate</b>: the <b>interactions between methods</b> must be tested.",
     "الـ OO testing جايب <b>تحديات جديدة</b>، بس <b>تقنيات كتير conventional لسه مناسبة</b>. الـ <b>Functional</b> testing للـ OO <b>مش مختلف</b> (الـ tests من الـ requirements document)، أما الـ <b>structural</b> testing فمختلف جداً. والـ statement والـ branch coverage ينفع يتطبقوا بس <b>مش شكلهم مناسبين</b>، لأن لازم نختبر <b>الـ interactions بين الـ methods</b>."
    ],
    [
     "<b>MM (Method-Message) testing</b>: every method call tested <b>at least once</b> (a repeated call is tested only once). Most basic criterion; <b>does NOT subsume statement coverage</b>. Stack: <b>create, push and pop</b> may achieve MM.",
     "الـ <b>MM (Method-Message) testing</b>: كل method call تتختبر <b>مرة على الأقل</b> (ولو الـ call متكررة بتتختبر مرة واحدة بس). ده أبسط criterion، و<b>مش بيـ subsume الـ statement coverage</b>. وفي الـ stack، سلسلة <b>create و push و pop</b> ممكن تحقق الـ MM."
    ],
    [
     "<b>Function Pair (FP) testing</b>: all sequences of method executions of <b>length two</b>, usually from a <b>state machine diagram</b>. Stack states <b>Empty, Normal, Full</b>; push on Full and pop on Empty → <b>error</b>. The lecture lists <b>14 pairs</b>; error pairs: new-pop, push(normal→full)-push, pop(into empty)-pop. Advantage: catches interaction and state-dependent faults that MM misses.",
     "الـ <b>Function Pair (FP) testing</b>: كل تسلسلات تنفيذ الـ methods اللي <b>طولها 2</b>، وغالباً من <b>state machine diagram</b>. الـ stack ليه states هي <b>Empty و Normal و Full</b>، والـ push على Full والـ pop على Empty بيدوا <b>error</b>. المحاضرة فيها <b>14 pair</b>، والـ pairs اللي بتدي error هي:<span class=\"ltr\">new-pop, push(normal→full)-push, pop(into empty)-pop</span>وميزته إنه بيمسك الـ interaction faults والـ bugs اللي بتعتمد على الـ state واللي الـ MM بيفوّتها."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctor asks (Lecture 4)",
   "ar_h": "الدكتور بيسأل إيه (Lecture 4)",
   "pts": [
    [
     "\"A simple sequence that achieves method-message coverage in stack testing is:\" → <b>create, push &amp; pop</b> (not insert).",
     "سؤال الامتحان عن سلسلة بسيطة تحقق الـ method-message coverage في الـ stack، والإجابة <b>create و push و pop</b> (مش insert)."
    ],
    [
     "From <b>student summaries</b> (not the doctor): cyclomatic complexity determines the number of <b>paths</b> (not states, lines or statements); method-message testing does NOT subsume <b>statement coverage</b>.",
     "ومن <b>ملخصات الطلبة</b> (مش من الدكتور): الـ cyclomatic complexity بيحدد عدد الـ <b>paths</b> (مش الـ states ولا الـ lines ولا الـ statements)، والـ method-message testing مش بيـ subsume الـ <b>statement coverage</b>."
    ],
    [
     "The doctor's only Lecture 4 question is the MM one above, but the lecture is calculation-heavy, so expect: V(G) from E, N (and P), from predicate nodes or regions; tracing foo() and the triangle code for a given input; minimal test sets for statement/branch coverage.",
     "سؤال الدكتور الوحيد في Lecture 4 هو سؤال الـ MM اللي فوق، بس المحاضرة كلها حسابات، فاستنى مسائل زي: الـ <bdi dir=\"ltr\">V(G)</bdi> من الـ E والـ N (والـ P)، أو من الـ predicate nodes أو الـ regions، وتتبع <code>foo()</code> والـ triangle code لـ input معين، وأقل test set للـ statement أو الـ branch coverage."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Web site basics and the 13 testing elements",
   "ar_h": "أساسيات الـ web site والـ 13 element بتوع الـ testing",
   "pts": [
    [
     "A <b>web site</b> = a collection of one or more web pages (text, graphics, links, sounds…) under the <b>same domain</b>. It must have a <b>domain name</b> and a <b>web host</b>.",
     "الـ <b>web site</b> هو مجموعة من web page واحدة أو أكتر (text و graphics و links وأصوات…) تحت <b>نفس الـ domain</b>. ولازم يكون ليه <b>domain name</b> و<b>web host</b>."
    ],
    [
     "<b>Why test</b>: a site built for Internet Explorer may fail in Mozilla, Chrome or on Linux, so testing makes sure it works on <b>every browser and platform</b>.",
     "ليه بنعمل <b>testing</b>؟ لأن site معمول لـ Internet Explorer ممكن يبوظ على Mozilla أو Chrome أو على Linux، فالـ testing بيتأكد إنه شغال على <b>كل browser وكل platform</b>."
    ],
    [
     "The <b>3 fundamentals</b> of a web page: <b>home page</b> (the default page, header with the site's source name), <b>links</b> (navigate, redirect, download files, open the e-mail client) and <b>content</b>, the <b>most important</b> part (text, graphics, sounds, movie clips, user-data fields, rotating ads, dynamic text).",
     "الـ <b>3 fundamentals</b> بتوع الـ web page هما الـ <b>home page</b> (الصفحة الـ default وفيها header بالـ source name)، والـ <b>links</b> (للتنقل، والتوجيه، وتنزيل الـ files، وفتح الـ e-mail client)، والـ <b>content</b> وده <b>أهم</b> جزء (text و graphics وأصوات و movie clips و fields لبيانات الـ user وإعلانات بتلف و text بيتغير)."
    ],
    [
     "The <b>13 elements</b>: user interface (simple), instructions, site map, content, colors/backgrounds (easy to read), images, tables (no endless scrolling), wrap-around (text around images), functionality (links, DB connection, forms), links, forms (submit works), data verification (business rules), cookies (work + login info <b>encrypted</b>).",
     "الـ <b>13 element</b> هما الـ user interface (سهل)، والـ instructions، والـ site map، والـ content، والـ colors والـ backgrounds (القراءة سهلة)، والـ images، والـ tables (من غير scrolling كتير)، والـ wrap-around (الـ text حوالين الصور)، والـ functionality (الـ links والـ DB connection والـ forms)، والـ links، والـ forms (زرار الـ submit شغال)، والـ data verification (الـ business rules)، والـ cookies (شغالة وبيانات الـ login <b>encrypted</b>)."
    ],
    [
     "<b>Site map</b>: experienced users know where they want to go and avoid long instructions; check the map exists, every link on it works, and a navigation bar is on every page. <b>Content</b>: no plagiarism; keep bold, big fonts and blinking text minimal or the customer may not revisit.",
     "الـ <b>Site map</b> مهم لأن الـ users اللي عندهم خبرة عارفين رايحين فين وبيتجنبوا الـ instructions الطويلة، فبنتأكد إن الـ map موجود وكل link عليه شغال وفيه navigation bar في كل صفحة. والـ <b>Content</b> لازم يبقى من غير plagiarism، وبأقل bold و big fonts و blinking text، وإلا الـ customer ممكن مايرجعش."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Black-box, white-box and gray-box web testing",
   "ar_h": "الـ black-box والـ white-box والـ gray-box في الـ web testing",
   "pts": [
    [
     "<b>Black-box elements</b>: text, hyperlinks, graphics, forms (Infosys page, Figure 8.5). <b>Text</b>: audience level, terminology, accuracy, spelling, punctuation, correct contact info.",
     "عناصر الـ <b>black-box</b> هي الـ text والـ hyperlinks والـ graphics والـ forms (صفحة Infosys في <bdi dir=\"ltr\">Figure 8.5</bdi>). والـ <b>Text</b> بنشوف فيه مستوى الجمهور والـ terminology والدقة والـ spelling وعلامات الترقيم وبيانات التواصل الصح."
    ],
    [
     "<b>Hyperlinks</b>: correct destination, same tab or new window as the spec says (no spec → just check it works), <b>obvious</b> (underlined, pointer changes); e-mail link → send an e-mail and check for a response. <b>Graphics</b>: missing or wrongly named → won't load, error shown.",
     "الـ <b>Hyperlinks</b> لازم تروح للـ destination الصح وتفتح في نفس الـ tab أو window جديدة حسب الـ spec (ولو مفيش spec نتأكد إنها شغالة)، وتبقى <b>واضحة</b> (underline والمؤشر بيتغير)، ولو e-mail link نبعت e-mail ونستنى رد. والـ <b>Graphics</b> لو ناقصة أو اسمها غلط مش هتتحمل وهيظهر error."
    ],
    [
     "<b>Forms</b> = text boxes, list boxes and other fields to <b>enter or select information</b> (Gmail sign-up, Figure 8.6). The 4 checks: positioned properly? correct size? accept correct data? reject bad data?",
     "الـ <b>Forms</b> هي text boxes و list boxes و fields تانية عشان الـ user <b>يدخّل أو يختار معلومات</b> (الـ sign-up بتاع Gmail في <bdi dir=\"ltr\">Figure 8.6</bdi>). والـ 4 checks هما: متحطة صح؟ حجمها صح؟ بتقبل الـ data الصح؟ بترفض الـ data الغلط؟"
    ],
    [
     "<b>White-box</b> (tester knows the internal design), 5 elements: <b>dynamic content</b> (varies with time of day, weather, stock tickers), <b>database-driven pages</b> (catalogs, inventories), <b>programmatically created pages</b>, <b>server performance and loading</b> (simulate millions of connections), <b>security</b> (denial of service, buffer overflow).",
     "الـ <b>White-box</b> (الـ tester عارف الـ internal design) ليه 5 عناصر: الـ <b>dynamic content</b> (بيتغير مع وقت اليوم والطقس والـ stock tickers)، والـ <b>database-driven pages</b> (الـ catalogs والـ inventories)، والـ <b>programmatically created pages</b>، والـ <b>server performance and loading</b> (simulation لملايين connections)، والـ <b>security</b> (الـ denial of service والـ buffer overflow)."
    ],
    [
     "<b>Gray-box</b> = a mix of black-box and white-box; purpose: <b>isolate defects related to bad design or bad implementation</b> of the web.",
     "الـ <b>Gray-box</b> هو خليط من الـ black-box والـ white-box، والهدف منه إنه <b>يعزل الـ defects اللي جاية من design وحش أو implementation وحش</b> للـ web."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Configuration, compatibility and automatic tools",
   "ar_h": "الـ configuration والـ compatibility والـ automatic tools",
   "pts": [
    [
     "<b>Hardware configurations</b> (7): CPU types, RAM, graphics cards, video capture cards, audio cards, monitors/display devices, network cards.",
     "الـ <b>Hardware configurations</b> (7) هما أنواع الـ CPU، والـ RAM، والـ graphics cards، والـ video capture cards، والـ audio cards، والـ monitors، والـ network cards."
    ],
    [
     "<b>Compatibility</b> (5): font sizes, browsers with CSS, screen resolutions, memory sizes, network environments. Trap: RAM is <i>hardware</i>, memory sizes is <i>compatibility</i>.",
     "الـ <b>Compatibility</b> (5) هما الـ font sizes، والـ browsers مع الـ CSS، والـ screen resolutions، والـ memory sizes، والـ network environments. وخد بالك إن الـ RAM في الـ <i>hardware</i>، أما الـ memory sizes ففي الـ <i>compatibility</i>."
    ],
    [
     "<b>Automatic web testing tools</b> check browser compatibility, load/stress/performance, broken hyperlinks, functional/GUI, spelling, security, database, OOP, network, and web applications (<b>Selenium</b>, <b>Cypress</b>).",
     "الـ <b>Automatic web testing tools</b> بتختبر الـ browser compatibility، والـ load والـ stress والـ performance، والـ hyperlinks المكسورة، والـ functional والـ GUI، والـ spelling، والـ security، والـ database، والـ OOP، والـ network، والـ web applications (<b>Selenium</b> و<b>Cypress</b>)."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "No past-exam or sheet question from the doctor on this lecture is on the site yet; expect definitions and lists like the rest of the course.",
     "لسه مفيش سؤال امتحان أو sheet من الدكتور على المحاضرة دي في الـ site، فاتوقع تعريفات وقوايم زي باقي الكورس."
    ],
    [
     "Student-summary questions on the site ask: <i>which strategy checks the site across hardware/software environments</i> → <b>Compatibility testing</b>; T/F <i>dynamic content varies with conditions</i> → True; T/F <i>a navigational map takes the user straight to the information</i> → True.",
     "أسئلة الـ student summaries اللي على الـ site بتسأل: أنهي strategy بتختبر الـ site على environments مختلفة من hardware و software؟ الإجابة <b>Compatibility testing</b>. وصح ولا غلط إن الـ dynamic content بيتغير حسب الظروف؟ صح. وصح ولا غلط إن الـ navigational map بيودّي الـ user للمعلومة على طول؟ صح."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Quality and the 8 quality factors",
   "ar_h": "الـ quality والـ 8 quality factors",
   "pts": [
    [
     "<b>Quality</b> = <b>conformance to requirements</b>; the set of attributes <b>valued by end-users</b>.",
     "الـ <b>Quality</b> معناها <b>conformance to requirements</b>، يعني مجموعة الـ attributes <b>اللي الـ end-users بيقدّروها</b>."
    ],
    [
     "<b>Directly measurable</b> factors: defects. <b>Indirectly measurable</b>: maintainability, usability.",
     "الـ <b>directly measurable</b> factors زي الـ defects، والـ <b>indirectly measurable</b> زي الـ maintainability والـ usability."
    ],
    [
     "The 8 factors: <b>Reliability</b> (intended function accurately), <b>Efficiency</b> (optimal use of resources), <b>Integrity</b> (access control, security), <b>Usability</b> (effort to learn and operate), <b>Maintainability</b> (effort to locate and fix errors), <b>Flexibility</b> (effort to change), <b>Portability</b> (effort to transfer to another system), <b>Reusability</b> (parts usable in other applications).",
     "الـ 8 factors هما الـ <b>Reliability</b> (بيعمل وظيفته بدقة)، والـ <b>Efficiency</b> (استخدام أمثل للـ resources)، والـ <b>Integrity</b> (التحكم في الـ access والـ security)، والـ <b>Usability</b> (مجهود التعلم والتشغيل)، والـ <b>Maintainability</b> (مجهود إننا نلاقي الـ errors ونصلحها)، والـ <b>Flexibility</b> (مجهود التغيير)، والـ <b>Portability</b> (مجهود النقل لـ system تاني)، والـ <b>Reusability</b> (أجزاء تتستخدم في applications تانية)."
    ],
    [
     "Trap: <b>Maintainability</b> = fix errors, <b>Flexibility</b> = change the program, <b>Portability</b> = move it to another system.",
     "خد بالك إن الـ <b>Maintainability</b> لتصليح الـ errors، والـ <b>Flexibility</b> لتغيير البرنامج، والـ <b>Portability</b> لنقله لـ system تاني."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "SQA vs SQC, testing vs QA, ITSM",
   "ar_h": "الـ SQA مقابل الـ SQC، والـ testing مقابل الـ QA، والـ ITSM",
   "pts": [
    [
     "<b>SQA</b> = prevention, focus on the <b>process</b> (proactive), ensures standards and procedures are applied correctly. <b>SQC</b> = detection, focus on the <b>product</b> (reactive), evaluates quality and screens out non-compliant items.",
     "الـ <b>SQA</b> فكرته الـ prevention وتركيزه على الـ <b>process</b> (proactive)، وبيضمن إن الـ standards والـ procedures بتتطبق صح. أما الـ <b>SQC</b> ففكرته الـ detection وتركيزه على الـ <b>product</b> (reactive)، وبيقيّم الـ quality ويستبعد الحاجات اللي مش مطابقة."
    ],
    [
     "<b>Testing</b>: part of SQA, detection-oriented, evaluates spec/design/code under normal and abnormal conditions, finds and reports bugs, done by testers. <b>QA</b>: broader, prevents defects, ensures processes/standards/methodologies, uses <b>ISO / CMM</b>.",
     "الـ <b>Testing</b> جزء من الـ SQA وهدفه الاكتشاف، وبيقيّم الـ spec والـ design والـ code تحت conditions عادية وغير عادية، ويلاقي الـ bugs ويبلّغ عنها، والـ testers هما اللي بيعملوه. أما الـ <b>QA</b> فأوسع، وبيمنع الـ defects، ويضمن الـ processes والـ standards والـ methodologies، ويستخدم <bdi dir=\"ltr\">ISO / CMM</bdi>."
    ],
    [
     "<b>Testing tasks</b>: choose the test implementation approach, execute tests, prepare V&amp;V reports, attend review meetings. <b>Tester role</b>: own the bugs, track them through their life cycle, convince developers to fix them. <b>QA tasks</b>: standard processes, guidelines, checklists per stage, quality metrics and criteria.",
     "مهام الـ <b>Testing</b> هي اختيار الـ test implementation approach، وتنفيذ الـ tests، وتجهيز الـ verification والـ validation reports، وحضور الـ review meetings. ودور الـ <b>tester</b> إنه يشيل مسؤولية الـ bugs ويتابعها طول الـ life cycle ويقنع الـ developers يصلحوها. ومهام الـ <b>QA</b> هي الـ standard processes والـ guidelines والـ checklists لكل stage والـ quality metrics والـ criteria."
    ],
    [
     "<b>ITSM</b> (IT Service Management) = quality management in IT, delivering services at an <b>agreed-upon level of quality</b>. <b>Service Support</b> = efficient delivery of operational services; <b>Service Delivery</b> = long-term planning, control and management.",
     "الـ <b>ITSM</b> (IT Service Management) هو الـ quality management في الـ IT، وهدفه نقدم الـ services بـ <b>مستوى quality متفق عليه</b>. والـ <b>Service Support</b> للتقديم الكفء للـ operational services، والـ <b>Service Delivery</b> للـ planning والـ control والـ management على المدى الطويل."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Test organization, metrics and indicators",
   "ar_h": "تنظيم الـ test team والـ metrics والـ indicators",
   "pts": [
    [
     "<b>Small team</b>: testers + programmers under the development manager → fast communication, but an inexperienced manager may ignore bug reports. <b>Independent test team</b>: test lead + dev manager under the project manager → test feedback counts, but the PM decides. <b>Reporting to executive management</b>: independent QA team, reports reach senior management directly.",
     "الـ <b>Small team</b> فيه الـ testers والـ programmers تحت الـ development manager، وميزته الـ communication السريع، بس الـ manager اللي مالوش خبرة ممكن يطنّش الـ bug reports. والـ <b>Independent test team</b> فيه الـ test lead والـ development manager تحت الـ project manager، فرأي الـ testing بيتاخد بيه بس القرار الأخير للـ PM. والـ <b>test group reporting to executive management</b> فيه QA team مستقل وتقاريره بتوصل للإدارة العليا على طول."
    ],
    [
     "<b>Metrics</b> = rules for measuring attributes (code size, complexity); <b>indicators</b> = variables reflecting process outcomes (number of detected bugs). <b>Product metrics</b>: code size, documented pages. <b>Process metrics</b>: time taken, methodology.",
     "الـ <b>Metrics</b> هي rules لقياس الـ attributes (حجم الـ code والـ complexity)، والـ <b>indicators</b> هي variables بتعكس نتايج الـ process (عدد الـ bugs اللي اتكشفت). والـ <b>Product metrics</b> زي حجم الـ code وعدد الصفحات الموثقة، والـ <b>Process metrics</b> زي الوقت والـ methodology."
    ],
    [
     "<b>9 common metrics</b>: code coverage, bugs per line of code, cyclomatic complexity, function point analysis, number of classes and interfaces, cohesion, coupling, order of growth, source lines of code.",
     "الـ <b>9 metrics</b> المشهورين هما الـ code coverage، والـ bugs per line of code، والـ cyclomatic complexity، والـ function point analysis، وعدد الـ classes والـ interfaces، والـ cohesion، والـ coupling، والـ order of growth، والـ source lines of code."
    ],
    [
     "<b>9 indicators</b>: progress, stability, process compliance, quality evaluation effort, defect detection efficiency, defect removal rate (<b>detected AND resolved</b>), defect age profile (<b>NOT resolved</b>), defect density (defect-prone parts), complexity. E.g. 40 detected, 30 resolved → removal rate counts 30, age profile counts 10.",
     "الـ <b>9 indicators</b> هما الـ progress، والـ stability، والـ process compliance، والـ quality evaluation effort، والـ defect detection efficiency، والـ defect removal rate (<b>اتكشفت واتحلت</b>)، والـ defect age profile (<b>ماتحلتش</b>)، والـ defect density (الأجزاء اللي فيها defects كتير)، والـ complexity. مثال لو اتكشف 40 واتحل 30:<span class=\"ltr\">removal rate → 30, age profile → 40 − 30 = 10</span>"
    ]
   ]
  },
  {
   "lec": 6,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "Exam 2025/26: <i>The activity to ensure that an organization is providing the best product to the customer</i> → <b>Quality Assurance</b> (not Quality Control).",
     "في امتحان <bdi dir=\"ltr\">2025/26</bdi> جه سؤال عن النشاط اللي بيضمن إن المؤسسة بتقدم أحسن product للـ customer، والإجابة <b>Quality Assurance</b> مش الـ Quality Control."
    ],
    [
     "Exam 2025/26: <i>The goal of a software tester is to find ……</i> → <b>bugs and make sure they get fixed</b> (not just \"bugs\").",
     "وفي نفس الامتحان: الـ goal بتاع الـ software tester إنه يلاقي إيه؟ الإجابة <b>الـ bugs ويتأكد إنها اتصلحت</b>، مش الـ bugs بس."
    ],
    [
     "Student-summary questions: what guarantees methods and procedures are suitable and applied → <b>SQA</b>; task NOT under SQA → <b>choosing the implementation approach for a test</b> (a testing task); T/F <i>QA is the same as QC</i> → False.",
     "وأسئلة الـ student summaries: إيه اللي بيضمن إن الـ methods والـ procedures مناسبة ومتطبقة صح؟ الـ <b>SQA</b>. وأنهي task مش تبع الـ SQA؟ <b>اختيار الـ implementation approach للـ test</b> لأنها مهمة testing. وصح ولا غلط إن الـ QA هو نفسه الـ QC؟ غلط."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "CMM: definition, components, levels",
   "ar_h": "الـ CMM: التعريف والـ components والـ levels",
   "pts": [
    [
     "<b>CMM (Capability Maturity Model)</b>: a standard framework for assessing and improving the maturity of a software company's development process. Developed by the <b>SEI</b> and <b>Carnegie Mellon University</b> under the <b>U.S. Department of Defense</b>.",
     "الـ <b>CMM (Capability Maturity Model)</b> هو standard framework لتقييم وتحسين الـ maturity بتاعة الـ development process في شركة الـ software. اتعمل بواسطة الـ <b>SEI</b> و<b>Carnegie Mellon University</b> تحت <b>U.S. Department of Defense</b>."
    ],
    [
     "<b>Five-level incremental</b> approach: organizations climb gradually, <b>no skipping levels</b>. Made mainly for software development organizations, but also applies to system engineering, project management, IT, risk and personnel management. A <b>maturity model</b> is used for <b>both evaluation and improvement</b>.",
     "هو approach <b>incremental من خمس levels</b>: الـ organization بتطلع واحدة واحدة <b>من غير ما تنط levels</b>. معمول أساسًا لـ organizations الـ software development، بس بيتطبق كمان على الـ system engineering والـ project management والـ IT والـ risk management والـ personnel management. والـ <b>maturity model</b> بيتستخدم <b>للتقييم وللتحسين الاتنين</b>."
    ],
    [
     "<b>6 components</b> of the CMM structure: (1) <b>maturity levels</b>, (2) <b>process capability</b> (ability to meet quality expectations with current processes; predicts future projects), (3) <b>Key Process Areas (KPA)</b> (related activities that achieve goals together, e.g. delivery planning), (4) <b>goals</b>, (5) <b>common features</b> (show if a KPA's implementation is successful and sustainable), (6) <b>key practices</b> (actions and infrastructure that support a KPA, e.g. a delivery schedule follows a documented procedure).",
     "الـ CMM structure فيه <b>6 components</b>:<br>(1) الـ <b>maturity levels</b>.<br>(2) الـ <b>process capability</b>، يعني قدرة الـ organization تحقق توقعات الـ quality بالـ processes الحالية، وبتساعدنا نتوقع نتايج المشاريع الجاية.<br>(3) الـ <b>Key Process Areas (KPA)</b>، يعني أنشطة مرتبطة بتحقق goals لما تتعمل مع بعض، زي الـ delivery planning.<br>(4) الـ <b>goals</b>.<br>(5) الـ <b>common features</b>، بتوضح هل تطبيق الـ KPA ناجح ومستدام.<br>(6) الـ <b>key practices</b>، يعني الأفعال والـ infrastructure اللي بتدعم الـ KPA، زي إن الـ delivery schedule ماشي على procedure موثق."
    ],
    [
     "<b>The 5 levels</b> (figure label in brackets):<br>1 <b>Initial</b> (inconsistent management): ad-hoc, reactive; no required processes.<br>2 <b>Repeatable</b> (project management): planning, requirement control, product modifications; plan/track projects, manage suppliers and configurations.<br>3 <b>Defined</b> (process management): standard processes across the organization, teams tailor them; organization-wide training.<br>4 <b>Quantitatively Managed</b> (capability management): statistical/quantitative control; capability baselines.<br>5 <b>Optimizing</b> (change management): continuous improvement; remove causes of defects.",
     "الـ <b>5 levels</b> (واسم الشكل بين قوسين):<br>الأول <b>Initial</b> (inconsistent management)، يعني ad-hoc و reactive ومفيش processes مطلوبة.<br>التاني <b>Repeatable</b> (project management)، فيه planning و requirement control و product modifications، وبنعمل plan و track للمشاريع وندير الـ suppliers والـ configurations.<br>التالت <b>Defined</b> (process management)، فيه processes standard على مستوى الـ organization كلها والـ teams بتعدلها على مقاسها، وفيه organization-wide training.<br>الرابع <b>Quantitatively Managed</b> (capability management)، فيه تحكم statistical و quantitative، وبنعمل capability baselines.<br>الخامس <b>Optimizing</b> (change management)، فيه continuous improvement، وبنشيل أسباب الـ defects."
    ],
    [
     "Arrows in the figure: 1→2 <b>Basic Management Control</b>, 2→3 <b>Process Definition</b>, 3→4 <b>Process Measurement</b>, 4→5 <b>Process Control</b>. Trap: the figure calls Level 4 just \"Managed\".",
     "أسهم الشكل بالترتيب:<span class=\"ltr\">1→2 Basic Management Control, 2→3 Process Definition, 3→4 Process Measurement, 4→5 Process Control</span>وخلي بالك إن الشكل بيسمي الـ Level 4 <bdi dir=\"ltr\">\"Managed\"</bdi> بس."
    ],
    [
     "Each KPA has <b>5 aspects</b>: <b>goals</b>, <b>commitment</b> (requirements to meet the goals), <b>ability</b> (activities that enable meeting the commitments), <b>measurement</b> (activities must be monitored), <b>verification</b>. <b>Benefits of CMM</b>: simple and easy to analyze; executives know it; explains IT issues to senior executives; helps get project funding; large companies and governments compare themselves with it.",
     "كل KPA ليه <b>5 aspects</b>: الـ <b>goals</b>، والـ <b>commitment</b> (المتطلبات اللي لازم تتحقق عشان نوصل للـ goals)، والـ <b>ability</b> (الأنشطة اللي بتخلينا نحقق الـ commitments)، والـ <b>measurement</b> (الأنشطة لازم تتراقب)، والـ <b>verification</b>. و<b>فوايد الـ CMM</b> إنه بسيط وسهل يتحلل، والـ executives عارفينه، وبيشرح مشاكل الـ IT للـ senior executives، وبيساعد نجيب funding للمشاريع، والشركات الكبيرة والحكومات بيقارنوا نفسهم بيه."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "ISO 9000, ISO principles, standards and SPICE",
   "ar_h": "الـ ISO 9000 ومبادئ الـ ISO والـ standards والـ SPICE",
   "pts": [
    [
     "<b>ISO 9000</b>: internationally recognized standards from the <b>International Organization for Standardization</b>; <b>highly generic</b> (any organization with products or services). \"ISO\" from Greek <b>isos = equal</b>. It has <b>20 key elements</b>, each must be clearly documented.",
     "الـ <b>ISO 9000</b> هو standards معترف بيها دوليًا من <b>International Organization for Standardization</b>، وهو <b>generic جدًا</b> (أي organization بتقدم products أو services). كلمة ISO جاية من اليوناني <bdi dir=\"ltr\">isos</bdi> ومعناها <b>متساوي (equal)</b>. وفيه <b>20 key elements</b>، وكل واحد لازم يكون موثق بوضوح."
    ],
    [
     "Elements most asked: (1) <b>Management responsibility</b> (quality policy, resources), (3) <b>Contract review</b> (customer needs), (10) <b>Inspection &amp; testing</b> (receiving, in-process, final), (11) <b>Inspection/measuring equipment</b> (calibrate), (13) <b>Control of non-conforming product</b> (rejected items), (14) <b>Corrective &amp; preventive action</b> (root causes), (16) <b>Quality records</b> (audit trails), (20) <b>Statistical techniques</b> (control charts).",
     "أهم الـ elements اللي بتتسأل:<br>رقم 1 الـ <b>Management responsibility</b> (الـ quality policy والـ resources).<br>رقم 3 الـ <b>Contract review</b> (احتياجات العميل).<br>رقم 10 الـ <b>Inspection &amp; testing</b> (عند الاستلام وأثناء الـ process وفي الآخر).<br>رقم 11 الـ <b><bdi dir=\"ltr\">Inspection/measuring equipment</bdi></b> (الـ calibration).<br>رقم 13 الـ <b>Control of non-conforming product</b> (الحاجات المرفوضة).<br>رقم 14 الـ <b>Corrective &amp; preventive action</b> (الـ root causes).<br>رقم 16 الـ <b>Quality records</b> (الـ audit trails).<br>رقم 20 الـ <b>Statistical techniques</b> (الـ control charts)."
    ],
    [
     "<b>ISO 8 principles</b>: customer focus, leadership, involvement of people, <b>process approach</b> (activities as processes), <b>system approach to management</b> (interconnected processes as one system), continuous improvement, <b>factual decision making</b>, mutually beneficial supplier relationships.",
     "الـ <b>ISO</b> مبني على <b>8 principles</b>: الـ customer focus، والـ leadership، والـ involvement of people، والـ <b>process approach</b> (ندير الأنشطة كـ processes)، والـ <b>system approach to management</b> (الـ processes المترابطة كأنها system واحد)، والـ continuous improvement، والـ <b>factual decision making</b>، والـ mutually beneficial supplier relationships."
    ],
    [
     "<b>SE standards</b>: shift from <b>local to international</b>; <b>IEEE</b> since <b>1976</b> (IEEE Software Engineering Standard Collection). <b>SPICE</b> = <b>Software Process Improvement for Capability Determination</b>, with <b>ISO/IEC 15504</b> a joint <b>ISO and IEC</b> initiative, introduced in <b>1993</b>. 3 objectives: standard framework for process assessment; organizational assessments for emerging standards; global adoption of process assessment in industry.",
     "الـ <b>SE standards</b> بتتحول من <b>محلية لدولية</b>، والـ <b>IEEE</b> شغال في الـ standardization من سنة <b>1976</b> (الـ IEEE Software Engineering Standard Collection). والـ <b>SPICE</b> اختصار لـ <b>Software Process Improvement for Capability Determination</b>، وهو مع الـ <b><bdi dir=\"ltr\">ISO/IEC 15504</bdi></b> مبادرة مشتركة بين الـ <b>ISO والـ IEC</b>، واتقدم سنة <b>1993</b>. أهدافه التلاتة: standard framework لتقييم الـ process، و organizational assessments للـ standards الجديدة، وتبني تقييم الـ process عالميًا في الصناعة."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل إيه",
   "pts": [
    [
     "Fill the blank with one of the four models (CMM, ISO 9000, 6 Sigma, SPICE): \"……… is the widely used and preferred software method of evaluation\" → <b>CMM</b>; \"There are 20 crucial elements in the ……… standard\" → <b>ISO 9000</b>. (Exam 2025/26)",
     "اختار واحد من الأربعة (الـ CMM، والـ ISO 9000، والـ 6 Sigma، والـ SPICE) يكمّل الجملة. مثلًا الطريقة الأكثر استخدامًا لتقييم الـ software هي الـ <b>CMM</b>، والـ standard اللي فيه 20 element هو الـ <b>ISO 9000</b>. (امتحان <bdi dir=\"ltr\">2025/26</bdi>)"
    ],
    [
     "Numbers: \"……… are maturity levels in the CMM\" → <b>5</b>. Know every count: 5 levels, 6 components, 5 KPA aspects, 20 ISO elements, 8 ISO principles, 3 SPICE objectives, years 1976 (IEEE) and 1993 (SPICE). (Exam 2025/26)",
     "أسئلة الأرقام: عدد الـ maturity levels في الـ CMM هو <b>5</b>. احفظ كل الأعداد: 5 levels، و 6 components، و 5 KPA aspects، و 20 ISO elements، و 8 ISO principles، و 3 SPICE objectives، وسنة 1976 للـ IEEE وسنة 1993 للـ SPICE. (امتحان <bdi dir=\"ltr\">2025/26</bdi>)"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Six Sigma and σ",
   "ar_h": "الـ Six Sigma والـ σ",
   "pts": [
    [
     "<b>Six Sigma</b>: a famous concept in <b>total quality management</b>, emerged in the <b>late 1970s and early 1980s</b>. A <b>systematic method</b> and a <b>statistical management system</b> (customer satisfaction, reducing waste, improving quality, financial and time performance). Quality control programs target <b>design, industrial and commercial</b> defects.",
     "الـ <b>Six Sigma</b> مفهوم مشهور في الـ <b>total quality management</b>، ظهر في <b>أواخر السبعينات وأوائل التمانينات</b>. هو <b>systematic method</b> و<b>statistical management system</b> (رضا العميل، وتقليل الـ waste، وتحسين الـ quality، والأداء المالي والزمني). وبرامج الـ quality control بتركز على defects الـ <b>design والـ industrial والـ commercial</b>."
    ],
    [
     "It reduces process variation to <b>3.4 defects per million</b> opportunities or less; the aim is <b>zero defects</b> (the slide and the exam write \"zero default\").",
     "بيقلل الـ process variation لحد <b>3.4 defects لكل مليون</b> opportunity أو أقل، والهدف <b>zero defects</b> (الـ slide والامتحان كاتبين <bdi dir=\"ltr\">\"zero default\"</bdi>)."
    ],
    [
     "<b>Standard deviation (σ)</b>: a statistical method and indicator of deviation/dispersion from the desired objectives; <b>σ = √variance</b>.",
     "الـ <b>Standard deviation (σ)</b> هو statistical method ومؤشر للانحراف والتشتت عن الأهداف المطلوبة، وقانونه:<span class=\"ltr\">σ = √variance</span>"
    ],
    [
     "Normal (Gaussian) curve, share inside and ppm outside:<br>±1σ 68.27% (317,300) · ±2σ 95.45% (45,500) · ±3σ 99.73% (2,700) · ±4σ 99.9937% (63) · ±5σ 99.999943% (0.57) · ±6σ 99.9999998% (0.002).<br>Centred ±6σ leaves 0.002 ppm; the famous 3.4 comes from a long-term <b>1.5σ drift</b> (6 − 1.5 = 4.5σ on one side; general background, not on the slide).",
     "الـ Normal (Gaussian) curve، النسبة جوه الحدود والـ ppm اللي بره:<span class=\"ltr\">±1σ 68.27% (317,300) · ±2σ 95.45% (45,500) · ±3σ 99.73% (2,700)</span><span class=\"ltr\">±4σ 99.9937% (63) · ±5σ 99.999943% (0.57) · ±6σ 99.9999998% (0.002)</span>المنحنى المتمركز عند <bdi dir=\"ltr\">±6σ</bdi> بيسيب 0.002 ppm بس، والرقم 3.4 جاي من <b>drift قدره 1.5σ</b> على المدى الطويل (معلومة عامة مش على الـ slide):<span class=\"ltr\">6 − 1.5 = 4.5σ</span>"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Six Sigma calculations",
   "ar_h": "حسابات الـ Six Sigma",
   "pts": [
    [
     "<b>Case table method</b> (failure cases in the preparatory certificate): <b>Six sigma = 6 × standard deviation</b>. X1: 6 × 1.22 = 7.32; X2: 6 × 0.98 = 5.88; overall: mean 2.99, SD 1.07, 6 × 1.07 = 6.42. Largest: X7 (1.27 → 7.62); smallest: X9 (0.91 → 5.46).",
     "طريقة جدول الحالة (حالات الرسوب في الشهادة الإعدادية): قيمة الـ <b>Six sigma</b> هي 6 مضروبة في الـ standard deviation، مثلًا:<span class=\"ltr\">X1: 6 × 1.22 = 7.32</span><span class=\"ltr\">X2: 6 × 0.98 = 5.88</span>والمؤشر الكلي، الـ mean فيه 2.99 والـ SD قيمته 1.07:<span class=\"ltr\">6 × 1.07 = 6.42</span>أكبر قيمة عند X7 وأصغر قيمة عند X9:<span class=\"ltr\">X7: 6 × 1.27 = 7.62, X9: 6 × 0.91 = 5.46</span>"
    ],
    [
     "From variance: first σ = √variance, then × 6. Example: variance 0.25 → σ = 0.5 → 6 × 0.5 = 3.",
     "لو معاك الـ variance، طلّع الـ σ الأول بالجذر وبعدين اضرب في 6، مثلًا:<span class=\"ltr\">variance = 0.25 → σ = 0.5 → 6 × 0.5 = 3</span>"
    ],
    [
     "From the table: ppm out of spec = (100% − % inside) × 10,000. Example ±3σ: (100 − 99.73) × 10,000 = 2,700 ppm.",
     "من الجدول، الـ ppm اللي بره بتتحسب كده:<span class=\"ltr\">ppm = (100% − % inside) × 10,000</span>مثلًا عند الـ <bdi dir=\"ltr\">±3σ</bdi> بيبقى:<span class=\"ltr\">(100 − 99.73) × 10,000 = 2,700 ppm</span>"
    ],
    [
     "<b>DPMO</b> (background formula in the notes, not on the slides) = defects ÷ (units × opportunities per unit) × 1,000,000. Example: 25 ÷ (500 × 10) × 10⁶ = <b>5,000 DPMO</b>. At 6σ, DPMO = 3.4.",
     "الـ <b>DPMO</b> (formula خلفية في الـ notes، مش على الـ slides):<span class=\"ltr\">DPMO = defects ÷ (units × opportunities per unit) × 1,000,000</span>مثال:<span class=\"ltr\">25 ÷ (500 × 10) × 10⁶ = 5,000 DPMO</span>وعند الـ 6σ قيمة الـ DPMO هي 3.4."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "DMAIC, DMADV, principles, phases, belts, tools",
   "ar_h": "الـ DMAIC والـ DMADV والمبادئ والمراحل والـ belts والأدوات",
   "pts": [
    [
     "<b>DMAIC</b>: <b>Define</b> (problems that obstruct improvement; statement with <b>level, location, financial impact</b>; form a team) → <b>Measure</b> (performance vs customer requirements with statistical tools) → <b>Analyze</b> (root causes; chain of failure causes, rank by impact, categorize) → <b>Improve</b> (change processes, test solutions on a sample, correct) → <b>Control</b> (monitor and never stop; measure continuously, correct deviations on time).",
     "الـ <b>DMAIC</b> بالترتيب:<br>الـ <b>Define</b>: نحدد المشاكل اللي بتعطّل التحسين، والـ problem statement فيه الـ <b>level والـ location والـ financial impact</b>، ونكوّن team.<br>الـ <b>Measure</b>: نقيس الأداء مقارنة بمتطلبات العميل بأدوات إحصائية.<br>الـ <b>Analyze</b>: نلاقي الـ root causes من سلسلة أسباب الفشل، ونرتبها حسب تأثيرها ونصنفها.<br>الـ <b>Improve</b>: نغير الـ processes، ونجرب الحلول على sample، ونصحح.<br>الـ <b>Control</b>: نراقب ومنبطلش، نقيس باستمرار ونصحح الانحرافات في وقتها."
    ],
    [
     "<b>DMADV</b> = Define, Measure, Analyze, <b>Design, Verify</b> (for new processes/products; DMAIC improves existing ones, a note not on the slides).",
     "الـ <b>DMADV</b> هو Define و Measure و Analyze و <b>Design و Verify</b>، وبيتستخدم للـ <bdi dir=\"ltr\">processes/products</bdi> الجديدة، أما الـ DMAIC فبيحسّن الموجود (ملاحظة مش على الـ slides)."
    ],
    [
     "<b>Principles</b>: focus on customers; decisions on facts and accurate data; focus on internal operations; management based on advance planning; collaborative teamwork, <b>avoiding competition</b>. <b>Implementation phases</b>: (1) select important projects, (2) assign experienced employees, (3) written document (reasons, objectives, scope), (4) training, (5) implement the process, (6) submission of solutions.",
     "الـ <b>Principles</b>: التركيز على العملاء، وقرارات مبنية على حقايق و data دقيقة، والتركيز على العمليات الداخلية، وإدارة مبنية على التخطيط المسبق، و teamwork تعاوني <b>من غير منافسة</b>. و<b>مراحل التطبيق</b>: (1) نختار المشاريع المهمة، و(2) نخصص موظفين عندهم خبرة، و(3) نكتب document فيه الأسباب والأهداف والـ scope، و(4) الـ training، و(5) ننفذ الـ process، و(6) نقدم الحلول."
    ],
    [
     "<b>Belts</b> (steps 1 to 5): White → Yellow (<b>all employees</b>) → Green (<b>executive employees</b>) → Black (<b>middle and senior management</b>) → Master Black (<b>senior management</b>). <b>Tools</b>: 5S, Seven Wastes, value stream mapping, visual workspace, VOC, Kaizen, Kanban, regression analysis.",
     "الـ <b>Belts</b> من الدرجة 1 للـ 5:<span class=\"ltr\">White → Yellow → Green → Black → Master Black</span>الـ Yellow لـ <b>كل الموظفين</b>، والـ Green للـ <b>executive employees</b>، والـ Black للـ <b>middle and senior management</b>، والـ Master Black للـ <b>senior management</b>. و<b>الأدوات</b>: الـ 5S، والـ Seven Wastes، والـ value stream mapping، والـ visual workspace، والـ VOC، والـ Kaizen، والـ Kanban، والـ regression analysis."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل إيه",
   "pts": [
    [
     "Fill the blank choosing among CMM, ISO 9000, 6 Sigma, SPICE: \"……… reduce process variation to reach zero default\" → <b>6 Sigma</b>. (Exam 2025/26) Link each model to its keyword: 3.4 per million / zero defects / DMAIC → Six Sigma.",
     "اختار من الـ CMM والـ ISO 9000 والـ 6 Sigma والـ SPICE: اللي بيقلل الـ process variation لحد الـ zero default هو الـ <b>6 Sigma</b>. (امتحان <bdi dir=\"ltr\">2025/26</bdi>) اربط كل model بالكلمة المميزة بتاعته، فالـ 3.4 per million والـ zero defects والـ DMAIC كلهم بتوع الـ Six Sigma."
    ]
   ]
  }
 ]
};

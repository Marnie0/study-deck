window.AR = window.AR || {};
AR.qa = { lectures: {}, exams: [] };

AR.qa.lectures["1"] = {
  notes: [
    { h: `يعني إيه software testing؟`, pts: [
      `الـ software testing هو process <b>incremental و iterative</b> بنكتشف بيها الـ defects ونتأكد إن الـ software system ماشي على الـ requirements المحددة. هو <b>جزء أساسي من الـ SDLC</b> وبيطلع الـ defects والـ flaws والـ errors اللي في الـ application.`,
      `بيضمن <b>الـ quality والـ reliability ورضا الـ user</b>. لما نلاقي الـ bugs بدري بنوفر وقت وفلوس وبنزود ثقة العميل.`,
      `<b>هدف الـ testing عند Miller</b>: «الهدف العام من الـ testing هو إننا <b>نأكد الـ quality</b> بتاعة الـ software systems عن طريق إننا <b>نشغّل الـ software بشكل منظم (systematically)</b> في <b>ظروف متحكم فيها بعناية</b>».`,
      `<b>الـ 6 objectives بتوع الـ testing</b>: (1) نتأكد إن الـ solution بيحقق الـ <b>business requirements</b>، وده بيزود ثقة العميل؛ (2) نمسك الـ bugs والـ errors والـ defects؛ (3) نتأكد إن الـ system <b>stable وجاهز</b> للاستخدام؛ (4) نحدد <b>نقط الضعف</b>؛ (5) نحدد <b>درجة الـ quality</b>؛ (6) نحدد <b>user acceptability</b> (المستخدم هيقبله ولا لأ).`,
      `فوايده للـ organization: بيوفر وقت وفلوس (الـ defects بتتلاقى بدري)، منتج stable وdowntime أقل، ورضا العميل.`
    ] },
    { h: `تطور الـ software testing (Gelperin & Hetzel)` },
    { h: `يعني إيه bug؟ (الـ 5 conditions)`, pts: [
      `الـ <b>bug</b> هو error في البرنامج ممكن يطلّع نتيجة غلط أو مش مطلوبة، أو يوقفه إنه يشتغل صح. في الـ testing، الـ bug معناه <b>أي حاجة بتأثر على الـ quality</b>. أسماء تانية ليه: defect, fault, problem, error, incident, anomaly, failure, variance, inconsistency.`,
      `<b>1.</b> الـ software <b>مش بيعمل</b> اللي الـ specification بتقول إنه لازم يعمله. <i>في الـ calculator: زرار الـ + مش شغال.</i>`,
      `<b>2.</b> الـ software بيعمل حاجة الـ specification بتقول إنه <b>مايعملهاش</b> (عكس المطلوب). <i>الـ calculator بيعمل crash أو freeze.</i>`,
      `<b>3.</b> الـ software بيعمل حاجة الـ specification <b>ماذكرتهاش أصلًا</b>. <i>الـ calculator فيه function زيادة اسمها "square" مش موجودة في الـ spec.</i>`,
      `<b>4.</b> الـ software مش بيعمل حاجة <b>المفروض (لازم) يعملها</b> حتى لو الـ spec ماذكرتهاش. <i>البطارية ضعيفة → إجابات غلط.</i>`,
      `<b>5.</b> الـ software <b>صعب يتفهم</b>، أو خطواته معقدة، أو <b>بطيء</b> (من وجهة نظر العميل). <i>الزراير صغيرة قوي، أو الإضاءة مزغللة لدرجة إنك مش عارف تقرا الإجابة.</i>`
    ] },
    { h: `أنواع الـ bugs وبتحصل ليه` },
    { h: `أسباب الـ bugs وتكلفتها`, pts: [
      `<b>7 أسباب</b>: (1) <b>Human factor</b>: غلطات في الـ logic أو الـ syntax؛ (2) <b>Communication failure</b> بين الـ teams؛ (3) <b>Development timeframe مش واقعي</b>؛ (4) <b>Poor design logic</b> (research مش كفاية، أو فهم غلط للـ feasibility)؛ (5) <b>Poor coding practices</b> (طرق مش كفء و<b>tools فيها مشاكل</b>)؛ (6) <b>نقص في الـ testing الماهر (lack of skilled testing)</b>؛ (7) <b>Change requests</b> في آخر لحظة.`,
      `<b>تكلفة تصليح الـ bug بتعتمد على إمتى لقيناه</b>: في الـ Requirement stage = <b>قليلة</b>؛ الـ Coding = <b>متوسطة</b>؛ الـ Integration = <b>أعلى</b> (developer + engineers)؛ الـ Testing = <b>مكلفة جدًا</b> (developers و engineers و managers وتأخير)؛ الـ Production = <b>مكلفة جدًا جدًا (extremely costly)</b> (السمعة، وغرامات مالية أو قانونية).`,
      `مثال حقيقي: <b>فشل الـ Patriot missile (حرب الخليج 1991)</b> كان سببه <b>timing bug</b> وأدى لموت <b>28 عسكري</b>.`
    ] },
    { h: `الـ Waterfall والـ Spiral models`, pts: [
      `الـ <b>Waterfall</b> (من أقدم الموديلات، sequential): System Engineering → Analysis → Design → Coding → Testing → Maintenance.`,
      `الـ phases: الـ <b>System engineering</b> بيحدد <b>الـ software requirements والـ hardware requirements الاتنين</b>؛ الـ <b>Analysis</b> = feasibility study والـ goals والـ performance والـ interface requirements؛ الـ <b>Design</b> = الـ structure بتاع الـ software (زي الـ database design)؛ الـ <b>Coding</b>؛ الـ <b>Testing</b>؛ الـ <b>Maintenance</b>.`,
      `مميزات الـ Waterfall: بسيط، structured، documentation واضحة، الـ requirements بتتحدد بدري، وسهل في الإدارة. <b>العيب</b>: الـ errors اللي في الـ phases الأولى بتنتقل للمراحل اللي بعدها → تأخير وتكلفة أعلى.`,
      `الـ <b>Spiral</b>: iterative، وبيحل مشاكل الـ waterfall. 4 phases بتتكرر في cycles: <b>Planning → Risk analysis → Design engineering → Customer evaluation (testing & evaluation)</b>. عادةً بيتعمل <b>2 أو 3 prototypes</b> قبل الـ final product.`,
      `مميزات الـ Spiral: بيتعامل مع الـ risks بدري، flexible، فيه customer feedback، prototyping، ومناسب للمشاريع المعقدة. <b>العيب</b>: بياخد وقت ومكلف بسبب كتر الـ iterations.`
    ] },
    { h: `الـ V-Model`, pts: [
      `بيدمج الـ testing في <b>كل stage</b> من الـ SDLC، والـ testing بيبدأ بدري من الـ requirements phase. الـ development ماشي من <b>high level → low level</b> (الجنب الشمال، نازل)؛ والـ testing ماشي من <b>low level → high level</b> (الجنب اليمين، طالع).`,
      `الـ test levels: الـ <b>Unit</b> (كل module لوحده)، الـ <b>Integration</b> (التفاعل بين الـ modules)، الـ <b>System</b> (الـ system كله ماشي على الـ design والـ performance)، الـ <b>Acceptance</b> (بيعمله العميل عشان يتأكد من الـ business requirements).`,
      `مثال (calculator): نختبر الـ code logic بتاع الحسابات، والـ memory لكل module، وإزاي الـ modules مربوطة ببعض، والـ efficiency العامة.`,
      `الميزة: الـ verification والـ validation بدري بيقللوا الـ defects. <b>العيب</b>: أقل فعالية لما الـ requirements تكون ناقصة أو متوثقة وحش؛ ومش مناسب لكل المشاريع.`
    ] },
    { h: `الـ V-Model mapping (الشكل)` },
    { h: `الـ RAD والـ Agile`, pts: [
      `الـ <b>RAD</b> (Rapid Application Development): بيتبني من الـ business requirements والـ project-management requirements والـ SRS. بنقارن الـ prototype بالـ requirements؛ لو فيه gap، بنعمل prototype تاني. هو <b>linear sequential</b> بـ <b>cycle قصيرة جدًا</b> و<b>reusable components</b>.`,
      `الـ phases بتاعة الـ RAD: <b>Requirements planning → Design (prototype) → Construction (بالـ RAD tools لحد ما العميل يبقى راضي) → Testing & handover</b> (الـ reusable components بتقلل وقت الـ testing).`,
      `مميزات الـ RAD: سريع، flexible، فيه customer feedback، وبيقلل الـ risk. <b>العيوب</b>: لو reusable component ناقص ممكن المشروع كله يفشل؛ ومناسب بس للمشاريع <b>الصغيرة والبسيطة</b>.`,
      `الـ <b>Agile</b>: أكتر model مستخدم النهارده. <b>Incremental</b>، cycles قصيرة، releases صغيرة، feedback مستمر و<b>تعاون مستمر (continuous collaboration)</b> بين العملاء والـ developers والـ testers. الـ approaches: <b>DSDM, SCRUM, XP</b> (والـ XP هو الأشهر).`,
      `الـ <b>XP</b>: الـ programmers بيشتغلوا <b>pairs</b> (واحد بيكتب code والتاني بيعمل review/test). الـ <b>TDD</b> = بنكتب الـ test cases <b>قبل</b> الـ code: (1) نعمل الـ test code → (2) نكتب/نعدل الـ functional code → (3) نعمل tests زيادة → (4) نختبر الـ functional code → (5) نعمل refactor للـ code.`,
      `مميزات الـ Agile: flexible، feedback، تسليم سريع، quality أحسن. <b>العيوب</b>: محتاج العميل يكون مشارك بشكل فعّال، صعب مع الـ teams الكبيرة، والـ scope creep.`,
      `الخلاصة: الـ waterfall sequential؛ الـ <b>V والـ Spiral</b> بيستخدموا الـ testing كجزء أساسي فبالتالي أكفأ من الـ waterfall؛ الـ Agile هو الأكتر تطور؛ والـ XP بيستخدم الـ TDD.`
    ] }
  ],
  cards: [
    `process incremental و iterative بنكتشف بيها الـ defects ونتأكد إن الـ system ماشي على الـ requirements المحددة.`,
    `إننا نأكد الـ quality بتاعة الـ software systems عن طريق تشغيل الـ software بشكل systematic في ظروف متحكم فيها بعناية.`,
    `Demonstration-oriented testing: نتأكد إن الـ software ماشي على الـ specifications بتاعته.`,
    `Destruction-oriented testing: الـ tests متصممة عشان تلاقي errors (عصر Myers).`,
    `Evaluation-oriented: دخّل الـ verification والـ validation.`,
    `Prevention-oriented: نمنع الـ defects بإننا نعمل test design و planning بدري.`,
    `Divide-by-zero، overflow، rounding errors.`,
    `Deadlocks، race conditions، مشاكل الـ concurrency.`,
    `Documentation قديمة (outdated)، ملفات مش متطابقة (mismatched files)، incorrect linking.`,
    `الـ Requirement stage. أما الـ Production stage فمكلفة جدًا جدًا.`,
    `timing bug أدى لموت 28 عسكري.`,
    `Planning، risk analysis، design engineering، customer evaluation (بيتكرروا في cycles).`,
    `في الـ requirements specifications stage.`,
    `لو reusable component ناقص ممكن يسبب فشل؛ ومناسب بس للمشاريع الصغيرة والبسيطة.`,
    `نعمل الـ test code، نكتب الـ functional code، نعمل tests زيادة، نختبر الـ functional code، نعمل refactor.`
  ],
  qa: [
    `1) نتأكد إن الـ solution بيحقق الـ business requirements (ثقة العميل). 2) نمسك الـ bugs والـ errors والـ defects. 3) نتأكد إن الـ system stable وجاهز. 4) نحدد نقط الضعف. 5) نحدد درجة الـ quality. 6) نحدد الـ user acceptability.`,
    `1) مش بيعمل اللي الـ spec بتقوله (زرار الـ + مش شغال). 2) بيعمل حاجة الـ spec بتقول مايعملهاش (crash). 3) بيعمل حاجة الـ spec ماذكرتهاش (function الـ square الزيادة). 4) مش بيعمل حاجة المفروض يعملها حتى لو مش مذكورة (إجابات غلط لما البطارية تضعف). 5) صعب يتفهم، أو معقد، أو بطيء (زراير صغيرة قوي، إضاءة مزغللة).`,
    `الـ Requirement stage: تكلفة قليلة. الـ Coding: متوسطة. الـ Integration: أعلى، ومحتاجة developers و engineers. الـ Testing: مكلفة جدًا، بيدخل فيها managers وبتأخر المشروع. الـ Production: مكلفة جدًا جدًا، بتضر السمعة وممكن تجيب غرامات مالية أو قانونية (زي الـ Patriot missile 1991).`,
    `الـ Waterfall linear و sequential، والـ testing بييجي قرب الآخر، بسيط ومتوثق كويس، بس الـ errors اللي بدري بتنتقل وبتبقى غالية. الـ Spiral iterative وفيه planning و risk analysis و engineering و customer evaluation في كل cycle، وبيستخدم 2 لـ 3 prototypes، وبيتعامل مع الـ risk بدري، بس بياخد وقت ومكلف.`,
    `كل development stage في الشمال بتطلّع test plan للـ test level المقابل ليها في اليمين: الـ requirements → acceptance test plan، الـ functional specs → system test plan، الـ system design → integration test plan، الـ unit design → unit test cases. فالـ testing بيتخطط له بدري وبالتوازي مع الـ development.`
  ],
  quiz: [
    [`صح. الـ demonstration-oriented testing كان بيتأكد إن الـ software ماشي على الـ specifications بتاعته.`, `ده الـ destruction-oriented testing (عصر Myers).`, `ده الـ evaluation-oriented (verification و validation).`, `الفترة 1988–2000 دي الـ prevention-oriented period، وفيها كنا بنمنع الـ defects من الأول عن طريق الـ test design والـ planning بدري، مش demonstration (L1, Evolution of testing).`],
    [`الـ Communication failure ده سوء تواصل بين الـ teams (زي developer فهم الـ requirements غلط)، مش غلطة الـ developer نفسه في الـ logic أو الـ syntax.`, `صح. الـ developers ممكن يغلطوا في الـ logic أو الـ syntax.`, `الـ Lack of skilled testing معناه إن الـ testers بيفوّتوا مشاكل مستخبية؛ ده بيفسر ليه الـ bugs بتعدّي، مش ليه بيحصل غلط في الـ logic أو الـ syntax.`, `الـ unrealistic development timeframe ده عن الـ deadlines الضيقة اللي بتخلي الشغل متكلفت؛ إنما السبب اللي بيتقال على غلطات الـ logic/syntax هو الـ human factor.`],
    [`صح. الـ stage اللي فوق على الشمال هي اللي بتطلّع الـ acceptance test plan.`, `الـ functional specifications stage بتطلّع الـ system test plan، وهي مستوى تحت الـ requirements stage على الناحية الشمال من الـ V (L1, V-model mapping).`, `الـ system design stage بتطلّع الـ integration test plan، مش الـ acceptance test plan (L1, V-model mapping).`, `دي في جنب الـ testing، مش المكان اللي بتتكتب فيه الـ plans.`],
    [`صح. المحاضرة بتقول إن 1988–2000 كانت prevention-oriented. الـ summary key معلّمها False، وده بيتعارض مع الـ slide.`, `جدول المحاضرة بيقول بوضوح إن 1988–2000 = prevention-oriented.`],
    [`الـ Condition 1 إن البرنامج ما يعملش اللي الـ spec بتقوله، زي زرار الـ + مش شغال؛ إنما الـ square function دي حاجة زيادة، مش حاجة ناقصة.`, `الـ Condition 2 إن البرنامج يعمل حاجة الـ spec بتقول ما يعملهاش (زي الـ calculator يعمل crash أو freeze)؛ أما feature زيادة مش مذكورة فدي condition 3.`, `صح. سلوك زيادة مش متحدد في الـ spec هو condition 3.`, `الـ Condition 5 هو وجهة نظر العميل في الـ usability.`],
    [`الـ resource bugs هي buffer overflow و access violations و uninitialized variables.`, `الـ logical bugs هي infinite loops و conditions غلط.`, `صح. مشاكل الـ concurrency هي co-programming bugs.`, `دي الـ documentation القديمة والملفات المش متطابقة.`],
    [`الـ requirement stage هي أرخص مكان تصلّح فيه bug: بتغيّر documents بس، من غير code ولا testers ولا customers (L1, Cost of bugs).`, `تصليح الـ bug وقت الـ coding تكلفته متوسطة؛ الـ developer بس اللي داخل في الموضوع ولسه مفيش حاجة اتسلّمت (L1, Cost of bugs).`, `الـ testing stage مكلفة جدًا (developers و engineers و managers وتأخير)، بس الـ production هي المرحلة اللي تكلفتها extremely costly (L1, Cost of bugs).`, `صح. بتضر السمعة وممكن تجيب غرامات مالية أو قانونية.`],
    [`الـ Analysis بيغطي الـ feasibility والـ goals والـ performance والـ interface requirements.`, `صح. بيحدد الـ software والـ hardware requirements اللي محتاجينها للـ development.`, `الـ Design بيحوّل الـ requirements لـ structure.`, `الـ Maintenance بيصلّح ويعمل updates بعد التسليم.`],
    [`الـ Spiral model كله مبني على الـ prototypes: كل cycle فيها planning و risk analysis و engineering و evaluation بتطلّع prototype، فـ «None» غلط.`, `الـ Spiral model بيكرر الـ 4 phases بتوعه في كذا cycle، فبيبني أكتر من prototype واحد؛ والمحاضرة بتقول عادةً 2 أو 3.`, `صح. الـ Spiral model بيلف في cycles: planning ← risk analysis ← design engineering ← customer evaluation، وعادةً بيطلّع 2 أو 3 prototypes قبل الـ final product (L1, Spiral model).`, `10 prototypes أو أكتر هيخلّوا الـ Spiral model، اللي هو أصلًا بياخد وقت ومكلف، مش عملي خالص؛ المحاضرة بتقول عادةً 2 أو 3.`],
    [`الـ functional code بييجي تاني، وبيتكتب عشان يعدّي الـ tests.`, `صح. الـ TDD بيكتب الـ tests قبل الـ code: أول step إنك تعمل الـ test code، وبعدين تكتب الـ functional code اللي يعدّيه، تضيف tests، تعمل test، وتعمل refactor (L1, XP and TDD).`, `الـ user manual مش من الـ 5 steps بتوع الـ TDD خالص؛ الـ TDD فكرته إنك تكتب automated tests قبل الـ functional code.`, `الـ Refactoring هو step 5، آخر step في الـ TDD، وبيحصل بعد ما الـ functional code يعدّي الـ tests بتاعته (L1, XP and TDD).`],
    [`الـ Spiral مناسب للمشاريع الكبيرة والمعقدة لأنه بيدير الـ risk بدري؛ عيبه إنه بياخد وقت ومكلف، مش موضوع الـ reusable components الناقصة.`, `عيب الـ V-model هو الـ requirements الناقصة.`, `صح. دول بالظبط العيبين بتوع الـ RAD.`, `الـ Agile بيتعامل مع مشاريع معقدة الـ requirements بتاعتها بتتغير؛ عيوبه إنه محتاج customer involvement مستمر، و teams كبيرة، و scope creep.`]
  ],
  extra: [
    [`هدف Miller إننا نأكد الـ quality، مش إننا نثبت إن مفيش bugs خالص.`, `تصليح الـ defects ده debugging؛ هدف Miller إننا نأكد الـ quality عن طريق testing متحكم فيه.`, `صح. ده هدف الـ testing عند Miller زي ما هو مقتبس في المحاضرة.`, `Miller بيأكد على التشغيل <b>الـ systematic</b> في ظروف <b>متحكم فيها بعناية</b>، يعني عكس الاستخدام العشوائي.`],
    [`صح. كتابة الـ code ده development، مش objective من objectives الـ testing.`, `تحديد نقط الضعف (Identifying areas of weakness) هو objective 4 من الـ six objectives of testing، يعني هو موجود في الليستة (L1, Objectives of testing).`, `تحديد درجة الـ quality هو objective 5 من الـ six objectives of testing، يعني موجود في الليستة (L1, Objectives of testing).`, `تحديد الـ user acceptability هو objective 6، آخر واحد في الـ six objectives of testing، يعني موجود في الليستة (L1, Objectives of testing).`],
    [`الـ spec ذكرت السلوك ده فعلًا (ومنعته)، فهو مش سلوك مش مذكور.`, `الـ Condition 5 هو وجهة نظر العميل في الـ usability والسرعة، مش سلوك ممنوع.`, `هنا الـ spec بتغطي السلوك بشكل صريح، فالـ condition 4 مش منطبق.`, `صح. الـ spec بتمنع المسح من غير confirmation والـ software بيعمل كده بالظبط.`],
    [`الـ resource bugs هي buffer overflows و access violations و uninitialized variables.`, `صح. الـ divide-by-zero والـ rounding errors هما أمثلة المحاضرة على الـ math bugs.`, `الـ co-programming bugs هي deadlocks و race conditions ومشاكل الـ concurrency.`, `الـ team working bugs هي documentation قديمة وملفات مش متطابقة و incorrect linking.`],
    [`الـ destruction-oriented testing كان بيصمم tests عشان يلاقي errors (عصر Myers).`, `صح. المحاضرة بتقول إن الـ evaluation-oriented testing هو اللي دخّل الـ verification والـ validation.`, `في الفترة دي الـ testing كان معناه ببساطة debugging.`, `الـ prevention-oriented testing ركّز على الـ test design والـ planning بدري عشان يمنع الـ defects.`],
    [`الـ Requirement هي أرخص stage، والـ integration بييجي قبل الـ testing في التكلفة.`, `الـ Coding متوسط (أرخص من الـ integration) والـ production هو الأغلى.`, `ده الترتيب بالعكس: الـ production هو الأغلى، مش الأرخص.`, `صح. قليلة → متوسطة → أعلى → مكلفة جدًا → مكلفة جدًا جدًا.`],
    [`صح. الـ System design ↔ integration test plan ↔ integration test.`, `ده بييجي من الـ requirements specifications stage.`, `ده بييجي من الـ functional specifications stage.`, `الـ Unit test cases بتطلع من الـ unit design stage اللي في قاع الناحية الشمال، مش من الـ system design (L1, V-model mapping).`],
    [`بالعكس: الـ development ماشي من high → low level (نازل في الجنب الشمال) والـ testing ماشي من low → high level (طالع في الجنب اليمين).`, `صح. الـ development ماشي من high level لـ low level، والـ testing ماشي من low level (unit) لـ high level (acceptance).`],
    [`دي step 1، قبل ما الـ functional code يتكتب.`, `الـ Refactoring هو step 5، آخر خطوة؛ بعد ما تكتب الـ functional code الأول بتعمل tests زيادة وتشغّلها (L1, TDD).`, `صح. الترتيب: create test code → write/modify functional code → create additional tests → test the functional code → refactor.`, `دي step 4؛ الـ additional tests بتتعمل الأول (step 3).`],
    [`صح. المحاضرة بتديه كمثال حقيقي على تكلفة الـ bugs.`, `المحاضرة بتقول كده بالظبط: timing bug، و28 عسكري ماتوا.`]
  ]
};

AR.qa.lectures["2"] = {
  notes: [
    { h: `مصطلحات الـ software testing` },
    { h: `الـ Black-box (functional) testing`, pts: [
      `اسمه كمان <b>behavioral testing</b>. بيركز على الـ functionality <b>من غير ما نعرف الـ internal logic</b>. الـ tester بيحلل <b>الـ inputs والـ expected outputs</b> ويتأكد إن الـ software ماشي على الـ requirements.`,
      `<b>المميزات</b>: مش محتاج تفهم الـ code؛ الـ test cases بتتعمل بسرعة؛ بيساعد <b>يكشف الغموض (ambiguities) في الـ specifications</b>؛ ومناسب للـ testing من وجهة نظر الـ user (الـ GUI).`,
      `<b>العيوب</b>: مش هتقدر تختبر كل الـ inputs الممكنة؛ صعب تصمم cases لو الـ requirements مش واضحة؛ والـ bugs اللي في الأجزاء المعقدة ممكن ماتتكشفش.`,
      `<b>مثال الـ ATM</b>: الـ tester بيتصرف كأنه عميل وبيختبر الـ functions من خلال الـ GUI (الشاشة بتتغير لما الكارت يتعرف عليه، الـ password بيبان نجوم (masking)، التنقل من الـ main menu لأي function) من غير ما يعرف الـ internal logic.`,
      `الـ <b>Static testing</b> = إنك تختبر حاجة <b>مش شغالة</b> (بتفحصها وتراجعها). الـ <b>Dynamic testing</b> = إنك تشغّل الـ software وتستخدمه.`
    ] },
    { h: `الـ Static vs dynamic black-box testing`, pts: [
      `الـ <b>Static black-box</b>: testing <b>من غير ما نشغّل</b> الـ software؛ بيركز على الـ <b>specification</b>. الهدف منه: نتأكد إنها كاملة ومناسبة. الـ document الأساسي: الـ specification (زي الـ user manual) من بدري في الـ SDLC. الهدف: documentation من غير bugs، واضحة، ومركزة على الـ user.`,
      `الـ <b>Dynamic black-box</b>: testing عن طريق إننا <b>نشغّل</b> الـ software بـ data، من غير ما نعرف الـ code اللي جوه (وجهة نظر العميل، واسمه كمان <b>exploratory</b>/behavioral testing). لازم يكون معاك الـ specification.`,
      `خطوات البداية في الـ DBB testing: (1) يكون معاك الـ documents/specifications، (2) تحدد الـ test cases. مثال (الجمع في Windows calculator): 0+0=0, 0+1=1, 254+1=255, 255+1=256, 256+1=257.`,
      `<b>ابدأ بالـ test-to-pass</b> (تأكد إنه شغال عادي بـ input طبيعي) <b>وبعدين الـ test-to-fail</b> (اضغط عليه لحد أقصى حدوده بـ inputs متطرفة).`
    ] },
    { h: `الـ Test-to-pass vs test-to-fail`, pts: [
      `الـ <b>Test-to-pass</b>: نتأكد إن الـ software <b>شغال على الأقل بالحد الأدنى</b> («بالراحة عليه - kindness dealing»)؛ بنختبر في الحالات العادية بالـ boundaries والـ sub-boundaries والـ default data. مثال العربية: تسوقها عادي الأول قبل ما تعملها crash-test. ماتستغربش لو لقيت bugs حتى في الـ test-to-pass.`,
      `الـ <b>Test-to-fail</b>: بنلاقي نقط الضعف باستخدام <b>حالات مش طبيعية (abnormal cases)</b> (بنجبره يطلع error).`,
      `الـ Error messages: إنك تعمل save على disk ومفيش disk متركب. الـ spec بتقول المفروض يطلع error، فده شكله test-to-pass، بس إنت كمان بتجبره يطلع error، فده test-to-fail. <b>في الآخر غالبًا هو الاتنين.</b>`
    ] },
    { h: `الـ Equivalence partitioning (EP)`, pts: [
      `الـ EP بيجمع الـ test cases في categories و<b>بيقلل عدد الـ test cases من غير ما يقلل جودة الـ testing</b>. الـ equivalence class (partition) هي مجموعة test cases <b>بتختبر نفس الحاجة أو بتكشف نفس الـ bug</b>، فكفاية نختبر <b>case واحدة من كل class</b>.`,
      `الـ Classes: <b>valid</b> (بتحقق الشرط) و<b>invalid</b> (مابتحققوش). مثال: 1+1، 1+2… دول partition واحدة؛ و 1+999999999999999999999999999 partition تانية (ممكن تعمل overflow).`,
      `<b>مثال رخصة السواقة</b>: السن فوق 18 ولحد 60 بالكتير يبقى مستحق. الـ Classes: valid = من 18 لـ 60؛ invalid = أقل من 18؛ invalid = أكبر من 60 → <b>3 classes</b>.`,
      `<b>مثال البرنامج</b>: بيقبل <b>من 4 لـ 10 inputs</b>، وكل واحد <b>integer من 5 digits ≥ 10,000</b>. عدد الـ inputs: أقل من 4 (invalid، اختبر 3)، 4–10 (valid، اختبر 4، 7، 10)، أكتر من 10 (invalid، اختبر 11).`,
      `قيم الـ input من 10,000–99,999 → الـ partitions هي <b>&lt;10,000</b>، <b>10,000–99,999</b>، <b>&gt;99,999</b>. <b>6 test cases</b>: 00000 (invalid special value)، 09999 (invalid left boundary)، 10000 (valid left boundary)، 50000 (valid mid)، 99999 (valid right boundary)، 100000 (invalid right boundary).`
    ] },
    { h: `الـ Data testing والـ boundary conditions`, pts: [
      `الـ Software = <b>data</b> (input من الكيبورد، ضغطات الماوس، ملفات على الـ disk، printouts…) + <b>program</b> (الـ executable flow، الـ transitions، الـ logic، الحسابات). الهدف: نقلل الـ test cases باستخدام partitions مبنية على <b>الـ boundary conditions والـ sub-boundary conditions والـ nulls والـ bad data</b>.`,
      `الـ <b>Boundary conditions</b>: المواقف اللي على <b>حافة الحدود التشغيلية المخططة</b>. الـ programming بيبقى معرض للمشاكل عند الأطراف بتاعته (زي حافة الجرف).`,
      `Text field من 1–255 حرف: الـ valid هو 1، 255 (و 254)؛ والـ invalid هو <b>0 و 256</b>. الـ CD-R: ملف صغير جدًا، ملف على حد سعة الـ disc بالظبط، ملف فاضي، ملف كبير زيادة. طباعة كذا صفحة في الورقة: 1، الـ maximum، 0 و max+1. الـ ZIP اللي 9 digits: 00000-0000، 99999-9999، digit زيادة أو ناقص.`,
      `إنك تختبر الأطراف بس ممكن مايكونش كفاية: استخدم partitions عشان تختبر data <b>جوه / بره / على</b> الـ boundary. اختبر: data شغالة، data مش شغالة، data على الـ boundary. مثال الـ Floppy: ملف صغير جدًا، ملف كبير جدًا بس داخل، ملف فاضي، ملف كبير زيادة.`
    ] },
    { h: `الـ State testing`, pts: [
      `الـ <b>Software state</b>: الحالة أو الـ mode اللي الـ software فيه دلوقتي (زي الـ pencil state مقابل الـ airbrush state في Paint). الـ <b>State testing</b> بيتأكد من الـ logic بتاع البرنامج من خلال الـ states بتاعته والـ <b>transitions</b> بينهم.`,
      `الـ <b>State transition map</b> (من الـ spec أو إنت ترسمها بـ boxes وأسهم ودواير) بتوضح: (1) كل state مميزة، (2) الـ input/condition اللي بينقلك من state للتانية، (3) الـ conditions اللي بتتظبط والـ output اللي بيطلع لما تدخل أو تخرج من state. ارسمها <b>من وجهة نظر الـ user</b>.`,
      `<b>5 طرق نقلل بيها الـ states/transitions اللي هنختبرها</b>: (1) زور كل state مرة واحدة على الأقل؛ (2) اختبر الـ transitions الأكتر شيوعًا بين الـ states؛ (3) اختبر الـ paths الأقل شيوعًا؛ (4) اختبر كل الـ error states والرجوع منها؛ (5) اختبر transitions عشوائية.`,
      `اتأكد من كل الـ <b>state variables</b>. الـ startup state بتاعة Paint: الـ window زي ما كانت آخر مرة، بنفس الحجم بتاع آخر مرة، مساحة رسم فاضية، الـ tool box والـ color box والـ status bar ظاهرين، الـ pencil متختار، أسود على أبيض، والـ document اسمه "untitled".`
    ] },
    { h: `مثال محلول: الـ state diagram بتاع الـ media player` },
    { h: `إجابات الـ media player`, pts: [
      `<b>كل الـ states مرة واحدة على الأقل</b> (الـ minimum = test case واحدة): &lt;Off&gt; play → fast forward → fast forward (بتزور OFF و PLAY و FAST PLAY و FAST FORWARD).`,
      `<b>كل الـ 8 transitions مرة واحدة على الأقل</b> (2 test cases): TC1 &lt;Off&gt; play → fast forward → fast forward → stop؛ TC2 &lt;Off&gt; fast forward → play → fast forward → stop → stop.`
    ] }
  ],
  cards: [
    `هل إحنا بنبني الـ product صح؟ (code reviews، design checks)`,
    `هل إحنا بنبني الـ product الصح؟ (user acceptance testing)`,
    `الـ QA: مركز على الـ process، وقائي (preventive). الـ QC: مركز على الـ product، تصحيحي (corrective).`,
    `Document فيه الـ test objectives والـ scope.`,
    `الـ Input والـ conditions والـ expected output.`,
    `Behavioral (functional) testing.`,
    `إنك تفحص وتراجع حاجة مش شغالة.`,
    `نتأكد إن الـ software شغال بالحد الأدنى باستخدام حالات عادية («kindness dealing»).`,
    `نلاقي نقط الضعف بإننا نجبره يطلع errors بـ inputs مش طبيعية أو متطرفة.`,
    `مجموعة test cases بتختبر نفس الحاجة أو بتكشف نفس الـ bug.`,
    `المواقف اللي على حافة الحدود التشغيلية المخططة للـ software.`,
    `0 و 256 حرف.`,
    `00000، 09999، 10000، 50000، 99999، 100000.`,
    `الحالة أو الـ mode اللي الـ software فيه دلوقتي.`,
    `كل state مميزة، والـ input اللي بينقل بين الـ states، والـ conditions/output عند الدخول أو الخروج.`
  ],
  qa: [
    `الـ Test-to-pass بيتأكد إن الـ software شغال بالحد الأدنى باستخدام input عادي و boundaries و default data. الـ Test-to-fail بيحاول يكسره باستخدام حالات مش طبيعية. دايمًا ابدأ بالـ test-to-pass. اختبار الـ error message (save من غير disk) مطلوب في الـ spec (test-to-pass) بس بيجبره يطلع error (test-to-fail)، فغالبًا هو الاتنين.`,
    `الـ Partitions: أقل من 10,000 (invalid)، من 10,000 لـ 99,999 (valid)، أكتر من 99,999 (invalid). الـ Test cases: 00000 invalid special value، 09999 invalid left boundary، 10000 valid left boundary، 50000 valid mid، 99999 valid right boundary، 100000 invalid right boundary.`,
    `زور كل state مرة على الأقل؛ اختبر الـ transitions الأكتر شيوعًا؛ اختبر الـ paths الأقل شيوعًا؛ اختبر كل الـ error states والرجوع منها؛ اختبر state transitions عشوائية.`,
    `المميزات: مش محتاج تفهم الـ code، الـ test cases بتتعمل بسرعة، بيكشف الغموض في الـ specs، ومناسب للـ GUI/testing من وجهة نظر الـ user. العيوب: مش هتقدر تختبر كل الـ inputs، صعب لو الـ requirements مش واضحة، والـ bugs في الأجزاء المعقدة ممكن ماتتكشفش.`,
    `أيوه. الـ inputs اللي في class واحدة بتتعالج بنفس الطريقة، فـ test واحد لكل class بيكشف نفس الـ bugs اللي هيكشفها testing كل القيم. وده بيقلل عدد الـ cases جدًا وبيوفر وقت مع الحفاظ على coverage كويسة.`
  ],
  quiz: [
    [`صح. الـ Verification = «هل إحنا بنبني الـ product صح؟»، وبيتأكد منه مقارنة بالـ spec.`, `الـ Validation بيتأكد من احتياجات الـ user («الـ product الصح»).`, `الـ Design ده phase في الـ development، مش process للتأكد.`, `الـ Requirements هي اللي بنقارن بيها، مش الـ process نفسها.`],
    [`صح. الـ Validation = «هل إحنا بنبني الـ product الصح؟» (زي الـ UAT).`, `الـ Verification بيتأكد مقارنة بالـ specification.`, `الـ Design ده نشاط development بيحدد الـ structure بتاع الـ software؛ مش بيشيّك الـ product على أي حاجة. التشييك على احتياجات الـ user ده اسمه validation.`, `الـ Requirements هي الحاجة اللي بنشيّك الـ product عليها، مش عملية التشييك نفسها؛ إنك تتأكد إن الـ user's requirement اتحقق ده validation.`],
    [`test صحيح (invalid boundary: لازم يترفض)، بس مش هو الوحيد.`, `test صحيح (أول قيمة valid)، بس مش هو الوحيد.`, `test صحيح (قيمة valid عادية)، بس مش هو الوحيد.`, `صح. الـ 9000 هي الـ invalid boundary، والـ 9001 هي الـ valid boundary، والـ 9999 قيمة valid: كلهم test cases مفيدة للـ BVA/EP.`],
    [`«Requirement testing» مش مصطلح من المحاضرة أصلًا؛ المحاضرة بتقسّم الـ testing لـ static (من غير تشغيل) و dynamic (والـ software شغال).`, `الـ Static testing بيفحص حاجة <b>مش</b> شغالة.`, `«Analysis testing» مش مصطلح في المحاضرة؛ إنك تختبر الـ software وهو شغال ده dynamic testing، وإنك تفحصه من غير ما تشغّله ده static.`, `صح. الـ Dynamic testing معناه إنك تشغّل الـ software وتستخدمه.`],
    [`الـ White box بيبص على الـ code، مش على وجهة نظر الـ user.`, `الـ Automation testing بيوصف إزاي الـ tests بتتشغّل (بـ tools)، مش technique من منظور الـ user؛ كشف الغموض في الـ specification ده من مميزات الـ black-box.`, `الـ Manual testing معناه بس إن الـ tests بتتعمل بالإيد، وممكن يبقى black-box أو white-box. المحاضرة حاطة كشف الغموض في الـ specification تحت الـ black-box.`, `صح. الـ Black-box testing بيشتغل بس من الـ inputs والـ expected outputs والـ spec، فبيكشف الغموض والتناقض في الـ specification ومناسب للـ testing من منظور الـ user (الـ GUI) (L2, Black-box advantages).`],
    [`الـ Test-to-pass بيتأكد بس إن الـ software شغال بالحد الأدنى مع input عادي («kindness dealing»)؛ إنك تزقّه لحدوده ده test-to-fail.`, `صح. بيجبره يطلع errors باستخدام input متطرف أو مش طبيعي.`, `الـ Data testing بيقسّم الـ input data (boundaries و sub-boundaries و nulls و bad data) عشان يقلل الـ test cases؛ تعريفه مش إنه يزق الـ software لحدوده.`, `الـ State testing بيتأكد من الـ logic بتاع البرنامج من خلال الـ states بتاعته والـ transitions بينها، مش من سلوكه مع input متطرف.`],
    [`ده الـ upper boundary لشهر فبراير في السنة الكبيسة، بس مش هو الوحيد.`, `ده الـ upper boundary لشهر فبراير، بس مش هو الوحيد.`, `صح. آخر يوم بيعتمد على الشهر: 28، 29، 30 و 31 كلهم boundaries.`, `دي boundaries لشهور تانية، بس محتاجين كمان 28 و 29.`],
    [`الـ random test طريقة لاختيار الـ test input (زي transitions عشوائية)، مش document فيه الـ test objectives والـ scope.`, `الـ test case هو input و conditions و expected output.`, `صح (الـ summary كاتبها "test plane").`, `الـ Dynamic testing نوع من الـ testing (تشغيل الـ software)، مش document؛ الـ document اللي فيه الـ objectives والـ scope هو الـ test plan.`],
    [`الـ 1 والـ 255 جوه قاعدة 1–255، يعني دول الـ VALID boundary tests؛ الـ invalid هما اللي برّه الـ range على طول.`, `صح. واحد تحت الـ minimum وواحد فوق الـ maximum.`, `الـ 254 والـ 255 الاتنين جوه 1–255، يعني الاتنين valid tests؛ الـ invalid boundaries هما اللي برّه الـ range على طول: 0 و 256.`, `الـ 128 قيمة في نص الـ valid range، مش boundary أصلًا، وهي valid؛ الـ invalid boundaries هما 0 و 256.`],
    [`class واحدة هتشيل بس الأعمار الـ valid من 18 لـ 60؛ الـ EP محتاج كمان الـ 2 invalid classes، أقل من 18 وأكتر من 60، فيبقوا 3.`, `فيه 2 invalid classes، وزيادة عليهم واحدة valid.`, `صح. بين 18 و 60 (valid)، أقل من 18 (invalid)، أكبر من 60 (invalid).`, `الـ 6 ده عدد الـ test cases في مثال الـ 5-digit، مش عدد الـ classes هنا.`],
    [`صح. Off → play → fast forward → fast forward بتزور الأربع states كلهم.`, `محتاجين اتنين عشان نغطي كل الـ transitions، مش كل الـ states.`, `مش محتاجين 4 test cases (واحدة لكل state): sequence واحدة off ← play ← fast forward ← fast forward بتزور الـ 4 states كلهم.`, `الـ 8 ده عدد الـ transitions في الـ media-player diagram، مش عدد الـ test cases؛ sequence واحدة بتزور كل الـ states.`],
    [`تشغيل الـ code بـ data متطرفة ده dynamic test-to-fail؛ الـ static black-box testing مش بيشغّل الـ software خالص.`, `صح. بيختبر من غير تشغيل وهدفه documentation كاملة وواضحة.`, `فحص الـ internal data structures محتاج معرفة بالـ code، وده white-box testing؛ الـ static black-box testing بيراجع الـ specification.`, `الـ Server load بيتشيّك بتشغيل الـ system تحت stress (dynamic performance testing)، مش بمراجعة الـ specification.`]
  ],
  extra: [
    [`القيمتين في نفس الـ valid class؛ والـ 2 invalid classes ماتختبروش.`, `التلاتة من الـ valid class، فالـ invalid classes اتفوّتت.`, `دول بيغطوا الـ 2 invalid classes بس؛ والـ valid class ناقصة.`, `صح. الـ 3 في الـ invalid class بتاعة «أقل من 6»، والـ 8 في الـ valid class 6–12، والـ 15 في الـ invalid class بتاعة «أكتر من 12».`],
    [`الـ 50 قيمة في النص؛ والـ invalid boundaries اللي هي 0 و 100 ناقصين.`, `صح. الـ 1 والـ 99 هما الـ valid edges؛ والـ 0 والـ 100 بره على طول (زي 0 و 256 في الـ text field بتاع 1–255).`, `دول الـ invalid boundaries بس؛ والـ valid edges اللي هما 1 و 99 ناقصين.`, `دول جوه الـ range ومش هما الأطراف.`],
    [`الـ 100 هي أقل قيمة البرنامج بيقبلها، يعني هي الـ VALID left boundary (زي 10000 في المحاضرة)؛ الـ invalid هي اللي تحتها على طول.`, `الـ 1000 هي الـ invalid <b>RIGHT</b> boundary (فوق 999 على طول).`, `صح. هي تحت أقل قيمة valid على طول، زي 09999 في مثال المحاضرة.`, `الـ 550 قيمة valid في النص (زي 50000 في مثال المحاضرة)، مش boundary؛ الـ invalid left boundary هي 99.`],
    [`صح. الأول اتأكد إنه شغال بالحد الأدنى بـ input عادي، وبعدين اضغط عليه بالـ test-to-fail.`, `الـ Test-to-fail بييجي بعد الـ test-to-pass، زي ما بتعمل crash-test للعربية بعد ما تسوقها عادي بس.`, `الـ Static testing مابيشغّلش الـ software، فهو مش approach من الـ dynamic black-box.`, `الـ Debugging بيصلّح الـ bugs؛ مش approach للـ dynamic black-box test.`],
    [`المحاضرة بتقول إن شكله test-to-pass، بس إنت كمان بتجبره يطلع error، فغالبًا في الآخر هو الاتنين.`, `صح. هو بيختبر error message متحددة في الـ spec (test-to-pass) بس كمان بيجبره يطلع error (test-to-fail)، فغالبًا هو الاتنين.`],
    [`صح. الفكرة إننا <b>نقلل</b> عدد الـ tests؛ والـ exhaustive testing مش واحدة من الـ 5 طرق.`, `إنك تزور كل state مرة على الأقل ده way 1 من الـ 5 ways بتوع المحاضرة لتقليل الـ states والـ transitions، يعني هو موجود في الليستة.`, `إنك تختبر كل الـ error states والرجوع منها ده way 4 من الـ 5 ways، يعني موجود في الليستة.`, `إنك تختبر الـ least common paths ده way 3 من الـ 5 ways (بعد كل state مرة والـ most common transitions)، يعني موجود في الليستة.`],
    [`كل unique state ممكن الـ software يبقى فيها دي item 1 من اللي الـ state transition map بتوضحه، يعني الـ map محتاجاها.`, `الـ input أو الـ condition اللي بتنقل الـ software من state للي بعدها دي item 2 في الـ map (الأسهم)، يعني الـ map محتاجاها.`, `صح. الـ map بتترسم من وجهة نظر الـ user؛ وسطور الـ code دي بتاعة الـ white-box testing.`, `الـ conditions اللي بتتعمل والـ output اللي بيطلع لما state تتدخل أو تتساب دي item 3 في الـ map، يعني الـ map محتاجاها.`],
    [`الـ stop من FAST PLAY بيروح لـ PLAY، مش OFF (الـ stop من PLAY أو FAST FORWARD بس هو اللي بيروح لـ OFF).`, `صح. OFF → FAST FORWARD → PLAY → FAST PLAY، والـ stop من FAST PLAY بيرجعك لـ PLAY.`, `إنت كنت في FAST PLAY قبل آخر input؛ والـ stop بيطلعك منها.`, `الـ play من FAST FORWARD نقلك لـ PLAY في الخطوة التانية وماارجعتلهاش تاني.`],
    [`الـ QC مركز على الـ product وتصحيحي؛ وأمثلته الـ unit والـ system testing.`, `الـ Validation بيسأل «هل إحنا بنبني الـ product الصح؟»، زي الـ user acceptance testing.`, `الـ Integration testing بيختبر الـ interfaces بين الـ modules.`, `صح. الـ QA مركز على الـ process ووقائي؛ وأمثلته الـ process audits والـ checklists.`],
    [`بالعكس: إنك مش محتاج تفهم الـ code دي ميزة.`, `صح. ده مذكور ضمن عيوب الـ black-box.`, `المحاضرة بتعتبر سرعة عمل الـ test cases ميزة.`, `الـ Black-box testing مناسب للـ testing من وجهة نظر الـ user (الـ GUI).`]
  ]
};

AR.qa.lectures["3"] = {
  notes: [
    { h: `الـ white-box testing بيعمل إيه`, pts: [
      `تقسيمة الـ unit: <b>1. الـ Static white-box</b> (فحص الـ design والـ code، الـ formal review، الـ coding standards and guidelines، الـ code review checklist) و<b>2. الـ Dynamic white-box</b> (مقارنته بالـ debugging، testing the pieces، الـ data coverage، الـ code coverage).`,
      `الـ White-box testing بيساعد الـ tester إنه: (1) يختبر الـ <b>independent paths</b> في الـ unit/module؛ (2) يختبر <b>الـ logical correctness</b> (الـ conditions لما تبقى true ولما تبقى false)؛ (3) يختبر الـ <b>loops</b> عند الـ boundaries بتاعتها؛ (4) يختبر الـ <b>internal data structures</b> ويتأكد إنها valid.`,
      `اسمه كمان <b>glass box</b> أو <b>structural</b> أو <b>open box</b> أو <b>clear box</b> testing، عشان بيفحص الشغل الداخلي.`,
      `الـ <b>Static white-box</b> (فحص الـ design والـ code) ليه 3 أجزاء: <b>Formal Review</b> (peer review، walkthrough، inspection)، <b>Coding Standards and Guidelines</b>، <b>Code Review Checklist</b>.`
    ] },
    { h: `الـ Formal review`, pts: [
      `اجتماعات رسمية بين الـ programmers والـ testers عشان يفحصوا الـ design والـ code بتوع الـ software.`,
      `<b>4 عناصر أساسية</b>: (1) <b>Identify problems</b>: نطلّع المشاكل في الـ design والـ code؛ (2) <b>Follow rules</b>: مجموعة rules ثابتة، زي عدد سطور الـ code اللي بتتراجع في اليوم والوقت المستهلك؛ (3) <b>Prepare</b>: كل مشارك بيحضّر وبيساهم؛ (4) <b>Write a report</b> بيلخص النتايج، ويبقى متاح للـ development team.`,
      `الـ <b>Peer review</b>: programmer ساعد في تصميم الـ architecture/الـ code، ومعاه programmers أو testers تانيين بيعملوا review.`,
      `الـ <b>Walkthrough</b>: الـ programmer اللي <b>كتب</b> الـ code بيعرضه على group من <b>5 أو 6</b> programmers و testers، وبيقراه سطر سطر أو function function وبيرد على الأسئلة.`,
      `الـ <b>Inspection</b>: اللي بيعرض <b>مش هو الـ programmer الحقيقي</b>. الـ inspectors بيراجعوا الـ code من <b>وجهة نظر الـ user والـ tester</b>.`
    ] },
    { h: `الـ Coding standards and guidelines`, pts: [
      `الـ <b>Standards</b> هي rules <b>لازم نلتزم بيها</b> (mandatory). الـ <b>Guidelines</b> هي تعليمات بتساعد الشخص إنه يمشي على الـ standards (<b>مش mandatory أوي</b>).`,
      `<b>3 أسباب</b> نمشي عليهم: (1) <b>Reliability</b>: الـ code بيبقى reliable و secure أكتر؛ (2) <b>Readability / Maintainability</b>: أسهل في الفهم والـ maintenance؛ (3) <b>Portability</b>: بيشتغل على hardware و compilers مختلفة.`
    ] },
    { h: `الـ Generic code review checklist` },
    { h: `ملحوظة على slide «الـ zero بيبقى true»`, pts: [
      `الـ slide بتاعة الـ Comparison Errors بتقول: «في لغة C، الـ zero بيتعتبر true والـ non-zero بيتعتبر false». والـ MCQ في الـ summary بيكرر ده وإجابته «C language».`,
      `<b>في C الحقيقية الموضوع بالعكس</b>: الـ 0 هو false وأي قيمة non-zero هي true. لو الامتحان كرر جملة الـ slide، اختار «C language». المقصود من الـ slide إن خلط الـ integers بالـ Booleans مصدر لـ comparison errors.`
    ] },
    { h: `الـ Dynamic white-box testing`, pts: [
      `هو <b>validation check</b>: بنشغّل test cases بقيم input عشان نتأكد إن الـ application شغال حسب الـ spec طول فترة التشغيل.`,
      `بيغطي: (a) testing للـ low-level functions أو procedures أو subroutines أو libraries مباشرةً؛ (b) testing للبرنامج كله من الـ top level، ونعدل الـ test cases على حسب اللي نعرفه عن طريقة شغله؛ (c) نقرا الـ variables والـ state information عشان نتأكد إن الـ tests بتعمل اللي اتصممت عشانه، ونجبر الـ software يعمل حاجات صعب تتختبر في الظروف العادية.`,
      `<b>الـ Dynamic white-box testing مقابل الـ debugging</b>: الـ testing <b>بيلاقي</b> الـ bugs؛ والـ debugging <b>بيصلّح</b> الـ bugs اللي اتلاقت في الـ testing.`,
      `<b>Testing the pieces</b> = الـ unit والـ integration testing. استراتيجيات الـ Integration testing (في الشكل): <b>Bottom-up</b>، <b>Top-down</b>، <b>Umbrella approach</b>.`
    ] },
    { h: `الـ Data coverage والـ code coverage`, pts: [
      `الـ <b>Data coverage</b>: الـ data بتتتبع بالكامل جوه الـ software (variables، constants، arrays، data structures، input من الكيبورد/الماوس، files، الـ I/O بتاع الشاشة، modems، networks). الـ code بيتقسم لـ <b>data و states</b> زي الـ black-box testing، فسهل نربط الـ white-box cases بالـ black-box cases. أنواعه: <b>Data flow</b>، <b>Sub-boundaries</b>، <b>Error forcing</b>.`,
      `الـ <b>Code coverage</b> ليه 3 أنواع: <b>Statement coverage</b>، <b>Path coverage</b> (branch)، <b>Condition coverage</b>.`,
      `الـ <b>Statement coverage</b>: كل statement تتنفذ مرة واحدة على الأقل. مثال: 4 سطور PRINT ورا بعض، فـ test واحد بيشغّلهم كلهم.`,
      `الـ <b>Path coverage</b>: كل path (الـ branch-ين بتوع كل IF). مثال: IF Date$ = "25-12-2008" → PRINT "MERRY CHRISTMAS". 2 tests: لو Date = 25-12-2008 بيشغّل 1,2,3,4,5,6,7؛ وأي تاريخ تاني بيشغّل 1,2,5,6,7.`
    ] },
    { h: `مثال محلول على الـ Condition coverage` },
    { h: `الـ Test cases للـ full condition coverage` },
    { h: `ليه الـ condition coverage محتاج cases أكتر`, pts: [
      `الـ Branch coverage محتاج 2 tests بس (الـ IF كله true مرة و false مرة). أما الـ condition coverage فبيخلي <b>كل sub-condition</b> (جزء الـ Date وجزء الـ Time) true و false، فالمحاضرة بتعرض <b>الـ 4 combinations</b> كلهم.`,
      `التمرين اللي في الآخر (triangle problem) اتحل في Lecture 4.`
    ] }
  ],
  cards: [
    `Glass box، structural، open box، clear box testing.`,
    `الـ Formal review، الـ coding standards and guidelines، الـ code review checklist.`,
    `Identify problems، follow rules، prepare، write a report.`,
    `الـ Peer review، الـ walkthrough، الـ inspection.`,
    `اللي كتب الـ code بيعرضه سطر سطر على group من 5 أو 6 programmers و testers.`,
    `اللي بيعرض مش هو اللي كتب الـ code؛ والـ inspectors بيراجعوا من وجهة نظر الـ user والـ tester.`,
    `الـ Standards هي rules إلزامية (mandatory)؛ والـ guidelines تعليمات بتساعدك تمشي عليها ومش mandatory أوي.`,
    `Reliability، readability/maintainability، portability.`,
    `Computation error.`,
    `Comparison error.`,
    `Data reference error.`,
    `الـ Testing بيلاقي الـ bugs؛ والـ debugging بيصلّحها.`,
    `Bottom-up، top-down، umbrella approach.`,
    `Data flow، sub-boundaries، error forcing.`,
    `Statement، path (branch)، condition coverage.`
  ],
  qa: [
    `الـ Peer review: programmer شارك في الـ design أو الـ code، ومعاه programmers أو testers تانيين كـ reviewers. الـ Walkthrough: اللي كتب الـ code بيعرضه سطر سطر على 5 أو 6 programmers و testers وبيرد على الأسئلة. الـ Inspection: حد غير اللي كتب الـ code هو اللي بيعرض؛ والـ inspectors بيراجعوا من وجهة نظر الـ user والـ tester. وهي الأكتر formality.`,
    `Data reference (uninitialized variable، off-by-one)؛ data declaration (type أو length غلط، variable مش مستخدم)؛ computation (int زائد float، long زائد short، overflow، قسمة على صفر)؛ comparison (&lt; بدل &lt;=)؛ control flow (loop سلوكها مش مظبوط)؛ input/output (قراية file، input من الكيبورد، كتابة على الشاشة).`,
    `لأ. الـ dynamic white-box testing بيشغّل test cases بـ inputs عشان يلاقي bugs، كـ validation check. والـ debugging بيصلّح الـ bugs اللي اتلاقت في الـ testing. والاتنين بيستخدموا معرفة بالـ code.`,
    `(25-12-2007، 11:11:11) بيشغّل 1,2,5,6,7؛ (25-12-2007، 00:00:00) بيشغّل 1,2,5,6,7؛ (25-12-2008، 11:11:11) بيشغّل 1,2,5,6,7؛ (25-12-2008، 00:00:00) بيشغّل 1,2,3,4,5,6,7.`
  ],
  quiz: [
    [`صح. الـ Formal review = peer review و walkthrough و inspection.`, `الـ Peer review أخو الـ inspection (في نفس المستوى)، مش الأب بتاعه.`, `الـ Code coverage (statement و path و condition) تبع الـ dynamic white-box testing اللي بيشغّل الـ code؛ إنما الـ inspections دي static formal review.`, `الـ Data coverage (data flow و sub-boundaries و error forcing) جزء من الـ dynamic white-box testing؛ الـ inspection واحدة من الـ 3 formal reviews.`],
    [`الـ Scalability مش من الـ 3 أسباب بتوع اتباع الـ standards والـ guidelines، اللي هما reliability و readability/maintainability و portability (L3).`, `صح. الأسباب هي reliability و readability/maintainability و portability.`, `الـ Usability دي quality بتخص الـ user، مش من الـ 3 أسباب بتوع الـ standards والـ guidelines: reliability و readability/maintainability و portability (L3).`, `مش من الـ 3 أسباب (الـ portability منهم، الـ compatibility لأ).`],
    [`الاختيار ده بيحط الـ guidelines مع الـ standards، بس الـ standards دي rules لازم تتمشي عليها، يعني mandatory؛ الـ guidelines بس هي اللي مش mandatory.`, `الـ Standards هي الـ rules الـ mandatory اللي لازم تلتزم بيها؛ التعليمات اللي مش mandatory أوي دي الـ guidelines (L3).`, `صح. الـ Guidelines بتساعدك تمشي على الـ standards بس مش mandatory.`, `المحاضرة بتسمّي category واحدة بالظبط: الـ guidelines هي تعليمات بتساعدك تمشي على الـ standards ومش mandatory أوي.`],
    [`الـ Guidelines بتساعد الواحد يمشي على الـ standards بس ومش mandatory أوي؛ الـ rules الـ mandatory هي الـ standards (L3).`, `صح. الـ Standards هي rules لازم نلتزم بيها.`, `الـ standards بس هي الـ mandatory؛ الـ guidelines مش mandatory أوي، فإنك تختار الاتنين غلط (L3, Coding standards and guidelines).`, `المحاضرة بتدي إجابة مباشرة: الـ standards دي rules لازم تلتزم بيها، يعني mandatory.`],
    [`صح. دول التلات أجزاء بتوع الـ static white-box testing.`, `الـ Dynamic white-box بيغطي testing the pieces والـ data coverage والـ code coverage.`, `الـ Static black-box testing بيراجع الـ specification (زي الـ user manual) من غير معرفة بالـ code؛ إنما الـ formal review والـ code review بيفحصوا الـ code نفسه.`, `الـ Dynamic black-box بيشغّل الـ software من غير معرفة بالـ code.`],
    [`مع الـ AND لازم الجزئين يبقوا true؛ X=3,y=1 و X=2,y=1 فيهم Y≠0 فبيفوّتوا A=A/X، يعني مش كل الاختيارات شغالة.`, `Y=1 بتخلي (Y=0) false، فالـ AND condition تبقى false والـ A=A/X عمره ما يتنفذ؛ والـ statement coverage محتاجة كل statement تتنفذ.`, `الـ X&gt;1 متحققة بس Y=1 بتخلي (Y=0) false، فالـ AND بتفشل والـ statement A=A/X بتتفوّت.`, `صح. X&gt;1 و Y=0 الاتنين true، فـ A=A/X بتتنفذ وكل statement بتتنفذ.`],
    [`ده شغال فعلًا (X=2 بتخلي الـ OR true فـ A=A+1 بيتنفذ)، بس مش هو الوحيد: التانيين كمان بيخلّوا الـ condition true، فالاختيار الكامل هو «All answers».`, `ده شغال (X=2 و y&gt;1 الاتنين true)، بس كل الـ cases التانية كمان بتنفّذ A=A+1، فالإجابة الصح «All answers».`, `ده شغال (y=2 &gt; 1 بتخلي الـ OR true)، بس الـ cases التانية كمان بتنفّذ A=A+1، فالإجابة الصح «All answers».`, `صح. مع الـ OR، كل case بتخلي الـ condition تبقى true، فـ A=A+1 بتتنفذ في التلاتة.`],
    [`أول IF بيبقى true: A=1/3. التاني: X≠2 و A=0.33 مش &gt;1، فـ A=A+1 بتتنط.`, `أول IF بيبقى false (X&gt;1 مش متحققة)، فـ A=A/X بتتنط.`, `مش كل الـ cases بتنفّذ الـ 2 statements: X=0 بيفوّت A=A/X، و X=3,Y=0,A=1 بتدي A=1/3 فـ A=A+1 بتتفوّت. X=2,Y=0,A=4 بس اللي بتنفّذ الاتنين.`, `صح. أول IF بيبقى true: A=4/2=2. التاني IF: X=2 بتبقى true، فـ A=3. الـ statements الاتنين بيتنفذوا.`],
    [`الـ Static black-box testing بيراجع الـ specification من غير ما يشغّل الـ software؛ لا بيشغّل tests ولا بيصلّح bugs.`, `صح. الـ Testing بيلاقي الـ bugs؛ والـ debugging بيصلّحها.`, `الـ Dynamic black-box testing بيشغّل الـ software عشان يلاقي bugs من غير معرفة بالـ code؛ إنما تصليح الـ bugs اللي اتلقت ده debugging (L3).`, `الـ Dynamic white-box testing بيلاقي bugs باستخدام معرفته بالـ code؛ والمحاضرة بتفصله عن الـ debugging اللي بيصلّحها (L3).`],
    [`الـ Control flow errors بتخص الـ loops والـ control structures لما تشتغل غلط (زي loops مش بتخلص)، مش خلط أحجام الـ data في عملية حسابية.`, `صح. نفس الـ type بس بأحجام مختلفة ده من checks الـ computation errors.`, `دول بيخصوا الـ uninitialized variables وحدود الـ array.`, `الـ Comparison errors بتخص الـ boundary operators (&lt; ولا &lt;=) والـ Boolean operands؛ إنما جمع long integers على short integers ده computation error.`],
    [`صح. الشكل بيوضح bottom-up و top-down و umbrella تحت الـ integration testing.`, `الـ Top-down واحد من الـ 3 integration approaches، جنب الـ umbrella؛ الـ umbrella مش نوع من الـ top-down، الاتنين تحت الـ integration testing.`, `الـ Bottom-up واحد من الـ 3 integration approaches، جنب الـ umbrella؛ الـ umbrella تبع الـ integration testing، مش تبع الـ bottom-up.`, `الـ Integration testing بيشغّل الأجزاء مع بعض، وده جزء من الـ dynamic white-box testing (testing the pieces)، فالـ umbrella مش static testing.`],
    [`الـ Static black-box testing لا بيشغّل الـ software ولا بيستخدم الـ code؛ ده بيراجع الـ specification.`, `صح. المحاضرة بتعرّف الـ dynamic white-box testing على إنه validation check.`, `الـ Dynamic black-box testing بيشغّل الـ software بس من غير ما يعرف الـ code؛ استخدام المعرفة بالـ code هو اللي بيخليه white-box.`, `الـ formal review ده static white-box testing: ناس بتفحص الـ design والـ code في meeting من غير ما تشغّل test cases.`],
    [`الـ slide مش بتذكر Java؛ جملة الـ Comparison Errors فيها بتسمّي C. (وفي الحقيقة Java أصلًا مش بتعامل الـ integers كـ Booleans.)`, `الـ slide بتسمّي C بس، مش C++. (وفي الحقيقة في C و C++ الـ zero يعني false والـ non-zero يعني true، عكس الـ slide.)`, `الـ slide بتنسب الجملة لـ C لوحدها، فـ «All the above» مش مطابقة لإجابة الـ slide.`, `دي إجابة الـ slide/الـ summary. خد بالك: في C الحقيقية الموضوع بالعكس (0 = false، و non-zero = true). اختار «C» بس لو الامتحان كرر كلام الـ slide.`],
    [`إن presenter مستقل مش هو الـ author يعرض ده inspection؛ في الـ walkthrough الـ author هو اللي بيعرض (L3, Formal review).`, `صح. اللي كتب الـ code بيعرضه على team من 5 أو 6.`, `الـ Walkthroughs دي meetings داخلية للـ programmers والـ testers؛ الـ customer مش موجود، والـ author هو اللي بيعرض الـ code.`, `المحاضرة بتقول إن اللي بيعرض هو الـ programmer اللي كتب الـ code، وبيعرض لـ 5 أو 6 programmers و testers، مش manager.`]
  ],
  extra: [
    [`صح. الـ Behavioral testing اسم تاني للـ <b>BLACK-box</b> testing.`, `مذكور كاسم تاني للـ white-box testing.`, `مذكور كاسم تاني للـ white-box testing.`, `مذكور كاسم تاني للـ white-box testing.`],
    [`تحديد المشاكل في الـ design والـ code ده element 1 من الـ 4 essential elements بتوع الـ formal review، يعني هو منهم.`, `اتباع rules (زي عدد lines of code اللي بتتراجع في اليوم، والوقت المصروف) ده element 2 في الـ formal review، يعني هو منهم.`, `كتابة report بيلخّص النتايج للـ development team ده element 4 في الـ formal review، يعني هو منهم.`, `صح. العناصر هي identify problems و follow rules و prepare و write a report؛ وتصليح الـ code مش واحد منهم.`],
    [`في الـ walkthrough الـ programmer اللي <b>كتب</b> الـ code هو اللي بيعرضه.`, `الـ peer review فيه programmer ساعد في تصميم الـ code، ومعاه programmers أو testers تانيين بيراجعوا.`, `صح. في الـ inspection اللي بيعرض مش هو الـ programmer الحقيقي والـ reviewers بياخدوا وجهة نظر الـ user والـ tester.`, `الـ Code coverage ده dynamic white-box testing، مش review.`],
    [`الـ Computation errors موضوعها الحسابات الغلط (types مختلطة، overflow، قاسم ممكن يبقى صفر).`, `الـ Comparison errors موضوعها &lt; و &gt; و = و ≠ والـ Boolean operands.`, `صح. «declared but never used or used only once» ده check من الـ data declaration.`, `الـ I/O errors بتخص الـ files والـ input من الكيبورد/الماوس والكتابة على file أو الشاشة.`],
    [`دول الـ uninitialized variables والـ subscripts اللي بره الحدود والـ off-by-one errors.`, `دول موضوعهم إنك تعرّف الـ variables والـ constants بالـ type والـ length والقيمة المبدئية الصح.`, `دول بيخصوا قراية وكتابة الـ files والـ devices.`, `صح. الـ Control flow بيتأكد إن الـ loops بتخلص والـ branching صح.`],
    [`صح. الـ Statement coverage نوع من الـ <b>CODE</b> coverage.`, `الـ Data flow واحد من الـ 3 أنواع بتوع الـ data coverage (data flow و sub-boundaries و error forcing)، يعني هو مذكور (L3).`, `الـ Sub-boundaries واحد من الـ 3 أنواع بتوع الـ data coverage، يعني مذكور؛ الـ statement coverage دي code coverage.`, `الـ Error forcing واحد من الـ 3 أنواع بتوع الـ data coverage، يعني مذكور؛ الـ statement coverage تبع الـ code coverage.`],
    [`test واحد بـ X &gt; 10 بيشغّل كل الـ statements أصلًا، فالـ statement coverage محتاج 1 بس.`, `صح. X = 20 بيشغّل كل السطور (1)؛ والـ path coverage محتاج كمان case بـ false زي X = 5 (2)، زي مثال الكريسماس.`, `test واحد مايقدرش ياخد الـ true branch والـ false branch بتوع الـ IF مع بعض.`, `فيه condition بسيطة واحدة بس، فالـ path coverage محتاج 2، مش 4.`],
    [`case واحدة ماتقدرش تخلي كل sub-condition تبقى true و false.`, `الـ 2 كفاية للـ branch coverage (الـ IF كله true مرة و false مرة)، مش لجدول الـ condition coverage بتاع المحاضرة.`, `الـ 8 = 2×2×2 كانت هتحتاج 3 sub-conditions؛ الـ IF ده فيه 2 بس (Age و Member$)، فيدّي 2×2 = 4 combinations.`, `صح. 2 sub-conditions × (true، false) = 4 combinations، زي جدول الـ Date$/Time$.`],
    [`صح. المحاضرة بتقول ده بالظبط عن الـ data coverage.`, `المحاضرة بتقول ده صراحةً في جزء الـ data coverage.`],
    [`الـ Reliability معناها إن الـ code يبقى reliable و secure أكتر.`, `ده معناه إن الـ code أسهل في الفهم والـ maintenance.`, `صح. الـ Portability معناها إن الـ code بيشتغل على hardware و compilers مختلفة.`, `الـ Usability مش من الـ 3 أسباب بتوع الـ standards (reliability و readability/maintainability و portability)؛ إن الـ code يشتغل على hardware تاني ده portability.`]
  ]
};

AR.qa.lectures["4"] = {
  notes: [
    { h: `الـ V-model: الـ verification والـ validation`, pts: [
      `الشكل اللي في الأول بيعيد الـ V-model: الجنب الشمال وهو <b>نازل</b> (requirements spec → functional spec → system design → unit design → code) ده الـ <b>verification</b>. والجنب اليمين وهو <b>طالع</b> (unit test → integration test → system test → acceptance test) ده الـ <b>validation</b>.`,
      `الـ test plans بتربط الجنبين: الـ acceptance test plan، الـ system test plan، الـ integration test plan، والـ unit test cases.`
    ] },
    { h: `مثال محلول: الـ foo()` },
    { h: `الـ Control flow graph بتاع foo` },
    { h: `الـ Cyclomatic complexity والـ basis paths` },
    { h: `التأكد من الـ test cases`, pts: [
      `a=2, b=0: الـ a&gt;1 && b==0 بتبقى true → x=x/2؛ وبعدين a==2 بتبقى true → x=x+1. الـ Path 1,2,3,4,6 ✔.`,
      `a=2, b=1: الـ b==0 بتبقى false → نتنط node 2؛ a==2 بتبقى true → node 4. الـ Path 1,3,4,6 ✔.`,
      `a=0, b=0, x=0: الـ a&gt;1 بتبقى false → نتنط node 2؛ a==2 بتبقى false و x&gt;1 بتبقى false → الـ else اللي هي node 5. الـ Path 1,3,5,6 ✔.`,
      `الـ Cyclomatic complexity = <b>عدد الـ independent (basis) paths</b>، يعني أقل عدد tests محتاجينه عشان نعمل full path/branch coverage للـ basis set.`
    ] },
    { h: `الـ Triangle problem: functional (black-box) testing`, pts: [
      `الـ Pseudocode: read a,b,c; type="scalene"; if (a==b or a==c or b==c) type="isosceles"; if (a==b and a==c) type="equilateral"; if (a&gt;=b+c or b&gt;=a+c or c&gt;=a+b) type="not a triangle"; if (a&lt;=0 or b&lt;=0 or c&lt;=0) type="bad inputs"; print type.`,
      `الـ Domain بيتقسم لـ 3 subdomains: <b>scalene</b> (مفيش أضلاع متساوية)، <b>isosceles</b> (ضلعين متساويين)، <b>equilateral</b> (كلهم متساويين)، وزيادة عليهم 2 error subdomains: <b>bad inputs</b> و<b>not a triangle</b>. كل test case لازم تقول الـ expected output بتاعها.`
    ] },
    { h: `الـ Functional test cases بتاعة المثلث` },
    { h: `ملحوظة على صف الـ bad inputs`, pts: [
      `‡ الـ slide بتعتبر (1,2,4) و (3,2,5) «bad inputs»، بس لو شغّلنا الـ pseudocode عليهم هيطلع <b>"not a triangle"</b> (4 ≥ 1+2 و 5 ≥ 3+2)؛ ومفيش ضلع ≤ 0. الأمثلة الصح هتبقى (−1,2,4) لـ bad input واحد و (0,−2,5) لاتنين. أما (0,0,0) فصح: آخر IF بيحط "bad inputs".`
    ] },
    { h: `المثلث: الـ statement والـ branch coverage` },
    { h: `أقل sets للـ coverage (متأكد منها)`, pts: [
      `(0,1,0): a==c → isosceles (D)؛ مش كلهم متساويين؛ b ≥ a+c (1 ≥ 0) → not a triangle (H)؛ a ≤ 0 → bad inputs (J).`,
      `(4,4,4): isosceles (D)، equilateral (F)، مثلث valid، والأضلاع موجبة.`,
      `<b>أقل عدد للـ Statement coverage = 2 tests</b>: (4,4,4) + (0,1,0) بيشغّلوا كل السطور من A لـ K.`,
      `<b>أقل عدد للـ Branch coverage = 3 tests</b>: ضيف (3,4,5)، اللي بتخلي C تبقى false. الـ (0,1,0) بتخلي E تبقى false و G و I يبقوا true؛ والـ (4,4,4) بتخلي G و I يبقوا false. كده كل IF بقى true و false.`,
      `الـ flow graph (في الشكل) عبارة عن سلسلة decisions C → E → G → I، كل واحدة ليها side branch (isosceles، equilateral، not a triangle، bad inputs) بيرجع يدخل في السلسلة تاني.`
    ] },
    { h: `الـ Functional tests: مساحة المثلث من 3 نقط` },
    { h: `الـ OOP testing`, pts: [
      `الـ Functional testing للـ OO software <b>مش مختلف</b> عن الـ software العادي (conventional): الـ test cases بتيجي من الـ functionality المطلوبة في الـ requirements document. أما الـ <b>Structural</b> testing للـ OOP فمختلف جدًا.`,
      `الـ software العادي بيستخدم coverage criteria (statement، branch، data flow). ممكن نطبقها على الـ OO، بس الـ statement والـ branch coverage <b>شكلهم مش مناسبين</b> لتعقيد الـ OO: لازم نختبر <b>الـ interactions بين الـ methods</b>.`,
      `الـ <b>MM (Method-Message) testing</b>: كل method call لازم يتختبر مرة واحدة على الأقل. لو method بتنادي method تانية كذا مرة، كل call بيتختبر مرة واحدة بس. هو أبسط criterion و<b>مابيشملش (does not subsume) الـ statement coverage</b>.`,
      `الـ <b>Function Pair (FP) testing</b>: كل الـ sequences الممكنة من تنفيذ الـ methods <b>اللي طولها اتنين</b> لازم تتختبر، وعادةً بتبقى مبنية على <b>state machine diagram</b>.`
    ] },
    { h: `مثال الـ Stack: الـ MM والـ FP`, pts: [
      `الـ States: <b>Empty، Normal، Full</b>. الـ new → Empty. الـ push: Empty→Normal، Normal→Normal، Normal→Full، Full→error. الـ pop: Empty→error، Normal→Normal، Normal→Empty، Full→Normal.`,
      `الـ <b>MM</b>: sequence بسيطة من <b>create و push و pop</b> بتحقق الـ MM testing.`,
      `الـ <b>FP (14 pairs)</b>: 1 new-pop (empty، error)؛ 2 new-push؛ 3 push(from empty)-push؛ 4 push(from empty)-pop؛ 5 push(normal→normal)-push (لسه normal)؛ 6 push(normal→normal)-push (بقى full)؛ 7 push(normal→normal)-pop؛ 8 push(normal→full)-push (error)؛ 9 push(normal→full)-pop؛ 10 pop(normal→normal)-push؛ 11 pop(normal→normal)-pop (لسه normal)؛ 12 pop(normal→normal)-pop (بقى empty)؛ 13 pop(into empty)-push؛ 14 pop(into empty)-pop (error).`
    ] },
    { h: `أسئلة المحاضرة (الإجابات)`, pts: [
      `<b>Q1</b> الـ functional testing للـ OO software بيتعمل إزاي؟ زي الـ conventional بالظبط: الـ test cases من الـ functionality المطلوبة في الـ requirements document.`,
      `<b>Q2</b> هل الـ statement coverage مفيد للـ OO؟ محدود: ممكن يتطبق بس مابيختبرش الـ interactions بين الـ methods.`,
      `<b>Q3</b> هل الـ MM بيشمل (subsume) الـ statement coverage؟ <b>لأ</b> (المحاضرة: «MM testing does not subsume every-statement coverage»). الـ student summary بتاع lec-4 بيقول «Yes»؛ وده بيتعارض مع الـ slide.`,
      `<b>Q4</b> ميزة الـ function pair coverage؟ بيختبر sequences من تنفيذ اتنين methods، فبيمسك الـ interaction faults والـ bugs اللي معتمدة على الـ state (زي push على stack full، أو pop على stack empty) اللي الـ MM testing بتاع الـ call الواحد بيفوّتها.`
    ] }
  ],
  cards: [
    `V(G) = E − N + 2P (الـ P = عدد الـ connected components، وغالبًا 1). وبتساوي كمان عدد الـ predicate nodes + 1 = عدد الـ regions.`,
    `7 edges − 6 nodes + 2 = 3.`,
    `1,2,3,4,6؛ 1,3,4,6؛ 1,3,5,6.`,
    `عدد الـ independent (basis) paths.`,
    `الشمال (نازل) = verification؛ اليمين (طالع) = validation.`,
    `Scalene، isosceles، equilateral، وزيادة عليهم الـ error cases: bad inputs و not a triangle.`,
    `(4,4,4) و (0,1,0).`,
    `(3,4,5)، (4,4,4) و (0,1,0).`,
    `كل method call بيتختبر مرة واحدة على الأقل.`,
    `لأ.`,
    `كل الـ sequences من تنفيذ الـ methods اللي طولها اتنين، مبنية على state machine.`,
    `create، push، pop.`,
    `Empty، Normal، Full.`,
    `14.`
  ],
  qa: [
    `الـ Nodes من 1 لـ 6، والـ edges هي 1-2، 1-3، 2-3، 3-4، 3-5، 4-6، 5-6، فبيدّونا E=7 و N=6، يبقى V(G)=7-6+2=3 (وبرضه 2 predicates + 1). الـ Basis paths: 1,2,3,4,6 (a=2,b=0,x=0)؛ 1,3,4,6 (a=2,b=1,x=0)؛ 1,3,5,6 (a=0,b=0,x=0).`,
    `الـ MM testing بيطلب إن كل method call يتختبر مرة واحدة على الأقل (كل call مرة واحدة حتى لو بيتكرر). هو أبسط criterion ومابيشملش الـ statement coverage. أما الـ function pair testing فبيطلب كل sequence ممكنة من تنفيذ اتنين methods، وعادةً بتطلع من state machine diagram، فبيختبر الـ interactions والسلوك اللي معتمد على الـ state.`,
    `الـ Statement: (4,4,4) و (0,1,0)، ودول بيوصلوا لـ isosceles و equilateral و not a triangle و bad inputs. الـ Branch: ضيف (3,4,5) عشان أول IF يبقى false كمان. كده كل decision بقت true و false مرة على الأقل.`,
    `new-pop (error)، new-push، push(from empty)-push، push(from empty)-pop، push(normal)-push (لسه normal)، push(normal)-push (بقى full)، push(normal)-pop، push(to full)-push (error)، push(to full)-pop، pop(normal)-push، pop(normal)-pop (لسه normal)، pop(normal)-pop (بقى empty)، pop(into empty)-push، pop(into empty)-pop (error).`
  ],
  quiz: [
    [`صح. الـ MM testing محتاج بس إن كل method call تتختبر مرة على الأقل؛ والمحاضرة بتقول إن sequence بسيطة create و push و pop بتحقق ده للـ stack (L4, Stack example).`, `الـ methods بتاعة الـ stack هي new/create و push و pop؛ «insert» مش منهم، فالـ sequence دي مش بتختبر الـ push.`, `الـ pop عمره ما اتنادى، فواحدة من methods الـ stack ما اتختبرتش؛ الـ MM محتاج كل method call مرة على الأقل: create و push و pop.`, `«insert» مش method في الـ stack والـ pop ناقص، فلا push ولا pop اتختبروا؛ الـ sequence بتاعة المحاضرة هي create و push و pop.`],
    [`الـ V(G) = 1 بس للـ code الماشي في خط مستقيم من غير decisions؛ الـ foo() فيها 2 predicate nodes (1 و 3)، فـ V(G) = 3.`, `الـ 2 ده عدد الـ predicate nodes (1 و 3)؛ الـ V(G) = predicates + 1 = 3، أو E − N + 2 = 7 − 6 + 2 = 3.`, `صح. V(G) = E − N + 2P = 7 − 6 + 2(1) = 3، وده نفس predicate nodes + 1 = 2 + 1 ونفس الـ 3 regions بتوع الـ graph (L4, foo()).`, `الـ 13 = E + N = 7 + 6، وده مش الـ formula؛ V(G) = E − N + 2P = 7 − 6 + 2 = 3.`],
    [`صح. بتدينا عدد الـ independent (basis) paths.`, `الـ States والـ transitions بييجوا من الـ state machine diagram (اللي بنستخدمه في الـ function pair testing)، مش من الـ cyclomatic complexity.`, `الـ Cyclomatic complexity بتتحسب من الـ edges والـ nodes والـ decisions بتوع الـ flow graph، مش من الـ lines؛ وبتدينا عدد الـ independent paths.`, `statements كتير ممكن تبقى على path واحد؛ الـ V(G) بيعدّ الـ independent (basis) paths، يعني أقل عدد tests للـ basis path coverage.`],
    [`صح. المحاضرة بتقول إن الـ MM testing هو أبسط OO criterion ومش بيـ subsume الـ statement coverage: إنك تنادي كل method مرة مش معناه إن كل statement اتنفذت (L4, OOP testing).`, `المحاضرة ذكرت الـ statement coverage بس.`, `المحاضرة ما اتكلمتش عن الـ data coverage في علاقتها بالـ MM testing؛ هي قالت بس إن الـ MM مش بيـ subsume الـ statement coverage.`, `الـ State coverage ما اتقارنتش بالـ MM في المحاضرة (الـ states تبع الـ function pair testing)؛ المعلومة المذكورة عن الـ statement coverage.`],
    [`a=2, b=0 بتخلي أول IF true (node 2)، وبعدين a==2 بتودّي لـ node 4: الـ path يبقى 1,2,3,4,6، وده basis path 1 في المحاضرة.`, `b=1 بتفوّت node 2، بس a==2 بتخلي تاني IF true، فـ node 4 بتتنفذ: الـ path يبقى 1,3,4,6، وده basis path 2.`, `صح. أول IF بيبقى false، وبعدين a≠2 و x=0 مش &gt;1، فالـ else (5) بيتنفذ.`, `a=3, b=0 بتخلي أول IF true (node 2: x=9/3=3)، وبعدين x&gt;1 true، فـ node 4 بتتنفذ: الـ path يبقى 1,2,3,4,6.`],
    [`مفيش triple واحدة بتوصل لـ equilateral و not-a-triangle مع بعض.`, `صح. الـ (4,4,4) بتنفّذ isosceles و equilateral؛ والـ (0,1,0) بتنفّذ isosceles و not a triangle و bad inputs. الاتنين مع بعض بيشغّلوا كل الـ lines من A لـ K (L4, Minimal coverage sets).`, `جدول الـ slide فيه 4 columns، بس 2 كفاية.`, `الـ 16 أكتر بكتير من الـ minimum؛ الـ statement coverage محتاجة بس كل line تتنفذ مرة، والـ (4,4,4) مع الـ (0,1,0) بيعملوا ده خلاص.`],
    [`الـ type بيتحط isosceles الأول (a==c، 0==0)، بس الـ IFs اللي بعده بتكتب فوقه: not a triangle (1 ≥ 0+0)، وبعدين bad inputs (a ≤ 0).`, `«not a triangle» بيتحط عشان b ≥ a+c (1 ≥ 0)، بس آخر IF (a ≤ 0) بيكتب فوقه bad inputs قبل الـ print.`, `صح. آخر IF (a ≤ 0) بيكتب فوق الـ type.`, `الـ scalene دي القيمة الابتدائية بس؛ a==c بتغيّرها لـ isosceles، والـ IFs اللي بعد كده بتسيبها bad inputs.`],
    [`إنك تختبر كل method call مرة ده الـ MM (method-message) coverage؛ الـ FP coverage بيختبر كل sequence من 2 method executions.`, `صح. وعادةً بتطلع من state machine diagram.`, `كل statement ده الـ statement coverage، criterion تقليدي المحاضرة بتقول إنه مش كفاية للـ OO؛ الـ FP بيختبر pairs من الـ method executions.`, `الـ FP فيه error pairs (زي new-pop، و push على stack full) بس هو محتاج كل الـ sequences اللي طولها 2، يعني 14 pair في مثال الـ stack.`],
    [`ده صح بالنسبة للـ <b>STRUCTURAL</b> testing، مش الـ functional.`, `صح. الـ test cases بتيجي من الـ functionality المطلوبة.`, `الـ Functional (black-box) testing بيطلّع الـ test cases من الـ requirements document، فمش محتاج source code.`, `الـ Statement coverage ده structural (code-based) criterion؛ الـ functional testing للـ OO بيعتمد على الـ functionality المطلوبة، زي الـ software التقليدي بالظبط.`],
    [`الـ Validation هي الناحية اليمين الطالعة من الـ V (من الـ unit test لحد الـ acceptance test)؛ الناحية الشمال النازلة هي الـ verification.`, `صح. الناحية الشمال النازلة (requirements spec ← functional spec ← system design ← unit design ← code) هي الـ verification؛ والناحية اليمين الطالعة هي الـ validation (L4, V-model).`, `الـ Debugging مش label في رسمة الـ V-model؛ الناحيتين هما verification (شمال، نازل) و validation (يمين، طالع).`, `الـ Maintenance دي phase في الـ Waterfall، مش label في الـ V-model؛ الناحية الشمال في الرسمة verification واليمين validation.`],
    [`صح. مثلث قائم ضلعيه 4 و 4: ½·4·4 = 8.`, `الـ 16 = 4 × 4 ناسية الـ ½: right triangle ضلعيها 4 و 4 مساحته ½ × 4 × 4 = 8.`, `عشان يبقى Not a triangle لازم النقط تبقى على خط واحد، زي (1,1) و (1,5) و (1,10) على x=1؛ هنا (5,1) برّه الخط، فده triangle حقيقي.`, `الـ 50 دي الـ expected area بتاعة حالات الـ 10 في 10، زي (10,10) و (0,10) و (10,0)؛ النقط دي ضلوعها 4، فالمساحة 8.`]
  ],
  extra: [
    [`الـ 1 = 8 − 7 ناسية الـ +2P؛ V(G) = E − N + 2P = 8 − 7 + 2(1) = 3.`, `صح. V(G) = E − N + 2P = 8 − 7 + 2(1) = 3، يعني الـ graph فيه 3 independent paths (L4, Cyclomatic complexity).`, `ده مستخدم P = 2 (8 − 7 + 4)؛ والـ graph عبارة عن component واحدة.`, `الـ 15 = E + N = 8 + 7؛ الـ nodes بتتطرح مش بتتجمع: V(G) = 8 − 7 + 2 = 3.`],
    [`صح. فيه 3 simple decisions (predicate nodes)، فـ V(G) = 3 + 1 = 4.`, `الـ 3 ده عدد الـ predicates؛ لازم تزود 1.`, `الـ 5 كانت هتحتاج 4 predicate nodes؛ الـ code فيه 3 IFs بس (x&gt;0 و z&gt;0 و y&gt;10)، فـ V(G) = 3 + 1 = 4.`, `الـ V(G) مش 2^3؛ هي بتزيد واحد مع كل decision.`],
    [`صح. a&gt;1 && b==0 بتبقى true فـ x = 2/3 ≈ 0.67؛ وبعدين a==2 بتبقى false و x&gt;1 بتبقى false، فالـ else (node 5) بيتنفذ.`, `بعد node 2، x ≈ 0.67، فـ x&gt;1 بتبقى false، و a مش 2؛ فمش هنوصل لـ node 4.`, `أول IF بيبقى true (3 &gt; 1 و b = 0)، فـ node 2 بيتنفذ.`, `أول IF بيبقى true، فمينفعش نتنط node 2.`],
    [`بيتحط الأول، بس الـ IF اللي بعده (4 &gt;= 2+2) بيكتب فوقه.`, `فيه ضلعين متساويين، فالـ scalene بيتكتب فوقه.`, `كل الأضلاع موجبة، فآخر IF بيبقى false.`, `صح. a==b بتحط isosceles، بس c &gt;= a+b (4 &gt;= 4) بعدها بتحط "not a triangle"؛ ومفيش ضلع ≤ 0.`],
    [`الـ 2 هو أقل عدد للـ <b>STATEMENT</b> coverage؛ ومفيش test من الاتنين دول بيخلي الـ IF بتاع الـ isosceles يبقى false.`, `جدول الـ slide فيه 4 columns، بس 3 tests كفاية.`, `صح. (4,4,4) و (0,1,0) وزيادة عليهم (3,4,5)، اللي بتخلي أول IF يبقى false.`, `مش محتاجين test لكل subdomain عشان الـ branch coverage.`],
    [`المحاضرة بتقول إن كل call بيتختبر مرة واحدة بس حتى لو بيحصل كذا مرة.`, `صح. كل method call بيتختبر مرة واحدة على الأقل؛ والـ calls المتكررة بتتختبر مرة واحدة بس.`, `الـ MM مفيهوش قاعدة «اختبر مرتين»: كل call بتتختبر مرة على الأقل، والـ calls المتكررة لنفس الـ method بتتختبر مرة واحدة بس.`, `الـ MM بيطلب إن كل method call يتختبر مرة واحدة على الأقل.`],
    [`الـ push عمره ما بينقل من Full لـ Normal؛ الـ pop هو اللي بيعمل كده.`, `الـ push من Full ده error state في الـ diagram.`, `صح. ده pair رقم 8: الـ push على stack full بيطلّع error.`, `الـ Push عمره ما بيفضّي الـ stack؛ الـ Empty بنوصلها بس بـ pop من Normal. والـ push على stack Full ده error (pair 8).`],
    [`صح. التلات نقط على نفس الخط (y = x)، فهما collinear، زي (1,1)، (1,5)، (1,10).`, `النقط (0,0) و (4,0) و (0,6) مش على خط واحد؛ بيعملوا right triangle ضلعيه 4 و 6، مساحته ½ × 4 × 6 = 12.`, `النقط (1,1) و (5,1) و (1,4) مش collinear؛ بيعملوا right triangle ضلعيه 4 و 3، مساحته ½ × 4 × 3 = 6.`, `النقط (0,0) و (3,0) و (3,3) مش collinear؛ بيعملوا right triangle ضلعيه 3 و 3، مساحته ½ × 3 × 3 = 4.5.`],
    [`المحاضرة بتقول إن الـ statement والـ branch coverage شكلهم مش مناسبين لتعقيد الـ OO، عشان لازم نختبر الـ interactions بين الـ methods.`, `صح. ممكن يتطبقوا، بس مابيختبروش الـ interactions بين الـ methods؛ وعشان كده بنستخدم الـ MM والـ FP testing.`],
    [`الـ 3 بتعدّ الـ inner regions بس؛ الـ outer region كمان بتتحسب، فـ V(G) = 3 + 1 = 4 (في foo: 2 inner + 1 outer = 3).`, `ده بيطرح بدل ما يزود الـ outer region.`, `الـ 5 بتضيف 2 outer regions؛ الـ planar graph فيه outer region واحدة بالظبط، فـ V(G) = 3 + 1 = 4.`, `صح. V(G) = عدد الـ regions = 3 inner + 1 outer = 4 (الـ foo كان فيها 2 + 1 = 3).`]
  ]
};

AR.qa.lectures["5"] = {
  notes: [
    { h: `مقدمة وليه الـ web testing مهم`, pts: [
      `الأهداف: أساسيات الـ testing بتاع الـ web pages؛ الـ black-box testing للـ web pages؛ الـ white-box والـ gray-box testing؛ والـ configuration والـ compatibility testing.`,
      `الـ <b>web site</b> هو مجموعة من web page واحدة أو أكتر (text، graphics، links، أصوات…) متجمعين تحت <b>نفس الـ domain</b>. لازم يكون ليه <b>domain name</b> و<b>web host</b>.`,
      `الأهمية: site معمول لـ Internet Explorer ممكن يبوظ على Mozilla أو Chrome أو على Linux، فالـ testing بيتأكد إن الـ site شغال على <b>كل browser وكل platform</b>.`
    ] },
    { h: `أساسيات الـ web page`, pts: [
      `<b>1. الـ Home page</b>: الصفحة الـ default. عادةً بيبقى فيها header فوق فيه <b>الـ source name</b> بتاع الـ site (text بس، أو designs بـ graphics).`,
      `<b>2. الـ Links</b> بتربط الصفحات الـ local والـ remote بالـ home page. بنستخدمها في: التنقل لصفحات تانية؛ توجيه الـ user لمكان مختلف؛ تنزيل files؛ فتح Internet tools تانية زي الـ default e-mail client (مثلًا Outlook).`,
      `<b>3. الـ Content</b> هو <b>أهم</b> جزء. أشكاله: text documents، graphics، أصوات، movie clips ممكن تتنزل، fields لبيانات الـ user، إعلانات بتلف (rotating)، و text بيتغير dynamically.`
    ] },
    { h: `الـ 13 element بتوع الـ web site testing` },
    { h: `الـ Black-box testing للـ web page`, pts: [
      `شاشة كمثال: الـ web site بتاع Infosys بيوضح العناصر الأساسية: <b>text و graphics و hyperlinks</b> (وكمان forms).`,
      `الـ <b>Text</b>: مستوى الجمهور المستهدف، الـ terminology، عمق المحتوى، الموضوع، الدقة، الـ spelling، علامات الترقيم، وبيانات التواصل الصح (تليفونات، عناوين).`,
      `الـ <b>Hyperlinks</b>: كل واحد بيروح للـ destination الصح وبيفتح في نفس الـ tab أو window جديدة حسب الـ spec (لو مفيش spec، اتأكد إنه شغال). الـ links لازم تبقى <b>واضحة</b> (text عليه underline، ومؤشر الماوس بيتغير). لو e-mail link، ابعت e-mail واتأكد إنك بيجيلك رد.`,
      `الـ <b>Graphics</b>: كلها بتتحمل وبتظهر صح. أي graphic ناقصة أو اسمها غلط مش هتتحمل، والصفحة هتطلّع error مكانها.`,
      `الـ <b>Forms</b> (text boxes، list boxes، fields؛ زي الـ sign-up form بتاع Gmail من Google): الـ fields متحطة في مكانها صح؟ حجمها صح؟ بتقبل الـ data الصح؟ بترفض الـ data الغلط؟`
    ] },
    { h: `الـ White-box والـ gray-box testing للـ web site`, pts: [
      `الـ <b>White-box</b>: الـ tester عارف الـ internal design. العناصر اللي بنختبرها:`,
      `1. الـ <b>Dynamic content</b>: graphics و text بيتغيروا حسب الظروف (وقت اليوم، الطقس، الـ stock tickers).`,
      `2. الـ <b>Database-driven pages</b>: catalogs و inventories (e-commerce).`,
      `3. الـ <b>Programmatically created pages</b>: الـ designer بيكتب entries في database، ويعمل drag and drop للعناصر في layout program ويدوس زرار عشان يطلّع الـ HTML.`,
      `4. الـ <b>Server performance and loading</b>: المواقع المشهورة بيجيلها ملايين hits في اليوم، فلازم نعمل simulation لملايين connections و downloads.`,
      `5. الـ <b>Security</b>: هجمات الـ denial of service والـ buffer overflow.`,
      `الـ <b>Gray-box testing</b>: خليط من الـ black-box والـ white-box. الهدف منه إنه <b>يعزل الـ defects اللي ليها علاقة بـ design وحش أو implementation وحش</b> للـ web. ممكن نعمله مع الـ web sites عشان الـ tester بيشتغل من وجهة نظر الـ user بس كمان يقدر يشوف الـ HTML/الـ scripts بتوع الصفحة.`
    ] },
    { h: `الـ Configuration والـ compatibility testing؛ والـ tools`, pts: [
      `الـ <b>Hardware configurations</b>: 1 أنواع الـ CPU، 2 الـ RAM، 3 الـ graphics cards، 4 الـ video capture cards، 5 الـ audio cards، 6 الـ monitors/display devices، 7 الـ network cards.`,
      `الـ <b>Compatibility</b>: 1 font sizes مختلفة، 2 browsers مع الـ CSS، 3 screen resolutions مختلفة، 4 memory sizes مختلفة، 5 network environments مختلفة.`,
      `الـ <b>Automatic web testing tools</b> بتختبر: الـ browser compatibility؛ الـ load والـ stress والـ performance؛ الـ hyperlinks المكسورة؛ الـ web functional/GUI testing؛ الـ spelling؛ الـ security؛ الـ database؛ الـ OOP؛ الـ network؛ والـ web applications (<b>Selenium</b> و<b>Cypress</b>).`
    ] }
  ],
  cards: [
    `مجموعة من web page واحدة أو أكتر تحت نفس الـ domain؛ ومحتاج domain name و web host.`,
    `الـ Home page، الـ links، الـ content.`,
    `الـ Content.`,
    `الـ map مناسبة، كل link موجود، الـ navigation bar موجود في كل صفحة، وكل link شغال في كل صفحة.`,
    `الـ Cookies شغالة وبيانات الـ login المتخزنة encrypted.`,
    `الـ input بتاع الـ user لازم يطابق الـ business rules المتحددة للـ system.`,
    `الـ Text، الـ hyperlinks، الـ graphics، الـ forms.`,
    `text عليه underline ومؤشر الماوس بيتغير.`,
    `Graphics/text بيتغيروا حسب الظروف: وقت اليوم، الطقس، الـ stock tickers.`,
    `الـ Dynamic content، الـ database-driven pages، الـ programmatically created pages، الـ server performance and loading، الـ security.`,
    `هجمات الـ Denial of service والـ buffer overflow.`,
    `يعزل الـ defects اللي ليها علاقة بـ design وحش أو implementation وحش للـ web.`,
    `Selenium و Cypress.`
  ],
  qa: [
    `الـ Text (الجمهور، الـ terminology، الدقة، الـ spelling، بيانات التواصل)، الـ hyperlinks (الـ destination الصح، نفس الـ tab أو window جديدة، واضحة، e-mail links)، الـ graphics (بتتحمل وبتظهر، مفيش صور ناقصة أو اسمها غلط) والـ forms (متحطة صح، الحجم صح، بتقبل الـ data الصح، بترفض الـ data الغلط).`,
    `الـ Dynamic content، الـ database-driven pages، الـ programmatically created pages، الـ server performance and loading، والـ security (denial of service، buffer overflow).`,
    `الـ web pages متبنية من HTML و scripts الـ tester يقدر يشوفها (view source) وهو لسه بيختبر من وجهة نظر الـ user، فينفع نخلط الـ black-box بالـ white-box. الهدف إننا نعزل الـ defects اللي سببها design وحش أو implementation وحش.`,
    `الـ Hardware: أنواع الـ CPU، الـ RAM، الـ graphics cards، الـ video capture cards، الـ audio cards، الـ monitors، الـ network cards. الـ Compatibility: الـ font sizes، الـ browsers مع الـ CSS، الـ screen resolutions، الـ memory sizes، الـ network environments.`
  ],
  quiz: [
    [`الـ White-box web testing بيستخدم معرفتك بالـ design الداخلي (الـ dynamic content، الـ server load، الـ security)؛ مش هدفه إنه يجرب الـ site على hardware و browsers مختلفة.`, `الـ Black-box web testing بيفحص الـ text والـ hyperlinks والـ graphics والـ forms من وجهة نظر الـ user على setup واحد؛ إنك تشغّله على environments مختلفة ده اسمه compatibility testing.`, `ده بيعزل الـ defects بتاعة الـ design أو الـ implementation.`, `صح. الـ Configuration والـ compatibility testing بيغطي الـ hardware والـ browsers والـ resolutions والـ networks.`],
    [`الـ home page هي الصفحة الـ default بتاعة الـ site وفيها الـ header واسم المصدر، وهي واحدة من الـ 3 fundamentals، بس المحاضرة بتقول إن الـ content هو أهم جزء.`, `الـ Links بتربط الصفحات ببعض وبتفتح downloads أو e-mail، وهي واحدة من الـ 3 fundamentals، بس المحاضرة بتسمي الـ content هو أهم جزء.`, `صح. المحاضرة بتقول إن الـ content هو أهم جزء.`, `الـ Cookies مجرد element رقم 13 في لستة الـ web testing (نتأكد إنها شغالة وإن الـ login info متشفرة)؛ أهم جزء هو الـ content.`],
    [`الـ Database-driven pages بتعرض catalogs و inventories جاية من database (زي الـ e-commerce)؛ تعريفها مش إنها بتتغير مع الوقت أو الجو.`, `صح. أول white-box element في المحاضرة هو الـ dynamic content، وهو graphics و text بيتغيروا حسب الظروف زي وقت اليوم أو الجو أو الـ stock tickers (L5, White-box testing).`, `دي صفحات بتتعمل من layout program.`, `الـ Wrap-around هو web testing element رقم 8: إنك تتأكد إن الـ text بيلف صح حوالين الصور، مش content بيتغير حسب الظروف.`],
    [`الـ Spelling والـ punctuation بيتفحصوا في الـ black-box TEXT testing بتاع الصفحة، مش في الـ white-box security testing.`, `صح. الـ Security هو خامس white-box web element، والمحاضرة بتقول إننا نختبر الـ denial of service والـ buffer overflow attacks (L5, White-box testing).`, `الـ Font sizes هي item 1 في لستة الـ compatibility testing، مالهاش علاقة بالـ security.`, `الـ site map هو element 3 في الـ web testing (navigation: الـ links اللي على الـ map موجودة وشغالة)؛ مالوش أي علاقة بالـ attacks.`],
    [`صح. المحاضرة بتعرّف الـ dynamic content، أول white-box web element، إنه graphics و text بيتغيروا حسب ظروف زي وقت اليوم أو الجو أو الـ stock tickers (L5).`, `الجملة دي مطابقة لتعريف المحاضرة للـ dynamic content حرف بحرف (وقت اليوم، الجو، الـ stock tickers)، يبقى هي True.`],
    [`صح. الـ users اللي عندهم خبرة عارفين عايزين يروحوا فين وبيتجنبوا التعليمات الطويلة.`, `المحاضرة بتأيدها: الـ user الخبير عارف هو رايح فين، والـ site map بيوصّله على طول بدل ما يقرا instructions طويلة.`],
    [`الـ Gray-box testing بيخلط طرق الـ black-box والـ white-box مع بعض؛ مش بيستبدل الـ black-box tests.`, `صح. الـ Gray-box testing بيخلط الـ black والـ white-box، والهدف المذكور بتاعه إنه يعزل الـ defects اللي جاية من design وحش أو implementation وحش للـ web (L5, Gray-box testing).`, `الـ Server performance and loading ده white-box element (بنعمل simulation لملايين الـ connections)؛ الـ gray-box هدفه يعزل defects الـ design والـ implementation.`, `الـ Spelling بيتفحص في الـ black-box text testing؛ الـ gray-box testing هدفه يعزل الـ defects اللي جاية من design أو implementation وحش.`],
    [`الـ CPU types هي item 1 من الـ 7 hardware configuration checks، يعني موجودة في اللستة (L5, Configuration testing).`, `الـ Audio cards هي item 5 من الـ 7 hardware configuration checks، يعني موجودة في اللستة.`, `صح. الليستة هي CPU، RAM، graphics، video capture، audio، monitors، network cards.`, `الـ Network cards هي item 7، آخر واحدة في الـ hardware configuration checks، يعني موجودة في اللستة.`],
    [`المحاضرة بتسمح بالـ cookies؛ element 13 بيقول نختبر إنها شغالة، مش إننا نمنعها.`, `صح. Element 13 في الـ web testing بيقول نتأكد إن الـ cookies شغالة وإن الـ login information اللي متخزنة فيها encrypted (L5, Web site testing elements).`, `إن الـ login data تتخزن plain text ده عكس المطلوب بالظبط؛ المحاضرة بتقول إن الـ login information في الـ cookies لازم تبقى encrypted.`, `الـ Blinking ليه علاقة بالـ text content (قلل الـ blinking text)، مش بالـ cookies؛ الـ check بتاع الـ cookies إنها شغالة و encrypted.`],
    [`صح. لستة الـ automatic web testing tools في المحاضرة بتخلص بالـ web applications، وبتسمي Selenium و Cypress (L5, Tools).`, `الـ Excel والـ Word برامج office للـ spreadsheets والـ documents، مش web testing tools؛ المحاضرة بتسمي Selenium و Cypress.`, `الـ Git (version control) والـ Docker (containers) مش testing tools ومش في المحاضرة أصلًا؛ هي بتسمي Selenium و Cypress.`, `الـ Figma والـ Balsamiq دول design و wireframing tools؛ الـ web application testing tools في المحاضرة هي Selenium و Cypress.`]
  ],
  extra: [
    [`مواقع كتير بيبقى فيها الحاجات دي، بس شرط المحاضرة هو domain name و web host.`, `صح. الـ web site هو صفحات متجمعة تحت نفس الـ domain، ولازم يكون ليه domain name و web host.`, `دي عناصر اختيارية، مش شروط.`, `الـ 13 ده عدد عناصر الـ testing، مش عدد صفحات.`],
    [`الـ Downloading files ده فعلًا استخدام من استخدامات الـ links في المحاضرة، جنب الـ navigating والـ redirecting وفتح الـ Internet tools.`, `صح. تشفير بيانات الـ login بيتختبر تحت الـ cookies، مش استخدام من استخدامات الـ links.`, `مذكور: الـ links ممكن تفتح Internet tools تانية زي Outlook.`, `إنك توجّه الـ user لمكان تاني ده فعلًا من استخدامات الـ links المذكورة في المحاضرة.`],
    [`الـ images element موضوعه استخدام الصور عشان توصل رسالة، مش الـ text اللي حواليها.`, `الـ Tables موضوعها مكانها عشان الـ users مايفضلوش يعملوا scroll.`, `ده بيتأكد إن الـ content لسه سهل يتقري على الألوان المختارة.`, `صح. الـ Wrap-around بيتأكد إن الـ text بيلف صح حوالين الصور.`],
    [`صح. الـ Data verification بيتأكد إن الـ input مطابق للـ business rules المتحددة.`, `الـ Cookies موضوعها إن الـ data المتخزنة شغالة وبيانات الـ login encrypted.`, `ده بيتأكد إن كل التعليمات المهمة موجودة.`, `ده بيختبر الـ navigational map والـ links اللي فيها.`],
    [`الوضوح مطلوب في كل الـ links، بس الـ e-mail link لازم كمان يكون شغال فعلًا.`, `ده شغل white-box أو gray-box، مش الـ black-box check.`, `صح. ده الـ check المخصوص للـ e-mail links في المحاضرة.`, `ده server performance and loading testing.`],
    [`صح. وعشان كده الـ black-box testing بيتأكد إن كل الـ graphics بتتحمل وبتظهر صح.`, `المحاضرة بتقول ده في جزء الـ graphics في الـ black-box web testing.`],
    [`الـ Dynamic content بيتغير حسب ظروف زي وقت اليوم أو الطقس أو الـ stock tickers.`, `دي بتتعمل بإنك تدوس زرار في layout program بعد ما تدخل الـ data وتسحب العناصر.`, `الـ Security موضوعها الهجمات زي الـ denial of service والـ buffer overflow.`, `صح. أمثلة المحاضرة هي الـ catalogs والـ inventories (e-commerce).`],
    [`الـ Dynamic content هو graphics و text بيتغيروا حسب الظروف (الوقت، الجو، الـ stock tickers)؛ مش محتاج simulation لملايين الـ connections.`, `صح. المواقع المشهورة بيجيلها ملايين hits في اليوم، فلازم نعمل simulation للـ load.`, `ده موضوعه إزاي الصفحات بتتعمل، مش الـ load.`, `الـ Gray-box خليط من الـ black والـ white-box وهدفه defects الـ design/الـ implementation.`],
    [`الـ Various screen resolutions هي item 3 في لستة الـ compatibility، يعني مذكورة.`, `الـ Various font sizes هي item 1 في لستة الـ compatibility، يعني مذكورة.`, `صح. الليستة هي font sizes، browsers مع الـ CSS، screen resolutions، memory sizes، و network environments.`, `الـ Different network environments هي item 5 في لستة الـ compatibility، يعني مذكورة.`],
    [`صح. ده وصف المحاضرة للـ programmatically created pages.`, `دول بيعرضوا catalogs و inventories من database.`, `الـ Dynamic content بيتغير حسب ظروف زي الطقس أو الوقت.`, `الـ home page هي الصفحة الـ default بتاعة الـ site وفيها header واسم المصدر؛ إنك تعمل generate للـ HTML من layout program ده بيوصف الـ programmatically created pages.`]
  ]
};

AR.qa.lectures["6"] = {
  notes: [
    { h: `يعني إيه quality؟`, pts: [
      `التعريف: الـ quality معناها <b>conformance to requirements</b> (المطابقة للـ requirements). هي مجموعة الـ attributes <b>اللي الـ end-users بيقدّروها</b>.`,
      `بتتأثر بـ <b>directly measurable factors</b> (زي الـ defects) و<b>indirectly measurable factors</b> (زي الـ maintainability والـ usability).`
    ] },
    { h: `الـ 8 software quality factors` },
    { h: `الـ SQA vs الـ SQC؛ والـ testing vs الـ QA` },
    { h: `الـ Testing vs الـ QA؛ الأدوار والمهام`, pts: [
      `الـ <b>Software testing</b>: جزء من الـ SQA؛ هدفه الاكتشاف (detection-oriented)؛ بيقيّم الـ spec والـ design والـ coding؛ بيتعمل تحت conditions متحددة (normal و abnormal)؛ هدفه الأساسي: يلاقي الـ bugs ويبلّغ عنها؛ والـ testers هما اللي بيعملوه.`,
      `الـ <b>QA</b>: أوسع من الـ testing؛ بيمنع الـ defects؛ بيضمن إن الـ processes والـ standards والـ methodologies صح؛ وبيستخدم موديلات <b>ISO / CMM</b>.`,
      `<b>مهام الـ testing</b>: (1) نختار الـ test implementation approach؛ (2) ننفذ الـ tests عشان نلاقي bugs؛ (3) نجهز الـ verification والـ validation reports؛ (4) نحضر اجتماعات الـ project والـ design review.`,
      `<b>دور الـ tester</b>: يشيل مسؤولية الـ bugs اللي لقاها؛ يتابع الـ bugs طول الـ life cycle بتاعتها؛ ويقنع الـ development team إنهم يصلحوها.`,
      `<b>مسؤوليات الـ QA</b>: يفحص الـ development process؛ يلاقي تحسينات بتمنع الـ bugs؛ الـ scope بتاعه أكبر من الـ testing team؛ ويراقب ويقيّم الـ processes وأنشطة الـ testing.`,
      `<b>أمثلة لمهام الـ QA</b>: يعمل standard processes؛ يعمل guidelines (للـ requirements والـ design والـ coding)؛ يستخدم checklists لكل stage؛ ويحدد الـ quality metrics والـ criteria.`
    ] },
    { h: `الـ Quality management في الـ IT وفي الـ organizations`, pts: [
      `الـ Quality management في الـ IT غالبًا اسمه <b>ITSM (IT Service Management)</b>. الهدف: نقدم IT services بـ <b>مستوى quality متفق عليه (agreed-upon)</b>.`,
      `الـ Categories: الـ <b>IT Service Support</b> = processes لـ <b>التقديم الكفء للـ IT operational services</b>. الـ <b>IT Service Delivery</b> = processes لـ <b>الـ planning والـ control والـ management على المدى الطويل</b> للـ IT services.`,
      `الـ SQA مش testing وبس. بيشمل إننا نحط standards و methodologies، ونراقب ونقيّم الـ development process، ونصلّح الـ errors أثناء الـ development ونمنع إنها تتكرر. والـ quality metrics بتقيس إحنا حققنا الـ quality requirements لحد فين.`
    ] },
    { h: `الـ Test management والـ organization structures` },
    { h: `الـ SQA metrics والـ indicators`, pts: [
      `الـ <b>Metrics</b>: rules لقياس الـ software attributes (حجم الـ code، الـ complexity). الـ <b>Indicators</b>: variables بتعكس نتايج الـ process (عدد الـ bugs اللي اتكشفت).`,
      `الـ <b>Product metrics</b> بتقيس الـ final product (حجم الـ code، عدد الصفحات الموثقة). الـ <b>Process metrics</b> بتقيس الـ development process (الوقت اللي اتاخد، الـ methodology).`,
      `<b>9 metrics مشهورين</b>: code coverage؛ bugs per line of code؛ cyclomatic complexity؛ function point analysis؛ عدد الـ classes والـ interfaces؛ cohesion؛ coupling؛ order of growth؛ source lines of code.`
    ] },
    { h: `الـ Software quality indicators` }
  ],
  cards: [
    `المطابقة للـ requirements (conformance to requirements)؛ مجموعة الـ attributes اللي الـ end-users بيقدّروها.`,
    `الـ Direct: الـ defects. الـ Indirect: الـ maintainability والـ usability.`,
    `بيأدي الـ function المقصودة بدقة.`,
    `التحكم في الـ access والـ security.`,
    `المجهود المطلوب عشان نلاقي الـ errors ونصلحها.`,
    `المجهود المطلوب عشان نغير البرنامج.`,
    `المجهود المطلوب عشان ننقل البرنامج لـ system تاني.`,
    `الـ SQA: process، prevention، proactive. الـ SQC: product، detection، reactive.`,
    `IT Service Management: تقديم IT services بمستوى quality متفق عليه.`,
    `الـ Support: التقديم الكفء للـ operational services. الـ Delivery: الـ planning والـ control والـ management على المدى الطويل.`,
    `الـ Metrics: rules لقياس الـ attributes. الـ Indicators: variables بتعكس نتايج الـ process.`,
    `الـ Product: الـ final product (حجم الـ code، الصفحات). الـ Process: الـ development (الوقت، الـ methodology).`,
    `الـ Removal rate: اللي اتكشف واتحل. الـ Age profile: اللي ماتحلش، خلال فترة.`,
    `بيحدد الأجزاء في الـ system اللي معرضة للـ defects (defect-prone).`
  ],
  qa: [
    `الـ Code coverage، bugs per line of code، الـ cyclomatic complexity، الـ function point analysis، عدد الـ classes والـ interfaces، الـ cohesion، الـ coupling، الـ order of growth، الـ source lines of code.`,
    `الـ Testing جزء من الـ SQA، هدفه الاكتشاف، بيقيّم الـ spec والـ design والـ code تحت conditions عادية ومش عادية، بيلاقي الـ bugs ويبلّغ عنها، والـ testers هما اللي بيعملوه. الـ QA أوسع، بيمنع الـ defects، بيضمن إن الـ processes والـ standards والـ methodologies صح، وبيستخدم موديلات ISO/CMM.`,
    `الـ Small team تحت الـ development manager: تواصل سريع، بس الـ bug reports ممكن تتطنش. الـ Independent team تحت الـ project manager: الـ feedback بتاع الـ test بيتاخد في الاعتبار، بس الـ PM هو اللي بيقرر، وده خطر في المشاريع الحساسة (critical). الـ Test group اللي بيرفع تقاريره للـ executive management: QA team مستقل والـ quality reports بتوصل للـ senior management على طول.`,
    `Progress، stability، process compliance، quality evaluation effort، defect detection efficiency، defect removal rate، defect age profile، defect density، complexity.`
  ],
  quiz: [
    [`صح. الـ QA بيضمن الـ processes والـ standards والـ methodologies اللي بتطلّع quality.`, `الـ QC بيفحص الـ product ويستبعد الـ defects؛ أما الـ QA فهو النشاط الأوسع على مستوى الـ organization.`, `الـ Code coverage ده white-box testing technique وواحد من الـ 9 SQA metrics، مش activity على مستوى الـ organization كلها بتضمن الـ quality.`, `الـ Data coverage ده dynamic white-box technique بيتتبع الـ data جوه الـ code (L3)؛ مش هو الـ activity بتاعة الـ organization اللي بتضمن الـ quality.`],
    [`ناقصة. الـ tester لازم كمان يتأكد إنها اتصلحت.`, `الـ developers هما اللي بيصلحوا؛ والـ debugging مش دور الـ tester.`, `صح. الدور: يشيل مسؤولية الـ bugs، يتابعها، ويقنع الـ team إنهم يصلحوها.`, `كتابة الـ code دي شغلانة الـ developers؛ دور الـ tester إنه يلاقي الـ bugs، ويتابعها في الـ life cycle بتاعها، ويقنع الـ team إنهم يصلحوها.`],
    [`الـ SQC بيركز على الـ product وهو reactive: بيقيّم الـ product ويستبعد الحاجات اللي مش مطابقة، مش بيضمن الـ procedures.`, `صح. الـ SQA بيضمن إن الـ standards والـ procedures بتتطبق صح.`, `الـ Software testing جزء من الـ SQA هدفه الـ detection، بيلاقي الـ bugs ويبلّغ عنها؛ مش بيضمن إن الـ methods والـ procedures بتتطبق صح.`, `الـ Metrics قواعد لقياس attributes زي الـ code size والـ complexity؛ هي بتقيس الـ quality، مش بتضمن إن الـ procedures بتتطبق.`],
    [`الـ Developing standard processes هو أول مثال من أمثلة مهام الـ QA في المحاضرة، يعني فعلًا بيتعمل تحت الـ SQA.`, `عمل guidelines (للـ requirements والـ design والـ coding) ده من أمثلة مهام الـ QA في المحاضرة، يعني هو فعلًا SQA task.`, `استخدام checklists لكل stage ده من أمثلة مهام الـ QA في المحاضرة، يعني هو فعلًا SQA task.`, `صح. اختيار الـ test implementation approach ده task 1 من مهام الـ software TESTING، مش من أمثلة مهام الـ QA (processes، guidelines، checklists، metrics) (L6, Tasks of testing).`],
    [`الـ Process-focused و preventive (proactive) ده وصف الـ SQA؛ الـ SQC هو product-focused و detection-oriented.`, `صح. الـ SQC بيركز على الـ product وهو reactive: بيكتشف الـ defects، بيقيّم quality الـ product ويستبعد الحاجات اللي مش مطابقة، أما الـ SQA فبيمنعها من الأول (L6, SQA vs SQC).`, `إنك تحط standards وتتأكد إنها بتتطبق صح ده هدف الـ SQA؛ الـ SQC بيقيّم الـ product نفسه.`, `المحاضرة بتقارن بينهم: الـ SQA = process، prevention، proactive؛ الـ SQC = product، detection، reactive.`],
    [`الـ Flexibility هي المجهود عشان نغير البرنامج.`, `صح. في الـ 8 quality factors بتوع المحاضرة، الـ maintainability هي الـ effort اللي محتاجه عشان تلاقي الـ errors وتصلحها (L6, Software quality factors).`, `الـ Reliability هي إنه يأدي الـ function المقصودة بدقة.`, `الـ Portability هي النقل لـ system تاني.`],
    [`الـ Metrics هي rules لقياس attributes زي الحجم والـ complexity.`, `صح. الـ Indicators بتعكس نتايج الـ process.`, `الـ standard ده rule إجباري لازم تمشي عليه؛ عدد الـ bugs اللي اتكشفت ده قيمة بتعكس نتيجة process، يعني indicator.`, `الـ KPAs (key process areas) هي مجموعات الـ activities بتاعة الـ CMM لكل maturity level (L7)، مش measures زي عدد الـ bugs.`],
    [`الـ Support هو التقديم الكفء للـ operational services.`, `صح. الـ ITSM ليه 2 categories: الـ IT Service Support (توصيل الـ operational services بكفاءة) والـ IT Service Delivery (الـ long-term planning والـ control والـ management) (L6, Quality management in IT).`, `الـ Quality control ده فحص الـ product (SQC)، مش واحد من الـ 2 ITSM categories، اللي هما IT Service Support و IT Service Delivery.`, `الـ Configuration testing بيفحص الـ hardware setups للـ web sites (L5)؛ مش ITSM category.`],
    [`صح. الـ testers بيرفعوا تقاريرهم للـ development manager.`, `العيب بتاعه إن الـ project manager هو اللي ليه القرار النهائي.`, `لما الـ test group بيـ report للـ executive management، الـ quality team بيبقى مستقل والـ reports بتاعته بتروح للـ senior management على طول، فالـ bug reports مابتتدفنش.`, `فيه structure فعلًا فيه العيب ده: في الـ small team، الـ testers بيـ report للـ development manager، وده ممكن يتجاهل الـ bug reports.`],
    [`الـ QA هو process و prevention؛ والـ QC هو product و detection.`, `صح. الـ QA بيركز على الـ process وهو preventive (proactive)؛ الـ QC بيركز على الـ product وهو detection-oriented (reactive)، يعني مش نفس الحاجة (L6, SQA vs SQC).`],
    [`الـ defect removal rate بيعد الـ defects اللي اتكشفت واتحلّت كمان في فترة معينة؛ الـ defects اللي ماتحلتش ده الـ defect age profile.`, `صح. الـ defect age profile بيقيس الـ defects اللي ماتحلتش في فترة معينة؛ الـ removal rate بيعد اللي اتحلت (L6, Quality indicators).`, `الـ Defect density بيحدد الأجزاء في الـ system اللي معرضة للـ defects؛ مش بيتابع كام واحد لسه ماتحلش مع الوقت.`, `ده بيحكم هل جاهزين ننتقل للـ phase اللي بعدها.`]
  ],
  extra: [
    [`صح. وبتتوصف كمان إنها مجموعة الـ attributes اللي الـ end-users بيقدّروها.`, `الـ Testing طريقة نختبر بيها الـ quality، مش تعريفها.`, `عدد سطور الـ code ده metric، مش تعريف الـ quality.`, `سرعة التسليم مش تعريف المحاضرة.`],
    [`الـ Defects هي مثال المحاضرة على factor <b>DIRECTLY</b> measurable؛ والـ maintainability والـ usability هما الـ indirect.`, `صح. الـ Defects بتتقاس مباشرةً؛ والـ maintainability والـ usability هما أمثلة الـ indirect.`],
    [`الـ Flexibility هي المجهود المطلوب عشان نغير البرنامج.`, `الـ Reusability هي أنهي أجزاء ممكن تتستخدم في applications تانية.`, `صح. الـ Portability = المجهود المطلوب عشان ننقل البرنامج لـ system تاني.`, `الـ Efficiency هي الاستخدام الأمثل للـ computing resources.`],
    [`الـ Reliability هي إنه يأدي الـ function المقصودة بدقة.`, `صح. الـ Integrity = التحكم في الـ access والـ security.`, `الـ Usability هي المجهود المطلوب عشان تتعلم البرنامج وتشغّله.`, `الـ Maintainability هي المجهود المطلوب عشان نلاقي الـ errors ونصلحها.`],
    [`الـ Developing standard processes ده مثال على مهام الـ QA، مش واحدة من الـ 4 tasks بتوع الـ software testing.`, `تحديد الـ quality metrics والـ criteria ده مثال على مهام الـ QA؛ مهام الـ testing هي اختيار الـ approach، تنفيذ الـ tests، الـ reports، والـ review meetings.`, `عمل guidelines للـ requirements والـ design والـ coding ده مثال على مهام الـ QA، مش task من مهام الـ software testing.`, `صح. الـ 4 testing tasks هما: اختيار الـ test approach، تنفيذ الـ tests، تحضير الـ V&amp;V reports، وحضور الـ project و design review meetings، ودي task 4 (L6, Tasks of testing).`],
    [`في الـ small team الـ testers بيرفعوا تقاريرهم للـ development manager.`, `صح. الـ feedback بتاع الـ testing بيتاخد في الاعتبار، بس القرار النهائي في إيد الـ project manager.`, `هناك الـ QA والـ development والـ project managers كلهم بيرفعوا تقاريرهم لـ executive manager.`, `ده category من الـ ITSM، مش organization structure.`],
    [`صح. الـ Process metrics بتقيس الـ development process.`, `الـ Product metrics بتقيس الـ final product، زي حجم الـ code أو عدد الصفحات الموثقة.`, `الـ Quality factors هي attributes زي الـ reliability والـ usability.`, `الـ Defect indicators (removal rate، age profile، density) بتعد الـ defects أو بتحدد مكانها؛ وقت الـ development والـ methodology دول process metrics.`],
    [`الـ Coupling فعلًا واحد من الـ 9 common SQA metrics، جنب الـ cohesion، يعني موجود في اللستة.`, `الـ Function point analysis فعلًا واحد من الـ 9 common SQA metrics المذكورة في المحاضرة.`, `الـ Order of growth فعلًا واحد من الـ 9 common SQA metrics، ومكتوب قبل الـ source lines of code على طول.`, `صح. الـ 9 metrics هما code coverage، bugs per line، cyclomatic complexity، function points، classes and interfaces، cohesion، coupling، order of growth و SLOC؛ عدد الـ meetings مش منهم (L6).`],
    [`الـ Progress بيقيس الشغل اللي الـ developer عمله في كل phase، مش إذا كان ماشي على الـ procedures اللي اتوافق عليها ولا لأ.`, `الـ Stability بتحكم هل الـ products بتاعة الـ phase stable كفاية عشان نكمل.`, `صح. بيقيس التزام الـ developer بالـ procedures اللي اتوافق عليها.`, `الـ Defect density بتحدد الأجزاء المعرضة للـ defects في الـ system.`],
    [`استبدال الـ testers بـ tools مش موجود في المحاضرة؛ هدف الـ ITSM إنه يوصّل الـ IT services بمستوى quality متفق عليه.`, `الـ CMM levels تبع الـ maturity model في Lecture 7؛ هدف الـ ITSM إنه يوصّل الـ IT services بمستوى quality متفق عليه.`, `صح. ده هدف الـ ITSM اللي المحاضرة قالته.`, `الـ ITSM موضوعه إدارة جودة الـ services، مش كتابة code.`]
  ]
};

AR.qa.lectures["7"] = {
  notes: [
    { h: `مقدمة`, pts: [
      `أهداف الـ unit: نشرح الـ CMM؛ نوصف عناصر الـ ISO 9000؛ ونذكر الـ software engineering standards.`,
      `الـ organizations عايزة تميّز مستدام في شغل الـ IT، بس بتقابل design وحش للـ IT applications وتكاليف عالية ومشاريع متأخرة. الـ quality assurance، عن طريق الـ <b>maturity models</b> والـ procedures المنظمة، بيحدد الـ organizational structures وبيحسّن الأداء.`,
      `الـ <b>CMM</b> بيساعد في إدارة الـ IT systems المعقدة بكفاءة. الـ <b>QMS</b> (quality management system) بيدي طريقة منظمة لتحسين الـ process capability، وإدارة الـ risk، وضمان رضا العميل. الـ <b>ISO 9000</b> بيشجع الـ continuous improvement، والـ product reliability، والاعتراف الدولي.`
    ] },
    { h: `الـ Capability Maturity Model (CMM)`, pts: [
      `هو <b>standard framework لتقييم وتحسين الـ maturity</b> بتاعة الـ development process في شركة الـ software.`,
      `اتعمل بواسطة الـ <b>Software Engineering Institute (SEI)</b> و<b>Carnegie Mellon University</b> تحت <b>U.S. Department of Defense</b>.`,
      `هو approach <b>incremental من خمس levels</b>: الـ organizations بتتقدم واحدة واحدة <b>من غير ما تنط levels</b>.`,
      `متصمم أساسًا لـ organizations الـ software development، بس كمان بيتطبق على الـ software/system engineering والـ project management والـ IT والـ risk management والـ personnel management.`,
      `الـ <b>maturity model</b> بيدي levels منظمة بتوضح الـ processes بتحقق النتايج المطلوبة لحد فين. ينفع يتستخدم <b>للتقييم وللتحسين الاتنين</b>.`
    ] },
    { h: `الـ CMM structure: الـ 6 components`, pts: [
      `<b>1. الـ Maturity levels</b>: بتحدد الـ process capability؛ الـ Level 1 = ad-hoc، structure قليل جدًا؛ الـ Level 5 = المثالي، بيتدار بشكل systematic، optimized وبيتحسن باستمرار.`,
      `<b>2. الـ Process capability</b>: قدرة الـ organization إنها تحقق توقعات الـ quality بالـ processes الحالية بتاعتها؛ وبتساعد إننا <b>نتوقع</b> نتايج المشاريع الجاية.`,
      `<b>3. الـ Key Process Areas (KPA)</b>: مجموعات أنشطة مرتبطة ببعض بتحقق goals لما تتعمل مع بعض؛ وبتحدد الـ capability في كل level. مثال: الـ software project delivery planning.`,
      `<b>4. الـ Goals</b>: بتقيّم الـ practices الأساسية في الـ process area عشان نشوف هل اتطبقت بنجاح.`,
      `<b>5. الـ Common features</b>: خصائص بتوضح هل تطبيق الـ KPA ناجح ومستدام.`,
      `<b>6. الـ Key practices</b>: الأفعال والـ infrastructure المطلوبين عشان يدعموا الـ KPA. مثال: الـ software delivery schedule ماشي على procedure موثق.`
    ] },
    { h: `الـ 5 levels بتوع الـ CMM` },
    { h: `الـ Transitions، وجوانب الـ KPA، والفوايد`, pts: [
      `الأسهم اللي بين الـ levels في الشكل: 1→2 <b>basic management control</b>؛ 2→3 <b>process definition</b>؛ 3→4 <b>process measurement</b>؛ 4→5 <b>process control</b>.`,
      `كل KPA ليه <b>5 aspects</b>: الـ <b>Goals</b> (objectives بتساعد نطلع للـ level اللي بعده)، الـ <b>Commitment</b> (المتطلبات عشان نحقق الـ goals)، الـ <b>Ability</b> (أنشطة بتخلينا نقدر نحقق الـ commitments)، الـ <b>Measurement</b> (طرق المتابعة)، الـ <b>Verification</b> (طرق بتحدد الـ verification).`,
      `<b>فوايد الـ CMM</b>: (1) بسيط وسهل يتحلل؛ (2) executives كتير عارفينه أصلًا؛ (3) بيتستخدم عشان نشرح مشاكل الـ IT الكبيرة للـ senior executives؛ (4) بيساعد نجيب funding للمشاريع (زي الـ enterprise data asset management، الـ metadata repository)؛ (5) الشركات الكبيرة والحكومات بيستخدموه عشان يقارنوا نفسهم بغيرهم.`
    ] },
    { h: `الـ ISO 9000`, pts: [
      `مجموعة standards معترف بيها دوليًا نشرتها <b>International Organization for Standardization (ISO)</b>، بتحدد best practices عالمية عشان الـ organizations تحقق الـ quality requirements وتوقعات العملاء.`,
      `<b>Generic جدًا</b>: بيتطبق على <b>أي organization</b> بتقدم products أو services.`,
      `كلمة "ISO" جاية من الكلمة اليونانية <b>isos = «متساوي (equal)»</b>، وده بيعكس إنه standard عالمي للـ quality assurance.`,
      `فيه <b>20 key elements</b>؛ وكل واحد لازم يكون <b>موثق بوضوح وبالتفصيل</b> عشان نثبت الـ compliance.`
    ] },
    { h: `الـ 20 element بتوع الـ ISO 9000` },
    { h: `الـ 8 principles بتوع الـ ISO والـ software engineering standards`, pts: [
      `<b>الـ 8 quality management principles</b>: customer focus؛ leadership؛ involvement of people؛ process approach؛ system approach to management؛ continuous improvement؛ factual decision making؛ mutually beneficial supplier relationships.`,
      `الـ Software engineering standards بتضمن إن الـ development والـ testing والـ maintenance بيتعملوا صح. الـ organizations بتتحول من standards <b>محلية لـ دولية</b>. الـ <b>IEEE والـ IEEE Computer Society</b> هما اللي بيقودوا ده؛ ومن <b>1976</b> الـ IEEE بيساهم بالـ <b>IEEE Software Engineering Standard Collection</b>.`,
      `الـ <b>SPICE</b> = <b>Software Process Improvement for Capability Determination</b>؛ ومع الـ <b>ISO/IEC 15504</b> هو مبادرة مشتركة بين الـ ISO والـ IEC لـ methodology standard لتقييم الـ software process، واتقدم سنة <b>1993</b>.`,
      `<b>الـ 3 objectives بتوع الـ SPICE</b>: (1) نعمل standard framework لتقييم الـ software process؛ (2) نعمل organizational assessments للـ standards الجديدة؛ (3) نسهّل تبني تقييم الـ software process عالميًا في الصناعة.`
    ] }
  ],
  cards: [
    `Capability Maturity Model: standard framework لتقييم وتحسين الـ maturity بتاعة الـ development process في شركة الـ software.`,
    `الـ SEI و Carnegie Mellon University، تحت U.S. Department of Defense.`,
    `خمسة، ومينفعش ننط levels.`,
    `Initial، Repeatable، Defined، Quantitatively Managed، Optimizing.`,
    `Initial: ad-hoc، unstructured، reactive. مفيش processes مطلوبة.`,
    `Quantitatively managed: الـ processes متحكم فيها بـ statistical/quantitative techniques؛ و capability baselines.`,
    `Optimizing: continuous process improvement؛ وبنشيل أسباب الـ defects.`,
    `Key Process Area: أنشطة مرتبطة ببعض بتحقق goals مع بعض (زي الـ delivery planning).`,
    `Goals، commitment، ability، measurement، verification.`,
    `الكلمة اليونانية "isos" = متساوي (equal).`,
    `20.`,
    `Control of non-conforming product (الـ element رقم 13).`,
    `Inspection and testing (الـ element رقم 10).`,
    `Software Process Improvement for Capability Determination (ISO/IEC 15504)، اتقدم سنة 1993.`,
    `1976 (الـ IEEE Software Engineering Standard Collection).`
  ],
  qa: [
    `الـ Level 1 Initial: ad-hoc، unstructured، reactive؛ والـ goals بتتحقق بشكل مش مضمون. الـ Level 2 Repeatable: basic project management (planning، requirement control، change control) بيدي نجاح بيتكرر. الـ Level 3 Defined: processes standard على مستوى الـ organization كلها، والـ teams بتعدلها على مقاسها. الـ Level 4 Quantitatively Managed: تحكم statistical و quantitative، وأداء ممكن نتوقعه. الـ Level 5 Optimizing: تحسين مستمر incremental و innovative بـ quantitative goals.`,
    `Management responsibility، quality systems، contract review، design control، documentation and data control، purchasing، customer-supplied product control، product identification and traceability، process control، inspection and testing، inspection/measuring equipment، inspection and test status، control of non-conforming product، corrective and preventive action، handling/storage/packaging/delivery، quality records، internal quality audits، training، servicing، statistical techniques.`,
    `Customer focus، leadership، involvement of people، process approach، system approach to management، continuous improvement، factual decision making، mutually beneficial supplier relationships.`,
    `نعمل standard framework لتقييم الـ software process؛ نعمل organizational assessments للـ standards الجديدة؛ ونسهّل تبني تقييم الـ software process عالميًا في الصناعة.`,
    `بسيط وسهل يتحلل؛ الـ executives عارفينه؛ بيشرح مشاكل الـ IT للـ senior executives؛ بيساعد نجيب funding للمبادرات المهمة؛ والشركات الكبيرة والحكومات بيستخدموه عشان يعملوا benchmark لنفسهم.`
  ],
  quiz: [
    [`صح. كلام الـ summary: «CMM is the widely used and preferred software method of evaluation».`, `ده quality standard عام (generic)، مش طريقة التقييم المفضلة.`, `الـ Six Sigma ده statistical و data-driven methodology لتقليل الـ defects والـ variation (DMAIC، L8)، مش هو الـ software evaluation method المفضل.`, `مبادرة لتقييم الـ process، بس مش هي الإجابة هنا.`],
    [`3 levels قليل؛ الـ CMM ليه 5: Initial، Repeatable، Defined، Quantitatively Managed و Optimizing (L7).`, `صح. Initial، Repeatable، Defined، Quantitatively Managed، Optimizing.`, `4 levels ناقصهم واحد؛ الـ CMM ده incremental model من 5 levels، وآخرهم Level 5 Optimizing (L7).`, `مافيش level سادس؛ الـ CMM بيقف عند Level 5 Optimizing. الـ 6 ده عدد الـ CMM structure components، مش الـ levels.`],
    [`الـ CMM مبني من 5 maturity levels و 6 structure components، مش 20 element؛ الـ 20 element دول بتوع الـ ISO 9000.`, `الـ Six Sigma متنظم حوالين الـ DMAIC phases، مش 20 element؛ الـ 20 key elements بتوع الـ ISO 9000.`, `صح. الـ ISO 9000 فيه 20 key elements (من الـ management responsibility لحد الـ statistical techniques)، وكل واحد لازم يبقى documented بوضوح وبالتفصيل عشان تثبت الـ compliance (L7, ISO 9000).`, `الـ SPICE (ISO/IEC 15504) متعرّف بـ 3 objectives للـ software process assessment، مش 20 element.`],
    [`صح. الـ SPICE = Software Process Improvement for Capability Determination، وهو initiative مشتركة بين الـ ISO والـ IEC (ISO/IEC 15504) للـ software process assessment (L7).`, `«Capability Evaluation» شايلة معظم الاسم، والمحاضرة بتقول Determination مش Evaluation؛ الـ SPICE = Software Process Improvement for Capability Determination.`, `الـ SPICE بتقول Process مش Procedure، والاختيار ده شايل «for Capability Determination»؛ الاسم الكامل هو Software Process Improvement for Capability Determination.`, `كاتبة Procedure بدل Process وشايلة «Capability»؛ الـ SPICE = Software Process Improvement for Capability Determination.`],
    [`1985 بدري قوي؛ المحاضرة بتقول إن الـ SPICE initiative (ISO/IEC 15504) كانت سنة 1993.`, `1995 متأخرة سنتين؛ المحاضرة بتقول إن الـ SPICE اتقدمت سنة 1993.`, `2005 متأخرة جدًا؛ المحاضرة بتقول إن الـ SPICE اتقدمت سنة 1993.`, `صح. المحاضرة بتقول إن الـ SPICE project، وهو initiative مشتركة بين الـ ISO والـ IEC مع الـ ISO/IEC 15504 للـ software process assessment، اتقدم سنة 1993 (L7).`],
    [`صح. الاسم جاي من الكلمة اليونانية "isos" = متساوي.`, `الـ ISO مش مقصورة على الـ software: هي الـ International Organization for Standardization، والـ ISO 9000 بيتطبق على أي organization.`, `الـ ISO هيئة دولية، مش هندية؛ هي الـ International Organization for Standardization (من الكلمة اليوناني isos = equal).`, `الـ ISO مش هندية؛ معناها International Organization for Standardization، والـ ISO 9000 standards بتوعها معترف بيها في العالم كله.`],
    [`الـ Level 2 Repeatable بيضيف basic project management (planning، tracking، requirement control)، مش statistical control للـ processes.`, `الـ Level 3 Defined بيعمل standardization للـ processes على مستوى الـ organization كلها؛ الـ statistical والـ quantitative control بييجي في Level 4.`, `صح. في Level 4 Quantitatively Managed، الـ processes بتتحكم فيها بـ statistical و quantitative techniques عشان نتوقع الـ performance ونقلل الـ variation (L7, Five levels).`, `تحسين مستمر (بيستخدم quantitative goals، بس التحكم بالـ statistics ده level 4).`],
    [`الـ Commitment (الـ requirements اللي لازم تتحقق عشان نوصل للـ goals) فعلًا واحد من الـ 5 KPA aspects: goals، commitment، ability، measurement، verification.`, `الـ Ability (الـ activities اللي بتخليك تقدر تنفذ الـ commitments) فعلًا واحد من الـ 5 KPA aspects.`, `صح. الـ aspects هي goals و commitment و ability و measurement و verification.`, `الـ Verification (الـ methods اللي بتحدد إزاي نعمل verification) فعلًا هو خامس KPA aspect، بعد الـ goals والـ commitment والـ ability والـ measurement.`],
    [`صح. ينفع يتستخدم للتقييم وللتحسين الاتنين.`, `المحاضرة بتقول إن الـ maturity model ينفع يتستخدم للـ evaluation وللـ improvement الاتنين، يعني الجملة True.`],
    [`الـ Purchasing (element 6) بيحط requirements للـ suppliers؛ الـ procedures بتاعة الـ rejected materials هي element 13، الـ control of non-conforming product.`, `صح. Element 13 في الـ ISO 9000، الـ control of non-conforming product، بيطلب procedures عشان نحدد الحاجات المرفوضة ونفصلها وندير التعامل معاها (L7, 20 elements).`, `الـ Servicing (element 19) بيغطي الـ support بعد التسليم، مش التعامل مع الـ rejected materials.`, `الـ Training (element 18) بيحتفظ بسجلات مؤهلات الموظفين؛ الـ rejected materials تبع الـ control of non-conforming product.`],
    [`الـ ISO والـ IEC عملوا مع بعض الـ SPICE / الـ ISO/IEC 15504؛ الـ CMM جه من الـ SEI و Carnegie Mellon تحت الـ U.S. DoD.`, `صح. الـ CMM اتعمل في الـ Software Engineering Institute (SEI) و Carnegie Mellon University تحت الـ U.S. Department of Defense (L7, CMM).`, `الـ IEEE عمل الـ Software Engineering Standard Collection.`, `المحاضرة مابتقولش إن Motorola هي اللي عملت الـ CMM؛ بتنسبه للـ SEI و Carnegie Mellon University تحت الـ U.S. DoD.`]
  ],
  extra: [
    [`الـ Level 1 مفيهوش processes مطلوبة؛ والشركة دي بتعمل project management أصلًا.`, `الـ Level 3 محتاج processes standard على مستوى الـ organization كلها.`, `الـ Level 4 بيستخدم تحكم statistical و quantitative في الـ processes.`, `صح. دي تحسينات الـ Level 2 (basic project management)؛ أما الـ processes الـ standard على مستوى الـ organization كلها فدي Level 3.`],
    [`صح. الـ processes الـ standard اللي بتتعدل على المقاس والـ training على مستوى الـ organization ده Level 3.`, `الـ Level 2 هو basic project management من غير standards على مستوى الـ organization.`, `التحكم الـ statistical ناقص، فلسه ماوصلتش Level 4.`, `الـ Level 5 هو تحسين مستمر بـ change infrastructure.`],
    [`الـ Level 4 هو إننا نراقب الـ processes quantitatively ونعمل capability baselines.`, `صح. دي تحسينات الـ Level 5 (change management).`, `الـ Level 3 هو توحيد الـ processes على مستوى الـ organization.`, `الـ Level 1 هو ad-hoc ومفيش processes مطلوبة.`],
    [`الـ Basic management control ده الـ label اللي على السهم من Level 1 لـ Level 2، مش من Level 2 لـ Level 3.`, `الـ Process measurement ده label السهم من Level 3 لـ Level 4، يعني خطوة لفوق كمان.`, `الـ Process control ده label آخر سهم، من Level 4 لـ Level 5.`, `صح. 1→2 basic management control، 2→3 process definition، 3→4 process measurement، 4→5 process control.`],
    [`الـ Maturity levels هي الـ 5 مراحل اللي بتحدد الـ process capability.`, `الـ Common features بتوضح هل تطبيق الـ KPA ناجح ومستدام.`, `صح. ده تعريف المحاضرة للـ process capability.`, `الـ Goals بتقيّم الـ practices الأساسية عشان نشوف هل الـ process area اتطبقت بنجاح.`],
    [`مثال الـ KPA هو «software project delivery planning».`, `صح. الـ Key practices هي الأفعال والـ infrastructure المطلوبين عشان يدعموا الـ KPA.`, `الـ Maturity levels هي الـ 5 مراحل، مش فعل.`, `الـ Process capability هي القدرة على تحقيق توقعات الـ quality.`],
    [`الـ CMM هو approach incremental من خمس levels: الـ organizations بتتقدم واحدة واحدة من غير ما تنط levels.`, `صح. الـ organizations بتتقدم واحدة واحدة ومينفعش تنط levels.`],
    [`صح. Element 14، الـ corrective &amp; preventive action، بيتعامل مع إننا نلاقي الـ root causes بتاعة المشاكل عشان ماتتكررش (L7, 20 elements of ISO 9000).`, `الـ Control of non-conforming product (element 13) بيتعامل مع الحاجات المرفوضة اللي اتلاقت خلاص، مش مع الـ root cause اللي بيمنع التكرار.`, `الـ Audits بتختبر الـ quality system؛ أما الـ root-cause action فده element رقم 14.`, `الـ Statistical techniques (element 20) معناها استخدام tools زي الـ control charts، مش التعامل مع الـ root cause بتاع الـ defect.`],
    [`صح. الـ 8 principles بتوع الـ ISO هما customer focus، leadership، involvement of people، process approach، system approach، continuous improvement، factual decisions و supplier relations؛ الـ profit مش منهم (L7).`, `الـ Customer focus فعلًا واحد من الـ 8 quality management principles بتوع الـ ISO (أول واحد في اللستة).`, `الـ Factual decision making فعلًا واحد من الـ 8 quality management principles بتوع الـ ISO.`, `الـ Mutually beneficial supplier relationships فعلًا واحد من الـ 8 principles بتوع الـ ISO (آخر واحد في اللستة).`],
    [`الـ ISO 9000 هو الـ quality standard العام اللي فيه 20 element.`, `دي الـ collection بتاعة الـ IEEE (من 1976)، مش الـ SPICE.`, `الـ CMM من الـ SEI و Carnegie Mellon، مش من الـ ISO والـ IEC.`, `صح. الـ SPICE مع الـ ISO/IEC 15504، واتقدم سنة 1993.`]
  ]
};

AR.qa.lectures["8"] = {
  notes: [
    { h: `مقدمة وتعريفات`, pts: [
      `الـ Six Sigma من أشهر مفاهيم الإدارة في الـ <b>total quality management</b>. ظهر في <b>أواخر السبعينات وأوائل التمانينات</b> وبقى مشهور لما شركات عالمية كبيرة اعتمدته.`,
      `بيخلي الشركات تتجنب أعلى نسبة ممكنة من الـ errors وتقلل الـ quality defects على قد ما تقدر. برامج الـ quality control بتركز على تصليح الـ defects بتاعة الـ <b>design والـ industrial والـ commercial</b>.`,
      `الـ <b>Standard deviation (σ)</b>: مؤشر إحصائي للانحراف أو الـ variance أو التشتت أو عدم التماثل في الـ process بالنسبة للأهداف المطلوبة. σ = الجذر التربيعي للـ variance.`,
      `الـ Six Sigma هو <b>systematic method</b> بيستخدم معلومات مهمة جدًا وتحليل إحصائي عشان يحدد مصادر الـ errors وطرق التخلص منها؛ وبيجمع بين قياس الأداء والتحليل الإحصائي للـ errors.`,
      `هو <b>statistical management system</b> بيركز على رضا العميل، وتقليل الهدر (waste)، وتحسين الـ quality، وتحسين الأداء المالي والزمني.`,
      `بيقلل الـ process variation لحد ما النتيجة تبقى <b>3.4 defects لكل مليون</b> sample (opportunity) أو أقل. الهدف هو <b>zero defects</b> (مكتوبة "zero default" على الـ slide)، يعني نقدم للعملاء product من غير أي defects.`
    ] },
    { h: `الـ Normal distribution (الشكل)` },
    { h: `الـ 3.4 مقابل الـ 0.002 ppm`, pts: [
      `الشكل بيوضح المنحنى وهو في النص (centred): الـ ±6σ بتسيب 0.002 ppm بس بره. أما الرقم المشهور <b>3.4 defects per million</b> فجاي من إننا بنسمح للـ process mean إنه <b>يزحف 1.5σ (drift)</b> على المدى الطويل (6 − 1.5 = 4.5σ من ناحية واحدة). النقطة الأخيرة دي معلومة عامة عن الـ Six Sigma، مش موجودة على الـ slide.`,
      `<b>Background formula</b> (مش على الـ slides، مفيدة لو اتسألت): DPMO = defects ÷ (units × opportunities per unit) × 1,000,000. مثال: 25 defects في 500 unit وكل واحدة فيها 10 opportunities → 25 ÷ 5,000 × 10⁶ = <b>5,000 DPMO</b> (yield 99.5%، يعني حوالي 4.1σ مع الـ shift بتاع 1.5σ). عند 6σ، الـ DPMO = 3.4.`
    ] },
    { h: `الـ DMAIC methodology`, pts: [
      `<b>D – Define</b>: نحدد إيه اللي محتاج يتحسن بإننا نحدد المشاكل بدقة. الـ problem statement بيشمل <b>مستوى (level)</b> المشكلة، و<b>مكانها (location)</b>، و<b>تأثيرها المالي (financial impact)</b>. و<b>نكوّن team</b> يحلها.`,
      `<b>M – Measure</b>: نخطط وننفذ قياس الأداء مقارنة بمتطلبات العملاء وتوقعاتهم، باستخدام criteria لقياس الـ defects بـ statistical control tools.`,
      `<b>A – Analyze</b>: نحلل الـ data عشان نلاقي الـ <b>root causes</b> لكل المشاكل: نحلل سلسلة أسباب الفشل، نرتبها حسب تأثيرها، نصنفها، وبعدين نتحكم فيها وندير.`,
      `<b>I – Improve</b>: نغير الـ processes عشان نتخلص من الـ defects والتكلفة الزيادة والهدر؛ ندرس أسباب الفشل، نلاقي حلول، <b>نجربها على sample</b> من المنتجات، نشوف النتايج ونصحح.`,
      `<b>C – Control</b>: نفضل نراقب (عمرنا ما نبطل): نقيس معايير الأداء باستمرار، نعمل القياس، ونصحح الانحرافات في الوقت المحدد.`,
      `الـ slide كمان بتعرض الـ <b>DMADV</b> (Define، Measure، Analyze، Design، Verify)، وده بيتستخدم لتصميم processes/products <b>جديدة</b>؛ أما الـ DMAIC فبيحسّن الـ processes <b>الموجودة</b>.`
    ] },
    { h: `الـ Principles ومراحل التطبيق`, pts: [
      `<b>الـ Principles</b>: التركيز على العملاء؛ قرارات مبنية على حقايق و data دقيقة؛ التركيز على العمليات والأنشطة الداخلية؛ إدارة فعالة مبنية على التخطيط المسبق؛ teamwork تعاوني، ونتجنب المنافسة.`,
      `<b>مراحل التطبيق</b>: (1) نحدد ونختار المشاريع المهمة؛ (2) نخصص موظفين عندهم خبرة لمهام التحسين؛ (3) نجهز document مكتوب عن المشكلة/المشروع (الأسباب، الأهداف، الـ scope)؛ (4) training على القياس، والتحليل، وإعادة تصميم الـ process، والتخطيط، وحل المشاكل؛ (5) ننفذ ونطبق حلول عملية؛ (6) نقدم الحلول.`
    ] },
    { h: `حالة عملية: حالات الرسوب في الشهادة الإعدادية`, pts: [
      `جدول فيه 10 مواد (X1–X10) بيدي لكل مادة الـ mean والـ standard deviation وقيمة "Six sigma". عمود الـ Six Sigma هو <b>6 × standard deviation</b>: مثلًا X1: 6 × 1.22 = 7.32؛ X2: 6 × 0.98 = 5.88؛ الإجمالي: 6 × 1.07 = 6.42 (الـ mean الإجمالي 2.99).`,
      `تطبيق الـ DMAIC: <b>Define</b> أسباب الرسوب → <b>Measure</b> حجم تأثيرها → <b>Analyze</b> المصادر والعناصر → <b>Improve</b> بإننا نطلّع حلول → <b>Control</b> بالمتابعة المستمرة. وده بيقلل حالات الرسوب ويزود النجاح.`
    ] },
    { h: `الـ Belts والـ tools` },
    { h: `الـ Six Sigma tools and techniques`, pts: [
      `<b>5S</b>، <b>Seven Wastes</b>، <b>Value stream mapping</b>، <b>Visual workspace</b>، <b>Voice of Customer (VOC)</b>، <b>Kaizen</b>، <b>Kanban</b>، <b>Regression analysis</b>.`
    ] }
  ],
  cards: [
    `3.4 defects لكل مليون opportunity أو أقل (الهدف: zero defects).`,
    `الـ Standard deviation = الجذر التربيعي للـ variance.`,
    `أواخر السبعينات وأوائل التمانينات.`,
    `Define، Measure، Analyze، Improve، Control.`,
    `Define، Measure، Analyze، Design، Verify (للتصميمات الجديدة).`,
    `تحديد المشكلة بدقة (الـ level، الـ location، الـ financial impact) وتكوين team.`,
    `نلاقي الـ root causes، نرتبها حسب التأثير، نصنفها، ونتحكم فيها.`,
    `نغير الـ processes؛ نجرب الحلول على sample من المنتجات؛ ونصحح.`,
    `نقيس الأداء باستمرار، نعمل القياس، ونصحح الانحرافات في وقتها.`,
    `99.73% (2,700 ppm بره الـ spec).`,
    `كل الموظفين.`,
    `الموظفين التنفيذيين (executive employees).`,
    `الإدارة الوسطى والعليا (middle and senior management).`,
    `الإدارة العليا (senior management).`,
    `Defects ÷ (units × opportunities) × 1,000,000.`
  ],
  qa: [
    `الـ Six Sigma هو statistical management methodology بيقلل الـ process variation لـ 3.4 defects لكل مليون أو أقل، وهدفه zero defects ورضا العميل. بيستخدم الـ DMAIC: Define المشكلة (الـ level، الـ location، الـ financial impact) ونكوّن team؛ Measure الأداء مقارنة بمتطلبات العملاء بـ statistical tools؛ Analyze الـ data عشان نلاقي الـ root causes ونرتبها؛ Improve الـ processes ونجرب الحلول على sample؛ Control بالمتابعة المستمرة وتصحيح الانحرافات.`,
    `التركيز على العملاء؛ قرارات مبنية على حقايق و data دقيقة؛ التركيز على العمليات الداخلية؛ إدارة فعالة مبنية على التخطيط المسبق؛ teamwork تعاوني من غير منافسة.`,
    `الـ Yellow: كل الموظفين. الـ Green: الموظفين التنفيذيين. الـ Black: الإدارة الوسطى والعليا. الـ Master Black: الإدارة العليا. (والشكل كمان بيبدأ بـ White Belt.)`,
    `DPMO = 25 / (500 x 10) x 1,000,000 = 25 / 5,000 x 1,000,000 = 5,000 DPMO، يعني حوالي 4.1 sigma. ده تمرين background، مش على الـ slides.`
  ],
  quiz: [
    [`صح. «Six Sigma reduces process variation… The aim of six sigma is to reach zero default».`, `الـ SPICE (ISO/IEC 15504) ده standard لتقييم الـ software process (L7)؛ مش هدفه إنه يقلل الـ variation لحد zero defects.`, `الـ CMM ده maturity framework من خمس levels لتقييم وتحسين الـ development process (L7)، مش method لتقليل الـ variation.`, `الـ ISO 9000 ده مجموعة generic من 20 quality element لازم يتوثقوا (L7)؛ أما تقليل الـ process variation لحد zero defects فده الـ Six Sigma.`],
    [`الـ target بتاع الـ Six Sigma هو 3.4 defects لكل <b>مليون</b> opportunity؛ 3.4 لكل ألف معناها أسوأ بألف مرة.`, `صح. الـ Six Sigma بيقلل الـ process variation لحد ما النتيجة تبقى 3.4 defects لكل مليون sample (opportunity) أو أقل، والهدف zero defects (L8, Definitions).`, `الـ 2,700 ppm دي النسبة اللي بره الـ ±3σ في شكل الـ normal distribution، وده أعلى بكتير من الـ target بتاع الـ Six Sigma (3.4 لكل مليون).`, `الـ 68.27% دي نسبة القيم اللي جوه الـ ±1σ في شكل الـ normal distribution، مش defect rate أصلًا.`],
    [`الـ M والـ A بس اللي صح؛ الـ D معناها Define (مش Design)، والـ I معناها Improve (مش Implement)، والـ C معناها Control (مش Check).`, `صح. الـ DMAIC = Define, Measure, Analyze, Improve, Control، ودي طريقة الـ Six Sigma لتحسين الـ processes الموجودة (L8, DMAIC).`, `الـ D والـ C بس اللي صح؛ الـ M معناها Measure (مش Manage)، والـ A معناها Analyze (مش Audit)، والـ I معناها Improve (مش Inspect).`, `الـ D معناها Define (مش Develop) والـ C معناها Control (مش Close)؛ وخلي بالك إن آخر phase في الـ Six Sigma عمرها ما بتوقف المراقبة، فمش ممكن تبقى «close».`],
    [`صح. في الـ Define بنحدد المشكلة بالظبط: مستواها ومكانها وتأثيرها المالي، وبنكوّن team يحلها (L8, DMAIC).`, `الـ Measure بيخطط وينفذ قياس الأداء.`, `الـ Analyze بيدرس الـ data عشان يلاقي الـ root causes ويرتبها؛ أما تحديد المشكلة وتكوين الـ team فبيحصلوا قبل كده، في الـ Define.`, `الـ Control هي آخر phase: مراقبة مستمرة وتصحيح الـ deviations بعد الـ improvement، مش تكوين الـ team.`],
    [`الـ Measure بيخطط وينفذ قياس الأداء مقارنةً بـ requirements العميل؛ لسه مفيش حلول اتلاقت أصلًا، فما بالك نختبرها.`, `الـ Analyze بيلاقي الـ root causes بتاعة المشاكل ويرتبها؛ إننا نلاقي حلول ونجربها على sample ده بييجي في الـ Improve.`, `صح. الـ Improve بيغيّر الـ processes عشان يشيل الـ defects والـ waste: ندرس أسباب الفشل، نلاقي حلول، نجربها على sample من المنتجات، نشوف النتايج ونصحح (L8, DMAIC).`, `الـ Define بيحدد المشكلة (مستواها ومكانها وتأثيرها المالي) وبيكوّن الـ team؛ لسه مفيش حلول عشان نختبرها.`],
    [`الـ 68.27% دي اللي جوه الـ ±1σ (و 317,300 ppm بره)، مش الـ ±3σ.`, `الـ 95.45% دي اللي جوه الـ ±2σ (و 45,500 ppm بره)، مش الـ ±3σ.`, `صح. شكل الـ normal distribution بيقول إن 99.73% جوه الـ ±3σ، فبيفضل 2,700 ppm بره الـ spec (L8, Normal distribution).`, `الـ 99.9937% دي اللي جوه الـ ±4σ (و 63 ppm بره)، يعني خطوة بعد الـ ±3σ.`],
    [`كل الموظفين بياخدوا الـ Yellow Belt؛ الـ Green Belt للموظفين التنفيذيين (executive employees) (L8, Belts).`, `صح. في جدول الـ belts الـ Green Belt بيتطبق على الـ executive employees؛ والـ Yellow لكل الموظفين، والـ Black للـ middle والـ senior management (L8, Belts).`, `الـ middle والـ senior management بياخدوا الـ Black Belt، وده مستوى فوق الـ Green Belt.`, `الـ senior management بس بياخدوا الـ Master Black Belt، وده أعلى belt؛ أما الـ Green Belt فللـ executive employees.`],
    [`الـ Kaizen (تحسينات صغيرة مستمرة) <b>موجود</b> فعلًا في list الـ tools والـ techniques بتاعة الـ Six Sigma في المحاضرة.`, `الـ Voice of Customer (VOC) <b>موجود</b> فعلًا في list الـ tools بتاعة الـ Six Sigma، جنب الـ 5S والـ Kaizen.`, `صح. ده software metric (L6)، مش Six Sigma tool.`, `الـ Value stream mapping <b>موجود</b> فعلًا في list الـ tools والـ techniques بتاعة الـ Six Sigma في المحاضرة.`],
    [`الـ 0.98 ده الـ σ نفسه؛ عمود الـ Six Sigma في الجدول = 6 × σ = 6 × 0.98 = 5.88.`, `صح. عمود الـ Six Sigma في الـ case study = 6 × الـ standard deviation: يعني 6 × 0.98 = 5.88، زي X1: 6 × 1.22 = 7.32 (L8, Case study).`, `الـ 6.98 = 6 + 0.98، يعني جمعت بدل ما تضرب؛ الـ Six Sigma = 6 × 0.98 = 5.88.`, `الـ 2.94 = 3 × 0.98 وده three sigma؛ الجدول بيستخدم six: يعني 6 × 0.98 = 5.88.`],
    [`نسيت الـ 10 opportunities لكل unit (25/500 × 10⁶).`, `صح. الـ DPMO = defects ÷ (units × opportunities) × 10⁶ = 25 ÷ (500 × 10) × 10⁶ = 25 ÷ 5,000 × 10⁶ = 5,000 (L8 notes, background formula).`, `الـ 500 أصغر من الإجابة بعشر مرات (زي لو ضربت في 10⁵ بدل 10⁶): الصح 25 ÷ 5,000 × 1,000,000 = 5,000.`, `الـ 3.4 ده الـ target DPMO بتاع الـ Six Sigma، مش قيمة الـ process دي؛ الحساب: 25 ÷ 5,000 × 10⁶ = 5,000.`],
    [`الـ principle هو الـ teamwork التعاوني، وإننا نتجنب المنافسة.`, `صح. الـ principles بتاعة الـ Six Sigma: التركيز على العملاء، قرارات مبنية على حقائق و data دقيقة، التركيز على العمليات الداخلية، التخطيط المسبق، والـ teamwork التعاوني (L8, Principles).`, `الحدس (intuition) عكس الـ principle بالظبط: قرارات الـ Six Sigma لازم تكون مبنية على حقائق و data دقيقة.`, `التركيز على العملاء هو أول principle في الـ Six Sigma، والطريقة كلها هدفها رضا العميل.`]
  ],
  extra: [
    [`الـ 317,300 ppm دول اللي بره الـ ±1σ (68.27% جوه)، مش الـ ±2σ.`, `الـ 2,700 ppm دول اللي بره الـ ±3σ (99.73% جوه)، مش الـ ±2σ.`, `صح. الـ ±2σ بتغطي 95.45%، وبتسيب 45,500 ppm بره.`, `الـ 63 ppm دول اللي بره الـ ±4σ (99.9937% جوه)، مش الـ ±2σ.`],
    [`ده بيضرب الـ variance في 6 بدل الـ σ.`, `صح. σ = √variance = √0.25 = 0.5، وقيمة الـ Six Sigma في الـ case study = 6 × σ = 6 × 0.5 = 3 (L8, Case study).`, `الـ 0.5 = √0.25 ده الـ σ نفسه؛ قيمة الـ Six Sigma = 6 × 0.5 = 3.`, `الـ 6.25 = 6 + 0.25 يعني جمعت 6 على الـ variance؛ الصح تاخد σ = √0.25 = 0.5، وبعدين 6 × 0.5 = 3.`],
    [`الـ Define بيحدد المشكلة (الـ level، الـ location، الـ financial impact) وبيكوّن الـ team.`, `الـ Improve بيغير الـ processes وبيجرب الحلول على sample.`, `صح. الـ Analyze بيلاقي الـ root causes، ويرتبها حسب التأثير، ويصنفها.`, `الـ Control بيفضل يراقب ويصحح الانحرافات.`],
    [`صح. الـ Control معناه متابعة مستمرة وتصحيح الانحرافات.`, `الـ Measure بيخطط وينفذ قياس الأداء مقارنة بمتطلبات العملاء قبل التحسين.`, `الـ Analyze بيلاقي الـ root causes بتاعة المشاكل ويرتبها قبل الـ improvement؛ أما المراقبة المستمرة بعد الـ improvement فدي الـ Control.`, `الـ Define بيحدد المشكلة وبيكوّن الـ team.`],
    [`الـ DMAIC (Define, Measure, Analyze, Improve, Control) بيحسّن الـ processes <b>الموجودة</b>؛ أما الـ design الجديد فبيستخدم الـ DMADV.`, `الـ ISO 9000 ده quality standard، مش Six Sigma approach.`, `الـ CMM ده maturity model، مش Six Sigma approach.`, `صح. الـ DMADV لتصميم processes/products جديدة.`],
    [`بدري قوي؛ المحاضرة بتقول أواخر السبعينات وأوائل التمانينات.`, `صح. المحاضرة بتقول إن الـ Six Sigma ظهر في أواخر السبعينات وأوائل التمانينات، وانتشر لما شركات عالمية كبيرة اعتمدته (L8, Introduction).`, `الـ 1993 هي السنة اللي اتقدم فيها الـ SPICE (L7)؛ الـ Six Sigma ظهر في أواخر السبعينات وأوائل التمانينات.`, `متأخر قوي؛ ده كان مشهور مع الشركات العالمية الكبيرة من قبلها بكتير.`],
    [`الـ Yellow Belt لكل الموظفين، مش مخصوص للـ middle والـ senior management.`, `صح. في جدول الـ belts الـ Black Belt بيتطبق على الـ middle والـ senior management؛ والـ Master Black Belt للـ senior management بس (L8, Belts).`, `الـ Green Belt للـ executive employees، وده مستوى تحت الـ Black Belt.`, `الـ White Belt هو step 1، مستوى البداية في شكل الـ certification، مش للـ middle والـ senior management.`],
    [`التدريب على الـ measurement والـ analysis والـ process redesign ده phase 4، بعد ما المشاريع تتختار والموظفين يتعينوا والمشكلة تتوثق.`, `تطبيق الحلول العملية ده phase 5، قرب الآخر، قبل تقديم الحلول على طول (phase 6).`, `تجهيز document مكتوب للمشكلة (الأسباب والأهداف والـ scope) ده phase 3، بعد اختيار المشاريع وتعيين الموظفين.`, `صح. مراحل التطبيق: (1) نحدد ونختار المشاريع المهمة، (2) نعيّن موظفين عندهم خبرة، (3) نوثّق المشكلة، (4) تدريب، (5) تطبيق، (6) تقديم (L8).`],
    [`صح. الـ ±6σ بتغطي 99.9999998%، وبتسيب 0.002 ppm بره في الشكل.`, `الشكل بيقول إن 99.9999998% جوه الـ ±6σ، يعني 0.002 ppm بره.`],
    [`صح. Define الأسباب → Measure تأثيرها → Analyze المصادر → Improve → Control.`, `في الـ case study الـ Define بيحدد أسباب الرسوب؛ أما قياس حجم تأثيرها فده الخطوة اللي بعدها، الـ Measure.`, `الـ Improve بيطلّع حلول لأسباب الرسوب؛ وده بييجي بعد ما تأثيرها يتقاس ومصادرها تتحلل.`, `الـ Control هو آخر خطوة، المتابعة المستمرة بعد تطبيق الحلول، مش قياس تأثير الأسباب.`]
  ]
};

AR.qa.exams = [
  { sections: [
    { items: [
      { why: `الـ CMM هو الـ standard framework لتقييم الـ process maturity؛ والـ summary بيقول «CMM is the widely used and preferred software method of evaluation» (L7).`, ow: [null, `الـ ISO 9000 ده مجموعة generic من 20 quality element موثقين لأي organization، مش الطريقة المفضلة لتقييم الـ software processes (L7).`, `الـ Six Sigma ده method إحصائي لتقليل الـ process variation والـ defects (L8)، مش طريقة لتقييم الـ software.`, `الـ SPICE (ISO/IEC 15504) مبادرة لتقييم الـ process من 1993، بس المحاضرة بتقول إن الـ CMM هو الـ widely used and preferred method.`] },
      { why: `Initial، Repeatable، Defined، Quantitatively Managed، Optimizing (L7).`, ow: [`تلاتة قليلين؛ الـ CMM فيه خمسة: Initial, Repeatable, Defined, Quantitatively Managed, Optimizing (L7).`, null, `أربعة ناقصين واحد؛ الـ CMM ده incremental model من خمس levels آخرها Level 5 Optimizing (L7).`, `مفيش level سادس؛ الـ 6 دي عدد الـ structure components بتاعة الـ CMM، أما الـ maturity levels فخمسة (L7).`] },
      { why: `الـ ISO 9000 فيه 20 key element (management responsibility، quality systems، … statistical techniques)، وكل واحد لازم يتوثق بشكل واضح وكامل عشان تثبت الـ compliance (L7).`, ow: [`الـ CMM مبني من 5 maturity levels و 6 structure components، مش 20 element (L7).`, `الـ Six Sigma متنظم حوالين phases الـ DMAIC، مش 20 element (L8).`, null, `الـ SPICE متعرّف بـ 3 objectives لتقييم الـ software process، مش 20 element (L7).`] },
      { why: `الـ ISO 9000 «بيشجع الـ continuous improvement والـ product reliability والاعتراف الدولي»، والـ summary بيقول «ensures consistent processes, reduces errors and risks, increases customer trust». ممكن حد يقول Six Sigma برضه (رضا العميل)، بس ده إجابة سؤال #5، فالـ ISO 9000 هو الأنسب هنا.`, ow: [`الـ CMM بيقيّم ويحسّن الـ process maturity على خمس levels؛ المحاضرة مابتوصفهوش إنه بيقلل الأخطاء ويزوّد ثقة العميل.`, `الـ SPICE ده standard framework لتقييم الـ software process؛ مش متقال عليه إنه بيقلل الأخطاء ويبني ثقة العميل.`, `الـ Six Sigma فعلًا بيحسّن الـ processes عشان رضا العميل، بس هدفه المميز (سؤال 5) هو تقليل الـ variation لحد zero defects؛ والـ summary بيربط الصياغة دي بالـ ISO 9000.`, null] },
      { why: `L8: الـ Six Sigma بيقلل الـ process variation لـ 3.4 defects لكل مليون؛ وهدفه zero defects («zero default»).`, ow: [null, `الـ SPICE (ISO/IEC 15504) ده standard لتقييم الـ software process (L7)؛ مش هدفه zero defects عن طريق تقليل الـ variation.`, `الـ CMM ده maturity framework من خمس levels (L7)، مش method إحصائي لتقليل الـ process variation.`, `الـ ISO 9000 مجموعة من 20 quality element موثقين (L7)؛ تقليل الـ variation لـ 3.4 defects لكل مليون ده الـ Six Sigma (L8).`] },
      { why: `الـ Verification: «هل إحنا بنبني الـ product صح؟»، وبنتأكد منه مقارنة بالـ specification (L2).`, ow: [null, `الـ Validation بيتأكد إن الـ software بيحقق requirements الـ <b>user</b> («are we building the right product?»)، مش الـ specification بتاعته (L2).`, `الـ Design ده development activity بيحدد الـ structure بتاع الـ software؛ مش process للتأكد والمراجعة.`, `الـ Requirements هي الحاجة اللي بنقارن بيها الـ software، مش process للتأكد؛ والتأكد مقارنة بالـ specification اسمه verification.`] },
      { why: `الـ QA هو النشاط اللي على مستوى الـ organization كلها (processes، standards، prevention) واللي بيضمن products بـ quality (L6). أما الـ QC فبيفلتر الـ product بس.`, ow: [null, `الـ QC مركز على الـ product وبيشتغل reactive: بيفحص المنتج ويفلتر الـ defects، مش النشاط اللي بيضمن الجودة على مستوى الـ organization كلها (L6).`, `الـ Code coverage ده white-box technique وواحد من الـ SQA metrics (L3، L6)، مش quality activity على مستوى الـ organization.`, `الـ Data coverage ده dynamic white-box technique بيتتبع الـ data جوه الـ code (L3)، مش نشاط على مستوى الـ organization.`] },
      { why: `الـ Validation: «هل إحنا بنبني الـ product الصح؟»، زي الـ user acceptance testing (L2).`, ow: [null, `الـ Verification بيقارن الـ product بالـ <b>specification</b> بتاعته («are we building the product right?»)، مش بـ requirements الـ user (L2).`, `الـ Design ده development activity بيحدد الـ structure بتاع الـ software؛ مش process للتأكد والمراجعة.`, `الـ Requirements هي اللي بنقارن بيها الـ product، مش الـ process نفسها؛ والتأكد مقارنة باحتياجات الـ user اسمه validation.`] },
      { why: `الـ Formal review = peer review، walkthrough، inspection (L3).`, ow: [null, `الـ Peer review ده واحد من التلات formal reviews جنب الـ inspection، مش الـ stage اللي الـ inspections تحتها (L3).`, `الـ Code coverage (statement، path، condition) ده dynamic white-box testing وبيشغّل الـ code؛ أما الـ inspection فـ static (L3).`, `الـ Data coverage (data flow، sub-boundaries، error forcing) ده dynamic white-box testing؛ أما الـ inspection فـ formal review (L3).`] },
      { why: `الـ 3 أسباب للـ standards والـ guidelines: reliability، readability/maintainability، portability (L3).`, ow: [`الـ Scalability مش من الـ 3 أسباب بتوع الـ standards والـ guidelines: reliability، readability/maintainability، portability (L3).`, null, `الـ Usability مش من الـ 3 أسباب بتوع الـ standards والـ guidelines: reliability، readability/maintainability، portability (L3).`, `الـ Compatibility مش في الـ list؛ السبب القريب منها هو الـ portability (الـ code يشتغل على hardware و compilers مختلفة) (L3).`] },
      { why: `دور الـ tester: يشيل مسؤولية الـ bugs، يتابعها، ويقنع الـ developers إنهم يصلحوها (L6).`, ow: [`إنك تلاقي الـ bugs ده نص الدور بس: الـ tester لازم كمان يتابعها ويقنع الـ team يصلحوها (L6).`, `تصليح الـ bugs ده debugging وبيعمله الـ developers؛ الـ tester بيلاقي الـ bugs ويتابعها ويتأكد إنها اتصلحت (L3، L6).`, null, `كتابة الـ code شغل الـ developers؛ هدف الـ tester إنه يلاقي الـ bugs ويتأكد إنها اتصلحت (L6).`] },
      { why: `BVA/EP: الـ 9000 = invalid boundary (لازم يترفض)، الـ 9001 = valid boundary، الـ 9999 = قيمة valid. كلهم test cases مفيدة، وده متوافق مع الـ summary key.`, ow: [`الـ 9000 test مطلوب (الـ invalid boundary، لازم يترفض) بس مش هو الوحيد؛ الـ 9001 والـ 9999 كمان test cases valid.`, `الـ 9001 هو الـ valid left boundary، بس مش الحالة المفيدة الوحيدة؛ الـ 9000 (invalid boundary) والـ 9999 (قيمة valid) كمان tests.`, `الـ 9999 قيمة valid من الـ accepted class، بس الـ 9000 (invalid boundary) والـ 9001 (valid boundary) كمان tests مطلوبة.`, null] },
      { why: `X=2, Y=0 بس هي اللي بتخلي جزئين الـ AND يبقوا true، فـ A=A/X بتتنفذ.`, ow: [`مع الـ AND لازم الجزئين يبقوا true؛ X=3,y=1 و X=2,y=1 فيهم Y≠0 فبيعدّوا A=A/X، فمش كل الاختيارات شغالة.`, `الـ Y=1 بيخلي (Y=0) false، فالـ AND بيفشل والـ A=A/X عمرها ما بتتنفذ؛ والـ statement coverage محتاج كل statement يتنفذ.`, `الـ X&gt;1 متحقق بس Y=1 بيخلي (Y=0) false، فالـ AND بيفشل والـ A=A/X بتتعدّى.`, null] },
      { why: `مع الـ OR، كل اختيار بيخلي جزء واحد على الأقل true، فـ A=A+1 بتتنفذ في التلاتة.`, ow: [`ده شغال (X=2 بتخلي الـ OR true)، بس الحالتين التانيين شغالين برضه، فـ «All answers» هو الاختيار الكامل.`, `ده شغال (الجزئين true)، بس الحالات التانية كمان بتنفذ A=A+1، فـ «All answers» هو الاختيار الكامل.`, `ده شغال (y=2 &gt; 1 بتخلي الـ OR true)، بس الحالات التانية كمان بتنفذ A=A+1، فـ «All answers» هو الاختيار الكامل.`, null] },
      { why: `X=2,Y=0,A=4: A=4/2=2، وبعدين X=2 بتبقى true فـ A=3، والـ statements الاتنين بيتنفذوا. الاختيار (A) بيدي A=1/3 والـ IF التاني بيبقى false. والاختيار (B) بيخلي أول IF يبقى false.`, ow: [`أول IF بيبقى true: A = 1/3. تاني IF: X≠2 و A=0.33 مش &gt;1، فـ A=A+1 بتتعدّى؛ يعني مش كل الـ statements اتنفذت.`, `الـ X=0 بتخلي X&gt;1 false، فـ A=A/X بتتعدّى (حتى لو A=4 بعد كده بتنفذ A=A+1).`, `X=2,Y=0,A=4 بس اللي بتنفذ الـ statements الاتنين؛ كل واحدة من التانيين بتعدّي واحد، فمش كل الإجابات شغالة.`, null] },
      { why: `الـ Dynamic testing = إنك تشغّل الـ software وتستخدمه (L2).`, ow: [`«Requirement testing» مش مصطلح من المحاضرة؛ المحاضرة بتقسم الـ testing لـ static (مش شغال) و dynamic (شغال) (L2).`, `الـ Static testing بيفحص حاجة <b>مش</b> شغالة، زي مراجعة الـ spec أو الـ code (L2).`, `«Analysis testing» مش مصطلح من المحاضرة؛ اختبار الـ software وهو شغال اسمه dynamic testing (L2).`, null] },
      { why: `الـ Guidelines بتساعد تمشي على الـ standards ومش mandatory (L3).`, ow: [`الـ Standards هي rules إلزامية لازم نلتزم بيها، فإنك تحطها مع الـ guidelines غلط (L3).`, `الـ Standards هي الـ rules الإلزامية؛ أما التعليمات اللي مش إلزامية أوي فهي الـ guidelines (L3).`, null, `المحاضرة بتدي إجابة مباشرة: الـ guidelines بتساعدك تمشي على الـ standards ومش mandatory أوي (L3).`] },
      { why: `الـ Standards هي rules لازم نلتزم بيها (L3).`, ow: [`الـ Guidelines بتساعد الواحد يمشي على الـ standards بس، ومش mandatory أوي (L3).`, null, `الـ standards بس هي اللي mandatory؛ الـ guidelines مش إلزامية أوي (L3).`, `المحاضرة بتدي إجابة مباشرة: الـ standards هي rules لازم نلتزم بيها (L3).`] },
      { why: `L4: «a simple sequence of create, push, and pop might achieve MM testing».`, ow: [null, `الـ stack فيه push مش insert، فالـ push عمره ما بيتختبر؛ والـ MM محتاج كل method تتنادى مرة: create و push و pop (L4).`, `الـ pop عمرها ما بتتنادى، فيه method مش متختبرة؛ الـ MM testing محتاج create و push و pop (L4).`, `الـ insert مش method في الـ stack والـ pop ناقصة؛ الـ MM sequence في المحاضرة هي create و push و pop (L4).`] },
      { why: `دول التلات أجزاء بتوع الـ static white-box testing (L3).`, ow: [null, `الـ Dynamic white-box بيغطي testing the pieces والـ data coverage والـ code coverage، ودول بيشغّلوا الـ code؛ أما الـ reviews فـ static (L3).`, `الـ Static black-box بيراجع الـ specification (زي الـ user manual) من غير ما يعرف الـ code؛ أما الـ phases دي فبتفحص الـ code (L3).`, `الـ Dynamic black-box بيشغّل الـ software من غير ما يعرف الـ code؛ أما الـ formal والـ code reviews فبيفحصوا الـ code من غير ما يشغّلوه (L3).`] }
    ] },
    { items: [
      { why: `L7 «Five Levels of CMM» وجدول Table 1. اذكر أسامي الخمسة بالترتيب.`,
        ans: `<b>Level 1 – Initial</b> (inconsistent management): الـ processes بتبقى ad-hoc و unstructured و reactive ومش ثابتة؛ الـ project management مش مستقر؛ ومفيش processes مطلوبة.<br><b>Level 2 – Repeatable</b> (project management): الـ basic project management (planning، requirement control، product modifications) بيدي نجاح بيتكرر؛ بنخطط للمشاريع ونتابعها، وبندير الـ suppliers والـ configurations.<br><b>Level 3 – Defined</b> (process management): processes standard بتتحدد وبتتحسن على مستوى الـ organization كلها؛ والـ teams بتعدلها على مقاسها؛ و training على مستوى الـ organization.<br><b>Level 4 – Quantitatively Managed</b> (capability management): الـ processes متحكم فيها بـ statistical و quantitative techniques؛ الأداء ممكن نتوقعه؛ capability baselines؛ و variation قليلة جدًا.<br><b>Level 5 – Optimizing</b> (change management): continuous process improvement عن طريق تطويرات incremental و innovative بـ quantitative goals؛ وبنشيل أسباب الـ defects.<br>الـ levels بتتطلع بالترتيب ومينفعش ننط أي level.` },
      { why: `slides الـ DMAIC في L8. ممكن تزود الـ principles أو الـ belts عشان تفاصيل أكتر.`,
        ans: `الـ Six Sigma هو statistical management methodology بيقلل الـ process variation لـ <b>3.4 defects لكل مليون</b> أو أقل (الهدف: zero defects). بيستخدم الـ <b>DMAIC</b>:<br><b>Define</b>: نحدد المشكلة بدقة (الـ level، الـ location، الـ financial impact) ونكوّن team.<br><b>Measure</b>: نقيس الأداء مقارنة بمتطلبات العملاء بـ statistical tools.<br><b>Analyze</b>: نلاقي الـ root causes، نرتبها حسب التأثير، ونصنفها.<br><b>Improve</b>: نغير الـ processes عشان نشيل الـ defects والتكلفة والهدر؛ ونجرب الحلول على sample.<br><b>Control</b>: نراقب باستمرار، نقيس، ونصحح الانحرافات في وقتها.` }
    ] },
    { items: [
      { why: `L7. طريقة حفظ بالمجموعات: الإدارة (1–3)، الـ design/الـ docs/الشرا (4–7)، الـ product والـ process (8–13)، التصحيح والـ logistics (14–15)، السجلات/الـ audits/الناس (16–18)، ما بعد البيع والإحصاء (19–20).`,
        ans: `1 Management responsibility · 2 Quality systems · 3 Contract review · 4 Design control · 5 Documentation & data control · 6 Purchasing · 7 Customer-supplied product control · 8 Product identification & traceability · 9 Process control · 10 Inspection & testing · 11 Inspection/measuring equipment · 12 Inspection & test status · 13 Control of non-conforming product · 14 Corrective & preventive action · 15 Handling/storage/packaging/delivery · 16 Quality records · 17 Internal quality audits · 18 Training · 19 Servicing · 20 Statistical techniques.` },
      { why: `L6 «Examples of Common Metrics».`,
        ans: `1 Code coverage · 2 Bugs per line of code · 3 Cyclomatic complexity · 4 Function point analysis · 5 Number of classes and interfaces · 6 Cohesion · 7 Coupling · 8 Order of growth · 9 Source lines of code.<br>(الـ Metrics هي rules لقياس الـ software attributes. الـ Product metrics بتقيس الـ final product؛ والـ process metrics بتقيس الـ development process.)` }
    ] },
    { items: [
      { why: `ده مثال الـ stack بتاع المحاضرة بس الـ push بقت insert والـ pop بقت delete. الـ queue diagram فيه نفس الـ states (Empty، Normal، Full) ونفس الـ transitions.`,
        ans: `<b>MM</b>: الـ sequence البسيطة <b>create (new)، insert، delete</b> بتنادي كل method مرة واحدة على الأقل.<br><b>Function pairs</b> (نفس pattern الـ stack، 14 pair):<br>1. new – delete (على empty، error)<br>2. new – insert<br>3. insert (from empty) – insert<br>4. insert (from empty) – delete<br>5. insert (normal→normal) – insert (لسه normal)<br>6. insert (normal→normal) – insert (بقى full)<br>7. insert (normal→normal) – delete<br>8. insert (normal→full) – insert (error)<br>9. insert (normal→full) – delete<br>10. delete (normal→normal) – insert (لسه normal)<br>11. delete (normal→normal) – delete (لسه normal)<br>12. delete (normal→normal) – delete (بقى empty)<br>13. delete (into empty) – insert<br>14. delete (into empty) – delete (error)` },
      { why: `L5 الأجزاء 2 و 8.3.`,
        ans: `<b>1. الـ Black-box</b>: الـ <b>text</b> (الجمهور، الـ terminology، الدقة، الـ spelling، بيانات التواصل)، الـ <b>hyperlinks</b> (الـ destination الصح، نفس الـ window أو window جديدة، واضحة، e-mail links)، الـ <b>graphics</b> (بتتحمل وبتظهر صح)، الـ <b>forms</b> (متحطة صح، الحجم صح، بتقبل الـ data الصح، بترفض الـ data الغلط).<br><b>2. الـ Gray-box</b> ممكن عشان الـ web pages متبنية من HTML و scripts الـ tester يقدر يشوفها (view source) وهو لسه بيختبر من ناحية الـ user، فينفع نخلط الـ black-box بالـ white-box. الهدف منه إنه يعزل الـ defects اللي ليها علاقة بـ design وحش أو implementation وحش للـ web.<br><b>3. الـ White-box</b>: الـ <b>dynamic content</b> (وقت اليوم، الطقس، الـ stock tickers)، الـ <b>database-driven pages</b> (catalogs الـ e-commerce)، الـ <b>programmatically created pages</b>، الـ <b>server performance and loading</b> (ملايين الـ hits)، الـ <b>security</b> (denial of service، buffer overflow).` }
    ] },
    { items: [
      { why: `نسخة من جدول «Test cases for a full condition coverage» في L3، بالتاريخ الجديد. الـ case اللي فيها true/true بس هي اللي بتطبع "Happy New Year".`,
        ans: `<b>الـ Branch coverage</b> (الـ IF يبقى true مرة و false مرة)، 2 tests:<table><tr><th>Date$</th><th>Time$</th><th>Lines</th></tr><tr><td>01-01-2026</td><td>00:00:00</td><td>1,2,3,4,5,6,7</td></tr><tr><td>01-01-2025</td><td>11:11:11</td><td>1,2,5,6,7</td></tr></table><b>الـ Condition coverage</b> (كل condition تبقى true و false؛ وكل الـ combinations زي المحاضرة)، 4 tests:<table><tr><th>Date$</th><th>Time$</th><th>Lines</th></tr><tr><td>01-01-2025</td><td>11:11:11</td><td>1,2,5,6,7</td></tr><tr><td>01-01-2025</td><td>00:00:00</td><td>1,2,5,6,7</td></tr><tr><td>01-01-2026</td><td>11:11:11</td><td>1,2,5,6,7</td></tr><tr><td>01-01-2026</td><td>00:00:00</td><td>1,2,3,4,5,6,7</td></tr></table>` },
      { why: `slides المثلث في L4. الـ slide بتعتبر (1,2,4) و (3,2,5) «bad inputs»، بس حسب الـ pseudocode هما بيطبعوا "not a triangle" (مفيش ضلع ≤ 0)، فاستخدمنا هنا أضلاع سالبة/صفر.`,
        ans: `<b>الـ Function (black-box) testing</b>: الـ subdomains هي scalene، isosceles، equilateral، not a triangle، bad inputs:<br>الـ Scalene: (3,4,5)، (5,4,3)، (4,5,3).<br>الـ Isosceles: (5,5,8)، (5,8,5)، (8,5,5)، (8,8,5)، (8,5,8)، (5,8,8).<br>الـ Equilateral: (5,5,5).<br>الـ Not a triangle: (6,4,2)، (4,6,2)، (1,2,3).<br>الـ Bad inputs: (−1,2,4)، (0,−2,5)، (0,0,0).<br><b>الـ Statement coverage</b> (جدول المحاضرة بـ (3,4,5)، (3,5,3)، (0,1,0)، (4,4,4)):<br>(3,4,5) → scalene؛ (3,5,3) → isosceles؛ (4,4,4) → equilateral؛ (0,1,0) → سطور الـ not-a-triangle والـ bad-inputs الاتنين بيتنفذوا، وبيطبع "bad inputs".<br>أقل set هي <b>(4,4,4) و (0,1,0)</b>، واللي مع بعض بينفذوا كل الـ statements من A لـ K.` }
    ] }
  ] },
  { sections: [
    { items: [
      { why: `جدول L1: الـ 1988–2000 = prevention-oriented. الـ summary key غلط.`, ow: [null, `جدول التطور في L1 بيحط الـ 1988–2000 في فترة الـ prevention-oriented (نمنع الـ defects بالـ test design والـ planning بدري)، فالجملة صح.`] },
      { why: `اكتشاف نقط الضعف ده objective رقم 4 من الـ 6 objectives بتوع الـ testing في L1 (مع الـ business requirements، ومسك الـ bugs، والـ stability، ودرجة الـ quality، والـ user acceptability).`, ow: [null, `اكتشاف نقط الضعف مذكور صراحةً كـ objective رقم 4 للـ software testing في L1، فالجملة صح.`] },
      { why: `ده الـ System Engineering. الـ Analysis = feasibility و goals و performance و interface requirements (L1).`, ow: [`تحديد الـ software والـ hardware requirements الاتنين ده phase الـ System Engineering في الـ Waterfall؛ أما الـ Analysis فبيغطي الـ feasibility والـ goals والـ performance والـ interface requirements (L1).`, null] },
      { why: `ابدأ بالـ test-to-pass، وبعدين الـ test-to-fail (L2).`, ow: [`المحاضرة بتقول ابدأ بالـ test-to-pass (تتأكد إنه شغال على الأقل بـ input عادي)، وبعد كده بس الـ test-to-fail (L2).`, null] },
      { why: `L3 بيعدّ الأسماء التانية للـ white-box testing: glass box و structural و open box و clear box testing، عشان هو بيفحص الشغل الداخلي للـ code.`, ow: [null, `L3 بيدي clear box و glass box (ومعاهم structural و open box) كأسماء للـ white-box testing، فالجملة صح.`] },
      { why: `الـ Black-box (behavioral) testing بيشتغل من غير ما يعرف الـ internal logic (L2)؛ والـ glass box ده اسم للـ <b>white-box</b> testing، اللي بيفحص الـ code (L3).`, ow: [`الـ Black-box testing مابيبصّش على الـ code خالص (L2)؛ والـ glass box اسم تاني للـ white-box testing (L3).`, null] },
      { why: `الـ walkthrough بيبقى فيه group من 5 أو 6 programmers و testers (L3).`, ow: [null, `الـ walkthrough بيتعرض على group من 5 أو 6 programmers و testers، أما الـ peer review فبيبقى programmer مع كام reviewer بس، فالـ walkthrough عدده أكتر (L3).`] },
      { why: `L3: الـ standards هي rules لازم نلتزم بيها (mandatory)، أما الـ guidelines فتعليمات بتساعدك تمشي عليها ومش إلزامية أوي.`, ow: [null, `المحاضرة بتعرّف الـ standards إنها rules لازم نلتزم بيها؛ اللي مش إلزامي أوي هو الـ guidelines (L3).`] },
      { why: `الـ BVA اتدرس كـ black-box technique (L2) وممكن يتستخدم كمان في الـ white-box testing.`, ow: [`الـ Boundary testing اتدرس كـ black-box technique في L2 (زي إنك تجرب 0 و 256 لـ field من 1–255)، فمش مقصور على الـ white-box.`, null] },
      { why: `ده تعريف الـ equivalence partitioning (L2).`, ow: [null, `ده تعريف الـ equivalence partitioning في L2: case واحدة من كل class كفاية، فبنقلل الـ test cases من غير ما الـ quality تقل.`] },
      { why: `التكلفة بتزيد من الـ requirements (قليلة) لحد الـ production (مكلفة جدًا جدًا) (L1).`, ow: [`العكس هو الصح: التكلفة بتزيد من قليلة في الـ requirements، لمتوسطة في الـ coding، لمكلفة جدًا في الـ testing، لمكلفة جدًا جدًا في الـ production (L1).`, null] },
      { why: `الـ QA هو process و prevention؛ والـ QC هو product و detection (L2، L6).`, ow: [`الـ QA مركز على الـ process وبيمنع (preventive)؛ الـ QC مركز على الـ product وبيصحح (detection)، فهما مختلفين (L2، L6).`, null] },
      { why: `L5 بيعرّف الـ dynamic content، أول white-box web element، إنه graphics و text بيتغيروا على حسب conditions زي وقت اليوم أو الطقس أو الـ stock tickers.`, ow: [null, `الجملة بتكرر تعريف الـ dynamic content في L5 (وقت اليوم، الطقس، الـ stock tickers)، فهي صح.`] },
      { why: `L7 بيقول إن الـ maturity model بيدي levels منظمة بتوضح الـ processes بتحقق النتايج قد إيه، وينفع يتستخدم للتقييم وللتحسين الاتنين.`, ow: [null, `L7 بيقول إن الـ maturity model ينفع يتستخدم للتقييم وللتحسين الاتنين، فاستخدامه للتقييم صح.`] },
      { why: `ده تعريف Myers من عصر الـ destruction-oriented (1979–1982)، لما الـ tests كانت بتتصمم عشان تلاقي errors (L1, Evolution of testing).`, ow: [null, `ده تعريف Myers، أساس الـ destruction-oriented testing (1979–1982) في L1، اللي فيه الـ tests بتتصمم عشان تلاقي errors.`] }
    ] },
    { items: [
      { why: `الـ Structural testing اسم تاني للـ white-box testing، اللي بيفحص الشغل الداخلي للـ code الحقيقي (L3).`, ow: [null, `الـ Functional testing ده black-box: بيشيك على الـ inputs والـ outputs مقارنةً بالـ requirements من غير ما يبص على الـ code (L2).`, `الـ Static testing بيفحص حاجة مش شغالة (زي مراجعة الـ spec)؛ مش بيختبر الـ code بيشتغل إزاي فعلًا (L2).`, `الـ Black-box testing بيشتغل من غير ما يعرف الـ internal logic، فمش ممكن يختبر الـ code بيشتغل إزاي (L2).`] },
      { why: `الـ System testing بيختبر الـ system كله مقارنة بالـ specifications بتاعته (L2).`, ow: [`الـ Agile testing ده testing بدري ومركز على العميل جوه دورات الـ agile (sprint-based validation)، مش level بييجي بعد الـ integration (L2).`, `الـ Unit testing بيختبر أصغر components (functions أو modules) قبل الـ integration، مش الـ system كله (L2).`, null, `الـ Acceptance testing بيعمله الـ user/customer عشان يتأكد من الـ business requirements؛ أما مقارنة الـ system المتجمع بالـ specifications بتاعته فده الـ system testing (L2).`] },
      { why: `L3 بيعدّ الأسماء التانية للـ white-box testing: glass box و structural و open box و clear box testing.`, ow: [`«Structural analysis» مش الاسم اللي في المحاضرة؛ الـ white-box اسمه structural <b>testing</b> أو glass box أو open box أو clear box (L3).`, `الـ Gray-box testing ده <b>خليط</b> من الـ black-box والـ white-box (L5)، مش اسم تاني للـ white-box.`, null, `الـ Functional testing ده black-box (behavioral) testing، عكس الـ white-box (L2).`] },
      { why: `تعريف L3. الحسابات = computation errors؛ والـ loops = control flow.`, ow: [null, `الـ variables اللي مش متعملها initialization بتتشيك تحت الـ data reference errors (variables مش متعرفة أو متعملها initialization صح)؛ أما تعريف الـ data declaration فهو الـ declaration الغلط (L3).`, `الحسابات الغلط دي computation errors (أنواع متلخبطة، overflow، قسمة على صفر) في الـ checklist بتاع L3.`, `سلوك الـ loops والـ control structures الغلط ده control flow error في الـ checklist بتاع L3.`] },
      { why: `الـ CMM فيه خمس maturity levels: Initial و Repeatable و Defined و Quantitatively Managed و Optimizing، وبنطلعهم من غير ما نفوّت level (L7).`, ow: [`level واحد مايبقاش model؛ الـ CMM فيه خمس levels من Initial لـ Optimizing (L7).`, `اتنين بيوصلوا لحد Repeatable بس؛ الـ CMM بيكمل لـ Defined و Quantitatively Managed و Optimizing (خمس levels) (L7).`, `تلاتة بيقفوا عند Defined؛ الـ CMM فيه كمان Level 4 Quantitatively Managed و Level 5 Optimizing (L7).`, null] },
      { why: `الشكل بيوضح bottom-up و top-down و umbrella approach.`, ow: [null, `الـ Static white-box testing (reviews، standards، checklists) بيفحص الـ code من غير ما يشغّله؛ مش integration strategy (L3).`, `الـ Black-box testing ده approach عام من غير معرفة بالـ code، مش واحد من الـ integration strategies (bottom-up، top-down، umbrella) (L3).`, `الـ Code review (checklist) جزء من الـ static white-box testing، مش integration testing strategy (L3).`] },
      { why: `L2 بيعرّف الـ static testing إنه فحص ومراجعة حاجة مش شغالة، أما الـ dynamic testing فمعناه إنك تشغّل الـ software وتستخدمه.`, ow: [`الـ Dynamic testing عكسه بالظبط: إنك تشغّل الـ software وتستخدمه (L2).`, `الـ System testing بيشغّل الـ system المتجمع كله عشان يتأكد إنه بيحقق الـ specifications بتاعته (L2).`, `الـ Integration testing بيشغّل الـ modules مع بعض عشان يختبر الـ interfaces بينهم (L2)، يعني الـ software شغال.`, null] },
      { why: `الـ Data coverage بيشمل data flow و sub-boundaries و error forcing (L3).`, ow: [null, `الـ Code coverage (statement، path، condition) بيشيك أنهي code اتنفذ؛ أما الـ sub-boundaries فنوع من الـ data coverage (L3).`, `الـ Inspections دي formal review static للـ code بيعملها حد غير اللي كتبه، مش dynamic test لأحجام الـ data (L3).`, `الـ walkthrough ده static review الكاتب فيه بيعرض الـ code؛ مابيختبرش الـ sub-boundaries (L3).`] },
      { why: `tools الـ L8: 5S، seven wastes، value stream mapping، visual workspace، VOC، Kaizen، Kanban، regression analysis.`, ow: [null, `الـ Selenium والـ Cypress دول tools لاختبار الـ web applications (L5)، مش tools بتاعة الـ Six Sigma.`, `الـ Peer review ده formal review في الـ static white-box testing (L3)، مش tool بتاع الـ Six Sigma.`, `الـ SPICE ده standard لتقييم الـ software process (ISO/IEC 15504، L7)، مش tool بتاع الـ Six Sigma.`] }
    ] }
  ] }
];

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
    [`صح. الـ demonstration-oriented testing كان بيتأكد إن الـ software ماشي على الـ specifications بتاعته.`, `ده الـ destruction-oriented testing (عصر Myers).`, `ده الـ evaluation-oriented (verification و validation).`, `ده الـ prevention-oriented.`],
    [`ده سوء التواصل بين الـ teams.`, `صح. الـ developers ممكن يغلطوا في الـ logic أو الـ syntax.`, `ده عن الـ testers اللي بيفوّتوا مشاكل مستخبية.`, `ده عن الـ deadlines الضيقة.`],
    [`صح. الـ stage اللي فوق على الشمال هي اللي بتطلّع الـ acceptance test plan.`, `دي بتطلّع الـ system test plan.`, `دي بتطلّع الـ integration test plan.`, `دي في جنب الـ testing، مش المكان اللي بتتكتب فيه الـ plans.`],
    [`صح. المحاضرة بتقول إن 1988–2000 كانت prevention-oriented. الـ summary key معلّمها False، وده بيتعارض مع الـ slide.`, `جدول المحاضرة بيقول بوضوح إن 1988–2000 = prevention-oriented.`],
    [`ده هيبقى زرار مش شغال.`, `ده مثال الـ crash/freeze.`, `صح. سلوك زيادة مش متحدد في الـ spec هو condition 3.`, `الـ Condition 5 هو وجهة نظر العميل في الـ usability.`],
    [`الـ resource bugs هي buffer overflow و access violations و uninitialized variables.`, `الـ logical bugs هي infinite loops و conditions غلط.`, `صح. مشاكل الـ concurrency هي co-programming bugs.`, `دي الـ documentation القديمة والملفات المش متطابقة.`],
    [`أرخص stage.`, `تكلفة متوسطة.`, `مكلفة جدًا، بس مش الأسوأ.`, `صح. بتضر السمعة وممكن تجيب غرامات مالية أو قانونية.`],
    [`الـ Analysis بيغطي الـ feasibility والـ goals والـ performance والـ interface requirements.`, `صح. بيحدد الـ software والـ hardware requirements اللي محتاجينها للـ development.`, `الـ Design بيحوّل الـ requirements لـ structure.`, `الـ Maintenance بيصلّح ويعمل updates بعد التسليم.`],
    [`الـ Spiral معتمد على الـ prototypes.`, `المحاضرة بتقول اتنين أو تلاتة.`, `صح.`, `كتير قوي؛ المحاضرة بتقول اتنين أو تلاتة.`],
    [`الـ functional code بييجي تاني، وبيتكتب عشان يعدّي الـ tests.`, `صح. الـ step 1 هي «create the test code».`, `مش جزء من الـ TDD.`, `الـ refactoring هي آخر step.`],
    [`الـ Spiral مناسب للمشاريع المعقدة.`, `عيب الـ V-model هو الـ requirements الناقصة.`, `صح. دول بالظبط العيبين بتوع الـ RAD.`, `الـ Agile بيتعامل مع المشاريع المعقدة اللي فيها تغيير.`]
  ],
  extra: [
    [`هدف Miller إننا نأكد الـ quality، مش إننا نثبت إن مفيش bugs خالص.`, `تصليح الـ defects ده debugging؛ هدف Miller إننا نأكد الـ quality عن طريق testing متحكم فيه.`, `صح. ده هدف الـ testing عند Miller زي ما هو مقتبس في المحاضرة.`, `Miller بيأكد على التشغيل <b>الـ systematic</b> في ظروف <b>متحكم فيها بعناية</b>، يعني عكس الاستخدام العشوائي.`],
    [`صح. كتابة الـ code ده development، مش objective من objectives الـ testing.`, `ده objective رقم 4 في ليستة المحاضرة.`, `ده objective رقم 5 في ليستة المحاضرة.`, `ده objective رقم 6 في ليستة المحاضرة.`],
    [`الـ spec ذكرت السلوك ده فعلًا (ومنعته)، فهو مش سلوك مش مذكور.`, `الـ Condition 5 هو وجهة نظر العميل في الـ usability والسرعة، مش سلوك ممنوع.`, `هنا الـ spec بتغطي السلوك بشكل صريح، فالـ condition 4 مش منطبق.`, `صح. الـ spec بتمنع المسح من غير confirmation والـ software بيعمل كده بالظبط.`],
    [`الـ resource bugs هي buffer overflows و access violations و uninitialized variables.`, `صح. الـ divide-by-zero والـ rounding errors هما أمثلة المحاضرة على الـ math bugs.`, `الـ co-programming bugs هي deadlocks و race conditions ومشاكل الـ concurrency.`, `الـ team working bugs هي documentation قديمة وملفات مش متطابقة و incorrect linking.`],
    [`الـ destruction-oriented testing كان بيصمم tests عشان يلاقي errors (عصر Myers).`, `صح. المحاضرة بتقول إن الـ evaluation-oriented testing هو اللي دخّل الـ verification والـ validation.`, `في الفترة دي الـ testing كان معناه ببساطة debugging.`, `الـ prevention-oriented testing ركّز على الـ test design والـ planning بدري عشان يمنع الـ defects.`],
    [`الـ Requirement هي أرخص stage، والـ integration بييجي قبل الـ testing في التكلفة.`, `الـ Coding متوسط (أرخص من الـ integration) والـ production هو الأغلى.`, `ده الترتيب بالعكس: الـ production هو الأغلى، مش الأرخص.`, `صح. قليلة → متوسطة → أعلى → مكلفة جدًا → مكلفة جدًا جدًا.`],
    [`صح. الـ System design ↔ integration test plan ↔ integration test.`, `ده بييجي من الـ requirements specifications stage.`, `ده بييجي من الـ functional specifications stage.`, `دول بييجوا من الـ unit design stage.`],
    [`بالعكس: الـ development ماشي من high → low level (نازل في الجنب الشمال) والـ testing ماشي من low → high level (طالع في الجنب اليمين).`, `صح. الـ development ماشي من high level لـ low level، والـ testing ماشي من low level (unit) لـ high level (acceptance).`],
    [`دي step 1، قبل ما الـ functional code يتكتب.`, `الـ refactoring هي آخر step (step 5).`, `صح. الترتيب: create test code → write/modify functional code → create additional tests → test the functional code → refactor.`, `دي step 4؛ الـ additional tests بتتعمل الأول (step 3).`],
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
    [`صح. الـ Validation = «هل إحنا بنبني الـ product الصح؟» (زي الـ UAT).`, `الـ Verification بيتأكد مقارنة بالـ specification.`, `مش process للتأكد.`, `مش process للتأكد.`],
    [`test صحيح (invalid boundary: لازم يترفض)، بس مش هو الوحيد.`, `test صحيح (أول قيمة valid)، بس مش هو الوحيد.`, `test صحيح (قيمة valid عادية)، بس مش هو الوحيد.`, `صح. الـ 9000 هي الـ invalid boundary، والـ 9001 هي الـ valid boundary، والـ 9999 قيمة valid: كلهم test cases مفيدة للـ BVA/EP.`],
    [`مش مصطلح من المحاضرة.`, `الـ Static testing بيفحص حاجة <b>مش</b> شغالة.`, `مش مصطلح من المحاضرة.`, `صح. الـ Dynamic testing معناه إنك تشغّل الـ software وتستخدمه.`],
    [`الـ White box بيبص على الـ code، مش على وجهة نظر الـ user.`, `الـ Automation موضوعه الـ tools، مش وجهة النظر.`, `عام قوي.`, `صح. مذكور ضمن مميزات الـ black-box.`],
    [`الـ Test-to-pass بيستخدم حالات عادية.`, `صح. بيجبره يطلع errors باستخدام input متطرف أو مش طبيعي.`, `الـ Data testing موضوعه تقسيم الـ data.`, `الـ State testing بيختبر الـ states والـ transitions.`],
    [`ده الـ upper boundary لشهر فبراير في السنة الكبيسة، بس مش هو الوحيد.`, `ده الـ upper boundary لشهر فبراير، بس مش هو الوحيد.`, `صح. آخر يوم بيعتمد على الشهر: 28، 29، 30 و 31 كلهم boundaries.`, `دي boundaries لشهور تانية، بس محتاجين كمان 28 و 29.`],
    [`مش document.`, `الـ test case هو input و conditions و expected output.`, `صح (الـ summary كاتبها "test plane").`, `نوع testing، مش document.`],
    [`دول الـ valid boundaries.`, `صح. واحد تحت الـ minimum وواحد فوق الـ maximum.`, `الاتنين valid.`, `قيمة في النص، مش boundary.`],
    [`فيه كمان invalid classes.`, `فيه 2 invalid classes، وزيادة عليهم واحدة valid.`, `صح. بين 18 و 60 (valid)، أقل من 18 (invalid)، أكبر من 60 (invalid).`, `الـ 6 ده عدد الـ test cases في مثال الـ 5-digit، مش عدد الـ classes هنا.`],
    [`صح. Off → play → fast forward → fast forward بتزور الأربع states كلهم.`, `محتاجين اتنين عشان نغطي كل الـ transitions، مش كل الـ states.`, `مش محتاجين test case لكل state.`, `الـ 8 ده عدد الـ transitions.`],
    [`ده dynamic test-to-fail.`, `صح. بيختبر من غير تشغيل وهدفه documentation كاملة وواضحة.`, `ده white-box testing.`, `ده performance testing.`]
  ],
  extra: [
    [`القيمتين في نفس الـ valid class؛ والـ 2 invalid classes ماتختبروش.`, `التلاتة من الـ valid class، فالـ invalid classes اتفوّتت.`, `دول بيغطوا الـ 2 invalid classes بس؛ والـ valid class ناقصة.`, `صح. الـ 3 في الـ invalid class بتاعة «أقل من 6»، والـ 8 في الـ valid class 6–12، والـ 15 في الـ invalid class بتاعة «أكتر من 12».`],
    [`الـ 50 قيمة في النص؛ والـ invalid boundaries اللي هي 0 و 100 ناقصين.`, `صح. الـ 1 والـ 99 هما الـ valid edges؛ والـ 0 والـ 100 بره على طول (زي 0 و 256 في الـ text field بتاع 1–255).`, `دول الـ invalid boundaries بس؛ والـ valid edges اللي هما 1 و 99 ناقصين.`, `دول جوه الـ range ومش هما الأطراف.`],
    [`الـ 100 هي الـ valid left boundary.`, `الـ 1000 هي الـ invalid <b>RIGHT</b> boundary (فوق 999 على طول).`, `صح. هي تحت أقل قيمة valid على طول، زي 09999 في مثال المحاضرة.`, `الـ 550 قيمة valid في النص.`],
    [`صح. الأول اتأكد إنه شغال بالحد الأدنى بـ input عادي، وبعدين اضغط عليه بالـ test-to-fail.`, `الـ Test-to-fail بييجي بعد الـ test-to-pass، زي ما بتعمل crash-test للعربية بعد ما تسوقها عادي بس.`, `الـ Static testing مابيشغّلش الـ software، فهو مش approach من الـ dynamic black-box.`, `الـ Debugging بيصلّح الـ bugs؛ مش approach للـ dynamic black-box test.`],
    [`المحاضرة بتقول إن شكله test-to-pass، بس إنت كمان بتجبره يطلع error، فغالبًا في الآخر هو الاتنين.`, `صح. هو بيختبر error message متحددة في الـ spec (test-to-pass) بس كمان بيجبره يطلع error (test-to-fail)، فغالبًا هو الاتنين.`],
    [`صح. الفكرة إننا <b>نقلل</b> عدد الـ tests؛ والـ exhaustive testing مش واحدة من الـ 5 طرق.`, `دي الطريقة 1.`, `دي الطريقة 4.`, `دي الطريقة 3.`],
    [`ده البند 1 في الـ map.`, `ده البند 2 في الـ map.`, `صح. الـ map بتترسم من وجهة نظر الـ user؛ وسطور الـ code دي بتاعة الـ white-box testing.`, `ده البند 3 في الـ map.`],
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
    [`صح. الـ Formal review = peer review و walkthrough و inspection.`, `الـ Peer review أخو الـ inspection (في نفس المستوى)، مش الأب بتاعه.`, `الـ Code coverage ده dynamic white-box.`, `الـ Data coverage ده dynamic white-box.`],
    [`مش من الـ 3 أسباب.`, `صح. الأسباب هي reliability و readability/maintainability و portability.`, `مش من الـ 3 أسباب.`, `مش من الـ 3 أسباب (الـ portability منهم، الـ compatibility لأ).`],
    [`الـ Standards إلزامية (mandatory).`, `الـ Standards لازم نلتزم بيها.`, `صح. الـ Guidelines بتساعدك تمشي على الـ standards بس مش mandatory.`, `فيه اختيار صح موجود.`],
    [`الـ Guidelines مش mandatory أوي.`, `صح. الـ Standards هي rules لازم نلتزم بيها.`, `الـ standards بس هي اللي mandatory.`, `فيه اختيار صح موجود.`],
    [`صح. دول التلات أجزاء بتوع الـ static white-box testing.`, `الـ Dynamic white-box بيغطي testing the pieces والـ data coverage والـ code coverage.`, `الـ Static black-box بيراجع الـ specification.`, `الـ Dynamic black-box بيشغّل الـ software من غير معرفة بالـ code.`],
    [`اختيار واحد بس هو اللي بيخلي الـ condition تبقى true.`, `الـ Y=0 بتبقى false، فـ A=A/X عمرها ما بتتنفذ.`, `الـ Y=0 بتبقى false، فالـ statement بتتنط.`, `صح. X&gt;1 و Y=0 الاتنين true، فـ A=A/X بتتنفذ وكل statement بتتنفذ.`],
    [`ده شغال (X=2 بتبقى true)، بس الباقيين كمان شغالين.`, `ده شغال، بس الباقيين كمان شغالين.`, `ده شغال (y&gt;1 بتبقى true)، بس الباقيين كمان شغالين.`, `صح. مع الـ OR، كل case بتخلي الـ condition تبقى true، فـ A=A+1 بتتنفذ في التلاتة.`],
    [`أول IF بيبقى true: A=1/3. التاني: X≠2 و A=0.33 مش &gt;1، فـ A=A+1 بتتنط.`, `أول IF بيبقى false (X&gt;1 مش متحققة)، فـ A=A/X بتتنط.`, `اختيار واحد بس هو اللي بينفذ الـ statements الاتنين.`, `صح. أول IF بيبقى true: A=4/2=2. التاني IF: X=2 بتبقى true، فـ A=3. الـ statements الاتنين بيتنفذوا.`],
    [`ده بيراجع الـ specifications.`, `صح. الـ Testing بيلاقي الـ bugs؛ والـ debugging بيصلّحها.`, `ده بيلاقي الـ bugs، مش بيصلّحها.`, `ده بيلاقي الـ bugs؛ والـ debugging هو اللي بيصلّحها.`],
    [`دول بيخصوا الـ loops والـ control structures.`, `صح. نفس الـ type بس بأحجام مختلفة ده من checks الـ computation errors.`, `دول بيخصوا الـ uninitialized variables وحدود الـ array.`, `دول بيخصوا &lt; مقابل &lt;= والـ Boolean operands.`],
    [`صح. الشكل بيوضح bottom-up و top-down و umbrella تحت الـ integration testing.`, `الـ Top-down أخو الـ umbrella (في نفس المستوى).`, `الـ Bottom-up أخو الـ umbrella (في نفس المستوى).`, `الـ Integration testing ده dynamic.`],
    [`الـ Static معناه إنه مش شغال.`, `صح. المحاضرة بتعرّف الـ dynamic white-box testing على إنه validation check.`, `الـ Black-box مابيستخدمش معرفة بالـ code.`, `الـ review ده static.`],
    [`مش إجابة الـ slide.`, `مش إجابة الـ slide.`, `مش إجابة الـ slide.`, `دي إجابة الـ slide/الـ summary. خد بالك: في C الحقيقية الموضوع بالعكس (0 = false، و non-zero = true). اختار «C» بس لو الامتحان كرر كلام الـ slide.`],
    [`ده الـ inspection.`, `صح. اللي كتب الـ code بيعرضه على team من 5 أو 6.`, `العملاء مابيعرضوش code.`, `مش هو اللي بيعرض في الـ walkthrough.`]
  ],
  extra: [
    [`صح. الـ Behavioral testing اسم تاني للـ <b>BLACK-box</b> testing.`, `مذكور كاسم تاني للـ white-box testing.`, `مذكور كاسم تاني للـ white-box testing.`, `مذكور كاسم تاني للـ white-box testing.`],
    [`ده العنصر 1.`, `ده العنصر 2.`, `ده العنصر 4.`, `صح. العناصر هي identify problems و follow rules و prepare و write a report؛ وتصليح الـ code مش واحد منهم.`],
    [`في الـ walkthrough الـ programmer اللي <b>كتب</b> الـ code هو اللي بيعرضه.`, `الـ peer review فيه programmer ساعد في تصميم الـ code، ومعاه programmers أو testers تانيين بيراجعوا.`, `صح. في الـ inspection اللي بيعرض مش هو الـ programmer الحقيقي والـ reviewers بياخدوا وجهة نظر الـ user والـ tester.`, `الـ Code coverage ده dynamic white-box testing، مش review.`],
    [`الـ Computation errors موضوعها الحسابات الغلط (types مختلطة، overflow، قاسم ممكن يبقى صفر).`, `الـ Comparison errors موضوعها &lt; و &gt; و = و ≠ والـ Boolean operands.`, `صح. «declared but never used or used only once» ده check من الـ data declaration.`, `الـ I/O errors بتخص الـ files والـ input من الكيبورد/الماوس والكتابة على file أو الشاشة.`],
    [`دول الـ uninitialized variables والـ subscripts اللي بره الحدود والـ off-by-one errors.`, `دول موضوعهم إنك تعرّف الـ variables والـ constants بالـ type والـ length والقيمة المبدئية الصح.`, `دول بيخصوا قراية وكتابة الـ files والـ devices.`, `صح. الـ Control flow بيتأكد إن الـ loops بتخلص والـ branching صح.`],
    [`صح. الـ Statement coverage نوع من الـ <b>CODE</b> coverage.`, `مذكور تحت الـ data coverage.`, `مذكور تحت الـ data coverage.`, `مذكور تحت الـ data coverage.`],
    [`test واحد بـ X &gt; 10 بيشغّل كل الـ statements أصلًا، فالـ statement coverage محتاج 1 بس.`, `صح. X = 20 بيشغّل كل السطور (1)؛ والـ path coverage محتاج كمان case بـ false زي X = 5 (2)، زي مثال الكريسماس.`, `test واحد مايقدرش ياخد الـ true branch والـ false branch بتوع الـ IF مع بعض.`, `فيه condition بسيطة واحدة بس، فالـ path coverage محتاج 2، مش 4.`],
    [`case واحدة ماتقدرش تخلي كل sub-condition تبقى true و false.`, `الـ 2 كفاية للـ branch coverage (الـ IF كله true مرة و false مرة)، مش لجدول الـ condition coverage بتاع المحاضرة.`, `الـ 8 محتاجة 3 sub-conditions (2×2×2).`, `صح. 2 sub-conditions × (true، false) = 4 combinations، زي جدول الـ Date$/Time$.`],
    [`صح. المحاضرة بتقول ده بالظبط عن الـ data coverage.`, `المحاضرة بتقول ده صراحةً في جزء الـ data coverage.`],
    [`الـ Reliability معناها إن الـ code يبقى reliable و secure أكتر.`, `ده معناه إن الـ code أسهل في الفهم والـ maintenance.`, `صح. الـ Portability معناها إن الـ code بيشتغل على hardware و compilers مختلفة.`, `الـ Usability مش واحد من التلات أسباب.`]
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
    [`صح. كل method call بيتنفذ مرة.`, `الـ stack فيه push، مش insert.`, `الـ pop عمره ما اتنادى.`, `أسامي الـ methods غلط، والـ pop ناقص.`],
    [`ده هيبقى code ماشي في خط مستقيم.`, `فيه 2 decisions، فـ V(G) = 2 + 1.`, `صح. 7 − 6 + 2 = 3.`, `E + N مش هي الـ formula.`],
    [`صح. بتدينا عدد الـ independent (basis) paths.`, `الـ States بتيجي من state machine.`, `مش ده اللي بتقيسه.`, `مش ده اللي بتقيسه.`],
    [`صح. مذكور صراحةً في المحاضرة.`, `المحاضرة ذكرت الـ statement coverage بس.`, `مش مذكور.`, `مش مذكور.`],
    [`ده بياخد 1,2,3,4,6.`, `ده بياخد 1,3,4,6 عشان a==2.`, `صح. أول IF بيبقى false، وبعدين a≠2 و x=0 مش &gt;1، فالـ else (5) بيتنفذ.`, `أول IF بيبقى true، فـ node 2 بيتنفذ.`],
    [`مفيش triple واحدة بتوصل لـ equilateral و not-a-triangle مع بعض.`, `صح. (4,4,4) و (0,1,0) بيشغّلوا كل السطور.`, `جدول الـ slide فيه 4 columns، بس 2 كفاية.`, `كتير جدًا.`],
    [`بيتحط، وبعدين بيتكتب فوقه.`, `بيتحط هو كمان (1 ≥ 0+0)، وبعدين بيتكتب فوقه.`, `صح. آخر IF (a ≤ 0) بيكتب فوق الـ type.`, `أول IF (a==c) بيكتب فوقه.`],
    [`ده الـ MM coverage.`, `صح. وعادةً بتطلع من state machine diagram.`, `ده الـ statement coverage.`, `الـ error pairs داخلة، بس مش هي بس.`],
    [`ده صح بالنسبة للـ <b>STRUCTURAL</b> testing، مش الـ functional.`, `صح. الـ test cases بتيجي من الـ functionality المطلوبة.`, `الـ Functional testing عمره ما بيحتاج code.`, `الـ Statement coverage ده structural.`],
    [`الـ Validation هو الجنب اليمين (الطالع).`, `صح.`, `مش موجود في الشكل.`, `مش موجود في الشكل.`],
    [`صح. مثلث قائم ضلعيه 4 و 4: ½·4·4 = 8.`, `نسيت الـ ½.`, `النقط مش على خط واحد (not collinear).`, `دي مساحة الـ cases بتاعة 10 في 10.`]
  ],
  extra: [
    [`ده ناسي الـ +2P (8 − 7 = 1).`, `صح. V(G) = E − N + 2P = 8 − 7 + 2 = 3.`, `ده مستخدم P = 2 (8 − 7 + 4)؛ والـ graph عبارة عن component واحدة.`, `E + N مش هي الـ formula.`],
    [`صح. فيه 3 simple decisions (predicate nodes)، فـ V(G) = 3 + 1 = 4.`, `الـ 3 ده عدد الـ predicates؛ لازم تزود 1.`, `فيه 3 predicate nodes بس، مش 4.`, `الـ V(G) مش 2^3؛ هي بتزيد واحد مع كل decision.`],
    [`صح. a&gt;1 && b==0 بتبقى true فـ x = 2/3 ≈ 0.67؛ وبعدين a==2 بتبقى false و x&gt;1 بتبقى false، فالـ else (node 5) بيتنفذ.`, `بعد node 2، x ≈ 0.67، فـ x&gt;1 بتبقى false، و a مش 2؛ فمش هنوصل لـ node 4.`, `أول IF بيبقى true (3 &gt; 1 و b = 0)، فـ node 2 بيتنفذ.`, `أول IF بيبقى true، فمينفعش نتنط node 2.`],
    [`بيتحط الأول، بس الـ IF اللي بعده (4 &gt;= 2+2) بيكتب فوقه.`, `فيه ضلعين متساويين، فالـ scalene بيتكتب فوقه.`, `كل الأضلاع موجبة، فآخر IF بيبقى false.`, `صح. a==b بتحط isosceles، بس c &gt;= a+b (4 &gt;= 4) بعدها بتحط "not a triangle"؛ ومفيش ضلع ≤ 0.`],
    [`الـ 2 هو أقل عدد للـ <b>STATEMENT</b> coverage؛ ومفيش test من الاتنين دول بيخلي الـ IF بتاع الـ isosceles يبقى false.`, `جدول الـ slide فيه 4 columns، بس 3 tests كفاية.`, `صح. (4,4,4) و (0,1,0) وزيادة عليهم (3,4,5)، اللي بتخلي أول IF يبقى false.`, `مش محتاجين test لكل subdomain عشان الـ branch coverage.`],
    [`المحاضرة بتقول إن كل call بيتختبر مرة واحدة بس حتى لو بيحصل كذا مرة.`, `صح. كل method call بيتختبر مرة واحدة على الأقل؛ والـ calls المتكررة بتتختبر مرة واحدة بس.`, `مفيش rule في الـ MM بيطلب 2 tests.`, `الـ MM بيطلب إن كل method call يتختبر مرة واحدة على الأقل.`],
    [`الـ push عمره ما بينقل من Full لـ Normal؛ الـ pop هو اللي بيعمل كده.`, `الـ push من Full ده error state في الـ diagram.`, `صح. ده pair رقم 8: الـ push على stack full بيطلّع error.`, `الـ pop من Normal بس هو اللي ممكن يوصّل لـ Empty.`],
    [`صح. التلات نقط على نفس الخط (y = x)، فهما collinear، زي (1,1)، (1,5)، (1,10).`, `دول بيعملوا مثلث قائم مساحته 12.`, `دول بيعملوا مثلث قائم مساحته 6.`, `دول بيعملوا مثلث قائم مساحته 4.5.`],
    [`المحاضرة بتقول إن الـ statement والـ branch coverage شكلهم مش مناسبين لتعقيد الـ OO، عشان لازم نختبر الـ interactions بين الـ methods.`, `صح. ممكن يتطبقوا، بس مابيختبروش الـ interactions بين الـ methods؛ وعشان كده بنستخدم الـ MM والـ FP testing.`],
    [`ده ناسي يعد الـ outer region.`, `ده بيطرح بدل ما يزود الـ outer region.`, `بنزود الـ outer region بس، مش 2.`, `صح. V(G) = عدد الـ regions = 3 inner + 1 outer = 4 (الـ foo كان فيها 2 + 1 = 3).`]
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
    [`ده بيبص جوه الـ code.`, `ده بيختبر العناصر من وجهة نظر الـ user.`, `ده بيعزل الـ defects بتاعة الـ design أو الـ implementation.`, `صح. الـ Configuration والـ compatibility testing بيغطي الـ hardware والـ browsers والـ resolutions والـ networks.`],
    [`الـ home page هي الصفحة الـ default.`, `الـ Links بتنقلك بين الصفحات.`, `صح. المحاضرة بتقول إن الـ content هو أهم جزء.`, `الـ Cookies مجرد element واحد من عناصر الـ testing.`],
    [`دول بيعرضوا catalogs أو inventories.`, `صح.`, `دي صفحات بتتعمل من layout program.`, `ده موضوعه الـ text حوالين الصور.`],
    [`ده text testing.`, `صح.`, `ده compatibility.`, `ده navigation.`],
    [`صح. ده تعريف المحاضرة.`, `ده بالظبط تعريف المحاضرة.`],
    [`صح. الـ users اللي عندهم خبرة عارفين عايزين يروحوا فين وبيتجنبوا التعليمات الطويلة.`, `المحاضرة بتأيد الجملة دي.`],
    [`هو بيخلط الاتنين؛ مش بيستبدلهم.`, `صح. ده كلام المحاضرة.`, `الـ Server load ده white-box element.`, `ده black-box text testing.`],
    [`مذكور.`, `مذكور.`, `صح. الليستة هي CPU، RAM، graphics، video capture، audio، monitors، network cards.`, `مذكور.`],
    [`الـ Cookies مسموح بيها.`, `صح.`, `ده عكس المطلوب.`, `مالوش علاقة.`],
    [`صح.`, `مش testing tools.`, `مش في المحاضرة.`, `دي design tools، مش testing tools.`]
  ],
  extra: [
    [`مواقع كتير بيبقى فيها الحاجات دي، بس شرط المحاضرة هو domain name و web host.`, `صح. الـ web site هو صفحات متجمعة تحت نفس الـ domain، ولازم يكون ليه domain name و web host.`, `دي عناصر اختيارية، مش شروط.`, `الـ 13 ده عدد عناصر الـ testing، مش عدد صفحات.`],
    [`مذكور كاستخدام من استخدامات الـ links.`, `صح. تشفير بيانات الـ login بيتختبر تحت الـ cookies، مش استخدام من استخدامات الـ links.`, `مذكور: الـ links ممكن تفتح Internet tools تانية زي Outlook.`, `مذكور كاستخدام من استخدامات الـ links.`],
    [`الـ images element موضوعه استخدام الصور عشان توصل رسالة، مش الـ text اللي حواليها.`, `الـ Tables موضوعها مكانها عشان الـ users مايفضلوش يعملوا scroll.`, `ده بيتأكد إن الـ content لسه سهل يتقري على الألوان المختارة.`, `صح. الـ Wrap-around بيتأكد إن الـ text بيلف صح حوالين الصور.`],
    [`صح. الـ Data verification بيتأكد إن الـ input مطابق للـ business rules المتحددة.`, `الـ Cookies موضوعها إن الـ data المتخزنة شغالة وبيانات الـ login encrypted.`, `ده بيتأكد إن كل التعليمات المهمة موجودة.`, `ده بيختبر الـ navigational map والـ links اللي فيها.`],
    [`الوضوح مطلوب في كل الـ links، بس الـ e-mail link لازم كمان يكون شغال فعلًا.`, `ده شغل white-box أو gray-box، مش الـ black-box check.`, `صح. ده الـ check المخصوص للـ e-mail links في المحاضرة.`, `ده server performance and loading testing.`],
    [`صح. وعشان كده الـ black-box testing بيتأكد إن كل الـ graphics بتتحمل وبتظهر صح.`, `المحاضرة بتقول ده في جزء الـ graphics في الـ black-box web testing.`],
    [`الـ Dynamic content بيتغير حسب ظروف زي وقت اليوم أو الطقس أو الـ stock tickers.`, `دي بتتعمل بإنك تدوس زرار في layout program بعد ما تدخل الـ data وتسحب العناصر.`, `الـ Security موضوعها الهجمات زي الـ denial of service والـ buffer overflow.`, `صح. أمثلة المحاضرة هي الـ catalogs والـ inventories (e-commerce).`],
    [`ده content بيتغير حسب الظروف.`, `صح. المواقع المشهورة بيجيلها ملايين hits في اليوم، فلازم نعمل simulation للـ load.`, `ده موضوعه إزاي الصفحات بتتعمل، مش الـ load.`, `الـ Gray-box خليط من الـ black والـ white-box وهدفه defects الـ design/الـ implementation.`],
    [`مذكور.`, `مذكور.`, `صح. الليستة هي font sizes، browsers مع الـ CSS، screen resolutions، memory sizes، و network environments.`, `مذكور.`],
    [`صح. ده وصف المحاضرة للـ programmatically created pages.`, `دول بيعرضوا catalogs و inventories من database.`, `الـ Dynamic content بيتغير حسب ظروف زي الطقس أو الوقت.`, `الـ home page هي الصفحة الـ default بتاعة الـ site.`]
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
    [`صح. الـ QA بيضمن الـ processes والـ standards والـ methodologies اللي بتطلّع quality.`, `الـ QC بيفحص الـ product ويستبعد الـ defects؛ أما الـ QA فهو النشاط الأوسع على مستوى الـ organization.`, `ده white-box metric.`, `دي white-box technique.`],
    [`ناقصة. الـ tester لازم كمان يتأكد إنها اتصلحت.`, `الـ developers هما اللي بيصلحوا؛ والـ debugging مش دور الـ tester.`, `صح. الدور: يشيل مسؤولية الـ bugs، يتابعها، ويقنع الـ team إنهم يصلحوها.`, `مش هدف الـ tester.`],
    [`الـ QC بيختبر الـ product.`, `صح. الـ SQA بيضمن إن الـ standards والـ procedures بتتطبق صح.`, `الـ Testing بيكتشف الـ bugs.`, `الـ Metrics بتقيس؛ مابتضمنش.`],
    [`مثال على مهام الـ QA.`, `مثال على مهام الـ QA.`, `مثال على مهام الـ QA.`, `صح. دي مهمة من مهام الـ software testing.`],
    [`ده الـ SQA.`, `صح.`, `الـ Standards بتاعة الـ SQA.`, `هما مختلفين.`],
    [`الـ Flexibility هي المجهود عشان نغير البرنامج.`, `صح.`, `الـ Reliability هي إنه يأدي الـ function المقصودة بدقة.`, `الـ Portability هي النقل لـ system تاني.`],
    [`الـ Metrics هي rules لقياس attributes زي الحجم والـ complexity.`, `صح. الـ Indicators بتعكس نتايج الـ process.`, `مش standard.`, `الـ KPAs بتاعة الـ CMM.`],
    [`الـ Support هو التقديم الكفء للـ operational services.`, `صح.`, `مش category من الـ ITSM.`, `مش category من الـ ITSM.`],
    [`صح. الـ testers بيرفعوا تقاريرهم للـ development manager.`, `العيب بتاعه إن الـ project manager هو اللي ليه القرار النهائي.`, `ده أكتر structure مستقل.`, `الـ small team structure فيه العيب ده.`],
    [`الـ QA هو process و prevention؛ والـ QC هو product و detection.`, `صح.`],
    [`ده بيعد الـ defects اللي اتكشفت واتحلت.`, `صح.`, `ده بيحدد الأجزاء المعرضة للـ defects.`, `ده بيحكم هل جاهزين ننتقل للـ phase اللي بعدها.`]
  ],
  extra: [
    [`صح. وبتتوصف كمان إنها مجموعة الـ attributes اللي الـ end-users بيقدّروها.`, `الـ Testing طريقة نختبر بيها الـ quality، مش تعريفها.`, `عدد سطور الـ code ده metric، مش تعريف الـ quality.`, `سرعة التسليم مش تعريف المحاضرة.`],
    [`الـ Defects هي مثال المحاضرة على factor <b>DIRECTLY</b> measurable؛ والـ maintainability والـ usability هما الـ indirect.`, `صح. الـ Defects بتتقاس مباشرةً؛ والـ maintainability والـ usability هما أمثلة الـ indirect.`],
    [`الـ Flexibility هي المجهود المطلوب عشان نغير البرنامج.`, `الـ Reusability هي أنهي أجزاء ممكن تتستخدم في applications تانية.`, `صح. الـ Portability = المجهود المطلوب عشان ننقل البرنامج لـ system تاني.`, `الـ Efficiency هي الاستخدام الأمثل للـ computing resources.`],
    [`الـ Reliability هي إنه يأدي الـ function المقصودة بدقة.`, `صح. الـ Integrity = التحكم في الـ access والـ security.`, `الـ Usability هي المجهود المطلوب عشان تتعلم البرنامج وتشغّله.`, `الـ Maintainability هي المجهود المطلوب عشان نلاقي الـ errors ونصلحها.`],
    [`ده مثال على مهام الـ QA.`, `ده مثال على مهام الـ QA.`, `ده مثال على مهام الـ QA.`, `صح. دي المهمة رقم 4 من مهام الـ testing.`],
    [`في الـ small team الـ testers بيرفعوا تقاريرهم للـ development manager.`, `صح. الـ feedback بتاع الـ testing بيتاخد في الاعتبار، بس القرار النهائي في إيد الـ project manager.`, `هناك الـ QA والـ development والـ project managers كلهم بيرفعوا تقاريرهم لـ executive manager.`, `ده category من الـ ITSM، مش organization structure.`],
    [`صح. الـ Process metrics بتقيس الـ development process.`, `الـ Product metrics بتقيس الـ final product، زي حجم الـ code أو عدد الصفحات الموثقة.`, `الـ Quality factors هي attributes زي الـ reliability والـ usability.`, `الـ Defect indicators بتعد الـ defects أو بتحدد مكانها.`],
    [`مذكور ضمن الـ 9 metrics.`, `مذكور ضمن الـ 9 metrics.`, `مذكور ضمن الـ 9 metrics.`, `صح. مش موجود في الليستة.`],
    [`الـ Progress بيقيس الشغل اللي اتعمل في كل phase.`, `الـ Stability بتحكم هل الـ products بتاعة الـ phase stable كفاية عشان نكمل.`, `صح. بيقيس التزام الـ developer بالـ procedures اللي اتوافق عليها.`, `الـ Defect density بتحدد الأجزاء المعرضة للـ defects في الـ system.`],
    [`مش في المحاضرة.`, `الـ CMM موضوع تاني (Lecture 7).`, `صح. ده هدف الـ ITSM اللي المحاضرة قالته.`, `الـ ITSM موضوعه إدارة جودة الـ services، مش كتابة code.`]
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
    [`صح. كلام الـ summary: «CMM is the widely used and preferred software method of evaluation».`, `ده quality standard عام (generic)، مش طريقة التقييم المفضلة.`, `دي statistical improvement methodology.`, `مبادرة لتقييم الـ process، بس مش هي الإجابة هنا.`],
    [`قليل.`, `صح. Initial، Repeatable، Defined، Quantitatively Managed، Optimizing.`, `قليل.`, `كتير.`],
    [`الـ CMM فيه 5 levels.`, `الـ Six Sigma بيستخدم الـ DMAIC.`, `صح.`, `الـ SPICE ليه 3 objectives.`],
    [`صح.`, `ناقصة.`, `كلمات غلط.`, `كلمات غلط.`],
    [`سنة غلط.`, `سنة غلط.`, `سنة غلط.`, `صح.`],
    [`صح. الاسم جاي من الكلمة اليونانية "isos" = متساوي.`, `غلط.`, `غلط.`, `غلط.`],
    [`Basic project management.`, `Processes standard.`, `صح.`, `تحسين مستمر (بيستخدم quantitative goals، بس التحكم بالـ statistics ده level 4).`],
    [`ده aspect منهم.`, `ده aspect منهم.`, `صح. الـ aspects هي goals و commitment و ability و measurement و verification.`, `ده aspect منهم.`],
    [`صح. ينفع يتستخدم للتقييم وللتحسين الاتنين.`, `المحاضرة بتقول إنه ينفع للاتنين.`],
    [`متطلبات الـ supplier.`, `صح. بنفصل الحاجات المرفوضة ونديرها.`, `الدعم بعد التسليم.`, `سجلات الموظفين.`],
    [`دول عملوا الـ SPICE / الـ ISO/IEC 15504.`, `صح.`, `الـ IEEE عمل الـ Software Engineering Standard Collection.`, `مش في المحاضرة.`]
  ],
  extra: [
    [`الـ Level 1 مفيهوش processes مطلوبة؛ والشركة دي بتعمل project management أصلًا.`, `الـ Level 3 محتاج processes standard على مستوى الـ organization كلها.`, `الـ Level 4 بيستخدم تحكم statistical و quantitative في الـ processes.`, `صح. دي تحسينات الـ Level 2 (basic project management)؛ أما الـ processes الـ standard على مستوى الـ organization كلها فدي Level 3.`],
    [`صح. الـ processes الـ standard اللي بتتعدل على المقاس والـ training على مستوى الـ organization ده Level 3.`, `الـ Level 2 هو basic project management من غير standards على مستوى الـ organization.`, `التحكم الـ statistical ناقص، فلسه ماوصلتش Level 4.`, `الـ Level 5 هو تحسين مستمر بـ change infrastructure.`],
    [`الـ Level 4 هو إننا نراقب الـ processes quantitatively ونعمل capability baselines.`, `صح. دي تحسينات الـ Level 5 (change management).`, `الـ Level 3 هو توحيد الـ processes على مستوى الـ organization.`, `الـ Level 1 هو ad-hoc ومفيش processes مطلوبة.`],
    [`ده السهم من Level 1 لـ Level 2.`, `ده السهم من Level 3 لـ Level 4.`, `ده السهم من Level 4 لـ Level 5.`, `صح. 1→2 basic management control، 2→3 process definition، 3→4 process measurement، 4→5 process control.`],
    [`الـ Maturity levels هي الـ 5 مراحل اللي بتحدد الـ process capability.`, `الـ Common features بتوضح هل تطبيق الـ KPA ناجح ومستدام.`, `صح. ده تعريف المحاضرة للـ process capability.`, `الـ Goals بتقيّم الـ practices الأساسية عشان نشوف هل الـ process area اتطبقت بنجاح.`],
    [`مثال الـ KPA هو «software project delivery planning».`, `صح. الـ Key practices هي الأفعال والـ infrastructure المطلوبين عشان يدعموا الـ KPA.`, `الـ Maturity levels هي الـ 5 مراحل، مش فعل.`, `الـ Process capability هي القدرة على تحقيق توقعات الـ quality.`],
    [`الـ CMM هو approach incremental من خمس levels: الـ organizations بتتقدم واحدة واحدة من غير ما تنط levels.`, `صح. الـ organizations بتتقدم واحدة واحدة ومينفعش تنط levels.`],
    [`صح. الـ Element رقم 14 بيتعامل مع الـ root causes.`, `ده موضوعه التعامل مع الحاجات المرفوضة.`, `الـ Audits بتختبر الـ quality system؛ أما الـ root-cause action فده element رقم 14.`, `ده موضوعه الـ control charts.`],
    [`صح. مش موجود في الليستة.`, `ده واحد من الـ 8 principles.`, `ده واحد من الـ 8 principles.`, `ده واحد من الـ 8 principles.`],
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
    [`صح. «Six Sigma reduces process variation… The aim of six sigma is to reach zero default».`, `ده process-assessment standard.`, `ده maturity framework.`, `ده quality standard.`],
    [`لكل مليون، مش لكل ألف.`, `صح.`, `ده الـ ±3σ.`, `دي النسبة اللي جوه الـ ±1σ.`],
    [`معاني الحروف غلط.`, `صح.`, `غلط.`, `غلط.`],
    [`صح.`, `الـ Measure بيخطط وينفذ قياس الأداء.`, `الـ Analyze بيلاقي الـ root causes.`, `الـ Control بيفضل يراقب.`],
    [`لأ، الـ measure موضوعه قياس الـ defects.`, `لأ، الـ analyze بيلاقي الأسباب.`, `صح.`, `لأ.`],
    [`ده الـ ±1σ.`, `ده الـ ±2σ.`, `صح (2,700 ppm بره الـ spec).`, `ده الـ ±4σ.`],
    [`ده الـ Yellow Belt.`, `صح.`, `ده الـ Black Belt.`, `ده الـ Master Black Belt.`],
    [`مذكور.`, `مذكور.`, `صح. ده software metric (L6)، مش Six Sigma tool.`, `مذكور.`],
    [`ده الـ σ نفسه.`, `صح. 6 × 0.98 = 5.88.`, `جمعت بدل ما تضرب.`, `ده الـ 3σ.`],
    [`نسيت الـ 10 opportunities لكل unit (25/500 × 10⁶).`, `صح. 25 / 5,000 × 1,000,000 = 5,000.`, `غلط بمعامل 10.`, `ده الـ target بتاع الـ 6σ.`],
    [`الـ principle هو الـ teamwork التعاوني، وإننا نتجنب المنافسة.`, `صح.`, `ده عكس الـ principle.`, `التركيز على العملاء هو أول principle.`]
  ],
  extra: [
    [`ده اللي بره الـ ±1σ.`, `ده اللي بره الـ ±3σ.`, `صح. الـ ±2σ بتغطي 95.45%، وبتسيب 45,500 ppm بره.`, `ده اللي بره الـ ±4σ.`],
    [`ده بيضرب الـ variance في 6 بدل الـ σ.`, `صح. σ = √0.25 = 0.5، و 6 × 0.5 = 3.`, `الـ 0.5 هو الـ σ نفسه، مش 6σ.`, `ده بيجمع 6 على الـ variance.`],
    [`الـ Define بيحدد المشكلة (الـ level، الـ location، الـ financial impact) وبيكوّن الـ team.`, `الـ Improve بيغير الـ processes وبيجرب الحلول على sample.`, `صح. الـ Analyze بيلاقي الـ root causes، ويرتبها حسب التأثير، ويصنفها.`, `الـ Control بيفضل يراقب ويصحح الانحرافات.`],
    [`صح. الـ Control معناه متابعة مستمرة وتصحيح الانحرافات.`, `الـ Measure بيخطط وينفذ قياس الأداء مقارنة بمتطلبات العملاء قبل التحسين.`, `الـ Analyze بيدور على الـ root causes.`, `الـ Define بيحدد المشكلة وبيكوّن الـ team.`],
    [`الـ DMAIC بيحسّن الـ processes <b>الموجودة</b>.`, `الـ ISO 9000 ده quality standard، مش Six Sigma approach.`, `الـ CMM ده maturity model، مش Six Sigma approach.`, `صح. الـ DMADV لتصميم processes/products جديدة.`],
    [`بدري قوي؛ المحاضرة بتقول أواخر السبعينات وأوائل التمانينات.`, `صح.`, `الـ 1993 هي السنة اللي اتقدم فيها الـ SPICE.`, `متأخر قوي؛ ده كان مشهور مع الشركات العالمية الكبيرة من قبلها بكتير.`],
    [`الـ Yellow Belt لكل الموظفين.`, `صح.`, `الـ Green Belt للموظفين التنفيذيين.`, `الـ White Belt هو مستوى البداية (step 1).`],
    [`دي المرحلة 4.`, `دي المرحلة 5.`, `دي المرحلة 3.`, `صح. دي المرحلة 1.`],
    [`صح. الـ ±6σ بتغطي 99.9999998%، وبتسيب 0.002 ppm بره في الشكل.`, `الشكل بيقول إن 99.9999998% جوه الـ ±6σ، يعني 0.002 ppm بره.`],
    [`صح. Define الأسباب → Measure تأثيرها → Analyze المصادر → Improve → Control.`, `الـ Define بيحدد أسباب الرسوب.`, `الـ Improve بيطلّع الحلول.`, `الـ Control هو المتابعة المستمرة.`]
  ]
};

AR.qa.exams = [
  { sections: [
    { items: [
      { why: `الـ CMM هو الـ standard framework لتقييم الـ process maturity؛ والـ summary بيقول «CMM is the widely used and preferred software method of evaluation» (L7).` },
      { why: `Initial، Repeatable، Defined، Quantitatively Managed، Optimizing (L7).` },
      { why: `الـ ISO 9000 فيه 20 key element (L7).` },
      { why: `الـ ISO 9000 «بيشجع الـ continuous improvement والـ product reliability والاعتراف الدولي»، والـ summary بيقول «ensures consistent processes, reduces errors and risks, increases customer trust». ممكن حد يقول Six Sigma برضه (رضا العميل)، بس ده إجابة سؤال #5، فالـ ISO 9000 هو الأنسب هنا.` },
      { why: `L8: الـ Six Sigma بيقلل الـ process variation لـ 3.4 defects لكل مليون؛ وهدفه zero defects («zero default»).` },
      { why: `الـ Verification: «هل إحنا بنبني الـ product صح؟»، وبنتأكد منه مقارنة بالـ specification (L2).` },
      { why: `الـ QA هو النشاط اللي على مستوى الـ organization كلها (processes، standards، prevention) واللي بيضمن products بـ quality (L6). أما الـ QC فبيفلتر الـ product بس.` },
      { why: `الـ Validation: «هل إحنا بنبني الـ product الصح؟»، زي الـ user acceptance testing (L2).` },
      { why: `الـ Formal review = peer review، walkthrough، inspection (L3).` },
      { why: `الـ 3 أسباب للـ standards والـ guidelines: reliability، readability/maintainability، portability (L3).` },
      { why: `دور الـ tester: يشيل مسؤولية الـ bugs، يتابعها، ويقنع الـ developers إنهم يصلحوها (L6).` },
      { why: `BVA/EP: الـ 9000 = invalid boundary (لازم يترفض)، الـ 9001 = valid boundary، الـ 9999 = قيمة valid. كلهم test cases مفيدة، وده متوافق مع الـ summary key.` },
      { why: `X=2, Y=0 بس هي اللي بتخلي جزئين الـ AND يبقوا true، فـ A=A/X بتتنفذ.` },
      { why: `مع الـ OR، كل اختيار بيخلي جزء واحد على الأقل true، فـ A=A+1 بتتنفذ في التلاتة.` },
      { why: `X=2,Y=0,A=4: A=4/2=2، وبعدين X=2 بتبقى true فـ A=3، والـ statements الاتنين بيتنفذوا. الاختيار (A) بيدي A=1/3 والـ IF التاني بيبقى false. والاختيار (B) بيخلي أول IF يبقى false.` },
      { why: `الـ Dynamic testing = إنك تشغّل الـ software وتستخدمه (L2).` },
      { why: `الـ Guidelines بتساعد تمشي على الـ standards ومش mandatory (L3).` },
      { why: `الـ Standards هي rules لازم نلتزم بيها (L3).` },
      { why: `L4: «a simple sequence of create, push, and pop might achieve MM testing».` },
      { why: `دول التلات أجزاء بتوع الـ static white-box testing (L3).` }
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
      { why: `جدول L1: الـ 1988–2000 = prevention-oriented. الـ summary key غلط.` },
      { why: `ده واحد من الـ 6 objectives بتوع الـ testing (L1).` },
      { why: `ده الـ System Engineering. الـ Analysis = feasibility و goals و performance و interface requirements (L1).` },
      { why: `ابدأ بالـ test-to-pass، وبعدين الـ test-to-fail (L2).` },
      { why: `واسمه كمان structural و open box (L3).` },
      { why: `ده وصف الـ white-box testing.` },
      { why: `الـ walkthrough بيبقى فيه group من 5 أو 6 programmers و testers (L3).` },
      { why: `الـ Standards هي rules إلزامية (mandatory) (L3).` },
      { why: `الـ BVA اتدرس كـ black-box technique (L2) وممكن يتستخدم كمان في الـ white-box testing.` },
      { why: `ده تعريف الـ equivalence partitioning (L2).` },
      { why: `التكلفة بتزيد من الـ requirements (قليلة) لحد الـ production (مكلفة جدًا جدًا) (L1).` },
      { why: `الـ QA هو process و prevention؛ والـ QC هو product و detection (L2، L6).` },
      { why: `ده تعريف L5.` },
      { why: `L7: للتقييم وللتحسين الاتنين.` },
      { why: `عصر الـ Destruction-oriented، 1979–1982 (L1).` }
    ] },
    { items: [
      { why: `الـ Structural = white-box.` },
      { why: `الـ System testing بيختبر الـ system كله مقارنة بالـ specifications بتاعته (L2).` },
      { why: `Glass box، clear box، open box، structural testing.` },
      { why: `تعريف L3. الحسابات = computation errors؛ والـ loops = control flow.` },
      { why: `خمس levels.` },
      { why: `الشكل بيوضح bottom-up و top-down و umbrella approach.` },
      { why: `تعريف الـ static testing في L2.` },
      { why: `الـ Data coverage بيشمل data flow و sub-boundaries و error forcing (L3).` },
      { why: `tools الـ L8: 5S، seven wastes، value stream mapping، visual workspace، VOC، Kaizen، Kanban، regression analysis.` }
    ] }
  ] }
];

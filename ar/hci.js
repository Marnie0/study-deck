window.AR = window.AR || {};
AR.hci = { lectures: {}, exams: [] };

AR.hci.lectures["1"] = {
  notes: [
    { h: `يعني إيه HCI؟`, pts: [
      `الـ HCI هو <b>التفاعل بين الـ user والكمبيوتر</b>، أو <b>العلاقة بين الـ users والـ computer systems</b>.`,
      `فيه مصطلحات بتتقال بنفس المعنى: <b>HCI</b> (Human Computer Interaction)، <b>HMI</b> (Human Machine Interaction)، و<b>MMI</b> (Man Machine Interaction).`,
      `الـ HCI بيتعامل مع الـ <b>Design</b> والـ <b>Implementation</b> والـ <b>Evaluation</b> بتاع الـ interactive systems.`,
      `بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم)، والتكنولوجيا اللي بتحسّن التفاعل، وطرق وتفضيلات وصعوبات الـ users مع الأنظمة الحالية أو القديمة.`,
      `فيه 3 أجزاء بيتقابلوا في الـ HCI: الـ <b>User</b> (قدراته العقلية والجسدية)، والـ <b>Computer / Machine</b> (أجهزة الـ input/output)، والـ <b>Interaction</b> (الـ interfaces والـ HCI patterns والـ design والـ usability evaluation).`
    ]},
    { h: `أهداف الـ HCI`, pts: [
      `نصمم عشان <b>الناس</b>، وعشان <b>الـ tasks</b>، وعشان <b>البيئات</b> اللي الـ users عايشين وشغالين فيها (زي organization مثلاً).`,
      `نخلي التفاعل أسهل: نصمم systems <b>سهلة وطبيعية و intuitive</b> عشان <b>نوفر وقت</b> و<b>نقلل التكلفة</b>.`,
      `نصمم GUIs (إزاي نتعلمها، ونستخدمها بكفاءة، ونقيّمها ونقارن بينها) وكمان web interfaces.`,
      `نستكشف paradigms/prototypes جديدة للتفاعل، ونطوّر models و theories للتفاعل.`
    ]},
    { h: `مكان الـ HCI وسط المجالات`, pts: [
      `<b>Engineering + Psychology ← Human Factors Engineering</b>: يعني تصميم التفاعل بين الناس والمنتجات أو الـ systems أو الأجهزة.`,
      `الـ Human Factors Engineering بيتفرع لـ <b>Industrial Design</b> و<b>HCI</b> و<b>Product Design</b>.`,
      `والـ HCI نفسه بيتفرع لـ <b>UI Design</b> و<b>UX Design</b> و<b>Interaction</b> design.`,
      `مثال على حدود الإنسان: البني آدم يقدر يفرّق بين <b>ملايين الألوان</b> لكن حوالي <b>30 درجة رمادي</b> بس.`,
      `الفرق بين الـ HCI والـ human factors engineering بيقل، عشان أجهزة أكتر بقت computerized.`
    ]},
    { h: `UI ضد UX ضد HCI`, pts: [
      `<b>UI Design</b> (User Interface): هو الـ <b>interactivity والـ look and feel</b> بتاع شاشة المنتج أو صفحة الويب. يعني إنك تصمم الحاجة حلوة على الشاشة.`,
      `<b>UX Design</b> (User Experience): هي <b>التجربة الكاملة</b> بتاعة الـ user مع المنتج أو الموقع. الـ UX بيـ<b>حدد (dictate)</b> التفاعلات.`,
      `أما الـ <b>HCI</b> فهو في الأساس عن <b>فهم</b> التفاعل بين البني آدمين والكمبيوتر.`,
      `الأنظمة القديمة كانت شغالة على أجهزة غالية، فالمهندسين ركزوا على software كفء وطنّشوا الـ usability. النهارده عشان تنجح لازم design يكون <b>user-centric</b> ومركز على الـ usability وتجربة حلوة وسلسة.`
    ]},
    { h: `التفاعل مع الـ Task والـ invisible interface`, pts: [
      `الـ user في الحقيقة عايز يخلّص <b>task</b> (يشتري أونلاين، يتفرج على فيديو، يترجم نص). الـ system مجرد وسيلة، فالـ user في الحقيقة بيتفاعل مع الـ task.`,
      `مثال: في محاضرة أونلاين على Zoom، الدكتور بيتفاعل مع الطلبة، مش مع الكمبيوتر.`,
      `زي حكم الماتش بالظبط، الـ interface بيبقى ناجح لما <b>محدش ياخد باله منه</b>.`,
      `الـ <b>Invisible interface</b> (فكرة مثالية): الـ users يقضوا وقت قليل مع الـ interface ويركزوا على الـ task. الـ user المفروض يفكر في الـ task مش في الأداة.`
    ]},
    { h: `الـ UI design process (3 أجزاء)`, pts: [
      `1. <b>User research</b>  2. <b>Design and prototyping</b> للـ interface  3. <b>User interface evaluation</b> (تحسين).`,
      `الـ User research معناه إنك تتعلم عن الـ <b>users</b> (مهاراتهم، الحاجات اللي بتشتتهم، الاحتياجات الخاصة زي الأطفال وكبار السن وذوي الإعاقة)، والـ <b>tasks</b> اللي عايزين يخلصوها، والـ <b>previous research</b> عن قدرات الإنسان وحدوده وإدراكه.`,
      `الـ Software development هو research: مش بس إنك تعمل software، ده كمان <b>إنك تتعلم إزاي تعمل الـ software الأنسب لهدفه</b> (دي واحدة من الـ 12 characteristics اللي اتدرست في Software Engineering).`
    ]},
    { h: `Case studies`, pts: [
      `<b>Online book library search</b>: design وحش، الـ user research فيه تقريباً مش موجود.`,
      `<b>International Children's Digital Library (بتاعة HCIL)</b>: design كويس، أكتر من <b>3 مليون unique visitors</b>؛ والـ users فضّلوا الـ visual search (<b>71% من عمليات البحث</b>).`,
      `الدروس: الـ designer الشاطر بيفهم المشاكل من <b>وجهة نظر الـ user</b> و<b>بيشتغل مع الـ users بدل ما يخمّن</b>.`,
      `مثال UX وحش: form عند دكتور بيطلب العنوان والتليفون والإيميل والـ SSN حوالي 3 مرات لـ 10 أشخاص مختلفين، خد أكتر من 30 دقيقة، وفي الآخر طلع "Internal server error".`
    ]}
  ],
  cards: [
    `التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems.`,
    `HMI (Human Machine Interaction) و MMI (Man Machine Interaction).`,
    `الـ Design والـ implementation والـ evaluation بتاع الـ interactive systems.`,
    `الـ Interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الويب.`,
    `التجربة الكاملة بتاعة الـ user مع المنتج أو الموقع.`,
    `تصميم التفاعل بين الناس والمنتجات أو الـ systems أو الأجهزة (Engineering + Psychology).`,
    `حوالي 30 (في مقابل ملايين الألوان).`,
    `interface بيختفي عشان الـ users يركزوا على الـ task مش على الأداة.`,
    `User research ← Design and prototyping ← Evaluation (تحسين).`,
    `أكتر من 3M unique visitors؛ والـ visual search اتستخدم في 71% من عمليات البحث.`
  ],
  qa: [
    `نصمم عشان الناس والـ tasks والبيئات؛ نسهّل التفاعل بـ systems سهلة وطبيعية و intuitive توفر وقت وتقلل التكلفة؛ نصمم ونتعلم ونستخدم ونقيّم الـ GUIs والـ web interfaces؛ نستكشف interaction paradigms جديدة؛ ونطوّر models و theories للتفاعل.`,
    `الـ HCI عن فهم التفاعل بين البني آدمين والكمبيوتر. الـ UX design عن تحديد (dictating) التفاعلات دي (التجربة الكاملة). الـ UI design عن إنك تصمم الحاجة حلوة على الشاشة (الـ look والـ feel والـ interactivity).`,
    `مع الـ task. الـ system وسيلة عشان يخلّص task زي الشرا أونلاين. في محاضرة Zoom الدكتور بيتفاعل مع الطلبة مش مع اللابتوب. والـ interface الكويس محدش بياخد باله منه، زي الحكم الكويس.`,
    `الـ users (مهاراتهم، اللي بيشتتهم، الاحتياجات الخاصة زي الأطفال وكبار السن وذوي الإعاقة)، والـ tasks اللي عايزين يخلصوها، والـ research الموجود عن قدرات الإنسان وحدوده وإدراكه.`,
    `الـ designer الشاطر بيفهم المشاكل من وجهة نظر الـ user وبيشتغل مع الـ users بدل ما يخمّن هم بيحبوا إيه.`
  ],
  quiz: [
    [`الـ Human Computer Interaction ده الاسم الكامل للـ HCI نفسه، بس المحاضرة بتقول إن الـ HMI والـ MMI كمان مصطلحات بنفس المعنى، فلو اخترت دي بس هتفوّت اتنين (L1, What is HCI?).`, `الـ HMI واحد من المصطلحات اللي بتتقال بالتبادل، بس الـ HCI والـ MMI كمان بيوصفوا نفس المجال، فالإجابة الكاملة هي "All the above" (L1, What is HCI?).`, `الـ MMI مصطلح منهم فعلاً، بس كمان الـ HCI والـ HMI؛ والسؤال عايز الكل، يعني "All the above" (L1, What is HCI?).`, `صح. الـ HCI والـ HMI والـ MMI كلهم بيتقالوا على نفس المجال.`],
    [`الـ UX بيغطي التجربة الكاملة بتاعة الـ user، وده أوسع من الـ look and feel بتاع الشاشة.`, `صح. الـ UI design هو الـ interactivity والـ look and feel بتاع الشاشة أو الصفحة.`, `ده المجال الأب اللي بيتكلم عن تفاعل الناس مع المنتجات أو الـ systems أو الأجهزة.`, `ده أخو الـ HCI تحت الـ human factors engineering؛ مش تصميم شاشات.`],
    [`الموضوع مش إننا نشيل الـ visuals؛ الموضوع عن الانتباه.`, `صح. الـ interface بيختفي والـ user بيفكر في الـ task مش في الأداة.`, `إنك تخبي features في menus مش بيخلي التفاعل مباشر.`, `نوع الـ modality ملوش علاقة؛ أي interface ممكن يحاول يبقى invisible.`],
    [`قليل أوي: الإنسان بيقدر يفرّق بين حوالي 30 درجة رمادي، يعني عشر أضعاف الرقم ده، وده برضه رقم صغير جداً جنب ملايين الألوان (L1, HCI hierarchy).`, `صح. مثال حدود الإنسان في المحاضرة هو حوالي 30 درجة رمادي.`, `كتير بعشر أضعاف. مثال حدود الإنسان في المحاضرة بيقارن ملايين الألوان بحوالي 30 درجة رمادي بس (L1, HCI hierarchy).`, `كتير جداً. الفكرة من المثال إننا بنفرّق بين درجات رمادي قليلة أوي: حوالي 30 بس، قصاد ملايين الألوان (L1, HCI hierarchy).`],
    [`صح. الترتيب هو user research ← design and prototyping ← evaluation.`, `الـ Evaluation (improvement) هو الجزء التالت والأخير: مش هتقدر تقيّم الـ interface غير بعد ما تعمل research على الـ users وتصممه (L1, UI design process).`, `الـ Design and prototyping هو الجزء التاني؛ بييجي بعد الـ user research، لأنك لازم تفهم الـ users والـ tasks بتاعتهم قبل ما تصمم (L1, UI design process).`, `الـ Implementation مش واحد من الـ 3 أجزاء المذكورين.`],
    [`الـ 17% دي نفس الرقم الصح بس مقلوب: الـ visual search اتستخدم في 71% من عمليات البحث، وده بيوضح إن المستخدمين فضّلوه (L1, Case studies).`, `الـ 50% معناها إن مفيش تفضيل واضح، بس المحاضرة بتقول إن الـ visual search اتستخدم في 71% من عمليات البحث، يعني أغلبية واضحة (L1, Case studies).`, `صح. 71% من عمليات البحث استخدمت الـ visual search.`, `كتير. الـ International Children's Digital Library قالت إن الـ visual search اتستخدم في 71% من عمليات البحث، مش 91% (L1, Case studies).`],
    [`العكس: الأجهزة زمان كانت غالية، فالمهندسين كانوا بيعملوا optimize للـ software عشان الماكينة وبيتجاهلوا الـ usability خالص (L1, UI vs UX vs HCI).`, `صح. المهندسين كانوا بيعملوا optimize للجهاز الغالي، مش لتجربة الـ user.`, `الـ User-centric design ده بيوصف الأنظمة النهارده، اللي نجاحها معتمد على الـ usability. الأنظمة القديمة كانت machine-centric، تركيزها على software كفء (L1, UI vs UX vs HCI).`, `الـ invisible interface دي فكرة مثالية حديثة، المستخدم فيها بيركز على الـ task. الأنظمة القديمة كانت متجاهلة الـ usability أصلاً، فكانت بعيدة عنها خالص (L1, Invisible interface).`],
    [`صح. الاتنين بيصبّوا في الـ human factors engineering في رسمة الـ hierarchy.`, `دول تحت الـ human factors engineering، مش فوقه.`, `الـ Art والـ Marketing مش موجودين في رسمة الـ hierarchy أصلاً. الـ Human factors engineering جاي من Engineering + Psychology (L1, HCI hierarchy).`, `دول فروع من الـ human factors engineering، مش مصادره.`],
    [`صح. المحاضرة بتسمي ده "software development is research".`, `الجملة متاخدة من المحاضرة بالنص، فهي صح.`],
    [`التجربة الكاملة مع المنتج أو الموقع دي تعريف الـ UX design. الـ UI design هو بس الـ interactivity والـ look and feel بتاع الشاشة أو الصفحة (L1, UI vs UX vs HCI).`, `صح. الـ UI هو الـ look والـ feel والـ interactivity؛ الـ UX هو التجربة الكاملة.`]
  ],
  extra: [
    [`صح. المحاضرة بتقول إن الـ HCI بيتعامل مع الـ Design والـ Implementation والـ Evaluation بتاع الـ interactive systems.`, `الـ HCI بيدرس التفاعل بين الـ users والكمبيوتر، مش الـ supply chain بتاع الـ hardware.`, `دي أنشطة business، مش الـ 3 أنشطة اللي المحاضرة بتذكرها للـ HCI.`, `دي تفاصيل visual؛ الـ HCI بيغطي الـ design والـ implementation والـ evaluation كله للـ interactive systems.`],
    [`الـ Industrial Design واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.`, `صح. الـ UX Design متفرع من الـ HCI (الـ HCI بيتقسم لـ UI و UX و Interaction design)، مش من الـ Human Factors Engineering مباشرة.`, `الـ HCI واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.`, `الـ Product Design واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.`],
    [`النصّين مقلوبين: المحاضرة بتقول إن الفجوة بتقل، عشان أجهزة أكتر (مش أقل) بقت computerized (L1, HCI hierarchy).`, `صح. الفرق بـ<b>يقل</b>، عشان أجهزة أكتر بقت computerized.`],
    [`العكس هو الصح: الـ UX بيحدد (dictates) والـ HCI بيفهم.`, `الـ look and feel ده الـ UI design. الـ UX هو التجربة الكاملة والـ HCI عن فهم التفاعلات.`, `صح. المحاضرة بتقول إن الـ UX عن تحديد (dictating) التفاعلات، والـ HCI في الأساس عن فهم التفاعل بين البني آدمين والكمبيوتر.`, `أجهزة الـ input/output هي جزء الـ "computer" بس. الـ HCI بيغطي كمان الـ user والـ interaction.`],
    [`لسه محدش بيعمل design أو prototype؛ الفريق بيتعلم عن الـ users.`, `الـ Evaluation بيختبر ويحسّن design موجود؛ هنا لسه مفيش design.`, `الـ Implementation مش واحد من الـ 3 أجزاء بتوع الـ UI design process، ومفيش code بيتكتب.`, `صح. الـ User research معناه إنك تتعلم عن الـ users (مهاراتهم، اللي بيشتتهم، الاحتياجات الخاصة زي كبار السن) والـ previous research عن قدرات الإنسان وإدراكه.`],
    [`صح. الأهداف هي التصميم للناس، وللـ tasks، وللبيئات اللي الـ users عايشين وشغالين فيها (زي organization).`, `التصميم للبيئة مذكور صراحةً كواحد من أهداف الـ HCI.`],
    [`صح. دي فكرة الـ human-task interaction: الـ user عايز يخلّص task والـ system مجرد وسيلة.`, `الفكرة عكس كده: الـ user المفروض يفكر في الـ task مش في الأداة.`, `المثال مش نقد لـ Zoom؛ هو بيوضح إن الـ users بيتفاعلوا مع الـ task.`, `المثال عن الـ task والناس، مش عن الـ hardware.`],
    [`جزء الـ User عن القدرات العقلية والجسدية.`, `صح. جزء الـ Interaction بيغطي الـ interfaces والـ HCI patterns والـ design والـ usability evaluation.`, `جزء الـ Computer/Machine عن أجهزة الـ input/output.`, `الـ Human Factors Engineering هو المجال الأب للـ HCI، مش واحد من أجزاءه التلاتة.`],
    [`تشبيه الحكم معناه العكس.`, `صح. زي الحكم، الـ interface بيبقى ناجح لما <b>محدش ياخد باله منه</b>، عشان الـ users يركزوا على الـ task (الـ invisible interface).`],
    [`الـ invisible interface بيخلي الـ users يركزوا على الـ task. الـ form ده بيخلي الـ user يتخانق مع الأداة.`, `إنه يطلب نفس الداتا كذا مرة وبعدين يفشل ده معناه إن الـ users محدش فهمهم.`, `صح. المحاضرة بتدي الـ form ده كمثال لـ UX وحش: متكرر، وبطيء، وبيخلص بـ error.`, `الـ Industrial design فرع منفصل؛ المثال ده عن user experience وحشة في web form.`]
  ]
};

AR.hci.lectures["2"] = {
  notes: [
    { h: `مراجعة (Recap)`, pts: [
      `الـ Interaction design ليه 3 أجزاء: user research، و design and prototyping، و evaluation.`,
      `اشتغل مع الـ users بدل ما تخمّن (<b>user-centric design</b>). وخلي هدفك invisible interfaces (<b>task-oriented design</b>).`
    ]},
    { h: `جهاز Qualcomm بتاع سواقين التريلات (truckers)`, pts: [
      `النسخة الأولى كان فيها <b>زراير صغيرة</b>.`,
      `الـ User research اكتشف إن الـ truckers غالباً <b>إيديهم كبيرة</b> وكتير <b>بيلبسوا جوانتيات</b>.`,
      `الـ design الأحسن: <b>touch screen كبيرة</b> و<b>stylus pen</b>.`
    ]},
    { h: `مشكلة الـ full-featured systems (MS Office)`, pts: [
      `برامج الـ productivity الكاملة فيها features كتير عشان تغطي كل الاحتياجات الممكنة.`,
      `features أكتر معناها: البرنامج يحسسك إنه معقد، والحاجات أصعب في إنك تلاقيها أو تتعلمها، والتركيز يبقى على الأداة أكتر من الـ task.`,
      `الـ <b>Bloatware</b>: منتج فيه features كتير أوي، أو megabytes كتير أوي، أو بطيء أوي، أو صعب أوي في الاستخدام، أو ببساطة "كتير أوي".`,
      `Office 97–2003: الصحافة سمّته "bloated"؛ كان فيه list طويلة جداً من الـ feature requests؛ الناس حسّت إنها متحكمة أقل؛ الـ menus والـ toolbars كانت مليانة ومش scalable؛ والناس مكانتش بتاخد بالها من الـ features الجديدة ولا بتستخدمها.`
    ]},
    { h: `آليات Office 2000 (وليه فشلت)`, pts: [
      `الـ <b>Adaptive (personalized) menus</b>: الـ menu الرئيسية بتعرض list قصيرة بالـ commands الأكتر احتمال تستخدمها؛ وفيه <b>chevron</b> في الآخر بيفتح الـ menu كاملة.`,
      `الـ <b>Rafted toolbars</b>: اتنين toolbars أو أكتر بيتشاركوا سطر واحد؛ وفيه algorithm بيتوقع الزراير الأقل استخداماً وبينقلها لـ <b>overflow</b> area.`,
      `ليه فشلت: الـ customization مكانش سهل ولا دقيق. الـ short menus الغلط كانت بتجبر الـ user يعمل scan تاني للـ menu الكاملة، فالـ <b>scanning خد ضعف الوقت</b>. وبعدين اتقفلوا by default.`,
      `القاعدة: <b>"Auto-customization, unless it does a perfect job, is usually worse than no customization at all."</b> يعني الـ auto-customization لو مش شغال perfect، غالباً بيبقى أوحش من إنك متعملش customization خالص.`
    ]},
    { h: `من التخمين للـ data`, pts: [
      `قبل 2003، القرارات كانت في الغالب <b>تخمين</b>: "based on feel, estimation, and guess work" يعني بالإحساس والتقدير والتخمين.`,
      `Office 2003 قدّم الـ <b>CEIP</b> (Customer Experience Improvement Program): balloon مكتوب فيها "Help make Office better" بتسجّل الـ users وبتجمع usage data و hardware data <b>anonymous</b>.`,
      `لـ Office 2007 الفريق كان عنده data لأكتر من <b>1.3 billion sessions</b>. جالهم data من Word و Outlook كتير لدرجة إن <b>70% منها اترمى</b>.`,
      `اتعلموا أنهي commands بتتستخدم كتير، وأنهي بتتستخدم ورا بعض، وأنهي بتتستخدم <b>7x أكتر بالـ keyboard</b> من الماوس، والناس بتفتح كام document في نفس الوقت، والشاشات حجمها قد إيه.`
    ]}
  ],
  cards: [
    `زراير صغيرة، بس الـ truckers إيديهم كبيرة وبيلبسوا جوانتيات. الحل: touch screen كبيرة و stylus pen.`,
    `منتج فيه features كتير أوي، أو megabytes كتير، أو بطيء أوي، أو صعب أوي، أو ببساطة "كتير أوي".`,
    `list قصيرة بالـ commands المتوقع استخدامها؛ والـ chevron بيفتح الـ menu كاملة.`,
    `الـ Toolbars بتتشارك سطر واحد؛ والزراير الأقل استخداماً بتروح overflow area.`,
    `لو مش شغال perfect، غالباً بيبقى أوحش من إنك متعملش customization خالص.`,
    `Customer Experience Improvement Program: بيجمع usage data anonymous من users بتوع Office 2003.`,
    `أكتر من 1.3 billion sessions؛ و70% من data الـ Word/Outlook اترمت.`
  ],
  qa: [
    `الـ Customization مكانش سهل ولا دقيق. الـ short menu الغلط كانت بتجبر الـ users يعملوا scan للـ menu الكاملة تاني (الـ scanning خد ضعف الوقت)، وده زوّد التعقيد وقلّل الكفاءة. وبعدين اتقفلوا by default.`,
    `عن طريق الـ CEIP، اللي جمع usage data anonymous (أكتر من 1.3B sessions): أنهي commands بتتستخدم، وبأنهي ترتيب، keyboard ولا ماوس، عدد الـ documents المفتوحة، وحجم الشاشات.`,
    `البرنامج يحسسك إنه معقد، وبيبقى أصعب تلاقي أو تتعلم إزاي تعمل الحاجات، والـ users بيركزوا على الأداة أكتر من الـ task.`
  ],
  quiz: [
    [`الزراير الصغيرة كانت هي المشكلة، مش حاجة بيفضلوها.`, `الـ design الأحسن أصلاً استخدم touch screen كبيرة.`, `صح. وده السبب إن الزراير الصغيرة فشلت.`, `الـ Voice systems مش جزء من case الـ Qualcomm أصلاً. الـ research لقى إن سواقين التريلات إيديهم كبيرة ولابسين جوانتيات، فالحل كان touch screen كبيرة مع stylus (L2, Qualcomm device).`],
    [`حالة سواقين التريلات مفيهاش أي ذكر للـ voice input. مشكلة الجهاز الأولاني كانت زراير صغيرة الإيدين الكبيرة اللابسة جوانتيات مش قادرة تدوس عليها (L2, Qualcomm device).`, `صح. جهاز الـ Qualcomm الأولاني كان فيه زراير صغيرة، وفشل عشان الـ user research بيّن إن السواقين غالباً إيديهم كبيرة ولابسين جوانتيات (L2, Qualcomm device).`, `الـ touch screen الكبيرة مع الـ stylus pen دي كانت التصميم المحسّن اللي جه بعد الـ user research، مش النسخة الأولانية (L2, Qualcomm device).`, `الجهاز كان ليه interface فعلاً؛ مشكلته كانت الزراير الصغيرة. والحل خلّى فيه شاشة وخلاها touch screen كبيرة (L2, Qualcomm device).`],
    [`صح. الـ adaptive menu بيعرض الأول list قصيرة بالـ commands اللي غالباً هتستخدمها؛ ولما تدوس على الـ chevron اللي في آخرها بتفتح الـ menu كلها (L2, Office 2000 mechanisms).`, `الـ double right-click مش جزء من الـ adaptive menus. المحاضرة بتقول إن الـ chevron اللي في آخر الـ menu القصيرة هو اللي بيفتحها (L2, Office 2000 mechanisms).`, `الـ overflow area تبع الـ rafted toolbars.`, `مفيش في المحاضرة حاجة اسمها تفضل دايس فتتفتح. الـ adaptive menu الكاملة بتتفتح بالضغط على الـ chevron اللي في آخرها (L2, Office 2000 mechanisms).`],
    [`الأيقونات عمرها ما كانت المشكلة. المشكلة إن لو الـ short menu غلط، المستخدم بيضطر يعمل scan للـ full menu كمان (L2, Office 2000 mechanisms).`, `صح. لما الـ short menu المتوقعة متكونش فيها الـ command، المستخدم بيعملها scan، وبعدين يفتحها ويعمل scan للـ full menu تاني، فالـ scanning بياخد حوالي ضعف الوقت (L2, Office 2000 mechanisms).`, `الـ CEIP ملوش علاقة بـ Office 2000: ده جه بعدين في Office 2003 عشان يجمع usage data، ومكانش بيبطّأ الـ menu scanning (L2, From guesswork to data).`, `الـ Toolbars مااتشالتش: الـ rafted toolbars كانت بتشارك سطر واحد وبتنقل الزراير المتوقع إنها أقل استخدام لـ overflow area (L2, Office 2000 mechanisms).`],
    [`أصغر بألف مرة: الفريق كان عنده أكتر من 1.3 billion session، مش million (L2, From guesswork to data).`, `الـ 13 million أقل بكتير من الرقم الحقيقي. في Office 2007 الفريق كان عنده أكتر من 1.3 billion session من الـ usage data (L2, From guesswork to data).`, `صح. الـ CEIP إدّى فريق Office 2007 أكتر من 1.3 billion session؛ والـ data بتاعة Word وOutlook كانت كتير لدرجة إن 70% منها اترمى (L2, From guesswork to data).`, `الـ 70 جاية من معلومة تانية: 70% من data الـ Word والـ Outlook اترمت. الإجمالي كان أكتر من 1.3 billion session (L2, From guesswork to data).`],
    [`الـ Usage data بقت متاحة بس مع الـ CEIP في Office 2003. قبل كده الفريق مكانش عنده data حقيقية يبني عليها قراراته (L2, From guesswork to data).`, `صح. فريق Office اعترف إن القرارات قبل 2003 كانت "based on feel, estimation, and guess work"، لحد ما الـ CEIP جاب usage data حقيقية (L2, From guesswork to data).`, `المحاضرة مقالتش إن القرارات كانت جاية من usability labs. قالت إنها كانت مبنية على الإحساس والتقدير والتخمين (L2, From guesswork to data).`, `الـ Competitor analysis مش مذكور خالص. القرارات قبل 2003 كانت مبنية على الإحساس والتقدير والتخمين، واللي اتستبدل بعدين بـ data الـ CEIP (L2, From guesswork to data).`]
  ],
  extra: [
    [`الزراير الصغيرة كانت المشكلة في النسخة الأولى.`, `المحاضرة مذكرتش voice input؛ الـ redesign استخدم شاشة.`, `keys أكتر معناها targets أصغر كمان للإيدين اللي لابسة جوانتيات.`, `صح. الـ design الأحسن كان touch screen كبيرة مع stylus pen.`],
    [`صح. ده تعريف المحاضرة للـ bloatware.`, `ده وصف الـ CEIP، اللي Microsoft استخدمته عشان تستبدل التخمين بالـ data.`, `دي الـ adaptive (personalized) menu.`, `إن اتنين toolbars أو أكتر يشاركوا سطر واحد ده الـ rafted toolbar، واحدة من mechanisms الـ Office 2000. الـ Bloatware هو منتج فيه features كتير زيادة عن اللزوم أو ببساطة حاجات كتير أوي (L2, Full-featured systems).`],
    [`دي الـ adaptive (personalized) menu.`, `صح. الـ Rafted toolbars بتحط اتنين toolbars أو أكتر على سطر واحد، وفيه algorithm بيتوقع الزراير الأقل استخدام وبينقلها لـ overflow area (L2, Office 2000 mechanisms).`, `الـ toolbars فضلت موجودة؛ بس اتشاركت سطر وخبّت شوية زراير.`, `المحاضرة مقالتش كده؛ استخدام الـ keyboard كان finding من الـ CEIP.`],
    [`صح. الـ customization مكانش سهل ولا دقيق، فالآليات دي اتقفلت by default بعدين.`, `المحاضرة بتقول إنها فشلت واتقفلت by default.`],
    [`ده مذكور كنتيجة لزيادة الـ features.`, `ده مذكور كنتيجة لزيادة الـ features.`, `صح. اللي حصل العكس: مع Office 97–2003 الناس حسّت إنها متحكمة <b>أقل</b>.`, `ده مذكور كنتيجة لزيادة الـ features.`],
    [`الـ CEIP مكانش بيجمع أسامي ولا emails: الـ usage والـ hardware data بتاعته كانت anonymous، من المستخدمين اللي اشتركوا عن طريق بالونة "Help make Office better" (L2, From guesswork to data).`, `المحاضرة مذكرتش فيديو؛ الـ CEIP جمع usage و hardware data.`, `رأي الصحافة كان جزء من المشكلة، مش data من الـ CEIP.`, `صح. الـ balloon سجّلت الـ users والـ CEIP جمع usage و hardware data بشكل anonymous.`],
    [`صح. الفريق عرف إن فيه commands بتتستخدم 7x أكتر بالـ keyboard من الماوس.`, `"الضعف" مرتبط بإن الـ short menus الغلط خلّت الـ scanning ياخد ضعف الوقت، مش باستخدام الـ keyboard.`, `الـ 70 دي نسبة data الـ Word و Outlook اللي اترمت.`, `الـ 1.3 مرتبطة بالـ 1.3+ billion sessions، مش باستخدام الـ keyboard.`],
    [`مااحتفظوش بيها كلها: جالهم data من Word وOutlook كتير لدرجة إن 70% منها اترمى (L2, From guesswork to data).`, `صح. جالهم data من Word و Outlook كتير لدرجة إن <b>70% منها اترمى</b>.`],
    [`الـ Office case وضّح إن features كتير أوي بتودي لـ bloatware.`, `صح. دي القاعدة اللي طلعت من الـ adaptive menus والـ rafted toolbars، لما التوقعات الغلط خلّت الـ scanning ياخد ضعف الوقت.`, `فريق Office بعد عن التخمين وراح للـ data.`, `ده حل الـ Qualcomm truckers، مش درس الـ auto-customization.`],
    [`صح. دي من المشاكل المذكورة لـ Office 97–2003.`, `المحاضرة بتذكر المشاكل دي بالظبط لـ Office 97–2003.`]
  ]
};

AR.hci.lectures["3"] = {
  notes: [
    { h: `الـ User-centered design`, pts: [
      `زمان كنا بنصمم الـ systems عشان تحقق <b>functional specification</b> معينة.`,
      `الـ <b>User-centered design</b>: design بياخد احتياجات الـ user في الاعتبار في <b>كل خطوة</b>.`,
      `تجاهل الـ user research حاجة منتشرة. دخّل الـ users عشان القرارات تبقى مبنية على الواقع مش على التخمين.`
    ]},
    { h: `الـ Design life cycle (Joyner)`, pts: [
      `process <b>iterative</b> فيه 4 مراحل: <b>Need finding ← Design alternatives ← Prototyping ← Evaluation</b> ← وترجع تاني للـ need finding.`,
      `مفيش مرحلة اسمها "user research" لأنه جزء من كل مرحلة.`
    ]},
    { h: `الـ User-centered design process (Google)`, pts: [
      `<b>Understand ← Specify ← Design ← Evaluate</b>، والـ iteration هو الأساس.`,
      `<b>Understand</b>: الـ users بيجرّبوا المنتج إزاي (research كتير). <b>Specify</b>: أهم user problem محتاجين نحلها. <b>Design</b>: حلول، وبعدين نبدأ نبني. <b>Evaluate</b>: نختبر مع users حقيقيين.`
    ]},
    { h: `فين الـ "user research"؟`, pts: [
      `Joyner و Google مش بيدّوه خطوة لوحده لأنه <b>جزء أساسي من كل مرحلة</b>، وعشان محدش يفتكره خطوة بتتعمل مرة واحدة في الأول.`,
      `Joyner بيقول: <b>"you need users early and often"</b> يعني محتاج الـ users من بدري وكتير.`,
      `Google: الـ user research مستمر وبيحصل <b>قبل وأثناء وبعد</b> مرحلة الـ design.`,
      `بس إنك تخليه component واضح لوحده برضه مفيد: بيمنع إنك تستهون بيه، وكمان بقى أكتر وأكتر وظيفة لناس متخصصين.`
    ]},
    { h: `مين بيعمل الـ UI/UX design؟`, pts: [
      `<b>Software engineer</b> بيصمم الـ system كله، وغالباً يعرف حاجة بسيطة عن الـ HCI.`,
      `<b>UI/UX designer</b> في فريق الـ development، وده بقى منتشر أكتر في الشركات الصغيرة والمتوسطة.`,
      `<b>Specialists</b> لكل دور (UX researcher، UX designer، visual designer، UX engineer) في الشركات الكبيرة زي Google.`
    ]},
    { h: `أنواع الـ user research حسب إمتى (WHEN)`, pts: [
      `<b>1. Foundational (strategic / generative)</b>: بيحصل <b>قبل ما أي حاجة تتصمم</b>. الهدف إنك تحدد مشاكل الـ users وإيه اللي هنبنيه. بتتكلم مع الـ users عن الـ pain points بتاعتهم، وبيطلّعلك فرص الفريق مكانش هيفكر فيها.`,
      `<b>2. Tactical (design)</b>: بيحصل <b>أثناء مرحلة الـ design</b>. بيقولك المنتج المفروض يتبني إزاي، ومحتاج user feedback على الـ prototypes.`,
      `<b>3. Post-launch</b>: هل نجحنا؟ هل الـ system بيلبّي احتياجات الـ users؟`
    ]},
    { h: `أنواع الـ user research حسب مين (WHO)`, pts: [
      `<b>Primary research</b>: research إنت بتعمله بنفسك. الطرق: interviews، focus groups، surveys، usability studies، participant observations.`,
      `<b>Secondary research</b>: research حد تاني عمله. المصادر: كتب، journals، وحاجات شبه كده.`,
      `الـ Secondary research مهم في الأول عشان تجمع statistics وحقائق وأرقام. بيوفر مجهود ووقت وبيدعم الـ primary findings. وغالباً بيعمله researchers عندهم خبرة في organizations موثوقة، وده صعب تكرره.`,
      `ناس كتير من الـ practitioners مش عارفين يستخدموه إزاي. الكورسات (psychology، cognition) ومجتمعات الـ HCI/UX بتساعد.`
    ]}
  ],
  cards: [
    `design بياخد احتياجات الـ user في الاعتبار في كل خطوة.`,
    `Need finding ← Design alternatives ← Prototyping ← Evaluation (iterative).`,
    `Understand ← Specify ← Design ← Evaluate (الـ iteration هو الأساس).`,
    `"You need users early and often." يعني محتاج الـ users من بدري وكتير.`,
    `Strategic/generative. قبل ما أي حاجة تتصمم؛ بيلاقي مشاكل الـ users وإيه اللي هنبنيه.`,
    `Design research. أثناء مرحلة الـ design؛ بيستخدم feedback على الـ prototype عشان نقرر هنبني إزاي.`,
    `بعد الـ release: هل نجحنا وهل بيلبّي احتياجات الـ users؟`,
    `research إنت بتعمله بنفسك: interviews، focus groups، surveys، usability studies، observations.`,
    `research حد تاني عمله: كتب، journals، وحاجات شبه كده.`
  ],
  qa: [
    `1) Foundational (strategic/generative): قبل ما أي حاجة تتصمم، عشان نلاقي مشاكل الـ users وإيه اللي هنبنيه. 2) Tactical (design): أثناء الـ design، بنستخدم feedback على الـ prototype عشان نقرر هنبني إزاي. 3) Post-launch: بعد الـ launch، عشان نشوف نجحنا ولا لأ والـ system بيلبّي احتياجات الـ users ولا لأ.`,
    `لأنهم شايفينه جزء أساسي من كل مرحلة، وعايزين يتجنبوا الفكرة الغلط إنه خطوة واحدة في الأول. Google بتقول إنه بيحصل قبل وأثناء وبعد الـ design.`,
    `Software engineer بيصمم الـ system كله؛ أو UI/UX designer في فريق الـ development (منتشر في الشركات الصغيرة والمتوسطة)؛ أو كذا specialist (UX researcher، UX designer، visual designer، UX engineer) في الشركات الكبيرة.`
  ],
  quiz: [
    [`الـ Usability tests تبع الـ tactical أو الـ post-launch.`, `الـ research اللي بيحصل بعد ما المنتج يتصمم وينزل ده الـ post-launch research (نجحنا ولا لأ؟). الـ Foundational research بيحصل قبل ما أي حاجة تتصمم (L3, Types by WHEN).`, `الـ Marketing campaigns مش توقيت من توقيتات الـ research. التلاتة هما foundational (قبل الـ design)، وtactical (أثناء الـ design)، وpost-launch (L3, Types by WHEN).`, `صح. بيحدد المشاكل وإيه اللي هنبنيه.`],
    [`الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design. اللي بعد الـ launch ده الـ post-launch research.`, `صح. الـ Tactical research بيحصل أثناء الـ design وبيستخدم feedback على الـ prototypes.`],
    [`ده الـ user-centered design process بتاع Google.`, `صح. الـ iterative design life cycle بتاع Joyner هو Need finding ← Design alternatives ← Prototyping ← Evaluation، وبعدين يرجع للـ need finding تاني (L3, Design life cycle).`, `الـ Plan, Build, Test, Deploy ده software development cycle عام. الـ cycle بتاع Joyner هو Need finding, Design alternatives, Prototyping, Evaluation (L3, Design life cycle).`, `دي مش مراحل Joyner؛ Joyner معندوش مرحلة coding ولا launch. الـ cycle بتاعه هو Need finding, Design alternatives, Prototyping, Evaluation (L3, Design life cycle).`],
    [`الـ research اللي حد تاني عمله (كتب، journals) ده الـ secondary research. الـ Primary research هو اللي إنت بتعمله بنفسك، زي الـ interviews أو الـ surveys (L3, Types by WHO).`, `صح. الـ Primary research هو اللي إنت بتعمله بنفسك.`],
    [`صح. قراية الـ literature الموجودة دي secondary research.`, `الـ Focus groups دي primary research: إنت اللي بتعملها بنفسك مع الـ users. المحاضرة حاطاها مع الـ interviews والـ surveys والـ usability studies والـ observations (L3, Types by WHO).`, `الـ Interviews طريقة primary، عشان إنت اللي بتعملها بنفسك. الوحيدة اللي معتمدة على research حد تاني عمله هي الـ literature review (L3, Types by WHO).`, `الـ Surveys طريقة primary: إنت اللي بتصممها وتنفذها بنفسك. قراية الـ literature الموجودة هي الطريقة الـ secondary هنا (L3, Types by WHO).`],
    [`صح. الاتنين مذكورين كطرق primary منتشرة.`, `هم مذكورين صراحةً تحت الـ primary research.`],
    [`صح. إنك تستخدم research حد تاني عمله ده secondary research.`, `الـ Papers اللي كتبها ناس تانيين دي secondary sources.`],
    [`صح. الـ Surveys مذكورة ضمن الطرق الـ primary.`, `الـ Surveys واحدة من الطرق الـ primary المذكورة.`],
    [`ضيق أوي: "before design" ده الـ foundational research بس. Google بيقول إن الـ user research مستمر: قبل وأثناء وبعد الـ design (L3, Where is user research?).`, `ضيق أوي: بعد الـ launch ده الـ post-launch research بس. Google بيقول إن الـ user research بيحصل قبل وأثناء وبعد مرحلة الـ design (L3, Where is user research?).`, `صح. Google بتسميه جزء مستمر من الـ life cycle.`, `المحاضرة عمرها ما ربطت الـ research بالـ budget. Google بيعتبره جزء مستمر من الـ life cycle، قبل وأثناء وبعد الـ design (L3, Where is user research?).`]
  ],
  extra: [
    [`ده الـ design life cycle بتاع Joyner، مش process بتاع Google.`, `لازم تفهم الـ users قبل ما تحدد (specify) المشكلة.`, `صح. الـ process بتاع Google هو Understand و Specify و Design و Evaluate، والـ iteration هو الأساس.`, `إنك تصمم قبل ما تفهم الـ users هو بالظبط اللي الـ user-centered design بيتجنبه.`],
    [`الـ Testing مع users حقيقيين ده الـ Evaluate step، آخر خطوة في Understand ← Specify ← Design ← Evaluate (L3, Google UCD process).`, `تصميم الحلول والبدء في البناء ده الـ Design step، واللي بييجي بعد ما الـ Specify يختار المشكلة اللي هنحلها (L3, Google UCD process).`, `إنك تفهم الـ users بيعيشوا تجربة المنتج إزاي ده الـ Understand step، أول خطوة وأكتر خطوة فيها research (L3, Google UCD process).`, `صح. الـ Specify معناها إنك تختار أهم user problem محتاج تتحل.`],
    [`التصميم على functional specification ده الطريقة اللي الـ systems <i>كانت</i> بتتصمم بيها زمان.`, `صح. الـ User-centered design بياخد احتياجات الـ user في الاعتبار في <b>كل خطوة</b>.`],
    [`صح. الـ User research جزء أساسي من كل مرحلة، فمش خطوة واحدة.`, `الاتنين بيقولوا إن الـ users مطلوبين طول الوقت، مش إن الـ research ملوش لازمة.`, `المحاضرة مقالتش أي حاجة زي كده؛ الـ research جزء أساسي من الـ design.`, `الـ Secondary research بيدعم الـ primary research؛ مش بيحل محل الـ user research.`],
    [`إنك تستنى للآخر هو بالظبط اللي Joyner بيحذّر منه.`, `صح. Joyner بيقول "you need users early and often".`, `دي فكرة الـ "one-time step" اللي المحاضرة رافضاها.`, `دي مش جملة Joyner؛ الـ users مطلوبين طول الوقت.`],
    [`الـ Tactical research بيحصل أثناء الـ design ومحتاج feedback على الـ prototypes.`, `الـ Post-launch research بيحصل بعد الـ release عشان نشوف النجاح.`, `صح. بيحصل قبل ما أي حاجة تتصمم، بيتكلم مع الـ users عن الـ pain points، وبيقرر إيه اللي هيتبني.`, `الفريق بيتكلم مع الـ users بنفسه، يبقى primary؛ وكمان "secondary" ده تقسيم حسب WHO مش WHEN.`],
    [`صح. دي بالظبط أسئلة الـ post-launch research.`, `المحاضرة بتعرّف الـ post-launch research بالأسئلة دي.`],
    [`الـ Foundational research بيحصل قبل ما أي حاجة تتصمم.`, `المنتج لسه متعملوش launch.`, `الفريق بيجمع الـ feedback بنفسه، والـ secondary ده تقسيم WHO.`, `صح. الـ Tactical research بيحصل أثناء الـ design، بيقول المنتج يتبني إزاي، وبيستخدم feedback على الـ prototypes.`],
    [`صح. المحاضرة بتذكر الفوايد دي للـ secondary research في الأول.`, `الـ Primary research هو اللي specific لاحتياجاتك.`, `الـ Secondary research بيدعم الـ primary findings؛ مش بيلغيها.`, `الـ Foundational research ده primary research بيتعمل قبل ما أي حاجة تتصمم.`],
    [`صح. المحاضرة بتقول إن الـ component الواضح بيمنع إنك تستهون بيه، وكمان بقى أكتر وأكتر دور للـ specialists.`, `المحاضرة بتذكر فوايد إنك تخلي الـ user research واضح لوحده.`]
  ]
};

AR.hci.lectures["4"] = {
  notes: [
    { h: `فوايد الـ Secondary research`, pts: [
      `بيجاوب على أسئلة عن <b>قدرات الإنسان وحدوده</b>. مثال: تصمم لـ users عندهم color-blindness باستخدام حقائق عن عمى الألوان.`,
      `بيجاوب على أسئلة عن <b>مجموعات users عندهم مشاكل مشتركة</b>. مثال: app لبلد فقير، الـ users فيه غالباً معاهم <b>أجهزة low-end</b>.`
    ]},
    { h: `أنواع الـ user research حسب إيه (WHAT)`, pts: [
      `<b>Quantitative</b>: data طبيعتها <b>أرقام</b> (قياسات، عدّ). أسهل للـ engineers والناس الـ technical.`,
      `<b>Qualitative</b>: ملاحظات عن <b>ليه وإزاي</b> الحاجات بتحصل، وغالباً مبنية على interviews. أصعب على الناس الـ technical، بس هي اللي محتاجينها عشان نفهم بجد.`
    ]},
    { h: `Primary ضد secondary research` },
    { h: `نصايح عامة للـ research methods`, pts: [
      `الـ User research لازم <b>يتخطط له من بدري</b>. لو interview، اكتب <b>script</b> بالأسئلة قبلها بدل ما تسأل أسئلة عشوائية.`,
      `التخطيط مش معناه إنك تبقى ناشف: خليك flexible أثناء الـ activity (<b>الـ script مش كتاب مقدس</b>).`,
      `الـ Methods مش بدايل لبعض. استخدم <b>combination</b> منهم بترتيب مناسب.`,
      `الـ <b>Testing والـ iteration</b> بيحسّنوا أي technique.`,
      `الـ <b>Privacy والـ security</b> بتاعة data الـ users حاجة أساسية.`
    ]},
    { h: `الـ Privacy والـ security`, pts: [
      `اجمع بس الـ data اللي محتاجها. متربطش الـ data اللي جمعتها بـ PII أو SPII. ومتحتفظش بالـ data بعد ما متبقاش محتاجها.`,
      `الـ <b>PII (Personally Identifiable Information)</b>: تفاصيل ممكن تعرّف بيها الـ user: <b>الأسامي، عنوان البيت، الـ email، رقم التليفون</b>.`,
      `الـ <b>SPII (Sensitive PII)</b>: data لو ضاعت أو اتسرقت ممكن تعمل ضرر مالي أو إحراج أو تمييز: <b>الـ social security number، رخصة السواقة، أرقام الباسبور، أرقام الحسابات المالية، تاريخ الميلاد</b>.`
    ]},
    { h: `1) الـ Surveys`, pts: [
      `ردود سريعة من <b>عدد كبير من الـ users</b> في وقت قصير (نظرة عامة واسعة). غالباً أونلاين وسهل تعملها. وهي من <b>أرخص</b> الطرق.`,
      `ممكن تبقى خطوة أولى عشان تاخد insights عن الدوافع والتفضيلات والأولويات والـ pain points، عشان تخطط لأنشطة بعدها زي الـ interviews. وممكن كمان تيجي بعد interview أو usability study.`,
      `نصايح: <b>خليها صغيرة على قد ما تقدر</b> (أسئلة كتير بتقلل الـ response rate والـ reliability)؛ اسأل بس اللي محتاجه وهتستخدمه؛ <b>خلي بالك من الـ bias</b>؛ وخد feedback من المشاركين عن الـ survey نفسه.`
    ]}
  ],
  cards: [
    `data أرقام: قياسات وعدّ. أسهل للناس الـ technical.`,
    `ملاحظات عن ليه وإزاي الحاجات بتحصل، غالباً من interviews.`,
    `الأسامي، عنوان البيت، الـ email، رقم التليفون.`,
    `الـ SSN، رخصة السواقة، رقم الباسبور، أرقام الحسابات المالية، تاريخ الميلاد.`,
    `specific لاحتياجاتك وإنت متحكم في الـ quality / بيكلّف أكتر وبياخد وقت أطول.`,
    `رخيص وسريع / ممكن يكون قديم أوي أو مش specific كفاية.`,
    `خطط من بدري، بس خليك flexible أثناء الـ activity.`,
    `users كتير، وقت قصير، أونلاين، رخيص؛ نظرة عامة واسعة.`
  ],
  qa: [
    `الـ Primary إنت اللي بتجمعه (surveys، focus groups، interviews، observations، experiments)؛ specific لاحتياجاتك وإنت متحكم في الـ quality، بس بيكلّف أكتر وبياخد وقت أطول. الـ Secondary حد تاني جمعه (data موجودة زي الكتب والـ journals)؛ رخيص وسريع، بس ممكن يكون قديم أوي أو مش specific كفاية. والاتنين ممكن يبقوا qualitative أو quantitative.`,
    `اجمع بس اللي محتاجه، متربطش الـ data اللي جمعتها بـ PII أو SPII، ومتسيبش الـ data متخزنة بعد ما متبقاش محتاجها.`,
    `خطط من بدري (زي script للـ interview)؛ خليك flexible (الـ script مش كتاب مقدس)؛ اعمل combination من الـ methods بترتيب مناسب؛ حسّن بالـ testing والـ iteration؛ واحمي الـ privacy والـ security بتاعة data الـ users.`,
    `خليها صغيرة على قد ما تقدر، لأن الأسئلة الكتير بتقلل الـ response rate والـ reliability. اسأل أقل عدد أسئلة للـ data اللي هتستخدمها. خلي بالك من الـ bias. وخد feedback من المشاركين عن الـ survey.`
  ],
  quiz: [
    [`الأسامي دي PII عادي: بتعرّف الـ user بس مش في لستة الـ sensitive. الـ SPII هي data لو ضاعت ممكن تسبب ضرر مالي أو إحراج أو تمييز (L4, Privacy and security).`, `عنوان البيت متصنّف PII، مع الأسامي والـ email والتليفون. مش من أمثلة الـ SPII زي الـ SSN أو أرقام الحسابات المالية (L4, Privacy and security).`, `الـ Email address ده PII عادي في لستة المحاضرة. الـ SPII بتشمل الـ SSN والـ driver's license والـ passport وأرقام الحسابات المالية وتاريخ الميلاد (L4, Privacy and security).`, `صح. لو دول ضاعوا ممكن يحصل ضرر مالي.`],
    [`صح. الـ PII هي التفاصيل اللي ممكن تعرّف الـ user، وأمثلة المحاضرة هي الأسامي وعنوان البيت والـ email ورقم التليفون (L4, Privacy and security).`, `الجملة صح: مطابقة لتعريف الـ PII في المحاضرة، والأسامي ورقم التليفون الاتنين من أمثلة الـ PII (L4, Privacy and security).`],
    [`الـ data الرقمية (measures، counts) دي اللي بتعرّف الـ quantitative research. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل (L4, Types by WHAT).`, `صح. الـ Qualitative research عن ليه وإزاي، مش أرقام.`],
    [`الـ Quantitative data رقمية: measures وcounts. أوصاف اللي بنعملهم interview بتشرح ليه وإزاي، وده اللي بيخليها qualitative (L4, Types by WHAT).`, `صح. الأوصاف والشروحات دي qualitative.`, `الـ "Average data" مش نوع من أنواع الـ research data. حسب الـ WHAT، الـ research يا quantitative (أرقام) يا qualitative (ليه وإزاي) بس (L4, Types by WHAT).`, `الـ "Gathering data" مش نوع data؛ الـ gathering يعني مجرد تجميع. الأوصاف اللي جاية من الـ interviews دي qualitative data (L4, Types by WHAT).`],
    [`المحاضرة مخصّتش الـ designers. قالت إن الـ quantitative research (الرقمي) أسهل على الـ engineers والناس الـ technical (L4, Types by WHAT).`, `صح. الـ Quantitative research رقمي (measures، counts)، فالمحاضرة بتقول إنه أسهل على الـ engineers والناس الـ technical؛ والـ qualitative أصعب عليهم (L4, Types by WHAT).`, `الـ Marketing teams مش مذكورين. المحاضرة بتقول إن الـ quantitative research أسهل على الـ engineers والناس الـ technical (L4, Types by WHAT).`, `الأطفال ملهمش أي علاقة بالنقطة دي. الـ Quantitative research متقال عليه إنه أسهل على الـ engineers والناس الـ technical (L4, Types by WHAT).`],
    [`صح. الـ Privacy والـ security بتوع الـ user data حاجة أساسية: اجمع اللي محتاجه بس، متربطوش بـ PII/SPII، وامسحه لما متبقاش محتاجه (L4, General tips).`, `الـ Privacy بتزوّد الحرص؛ مش بتسرّع الحاجات.`, `العكس: الـ privacy guidelines بتحدد إنت بتجمع إيه، وبتفصله عن الـ PII/SPII، وبتمسحه بعد الاستخدام، فمفيش حاجة بتتنشر للعامة (L4, Privacy and security).`, `الـ Privacy مش بديل لأي method؛ الـ interviews لسه بتستخدم. الـ Privacy مهمة عشان بتحمي الـ user data (L4, Privacy and security).`],
    [`صح. خطط من بدري، بس الـ script مش كتاب مقدس.`, `المحاضرة بتقول إن التخطيط مش معناه التشدد: "the script is not a bible"، فلازم تفضل flexible أثناء الـ session (L4, General tips).`, `اعمل combination من الـ methods؛ الـ qualitative مطلوب عشان تفهم بجد.`, `الـ Privacy والـ security بتوع الـ user data متصنفين إنهم essential، فعمرك ما تضحي بيهم عشان الراحة (L4, General tips).`],
    [`المحاضرة بتقول خطط بدري واكتب script بالأسئلة بدل ما تسأل أسئلة عشوائية (L4, General tips).`, `صح. الـ User research لازم يتخطط له بدري: للـ interview اكتب script بالأسئلة قبلها، وفي نفس الوقت خليك flexible لأن الـ script is not a bible (L4, General tips).`, `تجاهل الـ context مش خطوة تحضير. نصيحة المحاضرة إنك تخطط بدري بـ script فيه الأسئلة (L4, General tips).`, `الـ User research هدفه احتياجات الـ user والـ pain points بتاعته، مش التفاصيل الـ technical بس. خطوة التحضير هي كتابة script بالأسئلة (L4, General tips).`],
    [`الـ Surveys من أرخص الطرق؛ الـ interviews أغلى.`, `صح. الـ Interviews بتبقى synchronous وغالباً محتاجة incentives.`],
    [`الـ surveys الطويلة بتضر الـ response rate والـ reliability.`, `صح. نصيحة الـ survey إنك تخليه صغير على قد ما تقدر، لأن الأسئلة الكتير بتقلل الـ response rate والـ reliability بتاعة الـ data (L4, Surveys).`],
    [`أسئلة أكتر يعني data أكتر تتعالج، فالـ analysis بيبقى أبطأ. التأثير الحقيقي هو response rate أقل وdata أقل reliability (L4, Surveys).`, `الأسئلة الزيادة مش بتزود الدقة: اللي بيجاوب بيتعب فبيجاوب أوحش، وده بيقلل الـ reliability. عشان كده الـ surveys لازم تبقى صغيرة على قد ما تقدر (L4, Surveys).`, `الـ surveys الطويلة بتتعب اللي بيجاوبوا، فناس أقل بتكمّلها. المحاضرة بتقول إن الأسئلة الكتير بتقلل الـ response rate (L4, Surveys).`, `صح. المحاضرة بتحذّر إن الأسئلة الكتير بتقلل الـ response rate وبتأثر على الـ reliability، فخلي الـ survey صغير على قد ما تقدر (L4, Surveys).`]
  ],
  extra: [
    [`الـ Social security number ده Sensitive PII، لأن ضياعه ممكن يسبب ضرر مالي. الحاجات اللي PII بس هي الأسامي وعنوان البيت والـ email والتليفون (L4, Privacy and security).`, `صح. الـ Email address مذكور تحت الـ PII (مع الأسامي وعنوان البيت ورقم التليفون)، مش تحت الـ SPII.`, `أرقام الـ Passport في لستة الـ SPII، يعني data لو ضاعت ممكن تسبب ضرر أو تمييز. الـ Email address هو الاختيار اللي PII عادي (L4, Privacy and security).`, `تاريخ الميلاد مذكور كـ Sensitive PII.`],
    [`ده post-launch research، مش اللي حقائق عمى الألوان بتقولهولك.`, `الـ survey بتاع الفريق نفسه يبقى primary research.`, `صح. المحاضرة بتدي التصميم لـ users عندهم color-blindness كمثال على secondary research عن قدرات الإنسان وحدوده.`, `قراية حقائق منشورة عن عمى الألوان مبتجمعش أي user data خالص.`],
    [`ده عيب الـ primary research؛ الـ secondary غالباً رخيص وسريع.`, `دي ميزة الـ primary research.`, `الجدول بيقول إن الـ secondary research ممكن يبقى qualitative أو quantitative.`, `صح. ده العيب الأساسي للـ secondary research في الجدول.`],
    [`جدول primary vs secondary بيقول إن الاتنين ممكن يبقوا qualitative أو quantitative. الـ Interviews مثلاً primary وqualitative (L4, Primary vs secondary).`, `صح. الـ primary والـ secondary research الاتنين ممكن يبقوا qualitative أو quantitative.`],
    [`صح. الـ Surveys بتدي ردود سريعة من users كتير في وقت قصير، وهي من أرخص الطرق.`, `الـ Interviews بتاخد وقت أكتر بكتير لكل user وبتكلّف أكتر.`, `ده بطيء ومينفعش يوصل لعدد كبير من الـ users بسرعة.`, `الـ group interviews برضه بتاخد وقت أكتر بكتير لكل مشارك من الـ survey.`],
    [`دي ميزة الـ secondary research.`, `صح. دي الميزة الأساسية للـ primary research في الجدول.`, `ده وصف الـ secondary research (بتدوّر على data موجودة).`, `المحاضرة بتقول إن الـ user research لازم يتخطط له من بدري.`],
    [`المحاضرة بتقول إن الـ methods مش بدايل.`, `صح. الـ Methods مش بدايل لبعض؛ استخدم <b>combination</b> منهم بترتيب مناسب.`],
    [`الـ "Only collect the data you need" دي أول privacy guideline، فهي مش الإجابة (L4, Privacy and security).`, `الـ "Do not associate collected data with PII or SPII" واحدة من الـ privacy guidelines التلاتة، فهي مش الإجابة (L4, Privacy and security).`, `صح. ده بيكسر قاعدة "متحتفظش بالـ data بعد ما متبقاش محتاجها".`, `الـ "Do not keep data after you no longer need it" دي guideline حقيقية. الاختيار اللي بيكسرها، إنك تحتفظ بالـ data على طول، هو الإجابة (L4, Privacy and security).`],
    [`صح. الـ Surveys ممكن تبقى خطوة أولى عشان تخطط للـ interviews، وممكن كمان تيجي بعد interview أو usability study.`, `المحاضرة بتقول صراحةً إن الـ survey ممكن كمان تيجي بعد interview أو usability study.`],
    [`المشكلة مش في اختيار الـ methods، المشكلة في الـ data اللي بتتجمع.`, `دي نصيحة عامة، بس مش هي اللي الـ survey ده كاسرها.`, `النصيحة دي عن تحسين الـ survey، مش عن إيه الـ data اللي تتجمع.`, `صح. الـ survey بيطلب PII عمره ما هيستخدمه، فبيكسر نصيحة الـ survey وقاعدة الـ privacy الاتنين.`]
  ]
};

AR.hci.lectures["5"] = {
  notes: [
    { h: `6 مبادئ: Clear · Concise · Specific · Expressive · Unbiased · Usable`, pts: [
      `كل مبدأ ليه أمثلة "متسألش كده… / اسأل كده بدلها…". والممتحنين كتير بيطلبوا منك تقيّم سؤال بيها.`
    ]},
    { h: `Be Clear (خليك واضح)`, pts: [
      `<b>اكتب labels للـ numeric scales</b>: مش "1–5" وخلاص، لكن "1 = Highly dissatisfied … 5 = Highly satisfied".`,
      `<b>تجنب الـ ranges اللي بتتداخل</b>: 0-2، 2-5، 5-10 دول متداخلين. استخدم 0-2، 3-5، 6-10، 11-19، 20+.`,
      `<b>لو شاكك، زوّد تفاصيل</b>: "tablet computer (يعني أي كمبيوتر بـ touchscreen و keyboard بيتفك)".`,
      `<b>حط إطار زمني (timebox) لأسئلة التكرار</b>: بدل "Never / Rarely / Often…"، اسأل "في آخر 7 أيام، اتمرنت كام مرة؟ 0، 1-2، 3-4، 5-7، 7 أو أكتر".`
    ]},
    { h: `Be Concise (خليك مختصر)`, pts: [
      `<b>لغة بسيطة</b>: "What was the overall level of cleanliness that you observed within the car?" تبقى "How clean was the car?"`
    ]},
    { h: `Be Specific (خليك محدد)`, pts: [
      `<b>تجنب الأفكار الكبيرة أوي</b>: "How satisfied were you with the interface?" تبقى "…with how quickly the interface responded?" ومعاها follow-up questions.`,
      `<b>تجنب الـ double-barrel questions</b> (حاجتين في سؤال واحد): "speed and availability of your connection" المفروض تتقسم لسؤالين.`,
      `<b>تجنب التعارض الداخلي (internal conflict)</b>: "How satisfied with your food?" المفروض تتقسم لـ temperature و appearance و flavor.`
    ]},
    { h: `Be Expressive (خلّي الـ user يعبّر)`, pts: [
      `<b>ركّز على رأي الـ user</b>: "Is our price too high?" تبقى "Do you feel our price is too high, too low, or about right?"`,
      `<b>استخدم ranges بدل yes/no</b>: "Do you use social media?" تبقى "في آخر 7 أيام، قضيت قد إيه على الـ social media؟ 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ ساعات".`,
      `<b>ادّي مستويات للتكرار أو الموافقة</b>: satisfaction scale من 5 مستويات بدل Dissatisfied/Satisfied.`,
      `<b>اسمح بأكتر من اختيار</b> لما ينفع (checkboxes بدل radio buttons).`
    ]},
    { h: `Be Unbiased (خليك محايد)`, pts: [
      `<b>اسمح للـ users يضيفوا nominal categories</b>: ضيف "Other: ____".`,
      `<b>سيب الأسئلة المفتوحة مفتوحة</b>: "Why did you choose our service?" متجبرهوش على options ثابتة.`,
      `<b>تجنب الـ leading questions</b>: "Did our brand-new AI-based interface generate better recommendations?" تبقى "How satisfied were you with the recommendations?"`,
      `<b>تجنب الـ loaded questions</b>: "how much time have you <i>wasted</i> on social media?" تبقى "…<i>spent</i>…".`
    ]},
    { h: `Be Usable (خلّي الـ survey سهل الاستخدام)`, pts: [
      `حط <b>progress bar</b>. خلي <b>أطوال الصفحات ثابتة</b>. <b>رتّب الأسئلة بشكل منطقي</b>. <b>نبّه الـ users على الأسئلة اللي متجاوبتش</b>. و<b>اعمل preview للـ survey بنفسك</b>.`
    ]},
    { h: `تمرين: قيّم أسئلة الـ survey دي`, pts: [
      `"On a scale of 1 to 4 with 1 meaning 'a lot' and 4 meaning 'not at all', how much do you enjoy exercising?" ده <b>scale مش واضح / معكوس</b>.`,
      `"Why do you like to exercise?" ده <b>leading question</b> لأنه بيفترض إنك بتحبه.`,
      `"On a scale of 1 to 6 with 1 meaning 'not at all'…" فيه <b>عدد options بيتغير</b> (4 ضد 6) و<b>scale معكوس</b> مقارنة بالسؤال اللي قبله.`,
      `"Have you listened to an audiobook this year?" ده <b>سؤال yes/no</b>. استخدم ranges.`
    ]}
  ],
  cards: [
    `Be Clear، Concise، Specific، Expressive، Unbiased، Usable.`,
    `بيسأل عن حاجتين في نفس الوقت، زي "speed and availability". قسّمه (Be Specific).`,
    `بيزقّ الـ user ناحية إجابة معينة ("our brand-new AI interface…"). الحل: صياغة محايدة (Be Unbiased).`,
    `فيه كلمة فيها حكم ("wasted"). الحل: كلمة محايدة ("spent").`,
    `0-2، 3-5، 6-10، 11-19، 20+ (Be Clear).`,
    `اسأل بـ ranges (Be Expressive): "In the past 7 days, how much time…".`,
    `ضيف option "Other: ___" (Be Unbiased).`,
    `Progress bar، أطوال صفحات ثابتة، ترتيب منطقي، تنبيه على اللي متجاوبش، preview بنفسك.`,
    `"In the past seven days, how many times…" بدل "Rarely/Often" (Be Clear).`
  ],
  qa: [
    `Be Clear (labels للـ scales، من غير ranges متداخلة، تفاصيل زيادة، timebox للتكرار)؛ Be Concise (لغة بسيطة: "How clean was the car?")؛ Be Specific (من غير أفكار كبيرة أوي، من غير double-barrel، من غير internal conflict)؛ Be Expressive (ركّز على الآراء، ranges بدل yes/no، مستويات موافقة، أكتر من اختيار)؛ Be Unbiased (ضيف "Other"، سيب الأسئلة المفتوحة مفتوحة، تجنب الكلمات الـ leading والـ loaded)؛ Be Usable (progress bar، صفحات ثابتة، ترتيب منطقي، تنبيه على اللي متجاوبش، preview).`,
    `ده loaded question: كلمة "wasted" فيها حكم على اللي بيجاوب. اسأل "…how much time have you spent on social media?"`,
    `ده سؤال yes/no بيدّي معلومات قليلة. استخدم ranges: "In the past seven days, how much time have you spent on social media? 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours".`,
    `ده double-barrel question: بيسأل عن حاجتين. قسّمه لسؤال عن الـ speed وسؤال عن الـ availability.`
  ],
  quiz: [
    [`الـ Overlapping ranges (زي 0-2، 2-5) دي rule من Be Clear عن اختيارات الإجابة الرقمية. السؤال ده مفيهوش ranges خالص؛ هو بيجمع الـ speed والـ availability في سؤال واحد (L5, Be Specific).`, `صح. بيسأل عن حاجتين في نفس الوقت، فقسّمه.`, `السماح بـ multiple selections (checkboxes) دي نصيحة من Be Expressive عن الـ answer controls. العيب هنا إنه بيسأل عن حاجتين مرة واحدة، الـ speed والـ availability (L5, Be Specific).`, `ده عن الـ usability بتاعة الـ survey، مش عن السؤال ده.`],
    [`صح. كلمة "Wasted" فيها حكم. استخدم "spent".`, `الـ double-barrel question بيسأل عن حاجتين في نفس الوقت. ده بيسأل عن حاجة واحدة، الوقت على الـ social media؛ المشكلة في كلمة الحكم "wasted" (L5, Be Unbiased).`, `كونه open-ended مش هي المشكلة؛ المحاضرة نفسها بتقول سيب الأسئلة المفتوحة مفتوحة. العيب هو الكلمة الـ loaded "wasted" (L5, Be Unbiased).`, `الـ Timeboxing حاجة كويسة؛ المشكلة في اختيار الكلمة.`],
    [`الـ ranges دي بتشترك في حدودها: الـ 2 و5 و10 و20 كل واحد فيهم واقع في range-ين، فاللي إجابته 5 بالظبط عنده اختيارين صح (L5, Be Clear).`, `صح. كل قيمة تبع range واحد بس.`, `الـ 5 والـ 10 كل واحد فيهم ظاهر في range-ين (0-5 و5-10، و5-10 و10+)، يعني الـ ranges متداخلة، وده اللي Be Clear بيقول تبعد عنه (L5, Be Clear).`, `الـ Some / Many / A lot دي كلمات مبهمة من غير أرقام، فهي مش ranges أصلاً، وكل واحد بيفهمها بشكل مختلف (L5, Be Clear).`],
    [`الموضوع عن العدل مع كل الإجابات، مش عن الاختصار.`, `صح. بيسمح للـ users يضيفوا nominal categories.`, `الـ Usable بيغطي الـ progress bars والترتيب والحاجات دي.`, `الـ Be Clear بيغطي إنك تعمل label للـ scales، وranges مش متداخلة، وتفاصيل زيادة، والـ timeboxing. إضافة "Other: ____" بتخلي الـ users يضيفوا nominal categories، ودي rule من Be Unbiased (L5, Be Unbiased).`],
    [`مش yes/no: كلمة "why" بتستدعي إجابة مفتوحة. العيب إنه مفترض إنك بتحب الرياضة، وده بيخليه leading (L5, Exercise).`, `صح. بيفترض إن الشخص بيحب التمرين.`, `الـ Overlapping ranges بتنطبق بس على اختيارات الإجابة الرقمية، والسؤال ده مفيهوش. عيبه إنه مفترض إن الشخص بيحب الرياضة (L5, Exercise).`, `إنه قصير ده حاجة كويسة (Be Concise). المشكلة إنه مفترض إن اللي بيجاوب بيحب الرياضة، فبيوجّهه (L5, Exercise).`],
    [`صح. وكمان أطوال صفحات ثابتة، وترتيب منطقي، وتنبيهات للأسئلة اللي متجاوبتش، والـ preview.`, `تجنب الـ double-barrel questions ده تبع Be Specific (قسّم الأسئلة اللي بتسأل عن حاجتين)، مش Be Usable (L5, Be Specific).`, `الـ Plain language دي rule من Be Concise ("How clean was the car?"). الـ Be Usable عن الـ survey نفسه: progress bar، طول الصفحة، الترتيب، الـ alerts، الـ preview (L5, Be Concise).`, `تجنب الكلمات الـ loaded زي "wasted" ده rule من Be Unbiased، مش Be Usable (L5, Be Unbiased).`],
    [`سؤال yes/no بيدّي معلومات أقل كمان؛ الـ Be Expressive بيقول استخدم ranges بدل yes/no (L5, Be Expressive).`, `صح. الـ Be Clear بيقول اعمل timebox لأسئلة التكرار: كلمات زي Rarely أو Often معناها بيختلف من شخص للتاني، لكن "in the past seven days" مع أعداد بتبقى مظبوطة (L5, Be Clear).`, `ده بيسأل عن حاجة تانية (الأسباب، مش التكرار)، وكمان "Why do you…" مفترض إن الشخص بيتمرن، فبيبقى leading (L5, Be Unbiased).`, `الـ scale من 1-5 من غير labels بيكسر rule الـ Be Clear بتاعة "label numeric scales"، وكمان لسه مش بيقيس الشخص بيتمرن قد إيه (L5, Be Clear).`],
    [`ده عكس النصايح: الـ surveys لازم تبقى صغيرة على قد ما تقدر والأسئلة مختصرة وواضحة، لأن الـ surveys الطويلة بتضر الـ response rate والـ reliability (L4, Surveys; L5).`, `صح. خلي الـ survey صغير على قد ما تقدر، واكتب الأسئلة بوضوح، وابعد عن الـ bias، وخد feedback من المشاركين عن الـ survey نفسه (L4, Surveys; L5, six principles).`, `الـ User research لازم يتخطط له بدري؛ survey من غير تخطيط بيكسر الـ general tips والـ six question principles (L4, General tips).`, `الـ methods لازم تتجمع مع بعض، والمحاضرة بتقول سيب الأسئلة المفتوحة مفتوحة، فالأسئلة الـ quantitative بس مش هي المبدأ (L5, Be Unbiased).`],
    [`المبدأ هو "Be UNbiased". (الـ answer sheet بتاع 2024/25 حاطط الإجابة True، وده شكله typo في السؤال. جاوب من المحاضرة.)`, `صح حسب المحاضرة: المبدأ هو Be Unbiased.`]
  ],
  extra: [
    [`صح. الـ Scales لازم يبقى ليها labels، زي "1 = Highly dissatisfied … 5 = Highly satisfied".`, `السؤال قصير أصلاً؛ المشكلة إن الـ scale ملوش labels.`, `مفيش كلمة loaded فيها مشاعر في السؤال.`, `الـ progress bar عن الـ survey كله، مش عن scale واحد من غير labels.`],
    [`السؤال الأصلي بيسأل عن حاجة واحدة بس.`, `صح. ده مثال المحاضرة على اللغة البسيطة تحت Be Concise.`, `التغيير في الصياغة، مش في شكل الإجابة.`, `السؤال الأصلي مش بيزقّ الـ user ناحية إجابة.`],
    [`مفيهوش كلمة loaded زي "wasted".`, `الـ Overlapping ranges محتاجة اختيارات رقمية زي 0-2، 2-5؛ والسؤال ده مفيهوش. عيبه إنه بيخلط الـ temperature والشكل والطعم (L5, Be Specific).`, `صح. ده مثال "avoid internal conflict" تحت Be Specific: ممكن حد يحب الطعم ومش عاجباه الحرارة.`, `بيسأل عن مستوى رضا، مش yes/no.`],
    [`الـ Radio buttons بتسمح باختيار واحد بس.`, `صح. السماح بأكتر من اختيار معناه إنك تستخدم <b>checkboxes بدل radio buttons</b>.`],
    [`بيسأل عن حاجة واحدة (الـ recommendations).`, `الـ Timeboxing لأسئلة التكرار؛ وده مش منها.`, `الـ "Other: ____" للـ lists بتاعة categories، مش للسؤال ده.`, `صح. إنه يمدح الـ interface "الـ brand-new AI-based" ويلمّح لكلمة "better" ده بيوجّه الـ user. ده مثال المحاضرة على الـ leading question.`],
    [`صح. ده مثال المحاضرة على التركيز على رأي الـ user.`, `الترتيب عن تسلسل الأسئلة، مش عن الصياغة دي.`, `الـ Overlapping ranges ليها علاقة باختيارات الإجابة الرقمية، والسؤال ده مفيهوش. إعادة الصياغة بتضيف "too low / about right" عشان تلقط رأي الـ user (L5, Be Expressive).`, `النسخة الجديدة أطول أصلاً؛ الهدف إنك تاخد رأي الـ user.`],
    [`مش بيفترض إجابة ولا بيمدح حاجة.`, `صح. تمرين المحاضرة بيعتبره yes/no؛ والـ ranges (زي في "Be Expressive") بتدي إجابات أغنى.`, `الـ loaded question فيه كلمة حكم زي "wasted"؛ السؤال ده محايد. عيبه هو شكل الـ yes/no (L5, Exercise).`, `مفيهوش ranges خالص، وده هو المشكلة الحقيقية.`],
    [`صح. تحت Be Unbiased: سيب الأسئلة المفتوحة مفتوحة.`, `المحاضرة بتقول إن السؤال ده متجبرهوش على options ثابتة.`],
    [`الـ double-barrel question بيسأل عن حاجتين مرة واحدة، لكن كل سؤال هنا بيسأل عن الاستمتاع بس. العيب هو إن الـ scales مش متسقة (L5, Exercise).`, `الاختصار حاجة كويسة (Be Concise). المشكلة الحقيقية إن الـ scale بيتغير من 4 لـ 6 اختيارات واتجاهه بيتعكس (L5, Exercise).`, `صح. تمرين المحاضرة بيشاور على إن عدد الـ options بيتغير وإن الـ scale معكوس.`, `الـ "Other" للـ lists بتاعة categories، مش للـ numeric scales.`],
    [`صح. ده مثال المحاضرة على إنك تزوّد تفاصيل تحت Be Clear.`, `المحاضرة ذاكرة المثال ده بالظبط تحت Be Clear.`]
  ]
};

AR.hci.lectures["6"] = {
  notes: [
    { h: `2) الـ Interviews`, pts: [
      `الـ research technique <b>الأكتر انتشاراً</b>.`,
      `فهم أعمق وأشمل: أسئلة مفتوحة وأسئلة "ليه" أكتر (Joyner: ركّز على الـ <b>6 Ws</b>: who، what، where، when، why، how)، ومساحة لـ follow-up questions، وتفكير في الأحداث النادرة.`,
      `عدد الـ users اللي تقدر تعملهم interview أقل بكتير من اللي تقدر تعملهم survey.`,
      `<b>أغلى</b>: <b>synchronous</b> (اللي بيعمل الـ interview بيدّي وقت لكل شخص) و<b>incentives</b> (اللي بيتعملهم interview غالباً مستنيين مقابل).`,
      `الـ Interviews والـ surveys ممكن يتعملوا ورا بعض بأي ترتيب، وتستخدم نتايج واحد عشان تخطط للتاني.`
    ]},
    { h: `نصايح لـ interview كويس`, pts: [
      `<b>خطط من بدري</b> وجهّز الأسئلة قبل الـ interview.`,
      `أثناء الـ interview فيه مفتاحين: <b>اسمع كويس</b> (الـ user هو اللي المفروض يتكلم أغلب الوقت) و<b>اكتب notes</b> (واحد يسأل وواحد يكتب؛ الـ audio recording مش كفاية؛ اكتب المشاعر وردود الفعل).`,
      `<b>سيب شوية وقت بين الـ interviews.</b>`
    ]},
    { h: `Interview لأفراد ضد groups` },
    { h: `تحديات الـ data اللي بتتجمع بالأسئلة`, pts: [
      `التخطيط بياخد وقت ومجهود أكتر من اللي ممكن يكون عند الفريق.`,
      `تحليل الـ qualitative data مش سهل.`,
      `الـ <b>Recall bias</b>: إجابات مش دقيقة عن حاجات حصلت زمان.`,
      `الـ <b>Reporting bias</b>: الناس بتدّي إجابات مثالية أكتر من الواقع.`,
      `الحل: اعمل combination مع techniques تانية زي <b>participant observation و usability studies و secondary research</b>.`
    ]},
    { h: `الـ Design: أقدر أعمله؟`, pts: [
      `Scott Klemmer: "Designing great user interfaces requires enormous creativity and a lot of hard work…" يعني الـ interfaces العظيمة محتاجة إبداع ضخم وشغل كتير، بس الـ interfaces الكويسة سهلة لو عارف الـ methods والـ techniques والـ principles الأساسية.`,
      `Joyner: "design is very hard" يعني الـ design صعب جداً.`,
      `الـ Designers بيقولوا: "إحنا مش فنانين؛ وفي أغلب الحالات مش موهوبين في الرسم كمان." الـ Design مش بيطلّع لوحات تتعلق على الحيطة.`,
      `الموهبة والإبداع ميزة. متقفلش الإبداع؛ امشي على النصايح وتجنب أكبر أخطاء الـ design.`
    ]}
  ],
  cards: [
    `الـ Interviews.`,
    `Who، What، Where، When، Why، How.`,
    `لأنها synchronous (وقت لكل شخص) ومحتاجة incentives.`,
    `اسمع كويس (الـ user يتكلم أغلب الوقت) واكتب notes (الـ audio مش كفاية).`,
    `إجابات مش دقيقة عن حاجات حصلت زمان.`,
    `الناس بتدّي إجابات مثالية أكتر من الواقع.`,
    `وقت أكتر لكل شخص، logistics أسهل، privacy أكتر.`,
    `feedback أكتر؛ والنقاش بيطلّع الـ assumptions على السطح.`
  ],
  qa: [
    `خطط من بدري وجهّز الأسئلة قبل الـ interview. وأثناءه، اسمع كويس عشان الـ user يتكلم أغلب الوقت، واكتب notes (واحد يسأل وواحد يكتب؛ الـ audio مش كفاية؛ اكتب المشاعر وردود الفعل). وسيب شوية وقت بين الـ interviews.`,
    `الأفراد: وقت أكتر لكل مشارك، logistics أسهل، privacy أكتر. الـ Groups: أسهل تاخد feedback أكتر والنقاش بيطلّع الـ assumptions، بس ممكن تقابل confounding personalities ومشاكل "presentation of self".`,
    `التخطيط بياخد وقت؛ تحليل الـ qualitative صعب؛ الـ recall bias؛ الـ reporting bias (إجابات مثالية). الحل إنك تعمل combination مع participant observation و usability studies و secondary research.`,
    `الـ Surveys بتوصل لـ users كتير بسرعة وبرخص (نظرة عامة واسعة). الـ Interviews بتوصل لـ users أقل بس بتدّي فهم أعمق (أسئلة ليه، follow-ups، أحداث نادرة) وبتكلّف أكتر (synchronous، incentives). وممكن تجمعهم بأي ترتيب.`
  ],
  quiz: [
    [`صح. المحاضرة بتبدأ جزء الـ interviews بإنها بتقول إن الـ interview هو أشهر research technique، ومتقدّر عشان بيدّي فهم أعمق من خلال أسئلة "why" المفتوحة (L6, Interviews).`, `المحاضرة بتسمي الـ interviews الـ technique الأكتر انتشاراً.`],
    [`الـ Listen well واحدة من الحاجتين الأساسيتين أثناء الـ interview، بس الـ take notes هي التانية، فالإجابة الكاملة "a & c" (L6, Tips for a good interview).`, `ده عكس النصيحة الحقيقية: المحاضرة بتقول <b>سيب</b> شوية وقت بين الـ interviews (L6, Tips for a good interview).`, `الـ Take notes واحدة من الحاجتين الأساسيتين، بس الـ listening well هي التانية، فلو اخترتها لوحدها تبقى ناقصة؛ الإجابة "a & c" (L6, Tips for a good interview).`, `صح. اسمع كويس <b>و</b>اكتب notes هما المفتاحين.`],
    [`صح. الأفراد: "easier to coordinate the logistics".`, `جدول المقارنة بيقول إن الـ logistics أسهل مع الأفراد.`],
    [`الـ Special software مش مذكور. الـ Interviews أغلى عشان هي synchronous (وقت لكل interviewee) وكمان اللي بنعملهم interview غالباً بيستنوا incentives (L6, Interviews).`, `صح. الـ Interviews بتبقى synchronous، فاللي بيعمل الـ interview بيدّي وقت لكل شخص، واللي بنعملهم interview غالباً بيستنوا تعويض (incentives) (L6, Interviews).`, `الـ Interviews مش لازم تبقى online، وده مش سبب التكلفة. السبب هو الوقت الـ synchronous لكل interviewee زائد الـ incentives (L6, Interviews).`, `الـ Interviews بتجمع qualitative data في الغالب (إجابات "why" مفتوحة)، مش أرقام، وده ملوش أي علاقة بتكلفتها (L6, Interviews).`],
    [`الـ Recall bias هو إن الذاكرة مش دقيقة عن أحداث فاتت.`, `صح. الـ Reporting bias هو لما الناس تدّي إجابات أكثر مثالية من الواقع؛ والـ recall bias هو إجابات مش دقيقة عن أحداث فاتت (L6, Challenges of asking questions).`, `الـ Selection bias مش من الـ biases اللي في المحاضرة. إن الناس تحكي نسخة مثالية من الواقع ده الـ reporting bias (L6, Challenges of asking questions).`, `الـ Confirmation bias مش متغطي هنا. المحاضرة بتسمّي اتنين biases بس، recall وreporting؛ والإجابات اللي أكثر مثالية من الواقع دي reporting bias (L6, Challenges).`],
    [`دي ميزة الـ individual interviews.`, `صح. في الـ group interviews المناقشة بين المشاركين ممكن تبيّن الـ assumptions، وكمان أسهل تجيب feedback أكتر (L6, Individuals vs groups).`, `الـ Individual interviews أسهل في التنسيق.`, `العكس: مع الـ groups ممكن تحتاج تتعامل مع confounding personalities، ودي متصنفة كعيب من عيوب الـ groups (L6, Individuals vs groups).`],
    [`الـ Quantitative research بيدّي أرقام (measures، counts) بتوريك إيه اللي بيحصل، مش ليه. الـ Motivations محتاجة qualitative research (L4, Types by WHAT).`, `الـ Secondary research هو data حد تاني جمعها، وممكن تبقى قديمة أوي أو مش specific كفاية للـ users بتوعك، فمتقدرش لوحدها تدّيك فهم عميق (L4, Primary vs secondary).`, `الـ Experiments مجرد primary method واحدة، مش من تقسيمات الـ WHAT. فهم ليه وإزاي الـ users بيتصرفوا كده ده الـ qualitative research (L4, Types by WHAT).`, `صح. بيغطي ليه وإزاي الحاجات بتحصل.`]
  ],
  extra: [
    [`الـ "Where" واحدة من الـ 6 Ws بتوع Joyner (who, what, where, when, why, how)، فهي مش الغريبة (L6, Interviews).`, `الـ "How" موجودة في لستة الـ 6 Ws (who, what, where, when, why, how)، حتى لو مش بتبدأ بـ W (L6, Interviews).`, `الـ "Why" واحدة من الـ 6 Ws، والـ interviews متقدّرة بالظبط عشان أسئلة "why" المفتوحة دي (L6, Interviews).`, `صح. الـ 6 Ws هما who و what و where و when و why و how. و"Which" مش منهم.`],
    [`صح. الـ Recall bias هو إنك تدّي إجابات مش دقيقة عن حاجات فاتت.`, `الـ Reporting bias هو إجابات مثالية أكتر من الواقع، مش نسيان.`, `دي مشكلة في الـ group interviews عن إزاي الناس عايزة تبان قدام غيرها.`, `دي مشكلة group interview، مش غلطة ذاكرة.`],
    [`صح. "More privacy for participants" مذكورة كميزة للـ interview مع الأفراد.`, `الجدول بيذكر الـ privacy الأكتر كميزة للـ individual interviews.`],
    [`الـ Surveys برضه بتجمع data بالأسئلة، فعندها نفس الـ biases.`, `صح. ده الحل المذكور في المحاضرة.`, `الـ Leading questions بتزوّد الـ bias بدل ما تقلله.`, `التحليل صعب، بس إنك تتخطاه مش هو الحل.`],
    [`مفيش حاجة في السيناريو عن الوقت بين الـ interviews.`, `مفيش حاجة بتقول إن الأسئلة متجهزتش.`, `صح. المحاضرة بتقول واحد يسأل وواحد تاني يكتب notes (ومعاها المشاعر وردود الفعل)، والـ audio لوحده مش كفاية.`, `دي مش نصيحة؛ الـ individual والـ group interviews كل واحد ليه مميزات وعيوب.`],
    [`دي ميزة الـ individual interviews.`, `دي ميزة الـ individual interviews.`, `دي خاصية الـ individual interviews.`, `صح. دي المشاكل المذكورة للـ group interviews.`],
    [`Joyner بيقول العكس: "design is very hard". اللي بيضيف إن الـ interfaces الكويسة نسبياً سهلة لو تعرف الـ methods والـ principles الأساسية هو Klemmer (L6, Design: can I?).`, `صح. جملة Joyner هي "design is very hard". وKlemmer بيضيف إن الـ UIs العظيمة محتاجة creativity وشغل جامد، أما الكويسة نسبياً فسهلة بالـ basic methods (L6, Design: can I?).`],
    [`صح. "Listen well": الـ user المفروض يتكلم أغلب الوقت.`, `اللي بيعمل الـ interview المفروض يسمع كويس، مش يسيطر على الكلام.`, `اللي بيكتب الـ notes بيسجّل؛ مش المفروض يقود الكلام.`, `المحاضرة بتقول الـ user هو اللي يتكلم أغلب الوقت.`],
    [`الـ Designers بيقولوا "we are not artists"؛ موهبة الرسم مش شرط.`, `صح. ده باقي كلام Klemmer.`, `المحاضرة بتقول الـ design مش بيطلّع لوحات تتعلق على الحيطة.`, `المحاضرة بتقول متقفلش الإبداع.`],
    [`صح. المحاضرة بتقول إن الـ interviews والـ surveys ممكن يتعملوا ورا بعض بأي ترتيب، ونتايج واحد بتستخدم في تخطيط التاني (L6, Interviews).`, `أي ترتيب مسموح؛ وكل واحد ممكن يتستخدم عشان تخطط للتاني.`]
  ]
};

AR.hci.lectures["7"] = {
  notes: [
    { h: `أكبر أخطاء ممكن الـ designer يعملها (Joyner)`, pts: [
      `<b>أكبر غلطة</b>: إنك تنط على طول تصمم interface <b>من غير ما تفهم الـ users أو الـ task</b>.`,
      `<b>تاني أكبر غلطة</b>: إنك تثبت على <b>فكرة design واحدة</b> أو نوع واحد من الأفكار <b>بدري أوي</b>.`
    ]},
    { h: `الـ Design alternatives`, pts: [
      `مرحلة لوحدها في الـ cycle بتاع Joyner. استكشف alternatives كتير ومتنوعة بدل ما تركز على واحد من الأول.`,
      `الغلطة دي منتشرة لما تكون <b>بتحسّن system موجود</b>، لأنك بتبقى محبوس في الـ interface الحالي بتاعه. النصيحة: <b>ابعد نفسك عن الحلول الموجودة</b>، على الأقل وقت الـ brainstorming.`,
      `الـ design النهائي غالباً بيبقى <b>combination</b> من alternatives اتستكشفت قبل كده.`,
      `كام alternative؟ <b>أكتر ما تقدر.</b>`,
      `مثال: <b>أول ماوس من Microsoft</b> اتعمله <b>أكتر من 100 prototype</b>.`
    ]},
    { h: `الـ Prototyping`, pts: [
      `أغلب الناس فاكرة إن الـ prototype نسخة سريعة أو صغيرة من الحاجة الحقيقية. والفهم ده مش مفيد.`,
      `بالنسبة للـ designers: <b>"Rapidly creating an approximation of a design so that you can quickly get feedback."</b> يعني تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback بسرعة.`,
      `Klemmer: <b>"A prototype is not about the artifact, it's about feedback and iteration."</b> يعني الـ prototype مش عن الحاجة نفسها، هو عن الـ feedback والـ iteration.`,
      `Joyner: الـ design هو process iterative فيه brainstorming وتجميع وسيب وتعديل وتحسين للأفكار، وده محتاج كذا فكرة تبدأ بيهم.`,
      `الـ prototype الكويس بيخليك تاخد <b>feedback مفيد (constructive)</b> وتعمل iteration. ومش لازم يشبه المنتج النهائي.`,
      `الـ Prototypes اللي مش بتدّيك معرفة جديدة بتضيّع الـ design process. Klemmer: <b>"prototypes are questions, ask a lot of them."</b> يعني الـ prototypes أسئلة، اسأل كتير منها.`
    ]}
  ],
  cards: [
    `إنك تنط على طول للـ design من غير ما تفهم الـ users أو الـ task.`,
    `إنك تثبت على فكرة design واحدة (أو نوع واحد) بدري أوي.`,
    `ابعد نفسك عن الحلول الموجودة وقت الـ brainstorming.`,
    `أكتر ما تقدر.`,
    `أكتر من 100 prototype.`,
    `إنك تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback بسرعة.`,
    `مش عن الـ artifact؛ عن الـ feedback والـ iteration. "Prototypes are questions, ask a lot of them."`
  ],
  qa: [
    `حسب Joyner: (1) إنك تنط على طول للـ design من غير ما تفهم الـ users أو الـ task؛ (2) إنك تثبت على فكرة design واحدة أو نوع واحد بدري أوي.`,
    `إنك تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback سريع. أهميته جاية من الـ feedback والـ iteration، مش من الـ artifact نفسه. والـ prototype الكويس بيخليك تاخد feedback مفيد و constructive.`,
    `إنك تركز على alternative واحد بدري ده غلطة كبيرة. الاستكشاف الواسع بيوصّل لـ designs أحسن، والـ design النهائي غالباً بيبقى combination من alternatives. حاول تعمل أكتر ما تقدر (زي 100+ prototype لأول ماوس من Microsoft).`
  ],
  quiz: [
    [`قلة الـ prototypes مش واحدة من الغلطتين اللي Joyner سمّاهم. أكبر غلطة إنك تنط على الـ design من غير ما تفهم الـ users أو الـ task (L7, Biggest mistakes).`, `صح. أكبر غلطة عند Joyner إنك تنط على طول لتصميم الـ interface من غير ما تفهم الـ users أو الـ task؛ والتانية إنك تثبت على فكرة واحدة بدري أوي (L7, Biggest mistakes).`, `الـ User feedback متشجّع عليه طول الوقت: الـ prototypes موجودة أصلاً عشان تجيب feedback وتعمل iterate. أكبر غلطة عند Joyner هي التصميم من غير فهم الـ users (L7, Prototyping).`, `الغلطة التانية إنك تثبت على فكرة واحدة <b>بدري</b> أوي.`],
    [`استكشاف alternatives كتير ده النصيحة مش الغلطة: حاول توصل لأكبر عدد تقدر عليه. الغلطة إنك تبقى captured بالـ interface الحالي (L7, Design alternatives).`, `صح. ابعد نفسك عن الحلول الموجودة.`, `تجاهل الـ feedback حاجة وحشة، بس الغلطة المرتبطة بتحسين system موجود هي إنك تبقى captured بالـ interface الحالي بتاعه (L7, Design alternatives).`, `الوقت على الـ prototypes مش هو الغلطة المذكورة؛ الـ prototypes متشجّع عليها. تحسين system موجود بيغريك تفضل captured بالـ interface الحالي بتاعه (L7, Design alternatives).`],
    [`قليل جداً. مثال المحاضرة على استكشاف الـ alternatives هو أول Microsoft mouse، اللي اتعمله أكتر من 100 prototype (L7, Design alternatives).`, `قليل: أول Microsoft mouse عدّى على أكتر من 100 prototype، والمثال ده بيتقال عشان يوضح إنك لازم تستكشف أكبر عدد alternatives تقدر عليه (L7, Design alternatives).`, `قريب، بس المحاضرة بتقول <b>أكتر</b> من 100، مش 100 بالظبط، فالإجابة الدقيقة "More than 100" (L7, Design alternatives).`, `صح. أول Microsoft mouse كان ليه أكتر من 100 prototype، ودي مثال المحاضرة على إنك تستكشف أكبر عدد design alternatives تقدر عليه (L7, Design alternatives).`],
    [`الـ Prototypes عكس الـ final products: هي approximations للـ design بتتعمل بسرعة عشان تجيب feedback سريع (L7, Prototyping).`, `صح. "Prototypes are questions, ask a lot of them."`, `Klemmer بيقول "a prototype is not about the artifact, it's about feedback and iteration"، فهي مش حاجات للعرض والتفاخر (L7, Prototyping).`, `لو شفت الـ prototype كمجرد mock-up بسيط هتفوّت الهدف منه. Klemmer بيعامل الـ prototypes كأسئلة بتجمع feedback (L7, Prototyping).`],
    [`صح. المحاضرة بتعرّف الـ prototype الكويس إنه اللي بيخليك تجيب feedback مفيد (constructive) وتعمل iterate على الـ design (L7, Prototyping).`, `ده تعريف المحاضرة للـ prototype الكويس.`],
    [`المحاضرة بتقول مش لازم يشبه المنتج النهائي.`, `صح. الـ prototype الكويس بيسمح بـ feedback مفيد وconstructive وبالـ iteration؛ ومش لازم يشبه الـ final product (L7, Prototyping).`, `"A quick or small version of the real thing" ده الفهم الشائع اللي المحاضرة بتقول عليه مش مفيد. الـ prototype هو approximation بيتعمل عشان تجيب feedback (L7, Prototyping).`, `الـ Polish مش هو الهدف: الـ prototype مش لازم يشبه الـ final product، واللي شكلها مخلّص بتجيب feedback constructive أقل من الـ sketches (L7; L8, Lo-fi).`],
    [`إنك تثبت على واحد ده تاني أكبر غلطة.`, `صح. استكشف مدى واسع بدل فكرة واحدة من الأول: حاول توصل لأكبر عدد alternatives تقدر عليه، زي الـ 100+ prototype بتوع أول Microsoft mouse (L7, Design alternatives).`, `المحاضرة مش حاطة رقم ثابت زي تلاتة. إجابتها "as many as you can" (L7, Design alternatives).`, `الـ Design alternatives مرحلة كاملة في الـ cycle بتاع Joyner، ولو نطّيتها يبقى ثبّت على فكرة واحدة بدري، ودي تاني أكبر غلطة (L7, Design alternatives).`]
  ],
  extra: [
    [`Joyner عايز alternatives أكتر ما تقدر؛ الفريق عمل قليل أوي.`, `إنك تبعد نفسك دي النصيحة، مش الغلطة.`, `صح. 3 variations من نفس الـ layout دول نوع واحد من الأفكار، واتختار بدري أوي.`, `السيناريو بيقول إنهم عملوا user research الأول؛ ودي أكبر غلطة، مش دي.`],
    [`إنك تبقى محبوس في الـ interface الحالي هو بالظبط الغلطة.`, `الـ Design alternatives مرحلة لوحدها ومينفعش تتخطاها.`, `ده بيثبّت الـ design الموجود أكتر كمان.`, `صح. دي نصيحة المحاضرة لما تحسّن system موجود.`],
    [`التثبيت على فكرة واحدة بدري أوي دي تاني أكبر غلطة عند Joyner. الأكبر هي إنك تنط على الـ design من غير ما تفهم الـ users أو الـ task (L7, Biggest mistakes).`, `صح. أكبر غلطة إنك تنط للـ design من غير ما تفهم الـ users أو الـ task؛ وإنك تثبت على فكرة واحدة بدري هي <b>تاني</b> أكبر غلطة.`],
    [`صح. الـ design النهائي غالباً بيبقى combination من alternatives قديمة.`, `إنك تثبت على أول فكرة دي غلطة.`, `المحاضرة مش بتختار الـ designs على حسب عدد الـ features.`, `الـ Design iterative ومبني على الـ feedback.`],
    [`المحاضرة بتقول إن الفهم المنتشر ده مش مفيد.`, `صح. ده التعريف بالنسبة للـ designers.`, `الـ prototype نسخة تقريبية عشان الـ feedback، مش المنتج النهائي.`, `Klemmer بيقول الـ prototype مش عن الـ artifact.`],
    [`الـ Polish ده عن الـ artifact، واللي Klemmer بيقول إنه مش المقصود.`, `الجملة ملهاش علاقة بالـ code.`, `صح. "A prototype is not about the artifact, it's about feedback and iteration."`, `الـ prototype الكويس مش لازم يشبه المنتج النهائي.`],
    [`صح. المحاضرة بتقول كده، وعشان كده Klemmer بيقول "prototypes are questions, ask a lot of them."`, `المحاضرة بتقول إن الـ prototypes دي بتضيّع الـ design process.`],
    [`الـ prototype الكويس مش لازم يشبه المنتج النهائي.`, `الـ prototype مش عن الـ artifact.`, `المفروض تستكشف alternatives أكتر ما تقدر.`, `صح. الـ Prototypes اللي مبتدّيش معرفة جديدة بتضيّع الـ process؛ "prototypes are questions, ask a lot of them."`],
    [`صح. Joyner بيقول الـ process ده محتاج كذا فكرة تبدأ بيهم.`, `إنك تثبت على فكرة واحدة بدري دي غلطة كبيرة.`, `الـ Prototypes معمولة عشان feedback سريع، مش code خلصان.`, `مفيش حاجة في المحاضرة دي بتشترط hi-fi الأول؛ الأفكار بتيجي الأول.`],
    [`صح. المحاضرة بتقول إن الـ design alternatives مرحلة لوحدها في الـ cycle بتاع Joyner.`, `هي مرحلة لوحدها (Need finding ← Design alternatives ← Prototyping ← Evaluation).`]
  ]
};

AR.hci.lectures["8"] = {
  notes: [
    { h: `الـ Prototypes والـ fidelity`, pts: [
      `الـ Prototypes بتتواصل بيها مع الـ stakeholders. وليها 4 جماهير: <b>الزملاء (colleagues)، الـ clients، الـ users، وإنت نفسك</b>.`,
      `الـ <b>Fidelity</b>: الـ design قريب قد إيه من الـ look and feel بتاع المنتج النهائي. فيه prototypes <b>low-fidelity (lo-fi)</b> و<b>high-fidelity (hi-fi)</b>.`,
      `ابدأ بالـ lo-fi، وانقل للـ hi-fi وإنت ماشي في الـ design.`
    ]},
    { h: `قوة الـ low-fidelity prototypes`, pts: [
      `<b>أسرع وأسهل وأرخص</b> في إنك تعملها.`,
      `الـ Hi-fi مش ممكن في الأول لأن تفاصيل كتير لسه متقررتش.`,
      `<b>الناس بتبقى مستعدة تتكلم أكتر بكتير</b> لما تديهم sketch من لما تديهم حاجة شكلها خلصان.`,
      `Konstan: الـ prototype اللي باين إنه معمول بمجهود قليل (زي مرسوم بالإيد) بياخد <b>constructive feedback</b> أكتر.`,
      `التفاصيل الكتير أوي بتخلي الناس تدّي feedback في <b>مستوى أقل (lower level)</b> من المطلوب.`,
      `Google: اعرض <b>أفكار high-level</b> في الأول؛ وركّز على التفاصيل والشاشات بعدين.`
    ]},
    { h: `أنشطة الـ design والـ brainstorming`, pts: [
      `كل design activity يا إما بتساعد الـ <b>designer يفكر ويتخيل</b>، يا إما بتساعد <b>أعضاء الفريق والـ stakeholders يتخيلوا ويتواصلوا</b>، يا إما الاتنين.`,
      `الـ Brainstorming هدفه يطلّع أفكار كتير. Joyner: <b>ابدأ بـ brainstorming فردي</b>، لأن الـ groups بتتجمع على أفكار بدري أوي.`,
      `نصايح: اكتب أفكار أكتر ما تقدر؛ كل فكرة كلمتين أو جملة؛ <b>خلي هدفك 20</b>؛ <b>متقيّمش ومتستبعدش</b> أي فكرة؛ خد breaks أو اعمل كذا session؛ والـ team sessions للمشاركة وإضافة أفكار، مش للتضييق.`
    ]},
    { h: `ليه ندرس design؟ والـ design-development process`, pts: [
      `فيه طلبة هيلمعوا كـ designers؛ والـ developers كتير بيعملوا design لما ميكونش فيه designers؛ والـ developers بيشتغلوا أحسن مع الـ designers لما يفهموا الـ process.`,
      `الـ <b>Handoff process</b>: الـ design يخلص، وبعدين يتسلّم للـ development (ورا بعض - sequential).`,
      `الـ <b>Handshake process</b>: الـ design والـ development ماشيين <b>بالتوازي (in parallel)</b> مع sync points كتير.`
    ]},
    { h: `الـ Wireframes`, pts: [
      `<b>رسم تخطيطي (schematic) للهيكل الأساسي للشاشة</b>. معمول من خطوط وأشكال بسيطة (مستطيلات، دواير) مع شوية text، والخطوط شكلها زي السلوك (wires).`,
      `<b>مفيهوش ألوان ولا font styles</b> عن قصد، عشان نركز على الـ structure. الـ Wireframe = <b>هيكل (skeleton) فيه placeholders</b>.`,
      `Google بتسميه "key part of the design process" يعني جزء أساسي من الـ design process.`,
      `الـ Wireframes مش فن. هي بتنظم المعلومات وتوصّلها بوضوح.`,
      `الأهداف: (1) تقرر الـ structure الأساسي للصفحة قبل الألوان والصور؛ (2) تخلي الفريق متفق من بدري، فتوفر وقت وموارد؛ (3) توجّه الـ feedback للمستوى الصح (الـ structure والـ function، مش الألوان والـ typography)؛ (4) تمسك العناصر المنسية أو المش منظمة من بدري.`,
      `إمتى: <b>بعد الـ foundational user research</b>، أول ما يبقى فيه <b>site map</b> مبدئي (هرم المحتوى - content hierarchy).`
    ]},
    { h: `الـ Wireframing standards والـ process`, pts: [
      `الـ Standards: الـ text كخطوط أفقية أو placeholder text؛ الصور كمستطيلات أو دواير فيها <b>X</b>؛ الـ calls to action كمستطيلات أو دواير؛ و<b>annotation</b> مظبوط.`,
      `الـ Process: ابدأ بـ <b>ورقة وقلم</b>. الهدف الأول إنك <b>توصل</b> لـ design، مش إنك تعرض واحد. ارسم <b>5 versions على الأقل</b> لكل شاشة. اعمل iteration بالـ feedback. والهدف التاني إنك تنقل الفكرة من دماغك للورقة بسرعة، فتجاهل الخطوط المستقيمة والمسافات والـ alignment في المرحلة دي.`,
      `بعدين استخدم tools: <b>Figma، Adobe XD، Sketch، Balsamiq، Pencil</b>.`,
      `مثال في المحاضرة: app لتمشية الكلاب (dog-walking app).`
    ]},
    { h: `إرشادات تصميم الـ Forms`, pts: [
      `الـ commands المهمة تبقى <b>buttons مش links</b>، لأن الـ buttons بتشد العين. بس <b>متعرضش</b> كل الـ commands كـ buttons.`,
      `الـ <b>Breadcrumbs</b> بتوري الـ users هم <b>فين</b>، لما يكون فيه اختيارات كتير. الـ <b>Progress bars</b> بتوري الـ users هم فين <b>وفاضل إيه</b>، لـ path واحد محدد مسبقاً.`,
      `لما الـ form يتبعت بنجاح، بنأكد ده بـ <b>confirmation page</b>.`,
      `<b>الـ Error messages تبقى جنب الـ field</b> اللي فيه الغلط. وتغيير لون الـ border بتاع الـ field (زي الأحمر) ده المفضّل.`,
      `الـ Text boxes تدّي <b>مساحة كفاية</b> للإجابة.`,
      `الـ Fields يبقى فيها <b>hints أو أمثلة أو الـ format المطلوب</b>.`,
      `<b>شيل الـ actions المتكررة</b>: افتكر تفضيلات العملاء.`,
      `اعمل <b>فرق واضح بين الـ primary والـ secondary calls-to-action</b> (زي "Go Pro" يبان أكتر من "Free Trial").`
    ]}
  ],
  cards: [
    `الزملاء، الـ clients، الـ users، وإنت نفسك.`,
    `الـ design قريب قد إيه من الـ look and feel بتاع المنتج النهائي.`,
    `الناس بتبقى مستعدة تتكلم وتدّي constructive feedback على sketch أكتر من حاجة شكلها خلصان.`,
    `الفردي الأول؛ الـ groups بتتجمع على أفكار بدري أوي.`,
    `خلي هدفك 20 فكرة؛ ومتقيّمش أي واحدة.`,
    `رسم تخطيطي للهيكل الأساسي للشاشة: خطوط، أشكال، شوية text، من غير ألوان ولا fonts. هيكل فيه placeholders.`,
    `بعد الـ foundational research، أول ما يبقى فيه site map مبدئي.`,
    `مستطيل أو دايرة فيها X.`,
    `Figma، Adobe XD، Sketch، Balsamiq، Pencil.`,
    `الـ Handoff: design وبعدين development (ورا بعض). الـ Handshake: بالتوازي مع syncs كتير.`,
    `الـ Breadcrumbs: إنت فين. الـ Progress bar: إنت فين وفاضل إيه (path ثابت).`
  ],
  qa: [
    `أسرع وأسهل وأرخص. الـ Hi-fi مستحيل في الأول لأن التفاصيل لسه متقررتش. الناس بتبقى مستعدة تتكلم عن sketch أكتر، والـ prototype المرسوم بالإيد بياخد constructive feedback أكتر (Konstan). التفاصيل الكتير بتنزّل الـ feedback لمستوى أقل من المطلوب. Google: اعرض أفكار high-level في الأول والتفاصيل بعدين.`,
    `رسم تخطيطي للهيكل الأساسي للشاشة، معمول من خطوط وأشكال بسيطة مع شوية text، ومن غير ألوان ولا fonts عن قصد، عشان نركز على الـ structure (هيكل فيه placeholders). الأهداف: تقرر الـ structure قبل الـ visuals؛ تخلي الفريق متفق بدري وتوفر موارد؛ تاخد feedback في المستوى الصح؛ وتمسك العناصر المنسية أو المش منظمة بدري.`,
    `الـ Handoff: الـ design بيخلص ويتسلّم للـ development، واحد ورا التاني. الـ Handshake: الـ design والـ development ماشيين بالتوازي مع sync points كتير.`,
    `ابدأ فردي. اكتب أفكار أكتر ما تقدر، كل واحدة كلمتين أو جملة. خلي هدفك 20. متقيّمش ومتستبعدش أفكار. خد breaks أو اعمل كذا session. والـ team sessions للمشاركة وإضافة أفكار، مش لتضييق الاختيارات.`,
    `الـ text كخطوط أفقية أو placeholder text؛ الصور كمستطيلات أو دواير فيها X؛ الـ calls to action كمستطيلات أو دواير؛ و text annotations مظبوطة.`
  ],
  quiz: [
    [`معكوس: الـ <b>LOW</b>-fidelity prototypes هي اللي أسرع وأسهل وأرخص.`, `صح. الجملة مقلوبة: الـ low-fidelity prototypes هي اللي أسرع وأسهل وأرخص في عملها، وعشان كده بتبدأ lo-fi وتنقل لـ hi-fi بعدين (L8, Power of lo-fi).`],
    [`العكس: الـ lo-fi prototypes أسرع وأسهل وأرخص، ودي بالظبط قوتها (L8, Power of lo-fi).`, `الـ UI المفصّل والواقعي ده high fidelity، قريب جداً من الـ look and feel النهائي. الـ Lo-fi prototypes مجرد sketches تقريبية (L8, Prototypes and fidelity).`, `صح. الـ Lo-fi prototypes سريعة ورخيصة، والناس بتتكلم براحتها أكتر عن sketch، فبتدّي feedback constructive تقدر تعمل عليه iterate بسرعة (L8, Power of lo-fi).`, `الـ Lo-fi مش بديل للـ hi-fi: بتبدأ بالـ lo-fi وبتنقل للـ hi-fi وإنت ماشي في الـ design (L8, Prototypes and fidelity).`],
    [`الـ Wireframes مفيهاش ألوان ولا font styles عن قصد. عرض الـ visual design النهائي ده شغل الـ hi-fi prototypes، مش الـ wireframes (L8, Wireframes).`, `الـ Wireframes ملهاش علاقة بالـ backend code؛ هي schematic للـ outline بتاع الشاشة، بتستخدم عشان تحدد structure الصفحة (L8, Wireframes).`, `صح. الـ wireframe هو schematic للـ outline الأساسي للشاشة، skeleton فيه placeholders، من غير ألوان ولا fonts عشان يركز على الـ structure (L8, Wireframes).`, `الـ Wireframes بتترسم مش بتتكتب code: ورقة وقلم الأول، وبعدين tools زي Figma أو Balsamiq. بتحدد الـ structure قبل أي visual design أو code (L8, Wireframes).`],
    [`الـ Visual Studio والـ Eclipse دول IDEs لكتابة الـ code. أدوات الـ wireframing في المحاضرة هي Figma وAdobe XD وSketch وBalsamiq وPencil (L8, Wireframing process).`, `الـ Word والـ Excel أدوات office، ومش في لستة المحاضرة. أدوات الـ wireframing هي Figma وAdobe XD وSketch وBalsamiq وPencil (L8, Wireframing process).`, `صح. التلاتة موجودين في list المحاضرة (مع Adobe XD و Pencil).`, `الـ Final Cut Pro والـ Premiere برامج مونتاج فيديو. أدوات الـ wireframing المذكورة هي Figma وAdobe XD وSketch وBalsamiq وPencil (L8, Wireframing process).`],
    [`بدري أوي: الـ wireframes بتتعمل بعد الـ foundational user research، لما يبقى عندك initial site map (L8, Wireframes).`, `صح. الـ Wireframes بتيجي بعد الـ foundational user research، أول ما يبقى فيه initial site map (content hierarchy) ترتّبه (L8, Wireframes).`, `الـ Wireframes دي skeletons من نوع lo-fi، والمحاضرة بتقول ابدأ lo-fi وانقل لـ hi-fi، فهي بتيجي قبل الـ hi-fi prototypes (L8, Prototypes and fidelity).`, `الـ Wireframes بتيجي بدري: هدفها إنها تثبّت الـ structure وتلقط العناصر المنسية قبل الألوان والصور، بعد الـ foundational research (L8, Wireframes).`],
    [`إنك تعرض الـ text كخطوط أفقية أو placeholder text ده واحد من الـ wireframing standards، فهو مش الإجابة (L8, Wireframing standards).`, `رسم الصور كمستطيلات أو دواير فيها X ده standard مذكور في الـ wireframing، فهو مش الإجابة (L8, Wireframing standards).`, `صح. الـ Wireframes بتتجنب الألوان والـ font styles عن قصد.`, `رسم الـ Calls to action كمستطيلات أو دواير ده standard مذكور. الغريب هنا هو الألوان والـ typography المفصّلة (L8, Wireframing standards).`],
    [`الـ Groups بتتجمع على أفكار بدري أوي، ودي المشكلة.`, `صح. كل عضو بيعمل مجموعة أفكاره الأول.`, `نصايح الـ Brainstorming بتقول متقيّمش ومتستبعدش أي فكرة؛ الهدف إنك تطلع أكبر عدد أفكار، حوالي 20 (L8, Brainstorming).`, `إنك تبدأ بـ final design بيلغي فكرة الـ brainstorming أصلاً، اللي هدفها توليد أفكار كتير، وبتبدأ بشكل فردي (L8, Brainstorming).`],
    [`الـ guideline إنها تظهر جنب الـ field.`, `صح. الـ Error messages بتتحط جنب الـ field اللي فيه الغلط، عشان الـ user يشوف بالظبط إيه اللي يصلّحه؛ وتغيير لون الـ border بتاع الـ field (أحمر مثلاً) هو المفضّل (L8, Form design).`, `آخر الصفحة بعيد عن الـ field اللي سبب الغلط. الـ guideline بتحط الرسالة جنب الـ field ده (L8, Form design).`, `الـ page title مش مكان أخطاء الـ form؛ الـ user هيضطر يدوّر على الـ field. الأخطاء مكانها جنب الـ input الغلط (L8, Form design).`],
    [`الـ Breadcrumbs بتوري إنت فين بس، لما يكون فيه اختيارات كتير.`, `صح. الـ progress bar بيوري الـ users هما فين وفاضل إيه، على path محدد ووحيد؛ والـ breadcrumbs بتوري هما فين بس (L8, Form design).`, `الـ Tabs بتنقلك بين sections بس مش بتوري الخطوات الفاضلة على path ثابت؛ ده شغل الـ progress bar (L8, Form design).`, `الـ Links للتنقل، مش لعرض إنت فين. والـ guideline كمان بتقول إن الـ commands المهمة لازم تبقى buttons مش links (L8, Form design).`],
    [`صح. الـ Prototypes بتتواصل بيها مع الـ stakeholders، والمحاضرة بتسمّي أربع audiences: colleagues وclients وusers وإنت نفسك (L8, Prototypes and fidelity).`, `ضيق أوي: الـ users جمهور واحد بس، لكن الـ prototypes بتخدم كمان الـ colleagues والـ clients وإنت نفسك (L8, Prototypes and fidelity).`, `الـ Managers مش في اللستة. الأربع audiences هما colleagues وclients وusers وإنت نفسك (L8, Prototypes and fidelity).`, `الـ Competitors مش stakeholders بتعملهم prototype. الـ audiences هما colleagues وclients وusers وإنت نفسك (L8, Prototypes and fidelity).`]
  ],
  extra: [
    [`الـ Fidelity عن الـ look and feel، مش عدد الشاشات.`, `صح. ده تعريف المحاضرة للـ fidelity.`, `الـ Lo-fi أسرع، بس السرعة مش هي التعريف.`, `الـ Fidelity ملهاش علاقة بعدد اللي اختبروا.`],
    [`كلام Konstan في صالح الـ prototypes اللي باينة بمجهود قليل.`, `الـ Users واحد من الـ 4 جماهير بتوع الـ prototypes.`, `صح. ده كلام Konstan في المحاضرة.`, `التفاصيل الكتير بتخلي الناس تدّي feedback في مستوى <b>أقل</b> من المطلوب.`],
    [`صح. بيسيبوا الألوان والـ font styles عشان يركزوا على الـ structure (هيكل فيه placeholders).`, `المحاضرة بتقول الـ wireframes مفيهاش ألوان ولا font styles عن قصد.`],
    [`الـ Handoff ورا بعض: الـ design يخلص، وبعدين يروح للـ development.`, `الـ Brainstorming بيطلّع أفكار؛ مش design-development process.`, `الـ Wireframing نشاط design، مش طريقة لتنظيم الـ design والـ development.`, `صح. في الـ handshake process، الـ design والـ development ماشيين بالتوازي مع sync points كتير.`],
    [`صح. نصايح الـ brainstorming بتقول هدفك يبقى 20 فكرة، كل واحدة كام كلمة أو جملة، من غير ما تقيّم أو تستبعد أي واحدة (L8, Brainstorming).`, `الـ 5 دي أقل عدد sketch versions لكل شاشة في الـ wireframing.`, `الـ 3 دي عدد الألوان في palette بسيطة (المحاضرة الجاية)، مش أفكار.`, `أكتر من 100 ده عدد الـ prototypes لأول ماوس من Microsoft.`],
    [`الـ guideline ليها حدود: الـ commands المهمة لازم تبقى buttons مش links، بس متعرضش كل الـ commands كـ buttons (L8, Form design).`, `صح. الـ commands المهمة تبقى buttons مش links، بس <b>متعرضش</b> كل الـ commands كـ buttons.`],
    [`version واحدة معناها إنك ثبتّ على فكرة واحدة.`, `صح. الـ process بيقول ارسم 5 versions على الأقل لكل شاشة.`, `الـ 20 ده عدد الأفكار في الـ brainstorming.`, `الـ 3 قليلين: الـ wireframing process بيقول ارسم 5 versions على الأقل لكل شاشة بالورقة والقلم (L8, Wireframing process).`],
    [`مفيش error هنا، فـ guideline الـ error-message مش منطبقة. العيب إن اتنين calls-to-action شكلهم واحد بالظبط (L8, Form design).`, `الـ Confirmation pages بتيجي بعد submission ناجح، وهنا مفيش حاجة اتبعتت. الزراير المتطابقة بتكسر rule الـ primary vs secondary CTA (L8, Form design).`, `صح. مثال المحاضرة إن "Go Pro" يبان أكتر من "Free Trial".`, `إزالة الـ repetitive actions معناها إنك تفتكر الـ preferences، وهنا مفيش حاجة بتتكرر. الزراير المتطابقة بتكسر rule الـ primary vs secondary CTA (L8, Form design).`],
    [`الـ Progress bars لـ path واحد محدد، وبتوري فاضل إيه.`, `الـ confirmation page بتأكد إن الـ form اتبعت بنجاح.`, `الـ Hints بتساعد في ملو الـ fields؛ مش بتوري المكان.`, `صح. الـ Breadcrumbs بتوري الـ users هم فين لما يكون فيه اختيارات كتير.`],
    [`في المرحلة دي الهدف إنك تنقل الفكرة من دماغك للورق بسرعة، فالمحاضرة بتقول تجاهل الخطوط المستقيمة والـ spacing والـ alignment (L8, Wireframing process).`, `صح. الهدف إنك تنقل الفكرة من دماغك للورقة بسرعة، فتجاهل الخطوط المستقيمة والمسافات والـ alignment.`]
  ]
};

AR.hci.lectures["9"] = {
  notes: [
    { h: `الـ Forms (تكملة)`, pts: [
      `<b>التزم بـ color palette بسيطة من 3 ألوان.</b> أكتر من 3 primary colors صعب وبيلخبط الـ users.`,
      `<b>الـ Alert messages تبقى consistent</b> في الموقع كله. متغيرش اللون ولا الـ style ولا المكان.`,
      `<b>Close ضد Cancel</b>: لو فيه button واحد بس يبقى <b>"Close"</b>. لو فيه اتنين (Action button وواحد للقفل) استخدم <b>"Cancel"</b> مش "Close". والـ Cancel غالباً بيبقى <b>على اليمين</b> و<b>مش لافت للنظر</b>.`,
      `<b>الـ Error messages</b>: اكتب المشكلة في الـ <b>title</b>؛ اشرح باختصار <b>حصلت ليه</b> تحت الـ title؛ ولو ينفع حط link عشان <b>يكمّل الـ task أو يرجع</b> للحالة اللي قبلها؛ وادّي recommendations لـ <b>الخطوة الجاية</b>.`,
      `<b>الـ System notice</b>: فيه "Action" button، و"Remind me later" button، وbox "Don't show again". ورسايل الـ notice متبقاش طويلة ولا عامة (generic).`
    ]},
    { h: `الـ Layout`, pts: [
      `أهم معلومات تبقى <b>above the fold</b> (الجزء اللي باين من غير scroll).`,
      `<b>المعلومات المرتبطة ببعض تتجمع</b> بـ <b>frame</b> أو <b>separator</b>.`,
      `<b>اللون بيجمّع وينظّم العناصر</b> (زي fields الـ HR والـ Technical والـ Payroll).`,
      `<b>العناصر المرتبطة تبقى مترتبة منطقياً</b> (First/Middle/Last name؛ Start/End date؛ Origin/Destination).`,
      `الـ <b>logo بتاعك في نفس المكان في كل صفحة</b> (من غير ما يتحرك).`,
      `الـ <b>background مش معقد</b> ومش بيشتت عن المحتوى.`
    ]},
    { h: `الـ Navigation`, pts: [
      `فيه <b>call-to-action واضح</b> بيقول للـ users يعملوا إيه بعد كده. الـ CTA ده button لافت للنظر للخطوة الجاية الأكتر انتشاراً.`,
      `واضح <b>الـ users فين</b> في الموقع، مثلاً بالـ <b>breadcrumbs</b>.`,
      `فيه <b>links واضحة للـ Home page والـ categories في كل صفحة</b>.`,
      `<b>الـ Navigation tabs فوق</b> في الصفحة.`,
      `فيه <b>تغيير واضح لما تعمل hover</b> على أي حاجة بتتداس.`,
      `الـ <b>company logo بيودّي للـ homepage</b>.`,
      `ارسم الـ <b>"Red Routes"</b>: سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks.`
    ]}
  ],
  cards: [
    `التزم بـ color palette بسيطة من 3 ألوان.`,
    `"Close".`,
    `"Cancel" (مش "Close"): على اليمين ومش لافت للنظر.`,
    `المشكلة في الـ title؛ حصلت ليه؛ link يكمّل أو يرجع؛ recommendations للخطوة الجاية.`,
    `Action، و"Remind me later"، و"Don't show again".`,
    `الجزء من الصفحة اللي باين من غير scroll؛ حط فيه أهم المعلومات.`,
    `بـ frame أو separator أو لون.`,
    `سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks.`,
    `نفس المكان في كل صفحة، وبيودّي للـ homepage.`
  ],
  qa: [
    `اكتب المشكلة في الـ title؛ اشرح باختصار حصلت ليه؛ ولو ينفع حط link يكمّل الـ task أو يرجع للحالة اللي قبلها؛ وادّي recommendations للخطوة الجاية.`,
    `أهم المعلومات above the fold؛ جمّع المعلومات المرتبطة (frame أو separator)؛ استخدم اللون للتجميع؛ رتّب العناصر المرتبطة منطقياً؛ خلي الـ logo في نفس المكان في كل صفحة؛ وخلي الـ background بسيط.`,
    `CTA واضح للي يتعمل بعد كده؛ وضّح الـ users فين (breadcrumbs)؛ links للـ Home والـ categories في كل صفحة؛ الـ tabs فوق؛ تغيير واضح في الـ hover على الحاجات اللي بتتداس؛ الـ logo بيودّي للـ homepage؛ وارسم الـ Red Routes.`,
    `button واحد بس: "Close". اتنين buttons (action وواحد للقفل): "Cancel"، وغالباً على اليمين ومش لافت للنظر.`
  ],
  quiz: [
    [`الـ Cancel بيتستخدم لما يكون فيه كمان action button.`, `صح. لما الـ dialog يبقى فيه button واحد بس، لازم يقول "Close". الـ "Cancel" بيستخدم بس لما يبقى فيه اتنين buttons، واحد للـ action وواحد للقفل (L9, Close vs Cancel).`, `الـ "Exit" مش label موجود في الـ guideline. الـ rule هي "Close" لو فيه dismiss button واحد، و"Cancel" جنب action button (L9, Close vs Cancel).`, `الـ "Abort" مش label بتستخدمه الـ guideline؛ وكمان شكله حاد وtechnical. الـ dismiss button الوحيد لازم يقول "Close" (L9, Close vs Cancel).`],
    [`صح. الـ form guideline بتقول التزم بـ 3-color palette بسيطة، لأن أكتر من 3 primary colors بيبقى صعب وبيلخبط الـ users (L9, Forms).`, `الألوان الكتير بتكسر الـ guideline: أكتر من 3 primary colors صعب وبيلخبط الـ users، فخليك على 3-color palette بسيطة (L9, Forms).`, `لون واحد مش هو الـ rule. الـ guideline هي 3-color palette بسيطة؛ الحد إنك متعديش 3 (L9, Forms).`, `الـ 7 أكتر من ضعف الحد. أكتر من 3 primary colors بيلخبط الـ users، فالـ guideline بتقول 3-color palette بسيطة (L9, Forms).`],
    [`ضيق أوي: "above the fold" هو كل اللي باين من غير scrolling، مش الـ header بس. المعلومات الأهم بتتحط هناك (L9, Layout).`, `صح. حط أهم المعلومات هناك.`, `العكس: الـ footer عادةً بيبقى below the fold، مش باين لحد ما تعمل scroll. الـ Above the fold هو الجزء اللي باين من غير scrolling (L9, Layout).`, `مفيش حاجة متطبّقة: "the fold" هو الحافة اللي تحت لأول شاشة، واللي فوقها هو اللي الـ users بيشوفوه من غير scrolling (L9, Layout).`],
    [`الـ Red Routes ملهاش علاقة بالـ errors. هي سلسلة الصفحات أو الـ actions اللي الـ customers بيستخدموها أكتر حاجة عشان يخلّصوا الـ tasks (L9, Navigation).`, `صح. إنك تعمل map للـ "Red Routes" معناه تحدد سلسلة الصفحات أو الـ actions اللي الـ customers بيستخدموها أكتر حاجة عشان يخلّصوا الـ tasks، عشان الـ navigation يدعمها (L9, Navigation).`, `كلمة "Red" ملهاش علاقة بلون الـ link: الـ Red Routes هي أشهر paths من الصفحات أو الـ actions اللي الـ customers بيستخدموها عشان يخلّصوا الـ tasks (L9, Navigation).`, `الـ Red Routes هي الـ paths اللي الـ customers بيستخدموها أكتر، مش paths ممنوعين منها (L9, Navigation).`],
    [`صح. واحدة من الـ navigation guidelines إن الـ company logo يبقى link للـ homepage (والـ layout rule بتخليه في نفس المكان في كل صفحة) (L9, Navigation).`, `الـ Navigation tabs مكانها فوق في الصفحة، مش تحت (L9, Navigation).`, `الـ guideline بتقول العكس: لازم يبقى فيه تغيير واضح في الـ hover على أي حاجة clickable، عشان الـ users يعرفوا إنها بتتداس (L9, Navigation).`, `links الـ Home والـ categories مكانها في كل صفحة.`],
    [`صح. أول error-message guideline إنك تقول المشكلة في الـ title، وبعدين تقول باختصار حصلت ليه، وتحط link تكمّل بيه أو ترجع، وتقترح الخطوة الجاية (L9, Forms).`, `الـ stack trace الطويل مش شرح مختصر. الـ guideline بتقول اكتب المشكلة في الـ title، وبعدين اشرح باختصار حصلت ليه (L9, Forms).`, `الاعتذار مش من الـ error-message guidelines. أول خطوة إنك تقول المشكلة في الـ title (L9, Forms).`, `قفل الـ app بيضيّع شغل الـ user. الـ guidelines عايزة link يكمّل الـ task أو يرجع للـ state اللي قبلها، مع اقتراح الخطوة الجاية (L9, Forms).`],
    [`الـ guideline بتقول يمين ومش لافت للنظر.`, `صح. الـ Cancel غالباً بيتحط على اليمين ومش ملفت للنظر، عشان الـ action button هو اللي ياخد انتباه الـ user (L9, Close vs Cancel).`, `أعلى الصفحة مش مكان زراير الـ dialog. الـ Cancel غالباً بيتحط على اليمين ومش ملفت للنظر (L9, Close vs Cancel).`, `الـ Cancel لازم يفضل باين، بس مش ملفت، وعادةً على اليمين؛ لو استخبى الـ users مش هيعرفوا يقفلوا (L9, Close vs Cancel).`]
  ],
  extra: [
    [`صح. لما يكون فيه اتنين buttons (action وواحد للقفل)، استخدم "Cancel" مش "Close".`, `"Close" بتتستخدم بس لما يكون فيه button واحد.`, `قاعدة المحاضرة إنها "Cancel" جنب الـ action button.`, `الـ button ده تبع الـ system notice، مش confirmation dialog.`],
    [`ده جزء من أجزاء الـ system notice.`, `صح. رسايل الـ notice متبقاش طويلة ولا generic.`, `ده جزء من أجزاء الـ system notice.`, `ده جزء من أجزاء الـ system notice.`],
    [`ده بيكسر الـ guideline بتاعة الـ consistency.`, `صح. الـ Alert messages لازم تبقى consistent في الموقع كله؛ متغيرش اللون ولا الـ style ولا المكان.`],
    [`إنك تشرح باختصار الـ error حصل ليه، تحت الـ title، دي تاني error-message guideline، فهي مش الإجابة (L9, Forms).`, `الـ link اللي يكمّل الـ task أو يرجع للـ state اللي قبلها ده guideline مذكورة، فهي مش الإجابة (L9, Forms).`, `صح. الـ guidelines بتقول اكتب المشكلة في الـ title واشرح حصلت ليه.`, `اقتراح الخطوة الجاية ده آخر error-message guideline، فهو مش الإجابة (L9, Forms).`],
    [`المشكلة في ترتيب الـ fields، مش في إنها باينة ولا لأ.`, `مفيش حاجة في السيناريو عن الألوان.`, `مفيش حاجة في السيناريو عن الـ logo.`, `صح. الأسامي لازم تترتب First/Middle/Last، مش تتلخبط مع fields تانية.`],
    [`صح. الـ logo مينفعش يتحرك من صفحة للتانية.`, `المشكلة في مكان الـ logo، مش الـ background.`, `الـ Red Routes هي الـ paths اللي العملاء بيستخدموها أكتر، مش مكان الـ logo.`, `ده عن buttons الـ dialog، مش عن الـ logo.`],
    [`صح. دي واحدة من الـ navigation guidelines.`, `المحاضرة بتذكر التغيير الواضح في الـ hover كـ navigation guideline.`],
    [`الـ Fonts مش طريقة التجميع في المحاضرة.`, `صح. المعلومات المرتبطة بتتجمع بـ frame أو separator.`, `الـ fold عن اللي باين من غير scroll، مش عن التجميع.`, `مش كل الـ commands تبقى buttons، والـ buttons مش بتجمّع معلومات.`],
    [`الـ Links للـ Home والـ categories في كل صفحة دي guideline لوحدها. الـ CTA هو button ملفت للنظر لأشهر خطوة جاية (L9, Navigation).`, `الـ Breadcrumbs بتوري الـ users فين، مش يعملوا إيه بعد كده.`, `صح. الـ CTA الواضح بيقول للـ users يعملوا إيه بعد كده.`, `الـ Alert messages بتبلّغ الـ users؛ مش هي الـ CTA.`],
    [`ده ضد الـ layout guideline.`, `صح. الـ background ميبقاش معقد وميشتتش عن المحتوى.`]
  ]
};

AR.hci.exams = [
  { sections: [
    { items: [
      { why: `الـ Papers والـ studies دي حد تاني عملها، يبقى ده secondary research (L3).`, ow: [null, `الـ Papers والـ studies اللي فاتت حد تاني هو اللي عملها، وده بالظبط تعريف المحاضرة للـ secondary research (كتب، journals). الـ Primary هو الـ research اللي إنت بتعمله بنفسك (L3).`] },
      { why: `الـ Tactical (design) research بيحصل <b>أثناء</b> الـ design. الـ research اللي بييجي بعد الـ launch اسمه post-launch research (L3).`, ow: [`الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design، باستخدام feedback على الـ prototypes. الـ research اللي بعد الـ launch اسمه post-launch research (L3, Types by WHEN).`, null] },
      { why: `معكوس. الـ Low-fidelity prototypes هي اللي أسرع وأسهل وأرخص (L8).`, ow: [`مقلوبة: الـ low-fidelity prototypes هي اللي أسرع وأسهل وأرخص، وعشان كده بتبدأ lo-fi وتنقل لـ hi-fi بعدين (L8, Power of lo-fi).`, null] },
      { why: `المقارنة حاطة "easier to coordinate the logistics" تحت الأفراد (L6).`, ow: [null, `جدول individuals vs groups حاطط "easier to coordinate the logistics" كميزة للـ individual interviews، فالجملة صح (L6).`] },
      { why: `خلي الـ surveys صغيرة على قد ما تقدر. الأسئلة الكتير بتقلل الـ response rate والـ reliability (L4).`, ow: [`الـ surveys الطويلة بتضر: النصيحة إنك تخلي الـ survey صغير على قد ما تقدر، لأن الأسئلة الكتير بتقلل الـ response rate والـ reliability (L4, Surveys).`, null] },
      { why: `ده الـ UI design. الـ UX هو التجربة الكاملة (L1).`, ow: [`الـ Interactivity والـ look and feel بتوع الشاشة أو الصفحة دول الـ UI design. الـ UX design هو التجربة الكاملة للـ user مع المنتج أو الموقع (L1, UI vs UX vs HCI).`, null] },
      { why: `الـ Surveys مذكورة ضمن الطرق الـ primary المنتشرة (L3).`, ow: [null, `الـ Surveys واحدة من طرق الـ primary research في المحاضرة، مع الـ interviews والـ focus groups والـ usability studies والـ observations، عشان إنت اللي بتعملها بنفسك (L3).`] },
      { why: `الكورس كله عن الـ user-centered design: دخّل الـ users من بدري وكتير، والـ prototypes معمولة أصلاً عشان تاخد feedback (L3، L7).`, ow: [`الـ User-centered design محتاج الـ users في كل خطوة: "you need users early and often"، والـ prototypes معمولة أصلاً عشان تجيب feedback وتعمل iterate (L3; L7).`, null] },
      { why: `الـ Focus groups والـ interviews الاتنين في لستة الطرق الـ primary في المحاضرة (مع الـ surveys والـ usability studies والـ observations)، عشان إنت اللي بتعملهم بنفسك (L3, Types by WHO).`, ow: [null, `الـ Focus groups والـ interviews الاتنين في لستة الطرق الـ primary في المحاضرة، عشان إنت اللي بتعملهم بنفسك (L3, Types by WHO).`] },
      { why: `الـ data الأرقام دي quantitative. الـ Qualitative عن ليه وإزاي (L4).`, ow: [`الـ data الرقمية (measures، counts) دي quantitative. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل، وغالباً بييجي من الـ interviews (L4, Types by WHAT).`, null] }
    ]},
    { items: [
      { why: `الـ Privacy بتحمي الـ PII والـ SPII بتوع الـ users. باقي الاختيارات ملهاش علاقة أو عكس الـ privacy.`, ow: [null, `الـ Privacy مش بتسرّع الـ research: الـ guidelines بتضيف حرص (اجمع اللي محتاجه بس، متربطوش بـ PII/SPII، امسحه بعد الاستخدام) (L4).`, `ده عكس الـ privacy: المفروض تجمع الـ data اللي محتاجها بس، وتفصلها عن الـ PII/SPII، وتمسحها لما متبقاش محتاجها (L4).`, `الـ Privacy مش بديل لأي research method؛ الـ interviews لسه مطلوبة. هي مهمة عشان بتحمي الـ user data (L4).`] },
      { why: `خطط من بدري، بس "الـ script مش كتاب مقدس". اعمل combination من الـ methods وخلي الـ privacy أساسية.`, ow: [null, `المحاضرة بتقول إن التخطيط مش معناه التشدد: "the script is not a bible"، فعدّل وإنت في الـ session (L4, General tips).`, `الـ methods لازم تتجمع بترتيب مناسب، والـ qualitative research هو اللي بيدّي فهم حقيقي، فالـ quantitative بس غلط (L4).`, `الـ Privacy والـ security بتوع الـ user data متصنفين essential، فعمرك ما تضحي بيهم عشان الراحة (L4, General tips).`] },
      { why: `L4: الـ quantitative (data أرقام) "easier for engineers and technical people to handle" يعني أسهل للـ engineers والناس الـ technical.`, ow: [`المحاضرة مخصّتش الـ designers؛ قالت إن الـ quantitative research (الرقمي) أسهل على الـ engineers والناس الـ technical (L4).`, null, `الـ Marketing teams مش مذكورين. الـ Quantitative research أسهل على الـ engineers والناس الـ technical (L4, Types by WHAT).`, `الأطفال ملهمش علاقة بالنقطة دي. الـ Quantitative research متقال عليه إنه أسهل على الـ engineers والناس الـ technical (L4).`] },
      { why: `خليه صغير، وواضح، وخلي بالك من الـ bias، وخد feedback من المشاركين.`, ow: [`ده عكس النصايح: خلي الـ surveys صغيرة على قد ما تقدر والأسئلة مختصرة، لأن الـ surveys الطويلة بتضر الـ response rate والـ reliability (L4; L5).`, null, `الـ Research لازم يتخطط له بدري؛ survey من غير تخطيط بيكسر الـ general research tips (L4, General tips).`, `المحاضرة بتقول سيب الأسئلة المفتوحة مفتوحة واعمل combination من الـ methods، فالأسئلة الـ quantitative بس مش هي المبدأ (L5, Be Unbiased).`] },
      { why: `نفس سؤال رقم 1، متطبع مرتين في الورقة.`, ow: [null, `الـ Privacy مش بتسرّع الـ research: الـ guidelines بتضيف حرص (اجمع اللي محتاجه بس، متربطوش بـ PII/SPII، امسحه بعد الاستخدام) (L4).`, `ده عكس الـ privacy: المفروض تجمع الـ data اللي محتاجها بس، وتفصلها عن الـ PII/SPII، وتمسحها لما متبقاش محتاجها (L4).`, `الـ Privacy مش بديل لأي research method؛ الـ interviews لسه مطلوبة. هي مهمة عشان بتحمي الـ user data (L4).`] },
      { why: `الـ wireframe هيكل فيه placeholders ومفيهوش ألوان ولا fonts عن قصد.`, ow: [`الـ Wireframes مفيهاش ألوان ولا font styles عن قصد؛ عرض الـ visual design النهائي ده شغل الـ hi-fi prototypes (L8, Wireframes).`, `الـ Wireframes ملهاش علاقة بالـ backend؛ هي schematic للـ outline الأساسي للشاشة (L8, Wireframes).`, null, `الـ Wireframes بتترسم (ورقة وقلم، وبعدين Figma وBalsamiq…)، مش بتتكتب code، وبتيجي قبل الـ visual design والـ code (L8).`] },
      { why: `المحاضرة بتذكر Figma و Adobe XD و Sketch و Balsamiq و Pencil.`, ow: [`الـ Visual Studio والـ Eclipse دول IDEs للـ code. أدوات الـ wireframing في المحاضرة هي Figma وAdobe XD وSketch وBalsamiq وPencil (L8).`, `الـ Word والـ Excel أدوات office، مش في اللستة. أدوات الـ wireframing هي Figma وAdobe XD وSketch وBalsamiq وPencil (L8).`, null, `الـ Final Cut Pro والـ Premiere برامج مونتاج فيديو. أدوات الـ wireframing هي Figma وAdobe XD وSketch وBalsamiq وPencil (L8).`] },
      { why: `الـ Lo-fi سريع ورخيص وبياخد constructive feedback أكتر.`, ow: [`العكس: الـ lo-fi prototypes أسرع وأسهل وأرخص، ودي بالظبط قوتها (L8, Power of lo-fi).`, `الـ UI المفصّل والواقعي ده high fidelity، قريب جداً من الـ look and feel النهائي؛ الـ lo-fi prototypes مجرد sketches تقريبية (L8).`, null, `الـ Lo-fi مش بديل للـ hi-fi: بتبدأ بالـ lo-fi وبتنقل للـ hi-fi وإنت ماشي في الـ design (L8, Prototypes and fidelity).`] },
      { why: `الـ Observation ده primary (إنت اللي بتعمله) و qualitative (إزاي وليه). الـ statistics والأرقام quantitative، والـ logs الموجودة مش data متجمعة جديد.`, ow: [`الـ Statistical analysis بيشتغل على أرقام، فهو quantitative مش qualitative، حتى لو الـ survey نفسه كان primary (L4, Types by WHAT).`, `الـ Data اللي طبيعتها رقمية دي تعريف الـ quantitative research، عكس اللي السؤال عايزه (L4, Types by WHAT).`, null, `الـ system logs الموجودة دي data موجودة أصلاً، مش إنت اللي جمعتها من study، وكمان الـ logs أغلبها counts (quantitative)، مش ليه وإزاي (L4).`] },
      { why: `L4: "effort should be done before the interview to write a script of the questions" يعني لازم تتعب قبل الـ interview وتكتب script بالأسئلة.`, ow: [`المحاضرة بتقول خطط بدري واكتب script بالأسئلة بدل ما تسأل أسئلة عشوائية (L4, General tips).`, null, `تجاهل الـ context مش خطوة تحضير. الـ researchers لازم يخططوا بدري بـ script فيه الأسئلة (L4, General tips).`, `الـ User research عن احتياجات الـ users والـ pain points بتاعتهم، مش التفاصيل الـ technical بس. خطوة التحضير هي كتابة script بالأسئلة (L4).`] }
    ]},
    { items: [
      { why: `الجدول اللي في L4 slide 6 هو بالظبط المطلوب. ارسمه.`, ans: `<table><tr><th></th><th>Primary</th><th>Secondary</th></tr><tr><td>مين بيجمعه</td><td>إنت (أو حد إنت مأجّره)</td><td>حد تاني</td></tr><tr><td>أمثلة</td><td>Surveys، focus groups، interviews، observations، experiments</td><td>بتبص على data موجودة: كتب، journals، reports</td></tr><tr><td>Qual. ولا quant.؟</td><td>أي واحد فيهم</td><td>أي واحد فيهم</td></tr><tr><td>الميزة</td><td>specific لاحتياجاتك؛ وإنت متحكم في الـ quality</td><td>غالباً رخيص وسريع</td></tr><tr><td>العيب</td><td>بيكلّف أكتر وبياخد وقت أطول</td><td>ممكن يكون قديم أوي أو مش specific كفاية</td></tr></table>` },
      { why: `اذكر الـ 6 principles وادّي مثال "متسألش كده / اسأل كده بدلها" لكل واحد. كده تغطي الدرجات.`, ans: `<b>Be Clear</b>: اكتب labels للـ numeric scales (1 = Highly dissatisfied … 5 = Highly satisfied)؛ تجنب الـ ranges المتداخلة (0-2، 3-5، 6-10)؛ زوّد تفاصيل لو شاكك؛ اعمل timebox للتكرار ("in the past seven days…").<br><b>Be Concise</b>: لغة بسيطة ("How clean was the car?").<br><b>Be Specific</b>: تجنب الأفكار الكبيرة أوي؛ تجنب الـ double-barrel questions (قسّم "speed and availability")؛ تجنب الـ internal conflict (قسّم "food" لـ temperature و appearance و flavor).<br><b>Be Expressive</b>: ركّز على الآراء ("too high, too low, or about right?")؛ ranges بدل yes/no؛ مستويات موافقة؛ اسمح بأكتر من اختيار.<br><b>Be Unbiased</b>: ضيف "Other: ___"؛ سيب الأسئلة المفتوحة مفتوحة؛ تجنب الـ leading questions؛ تجنب الكلمات الـ loaded ("wasted" تبقى "spent").<br><b>Be Usable</b>: progress bar، طول صفحات ثابت، ترتيب منطقي، تنبيه على الأسئلة اللي متجاوبتش، اعمل preview للـ survey.` },
      { why: `من L3 slides 11–12.`, ans: `<b>1. Foundational (strategic / generative)</b>: قبل ما أي حاجة تتصمم. بيحدد مشاكل الـ users وإيه اللي هيتبني عن طريق الكلام مع الـ users عن الـ pain points بتاعتهم، وبيطلّع فرص الفريق مكانش هيفكر فيها.<br><b>2. Tactical (design)</b>: أثناء مرحلة الـ design. بيقول المنتج يتبني إزاي، باستخدام user feedback على الـ prototypes.<br><b>3. Post-launch</b>: بعد الـ release. هل نجحنا؟ هل الـ system بيلبّي احتياجات الـ users؟` },
      { why: `من L8 slide 11 (رسمة الـ timeline: نقطة تسليم واحدة ضد sync points كتير).`, ans: `<b>Handoff process</b>: مرحلة الـ design بتخلص خالص، وبعدين الـ design بيتسلّم للـ development (ورا بعض، نقطة تسليم واحدة).<br><b>Handshake process</b>: الـ design والـ development ماشيين <b>بالتوازي</b> وبيعملوا sync في نقط كتير أثناء المشروع، فالمشاكل بتتمسك بدري.` }
    ]},
    { items: [
      { why: `الدرجات بتيجي من إنك تطبّق guidelines المحاضرات: user research، wireframes، forms، layout و navigation (L8–L9). اذكر اسم الـ guideline جنب كل قرار design.`, ans: `<b>1. ابدأ من الـ user research.</b> كبار السن محتاجين <b>text كبير و touch targets كبيرة</b> (زي case الـ truckers). خلي عدد الخطوات قليل واللغة بسيطة.<br><b>2. الـ Home screen (above the fold):</b> الـ logo فوق على الشمال (في نفس المكان في كل شاشة، وبيودّي للـ home)؛ <b>search bar</b> كبير ("Search doctor, specialty…")؛ أيقونات الـ specialties في grid (Cardiology، Dentistry…)؛ card "My upcoming appointment"؛ و<b>tab bar</b> تحت: Home · Search · Appointments · Profile.<br><b>3. قايمة الدكاترة:</b> filters (specialty، المنطقة، السعر، الـ rating)؛ كل card فيها صورة، اسم، specialty، rating، أقرب ميعاد فاضي، و<b>primary CTA "Book"</b>.<br><b>4. الـ Booking flow</b> (path ثابت، فاستخدم <b>progress bar</b>: Doctor ← Date/Time ← Details ← Confirm)؛ افتكر data المريض (<b>remove repetitive actions</b>)؛ fields فيها <b>hints و formats</b>؛ و<b>الـ errors جنب الـ field</b> مع border أحمر.<br><b>5. Confirmation page</b> بعد الحجز ("Appointment booked with Dr. X, Sun 10:00") مع "Add to calendar".<br><b>6. إلغاء الميعاد:</b> dialog فيه action button "Cancel appointment" و button "Keep" secondary مش لافت للنظر على اليمين؛ و alert style ثابت.<br><b>7. القواعد الـ visual:</b> palette من 3 ألوان، background بسيط، المعلومات المرتبطة متجمعة بـ frames، وفرق واضح بين الـ primary والـ secondary CTA.<br><b>8. الأدوار التانية:</b> الدكاترة والـ admins ليهم schedule view (يوم/أسبوع) وشاشة manage-slots.<br><b>9. الـ Process:</b> ارسم 5+ paper wireframes لكل شاشة، اختبر مع المرضى وكبار السن، اعمل iteration، وبعدين اعمل hi-fi على Figma.` }
    ]}
  ]},
  { sections: [
    { items: [
      { why: `الـ User research بيغطي الـ users <b>و</b>الـ tasks بتاعتهم (L1).`, ow: [null, `الـ User research معناه إنك تتعلم عن الـ users <b>و</b>الـ tasks اللي بيحاولوا يخلّصوها، والـ user في الحقيقة بيتعامل مع الـ task، مش الـ system (L1).`] },
      { why: `L3 بتقول إن الـ tactical research "takes place during the design phase" يعني أثناء الـ design. اللي بعد الـ design phase يبقى post-launch research. الـ key غالباً كاتب "after" بشكل مش دقيق؛ جاوب من المحاضرة إلا لو الدكتور قال غير كده.`, ow: [`الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design، باستخدام feedback على الـ prototypes. اللي بييجي بعدها اسمه post-launch research (L3, Types by WHEN).`, null] },
      { why: `مقلوبة. الـ Low-fidelity prototypes هي اللي أسرع وأسهل وأرخص؛ والـ hi-fi مش ممكن أصلاً في الأول عشان التفاصيل لسه متحددتش (L8, Power of lo-fi).`, ow: [`مقلوبة: الـ low-fidelity prototypes هي اللي أسرع وأسهل وأرخص، وعشان كده بتبدأ lo-fi وتنقل لـ hi-fi بعدين (L8, Power of lo-fi).`, null] },
      { why: `المحاضرة بتوصف الـ interview إنه أشهر research technique، ومتقدّر عشان بيدّي فهم أعمق من خلال أسئلة "why" المفتوحة والـ follow-ups (L6, Interviews).`, ow: [null, `المحاضرة بتبدأ جزء الـ interviews بإنها بتسمّي الـ interview أشهر research technique، فالجملة صح (L6, Interviews).`] },
      { why: `الأفراد أسهل في تنسيق الـ logistics.`, ow: [null, `جدول individuals vs groups حاطط "easier to coordinate the logistics" كميزة للـ individual interviews، فالجملة صح (L6).`] },
      { why: `الـ research اللي حد تاني عمله اسمه secondary. الـ Primary هو اللي إنت بتعمله بنفسك.`, ow: [`الـ research اللي حد تاني عمله (كتب، journals) ده secondary research. الـ Primary research هو اللي إنت بتعمله بنفسك، زي الـ interviews والـ surveys (L3).`, null] },
      { why: `المبدأ هو "Be UNbiased". الـ key غالباً معتبرها typo وأصلها "Be unbiased". بس زي ما هي مكتوبة، الجملة غلط.`, ow: [`واحد من الـ six principles هو "Be Unbiased" (ابعد عن الأسئلة الـ leading والـ loaded، واسمح بـ "Other")، فإنك تبقى biased عمره ما يبقى كويس للـ survey (L5).`, null] },
      { why: `الـ Interactivity والـ look and feel بتوع الشاشة أو الصفحة ده تعريف الـ UI design. الـ UX design هو التجربة الكاملة للـ user مع المنتج أو الموقع (L1, UI vs UX vs HCI).`, ow: [`الـ Interactivity والـ look and feel بتوع الشاشة أو الصفحة دول الـ UI design. الـ UX design هو التجربة الكاملة للـ user مع المنتج أو الموقع (L1, UI vs UX vs HCI).`, null] },
      { why: `ده تعريف الـ PII في المحاضرة: تفاصيل ممكن تعرّف الـ user، وأمثلتها الأسامي وعنوان البيت والـ email address ورقم التليفون (L4, Privacy and security).`, ow: [null, `الجملة مطابقة لتعريف الـ PII في المحاضرة: تفاصيل ممكن تعرّف الـ user، زي الأسامي وعنوان البيت والـ email ورقم التليفون (L4).`] },
      { why: `الـ Surveys من أرخص الطرق؛ الـ interviews محتاجة وقت لكل شخص و incentives.`, ow: [`مقلوبة: الـ surveys من أرخص الطرق، أما الـ interviews فأغلى عشان هي synchronous واللي بنعملهم interview بيستنوا incentives (L4; L6).`, null] },
      { why: `ده تعريف L1 بالحرف: الـ HCI هو التفاعل بين الـ user والـ computer، أو العلاقة بين الـ users والـ computer systems (L1, What is HCI?).`, ow: [null, `ده تعريف المحاضرة بالحرف: الـ HCI هو التفاعل بين الـ user والـ computer، أو العلاقة بين الـ users والـ computer systems (L1).`] },
      { why: `التجربة الكاملة للـ user مع المنتج أو الموقع دي الـ UX design. الـ UI design هو بس الـ interactivity والـ look and feel بتوع الشاشة أو الصفحة (L1, UI vs UX vs HCI).`, ow: [`التجربة الكاملة مع المنتج أو الموقع دي الـ UX design. الـ UI design هو الـ interactivity والـ look and feel بتوع الشاشة أو الصفحة (L1, UI vs UX vs HCI).`, null] },
      { why: `L1 بتقول "software development is research": يعني مش بس إنك تعمل software، لكن كمان إنك تتعلم إزاي تعمل الـ software الأنسب للغرض بتاعه (L1, UI design process).`, ow: [null, `الجملة مأخوذة من نقطة المحاضرة إن "software development is research": إنك تتعلم إزاي تبني الـ software الأنسب للغرض بتاعه (L1).`] },
      { why: `ده تعريف المحاضرة للـ prototype الكويس: بيسمح بـ feedback مفيد (constructive) وبالـ iteration، ومش لازم يشبه الـ final product (L7, Prototyping).`, ow: [null, `ده تعريف المحاضرة للـ prototype الكويس: اللي بيسمح بـ feedback مفيد وconstructive وبالـ iteration على الـ design (L7, Prototyping).`] },
      { why: `الـ data الرقمية (measures، counts) دي quantitative research. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل، وغالباً بييجي من الـ interviews (L4, Types by WHAT).`, ow: [`الـ data الرقمية (measures، counts) دي quantitative. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل (L4, Types by WHAT).`, null] }
    ]},
    { items: [
      { why: `الـ HCI (Human Computer Interaction) والـ HMI (Human Machine Interaction) والـ MMI (Man Machine Interaction) بيتقالوا بالتبادل لنفس المجال، فالتلاتة صح (L1, What is HCI?).`, ow: [`الـ Human Computer Interaction هو الـ HCI نفسه، بس الـ HMI والـ MMI مصطلحات صح برضه، فلو اخترت ده بس تبقى ناقصة (L1).`, `الـ HMI مصطلح منهم، بس الـ HCI والـ MMI كمان، فالإجابة الكاملة "All the above" (L1).`, `الـ MMI مصطلح منهم، بس الـ HCI والـ HMI كمان، فالإجابة الكاملة "All the above" (L1).`, null] },
      { why: `الأسامي والعنوان والـ email دول PII عادي. أرقام الحسابات المالية هي الـ SPII.`, ow: [`الأسامي دي PII عادي: بتعرّف الـ user بس مش في اللستة الـ sensitive (SSN، license، passport، الحسابات المالية، تاريخ الميلاد) (L4).`, `عنوان البيت متصنّف PII مع الأسامي والـ email والتليفون؛ مش من أمثلة الـ SPII (L4, Privacy and security).`, `الـ Email address ده PII عادي في لستة المحاضرة. الـ SPII هي data لو ضاعت ممكن تسبب ضرر مالي أو إحراج أو تمييز (L4).`, null] },
      { why: `"Tips for good interview" في L6 بتبدأ بـ "Plan ahead and prepare your questions before the interview time"، و L4 بتقول اكتب interview script. كلام المحاضرة بيطابق "Interview". الـ key معلّم على Survey، فاذكر جملة المحاضرة لو اتسألت.`, ow: [null, `الـ Surveys لازم يتخطط لها برضه، بس الجملة دي نصيحة الـ interview: "Plan ahead and prepare your questions before the interview" (L6). وبيتقال إن الـ key الرسمي معلّم على الاختيار ده.`, `الـ Observation مش موضوع الجملة دي. النصيحة المقتبسة من tips الـ interview: حضّر أسئلتك قبل الـ interview (L6).`, `الإجابة موجودة في المحاضرة: tips الـ interview بتبدأ بـ "Plan ahead and prepare your questions before the interview" (L6).`] },
      { why: `اسمع كويس واكتب notes هما المفتاحين. و(b) عكس النصيحة الحقيقية.`, ow: [`الـ Listen well واحدة من الحاجتين الأساسيتين أثناء الـ interview، بس الـ take notes هي التانية، فالإجابة الكاملة "a & c" (L6).`, `ده عكس النصيحة الحقيقية: المحاضرة بتقول <b>سيب</b> شوية وقت بين الـ interviews (L6, Tips for a good interview).`, `الـ Take notes واحدة من الحاجتين الأساسيتين، بس الـ listening well هي التانية، فالإجابة الكاملة "a & c" (L6).`, null] },
      { why: `أوصاف اللي بنعملهم interview بتشرح ليه وإزاي الحاجات بتحصل، وده تعريف المحاضرة للـ qualitative data؛ أما الـ quantitative data فرقمية (measures، counts) (L4, Types by WHAT).`, ow: [`الـ Quantitative data رقمية (measures، counts). أوصاف اللي بنعملهم interview بتشرح ليه وإزاي، فهي qualitative (L4).`, null, `الـ "Average data" مش نوع research data. حسب الـ WHAT، الـ data يا quantitative (أرقام) يا qualitative (ليه وإزاي) بس (L4).`, `الـ "Gathering data" مجرد تجميع data، مش نوع data. الأوصاف اللي جاية من الـ interviews دي qualitative data (L4).`] }
    ]},
    { items: [
      { why: `جدول المقارنة في L4.`, ans: `الـ Primary: إنت اللي بتجمعه (surveys، focus groups، interviews، observations، experiments)؛ specific لاحتياجاتك وإنت متحكم في الـ quality؛ بيكلّف أكتر وبياخد وقت أطول.<br>الـ Secondary: حد تاني جمعه (data موجودة، كتب، journals)؛ رخيص وسريع؛ ممكن يكون قديم أوي أو مش specific كفاية.<br>والاتنين ممكن يبقوا qualitative أو quantitative.` },
      { why: `ده تمرين L5. الـ labels بتاعة إجاباته كانت: ambiguous scale، changing number of options، reversing scale، leading questions، yes/no questions.`, ans: `<b>(i)</b> <b>سؤال yes/no</b> (مش expressive). استخدم ranges: "In the past seven days, how much time have you spent on social media? 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours".<br><b>(ii)</b> <b>Leading question</b>: بيفترض إن الشخص بيحب التمرين. اسأل "How do you feel about exercising?" أو اسأل الأول هو بيتمرن ولا لأ.<br><b>(iii)</b> <b>Loaded question</b>: كلمة "wasted" فيها حكم. استخدم "spent".<br><b>(iv)</b> <b>Scale مش واضح / معكوس</b>: إن 1 = "a lot" ماشي عكس الاتجاه المعتاد من الصغير للكبير، والـ scale من 4 نقط مفيهوش نص محايد.<br><b>(v)</b> <b>عدد الـ options بيتغير</b> (6 هنا ضد 4 في iv) و<b>اتجاه الـ scale معكوس</b> مقارنة بـ (iv). خلي طول الـ scale واتجاهه ثابتين في الـ survey كله.` },
      { why: `L6 slide 4، وهي كمان الإجابة الرسمية.`, ans: `خطط من بدري وجهّز أسئلتك قبل الـ interview.<br>أثناء الـ interview، فيه مفتاحين للنجاح:<br>• اسمع كويس: الـ user هو اللي المفروض يتكلم أغلب الوقت.<br>• اكتب notes: واحد يسأل والتاني يكتب (الـ audio recording مش كفاية)؛ اكتب المشاعر وردود الفعل ونبرة الصوت.<br>سيب شوية وقت بين الـ interviews.` },
      { why: `L8 slides 5–6.`, ans: `• الـ Lo-fi prototypes أسرع وأسهل وأرخص في إنك تعملها.<br>• الـ Hi-fi مش عملي في الأول لأن القرارات عن تفاصيل كتير لسه متاخدتش.<br>• الناس بتبقى مستعدة تتكلم أكتر بكتير لما تديهم sketch من حاجة شكلها خلصان.<br>• Konstan: الـ prototype اللي باين إنه بمجهود قليل (مرسوم بالإيد) بيطلّع constructive feedback أهم وأكتر.<br>• التفاصيل الكتير بتخلي الناس تدّي feedback في مستوى أقل من المطلوب.<br>• Google: في الأول اعرض أفكار high-level؛ وبعدين ركّز على التفاصيل زي شاشات الـ app.` }
    ]},
    { items: [
      { why: `الإجابة الرسمية (L8 slide 13). لو زوّدت الـ 4 purposes تاخد الدرجة كاملة.`, ans: `رسم تخطيطي (schematic) للهيكل الأساسي لشاشة في system.<br>• معمول بخطوط وأشكال بسيطة (مستطيلات، دواير…) مع شوية text؛ والخطوط شكلها كأنها معمولة من سلوك (wires).<br>• مفيهوش ألوان ولا font styles عن قصد، عشان نركز على الـ structure.<br>• الـ Wireframe = هيكل (skeleton) فيه placeholders.` },
      { why: `الممتحنين بيدّوا درجات على تطبيق guidelines بأساميها من L8–L9. اكتب جنب كل قرار القاعدة اللي ماشي عليها.`, ans: `<b>الـ Research الأول:</b> مين بيشتري (الأعمار، الأجهزة، موبايلات low-end؟) وأهم الـ tasks بتاعتهم (search، compare، buy، track order)، ودول الـ <b>red routes</b>.<br><b>الـ Home (above the fold):</b> logo فوق على الشمال وبيودّي للـ home؛ search bar؛ category chips؛ banner للعروض؛ tab bar تحت: Home · Categories · Cart · Orders · Account.<br><b>قايمة المنتجات:</b> grid cards (صورة، اسم، سعر، rating) مع filters و sort؛ و breadcrumbs (Home › Men › Shoes) بتوري الـ user هو فين.<br><b>صفحة المنتج:</b> صور، سعر، اختيار المقاس/اللون؛ الـ primary CTA "Add to cart" باين أكتر و"Add to wishlist" secondary.<br><b>الـ Checkout</b> (path ثابت، فـ <b>progress bar</b>: Cart ← Shipping ← Payment ← Confirm): عنوان و card محفوظين (remove repetitive actions)، hints/formats في الـ fields، والـ errors جنب الـ field.<br><b>Confirmation page</b> فيها رقم الأوردر والـ tracking.<br><b>القواعد الـ visual:</b> palette من 3 ألوان، background بسيط، تجميع بـ frames، alerts ثابتة، حالات hover/press واضحة، والـ Cancel على اليمين ومش لافت للنظر.<br><b>الـ Process:</b> paper wireframes (5+ versions لكل شاشة) ← feedback ← Figma hi-fi ← test مع الـ users ← iterate.` }
    ]}
  ]}
];

// ── Student-summary questions (summary/hci.js), appended in the same order ──
AR.hci.lectures["1"].quiz.push(
  ["الـ HCI هدفه العكس: إنه يصمم computer systems سهلة وطبيعية و intuitive تسهّل التفاعل بتاع الـ user (L1, Objective of HCI).","الـ Security مش مذكورة في أهداف الـ HCI؛ الأهداف عن التصميم للناس وللـ tasks وللبيئات، وتسهيل التفاعل (L1, Objective of HCI).","كفاءة الماكينة كانت تركيز الأنظمة القديمة، لما الـ usability مكانتش في دماغ حد. الـ HCI عن تفاعل الـ user، مش عن سرعة الماكينة (L1, UI vs UX vs HCI).","صح. النهارده نجاح أي system محتاج design يكون user-centric، مركّز على الـ <b>usability</b> وعلى <b>user experience</b> لطيفة (smooth) (L1, UI vs UX vs HCI)."],
  ["الـ HCI عن التفاعل بين الـ users والكمبيوتر وإزاي نسهّله، مش عن مدى تعقيد الـ code (L1, What is HCI?).","صح. الـ HCI هو التفاعل بين الـ user والكمبيوتر، أو <b>العلاقة بين الـ users والـ computer systems</b> (L1, What is HCI?).","أداء الـ hardware مش هو التركيز؛ الـ HCI بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم) والتكنولوجيا اللي بتحسّن تفاعلهم مع الكمبيوتر (L1, What is HCI?).","الـ HCI دايماً فيه إنسان: هو التفاعل بين الـ <b>user</b> والكمبيوتر، مش كمبيوتر مع كمبيوتر (L1, What is HCI?)."],
  ["ده مش مصطلح من الكورس. في المحاضرة الـ UX مكتوب UX Design (User Experience) (L1, UI vs UX vs HCI).","الـ U في UX معناها User مش Unified: الـ UX Design (User Experience) بيغطي التجربة الكاملة بتاعة الـ user مع المنتج (L1, UI vs UX vs HCI).","صح. المحاضرة كاتباه <b>UX Design (User Experience)</b>: بيغطي التجربة الكاملة بتاعة الـ user مع المنتج أو الـ website (L1, UI vs UX vs HCI).","الـ X معناها Experience مش Execution: الـ UX عن التجربة الكاملة بتاعة الـ user مع المنتج أو الـ website (L1, UI vs UX vs HCI)."],
  ["ده مش مصطلح من الكورس. المحاضرة كاتبة الـ UI كده: UI Design (User Interface) (L1, UI vs UX vs HCI).","الـ I معناها Interface: الـ UI design هو الـ interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الـ web (L1, UI vs UX vs HCI).","صح. المحاضرة كاتباه <b>UI Design (User Interface)</b>: الـ interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الـ web (L1, UI vs UX vs HCI).","ده خالط المصطلحات ببعض: الـ Experience تبع الـ UX (User Experience)، والـ U معناها User مش Unified (L1, UI vs UX vs HCI)."],
  ["الـ UI Design فرع من فروع الـ HCI في رسمة الـ hierarchy of fields اللي في المحاضرة، فهو جزء أساسي من الـ HCI (L1, HCI in a broader hierarchy of fields).","المحاضرة بتقول إن نجاح أي system النهارده محتاج design مركّز على الـ <b>usability</b>، فالـ usability في قلب الـ HCI (L1, UI vs UX vs HCI).","صح. الـ Machine learning مش جزء من الـ HCI في الكورس؛ الـ HCI بيتفرع لـ UI design و UX design و interaction design، وتركيزه على الـ usability والـ user experience (L1, HCI in a broader hierarchy of fields).","الـ UX Design فرع من فروع الـ HCI في الـ hierarchy اللي في المحاضرة، والـ user experience اللطيفة شرط للنجاح (L1, HCI in a broader hierarchy of fields)."],
  ["الـ HCI مش دراسة الماكينة لوحدها؛ هو التفاعل بين الـ user والكمبيوتر، وكمان بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم) (L1, What is HCI?).","أداء الـ algorithms ده موضوع كفاءة software، وده كان تركيز الأنظمة القديمة لما الـ usability مكانتش في دماغ حد؛ الـ HCI عن تفاعل الـ user (L1, UI vs UX vs HCI).","الـ Networking والـ databases مش جزء من تعريف الـ HCI؛ الـ HCI هو العلاقة بين الـ users والـ computer systems (L1, What is HCI?).","صح. الـ HCI هو التفاعل بين الـ user والكمبيوتر، وبيتعامل مع الـ <b>design والـ implementation والـ evaluation</b> بتاع الـ interactive systems اللي الـ users بتوعها بياخدوا أقصى استفادة بسهولة (L1, What is HCI?)."],
  ["ده هدف فعلاً: الـ HCI بيصمم للناس، ومنهم الـ users اللي عندهم احتياجات خاصة زي الأطفال وكبار السن وذوي الإعاقة، وهدفه إنه يسهّل التفاعل مع الكمبيوتر (L1, Objectives of HCI; User research).","ده هدف فعلاً: المحاضرة بتقول إن نجاح أي system النهارده محتاج design يكون user-centric و<b>مركّز على الـ usability</b> (L1, UI vs UX vs HCI).","صح. الـ HCI هدفه العكس: إنه <b>يصمم systems سهلة وطبيعية و intuitive</b> توفّر الوقت وتقلل التكاليف (L1, Objectives of HCI). وL2 كمان بتوضح إن الـ features لما تزيد وتزيد بتخلي الـ app يبان معقد.","ده هدف فعلاً: المحاضرة بتقول إن النجاح محتاج user experience لطيفة (smooth)، والـ UX design فرع من فروع الـ HCI (L1, UI vs UX vs HCI)."],
  ["صح. الـ UI design هو \"interactivity, look and feel of product screen or web page\"، أما الـ UX design فهو \"covers a user's <b>overall experience</b> with the product or website\" (L1, UI vs UX vs HCI).","المحاضرة بتعرّف كل واحد لوحده: الـ UI هو الـ look and feel بتاع الشاشة، والـ UX هو التجربة الكاملة، وهما فرعين منفصلين تحت الـ HCI (L1, UI vs UX vs HCI).","ولا تعريف فيهم عن الـ coding. الـ UI عن إنك تصمم الحاجات بشكل حلو للشاشة، والـ UX عن التجربة الكاملة وتحديد (dictating) التفاعلات (L1, UI vs UX vs HCI).","المحاضرة بتوري الـ UI design والـ UX design كفرعين منفصلين من الـ HCI؛ واحد مش بيحل محل التاني (L1, HCI in a broader hierarchy of fields)."],
  ["التركيز على software كفء ده كان طريقة بناء الأنظمة القديمة، لما \"usability was not thought of\"؛ النهارده الـ design لازم يكون user-centric (L1, UI vs UX vs HCI).","صح. الـ HCI هدفه \"design easy, natural and intuitive computer systems\"، والنجاح محتاج design \"focused on usability and pleasant (smooth) user experience\" (L1, Objectives of HCI; UI vs UX vs HCI).","الـ process بيبدأ بالـ user research وبيخلص بالـ user interface evaluation؛ والمحاضرة بتقول اشتغل مع الـ users بدل ما تخمّن (L1, UI design process; Case studies).","الهدف العكس: systems سهلة وطبيعية و intuitive توفّر الوقت وتقلل التكاليف (L1, Objectives of HCI)."],
  ["صح. الـ 3 components هما 1- user research، 2- <b>design and prototyping of the interface</b>، 3- user interface evaluation (improvement) (L1, UI design process).","الـ Marketing مش واحد من الـ 3 components بتوع الـ UI design process (L1, UI design process).","الـ Coding مش مذكور كـ component؛ الـ 3 components هما user research، و design and prototyping، و evaluation (L1, UI design process).","الـ Evaluation (improvement) هو الـ component التالت، اللي بييجي بعد الـ design and prototyping، مش بعد الـ user research على طول (L1, UI design process)."],
  ["الـ Animations مش جزء من الـ user research. الـ User research عن إنك تتعلم عن الـ users والـ tasks بتاعتهم قبل ما تصمم (L1, User Research).","إنك تختبر الـ interface وتحسّنه ده الـ component التالت، الـ user interface evaluation، مش الـ user research اللي بييجي الأول (L1, UI Design Process).","الـ Coding مش مذكور في الـ UI design process خالص. الـ components بتوعه هما user research، و design and prototyping، و evaluation (L1, UI Design Process).","صح. في الـ user research بتتعلم عن الـ <b>users</b> (مهاراتهم، واللي بيشتتهم، واحتياجاتهم الخاصة) والـ <b>tasks</b> اللي بيحاولوا يخلّصوها، عشان الـ design يتبني عليهم (L1, User Research)."],
  ["المحاضرة بتذكر نتيجة من نوع عكس كده: الـ users فضّلوا الـ <b>visual</b> search، اللي اتستخدم في 71% من عمليات البحث (L1, Example Case).","صح. صفحة البحث بتاعة الـ ICDL اللي صممها الـ HCIL كانت design كويس وزارها أكتر من 3 مليون unique visitor، والـ <b>visual search كان مفضّل عند الـ users (71% من عمليات البحث)</b> (L1, Example Case).","مفيش حاجة في المحاضرة بتأيد ده. الـ visual search الـ interactive بتاع الـ ICDL كان الطريقة المفضّلة للبحث (L1, Example Case).","المحاضرة بتقدّم الـ ICDL كـ design كويس الـ users حبوه، والـ HCI هدفه systems سهلة وطبيعية و intuitive (L1, Objective of HCI)."],
  ["صح. المحاضرة بتقول إن هدفنا إننا نساعد البني آدمين <b>يحسّوا إنهم بيتفاعلوا مع الـ task مباشرة</b> والـ interface يختفي في نص التفاعل ده (L1, Invisible Interface).","\"Invisible\" مش معناها إنك تخبي الـ functions. معناها إن الـ users بيقضوا وقت قليل مركزين على الـ interface وبيركزوا على الـ task بتاعتهم (L1, Invisible Interface).","الـ prompts اللي على طول بتشد الانتباه للـ interface، أما الـ invisible interface فهو اللي الـ user بينساه، زي حكم الماتش اللي محدش واخد باله منه (L1, Human-Computer or Human-Task interaction).","الـ input الكتير بيخلي الـ user يفكر في الأداة. والمحاضرة بتقول إن الـ user المفروض يفكر في الـ task مش في الأداة (L1, Invisible Interface)."],
  ["الـ Installation مش واحد من الـ components. التلاتة هما user research، و design and prototyping، و user interface evaluation (L1, UI Design Process).","الـ Marketing مش جزء من الـ UI design process. الـ 3 components بتوعه هما user research، و design and prototyping، و evaluation (L1, UI Design Process).","صح. الـ 3 components المتنصوح بيهم هما 1- user research، 2- design and prototyping of the interface، 3- <b>user interface evaluation (improvement)</b> (L1, UI Design Process).","الـ Data entry مش component في الـ UI design process؛ الـ component التالت هو الـ user interface evaluation (L1, UI Design Process)."],
  ["صح. الـ slide بتقول \"<b>The user should think about the task rather than thinking about the tool</b>\" (L1, Invisible Interface).","الهدف العكس: الـ users المفروض يقضوا وقت قليل مركزين على الـ interface ويركزوا على الـ task بدل كده (L1, Invisible Interface).","إنك تتشيك على الـ updates ده انتباه للأداة. في الـ invisible interface الـ user بينسى الـ interface وبيشتغل على الـ task (L1, Human-Computer or Human-Task interaction).","الزراير والـ menus دي الأداة. المحاضرة عايزة الـ users يركزوا على الـ task اللي بيحاولوا يخلّصوها، مش على الـ interface (L1, Invisible Interface)."],
  ["الـ HCI مش عن تصميم الـ hardware. هو التفاعل (العلاقة) بين الـ users والـ computer systems، وبيتعامل مع الـ design والـ implementation والـ evaluation بتاع الـ <b>interactive systems</b> (L1, What is HCI?).","صح. الـ HCI هو <b>التفاعل بين الـ user والكمبيوتر</b>، أو العلاقة بين الـ users والـ computer systems. بيتعامل مع الـ design والـ implementation والـ evaluation بتاع الـ interactive systems، زي الـ GUIs والـ web interfaces (L1, What is HCI? / Objective of HCI)."],
  ["صح. الـ HCI عن التفاعل بين الـ user والكمبيوتر، ومن أهدافه '<b>How to make the user interaction with computer easier?</b>' عن طريق إننا نصمم systems سهلة وطبيعية و intuitive (L1, What is HCI? / Objective of HCI).","أهداف الـ HCI في المحاضرة متمركزة حوالين إننا نسهّل تفاعل الـ user مع الكمبيوتر، والـ HCI بيدرس تكنولوجيا الكمبيوتر اللي ممكن تحسّن التفاعل بين الـ users والكمبيوتر (L1, Objective of HCI)."],
  ["صح. المحاضرة بتقول إن نجاح أي computer system النهارده محتاج الـ design يبقى <b>user-centric ومركّز على الـ usability</b> وعلى user experience سلسة، والـ HCI هدفه systems سهلة وطبيعية و intuitive واستخدام efficient للـ interfaces (L1, UI vs UX vs HCI / Objective of HCI).","المحاضرة بتقول العكس: الـ systems الأولانية كانت بتتجاهل الـ usability، بس النهارده النجاح محتاج design مركّز على الـ usability، والـ HCI هدفه استخدام سهل و efficient (L1, UI vs UX vs HCI)."],
  ["أهداف الـ HCI عن إننا نسهّل تفاعل الـ user بـ systems سهلة وطبيعية و intuitive، والنجاح محتاج design مركّز على الـ <b>usability</b>. الـ Privacy والـ security بيظهروا بس كقاعدة للتعامل مع data الـ users في الـ research (L1, Objective of HCI; L4, Privacy and Security).","صح. أهداف الـ HCI إننا نسهّل تفاعل الـ user مع الكمبيوتر ونصمم systems سهلة وطبيعية و intuitive؛ والنجاح محتاج design يبقى user-centric و<b>مركّز على الـ usability</b> (L1, Objective of HCI / UI vs UX vs HCI)."],
  ["صح. في الـ hierarchy بتاع المجالات، الـ <b>Engineering + Psychology</b> بيكوّنوا الـ Human Factors Engineering، والـ HCI فرع منه، والـ HCI بيتفرع لـ UI و UX و interaction <b>design</b>. والـ HCI كمان بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم) وتكنولوجيا الكمبيوتر (L1, HCI in a broader hierarchy of fields).","المحاضرة حاطة الـ HCI تحت الـ Human Factors Engineering (Engineering + Psychology)، وبتقول إن الـ HCI بيتعامل مع design الـ interactive systems، وإنه بيدرس البني آدمين وتكنولوجيا الكمبيوتر الاتنين، فهو فعلاً واخد من التلاتة (L1, HCI in a broader hierarchy of fields / What is HCI?)."],
  ["الـ HCI هدفه العكس. من أهداف الـ HCI إنه يسهّل التفاعل عن طريق تصميم systems <b>سهلة وطبيعية و intuitive</b> بتوفر الوقت وبتقلل التكاليف (L1, Objective of HCI).","صح. المحاضرة بتقول إن الـ HCI لازم يسهّل تفاعل الـ user مع الكمبيوتر ويصمم systems <b>سهلة وطبيعية و intuitive</b> عشان توفر الوقت وتقلل التكاليف، مش systems معقدة (L1, Objective of HCI)."],
  ["واحد من أهداف الـ HCI المذكورة هو <b>designing web interfaces</b>، فالـ HCI واضح إنه بينطبق على الـ web design (L1, Objective of HCI).","صح. المحاضرة بتذكر <b>designing web interfaces</b> كهدف من أهداف الـ HCI، جنب تصميم الـ GUIs (L1, Objective of HCI). والـ guidelines بتاعة الـ forms والـ layout والـ navigation لصفحات الويب كمان جزء من الكورس (L8, L9)."],
  ["صح. ده تعريف المحاضرة: الـ <b>UX Design</b> (User Experience) بيغطي التجربة الكاملة بتاعة الـ user مع الـ product أو الـ website (L1, UI vs UX).","الجملة دي هي تعريف الـ slide نفسها للـ UX Design. الـ <b>UI Design</b> هو اللي بيتكلم عن الـ interactivity والـ look and feel بتاع شاشة الـ product أو صفحة الويب (L1, UI vs UX)."],
  ["صح. المحاضرة بتوري 3 أجزاء بيتقابلوا في الـ HCI: الـ <b>User</b> (قدراته العقلية والجسدية)، والـ <b>Computer / Machine</b> (أجهزة الـ input/output)، والـ <b>Interaction</b> (الـ interfaces والـ HCI patterns والـ design والـ usability evaluation) (L1, What is HCI).","الـ figure بتاع الـ HCI في المحاضرة فيه الـ 3 أجزاء دول بالظبط: الـ User، والـ Computer / Machine، والـ Interaction اللي بينهم (L1, What is HCI)."],
  ["الكورس بيطبّق الـ HCI على حاجات أكتر بكتير من الـ desktops: جهاز الـ touch-screen بتاع Qualcomm لسواقين التريلات (L2)، وأنشطة تصميم mobile app (L2, Activity)، والملاحظة إن الفرق بين الـ HCI والـ human factors engineering بيقل لأن <b>أجهزة أكتر وأكتر بقت computerized</b> (L1).","صح. الـ HCI بيغطي كل الأجهزة الـ computerized. المحاضرة بتقول إن <b>أجهزة أكتر وأكتر بقت computerized</b> (L1, HCI in a broader hierarchy)، والكورس بيستخدم أمثلة زي جهاز الـ touch-screen بتاع Qualcomm لسواقين التريلات و mobile app لمحبين الكورة (L2)."]
);
AR.hci.lectures["3"].quiz.push(
  ["الـ Journals مذكورة في المحاضرة كمصدر شائع للـ secondary research، اللي هو research عمله حد تاني (L3, Types of user research by Who).","الـ research papers المنشورة دي research عمله حد تاني، فهي secondary research، زي الكتب والـ journals اللي المحاضرة بتذكرها (L3, Types of user research by Who).","صح. الـ interview ده research إنت اللي بتعمله بنفسك، فهو <b>primary</b> research method، مش مصدر secondary (L3, Types of user research by Who).","الكتب مذكورة في المحاضرة كمصدر شائع للـ secondary research (L3, Types of user research by Who)."],
  ["صح. الـ Secondary research هو research عمله حد تاني، وبتلاقيه في مصادر زي الكتب والـ journals (L3, Types of user research by Who).","الـ Focus groups دي research إنت اللي بتعمله بنفسك، ومذكورة كـ <b>primary</b> research method (L3, Types of user research by Who).","الـ Usability studies مذكورة كـ <b>primary</b> research method، لأنك إنت اللي بتعملها بنفسك (L3, Types of user research by Who).","الـ Participant observation مذكورة كـ <b>primary</b> research method، لأنك إنت اللي بتجمع الـ data بنفسك (L3, Types of user research by Who)."],
  ["الـ Interviews دي research إنت اللي بتعمله بنفسك، فهي <b>primary</b> research method (L3, Types of user research by Who).","الـ case study ممكن يبقى أي نوع فيهم: لو إنت اللي عامله يبقى primary، ولو بتقرا واحد حد تاني نشره يبقى secondary. بس المصادر اللي المحاضرة فعلاً بتذكرها للـ secondary research هي الكتب والـ journals، فدي أحسن إجابة (L3, Types of user research by Who).","إنك تختبر prototype مع الـ users ده research إنت اللي بتعمله بنفسك، زي الـ usability studies المذكورة تحت الـ <b>primary</b> research (L3, Types of user research by Who).","صح. الـ Secondary research هو research عمله حد تاني، ومصادر المعلومات الشائعة بتاعته هي <b>الكتب والـ journals</b> (L3, Types of user research by Who)."],
  ["الـ Secondary research هو research عمله حد تاني وبيستخدم data موجودة، وممكن كمان تكون قديمة أوي؛ مش بيدّيك feedback لايف من الـ users بتوعك (L3, Types of user research by Who; L4, Primary vs secondary research).","الـ Secondary research <b>بيدعم</b> (backs up) نتايج الـ primary research؛ مش بيحل محلها (L3, Secondary research).","صح. في أول المشروع بيجمع statistics و facts و figures مفيدة عن الـ users، وغالباً رخيص وسريع، فبيوفّر مجهود ووقت ضخم (L3, Secondary research; L4, Primary vs secondary research).","الـ Secondary research بيجاوب على أسئلة عن قدرات الإنسان وحدوده (زي معلومات عن عمى الألوان) وعن مجموعات users عندها مشاكل مشتركة، مش عن التكنولوجيا بس (L4, Secondary research benefits)."],
  ["صح. الـ Secondary research هو research عمله حد تاني، ومصادره الشائعة هي <b>الكتب والـ journals</b> (L3, Types of user research by Who).","إنك تراقب الـ users بنفسك ده participant observation، وهو <b>primary</b> research method (L3, Types of user research by Who).","إنك تشتغل مع الـ users مباشرة (interviews، focus groups، usability studies) ده research إنت اللي بتعمله بنفسك، فهو <b>primary</b> research (L3, Types of user research by Who).","الـ Experiments اللي بتعملها بنفسك مذكورة كأمثلة للـ <b>primary</b> research، اللي إنت فيه اللي بتجمع الـ data (L4, Primary vs secondary research)."],
  ["الـ Interviews اللي بتعملها بنفسك دي <b>primary</b> research؛ الـ secondary research هو research عمله حد تاني (L3, Types of user research by Who).","المحاضرة عمرها ما قالت كده. الـ Secondary research بيجمع statistics و facts و figures وبيدعم نتايج الـ primary؛ مش بيلغي الحاجة لتحليل الـ data (L3, Secondary research).","صح. الـ Secondary research بيدوّر على <b>existing data</b>؛ \"if such information exists, it saves enormous effort and time\" (L3, Secondary research; L4, Primary vs secondary table).","إنك تجمع الـ data بنفسك ده primary research (\"research that you conduct yourself\")؛ الـ secondary data حد تاني اللي جمعها (L3, Types of user research by Who)."],
  ["الـ Foundational research بيحصل قبل ما أي حاجة تتصمم، فلسه مفيش interface تختبره؛ الاختبار بالـ prototypes تبع الـ tactical (design) research (L3, Types of user research by When).","الـ User research عن فهم الـ users ومشاكلهم، مش عن سرعة الـ coding (L3, Types of user research by When).","صح. الـ Foundational (strategic/generative) research له \"goal to <b>identify user problems and what should we build</b> to solve them\" (L3, Types of user research by When).","المحاضرة بتوصف الـ foundational research إنه كلام مع الـ users وتحديد الـ pain points بتاعتهم، مش دراسة الـ marketing بتاع المنافسين (L3, Types of user research by When)."],
  ["الـ Experiments متصنفة تحت الـ primary research (data إنت اللي بتجمعها بنفسك). الـ Secondary research بيستخدم data حد تاني جمعها (L4, Primary vs secondary table).","الـ Secondary research هو research حد تاني عمله من مصادر زي الكتب والـ journals، فهو مش original data (L3, Types of user research based on Who).","صح. الـ Secondary research بيستخدم شغل موجود عمله ناس تانيين، والمحاضرة بتقول إنه بيوفر مجهود ووقت و<b>بيدعم نتايج الـ primary research</b> (L3, Secondary Research).","دي مش فايدة، والمحاضرة مقالتهاش: نتايج الـ secondary research غالباً بيعملها researchers عندهم خبرة ومتخصصين، وصعب إنك تعمل زيها. العيب اللي المحاضرة ذكرته هو إن الـ data ممكن تبقى قديمة أوي أو مش specific كفاية (L3, Secondary Research; L4 table)."],
  ["الـ Usability studies والـ participant observations متذكورين كـ methods للـ <b>primary</b> research، وهو الـ research اللي إنت بتعمله بنفسك (L3, Types of user research based on Who).","صح. إنك تراقب الـ users في usability study ده research إنت بتعمله بنفسك، فهو <b>primary</b> research. المحاضرة بتذكر الـ usability studies والـ participant observations كـ primary methods؛ والـ secondary research هو research حد تاني عمله، زي الكتب والـ journals (L3, Types of user research based on Who)."],
  ["صح. الـ Secondary research بيستخدم <b>data موجودة</b> حد تاني جمعها (كتب و journals وحاجات شبههم). مهم في أول الـ project عشان تجمع statistics و facts و figures عن الـ users، وبيوفر مجهود ووقت كبير جداً (L3, Secondary research; L4, Primary vs secondary).","الـ Secondary research هو بالظبط استخدام data موجودة حد تاني عملها: statistics و facts و figures من كتب و journals و research organizations (L3, Secondary research). والعيب المعروف بتاعه إن الـ data الموجودة دي ممكن تبقى قديمة أوي، وده بيأكد إنها data من الماضي (L4, Primary vs secondary)."],
  ["الـ Interviews متذكورة كـ method للـ <b>primary</b> research، يعني research إنت بتعمله بنفسك، مش secondary research (L3, Types of user research based on Who).","صح. إنك تعمل interviews بنفسك ده <b>primary</b> research؛ والمحاضرة حاطة الـ interviews أول واحدة في الـ primary methods. الـ Secondary research هو research حد تاني عمله، زي الكتب والـ journals (L3, Types of user research based on Who)."],
  ["الـ Secondary research واحد من نوعين الـ user research حسب \"Who\" في الكورس، ومهم في أول الـ project عشان تجمع statistics و facts و figures عن الـ users (L3, Secondary research; L4, Secondary research benefits).","صح. الـ <b>Secondary research</b> (research حد تاني عمله، زي الكتب والـ journals) نوع من أنواع الـ user research في الكورس. بيوفر مجهود ووقت، وبيدعم نتايج الـ primary، وبيجاوب على أسئلة عن قدرات الإنسان وحدوده، زي عمى الألوان (L3, Secondary research; L4, Secondary research benefits)."]
);
AR.hci.lectures["4"].quiz.push(
  ["الـ focus group ده primary research، بس هو مناقشة جماعية بتدّي أوصاف وآراء؛ والـ research اللي مبني على الـ interviews بيبقى <b>qualitative</b> (L4, Types of user research by What).","إنك تقرا reports نشرها حد تاني ده <b>secondary</b> research، مش primary (L3, Types of user research by Who).","الـ Interviews دي primary research، بس الـ qualitative research \"often based on interviews\"، فده <b>qualitative</b> مش quantitative (L4, Types of user research by What).","صح. الـ Quantitative research فيه data of numeric nature، زي الـ measures والـ counts؛ ولما تجمعها بنفسك يبقى primary research (L4, Types of user research by What)."],
  ["الكورس بيقول إن الـ secondary data ممكن تكون قديمة أوي و/أو مش specific كفاية، أما في الـ primary research فإنت اللي بتتحكم في الـ quality (L4, Primary vs secondary research).","المحاضرة بتقارن بينهم: الـ primary إنت اللي بتجمعه، والـ secondary حد تاني جمعه، ولكل واحد مميزات وعيوب مختلفة (L4, Primary vs secondary research).","صح. الـ Primary data إنت اللي بتجمعها (surveys، interviews، observations، experiments)، أما الـ secondary research فمعناه إنك بتدوّر على <b>existing data</b> حد تاني جمعها (L4, Primary vs secondary research).","العكس: الـ primary research غالباً بيكلّف أكتر وبياخد وقت أطول، والـ secondary research غالباً رخيص وسريع (L4, Primary vs secondary research)."],
  ["صح. الـ Surveys طريقة قوية تجمع بيها ردود سريعة في وقت قصير من <b>عدد كبير من الـ users</b> (نظرة عامة واسعة) (L4, Surveys).","الإجابات على الأسئلة ممكن يبقى فيها recall bias و reporting bias، يعني الناس تدّي إجابات مثالية أكتر من الواقع (L6, Challenges of data gathered by asking questions).","الكورس بيوصف الـ secondary research إنه هو اللي \"usually cheap and quick\"؛ والـ survey ده primary research، اللي غالباً بيكلّف أكتر وبياخد وقت أطول (L4, Primary vs secondary research).","الـ methods مش بدايل لبعض: استخدم combination منهم بترتيب مناسب، ونتايج الـ survey بتساعد تخطط للأنشطة اللي بعده زي الـ interviews (L4, General tips; Surveys)."],
  ["مش مصطلح الكورس. المحاضرة كاتبة الـ PII كـ Personally Identifiable Information: تفاصيل معينة ممكن تتستخدم عشان تعرف الـ user مين (L4, Privacy and security).","مش مصطلح الكورس. الـ PII هي Personally Identifiable Information، زي الأسامي وعنوان البيت والـ email address ورقم التليفون (L4, Privacy and security).","قريب بس مش المصطلح بالظبط: هي <b>Personally Identifiable</b> Information، يعني تفاصيل <b>ممكن</b> تتستخدم عشان تعرف الـ user مين (L4, Privacy and security).","صح. الـ PII هي <b>Personally Identifiable Information</b>: تفاصيل معينة ممكن تتستخدم عشان تعرف الـ user مين، زي الأسامي وعنوان البيت والـ email address ورقم التليفون (L4, Privacy and security)."],
  ["صح. رقم التليفون وعنوان البيت والـ email address كلهم في لستة الـ PII اللي في المحاضرة: تفاصيل معينة ممكن تتستخدم عشان تعرف الـ user مين (L4, Privacy and security).","رقم التليفون PII، بس مش هو الوحيد هنا: عنوان البيت والـ email address كمان في لستة الـ PII، فالإجابة الكاملة \"All of the following\" (L4, Privacy and security).","عنوان البيت PII، بس رقم التليفون والـ email address كمان PII، فالاختيار ده لوحده ناقص (L4, Privacy and security).","الـ email address ده PII، بس كمان رقم التليفون وعنوان البيت، فالإجابة الكاملة \"All of the following\" (L4, Privacy and security)."],
  ["صح. الميزة الأساسية للـ secondary research إنه <b>غالباً رخيص وسريع</b>؛ لو المعلومة موجودة، بيوفّر مجهود ووقت ضخم (L4, Primary vs secondary research; L3, Secondary research).","إنه يكون specific لاحتياجاتك دي ميزة الـ <b>primary</b> research؛ الـ secondary data ممكن تكون مش specific كفاية (L4, Primary vs secondary research).","الكورس بيقول إن الـ secondary data ممكن تكون قديمة أوي و/أو مش specific كفاية، أما في الـ primary research فإنت اللي بتتحكم في الـ quality (L4, Primary vs secondary research).","الـ Secondary research بيدعم (backs up) نتايج الـ primary research؛ مش بيحل محلها (L3, Secondary research). والـ methods المفروض تتجمع مع بعض، مش تتستخدم كبدايل (L4, General tips)."],
  ["مش مصطلح الكورس. الـ S معناها <b>Sensitive</b>: data لو ضاعت أو اتسرقت ممكن تسبب ضرر مادي أو إحراج أو تمييز (L4, Privacy and security).","مش مصطلح الكورس. الـ SPII عن الـ data الشخصية بتاعة الـ users زي رقم الـ social security ورقم الـ passport، مش system infrastructure (L4, Privacy and security).","مش مصطلح الكورس. الـ SPII هي Sensitive Personally Identifiable Information، نوع من data الـ user، مش index (L4, Privacy and security).","صح. الـ SPII هي <b>Sensitive Personally Identifiable Information</b>: data لو ضاعت أو اتكشفت (compromised) أو اتسرقت، ممكن تسبب للـ users ضرر مادي أو إحراج أو تمييز (L4, Privacy and security)."],
  ["صح. الـ Surveys غالباً بتتعمل online وبتجمع ردود سريعة في وقت قصير من <b>عدد كبير من الـ users</b> (نظرة عامة واسعة) (L4, Surveys).","الـ data بتاعة الـ survey بتتجمع عشان تتستخدم: الكورس بيقول اسأل بس أقل عدد من الأسئلة يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها (L4, Tips for a good survey design).","الـ methods مش بدايل لبعض؛ استخدم combination. والـ Surveys غالباً بتساعد تخطط لأنشطة qualitative بعدها زي الـ interviews (L4, General tips; Surveys).","الكورس بيقول العكس عن طريقة إنك تسأل أسئلة: الإجابات ممكن يبقى فيها recall bias و reporting bias، والحل إنك تجمعها مع الـ usability studies والـ observation (L6, Challenges of data gathered by asking questions)."],
  ["صح. الـ SPII هي data لو ضاعت أو اتكشفت (compromised) أو اتسرقت ممكن تسبب للـ users <b>ضرر مادي أو إحراج أو تمييز</b>، فمحتاجة حماية زيادة عن الـ PII العادية (L4, Privacy and security).","الكورس بيعرّف الـ SPII بالضرر اللي ممكن تسببه لو ضاعت أو اتسرقت، مش بأي استخدام في الـ marketing (L4, Privacy and security).","الـ SPII هي data شخصية: رقم الـ social security، والـ driver's license، وأرقام الـ passport، وأرقام الحسابات المالية، وتاريخ الميلاد (L4, Privacy and security).","العكس: ضياع الـ SPII ممكن يسبب ضرر مادي أو إحراج أو تمييز، والكورس بيقول متربطش الـ data اللي جمعتها بالـ PII والـ SPII (L4, Privacy and security)."],
  ["توفير الوقت والتكلفة ده ميزة الـ <b>secondary</b> research (غالباً رخيص وسريع)؛ الـ primary research غالباً بيكلّف أكتر وبياخد وقت أطول (L4, Primary vs secondary research).","صح. الـ Primary research إنت اللي بتعمله مع الـ users بتوعك (interviews، surveys، observations)، فهو <b>specific لاحتياجاتك وإنت اللي بتتحكم في الـ quality</b> (L4, Primary vs secondary research).","مفيش حاجة في الكورس بتقول كده؛ الـ secondary research متنصوح بيه، خصوصاً في أول المشروع (L3, Secondary research).","الكورس بيقول إن الـ secondary research قيّم: غالباً بيعمله researchers عندهم خبرة في organizations موثوقة، وبيدعم نتايج الـ primary. نقطة ضعفه إن الـ data ممكن تكون قديمة أوي أو مش specific كفاية (L3, Secondary research; L4, Primary vs secondary research)."],
  ["الكورس مقالش إن الـ primary research دايماً biased؛ بالعكس، من مميزاته إنك إنت اللي بتتحكم في الـ quality (L4, Primary vs secondary research).","العكس: من أهم مميزات الـ primary research إنه <b>specific لاحتياجاتك</b> (L4, Primary vs secondary research).","صح. العيب الأساسي للـ primary research إنه <b>غالباً بيكلّف أكتر وبياخد وقت أطول</b> (L4, Primary vs secondary research).","إن الـ data ممكن تكون قديمة أوي ده عيب الـ <b>secondary</b> research، مش الـ primary (L4, Primary vs secondary research)."],
  ["الحسابات بتشتغل على أرقام، وده <b>quantitative</b> research (data of numeric nature، measures و counts) (L4, Types of user research by What).","صح. الـ Qualitative research \"focuses on <b>observations</b> about why and how things happen\" وهو \"often based on <b>interviews</b>\" (L4, Types of user research by What).","الـ usage data اللي بتتسجل (logged)، زي الـ counts اللي Microsoft جمعتها عن طريق الـ CEIP، دي أرقام، فهي quantitative مش qualitative (L4, Types of user research by What; L2, CEIP).","الـ Numeric ratings دي data of numeric nature، وده quantitative research (L4, Types of user research by What)."],
  ["الـ Observations عن ليه وإزاي الحاجات بتحصل دي بتوصف الـ <b>qualitative</b> research (L4, Types of user research by What).","صح. الـ Quantitative research \"involves <b>data of numeric nature</b>. Examples: measures and counts\" (L4, Types of user research by What).","نص الـ interviews ده qualitative data؛ الـ qualitative research \"often based on interviews\" (L4, Types of user research by What).","الـ User stories وصفية مش أرقام، والمحاضرة بتعرّف الـ quantitative data إنها measures و counts (L4, Types of user research by What)."],
  ["الـ Measures والـ counts هما أمثلة المحاضرة للـ <b>quantitative</b> research (L4, Types of user research by What).","الـ Automated analytics بتطلّع data أرقام، وده quantitative research مش qualitative (L4, Types of user research by What).","الـ data الأرقام بتوصف الـ quantitative research؛ الـ qualitative research عن ليه وإزاي الحاجات بتحصل (L4, Types of user research by What).","صح. الـ Qualitative research \"focuses on <b>observations about why and how things happen</b>\"، وغالباً مبني على الـ interviews (L4, Types of user research by What)."],
  ["صح. من الـ general tips: \"Testing and iteration is your way to <b>improve any technique</b>\" (L4, General tips for research methods).","الـ User research عن إنك تشرك الـ users وتشتغل معاهم بدل ما تخمّن؛ والـ testing والـ iteration مش بيقللوا ده (L3, User-centered design; L4, General tips).","الـ tips بتقول العكس: الـ methods مش بدايل لبعض، فـ \"use a combination of methods in a relevant order\" (L4, General tips for research methods).","الـ Planning ahead \"does not mean to be strict\"؛ الـ flexibility مطلوبة و\"the script is not bible\" (L4, General tips for research methods)."],
  ["المحاضرة بتقول العكس: الـ methods مش بدايل لبعض، فالمفروض تستخدم combination منهم (L4, General tips for research methods).","صح. المحاضرة بتقول إن الـ methods المختلفة مش بدايل لبعض في one-step process: <b>use a combination of methods in a relevant order</b> (L4, General tips for research methods).","النصيحة بتقول إن الـ combination لازم يكون بـ <b>relevant order</b>، وإن الـ research لازم يتخطط له من بدري، مش عشوائي (L4, General tips for research methods).","ده بالظبط اللي الـ slide بترفضه: \"Different methods are not alternatives in a one step process\" (L4, General tips for research methods)."],
  ["صح. المحاضرة بتقول خلّي الـ survey صغير على قد ما تقدر لأن <b>الأسئلة الكتير بتأثر على الـ response rate وعلى الـ reliability بتاعة الـ data</b>؛ اسأل أقل عدد من الأسئلة محتاجه (L4, Tips for a good survey design).","الـ survey القصير أسهل في إنك تكمّله، مش أصعب. الفكرة من إنه يفضل صغير إنك تحافظ على الـ response rate (L4, Tips for a good survey design).","العكس: النصيحة إنك تسأل أقل عدد من الأسئلة يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها (L4, Tips for a good survey design).","إنه يفضل قصير الهدف منه إجابات واضحة و reliable. ولخبطة اللي بيجاوبوا ضد principles الـ L5 اللي هي Be Clear و Be Concise (L5, Be Clear / Be Concise)."],
  ["المحاضرة بتقول العكس: الـ planning ahead مش معناه إنك تبقى strict، لأن <b>\"script is not a bible\"</b> (L4, General tips for research methods).","المحاضرة بتذكر الاتنين: اعمل plan من بدري، وكمان \"testing and iteration is your way to improve any technique\". الـ Planning مش بيحل محل الـ iteration (L4, General tips for research methods).","صح. \"Planning ahead does not mean to be strict, <b>flexibility is required during the activity</b> (script is not bible)\" (L4, General tips for research methods).","غلط: الـ slide بتقول إن الـ flexibility مطلوبة أثناء الـ activity، فإنت بتتأقلم حسب الحاجة (L4, General tips for research methods)."],
  ["صح. جدول الـ primary vs secondary بيذكر إن الميزة الأساسية للـ secondary research إنه <b>غالباً رخيص وسريع</b> (L4, The difference between Primary and Secondary Research).","الـ Secondary research بيستخدم data موجودة حد تاني جمعها (\"looking for existing data\")، فمش بيدّي data جديدة (L4, Primary vs secondary table).","التكلفة دي عيب الـ primary research (\"usually costs more and takes longer\"). الـ Secondary research غالباً رخيص (L4, Primary vs secondary table).","إنه ياخد وقت أطول ده العيب الأساسي للـ primary research. الـ Secondary research سريع وبيوفّر مجهود ووقت ضخم (L4 table; L3, Secondary Research)."],
  ["صح. في جدول المقارنة، الـ primary data <b>إنت اللي بتجمعها</b> (surveys، focus groups، interviews، observations، experiments)، أما الـ secondary research معناه <b>إنك تدور على data موجودة</b> حد تاني جمعها (L4, Primary vs secondary table).","الجملة مطابقة للمحاضرة: الـ primary research هو research إنت بتعمله بنفسك، والـ secondary research هو research حد تاني عمله، وبيستخدم data موجودة (L3, Types of user research based on Who; L4 table)."],
  ["صح. في جدول الـ primary vs secondary، العيب الأساسي للـ primary research إنه <b>غالباً بيكلّف أكتر وبياخد وقت أطول</b>، أما الـ secondary research فغالباً رخيص وسريع (L4, Primary vs secondary research).","جدول المحاضرة بيقول العكس: الـ primary research غالباً بيكلّف أكتر وبياخد وقت أطول، والـ secondary research <b>غالباً رخيص وسريع</b> (L4, Primary vs secondary research)."],
  ["صح. جدول الـ primary vs secondary بيقول إن الفايدة الأساسية للـ secondary research إنه <b>غالباً رخيص وسريع</b>، والعيب الأساسي للـ primary research إنه غالباً بيكلّف أكتر وبياخد وقت أطول (L4, Primary vs secondary research).","الجدول بيقول إن الـ secondary research غالباً رخيص وسريع، والـ primary research <b>غالباً بيكلّف أكتر وبياخد وقت أطول</b> (L4, Primary vs secondary research). والـ L3 كمان بتقول إن معلومات الـ secondary الموجودة بتوفر مجهود ووقت كبير جداً."]
);
AR.hci.lectures["5"].quiz.push(
  ["الكورس بيقول العكس: خلّي الـ survey صغير على قد ما تقدر، لأن الأسئلة الكتير بتأثر على الـ response rate وعلى الـ reliability بتاعة الـ data (L4, Tips for a good survey design).","صح. أسئلة الـ survey الكويسة لازم تكون <b>Be Clear</b> و<b>Be Concise</b>، وبلغة بسيطة زي \"How clean was the car?\" (L5, How to ask good survey questions).","الكورس بيقول اسأل أقل عدد من الأسئلة يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها، فالأسئلة اللي ملهاش علاقة لازم تتشال (L4, Tips for a good survey design).","ده بيكسر الـ <b>Be Concise</b>: الأسئلة لازم تكون بلغة بسيطة، مش كلام كتير أو technical (L5, Be Concise). والـ survey بيجمع آراء الـ users، مش بيمتحنهم."],
  ["الكورس عايز الـ surveys تبقى سريعة في الإجابة: خليها صغيرة على قد ما تقدر، والـ survey المتصمم كويس مش المفروض ياخد وقت طويل (L4, Tips for a good survey design).","صح. تحت <b>Be Usable</b> الكورس بيقول \"Preview the survey yourself\"، وبيطلب feedback من المشاركين على الـ survey، فالمشاكل اللي ضد قواعد الـ Be Clear والـ Be Specific بتتمسك قبل ما الـ survey ينزل (L5, Be Usable; L4, Tips for a good survey design).","الـ Surveys معمولة عشان تجمع ردود سريعة من عدد كبير من الـ users؛ واختبار الـ survey مش بيغيّر عدد الردود اللي محتاجها (L4, Surveys).","الكورس بينصح بأسئلة الاختيارات زي الـ ranges ومستويات الموافقة والسماح بأكتر من اختيار (L5, Be Expressive)، فالاختبار مش هدفه إنه يشيلها."],
  ["صح. اتنين من الـ 6 principles بتوع أسئلة الـ survey الكويسة هما <b>Be Clear</b> و<b>Be Unbiased</b> (ابعد عن الـ leading والـ loaded questions)، عشان الإجابات تعكس رأي الـ user الحقيقي (L5, How to ask good survey questions).","ده بيكسر الـ <b>Be Clear</b> والـ <b>Be Concise</b>: الأسئلة لازم تكون بلغة بسيطة، ولو مش متأكد بتزوّد تفاصيل زيادة عشان الـ users يفهموا (L5, Be Clear; Be Concise).","الكورس مقالش كده. تحت <b>Be Usable</b> بيقول نبّه الـ users على الأسئلة اللي متجاوبتش، ونصايح الـ survey بتاعته عن إن الـ survey يفضل صغير و unbiased (L5, Be Usable; L4, Tips for a good survey design).","الكورس بينصح بالـ ranges ومستويات التكرار أو الموافقة والـ multiple selections (L5, Be Expressive). وبيقول بس إن الأسئلة اللي هي open-ended بطبيعتها تفضل open."],
  ["صح. اتنين من الـ 6 principles بتوع أسئلة الـ survey الكويسة هما <b>Be Clear</b> و<b>Be Concise</b> (لغة بسيطة، زي \"How clean was the car?\") (L5, How to ask good survey questions).","ده بيكسر الـ \"Be Clear\"، اللي بيقولك اعمل labels للـ scales، وابعد عن الـ ranges اللي بتتداخل، وزوّد تفاصيل لو مش متأكد (L5, Be Clear).","ده <b>double-barrel</b> question، والـ \"Be Specific\" بيقولك ابعد عنه وقسّمه لأسئلة منفصلة (L5, Be Specific).","ده بيكسر الـ \"Be Concise\": \"What was the overall level of cleanliness that you observed within the car?\" لازم تبقى \"How clean was the car?\" (L5, Be Concise)."],
  ["الـ \"Order your questions logically\" مذكورة تحت <b>Be Usable</b>، وده principle هدفه يخلي الـ survey أسهل في إنك تكمّله، مش إنه يبعّد الناس عنه (L5, Be Usable).","الترتيب المنطقي ده guideline من الـ \"Be Usable\" لأسئلة الـ survey الكويسة؛ بيشيل اللخبطة مش بيزوّدها (L5, Be Usable).","صح. الـ \"Order your questions logically\" واحدة من نصايح الـ <b>Be Usable</b> (مع الـ progress bar، وأطوال الصفحات الثابتة، والتنبيه على الأسئلة اللي متجاوبتش، والـ previewing)، ودول بيخلّوا الـ survey سهل على اللي بيجاوبوا إنهم يكمّلوه (L5, Be Usable).","الـ principles بتاعة الـ survey في المحاضرة هدفها إجابات واضحة و reliable؛ والترتيب المنطقي ده guideline من الـ \"Be Usable\"، مش حاجة بتضر الدقة (L5, Be Usable)."],
  ["صح. تحت <b>Be Unbiased</b> المحاضرة بتقول ابعد عن الـ leading questions (زي \"Did our brand-new AI-based interface generate better recommendations?\") والـ loaded questions (زي \"wasted\") (L5, Be Unbiased).","الثبات (consistency) متنصوح بيه مش حاجة نبعد عنها: الـ Be Usable بيقول خلّي أطوال الصفحات ثابتة، والـ exercise بتاع L5 بينتقد الـ scales اللي عدد اختياراتها واتجاهها بيتغير من سؤال للتاني (L5, Be Usable / Exercise).","ترتيب الأسئلة بشكل منطقي واحد من نصايح الـ Be Usable، فالمفروض يتعمل مش نبعد عنه (L5, Be Usable).","الصياغة المحايدة (neutral wording) هي الحل اللي المحاضرة بتديه للـ loaded والـ leading questions، زي \"spent\" بدل \"wasted\" (L5, Be Unbiased)."],
  ["المحاضرة بتعتبر أسئلة الـ yes/no مشكلة: تحت <b>Be Expressive</b> بتقول استخدم ranges بدل yes/no، لأن إجابة yes/no بتدي معلومات قليلة (L5, Be Expressive).","صح. أسئلة الـ yes/no بتدي معلومات قليلة. مبدأ الـ <b>Be Expressive</b> بيقول استخدم ranges بدالها، مثلاً بدل \"Do you use social media?\" تقول \"In the past seven days, how much time have you spent on social media?\" (L5, Be Expressive)."],
  ["الـ Qualitative research بيركّز على ملاحظات عن <b>ليه وإزاي</b> الحاجات بتحصل (L4, Types of user research based on What). إجابة الـ yes/no مبتشرحش لا ده ولا ده، والمحاضرة بتقول استبدل أسئلة الـ yes/no بـ ranges (L5, Be Expressive).","صح. الـ Qualitative data عن <b>ليه وإزاي</b> الحاجات بتحصل، وغالباً بتيجي من interviews (L4). أسئلة الـ yes/no بتدي معلومات قليلة، فالمحاضرة بتقول استخدم ranges بدالها، وسيب الأسئلة الـ open-ended زي \"Why did you choose our service?\" مفتوحة (L5, Be Expressive; Be Unbiased)."],
  ["الكورس مش بيطلب أسئلة yes/no خالص. تحت <b>Be Expressive</b> بيقول استخدم ranges بدل yes/no، وبيدي \"Have you listened to an audiobook this year?\" كمثال لسؤال yes/no ضعيف تستبدله بـ ranges (L5, Be Expressive; Exercise).","صح. المحاضرة عمرها ما قالت إن الـ surveys لازم دايماً تخلط معاها أسئلة yes/no؛ هي بتقولك <b>استبدل أسئلة الـ yes/no بـ ranges</b> (Be Expressive) وخلي الـ survey صغير على قد ما تقدر، واسأل بس اللي محتاجه (L5, Be Expressive; L4, Tips for a good survey design)."]
);
AR.hci.lectures["7"].quiz.push(
  ["ده الفهم الشائع بس اللي مش مفيد واللي المحاضرة بترفضه: \"a quick / small version of the real thing\" (L7, Prototyping).","صح. بالنسبة للـ designers، الـ prototyping هو \"rapidly creating an approximation of a design so that you can quickly <b>get feedback</b>\"، وKlemmer بيقول إن الـ prototype عن الـ <b>feedback والـ iteration</b> (L7, Prototyping).","الـ Prototypes هي الطريقة اللي بتاخد بيها feedback من الـ users، مش بديل عنه؛ الـ tactical research \"requires user feedback through use of prototype\" (L3, Types of user research; L7, Prototyping).","المحاضرة بتوصف الـ design كـ iterative process فيه brainstorming وإنك تجمع أفكار وتسيب أفكار وتراجعها وتحسّنها، فالـ prototype عشان تعمل iteration، مش عشان تقفل الـ design مرة واحدة (L7, Prototyping)."],
  ["ده عكس النصيحة: إنك تتحبس في الـ interface الحالي غلطة شائعة جداً، فالمفروض تبعد نفسك عن الحلول الموجودة (L7, Design alternatives).","صح. نصيحة المحاضرة هي \"try to <b>distance yourself from the existing solutions</b>, at least initially during the brainstorming sessions\" (L7, Design alternatives).","إنك تثبت على فكرة design واحدة بدري أوي دي تاني أكبر غلطة عند Joyner؛ الـ brainstorming هدفه إنه يطلّع أفكار كتير (L7, Biggest mistakes; L8, Brainstorming).","الـ design process معتمد على الـ feedback: الـ prototypes موجودة عشان تاخد feedback وتعمل iteration، وفي الـ team sessions الناس بتشارك أفكار وتزوّد عليها (L7, Prototyping; L8, Brainstorming). مفيش حاجة بتقول ابعد عن الـ feedback."],
  ["صح. حسب Joyner، <b>أكبر غلطة</b> إنك تنط على طول لتصميم interface من غير ما تفهم الـ users أو تفهم الـ task (L7, Biggest mistakes a designer can make).","دي بالظبط أكبر غلطة عند Joyner. إنك تثبت على فكرة design واحدة بدري أوي دي <b>تاني</b> أكبر غلطة عنده، مش الأكبر (L7, Biggest mistakes a designer can make)."],
  ["Joyner بيسمي ده <b>تاني أكبر غلطة</b>: إنك تثبت على فكرة design واحدة أو نوع واحد من أفكار الـ design بدري أوي (L7, Biggest mistakes a designer can make).","صح. إنك تثبت على فكرة design واحدة بدري أوي دي <b>تاني أكبر غلطة</b> عند Joyner. بدل كده، استكشف مجموعة أوسع من الـ design alternatives، على قد ما تقدر (L7, Biggest mistakes; Design alternatives)."],
  ["صح. المحاضرة بتقول: عشان توصل لـ design كويس، <b>استكشف مجموعة أوسع من الـ design alternatives الممكنة</b> (L7, Design alternatives).","الـ slide بتقول العكس: عشان توصل لـ design كويس لازم تستكشف مجموعة أوسع من الـ design alternatives الممكنة، على قد ما تقدر (L7, Design alternatives)."],
  ["صح. الـ slide بتعتبر إنك تركّز جامد على alternative واحد من الأول خالص <b>غلطة كبيرة</b>، وبتقول إنها منتشرة جداً لما تحسّن system موجود، لأنك بتبقى محبوس في الـ interface الحالي بتاعه (L7, Design alternatives).","المحاضرة بتسمي التركيز الجامد على alternative واحد من الأول غلطة كبيرة، وبتقول إن الغلطة دي <b>منتشرة جداً</b> لما تحسّن system موجود (L7, Design alternatives)."],
  ["صح. نصيحة المحاضرة إنك \"try to <b>distance yourself from the existing solutions</b>, at least initially during the brainstorming sessions\"، عشان متبقاش محبوس في الـ interface الحالي (L7, Design alternatives).","الـ slide بتقول ده كنصيحة: ابعد نفسك عن الحلول الموجودة، على الأقل أثناء الـ brainstorming، لأن إنك تبقى محبوس في الـ interface الحالي غلطة منتشرة جداً (L7, Design alternatives)."],
  ["الـ slide بتقول العكس: النجاح في إن يبقى عندك كذا alternative <b>مهم في المراحل الأولى</b> من الـ design (L7, Design alternatives).","صح. المحاضرة بتقول إن النجاح في إن يبقى عندك كذا alternative <b>مهم في المراحل الأولى</b> من الـ design، ولازم يبقى عندك على قد ما تقدر منهم (L7, Design alternatives)."],
  ["صح. ممكن تختار alternative واحد وتعمله finalize، بس المحاضرة بتقول إن <b>الأشهر</b> إن الـ final design يبقى combination من الـ alternatives اللي استكشفتها قبل كده (L7, Design alternatives).","الـ slide بتقول إن اختيار alternative واحد ممكن، بس الأشهر إن الـ final design يبقى <b>combination</b> من الـ alternatives اللي اتستكشفت قبل كده (L7, Design alternatives)."],
  ["مثال المحاضرة عكس كده: اتعمل <b>أكتر من 100 prototype</b> لأول mouse من Microsoft (L7, Example).","صح. أول mouse من Microsoft كان ليه <b>أكتر من 100 prototype</b>، وده مثال المحاضرة على إنك تستكشف alternatives على قد ما تقدر (L7, Example)."],
  ["المحاضرة بتقول إن أغلب الناس فاكرين الـ prototype نسخة سريعة أو صغيرة من الحاجة الحقيقية، بس <b>ده مش فهم مفيد</b>. بالنسبة للـ designers، هو إنك تعمل بسرعة approximation للـ design عشان تاخد feedback بسرعة (L7, Prototyping).","صح. الـ slide بتقول إن نظرة \"quick / small version of the real thing\" <b>مش فهم مفيد</b>. بالنسبة للـ designers، الـ prototyping هو \"rapidly creating an approximation of a design so that you can quickly get feedback\" (L7, Prototyping)."],
  ["صح. Klemmer: \"prototype is not about the artifact, it's about <b>feedback and iteration</b>\". الـ prototype الكويس هو اللي بيخليك تاخد feedback مفيد وتعمل iteration على الـ design بتاعك (L7, Prototyping).","المحاضرة بتقول إن قيمة الـ prototype هي بالظبط الـ feedback والـ iteration (Klemmer)، وبتعرّف الـ prototyping بإنه إنك تاخد feedback بسرعة (L7, Prototyping)."],
  ["الـ slide بتقول إن الـ prototype الكويس هو اللي بيخليك تاخد feedback مفيد وتعمل iteration، <b>\"not a one that resembles your final product\"</b> (L7, Prototyping).","صح. الـ prototype الكويس هو اللي بيخليك تاخد feedback مفيد وتعمل iteration على الـ design بتاعك، <b>مش اللي شبه الـ final product</b> (L7, Prototyping)."],
  ["صح. الـ prototype الكويس بيخليك تاخد <b>feedback مفيد</b>، والـ slide بتعتبر الـ useful feedback هو نفسه الـ <b>constructive feedback</b> (L7, Prototyping).","المحاضرة بتقول إن هدف الـ prototype إنك تاخد feedback مفيد و constructive؛ والـ prototypes اللي مبتديش أي معرفة جديدة بتضيّع الـ design process (L7, Prototyping)."],
  ["صح. Klemmer بيقول <b>\"prototypes are questions, ask a lot of them\"</b> (L7, Prototyping).","دي نصيحة Klemmer نفسه: الـ prototypes أسئلة، ولازم تسأل كتير منها (L7, Prototyping)."]
);
AR.hci.lectures["8"].quiz.push(
  ["الـ Wireframes مش فن: هي من غير ألوان ولا font styles عن قصد عشان التركيز يفضل على الـ structure (L8, Wireframes).","صح. \"A good wireframe is not about artistic drawing, it is all about <b>organizing and communicating information clearly</b> to colleagues\" (L8, Wireframes are not art).","الـ wireframe بيحدد الـ structure الأساسي للصفحة <b>قبل</b> ما الحاجات الـ visual زي الألوان تتضاف، وهو من غير ألوان عن قصد (L8, Wireframes).","الـ Wireframes بتوجّه الـ stakeholders والـ users إنهم يدّوا feedback على المستوى الصح، فهي بتجيب feedback مش بتحل محله (L8, Wireframes are not art)."],
  ["الـ Tools زي Figma و Adobe XD و Sketch و Balsamiq و Pencil بييجوا بعدين: \"make use of tools after initial iterations of paper wireframes\" (L8, Wireframing process).","صح. الـ process بيبدأ \"with <b>pen and paper</b>\"، وإنت بترسم نسخ بديلة (alternative versions) لكل شاشة (5 على الأقل) (L8, Wireframing process).","أول هدف هو \"reaching a design, not showing a design\"؛ إنت بتعمل iteration على كذا نسخة، فمفيش حاجة final في الأول (L8, Wireframing process).","الـ Feedback بييجي بعد ما يبقى عندك sketches: إنت \"go through some iterations with feedback if available\" (L8, Wireframing process). الـ Testing مش أول خطوة في الـ wireframing."],
  ["الـ Word ده word processor ومش موجود في لستة أدوات الـ wireframing اللي في المحاضرة (Figma, Adobe XD, Sketch, Balsamiq, Pencil) (L8, Wireframing process).","الـ Photoshop مش في لستة المحاضرة؛ أداة Adobe المذكورة للـ wireframing هي <b>Adobe XD</b> (L8, Wireframing process).","صح. <b>Figma</b> أول واحدة في لستة المحاضرة لأدوات الـ wireframing الشائعة: Figma, Adobe XD, Sketch, Balsamiq, Pencil (L8, Wireframing process).","الـ PowerPoint ده برنامج presentations ومش من أدوات الـ wireframing اللي المحاضرة بتذكرها (L8, Wireframing process)."],
  ["صح. الـ guidelines بتاعة الـ forms والـ navigation كلها بتدي الـ users feedback واضح على اللي عملوه: الـ form لما يتبعت بنجاح بيتأكد بـ <b>confirmation page</b>، ورسايل الـ error بتظهر جنب الـ field اللي حصل فيه الغلط، وأي حاجة بتتداس عليها بيبان عليها تغيير واضح لما تعدي عليها بالماوس (hover) (L8, Form design guidelines; L9, Navigation).","الـ guidelines بتقول العكس: أكّد الـ submission الناجح بـ confirmation page، واعرض الـ errors جنب الـ field، وخلي فيه تغيير واضح على الـ hover، عشان الـ users يشوفوا نتيجة اللي عملوه على طول (L8, Form design guidelines; L9, Navigation)."],
  ["المحاضرة بتقول إن <b>الـ wireframes مش فن</b>: الـ wireframe الكويس مش عن الرسم الفني، هو عن تنظيم المعلومات وتوصيلها بوضوح. ومقصود إن مفيهوش ألوان ولا font styles، عشان التركيز يبقى على الـ structure (L8, Wireframes are not art).","صح. الـ wireframe الكويس <b>مش عن الرسم الفني</b>؛ هو كله عن تنظيم المعلومات وتوصيلها بوضوح للزملاء، ومقصود إنه يسيب الألوان والـ font styles عشان يركّز على الـ structure (L8, Wireframes; Wireframes are not art)."],
  ["صح. في مرحلة الـ pen-and-paper، أول هدف هو <b>إنك توصل لـ design، مش إنك تعرض design</b>، والهدف التاني إنك تنقل الفكرة من دماغك للورق بأسرع ما يمكن، فمفيش تركيز على تفاصيل زي الخطوط المستقيمة والـ spacing والـ alignment (L8, Wireframing process).","الـ slide بتقول ده بالظبط لمرحلة الـ pen-and-paper: توصل لـ design (مش تعرضه)، وتحط الفكرة على الورق بسرعة، ومتركزش على الخطوط المستقيمة والـ spacing والـ alignment في المرحلة دي (L8, Wireframing process)."],
  ["صح. اتنين من أغراض الـ wireframe المذكورة هما إنه يوجّه الـ feedback للمستوى الصح (<b>الـ structure والـ function</b>، مش الألوان والـ typography) و<b>إنه يمسك المشاكل بدري</b> اللي جاية من element متنسي أو مش متنظم (L8, Wireframes are not art).","الـ slide بتذكر النقطتين كأغراض للـ wireframe: feedback عن الـ structure والـ function، وإنه يمسك بدري المشاكل اللي سببها elements متنسية أو مش متنظمة (L8, Wireframes are not art)."],
  ["المحاضرة بتقول ارسم <b>5 versions على الأقل</b> لكل شاشة على الورق وعدّي على كام iteration قبل ما تنقل لـ tools زي Figma أو Balsamiq (L8, Wireframing process).","صح. لكل شاشة بترسم wireframe versions بديلة، <b>5 على الأقل</b>، وبتعدّي على iterations؛ والـ tools بتستخدمها بس بعد الـ iterations الأولانية بتاعة الـ paper wireframes (L8, Wireframing process)."],
  ["صح. واحد من الـ wireframing industry standards هو الـ <b>proper annotation</b> بالكلام عشان الـ wireframe يبقى واضح، والـ wireframes أصلاً عن توصيل المعلومات بوضوح للزملاء والـ stakeholders (L8, Wireframing industry standards).","الـ Proper annotation متذكور كـ wireframing industry standard، وبيستخدم عشان الـ wireframe يبقى واضح للناس التانية (L8, Wireframing industry standards)."]
);
AR.hci.lectures["1"].qa.push(
  "1) الـ <b>User research</b>: إنك تتعلم عن الـ users (مهاراتهم، والحاجات اللي ممكن تشتتهم، والاحتياجات الخاصة زي الأطفال وكبار السن والناس اللي عندهم إعاقات)، والـ tasks اللي بيحاولوا يخلصوها، والـ research الموجود عن قدرات الإنسان وحدوده والـ perception. 2) الـ <b>Design and prototyping</b> للـ interface. 3) الـ <b>User interface evaluation</b> (improvement)."
);
AR.hci.lectures["3"].qa.push(
  "الـ design life cycle بتاع Joyner هو <b>iterative process فيه 4 phases</b>: 1) Need finding 2) Design alternatives 3) Prototyping 4) Evaluation، وبعدين ترجع للـ need finding تاني. مفيش phase منفصلة اسمها \"user research\" لأن الـ user research جزء أساسي من كل phase (Joyner: \"you need users early and often\").",
  "Understand، Specify، Design، Evaluate، و<b>الـ iteration هي الأساس</b> وإنت ماشي في الـ process.<br>1) <b>Understand</b>: الـ users بيجرّبوا الـ product إزاي (research كتير).<br>2) <b>Specify</b>: أهم مشكلة عند الـ user محتاجين نحلها.<br>3) <b>Design</b>: حلول لمشكلة الـ user، ونبدأ نبني.<br>4) <b>Evaluate</b>: test مع users حقيقيين.",
  "1) الـ <b>Primary research</b>: research إنت بتعمله بنفسك. الـ methods المشهورة: interviews، focus groups، surveys، usability studies، participant observations.<br>2) الـ <b>Secondary research</b>: research حد تاني عمله. مصادر المعلومات المشهورة: الكتب والـ journals والحاجات اللي شبههم.",
  "1) مهم خصوصاً <b>في أول الـ project</b> عشان تجمع statistics و facts و figures مفيدة عن الـ users.<br>2) لو المعلومات دي موجودة، <b>بتوفر مجهود ووقت كبير جداً</b> و<b>بتدعم نتايج الـ primary research</b>.<br>3) نتايجه غالباً بيعملها researchers عندهم خبرة ومتخصصين في research organizations موثوقة، فصعب عليك تعمل زيها.<br>4) practitioners كتير مش عارفين عنه أو مش عارفين يستفيدوا إزاي من المعلومات المتاحة اللي ليها علاقة بـ users الـ project بتاعهم. الكورسات والـ training في حاجات زي الـ psychology والـ cognition، وإنك تبقى عضو في HCI و UX communities، بيساعدوا."
);
AR.hci.lectures["4"].qa.push(
  "الـ <b>Quantitative research</b>: فيه data طبيعتها أرقام، زي الـ measures والـ counts. أسهل على الـ engineers والناس الـ technical إنهم يتعاملوا معاه.<br>الـ <b>Qualitative research</b>: بيركّز على ملاحظات عن ليه وإزاي الحاجات بتحصل، وغالباً مبني على interviews. الـ Qualitative analysis أصعب على الناس الـ technical، بس هو اللي محتاجينه عشان نفهم بجد.",
  "الـ <b>PII</b> (Personally Identifiable Information): تفاصيل معينة ممكن تتستخدم عشان تعرّف الـ user، زي الأسامي، وعنوان البيت، والـ email address، ورقم التليفون.<br>الـ <b>SPII</b> (Sensitive Personally Identifiable Information): data لو ضاعت أو اتكشفت أو اتسرقت ممكن تسبب للـ users بتوعك ضرر مالي أو إحراج أو تمييز، زي الـ social security number، ورخصة السواقة، وأرقام الباسبور، وأرقام الحسابات المالية، وتاريخ الميلاد.",
  "الـ survey طريقة قوية إنك تجمع ردود سريعة في وقت قصير من عدد كبير من الـ users (<b>نظرة واسعة</b>).<br>1) غالباً بيتعمل أونلاين وسهل تعمله.<br>2) هو من <b>أرخص</b> methods الـ user research.<br>3) ممكن يبقى خطوة أولى عشان تجمع insights عامة عن دوافع الـ users وتفضيلاتهم وأولوياتهم والـ pain points بتاعتهم؛ ونتايجه بتساعد في التخطيط لأنشطة بعد كده زي الـ interviews.<br>4) وممكن كمان ييجي بعد activity تانية (interview أو usability study)، وتستخدم نتايج الـ method اللي قبله عشان تخطط للـ survey."
);
AR.hci.lectures["6"].qa.push(
  "الـ Interviews هي الـ user research technique <b>الأكتر انتشاراً</b>.<br>1) بتدّي فهم أعمق وأشمل للـ users: أسئلة open-ended وأسئلة \"why\" أكتر (Joyner: ركّز على الـ <b>6 Ws</b>: who، what، where، when، why، how)، ومساحة لـ follow-up questions، وتفكير في الأنشطة والأحداث النادرة.<br>2) عدد الـ users اللي ممكن تعملهم interview أقل بكتير من الـ surveys.<br>3) أغلى: <b>synchronous</b> (اللي بيعمل الـ interview بيدّي وقت لكل interviewee) و<b>incentives</b> (اللي بنعملهم interview غالباً بيستنوا تعويض).<br>4) الـ Interviews والـ surveys ممكن يتعملوا ورا بعض بأي ترتيب، وتستخدم نتايج واحد عشان تخطط للتاني."
);
AR.hci.lectures["8"].qa.push(
  "الـ Prototypes بتستخدم كطريقة <b>للتواصل مع الـ stakeholders</b>. وبتخدم 4 audiences مختلفين: 1) Colleagues 2) Clients 3) Users 4) Yourself.",
  "1) ابدأ بـ <b>pen and paper</b>.<br>2) أول هدف: <b>إنك توصل لـ design، مش إنك تعرض design</b>.<br>3) لكل شاشة، ارسم wireframe versions بديلة (5 versions على الأقل).<br>4) عدّي على كام iteration بـ feedback لو متاح.<br>5) تاني هدف: الـ wireframe بينقل الفكرة من دماغك للورق بأسرع وأسهل طريقة، فمتركزش في المرحلة دي على تفاصيل بتبطّأ الـ process، زي الخطوط المستقيمة والـ spacing والـ alignment.<br>6) استخدم الـ tools بعد الـ iterations الأولانية بتاعة الـ paper wireframes. الـ tools المشهورة: Figma، Adobe XD، Sketch، Balsamiq، Pencil."
);
